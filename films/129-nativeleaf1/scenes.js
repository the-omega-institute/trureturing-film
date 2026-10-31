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

/* ---- film 129: RRO NATIVE LEAF BOUNDARY I · FIRST ARRIVALS, ORDERED ROOTS AND THE HIDDEN LEAF ---- */
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
const _po129 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po129.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po129.set(key, off); }
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
/* ---- film 129 data (from verify129.py / vis129.json) ---- */
const TREE9_129 = {"names": ["ℓ1", "ℓ2", "ℓ3", "ℓ4", "u1", "c1", "m", "c2", "u2"], "edges": [[0, 4], [4, 5], [1, 5], [5, 6], [6, 7], [7, 2], [7, 8], [8, 3]], "w": ["2", "1/2", "3", "1", "2/3", "1", "3/2", "2"], "diag": ["-1", "2", "0", "-3/2", "1", "-2", "1/2", "-1", "3"], "dist": [[0, 3, 5, 6], [3, 0, 4, 5], [5, 4, 0, 3], [6, 5, 3, 0]], "D": [6, 5, 5, 6], "ticks": 22, "reads": 104, "trial1": [["1", "0", "0", "0"], ["-1", "0", "0", "0"], ["5", "0", "0", "0"], ["-5", "3", "0", "0"], ["26", "0", "0", "0"], ["-27", "231/4", "2/3", "0"], ["597/4", "-21/4", "-5/3", "2"]]};
const METRIC9_129 = {"vecs": [[0, [0, 3, 5, 6]], [4, [1, 2, 4, 5]], [5, [2, 1, 3, 4]], [1, [3, 0, 4, 5]], [6, [3, 2, 2, 3]], [7, [4, 3, 1, 2]], [2, [5, 4, 0, 3]], [8, [5, 4, 2, 1]], [3, [6, 5, 3, 0]]], "Q": 32};
const INFECT9_129 = {"order": [[0, 4], [4, 5], [5, 6], [6, 7], [7, 8]], "roots": ["2", "1/2", "1", "2/3", "3/2"], "H": 11, "diag": ["-1", "2", "0", "-3/2", "1", "-2", "1/2", "-1", "3"]};
const WINDOW9_129 = {"x": ["9/5", "-1", "1/2", "-2/3", "-2", "4", "-5/6", "-1/5", "-1"]};
const WIDTH129 = {"bits": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]};
const ROOT129 = {"verts": ["", "L", "LL", "R", "RL", "RLL", "RR"], "edges": [["", "L"], ["L", "LL"], ["", "R"], ["R", "RL"], ["RL", "RLL"], ["R", "RR"]], "terms": ["LL", "RLL", "RR"], "dist": [[0, 5, 4], [5, 0, 3], [4, 3, 0]], "ticks": 14, "reads": 51, "deg2": ["", "L", "RL"]};
const FAM129 = [[2, 10, 15, 14, 54], [3, 16, 23, 25, 108], [4, 22, 33, 37, 190], [5, 28, 44, 50, 300], [6, 34, 57, 64, 448], [7, 40, 71, 79, 632], [8, 46, 87, 95, 864], [9, 52, 104, 112, 1140], [10, 58, 123, 130, 1474], [11, 64, 143, 149, 1860], [12, 70, 165, 169, 2314], [13, 76, 188, 190, 2828], [14, 82, 213, 212, 3420]];
const AGE129 = {"sP": [1, 1, 2, 5, 15, 51, 186, 702, 2691, 10386, 40203], "mP": [1, 0, 1, 0, 2, 0, 5, 0, 15, 0, 51, 0, 186, 0, 702, 0, 2691, 0, 10386, 0, 40203], "frM": [[1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 0, 0], [2, 1, 1], [0, 0, 0], [6, 5, 5], [0, 0, 0], [22, 21, 21], [0, 0, 0], [86, 85, 85], [0, 0, 0], [342, 341, 341], [0, 0, 0]], "frP": [[1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 0, 0], [2, 0, 1], [0, 1, 0], [5, 0, 5], [0, 6, 0], [15, 0, 21], [0, 27, 0], [51, 0, 84], [0, 111, 0], [186, 0, 330], [0, 441, 0]]};
const HID129 = {"ex": {"0": [0, 0, 0, 0, 0, 0, 1, 0, 9, 0, 58, 0, 329, 0, 1751, 0, 8980], "1": [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 12, 0, 94, 0, 611, 0, 3584], "2": [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 12, 0, 94, 0, 611, 0, 3584]}, "rk": [1, 0, 1, 0, 2, 0, 6, 0, 23, 0, 98, 0, 436, 0, 1978, 0, 9064], "md": [1, 0, 1, 0, 2, 0, 6, 0, 23, 0, 98, 0, 436, 0, 1977, 0, 9046], "K": {"0": 6, "1": 8, "2": 8}, "Kinf": 14, "R": 8, "edges": [[0, 3], [3, 4], [4, 5], [5, 1], [4, 6], [6, 2], [3, 7], [7, 8], [8, 9]]};
const FORCE1_129 = {"order": [[0, 3], [1, 5], [5, 4], [3, 7], [4, 6], [7, 8], [8, 9]]};
const TWO129 = {"x": [1, -2, 0, 3, 2, -1], "xz": [1, -2, 0, 3, 3, -2], "Ax": [3, 3, 3, 0, 3, 3]};
/* ---- film 129 helpers ---- */
/* the 9-vertex example tree: spine l1-u1-c1-m-c2-u2-l4, l2 under c1, l3 under c2 */
const T9XY129 = [[0, 0], [2, 1.15], [4, 1.15], [6, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]];
function pos9_129(x0, y0, s) { return T9XY129.map(p => [x0 + p[0] * s, y0 + p[1] * s]); }
/* generic graph: P positions, E edges [[i,j]], o: ecol(e), ea(e), dn(i), r(i), lab(i), lc(i) */
function graph129(P, E, a, o = {}) {
  if (a <= 0) return;
  E.forEach((e, k) => { const q = o.ea ? o.ea(k) : 1; if (q > 0) { const col = o.ecol ? o.ecol(k) : C.cyan; if (o.dash && o.dash(k)) dashed(P[e[0]][0], P[e[0]][1], P[e[1]][0], P[e[1]][1], col, a * q, o.lw || 3); else line(P[e[0]][0], P[e[0]][1], P[e[1]][0], P[e[1]][1], col, a * q, o.lw || 3); } });
  P.forEach((p, i) => { const q = o.va ? o.va(i) : 1; if (q <= 0) return; dot(p[0], p[1], o.r ? o.r(i) : 13, o.dn ? o.dn(i) : 'c', a * q); if (o.lab) { const s = o.lab(i); if (s) lblG(s, p[0] + (o.lx ? o.lx(i) : 0), p[1] + (o.ly ? o.ly(i) : -22), o.lc ? o.lc(i) : C.white, a * q, o.ls || 19); } });
}
const LEAF9 = i => i < 4;
function tree9_129(x0, y0, s, a, o = {}) {
  const P = pos9_129(x0, y0, s);
  graph129(P, TREE9_129.edges, a, Object.assign({ dn: i => (LEAF9(i) ? 'g' : 'c'), lab: i => TREE9_129.names[i], ly: i => (i === 1 || i === 2 ? 34 : -22) }, o));
  return P;
}
/* birth-typed LAB terms: 'a' alpha, 'b' beta, [l, r] branch; material layout */
function labMat129(t) {
  const V = [], E = [], TM = [];
  function go(s, addr, d, par) {
    const i = V.length; V.push({ addr, kind: typeof s === 'string' ? (s === 'a' ? 'alpha' : 'beta') : 'branch', d, x: 0 });
    if (par != null) E.push([par, i, 'log']);
    if (s === 'a') { TM.push(i); V[i].x = TM.length - 1; }
    else if (s === 'b') { const j = V.length; V.push({ addr: addr + 'L', kind: 'marker', d: d + 1, x: 0 }); E.push([i, j, 'mark']); TM.push(j); V[j].x = TM.length - 1; V[i].x = V[j].x; }
    else { const l = go(s[0], addr + 'L', d + 1, i), r = go(s[1], addr + 'R', d + 1, i); V[i].x = (V[l].x + V[r].x) / 2; }
    return i;
  }
  go(t, '', 0, null);
  return { V, E, TM };
}
const KDOT129 = { branch: 'c', beta: 'g', alpha: 'm', marker: 'o' };
function drawLab129(M, x0, y0, sx, sy, a, o = {}) {
  const P = M.V.map(v => [x0 + v.x * sx, y0 + v.d * sy]);
  if (a <= 0) return P;
  M.E.forEach(([i, j, k]) => { if (k === 'mark') line(P[i][0], P[i][1], P[j][0], P[j][1], C.gold, a, 3); else line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.85, 3); });
  M.V.forEach((v, i) => { dot(P[i][0], P[i][1], v.kind === 'marker' ? 10 : 14, KDOT129[v.kind], a); if (o.addr) lbl(v.addr === '' ? 'ε' : v.addr, P[i][0] + 18, P[i][1] + 6, C.dim, a * o.addr, 14, 'left'); if (o.names) { const s = o.names[v.addr]; if (s) lblG(s, P[i][0] - 18, P[i][1] + 6, C.white, a, 18, 'right'); } });
  if (o.term !== false) M.TM.forEach((i, k) => lbl(String(k + 1), P[i][0], P[i][1] + 32, C.orange, a, 17));
  if (o.root !== false) ring(P[0][0], P[0][1], 22, C.white, a * (o.root == null ? 0.8 : o.root), 2);
  return P;
}
function legend129(x, y, a) {
  if (a <= 0) return;
  [['branch', 'c'], ['β root', 'g'], ['α terminal', 'm'], ['marker', 'o']].forEach(([s, d], i) => { dot(x + i * 170, y, 10, d, a); lblG(s, x + i * 170 + 16, y + 6, C.dim, a, 16, 'left'); });
}
function cellrow129(x, y, vals, cw, ch, a, colf, size = 17) {
  if (a <= 0) return;
  vals.forEach((v, i) => { const col = colf ? colf(v, i) : C.cyan; box(x + i * cw, y, cw - 4, ch, col, a, 1.4, 'rgba(0,0,0,0.45)'); lbl(String(v), x + i * cw + (cw - 4) / 2, y + ch / 2 + size * 0.36, col, a, size); });
}
function stems129(px, py, vals, dx, yS, col, a, from = 0) {
  if (a <= 0) return;
  vals.forEach((v, k) => { if (k < from) return; const x = px + k * dx; if (v > 0) { line(x, py, x, yS(v), col, a, 3); dot(x, yS(v), 7, col === C.gold ? 'g' : col === C.mag ? 'm' : 'c', a); } else dot(x, py, 4, 'w', a * 0.5); });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  const P = tree9_129(170, 470, 118, s0, { lab: i => (LEAF9(i) ? TREE9_129.names[i] : null), dn: i => (LEAF9(i) ? 'g' : 'c'), va: i => (LEAF9(i) ? 1 : 0.35), ea: () => 0.45 });
  P.forEach((p, i) => { if (LEAF9(i)) ring(p[0], p[1], 24 + 6 * Math.sin(t * 3 + i), C.gold, s0 * 0.6, 2); });
  lbl('interior hidden : order , links , diagonal unknown', 520, 690, C.dim, s0, 18);
  const cmds = [['reset the field', 'Reset', 'x ↦ 0 on every cell', C.red], ['add a pulse', 'Add(j, u)', 'x ↦ x + u e_ℓj', C.gold], ['tick the hidden law', 'Tick', 'x ↦ T x', C.cyan], ['hold', 'Hold', 'no tick during local work', C.dim], ['read one number', 'Read(j)', 'reply : the rational x_ℓj', C.green]];
  cmds.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(1000, 222 + i * 108, 780, 92, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1060, 278 + i * 108, col, q, 26, 'left'); lblG(s, 1740, 278 + i * 108, C.white, q, 22, 'right'); });
  stamp('WHERE DOES RECOVERY STOP ?', 540, 770, Q(S, 0, 'exactly where does recovery stop', 0.6), C.mag, 30, -0.04);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const P = tree9_129(W / 2 - 330, 360, 110, rp * 0.9, { lab: () => null });
  const k = Math.floor(t * 2) % 8;
  P.forEach((p, i) => { const d = [0, 3, 5, 6, 1, 2, 3, 4, 5][i]; ring(p[0], p[1], 20, C.gold, rp * clamp(1 - Math.abs(d - (t * 2 % 8)) / 1.2), 2.5); });
  chip(330, 600, 330, 58, 'first arrivals', C.gold, rp, 22); chip(W / 2, 600, 330, 58, 'ordered roots', C.cyan, rp, 22); chip(W - 330, 600, 330, 58, 'the hidden leaf', C.mag, rp, 22);
  txt(scramble('RRO NATIVE LEAF BOUNDARY I', rp, 129), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('RRO 原 生 叶 边 界 获 取 第 一 部 · 首 达 、有 序 根 与 隐 藏 的 叶', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 129 · RECURSIVE_RELATIONAL_OBSERVATION_NATIVE_LEAF_BOUNDARY_ACQUISITION · §1–§31', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FIRST ARRIVALS (§1–2, Lemma 2.1, Theorem 2.2) ---- */
SCENES.arrival = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const q0 = Q(S, 0, 'Take a finite tree', 0.6);
  const P = tree9_129(170, 330, 110, q0, { ecol: () => C.cyan });
  const wq = Q(S, 0, 'with positive links', 0.6);
  TREE9_129.edges.forEach((e, k) => { const A = P[e[0]], B = P[e[1]]; lbl(TREE9_129.w[k], (A[0] + B[0]) / 2 + (A[1] === B[1] ? 0 : 22), (A[1] + B[1]) / 2 + (A[1] === B[1] ? -14 : 6), C.cyan, wq, 15); });
  lbl('links : positive rationals ;  diagonal : −1 , 2 , 0 , −3/2 , 1 , −2 , 1/2 , −1 , 3', 500, 520, C.dim, Q(S, 0, 'any signed diagonal', 0.6), 15);
  const pq = Q(S, 0, 'Pulse one leaf and tick', 0.6);
  if (pq > 0) { const ph = (t * 1.6) % 7.5; P.forEach((p, i) => { const d = [0, 3, 5, 6, 1, 2, 3, 4, 5][i]; ring(p[0], p[1], 22, C.gold, pq * clamp(1 - Math.abs(d - ph) / 0.9), 3); }); }
  const f1 = 1 - Q(S, 1, 'Stop each trial once every leaf has answered', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'each other leaf reads exactly zero', 0.6) * f1;
    lbl('trial 1 : Reset , Add(1, 1) , then Tick , reading all four leaves each epoch', 1400, 252, C.dim, q, 15);
    const tx = 1110, ty = 280, cw = 150, ch = 56;
    ['ℓ1', 'ℓ2', 'ℓ3', 'ℓ4'].forEach((s, j) => lblG(s, tx + 60 + j * cw + cw / 2, ty + 24, C.gold, q, 19));
    const first = { 1: 3, 2: 5, 3: 6 };
    TREE9_129.trial1.forEach((row, k) => {
      const qq = clamp(q * 1.8 - k / 9);
      lbl('k=' + k, tx + 40, ty + 50 + k * ch + 36, C.dim, qq, 16, 'right');
      row.forEach((v, j) => { const hit = first[j] === k, zero = v === '0' && j > 0 && k < first[j]; const col = hit ? C.gold : zero ? C.dim : j === 0 ? C.white : '#8aa6c0'; box(tx + 60 + j * cw, ty + 50 + k * ch, cw - 8, ch - 8, col, qq, hit ? 2.5 : 1.2, hit ? 'rgba(60,45,0,0.6)' : 'rgba(0,0,0,0.45)'); lbl(v, tx + 60 + j * cw + (cw - 8) / 2, ty + 50 + k * ch + 32, col, qq, 18); });
    });
    const eq = Q(S, 0, 'then the product of the edge weights', 0.6) * f1;
    chip(530, 620, 800, 58, '(Tᵏ)ᵤᵥ = 0 for k < d ,   (Tᵈ)ᵤᵥ = ∏ edge weights > 0', C.gold, eq, 21);
    lbl('ℓ2 : 2 · 1/2 · 3 = 3     ℓ3 : 2 · 1/2 · 1 · 2/3 · 1 = 2/3     ℓ4 : … = 2', 530, 680, C.white, eq, 16);
    stamp('NOTHING CANCELS', 530, 760, Q(S, 0, 'which nothing cancels', 0.6) * f1, C.green, 30, -0.04);
  }
  const q1 = Q(S, 1, 'Stop each trial once every leaf has answered', 0.6, 0.3);
  if (q1 > 0) {
    const dq = Q(S, 1, 'the whole leaf distance matrix', 0.6);
    lbl('leaf distance matrix d(ℓa, ℓc)', 1400, 262, C.gold, dq, 19);
    const gx = 1180, gy = 290, cw = 92;
    ['ℓ1', 'ℓ2', 'ℓ3', 'ℓ4'].forEach((s, j) => { lblG(s, gx + j * cw + cw / 2, gy - 4 + 22, C.gold, dq, 17); lblG(s, gx - 34, gy + 34 + (j + 1) * cw - cw / 2 + 6, C.gold, dq, 17); });
    TREE9_129.dist.forEach((row, i) => row.forEach((v, j) => { const qq = clamp(dq * 1.6 - (i * 4 + j) / 18); box(gx + j * cw, gy + 30 + i * cw, cw - 8, cw - 8, i === j ? C.dim : C.cyan, qq, 1.6, 'rgba(0,0,0,0.45)'); lbl(String(v), gx + j * cw + (cw - 8) / 2, gy + 30 + i * cw + cw / 2 + 4, i === j ? C.dim : C.white, qq, 26); }));
    lbl('Dₐ = 6 , 5 , 5 , 6', gx + 2 * cw, gy + 30 + 4 * cw + 34, C.white, dq, 19);
    const nq = Q(S, 1, 'with no size known in advance', 0.6);
    lbl('each trial stops at its own Dₐ = max distance ; no bound on N is consulted', 1400, 770, C.dim, nq, 15);
    const cq = Q(S, 1, 'twenty-two ticks', 0.6);
    chip(530, 620, 760, 58, 'Ticks = Σ Dₐ = 22', C.cyan, cq, 26);
    chip(530, 700, 760, 58, 'Reads = b Σ (Dₐ + 1) = 4 · 26 = 104', C.gold, Q(S, 1, 'one hundred and four reads', 0.6), 24);
  }
};

/* ---- 03 METRIC → TREE (Lemma 2.3, Corollary 2.4) ---- */
SCENES.metric = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const q0 = Q(S, 0, 'Leaf distances rebuild the whole tree', 0.6);
  const fq = Q(S, 0, 'a median formula', 0.6);
  chip(530, 250, 840, 54, 'tⱼ = (d_aj + d_ac − d_cj)/2 ,  hⱼ = (d_aj + d_cj − d_ac)/2', C.gold, fq, 20);
  chip(530, 318, 840, 54, 'q(a, c, r)ⱼ = hⱼ + | r − tⱼ |   for 0 ≤ r ≤ d_ac', C.gold, fq, 20);
  lbl('δ(v) = (d(v, ℓ₁), …, d(v, ℓ_b)) ;  ‖δ(u) − δ(v)‖∞ = d(u, v)', 530, 378, C.dim, fq, 15);
  const vq = Q(S, 0, 'keep the distinct vectors', 0.6);
  METRIC9_129.vecs.forEach(([vi, v], i) => { const qq = clamp(vq * 1.7 - i / 12), y = 410 + i * 42; lblG(TREE9_129.names[vi], 220, y + 26, LEAF9(vi) ? C.gold : C.cyan, qq, 19, 'right'); cellrow129(240, y, v, 62, 36, qq, () => (LEAF9(vi) ? C.gold : C.cyan), 17); });
  lbl('tree metric : Ilmavirta – Lassas – Lu – Oksanen – Ylinen ,', 1410, 252, C.cyan, q0 * (1 - Q(S, 1, 'Here thirty-two candidates', 0.4)), 15); lbl('arXiv:2306.05253 , classical tree-only theorem', 1410, 276, C.cyan, q0 * (1 - Q(S, 1, 'Here thirty-two candidates', 0.4)), 15);
  const jq = Q(S, 0, 'join those at sup distance one', 0.6);
  const P = tree9_129(1080, 420, 110, jq, { lab: i => TREE9_129.names[i] });
  lbl('rebuilt : every unit subdivision kept', 1410, 640, C.cyan, jq * (1 - Q(S, 1, 'Here thirty-two candidates', 0.6)), 17);
  const f1 = 1 - Q(S, 1, 'Here thirty-two candidates', 0.6);
  if (f1 > 0) {
    METRIC9_129.vecs.forEach(([vi, v]) => { const p = P[vi]; lbl('(' + v.join(',') + ')', p[0] + (vi === 5 || vi === 7 ? 44 : 0), p[1] + (vi === 1 || vi === 2 ? 66 : vi === 6 || vi === 8 ? 62 : 36), '#8aa6c0', jq * f1, 14); });
  }
  const q1 = Q(S, 1, 'Here thirty-two candidates', 0.6, 0.2);
  if (q1 > 0) {
    chip(1410, 270, 620, 54, 'Q = Σ (d_ac + 1) = 32 candidates', C.gold, q1, 21);
    chip(1410, 340, 620, 54, '→ 9 distinct : N = 9 , I = N − b = 5', C.cyan, Q(S, 1, 'collapse to nine vertices', 0.6), 21);
    const dq = Q(S, 1, 'No leaf path is longer than that count plus one', 0.6);
    chip(1410, 700, 620, 54, 'D ≤ I + 1 :  here D = 6 = I + 1', C.green, dq, 21);
    lbl('Q ≤ C(b, 2)(D + 1) = 42', 1410, 760, C.dim, dq, 16);
    stamp('EXACTLY SIX', 1410, 625, Q(S, 1, 'the longest is exactly six', 0.6), C.gold, 26, -0.05);
    const pth = [0, 4, 5, 6, 7, 8, 3];
    for (let i = 0; i + 1 < pth.length; i++) line(P[pth[i]][0], P[pth[i]][1], P[pth[i + 1]][0], P[pth[i + 1]][1], C.gold, dq, 6);
  }
};

/* ---- 04 INFECTION (Lemma 3.2, Theorem 3.3) ---- */
SCENES.infect = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const q0 = Q(S, 0, 'Next the coefficients', 0.6);
  const L0 = lineAt(S, 0), sweep = clamp((S.u - L0.s - 2.5) / Math.max(1, (L0.e - L0.s) * 0.6));
  const nForce = Math.floor(sweep * 5.99);
  const marked = new Set([0, 1, 2, 3]); INFECT9_129.order.forEach(([v, w], k) => { if (k < nForce) marked.add(w); });
  const fe = new Set(); INFECT9_129.order.forEach(([v, w], k) => { if (k < nForce) fe.add(Math.min(v, w) + ',' + Math.max(v, w)); });
  const P = tree9_129(170, 330, 110, q0, { dn: i => (marked.has(i) ? 'g' : 'w'), va: i => (marked.has(i) ? 1 : 0.5), ecol: k => { const e = TREE9_129.edges[k]; return fe.has(Math.min(e[0], e[1]) + ',' + Math.max(e[0], e[1])) ? C.gold : C.cyan; } });
  const aq = Q(S, 0, 'a marked vertex with exactly one unmarked neighbour marks it', 0.6);
  INFECT9_129.order.forEach(([v, w], k) => { if (k < nForce || (k === nForce && sweep < 1)) { const A = P[v], B = P[w], f = k < nForce ? 1 : clamp(sweep * 6 - k); if (f > 0) arrow(A[0] + 12, A[1] + 30, A[0] + 12 + (B[0] - A[0] - 24) * f, B[1] + 30, C.gold, aq * 0.9, 2.5); } });
  lbl('step ' + Math.min(5, nForce) + ' / 5 = I', 500, 560, C.gold, aq, 18);
  const f1 = 1 - Q(S, 1, 'With b more trials', 0.6);
  if (f1 > 0) {
    const rq = Q(S, 0, 'isolates one new link from a residual', 0.6) * f1;
    chip(1400, 260, 780, 54, 'r = z·p_v − a·p_v − Σ c_u·p_u   (u marked , u ∼ v)', C.gold, rq, 20);
    chip(1400, 326, 780, 54, 'realized : E(r) = T_wv e_w  ⇒  ⟨r, r⟩_M = T_wv²', C.cyan, rq, 20);
    lbl('a = ⟨p_v, z p_v⟩_M = T_vv ,  c_u = ⟨p_u, z p_v⟩_M = T_uv', 1400, 386, C.dim, rq, 15);
    lbl('force', 1130, 440, C.dim, rq, 16); lbl('new link = √⟨r, r⟩', 1560, 440, C.dim, rq, 16);
    INFECT9_129.order.forEach(([v, w], k) => { const qq = clamp(rq * 1.6 - k / 7), y = 460 + k * 58; box(1060, y, 680, 48, C.gold, qq, 1.4, 'rgba(0,0,0,0.45)'); lblG(TREE9_129.names[v] + ' → ' + TREE9_129.names[w], 1180, y + 32, C.white, qq, 19); lbl('T = ' + INFECT9_129.roots[k], 1560, y + 32, C.gold, qq, 20); });
    lbl('Burgarth – Maruyama , arXiv:0903.0612 , infection residual', 530, 640, C.cyan, Q(S, 0, 'the infection method of Burgarth and Maruyama', 0.6) * f1, 16);
  }
  const q1 = Q(S, 1, 'With b more trials', 0.6, 0.2);
  if (q1 > 0) {
    chip(1400, 260, 780, 54, 'M_k = Jᵀ Tᵏ J ,  0 ≤ k ≤ H = 2I + 1 = 11', C.gold, q1, 22);
    lbl('b²(H + 1) = 192 reads ,  b H = 44 ticks ;  largest degree used : exactly 11', 1400, 318, C.dim, q1, 15);
    const dq = Q(S, 1, 'give every diagonal and link exactly', 0.6);
    lbl('recovered diagonal T_vv', 1400, 372, C.white, dq, 17);
    cellrow129(1046, 392, INFECT9_129.diag, 80, 46, dq, v => (v[0] === '-' ? C.mag : C.cyan), 17);
    lbl('recovered links : 2 , 1/2 , 3 , 1 , 2/3 , 1 , 3/2 , 2  — all exact', 1400, 480, C.cyan, dq, 16);
    stamp('EXACT', 1400, 560, Q(S, 1, 'one rational square root per step', 0.6), C.green, 30, -0.04);
    const sq = Q(S, 1, 'Repeated eigenvalues do no harm', 0.6);
    const cx = 1240, cy = 700; [[-110, -40], [0, 70], [110, -40]].forEach(([dx, dy]) => { line(cx, cy, cx + dx, cy + dy, C.cyan, sq, 3); dot(cx + dx, cy + dy, 12, 'g', sq); }); dot(cx, cy, 14, 'c', sq);
    lbl('unit star K₁,₃ : spectrum √3 , −√3 , 0 , 0', 1600, 690, C.white, sq, 17); lbl('recovered from M₀ … M₃', 1600, 724, C.green, Q(S, 1, 'is recovered too', 0.6), 17);
  }
};

/* ---- 05 PASSIVE WINDOW AND WIDTH (Theorem 5.1, Proposition 7.5) ---- */
SCENES.window = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Exact widths still grow', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'any current field can be read without a reset', 0.6) * f1;
    const P = tree9_129(170, 330, 110, q, { lab: i => WINDOW9_129.x[i], lc: () => C.gold, ly: i => (i === 1 || i === 2 ? 36 : -22) });
    P.forEach((p, i) => { if (!LEAF9(i)) ring(p[0], p[1], 20, C.mag, q * 0.6, 2); });
    lbl('an arbitrary current field x (gold) ; interior values never read directly', 530, 560, C.dim, q, 15);
    const wq = Q(S, 0, 'read all leaves, tick five times', 0.6) * f1;
    lbl('window y_r = Jᵀ Tʳ x ,  r = 0 … 5', 1400, 262, C.gold, wq, 19);
    for (let r = 0; r <= 5; r++) { const qq = clamp(wq * 1.8 - r / 7); lbl('r=' + r, 1100, 318 + r * 52, C.dim, qq, 16, 'right'); for (let j = 0; j < 4; j++) { box(1120 + j * 150, 290 + r * 52, 140, 42, C.cyan, qq, 1.3, 'rgba(0,0,0,0.45)'); lblG('Read(' + (j + 1) + ')', 1190 + j * 150, 318 + r * 52, C.cyan, qq, 15); } }
    const rq = Q(S, 0, 'these twenty-four readings recover the starting field exactly', 0.6) * f1;
    chip(1400, 640, 760, 56, 'x_v = Σ_r p_v,rᵀ y_r  (degree ≤ I = 5)', C.green, rq, 22);
    lbl('b (I + 1) = 4 · 6 = 24 reads ,  5 ticks ,  no Reset , no inverse of T', 1400, 700, C.dim, rq, 15);
    chip(530, 640, 800, 56, 'predictor installed at Tᴵ x , the actual advanced cut', C.cyan, Q(S, 0, 'so the predictor starts at the advanced cut', 0.6) * f1, 20);
    stamp('EXACT START FIELD', 1400, 780, rq, C.green, 26, -0.04);
  }
  const q1 = Q(S, 1, 'Exact widths still grow', 0.6, 0.2);
  if (q1 > 0) {
    const cx = 420, cy = 420; const L3 = [[-150, -90], [150, -90], [0, 160]];
    const sq = Q(S, 1, 'On the three-leaf star', 0.6);
    L3.forEach(([dx, dy], i) => { line(cx, cy, cx + dx, cy + dy, C.cyan, sq, 3); dot(cx + dx, cy + dy, 14, 'g', sq); lblG('ℓ' + (i + 1), cx + dx + (dx < 0 ? -26 : dx > 0 ? 26 : 30), cy + dy + 6, C.gold, sq, 19); lbl('1/16', cx + dx / 2 + (dx === 0 ? 30 : 0), cy + dy / 2 - 10, C.cyan, sq, 15); });
    dot(cx, cy, 15, 'c', sq); lbl('diag 1/2', cx + 40, cy + 6, C.dim, sq, 15, 'left');
    const eq = Q(S, 1, 'e one minus e two has eigenvalue one half', 0.6);
    lblG('+1', cx - 150, cy - 130, C.green, eq, 22); lblG('−1', cx + 150, cy - 130, C.mag, eq, 22);
    chip(530, 640, 800, 56, 'T(e₁ − e₂) = ½ (e₁ − e₂) : the centre contributions cancel', C.green, eq, 20);
    lbl('spectrum ½ , ½ , ½ ± √3/16  ⇒  0 < T < 1', 530, 700, C.dim, Q(S, 1, 'from a strict contraction', 0.6), 16);
    const pq = Q(S, 1, 'so leaf one reads two to the minus k', 0.6);
    const px = 1080, py = 760, pw = 660, ph = 420, nb = WIDTH129.bits.length;
    plotAxes(px, py, pw, ph, pq, 'k = 0 … 20', 'bits');
    let cum = 0; const cumv = WIDTH129.bits.map(b => (cum += b));
    const yS = v => py - v / 240 * ph, dx = pw / (nb + 1);
    WIDTH129.bits.forEach((b, k) => { const qq = clamp(pq * 1.8 - k / 30), x = px + (k + 1) * dx; fillBox(x - 9, yS(b), 18, py - yS(b), C.gold, qq * 0.55); rect63(x - 9, yS(b), 18, py - yS(b), C.gold, qq, 1.2); });
    curve(p => { const k = Math.min(nb - 1, Math.floor(p * (nb - 1))); return [px + (k + 1) * dx, yS(cumv[k])]; }, nb - 1, C.mag, pq, 3);
    lbl('Read(1) = 2⁻ᵏ : denominator k + 1 bits', px + 20, py - ph + 20, C.gold, pq, 16, 'left');
    lbl('retained replies : Σ = 231 bits by k = 20 (quadratic)', px + 20, py - ph + 48, C.mag, pq, 16, 'left');
    stamp('WIDTH GROWS', 530, 785, Q(S, 1, 'from a strict contraction', 0.6), C.red, 28, -0.04);
  }
};

/* ---- 06 TWINS (Theorem 8.1) ---- */
function star129(cx, cy, R, hidden, a, o = {}) {
  if (a <= 0) return;
  const vis = [[-R, -R * 0.55], [0, -R], [R, -R * 0.55]];
  vis.forEach(([dx, dy], i) => { line(cx, cy, cx + dx, cy + dy, C.cyan, a, 3); dot(cx + dx, cy + dy, 13, 'g', a); lblG('ℓ' + (i + 1), cx + dx, cy + dy - 22, C.gold, a, 18); });
  hidden.forEach(([dx, dy, lab, w], i) => { dashed(cx, cy, cx + dx, cy + dy, C.mag, a, 3); dot(cx + dx, cy + dy, 13, 'm', a); lblG(lab, cx + dx + (dx < 0 ? -22 : 22), cy + dy + 30, C.mag, a, 18); lblG(w, cx + dx / 2 + (dx < 0 ? -36 : dx > 0 ? 36 : 34), cy + dy / 2 + 6, C.mag, a, 16); });
  dot(cx, cy, 15, 'c', a); lbl('c', cx + 22, cy - 6, C.white, a, 17, 'left');
}
SCENES.twins = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'Now drop one leaf from the roster', 0.6);
  const aq = Q(S, 0, 'Star one has b visible leaves and one hidden leaf', 0.6);
  const sx1 = lerp(450, 330, Q(S, 1, 'Sending the hidden leaf', 0.8)), sx2 = lerp(1400, 1590, Q(S, 1, 'Sending the hidden leaf', 0.8));
  star129(sx1, 510, 180, [[0, 170, 'h', 'a']], aq);
  lbl('order b + 2 = 5', sx1, 790, C.white, aq, 20);
  lbl('links a = 1/(8(b + 1)) = 1/32 (b = 3) , diagonal ½', sx1, 262, C.dim, aq, 15);
  const bq = Q(S, 0, 'star two splits the hidden leaf in two', 0.6);
  star129(sx2, 510, 180, [[-110, 160, 'h₁', '3a/5'], [110, 160, 'h₂', '4a/5']], bq);
  lbl('order b + 3 = 6', sx2, 790, C.white, bq, 20);
  lbl('same visible links a , diagonal ½', sx2, 262, C.dim, bq, 15);
  const iq = Q(S, 1, 'Sending the hidden leaf to three fifths of one plus four fifths of the other', 0.6);
  if (iq > 0) {
    chip(W / 2, 330, 620, 54, 'U e_h = 3/5 e_h₁ + 4/5 e_h₂', C.gold, iq, 22);
    arrow(680, 560, 1240, 560, C.gold, iq, 3);
    const lq = Q(S, 1, 'intertwines the laws', 0.6);
    chip(W / 2, 400, 620, 54, "T′U = UT ,  J′ = UJ ,  J′ᵀU = Jᵀ", C.cyan, lq, 22);
    lbl('centre return : (3a/5)(3/5) + (4a/5)(4/5) = a', W / 2, 470, C.dim, lq, 15);
    lbl('−4/5 e_h₁ + 3/5 e_h₂ : hidden eigenvalue ½', W / 2, 500, C.dim, lq, 15);
    stamp('SAME VISIBLE SERVICE', W / 2, 640, Q(S, 1, 'so every visible reply agrees for every policy', 0.6), C.green, 22, -0.03);
    lbl('adjacency eigenvalues ± a√(b + 1) = ± 1/16 ⇒ 0 < T, T′ < 1', W / 2, 720, C.white, Q(S, 1, 'Both are strict contractions', 0.6), 15);
    stamp('5 ≠ 6', W / 2, 800, Q(S, 1, 'of orders b plus two and b plus three', 0.6), C.red, 30, -0.03);
  }
};

/* ---- 07 ROOT RIGIDITY (§10–11, Theorems 11.1–11.2) ---- */
const TPLUS129 = ['b', ['b', 'a']];
SCENES.root = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'The unrooted material tree', 'lean'], [1, null, 'theory']]);
  const q0 = Q(S, 0, 'the birth-typed LAB trees', 0.6);
  const f1 = 1 - Q(S, 1, 'on the unit-adjacency field', 0.6);
  if (f1 > 0) {
    const kq = Q(S, 0, 'alpha is a terminal', 0.6) * f1;
    const parts = [['alpha is a terminal', 'α', 'a terminal vertex'], ['beta carries one left marker', 'β', 'a vertex + left marker'], ['the birth-typed LAB trees', '⟨ , ⟩', 'two ordered children']];
    [['alpha is a terminal', 'm', 'α : terminal vertex'], ['beta carries one left marker', 'g', 'β : vertex with left marker'], ['the birth-typed LAB trees', 'c', 'branch : two ordered children']].forEach(([ph, d, s], i) => { const qq = Q(S, 0, ph, 0.6) * f1; dot(170, 290 + i * 54, 12, d, qq); lblG(s, 196, 296 + i * 54, C.white, qq, 19, 'left'); });
    const bq = Q(S, 0, 'every left-ending leaf is beta', 0.6) * f1;
    chip(530, 470, 760, 54, 'birth rule : no α at an address ending in L', C.gold, bq, 21);
    const M = labMat129(TPLUS129);
    drawLab129(M, 1250, 280, 170, 100, q0 * f1, { addr: 1 });
    lblG('t₊ = ⟨β, ⟨β, α⟩⟩', 1420, 680, C.white, q0 * f1, 22);
    legend129(1080, 740, q0 * f1);
    const lq = Q(S, 0, 'The unrooted material tree', 0.6) * f1;
    chip(530, 570, 800, 56, 'unrooted tree + ordered terminals ⇒ root and term', C.green, lq, 21);
    lbl('Lean : NativeMaterialRootRecognition.original_rigidity , effective_inverse (frozen)', 530, 630, C.green, lq, 14);
    lbl('recomputed : unique root on all 2318 birth-typed terms with 3 – 7 leaves', 530, 662, C.dim, lq, 14);
  }
  const q1 = Q(S, 1, 'on the unit-adjacency field', 0.6, 0.2);
  if (q1 > 0) {
    const M = labMat129(TPLUS129);
    const P = drawLab129(M, 250, 290, 170, 100, q1, { root: 0, term: true });
    const cq = Q(S, 1, 'of three degree-two candidates', 0.6);
    const cand = { '': [true, 'root'], 'L': [false, 'β root L'], 'RL': [false, 'β root RL'] };
    M.V.forEach((v, i) => { const c = cand[v.addr]; if (!c) return; ring(P[i][0], P[i][1], 26, c[0] ? C.green : C.red, cq, 3); lbl((c[0] ? '✓ ' : '✗ ') + c[1], P[i][0] + 34, P[i][1] - 18, c[0] ? C.green : C.red, cq, 16, 'left'); });
    lbl('rerooting at a β root forces a unary vertex with a nonterminal child', 530, 760, C.dim, cq, 15);
    const tq = Q(S, 1, 'L pulse trials earn tree, size and law at once', 0.6);
    chip(1400, 270, 760, 54, 'unit adjacency : links 1 , diagonal 0 — no coefficient trials', C.cyan, tq, 19);
    lbl('terminal distance table', 1400, 340, C.gold, tq, 17);
    ROOT129.dist.forEach((row, i) => row.forEach((v, j) => { box(1250 + j * 100, 360 + i * 70, 92, 62, i === j ? C.dim : C.cyan, tq, 1.5, 'rgba(0,0,0,0.45)'); lbl(String(v), 1296 + j * 100, 400 + i * 70, i === j ? C.dim : C.white, tq, 24); }));
    const nq = Q(S, 1, 'three trials take fourteen ticks and fifty-one reads', 0.6);
    chip(1400, 620, 760, 54, 'Ticks Σ Dⱼ = 5 + 5 + 4 = 14 ,  Reads L(K + L) = 51', C.gold, nq, 20);
    lbl('N = 2L + c − 1 = 7 material vertices , all earned', 1400, 680, C.dim, nq, 16);
    stamp('ONLY THE TRUE ROOT', 1400, 770, Q(S, 1, 'only the true root parses', 0.6), C.green, 28, -0.04);
  }
};

/* ---- 08 LOAD-BEARING HYPOTHESES (Theorems 14.1–14.3) ---- */
SCENES.load = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Without birth typing', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Without the terminal order', 0.6) * f1;
    const Mu = labMat129(['b', ['b', 'a']]), Mv = labMat129([['b', 'a'], 'b']);
    drawLab129(Mu, 300, 300, 150, 92, q, { addr: 1 }); drawLab129(Mv, 1250, 300, 150, 92, q, { addr: 1 });
    lblG('u = ⟨β, ⟨β, α⟩⟩', 450, 700, C.white, q, 22); lblG('v = ⟨⟨β, α⟩, β⟩', 1400, 700, C.white, q, 22);
    const eq = Q(S, 0, 'answer every field experiment alike', 0.6) * f1;
    arrow(760, 470, 1120, 470, C.gold, eq, 3); arrow(1120, 470, 760, 470, C.gold, eq, 3);
    lbl('swap the root children :', 940, 420, C.dim, eq, 15); lbl('same unordered field service', 940, 520, C.gold, eq, 17);
    const sq = Q(S, 0, 'yet a split at address L is allowed in one', 0.6) * f1;
    chip(450, 770, 520, 52, 'S_L at L = β : enabled', C.green, sq, 21);
    chip(1400, 770, 520, 52, 'S_L at L = branch : refused', C.red, Q(S, 0, 'refused in the other', 0.6) * f1, 21);
  }
  const q1 = Q(S, 1, 'Without birth typing', 0.6, 0.2);
  if (q1 > 0) {
    const tq = Q(S, 1, 'one six-vertex tree with terminals c, d, e', 0.6);
    const Mt = labMat129([['b', 'a'], 'a']);
    drawLab129(Mt, 260, 290, 160, 92, tq, { names: { '': 'r', 'L': 'h', 'LL': 'b', 'LLL': 'c', 'LR': 'd', 'R': 'e' } });
    lblG('rooted at r : ⟨⟨β, α⟩, α⟩  reachable', 420, 680, C.green, tq, 19);
    const sq = Q(S, 1, 'alpha with alpha-beta', 0.6);
    const Ms = labMat129(['a', ['a', 'b']]);
    drawLab129(Ms, 1180, 290, 160, 92, sq, { names: { '': 'b', 'L': 'c', 'R': 'h', 'RL': 'd', 'RR': 'r', 'RRL': 'e' } });
    lblG('rooted at b : ⟨α, ⟨α, β⟩⟩  α at address L', 1340, 680, C.red, sq, 19);
    lbl('edges rh , re , hb , hd , bc ;  terminals (c, d, e) ;  identical ordered waves', W / 2, 250, C.dim, tq, 15);
    const wq = Q(S, 1, 'two growth words reaching the same term are never told apart', 0.6);
    chip(W / 2, 760, 1300, 54, 'P_ε S_ε S_L P_R   and   P_ε S_ε P_R S_L   both end at ⟨⟨β, α⟩, β⟩ , same split word (ε, L)', C.gold, wq, 19);
  }
};

/* ---- 09 SPARSE ONSETS (§17–18, Theorems 17.3, 18.2, 18.4) ---- */
const COMB129 = [[[[['b', 'b'], 'b'], 'b'], 'b']];
SCENES.sparse = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'two L minus three onsets suffice', 0.6);
  const M = labMat129(COMB129[0]);
  const P = drawLab129(M, 230, 255, 130, 76, q0, {});
  const f1 = 1 - Q(S, 1, 'Each edge is crossed twice', 0.6);
  if (f1 > 0) {
    const aq = Q(S, 0, 'distances from the first terminal to the rest', 0.6) * f1;
    lblG('a₂ … a₅ = d(ℓ₁, ℓⱼ) :', 1080, 300, C.gold, aq, 19, 'left'); cellrow129(1380, 270, [4, 5, 6, 7], 80, 44, aq, () => C.gold, 20);
    const cq = Q(S, 0, 'and between consecutive terminals', 0.6) * f1;
    lblG('c₂ … c₄ = d(ℓᵢ, ℓᵢ₊₁) :', 1080, 370, C.cyan, cq, 19, 'left'); cellrow129(1380, 340, [5, 5, 5], 80, 44, cq, () => C.cyan, 20);
    lbl('2L − 3 = 7 onsets , from 4 trials ; each sampled scalar is 0 or 1', 1400, 430, C.dim, cq, 15);
    const hq = Q(S, 0, 'is where neighbouring paths part', 0.6) * f1;
    chip(1400, 500, 760, 54, 'hᵢ = (aᵢ + aᵢ₊₁ − cᵢ)/2 = 2 , 3 , 4', C.green, hq, 21);
    lbl('g(i, j) = min hᵣ (i ≤ r < j) ;  interval geometry : Lambert – Popovic , arXiv:1101.2241', 1400, 556, C.dim, hq, 14);
    const gq = Q(S, 0, 'gluing unit paths rebuilds the tree', 0.6) * f1;
    chip(1400, 630, 760, 54, 'climb to depth hⱼ₋₁ , attach a unit path of length aⱼ − hⱼ₋₁', C.cyan, gq, 18);
    lbl('recomputed : rebuilt and rooted on all 2318 birth-typed terms , 3 – 7 leaves', 1400, 690, C.dim, gq, 14);
    const prog = clamp((S.u - lineAt(S, 0).s) / 3 - 2) % 1;
    if (aq > 0) { const tm = M.TM; const j = 1 + Math.floor(((S.t * 0.5) % 4)); const A = P[tm[0]], B = P[tm[j]]; ring(A[0], A[1], 20, C.gold, aq, 3); ring(B[0], B[1], 20, C.gold, aq, 3); }
  }
  const q1 = Q(S, 1, 'Each edge is crossed twice', 0.6, 0.2);
  if (q1 > 0) {
    chip(1400, 270, 760, 54, 'a₂ + Σ cᵢ + a_L = 4 + 15 + 7 = 26 = 2(N − 1)', C.gold, q1, 21);
    const pq = Q(S, 1, 'On a comb with m branches', 0.6);
    const px = 1060, py = 540, pw = 680, ph = 200, xS = m => px + (m - 2) / 12 * pw, yT = v => py - v / 220 * ph;
    plotAxes(px, py, pw, ph, pq, 'm', 'ticks');
    curve(p => [xS(2 + p * 12), yT(6 * (2 + p * 12) - 2)], 40, C.green, pq, 3);
    FAM129.forEach(r => { dot(xS(r[0]), yT(r[1]), 6, 'n', pq); dot(xS(r[0]), yT(r[2]), 6, 'r', pq); });
    curve(p => { const i = Math.min(FAM129.length - 1, Math.floor(p * (FAM129.length - 1))); return [xS(FAM129[i][0]), yT(FAM129[i][2])]; }, FAM129.length - 1, C.red, pq, 2);
    lbl('sparse 6m − 2', xS(14) + 6, yT(82) + 6, C.green, pq, 15, 'left'); lbl('full Σ Dⱼ', xS(14) + 6, yT(213) + 6, C.red, pq, 15, 'left');
    const rq = Q(S, 1, 'and quadratic reads against cubic', 0.6);
    const py2 = 790, ph2 = 190, yR = v => py2 - Math.log10(v) / Math.log10(4000) * ph2;
    plotAxes(px, py2, pw, ph2, rq, 'm', 'reads (log)');
    FAM129.forEach(r => { dot(xS(r[0]), yR(r[3]), 6, 'n', rq); dot(xS(r[0]), yR(r[4]), 6, 'r', rq); });
    lbl('(m² + 17m − 10)/2', xS(14) + 6, yR(212) + 6, C.green, rq, 15, 'left'); lbl('L(K_full + L)', xS(14) + 6, yR(3420) + 6, C.red, rq, 15, 'left');
    chip(530, 700, 760, 54, 'comb u_m : L = m + 1 , N = 3m + 2 , aⱼ = j + 2 , cᵢ = 5', C.cyan, pq, 20);
    lbl('m = 14 : 82 vs 213 ticks ,  212 vs 3420 reads', 530, 760, C.white, rq, 17);
    stamp('LINEAR TICKS', 1250, 395, Q(S, 1, 'this takes six m minus two ticks', 0.6), C.green, 22, -0.04);
  }
};

/* ---- 10 PASSIVE AGE (§19–22) ---- */
SCENES.age = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A late observer with no clock', 0.6);
  if (f1 > 0) {
    const q = Math.max(clamp(S.u / 1.0), Q(S, 0, 'After a pulse at terminal one and k ticks', 0.6)) * f1;
    const M = labMat129(TPLUS129);
    const P = drawLab129(M, 230, 300, 150, 90, q, {});
    ring(P[M.TM[0]][0], P[M.TM[0]][1], 22 + 6 * Math.sin(t * 4), C.gold, q, 3);
    lblG('t₊ = ⟨β, ⟨β, α⟩⟩ , pulse at terminal 1', 400, 670, C.white, q, 18);
    const wq = Q(S, 0, 'its reading counts closed walks', 0.6) * f1;
    const px = 1060, py = 640, pw = 700, ph = 360, dx = pw / 21, yS = v => py - Math.log10(v + 1) / Math.log10(50000) * ph;
    plotAxes(px, py, pw, ph, wq, 'age k = 0 … 20', 'm_k = (Aᵏ)₁₁  (log)');
    stems129(px + dx / 2, py, AGE129.mP, dx, yS, C.gold, wq);
    AGE129.mP.forEach((v, k) => { if (k % 2 === 0 && k <= 16) lbl(String(v), px + dx / 2 + k * dx, yS(v) - 16, C.white, wq, 13); });
    const zq = Q(S, 0, 'zero at odd ages', 0.6) * f1;
    lbl('odd ages : 0 (bipartite)', px + 20, py - ph + 10, C.dim, zq, 15, 'left');
    lbl('even ages : 1 , 1 , 2 , 5 , 15 , 51 , 186 , … strictly increasing', px + 20, py - ph + 36, C.gold, Q(S, 0, 'strictly increasing at even ages', 0.6) * f1, 15, 'left');
    const pq = Q(S, 0, 'So two consecutive readings fix every age from two on', 0.6) * f1;
    chip(530, 730, 760, 54, 'p_k = (m_k−1 , m_k) injective for k ≥ 2', C.green, pq, 22);
    chip(1400, 730, 600, 54, 'p₁ = p₃ = (1, 0)', C.red, Q(S, 0, 'ages one and three collide', 0.6) * f1, 22);
  }
  const q1 = Q(S, 1, 'A late observer with no clock', 0.6, 0.2);
  if (q1 > 0) {
    const steps = [['Read(1)', 'm_k'], ['Tick', 'ACK'], ['Read(1)', 'm_k+1'], ['Hold', 'ACK']];
    const sq = Q(S, 1, 'needs read, tick, read, hold', 0.6);
    steps.forEach(([a1, a2], i) => { const x = 210 + i * 200; box(x - 85, 260, 170, 96, i === 1 ? C.cyan : i === 3 ? C.dim : C.gold, sq, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, C.white, sq, 20); lbl(a2, x, 336, C.dim, sq, 16); if (i < 3) arrow(x + 88, 308, x + 112, 308, C.dim, sq, 2); });
    chip(510, 410, 760, 54, 'pair (m_k , m_k+1) = p_h  ⇒  age h = k + 1 , vector Aʰ e', C.green, Q(S, 1, 'install the predictor at the true age plus one', 0.6), 20);
    lbl('two reads , one tick : no counter , no transcript , no inverse of A', 510, 470, C.dim, sq, 15);
    const fq = Q(S, 1, 'A single snapshot of all terminals', 0.6);
    const cols = [['t₋ = ⟨⟨β, β⟩, α⟩ : depths (3, 3, 1)', AGE129.frM, 4, C.red], ['t₊ = ⟨β, ⟨β, α⟩⟩ : depths (2, 3, 2)', AGE129.frP, 5, C.green]];
    cols.forEach(([h, fr, D1, col], c) => {
      const x0 = 1000 + c * 400; lblG(h, x0 + 175, 262, col, fq, 16);
      for (let k = 4; k <= 11; k++) { const row = fr[k], zero = row.every(v => v === 0), y = 282 + (k - 4) * 56, qq = clamp(fq * 1.8 - (k - 4) / 10); lbl('k=' + k, x0 + 30, y + 32, k >= D1 ? C.white : C.dim, qq, 15, 'right'); cellrow129(x0 + 40, y, row, 100, 46, qq, () => (zero ? C.red : C.cyan), 16); }
      lbl('tail k ≥ D₁ = ' + D1, x0 + 175, 750, C.dim, fq, 15);
    });
    const bq = Q(S, 1, 'exactly when terminals meet both colour classes', 0.6);
    lbl('one colour class : zero frame at every odd age', 1200, 790, C.red, bq, 15); lbl('both classes : injective tail', 1600, 790, C.green, bq, 15);
    stamp('BOTH COLOURS', 510, 640, bq, C.green, 30, -0.04);
  }
};

/* ---- 11 HIDDEN LEAF (§25–27, Theorems 25.3, 26.2, 27.2) ---- */
const HXY129 = [[0, 0], [4, 0], [2, 2], [1, 0], [2, 0], [3, 0], [2, 1], [1, 1], [1, 2], [1, 3]];
const HN129 = ['ℓ1', 'ℓ2', 'ℓ3', 'v', 'c', '', '', 't1', 't2', 't3'];
function hidTree129(x0, y0, s, a, tailA, o = {}) {
  const P = HXY129.map(p => [x0 + p[0] * s, y0 + p[1] * s]);
  graph129(P, HID129.edges, a, { ecol: k => (k >= 6 ? C.mag : C.cyan), dash: k => k >= 6, ea: k => (k >= 6 ? tailA : 1), va: i => (i >= 7 ? tailA : 1), dn: i => (i < 3 ? 'g' : i >= 7 ? 'm' : i === 3 ? 'o' : 'c'), lab: i => HN129[i], lx: i => (i >= 7 ? -30 : i === 2 ? 30 : 0), ly: i => (i >= 7 || i === 2 ? 6 : -22), lc: i => (i >= 7 ? C.mag : i === 3 ? C.orange : C.white) });
  return P;
}
SCENES.hidden = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'now with exactly one leaf missing from the roster', 0.6);
  const tq = Q(S, 0, 'the rest is one pendant path', 0.6);
  const f1 = 1 - Q(S, 1, 'The same last pulse finds it', 0.6);
  const P = hidTree129(190, 300, 140, q0, 0.25 + 0.75 * tq);
  lbl('t3 : actual leaf , no port', 300, 760, C.mag, tq, 15, 'left');
  if (f1 > 0) {
    const hq = Q(S, 0, 'The visible leaves span a hull', 0.6) * f1;
    chip(1400, 290, 760, 54, 'hull H = spanning tree of ℓ1 , ℓ2 , ℓ3  (7 vertices)', C.cyan, hq, 20);
    chip(1400, 360, 760, 54, 'G = H + one pendant path of length ℓ at v', C.mag, tq * f1, 21);
    const iq = Q(S, 0, 'invisible to every visible distance', 0.6) * f1;
    lbl('visible distances : d(ℓ1, ℓ2) = d(ℓ1, ℓ3) = d(ℓ2, ℓ3) = 4', 1400, 450, C.white, iq, 17);
    lbl('the same for ℓ = 1 , 2 , 3 , … : N = |H| + ℓ not determined', 1400, 486, C.dim, iq, 16);
    stamp('METRIC IS BLIND', 1400, 600, iq, C.red, 30, -0.04);
  }
  const q1 = Q(S, 1, 'The same last pulse finds it', 0.6, 0.2);
  if (q1 > 0) {
    ring(P[1][0], P[1][1], 24 + 5 * Math.sin(t * 4), C.gold, q1, 3); lbl('input ℓ2 (a* = b − 1)', P[1][0], P[1][1] + 46, C.gold, q1, 15);
    const eq = Q(S, 1, 'the first excess at leaf j', 0.6);
    lbl('excess m_j(k) − h_j(k) , k = 0 … 11', 1400, 258, C.gold, eq, 17);
    ['0', '1', '2'].forEach((j, r) => { const row = HID129.ex[j].slice(0, 12), Kj = HID129.K[j]; lblG(HN129[+j], 1050, 302 + r * 52, C.gold, eq, 18, 'right'); cellrow129(1060, 280 + r * 52, row, 58, 40, eq, (v, k) => (k === Kj ? C.gold : v > 0 ? '#8aa6c0' : C.dim), 15); });
    const kq = Q(S, 1, 'd star plus d j plus two', 0.6);
    chip(1400, 470, 760, 50, 'Kⱼ = d* + dⱼ + 2 = 6 , 8 , 8  ⇒  d* = 3 , v found', C.gold, kq, 20);
    const rq = Q(S, 1, 'against a formal ray', 0.6);
    lbl('ray r(k)  vs  diagonal m(k) at ℓ2 , even k = 0 … 14', 1400, 532, C.mag, rq, 16);
    const ks = [0, 2, 4, 6, 8, 10, 12, 14];
    cellrow129(1080, 548, ks.map(k => HID129.rk[k]), 84, 40, rq, (v, i) => (i === 7 ? C.mag : C.cyan), 14);
    cellrow129(1080, 594, ks.map(k => HID129.md[k]), 84, 40, rq, (v, i) => (i === 7 ? C.mag : C.cyan), 14);
    lbl('r', 1066, 574, C.dim, rq, 14, 'right'); lbl('m', 1066, 620, C.dim, rq, 14, 'right');
    const dq = Q(S, 1, 'the first deficit comes at twice d star plus ell plus one', 0.6);
    chip(1400, 680, 760, 50, 'K∞ = 2(d* + ℓ + 1) = 14  ⇒  ℓ = 3 , N = 10', C.mag, dq, 20);
    lbl('1978 − 1977 = 1 : the one closed walk to t4 on the ray', 1400, 734, C.dim, dq, 15);
    stamp('ℓ = 3', 690, 480, Q(S, 1, 'giving ell', 0.6), C.green, 34, -0.04);
  }
};

/* ---- 12 ONE VERSUS TWO MISSING (§28, §31) ---- */
SCENES.onemore = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Two missing leaves break this', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the visible leaves still force the whole tree', 0.6) * f1;
    const L0 = lineAt(S, 0), sw = clamp((S.u - L0.s - 1.5) / Math.max(1, (L0.e - L0.s) * 0.55)), nf = Math.floor(sw * 7.99);
    const mk = new Set([0, 1, 2]); FORCE1_129.order.forEach(([v, w], k) => { if (k < nf) mk.add(w); });
    const P = HXY129.map(p => [190 + p[0] * 140, 300 + p[1] * 140]);
    graph129(P, HID129.edges, q, { ecol: k => (k >= 6 ? C.mag : C.cyan), dn: i => (mk.has(i) ? 'g' : 'w'), va: i => (mk.has(i) ? 1 : 0.45), lab: i => HN129[i], lx: i => (i >= 7 ? -30 : i === 2 ? 30 : 0), ly: i => (i >= 7 || i === 2 ? 6 : -22) });
    FORCE1_129.order.forEach(([v, w], k) => { if (k < nf) arrow(P[v][0], P[v][1], (P[v][0] + P[w][0]) / 2, (P[v][1] + P[w][1]) / 2, C.gold, q, 3); });
    lbl('forces : ' + Math.min(7, nf) + ' / 7 = I', 300, 790, C.gold, q, 17, 'left');
    const sq = Q(S, 0, 'a stalled forest would need two endpoints but has one', 0.6) * f1;
    chip(1400, 280, 760, 54, 'stalled ⇒ forest of min degree 2 except the one hidden leaf', C.cyan, sq, 19);
    lbl('every finite forest with an edge has at least two leaves : contradiction', 1400, 336, C.dim, sq, 15);
    const pq = Q(S, 0, 'Integer polynomials then read any later field', 0.6) * f1;
    chip(1400, 420, 760, 54, 'p_w = z·p_u − Σ p_t   (t ∼ u , t ≠ w)', C.gold, pq, 22);
    chip(1400, 490, 760, 54, 'x_w = Σ_r p_w,rᵀ y_r ,  y_r = Jᵀ Aʳ x', C.green, pq, 22);
    lbl('integer coefficients ;  window b(I + 1) = 3 · 8 = 24 reads', 1400, 550, C.dim, Q(S, 0, 'from a passive window', 0.6) * f1, 16);
  }
  const q1 = Q(S, 1, 'Two missing leaves break this', 0.6, 0.2);
  if (q1 > 0) {
    const cx = 480, cy = 420, R = 180;
    const sq = Q(S, 1, 'On a unit star', 0.6);
    [[-R, -R * 0.5], [0, -R], [R, -R * 0.5]].forEach(([dx, dy], i) => { line(cx, cy, cx + dx, cy + dy, C.cyan, sq, 3); dot(cx + dx, cy + dy, 13, 'g', sq); lblG('ℓ' + (i + 1), cx + dx, cy + dy - 22, C.gold, sq, 18); });
    [[-120, 170, 'h₁', '+1'], [120, 170, 'h₂', '−1']].forEach(([dx, dy, s, z]) => { dashed(cx, cy, cx + dx, cy + dy, C.mag, sq, 3); dot(cx + dx, cy + dy, 13, 'm', sq); lblG(s, cx + dx + (dx < 0 ? -30 : 30), cy + dy + 6, C.mag, sq, 18); lblG('z = ' + z, cx + dx, cy + dy + 38, C.gold, Q(S, 1, 'the difference of the hidden pair', 0.6), 18); });
    dot(cx, cy, 15, 'c', sq);
    const zq = Q(S, 1, 'is invisible and dies at the first tick', 0.6);
    chip(1400, 290, 760, 54, 'z = e_h₁ − e_h₂ :  Jᵀ z = 0 ,  A z = 0', C.gold, zq, 22);
    lbl('centre receives +1 − 1 = 0 ; Reset also kills z', 1400, 346, C.dim, zq, 15);
    const iq = Q(S, 1, 'so two different fields give identical service for every policy', 0.6);
    chip(1400, 430, 760, 54, 'fields x and x + z : every visible reply equal', C.cyan, iq, 21);
    lbl('recomputed : 50 random adaptive runs of 40 commands , all replies equal', 1400, 486, C.dim, iq, 14);
    lbl('forcing stalls at the centre : two unmarked neighbours', 1400, 520, C.dim, iq, 14);
    stamp('ONE IS FOUND , TWO HIDE A FIELD', 1400, 640, iq, C.red, 24, -0.04);
    const fq = Q(S, 1, 'so two different fields give identical service', 0.6);
    const hdr = ['ℓ1', 'ℓ2', 'ℓ3', 'c', 'h₁', 'h₂'];
    hdr.forEach((h, i) => lblG(h, 330 + i * 76 + 36, 686, i >= 4 ? C.mag : C.gold, fq, 16));
    [['x', TWO129.x], ['x + z', TWO129.xz], ['after Tick', TWO129.Ax]].forEach(([nm, row], r) => { lbl(nm, 318, 720 + r * 38, C.dim, fq, 15, 'right'); cellrow129(330, 698 + r * 38, row, 76, 32, fq, (v, i) => (r < 2 && i >= 4 ? C.mag : C.cyan), 15); });
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Tree metrics, the infection residual and walk counting are published or classical inputs', 'published'], [1, 'root rigidity is a frozen Lean theorem', 'lean'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['ARRIVALS', 'Σ Dₐ = 22', C.gold, 'Arrivals give distances'], ['TREE', '32 → 9', C.cyan, 'distances the tree'], ['LAW', 'H = 2I + 1', C.green, 'forcing the law'], ['WINDOW', 'b(I + 1)', C.white, 'a window the field'], ['ROOT', 'unique root', C.green, 'ordered terminals the root'], ['ONSETS', '2L − 3', C.cyan, 'onsets and two reads'], ['AGE', 'Read Tick Read', C.gold, 'geometry and age'], ['HIDDEN', 'K∞ = 2(d* + ℓ + 1)', C.mag, 'but on unit trees it is found']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + (i % 4) * 490, y = 236 + Math.floor(i / 4) * 120, q = Q(S, 0, ph) * fade; box(x - 210, y, 420, 100, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 38, col, q, 20); lblG(a2, x, y + 76, C.white, q, 20); });
    const pq = Q(S, 1, 'are published or classical inputs') * fade;
    lbl('PUBLISHED · tree metric (Ilmavirta et al., arXiv:2306.05253) · infection (Burgarth–Maruyama, arXiv:0903.0612) · intervals (Lambert–Popovic, arXiv:1101.2241)', W / 2, 520, C.cyan, pq, 14);
    lbl('CLASSICAL · first-arrival travel time · unique tree paths · walk counts (mathlib adjMatrix_pow_apply_eq_card_walk)', W / 2, 560, '#8fbcff', pq, 14);
    lbl('LEAN · NativeMaterialRootRecognition.original_rigidity , effective_inverse — frozen ; this volume is not yet in the digestion ledger', W / 2, 600, C.green, Q(S, 1, 'root rigidity is a frozen Lean theorem') * fade, 14);
    lbl('VOLUME · controllers and counts · horizon 2I + 1 · window · twin stars · wave-to-root · load-bearing order and birth · sparse assay · passive age · hidden tail', W / 2, 640, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · 22 / 104 · 32 → 9 · exact T · 24-read window · 2⁻ᵏ · twins b = 3 … 7 · 2318 terms · comb m ≤ 40 · ages ≤ 70 · 380 hidden-leaf trees', W / 2, 680, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    tree9_129(W / 2 - 330, 300, 110, a * 0.9, { lab: () => null });
    txt('RRO NATIVE LEAF BOUNDARY I', W / 2, 600, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('RRO 原生叶边界获取 第一部 · 首达、有序根与隐藏的叶 · TRURETURING FILM 129', W / 2, 670, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 735, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Pulse one leaf, wait for the first nonzero reply, and the tree begins to describe itself.', W / 2, 795, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'RRO LEAF BOUNDARY I', arrival: 'FIRST ARRIVALS', metric: 'METRIC TO TREE', infect: 'INFECTION', window: 'PASSIVE WINDOW', twins: 'TWIN STARS', root: 'ORDERED ROOT', load: 'LOAD-BEARING', sparse: 'SPARSE ONSETS', age: 'PASSIVE AGE', hidden: 'HIDDEN LEAF', onemore: 'ONE VERSUS TWO', finale: 'LEDGER' });

function poster129() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const P = tree9_129(180, 430, 115, 1, { lab: i => (LEAF9(i) ? TREE9_129.names[i] : null) });
  P.forEach((p, i) => { if (LEAF9(i)) ring(p[0], p[1], 26, C.gold, 0.7, 2.5); });
  txt('(Tᵈ)ᵤᵥ = ∏ edge weights', 1380, 360, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('δ(v) = (d(v, ℓⱼ))ⱼ · H = 2I + 1', 1380, 460, { size: 42, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('K∞ = 2(d* + ℓ + 1)', 1380, 560, { size: 44, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('RRO 原生叶边界获取 第一部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('RRO NATIVE LEAF BOUNDARY I', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('首 达 · 有 序 根 · 隐 藏 的 叶', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 129', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster129;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
