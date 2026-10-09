/* Film 038 — AURIC FIB ATOM PYRAMID IX · 金字塔 IX：金字塔上的时间箭头 */

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

/* ---- film 038: time arrow helpers ---- */
/* Greek in the mono face reads as Latin (α≈a, ρ≈p, ν≈v); route Greek strings to a face with distinct glyphs */
const FG = '"DejaVu Sans", FreeSans, "Liberation Sans", sans-serif';
const _txt38 = txt;
txt = function (s, x, y, o = {}) { if (o.fam === F.mono && /[αβγδεκλμνξπρστχψωΣΓΔ⟨⟩]/.test(String(s))) o = Object.assign({}, o, { fam: FG }); return _txt38(s, x, y, o); };
/* states s0..s4 = null, low [2], joint [25], high [5], middle [3]; square s0 -> s1 -> s2 -> s3 -> s0 */
const S5 = ['O', 'L', 'J', 'R', 'T'];
const BITS5 = { O: '000', L: '100', J: '101', R: '001', T: '010' };
const NAME5 = { O: '∅', L: 'low', J: 'joint', R: 'high', T: 'middle' };
const PM = [[1 / 2, 1 / 4, 0, 1 / 8, 1 / 8], [1 / 8, 5 / 8, 1 / 4, 0, 0], [0, 1 / 8, 5 / 8, 1 / 4, 0], [1 / 4, 0, 1 / 8, 5 / 8, 0], [1 / 8, 0, 0, 0, 7 / 8]];
function wStep(i, j) { if (i < 4 && j < 4 && i !== j) { if (j === (i + 1) % 4) return 1; if (i === (j + 1) % 4) return -1; } return 0; }
const WALK = (() => { const s = [0]; for (let k = 0; k < 900; k++) { const u = rnd(k, 77), i = s[s.length - 1]; let acc = 0, nx = i; for (let j = 0; j < 5; j++) { acc += PM[i][j]; if (u < acc) { nx = j; break; } } s.push(nx); } return s; })();
const WCUM = (() => { const c = [0]; for (let k = 1; k < WALK.length; k++) c.push(c[k - 1] + wStep(WALK[k - 1], WALK[k])); return c; })();
const WD12 = (() => { let D = new Map(); for (let i = 0; i < 5; i++) D.set(i + ',0', 0.2); for (let n = 0; n < 12; n++) { const E = new Map(); D.forEach((m, key) => { const [i, w] = key.split(',').map(Number); for (let j = 0; j < 5; j++) if (PM[i][j] > 0) { const k2 = j + ',' + (w + wStep(i, j)); E.set(k2, (E.get(k2) || 0) + m * PM[i][j]); } }); D = E; } const out = {}; D.forEach((m, key) => { const w = +key.split(',')[1]; out[w] = (out[w] || 0) + m; }); return out; })();
const FLIPE = [['O', 'L'], ['L', 'J'], ['J', 'R'], ['R', 'O'], ['T', 'O']];
/* pyramid with the single-flip graph highlighted */
function pyrFlip(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return {};
  const m = pyrMap(cx, cy, s, ang, o.tilt == null ? 0.45 : o.tilt), Pp = {};
  Object.keys(PT).forEach(k => { Pp[k] = m(...PT[k]); });
  if (o.fill) fillPoly([Pp.O, Pp.L, Pp.J, Pp.R], C.cyan, a * o.fill);
  PE.forEach(([i, k]) => { const fl = FLIPE.some(([x, y]) => (x === i && y === k) || (x === k && y === i)); if (!fl) dashed(Pp[i][0], Pp[i][1], Pp[k][0], Pp[k][1], C.dim, a * (o.da == null ? 0.35 : o.da), 1.5); });
  FLIPE.forEach(([i, k], e) => { const q = o.ep ? o.ep(e) : 1; if (q > 0) line(Pp[i][0], Pp[i][1], Pp[k][0], Pp[k][1], e === 4 ? C.mag : (o.ec || C.cyan), a * q * (o.ea || 0.85), o.lw || 3); });
  Object.keys(Pp).sort((i, k) => Pp[k][3] - Pp[i][3]).forEach(k => {
    dot(Pp[k][0], Pp[k][1], o.r || 18, ND[k], a);
    if (o.lab !== false) txt(o.labf ? o.labf(k) : NAME5[k], Pp[k][0], Pp[k][1] - (o.r || 18) - 10, { size: o.ls || 22, fam: F.mono, w: 700, align: 'center', c: NC[k], a });
    if (o.bits) txt(BITS5[k], Pp[k][0], Pp[k][1] + (o.r || 18) + 26, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * o.bits });
  });
  return { P: Pp, m };
}
/* an arrow running alongside the segment A->B, shifted sideways by off */
function lane(A, B, off, col, a, lab, w = 3) {
  if (a <= 0) return;
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux, g = Math.min(30, L * 0.2);
  arrow(A[0] + ux * g + nx * off, A[1] + uy * g + ny * off, B[0] - ux * g + nx * off, B[1] - uy * g + ny * off, col, a, w);
  if (lab) txt(lab, (A[0] + B[0]) / 2 + nx * (off + Math.sign(off || 1) * 22), (A[1] + B[1]) / 2 + ny * (off + Math.sign(off || 1) * 22) + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a });
}
/* flat top-down square: O bottom-left, L bottom-right, J top-right, R top-left; middle T left of O */
const SQ = (cx, cy, h) => ({ O: [cx - h, cy + h], L: [cx + h, cy + h], J: [cx + h, cy - h], R: [cx - h, cy - h], T: [cx - h - 1.25 * h, cy + h] });
function sqGraph(cx, cy, h, a, o = {}) {
  if (a <= 0) return SQ(cx, cy, h);
  const Q = SQ(cx, cy, h);
  FLIPE.forEach(([i, k], e) => line(Q[i][0], Q[i][1], Q[k][0], Q[k][1], e === 4 ? C.mag : C.cyan, a * (o.ea || 0.45), 2));
  Object.keys(Q).forEach(k => { dot(Q[k][0], Q[k][1], o.r || 18, ND[k], a); if (o.lab !== false) txt(NAME5[k], Q[k][0] + (o.lx ? o.lx(k) : 0), Q[k][1] + (k === 'R' || k === 'J' ? -(o.r || 18) - 12 : (o.r || 18) + 30), { size: 20, fam: F.mono, w: 700, align: 'center', c: NC[k], a }); });
  return Q;
}
/* walker position on a set of node coordinates at time u (sec), step length dt */
function walker(Pos, u, dt, a, o = {}) {
  if (a <= 0) return 0;
  const k = Math.max(0, Math.floor(u / dt)), f = ease(clamp((u / dt - k) * 1.6)), i = WALK[k % 880], j = WALK[(k % 880) + 1];
  const A = Pos[S5[i]], B = Pos[S5[j]], x = lerp(A[0], B[0], f), y = lerp(A[1], B[1], f);
  for (let t = 1; t <= 10; t++) { const kk = k - t; if (kk < 0) break; const Q = Pos[S5[WALK[kk % 880]]]; dot(Q[0], Q[1], 10, 'g', a * 0.06 * (11 - t)); }
  dot(x, y, o.r || 24, 'g', a); ring(x, y, (o.r || 24) * 1.4, C.gold, a * 0.5, 2);
  return WCUM[(k % 880) + (f > 0.5 ? 1 : 0)] - WCUM[0];
}
function plotAxes(x0, y0, w, h, a, xl, yl) { line(x0, y0, x0 + w, y0, C.dim, a, 1.5); line(x0, y0, x0, y0 - h, C.dim, a, 1.5); if (xl) txt(xl, x0 + w, y0 + 30, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); if (yl) txt(yl, x0, y0 - h - 14, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.dim, a }); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  const R = pyrFlip(500, 590, 300, t * 0.22, s0, { r: 18, ls: 20, fill: 0.06, labf: k => '1/5' });
  if (R.P) walker(R.P, u, 0.55, s0);
  txt('every moment: each pattern 1/5', 500, 235, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 5.3) });
  txt('H(Xₙ) = log 5 · forever', 500, 860, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 8) });
  const l = P(S, 1, 0.3), k0 = Math.floor(u / 0.55);
  [['history ▶', 1, C.gold, 360], ['◀ reversed', -1, C.cyan, 560]].forEach(([s, dir, col, y], r) => {
    const q = r ? P(S, 1, 2.8) : l; if (q <= 0) return;
    txt(s, 1060, y - 40, { size: 22, fam: F.mono, w: 700, align: 'left', c: col, a: q });
    for (let i = 0; i < 18; i++) { const kk = dir > 0 ? k0 - 17 + i : k0 - i; const st = WALK[Math.max(0, kk) % 880]; box(1060 + i * 42, y, 36, 52, NC[S5[st]], q, 1.5, 'rgba(0,0,0,0.5)'); dot(1078 + i * 42, y + 26, 9, ND[S5[st]], q); }
  });
  chip(1440, 720, 640, 54, 'same moments · different history', C.gold, P(S, 1, 6), 24);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const R = pyrFlip(W / 2, 470, 320, t * 0.3, rp, { r: 18, lab: false, fill: 0.08 });
  if (R.P) { const ord = ['O', 'L', 'J', 'R']; for (let i = 0; i < 4; i++) lane(R.P[ord[i]], R.P[ord[(i + 1) % 4]], 14, C.gold, rp * (0.5 + 0.5 * Math.sin(t * 3 - i)), null, 3); walker(R.P, u, 0.45, rp, { r: 18 }); }
  txt(scramble('AURIC FIB ATOM PYRAMID IX', rp, 381), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 IX · 金 字 塔 上 的 时 间 箭 头', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 038 · AURIC_FIB_HISTORY_RECORDS_TIME_ARROW §§122–133', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 GRAPH ---- */
SCENES.graph = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), ep = e => (e < 4 ? P(S, 0, 1.8 + e * 0.6) : P(S, 0, 7.1));
  const R = pyrFlip(760, 560, 440, 0.55 + 0.25 * Math.sin(t * 0.3), s0, { r: 20, ls: 24, bits: P(S, 0, 1), ep, fill: 0.05 });
  const rows = [['∅ – low', '000 · 100'], ['low – joint', '100 · 101'], ['joint – high', '101 · 001'], ['high – ∅', '001 · 000'], ['∅ – middle', '000 · 010']];
  rows.forEach(([a1, a2], e) => { const q = ep(e), y = 300 + e * 70; txt(a1, 1340, y, { size: 22, fam: F.mono, w: 700, align: 'left', c: e === 4 ? C.mag : C.cyan, a: q }); txt(a2, 1580, y, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.dim, a: q }); });
  txt('one bit flips per edge', 1340, 250, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.white, a: P(S, 0, 1.5) });
  txt('middle ↔ low/high/joint: ≥ 2 bits ✗', 1340, 680, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.red, a: P(S, 0, 8.5) });
  chip(1490, 790, 620, 52, 'a declared walk · not the substitution ρ', C.orange, P(S, 1, 0.5), 22);
};

/* ---- 03 CHAIN ---- */
SCENES.chain = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const R = pyrFlip(470, 560, 380, 0.5, s0, { r: 18, ls: 22, fill: 0.05 });
  if (R.P) {
    const ord = ['O', 'L', 'J', 'R'], f = P(S, 0, 1.8), b = P(S, 0, 5.6), br = P(S, 0, 7.5);
    for (let i = 0; i < 4; i++) { lane(R.P[ord[i]], R.P[ord[(i + 1) % 4]], 16, C.gold, f, i === 0 ? 'p' : null); lane(R.P[ord[(i + 1) % 4]], R.P[ord[i]], 16, C.cyan, b, i === 0 ? 'q' : null); }
    lane(R.P.O, R.P.T, 14, C.mag, br, 'r'); lane(R.P.T, R.P.O, 14, C.mag, br, null);
  }
  const M = [['1−p−q−r', 'p', '0', 'q', 'r'], ['q', '1−p−q', 'p', '0', '0'], ['0', 'q', '1−p−q', 'p', '0'], ['p', '0', 'q', '1−p−q', '0'], ['r', '0', '0', '0', '1−r']];
  const mq = P(S, 0, 3, 3), colf = v => (v === 'p' ? C.gold : v === 'q' ? C.cyan : v === 'r' ? C.mag : v === '0' ? C.dim : C.white);
  mgrid(1010, 250, M, 150, 62, mq > 0 ? 1 : 0, { prog: mq, colf, size: 20 });
  ['∅', 'low', 'joint', 'high', 'mid'].forEach((s, i) => { txt(s, 995, 250 + i * 62 + 38, { size: 17, fam: F.mono, w: 700, align: 'right', c: NC[S5[i]], a: mq }); txt(s, 1010 + i * 150 + 75, 238, { size: 17, fam: F.mono, w: 700, align: 'center', c: NC[S5[i]], a: mq }); });
  const l = P(S, 1, 0.3);
  txt('every row = 1 · every column = 1', 1385, 600, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: l });
  const bq = P(S, 1, 2.7);
  if (bq > 0) {
    const x0 = 1080, y0 = 820;
    plotAxes(x0, y0, 620, 170, bq, 'time n', 'Pr(Xₙ = s)');
    for (let n = 0; n < 12; n++) for (let i = 0; i < 5; i++) fillBox(x0 + 10 + n * 51 + i * 8, y0 - 0.2 * 600, 7, 0.2 * 600, NC[S5[i]], bq * 0.75 * clamp((u - lineAt(S, 1).s - 2.7 - n * 0.2) / 0.3));
    txt('1/5', x0 - 12, y0 - 120 + 6, { size: 16, fam: F.mono, w: 700, align: 'right', c: C.dim, a: bq });
  }
  eqn('H(Xₙ) = log 5 for every n', 1385, 880, P(S, 1, 6.9), C.gold, 26);
};

/* ---- 04 SIGMA ---- */
SCENES.sigma = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'classical'], [1, 0, 'theory']]);
  const s0 = clamp(u), path = [0, 1, 1, 2, 3, 0, 4, 4, 0, 1, 2];
  [[path, 'γ', C.gold, 260], [path.slice().reverse(), 'γ reversed', C.cyan, 380]].forEach(([pp, s, col, y], r) => {
    const q = r ? P(S, 0, 2.7) : s0; if (q <= 0) return;
    txt(s, 200, y + 32, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: q });
    pp.forEach((st, i) => { cellv(230 + i * 64, y, 54, NAME5[S5[st]] === 'middle' ? 'mid' : NAME5[S5[st]], NC[S5[st]], q, 'rgba(0,0,0,0.5)', 0.26); if (i) arrow(230 + i * 64 - 10, y + 27, 230 + i * 64 - 2, y + 27, C.dim, q * 0.6, 1.5); });
  });
  eqn('σ = Σ πᵢPᵢⱼ log( πᵢPᵢⱼ / πⱼPⱼᵢ )', 1450, 330, P(S, 0, 7.4), C.white, 26);
  const l = P(S, 1, 0.3);
  eqn('σ = (4/5)(p − q) log(p/q)', 960, 520, l, C.gold, 36);
  /* sigma against x = p/q with q = 1/8 */
  const pq = P(S, 1, 4.8), x0 = 260, y0 = 850, w = 620, h = 230;
  if (pq > 0) {
    plotAxes(x0, y0, w, h, pq, 'p / q', 'σ');
    const f = x => 0.8 * 0.125 * (x - 1) * Math.log(x), X = x => x0 + (x - 0.1) / 2.9 * w, Y = v => y0 - v / 0.24 * h;
    curve(s => { const x = 0.1 + 2.9 * s; return [X(x), Y(f(x))]; }, 120, C.gold, pq, 3);
    dot(X(1), Y(0), 12, 'w', pq); txt('p = q', X(1), y0 + 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: pq });
    const e = P(S, 1, 8.1); dot(X(2), Y(f(2)), 14, 'g', e); dashed(X(2), Y(f(2)), X(2), y0, C.gold, e * 0.6, 1.5); txt('2', X(2), y0 + 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: e });
  }
  chip(1380, 700, 680, 56, 'p = 1/4, q = 1/8:  σ = log 2 / 10', C.gold, P(S, 1, 8.1), 26);
  txt('≈ 0.0693 per step', 1380, 770, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 9.5) });
  chip(1380, 850, 680, 50, 'path relative entropy · not heat', C.orange, P(S, 1, 13.2), 22);
};

/* ---- 05 WINDING ---- */
SCENES.winding = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), Q = sqGraph(560, 500, 170, s0, { r: 20 });
  const ord = ['O', 'L', 'J', 'R'];
  for (let i = 0; i < 4; i++) { lane(Q[ord[i]], Q[ord[(i + 1) % 4]], -22, C.gold, s0 * 0.7, i === 0 ? '+1' : null, 2.5); lane(Q[ord[(i + 1) % 4]], Q[ord[i]], -22 + 44, C.cyan, s0 * 0.7, i === 0 ? '−1' : null, 2.5); }
  const wv = walker(Q, u, 0.5, s0);
  txt('W = ' + (wv >= 0 ? '+' : '') + wv, 560, 260, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 1.5) });
  const k = Math.floor(u / 0.5);
  for (let i = 0; i < 20; i++) { const kk = k - 19 + i; if (kk < 1) continue; const ws = wStep(WALK[kk - 1], WALK[kk]); const col = ws > 0 ? C.gold : ws < 0 ? C.cyan : C.dim; box(1060 + i * 38, 300, 32, 46, col, s0, 1.5, 'rgba(0,0,0,0.5)'); txt(ws > 0 ? '+' : ws < 0 ? '−' : '0', 1076 + i * 38, 332, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: s0 }); }
  txt('step contributions', 1060, 280, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.dim, a: s0 });
  txt('branch and pauses: 0', 1060, 390, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.mag, a: P(S, 0, 6) });
  const l = P(S, 1, 0.3);
  eqn('log P(γ) / P(γ reversed) = W · log(p/q)', 1440, 520, l, C.gold, 28);
  eqn('D(Pₙ ‖ Pₙ reversed) = N · σ', 1440, 600, P(S, 1, 6), C.white, 28);
  chip(1440, 700, 560, 50, 'all of the direction is in W', C.green, P(S, 1, 2.5), 22);
};

/* ---- 06 FLUCTUATION ---- */
SCENES.fluctuation = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), x0 = 260, yb = 760, bw = 64, sc = 1500;
  const X = w => x0 + (w + 8) * bw;
  for (let w = -8; w <= 10; w++) {
    const v = WD12[w] || 0, q = s0 * clamp((u - 0.3 - (w + 8) * 0.05) / 0.4), h = v * sc;
    fillBox(X(w) + 6, yb - h, bw - 12, h, w > 0 ? C.gold : w < 0 ? C.cyan : C.white, q * 0.8);
    txt(String(w), X(w) + bw / 2, yb + 26, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
  }
  line(x0, yb, X(11), yb, C.dim, s0, 1.5);
  txt('net winding W after N = 12 steps', X(1), 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  const cur = [1, 2, 3].reduce((c, w, i) => (P(S, 0, 2.5 + i * 1.4) > 0 ? w : c), 0);
  if (cur) [cur, -cur].forEach(v => { const h = (WD12[v] || 0) * sc; box(X(v) + 2, yb - h - 6, bw - 4, h + 6, C.gold, P(S, 0, 2.5 + (cur - 1) * 1.4) * (0.6 + 0.4 * Math.sin(t * 5)), 3); });
  [1, 2, 3].forEach((w, i) => {
    const q = P(S, 0, 2.5 + i * 1.4); if (q <= 0) return;
    txt('w = ' + w + ':  ' + WD12[w].toFixed(4) + ' / ' + WD12[-w].toFixed(4) + ' = ' + Math.round(WD12[w] / WD12[-w]), 1520, 390 + i * 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
  });
  eqn('Pr(W = w) = (p/q)ʷ · Pr(W = −w)', 1520, 310, P(S, 0, 1), C.gold, 26);
  const l = P(S, 1, 0.3);
  eqn('E[(p/q)^(−W)] = 1', 1520, 580, l, C.white, 28);
  chip(1520, 660, 620, 52, 'given W: same path law both ways', C.green, P(S, 1, 4.5), 22);
  txt('E[W] = 6/5 at N = 12', X(1), 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 7) });
};

/* ---- 07 MERGE ---- */
SCENES.merge = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), R = pyrFlip(560, 580, 420, 0.5, s0, { r: 18, ls: 22, fill: 0.04 });
  const m = P(S, 0, 0.5);
  if (R.P && m > 0) {
    const a = R.P.T, b = R.P.J, cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2, L = Math.hypot(a[0] - b[0], a[1] - b[1]);
    ctx.save(); ctx.globalAlpha = m * 0.8; ctx.strokeStyle = C.vio; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.ellipse(cx, cy, L / 2 + 45, 55, Math.atan2(b[1] - a[1], b[0] - a[0]), 0, TAU); ctx.stroke(); ctx.restore();
    txt('type B', cx + 70, cy - 60, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.vio, a: m });
    lane(R.P.T, R.P.O, 12, C.green, P(S, 0, 2.6), 'r');
    const no = P(S, 0, 5.9); if (no > 0) { dashed(R.P.J[0], R.P.J[1], R.P.O[0], R.P.O[1], C.red, no, 2.5); const mx = (R.P.J[0] + R.P.O[0]) / 2, my = (R.P.J[1] + R.P.O[1]) / 2; txt('✗', mx, my + 10, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.red, a: no }); }
  }
  const l = P(S, 1, 0.3), l2 = P(S, 1, 4);
  const hist = (y, seq, res, col, q) => { if (q <= 0) return; seq.forEach((s, i) => { chip(1150 + i * 160, y, 130, 50, s, i === 1 ? C.vio : C.white, q, 22); if (i) arrow(1150 + i * 160 - 95, y, 1150 + i * 160 - 68, y, C.dim, q, 2); }); arrow(1150 + 2 * 160 - 95, y, 1150 + 2 * 160 - 68, y, col, q, 2); chip(1150 + 2 * 160, y, 130, 50, '∅ ?', col, q, 22); txt(res, 1150 + 2 * 160 + 90, y + 8, { size: 26, fam: F.mono, w: 700, align: 'left', c: col, a: q }); };
  hist(380, ['low', 'B'], '0', C.red, l);
  hist(520, ['∅', 'B'], 'r', C.green, l2);
  txt('B came from joint', 1310, 430, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l });
  txt('B came from middle', 1310, 570, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l2 });
  chip(1390, 700, 680, 52, 'same present · two futures · not Markov', C.gold, P(S, 1, 9.0), 22);
};

/* ---- 08 PHASE ---- */
SCENES.phase = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), Q = sqGraph(760, 500, 200, s0, { r: 16 });
  const labs = [['O', 'L', '−iX'], ['L', 'J', 'iZ'], ['J', 'R', '(−iX)⁻¹'], ['R', 'O', '(iZ)⁻¹']];
  labs.forEach(([i, k, s], e) => { const q = P(S, 0, 4.6 + e * 0.7); lane(Q[i], Q[k], -24, C.gold, q, null, 2.5); const mx = (Q[i][0] + Q[k][0]) / 2, my = (Q[i][1] + Q[k][1]) / 2, dx = mx - 760, dy = my - 500, dl = Math.hypot(dx, dy) || 1; txt(s, mx + dx / dl * 70, my + dy / dl * 70 + 8, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); });
  const bq = P(S, 0, 8.4); lane(Q.O, Q.T, -20, C.mag, bq, null, 2.5); txt('−iY', (Q.O[0] + Q.T[0]) / 2, Q.O[1] + 50, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: bq });
  /* a qubit travelling around the loop */
  const l = P(S, 1, 0.3);
  if (l > 0) {
    const ph = ((u - lineAt(S, 1).s) * 0.35) % 1, ord = ['O', 'L', 'J', 'R', 'O'], seg = Math.floor(ph * 4), f = ph * 4 - seg;
    const A = Q[ord[seg]], B = Q[ord[seg + 1]];
    qubit(lerp(A[0], B[0], f), lerp(A[1], B[1], f), 34, Math.PI * (0.25 + ph * 2), ph * TAU, l, C.gold, t);
  }
  eqn('forward loop:  U = −I', 1480, 330, l, C.gold, 28);
  eqn('backward loop: U = −I', 1480, 390, P(S, 1, 2.5), C.cyan, 28);
  chip(1480, 530, 600, 52, 'forward: p⁴/5 = 1/1280', C.gold, P(S, 1, 7.4), 24);
  chip(1480, 600, 600, 52, 'backward: q⁴/5 = 1/20480', C.cyan, P(S, 1, 11.6), 24);
  txt('same phase · different probability', 1480, 690, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 5.3) });
};

/* ---- 09 WALK ---- */
SCENES.walk = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 470, cy = 470, h = 150, pts = [[cx - h, cy + h], [cx + h, cy + h], [cx + h, cy - h], [cx - h, cy - h]];
  for (let i = 0; i < 4; i++) { const A = pts[i], B = pts[(i + 1) % 4]; lane(A, B, 16, C.gold, P(S, 0, 7.3), i === 0 ? '√p' : null, 2.5); lane(B, A, 16, C.cyan, P(S, 0, 8.5), i === 0 ? '√q' : null, 2.5); }
  pts.forEach((p, i) => { dot(p[0], p[1], 18, ND[S5[i]], s0); });
  /* coherent amplitude ripple */
  for (let i = 0; i < 4; i++) { const p = pts[i], pr = (t * 1.4 + i * 0.25) % 1; ring(p[0], p[1], 20 + pr * 40, C.gold, s0 * (1 - pr) * 0.6, 2); }
  eqn('S⁴ = −I', cx, cy + 8, P(S, 0, 5.2), C.red, 30);
  eqn('Wₚ = √p S + √q S†', 1200, 270, P(S, 0, 7.3), C.white, 28);
  const l = P(S, 1, 0.3);
  eqn('Wₚ†Wₚ = I + √(pq)(S² + S⁻²) = I', 1200, 330, l, C.green, 26);
  txt('if S⁴ = +I: I + 2√(pq) S²  ✗', 1200, 380, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 6.1) });
  /* return probability curves */
  const pq = P(S, 1, 8.0), x0 = 900, y0 = 820, w = 600, hh = 330;
  if (pq > 0) {
    plotAxes(x0, y0, w, hh, pq, 'p', 'two-step return');
    curve(s => [x0 + s * w, y0 - 4 * s * (1 - s) * hh], 80, C.gold, pq, 3);
    curve(s => [x0 + s * w, y0 - 2 * s * (1 - s) * hh], 80, C.cyan, pq, 3);
    txt('coherent 4pq', x0 + w + 20, y0 - hh + 10, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.gold, a: pq });
    txt('measured 2pq', x0 + w + 20, y0 - hh / 2 + 10, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.cyan, a: pq });
    const e = P(S, 1, 14.8); dot(x0 + w / 2, y0 - hh, 14, 'g', e); dot(x0 + w / 2, y0 - hh / 2, 14, 'c', e); dashed(x0 + w / 2, y0 - hh, x0 + w / 2, y0, C.white, e * 0.5, 1.5);
    txt('p = 1/2:  1  vs  1/2', x0 + w / 2, y0 + 34, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: e });
  }
};

/* ---- 10 RECORDS ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('Σⱼ √(PᵢⱼPₖⱼ) ⟨eⱼᵢ, eⱼₖ⟩ Uⱼᵢ† Uⱼₖ = δᵢₖ I', 960, 250, P(S, 0, 5.2), C.white, 26);
  const R = pyrFlip(560, 570, 380, 0.5, s0, { r: 18, ls: 22, fill: 0.04 });
  const l = P(S, 1, 0.3), l2 = P(S, 1, 4.0);
  if (R.P) { lane(R.P.L, R.P.O, 12, C.cyan, l, 'q'); lane(R.P.T, R.P.O, 12, C.mag, l, 'r'); lane(R.P.R, R.P.O, -12, C.gold, l2, 'p'); }
  txt('only common successor: ∅', 300, 840, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
  /* record space */
  const cx = 1340, cy = 560, Rr = 170, q = P(S, 1, 5.7);
  if (q > 0) {
    ring(cx, cy, Rr, C.dim, q * 0.6, 1.5);
    arrow(cx, cy, cx + Rr, cy, C.cyan, q, 3.5); txt('e(low→∅)', cx + Rr + 10, cy - 14, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.cyan, a: q });
    arrow(cx, cy, cx + Rr * 0.97, cy + 24, C.gold, q * 0.9, 3); txt('e(high→∅)', cx + Rr + 10, cy + 40, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.gold, a: q });
    arrow(cx, cy, cx, cy - Rr, C.mag, q, 3.5); txt('e(middle→∅)', cx + 12, cy - Rr - 12, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.mag, a: q });
    line(cx + 24, cy, cx + 24, cy - 24, C.white, q, 2); line(cx, cy - 24, cx + 24, cy - 24, C.white, q, 2);
    txt('≥ 2 record directions', cx, cy + Rr + 42, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  }
  chip(1340, 840, 640, 52, 'identical records: defect ≥ √(qr) = 1/8', C.red, P(S, 1, 10.9), 22);
};

/* ---- 11 INSTRUMENT ---- */
SCENES.instrument = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 0, 'classical'], [1, 7.0, 'theory']]);
  const s0 = clamp(u), Q = sqGraph(560, 520, 170, s0, { r: 16 });
  const edges = []; for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) if (PM[i][j] > 0) edges.push([i, j]);
  edges.forEach(([i, j], e) => {
    const q = s0 * clamp((u - 0.8 - e * 0.25) / 0.4); if (q <= 0) return;
    const A = Q[S5[i]], B = Q[S5[j]];
    if (i === j) { const dx = A[0] - 560, dy = A[1] - 520, dl = Math.hypot(dx, dy) || 1; ring(A[0] + dx / dl * 30, A[1] + dy / dl * 30, 16, C.white, q * 0.8, 2); }
    else lane(A, B, 12, i === 4 || j === 4 ? C.mag : C.gold, q * 0.85, null, 2);
  });
  txt('4 + 3 + 3 + 3 + 2 = 15 edges', 560, 830, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) });
  eqn('Kⱼᵢ = √Pᵢⱼ |j⟩⟨i| ⊗ Uⱼᵢ', 1400, 280, P(S, 0, 2), C.white, 28);
  eqn('Σ K†K = I   (trace kept)', 1400, 350, P(S, 0, 6.2), C.green, 24);
  eqn('Σ KK† = I   (identity kept)', 1400, 400, P(S, 0, 9.2), C.green, 24);
  /* Choi rank grid */
  const l = P(S, 1, 0.3), gx = 1160, gy = 460, cs = 16;
  if (l > 0) { for (let i = 0; i < 15; i++) for (let j = 0; j < 15; j++) box(gx + j * cs, gy + i * cs, cs, cs, C.dim, l * 0.25, 1); for (let i = 0; i < 15; i++) fillBox(gx + i * cs + 2, gy + i * cs + 2, cs - 4, cs - 4, C.gold, l * clamp((u - lineAt(S, 1).s - 0.3 - i * 0.08) / 0.3)); }
  txt('rank J(E) = 15', 1580, 540, { size: 26, fam: F.mono, w: 700, align: 'left', c: C.gold, a: l });
  txt('⇒ environment ≥ 15', 1580, 590, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.white, a: P(S, 1, 2.8) });
  chip(1400, 800, 680, 52, 'pₕ, Uₕ, Γ = δ from one instrument', C.cyan, P(S, 1, 7.2), 22);
};

/* ---- 12 SIGNS ---- */
SCENES.signs = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), Q = sqGraph(520, 520, 170, s0, { r: 16, lab: false });
  const G = { O: 'G₀ = I', L: 'G₁ = a', J: 'G₂ = −b', R: 'G₃ = −c', T: 'G₄ = b' };
  Object.keys(Q).forEach(k => txt(G[k], Q[k][0], Q[k][1] + (k === 'R' || k === 'J' ? -32 : 46), { size: 22, fam: F.mono, w: 700, align: 'center', c: NC[k], a: P(S, 0, 1.5) }));
  const cq = P(S, 0, 3.5); if (cq > 0) { line(Q.R[0], Q.R[1], Q.O[0], Q.O[1], C.red, cq, 5); txt('cut edge · ν = 1', Q.R[0] - 30, (Q.R[1] + Q.O[1]) / 2 + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.red, a: cq }); }
  eqn('Uₕ = (−1)ᵏ G_end G_start†', 1380, 290, P(S, 0, 2), C.white, 30);
  eqn('closed loop:  W = 4k,  U = (−1)ᵏ I', 1380, 360, P(S, 0, 4.4), C.gold, 26);
  const l = P(S, 1, 0.3), x0 = 1010, y0 = 470;
  if (l > 0) {
    ['net turns k', 'phase (−1)ᵏ', '(p/q)^4k, p = 2q', '(p/q)^4k, p = q'].forEach((h, r) => txt(h, x0, y0 + 40 + r * 70, { size: 20, fam: F.mono, w: 700, align: 'left', c: [C.white, C.cyan, C.gold, C.dim][r], a: r === 3 ? P(S, 1, 11.3) : l }));
    [0, 1, 2, 3].forEach(k => {
      const x = x0 + 330 + k * 120;
      txt(String(k), x, y0 + 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
      txt(k % 2 ? '−1' : '+1', x, y0 + 110, { size: 24, fam: F.mono, w: 700, align: 'center', c: k % 2 ? C.red : C.cyan, a: l });
      txt(String(Math.pow(16, k)), x, y0 + 180, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4.4) });
      txt('1', x, y0 + 250, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 11.3) });
    });
  }
  chip(1380, 860, 640, 50, 'swap p, q: only probability flips', C.gold, P(S, 1, 8.1), 22);
};

/* ---- 13 PROTECTED ---- */
SCENES.protected = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), Q = sqGraph(560, 520, 170, s0, { r: 10, lab: false });
  const fr = { O: 0, L: 1.2, J: 2.4, R: 3.3, T: 4.4 };
  Object.keys(Q).forEach(k => qubit(Q[k][0], Q[k][1], 46, 0.9 + 0.3 * Math.sin(fr[k]), fr[k] + t * 0.2, s0, NC[k], t));
  txt('each pattern carries its own frame Gᵢ', 560, 820, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) });
  eqn('Ā = Σ |i⟩⟨i| ⊗ Gᵢ A Gᵢ†', 1380, 290, P(S, 0, 2), C.white, 28);
  eqn('E*(Ā) = Ā', 1380, 350, P(S, 0, 4.2), C.green, 30);
  eqn('X̄ Ȳ = i Z̄', 1380, 410, P(S, 0, 8.3), C.gold, 30);
  const l = P(S, 1, 0.3);
  if (l > 0) {
    eqn('D E D† = (Markov step) ⊗ id', 1380, 510, l, C.white, 26);
    box(1060, 570, 640, 70, C.cyan, l, 2, 'rgba(0,0,0,0.45)'); txt('positions: Markov step · coherence lost', 1380, 613, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: l });
    box(1060, 660, 640, 70, C.green, P(S, 1, 6.3), 2, 'rgba(0,0,0,0.45)'); txt('qubit + references: untouched', 1380, 703, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 6.3) });
    for (let i = 0; i < 8; i++) { const x = 1080 + ((t * 90 + i * 80) % 600); dot(x, 765, 6, 'n', P(S, 1, 6.3) * 0.8); }
  }
};

/* ---- 14 STATIONARY ---- */
SCENES.stationary = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), x0 = 360, w = 1200, N = 20;
  const prog = clamp((u - 0.5) / 12);
  const rows = [['von Neumann entropy', 'log 10', C.cyan, 300, s0], ['logical Pauli relations', 'X̄Ȳ = iZ̄', C.green, 470, P(S, 1, 0.3)], ['path arrow Σ_N', 'N · log2/10', C.gold, 760, P(S, 1, 2.7)]];
  rows.forEach(([h, v, col, y, q], r) => {
    if (q <= 0) return;
    txt(h, x0, y - 70, { size: 22, fam: F.mono, w: 700, align: 'left', c: col, a: q });
    line(x0, y, x0 + w, y, C.dim, q * 0.6, 1.5);
    if (r < 2) { line(x0, y - 40, x0 + w * prog, y - 40, col, q, 4); txt(v, x0 + w + 20, y - 32, { size: 24, fam: F.mono, w: 700, align: 'left', c: col, a: q }); }
    else { line(x0, y, x0 + w * prog, y - 180 * prog, col, q, 4); txt(v, x0 + w + 20, y - 180 + 8, { size: 24, fam: F.mono, w: 700, align: 'left', c: col, a: q }); }
    for (let n = 0; n <= N; n++) txt(String(n), x0 + n * w / N, y + 26, { size: 13, fam: F.mono, align: 'center', c: C.dim, a: q * 0.7 });
  });
  eqn('ρ* = I₁₀ / 10 is fixed', 1460, 210, P(S, 0, 2.3), C.white, 24);
  chip(960, 860, 900, 50, 'compares path laws · no heat bath · not thermodynamic entropy production', C.orange, P(S, 1, 10.2), 20);
};

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['STATE', 'stands still', C.white], ['PROBABILITY', 'carries the arrow', C.gold], ['PHASE', 'counts loops', C.cyan], ['RECORDS', 'orthogonal where paths merge', C.mag]];
    items.forEach(([a1, a2, col], i) => { const x = 300 + i * 440, q = P(S, 0, [0.3, 3.6, 5.6, 7.5][i]) * fade; box(x - 205, 250, 410, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 315, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 365, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    txt('THEORY VOLUME · AURIC_FIB_HISTORY_RECORDS_TIME_ARROW §§122–133', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 0.5) * fade });
    txt('CLASSICAL · path relative entropy · fluctuation symmetry · Kraus and Choi', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: '#8fbcff', a: P(S, 1, 3.5) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 7.8) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    const R = pyrFlip(W / 2, 380, 270, t * 0.3, a, { r: 16, lab: false, fill: 0.08 });
    if (R.P) { const ord = ['O', 'L', 'J', 'R']; for (let i = 0; i < 4; i++) lane(R.P[ord[i]], R.P[ord[(i + 1) % 4]], 14, C.gold, a * (0.5 + 0.5 * Math.sin(t * 3 - i)), null, 3); }
    txt('AURIC FIB ATOM PYRAMID IX', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 IX · 金字塔上的时间箭头 · TRURETURING FILM 038', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('The moment stands still. The history runs one way.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'STILL MOMENTS', graph: 'THE FLIP GRAPH', chain: 'A DOUBLY STOCHASTIC WALK', sigma: 'THE ARROW RATE', winding: 'WINDING COUNT', fluctuation: 'FLUCTUATION SYMMETRY', merge: 'MERGED TYPES', phase: 'LOOP PHASE', walk: 'COHERENT WALK', records: 'ORTHOGONAL RECORDS', instrument: 'ONE INSTRUMENT', signs: 'SIGNS AND TURNS', protected: 'PROTECTED QUBIT', stationary: 'STILL STATE · STRICT ARROW', finale: 'LEDGER' });

function poster38() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const R = pyrFlip(600, 500, 380, 0.6, 1, { r: 22, ls: 24, fill: 0.08 });
  const ord = ['O', 'L', 'J', 'R']; for (let i = 0; i < 4; i++) { lane(R.P[ord[i]], R.P[ord[(i + 1) % 4]], 18, C.gold, 1, null, 4); lane(R.P[ord[(i + 1) % 4]], R.P[ord[i]], 18, C.cyan, 0.45, null, 2.5); }
  const x0 = 1120, yb = 720, bw = 34, sc = 1250;
  for (let w = -6; w <= 9; w++) { const v = WD12[w] || 0, h = v * sc; fillBox(x0 + (w + 6) * bw + 3, yb - h, bw - 6, h, w > 0 ? C.gold : w < 0 ? C.cyan : C.white, 0.85); }
  txt('σ = (4/5)(p−q) log(p/q)', 1390, 300, { size: 34, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('FIB 原子金字塔 IX', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID IX', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('每 一 刻 都 静 止 · 历 史 却 只 朝 一 个 方 向', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 038', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster38;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
