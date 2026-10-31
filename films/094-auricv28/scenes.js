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

/* ---- film 094: AURIC V28 · binary readout, full frames and the E8 golden bridge ---- */
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
const _po094 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po094.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po094.set(key, off); }
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
/* ---- film 094 data (generated from vis094.json by verify094.py) ---- */
const LEAK94 = [0.0861, 0.0726, 0.8413];
const FCUB94 = [0.138, 0.1542, 0.1599, 0.1645, 0.1688, 0.1708, 0.1722, 0.2137, 0.2182, 0.2207, 0.2245, 0.2281, 0.2401, 0.2431, 0.2431, 0.2443, 0.2477, 0.249, 0.2632, 0.2638, 0.2649, 0.2672, 0.2741, 0.278, 0.2931, 0.294, 0.3325, 0.3443, 0.3542, 0.3651, 0.3737, 0.3883, 0.4413, 0.4642, 0.4727, 0.4932, 0.4972, 0.4995, 0.5241, 0.5895, 0.5977, 0.5988, 0.6414, 0.6507, 0.6575, 0.6734, 0.675, 0.6847, 0.7113, 0.7292, 0.772, 0.8036, 0.8107, 0.8469, 0.8862, 0.9114, 0.9435, 0.9437, 0.9518, 0.9784];
const CLIF94 = {"A": [[1.0, 0.0, -0.0, -0.0], [0.0, -1.0, -0.0, -0.0], [0.0, 0.0, 1.0, 0.0], [0.0, 0.0, 0.0, -1.0]], "B": [[0.0, 1.0, -0.0, -0.0], [1.0, 0.0, -0.0, -0.0], [0.0, 0.0, 0.0, 1.0], [0.0, 0.0, 1.0, 0.0]], "C": [[0.0, -0.0, -0.0, 1.0], [0.0, 0.0, -1.0, -0.0], [0.0, -1.0, 0.0, -0.0], [1.0, 0.0, 0.0, 0.0]], "J": [[0.0, 0.0, -1.0, 0.0], [0.0, 0.0, 0.0, -1.0], [1.0, 0.0, 0.0, 0.0], [0.0, 1.0, 0.0, 0.0]]};
const TREE94 = [0.075597, 0.078561, 0.219167, 0.057193, 0.175201, 0.045186, 0.160325, 0.188769];
const GRAM94 = [3.1211, 1.5447, 0.3342, 0.0, 0.0];
const KAP94 = [0.4403, 0.6495, 0.1133, 0.2032, 0.4403, 0.3796];
const SHARP94 = [[1.0, 0.0], [0.96593, 0.25882], [0.86603, 0.5], [0.70711, 0.70711], [0.5, 0.86603], [0.25882, 0.96593], [0.0, 1.0]];
const SHEQ94 = 0.57735;
const GRADE94 = [48, 50, 50, 50, 50];
const RBC94 = [40, 50, 50, 50, 50];
const BRAID94 = [[0.0, 2.28825], [0.01, 2.21717], [0.02, 2.14664], [0.03, 2.07666], [0.04, 2.00723], [0.05, 1.93836], [0.06, 1.87004], [0.07, 1.8023], [0.08, 1.73512], [0.09, 1.66852], [0.1, 1.60249], [0.11, 1.53705], [0.12, 1.47219], [0.13, 1.40792], [0.14, 1.34425], [0.15, 1.28118], [0.16, 1.21872], [0.17, 1.15687], [0.18, 1.09563], [0.19, 1.03501], [0.2, 0.97502], [0.21, 0.91566], [0.22, 0.85694], [0.23, 0.79886], [0.24, 0.74143], [0.25, 0.68465], [0.26, 0.62854], [0.27, 0.57309], [0.28, 0.51832], [0.29, 0.46423], [0.3, 0.41083], [0.31, 0.35812], [0.32, 0.30612], [0.33, 0.25482], [0.34, 0.20424], [0.35, 0.15439], [0.36, 0.10527], [0.37, 0.0569], [0.38, 0.00927], [0.39, 0.03759], [0.4, 0.08368], [0.41, 0.129], [0.42, 0.17353], [0.43, 0.21725], [0.44, 0.26017], [0.45, 0.30226], [0.46, 0.34353], [0.47, 0.38394], [0.48, 0.4235], [0.49, 0.46219], [0.5, 0.5], [0.51, 0.53691], [0.52, 0.57291], [0.53, 0.60798], [0.54, 0.64211], [0.55, 0.67528], [0.56, 0.70747], [0.57, 0.73867], [0.58, 0.76885], [0.59, 0.798], [0.6, 0.8261], [0.61, 0.85312], [0.62, 0.87904], [0.63, 0.90384], [0.64, 0.92748], [0.65, 0.94995], [0.66, 0.97121], [0.67, 0.99124], [0.68, 1.00999], [0.69, 1.02744], [0.7, 1.04355], [0.71, 1.05827], [0.72, 1.07156], [0.73, 1.08338], [0.74, 1.09368], [0.75, 1.10239], [0.76, 1.10947], [0.77, 1.11484], [0.78, 1.11843], [0.79, 1.12017], [0.8, 1.11997], [0.81, 1.11772], [0.82, 1.11333], [0.83, 1.10666], [0.84, 1.09758], [0.85, 1.08593], [0.86, 1.07152], [0.87, 1.05414], [0.88, 1.03354], [0.89, 1.00941], [0.9, 0.98138], [0.91, 0.94899], [0.92, 0.91166], [0.93, 0.86863], [0.94, 0.81887], [0.95, 0.76092], [0.96, 0.69257], [0.97, 0.61016], [0.98, 0.50666], [0.99, 0.36426], [1.0, 0.0]];
const X2_94 = 0.381966;
const SUCC94 = [0.0748, 0.1092, 0.115, 0.1254, 0.1265, 0.1363, 0.1462, 0.1571, 0.1738, 0.1807, 0.1822, 0.1847, 0.1897, 0.2066, 0.2296, 0.2329, 0.2332, 0.2376, 0.2397, 0.2399, 0.2451, 0.2486, 0.2774, 0.3235];
const SOPT94 = 0.4;
const DENSE94 = [2.665, 5.3299, 1.7117, 4.3766, 0.7584, 3.4234, 6.0883, 2.4701, 5.1351, 1.5168, 4.1818, 0.5636, 3.2285, 5.8935, 2.2753, 4.9402, 1.322, 3.9869, 0.3687, 3.0337, 5.6986, 2.0804, 4.7454, 1.1271, 3.7921, 0.1739, 2.8388, 5.5038, 1.8856, 4.5505, 0.9323, 3.5972, 6.2622, 2.644, 5.3089, 1.6907, 4.3557, 0.7374, 3.4024, 6.0673, 2.4491, 5.1141, 1.4958, 4.1608, 0.5426, 3.2075, 5.8725, 2.2543, 4.9192, 1.301, 3.966, 0.3477, 3.0127, 5.6776, 2.0594, 4.7244, 1.1061, 3.7711, 0.1529, 2.8178, 5.4828, 1.8646, 4.5295, 0.9113, 3.5762, 6.2412, 2.623, 5.2879, 1.6697, 4.3347, 0.7164, 3.3814, 6.0464, 2.4281, 5.0931, 1.4749, 4.1398, 0.5216, 3.1865, 5.8515, 2.2333, 4.8982, 1.28, 3.945, 0.3267, 2.9917, 5.6567, 2.0384, 4.7034, 1.0852, 3.7501, 0.1319, 2.7968, 5.4618, 1.8436, 4.5085, 0.8903, 3.5553, 6.2202, 2.602, 5.2669, 1.6487, 4.3137, 0.6955, 3.3604, 6.0254, 2.4071, 5.0721, 1.4539, 4.1188, 0.5006, 3.1656, 5.8305, 2.2123, 4.8772, 1.259, 3.924, 0.3057, 2.9707, 5.6357];
const STAB94 = [[0.05, 4.996003610813204e-16, 0.0031250305178757154], [0.1, 1.5003138545896522e-06, 0.006250244150161732], [0.15, 3.589721016016706e-05, 0.009375824047035297], [0.2, 4.787836793695988e-16, 0.012501953430223756], [0.25, 0.0002339932297486403, 0.015628815628815795], [0.3, 0.00012560924112757564, 0.018756594115118874], [0.35, 0.00041484905095691416, 0.021885472540571882], [0.4, 0.00045295100763305396, 0.02501563477173252], [0.45, 0.0006144933204620118, 0.02814726492635783], [0.5, 0.0007822148201655724, 0.03128054740957986], [0.55, 0.0008190806910968844, 0.034415666950204815], [0.6, 0.0014009970273908354, 0.037552808637146495], [0.65, 0.0016338555601017359, 0.04069215795600134], [0.7, 0.0018946872098549242, 0.04383390082579919], [0.75, 0.0007749426077416125, 0.04697822363591897], [0.8, 0.0025392633482673524, 0.05012531328320813], [0.85, 0.0022767265888750544, 0.053275357209311536], [0.9, 0.0024219898136623418, 0.05642854343822257], [0.95, 0.0029378004293412353, 0.05958506061407931], [1.0, 0.0037579334043908227, 0.06274509803921602]];
const BUMP94 = [0.750735, 0.971792, 0.999416, 1.0, 1.0, 1.0];
const CROWD94 = [[0, 1, 4.0], [1, 4, 23.314], [2, 9, 42.627], [3, 16, 61.941], [4, 25, 81.255], [5, 36, 100.569], [6, 49, 119.882], [7, 64, 139.196], [8, 81, 158.51], [9, 100, 177.823], [10, 121, 197.137], [11, 144, 216.451], [12, 169, 235.765], [13, 196, 255.078], [14, 225, 274.392], [15, 256, 293.706], [16, 289, 313.019], [17, 324, 332.333], [18, 361, 351.647], [19, 400, 370.96], [20, 441, 390.274], [21, 484, 409.588], [22, 529, 428.902], [23, 576, 448.215], [24, 625, 467.529], [25, 676, 486.843], [26, 729, 506.156], [27, 784, 525.47], [28, 841, 544.784], [29, 900, 564.098], [30, 961, 583.411], [31, 1024, 602.725], [32, 1089, 622.039], [33, 1156, 641.352], [34, 1225, 660.666], [35, 1296, 679.98], [36, 1369, 699.294], [37, 1444, 718.607], [38, 1521, 737.921], [39, 1600, 757.235], [40, 1681, 776.548], [41, 1764, 795.862], [42, 1849, 815.176], [43, 1936, 834.489], [44, 2025, 853.803], [45, 2116, 873.117], [46, 2209, 892.431], [47, 2304, 911.744], [48, 2401, 931.058], [49, 2500, 950.372], [50, 2601, 969.685], [51, 2704, 988.999], [52, 2809, 1008.313], [53, 2916, 1027.627], [54, 3025, 1046.94], [55, 3136, 1066.254], [56, 3249, 1085.568], [57, 3364, 1104.881], [58, 3481, 1124.195], [59, 3600, 1143.509], [60, 3721, 1162.823], [61, 3844, 1182.136], [62, 3969, 1201.45], [63, 4096, 1220.764], [64, 4225, 1240.077], [65, 4356, 1259.391], [66, 4489, 1278.705], [67, 4624, 1298.018], [68, 4761, 1317.332], [69, 4900, 1336.646], [70, 5041, 1355.96], [71, 5184, 1375.273], [72, 5329, 1394.587], [73, 5476, 1413.901], [74, 5625, 1433.214], [75, 5776, 1452.528], [76, 5929, 1471.842], [77, 6084, 1491.156], [78, 6241, 1510.469], [79, 6400, 1529.783], [80, 6561, 1549.097]];
const CFAIL94 = 18;
const FEAS94 = [true, false, true, false, true, false, true, false];
const MODES94 = [[1, 2], [1, 6], [1, 7], [1, 8], [2, 3], [2, 8], [2, 9], [3, 4], [3, 7], [3, 9], [4, 5], [4, 7], [4, 8], [5, 6], [5, 8], [5, 9], [6, 7], [6, 9]];
const CYC94 = [1, 2, 8, 4, 7, 3, 9, 5, 6, 1];
/* ---- film 094 helpers ---- */
function ell94(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll94(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell94(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function cross94(x, y, r, col, a, lw = 3) { line(x - r, y - r, x + r, y + r, col, a, lw); line(x - r, y + r, x + r, y - r, col, a, lw); }
/* a Bloch sphere; returns the 3D -> screen map (x right, y depth, z up) */
function sph94(cx, cy, R, ang, a, tilt = 0.35) {
  const v = v3(cx, cy, R, ang, tilt);
  if (a <= 0) return v;
  const O = v(0, 0, 0);
  fillEll94(O[0], O[1], R, R, C.cyan, a * 0.05);
  ring(O[0], O[1], R, C.cyan, a * 0.55, 1.6);
  const eq = [], mer = [];
  for (let i = 0; i <= 64; i++) { const q = TAU * i / 64; eq.push(v(Math.cos(q), Math.sin(q), 0)); mer.push(v(Math.cos(q), 0, Math.sin(q))); }
  strokePoly(eq, C.cyan, a * 0.35, 1.3, false); strokePoly(mer, C.cyan, a * 0.18, 1.1, false);
  [[[1.2, 0, 0], 'x'], [[0, 1.2, 0], 'y'], [[0, 0, 1.2], 'z']].forEach(([p, s]) => { const P = v(...p), N = v(-p[0], -p[1], -p[2]); dashed(N[0], N[1], P[0], P[1], C.dim, a * 0.55, 1.2); lbl(s, P[0] + 10, P[1] - 6, C.dim, a, 16, 'left'); });
  return v;
}
/* a small matrix of -1, 0, 1 entries */
function mat94(x, y, M, cw, a, lab, col) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((val, j) => { const vv = Math.round(val), c = vv > 0 ? C.cyan : vv < 0 ? C.mag : C.dim; box(x + j * cw, y + i * cw, cw - 4, cw - 4, c, a * (vv ? 1 : 0.35), 1.2, vv ? 'rgba(0,0,0,0.5)' : null); if (vv) lbl(vv > 0 ? '1' : '−1', x + j * cw + (cw - 4) / 2, y + i * cw + (cw - 4) / 2 + 6, c, a, 15); }));
  if (lab) lblG(lab, x + M[0].length * cw / 2, y - 14, col || C.white, a, 20);
}
function matmul94(A, B) { return A.map((r, i) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0))); }
/* three-strand braid; seq lists the crossing position (0: strands 1-2, 1: strands 2-3) */
function braid94(x0, y0, w, h, seq, a, lw = 5) {
  if (a <= 0) return;
  const xs = [x0, x0 + w / 2, x0 + w], cols = [C.cyan, C.gold, C.mag], dh = h / seq.length;
  const perm = [0, 1, 2];
  const seg = (xa, ya, xb, yb, col, width) => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.bezierCurveTo(xa, ya + dh / 2, xb, yb - dh / 2, xb, yb); ctx.stroke(); ctx.restore(); };
  seq.forEach((g, k) => {
    const y = y0 + k * dh;
    for (let p = 0; p < 3; p++) if (p !== g && p !== g + 1) seg(xs[p], y, xs[p], y + dh, cols[perm[p]], lw);
    seg(xs[g + 1], y, xs[g], y + dh, cols[perm[g + 1]], lw);
    seg(xs[g], y, xs[g + 1], y + dh, '#02060c', lw + 10);
    seg(xs[g], y, xs[g + 1], y + dh, cols[perm[g]], lw);
    const tt = perm[g]; perm[g] = perm[g + 1]; perm[g + 1] = tt;
  });
}
/* E8 Dynkin diagram: centre node with arms of 4 (left), 2 (right) and 1 (up) */
function dynkin94(cx, cy, d, a, gq) {
  if (a <= 0) return;
  const P = [[cx, cy]];
  for (let k = 1; k <= 4; k++) P.push([cx - k * d, cy]);
  for (let k = 1; k <= 2; k++) P.push([cx + k * d, cy]);
  P.push([cx, cy - d]);
  line(cx - 4 * d, cy, cx + 2 * d, cy, C.cyan, a, 2.5); line(cx, cy, cx, cy - d, C.cyan, a, 2.5);
  P.forEach(([x, y], i) => { fillEll94(x, y, 20, 20, '#02060c', a); ring(x, y, 20, C.white, a, 2.2); lbl(String(i + 1), x, y + 6, C.white, a, 15); if (gq > 0) { dot(x - 11, y + 40, 8, 'g', a * gq); dot(x + 11, y + 40, 8, 'm', a * gq); } });
}
function interp94(arr, x) { if (x <= arr[0][0]) return arr[0][1]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][1] * (1 - f) + arr[i][1] * f; } return arr[arr.length - 1][1]; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['what a two-outcome readout carries', 'BINARY READOUT', 'p₀ + p₁ + p⊥ = 1', C.gold], ['consistency over every rotated frame', 'EVERY ROTATED FRAME', 'Σⱼ f(nⱼ)² = 1', C.cyan], ['forces the square law', 'THE SQUARE LAW', 'p = (1 + m·n)/2', C.green], ['how a qubit inside E8 meets the golden gate', 'E8 ROOT QUBIT · GOLDEN GATE', 'Z³|_W = ω² K_P²', C.mag]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 28); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 320, 58, 'relative gates', C.gold, rp, 22); chip(330, 445, 320, 58, 'full frames', C.mag, rp, 22); chip(330, 530, 320, 58, 'root qubit', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('five phases , golden gate', 1610, 410, C.cyan, rp, 20); lblG('Z³|_W = ω² K_P²', 1610, 470, C.white, rp, 30);
  txt(scramble('AURIC V28 · E8 BRIDGE', rp, 941), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V28 · 二 元 读 出 、全 框 架 相 融 与 E8 黄 金 门 桥 梁', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 094 · AURIC_BINARY_READOUT_FULL_FRAME_COMPATIBILITY_AND_E8_GOLDEN_GATE_BRIDGE_V28', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 RELATIVE GATES AND THE SPHERE ---- */
SCENES.relative = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const f1 = 1 - Q(S, 1, 'Two amplitudes modulo normalisation', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Prepare with gate A', 0.6) * f1;
    cell94(170, 265, 110, 70, '|0⟩', C.white, q, 24);
    arrow(285, 300, 375, 300, C.gold, q, 2.5);
    cell94(380, 265, 110, 70, 'A', C.gold, q, 28);
    arrow(495, 300, 585, 300, C.gold, q, 2.5);
    lblG('|ψ⟩ = A|0⟩', 600, 310, C.gold, q, 26, 'left');
    const bq = Q(S, 0, "measure in gate B's basis", 0.6) * f1;
    cell94(170, 365, 110, 70, '|i⟩', C.white, bq, 24);
    arrow(285, 400, 375, 400, C.cyan, bq, 2.5);
    cell94(380, 365, 110, 70, 'B', C.cyan, bq, 28);
    arrow(495, 400, 585, 400, C.cyan, bq, 2.5);
    lblG('|bᵢ⟩ = B|i⟩', 600, 410, C.cyan, bq, 26, 'left');
    const pq = Q(S, 0, 'probabilities depend only on B dagger A', 0.6) * f1;
    chip(530, 500, 780, 62, 'pᵢ = |⟨bᵢ, ψ⟩|² = |⟨i| B†A |0⟩|²', C.white, pq, 25);
    const cq = Q(S, 0, 'a common left factor cancels', 0.6) * f1;
    chip(530, 590, 780, 58, '(UB)†(UA) = B†A   for every unitary U', C.mag, cq, 23);
    lbl("same relative gate ⇔ (A′, B′) = (UA, UB) with U = B′B†", 530, 650, C.dim, cq, 15);
    const lq = Q(S, 0, 'A two-state readout still leaks', 0.6) * f1;
    chip(1390, 265, 780, 56, 'p₀ + p₁ = Tr(ρ Π_W) ,  p⊥ = Tr(ρ(I − Π_W))', C.gold, lq, 21);
    const px = 1080, py = 640, pw = 620, ph = 280;
    plotAxes(px, py, pw, ph, lq, '', 'random ρ on ℂ¹³ , two-state readout');
    [['p₀', LEAK94[0], C.cyan], ['p₁', LEAK94[1], C.gold], ['p⊥', LEAK94[2], C.red]].forEach(([nm, v, col], i) => { const x = px + 60 + i * 190, h = v * ph; fillBox(x, py - h, 120, h, col, lq * 0.45); rect63(x, py - h, 120, h, col, lq, 1.6); lblG(nm, x + 60, py + 30, col, lq, 22); lbl(v.toFixed(4), x + 60, py - h - 12, C.white, lq, 17); });
    const dq = Q(S, 0, 'into eleven spare dimensions natively', 0.6) * f1;
    chip(1180, 730, 420, 54, 'native H₁₃ :  13 − 2 = 11', C.cyan, dq, 21);
    const eq = Q(S, 0, 'two hundred forty-six in E8', 0.6) * f1;
    chip(1600, 730, 400, 54, 'E8 adjoint :  248 − 2 = 246', C.mag, eq, 21);
    lbl('dropping p⊥ and renormalising changes the probability contract', 1390, 795, C.dim, eq, 15);
  }
  const q = Q(S, 1, 'Two amplitudes modulo normalisation', 0.6, 0.3);
  if (q > 0) {
    const v = sph94(450, 530, 200, 0.9 + 0.08 * Math.sin(t * 0.4), q), O = v(0, 0, 0);
    chip(450, 265, 600, 58, 'ℂP¹ = S³/U(1) ≃ S²', C.cyan, q, 26);
    const P1 = v(0, 1, 0), P2 = v(0, -1, 0);
    arrow(O[0], O[1], P1[0], P1[1], C.gold, q, 3); dot(P1[0], P1[1], 12, 'g', q);
    const nq = Q(S, 1, 'with probability one plus r dot n over two', 0.6);
    const N = v(0.6, 0, 0.8); arrow(O[0], O[1], N[0], N[1], C.green, nq, 3); lbl('n', N[0] + 14, N[1] - 6, C.green, nq, 22, 'left');
    const sq = Q(S, 1, "leave the third's sign open", 0.6);
    arrow(O[0], O[1], P2[0], P2[1], C.mag, sq, 3); dot(P2[0], P2[1], 12, 'm', sq);
    lblG('(|0⟩ + i|1⟩)/√2', P1[0] + 22, P1[1] - 14, C.gold, q, 19, 'left');
    lblG('(|0⟩ − i|1⟩)/√2', P2[0] - 22, P2[1] + 30, C.mag, sq, 19, 'right');
    chip(1390, 290, 780, 58, 'p(+ | ρ, n) = (1 + r·n)/2 = cos²(θ_B/2)', C.green, nq, 23);
    lbl('pure states : θ_B = 2 θ_FS ,  p = cos² θ_FS', 1390, 345, C.dim, nq, 16);
    chip(1390, 420, 780, 58, 'r_x , r_z known  ⇒  r_y = ±√(1 − r_x² − r_z²)', C.gold, sq, 22);
    lbl('(|0⟩ ± i|1⟩)/√2 : r = (0, ±1, 0) with the same r_x = r_z = 0', 1390, 475, C.dim, sq, 16);
    const vq = Q(S, 1, 'the Pauli variances sum to three minus r squared', 0.6);
    chip(1390, 550, 780, 58, 'Σⱼ Var(σⱼ) = 3 − |r|² ≥ 2 ,  Δσx Δσy ≥ |r_z|', C.white, vq, 22);
    [['pure r = (0, 1, 0) : sum 2', [1, 0, 1]], ['mixed r = 0 : sum 3', [1, 1, 1]]].forEach(([nm, vs], j) => { const x0 = 1110 + j * 380, col = j ? C.cyan : C.gold; vs.forEach((val, i) => { const h = val * 100, x = x0 + i * 90; if (h > 0) { fillBox(x, 755 - h, 64, h, col, vq * 0.4); rect63(x, 755 - h, 64, h, col, vq, 1.4); } line(x - 4, 755, x + 68, 755, C.dim, vq, 1.2); lbl(['x', 'y', 'z'][i], x + 32, 780, C.dim, vq, 15); }); lbl(nm, x0 + 122, 632, col, vq, 16); });
  }
};

/* ---- 03 FULL-FRAME LAW ---- */
SCENES.frames = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Weaker conditions fail', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Strengthen the three-axis intuition', 0.6) * f1;
    const v = sph94(420, 520, 200, 0.7, q), O = v(0, 0, 0);
    const m = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
    const a1 = 0.45 * t, a2 = 0.3 * t + 0.4;
    const fr = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map(e => rotZ(rotX(rotZ(e, 0.7), a2), a1));
    const fcol = [C.cyan, C.mag, C.green], fdn = ['c', 'm', 'n'];
    const Mm = v(...m); arrow(O[0], O[1], Mm[0], Mm[1], C.gold, q, 4); dot(Mm[0], Mm[1], 12, 'g', q); lbl('m', Mm[0] + 16, Mm[1] - 10, C.gold, q, 22, 'left');
    const fq = Q(S, 0, 'whose centred squares sum to one on every orthonormal frame', 0.6) * f1;
    fr.forEach((n, j) => { const P = v(...n); arrow(O[0], O[1], P[0], P[1], fcol[j], fq, 2.6); lbl('n' + '₁₂₃'[j], P[0] + 10, P[1] + 20, fcol[j], fq, 18, 'left'); });
    const c = fr.map(n => n[0] * m[0] + n[1] * m[1] + n[2] * m[2]);
    let y = 700; const bx = 740, bh = 320;
    lbl('(m·nⱼ)²', bx + 30, 360, C.white, fq, 16);
    c.forEach((cj, j) => { const h = cj * cj * bh; fillBox(bx, y - h, 60, h, fcol[j], fq * 0.55); rect63(bx, y - h, 60, h, fcol[j], fq, 1.4); y -= h; });
    lbl('sum = 1', bx + 30, 735, C.green, fq, 17);
    const cq = Q(S, 0, 'one continuous, rotation-covariant response', 0.6) * f1;
    chip(1390, 270, 780, 56, 'continuous ,  f_Rm(Rn) = f_m(n)  for R ∈ SO(3)', C.cyan, cq, 21);
    const kq = Q(S, 0, 'calibrated on its own direction', 0.6) * f1;
    chip(1390, 345, 780, 56, 'f_m(m) = 1 ,  f_m(−n) = −f_m(n) ,  f = 2p − 1', C.gold, kq, 21);
    chip(1390, 420, 780, 56, '(F)  Σⱼ f_m(nⱼ)² = 1  for every orthonormal frame', C.mag, fq, 21);
    const rq = Q(S, 0, 'That forces probability', 0.6) * f1;
    chip(1390, 525, 780, 70, 'f_m(n) = m·n ,   p_m(n) = (1 + m·n)/2', C.green, rq, 27);
    lbl('proof : g(t) = h(√t)² is additive and monotone on [0, 1] ⇒ g(t) = t', 1390, 590, C.dim, rq, 15);
    stamp('BORN ANGLE LAW', 1390, 690, Q(S, 0, 'the Born angle law', 0.6) * f1, C.green, 36, -0.04);
  }
  const q = Q(S, 1, 'Weaker conditions fail', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'the cubic response keeps every symmetry', 0.6);
    const px = 150, py = 620, pw = 760, ph = 330, xS = v => px + (v + 1) / 2 * pw, yS = v => py - (v + 1) / 2 * ph;
    plotAxes(px, py, pw, ph, cq, 'v = m·n', 'h(v) = 2p − 1');
    line(px, yS(0), px + pw, yS(0), C.dim, cq * 0.5, 1); line(xS(0), py, xS(0), py - ph, C.dim, cq * 0.5, 1);
    curve(p => { const v = -1 + 2 * p; return [xS(v), yS(v)]; }, 40, C.green, cq, 3);
    curve(p => { const v = -1 + 2 * p; return [xS(v), yS(v * v * v)]; }, 80, C.gold, cq, 3);
    lbl('Born : v', xS(0.55), yS(0.55) - 16, C.green, cq, 17, 'right');
    lbl('cubic : v³', xS(0.62), yS(0.24) + 26, C.gold, cq, 17, 'left');
    lbl('odd , monotone , h(1) = 1 , covariant', 530, 270, C.gold, cq, 17);
    const sq = Q(S, 1, 'yet its frame sum falls to one ninth', 0.6);
    const qx = 1060, qy = 620, qw = 700, qh = 330, yT = v => qy - v / 1.1 * qh;
    plotAxes(qx, qy, qw, qh, sq, '60 random frames (sorted)', 'Σⱼ h(m·nⱼ)²');
    line(qx, yT(1), qx + qw, yT(1), C.green, sq, 3); lbl('Born : 1 for every frame', qx + qw, yT(1) - 14, C.green, sq, 16, 'right');
    dashed(qx, yT(1 / 9), qx + qw, yT(1 / 9), C.red, sq, 2); lbl('1/9', qx + qw + 8, yT(1 / 9) + 6, C.red, sq, 18, 'left');
    FCUB94.forEach((v, i) => { const qq = clamp(sq * 1.6 - i / 80); dot(qx + 12 + i * (qw - 24) / 59, yT(v), 6, 'g', qq); });
    lbl('cubic : 3 (1/√3)⁶ = 1/9 at m = (1, 1, 1)/√3', qx + 20, yT(0.8), C.gold, sq, 15, 'left');
    const bq = Q(S, 1, 'balls of every dimension carry binary responses', 0.6);
    chip(W / 2, 715, 1500, 56, 'Bᵈ = { |r| ≤ 1 } , any d ≥ 2 :  e±n(r) = (1 ± n·r)/2 ≥ 0 , all of SO(d)', C.cyan, bq, 22);
    lbl('binarity , normalisation and isotropy do not choose d = 3', W / 2, 780, C.white, Q(S, 1, 'so binarity cannot select three', 0.6), 18);
  }
};

/* ---- 04 SELECTING THREE, CONSTRUCTING i ---- */
SCENES.clifford = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, "Krumm and Müller's published ball-bit framework", 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Where does i come from', 0.6);
  if (f1 > 0) {
    const steps = [['single system', 'Bᵈ , local SO(d)', C.cyan, "Krumm and Müller's published ball-bit framework"], ['composites', 'products , product effects', C.gold, 'with composites'], ['local tomography', 'no signalling , all orders', C.mag, 'local tomography'], ['reversible group', 'closed , connected', C.green, 'a connected reversible group']];
    steps.forEach(([h, s, col, ph], i) => { const qq = Q(S, 0, ph, 0.6) * f1, x = 120 + i * 425; box(x, 240, 400, 120, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, x + 200, 285, col, qq, 20); lblG(s, x + 200, 330, C.white, qq, 19); if (i < 3) arrow(x + 402, 300, x + 423, 300, C.dim, qq, 2); });
    const gq = Q(S, 0, 'interacting reversible gates exist only for balls of dimension three', 0.6) * f1;
    fillEll94(330, 560, 95, 95, C.cyan, gq * 0.08); ring(330, 560, 95, C.cyan, gq, 2.5); lbl('Bᵈ', 330, 568, C.cyan, gq, 24);
    fillEll94(730, 560, 95, 95, C.cyan, gq * 0.08); ring(730, 560, 95, C.cyan, gq, 2.5); lbl('Bᵈ', 730, 568, C.cyan, gq, 24);
    box(470, 520, 120, 80, C.gold, gq, 2.5, 'rgba(40,30,0,0.5)'); lbl('G', 530, 570, C.gold, gq, 30);
    line(425, 560, 470, 560, C.gold, gq, 2.5); line(590, 560, 635, 560, C.gold, gq, 2.5);
    lbl('reversible , not a product of local gates', 530, 700, C.gold, gq, 17);
    [2, 3, 4, 5, 6, 7].forEach((d, i) => { const ok = d === 3, x = 1060 + i * 120, qq = clamp(gq * 1.6 - i / 8); box(x, 470, 100, 110, ok ? C.green : C.red, qq, 2, ok ? 'rgba(0,40,20,0.5)' : 'rgba(40,0,10,0.4)'); lbl('d = ' + d, x + 50, 510, C.white, qq, 18); lbl(ok ? 'interacts' : 'local', x + 50, 555, ok ? C.green : C.red, qq, 15); });
    stamp('ONLY d = 3', 1405, 680, Q(S, 0, 'only for balls of dimension three', 0.6, 0.4) * f1, C.green, 36, -0.04);
    lbl("Krumm–Müller , npj Quantum Information 5 , 7 (2019) , arXiv:1804.05736 , Theorem 1", W / 2, 790, C.dim, Q(S, 0, 'ball-bit framework', 0.6) * f1, 15);
  }
  const q = Q(S, 1, 'Where does i come from', 0.6, 0.3);
  if (q > 0) {
    const aq = Q(S, 1, 'Three real self-adjoint involutions that pairwise anticommute', 0.6);
    mat94(160, 300, CLIF94.A, 40, aq, 'A (real σz)', C.cyan); mat94(370, 300, CLIF94.B, 40, aq, 'B (real σx)', C.cyan); mat94(580, 300, CLIF94.C, 40, aq, 'C (real σy)', C.cyan);
    const jq = Q(S, 1, 'have a product J', 0.6);
    mat94(790, 300, CLIF94.J, 40, jq, 'J = ABC', C.gold);
    const j2 = matmul94(CLIF94.J, CLIF94.J), sq = Q(S, 1, 'squaring to minus one', 0.6);
    mat94(380, 560, j2, 40, sq, 'J² = −I', C.mag);
    const jt = CLIF94.J[0].map((_, j) => CLIF94.J.map(r => -r[j]));
    mat94(640, 560, jt, 40, sq, '−Jᵀ = J', C.mag);
    chip(1390, 290, 760, 56, 'A² = B² = C² = I ,  AB = −BA , BC = −CB , CA = −AC', C.cyan, aq, 19);
    chip(1390, 370, 760, 56, 'J² = −I ,  Jᵀ = −J ,  JA = AJ , JB = BJ , JC = CJ', C.gold, sq, 20);
    const dq = Q(S, 1, 'so the real dimension is four m', 0.6);
    chip(1390, 450, 760, 56, 'i acts as J :  V ≅ ℂ² ⊗ ℂᵐ ,  dim_ℝ V = 4m', C.green, dq, 22);
    chip(1390, 530, 760, 56, 'A = σz ⊗ Iₘ ,  B = σx ⊗ Iₘ ,  C = σy ⊗ Iₘ', C.white, dq, 21);
    stamp('IRREDUCIBLE : ONE QUBIT', 1390, 650, Q(S, 1, 'an irreducible piece is one complex qubit', 0.6), C.green, 30, -0.04);
    lbl('recomputed for m = 1 , 2 , 3 after a random orthogonal change of basis', 530, 790, C.dim, sq, 15);
    lbl('three commuting occupation reads do not satisfy these relations', 1390, 740, C.dim, dq, 15);
  }
};

/* ---- 05 EFFECTS AND UPDATES ---- */
SCENES.effects = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'A positive, normalised, additive weight on all effects', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'One projective measurement allows different updates', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Probabilities and updates are separate obligations', 0.6) * f1;
    box(150, 235, 760, 110, C.cyan, q, 2, 'rgba(0,30,40,0.45)'); lbl('PROBABILITY', 530, 275, C.cyan, q, 22); lblG('w(E) for every effect 0 ≤ E ≤ I', 530, 322, C.white, q, 22);
    box(1010, 235, 760, 110, C.mag, q, 2, 'rgba(40,0,40,0.45)'); lbl('UPDATE', 1390, 275, C.mag, q, 22); lblG('instrument : ρ ↦ post-measurement state', 1390, 322, C.white, q, 22);
    const wq = Q(S, 0, 'A positive, normalised, additive weight on all effects', 0.6) * f1;
    chip(530, 430, 780, 58, '(E)  w(E) ≥ 0 ,  w(I) = 1 ,  w(E + F) = w(E) + w(F)', C.cyan, wq, 20);
    const rq = Q(S, 0, 'is a trace against a density operator', 0.6) * f1;
    arrow(530, 465, 530, 518, C.dim, rq, 2.5);
    chip(530, 560, 780, 64, 'w(E) = Tr(ρE) ,  ρ ≥ 0 ,  Tr ρ = 1', C.green, rq, 26);
    lbl('Busch , arXiv:quant-ph/9909073 : the effect form of Gleason', 530, 625, C.dim, Q(S, 0, "Busch's form of Gleason's theorem", 0.6) * f1, 15);
    stamp('HOLDS IN DIMENSION TWO', 530, 720, Q(S, 0, 'valid even in dimension two', 0.6) * f1, C.green, 30, -0.04);
    const iq = Q(S, 0, 'Probabilities and updates are separate obligations', 0.6, 1.2) * f1;
    chip(1390, 430, 780, 58, 'CP maps Iᵢ ,  Σᵢ Iᵢ trace preserving', C.mag, iq, 22);
    chip(1390, 510, 780, 58, 'Tr Iᵢ(ρ) = Tr(ρEᵢ)', C.mag, iq, 23);
    lbl('post-measurement state Iᵢ(ρ) / Tr(ρEᵢ)', 1390, 580, C.white, iq, 17);
    lbl('the effect fixes the probability , not the update', 1390, 625, C.dim, iq, 16);
  }
  const q = Q(S, 1, 'One projective measurement allows different updates', 0.6, 0.3);
  if (q > 0) {
    cell94(150, 455, 160, 80, '|1⟩⟨1|', C.white, q, 24);
    const lq = Q(S, 1, 'Lüders keeps state one', 0.6), zq = Q(S, 1, 'a reset sends it to zero', 0.6);
    arrow(315, 480, 415, 330, C.cyan, lq, 2.5); arrow(315, 510, 415, 640, C.gold, zq, 2.5);
    box(420, 260, 410, 120, C.cyan, lq, 2, 'rgba(0,30,40,0.45)'); lbl('Lüders', 625, 300, C.cyan, lq, 20); lblG('Iᵢ(ρ) = Pᵢ ρ Pᵢ', 625, 348, C.white, lq, 22);
    box(420, 580, 410, 120, C.gold, zq, 2, 'rgba(40,30,0,0.45)'); lbl('reset , Kraus |0⟩⟨i|', 625, 620, C.gold, zq, 18); lblG('Jᵢ(ρ) = Tr(ρPᵢ) |0⟩⟨0|', 625, 668, C.white, zq, 21);
    lblG('→ |1⟩⟨1|', 845, 330, C.cyan, lq, 22, 'left'); lblG('→ |0⟩⟨0|', 845, 650, C.gold, zq, 22, 'left');
    const sq = Q(S, 1, 'with identical probabilities', 0.6);
    lbl('p(1) = 1', 625, 410, C.white, sq, 17); lbl('p(1) = 1', 625, 730, C.white, sq, 17);
    stamp('SAME p , DIFFERENT UPDATE', 560, 790, sq, C.red, 26, -0.03);
    const oq = Q(S, 1, 'P x after P z sends zero to plus over root two', 0.6), rq = Q(S, 1, 'the reverse to zero over two', 0.6);
    chip(1200, 280, 380, 58, 'P_x P_z |0⟩ = |+⟩/√2', C.cyan, oq, 22);
    chip(1600, 280, 380, 58, 'P_z P_x |0⟩ = |0⟩/2', C.gold, rq, 22);
    const tq = Q(S, 1, 'Order matters', 0.6);
    const rx = 1395, ry = 380, lev = [[0]];
    const sum = (k, d) => { const w = 1 << (3 - d); let s = 0; for (let i = k * w; i < (k + 1) * w; i++) s += TREE94[i]; return s; };
    for (let d = 0; d <= 3; d++) {
      const n = 1 << d, sp = 760 / n;
      for (let k = 0; k < n; k++) {
        const x = rx - 380 + sp * (k + 0.5), y = ry + d * 95, qq = clamp(tq * 2 - d * 0.3);
        if (d < 3) { const sp2 = 760 / (2 * n); [0, 1].forEach(c => { const x2 = rx - 380 + sp2 * (2 * k + c + 0.5); line(x, y + 12, x2, y + 83, C.dim, qq, 1.4); }); }
        dot(x, y, 9, d === 3 ? 'm' : 'c', qq);
        lbl(d === 0 ? '1' : sum(k, d).toFixed(3), x, y - 16, d === 3 ? C.mag : C.white, qq, d === 3 ? 14 : 15);
      }
    }
    lbl('recursive Kraus records : Σᵢ p(hi) = p(h) , no external clock', rx, 720, C.white, tq, 16);
    lbl('order of composition is kept , not commuted', rx, 760, C.dim, tq, 15);
  }
};

/* ---- 06 FIVE POINTS, THREE PORTS ---- */
SCENES.gram = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Three unsharp axes are jointly measurable', 'published']]);
  const f1 = 1 - Q(S, 1, "AURIC's three occupation ports commute", 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A transition table comes from one qubit', 0.6) * f1;
    chip(530, 265, 800, 60, 'q_ij = |⟨ψᵢ, ψⱼ⟩|²  ⇔  G = 2q − 1 ≥ 0 , rank G ≤ 3', C.gold, q, 21);
    lbl('G is the Gram matrix of the Bloch vectors rᵢ ∈ ℝ³', 530, 320, C.dim, q, 16);
    const eq = Q(S, 0, 'positive semidefinite of rank at most three', 0.6) * f1;
    const px = 170, py = 690, pw = 720, ph = 300;
    plotAxes(px, py, pw, ph, eq, 'five random rays', 'eigenvalues of G');
    GRAM94.forEach((v, i) => { const qq = clamp(eq * 1.6 - i / 8), x = px + 40 + i * 135, h = v / 3.4 * ph; if (h > 1) { fillBox(x, py - h, 90, h, C.gold, qq * 0.45); rect63(x, py - h, 90, h, C.gold, qq, 1.6); } else line(x, py - 2, x + 90, py - 2, C.red, qq, 3); lbl(v.toFixed(3), x + 45, py - Math.max(h, 0) - 12, C.white, qq, 16); });
    lbl('two zeros : rank 3', px + 40 + 3.5 * 135 + 45, py - 60, C.red, eq, 18);
    const nq = Q(S, 0, 'Pairwise feasibility is not enough', 0.6) * f1;
    const gx = 1060, gy = 330, cw = 74;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) cell94(gx + j * cw, gy + i * cw, cw - 6, cw - 6, i === j ? '1' : '½', i === j ? C.white : C.cyan, nq, 22);
    lbl('q', gx + 2 * cw, gy - 18, C.cyan, nq, 20);
    lbl('each pair alone : two orthogonal Bloch vectors', 1390, 660, C.dim, nq, 16);
    const iq = Q(S, 0, 'four labels at one half give the identity', 0.6) * f1;
    arrow(gx + 4 * cw + 6, gy + 2 * cw, gx + 4 * cw + 66, gy + 2 * cw, C.dim, iq, 2.5);
    const hx = gx + 4 * cw + 80;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) cell94(hx + j * cw, gy + i * cw, cw - 6, cw - 6, i === j ? '1' : '0', i === j ? C.gold : C.dim, iq, 22);
    lbl('G = 2q − 1 = I₄', hx + 2 * cw, gy - 18, C.gold, iq, 20);
    stamp('RANK 4 > 3', 1390, 740, Q(S, 0, 'rank four', 0.6) * f1, C.red, 34, -0.04);
  }
  const q = Q(S, 1, "AURIC's three occupation ports commute", 0.6, 0.3);
  if (q > 0) {
    const rows = [['N', '000', [0, 0, 0]], ['2', '100', [1, 0, 0]], ['3', '010', [0, 1, 0]], ['5', '001', [0, 0, 1]], ['25', '101', [1, 0, 1]]];
    lbl('mode', 215, 270, C.dim, q, 16); lbl('bits', 335, 270, C.dim, q, 16);
    ['N₁', 'N₂', 'N₃'].forEach((s, j) => lblG(s, 470 + j * 90, 272, [C.cyan, C.gold, C.mag][j], q, 20));
    rows.forEach(([m, b, occ], i) => { const y = 290 + i * 50; lbl('|' + m + '⟩', 215, y + 30, C.white, q, 18); lbl(b, 335, y + 30, C.dim, q, 18); occ.forEach((o, j) => { const col = [C.cyan, C.gold, C.mag][j]; box(440 + j * 90, y + 4, 60, 40, col, q * (o ? 1 : 0.3), 1.4, o ? 'rgba(0,0,0,0.5)' : null); lbl(String(o), 470 + j * 90, y + 31, o ? col : C.dim, q, 17); }); });
    lbl('diagonal , pairwise commuting', 760, 400, C.white, q, 16, 'left');
    const kq = Q(S, 1, 'their means hide an interval for kappa', 0.6);
    chip(530, 585, 800, 54, 'p = (1 − X − Y − Z + κ , X − κ , Z , Y − κ , κ)', C.gold, kq, 20);
    const [X, Y, Z, lo, hi, kap] = KAP94, lx = 170, lw = 720, xs = v => lx + v / 0.7 * lw;
    line(lx, 660, lx + lw, 660, C.dim, kq, 2);
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7].forEach(v => { line(xs(v), 652, xs(v), 668, C.dim, kq, 1.4); lbl(v.toFixed(1), xs(v), 690, C.dim, kq, 13); });
    fillBox(xs(lo), 648, xs(hi) - xs(lo), 24, C.gold, kq * 0.35); rect63(xs(lo), 648, xs(hi) - xs(lo), 24, C.gold, kq, 2);
    dot(xs(kap), 660, 10, 'm', kq);
    lbl('κ ∈ [max(0, X + Y + Z − 1) , min(X, Y)] = [' + lo.toFixed(4) + ' , ' + hi.toFixed(4) + ']', 530, 630, C.gold, kq, 15);
    lbl('sample X = ' + X.toFixed(4) + ' , Y = ' + Y.toFixed(4) + ' , Z = ' + Z.toFixed(4) + ' ;  κ = ' + kap.toFixed(4), 530, 725, C.white, kq, 15);
    lbl('full fibre of fixed means : real dimension 24 − 3 = 21', 530, 765, C.dim, kq, 15);
    const jq = Q(S, 1, 'on any qubit they stay jointly measurable', 0.6);
    chip(1390, 265, 780, 56, 'J†NᵢJ = Σ_s E_s : one POVM ⇒ jointly measurable', C.cyan, jq, 20);
    chip(1390, 335, 780, 56, 'sharp P jointly measurable with Q  ⇒  [P, Q] = 0', C.gold, jq, 20);
    lbl('distinct Pauli projections do not commute', 1390, 392, C.red, Q(S, 1, 'never three sharp Pauli axes', 0.6), 17);
    const sq = Q(S, 1, 'Three unsharp axes are jointly measurable', 0.6);
    const ox = 1080, oy = 760, R = 290;
    fillPoly([[ox, oy]].concat(Array.from({ length: 31 }, (_, i) => [ox + R * Math.cos(i / 30 * Math.PI / 2), oy - R * Math.sin(i / 30 * Math.PI / 2)])), C.green, sq * 0.12);
    curve(p => [ox + R * Math.cos(p * Math.PI / 2), oy - R * Math.sin(p * Math.PI / 2)], 40, C.green, sq, 2.5);
    plotAxes(ox, oy, R + 40, R + 40, sq, 'η_x', '');
    lbl('η_y', ox + 8, oy - R - 46, C.dim, sq, 18, 'left');
    SHARP94.forEach((p, i) => dot(ox + p[0] * R, oy - p[1] * R, 8, 'g', clamp(sq * 1.6 - i / 10)));
    lblG('η_x² + η_y² + η_z² ≤ 1', 1600, 520, C.green, sq, 24);
    lbl('equal sharpness : η ≤ 1/√3 = 0.5774', 1600, 575, C.white, sq, 16);
    lbl('SDP optimum ' + SHEQ94.toFixed(5) + ' ; slice η_z = 0 : dots', 1600, 610, C.cyan, sq, 15);
    lbl('Brougham–Andersson , PRA 76 , 052313 , (A4)', 1600, 650, C.dim, sq, 15);
  }
};

/* ---- 07 BINARY WITNESSES ---- */
SCENES.binary = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Any finite measurement compiles into a binary tree', 'published'], [1, 'but dimension stays', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Two GHZ states are orthogonal', 0.6);
  if (f1 > 0) {
    const wq = Q(S, 0, 'A witness domain makes any relation binary', 0.6) * f1;
    chip(1390, 265, 780, 58, 'R(x₁ … x_N) ⇔ ∃ w ∈ W : ∧ᵢ Eᵢ(w, xᵢ) ,  W = R', C.cyan, wq, 21);
    lbl('the witness w is a whole allowed tuple : the joint information', 1390, 320, C.dim, Q(S, 0, 'but the witness carries the joint information', 0.6) * f1, 15);
    const pq = Q(S, 0, 'Three-bit even parity has full pairwise projections', 0.6) * f1;
    const trip = []; for (let k = 0; k < 8; k++) trip.push([(k >> 2) & 1, (k >> 1) & 1, k & 1]);
    trip.forEach((b, i) => { const ev = (b[0] ^ b[1] ^ b[2]) === 0, y = 262 + i * 54, qq = clamp(pq * 1.6 - i / 12); cells64(170, y, b.join(''), 46, qq, ev ? C.green : C.dim, {}, 22); lbl(ev ? 'even' : 'odd', 340, y + 30, ev ? C.green : C.red, qq, 17, 'left'); });
    [['ab', 0, 1], ['ac', 0, 2], ['bc', 1, 2]].forEach(([nm, i, j], g) => { const gx = 470 + g * 150, gy = 300, qq = clamp(pq * 1.4 - g / 6); lbl(nm, gx + 50, gy - 12, C.white, qq, 18); for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) { const hit = trip.some(tr => ((tr[0] ^ tr[1] ^ tr[2]) === 0) && tr[i] === a && tr[j] === b); fillBox(gx + b * 50, gy + a * 50, 46, 46, C.green, qq * (hit ? 0.45 : 0)); rect63(gx + b * 50, gy + a * 50, 46, 46, C.green, qq, 1.4); lbl(a + '' + b, gx + b * 50 + 23, gy + a * 50 + 30, C.white, qq, 14); } });
    lbl('every pair occurs', 695, 440, C.green, pq, 17);
    lbl('yet R_even keeps 4 of 8', 695, 475, C.white, pq, 17);
    const mq = Q(S, 0, 'yet binary Boolean constraints', 0.6) * f1;
    ['110', '101', '011'].forEach((s, i) => { cells64(1210, 380 + i * 66, s, 60, mq, C.green, {}, 26); });
    lbl('rows of R_even', 1410, 515, C.green, mq, 15, 'left');
    line(1205, 580, 1395, 580, C.white, mq, 2);
    const xq = Q(S, 0, 'even with Boolean helpers', 0.6) * f1;
    cells64(1210, 595, '111', 60, xq, C.red, {}, 26);
    lbl('bitwise majority', 1410, 630, C.red, xq, 17, 'left');
    lbl('odd : not in R_even', 1410, 660, C.red, xq, 17, 'left');
    lbl('binary Boolean relations , and ∃ over Boolean helpers , keep majority', 1390, 720, C.dim, xq, 15);
    stamp('NOT EXPRESSIBLE', 1390, 790, Q(S, 0, 'cannot express it', 0.6) * f1, C.red, 30, -0.04);
  }
  const q = Q(S, 1, 'Two GHZ states are orthogonal', 0.6, 0.3);
  if (q > 0) {
    chip(530, 280, 780, 58, '|GHZ±⟩ = (|0…0⟩ ± |1…1⟩)/√2', C.cyan, q, 24);
    chip(530, 360, 780, 56, '⟨GHZ₊ , GHZ₋⟩ = 0', C.gold, q, 23);
    const mq = Q(S, 1, 'yet share all two-body marginals', 0.6);
    chip(530, 440, 780, 56, 'every proper marginal : ½ (|0…0⟩⟨0…0| + |1…1⟩⟨1…1|)', C.green, mq, 19);
    lbl('recomputed for N = 3 and N = 4', 530, 500, C.dim, mq, 15);
    const tq = Q(S, 1, 'Any finite measurement compiles into a binary tree', 0.6);
    const rx = 1395, ry = 290, dx = 100, dy = 100;
    const N = { r: [0, 0, '{1…5}'], A: [-1.6, 1, '{1,2,3}'], B: [1.6, 1, '{4,5}'], A1: [-2.4, 2, '{1,2}'], A2: [-0.8, 2, 'E₃'], B1: [0.8, 2, 'E₄'], B2: [2.4, 2, 'E₅'], L1: [-3.0, 3, 'E₁'], L2: [-1.8, 3, 'E₂'] };
    const E = [['r', 'A'], ['r', 'B'], ['A', 'A1'], ['A', 'A2'], ['B', 'B1'], ['B', 'B2'], ['A1', 'L1'], ['A1', 'L2']];
    E.forEach(([a, b]) => { const qq = clamp(tq * 2 - N[b][1] * 0.35); line(rx + N[a][0] * dx, ry + N[a][1] * dy + 16, rx + N[b][0] * dx, ry + N[b][1] * dy - 16, C.dim, qq, 1.6); });
    Object.values(N).forEach(([x, d, s]) => { const qq = clamp(tq * 2 - d * 0.35), leaf = s[0] === 'E'; if (leaf) cell94(rx + x * dx - 34, ry + d * dy - 20, 68, 40, s, C.mag, qq, 18); else { fillEll94(rx + x * dx, ry + d * dy, 16, 16, C.cyan, qq * 0.3); ring(rx + x * dx, ry + d * dy, 16, C.cyan, qq, 2); lbl(s, rx + x * dx, ry + d * dy - 22, C.white, qq, 14); } });
    const lq = Q(S, 1, 'of depth log two of N', 0.6);
    chip(1390, 655, 800, 54, 'node S → T | U :  L_T = √E_T E_S^(+1/2) ,  L_U = √E_U E_S^(+1/2)', C.cyan, lq, 17);
    lbl('leaf i : ρ ↦ √Eᵢ ρ √Eᵢ ,  depth ⌈log₂ 5⌉ = 3 (recomputed)', 1390, 715, C.white, lq, 16);
    lbl('Andersson–Oi , arXiv:0712.2665', 1390, 750, C.dim, lq, 15);
    const dq = Q(S, 1, 'an isometry into a qubit needs dimension at most two', 0.6);
    chip(530, 620, 780, 58, 'isometry V : ℂᵈ → ℂ²  ⇒  d = rank V ≤ 2', C.mag, dq, 23);
    stamp('DIMENSION STAYS', 530, 730, Q(S, 1, 'but dimension stays', 0.6), C.mag, 34, -0.04);
  }
};

/* ---- 08 E8 ROOT QUBIT AND THE GOLDEN SQUARE ---- */
SCENES.rootcode = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On this code the grading phase', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'glue in exactly two strict integral ways', 0.6) * f1;
    chip(530, 265, 800, 58, 'Γ₊ = L₀ + ℤ(ω₁, ω₂) ,  Γ₋ = L₀ + ℤ(ω₁, ω₃) ,  L₀ = A₄ ⊕ A₄', C.cyan, q, 19);
    const cx = 290, cy = 510, sp = 60;
    for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) {
      const am = ((a % 5) + 5) % 5, bm = ((b % 5) + 5) % 5, iso = (am * am + bm * bm) % 5 === 0, zero = a === 0 && b === 0;
      const plus = iso && !zero && bm === (2 * am) % 5, minus = iso && !zero && !plus;
      dot(cx + a * sp, cy - b * sp, plus || minus ? 11 : 6, zero ? 'n' : plus ? 'g' : minus ? 'm' : 'c', q * (plus || minus || zero ? 1 : 0.45));
    }
    lbl('F₅² glue classes', cx, cy + 3 * sp + 4, C.white, q, 16);
    lbl('gold : b = 2a   magenta : b = −2a', cx, cy + 3 * sp + 34, C.dim, q, 14);
    lbl('a² + b² ≡ 0 (mod 5)', cx, 350, C.gold, q, 16);
    const eq = Q(S, 0, 'both E8', 0.6) * f1;
    lbl('even , det = 25/5² = 1 , rank 8  ⇒  E8', 720, 420, C.green, eq, 17);
    const gq = Q(S, 0, 'graded forty-eight plus four fifties', 0.6) * f1;
    GRADE94.forEach((v, i) => { const qq = clamp(gq * 1.6 - i / 8), x = 540 + i * 72, h = v * 4.2; fillBox(x, 690 - h, 56, h, i ? C.mag : C.cyan, qq * 0.45); rect63(x, 690 - h, 56, h, i ? C.mag : C.cyan, qq, 1.5); lbl(String(v), x + 28, 680 - h, C.white, qq, 16); lbl('g' + '₀₁₂₃₄'[i], x + 28, 715, C.dim, qq, 16); });
    lbl('roots by class : ' + RBC94.join(' + ') + ' = 240', 720, 760, C.dim, gq, 14);
    const rq = Q(S, 0, 'A glue root alpha and a root beta', 0.6) * f1;
    chip(1390, 265, 780, 56, 'α = (ω₁, ω₂) ,  β = (e₂ − e₁ , 0)', C.gold, rq, 23);
    const ox = 1210, oy = 565, L = 130, P = (x, y) => [ox + x * L, oy - y * L], s3 = Math.sqrt(3) / 2;
    const pb = P(1, 0), pa = P(-0.5, s3), pab = P(0.5, s3), pbm = P(1.5, -s3), pb2 = P(0, 2 * s3);
    arrow(ox, oy, pb[0], pb[1], C.cyan, rq, 3); lblG('β', pb[0] + 14, pb[1] + 8, C.cyan, rq, 24, 'left');
    arrow(ox, oy, pa[0], pa[1], C.gold, rq, 3); lblG('α', pa[0] - 14, pa[1], C.gold, rq, 24, 'right');
    dot(ox, oy, 6, 'n', rq);
    const sq = Q(S, 0, 'make beta and beta plus alpha a qubit across two grades', 0.6) * f1;
    dot(pb[0], pb[1], 11, 'n', sq); dot(pab[0], pab[1], 11, 'n', sq); lblG('β + α', pab[0] + 16, pab[1] - 6, C.green, sq, 22, 'left');
    dashed(pb[0], pb[1], pab[0], pab[1], C.green, sq, 2);
    cross94(pbm[0], pbm[1], 10, C.red, sq); lblG('β − α : norm 6', pbm[0] + 16, pbm[1] + 8, C.red, sq, 17, 'left');
    cross94(pb2[0], pb2[1], 10, C.red, sq); lblG('β + 2α : norm 6', pb2[0] + 16, pb2[1] + 6, C.red, sq, 17, 'left');
    ['|ω₁|² = 4/5', '|ω₂|² = 6/5', 'α² = β² = 2', '(α, β) = −1'].forEach((s, i) => lblG(s, 1610, 400 + i * 44, i === 3 ? C.gold : C.white, rq, 20, 'left'));
    chip(1390, 780, 780, 54, 'W = g_β ⊕ g_(β+α) : grades 0 and 1 , a root SU(2) qubit', C.green, sq, 19);
  }
  const q = Q(S, 1, 'On this code the grading phase', 0.6, 0.3);
  if (q > 0) {
    chip(530, 280, 800, 58, 'Z|_W = diag(1, ω) ,  ω = e^(2πi/5)', C.cyan, q, 23);
    const kq = Q(S, 1, 'its cube is omega squared times the golden gate squared', 0.6);
    chip(530, 360, 800, 58, 'K_P = ζ[(I − P) + ζP] = diag(ζ, ζ²) ,  ζ = e^(3πi/5)', C.gold, kq, 20);
    chip(530, 440, 800, 58, 'K_P² = diag(ζ², ζ⁴) = diag(ω³, ω)', C.gold, kq, 22);
    chip(530, 545, 800, 84, 'Z³|_W = ω² K_P²', C.green, Q(S, 1, 'its cube is omega squared', 0.6, 0.8), 36);
    lbl('an identity on this code , not on all 248 dimensions', 530, 615, C.dim, kq, 15);
    const oq = Q(S, 1, 'But the gate has projective order ten', 0.6);
    const cx = 1390, cy = 500, R = 180;
    ring(cx, cy, R, C.dim, oq, 2);
    for (let k = 0; k < 10; k++) { const an = 3 * Math.PI * k / 5, x = cx + R * Math.cos(an), y = cy - R * Math.sin(an), qq = clamp(oq * 1.6 - k / 12); line(cx, cy, x, y, C.gold, qq * 0.3, 1.2); dot(x, y, 9, 'g', qq); }
    const fq = Q(S, 1, 'every phase power an order dividing five', 0.6);
    for (let k = 0; k < 5; k++) { const an = 2 * Math.PI * k / 5; ring(cx + R * Math.cos(an), cy - R * Math.sin(an), 18, C.cyan, fq, 2.5); }
    lbl('gold : ζᵏ , k = 0 … 9  (ratio of K_P , order 10)', cx, cy + R + 50, C.gold, oq, 16);
    lbl('cyan rings : ωᵏ  (ratio of Zᵏ , order divides 5)', cx, cy + R + 80, C.cyan, fq, 16);
    stamp('PHASE GIVES ONLY THE SQUARE', 530, 720, Q(S, 1, 'so the phase never gives it', 0.6), C.red, 28, -0.03);
  }
};

/* ---- 09 BRAID ANGLE AND SIXTEEN GATES ---- */
SCENES.braid = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'In SU two each normalised gate', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'golden gates on rank-one projections P and Q', 0.6) * f1;
    chip(530, 265, 800, 56, 'K_R = ζ[I + (ζ − 1)R] ,  R = P , Q of rank one', C.gold, q, 21);
    const px = 170, py = 720, pw = 720, ph = 360, xS = s => px + s * pw, yS = v => py - v / 2.4 * ph;
    plotAxes(px, py, pw, ph, q, 's = Tr(PQ)', '‖K_P K_Q K_P − K_Q K_P K_Q‖');
    curve(p => { const s = p; return [xS(s), yS(interp94(BRAID94, s))]; }, 200, C.cyan, q, 3);
    const zq = Q(S, 0, 'exactly when the trace of P Q is one over phi squared', 0.6) * f1;
    dashed(xS(X2_94), py, xS(X2_94), py - ph, C.mag, zq, 1.6);
    dot(xS(X2_94), yS(0), 12, 'm', zq);
    lbl('1/φ² = ' + X2_94.toFixed(6), xS(X2_94) + 14, py - ph + 30, C.mag, zq, 17, 'left');
    lbl('s = 1 : Q = P', xS(1) - 8, yS(0) - 20, C.dim, zq, 14, 'right');
    const bq = Q(S, 0, 'satisfy the braid relation', 0.6) * f1;
    braid94(1080, 300, 170, 300, [0, 1, 0], bq);
    lbl('=', 1340, 470, C.white, bq, 40);
    braid94(1440, 300, 170, 300, [1, 0, 1], bq);
    lbl('K_P K_Q K_P', 1165, 640, C.white, bq, 18); lbl('K_Q K_P K_Q', 1525, 640, C.white, bq, 18);
    chip(1390, 705, 780, 56, 's = −ζ/(ζ − 1)² = 1/(2 + x) = x² ,  x = 1/φ', C.mag, zq, 21);
    lbl('P = diag(0, 1) ,  Q = [ x , x√x ; x√x , x² ] ,  difference ∝ ζ + s(ζ − 1)²', 1390, 765, C.dim, Q(S, 0, 'about point three eight two', 0.6) * f1, 15);
  }
  const q = Q(S, 1, 'In SU two each normalised gate', 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 260, 1500, 54, 'K′ = e^(−9πi/10) K ∈ SU(2) :  eigenvalues e^(∓3πi/10) ,  K′²⁰ = I ,  K′⁻¹ = K′¹⁹', C.cyan, q, 20);
    const tq = Q(S, 1, 'their fifth powers multiply to trace', 0.6);
    chip(W / 2, 330, 1500, 54, 'tr(K′_P⁵ K′_Q⁵) = 2 − 4x² = −4 + 2√5 ≈ 0.472 ;  conjugate −4 − 2√5 ≈ −8.47 < −2', C.gold, tq, 20);
    const dq = Q(S, 1, 'with a conjugate below minus two', 0.6);
    const cx = 450, cy = 580, R = 170;
    ring(cx, cy, R, C.dim, tq, 2);
    DENSE94.forEach((an, i) => { const qq = clamp(dq * 3 - i / 60); dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 6, i < 10 ? 'g' : 'c', qq); });
    lbl('powers of K′_P⁵ K′_Q⁵ : rotation angle 0.848π , 120 shown', cx, cy + R + 40, C.white, dq, 15);
    stamp('DENSE IN SU(2)', cx, cy + 6, Q(S, 1, 'so the pair is dense', 0.6), C.green, 28, -0.04);
    const eq = Q(S, 1, 'Pairs on the eight simple roots', 0.6);
    dynkin94(1420, 560, 92, eq, Q(S, 1, 'give sixteen gates', 0.6));
    chip(1330, 690, 800, 54, 'S = { jᵢ(K′_P) , jᵢ(K′_Q) : i = 1 … 8 } ,  16 fixed gates', C.white, eq, 19);
    stamp('CLOSURE = COMPACT E8', 1330, 775, Q(S, 1, 'generating compact E8', 0.6), C.green, 28, -0.03);
  }
};

/* ---- 10 TWO FIFTHS AND THE RANK OBSTRUCTION ---- */
SCENES.limits = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A finite menu has countably many words', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'five phase states on the qubit code', 0.6) * f1;
    chip(430, 265, 620, 58, '|ψ_k⟩ = (|e₀⟩ + ωᵏ|e₁⟩)/√2', C.cyan, q, 24);
    const cx = 430, cy = 495, R = 130;
    ring(cx, cy, R, C.dim, q, 2);
    for (let k = 0; k < 5; k++) { const an = 2 * Math.PI * k / 5, x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); arrow(cx, cy, x, y, C.cyan, q, 2.4); dot(x, y, 11, 'c', q); lbl('k = ' + k, cx + (R + 44) * Math.cos(an), cy - (R + 44) * Math.sin(an) + 6, C.white, q, 15); }
    lbl('Bloch r = (cos 2πk/5 , sin 2πk/5 , 0) ;  Z readout ½ , ½ for every k', cx, 690, C.dim, q, 14);
    const pq = Q(S, 0, 'identified with probability at most two fifths', 0.6) * f1;
    chip(1390, 265, 780, 56, 'P_succ = ⅕ Σ Tr(M_k ρ_k) ≤ ⅕ Σ Tr M_k = dim W / 5 = 2/5', C.gold, pq, 19);
    lbl('M_k = (2/5) ρ_k attains it , since Σ ρ_k = (5/2) I', 1390, 318, C.white, Q(S, 0, 'attained', 0.6) * f1, 16);
    const px = 1080, py = 640, pw = 640, ph = 270, yS = v => py - v / 0.5 * ph;
    plotAxes(px, py, pw, ph, pq, '24 random POVMs (sorted)', 'success probability');
    line(px, yS(0.4), px + pw, yS(0.4), C.gold, pq, 3); lbl('optimum 2/5 (SDP ' + SOPT94.toFixed(6) + ')', px + pw, yS(0.4) - 12, C.gold, pq, 15, 'right');
    SUCC94.forEach((v, i) => dot(px + 14 + i * (pw - 28) / 23, yS(v), 6, 'c', clamp(pq * 1.6 - i / 30)));
    const rq = Q(S, 0, 'no finite binary recursion beats it', 0.6) * f1;
    chip(430, 750, 760, 56, 'finite binary recursion = one five-outcome POVM ⇒ ≤ 2/5', C.cyan, rq, 18);
    const fq = Q(S, 0, 'A five-dimensional coherent source', 0.6) * f1;
    chip(1390, 730, 800, 56, 'Φ_k = (1/√5) Σⱼ ωᵏʲ uⱼ : orthonormal ⇒ perfect , depth-3 tree', C.green, fq, 18);
  }
  const q = Q(S, 1, 'A finite menu has countably many words', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'A finite menu has countably many words', 0.6);
    chip(530, 270, 800, 58, 'finite words : countable  ·  E8 : uncountable', C.cyan, cq, 22);
    const bq = Q(S, 1, 'so it cannot exactly cover E8', 0.6);
    [['E8 control group', 248, C.cyan], ['SU(248)', 61503, C.red]].forEach(([nm, v, col], i) => { const y = 380 + i * 95, w = Math.log10(v) / 5 * 700; fillBox(170, y, w, 60, col, bq * 0.4); rect63(170, y, w, 60, col, bq, 1.6); lbl(nm, 180, y - 10, col, bq, 16, 'left'); lbl(String(v), 180 + w, y + 40, C.white, bq, 20, 'left'); });
    lbl('real dimension , log scale ; 248² − 1 = 61503', 530, 600, C.dim, bq, 15);
    stamp('NO EXACT COVER', 530, 700, bq, C.red, 32, -0.04);
    const hq = Q(S, 1, 'every continuous homomorphism between native PU thirteen and E8 is trivial', 0.6);
    chip(1390, 270, 800, 56, 'PU(13) → E8  and  E8 → PU(13) :  only trivial continuous maps', C.gold, hq, 19);
    const rq = Q(S, 1, 'rank twelve exceeds eight', 0.6), dq = Q(S, 1, 'two hundred forty-eight exceeds one sixty-eight', 0.6);
    const base = 660;
    [['su(13)', 12, C.gold], ['e8', 8, C.cyan]].forEach(([nm, v, col], i) => { const x = 1090 + i * 130, h = v * 22; fillBox(x, base - h, 90, h, col, rq * 0.45); rect63(x, base - h, 90, h, col, rq, 1.6); lbl(String(v), x + 45, base - h - 10, C.white, rq, 18); lbl(nm, x + 45, base + 26, col, rq, 16); });
    lbl('rank 12 > 8', 1200, base + 60, C.gold, rq, 17);
    [['su(13)', 168, C.gold], ['e8', 248, C.cyan]].forEach(([nm, v, col], i) => { const x = 1460 + i * 130, h = v * 1.05; fillBox(x, base - h, 90, h, col, dq * 0.45); rect63(x, base - h, 90, h, col, dq, 1.6); lbl(String(v), x + 45, base - h - 10, C.white, dq, 18); lbl(nm, x + 45, base + 26, col, dq, 16); });
    lbl('dim 248 > 168', 1570, base + 60, C.cyan, dq, 17);
    lbl('a fixed leak-free 13-dim code under E8 control cannot carry all of PU(13)', 1390, 780, C.dim, dq, 14);
  }
};

/* ---- 11 SHARP STABILITY, FINITE CHECKS ---- */
SCENES.stability = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Finite checks leave a fixed gap', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Square-root stability is sharp', 0.6) * f1;
    const px = 170, py = 720, pw = 720, ph = 400, th = 0.6, xS = v => px + v / th * pw, yS = v => py - v / 0.08 * ph;
    plotAxes(px, py, pw, ph, q, 'θ', 'size');
    const bq = Q(S, 0, 'four-time residual at most', 0.6) * f1;
    curve(p => { const v = p * th; return [xS(v), yS(52 / 243 * v * v)]; }, 60, C.gold, bq, 3);
    lbl('residual bound (52/243) θ²', xS(0.56), yS(52 / 243 * 0.31) - 12, C.gold, bq, 16, 'right');
    STAB94.filter(r => r[0] <= th + 1e-9).forEach((r, i) => dot(xS(r[0]), yS(r[1]), 6, 'c', clamp(bq * 1.6 - i / 14)));
    const dq = Q(S, 0, 'yet Born deviation at least theta over sixteen', 0.6) * f1;
    curve(p => { const v = p * th; return [xS(v), yS(v / 16)]; }, 10, C.mag, dq, 3);
    STAB94.filter(r => r[0] <= th + 1e-9).forEach((r, i) => dot(xS(r[0]), yS(r[2]), 7, 'm', clamp(dq * 1.6 - i / 14)));
    lbl('deviation ≥ θ/16', xS(0.2), yS(0.2 / 16) - 26, C.mag, dq, 16, 'right');
    lbl('cyan : sampled residuals (13 dims , random two-spectral gates)', 530, 765, C.dim, bq, 14);
    lbl('magenta : deviation at (u + v)/√2', 530, 792, C.dim, dq, 14);
    const cq = Q(S, 0, 'for each theta some valid response', 0.6) * f1;
    chip(1390, 270, 780, 56, 't = θ/16 ,  d = t²/(1 + t²) :  rotate detectors u , v by t', C.cyan, cq, 20);
    chip(1390, 345, 780, 56, 'P^θ_β = (Q_β − d)₊ / Σ_γ (Q_γ − d)₊', C.cyan, cq, 22);
    chip(1390, 440, 780, 60, 'R(P^θ) ≤ (52/243) θ²', C.gold, bq, 26);
    chip(1390, 525, 780, 60, 'D(P^θ) ≥ θ/16 ,  P_u = ½ + t/(1 − t²)', C.mag, dq, 22);
    lbl('θ = √ε : no uniform o(√ε) error modulus', 1390, 595, C.white, dq, 17);
    lbl('Continuation II , Theorem 96.2 and Corollary 96.3', 1390, 635, C.dim, dq, 15);
    stamp('SQUARE ROOT IS SHARP', 1390, 730, Q(S, 0, 'yet Born deviation at least theta over sixteen', 0.6, 1.0) * f1, C.red, 30, -0.04);
  }
  const q = Q(S, 1, 'Finite checks leave a fixed gap', 0.6, 0.3);
  if (q > 0) {
    const fq = Q(S, 1, 'for any finite queries and four-time contexts', 0.6);
    fillEll94(450, 480, 320, 200, C.cyan, q * 0.06); ell94(450, 480, 320, 200, C.cyan, q, 2);
    lbl('rays of the native 13-dim sector', 450, 300, C.dim, q, 15);
    for (let i = 0; i < 16; i++) { const an = rnd(i, 3) * TAU, r = 0.25 + 0.6 * rnd(i, 5), x = 450 + 300 * r * Math.cos(an) * 0.95, y = 480 + 180 * r * Math.sin(an) * 0.9; dot(x, y, 7, 'n', clamp(fq * 2 - i / 20)); }
    lbl('F : finite queries , P = q', 300, 700, C.green, fq, 16);
    const mq = Q(S, 1, 'some continuous response matches Born on all of them', 0.6);
    const zp = [[610, 560], [660, 500], [700, 440], [730, 375]];
    zp.forEach(([x, y], i) => { dot(x, y, i === 3 ? 12 : 9, i === 3 ? 'm' : 'c', mq); lbl('z' + '₀₁₂₃'[i], x + 16, y + 6, i === 3 ? C.mag : C.cyan, mq, 16, 'left'); });
    const gq = Q(S, 1, 'yet misses by over one thirty-second', 0.6);
    ring(730, 375, 34 + 6 * Math.sin(t * 3), C.mag, gq, 2.5);
    lbl('z₃ : P − q > 1/32', 730, 330, C.mag, gq, 16);
    chip(1390, 270, 780, 56, 'h = ½ q_u q_v g_m :  P_u = q_u + h ,  P_v = q_v − h', C.cyan, mq, 20);
    chip(1390, 345, 780, 56, 'g_m(ψ) = ∏_(ξ∈S) (1 − |⟨ξ, ψ⟩|^(2m)) = 0 on S', C.gold, mq, 19);
    lbl('basis points : q_u q_v = 0 , calibration kept', 1390, 400, C.white, Q(S, 1, 'keeps every basis calibration', 0.6), 16);
    chip(1390, 455, 780, 56, 'at z₃ : h > ½ · ⅛ · ½ = 1/32  ⇒  D , R > 1/32', C.mag, gq, 20);
    const px = 1080, py = 740, pw = 620, ph = 200, xS = i => px + 30 + i * (pw - 60) / 5;
    plotAxes(px, py, pw, ph, mq, 'm = 1 , 2 , 4 , 8 , 16 , 32', 'g_m(z₃)');
    dashed(px, py - 0.5 * ph, px + pw, py - 0.5 * ph, C.red, mq, 1.6); lbl('½', px - 10, py - 0.5 * ph + 6, C.red, mq, 16, 'right');
    BUMP94.forEach((v, i) => { dot(xS(i), py - v * ph, 8, 'g', clamp(mq * 1.6 - i / 8)); if (i) line(xS(i - 1), py - BUMP94[i - 1] * ph, xS(i), py - v * ph, C.gold, mq, 2); });
    lbl('toy check in ℂ¹³ with 6 random rays in S ; Continuation II , Theorem 97.2', 1390, 790, C.dim, mq, 14);
  }
};

/* ---- 12 JOINT SUPPORT AND PARITY ---- */
SCENES.support = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, "For Kurzynski's eighteen modes and nine contexts", 'lean']]);
  const f1 = 1 - Q(S, 1, 'Binary incidence still blocks global assignments', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Read m plus root two n twice', 0.6) * f1;
    const px = 170, py = 730, sz = 440, lo = -0.4, hi = 5.2, sc = v => (v - lo) / (hi - lo) * sz, P = (a, b) => [px + sc(a), py - sc(b)];
    plotAxes(px, py, sz, sz, q, 'Y₁', 'Y₂');
    const d0 = P(lo, lo), d1 = P(hi, hi); dashed(d0[0], d0[1], d1[0], d1[1], C.dim, q, 1.2);
    const gs = []; for (let m = 0; m <= 4; m++) for (let n = 0; n <= 3; n++) { const g = m + Math.SQRT2 * n; if (g <= 4.9) gs.push(g); }
    const eps = 0.3, oq = Q(S, 0, 'opposite noise lets the average recover every source', 0.6) * f1, rq = Q(S, 0, 'parallel noise defeats any finite label', 0.6) * f1;
    gs.forEach(g => { const c = P(g, g); dot(c[0], c[1], 6, 'n', q); const a = P(g + eps, g - eps), b = P(g - eps, g + eps); line(a[0], a[1], b[0], b[1], C.cyan, oq, 3); const e = P(g - eps, g - eps), f = P(g + eps, g + eps); line(e[0] + 10, e[1] + 10, f[0] + 10, f[1] + 10, C.red, rq * 0.8, 4); });
    lblG('g = m + √2 n', 640, 300, C.white, q, 22, 'left');
    lblG('Y⊥ = (g, g) + ε(t, −t)', 640, 360, C.cyan, oq, 19, 'left');
    lblG('(Y₁ + Y₂)/2 = g exactly', 640, 400, C.cyan, oq, 19, 'left');
    lbl('m + √2 n is injective', 640, 435, C.dim, oq, 15, 'left');
    lblG('Y∥ = (g, g) + ε(t, t)', 640, 500, C.red, rq, 19, 'left');
    lbl('same coordinate ranges ,', 640, 535, C.red, rq, 15, 'left');
    lbl('intervals overlap', 640, 560, C.red, rq, 15, 'left');
    chip(1390, 265, 780, 58, '(L + 1)² ≤ M (1 + (1 + √2) L / (2ε))', C.gold, rq, 23);
    const gq = Q(S, 0, 'as sources grow quadratically and room linearly', 0.6) * f1;
    const [M, ep] = [4, 0.25], qx = 1080, qy = 720, qw = 640, qh = 360, xS = L => qx + L / 40 * qw, yS = v => qy - v / 1700 * qh;
    plotAxes(qx, qy, qw, qh, gq, 'L', 'count');
    curve(p => { const L = p * 40; return [xS(L), yS((L + 1) * (L + 1))]; }, 80, C.gold, gq, 3);
    curve(p => { const L = p * 40; return [xS(L), yS(M * (1 + (1 + Math.SQRT2) * L / (2 * ep)))]; }, 10, C.cyan, gq, 3);
    lbl('gold : sources (L + 1)²', qx + 24, qy - qh + 30, C.gold, gq, 16, 'left');
    lbl('cyan : room M (1 + (1 + √2) L / (2ε))', qx + 24, qy - qh + 60, C.cyan, gq, 16, 'left');
    const cf = CROWD94[CFAIL94]; dot(xS(cf[0]), yS(cf[1]), 10, 'm', gq);
    lbl('M = 4 , ε = 0.25 : fails from L = ' + CFAIL94, xS(cf[0]) - 12, yS(cf[1]) - 24, C.mag, gq, 15, 'right');
    lbl('Typed residual cocycle , §14 : joint support mechanism', 1390, 790, C.dim, gq, 14);
  }
  const q = Q(S, 1, 'Binary incidence still blocks global assignments', 0.6, 0.3);
  if (q > 0) {
    const cx = 450, cy = 500, R = 215, pos = k => { const an = -Math.PI / 2 + TAU * (k - 1) / 9; return [cx + R * Math.cos(an), cy + R * Math.sin(an)]; };
    const eq = Q(S, 1, 'each mode in two', 0.6);
    MODES94.forEach(([a, b], i) => { const A = pos(a), B = pos(b); line(A[0], A[1], B[0], B[1], C.cyan, clamp(eq * 1.6 - i / 24) * 0.55, 1.8); });
    const cq = Q(S, 1, 'an assignment exists exactly when n is even', 0.6);
    for (let i = 0; i < 9; i++) { const A = pos(CYC94[i]), B = pos(CYC94[i + 1]), qq = clamp(cq * 2 - i / 10); line(A[0], A[1], B[0], B[1], C.gold, qq, 4.5); lbl('m', (A[0] + B[0]) / 2 + (A[0] + B[0] - 2 * cx) * 0.06, (A[1] + B[1]) / 2 + (A[1] + B[1] - 2 * cy) * 0.06 + 6, C.gold, qq, 16); }
    for (let k = 1; k <= 9; k++) { const [x, y] = pos(k); fillEll94(x, y, 22, 22, '#02060c', q); ring(x, y, 22, C.white, q, 2); lbl(String(k), x, y + 7, C.white, q, 18); }
    lbl('nodes : 9 contexts ;  edges : 18 modes , each in two contexts', cx, 770, C.dim, eq, 15);
    const oq = Q(S, 1, 'with an odd number of contexts', 0.6);
    chip(1390, 270, 780, 56, 'sum over contexts :  r · n = 2 Σₑ vₑ', C.cyan, oq, 22);
    chip(1390, 345, 780, 56, 'r odd  ⇒  n even', C.gold, Q(S, 1, "every context's occupation is even", 0.6), 26);
    const kq = Q(S, 1, "For Kurzynski's eighteen modes and nine contexts", 0.6);
    chip(1390, 430, 780, 56, 'Kurzyński : 18 modes , 9 contexts , 4 modes per context', C.white, kq, 20);
    FEAS94.forEach((ok, n) => { const x = 1035 + n * 90, qq = clamp(cq * 1.6 - n / 10); box(x, 485, 76, 76, ok ? C.green : C.red, qq, 2, ok ? 'rgba(0,40,20,0.5)' : 'rgba(40,0,10,0.4)'); lbl('n = ' + n, x + 38, 515, C.white, qq, 15); lbl(ok ? 'yes' : 'no', x + 38, 545, ok ? C.green : C.red, qq, 17); });
    lbl('integer feasibility recomputed (MILP) for n = 0 … 7', 1390, 595, C.dim, cq, 14);
    lbl('n = 2m : value m on the cycle 1→2→8→4→7→3→9→5→6→1', 1390, 640, C.gold, cq, 16);
    lbl('Lean : EighteenModeBosonicAssignmentParity.result , frozen', 1390, 700, C.green, kq, 16);
    lbl('assignment exists ⇔ n even ; a context-free assignment , not a quantum state', 1390, 740, C.dim, kq, 14);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The Kurzynski parity theorem is frozen in Lean', 'lean'], [1, 'Gleason, Krumm–Müller, joint measurability and binary trees are published inputs', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['RELATIVE', 'B†A · S²', C.gold, 'A relative gate and a sphere'], ['FULL FRAMES', '(1 + m·n)/2', C.cyan, 'a square law forced by every frame'], ['CLIFFORD', 'J² = −I', C.mag, 'anticommutation for i'], ['GRAM', 'rank ≤ 3', C.green, 'Gram rank three'], ['ROOT QUBIT', 'Z³ = ω²K_P²', C.gold, 'a root qubit in E8'], ['BRAID · E8', '1/φ² · 16', C.cyan, 'the braid angle and sixteen gates'], ['FIVE PHASES', '≤ 2/5', C.mag, 'two fifths'], ['STABLE · PARITY', 'θ/16 · n even', C.green, 'sharp stability and parity']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 210 + i * 214, q = Q(S, 0, ph) * fade; box(x - 100, 240, 200, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 285, col, q, 16); lblG(a2, x, 332, C.white, q, 19); });
    lbl('ONE CONDITIONAL MODEL · Γ₊ and its E8 carrier · root code with J = ABC · effects with (E) and an instrument · golden pair and 16-gate menu · record network', W / 2, 420, C.orange, Q(S, 0, 'in one conditional model') * fade, 14);
    lbl('LEAN · Kurzyński 18-mode parity : assignment ⇔ n even (EighteenModeBosonicAssignmentParity , frozen)', W / 2, 470, C.green, Q(S, 1, 'The Kurzynski parity theorem is frozen in Lean') * fade, 15);
    lbl('PUBLISHED · Busch (Gleason for effects) · Krumm–Müller · Brougham–Andersson · Andersson–Oi · Samaras–Stergiou · Yokota · Kurzyński', W / 2, 515, C.cyan, Q(S, 1, 'are published inputs') * fade, 15);
    lbl('CLASSICAL · Bloch geometry · Pauli algebra · even unimodular rank-8 lattice = E8 · compact Lie groups (Conrad)', W / 2, 560, '#8fbcff', Q(S, 1, 'are published inputs', 0.6, 0.6) * fade, 15);
    lbl('PROJECT INPUTS · E8 selection (AURIC–E8 volume) · v15 golden gate · v27 Bargmann chirality · Continuation II §96–97 · cocycle §14', W / 2, 605, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('VOLUME · relative gates · frame law · J = ABC · Gram · ports · parity · root code · golden square · braid angle · 16 gates · 2/5 · rank obstruction · joint support', W / 2, 650, C.orange, Q(S, 1, 'the rest is argued in the theory volume', 0.6, 0.6) * fade, 14);
    lbl('RECOMPUTED · leak · Bloch · 1/9 · J² = −I · Gram ranks · SDP 1/√3 · majority · tree depth 3 · 240 roots · det 1 · braid at 0.382 · trace 0.472 · SDP 2/5 · 52/243 · MILP parity', W / 2, 695, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V28 · E8 BRIDGE', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V28 · 二元读出、全框架相融与 E8 黄金门桥梁 · TRURETURING FILM 094', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Consistency over every frame gives the square law; five phases square a golden gate.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V28', relative: 'RELATIVE GATES', frames: 'FULL-FRAME LAW', clifford: 'SELECTING THREE', effects: 'EFFECTS AND UPDATES', gram: 'FIVE POINTS , THREE PORTS', binary: 'BINARY WITNESSES', rootcode: 'E8 ROOT QUBIT', braid: 'BRAID ANGLE , SIXTEEN GATES', limits: 'TWO FIFTHS AND RANK', stability: 'SHARP STABILITY', support: 'JOINT SUPPORT AND PARITY', finale: 'LEDGER' });

function poster094() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('p = (1 + m·n)/2 on every frame', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('Z³|_W = ω² K_P²', 1320, 480, { size: 48, fam: FG, w: 700, align: 'center', c: C.white });
  txt('Tr PQ = 1/φ² · 16 gates → E8', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V28', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V28 · E8 BRIDGE', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('二 元 读 出 · 全 框 架 相 融 · E8 黄 金 门 桥 梁', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 094', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster094;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
