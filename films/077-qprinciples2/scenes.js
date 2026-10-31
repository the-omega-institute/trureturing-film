/* Film 008 — QUANTUM LEDGER · 量子账本. The project's quantum theory: what a proof checker will sign. */

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

/* ---- film 077: AURIC QUANTUM PRINCIPLES II · gate contracts, loop phases and the square law ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN GENERAL THEOREM · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · EXACT VALUE NOT DETERMINED', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po077 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po077.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po077.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect63(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const MODES63 = [['∅', [0, 0, 0], 'n', '000'], ['[2]', [1, 0, 0], 'c', '100'], ['[3]', [0, 0, 1], 'g', '010'], ['[5]', [0, 1, 0], 'o', '001'], ['[2,5]', [1, 1, 0], 'm', '101']];
const KEDGE63 = [[0, 1], [0, 2], [0, 3], [1, 4], [3, 4]];
const PEDGE63 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
/* the pyramid with the walk generator K highlighted */
function pyr63(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES63.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE63.forEach(([i, j]) => { const k = KEDGE63.some(([x, y]) => (x === i && y === j) || (x === j && y === i)); if (k && opt.K) line(P[i][0], P[i][1], P[j][0], P[j][1], C.gold, a * opt.K, 3.5); else dashed(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * (opt.K ? 0.3 : 0.8), 1.6); });
  if (opt.labels !== false) MODES63.forEach((m, k) => { dot(P[k][0], P[k][1], 12, m[2], a); lbl(opt.bits ? m[3] : m[0], P[k][0] + (k === 2 ? 0 : 30), P[k][1] + (k === 2 ? -22 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return P;
}
/* a big Omega built from a ring and two feet */
function omega63(cx, cy, r, a, col = C.cyan, lw = 6) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 0.72, Math.PI * 2.28); ctx.stroke();
  const lx = cx + r * Math.cos(Math.PI * 0.72), ly = cy + r * Math.sin(Math.PI * 0.72), rx = cx + r * Math.cos(Math.PI * 2.28), ry = cy + r * Math.sin(Math.PI * 2.28);
  ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx - r * 0.42, ly); ctx.moveTo(rx, ry); ctx.lineTo(rx + r * 0.42, ry); ctx.stroke(); ctx.restore();
}
function bars63(x0, y0, v, bw, gap, hs, a, col, labs, neg = C.red) {
  if (a <= 0) return;
  v.forEach((x, i) => { const xx = x0 + i * (bw + gap); line(xx - 4, y0, xx + bw + 4, y0, C.dim, a, 1.2); if (Math.abs(x) > 1e-9) { const h = x * hs; fillBox(xx, h > 0 ? y0 - h : y0, bw, Math.abs(h), x > 0 ? col : neg, a * 0.5); rect63(xx, h > 0 ? y0 - h : y0, bw, Math.abs(h), x > 0 ? col : neg, a, 1.8); } if (labs) lbl(labs[i], xx + bw / 2, y0 + (x < 0 ? Math.abs(x) * hs + 26 : 26), C.dim, a, 15); });
}
/* ---- film 064 helpers ---- */
function cells64(x, y, s, cw, a, col = C.cyan, hl = {}, size = 26) {
  if (a <= 0) return;
  for (let i = 0; i < s.length; i++) { const c = hl[i] || col; box(x + i * cw, y, cw - 8, cw - 8, c, a, 2, 'rgba(0,0,0,0.45)'); txt(s[i], x + i * cw + (cw - 8) / 2, y + (cw - 8) / 2 + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c, a }); }
}
/* pyramid with the three constrained flips coloured: G1 cyan, G2 gold, G3 magenta */
const GEDGE64 = [[[0, 1], [3, 4]], [[0, 2]], [[0, 3], [1, 4]]];
const GCOL64 = [C.cyan, C.gold, C.mag];
function pyrG64(cx, cy, s, ang, a, on = [1, 1, 1], lab = 1) {
  if (a <= 0) return;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES63.map(m => W3(m[1]));
  fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.1);
  PEDGE63.forEach(([i, j]) => dashed(P[i][0], P[i][1], P[j][0], P[j][1], C.dim, a * 0.35, 1.4));
  GEDGE64.forEach((es, g) => es.forEach(([i, j]) => { if (on[g] > 0) line(P[i][0], P[i][1], P[j][0], P[j][1], GCOL64[g], a * on[g], 4); }));
  MODES63.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(m[3], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -22 : 8), C.white, a * lab, 17, k === 2 ? 'center' : 'left'); });
}
function dial64(cx, cy, r, ang, col, a, lab) {
  if (a <= 0) return;
  ring(cx, cy, r, col, a * 0.7, 2); dashed(cx, cy, cx + r, cy, C.dim, a * 0.6, 1.2);
  const x = cx + r * Math.cos(-ang), y = cy + r * Math.sin(-ang);
  line(cx, cy, x, y, col, a, 3.5); dot(x, y, 9, col === C.gold ? 'g' : col === C.mag ? 'm' : 'c', a);
  if (lab) lblG(lab, cx, cy + r + 40, col, a, 24);
}
/* complete graph on k pentagon nodes, edges given as index pairs with colours */
function kgraph64(cx, cy, r, k, a, edges, labs) {
  if (a <= 0) return;
  const P = []; for (let i = 0; i < k; i++) { const th = -Math.PI / 2 + 2 * Math.PI * i / k; P.push([cx + r * Math.cos(th), cy + r * Math.sin(th)]); }
  edges.forEach(([i, j, col, q]) => { if (q > 0) line(P[i][0], P[i][1], P[j][0], P[j][1], col, a * q, 3); });
  P.forEach((p, i) => { ring(p[0], p[1], 20, C.white, a, 2); lbl(labs ? labs[i] : String(i), p[0], p[1] + 7, C.white, a, 18); });
  return P;
}
const FIB64 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
/* ---- film 077 data (from verify077.py / vis077.json) ---- */
const NANDPT77 = [[0.0, 0.0], [0.05, -0.025], [0.1, -0.05], [0.15, -0.075], [0.2, -0.1], [0.25, -0.125], [0.3, -0.15], [0.35, -0.175], [0.4, -0.2], [0.45, -0.225], [0.5, -0.25], [0.55, -0.275], [0.6, -0.3], [0.65, -0.325], [0.7, -0.35], [0.75, -0.375], [0.8, -0.4], [0.85, -0.425], [0.9, -0.45], [0.95, -0.475], [1.0, -0.5]];
const REFL77 = [[2, 0.434337, 0.737259], [4, 0.326596, 0.590106], [8, 0.122145, 0.242408], [16, 0.065943, 0.116771], [32, 0.057629, 0.116771], [64, 0.039696, 0.080631], [128, 0.01165, 0.027419], [256, 0.0031, 0.004921], [512, 0.003063, 0.004904]];
const REFLC77 = [2.0, 4.0, 6.0, 1.7168, 3.7168, 5.7168, 1.4336, 3.4336, 5.4336, 1.1504, 3.1504, 5.1504, 0.8673, 2.8673, 4.8673, 0.5841, 2.5841, 4.5841, 0.3009, 2.3009, 4.3009, 0.0177, 2.0177, 4.0177, 6.0177, 1.7345, 3.7345, 5.7345, 1.4513, 3.4513, 5.4513, 1.1681, 3.1681, 5.1681, 0.885, 2.885, 4.885, 0.6018, 2.6018, 4.6018, 0.3186, 2.3186, 4.3186, 0.0354, 2.0354, 4.0354, 6.0354, 1.7522, 3.7522, 5.7522, 1.469, 3.469, 5.469, 1.1858, 3.1858, 5.1858, 0.9027, 2.9027, 4.9027, 0.6195];
const REFT77 = [[2, 2, 1.1e-15], [3, 4, 4.2e-15], [4, 6, 5.8e-15], [5, 8, 6.4e-15], [6, 10, 8.9e-15], [7, 12, 1.1e-14]];
const KCDEF77 = [[0.0, 0.0], [0.025, 0.02438], [0.05, 0.0475], [0.075, 0.06938], [0.1, 0.09], [0.125, 0.10938], [0.15, 0.1275], [0.175, 0.14438], [0.2, 0.16], [0.225, 0.17438], [0.25, 0.1875], [0.275, 0.19938], [0.3, 0.21], [0.325, 0.21937], [0.35, 0.2275], [0.375, 0.23438], [0.4, 0.24], [0.425, 0.24438], [0.45, 0.2475], [0.475, 0.24938], [0.5, 0.25], [0.525, 0.24938], [0.55, 0.2475], [0.575, 0.24438], [0.6, 0.24], [0.625, 0.23438], [0.65, 0.2275], [0.675, 0.21937], [0.7, 0.21], [0.725, 0.19937], [0.75, 0.1875], [0.775, 0.17437], [0.8, 0.16], [0.825, 0.14437], [0.85, 0.1275], [0.875, 0.10938], [0.9, 0.09], [0.925, 0.06937], [0.95, 0.0475], [0.975, 0.02437], [1.0, 0.0]];
const DRIFT77 = [[1, -0.8, 0.2943, 1.0, 0.66265, 0.32], [2, -0.9, 0.33109, 0.5, 0.37274, 0.18], [3, -0.93333, 0.34335, 0.33333, 0.2577, 0.12444], [4, -0.95, 0.34949, 0.25, 0.19673, 0.095], [5, -0.96, 0.35316, 0.2, 0.15904, 0.0768], [6, -0.96667, 0.35562, 0.16667, 0.13345, 0.06444], [7, -0.97143, 0.35737, 0.14286, 0.11495, 0.05551], [8, -0.975, 0.35868, 0.125, 0.10095, 0.04875], [9, -0.97778, 0.3597, 0.11111, 0.08999, 0.04346], [10, -0.98, 0.36052, 0.1, 0.08118, 0.0392], [11, -0.98182, 0.36119, 0.09091, 0.07393, 0.0357], [12, -0.98333, 0.36175, 0.08333, 0.06788, 0.03278], [13, -0.98462, 0.36222, 0.07692, 0.06274, 0.0303], [14, -0.98571, 0.36262, 0.07143, 0.05832, 0.02816], [15, -0.98667, 0.36297, 0.06667, 0.05448, 0.02631], [16, -0.9875, 0.36328, 0.0625, 0.05112, 0.02469], [17, -0.98824, 0.36355, 0.05882, 0.04815, 0.02325], [18, -0.98889, 0.36379, 0.05556, 0.04551, 0.02198], [19, -0.98947, 0.36401, 0.05263, 0.04314, 0.02083], [20, -0.99, 0.3642, 0.05, 0.041, 0.0198]];
const BARG77 = [[1, 1.224893, 0.006869, 0.0023289, 0.0064621], [2, 1.106572, 0.011457, 0.0051296, 0.0102445], [3, 1.069612, 0.0134553, 0.0064648, 0.0118005], [4, 1.051661, 0.014557, 0.0072222, 0.0126391], [5, 1.041064, 0.0152529, 0.0077073, 0.0131624], [6, 1.034073, 0.0157319, 0.0080441, 0.0135198], [7, 1.029115, 0.0160815, 0.0082913, 0.0137793], [8, 1.025416, 0.0163479, 0.0084803, 0.0139763], [9, 1.022551, 0.0165575, 0.0086296, 0.0141309], [10, 1.020267, 0.0167269, 0.0087505, 0.0142554], [11, 1.018402, 0.0168665, 0.0088503, 0.0143579], [12, 1.016852, 0.0169835, 0.0089341, 0.0144437], [13, 1.015542, 0.0170831, 0.0090055, 0.0145166], [14, 1.014422, 0.0171688, 0.009067, 0.0145793], [15, 1.013452, 0.0172434, 0.0091206, 0.0146338], [16, 1.012604, 0.0173088, 0.0091677, 0.0146816], [17, 1.011857, 0.0173668, 0.0092094, 0.0147239], [18, 1.011193, 0.0174184, 0.0092466, 0.0147615], [19, 1.0106, 0.0174647, 0.0092799, 0.0147953], [20, 1.010067, 0.0175065, 0.00931, 0.0148257], [21, 1.009584, 0.0175443, 0.0093373, 0.0148532], [22, 1.009146, 0.0175788, 0.0093622, 0.0148783], [23, 1.008746, 0.0176103, 0.0093849, 0.0149012], [24, 1.00838, 0.0176393, 0.0094058, 0.0149223], [25, 1.008043, 0.0176659, 0.0094251, 0.0149416], [26, 1.007732, 0.0176906, 0.0094429, 0.0149595], [27, 1.007444, 0.0177134, 0.0094594, 0.0149761], [28, 1.007177, 0.0177346, 0.0094747, 0.0149916], [29, 1.006928, 0.0177544, 0.009489, 0.0150059], [30, 1.006696, 0.0177729, 0.0095024, 0.0150193], [31, 1.006479, 0.0177902, 0.0095149, 0.0150319], [32, 1.006276, 0.0178064, 0.0095266, 0.0150437], [33, 1.006085, 0.0178217, 0.0095377, 0.0150547], [34, 1.005905, 0.017836, 0.0095481, 0.0150652], [35, 1.005736, 0.0178496, 0.0095579, 0.015075], [36, 1.005576, 0.0178624, 0.0095671, 0.0150843], [37, 1.005425, 0.0178745, 0.0095759, 0.0150931], [38, 1.005282, 0.017886, 0.0095842, 0.0151014], [39, 1.005146, 0.0178969, 0.0095921, 0.0151093], [40, 1.005017, 0.0179073, 0.0095996, 0.0151168]];
const BARGLIM77 = [0.009896, 0.015412];
const REC77 = {"1": {"c": [0.002095, 0.20762, 0.019956, 0.770329], "R": [0.002095, 0.20762, 0.010875, 0.779409], "gap": 0.00908}, "2": {"c": [0.003823, 0.278607, 0.0279, 0.68967], "R": [0.003823, 0.278607, 0.015246, 0.702325], "gap": 0.012655}, "5": {"c": [0.005393, 0.326749, 0.033119, 0.63474], "R": [0.005393, 0.326749, 0.018027, 0.649831], "gap": 0.015091}, "10": {"c": [0.006032, 0.343717, 0.034915, 0.615337], "R": [0.006032, 0.343717, 0.018962, 0.63129], "gap": 0.015953}};
const DSTAR77 = 0.005427;
const FM77 = [[0.0, 0.9947, 0.75], [0.2, 0.9916, 0.6], [0.4286, 0.9404, 0.4286], [0.6, 0.9594, 0.6], [1.0, 1.0, 1.0], [0.5795, 0.9705, 0.5795], [0.0244, 0.9803, 0.7317], [0.4431, 0.9894, 0.4431], [0.157, 0.96, 0.6322], [0.8938, 0.9938, 0.8938], [0.0814, 0.9296, 0.6889], [0.0949, 0.9831, 0.6789], [0.1959, 0.9867, 0.6031], [0.6503, 0.9662, 0.6503], [0.5961, 0.9866, 0.5961], [0.5987, 0.9986, 0.5987], [0.8548, 0.9925, 0.8548], [0.0531, 0.9562, 0.7102], [0.9818, 0.9984, 0.9818], [0.533, 0.9746, 0.533]];
const CONV77 = [[1, 0.703091, 0.555556, 0.049285, 0.744, 0.084187, 0.68], [2, 0.684065, 0.526316, 0.042343, 0.543071, 0.07527, 0.492301], [3, 0.678097, 0.517241, 0.036691, 0.441627, 0.066037, 0.401744], [4, 0.675178, 0.512821, 0.032704, 0.379306, 0.05922, 0.346637], [5, 0.673447, 0.510204, 0.029753, 0.336448, 0.054071, 0.3088], [6, 0.672301, 0.508475, 0.027467, 0.304809, 0.050035, 0.280837], [7, 0.671486, 0.507246, 0.025633, 0.280291, 0.046773, 0.259123], [8, 0.670877, 0.506329, 0.02412, 0.260608, 0.044069, 0.24165], [9, 0.670405, 0.505618, 0.022846, 0.244381, 0.041781, 0.227207], [10, 0.670028, 0.505051, 0.021753, 0.230717, 0.039814, 0.215018], [11, 0.66972, 0.504587, 0.020803, 0.219017, 0.038099, 0.204554], [12, 0.669464, 0.504202, 0.019967, 0.208858, 0.036588, 0.195448], [13, 0.669247, 0.503876, 0.019224, 0.199933, 0.035242, 0.187432], [14, 0.669062, 0.503597, 0.018558, 0.192016, 0.034035, 0.180306], [15, 0.668901, 0.503356, 0.017957, 0.184932, 0.032943, 0.173917], [16, 0.668761, 0.503145, 0.017411, 0.178547, 0.03195, 0.168149], [17, 0.668637, 0.502959, 0.016911, 0.172755, 0.031041, 0.162907], [18, 0.668527, 0.502793, 0.016452, 0.16747, 0.030205, 0.158116], [19, 0.668429, 0.502646, 0.016029, 0.162624, 0.029434, 0.153716], [20, 0.66834, 0.502513, 0.015636, 0.15816, 0.028719, 0.149657], [21, 0.66826, 0.502392, 0.015271, 0.154031, 0.028053, 0.145897], [22, 0.668188, 0.502283, 0.014931, 0.150197, 0.027431, 0.142401], [23, 0.668121, 0.502183, 0.014612, 0.146626, 0.026849, 0.13914], [24, 0.66806, 0.502092, 0.014313, 0.143289, 0.026303, 0.13609], [25, 0.668004, 0.502008, 0.014031, 0.140162, 0.025788, 0.133228], [26, 0.667953, 0.501931, 0.013766, 0.137224, 0.025303, 0.130536], [27, 0.667905, 0.501859, 0.013514, 0.134457, 0.024844, 0.127998], [28, 0.667861, 0.501792, 0.013277, 0.131846, 0.024409, 0.1256], [29, 0.667819, 0.50173, 0.013051, 0.129375, 0.023996, 0.123329], [30, 0.667781, 0.501672, 0.012836, 0.127034, 0.023603, 0.121176], [31, 0.667745, 0.501618, 0.012632, 0.124812, 0.02323, 0.119129], [32, 0.667711, 0.501567, 0.012437, 0.122699, 0.022873, 0.117181], [33, 0.667679, 0.50152, 0.012251, 0.120685, 0.022532, 0.115324], [34, 0.667649, 0.501475, 0.012073, 0.118765, 0.022206, 0.113551], [35, 0.667621, 0.501433, 0.011903, 0.116931, 0.021894, 0.111856], [36, 0.667595, 0.501393, 0.011739, 0.115177, 0.021594, 0.110234], [37, 0.66757, 0.501355, 0.011582, 0.113497, 0.021307, 0.108679], [38, 0.667546, 0.501319, 0.011431, 0.111886, 0.02103, 0.107187], [39, 0.667523, 0.501285, 0.011286, 0.110339, 0.020764, 0.105754], [40, 0.667502, 0.501253, 0.011147, 0.108854, 0.020508, 0.104376], [41, 0.667481, 0.501222, 0.011012, 0.107425, 0.020262, 0.103049], [42, 0.667462, 0.501193, 0.010882, 0.106049, 0.020024, 0.101772], [43, 0.667443, 0.501166, 0.010757, 0.104723, 0.019794, 0.100539], [44, 0.667426, 0.501139, 0.010636, 0.103444, 0.019572, 0.09935], [45, 0.667409, 0.501114, 0.010519, 0.10221, 0.019357, 0.098202], [46, 0.667393, 0.501089, 0.010405, 0.101018, 0.019149, 0.097092], [47, 0.667377, 0.501066, 0.010296, 0.099865, 0.018947, 0.096018], [48, 0.667362, 0.501044, 0.010189, 0.09875, 0.018752, 0.094979], [49, 0.667348, 0.501022, 0.010086, 0.09767, 0.018563, 0.093972], [50, 0.667334, 0.501002, 0.009986, 0.096624, 0.018379, 0.092996], [51, 0.667321, 0.500982, 0.009889, 0.09561, 0.018201, 0.092049], [52, 0.667309, 0.500963, 0.009795, 0.094626, 0.018028, 0.091131], [53, 0.667297, 0.500945, 0.009703, 0.093672, 0.01786, 0.090239], [54, 0.667285, 0.500928, 0.009614, 0.092745, 0.017696, 0.089372], [55, 0.667274, 0.500911, 0.009527, 0.091844, 0.017537, 0.088529], [56, 0.667263, 0.500894, 0.009443, 0.090968, 0.017382, 0.08771], [57, 0.667252, 0.500879, 0.00936, 0.090116, 0.017231, 0.086912], [58, 0.667242, 0.500864, 0.00928, 0.089287, 0.017083, 0.086136], [59, 0.667232, 0.500849, 0.009202, 0.08848, 0.01694, 0.08538], [60, 0.667223, 0.500835, 0.009126, 0.087694, 0.0168, 0.084643]];
const BORN77 = [[0.2, 0.06556], [0.35, 0.063793], [0.5, 0.061188], [0.65, 0.057738], [0.8, 0.053462], [0.95, 0.048406], [1.1, 0.042646], [1.25, 0.03628], [1.4, 0.029428], [1.55, 0.022228], [1.7, 0.014825], [1.85, 0.007368], [2.0, 0.0], [2.1, -0.004795], [2.25, -0.011722], [2.4, -0.018237], [2.55, -0.024255], [2.7, -0.029709], [2.85, -0.034557], [3.0, -0.038777], [3.15, -0.042362], [3.3, -0.045323], [3.45, -0.047684], [3.6, -0.049479], [3.75, -0.050746], [3.9, -0.051531], [4.05, -0.051883], [4.2, -0.051849], [4.35, -0.051478], [4.5, -0.050815], [4.65, -0.049905], [4.8, -0.048788], [4.95, -0.047502], [5.1, -0.046081], [5.25, -0.044555], [5.4, -0.042952], [5.55, -0.041295], [5.7, -0.039605], [5.85, -0.037901], [6.0, -0.036196]];
const EPS77 = [[-0.6, -0.064147], [-0.3, -0.029589], [0.0, 0.0], [0.3, 0.02562], [0.6, 0.048018], [1.0, 0.073842], [2.0, 0.123759]];
const FCURVE77 = [[0.02, 0.0004, 0.00061], [0.03, 0.0009, 0.00175], [0.04, 0.0016, 0.00298], [0.05, 0.0025, 0.00494], [0.06, 0.0036, 0.00603], [0.07, 0.0049, 0.00503], [0.08, 0.0064, 0.0128], [0.09, 0.0081, 0.0081], [0.1, 0.01, 0.01952], [0.11, 0.0121, 0.01536], [0.12, 0.0144, 0.01886], [0.13, 0.0169, 0.03373], [0.14, 0.0196, 0.02476], [0.15, 0.0225, 0.02532], [0.16, 0.0256, 0.04792], [0.17, 0.0289, 0.05288], [0.18, 0.0324, 0.03729], [0.19, 0.0361, 0.0394], [0.2, 0.04, 0.06747], [0.21, 0.0441, 0.08812], [0.22, 0.0484, 0.07906], [0.23, 0.0529, 0.05878], [0.24, 0.0576, 0.06024], [0.25, 0.0625, 0.09146], [0.26, 0.0676, 0.12891], [0.27, 0.0729, 0.14339], [0.28, 0.0784, 0.12751], [0.29, 0.0841, 0.10034], [0.3, 0.09, 0.09001], [0.31, 0.0961, 0.11178], [0.32, 0.1024, 0.1582], [0.33, 0.1089, 0.20578], [0.34, 0.1156, 0.2309], [0.35, 0.1225, 0.22375], [0.36, 0.1296, 0.19284], [0.37, 0.1369, 0.15921], [0.38, 0.1444, 0.14505], [0.39, 0.1521, 0.16306], [0.4, 0.16, 0.21136], [0.41, 0.1681, 0.27528], [0.42, 0.1764, 0.33413], [0.43, 0.1849, 0.36969], [0.44, 0.1936, 0.37282], [0.45, 0.2025, 0.34613], [0.46, 0.2116, 0.30242], [0.47, 0.2209, 0.25989], [0.48, 0.2304, 0.23615], [0.49, 0.2401, 0.24302], [0.5, 0.25, 0.28343], [0.51, 0.2601, 0.3511], [0.52, 0.2704, 0.43274], [0.53, 0.2809, 0.51178], [0.54, 0.2916, 0.57263], [0.55, 0.3025, 0.6043], [0.56, 0.3136, 0.6027], [0.57, 0.3249, 0.57115], [0.58, 0.3364, 0.51936], [0.59, 0.3481, 0.46107], [0.6, 0.36, 0.41119], [0.61, 0.3721, 0.38286], [0.62, 0.3844, 0.38506], [0.63, 0.3969, 0.42127], [0.64, 0.4096, 0.48903], [0.65, 0.4225, 0.58069], [0.66, 0.4356, 0.68483], [0.67, 0.4489, 0.78827], [0.68, 0.4624, 0.87815], [0.69, 0.4761, 0.94388], [0.7, 0.49, 0.9785], [0.71, 0.5041, 0.9796], [0.72, 0.5184, 0.9494], [0.73, 0.5329, 0.8943], [0.74, 0.5476, 0.82389], [0.75, 0.5625, 0.74957], [0.76, 0.5776, 0.68316], [0.77, 0.5929, 0.6354], [0.78, 0.6084, 0.61478], [0.79, 0.6241, 0.62663], [0.8, 0.64, 0.6727], [0.81, 0.6561, 0.75103], [0.82, 0.6724, 0.85635], [0.83, 0.6889, 0.98071], [0.84, 0.7056, 1.11437], [0.85, 0.7225, 1.24683], [0.86, 0.7396, 1.36784], [0.87, 0.7569, 1.46836], [0.88, 0.7744, 1.54134], [0.89, 0.7921, 1.58228], [0.9, 0.81, 1.58956], [0.91, 0.8281, 1.56443], [0.92, 0.8464, 1.51087], [0.93, 0.8649, 1.43515], [0.94, 0.8836, 1.34528], [0.95, 0.9025, 1.25029], [0.96, 0.9216, 1.15955], [0.97, 0.9409, 1.08204], [0.98, 0.9604, 1.02569], [0.99, 0.9801, 0.99688], [1.0, 1.0, 1.0]];
const YLAT77 = [1.0, 0.78615, 0.61803, 0.48587, 0.38197, 0.30028, 0.23607, 0.18559, 0.1459];
const TEN77 = {"born": 2.22e-16, "p3": 0.0759, "eps": 0.169};
/* ---- film 077 helpers ---- */
function cell73(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function same77(x, y) { return JSON.stringify(x) === JSON.stringify(y); }
function comb77(C, k, base = 'b') { let w = base; for (let i = 0; i < k; i++) w = [w, C]; return w; }
/* draw an ordered binary tree: leaves 'a' (alpha, gold) and 'b' (beta, cyan); equal-child nodes can be ringed */
function tree77(t, x, y, w, dy, a, o = {}) {
  if (a <= 0) return;
  if (typeof t === 'string') {
    dot(x, y, o.r || 9, t === 'a' ? 'g' : 'c', a);
    if (o.lab) lblG(t === 'a' ? 'α' : 'β', x, y + 30, t === 'a' ? C.gold : C.cyan, a, o.ls || 18);
    return;
  }
  const xl = x - w / 2, xr = x + w / 2, yy = y + dy;
  line(x, y, xl, yy, o.ec || C.dim, a, 2); line(x, y, xr, yy, o.ec || C.dim, a, 2);
  tree77(t[0], xl, yy, w / 2, dy, a, o); tree77(t[1], xr, yy, w / 2, dy, a, o);
  const eq = same77(t[0], t[1]);
  dot(x, y, 5, 'w', a * 0.8);
  if (eq && o.eq) { const col = o.eqc ? o.eqc(t) : C.mag; ring(x, y, 11, col, a * o.eq, 2.5); }
}
function qcount77(t) { return typeof t === 'string' ? 0 : qcount77(t[0]) + qcount77(t[1]) + (same77(t[0], t[1]) ? 1 : 0); }
/* a comb <...<<base, C>, C>..., C> drawn as a diagonal spine with small teeth */
function combDraw77(x0, y0, k, a, toothFn, o = {}) {
  if (a <= 0) return;
  const dx = o.dx || 70, dy = o.dy || 52;
  for (let i = 0; i < k; i++) {
    const x = x0 - i * dx, y = y0 + i * dy, nx = x0 - (i + 1) * dx, ny = y0 + (i + 1) * dy;
    line(x, y, nx, ny, C.dim, a, 2);
    line(x, y, x + dx * 0.55, y + dy, C.dim, a, 2);
    toothFn(x + dx * 0.55, y + dy, i);
    dot(x, y, 5, 'w', a * 0.8);
  }
  dot(x0 - k * dx, y0 + k * dy, 9, 'c', a);
  if (o.lab) lblG('β', x0 - k * dx - 22, y0 + k * dy + 8, C.cyan, a, 18, 'right');
}
function ball77(cx, cy, R, a, col = C.cyan) {
  if (a <= 0) return;
  ring(cx, cy, R, col, a, 2.5);
  ctx.save(); ctx.globalAlpha = a * 0.45; ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.3, 0, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.3, R, 0, 0, TAU); ctx.stroke(); ctx.restore();
  fillPoly(ringPts(cx, cy, R, 48), col, a * 0.05);
}
function wire77(x0, x1, y, s, a, col = C.cyan) { line(x0, y, x1, y, col, a, 2); if (s) lbl(s, x0 - 16, y + 7, C.white, a, 18, 'right'); }
function gate77(x, y, s, col, a, w = 64, h = 52, size = 22) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.75)'); lblG(s, x, y + size * 0.36, col, a, size); }
function bars77(x0, y0, vals, bw, gap, hs, a, cols, labs, maxh) {
  vals.forEach((v, i) => { const h = Math.min(maxh || 1e9, v * hs), x = x0 + i * (bw + gap); fillBox(x, y0 - h, bw, h, cols[i % cols.length], a * 0.45); rect63(x, y0 - h, bw, h, cols[i % cols.length], a, 1.6); if (labs) lbl(labs[i], x + bw / 2, y0 + 24, C.dim, a, 15); });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const pq = Q(S, 0, 'Part one set up', 0.6);
  chip(470, 720, 600, 50, 'PART I · quantum principles of the Fibonacci atom', C.dim, pq, 17);
  const items = [['a truth table', 'TRUTH TABLE → CHANNELS', 'NAND : one closed ball of CPTP maps', C.gold], ['a shared bus', 'REFLECTIONS AND A BUS', 'three fixed reflections , ABAB = I − 2Q⊗R', C.cyan], ['how kernels on the source trees carry phase', 'SOURCE-TREE KERNELS', 'exact ⇒ {0, 1} ;  approximate ⇒ loop phase', C.mag], ['why no-signalling picks the square law', 'NO-SIGNALLING → BORN', '|ψ_w|ᵖ with p = 2', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 340, 58, 'one ball of channels', C.gold, rp, 22); chip(330, 445, 340, 58, 'three reflections', C.mag, rp, 22); chip(330, 530, 340, 58, 'a loop phase ≠ 0', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('a power fixed at two', 1610, 410, C.cyan, rp, 22); lblG('|ψ_w|ᵖ  ⇒  p = 2', 1610, 470, C.white, rp, 28);
  txt(scramble('AURIC QP II · LOOP PHASES', rp, 477), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 量 子 原 理 第 二 部 · 门 合 同 、闭 路 相 位 与 平 方 律', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 077 · AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION_CONTINUATION · §37–§76', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 NAND ---- */
SCENES.nand = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Every channel with this truth table', 0.6);
  if (f1 > 0) {
    const q0 = Q(S, 0, 'Start with NAND', 0.6) * f1;
    const ys = [330, 420, 510];
    ['a', 'b', 'c'].forEach((s, i) => wire77(220, 860, ys[i], '|' + s + '⟩', q0));
    const tq = Q(S, 0, 'X on the target times a Toffoli', 0.6) * f1;
    dot(420, ys[0], 10, 'g', tq); dot(420, ys[1], 10, 'g', tq); line(420, ys[0], 420, ys[2] + 22, C.gold, tq, 2.5); ring(420, ys[2], 22, C.gold, tq, 2.5); line(398, ys[2], 442, ys[2], C.gold, tq, 2.5);
    lbl('CCX', 420, 290, C.gold, tq, 17);
    gate77(600, ys[2], 'X', C.mag, tq);
    lbl('|a⟩', 880, ys[0] + 7, C.white, tq, 18, 'left'); lbl('|b⟩', 880, ys[1] + 7, C.white, tq, 18, 'left'); lbl('|c ⊕ (1 ⊕ ab)⟩', 880, ys[2] + 7, C.white, tq, 18, 'left');
    const sq = Q(S, 0, 'a three-bit permutation with square one', 0.6) * f1;
    chip(540, 610, 780, 56, 'N = X_c · CCX :  permutation of 8 basis states ,  N² = I', C.gold, sq, 20);
    const wq = Q(S, 0, 'that writes NAND and keeps the inputs', 0.6) * f1;
    lbl('c = 0 :  inputs kept , target = NAND(a, b)', 1380, 255, C.cyan, wq, 18);
    [['0 0', '1'], ['0 1', '1'], ['1 0', '1'], ['1 1', '0']].forEach(([ab, v], i) => { const qq = clamp(wq * 1.6 - i / 6), y = 285 + i * 62; cell73(1180, y, 200, 50, ab, C.cyan, qq, 22); arrow(1392, y + 25, 1440, y + 25, C.dim, qq, 2); cell73(1450, y, 200, 50, ab + ' ' + v, v === '1' ? C.gold : C.mag, qq, 22); });
    const bq = Q(S, 0, 'bare NAND, four inputs onto two outputs', 0.6) * f1;
    box(1090, 560, 690, 200, C.red, bq, 2, 'rgba(40,0,10,0.4)');
    lbl('bare NAND :  ℂ⁴ → ℂ²', 1435, 600, C.red, bq, 22);
    for (let i = 0; i < 4; i++) { dot(1200, 630 + i * 33, 8, 'c', bq); }
    for (let i = 0; i < 2; i++) { dot(1440, 663 + i * 33, 8, 'g', bq); }
    for (let i = 0; i < 4; i++) arrow(1212, 630 + i * 33, 1428, 663 + (i === 3 ? 0 : 1) * 33, C.dim, bq * 0.7, 1.5);
    stamp('NOT UNITARY', 1615, 728, Q(S, 0, 'cannot be unitary', 0.6) * f1, C.red, 19, -0.04);
    lblG('|+⟩|0⟩ ↦ (|00⟩ + |11⟩)/√2 ≠ |+⟩|+⟩ : no copying of unknown states', 540, 690, C.dim, bq, 16);
    lbl('reversible Boolean permutations are real 0/1 matrices : no free complex phase', 540, 730, C.dim, bq, 15);
  }
  const q = Q(S, 1, 'Every channel with this truth table', 0.6, 0.3);
  if (q > 0) {
    const cx = 330, cy = 420, R = 165;
    ball77(cx, cy, R, q, C.cyan);
    const zx = cx + R * 0.55 * Math.cos(0.6 + t * 0.15), zy = cy - R * 0.55 * Math.sin(0.6 + t * 0.15);
    line(cx, cy, zx, zy, C.gold, q, 2.5); dot(zx, zy, 11, 'g', q); lblG('z', zx + 16, zy - 8, C.gold, q, 24, 'left');
    lblG('‖z‖ ≤ 1 ,  z ∈ ℂ³', cx, cy + R + 40, C.white, q, 20);
    const sp = Q(S, 1, 'three on the sphere', 0.6);
    dot(cx + R * Math.cos(2.4), cy - R * Math.sin(2.4), 10, 'm', sp); lbl('sphere', cx + R * Math.cos(2.4) - 18, cy - R * Math.sin(2.4) - 12, C.mag, sp, 15, 'right');
    lbl('Φ_z(X) =', 590, 300, C.white, q, 20, 'left');
    lblG('[  X_bb          Σ z̄_j X_bj ]', 720, 300, C.white, q, 20, 'left');
    lblG('[  Σ z_j X_jb    Σ X_jj      ]', 720, 340, C.white, q, 20, 'left');
    lbl('j ∈ {00, 01, 10} ,  b = 11   (37.1)', 720, 380, C.dim, q, 15, 'left');
    const cq = Q(S, 1, 'a bit flip with coherence equal to the length of z', 0.6);
    chip(760, 450, 440, 54, 'code span{u, b} :', C.cyan, cq, 19);
    lblG('Φ(|u⟩⟨b|) = ‖z‖ |1⟩⟨0|', 760, 515, C.cyan, cq, 22);
    lbl('logical flip, then dephasing with factor ‖z‖', 760, 550, C.dim, cq, 15);
    const eq = Q(S, 1, 'entanglement breaking only at zero', 0.6);
    const px = 1060, py = 520, pw = 680, ph = 250, xS = x => px + x * pw, yS = v => py - ph - v / 0.55 * ph;
    plotAxes(px, py, pw, ph, eq, '‖z‖', 'min eigenvalue of output partial transpose');
    line(px, yS(0), px + pw, yS(0), C.dim, eq * 0.6, 1);
    curve(p => { const i = Math.min(NANDPT77.length - 1, Math.floor(p * (NANDPT77.length - 1))); return [xS(NANDPT77[i][0]), yS(NANDPT77[i][1])]; }, NANDPT77.length - 1, C.red, eq, 3);
    NANDPT77.forEach((r, i) => { if (i % 4 === 0) dot(xS(r[0]), yS(r[1]), 5, 'r', eq); });
    lbl('= −‖z‖/2 < 0  : entangled for every z ≠ 0', px + 20, yS(-0.4), C.red, eq, 16, 'left');
    lbl('0', xS(0), py + 26, C.dim, eq, 14); lbl('1', xS(1), py + 26, C.dim, eq, 14);
    const kq = Q(S, 1, 'with Kraus rank four inside', 0.6);
    [['‖z‖ < 1', 4, C.cyan], ['‖z‖ = 1', 3, C.mag]].forEach(([lab, v, col], i) => { const y = 640 + i * 70, qq = i === 0 ? kq : sp; fillBox(1200, y, v * 110, 50, col, qq * 0.4); rect63(1200, y, v * 110, 50, col, qq, 1.6); lbl(lab, 1180, y + 33, C.white, qq, 17, 'right'); lbl('Kraus rank ' + v, 1200 + v * 110 + 20, y + 33, col, qq, 18, 'left'); });
    stamp('EB ⟺ z = 0', 600, 700, eq, C.red, 30, -0.04);
  }
};

/* ---- 03 REFLECTIONS ---- */
SCENES.reflect = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Exactness is another contract', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Powers of one fixed gate commute', 0.6) * f1;
    const cx = 330, cy = 440, R = 140;
    ring(cx, cy, R, C.dim, q, 2);
    REFLC77.forEach((an, i) => { const qq = clamp(q * 1.8 - i / 70); dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 6, 'c', qq); });
    lbl('powers of T = R_v R_u : one circle', cx, cy + R + 40, C.cyan, q, 16);
    const mq = Q(S, 0, 'two fixed involutions only fill a circle and its mirror', 0.6) * f1;
    ring(cx + 360, cy, R, C.dim, mq, 2);
    REFLC77.forEach((an, i) => { const qq = clamp(mq * 1.8 - i / 70); dot(cx + 360 + R * Math.cos(-an), cy - R * Math.sin(-an), 6, 'm', qq); });
    lbl('R ⟨T⟩ : the mirror', cx + 360, cy + R + 40, C.mag, mq, 16);
    lbl('closure K ∪ RK ,  K abelian  ⇒  not all of PU(d)', cx + 180, cy - R - 30, C.white, mq, 17);
    stamp('NOT DENSE', cx + 180, cy + R + 105, Q(S, 0, 'so neither is dense', 0.6) * f1, C.red, 24, -0.04);
    const gq = Q(S, 0, 'Three fixed qubit reflections', 0.6) * f1;
    chip(1400, 250, 760, 52, 'R₀ = Z ,  R₁ = cos α Z + sin α X ,  R₂ = cos α Z + sin α Y', C.gold, gq, 19);
    chip(1400, 315, 760, 52, 'R₁R₀ = e^(−iαY) ,  R₂R₀ = e^(iαX) ,  α/π irrational', C.gold, gq, 19);
    const dq = Q(S, 0, 'are dense in PU two', 0.6) * f1;
    const px = 1080, py = 780, pw = 640, ph = 340, xS = N => px + (Math.log2(N) - 1) / 8 * pw, yS = v => py - (Math.log10(v) + 3.2) / 3.2 * ph;
    plotAxes(px, py, pw, ph, dq, '', 'Euler-word error , 12 Haar targets');
    lbl('N', px + pw + 14, py + 6, C.dim, dq, 18, 'left');
    curve(p => { const i = Math.min(REFL77.length - 1, Math.round(p * (REFL77.length - 1))); return [xS(REFL77[i][0]), yS(REFL77[i][1])]; }, REFL77.length - 1, C.cyan, dq, 3);
    REFL77.forEach(r => { dot(xS(r[0]), yS(r[1]), 7, 'c', dq); dot(xS(r[0]), yS(r[2]), 5, 'm', dq * 0.8); lbl(String(r[0]), xS(r[0]), py + 24, C.dim, dq, 13); });
    [1, 0.1, 0.01, 0.001].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, dq, 13, 'right'));
    lbl('cyan : mean   magenta : max', px + pw, py - ph + 10, C.dim, dq, 14, 'right');
    lbl('words e^(−iαkY) e^(iαlX) e^(−iαmY) , |k|,|l|,|m| ≤ N', 1400, 400, C.dim, dq, 15);
    stamp('DENSE IN PU(2)', 1270, 715, dq, C.green, 24, -0.04);
  }
  const q = Q(S, 1, 'Exactness is another contract', 0.6, 0.3);
  if (q > 0) {
    const gx = 220, gy = 280, cw = 70, d = 5;
    for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) {
      const plane = (i === d - 1 && j < d - 1) || (j === d - 1 && i < d - 1) || (i === j);
      const col = i === j ? C.gold : plane ? C.cyan : C.dim;
      box(gx + j * cw, gy + i * cw, cw - 8, cw - 8, col, q * (plane ? 1 : 0.35), 1.5, 'rgba(0,0,0,0.45)');
      if (i === j) lblG(i < d - 1 ? 'e^(iθ' + (i + 1) + ')' : 'e^(−Σθ)', gx + j * cw + 31, gy + i * cw + 40, C.gold, q, 12);
    }
    lbl('D = diag(e^(iθ₁), …) :  each (j, d) plane uses R_u R_v', 540, gy + d * cw + 28, C.white, q, 16);
    const fq = Q(S, 1, 'every element of SU d is a product of at most two times d minus one rank-one reflections', 0.6);
    chip(540, 725, 840, 56, 'U = V D V† = ∏_j (V R_uj V†)(V R_vj V†) ,  ≤ 2(d − 1) factors', C.cyan, fq, 19);
    lblG('u_j = (e_j + e_d)/√2 ,  v_j = (e_j + e^(iθ_j) e_d)/√2', 540, 792, C.dim, fq, 17);
    const tq = Q(S, 1, 'rank-one reflections', 0.6);
    lbl('d', 1150, 290, C.dim, tq, 18); lbl('reflections', 1360, 290, C.dim, tq, 18); lbl('max residual', 1610, 290, C.dim, tq, 18);
    REFT77.forEach((r, i) => { const qq = clamp(tq * 1.6 - i / 8), y = 320 + i * 58; cell73(1100, y, 100, 46, String(r[0]), C.gold, qq, 20); cell73(1250, y, 220, 46, String(r[1]), C.cyan, qq, 20); cell73(1500, y, 220, 46, r[2].toExponential(0), C.green, qq, 17); });
    lbl('5 Haar targets per d , recomputed', 1410, 690, C.dim, tq, 15);
    stamp('TARGET-DEPENDENT', 1410, 770, Q(S, 1, 'their directions depend on the target', 0.6), C.mag, 26, -0.04);
  }
};

/* ---- 04 BUS ---- */
SCENES.bus = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'A shared coherent record must be supplied', 0.6);
  const f1 = 1 - Q(S, 1, 'Then A B A B is exactly', 0.6);
  const dimC = 0.55 + 0.45 * f1;
  const yA = 330, yB = 450, yb = 590;
  wire77(240, 940, yA, 'system A', q0 * dimC); wire77(240, 940, yB, 'system B', q0 * dimC);
  const bq = Q(S, 0, 'Give one bus qubit', 0.6);
  wire77(240, 940, yb, 'bus', bq * dimC, C.gold);
  const aq = Q(S, 0, 'a gate that flips it when Q holds on system A', 0.6), rq = Q(S, 0, 'a gate that applies Z to it when R holds on system B', 0.6);
  [[380, 'A'], [520, 'B'], [660, 'A'], [800, 'B']].forEach(([x, g], i) => {
    const qa = i < 2 ? (g === 'A' ? aq : rq) * dimC : Q(S, 1, 'Then A B A B is exactly', 0.6);
    if (g === 'A') { gate77(x, yA, 'Q_A', C.cyan, qa, 70, 50, 19); line(x, yA + 25, x, yb - 26, C.cyan, qa, 2); gate77(x, yb, 'X', C.cyan, qa); }
    else { gate77(x, yB, 'R_B', C.mag, qa, 70, 50, 19); line(x, yB + 25, x, yb - 26, C.mag, qa, 2); gate77(x, yb, 'Z', C.mag, qa); }
  });
  if (f1 > 0) {
    chip(1400, 300, 780, 56, 'A = (I − Q_A) ⊗ I + Q_A ⊗ X_bus', C.cyan, aq * f1, 22);
    chip(1400, 400, 780, 56, 'B = (I − R_B) ⊗ I + R_B ⊗ Z_bus', C.mag, rq * f1, 22);
    lbl('Q_A , R_B : projections on different data systems', 1400, 470, C.dim, rq * f1, 16);
    lbl('the bus and both conditional gates are extra , explicitly supplied resources', 1400, 520, C.gold, bq * f1, 16);
    lbl('not produced by a Stinespring dilation or by the native instrument', 1400, 555, C.dim, bq * f1, 15);
  }
  const q = Q(S, 1, 'Then A B A B is exactly', 0.6, 0.3);
  if (q > 0) {
    chip(1400, 270, 800, 62, 'ABAB = (I_AB − 2 Q_A ⊗ R_B) ⊗ I_bus', C.gold, q, 24);
    lbl('max residual 2.2 × 10⁻¹⁵ on 30 random cases (random rank, bus entangled)', 1400, 330, C.dim, q, 14);
    const sq = Q(S, 1, 'with the bus untouched', 0.6);
    lbl('in each sector (q, r) :  X^q Z^r X^q Z^r = (−1)^(qr)', 1400, 385, C.white, sq, 17);
    [['0 0', '+1'], ['0 1', '+1'], ['1 0', '+1'], ['1 1', '−1']].forEach(([s, v], i) => { const qq = clamp(sq * 1.6 - i / 6); cell73(1060 + i * 180, 410, 160, 56, s + ' : ' + v, v === '−1' ? C.red : C.cyan, qq, 19); });
    const zq = Q(S, 1, 'Started at zero, three calls suffice', 0.6);
    chip(1400, 530, 800, 52, 'bus |0⟩ :  ABA (I ⊗ |0⟩) = (I − 2 Q_A⊗R_B) ⊗ |0⟩', C.green, zq, 20);
    const eq = Q(S, 1, 'the resulting gate entangles', 0.6);
    lbl('kernel/image vectors , equal superposition  →  ½ [[1, 1], [1, −1]] : rank 2', 1400, 600, C.white, eq, 16);
    stamp('BUS RETURNS', 1400, 700, Q(S, 1, 'even if it is unknown or entangled', 0.6), C.green, 30, -0.04);
  }
};

/* ---- 05 RIGIDITY ---- */
SCENES.rigid = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [1, null, 'lean'], [1, 'A faithful such kernel is the delta kernel', 'theory']]);
  const f1 = 1 - Q(S, 1, 'A faithful such kernel is the delta kernel', 0.6);
  const tq = Q(S, 0, 'all finite ordered binary trees in alpha and beta', 0.6);
  if (f1 > 0) {
    const orb = ['a', 'b', ['b', 'a'], [['b', 'a'], 'b'], [[['b', 'a'], 'b'], ['b', 'a']]];
    const xs = [170, 290, 430, 610, 830];
    orb.forEach((tr, i) => { const qq = clamp(tq * 1.6 - i / 6) * f1; tree77(tr, xs[i], 300, [0, 0, 70, 110, 160][i], 60, qq, { lab: i < 2 }); lblG('u' + '₀₁₂₃₄'[i], xs[i], 270, C.dim, qq, 16); if (i < 4) arrow(xs[i] + (i < 2 ? 25 : 45), 260, xs[i + 1] - 30, 260, C.dim, qq * 0.6, 1.5); });
    lbl('uₙ = ρⁿ α', 500, 240, C.dim, tq * f1, 15);
    const rq = Q(S, 0, 'with alpha sent to beta and beta to beta alpha', 0.6) * f1;
    chip(500, 560, 760, 52, 'ρ α = β ,  ρ β = ⟨β, α⟩ ,  ρ ⟨s, t⟩ = ⟨ρs, ρt⟩', C.cyan, rq, 20);
    lblG('ρ² uₙ = ⟨ρ uₙ , uₙ⟩  (on the α orbit)', 500, 625, C.white, rq, 20);
    lbl('ρ injective : checked on all 550 trees with ≤ 5 leaves', 500, 665, C.dim, rq, 15);
    const cq = Q(S, 0, 'A Hermitian, transport invariant, exactly multiplicative kernel', 0.6) * f1;
    [['K(t, s) = conj K(s, t)', C.white], ['K(ρs, ρt) = K(s, t)', C.cyan], ['K(⟨s,t⟩, ⟨u,v⟩) = K(s, u) K(t, v)', C.gold]].forEach(([s, col], i) => chip(1400, 260 + i * 66, 760, 52, s, col, clamp(cq * 1.6 - i / 5), 21));
    lblG('aₙ = K(α, ρⁿα) = K(⟨β,α⟩, ⟨ρⁿ⁺¹α, ρⁿα⟩) = aₙ²', 1400, 490, C.white, cq, 19);
    const vq = Q(S, 0, 'takes only the values zero and one', 0.6) * f1;
    chip(1400, 570, 760, 64, 'K(s, t) ∈ {0, 1}  for all source trees', C.green, vq, 27);
    box(1030, 640, 740, 120, C.green, vq, 2, 'rgba(0,40,20,0.45)');
    lbl('LEAN · FROZEN', 1400, 675, C.green, vq, 19);
    lbl('D5/S3/Arith/FibonacciAtomic/Kernels/NativeKernelRigidity', 1400, 710, C.white, vq, 15);
    lbl('theorem kernel_zero_or_one', 1400, 740, C.green, vq, 17);
  }
  const q = Q(S, 1, 'A faithful such kernel is the delta kernel', 0.6, 0.3);
  if (q > 0) {
    chip(540, 270, 820, 56, 'faithful :  η(s) = η(t) ⇒ s = t   ⇒   K = δ', C.green, q, 22);
    lblG('‖η(s) − η(t)‖² = 2 − 2 Re K(s,t) = 0  when K = 1', 540, 335, C.dim, q, 17);
    const kq = Q(S, 1, 'c plus one minus c delta is a valid kernel', 0.6);
    chip(540, 420, 820, 56, 'K_c = c + (1 − c) δ ,  0 ≤ c ≤ 1', C.cyan, kq, 24);
    lbl('PSD , Hermitian , normalised , ρ-invariant ; faithful for 0 < c < 1', 540, 480, C.white, kq, 16);
    lblG('η_c(s) = √c e₀ + √(1 − c) e_s', 540, 520, C.dim, kq, 17);
    const nq = Q(S, 1, 'with node value c, not c squared', 0.6);
    chip(540, 610, 820, 56, 'K_c(⟨s,t⟩, ⟨u,v⟩) = c  ≠  c² = K_c(s,u) K_c(t,v)', C.mag, nq, 21);
    lbl('s ≠ u , t ≠ v', 540, 670, C.dim, nq, 15);
    const px = 1080, py = 760, pw = 640, ph = 420, xS = c => px + c * pw, yS = v => py - v / 0.3 * ph;
    plotAxes(px, py, pw, ph, nq, 'c', 'node defect c − c² of K_c');
    curve(p => { const i = Math.round(p * (KCDEF77.length - 1)); return [xS(KCDEF77[i][0]), yS(KCDEF77[i][1])]; }, KCDEF77.length - 1, C.mag, nq, 3);
    dot(xS(0), yS(0), 12, 'n', nq); dot(xS(1), yS(0), 12, 'n', nq);
    lbl('δ kernel', xS(0) + 10, yS(0) - 22, C.green, nq, 16, 'left'); lbl('all-ones (not faithful)', xS(1) - 10, yS(0) - 22, C.green, nq, 16, 'right');
    lbl('max 1/4 at c = 1/2', xS(0.5), yS(0.25) - 18, C.mag, nq, 16);
  }
};

/* ---- 06 DRIFT ---- */
SCENES.drift = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'Is this rigidity stable?', 0.6);
  const l1 = Q(S, 1, 'Moduli do not rescue it', 0.6);
  const cq = Q(S, 0, 'Give every node with equal children a phase', 0.6);
  combDraw77(760, 250, 5, q0, (x, y, i) => {
    tree77(['a', 'a'], x, y, 36, 34, q0, { r: 6 });
    ring(x, y, 12, C.mag, q0 * (cq * (1 - l1) + l1 * 0), 2.5);
    if (cq * (1 - l1) > 0) dial64(x + 34, y - 12, 13, Math.PI * (i + 1) / 5 * 0.6 + t * 0.2, C.mag, cq * (1 - l1), null);
    if (l1 > 0) { box(x - 16, y - 16, 32, 32, C.cyan, l1, 2); }
  }, { dx: 92, dy: 54, lab: true });
  lbl('moving comb w_k ,  teeth C = ⟨α, α⟩', 560, 590, C.dim, q0, 15);
  if (1 - l1 > 0) {
    const f = 1 - l1;
    lblG('q(t) = # nodes ⟨u, u⟩ ,  q(ρt) = q(t)', 150, 650, C.white, cq * f, 19, 'left');
    lblG('Kₙ(s,t) = aₙ e^(iπ(q(t) − q(s))/5n) + rₙ δ ,  rₙ = 1/5n', 150, 695, C.white, cq * f, 19, 'left');
    const vq = Q(S, 0, 'yet on a moving comb pair the kernel equals minus a n', 0.6) * f;
    chip(470, 765, 640, 54, 'Kₙ(α, w₅ₙ) = e^(iπ) aₙ = −aₙ ,  |−aₙ − 0| ≥ 4/5', C.red, vq, 19);
  }
  if (l1 > 0) {
    lblG('S(t) = addresses of the equal-child nodes ,  |S(t)| = q(t)', 150, 650, C.white, l1, 18, 'left');
    lblG('Lₙ(s,u) = aₙ e^(−|S(s) △ S(u)|/5n) + rₙ δ  (real , positive)', 150, 695, C.white, l1, 18, 'left');
    const vq = Q(S, 1, 'yet the same pair has value a n over e', 0.6);
    chip(470, 765, 640, 54, 'Lₙ(α, w₅ₙ) = aₙ/e ∈ (1/4, 1/2)', C.cyan, vq, 21);
  }
  const pq = Q(S, 0, 'The multiplication defect stays below one over n', 0.6);
  const px = 1080, py = 780, pw = 650, ph = 520, xS = n => px + (n - 1) / 19 * pw, yS = v => py - (v + 1.05) / 2.15 * ph;
  plotAxes(px, py, pw, ph, q0, 'n = 1 … 20', 'kernel value at the moving pair');
  line(px, yS(0), px + pw, yS(0), C.dim, q0 * 0.7, 1.2); line(px, yS(1), px + pw, yS(1), C.green, q0 * 0.5, 1.2);
  lbl('0', px - 10, yS(0) + 5, C.dim, q0, 14, 'right'); lbl('1', px - 10, yS(1) + 5, C.green, q0, 14, 'right'); lbl('−1', px - 10, yS(-1) + 5, C.dim, q0, 14, 'right');
  curve(p => { const n = 1 + p * 19; return [xS(n), yS(1 / n)]; }, 80, C.gold, pq, 2.5);
  DRIFT77.forEach(r => dot(xS(r[0]), yS(r[4]), 5, 'g', pq));
  lbl('1/n  and the defect bounds', xS(4), yS(0.62), C.gold, pq, 15, 'left');
  const vq = Q(S, 0, 'yet on a moving comb pair the kernel equals minus a n', 0.6);
  DRIFT77.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 7, 'r', clamp(vq * 1.6 - i / 25)));
  lbl('−aₙ', xS(19), yS(-0.88) - 14, C.red, vq, 17, 'right');
  if (l1 > 0) {
    const bq = Q(S, 1, 'between a quarter and a half', 0.6);
    fillBox(px, yS(0.5), pw, yS(0.25) - yS(0.5), C.cyan, bq * 0.12);
    dashed(px, yS(0.25), px + pw, yS(0.25), C.cyan, bq, 1.2); dashed(px, yS(0.5), px + pw, yS(0.5), C.cyan, bq, 1.2);
    lbl('1/4', px + pw + 8, yS(0.25) + 5, C.cyan, bq, 14, 'left'); lbl('1/2', px + pw + 8, yS(0.5) + 5, C.cyan, bq, 14, 'left');
    const dq = Q(S, 1, 'yet the same pair has value a n over e', 0.6);
    DRIFT77.forEach((r, i) => dot(xS(r[0]), yS(r[2]), 7, 'c', clamp(dq * 1.6 - i / 25)));
    lbl('aₙ/e', xS(19), yS(0.38) - 14, C.cyan, dq, 17, 'right');
    stamp('NO UNIFORM MODULUS', 1405, yS(-0.35), Q(S, 1, 'its defect still below one over n', 0.6), C.mag, 24, -0.04);
  }
};

/* ---- 07 BARGMANN ---- */
SCENES.bargmann = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Its phase, five n arctangent', 0.6);
  const q0 = Q(S, 0, 'colour each equal-child node by the parity of its subtree count', 0.6);
  const teeth = [['a', 'b'], ['a', 'a'], [['a', 'a'], ['a', 'a']]];
  const colf = tr => (qcount77(tr[0]) % 2 === 0 ? C.cyan : C.mag);
  if (f1 > 0) {
    teeth.forEach((C0, j) => {
      const x0 = 330 + j * 260, qq = clamp(q0 * 1.5 - j / 4) * f1;
      combDraw77(x0, 270, 3, qq, (x, y) => tree77(C0, x, y, j === 2 ? 44 : 30, 30, qq, { r: 5, eq: 1, eqc: colf }), { dx: 58, dy: 50 });
      lblG('W' + '₀₁₂'[j] + ' : teeth C' + '₀₁₂'[j], x0 - 60, 512, j === 0 ? C.white : j === 1 ? C.cyan : C.mag, qq, 18);
    });
    lbl('colour 1 (cyan) : q(u) even    colour 2 (magenta) : q(u) odd', 520, 548, C.dim, q0 * f1, 15);
    const vq = Q(S, 0, 'with three complex local vectors', 0.6) * f1;
    lblG('z₀ = e₀ ,  z₁ = √b e₀ + √h e₁ ,  z₂ = √b e₀ + i √h e₁', 520, 596, C.white, vq, 20);
    const G = [['1', '√b', '√b'], ['√b', '1', 'b + ih'], ['√b', 'b − ih', '1']];
    G.forEach((row, i) => row.forEach((s, k) => { const qq = clamp(vq * 1.8 - (i * 3 + k) / 12); box(330 + k * 130, 625 + i * 52, 122, 46, (i === 1 && k === 2) || (i === 2 && k === 1) ? C.mag : C.gold, qq, 1.5, 'rgba(0,0,0,0.5)'); lblG(s, 391 + k * 130, 656 + i * 52, C.white, qq, 18); }));
    lbl('G_h = ⟨z_j , z_k⟩', 820, 705, C.gold, vq, 18, 'left');
    const bq = Q(S, 0, 'Three moving combs close a Bargmann loop', 0.6) * f1;
    chip(1400, 290, 780, 60, 'Bₙ = K(W₀,W₁) K(W₁,W₂) K(W₂,W₀)', C.gold, bq, 23);
    chip(1400, 380, 780, 64, '= a³ [ b³ (b + ih) ]^(5n)', C.gold, Q(S, 0, 'a cubed times', 0.6) * f1, 27);
    lbl('a = b = 1 − h ,  h = r = 1/5n ;  W_j,k = ⟨W_j,k−1 , C_j⟩ ,  k = 5n', 1400, 445, C.dim, bq, 15);
    lbl('P(C₀,C₁) = √b ,  P(C₁,C₂) = b(b + ih) ,  P(C₂,C₀) = b^(3/2)', 1400, 495, C.white, bq, 16);
    lbl('recomputed for n = 1 … 40 from the colour fields ; explicit vectors for n = 1', 1400, 540, C.dim, bq, 14);
  }
  const q = Q(S, 1, 'Its phase, five n arctangent', 0.6, 0.3);
  if (q > 0) {
    chip(540, 280, 820, 56, 'θₙ = arg Bₙ = 5n · arctan(1/(5n − 1)) ∈ (1, 5/4)', C.gold, q, 21);
    const mq = Q(S, 1, 'its modulus above four fifths to the twenty-third', 0.6);
    chip(540, 360, 820, 56, '|Bₙ| ≥ (4/5)²³ ≈ 0.0059 ,  Bₙ → e^(−4+i)', C.cyan, mq, 21);
    const dq = Q(S, 1, 'while the defect is below one over n', 0.6);
    chip(540, 440, 820, 56, 'sup |K(⟨s,t⟩,⟨u,v⟩) − K(s,u)K(t,v)| ≤ 3aₙ/5n < 1/n', C.green, dq, 19);
    const gq = Q(S, 1, 'No vertex rephasing removes it', 0.6);
    lblG('η(t) ↦ e^(iχ_t) η(t) :  e^(i(χ₁−χ₀)) e^(i(χ₂−χ₁)) e^(i(χ₀−χ₂)) = 1', 540, 530, C.white, gq, 18);
    lbl('a real Gram on the triple would make the loop real : impossible', 540, 570, C.dim, gq, 15);
    stamp('GAUGE-INVARIANT PHASE', 540, 680, gq, C.mag, 28, -0.04);
    const px = 1090, py = 790, pw = 560, ph = 540, sc = v => v / 0.02;
    const xS = x => px + sc(x) * pw, yS = y => py - sc(y) * ph;
    plotAxes(px, py, pw, ph, q, 'Re Bₙ', 'Im Bₙ');
    [1, 1.25].forEach(an => { const R = 0.021; line(xS(0), yS(0), xS(R * Math.cos(an)), yS(R * Math.sin(an)), C.gold, q * 0.6, 1.5); });
    lbl('arg = 1', xS(0.0118), yS(0.0182), C.gold, q, 14, 'left'); lbl('arg = 5/4', xS(0.0063), yS(0.0198), C.gold, q, 14, 'right');
    curve(p => { const an = 1 + p * 0.25, R = Math.pow(0.8, 23); return [xS(R * Math.cos(an)), yS(R * Math.sin(an))]; }, 20, C.cyan, mq, 2);
    lbl('|B| = (4/5)²³', xS(0.0016), yS(0.0068), C.cyan, mq, 14, 'right');
    BARG77.forEach((r, i) => dot(xS(r[3]), yS(r[4]), 6, 'g', clamp(q * 1.6 - i / 50)));
    dot(xS(BARGLIM77[0]), yS(BARGLIM77[1]), 11, 'm', mq);
    lbl('limit e^(−4+i)', xS(BARGLIM77[0]) + 18, yS(BARGLIM77[1]) + 26, C.mag, mq, 16, 'left');
    lbl('n = 1', xS(BARG77[0][3]) + 12, yS(BARG77[0][4]) + 18, C.gold, q, 14, 'left');
    [0.01, 0.02].forEach(v => { lbl(String(v), xS(v), py + 24, C.dim, q, 13); lbl(String(v), px - 8, yS(v) + 5, C.dim, q, 13, 'right'); });
  }
};

/* ---- 08 RECORDS ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Keep the rejection instead', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Take the real kernel, the modulus of the complex one', 0.6) * f1;
    chip(540, 270, 820, 56, 'Rₙ(s, t) = |Kₙᶜ(s, t)| :  a real , positive , faithful kernel', C.cyan, q, 20);
    const dq = Q(S, 0, 'Under destructive queries that reset on failure', 0.6) * f1;
    const nodes = [[260, 450, 's₀'], [470, 410, 't₁ +'], [470, 520, 't₁ − : fail'], [680, 370, 't₂ +'], [680, 460, 't₂ −'], [870, 350, 'Stop']];
    nodes.forEach(([x, y, s], i) => { const qq = clamp(dq * 1.6 - i / 8); const col = s.includes('−') ? C.red : C.cyan; cell73(x - 70, y - 22, 140, 44, s, i === 0 ? C.gold : col, qq, 16); });
    [[0, 1], [0, 2], [1, 3], [1, 4], [3, 5]].forEach(([i, j]) => arrow(nodes[i][0] + 72, nodes[i][1], nodes[j][0] - 72, nodes[j][1], C.dim, dq, 1.6));
    lbl('negative result : fail marker , Stop  ·  positive : continue or Stop', 540, 585, C.dim, dq, 15);
    const wq = Q(S, 0, 'each branch weight is a squared overlap', 0.6) * f1;
    chip(540, 660, 820, 56, 'm₊ = m |Kᶜ(s,t)|² = m R(s,t)² ,  m₋ = m − m₊', C.gold, wq, 21);
    const sq = Q(S, 0, 'both models give the same complete record law', 0.6) * f1;
    box(1050, 280, 720, 260, C.green, sq, 2, 'rgba(0,40,20,0.35)');
    lbl('complex model  ≡  real model', 1410, 330, C.green, sq, 22);
    lbl('every adaptive strategy , every root source', 1410, 375, C.white, sq, 17);
    lbl('zero-mass histories , failures and Stops kept', 1410, 410, C.dim, sq, 15);
    lbl('recomputed : 200 random strategies over five sources', 1410, 460, C.white, sq, 15);
    lbl('max difference 1.8 × 10⁻¹⁵', 1410, 495, C.green, sq, 17);
    stamp('SAME RECORD LAW', 1410, 650, sq, C.green, 30, -0.04);
  }
  const q = Q(S, 1, 'Keep the rejection instead', 0.6, 0.3);
  if (q > 0) {
    const steps = [['prepare', 'v(W₀)', C.gold], ['Lüders', 'P₁ , I − P₁ (keep both)', C.mag], ['query', 'v(W₂) : + / −', C.cyan], ['record', '(σ, τ) , Stop', C.green]];
    steps.forEach(([h, s, col], i) => { const qq = clamp(q * 1.6 - i / 6), x = 120 + i * 220; box(x, 260, 200, 110, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, x + 100, 296, col, qq, 18); lblG(s, x + 100, 340, C.white, qq, 15); if (i < 3) arrow(x + 202, 315, x + 218, 315, C.dim, qq, 2); });
    const lq = Q(S, 1, 'The minus-then-plus record differs', 0.6);
    lblG('p(−,+) = |K₂₀ − K₂₁K₁₀|² = z + xy − 2 Re Bₙ   (complex)', 540, 430, C.white, lq, 18);
    lblG('p(−,+) = z + xy − 2 |Bₙ|   (real modulus model)', 540, 470, C.white, lq, 18);
    const gq = Q(S, 1, 'two times the loop modulus times one minus cosine theta', 0.6);
    chip(540, 560, 840, 60, 'p_c(−,+) − p_R(−,+) = 2|Bₙ|(1 − cos θₙ)', C.gold, gq, 23);
    const sq = Q(S, 1, 'at least point zero zero five four', 0.6);
    chip(540, 650, 840, 56, '≥ 2 (4/5)²³ (1 − cos 1) ≈ 0.00543   for every n', C.green, sq, 21);
    lbl('unnormalised raw probabilities ; no success subsample is selected', 540, 710, C.dim, sq, 15);
    const bq = Q(S, 1, 'a Lüders measurement on the second comb', 0.6);
    const R1 = REC77['1'], px = 1080, py = 520, hs = 300;
    plotAxes(px, py, 640, 320, bq, '', 'four-record law , n = 1');
    ['++', '+−', '−+', '−−'].forEach((s, i) => { const x = px + 30 + i * 155; [[R1.c[i], C.mag], [R1.R[i], C.cyan]].forEach(([v, col], j) => { const h = v * hs; fillBox(x + j * 56, py - h, 50, h, col, bq * 0.45); rect63(x + j * 56, py - h, 50, h, col, bq, 1.5); }); lbl(s, x + 53, py + 26, C.white, bq, 17); });
    lbl('magenta : complex   cyan : real', px + 630, py - 300, C.dim, bq, 14, 'right');
    const zq = Q(S, 1, 'differs by two times the loop modulus', 0.6);
    box(1080, 590, 640, 200, C.gold, zq, 2, 'rgba(0,0,0,0.5)');
    lbl('zoom :  record (−, +)', 1400, 620, C.gold, zq, 16);
    [[R1.c[2], C.mag, 'complex ' + R1.c[2].toFixed(4)], [R1.R[2], C.cyan, 'real ' + R1.R[2].toFixed(4)]].forEach(([v, col, s], j) => { const w = v / 0.022 * 420; fillBox(1120, 650 + j * 60, w, 40, col, zq * 0.45); rect63(1120, 650 + j * 60, w, 40, col, zq, 1.5); lbl(s, 1130 + w + 10, 678 + j * 60, col, zq, 16, 'left'); });
  }
};

/* ---- 09 FIVE-MODE MENU ---- */
SCENES.fivemode = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Against the flag channel', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The native five-mode menu', 0.6) * f1;
    pyr63(420, 500, 300, 0.5 + t * 0.15, q, { K: 1, fillBase: 1 });
    lbl('K : the five-mode generator (49.0)', 420, 720, C.gold, q, 16);
    const mq = Q(S, 0, 'With waiting, full rank-one readout, stopping and classical feedback', 0.6) * f1;
    [['wait  U(t) = exp(−itK)', C.gold], ['full rank-one readout  P_s = |e_s⟩⟨e_s|', C.cyan], ['Stop', C.white], ['finite feedback , input-free randomness', C.dim]].forEach(([s, col], i) => chip(1400, 270 + i * 64, 780, 52, s, col, clamp(mq * 1.6 - i / 5), 19));
    const rq = Q(S, 0, 'every branch that reads once has rank one', 0.6) * f1;
    lblG('read branch :  V_m P_sm ⋯ V₁ P_s1 V₀  has rank ≤ 1', 1400, 560, C.white, rq, 20);
    lbl('|a⟩⟨b| ⊗ id maps every input to a product with the reference', 1400, 600, C.dim, rq, 15);
    stamp('ENTANGLEMENT BREAKING', 1400, 700, Q(S, 0, 'so the rejection part breaks entanglement', 0.6) * f1, C.red, 26, -0.04);
  }
  const q = Q(S, 1, 'Against the flag channel', 0.6, 0.3);
  if (q > 0) {
    chip(540, 270, 840, 56, 'Λ(Y) = PYP ⊗ [+] + QYQ ⊗ [−] ,  rank Q = r = 4', C.cyan, q, 21);
    lbl('P : one mode kept positive ; the 4-dim rejection Q must stay coherent', 540, 330, C.dim, q, 15);
    const wq = Q(S, 1, 'the larger of w and three quarters of one minus w', 0.6);
    lblG('witness ψ ∈ ran P :  distance ≥ w', 540, 400, C.white, wq, 20);
    lblG('witness Φ_Q (with reference) :  ⟨Φ|σ|Φ⟩ ≤ Tr σ / r', 540, 445, C.white, wq, 20);
    lblG('⇒  distance ≥ (1 − w)(r − 1)/r', 540, 490, C.white, wq, 20);
    const sq = Q(S, 1, 'never below three sevenths', 0.6);
    chip(540, 580, 840, 62, '½ ‖Γ − Λ‖_◇ ≥ max{w, (1 − w)·3/4} ≥ 3/7', C.gold, sq, 24);
    lbl('undivided diamond distance ≥ 6/7 ; a resource bound , not an optimality claim', 540, 640, C.dim, sq, 15);
    stamp('≥ 3/7', 540, 735, sq, C.gold, 34, -0.04);
    const px = 1080, py = 780, pw = 640, ph = 440, xS = w => px + w * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, wq, '', 'half-diamond distance');
    lbl('w = no-readout negative weight', px + pw / 2, py + 48, C.dim, wq, 15);
    curve(p => [xS(p), yS(p)], 20, C.cyan, wq, 2); curve(p => [xS(p), yS((1 - p) * 0.75)], 20, C.mag, wq, 2);
    curve(p => [xS(p), yS(Math.max(p, (1 - p) * 0.75))], 60, C.gold, wq, 4);
    dot(xS(3 / 7), yS(3 / 7), 11, 'g', sq); lbl('w = 3/7 , value 3/7', xS(3 / 7) + 16, yS(3 / 7) + 30, C.gold, sq, 16, 'left');
    FM77.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 6, 'n', clamp(Q(S, 1, 'with w the weight that never reads', 0.6) * 1.6 - i / 25)));
    lbl('green : witness lower bounds , 20 sampled protocols', px + pw, py - ph - 44, C.green, Q(S, 1, 'with w the weight that never reads', 0.6), 14, 'right');
    [0, 0.5, 1].forEach(v => { lbl(String(v), xS(v), py + 22, C.dim, wq, 13); lbl(String(v), px - 8, yS(v) + 5, C.dim, wq, 13, 'right'); });
  }
};

/* ---- 10 CONVERSION ---- */
SCENES.convert = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Allow errors and one common channel serves every tree', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Grafting and splitting trees from their states alone', 0.6) * f1;
    const gq = Q(S, 0, 'grafting two leaves succeeds with probability', 0.6) * f1;
    [[['a', 'a'], 'α ⊗ α'], [['b', 'a'], 'β ⊗ α']].forEach(([tr, s], i) => { const y = 300 + i * 150; lblG(s, 230, y + 30, C.white, q, 22); arrow(300, y + 24, 400, y + 24, C.dim, q, 2); tree77(tr, 480, y, 90, 50, q, { r: 8, eq: 1, eqc: () => C.cyan }); });
    lbl('input overlap a , target overlap a√b', 400, 570, C.white, q, 17);
    chip(400, 630, 600, 56, 'p_con = (1 − a)/(1 − a√b) → 2/3', C.gold, gq, 22);
    const sq = Q(S, 0, 'splitting tends to one half', 0.6) * f1;
    chip(400, 710, 600, 56, 'p_dec = (1 − a)/(1 − a²) = 1/(1 + a) → 1/2', C.cyan, sq, 20);
    lbl('two-input Gram condition  p ≤ (1 − c)/(1 − d)  (Chefles–Jozsa–Winter , quant-ph/0307227)', 520, 775, C.dim, gq, 13);
    const px = 1080, py = 760, pw = 640, ph = 460, xS = n => px + (n - 1) / 59 * pw, yS = v => py - (v - 0.4) / 0.35 * ph;
    plotAxes(px, py, pw, ph, gq, 'n = 1 … 60', 'exact equal success probability');
    dashed(px, yS(2 / 3), px + pw, yS(2 / 3), C.gold, gq * 0.7, 1.5); dashed(px, yS(0.5), px + pw, yS(0.5), C.cyan, sq * 0.7, 1.5);
    lbl('2/3', px + pw + 8, yS(2 / 3) + 5, C.gold, gq, 15, 'left'); lbl('1/2', px + pw + 8, yS(0.5) + 5, C.cyan, sq, 15, 'left');
    CONV77.forEach((r, i) => { dot(xS(r[0]), yS(r[1]), 5, 'g', clamp(gq * 1.6 - i / 70)); dot(xS(r[0]), yS(r[2]), 5, 'c', clamp(sq * 1.6 - i / 70)); });
    lbl('grafting', xS(30), yS(0.69), C.gold, gq, 16); lbl('splitting', xS(30), yS(0.53), C.cyan, sq, 16);
  }
  const q = Q(S, 1, 'Allow errors and one common channel serves every tree', 0.6, 0.3);
  if (q > 0) {
    chip(540, 270, 820, 56, 'one normal channel for all s, t ∈ T :  error E(n) = Θ(n^(−1/2))', C.white, q, 19);
    const nq = Q(S, 1, 'at n equal one', 0.6);
    lblG('(√305 − 15)/50 ≈ 0.049  ≤  E_con(1)  ≤  93/125 = 0.744', 540, 360, C.gold, nq, 20);
    lblG('(√369 − 15)/50 ≈ 0.084  ≤  E_dec(1)  ≤  17/25 = 0.68', 540, 405, C.cyan, nq, 20);
    lblG('√n·E_con ∈ [ (√3 − √2)/(2√5) , √(2/5) ]  asymptotically', 540, 465, C.white, nq, 18);
    lbl('lower bound : two real sources + trace-distance contraction', 540, 510, C.dim, nq, 15);
    lbl('upper bound : address split  U w_⟨s,t⟩ = z_ℓ ⊗ w_s ⊗ w_t , all flags kept', 540, 545, C.dim, nq, 15);
    const eq = Q(S, 1, 'Exact and approximate costs are different questions', 0.6);
    stamp('EXACT ≠ APPROXIMATE', 540, 660, eq, C.mag, 30, -0.04);
    lbl('exact flagged success stays at 2/3 and 1/2 ; approximate error → 0', 540, 750, C.dim, eq, 15);
    const px = 1080, py = 780, pw = 640, ph = 480, lx = n => px + Math.log10(n) / Math.log10(60) * pw, yS = v => py - (Math.log10(v) + 2.2) / 2.2 * ph;
    plotAxes(px, py, pw, ph, q, '', 'grafting error bounds (log)');
    lbl('n , log scale', px + pw / 2, py + 48, C.dim, q, 15);
    curve(p => { const i = Math.round(p * 59); return [lx(CONV77[i][0]), yS(CONV77[i][4])]; }, 59, C.gold, q, 3);
    curve(p => { const i = Math.round(p * 59); return [lx(CONV77[i][0]), yS(CONV77[i][3])]; }, 59, C.cyan, q, 3);
    lbl('upper  1 − a² + a²√(1 − ab)', lx(1.6), yS(0.9), C.gold, q, 15, 'left'); lbl('lower  (√(1 − a²b) − √(1 − a²))/2', lx(1.6), yS(0.0125), C.cyan, q, 15, 'left');
    [1, 0.1, 0.01].forEach(v => lbl(String(v), px - 8, yS(v) + 5, C.dim, q, 13, 'right'));
    [1, 10, 60].forEach(v => lbl(String(v), lx(v), py + 24, C.dim, q, 13));
    lbl('both ∝ n^(−1/2)', lx(8), yS(0.12), C.white, nq, 16, 'left');
  }
};

/* ---- 11 BORN ---- */
SCENES.born = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Alice\'s marginal shifts', 0.6);
  const q0 = Q(S, 0, 'Keep the golden gate K and complex amplitudes', 0.6);
  const sites = ['pad', 'Alice', 'Bob', 'Bob', 'Bob'];
  sites.forEach((s, i) => { const col = i === 1 ? C.gold : i === 0 ? C.dim : C.cyan; cell73(170 + i * 140, 270, 120, 70, String(i), col, q0 * (0.6 + 0.4 * f1), 26); lbl(s, 230 + i * 140, 370, col, q0 * (0.6 + 0.4 * f1), 15); });
  const pq = Q(S, 0, 'Two K calls prepare a five-site source', 0.6);
  [[2, 'K₂ first', C.gold], [1, 'then K₁', C.gold]].forEach(([j, s, col], k) => { const x0 = 170 + (j - 1) * 140, y = 410 + k * 46; line(x0 + 10, y, x0 + 410, y, col, pq, 3); lbl(s, x0 + 420, y + 6, col, pq, 15, 'left'); });
  const bq = Q(S, 0, 'Bob then waits or calls K once more', 0.6);
  line(170 + 2 * 140 + 10, 520, 170 + 2 * 140 + 410, 520, C.cyan, bq, 3); lbl('Bob : s = 1 calls K₃ , s = 0 waits', 460, 556, C.cyan, bq, 15, 'left');
  if (f1 > 0) {
    const rq = Q(S, 0, 'replace Born\'s square by a power p', 0.6) * f1;
    chip(540, 610, 820, 60, 'P_p(w | ψ) = |ψ_w|^p / Σ_y |ψ_y|^p ,  all 32 words', C.green, rq, 21);
    lblG('K = ζ[I + (ζ − 1)𝒫] ,  ζ = e^(3πi/5) ;  K|000⟩ = u|000⟩ + v|010⟩', 540, 690, C.white, q0 * f1, 17);
    lblG('|u|² = φ⁻² ,  |v|² = φ⁻¹ ,  u = −φ⁻¹', 540, 735, C.dim, q0 * f1, 17);
    const tq = Q(S, 0, 'Two K calls prepare a five-site source', 0.6) * f1;
    const rows = [['00000', 'u²', 'u³'], ['01000', 'uv', 'u²v'], ['00100', 'ζv', 'ζ²v'], ['00010', '0', 'u²v'], ['01010', '0', 'uv²']];
    lbl('word', 1180, 285, C.dim, tq, 17); lbl('s = 0', 1420, 285, C.dim, tq, 17); lbl('s = 1', 1630, 285, C.dim, tq, 17);
    rows.forEach((r, i) => { const qq = clamp(tq * 1.6 - i / 7), y = 310 + i * 64; cell73(1090, y, 180, 50, r[0], r[0][1] === '1' ? C.gold : C.cyan, qq, 19); cell73(1320, y, 200, 50, r[1], C.white, qq * (r[1] === '0' ? 0.5 : 1), 20); cell73(1530, y, 200, 50, r[2], C.white, Q(S, 0, 'Bob then waits or calls K once more', 0.6) * f1 * clamp(1.6 - i / 7), 20); });
    lbl('Alice reads site 1 (gold rows : Alice = 1) ; other 27–29 words have amplitude 0', 1410, 650, C.dim, tq, 14);
  }
  const q = Q(S, 1, 'Alice\'s marginal shifts', 0.6, 0.3);
  if (q > 0) {
    chip(540, 610, 840, 60, 'Δ_p = m₀ − m₁ = X Y² (X + Y − 1) / [(…)(…)]', C.gold, q, 21);
    const xq = Q(S, 1, 'where X and Y are p-th powers of two moduli', 0.6);
    lblG('X = |u|^p = φ^(−p) ,  Y = |v|^p = φ^(−p/2) ,  |u|² + |v|² = 1', 540, 690, C.white, xq, 18);
    lbl('denominators (X² + XY + Y)(X³ + 2X²Y + XY² + Y) > 0', 540, 735, C.dim, xq, 15);
    lbl('normalised power family as studied by Aaronson , quant-ph/0401062', 540, 775, C.dim, q, 13);
    const vmn = Math.min(...BORN77.map(r => r[1])), vmx = Math.max(...BORN77.map(r => r[1])), vr = vmx - vmn;
    const px = 1080, py = 790, pw = 660, ph = 480, xS = p => px + (p - 0.2) / 5.8 * pw, yS = v => py - 20 - (v - vmn) / vr * (ph - 40);
    plotAxes(px, py, pw, ph, q, 'p', 'Alice marginal gap Δ_p');
    line(px, yS(0), px + pw, yS(0), C.dim, q * 0.7, 1.2);
    curve(p => { const i = Math.round(p * (BORN77.length - 1)); return [xS(BORN77[i][0]), yS(BORN77[i][1])]; }, BORN77.length - 1, C.gold, q, 3);
    [1, 2, 3, 4, 5].forEach(v => lbl(String(v), xS(v), py + 24, C.dim, q, 13));
    [-0.04, 0, 0.04].forEach(v => lbl(v.toFixed(2), px - 8, yS(v) + 5, C.dim, q, 13, 'right'));
    lbl('min ' + vmn.toFixed(3) + ' , max ' + vmx.toFixed(3), px + pw, py - ph - 14, C.dim, q, 13, 'right');
    const zq = Q(S, 1, 'It vanishes exactly at p equal two', 0.6);
    dot(xS(2), yS(0), 12, 'n', zq); dashed(xS(2), yS(vmx), xS(2), py, C.green, zq, 1.5);
    lbl('p < 2 : Δ > 0', xS(0.3), yS(vmn * 0.5), C.gold, zq, 15, 'left'); lbl('p > 2 : Δ < 0', xS(3.6), yS(0) - 18, C.gold, zq, 15, 'left');
    stamp('p = 2', xS(4.4), yS(vmx * 0.55), Q(S, 1, 'no-signalling picks the square', 0.6), C.green, 32, -0.04);
  }
};

/* ---- 12 RADIAL ---- */
SCENES.radial = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'On the ten-site Fibonacci code', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A log-periodic response', 0.6) * f1;
    chip(540, 270, 820, 56, 'f_ε(r) = r² [1 + ε sin²(π log r / log y)] ,  y = φ^(−1/2)', C.mag, q, 18);
    const fmax = Math.max(...FCURVE77.map(r => r[2])) * 1.05, px = 160, py = 760, pw = 760, ph = 380, xS = r => px + r * pw, yS = v => py - v / fmax * ph;
    plotAxes(px, py, pw, ph, q, 'r', 'response weight');
    curve(p => { const i = Math.round(p * (FCURVE77.length - 1)); return [xS(FCURVE77[i][0]), yS(FCURVE77[i][1])]; }, FCURVE77.length - 1, C.cyan, q, 2.5);
    curve(p => { const i = Math.round(p * (FCURVE77.length - 1)); return [xS(FCURVE77[i][0]), yS(FCURVE77[i][2])]; }, FCURVE77.length - 1, C.mag, q, 2.5);
    lbl('r² (Born)', xS(0.99), yS(1.0) + 30, C.cyan, q, 15, 'right'); lbl('ε = 1', xS(0.93), yS(1.45), C.mag, q, 15, 'left');
    const lq = Q(S, 0, 'because every modulus there is a power of y', 0.6) * f1;
    YLAT77.forEach((y, i) => { if (y > 0.13) { dot(xS(y), yS(y * y), 8, 'g', lq); dashed(xS(y), py, xS(y), yS(y * y), C.gold, lq * 0.5, 1); } });
    lbl('table moduli : y , y³ , y⁴ , y⁵ , y⁶  →  f_ε(yᵏ) = y²ᵏ', 540, 330, C.gold, lq, 16);
    stamp('BOTH TABLES MATCH', 540, 420, Q(S, 0, 'matches both tables word for word', 0.6) * f1, C.gold, 24, -0.04);
    const gq = Q(S, 0, 'calling K three twice separates it', 0.6) * f1;
    chip(1400, 270, 780, 56, 'setting s = 2 : K₃ twice ,  |u₂| = x² , |v₂| = √(1 − x⁴)', C.cyan, gq, 18);
    lblG('m₀ − m₂ = x² y⁴ z² (H_ε − 1) / Z₂ ,  sign = sign ε', 1400, 335, C.white, gq, 18);
    const bx = 1080, by = 600, bw = 70, hs = 1300;
    line(bx - 10, by, bx + 7 * 90, by, C.dim, gq, 1.5);
    EPS77.forEach((r, i) => { const qq = clamp(gq * 1.6 - i / 9), h = r[1] * hs, x = bx + i * 90; if (Math.abs(h) > 0.5) { fillBox(x, h > 0 ? by - h : by, bw, Math.abs(h), h > 0 ? C.mag : C.cyan, qq * 0.45); rect63(x, h > 0 ? by - h : by, bw, Math.abs(h), h > 0 ? C.mag : C.cyan, qq, 1.5); } else dot(x + bw / 2, by, 7, 'n', qq); lbl(String(r[0]), x + bw / 2, by + (h < 0 ? -h + 26 : 26) , C.dim, qq, 14); });
    lbl('ε', bx + 7 * 90 + 10, by + 5, C.dim, gq, 16, 'left');
    lbl('Alice marginal gap , setting 2 versus setting 0', 1400, 780, C.dim, gq, 15);
  }
  const q = Q(S, 1, 'On the ten-site Fibonacci code', 0.6, 0.3);
  if (q > 0) {
    const bits = ['1', '0', 'a', '0', '1', '0', 'b', '0', '1', '0'];
    bits.forEach((s, i) => { const col = i === 2 ? C.gold : (i === 6 ? C.cyan : C.dim); cell73(150 + i * 76, 270, 66, 66, s, col, q, 24); lbl('b' + (i - 1 < 0 ? '₋₁' : '₀₁₂₃₄₅₆₇₈'[i - 1]), 183 + i * 76, 360, C.dim, q, 13); });
    lbl('code J|a, b⟩ ;  Alice reads b₁ ;  Bob : I or K₅', 530, 400, C.white, q, 16);
    lbl('preparations : any finite word in K₀ … K₆ (Fibonacci braid density , Freedman–Larsen–Wang)', 530, 440, C.dim, q, 13);
    const eq = Q(S, 1, 'is no-signalling for every finite preparation word exactly when f of r is r squared', 0.6);
    [['(1)  no-signalling for every finite word', C.white], ['(2)  f(a) + f(b) = f(√(a² + b²))', C.cyan], ['(3)  f(r) = r²', C.green]].forEach(([s, col], i) => { const qq = clamp(eq * 1.6 - i / 4); chip(540, 510 + i * 70, 760, 54, s, col, qq, 20); if (i < 2) lbl('⟺', 960, 548 + i * 70, C.gold, qq, 22); });
    lbl('recomputed : 60 random words , Born gap 2 × 10⁻¹⁶ ; r³ gap ' + TEN77.p3.toFixed(3) + ' ; f₁ gap ' + TEN77.eps.toFixed(3), 540, 735, C.dim, eq, 14);
    const sq = Q(S, 1, 'No finite test suite fixed in advance certifies this', 0.6);
    box(1060, 280, 720, 240, C.mag, sq, 2, 'rgba(40,0,40,0.35)');
    lbl('any fixed finite suite :', 1420, 325, C.mag, sq, 19);
    lblG('f(r) = r²[1 + η h(r)] , h a bump off the suite moduli', 1420, 375, C.white, sq, 17);
    lbl('reproduces every word law in the suite , yet f ≠ r²', 1420, 420, C.dim, sq, 15);
    stamp('NO FINITE CERTIFICATE', 1420, 482, sq, C.mag, 20, -0.03);
    const aq = Q(S, 1, 'active swap symmetry gives the joint Born law', 0.6);
    box(1060, 560, 720, 200, C.green, aq, 2, 'rgba(0,40,20,0.35)');
    lbl('code J(ℂ⁴) , active S₄ calibration p(πξ) = πp(ξ)', 1420, 605, C.green, aq, 17);
    lblG('⇒  p_i(ξ) = |ξ_i|² ,  i = 1 … 4', 1420, 660, C.white, aq, 24);
    lbl('tr (K_Q⁵ X)² = 16√5 − 34 : infinite order , two circles span 𝔰𝔲(2)', 1420, 715, C.dim, aq, 14);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'lean'], [1, 'Fibonacci braid density and the standard conversion and Schmidt bounds are published inputs', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['NAND', 'ball ‖z‖ ≤ 1', C.gold, 'A truth table leaves a ball of channels'], ['REFLECT', 'dense · 2(d−1)', C.mag, 'three reflections are dense'], ['BUS', 'ABAB = I − 2Q⊗R', C.cyan, 'a bus returns'], ['RIGID', 'K ∈ {0, 1}', C.green, 'exact kernels are zero or one'], ['DRIFT', '−aₙ , aₙ/e', C.red, 'a loop phase survives small defects'], ['LOOP', 'θₙ ∈ (1, 5/4)', C.vio, 'a loop phase survives small defects'],
      ['RECORDS', 'gap ≥ 0.0054', C.cyan, 'kept rejection sees it'], ['FIVE MODES', '≥ 3/7', C.orange, 'native readout cannot'], ['CONVERT', '2/3 · 1/2 · n^(−½)', C.gold, 'native readout cannot'], ['BORN', 'p = 2', C.green, 'and no-signalling fixes the square'], ['RADIAL', 'f(r) = r²', C.mag, 'and no-signalling fixes the square']];
    items.forEach(([a1, a2, col, ph], i) => { const row = i < 6 ? 0 : 1, k = row ? i - 6 : i, n = row ? 5 : 6, x = W / 2 + (k - (n - 1) / 2) * 290, y = 230 + row * 150, q = Q(S, 0, ph) * fade; box(x - 135, y, 270, 125, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 45, col, q, 19); lblG(a2, x, y + 92, C.white, q, 18); });
    lbl('LEAN · D5/S3/Arith/FibonacciAtomic/Kernels/NativeKernelRigidity.kernel_zero_or_one (frozen) : the zero-one rigidity', W / 2, 580, C.green, Q(S, 1, 'The zero-one rigidity is a frozen Lean theorem') * fade, 15);
    lbl('PUBLISHED · Freedman–Larsen–Wang density · Chefles–Jozsa–Winter · Terhal–Horodecki · Horodecki–Shor–Ruskai · Aaronson power family', W / 2, 620, C.cyan, Q(S, 1, 'are published inputs') * fade, 14);
    lbl('VOLUME · NAND ball · reflections · bus · K_c · drift · Bargmann loop · records · 3/7 · conversions · p = 2 · radial rigidity', W / 2, 660, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · Choi ranks · reflection words · bus identity · 550 trees · Bₙ for n ≤ 40 · record laws · witnesses · Gram SDP · Δ_p · ten-site words', W / 2, 700, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC QP II · LOOP PHASES', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 量子原理 第二部 · 门合同、闭路相位与平方律 · TRURETURING FILM 077', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A ball of channels, three reflections, a phase that will not vanish, and a power fixed at two.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC QP II', nand: 'NAND CHANNEL BALL', reflect: 'FIXED REFLECTIONS', bus: 'SHARED BUS', rigid: 'ZERO-ONE RIGIDITY', drift: 'NO UNIFORM MODULUS', bargmann: 'BARGMANN LOOP', records: 'RECORDS AND REJECTION', fivemode: 'FIVE-MODE MENU', convert: 'GRAFT AND SPLIT', born: 'POWER LAW TEST', radial: 'RADIAL RIGIDITY', finale: 'LEDGER' });

function poster077() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('Bₙ = a³ [b³(b + ih)]⁵ⁿ ,  θₙ ∈ (1, 5/4)', 1320, 370, { size: 40, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('exact kernels : K ∈ {0, 1}  (Lean)', 1320, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('Δ_p ∝ X + Y − 1  ⇒  p = 2', 1320, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 量子原理 第二部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC QP II · LOOP PHASES', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('门 合 同 · 闭 路 相 位 · 平 方 律', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 077', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster077;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
