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

/* ---- film 070: AURIC-Langlands II · context and spectral reconstruction ---- */
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
const _po70 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po70.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po70.set(key, off); }
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
/* ---- film 070 helpers ---- */
const AUTO70 = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 1], [1, 2, 1, 1], [2, 2, 1, 1], [2, 3, 1, 1], [3, 3, 1, 1], [3, 3, 1, 1], [3, 3, 1, 1]];
const TREE70 = { abcd: -8.142, acbd: -15.193, adbc: -15.193 };
function ell70(cx, cy, rx, ry, col, a, lw = 1.5, a0 = 0, a1 = Math.PI * 2) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), 0, a0, a1); ctx.stroke(); ctx.restore();
}
function fillEll70(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function arrowLbl70(x1, y1, x2, y2, s, col, a, dy = -14, size = 20) { arrow(x1, y1, x2, y2, col, a, 2.5); if (s) lblG(s, (x1 + x2) / 2, (y1 + y2) / 2 + dy, col, a, size); }
function node70(x, y, s, col, a, acc = false) { if (a <= 0) return; ring(x, y, 28, col, a, 2.5); if (acc) ring(x, y, 22, col, a, 1.6); lbl(s, x, y + 8, col, a, 20); }
function cells70(x, y, n, cw, cols, a, labels) {
  if (a <= 0) return;
  for (let i = 0; i < n; i++) { const c = cols[i] || C.cyan; fillBox(x + i * cw, y, cw - 6, cw - 6, c, a * 0.4); rect63(x + i * cw, y, cw - 6, cw - 6, c, a, 1.6); if (labels && labels[i]) lbl(labels[i], x + i * cw + (cw - 6) / 2, y + (cw - 6) / 2 + 7, C.white, a, 18); }
}
function mat70(x, y, rows, a, col = C.white, cw = 70, rh = 48, size = 24) {
  if (a <= 0) return;
  const w = rows[0].length * cw, h = rows.length * rh;
  line(x - 8, y - 6, x - 8, y + h - 6, col, a, 2.5); line(x + w + 8, y - 6, x + w + 8, y + h - 6, col, a, 2.5);
  rows.forEach((r, i) => r.forEach((s, j) => lblG(s, x + j * cw + cw / 2, y + i * rh + rh / 2 + 4, s === '0' ? C.dim : col, a, size)));
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['what a legal future is', 'LEGAL FUTURES', 'which gate words, which effects?', C.gold], ['which data can be rebuilt from finite readings', 'RECONSTRUCTION', 'what do finite readings determine?', C.cyan], ['how an explicit boundary model becomes', 'SPECTRAL EXTENSION', 'boundary model → SO₅ local system', C.mag]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 230 + i * 170, 860, 140, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 275 + i * 170, col, q, 22); lblG(s, 1360, 335 + i * 170, C.white, q, 30); });
  chip(470, 740, 520, 56, 'clocks · ports · permissions · copies', C.dim, Q(S, 0, 'with every resource kept in view', 0.6), 20);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 320, 58, 'legal futures', C.gold, rp, 22); chip(330, 445, 320, 58, 'boundary responses', C.cyan, rp, 22); chip(330, 530, 320, 58, 'genus-four curve', C.mag, rp, 22);
  box(1440, 340, 340, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('spectral extension', 1610, 410, C.green, rp, 22); lblG('Sp₄ → SO₅', 1610, 470, C.white, rp, 32);
  txt(scramble('AURIC–LANGLANDS II · CONTEXT', rp, 470), W / 2, 760, { size: 66, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC–Langlands 第 二 部 · 语 境 与 谱 重 构', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 070 · AURIC_LANGLANDS_CONTEXT_AND_SPECTRAL_RECONSTRUCTION_THEORY', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FUTURES ---- */
SCENES.futures = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'kernel-checked in Lean', 'lean'], [1, 'while one latched bit', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Watching only the start', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a finite automaton decides which gate words are legal', 0.6) * f1;
    const X = [180, 400, 620, 840], y0 = 330;
    arrowLbl70(X[0] + 30, y0, X[1] - 32, y0, 'a', C.gold, q); arrowLbl70(X[1] + 30, y0, X[2] - 32, y0, 'a', C.gold, q); arrowLbl70(X[2] + 30, y0, X[3] - 32, y0, 'a', C.gold, q);
    ell70(X[0], y0 - 46, 18, 22, C.cyan, q, 2); lbl('b', X[0], y0 - 76, C.cyan, q, 18);
    ell70(X[2], y0 - 46, 18, 22, C.cyan, q, 2); lbl('b', X[2], y0 - 76, C.cyan, q, 18);
    curve(p => [X[1] - (X[1] - X[0]) * p, y0 + 30 + Math.sin(p * Math.PI) * 50], 30, C.cyan, q, 2); arrow(X[0] + 14, y0 + 36, X[0] + 6, y0 + 30, C.cyan, q, 2); lbl('b', (X[0] + X[1]) / 2, y0 + 106, C.cyan, q, 18);
    X.forEach((x, k) => node70(x, y0, 'q' + '₀₁₂₃'[k], k === 3 ? C.green : C.white, q, k === 3));
    lbl('only q₃ accepts · undefined steps do not happen', 510, 230, C.dim, q, 17);
    const pq = Q(S, 0, 'Propagating effects through all permission states', 0.6) * f1;
    const st = Math.min(9, Math.floor(clamp((u - lineAt(S, 0).s) / (lineAt(S, 0).e - lineAt(S, 0).s) * 1.4 - 0.25) * 10));
    const row = AUTO70[Math.max(0, st)];
    X.forEach((x, k) => { const h = row[k] * 50; if (pq > 0) { box(x - 24, 610 - 150, 48, 150, C.dim, pq * 0.4, 1); if (h) { fillBox(x - 24, 610 - h, 48, h, k === 3 ? C.green : C.cyan, pq * 0.45); rect63(x - 24, 610 - h, 48, h, k === 3 ? C.green : C.cyan, pq, 1.6); } } });
    lbl('dim U_q⁽ⁿ⁾ , n = ' + Math.max(0, st), 510, 650, C.white, pq, 19);
    const px = 1080, py = 640, pw = 680, ph = 360, xS = n => px + n / 12 * pw, yS = v => py - v / 12 * ph;
    plotAxes(px, py, pw, ph, pq, 'step n', 'Σ_q dim U_q⁽ⁿ⁾');
    for (let n = 0; n <= Math.max(0, st); n++) { const v = AUTO70[n].reduce((a2, b2) => a2 + b2, 0); dot(xS(n), yS(v), 7, 'c', pq); if (n > 0) { const v0 = AUTO70[n - 1].reduce((a2, b2) => a2 + b2, 0); line(xS(n - 1), yS(v0), xS(n), yS(v), C.cyan, pq, 2.5); } }
    const bq = Q(S, 0, 'stabilises within a bound', 0.6) * f1;
    dashed(xS(11), py, xS(11), py - ph, C.gold, bq, 2); lbl('B = |Q|d − |F|r = 11', xS(11) - 10, py - ph + 10, C.gold, bq, 18, 'right');
    lbl('stable from n = 7', xS(7), yS(8) - 22, C.green, bq, 18);
    lbl('d = 3 , r = 1 , |Q| = 4 , |F| = 1', px + pw / 2, py + 50, C.dim, pq, 16);
  }
  const q = Q(S, 1, 'Watching only the start', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'a chain of length L shows nothing', 0.6);
    for (let k = 0; k <= 5; k++) { node70(150 + k * 120, 300, 'q' + '₀₁₂₃₄₅'[k], k === 5 ? C.green : C.white, cq, k === 5); if (k < 5) arrow(150 + k * 120 + 30, 300, 150 + (k + 1) * 120 - 32, 300, C.dim, cq, 2); }
    const ns = clamp((u - lineAt(S, 1).s) / 4) * 6;
    for (let n = 0; n <= 5; n++) { const v = n >= 5 ? 1 : 0; fillBox(150 + n * 120 - 20, 430 - v * 60, 40, v * 60 + 2, v ? C.green : C.dim, cq * (ns > n ? 0.6 : 0)); lbl('n=' + n, 150 + n * 120, 455, C.dim, cq * (ns > n ? 1 : 0.3), 15); }
    lbl('dim U_q₀⁽ⁿ⁾ : 0, 0, 0, 0, 0, 1', 450, 500, C.white, cq, 18);
    const mq = Q(S, 1, 'a native task with eleven future classes', 0.8);
    lbl('eleven future classes → at least eleven memory states', 450, 575, C.gold, mq, 19);
    cells70(130, 600, 11, 60, Array(11).fill(C.gold), mq, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
    lbl('Lean · native_joint_future_memory_lower_bound · 11 ≤ |W|  ·  fixed-length code: 4 bits', 450, 710, C.green, Q(S, 1, 'kernel-checked in Lean', 0.6), 16);
    const lq = Q(S, 1, 'while one latched bit', 0.6);
    const px = 1040, pw = 760, y1 = 470, xS = v => px + (v + 1706) / 7 * pw;
    line(px, y1, px + pw, y1, C.dim, lq, 1.5);
    for (let v = -1706; v <= -1699; v++) { line(xS(v), y1 - 6, xS(v), y1 + 6, C.dim, lq, 1.2); lbl(String(v), xS(v), y1 + 32, C.dim, lq, 14); }
    fillBox(xS(-1705.048), y1 - 22, xS(-1704.834) - xS(-1705.048), 44, C.cyan, lq * 0.6); lbl('m(W₋)', xS(-1704.94), y1 - 36, C.cyan, lq, 18);
    fillBox(xS(-1700.573), y1 - 22, xS(-1700.355) - xS(-1700.573), 44, C.mag, lq * 0.6); lbl('m(W₊)', xS(-1700.46), y1 - 36, C.mag, lq, 18);
    dashed(xS(-1702.7), y1 - 80, xS(-1702.7), y1 + 50, C.gold, lq, 2.5); lbl('θ = −17027/10', xS(-1702.7), y1 - 92, C.gold, lq, 18);
    arrow(xS(-1702.7), y1 + 70, xS(-1700.573), y1 + 70, C.green, lq, 2); arrow(xS(-1700.573), y1 + 70, xS(-1702.7), y1 + 70, C.green, lq, 2);
    lbl('gap 2.12659007', (xS(-1702.7) + xS(-1700.573)) / 2, y1 + 100, C.green, lq, 18);
    chip(1420, 650, 640, 58, '|m̃ − m| < 2.12659007  ⇒  same bit · 2 latch states', C.green, lq, 21);
    lbl('σ(P) = 1{P₁₂ > 1/16} = 1{m ≥ θ} on the whole compatible domain', 1420, 320, C.dim, lq, 16);
  }
};

/* ---- 03 CONTEXT ---- */
SCENES.context = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A representation category resists compression', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Blind spots must respect composition', 0.6) * f1;
    fillEll70(480, 480, 340, 230, C.vio, q * 0.08); ell70(480, 480, 340, 230, C.vio, q, 2.5);
    lbl('N : old blind space (tests vanish)', 480, 270, C.vio, q, 19);
    const kq = Q(S, 0, 'The context blind kernel', 0.6) * f1;
    fillEll70(450, 510, 200, 130, C.cyan, kq * 0.12); ell70(450, 510, 200, 130, C.cyan, kq, 2.5);
    lblG('I_ctx', 450, 500, C.cyan, kq, 34);
    lbl('λ(C[f]) = 0 for every allowed context C[−]', 450, 545, C.white, kq, 16);
    const iq = Q(S, 0, 'is the largest tensor ideal', 0.6) * f1;
    ['g ∘ f', 'f ∘ h', 'f ⊗ k'].forEach((s, i) => { const ang = -0.55 + i * 0.55, x = 450 + 228 * Math.cos(ang), y = 510 + 150 * Math.sin(ang); dot(x, y, 6, 'c', iq); lbl(s, x + 16, y + 6, C.cyan, iq, 17, 'left'); });
    lbl('largest tensor ideal inside N · quotient keeps ⊗', 480, 760, C.green, iq, 20);
    const eq = Q(S, 0, 'Real one-copy readings miss', 0.6) * f1;
    box(1000, 260, 800, 470, C.dim, eq, 1.5, 'rgba(0,0,0,0.45)');
    lblG('ρ = I/2 + i a J₁₂     vs     σ = I/2', 1400, 320, C.white, eq, 28);
    lbl('ONE COPY · real effects', 1400, 400, C.cyan, eq, 19); lblG('Re ρ = Re σ', 1400, 450, C.white, eq, 28); stamp('SAME', 1650, 440, eq, C.cyan, 34, -0.05);
    lbl('TWO COPIES · real joint effects', 1400, 540, C.mag, eq, 19); lblG('Re(ρ⊗ρ) − Re(σ⊗σ) = −a² J⊗J', 1400, 590, C.white, eq, 28); stamp('DIFFERENT', 1660, 640, eq, C.mag, 34, -0.05);
    lbl('ρ ↦ ρ⊗ρ is not a free linear context: copies must be supplied', 1400, 700, C.dim, eq, 16);
  }
  const q = Q(S, 1, 'A representation category resists compression', 0.6, 0.3);
  if (q > 0) {
    const items = [['tensor functors keep every dimension', 'FIBER FUNCTORS', 'tr(id_V) = (dim V)·id₁  ⇒  dim F(V) = dim V', 'a surjection ω(V) ↠ F(V) is an isomorphism', C.cyan], ['semisimple categories have no proper tensor ideals', 'TENSOR IDEALS', 'Rep(G), G reductive : only 0 and everything', '25 → 15 real projection is equivariant, not a quotient functor', C.gold], ['sub-normalised operations admit duals', 'DUALS', 'CP, trace non-increasing : dualizable ⇔ dim H = 1', 'cup, cap and snake must all be legal operations', C.mag]];
    items.forEach(([ph, h, s1, s2, col], i) => { const qq = Q(S, 1, ph, 0.6), y = 250 + i * 190; box(260, y, 1400, 150, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, 960, y + 40, col, qq, 22); lblG(s1, 960, y + 90, C.white, qq, 28); lbl(s2, 960, y + 128, C.dim, qq, 16); });
  }
};

/* ---- 04 SOURCES ---- */
SCENES.sources = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Reading phase is not controlling it', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'real joint statistics give', 0.6) * f1;
    chip(W / 2, 250, 980, 64, 'Re(ρ ⊗ σ) = S⊗T − A⊗B   →   S , T , A⊗B', C.white, q, 26);
    const gq = Q(S, 0, 'On a graph of joint observations', 0.6) * f1;
    const oq = Q(S, 0, 'a global sign when some cycle is odd', 0.6) * f1;
    const tri = [[420, 380], [270, 640], [570, 640]];
    [[0, 1], [1, 2], [2, 0]].forEach(([i, j]) => line(tri[i][0], tri[i][1], tri[j][0], tri[j][1], C.dim, gq, 2.5));
    tri.forEach(p => { ring(p[0], p[1], 30, C.white, gq, 2.5); lbl(oq > 0.5 ? '±1' : 't', p[0], p[1] + 8, oq > 0.5 ? C.gold : C.white, gq, 20); });
    lbl('odd cycle', 420, 700, C.dim, gq, 18); lbl('t = t⁻¹  ⇒  t = ±1 : global sign only', 420, 750, C.gold, oq, 19);
    const bq = Q(S, 0, 'a free scale t against one over t', 0.6) * f1;
    const sq = [[1250, 390], [1550, 390], [1550, 640], [1250, 640]];
    [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([i, j]) => line(sq[i][0], sq[i][1], sq[j][0], sq[j][1], C.dim, gq, 2.5));
    const tt = (1.5 + 0.8 * Math.sin(t * 0.8)).toFixed(2), ti = (1 / (1.5 + 0.8 * Math.sin(t * 0.8))).toFixed(2);
    sq.forEach((p, k) => { ring(p[0], p[1], 34, k % 2 ? C.mag : C.cyan, gq, 2.5); lbl(bq > 0.5 ? (k % 2 ? ti : tt) : 't', p[0], p[1] + 8, k % 2 ? C.mag : C.cyan, gq, 18); });
    lbl('bipartite', 1400, 700, C.dim, gq, 18); lbl('t on one side, 1/t on the other : t_u t_v = 1 on edges', 1400, 750, C.cyan, bq, 19);
    lbl('positivity window : max κ(V₋) ≤ |t| ≤ 1 / max κ(V₊)', 1400, 800, C.dim, bq, 16);
  }
  const q = Q(S, 1, 'Reading phase is not controlling it', 0.6, 0.3);
  if (q > 0) {
    const eq = Q(S, 1, 'need a reference orthogonal to its own conjugate', 0.8);
    const L = ['exact non-real unitary from real processors', 'supp σ ⊥ supp σ̄', 'tr(σ σ̄) = 0', 'σ ↦ |+i⟩⟨+i| exactly', 'every given unitary'];
    L.forEach((s, i) => { const qq = eq * clamp(eq * 5 - i); chip(520, 270 + i * 92, 700, 62, s, i === 2 ? C.gold : C.cyan, qq, 22); if (i) lbl('⇔', 160, 270 + i * 92 - 38, C.dim, qq, 22); });
    const pq = Q(S, 1, 'such as the phase qubit', 0.6);
    const cx = 1120, cy = 390, R = 110; ring(cx, cy, R, C.gold, pq, 2); const ph = t * 1.3; line(cx, cy, cx + R * Math.cos(ph), cy - R * Math.sin(ph), C.gold, pq, 3); dot(cx + R * Math.cos(ph), cy - R * Math.sin(ph), 8, 'g', pq);
    lblG('|+i⟩ = (1, i)/√2 : ⟨+i|+ī⟩ = 0', cx, cy + R + 44, C.gold, pq, 22);
    const mq = Q(S, 1, 'A reference with nonzero overlap', 0.6);
    const px = 1330, py = 720, pw = 460, ph2 = 300, xS = n => px + (n - 1) / 7 * pw, yS = v => py - v / 0.5 * ph2;
    plotAxes(px, py, pw, ph2, mq, 'copies n', 'tr(σ σ̄)ⁿ');
    const hq = Q(S, 1, 'however many copies', 1.2);
    [0.3, 0.6].forEach((th, k) => { const v = (1 - th * th) / 2; for (let n = 1; n <= 8; n++) { if (hq * 8 >= n) { const y = yS(Math.pow(v, n)); dot(xS(n), y, 6, k ? 'm' : 'c', mq); } } lbl('θ = ' + th, xS(8) + 10, yS(Math.pow(v, 8)) - 10 - k * 20, k ? C.mag : C.cyan, mq, 15, 'left'); });
    lbl('σ_θ = (I + θY)/2 : ((1 − θ²)/2)ⁿ > 0', px + pw / 2, py - ph2 - 52, C.white, mq, 18);
    stamp('NEVER ZERO', px + pw / 2, py - 120, hq, C.red, 34, -0.05);
  }
};

/* ---- 05 SPECTRAL ---- */
SCENES.spectral = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Invertible is not stable', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'has nonzero discriminant', 0.6) * f1;
    const zs = [0.12, 0.31, 0.47, 0.66, 0.84];
    line(160, 330, 900, 330, C.dim, q, 1.5); zs.forEach((z, k) => { dot(160 + z * 740, 330, 10, 'c', q); lbl('z' + '₁₂₃₄₅'[k], 160 + z * 740, 300, C.cyan, q, 18); });
    lbl('spectral coordinates of z : all distinct ⇔ δ_z ≠ 0', 530, 385, C.white, q, 18);
    const bq = Q(S, 0, 'its powers form a basis', 0.6) * f1;
    cells70(250, 430, 5, 100, [C.cyan, C.cyan, C.cyan, C.cyan, C.cyan], bq, ['1', 'z', 'z²', 'z³', 'z⁴']);
    const tq = Q(S, 0, 'every other reading is rebuilt from traces', 0.6) * f1;
    chip(1350, 290, 720, 60, 'H_ij = Tr(z^{i+j}) ,  b_i = Tr(f zⁱ)', C.cyan, tq, 24);
    chip(1350, 380, 720, 60, 'c = H⁻¹ b ,  f = Σ c_j z^j', C.green, tq * clamp(tq * 2 - 0.5), 24);
    const dq = Q(S, 0, 'The trace matrix has determinant equal to the discriminant', 0.6) * f1;
    chip(1350, 470, 720, 60, 'H = Vᵀ V ,  det H = δ_z', C.gold, dq, 26);
    lbl('exact check : Q[x]/(x³ − 2), Q[x]/(x⁴ − x − 1), Q[x]/(x⁶ − 3x + 1)', 1350, 540, C.dim, dq, 16);
    stamp('NO ROOTS CHOSEN', 1350, 640, Q(S, 0, 'no roots are ever chosen', 0.5) * f1, C.gold, 38, -0.05);
    lbl('project : 18-dimensional algebra k[x]/(R̂), k = Q(p, v), readings A_R = Σ c_j(p, v) M_R^j', 530, 640, C.dim, dq, 16);
  }
  const q = Q(S, 1, 'Invertible is not stable', 0.6, 0.3);
  if (q > 0) {
    const eq = Q(S, 1, 'the coefficient grows like one over epsilon', 0.8);
    mat70(170, 290, [['2', 'ε'], ['ε', 'ε²']], q, C.white, 90, 60, 28); lbl('H', 130, 340, C.white, q, 26);
    lblG('det H = ε² ,  f = z / ε', 430, 470, C.white, q, 26);
    const px = 160, py = 790, pw = 560, ph = 240, xS = l => px + (l + 3) / 3 * pw, yS = l => py - l / 3 * ph;
    plotAxes(px, py, pw, ph, eq, 'log₁₀ ε', 'log₁₀ |c|');
    curve(p => { const l = -3 + 3 * p; return [xS(l), yS(-l)]; }, 30, C.red, eq, 3);
    [-3, -2, -1, 0].forEach(l => lbl(String(l), xS(l), py + 24, C.dim, eq, 14));
    const cq = Q(S, 1, "the project's exact collision", 0.6);
    const fx = 1000, fy = 280, fw = 800, fh = 480;
    box(fx, fy, fw, fh, C.dim, cq, 1.2, 'rgba(0,0,0,0.4)');
    const lq = Q(S, 1, 'confined to an explicit exceptional layer', 0.8);
    fillPoly([[fx + 60, fy + fh - 40], [fx + fw - 60, fy + 80], [fx + fw - 20, fy + 130], [fx + 100, fy + fh - 10]], C.gold, lq * 0.15);
    lbl('{B = 0} ∪ {P_M = 0}', fx + fw - 180, fy + 70, C.gold, lq, 19);
    const aq = Q(S, 1, 'extends to an analytic family', 1.2);
    const lam = 0.5 + 0.35 * Math.sin(t * 0.7) * aq;
    const P = l => [fx + 80 + (fw - 160) * l, fy + fh - 25 - (fh - 120) * l + 25 * Math.sin(l * 6)];
    curve(p => P(p * aq), 60, C.gold, cq, 2.5);
    const [x0, y0] = P(lam);
    dot(x0 - 60, y0, 11, 'c', cq); dot(x0 + 60, y0, 11, 'm', cq); dashed(x0 - 60, y0, x0 + 60, y0, C.white, cq, 2);
    lbl('W₂(λ)', x0 - 60, y0 - 22, C.cyan, cq, 17); lbl('W₃(λ)', x0 + 60, y0 - 22, C.mag, cq, 17);
    lbl('W₂ ≠ W₃ ,  same p, v, m ,  a(W₂) < a(W₃)', fx + fw / 2, fy + fh + 40, C.white, cq, 19);
    lbl('from the exact zero at λ₀ = 2/5 (interval contraction ≤ 576·10⁻³²)', fx + fw / 2, fy + fh + 75, C.dim, cq, 15);
  }
};

/* ---- 06 BOUNDARY ---- */
SCENES.boundary = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'tropical Grassmann relation', 'classical'], [1, 'a measured violation', 'theory']]);
  const f1 = 1 - Q(S, 1, 'obey a four-point law', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Boundaries compose by Schur elimination', 0.6) * f1;
    const sq = Q(S, 0, 'the response is the minimum energy', 1.4) * f1;
    const ports = [[180, 330], [180, 620], [800, 330], [800, 620]], inner = [[400, 400], [580, 400], [490, 560]];
    const E1 = [[0, 0], [1, 2], [2, 1], [3, 2]], E2 = [[0, 1], [1, 2], [0, 2]];
    E1.forEach(([p, i]) => line(ports[p][0], ports[p][1], inner[i][0], inner[i][1], C.dim, q * (1 - sq), 2));
    E2.forEach(([i, j]) => line(inner[i][0], inner[i][1], inner[j][0], inner[j][1], C.dim, q * (1 - sq), 2));
    inner.forEach(p => dot(p[0], p[1], 12, 'n', q * (1 - sq)));
    [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]].forEach(([i, j]) => line(ports[i][0], ports[i][1], ports[j][0], ports[j][1], C.cyan, q * sq * 0.7, 2));
    ports.forEach(p => { ring(p[0], p[1], 24, C.cyan, q, 2.5); });
    lbl('ports kept · interior eliminated', 490, 700, C.dim, q, 18);
    chip(1350, 270, 720, 60, 'S(Q) = A − B K⁻¹ Bᵀ ,  K > 0', C.cyan, q, 26);
    chip(1350, 360, 720, 60, 'uᵀ S u = min_v (u, v)ᵀ Q (u, v)', C.green, sq, 26);
    chip(1350, 450, 720, 60, 'staged elimination = one-shot elimination', C.white, Q(S, 0, 'staged elimination agrees', 0.6) * f1, 22);
    lbl('d/dt S = Lᵀ Q̇ L ,  ‖ΔS‖ ≤ (1 + M²/κ²) ‖ΔQ‖', 1350, 520, C.dim, Q(S, 0, 'staged elimination agrees', 0.6) * f1, 18);
    const gq = Q(S, 0, 'gluing two networks at a common port', 0.6) * f1;
    box(1000, 580, 300, 150, C.cyan, gq, 2, 'rgba(0,0,0,0.4)'); box(1400, 580, 300, 150, C.mag, gq, 2, 'rgba(0,0,0,0.4)');
    lbl('network 1', 1150, 620, C.cyan, gq, 18); lbl('network 2', 1550, 620, C.mag, gq, 18);
    const jx = 1350 - 50 * (1 - gq); ring(jx, 655, 18, C.gold, gq, 2.5); ring(1350 + 50 * (1 - gq), 655, 18, C.gold, gq, 2.5);
    lbl('L_Q = {(u, S u)} Lagrangian · gluing = composition of relations', 1350, 780, C.gold, gq, 18);
  }
  const q = Q(S, 1, 'obey a four-point law', 0.6, 0.3);
  if (q > 0) {
    const L = { a: [160, 300], b: [160, 640], c: [700, 300], d: [700, 640] }, x1 = [330, 470], x2 = [530, 470];
    [['a', x1], ['b', x1], ['c', x2], ['d', x2]].forEach(([k, p]) => line(L[k][0], L[k][1], p[0], p[1], C.cyan, q, 3));
    line(x1[0], x1[1], x2[0], x2[1], C.cyan, q, 3); dot(x1[0], x1[1], 10, 'n', q); dot(x2[0], x2[1], 10, 'n', q);
    Object.entries(L).forEach(([k, p]) => { ring(p[0], p[1], 26, C.white, q, 2.5); lbl(k, p[0], p[1] + 8, C.white, q, 22); });
    lbl('ℝ² at every node · d_ij = |det W_ij|', 430, 720, C.dim, q, 17);
    const pq = Q(S, 1, 'the minimum is attained twice', 0.8);
    const items = [['ab · cd', TREE70.abcd, C.dim], ['ac · bd', TREE70.acbd, C.gold], ['ad · bc', TREE70.adbc, C.gold]];
    const bx = 1000, by = 640;
    items.forEach(([nm, v, col], i) => { const h = (v + 17) * 30 * clamp(pq * 3 - i * 0.5); fillBox(bx + i * 170, by - h, 110, h, col, pq * 0.45); rect63(bx + i * 170, by - h, 110, h, col, pq, 1.6); lbl(nm, bx + i * 170 + 55, by + 30, col, pq, 18); lbl(v.toFixed(2), bx + i * 170 + 55, by - h - 12, C.white, pq, 17); });
    lbl('log of the paired products : the two smallest coincide', bx + 225, by + 70, C.white, pq, 17);
    const tq = Q(S, 1, 'tropical Grassmann relation', 0.6);
    chip(1500, 290, 640, 58, 'min{w_ab+w_cd, w_ac+w_bd, w_ad+w_bc} twice', C.gold, tq, 20);
    lbl('w_ij = log d_ij · invariant under port changes of basis', 1500, 345, C.dim, tq, 16);
    const cq = Q(S, 1, 'a measured violation', 0.6);
    chip(1600, 450, 420, 64, 'max |w − ŵ| ≥ (s₂ − s₁)/4', C.red, cq, 24);
    lbl('sharp for a single quadruple', 1600, 505, C.dim, Q(S, 1, 'a quarter of the gap', 0.6), 16);
  }
};

/* ---- 07 TRANSFER ---- */
SCENES.transfer = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'maps onto SO five', 'classical']]);
  const f1 = 1 - Q(S, 1, 'The primitive exterior square', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Each block D gives a transfer matrix', 0.6) * f1;
    lbl('T(D) =', 200, 345, C.white, q, 26);
    mat70(280, 300, [['D', '−I₂'], ['I₂', '0']], q, C.white, 110, 60, 30);
    lblG('u_{n+1} = D u_n − u_{n−1}', 400, 470, C.dim, q, 22);
    lblG('T(D)ᵀ J₄ T(D) = J₄', 400, 530, C.gold, q, 26);
    const bq = Q(S, 0, 'four explicit blocks', 0.8) * f1;
    [['D₀ = 0', [['0', '0'], ['0', '0']]], ['D₁ = E₁₁', [['1', '0'], ['0', '0']]], ['D₂ = E₂₂', [['0', '0'], ['0', '1']]], ['D₃ = swap', [['0', '1'], ['1', '0']]]].forEach(([nm, m], i) => { const qq = bq * clamp(bq * 4 - i), x = 900 + i * 230; lbl(nm, x + 70, 280, C.cyan, qq, 19); mat70(x + 20, 300, m, qq, C.cyan, 50, 44, 22); });
    const zq = Q(S, 0, 'generate a Zariski dense subgroup', 1.2) * f1;
    const nfill = Math.round(zq * 10);
    lbl('Lie algebra of the Zariski closure', 1340, 470, C.white, zq, 18);
    for (let k = 0; k < 10; k++) { const x = 940 + k * 82; fillBox(x, 500, 70, 70, k < nfill ? C.green : C.dim, zq * (k < nfill ? 0.5 : 0.15)); rect63(x, 500, 70, 70, k < nfill ? C.green : C.dim, zq, 1.6); }
    lbl('dim = 10 = dim sp₄  ⇒  Zariski dense in Sp₄(ℂ)', 1340, 620, C.green, zq, 20);
    lbl('the integer group is discrete in the usual topology : density is algebraic, not a norm approximation', 1340, 680, C.dim, zq, 15);
  }
  const q = Q(S, 1, 'The primitive exterior square', 0.6, 0.3);
  if (q > 0) {
    lblG('Λ²ℝ⁴ = ℝΩ ⊕ V₅', 480, 280, C.white, q, 32);
    cells70(180, 330, 6, 100, [C.dim, C.cyan, C.cyan, C.cyan, C.cyan, C.cyan], q, ['Ω', '', '', '', '', '']);
    const sgq = Q(S, 1, 'signature three, two', 0.6);
    ['+', '+', '+', '−', '−'].forEach((s, i) => lbl(s, 280 + i * 100 + 47, 380, i < 3 ? C.green : C.red, sgq, 30));
    lbl('V₅ = {α : α∧Ω = 0} ,  q(α, β)ν = −α∧β', 480, 470, C.dim, sgq, 18);
    lbl('basis e₁f₁ − e₂f₂ , e₁e₂ , f₁f₂ , e₁f₂ , e₂f₁', 480, 505, C.dim, sgq, 16);
    const mq = Q(S, 1, 'maps onto SO five with kernel plus or minus one', 0.6);
    box(1000, 270, 360, 150, C.gold, mq, 2, 'rgba(0,0,0,0.5)'); lblG('Sp₄(ℝ)', 1180, 355, C.gold, mq, 32);
    arrow(1370, 345, 1470, 345, C.white, mq, 3); lbl('ϖ = Λ²|V₅', 1420, 320, C.white, mq, 16);
    box(1480, 270, 360, 150, C.mag, mq, 2, 'rgba(0,0,0,0.5)'); lblG('SO(3, 2)', 1660, 355, C.mag, mq, 32);
    lbl('complexified : Sp₄(ℂ) ↠ SO₅(ℂ)', 1420, 470, C.white, mq, 20);
    stamp('ker = {± I₄}', 1420, 570, Q(S, 1, 'one sign of central data lost', 0.6), C.red, 38, -0.05);
    lbl('non-compact real form · different norms and probabilities from SO(5)', 1420, 650, C.dim, Q(S, 1, 'a non-compact real form', 0.6), 16);
  }
};

/* ---- 08 LIFTS ---- */
SCENES.lifts = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'with geometric Satake and geometric Langlands', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'The lost sign is counted exactly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On a genus-four curve', 0.6) * f1;
    const cx = 480, cy = 470;
    ell70(cx, cy, 380, 170, C.cyan, q, 2.5); fillEll70(cx, cy, 380, 170, C.cyan, q * 0.05);
    const hq = Q(S, 0, 'send four generators to the four blocks', 0.8) * f1;
    const hx = [-270, -90, 90, 270];
    hx.forEach((dx, j) => {
      ell70(cx + dx, cy, 48, 20, C.white, q, 2);
      ell70(cx + dx, cy, 74, 44, [C.dim, C.cyan, C.gold, C.mag][j], hq, 2.5);
      lbl('T(D' + '₀₁₂₃'[j] + ')', cx + dx, cy - 60, [C.white, C.cyan, C.gold, C.mag][j], hq, 16);
      dashed(cx + dx, cy + 20, cx + dx, cy + 170, C.dim, hq * 0.8, 1.5);
      lbl('b' + '₀₁₂₃'[j] + '↦I', cx + dx + 4, cy + 140, C.dim, hq, 14, 'left');
    });
    lbl('X : genus 4 , ∏[a_j , b_j] = 1', cx, cy + 220, C.white, q, 19);
    const dq = Q(S, 0, 'This gives a Zariski dense SO five local system', 0.6) * f1;
    chip(1380, 270, 760, 60, 'ρ = ϖ ∘ ρ̃ : Zariski dense in SO₅(ℂ)', C.green, dq, 24);
    lbl('no horizontal reduction to a proper parabolic', 1380, 325, C.dim, dq, 16);
    const pq = Q(S, 0, 'with geometric Satake and geometric Langlands', 0.6) * f1;
    box(1000, 370, 760, 170, C.cyan, pq, 2, 'rgba(0,25,40,0.6)');
    lbl('EXTERNAL · Satake (Mirković–Vilonen) · eigen-objects (Gaitsgory–Raskin)', 1380, 405, C.cyan, pq, 16);
    lblG('ε_R : H_R(F_E) ≅ E_R ⊠ F_E ,  F_E ≠ 0', 1380, 465, C.white, pq, 26);
    lbl('G = Sp₄ , Ǧ = SO₅ · characteristic zero · D-modules · unramified', 1380, 510, C.dim, pq, 15);
    const nq = Q(S, 0, 'the explicit covariant maps are Hecke natural', 0.6) * f1;
    chip(1380, 600, 760, 60, 'κ : Λ²W₁₄ ↠ so₅ ,  ℓ : Λ²so₅ ↠ so₅', C.gold, nq, 23);
    lblG('ε_R′ ∘ H_φ = (φ_E ⊠ id) ∘ ε_R', 1380, 690, C.gold, nq, 26);
    lbl('a nonzero morphism never acts as zero on F_E', 1380, 740, C.dim, nq, 16);
  }
  const q = Q(S, 1, 'The lost sign is counted exactly', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'two hundred fifty-six classes', 1.6);
    const n = Math.floor(cq * 256), x0 = 230, y0 = 250, s = 30;
    for (let k = 0; k < 256; k++) { const i = k % 16, j = Math.floor(k / 16); dot(x0 + i * s, y0 + j * s, 6, k < n ? (((k * 2654435761) >>> 0) % 2 ? 'g' : 'c') : 'n', q * (k < n ? 1 : 0.25)); }
    lbl(String(n) + ' / 256', x0 + 7.5 * s, y0 + 16 * s + 20, C.white, q, 20);
    lblG('lifts ρ̃′ = χ · ρ̃ ,  χ ∈ Hom(π₁X, μ₂) = H¹(X, μ₂) ≅ (ℤ/2)⁸', 1340, 320, C.white, q, 24);
    chip(1340, 410, 400, 60, '2⁸ = 256', C.gold, cq, 30);
    lbl('each object still has a μ₂ automorphism', 1340, 470, C.dim, cq, 16);
    const iq = Q(S, 1, 'invisible to every five-dimensional representation', 0.6);
    box(980, 520, 360, 130, C.green, iq, 2, 'rgba(0,0,0,0.5)'); lbl('on V₅ and Rep(SO₅)', 1160, 560, C.green, iq, 18); lblG('−I₄ ↦ +1', 1160, 615, C.white, iq, 28);
    box(1380, 520, 360, 130, C.red, iq, 2, 'rgba(0,0,0,0.5)'); lbl('on ℂ⁴ of Sp₄', 1560, 560, C.red, iq, 18); lblG('−I₄ ↦ −1', 1560, 615, C.white, iq, 28);
    lbl('eight independent central bits are dropped by the five-dimensional projection', 1360, 700, C.dim, iq, 16);
  }
};

/* ---- 09 GREEN ---- */
SCENES.green = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Scaling the covariance by c', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the critical coupling is the inverse of the best high-energy ratio', 0.6) * f1;
    chip(W / 2, 260, 1000, 62, 'q_g = T − g V ,  a* = lim sup_{T[f]→∞} V[f] / T[f] ,  g_c = 1 / a*', C.white, q, 24);
    lbl('fixed double-wall Green model · bounds 1/K ≤ g_c ≤ E_v / D_v', W / 2, 315, C.dim, q, 17);
    const x0 = 240, x1 = 1680, y0 = 520, gc = 960;
    line(x0, y0, x1, y0, C.dim, q, 2); lbl('g', x1 + 20, y0 + 6, C.dim, q, 20, 'left');
    const bq = Q(S, 0, 'below it the form is bounded below', 0.6) * f1;
    fillBox(x0, y0 - 40, gc - x0, 80, C.green, bq * 0.2); rect63(x0, y0 - 40, gc - x0, 80, C.green, bq, 1.6);
    lbl('closed · bounded below · compact resolvent · ground state', (x0 + gc) / 2, y0 + 8, C.green, bq, 18);
    const aq = Q(S, 0, 'above it the energy runs to minus infinity', 0.6) * f1;
    fillBox(gc, y0 - 40, x1 - gc, 80, C.red, aq * 0.2); rect63(gc, y0 - 40, x1 - gc, 80, C.red, aq, 1.6);
    lbl('inf q_g[f] = −∞ over ‖f‖ = 1', (gc + x1) / 2, y0 + 8, C.red, aq, 18);
    dashed(gc, y0 - 90, gc, y0 + 90, C.gold, q, 2.5); lbl('g_c', gc, y0 - 104, C.gold, q, 24);
    lbl('at g_c : not both bounded below and closed on the original domain', W / 2, y0 + 140, C.gold, aq, 18);
  }
  const q = Q(S, 1, 'Scaling the covariance by c', 0.6, 0.3);
  if (q > 0) {
    const mq = Q(S, 1, 'multiplies the critical coupling by c squared times d', 0.6);
    chip(W / 2, 300, 820, 80, 'g_c(cA, dρ) = c² d · g_c(A, ρ)', C.gold, mq, 34);
    lbl('T′ = cd T ,  V′ = V / c  ⇒  q′_g = cd (T − g/(c²d) V)', W / 2, 380, C.white, mq, 20);
    const px = 560, py = 760, pw = 800, ph = 300, xS = c => px + c / 1.4 * pw, yS = v => py - v / 4 * ph;
    plotAxes(px, py, pw, ph, mq, 'covariance scale c', 'g_c / g_c(1)');
    [[1, C.cyan], [0.5, C.mag], [2, C.green]].forEach(([d, col]) => { curve(p => { const c = 0.02 + 1.38 * p; return [xS(c), yS(c * c * d)]; }, 60, col, mq, 3); lbl('d = ' + d, xS(1.4) + 14, yS(1.96 * d) + 6, col, mq, 16, 'left'); });
    stamp('NO UNIVERSAL THRESHOLD', 830, 540, Q(S, 1, 'no universal positive threshold', 0.6), C.red, 30, -0.05);
  }
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'is kernel-checked in Lean', 'lean'], [1, 'Satake and geometric Langlands are published inputs', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['FUTURES', 'B = |Q|d − |F|r', C.gold, 'Legal futures from permission states'], ['CONTEXT', 'largest ⊗-ideal', C.cyan, 'tensor-respecting blind kernels'], ['REFERENCE', 'tr(σ σ̄) = 0', C.mag, 'references that read but do not control'], ['SPECTRAL', 'det H = δ_z', C.green, 'trace reconstruction'], ['TROPICAL', 'min twice', C.gold, 'tropical certificates'], ['LOCAL SYSTEM', '256 lifts', C.vio, 'a boundary model that becomes']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 22); lblG(a2, x, 340, C.white, q, 20); });
    lbl('LEAN · native_joint_future_memory_lower_bound (11 states) · finite-word reachability (free-word case)', W / 2, 470, C.green, Q(S, 1, 'is kernel-checked in Lean') * fade, 17);
    lbl('PUBLISHED · geometric Satake · Hecke eigen-objects  ·  CLASSICAL · finite étale algebras · Riemann–Hilbert · tropical Grassmannian · Sp₄ → SO₅', W / 2, 515, C.cyan, Q(S, 1, 'Satake and geometric Langlands are published inputs') * fade, 15);
    lbl('VOLUME · legal futures · blind kernels · graph scales · exact control · trace reconstruction · collision family · Schur and tropical laws · local system · Green threshold', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 15);
    lbl('RECOMPUTED · 250 automata · 400 graphs · 4290 tree quadruples · exact trace algebra · sp₄ closure 10 · signature (3, 2) · 256 lifts', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 16);
    lbl('NEXT · AURIC–LANGLANDS III · ACQUISITION, COVER AND CRITICAL DOMAIN', W / 2, 700, C.gold, Q(S, 1, 'Next: acquisition, cover and the critical domain') * fade, 28);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC–LANGLANDS II · CONTEXT', W / 2, 680, { size: 60, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC–Langlands 第二部 · 语境与谱重构 · TRURETURING FILM 070', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Legal futures, boundary responses, and a genus-four local system.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC–LANGLANDS II', futures: 'LEGAL FUTURES', context: 'CONTEXT KERNELS', sources: 'SOURCES AND REFERENCE', spectral: 'SPECTRAL ALGEBRA', boundary: 'BOUNDARY RESPONSE', transfer: 'SP4 TO SO5', lifts: 'LOCAL SYSTEM', green: 'GREEN THRESHOLD', finale: 'LEDGER' });

function poster70() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('T(D) = [[D, −I], [I, 0]] ⊂ Sp₄', 1320, 370, { size: 48, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('Sp₄ ↠ SO₅ · ker = ±I', 1320, 480, { size: 48, fam: FG, w: 700, align: 'center', c: C.white });
  txt('H¹(X, μ₂) : 256 lifts · Hecke natural', 1320, 590, { size: 38, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC–Langlands 第二部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC–LANGLANDS II · CONTEXT', W / 2, 890, { size: 68, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('合 法 未 来 · 边 界 响 应 · 谱 重 构', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 070', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster70;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
