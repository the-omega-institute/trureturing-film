/* Film 021 — JOINT RELATIONS · FINITE CLOCKS. */

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


/* ---- film 021 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    theory: ['THEORY VOLUME · PAPER PROOF', C.orange, 'rgba(40,20,0,0.75)'],
    known: ['THEORY VOLUME · PAPER PROOF · CITES PRIOR RESULT', C.orange, 'rgba(40,20,0,0.75)'],
    physics: ['KNOWN PHYSICS · STANDARD QUANTUM MECHANICS', C.blue, 'rgba(0,15,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function bar(x, y, w, h, col, a) { fillBox(x, y - h, w, h, col, a); }
function dial(x, y, r, an, col, a) { if (a <= 0) return; ring(x, y, r, col, a, 2); for (let k = 0; k < 12; k++) { const b = k / 12 * TAU; line(x + Math.cos(b) * r * 0.85, y + Math.sin(b) * r * 0.85, x + Math.cos(b) * r, y + Math.sin(b) * r, col, a * 0.6, 2); } arrow(x, y, x + Math.cos(an) * r * 0.8, y + Math.sin(an) * r * 0.8, col, a, 3); }
function plot(x0, y0, w, h, f, xmax, ymax, col, a, n = 300) { if (a <= 0) return; ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= n; i++) { const X = i / n * xmax, Y = f(X); const px = x0 + i / n * w, py = y0 - clamp(Y / ymax) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.globalAlpha = 1; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  qubit(560, 430, 170, 1.1 + 0.3 * Math.sin(t * 0.7), t * 1.7, sp, C.cyan, t);
  const stop = P(S, 0, 3);
  dial(1300, 400, 150, stop > 0.5 ? 1.9 : t * 3, C.gold, sp);
  txt(stop > 0.5 ? 't = ' + scramble('??????', 0.2 + 0.1 * Math.sin(t * 7), Math.floor(t * 9)) : 'running…', 1300, 620, { size: 34, fam: F.mono, w: 700, align: 'center', c: stop > 0.5 ? C.red : C.gold, a: sp });
  txt('forget when', 1300, 670, { size: 26, fam: F.mono, align: 'center', c: C.white, a: P(S, 0, 4) });
  ['shared / independent', 'forgotten / retained'].forEach((s, i) => chip(560 + i * 740, 780, 520, 64, s, [C.cyan, C.mag][i], P(S, 1, 2 + i * 2), 26));
  txt('clock = a record the observer keeps', W / 2, 860, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6), ab: 2 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cx = W / 2, cy = 330;
  [0, 1, 2].forEach(k => dial(cx + (k - 1) * 200, cy, 70, t * (1 + k * 0.618), [C.cyan, C.mag, C.gold][k], rp));
  txt(scramble('JOINT RELATIONS · FINITE CLOCKS', rp, 211), W / 2, 620, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('联 合 来 源 · 量 子 关 系 · 有 限 时 钟', W / 2, 700, { size: 44, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 021 · RECURSIVE_RELATIONAL_OBSERVATION_JOINT_RELATIONS_CLOCKS', W / 2, 170, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  [['shared copy ≠ independent source', C.cyan], ['forgetting ≠ obtaining', C.mag], ['formal inverse ≠ permitted reversal', C.gold]].forEach(([s, col], i) => txt(s, W / 2, 770 + i * 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: P(S, 1, 0.5 + i * 1.8) }));
};

/* ---- 02 BELL ---- */
SCENES.bell = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'physics');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [['|Φ+⟩', C.cyan, 1], ['|Φ−⟩', C.mag, -1]].forEach(([n, col, s], i) => {
    const y = 280 + i * 260;
    txt(n, 300, y + 12, { size: 48, fam: F.mono, w: 700, align: 'center', c: col, a: p0 });
    [0, 1].forEach(k => { const x = 620 + k * 360; dot(x, y, 50, 'w', p0 * 0.25); ring(x, y, 50, col, p0, 3); txt('I/2', x, y + 10, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 }); });
    ctx.globalAlpha = p0 * (0.5 + 0.5 * Math.sin(t * 3 + i)); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(670, y); ctx.quadraticCurveTo(800, y - 70 * (i ? -1 : 1), 930, y); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    txt('X ⊗ X = ' + (s > 0 ? '+1' : '−1'), 1450, y + 16, { size: 50, fam: F.orb, w: 900, align: 'center', c: col, a: P(S, 1, 1 + i * 1.5), ab: 2 });
  });
  txt('each side alone: identical', 800, 700, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  txt('the difference lives only in the relation', W / 2, 800, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 5), ab: 2 });
};

/* ---- 03 HIDDEN ---- */
SCENES.hidden = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const c = 0.25 + 0.25 * Math.sin(t * 0.8);
  const lab = ['00', '01', '10', '11'], x0 = 330, y0 = 230, s = 100;
  lab.forEach((l, i) => { txt(l, x0 - 40, y0 + i * s + 58, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: p0 }); txt(l, x0 + i * s + 48, y0 - 15, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: p0 }); });
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const diag = i === j, v = diag ? [0, 0.5, 0.5, 0][i] : ((i === 1 && j === 2) || (i === 2 && j === 1)) ? c : 0;
    const hid = !diag && v !== 0;
    fillBox(x0 + j * s, y0 + i * s, s - 6, s - 6, hid ? C.mag : C.cyan, p0 * (0.08 + v * 1.2));
    box(x0 + j * s, y0 + i * s, s - 6, s - 6, hid ? C.mag : C.dim, p0, 1.5);
    if (diag || hid) txt(hid ? 'c' : String(v === 0.5 ? '½' : v), x0 + j * s + 47, y0 + i * s + 60, { size: 28, fam: F.mono, w: 700, align: 'center', c: hid ? C.mag : C.white, a: p0 });
  }
  ['energy: 0 with certainty', 'each side: I/2', 'basis stats: (0, ½, ½, 0)'].forEach((s2, i) => txt('= ' + s2, 1150, 270 + i * 55, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: P(S, 0, 2 + i * 1.2) }));
  txt('c = ' + c.toFixed(2), 1150, 470, { size: 34, fam: F.mono, w: 700, c: C.mag, a: P(S, 0, 6) });
  if (p1 > 0) {
    txt('entangled  ⟺  c ≠ 0', 1150, 530, { size: 30, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 0.5) });
    txt('energy-conserving gate →', 1150, 600, { size: 24, fam: F.mono, c: C.white, a: P(S, 1, 3) });
    txt('⟨Z₁⟩ = 2 Re c', 1150, 660, { size: 40, fam: F.orb, w: 900, c: C.gold, a: P(S, 1, 4), ab: 2 });
    fillBox(1150, 700, 400 * 2 * c * P(S, 1, 4), 26, C.mag, 0.7);
    box(1150, 700, 400, 26, C.mag, P(S, 1, 4), 1.5);
    txt('no summary update rule can predict it', W / 2, 810, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 7) });
  }
  thm('§1.2 · Counterexamples 1.2/1.3 · Prop 1.4', W / 2, 850, P(S, 1, 7), 'center');
};

/* ---- 04 REPAIR ---- */
SCENES.repair = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'known');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const cx = 480, cy = 470, R = 250;
  ring(cx, cy, R, C.cyan, p0, 2.5);
  txt('|0⟩', cx, cy - R - 20, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('|1⟩', cx, cy + R + 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  const pole = p1 > 0 ? P(S, 1, 0.5, 1.5) : 0;
  const zt = lerp(0.2, 1, pole), yt = cy - zt * R, hw = Math.sqrt(Math.max(0, 1 - zt * zt)) * R;
  line(cx - R - 60, yt, cx + R + 60, yt, C.gold, p0, 2);
  line(cx - hw, yt, cx + hw, yt, C.gold, p0, 6);
  txt('target plane p₀', cx + R + 70, yt + 8, { size: 20, fam: F.mono, c: C.gold, a: p0 });
  const ang = t * 0.5, sx = cx + Math.cos(ang) * R * 0.5, sy = yt - 70 + 30 * Math.sin(t);
  dot(sx, sy, 12, 'm', p0 * (1 - pole)); arrow(sx, sy, sx, yt, C.mag, p0 * (1 - pole) * 0.8, 2);
  txt('interior: linear', 1300, 270, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 0, 2) });
  txt('C(p₀) = 1 / (2√(p₀(1−p₀)))', 1300, 330, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) });
  txt('C(½) = 1   C(¼) = 1.155   C(0.1) = 1.667', 1300, 380, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 6) });
  if (p1 > 0) {
    txt('pole: square root', 1300, 470, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.mag, a: P(S, 1, 1) });
    txt('mismatch 10⁻⁴  →  move 10⁻²', 1300, 530, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2.5) });
    txt('nearest-point map: Choi eigenvalue −½', 1300, 640, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 6) });
    txt('not a legal quantum channel', 1300, 690, { size: 26, fam: F.mono, align: 'center', c: C.red, a: P(S, 1, 7) });
  }
  thm('§1.3 · Props 1.10–1.12, 1.14 · error-bound background: Sturm 2000; Sremac–Woerdeman–Wolkowicz', W / 2, 850, P(S, 1, 7), 'center');
};

/* ---- 05 COPIES ---- */
SCENES.copies = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const fa = p0 * (1 - p1);
  if (fa > 0) {
    [['|+⟩⟨+|', C.cyan, 0.5, '1/2'], ['I/2', C.mag, 0.25, '1/4']].forEach(([n, col, v, l], i) => {
      const x = 560 + i * 800;
      txt(n, x, 260, { size: 40, fam: F.mono, w: 700, align: 'center', c: col, a: fa });
      txt('one copy: same energy statistics', x, 310, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: fa });
      [0, 1].forEach(k => { dot(x - 70 + k * 140, 400, 30, i ? 'm' : 'c', fa * 0.8); });
      line(x - 70, 400, x + 70, 400, C.gold, fa * P(S, 0, 3), 3);
      txt('shared phase', x, 450, { size: 20, fam: F.mono, align: 'center', c: C.gold, a: fa * P(S, 0, 3) });
      bar(x - 60, 720, 120, 400 * v * P(S, 0, 5), col, 0.7 * fa);
      txt(l, x, 720 - 400 * v - 15, { size: 32, fam: F.mono, w: 700, align: 'center', c: col, a: fa * P(S, 0, 5) });
    });
  }
  if (p1 > 0) {
    [0, 1, 3].forEach((e, i) => { line(300, 650 - e * 110, 520, 650 - e * 110, C.cyan, p1, 4); txt(['0', '1', 'm'][i], 280, 658 - e * 110, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.white, a: p1 }); });
    txt('energies', 410, 720, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p1 });
    txt('agree on every relation with < m copies', 1150, 280, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1) });
    txt('hardest pairs need exactly  2m − 1', 1150, 360, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
    [[2, 3], [3, 5], [5, 9], [10, 19]].forEach(([m, n], i) => { const q = P(S, 1, 5 + i * 0.4); txt('m = ' + m, 950, 460 + i * 60, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: q }); txt(n + ' copies', 1180, 460 + i * 60, { size: 28, fam: F.mono, w: 700, c: C.gold, a: q }); for (let k = 0; k < n; k++) dot(1370 + k * 18, 450 + i * 60, 6, 'g', q); });
  }
  thm('§2.1 Counterexample 2.6 · §2.2 Props 2.15–2.16 · §2.3 Props 2.28–2.29 (zero-sum length: Sahs–Sissokho–Torf)', W / 2, 850, P(S, 1, 7), 'center');
};

/* ---- 06 KERNEL ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const x0 = 320, y0 = 620, w = 1200, h = 360;
  line(x0, y0, x0 + w, y0, C.dim, p0, 2); line(x0, y0, x0, y0 - h - 20, C.dim, p0, 2);
  txt('error', x0 - 20, y0 - h - 30, { size: 22, fam: F.mono, align: 'right', c: C.dim, a: p0 });
  txt('g·T', x0 + w + 30, y0 + 8, { size: 22, fam: F.mono, c: C.dim, a: p0 });
  const f = x => 0.5 * Math.abs(x === 0 ? 1 : Math.sin(x / 2) / (x / 2));
  plot(x0, y0, w * P(S, 0, 1, 3), h, f, 30 * P(S, 0, 1, 3) || 0.01, 0.5, C.cyan, p0);
  txt('½', x0 - 20, y0 - h + 8, { size: 22, fam: F.mono, align: 'right', c: C.white, a: p0 });
  txt('coherence × resonance kernel ν̂(gap)', W / 2, 200, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('equal energies survive · different energies fade', W / 2, 250, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: P(S, 0, 4) });
  if (p1 > 0) {
    [2, 4, 6, 8].forEach((k, i) => { const x = x0 + (k * Math.PI) / 30 * w, q = P(S, 1, 2 + i * 0.4); dot(x, y0, 12, 'g', q); txt(k + 'π', x, y0 + 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); });
    txt('error = ½ |sinc(gT/2)| : zero at gT = 2π, then back', W / 2, 720, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
    txt('waiting longer is not always better', W / 2, 780, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.mag, a: P(S, 1, 6), ab: 2 });
  }
  thm('§3.1 (TM.259) · Prop 3.8 · worst-case bound π/(Tg) via Hilbert\'s inequality (Montgomery–Vaughan)', W / 2, 850, P(S, 1, 7), 'center');
};

/* ---- 07 ALIAS ---- */
SCENES.alias = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const times = [0, 2, 3];
  const phase = 2 * Math.PI * (P(S, 0, 2, 4));
  times.forEach((k, i) => { const x = 460 + i * 500, an = -Math.PI / 2 + k * phase; txt('t = ' + (k ? k + 'τ' : '0'), x, 250, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 }); dial(x, 420, 120, an, [C.cyan, C.mag, C.gold][i], p0); });
  txt('gap = 2π / τ', W / 2, 620, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 3), ab: 2 });
  if (p1 > 0) {
    txt('every clock time is a whole turn', W / 2, 690, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.5) });
    txt('kernel χ = 1 exactly · coherence never erased', W / 2, 750, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 2), ab: 1 });
    txt('integer times alias', W / 2, 810, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 5), ab: 2 });
  }
  thm('§3.2 · Prop 3.16 (TM.425) · surviving gaps = alias lattice 2π/(gcd·τ)ℤ', W / 2, 860, P(S, 1, 6), 'center');
};

/* ---- 08 GOLDEN ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const phi = (1 + Math.sqrt(5)) / 2;
  const Fs = [5, 21, 233], errs = [[0.349, 0.0137], [0.490, 0.410], [0.4999, 0.4992]];
  const k = Math.min(2, Math.floor(P(S, 0, 3, 6) * 3));
  const FN = Fs[k];
  [0, 1, phi].forEach((m, i) => { const x = 400 + i * 330, an = -Math.PI / 2 + 2 * Math.PI * FN * m; txt(['0', 'τ', 'φτ'][i], x, 240, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 }); dial(x, 380, 100, an, [C.cyan, C.mag, C.gold][i], p0); });
  txt('gap = 2π·F_N / τ   (F_N = ' + FN + ')', 730, 540, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) });
  txt('φ·F_N − F_{N+1} = ±φ^(−N)', 730, 600, { size: 26, fam: F.mono, align: 'center', c: C.white, a: P(S, 0, 6) });
  const rows = [['F_N', 'after 10', 'after 100'], ...Fs.map((f, i) => [String(f), String(errs[i][0]), String(errs[i][1])])];
  rows.forEach((r, i) => r.forEach((c, j) => txt(c, 1300 + j * 190, 260 + i * 60, { size: 26, fam: F.mono, w: 700, align: 'center', c: i === 0 ? C.dim : i === 3 ? C.red : C.white, a: P(S, 0, 4 + i * 0.8) })));
  txt('error stays near ½', 1490, 520, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 8) });
  if (p1 > 0) {
    const x0 = 1150, y0 = 780, w = 600, h = 180;
    line(x0, y0, x0 + w, y0, C.dim, p1, 2);
    plot(x0, y0, w, h, x => 0.4992 + 0 * x, 100, 0.5, C.red, p1 * P(S, 1, 1));
    plot(x0, y0, w, h, x => 0.5 * Math.pow(1 + 0.8727 * 0.8727, -x / 2), 100 * P(S, 1, 3, 2) || 0.01, 0.5, C.green, p1 * P(S, 1, 3));
    txt('golden clock', x0 + w + 10, y0 - h + 10, { size: 20, fam: F.mono, w: 700, c: C.red, a: P(S, 1, 1) });
    txt('exponential, same mean', x0 + 80, y0 - 30, { size: 20, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 3) });
    txt('same mean wait · different resolution', 730, 740, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6), ab: 2 });
  }
  thm('§3.2 · Prop 3.21 (TM.439–441) · Counterexample 3.24 · recomputed: |χ| = 0.99998 at F_N = 233', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 09 SHARED ---- */
SCENES.shared = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const tick = Math.floor(t * 1.5);
  const a1 = rnd(tick, 1) < 0.5 ? 1 : 0, b1 = rnd(tick, 2) < 0.5 ? 1 : 0;
  [['shared source', [a1, a1], C.cyan, '1'], ['independent coins', [a1, b1], C.mag, '½']].forEach(([n, v, col, pr], i) => {
    const x = 480 + i * 960;
    txt(n, x, 230, { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a: p0 });
    v.forEach((b, k) => cellv(x - 130 + k * 160, 280, 100, b ? 'H' : 'T', col, p0));
    txt('each: ½ / ½', x, 430, { size: 22, fam: F.mono, align: 'center', c: C.white, a: p0 });
    txt('P(T₁ = T₂) = ' + pr, x, 490, { size: 34, fam: F.mono, w: 700, align: 'center', c: col, a: P(S, 0, 4 + i * 1.5), ab: 1 });
  });
  if (p1 > 0) {
    const x0 = 360, y0 = 760;
    txt('exchange coherence |01⟩⟨10|', W / 2, 580, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    const k = Math.floor(P(S, 1, 1, 6) * 10);
    for (let i = 0; i <= 10; i++) {
      const q = i <= k ? 1 : 0.15;
      bar(x0 + i * 42, y0, 30, 120, C.cyan, 0.7 * p1 * q);
      bar(1080 + i * 42, y0, 30, 120 * Math.pow(0.624, i), C.mag, 0.7 * p1 * q);
    }
    txt('shared clock: kept forever', 590, y0 + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    txt('independent: × 0.624 per step', 1310, y0 + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p1 });
  }
  thm('§4.2 (TM.452) · Prop 3.23 · factor 0.624 recomputed for the golden clock at E = 1', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 10 ARCHIVE ---- */
SCENES.archive = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const n = 5, cx = 520, cy = 440;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const x = cx - 200 + i * 100, y = cy - 200 + j * 100, q = P(S, 0, 1 + (i + j) * 0.2) * p0;
    const bad = i === 3 && j === 1 && P(S, 0, 6) > 0.5;
    dot(x, y, 12, bad ? 'r' : (i === j ? 'g' : 'c'), q);
    if (i < n - 1) line(x, y, x + 100, y, C.dim, q * 0.4, 1.5);
    if (j < n - 1) line(x, y, x, y + 100, C.dim, q * 0.4, 1.5);
  }
  txt('pairs of runs with the same visible record', cx, 180, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('clock readable  ⟺  every reachable pair: equal cost', 1300, 300, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 4) });
  if (p1 > 0) {
    txt('failure witness within n² steps', 1300, 380, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 0.5), ab: 1 });
    const lx = 1300, ly = 580, r = 110;
    ring(lx, ly, r, C.gold, P(S, 1, 3), 3);
    const an = Math.max(0, u - lineAt(S, 1).s - 3) * 1.5 - Math.PI / 2; dot(lx + Math.cos(an) * r, ly + Math.sin(an) * r, 14, 'g', P(S, 1, 3));
    txt('same state, new lap', lx, ly - r - 20, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 3) });
    txt('lap ' + (1 + Math.floor((an + Math.PI / 2) / TAU)), lx, ly + r + 50, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) });
    txt('remember the laps', lx, ly + r + 95, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 6) });
  }
  thm('§12 · §13 synchronized state pairs · Moore 1956 (sequential-machine experiments)', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 11 GLUE ---- */
SCENES.glue = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const good = p1 > 0 && P(S, 1, 1) > 0.5;
  txt(good ? 'cut: (u+v) | v' : 'cut: u | v', W / 2, 200, { size: 34, fam: F.orb, w: 900, align: 'center', c: good ? C.green : C.mag, a: p0, ab: 1 });
  let k = 0;
  for (let u0 = 0; u0 < 2; u0++) for (let v0 = 0; v0 < 2; v0++) for (let c = 0; c < 4; c++) {
    const real = ((u0 + v0) % 2) === (c % 2);
    const show = good ? real : true;
    const x = 330 + (k % 8) * 160, y = 280 + Math.floor(k / 8) * 150;
    const q = P(S, 0, 1 + k * 0.15) * (show ? 1 : 0.1);
    box(x, y, 130, 110, real ? C.cyan : C.red, q, 2, real ? 'rgba(0,30,40,0.5)' : 'rgba(50,0,10,0.5)');
    txt('(' + u0 + ',' + v0 + ',' + c + ')', x + 65, y + 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt(real ? 'real' : 'ghost', x + 65, y + 88, { size: 18, fam: F.mono, w: 700, align: 'center', c: real ? C.cyan : C.red, a: q * P(S, 0, 5) });
    k++;
  }
  txt('real source: 8 states · mod-4 clock', W / 2, 640, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt(good ? 'glue = 8 exactly · 2 + 3 = 5 bits' : 'glue = 16 · 8 ghosts · 3 + 3 = 6 bits', W / 2, 710, { size: 34, fam: F.orb, w: 900, align: 'center', c: good ? C.green : C.red, a: P(S, 0, 6), ab: 2 });
  txt('where you cut space sets the price of memory', W / 2, 790, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 6) });
  thm('§14.5 · Prop 14.15 · schematic labels (u, v, clock parity)', W / 2, 850, P(S, 1, 7), 'center');
};

/* ---- 12 PARITY ---- */
SCENES.parity = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const pts = [[520, 230], [320, 560], [720, 560]];
  pts.forEach(([x, y], i) => { dot(x, y, 40, ['c', 'm', 'g'][i], p0 * 0.8); txt('ABC'[i], x, y + 12, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0 }); });
  [[0, 1], [1, 2], [0, 2]].forEach(([a, b], i) => { const q = P(S, 0, 1.5 + i * 0.8); line(pts[a][0], pts[a][1], pts[b][0], pts[b][1], C.green, q, 3); txt('✓', (pts[a][0] + pts[b][0]) / 2 + (i === 1 ? 0 : (i ? 30 : -30)), (pts[a][1] + pts[b][1]) / 2 + (i === 1 ? 40 : 0), { size: 34, fam: F.mono, w: 700, align: 'center', c: C.green, a: q }); });
  txt('✗', 520, 470, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 0, 4.5), ab: 2 });
  txt('look consistent: 256', 1300, 280, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 4) });
  txt('actually real: 128', 1300, 340, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5) });
  txt('a parity spread over all three', 1300, 410, { size: 26, fam: F.mono, align: 'center', c: C.gold, a: P(S, 0, 7) });
  if (p1 > 0) {
    txt('change the task afterwards:', 1300, 520, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.5) });
    [[3, 3], [4, 5], [5, 7], [10, 17]].forEach(([r, b], i) => { const q = P(S, 1, 1.5 + i * 0.4); txt('r = ' + r, 1130, 590 + i * 50, { size: 26, fam: F.mono, w: 700, c: C.white, a: q }); txt(b + ' bits', 1280, 590 + i * 50, { size: 26, fam: F.mono, w: 700, c: C.gold, a: q }); txt('helper: 1', 1430, 590 + i * 50, { size: 26, fam: F.mono, w: 700, c: C.green, a: q }); });
    txt('2r − 3', 1300, 820, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
  }
  thm('§18 Prop 18.30 · §19 Cor 19.4', 520, 850, P(S, 1, 7), 'center');
};

/* ---- 13 WINDOW ---- */
SCENES.window = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [['0001', 460, C.cyan], ['0011', 1000, C.mag]].forEach(([s, x, col], i) => {
    const step = Math.floor(t * 2) % 4;
    for (let k = 0; k < 4; k++) { const an = k / 4 * TAU - Math.PI / 2, px = x + Math.cos(an) * 110, py = 380 + Math.sin(an) * 110; cellv(px - 35, py - 35, 70, s[k], k === step ? C.gold : col, p0); }
    txt('prints ' + s, x, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: p0 });
  });
  const wins = ['000', '001', '010', '100', '011', '110'];
  wins.forEach((w, i) => chip(1440 + (i % 2) * 150, 260 + Math.floor(i / 2) * 80, 120, 56, w, C.gold, P(S, 0, 3 + i * 0.4), 26));
  txt('6 windows of length 3', 1515, 530, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) });
  if (p1 > 0) {
    [['free', 6, C.cyan], ['reversible', 7, C.mag], ['commuting', 8, C.gold]].forEach(([n, v, col], i) => {
      const q = P(S, 1, 0.5 + i * 1.3), x = 520 + i * 440;
      bar(x - 60, 820, 120, v * 22 * q, col, 0.7);
      txt(String(v), x, 820 - v * 22 * q - 15, { size: 40, fam: F.orb, w: 900, align: 'center', c: col, a: q });
      txt(n, x, 860, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    });
  }
  thm('§27 · Prop 27.7 · reversible optimum: the 7-cycle 0001101', W / 2, 598, P(S, 1, 5), 'center');
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const rec = [['relations hide what sides cannot see', C.cyan], ['shared clocks keep what independent clocks erase', C.mag], ['golden times: same wait, no resolution', C.gold], ['cuts decide the price of memory: 5, not 6', C.green], ['6 / 7 / 8: contracts set the price', C.vio]];
    rec.forEach(([r, col], i) => txt('▸ ' + r, 440, 260 + i * 70, { size: 30, fam: F.mono, w: 700, c: col, a: P(S, 0, 0.5 + i * 1.1) * fade }));
    txt('A clock is the record you may still use.', W / 2, 720, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), cx = W / 2, cy = 350;
    [0, 1, 2].forEach(k => dial(cx + (k - 1) * 200, cy, 70, t * (1 + k * 0.618), [C.cyan, C.mag, C.gold][k], ep * out));
    txt('JOINT RELATIONS · FINITE CLOCKS', W / 2, 640, { size: 66, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('联 合 来 源 · 量 子 关 系 · 有 限 时 钟 · TRURETURING FILM 021', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Forgetting a time is not obtaining it.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'FORGET WHEN', bell: 'RELATION', hidden: 'HIDDEN COHERENCE', repair: 'REPAIR', copies: 'COPIES', kernel: 'KERNEL', alias: 'ALIAS', golden: 'GOLDEN CLOCK', shared: 'SHARED CLOCK', archive: 'ARCHIVE', glue: 'GLUE', parity: 'HIGHER PARITY', window: 'WINDOWS', finale: 'RECORD' });

function poster21() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const phi = (1 + Math.sqrt(5)) / 2;
  [0, 1, phi].forEach((m, i) => dial(W / 2 + (i - 1) * 330, 470, 130, -Math.PI / 2 + 2 * Math.PI * 233 * m, [C.cyan, C.mag, C.gold][i], 1));
  txt('忘记时刻，不等于取得时刻', W / 2, 190, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('JOINT RELATIONS · FINITE CLOCKS', W / 2, 850, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('联 合 来 源 · 量 子 关 系 · 有 限 时 钟', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 021', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster21;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
