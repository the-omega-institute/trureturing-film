/* Film 029 — THE FUNDAMENTAL BIJECTION · 基本双射的循环. */

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

/* ---- film 029 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    proof: ['LEAN KERNEL · FROZEN · 53 MODULES · COUNTS RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    lit: ['ARCHER–LAUDONE 2024 · arXiv:2407.06338 · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    open: ['STATED IN LEAN · NOT PROVED · OPEN', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
const NC = [null, C.cyan, C.mag, C.gold, C.green, C.vio, C.orange, C.blue, C.white, C.red];
/* a word as a row of coloured cells; prog reveals left to right */
function word(w, x, y, s, a, o = {}) {
  if (a <= 0) return;
  const prog = o.prog === undefined ? 1 : o.prog;
  w.forEach((v, i) => { const q = clamp(prog * w.length - i); cellv(x + i * (s + 8), y, s, v, o.col ? o.col(v, i) : NC[v], a * q, 'rgba(0,0,0,0.55)', 0.5); });
}
function wordW(n, s) { return n * (s + 8) - 8; }
/* the functional graph of a permutation on a circle */
function cycleGraph(p, cx, cy, R, a, o = {}) {
  if (a <= 0) return;
  const n = p.length, pos = k => { const ang = -Math.PI / 2 + (k - 1) * TAU / n; return [cx + R * Math.cos(ang), cy + R * Math.sin(ang)]; };
  const hl = o.hl === undefined ? 99 : o.hl;
  /* arrows m -> p(m), following the cycle order from o.start */
  let order = [];
  if (o.start) { let m = o.start; do { order.push(m); m = p[m - 1]; } while (m !== o.start && order.length <= n); } else order = p.map((_, i) => i + 1);
  order.forEach((m, i) => { const [x1, y1] = pos(m), [x2, y2] = pos(p[m - 1]); if (m === p[m - 1]) { ring(x1, y1 - 48, 18, C.dim, a * 0.6, 2); return; } const q = clamp(hl - i); const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); arrow(x1 + dx / L * 40, y1 + dy / L * 40, x2 - dx / L * 40, y2 - dy / L * 40, q > 0 ? C.gold : C.dim, a * (0.35 + 0.65 * q), q > 0 ? 3.5 : 2); });
  for (let k = 1; k <= n; k++) { const [x, y] = pos(k); dot(x, y, 30, ['c', 'm', 'g', 'n', 'v', 'o', 'w', 'r', 'c'][k - 1], a); txt(String(k), x, y + 9, { size: 26, fam: F.mono, w: 700, align: 'center', c: '#111', a }); }
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  const p = [3, 1, 5, 2, 4];
  txt('one-line · seats', 470, 300, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sp });
  p.forEach((v, i) => { txt('seat ' + (i + 1), 230 + i * 120, 360, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: sp }); });
  word(p, 180, 380, 100, sp, { prog: clamp((u - 0.5) / 2) });
  const q0 = P(S, 0, 6);
  txt('cycles · arrows', 1390, 230, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q0 });
  cycleGraph(p, 1390, 480, 190, q0, { start: 1, hl: P(S, 0, 7, 6) * 5 });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('(5 4 2 1 3)', 470, 640, { size: 46, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q * (1 - P(S, 1, 9)) });
    arrow(470, 670, 470, 720, C.white, P(S, 1, 6), 3);
    word([5, 4, 2, 1, 3], 180, 740, 100, P(S, 1, 9, 1));
    txt('θ', 860, 800, { size: 60, fam: F.orb, w: 900, c: C.gold, a: P(S, 1, 9), ab: 2 });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const ring5 = [3, 1, 5, 2, 4, 5, 4, 2, 1, 3, 5, 3, 2, 4, 1];
  ring5.forEach((v, i) => { const ang = i / ring5.length * TAU + t * 0.25, x = W / 2 + 330 * Math.cos(ang), y = 420 + 150 * Math.sin(ang); dot(x, y, 22, ['c', 'm', 'g', 'n', 'v'][v - 1], rp * 0.9); txt(String(v), x, y + 8, { size: 20, fam: F.mono, w: 700, align: 'center', c: '#111', a: rp }); });
  txt(scramble('THE FUNDAMENTAL BIJECTION', rp, 291), W / 2, 680, { size: 78, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('基 本 双 射 的 循 环 · 循 环 变 成 一 行', W / 2, 755, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 029 · D5/S3/Combinatorics/FundamentalBijection', W / 2, 115, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['53 frozen modules', C.green], ['22,471 lines', C.cyan], ['2 conjectures', C.orange]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 420, 850, 380, 60, s, col, P(S, 1, 0.5 + i * 1.2), 24));
};

/* ---- 02 MACHINE ---- */
SCENES.machine = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const p = [3, 1, 5, 2, 4];
  word(p, 160, 280, 90, clamp(u));
  txt('3 1 5 2 4', 160, 260, { size: 20, fam: F.mono, c: C.dim, a: clamp(u) });
  cycleGraph(p, 1330, 470, 210, clamp(u), { start: 1, hl: P(S, 0, 1, 9) * 5 });
  const steps = ['1 → 3', '3 → 5', '5 → 4', '4 → 2', '2 → 1'];
  steps.forEach((s, i) => txt(s, 200 + i * 110, 450, { size: 24, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 1.5 + i * 1.8) }));
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('start at the largest:', 160, 560, { size: 24, fam: F.mono, c: C.dim, a: q });
    txt('( 5  4  2  1  3 )', 160, 630, { size: 50, fam: F.mono, w: 700, c: C.gold, a: q * (1 - P(S, 1, 6)) });
    word([5, 4, 2, 1, 3], 160, 590, 90, P(S, 1, 6, 1));
    stamp('3 1 5 2 4 ↦ 5 4 2 1 3', 560, 790, P(S, 1, 8), C.green, 36, -0.03);
  }
  thm('ThetaFixedDefs.theta · cycles led by their maximum, in increasing order of leader', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 03 INVERSE ---- */
SCENES.inverse = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const w = [2, 1, 4, 6, 3, 5], s = 96, x0 = W / 2 - wordW(6, s) / 2, y0 = 300;
  word(w, x0, y0, s, clamp(u));
  const recs = [0, 2, 3];
  recs.forEach((i, k) => { const q = P(S, 0, 4 + k * 1.5); if (q <= 0) return; txt('record', x0 + i * (s + 8) + s / 2, y0 - 16, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); if (i > 0) line(x0 + i * (s + 8) - 4, y0 - 30, x0 + i * (s + 8) - 4, y0 + s + 30, C.red, q, 4); });
  const q = P(S, 0, 9);
  if (q > 0) {
    [['(2 1)', 400], ['(4)', 960], ['(6 3 5)', 1500]].forEach(([c, x], i) => { txt(c, x, 540, { size: 46, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 9 + i * 0.8) }); });
    arrow(W / 2, 580, W / 2, 640, C.white, P(S, 1, 0), 3);
  }
  const q1 = P(S, 1, 0.3);
  if (q1 > 0) {
    txt('θ⁻¹ :', x0 - 30, 715, { size: 30, fam: F.orb, w: 900, align: 'right', c: C.cyan, a: q1 });
    word([2, 1, 5, 4, 6, 3], x0, 660, s, q1);
    chip(W / 2, 810, 820, 56, 'one line ⟷ one permutation · a bijection', C.green, P(S, 1, 3), 24);
  }
  thm('record intervals reconstruct a permutation from its inverse cycles', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 04 ORBIT ---- */
SCENES.orbit = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const sp = clamp(u / 1);
  /* fixed points */
  [['1 2 3', 300, C.cyan], ['2 1 3', 300 + 0, C.mag]].forEach(([s0, x, col], i) => { const y = 330 + i * 240; chip(x, y, 220, 70, s0, col, sp, 34); ring(x + 150, y - 40, 34, C.dim, sp * 0.8, 2); arrow(x + 176, y - 18, x + 120, y - 26, C.dim, sp * 0.8, 2); txt('θ', x + 210, y - 40, { size: 26, fam: F.orb, w: 900, c: C.dim, a: sp }); });
  /* 3-cycle */
  const cx = 1180, cy = 500, R = 210, ws = ['2 3 1', '3 1 2', '3 2 1'];
  const go = P(S, 0, 6, 10) * 3;
  ws.forEach((s0, i) => {
    const ang = -Math.PI / 2 + i * TAU / 3, x = cx + R * Math.cos(ang), y = cy + R * Math.sin(ang);
    const ang2 = -Math.PI / 2 + (i + 1) * TAU / 3, x2 = cx + R * Math.cos(ang2), y2 = cy + R * Math.sin(ang2);
    const on = Math.floor(go) % 3 === i && go > 0;
    chip(x, y, 220, 70, s0, on ? C.gold : C.white, sp, 34);
    const dx = x2 - x, dy = y2 - y, L = Math.hypot(dx, dy);
    arrow(x + dx / L * 120, y + dy / L * 60, x2 - dx / L * 120, y2 - dy / L * 60, C.gold, sp * clamp(go - i), 3);
  });
  txt('θ', cx, cy + 14, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.gold, a: sp, ab: 2 });
  const q = P(S, 1, 0.3);
  if (q > 0) stamp('θ³ FIXES THE WHOLE LOOP', cx, 830, q, C.green, 36, -0.03);
};

/* ---- 05 CONJECTURE ---- */
SCENES.conjecture = S => {
  const u = S.u, t = S.t;
  badges(S, ['lit', 'proof']);
  const A = [1, 1, 2, 5, 9, 18, 37, 73, 146, 293];
  A.forEach((v, i) => { const h = Math.log2(v + 1) * 50, x = 240 + i * 130, q = P(S, 0, 1 + i * 0.5); fillBox(x, 640 - h, 90, h, i <= 7 ? C.orange : C.cyan, q * 0.8); txt(String(v), x + 45, 625 - h, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt('n=' + i, x + 45, 672, { size: 17, fam: F.mono, align: 'center', c: C.dim, a: q }); });
  txt('avoid 231 (or 312) · fixed by θ³', 240, 250, { size: 28, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 0.5) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(W / 2, 760, 900, 70, 'F(x) = 1 / (1 − x − x² − 2x³)', C.gold, q, 34);
    stamp('THEOREM ∀ n', 620, 340, P(S, 1, 4), C.green, 44, -0.04);
  }
  thm('ThetaCube.result : cubeClaim · both σ = 231 and σ = 312', W / 2, 880, P(S, 1, 2), 'center');
};

/* ---- 06 BLOCKS ---- */
function permPlot(p, x, y, cell, col, a) { if (a <= 0) return; const n = p.length; box(x, y, n * cell, n * cell, col, a * 0.5, 1); p.forEach((v, i) => { fillBox(x + i * cell + 3, y + (n - v) * cell + 3, cell - 6, cell - 6, col, a * 0.85); }); }
SCENES.blocks = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const sp = clamp(u / 1);
  /* a direct sum 21 ⊕ 312 ⊕ 1 */
  const p = [2, 1, 5, 3, 4, 6], cell = 60, x0 = 260, y0 = 260;
  box(x0, y0, 6 * cell, 6 * cell, C.dim, sp, 1.5);
  [[0, 2, C.cyan], [2, 3, C.mag], [5, 1, C.gold]].forEach(([s0, len, col], k) => { const q = P(S, 0, 4 + k); box(x0 + s0 * cell, y0 + (6 - s0 - len) * cell, len * cell, len * cell, col, q, 3); });
  p.forEach((v, i) => fillBox(x0 + i * cell + 6, y0 + (6 - v) * cell + 6, cell - 12, cell - 12, C.white, sp * 0.9));
  txt('2 1 5 3 4 6 = 21 ⊕ 312 ⊕ 1', x0 + 3 * cell, y0 + 6 * cell + 50, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 7) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('θ(a ⊕ b) = θ(a) ⊕ θ(b)', 1300, 330, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
    txt('F = 1 / (1 − I)', 1300, 470, { size: 50, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 1 });
    txt('I = single blocks fixed by θ³', 1300, 530, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 5) });
  }
  thm('θ commutes with direct sums · avoiders factor uniquely into sum-indecomposable blocks', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 07 CHASE ---- */
SCENES.chase = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const blocks = [[[1], 'x'], [[2, 1], 'x²'], [[3, 1, 2], 'x³'], [[3, 2, 1], 'x³']];
  blocks.forEach(([p, lab], i) => { const q = P(S, 0, 1 + i * 1.3), x = 230 + i * 230; permPlot(p, x, 260, 50, [C.cyan, C.mag, C.gold, C.green][i], q); txt(p.join(''), x + p.length * 25, 450, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(lab, x + p.length * 25, 495, { size: 26, fam: F.mono, align: 'center', c: C.dim, a: q }); });
  txt('for σ = 231', 230, 230, { size: 22, fam: F.mono, c: C.dim, a: P(S, 0, 1) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const rows = ['p', 'θ⁻¹ p', 'θ⁻² p'], x0 = 1300;
    rows.forEach((r, k) => { const qq = P(S, 1, 0.5 + k); txt(r, x0 - 20, 290 + k * 90, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: qq }); for (let j = 0; j < 7; j++) cellv(x0 + j * 70, 245 + k * 90, 62, '·', C.dim, qq, 'rgba(0,0,0,0.5)', 0.4); });
    const q2 = P(S, 1, 5);
    if (q2 > 0) { cellv(x0 + 2 * 70, 245 + 2 * 90, 62, 6, C.red, q2, 'rgba(60,0,10,0.7)', 0.5); cellv(x0 + 5 * 70, 245 + 2 * 90, 62, 6, C.red, q2, 'rgba(60,0,10,0.7)', 0.5); arrow(x0 + 171, 600, x0 + 171, 515, C.red, q2, 3); arrow(x0 + 381, 600, x0 + 381, 515, C.red, q2, 3); txt('6 forced into two positions', x0 + 245, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: q2 }); txt('schematic', x0 + 245, 220, { size: 17, fam: F.mono, align: 'center', c: C.dim, a: q2 }); }
    chip(560, 760, 760, 64, 'I = x + x² + 2x³', C.gold, P(S, 1, 8), 34);
    stamp('NO BLOCK OF SIZE ≥ 4', 1400, 770, P(S, 1, 9), C.red, 36, -0.03);
  }
  thm('the large 231 inverse edge chain assigns six to two distinct positions', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 08 SURVIVAL ---- */
const TT = { 3: [5, 5, 5, 5, 5], 4: [9, 8, 7, 6, 5], 5: [15, 11, 9, 7, 5], 6: [23, 14, 11, 8, 5], 7: [32, 17, 13, 9, 5], 8: [44, 20, 15, 10, 5], 9: [59, 23, 17, 11, 5] };
SCENES.survival = S => {
  const u = S.u, t = S.t;
  badges(S, ['lit', 'proof']);
  const heads = ['n', 't₂', 't₃', 't₄', 't₅', 't₆₊'], forms = ['', 'cubic, n mod 3', '3n − 4', '2n − 1', 'n + 2', '5'];
  const x0 = 360, cw = 210, y0 = 230;
  heads.forEach((h, j) => txt(h, x0 + j * cw, y0, { size: 30, fam: F.orb, w: 900, align: 'center', c: j ? C.gold : C.dim, a: P(S, 0, 1) }));
  Object.entries(TT).forEach(([n, r], i) => {
    const q = P(S, 0, 2 + i * 0.6);
    txt(n, x0, y0 + 60 + i * 52, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
    r.forEach((v, j) => txt(String(v), x0 + (j + 1) * cw, y0 + 60 + i * 52, { size: 26, fam: F.mono, w: 700, align: 'center', c: j === 4 ? C.green : C.white, a: q * (j === 0 ? 1 : clamp(at(S, 1, 1, j * 1.2))) }));
  });
  forms.forEach((f, j) => { if (!f) return; txt(f, x0 + j * cw, y0 + 60 + 7 * 52 + 20, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 1 + j * 1.2) }); });
  thm('ThetaIterate.result : t₂ cubic quasipolynomial (n ≥ 2), t₃…t₆₊ for n ≥ 3', W / 2, 880, P(S, 1, 2), 'center');
};

/* ---- 09 FIVE ---- */
SCENES.five = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const ws = ['1 2 3', '2 1 3', '2 3 1', '3 1 2', '3 2 1'];
  ws.forEach((s0, i) => { const x = 260 + i * 350, q = P(S, 0, 1 + i * 0.8); chip(x, 330, 300, 70, s0 + ' 4 … n', NC[i + 1], q, 28); });
  const q1 = P(S, 0, 6);
  if (q1 > 0) {
    [0, 1].forEach(i => { ring(260 + i * 350, 270, 26, C.dim, q1, 2); });
    arrow(1112, 330, 1158, 330, C.gold, q1, 3); arrow(1462, 330, 1508, 330, C.gold, q1, 3); arrow(975, 390, 960, 372, C.gold, q1, 3);
    ctx.globalAlpha = q1; ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1660, 372); ctx.quadraticCurveTo(1310, 470, 975, 390); ctx.stroke(); ctx.globalAlpha = 1;
    txt('θ moves them only among themselves', W / 2, 500, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q1 });
  }
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const layers = [['E_n', C.cyan], ['D_n', C.mag], ['C_n', C.orange]];
    layers.forEach(([s0, col], i) => { const x = 520 + i * 440, qq = P(S, 1, 2 + i * 1.3); chip(x, 640, 260, 64, s0, col, qq, 30); if (i < 2) arrow(x + 140, 640, x + 300, 640, C.white, qq, 3); });
    txt('three explicit words step out of the layers in turn', W / 2, 750, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 6) });
  }
  thm('the five words 123, 213, 231, 312, 321 followed by 4…n form a θ-invariant set', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 10 CHECK ---- */
SCENES.check = S => {
  const u = S.u, t = S.t;
  badges(S, ['proof', 'open']);
  [['fixed avoiders  n ≤ 9 : 1 … 293 ✓', C.green], ['survival layers  n ≤ 9 ✓', C.green], ['53 frozen modules · 22,471 lines', C.cyan]].forEach(([s0, col], i) => chip(W / 2, 290 + i * 100, 960, 64, s0, col, P(S, 0, 1 + i * 1.5), 28));
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(W / 2 - 330, 650, 600, 64, 'θ⁴ : 1/(1 − x − x² − 2x⁴ − x⁵ − x⁶)', C.vio, q, 22);
    chip(W / 2 + 330, 650, 600, 64, 'θ⁵ : 1/(1 − x − x²)', C.vio, P(S, 1, 1), 22);
    stamp('OPEN', W / 2, 790, P(S, 1, 3), C.vio, 48, -0.03);
  }
  thm('ThetaFixedDefs.fourthClaim · fifthClaim are stated; no frozen proof uses them', W / 2, 880, P(S, 1, 2), 'center');
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['cycles → line', C.cyan], ['blocks', C.mag], ['successor chase', C.red], ['five survivors', C.green]];
    items.forEach(([s0, col], i) => { const x = 330 + i * 420, q = P(S, 0, 0.5 + i * 1.3) * fade; box(x - 180, 300, 360, 120, col, q, 2, 'rgba(0,0,0,0.5)'); txt(s0, x, 372, { size: 26, fam: F.orb, w: 900, align: 'center', c: col, a: q }); if (i < 3) arrow(x + 185, 360, x + 235, 360, C.white, q, 2.5); });
    txt('1/(1 − x − x² − 2x³)   ·   3n−4, 2n−1, n+2, 5', W / 2, 540, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) * fade });
    txt('checked to nine · proved for every n', W / 2, 640, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 1) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    cycleGraph([3, 1, 5, 2, 4], W / 2, 400, 150, ep * out, { start: 1 });
    txt('THE FUNDAMENTAL BIJECTION', W / 2, 660, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('基本双射的循环 · TRURETURING FILM 029', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Cycles become a line, and the machine keeps turning.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'TWO WRITINGS', machine: 'THE MACHINE', inverse: 'RUN BACKWARDS', orbit: 'ORBITS', conjecture: 'CONJECTURE 5.6', blocks: 'BLOCKS', chase: 'SUCCESSOR CHASE', survival: 'CONJECTURE 4.5', five: 'FIVE SURVIVORS', check: 'CHECK', finale: 'LEDGER' });

function poster29() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  cycleGraph([3, 1, 5, 2, 4], W / 2 - 420, 520, 200, 1, { start: 1 });
  arrow(W / 2 - 150, 520, W / 2 + 10, 520, C.gold, 1, 5);
  word([5, 4, 2, 1, 3], W / 2 + 60, 470, 90, 1);
  txt('循环变成一行', W / 2, 190, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE FUNDAMENTAL BIJECTION', W / 2, 860, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('基 本 双 射 的 循 环 · 两 个 猜 想 · 53 个 冻 结 模 块', W / 2, 940, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 029', W / 2, 995, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster29;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
