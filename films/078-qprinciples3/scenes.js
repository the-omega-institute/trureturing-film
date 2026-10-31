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

/* ---- film 078: AURIC QUANTUM PRINCIPLES III · native predictive rank and terminal response ---- */
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
const _po078 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po078.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po078.set(key, off); }
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
/* ---- film 078 data, generated by gen_data.py from vis078.json (verify078.py) ---- */
const PATHS78 = ["1000000010", "1000001010", "1000010010", "1000100010", "1000101010", "1001000010", "1001001010", "1001010010", "1010000010", "1010001010", "1010010010", "1010100010", "1010101010"];
const DJ78 = [1, 168, 8112, 198744, 3105375, 34978944];
const BSV78 = [1.628, 0.828, 0.815, 0.791, 0.765, 0.751, 0.734, 0.728, 0.722, 0.716, 0.715, 0.698, 0.694, 0.686, 0.683, 0.678, 0.671, 0.671, 0.664, 0.657, 0.654, 0.651, 0.645, 0.639, 0.638, 0.636, 0.634, 0.628, 0.618, 0.616, 0.612, 0.605, 0.6, 0.599, 0.598, 0.594, 0.585, 0.578, 0.577, 0.575, 0.574, 0.569, 0.567, 0.561, 0.558, 0.555, 0.552, 0.546, 0.546, 0.543, 0.537, 0.533, 0.53, 0.527, 0.521, 0.517, 0.513, 0.509, 0.505, 0.502, 0.499, 0.495, 0.494, 0.493, 0.49, 0.485, 0.477, 0.476, 0.471, 0.469, 0.465, 0.463, 0.453, 0.452, 0.45, 0.446, 0.44, 0.437, 0.432, 0.428, 0.423, 0.419, 0.417, 0.411, 0.405, 0.403, 0.402, 0.397, 0.395, 0.394, 0.391, 0.386, 0.379, 0.377, 0.374, 0.372, 0.369, 0.364, 0.357, 0.352, 0.351, 0.347, 0.346, 0.34, 0.339, 0.334, 0.331, 0.324, 0.323, 0.319, 0.313, 0.312, 0.305, 0.301, 0.296, 0.286, 0.284, 0.279, 0.278, 0.273, 0.269, 0.268, 0.262, 0.258, 0.255, 0.249, 0.239, 0.236, 0.233, 0.229, 0.223, 0.219, 0.214, 0.21, 0.206, 0.197, 0.194, 0.19, 0.182, 0.18, 0.166, 0.161, 0.158, 0.157, 0.151, 0.148, 0.14, 0.126, 0.119, 0.116, 0.114, 0.11, 0.099, 0.094, 0.088, 0.084, 0.078, 0.077, 0.067, 0.061, 0.054, 0.04, 0.03, 0.01, 0.004, -0.004, -0.026, -0.032, -0.063, -13.935, -14.083, -14.261, -14.462, -14.481, -14.486, -14.5, -14.515, -14.521, -14.527, -14.528, -14.537, -14.545, -14.551, -14.558, -14.566, -14.569, -14.575, -14.585, -14.59, -14.591, -14.597, -14.6, -14.604, -14.606, -14.609, -14.614, -14.619, -14.623, -14.626, -14.629];
const QSV78 = [1.855, 1.132, -0.304, -0.335, -0.349, -0.361, -0.372, -0.382, -0.391, -0.4, -0.409, -0.417, -0.425, -0.433, -0.441, -0.449, -0.457, -0.465, -0.473, -0.48, -0.488, -0.496, -0.504, -0.511, -0.519, -0.527, -0.535, -0.543, -0.551, -0.559, -0.567, -0.575, -0.583, -0.592, -0.6, -0.608, -0.617, -0.625, -0.634, -0.643, -0.652, -0.661, -0.671, -0.68, -0.689, -0.699, -0.709, -0.719, -0.729, -0.739, -0.75, -0.761, -0.772, -0.783, -0.794, -0.806, -0.818, -0.83, -0.843, -0.856, -0.869, -0.883, -0.896, -0.911, -0.926, -0.941, -0.957, -0.973, -0.99, -1.008, -1.026, -1.045, -1.065, -1.085, -1.107, -1.13, -1.154, -1.18, -1.206, -1.234, -1.266, -1.298, -1.334, -1.372, -1.415, -1.461, -1.513, -1.572, -1.641, -1.722, -1.825, -1.962, -2.242];
const QRANK78 = 8281;
const FAM78 = [[2, 8281, 8281], [3, 198913, 207025], [4, 3105544, 3312400], [5, 34979113, 38291344], [6, 306330921, 344622096]];
const FAMDEV78 = [0.236068, 0.145898, 0.09017, 0.055728, 0.034442, 0.021286, 0.013156];
const TVBEST78 = 0.2421;
const WIT78 = {"born": [0.09017, 0.23607, 0.61803, 0.23607, 0.09017, 0.56231, 0.41641, 0.03444, 0.41641, 0.56231], "quart": [0.09268, 0.25329, 0.73607, 0.25329, 0.09268, 0.66001, 0.46999, 0.03481, 0.46999, 0.66001], "d": [0.1459, 0.38197, 1.0, 0.38197, 0.1459, 0.90983, 0.67376, 0.05573, 0.67376, 0.90983], "ten": 0.013156, "four": -0.047597};
const SHARP78 = [[0.25, 0.001, 0.013, 0.016], [0.5, 0.003, 0.053, 0.031], [0.75, 0.008, 0.12, 0.047], [1.0, 0.011, 0.214, 0.063]];
const SHARPR78 = [[0.25, 0.0006973, 0.01337, 0.01563], [0.5, 0.003301, 0.0535, 0.03128], [0.75, 0.007867, 0.1204, 0.04698], [1.0, 0.0108, 0.214, 0.06275]];
const WGT78 = {"a": 0.72361, "b": 0.27639, "post": [0.38197, 0.23607, 0.23607, 0.1459], "arch": [0.6, 0.4]};
const FIN78 = {"h3": 0.05176, "m": 8, "n": 83, "k": 666, "flen": 3, "quqv": 0.19541, "g3": 0.52975};
const CAR78 = {"dim": 89, "code": 26, "comp": 63, "M": [[3, 3], [4, 2]], "tr": [4, 2, 0]};
const CFUN78 = [[0.0, 0.0], [0.0155, 0.0097], [0.0309, 0.0197], [0.0464, 0.03], [0.0618, 0.0407], [0.0773, 0.0517], [0.0927, 0.0631], [0.1082, 0.075], [0.1236, 0.0872], [0.1391, 0.0998], [0.1545, 0.1129], [0.17, 0.1265], [0.1854, 0.1407], [0.2009, 0.1553], [0.2163, 0.1706], [0.2318, 0.1864], [0.2472, 0.203], [0.2627, 0.2202], [0.2781, 0.2381], [0.2936, 0.2568], [0.309, 0.2764], [0.3245, 0.2969], [0.3399, 0.3183], [0.3554, 0.3407], [0.3708, 0.3643], [0.3863, 0.389], [0.4017, 0.415], [0.4172, 0.4424], [0.4326, 0.4713], [0.4481, 0.5017], [0.4635, 0.534], [0.479, 0.5682], [0.4944, 0.6044], [0.5099, 0.6429], [0.5253, 0.684], [0.5408, 0.7278], [0.5562, 0.7747], [0.5717, 0.8249], [0.5871, 0.8789], [0.6026, 0.9371], [0.618, 1.0]];
const REC78 = [[0.61803, 0.38197], [0.61803, 0.38197], [0.23607, 0.76393]];
const RULE78 = {"h": [[0.0, -0.0], [0.005, -3.0766e-07], [0.01, -5.2099e-07], [0.015, -6.6004e-07], [0.02, -7.4137e-07], [0.025, -7.7859e-07], [0.03, -7.8279e-07], [0.035, -7.6294e-07], [0.04, -7.2625e-07], [0.045, -6.7839e-07], [0.05, -6.2383e-07], [0.055, -5.6601e-07], [0.06, -5.075e-07], [0.065, -4.5021e-07], [0.07, -3.9549e-07], [0.075, -3.4426e-07], [0.08, -2.9706e-07], [0.085, -2.5419e-07], [0.09, -2.1574e-07], [0.095, -1.8163e-07], [0.1, -1.517e-07], [0.105, -1.2568e-07], [0.11, -1.0328e-07], [0.115, -8.4167e-08], [0.12, -6.8004e-08], [0.125, -5.4459e-08], [0.13, -4.3209e-08], [0.135, -3.395e-08], [0.14, -2.6402e-08], [0.145, -2.0309e-08], [0.15, -1.5439e-08], [0.155, -1.1589e-08], [0.16, -8.5795e-09], [0.165, -6.2564e-09], [0.17, -4.4865e-09], [0.175, -3.1577e-09], [0.18, -2.176e-09], [0.185, -1.4636e-09], [0.19, -9.571e-10], [0.195, -6.0535e-10], [0.2, -3.677e-10], [0.205, -2.1235e-10], [0.21, -1.1487e-10], [0.215, -5.6808e-11], [0.22, -2.4606e-11], [0.225, -8.5281e-12], [0.23, -1.8305e-12], [0.235, -3.9411e-14], [0.24, -3.5914e-13], [0.245, -1.1944e-12], [0.25, -1.7715e-12], [0.255, -1.8452e-12], [0.26, -1.4795e-12], [0.265, -8.8797e-13], [0.27, -3.2524e-13], [0.275, -1.7097e-14], [0.28, -1.2194e-13], [0.285, -7.1516e-13], [0.29, -1.7899e-12], [0.295, -3.2687e-12], [0.3, -5.0216e-12], [0.305, -6.8868e-12], [0.31, -8.6921e-12], [0.315, -1.0273e-11], [0.32, -1.149e-11], [0.325, -1.2238e-11], [0.33, -1.2457e-11], [0.335, -1.2134e-11], [0.34, -1.1299e-11], [0.345, -1.0027e-11], [0.35, -8.427e-12], [0.355, -6.6342e-12], [0.36, -4.7998e-12], [0.365, -3.0806e-12], [0.37, -1.6282e-12], [0.375, -5.7942e-13], [0.38, -4.7925e-14], [0.385, -1.1726e-13], [0.39, -8.3599e-13], [0.395, -2.2149e-12], [0.4, -4.2263e-12], [0.405, -6.8053e-12], [0.41, -9.8531e-12], [0.415, -1.3242e-11], [0.42, -1.6821e-11], [0.425, -2.0425e-11], [0.43, -2.3879e-11], [0.435, -2.701e-11], [0.44, -2.9656e-11], [0.445, -3.1666e-11], [0.45, -3.2918e-11], [0.455, -3.3314e-11], [0.46, -3.2793e-11], [0.465, -3.1329e-11], [0.47, -2.8932e-11], [0.475, -2.5653e-11], [0.48, -2.1575e-11], [0.485, -1.6817e-11], [0.49, -1.1521e-11], [0.495, -5.855e-12], [0.5, 0.0], [0.505, 5.855e-12], [0.51, 1.1521e-11], [0.515, 1.6817e-11], [0.52, 2.1575e-11], [0.525, 2.5653e-11], [0.53, 2.8932e-11], [0.535, 3.1329e-11], [0.54, 3.2793e-11], [0.545, 3.3314e-11], [0.55, 3.2918e-11], [0.555, 3.1666e-11], [0.56, 2.9656e-11], [0.565, 2.701e-11], [0.57, 2.3879e-11], [0.575, 2.0425e-11], [0.58, 1.6821e-11], [0.585, 1.3242e-11], [0.59, 9.8531e-12], [0.595, 6.8053e-12], [0.6, 4.2263e-12], [0.605, 2.2149e-12], [0.61, 8.3599e-13], [0.615, 1.1726e-13], [0.62, 4.7925e-14], [0.625, 5.7942e-13], [0.63, 1.6282e-12], [0.635, 3.0806e-12], [0.64, 4.7998e-12], [0.645, 6.6342e-12], [0.65, 8.427e-12], [0.655, 1.0027e-11], [0.66, 1.1299e-11], [0.665, 1.2134e-11], [0.67, 1.2457e-11], [0.675, 1.2238e-11], [0.68, 1.149e-11], [0.685, 1.0273e-11], [0.69, 8.6921e-12], [0.695, 6.8868e-12], [0.7, 5.0216e-12], [0.705, 3.2687e-12], [0.71, 1.7899e-12], [0.715, 7.1516e-13], [0.72, 1.2194e-13], [0.725, 1.7097e-14], [0.73, 3.2524e-13], [0.735, 8.8797e-13], [0.74, 1.4795e-12], [0.745, 1.8452e-12], [0.75, 1.7715e-12], [0.755, 1.1944e-12], [0.76, 3.5914e-13], [0.765, 3.9411e-14], [0.77, 1.8305e-12], [0.775, 8.5281e-12], [0.78, 2.4606e-11], [0.785, 5.6808e-11], [0.79, 1.1487e-10], [0.795, 2.1235e-10], [0.8, 3.677e-10], [0.805, 6.0535e-10], [0.81, 9.571e-10], [0.815, 1.4636e-09], [0.82, 2.176e-09], [0.825, 3.1577e-09], [0.83, 4.4865e-09], [0.835, 6.2564e-09], [0.84, 8.5795e-09], [0.845, 1.1589e-08], [0.85, 1.5439e-08], [0.855, 2.0309e-08], [0.86, 2.6402e-08], [0.865, 3.395e-08], [0.87, 4.3209e-08], [0.875, 5.4459e-08], [0.88, 6.8004e-08], [0.885, 8.4167e-08], [0.89, 1.0328e-07], [0.895, 1.2568e-07], [0.9, 1.517e-07], [0.905, 1.8163e-07], [0.91, 2.1574e-07], [0.915, 2.5419e-07], [0.92, 2.9706e-07], [0.925, 3.4426e-07], [0.93, 3.9549e-07], [0.935, 4.5021e-07], [0.94, 5.075e-07], [0.945, 5.6601e-07], [0.95, 6.2383e-07], [0.955, 6.7839e-07], [0.96, 7.2625e-07], [0.965, 7.6294e-07], [0.97, 7.8279e-07], [0.975, 7.7859e-07], [0.98, 7.4137e-07], [0.985, 6.6004e-07], [0.99, 5.2099e-07], [0.995, 3.0766e-07], [1.0, 0.0]], "Gam4": 1.935e-08, "Gam5": 2.1451e-07, "cstar": 4.1317e-09, "hmax": 7.8445e-07};
const GRP78 = {"labels": [512, 256, 256], "ranks": [34, 21, 34]};
/* ---- film 078 helpers ---- */
const X78 = (Math.sqrt(5) - 1) / 2;
/* a bit string as a row of cells; hl maps index -> colour */
function bits78(x, y, s, cw, a, col = C.cyan, hl = {}, size = 20) { cells64(x, y, s, cw, a, col, hl, size); }
/* log10 bar chart: values v, labels, max exponent */
function logBars78(x0, y0, v, bw, gap, hpd, a, col, labs, top) {
  if (a <= 0) return;
  v.forEach((val, i) => {
    const xx = x0 + i * (bw + gap), h = Math.max(4, Math.log10(Math.max(val, 1)) * hpd + 6);
    fillBox(xx, y0 - h, bw, h, col, a * 0.45); rect63(xx, y0 - h, bw, h, col, a, 1.6);
    if (labs) lbl(labs[i], xx + bw / 2, y0 + 26, C.dim, a, 16);
    if (top) lbl(top[i], xx + bw / 2, y0 - h - 12, C.white, a, 16);
  });
  line(x0 - 10, y0, x0 + v.length * (bw + gap), y0, C.dim, a, 1.4);
}
/* unit circle with tenth roots of unity */
function roots78(cx, cy, r, a, marks) {
  if (a <= 0) return;
  ring(cx, cy, r, C.dim, a * 0.7, 1.6);
  for (let k = 0; k < 10; k++) { const th = k * Math.PI / 5; line(cx + (r - 8) * Math.cos(th), cy - (r - 8) * Math.sin(th), cx + (r + 8) * Math.cos(th), cy - (r + 8) * Math.sin(th), C.dim, a, 1.4); }
  (marks || []).forEach(([k, col, lab, rr, q]) => { const th = k * Math.PI / 5, qq = a * (q == null ? 1 : q); dot(cx + r * Math.cos(th), cy - r * Math.sin(th), rr || 11, col, qq); if (lab) lblG(lab, cx + (r + 44) * Math.cos(th), cy - (r + 44) * Math.sin(th) + 8, col === 'r' ? C.red : col === 'g' ? C.gold : col === 'm' ? C.mag : C.cyan, qq, 20); });
}
/* program strip: list of [label, colour] */
function prog78(x, y, items, cw, a, size = 18) {
  if (a <= 0) return;
  items.forEach(([s, col], i) => { const xx = x + i * (cw + 12); box(xx, y, cw, 52, col, a, 2, 'rgba(0,0,0,0.5)'); lblG(s, xx + cw / 2, y + 34, col, a, size); if (i < items.length - 1) arrow(xx + cw + 1, y + 26, xx + cw + 11, y + 26, C.dim, a, 2); });
}
function grid78(x, y, n, cs, a, f) {
  if (a <= 0) return;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const c = f(i, j); if (c) fillBox(x + j * cs, y + i * cs, cs - 2, cs - 2, c[0], a * c[1]); }
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  const st = '1000100010';
  for (let i = 0; i < 10; i++) {
    const hl = { 0: C.gold, 4: C.gold, 8: C.gold };
    box(140 + i * 74, 470, 64, 64, hl[i] || C.cyan, s0, 2, 'rgba(0,0,0,0.5)');
    lbl(st[i], 172 + i * 74, 512, hl[i] || C.cyan, s0, 28);
    lbl(['b₋₁', 'b₀', 'b₁', 'b₂', 'b₃', 'b₄', 'b₅', 'b₆', 'b₇', 'b₈'][i], 172 + i * 74, 565, C.dim, s0, 15);
  }
  for (let j = 0; j < 7; j++) {
    const q = Q(S, 0, 'seven fixed golden gates', 0.6, j * 0.08), xx = 140 + j * 74, yy = 440 - (j % 2) * 34;
    line(xx + 6, yy, xx + 216, yy, C.mag, q, 2.5); line(xx + 6, yy, xx + 6, yy + 12, C.mag, q, 2.5); line(xx + 216, yy, xx + 216, yy + 12, C.mag, q, 2.5);
    lbl('K' + ['₀', '₁', '₂', '₃', '₄', '₅', '₆'][j], xx + 111, yy - 10, C.mag, q, 17);
  }
  lblG('K = ζ[I + (ζ − 1)P] ,  ζ = e^(3πi/5) ,  x = 1/φ', 510, 650, C.white, Q(S, 0, 'seven fixed golden gates', 0.6, 0.6), 22);
  const items = [['ten sites', 'TEN SITES · SEVEN GATES', 'three-site windows b₍ⱼ₋₁₎ b_j b₍ⱼ₊₁₎', C.mag], ['one starting string', 'ONE STARTING STRING', 'v = |1000100010⟩', C.gold], ['the whole thirteen-dimensional sector', 'THE WHOLE SECTOR', 'dim H = 13 , not a four-dimensional code', C.cyan], ['what forces the readout to be Born', 'WHICH PRINCIPLE GIVES BORN ?', 'P_w(ψ) = |ψ_w|²  for all 1024 labels ?', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(1010, 215 + i * 150, 800, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1410, 255 + i * 150, col, q, 21); lblG(s, 1410, 305 + i * 150, C.white, q, 25); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cs = 22, gx = W / 2 - 13 * cs / 2, gy = 215;
  grid78(gx, gy, 13, cs, rp, (i, j) => { const ph = 0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.5 + j * 0.37); return i === j ? [C.gold, 0.75] : [C.cyan, 0.12 + 0.25 * ph]; });
  lbl('13 × 13 = 169', W / 2, gy + 13 * cs + 34, C.gold, rp, 22);
  chip(370, 300, 420, 58, '13 paths · V₈^1', C.cyan, rp, 22); chip(370, 385, 420, 58, 'rank 169 · not 8281', C.gold, rp, 22); chip(370, 470, 420, 58, 'a₃ + x²a₁ = a₀ + x²a₂', C.mag, rp, 22);
  chip(1550, 300, 420, 58, 'square root is sharp', C.green, rp, 22); chip(1550, 385, 420, 58, 'a , b ∉ algebraic integers', C.orange, rp, 22); chip(1550, 470, 420, 58, 'records need a rule', C.vio, rp, 22);
  txt(scramble('AURIC QP III · NATIVE RANK', rp, 478), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 量 子 原 理 第 三 部 · 原 生 预 测 秩 与 终 端 响 应', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 078 · AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION_CONTINUATION_II · §77–137', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
};

/* ---- 02 SECTOR (§77) ---- */
SCENES.sector = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'By a published density theorem', 'published']]);
  const f1 = 1 - Q(S, 1, 'Each gate is a common phase', 0.6);
  const q0 = Q(S, 0, 'exactly thirteen strings', 0.6);
  /* the 13 strings, always on the left */
  PATHS78.forEach((s, i) => {
    const qq = clamp(q0 * 1.6 - i / 16), y = 236 + i * 44;
    for (let k = 0; k < 10; k++) {
      const free = k >= 2 && k <= 6, on = s[k] === '1';
      const col = free ? (on ? C.gold : C.cyan) : C.dim;
      fillBox(150 + k * 38, y, 32, 34, col, qq * (on ? 0.55 : 0.12)); rect63(150 + k * 38, y, 32, 34, col, qq * 0.8, 1.2);
      lbl(s[k], 166 + k * 38, y + 25, on ? C.white : col, qq, 18);
    }
    if (s === '1000100010') lbl('← v', 545, y + 25, C.gold, qq, 18, 'left');
    if (s === '1000000010') lbl('← u', 545, y + 25, C.mag, qq, 18, 'left');
  });
  const fq = Q(S, 0, 'five free sites with no two neighbours both one', 0.6);
  box(222, 222, 196, 590, C.gold, fq, 2); lbl('five free sites , no 11', 320, 838, C.gold, fq, 17);
  if (f1 > 0) {
    const hq = Q(S, 0, 'exactly thirteen strings', 0.6, 0.4) * f1;
    chip(1260, 250, 1000, 58, 'H = span{ e_β = |10 β 010⟩ : β ∈ {0,1}⁵ , no 11 } ,  dim H = 13', C.gold, hq, 20);
    const aq = Q(S, 0, 'vacuum paths of eight Fibonacci anyons', 0.6) * f1;
    /* path picture for v: x_k in {1, tau}, k = 0..8 */
    const px = 760, py = 560, sx = 120;
    const pv = '1000100010'.slice(0, 9).split('').map(b => b === '1');
    lbl('x₀ … x₈  for  v :  x_(j+1) = 1  ⇔  b_j = 1', 1240, 345, C.white, aq, 20);
    for (let k = 0; k <= 8; k++) {
      const yy = pv[k] ? py - 150 : py; dot(px + k * sx, yy, 11, pv[k] ? 'g' : 'c', aq);
      lbl(pv[k] ? '1' : 'τ', px + k * sx, yy - 22, pv[k] ? C.gold : C.cyan, aq, 18);
      if (k < 8) { const y2 = pv[k + 1] ? py - 150 : py; line(px + k * sx, yy, px + (k + 1) * sx, y2, C.dim, aq, 2); }
    }
    lbl('1 level', px - 60, py - 145, C.gold, aq, 15, 'right'); lbl('τ level', px - 60, py + 5, C.cyan, aq, 15, 'right');
    chip(1260, 680, 900, 58, 'τ ⊗ τ = 1 ⊕ τ  :  the only forbidden step is 1 → 1', C.cyan, aq, 21);
    lbl('13 = (φ⁷ − (−1/φ)⁷)/√5 = dim V₀,₁,₈ = dim V₈^1', 1260, 760, C.dim, aq, 18);
  }
  const q1 = Q(S, 1, 'Each gate is a common phase', 0.6, 0.3);
  if (q1 > 0) {
    chip(1260, 270, 1000, 62, 'K₍ᵢ₋₁₎|_H = e^(iπ/5) · ρ_[4,4](σᵢ) ,  i = 1 … 7', C.gold, q1, 24);
    lbl('ρ(σᵢ) = qI − (1 + q)Eᵢ ,  q = e^(2πi/5) ,  Eᵢ = Jones–Wenzl projection on Young tableaux [4,4]', 1260, 330, C.dim, q1, 15);
    /* eight anyons and a crossing */
    const bq = Q(S, 1, 'times a Jones braid generator', 0.6);
    for (let k = 0; k < 8; k++) {
      const xx = 860 + k * 110;
      if (k === 2 || k === 3) continue;
      line(xx, 400, xx, 560, C.cyan, bq, 3); dot(xx, 400, 10, 'c', bq);
    }
    const xa = 860 + 2 * 110, xb = xa + 110, ph = (t * 0.6) % 1;
    curve(p => [xa + (xb - xa) * (0.5 - 0.5 * Math.cos(Math.PI * p)), 400 + 160 * p], 30, C.gold, bq, 3.5);
    ctx.save(); ctx.globalCompositeOperation = 'source-over'; fillBox(xa + 40, 470, 30, 22, '#02030a', bq * 0.9); ctx.restore();
    curve(p => [xb - (xb - xa) * (0.5 - 0.5 * Math.cos(Math.PI * p)), 400 + 160 * p], 30, C.mag, bq, 3.5);
    dot(xa, 400, 10, 'g', bq); dot(xb, 400, 10, 'm', bq);
    lbl('σ₃', (xa + xb) / 2, 600, C.gold, bq, 20); lbl('eight τ anyons , total charge vacuum', 1245, 380, C.dim, bq, 15);
    const dq = Q(S, 1, 'By a published density theorem', 0.6);
    chip(1260, 670, 1000, 60, 'closure of { K_p } = PU(13) ,  closure of { [K_p v] } = ℂP¹²', C.green, dq, 23);
    lbl('Freedman–Larsen–Wang , math/0103200 , Theorem 0.1 : r = 5 , n = 8 , sector [4,4]', 1260, 735, C.cyan, dq, 16);
    lbl('K⁻¹ = K⁹ : inverses are forward words', 1260, 772, C.dim, dq, 16);
  }
};

/* ---- 03 RANK (§78–79) ---- */
SCENES.rank = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So for a continuous readout', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Set every preparation word against every continuation and label', 0.6) * f1;
    chip(530, 255, 860, 60, 'H_P(p ; (f, w)) = P_w(K_f K_p v)', C.gold, q, 25);
    const gx = 200, gy = 320, cs = 15;
    for (let i = 0; i < 22; i++) for (let j = 0; j < 40; j++) { const val = 0.5 + 0.5 * Math.sin(i * 1.7 + j * 0.9 + 0.3 * Math.sin(i * j)); fillBox(gx + j * cs, gy + i * cs, cs - 2, cs - 2, C.cyan, q * (0.08 + 0.4 * val * val)); }
    lbl('rows : preparation words p', gx - 20, gy + 170, C.dim, q, 15, 'right');
    lbl('columns : continuation f , label w ∈ {0,1}¹⁰', gx + 300, gy + 22 * cs + 28, C.dim, q, 15);
    const rq = Q(S, 0, 'is the dimension of a ray-function space', 0.6) * f1;
    chip(530, 720, 860, 58, 'r(P) = rank H_P = dim V_P ,  V_P ⊂ C(ℂP¹²)', C.white, rq, 23);
    const bq = Q(S, 0, 'built from irreducible blocks', 0.6) * f1;
    lbl('irreducible blocks H_j , dimension D_j (log scale)', 1400, 255, C.cyan, bq, 18);
    logBars78(1080, 700, DJ78.slice(0, 4), 120, 50, 70, bq, C.cyan, ['D₀', 'D₁', 'D₂', 'D₃'], DJ78.slice(0, 4).map(String));
    lblG('D_j = C(12+j, j)² − C(11+j, j−1)²', 1400, 770, C.white, bq, 20);
    lbl('H₁ = { ⟨ψ, Aψ⟩ : tr A = 0 }', 1400, 805, C.dim, bq, 16);
  }
  const q = Q(S, 1, 'So for a continuous readout', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 60, 'r(P) < 1 + D₂ = 8113  and  P_w(e_β) = δ_(w, 10β010)', C.gold, q, 22);
    const bq = Q(S, 1, 'every label follows Born', 0.6);
    chip(530, 340, 860, 64, '⇒  P_w(ψ) = |ψ_w|²  for all ψ and all 1024 labels', C.green, bq, 25);
    lbl('V_P = H₀ ⊕ H₁ ⇒ P_w = ⟨ψ, E_w ψ⟩ , E_w ≥ 0 ; zero diagonals kill rows and columns', 530, 400, C.dim, bq, 15);
    const uq = Q(S, 1, 'while the uncalibrated uniform readout has rank one', 0.6);
    box(150, 470, 760, 170, C.red, uq, 2, 'rgba(40,0,10,0.35)');
    lbl('P_w ≡ 1/1024 : continuous , normalised , rank 1', 530, 525, C.red, uq, 20);
    lbl('but not Born : the calibration is a separate premise', 530, 575, C.white, uq, 18);
    lbl('(Proposition 79.3)', 530, 615, C.dim, uq, 15);
    const pq = Q(S, 1, 'every label follows Born', 0.8, 0.5);
    const px = 1060, py = 780, pw = 700, ph = 470, xS = k => px + k / 200 * pw, yS = l => py - (l + 16) / 18 * ph;
    plotAxes(px, py, pw, ph, pq, 'singular value index (520 words × 585 columns)', 'log₁₀ σ_k  , Born response');
    for (let k = 0; k < BSV78.length; k++) { const qq = clamp(pq * 1.5 - k / 260); dot(xS(k), yS(BSV78[k]), 4.5, k < 169 ? 'c' : 'r', qq); }
    dashed(xS(169), py, xS(169), py - ph, C.gold, pq, 2); lbl('k = 169', xS(169) + 8, py - ph / 2, C.gold, pq, 18, 'left');
    lbl('σ₁₇₀ / σ₁ ≈ 10⁻¹⁵ : round-off', xS(176), yS(-13.2), C.red, pq, 15, 'left');
    stamp('BORN RANK = 169', 530, 735, Q(S, 1, 'rank exactly one hundred sixty-nine', 0.6, 0.6), C.green, 30, -0.04);
  }
};

/* ---- 04 UNBOUNDED (§80–82) ---- */
SCENES.unbounded = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Every old calibration still holds', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Add lambda times q u q v to label u', 0.6) * f1;
    chip(530, 260, 860, 60, 'P_u = q_u + λ q_u q_v ,   P_v = q_v − λ q_u q_v', C.gold, q, 24);
    lbl('q_w = |ψ_w|² ; all other labels unchanged ; 0 < λ < 1', 530, 318, C.dim, q, 16);
    const rq = Q(S, 0, 'the rank becomes eight thousand two hundred eighty-one', 0.6) * f1;
    chip(530, 400, 860, 62, 'r(P^λ) = 8281 = 91² = 1 + 168 + 8112', C.green, rq, 26);
    lbl('recomputed : 8281 independent native columns on Sym² H (dim 91)', 530, 460, C.dim, rq, 15);
    const pq = Q(S, 0, 'higher powers of q u push it past every bound', 0.6) * f1;
    chip(530, 560, 860, 58, 'h_m = λ q_u^(m−1) q_v :  169 + D_m ≤ r ≤ C(12+m, m)²', C.mag, pq, 21);
    lbl('K₃v : deviation λ x^(m+1) > 0 for every m ≥ 2', 530, 615, C.dim, pq, 16);
    if (f1 > 0.98) stamp('NO UNIFORM RANK BOUND', 530, 715, pq, C.red, 30, -0.04);
    lbl('rank bounds for the power family (log scale)', 1400, 255, C.mag, pq, 18);
    const vals = [], labs = [], tops = [];
    FAM78.forEach(r => { vals.push(r[1]); labs.push('m=' + r[0]); tops.push(r[1] >= 1e6 ? (r[1] / 1e6).toFixed(1) + 'M' : r[1] >= 1e4 ? Math.round(r[1] / 1e3) + 'k' : String(r[1])); });
    logBars78(1090, 760, vals, 90, 44, 52, pq, C.mag, labs, tops);
    lbl('lower bound 169 + D_m → ∞', 1400, 810, C.white, pq, 16);
    if (rq > 0) { const sx = 1100, sy = 640, qa = rq * (1 - pq); plotAxes(sx, sy, 640, 300, qa, 'index k (every 90th)', 'log₁₀ σ_k , quartic λ = 1/2'); for (let k = 0; k < QSV78.length; k++) dot(sx + 10 + k * 6.6, sy - (QSV78[k] + 3) * 55, 4, 'g', qa); dashed(sx, sy - 0.76 * 55, sx + 640, sy - 0.76 * 55, C.dim, qa, 1.2); lbl('all ' + QRANK78 + ' singular values > 5 × 10⁻³ : full rank on F₂', 1420, 700, C.green, qa, 16); }
  }
  const q = Q(S, 1, 'Every old calibration still holds', 0.6, 0.3);
  if (q > 0) {
    lbl('basis readings · code S₄ calibration · Alice marginals : all kept', 530, 260, C.cyan, q, 18);
    const tq = Q(S, 1, 'stays within lambda over four of Born in total variation', 0.6);
    chip(530, 340, 860, 62, 'TV(P^λ(ψ), |ψ|²) = λ q_u q_v ≤ λ/4', C.gold, tq, 25);
    const nx = 170, nw = 720, ny = 540, xS = v => nx + (v - 0.2) / 0.05 * nw;
    line(nx, ny, nx + nw, ny, C.dim, tq, 2);
    [[0.2, '0.20'], [0.225, '0.225'], [0.25, '1/4']].forEach(([v, s]) => { line(xS(v), ny - 8, xS(v), ny + 8, C.dim, tq, 2); lbl(s, xS(v), ny + 34, C.dim, tq, 16); });
    lbl('q_u q_v on native words (zoom 0.20 … 0.25)', nx, ny - 75, C.white, tq, 16, 'left');
    dot(xS(X78 ** 3), ny, 10, 'c', tq); lbl('K₃v : x³ = 0.2361', xS(X78 ** 3), ny - 24, C.cyan, tq, 15);
    dot(xS(TVBEST78), ny, 10, 'g', tq); lbl(TVBEST78.toFixed(4) + ' : 333444333333', xS(TVBEST78), ny + 62, C.gold, tq, 15);
    ring(xS(0.25), ny, 12, C.red, tq, 2.5); lbl('never reached', xS(0.25), ny - 24, C.red, tq, 15);
    const aq = Q(S, 1, 'squared amplitudes are algebraic integers', 0.6);
    chip(530, 690, 860, 58, 'q ∈ ℤ[ζ, y] ∩ ℚ ⇒ q ∈ ℤ ,  so q_u , q_v ≠ 1/2', C.mag, aq, 22);
    lbl('sup = λ/4 is approached by finite words , never attained', 530, 748, C.dim, aq, 16);
    const sq = Q(S, 1, 'No finite word reaches that supremum', 0.6);
    const px = 1080, py = 760, pw = 680, ph = 360;
    plotAxes(px, py, pw, ph, sq, 'λ', 'TV distance  vs  rank');
    const xL = l => px + l * pw, yT = v => py - v / 0.3 * ph;
    curve(p => [xL(p), yT(p / 4)], 40, C.gold, sq, 3); lbl('sup TV = λ/4', xL(0.95), yT(0.24) - 14, C.gold, sq, 16, 'right');
    line(xL(0.02), yT(0.27), xL(1), yT(0.27), C.green, sq, 3); lbl('rank 8281 for every λ > 0', xL(0.5), yT(0.27) - 14, C.green, sq, 16);
    dot(xL(0), yT(0), 9, 'c', sq); lbl('λ = 0 : Born , rank 169', xL(0.03), yT(0.02) - 18, C.cyan, sq, 15, 'left');
    stamp('CLOSE IN TV , FAR IN RANK', 1420, 300, Q(S, 1, 'so none equals one half', 0.6, 0.4), C.red, 26, -0.04);
  }
};

/* ---- 05 CLOCK (§85–86) ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So, over all contexts, these are equivalent', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Gate zero has eigenvalue zeta on eight paths', 0.6) * f1;
    chip(530, 260, 860, 60, 'K₀|_H = ζ[(I − Π) + ζΠ] ,  rank Π = 5 ,  dim ker Π = 8', C.gold, q, 22);
    lbl('Π = n_(b₁) : the five paths with b₁ = 1', 530, 318, C.dim, q, 16);
    const cq = Q(S, 0, 'Quadratic readouts see only one, zeta and its inverse', 0.6) * f1;
    const hq = Q(S, 0, 'every higher harmonic block contains zeta squared', 0.6) * f1;
    roots78(530, 560, 150, q, [[3, 'c', 'ζ ×8', 12], [6, 'g', 'ζ² ×5', 12]]);
    lbl('eigenvalues of K₀', 530, 775, C.dim, q, 16);
    const rx = 1400, ry = 490;
    roots78(rx, ry, 140, cq, [[0, 'c', '1', 13, cq], [3, 'c', 'ζ', 13, cq], [-3, 'c', 'ζ⁻¹', 13, cq], [6, 'r', 'ζ²', 14, hq]]);
    lbl('relative phases seen by K₀ pull-back', rx, 270, C.white, cq, 18);
    lbl('quadratic forms : 1 , ζ , ζ⁻¹ only', rx, 740, C.cyan, cq, 18);
    chip(rx, 800, 760, 50, 'Y_j = z_a² z_b^(j−2) z̄_c^j ∈ H_j :  Y_j ∘ K₀ = ζ² Y_j', C.red, hq, 19);
  }
  const q = Q(S, 1, 'So, over all contexts, these are equivalent', 0.6, 0.3);
  if (q > 0) {
    const bx = [[330, 'T₁₀ : (1/10) Σ ζ^(−2t) a_t = 0', C.cyan, 'the ten-step average at zeta squared vanishes'], [960, 'T₄ : a₃ + x²a₁ = a₀ + x²a₂', C.gold, 'equals a zero, plus x squared a two'], [1590, 'P_w(ψ) = ⟨ψ, E_w ψ⟩', C.mag, 'the readout is a quadratic form']];
    bx.forEach(([x, s, col, ph], i) => { const qq = Q(S, 1, ph, 0.6); box(x - 290, 270, 580, 120, col, qq, 2, 'rgba(0,0,0,0.5)'); lblG(s, x, 343, C.white, qq, 23); if (i < 2) lbl('⇔', x + 315, 345, C.white, Q(S, 1, bx[i + 1][3], 0.6), 34); });
    lbl('a_t(p, f, w) = P_w(K_f K₀^t K_p v) , for every finite forward p , f and every label w', 960, 430, C.dim, q, 17);
    const rq = Q(S, 1, 'equals a zero, plus x squared a two', 0.6);
    chip(960, 520, 980, 60, 'R(s) = s³ − x²s² + x²s − 1 = (s − 1)(s − ζ)(s − ζ⁻¹) ,  R(ζ²) ≠ 0', C.gold, rq, 21);
    const cq = Q(S, 1, 'With calibration this is Born', 0.6);
    chip(960, 625, 980, 62, '+ basis calibration  ⇒  P_w(ψ) = |ψ_w|²', C.green, cq, 26);
    lbl('Stone–Weierstrass completeness of ⊕ H_j , then each block j ≥ 2 is killed separately', 960, 690, C.dim, cq, 16);
    stamp('NO RANK ASSUMED', 960, 780, Q(S, 1, 'with no rank assumed', 0.6), C.green, 30, -0.03);
  }
};

/* ---- 06 WITNESS (§87) ---- */
SCENES.witness = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'Call gates three and one', 0.6);
  prog78(160, 250, [['v', C.dim], ['K₃', C.cyan], ['K₁', C.cyan], ['K₀^t', C.gold], ['K₁', C.cyan], ['read u', C.mag]], 112, q, 20);
  lbl('p = 31 ,  f = 1 ,  w = u = |1000000010⟩', 530, 345, C.dim, q, 16);
  const dq = Q(S, 0, 'The return factor d t runs', 0.6);
  const wf = 1 - Q(S, 1, 'Born passes both tests exactly', 0.6);
  const pq0 = Q(S, 0, 'and read label u', 0.6);
  lblG('d_t = |A² + ζ^t B²|² ,  q_u = x d_t ,  q_v = x² d_t', 530, 405, C.white, dq, 21);
  const labs = ['x⁴', 'x²', '1', 'x²'];
  for (let k = 0; k < 4; k++) { const qq = clamp(dq * 2 - k * 0.25) * wf, h = WIT78.d[k] * 230, xx = 230 + k * 160; fillBox(xx, 680 - h, 90, h, C.gold, qq * 0.45); rect63(xx, 680 - h, 90, h, C.gold, qq, 1.8); lbl(labs[k], xx + 45, 680 - h - 14, C.white, qq, 20); lbl('t=' + k, xx + 45, 708, C.dim, qq, 16); lbl(WIT78.d[k].toFixed(4), xx + 45, 735, C.dim, qq, 14); }
  line(210, 680, 870, 680, C.dim, dq * wf, 1.4);
  const pq = Q(S, 1, 'Born passes both tests exactly', 0.6);
  const px = 1060, py = 690, pw = 700, ph = 400, xS = k => px + 30 + k * 70, yS = v => py - v / 0.8 * ph;
  plotAxes(px, py, pw, ph, Math.max(pq0, pq), 't = 0 … 9 calls of K₀', 'a_t(31, 1, u)');
  for (let k = 0; k < 10; k++) { lbl(String(k), xS(k), py + 26, C.dim, Math.max(pq0, pq), 14); dot(xS(k), yS(WIT78.born[k]), 8, 'c', clamp(Math.max(pq0, pq) * 2 - k / 12)); }
  curve(p => { const k = p * 9, i = Math.min(8, Math.floor(k)), f = k - i; return [xS(k), yS(WIT78.born[i] * (1 - f) + WIT78.born[i + 1] * f)]; }, 90, C.cyan, Math.max(pq0, pq) * 0.6, 2);
  lbl('Born : x d_t', px + pw, py - ph + 10, C.cyan, Math.max(pq0, pq), 16, 'right');
  const mq = Q(S, 1, 'The quartic model leaves', 0.6);
  for (let k = 0; k < 10; k++) dot(xS(k), yS(WIT78.quart[k]), 8, 'm', clamp(mq * 2 - k / 12));
  curve(p => { const k = p * 9, i = Math.min(8, Math.floor(k)), f = k - i; return [xS(k), yS(WIT78.quart[i] * (1 - f) + WIT78.quart[i + 1] * f)]; }, 90, C.mag, mq * 0.6, 2);
  lbl('quartic , λ = 1/2', px + pw, py - ph + 36, C.mag, mq, 16, 'right');
  chip(1410, 760, 700, 50, 'Born : both residuals exactly 0', C.cyan, pq, 19);
  const tq = Q(S, 1, 'a ten-step residual of size lambda x to the ninth', 0.6);
  chip(530, 470, 860, 56, 'T₁₀ residual = λ x⁹ ζ⁶ ,  |·| = ' + WIT78.ten.toFixed(4) + ' λ', C.mag, tq, 21);
  const fq = Q(S, 1, 'a four-time residual of minus lambda', 0.6);
  chip(530, 545, 860, 56, 'T₄ residual = −λ(1 + 2x)x⁸ = ' + WIT78.four.toFixed(4) + ' λ', C.mag, fq, 21);
  lbl('≤ 12 calls for the ten-point test , ≤ 6 for the four-time test', 530, 620, C.dim, Q(S, 1, 'with at most twelve and six calls', 0.6), 16);
  stamp('EVERY λ > 0 REFUTED', 530, 720, Q(S, 1, 'with at most twelve and six calls', 0.6, 0.4), C.red, 28, -0.04);
};

/* ---- 07 STABLE (§90, §96, §116) ---- */
SCENES.stable = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'The best deviation over root epsilon lies between one and root phi', 'open']]);
  const f1 = 1 - Q(S, 1, 'The square root is sharp', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'If the four-time residual is at most epsilon in every context', 0.6) * f1;
    chip(530, 260, 860, 60, 'R(P) = sup over p , f , w of |a₃ + x²a₁ − a₀ − x²a₂|  ≤  ε', C.gold, q, 20);
    lbl('every finite forward p , f ; all 1024 labels ; continuous , calibrated P', 530, 318, C.dim, q, 16);
    const oq = Q(S, 0, 'the readout stays within omega of epsilon of Born', 0.6) * f1;
    chip(530, 420, 860, 62, 'D(P) = sup |P_w(ψ) − |ψ_w|²|  ≤  ω(ε)', C.green, oq, 24);
    chip(530, 520, 860, 58, 'ω(ε) = min{ 1 , 2C₀ε + 12√(6C₀ε) } → 0', C.white, Q(S, 0, 'a bound built from epsilon and its square root', 0.6) * f1, 22);
    lbl('C₀ finite , depends only on the source ; no numerical value is given', 530, 580, C.dim, oq, 15);
    lbl('compact operator B = aI + K , a = 2 + 2x⁴ ; ker B = Hermitian forms (169)', 530, 615, C.dim, oq, 15);
    const px = 1080, py = 760, pw = 680, ph = 440;
    plotAxes(px, py, pw, ph, oq, 'ε', 'ω(ε)  (shape only , C₀ not computed)');
    curve(p => { const e = p; return [px + p * pw, py - Math.min(1, 0.4 * e + 1.1 * Math.sqrt(0.4 * e)) * ph * 0.92]; }, 60, C.green, oq, 3);
    lbl('√ε behaviour near 0', px + 160, py - 300, C.green, oq, 16, 'left');
  }
  const q = Q(S, 1, 'The square root is sharp', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 58, 'P^θ : rotate e_a , e_b by t = θ/16 , threshold at d = t²/(1+t²)', C.gold, q, 20);
    const rq = Q(S, 1, 'has residual below fifty-two over two hundred forty-three theta squared', 0.6);
    chip(530, 340, 860, 58, 'R(P^θ) ≤ (52/243) θ²  <  θ²', C.cyan, rq, 24);
    const dq = Q(S, 1, 'yet deviation at least theta over sixteen', 0.6);
    chip(530, 420, 860, 58, 'D(P^θ) ≥ t/(1 − t²) ≥ θ/16  at  ψ₊ = (e_a + e_b)/√2', C.mag, dq, 21);
    lbl('so ε = θ² gives deviation ≥ √ε / 16 : no o(√ε) modulus', 530, 478, C.dim, dq, 16);
    const bq = Q(S, 1, 'lies between one and root phi', 0.6);
    const nx = 190, nw = 680, ny = 640, xS = v => nx + (v - 0.8) / 0.6 * nw;
    line(nx, ny, nx + nw, ny, C.dim, bq, 2);
    [0.8, 1, 1.2, 1.4].forEach(v => { line(xS(v), ny - 8, xS(v), ny + 8, C.dim, bq, 2); lbl(v.toFixed(1), xS(v), ny + 32, C.dim, bq, 15); });
    fillBox(xS(1), ny - 18, xS(Math.sqrt(1.618034)) - xS(1), 36, C.vio, bq * 0.35); rect63(xS(1), ny - 18, xS(Math.sqrt(1.618034)) - xS(1), 36, C.vio, bq, 2);
    lbl('1 ≤ lim inf M(ε)/√ε ≤ lim sup ≤ √φ = 1.2720', 530, ny - 40, C.vio, bq, 19);
    lbl('exact limit : open', 530, ny + 70, C.vio, bq, 18);
    const px = 1080, py = 760, pw = 680, ph = 440, xT = th => px + th * pw, yV = v => py - v / 0.24 * ph;
    plotAxes(px, py, pw, ph, rq, 'θ', 'residual (dots : sampled sup)  ·  deviation');
    curve(p => [xT(p), yV(52 / 243 * p * p)], 50, C.cyan, rq, 3); lbl('(52/243) θ²', xT(0.97), yV(0.205) - 14, C.cyan, rq, 16, 'right');
    SHARPR78.forEach(r => dot(xT(r[0]), yV(r[1]), 8, 'c', rq));
    curve(p => { const tt = p / 16; return [xT(p), yV(tt / (1 - tt * tt))]; }, 50, C.mag, dq, 3);
    curve(p => [xT(p), yV(p / 16)], 50, C.mag, dq * 0.6, 1.5);
    SHARPR78.forEach(r => dot(xT(r[0]), yV(r[3]), 8, 'm', dq));
    lbl('deviation t/(1−t²) ≥ θ/16', xT(0.97), yV(0.0627) - 22, C.mag, dq, 16, 'right');
  }
};

/* ---- 08 WEIGHTS (§91–94) ---- */
SCENES.weights = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'But no finite circuit of golden gates', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a fixed isometry and one record rotation', 0.6) * f1;
    chip(530, 260, 860, 58, 'V η = √a D³η ⊗ |0⟩ + √b Dη ⊗ |1⟩ ,  D = K₀/ζ', C.gold, q, 22);
    chip(530, 340, 860, 58, '(I ⊗ ⟨i|T) V = √rᵢ D^(t₁ᵢ) :  times (0, 2) ;  setting 0 : (3, 1)', C.cyan, q, 19);
    box(150, 400, 760, 230, C.dim, q, 1.5, 'rgba(0,0,0,0.35)');
    lbl('one preparation , two readings of the record', 530, 435, C.white, q, 18);
    lblG('setting 0 :  a ρ₃ + b ρ₁', 340, 500, C.cyan, q, 22); lblG('setting 1 :  a ρ₀ + b ρ₂', 720, 500, C.cyan, q, 22);
    lblG('same channel Φ  :  a ρ₃ + b ρ₁ = a ρ₀ + b ρ₂', 530, 570, C.white, q, 21);
    lbl('ρ_t = |K₀^t η⟩⟨K₀^t η| ; the identity holds as maps on all of B(H)', 530, 610, C.dim, q, 15);
    const wq = Q(S, 0, 'read record zero or one with weights a and b', 0.6) * f1;
    const bx = 1150, by = 700;
    [[WGT78.a, 'a = (5 + √5)/10', C.gold], [WGT78.b, 'b = (5 − √5)/10', C.mag]].forEach(([v, s, col], i) => { const h = v * 420; fillBox(bx + i * 280, by - h, 150, h, col, wq * 0.45); rect63(bx + i * 280, by - h, 150, h, col, wq, 2); lbl(v.toFixed(4), bx + i * 280 + 75, by - h - 14, C.white, wq, 20); lbl(s, bx + i * 280 + 75, by + 32, col, wq, 18); });
    lbl('a = 1/(1 + x²) ,  b = x²/(1 + x²) ,  ab = 1/5', 1365, 790, C.white, Q(S, 0, 'whose product is one fifth', 0.6) * f1, 19);
  }
  const q = Q(S, 1, 'But no finite circuit of golden gates', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 58, 'finite golden circuits : event probabilities ∈ ℤ[ζ, y] (algebraic integers)', C.gold, q, 18);
    const mq = Q(S, 1, 'and a and b are not', 0.6);
    chip(530, 335, 860, 58, '5a² − 5a + 1 = 0 :  minimal polynomial z² − z + 1/5', C.mag, mq, 21);
    stamp('NO EXACT EVENT OF MASS a OR b', 530, 430, mq, C.red, 24, -0.03);
    const pq = Q(S, 1, 'Postselection needs a division', 0.6);
    lbl('two copies of K₃v : masses of 00 , 01 , 10 , 11', 530, 505, C.white, pq, 17);
    const ps = WGT78.post, pl = ['x²', 'x³', 'x³', 'x⁴'];
    ps.forEach((v, i) => { const h = v * 260, xx = 230 + i * 160; const keep = i === 0 || i === 3; fillBox(xx, 790 - h, 90, h, keep ? C.gold : C.dim, pq * 0.45); rect63(xx, 790 - h, 90, h, keep ? C.gold : C.dim, pq, 1.6); lbl(pl[i], xx + 45, 790 - h - 12, C.white, pq, 17); });
    lbl('x²/(x² + x⁴) = a', 690, 600, C.gold, pq, 17, 'left');
    const aq = Q(S, 1, 'copying the time label to an archive gives three fifths and two fifths', 0.6);
    lbl('archived time labels : second reader on v', 1410, 260, C.white, aq, 18);
    const bx = 1150, by = 700;
    [[WGT78.arch[0], '3/5 = a² + b²', WGT78.a], [WGT78.arch[1], '2/5 = 2ab', WGT78.b]].forEach(([v, s, tgt], i) => { const h = v * 420; fillBox(bx + i * 280, by - h, 150, h, C.cyan, aq * 0.45); rect63(bx + i * 280, by - h, 150, h, C.cyan, aq, 2); lbl(v.toFixed(2), bx + i * 280 + 75, by - h - 14, C.white, aq, 20); lbl(s, bx + i * 280 + 75, by + 32, C.cyan, aq, 18); dashed(bx + i * 280 - 10, by - tgt * 420, bx + i * 280 + 160, by - tgt * 420, C.gold, aq, 2); });
    lbl('dashed : targets a , b ; the cross terms are lost , no mass is lost', 1410, 790, C.dim, aq, 15);
  }
};

/* ---- 09 FINITE (§97) ---- */
SCENES.finite = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'For any finite list of rays and contexts', 0.6);
  const cx = 470, cy = 510, R = 170;
  ring(cx, cy, R, C.dim, q * 0.6, 1.5); lbl('ℂP¹² (schematic)', cx, cy + R + 36, C.dim, q, 15);
  for (let i = 0; i < 40; i++) { const an = rnd(i, 3) * TAU, rr = R * Math.sqrt(rnd(i, 7)) * 0.92, qq = clamp(q * 2 - i / 50); dot(cx + rr * Math.cos(an), cy + rr * Math.sin(an), 6, 'c', qq); }
  const aq = Q(S, 0, 'agrees exactly at every query', 0.6);
  for (let i = 0; i < 40; i++) { const an = rnd(i, 3) * TAU, rr = R * Math.sqrt(rnd(i, 7)) * 0.92; lbl('✓', cx + rr * Math.cos(an) + 10, cy + rr * Math.sin(an) - 6, C.green, aq * 0.8, 12, 'left'); }
  chip(470, 265, 700, 58, 'P(z) = q(z)  at every queried ray z ∈ F', C.green, aq, 22);
  const hq = Q(S, 0, 'some non-Born polynomial readout of finite rank', 0.6);
  chip(1350, 265, 820, 58, 'h = ½ q_u q_v ∏_(ξ ∈ S) (1 − |⟨ξ, ψ⟩|^(2m))', C.gold, hq, 22);
  chip(1350, 345, 820, 54, 'P_u = q_u + h ,  P_v = q_v − h ,  others q_w', C.white, hq, 20);
  lbl('degree k = mn + 2 ⇒ r(P) ≤ C(12+k, k)² < ∞ ; calibrations , code , Alice rows kept', 1350, 400, C.dim, Q(S, 0, 'keeps every calibration', 0.6), 15);
  const pq = Q(S, 1, 'Yet on one program', 0.6);
  prog78(960, 450, [['v', C.dim], ['K₁', C.cyan], ['K₀^t', C.gold], ['f*', C.mag], ['read u', C.mag]], 120, pq, 20);
  const bq = Q(S, 1, 'all exceed one thirty-second', 0.6);
  const px = 1040, py = 760, sc = 2600;
  ['z₀', 'z₁', 'z₂', 'z₃'].forEach((s, k) => { const v = k === 3 ? FIN78.h3 : 0, h = Math.max(3, v * sc), xx = px + k * 170; fillBox(xx, py - h, 100, h, k === 3 ? C.red : C.dim, bq * 0.5); rect63(xx, py - h, 100, h, k === 3 ? C.red : C.dim, bq, 1.8); lbl(s, xx + 50, py + 28, C.dim, bq, 18); lbl(k === 3 ? v.toFixed(4) : '0', xx + 50, py - h - 12, C.white, bq, 17); });
  dashed(px - 20, py - sc / 32, px + 660, py - sc / 32, C.gold, bq, 2); lbl('1/32', px + 668, py - sc / 32 + 6, C.gold, bq, 17, 'left');
  lbl('h on the four time rays of 1 · 0^t · f*  (recomputed instance)', 1350, 560, C.white, bq, 16);
  lbl('instance : ' + FIN78.n + ' queried rays , m = ' + FIN78.m + ' , |f*| = ' + FIN78.flen, 1350, 590, C.dim, bq, 15);
  stamp('D , R , TV  >  1/32', 470, 780, Q(S, 1, 'however many queries were made', 0.6), C.red, 30, -0.04);
};

/* ---- 10 VACUUM (§100, §103) ---- */
SCENES.vacuum = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'One step stays out of reach', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'pay four more anyons', 0.6) * f1;
    chip(530, 260, 860, 58, 'J(e_β ⊗ |i⟩) = |10 β 010 i 010⟩ ∈ V₁₂^1', C.gold, q, 22);
    lbl('four extra τ anyons , ready path J(v, 0) , four new addresses 7 … 10', 530, 318, C.dim, q, 16);
    const gq = Q(S, 0, 'The carrier grows to eighty-nine paths', 0.6) * f1;
    const gx = 170, gy = 370, cs = 52;
    for (let k = 0; k < 89; k++) { const r = Math.floor(k / 15), c = k % 15, code = k < 26, qq = clamp(gq * 2 - k / 120); fillBox(gx + c * cs * 0.98, gy + r * cs * 0.98, cs * 0.86, cs * 0.86, code ? C.cyan : C.dim, qq * (code ? 0.55 : 0.25)); }
    lbl('26 code paths = 13 × 2', gx, gy + 6 * cs + 30, C.cyan, Q(S, 0, 'a twenty-six-dimensional code', 0.6) * f1, 18, 'left');
    lbl('63 leakage paths = 21 × 3', gx + 420, gy + 6 * cs + 30, C.dim, Q(S, 0, 'plus sixty-three paths of leakage', 0.6) * f1, 18, 'left');
    lbl('89 = F₁₁ = dim V₁₂^1', 1400, 260, C.white, gq, 22);
    const wq = Q(S, 0, 'Fixed finite words then approximate', 0.6) * f1;
    prog78(1000, 360, [['J(v,0)', C.dim], ['K_p', C.cyan], ['A_ε', C.gold], ['R_ε^s', C.gold], ['read b₉', C.mag], ['K_f', C.cyan]], 112, wq, 18);
    chip(1400, 500, 760, 58, '‖χ_(ε,si)(p, f) − √rᵢ J(K_f D^(t_si) K_p v, i)‖ ≤ ε_A + ε_T', C.green, wq, 18);
    lbl('one fixed pair of words for every finite p and f (Theorem 100.2)', 1400, 560, C.dim, wq, 16);
  }
  const q = Q(S, 1, 'One step stays out of reach', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, 'reduce at the prime over 5 :  ζ ↦ −1 ,  x ↦ 2   (F₅)', C.gold, q, 22);
    const mq = Q(S, 1, 'each gate becomes a transposition', 0.6);
    lbl('gauged golden block', 330, 350, C.white, mq, 17);
    cells64(250, 370, '33', 70, mq, C.gold, {}, 30); cells64(250, 440, '42', 70, mq, C.gold, {}, 30);
    lbl('scalars ζ² ↦ 1 , ζ ↦ 4', 330, 545, C.dim, mq, 16);
    chip(720, 400, 520, 52, 'rᵢ² = I ,  rᵢ rᵢ₊₁ rᵢ = rᵢ₊₁ rᵢ rᵢ₊₁', C.cyan, mq, 19);
    chip(720, 470, 520, 52, 'r : S₁₂ → O(G) ,  G = diag(2^wt)', C.cyan, mq, 19);
    lbl('tr I = 4 , tr (123) = 2 , tr (12)(34) = 0 (mod 5)', 720, 530, C.dim, mq, 15);
    const pq = Q(S, 1, 'each finite word a permutation of twelve objects', 0.6);
    for (let k = 0; k < 12; k++) { const x0 = 1080 + k * 60, x1 = 1080 + ((k * 5 + 3) % 12) * 60; dot(x0, 300, 9, 'c', pq); dot(x1, 450, 9, 'g', pq); curve(p => [x0 + (x1 - x0) * p, 300 + 150 * p], 12, C.cyan, pq * 0.6, 1.8); }
    lbl('any finite word ↦ r(σ) , σ ∈ S₁₂ (12! = 479001600)', 1410, 500, C.white, pq, 17);
    const oq = Q(S, 1, 'none gives the odd controlled phase on the whole code', 0.6);
    chip(1410, 590, 760, 58, 'U_m = (I − Π) ⊗ I + Π ⊗ diag(1, ζ^m) ,  m odd', C.mag, oq, 20);
    chip(1410, 670, 760, 58, 'W_w J ≠ α J U_m   for every finite word w', C.red, oq, 23);
    lbl('code projection E_C = I + 3Z_R ; a stabiliser of the code acts as A ⊗ B', 1410, 728, C.dim, oq, 15);
    lbl('diag entries ε(1, 1 ; 1, −1) have det 3 ≠ 0 , an outer product has det 0', 530, 640, C.dim, oq, 15);
    stamp('ODD PHASE : NEVER EXACT', 530, 740, oq, C.red, 28, -0.04);
  }
};

/* ---- 11 RECORDS (§104, §111–112) ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'One more call of gate nine adds a third reader', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With unknown record weights', 0.6) * f1;
    chip(530, 260, 860, 58, 'V ψ = y ψ ⊗ |0⟩ + x Dψ ⊗ |1⟩ ;  record masses a₀ , a₁ unknown', C.gold, q, 19);
    const bq = Q(S, 0, 'still force the old readout to be Born', 0.6) * f1;
    chip(530, 350, 860, 62, 'F = q ,  a₀ = a₁ = a ∈ (0, x]', C.green, bq, 26);
    const cq = Q(S, 0, 'while the second record reads c times Born plus a constant', 0.6) * f1;
    chip(530, 440, 860, 58, 'G = c q + d ,  c = ax/(1 − a) ∈ (0, 1] ,  d ≥ 0 , Σ d = 1 − c', C.mag, cq, 20);
    lbl('ready anchor F = P , pure successors , causal masses , setting isolation , calibration', 530, 500, C.dim, bq, 15);
    lbl('G = F  ⇔  c = 1  ⇔  a = x', 530, 560, C.white, cq, 21);
    const px = 1080, py = 760, pw = 680, ph = 440, xS = a => px + a / 0.7 * pw, yS = c => py - c / 1.15 * ph;
    plotAxes(px, py, pw, ph, bq, 'record weight a', 'c(a) = ax/(1 − a)');
    curve(p => { const i = Math.min(CFUN78.length - 2, Math.floor(p * (CFUN78.length - 1))), f = p * (CFUN78.length - 1) - i; return [xS(CFUN78[i][0] * (1 - f) + CFUN78[i + 1][0] * f), yS(CFUN78[i][1] * (1 - f) + CFUN78[i + 1][1] * f)]; }, 80, C.mag, cq, 3);
    dot(xS(X78), yS(1), 11, 'g', cq); lbl('(x , 1)', xS(X78) - 14, yS(1) - 16, C.gold, cq, 18, 'right');
    dashed(xS(X78), py, xS(X78), yS(1), C.gold, cq * 0.7, 1.5); lbl('x', xS(X78), py + 26, C.gold, cq, 16);
  }
  const q = Q(S, 1, 'One more call of gate nine adds a third reader', 0.6, 0.3);
  if (q > 0) {
    prog78(160, 250, [['J V K₁v', C.gold], ['K₉', C.mag], ['read b₉', C.mag], ['f ∈ F', C.cyan], ['w*', C.cyan]], 128, q, 18);
    lbl('readers I , K₉² , K₉ ;  F = (ε , 3 , 13 , 013 , 0013)', 530, 350, C.dim, q, 17);
    const cq = Q(S, 1, 'five fixed continuations close everything', 0.6);
    chip(530, 430, 860, 62, 'c = 1 ,  d = 0 ,  F = G = q', C.green, cq, 27);
    lbl('every surviving c < 1 , every d and every b violates one of the five equalities', 530, 490, C.dim, cq, 15);
    stamp('CLOSED', 530, 610, Q(S, 1, 'both records read Born', 0.6), C.green, 40, -0.04);
    const mq = Q(S, 1, 'and the record masses are', 0.6);
    lbl('record masses at p* = 1', 1410, 255, C.white, mq, 18);
    const labs = ['setting I', 'setting K₉²', 'setting K₉'], sym = [['x', 'x²'], ['x', 'x²'], ['x³', '1 − x³']];
    REC78.forEach((r, i) => { const qq = clamp(mq * 2 - i * 0.3), x0 = 1090 + i * 230, y0 = 720; [0, 1].forEach(k => { const h = r[k] * 380; fillBox(x0 + k * 82, y0 - h, 70, h, k ? C.mag : C.cyan, qq * 0.45); rect63(x0 + k * 82, y0 - h, 70, h, k ? C.mag : C.cyan, qq, 1.6); lbl(sym[i][k], x0 + k * 82 + 35, y0 - h - 34, C.white, qq, 16); lbl(r[k].toFixed(3), x0 + k * 82 + 35, y0 - h - 12, C.dim, qq, 14); }); lbl(labs[i], x0 + 76, y0 + 30, C.dim, qq, 15); });
    line(1070, 720, 1770, 720, C.dim, mq, 1.4);
    lbl('cyan : record 0  ·  magenta : record 1', 1410, 790, C.dim, mq, 15);
  }
};

/* ---- 12 EFFECTS (§117–127) ---- */
SCENES.effects = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'a positive additive effect assignment is a trace against one density matrix', 'lean'], [1, 'here v v star', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Three fixed label groups', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The record rule is still free', 0.6) * f1;
    chip(530, 260, 860, 58, 'm₀(χ) = g_λ(t) = t + λ h(t) ,  t = ‖M₀χ‖² ,  |λ| ≤ 1', C.gold, q, 20);
    lbl('h(t) = t(1 − t)(2t − 1) R(t)² ,  R = ∏ (t − a) over a ∈ {x, x², x³, 1 − x³, ρ, 1 − ρ}', 530, 318, C.dim, q, 14);
    const px = 160, py = 740, pw = 740, ph = 340, sc = 1 / 1.0e-6, xS = s => px + s * pw, yS = v => py - ph / 2 - v * sc * ph / 2.2;
    plotAxes(px, py, pw, ph, q, 't', 'h(t)  (× 10⁶)');
    line(px, py - ph / 2, px + pw, py - ph / 2, C.dim, q * 0.6, 1);
    curve(p => { const i = Math.min(RULE78.h.length - 2, Math.floor(p * (RULE78.h.length - 1))), f = p * (RULE78.h.length - 1) - i; return [xS(RULE78.h[i][0] * (1 - f) + RULE78.h[i + 1][0] * f), yS(RULE78.h[i][1] * (1 - f) + RULE78.h[i + 1][1] * f)]; }, 200, C.gold, q, 2.5);
    [X78, X78 ** 2, X78 ** 3, 1 - X78 ** 3, 1 / (1 + X78 * X78), 1 - 1 / (1 + X78 * X78)].forEach(a => dot(xS(a), py - ph / 2, 7, 'm', q));
    lbl('six golden nodes : g = t there', px + pw, py - ph - 10, C.mag, q, 15, 'right');
    const sq = Q(S, 0, 'yet two programs with one signature', 0.6) * f1;
    prog78(1010, 260, [['R₀v', C.dim], ['K₉ K₉', C.mag], ['b₉ = 0 ?', C.mag]], 160, sq, 18);
    prog78(1010, 340, [['R₀v', C.dim], ['K₇ K₇', C.cyan], ['b₇ = 1 ?', C.cyan]], 160, sq, 18);
    chip(1410, 450, 760, 58, 'both signatures :  R₀* K* N K R₀ = x⁴ I_H', C.white, sq, 21);
    const dq = Q(S, 0, 'differ by lambda gamma', 0.6) * f1;
    chip(1410, 540, 760, 58, 'P = g_λ(x⁴)  versus  P = x⁴', C.gold, dq, 22);
    chip(1410, 630, 760, 62, '|difference| = |λ| Γ(x⁴) ,  Γ(x⁴) = ' + RULE78.Gam4.toExponential(3).replace('e-8', ' × 10⁻⁸'), C.red, dq, 21);
    lbl('tiny but exact and positive ; finite budgets must beat it (127.2)', 1410, 695, C.dim, dq, 15);
  }
  const q = Q(S, 1, 'Three fixed label groups', 0.6, 0.3);
  if (q > 0) {
    const gl = [['b₁ = 1', 512, 34, C.cyan], ['b₁ = 0 , b₂ = 1', 256, 21, C.gold], ['b₁ = b₂ = 0', 256, 34, C.mag]];
    gl.forEach(([s, n, r, col], i) => { const x0 = 170 + i * 250, h = n * 0.5; fillBox(x0, 640 - h, 140, h, col, q * 0.45); rect63(x0, 640 - h, 140, h, col, q, 1.8); lbl(String(n) + ' labels', x0 + 70, 640 - h - 14, C.white, q, 17); lbl(s, x0 + 70, 670, col, q, 15); lbl('rank ' + r + ' on K', x0 + 70, 698, C.dim, q, 15); });
    lbl('34 + 21 + 34 = 89', 530, 740, C.dim, q, 16);
    const eq = Q(S, 1, 'reach every three-outcome effect', 0.6);
    chip(530, 265, 860, 58, 'E₀ + E₁ + E₂ = I ,  Eₖ ≥ 0  ⇒  one word a_ε :  T(a_ε) ≈ (E₀ , E₁ , E₂)', C.green, eq, 18);
    const mq = Q(S, 1, 'If equal signatures give equal probabilities', 0.6);
    chip(1410, 270, 760, 58, 'E(C_n, A_n) , E(D_n, B_n) → E  ⇒  P_C(A) − P_D(B) → 0', C.gold, mq, 18);
    lbl('an added premise (122.2) : not implied by the earlier contracts', 1410, 330, C.dim, mq, 15);
    const lq = Q(S, 1, 'a positive additive effect assignment is a trace against one density matrix', 0.6);
    chip(1410, 430, 760, 62, 'p(E) = tr(ρE) for a unique ρ ≥ 0 , tr ρ = 1', C.green, lq, 22);
    lbl('Lean : effect_density_representation (EffectProbabilityExtension , frozen)', 1410, 490, C.green, lq, 15);
    const vq = Q(S, 1, 'here v v star', 0.6);
    chip(1410, 590, 760, 66, 'ρ_H = |v⟩⟨v| ,  P_C(A) = ⟨v, E(C, A) v⟩', C.white, vq, 25);
    lbl('ready anchor + calibration fix the state ; λ ≠ 0 models break the premise', 1410, 655, C.dim, vq, 15);
    stamp('BORN , GIVEN THE MATCHING', 1410, 760, vq, C.gold, 26, -0.04);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Jones density and the ray-function classification are published inputs', 'published'], [1, 'the effect-density theorem is frozen in Lean', 'lean'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['13 PATHS', 'dense in PU(13)', C.cyan, 'Thirteen paths carry dense gates'], ['BORN', 'rank 169 · T₄', C.green, 'low rank or four times force Born'], ['QUARTIC', '8281 , TV ≤ λ/4', C.gold, 'quartic models stay close yet high in rank'], ['SHARP', '√ε , [1 , √φ]', C.mag, 'the square root is sharp'], ['OUT OF REACH', 'a , b · odd U_m', C.red, 'exact weights and odd phases stay out of reach'], ['RECORDS', 'g_λ free', C.vio, 'records still need a rule']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 130, 240, 260, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 20); });
    lbl('PUBLISHED · Jones density (Freedman–Larsen–Wang) · ray-function classification (Galley–Masanes ; Masanes–Galley–Müller)', W / 2, 470, C.cyan, Q(S, 1, 'Jones density and the ray-function classification are published inputs') * fade, 15);
    lbl('CLASSICAL · Stone–Weierstrass · Arzelà–Ascoli · Haar and Beta laws · algebraic integers · Coxeter presentation of S₁₂ · Kraus purification', W / 2, 510, '#8fbcff', Q(S, 1, 'are published inputs') * fade, 15);
    lbl('LEAN · effect_density_representation (frozen) : the full-effect trace theorem used in §123 ; the application there is on paper', W / 2, 550, C.green, Q(S, 1, 'the effect-density theorem is frozen in Lean') * fade, 15);
    lbl('VOLUME · rank rigidity · quartic 8281 · unbounded family · T₁₀ ⇔ T₄ ⇔ quadratic · stability · √ sharpness · weights · 1/32 · F₅ · records · effects', W / 2, 590, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · Jones–Wenzl match · rank 169 and 8281 · witness residuals · P^θ bounds · T , a , b · 1/32 instance · 89 / 26 / 63 · mod-5 relations · x⁴ signatures', W / 2, 630, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('84 ATOMS OF THIS VOLUME : RESIDUAL-OPEN', W / 2, 700, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    const cs = 24, gx = W / 2 - 13 * cs / 2, gy = 260;
    grid78(gx, gy, 13, cs, a, (i, j) => { const ph = 0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.5 + j * 0.37); return i === j ? [C.gold, 0.75] : [C.cyan, 0.12 + 0.25 * ph]; });
    txt('AURIC QP III · NATIVE RANK', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 量子原理 第三部 · 原生预测秩与终端响应 · TRURETURING FILM 078', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Thirteen paths, a rank bound, a four-time relation, and records that still need a rule.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC QP III', sector: 'THIRTEEN PATHS', rank: 'PREDICTIVE RANK', unbounded: 'NO RANK BOUND', clock: 'FOUR-TIME RELATION', witness: 'FINITE WITNESS', stable: 'STABILITY', weights: 'TWO RECORDS', finite: 'FINITE CHECKS', vacuum: 'VACUUM RECORD', records: 'UNKNOWN WEIGHTS', effects: 'RULE AND EFFECTS', finale: 'LEDGER' });

function poster078() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const cs = 26, gx = 460 - 13 * cs / 2, gy = 300;
  grid78(gx, gy, 13, cs, 1, (i, j) => { const ph = 0.5 + 0.5 * Math.sin(1.3 * t + i * 0.5 + j * 0.37); return i === j ? [C.gold, 0.85] : [C.cyan, 0.15 + 0.3 * ph]; });
  txt('13 × 13 = 169', 460, gy + 13 * cs + 50, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold });
  txt('r(P) < 8113 , calibrated  ⇒  P_w(ψ) = |ψ_w|²', 1270, 370, { size: 36, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('a₃ + x²a₁ = a₀ + x²a₂', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('8281 = 91² · √ε sharp · 1/32', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 量子原理 第三部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC QP III · NATIVE RANK', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('原 生 预 测 秩 · 终 端 响 应', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 078', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster078;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
