/* Film 037 — AURIC FIB ATOM PYRAMID VIII · 金字塔 VIII：从共同出现到共同祖先 */

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

/* ---- film 037: tree helpers ---- */
/* Greek in the mono face reads as Latin (α≈a, ρ≈p, ν≈v); route Greek strings to a face with distinct glyphs */
const FG = '"DejaVu Sans", FreeSans, "Liberation Sans", sans-serif';
const _txt37 = txt;
txt = function (s, x, y, o = {}) { if (o.fam === F.mono && /[αβγδεκλμνξπρστχψω⟨⟩]/.test(String(s))) o = Object.assign({}, o, { fam: FG }); return _txt37(s, x, y, o); };
const isLf = t => typeof t === 'string';
function rhoT(t) { return t === 'a' ? 'b' : t === 'b' ? ['b', 'a'] : [rhoT(t[0]), rhoT(t[1])]; }
function TN(n) { let t = 'a'; for (let i = 0; i < n; i++) t = rhoT(t); return t; }
function wordT(t) { return isLf(t) ? t : wordT(t[0]) + wordT(t[1]); }
function nLv(t) { return isLf(t) ? 1 : nLv(t[0]) + nLv(t[1]); }
function htT(t) { return isLf(t) ? 0 : 1 + Math.max(htT(t[0]), htT(t[1])); }
function areasT(t) { return isLf(t) ? [] : areasT(t[0]).concat([nLv(t[0]) * nLv(t[1])], areasT(t[1])); }
function UN(n) { let u = ['b', ['a', 'b']]; for (let k = 3; k < n; k++) u = [u, TN(k - 1)]; return u; }
const GL = { a: 'α', b: 'β' }, GD = { a: 'c', b: 'm' }, GC = { a: C.cyan, b: C.mag };
const GPAL = [C.cyan, C.gold, C.mag, C.green, C.orange, C.vio, C.blue, C.red];
/* dendrogram layout: leaves evenly on baseline yb, internal node height = subtree height */
function layT(t, x0, x1, yb, dy) {
  const m = nLv(t), st = m > 1 ? (x1 - x0) / (m - 1) : 0, nodes = [], edges = [];
  const lx = i => (m > 1 ? x0 + i * st : (x0 + x1) / 2);
  let k = 0;
  function rec(s, path) {
    if (isLf(s)) { const p = { x: lx(k), y: yb, leaf: s, lo: k, hi: k, path }; k++; nodes.push(p); return p; }
    const L = rec(s[0], path + 'L'), R = rec(s[1], path + 'R'), h = htT(s);
    const p = { x: (lx(L.lo) + lx(R.hi)) / 2, y: yb - h * dy, leaf: null, lo: L.lo, hi: R.hi, gap: L.hi, l: L.hi - L.lo + 1, r: R.hi - R.lo + 1, L, R, path, h };
    nodes.push(p); edges.push([p, L], [p, R]); return p;
  }
  const root = rec(t, '');
  return { nodes, edges, root, m, lx };
}
function drawT(t, cx, yb, w, dy, a, o = {}) {
  const Lt = layT(t, cx - w / 2, cx + w / 2, yb, dy);
  if (a <= 0) return Lt;
  const ec = o.ec || C.cyan, lw = o.lw || 2.5, r = o.r || 14, ls = o.ls || 20;
  Lt.edges.forEach(([p, q]) => {
    const hc = o.hlE ? o.hlE(p, q) : null;
    if (hc) line(p.x, p.y, q.x, q.y, hc, a * 0.25, lw + 7);
    line(p.x, p.y, q.x, q.y, hc || ec, a * (hc ? 1 : (o.ea || 0.75)), hc ? lw + 1.5 : lw);
  });
  Lt.nodes.forEach(p => {
    if (p.leaf) {
      dot(p.x, p.y, r, o.lc ? o.lc(p) : GD[p.leaf], a);
      if (o.lab !== false) { const s = o.labf ? o.labf(p) : GL[p.leaf]; txt(s, p.x, p.y + r + ls + 2, { size: ls, fam: F.mono, w: 700, align: 'center', c: o.labc ? o.labc(p) : GC[p.leaf], a }); }
    } else {
      const hc = o.hlN ? o.hlN(p) : null;
      dot(p.x, p.y, hc ? r * 0.95 : r * 0.55, hc || 'w', a * (hc ? 1 : 0.85));
    }
  });
  return Lt;
}
/* the staircase of leaf pairs i<j, tiled by one l x r rectangle per internal node */
function pairGrid(t, x, y, cs, a, o = {}) {
  if (a <= 0) return null;
  const Lt = layT(t, 0, 1, 0, 1), m = Lt.m, ints = Lt.nodes.filter(p => !p.leaf);
  for (let i = 0; i < m - 1; i++) for (let j = i + 1; j < m; j++) box(x + (j - 1) * cs, y + i * cs, cs, cs, C.dim, a * 0.35, 1);
  ints.forEach(p => {
    const q = o.prog ? o.prog(p) : 1; if (q <= 0) return;
    const col = o.col ? o.col(p) : GPAL[p.gap % GPAL.length];
    const rx = x + p.gap * cs, ry = y + p.lo * cs, rw = (p.hi - p.gap) * cs, rh = (p.gap - p.lo + 1) * cs;
    fillBox(rx, ry, rw, rh, col, a * q * (o.fa || 0.3)); box(rx, ry, rw, rh, col, a * q, o.blw || 2.5);
    const mn = Math.min(rw, rh);
    if (o.num !== false && mn >= 22) { const sz = Math.min(o.nmax || 30, Math.max(12, mn * 0.45)); txt(String(p.l * p.r), rx + rw / 2, ry + rh / 2 + sz * 0.36, { size: sz, fam: F.mono, w: 700, align: 'center', c: col, a: a * q }); }
  });
  if (o.axes) {
    const wd = wordT(t), sz = o.axs || 18;
    for (let j = 1; j < m; j++) txt(GL[wd[j]], x + (j - 0.5) * cs, y - 10, { size: sz, fam: F.mono, w: 700, align: 'center', c: GC[wd[j]], a });
    for (let i = 0; i < m - 1; i++) txt(GL[wd[i]], x + i * cs - 12, y + (i + 0.5) * cs + sz * 0.36, { size: sz, fam: F.mono, w: 700, align: 'right', c: GC[wd[i]], a });
  }
  return { m, ints, cell: (i, j) => [x + (j - 1) * cs, y + i * cs] };
}
/* a subtree drawn as a labelled triangle */
function triT(x, y, w, h, s, col, a) {
  if (a <= 0) return;
  const pts = [[x, y], [x - w / 2, y + h], [x + w / 2, y + h]];
  fillPoly(pts, col, a * 0.18); strokePoly(pts, col, a, 2.5);
  txt(s, x, y + h * 0.72, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a });
}
/* the five bracketings of beta alpha beta alpha */
const PENT5 = [
  { t: [[['b', 'a'], 'b'], 'a'], A: [1, 2, 3] },
  { t: [['b', ['a', 'b']], 'a'], A: [2, 1, 3] },
  { t: [['b', 'a'], ['b', 'a']], A: [1, 4, 1] },
  { t: ['b', [['a', 'b'], 'a']], A: [3, 1, 2] },
  { t: ['b', ['a', ['b', 'a']]], A: [3, 2, 1] }
];
const PHULL = [2, 4, 3, 1, 0];
/* plane A1+A2+A3 = 6, drawn wide: x along (1,-2,1)/sqrt6, y along (1,0,-1)/sqrt2 */
const pentXY = (A, cx, cy, s) => [cx + s * (A[0] - 2 * A[1] + A[2]) / Math.sqrt(6), cy + s * (A[0] - A[2]) / Math.sqrt(2)];
function pentTrees(cx, cy, R, rot, a, o = {}) {
  if (a <= 0) return;
  const pts = ringPts(cx, cy, R, 5, rot);
  strokePoly(pts, C.gold, a * 0.7, 2.5);
  pts.forEach((p, i) => { const e = PENT5[PHULL[i]]; drawT(e.t, p[0], p[1] + 22, o.w || 90, o.dy || 22, a, { r: o.r || 8, ls: o.ls || 13, lw: 2, hlN: q => (q.h === htT(e.t) && e.A[1] === 4 ? 'g' : null) }); });
}
const BITS = [[4, '5', 3], [8, '429', 9], [13, '208012', 18], [21, '6564120420', 33]];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2), dim = 1 - 0.6 * P(S, 0, 3.6, 1.5);
  pyrTrue(470, 520, 300, t * 0.25, s0 * dim, { r: 18, ls: 22, fill: 0.08 });
  txt('records of which patterns occur', 470, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  const g = P(S, 0, 7.7, 2.5);
  drawT(TN(5), 1350, 640, 620, 85, g, { r: 15, ls: 22, hlN: p => (p.h >= 4 - 4 * (1 - g) ? null : null) });
  txt('how the source was built', 1350, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: g });
  [['CO-OCCURRENCE · F[1,3]', C.gold], ['ORDER · αβ ≠ βα', C.cyan], ['ANCESTRY · ((a,b),c) ≠ (a,(b,c))', C.mag]].forEach(([s, col], i) => chip(370 + i * 590, 800, i === 2 ? 600 : 470, 54, s, col, P(S, 1, [2.3, 3.9, 5.5][i]), 22));
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pentTrees(W / 2, 450, 210, -Math.PI / 2 + t * 0.12, rp, { w: 110, dy: 26 });
  txt(scramble('AURIC FIB ATOM PYRAMID VIII', rp, 371), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 VIII · 从 共 同 出 现 到 共 同 祖 先', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 037 · AURIC_FIB_ATOM_COMMON_ANCESTRY_AND_OBSERVATION_BOUNDARY', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 RELATIONS ---- */
SCENES.relations = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const xs = [360, 960, 1560];
  [['CO-OCCURRENCE', C.gold, 0], ['ORDER', C.cyan, 3.3], ['ANCESTRY', C.mag, 6.5]].forEach(([s, col, off], i) => {
    const q = P(S, 0, off); if (q <= 0) return;
    box(xs[i] - 250, 220, 500, 430, col, q, 2, 'rgba(0,0,0,0.45)');
    txt(s, xs[i], 262, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q, ls: 3 });
  });
  /* co-occurrence: positions 1 and 3 */
  const q1 = P(S, 0, 0.3);
  [-120, 0, 120].forEach((dx, k) => { if (k === 1) ring(xs[0] + dx, 430, 14, C.dim, q1, 2); else dot(xs[0] + dx, 430, 26, 'g', q1); txt(String(k + 1), xs[0] + dx, 490, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q1 }); });
  line(xs[0] - 160, 430, xs[0] + 160, 430, C.gold, q1 * 0.35, 2);
  eqn('F[1,3]', xs[0], 580, q1, C.gold, 30);
  /* order */
  const q2 = P(S, 0, 3.6);
  [['a', 'b'], ['b', 'a']].forEach((w, r) => { w.forEach((c, k) => { dot(xs[1] - 70 + k * 140, 380 + r * 150, 24, GD[c], q2); txt(GL[c], xs[1] - 70 + k * 140, 380 + r * 150 + 58, { size: 26, fam: F.mono, w: 700, align: 'center', c: GC[c], a: q2 }); }); arrow(xs[1] - 40, 380 + r * 150, xs[1] + 40, 380 + r * 150, C.white, q2 * 0.7, 2); });
  eqn('≠', xs[1], 475, q2, C.red, 34);
  /* ancestry */
  const q3 = P(S, 0, 6.8), abc = p => 'abc'[p.lo], cc = p => [C.gold, C.cyan, C.mag][p.lo], cd = p => ['g', 'c', 'm'][p.lo];
  drawT([['a', 'a'], 'a'], xs[2] - 115, 470, 150, 60, q3, { r: 13, lc: cd, labf: abc, labc: cc });
  drawT(['a', ['a', 'a']], xs[2] + 115, 470, 150, 60, q3, { r: 13, lc: cd, labf: abc, labc: cc });
  eqn('≠', xs[2], 420, q3, C.red, 34);
  txt('which parts joined first', xs[2], 590, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 10.5) });
  const l = P(S, 1, 0.3);
  chip(xs[0], 730, 420, 52, 'κ = E[xy] restores it ✓', C.green, l, 22);
  chip(xs[2], 730, 420, 52, 'κ does not restore it ✗', C.red, P(S, 1, 3.3), 22);
};

/* ---- 03 DEPTH ---- */
SCENES.depth = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 3.5, 'lean']]);
  const s0 = clamp(u);
  txt('ρ :', 170, 300, { size: 34, fam: F.mono, w: 700, c: C.gold, a: s0 });
  const r1 = P(S, 0, 3.0), r2 = P(S, 0, 5.9), r3 = P(S, 0, 8.2);
  dot(300, 290, 18, 'c', r1); txt('α', 300, 340, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: r1 }); arrow(340, 290, 430, 290, C.gold, r1, 3); dot(470, 290, 18, 'm', r1); txt('β', 470, 340, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: r1 });
  dot(300, 420, 18, 'm', r2); txt('β', 300, 470, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: r2 }); arrow(340, 420, 430, 420, C.gold, r2, 3); drawT(['b', 'a'], 530, 440, 90, 50, r2, { r: 15 });
  eqn('⟨s,t⟩ ↦ ⟨ρs, ρt⟩', 420, 560, r3, C.white, 28);
  /* the ray */
  const cx = [960, 1060, 1170, 1310, 1495, 1730], ww = [0, 0, 50, 90, 150, 220], q0 = clamp(u / 1.5);
  for (let n = 0; n <= 5; n++) {
    const q = q0 * clamp((u - 0.4 - n * 0.35) / 0.5);
    drawT(TN(n), cx[n], 600, ww[n], 34, q, { r: 10, ls: 15, lw: 2 });
    txt('T' + n, cx[n], 690, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt(String([1, 1, 2, 3, 5, 8][n]), cx[n], 722, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
    txt('ν=' + n, cx[n], 760, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 1 + n * 0.25) });
  }
  txt('leaves', 860, 722, { size: 16, fam: F.mono, align: 'right', c: C.gold, a: q0 });
  txt('T_n = ρⁿα · the ray', 1340, 260, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q0 });
  const back = P(S, 1, 0.5); if (back > 0) { arrow(1700, 800, 980, 800, C.green, back * 0.8, 2.5); txt('ν(t) = how many times ρ can be undone', 1340, 840, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: back }); }
  const l = P(S, 1, 3.7);
  if (l > 0) {
    box(130, 640, 640, 220, C.green, l, 2, 'rgba(0,30,15,0.6)');
    txt('LEAN · GenealogicalFiberTransport.result', 450, 675, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.green, a: l });
    txt('ρ is one-to-one on each (a,b) class', 450, 720, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
    txt('#trees(a,b) = Catalan(a+b−1) · C(a+b, a)', 450, 770, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 7.2) });
    txt('(2,2):  5 · 6 = 30', 450, 820, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 10.5) });
  }
};

/* ---- 04 PAIRING ---- */
SCENES.pairing = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('T_n = ρⁿα', 420, 240, s0, C.cyan, 28);
  eqn('e(t) = 1  ⇔  t = T_ν(t)', 960, 240, P(S, 0, 3.9), C.gold, 28);
  eqn('Q = (ν, e)', 1500, 240, P(S, 0, 5.5), C.white, 28);
  eqn('Q(s) = (a,e)   Q(t) = (b,f)', 960, 320, P(S, 0, 6.8), C.dim, 24);
  eqn('Q(⟨s,t⟩) = (min(a,b), 0)', 960, 375, P(S, 0, 7.5), C.orange, 28);
  eqn('Q(⟨s,t⟩) = (b+2, 1)   if e = f = 1 and a = b+1', 960, 430, P(S, 1, 0.3), C.green, 28);
  const ex1 = P(S, 0, 8.5), ex2 = P(S, 1, 1.5);
  const pc = p => (p.path.startsWith('L') ? C.gold : p.path.startsWith('R') ? C.cyan : null);
  const pcR = p => (p.path.startsWith('R') ? C.gold : p.path.startsWith('L') ? C.cyan : null);
  drawT([TN(3), TN(2)], 560, 740, 380, 55, ex2, { r: 13, ls: 18, hlE: (p, q) => pc(q) });
  drawT([TN(2), TN(3)], 1360, 740, 380, 55, ex1, { r: 13, ls: 18, hlE: (p, q) => pcR(q) });
  txt('⟨T3, T2⟩ = T4', 560, 525, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: ex2 });
  txt('Q = (4, 1) · on the ray', 560, 560, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 4.7) });
  txt('⟨T2, T3⟩', 1360, 525, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: ex1 });
  txt('Q = (2, 0) · off the ray', 1360, 560, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.orange, a: ex1 });
  chip(960, 860, 700, 50, 'two depths are not enough · keep the ray flag', C.gold, P(S, 1, 7.8), 22);
};

/* ---- 05 CORNER ---- */
SCENES.corner = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const cols = [['F[1] · low', 'L', 'a', '(0,1)', '(3j, 1)'], ['F[2] · middle', 'T', 'b', '(1,1)', '(3j+1, 1)'], ['F[3] · high', 'R', ['b', 'a'], '(2,1)', '(3j+2, 1)'], ['F[1,3] · joint', 'J', [['b', 'a'], 'a'], '(0,0)', '(3j, 0)']];
  const xs = [300, 720, 1140, 1600];
  cols.forEach(([h, k, tr, q0, qj], i) => {
    const q = P(S, 0, [0.4, 1.3, 2.2, 4.7][i]);
    txt(h, xs[i], 235, { size: 22, fam: F.mono, w: 700, align: 'center', c: NC[k], a: q });
    drawT(tr, xs[i], 390, isLf(tr) ? 0 : nLv(tr) * 45, 45, q, { r: 15, ls: 20 });
    txt('Q = ' + q0, xs[i], 475, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt(qj, xs[i], 510, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 7.5) });
  });
  txt('window j = 0', 120, 300, { size: 18, fam: F.mono, align: 'left', c: C.dim, a: P(S, 0, 0.5) });
  const l = P(S, 1, 0.3), lo = P(S, 1, 2.5), jo = P(S, 1, 4.0);
  eqn('C[z] = ⟨T₃ⱼ₊₁, z⟩', 960, 590, l, C.gold, 26);
  const hm = p => (p.path === 'L' ? 'g' : null);
  drawT(['b', 'a'], 560, 790, 90, 60, l, { r: 15, ls: 20, lc: p => (p.path === 'L' ? 'g' : GD[p.leaf]) });
  drawT(['b', [['b', 'a'], 'a']], 1360, 790, 220, 55, l, { r: 15, ls: 20, lc: p => (p.path === 'L' ? 'g' : GD[p.leaf]), hlN: hm });
  txt('C[low] = T2', 760, 700, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.cyan, a: l });
  txt('ν = 2 = 3j+2', 760, 740, { size: 24, fam: F.mono, w: 700, align: 'left', c: C.green, a: lo });
  txt('C[joint]', 1560, 700, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.green, a: l });
  txt('ν = 0 = 3j', 1560, 740, { size: 24, fam: F.mono, w: 700, align: 'left', c: C.orange, a: jo });
  chip(960, 870, 640, 50, 'ray flag: one bit · not κ', C.gold, P(S, 1, 6.5), 22);
};

/* ---- 06 LEAF WORD ---- */
SCENES.leafword = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 12.1, 'lean']]);
  const s0 = clamp(u), tL = [[['b', 'a'], 'b'], 'a'], tB = [['b', 'a'], ['b', 'a']];
  const LtL = drawT(tL, 400, 400, 330, 55, s0, { r: 14, ls: 20 });
  const LtB = drawT(tB, 1520, 400, 330, 55, s0, { r: 14, ls: 20 });
  const wq = P(S, 0, 2.4);
  [[LtL, 400], [LtB, 1520]].forEach(([Lt, cx]) => {
    Lt.nodes.filter(p => p.leaf).forEach((p, i) => dashed(p.x, p.y + 40, cx - 120 + i * 80, 470, C.dim, wq * 0.6, 1.5));
    'baba'.split('').forEach((c, i) => { box(cx - 150 + i * 80, 470, 60, 50, GC[c], wq, 2, 'rgba(0,0,0,0.5)'); txt(GL[c], cx - 120 + i * 80, 505, { size: 26, fam: F.mono, w: 700, align: 'center', c: GC[c], a: wq }); });
  });
  eqn('w(⟨s,t⟩) = w(s) w(t)', 960, 250, wq, C.white, 24);
  eqn('⋆ associative', 960, 320, P(S, 0, 5.3), C.gold, 24);
  eqn('⇒ E(s) = E(t)', 960, 360, P(S, 0, 7.6), C.gold, 24);
  const l = P(S, 1, 0.3);
  /* lattice path b a b a : b = up, a = right */
  const pq = P(S, 1, 4.0), ox = 890, oy = 530, cs = 65;
  if (pq > 0) { for (let i = 0; i <= 2; i++) { line(ox + i * cs, oy, ox + i * cs, oy - 2 * cs, C.dim, pq * 0.4, 1); line(ox, oy - i * cs, ox + 2 * cs, oy - i * cs, C.dim, pq * 0.4, 1); } strokePoly([[ox, oy], [ox, oy - cs], [ox + cs, oy - cs], [ox + cs, oy - 2 * cs], [ox + 2 * cs, oy - 2 * cs]], C.gold, pq, 4, false); txt('same path', ox + cs, oy + 34, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: pq }); }
  chip(400, 600, 300, 50, 'ν = 0', C.orange, P(S, 1, 10.2), 26);
  chip(1520, 600, 300, 50, 'ν = 2', C.green, P(S, 1, 10.9), 26);
  chip(960, 640, 480, 48, 'G = (2, 2, −2, 2, −2)', C.white, P(S, 1, 5.2), 22);
  chip(960, 700, 640, 48, 'U = (−iY)(−iX)(−iY)(−iX) = −I', C.cyan, P(S, 1, 7.6), 22);
  const lq = P(S, 1, 12.3);
  if (lq > 0) {
    box(330, 750, 1260, 120, C.green, lq, 2, 'rgba(0,30,15,0.6)');
    txt('LEAN · CliffordLeafOrbit.result', 960, 780, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.green, a: lq });
    drawT([['a', 'a'], 'a'], 560, 850, 80, 26, lq, { r: 9, ls: 13, lw: 2 });
    drawT(['a', ['a', 'a']], 760, 850, 80, 26, lq, { r: 9, ls: 13, lw: 2 });
    txt('p ≠ q · same word ααα · E(p) = E(q)', 1180, 840, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 14.3) });
  }
};

/* ---- 07 RECTANGLES ---- */
SCENES.rect = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), T4 = TN(4), gp = p => clamp((u - lineAt(S, 0).s - 2 - p.gap * 0.9) / 0.6);
  const pair = P(S, 1, 0.3), pulse = 0.6 + 0.4 * Math.sin(t * 5);
  const onPath = q => pair > 0 && ((q.lo <= 1 && q.hi >= 1) || (q.lo <= 4 && q.hi >= 4));
  const Lt = drawT(T4, 520, 650, 600, 80, s0, { r: 16, ls: 22, hlN: p => (gp(p) > 0.5 ? ['c', 'g', 'm', 'n'][p.gap] : null), hlE: (p, q) => (onPath(q) ? C.white : null) });
  const gq = P(S, 0, 2);
  for (let g = 0; g < 4; g++) { const x = Lt.lx(g + 0.5); dashed(x, 600, x, 700, GPAL[g], gq * 0.7, 2); txt('A' + (g + 1), x, 740, { size: 22, fam: F.mono, w: 700, align: 'center', c: GPAL[g], a: gq }); txt(String(areasT(T4)[g]), x, 780, { size: 26, fam: F.mono, w: 700, align: 'center', c: GPAL[g], a: P(S, 0, 10.9 + g * 0.4) }); }
  const pg = pairGrid(T4, 1180, 260, 105, s0, { prog: gp, axes: true, axs: 22 });
  if (pair > 0 && pg) { const [cx, cy] = pg.cell(1, 4); box(cx + 4, cy + 4, 97, 97, C.white, pair * pulse, 4); }
  txt('left leaves × right leaves', 1390, 760, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 6.8) });
  eqn('A_i = ℓ_i · r_i', 1390, 805, P(S, 0, 10.9), C.gold, 28);
  eqn('Σ A_i = 1 + 2 + 6 + 1 = 10 = C(5,2)', 760, 870, P(S, 1, 4.9), C.green, 26);
};

/* ---- 08 RECOVER ---- */
SCENES.recover = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), wd = 'babba', A4 = [1, 2, 6, 1], X = i => 220 + i * 160;
  eqn('Σ_{a ≤ i < b} A_i ≥ C(k, 2)', 540, 225, s0, C.white, 26);
  wd.split('').forEach((c, i) => { dot(X(i), 300, 18, GD[c], s0); txt(GL[c], X(i), 345, { size: 22, fam: F.mono, w: 700, align: 'center', c: GC[c], a: s0 }); });
  A4.forEach((v, g) => txt(String(v), (X(g) + X(g + 1)) / 2, 308, { size: 26, fam: F.mono, w: 700, align: 'center', c: GPAL[g], a: s0 }));
  const runs = [[0, 1, 1, 1, 1], [1, 2, 2, 1, 0], [0, 2, 3, 3, 1], [2, 3, 6, 1, 0], [3, 4, 1, 1, 1], [0, 4, 10, 10, 1]];
  runs.forEach(([i, k, s, c, ok], r) => {
    const q = P(S, 0, 2.5 + r * 1.2), y = 400 + r * 68; if (q <= 0) return;
    const col = ok ? C.green : C.red;
    line(X(i), y, X(k), y, col, q, 5); line(X(i), y - 12, X(i), y + 12, col, q, 3); line(X(k), y - 12, X(k), y + 12, col, q, 3);
    txt(s + (ok ? ' = ' : ' > ') + c + (ok ? '  subtree ✓' : '  ✗'), 900, y + 8, { size: 22, fam: F.mono, w: 700, align: 'left', c: col, a: q });
  });
  /* rebuild */
  const l = P(S, 1, 0.3), bx = i => 1250 + i * 130;
  const nest = [[0, 1, 0], [0, 2, 1], [3, 4, 0], [0, 4, 2]];
  nest.forEach(([i, k, lev], r) => { const q = l * clamp((u - lineAt(S, 1).s - 0.3 - r * 0.6) / 0.5); const y = 800 - lev * 34 - 20; line(bx(i) - 16, y, bx(k) + 16, y, C.green, q, 4); });
  wd.split('').forEach((c, i) => { dot(bx(i), 820, 13, GD[c], l); });
  const rb = P(S, 1, 2.5, 1.2);
  drawT(TN(4), 1510, 640, 520, 75, rb, { r: 14, ls: 18, lab: false });
  txt('(w, A) → the whole tree', 1510, 330, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: rb });
  chip(960, 880, 680, 48, 'a new readout · it depends on ancestry', C.orange, P(S, 1, 5.8), 22);
};

/* ---- 09 PENTAGON ---- */
SCENES.pentagon = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 0, 'classical'], [1, 4, 'theory']]);
  const cx = 960, cy = 520, s = 150;
  const V = PENT5.map(e => pentXY(e.A, cx, cy, s));
  const TP = [[960, 255], [1430, 440], [470, 470], [1430, 690], [960, 815]];
  const TPx = { 0: [740, 300], 1: [1400, 380], 2: [380, 520], 3: [1400, 660], 4: [740, 745] };
  const order = [0, 1, 2, 3, 4], hullA = P(S, 1, 0.3), bal = P(S, 1, 4);
  if (hullA > 0) { const hp = PHULL.map(i => V[i]); fillPoly(hp, C.gold, hullA * 0.1); strokePoly(hp, C.gold, hullA, 3.5); }
  order.forEach(i => {
    const e = PENT5[i], q = P(S, 0, [3.6, 4.6, 5.6, 6.5, 7.5][i]); if (q <= 0) return;
    const [vx, vy] = V[i], [tx, ty] = TPx[i];
    dashed(vx, vy, tx, ty - 30, C.dim, q * 0.5, 1.5);
    const isB = e.A[1] === 4;
    dot(vx, vy, 16, isB && bal > 0 ? 'g' : 'w', q);
    drawT(e.t, tx, ty, 130, 26, q, { r: 9, ls: 14, lw: 2 });
    txt('(' + e.A.join(',') + ')', tx - 8, ty + 58, { size: 22, fam: F.mono, w: 700, align: 'right', c: isB ? C.gold : C.white, a: q });
    txt('ν = ' + (isB ? 2 : 0), tx + 8, ty + 58, { size: 20, fam: F.mono, w: 700, align: 'left', c: isB ? C.green : C.dim, a: q * bal });
  });
  eqn('A₁ + A₂ + A₃ = 6', cx, cy + 8, P(S, 0, 8.9), C.gold, 24);
  txt('associahedron K₄', cx, cy + 50, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: hullA });
  chip(480, 885, 560, 48, 'Catalan: 1 1 2 5 14 42 132', C.cyan, P(S, 1, 7.9), 22);
  chip(1440, 885, 560, 48, 'legal patterns: 1 + 3 + 1 = 5', C.mag, P(S, 1, 11.2), 22);
};

/* ---- 10 ROTATION ---- */
SCENES.rotation = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  /* schematic */
  const tri = (x, y, s, col) => triT(x, y, 110, 95, s, col, s0);
  line(520, 220, 420, 290, C.cyan, s0, 3); line(520, 220, 680, 330, C.cyan, s0, 3); line(420, 290, 330, 340, C.cyan, s0, 3); line(420, 290, 510, 340, C.cyan, s0, 3);
  dot(520, 220, 9, 'w', s0); dot(420, 290, 9, 'w', s0);
  tri(330, 340, 's · a', C.cyan); tri(510, 340, 't · b', C.gold); tri(680, 330, 'u · c', C.mag);
  arrow(820, 300, 1100, 300, C.white, P(S, 0, 1.5), 3); txt('rotation', 960, 280, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1.5) });
  const r2 = P(S, 0, 2.3), tri2 = (x, y, s, col) => triT(x, y, 110, 95, s, col, r2);
  line(1400, 220, 1240, 330, C.cyan, r2, 3); line(1400, 220, 1500, 290, C.cyan, r2, 3); line(1500, 290, 1410, 340, C.cyan, r2, 3); line(1500, 290, 1590, 340, C.cyan, r2, 3);
  dot(1400, 220, 9, 'w', r2); dot(1500, 290, 9, 'w', r2);
  tri2(1240, 330, 's · a', C.cyan); tri2(1410, 340, 't · b', C.gold); tri2(1590, 340, 'u · c', C.mag);
  /* concrete grids: a = 2, b = 1, c = 2 */
  const g = P(S, 0, 4.2), before = [[['a', 'b'], 'a'], ['b', 'a']], after = [['a', 'b'], ['a', ['b', 'a']]];
  const blk = P(S, 1, 0.3), pulse = 0.55 + 0.45 * Math.sin(t * 5);
  const col = p => GPAL[p.gap % GPAL.length];
  pairGrid(before, 330, 520, 62, g, { col, nmax: 24 });
  pairGrid(after, 1340, 520, 62, g, { col, nmax: 24 });
  if (blk > 0) { box(330 + 2 * 62, 520, 124, 124, C.red, blk * pulse, 5); box(1340 + 2 * 62, 520, 124, 124, C.red, blk * pulse, 5); }
  txt('a=2  b=1  c=2', 960, 520, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: g });
  eqn('A: (1, 2, 6, 1) → (1, 6, 2, 1)', 960, 600, P(S, 0, 7.5), C.white, 24);
  eqn('ΔA = ac (e_i − e_j)', 960, 660, P(S, 0, 9.4), C.gold, 30);
  eqn('= 4 (e₂ − e₃)', 960, 712, P(S, 0, 10.5), C.gold, 26);
  txt('b never enters', 960, 770, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3.7) });
  chip(960, 860, 620, 50, 'Σ = 10 conserved · ancestry moves', C.green, P(S, 1, 8.3), 22);
};

/* ---- 11 UNSTABLE ---- */
SCENES.unstable = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), hl = P(S, 0, 5.8), pulse = 0.6 + 0.4 * Math.sin(t * 5);
  const hlE = (p, q) => (hl > 0 && q.path.startsWith('LLLL') && q.path.length > 4 ? C.red : null);
  drawT(TN(7), 560, 470, 740, 38, s0, { r: 7, lab: false, lw: 2, hlE, hlN: p => (hl > 0 && p.path === 'LLLL' ? 'r' : null) });
  drawT(UN(7), 1380, 470, 740, 38, P(S, 0, 1.8), { r: 7, lab: false, lw: 2, hlE, hlN: p => (hl > 0 && p.path === 'LLLL' ? 'r' : null) });
  if (hl > 0) { ring(560 - 370 + 37, 455, 60, C.red, hl * pulse, 2.5); ring(1380 - 370 + 37, 455, 60, C.red, hl * pulse, 2.5); }
  txt('T7', 560, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  txt('U7', 1380, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1.8) });
  txt('same leaf word · 21 leaves', 960, 205, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) });
  txt('ν = 7', 760, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 9.3) });
  txt('ν = 0', 1580, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 0, 10.5) });
  /* chart */
  const c = P(S, 1, 3.4), x0 = 220, xw = 72, yb = 860;
  if (c > 0) {
    line(x0 - 20, yb, x0 + 11 * xw, yb, C.dim, c, 1.5);
    const F_ = [0, 1]; for (let i = 0; i < 20; i++) F_.push(F_[F_.length - 1] + F_[F_.length - 2]);
    const pts = [];
    for (let n = 3; n <= 13; n++) {
      const q = c * clamp((u - lineAt(S, 1).s - 3.4 - (n - 3) * 0.3) / 0.4), x = x0 + (n - 3) * xw;
      fillBox(x + 8, yb - n * 16, xw - 16, n * 16, C.green, q * 0.7);
      const m = F_[n + 1], g = 2 / (m * (m - 1)), y = 600 + (-Math.log10(g)) * 50;
      pts.push([x + xw / 2, y]); dot(x + xw / 2, y, 9, 'o', q);
      txt(String(n), x + xw / 2, yb + 24, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
    }
    strokePoly(pts, C.orange, c * 0.8, 2.5, false);
    txt('depth gap n', x0, 590, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.green, a: c });
    txt('normalised area gap (log)', x0 + 300, 590, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.orange, a: c });
  }
  eqn('ΔA = e₁ − e₂ · ‖ΔA‖₂ = √2', 1480, 620, P(S, 1, 0.3), C.white, 24);
  eqn('n = 13 · 377 leaves', 1480, 690, P(S, 1, 6.5), C.white, 26);
  eqn('‖ΔA / C(m,2)‖∞ = 1/70876', 1480, 760, P(S, 1, 10.7), C.orange, 28);
  eqn('|Δν| = 13', 1480, 835, P(S, 1, 14.7), C.green, 34);
};

/* ---- 12 ADAPTIVE ---- */
SCENES.adaptive = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  drawT(TN(5), 260, 340, 230, 22, s0, { r: 7, lab: false, lw: 2 });
  drawT(UN(5), 260, 520, 230, 22, s0, { r: 7, lab: false, lw: 2 });
  txt('T_n', 110, 300, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: s0 });
  txt('U_n', 110, 480, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.orange, a: s0 });
  const b = P(S, 0, 1.5);
  box(520, 300, 400, 230, C.cyan, b, 2, 'rgba(0,20,40,0.6)');
  txt('LEAF-WORD INTERFACE', 720, 345, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: b, ls: 2 });
  ['adaptive choices', 'ρ · pairing', 'any f(w)'].forEach((s, i) => txt(s, 720, 395 + i * 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: b }));
  arrow(390, 330, 515, 380, C.green, b, 2.5); arrow(390, 510, 515, 460, C.orange, b, 2.5);
  const r = P(S, 0, 4.4);
  [350, 480].forEach((y, k) => { arrow(925, 415, 1000, y, C.white, r * 0.6, 2); for (let i = 0; i < 16; i++) { const v = rnd(i + Math.floor(t * 2) * 16, 3), q = r * clamp((u - lineAt(S, 0).s - 4.4 - i * 0.1) / 0.3); fillBox(1010 + i * 30, y - 20, 24, 40, v > 0.5 ? C.gold : C.vio, q * 0.8); } });
  txt('= same law', 1520, 425, { size: 24, fam: F.mono, w: 700, align: 'left', c: C.gold, a: P(S, 0, 6.2) });
  /* estimator */
  const e = P(S, 0, 7.9), lx0 = 500, lx1 = 1400, ly = 640;
  if (e > 0) {
    line(lx0, ly, lx1, ly, C.dim, e, 2); dot(lx0, ly, 12, 'o', e); dot(lx1, ly, 12, 'n', e);
    txt('0 = ν(U_n)', lx0, ly + 40, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.orange, a: e }); txt('n = ν(T_n)', lx1, ly + 40, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: e });
    const z = lerp(lx0, lx1, 0.5 + 0.3 * Math.sin(t * 1.3));
    line(lx0, ly - 14, z, ly - 14, C.orange, e, 4); line(z, ly - 26, lx1, ly - 26, C.green, e, 4); dot(z, ly, 14, 'w', e); txt('ν̂', z, ly - 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: e });
    eqn('|ν̂ − n| + |ν̂| ≥ n  ⇒  max E|ν̂ − ν| ≥ n/2', 950, 740, P(S, 0, 9.5), C.white, 24);
  }
  chip(1640, 560, 420, 48, 'same kind ✗ · change kind', C.red, P(S, 1, 0.3), 20);
  BITS.forEach(([m, c, bt], i) => chip(300 + i * 440, 850, 420, 48, m + ' leaves: ' + c + ' → ' + bt + ' bits', C.gold, P(S, 1, 7.3 + i * 0.7), 20));
  eqn('⌈log₂ C_m⌉', 1640, 760, P(S, 1, 4.5), C.gold, 26);
};

/* ---- 13 CHARACTERS ---- */
SCENES.characters = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 0, 'classical'], [1, 7.4, 'theory']]);
  const s0 = clamp(u), v = v3(500, 520, 240, t * 0.35 + 0.6, 0.45, [0.5, 0.5, 0.5]);
  const V = []; for (let m = 0; m < 8; m++) V.push([(m >> 2) & 1, (m >> 1) & 1, m & 1]);
  const even = b => (b[0] + b[1] + b[2]) % 2 === 0;
  const Pp = V.map(b => v(b[0], b[1], b[2]));
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = V[i].reduce((s, x, k) => s + Math.abs(x - V[j][k]), 0); if (d === 1) line(Pp[i][0], Pp[i][1], Pp[j][0], Pp[j][1], C.cyan, s0 * 0.45, 2); }
  const tq = P(S, 0, 11.5);
  const E = [0, 3, 5, 6];
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(Pp[E[i]][0], Pp[E[i]][1], Pp[E[j]][0], Pp[E[j]][1], C.green, tq, 3.5);
  V.forEach((b, i) => { const q = even(b) ? P(S, 0, [2.0, 4.3, 5.3, 6.3][E.indexOf(i)]) : s0; if (even(b)) { dot(Pp[i][0], Pp[i][1], 18, 'n', q); txt(b.join(''), Pp[i][0], Pp[i][1] - 26, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: q }); } else ring(Pp[i][0], Pp[i][1], 9, C.dim, s0, 2); });
  txt('x + y + z ≡ 0 (mod 2)', 500, 840, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: tq });
  /* character means */
  const K = ['100', '010', '001', '110', '101', '011', '111'], bx = 1080, yb = 640;
  K.forEach((k, i) => {
    const third = i === 6, q = third ? P(S, 1, 0.3) : P(S, 0, 7.6 + (i < 3 ? 0 : 1.4)), x = bx + i * 100, h = third ? 220 * eo(q) : 4;
    fillBox(x - 30, yb - h, 60, h, third ? C.gold : C.cyan, q * 0.85);
    txt(k, x, yb + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: third ? C.gold : C.cyan, a: q });
    txt(third ? '1' : '0', x, yb - h - 14, { size: 24, fam: F.mono, w: 700, align: 'center', c: third ? C.gold : C.white, a: q });
  });
  txt('mean of χ_k', 1380, 330, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 7.6) });
  txt('1 bit · 2 bits: uniform', 1230, 700, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 9) });
  eqn('μ uniform ⇔ μ̂(k) = 0 for all k ≠ 0', 1380, 260, P(S, 1, 2.7), C.white, 24);
  chip(1380, 780, 760, 46, 'coordinates encoded · higher order reads them ✓', C.green, P(S, 1, 7.6), 20);
  chip(1380, 850, 760, 46, 'brackets deleted · no character of w helps ✗', C.red, P(S, 1, 10.3), 20);
};

/* ---- 14 TASK ---- */
SCENES.task = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  chip(960, 225, 720, 48, '(w, ν) closes under ρ and pairing', C.green, P(S, 0, 1.8), 22);
  eqn('M = [[0,1],[1,1]]', 300, 330, P(S, 0, 4), C.gold, 24);
  eqn('T5: c = (3, 5)', 300, 380, P(S, 0, 5.5), C.white, 22);
  const st = [[3, 5], [2, 3], [1, 2], [1, 1], [0, 1], [1, 0]];
  st.forEach(([a, b], i) => { const q = P(S, 0, 6.6 + i * 1.0), x = 680 + i * 220; if (i) arrow(x - 160, 360, x - 60, 360, C.dim, q, 2); chip(x, 360, 130, 48, '(' + a + ',' + b + ')', i === 5 ? C.green : C.white, q, 22); if (i) txt('M⁻¹', x - 110, 340, { size: 14, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); });
  eqn('e(t) = 1  ⇔  M^(−ν) c(t) = (1, 0)', 1120, 450, P(S, 0, 11.5), C.green, 26);
  const l = P(S, 1, 2.1), q8 = P(S, 1, 7.4);
  drawT([['a', 'a'], 'a'], 560, 780, 220, 75, l, { r: 15, ls: 20, hlE: (p, q) => (q8 > 0 && q.path === 'L' ? C.gold : null), hlN: p => (q8 > 0 && p.path === 'L' ? 'g' : null) });
  drawT(['a', ['a', 'a']], 1360, 780, 220, 75, l, { r: 15, ls: 20, hlE: (p, q) => (q8 > 0 && q.path === 'L' ? C.gold : null), lc: p => (q8 > 0 && p.path === 'L' ? 'g' : 'c') });
  txt('ααα · ν = 0', 960, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 5.6) });
  txt('query L → pair', 560, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q8 });
  txt('query L → α', 1360, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q8 });
  chip(960, 880, 560, 48, 'the task decides the boundary', C.orange, P(S, 1, 11.1), 22);
};

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['UNREAD', 'read higher order', C.gold], ['MERGED', 'change the readout', C.mag], ['EXACT ≠ STABLE', 'check it · pay for it', C.cyan]];
    items.forEach(([a1, a2, col], i) => { const x = 420 + i * 540, q = P(S, 0, [0.3, 4.9, 9.5][i]) * fade; box(x - 240, 250, 480, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 315, { size: 32, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 365, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    txt('LEAN · tree count · one-to-one ρ · Clifford instance', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.5) * fade });
    txt('VOLUMES · depth law · ancestor areas · depth gap', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 5.6) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 10.4) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pentTrees(W / 2, 380, 200, -Math.PI / 2 + t * 0.12, a, { w: 100, dy: 24 });
    txt('AURIC FIB ATOM PYRAMID VIII', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 VIII · 从共同出现到共同祖先 · TRURETURING FILM 037', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Same leaves, same word. Different ancestors.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'THREE RELATIONS', relations: 'CO-OCCURRENCE · ORDER · ANCESTRY', depth: 'INTRINSIC DEPTH', pairing: 'PAIRING LAW', corner: 'THE JOINT CORNER', leafword: 'LEAF WORDS', rect: 'ANCESTOR RECTANGLES', recover: 'RECOVERING BRACKETS', pentagon: 'THE PENTAGON', rotation: 'LOCAL ROTATION', unstable: 'EXACT IS NOT STABLE', adaptive: 'ADAPTIVE BLINDNESS', characters: 'CHARACTER READOUTS', task: 'TASK BOUNDARY', finale: 'LEDGER' });

function poster37() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const T5 = TN(5);
  drawT(T5, 560, 690, 700, 95, 1, { r: 18, ls: 24, hlN: p => ['c', 'g', 'm', 'n', 'o', 'v', 'c'][p.gap % 7] });
  pairGrid(T5, 1130, 240, 72, 1, { nmax: 30, fa: 0.35 });
  txt('FIB 原子金字塔 VIII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID VIII', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('同 一 个 叶 词 · 不 同 的 共 同 祖 先', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 037', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster37;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
