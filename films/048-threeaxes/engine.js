/* TRURETURING — holographic hacker film engine. Deterministic: renderAt(t) draws frame at time t. */
'use strict';
const W = 1920, H = 1080, FPS = 30, TAU = Math.PI * 2;
const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
const C = {
  cyan: '#3ff8ff', mag: '#ff3cd2', vio: '#8a5cff', gold: '#ffcf5a', red: '#ff3b5c',
  white: '#e8fbff', green: '#4dffa6', blue: '#2a7bff', orange: '#ff8a3c', dim: '#5a7a9a'
};
const F = {
  orb: 'Orbitron, "DejaVu Sans", sans-serif',
  mono: '"JetBrains Mono", "DejaVu Sans Mono", monospace',
  raj: 'Rajdhani, "DejaVu Sans", sans-serif',
  zh: '"Noto Sans SC", "WenQuanYi Zen Hei", sans-serif'
};
const DATA = window.DATA;
const TL = DATA.timeline;

/* ---------- math & randomness ---------- */
const clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const lerp = (a, b, x) => a + (b - a) * x;
const ease = x => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const eo = x => { x = clamp(x); return 1 - Math.pow(1 - x, 3); };
const ei = x => { x = clamp(x); return x * x * x; };
function rnd(i, j = 0) { const x = Math.sin(i * 127.1 + j * 311.7 + 17.13) * 43758.5453; return x - Math.floor(x); }
const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
function rotY(p, a) { const c = Math.cos(a), s = Math.sin(a); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; }
function rotX(p, a) { const c = Math.cos(a), s = Math.sin(a); return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]; }
function rotZ(p, a) { const c = Math.cos(a), s = Math.sin(a); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]]; }
function proj(p, cx = W / 2, cy = H / 2, fov = 900, camZ = 5) {
  const z = p[2] + camZ; const k = fov / Math.max(z, 0.05);
  return [cx + p[0] * k, cy + p[1] * k, k, z];
}

/* ---------- scene timing ---------- */
const SC = {};
TL.scenes.forEach((s, i) => {
  SC[s.id] = Object.assign({}, s, {
    i, lines: TL.lines.filter(l => l.scene === s.id).map(l => ({ s: l.start - s.start, e: l.end - s.start, en: l.en }))
  });
});
function lineAt(S, k) { return S.L[k] || { s: 1e9, e: 1e9 }; }
/* progress of a phase starting at line k (plus offset), over dur seconds */
function at(S, k, dur = 1, off = 0) { return clamp((S.u - lineAt(S, k).s - off) / dur); }
function sinceStart(S, off, dur) { return clamp((S.u - off) / dur); }

/* ---------- offscreen resources ---------- */
function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
const small = mk(480, 270), sctx = small.getContext('2d');
const buf = mk(W, H), bctx = buf.getContext('2d');
let nebula, scan, vign, grains = [], pearl = {}, heat;

function buildResources() {
  nebula = mk(W, H); const n = nebula.getContext('2d');
  n.fillStyle = '#02030a'; n.fillRect(0, 0, W, H);
  const blobs = [[0.2, 0.3, 700, C.vio, 0.22], [0.8, 0.25, 600, C.mag, 0.12], [0.7, 0.8, 800, C.blue, 0.16],
    [0.3, 0.85, 500, C.cyan, 0.07], [0.5, 0.5, 900, '#1a1050', 0.35]];
  for (const [x, y, r, c, a] of blobs) {
    const g = n.createRadialGradient(x * W, y * H, 0, x * W, y * H, r);
    g.addColorStop(0, rgba(c, a)); g.addColorStop(1, rgba(c, 0));
    n.fillStyle = g; n.fillRect(0, 0, W, H);
  }
  scan = mk(W, H); const s = scan.getContext('2d');
  for (let y = 0; y < H; y += 3) { s.fillStyle = 'rgba(0,0,0,0.22)'; s.fillRect(0, y, W, 1); }
  vign = mk(W, H); const v = vign.getContext('2d');
  const g = v.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.0);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.78)');
  v.fillStyle = g; v.fillRect(0, 0, W, H);
  for (let k = 0; k < 6; k++) {
    const gc = mk(480, 270), gx = gc.getContext('2d'); const im = gx.createImageData(480, 270);
    for (let i = 0; i < im.data.length; i += 4) {
      const r = rnd(i * 0.013 + k * 91.7, k) * 255;
      im.data[i] = im.data[i + 1] = im.data[i + 2] = r; im.data[i + 3] = 20;
    }
    gx.putImageData(im, 0, 0); grains.push(gc);
  }
  for (const [name, col] of [['c', C.cyan], ['m', C.mag], ['g', C.gold], ['w', C.white], ['o', C.orange], ['r', C.red], ['v', C.vio], ['n', C.green]]) {
    const p = mk(64, 64), px = p.getContext('2d');
    const gr = px.createRadialGradient(26, 26, 1, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.18, rgba(col, 0.95));
    gr.addColorStop(0.5, rgba(col, 0.35)); gr.addColorStop(1, rgba(col, 0));
    px.fillStyle = gr; px.fillRect(0, 0, 64, 64); pearl[name] = p;
  }
  const rows = DATA.deficit, N = rows.length;
  heat = mk(N, N); const hx = heat.getContext('2d'); const im = hx.createImageData(N, N);
  const col = { m: [255, 60, 210], z: [10, 22, 52], p: [63, 248, 255] };
  for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) {
    const c = col[rows[a][b]]; const i = ((N - 1 - a) * N + b) * 4;
    im.data[i] = c[0]; im.data[i + 1] = c[1]; im.data[i + 2] = c[2]; im.data[i + 3] = 255;
  }
  hx.putImageData(im, 0, 0);
}

/* ---------- drawing helpers ---------- */
function font(w, size, fam) { ctx.font = `${w} ${size}px ${fam}`; }
function txt(s, x, y, o = {}) {
  const size = o.size || 28, fam = o.fam || F.mono, w = o.w || 400, a = o.a == null ? 1 : o.a;
  if (a <= 0.003) return;
  font(w, size, fam); ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'alphabetic';
  const ab = o.ab || 0;
  ctx.save();
  if (o.ls) ctx.letterSpacing = o.ls + 'px';
  if (ab) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = a * 0.7; ctx.fillStyle = '#ff1d6b'; ctx.fillText(s, x - ab, y);
    ctx.fillStyle = '#00d0ff'; ctx.fillText(s, x + ab, y);
    ctx.globalCompositeOperation = 'source-over';
  }
  ctx.globalAlpha = a; ctx.fillStyle = o.c || C.white; ctx.fillText(s, x, y);
  ctx.restore();
}
function tw(s, size, fam, w = 400, ls = 0) { ctx.save(); font(w, size, fam); if (ls) ctx.letterSpacing = ls + 'px'; const m = ctx.measureText(s).width; ctx.restore(); return m; }
const GLY = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&@∀∃λ→↔¬∧∨⊢ℕℝ∑∏φ⟨⟩≤≥≠';
function scramble(str, p, seed = 0) {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    const th = 0.15 + 0.75 * (i / Math.max(1, str.length)) * 0.6 + 0.25 * rnd(i, seed);
    if (str[i] === ' ' || p >= th) out += str[i];
    else if (p > th - 0.35) out += GLY[Math.floor(rnd(i + Math.floor(p * 40), seed + 3) * GLY.length)];
    else out += ' ';
  }
  return out;
}
function typed(str, p) { return str.slice(0, Math.floor(clamp(p) * str.length)); }
function line(x1, y1, x2, y2, col, a = 1, w = 1.5) {
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.globalAlpha = 1;
}
function box(x, y, w, h, col, a = 1, lw = 1.5, fill = null) {
  ctx.globalAlpha = a;
  if (fill) { ctx.fillStyle = fill; ctx.fillRect(x, y, w, h); }
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.strokeRect(x, y, w, h);
  const k = Math.min(18, w / 4, h / 4); ctx.lineWidth = lw * 2.2;
  ctx.beginPath();
  ctx.moveTo(x, y + k); ctx.lineTo(x, y); ctx.lineTo(x + k, y);
  ctx.moveTo(x + w - k, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + k);
  ctx.moveTo(x + w, y + h - k); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - k, y + h);
  ctx.moveTo(x + k, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h - k);
  ctx.stroke(); ctx.globalAlpha = 1;
}
function panel(x, y, w, h, a, col = C.cyan, title = null) {
  if (a <= 0.003) return;
  box(x, y, w, h, col, a * 0.85, 1.2, `rgba(4,10,24,${0.72 * a})`);
  if (title) {
    ctx.globalAlpha = a; ctx.fillStyle = rgba(col, 0.18); ctx.fillRect(x, y, w, 30); ctx.globalAlpha = 1;
    txt(title, x + 14, y + 21, { size: 15, fam: F.mono, c: col, a, w: 700, ls: 2 });
  }
}
function dot(x, y, r, name = 'c', a = 1) {
  if (a <= 0.003 || r <= 0.2) return;
  ctx.globalAlpha = a; ctx.drawImage(pearl[name], x - r, y - r, r * 2, r * 2); ctx.globalAlpha = 1;
}
function stamp(s, x, y, p, col = C.red, size = 64, rot = -0.08) {
  if (p <= 0) return;
  const k = 1 + 1.6 * (1 - eo(p)); const a = clamp(p * 3);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  const w = tw(s, size, F.orb, 900, 6) + 60;
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.strokeRect(-w / 2, -size * 0.85, w, size * 1.35);
  ctx.lineWidth = 1.5; ctx.strokeRect(-w / 2 + 9, -size * 0.85 + 9, w - 18, size * 1.35 - 18);
  ctx.restore();
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  txt(s, 0, size * 0.33, { size, fam: F.orb, w: 900, c: col, a, align: 'center', ab: 3, ls: 6 });
  ctx.restore();
}
function hypercube(n) {
  const V = [], E = [];
  for (let i = 0; i < (1 << n); i++) { const v = []; for (let b = 0; b < n; b++) v.push((i >> b) & 1 ? 1 : -1); V.push(v); }
  for (let i = 0; i < V.length; i++) for (let b = 0; b < n; b++) { const j = i ^ (1 << b); if (j > i) E.push([i, j]); }
  return { V, E };
}
const CUBE4 = hypercube(4), CUBE5 = hypercube(5), CUBE6 = hypercube(6);
function rotN(v, a, b, ang) { const c = Math.cos(ang), s = Math.sin(ang); const x = v[a], y = v[b]; v[a] = x * c - y * s; v[b] = x * s + y * c; }
/* rotate an n-dim point through a list of planes, then perspective-project down to 3D */
function projN(v0, planes, dist = 3.2) {
  const v = v0.slice();
  for (const [a, b, ang] of planes) rotN(v, a, b, ang);
  let p = v;
  while (p.length > 3) { const w = p[p.length - 1]; const k = dist / (dist - w * 0.55); p = p.slice(0, -1).map(x => x * k); }
  return p;
}
function drawHyper(cube, planes, o) {
  const P = cube.V.map(v => {
    let p = projN(v, planes, o.dist || 3.2);
    p = rotY(rotX(p, o.rx || 0), o.ry || 0);
    return proj(p.map(x => x * (o.scale || 1)), o.cx || W / 2, o.cy || H / 2, o.fov || 900, o.camZ || 6);
  });
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = o.lw || 2;
  for (let e = 0; e < cube.E.length; e++) {
    const [i, j] = cube.E[e]; const a = P[i], b = P[j];
    const depth = clamp((a[2] + b[2]) / 2 / 260, 0.25, 1.4);
    ctx.globalAlpha = (o.a == null ? 1 : o.a) * 0.55 * depth;
    ctx.strokeStyle = (e % 3 === 0) ? (o.c2 || C.mag) : (o.c || C.cyan);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  if (o.dots !== false) for (const p of P) dot(p[0], p[1], 5 + p[2] * 0.02, 'w', (o.a == null ? 1 : o.a) * 0.9);
  ctx.globalCompositeOperation = 'source-over';
  return P;
}

/* ---------- background ---------- */
const STARS = [];
for (let i = 0; i < 700; i++) STARS.push([rnd(i, 1) * 2 - 1, rnd(i, 2) * 2 - 1, rnd(i, 3), rnd(i, 4)]);
const SPEED = { boot: 0.06, title: 0.03, dao: 0.012, kernel: 0.02, dag: 0.015, golden: 0.012, refute: 0.05, quantum: 0.01, spacetime: 0.02, escape: 0.03, trust: 0.04, hearts: 0.01, finale: 0.025 };
let starPhase = [];
(function () { let acc = 0; for (const s of TL.scenes) { starPhase.push(acc); acc += (SPEED[s.id] || 0.02) * (s.end - s.start); } })();
function background(t, sc, si, u) {
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  ctx.fillStyle = '#010208'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(Math.sin(t * 0.02) * 0.05); ctx.scale(1.25 + 0.05 * Math.sin(t * 0.013), 1.25); ctx.globalAlpha = 0.9;
  ctx.drawImage(nebula, -W / 2, -H / 2, W, H); ctx.restore();
  const z0 = starPhase[si] + (SPEED[sc.id] || 0.02) * u;
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < STARS.length; i++) {
    const s = STARS[i]; let z = (s[2] - z0) % 1; if (z < 0) z += 1; z = z * 1.0 + 0.02;
    const x = W / 2 + s[0] * W * 0.55 / z, y = H / 2 + s[1] * H * 0.55 / z;
    if (x < 0 || x > W || y < 0 || y > H) continue;
    const r = clamp(1.8 / z * 0.3, 0.4, 3.2); const a = clamp((1 - z) * 1.2) * (0.4 + 0.6 * s[3]);
    ctx.globalAlpha = a; ctx.fillStyle = s[3] > 0.85 ? C.mag : s[3] > 0.7 ? C.cyan : '#cfe8ff';
    ctx.fillRect(x, y, r, r);
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}
function grid(t, a = 0.5, hy = H * 0.64, col = C.mag, speed = 0.3) {
  if (a <= 0) return;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createLinearGradient(0, hy, 0, H); g.addColorStop(0, rgba(col, 0)); g.addColorStop(1, rgba(col, 0.9 * a));
  ctx.strokeStyle = g; ctx.lineWidth = 1.5;
  for (let i = -24; i <= 24; i++) { ctx.beginPath(); ctx.moveTo(W / 2 + i * 12, hy); ctx.lineTo(W / 2 + i * 260, H + 40); ctx.stroke(); }
  const ph = (t * speed) % 1;
  for (let k = 0; k < 16; k++) { const z = (k + 1 - ph); const y = hy + 1400 / (z * z + 3.5) * z * 0.9; if (y > H) continue; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.restore();
}

/* ======================================================================= */
/*                                 SCENES                                  */
/* ======================================================================= */
const SCENES = {};

/* ---- 00 BOOT ---- */
SCENES.boot = S => {
  const u = S.u;
  const lines = [
    ['> establishing uplink :: dimension-5', ' ......... OK', C.green],
    ['> git clone the-omega-institute/trureturing', '', C.cyan],
    ['> lake build D5', '', C.cyan],
    ['  [kernel]  5,074 files · 969,579 lines', '  ✓', C.white],
    ['  [axioms]  {propext, Classical.choice, Quot.sound}', '  ✓', C.white],
    ['  [frozen]  4,976 modules · never unfrozen', '  ✓', C.white],
    ['  [open]    O-5  O-6  … ∞', '  ◌', C.gold],
    ['> render --holographic --dims=4', '', C.mag]
  ];
  const termA = clamp((5.2 - u) / 0.4);
  if (termA > 0) {
    for (let i = 0; i < lines.length; i++) {
      const st = 0.25 + i * 0.52; const p = clamp((u - st) / 0.4);
      if (p <= 0) continue;
      const y = 250 + i * 62;
      txt(typed(lines[i][0], p), 250, y, { size: 32, c: lines[i][2], a: termA, ab: 1.2 });
      if (p >= 1 && lines[i][1]) txt(lines[i][1], 250 + tw(lines[i][0], 32, F.mono), y, { size: 32, c: C.green, a: termA * clamp((u - st - 0.45) / 0.1) });
      if (p < 1 || i === lines.length - 1) {
        const cx = 250 + tw(typed(lines[i][0], p), 32, F.mono) + 6;
        if (Math.floor(u * 3) % 2 === 0) { ctx.globalAlpha = termA; ctx.fillStyle = C.cyan; ctx.fillRect(cx, y - 28, 16, 34); ctx.globalAlpha = 1; }
      }
    }
  }
  const hp = clamp((u - 4.7) / 1.4);
  if (hp > 0) {
    const t = S.t;
    const planes = [[0, 3, t * 0.47], [1, 3, t * 0.31], [2, 3, t * 0.23], [0, 1, t * 0.11]];
    for (let k = 3; k >= 1; k--) {
      const tt = t - k * 0.09;
      const pl = [[0, 3, tt * 0.47], [1, 3, tt * 0.31], [2, 3, tt * 0.23], [0, 1, tt * 0.11]];
      drawHyper(CUBE4, pl, { scale: 1.25 * eo(hp), rx: 0.35, ry: tt * 0.15, a: 0.12 * hp, dots: false, lw: 3 });
    }
    drawHyper(CUBE4, planes, { scale: 1.25 * eo(hp), rx: 0.35, ry: t * 0.15, a: hp, lw: 2.4 });
    const fp = at(S, 1, 1.2, 2.2);
    if (fp > 0) {
      const x = W / 2, y = H / 2; const r = 26 + 8 * Math.sin(t * 5);
      dot(x, y, 34, 'g', fp);
      ctx.globalAlpha = fp; ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, r + 20, 0, TAU); ctx.stroke();
      for (let q = 0; q < 4; q++) { const an = q * TAU / 4 + t * 0.5; line(x + Math.cos(an) * (r + 30), y + Math.sin(an) * (r + 30), x + Math.cos(an) * (r + 70), y + Math.sin(an) * (r + 70), C.gold, fp, 2); }
      ctx.globalAlpha = 1;
      txt('FIXED POINT', x + 110, y - 40, { size: 22, fam: F.orb, w: 700, c: C.gold, a: fp, ls: 4 });
      txt('invariant under transformation', x + 110, y - 12, { size: 18, c: C.gold, a: fp * 0.8 });
    }
    txt(scramble('TRUTH  IS  DISCOVERED', at(S, 0, 1.4, 0.2), 5), W / 2, 170, { size: 30, fam: F.orb, w: 700, c: C.cyan, a: hp * 0.9 * clamp((S.d - u) / 1), align: 'center', ls: 10, ab: 2 });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const planes = [[0, 4, t * 0.21], [1, 3, t * 0.17], [2, 4, t * 0.13], [3, 4, t * 0.19], [0, 2, t * 0.07]];
  drawHyper(CUBE5, planes, { scale: 1.9, rx: 0.3, ry: t * 0.05, a: 0.35, dots: false, lw: 1.2, camZ: 7 });
  grid(t, 0.55);
  const shrink = ease(at(S, 1, 1.2));
  const ty = lerp(H * 0.46, 220, shrink), size = lerp(150, 96, shrink);
  const rp = clamp(u / 1.6);
  const glitchX = (rnd(Math.floor(u * 12), 7) > 0.8 ? (rnd(Math.floor(u * 12), 9) - 0.5) * 30 : 0);
  // light streak
  const sg = ctx.createLinearGradient(0, 0, W, 0);
  sg.addColorStop(0, 'rgba(63,248,255,0)'); sg.addColorStop(0.5, rgba(C.cyan, 0.8 * rp)); sg.addColorStop(1, 'rgba(63,248,255,0)');
  ctx.fillStyle = sg; ctx.globalCompositeOperation = 'lighter'; ctx.fillRect(0, ty + 20, W, 3); ctx.globalCompositeOperation = 'source-over';
  txt(scramble('TRURETURING', rp, 11), W / 2 + glitchX, ty, { size, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', ab: 6, ls: 14 });
  const words = [['TRUE', C.cyan], ['RETURN', C.mag], ['TURING', C.gold]];
  const L0 = lineAt(S, 0);
  const ws = [L0.s + 1.05, L0.s + 1.75, L0.s + 2.45];
  const ytag = ty + lerp(90, 70, shrink); const tsize = lerp(40, 30, shrink);
  const total = words.reduce((s, w) => s + tw(w[0], tsize, F.orb, 700, 8), 0) + 2 * 80;
  let x = W / 2 - total / 2;
  words.forEach(([wd, col], i) => {
    const p = clamp((u - ws[i]) / 0.35);
    txt(wd, x, ytag, { size: tsize, fam: F.orb, w: 700, c: col, a: p, ab: 2, ls: 8 });
    x += tw(wd, tsize, F.orb, 700, 8);
    if (i < 2) txt('·', x + 32, ytag, { size: tsize, fam: F.orb, c: C.white, a: p * 0.7 }); x += 80;
  });
  // the method ring
  const rpA = at(S, 1, 1.2, 0.4);
  if (rpA > 0) {
    const steps = ['QUESTION', 'CONJECTURE', 'TEST', 'PROOF / REFUTATION', 'LIBRARY', 'NEXT QUESTION'];
    const cx = W / 2, cy = 610, R = 520;
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = rpA * 0.7; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.28, 0, 0, TAU); ctx.stroke();
    ctx.globalAlpha = rpA * 0.25; ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.05, R * 0.3, 0, 0, TAU); ctx.stroke();
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    const spin = t * 0.25;
    const lit = Math.floor(clamp((u - lineAt(S, 1).s) / (lineAt(S, 1).e - lineAt(S, 1).s)) * steps.length * 0.999);
    const items = steps.map((s, i) => { const an = spin + i * TAU / steps.length; return { s, i, x: cx + Math.cos(an) * R, y: cy + Math.sin(an) * R * 0.28, z: Math.sin(an) }; });
    items.sort((a, b) => a.z - b.z);
    for (const it of items) {
      const on = it.i <= lit; const k = 0.65 + 0.35 * (it.z + 1) / 2;
      const p = clamp((u - lineAt(S, 1).s - 0.4 - it.i * 0.25) / 0.5) * rpA;
      dot(it.x, it.y, (on ? 22 : 12) * k, on ? (it.i === 3 ? 'g' : 'c') : 'v', p);
      txt(it.s, it.x, it.y - 30 * k, { size: 22 * k, fam: F.raj, w: 700, align: 'center', c: on ? C.white : C.dim, a: p * (0.5 + 0.5 * k), ls: 3 });
    }
    // growth counter
    const g = Math.floor(lerp(4800, 4976, clamp((u - lineAt(S, 1).s) / 9)));
    txt(`LIBRARY  ${g.toLocaleString('en-US')}  FROZEN  ·  ONLY GROWS`, W / 2, 400, { size: 18, fam: F.mono, align: 'center', c: C.gold, a: rpA * 0.85, ls: 3 });
  }
};

/* ---- 02 DAO / INDRA'S NET ---- */
const NET = [];
for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) for (let k = 0; k < 7; k++) {
  const id = NET.length;
  NET.push({ p: [(i - 3) * 0.62 + (rnd(id, 1) - 0.5) * 0.15, (j - 3) * 0.62 + (rnd(id, 2) - 0.5) * 0.15, (k - 3) * 0.62 + (rnd(id, 3) - 0.5) * 0.15], c: rnd(id, 4) });
}
const NETE = [];
for (let a = 0; a < NET.length; a++) for (let b = a + 1; b < NET.length; b++) {
  const d = Math.hypot(NET[a].p[0] - NET[b].p[0], NET[a].p[1] - NET[b].p[1], NET[a].p[2] - NET[b].p[2]);
  if (d < 0.72) NETE.push([a, b]);
}
function drawNet(t, a, ry, rx, obs = null, scale = 1, cx = W / 2, cy = H / 2) {
  const P = NET.map(n => proj(rotX(rotY(n.p.map(x => x * scale), ry), rx), cx, cy, 900, 6.5));
  let lit = null;
  if (obs) lit = NET.map((n, i) => {
    const q = rotX(rotY(n.p.map(x => x * scale), ry), rx);
    const d = [q[0] - obs.o[0], q[1] - obs.o[1], q[2] - obs.o[2]]; const L = Math.hypot(...d);
    const c = (d[0] * obs.d[0] + d[1] * obs.d[1] + d[2] * obs.d[2]) / L;
    return clamp((c - obs.cos) / (1 - obs.cos) * 3) * clamp(1.6 - L * 0.25);
  });
  ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 1;
  for (const [i, j] of NETE) {
    const A = P[i], B = P[j]; const k = (A[2] + B[2]) / 2 / 140;
    let al = a * 0.13 * clamp(k, 0.2, 1.5);
    if (lit) al = al * 0.35 + a * 0.5 * Math.min(lit[i], lit[j]);
    if (al < 0.01) continue;
    ctx.globalAlpha = al; ctx.strokeStyle = NET[i].c > 0.5 ? C.cyan : C.vio;
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const order = P.map((p, i) => i).sort((x, y) => P[y][3] - P[x][3]);
  for (const i of order) {
    const p = P[i]; const r = p[2] * 0.055 * (1 + 0.15 * Math.sin(t * 2 + i));
    let al = a * clamp(p[2] / 140, 0.25, 1);
    if (lit) al = a * (0.18 + 0.82 * lit[i]);
    const nm = NET[i].c > 0.8 ? 'm' : NET[i].c > 0.6 ? 'g' : 'c';
    dot(p[0], p[1], r * 1.6, nm, al);
    if (r > 6 && al > 0.3) { dot(p[0] - r * 0.3, p[1] - r * 0.35, r * 0.35, 'w', al * 0.9); dot(p[0] + r * 0.35, p[1] + r * 0.2, r * 0.22, NET[(i + 7) % NET.length].c > 0.5 ? 'm' : 'g', al * 0.8); }
  }
  ctx.globalCompositeOperation = 'source-over';
  return P;
}
SCENES.dao = S => {
  const u = S.u, t = S.t;
  const ry = t * 0.09, rx = 0.35 + 0.1 * Math.sin(t * 0.13);
  const obsP = at(S, 2, 1.0), obsOut = at(S, 3, 1.0);
  const obsA = obsP * (1 - obsOut);
  let obs = null;
  if (obsA > 0.01) {
    const an = t * 0.6; const dir = [Math.cos(an) * 0.8, Math.sin(an * 0.7) * 0.3, -0.5]; const L = Math.hypot(...dir);
    obs = { o: [0, 0, 5.5], d: dir.map(x => x / L), cos: lerp(0.99, 0.94, obsA) };
    obs.d = [obs.d[0], obs.d[1], -Math.abs(obs.d[2])];
  }
  const P = drawNet(t, 1, ry, rx, obs, 1.05);
  if (obs) {
    // observer cone
    const ox = W / 2, oy = H - 120;
    const tx = W / 2 + obs.d[0] * 900, ty = H / 2 + obs.d[1] * 900;
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.18 * obsA; ctx.fillStyle = C.gold;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(tx - 170, ty - 60); ctx.lineTo(tx + 170, ty + 60); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    dot(ox, oy, 26, 'g', obsA);
    txt('FINITE OBSERVER', ox + 40, oy + 8, { size: 20, fam: F.orb, w: 700, c: C.gold, a: obsA, ls: 4 });
  }
  const gp = at(S, 1, 1.5) * (1 - at(S, 2, 1.0) * 0.75);
  if (gp > 0) {
    const fl = 0.85 + 0.15 * Math.sin(t * 13) * (rnd(Math.floor(t * 8), 3) > 0.7 ? 1 : 0.2);
    txt('道', W / 2, H / 2 + 150, { size: 440, fam: F.zh, w: 900, align: 'center', c: rgba(C.cyan, 0.9), a: gp * 0.75 * fl, ab: 8 });
    for (let y = H / 2 - 250; y < H / 2 + 200; y += 6) { ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(W / 2 - 260, y, 520, 2); }
    txt('DAO · 道  ·  GOD · 神', W / 2, H / 2 + 240, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.white, a: gp, ls: 8 });
    txt('the network of all truths and their logical relations', W / 2, H / 2 + 280, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: gp * 0.8 });
  }
  const tp = at(S, 0, 1);
  txt(scramble('TRUTH IS NOT CREATED BY COMPUTING IT', tp, 4), W / 2, 140, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: tp * (1 - at(S, 1, 0.8)), ls: 6, ab: 2 });
  const op = at(S, 3, 0.8);
  if (op > 0) {
    panel(W / 2 - 360, 110, 720, 110, op, C.gold, 'EPISTEMIC STATUS');
    txt('ORIENTATION  ≠  THEOREM', W / 2, 190, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.gold, a: op, ls: 4, ab: 2 });
  }
};

/* ---- 03 KERNEL ---- */
const RAIN = '∀∃λ→↔¬∧∨⊢ℕℝℤ∑∏φψ⟨⟩≤≥≠∘⁻¹₊⌊⌋:=01';
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  // glyph rain
  const cols = 64;
  font(400, 22, F.mono); ctx.textAlign = 'center';
  ctx.globalCompositeOperation = 'lighter';
  for (let c = 0; c < cols; c++) {
    const sp = 90 + rnd(c, 1) * 160; const head = ((t * sp + rnd(c, 2) * 2400) % 1500) - 200;
    const x = (c + 0.5) * W / cols;
    for (let k = 0; k < 18; k++) {
      const y = head - k * 26; if (y < -20 || y > H + 20) continue;
      const ch = RAIN[Math.floor(rnd(c * 31 + k, Math.floor(t * 6 + k)) * RAIN.length)];
      ctx.globalAlpha = (k === 0 ? 0.9 : 0.45 * (1 - k / 18)) * 0.55;
      ctx.fillStyle = k === 0 ? '#dfffff' : (c % 5 === 0 ? C.mag : C.green);
      ctx.fillText(ch, x, y);
    }
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  // code panel
  const cp = at(S, 0, 0.8);
  const code = [
    ['theorem', ' deficit_three_valued (v₁ v₂ : ℕ) :'],
    ['', '    deficit v₁ v₂ = -1 ∨ deficit v₁ v₂ = 0 ∨ deficit v₁ v₂ = 1 := by'],
    ['', '  obtain ⟨hface, ⟨z, hz⟩, -⟩ := deficit_integer v₁ v₂'],
    ['', '  have hwin : ∀ v : ℕ,'],
    ['', '      -(goldenConj ^ 2) ≤ betaContraction v ∧ betaContraction v ≤ -goldenConj'],
    ['', '  ...']
  ];
  const px = 330, py = 250, pw = 1260, ph = 330;
  const up = 1 - at(S, 2, 0.8);
  if (cp > 0) {
    panel(px, py, pw, ph, cp * up, C.cyan, 'D5/S1/Deficit/DeficitThreeValued.lean');
    code.forEach((ln, i) => {
      const p = clamp((u - lineAt(S, 0).s - 0.3 - i * 0.45) / 0.5);
      txt(ln[0], px + 30, py + 80 + i * 42, { size: 24, c: C.mag, a: cp * up * p, w: 700 });
      txt(typed(ln[1], p), px + 30 + (ln[0] ? tw(ln[0], 24, F.mono, 700) : 0), py + 80 + i * 42, { size: 24, c: C.white, a: cp * up * p });
    });
    const kp = at(S, 0, 0.5, 3.2);
    stamp('KERNEL ✓', px + pw - 190, py + ph - 20, kp * up, C.green, 44, -0.06);
  }
  // not prose / intuition / model
  const np = at(S, 1, 0.6);
  if (np > 0 && up > 0) {
    const items = ['PROSE', 'INTUITION', 'A CONFIDENT MODEL'];
    const L1 = lineAt(S, 1);
    items.forEach((s, i) => {
      const p = clamp((u - L1.s - i * 0.75) / 0.3); const x = W / 2 - 540 + i * 470, y = 690;
      txt(s, x, y, { size: 34, fam: F.orb, w: 700, c: C.dim, a: p * up, align: 'center', ls: 3 });
      const sp = clamp((u - L1.s - i * 0.75 - 0.25) / 0.25);
      if (sp > 0) { const w = tw(s, 34, F.orb, 700, 3); line(x - w / 2 - 10, y - 12, x - w / 2 - 10 + (w + 20) * sp, y - 12, C.red, up, 4); }
    });
    const kp = clamp((u - L1.s - 2.8) / 0.4);
    txt('DECLARATIONS · PROOF TERMS · AXIOM CLOSURE', W / 2, 780, { size: 30, fam: F.raj, w: 700, align: 'center', c: C.cyan, a: kp * up, ls: 5, ab: 1.5 });
  }
  // counters
  const cnt = at(S, 2, 0.6);
  if (cnt > 0) {
    const L2 = lineAt(S, 2);
    const vals = [[5074, 'LEAN FILES'], [969579, 'LINES'], [29642, 'THEOREMS + LEMMAS']];
    vals.forEach(([v, lab], i) => {
      const p = eo(clamp((u - L2.s - 0.4 - i * 1.6) / 1.6)); const x = W / 2 - 560 + i * 560, y = 470;
      const shown = Math.floor(v * p);
      txt(shown.toLocaleString('en-US'), x, y, { size: 96, fam: F.orb, w: 900, align: 'center', c: i === 2 ? C.gold : C.cyan, a: cnt * clamp(p * 4) * (1 - at(S, 3, 0.6) * 0.6), ab: 3 });
      txt(lab, x, y + 56, { size: 24, fam: F.raj, w: 700, align: 'center', c: C.white, a: cnt * clamp(p * 4), ls: 6 });
    });
  }
  const ap = at(S, 3, 0.6);
  if (ap > 0) {
    panel(W / 2 - 560, 630, 1120, 190, ap, C.gold, 'PERMITTED AXIOM CLOSURE');
    txt('{ propext , Classical.choice , Quot.sound }', W / 2, 715, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.gold, a: ap, ab: 1.5 });
    const rp = at(S, 3, 0.4, 1.6);
    txt('unregistered axiom  →  REJECTED', W / 2, 785, { size: 28, fam: F.mono, align: 'center', c: C.red, a: rp });
  }
};

/* ---- 04 DAG ---- */
const DAG = (function () {
  const layers = [16, 14, 13, 11, 10, 8, 7, 5, 4];
  const nodes = [], edges = [];
  layers.forEach((n, L) => {
    for (let i = 0; i < n; i++) {
      const id = nodes.length; const an = i / n * TAU + rnd(id, 1) * 0.5; const r = 1.6 - L * 0.12 + rnd(id, 2) * 0.3;
      nodes.push({ id, L, p: [Math.cos(an) * r, 2.1 - L * 0.52, Math.sin(an) * r], par: [], kid: [] });
    }
  });
  for (const nd of nodes) if (nd.L > 0) {
    const below = nodes.filter(m => m.L < nd.L && m.L >= nd.L - 2);
    const k = 1 + Math.floor(rnd(nd.id, 5) * 3);
    for (let q = 0; q < k; q++) {
      const m = below[Math.floor(rnd(nd.id, 10 + q) * below.length)];
      if (!nd.par.includes(m.id)) { nd.par.push(m.id); m.kid.push(nd.id); edges.push([m.id, nd.id]); }
    }
  }
  // descendants of a chosen root
  const root = 3; const desc = new Map(); desc.set(root, 0);
  const q = [root];
  while (q.length) { const a = q.shift(); for (const b of nodes[a].kid) if (!desc.has(b)) { desc.set(b, desc.get(a) + 1); q.push(b); } }
  return { nodes, edges, layers, desc, root, top: layers.length - 1 };
})();
SCENES.dag = S => {
  const u = S.u, t = S.t;
  const ry = t * 0.12, rx = -0.18;
  const grow = clamp(u / Math.max(4, lineAt(S, 1).e));
  const freezeStart = lineAt(S, 1).s;
  const P = DAG.nodes.map(n => proj(rotX(rotY(n.p, ry), rx), W / 2, H / 2 - 50, 860, 6));
  const appear = n => clamp((grow * DAG.layers.length - n.L) * 1.2);
  const frozenAt = n => freezeStart + n.L * 0.55 + rnd(n.id, 9) * 0.4;
  const isFrontier = n => n.L >= DAG.top - 1;
  const rp = lineAt(S, 2); const ripple = clamp((u - rp.s - 3.5) / 3.2); const rippleOff = clamp((u - rp.s - 8.5) / 1.2);
  ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 1.6;
  for (const [a, b] of DAG.edges) {
    const A = P[a], B = P[b]; const na = DAG.nodes[a], nb = DAG.nodes[b];
    const al = Math.min(appear(na), appear(nb));
    if (al <= 0) continue;
    let col = C.cyan;
    if (ripple > 0 && rippleOff < 1 && DAG.desc.has(a) && DAG.desc.has(b) && DAG.desc.get(b) <= ripple * 6) col = C.red;
    ctx.globalAlpha = al * 0.5; ctx.strokeStyle = col;
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
    // flowing packet
    const ph = (t * 0.6 + rnd(a, b)) % 1; const x = lerp(A[0], B[0], ph), y = lerp(A[1], B[1], ph);
    ctx.globalAlpha = al * 0.8; ctx.fillStyle = C.white; ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  const hashes = DATA.corpus.hashes;
  for (const n of DAG.nodes) {
    const a = appear(n); if (a <= 0) continue;
    const p = P[n.id]; const fz = clamp((u - frozenAt(n)) / 0.35);
    const front = isFrontier(n) && at(S, 3, 0.8) > 0;
    let nm = fz >= 1 ? 'w' : 'o';
    if (front) nm = 'o';
    const inRipple = ripple > 0 && rippleOff < 1 && DAG.desc.has(n.id) && DAG.desc.get(n.id) <= ripple * 6;
    if (inRipple) nm = 'r';
    const r = p[2] * (front ? 0.03 + 0.008 * Math.sin(t * 6 + n.id) : 0.026);
    dot(p[0], p[1], r * 2.2, nm, a);
    if (fz > 0 && fz < 1) { ctx.globalAlpha = 1 - fz; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], r * 2 + fz * 50, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
    if (fz >= 1 && !front && !inRipple) {
      ctx.globalAlpha = a * 0.7; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.2; ctx.beginPath();
      for (let k = 0; k < 6; k++) { const an = k * TAU / 6 + 0.5; const X = p[0] + Math.cos(an) * r * 1.3, Y = p[1] + Math.sin(an) * r * 1.3; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
      ctx.closePath(); ctx.stroke(); ctx.globalAlpha = 1;
    }
    const hp = at(S, 2, 0.8);
    if (hp > 0 && n.id % 3 === 0 && p[3] < 6.2) {
      let h = hashes[n.id % hashes.length][1].replace('sha256:', '').slice(0, 10);
      if (inRipple) h = scramble(h, 0.1, Math.floor(t * 20));
      txt(h, p[0] + 16, p[1] - 10, { size: 14, fam: F.mono, c: inRipple ? C.red : C.cyan, a: hp * a * 0.85 * (1 - at(S, 3, 0.8) * 0.5) });
    }
  }
  const fp = at(S, 1, 0.6);
  if (fp > 0) stamp('FROZEN · NEVER UNFROZEN', W / 2, 150, fp * (1 - at(S, 2, 0.6)), C.cyan, 44, 0);
  if (ripple > 0 && rippleOff < 1) txt('Δ ONE PEARL → EVERY REFLECTION ABOVE CHANGES', W / 2, 140, { size: 28, fam: F.orb, w: 700, c: C.red, a: clamp(ripple * 4) * (1 - rippleOff), align: 'center', ls: 3, ab: 2 });
  const lp = at(S, 3, 0.8);
  if (lp > 0) {
    const cnt = Math.floor(4976 * eo(clamp((u - lineAt(S, 3).s) / 2.5)));
    txt(cnt.toLocaleString('en-US'), 230, 520, { size: 110, fam: F.orb, w: 900, c: C.cyan, a: lp, ab: 3 });
    txt('MODULES FROZEN', 236, 570, { size: 24, fam: F.raj, w: 700, c: C.white, a: lp, ls: 6 });
    const top = P.filter((p, i) => isFrontier(DAG.nodes[i])); const yTop = Math.min(...top.map(p => p[1])) - 60;
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = lp * 0.5; ctx.strokeStyle = C.orange; ctx.setLineDash([12, 10]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(W / 2, yTop + 90, 420, 70, 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    txt('FRONTIER · OPEN', W / 2 + 380, yTop + 70, { size: 28, fam: F.orb, w: 700, c: C.orange, a: lp, ls: 4 });
    txt('work happens only here', W / 2 + 380, yTop + 104, { size: 20, fam: F.mono, c: C.orange, a: lp * 0.8 });
  }
};

/* ---- 05 GOLDEN ---- */
const PHI = (1 + Math.sqrt(5)) / 2;
const FIB = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
function zeck(n) { const out = []; let k = 10; while (n > 0) { while (FIB[k] > n) k--; out.push(k); n -= FIB[k]; k -= 2; } return out; }
SCENES.golden = S => {
  const u = S.u, t = S.t;
  // golden spiral of Fibonacci squares (math coords, y up)
  const sp = clamp(u / 4.2);
  const spA = (1 - at(S, 1, 0.8) * 0.8) * (1 - at(S, 3, 0.8));
  if (sp > 0 && spA > 0) {
    const SZ = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    const sq = []; let x0 = 0, y0 = 0, x1 = 1, y1 = 1;
    sq.push({ x: 0, y: 0, s: 1, c: [1, 1], a0: Math.PI });
    for (let i = 1; i < SZ.length; i++) {
      const s2 = SZ[i], d = (i - 1) % 4; let q;
      if (d === 0) { q = { x: x1, y: y0, s: s2, c: [x1, y0 + s2], a0: 1.5 * Math.PI }; x1 += s2; }
      else if (d === 1) { q = { x: x0, y: y1, s: s2, c: [x0, y1], a0: 0 }; y1 += s2; }
      else if (d === 2) { q = { x: x0 - s2, y: y0, s: s2, c: [x0, y0], a0: 0.5 * Math.PI }; x0 -= s2; }
      else { q = { x: x0, y: y0 - s2, s: s2, c: [x0 + s2, y0], a0: Math.PI }; y0 -= s2; }
      sq.push(q);
    }
    const k = sp * (SZ.length - 0.01); const shown = Math.floor(k) + 1;
    const z = ease(sp);
    const fin = [(x0 + x1) / 2, (y0 + y1) / 2];
    const cxm = lerp(0.8, fin[0], z), cym = lerp(0.6, fin[1], z);
    const unit = 760 / lerp(3, 55, Math.pow(z, 0.8));
    const X = x => W / 2 + (x - cxm) * unit, Y = y => H / 2 + 10 - (y - cym) * unit;
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(Math.sin(t * 0.1) * 0.04); ctx.translate(-W / 2, -H / 2);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < Math.min(shown, sq.length); i++) {
      const q = sq[i]; const p = clamp(k - i);
      ctx.globalAlpha = spA * 0.55 * clamp(p * 2); ctx.strokeStyle = C.gold; ctx.lineWidth = 1.5;
      ctx.strokeRect(X(q.x), Y(q.y + q.s), q.s * unit, q.s * unit);
      if (q.s * unit > 50) txt(String(q.s), X(q.x + q.s / 2), Y(q.y + q.s / 2) + 10, { size: clamp(q.s * unit * 0.18, 14, 64), fam: F.orb, w: 700, align: 'center', c: C.gold, a: spA * 0.55 * clamp(p * 2) });
      ctx.globalAlpha = spA; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3.5; ctx.beginPath();
      for (let j = 0; j <= 24; j++) { const an = q.a0 + Math.PI / 2 * (j / 24) * p; const px = X(q.c[0] + Math.cos(an) * q.s), py = Y(q.c[1] + Math.sin(an) * q.s); j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke();
    }
    ctx.restore(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    txt('φ = 1.6180339887…', W / 2, 190, { size: 50, fam: F.orb, w: 700, align: 'center', c: C.gold, a: clamp(u / 1.5) * (1 - at(S, 1, 0.6)), ab: 2, ls: 3 });
    txt('1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …', W / 2, 250, { size: 26, fam: F.mono, align: 'center', c: C.cyan, a: clamp((u - 1) / 1.5) * (1 - at(S, 1, 0.6)) });
  }
  // Zeckendorf bar
  const zp = at(S, 1, 0.8) * (1 - at(S, 3, 0.8));
  if (zp > 0) {
    const L1 = lineAt(S, 1);
    const n = Math.max(1, Math.min(42, Math.floor(1 + 41 * ease(clamp((u - L1.s) / 5.5)))));
    const ks = zeck(n); const ws = [1, 2, 3, 5, 8, 13, 21, 34]; const idx = [2, 3, 4, 5, 6, 7, 8, 9];
    const morph = at(S, 2, 1.2);
    const bw = 170, gap = 18, tot = ws.length * bw + (ws.length - 1) * gap; const x0 = W / 2 - tot / 2, y0 = 560;
    ws.forEach((w, i) => {
      const on = ks.map(q => FIB[q]).includes(w); const x = x0 + i * (bw + gap);
      box(x, y0, bw, 140, on ? C.gold : C.cyan, zp * (on ? 1 : 0.5), on ? 2.5 : 1.2, on ? 'rgba(255,207,90,0.16)' : 'rgba(4,10,24,0.6)');
      const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'; const lab1 = String(w), lab2 = 'φ' + String(idx[i]).split('').map(c => SUP[+c]).join('');
      txt(lab1, x + bw / 2, y0 + 88, { size: 52, fam: F.orb, w: 700, align: 'center', c: on ? C.gold : C.dim, a: zp * (1 - morph) });
      txt(lab2, x + bw / 2, y0 + 92, { size: 56, fam: F.orb, w: 700, align: 'center', c: on ? C.gold : C.dim, a: zp * morph });
      txt(`F${idx[i]}`, x + bw / 2, y0 - 16, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: zp * 0.8 });
    });
    const parts = ks.map(k => FIB[k]);
    txt(`${n} = ${parts.join(' + ')}`, W / 2, 440, { size: 88, fam: F.orb, w: 900, align: 'center', c: C.white, a: zp * (1 - morph), ab: 3 });
    txt('non-adjacent · unique · Zeckendorf', W / 2, 500, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: zp * (1 - morph) });
    if (morph > 0) {
      txt('β(42) = φ⁹ + φ⁶ ≈ 93.957', W / 2, 440, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.gold, a: zp * morph, ab: 3 });
      txt('replace each Fibonacci weight Fₖ by φᵏ', W / 2, 500, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: zp * morph });
      const q = at(S, 2, 0.6, 4.5);
      txt('β(a) + β(b)  =?  β(a + b)', W / 2, 800, { size: 50, fam: F.orb, w: 700, align: 'center', c: C.white, a: zp * q, ab: 2 });
    }
  }
  // deficit heatmap
  const hp = at(S, 3, 1.0);
  if (hp > 0) {
    const N = DATA.deficit.length; const sz = 600; const x = 360, y = 190;
    const rev = eo(clamp((u - lineAt(S, 3).s) / 3.5));
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = hp;
    ctx.beginPath(); ctx.moveTo(x, y + sz); ctx.lineTo(x + sz * 2 * rev, y + sz); ctx.lineTo(x, y + sz - sz * 2 * rev); ctx.closePath(); ctx.clip();
    ctx.drawImage(heat, 0, N - 89, 89, 89, x, y, sz, sz);
    ctx.restore();
    box(x - 6, y - 6, sz + 12, sz + 12, C.cyan, hp * 0.8, 1.2);
    txt('b →', x + sz - 40, y + sz + 36, { size: 20, fam: F.mono, c: C.dim, a: hp });
    txt('a ↑', x - 56, y + 20, { size: 20, fam: F.mono, c: C.dim, a: hp });
    txt(`0 ≤ a, b < 89  ·  exact values`, x, y - 20, { size: 18, fam: F.mono, c: C.dim, a: hp });
    const fx = 1080;
    txt('β(a) + β(b) − β(a + b)', fx, 330, { size: 52, fam: F.orb, w: 700, c: C.white, a: hp, ab: 2 });
    txt('∈  { −1 , 0 , 1 }', fx, 420, { size: 70, fam: F.orb, w: 900, c: C.gold, a: at(S, 3, 0.6, 2.5), ab: 3 });
    const leg = [['−1', C.mag], ['0', '#1b3f77'], ['+1', C.cyan]];
    leg.forEach(([l, c], i) => { ctx.globalAlpha = hp; ctx.fillStyle = c; ctx.fillRect(fx + i * 170, 480, 40, 40); ctx.globalAlpha = 1; txt(l, fx + 54 + i * 170, 512, { size: 28, fam: F.orb, w: 700, c: C.white, a: hp }); });
    const q = at(S, 4, 0.6);
    txt('∀ v₁ v₂ : ℕ', fx, 620, { size: 44, fam: F.mono, w: 700, c: C.cyan, a: q });
    txt('theorem deficit_three_valued', fx, 670, { size: 28, fam: F.mono, c: C.white, a: q });
    stamp('PROVED FOR ALL INPUTS', fx + 330, 770, at(S, 4, 0.4, 1.0), C.green, 34, -0.05);
  }
};

/* ---- 06 REFUTE ---- */
SCENES.refute = S => {
  const u = S.u, t = S.t;
  const a0 = at(S, 0, 0.3) * (1 - at(S, 1, 0.5));
  if (a0 > 0) {
    const flick = rnd(Math.floor(t * 14), 2) > 0.3 ? 1 : 0.3;
    txt('⚠  CONJECTURE DETECTED  ⚠', W / 2, H / 2, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.red, a: a0 * flick, ab: 6, ls: 6 });
    for (let k = 0; k < 6; k++) { ctx.globalAlpha = a0 * 0.4; ctx.fillStyle = C.red; ctx.fillRect(0, H / 2 - 160 + k * 60 + (t * 300 % 60), W, 2); }
    ctx.globalAlpha = 1;
  }
  const cp = at(S, 1, 0.6) * (1 - at(S, 4, 0.5));
  const cardUp = ease(at(S, 2, 0.8));
  if (cp > 0) {
    const y = lerp(260, 150, cardUp);
    panel(W / 2 - 720, y, 1440, 210, cp, C.cyan, 'OEIS · A175406');
    txt('a(n) = the greatest integer k such that (1 + 1/n)ᵏ ≤ 2', W / 2 - 690, y + 85, { size: 32, fam: F.mono, c: C.white, a: cp });
    txt('Conjecture (2012):   a(n) = ⌊(n + ½) · log 2⌋', W / 2 - 690, y + 150, { size: 38, fam: F.mono, w: 700, c: C.gold, a: at(S, 1, 0.5, 2.5), ab: 1.2 });
  }
  // zoom through magnitudes
  const zp = at(S, 2, 0.3) * (1 - at(S, 3, 0.8));
  if (zp > 0) {
    const L2 = lineAt(S, 2);
    const k = ease(clamp((u - L2.s) / 2.6));
    const lg = k * Math.log10(1121626023352383);
    const n = Math.floor(Math.pow(10, lg));
    const final = k >= 1;
    const nStr = final ? '1,121,626,023,352,383' : n.toLocaleString('en-US');
    // magnitude ticks
    ctx.globalCompositeOperation = 'lighter';
    for (let m = 0; m <= 16; m++) {
      const x = W / 2 + (m - lg) * 420; if (x < -50 || x > W + 50) continue;
      line(x, 560, x, 600, C.cyan, zp * 0.8, 2);
      txt(`10^${m}`, x, 630, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: zp * 0.8 });
      for (let q = 1; q < 10; q++) { const xx = x + Math.log10(q) * 420; line(xx, 570, xx, 590, C.cyan, zp * 0.3, 1); }
    }
    ctx.globalCompositeOperation = 'source-over';
    line(0, 580, W, 580, C.cyan, zp * 0.4, 1);
    line(W / 2, 520, W / 2, 610, C.gold, zp, 3);
    txt('n = ' + nStr, W / 2, 500, { size: 64, fam: F.orb, w: 900, align: 'center', c: final ? C.gold : C.white, a: zp, ab: final ? 3 : 1 });
    const rp = clamp((u - L2.s - 2.8) / 0.6);
    if (rp > 0) {
      txt('⌊(n + ½) · log 2⌋  =  777,451,915,729,368', W / 2, 740, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: zp * rp });
      txt('actual  a(n)        =  777,451,915,729,367', W / 2, 800, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: zp * clamp((u - L2.s - 3.2) / 0.5) });
      txt('Δ = 1', W / 2 + 560, 775, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.red, a: zp * clamp((u - L2.s - 3.8) / 0.4), ab: 4 });
    }
  }
  const lp = at(S, 3, 0.6) * (1 - at(S, 4, 0.6));
  if (lp > 0) {
    panel(W / 2 - 700, 420, 1400, 380, lp, C.mag, 'D5/S0/Certificates/GreathouseLogTwoFloorRefutation.lean');
    const code = [
      ['def', ' claim : Prop :='],
      ['', '  ∀ n : ℕ, 1 ≤ n → a n = ⌊((n : ℝ) + 1 / 2) * Real.log 2⌋₊'],
      ['', ''],
      ['theorem', ' result : ¬ claim := by'],
      ['', '  let n₀ : ℕ := 1121626023352383'],
      ['', '  have hLogTwo : HasSum fTwo (Real.log 2) := …   -- certified bounds']
    ];
    const L3 = lineAt(S, 3);
    code.forEach((ln, i) => {
      const p = clamp((u - L3.s - i * 0.35) / 0.4);
      txt(ln[0], W / 2 - 660, 500 + i * 46, { size: 26, fam: F.mono, w: 700, c: C.mag, a: lp * p });
      txt(ln[1], W / 2 - 660 + (ln[0] ? tw(ln[0], 26, F.mono, 700) : 0), 500 + i * 46, { size: 26, fam: F.mono, c: i === 3 ? C.gold : C.white, a: lp * p });
    });
    stamp('REFUTED', W / 2 + 440, 520, at(S, 3, 0.4, 4.0), C.red, 64, -0.1);
  }
  const dp = at(S, 4, 0.8);
  if (dp > 0) {
    const cols = 41, rows = 10, s = 30, g = 6; const x0 = W / 2 - (cols * (s + g)) / 2, y0 = 470;
    const wave = clamp((u - lineAt(S, 4).s) / 4);
    for (let i = 0; i < 410; i++) {
      const c = i % cols, r = Math.floor(i / cols);
      const on = (c + r * 0.5) / (cols + rows * 0.5) < wave;
      const hot = Math.abs((c + r * 0.5) / (cols + rows * 0.5) - wave) < 0.04;
      ctx.globalAlpha = dp * (hot ? 0.95 : on ? 0.55 : 0.12); ctx.fillStyle = hot ? C.gold : on ? C.cyan : C.dim;
      ctx.fillRect(x0 + c * (s + g), y0 + r * (s + g), s, s * 0.7);
    }
    ctx.globalAlpha = 1;
    txt('410', W / 2, 400, { size: 120, fam: F.orb, w: 900, align: 'center', c: C.white, a: dp, ab: 3 });
    txt('PROBLEM DOSSIERS · PUBLISHED CONJECTURES & QUESTIONS · SOURCES + LITERATURE CHECK', W / 2, 870, { size: 22, fam: F.raj, w: 700, align: 'center', c: C.cyan, a: dp, ls: 3 });
  }
};

/* ---- 07 QUANTUM ---- */
function bloch(x, y, r, t, a, col = 'c', spin = 0) {
  if (a <= 0) return;
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = a * 0.6; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
  for (let k = 0; k < 3; k++) { ctx.globalAlpha = a * 0.25; ctx.beginPath(); ctx.ellipse(x, y, r, r * (0.2 + 0.25 * Math.abs(Math.sin(t * 0.7 + k * 1.1 + spin))), 0, 0, TAU); ctx.stroke(); }
  ctx.globalAlpha = a * 0.25; ctx.beginPath(); ctx.ellipse(x, y, r * Math.abs(Math.cos(t * 0.5 + spin)), r, 0, 0, TAU); ctx.stroke();
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  dot(x, y, r * 0.35, col, a);
}
function matrix(x, y, cell, vals, a, col, labels) {
  const n = vals.length;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const v = vals[i][j];
    ctx.globalAlpha = a * (v ? 0.2 + 0.7 * Math.abs(v) * 2 : 0.08); ctx.fillStyle = v ? col : C.dim;
    ctx.fillRect(x + j * cell + 2, y + i * cell + 2, cell - 4, cell - 4);
    ctx.globalAlpha = 1;
    if (v) txt(v === 0.5 ? '½' : String(v), x + j * cell + cell / 2, y + i * cell + cell / 2 + 10, { size: cell * 0.42, fam: F.orb, w: 700, align: 'center', c: '#02030a', a });
  }
  box(x - 6, y - 6, n * cell + 12, n * cell + 12, col, a * 0.7, 1);
  if (labels) labels.forEach((l, i) => txt(l, x - 14, y + i * cell + cell / 2 + 7, { size: 16, fam: F.mono, align: 'right', c: C.dim, a }));
}
SCENES.quantum = S => {
  const u = S.u, t = S.t;
  const tp = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (tp > 0) {
    const r = 170 + 20 * Math.sin(t * 2);
    ctx.globalAlpha = tp; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(W / 2, H / 2 - 40, r * 1.6, r * 0.7, 0, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.arc(W / 2, H / 2 - 40, r * 0.45, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    dot(W / 2, H / 2 - 40, r * 0.3, 'm', tp);
    const sweep = (t * 1.3) % 1; line(W / 2 - r * 1.7, H / 2 - 40 - r * 0.8 + sweep * r * 1.6, W / 2 + r * 1.7, H / 2 - 40 - r * 0.8 + sweep * r * 1.6, C.red, tp * 0.8, 2);
    txt('BLIND SPOT', W / 2, H / 2 + 230, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.white, a: tp, ab: 4, ls: 10 });
  }
  const qp = at(S, 1, 0.8) * (1 - at(S, 4, 0.8));
  const L1 = lineAt(S, 1);
  if (qp > 0) {
    const lx = 520, rx = 1400, y = 330;
    const lp = clamp((u - L1.s) / 0.8), rp = clamp((u - L1.s - 3.5) / 0.8);
    panel(lx - 380, 120, 760, 560, qp * lp, C.mag, 'BELL STATE · ENTANGLED');
    panel(rx - 380, 120, 760, 560, qp * rp, C.gold, 'CLASSICAL COIN FLIP · 00 / 11');
    txt('|Φ⁺⟩ = (|00⟩ + |11⟩) / √2', lx, 200, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.white, a: qp * lp });
    txt('ρ = ½|00⟩⟨00| + ½|11⟩⟨11|', rx, 200, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: qp * rp });
    // qubits
    const sep = 150;
    bloch(lx - sep, y, 70, t, qp * lp, 'm', 0); bloch(lx + sep, y, 70, t, qp * lp, 'm', 1);
    bloch(rx - sep, y, 70, t, qp * rp, 'g', 2); bloch(rx + sep, y, 70, t, qp * rp, 'g', 3);
    // entanglement link
    if (lp > 0) {
      ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = C.mag; ctx.lineWidth = 3;
      for (let k = 0; k < 3; k++) {
        ctx.globalAlpha = qp * lp * (0.7 - k * 0.2); ctx.beginPath();
        for (let s = 0; s <= 60; s++) { const x = lx - sep + 70 + (2 * sep - 140) * s / 60; const yy = y + Math.sin(s / 60 * TAU * 2 + t * 6 + k) * 16 * Math.sin(s / 60 * Math.PI); s ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    }
    if (rp > 0) { const fl = Math.floor(t * 3) % 2; txt(fl ? '00' : '11', rx, y + 12, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: qp * rp }); }
    // density matrices
    const bell = [[0.5, 0, 0, 0.5], [0, 0, 0, 0], [0, 0, 0, 0], [0.5, 0, 0, 0.5]];
    const mix = [[0.5, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0.5]];
    const lab = ['00', '01', '10', '11'];
    const mp = at(S, 1, 0.6, 5.5) * (1 - at(S, 2, 0.6) * 0.0);
    matrix(lx - 110, 450, 55, bell, qp * mp * lp, C.mag, lab);
    matrix(rx - 110, 450, 55, mix, qp * mp * rp, C.gold, lab);
    const ip = at(S, 2, 0.8);
    if (ip > 0) {
      // local marginals identical
      ctx.globalAlpha = qp * ip * 0.88; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 700, W, 250); ctx.globalAlpha = 1;
      const ml = [[0.5, 0], [0, 0.5]];
      [[lx - 170, C.mag], [lx + 70, C.mag], [rx - 170, C.gold], [rx + 70, C.gold]].forEach(([x, c], i) => {
        matrix(x, 740, 50, ml, qp * ip, c, null);
        txt(i % 2 ? 'ρ_B = I/2' : 'ρ_A = I/2', x + 50, 880, { size: 22, fam: F.mono, align: 'center', c: C.white, a: qp * ip });
      });
      txt('≡', W / 2, 820, { size: 110, fam: F.orb, w: 900, align: 'center', c: C.green, a: qp * ip, ab: 3 });
      const gp = at(S, 2, 0.6, 4.2);
      txt('LOCAL: IDENTICAL', W / 2, 700, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.green, a: qp * ip, ls: 4 });
      stamp('WHOLE: DIFFERENT', W / 2, 960, gp, C.red, 40, 0);
    }
    const dp = at(S, 3, 0.8);
    if (dp > 0) {
      ctx.globalAlpha = qp * dp * 0.9; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      // orthogonal sectors visual
      const cx = 620, cy = 520; const ry = t * 0.3;
      const axes = [];
      for (let i = 0; i < 3; i++) axes.push([[1, 0, 0], [0, 1, 0], [0, 0, 1]][i]);
      const drawVec = (v, col, a, lab) => { const p0 = proj(rotX(rotY([0, 0, 0], ry), 0.4), cx, cy, 700, 4); const p1 = proj(rotX(rotY(v.map(x => x * 1.6), ry), 0.4), cx, cy, 700, 4); line(p0[0], p0[1], p1[0], p1[1], col, a, 3); dot(p1[0], p1[1], 10, col === C.mag ? 'm' : col === C.gold ? 'g' : 'c', a); if (lab) txt(lab, p1[0] + 14, p1[1] - 10, { size: 20, fam: F.mono, c: col, a }); };
      drawVec([1, 0, 0], C.cyan, qp * dp, 'local A'); drawVec([0, 1, 0], C.cyan, qp * dp, 'local B');
      for (let k = 0; k < 9; k++) { const an = k / 9 * TAU + t * 0.4; drawVec([0.15 * Math.cos(an), 0.15 * Math.sin(an), -1], C.mag, qp * dp * clamp((u - lineAt(S, 3).s - 1 - k * 0.3) / 0.4), k === 0 ? 'correlations' : null); }
      txt('⊥', cx + 160, cy + 200, { size: 60, fam: F.orb, w: 900, c: C.gold, a: qp * dp });
      txt('dim(correlation sector)', 1120, 400, { size: 36, fam: F.orb, w: 700, c: C.white, a: qp * dp });
      txt('= (m² − 1)(n² − 1)', 1120, 490, { size: 64, fam: F.orb, w: 900, c: C.mag, a: qp * dp, ab: 3 });
      const k2 = at(S, 3, 0.6, 5.5);
      txt('two qubits:  (4 − 1)(4 − 1) = 9', 1120, 580, { size: 34, fam: F.mono, w: 700, c: C.gold, a: qp * k2 });
      txt('orthogonal to both local sectors', 1120, 640, { size: 26, fam: F.mono, c: C.cyan, a: qp * k2 });
    }
  }
  // fiber recovery criterion
  const fp = at(S, 4, 0.8);
  if (fp > 0) {
    const L4 = lineAt(S, 4);
    const x0 = 300, y0 = 250, fw = 110, cols = 8, rows = 5;
    const defect = clamp((u - L4.s - 6.5) / 0.6);
    for (let c = 0; c < cols; c++) {
      const base = ['c', 'm', 'g', 'n', 'c', 'v', 'g', 'm'][c];
      line(x0 + c * fw + fw / 2, y0 - 20, x0 + c * fw + fw / 2, y0 + rows * 80, C.dim, fp * 0.5, 1);
      for (let r = 0; r < rows; r++) {
        let nm = base; if (c === 5 && r === 2 && defect > 0) nm = 'r';
        const jx = (rnd(c, r) - 0.5) * 30, x = x0 + c * fw + fw / 2 + jx, y = y0 + r * 80 + 20;
        const p = clamp((u - L4.s - 0.8 - (c * rows + r) * 0.03) / 0.3);
        dot(x, y, nm === 'r' ? 26 : 18, nm, fp * p);
        // projection down
        const pp = clamp((u - L4.s - 2.2) / 1);
        if (pp > 0) { ctx.globalAlpha = fp * pp * 0.18; ctx.strokeStyle = C.cyan; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x0 + c * fw + fw / 2, y0 + rows * 80 + 90); ctx.stroke(); ctx.globalAlpha = 1; }
      }
      dot(x0 + c * fw + fw / 2, y0 + rows * 80 + 90, 12, 'w', fp * clamp((u - L4.s - 2.4) / 0.6));
    }
    line(x0, y0 + rows * 80 + 90, x0 + cols * fw, y0 + rows * 80 + 90, C.cyan, fp * 0.7, 2);
    txt('observation  →', x0, y0 + rows * 80 + 132, { size: 22, fam: F.mono, c: C.cyan, a: fp });
    txt('FIBERS: states that look the same', x0, y0 - 50, { size: 26, fam: F.orb, w: 700, c: C.white, a: fp, ls: 2 });
    const tx = 1260;
    txt('recover exists', tx, 330, { size: 32, fam: F.mono, w: 700, c: C.white, a: fp });
    txt('⟺', tx + 140, 400, { size: 48, fam: F.orb, w: 900, c: C.gold, a: fp });
    txt('target constant', tx, 470, { size: 32, fam: F.mono, w: 700, c: C.white, a: fp });
    txt('on every fiber', tx, 512, { size: 32, fam: F.mono, w: 700, c: C.white, a: fp });
    txt('theorem target_recovery_criterion', tx, 580, { size: 20, fam: F.mono, c: C.cyan, a: fp * 0.9 });
    if (defect > 0) { stamp('DEFECT ≠ ∅', tx + 200, 670, defect, C.red, 44, -0.06); txt('two targets in one fiber → no recovery', tx, 760, { size: 22, fam: F.mono, c: C.red, a: defect }); }
    else stamp('RECOVERABLE ✓', tx + 200, 670, at(S, 4, 0.4, 3.2), C.green, 40, -0.06);
  }
};

/* ---- 08 SPACETIME ---- */
const EVENTS = [];
for (let w = 0; w < 9; w++) for (let k = 0; k < 9; k++) {
  const id = w * 9 + k; const x0 = (w - 4) * 0.34; const tt = -1.6 + k * 0.4;
  EVENTS.push({ id, w, p: [x0 + Math.sin(k * 0.7 + w) * 0.12, tt, (rnd(w, 7) - 0.5) * 1.2 + Math.cos(k * 0.5 + w) * 0.1] });
}
SCENES.spacetime = S => {
  const u = S.u, t = S.t;
  const bp = clamp(u / 1.2) * (1 - at(S, 3, 0.8));
  if (bp > 0) {
    const ry = t * 0.1 + 0.4, rx = 0.25;
    const pr = p => proj(rotX(rotY([p[0] * 1.5, p[1] * 0.95, p[2] * 1.5], ry), rx), W / 2, H / 2 - 20, 1000, 6.2);
    // light cone
    ctx.globalCompositeOperation = 'lighter';
    const apex = [0, 0, 0];
    for (let k = 0; k < 24; k++) {
      const an = k / 24 * TAU;
      for (const s of [-1, 1]) { const a = pr(apex), b = pr([Math.cos(an) * 1.7, s * 1.7, Math.sin(an) * 1.7]); line(a[0], a[1], b[0], b[1], C.gold, bp * 0.18, 1); }
    }
    for (const s of [-1, 1]) { ctx.beginPath(); for (let k = 0; k <= 48; k++) { const an = k / 48 * TAU; const b = pr([Math.cos(an) * 1.7, s * 1.7, Math.sin(an) * 1.7]); k ? ctx.lineTo(b[0], b[1]) : ctx.moveTo(b[0], b[1]); } ctx.globalAlpha = bp * 0.5; ctx.strokeStyle = C.gold; ctx.stroke(); }
    // worldlines
    for (let w = 0; w < 9; w++) {
      ctx.beginPath(); for (let k = 0; k < 9; k++) { const q = pr(EVENTS[w * 9 + k].p); k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
      ctx.globalAlpha = bp * 0.5; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5; ctx.stroke();
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    // windows
    const wp = at(S, 1, 0.8);
    const WINS = [[-0.9, -0.9, 0.9, 1.0], [-0.2, -0.5, 0.95, 1.05], [0.35, 0.1, 0.9, 1.0], [-0.6, 0.6, 1.0, 0.9]];
    const inWin = [];
    WINS.forEach(([cx, cy, ww, hh], i) => {
      const p = clamp((u - lineAt(S, 1).s - i * 0.6) / 0.6) * wp;
      if (p <= 0) return;
      const zc = 0.2 * (i - 1.5);
      const cs = [[cx - ww / 2, cy - hh / 2, zc], [cx + ww / 2, cy - hh / 2, zc], [cx + ww / 2, cy + hh / 2, zc], [cx - ww / 2, cy + hh / 2, zc]].map(pr);
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = p * 0.12; ctx.fillStyle = [C.cyan, C.mag, C.vio, C.green][i];
      ctx.beginPath(); cs.forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = p * 0.9; ctx.strokeStyle = [C.cyan, C.mag, C.vio, C.green][i]; ctx.lineWidth = 2; ctx.stroke();
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      txt(`WINDOW ${i + 1}`, cs[0][0] + 8, cs[0][1] - 10, { size: 16, fam: F.mono, c: [C.cyan, C.mag, C.vio, C.green][i], a: p });
      inWin.push([cx - ww / 2, cx + ww / 2, cy - hh / 2, cy + hh / 2, p]);
    });
    for (const e of EVENTS) {
      const q = pr(e.p); let lit = 0;
      for (const [x1, x2, y1, y2, p] of inWin) if (e.p[0] > x1 && e.p[0] < x2 && e.p[1] > y1 && e.p[1] < y2) lit += p;
      dot(q[0], q[1], q[2] * (0.03 + 0.02 * Math.min(lit, 2)), lit > 1.2 ? 'g' : lit > 0 ? 'w' : 'c', bp * (0.4 + 0.3 * Math.min(lit, 2)));
    }
    const qp = at(S, 2, 0.6);
    ['WHICH WINDOWS?', 'WHICH RELATIONS?', 'RESOLUTION?', 'COST?'].forEach((s, i) => {
      const p = clamp((u - lineAt(S, 2).s - i * 1.3) / 0.4) * qp;
      txt(s, i % 2 ? W - 120 : 120, 250 + Math.floor(i / 2) * 520 + (i % 2) * 90, { size: 34, fam: F.orb, w: 700, c: [C.cyan, C.mag, C.gold, C.green][i], a: p, align: i % 2 ? 'right' : 'left', ls: 4, ab: 1.5 });
    });
  }
  // hidden archive
  const hp = at(S, 3, 0.8);
  if (hp > 0) {
    const L3 = lineAt(S, 3);
    const arch = (x, extra, title, col) => {
      panel(x - 400, 110, 800, 620, hp, col, title);
      // event timeline
      const evs = [[0.1, 0.3], [0.25, 0.7], [0.4, 0.45], [0.55, 0.2], [0.7, 0.65], [0.85, 0.4]];
      line(x - 340, 360, x + 340, 360, C.dim, hp * 0.6, 1);
      txt('time →', x + 280, 390, { size: 16, fam: F.mono, c: C.dim, a: hp });
      evs.forEach(([tt, yy], i) => dot(x - 340 + tt * 680, 180 + yy * 160, 16, 'c', hp));
      if (extra) {
        const ep = clamp((u - L3.s - 1.2) / 0.6);
        const ex = x - 340 + 0.62 * 680, ey = 180 + 0.9 * 160;
        ctx.globalAlpha = hp * ep; ctx.strokeStyle = C.gold; ctx.setLineDash([5, 5]); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ex, ey, 16 + 4 * Math.sin(t * 4), 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
        txt('+ inactive event', ex + 26, ey + 6, { size: 18, fam: F.mono, c: C.gold, a: hp * ep });
      }
      // spatial snapshot
      txt('SPATIAL READOUT (now)', x - 360, 450, { size: 18, fam: F.orb, w: 700, c: C.white, a: hp, ls: 2 });
      for (let i = 0; i < 12; i++) { const on = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1][i]; ctx.globalAlpha = hp * (on ? 0.85 : 0.15); ctx.fillStyle = C.cyan; ctx.fillRect(x - 360 + i * 60, 470, 50, 50); }
      ctx.globalAlpha = 1;
      txt('TEMPORAL COMPOSITION', x - 360, 590, { size: 18, fam: F.orb, w: 700, c: C.white, a: hp, ls: 2 });
      const cp = clamp((u - L3.s - 4.5) / 0.5);
      if (extra) txt('✗  ILLEGAL', x - 360, 660, { size: 48, fam: F.orb, w: 900, c: C.red, a: hp * cp, ab: 3 });
      else txt('✓  LEGAL', x - 360, 660, { size: 48, fam: F.orb, w: 900, c: C.green, a: hp * cp, ab: 2 });
    };
    arch(W / 2 - 440, false, 'ARCHIVE  A', C.cyan);
    arch(W / 2 + 440, true, 'ARCHIVE  A + e*', C.gold);
    const eq = clamp((u - L3.s - 2.5) / 0.5);
    txt('=', W / 2, 510, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.green, a: hp * eq });
    txt('≠', W / 2, 660, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.red, a: hp * clamp((u - L3.s - 5) / 0.5) });
    const sp = clamp((u - L3.s - 7.5) / 0.6) * (1 - at(S, 4, 0.5));
    txt('SNAPSHOT  ≠  HISTORY', W / 2, 805, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.white, a: hp * sp, ab: 4, ls: 6 });
    const bp2 = at(S, 4, 0.6);
    txt('MODEL OF OBSERVATION  ≠  PHYSICAL SPACETIME', W / 2, 800, { size: 40, w: 700, ab: 1.5, fam: F.mono, align: 'center', c: C.gold, a: bp2 });
  }
};

/* ---- 09 ESCAPE ---- */
SCENES.escape = S => {
  const u = S.u, t = S.t;
  // lattice sphere with leaks
  const cx = W / 2, cy = H / 2 - 60, R = 250;
  ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 10; k++) {
    const lat = (k / 10 - 0.5) * Math.PI;
    ctx.globalAlpha = 0.3; ctx.strokeStyle = C.vio; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(cx, cy + Math.sin(lat) * R, Math.cos(lat) * R, Math.cos(lat) * R * 0.22, 0, 0, TAU); ctx.stroke();
  }
  for (let k = 0; k < 12; k++) {
    const an = k / 12 * Math.PI + t * 0.2;
    ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(Math.cos(an)) * R, R, 0, 0, TAU); ctx.stroke();
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 160; i++) {
    const life = (t * 0.25 + rnd(i, 1)) % 1; const th = rnd(i, 2) * TAU, ph = (rnd(i, 3) - 0.5) * Math.PI;
    const r = R * (0.2 + life * 1.8);
    const x = cx + Math.cos(th) * Math.cos(ph) * r, y = cy + Math.sin(ph) * r;
    dot(x, y, 6 * (1 - life) + 2, life > 0.45 ? 'm' : 'c', (1 - life));
  }
  const qs = ['WHERE DID INFORMATION ESCAPE?', 'HOW WAS THE ESCAPE HANDLED?', 'WHAT NEW INFORMATION EMERGED?', 'WHERE DOES IT KEEP ESCAPING?'];
  const L1 = lineAt(S, 1); const len = L1.e - L1.s;
  const bounds = [0, 0.27, 0.52, 0.76, 1];
  const qa = at(S, 0, 0.6);
  qs.forEach((q, i) => {
    const x = i % 2 ? W - 110 : 110, y = i < 2 ? 200 : 730;
    const on = u >= L1.s + bounds[i] * len;
    const cur = on && u < L1.s + bounds[i + 1] * len + 0.3;
    const a = qa * (on ? 1 : 0.35);
    const w = 700;
    const bx = i % 2 ? x - w : x;
    box(bx, y - 60, w, 110, cur ? C.gold : C.cyan, a * (cur ? 1 : 0.6), cur ? 2.5 : 1.2, `rgba(4,10,24,${0.7 * qa})`);
    txt(`0${i + 1}`, bx + 22, y + 12, { size: 50, fam: F.orb, w: 900, c: cur ? C.gold : C.cyan, a });
    txt(scramble(q, on ? clamp((u - L1.s - bounds[i] * len) / 0.8) : 0.25, i + 20), bx + 120, y + 4, { size: 26, fam: F.raj, w: 700, c: C.white, a, ls: 2 });
  });
  const jp = at(S, 2, 0.6);
  if (jp > 0) {
    panel(W / 2 - 380, H / 2 - 70, 760, 140, jp, C.gold, 'INFORMATION-ESCAPE JUDGE');
    txt('STATUS: UNDER CONSTRUCTION', W / 2, H / 2 + 5, { size: 32, fam: F.orb, w: 700, align: 'center', c: C.gold, a: jp, ls: 3 });
    txt('findings = Observe warnings · non-blocking', W / 2, H / 2 + 48, { size: 20, fam: F.mono, align: 'center', c: C.white, a: jp * 0.9 });
    const vp = at(S, 2, 0.6, 4.5);
    txt('VISIBLE', 380, 560, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: vp, ls: 4 });
    txt('IN THE DARK', W - 380, 560, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.dim, a: vp, ls: 4 });
    for (let k = 0; k < 4; k++) { dot(300 + k * 55, 620, 14, 'c', vp); dot(300 + k * 55, 660, 14, 'm', vp); }
    for (let k = 0; k < 4; k++) { dot(W - 460 + k * 55, 640, 14, 'v', vp * 0.5); dot(W - 460 + k * 55 + 6, 640, 14, 'v', vp * 0.5); }
  }
};

/* ---- 10 TRUST ---- */
SCENES.trust = S => {
  const u = S.u, t = S.t;
  grid(t, 0.35, H * 0.6, C.cyan, 0.6);
  const cx = W / 2, cy = H / 2 - 20;
  const gates = ['ENGINEERING', 'CURRENT', 'DELTA'];
  ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 14; k++) {
    const z = ((k - t * 1.2) % 14 + 14) % 14 + 0.6; const r = 900 / z;
    ctx.globalAlpha = clamp(0.5 - z * 0.03) * 0.6; ctx.strokeStyle = C.vio; ctx.lineWidth = 1.5;
    ctx.beginPath(); for (let q = 0; q <= 6; q++) { const an = q / 6 * TAU + Math.PI / 6; const X = cx + Math.cos(an) * r * 1.4, Y = cy + Math.sin(an) * r; q ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  const gp = at(S, 1, 0.6);
  gates.forEach((g, i) => {
    const r = 330 - i * 90; const p = clamp((u - lineAt(S, 1).s - 5 - i * 0.6) / 0.5) * gp;
    ctx.globalAlpha = p; ctx.strokeStyle = C.green; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(cx, cy, r * 1.4, r, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    txt(g + ' ✓', cx + r * 1.4 + 20, cy - r * 0.2 + i * 40, { size: 22, fam: F.orb, w: 700, c: C.green, a: p, ls: 3 });
  });
  const wp = at(S, 0, 0.5) * (1 - at(S, 1, 0.8));
  txt(scramble('WHO DECIDES WHAT IS TRUE?', at(S, 0, 1.2), 30), cx, cy + 20, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.white, a: wp, ab: 4, ls: 4 });
  const sp = at(S, 1, 0.6) * (1 - at(S, 2, 0.8) * 0.7);
  if (sp > 0) {
    const srcs = [['MAINTAINER', C.cyan, -1], ['STRANGER', C.gold, 0], ['AI', C.mag, 1]];
    srcs.forEach(([s, col, k], i) => {
      const sx = cx + k * 620, sy = H - 330;
      txt(s, sx, sy + 60, { size: 26, fam: F.orb, w: 700, align: 'center', c: col, a: sp, ls: 4 });
      dot(sx, sy, 22, ['c', 'g', 'm'][i], sp);
      for (let q = 0; q < 5; q++) {
        const ph = (t * 0.45 + q / 5 + i * 0.13) % 1; const x = lerp(sx, cx, ei(ph)), y = lerp(sy, cy, ph);
        dot(x, y, 10 * (1 - ph) + 3, ['c', 'g', 'm'][i], sp * (1 - ph));
      }
    });
    const rv = [['MODEL FAMILY A', C.cyan], ['MODEL FAMILY B', C.gold], ['MODEL FAMILY C', C.mag]];
    const rp = clamp((u - lineAt(S, 1).s - 1.5) / 0.6) * sp;
    rv.forEach(([s, col], i) => {
      const an = -Math.PI / 2 + (i - 1) * 0.9; const x = cx + Math.cos(an) * 700, y = cy + Math.sin(an) * 330 - 20;
      txt(s, x, y - 26, { size: 18, fam: F.mono, align: 'center', c: col, a: rp });
      dot(x, y, 16, ['c', 'g', 'm'][i], rp);
      if (rp > 0.5 && Math.floor(t * 4 + i) % 3 === 0) line(x, y, cx + (rnd(Math.floor(t * 4), i) - 0.5) * 200, cy + (rnd(Math.floor(t * 4), i + 3) - 0.5) * 120, col, rp * 0.7, 2);
    });
    txt('ADVERSARIAL REVIEW', cx, 110, { size: 24, fam: F.orb, w: 700, align: 'center', c: C.white, a: rp * 0.9, ls: 6 });
    const kp = clamp((u - lineAt(S, 1).s) / 0.5);
    txt('⊢ LEAN KERNEL', cx, cy + 12, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: kp * sp, ab: 2 });
  }
  const bp = at(S, 2, 0.5);
  if (bp > 0) {
    ctx.globalAlpha = bp * 0.8; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
    const L2 = lineAt(S, 2);
    const st = clamp((u - L2.s - 1.6) / 0.3);
    txt('gate result:  "AWAITING HUMAN REVIEW"', W / 2, 330, { size: 44, fam: F.mono, w: 700, align: 'center', c: st > 0 ? C.dim : C.white, a: bp });
    if (st > 0) { const w = tw('gate result:  "AWAITING HUMAN REVIEW"', 44, F.mono, 700); line(W / 2 - w / 2, 316, W / 2 - w / 2 + w * st, 316, C.red, bp, 5); }
    stamp('= HARNESS BUG', W / 2, 450, clamp((u - L2.s - 2.2) / 0.4), C.red, 60, -0.04);
    const cp = clamp((u - L2.s - 4.2) / 0.5);
    panel(W / 2 - 760, 580, 700, 260, cp, C.gold, 'HUMANS');
    panel(W / 2 + 60, 580, 700, 260, clamp((u - L2.s - 6.3) / 0.5), C.cyan, 'MACHINES');
    txt('choose directions', W / 2 - 410, 690, { size: 38, fam: F.raj, w: 700, align: 'center', c: C.white, a: cp });
    txt('authorize the irreversible', W / 2 - 410, 760, { size: 38, fam: F.raj, w: 700, align: 'center', c: C.white, a: cp });
    txt('judge right and wrong', W / 2 + 410, 725, { size: 44, fam: F.raj, w: 700, align: 'center', c: C.white, a: clamp((u - L2.s - 6.3) / 0.5) });
  }
};

/* ---- 11 HEARTS ---- */
const ZEROS = [14.1347, 21.022, 25.0109, 30.4249, 32.9351, 37.5862, 40.9187, 43.3271, 48.0052, 49.7738, 52.9703, 56.4462, 59.347, 60.8318, 65.1125];
function heart(x, y, R, t, name, col, a, phase = 0) {
  if (a <= 0) return;
  const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7 + phase)) + 0.05 * Math.max(0, Math.sin(t * 7 + phase - 1.2));
  for (let i = 0; i < 220; i++) {
    const th = rnd(i, 1) * TAU, ph = Math.acos(2 * rnd(i, 2) - 1); const rr = R * beat * (0.6 + 0.4 * rnd(i, 3));
    let p = [Math.sin(ph) * Math.cos(th) * rr, Math.cos(ph) * rr, Math.sin(ph) * Math.sin(th) * rr];
    p = rotY(p, t * 0.4 + phase);
    const q = proj(p.map(v => v / 100), x, y, 700, 6);
    dot(q[0], q[1], 3 + q[2] * 0.02, name, a * clamp(q[2] / 140));
  }
  dot(x, y, R * 0.55 * beat, name, a * 0.9);
  ctx.globalAlpha = a * 0.6; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, R * 1.25 * beat, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
}
SCENES.hearts = S => {
  const u = S.u, t = S.t;
  const hp = clamp(u / 1.2) * (1 - at(S, 4, 0.8));
  const focus6 = at(S, 1, 0.8) * (1 - at(S, 2, 0.6)), focus5 = at(S, 2, 0.6) * (1 - at(S, 3, 0.6));
  const x5 = W / 2 - 420 - focus6 * 200 + focus5 * 80, x6 = W / 2 + 420 + focus6 * 200 + focus5 * 800;
  heart(x5, 470, 150, t, 'g', C.gold, hp * (1 - focus6 * 0.7), 0);
  heart(x6, 470, 150, t, 'm', C.mag, hp * (1 - focus5 * 0.85), 1.7);
  txt('O-5', x5, 720, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.gold, a: hp * (1 - focus6 * 0.7), ab: 2 });
  txt('O-6', x6, 720, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.mag, a: hp * (1 - focus5 * 0.85), ab: 2 });
  txt('D5/X_Frontier/Hearts.lean', W / 2, 160, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: hp * (1 - Math.max(focus5, focus6)) * (1 - at(S, 3, 0.4)) });
  if (focus6 > 0) {
    const x0 = 250, y0 = 880; const sx = 520;
    line(x0 - 60, y0, x0 + 640, y0, C.dim, focus6, 1);
    line(x0 + sx * 0.5, y0 + 20, x0 + sx * 0.5, 130, C.gold, focus6, 2);
    txt('Re(s) = ½', x0 + sx * 0.5 + 12, 150, { size: 20, fam: F.mono, c: C.gold, a: focus6 });
    const L1 = lineAt(S, 1);
    ZEROS.forEach((z, i) => { const p = clamp((u - L1.s - i * 0.35) / 0.3); dot(x0 + sx * 0.5, y0 - z * 11, 11, 'c', focus6 * p); txt(z.toFixed(2) + 'i', x0 + sx * 0.5 + 20, y0 - z * 11 + 6, { size: 14, fam: F.mono, c: C.cyan, a: focus6 * p * 0.7 }); });
    txt('WEIL POSITIVITY', x6 - 30, 220, { size: 36, fam: F.orb, w: 700, align: 'center', c: C.mag, a: focus6, ls: 4 });
    txt('statement  ✓', x6 - 150, 770, { size: 34, fam: F.mono, w: 700, c: C.green, a: focus6 });
    txt('proof      ∅', x6 - 150, 820, { size: 34, fam: F.mono, w: 700, c: C.red, a: clamp((u - L1.s - 6.5) / 0.4) * focus6 });
  }
  if (focus5 > 0) {
    const px = 760, py = 250;
    panel(px, py, 1060, 440, focus5, C.gold, 'theorem o5_independence');
    const code = ['theorem o5_independence :', '    ∃ Zqc : ℂ → ℂ,', '      MeromorphicOn Zqc {s | 0 < s.re} ∧', '      (∀ s, 1 / φ ^ 2 < s.re → Zqc s = eulerGerm s) ∧ …', ':= by'];
    code.forEach((c, i) => txt(c, px + 30, py + 80 + i * 44, { size: 26, fam: F.mono, c: C.white, a: focus5 }));
    const glow = 0.7 + 0.3 * Math.sin(t * 5);
    txt('  sorry', px + 30, py + 80 + 5 * 44 + 20, { size: 64, fam: F.mono, w: 700, c: C.gold, a: focus5 * glow, ab: 4 });
  }
  const np = at(S, 3, 0.6) * (1 - at(S, 4, 0.6));
  if (np > 0) {
    stamp('RIEMANN HYPOTHESIS: NOT CLAIMED', W / 2, 200, np, C.white, 46, -0.03);
    stamp('STATUS: OPEN', W / 2, 480, clamp((u - lineAt(S, 3).s - 3.5) / 0.4), C.gold, 50, 0.03);
  }
  const gp = at(S, 4, 1.0);
  if (gp > 0) {
    // Gödel droste tunnel
    for (let k = 14; k >= 0; k--) {
      const z = ((k - t * 0.8) % 14 + 14) % 14; const s = Math.pow(0.78, z); const w = 1500 * s, h = 840 * s;
      const rot = z * 0.08 + t * 0.05;
      ctx.save(); ctx.translate(W / 2, H / 2 - 40); ctx.rotate(rot);
      ctx.globalAlpha = gp * clamp(1 - z / 14) * 0.9; ctx.strokeStyle = k % 2 ? C.cyan : C.vio; ctx.lineWidth = 2;
      ctx.strokeRect(-w / 2, -h / 2, w, h);
      if (w > 200) { ctx.font = `700 ${Math.max(10, 22 * s)}px ${F.mono}`; ctx.fillStyle = k % 2 ? C.cyan : C.vio; ctx.fillText('⊢ system ' + (14 - k), -w / 2 + 10, -h / 2 + 26 * s + 4); }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    txt('open', W / 2, H / 2 - 20, { size: 42, fam: F.mono, w: 700, align: 'center', c: C.gold, a: gp * (0.7 + 0.3 * Math.sin(t * 4)), ab: 2 });
    const L4 = lineAt(S, 4);
    const hp2 = clamp((u - L4.s - 6.2) / 0.6);
    ctx.globalAlpha = hp2 * 0.75; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 590, W, 190); ctx.globalAlpha = 1;
    txt('THE REPOSITORY CAN RUN UNATTENDED.', W / 2, 665, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: hp2, ab: 2, ls: 3 });
    txt('HONESTY CANNOT.', W / 2, 740, { size: 58, fam: F.orb, w: 900, align: 'center', c: C.gold, a: clamp((u - L4.s - 7.6) / 0.6), ab: 3, ls: 6 });
    txt('Gödel, 1931 · incompleteness', W / 2, 150, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: gp * (1 - hp2 * 0.3) });
  }
};

/* ---- 12 FINALE ---- */
const PRIMES = (function () { const N = 40000; const s = new Uint8Array(N + 1); const out = []; for (let i = 2; i <= N; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } } return new Set(out); })();
SCENES.finale = S => {
  const u = S.u, t = S.t;
  const pp = clamp(u / 1.2) * (1 - at(S, 2, 0.8));
  if (pp > 0) {
    // Sacks spiral of primes
    const kk = lerp(12, 2.35, ease(clamp(u / 11)));
    const cx = W / 2, cy = H / 2 - 20;
    ctx.globalCompositeOperation = 'lighter';
    const nMax = Math.floor(lerp(900, 40000, ease(clamp(u / 10))));
    for (let n = 2; n < nMax; n++) {
      if (!PRIMES.has(n)) continue;
      const r = Math.sqrt(n) * kk, an = Math.sqrt(n) * TAU + t * 0.05;
      const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r;
      if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;
      const fresh = n > nMax - nMax * 0.06;
      ctx.globalAlpha = pp * (fresh ? 1 : 0.8); ctx.fillStyle = fresh ? C.gold : (n % 4 === 1 ? C.cyan : C.mag);
      const sz = fresh ? 4.5 : 3.2; ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    const fr = Math.sqrt(nMax) * kk;
    ctx.globalAlpha = pp * 0.6; ctx.strokeStyle = C.orange; ctx.setLineDash([14, 10]); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, fr, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    txt('FRONTIER →  ∞', cx + Math.min(fr, 700) * 0.72 + 20, cy - Math.min(fr, 700) * 0.72, { size: 26, fam: F.orb, w: 700, c: C.orange, a: pp, ls: 3 });
    const tp = at(S, 1, 0.8);
    txt('PRIMES OF TRUTH', W / 2, 170, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.white, a: tp * pp, ab: 3, ls: 10 });
    txt('irreducible · verified · fixed in place', W / 2, 225, { size: 26, fam: F.mono, align: 'center', c: C.gold, a: tp * pp });
  }
  const lp = at(S, 2, 0.6) * (1 - at(S, 3, 0.6));
  if (lp > 0) {
    panel(W / 2 - 700, 250, 1400, 470, lp, C.green, 'LEDGER');
    const L2 = lineAt(S, 2);
    const rows = ['4971  freeze  D5/S3/Quantum/Entanglement/…        ✓', '4972  freeze  D5/S0/Certificates/…                 ✓', '4973  cover   atom 7f3a…  → absorbed-closed         ✓', '4974  refute  claim  → result : ¬ claim            ✓', '4975  freeze  D5/S1/Deficit/…                      ✓', '4976  open    ▮'];
    rows.forEach((r, i) => txt(typed(r, clamp((u - L2.s + 0.6 - i * 0.25) / 0.4)), W / 2 - 660, 330 + i * 56, { size: 26, fam: F.mono, c: i === 5 ? C.gold : C.green, a: lp }));
    const np = clamp((u - L2.s - 2.4) / 0.5);
    txt('last line  ⟶  first line of the next round', W / 2, 690, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: lp * np, ls: 2 });
  }
  const ap = at(S, 3, 1.0);
  if (ap > 0) {
    // abyss tunnel + eye
    const cx = W / 2, cy = H / 2 - 30;
    const fade = 1 - clamp((u - lineAt(S, 3).e - 1.2) / 1.2);
    ctx.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 26; k++) {
      const z = ((k - t * 2.2) % 26 + 26) % 26 + 0.5; const r = 1400 / z;
      ctx.globalAlpha = ap * fade * clamp(z / 26 * 1.4) * 0.5; ctx.strokeStyle = k % 3 ? C.vio : C.cyan; ctx.lineWidth = 2;
      ctx.beginPath(); for (let q = 0; q <= 8; q++) { const an = q / 8 * TAU + z * 0.05; const X = cx + Math.cos(an) * r, Y = cy + Math.sin(an) * r * 0.62; q ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    const open = eo(clamp((u - lineAt(S, 3).s - 1.5) / 1.4)) * fade;
    ctx.save(); ctx.translate(cx, cy);
    ctx.globalAlpha = ap * fade; ctx.strokeStyle = C.white; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-260, 0); ctx.quadraticCurveTo(0, -200 * open, 260, 0); ctx.quadraticCurveTo(0, 200 * open, -260, 0); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.moveTo(-260, 0); ctx.quadraticCurveTo(0, -200 * open, 260, 0); ctx.quadraticCurveTo(0, 200 * open, -260, 0); ctx.clip();
    const g = ctx.createRadialGradient(0, 0, 5, 0, 0, 95); g.addColorStop(0, '#000'); g.addColorStop(0.35, '#000'); g.addColorStop(0.4, C.mag); g.addColorStop(0.8, C.vio); g.addColorStop(1, 'rgba(10,0,40,0.2)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(Math.sin(t * 0.7) * 10, 0, 95, 0, TAU); ctx.fill();
    ctx.restore(); ctx.restore(); ctx.globalAlpha = 1;
    txt('“And if thou gaze long into an abyss,', W / 2, 200, { size: 38, fam: F.raj, w: 500, align: 'center', c: C.white, a: ap * fade });
    txt('the abyss will also gaze into thee.”', W / 2, 250, { size: 38, fam: F.raj, w: 500, align: 'center', c: C.white, a: at(S, 3, 0.8, 2) * fade });
    txt('— Nietzsche, Beyond Good and Evil §146', W / 2, 300, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: at(S, 3, 0.8, 3) * fade });
  }
  // end card
  const ep = clamp((u - lineAt(S, 3).e - 1.6) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    const planes = [[0, 3, t * 0.3], [1, 3, t * 0.2], [2, 3, t * 0.15]];
    drawHyper(CUBE4, planes, { scale: 0.7, rx: 0.4, ry: t * 0.2, a: ep * out * 0.8, cy: 360, lw: 2 });
    grid(t, 0.5 * ep * out);
    txt('TRURETURING', W / 2, 640, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', a: ep * out, ab: 5, ls: 12 });
    txt('TRUE · RETURN · TURING', W / 2, 700, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: ep * out, ls: 10 });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: clamp((u - lineAt(S, 3).e - 2.4) / 0.8) * out });
    txt('Bring a question that matters to you.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - lineAt(S, 3).e - 3.2) / 0.8) * out });
    txt('Lean 4 · Mathlib · machine-checked', W / 2, 920, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: clamp((u - lineAt(S, 3).e - 3.8) / 0.8) * out });
  }
};

/* ---------- post-processing, HUD, subtitles ---------- */
function bloom(strength = 0.62) {
  sctx.globalCompositeOperation = 'source-over'; sctx.filter = 'none';
  sctx.clearRect(0, 0, 480, 270);
  sctx.filter = 'blur(5px)'; sctx.drawImage(cv, 0, 0, 480, 270); sctx.filter = 'none';
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = strength; ctx.drawImage(small, 0, 0, W, H); ctx.restore();
}
const NAMES = { boot: 'BOOT', title: 'IDENT', dao: 'DAO', kernel: 'KERNEL', dag: 'TRUTH-DAG', golden: 'GOLDEN', refute: 'REFUTE', quantum: 'BLIND-SPOT', spacetime: 'HOLO-SPACETIME', escape: 'ESCAPE', trust: 'ZERO-TRUST', hearts: 'HEARTS', finale: 'FRONTIER' };
function hud(t, f, si, s) {
  const a = 0.75;
  ctx.globalAlpha = a; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2;
  const m = 34, k = 46;
  ctx.beginPath();
  ctx.moveTo(m, m + k); ctx.lineTo(m, m); ctx.lineTo(m + k, m);
  ctx.moveTo(W - m - k, m); ctx.lineTo(W - m, m); ctx.lineTo(W - m, m + k);
  ctx.moveTo(W - m, H - m - k); ctx.lineTo(W - m, H - m); ctx.lineTo(W - m - k, H - m);
  ctx.moveTo(m + k, H - m); ctx.lineTo(m, H - m); ctx.lineTo(m, H - m - k);
  ctx.stroke(); ctx.globalAlpha = 1;
  txt('TRURETURING // HOLO-SCAN Δ5', 60, 72, { size: 16, fam: F.mono, w: 700, c: C.cyan, a: 0.8, ls: 2 });
  txt(`SEQ ${String(si + 1).padStart(2, '0')}/${TL.scenes.length} · ${NAMES[s.id] || s.id.toUpperCase()}`, 60, 96, { size: 14, fam: F.mono, c: C.mag, a: 0.8, ls: 2 });
  const tc = (x) => String(Math.floor(x)).padStart(2, '0');
  txt(`T+${tc(t / 60)}:${tc(t % 60)}:${tc((t * FPS) % FPS)}`, W - 60, 72, { size: 16, fam: F.mono, w: 700, c: C.cyan, a: 0.8, align: 'right', ls: 2 });
  txt(`DIM ${(4 + 0.5 * Math.sin(t * 0.3)).toFixed(3)} · φ 1.618034`, W - 60, 96, { size: 14, fam: F.mono, c: C.gold, a: 0.7, align: 'right', ls: 1 });
  // right hex stream
  font(400, 12, F.mono); ctx.textAlign = 'right'; ctx.fillStyle = C.cyan;
  const off = Math.floor(t * 8);
  for (let r = 0; r < 22; r++) {
    const hsh = DATA.corpus.hashes[(r + off) % DATA.corpus.hashes.length][1];
    ctx.globalAlpha = 0.18 + 0.12 * (r === 21 ? 1 : 0); ctx.fillText(hsh.slice(7 + (r % 5) * 6, 7 + (r % 5) * 6 + 16), W - 58, 160 + r * 20);
  }
  ctx.globalAlpha = 1;
  // reticle
  const rx = 80, ry = H - 110;
  ctx.globalAlpha = 0.6; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(rx, ry, 26, t * 1.5, t * 1.5 + 4.5); ctx.stroke();
  ctx.beginPath(); ctx.arc(rx, ry, 16, -t * 2.2, -t * 2.2 + 3.5); ctx.stroke(); ctx.globalAlpha = 1;
  for (let i = 0; i < 7; i++) { const h = 4 + 18 * Math.abs(Math.sin(t * 3 + i * 0.9) * Math.sin(t * 1.7 + i)); ctx.globalAlpha = 0.5; ctx.fillStyle = i % 3 ? C.cyan : C.mag; ctx.fillRect(116 + i * 6, ry + 12 - h, 4, h); }
  ctx.globalAlpha = 1;
}
function wrap(s, size, fam, w, maxW) {
  // CJK lines split per character, but runs of Latin letters, digits and '/' stay whole
  const words = /[一-鿿]/.test(s) ? (s.match(/[A-Za-z0-9/()+\-−=_.^·²³⁴⁵⁶⁷⁸⁹⁰⁻ⁿʲ₀-₉√|α-ωΑ-Ω∞≤≥⊥'\[\]{}]+|[\s\S]/g) || []) : s.split(' ');
  const sep = /[一-鿿]/.test(s) ? '' : ' ';
  const lines = []; let cur = '';
  for (const wd of words) {
    const tr = cur ? cur + sep + wd : wd;
    if (tw(tr, size, fam, w) > maxW && cur) { lines.push(cur.trimEnd()); cur = wd.trim() ? wd : ''; } else cur = tr;
  }
  if (cur) lines.push(cur);
  // avoid a line starting with CJK punctuation
  for (let i = 1; i < lines.length; i++) {
    if (/^[，。、；：！？”）》」』]/.test(lines[i])) { lines[i - 1] += lines[i][0]; lines[i] = lines[i].slice(1); }
    if (/[“（《「『]$/.test(lines[i - 1])) { lines[i] = lines[i - 1].slice(-1) + lines[i]; lines[i - 1] = lines[i - 1].slice(0, -1); }
    if (/^\s*[=+−×÷≤≥]/.test(lines[i])) { const m = lines[i - 1].match(/[^\s，。、；：！？]+\s*$/); if (m && m[0].length < lines[i - 1].length) { lines[i - 1] = lines[i - 1].slice(0, -m[0].length); lines[i] = m[0].trimEnd() + ' ' + lines[i].trimStart(); } }
  }
  return lines;
}
const SUBS = { en: true, zh: true };
function subtitles(t) {
  const l = TL.lines.find(x => t >= x.start - 0.15 && t <= x.end + 0.35);
  if (!l) return;
  const a = clamp((t - (l.start - 0.15)) / 0.15) * clamp((l.end + 0.35 - t) / 0.2);
  const zh = SUBS.zh ? wrap(l.zh, 40, F.zh, 700, 1500) : [];
  const en = SUBS.en ? wrap(l.en, 26, F.raj, 600, 1560) : [];
  const h = zh.length * 52 + en.length * 32 + 26;
  const y0 = H - 46 - h;
  ctx.globalAlpha = 0.5 * a; ctx.fillStyle = '#000';
  const bw = Math.max(...zh.map(s => tw(s, 40, F.zh, 700)), ...en.map(s => tw(s, 26, F.raj, 600)), 200) + 70;
  ctx.fillRect(W / 2 - bw / 2, y0, bw, h); ctx.globalAlpha = 1;
  line(W / 2 - bw / 2, y0, W / 2 - bw / 2, y0 + h, C.cyan, a * 0.9, 3);
  line(W / 2 + bw / 2, y0, W / 2 + bw / 2, y0 + h, C.mag, a * 0.9, 3);
  let y = y0 + 50;
  zh.forEach(s => { txt(s, W / 2, y, { size: 40, fam: F.zh, w: 700, align: 'center', c: '#ffffff', a }); y += 52; });
  y -= 8;
  en.forEach(s => { txt(s, W / 2, y + 4, { size: 26, fam: F.raj, w: 600, align: 'center', c: '#9fefff', a: a * 0.95 }); y += 32; });
}
function post(f) {
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(scan, 0, 0);
  ctx.drawImage(vign, 0, 0);
  ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(grains[f % grains.length], 0, 0, W, H);
  ctx.globalCompositeOperation = 'source-over';
}
function glitchAmount(t) {
  let g = 0;
  for (const s of TL.scenes) { const d = t - s.start; if (d > -0.3 && d < 0.45) g = Math.max(g, 1 - Math.abs(d - 0.05) / 0.4); }
  const slot = Math.floor(t / 0.2); if (rnd(slot, 77) > 0.965) g = Math.max(g, 0.35);
  return clamp(g);
}
function glitch(t, f) {
  const g = glitchAmount(t); if (g <= 0.02) return;
  bctx.globalCompositeOperation = 'copy'; bctx.drawImage(cv, 0, 0); bctx.globalCompositeOperation = 'source-over';
  const n = Math.floor(4 + g * 18);
  for (let i = 0; i < n; i++) {
    const y = Math.floor(rnd(f, i) * H), h = Math.floor(4 + rnd(f, i + 50) * 70 * g), dx = (rnd(f, i + 90) - 0.5) * 180 * g;
    ctx.drawImage(buf, 0, y, W, h, dx, y, W, h);
    if (rnd(f, i + 130) > 0.7) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25 * g; ctx.fillStyle = rnd(f, i + 170) > 0.5 ? C.mag : C.cyan; ctx.fillRect(0, y, W, h); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; }
  }
  ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35 * g; ctx.drawImage(buf, 10 * g, 0, W, H, 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}

function renderAt(t) {
  const f = Math.round(t * FPS);
  let si = TL.scenes.findIndex(s => t >= s.start && t < s.end);
  if (si < 0) si = TL.scenes.length - 1;
  const s = TL.scenes[si];
  const u = t - s.start, d = s.end - s.start;
  const S = { u, d, p: u / d, L: SC[s.id].lines, t, f };
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
  background(t, s, si, u);
  SCENES[s.id](S);
  // scene cross-dip
  const fade = Math.min(clamp(u / 0.45), clamp((d - u) / 0.45));
  if (fade < 1) { ctx.globalAlpha = (1 - fade) * 0.85; ctx.fillStyle = '#010208'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
  bloom();
  hud(t, f, si, s);
  subtitles(t);
  post(f);
  glitch(t, f);
  // global fade in/out
  const gIn = clamp(t / 0.8), gOut = clamp((TL.duration - t) / 1.2);
  if (gIn < 1 || gOut < 1) { ctx.globalAlpha = 1 - Math.min(gIn, gOut); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
}


function poster() {
  const t = 23.7;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 5);
  const planes = [[0, 4, t * 0.21], [1, 3, t * 0.17], [2, 4, t * 0.13], [3, 4, t * 0.19], [0, 2, t * 0.07]];
  drawHyper(CUBE5, planes, { scale: 2.1, rx: 0.3, ry: t * 0.05, a: 0.5, dots: true, lw: 1.4, camZ: 7, cy: H / 2 - 30 });
  grid(t, 0.7);
  txt('真理不是被计算出来的', W / 2, 250, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('而是被发现的', W / 2, 350, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.gold, ab: 4 });
  txt('TRURETURING', W / 2, 560, { size: 150, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', ab: 7, ls: 14 });
  txt('TRUE · RETURN · TURING', W / 2, 640, { size: 40, fam: F.orb, w: 700, align: 'center', c: C.cyan, ls: 10, ab: 2 });
  bloom(0.7);
  panel(W / 2 - 640, 740, 1280, 120, 1, C.mag, 'LEAN 4 KERNEL · MACHINE-CHECKED');
  txt('5,074 files · 29,642 theorems & lemmas · 4,976 frozen · 2 open hearts', W / 2, 818, { size: 29, fam: F.mono, w: 700, align: 'center', c: C.white });
  txt('一台只增不减的真理机器  ·  全息高维时空几何', W / 2, 950, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.cyan });
  hud(t, 711, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster;
window.renderAt = renderAt;
window.SUBS = SUBS;
window.ready = (async () => {
  const fams = [['900 40px Orbitron'], ['700 40px Orbitron'], ['400 20px "JetBrains Mono"'], ['700 20px "JetBrains Mono"'], ['600 20px Rajdhani'], ['700 20px Rajdhani'], ['500 20px Rajdhani'], ['700 40px "Noto Sans SC"', '道真理'], ['900 40px "Noto Sans SC"', '道']];
  await Promise.all(fams.map(([f, s]) => document.fonts.load(f, s || 'ABC').catch(() => null)));
  buildResources();
  return true;
})();
