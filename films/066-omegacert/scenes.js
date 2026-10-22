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

/* ---- film 066: AURIC Omega IV · full-input recovery certificates ---- */
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
const _po66 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po66.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po66.set(key, off); }
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

/* ---- film 066 helpers ---- */
const L66 = b => 2 * b / (3 + 2 * Math.sqrt(2 * (1 - b)));
const U66 = b => 1 - Math.sqrt(1 - b);
const E66 = (b, w) => b * (1 - w) / (b + 2 + Math.sqrt(8 * b * w));
const WC66 = b => 0.5 * Math.pow(Math.pow(1 - b, 0.25) - Math.sqrt(b) / (1 + Math.sqrt(1 - b)), 2);
const RND66 = [[0.2, [0.5054, 0.6437, 1.0413, 1.0043, 0.5013, 0.7323, 0.9960, 0.9202]], [0.5, [0.4137, 0.8038, 0.9586, 1.1344, 0.5742, 0.7666, 0.7202, 1.1793]]];
/* the recovery band plot: L(beta) magenta, U(beta) cyan; collapse in [0,1] shrinks the band onto U */
function band66(px, py, pw, ph, a, o = {}) {
  if (a <= 0) return;
  const ymax = o.ymax || 0.32, xS = b => px + b / 0.5 * pw, yS = v => py - v / ymax * ph;
  plotAxes(px, py, pw, ph, a, null, o.yl || 'recovery error δ');
  lbl('β', px + pw + 22, py + 6, C.dim, a, 18, 'left');
  [0, 0.25, 0.5].forEach(b => lbl(String(b), xS(b), py + 28, C.dim, a, 15));
  (o.ticks || [0.1, 0.2, 0.3]).forEach(v => { dashed(px, yS(v), px + pw, yS(v), C.dim, a * 0.35, 1); lbl(String(v), px - 10, yS(v) + 6, C.dim, a, 15, 'right'); });
  const col = o.collapse || 0, lo = b => L66(b) + col * (U66(b) - L66(b));
  if (o.band !== false) fillPoly([...Array.from({ length: 31 }, (_, i) => [xS(i / 60), yS(lo(i / 60))]), ...Array.from({ length: 31 }, (_, i) => [xS(0.5 - i / 60), yS(U66(0.5 - i / 60))])], C.vio, 0.22 * a * (1 - col * 0.9));
  if (o.L !== false) curve(z => [xS(0.5 * z), yS(L66(0.5 * z))], 40, C.mag, a * (o.Lalpha == null ? 1 : o.Lalpha), 3);
  curve(z => [xS(0.5 * z), yS(U66(0.5 * z))], 40, C.cyan, a, 3.5 + 2 * col);
  return { xS, yS };
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  omega63(440, 450, 150, s0, C.cyan, 7);
  pyrG64(440, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const bq = Q(S, 0, 'Part three left a band', 0.6), cq = Q(S, 1, 'closes that band', 1.2);
  const g = band66(1000, 760, 700, 420, bq, { collapse: cq });
  if (g) {
    lbl('L(β)', g.xS(0.5) + 12, g.yS(L66(0.5)) + 6, C.mag, Q(S, 0, 'at least L of beta', 0.6), 18, 'left');
    lbl('1 − √(1 − β)', g.xS(0.5) + 12, g.yS(U66(0.5)) - 6, C.cyan, Q(S, 0, 'an explicit encoder achieves', 0.6), 18, 'left');
    lbl('open band', g.xS(0.38), g.yS(0.17), C.vio, Q(S, 0, 'the best value in between was open', 0.6) * (1 - cq), 20);
    lblG('real class: closed', 1350, 300, C.green, cq, 30);
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 300, 58, 'every input', C.cyan, rp, 22); chip(330, 445, 300, 58, 'every recovery', C.gold, rp, 22); chip(330, 530, 300, 58, 'every reference', C.mag, rp, 22);
  box(1440, 340, 340, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('real class', 1610, 410, C.green, rp, 24); lblG('δ* = 1 − √(1 − β)', 1610, 465, C.white, rp, 26);
  txt(scramble('AURIC Ω IV · CERTIFICATES', rp, 466), W / 2, 760, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('AURIC Ω 第 四 部 · 全 输 入 恢 复 证 书', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 066 · AURIC_OMEGA_FULL_INPUT_RECOVERY_CERTIFICATES I–III', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 DOMAIN ---- */
SCENES.domain = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Every member has a real Kraus list', 0.6);
  const cells = [[['τ', C.gold], ['0', C.dim], ['C', C.mag]], [['0', C.dim], ['τ̄', C.gold], ['C̄', C.mag]], [['C†', C.mag], ['Cᵀ', C.mag], ['σ', C.cyan]]];
  const x0 = 360, y0 = 290, cw = 120;
  const keys = ['the environment state tau', 'a coherence block C', 'the state sigma of the third level'];
  cells.forEach((row, i) => row.forEach(([s, col], j) => { const k = s.startsWith('τ') ? 0 : s.startsWith('C') ? 1 : s === 'σ' ? 2 : -1; const q = (k < 0 ? Q(S, 0, 'A real encoder is fixed by', 0.6) : Q(S, 0, keys[k], 0.6)) * f1; box(x0 + j * cw, y0 + i * cw, cw - 10, cw - 10, col, q, 2, 'rgba(0,0,0,0.45)'); lblG(s, x0 + j * cw + (cw - 10) / 2, y0 + i * cw + (cw - 10) / 2 + 12, col, q, 34); }));
  lbl('complement Choi matrix in phase coordinates', x0 + 175, y0 - 26, C.dim, Q(S, 0, 'A real encoder is fixed by', 0.6) * f1, 17);
  const sq = Q(S, 0, 'The remaining Schur residual', 0.6) * f1;
  lblG('S = σ − C†τ⁺C − conj(C†τ⁺C) ⪰ 0', 1380, 330, C.cyan, sq, 28);
  lblG('rank S ≤ 1', 1380, 400, C.white, Q(S, 0, 'has rank at most one', 0.6) * f1, 34);
  chip(1380, 510, 520, 64, 'every block datum = an actual encoder', C.green, Q(S, 0, 'every such block is an actual encoder', 0.6) * f1, 21);
  lbl('not a relaxation', 1380, 570, C.dim, Q(S, 0, 'not a relaxation', 0.6) * f1, 18);
  const q = Q(S, 1, 'Every member has a real Kraus list', 0.6, 0.3);
  if (q > 0) {
    for (let k = 0; k < 9; k++) { const x = 300 + k * 140, qq = clamp(q * 9 - k); box(x, 330, 110, 150, C.gold, qq, 2, 'rgba(0,0,0,0.45)'); lbl('K' + (k + 1), x + 55, 362, C.gold, qq, 20); lbl('x · Jx · t', x + 55, 430, C.dim, qq, 15); }
    lblG('K_α = ( x_α , J x_α , t_α ) ,  α ≤ 9', W / 2, 590, C.white, Q(S, 1, 'of length at most nine', 0.6), 30);
    lbl('finite-dimensional · still very large', W / 2, 650, C.dim, Q(S, 1, 'still very large', 0.6), 20);
  }
  void t; void s0;
};

/* ---- 03 RESIDUAL ---- */
SCENES.residual = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Three inputs and one recovery measurement', 0.6);
  if (f1 > 0) {
    const pq = Q(S, 0, 'the four-dimensional phase support', 0.6) * f1;
    ['b1', 'g1', 'b2', 'g2'].forEach((s, i) => { box(330 + i * 110, 330, 96, 96, C.cyan, pq, 2, 'rgba(0,229,255,0.12)'); lbl(s, 378 + i * 110, 386, C.cyan, pq, 22); });
    box(800, 330, 96, 96, C.mag, pq, 2, 'rgba(255,60,210,0.12)'); lbl('h', 848, 386, C.mag, pq, 24);
    lbl('phase support Π', 545, 460, C.cyan, pq, 18); lbl('outside', 848, 460, C.mag, pq, 18);
    const wq = Q(S, 0, 'the weight that the third level sends outside', 0.6) * f1, w = 0.3;
    fillBox(330, 560, 426 * (1 - w) / 1, 50, C.cyan, 0.35 * wq); rect63(330, 560, 426 * (1 - w), 50, C.cyan, wq, 1.6);
    fillBox(330 + 426 * (1 - w) + 44, 560, 96, 50, C.mag, 0.45 * wq); rect63(330 + 426 * (1 - w) + 44, 560, 96, 50, C.mag, wq, 1.6);
    lbl('σ2 = N(|2⟩⟨2|)', 330, 540, C.white, wq, 18, 'left'); lbl('w', 330 + 426 * (1 - w) + 92, 594, C.white, wq, 22);
    lblG('w = Tr[(I − Π) σ2] = Tr S', 1400, 400, C.white, Q(S, 0, 'It equals the trace of the Schur residual', 0.6) * f1, 32);
  }
  const q = Q(S, 1, 'Three inputs and one recovery measurement', 0.6, 0.3);
  if (q > 0) {
    [['χ+', C.cyan], ['χ−', C.cyan], ['|2⟩', C.mag]].forEach(([s, col], i) => { chip(380, 330 + i * 80, 140, 56, s, col, q, 24); arrow(460, 330 + i * 80, 560, 410, C.dim, q, 1.8); });
    chip(660, 410, 200, 70, 'one POVM', C.gold, q, 22); lbl('E_j = R†(P_j)', 660, 480, C.dim, q, 16);
    lblG('δ ≥ 2β(1 − w) / (β + 2 + √(8βw))', 1380, 320, C.white, Q(S, 1, 'then give an error of at least', 0.6), 28);
    const px = 1100, py = 770, pw = 560, ph = 300, pq = Q(S, 1, 'then give an error of at least', 0.8);
    const xS = w => px + w * pw, yS = v => py - v / 0.45 * ph;
    plotAxes(px, py, pw, ph, pq, null, 'bound at β = 1/2'); lbl('w', px + pw + 18, py + 6, C.dim, pq, 18, 'left');
    [[0.2, '0.2'], [0.4, '0.4']].forEach(([v, s]) => { dashed(px, yS(v), px + pw, yS(v), C.dim, pq * 0.35, 1); lbl(s, px - 10, yS(v) + 6, C.dim, pq, 15, 'right'); });
    curve(z => [xS(z), yS(2 * E66(0.5, z))], 50, C.gold, pq, 3);
    const fq = Q(S, 1, 'that is two fifths', 0.6);
    dot(xS(0), yS(0.4), 11, 'g', fq); lbl('2/5', xS(0) + 18, yS(0.4) - 8, C.gold, fq, 22, 'left');
  }
  void t; void s0;
};

/* ---- 04 THRESHOLD ---- */
SCENES.threshold = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Encoders that leak more remain', 0.6);
  const px = 330, py = 770, pw = 760, ph = 420, xS = w => px + w * pw, yS = v => py - v / 0.45 * ph;
  plotAxes(px, py, pw, ph, s0, null, 'error bound at β = 1/2'); lbl('w', px + pw + 18, py + 6, C.dim, s0, 18, 'left');
  [[0.2, '0.2'], [0.4, '0.4']].forEach(([v, s]) => { dashed(px, yS(v), px + pw, yS(v), C.dim, s0 * 0.35, 1); lbl(s, px - 10, yS(v) + 6, C.dim, s0, 15, 'right'); });
  [0, 0.5, 1].forEach(w => lbl(String(w), xS(w), py + 28, C.dim, s0, 15));
  curve(z => [xS(z), yS(2 * E66(0.5, z))], 60, C.gold, s0, 3);
  const uq = Q(S, 0, 'Set this bound equal to the explicit value', 0.6), wc = WC66(0.5);
  line(px, yS(U66(0.5)), px + pw, yS(U66(0.5)), C.cyan, uq, 2.5); lbl('1 − √(1 − β) = 0.293', px + pw - 6, yS(U66(0.5)) - 12, C.cyan, uq, 17, 'right');
  const cq = Q(S, 0, 'The crossing is an exact threshold', 0.6);
  dot(xS(wc), yS(U66(0.5)), 11, 'm', cq); dashed(xS(wc), yS(U66(0.5)), xS(wc), py, C.mag, cq, 1.6); lbl('w_c ≈ 0.091', xS(wc) + 14, py - 20, C.mag, cq, 18, 'left');
  const rq = Q(S, 0, 'cannot beat the explicit encoder', 0.6) * f1;
  fillBox(px, yS(0.45), xS(wc) - px, py - yS(0.45), C.green, 0.12 * rq);
  lbl('w ≤ w_c :  cannot beat it', 1420, 330, C.green, rq, 24);
  lblG('w_c = ½ [ (1 − β)^¼ − √β/(1 + √(1 − β)) ]²', 1420, 410, C.white, cq * f1, 24);
  const q = Q(S, 1, 'Encoders that leak more remain', 0.6, 0.3);
  if (q > 0) {
    fillBox(xS(wc), yS(0.45), px + pw - xS(wc), py - yS(0.45), C.vio, 0.12 * q);
    lbl('w > w_c :  certificates needed', 1420, 330, C.vio, q, 24);
    lblG('3 volumes · 159 sections', 1420, 410, C.white, Q(S, 1, 'Three volumes and more than', 0.6), 30);
    [['filtered kernels', 'filtered kernels'], ['exact semidefinite duals', 'exact semidefinite duals'], ['rational witnesses', 'rational witnesses']].forEach(([s, ph2], i) => chip(1420, 500 + i * 80, 440, 60, s, [C.gold, C.cyan, C.mag][i], Q(S, 1, ph2, 0.5), 21));
  }
  void t;
};

/* ---- 05 CLOSURE ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'theory'], [1, 'The minimax over inputs', 'classical'], [1, 'recovery duality converts it', 'published']]);
  const s0 = clamp(u), b = 0.5, a = 1 - b, f1 = 1 - Q(S, 1, 'A common-projection exclusion', 0.6);
  if (f1 > 0) {
    const cx = 560, cy = 520, R = 200, pq = Q(S, 0, 'For every input in the phase plane', 0.6) * f1;
    ring(cx, cy, R, C.cyan, pq, 2); lbl('phase plane  ψ = pχ+ + qχ−', cx, cy + R + 40, C.cyan, pq, 18);
    const ph = t * 0.8; dot(cx + R * 0.7 * Math.cos(ph), cy - R * 0.7 * Math.sin(ph), 12, 'c', pq);
    const kq = Q(S, 0, 'the environment state is at most a times', 0.6) * f1;
    const ev = [0.5 + 0.0 * Math.sin(ph), 0.35 + 0.1 * Math.sin(ph), 0.15 - 0.1 * Math.sin(ph)];
    ev.forEach((v, i) => { const x = 1180 + i * 110, h = v * 520; fillBox(x, 760 - h, 80, h, C.gold, 0.4 * kq); rect63(x, 760 - h, 80, h, C.gold, kq, 1.6); });
    line(1150, 760 - a * 520, 1520, 760 - a * 520, C.red, kq, 2.5); lbl('a = 1 − β', 1530, 760 - a * 520 + 6, C.red, kq, 18, 'left');
    lblG('τ_ψ = Γ(|ψ⟩⟨ψ|) ⪯ a·I', 1350, 320, C.white, kq, 30);
    lbl('same isometry V · every third column', 1350, 370, C.dim, Q(S, 0, 'for the same isometry and every third column', 0.6) * f1, 17);
  }
  const q = Q(S, 1, 'A common-projection exclusion', 0.6, 0.3);
  if (q > 0) {
    const steps = [['cap  τ_ψ ⪯ aI', C.gold, 'A common-projection exclusion'], ['common-projection exclusion', C.mag, 'A common-projection exclusion'], ['minimax :  F ≤ √((1 + u)/2)', C.cyan, 'The minimax over inputs'], ['recovery duality', C.green, 'recovery duality converts it'], ['δ ≥ 1 − √(1 − β)', C.white, 'an error of at least one minus root']];
    steps.forEach(([s, col, ph2], i) => { const y = 300 + i * 105, qq = Q(S, 1, ph2, 0.5); chip(W / 2, y, 640, 66, s, col, qq, 24); if (i < steps.length - 1) arrow(W / 2, y + 36, W / 2, y + 70, C.dim, Q(S, 1, steps[i + 1][2], 0.5), 2); });
    lbl('u = √(1 − β)', W / 2 + 420, 510, C.dim, Q(S, 1, 'root of one plus u over two', 0.6), 18, 'left');
  }
  void s0;
};

/* ---- 06 OPTIMUM ---- */
SCENES.optimum = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  ['every real encoder', 'every third column', 'Kraus rank ≤ 9', 'every complex recovery', 'every reference'].forEach((s, i) => chip(1450, 300 + i * 78, 440, 58, s, [C.cyan, C.gold, C.mag, C.green, C.white][i], Q(S, 0, ['for every real encoder', 'every third column', 'every Kraus rank up to nine', 'every complex recovery', 'and every reference'][i], 0.5), 21));
  const cq = Q(S, 1, 'the band collapses to a curve', 1.2);
  const g = band66(330, 770, 760, 440, s0, { collapse: cq });
  lbl('1 − √(1 − β)', g.xS(0.5) + 12, g.yS(U66(0.5)) - 6, C.cyan, s0, 18, 'left'); lbl('L(β)', g.xS(0.5) + 12, g.yS(L66(0.5)) + 6, C.mag, s0 * (1 - cq), 18, 'left');
  const eq = Q(S, 1, 'The explicit encoder from part three reaches it', 0.6);
  dot(g.xS(0.5), g.yS(U66(0.5)), 12, 'g', eq); dot(g.xS(0.25), g.yS(U66(0.25)), 12, 'g', eq);
  lblG('inf over the real class = 1 − √(1 − β)', 1450, 730, C.green, Q(S, 1, 'The best value over the real class is exactly', 0.6), 26);
  void t;
};

/* ---- 07 SCOPE ---- */
SCENES.scope = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'where the band between L of beta', 'open'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Random real encoders agree', 0.6);
  if (f1 > 0) {
    const rq = Q(S, 0, 'The statement is about the class', 0.6) * f1;
    lbl('real class', 560, 290, C.green, rq, 24); band66(330, 700, 460, 340, rq, { collapse: 1, band: false, L: false });
    lbl('complex class', 1360, 290, C.vio, Q(S, 0, 'the broader complex class', 0.6) * f1, 24); band66(1130, 700, 460, 340, Q(S, 0, 'the broader complex class', 0.6) * f1, { collapse: 0 });
    chip(560, 790, 420, 58, 'closed: exact curve', C.green, rq, 21);
    chip(1360, 790, 420, 58, 'band L(β) … curve: open', C.vio, Q(S, 0, 'stays open', 0.6) * f1, 21);
    lbl('class statement · not each encoder', W / 2, 240, C.dim, Q(S, 0, 'It does not give each encoder its own optimum', 0.6) * f1, 18);
  }
  const q = Q(S, 1, 'Random real encoders agree', 0.6, 0.3);
  if (q > 0) {
    const g = band66(330, 770, 900, 440, q, { ymax: 1.25, ticks: [0.5, 1.0], band: false, L: false, collapse: 1, yl: 'optimal recovery error (SDP)' });
    RND66.forEach(([b, ds]) => ds.forEach((d, i) => { const qq = clamp(Q(S, 1, 'every semidefinite optimum lands', 0.8) * 8 - i); dot(g.xS(b) + (i - 3.5) * 10, g.yS(d), 9, b < 0.3 ? 'g' : 'm', qq); }));
    dot(g.xS(0.2), g.yS(U66(0.2)), 11, 'c', q); dot(g.xS(0.5), g.yS(U66(0.5)), 11, 'c', q);
    lbl('16 random real encoders · 2–5 Kraus terms', 1480, 330, C.white, q, 20);
    lbl('all on or above the curve', 1480, 380, C.green, Q(S, 1, 'on or above the curve', 0.6), 22);
    lbl('sampled check, not a proof', 1480, 430, C.dim, q, 17);
  }
  void t; void s0;
};

/* ---- 08 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['DOMAIN', 'rank S ≤ 1', C.cyan, 'One residual weight'], ['RESIDUAL', 'w = Tr S', C.mag, 'One residual weight'], ['BOUND', '2e_β(w)', C.gold, 'one three-input bound'], ['THRESHOLD', 'w_c', C.green, 'with an exact threshold'], ['CHAIN', 'certificates', C.vio, 'a long chain of certificates'], ['CURVE', '1 − √(1 − β)', C.white, 'the real-class recovery curve']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 20); });
    lbl('PUBLISHED INPUT · Bény–Oreshkov recovery duality', W / 2, 480, C.cyan, Q(S, 1, 'with recovery duality as a published input') * fade, 17);
    lbl('VOLUME · domain theorem · three-input bound · threshold · common-projection exclusion · closure', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory volumes') * fade, 17);
    lbl('RECOMPUTED · every number · SDP optima for random encoders', W / 2, 600, C.white, Q(S, 1, 'every number here was recomputed') * fade, 19);
    lbl('NEXT · BOSONIC EXCURSION · PHASE CORRECTION', W / 2, 690, C.gold, Q(S, 1, 'Next: the bosonic excursion') * fade, 34);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC Ω IV · CERTIFICATES', W / 2, 680, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('AURIC Ω 第四部 · 全输入恢复证书 · TRURETURING FILM 066', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Every input, every recovery, one exact curve.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC OMEGA IV', domain: 'WHOLE CLASS', residual: 'RESIDUAL WEIGHT', threshold: 'EXACT THRESHOLD', closure: 'THE CLOSURE', optimum: 'CLASS OPTIMUM', scope: 'SCOPE', finale: 'LEDGER' });

function poster66() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('δ* = 1 − √(1 − β)', 1340, 400, { size: 64, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('every real encoder · every recovery', 1340, 500, { size: 38, fam: FG, w: 700, align: 'center', c: C.white });
  txt('w_c ≈ 0.091 · 2/5 · rank S ≤ 1', 1340, 610, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC Ω 第四部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC Ω IV · CERTIFICATES', W / 2, 890, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('每 个 输 入 · 每 个 恢 复 · 一 条 精 确 曲 线', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 066', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster66;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
