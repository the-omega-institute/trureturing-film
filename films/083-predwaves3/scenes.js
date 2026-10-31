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

/* ---- film 083: AURIC PREDICTIVE WAVES III · POSITIVE REALIZATIONS AND REAL MEMORY ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN GENERAL THEOREM · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · NOT DETERMINED IN THE VOLUME', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po083 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po083.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po083.set(key, off); }
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
/* ---- film 083 data (generated from vis083.json by gen_data.py) ---- */
const UN83 = [0.0,0.0,-0.75,0.75,-0.375,0.75,-0.5625,-0.1875,0.09375,-0.1875,0.89062,-0.70312,0.35156,-0.70312,0.33984,0.36328,-0.18164,0.36328,-0.97559,0.6123,-0.30615,0.6123,-0.09595,-0.51636,0.25818,-0.51636,0.99957,-0.48322,0.24161,-0.48322,-0.15395,0.63716,-0.31858,0.63716,-0.96109,0.32393,-0.16196,0.32393,0.39422,-0.71814,0.35907];
const EIG83 = [[2.717561614099053,0.9999999999999997],[-1.146765287304156,1.0]];
const HEX83 = [[0.0,0.050000000000000044,1.0],[0.0,1.0,0.050000000000000044],[0.050000000000000044,0.0,1.0],[0.050000000000000044,1.0,0.0],[1.0,0.0,0.050000000000000044],[1.0,0.050000000000000044,0.0]];
const B3G83 = [[0.667,0.0],[0.683,0.0001583],[0.7,0.0003],[0.717,0.000425],[0.733,0.0005333],[0.75,0.000625],[0.767,0.0007],[0.783,0.0007583],[0.8,0.0008],[0.817,0.000825],[0.833,0.0008333],[0.85,0.000825],[0.867,0.0008],[0.883,0.0007583],[0.9,0.0007],[0.917,0.000625],[0.933,0.0005333],[0.95,0.000425],[0.967,0.0003],[0.983,0.0001583],[1.0,0.0]];
const DISCSEG83 = {"0.25":[[-0.1111,0.0],[-0.0464,0.0374],[0.0184,0.0748],[0.0832,0.1122],[0.1479,0.1496],[0.2127,0.1869],[0.2775,0.2243],[0.3422,0.2617],[0.407,0.2991],[0.4717,0.3365],[0.5365,0.3739]],"0.45":[[0.4694,0.0],[0.5764,0.0618],[0.6835,0.1236],[0.7905,0.1854],[0.8976,0.2472],[1.0047,0.309],[1.1117,0.3708],[1.2188,0.4326],[1.3258,0.4945],[1.4329,0.5563],[1.5399,0.6181]]};
const DISC83 = [[0.02,0.8637,0.9208],[0.04,0.7318,0.8431],[0.06,0.6052,0.767],[0.08,0.4857,0.6923],[0.1,0.3772,0.619],[0.12,0.2889,0.5472],[0.14,0.2399,0.4766],[0.16,0.2504,0.4074],[0.18,0.3119,0.3394],[0.2,0.3996,0.2727],[0.22,0.4984,0.2072],[0.24,0.6016,0.1429],[0.26,0.7064,0.0796],[0.28,0.8114,0.0175],[0.3,0.9157,0.0435],[0.32,1.0192,0.1034],[0.34,1.1215,0.1624],[0.36,1.2224,0.2203],[0.38,1.322,0.2773],[0.4,1.4202,0.3333],[0.42,1.5169,0.3884],[0.44,1.6122,0.4426],[0.46,1.7061,0.4959],[0.48,1.7985,0.5484],[0.5,1.8896,0.6],[0.52,1.9793,0.6508],[0.54,2.0676,0.7008],[0.56,2.1546,0.75],[0.58,2.2403,0.7984],[0.6,2.3247,0.8462],[0.62,2.4079,0.8931],[0.64,2.4898,0.9394],[0.66,2.5705,0.985],[0.68,2.65,1.0299],[0.7,2.7284,1.0741],[0.72,2.8056,1.1176],[0.74,2.8817,1.1606],[0.76,2.9568,1.2029],[0.78,3.0307,1.2446],[0.8,3.1037,1.2857],[0.82,3.1755,1.3262],[0.84,3.2464,1.3662],[0.86,3.3163,1.4056],[0.88,3.3853,1.4444],[0.9,3.4533,1.4828],[0.92,3.5203,1.5205],[0.94,3.5865,1.5578],[0.96,3.6518,1.5946],[0.98,3.7162,1.6309]];
const DSTAR83 = 0.316273;
const WIT83 = [[0.35,0.9372,0.4305,1.0314],[0.45,1.0746,0.3494,1.13],[0.6,1.2609,0.2395,1.2835],[0.8,1.4783,0.1112,1.4825]];
const AFF83 = [0,2,5,9,14,20];
const EXH83 = [[3,1],[5,3],[10,8],[20,18],[50,48],[100,98]];
const EPSK83 = [[1,14417676.89,7.1589],[2,5.0901849106459656e+16,16.7067],[3,5.4898164121931125e+29,29.7396],[4,3.548525986552388e+46,46.55],[5,2.139886816394876e+67,67.3304],[6,1.706881149998429e+92,92.2322],[7,2.414695060617525e+121,121.3829],[8,7.813413009356333e+154,154.8928]];
const TVH83 = [[0,0,0.0],[1,0.02987,0.04999],[2,0.02561,0.09999],[3,0.04404,0.14998],[4,0.05038,0.19998],[5,0.06279,0.24997],[6,0.07124,0.29997],[7,0.0822,0.34996],[8,0.09449,0.39996],[9,0.10752,0.44995],[10,0.12119,0.49995],[11,0.13468,0.54994],[12,0.14838,0.59994]];
const UD83 = [[0.0,0.25],[0.025,0.30555],[0.05,0.32806],[0.075,0.34499],[0.1,0.35897],[0.125,0.37103],[0.15,0.3817],[0.175,0.39128],[0.2,0.4],[0.225,0.40799],[0.25,0.41536],[0.275,0.42219],[0.3,0.42854],[0.325,0.43445],[0.35,0.43998],[0.375,0.44516],[0.4,0.45],[0.425,0.45454],[0.45,0.45879],[0.475,0.46278],[0.5,0.46651],[0.525,0.47],[0.55,0.47326],[0.575,0.4763],[0.6,0.47913],[0.625,0.48176],[0.65,0.48419],[0.675,0.48643],[0.7,0.48848],[0.725,0.49036],[0.75,0.49206],[0.775,0.49359],[0.8,0.49495],[0.825,0.49614],[0.85,0.49717],[0.875,0.49804],[0.9,0.49875],[0.925,0.4993],[0.95,0.49969],[0.975,0.49992],[1.0,0.5]];
const LAM83 = [[0.25,1.0],[0.26,0.98753],[0.27,0.97666],[0.28,0.96726],[0.29,0.9592],[0.3,0.95238],[0.31,0.9467],[0.32,0.9421],[0.33,0.93849],[0.34,0.93583],[0.35,0.93407],[0.36,0.93316],[0.37,0.93308],[0.38,0.93379],[0.39,0.93527],[0.4,0.9375],[0.41,0.94047],[0.42,0.94417],[0.43,0.94859],[0.44,0.95373],[0.45,0.9596],[0.46,0.96618],[0.47,0.9735],[0.48,0.98157],[0.49,0.9904],[0.5,1.0]];
const PEFF83 = 0.366025;
const SPEC83 = {"0.25":[0.5,0.5,0.0],"0.375":[0.58333,0.41667,-0.0],"0.5":[0.66667,0.33333,-0.0]};
const DIST83 = [[0.25,2.0],[0.275,1.99889],[0.3,1.99555],[0.325,1.98997],[0.35,1.98214],[0.375,1.97203],[0.4,1.95959],[0.425,1.94479],[0.45,1.92758],[0.475,1.90788],[0.5,1.88562]];
const ERASE83 = [0.6875,0.3125,-0.0];
const SPAN83 = [1,3,7,8,8,8,8,8,8];
const TAB83 = [[[1.0,0.5,0.5,0.25,0.25,0.25,0.25,0.125,1.0],[0.25,0.311,0.014,0.053,0.016,0.204,0.015,0.027,0.603],[0.311,0.053,0.204,0.027,0.009,0.01,0.05,0.026,0.256],[0.014,0.016,0.015,0.059,0.095,0.001,0.055,0.017,0.061],[0.053,0.027,0.01,0.026,0.04,0.023,0.006,0.001,0.147],[0.204,0.009,0.05,0.023,0.006,0.042,0.011,0.003,0.156],[0.027,0.026,0.023,0.001,0.004,0.003,0.024,0.014,0.022],[0.009,0.023,0.042,0.003,0.005,0.005,0.01,0.002,0.102],[0.01,0.04,0.006,0.004,0.015,0.005,0.01,0.01,0.013]],[[0.5,0.25,0.25,0.125,0.125,0.125,0.125,0.062,0.5],[0.311,0.053,0.204,0.027,0.009,0.01,0.05,0.026,0.256],[0.053,0.027,0.01,0.026,0.04,0.023,0.006,0.001,0.147],[0.016,0.059,0.001,0.017,0.012,0.029,0.025,0.015,0.034],[0.027,0.026,0.023,0.001,0.004,0.003,0.024,0.014,0.022],[0.009,0.023,0.042,0.003,0.005,0.005,0.01,0.002,0.102],[0.026,0.001,0.003,0.014,0.01,0.002,0.0,0.0,0.006],[0.023,0.003,0.005,0.002,0.01,0.003,0.009,0.004,0.018],[0.04,0.004,0.005,0.01,0.002,0.01,0.001,0.0,0.022]],[[0.5,0.25,0.25,0.125,0.125,0.125,0.125,0.062,0.5],[0.014,0.016,0.015,0.059,0.095,0.001,0.055,0.017,0.061],[0.204,0.009,0.05,0.023,0.006,0.042,0.011,0.003,0.156],[0.015,0.095,0.055,0.004,0.003,0.013,0.017,0.016,0.123],[0.01,0.04,0.006,0.004,0.015,0.005,0.01,0.01,0.013],[0.05,0.006,0.011,0.024,0.01,0.011,0.003,0.0,0.02],[0.023,0.004,0.024,0.0,0.002,0.004,0.008,0.001,0.053],[0.042,0.005,0.01,0.004,0.008,0.002,0.006,0.005,0.015],[0.006,0.015,0.01,0.002,0.005,0.008,0.001,0.0,0.055]],[[1.0,0.5,0.5,0.25,0.25,0.25,0.25,0.125,1.0],[0.603,0.034,0.196,0.007,0.099,0.094,0.182,0.076,0.419],[0.256,0.079,0.1,0.097,0.036,0.034,0.034,0.022,0.025],[0.061,0.174,0.023,0.016,0.019,0.089,0.024,0.021,0.184],[0.147,0.034,0.053,0.007,0.004,0.051,0.015,0.003,0.195],[0.156,0.036,0.004,0.032,0.042,0.031,0.007,0.01,0.065],[0.022,0.01,0.017,0.014,0.004,0.008,0.023,0.008,0.006],[0.102,0.0,0.05,0.018,0.001,0.012,0.016,0.004,0.031],[0.013,0.04,0.014,0.002,0.002,0.009,0.017,0.012,0.026]]];
const NONU83 = [[0.2,0.761602,0.1645,0.375],[0.1,0.615286,0.148598,0.375],[0.05,0.444419,0.120576,0.375],[0.02,0.242421,0.074313,0.375],[0.01,0.137931,0.044795,0.375],[0.005,0.074074,0.024882,0.375],[0.002,0.031008,0.010649,0.375]];
/* ---- film 083 helpers ---- */
function ell83(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll83(cx, cy, rx, ry, col, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
function cell83(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
/* emblem: a ring carrying a predictive wave, a qutrit triangle and a hexagon inside */
function emblem83(cx, cy, r, a, t) {
  if (a <= 0) return;
  ring(cx, cy, r, C.cyan, a * 0.7, 2.5);
  curve(p => { const q = p * TAU; const rr = r * (0.84 + 0.07 * Math.sin(9 * q + t * 1.3)); return [cx + rr * Math.cos(q), cy + rr * Math.sin(q)]; }, 240, C.gold, a * 0.9, 2.5);
  const hx = ringPts(cx, cy, r * 0.55, 6, -Math.PI / 2); strokePoly(hx, C.mag, a * 0.7, 2);
  const tr = ringPts(cx, cy, r * 0.62, 3, -Math.PI / 2 + t * 0.15);
  strokePoly(tr, C.cyan, a * 0.8, 2.2);
  tr.forEach((p, i) => dot(p[0], p[1], 13, ['c', 'g', 'm'][i], a));
  dot(cx, cy, 10, 'w', a * 0.9);
}
/* map an [x0,x1]x[y0,y1] data box onto a screen box */
function sc83(px, py, pw, ph, x0, x1, y0, y1) { return [x => px + (x - x0) / (x1 - x0) * pw, y => py - (y - y0) / (y1 - y0) * ph]; }
/* heat grid of a numeric matrix */
function heat83(x, y, M, cs, a, col, o = {}) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((v, j) => { const q = o.prog == null ? 1 : clamp(o.prog * (M.length + row.length) - (i + j)); const cc = o.rowcol ? o.rowcol(i, j) : col; fillBox(x + j * cs, y + i * cs, cs - 2, cs - 2, cc, a * q * (0.12 + 0.85 * Math.min(1, Math.abs(v) * (o.k || 1)))); }));
  rect63(x - 2, y - 2, M[0].length * cs + 2, M.length * cs + 2, col, a, 1.2);
}
/* cone outline: apex at (cx, cy), opening upward to an ellipse at height h, half-width w, wobble for an irregular cone */
function cone83(cx, cy, h, w, col, a, wob = 0, t = 0, fillA = 0.08) {
  if (a <= 0) return;
  const ty = cy - h, pts = [];
  for (let i = 0; i <= 72; i++) { const q = i / 72 * TAU; const rr = 1 + wob * (0.6 * Math.sin(3 * q + t) + 0.4 * Math.cos(5 * q - t * 0.7)); pts.push([cx + w * rr * Math.cos(q), ty + 0.26 * w * rr * Math.sin(q)]); }
  fillPoly(pts, col, a * fillA); strokePoly(pts, col, a, 2.2);
  let iL = 0, iR = 0; pts.forEach((p, i) => { if (p[0] < pts[iL][0]) iL = i; if (p[0] > pts[iR][0]) iR = i; });
  line(cx, cy, pts[iL][0], pts[iL][1], col, a, 2.2); line(cx, cy, pts[iR][0], pts[iR][1], col, a, 2.2);
  dot(cx, cy, 8, col === C.gold ? 'g' : col === C.mag ? 'm' : 'c', a);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  emblem83(470, 480, 190, s0, t);
  const items = [['a five-dimensional instrument', 'FIVE-DIMENSIONAL INSTRUMENT', 'H = ℂ⁵ ,  A_h B = 2^(−n/2) B V_h', C.gold], ['a compatible set of qutrit states', 'COMPATIBLE SET K_d', 'ρ = A + D ,  a†Aa = d ,  Tr Cρ = d ,  Tr Eρ = e_d', C.cyan], ['the exact joint records', 'JOINT RECORDS OF TIME WORDS', 'p_ρ(h, 1) = 2^(−n) Tr(ρ V_h† E V_h)', C.mag], ['which classical, real and complex machines', 'CANDIDATE MACHINES', 'classical · real · complex · ordered cones', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 225 + i * 148, 860, 124, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 265 + i * 148, col, q, 21); lblG(s, 1360, 315 + i * 148, C.white, q, i === 1 ? 23 : 25); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  emblem83(W / 2, 400, 175, rp, t);
  chip(330, 360, 340, 58, 'classical : θ ∈ (π/2)ℤ', C.gold, rp, 22); chip(330, 445, 340, 58, 'real : 2 · 3 · 6', C.cyan, rp, 22); chip(330, 530, 340, 58, 'complex : p ∈ [d/2 , 1/2]', C.mag, rp, 21);
  box(1420, 345, 380, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one mixing control', 1610, 410, C.green, rp, 22); lblG('324 numbers → PU(3)', 1610, 470, C.white, rp, 26);
  txt(scramble('PREDICTIVE WAVES III · SIX', rp, 483), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 相 容 预 测 波  第 三 部 · 正 实 现 与 实 记 忆', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 083 · AURIC_COMPATIBLE_PREDICTIVE_WAVES_AND_RELATIONAL_SPECTRA_V · §54–115', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 CLASSICAL CRITERION ---- */
SCENES.classical = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Otherwise two strictly compatible worlds', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'finitely many hidden states', 0.6) * f1;
    const P = ringPts(470, 470, 160, 6, -Math.PI / 2 + t * 0.05);
    P.forEach((p, i) => { const n = P[(i + 1) % 6], m = P[(i + 2) % 6]; arrow(p[0], p[1], p[0] + (n[0] - p[0]) * 0.82, p[1] + (n[1] - p[1]) * 0.82, C.gold, q * 0.8, 2); dashed(p[0], p[1], m[0], m[1], C.cyan, q * 0.45, 1.5); });
    P.forEach((p, i) => { dot(p[0], p[1], 16, 'c', q); lbl('s' + (i + 1), p[0], p[1] - 24, C.white, q, 16); });
    const nq = Q(S, 0, 'nonnegative branches', 0.6) * f1;
    lbl('gold : T₀ ≥ 0   dashed : T₁ ≥ 0   1ᵀ(T₀ + T₁) = 1ᵀ', 470, 690, C.dim, nq, 16);
    const eq = Q(S, 0, 'one fixed yes or no effect', 0.6) * f1;
    chip(470, 262, 640, 54, 'p(ρ) ∈ simplex ,  f_cl ∈ [0, 1]^k ,  yes = f_clᵀ T_h p(ρ)', C.white, eq, 18);
    const cq = Q(S, 0, 'an exact finite model exists exactly when', 0.6) * f1;
    chip(1395, 262, 760, 62, 'k_min(θ, d) < ∞   ⟺   θ ∈ (π/2)ℤ', C.gold, cq, 26);
    lbl('for every fixed 0 < d < 1 , on the whole complex set K_d', 1395, 322, C.dim, cq, 15);
    const aq = Q(S, 0, 'every fixed angle theta', 0.6) * f1;
    const cx = 1395, cy = 555, R = 140;
    ring(cx, cy, R, C.red, aq * 0.8, 3);
    [[0, '0'], [Math.PI / 2, 'π/2'], [Math.PI, 'π'], [1.5 * Math.PI, '3π/2']].forEach(([an, s]) => { const x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); dot(x, y, 15, 'n', cq); lblG(s, cx + (R + 44) * Math.cos(an), cy - (R + 44) * Math.sin(an) + 8, C.green, cq, 20); });
    const sw = (t * 0.5) % TAU; line(cx, cy, cx + R * Math.cos(sw), cy - R * Math.sin(sw), C.white, aq * 0.6, 2); lblG('θ', cx + 30 * Math.cos(sw + 0.3), cy - 30 * Math.sin(sw + 0.3) + 8, C.white, aq, 20);
    lbl('green : a finite classical model exists ;  red : none', cx, 795, C.dim, aq, 16);
  }
  const q = Q(S, 1, 'Otherwise two strictly compatible worlds', 0.6, 0.3);
  if (q > 0) {
    chip(550, 262, 800, 54, 'ρ± = ρ* ± tΔ ,  Δ = i(ξe† − eξ†)  : two strict compatible worlds', C.cyan, q, 18);
    const [xS, yS] = sc83(160, 650, 760, 300, 0, 40, -1.1, 1.1);
    const pq = Q(S, 1, 'differ by a frequency', 0.6);
    plotAxes(160, 650, 760, 300, pq, 'n', '2ⁿ(p₊ − p₋)/2t = Im (B_ζⁿ)₁₁ ,  θ = π/4');
    line(160, yS(0), 920, yS(0), C.dim, pq * 0.4, 1);
    UN83.forEach((v, n) => { const qq = clamp(pq * 1.7 - n / 50); line(xS(n), yS(0), xS(n), yS(v), C.gold, qq * 0.6, 2); dot(xS(n), yS(v), 6, 'g', qq); });
    lbl('never settles into a period', 540, 720, C.gold, pq, 16);
    const cx = 1395, cy = 470, R = 170;
    const rq = Q(S, 1, 'not a root of unity', 0.6);
    ring(cx, cy, R, C.dim, rq, 2);
    for (let i = 0; i < 24; i++) { const an = TAU * i / 24; dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 7, 'w', rq * 0.85); }
    EIG83.forEach(([an]) => { const x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); line(cx, cy, x, y, C.mag, rq, 2.5); dot(x, y, 15, 'm', rq); });
    lbl('magenta : eigenvalues of B_ζ at θ = π/4 ;  white : 24th roots of unity', cx, cy - R - 30, C.mag, rq, 15);
    const pq2 = Q(S, 1, 'only sustains roots of unity', 0.6);
    chip(cx, 700, 760, 54, 'finite positive model : lasting frequencies ⊂ roots of unity', C.green, pq2, 18);
    const lq = Q(S, 1, 'Longer horizons', 0.6);
    lblG('k_H → ∞ ,   k_H ≤ 2(2^(H+1) − 1)', cx, 780, C.white, lq, 22);
  }
};

/* ---- 03 EXCEPTIONAL TRIANGLE ---- */
SCENES.triangle = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Whether four, five or six', 'open']]);
  const f1 = 1 - Q(S, 1, 'Above two thirds', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'permutes three responses', 0.6) * f1;
    const P = ringPts(470, 530, 160, 3, -Math.PI / 2);
    strokePoly(P, C.cyan, q * 0.6, 2);
    const nm = ['b₂ = d + s', 'b₁ = e_d', 'b₃ = e_d − s'], dn = ['g', 'c', 'm'];
    P.forEach((p, i) => { dot(p[0], p[1], 18, dn[i], q); lblG(nm[i], p[0] + (i === 0 ? 0 : i === 1 ? 70 : -70), p[1] + (i === 0 ? -30 : 50), C.white, q, 20); });
    const sw = Q(S, 0, 'add up to sigma', 0.6) * f1;
    const k = (t * 0.6) % 3, i0 = Math.floor(k), fr = ease(clamp((k - i0) * 1.5));
    const A = P[i0], B = P[(i0 + 1) % 3];
    dot(lerp(A[0], B[0], fr), lerp(A[1], B[1], fr), 10, 'w', q);
    lbl('labels act by π₀ = (12) , π₁ = (132) : the group S₃', 470, 740, C.dim, q, 16);
    chip(550, 262, 800, 56, 'Σ b_i = Σ = (6 + 3d)/8', C.gold, sw, 24);
    const tq = Q(S, 0, 'For d up to two thirds', 0.6) * f1;
    chip(1395, 262, 760, 58, 'd ≤ 2/3  ⇒  Σ ≤ 1 :  p = b/Σ ,  f_cl = (Σ, 0, 0)', C.cyan, tq, 20);
    const P0 = [[0, 1, 0], [1, 0, 0], [0, 0, 1]], P1 = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
    [[P0, 'T₀ = P₀/2', 1150], [P1, 'T₁ = P₁/2', 1490]].forEach(([M, s, x]) => { M.forEach((row, i) => row.forEach((v, j) => cell83(x + j * 62, 340 + i * 62, 56, 56, String(v), v ? C.gold : C.dim, tq, 20, v ? 0.35 : 0.05))); lbl(s, x + 90, 560, C.white, tq, 19); });
    const mq = Q(S, 0, 'three is the minimum', 0.6) * f1;
    stamp('k_min = 3', 1395, 680, mq, C.green, 40, -0.04);
  }
  const q = Q(S, 1, 'Above two thirds', 0.6, 0.3);
  if (q > 0) {
    const Sg = 1.05, cx = 470, cy = 560, sc = 260;
    const pr = v => [cx + (v[1] - v[2]) * Math.sqrt(3) / 2 * sc, cy - (v[0] - (v[1] + v[2]) / 2) * sc];
    const big = [[Sg, 0, 0], [0, Sg, 0], [0, 0, Sg]].map(pr);
    strokePoly(big, C.dim, q, 1.6); lbl('dashed : x₁ + x₂ + x₃ = Σ ,  x ≥ 0', cx, 735, C.dim, q, 15);
    const hq = Q(S, 1, 'hexagonal section of the cube', 0.6);
    const hx = HEX83.map(pr).map(p => [p[0], p[1], Math.atan2(p[1] - cy + 0.0001, p[0] - cx)]).sort((a1, a2) => a1[2] - a2[2]).map(p => [p[0], p[1]]);
    fillPoly(hx, C.cyan, hq * 0.18); strokePoly(hx, C.cyan, hq, 2.5); hx.forEach(p => dot(p[0], p[1], 11, 'c', hq));
    lbl('d = 0.8 , Σ = 1.05 : vertices = permutations of (1 , Σ − 1 , 0)', cx, 262, C.cyan, hq, 17);
    if (hq > 0) {
      const C0 = pr([Sg, 0, 0]), fo = [C0[0], C0[1] + 0.075 * sc], mg = 5, ix = 845, iy = 400, f = p => [ix + (p[0] - fo[0]) * mg, iy + (p[1] - fo[1]) * mg];
      ring(C0[0], C0[1] + 10, 22, C.gold, hq, 2); dashed(C0[0] + 22, C0[1] + 10, 745, 330, C.gold, hq * 0.7, 1.5);
      ctx.save(); ctx.beginPath(); ctx.rect(745, 310, 200, 160); ctx.clip();
      fillBox(745, 310, 200, 160, '#000000', hq * 0.45);
      strokePoly(big.map(f), C.dim, hq, 1.6); fillPoly(hx.map(f), C.cyan, hq * 0.18); strokePoly(hx.map(f), C.cyan, hq, 2.5); hx.map(f).forEach(p => dot(p[0], p[1], 9, 'c', hq));
      ctx.restore(); rect63(745, 310, 200, 160, C.gold, hq, 1.6);
      lbl('× 5 : corner cut at x₁ = 1', 845, 494, C.gold, hq, 14);
    }
    chip(cx, 788, 640, 46, 'six states , one affine preparation on all of K_d', C.cyan, hq, 18);
    const wq = Q(S, 1, 'an explicit strictly mixed world', 0.6);
    chip(1395, 262, 780, 56, 'δ = (1 − d)(3d − 2)/100 ,  b₃ = (Σ − 1)/2 − δ', C.mag, wq, 21);
    const [xS, yS] = sc83(1050, 600, 680, 250, 2 / 3, 1, 0, 0.001);
    plotAxes(1050, 600, 680, 250, wq, 'd ∈ (2/3 , 1)', 'δ(d) > 0 : b₃ below (Σ − 1)/2');
    curve(p => { const d = 2 / 3 + p / 3; return [xS(d), yS((1 - d) * (3 * d - 2) / 100)]; }, 60, C.mag, wq, 3);
    B3G83.forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'm', wq));
    lbl('2b² − a² : 3035115360000 , 19703614140191 , 12803513240000 , 734300000000', 1395, 650, C.dim, wq, 13);
    stamp('k = 3 RULED OUT', 1395, 715, Q(S, 1, 'rules out three', 0.6), C.red, 28, -0.04);
    chip(1395, 790, 520, 50, '4 ≤ k_min ≤ 6  (open)', C.vio, Q(S, 1, 'Whether four, five or six', 0.6), 22);
  }
};

/* ---- 04 REAL DISC ---- */
SCENES.disc = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The extreme compatible states', 0.6);
  const drawDisc = (cx, cy, R, a, seg, col, wit) => {
    fillEll83(cx, cy, R, R, C.cyan, a * 0.07); ring(cx, cy, R, C.cyan, a, 2.5);
    [[-0.5, Math.sqrt(3) / 2], [1, 0], [-0.5, -Math.sqrt(3) / 2]].forEach(([x, y], i) => { arrow(cx, cy, cx + x * R * 0.98, cy - y * R * 0.98, C.gold, a * 0.75, 2); lbl('n' + (i + 1), cx + x * (R + 28), cy - y * (R + 28) + 6, C.gold, a, 16); });
    if (seg) { const pts = seg.map(([x, y]) => [cx + x * R, cy - y * R]); strokePoly(pts, col, a, 3, false); pts.forEach(p => dot(p[0], p[1], 6, col === C.red ? 'r' : 'c', a)); }
    if (wit) wit.forEach(([x, y]) => { dot(cx + x * R, cy - y * R, 12, 'r', a); });
  };
  if (f1 > 0) {
    const q = Q(S, 0, 'Now allow a real two-dimensional', 0.6) * f1;
    const dq = Q(S, 0, 'every response point lies in a disc', 0.6) * f1;
    drawDisc(500, 510, 230, q, DISCSEG83['0.25'], C.cyan, null);
    lbl('d = 0.25 : v(s)/μ for s ∈ [0 , ηd] stays inside', 500, 790, C.cyan, dq, 16);
    lbl('radius μ', 500 + 165, 510 + 165, C.cyan, dq, 17);
    chip(1395, 262, 780, 56, 'b_i(s) = μ + n_i · v(s) ,  v(s) = (d + s − μ , s/√3)', C.gold, q, 20);
    const eq = Q(S, 0, 'It exists exactly when', 0.6) * f1;
    chip(1395, 345, 780, 62, 'real 2-D model  ⟺  ‖v(s)‖ ≤ μ = (2 + d)/8', C.cyan, eq, 24);
    lbl('any real Kraus branches , any effect , any hidden fibre ; real 1-D impossible', 1395, 405, C.dim, eq, 15);
    const mq = Q(S, 0, 'radius mu', 0.6) * f1;
    box(1010, 445, 770, 230, C.white, mq, 1.5, 'rgba(0,0,0,0.45)');
    lbl('the model when the criterion holds', 1395, 480, C.white, mq, 18);
    lblG('σ(ρ) = ½[ I + (v/μ) · (Z , X) ] ,  F_i = μ[ I + n_i · (Z , X) ]', 1395, 530, C.white, mq, 19);
    lblG('Φ_j(Y) = O_j Y O_jᵀ / 2 ,  O₀ , O₁ permute F₁ , F₂ , F₃', 1395, 575, C.white, mq, 19);
    lbl('η = (3 + 2√2)/8 bounds s on the whole complex set : 0 ≤ s ≤ ηd', 1395, 630, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'The extreme compatible states', 0.6, 0.3);
  if (q > 0) {
    const [xS, yS] = sc83(160, 700, 760, 400, 0, 1, 0, 4);
    const pq = Q(S, 1, 'a sharp threshold, d star', 0.6);
    plotAxes(160, 700, 760, 400, pq, 'd', 'R(ηd)/μ (gold) , R(0)/μ (cyan)');
    line(160, yS(1), 920, yS(1), C.white, pq * 0.6, 1.5); lbl('disc boundary', 900, yS(1) - 10, C.white, pq, 14, 'right');
    curve(p => { const r = DISC83[Math.round(p * (DISC83.length - 1))]; return [xS(r[0]), yS(r[1])]; }, DISC83.length - 1, C.gold, pq, 3);
    curve(p => { const r = DISC83[Math.round(p * (DISC83.length - 1))]; return [xS(r[0]), yS(r[2])]; }, DISC83.length - 1, C.cyan, pq * 0.8, 2);
    dashed(xS(DSTAR83), 700, xS(DSTAR83), 300, C.green, pq, 2); dot(xS(DSTAR83), yS(1), 11, 'n', pq);
    lbl('d* ≈ 0.316', xS(DSTAR83) + 12, 330, C.green, pq, 17, 'left');
    const m2 = Q(S, 1, 'the minimal real dimension is two', 0.6), m3 = Q(S, 1, 'the minimum is three', 0.6);
    lbl('m = 2', xS(0.16), yS(2.2), C.green, m2, 22); lbl('m = 3', xS(0.8), yS(0.35), C.orange, m3, 22);
    chip(1395, 262, 780, 58, 'd* = 6(11 + 2√2)/(169 + 66√2) ≈ 0.31627', C.green, Q(S, 1, 'about zero point three one six', 0.6), 23);
    const wq = Q(S, 1, 'explicit compatible witnesses leave the disc', 0.6);
    drawDisc(1395, 515, 140, wq, null, C.red, WIT83.map(w => [w[1], w[2]]));
    lbl('witnesses ρ_t at d = 0.35 , 0.45 , 0.6 , 0.8 : R/μ = ' + WIT83.map(w => w[3].toFixed(2)).join(' , '), 1395, 700, C.red, wq, 14);
    chip(1395, 775, 780, 52, 'd > d* :  m_min = 3 ,  attained by σ(ρ) = Re ρ', C.orange, m3, 20);
  }
};

/* ---- 05 REAL DIMENSION SIX ---- */
SCENES.six = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'the standard realification', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Four and five are excluded', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the compatible set is six-dimensional', 0.6) * f1;
    const x0 = 200, y0 = 700, bw = 92, gp = 28, hs = 18;
    plotAxes(170, y0, 760, 400, q, '', 'affine dimension of m × m real densities'); lbl('real dimension m', 550, y0 + 58, C.dim, q, 17);
    AFF83.forEach((v, i) => { const x = x0 + i * (bw + gp), h = v * hs, col = i >= 3 ? C.green : C.red; fillBox(x, y0 - h, bw, h, col, q * 0.4); rect63(x, y0 - h, bw, h, col, q, 1.6); lbl(String(v), x + bw / 2, y0 - h - 12, C.white, q, 20); lbl(String(i + 1), x + bw / 2, y0 + 28, C.dim, q, 18); });
    dashed(170, y0 - 6 * hs, 930, y0 - 6 * hs, C.gold, q, 2); lbl('dim K_d = 6', 185, y0 - 6 * hs - 12, C.gold, q, 17, 'left');
    const wq = Q(S, 0, 'eight weighted word effects', 0.6) * f1;
    chip(1395, 262, 780, 60, 'det[ I₃ , 2^(−|h|) M_h ] = (6561/2³⁶) sin⁷(2θ) ≠ 0', C.gold, wq, 21);
    ['∅', '0', '1', '00', '10', '000', '010', '100'].forEach((s, i) => cell83(1035 + i * 92, 315, 82, 56, s, C.gold, clamp(wq * 1.5 - i / 10), 19));
    lbl('h : the eight native time words (leftmost acts first)', 1395, 400, C.dim, wq, 15);
    const iq = Q(S, 0, 'at least four dimensions are needed', 0.6) * f1;
    chip(1395, 470, 780, 58, 'injective affine encoding  ⇒  m(m+1)/2 − 1 ≥ 6  ⇒  m ≥ 4', C.green, iq, 20);
    const rq = Q(S, 0, 'the standard realification', 0.6) * f1;
    chip(1395, 575, 780, 60, 'ℜ(X) = [ Re X  −Im X ; Im X  Re X ] ,  σ = ℜ(ρ)/2 :  m = 6', C.cyan, rq, 20);
    lbl('McKague–Mosca–Gisin , arXiv:0810.1923 ; recomputed : Tr[ℜ(ρ)/2 · ℜ(M)] = Tr(ρM)', 1395, 635, C.dim, rq, 14);
  }
  const q = Q(S, 1, 'Four and five are excluded', 0.6, 0.3);
  if (q > 0) {
    for (let m = 1; m <= 6; m++) { const x = 175 + (m - 1) * 125, ok = m === 6; cell83(x, 300, 105, 105, String(m), ok ? C.green : C.red, q, 40, ok ? 0.35 : 0.12); if (!ok) { line(x + 10, 310, x + 95, 395, C.red, q, 4); line(x + 95, 310, x + 10, 395, C.red, q, 4); } }
    lbl('1–3 : too few parameters   4–5 : excluded below   6 : realification', 550, 450, C.dim, q, 16);
    const steps = [['close up to a real SU two', 'native words ⊇ 1 ⊕ SU(2)', 'every non-exceptional angle , rational angles included', C.cyan], ['forced to be orthogonal', 'm ≤ 5  ⇒  orthogonal 1 ⊕ ℝ⁴ (fundamental)', 'compact CP semigroup , Choi–Effros , real C*-algebra cost', C.gold], ['a pure compatible curve', 'pure curve ρ_t ∈ K_d , |t| < δ_d', 'affine fit forces degree 5 = degree 3 (leading term −12d⁴)', C.mag]];
    steps.forEach(([ph, h, s, col], i) => { const qq = Q(S, 1, ph, 0.6), y = 250 + i * 160; box(1010, y, 770, 135, col, qq, 2, 'rgba(0,0,0,0.5)'); lblG(h, 1395, y + 55, col, qq, 24); lbl(s, 1395, y + 100, C.white, qq, 15); if (i < 2) arrow(1395, y + 137, 1395, y + 158, C.dim, qq, 2); });
    stamp('m_min = 6', 550, 620, Q(S, 1, 'one of degree three', 0.6), C.green, 44, -0.04);
    lbl('for every 0 < d < 1 and every sin 2θ ≠ 0', 550, 720, C.dim, Q(S, 1, 'one of degree three', 0.6), 16);
  }
};

/* ---- 06 FINITE RECORDS ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'a published lower bound on polynomial minima', 'published'], [1, 'It is doubly exponential', 'theory']]);
  const f1 = 1 - Q(S, 1, 'For rational source data', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'needs at least H minus two states', 0.6) * f1;
    const [xS, yS] = sc83(170, 700, 740, 380, 0, 100, 0, 100);
    plotAxes(170, 700, 740, 380, q, 'depth H', 'states needed for exact matching');
    curve(p => { const H = p * 100; return [xS(H), yS(Math.max(1, H - 2))]; }, 100, C.gold, q, 3);
    EXH83.forEach(([H, k]) => { dot(xS(H), yS(k), 9, 'g', q); lbl(String(k), xS(H) - 10, yS(k) - 14, C.white, q, 15, 'right'); });
    chip(540, 262, 760, 56, 'k(H, 0) ≥ max{1 , H − 2}  for every non-exceptional θ', C.gold, Q(S, 0, 'Matching every history up to depth H', 0.6) * f1, 19);
    const hq = Q(S, 0, 'a four-by-four Hankel certificate', 0.6) * f1;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) cell83(1020 + j * 82, 240 + i * 62, 76, 56, 'a' + '₀₁₂₃₄₅₆'[i + j], C.cyan, clamp(hq * 1.6 - (i + j) / 8), 20, 0.12 + 0.1 * (i + j));
    lbl('J = (a_(i+j)) ,  a_n = 2t 2^(−n) Im(B_ζⁿ)₁₁', 1360, 320, C.cyan, hq, 15, 'left');
    lbl('weights kept , not divided out', 1360, 350, C.dim, hq, 14, 'left');
    chip(1395, 520, 780, 56, 'det J = 81 t⁴ sin⁴(2θ) / 65536 ,  J⁻¹ = M(cos 2θ) / (t sin 2θ)', C.cyan, hq, 19);
    const eq = Q(S, 0, 'a small enough weighted error still forces four states', 0.6) * f1;
    chip(1395, 610, 780, 58, 'Δ_H ≤ ε < d(1 − d)|sin 2θ| / 1638400  ⇒  k ≥ 4', C.green, eq, 21);
    lbl('θ = π/4 , d = 1/2 :  ε < 3/11468800 ≈ 2.6 × 10⁻⁷ ; rank Y ≤ k while ‖J − Y‖ ≤ 8ε', 1395, 670, C.dim, eq, 14);
  }
  const q = Q(S, 1, 'For rational source data', 0.6, 0.3);
  if (q > 0) {
    const bq = Q(S, 1, 'an explicit threshold for every state count', 0.6);
    const x0 = 210, y0 = 720, bw = 70, gp = 22, hs = 2.4;
    plotAxes(180, y0, 760, 420, bq, '', 'log₁₀ log₁₀ (1/ε_k)'); lbl('state count k', 560, y0 + 58, C.dim, bq, 17);
    EPSK83.forEach(([k, l1, l2], i) => { const qq = clamp(bq * 1.6 - i / 10), x = x0 + i * (bw + gp), h = l2 * hs; fillBox(x, y0 - h, bw, h, C.mag, qq * 0.45); rect63(x, y0 - h, bw, h, C.mag, qq, 1.6); lbl(l2.toFixed(1), x + bw / 2, y0 - h - 12, C.white, qq, 16); lbl(String(k), x + bw / 2, y0 + 26, C.dim, qq, 16); });
    chip(1395, 262, 780, 56, 'd = 2/7 , θ = π/4 :  (u, v, a, b, C) = (2, 7, 0, −1, 1)', C.gold, Q(S, 1, 'at d two sevenths', 0.6), 20);
    const pq = Q(S, 1, 'a published lower bound on polynomial minima', 0.6);
    box(1010, 320, 770, 150, C.cyan, pq, 2, 'rgba(0,25,40,0.45)');
    lbl('integer objective g on a compact polytope of comparators , g_* > 0', 1395, 360, C.white, pq, 16);
    lbl('minimum bound : Jeronimo–Perrucci–Tsigaridas , arXiv:1112.0544 , Thm 1', 1395, 400, C.cyan, pq, 15);
    lblG('ε_k = (16 L̃ D^ν)^(−ν 2^(ν−1) D^ν) / (Q √(6(N+1)))', 1395, 445, C.white, pq, 18);
    const dq = Q(S, 1, 'It is doubly exponential', 0.6);
    chip(1395, 540, 780, 58, 'log log(1/ε_k) = Θ(k² log k)', C.mag, dq, 25);
    const oq = Q(S, 1, 'epsilon one is about', 0.6);
    chip(1395, 640, 780, 64, 'ε₁ ≈ 10^(−1.44 × 10⁷)', C.green, oq, 30);
    lbl('inverted : k(H, ε) ≥ K(ε) + 1 , K(ε) ~ √(log log(1/ε) / log log log(1/ε))', 1395, 710, C.dim, oq, 14);
  }
};

/* ---- 07 UPPER BOUNDS ---- */
SCENES.upper = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Whether a small fixed error', 'open']]);
  const f1 = 1 - Q(S, 1, 'Even one constant state', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Near an exceptional angle', 0.6) * f1;
    chip(550, 262, 800, 56, 'Δ_H(K_d ; q*) ≤ min{1 , 2H |sin(δ/2)|} ,  θ = θ* + δ', C.gold, q, 20);
    const pq = Q(S, 0, 'errs by at most two H times the sine', 0.6) * f1;
    const [xS, yS] = sc83(170, 700, 740, 370, 0, 12, 0, 0.65);
    plotAxes(170, 700, 740, 370, pq, 'depth H', 'full-record TV , δ = 0.05 , d = 1/2');
    curve(p => [xS(p * 12), yS(2 * p * 12 * Math.sin(0.025))], 40, C.gold, pq, 3); lbl('bound 2H sin(δ/2)', xS(10.5), yS(0.56) - 8, C.gold, pq, 15, 'right');
    TVH83.forEach(([H, v]) => dot(xS(H), yS(v), 8, 'c', pq));
    lbl('dots : sampled compatible states , all 2^H words', xS(0.5), yS(0.6), C.cyan, pq, 15, 'left');
    const bq = Q(S, 0, 'At d one half', 0.6) * f1;
    lbl('d = 1/2 , θ = 10⁻⁶ , H = 10000 :  H|δ| = 0.01', 1395, 262, C.white, bq, 19);
    const by = 700, sc = 95;
    [['3 states', Math.log10(3), 'error ≤ 0.01', C.green, 1180], ['≥ 9998 states', Math.log10(9998), 'exact', C.red, 1520]].forEach(([s, l, e, col, x]) => { const h = l * sc * bq; fillBox(x, by - h, 150, h, col, bq * 0.4); rect63(x, by - h, 150, h, col, bq, 1.8); lbl(s, x + 75, by + 30, col, bq, 19); lbl(e, x + 75, by - h - 14, C.white, bq, 17); });
    lbl('log scale', 1395, 330, C.dim, bq, 14);
    line(1150, by, 1700, by, C.dim, bq, 1.2);
  }
  const q = Q(S, 1, 'Even one constant state', 0.6, 0.3);
  if (q > 0) {
    chip(550, 262, 800, 56, 'T₀ = T₁ = 1/2 ,  p = 1 ,  f = U_d/2 ,  U_d = 1/2 + √((d/2)(1 − d/2))', C.cyan, q, 17);
    const pq = Q(S, 1, 'keeps the error below one half', 0.6);
    const [xS, yS] = sc83(170, 700, 740, 360, 0, 1, 0, 0.6);
    plotAxes(170, 700, 740, 360, pq, 'd', 'sup over all depths of Δ_H ≤ U_d/2');
    dashed(170, yS(0.5), 910, yS(0.5), C.red, pq, 2); lbl('1/2', 905, yS(0.5) - 10, C.red, pq, 16, 'right');
    curve(p => { const r = UD83[Math.round(p * (UD83.length - 1))]; return [xS(r[0]), yS(r[1])]; }, UD83.length - 1, C.cyan, pq, 3);
    lbl('U_d/2 : one state , every depth , every compatible ρ', xS(0.5), yS(0.2), C.cyan, pq, 15);
    const oq = Q(S, 1, 'Whether a small fixed error', 0.6);
    box(1010, 300, 770, 300, C.vio, oq, 2, 'rgba(20,10,40,0.5)');
    lbl('OPEN IN THE VOLUME', 1395, 350, C.vio, oq, 22);
    lblG('fixed small ε > 0 :  k(H, ε) → ∞  or bounded ?', 1395, 420, C.white, oq, 22);
    lbl('four-state bound : one fixed k ;  ε_k shrink as k grows', 1395, 480, C.dim, oq, 15);
    lbl('2H|sin(δ/2)| grows with H ;  U_d/2 only covers large ε', 1395, 515, C.dim, oq, 15);
  }
};

/* ---- 08 COMPLEX FILTERS ---- */
SCENES.filter = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The effect is always rank one', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Each one is a filter', 0.6) * f1;
    chip(550, 262, 800, 56, 'G_p = √(p/c) P_ξ + √((1 − p)/(1 − c)) (I − P_ξ) ,  c = d/2', C.gold, q, 18);
    const cx = 450, cy = 540;
    fillEll83(cx, cy, 250, 70, C.cyan, q * 0.08); ell83(cx, cy, 250, 70, C.cyan, q, 2);
    lbl('doublet (e , f)', cx + 230, cy + 95, C.cyan, q, 17, 'right');
    arrow(cx, cy, cx, cy - 210, C.gold, q, 3.5); lbl('singlet ξ', cx + 18, cy - 200, C.gold, q, 18, 'left');
    const rq = Q(S, 0, 'reweights the singlet', 0.6) * f1;
    const pp = 0.25 + 0.25 * (0.5 + 0.5 * Math.sin(t * 0.9));
    [['source : c', 0.25, C.dim], ['filtered : p', pp, C.gold]].forEach(([s, v, col], i) => { const x = 790 + i * 80, h = v * 400; fillBox(x, 690 - h, 50, h, col, rq * 0.45); rect63(x, 690 - h, 50, h, col, rq, 1.6); lbl(s, x + 25, 720 + i * 26, col, rq, 14); });
    lbl('ξ-population', 855, 470, C.white, rq, 15);
    const cq = Q(S, 0, 'Now classify every complex', 0.6) * f1;
    chip(1395, 262, 780, 56, 'σ = R κ(G_p ρ G_p) R† ,  F = R κ(G_p⁻¹ E G_p⁻¹) R†', C.cyan, cq, 20);
    chip(1395, 335, 780, 56, 'Φ_j = ½ Ad(R κ(V_j) R†) on all of M₃(ℂ)', C.cyan, cq, 21);
    const pq = Q(S, 0, 'one number p between d over two and one half', 0.6) * f1;
    const lx0 = 1060, lx1 = 1730, ly = 470;
    line(lx0, ly, lx1, ly, C.white, pq, 3); dot(lx0, ly, 10, 'c', pq); dot(lx1, ly, 10, 'c', pq);
    lbl('c = d/2', lx0, ly + 34, C.cyan, pq, 17); lbl('1/2', lx1, ly + 34, C.cyan, pq, 17);
    const mx = lx0 + (lx1 - lx0) * (pp - 0.25) / 0.25; dot(mx, ly, 15, 'g', pq); lblG('p', mx, ly - 22, C.gold, pq, 22);
    lbl('one p per model , unique ;  different p are not equivalent', 1395, 540, C.white, pq, 16);
    const uq = Q(S, 0, 'up to a single unitary', 0.6) * f1;
    chip(1395, 620, 780, 54, 'R ∈ U(3) fixed ,  κ = identity or one common conjugation', C.mag, uq, 19);
    lbl('the same R and κ act on the state , the effect and both branches', 1395, 680, C.dim, uq, 15);
  }
  const q = Q(S, 1, 'The effect is always rank one', 0.6, 0.3);
  if (q > 0) {
    chip(550, 262, 800, 56, 'rank F = 1 ,  λ(p) = c/2p + (1 − c)/2(1 − p)', C.gold, q, 21);
    const pq = Q(S, 1, 'its efficiency sweeps', 0.6);
    const [xS, yS] = sc83(170, 710, 740, 380, 0.25, 0.5, 0.92, 1.005);
    plotAxes(170, 710, 740, 380, pq, 'p ∈ [1/4 , 1/2]  (d = 1/2)', 'efficiency ‖F_p‖ = λ(p)');
    curve(p => { const r = LAM83[Math.round(p * (LAM83.length - 1))]; return [xS(r[0]), yS(r[1])]; }, LAM83.length - 1, C.gold, pq, 3);
    dashed(170, yS(1), 910, yS(1), C.white, pq * 0.6, 1.5); lbl('projection at both ends', 905, yS(1) - 10, C.white, pq, 14, 'right');
    const mq = Q(S, 1, 'from one half plus the root', 0.6);
    dot(xS(PEFF83), yS(0.5 + Math.sqrt(3 / 16)), 11, 'c', mq); lbl('min 1/2 + √(c(1 − c)) ≈ 0.933', xS(PEFF83), yS(0.5 + Math.sqrt(3 / 16)) + 32, C.cyan, mq, 15);
    const sq = Q(S, 1, 'At one special calibration', 0.6);
    dot(xS(0.4), yS(15 / 16), 11, 'm', sq); lbl('2/5 : 15/16 , span 8', xS(0.4) - 10, yS(15 / 16) - 50, C.mag, sq, 15, 'right'); line(xS(0.4), yS(15 / 16) - 12, xS(0.4) - 8, yS(15 / 16) - 44, C.mag, sq, 1.2);
    chip(1395, 262, 780, 56, '1 − λ = (p − c)(1 − 2p) / 2p(1 − p)  ⇒  legal ⟺ p ∈ [c , 1/2]', C.gold, pq, 18);
    chip(1395, 350, 780, 56, 'efficiency ∈ [ 1/2 + √(c(1 − c)) , 1 ]', C.cyan, mq, 23);
    chip(1395, 450, 780, 60, 'p = 2c/(1 + c) , c ≤ 1/3 :  effect span 8 , not 9', C.mag, sq, 21);
    lbl('the offset ν s(ρ) H is invisible to every native reading there', 1395, 510, C.dim, sq, 15);
    const oq = Q(S, 1, 'removes the hidden offset', 0.6);
    stamp('OFFSET ν = 0', 1395, 630, oq, C.green, 36, -0.04);
    lbl('two compatible mixed boundary states give opposite signs', 1395, 720, C.dim, oq, 15);
  }
};

/* ---- 09 SAME RECORDS, DIFFERENT STATES ---- */
SCENES.spectra = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Two pure worlds are orthogonal', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'one compatible mixed state', 0.6) * f1;
    chip(550, 262, 800, 56, 'd = 1/2 :  ρ_mix = (aa† + gg†)/2 ∈ K_(1/2)', C.cyan, q, 21);
    const by = 690, hs = 520;
    const groups = [['0.25', 'p = 1/4', 'one half, one half when p is one quarter', C.cyan], ['0.375', 'p = 3/8', 'one half, one half when p is one quarter', C.white], ['0.5', 'p = 1/2', 'two thirds, one third when p is one half', C.gold]];
    groups.forEach(([k, s, ph, col], g) => { const qq = Q(S, 0, ph, 0.6) * f1; SPEC83[k].forEach((v, i) => { const x = 190 + g * 250 + i * 62, h = Math.max(0, v) * hs; fillBox(x, by - h, 50, h, col, qq * 0.45); rect63(x, by - h, 50, h, col, qq, 1.6); }); lbl(s, 190 + g * 250 + 87, by + 32, col, qq, 18); });
    lbl('encoded spectrum σ_p(ρ_mix)', 550, 318, C.dim, q, 15);
    const tq = Q(S, 0, 'so purity and entropy are not fixed', 0.6) * f1;
    box(1010, 330, 770, 330, C.white, tq, 1.5, 'rgba(0,0,0,0.45)');
    [['p = 1/4', '(1/2 , 1/2 , 0)', 'purity 1/2', 'S = log 2 = 0.693'], ['p = 3/8', '(7/12 , 5/12 , 0)', 'purity 37/72', ''], ['p = 1/2', '(2/3 , 1/3 , 0)', 'purity 5/9', 'S = 0.637']].forEach((r, i) => { const y = 390 + i * 80; lbl(r[0], 1040, y, C.gold, tq, 18, 'left'); lblG(r[1], 1300, y, C.white, tq, 19); lbl(r[2], 1500, y, C.white, tq, 16, 'left'); lbl(r[3], 1500, y + 26, C.dim, tq, 14, 'left'); });
    lbl('all native joint tables identical (recomputed to depth 6)', 1395, 630, C.green, tq, 15);
  }
  const q = Q(S, 1, 'Two pure worlds are orthogonal', 0.6, 0.3);
  if (q > 0) {
    chip(550, 262, 800, 56, 'ψ± = (a ± i g)/√2 :  ⟨G_p ψ₊ , G_p ψ₋⟩ = (4p − 1)/3', C.cyan, q, 19);
    const pq = Q(S, 1, 'overlap one third under another', 0.6);
    const [xS, yS] = sc83(170, 690, 740, 330, 0.25, 0.5, 1.85, 2.02);
    plotAxes(170, 690, 740, 330, pq, 'p', 'trace distance of the encoded pair');
    curve(p => { const r = DIST83[Math.round(p * (DIST83.length - 1))]; return [xS(r[0]), yS(r[1])]; }, DIST83.length - 1, C.gold, pq, 3);
    dot(xS(0.25), yS(2), 11, 'c', pq); lbl('2 : orthogonal', xS(0.25) + 16, yS(2) + 26, C.cyan, pq, 15, 'left');
    dot(xS(0.5), yS(4 * Math.SQRT2 / 3), 11, 'g', pq); lbl('4√2/3 : overlap 1/3', xS(0.5) - 14, yS(4 * Math.SQRT2 / 3) + 34, C.gold, pq, 15, 'right');
    const cq = Q(S, 1, 'no channel maps the second pair', 0.6);
    chip(550, 770, 800, 50, 'CPTP maps never increase trace distance : no p = 1/2 → p = 1/4 map', C.red, cq, 17);
    const uq = Q(S, 1, 'every history acts unitarily', 0.6);
    chip(1395, 262, 780, 56, 'each history : Ad U_h  — spectrum , entropy , fidelity kept', C.green, uq, 19);
    lbl('fixed algebra of both branches = span{ I , P_singlet } , population p', 1395, 320, C.dim, uq, 15);
    const eq = Q(S, 1, 'erasing the label', 0.6);
    const by = 690, hs = 380;
    ERASE83.forEach((v, i) => { const x = 1180 + i * 130, h = Math.max(0, v) * hs; fillBox(x, by - h, 100, h, C.mag, eq * 0.45); rect63(x, by - h, 100, h, C.mag, eq, 1.6); lbl(['11/16', '5/16', '0'][i], x + 50, by - h - 12, C.white, eq, 18); });
    lbl('label erased : Λ(X) = ½(V₀XV₀† + V₁XV₁†) on pure ψ₊', 1395, 740, C.mag, eq, 15);
    lbl('entropy 0 → 0.621 nats', 1395, 770, C.white, eq, 15);
  }
};

/* ---- 10 ONE MIXING CONTROL ---- */
SCENES.control = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Then four nine-by-nine tables', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'keep one pure preparation', 0.6) * f1;
    chip(550, 262, 800, 56, 'ρ₀ = ψψ† ,  ψ = √d a + i√(1 − d) g  (one preparation only)', C.cyan, q, 18);
    const sq = Q(S, 0, 'Its native words span eight dimensions', 0.6) * f1;
    const x0 = 200, y0 = 690, bw = 62, gp = 22, hs = 34;
    plotAxes(180, y0, 760, 350, sq, '', 'dim span of native words (d = 0.2 , θ = π/4)'); lbl('depth ℓ', 560, y0 + 56, C.dim, sq, 17);
    SPAN83.forEach((v, i) => { const qq = clamp(sq * 1.6 - i / 12), x = x0 + i * (bw + gp), h = v * hs; fillBox(x, y0 - h, bw, h, C.cyan, qq * 0.4); rect63(x, y0 - h, bw, h, C.cyan, qq, 1.5); lbl(String(v), x + bw / 2, y0 - h - 10, C.white, qq, 16); lbl(String(i), x + bw / 2, y0 + 26, C.dim, qq, 15); });
    dashed(180, y0 - 8 * hs, 940, y0 - 8 * hs, C.cyan, sq, 1.5); lbl('8 = dim S_c', 190, y0 - 8 * hs - 10, C.cyan, sq, 15, 'left');
    const nq = Q(S, 0, 'adds a ninth column', 0.6) * f1;
    dashed(180, y0 - 9 * hs, 940, y0 - 9 * hs, C.gold, nq, 2); lbl('9 = dim Herm₃ : one N column', 190, y0 - 9 * hs - 10, C.gold, nq, 15, 'left');
    const mq = Q(S, 0, 'any single control that mixes the singlet', 0.6) * f1;
    chip(1395, 262, 780, 56, '[N , P_ξ] ≠ 0  ⇒  N r_k N† ∉ S_c for some k ≤ 8', C.gold, mq, 21);
    lbl('det(P_ξ − cI) = c²(1 − c) > 0 forbids N†D_cN = λD_c with λ ≠ 1', 1395, 320, C.dim, mq, 15);
    const pq = Q(S, 0, 'makes the closure all of P U three', 0.6) * f1;
    chip(1395, 420, 780, 60, 'closure of all forward words = Ad PU(3)', C.green, pq, 25);
    lbl('cross blocks : Σ_i ‖(I − P_ξ) X_i ξ‖² = 3s − s² > 0 ,  s = 1 − |⟨ξ, Nξ⟩|²', 1395, 480, C.dim, pq, 14);
    lbl('includes d = 2/3 and N ξ ⊥ ξ ;  no inverse control is installed', 1395, 510, C.dim, pq, 14);
    const cx = 1395, cy = 640;
    for (let i = 0; i < 40; i++) { const a1 = rnd(i, 83) * TAU, rr = 90 * Math.sqrt(rnd(i, 84)), qq = clamp(pq * 1.6 - i / 50); dot(cx + rr * Math.cos(a1 + t * 0.2), cy + 0.5 * rr * Math.sin(a1 + t * 0.2), 4, 'n', qq); }
    ell83(cx, cy, 100, 52, C.green, pq, 2);
  }
  const q = Q(S, 1, 'Then four nine-by-nine tables', 0.6, 0.3);
  if (q > 0) {
    const names = ['H', 'H⁰', 'H¹', 'H^N'];
    TAB83.forEach((M, k) => { const x = 160 + k * 196, qq = clamp(q * 1.5 - k / 6); heat83(x, 320, M, 18, qq, C.cyan, { k: 2.2, rowcol: (i, j) => i === 0 ? C.gold : (j === 8 ? C.mag : C.cyan) }); lblG(names[k], x + 81, 300, C.white, qq, 20); });
    lbl('gold row : mass (both outcomes)   cyan : yes events   magenta : the N column', 550, 520, C.dim, q, 14);
    lbl('example : d = 0.4 , θ = 0.8 , one random mixing N', 550, 548, C.dim, q, 14);
    const nq = Q(S, 1, 'three hundred twenty-four indexed numbers', 0.6);
    chip(550, 620, 800, 58, '324 = 36 mass + 288 yes ,  depth ≤ 12 ,  N at most twice', C.gold, nq, 21);
    const fq = Q(S, 1, 'force any complex competitor', 0.6);
    chip(1395, 262, 780, 56, 'σ₀ = R₀ κ(ρ₀) R₀† ,  F = R₀ κ(E) R₀†', C.green, fq, 22);
    chip(1395, 335, 780, 56, 'B_j = ½ Ad(R₀ κ(V_j) R₀†) ,  B_N = Ad(R₀ κ(N) R₀†)', C.green, fq, 20);
    lbl('competitor : any σ₀ , 0 ≤ F ≤ I , CP B₀ , B₁ with TP sum , CPTP B_N on ℂ³', 1395, 395, C.dim, fq, 14);
    lbl('Hankel similarity → CPTP inverses (Nayak–Sen) → positivity → Wigner', 1395, 425, C.dim, fq, 14);
    stamp('ONE UNITARY OR CONJUGATION', 1395, 520, fq, C.green, 26, -0.04);
    const rq = Q(S, 1, 'A control that does not mix', 0.6);
    box(1010, 600, 770, 150, C.red, rq, 2, 'rgba(40,0,10,0.45)');
    lbl('[N , P_ξ] = 0 :  σ₀ = G_p ρ₀ G_p , F = G_p⁻¹ E G_p⁻¹ match every word', 1395, 645, C.white, rq, 16);
    lblG('d = 2/3 , p = 5/12 :  efficiency λ_p = 34/35 < 1', 1395, 700, C.red, rq, 22);
  }
};

/* ---- 11 ORDERED CONES ---- */
SCENES.cone = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The proof squeezes the cone', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'any real ordered model', 0.6) * f1;
    cone83(320, 700, 340, 170, C.gold, q, 0.12, t * 0.6, 0.1);
    lbl('K ⊂ V , dim V ≤ 9', 320, 300, C.gold, q, 19);
    const cq = Q(S, 0, 'a closed cone with compact base', 0.6) * f1;
    lbl('closed , pointed , generating , compact base', 320, 760, C.dim, cq, 15);
    const sq = Q(S, 0, 'sending its cone onto', 0.6) * f1;
    arrow(470, 480, 600, 480, C.white, sq, 3); lblG('S', 535, 460, C.white, sq, 26);
    cone83(780, 700, 340, 170, C.cyan, sq, 0, 0, 0.1);
    lbl('PSD₃ (qutrit)', 780, 300, C.cyan, sq, 19);
    const eq = Q(S, 0, 'a positive effect', 0.6) * f1;
    chip(1395, 262, 780, 56, 'u > 0 on nonzero K ,  base compact ,  0 ≤ e ≤ u', C.gold, eq, 21);
    const mq = Q(S, 0, 'three positive maps', 0.6) * f1;
    chip(1395, 335, 780, 56, 'B_a(K) ⊆ K ,  u∘(B₀ + B₁) = u ,  u∘B_N = u', C.gold, mq, 21);
    lbl('no Hilbert space , no Born rule , no CP , no self-duality assumed', 1395, 395, C.dim, mq, 15);
    const fq = Q(S, 0, 'The same four tables force', 0.6) * f1;
    chip(1395, 480, 780, 62, 'S(K) = PSD₃ ,  S s₀ = ρ₀ ,  u = Tr∘S', C.cyan, fq, 24);
    chip(1395, 560, 780, 56, 'e = Tr(E S ·) ,  S B_a = A_a S on all of V', C.cyan, fq, 21);
    lbl('dim V = 9 is forced by rank H = 9 ; the labelled S is unique', 1395, 620, C.dim, fq, 15);
  }
  const q = Q(S, 1, 'The proof squeezes the cone', 0.6, 0.3);
  if (q > 0) {
    const mg = Q(S, 1, 'both equal to that cone', 0.8);
    const w1 = lerp(110, 170, mg), w3 = lerp(230, 170, mg);
    cone83(520, 740, 320, w3, C.mag, q, 0, 0, 0.05);
    cone83(520, 740, 320, 170, C.gold, q, 0.08 * (1 - mg), t * 0.6, 0.06);
    cone83(520, 740, 320, w1, C.cyan, q, 0, 0, 0.08);
    lbl('cyan : L_in = closure of cone of the orbit U_w ρ₀ U_w†', 160, 270, C.cyan, q, 15, 'left');
    lbl('gold : S(K)', 160, 295, C.gold, q, 15, 'left');
    lbl('magenta : O_out = dual of the effect orbit cone', 160, 320, C.mag, q, 15, 'left');
    lblG('L_in ⊆ S(K) ⊆ O_out', 520, 790, C.white, q, 22);
    stamp('ALL THREE = PSD₃', 520, 590, mg, C.green, 28, -0.04);
    const tq = Q(S, 1, 'a tenth unreachable direction', 0.6);
    box(1010, 260, 770, 190, C.orange, tq, 2, 'rgba(40,20,0,0.45)');
    lbl('TENTH DIRECTION', 1395, 300, C.orange, tq, 20);
    lblG('V₁₀ = Q ⊕ ℝ ,  K₁₀ = PSD₃ × ℝ₊', 1395, 345, C.white, tq, 21);
    lblG('B_j(X, t) = (A_j X , t/2) ,  B_N(X, t) = (A_N X , t)', 1395, 385, C.white, tq, 19);
    lbl('same records ; t is never reached ; outside the bound dim ≤ 9', 1395, 425, C.dim, tq, 14);
    const uq = Q(S, 1, 'an unclosed countable cone', 0.6);
    box(1010, 480, 770, 190, C.orange, uq, 2, 'rgba(40,20,0,0.45)');
    lbl('UNCLOSED CONE', 1395, 520, C.orange, uq, 20);
    lblG('K₀ = finite-word cone of U_w ρ₀ U_w†', 1395, 565, C.white, uq, 21);
    lbl('countably many rays , closure = PSD₃ , base not compact', 1395, 605, C.dim, uq, 15);
    lbl('dropping only closedness is not enough : both must go', 1395, 640, C.dim, uq, 14);
  }
};

/* ---- 12 FINITE NOISE ---- */
SCENES.noise = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Exactness is lost', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'one fixed source is stable', 0.6) * f1;
    const cx = 500, cy = 510, R = 200;
    const ap = Q(S, 0, 'approaches the qutrit density matrices', 1.6) * f1;
    const wob = 0.22 * (1 - 0.85 * ap);
    fillEll83(cx, cy, R, R, C.cyan, q * 0.1); ring(cx, cy, R, C.cyan, q, 2.5);
    const pts = []; for (let i = 0; i <= 90; i++) { const a1 = i / 90 * TAU; const rr = R * (1 + wob * (0.6 * Math.sin(4 * a1 + t * 0.5) + 0.4 * Math.cos(7 * a1 - t * 0.3))); pts.push([cx + rr * Math.cos(a1), cy + rr * Math.sin(a1)]); }
    strokePoly(pts, C.gold, q, 2.5);
    lbl('D : qutrit density matrices', cx, cy + R + 50, C.cyan, q, 16);
    lbl('B = S(base of K)', cx, cy - R - 60, C.gold, q, 17);
    const eq = Q(S, 0, 'With small table errors', 0.6) * f1;
    chip(1395, 262, 780, 56, 'max |H̃ − H| ≤ ε ,  9ε < σ_min(H)  ⇒  dim V = 9', C.gold, eq, 20);
    chip(1395, 345, 780, 56, 'S = L⁻¹M :  u = Tr∘S , e = Tr(E S ·) exact , ‖D_a − Ad U_a‖ ≤ β', C.gold, eq, 17);
    chip(1395, 450, 780, 62, 'd_H(B , D) ≤ max{ τ + g(q_n) , 6b(τ + F_n) }', C.cyan, ap, 23);
    lbl('→ 0 as ε → 0 , for each fixed source and prefix choice', 1395, 510, C.white, ap, 16);
    const nq = Q(S, 0, 'a finite orbit net', 0.6) * f1;
    lbl('τ-net of pure states from finitely many forward words of length ≤ n', 1395, 580, C.dim, nq, 15);
    lblG('F_n = (1 + β)ⁿ − 1 ,  q_n = (1 + β)ⁿ(1 + γ) − 1', 1395, 620, C.white, nq, 19);
  }
  const q = Q(S, 1, 'Exactness is lost', 0.6, 0.3);
  if (q > 0) {
    const pq = Q(S, 1, 'Depolarised polyhedral cones', 0.6);
    const cx = 450, cy = 520, R = 190;
    ring(cx, cy, R, C.cyan, pq, 2.5);
    const poly = ringPts(cx, cy, R, 11, -Math.PI / 2 + 0.1); fillPoly(poly, C.gold, pq * 0.15); strokePoly(poly, C.gold, pq, 2.5); poly.forEach(p => dot(p[0], p[1], 7, 'g', pq));
    ring(cx, cy, R * 0.86, C.white, pq * 0.6, 1.5);
    lbl('(1 − t)D + t I/3 ⊆ P_t ⊆ D', cx, cy + R + 44, C.white, pq, 17);
    chip(cx, 262, 760, 50, 'P_t : finitely many extreme rays , table error ≤ 13t', C.gold, pq, 18);
    stamp('NEVER PSD₃', cx, cy + 10, Q(S, 1, 'never become the qutrit cone', 0.6), C.red, 30, -0.04);
    const nq = Q(S, 1, 'controls approaching non-mixing', 0.6);
    const [xS, yS] = sc83(1050, 650, 680, 330, Math.log10(0.002), Math.log10(0.2), 0, 0.42);
    plotAxes(1050, 650, 680, 330, nq, 'h (log) : N_h = exp(ihG) → I', 'd = 1/2');
    dashed(1050, yS(0.375), 1730, yS(0.375), C.red, nq, 2.5); lbl('base gap (1 − c)/2 = 0.375', 1730, yS(0.375) - 12, C.red, nq, 15, 'right');
    NONU83.forEach(([h, lam, err]) => dot(xS(Math.log10(h)), yS(err), 9, 'c', nq));
    curve(p => { const r = NONU83[Math.round(p * (NONU83.length - 1))]; return [xS(Math.log10(r[0])), yS(r[2])]; }, NONU83.length - 1, C.cyan, nq, 2);
    lbl('table error → 0', xS(Math.log10(0.006)), yS(0.03) - 14, C.cyan, nq, 15);
    const gq = Q(S, 1, 'while the base stays one minus c, over two, away', 0.6);
    chip(1395, 730, 780, 52, 'no modulus uniform over all mixing N', C.red, gq, 20);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Realification, the Choi–Effros multiplication', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['CLASSICAL', 'θ ∈ (π/2)ℤ · k ≥ H − 2', C.gold, 'Classical memory is finite only at exceptional angles'], ['REAL', 'm_min = 2 · 3 · 6', C.cyan, 'real models need two, three or six dimensions'], ['COMPLEX', 'p ∈ [c , 1/2]', C.mag, 'complex models are one-parameter filters'], ['ONE CONTROL', '324 → PU(3)', C.green, 'one mixing control pins the source'], ['ORDERED', 'S(K) = PSD₃', C.orange, 'even among ordered cones'], ['NOISE', 'stable , not exact', C.red, 'stably but not exactly under noise']];
    emblem83(W / 2, 580, 130, Q(S, 0, 'Classical memory is finite', 1.0) * (1 - Q(S, 1, 'Realification', 0.5)) * fade, t);
    items.forEach(([a1, a2, col, ph], i) => { const x = 230 + i * 292, q = Q(S, 0, ph) * fade; box(x - 130, 240, 260, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 19); });
    lbl('PUBLISHED · realification (McKague–Mosca–Gisin) · Choi–Effros multiplication (Prunaru) · Wigner theorem · polynomial minima (Jeronimo–Perrucci–Tsigaridas) · Nayak–Sen', W / 2, 460, C.cyan, Q(S, 1, 'Realification, the Choi–Effros multiplication') * fade, 15);
    lbl('CLASSICAL · Perron–Frobenius · Cayley–Hamilton · Hankel factorisation · Haar averaging · Lie-group integration · Schur · trace-distance contraction', W / 2, 505, '#8fbcff', Q(S, 1, 'are published inputs') * fade, 15);
    lbl('VOLUME · θ criterion · triangle · disc threshold d* · real dimension six · H − 2 and Hankel bounds · upper bounds · p-filters · one-control identification · cone copy · noise limits', W / 2, 550, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · 198 checks : SDP membership · contrasts · d* · det 6561/2³⁶ sin⁷ · Hankel det · ε_k · TV bound · λ(p) · spectra · span 8 → 9 · tables · noise models', W / 2, 595, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 680, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    emblem83(W / 2, 360, 160, a, t);
    txt('PREDICTIVE WAVES III · SIX', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 相容预测波 第三部 · 正实现与实记忆 · TRURETURING FILM 083', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Classical only at exceptional angles, real in two, three or six dimensions, complex up to one filter.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'PREDICTIVE WAVES III', classical: 'CLASSICAL CRITERION', triangle: 'EXCEPTIONAL TRIANGLE', disc: 'REAL DISC', six: 'REAL DIMENSION SIX', records: 'FINITE RECORDS', upper: 'UPPER BOUNDS', filter: 'COMPLEX FILTERS', spectra: 'SAME RECORDS', control: 'ONE MIXING CONTROL', cone: 'ORDERED CONES', noise: 'FINITE NOISE', finale: 'LEDGER' });

function poster083() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  emblem83(460, 500, 250, 1, t);
  txt('k_min < ∞  ⟺  θ ∈ (π/2)ℤ', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('m_min = 2 · 3 · 6', 1320, 480, { size: 48, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('σ = G_p ρ G_p ,  p ∈ [d/2 , 1/2]', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('AURIC 相容预测波 第三部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('PREDICTIVE WAVES III · SIX', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('正 实 现 · 实 记 忆', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 083', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster083;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
