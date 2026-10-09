/* Film 041 — AURIC FIB ATOM PYRAMID XII · 金字塔 XII：选择项演算 */

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
const _txt39 = txt;
txt = function (s, x, y, o = {}) { if (o.fam === F.mono && /[αβγδεκλμνξπρστχψωΣΓΔ⟨⟩]/.test(String(s))) o = Object.assign({}, o, { fam: FG }); return _txt39(s, x, y, o); };
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


/* ---- film 041: selection calculus helpers ---- */
function rho41(t) { if (t === 'a') return 'b'; if (t === 'b') return ['b', 'a']; return [rho41(t[0]), rho41(t[1])]; }
const TR41 = (() => { const T = ['a']; for (let i = 0; i < 9; i++) T.push(rho41(T[T.length - 1])); return T; })();
function tLeaves(t) { return typeof t === 'string' ? 1 : tLeaves(t[0]) + tLeaves(t[1]); }
function tDepth(t) { return typeof t === 'string' ? 0 : 1 + Math.max(tDepth(t[0]), tDepth(t[1])); }
/* draw ordered binary tree: leaves left to right, root on top */
function drawTree(t, cx, top, w, h, a, o = {}) {
  if (a <= 0) return;
  const n = tLeaves(t), dp = Math.max(1, tDepth(t)), sp = n > 1 ? Math.min(o.maxSp || 46, w / (n - 1)) : 0, x0 = cx - sp * (n - 1) / 2, lh = Math.min(o.maxLh || 60, h / dp);
  let k = 0;
  const place = (u, d) => {
    if (typeof u === 'string') { const p = [x0 + sp * k++, top + dp * lh]; return { p, leaf: u }; }
    const L = place(u[0], d + 1), R = place(u[1], d + 1), p = [(L.p[0] + R.p[0]) / 2, top + d * lh];
    return { p, L, R };
  };
  const draw = nd => {
    if (nd.leaf) { dot(nd.p[0], nd.p[1], o.r || 9, nd.leaf === 'a' ? 'c' : 'g', a); return; }
    [nd.L, nd.R].forEach(ch => { line(nd.p[0], nd.p[1], ch.p[0], ch.p[1], o.ec || C.white, a * 0.55, 1.6); draw(ch); });
    ring(nd.p[0], nd.p[1], (o.r || 9) * 0.45, o.ec || C.white, a, 1.5);
  };
  draw(place(t, 0));
}
const SEL = [[], [1], [2], [3], [1, 3]], SNM = ['∅', '1', '2', '3', '1,3'], SVAL = [0, 2, 3, 5, 7];
const SCOL = [C.white, C.cyan, C.gold, C.mag, C.green], SDOT = ['w', 'c', 'g', 'm', 'n'];
const POSC = { 1: C.cyan, 2: C.gold, 3: C.mag }, POSD = { 1: 'c', 2: 'g', 3: 'm' };
/* three positions low, mid, high left to right */
function pat3(x, y, I, a, gap = 34, r = 11) {
  if (a <= 0) return;
  line(x - gap, y, x + gap, y, C.dim, a * 0.5, 1.5);
  [1, 2, 3].forEach((i, k) => { const px = x + (k - 1) * gap; if (I.includes(i)) dot(px, y, r, POSD[i], a); else ring(px, y, r * 0.6, C.dim, a, 1.8); });
}
function cross(x, y, s, a) { if (a <= 0) return; line(x - s, y - s, x + s, y + s, C.red, a, 3); line(x - s, y + s, x + s, y - s, C.red, a, 3); }
const FB41 = (() => { const f = [0, 1]; for (let i = 0; i < 40; i++) f.push(f[f.length - 1] + f[f.length - 2]); return f; })();

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  SEL.forEach((I, k) => { const x = 360 + k * 300, q = s0 * clamp((u - 0.4 - k * 0.35) / 0.5); pat3(x, 300, I, q, 40, 14); txt('F[' + SNM[k] + ']', x, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: SCOL[k], a: q }); txt(String(SVAL[k]), x, 380, { size: 40, fam: F.mono, w: 700, align: 'center', c: SCOL[k], a: q * (1 - 0.6 * P(S, 0, 10)) }); });
  txt('low · mid · high', 360, 345, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  chip(960, 470, 560, 56, 'positions, not numbers', C.gold, P(S, 0, 10), 26);
  const l = P(S, 1, 0.3);
  if (l > 0) {
    box(330, 560, 560, 260, C.cyan, l, 2, 'rgba(0,25,40,0.45)'); txt('GENERATE', 610, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: l });
    drawTree(TR41[2], 610, 640, 200, 120, l, { r: 12, maxSp: 120 }); txt('mid + low → high   (3 + 2 = 5)', 610, 795, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
    const g = P(S, 1, 4);
    box(1030, 560, 560, 260, C.red, g, 2, 'rgba(40,0,10,0.45)'); txt('OCCUPY TOGETHER', 1310, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: g });
    pat3(1310, 690, [1, 2], g, 60, 18); cross(1310 - 30, 690, 30, g); txt('low + mid : not allowed', 1310, 795, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: g });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const py = pyrTrue(W / 2, 430, 300, t * 0.3, rp, { r: 18, fill: 0.08, lab: false });
  if (py.P) { const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'low+high' }; Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 28, { size: 20, fam: F.mono, w: 700, align: 'center', c: NC[k], a: rp })); }
  txt(scramble('AURIC FIB ATOM PYRAMID XII', rp, 412), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XII · 选 择 项 演 算', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 041 · AURIC_FIB_ATOM_SELECTION_CALCULUS', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 TREE ---- */
SCENES.tree = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('ρ(α) = β     ρ(β) = ⟨β, α⟩     ρ⟨s, t⟩ = ⟨ρs, ρt⟩', 960, 200, s0, C.white, 28);
  const xs = [250, 420, 610, 860, 1180, 1580], ws = [0, 0, 60, 100, 180, 300];
  for (let n = 0; n < 6; n++) {
    const q = P(S, 0, 2 + n * 1.0), hl = P(S, 1, 0.3) * (n < 3 ? 1 : 0.35);
    drawTree(TR41[n], xs[n], 300, ws[n], 180, q * (n < 3 ? 1 : 1 - 0.65 * P(S, 1, 0.3)), { r: 8, maxSp: 40, maxLh: 45 });
    txt('T' + String.fromCharCode(0x2080 + n), xs[n], 280, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
    txt(String(FB41[n + 3]), xs[n], 560, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q * (1 - hl * 0.5) });
  }
  txt('T_{n+2} = ⟨T_{n+1}, T_n⟩ · counts 2, 3, 5, 8, 13, 21', 960, 610, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 8) * (1 - P(S, 1, 0.3)) });
  const l = P(S, 1, 0.3);
  if (l > 0) {
    box(190, 250, 520, 330, C.cyan, l, 2, null);
    [['A · low', 250, C.cyan], ['B · mid', 420, C.gold], ['C · high', 610, C.mag]].forEach(([s, x, col]) => txt(s, x, 605 - 0, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a: l }));
    txt('C = ⟨B, A⟩', 450, 640, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
    const g = P(S, 1, 7);
    SEL.forEach((I, k) => { const x = 880 + k * 190, q = g * clamp((u - lineAt(S, 1).s - 11.8 - k * 0.45) / 0.4); pat3(x, 720, I, q, 30, 11); txt(I.length ? '{' + I.join(',') + '}' : '∅', x, 775, { size: 20, fam: F.mono, w: 700, align: 'center', c: SCOL[k], a: q }); });
    const bad = [[1, 2], [2, 3], [1, 2, 3]], bq = P(S, 1, 8.5);
    bad.forEach((I, k) => { const x = 1000 + k * 220; pat3(x, 840, I, bq * 0.6, 26, 9); cross(x, 840, 22, bq * 0.8); });
    txt('five legal selections · no two neighbours', 1260, 670, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: g });
  }
};

/* ---- 03 ORDER ---- */
SCENES.order = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0);
  const A = TR41[0], C2 = TR41[2], T3 = TR41[3];
  if (fade > 0) {
    const a1 = s0 * fade, a2 = P(S, 0, 4.5) * fade, a3 = P(S, 0, 10.8) * fade;
    box(200, 220, 460, 420, C.green, a1, 2, 'rgba(0,30,15,0.4)'); txt('E[1,3] = ⟨C, A⟩', 430, 260, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: a1 });
    drawTree([C2, A], 430, 320, 160, 200, a1, { r: 11, maxSp: 70, maxLh: 70 }); txt('value 7', 430, 610, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: a1 });
    box(730, 220, 460, 420, C.gold, a2, 2, 'rgba(30,25,0,0.4)'); txt('T₃ = ⟨C, B⟩', 960, 260, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: a2 });
    drawTree(T3, 960, 320, 160, 200, a2, { r: 11, maxSp: 70, maxLh: 70 }); txt('value 8', 960, 610, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: a2 });
    txt('≠', 695, 440, { size: 56, fam: F.mono, w: 700, align: 'center', c: C.red, a: a2 });
    box(1260, 220, 460, 420, C.mag, a3, 2, 'rgba(30,0,30,0.4)'); txt('⟨A, C⟩ ≠ ⟨C, A⟩', 1490, 260, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: a3 });
    drawTree([A, C2], 1490, 320, 160, 200, a3, { r: 11, maxSp: 70, maxLh: 70 }); txt('same composition (2, 1)', 1490, 610, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: a3 });
    chip(960, 740, 640, 56, 'a joint selection is not the next Fibonacci term', C.white, P(S, 0, 7) * fade, 22);
  }
  const l = P(S, 1, 0.3);
  if (l > 0) {
    const rows = [[[1], '⊞', [3], '=', [1, 3], C.green, '✓'], [[1], '⊞', [2], '', null, C.red, 'undefined']];
    rows.forEach(([I1, op, I2, eq, I3, col, mk], k) => { const y = 280 + k * 150, q = P(S, 1, 1.5 + k * 3.3); pat3(420, y, I1, q, 34, 13); txt(op, 560, y + 12, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); pat3(700, y, I2, q, 34, 13); if (I3) { txt('=', 840, y + 12, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); pat3(980, y, I3, q, 34, 13); } txt(mk, 1180, y + 12, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
    const g = P(S, 1, 7.2);
    box(300, 560, 1320, 150, C.cyan, g, 2, 'rgba(0,25,40,0.45)');
    drawTree(TR41[2], 470, 590, 80, 90, g, { r: 9, maxSp: 60, maxLh: 60 });
    eqn('high = ⟨mid, low⟩     val F[3] = val F[1] + val F[2] = 2 + 3 = 5', 1060, 645, g, C.cyan, 24);
    chip(960, 790, 760, 58, 'a generation equation is not a license to occupy together', C.gold, P(S, 1, 12.3), 22);
  }
};

/* ---- 04 SCALE ---- */
SCENES.scale = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('ρ³ :  E_j[I]  ↦  E_{j+1}[I]        H = M³ = [[1, 2], [2, 3]]', 960, 210, s0, C.white, 26);
  SEL.forEach((I, k) => { const x = 620 + k * 170; pat3(x, 290, I, s0, 26, 9); txt('F[' + SNM[k] + ']', x, 340, { size: 18, fam: F.mono, w: 700, align: 'center', c: SCOL[k], a: s0 }); });
  const rows = [[0, 2, 3, 5, 7], [0, 8, 13, 21, 29], [0, 34, 55, 89, 123]];
  rows.forEach((r, j) => { const q = P(S, 0, [0.5, 7.4, 10.6][j]); txt('j = ' + j, 440, 420 + j * 80, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); r.forEach((v, k) => { box(620 + k * 170 - 70, 385 + j * 80, 140, 60, SCOL[k], q * 0.8, 1.5, 'rgba(0,0,0,0.45)'); txt(String(v), 620 + k * 170, 427 + j * 80, { size: 30, fam: F.mono, w: 700, align: 'center', c: SCOL[k], a: q }); }); });
  const l = P(S, 1, 0.3);
  eqn('val F_j[I] = Σ_{i∈I} Fib(3j + i + 2)', 960, 680, l, C.gold, 28);
  const g = P(S, 1, 5);
  if (g > 0) {
    const nodes = [['A_j', C.cyan], ['B_j', C.gold], ['C_j', C.mag], ['A_{j+1}', C.cyan]];
    nodes.forEach(([s, col], k) => { const x = 560 + k * 270, q = g * clamp((u - lineAt(S, 1).s - 5 - k * 1.4) / 0.4); chip(x, 790, 180, 56, s, col, q, 24); if (k < 3) arrow(x + 95, 790, x + 175, 790, C.white, q, 3); if (k < 3) txt('ρ', x + 135, 770, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    dashed(560, 830, 1370, 830, C.red, P(S, 1, 10.5) * 0.6, 2); txt('never back to A_j', 965, 870, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 10.5) });
  }
};

/* ---- 05 RELATIONS ---- */
SCENES.relations = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 0, 'lean'], [1, 11, 'theory']]);
  const s0 = clamp(u);
  const py = pyrTrue(460, 520, 300, 0.55 + t * 0.12, s0, { r: 16, fill: 0.06, lab: false });
  if (py.P) {
    const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'joint' };
    Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: NC[k], a: s0 }));
    const q = P(S, 0, 5);
    if (q > 0) { line(py.P.O[0], py.P.O[1], py.P.J[0], py.P.J[1], C.gold, q, 3); line(py.P.L[0], py.P.L[1], py.P.R[0], py.P.R[1], C.gold, q, 3); const mx = (py.P.O[0] + py.P.J[0]) / 2, my = (py.P.O[1] + py.P.J[1]) / 2; dot(mx, my, 10, 'g', q); }
  }
  eqn('occupation:  v∅ + v₁₃ = v₁ + v₃', 460, 220, P(S, 0, 5), C.gold, 26);
  /* composition plane */
  const ox = 1150, oy = 640, sc = 170, dP = [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1]];
  const q2 = P(S, 0, 10.8);
  if (q2 > 0) {
    line(ox - 20, oy, ox + 2.3 * sc, oy, C.dim, q2, 1.5); line(ox, oy + 20, ox, oy - 1.25 * sc, C.dim, q2, 1.5);
    txt('ξ', ox + 2.3 * sc + 14, oy + 8, { size: 22, fam: FG, w: 700, align: 'left', c: C.dim, a: q2 }); txt('η', ox + 18, oy - 1.25 * sc + 8, { size: 22, fam: FG, w: 700, align: 'center', c: C.dim, a: q2 });
    const tz = P(S, 1, 11.5);
    fillPoly([[ox, oy], [ox + sc, oy], [ox + 2 * sc, oy - sc], [ox, oy - sc]], C.cyan, tz * 0.15); strokePoly([[ox, oy], [ox + sc, oy], [ox + 2 * sc, oy - sc], [ox, oy - sc]], C.cyan, tz, 2.5);
    line(ox, oy, ox + sc, oy - sc, C.mag, q2 * 0.9, 3); line(ox + sc, oy, ox, oy - sc, C.mag, q2 * 0.9, 3);
    dP.forEach(([a, b], k) => { dot(ox + a * sc, oy - b * sc, 15, SDOT[k], q2); txt(SNM[k] + '  (' + a + ',' + b + ')', ox + a * sc + (k === 2 ? -10 : 16), oy - b * sc + (b ? -24 : 34), { size: 18, fam: F.mono, w: 700, align: k === 2 ? 'right' : 'left', c: SCOL[k], a: q2 }); });
  }
  eqn('composition:  d∅ + d₃ = d₁ + d₂', 1330, 220, q2, C.mag, 26);
  const l = P(S, 1, 0.3);
  if (l > 0) { box(860, 270, 940, 110, C.green, l * (1 - P(S, 1, 11)), 2, 'rgba(0,30,15,0.6)'); txt('LEAN · PathStableSetPolytope.convexHull_three_pyramid', 1330, 310, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: l * (1 - P(S, 1, 11)) }); txt('conv(legal 3-words) = { x ≥ 0, x₀+x₁ ≤ 1, x₁+x₂ ≤ 1 }', 1330, 350, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: l * (1 - P(S, 1, 11)) }); }
  txt('trapezoid  0 ≤ V ≤ 1,  0 ≤ U ≤ 1 + V', 1330, 760, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 13) });
};

/* ---- 06 FIBERS ---- */
SCENES.fibers = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - 0.6 * P(S, 1, 0.3);
  const st = [['LAW Δ₄', '4 free numbers', C.white], ['PYRAMID', '3 means X, Y, Z', C.gold], ['TRAPEZOID', '2 means U, V', C.cyan]];
  st.forEach(([a1, a2, col], k) => { const x = 380 + k * 580, q = (k === 0 ? s0 : P(S, 0, [0, 3.5, 6.5][k])) * fade; box(x - 190, 220, 380, 130, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 275, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 318, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); if (k < 2) { arrow(x + 200, 285, x + 370, 285, C.white, P(S, 0, [3.5, 6.5][k]) * fade, 3); } });
  eqn('hides g□ = (1, −1, 0, −1, 1)', 670, 410, P(S, 1, 0.3), C.gold, 22);
  eqn('hides g_fib = (1, −1, −1, 1, 0)', 1250, 410, P(S, 1, 2.8), C.cyan, 22);
  const l = P(S, 1, 5.5);
  if (l > 0) {
    const ox = 640, oy = 820, sc = 200, Q = [[ox, oy], [ox + sc, oy], [ox + 2 * sc, oy - sc], [ox, oy - sc]];
    fillPoly(Q, C.cyan, l * 0.18); txt('2-dim fiber', ox + 0.75 * sc, oy - 0.45 * sc, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: l });
    const e1 = P(S, 1, 8.5);
    line(Q[3][0], Q[3][1], Q[2][0], Q[2][1], C.gold, Math.max(l * 0.5, e1), 6); txt('top edge: a segment', ox + sc, oy - sc - 22, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: e1 });
    const e2 = P(S, 1, 11.3);
    [[Q[0], Q[1]], [Q[1], Q[2]], [Q[3], Q[0]]].forEach(([p1, p2]) => line(p1[0], p1[1], p2[0], p2[1], C.mag, Math.max(l * 0.5, e2), 4));
    txt('other edges: one point', ox + 1.65 * sc + 40, oy - 0.3 * sc, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.mag, a: e2 });
    [[0, 0], [1, 0], [2, 1], [0, 1]].forEach(([a, b]) => dot(ox + a * sc, oy - b * sc, 10, 'w', l));
    txt('U', ox + 2.3 * sc, oy + 8, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.dim, a: l }); txt('V', ox - 24, oy - sc - 4, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l });
  }
};

/* ---- 07 TARGETS ---- */
SCENES.targets = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('E[f] = f∅ + (f₁ − f∅) U + (f₂ − f∅) V + Γ_f · Y + Λ_f · κ', 960, 240, s0, C.white, 30);
  const q1 = P(S, 0, 8.3);
  eqn('Γ_f = f∅ + f₃ − f₁ − f₂', 560, 360, q1, C.mag, 28); eqn('Λ_f = f∅ + f₁₃ − f₁ − f₃', 1360, 360, q1, C.gold, 28);
  const l = P(S, 1, 0.3);
  /* test pairs */
  const pairs = [[[0, 3], [1, 2], C.mag, 'generation relation', 'differ by Γ_f / 2', 560], [[0, 4], [1, 3], C.gold, 'square relation', 'differ by Λ_f / 2', 1360]];
  pairs.forEach(([A, B, col, s1, s2, x], k) => { const q = P(S, 1, 0.3 + k * 2.3); txt(s1, x, 440, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: q }); [A, B].forEach((pr, m) => { const y = 510 + m * 90; pr.forEach((idx, j) => { pat3(x - 120 + j * 170, y, SEL[idx], q, 26, 10); }); txt('½ + ½', x + 200, y + 8, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.dim, a: q }); }); txt('same (U, V) · ' + s2, x, 700, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
  chip(960, 800, 720, 58, 'U, V enough for every law  ⟺  Γ_f = Λ_f = 0', C.green, P(S, 1, 5), 24);
};

/* ---- 08 MOMENTS ---- */
SCENES.moments = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0) * 0.0;
  const hdr = ['', '(ξ, η)', 'ξ(ξ−1)', 'ξη'], rows = [['(0,0)', '0', '0'], ['(1,0)', '0', '0'], ['(0,1)', '0', '0'], ['(1,1)', '0', '1'], ['(2,1)', '2', '2']];
  hdr.forEach((h, j) => txt(h, 300 + j * 150, 230, { size: 20, fam: FG, w: 700, align: 'center', c: C.dim, a: s0 }));
  rows.forEach((r, k) => { const y = 280 + k * 62, q = s0; pat3(300, y, SEL[k], q, 22, 8); r.forEach((v, j) => txt(v, 450 + j * 150, y + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: j === 0 ? SCOL[k] : (v === '0' ? C.dim : C.gold), a: P(S, 0, j === 0 ? 4 : 10) })); });
  const qi = P(S, 0, 15);
  const inv = [['p₁₃', 'S / 2', C.green], ['p₃', 'T − S', C.mag], ['p₂', 'V − T + S/2', C.gold], ['p₁', 'U − T', C.cyan], ['p∅', '1 − U − V + T', C.white]];
  inv.forEach(([a1, a2, col], k) => { const y = 260 + k * 58, q = qi * clamp((u - lineAt(S, 0).s - 15 - k * 0.4) / 0.4); txt(a1 + ' = ' + a2, 1000, y, { size: 26, fam: FG, w: 700, align: 'left', c: col, a: q }); });
  txt('S = E[ξ(ξ−1)]    T = E[ξη]', 1180, 580, { size: 22, fam: FG, w: 700, align: 'center', c: C.dim, a: qi });
  const l = P(S, 1, 0.3);
  if (l > 0) {
    const mu = [['μ_A = ½ ∅ + ½ joint', [0.5, 0, 0, 0, 0.5], '(S, T) = (1, 1)'], ['μ_B = ½ low + ½ high', [0, 0.5, 0, 0.5, 0], '(S, T) = (0, ½)']];
    mu.forEach(([nm, p, st], m) => { const x0 = 300 + m * 760, q = P(S, 1, 2.6 + m * 1.2); txt(nm, x0 + 170, 660, { size: 22, fam: FG, w: 700, align: 'center', c: C.white, a: q }); p.forEach((v, k) => { fillBox(x0 + k * 70, 820 - v * 200, 50, v * 200, SCOL[k], q * 0.8); txt(SNM[k], x0 + k * 70 + 25, 850, { size: 16, fam: F.mono, w: 700, align: 'center', c: SCOL[k], a: q }); }); txt('(U, V) = (1, ½)', x0 + 520, 740, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); txt(st, x0 + 520, 790, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 7.5) }); });
  }
};

/* ---- 09 INFINITE ---- */
SCENES.infinite = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('m_n = E[q Mⁿ D] = Fib(n+3) U + Fib(n+4) V', 960, 220, s0, C.white, 28);
  eqn('m_{n+2} = m_{n+1} + m_n', 960, 280, P(S, 0, 7.5), C.gold, 26);
  const x0 = 360, y0 = 760, w = 1200, h = 400, N = 10;
  plotAxes(x0, y0, w, h, s0, 'n', 'log m_n');
  const ms = n => FB41[n + 3] * 1 + FB41[n + 4] * 0.5, Y = v => y0 - Math.log(v) / Math.log(ms(N)) * h;
  for (let n = 0; n <= N; n++) { const x = x0 + n / N * w, q = P(S, 0, 1 + n * 0.5); dot(x, Y(ms(n)), 14, 'g', q); ring(x, Y(ms(n)), 20, C.cyan, q * P(S, 0, 8), 2.5); if (n < 4) txt(ms(n).toString(), x, Y(ms(n)) - 26, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); }
  txt('● μ_A    ○ μ_B   — identical at every n', x0 + 20, y0 - h + 10, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.dim, a: P(S, 0, 8) });
  const l = P(S, 1, 0.3);
  chip(1180, 600, 600, 56, 'whole sequence ⟶ only (U, V)', C.cyan, l, 24);
  chip(1180, 680, 600, 56, 'sampling more ≠ a richer relation', C.gold, P(S, 1, 3.4), 22);
};

/* ---- 10 SEAM ---- */
SCENES.seam = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 10.8, 'lean']]);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0.3);
  /* windows fed high to low; each printed high, mid, low so that the old low touches the new high */
  const word = [[1], [3], [1, 3], [2]], ww = 250;
  const pat3r = (x, y, I, a) => { if (a <= 0) return; line(x - 60, y, x + 60, y, C.dim, a * 0.5, 1.5); [3, 2, 1].forEach((i, k) => { const px = x + (k - 1) * 60; if (I.includes(i)) dot(px, y, 15, POSD[i], a); else ring(px, y, 9, C.dim, a, 1.8); }); };
  word.forEach((I, k) => { const x = 400 + k * 370, q = s0 * clamp((u - 0.4 - k * 0.6) / 0.5) * fade; box(x - ww / 2, 250, ww, 100, C.dim, q, 1.5, 'rgba(0,0,0,0.4)'); pat3r(x, 300, I, q); txt('high · mid · low', x, 380, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); txt('window ' + (word.length - k), x, 240, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); });
  const q1 = P(S, 0, 3.5) * fade;
  for (let k = 0; k < word.length - 1; k++) { const xo = 400 + k * 370 + 60, xn = 400 + (k + 1) * 370 - 60, bad = word[k].includes(1) && word[k + 1].includes(3); curve(s => [lerp(xo, xn, s), 300 - Math.sin(s * Math.PI) * 60], 30, bad ? C.red : C.green, q1, 3); txt('s = ' + (word[k].includes(1) ? 1 : 0), (xo + xn) / 2, 220, { size: 18, fam: F.mono, w: 700, align: 'center', c: bad ? C.red : C.green, a: q1 }); if (bad) cross((xo + xn) / 2, 300, 16, q1); }
  txt('old low · new high : not both', 960, 470, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q1 });
  chip(960, 560, 520, 56, 'one seam bit carries the future', C.gold, P(S, 0, 8.5) * fade, 22);
  txt('feed from high to low →', 280, 200, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.dim, a: s0 * fade });
  const l = P(S, 1, 0.3);
  if (l > 0) {
    const gx = 420, gy = 300, cs = 64;
    SEL.forEach((I, k) => { txt(SNM[k], gx - 40, gy + k * cs + cs / 2 + 8, { size: 18, fam: F.mono, w: 700, align: 'center', c: SCOL[k], a: l }); txt(SNM[k], gx + k * cs + cs / 2, gy - 14, { size: 18, fam: F.mono, w: 700, align: 'center', c: SCOL[k], a: l }); });
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const bad = SEL[i].includes(1) && SEL[j].includes(3), q = P(S, 1, bad ? 2.6 : 0.8); box(gx + j * cs + 3, gy + i * cs + 3, cs - 6, cs - 6, bad ? C.red : C.cyan, q * (bad ? 1 : 0.6), 1.5, bad ? 'rgba(80,0,10,0.6)' : 'rgba(0,30,40,0.4)'); }
    txt('old ↓  new →', gx - 10, gy + 5 * cs + 40, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.dim, a: l });
    txt('25 − 4 = 21', gx + 2.5 * cs, gy + 5 * cs + 80, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4.5) });
    const cn = [1, 5, 21, 89, 377];
    cn.forEach((v, k) => { const x = 980 + k * 150, q = P(S, 1, 6.9 + k * 0.6); chip(x, 380, 120, 70, String(v), C.gold, q, 30); txt('L = ' + k, x, 450, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); });
    eqn('a_L = Fib(3L + 2),   a_{L+2} = 4 a_{L+1} + a_L', 1280, 530, P(S, 1, 9.5), C.white, 22);
    const lq = P(S, 1, 10.8);
    if (lq > 0) { box(900, 590, 760, 120, C.green, lq, 2, 'rgba(0,30,15,0.6)'); txt('LEAN · AdmissibleCount.admissibleWord_card_eq_fib', 1280, 630, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: lq }); txt('#{ words of length m with no 11 } = F(m + 2)', 1280, 675, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: lq }); }
  }
};

/* ---- 11 CONSUME ---- */
SCENES.consume = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const hd = ['first', 'Q', 'seam', 'then F[3]'], rows = [['0', '0', '5'], ['2', '1', '⊥'], ['3', '0', '18'], ['5', '0', '26'], ['7', '1', '⊥']];
  hd.forEach((h, j) => txt(h, 300 + j * 170, 230, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 }));
  rows.forEach((r, k) => { const y = 285 + k * 66, q = P(S, 0, [4.0, 7.3, 5.0, 6.1, 7.6][k]); pat3(300, y, SEL[k], q, 22, 8); r.forEach((v, j) => txt(v, 470 + j * 170, y + 9, { size: 26, fam: F.mono, w: 700, align: 'center', c: j === 2 ? (v === '⊥' ? C.red : C.green) : (j === 1 && v === '1' ? C.red : C.white), a: q })); });
  const l = P(S, 1, 0.3);
  if (l > 0) {
    [['μ_A', '½ · 5  +  ½ · ⊥', C.white], ['μ_B', '½ · ⊥  +  ½ · 26', C.gold]].forEach(([n, s, col], m) => { const q = P(S, 1, 2 + m * 1.8); chip(1320, 260 + m * 80, 560, 58, n + ' :  ' + s, col, q, 24); });
    const f = [['ν(5)', '1 − U − V + T'], ['ν(18)', 'V − T + S/2'], ['ν(26)', 'T − S'], ['ν(⊥)', 'U − T + S/2']];
    f.forEach(([a1, a2], k) => { const q = P(S, 1, 6 + k * 0.5); txt(a1 + ' = ' + a2, 1100, 460 + k * 50, { size: 24, fam: FG, w: 700, align: 'left', c: C.cyan, a: q }); });
    eqn('P(⊥ | Q odd) = S / 2V :   μ_A → 1,   μ_B → 0', 960, 760, P(S, 1, 9), C.gold, 26);
  }
};

/* ---- 12 EMPTY ---- */
SCENES.empty = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const steps = ['first I', 'empty window', 'F[3]'];
  steps.forEach((s, k) => { const x = 560 + k * 400, q = s0 * clamp((u - 0.3 - k * 0.5) / 0.5); chip(x, 220, 300, 56, s, [C.white, C.cyan, C.mag][k], q, 22); if (k < 2) arrow(x + 160, 220, x + 240, 220, C.white, q, 3); });
  const hd = ['', 'Q⁽⁰⁾', 'Q⁽³⁾', 'reply'], rows = [[0, 0, 5], [2, 8, 39], [3, 13, 60], [5, 21, 94], [7, 29, 128]];
  hd.forEach((h, j) => txt(h, 360 + j * 170, 310, { size: 20, fam: FG, w: 700, align: 'center', c: C.dim, a: s0 }));
  rows.forEach((r, k) => { const y = 360 + k * 62, q = P(S, 0, 7.3 + k * 0.8); pat3(360, y, SEL[k], q, 22, 8); r.forEach((v, j) => txt(String(v), 530 + j * 170, y + 9, { size: 26, fam: F.mono, w: 700, align: 'center', c: j === 2 ? C.green : C.white, a: q })); });
  txt('all five branches legal', 700, 700, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 7.1) });
  const l = P(S, 1, 0.3);
  eqn('Q⁽⁰⁾ = 2ξ + 3η     Q⁽³⁾ = 8ξ + 13η', 1400, 360, l, C.cyan, 24);
  eqn('means → U, V    squares → S, T', 1400, 420, P(S, 1, 2.5), C.white, 24);
  [['μ_A', 'E[(Q⁽⁰⁾)²] = 49/2', '→ 5 or 128'], ['μ_B', 'E[(Q⁽⁰⁾)²] = 29/2', '→ 39 or 94']].forEach(([n, a1, a2], m) => { const q = P(S, 1, 6.5 + m * 2); box(1130, 490 + m * 120, 540, 100, m ? C.gold : C.white, q, 2, 'rgba(0,0,0,0.45)'); txt(n + '   ' + a1, 1400, 530 + m * 120, { size: 22, fam: FG, w: 700, align: 'center', c: m ? C.gold : C.white, a: q }); txt(a2, 1400, 568 + m * 120, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: q }); });
};

/* ---- 13 CROSSWIN ---- */
SCENES.crosswin = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  txt('each window: ∅ or F[2], probability ½', 960, 220, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  const laws = [['tied together (θ = ½)', [[0, 0], [1, 1]], C.cyan, [0, 16]], ['tied apart (θ = 0)', [[0, 1], [1, 0]], C.gold, [3, 13]]];
  laws.forEach(([nm, prs, col, fin], m) => {
    const x0 = 480 + m * 960, q = P(S, 0, 7.4 + m * 1.2);
    txt(nm, x0, 300, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    prs.forEach(([A, B], k) => { const y = 380 + k * 110; pat3(x0 - 130, y, A ? [2] : [], q, 26, 10); pat3(x0 + 30, y, B ? [2] : [], q, 26, 10); txt('→', x0 + 140, y + 8, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4.6) }); txt(String(13 * A + 3 * B), x0 + 220, y + 10, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: P(S, 1, 5 + m * 2.2) }); });
    txt('mean 8', x0, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2.8) });
  });
  chip(960, 470, 300, 56, 'same window moments', C.white, P(S, 1, 0.3), 20);
  eqn('final = 13A + 3B', 960, 560, P(S, 1, 2.8), C.dim, 22);
  chip(960, 760, 700, 56, 'one window\'s moments are not a history', C.red, P(S, 0, 1), 22);
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['GENERATE', 'ρ(β) = ⟨β, α⟩', C.cyan], ['SELECT', 'five legal sets · one seam bit', C.gold], ['KEEP', '(U, V, S, T) ⟷ p', C.green]];
    items.forEach(([a1, a2, col], i) => { const x = 420 + i * 540, q = P(S, 0, [0.3, 2, 5.5][i]) * fade; box(x - 240, 250, 480, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 315, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 365, { size: 22, fam: FG, w: 700, align: 'center', c: C.white, a: q }); });
    txt('LEAN · PathStableSetPolytope · AdmissibleCount', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2.5) * fade });
    txt('VOLUME · selection calculus · fibers · moment inversion · native replies', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 7.4) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 13.5) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    SEL.forEach((I, k) => pat3(560 + k * 200, 330, I, a, 30, 12));
    drawTree(TR41[4], W / 2, 400, 200, 160, a * 0.8, { r: 8, maxSp: 34, maxLh: 38 });
    txt('AURIC FIB ATOM PYRAMID XII', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XII · 选择项演算 · TRURETURING FILM 041', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Generate, select, and keep what the task still reads.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'POSITIONS, NOT NUMBERS', tree: 'THE GENERATING CHAIN', order: 'ORDER AND MERGE', scale: 'ONE WINDOW UP', relations: 'TWO RELATIONS', fibers: 'WHAT EACH MEAN HIDES', targets: 'WHICH TARGETS SURVIVE', moments: 'FOUR MOMENTS', infinite: 'INFINITE MEANS, TWO NUMBERS', seam: 'ONE SEAM BIT', consume: 'THE NATIVE REPLY', empty: 'A SECOND PATH', crosswin: 'NOT A HISTORY', finale: 'LEDGER' });

function poster41() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const py = pyrTrue(500, 500, 300, 0.7, 1, { r: 18, fill: 0.08, lab: false });
  const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'low+high' };
  Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 30, { size: 24, fam: F.mono, w: 700, align: 'center', c: NC[k] }));
  SEL.forEach((I, k) => { const x = 1060 + k * 140; pat3(x, 300, I, 1, 30, 11); txt(String(SVAL[k]), x, 360, { size: 34, fam: F.mono, w: 700, align: 'center', c: SCOL[k] }); });
  txt('ρ(α) = β     ρ(β) = ⟨β, α⟩', 1380, 460, { size: 36, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('∅ + joint = low + high', 1380, 540, { size: 32, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('∅ + high = low + mid', 1380, 610, { size: 32, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('(U, V, S, T) ⟷ p', 1380, 690, { size: 34, fam: FG, w: 700, align: 'center', c: C.green });
  txt('FIB 原子金字塔 XII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XII', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('选 的 是 位 置 · 不 是 数', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 041', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster41;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
