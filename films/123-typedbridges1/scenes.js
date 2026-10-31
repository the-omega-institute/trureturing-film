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

/* ---- film 123: AURIC TYPED BRIDGES I · the hidden seam and the bridge ledger ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN GENERAL THEOREM · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · NO BRIDGE CONSTRUCTED · RH NOT PROVED', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po123 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po123.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po123.set(key, off); }
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
/* ---- film 123 data (from verify123.py / vis123.json) ---- */
const V123 = {"fiber":{"X":0.4,"Y":0.5,"Z":0.2,"lo":0.09999999999999998,"hi":0.4,"kstar":0.25,"samples":[[0.1,0.0,0.3,0.2,0.4,0.1],[0.11,0.01,0.29,0.2,0.39,0.11],[0.12,0.02,0.28,0.2,0.38,0.12],[0.13,0.03,0.27,0.2,0.37,0.13],[0.14,0.04,0.26,0.2,0.36,0.14],[0.15,0.05,0.25,0.2,0.35,0.15],[0.16,0.06,0.24,0.2,0.34,0.16],[0.17,0.07,0.23,0.2,0.33,0.17],[0.18,0.08,0.22,0.2,0.32,0.18],[0.19,0.09,0.21,0.2,0.31,0.19],[0.2,0.1,0.2,0.2,0.3,0.2],[0.21,0.11,0.19,0.2,0.29,0.21],[0.22,0.12,0.18,0.2,0.28,0.22],[0.23,0.13,0.17,0.2,0.27,0.23],[0.24,0.14,0.16,0.2,0.26,0.24],[0.25,0.15,0.15,0.2,0.25,0.25],[0.26,0.16,0.14,0.2,0.24,0.26],[0.27,0.17,0.13,0.2,0.23,0.27],[0.28,0.18,0.12,0.2,0.22,0.28],[0.29,0.19,0.11,0.2,0.21,0.29],[0.3,0.2,0.1,0.2,0.2,0.3],[0.31,0.21,0.09,0.2,0.19,0.31],[0.32,0.22,0.08,0.2,0.18,0.32],[0.33,0.23,0.07,0.2,0.17,0.33],[0.34,0.24,0.06,0.2,0.16,0.34],[0.35,0.25,0.05,0.2,0.15,0.35],[0.36,0.26,0.04,0.2,0.14,0.36],[0.37,0.27,0.03,0.2,0.13,0.37],[0.38,0.28,0.02,0.2,0.12,0.38],[0.39,0.29,0.01,0.2,0.11,0.39],[0.4,0.3,0.0,0.2,0.1,0.4]]},"moment":[[0.1,3.9,17.9],[0.11,3.9,18.1],[0.12,3.9,18.3],[0.13,3.9,18.5],[0.14,3.9,18.7],[0.15,3.9,18.9],[0.16,3.9,19.1],[0.17,3.9,19.3],[0.18,3.9,19.5],[0.19,3.9,19.7],[0.2,3.9,19.9],[0.21,3.9,20.1],[0.22,3.9,20.3],[0.23,3.9,20.5],[0.24,3.9,20.7],[0.25,3.9,20.9],[0.26,3.9,21.1],[0.27,3.9,21.3],[0.28,3.9,21.5],[0.29,3.9,21.7],[0.3,3.9,21.9],[0.31,3.9,22.1],[0.32,3.9,22.3],[0.33,3.9,22.5],[0.34,3.9,22.7],[0.35,3.9,22.9],[0.36,3.9,23.1],[0.37,3.9,23.3],[0.38,3.9,23.5],[0.39,3.9,23.7],[0.4,3.9,23.9]],"entropy":[[0.1001,1.28089,-0.11992,10015.825],[0.1051,1.31258,-0.11592,211.645],[0.1101,1.33738,-0.11193,114.173],[0.1151,1.35922,-0.10793,81.066],[0.1201,1.379,-0.10393,64.316],[0.1251,1.39716,-0.09993,54.167],[0.1301,1.41397,-0.09594,47.34],[0.1351,1.42958,-0.09194,42.427],[0.1401,1.44414,-0.08794,38.719],[0.1451,1.45773,-0.08394,35.821],[0.1501,1.47042,-0.07995,33.496],[0.1551,1.48227,-0.07595,31.592],[0.1601,1.49334,-0.07195,30.007],[0.1651,1.50365,-0.06795,28.672],[0.1701,1.51325,-0.06396,27.535],[0.175,1.52216,-0.05996,26.56],[0.18,1.53041,-0.05596,25.719],[0.185,1.53802,-0.05197,24.99],[0.19,1.545,-0.04797,24.357],[0.195,1.55137,-0.04397,23.807],[0.2,1.55715,-0.03997,23.33],[0.205,1.56235,-0.03598,22.918],[0.21,1.56697,-0.03198,22.562],[0.215,1.57103,-0.02798,22.26],[0.22,1.57453,-0.02398,22.005],[0.225,1.57749,-0.01999,21.794],[0.23,1.5799,-0.01599,21.626],[0.235,1.58177,-0.01199,21.497],[0.24,1.5831,-0.00799,21.406],[0.245,1.5839,-0.004,21.351],[0.25,1.58417,0.0,21.333],[0.255,1.5839,0.004,21.351],[0.26,1.5831,0.00799,21.406],[0.265,1.58177,0.01199,21.497],[0.27,1.5799,0.01599,21.626],[0.275,1.57749,0.01999,21.794],[0.28,1.57453,0.02398,22.005],[0.285,1.57103,0.02798,22.26],[0.29,1.56697,0.03198,22.562],[0.295,1.56235,0.03598,22.918],[0.3,1.55715,0.03997,23.33],[0.305,1.55137,0.04397,23.807],[0.31,1.545,0.04797,24.357],[0.315,1.53802,0.05197,24.99],[0.32,1.53041,0.05596,25.719],[0.325,1.52216,0.05996,26.56],[0.3299,1.51325,0.06396,27.535],[0.3349,1.50365,0.06795,28.672],[0.3399,1.49334,0.07195,30.007],[0.3449,1.48227,0.07595,31.592],[0.3499,1.47042,0.07995,33.496],[0.3549,1.45773,0.08394,35.821],[0.3599,1.44414,0.08794,38.719],[0.3649,1.42958,0.09194,42.427],[0.3699,1.41397,0.09594,47.34],[0.3749,1.39716,0.09993,54.167],[0.3799,1.379,0.10393,64.316],[0.3849,1.35922,0.10793,81.066],[0.3899,1.33738,0.11193,114.173],[0.3949,1.31258,0.11592,211.645],[0.3999,1.28089,0.11992,10015.825]],"contract":{"Istar":21.333333333333332,"ratios":[0.0,0.0,0.0,0.0001,0.0005,0.0009,0.0015,0.0021,0.0029,0.0036,0.0046,0.0053,0.0064,0.0074,0.0085,0.0092,0.0102,0.0115,0.0128,0.0144,0.0157,0.0169,0.0185,0.0199,0.0215,0.0231,0.0242,0.0259,0.0269,0.0282,0.0292,0.0304,0.0323,0.0337,0.035,0.036,0.0383,0.0399,0.0413,0.0428,0.0452,0.0469,0.0491,0.0508,0.0525,0.0544,0.057,0.0592,0.061,0.0635,0.0652,0.0674,0.0694,0.0722,0.0749,0.0776,0.0809,0.083,0.0852,0.0885,0.0913,0.0953,0.098,0.1012,0.1045,0.1085,0.112,0.1154,0.1214,0.1256,0.1302,0.1352,0.1407,0.1466,0.1526,0.1588,0.1669,0.1765,0.1835,0.1894,0.1973,0.206,0.2124,0.2257,0.24,0.25,0.2677,0.2744,0.2955,0.3214,0.3676,0.375,0.4167,0.4574,0.5,0.5629,0.7812,0.7902,0.8214,0.9167],"max_ratio":1.0,"n":3000},"cycles":{"n":[1,2,3,4,5,6,7,8,9,10],"V":[2,3,5,8,13,21,34,55,89,144],"h":[0,0,1,3,7,14,26,46,79,133],"c":[0,0,1,3,8,18,38,76,147,277],"newdirs":[0,1,2,4,7,12,20,33,54]},"ratio":[[3,1.0,0.8292],[4,1.0,1.1056],[5,1.1429,1.382],[6,1.2857,1.6584],[7,1.4615,1.9348],[8,1.6522,2.2111],[9,1.8608,2.4875],[10,2.0827,2.7639],[11,2.3167,3.0403],[12,2.5604,3.3167],[13,2.8121,3.5931],[14,3.07,3.8695],[15,3.3327,4.1459],[16,3.5991,4.4223],[17,3.8684,4.6987],[18,4.1396,4.9751],[19,4.4124,5.2515],[20,4.6863,5.5279],[21,4.9609,5.8043],[22,5.2361,6.0807],[23,5.5116,6.357],[24,5.7874,6.6334],[25,6.0634,6.9098],[26,6.3396,7.1862],[27,6.6158,7.4626],[28,6.892,7.739],[29,7.1683,8.0154],[30,7.4447,8.2918],[31,7.721,8.5682],[32,7.9974,8.8446],[33,8.2738,9.121],[34,8.5502,9.3974],[35,8.8266,9.6738],[36,9.103,9.9502],[37,9.3793,10.2265],[38,9.6557,10.5029],[39,9.9321,10.7793]],"lifts":[[-1.0,5.0],[-0.95,4.61],[-0.9,4.24],[-0.85,3.89],[-0.8,3.56],[-0.75,3.25],[-0.7,2.96],[-0.65,2.69],[-0.6,2.44],[-0.55,2.21],[-0.5,2.0],[-0.45,1.81],[-0.4,1.64],[-0.35,1.49],[-0.3,1.36],[-0.25,1.25],[-0.2,1.16],[-0.15,1.09],[-0.1,1.04],[-0.05,1.01],[0.0,1.0],[0.05,1.01],[0.1,1.04],[0.15,1.09],[0.2,1.16],[0.25,1.25],[0.3,1.36],[0.35,1.49],[0.4,1.64],[0.45,1.81],[0.5,2.0],[0.55,2.21],[0.6,2.44],[0.65,2.69],[0.7,2.96],[0.75,3.25],[0.8,3.56],[0.85,3.89],[0.9,4.24],[0.95,4.61],[1.0,5.0]],"rigid":{"imgs":[[0.1,0.4],[0.175,0.325],[0.2125,0.2875],[0.23125,0.26875],[0.240625,0.259375],[0.245312,0.254688],[0.247656,0.252344],[0.248828,0.251172]],"bound":[0.3,0.15,0.075,0.0375,0.01875,0.009375,0.004687,0.002344,0.001172,0.000586,0.000293,0.000146]},"spectra":{"K":[0.1845,0.453,1.0558,1.8767],"MK":[0.2075,0.6718,0.7,2.5458],"JK":[-0.8425,-0.4829,0.4829,0.8425]},"flow":{"t":[0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.0,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8,3.9,4.0,4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5.0,5.1,5.2,5.3,5.4,5.5,5.6,5.7,5.8,5.9,6.0],"curves":[[0.1,0.11153,0.12218,0.13201,0.14108,0.14945,0.15718,0.16432,0.17091,0.17699,0.1826,0.18778,0.19257,0.19698,0.20106,0.20482,0.20829,0.2115,0.21446,0.21719,0.21972,0.22204,0.22419,0.22618,0.22801,0.2297,0.23126,0.2327,0.23403,0.23526,0.23639,0.23744,0.2384,0.2393,0.24012,0.24088,0.24158,0.24223,0.24282,0.24338,0.24389,0.24436,0.24479,0.24519,0.24556,0.2459,0.24622,0.24651,0.24678,0.24702,0.24725,0.24746,0.24766,0.24784,0.24801,0.24816,0.2483,0.24843,0.24855,0.24866,0.24877],[0.16,0.16692,0.17331,0.1792,0.18465,0.18967,0.19431,0.19859,0.20254,0.20619,0.20956,0.21267,0.21554,0.21819,0.22063,0.22289,0.22498,0.2269,0.22868,0.23032,0.23183,0.23323,0.23452,0.23571,0.23681,0.23782,0.23876,0.23962,0.24042,0.24116,0.24184,0.24246,0.24304,0.24358,0.24407,0.24453,0.24495,0.24534,0.24569,0.24603,0.24633,0.24661,0.24687,0.24711,0.24734,0.24754,0.24773,0.2479,0.24807,0.24821,0.24835,0.24848,0.2486,0.2487,0.2488,0.2489,0.24898,0.24906,0.24913,0.2492,0.24926],[0.34,0.33308,0.32669,0.3208,0.31535,0.31033,0.30569,0.30141,0.29746,0.29381,0.29044,0.28733,0.28446,0.28181,0.27937,0.27711,0.27502,0.2731,0.27132,0.26968,0.26817,0.26677,0.26548,0.26429,0.26319,0.26218,0.26124,0.26038,0.25958,0.25884,0.25816,0.25754,0.25696,0.25642,0.25593,0.25547,0.25505,0.25466,0.25431,0.25397,0.25367,0.25339,0.25313,0.25289,0.25266,0.25246,0.25227,0.2521,0.25193,0.25179,0.25165,0.25152,0.2514,0.2513,0.2512,0.2511,0.25102,0.25094,0.25087,0.2508,0.25074],[0.4,0.38847,0.37782,0.36799,0.35892,0.35055,0.34282,0.33568,0.32909,0.32301,0.3174,0.31222,0.30743,0.30302,0.29894,0.29518,0.29171,0.2885,0.28554,0.28281,0.28028,0.27796,0.27581,0.27382,0.27199,0.2703,0.26874,0.2673,0.26597,0.26474,0.26361,0.26256,0.2616,0.2607,0.25988,0.25912,0.25842,0.25777,0.25718,0.25662,0.25611,0.25564,0.25521,0.25481,0.25444,0.2541,0.25378,0.25349,0.25322,0.25298,0.25275,0.25254,0.25234,0.25216,0.25199,0.25184,0.2517,0.25157,0.25145,0.25134,0.25123]]},"farkas":{"y":["0","1","1","-1","-1","1","1","0","1","-1","0","1"],"yb":"-3/4","ATy_min":"0"},"cayley":[[14.1347,0.070718,0.0],[21.022,0.04756,0.0],[25.0109,0.039977,0.0],[30.4249,0.032865,0.0],[32.9351,0.03036,0.0],[37.5862,0.026604,0.0],[40.9187,0.024437,0.0],[43.3271,0.023079,0.0],[48.0052,0.02083,0.0],[49.7738,0.02009,0.0]],"traj":["3","2","5","3","25","3","2","5","3","2","5","3","25","3","2","5","3","25","3","2","5","3","2","5","3","25","3","2","5","3","2","5","3","25","3","2","5","3","25","3"],"trajfreq":{"0":0.0,"2":0.2353,"3":0.3824,"5":0.2353,"25":0.1471},"nchecks":27811};
/* ---- film 123 helpers ---- */
const ST123 = ['0', '2', '3', '5', '25'];
const SD123 = { '0': 'w', '2': 'c', '3': 'g', '5': 'm', '25': 'n' };
const SC123 = { '0': C.white, '2': C.cyan, '3': C.gold, '5': C.mag, '25': C.green };
const SP123 = { '0': [0, 0, 0], '2': [1, 0, 0], '3': [0, 0, 1], '5': [0, 1, 0], '25': [1, 1, 0] };
const SB123 = { '0': '000', '2': '100', '3': '010', '5': '001', '25': '101' };
const PE123 = [['0', '2'], ['2', '25'], ['25', '5'], ['5', '0'], ['3', '0'], ['3', '2'], ['3', '5'], ['3', '25']];
/* the visible pyramid with the five states */
function pyr123(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, o.tilt == null ? 0.38 : o.tilt), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = {}; ST123.forEach(k => { P[k] = W3(SP123[k]); });
  fillPoly([P['0'], P['2'], P['25'], P['5']], C.cyan, a * (o.fill == null ? 0.08 : o.fill));
  PE123.forEach(([i, j]) => dashed(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.55, 1.6));
  if (o.pt) { const q = W3(o.pt); ring(q[0], q[1], 16, C.gold, a * o.pq, 2.5); dot(q[0], q[1], 9, 'g', a * o.pq); if (o.ptl) lblG(o.ptl, q[0] + (o.ptx || -24), q[1] + (o.pty || 40), C.gold, a * o.pq, 20, o.pta || 'right'); }
  ST123.forEach(k => { dot(P[k][0], P[k][1], o.r || 13, SD123[k], a); if (o.lab !== false) lbl(o.bits ? SB123[k] : k, P[k][0] + (k === '3' ? 0 : 26), P[k][1] + (k === '3' ? -24 : 8), SC123[k], a, o.ls || 20, k === '3' ? 'center' : 'left'); });
  return P;
}
/* the five-edge state graph e1 0->2, e2 2->25, e3 25->5, e4 5->0, e5 0->3 */
const E5_123 = [['0', '2'], ['2', '25'], ['25', '5'], ['5', '0'], ['0', '3']];
function g5_123(cx, cy, h, a, o = {}) {
  const P = { '0': [cx - h, cy + h], '2': [cx + h, cy + h], '25': [cx + h, cy - h], '5': [cx - h, cy - h], '3': [cx - h - 1.3 * h, cy + h] };
  if (a <= 0) return P;
  E5_123.forEach(([i, j], e) => {
    const A = P[i], B = P[j], dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, g = 28;
    const col = o.ecol ? o.ecol(e) : C.cyan, ea = o.ea ? o.ea(e) : 0.85;
    arrow(A[0] + ux * g, A[1] + uy * g, B[0] - ux * g, B[1] - uy * g, col, a * ea, o.ew ? o.ew(e) : 2.6);
    if (o.elab) { const s = o.elab(e); if (s) lbl(s, (A[0] + B[0]) / 2 - uy * 30, (A[1] + B[1]) / 2 + ux * 30 + 7, o.elc ? o.elc(e) : col, a * (o.ela == null ? 1 : o.ela), o.els || 19); }
  });
  Object.keys(P).forEach(k => { dot(P[k][0], P[k][1], o.r || 17, SD123[k], a); const up = k === '5' || k === '25'; lbl(k, P[k][0], P[k][1] + (up ? -28 : 40), SC123[k], a, o.ls || 20); });
  return P;
}
/* Fibonacci cube Gamma_4 drawn as a projected hypercube */
const CUBE4_123 = ['0000', '1000', '0100', '0010', '0001', '1010', '1001', '0101'];
function cube4_123(cx, cy, sc, a) {
  if (a <= 0) return;
  const V = [[-200, 60], [-90, -130], [90, -130], [200, 60]];
  const pos = w => { let x = cx, y = cy; for (let i = 0; i < 4; i++) if (w[i] === '1') { x += V[i][0] * sc; y += V[i][1] * sc; } return [x, y]; };
  CUBE4_123.forEach(w => CUBE4_123.forEach(u => { if (w < u) { let dc = 0; for (let i = 0; i < 4; i++) if (w[i] !== u[i]) dc++; if (dc === 1) { const A = pos(w), B = pos(u); line(A[0], A[1], B[0], B[1], C.cyan, a * 0.75, 2.5); } } }));
  CUBE4_123.forEach(w => { const p = pos(w), k = (w.match(/1/g) || []).length; dot(p[0], p[1], 12, k === 0 ? 'w' : k === 1 ? 'c' : 'm', a); lbl(w, p[0], p[1] + (p[1] >= cy - 1 ? 34 : -20), C.white, a, 16); });
}
function ell123(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function chipG(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); lblG(s, x, y + size * 0.36, col, a, size); }
function strike123(x, y, w, a) { line(x, y, x + w, y, C.red, a, 3); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyr123(470, 500, 330, 0.6 + t * 0.2, s0, { ls: 22, pt: [0.4, 0.5, 0.2], pq: Q(S, 0, 'its hidden fiber', 0.6), ptl: '(X, Y, Z)' });
  const items = [['a five-state law', 'FIVE-STATE LAW', 'Σ = {0, 2, 3, 5, 25} ,  visible (X, Y, Z)', C.cyan],
    ['its hidden fiber', 'HIDDEN FIBER', 'κ = p₂₅ ∈ [κ₋, κ₊] ,  seam d', C.green],
    ['Fisher geometry', 'FISHER GEOMETRY', 'I(κ) = 1/p₀ + 1/p₂ + 1/p₅ + 1/p₂₅', C.gold],
    ['Fibonacci boundaries and cycles', 'FIBONACCI BOUNDARIES AND CYCLES', '0 → K → C → S → 0', C.mag],
    ['and bridges to arithmetic', 'TYPED BRIDGES · STATED CONDITIONS', 'arithmetic · triangle networks · Riemann zeros', C.vio]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 226 + i * 118, 860, 100, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 262 + i * 118, col, q, 20); lblG(s, 1360, 304 + i * 118, C.white, q, 24); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr123(W / 2, 440, 300, 0.5 + t * 0.25, rp * 0.9, { lab: false, pt: [0.4, 0.5, 0.2], pq: 1 });
  chip(330, 360, 360, 58, 'three visible numbers', C.cyan, rp, 22); chip(330, 445, 360, 58, 'one hidden seam d', C.green, rp, 22); chip(330, 530, 360, 58, 'Fisher · cycles · limits', C.gold, rp, 22);
  box(1400, 320, 400, 250, C.vio, rp, 2, 'rgba(0,0,0,0.4)'); lbl('every bridge typed', 1600, 372, C.vio, rp, 22);
  ['inputs', 'hypotheses', 'outputs', 'failure boundary'].forEach((s, i) => lbl(s, 1600, 420 + i * 38, C.white, rp, 20));
  txt(scramble('AURIC TYPED BRIDGES I', rp, 123), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 类 型 化 桥 第 一 部 · 隐 藏 缝 与 桥 接 账 本', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 123 · AURIC_FIB_ATOM_TYPED_BRIDGES_AND_ARITHMETIC_TRIANGLE_RH_PIPELINE · §0–§26', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FIVE STATES, ONE FIBER (§1, §12, §25.4) ---- */
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So each visible point carries', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Five states', 0.6) * f1;
    pyr123(470, 470, 340, 0.55 + t * 0.15, q, { bits: false, pt: [0.4, 0.5, 0.2], pq: Q(S, 0, 'Their means X, Y and Z', 0.6) * f1 });
    lblG('(X, Y, Z) = (0.4, 0.5, 0.2)', 470, 770, C.gold, Q(S, 0, 'Their means X, Y and Z', 0.6) * f1, 20);
    lbl('25 is the joint state [2, 5]', 470, 815, C.green, q, 17);
    const iq = Q(S, 0, 'are read by three indicators', 0.6) * f1;
    box(1000, 230, 780, 212, C.cyan, iq, 2, 'rgba(0,0,0,0.45)');
    ST123.forEach((s, i) => lbl(s, 1200 + i * 120, 270, SC123[s], iq, 22));
    [['x', [0, 1, 0, 0, 1]], ['y', [0, 0, 0, 1, 1]], ['z', [0, 0, 1, 0, 0]]].forEach(([nm, vv], j) => { lbl(nm, 1060, 320 + j * 40, C.gold, iq, 22); vv.forEach((b, i) => lbl(String(b), 1200 + i * 120, 320 + j * 40, b ? C.white : C.dim, iq, 22)); });
    lbl('X = E x ,  Y = E y ,  Z = E z', 1390, 428, C.dim, iq, 15);
    const kq = Q(S, 0, 'plus kappa, the joint mass', 0.6) * f1;
    chip(1390, 488, 780, 52, 'κ = p₂₅ = E[xy]   (xy = 1 only at 25)', C.green, kq, 21);
    const rq = Q(S, 0, 'rebuild the whole law linearly', 0.6) * f1;
    box(1000, 535, 780, 270, C.white, rq, 1.6, 'rgba(0,0,0,0.45)');
    [['p₀ = 1 − Z − X − Y + κ', C.white], ['p₂ = X − κ', C.cyan], ['p₃ = Z', C.gold], ['p₅ = Y − κ', C.mag], ['p₂₅ = κ', C.green]].forEach(([s, col], i) => lblG(s, 1390, 575 + i * 48, col, clamp(rq * 1.6 - i / 6), 25));
  }
  const q = Q(S, 1, 'So each visible point carries', 0.6, 0.3);
  if (q > 0) {
    const ph = 0.5 + 0.5 * Math.sin(t * 0.9), k = 0.1 + 0.3 * ph, P = [k - 0.1, 0.4 - k, 0.2, 0.5 - k, k];
    const bx = 170, by = 600, hs = 600;
    ST123.forEach((s, i) => { const x = bx + i * 145, h = P[i] * hs; fillBox(x, by - h, 90, h, SC123[s], q * 0.45); rect63(x, by - h, 90, h, SC123[s], q, 1.6); lbl(s, x + 45, by + 30, SC123[s], q, 20); lbl(P[i].toFixed(2), x + 45, by - h - 10, C.white, q, 16); });
    lbl('the five masses as κ slides along the fiber', 520, 260, C.dim, q, 16);
    const sx = k2 => 170 + k2 / 0.5 * 690, sy = 720;
    line(sx(0), sy, sx(0.5), sy, C.dim, q, 2); fillBox(sx(0.1), sy - 9, sx(0.4) - sx(0.1), 18, C.green, q * 0.3);
    [[0.1, 'κ₋ = 0.1'], [0.4, 'κ₊ = 0.4']].forEach(([v, s]) => { line(sx(v), sy - 14, sx(v), sy + 14, C.green, q, 2.5); lblG(s, sx(v), sy + 42, C.green, q, 18); });
    line(sx(0.25), sy - 14, sx(0.25), sy + 14, C.gold, q, 2); lblG('κ* = 0.25', sx(0.25), sy - 22, C.gold, q, 17);
    dot(sx(k), sy, 11, 'w', q); lblG('κ', sx(k), sy + 42, C.white, q * 0.0, 18);
    const iq = Q(S, 1, 'from the larger of zero', 0.6);
    chip(1390, 270, 800, 58, 'κ₋ = max(0, X + Y + Z − 1)  ≤  κ  ≤  κ₊ = min(X, Y)', C.green, iq, 21);
    lbl('every κ in the interval gives a legal law , none outside', 1390, 330, C.dim, iq, 15);
    const dq = Q(S, 1, 'to the smaller of X and Y', 0.6);
    chip(1390, 400, 800, 58, 'p_κ − p_κ′ = (κ − κ′) d ,   d = (1, −1, 0, −1, 1)', C.gold, dq, 21);
    const fq = Q(S, 1, 'Five is three visible plus two invisible directions', 0.6);
    box(1000, 470, 780, 160, C.cyan, fq, 2, 'rgba(0,30,40,0.4)');
    lblG('rank P = 3 ,   ker P = span(e₀, d)', 1390, 520, C.white, fq, 24);
    lblG('5  =  3 visible  +  2 invisible', 1390, 580, C.cyan, fq, 26);
    const nq = Q(S, 1, 'normalising leaves one', 0.6);
    chip(1390, 690, 800, 58, 'on mass-zero vectors :  ker P = ℝ d   (one hidden seam)', C.green, nq, 21);
  }
};

/* ---- 03 SECOND MOMENT (§2, §3, §24.4) ---- */
SCENES.moment = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Take W with values', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "A function's mean is its visible part", 0.6) * f1;
    chip(W / 2, 255, 1400, 60, 'E_p f = f₀ + (f₂ − f₀) X + (f₅ − f₀) Y + (f₃ − f₀) Z + J_f κ', C.white, q, 23);
    const cq = Q(S, 0, 'the four-corner difference', 0.6) * f1;
    const cx = 470, cy = 540, h = 150;
    const Pt = { '0': [cx - h, cy + h], '2': [cx + h, cy + h], '25': [cx + h, cy - h], '5': [cx - h, cy - h] };
    strokePoly([Pt['0'], Pt['2'], Pt['25'], Pt['5']], C.gold, cq * 0.8, 2.5);
    Object.keys(Pt).forEach(s => { const sg = s === '0' || s === '25' ? '+' : '−', col = sg === '+' ? C.green : C.red; dot(Pt[s][0], Pt[s][1], 18, SD123[s], cq); lbl('f' + (s === '25' ? '₂₅' : s === '0' ? '₀' : s === '2' ? '₂' : '₅'), Pt[s][0] + (Pt[s][0] > cx ? 34 : -34), Pt[s][1] + 8, SC123[s], cq, 22, Pt[s][0] > cx ? 'left' : 'right'); chip(Pt[s][0], Pt[s][1] + (Pt[s][1] > cy ? 50 : -50), 46, 40, sg, col, cq, 26); });
    lblG('J_f', cx, cy + 10, C.gold, cq, 34);
    dot(cx - h - 170, cy + h, 14, 'g', cq * 0.6); lbl('3 : no corner', cx - h - 170, cy + h + 36, C.dim, cq, 15);
    chip(1390, 400, 760, 62, 'J_f = f₂₅ − f₂ − f₅ + f₀', C.gold, cq, 26);
    const vq = Q(S, 0, 'The mean is visible exactly when J f vanishes', 0.6) * f1;
    chip(1390, 510, 760, 60, 'E_p f fixed by (X, Y, Z)  ⇔  J_f = 0', C.green, vq, 24);
    lbl('on a fiber :  E f changes by J_f (κ − κ′)', 1390, 570, C.dim, vq, 16);
    lbl('products of visible functions :  J_(fg) = a_x b_y + a_y b_x', 1390, 640, C.cyan, vq, 18);
    lbl('so multiplying what is seen creates κ', 1390, 675, C.dim, vq, 16);
  }
  const q = Q(S, 1, 'Take W with values', 0.6, 0.3);
  if (q > 0) {
    box(150, 240, 780, 210, C.white, q, 1.6, 'rgba(0,0,0,0.45)');
    lbl('s', 210, 290, C.dim, q, 22); ST123.forEach((s, i) => lbl(s, 340 + i * 120, 290, SC123[s], q, 22));
    lbl('W', 210, 345, C.gold, q, 22); [0, 2, 3, 5, 7].forEach((v, i) => lbl(String(v), 340 + i * 120, 345, C.white, q, 22));
    const sq = Q(S, 1, 'but W squared contains twenty x y', 0.6);
    lbl('W²', 210, 400, C.cyan, sq, 22); [0, 4, 9, 25, 49].forEach((v, i) => lbl(String(v), 340 + i * 120, 400, C.white, sq, 22));
    chip(540, 500, 780, 56, 'W = 2x + 3z + 5y   (7 = 2 + 5 at 25)', C.gold, q, 21);
    chip(540, 575, 780, 56, 'W² = 4x + 9z + 25y + 20xy', C.cyan, sq, 23);
    const kq = Q(S, 1, 'so kappa is the variance plus the squared mean', 0.6);
    chip(540, 680, 840, 64, 'κ = ( Var W + (2X + 3Z + 5Y)² − 4X − 9Z − 25Y ) / 20', C.green, kq, 21);
    lbl('recomputed on 500 random laws : exact to 10⁻¹²', 540, 745, C.dim, kq, 15);
    const pq = Q(S, 1, 'Its mean is blind to kappa', 0.6);
    const px = 1040, py = 790, pw = 700, ph = 470, xS = k => px + (k - 0.1) / 0.3 * pw, yS = v => py - v / 26 * ph;
    plotAxes(px, py, pw, ph, pq, '', 'moments of W');
    lbl('κ', px + pw + 14, py + 6, C.dim, pq, 18, 'left'); lblG('along the fiber of (X, Y, Z) = (0.4, 0.5, 0.2)', px + pw / 2, py + 56, C.dim, pq, 15);
    [0, 10, 20].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, pq, 14, 'right'));
    [0.1, 0.25, 0.4].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, pq, 14));
    curve(p => { const r = V123.moment[Math.round(p * 30)]; return [xS(r[0]), yS(r[1])]; }, 30, C.gold, pq, 3.5);
    lbl('E W = 3.9 : blind to κ', xS(0.4), yS(3.9) - 14, C.gold, pq, 16, 'right');
    curve(p => { const r = V123.moment[Math.round(p * 30)]; return [xS(r[0]), yS(r[2])]; }, 30, C.cyan, sq, 3.5);
    lbl('E W² = 15.9 + 20κ', xS(0.12), yS(24.2), C.cyan, sq, 16, 'left');
  }
};

/* ---- 04 ENTROPY AND FISHER (§4, §15.4, §16.4) ---- */
SCENES.entropy = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const E = V123.entropy, n = E.length - 1, xS = k => 170 + (k - 0.1) / 0.3 * 720;
  const f1 = 1 - Q(S, 1, 'Its curvature is the Fisher information', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On the fiber', 0.6) * f1;
    const hq = Q(S, 0, 'Entropy is strictly concave', 0.6) * f1;
    const y0 = 520, hh = 250, yH = v => y0 - (v - 1.2) / 0.45 * hh;
    plotAxes(170, y0, 720, hh, hq, '', 'H(κ) on the fiber');
    curve(p => { const r = E[Math.round(p * n)]; return [xS(r[0]), yH(r[1])]; }, n, C.gold, hq, 3.5);
    const mq = Q(S, 0, 'maximal exactly where the defect vanishes', 0.6) * f1;
    dashed(xS(0.25), yH(1.585), xS(0.25), 760, C.green, mq, 1.6); dot(xS(0.25), yH(1.585), 11, 'n', mq); lblG('max at κ* = XY/r = 0.25', xS(0.25) + 16, yH(1.585) - 14, C.green, mq, 18, 'left');
    const y1 = 690, dh = 70, yD = v => y1 - v / 0.12 * dh;
    const dq = Q(S, 0, 'the defect r kappa minus X Y', 0.6) * f1;
    line(170, y1, 890, y1, C.dim, dq, 1.2); lbl('Δ(κ)', 150, y1 - 40, C.cyan, dq, 17, 'right');
    curve(p => { const r = E[Math.round(p * n)]; return [xS(r[0]), yD(r[2])]; }, n, C.cyan, dq, 3);
    [0.1, 0.25, 0.4].forEach(v => lbl(String(v), xS(v), 800, C.dim, dq, 14));
    lbl('κ', 905, y1 + 6, C.dim, dq, 18, 'left');
    chip(1390, 260, 780, 58, 'r = 1 − Z ,   Δ = r κ − XY', C.cyan, q, 24);
    chip(1390, 340, 780, 58, 'Δ = p₀ p₂₅ − p₂ p₅', C.cyan, dq, 25);
    lbl('Cov(x, y | z = 0) = Δ / r² :  Δ = 0 is conditional independence', 1390, 400, C.dim, dq, 15);
    chip(1390, 480, 780, 58, 'H′ = −ϑ ,  ϑ = log(p₀p₂₅ / p₂p₅) ,  ϑ′ > 0', C.gold, hq, 22);
    chip(1390, 580, 780, 62, 'κ* = XY / r :  unique max of H ,  Δ(κ*) = 0', C.green, mq, 23);
    lbl('example :  0.4 · 0.5 / 0.8 = 0.25 ,  law (0.15, 0.15, 0.2, 0.25, 0.25)', 1390, 640, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'Its curvature is the Fisher information', 0.6, 0.3);
  if (q > 0) {
    const y0 = 760, hh = 470, yI = v => y0 - (Math.log10(v) - 1) / 3 * hh;
    plotAxes(170, y0, 720, hh, q, '', 'I(κ)  (log scale)'); lbl('κ', 905, y0 + 6, C.dim, q, 18, 'left');
    [10, 100, 1000, 10000].forEach(v => { lbl(String(v), 160, yI(v) + 6, C.dim, q, 14, 'right'); dashed(170, yI(v), 890, yI(v), C.dim, q * 0.25, 1); });
    curve(p => { const r = E[Math.round(p * n)]; return [xS(r[0]), yI(Math.min(r[3], 10000))]; }, n, C.gold, q, 3.5);
    [0.1, 0.25, 0.4].forEach(v => lbl(String(v), xS(v), y0 + 26, C.dim, q, 14));
    dot(xS(0.25), yI(64 / 3), 11, 'n', q); lblG('I(κ*) = 64/3 ≈ 21.3', xS(0.25), yI(64 / 3) - 22, C.green, q, 18);
    lbl('diverges at both ends of the fiber', 530, 330, C.dim, q, 15);
    chip(1390, 260, 780, 60, 'I(κ) = 1/p₀ + 1/p₂ + 1/p₅ + 1/p₂₅ = −H″', C.gold, q, 23);
    const hq = Q(S, 1, 'the Hessian of negative entropy along the seam', 0.6);
    chip(1390, 350, 780, 58, 'D²( Σ pₛ log pₛ )[d, d] = Σ dₛ² / pₛ = I(κ)', C.green, hq, 22);
    lbl('ds²_F = I(κ) dκ² ;  aₛ = 2√pₛ lies on the sphere of radius 2', 1390, 410, C.dim, hq, 15);
    const fq = Q(S, 1, 'Added state energies keep free energy strictly convex', 0.6);
    box(1000, 460, 780, 230, C.orange, fq, 2, 'rgba(40,20,0,0.35)');
    lblG('F_β = Σ Eₛ pₛ − H / β', 1390, 510, C.white, fq, 26);
    lblG('F_β′ = ΔE + ϑ / β ,   F_β″ = I / β > 0', 1390, 565, C.orange, fq, 22);
    lblG('minimum :  p₀p₂₅ / (p₂p₅) = e^(−βΔE)', 1390, 620, C.white, fq, 22);
    lbl('ΔE = E₀ + E₂₅ − E₂ − E₅ ;  ΔE = 0 gives κ*', 1390, 665, C.dim, fq, 15);
  }
};

/* ---- 05 READOUT CONTRACTION (§5, §20.4, §21.4) ---- */
SCENES.contract = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The same Cauchy–Schwarz step', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Send the state through any noisy readout', 0.6) * f1;
    const sy = s => 300 + ST123.indexOf(s) * 95, ay = j => 350 + j * 140;
    ST123.forEach((s, i) => { for (let j = 0; j < 3; j++) { const w = rnd(i * 7 + j, 3); line(260, sy(s), 640, ay(j), C.cyan, q * (0.15 + 0.7 * w), 1 + 3 * w); } });
    ST123.forEach(s => { dot(240, sy(s), 16, SD123[s], q); lbl(s, 200, sy(s) + 7, SC123[s], q, 20, 'right'); });
    for (let j = 0; j < 3; j++) { dot(660, ay(j), 16, 'o', q); lbl('a' + (j + 1), 700, ay(j) + 7, C.orange, q, 20, 'left'); }
    lblG('W(a | s)', 450, 270, C.cyan, q, 22); lblG('q_a = Σ W(a | s) pₛ', 450, 780, C.white, q, 20);
    const sq = Q(S, 0, 'can only shrink', 0.6) * f1;
    chip(1390, 260, 780, 58, 'I_out = Σ_a (q_a′)² / q_a  ≤  I', C.gold, sq, 23);
    const lq = Q(S, 0, 'the loss is exactly the average conditional variance', 0.6) * f1;
    chip(1390, 340, 780, 58, 'I − I_out = E[ Var(S | a) ] ,   S = d / p', C.green, lq, 22);
    const px = 1010, py = 790, pw = 740, ph = 340, yS = v => py - v / 1.1 * ph;
    plotAxes(px, py, pw, ph, sq, '3000 random readouts at κ* (sorted)', 'I_out / I');
    dashed(px, yS(1), px + pw, yS(1), C.red, sq, 2); lbl('I = 64/3', px + pw - 6, yS(1) - 12, C.red, sq, 16, 'right');
    V123.contract.ratios.forEach((v, i) => dot(px + 10 + i * (pw - 20) / 99, yS(v), 4, 'g', clamp(sq * 1.6 - i / 130)));
    [0, 0.5, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, sq, 14, 'right'));
    lbl('max ratio 1 : only readouts that lose no score information', px + 30, yS(0.85), C.dim, lq, 14, 'left');
  }
  const q = Q(S, 1, 'The same Cauchy–Schwarz step', 0.6, 0.3);
  if (q > 0) {
    const mq = Q(S, 1, 'merging nodes with conditional weights', 0.6);
    const fx = i => 200 + i * 125, cxp = j => 262 + j * 250;
    for (let i = 0; i < 6; i++) { const j = Math.floor(i / 2); arrow(fx(i), 335, cxp(j), 545, C.cyan, mq * 0.8, 2); dot(fx(i), 320, 14, 'c', mq); }
    for (let j = 0; j < 3; j++) { dot(cxp(j), 565, 20, 'g', mq); }
    lbl('fine layer j + 1', 520, 285, C.cyan, mq, 17); lbl('coarse layer j', 520, 612, C.gold, mq, 17);
    lblG('weights a(w | v) ,  μ_(j+1)(w) = μ_j(v) a(w | v)', 520, 648, C.white, mq, 17);
    chip(540, 718, 800, 58, 'I_j(q_j p ; Dq_j u)  ≤  I_(j+1)(p ; u)', C.gold, q, 23);
    lbl('equality iff each score u / p is constant on every merged fiber', 540, 775, C.dim, q, 15);
    const dq = Q(S, 1, 'or deleting the last Fibonacci position', 0.6);
    const S4 = ['0000', '1000', '0100', '0010', '0001', '1010', '1001', '0101'], S3 = ['000', '100', '010', '001', '101'];
    lbl('Σ₄', 1120, 270, C.cyan, dq, 20); lbl('Σ₃ = the five states', 1560, 270, C.gold, dq, 20);
    S3.forEach((w, j) => { lbl(w, 1560, 330 + j * 76, C.gold, dq, 20); });
    S4.forEach((w, i) => { const yy = 315 + i * 50, j = S3.indexOf(w.slice(0, 3)); lbl(w, 1120, yy + 7, C.cyan, dq, 18); arrow(1175, yy, 1500, 324 + j * 76, C.dim, dq * 0.7, 1.4); });
    lbl('delete position 4 :  D_n p (J) = Σ p(I) over I ∩ [n] = J', 1390, 735, C.dim, dq, 15);
    const nq = Q(S, 1, 'never raises it', 0.6);
    chip(1390, 790, 780, 52, 'I_n(D_n p ; D_n u)  ≤  I_(n+1)(p ; u)', C.green, nq, 21);
  }
};

/* ---- 06 SEAM AND LOOP (§6, §22.2–22.6, §22.13) ---- */
SCENES.seam = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On any connected graph', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now the five-edge graph', 0.6) * f1;
    const lq = Q(S, 0, 'It has one loop', 0.6) * f1;
    g5_123(580, 500, 150, q, { elab: e => ['f₁', 'f₂', 'f₃', 'f₄', 'f₅'][e], ecol: e => (e < 4 && lq > 0.5 ? C.gold : C.cyan), ew: e => (e < 4 ? 2.6 + 2 * lq : 2.6) });
    if (lq > 0) { ell123(580, 500, 70, 70, C.gold, lq, 2.5, 0, 1); arrow(650, 490, 648, 510, C.gold, lq, 2.5); lbl('c', 580, 508, C.gold, lq, 24); }
    lbl('edge flows  f₁ : 0→2 ,  f₂ : 2→25 ,  f₃ : 25→5 ,  f₄ : 5→0 ,  f₅ : 0→3', 520, 790, C.dim, q, 15);
    chip(1390, 260, 800, 56, 'B f = (−f₁ + f₄ − f₅ ,  f₁ − f₂ ,  f₅ ,  f₃ − f₄ ,  f₂ − f₃)', C.cyan, q, 20);
    chip(1390, 335, 800, 56, 'ker B = ℝ c ,   c = (1, 1, 1, 1, 0)', C.gold, lq, 23);
    const pq = Q(S, 0, 'flows with invisible boundary form a plane', 0.6) * f1;
    chip(1390, 410, 800, 56, 'invisible boundary :  ker(AB) = { (s, t, s, t, 0) }', C.white, pq, 21);
    const mq = Q(S, 0, 'mapping onto the seam d', 0.6) * f1;
    chip(1390, 485, 800, 56, 'B (s, t, s, t, 0) = (t − s) d', C.green, mq, 23);
    const xq = Q(S, 0, 'with the loop as kernel', 0.6) * f1;
    box(1000, 560, 780, 150, C.green, xq, 2.5, 'rgba(0,40,20,0.35)');
    lblG('0 → ℝc → ker(AB) → ℝd → 0', 1390, 630, C.white, xq, 34);
    lbl('static seam = boundary class ;  loop = cycle freedom', 1390, 680, C.dim, xq, 16);
  }
  const q = Q(S, 1, 'On any connected graph', 0.6, 0.3);
  if (q > 0) {
    const nq = Q(S, 1, 'while a nonnegative flow needs two', 0.6), sq = Q(S, 1, 'Here the minimal signed lift', 0.6) * (1 - nq);
    const fs = ['−½', '½', '−½', '½', '0'], fn = ['0', '1', '0', '1', '0'];
    g5_123(580, 440, 135, q, { elab: e => (nq > 0.5 ? fn[e] : sq > 0 ? fs[e] : ''), ela: Math.max(sq, nq), elc: e => (nq > 0.5 ? (fn[e] === '0' ? C.dim : C.green) : (fs[e][0] === '−' ? C.red : C.cyan)), els: 22 });
    lblG('f_sgn = (−½, ½, −½, ½, 0) ⊥ c ,  B f = d ,  ‖f‖² = 1', 520, 690, C.cyan, sq, 19);
    lblG('f_nonneg = (0, 1, 0, 1, 0) ,  B f = d ,  ‖f‖² = 2', 520, 690, C.green, nq, 19);
    lbl('all lifts :  f_sgn + γ c', 520, 735, C.dim, q, 16);
    const cq = Q(S, 1, 'the lifts of one seam differ exactly by cycles', 0.6);
    chip(1390, 255, 800, 56, 'B⁻¹(s) = f₀ + K ,   K = ker B', C.gold, cq, 23);
    const wq = Q(S, 1, 'a weighted minimal lift removes only that freedom', 0.6);
    chip(1390, 330, 800, 56, 'L_W(s) = W Bᵀ L_W⁺ s ,   L_W = B W Bᵀ', C.cyan, wq, 22);
    lbl('‖L_W(s) + k‖²_(W⁻¹) = g_W(s, s) + ‖k‖²_(W⁻¹) ,  g_W = sᵀ L_W⁺ s > 0', 1390, 385, C.dim, wq, 15);
    const px = 1040, py = 790, pw = 700, ph = 330, xS = g => px + (g + 1) / 2 * pw, yS = v => py - v / 5.2 * ph;
    plotAxes(px, py, pw, ph, sq + nq, 'γ', '‖f_sgn + γ c‖² = 1 + 4γ²');
    fillBox(xS(0.5), py - ph, xS(1) - xS(0.5), ph, C.green, nq * 0.12); lbl('nonnegative : γ ≥ ½', xS(0.75), py - ph - 12, C.green, nq, 15);
    curve(p => { const r = V123.lifts[Math.round(p * 40)]; return [xS(r[0]), yS(r[1])]; }, 40, C.gold, sq + nq, 3);
    dot(xS(0), yS(1), 11, 'c', sq + nq); lbl('1', xS(0), yS(1) + 30, C.cyan, sq + nq, 17);
    dot(xS(0.5), yS(2), 11, 'n', nq); lbl('2', xS(0.5) + 18, yS(2) + 6, C.green, nq, 17, 'left');
    [-1, 0, 0.5].forEach(g => lbl(String(g), xS(g), py + 26, C.dim, sq + nq, 14));
  }
};

/* ---- 07 FIBONACCI CYCLES (§7, §21.2, §22.9, §22.11–22.12, §25.2) ---- */
SCENES.cycles = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const C1 = V123.cycles;
  const f1 = 1 - Q(S, 1, 'Seams have dimension', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With n positions', 0.6) * f1;
    cube4_123(540, 560, 1.25, q);
    lbl('Fibonacci cube Γ₄ :  8 supports , 10 edges', 540, 290, C.cyan, q, 18);
    lbl('N₄,ₖ = 1 , 4 , 3  (sizes 0 , 1 , 2)', 540, 790, C.dim, q, 16);
    const vq = Q(S, 0, 'there are F n plus two supports', 0.6) * f1;
    chip(1390, 255, 800, 56, '|Σ_n| = F_(n+2) ,   N_(n,k) = C(n − k + 1, k)', C.green, vq, 22);
    const bx = 1030, by = 780, bw = 52, gap = 20, hs = 2.1;
    C1.V.forEach((v, i) => { const qq = clamp(vq * 1.6 - i / 12), x = bx + i * (bw + gap), hgt = v * hs, gold = i < 3; fillBox(x, by - hgt, bw, hgt, gold ? C.gold : C.green, qq * 0.45); rect63(x, by - hgt, bw, hgt, gold ? C.gold : C.green, qq, 1.5); lbl(String(v), x + bw / 2, by - hgt - 10, C.white, qq, 15); lbl(String(i + 1), x + bw / 2, by + 24, C.dim, qq, 14); });
    lbl('n', bx + 10 * (bw + gap) + 4, by + 24, C.dim, vq, 14, 'left');
    const tq = Q(S, 0, 'two, three and five for n equal to one, two, three', 0.6) * f1;
    stamp('2 · 3 · 5', 1180, 560, tq, C.gold, 34, -0.04);
    const bq = Q(S, 0, 'The boundary sequence holds at every n', 0.6) * f1;
    chip(1390, 335, 800, 56, 'im B = T ,   0 → ker B → ker(AB) → ker(A|_T) → 0', C.cyan, bq, 21);
    lbl('frozen : admissibleWord_card_eq_fib · support_count_eq_choose ·', 1390, 392, C.green, bq, 14);
    lbl('edge_count · native_boundary_image_short_exact', 1390, 414, C.green, bq, 14);
  }
  const q = Q(S, 1, 'Seams have dimension', 0.6, 0.3);
  if (q > 0) {
    const bx = 170, by = 780, hs = 1.25;
    for (let i = 2; i < 10; i++) { const x = bx + (i - 2) * 96, hh = C1.h[i] * hs, hc = C1.c[i] * hs, qq = clamp(q * 1.6 - (i - 2) / 10); fillBox(x, by - hh, 38, hh, C.cyan, qq * 0.45); rect63(x, by - hh, 38, Math.max(hh, 0.5), C.cyan, qq, 1.4); fillBox(x + 40, by - hc, 38, hc, C.mag, qq * 0.45); rect63(x + 40, by - hc, 38, Math.max(hc, 0.5), C.mag, qq, 1.4); lbl(String(C1.h[i]), x + 19, by - hh - 8, C.cyan, qq, 13); lbl(String(C1.c[i]), x + 59, by - hc - 8, C.mag, qq, 13); lbl(String(i + 1), x + 39, by + 24, C.dim, qq, 14); }
    lbl('h_n = F_(n+2) − n − 1  (seams)', 190, 290, C.cyan, q, 18, 'left'); lbl('c_n = E_n − V_n + 1  (cycles)', 190, 322, C.mag, q, 18, 'left');
    lbl('n', 170 + 8 * 96, by + 24, C.dim, q, 14, 'left');
    const wq = Q(S, 1, 'From n equal to five cycles strictly win', 0.6);
    chip(1390, 255, 800, 56, 'c_n − h_n = Σ_(k≥3) (k − 2) N_(n,k) > 0   for n ≥ 5', C.mag, wq, 21);
    lbl('C(z) − H(z) = z⁵ / ((1 − z)² (1 − z − z²)²)', 1390, 312, C.dim, wq, 15);
    if (wq > 0) { const x = bx + 2 * 96; ring(x + 39, by - C1.c[4] * hs - 34, 22, C.gold, wq, 2); }
    const rq = Q(S, 1, 'by a ratio growing like n over phi squared plus one', 0.6);
    const px = 1040, py = 790, pw = 700, ph = 330, xS = n => px + (n - 3) / 36 * pw, yS = v => py - v / 11 * ph;
    plotAxes(px, py, pw, ph, rq, 'n', 'c_n / h_n');
    curve(p => { const n = 3 + p * 36; return [xS(n), yS(n / 3.6180339887)]; }, 40, C.gold, rq, 2.5);
    V123.ratio.forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'm', rq));
    lblG('n / (φ² + 1) ,  φ² + 1 = 3.618…', xS(22), yS(8.4), C.gold, rq, 17);
    [5, 20, 35].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, rq, 14)); [0, 5, 10].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, rq, 14, 'right'));
    lbl('dots : exact c_n / h_n ;  ratio / (n/(φ² + 1)) → 1  (0.9990 at n = 3000)', 1390, 384, C.dim, rq, 14);
    lbl('each added position : F_(n+1) − 1 = 0, 1, 2, 4, 7, 12, 20, 33, 54 hidden directions', 1390, 352, C.cyan, rq, 15);
  }
};

/* ---- 08 INVERSE LIMITS (§20.2, §20.6–20.9, §23) ---- */
SCENES.limits = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Nonempty is not unique', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Stack finite layers with compatible maps', 0.6) * f1;
    const ly = j => 770 - j * 140, cols = [C.gold, C.green, C.cyan, C.vio];
    for (let j = 0; j < 4; j++) { const y = ly(j), pts = [[220, y], [760, y], [860, y - 70], [320, y - 70]]; fillPoly(pts, cols[j], q * 0.1); strokePoly(pts, cols[j], q, 2); lbl('C' + ['₀', '₁', '₂', '₃'][j], 190, y - 25, cols[j], q, 22, 'right'); }
    const tq = Q(S, 0, 'the inverse limit is nonempty', 0.6) * f1;
    for (let j = 0; j < 3; j++) { arrow(900, ly(j + 1) - 30, 900, ly(j) - 40, C.dim, q, 2); lbl('ρ' + ['₀', '₁', '₂'][j], 915, ly(j) - 80, C.dim, q, 18, 'left'); }
    const cx = j => 520 + 30 * Math.sin(j * 1.3 + 0.4);
    for (let j = 0; j < 4; j++) { dot(cx(j), ly(j) - 35, 11, 'g', tq); if (j < 3) line(cx(j), ly(j) - 35, cx(j + 1), ly(j + 1) - 35, C.gold, tq, 2.5); }
    lbl('one compatible family (c_j)', 540, 252, C.gold, tq, 17);
    const cq = Q(S, 0, 'If every layer is nonempty, compact and convex', 0.6) * f1;
    chip(1390, 260, 800, 56, 'C_j nonempty , compact , convex ;  ρ_j continuous , affine , onto', C.white, cq, 19);
    chip(1390, 335, 800, 56, '⇒  lim← (C_j, ρ_j)  nonempty , compact , convex', C.green, tq, 22);
    lbl('finite intersection property in the compact product', 1390, 390, C.dim, tq, 15);
    const dq = Q(S, 0, 'Graph Dirichlet energy contracts', 0.6) * f1;
    box(1000, 450, 780, 230, C.cyan, dq, 2, 'rgba(0,30,40,0.35)');
    lblG('G_j R_j = S_j G_(j+1) ,   ‖S_j‖ ≤ 1', 1390, 505, C.white, dq, 24);
    lblG('⇒  Q_j(R_j f) ≤ Q_(j+1)(f) ,   Q_j(f) = ‖G_j f‖²', 1390, 565, C.cyan, dq, 22);
    lbl('B_j S_j = R_j B_(j+1) alone is not enough : the energy uses G_j = B_jᵀ', 1390, 620, C.dim, dq, 15);
    lbl('restricted spectral gaps pass to finer layers : λ_(j+1) ≥ c_j² λ_j', 1390, 655, C.dim, dq, 15);
  }
  const q = Q(S, 1, 'Nonempty is not unique', 0.6, 0.3);
  if (q > 0) {
    const mq = Q(S, 1, 'without Mosco and recovery conditions', 0.6);
    chip(540, 260, 800, 56, '(M1) liminf  +  (M2) recovery sequence  ⇒  Q_j(f_j) → Q(f)', C.cyan, mq, 19);
    lbl('compatible families converge in energy only if they are recovery sequences', 540, 315, C.dim, mq, 15);
    const iq = Q(S, 1, 'For the hidden coordinate', 0.6);
    const xS = k => 170 + (k - 0.05) / 0.4 * 740;
    V123.rigid.imgs.forEach((r, m) => { const y = 380 + m * 52, qq = clamp(iq * 1.6 - m / 10); fillBox(xS(r[0]), y, xS(r[1]) - xS(r[0]), 26, C.green, qq * 0.35); rect63(xS(r[0]), y, xS(r[1]) - xS(r[0]), 26, C.green, qq, 1.5); lbl('m = ' + m, 160, y + 20, C.dim, qq, 14, 'right'); });
    dashed(xS(0.25), 365, xS(0.25), 800, C.gold, iq, 1.6); lblG('κ* = 0.25', xS(0.25), 820, C.gold, iq, 16);
    lbl('worked example : F = [0.1, 0.4] ,  f(t) = 0.25 + ½ (t − 0.25)', 540, 350, C.white, iq, 15);
    const sq = Q(S, 1, 'if fiber widths times products of affine slopes tend to zero', 0.6);
    chip(1390, 260, 800, 58, 'diam(F_n) · ∏_(k=j…n−1) |a_k|  →  0', C.gold, sq, 23);
    chip(1390, 340, 800, 56, '⇒  κ_j = κ′_j  for any two compatible families', C.green, sq, 21);
    const oq = Q(S, 1, 'the limit has at most one point', 0.6);
    lbl('at most one point ; with onto bondings exactly one ;', 1390, 400, C.white, oq, 16);
    lbl('then the reconstruction fixes p_j = p′_j at every layer', 1390, 425, C.white, oq, 16);
    const px = 1040, py = 790, pw = 700, ph = 300, xP = m => px + m / 11 * pw, yP = v => py - (Math.log10(v) + 4) / 4 * ph;
    plotAxes(px, py, pw, ph, sq, 'm', 'diam · ∏ |a_k|  (log)');
    V123.rigid.bound.forEach((v, m) => dot(xP(m), yP(v), 7, 'g', sq));
    curve(p => { const m = p * 11; return [xP(m), yP(0.3 * Math.pow(0.5, m))]; }, 40, C.gold, sq * 0.6, 2);
    [1, 0.01, 0.0001].forEach(v => lbl(String(v), px - 10, yP(v) + 6, C.dim, sq, 13, 'right'));
    lbl('0.3 · 2^(−m)', xP(6), yP(0.03), C.gold, sq, 15, 'left');
  }
};

/* ---- 09 THREE SPECTRA AND THE FLOW (§15.2, §15.5, §17.2.2, §18.3, §24.6) ---- */
SCENES.flow = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const SP = V123.spectra;
  const f1 = 1 - Q(S, 1, 'The mass-action flow on the seam', 0.6);
  if (f1 > 0) {
    const panels = [['STATIC CURVATURE', 'Spec K*  (Hessian)', 'the static curvature of a Hessian', C.gold], ['DISSIPATIVE DECAY', "u′ = −M K* u :  Spec M K*", 'the decay rates of a gradient flow', C.cyan], ['SYMPLECTIC FREQUENCIES', "u′ = J K* u :  Spec J K* = ±iω", 'the frequencies of a symplectic flow', C.mag]];
    panels.forEach(([h, s, ph, col], i) => {
      const qq = Q(S, 0, ph, 0.6) * f1, x0 = 130 + i * 570, y0 = 250;
      box(x0, y0, 520, 420, col, qq, 2, 'rgba(0,0,0,0.45)'); lbl(h, x0 + 260, y0 + 40, col, qq, 20); lblG(s, x0 + 260, y0 + 80, C.white, qq, 20);
      const ax = v => x0 + 50 + v / 2.8 * 420, ay = y0 + 300;
      if (i < 2) { line(x0 + 40, ay, x0 + 490, ay, C.dim, qq, 1.5); lbl('0', ax(0), ay + 26, C.dim, qq, 14); lbl('real axis', x0 + 480, ay + 26, C.dim, qq, 14, 'right'); }
      if (i === 0) SP.K.forEach((v, k) => { fillBox(ax(v) - 9, ay - 140, 18, 140, col, qq * 0.45); rect63(ax(v) - 9, ay - 140, 18, 140, col, qq, 1.4); lbl(v.toFixed(2), ax(v), ay - 150 - (k % 2) * 20, C.white, qq, 14); });
      if (i === 1) SP.MK.forEach((v, k) => { dot(ax(v), ay, 10, 'c', qq); lbl(v.toFixed(2), ax(v), ay - 22 - (k % 2) * 20, C.white, qq, 14); });
      if (i === 2) { const cx = x0 + 260, cyy = y0 + 250; line(x0 + 60, cyy, x0 + 460, cyy, C.dim, qq, 1.2); line(cx, y0 + 110, cx, y0 + 390, C.dim, qq, 1.5); lbl('iℝ', cx - 14, y0 + 125, C.dim, qq, 16, 'right'); SP.JK.forEach(v => { dot(cx, cyy - v * 120, 10, 'm', qq); lbl((v > 0 ? '+' : '−') + Math.abs(v).toFixed(2) + 'i', cx + 22, cyy - v * 120 + 6, C.white, qq, 14, 'left'); }); }
      lbl(['η : curvature', 'λ : decay rate', 'ω : frequency ; H₂ = ½⟨u, K*u⟩ conserved'][i], x0 + 260, y0 + 395, C.dim, qq, 15);
    });
    lbl('displayed example : K* = GGᵀ > 0 (4 × 4) ,  M = diag(0.5, 1, 1.5, 2) ,  J symplectic', W / 2, 715, C.dim, Q(S, 0, 'Three spectra must stay apart', 0.6) * f1, 15);
    const qq = Q(S, 0, 'Only a quantisation rule makes frequencies energy levels', 0.6) * f1;
    chip(W / 2, 780, 1100, 58, 'E_n = ħω(n + ½)  only after an added quantisation rule', C.orange, qq, 23);
  }
  const q = Q(S, 1, 'The mass-action flow on the seam', 0.6, 0.3);
  if (q > 0) {
    const gq = Q(S, 1, 'a gradient flow of negative entropy', 0.6);
    chip(1390, 255, 800, 56, 'M_p = γ Λ(p₂p₅, p₀p₂₅) d dᵀ   (log mean , rank one)', C.cyan, q, 20);
    chip(1390, 330, 800, 56, '−M_p DV(p) = γ (p₂p₅ − p₀p₂₅) d ,   V = Σ p log p', C.gold, gq, 20);
    const rq = Q(S, 1, 'kappa relaxes to kappa star at rate gamma r', 0.6);
    chip(1390, 420, 800, 60, 'κ(t) = κ* + e^(−γ r t) (κ(0) − κ*)', C.green, rq, 25);
    const lq = Q(S, 1, 'and stays legal', 0.6);
    lbl('a convex combination of κ* and κ(0) : it never leaves the fiber', 1390, 480, C.white, lq, 16);
    const nq = Q(S, 1, 'but gamma is added data', 0.6);
    box(1000, 530, 780, 120, C.red, nq, 2, 'rgba(40,0,10,0.35)');
    lbl('γ is added dynamical data :', 1390, 578, C.red, nq, 19);
    lbl('no value of γ , mass , frequency or energy level follows', 1390, 615, C.white, nq, 16);
    const px = 160, py = 790, pw = 740, ph = 470, xS = tt => px + tt / 6 * pw, yS = k => py - (k - 0.05) / 0.4 * ph;
    plotAxes(px, py, pw, ph, q, 't  (γ = 1 , r = 0.8)', 'κ(t)');
    fillBox(px, yS(0.4), pw, yS(0.1) - yS(0.4), C.green, q * 0.08);
    dashed(px, yS(0.25), px + pw, yS(0.25), C.gold, q, 1.5); lblG('κ* = 0.25', px + pw - 6, yS(0.25) - 12, C.gold, q, 16, 'right');
    lblG('legal fiber [0.1, 0.4]', px + 12, yS(0.4) - 10, C.green, q, 15, 'left');
    const sh = clamp((S.u - lineAt(S, 1).s) / 6);
    V123.flow.curves.forEach((cv, i) => curve(p => { const k = Math.round(p * 60 * Math.max(sh, 0.02)); return [xS(V123.flow.t[k]), yS(cv[k])]; }, Math.max(2, Math.round(60 * sh)), [C.cyan, C.mag, C.orange, C.white][i], rq, 3));
    [0.1, 0.25, 0.4].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, q, 14, 'right'));
  }
};

/* ---- 10 TYPED BRIDGES (§8, §12.11–12.13, §14.7, §16) ---- */
SCENES.bridges = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Every object is typed primitive', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Arithmetic enters only through an explicit encoding', 0.6) * f1;
    const st = [['CONFIGURATIONS C', 'prime windows · residues · gaps', C.vio], ['ENCODING Φ', 'Φ : C → Δ(Σ_n)', C.gold], ['DRIVE T_χ', 'optional transfer', C.cyan], ['RECORD R_χ', 'linear readout', C.green]];
    st.forEach(([h, s, col], i) => { const x = 150 + i * 420, qq = clamp(q * 1.6 - i / 5); box(x, 240, 360, 120, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, x + 180, 285, col, qq, 19); lblG(s, x + 180, 330, C.white, qq, 18); if (i < 3) arrow(x + 365, 300, x + 415, 300, C.dim, qq, 2.5); });
    lbl('the map Φ must be given and shown to keep support , positivity and closure', W / 2, 395, C.dim, q, 15);
    const rq = Q(S, 0, 'A linear record identifies kappa', 0.6) * f1;
    chip(540, 470, 820, 58, 'R_χ(p_κ) − R_χ(p_κ′) = (κ − κ′) R_χ(d)', C.white, rq, 23);
    const eq = Q(S, 0, 'exactly when some input sends d to a nonzero value', 0.6) * f1;
    chip(540, 560, 820, 60, 'κ identifiable  ⇔  R_χ(d) ≠ 0 for some χ', C.green, eq, 24);
    lbl('nondegenerate fiber , exact full record', 540, 615, C.dim, eq, 15);
    const rows = [['visible (X, Y, Z)', 'P d = (0, 0, 0)', 'blind', 'the mean of W gives zero', C.red], ['mean of W', '0 − 2 + 0 − 5 + 7 = 0', 'blind', 'the mean of W gives zero', C.red], ['mean of W²', '0 − 4 + 0 − 25 + 49 = 20', 'identifies κ', 'its second moment twenty', C.green]];
    lbl('record', 1080, 470, C.dim, eq, 16, 'left'); lbl('value on d', 1460, 470, C.dim, eq, 16);
    rows.forEach(([a1, a2, a3, ph, col], i) => { const qq = Q(S, 0, ph, 0.6) * f1, y = 500 + i * 85; box(1040, y, 740, 70, col, qq, 1.6, 'rgba(0,0,0,0.45)'); lbl(a1, 1060, y + 44, C.white, qq, 18, 'left'); lblG(a2, 1460, y + 44, C.white, qq, 18); lbl(a3, 1760, y + 44, col, qq, 18, 'right'); });
  }
  const q = Q(S, 1, 'Every object is typed primitive', 0.6, 0.3);
  if (q > 0) {
    const L = [['PRIMITIVE', 'Σ ,  x, y, z ,  P₀ ,  d ,  graphs (V_j, E_j, B_j, A_j)', C.cyan], ['DERIVED', 'p_κ ,  Δ ,  entropy ,  Fisher g_F ,  ker B_j ,  L_j = B_j B_jᵀ', C.gold], ['BRIDGE', 'fields Φ ,  energies Eₛ ,  mobility ,  J ,  m_κ ,  tree coupling ,  triangle lift ,  map to zeta zeros', C.vio]];
    L.forEach(([h, s, col], i) => { const qq = clamp(q * 1.6 - i / 5), y = 250 + i * 165; box(150, y, 800, 140, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, 550, y + 45, col, qq, 22); lblG(s, 550, y + 95, C.white, qq, i === 2 ? 15 : 17); });
    lbl('derived symbols unfold into primitive ones ; bridge symbols need explicit axioms', 550, 765, C.dim, q, 15);
    const mq = Q(S, 1, 'holds only in models satisfying them', 0.6);
    chip(1390, 270, 800, 62, 'L₀ + H ⊢ T  ⇒  M⁺ ⊨ T  for every model M⁺ of L₀ + H', C.white, mq, 22);
    const cq = Q(S, 1, 'so it never becomes an unconditional primitive theorem', 0.6);
    chip(1390, 380, 800, 60, 'T stays conditional on H : no L₀ theorem by itself', C.gold, cq, 22);
    lbl('a statement using E_s , J , M , V_bridge or the RH map must list its H', 1390, 440, C.dim, cq, 15);
    const vq = Q(S, 1, 'if no model satisfies them it is vacuous', 0.6);
    chip(1390, 520, 800, 60, 'no model of L₀ + H  ⇒  T holds vacuously', C.red, vq, 23);
    lbl('consistency and existence of the extension are proof obligations', 1390, 580, C.dim, vq, 15);
    stamp('CONDITIONS , NOT RESULTS', 1390, 700, vq, C.vio, 30, -0.04);
  }
};

/* ---- 11 TRIANGLE NETWORKS (§9, §14, §17.3, §18.4) ---- */
SCENES.triangle = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Inflation gives finite certificates', 'published']]);
  const f1 = 1 - Q(S, 1, 'Conversely, a five-state law', 0.6);
  const A = [540, 300], B = [780, 660], Cc = [300, 660];
  const tri = (a) => {
    const g = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], al = [(B[0] + Cc[0]) / 2, (B[1] + Cc[1]) / 2], be = [(Cc[0] + A[0]) / 2, (Cc[1] + A[1]) / 2];
    [[g, A], [g, B], [al, B], [al, Cc], [be, Cc], [be, A]].forEach(([p, o]) => line(p[0], p[1], o[0], o[1], C.gold, a * 0.7, 2.5));
    [[g, 'γ'], [al, 'α'], [be, 'β']].forEach(([p, s]) => { dot(p[0], p[1], 15, 'g', a); lblG(s, p[0] + (p[0] > 540 ? 24 : p[0] < 540 ? -24 : 0), p[1] + (p === al ? 40 : 6), C.gold, a, 24); });
    [[A, 'A(a | β, γ)'], [B, 'B(b | γ, α)'], [Cc, 'C(c | α, β)']].forEach(([p, s]) => { ring(p[0], p[1], 26, C.cyan, a, 2.5); lblG(s, p[0], p[1] + (p === A ? -40 : 56), C.cyan, a, 19); });
  };
  if (f1 > 0) {
    const q = Q(S, 0, 'three independent sources feed three observers', 0.6) * f1;
    tri(q);
    lbl('sources μ_α ⊗ μ_β ⊗ μ_γ ; each observer reads its two neighbours', 540, 790, C.dim, q, 15);
    chip(1390, 255, 800, 56, 'P_T(a, b, c) = Σ μ_α μ_β μ_γ A(β,γ,a) B(γ,α,b) C(α,β,c)', C.cyan, q, 18);
    const pq = Q(S, 0, 'The output is a probability law', 0.6) * f1;
    chip(1390, 330, 800, 54, 'P_T ≥ 0 ,  Σ P_T = 1', C.green, pq, 23);
    const fq = Q(S, 0, 'so any event pushforward to five states is one', 0.6) * f1;
    chip(1390, 405, 800, 54, 'q_s = Σ_(f(a,b,c) = s) P_T(a, b, c)  ⇒  Prob(q)', C.gold, fq, 20);
    lbl('recomputed : 200 random finite triangle models with random event maps', 1390, 455, C.dim, fq, 14);
    const xq = Q(S, 0, 'without the pushforward condition this fails', 0.6) * f1;
    box(1000, 500, 780, 210, C.red, xq, 2, 'rgba(40,0,10,0.35)');
    lbl('counterexample (Proposition 14.6)', 1390, 545, C.red, xq, 19);
    lbl('one-point sources , every response outputs 0', 1390, 590, C.white, xq, 17);
    lblG('P_T(0, 0, 0) = 1 ,   but  q = 0  has  Σ q = 0', 1390, 635, C.white, Q(S, 0, 'already for q equal to zero', 0.6) * f1, 21);
    lbl('triangle data alone do not make an arbitrary q a law', 1390, 680, C.dim, xq, 15);
  }
  const q = Q(S, 1, 'Conversely, a five-state law', 0.6, 0.3);
  if (q > 0) {
    chipG(540, 260, 820, 58, 'five-state law  ⇏  three independent sources', C.red, q, 24);
    lbl('the pushforward is a necessary local marginal only', 540, 315, C.dim, q, 15);
    const cq = Q(S, 1, 'an exact y with A transpose y nonnegative', 0.6);
    chip(540, 400, 820, 58, 'A_N q = b_N(p) ,  q ≥ 0   (inflation level N)', C.cyan, Q(S, 1, 'Inflation gives finite certificates', 0.6), 21);
    chip(540, 480, 820, 58, 'A_Nᵀ y ≥ 0 ,  yᵀ b_N(p) < 0   ⇒   not triangle-local', C.green, cq, 21);
    lbl('0 ≤ (A_Nᵀ y)ᵀ q = yᵀ b_N(p) < 0 would be a contradiction', 540, 535, C.dim, cq, 15);
    const pq = Q(S, 1, 'passing one level proves no compatibility', 0.6);
    chipG(540, 630, 820, 58, 'feasible at level N  ⇏  triangle-local', C.gold, pq, 24);
    lbl('uniform law : feasible in this example level , which proves nothing', 540, 685, C.dim, pq, 15);
    const eq = Q(S, 1, 'Inflation gives finite certificates', 0.6);
    box(1000, 240, 780, 470, C.cyan, eq, 2, 'rgba(0,25,40,0.35)');
    lbl('worked example computed for this film', 1390, 280, C.cyan, eq, 17);
    lbl('GHZ law p(000) = p(111) = ½ , cut inflation (A₂, B₁, C₁)', 1390, 312, C.white, eq, 16);
    lbl('rows : A₂B₁ = p_AB ,  B₁C₁ = p_BC ,  A₂C₁ = p_A ⊗ p_C', 1390, 340, C.dim, eq, 14);
    V123.farkas.y.forEach((v, i) => { const x = 1050 + (i % 6) * 118, y = 375 + Math.floor(i / 6) * 80, col = v[0] === '-' ? C.red : v === '0' ? C.dim : C.green; box(x, y, 100, 62, col, clamp(eq * 1.6 - i / 16), 1.6, 'rgba(0,0,0,0.5)'); lbl(v.replace('-', '−'), x + 50, y + 40, col, clamp(eq * 1.6 - i / 16), 22); });
    lbl('exact rational y :  min (A_Nᵀ y) = 0 ,  yᵀ b = −3/4', 1390, 575, C.green, cq, 19);
    lbl('Wolfe–Spekkens–Fritz arXiv:1609.00672 · Navascués–Wolfe arXiv:1707.06476', 1390, 630, C.cyan, eq, 14);
    lbl('exact certificates for the EJM law : Gitton–Renner arXiv:2510.15143', 1390, 660, C.cyan, eq, 14);
  }
};

/* ---- 12 CAYLEY AND RH (§10, §15.9–15.10, §17.4, §18.5, §26) ---- */
SCENES.rh = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [1, null, 'theory'], [1, 'No map from the five-state defect', 'open']]);
  const f1 = 1 - Q(S, 1, 'An equivalence is not a proof', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'For a zeta zero rho', 0.6) * f1;
    const sx = re => 200 + re * 340, sy = im => 780 - im / 52 * 500;
    box(sx(0), sy(52), 340, 500, C.dim, q, 1.2, 'rgba(0,0,0,0.35)');
    dashed(sx(0.5), sy(52), sx(0.5), sy(0), C.gold, q, 2); lbl('Re ρ = ½', sx(0.5), sy(52) - 12, C.gold, q, 16);
    lbl('0', sx(0), sy(0) + 24, C.dim, q, 14); lbl('1', sx(1), sy(0) + 24, C.dim, q, 14); lbl('strip', sx(1) + 10, sy(0) + 24, C.dim, q, 14, 'left');
    V123.cayley.forEach((r, i) => { dot(sx(0.5), sy(r[0]), 8, 'c', clamp(q * 1.6 - i / 14)); lbl(r[0].toFixed(2), sx(0.5) + 16, sy(r[0]) + 5, C.white, clamp(q * 1.6 - i / 14), 13, 'left'); });
    lbl('ten lowest zeros (mpmath)', sx(0.5), sy(0) + 50, C.dim, q, 14);
    const cq = Q(S, 0, 'the Cayley coefficient rho minus one over rho', 0.6) * f1;
    chip(1260, 255, 1000, 56, 'c(ρ) = (ρ − 1)/ρ ,   |c(ρ)|² − 1 = (1 − 2 Re ρ) / |ρ|²', C.green, cq, 22);
    const eq = Q(S, 0, 'With exhaustive zero data', 0.6) * f1;
    chip(1260, 330, 1000, 56, 'exhaustive ZeroData :  RH  ⇔  every |c_v| = 1  ⇔  C_Z unitary', C.gold, eq, 21);
    lbl('ZeroHilbertCayleyUnitarity.cayley_unitarity_defect_formula_on_zero_hilbert_space', 1260, 386, C.green, eq, 14);
    lbl('an equivalence on supplied zero data ; it does not decide where the zeros are', 1260, 410, C.dim, eq, 14);
    const px = 800, py = 790, pw = 940, ph = 320, xS = a => px + a / 0.08 * pw, yS = v => py - ph / 2 - v / 0.0013 * (ph / 2);
    plotAxes(px, py, pw, ph, cq, 'arg c(ρ)', '|c|² − 1');
    line(px, yS(0), px + pw, yS(0), C.green, cq, 2); lbl('|c| = 1', px + pw - 6, yS(0) - 10, C.green, cq, 15, 'right');
    V123.cayley.forEach(r => dot(xS(r[1]), yS(r[2]), 8, 'c', cq));
    [[0.6, C.red, 'if Re ρ were 0.6'], [0.4, C.vio, 'if Re ρ were 0.4']].forEach(([sg, col, s]) => { curve(p => { const g = 14 + p * 36, a = Math.atan2(g, sg * sg + g * g - sg), d = (1 - 2 * sg) / (sg * sg + g * g); return [xS(a), yS(d)]; }, 50, col, cq * 0.6, 2); });
    lbl('if Re ρ were 0.4  (not zeros)', xS(0.072), yS(0.0011) + 4, C.vio, cq, 14, 'right'); lbl('if Re ρ were 0.6', xS(0.072), yS(-0.0011) + 16, C.red, cq, 14, 'right');
    lbl('ten computed zeros : |c|² − 1 = 0 , a finite check , not a proof', px + pw / 2, py + 50, C.dim, cq, 14);
  }
  const q = Q(S, 1, 'An equivalence is not a proof', 0.6, 0.3);
  if (q > 0) {
    const items = [['numerical zero fits', 'An equivalence is not a proof'], ['Spec H ≅ { Im ρ } :  imaginary parts are always real', 'matching spectra to imaginary parts'], ['unitarity on finitely many zeros', 'or unitarity on finitely many zeros'], ['a formal or non-self-adjoint Hamiltonian', 'proves nothing']];
    items.forEach(([s, ph], i) => { const qq = Q(S, 1, ph, 0.6), y = 250 + i * 95; box(150, y, 800, 70, C.red, qq, 1.6, 'rgba(40,0,10,0.35)'); lblG(s, 550, y + 44, C.white, qq, 19); strike123(170, y + 37, 760, Q(S, 1, 'proves nothing', 0.6)); });
    const nq = Q(S, 1, 'one needs a self-adjoint operator with an eigenvalue for every zero', 0.6);
    box(1000, 250, 780, 300, C.green, nq, 2, 'rgba(0,40,20,0.35)');
    lbl('what a spectral bridge must supply', 1390, 290, C.green, nq, 18);
    lblG('H = H* on an explicit domain', 1390, 345, C.white, nq, 23);
    lblG('H ψ_ρ = −i(ρ − ½) ψ_ρ  for every zero ρ', 1390, 405, C.white, nq, 23);
    lblG('⇒  −i(ρ − ½) ∈ ℝ  ⇒  Re ρ = ½', 1390, 465, C.gold, nq, 23);
    lbl('or a full identity ξ(½ + iz) = C(z) D_H(z) on all of ℂ', 1390, 520, C.dim, nq, 15);
    const aq = Q(S, 1, 'No map from the five-state defect to zeros is given', 0.6);
    chip(540, 660, 800, 58, 'Δ_FIB ↦ 1 − 2 Re ρ  :  no such map is given', C.vio, aq, 22);
    stamp('AN ANALOGY , NOT A BRIDGE', 1390, 650, aq, C.vio, 28, -0.04);
    lbl('A_Fib = [[1, 1], [1, 0]] has eigenvalues φ , −1/φ : a field-side transfer spectrum only', 960, 770, C.dim, aq, 15);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The Fibonacci counts', 'lean'], [1, 'inflation is a published input', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['FIBER', 'κ ∈ [κ₋, κ₊]', C.cyan, 'Three visible numbers leave one hidden seam'], ['MOMENT', 'E W² = … + 20κ', C.gold, 'the second moment recovers it'], ['FISHER', 'I = Σ 1/pₛ', C.green, 'Fisher curvature shapes it'], ['READOUT', 'I_out ≤ I', C.orange, 'readouts only lose it'], ['CYCLES', 'c_n / h_n ~ n/3.618', C.mag, 'cycles outgrow it'], ['LIMITS', 'diam · ∏|a| → 0', C.white, 'limits can pin it'], ['BRIDGES', 'typed conditions', C.vio, 'and the arithmetic, triangle and Riemann bridges stay typed conditions']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 215 + i * 248, q = Q(S, 0, ph) * fade; box(x - 114, 240, 228, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 285, col, q, 19); lblG(a2, x, 330, C.white, q, i === 4 ? 16 : 18); });
    const pf = fade * (1 - Q(S, 1, 'The Fibonacci counts', 0.6));
    pyr123(W / 2, 560, 300, 0.5 + t * 0.2, pf * 0.9, { lab: false, pt: [0.4, 0.5, 0.2], pq: 1 });
    lbl('LEAN · frozen : admissibleWord_card_eq_fib · support_count_eq_choose · edge_count · native_boundary_image_short_exact', W / 2, 425, C.green, Q(S, 1, 'are frozen Lean theorems') * fade, 15);
    lbl('cayley_unitarity_defect_formula_on_zero_hilbert_space  (cited in §17.4.3 ; conditional on exhaustive zero data)', W / 2, 452, C.green, Q(S, 1, 'are frozen Lean theorems') * fade, 15);
    lbl('PUBLISHED · inflation technique (Wolfe–Spekkens–Fritz ; Navascués–Wolfe) · exact triangle certificates (Gitton–Renner)', W / 2, 497, C.cyan, Q(S, 1, 'inflation is a published input') * fade, 16);
    lbl('CLASSICAL · Cauchy–Schwarz · Farkas certificates · Moore–Penrose pseudoinverse · compactness · Cayley transform', W / 2, 542, '#8fbcff', Q(S, 1, 'inflation is a published input', 0.6, 0.6) * fade, 16);
    lbl('VOLUME · reconstruction · second moment · max entropy · Fisher contraction · seam sequence · cycle growth · inverse limits · three spectra · typed bridges', W / 2, 587, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 15);
    lbl('RECOMPUTED · 27 811 checks : fiber · moments · 3000 readouts · Γ_n , n ≤ 10 · generating functions · lifts · flows · a Farkas certificate · ten zeta zeros', W / 2, 632, C.white, Q(S, 1, 'the finite computations were redone') * fade, 15);
    lbl('THE RIEMANN HYPOTHESIS IS NOT PROVED HERE · THE THREE BRIDGES REMAIN CONDITIONS', W / 2, 700, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr123(W / 2, 450, 240, 0.5 + t * 0.2, a * 0.9, { lab: false, pt: [0.4, 0.5, 0.2], pq: 1 });
    txt('AURIC TYPED BRIDGES I', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 类型化桥 第一部 · 隐藏缝与桥接账本 · TRURETURING FILM 123', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Three visible numbers, one hidden direction, and every bridge typed.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC TYPED BRIDGES I', fiber: 'FIVE STATES, ONE FIBER', moment: 'SECOND MOMENT', entropy: 'ENTROPY AND FISHER', contract: 'READOUT CONTRACTION', seam: 'SEAM AND LOOP', cycles: 'FIBONACCI CYCLES', limits: 'INVERSE LIMITS', flow: 'THREE SPECTRA', bridges: 'TYPED BRIDGES', triangle: 'TRIANGLE NETWORKS', rh: 'CAYLEY AND RH', finale: 'LEDGER' });

function poster123() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr123(470, 520, 420, 2.2, 1, { pt: [0.4, 0.5, 0.2], pq: 1, ls: 26 });
  txt('κ = (Var W + (EW)² − 4X − 9Z − 25Y) / 20', 1270, 360, { size: 34, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('0 → ℝc → ker(AB) → ℝd → 0', 1270, 470, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('|c(ρ)|² − 1 = (1 − 2Re ρ) / |ρ|²', 1270, 580, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 类型化桥 第一部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC TYPED BRIDGES I', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('隐 藏 缝 · 桥 接 账 本', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 123', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster123;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
