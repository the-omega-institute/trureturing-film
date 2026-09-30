/* Film 026 — FROM GUESS TO THEOREM. */

function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    open: ['OPEN PROBLEM · NOT SOLVED HERE', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function badges(S, kinds) {
  let k = 0;
  for (let i = 0; i < kinds.length; i++) if (S.u >= lineAt(S, i).s - 0.3) k = i;
  const since = S.u - (k === 0 ? 0 : lineAt(S, k).s - 0.3);
  badge(clamp(since / 0.5) * clamp(S.u / 0.8), kinds[k]);
}
function thm(name, x, y, a, align = 'left') { txt(name, x, y, { size: 18, fam: F.mono, c: C.dim, a, align }); }
function ring(x, y, r, col, a, lw = 2) { if (a <= 0) return; ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
function arrow(x1, y1, x2, y2, col, a, w = 2.5) {
  if (a <= 0) return;
  line(x1, y1, x2, y2, col, a, w);
  const an = Math.atan2(y2 - y1, x2 - x1), L = 14;
  line(x2, y2, x2 - L * Math.cos(an - 0.4), y2 - L * Math.sin(an - 0.4), col, a, w);
  line(x2, y2, x2 - L * Math.cos(an + 0.4), y2 - L * Math.sin(an + 0.4), col, a, w);
}
function fillBox(x, y, w, h, col, a) { if (a <= 0) return; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(x, y, w, h); ctx.globalAlpha = 1; }
function curve(fn, n, col, a, lw = 3) {
  if (a <= 0) return;
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i <= n; i++) { const [x, y] = fn(i / n); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke(); ctx.globalAlpha = 1;
}
const P = (S, k, off = 0, dur = 0.5) => clamp((S.u - lineAt(S, k).s - off) / dur);
/* qubit sphere with a state arrow (theta from +z, phi azimuth) */
function qubit(x, y, r, th, ph, a, col = C.cyan, t = 0) {
  if (a <= 0) return;
  ring(x, y, r, C.cyan, a * 0.55, 1.5);
  ctx.globalAlpha = a * 0.3; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.28, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
  line(x, y - r - 10, x, y + r + 10, C.dim, a * 0.5, 1);
  const vx = Math.sin(th) * Math.cos(ph), vy = Math.sin(th) * Math.sin(ph), vz = Math.cos(th);
  const px = x + vx * r, py = y - vz * r + vy * r * 0.28;
  arrow(x, y, px, py, col, a, 3);
  dot(px, py, 14, col === C.mag ? 'm' : col === C.gold ? 'g' : 'c', a);
}
/* interference fringes with visibility V */
function fringes(x, y, w, h, V, a, col = C.cyan) {
  if (a <= 0) return;
  for (let i = 0; i < w; i += 3) {
    const I = 0.5 * (1 + V * Math.cos(i / w * TAU * 4));
    fillBox(x + i, y, 3, h, col, a * (0.08 + 0.85 * I));
  }
  box(x, y, w, h, C.dim, a * 0.6, 1);
}

/* ---- film 026 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    proof: ['LEAN KERNEL · FROZEN · ∀ PROVED · VALUES RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    meta: ['HOW EVERY RESULT HERE IS BUILT', C.cyan, 'rgba(0,25,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function source(S, n, title, src) {
  const a = at(S, 0, 0.6);
  txt('CASE ' + n, 150, 210, { size: 22, fam: F.mono, w: 700, c: C.mag, a, ls: 4 });
  txt(title, 150, 262, { size: 44, fam: F.orb, w: 900, c: C.white, a, ab: 1 });
  txt(src, 150, 300, { size: 20, fam: F.mono, c: C.orange, a });
}
function qed(S, x, y, k = 1, off = 4) { stamp('THEOREM ∀ n', x, y, P(S, k, off), C.green, 40, -0.05); }

const CASES = [['pixels', 'Rule 201', C.cyan], ['rope', 'semi-meanders', C.mag], ['game', 'Torpedo, d ≥ 5', C.gold], ['measurement', '2·G⁻¹ ∈ ℤ', C.vio], ['arrows', 'cubic', C.orange], ['round table', 'Padovan', C.green], ['cubes', '6 shapes', C.cyan], ['identity', 'Σ = 0', C.gold]];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  CASES.forEach(([name, what, col], i) => {
    const a0 = i / 8 * TAU + t * 0.05, x = W / 2 + Math.cos(a0) * 560, y = 470 + Math.sin(a0) * 260, q = sp * P(S, 0, 1 + i * 0.5);
    box(x - 150, y - 60, 300, 120, col, q, 2, 'rgba(0,0,0,0.5)');
    txt(name, x, y - 14, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: q });
    txt(what, x, y + 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    const s = P(S, 1, 1 + i * 0.6);
    if (s > 0) stamp('✓', x + 120, y - 44, s, C.green, 40, -0.1);
  });
  txt('checked on examples …', W / 2, 460, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 0, 2) * (1 - P(S, 1, 0)), ab: 2 });
  txt('∀ n : proved', W / 2, 460, { size: 56, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 0.5), ab: 2 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  for (let i = 0; i < 40; i++) { const x = W / 2 + Math.cos(i * 2.4 + t * 0.2) * (120 + i * 9), y = 330 + Math.sin(i * 2.4 + t * 0.2) * (60 + i * 4); dot(x, y, 6, 'n', rp * 0.6); }
  txt(scramble('FROM GUESS TO THEOREM', rp, 261), W / 2, 640, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('猜 想 被 证 明 · 八 个 猜 想 · 八 个 证 明', W / 2, 715, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 026 · 8 FROZEN LEAN PROOFS', W / 2, 115, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['∃ one case: refute', C.red], ['∀ cases: prove', C.green]].forEach(([s, col], i) => chip(W / 2 + (i - 0.5) * 520, 810, 460, 64, s, col, P(S, 1, 0.5 + i * 1.5), 24));
};

/* ---- 02 METHOD ---- */
SCENES.method = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'meta');
  const p0 = at(S, 0, 0.6);
  for (let i = 0; i < 60; i++) { const x = 1200 + (i % 10) * 50, y = 260 + Math.floor(i / 10) * 55, lit = clamp(P(S, 0, 2, 6) * 60 - i); dot(x, y, 10 + 4 * lit, lit > 0.5 ? 'n' : 'c', p0 * (0.4 + 0.6 * lit)); }
  txt('every case, one reason', 1425, 620, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 6) });
  box(180, 220, 900, 380, C.cyan, p0, 2, 'rgba(0,10,20,0.7)');
  const code = [['-- the published statement, quantifiers written out', C.dim, 0], ['def claim : Prop :=', C.cyan, 0], ['  ∀ n, hypotheses n → conclusion n', C.white, 0], ['', C.dim, 0], ['-- the proof', C.dim, 1], ['theorem result : claim := by', C.green, 1], ['  intro n h', C.white, 1], ['  exact reason n h   -- works for every n', C.white, 1]];
  code.forEach(([s, col, k], i) => { const q = P(S, k, k ? 0.3 + (i - 4) * 0.8 : 0.5 + i * 0.6); txt(s, 220, 280 + i * 42, { size: 26, fam: F.mono, w: 700, c: col, a: q }); });
  chip(W / 2, 760, 640, 64, 'kernel checks every step → frozen', C.green, P(S, 1, 5), 26);
};

/* ---- 03 PIXELS (Rule 201) ---- */
const CA = (() => { const N = 16, Wd = 2 * N + 21, off = Math.floor(Wd / 2); let s = Array(Wd).fill(0); s[off] = 1; const rows = [s]; for (let n = 0; n < N; n++) { const t = s.map((_, i) => { const l = s[i - 1] ?? s[0], c = s[i], r = s[i + 1] ?? s[Wd - 1]; return (201 >> (l * 4 + c * 2 + r)) & 1; }); rows.push(t); s = t; } return { rows, off, Wd }; })();
SCENES.pixels = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  source(S, 1, 'PIXELS', 'OEIS A267681 · conjecture by M. F. Hasler, 2018 · Rule 201');
  const p0 = at(S, 0, 0.6), sz = 20, gx = 1100 - (CA.off - 17) * 20, gy = 180, shown = Math.min(16, Math.floor(Math.max(0, u - lineAt(S, 0).s - 1.5) * 1.2));
  for (let n = 0; n <= shown; n++) {
    const row = CA.rows[n];
    for (let i = CA.off - 17; i <= CA.off + 17; i++) { const dx = i - CA.off, inw = Math.abs(dx) <= n; const x = gx + i * sz, y = gy + n * (sz + 2); if (row[i]) fillBox(x, y, sz - 2, sz - 2, inw ? C.cyan : 'rgba(63,248,255,0.25)', p0); else box(x, y, sz - 2, sz - 2, inw ? C.gold : C.dim, p0 * (inw ? 0.9 : 0.25), 1); }
    if (n <= 6) { const v = parseInt(row.slice(CA.off - n, CA.off + n + 1).join(''), 2); txt(String(v), 1080, gy + n * (sz + 2) + 15, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.white, a: p0 }); }
  }
  txt('row n, read in binary: 1, 0, 21, 99, 471, 1935, …', 150, 400, { size: 24, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 4) });
  txt('a(n) = 2·4ⁿ − (2·[n odd] + 5)·2ⁿ⁻¹ − 1', 150, 460, { size: 28, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 7) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('proof: for n ≥ 1, cell x is ON ⟺ |x| ≥ 2, or x = 0 and n even', 150, 560, { size: 22, fam: F.mono, w: 700, c: C.green, a: q });
    const cx = gx + CA.off * sz, cy = gy + shown * (sz + 2);
    ring(cx + 8, gy + 60 + 1, 0, C.gold, 0);
    for (let n = 1; n <= shown; n++) ring(cx + 8, gy + n * (sz + 2) + 8, 13, n % 2 ? C.red : C.green, q * 0.8, 2);
    txt('centre blinks with parity', 150, 610, { size: 22, fam: F.mono, c: C.white, a: P(S, 1, 2) });
    txt('+ Barker\'s recurrences and generating functions (bases 2 and 10)', 150, 655, { size: 20, fam: F.mono, c: C.dim, a: P(S, 1, 5) });
  }
  qed(S, 520, 760, 1, 6);
  thm('D5/S3/StatisticalMechanics/CellularAutomata/Rule201Rows · rows recomputed n ≤ 12', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 04 ROPE (semi-meanders) ---- */
function ncm(pts) { if (!pts.length) return [[]]; const a = pts[0], out = []; for (let i = 1; i < pts.length; i += 2) for (const L of ncm(pts.slice(1, i))) for (const R of ncm(pts.slice(i + 1))) out.push([[a, pts[i]], ...L, ...R]); return out; }
const SM = (() => { const n = 5, res = []; for (const M of ncm([...Array(2 * n).keys()])) { const up = {}; M.forEach(([a, b]) => { up[a] = b; up[b] = a; }); const seen = new Set([0]); let x = 0; for (;;) { x = up[x]; seen.add(x); x = 2 * n - 1 - x; if (x === 0) break; seen.add(x); } if (seen.size === 2 * n && M.filter(([a, b]) => a < n && b >= n).length === n - 4) res.push(M); } return res; })();
function meander(M, n, x0, y0, w, a, t) {
  const dx = w / (2 * n - 1);
  line(x0 - 30, y0, x0 + w + 30, y0, C.blue, a, 3);
  dot(x0 - 30, y0, 10, 'c', a);
  for (let i = 0; i < n; i++) { const xa = x0 + i * dx, xb = x0 + (2 * n - 1 - i) * dx; ctx.globalAlpha = a; ctx.strokeStyle = C.mag; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse((xa + xb) / 2, y0, (xb - xa) / 2, (xb - xa) / 2 * 0.55, 0, 0, Math.PI); ctx.stroke(); }
  M.forEach(([p, q]) => { const xa = x0 + p * dx, xb = x0 + q * dx, cross = p < n && q >= n; ctx.globalAlpha = a; ctx.strokeStyle = cross ? C.gold : C.cyan; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse((xa + xb) / 2, y0, (xb - xa) / 2, (xb - xa) / 2 * 0.55, 0, Math.PI, TAU); ctx.stroke(); });
  ctx.globalAlpha = 1;
  for (let i = 0; i < 2 * n; i++) dot(x0 + i * dx, y0, 6, 'w', a);
}
SCENES.rope = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  source(S, 2, 'A ROPE AND A RIVER', 'OEIS A400429 · second-diagonal conjecture');
  const p0 = at(S, 0, 0.6);
  const k = Math.floor(t * 0.4) % SM.length;
  meander(SM[k], 5, 1000, 460, 700, p0, t);
  txt('n = 5 crossings · winding 1 · one of ' + SM.length, 1350, 640, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('gold arches cross the middle', 1350, 680, { size: 20, fam: F.mono, c: C.gold, a: P(S, 0, 5) });
  txt('river (blue) from a spring · one closed rope', 150, 400, { size: 22, fam: F.mono, c: C.white, a: P(S, 0, 2) });
  txt('D₂(n) = (n² + 2n + [n odd] − 20) / 2', 150, 460, { size: 28, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 8) });
  const q = P(S, 1, 0.3);
  if (q > 0) { [2, 8, 14, 22, 30, 40].forEach((v, i) => { cellv(150 + i * 90, 520, 72, v, C.cyan, P(S, 1, 0.5 + i * 0.4), 'rgba(0,0,0,0.5)', 0.42); txt('n=' + (i + 4), 186 + i * 90, 615, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); }); txt('proof: cut at the middle, match the halves', 150, 670, { size: 22, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 5) }); }
  qed(S, 520, 770, 1, 7);
  thm('D5/S3/Combinatorics/SemiMeanderSecondDiagonal · counts recomputed n = 4…9', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 05 TORPEDO ---- */
SCENES.torpedo = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  source(S, 3, 'A QUANTUM GAME', 'Emeriau · Howard · Mansfield 2020 · Torpedo Game conjecture');
  const p0 = at(S, 0, 0.6), d = 6, s = 62, gx = 1150, gy = 200;
  const pal = [C.cyan, C.mag, C.gold, C.green, C.vio, C.orange];
  const cls = (x, z) => { const i = Math.floor(x / 2); if (x % 2 === 0) return 2 * i + (z === 0 || z === 1 ? 0 : 1); return 2 * i + (z === 0 || z === 2 ? 1 : 0); };
  const q = P(S, 1, 2);
  for (let x = 0; x < d; x++) for (let z = 0; z < d; z++) { const c = cls(x, z); box(gx + z * s, gy + x * s, s - 6, s - 6, q > 0 ? pal[c] : C.dim, p0, 2, q > 0 ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.4)'); if (q > 0) fillBox(gx + z * s + 6, gy + x * s + 6, s - 18, s - 18, pal[c], q * 0.45); }
  txt('x (Alice)', gx - 20, gy + 190, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: p0 });
  txt('z (Alice)', gx + 180, gy - 16, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  txt('Alice sees (x, z) → sends one of d colours', 150, 400, { size: 22, fam: F.mono, c: C.white, a: P(S, 0, 1) });
  txt('Bob gets q ∈ {∞, 0 … d−1}: avoid x, or avoid qx − z', 150, 445, { size: 22, fam: F.mono, c: C.white, a: P(S, 0, 4) });
  if (P(S, 1, 0) > 0) {
    [['d = 2', '3/4'], ['d = 3', '11/12'], ['d ≥ 5', '1']].forEach(([a, b], i) => { chip(230 + i * 200, 530, 180, 80, '', i === 2 ? C.green : C.orange, P(S, 1, 0.3 + i * 0.6)); txt(a, 230 + i * 200, 520, { size: 20, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 0.3 + i * 0.6) }); txt(b, 230 + i * 200, 555, { size: 28, fam: F.orb, w: 900, align: 'center', c: i === 2 ? C.green : C.orange, a: P(S, 1, 0.3 + i * 0.6) }); });
    txt('classical value', 430, 600, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 1) });
    txt('pair rows · two colour patterns per pair (d = 6 shown)', 150, 660, { size: 22, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 4) });
  }
  qed(S, 520, 770, 1, 8);
  thm('D5/S3/Quantum/Information/TorpedoGamePerfectClassical · even-d construction rechecked d = 6…40', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 06 INVERSE (orthocross) ---- */
SCENES.inverse = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  source(S, 4, 'AN EXACT INVERSE', 'DeBrota · Fuchs · Stacey 2020 · orthocross MIC conjecture');
  const p0 = at(S, 0, 0.6);
  const Gi = [[4.5, 1.0, -2.5, -2.5], [1.0, 4.5, -2.5, -2.5], [-2.5, -2.5, 8.0, 1.0], [-2.5, -2.5, 1.0, 8.0]];
  const q = P(S, 1, 0.3), gx = 1100, gy = 210, s = 130;
  txt('d² = 4 outcomes · |0⟩, |1⟩, |+⟩, |+i⟩', 150, 400, { size: 22, fam: F.mono, c: C.white, a: P(S, 0, 2) });
  txt('G = overlap matrix of the measurement', 150, 450, { size: 22, fam: F.mono, c: C.white, a: P(S, 0, 4) });
  txt('conjecture: every entry of G⁻¹ ∈ ½ℤ', 150, 500, { size: 26, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 7) });
  txt('G⁻¹ (qubit)', gx + 2 * s, gy - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.vio, a: p0 });
  Gi.forEach((row, i) => row.forEach((v, j) => { const half = v % 1 !== 0; cellv(gx + j * s, gy + i * s, s - 12, (v > 0 ? '' : '') + v, half ? C.gold : C.cyan, Math.max(p0 * 0.3, q) * (q > 0 ? 1 : 0.4), 'rgba(0,0,0,0.5)', 0.26); }));
  if (q > 0) {
    txt('every dimension d, every orthonormal basis', 150, 590, { size: 22, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 2.5) });
    txt('proof: write G⁻¹ exactly; Gaussian integers', 150, 635, { size: 22, fam: F.mono, c: C.white, a: P(S, 1, 4) });
    txt('4 = (1 + i) · i · (1 − i)³', 150, 680, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: P(S, 1, 5) });
  }
  qed(S, 520, 780, 1, 7);
  thm('D5/S3/Quantum/Measurement/OrthocrossGramHalfInteger · recomputed d = 2…5, random bases', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 07 ARROWS ---- */
SCENES.arrows = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  source(S, 5, 'ARROWS', 'Zhou · Yu 2026 · arXiv:2609.29392 · open problem (32; 1→3)');
  const p0 = at(S, 0, 0.6), A = [1, 1, 2, 5, 15, 51, 190, 757, 3171, 13798];
  const gx = 1000, gy = 700;
  A.forEach((v, i) => { const q = P(S, i < 7 ? 1 : 1, 0.3 + i * 0.4), h = Math.log10(v + 1) * 110; fillBox(gx + i * 70, gy - h, 50, h, i < 7 ? C.orange : C.dim, q * 0.8); txt(String(v), gx + i * 70 + 25, gy - h - 12, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(String(i), gx + i * 70 + 25, gy + 26, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: q }); });
  /* a permutation with its cycle arrows */
  const perm = [3, 1, 4, 2], cx = 1150, cy = 310;
  perm.forEach((v, i) => { const x = cx + i * 110; cellv(x, cy, 70, v, C.cyan, p0, 'rgba(0,0,0,0.5)', 0.4); });
  [[0, 2], [2, 3], [3, 1], [1, 0]].forEach(([a, b], k) => { const xa = cx + a * 110 + 35, xb = cx + b * 110 + 35; ctx.globalAlpha = p0 * P(S, 0, 3 + k * 0.5); ctx.strokeStyle = C.mag; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(xa, cy - 4); ctx.quadraticCurveTo((xa + xb) / 2, cy - 70 - Math.abs(b - a) * 12, xb, cy - 4); ctx.stroke(); ctx.globalAlpha = 1; });
  txt('patterns + how the cycles are linked', 1350, cy + 115, { size: 20, fam: F.mono, align: 'center', c: C.mag, a: P(S, 0, 4) });
  txt('the last unresolved short arrow pattern', 150, 400, { size: 22, fam: F.mono, c: C.white, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('1 + (3x − 2)F + (1 − x)(1 − 2x)F² + x³F³ = 0', 150, 500, { size: 26, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 2) });
    txt('unique branch with F = 1 + x + …', 150, 550, { size: 22, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 4) });
    txt('(another branch starts 1 + 2x + 3x² + x³ − 16x⁴ …)', 150, 595, { size: 18, fam: F.mono, c: C.dim, a: P(S, 1, 5) });
  }
  qed(S, 520, 760, 1, 6);
  thm('D5/S3/Combinatorics/ArrowThirtyTwoOneThree · series re-derived from the cubic, n ≤ 11', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 08 SPIRAL (Padovan) ---- */
SCENES.spiral = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  source(S, 6, 'A ROUND TABLE', 'Archer · Borsh · Bridges · Graves · Jeske 2024 · arXiv:2408.15000');
  const p0 = at(S, 0, 0.6);
  /* round table with n = 6 seats */
  const cx = 480, cy = 560, R = 120;
  ring(cx, cy, R * 0.7, C.dim, p0, 2);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU - Math.PI / 2; dot(cx + Math.cos(a) * R, cy + Math.sin(a) * R, 22, 'g', p0); txt(String([1, 4, 6, 2, 5, 3][i]), cx + Math.cos(a) * R, cy + Math.sin(a) * R + 7, { size: 18, fam: F.mono, w: 700, align: 'center', c: '#111', a: p0 }); }
  txt('one single cycle · avoid 4132 and 1324', cx, cy + 180, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  /* Padovan triangle spiral (schematic) */
  const Pd = [1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16], sc = 9, base = 640;
  const shown = Math.min(Pd.length, Math.floor(P(S, 1, 0.3, 6) * Pd.length));
  let x = 960;
  for (let i = 0; i < shown; i++) { const s = Pd[i] * sc + 14, hi = [1, 4, 7, 10].includes(i), h = s * 0.866; ctx.globalAlpha = 1; ctx.strokeStyle = hi ? C.gold : C.green; ctx.lineWidth = hi ? 3.5 : 2; ctx.fillStyle = hi ? 'rgba(255,207,90,0.18)' : 'rgba(77,255,166,0.08)'; ctx.beginPath(); ctx.moveTo(x, base); ctx.lineTo(x + s, base); ctx.lineTo(x + s / 2, base - h); ctx.closePath(); ctx.fill(); ctx.stroke(); txt(String(Pd[i]), x + s / 2, base - h / 3 + 6, { size: 13 + Math.min(Pd[i], 12) * 1.2, fam: F.mono, w: 700, align: 'center', c: hi ? C.gold : C.white, a: 1 }); x += s + 10; }
  txt('each side = sum of the sides two and three steps back', 1360, 690, { size: 20, fam: F.mono, align: 'center', c: C.green, a: P(S, 1, 2) });
  txt('Padovan: 1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16, 21, 28, …', 150, 400, { size: 22, fam: F.mono, c: C.green, a: P(S, 1, 0) });
  const q = P(S, 1, 3);
  if (q > 0) { [1, 2, 5, 12, 28, 65, 151].forEach((v, i) => cellv(1000 + i * 100, 740, 80, v, C.gold, P(S, 1, 3 + i * 0.3), 'rgba(0,0,0,0.5)', 0.38)); txt('counts n = 2 … 8 = every third Padovan number', 1350, 845, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); }
  qed(S, 1400, 330, 1, 7);
  thm('D5/S3/Combinatorics/ArcherCyclicPadovan · counts recomputed n ≤ 8 · triangles drawn to Padovan side lengths', 480, 880, P(S, 0, 2), 'center');
};

/* ---- 09 CUBES ---- */
function cube(x, y, s, col, a) {
  if (a <= 0) return; const h = s * 0.5, w = s * 0.866;
  const top = [[x, y - s], [x + w, y - h - s + s * 0.5 - s * 0.5 + h], [x, y], [x - w, y - h]];
  ctx.globalAlpha = a;
  const f = (pts, fill) => { ctx.fillStyle = fill; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke(); };
  f([[x, y - s], [x + w, y - s + h], [x, y], [x - w, y - s + h]].map(([a1, b1]) => [a1, b1 - h + h]), 'rgba(255,255,255,0.18)');
  f([[x - w, y - s + h], [x, y], [x, y + s], [x - w, y + h]], 'rgba(0,0,0,0.35)');
  f([[x + w, y - s + h], [x, y], [x, y + s], [x + w, y + h]], 'rgba(0,0,0,0.15)');
  ctx.globalAlpha = 1;
}
function iso(ox, oy, s, X, Y, Z) { const w = s * 0.866; return [ox + (X - Y) * w, oy + (X + Y) * s * 0.5 - Z * s]; }
function stack(cells, ox, oy, s, colf, a) { [...cells].sort((p, q) => (p[0] + p[1] + p[2]) - (q[0] + q[1] + q[2]) || p[2] - q[2]).forEach(c => { const [x, y] = iso(ox, oy, s, ...c); cube(x, y, s, colf(c), a); }); }
SCENES.cubes = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  source(S, 7, 'CUBES IN A CORNER', 'OEIS A381265 · comment by W. Meeussen, 2025');
  const p0 = at(S, 0, 0.6);
  const base = [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [0, 2, 0]];
  const top = [[0, 0, 0], [1, 0, 0], [0, 1, 0]].map(c => c.join());
  stack(base, 480, 520, 60, c => top.includes(c.join()) && P(S, 0, 6) > 0 ? C.gold : C.cyan, p0);
  txt('first layer: n cubes · top layer: 3 cubes inside it', 480, 700, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  const shapes = [[[0, 0, 0], [1, 0, 0], [2, 0, 0]], [[0, 0, 0], [0, 1, 0], [0, 2, 0]], [[0, 0, 0], [0, 0, 1], [0, 0, 2]], [[0, 0, 0], [1, 0, 0], [0, 1, 0]], [[0, 0, 0], [1, 0, 0], [0, 0, 1]], [[0, 0, 0], [0, 1, 0], [0, 0, 1]]];
  const q = P(S, 1, 2.5);
  shapes.forEach((sh, i) => { const x = 1000 + (i % 3) * 250, y = 330 + Math.floor(i / 3) * 230; stack(sh, x + 60, y + 60, 36, () => i < 3 ? C.gold : C.mag, q * P(S, 1, 2.5 + i * 0.4)); });
  txt('3 rods', 1250, 280, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); txt('3 corners', 1250, 510, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q });
  if (P(S, 1, 0) > 0) { [6, 21, 57, 138, 294, 606].forEach((v, i) => cellv(1000 + i * 110, 720, 90, v, C.cyan, P(S, 1, 0.3 + i * 0.3), 'rgba(0,0,0,0.5)', 0.36)); txt('3·(2·A000219 − A000990 − 2·A000041 + 1)', 1320, 850, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1) }); }
  qed(S, 480, 790, 1, 7);
  thm('D5/S3/Combinatorics/TwoLayerSolidPartitions · counts recomputed n = 3…8', 480, 880, P(S, 0, 2), 'center');
};

/* ---- 10 LEDGER (Nishioka–Sato) ---- */
SCENES.ledger = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  source(S, 8, 'A PHYSICIST\'S IDENTITY', 'Nishioka · Sato 2021 · JHEP 05 (2021) 074 · eq. (C.12)');
  const p0 = at(S, 0, 0.6);
  const terms = [['− H₂ₖ₊₁ / (2²ᵏ⁺²(k+1))', C.cyan], ['− Σ (2²ᵐ − 2) B₂ₘ / …', C.mag], ['+ Σ C(2k+1, j) Hⱼ ζ(−j) / …', C.gold], ['+ (1 − 2⁻²ᵏ⁻¹) H₂ₖ₊₁ B₂ₖ₊₂ /(k+1)', C.vio]];
  terms.forEach(([s, col], i) => { const q = P(S, 0, 1 + i * 1.2); box(1000, 220 + i * 90, 760, 70, col, q, 2, 'rgba(0,0,0,0.5)'); txt(s, 1380, 265 + i * 90, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
  txt('= 0', 1380, 620, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 6), ab: 1 });
  txt('harmonic numbers · Bernoulli numbers · ζ(−j)', 150, 400, { size: 22, fam: F.mono, c: C.white, a: P(S, 0, 3) });
  txt('"We confirmed (C.12) up to k = 100 numerically.', 150, 460, { size: 20, fam: F.mono, c: C.dim, a: P(S, 0, 9) });
  txt(' However, we do not know a proof of (C.12)."', 150, 490, { size: 20, fam: F.mono, c: C.dim, a: P(S, 0, 9) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('key: Bₘ(½) = (2¹⁻ᵐ − 1)·Bₘ', 150, 570, { size: 26, fam: F.mono, w: 700, c: C.gold, a: q });
    txt('then every term cancels against another', 150, 620, { size: 22, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 2) });
    for (let i = 0; i < 4; i++) { const c = P(S, 1, 3 + i * 0.5); if (c > 0) { line(1000, 255 + i * 90, 1760, 255 + i * 90, C.green, c, 3); } }
  }
  qed(S, 520, 760, 1, 6);
  thm('D5/S3/Quantum/FockSpace/HyperbolicScalarZetaIdentity · exact check k ≤ 24 recomputed', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    CASES.forEach(([name, what, col], i) => { const x = 330 + (i % 4) * 420, y = 300 + Math.floor(i / 4) * 200, q = P(S, 0, 0.5 + i * 0.9) * fade; box(x - 180, y - 70, 360, 140, col, q, 2, 'rgba(0,0,0,0.5)'); txt(name, x, y - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(what, x, y + 30, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: q, ab: 1 }); if (q > 0.5) txt('✓ ∀ n · frozen', x + 100, y + 55, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.green, a: q }); });
    txt('examples tell us where to look · proofs tell us why', W / 2, 660, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.5) * fade });
    txt('a proof is a tool the next result can stand on', W / 2, 730, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 4) * fade, ab: 1 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    for (let i = 0; i < 40; i++) { const x = W / 2 + Math.cos(i * 2.4 + t * 0.2) * (120 + i * 9), y = 300 + Math.sin(i * 2.4 + t * 0.2) * (60 + i * 4); dot(x, y, 6, 'n', ep * out * 0.6); }
    txt('FROM GUESS TO THEOREM', W / 2, 640, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('猜想被证明 · TRURETURING FILM 026', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One case refutes. Only a reason proves.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'EIGHT GUESSES', method: 'METHOD', pixels: 'CASE 1 · PIXELS', rope: 'CASE 2 · ROPE', torpedo: 'CASE 3 · GAME', inverse: 'CASE 4 · INVERSE', arrows: 'CASE 5 · ARROWS', spiral: 'CASE 6 · TABLE', cubes: 'CASE 7 · CUBES', ledger: 'CASE 8 · LEDGER', finale: 'LEDGER' });

function poster26() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  CASES.forEach(([name, what, col], i) => { const x = 300 + (i % 4) * 440, y = 330 + Math.floor(i / 4) * 210; box(x - 180, y - 70, 360, 140, col, 1, 2, 'rgba(0,0,0,0.5)'); txt(name, x, y - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: col }); txt(what, x, y + 30, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 1 }); stamp('✓', x + 140, y - 50, 1, C.green, 36, -0.1); });
  txt('八个猜想，八个证明', W / 2, 160, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FROM GUESS TO THEOREM', W / 2, 850, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('猜 想 被 证 明 · 每 一 个 都 由 Lean 内 核 核 验', W / 2, 930, { size: 36, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 026', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster26;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
