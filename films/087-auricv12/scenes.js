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

/* ---- film 087: AURIC V12–V14 · finite resolution, existential quantifiers and quantum records ---- */
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
const _po087 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po087.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po087.set(key, off); }
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
const PROC87 = {"L": 6, "pA": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "pB": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0]};
const RING87 = [[0.0, 0.0625, 0.1875, 0.0625, 0.6875], [0.1745, 0.0625, 0.1875, 0.0663, 0.6837], [0.3491, 0.0625, 0.1875, 0.07758, 0.67242], [0.5236, 0.0625, 0.1875, 0.09599, 0.65401], [0.6981, 0.0625, 0.1875, 0.12099, 0.62901], [0.8727, 0.0625, 0.1875, 0.1518, 0.5982], [1.0472, 0.0625, 0.1875, 0.1875, 0.5625], [1.2217, 0.0625, 0.1875, 0.22699, 0.52301], [1.3963, 0.0625, 0.1875, 0.26909, 0.48091], [1.5708, 0.0625, 0.1875, 0.3125, 0.4375], [1.7453, 0.0625, 0.1875, 0.35591, 0.39409], [1.9199, 0.0625, 0.1875, 0.39801, 0.35199], [2.0944, 0.0625, 0.1875, 0.4375, 0.3125], [2.2689, 0.0625, 0.1875, 0.4732, 0.2768], [2.4435, 0.0625, 0.1875, 0.50401, 0.24599], [2.618, 0.0625, 0.1875, 0.52901, 0.22099], [2.7925, 0.0625, 0.1875, 0.54742, 0.20258], [2.9671, 0.0625, 0.1875, 0.5587, 0.1913], [3.1416, 0.0625, 0.1875, 0.5625, 0.1875], [3.3161, 0.0625, 0.1875, 0.5587, 0.1913], [3.4907, 0.0625, 0.1875, 0.54742, 0.20258], [3.6652, 0.0625, 0.1875, 0.52901, 0.22099], [3.8397, 0.0625, 0.1875, 0.50401, 0.24599], [4.0143, 0.0625, 0.1875, 0.4732, 0.2768], [4.1888, 0.0625, 0.1875, 0.4375, 0.3125], [4.3633, 0.0625, 0.1875, 0.39801, 0.35199], [4.5379, 0.0625, 0.1875, 0.35591, 0.39409], [4.7124, 0.0625, 0.1875, 0.3125, 0.4375], [4.8869, 0.0625, 0.1875, 0.26909, 0.48091], [5.0615, 0.0625, 0.1875, 0.22699, 0.52301], [5.236, 0.0625, 0.1875, 0.1875, 0.5625], [5.4105, 0.0625, 0.1875, 0.1518, 0.5982], [5.5851, 0.0625, 0.1875, 0.12099, 0.62901], [5.7596, 0.0625, 0.1875, 0.09599, 0.65401], [5.9341, 0.0625, 0.1875, 0.07758, 0.67242], [6.1087, 0.0625, 0.1875, 0.0663, 0.6837], [6.2832, 0.0625, 0.1875, 0.0625, 0.6875]];
const LUD87 = [[0, 0.75], [0.1, 0.675], [0.2, 0.6], [0.3, 0.525], [0.4286, 0.51733], [0.5, 0.55819], [0.6, 0.63192], [0.7, 0.71601], [0.8, 0.80649], [0.9, 0.9015], [1.0, 1.0]];
const STOP87 = [[1, 0.1, 0.1], [2, 0.19, 0.2], [3, 0.271, 0.3], [4, 0.3439, 0.4], [5, 0.40951, 0.5], [6, 0.46856, 0.6], [7, 0.5217, 0.7], [8, 0.56953, 0.8], [9, 0.61258, 0.9], [10, 0.65132, 1], [11, 0.68619, 1], [12, 0.71757, 1], [13, 0.74581, 1], [14, 0.77123, 1], [15, 0.79411, 1], [16, 0.8147, 1], [17, 0.83323, 1], [18, 0.84991, 1], [19, 0.86491, 1], [20, 0.87842, 1]];
const COH87 = [[1, 0.07846, 0.07846], [2, 0.15643, 0.15692], [3, 0.23345, 0.23538], [4, 0.30902, 0.31384], [5, 0.38268, 0.3923], [6, 0.45399, 0.47075], [7, 0.5225, 0.54921], [8, 0.58779, 0.62767], [9, 0.64945, 0.70613], [10, 0.70711, 0.78459], [11, 0.76041, 0.86305], [12, 0.80902, 0.94151], [13, 0.85264, 1.01997], [14, 0.89101, 1.09843], [15, 0.92388, 1.17689], [16, 0.95106, 1.25535], [17, 0.97237, 1.3338], [18, 0.98769, 1.41226], [19, 0.99692, 1.49072], [20, 1.0, 1.56918]];
const RARE87 = [[0.5, 0.5, 1.0], [0.2, 0.2, 1.0], [0.1, 0.1, 1.0], [0.05, 0.05, 1.0], [0.02, 0.02, 1.0], [0.01, 0.01, 1.0]];
const CHAIN87 = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
const RULER87 = [[1.0, 9.4641], [0.5, 18.9282], [0.25, 37.8564], [0.1, 94.641], [0.05, 189.282], [0.02, 473.2051]];
const REPAIR87 = [[0.0217, 0.04262, 0.17364], [0.00886, 0.01726, 0.0709], [0.0851, 0.14003, 0.68081], [0.01029, 0.02651, 0.08228], [0.08255, 0.15263, 0.66037], [0.00906, 0.01752, 0.07252], [0.01188, 0.02346, 0.09505], [0.06474, 0.12219, 0.51792], [0.07014, 0.13245, 0.56112], [0.04796, 0.09282, 0.38366], [0.03726, 0.06753, 0.29809], [0.02577, 0.04982, 0.20617], [0.00232, 0.00561, 0.01857], [0.05135, 0.10213, 0.41078]];
const SPEC87 = [[0, 114, 112.63], [1, 158, 156.27], [2, 201, 199.9], [3, 245, 243.54], [4, 288, 287.18], [5, 332, 330.82], [6, 376, 374.45], [7, 419, 418.09], [8, 463, 461.73], [9, 507, 505.36], [10, 550, 549.0], [11, 594, 592.64], [12, 638, 636.28], [13, 681, 679.91], [14, 725, 723.55], [15, 768, 767.19], [16, 812, 810.83], [17, 856, 854.46], [18, 899, 898.1], [19, 943, 941.74], [20, 987, 985.37], [21, 1030, 1029.01], [22, 1074, 1072.65], [23, 1118, 1116.29], [24, 1161, 1159.92], [25, 1205, 1203.56], [26, 1249, 1247.2], [27, 1292, 1290.84], [28, 1336, 1334.47], [29, 1379, 1378.11], [30, 1423, 1421.75], [31, 1467, 1465.38], [32, 1510, 1509.02], [33, 1554, 1552.66], [34, 1598, 1596.3], [35, 1641, 1639.93], [36, 1685, 1683.57], [37, 1729, 1727.21], [38, 1772, 1770.85], [39, 1816, 1814.48], [40, 1859, 1858.12]];
const SAT87 = {"mu": [0.06, 0.12, 0.08, 0.14, 0.05, 0.11, 0.09, 0.15, 0.07, 0.13], "f": [0, 0, 0, 1, 1, 2, 2, 2, 3, 3], "g": [0, 0, 1, 1], "A": [0, 1, 3, 5, 6, 7], "nu": [0.26, 0.19, 0.35, 0.2], "u": 0.8, "ell": 0.35, "muA": 0.67, "df": 0.13, "u2": 1.0, "ell2": 0, "dgf": 0.33, "dg": 0.2};
const GOLD87 = [[0, 0.0, 0.0], [1, 0.618034, 0.61803399], [2, 0.854102, 0.47213595], [3, 0.09017, 0.50657781], [4, 0.326238, 0.49844719], [5, 0.944272, 0.50036657], [6, 0.326238, 0.49991346], [7, 0.09017, 0.50002043], [8, 0.854102, 0.49999518], [9, 0.618034, 0.50000114], [10, 0.0, 0.49999973]];
const D787 = [["1", 1], ["2", 1], ["3", 1], ["12", 6], ["13", 2], ["23", 2], ["123", 7]];
const V87 = {"fit": "0.985", "delta": "0.0740", "m0": 114, "m40": 1859, "miss1000": "0.376", "p10": "0.49999973", "phi30": "5.375 × 10⁻⁷", "two": -0.18};
/* ---- film 087 helpers ---- */
function cell87(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function interp87(arr, x) { if (x <= arr[0][0]) return arr[0][1]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][1] * (1 - f) + arr[i][1] * f; } return arr[arr.length - 1][1]; }
function vbar87(x, y0, w, h, col, a, fa = 0.45) { if (a <= 0 || Math.abs(h) < 0.5) return; const top = h > 0 ? y0 - h : y0; fillBox(x, top, w, Math.abs(h), col, a * fa); rect63(x, top, w, Math.abs(h), col, a, 1.6); }
function axes87(x0, y0, w, h, a, xl, yl) { plotAxes(x0, y0, w, h, a, '', yl); if (xl) lbl(xl, x0 + w, y0 + 56, C.dim, a, 16, 'right'); }
function ringD87(x, y, r, col, a, lw = 2) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash([8, 7]); ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); }
function seg87(x1, x2, y, col, a, lw = 8) { if (a <= 0) return; line(x1, y, x2, y, col, a, lw); line(x1, y - 14, x1, y + 14, col, a, 2.5); line(x2, y - 14, x2, y + 14, col, a, 2.5); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['after version ten', 'V10 → V12 → V14', 'the versioned AURIC volumes continue', C.gold], ['what finite, noisy readings can certify', 'FINITE RESOLUTION', 'tables , noise , rare branches , rulers', C.cyan], ['acts like an existential quantifier', 'PROBABILITY AS A QUANTIFIER', 'Q_μ R > 0  ⇔  ∃ w in the support', C.mag], ['what quantum records change', 'QUANTUM RECORDS', 'amplitudes cancel , records add', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(340, 360, 360, 58, 'finite tables', C.gold, rp, 22); chip(340, 445, 360, 58, 'complete instruments', C.mag, rp, 22); chip(340, 530, 360, 58, 'coarse records', C.green, rp, 22);
  box(1400, 340, 420, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('a golden gate', 1610, 410, C.cyan, rp, 22); lblG('K¹⁰ = I  ·  (1 − φ⁻³⁰)/2', 1610, 470, C.white, rp, 27);
  txt(scramble('AURIC V12–V14 · RECORDS', rp, 487), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V12–V14 · 有 限 分 辨 率 、存 在 量 词 与 量 子 记 录', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  const sa = clamp((u - 1.2) / 0.8);
  txt('TRURETURING · FILM 087 · AURIC_FINITE_RESOLUTION_AND_COMPLETE_RECURSIVE_OBSERVATION_THEORY_V12 · §1–12', W / 2, 100, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sa, ls: 2 });
  txt('AURIC_EXISTENTIAL_QUANTIFIERS_CIRCUIT_SEMIRINGS_AND_QUANTUM_RECORDS_V14 · §2–12', W / 2, 128, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sa, ls: 2 });
};

/* ---- 02 FINITE TABLES (V12 §1–3) ---- */
SCENES.tables = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A perfect table can still miss the future', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Start with finite readings', 0.6) * f1;
    const cx = 450, cy = 490;
    curve(p => { const a = 2 * Math.PI * p; return [cx + 280 * Math.cos(a) * (1 + 0.12 * Math.sin(3 * a)), cy + 150 * Math.sin(a) * (1 + 0.1 * Math.cos(2 * a))]; }, 90, C.cyan, q, 2.5);
    lbl('P(Θ) : the compact model image', cx, cy - 175, C.cyan, q, 17);
    const sq = Q(S, 0, 'whose predictions separate parameters', 0.6) * f1;
    const tx = 400, ty = 495;
    dot(tx, ty, 11, 'g', q); lbl('P(ϑ*)', tx - 18, ty + 34, C.gold, q, 17, 'right');
    const yq = Q(S, 0, 'any fit within eta of the best', 0.6) * f1;
    dashed(tx - 55, ty - 55, tx + 55, ty - 55, C.white, yq, 1.5); dashed(tx + 55, ty - 55, tx + 55, ty + 55, C.white, yq, 1.5); dashed(tx + 55, ty + 55, tx - 55, ty + 55, C.white, yq, 1.5); dashed(tx - 55, ty + 55, tx - 55, ty - 55, C.white, yq, 1.5);
    dot(tx + 35, ty - 30, 9, 'w', yq); lbl('data y', tx + 35, ty - 68, C.white, yq, 16); lbl('ε', tx + 64, ty + 6, C.white, yq, 18, 'left');
    const fq = Q(S, 0, 'lies within two epsilon plus eta of the truth', 0.6) * f1;
    ringD87(tx, ty, 128, C.green, fq * 0.9, 2); lbl('2ε + η', tx - 100, ty - 100, C.green, fq, 17, 'right'); dot(tx + 95, ty + 60, 11, 'm', yq); lbl('P(ϑ̂) : fit', tx + 112, ty + 70, C.mag, yq, 17, 'left');
    chip(450, 700, 760, 58, '‖P(ϑ̂) − P(ϑ*)‖∞ ≤ 2ε + η ,   d*(ϑ̂, ϑ*) ≤ (2ε + η)/α', C.green, fq, 20);
    lbl('recomputed : 3000 noisy fits on a compact grid , largest ratio to the bound ' + V87.fit, 450, 760, C.dim, fq, 15);
    chip(1350, 265, 820, 58, 'H = O C ,  H_a = O T_a C ,  B_a = H_a H⁻¹ ,  p(w) = d B_w b', C.gold, q, 20);
    chip(1350, 345, 820, 58, 'α d*(ϑ, ϑ′) ≤ ‖P(ϑ) − P(ϑ′)‖∞ ,  residual ≤ inf + η', C.cyan, sq, 20);
    const wq = Q(S, 0, 'update errors grow at most linearly with word length', 0.6) * f1;
    const nC = 8, k = Math.floor((u * 1.4) % nC);
    for (let i = 0; i < nC; i++) cell87(1000 + i * 92, 430, 80, 70, i === nC - 1 - k ? 'Δ' : (i < nC - 1 - k ? 'B̂' : 'B'), i === nC - 1 - k ? C.red : (i < nC - 1 - k ? C.mag : C.cyan), wq, 22);
    lbl('telescoping : replace one factor at a time , n terms', 1360, 535, C.white, wq, 17);
    chip(1350, 600, 820, 58, '‖B̂_w b̂ − B_w b‖ ≤ M̂ ε_b + n M̂ M δ ‖b‖', C.mag, wq, 22);
    lbl('contractive norms , ‖b‖ ≤ 1 :  ε_b + n δ + ε_d for the probability', 1350, 660, C.dim, wq, 15);
    lbl('single-step norms cannot be powered : B′ = [[0 , t] , [1/t , 0]] has ‖B′‖ = t , yet B′² = I', 1350, 700, C.dim, wq, 15);
    lbl('invertibility is certified when ‖Ĥ⁻¹‖ ε_H < 1', 1350, 740, C.dim, wq, 15);
    lbl('§1 : classical states on ℕ with n ↦ n + 1 satisfy every composition rule , so recursion alone does not force quantum semantics', W / 2, 800, C.dim, q, 14);
  }
  const q1 = Q(S, 1, 'A perfect table can still miss the future', 0.6, 0.3);
  if (q1 > 0) {
    const aq = Q(S, 1, 'Process A always prints zero', 0.6), bq = Q(S, 1, 'process B prints L zeros, then a one', 0.6);
    lbl('A', 150, 320, C.gold, aq, 28); lbl('B', 150, 440, C.cyan, bq, 28);
    for (let i = 0; i < 7; i++) { cell87(200 + i * 92, 280, 80, 70, '0', C.gold, clamp(aq * 1.5 - i / 10), 26); cell87(200 + i * 92, 400, 80, 70, i < 6 ? '0' : '1', i < 6 ? C.cyan : C.red, clamp(bq * 1.5 - i / 10), 26); lbl(String(i + 1), 240 + i * 92, 268, C.dim, aq, 14); }
    const eq = Q(S, 1, 'Every word up to length L agrees', 0.6);
    line(200, 495, 752, 495, C.white, eq, 2); line(200, 485, 200, 505, C.white, eq, 2); line(752, 485, 752, 505, C.white, eq, 2);
    lbl('L = 6 : every word of length ≤ L has the same probability', 476, 530, C.white, eq, 16);
    const cq = Q(S, 1, 'the table has condition number one', 0.6);
    chip(476, 600, 820, 56, 'H = [1] ,  H₀ = [1] ,  H₁ = [0] ,  b = c = [1]  ⇒  cond(H) = 1', C.green, cq, 19);
    lbl('the reconstruction predicts p(0ⁿ) = 1 for every n , as for A', 476, 655, C.dim, cq, 15);
    const sq = Q(S, 1, 'and L plus one zeros separate them', 0.6);
    rect63(744, 268, 96, 212, C.red, sq, 3);
    stamp('PERFECT TABLE , WRONG FUTURE', 476, 745, sq, C.red, 26, -0.04);
    const px = 1060, py = 700, pw = 660, ph = 380, xS = n => px + 24 + n * (pw - 48) / 10, yS = v => py - 30 - v * (ph - 90);
    axes87(px, py, pw, ph, eq, 'word 0ⁿ ,  n = 0 … 10', 'probability of 0ⁿ');
    PROC87.pA.forEach((v, n) => { ring(xS(n), yS(v), 15, C.gold, aq, 2.5); });
    PROC87.pB.forEach((v, n) => { dot(xS(n), yS(v), 9, n <= PROC87.L ? 'c' : 'r', clamp(bq * 1.4 - n / 14)); lbl(String(n), xS(n), py + 26, C.dim, eq, 14); });
    lbl('gold rings : A      dots : B', px + 30, yS(0.75), C.white, bq, 16, 'left');
    dashed(xS(7), py, xS(7), py - ph * 0.95, C.red, sq, 2); lbl('n = L + 1 : 1 versus 0', xS(7) - 12, yS(0.35), C.red, sq, 17, 'right');
  }
};

/* ---- 03 COMPLETE INSTRUMENTS (V12 §4, §12) ---- */
SCENES.instr = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'the optimum in between is open', 'open'], [1, 'One ancilla bit realises it exactly', 'theory']]);
  const f1 = 1 - Q(S, 1, 'On the five-mode menu', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'An observation atom must be a complete instrument', 0.6) * f1;
    chip(530, 255, 860, 58, 'Inst_Φ(X) = ⊕_a Φ_a(X) :  outcome , post-state , record', C.gold, q, 21);
    const iq = Q(S, 0, 'Two qubit instruments', 0.6) * f1;
    [['Φ', 'X/2', 'ZXZ/2', C.cyan, 150], ['Ψ', 'ZXZ/2', 'X/2', C.mag, 560]].forEach(([nm, a0, a1, col, x]) => { box(x, 330, 360, 170, col, iq, 2, 'rgba(0,0,0,0.45)'); lbl(nm, x + 180, 370, col, iq, 26); lblG('outcome 0 :  X ↦ ' + a0, x + 180, 420, C.white, iq, 20); lblG('outcome 1 :  X ↦ ' + a1, x + 180, 465, C.white, iq, 20); });
    const sq = Q(S, 0, 'equal effects and equal average channels', 0.6) * f1;
    chip(530, 550, 860, 56, 'effects (I/2 , I/2) for both  ·  same average channel', C.green, sq, 21);
    const dq = Q(S, 0, 'can sit at distance one', 0.6) * f1;
    stamp('INSTRUMENT DISTANCE ONE', 530, 650, dq, C.red, 30, -0.04);
    lbl('input |+⟩ : the two record blocks are orthogonal ; SDP half-diamond = 1', 530, 730, C.dim, dq, 15);
    const rq = Q(S, 0, 'coherent rejection reads the ring product of three rays', 0.6) * f1;
    chip(1390, 255, 800, 56, '(xy ,  x(1 − y) ,  z + xy − 2 Re B ,  1 − x − z − xy + 2 Re B)', C.gold, rq, 18);
    lbl('records (++ , +− , −+ , −−) : test P₁ or Q₁ = I − P₁ , then P₂', 1390, 305, C.dim, rq, 15);
    lbl('B = K₀₁ K₁₂ K₂₀ , unchanged by rephasing ;  x = y = z = 1/4 , |B| = 1/8', 1390, 335, C.white, rq, 16);
    const th = ((Math.max(0, u - 0) * 0.9) % (2 * Math.PI));
    const vals = [1, 2, 3, 4].map(c => interp87(RING87.map(r => [r[0], r[c]]), th));
    const base = 700, sc = 420;
    vals.forEach((v, i) => { const x = 1040 + i * 150; vbar87(x, base, 100, v * sc, i >= 2 ? C.mag : C.cyan, rq); lbl(['++', '+−', '−+', '−−'][i], x + 50, base + 28, C.white, rq, 18); lbl(v.toFixed(3), x + 50, base - v * sc - 12, C.white, rq, 15); });
    line(1020, base, 1640, base, C.dim, rq, 1.5);
    dial64(1720, 520, 58, th, C.gold, rq, 'arg B');
    lbl('destructive rejection : only the |K_ij|² survive', 1390, 770, C.dim, rq, 15);
  }
  const q1 = Q(S, 1, 'On the five-mode menu', 0.6, 0.3);
  if (q1 > 0) {
    chip(W / 2, 250, 1560, 54, 'Λ(X) = PXP ⊗ |+⟩⟨+| + QXQ ⊗ |−⟩⟨−| ,  rank Q = r = 4 ;  menu : unitaries , rank-one readouts , feedback , Stop', C.white, q1, 18);
    const lq = Q(S, 1, 'is off by at least three sevenths', 0.6);
    const px = 150, py = 740, pw = 760, ph = 400, xS = w => px + w * pw, yS = v => py - v * ph;
    axes87(px, py, pw, ph, lq, 'w = weight of paths with no readout', 'half-diamond distance to Λ');
    curve(p => [xS(p), yS(Math.max(p, (1 - p) * 0.75))], 100, C.gold, lq, 3);
    LUD87.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 8, 'c', clamp(lq * 1.5 - i / 14)));
    dot(xS(3 / 7), yS(3 / 7), 12, 'm', lq); lbl('3/7', xS(3 / 7), yS(3 / 7) + 40, C.mag, lq, 22);
    lbl('gold : max{w , (1 − w)(r − 1)/r}', px + pw / 2, py - 66, C.gold, lq, 16);
    lbl('dots : exact distance of mixtures , all above it', px + pw / 2, py - 40, C.cyan, lq, 16);
    const ax = 1110, aw = 640, yv = v => 740 - v * 400;
    const sq = Q(S, 1, 'with exact effects the sharp value is three quarters', 0.6), oq = Q(S, 1, 'the optimum in between is open', 0.6), bq = Q(S, 1, 'One ancilla bit realises it exactly', 0.6);
    line(ax - 20, 740, ax + aw, 740, C.dim, lq, 1.5); line(ax - 20, 740, ax - 20, 345, C.dim, lq, 1.5); lbl('1', ax - 34, yv(1) + 6, C.dim, lq, 14, 'right'); lbl('0', ax - 34, 746, C.dim, lq, 14, 'right');
    fillBox(ax - 18, yv(0.75), aw + 18, yv(3 / 7) - yv(0.75), C.vio, oq * 0.22);
    lbl('OPEN', ax + 560, (yv(0.75) + yv(3 / 7)) / 2 - 4, C.vio, oq, 26); lbl('unconstrained optimum', ax + 560, (yv(0.75) + yv(3 / 7)) / 2 + 26, C.vio, oq, 14);
    vbar87(ax + 20, 740, 100, (3 / 7) * 400, C.cyan, lq); lbl('3/7', ax + 70, yv(3 / 7) - 12, C.cyan, lq, 24); lbl('menu bound', ax + 70, 770, C.cyan, lq, 15);
    vbar87(ax + 190, 740, 100, 0.75 * 400, C.gold, sq); lbl('3/4', ax + 240, yv(0.75) - 12, C.gold, sq, 24); lbl('exact effects', ax + 240, 770, C.gold, sq, 15);
    line(ax + 360, 738, ax + 460, 738, C.green, bq, 6); lbl('0', ax + 410, 715, C.green, bq, 24); lbl('one ancilla bit', ax + 410, 770, C.green, bq, 15);
    chip(1430, 310, 640, 46, 'U = P ⊗ X_A + Q ⊗ I_A : exact , Choi rank 2', C.green, bq, 18);
  }
};

/* ---- 04 ERROR BUDGETS (V12 §5–6) ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Conditioning amplifies', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'after N adaptive calls', 0.6) * f1;
    chip(W / 2, 255, 1200, 58, 'D(Ω_N^Φ , Ω_N^Ψ) ≤ min{ 1 ,  d₀ + Σ_k ε_k }   (memory and environment in the common carrier)', C.gold, q, 19);
    const sq = Q(S, 0, 'Stopping with chance epsilon per call', 0.6) * f1;
    const px = 150, py = 740, pw = 760, ph = 380, xS = N => px + (N - 0.5) / 20.5 * pw, yS = v => py - v / 1.08 * ph;
    axes87(px, py, pw, ph, sq, 'calls N', 'distance of complete records');
    curve(p => { const N = 0.5 + p * 20; return [xS(N), yS(Math.min(1, N * 0.1))]; }, 80, C.dim, sq, 2);
    STOP87.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 8, 'g', clamp(sq * 1.6 - i / 26)));
    lbl('ε = 0.1 :  1 − (1 − ε)^N  (dots)', px + pw - 10, py - 110, C.gold, sq, 16, 'right');
    lbl('sum bound min{1 , Nε}  (grey)', px + pw - 10, py - 84, C.dim, sq, 16, 'right');
    lbl('= ε · E min(T , N) : visit bound attained', px + pw - 10, py - 58, C.white, sq, 15, 'right');
    [1, 5, 10, 15, 20].forEach(N => lbl(String(N), xS(N), py + 26, C.dim, sq, 14));
    const cq = Q(S, 0, 'a coherent rotation grows like sine N theta', 0.6) * f1;
    const qx = 1040, qw = 700, xT = N => qx + (N - 0.5) / 20.5 * qw;
    axes87(qx, py, qw, ph, cq, 'calls N', 'identity versus rotation');
    curve(p => { const N = 0.5 + p * 12.5; return [xT(N), yS(N * Math.sin(Math.PI / 40))]; }, 60, C.mag, cq, 2.5);
    COH87.forEach((r, i) => dot(xT(r[0]), yS(r[1]), 8, 'c', clamp(cq * 1.6 - i / 26)));
    lbl('θ = π/40 :  sin(Nθ)  (dots)', qx + qw - 10, py - 110, C.cyan, cq, 16, 'right'); lbl('N sin θ  (magenta)', qx + qw - 10, py - 84, C.mag, cq, 16, 'right');
    lbl('ratio → 1 as θ → 0 : coefficient one is sharp', qx + qw - 10, py - 58, C.white, cq, 15, 'right');
    [1, 5, 10, 15, 20].forEach(N => lbl(String(N), xT(N), py + 26, C.dim, cq, 14));
  }
  const q1 = Q(S, 1, 'Conditioning amplifies', 0.6, 0.3);
  if (q1 > 0) {
    const cq = Q(S, 1, 'conditional states are within delta over the success probability', 0.6);
    chip(530, 260, 860, 58, 'D(A/p , B/q) ≤ min{ 1 ,  δ / max(p , q) } ,   |p − q| ≤ δ', C.gold, cq, 21);
    lbl('A , B : success blocks ; the failure mass is kept in the complete output', 530, 318, C.dim, cq, 15);
    const rq = Q(S, 1, 'so a rare branch can turn a tiny total error into distance one', 0.6);
    const base = 760, sc = 300;
    RARE87.forEach((r, i) => { const x = 170 + i * 122, qq = clamp(rq * 1.6 - i / 10); vbar87(x, base, 44, r[1] * sc, C.cyan, qq); vbar87(x + 50, base, 44, r[2] * sc, C.gold, qq); lbl('r = ' + r[0], x + 47, base + 26, C.dim, qq, 14); });
    lbl('cyan : total distance r t      gold : conditional distance t      (t = 1)', 530, 420, C.white, rq, 15);
    stamp('RARE BRANCH : DISTANCE ONE', 530, 370, rq, C.red, 26, -0.03);
    const nq = Q(S, 1, 'And closeness is not transitive', 0.6);
    const x0 = 1080, x1 = 1700, y0 = 540;
    line(x0, y0, x1, y0, C.dim, nq, 2);
    CHAIN87.forEach((v, i) => { const x = x0 + v * (x1 - x0), qq = clamp(nq * 1.6 - i / 14); dot(x, y0, 9, i === 0 || i === 10 ? 'm' : 'g', qq); if (i < 10) { const xn = x0 + CHAIN87[i + 1] * (x1 - x0); curve(p => [x + p * (xn - x), y0 - Math.sin(p * Math.PI) * 34], 16, C.gold, qq * 0.8, 2); } });
    lbl('0', x0, y0 + 36, C.mag, nq, 22); lbl('1', x1, y0 + 36, C.mag, nq, 22);
    lbl('each step ≤ ε = 0.1 ,  yet 0 and 1 are fully distinguishable', 1390, 610, C.white, nq, 16);
    stamp('NOT TRANSITIVE', 1390, 420, Q(S, 1, 'steps of epsilon join zero to one', 0.6), C.red, 32, -0.04);
    lbl('a summary contracting by κ : limsup e_N ≤ (ε + η)/(1 − κ)', 1390, 690, C.dim, nq, 15);
    lbl('complete records of two sectors never contract strictly', 1390, 720, C.dim, nq, 15);
  }
};

/* ---- 05 RULERS AND REPAIR (V12 §7–8) ---- */
SCENES.ruler = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Finite tests give positivity only with a margin', 0.6);
  if (f1 > 0) {
    const cq = Q(S, 0, 'the Choi norm controls the diamond norm within a factor d', 0.6) * f1;
    chip(530, 260, 860, 60, '‖J_Δ‖₁ ≤ ‖Δ‖◇ ≤ d ‖J_Δ‖₁   (normalised Choi)', C.gold, Q(S, 0, 'When the ruler is uncertain too', 0.6) * f1, 24);
    const pq = Q(S, 0, 'probability errors times dual-basis norms', 0.6) * f1;
    chip(530, 345, 860, 58, '½ ‖Δ‖◇ ≤ ½ Σ_ij |δp_ij| ‖F_i‖₁ ‖D_j‖₁', C.cyan, pq, 23);
    lbl('ρ_j input frame , E_i effect frame , D_j and F_i their dual bases', 530, 400, C.dim, pq, 15);
    const rq = Q(S, 0, 'A shrinking ruler separates orthogonal states by only epsilon', 0.6) * f1;
    const bx = 330, by = 600, R = 140, ep = 0.06 + 0.94 * (0.5 + 0.5 * Math.cos(u * 1.3));
    ring(bx, by, R, C.dim, rq, 2); line(bx, by - R - 10, bx, by + R + 10, C.dim, rq * 0.5, 1);
    dot(bx, by - R, 11, 'g', rq); lbl('|0⟩', bx + 18, by - R - 8, C.gold, rq, 18, 'left'); dot(bx, by + R, 11, 'g', rq); lbl('|1⟩', bx + 18, by + R + 22, C.gold, rq, 18, 'left');
    arrow(bx, by, bx + ep * R, by, C.mag, rq, 3); arrow(bx, by, bx, by - ep * R, C.cyan, rq, 3);
    lbl('effects I/2 , (I + εX)/2 , (I + εY)/2 , (I + εZ)/2', 700, 520, C.white, rq, 16);
    lbl('ε = ' + ep.toFixed(2), 700, 560, C.mag, rq, 22);
    lbl('trace distance of |0⟩ , |1⟩ = 1', 700, 620, C.gold, rq, 16); lbl('every test differs by at most ε', 700, 650, C.gold, rq, 16);
    lbl('the basis still spans , the duals blow up', 700, 700, C.dim, rq, 15);
    const px = 1040, py = 740, pw = 700, ph = 420, mx = Math.max(...RULER87.map(r => r[1])), xS = v => px + v / 52 * pw, yS = v => py - v / (mx * 1.08) * ph;
    axes87(px, py, pw, ph, pq, '1/ε', 'Σ ‖F_i‖₁ of the dual effect basis');
    RULER87.forEach((r, i) => { const qq = clamp(pq * 1.6 - i / 8); dot(xS(1 / r[0]), yS(r[1]), 9, 'm', qq); if (i === 0 || i >= 3) lbl(r[1].toFixed(1), xS(1 / r[0]) + (i === 5 ? -16 : 14), yS(r[1]) + (i === 0 ? -14 : 6), C.white, qq, 14, i === 5 ? 'right' : 'left'); });
    curve(p => { const x = 1 + p * 49; return [xS(x), yS(interp87(RULER87.map(r => [1 / r[0], r[1]]).sort((a, b) => a[0] - b[0]), x))]; }, 80, C.mag, pq * 0.7, 2);
    [1, 10, 20, 50].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, pq, 14));
    lbl('≈ 9.46 / ε : the duals grow like 1/ε', px + 30, py - ph + 50, C.mag, pq, 16, 'left');
  }
  const q1 = Q(S, 1, 'Finite tests give positivity only with a margin', 0.6, 0.3);
  if (q1 > 0) {
    const pq = Q(S, 1, 'The transpose is nonnegative on every product vector', 0.6);
    chip(530, 260, 860, 58, 'T(X) = Xᵀ ,  J_T = S/d  (S the swap)', C.white, q1, 22);
    chip(530, 340, 860, 58, '⟨a,b| J_T |a,b⟩ = |⟨a,b⟩|²/d ≥ 0 for every product vector', C.cyan, pq, 19);
    const eq = Q(S, 1, 'yet its Choi matrix has eigenvalue minus one over d', 0.6);
    const base = 560;
    line(150, base, 900, base, C.dim, eq, 1.5);
    for (let i = 0; i < 9; i++) { const sym = i < 6, qq = clamp(eq * 1.6 - i / 12); vbar87(175 + i * 80, base, 56, sym ? 100 : -100, sym ? C.cyan : C.red, qq); }
    lbl('d = 3 :  6 eigenvalues + 1/3  (symmetric)', 410, 430, C.cyan, eq, 16); lbl('3 eigenvalues − 1/3', 750, 700, C.red, eq, 16);
    stamp('POSITIVE IS NOT COMPLETELY POSITIVE', 530, 770, eq, C.red, 24, -0.03);
    const rq = Q(S, 1, 'A Choi matrix above minus nu is repaired by mixing in noise', 0.6);
    chip(1390, 260, 760, 58, 'J ⪰ −ν I ,  t = m d ν ,  Φ_cp = (Φ + t D)/(1 + t)', C.gold, rq, 21);
    lbl('D(X) = Tr(X) I/m ; partial trace I/d is kept , CP restored', 1390, 315, C.dim, rq, 15);
    const bq = Q(S, 1, 'to a channel within m d squared nu', 0.6);
    chip(1390, 370, 760, 54, '½ ‖Φ_cp − Φ‖◇ ≤ m d² ν', C.green, bq, 23);
    const px = 1060, py = 740, pw = 660, ph = 300, nmax = Math.max(...REPAIR87.map(r => r[0])) * 1.1, ymax = 8 * nmax, xS = v => px + v / nmax * pw, yS = v => py - v / ymax * ph;
    axes87(px, py, pw, ph, rq, 'ν = −λ_min(J)', 'distance');
    curve(p => [xS(p * nmax), yS(8 * p * nmax)], 20, C.green, bq, 2.5);
    REPAIR87.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 8, 'c', clamp(rq * 1.6 - i / 18)));
    lbl('green : bound m d² ν = 8ν (qubit) ;  dots : exact distance', px + 20, py - ph + 10, C.white, rq, 15, 'left');
  }
};

/* ---- 06 ORDER, SOURCES, SPECIMENS (V12 §9–11) ---- */
SCENES.limits = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'classical'], [1, "On the project's tree pairs", 'theory']]);
  const f1 = 1 - Q(S, 1, 'For m copies of two pure states', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Each swap of incomparable events costs at most kappa', 0.6) * f1;
    chip(530, 260, 860, 58, '½ ‖C_σ − C_τ‖◇ ≤ Σ κ_ef ≤ K κ   (K adjacent swaps)', C.gold, q, 21);
    const nodes = { p: [200, 470], e: [400, 390], f: [400, 550], s: [600, 470] };
    [['p', 'e'], ['p', 'f'], ['e', 's'], ['f', 's']].forEach(([a, b]) => arrow(nodes[a][0] + 22, nodes[a][1], nodes[b][0] - 24, nodes[b][1], C.dim, q, 2));
    Object.entries(nodes).forEach(([k, v]) => { ring(v[0], v[1], 24, k === 'e' || k === 'f' ? C.gold : C.cyan, q, 2.5); lbl(k, v[0], v[1] + 7, C.white, q, 20); });
    dashed(400, 420, 400, 520, C.mag, q, 1.5); lbl('incomparable', 420, 475, C.mag, q, 15, 'left');
    const rq = Q(S, 0, 'yet appended records A B and B A are at distance one', 0.6) * f1;
    cell87(720, 380, 70, 60, 'A', C.cyan, rq, 24); cell87(800, 380, 70, 60, 'B', C.gold, rq, 24);
    cell87(720, 520, 70, 60, 'B', C.gold, rq, 24); cell87(800, 520, 70, 60, 'A', C.cyan, rq, 24);
    lbl('system unchanged , records orthogonal', 795, 625, C.white, rq, 15);
    stamp('RECORDS AB , BA : DISTANCE ONE', 530, 720, rq, C.red, 26, -0.03);
    const cq = Q(S, 0, 'Without compactness', 0.6) * f1;
    chip(1390, 260, 760, 56, 'compact X , closed fibres  ⇒  every thread has a source', C.green, cq, 19);
    const mq = Q(S, 0, 'take the minimum of x and n', 0.6) * f1;
    lbl('q_n(x) = min(x , n) on x = 1 , 2 , 3 , … ;  thread x_n = n', 1390, 320, C.white, mq, 16);
    const px = 1060, py = 740, pw = 660, ph = 360, xS = n => px + 30 + (n - 1) * (pw - 60) / 7, yS = v => py - v / 10 * ph;
    axes87(px, py, pw, ph, mq, 'level n', 'q_n');
    for (let n = 1; n <= 8; n++) { dot(xS(n), yS(n), 9, 'g', mq); lbl(String(n), xS(n), py + 26, C.dim, mq, 14); }
    const N = 2 + Math.floor((u * 0.8) % 6);
    const pts = []; for (let n = 1; n <= 8; n++) pts.push([xS(n), yS(Math.min(N, n))]);
    strokePoly(pts, C.cyan, mq, 3, false); pts.forEach(p => ring(p[0], p[1], 13, C.cyan, mq, 2));
    lbl('gold : the thread ;  cyan : source x = ' + N + ' leaves it after level ' + N, px + 20, py - ph + 10, C.white, mq, 15, 'left');
    lbl('every finite stage is realised , no single x realises all', px + 20, py - ph + 36, C.cyan, mq, 15, 'left');
  }
  const q1 = Q(S, 1, 'For m copies of two pure states', 0.6, 0.3);
  if (q1 > 0) {
    const eq = Q(S, 1, 'the best error is', 0.6);
    chip(530, 260, 860, 62, 'p_m = (1 − √(1 − c^(2m)))/2', C.gold, eq, 26);
    lbl('equal priors , any joint measurement , any source-independent ancilla', 530, 320, C.dim, eq, 15);
    chip(530, 390, 860, 56, 'error ≤ ε  ⇔  m ≥ log(1/(4ε(1 − ε))) / (−2 log c)', C.cyan, eq, 20);
    const tq = Q(S, 1, "On the project's tree pairs", 0.6);
    chip(530, 480, 860, 56, 'c_n = 1 − δ/w_n ,  δ = (√φ − 1)² = ' + V87.delta + ' ,  w_n = 2(n + φ²)', C.mag, tq, 19);
    lbl('project input : finite-specimen readout volume , §§2–4', 530, 535, C.dim, tq, 15);
    const gq = Q(S, 1, 'so the copies needed grow linearly', 0.6);
    lbl('m ≥ (w_n − δ)/(2δ) · log(1/(4ε(1 − ε)))  (11.3)', 530, 600, C.white, gq, 17);
    stamp('COPIES GROW LINEARLY IN n', 530, 690, gq, C.red, 28, -0.03);
    const px = 1040, py = 740, pw = 700, ph = 440, mx = SPEC87[SPEC87.length - 1][1] * 1.08, xS = n => px + n / 40 * pw, yS = v => py - v / mx * ph;
    axes87(px, py, pw, ph, tq, 'tree pair n', 'copies m needed for error ≤ 0.01');
    curve(p => { const n = p * 40; return [xS(n), yS(interp87(SPEC87.map(r => [r[0], r[2]]), n))]; }, 80, C.gold, gq, 2.5);
    SPEC87.forEach((r, i) => { if (i % 2 === 0) dot(xS(r[0]), yS(r[1]), 7, 'c', clamp(tq * 1.6 - i / 50)); });
    lbl('dots : exact minimum m ;  gold : bound (11.3)', px + 20, py - ph + 10, C.white, tq, 15, 'left');
    lbl('n = 0 : ' + V87.m0 + ' copies ;  n = 40 : ' + V87.m40 + ' copies', px + 20, py - ph + 36, C.cyan, tq, 16, 'left');
    [0, 10, 20, 30, 40].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, tq, 14));
  }
};

/* ---- 07 WEIGHTED QUANTIFIER (V14 §2, §3, §12) ---- */
SCENES.exists = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Circuits add alternatives and multiply along paths', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'starts from a weighted quantifier', 0.6) * f1;
    chip(530, 260, 860, 58, 'Q_μ R = Σ_w μ(w) R(w) ,   supp μ = { w : μ(w) > 0 }', C.gold, q, 21);
    const mu = [0.2, 0.1, 0, 0.25, 0.15, 0, 0.2, 0.1], R = [0, 1, 1, 0, 1, 0, 0, 0], base = 560;
    mu.forEach((m, i) => { const x = 175 + i * 95, qq = clamp(q * 1.6 - i / 12); if (m > 0) vbar87(x, base, 60, m * 640, C.cyan, qq); else line(x, base, x + 60, base, C.dim, qq, 3); lbl('w' + (i + 1), x + 30, base + 26, m > 0 ? C.white : C.dim, qq, 15); if (R[i]) ring(x + 30, base + 62, 14, C.gold, qq, 3); });
    lbl('bars : μ ; gold rings : R(w) = 1 ; w3 has R but lies outside the support', 530, 340, C.dim, q, 15);
    const eq = Q(S, 0, 'A probability is positive exactly when some world in the support', 0.6) * f1;
    chip(530, 680, 860, 54, 'Q_μ R > 0  ⇔  ∃ w ∈ supp μ : R(w) = 1     (here 0.25)', C.green, eq, 20);
    const aq = Q(S, 0, 'and one exactly when all do', 0.6) * f1;
    chip(530, 750, 860, 54, 'Q_μ R = 1  ⇔  ∀ w ∈ supp μ : R(w) = 1', C.mag, aq, 21);
    const sq = Q(S, 0, 'Satisfiability becomes positive probability', 0.6) * f1;
    chip(1390, 260, 760, 58, 'p_F = #SAT(F) / 2^m > 0  ⇔  F satisfiable', C.gold, sq, 22);
    const iq = Q(S, 0, 'but an estimate within half of two to the minus m', 0.6) * f1;
    const x0 = 1110, x1 = 1670, yy = 390, xv = v => x0 + (v + 0.5) / 2 * (x1 - x0);
    line(x0, yy, x1, yy, C.dim, iq, 1.5);
    dot(xv(0), yy, 9, 'c', iq); lbl('0', xv(0), yy + 32, C.cyan, iq, 18); dot(xv(1), yy, 9, 'm', iq); lbl('2^−m', xv(1), yy + 32, C.mag, iq, 18);
    seg87(xv(-0.5), xv(0.5), yy - 22, C.cyan, iq, 6); seg87(xv(0.5), xv(1.5), yy - 40, C.mag, iq, 6);
    lbl('η = 2^−(m+1) : both answer intervals contain the midpoint', 1390, yy + 72, C.white, iq, 15);
    const mq = Q(S, 0, 'cannot find one witness', 0.6) * f1;
    const px = 1080, py = 760, pw = 620, ph = 220, xS = N => px + N / 5000 * pw, yS = v => py - v * ph;
    axes87(px, py, pw, ph, mq, 'direct samples N', 'miss probability');
    curve(p => { const N = p * 5000; return [xS(N), yS(Math.pow(1 - Math.pow(2, -10), N))]; }, 100, C.red, mq, 2.5);
    dot(xS(1000), yS(V87.miss1000), 9, 'r', mq); lbl('m = 10 , one witness : ' + V87.miss1000 + ' after 1000 draws', xS(1000) + 18, yS(V87.miss1000) - 8, C.white, mq, 15, 'left');
  }
  const q1 = Q(S, 1, 'Circuits add alternatives and multiply along paths', 0.6, 0.3);
  if (q1 > 0) {
    const cols = [190, 330, 480, 700, 930], hdr = ['S', 'add', 'multiply', 'output', 'support map'];
    hdr.forEach((h, j) => lbl(h, cols[j], 300, C.dim, q1, 18));
    line(140, 318, 1010, 318, C.dim, q1, 1.5);
    const rows = [['Bool', '∨', '∧', 'is there a path', 'hom', C.green, 'Circuits add alternatives'], ['ℕ', '+', '×', 'how many paths', 'hom', C.green, 'Counts and nonnegative weights pass'], ['ℝ≥0', '+', '×', 'total weight', 'hom', C.green, 'Counts and nonnegative weights pass'], ['ℂ', '+', '×', 'amplitude', 'NOT a hom', C.red, 'complex amplitudes fail']];
    rows.forEach((r, i) => { const qq = Q(S, 1, r[6], 0.6, i === 2 ? 0.4 : 0), y = 375 + i * 80; box(140, y - 36, 870, 64, r[5], qq, 1.2, 'rgba(0,0,0,0.4)'); r.slice(0, 5).forEach((s, j) => lblG(s, cols[j], y + 8, j === 4 ? r[5] : C.white, qq, j === 3 ? 18 : 22)); });
    lbl('A ∨ A = A but p + p ≠ p : add only disjoint events , multiply only independent ones', 575, 720, C.dim, q1, 15);
    const hq = Q(S, 1, 'Keeping only zero or nonzero is a homomorphism', 0.6);
    box(1080, 270, 700, 220, C.gold, hq, 2, 'rgba(40,30,0,0.4)');
    lblG('ε(a) = 1 if a ≠ 0 , else 0', 1430, 320, C.white, hq, 22);
    lblG('hom  ⇔  a + b = 0 ⇒ a = b = 0', 1430, 380, C.gold, hq, 22);
    lblG('and  ab = 0 ⇒ a = 0 or b = 0', 1430, 430, C.gold, hq, 22);
    const cq = Q(S, 1, 'because one plus minus one is zero', 0.6);
    chip(1430, 560, 700, 58, 'h(0) = h(1 + (−1)) = h(1) ∨ h(−1) = 1', C.red, cq, 22);
    stamp('NO SUPPORT MAP FOR ℂ', 1430, 680, cq, C.red, 28, -0.04);
  }
};

/* ---- 08 COARSE RECORDS (V14 §4–5) ---- */
SCENES.saturate = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'where the image of the complement is the complement of the image', 'lean']]);
  const f1 = 1 - Q(S, 1, 'Now coarsen worlds into records', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On the five modes', 0.6) * f1;
    const r = pyrTrue(470, 520, 330, 0.55 + t * 0.12, q, { fill: 0.12, ls: 22 });
    const wq = Q(S, 0, 'weights one, a, b, c and d a c', 0.6) * f1;
    const W8 = { O: '1', L: 'a', T: 'b', R: 'c', J: 'd a c' };
    if (r.P) Object.keys(W8).forEach(k => lbl(W8[k], r.P[k][0], r.P[k][1] + 46, k === 'J' ? C.mag : C.gold, wq, 20));
    lbl('modes ∅ , 1 , 2 , 3 , 13 ;  weight in gold', 470, 770, C.dim, q, 15);
    chip(1350, 270, 840, 58, 'p = (1 , a , b , c , d a c) / Z_d ,   Z_d = 1 + a + b + c + d a c', C.gold, wq, 20);
    lbl('a bijection onto the open five-state simplex :  a = p₁/p∅ , b = p₂/p∅ , c = p₃/p∅', 1350, 325, C.dim, wq, 15);
    const dq = Q(S, 0, 'the odds ratio d is a joint parameter', 0.6) * f1;
    chip(1350, 400, 840, 60, 'd = p∅ p₁₃ / (p₁ p₃)', C.mag, dq, 26);
    lbl('not fixed by the three single-position weights', 1350, 455, C.white, dq, 16);
    const oq = Q(S, 0, 'the three-weight model is d equal one', 0.6) * f1;
    chip(1350, 530, 840, 58, 'd = 1  ⇔  p∅ p₁₃ = p₁ p₃', C.green, oq, 24);
    lbl('ends 1 and 3 independent given the middle empty ; not unconditional independence', 1350, 585, C.dim, oq, 15);
    lbl('scan : K_HL = B(c) B(b) B(a) = [[1 + b + c , a(1 + c)] , [1 + b , a]] ,  B(t) = [[1 , t] , [1 , 0]]', 1350, 650, C.dim, oq, 14);
  }
  const q1 = Q(S, 1, 'Now coarsen worlds into records', 0.6, 0.3);
  if (q1 > 0) {
    const mu = SAT87.mu, f = SAT87.f, A = new Set(SAT87.A), base = 590, sc = 1300;
    const eq = Q(S, 1, 'Existence over a fibre gives an upper value', 0.6), lq = Q(S, 1, 'universality a lower one', 0.6), gq = Q(S, 1, 'the defect adds along coarsenings', 0.6);
    let x = 150; const fx = [[], [], [], []];
    mu.forEach((m, i) => { if (i > 0 && f[i] !== f[i - 1]) x += 34; fx[f[i]].push(x); const inA = A.has(i); vbar87(x, base, 56, m * sc, inA ? C.gold : C.cyan, q1, inA ? 0.55 : 0.2); lbl(m.toFixed(2), x + 28, base - m * sc - 10, C.white, q1, 13); x += 64; });
    const hitA = [0, 1, 2], inside = [2];
    for (let y = 0; y < 4; y++) { const xa = fx[y][0] - 8, xb = fx[y][fx[y].length - 1] + 64; rect63(xa, 360, xb - xa, base - 352, hitA.includes(y) ? C.gold : C.dim, Math.max(q1 * 0.5, hitA.includes(y) ? eq : 0), hitA.includes(y) ? 2.5 : 1.2); if (inside.includes(y)) fillBox(xa, 360, xb - xa, base - 352, C.green, lq * 0.18); lbl('y' + (y + 1) + '  ν = ' + SAT87.nu[y].toFixed(2), (xa + xb) / 2, base + 30, C.white, q1, 14); }
    lbl('gold columns : A ;  gold frames : fibres with a witness ;  green : fibre inside A', 520, 335, C.dim, q1, 14);
    const zx = [[fx[0][0] - 8, fx[1][fx[1].length - 1] + 64], [fx[2][0] - 8, fx[3][fx[3].length - 1] + 64]];
    zx.forEach(([a, b], z) => { line(a, base + 52, b, base + 52, C.mag, gq, 3); line(a, base + 44, a, base + 60, C.mag, gq, 3); line(b, base + 44, b, base + 60, C.mag, gq, 3); lbl('z' + (z + 1), (a + b) / 2, base + 84, C.mag, gq, 17); });
    const ax0 = 1080, ax1 = 1720, xv = v => ax0 + v * (ax1 - ax0);
    const bq = Q(S, 1, 'the probability lies between', 0.6);
    chip(1400, 262, 640, 54, 'ℓ_f(A) ≤ μ(A) ≤ u_f(A)', C.gold, bq, 23);
    line(ax0, 380, ax1, 380, C.dim, eq, 1.5); lbl('0', ax0, 404, C.dim, eq, 14); lbl('1', ax1, 404, C.dim, eq, 14);
    seg87(xv(SAT87.ell), xv(SAT87.u), 350, C.cyan, eq, 7); dot(xv(SAT87.muA), 350, 11, 'g', bq);
    lbl('records y :  ℓ = ' + SAT87.ell + ' ,  μ(A) = ' + SAT87.muA + ' ,  u = ' + SAT87.u, 1400, 435, C.white, eq, 16);
    lbl('δ_f(A) = u − μ(A) = μ(f⁻¹(f[A]) \\ A) = ' + SAT87.df, 1400, 465, C.dim, bq, 15);
    seg87(xv(SAT87.ell2), xv(SAT87.u2), 520, C.mag, gq, 7); dot(xv(SAT87.muA), 520, 11, 'g', gq);
    lbl('records z :  ℓ = ' + SAT87.ell2 + ' ,  u = ' + SAT87.u2, 1400, 562, C.white, gq, 16);
    chip(1400, 610, 640, 52, 'δ_g∘f(A) = δ_f(A) + δ_g(f[A]) : ' + SAT87.dgf + ' = ' + SAT87.df + ' + ' + SAT87.dg, C.mag, gq, 18);
    const nq = Q(S, 1, 'It vanishes exactly on unions of whole fibres', 0.6), lnq = Q(S, 1, 'where the image of the complement is the complement of the image', 0.6);
    lbl('δ_f(A) = 0  ⇔  A is a union of whole fibres', 1400, 670, C.white, nq, 16);
    box(1060, 692, 680, 118, C.green, lnq, 2.2, 'rgba(0,40,20,0.55)');
    lbl('LEAN · FROZEN THEOREM', 1400, 720, C.green, lnq, 16);
    lblG('f onto :  f[Ω \\ A] = Y \\ f[A]  ⇔  A = f⁻¹(f[A])', 1400, 758, C.white, lnq, 20);
    lbl('image_complement_iff_saturated · D5/S3/ConceptDynamics/Negation', 1400, 792, C.dim, lnq, 13);
  }
};

/* ---- 09 SUPPORT QUANTIFIER (V14 §6–7) ---- */
SCENES.support = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The right existence is geometric', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two Hadamards send zero to one', 0.6) * f1;
    chip(530, 260, 860, 58, '⟨1| H H |0⟩ = Σ_k H_1k H_k0', C.white, q, 23);
    const N0 = [200, 500], M0 = [480, 380], M1 = [480, 620], O1 = [760, 500];
    const pq = Q(S, 0, 'two paths of amplitude one half and minus one half', 0.6) * f1;
    [[N0, M0, '1/√2', C.gold], [N0, M1, '1/√2', C.mag], [M0, O1, '1/√2', C.gold], [M1, O1, '−1/√2', C.mag]].forEach(([a, b, s, col]) => { arrow(a[0] + 26, a[1] + (b[1] - a[1]) * 0.09, b[0] - 28, b[1] - (b[1] - a[1]) * 0.09, col, Math.max(q * 0.5, pq), 3); lbl(s, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (b[1] < a[1] ? -16 : 34), col, q, 18); });
    [[N0, '|0⟩'], [M0, '|0⟩'], [M1, '|1⟩'], [O1, '|1⟩']].forEach(([p, s]) => { ring(p[0], p[1], 26, C.cyan, q, 2.5); lbl(s, p[0], p[1] + 7, C.white, q, 18); });
    lbl('path via |0⟩ : + 1/2', 480, 330, C.gold, pq, 17); lbl('path via |1⟩ : − 1/2', 480, 690, C.mag, pq, 17);
    const cq = Q(S, 0, 'which cancel', 0.6) * f1;
    chip(530, 765, 520, 56, '½ + (−½) = 0', C.red, cq, 26);
    const mq = Q(S, 0, 'measuring in between gives one half', 0.6) * f1;
    const base = 600;
    line(1100, base, 1680, base, C.dim, mq, 1.5);
    line(1150, base - 2, 1290, base - 2, C.cyan, cq, 6); lbl('0', 1220, base - 20, C.cyan, cq, 24); lbl('coherent', 1220, base + 28, C.cyan, cq, 16);
    vbar87(1420, base, 140, 0.25 * 480, C.gold, mq); vbar87(1420, base - 120, 140, 0.25 * 480, C.mag, mq); lbl('¼ + ¼ = ½', 1490, base - 262, C.white, mq, 22); lbl('measured in between', 1490, base + 28, C.gold, mq, 16);
    stamp('NONZERO PATHS , ZERO PROBABILITY', 1390, 700, Q(S, 0, 'Nonzero paths do not decide the probability', 0.6) * f1, C.red, 24, -0.03);
    lbl('records : Σ_h M_h ρ M_h†   versus   amplitudes : (Σ_h M_h) ρ (Σ_k M_k)†', 1390, 280, C.dim, Q(S, 0, 'add amplitudes, not records', 0.6) * f1, 15);
  }
  const q1 = Q(S, 1, 'The right existence is geometric', 0.6, 0.3);
  if (q1 > 0) {
    const kq = Q(S, 1, 'sends the support of a state to the span of its Kraus images', 0.6);
    chip(530, 260, 860, 58, 'supp Φ(ρ) = span_a K_a (supp ρ) =: F_Φ(supp ρ)', C.gold, kq, 21);
    lbl('independent of the Kraus representation', 530, 315, C.dim, kq, 15);
    const ox = 330, oy = 620, L = 300;
    const rq = Q(S, 1, 'not orthogonal to the effect', 0.6);
    line(ox - 160, oy, ox + L, oy, C.cyan, q1, 3); lbl('S = span |0⟩', ox + L, oy + 30, C.cyan, q1, 17, 'right');
    line(ox - 120 * Math.SQRT1_2, oy + 120 * Math.SQRT1_2, ox + L * Math.SQRT1_2, oy - L * Math.SQRT1_2, C.gold, q1, 3); lbl('T = span |+⟩', ox + L * Math.SQRT1_2 + 10, oy - L * Math.SQRT1_2 - 10, C.gold, q1, 17, 'left');
    ctx.save(); ctx.globalAlpha = rq; ctx.strokeStyle = C.mag; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(ox, oy, 80, -Math.PI / 4, 0); ctx.stroke(); ctx.restore();
    lbl('45°', ox + 98, oy - 26, C.mag, rq, 17, 'left'); dot(ox, oy, 8, 'w', q1);
    lbl('S ∩ T = 0 ,  yet Tr(P_S P_T) = 1/2 : not orthogonal', 530, 735, C.white, rq, 17);
    lbl('non-orthogonal is not the same as intersecting', 530, 768, C.dim, rq, 15);
    const items = [['F_Φ+Ψ = F_Φ ∨ F_Ψ', 'sums join subspaces', C.cyan], ['F_Φ∘Ψ = F_Φ ∘ F_Ψ', 'composites compose', C.cyan], ['Tr[E Φ(ρ)] > 0  ⇔  F_Φ(supp ρ) not ⊥ supp E', 'a probability is positive exactly when', C.green], ['same images of all subspaces  ⇒  U = e^(iθ) V', 'Phases survive', C.mag]];
    items.forEach(([s, ph, col], i) => chip(1390, 260 + i * 82, 760, 58, s, col, Q(S, 1, ph, 0.6), i === 2 ? 18 : 21));
    const pq = Q(S, 1, 'Phases survive', 0.6);
    lbl('diag(1 , −1) fixes span|0⟩ and span|1⟩ , but sends span|+⟩ to span|−⟩', 1390, 600, C.dim, pq, 15);
    lbl('right adjoint : G_Φ(T) = ∩_a K_a⁻¹(T) ,  F_Φ(S) ⊆ T  ⇔  S ⊆ G_Φ(T)', 1390, 640, C.dim, pq, 15);
    lbl('two nonzero orthogonal branches in series give the zero map', 1390, 680, C.dim, pq, 15);
  }
};

/* ---- 10 GOLDEN GATE (V14 §8) ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'From zero zero zero', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "Now the project's golden gate", 0.6) * f1;
    chip(530, 260, 860, 56, 'invariant space :  span( |000⟩ , |010⟩ )', C.white, q, 21);
    const pq = Q(S, 0, 'times a projection', 0.6) * f1;
    const P = [['φ⁻¹', 'φ^(−3/2)'], ['φ^(−3/2)', 'φ⁻²']];
    lbl('P =', 250, 430, C.gold, pq, 26, 'right');
    P.forEach((row, i) => row.forEach((s, j) => cell87(280 + j * 180, 360 + i * 90, 168, 78, s, C.gold, pq, 22)));
    lbl('P² = P ,  trace 1 :  a rank-one projection', 460, 570, C.dim, pq, 15);
    const kq = Q(S, 0, 'K is zeta times the identity', 0.6) * f1;
    chip(530, 640, 860, 62, 'K = ζ [ I + (ζ − 1) P ] ,   ζ = e^(3πi/5)', C.cyan, kq, 25);
    const cx = 1390, cy = 500, R = 200;
    const eq = Q(S, 0, 'Its eigenvalues are zeta and zeta squared', 0.6) * f1;
    ring(cx, cy, R, C.dim, eq, 2); line(cx - R - 20, cy, cx + R + 20, cy, C.dim, eq * 0.4, 1); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, eq * 0.4, 1);
    for (let k = 0; k < 10; k++) { const an = 2 * Math.PI * k / 10; dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 6, 'w', eq * 0.6); }
    const z1 = 3 * Math.PI / 5, z2 = 6 * Math.PI / 5;
    dot(cx + R * Math.cos(z1), cy - R * Math.sin(z1), 14, 'g', eq); lbl('ζ : order 10', cx + R * Math.cos(z1) - 24, cy - R * Math.sin(z1) - 18, C.gold, eq, 18, 'right');
    dot(cx + R * Math.cos(z2), cy - R * Math.sin(z2), 14, 'm', eq); lbl('ζ² : order 5', cx + R * Math.cos(z2) - 24, cy - R * Math.sin(z2) + 30, C.mag, eq, 18, 'right');
    lbl('eigenvalue ζ² on P , ζ on I − P', cx, cy + R + 50, C.white, eq, 16);
    const iq = Q(S, 0, 'so K to the tenth is the identity', 0.6) * f1;
    chip(cx, cy + R + 105, 360, 56, 'K¹⁰ = I', C.green, iq, 28);
  }
  const q1 = Q(S, 1, 'From zero zero zero', 0.6, 0.3);
  if (q1 > 0) {
    const cq = Q(S, 1, 'ten coherent steps give chance zero', 0.6);
    chip(530, 260, 860, 56, 'coherent :  |⟨010| K¹⁰ |000⟩|² = 0', C.cyan, cq, 22);
    const rq = Q(S, 1, 'Recording the basis after every step', 0.6);
    chip(530, 345, 860, 56, 'recorded :  T = |K|² entrywise = [[φ⁻² , φ⁻¹] , [φ⁻¹ , φ⁻²]]', C.gold, rq, 20);
    lbl('|ζ − 1|² φ⁻³ = φ² φ⁻³ = φ⁻¹ ;  eigenvalues 1 and ν = φ⁻² − φ⁻¹ = −φ⁻³', 530, 400, C.dim, rq, 15);
    chip(530, 470, 860, 56, 'Tʳ(000 → 010) = (1 − νʳ)/2', C.gold, rq, 22);
    const vq = Q(S, 1, 'one minus phi to the minus thirty, over two', 0.6);
    chip(530, 570, 860, 66, 'r = 10 :  (1 − φ⁻³⁰)/2 = ' + V87.p10, C.green, vq, 26);
    lbl('φ⁻³⁰ = ' + V87.phi30, 530, 630, C.dim, vq, 16);
    stamp('SAME GATE , DIFFERENT RECORD', 530, 715, vq, C.red, 28, -0.03);
    const px = 1040, py = 740, pw = 700, ph = 400, xS = r => px + 20 + r * (pw - 40) / 10, yS = v => py - v / 1.05 * ph;
    axes87(px, py, pw, ph, cq, 'steps r', 'probability of reading 010');
    const cpts = GOLD87.map(r => [xS(r[0]), yS(r[1])]);
    strokePoly(cpts, C.cyan, cq * 0.7, 2.5, false); GOLD87.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 9, 'c', clamp(cq * 1.6 - i / 14)));
    const rpts = GOLD87.map(r => [xS(r[0]), yS(r[2])]);
    strokePoly(rpts, C.gold, rq * 0.7, 2.5, false); GOLD87.forEach((r, i) => dot(xS(r[0]), yS(r[2]), 9, 'g', clamp(rq * 1.6 - i / 14)));
    GOLD87.forEach(r => lbl(String(r[0]), xS(r[0]), py + 26, C.dim, cq, 14));
    lbl('cyan : coherent , back to 0 at r = 10', px + pw, py - ph - 44, C.cyan, cq, 16, 'right');
    lbl('gold : recorded every step , → 1/2', px + pw, py - ph - 18, C.gold, rq, 16, 'right');
    ring(xS(10), yS(0), 18, C.cyan, cq, 3);
  }
};

/* ---- 11 RECORD GRAM (V14 §9–11) ---- */
SCENES.gram = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'two independent copies square them', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'A positive coherent kernel gives a Hilbert space', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Probabilities add for every choice of amplitudes', 0.6) * f1;
    chip(530, 260, 860, 58, 'p(y) = a_y† G a_y ,   G_hk = ⟨r_h , r_k⟩', C.white, q, 23);
    const GI = [['1', '0', '0'], ['0', '1', '0'], ['0', '0', '1']], GN = [['1', '.4', '.2'], ['.4', '1', '.3i'], ['.2', '−.3i', '1']];
    const iq = Q(S, 0, 'exactly when the record Gram matrix is the identity', 0.6) * f1;
    GI.forEach((row, i) => row.forEach((s, j) => cell87(170 + j * 92, 350 + i * 78, 84, 70, s, i === j ? C.green : C.dim, q, 20, i === j ? 0.35 : 0.08)));
    GN.forEach((row, i) => row.forEach((s, j) => cell87(600 + j * 92, 350 + i * 78, 84, 70, s, i === j ? C.cyan : C.red, q, 20, i === j ? 0.2 : 0.3)));
    lbl('orthogonal records : add', 308, 615, C.green, iq, 17); lbl('overlapping records : cross terms', 738, 615, C.red, iq, 17);
    chip(530, 680, 860, 56, 'additive for every amplitude vector  ⇔  G = I', C.green, iq, 22);
    lbl('sup over a of |a†Ga − ‖a‖²| / ‖a‖² = ‖G − I‖_op ≤ η (M − 1)', 530, 735, C.dim, iq, 15);
    const oq = Q(S, 0, 'One copy only kills the real parts of the overlaps', 0.6) * f1;
    chip(1390, 260, 760, 56, 'D = [[1 , i t] , [−i t , 1]] ,   t = 0.3', C.gold, oq, 21);
    const base = 480, sc = 700;
    line(1100, base, 1680, base, C.dim, oq, 1.5);
    line(1160, base - 2, 1300, base - 2, C.cyan, oq, 6); lbl('0', 1230, base - 20, C.cyan, oq, 24); lbl('one copy : 2 Re D₁₂ = 0', 1230, base + 40, C.cyan, oq, 16);
    const tq = Q(S, 0, 'two independent copies square them', 0.6) * f1;
    vbar87(1450, base, 140, V87.two * sc, C.red, tq); lbl(String(V87.two), 1520, base + Math.abs(V87.two) * sc + 30, C.red, tq, 24); lbl('two copies : 2 Re D₁₂² = −2t²', 1520, base - 24, C.red, tq, 16);
    const dq = Q(S, 0, 'so the imaginary parts must vanish too', 0.6) * f1;
    stamp('BOTH PARTS VANISH : D DIAGONAL', 1390, 730, dq, C.gold, 24, -0.03);
    lbl('Diósi , Phys. Rev. Lett. 92 , 170401 (2004)', 1390, 800, C.cyan, tq, 15);
  }
  const q1 = Q(S, 1, 'A positive coherent kernel gives a Hilbert space', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 270, 860, 58, 'D ⪰ 0  ⇒  H_D = ℂ^M / ker D ,  dim = rank D , unique up to unitary', C.cyan, q1, 19);
    const wq = Q(S, 1, 'must be the squared norm', 0.6);
    chip(530, 360, 860, 58, 'W unitary-invariant , additive on ⊥ vectors , W(unit) = 1  ⇒  W(v) = ‖v‖²', C.gold, Q(S, 1, 'a weight that is unitary-invariant', 0.6), 18);
    lbl('no continuity assumed ; true for real Hilbert spaces as well', 530, 415, C.dim, wq, 15);
    lbl('fixed branch family : q(A∪B∪C) − q(A∪B) − q(A∪C) − q(B∪C) + q(A) + q(B) + q(C) = 0', 530, 480, C.dim, wq, 14);
    lbl('but q(A) = ‖Σ v_h‖² is not monotone : v and −v give zero together', 530, 515, C.dim, wq, 14);
    lbl('§11 : a product state for each source pair does not make random sources independent :', 530, 690, C.dim, q1, 14);
    lblG('½ (π_α ⊗ π_α + π_β ⊗ π_β) − π̄ ⊗ π̄ = ¼ (π_α − π_β) ⊗ (π_α − π_β) ≠ 0', 530, 725, C.white, q1, 17);
    const pq = Q(S, 1, 'this kernel gives every event a nonnegative value', 0.6);
    chip(1390, 270, 760, 56, 'D = (1/7) [[1 , 2 , 0] , [2 , 1 , 0] , [0 , 0 , 1]]', C.white, pq, 20);
    const base = 640, sc = 32;
    D787.forEach((r, i) => { const x = 1090 + i * 76, qq = clamp(pq * 1.6 - i / 10); vbar87(x, base, 56, r[1] * sc, C.cyan, qq); lbl(r[1] + '/7', x + 28, base - r[1] * sc - 10, C.white, qq, 14); lbl(r[0], x + 28, base + 26, C.dim, qq, 15); });
    const cq = Q(S, 1, 'yet one combination minus two sevenths', 0.6);
    vbar87(1090 + 7 * 76 + 44, base, 56, -2 * sc, C.red, cq); lbl('−2/7', 1090 + 7 * 76 + 72, base + 2 * sc + 26, C.red, cq, 17); lbl('c = (1 , −1 , 0)', 1090 + 7 * 76 + 72, base - 20, C.red, cq, 14);
    line(1080, base, 1740, base, C.dim, pq, 1.5);
    stamp('NOT POSITIVE : NO HILBERT KERNEL', 1390, 372, cq, C.red, 22, -0.02);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The saturation equivalence is a frozen Lean theorem', 'lean'], [1, 'the Diósi condition is a published input', 'published'], [1, 'two-state discrimination is classical', 'classical'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['TABLES', 'cond 1 , future fails', C.gold, 'Finite tables can miss the future'], ['INSTRUMENTS', '3/7  ·  3/4', C.mag, 'complete instruments keep what effects forget'], ['BUDGETS', 'Σ ε_k  ·  δ / p', C.cyan, 'errors add while rare branches amplify them'], ['QUANTIFIER', 'Q_μ R > 0 ⇔ ∃', C.green, 'probability is a weighted quantifier'], ['DEFECT', 'δ_g∘f = δ_f + δ_g', C.orange, 'coarse records leave an exact defect'], ['GOLDEN GATE', '0  vs  (1 − φ⁻³⁰)/2', C.vio, 'the golden gate returns only when coherent']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 130, 240, 260, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 19); });
    lbl('LEAN · image_complement_iff_saturated (D5/S3/ConceptDynamics/Negation) : for f onto , f[Ω \\ A] = Y \\ f[A] ⇔ A = f⁻¹(f[A])', W / 2, 455, C.green, Q(S, 1, 'The saturation equivalence is a frozen Lean theorem') * fade, 15);
    lbl('PUBLISHED · Diósi two-copy condition (PRL 92 , 170401) · semiring parsing (Goodman) · algebraic model counting (Kimmig–Van den Broeck–De Raedt) · Sorkin quantum measure', W / 2, 500, C.cyan, Q(S, 1, 'the Diósi condition is a published input') * fade, 14);
    lbl('CLASSICAL · two-state discrimination (Watrous , Theorem 3.4) · Choi criterion · trace and diamond norms · strategy distance (Gutoski)', W / 2, 545, '#8fbcff', Q(S, 1, 'two-state discrimination is classical') * fade, 14);
    lbl('VOLUMES · noisy fit · word products · four records · 3/7 and 3/4 · error budget · post-selection · frame bound · repair · copies · defect · supports · Gram · square law', W / 2, 590, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 13);
    lbl('RECOMPUTED · fits · ring records · Lüders distances · stop and rotation · rare branch · dual norms · repairs · copies · defects · supports · K¹⁰ = I · −2/7', W / 2, 635, C.white, Q(S, 1, 'the finite computations were redone') * fade, 13);
    lbl('DIGESTION · V12 : 110 atoms , V14 : 84 atoms , all residual-open', W / 2, 710, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V12–V14 · RECORDS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V12–V14 · 有限分辨率、存在量词与量子记录 · TRURETURING FILM 087', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Finite tables, complete instruments, rare branches, coarse records, and a golden gate.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V12–V14', tables: 'FINITE TABLES', instr: 'COMPLETE INSTRUMENTS', budget: 'ERROR BUDGETS', ruler: 'RULERS AND REPAIR', limits: 'ORDER AND SPECIMENS', exists: 'WEIGHTED QUANTIFIER', saturate: 'COARSE RECORDS', support: 'SUPPORT QUANTIFIER', golden: 'GOLDEN GATE', gram: 'RECORD GRAM', finale: 'LEDGER' });

function poster087() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('ℓ ≤ μ(A) ≤ u ,  δ_g∘f = δ_f + δ_g', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('menu ≥ 3/7 · exact effects 3/4', 1320, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('K¹⁰ = I · recorded (1 − φ⁻³⁰)/2', 1320, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V12–V14', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4, ls: 4 });
  txt('AURIC V12–V14 · RECORDS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('有 限 分 辨 率 · 存 在 量 词 · 量 子 记 录', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 087', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster087;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
