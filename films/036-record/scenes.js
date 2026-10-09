/* Film 036 — AURIC FIB ATOM PYRAMID VII · 读口与记录三角形 */

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

/* ---- film 036: readout helpers ---- */
function eqn(s, x, y, a, col = C.white, size = 28, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function badgeSeq(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const s = lineAt(S, e[0]).s + e[1]; if (S.u >= s) { cur = e; st = s; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
const NC = { O: C.white, L: C.cyan, T: C.gold, R: C.mag, J: C.green };
const ND = { O: 'w', L: 'c', T: 'g', R: 'm', J: 'n' };
const NL = { O: '∅', L: '1', T: '2', R: '3', J: '13' };
const MK = ['O', 'L', 'T', 'R', 'J'];
const PT = { O: [0, 0, 0], L: [1, 0, 0], R: [0, 1, 0], J: [1, 1, 0], T: [0, 0, 1] };
const PE = [['O', 'L'], ['L', 'J'], ['J', 'R'], ['R', 'O'], ['T', 'O'], ['T', 'L'], ['T', 'R'], ['T', 'J']];
/* pyramid coordinates (X low, Y high, Z middle) -> screen */
function pyrMap(cx, cy, s, ang, tilt = 0.45) { return (X, Y, Z) => { let p = [(X - 0.5) * s, -(Z - 0.35) * s, (Y - 0.5) * s]; p = rotY(p, ang); p = rotX(p, tilt); return proj(p, cx, cy, 1400, 1400); }; }
function pyrTrue(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return {};
  const m = pyrMap(cx, cy, s, ang, o.tilt == null ? 0.45 : o.tilt), P = {};
  Object.keys(PT).forEach(k => { P[k] = m(...PT[k]); });
  if (o.fill) fillPoly([P.O, P.L, P.J, P.R], C.cyan, a * o.fill);
  PE.forEach(([i, k]) => line(P[i][0], P[i][1], P[k][0], P[k][1], o.ec || C.cyan, a * (o.ea || 0.55), 2));
  if (o.nodes !== false) Object.keys(P).sort((i, k) => P[k][3] - P[i][3]).forEach(k => { dot(P[k][0], P[k][1], (o.r || 16), ND[k], a); if (o.lab !== false) txt(NL[k], P[k][0], P[k][1] - (o.r || 16) - 8, { size: o.ls || 22, fam: F.mono, w: 700, align: 'center', c: NC[k], a }); });
  return { P, m };
}
function mgrid(x, y, M, cw, ch, a, o = {}) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((v, j) => { const q = o.prog == null ? 1 : clamp(o.prog * (M.length * row.length) - (i * row.length + j)); const col = o.colf ? o.colf(v, i, j) : C.gold; box(x + j * cw, y + i * ch, cw, ch, col, a * q, 1.5, o.fill ? o.fill(v, i, j) : 'rgba(0,0,0,0.45)'); txt(String(v), x + j * cw + cw / 2, y + i * ch + ch / 2 + (o.size || 18) * 0.36, { size: o.size || 18, fam: F.mono, w: 700, align: 'center', c: col, a: a * q }); }));
}
/* unit square plot for floor posteriors (u = low, v = high) */
function uvAxes(ox, oy, s, a, o = {}) {
  if (a <= 0) return;
  box(ox, oy - s, s, s, C.dim, a * 0.8, 1.5, 'rgba(0,0,0,0.25)');
  for (let k = 1; k < 4; k++) { line(ox + k * s / 4, oy, ox + k * s / 4, oy - s, C.dim, a * 0.25, 1); line(ox, oy - k * s / 4, ox + s, oy - k * s / 4, C.dim, a * 0.25, 1); }
  txt(o.xl || 'u = Pr(low | floor)', ox + s / 2, oy + 34, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
  ctx.save(); ctx.translate(ox - 22, oy - s / 2); ctx.rotate(-Math.PI / 2); txt(o.yl || 'v = Pr(high | floor)', 0, 0, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.mag, a }); ctx.restore();
  ['0', '1'].forEach((t, i) => { txt(t, ox + i * s, oy + 18, { size: 14, fam: F.mono, align: 'center', c: C.dim, a }); });
}
const UV = (ox, oy, s) => (u, v) => [ox + u * s, oy - v * s];
/* the three-outcome readout of the volume */
const T3 = { O: ['1/3', '5/9', '1/9'], L: ['1/9', '5/9', '1/3'], T: ['1/3', '1/3', '1/3'], R: ['2/3', '1/9', '2/9'], J: ['2/9', '1/9', '2/3'] };
const POST = [[1 / 4, 2 / 3], [1 / 2, 1 / 6], [3 / 4, 2 / 3]];
const POSTL = [['1/4', '2/3'], ['1/2', '1/6'], ['3/4', '2/3']];
const OC = [C.orange, C.vio, C.green], OD = ['o', 'v', 'n'];
/* 4-level two-outcome tables: which pass both four-corner conditions */
const PASS = (() => { const out = new Uint8Array(1024); for (let i = 0; i < 1024; i++) { const l = [0, 1, 2, 3, 4].map(k => ((i >> (2 * k)) & 3) + 1); const [l0, l1, l2, l3, l13] = l; const A = l0 * l13 === l1 * l3, B = (5 - l0) * (5 - l13) === (5 - l1) * (5 - l3); out[i] = A && B ? 1 : 0; } return out; })();

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  pyrTrue(560, 560, 320, t * 0.25, s0, { r: 20, ls: 24, fill: 0.08 });
  [['X = E[low]', C.cyan], ['Y = E[high]', C.mag], ['Z = E[middle]', C.gold]].forEach(([s, col], i) => chip(1330, 260 + i * 70, 400, 52, s, col, P(S, 0, 1.5 + i * 0.8), 22));
  const k = P(S, 0, 5);
  chip(1330, 500, 400, 56, 'κ = Pr(joint) = ?', C.green, k * (0.65 + 0.35 * Math.sin(t * 4)), 24);
  txt('invisible to the three averages', 1330, 560, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: k });
  const l = P(S, 1, 0.3);
  chip(1330, 680, 620, 52, 'which readouts keep a simple source simple?', C.white, l, 20);
  chip(1330, 760, 620, 52, 'smallest record that reads two things?', C.orange, P(S, 1, 4), 20);
  const tq = P(S, 1, 6.5); if (tq > 0) { const pts = ringPts(1330, 860, 50, 3); strokePoly(pts, C.orange, tq, 3); pts.forEach((p, i) => dot(p[0], p[1], 10, OD[i], tq)); }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const xs = [560, 960, 1360], cy = 400;
  /* segment */
  const a1 = rp; line(xs[0] - 110, cy, xs[0] + 110, cy, C.cyan, a1, 4); dot(xs[0] - 110, cy, 16, 'o', a1); dot(xs[0] + 110, cy, 16, 'v', a1);
  /* triangle */
  const tp = ringPts(xs[1], cy + 20, 130, 3, -Math.PI / 2 + t * 0.2); strokePoly(tp, C.gold, rp, 4); tp.forEach((p, i) => dot(p[0], p[1], 16, OD[i], rp));
  /* tetrahedron */
  const tv = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(v => { let p = v.map(c => c * 80); p = rotY(p, t * 0.5); p = rotX(p, 0.4); return proj(p, xs[2], cy, 1400, 1400); });
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(tv[i][0], tv[i][1], tv[j][0], tv[j][1], C.mag, rp, 3);
  tv.forEach((p, i) => dot(p[0], p[1], 14, ['o', 'v', 'n', 'c'][i], rp));
  ['2 outcomes', '3 outcomes', '4 outcomes'].forEach((s, i) => txt(s, xs[i], cy + 190, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.5 + i * 1.2) }));
  txt(scramble('AURIC FIB ATOM PYRAMID VII', rp, 361), W / 2, 720, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 VII · 读 口 与 记 录 三 角 形', W / 2, 795, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 036 · AURIC_FIB_ATOM_READOUT_CLOSURE_AND_RECORD_TRIANGLE + RECORD_SIMPLEX', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 MODEL ---- */
SCENES.model = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const w = [['∅', '1', 'O'], ['1', 'a', 'L'], ['2', 'b', 'T'], ['3', 'c', 'R'], ['13', 'a·c', 'J']];
  w.forEach(([m, v, k], i) => { const q = P(S, 0, 1 + i * 0.8), x = 300 + i * 170; box(x - 70, 250, 140, 120, NC[k], q, 2, 'rgba(0,0,0,0.5)'); txt(m, x, 290, { size: 24, fam: F.mono, w: 700, align: 'center', c: NC[k], a: q }); txt(v, x, 345, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
  eqn('p = (1, a, b, c, ac) / (1 + a + b + c + ac)', 640, 430, P(S, 0, 5), C.white, 24);
  txt('3 parameters, not 4', 640, 480, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 7) });
  /* four-corner square */
  const l = P(S, 1, 0.3), cx = 1420, cy = 450, h = 150;
  const Q = { O: [cx - h, cy + h], L: [cx + h, cy + h], J: [cx + h, cy - h], R: [cx - h, cy - h] };
  [['O', 'L'], ['L', 'J'], ['J', 'R'], ['R', 'O']].forEach(([i, k]) => line(Q[i][0], Q[i][1], Q[k][0], Q[k][1], C.cyan, l * 0.6, 2));
  line(Q.O[0], Q.O[1], Q.J[0], Q.J[1], C.gold, l * P(S, 1, 2), 4); line(Q.L[0], Q.L[1], Q.R[0], Q.R[1], C.mag, l * P(S, 1, 3.5), 4);
  Object.keys(Q).forEach(k => { dot(Q[k][0], Q[k][1], 22, ND[k], l); txt('p' + (k === 'O' ? '∅' : NL[k]), Q[k][0] + (Q[k][0] > cx ? 40 : -40), Q[k][1] + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: NC[k], a: l }); });
  eqn('Δ = p∅ p₁₃ − p₁ p₃ = 0', 1420, 700, P(S, 1, 2.5), C.gold, 28);
  eqn('Δ = (1 − Z) κ − XY', 1420, 750, P(S, 1, 4.5), C.white, 24);
  txt('floor: low ⟂ high', 1420, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 7.5) });
  chip(640, 820, 560, 52, 'declared model · not forced by legality', C.orange, P(S, 1, 11), 22);
};

/* ---- 03 BAYES ---- */
function bars5(x0, y0, vals, bw, sc, a, o = {}) {
  vals.forEach((v, i) => { const h = v * sc; fillBox(x0 + i * bw + 3, y0 - h, bw - 6, h, NC[MK[i]], a * 0.8); if (o.lab) txt(NL[MK[i]], x0 + i * bw + bw / 2, y0 + 20, { size: 14, fam: F.mono, align: 'center', c: C.dim, a }); });
  line(x0, y0, x0 + vals.length * bw, y0, C.dim, a, 1.5);
}
const POST5 = (() => { const tbl = { O: [1 / 3, 5 / 9, 1 / 9], L: [1 / 9, 5 / 9, 1 / 3], T: [1 / 3, 1 / 3, 1 / 3], R: [2 / 3, 1 / 9, 2 / 9], J: [2 / 9, 1 / 9, 2 / 3] }; return [0, 1, 2].map(o => { const r = MK.map(k => 0.2 * tbl[k][o]); const q = r.reduce((s, x) => s + x, 0); return r.map(x => x / q); }); })();
SCENES.bayes = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const s0 = clamp(u);
  bars5(860, 420, [0.2, 0.2, 0.2, 0.2, 0.2], 40, 500, s0, { lab: true });
  txt('prior p', 960, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  const sp = P(S, 0, 2, 1.5);
  POST5.forEach((pv, o) => { const x = 320 + o * 640 - 100, y = 760; const q = sp; bars5(x, y, pv, 40, 400, q, { lab: true }); txt('record ' + o + ' · q = 1/3', x + 100, y - 230, { size: 20, fam: F.mono, w: 700, align: 'center', c: OC[o], a: q }); arrow(960, 440, lerp(960, x + 100, 0.85), lerp(440, y - 260, 0.85), OC[o], q * 0.7, 2); });
  eqn('Σ_o q_o p^o = p', 960, 870, P(S, 0, 6), C.green, 30);
  const l = P(S, 1, 0.3);
  eqn('L(o | s) = q_o p^o_s / p_s', 1500, 300, l, C.white, 24);
  txt('bayes_plausibility', 1500, 345, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 6) });
  txt('posterior_mixture_kernel_realization', 1500, 375, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.green, a: l });
  chip(420, 300, 560, 52, 'also needed: Σ q_o κ_o = κ', C.orange, P(S, 1, 7), 22);
};

/* ---- 04 TWO ---- */
SCENES.two = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 470, cy = 480, h = 140;
  const Q = { O: [cx - h, cy + h], L: [cx + h, cy + h], J: [cx + h, cy - h], R: [cx - h, cy - h] };
  [['O', 'L'], ['L', 'J'], ['J', 'R'], ['R', 'O']].forEach(([i, k]) => line(Q[i][0], Q[i][1], Q[k][0], Q[k][1], C.cyan, s0 * 0.6, 2));
  Object.keys(Q).forEach(k => { dot(Q[k][0], Q[k][1], 22, ND[k], s0); txt('λ' + (k === 'O' ? '∅' : NL[k]), Q[k][0] + (Q[k][0] > cx ? 44 : -44), Q[k][1] + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: NC[k], a: s0 }); });
  eqn('λ∅ λ₁₃ = λ₁ λ₃', 470, 240, P(S, 0, 3), C.white, 24);
  eqn('(1−λ∅)(1−λ₁₃) = (1−λ₁)(1−λ₃)', 470, 280, P(S, 0, 4.5), C.white, 22);
  eqn('⇒ λ∅ + λ₁₃ = λ₁ + λ₃', 470, 720, P(S, 0, 7.5), C.gold, 24);
  eqn('⇒ (λ₁ − λ∅)(λ₃ − λ∅) = 0', 470, 765, P(S, 0, 9.5), C.red, 24);
  const l = P(S, 1, 0.3);
  chip(470, 840, 300, 46, 'low + middle', C.cyan, l, 20); chip(800, 840, 300, 46, 'high + middle', C.mag, l, 20);
  /* 1024-table grid */
  const gx = 1080, gy = 230, cs = 17, gq = P(S, 1, 4, 3);
  let n = 0;
  for (let i = 0; i < 1024; i++) { const r = Math.floor(i / 32), c = i % 32; const q = clamp(gq * 1024 - i); if (q <= 0) continue; const pass = PASS[i]; if (pass) n++; fillBox(gx + c * cs, gy + r * cs, cs - 3, cs - 3, pass ? C.gold : '#1b2a44', q * (pass ? 0.95 : 0.6)); }
  txt('4 levels per pattern · 4⁵ = 1024 tables', gx + 16 * cs, gy - 18, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4) });
  txt(n + ' keep both posteriors simple', gx + 16 * cs, gy + 32 * cs + 34, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
};

/* ---- 05 SADDLE ---- */
SCENES.saddle = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 560, cy = 560, sc = 420, ang = -0.6 + t * 0.15;
  const M = (a, b, k) => { let p = [(a - 0.5) * sc, -(k - 0.25) * sc * 1.2, (b - 0.5) * sc]; p = rotY(p, ang); p = rotX(p, 0.5); return proj(p, cx, cy, 1600, 1600); };
  for (let i = 0; i <= 10; i++) { const a = i / 10; curve(f => { const q = M(a, f, a * f); return [q[0], q[1]]; }, 20, C.cyan, s0 * 0.35, 1.2); curve(f => { const q = M(f, a, f * a); return [q[0], q[1]]; }, 20, C.mag, s0 * 0.35, 1.2); }
  txt('k = u v', cx, 220, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  const l0 = u < lineAt(S, 1).s;
  const A = l0 ? [0.2, 0.25] : [0.5, 0.15], B = l0 ? [0.85, 0.8] : [0.5, 0.85];
  const pA = M(A[0], A[1], A[0] * A[1]), pB = M(B[0], B[1], B[0] * B[1]);
  const mq = P(S, l0 ? 0 : 1, l0 ? 3 : 0.5);
  dot(pA[0], pA[1], 16, 'o', mq); dot(pB[0], pB[1], 16, 'n', mq);
  line(pA[0], pA[1], pB[0], pB[1], l0 ? C.gold : C.green, mq, 3);
  const tm = 0.5, um = lerp(A[0], B[0], tm), vm = lerp(A[1], B[1], tm), km = lerp(A[0] * A[1], B[0] * B[1], tm);
  const pm = M(um, vm, km), ps = M(um, vm, um * vm);
  if (l0) { dashed(pm[0], pm[1], ps[0], ps[1], C.red, mq * P(S, 0, 6), 3); txt('excess ' + (km - um * vm).toFixed(3), pm[0] + 20, pm[1] - 14, { size: 18, fam: F.mono, w: 700, c: C.red, a: P(S, 0, 6) }); }
  /* formula and rectangle */
  eqn('k̄ − ū v̄ = t(1−t)(u₁−u₀)(v₁−v₀)', 1430, 260, P(S, 0, 6), C.gold, 24);
  const ox = 1230, oy = 720, s = 400, F2 = UV(ox, oy, s);
  uvAxes(ox, oy, s, P(S, 0, 7));
  const rq = P(S, 0, 8);
  if (l0) { const a0 = F2(A[0], A[1]), b0 = F2(B[0], B[1]); fillPoly([a0, [b0[0], a0[1]], b0, [a0[0], b0[1]]], C.gold, rq * 0.25); strokePoly([a0, [b0[0], a0[1]], b0, [a0[0], b0[1]]], C.gold, rq, 2); dot(a0[0], a0[1], 12, 'o', rq); dot(b0[0], b0[1], 12, 'n', rq); txt('signed rectangle', (a0[0] + b0[0]) / 2, (a0[1] + b0[1]) / 2 + 6, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: rq }); }
  else { const a0 = F2(A[0], A[1]), b0 = F2(B[0], B[1]), pr = F2(0.5, 0.5); line(a0[0], a0[1], b0[0], b0[1], C.green, mq, 3); dot(a0[0], a0[1], 12, 'o', mq); dot(b0[0], b0[1], 12, 'n', mq); dot(pr[0], pr[1], 12, 'w', mq); txt('prior', pr[0] + 18, pr[1] + 6, { size: 18, fam: F.mono, w: 700, c: C.white, a: mq }); chip(1430, 820, 520, 50, 'one end fixed: u constant', C.green, P(S, 1, 4), 22); }
};

/* ---- 06 THREE ---- */
SCENES.three = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const M = MK.map(k => T3[k]);
  MK.forEach((k, i) => txt(NL[k], 200, 300 + i * 66 + 38, { size: 24, fam: F.mono, w: 700, align: 'center', c: NC[k], a: s0 }));
  ['O = 0', 'O = 1', 'O = 2'].forEach((s, j) => txt(s, 240 + j * 140 + 70, 280, { size: 20, fam: F.mono, w: 700, align: 'center', c: OC[j], a: s0 }));
  mgrid(240, 300, M, 140, 66, s0, { prog: P(S, 0, 0.5, 2), size: 24, colf: (v, i, j) => OC[j] });
  const ck = P(S, 0, 5);
  [0, 1, 2].forEach(j => txt('λ∅λ₁₃ = λ₁λ₃ ✓', 240 + j * 140 + 70, 660, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.green, a: ck }));
  /* floor posteriors */
  const l = P(S, 1, 0.3), ox = 1080, oy = 800, s = 520, F2 = UV(ox, oy, s);
  uvAxes(ox, oy, s, l);
  const pr = F2(0.5, 0.5); dot(pr[0], pr[1], 14, 'w', l); txt('prior', pr[0] + 18, pr[1] - 10, { size: 18, fam: F.mono, w: 700, c: C.white, a: l });
  POST.forEach(([pu, pv], o) => { const q = P(S, 1, 5.5 + o * 1.9), p = F2(pu, pv); arrow(pr[0], pr[1], lerp(pr[0], p[0], q), lerp(pr[1], p[1], q), OC[o], q, 3); dot(p[0], p[1], 16, OD[o], q); txt('(' + POSTL[o][0] + ', ' + POSTL[o][1] + ')', p[0] + (o === 1 ? 0 : (o === 0 ? -20 : 20)), p[1] + (o === 1 ? 40 : -22), { size: 20, fam: F.mono, w: 700, align: o === 0 ? 'right' : (o === 2 ? 'left' : 'center'), c: OC[o], a: q }); });
  txt('q = 1/3 each · Z = 1/5 each', 600, 760, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1.5) });
  chip(600, 840, 520, 50, 'both ends move · all independent', C.gold, P(S, 1, 12), 22);
};

/* ---- 07 MINIMAL ---- */
SCENES.minimal = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('0 = Cov(x, y) = E[Cov(x, y | O)] + Cov_O(u_O, v_O)', W / 2, 240, P(S, 0, 0.5), C.white, 24);
  eqn('⇒ Cov_O(u_O, v_O) = 0 : record changes orthogonal', W / 2, 290, P(S, 0, 4), C.gold, 22);
  /* line 0: centred record changes of the three-outcome readout are orthogonal */
  const bq = P(S, 0, 2) * (1 - P(S, 1, 0, 0.8));
  if (bq > 0) {
    const du = [-1 / 4, 0, 1 / 4], dv = [1 / 6, -1 / 3, 1 / 6], by = 560, sc2 = 420;
    [[du, C.cyan, 'Δu', 560], [dv, C.mag, 'Δv', 1060]].forEach(([d, col, nm, x0]) => {
      line(x0 - 30, by, x0 + 330, by, C.dim, bq, 1.5); txt(nm, x0 - 50, by + 8, { size: 24, fam: F.mono, w: 700, align: 'right', c: col, a: bq });
      d.forEach((v, o) => { const x = x0 + o * 110, h = v * sc2; fillBox(x, Math.min(by, by - h), 70, Math.abs(h), OC[o], bq * 0.8); txt(['−1/4', '0', '1/4'][o] && (nm === 'Δu' ? ['−1/4', '0', '+1/4'][o] : ['+1/6', '−1/3', '+1/6'][o]), x + 35, by + (v >= 0 ? 34 : -h + 34), { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: bq }); });
    });
    eqn('⅓(−¼·⅙) + ⅓(0·−⅓) + ⅓(¼·⅙) = 0', W / 2, 760, P(S, 0, 4) * (1 - P(S, 1, 0, 0.8)), C.green, 24);
  }
  /* two outcomes: a segment */
  const l = P(S, 1, 0.3), ox = 220, oy = 820, s = 420, F2 = UV(ox, oy, s);
  uvAxes(ox, oy, s, l);
  const a0 = F2(0.3, 0.35), b0 = F2(0.7, 0.75);
  fillPoly([a0, [b0[0], a0[1]], b0, [a0[0], b0[1]]], C.red, l * 0.2);
  line(a0[0], a0[1], b0[0], b0[1], C.red, l, 3); dot(a0[0], a0[1], 12, 'o', l); dot(b0[0], b0[1], 12, 'v', l);
  eqn('q₀q₁(u₁−u₀)(v₁−v₀) ≠ 0', ox + s / 2, oy - s - 30, P(S, 1, 2), C.red, 22);
  /* dimension picture */
  const dq = P(S, 1, 10), cx = 1280, cy = 560;
  line(cx - 260, cy + 120, cx - 60, cy + 120, C.cyan, dq, 4); txt('2 outcomes → a line', cx - 160, cy + 170, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: dq });
  const pl = [[cx + 40, cy + 160], [cx + 300, cy + 160], [cx + 380, cy + 40], [cx + 120, cy + 40]];
  fillPoly(pl, C.gold, P(S, 1, 12.3) * 0.25); strokePoly(pl, C.gold, P(S, 1, 12.3), 2);
  arrow(cx + 210, cy + 100, cx + 330, cy + 100, C.cyan, P(S, 1, 12.3), 3); arrow(cx + 210, cy + 100, cx + 250, cy + 50, C.mag, P(S, 1, 12.3), 3);
  txt('3 outcomes → the first plane', cx + 210, cy + 210, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 12.3) });
};

/* ---- 08 AREA ---- */
SCENES.area = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), ox = 220, oy = 820, s = 560, F2 = UV(ox, oy, s);
  uvAxes(ox, oy, s, s0);
  const pts = POST.map(([a, b]) => F2(a, b));
  fillPoly(pts, C.gold, s0 * 0.22 * P(S, 0, 1)); strokePoly(pts, C.gold, s0 * P(S, 0, 1), 3);
  pts.forEach((p, o) => dot(p[0], p[1], 16, OD[o], s0));
  const cen = F2(0.5, 0.5); txt('A = 1/8', cen[0], cen[1] + 40, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 2) });
  eqn('Var u = 1/24 · Var v = 1/18 · Cov = 0', 1340, 280, P(S, 0, 5), C.white, 22);
  mgrid(1200, 320, [['1/24', '0'], ['0', '1/18']], 130, 70, P(S, 0, 6), { size: 24, colf: (v) => v === '0' ? C.dim : C.gold });
  const l = P(S, 1, 0.3);
  eqn('det = 1/432 = (4/27) A²', 1330, 520, l, C.gold, 26);
  /* pyramid coordinates */
  const pq = P(S, 1, 6);
  const R = pyrTrue(1330, 740, 300, 0.7 + t * 0.12, pq, { r: 12, ls: 18, ea: 0.4 });
  if (pq > 0) { const m = R.m, tp = POST.map(([a, b]) => m(0.8 * a, 0.8 * b, 0.2)); fillPoly(tp, C.gold, pq * 0.4); strokePoly(tp, C.gold, pq, 2.5); }
  txt('X = 4u/5 , Y = 4v/5 , Z = 1/5  →  A = 2/25', 1330, 900, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: pq });
};

/* ---- 09 COARSE ---- */
SCENES.coarse = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), ox = 240, oy = 820, s = 540, F2 = UV(ox, oy, s);
  uvAxes(ox, oy, s, s0);
  const l1 = u >= lineAt(S, 1).s, mg = l1 ? P(S, 1, 1, 1.5) : P(S, 0, 4, 1.5);
  const pair = l1 ? [0, 1] : [0, 2];
  const mid = [(POST[pair[0]][0] + POST[pair[1]][0]) / 2, (POST[pair[0]][1] + POST[pair[1]][1]) / 2];
  POST.forEach(([a, b], o) => { const inP = pair.includes(o), p = F2(a, b), m = F2(...mid), q = inP ? mg : 0; dot(lerp(p[0], m[0], q), lerp(p[1], m[1], q), 16, OD[o], s0 * (inP ? 1 - 0.5 * q : 0.5)); });
  const m = F2(...mid); dot(m[0], m[1], 18, 'g', mg); txt('merged', m[0] + 22, m[1] - 12, { size: 18, fam: F.mono, w: 700, c: C.gold, a: mg });
  if (!l1) { chip(1340, 300, 620, 52, 'merge 0 + 2 : same v = 2/3', C.green, P(S, 0, 4), 22); eqn('Cov = 0 · low difference lost', 1340, 380, P(S, 0, 7), C.green, 24); }
  else {
    chip(1340, 300, 620, 52, 'merge 0 + 1', C.orange, P(S, 1, 0.3), 22);
    eqn('Cov = ¼ (½ − ¼)(⅙ − ⅔) = −1/32', 1340, 380, P(S, 1, 2), C.red, 26);
    const a0 = F2(...POST[0]), b0 = F2(...POST[1]); const rq = P(S, 1, 3);
    fillPoly([a0, [b0[0], a0[1]], b0, [a0[0], b0[1]]], C.red, rq * 0.2); strokePoly([a0, [b0[0], a0[1]], b0, [a0[0], b0[1]]], C.red, rq, 2);
    eqn('Cov(x,y | C) = Cov(u_T, v_T | C)', 1340, 470, P(S, 1, 5), C.white, 22);
    chip(1340, 560, 620, 52, 'no force acts on the source', C.cyan, P(S, 1, 9), 22);
  }
};

/* ---- 10 GRAPH ---- */
SCENES.graph = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  /* a general exclusion graph with a triangle clique */
  const G = [[420, 300], [600, 260], [520, 440], [280, 470], [700, 470], [450, 620]], E = [[0, 1], [1, 2], [0, 2], [2, 3], [2, 4], [3, 5], [4, 5]];
  const cl = [0, 1, 2], hq = P(S, 0, 4);
  E.forEach(([i, j]) => { const inC = cl.includes(i) && cl.includes(j); line(G[i][0], G[i][1], G[j][0], G[j][1], inC && hq > 0 ? C.gold : C.cyan, s0 * (inC ? 1 : 0.5), inC ? 4 : 2); });
  G.forEach((p, i) => dot(p[0], p[1], 20, cl.includes(i) && hq > 0 ? 'g' : 'c', s0));
  if (hq > 0) { fillPoly(cl.map(i => G[i]), C.gold, hq * 0.15); txt('clique: pairwise exclusive', 480, 220, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: hq }); }
  eqn('ℓ(I) = ℓ(∅) + Σ_{i ∈ I ∩ C} [ℓ({i}) − ℓ(∅)]', 480, 740, P(S, 0, 6), C.white, 22);
  /* FIB path */
  const l = P(S, 1, 0.3), py = 460, px = [1180, 1400, 1620];
  line(px[0], py, px[2], py, C.cyan, l, 3);
  [['L', 0], ['T', 1], ['R', 2]].forEach(([k, i]) => { dot(px[i], py, 26, ND[k], l); txt(NL[k], px[i], py - 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: NC[k], a: l }); });
  const c1 = P(S, 1, 3), c2 = P(S, 1, 5);
  ctx.save(); ctx.setLineDash([8, 8]); box(px[0] - 50, py - 80, 320, 160, C.cyan, c1, 2); box(px[1] - 50, py - 75, 320, 150, C.mag, c2, 2); ctx.restore();
  txt('{1, 2}', 1290, py + 120, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: c1 });
  txt('{2, 3}', 1510, py + 120, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: c2 });
  txt('FIB path: largest clique = one adjacent pair', 1400, 300, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
};

/* ---- 11 SIMPLEX ---- */
SCENES.simplex = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('rank B ≤ m − 1', 560, 250, P(S, 0, 0.5), C.white, 30);
  eqn('d independent bits kept independent ⇒ m ≥ d + 1', 1300, 250, P(S, 0, 4), C.gold, 22);
  const l = P(S, 1, 0.3), cy = 560, sc = 420;
  /* d = 1 segment */
  const pv = 0.3 * P(S, 0, 2) * (1 - P(S, 1, 0, 1)), q1 = Math.max(pv, P(S, 1, 4)); const x1 = 380;
  line(x1 - sc * 0.25, cy, x1 + sc * 0.25, cy, C.cyan, q1, 4); dot(x1 - sc * 0.25, cy, 14, 'o', q1); dot(x1 + sc * 0.25, cy, 14, 'v', q1);
  txt('d = 1 : length 1/2', x1, cy + 140, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q1 });
  /* d = 2 triangle: points (3/4,1/2), (1/4,3/4), (1/4,1/4) */
  const q2 = Math.max(pv, P(S, 1, 7)), x2 = 960, T2 = [[3 / 4, 1 / 2], [1 / 4, 3 / 4], [1 / 4, 1 / 4]].map(([a, b]) => [x2 + (a - 0.5) * sc, cy - (b - 0.5) * sc]);
  fillPoly(T2, C.gold, q2 * 0.2); strokePoly(T2, C.gold, q2, 3); T2.forEach((p, i) => dot(p[0], p[1], 14, OD[i], q2));
  txt('d = 2 : area 1/8', x2, cy + 140, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q2 });
  /* d = 3 tetrahedron */
  const q3 = Math.max(pv, P(S, 1, 9)), x3 = 1540, ang = t * 0.4;
  const V3 = [[3 / 4, 1 / 2, 1 / 2], [1 / 4, 3 / 4, 1 / 2], [1 / 4, 1 / 4, 3 / 4], [1 / 4, 1 / 4, 1 / 4]].map(v => { let p = [(v[0] - 0.5) * sc, -(v[2] - 0.5) * sc, (v[1] - 0.5) * sc]; p = rotY(p, ang); p = rotX(p, 0.35); return proj(p, x3, cy, 1400, 1400); });
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(V3[i][0], V3[i][1], V3[j][0], V3[j][1], C.mag, q3, 3);
  V3.forEach((p, i) => dot(p[0], p[1], 13, ['o', 'v', 'n', 'c'][i], q3));
  txt('d = 3 : volume 1/48', x3, cy + 140, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q3 });
  eqn('V_d = 1 / (2^d · d!)', W / 2, 830, P(S, 1, 11.5), C.green, 30);
  txt('first-return readout: ℓ(0) = 1/4 , ℓ(1) = 3/4', W / 2, 880, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l });
};

/* ---- 12 TETRA ---- */
const REC = [[1 / 5, [0, 0, 1], '0', 'middle', 'g'], [2 / 5, [3 / 4, 1 / 2, 0], '3/8', 'low returns 1', 'c'], [1 / 5, [1 / 4, 3 / 4, 0], '3/16', 'then high returns 1', 'm'], [1 / 5, [1 / 4, 1 / 4, 0], '1/16', 'both return 0', 'w']];
SCENES.tetra = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const R = pyrTrue(600, 600, 420, 0.75 + t * 0.12, s0, { r: 14, ls: 20, ea: 0.35 });
  const m = R.m, pts = REC.map(r => m(...r[1]));
  const tq = P(S, 1, 0.3);
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.orange, tq, 3);
  fillPoly([pts[1], pts[2], pts[3]], C.orange, tq * 0.15);
  REC.forEach((r, i) => { const q = P(S, 0, 7 + i * 1.2); dot(pts[i][0], pts[i][1], 16, r[4], q); });
  const hx = 1180;
  ['record', 'q', '(X, Y, Z)', 'κ'].forEach((h, j) => txt(h, hx + [0, 250, 400, 610][j], 260, { size: 18, fam: F.mono, w: 700, align: j ? 'center' : 'left', c: C.dim, a: s0 }));
  const lab = ['(0, 0, 1)', '(3/4, 1/2, 0)', '(1/4, 3/4, 0)', '(1/4, 1/4, 0)'], ql = ['1/5', '2/5', '1/5', '1/5'];
  REC.forEach((r, i) => { const q = P(S, 0, 7 + i * 1.2), y = 310 + i * 56; txt(r[3], hx, y, { size: 19, fam: F.mono, w: 700, c: C.white, a: q }); txt(ql[i], hx + 250, y, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); txt(lab[i], hx + 400, y, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); txt(r[2], hx + 610, y, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: q * P(S, 1, 6) }); });
  eqn('V_rec = 1/24 · det B = 1/5000', 1480, 600, tq, C.orange, 26);
  eqn('Σ q κ = 1/5 = κ', 1480, 660, P(S, 1, 6), C.green, 26);
};

/* ---- 13 SYMMETRY ---- */
SCENES.symmetry = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 560, cy = 560, sc = 380, ang = 0.6 + t * 0.25;
  const M3 = (a, b, c) => { let p = [(a - 0.5) * sc, -(c - 0.5) * sc, (b - 0.5) * sc]; p = rotY(p, ang); p = rotX(p, 0.4); return proj(p, cx, cy, 1400, 1400); };
  const cube = []; for (let i = 0; i < 8; i++) cube.push([i & 1, (i >> 1) & 1, (i >> 2) & 1]);
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = cube[i].reduce((s, v, k) => s + Math.abs(v - cube[j][k]), 0); if (d === 1) { const A = M3(...cube[i]), B = M3(...cube[j]); line(A[0], A[1], B[0], B[1], C.dim, s0 * 0.5, 1.5); } }
  const e = 0.25, SG = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], V = SG.map(sg => M3(...sg.map(v => 0.5 + e * v)));
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(V[i][0], V[i][1], V[j][0], V[j][1], C.mag, s0, 3);
  V.forEach((p, i) => dot(p[0], p[1], 14, ['o', 'v', 'n', 'c'][i], s0));
  const c0 = M3(0.5, 0.5, 0.5); dot(c0[0], c0[1], 10, 'w', s0);
  txt('u(o) = ½(1,1,1) + ε s_o', cx, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  const rows = [['E[uᵢ]', '1/2', '1/2', true], ['E[uᵢuⱼ]', '1/4', '1/4', true], ['E[u₁u₂u₃]', '1/8 + ε³', '1/8', false]];
  rows.forEach(([n, a, b, okk], i) => { const q = P(S, i < 2 ? 0 : 1, i < 2 ? 4 + i * 2 : 0.5), y = 330 + i * 80; txt(n, 1100, y, { size: 24, fam: F.mono, w: 700, c: C.white, a: q }); txt(a, 1420, y, { size: 24, fam: F.mono, w: 700, align: 'center', c: okk ? C.green : C.red, a: q }); txt(okk ? '=' : '≠', 1540, y, { size: 28, fam: F.mono, w: 700, align: 'center', c: okk ? C.green : C.red, a: q }); txt(b, 1650, y, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
  eqn('ε = 1/4 : Pr(111) = 9/64 vs 8/64', 1400, 640, P(S, 1, 4), C.red, 26);
  stamp('NOT THE SAME SOURCE', 1400, 760, P(S, 1, 9.5, 0.6), C.red, 40, -0.04);
};

/* ---- 14 QUANTUM ---- */
SCENES.quantum = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('|+⟩|+⟩ : are the two qubits the same?', W / 2, 230, s0, C.white, 24);
  const labs = ['00', '01', '10', '11'];
  const PH = [['1/2', '0', '0', '1/2'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['1/2', '0', '0', '1/2']];
  const MX = [['1/2', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '1/2']];
  const iq = P(S, 0, 1) * (1 - P(S, 1, 0, 0.8));
  if (iq > 0) { const IN = [0, 1, 2, 3].map(() => ['1/4', '1/4', '1/4', '1/4']); txt('input |+⟩|+⟩', W / 2, 340, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: iq }); mgrid(W / 2 - 170, 360, IN, 85, 62, iq, { size: 20, colf: () => C.white }); }
  const panels = [[480, 'one joint projection', PH, C.cyan, '|Φ⁺⟩ : ⟨X⊗X⟩ = 1'], [1440, 'read each · report same', MX, C.mag, 'mixture : ⟨X⊗X⟩ = 0']];
  panels.forEach(([x, title, M, col, res], i) => {
    const q = P(S, 0, 2 + i * 3);
    chip(x, 300, 480, 50, title, col, q, 22);
    mgrid(x - 170, 360, M, 85, 62, P(S, 1, 0.5 + i * 1.5), { size: 20, colf: (v, r, c) => v === '0' ? C.dim : ((r !== c) ? C.gold : col) });
    labs.forEach((lb, k) => { txt(lb, x - 195, 360 + k * 62 + 38, { size: 15, fam: F.mono, align: 'right', c: C.dim, a: P(S, 1, 0.5 + i * 1.5) }); });
    txt('Pr(same) = 1/2', x, 650, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 10.5) });
    txt(res, x, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: i ? C.mag : C.cyan, a: P(S, 1, 2 + i * 2.5) });
  });
  txt('same reported outcome · different successors', W / 2, 820, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 8) });
  txt('off-diagonal 1/2 = coherence kept', 480, 870, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
};

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['1 edge', 'triangle of events', C.cyan], ['2 outcomes', 'one direction', C.mag], ['3 outcomes', 'first plane', C.gold], ['forget', 'correlation', C.red]];
    items.forEach(([a1, a2, col], i) => { const x = 330 + i * 420, q = P(S, 0, [0.3, 3, 5.5, 9][i]) * fade; box(x - 190, 260, 380, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 325, { size: 34, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 375, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    txt('LEAN · bayes_plausibility · posterior_mixture_kernel_realization', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.5) * fade });
    txt('VOLUMES · readout classification · record triangle · record tetrahedra', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 4) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 8) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, pts = ringPts(W / 2, 420, 150, 3, -Math.PI / 2 + t * 0.2);
    fillPoly(pts, C.gold, a * 0.15); strokePoly(pts, C.gold, a, 4); pts.forEach((p, i) => dot(p[0], p[1], 18, OD[i], a));
    txt('AURIC FIB ATOM PYRAMID VII', W / 2, 660, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 VII · 读口与记录三角形 · TRURETURING FILM 036', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two outcomes draw a line. Three draw the first triangle.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'HIDDEN KAPPA', model: 'PRODUCT SOURCE', bayes: 'BAYES BARYCENTER', two: 'TWO OUTCOMES', saddle: 'INDEPENDENCE SADDLE', three: 'THREE OUTCOMES', minimal: 'WHY THREE', area: 'RECORD TRIANGLE', coarse: 'COARSE RECORDS', graph: 'CLIQUE READOUTS', simplex: 'RECORD SIMPLICES', tetra: 'RECORD TETRAHEDRON', symmetry: 'SYMMETRY IS NOT ENOUGH', quantum: 'QUANTUM SUCCESSORS', finale: 'LEDGER' });

function poster36() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const ox = 660, oy = 760, s = 600, F2 = UV(ox, oy, s);
  box(ox, oy - s, s, s, C.dim, 0.6, 1.5, 'rgba(0,0,0,0.2)');
  const pts = POST.map(([a, b]) => F2(a, b)), pr = F2(0.5, 0.5);
  fillPoly(pts, C.gold, 0.22); strokePoly(pts, C.gold, 1, 5);
  pts.forEach((p, o) => { line(pr[0], pr[1], p[0], p[1], OC[o], 0.8, 3); dot(p[0], p[1], 26, OD[o], 1); });
  dot(pr[0], pr[1], 18, 'w', 1);
  txt('A = 1/8', 1290, 470, { size: 56, fam: F.mono, w: 700, align: 'left', c: C.gold, a: 0.9 });
  txt('FIB 原子金字塔 VII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID VII', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('两 个 结 果 画 一 条 线 · 三 个 结 果 画 出 第 一 个 三 角 形', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 036', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster36;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
