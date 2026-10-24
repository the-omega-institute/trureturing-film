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

/* ---- film 069: AURIC-Langlands I · structure acquisition and spectral extension ---- */
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
const _po69 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po69.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po69.set(key, off); }
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
/* ---- film 069 helpers ---- */
const J69 = (i, j) => { const M = [...Array(5)].map(() => Array(5).fill(0)); M[i][j] = 1; M[j][i] = -1; return M; };
const madd69 = (A, B, s = 1) => A.map((r, i) => r.map((v, j) => v + s * B[i][j]));
const mscale69 = (A, s) => A.map(r => r.map(v => v * s));
const A15 = mscale69(madd69(J69(0, 1), J69(2, 3)), 0.1), B15 = mscale69(madd69(J69(0, 2), J69(1, 3), -1), 0.1);
const S15 = [...Array(5)].map((_, i) => [...Array(5)].map((_, j) => (i === j ? 0.2 : 0)));
const kron69 = (A, B) => { const n = A.length, m = B.length, K = [...Array(n * m)].map(() => Array(n * m).fill(0)); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < m; k++) for (let l = 0; l < m; l++) K[i * m + k][j * m + l] = A[i][j] * B[k][l]; return K; };
const R2_69 = madd69(kron69(S15, S15), kron69(A15, A15), -1);
/* heat map of a real matrix: positive cyan, negative magenta */
function hm69(x, y, M, cs, a, pos = C.cyan, neg = C.mag, lab = null, grid = true) {
  if (a <= 0) return;
  const n = M.length; let mx = 1e-12; M.forEach(r => r.forEach(v => { mx = Math.max(mx, Math.abs(v)); }));
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const v = M[i][j], gx = x + j * cs, gy = y + i * cs;
    if (grid) box(gx, gy, cs - 2, cs - 2, C.dim, a * 0.22, 1);
    if (Math.abs(v) > 1e-12) fillBox(gx, gy, cs - 2, cs - 2, v > 0 ? pos : neg, a * (0.25 + 0.7 * Math.abs(v) / mx));
  }
  if (lab) lblG(lab, x + n * cs / 2, y - 18, C.white, a, 22);
}
function bars69(x0, y0, vals, w, gap, hs, col, a, labels) {
  if (a <= 0) return;
  vals.forEach((v, i) => { const x = x0 + i * (w + gap), h = v * hs; if (h >= 0) { fillBox(x, y0 - h, w, h, col, 0.35 * a); rect63(x, y0 - h, w, h, col, a, 1.6); } else { fillBox(x, y0, w, -h, col, 0.35 * a); rect63(x, y0, w, -h, col, a, 1.6); } if (labels) lbl(labels[i], x + w / 2, y0 + (h >= 0 ? 30 : -h + 30), col, a, 18); });
}
function ell69(cx, cy, rx, ry, col, a, lw = 1.5, a0 = 0, a1 = Math.PI * 2) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), 0, a0, a1); ctx.stroke(); ctx.restore();
}
/* a sphere drawn with latitude (kappa) and longitude (chi) lines */
function sph69(cx, cy, R, a, t, col = C.cyan) {
  if (a <= 0) return;
  fillPoly([...Array(64)].map((_, k) => [cx + R * Math.cos(k / 64 * 2 * Math.PI), cy + R * Math.sin(k / 64 * 2 * Math.PI)]), col, a * 0.06);
  ring(cx, cy, R, col, a, 2.2);
  for (let k = 1; k < 6; k++) { const yy = -1 + k / 3, ry = R * Math.sqrt(1 - yy * yy); ell69(cx, cy + yy * R, ry, ry * 0.22, col, a * 0.45, 1.2); }
  for (let k = 0; k < 6; k++) { const ph = t * 0.4 + k * Math.PI / 6, rx = R * Math.abs(Math.cos(ph)); ell69(cx, cy, rx, R, col, a * 0.3, 1.1); }
}
/* full future capture on four states for a menu of permutations, readout f = 1{3} */
function caps69(menu) {
  const words = [[]]; for (let L = 1; L <= 5; L++) { const prev = words.filter(w => w.length === L - 1); prev.forEach(w => menu.forEach(g => words.push(w.concat([g])))); }
  const sig = [0, 1, 2, 3].map(x => words.map(w => { let y = x; w.forEach(g => { y = g[y]; }); return y === 3 ? 1 : 0; }).join(''));
  let c = 0; for (let x = 0; x < 4; x++) for (let y = 0; y < 4; y++) if (x !== y && sig[x] !== sig[y]) c++;
  return { c, sig };
}
const PA69 = [2, 1, 0, 3], PB69 = [0, 1, 3, 2];
const SAMP69 = [[1, 0.5, 1], [2, 1.6, 3], [3, 6.1, 12], [4, 23.7, 48], [5, 94.3, 191], [6, 376.7, 796], [7, 1506.4, 3091], [8, 6025.0, 12694]];
const MDIM69 = [1, 2, 3, 4, 5, 6, 6, 6];
/* five sources, three readouts: ordered pairs separated by each readout */
const RD69 = [[0, 0, 1, 1, 1], [0, 1, 0, 1, 0], [0, 0, 0, 0, 1]];
function arrowLbl69(x1, y1, x2, y2, s, col, a, dy = -14) { arrow(x1, y1, x2, y2, col, a, 2.5); if (s) lblG(s, (x1 + x2) / 2, (y1 + y2) / 2 + dy, col, a, 20); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const mq = Q(S, 0, 'a fixed menu of controls and readouts', 0.6);
  chip(470, 720, 420, 60, 'fixed menu · controls + readouts', C.dim, mq, 22);
  const q1 = Q(S, 0, 'when acquiring structure really adds predictive power', 0.6);
  box(930, 250, 860, 210, C.gold, q1, 2, 'rgba(0,0,0,0.45)');
  lbl('QUESTION 1 · STRUCTURE ACQUISITION', 1360, 300, C.gold, q1, 22);
  lblG('new structure  ⇒  more prediction ?', 1360, 370, C.white, q1, 34);
  lbl('readouts · catalogs · copies · references', 1360, 425, C.dim, q1, 18);
  const q2 = Q(S, 0, 'how the five-mode relation bundle meets', 0.6);
  box(930, 500, 860, 230, C.mag, q2, 2, 'rgba(0,0,0,0.45)');
  lbl('QUESTION 2 · SPECTRAL EXTENSION', 1360, 550, C.mag, q2, 22);
  lblG('relation bundle  →  spectral interface', 1360, 620, C.white, q2, 34);
  lbl('of Langlands type · SO₅ local systems · Hecke', 1360, 680, C.dim, Q(S, 0, 'spectral interface of Langlands type', 0.6), 18);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 300, 58, 'new readouts', C.cyan, rp, 22); chip(330, 445, 300, 58, 'two copies', C.gold, rp, 22); chip(330, 530, 300, 58, 'a reference', C.mag, rp, 22);
  box(1440, 340, 340, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('spectral splitting', 1610, 410, C.green, rp, 24); lblG('1 ⊕ 14 ⊕ 5', 1610, 470, C.white, rp, 30);
  txt(scramble('AURIC–LANGLANDS I · STRUCTURE', rp, 469), W / 2, 760, { size: 66, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC–Langlands 第 一 部 · 结 构 取 得 与 谱 延 拓', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 069 · AURIC_LANGLANDS_STRUCTURE_ACQUISITION_AND_SPECTRAL_EXTENSION_THEORY', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 GROWTH ---- */
SCENES.growth = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The gain need not split', 0.6);
  if (f1 > 0) {
    /* left: an old-summary-closed protocol */
    const q = Q(S, 0, 'A protocol that only recomputes', 0.6) * f1;
    lbl('old summary q', 300, 250, C.cyan, q, 20);
    const cols = [[160, C.cyan], [300, C.gold], [440, C.mag]];
    cols.forEach(([x, col], k) => { rect63(x - 50, 280, 100, 260, col, q * 0.8, 1.6); for (let i = 0; i < 4; i++) dot(x + (i % 2 ? 18 : -18), 320 + i * 55, 8, ['c', 'g', 'm'][k], q); lblG('q = ' + (k + 1), x, 575, col, q, 22); });
    const rq = Q(S, 0, 'depends on that summary alone', 0.6) * f1;
    box(150, 610, 300, 60, C.orange, rq, 2, 'rgba(0,0,0,0.5)'); lblG('output law K(q(x), ·)', 300, 650, C.orange, rq, 22);
    cols.forEach(([x]) => arrow(x, 545, 300 + (x - 300) * 0.4, 605, C.dim, rq, 2));
    stamp('FIBERS NOT SPLIT', 300, 740, Q(S, 0, 'can never split an old fiber', 0.5) * f1, C.red, 34, -0.05);
    /* right: residual observable ladder */
    const gq = Q(S, 0, 'Growth needs a new readout', 0.6) * f1;
    chip(1000, 250, 360, 56, '+ new readout A', C.green, gq, 22);
    const oq = Q(S, 0, 'the observable system on the old blind space', 0.6) * f1;
    lbl('on N = old blind space :  M(0) = rows of A|N ,  M(k+1) = M(k) + Σ T_a* M(k)', 1290, 312, C.dim, oq, 17);
    const px = 760, py = 700, bw = 70, gap = 26;
    const sq = Q(S, 0, 'stabilises after finitely many word-length layers', 1.6) * f1;
    MDIM69.forEach((d, k) => { const x = px + k * (bw + gap), h = d * 52 * clamp(oq * 1.5 - k * 0.12); const col = k >= 5 ? C.green : C.cyan; if (h > 0) { fillBox(x, py - h, bw, h, col, oq * 0.35); rect63(x, py - h, bw, h, col, oq, 1.6); } lbl('M' + '₀₁₂₃₄₅₆₇'[k], x + bw / 2, py + 30, C.dim, oq, 18); if (h > 0) lbl(String(d), x + bw / 2, py - h - 12, C.white, oq, 18); });
    dashed(px + 5 * (bw + gap) - 10, py - 6 * 52 - 4, px + 5 * (bw + gap) - 10, py + 10, C.green, sq, 2);
    lbl('stable from k = m − r', px + 5 * (bw + gap) - 24, py - 6 * 52 - 4, C.green, sq, 18, 'right');
    const mq = Q(S, 0, 'at M infinity', 0.6) * f1;
    chip(1260, 790, 700, 58, 'Δ_A = dim N − dim K_A = dim M_∞ = dim M_(m−r)', C.green, mq, 22);
  }
  const q = Q(S, 1, 'The gain need not split', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'a stochastic channel on three classical states', 0.6);
    lbl('column-stochastic T on three states', 380, 260, C.cyan, cq, 20);
    const T = [['1', '1/2', '0'], ['0', '1/2', '1/2'], ['0', '0', '1/2']];
    line(180, 300, 180, 520, C.cyan, cq, 2.5); line(590, 300, 590, 520, C.cyan, cq, 2.5);
    T.forEach((r, i) => r.forEach((s, j) => lblG(s, 250 + j * 135, 345 + i * 72, s === '0' ? C.dim : C.white, cq, 30)));
    lbl('readouts : τ = p₁+p₂+p₃ , f = p₃ , new A = p₂', 385, 580, C.dim, cq, 18);
    lblG('n = e₁ − e₂ :  T n = n / 2', 385, 650, C.mag, cq, 26);
    lblG('m = e₂ − e₃ :  T m = m / 2 + n / 2', 385, 710, C.gold, cq, 26);
    const eq = Q(S, 1, 'gives an exact sequence', 0.6);
    lblG('0 → N/K_A → V/K_A → V/N → 0', 1300, 380, C.white, eq, 40);
    lbl('K_A = 0 , N = ℝn', 1300, 440, C.dim, eq, 20);
    const nq = Q(S, 1, 'no section that commutes', 0.6);
    curve(p => [1520 - 440 * p, 520 - Math.sin(p * Math.PI) * 70], 30, C.red, nq, 3);
    arrow(1090, 515, 1080, 520, C.red, nq, 3);
    lblG('s : V/N → V with T s = s T̄', 1300, 640, C.red, nq, 28);
    stamp('NO SUCH SECTION', 1300, 730, nq, C.red, 40, -0.05);
    lbl('[m] is a 1/2-eigenvector in V/N, but every 1/2-eigenvector of T lies in N', 1300, 800, C.dim, nq, 17);
  }
};

/* ---- 03 CATALOG ---- */
SCENES.catalog = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'monotone submodular capture function', 'lean'], [1, 'Controls behave differently', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Controls behave differently', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'For a fixed readout catalog', 0.6) * f1;
    const cols = [C.cyan, C.gold, C.mag], gx = 250, gy = 300, cs = 64;
    RD69.forEach((f, j) => { chip(160 + j * 250, 245, 220, 50, 'f' + '₁₂₃'[j] + ' = ' + f.join(''), cols[j], q, 19); });
    const pq = Q(S, 0, 'the number of separated pairs', 1.6) * f1;
    let cnt = 0;
    for (let x = 0; x < 5; x++) for (let y = 0; y < 5; y++) {
      const X = gx + y * cs, Y = gy + 30 + x * cs;
      if (x === y) { fillBox(X, Y, cs - 4, cs - 4, C.dim, q * 0.15); continue; }
      box(X, Y, cs - 4, cs - 4, C.dim, q * 0.4, 1);
      const js = [0, 1, 2].filter(j => RD69[j][x] !== RD69[j][y]);
      js.forEach((j, k) => { if (pq * 3 > j) fillBox(X + 4 + k * 18, Y + 4, 16, cs - 12, cols[j], q * 0.7); });
      if (js.some(j => pq * 3 > j)) cnt++;
    }
    lbl('ordered pairs (x, y), x ≠ y', gx + 2.5 * cs, gy + 30 + 5 * cs + 30, C.dim, q, 17);
    lblG('C(S) = |∪ D_j| = ' + cnt + ' / 20', gx + 2.5 * cs, gy + 30 + 5 * cs + 80, C.white, pq, 28);
    const mq = Q(S, 0, 'monotone submodular capture function', 0.6) * f1;
    chip(1310, 260, 820, 58, 'C(S ∪ j) − C(S) ≥ C(T ∪ j) − C(T)   for S ⊆ T', C.green, mq, 22);
    const g = Q(S, 0, 'so greedy selection at equal cost', 0.8) * f1;
    const px = 980, py = 740, pw = 660, ph = 340, xS = k => px + (k - 1) / 9 * pw, yS = v => py - (v - 0.5) / 0.5 * ph;
    plotAxes(px, py, pw, ph, g, 'budget k', 'greedy / optimum ≥');
    curve(p => { const k = 1 + 9 * p; return [xS(k), yS(1 - Math.pow(1 - 1 / k, k))]; }, 60, C.cyan, g, 3);
    for (let k = 1; k <= 10; k++) dot(xS(k), yS(1 - Math.pow(1 - 1 / k, k)), 6, 'c', g);
    const eq = Q(S, 0, 'one minus one over e', 0.6) * f1;
    dashed(px, yS(1 - 1 / Math.E), px + pw, yS(1 - 1 / Math.E), C.gold, eq, 2);
    lbl('1 − 1/e ≈ 0.632', px + pw - 10, yS(1 - 1 / Math.E) + 30, C.gold, eq, 18, 'right');
    lbl('1 − (1 − 1/k)^k', xS(3.2), yS(0.86), C.cyan, g, 18);
    for (let v = 0.5; v <= 1.001; v += 0.25) lbl(v.toFixed(2), px - 12, yS(v) + 6, C.dim, g, 15, 'right');
    lbl('Lean · capture_weight_submodular · greedy_gap_le_geometric', 1310, 800, C.green, Q(S, 0, 'both facts are kernel-checked', 0.6) * f1, 17);
  }
  const q = Q(S, 1, 'Controls behave differently', 0.6, 0.3);
  if (q > 0) {
    const cx = 330, cy = 430, R = 150;
    const P = [0, 1, 2, 3].map(k => [cx + R * Math.cos(Math.PI * (0.75 + k * 0.5)), cy + R * Math.sin(Math.PI * (0.75 + k * 0.5))]);
    const aq = Q(S, 1, 'one transposition alone adds nothing', 0.6), bq = Q(S, 1, 'another reaches ten', 0.6);
    curve(p => [P[0][0] + (P[2][0] - P[0][0]) * p, P[0][1] + (P[2][1] - P[0][1]) * p - Math.sin(p * Math.PI) * 30], 20, C.gold, aq, 3);
    curve(p => [P[2][0] + (P[3][0] - P[2][0]) * p, P[2][1] + (P[3][1] - P[2][1]) * p + Math.sin(p * Math.PI) * 30], 20, C.mag, bq, 3);
    P.forEach((p, k) => { ring(p[0], p[1], 26, k === 3 ? C.green : C.white, q, 2.5); lbl(String(k), p[0], p[1] + 8, k === 3 ? C.green : C.white, q, 22); });
    lbl('readout f = 1{3}', cx, cy + R + 70, C.green, q, 19);
    lbl('a = (0 2)', cx - 120, cy - R - 30, C.gold, aq, 19); lbl('b = (2 3)', cx + 205, cy + 6, C.mag, bq, 19);
    const menus = [['∅', [], C.dim, 'Controls behave differently'], ['{a}', [PA69], C.gold, 'one transposition alone adds nothing'], ['{b}', [PB69], C.mag, 'another reaches ten'], ['{a, b}', [PA69, PB69], C.green, 'together they separate all twelve']];
    menus.forEach(([nm, mn, col, ph], i) => { const r = caps69(mn), qq = Q(S, 1, ph, 0.6), x = 650 + i * 110, h = r.c * 26 * qq; fillBox(x, 640 - h, 70, h, col, qq * 0.45); rect63(x, 640 - h, 70, h, col, qq, 1.6); lbl(String(r.c), x + 35, 640 - h - 12, C.white, qq, 22); lbl(nm, x + 35, 672, col, qq, 18); });
    lbl('captured ordered pairs', 860, 720, C.dim, q, 17);
    lbl('gain of a :  0 alone ,  2 after b  →  not submodular', 860, 770, C.gold, Q(S, 1, 'together they separate all twelve', 0.6), 18);
    const sq = Q(S, 1, 'exact separation says nothing', 0.6);
    const px = 1240, py = 700, pw = 560, ph = 400, xS = L => px + (L - 1) / 7 * pw, yS = v => py - v / 14 * ph;
    plotAxes(px, py, pw, ph, sq, null, 'log₂ samples'); lbl('L  ( ε = 2^−L )', px + pw / 2, py + 56, C.dim, sq, 17);
    for (let v = 0; v <= 14; v += 7) lbl(String(v), px - 12, yS(v) + 6, C.dim, sq, 15, 'right');
    const bq2 = Q(S, 1, 'a bias of two to the minus L', 1.2);
    SAMP69.forEach(([L, nb, nm], k) => { if (bq2 * 8 > k) { dot(xS(L), yS(Math.log2(nm)), 7, 'g', sq); dot(xS(L), yS(Math.log2(Math.max(nb, 0.5))), 6, 'c', sq); } lbl(String(L), xS(L), py + 26, C.dim, sq, 15); });
    curve(p => { const L = 1 + 7 * p, e = Math.pow(2, -L); return [xS(L), yS(Math.log2(Math.log(13 / 9) / Math.log(1 + 4 * e * e)))]; }, 50, C.cyan, bq2, 2.5);
    lbl('bound log(13/9) / log(1 + 4ε²)', px + 20, py - ph + 30, C.cyan, bq2, 16, 'left');
    lbl('exact minimum n (error ≤ 1/3)', px + 20, py - ph + 58, C.green, bq2, 16, 'left');
    chip(px + pw / 2, 808, 380, 54, 'n = Ω(4^L)', C.gold, Q(S, 1, 'four to the L samples', 0.6), 24);
  }
};

/* ---- 04 TWO COPIES ---- */
SCENES.twocopy = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [1, 'Independence is needed', 'theory']]);
  const f1 = 1 - Q(S, 1, 'So two independent copies determine', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a designated real structure', 0.6) * f1;
    hm69(120, 300, S15, 44, q, C.cyan, C.mag, 'S = Re ρ');
    hm69(120, 580, A15, 44, q, C.cyan, C.mag, 'A = Im ρ');
    lbl('ρ = S + iA', 230, 238, C.white, q, 22);
    const rq = Q(S, 0, 'Real two-copy statistics record', 1.0) * f1;
    arrow(370, 470, 470, 470, C.dim, rq, 2.5);
    hm69(500, 230, R2_69, 15, rq, C.cyan, C.mag, null, false);
    lblG('Re(ρ ⊗ ρ) = S⊗S − A⊗A', 690, 640, C.white, rq, 28);
    const pq = Q(S, 0, 'a partial trace gives the real part S', 0.6) * f1;
    arrowLbl69(900, 330, 1110, 330, 'tr₂', C.cyan, pq);
    hm69(1140, 230, S15, 34, pq, C.cyan, C.mag); lbl('S', 1345, 325, C.cyan, pq, 26);
    const aq = Q(S, 0, 'A tensor A gives A up to sign', 0.6) * f1;
    arrowLbl69(900, 520, 1110, 520, 'A ⊗ A', C.mag, aq);
    hm69(1140, 450, A15, 34, aq, C.cyan, C.mag); lbl('+A', 1350 - 160, 640, C.mag, aq, 22);
    hm69(1480, 450, mscale69(A15, -1), 34, aq, C.cyan, C.mag); lbl('−A', 1565, 640, C.mag, aq, 22);
    lblG('a ⊗ a = b ⊗ b  ⇒  b = ± a', 1430, 720, C.white, aq, 26);
  }
  const q = Q(S, 1, 'So two independent copies determine', 0.6, 0.3);
  if (q > 0) {
    const cx = 420, cy = 450;
    dashed(cx, 250, cx, 700, C.dim, q, 2); lbl('complex conjugation', cx, 735, C.dim, q, 18);
    const wob = Math.sin(t * 1.2) * 12;
    dot(cx - 170, cy + wob, 16, 'c', q); dot(cx + 170, cy + wob, 16, 'm', q);
    lblG('ρ = S + iA', cx - 170, cy - 112, C.cyan, q, 26); lblG('ρ̄ = S − iA', cx + 170, cy - 112, C.mag, q, 26);
    ell69(cx, cy + wob, 240, 90, C.gold, q, 2.5);
    lbl('one orbit · two candidates', cx, cy + 140, C.gold, q, 20);
    lbl('k ≥ 2 copies : same orbit', cx, cy + 180, C.dim, Q(S, 1, 'more copies do no better', 0.6), 18);
    const dq1 = Q(S, 1, 'against fourteen for one copy', 0.6), dq2 = Q(S, 1, 'the orbit quotient has twenty-four dimensions', 0.6);
    box(800, 260, 420, 130, C.cyan, dq1, 2, 'rgba(0,0,0,0.5)'); lbl('ONE COPY · real summary', 1010, 305, C.cyan, dq1, 19); lblG('dim 14', 1010, 360, C.white, dq1, 34);
    arrow(1230, 325, 1320, 325, C.dim, Math.min(dq1, dq2), 2.5);
    box(1330, 260, 470, 130, C.gold, dq2, 2, 'rgba(0,0,0,0.5)'); lbl('TWO COPIES · orbit quotient (A ≠ 0)', 1565, 305, C.gold, dq2, 19); lblG('dim 24', 1565, 360, C.white, dq2, 34);
    lbl('Lean · real_copy_classification · five_mode_physical_image_dimension · five_mode_nonreal_quotient_dimension', 1300, 430, C.green, Q(S, 1, 'This is kernel-checked in Lean', 0.6), 15);
    const lq = Q(S, 1, 'Independence is needed', 0.6);
    box(800, 490, 1000, 110, C.orange, lq, 2, 'rgba(0,0,0,0.5)'); lbl('LOCAL REAL OPERATIONS ONLY', 1300, 528, C.orange, lq, 19); lblG('tr[(E₁ ⊗ ⋯ ⊗ E_k) ρ^⊗k] = Π tr(E_j S)', 1300, 578, C.white, lq, 26);
    const cq = Q(S, 1, 'a correlated source can show', 0.6);
    box(800, 640, 1000, 110, C.red, cq, 2, 'rgba(0,0,0,0.5)'); lbl('CORRELATED SOURCE · NOT I.I.D.', 1300, 678, C.red, cq, 19); lblG('Ω = ½ ρ⊗ρ + ½ ρ̄⊗ρ̄  →  same real joint statistics', 1300, 728, C.white, cq, 26);
  }
};

/* ---- 05 REFERENCE ---- */
SCENES.reference = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'One phase qubit is enough', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'add a calibrated non-real reference', 0.6) * f1;
    hm69(140, 290, S15, 40, q, C.cyan, C.mag, 'T = Re σ'); hm69(140, 560, B15, 40, q, C.cyan, C.mag, 'B = Im σ ≠ 0');
    lbl('known reference σ = T + iB', 240, 232, C.gold, q, 20);
    const cq = Q(S, 0, 'contracting the joint statistics', 0.6) * f1;
    lblG('R = Re(ρ ⊗ σ) = S⊗T − A⊗B', 1080, 320, C.white, cq, 34);
    const rq = Q(S, 0, 'recovers S and A linearly', 0.6) * f1;
    chip(860, 450, 520, 70, 'S = C_T(R) / ‖T‖²', C.cyan, rq, 28);
    chip(1420, 450, 520, 70, 'A = − C_B(R) / ‖B‖²', C.mag, rq, 28);
    lbl('‖B‖² ≤ 1/2 , equality for the qubit (1, i)/√2', 1140, 545, C.dim, rq, 18);
    const nq = Q(S, 0, 'Real sources and real instruments', 0.6) * f1;
    box(700, 610, 880, 120, C.red, nq, 2, 'rgba(0,0,0,0.5)');
    lblG('real states  +  real Kraus maps  →  real states only', 1140, 682, C.white, nq, 28);
    stamp('NOT FREE', 1140, 785, nq, C.red, 44, -0.06);
  }
  const q = Q(S, 1, 'One phase qubit is enough', 0.6, 0.3);
  if (q > 0) {
    const cx = 330, cy = 430, R = 150;
    ring(cx, cy, R, C.cyan, q, 2); line(cx - R - 30, cy, cx + R + 30, cy, C.dim, q, 1.2); line(cx, cy - R - 30, cx, cy + R + 30, C.dim, q, 1.2);
    lbl('Re', cx + R + 40, cy + 6, C.dim, q, 16, 'left'); lbl('Im', cx, cy - R - 40, C.dim, q, 16);
    const ph = t * 1.4; line(cx, cy, cx + R * Math.cos(ph), cy - R * Math.sin(ph), C.gold, q, 3.5); dot(cx + R * Math.cos(ph), cy - R * Math.sin(ph), 9, 'g', q);
    lblG('r = (1, i)/√2 ,  J r = i r', cx, cy + R + 60, C.gold, q, 24);
    const rq = Q(S, 1, 'every unitary becomes a real rotation', 0.6);
    chip(cx, 720, 520, 64, 'R(U) = X ⊗ I₂ + Y ⊗ J ∈ SO(2d)', C.green, rq, 24);
    lbl('R(U)(ψ ⊗ r) = Uψ ⊗ r', cx, 790, C.dim, rq, 18);
    const eq = Q(S, 1, 'In the five-mode example', 0.6);
    const px = 900, py = 740, pw = 860, ph2 = 440, xS = a => px + (a + 0.2) / 0.4 * pw, yS = v => py - v / 0.08 * ph2;
    plotAxes(px, py, pw, ph2, eq, 'a', 'overlap ⟨Φ| · |Φ⟩');
    for (let a = -0.2; a <= 0.2001; a += 0.1) lbl(a.toFixed(1), xS(a), py + 26, C.dim, eq, 15);
    for (let v = 0; v <= 0.08001; v += 0.04) lbl(v.toFixed(2), px - 12, yS(v) + 6, C.dim, eq, 15, 'right');
    lbl('ρ_a = I/5 + i a J₁₂', px + pw / 2, py - ph2 - 20, C.white, eq, 20);
    const tq = Q(S, 1, 'two copies read one twenty-fifth minus a squared', 1.0);
    curve(p => { const a = -0.2 + 0.4 * p; return [xS(a), yS(1 / 25 - a * a)]; }, 60, C.cyan, tq, 3.5);
    lbl('two copies : 1/25 − a²  (same for ±a)', xS(-0.19), yS(0.012), C.cyan, tq, 17, 'left');
    const fq = Q(S, 1, 'while the reference reads', 1.0);
    curve(p => { const a = -0.2 + 0.4 * p; return [xS(a), yS(1 / 25 - a * 0.15)]; }, 60, C.gold, fq, 3.5);
    lbl('reference b = 0.15 : 1/25 − a b  (sign visible)', xS(-0.19), yS(0.073), C.gold, fq, 17, 'left');
    const am = 0.12 * Math.sin(t * 0.9);
    dot(xS(am), yS(1 / 25 - am * am), 8, 'c', tq); dot(xS(-am), yS(1 / 25 - am * am), 8, 'c', tq);
    dot(xS(am), yS(1 / 25 - am * 0.15), 8, 'g', fq); dot(xS(-am), yS(1 / 25 + am * 0.15), 8, 'g', fq);
  }
};

/* ---- 06 SPLITTING ---- */
SCENES.splitting = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The full tensor carries more', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the quadratic tensor A times A', 0.6) * f1;
    lblG('A ⊙ A  ∈  Sym²(so₅)', 420, 270, C.white, q, 34);
    const gq = Q(S, 0, 'fifty-five-dimensional symmetric square', 0.6) * f1;
    const sp = Q(S, 0, 'Three explicit covariants split it', 1.4) * f1;
    const grp = k => (k < 1 ? 0 : k < 15 ? 1 : k < 20 ? 2 : 3), gcol = [C.gold, C.cyan, C.mag, C.dim];
    for (let k = 0; k < 55; k++) {
      const g = grp(k), x0 = 170 + (k % 11) * 46, y0 = 330 + Math.floor(k / 11) * 46;
      const x1 = 120 + g * 30 + k * 13, y1 = 650;
      const x = x0 + (x1 - x0) * sp, y = y0 + (y1 - y0) * sp, s = 38 - 26 * sp;
      fillBox(x, y, s, s + 34 * sp, sp > 0.05 ? gcol[g] : C.cyan, gq * (0.35 + 0.4 * sp));
    }
    lbl('55 = 1 + 14 + 5 + 35', 470, 600, C.white, sp, 22);
    [['1', 126, C.gold], ['W₁₄', 254, C.cyan], ['V₅', 407, C.mag], ['kernel 35', 697, C.dim]].forEach(([s, x, col]) => lbl(s, x, 740, col, sp, 20));
    const cq = Q(S, 0, 'Three explicit covariants split it', 0.6) * f1;
    chip(1390, 290, 760, 64, 'σ = − ½ tr(AB)', C.gold, cq, 26);
    chip(1390, 380, 760, 64, 'γ = − ½ (AB + BA) + tr(AB) I / 5', C.cyan, cq * clamp(cq * 2 - 0.3), 26);
    chip(1390, 470, 760, 64, 'β = *(a_A ∧ a_B)', C.mag, cq * clamp(cq * 2 - 0.6), 26);
    lbl('SO(5)-equivariant · Θ = Σ J_ij^⊙2 ↦ (10, 0, 0)', 1390, 545, C.dim, Q(S, 0, 'with a thirty-five-dimensional kernel', 0.6) * f1, 18);
    const eq = Q(S, 0, 'fifty-five binary real settings', 0.6) * f1;
    box(1010, 600, 760, 140, C.green, eq, 2, 'rgba(0,0,0,0.5)');
    lblG('E = ½ (I₂₅ + Y_ij ⊗ Y_kl) ,  Y = iJ', 1390, 650, C.white, eq, 26);
    lblG('tr(E ρ⊗ρ) = ½ + 2 A_ij A_kl', 1390, 705, C.green, eq, 26);
  }
  const q = Q(S, 1, 'The full tensor carries more', 0.6, 0.3);
  if (q > 0) {
    const aq = Q(S, 1, 'With A equal to J one two', 0.6), bq = Q(S, 1, 'and B equal to J one three', 0.6);
    hm69(150, 290, A15, 50, aq, C.cyan, C.mag, 'A = (J₁₂ + J₃₄)/10');
    hm69(150, 610 - 30, B15, 50, bq, C.cyan, C.mag, 'B = (J₁₃ − J₂₄)/10');
    const pq = Q(S, 1, 'the strictly positive states', 0.6);
    lbl('spec(I/5 + iA) = spec(I/5 + iB) = {1/10, 1/10, 1/5, 3/10, 3/10}', 1180, 260, C.dim, pq, 17);
    const iq = Q(S, 1, 'have identical covariants', 0.8);
    [[0, 'σ'], [1, 'γ'], [2, 'β']].forEach(([r, nm]) => lbl(nm, 560, 345 + r * 110, [C.gold, C.cyan, C.mag][r], iq, 26));
    [0, 1].forEach(s => {
      const x0 = 640 + s * 600, col = s ? C.vio : C.green;
      lbl(s ? 'q(B)' : 'q(A)', x0 + 230, 305, col, iq, 20);
      fillBox(x0, 330, 0.02 / 0.02 * 120, 26, C.gold, iq * 0.5); lbl('1/50', x0 + 140, 352, C.white, iq, 17, 'left');
      bars69(x0 + 10, 455, [1, 1, 1, 1, -4].map(v => v / 500), 34, 12, 3000, C.cyan, iq, null);
      lbl('diag(1,1,1,1,−4)/500', x0 + 330, 452, C.white, iq, 17, 'left');
      bars69(x0 + 10, 640, [0, 0, 0, 0, 0.02], 34, 12, 2500, C.mag, iq, null);
      lbl('e₅ / 50', x0 + 330, 630, C.white, iq, 17, 'left');
    });
    lblG('q(A) = q(B)', 1180, 710, C.green, iq, 30);
    const nq = Q(S, 1, 'yet B is neither A nor minus A', 0.6);
    lblG('B ∉ {A, −A}', 1180, 770, C.red, nq, 30);
    const fq = Q(S, 1, 'the full tensor tells them apart', 0.6);
    chip(1180, 835, 1000, 56, 'full tensor : coefficient of J₁₂^⊙2 = 1/100 for A , 0 for B', C.gold, fq, 21);
  }
};

/* ---- 07 HECKE ---- */
SCENES.hecke = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'uses published results as external inputs', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Each covariant is a morphism', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Glued over a curve', 0.6) * f1;
    const cx = 480, cy = 600, X = p => [cx - 330 + 660 * p, cy + 50 * Math.sin(p * Math.PI * 2 + 0.6)];
    curve(X, 80, C.cyan, q, 3.5); lbl('curve X', cx + 360, cy + 60, C.cyan, q, 18, 'left');
    const pq = Q(S, 0, 'a parallel splitting of local systems', 1.0) * f1;
    for (let k = 0; k < 6; k++) {
      const p = (k + 0.5) / 6, [x, y] = X(p), hs = [1, 14, 5, 35], cols = [C.gold, C.cyan, C.mag, C.dim];
      let yy = y - 20; hs.forEach((h, i) => { const hh = h * 4.4; fillBox(x - 18, yy - hh, 36, hh, cols[i], pq * 0.55 * clamp(pq * 6 - k)); yy -= hh + 3; });
    }
    lbl('Sym²(ad E) ≅ 1_X ⊕ W_E ⊕ V_E ⊕ K_E', cx, 232, C.white, pq, 22);
    lbl('rank 35 kernel K_E · transport commutes with Ψ_E', cx, 264, C.dim, pq, 17);
    const eq = Q(S, 0, 'uses published results as external inputs', 0.6) * f1;
    const sq = Q(S, 0, 'geometric Satake for Sp four', 0.6) * f1;
    box(1000, 260, 820, 170, C.cyan, sq, 2, 'rgba(0,25,40,0.6)');
    lbl('EXTERNAL · geometric Satake (Mirković–Vilonen)', 1410, 300, C.cyan, sq, 18);
    lblG('Sat : Rep(SO₅) ≃ Perv_{G(O)}(Gr_{Sp₄})', 1410, 360, C.white, sq, 28);
    lbl('G = Sp₄ ,  dual group Ǧ = SO₅', 1410, 405, C.dim, sq, 17);
    const hq = Q(S, 0, 'Hecke eigen-objects from geometric Langlands', 0.6) * f1;
    box(1000, 470, 820, 190, C.cyan, hq, 2, 'rgba(0,25,40,0.6)');
    lbl('EXTERNAL · geometric Langlands (Gaitsgory–Raskin et al.)', 1410, 510, C.cyan, hq, 18);
    lblG('ε_R : H_R(F_E) ≅ E_R ⊠ F_E', 1410, 570, C.white, hq, 28);
    lbl('E irreducible on a projective curve · compatible with morphisms, tensors, fusion', 1410, 625, C.dim, hq, 16);
    lbl('cited as inputs · not re-proved in the volume', 1410, 720, C.cyan, eq, 18);
  }
  const q = Q(S, 1, 'Each covariant is a morphism', 0.6, 0.3);
  if (q > 0) {
    const x0 = 700, x1 = 1220, y0 = 290, y1 = 470;
    const mq = Q(S, 1, 'commutes with the Hecke eigen-isomorphisms', 0.6);
    lblG('H_R(F_E)', x0, y0, C.white, q, 30); lblG('E_R ⊠ F_E', x1, y0, C.white, q, 30);
    lblG("H_R'(F_E)", x0, y1, C.white, mq, 30); lblG("E_R' ⊠ F_E", x1, y1, C.white, mq, 30);
    arrowLbl69(x0 + 110, y0 - 10, x1 - 130, y0 - 10, 'ε_R', C.cyan, q);
    arrowLbl69(x0 + 110, y1 - 10, x1 - 130, y1 - 10, "ε_R'", C.cyan, mq);
    arrow(x0, y0 + 25, x0, y1 - 40, C.gold, mq, 2.5); lblG('H_ψ', x0 - 70, (y0 + y1) / 2, C.gold, mq, 22);
    arrow(x1, y0 + 25, x1, y1 - 40, C.gold, mq, 2.5); lblG('ψ_E ⊠ id', x1 + 110, (y0 + y1) / 2, C.gold, mq, 22);
    lbl('ψ = σ, γ, β or Ψ : morphisms in Rep(SO₅)', 960, 540, C.dim, mq, 18);
    const steps = [['real 2-copy stats', C.white, 'The chain runs from real two-copy statistics'], ['A ⊙ A', C.mag, 'to the quadratic tensor'], ['1 ⊕ 14 ⊕ 5', C.gold, 'to one plus fourteen plus five'], ['parallel local system', C.cyan, 'to a parallel local system'], ['Hecke naturality', C.green, 'and to Hecke naturality']];
    steps.forEach(([s, col, ph], i) => { const qq = Q(S, 1, ph, 0.5), x = 230 + i * 365; chip(x, 650, 320, 62, s, col, qq, 22); if (i > 0) arrow(x - 205, 650, x - 165, 650, C.dim, qq, 2.5); });
    const cq = Q(S, 1, 'It is a conditional statement', 0.6);
    lbl('conditional morphism statement · no functor from instruments to sheaves is constructed', W / 2, 760, C.orange, cq, 19);
  }
};

/* ---- 08 SPHERE ---- */
SCENES.sphere = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'the four parameter regions carry nonzero Chern vectors', 'classical'], [0, 'The largest flattenable torus quotient', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Punctures change this', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'each relation sphere has area', 0.6) * f1;
    sph69(330, 470, 190, q, t);
    lbl('S_b ≅ ℙ¹', 330, 250, C.cyan, q, 22);
    lblG('∫ ω = 2π w ,  w = κ₊ − κ₋', 330, 720, C.white, q, 26);
    lbl('ω = dχ ∧ dκ', 330, 770, C.dim, q, 18);
    const cq = Q(S, 0, 'the four parameter regions carry nonzero Chern vectors', 0.8) * f1;
    const px = 700, py = 720, s = 440;
    rect63(px, py - s, s, s, C.dim, cq, 1.5);
    line(px, py, px + s, py - s, C.gold, cq, 2); line(px, py - s, px + s, py, C.mag, cq, 2);
    lbl('X', px + s + 18, py + 6, C.dim, cq, 18, 'left'); lbl('Y', px - 14, py - s - 10, C.dim, cq, 18);
    lbl('X = Y', px + s - 60, py - s + 40, C.gold, cq, 16); lbl('X + Y = r', px + 70, py - s + 30, C.mag, cq, 16);
    [['(−1, 0, 0)', px + s * 0.2, py - s * 0.5], ['(0, −1, 0)', px + s * 0.5, py - s * 0.18], ['(0, 1, 1)', px + s * 0.5, py - s * 0.8], ['(1, 0, 1)', px + s * 0.8, py - s * 0.5]].forEach(([c, x, y]) => lblG('c = ' + c, x, y, C.white, cq, 21));
    lbl('c = − ∇_b w', px + s / 2, py + 40, C.dim, cq, 18);
    const tq = Q(S, 0, 'The largest flattenable torus quotient', 0.6) * f1;
    chip(1500, 330, 560, 64, 'T_flat = T / λ_c(G_m)', C.green, tq, 28);
    lbl('character lattice c^⊥ · rank 2', 1500, 395, C.dim, tq, 18);
    const pq = Q(S, 0, 'the sphere is simply connected', 0.6) * f1;
    chip(1500, 490, 560, 64, 'π₁(S²) = 1', C.cyan, pq, 28);
    const fq = Q(S, 0, 'every unramified flat SO five system', 0.6) * f1;
    chip(1500, 610, 560, 64, 'flat SO₅ on S²  ⇒  trivial', C.red, fq, 26);
    lbl('prequantum degree n = s w > 0 cannot be flat', 1500, 680, C.dim, fq, 17);
  }
  const q = Q(S, 1, 'Punctures change this', 0.6, 0.3);
  if (q > 0) {
    const cx = 330, cy = 460, R = 170;
    sph69(cx, cy, R, q, t, C.vio);
    const pts = [[-0.5, -0.45], [0.55, -0.3], [-0.35, 0.5], [0.4, 0.55]];
    pts.forEach(([a, b], k) => { const x = cx + a * R, y = cy + b * R; dot(x, y, 7, 'r', q); ring(x, y, 22 + 3 * Math.sin(t * 2 + k), C.gold, q, 1.8); lbl('γ' + '₁₂₃₄'[k], x + 30, y - 14, C.gold, q, 18, 'left'); });
    lbl('four punctures', cx, cy + R + 50, C.vio, q, 19);
    const gq = Q(S, 1, 'Three controls at angle pi root two', 0.6);
    pyrG64(820, 470, 170, 0.6 + t * 0.2, gq, [1, 1, 1], 0.6);
    lbl('A₁ = J₁₂ − J₄₅', 820, 735, C.cyan, gq, 18); lbl('A₂ = J₁₃', 820, 763, C.gold, gq, 18); lbl('A₃ = J₁₄ − J₂₅', 820, 791, C.mag, gq, 18);
    lblG('U_j = exp(π√2 A_j)', 820, 260, C.white, gq, 26);
    const dq = Q(S, 1, 'generate a dense subgroup', 0.6);
    const ccx = 1290, ccy = 450, rr = 150; ring(ccx, ccy, rr, C.dim, dq, 1.5);
    const N = Math.floor(3 + 220 * clamp((S.u - lineAt(S, 1).s) / 9)), th = Math.PI * Math.SQRT2;
    for (let m = 1; m <= N; m++) dot(ccx + rr * Math.cos(m * th), ccy + rr * Math.sin(m * th), 4, 'g', dq);
    lbl('e^{i m π√2} , m = 1 … ' + N, ccx, ccy + rr + 40, C.gold, dq, 17);
    lbl('dense, never periodic', ccx, ccy + 6, C.dim, dq, 16);
    const zq = Q(S, 1, 'on a four-punctured sphere', 0.6);
    chip(1290, 740, 560, 58, 'ρ(γ₄) = (U₁U₂U₃)⁻¹ · Zariski dense', C.vio, zq, 21);
    const nq = Q(S, 1, 'no finite cover removes', 0.6);
    chip(1670, 300, 380, 58, 'z = u^m : U_j^m ≠ I', C.red, nq, 22);
    lbl('eigenvalues 1, e^{±imπ√2}', 1670, 360, C.dim, nq, 16);
    const hq = Q(S, 1, 'On a genus-three curve', 0.6);
    chip(1670, 600, 380, 58, 'genus 3 : ρ(a_j) = U_j', C.green, hq, 22);
    lbl('ρ(b_j) = I · dense · unramified', 1670, 660, C.dim, hq, 16);
  }
};

/* ---- 09 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'are kernel-checked in Lean', 'lean'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['READOUT', 'Δ = dim M_∞', C.cyan, 'A new readout adds exactly'], ['TWO COPIES', 'ρ ~ ρ̄', C.gold, 'two copies reach the conjugation orbit'], ['REFERENCE', 'σ = T + iB', C.mag, 'a reference removes it'], ['SPLITTING', '1 ⊕ 14 ⊕ 5', C.green, 'the hidden quadratic tensor splits'], ['HECKE', 'ε ∘ H_ψ = ψ_E ∘ ε', C.cyan, 'Hecke natural under external'], ['PUNCTURES', 'U_j = e^{π√2 A_j}', C.vio, 'Hecke natural under external']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 19); });
    lbl('LEAN · capture submodularity · greedy bound · two-copy classification · five-mode dimensions 14 and 24', W / 2, 480, C.green, Q(S, 1, 'are kernel-checked in Lean') * fade, 17);
    lbl('EXTERNAL INPUTS · geometric Satake · Hecke eigen-objects (geometric Langlands) · Riemann–Hilbert · Chern–Weil', W / 2, 530, C.cyan, Q(S, 1, 'are kernel-checked in Lean') * fade, 16);
    lbl('VOLUME · residual growth · capture and controls · references · 1 + 14 + 5 · Hecke naturality · punctures', W / 2, 580, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 17);
    lbl('RECOMPUTED · 300 residual systems · 400 catalogs · 200 two-copy states · rank 20, kernel 35 · density of the three controls', W / 2, 630, C.white, Q(S, 1, 'the finite computations were redone') * fade, 17);
    lbl('NEXT · AURIC–LANGLANDS II · CONTEXT AND SPECTRAL RECONSTRUCTION', W / 2, 720, C.gold, Q(S, 1, 'Next: context and spectral reconstruction') * fade, 30);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC–LANGLANDS I · STRUCTURE', W / 2, 680, { size: 60, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC–Langlands 第一部 · 结构取得与谱延拓 · TRURETURING FILM 069', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('New readouts, two copies, and a five-dimensional spectral splitting.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC–LANGLANDS I', growth: 'RESIDUAL GROWTH', catalog: 'CAPTURE AND COST', twocopy: 'TWO COPIES', reference: 'PHASE REFERENCE', splitting: '1 + 14 + 5', hecke: 'HECKE NATURALITY', sphere: 'SPHERE AND PUNCTURES', finale: 'LEDGER' });

function poster69() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('Re(ρ ⊗ ρ) = S⊗S − A⊗A', 1340, 370, { size: 52, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('Sym²(so₅) ↠ 1 ⊕ 14 ⊕ 5', 1340, 480, { size: 52, fam: FG, w: 700, align: 'center', c: C.white });
  txt('Hecke natural · U_j = exp(π√2 A_j)', 1320, 590, { size: 38, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC–Langlands 第一部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC–LANGLANDS I · STRUCTURE', W / 2, 890, { size: 68, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('结 构 取 得 · 两 份 副 本 · 谱 延 拓', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 069', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster69;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
