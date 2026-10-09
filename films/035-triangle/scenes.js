/* Film 035 — AURIC FIB ATOM PYRAMID VI · 星形、三角与记忆 */

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

/* ---- film 035 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME · RECOMPUTED', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN CONJECTURE · CITED · NOT PROVED HERE', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME · RECOMPUTED', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
const PC = { '0': C.white, '2': C.cyan, '3': C.gold, '5': C.mag, '25': C.green };
function fillPoly(pts, col, a) { if (a <= 0 || !pts.length) return; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); pts.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
function strokePoly(pts, col, a, lw = 2.5, close = true) { if (a <= 0 || !pts.length) return; ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); if (close) ctx.closePath(); ctx.stroke(); ctx.globalAlpha = 1; }
function dashed(x1, y1, x2, y2, col, a, w = 2) { if (a <= 0) return; ctx.save(); ctx.setLineDash([10, 9]); line(x1, y1, x2, y2, col, a, w); ctx.restore(); }
function ringPts(cx, cy, R, N, rot = -Math.PI / 2) { const p = []; for (let i = 0; i < N; i++) { const an = rot + TAU * i / N; p.push([cx + R * Math.cos(an), cy + R * Math.sin(an)]); } return p; }
/* a ring of N positions with configuration b; gaps (both empty) can glow gold */
function drawRing(cx, cy, R, b, a, o = {}) {
  if (a <= 0) return [];
  const N = b.length, p = ringPts(cx, cy, R, N);
  for (let i = 0; i < N; i++) {
    const j = (i + 1) % N, gap = !b[i] && !b[j], bad = b[i] && b[j];
    const col = bad ? C.red : (gap && o.gaps ? C.gold : (o.ec || C.cyan));
    line(p[i][0], p[i][1], p[j][0], p[j][1], col, a * (gap && o.gaps ? 1 : 0.7), gap && o.gaps ? (o.gw || 5) : (o.lw || 2.5));
  }
  const r = o.r || 16;
  for (let i = 0; i < N; i++) { if (b[i]) dot(p[i][0], p[i][1], r * 1.25, o.dn || 'g', a); else ring(p[i][0], p[i][1], r * 0.6, C.dim, a, 2); }
  return p;
}
const C5 = []; (function () { for (let m = 0; m < 32; m++) { const b = [0, 1, 2, 3, 4].map(i => (m >> i) & 1); if (b.every((x, i) => !(x && b[(i + 1) % 5]))) C5.push(b); } C5.sort((x, y) => x.reduce((s, v) => s + v, 0) - y.reduce((s, v) => s + v, 0)); })();
const MAX5 = [0, 1, 2, 3, 4].map(g => { const b = [0, 0, 0, 0, 0]; /* gap on edge g-(g+1): set alternate starting at g+2 */ b[(g + 2) % 5] = 1; b[(g + 4) % 5] = 1; return b; });
/* 3D: z up */
function v3(cx, cy, s, ang, tilt = 0.42, o = [0, 0, 0]) { return (x, y, z) => { let p = [(x - o[0]) * s, -(z - o[2]) * s, (y - o[1]) * s]; p = rotY(p, ang); p = rotX(p, tilt); return proj(p, cx, cy, 1400, 1400); }; }
const T5 = 1 / Math.sqrt(5);
const ARW = [0, 1, 2, 3, 4].map(j => [Math.sqrt(1 - T5) * Math.cos(TAU * j / 5), Math.sqrt(1 - T5) * Math.sin(TAU * j / 5), Math.sqrt(T5)]);
/* five arrows on a cone; mode 'star' connects j -> j+2 (orthogonal), 'pent' connects j -> j+1 (overlap 1/phi) */
function cone5(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return;
  const v = v3(cx, cy, s, ang, o.tilt == null ? 0.5 : o.tilt), O = v(0, 0, 0);
  const rim = []; for (let i = 0; i <= 60; i++) { const q = TAU * i / 60; rim.push(v(Math.sqrt(1 - T5) * Math.cos(q), Math.sqrt(1 - T5) * Math.sin(q), Math.sqrt(T5))); }
  strokePoly(rim, C.dim, a * 0.6, 1.5, false);
  const P = ARW.map(e => v(...e));
  if (o.pent) for (let j = 0; j < 5; j++) { const q = P[(j + 1) % 5]; line(P[j][0], P[j][1], q[0], q[1], C.gold, a * o.pent, 3); }
  if (o.star) for (let j = 0; j < 5; j++) { const q = P[(j + 2) % 5]; line(P[j][0], P[j][1], q[0], q[1], C.cyan, a * o.star, 3); }
  P.forEach((p, j) => { arrow(O[0], O[1], p[0], p[1], C.white, a * 0.85, 2.5); dot(p[0], p[1], 12, o.dn || 'm', a); });
  if (o.psi) { const z = v(0, 0, 1.15); arrow(O[0], O[1], z[0], z[1], C.gold, a * o.psi, 4); txt('ψ', z[0] + 14, z[1] + 6, { size: 26, fam: F.mono, w: 700, c: C.gold, a: a * o.psi }); }
  return P;
}
const PHI_ = (1 + Math.sqrt(5)) / 2;

/* ---- film 035: network helpers ---- */
const FI = [0, 1]; for (let i = 0; i < 40; i++) FI.push(FI[FI.length - 1] + FI[FI.length - 2]);
function eqn(s, x, y, a, col = C.white, size = 28, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function badgeSeq(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const s = lineAt(S, e[0]).s + e[1]; if (S.u >= s) { cur = e; st = s; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
const NC = { O: C.white, L: C.cyan, T: C.gold, R: C.mag, J: C.green };
const ND = { O: 'w', L: 'c', T: 'g', R: 'm', J: 'n' };
const NL = { O: '∅', L: '1', T: '2', R: '3', J: '13' };
const NW = { O: 'empty', L: 'low', T: 'middle', R: 'high', J: 'joint' };
const AE = [['O', 'L'], ['L', 'J'], ['J', 'R'], ['R', 'O'], ['O', 'T']];
/* square with a stalk: O left, L top, J right, R bottom, T far left */
function GP(cx, cy, s) { return { O: [cx - s, cy], L: [cx, cy - s], J: [cx + s, cy], R: [cx, cy + s], T: [cx - 2.4 * s, cy] }; }
function node(p, k, a, o = {}) {
  if (a <= 0) return;
  dot(p[0], p[1], o.r || 26, ND[k], a * (o.ghost ? 0.35 : 1));
  if (o.ghost) ring(p[0], p[1], (o.r || 26) * 0.9, NC[k], a, 2);
  if (o.lab !== false) {
    txt(NL[k], p[0], p[1] - (o.r || 26) - 12, { size: o.ls || 26, fam: F.mono, w: 700, align: 'center', c: NC[k], a });
    if (o.word) txt(NW[k], p[0], p[1] + (o.r || 26) + 26, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
}
function wire(A, B, col, a, w = 3, lab = null, o = {}) {
  if (a <= 0) return;
  if (o.dash) dashed(A[0], A[1], B[0], B[1], col, a, w); else line(A[0], A[1], B[0], B[1], col, a, w);
  if (lab) { const f = o.at == null ? 0.5 : o.at, mx = lerp(A[0], B[0], f) + (o.lx || 0), my = lerp(A[1], B[1], f) + (o.ly || 0); txt(lab, mx, my + 7, { size: o.size || 20, fam: F.mono, w: 700, align: 'center', c: o.lc || col, a }); }
}
/* current pulses travelling along a wire */
function pulses(A, B, t, a, col = 'g', n = 3, sp = 0.5) { if (a <= 0) return; for (let k = 0; k < n; k++) { const f = ((t * sp + k / n) % 1); dot(lerp(A[0], B[0], f), lerp(A[1], B[1], f), 7, col, a * Math.sin(Math.PI * f)); } }
/* resistor zigzag between two points */
function resistor(A, B, col, a, w = 3) {
  if (a <= 0) return;
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const z0 = 0.3, z1 = 0.7, k = 6, amp = 11;
  const pts = [A, [A[0] + ux * L * z0, A[1] + uy * L * z0]];
  for (let i = 1; i < k; i++) { const f = z0 + (z1 - z0) * i / k, s = i % 2 ? amp : -amp; pts.push([A[0] + ux * L * f + nx * s, A[1] + uy * L * f + ny * s]); }
  pts.push([A[0] + ux * L * z1, A[1] + uy * L * z1], B);
  strokePoly(pts, col, a, w, false);
}
/* true occupancy pyramid: base square low x high, apex = middle above the empty corner */
const PT = { O: [0, 0, 0], L: [1, 0, 0], R: [0, 1, 0], J: [1, 1, 0], T: [0, 0, 1] };
const PE = [['O', 'L'], ['L', 'J'], ['J', 'R'], ['R', 'O'], ['T', 'O'], ['T', 'L'], ['T', 'R'], ['T', 'J']];
function pyrTrue(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return {};
  const P = {};
  Object.keys(PT).forEach(k => { const [x, y, z] = PT[k]; let p = [(x - 0.5) * s, -(z - 0.35) * s, (y - 0.5) * s]; p = rotY(p, ang); p = rotX(p, o.tilt == null ? 0.45 : o.tilt); P[k] = proj(p, cx, cy, 1400, 1400); });
  if (o.fill) fillPoly([P.O, P.L, P.J, P.R], C.cyan, a * o.fill);
  PE.forEach(([i, k], e) => { const q = o.ep == null ? 1 : clamp(o.ep * 8 - e); if (q > 0) line(P[i][0], P[i][1], lerp(P[i][0], P[k][0], q), lerp(P[i][1], P[k][1], q), o.ec || C.cyan, a * 0.6, 2); });
  Object.keys(P).sort((i, k) => P[k][3] - P[i][3]).forEach(k => { dot(P[k][0], P[k][1], (o.r || 18), ND[k], a); if (o.lab !== false) txt(NL[k], P[k][0], P[k][1] - (o.r || 18) - 8, { size: o.ls || 22, fam: F.mono, w: 700, align: 'center', c: NC[k], a }); });
  return P;
}
function frac(n, d) { const g = (a, b) => b ? g(b, a % b) : Math.abs(a); const k = g(n, d); n /= k; d /= k; if (d < 0) { n = -n; d = -d; } return d === 1 ? String(n) : n + '/' + d; }
function mgrid(x, y, M, cs, a, o = {}) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((v, j) => { const q = o.prog == null ? 1 : clamp(o.prog * (M.length * row.length) - (i * row.length + j)); const col = o.colf ? o.colf(v, i, j) : (String(v)[0] === '-' ? C.mag : (v === '0' ? C.dim : C.gold)); box(x + j * cs, y + i * cs, cs, cs, col, a * q, 1.5, 'rgba(0,0,0,0.45)'); txt(String(v), x + j * cs + cs / 2, y + i * cs + cs / 2 + (o.size || 18) * 0.36, { size: o.size || 18, fam: F.mono, w: 700, align: 'center', c: col, a: a * q }); }));
}
function bracket(x, y, w, h, col, a) { line(x, y, x - 8, y, col, a, 2); line(x - 8, y, x - 8, y + h, col, a, 2); line(x - 8, y + h, x, y + h, col, a, 2); line(x + w, y, x + w + 8, y, col, a, 2); line(x + w + 8, y, x + w + 8, y + h, col, a, 2); line(x + w + 8, y + h, x + w, y + h, col, a, 2); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  pyrTrue(470, 560, 300, t * 0.25, s0 * (1 - 0.6 * P(S, 0, 6, 2)), { r: 22, ls: 26 });
  txt('the pyramid of five patterns', 470, 860, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  const wq = P(S, 0, 6, 2), G = GP(1380, 520, 150);
  AE.forEach(([i, k], e) => { const q = clamp(wq * 5 - e); wire(G[i], G[k], C.cyan, q * 0.8, 3); pulses(G[i], G[k], t + e * 0.3, q * P(S, 1, 0.5), 'g', 3, 0.35); });
  Object.keys(G).forEach(k => node(G[k], k, wq, { word: true }));
  const bq = P(S, 1, 2.5);
  ctx.save(); ctx.setLineDash([12, 10]); ring(1290, 520, 470, C.orange, bq * 0.8, 2.5); ctx.restore();
  chip(1290, 200, 420, 52, 'boundary observer', C.orange, bq, 22);
  chip(1290, 870, 520, 52, 'what can the outside learn?', C.white, P(S, 1, 4), 22);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const m = 0.5 + 0.5 * Math.sin(t * 0.9), cx = W / 2, cy = 430, R = 210;
  const pts = ringPts(cx, cy, R, 3);
  pts.forEach((p, i) => { line(cx, cy, p[0], p[1], C.gold, rp * (1 - m) * 0.9, 3); const q = pts[(i + 1) % 3]; line(p[0], p[1], q[0], q[1], C.cyan, rp * m * 0.9, 3); });
  dot(cx, cy, 24 * (1 - m) + 2, 'g', rp * (1 - m));
  pts.forEach((p, i) => dot(p[0], p[1], 22, ['c', 'm', 'n'][i], rp));
  txt(scramble('AURIC FIB ATOM PYRAMID VI', rp, 351), W / 2, 720, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 VI · 星 形 、 三 角 与 记 忆', W / 2, 795, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 035 · AURIC_FIB_ATOM_RESPONSE_TRIANGLE_AND_INTERNAL_MEMORY', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['star → triangle', C.gold], ['triangle ⇐ star', C.cyan], ['mass → memory', C.mag]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 520, 880, 440, 56, s, col, P(S, 1, 0.3 + i * 1.6), 24));
};

/* ---- 02 GRAPH ---- */
SCENES.graph = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), G = GP(620, 545, 165);
  const flips = ['flip low', 'flip high', 'flip low', 'flip high', 'flip middle'];
  const eo = [['O', 'L', 0], ['L', 'J', 1], ['J', 'R', 0], ['R', 'O', 1], ['O', 'T', 4]];
  const order = [0, 3, 4, 1, 2];
  AE.forEach(([i, k], e) => { const q = P(S, 0, 2 + order.indexOf(e) * 1.4, 0.6); wire(G[i], G[k], C.cyan, q, 4, null); });
  Object.keys(G).forEach(k => node(G[k], k, s0, { word: true, r: 30 }));
  txt('one bit at a time · legal patterns only', 620, 235, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 0.5) });
  /* illegal flips shown in red */
  const iq = P(S, 0, 8) * (1 - P(S, 1, 0));
  txt('2 + 1 or 2 + 3 : illegal, no edge', 620, 272, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.red, a: iq });
  const l = P(S, 1, 0.3);
  chip(620, 810, 480, 52, 'action graph: 5 edges', C.cyan, l, 22);
  pyrTrue(1450, 520, 280, t * 0.3, P(S, 1, 2.5), { r: 18, ls: 22, ep: P(S, 1, 2.5, 2), ec: C.gold });
  chip(1450, 810, 480, 52, 'pyramid hull: 8 edges', C.gold, P(S, 1, 2.5), 22);
  const r3 = P(S, 1, 6.5);
  chip(1450, 230, 520, 52, 'response edges: next', C.mag, r3, 22);
  txt('mixing edge ≠ action edge ≠ response edge', W / 2, 880, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 9) });
};

/* ---- 03 ENERGY ---- */
const U0 = { O: 0, L: 1, J: 0, R: -1, T: 0.5 };
function lapResp(u) { const j = { O: 0, L: 0, J: 0, R: 0, T: 0 }; AE.forEach(([a, b]) => { j[a] += u[a] - u[b]; j[b] += u[b] - u[a]; }); return j; }
SCENES.energy = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), G = GP(700, 560, 170);
  const shift = 0.8 * P(S, 1, 2.5, 1.2) * (1 - P(S, 1, 5.2, 0.8)), flip = P(S, 1, 6, 1);
  const sg = 1 - 2 * flip;
  const uu = {}; Object.keys(U0).forEach(k => { uu[k] = sg * U0[k] + shift; });
  const jj = lapResp(uu);
  AE.forEach(([i, k]) => { const d = Math.abs(uu[i] - uu[k]); wire(G[i], G[k], d > 0.75 ? C.orange : C.cyan, s0 * (0.4 + 0.5 * Math.min(1, d)), 2 + 3 * Math.min(1, d)); });
  const rq = P(S, 0, 8);
  Object.keys(G).forEach(k => {
    const p = G[k], h = uu[k] * 70;
    fillBox(p[0] + 34, p[1] - Math.max(0, h), 14, Math.abs(h), NC[k], s0 * 0.7);
    node(p, k, s0, { r: 26 });
    txt('u=' + uu[k].toFixed(2), p[0], p[1] + 56, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
    if (rq > 0 && Math.abs(jj[k]) > 1e-9) { const L = 34 * jj[k]; arrow(p[0] - 42, p[1], p[0] - 42, p[1] - L, jj[k] > 0 ? C.green : C.red, rq, 3); }
  });
  eqn('E(u) = ½ Σ c_ij (u_i − u_j)²', 1450, 280, P(S, 0, 2), C.white, 26);
  eqn('j = L u', 1450, 340, rq, C.green, 30);
  const E = AE.reduce((s, [a, b]) => s + (uu[a] - uu[b]) ** 2, 0) / 2, sj = Object.values(jj).reduce((a, b) => a + b, 0);
  eqn('E = ' + E.toFixed(3), 1450, 430, P(S, 0, 4), C.gold, 30);
  eqn('Σ j = ' + Math.abs(sj).toFixed(3), 1450, 490, P(S, 1, 0.3), C.green, 30);
  chip(1450, 600, 460, 52, 'u + λ·1 : same E', C.cyan, P(S, 1, 2.5), 22);
  chip(1450, 680, 460, 52, 'u → −u : j → −j', C.mag, P(S, 1, 6), 22);
};

/* ---- 04 STAR ---- */
const ARMS = [1, 2, 3, 6];
SCENES.star = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u);
  const lu = u - lineAt(S, 1).s;
  const m = u < lineAt(S, 1).s ? 3 : (lu < 8.5 ? 3 : lu < 10.3 ? 2 : lu < 11.8 ? 3 : 4);
  const c = ARMS.slice(0, m), C0 = c.reduce((a, b) => a + b, 0);
  /* star (left) */
  const cx = 470, cy = 540, R = 220, pts = ringPts(cx, cy, R, m, -Math.PI / 2);
  const uv = [1, 0, 0, 0].slice(0, m), ys = c.reduce((s, ci, i) => s + ci * uv[i], 0) / C0;
  const settle = P(S, 0, 3, 3), yv = lerp(0.9, ys, ease(settle));
  pts.forEach((p, i) => { line(cx, cy, p[0], p[1], C.gold, s0 * 0.85, 1.5 + c[i]); txt('c' + (i + 1) + '=' + c[i], lerp(cx, p[0], 0.55) + 18, lerp(cy, p[1], 0.55) - 10, { size: 18, fam: F.mono, w: 700, c: C.gold, a: s0 }); dot(p[0], p[1], 22, ['c', 'm', 'n', 'o'][i], s0); txt('u=' + uv[i], p[0], p[1] + 46, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 }); });
  dot(cx, cy, 20, 'g', s0); ring(cx, cy, 30, C.gold, s0 * 0.6, 2);
  txt('y = ' + yv.toFixed(3), cx + 40, cy - 30, { size: 20, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 3) });
  eqn('y* = Σ cᵢuᵢ / C', 470, 250, P(S, 0, 6), C.gold, 28);
  /* equivalent complete graph (right) */
  const l = P(S, 1, 0.3), qx = 1400, qy = 540, Q = ringPts(qx, qy, R, m, -Math.PI / 2);
  for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) { const g = frac(c[i] * c[j], C0); wire(Q[i], Q[j], C.cyan, l, 2.5, g, { lc: C.white, size: 18, at: (m === 4 && (j - i) === 2) ? 0.3 : 0.5 }); }
  Q.forEach((p, i) => dot(p[0], p[1], 22, ['c', 'm', 'n', 'o'][i], l));
  arrow(760, 540, 1110, 540, C.white, l, 3);
  txt('Kron elimination', 935, 520, { size: 20, fam: F.mono, w: 700, align: 'center', c: '#8fbcff', a: l });
  eqn('g_ij = cᵢ cⱼ / C', 1400, 250, l, C.cyan, 28);
  txt(m + ' ends → ' + (m * (m - 1) / 2) + (m === 2 ? ' edge' : ' couplings'), 1400, 860, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
};

/* ---- 05 INVERT ---- */
SCENES.invert = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 470, cy = 560, R = 210;
  const T3 = ringPts(cx, cy, R, 3, -Math.PI / 2), gl = ['1', '3', '2'];
  [[0, 1, '1'], [1, 2, '3'], [0, 2, '2']].forEach(([i, j, g]) => wire(T3[i], T3[j], C.cyan, s0, 3, 'g = ' + g, { lc: C.cyan, ly: i === 1 ? 26 : 0, lx: (i === 0 && j === 1) ? 52 : (i === 0 ? -52 : 0) }));
  T3.forEach((p, i) => { dot(p[0], p[1], 24, ['c', 'm', 'n'][i], s0); txt(String(i + 1), p[0], p[1] - 34, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 }); });
  eqn('c₁ = g₁₂ + g₁₃ + g₁₂g₁₃ / g₂₃', W / 2, 250, P(S, 0, 4), C.gold, 26);
  const sq = P(S, 1, 0.3, 1.2), sx = 1400, Sp = ringPts(sx, cy, R, 3, -Math.PI / 2), arm = ['11/3', '11/2', '11'];
  Sp.forEach((p, i) => { line(sx, cy, lerp(sx, p[0], sq), lerp(cy, p[1], sq), C.gold, s0, 2 + [1.3, 2, 4][i]); { const dx = p[0] - sx, dy = p[1] - cy, dl = Math.hypot(dx, dy); txt(arm[i], lerp(sx, p[0], 0.55) - dy / dl * 34, lerp(cy, p[1], 0.55) + dx / dl * 34 + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: sq }); } dot(p[0], p[1], 24, ['c', 'm', 'n'][i], s0 * sq); });
  dot(sx, cy, 18, 'g', sq);
  arrow(720, 560, 1150, 560, C.white, sq, 3);
  txt('unique star', 935, 540, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: sq });
  txt('check: (11/3)(11/2) / (121/6) = 1', W / 2, 330, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4) });
  chip(W / 2, 880, 760, 56, 'same boundary response · different inside', C.orange, P(S, 1, 6.5), 24);
};

/* ---- 06 FOUR ---- */
SCENES.four = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 480, cy = 560, R = 230;
  const Q = ringPts(cx, cy, R, 4, -Math.PI * 3 / 4);
  const g = { '01': '1/6', '02': '1/4', '03': '1/2', '12': '1/2', '13': '1', '23': '3/2' };
  const pc = { '01': C.gold, '23': C.gold, '02': C.cyan, '13': C.cyan, '03': C.mag, '12': C.mag };
  const hl = P(S, 0, 4);
  Object.keys(g).forEach(k => { const i = +k[0], j = +k[1], dg = (j - i) === 2; wire(Q[i], Q[j], hl > 0 ? pc[k] : C.cyan, s0, 3, g[k], { lc: C.white, size: 19, at: dg ? 0.28 : 0.5, ly: dg ? -14 : 0 }); });
  Q.forEach((p, i) => { dot(p[0], p[1], 24, ['c', 'm', 'n', 'o'][i], s0); txt('c=' + ARMS[i], p[0] + (p[0] < cx ? -44 : 44), p[1] + 6, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 }); });
  [['g₁₂ g₃₄', '1/6 · 3/2', C.gold], ['g₁₃ g₂₄', '1/4 · 1', C.cyan], ['g₁₄ g₂₃', '1/2 · 1/2', C.mag]].forEach(([a1, a2, col], i) => { const q = P(S, 0, 6 + i * 1.2); txt(a1 + ' = ' + a2 + ' = 1/4', 1030, 290 + i * 52, { size: 24, fam: F.mono, w: 700, c: col, a: q }); });
  const l = P(S, 1, 0.3);
  const rows = [['m', 'couplings', 'arms', 'constraints'], ['3', '3', '3', '0'], ['4', '6', '4', '2'], ['5', '10', '5', '5'], ['6', '15', '6', '9']];
  rows.forEach((r, i) => r.forEach((v, j) => txt(v, 1080 + j * 180, 520 + i * 58, { size: i === 0 ? 20 : 28, fam: F.mono, w: 700, align: 'center', c: i === 0 ? C.dim : (j === 3 ? C.green : C.white), a: P(S, 1, i === 0 ? 0.3 : 3 + i * 1.2) })));
  eqn('m(m−1)/2 − m = m(m−3)/2', 1350, 860, P(S, 1, 2), C.green, 26);
};

/* ---- 07 ACUTE ---- */
SCENES.acute = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  /* star with arm resistances r = 1, 1/2, 1/4 */
  const r = [1, 0.5, 0.25], rl = ['1', '1/2', '1/4'], cx = 420, cy = 560, Rr = 200, pts = ringPts(cx, cy, Rr, 3, -Math.PI / 2);
  pts.forEach((p, i) => { resistor([cx, cy], p, C.gold, s0, 2.5); dot(p[0], p[1], 22, ['c', 'm', 'n'][i], s0); txt('r' + (i + 1) + '=' + rl[i], p[0] + (i === 0 ? 50 : 0), p[1] + (i === 0 ? 0 : 48), { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 }); });
  dot(cx, cy, 14, 'g', s0);
  pulses(pts[0], [cx, cy], t, P(S, 0, 2), 'g', 3, 0.5); pulses([cx, cy], pts[1], t, P(S, 0, 2), 'g', 3, 0.5);
  eqn('R_ij = r_i + r_j', 420, 250, P(S, 0, 5), C.gold, 30);
  /* response triangle: side^2 = r_i + r_j */
  const l = P(S, 1, 0.3), sc = 260, d12 = Math.sqrt(1.5), d13 = Math.sqrt(1.25), d23 = Math.sqrt(0.75);
  const x3 = (d12 * d12 + d13 * d13 - d23 * d23) / (2 * d12), y3 = Math.sqrt(d13 * d13 - x3 * x3);
  const ox = 1080, oy = 720, A = [ox, oy], B = [ox + d12 * sc, oy], Cc = [ox + x3 * sc, oy - y3 * sc];
  fillPoly([A, B, Cc], C.cyan, l * 0.12); strokePoly([A, B, Cc], C.cyan, l, 3);
  [[A, B, Cc, 'r₁'], [B, Cc, A, 'r₂'], [Cc, A, B, 'r₃']].forEach(([V, P1, P2, lab], i) => {
    const a1 = Math.atan2(P1[1] - V[1], P1[0] - V[0]), a2 = Math.atan2(P2[1] - V[1], P2[0] - V[0]);
    ctx.globalAlpha = l * P(S, 1, 3.5); ctx.strokeStyle = C.green; ctx.lineWidth = 2.5; ctx.beginPath();
    let s = a1, e = a2; let d = e - s; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU;
    ctx.arc(V[0], V[1], 38, s, s + d, d < 0); ctx.stroke(); ctx.globalAlpha = 1;
    const mid = s + d / 2; txt(lab + ' > 0', V[0] + Math.cos(mid) * 72, V[1] + Math.sin(mid) * 72 + 6, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: l * P(S, 1, 3.5) });
  });
  [[A, B, '√(3/2)'], [A, Cc, '√(5/4)'], [B, Cc, '√(3/4)']].forEach(([P1, P2, s], i) => { const mx = (P1[0] + P2[0]) / 2, my = (P1[1] + P2[1]) / 2; txt(s, mx + (i === 0 ? 0 : i === 1 ? -60 : 60), my + (i === 0 ? 34 : 0), { size: 19, fam: F.mono, w: 700, align: 'center', c: C.white, a: l }); });
  eqn('(d_ij² + d_ik² − d_jk²)/2 = r_i', 1300, 260, P(S, 1, 1.5), C.green, 24);
  eqn('4A² = r₁r₂ + r₁r₃ + r₂r₃ = 7/8', 1300, 310, P(S, 1, 10), C.gold, 24);
  txt('obtuse would need some r_i < 0', 1300, 860, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 6) });
  txt('V²_{m−1} = (Π r_i)(Σ 1/r_i) / ((m−1)!)²', 1300, 365, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 12) });
};

/* ---- 08 FIB ---- */
SCENES.fib = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), G = GP(560, 540, 170);
  const hide = P(S, 0, 4, 1.5), ne = P(S, 1, 0.3, 2);
  AE.forEach(([i, k]) => { const toO = i === 'O' || k === 'O'; wire(G[i], G[k], C.cyan, s0 * (toO ? 1 - 0.8 * ne : 1), 3, (toO || ne < 0.5) ? null : '1', { lc: C.white, size: 18 }); });
  [['L', 'R'], ['L', 'T'], ['R', 'T']].forEach(([i, k]) => wire(G[i], G[k], C.gold, ne, 3, '1/3', { dash: true, lc: C.gold, size: 20, lx: i === 'L' && k === 'R' ? 26 : 0, ly: k === 'T' ? (i === 'L' ? -16 : 16) : 0 }));
  Object.keys(G).forEach(k => node(G[k], k, s0, { word: true, ghost: k === 'O' && hide > 0.5 }));
  eqn('u_∅ = (u₁ + u₂ + u₃) / 3', 560, 240, P(S, 0, 5.5), C.white, 26);
  const l = P(S, 1, 2);
  txt('Λ  (order 1, 3, 13, 2)', 1380, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
  const M = [['5', '-1', '-3', '-1'], ['-1', '5', '-3', '-1'], ['-3', '-3', '6', '0'], ['-1', '-1', '0', '2']];
  txt('1/3 ×', 1150, 410, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.gold, a: l });
  mgrid(1170, 290, M, 62, l, { prog: P(S, 1, 2, 2), size: 22 });
  chip(1380, 640, 520, 52, 'boundary response unchanged', C.green, P(S, 1, 8), 22);
  chip(1250, 740, 260, 52, 'loops: 1', C.cyan, P(S, 1, 10), 24);
  chip(1530, 740, 260, 52, 'loops: 2', C.gold, P(S, 1, 11), 24);
};

/* ---- 09 TETRA ---- */
const RM = { 'L,R': '1', 'L,J': '3/4', 'R,J': '3/4', 'L,T': '7/4', 'R,T': '7/4', 'J,T': '2' };
const TV = (() => { /* Cholesky of the Gram w.r.t. J for L, R, T */
  const G = [[0.75, 0.25, 0.5], [0.25, 0.75, 0.5], [0.5, 0.5, 2]], Lc = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let i = 0; i < 3; i++) for (let j = 0; j <= i; j++) { let s = G[i][j]; for (let k = 0; k < j; k++) s -= Lc[i][k] * Lc[j][k]; Lc[i][j] = i === j ? Math.sqrt(s) : s / Lc[j][j]; }
  const P = { J: [0, 0, 0], L: Lc[0], R: Lc[1], T: Lc[2] }, cen = [0, 1, 2].map(d => (P.J[d] + P.L[d] + P.R[d] + P.T[d]) / 4);
  Object.keys(P).forEach(k => { P[k] = P[k].map((v, d) => v - cen[d]); }); return P;
})();
SCENES.tetra = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 7.2, 'lean'], [1, 12.5, 'theory']]);
  const s0 = clamp(u), cx = 620, cy = 600, sc = 290, ang = t * 0.3;
  const Pp = {}; Object.keys(TV).forEach(k => { let p = [TV[k][0] * sc, -TV[k][2] * sc, TV[k][1] * sc]; p = rotY(p, ang); p = rotX(p, 0.35); Pp[k] = proj(p, cx, cy, 1400, 1400); });
  const fq = P(S, 1, 0.3);
  fillPoly([Pp.L, Pp.R, Pp.T], C.mag, fq * 0.08); fillPoly([Pp.L, Pp.J, Pp.T], C.cyan, fq * 0.08);
  Object.keys(RM).forEach((k, e) => { const [a, b] = k.split(','); const q = P(S, 0, 1 + e * 1.4, 0.6); wire(Pp[a], Pp[b], C.cyan, q, 2.5, RM[k], { lc: C.gold, size: 20 }); });
  Object.keys(Pp).sort((i, k) => Pp[k][3] - Pp[i][3]).forEach(k => node(Pp[k], k, s0, { r: 22, ls: 24 }));
  eqn('V²_resp = det G / 36 = 1/48', 620, 225, fq, C.mag, 26);
  txt('edge length = √R', 620, 870, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  const pq = P(S, 1, 7.2);
  pyrTrue(1420, 600, 260, t * 0.3, pq, { r: 16, ls: 20, fill: 0.1 });
  eqn('V_pyramid = 1/3', 1420, 225, pq, C.cyan, 28);
  txt('convexHull_three_pyramid', 1420, 270, { size: 16, fam: F.mono, align: 'center', c: C.green, a: pq });
  chip(1420, 870, 640, 52, 'same patterns · two readouts · two spaces', C.orange, P(S, 1, 12.5), 22);
};

/* ---- 10 SCHUR ---- */
SCENES.schur = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u);
  /* block matrix */
  const bx = 220, by = 220, bw = 150;
  [['L_BB', C.cyan], ['L_BI', C.dim], ['L_IB', C.dim], ['L_II', C.gold]].forEach(([s, col], i) => { const x = bx + (i % 2) * bw, y = by + Math.floor(i / 2) * bw * 0.7; box(x, y, bw - 8, bw * 0.7 - 8, col, s0, 2, 'rgba(0,0,0,0.5)'); txt(s, x + bw / 2 - 4, y + bw * 0.35, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: s0 }); });
  eqn('Λ = L_BB − L_BI L_II⁻¹ L_IB', 580, 290, P(S, 0, 2), C.white, 28, 'left');
  eqn('min over u_I  of  E = ½ u_Bᵀ Λ u_B', 580, 340, P(S, 0, 4), C.gold, 22, 'left');
  /* two orders */
  const q1 = P(S, 0, 8), q2 = P(S, 0, 9.5);
  chip(420, 500, 500, 50, 'hide ∅ , then 13', C.cyan, q1, 22);
  chip(420, 580, 500, 50, 'hide ∅ and 13 together', C.mag, q2, 22);
  arrow(700, 500, 900, 540, C.cyan, q1, 3); arrow(700, 580, 900, 560, C.mag, q2, 3);
  const r = P(S, 0, 12), cx = 1220, cy = 560, Q = { L: [cx - 170, cy - 120], R: [cx + 170, cy - 120], T: [cx, cy + 150] };
  wire(Q.L, Q.R, C.cyan, r, 3, '5/6', { lc: C.white }); wire(Q.L, Q.T, C.cyan, r, 3, '1/3', { lc: C.white, lx: -30 }); wire(Q.R, Q.T, C.cyan, r, 3, '1/3', { lc: C.white, lx: 30 });
  Object.keys(Q).forEach(k => node(Q[k], k, r, { r: 24 }));
  mgrid(1480, 420, [['7/6', '-5/6', '-1/3'], ['-5/6', '7/6', '-1/3'], ['-1/3', '-1/3', '2/3']], 74, r, { size: 18 });
  const l = P(S, 1, 0.3);
  chip(560, 760, 620, 52, 'shared seam variable → keep', C.red, l, 22);
  chip(560, 840, 620, 52, 'relation read later → keep', C.red, P(S, 1, 3), 22);
  txt('minimization ≠ probability summation', 1300, 840, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 5) });
};

/* ---- 11 MEMORY ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 400, cy = 560, R = 190, pts = ringPts(cx, cy, R, 3, -Math.PI / 2);
  const st = lineAt(S, 1).s + 2.5, tt = Math.max(0, (u - st) * 0.45), y = u < st ? 0 : (1 - Math.exp(-tt)) / 3;
  const uv = [u < st ? 0 : 1, 0, 0];
  pts.forEach((p, i) => { line(cx, cy, p[0], p[1], C.gold, s0, 3); dot(p[0], p[1], 24, ['c', 'm', 'n'][i], s0); txt('u=' + uv[i], p[0], p[1] + 46, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 }); });
  const hy = cy - y * 260;
  dot(cx, hy, 26, 'g', s0); ring(cx, hy, 36, C.gold, s0 * 0.7, 3);
  txt('mass m', cx + 44, hy - 20, { size: 18, fam: F.mono, w: 700, c: C.gold, a: s0 });
  eqn('m ẏ = Σ cᵢuᵢ − C y ,  τ = m / C', 720, 240, P(S, 0, 3), C.white, 24);
  eqn('y(t) = e^(−t/τ) y(0) + (1/m) ∫ e^(−(t−s)/τ) Σ cᵢuᵢ(s) ds', 960, 300, P(S, 0, 8), C.gold, 21);
  /* response plot */
  const ox = 900, oy = 640, pw = 820, ph = 230, l = P(S, 1, 0.3);
  line(ox, oy, ox + pw, oy, C.dim, l, 1.5); line(ox, oy - ph, ox, oy + ph * 0.6, C.dim, l, 1.5);
  const Y = v => oy - v * ph;
  dashed(ox, Y(2 / 3), ox + pw, Y(2 / 3), C.cyan, l * 0.6, 1.5); dashed(ox, Y(-1 / 3), ox + pw, Y(-1 / 3), C.mag, l * 0.6, 1.5);
  txt('2/3', ox + pw + 10, Y(2 / 3) + 6, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: l }); txt('−1/3', ox + pw + 10, Y(-1 / 3) + 6, { size: 18, fam: F.mono, w: 700, c: C.mag, a: l });
  txt('1', ox - 14, Y(1) + 6, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.white, a: l }); txt('t', ox + pw, oy + 28, { size: 18, fam: F.mono, w: 700, c: C.dim, a: l });
  const span = 6, cur = Math.min(span, tt);
  if (u > st) { curve(f => { const x = f * cur; return [ox + x / span * pw, Y(1 - (1 - Math.exp(-x)) / 3)]; }, 80, C.cyan, l, 3); curve(f => { const x = f * cur; return [ox + x / span * pw, Y(-(1 - Math.exp(-x)) / 3)]; }, 80, C.mag, l, 3); }
  txt('j₁ starts at 1', ox + 40, Y(1) - 14, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: P(S, 1, 3) });
  txt('j₂ = j₃', ox + 40, Y(0) + 30, { size: 18, fam: F.mono, w: 700, c: C.mag, a: P(S, 1, 3) });
  chip(1310, 920, 640, 50, 'triangle equivalent: only t → ∞', C.orange, P(S, 1, 11), 22);
};

/* ---- 12 POLE ---- */
SCENES.pole = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('Λ(s) = diag(cᵢ) − c cᵀ / (C + m s)', W / 2, 240, P(S, 0, 0.5), C.white, 28);
  eqn('Λ(s) − Λ(0) = m s / (C (C + m s)) · c cᵀ', W / 2, 295, P(S, 0, 4), C.gold, 24);
  /* s-plane */
  const ox = 480, oy = 560, q = P(S, 0, 6);
  line(ox - 260, oy, ox + 220, oy, C.dim, q, 1.5); line(ox, oy - 200, ox, oy + 200, C.dim, q, 1.5);
  txt('Re s', ox + 230, oy + 6, { size: 18, fam: F.mono, w: 700, c: C.dim, a: q }); txt('Im s', ox + 8, oy - 210, { size: 18, fam: F.mono, w: 700, c: C.dim, a: q });
  const px = ox - 170; line(px - 16, oy - 16, px + 16, oy + 16, C.red, q, 4); line(px - 16, oy + 16, px + 16, oy - 16, C.red, q, 4);
  txt('s = −C/m', px, oy + 46, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: q });
  txt('one common pole', ox, oy + 250, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  /* rank-one outer product */
  const rq = P(S, 0, 8);
  const cvec = [1, 2, 3];
  mgrid(830, 420, cvec.map(a => cvec.map(b => String(a * b))), 60, rq, { size: 18, colf: () => C.gold });
  txt('c cᵀ , c = (1,2,3) : rank 1', 920, 640, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: rq });
  /* sum of currents during transient (m = C = 3) */
  const l = P(S, 1, 0.3), gx = 1170, gy = 640, gw = 560, gh = 220;
  line(gx, gy, gx + gw, gy, C.dim, l, 1.5); line(gx, gy - gh, gx, gy + 10, C.dim, l, 1.5);
  const cp = P(S, 1, 0.5, 6);
  curve(f => [gx + f * cp * gw, gy - Math.exp(-f * cp * 6) * gh], 80, C.green, l, 3);
  txt('Σ j = m ẏ', gx + gw / 2, gy - gh - 16, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: l });
  txt('→ 0 at equilibrium', gx + gw - 10, gy - 16, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: l });
  eqn('dE/dt = Σ jᵢ u̇ᵢ − (C y − Σ cᵢuᵢ)² / m', W / 2, 820, P(S, 1, 7.5), C.orange, 22);
  txt('dissipation from the added relaxation law, not from geometry', W / 2, 865, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 9) });
};

/* ---- 13 LADDER ---- */
SCENES.ladder = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const nShow = Math.min(4, Math.floor(clamp((u - lineAt(S, 0).s - 3) / 7) * 5));
  const top = 300, bot = 470, xr = 1000, w = 170, x0 = xr - nShow * w;
  /* R_{n} = 1 + (1 ∥ R_{n-1}): series unit on the top rail, then a unit rung, then the inner ladder; R_0 is the last vertical unit */
  line(x0, bot, xr, bot, C.cyan, s0, 3);
  resistor([xr, top], [xr, bot], C.gold, s0, 3);
  for (let j = 0; j < nShow; j++) { const xs = x0 + j * w, xn = xs + 0.6 * w; resistor([xs, top], [xn, top], C.gold, s0, 3); resistor([xn, top], [xn, bot], C.cyan, s0, 2.5); line(xn, top, xs + w, top, C.cyan, s0, 3); }
  dot(x0, top, 9, 'w', s0); dot(x0, bot, 9, 'w', s0);
  txt('R' + ['₀', '₁', '₂', '₃', '₄'][nShow], x0 - 24, (top + bot) / 2 + 8, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: s0 });
  txt('gold: series · cyan: parallel rung', 700, 530, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  eqn('R₀ = 1 ,  R_{n+1} = 1 + R_n / (1 + R_n)', 1460, 300, P(S, 0, 1), C.white, 22);
  const vals = ['1', '3/2', '8/5', '21/13', '55/34', '144/89', '377/233'];
  vals.forEach((v, i) => { const q = P(S, 0, 3 + i * 1.5); txt(v, 1220 + (i % 4) * 140, 380 + Math.floor(i / 4) * 52, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); });
  txt('= F₂ₙ₊₂ / F₂ₙ₊₁', 1460, 500, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 12.5) });
  /* convergence plot */
  const ox = 260, oy = 860, pw = 760, l = P(S, 1, 0.3);
  const Yv = v => oy - (v - 1) * 400;
  line(ox, oy, ox + pw, oy, C.dim, l, 1.5);
  const phi = (1 + Math.sqrt(5)) / 2;
  dashed(ox, Yv(phi), ox + pw, Yv(phi), C.gold, l, 2);
  txt('φ = 1.618…', ox + pw + 12, Yv(phi) + 6, { size: 20, fam: F.mono, w: 700, c: C.gold, a: l });
  let Rv = 1; for (let n = 0; n < 9; n++) { const q = P(S, 1, 0.5 + n * 0.4); dot(ox + n * pw / 8, Yv(Rv), 10, 'c', q); Rv = 1 + Rv / (1 + Rv); }
  eqn('[2 1; 1 1] = [1 1; 1 0]²', 1460, 620, P(S, 1, 3), C.cyan, 26);
  eqn('R* = (a + √(a² + 4ab)) / 2', 1460, 700, P(S, 1, 7), C.white, 26);
  [['a = b = 1', 'φ', C.gold], ['a = 1, b = 2', '2', C.mag], ['a = 2, b = 1', '1 + √3', C.green]].forEach(([s, v, col], i) => txt(s + '  →  ' + v, 1460, 770 + i * 44, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: P(S, 1, 10 + i * 0.8) }));
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['static response', C.cyan], ['inner geometry', C.gold], ['dynamics', C.mag]];
    items.forEach(([s, col], i) => { const x = 380 + i * 580, q = P(S, 0, [0.3, 3, 6][i]) * fade; box(x - 220, 270, 440, 110, col, q, 2, 'rgba(0,0,0,0.5)'); txt(s, x, 338, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); if (i < 2) txt('⇏', x + 290, 345, { size: 54, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, [2, 5][i]) * fade }); });
    txt('a hidden node that acts again ≠ a memoryless copy', W / 2, 470, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 0, 8) * fade });
    txt('LEAN · the five-pattern hull is the pyramid', W / 2, 570, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.5) * fade });
    txt('CLASSICAL · Kron elimination · Schur complement', W / 2, 630, { size: 24, fam: F.mono, w: 700, align: 'center', c: '#8fbcff', a: P(S, 1, 3) * fade });
    txt('VOLUME · action graph · Λ · response tetrahedron · memory kernel · ladder', W / 2, 690, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 6) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), m = 0.5 + 0.5 * Math.sin(t * 0.9), cx = W / 2, cy = 400, R = 170, pts = ringPts(cx, cy, R, 3);
    pts.forEach((p, i) => { line(cx, cy, p[0], p[1], C.gold, ep * out * (1 - m), 3); const q = pts[(i + 1) % 3]; line(p[0], p[1], q[0], q[1], C.cyan, ep * out * m, 3); dot(p[0], p[1], 20, ['c', 'm', 'n'][i], ep * out); });
    dot(cx, cy, 20 * (1 - m) + 2, 'g', ep * out * (1 - m));
    txt('AURIC FIB ATOM PYRAMID VI', W / 2, 660, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('金字塔 VI · 星形、三角与记忆 · TRURETURING FILM 035', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A triangle can hide a star. A star with mass remembers.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WIRED PYRAMID', graph: 'ACTION GRAPH', energy: 'EDGE ENERGY', star: 'STAR TO TRIANGLE', invert: 'TRIANGLE TO STAR', four: 'FOUR-END TEST', acute: 'ACUTE RESPONSE', fib: 'HIDE THE EMPTY', tetra: 'RESPONSE TETRAHEDRON', schur: 'SCHUR COMPLEMENT', memory: 'INTERNAL MEMORY', pole: 'ONE POLE', ladder: 'GOLDEN LADDER', finale: 'LEDGER' });

function poster35() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const cx = 560, cy = 540, R = 230, pts = ringPts(cx, cy, R, 3);
  pts.forEach((p, i) => { line(cx, cy, p[0], p[1], C.gold, 0.9, 4); dot(p[0], p[1], 30, ['c', 'm', 'n'][i], 1); });
  dot(cx, cy, 26, 'g', 1);
  const qx = 1360, Q = ringPts(qx, cy, R, 3);
  Q.forEach((p, i) => { const q = Q[(i + 1) % 3]; line(p[0], p[1], q[0], q[1], C.cyan, 0.9, 4); dot(p[0], p[1], 30, ['c', 'm', 'n'][i], 1); });
  txt('⇄', W / 2, 560, { size: 120, fam: F.mono, w: 700, align: 'center', c: C.white, a: 0.8 });
  txt('FIB 原子金字塔 VI', W / 2, 190, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID VI', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('星 形 生 三 角 · 三 角 藏 星 形 · 有 质 量 的 中 心 会 记 忆', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 035', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster35;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
