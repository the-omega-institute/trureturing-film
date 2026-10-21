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

/* ---- film 063: AURIC Omega I · static compatibility and the two-setting port ---- */
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
const _po63 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po63.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po63.set(key, off); }
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
/* event-structure Hasse diagram */
const EV63 = [[0, 0], [-1, 1], [1, 1], [-1.5, 2], [0, 2], [1.5, 2]];
const EE63 = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5]];
function events63(cx, cy, sx, sy, a, hl = {}) {
  const P = EV63.map(([x, y]) => [cx + x * sx, cy - y * sy]);
  EE63.forEach(([i, j]) => arrow(P[i][0], P[i][1] - 18, P[j][0], P[j][1] + 20, C.dim, a * 0.9, 2));
  P.forEach((p, i) => { const on = hl[i]; ring(p[0], p[1], 20, on ? on : C.cyan, a, 2); if (on) dot(p[0], p[1], 14, on === C.gold ? 'g' : on === C.mag ? 'm' : on === C.green ? 'n' : 'c', a); lbl('e' + (i + 1), p[0] + 34, p[1] + 8, C.white, a * 0.8, 17, 'left'); });
  return P;
}
/* signed bars */
function bars63(x0, y0, v, bw, gap, hs, a, col, labs, neg = C.red) {
  if (a <= 0) return;
  v.forEach((x, i) => { const xx = x0 + i * (bw + gap); line(xx - 4, y0, xx + bw + 4, y0, C.dim, a, 1.2); if (Math.abs(x) > 1e-9) { const h = x * hs; fillBox(xx, h > 0 ? y0 - h : y0, bw, Math.abs(h), x > 0 ? col : neg, a * 0.5); rect63(xx, h > 0 ? y0 - h : y0, bw, Math.abs(h), x > 0 ? col : neg, a, 1.8); } if (labs) lbl(labs[i], xx + bw / 2, y0 + (x < 0 ? Math.abs(x) * hs + 26 : 26), C.dim, a, 15); });
}
const V23 = [0.43339, 0.44381, 0.53212, 0.44381, -0.36755];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  omega63(460, 450, 150, s0, C.cyan, 7);
  pyr63(460, 470, 190, 0.6 + t * 0.2, s0 * 0.9, { fillBase: true, K: 1, lab: 0.7 });
  const mq = Q(S, 0, 'a fixed menu of readings', 0.6);
  [['WAIT  t ≥ 0', C.cyan], ['READ  5 outcomes', C.gold], ['STOP', C.mag]].forEach(([s, col], i) => chip(1000 + i * 290, 330, 260, 60, s, col, mq, 20));
  [['keep', C.green, 'keep'], ['compress', C.orange, 'compress'], ['recover', C.cyan, 'or recover']].forEach(([s, col, ph], i) => chip(1000 + i * 290, 470, 220, 60, s, col, Q(S, 0, ph, 0.5), 22));
  lblG('for every possible input at once', 1290, 580, C.white, Q(S, 0, 'for every possible input at once', 0.6), 26);
  const fq = Q(S, 1, 'a single number: five', 0.6);
  txt('5', 1290, 800, { size: 190, fam: F.orb, w: 900, align: 'center', c: C.gold, a: fq, ab: 4 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyr63(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, { fillBase: true, K: 1, lab: 0.6 });
  chip(330, 380, 260, 70, 't = 0', C.cyan, rp, 26); chip(330, 480, 260, 70, 't = 2/3', C.gold, rp, 26);
  box(1480, 340, 260, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('q-dim port', 1610, 420, C.green, rp, 22); lbl('q ≥ 5', 1610, 470, C.white, rp, 26);
  txt(scramble('AURIC Ω I · TWO-SETTING PORT', rp, 463), W / 2, 760, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('AURIC Ω 第 一 部 · 静 态 相 融 与 两 设 置 端 口', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 063 · AURIC_OMEGA_STATIC_COMPATIBILITY_FIBER_THEORY', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 OBJECT ---- */
SCENES.object = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'A history adds one event at a time', 0.6);
  if (f1 > 0) {
    const cq = Q(S, 0, 'a configuration is a down-closed set', 0.6) * f1, kq = Q(S, 0, 'two configurations are compatible', 0.6) * f1;
    const hl = {}; if (cq > 0) { hl[0] = C.cyan; hl[1] = C.cyan; hl[3] = C.cyan; }
    if (kq > 0) { hl[2] = C.gold; }
    events63(520, 690, 170, 160, s0 * f1, hl);
    lbl('partial order', 520, 280, C.dim, s0 * f1, 20);
    lblG('C = {e1, e2, e4}  down-closed', 1300, 330, C.cyan, cq, 26);
    lblG('D = {e1, e3}', 1300, 400, C.gold, kq, 26);
    lblG('C ∪ D a configuration  ⇒  compatible', 1300, 470, C.white, kq, 26);
    const nq = Q(S, 0, 'Compatibility need not hold for every pair', 0.6) * f1;
    chip(1120, 580, 300, 58, 'not every pair', C.mag, nq, 22); chip(1470, 580, 300, 58, 'not transitive', C.mag, Q(S, 0, 'it need not be transitive', 0.6) * f1, 22);
  }
  const q = Q(S, 1, 'A history adds one event at a time', 0.6, 0.3);
  if (q > 0) {
    const n = Math.min(6, 1 + Math.floor(Math.max(0, S.u - lineAt(S, 1).s) / 0.9)), hl = {};
    for (let i = 0; i < n; i++) hl[[0, 1, 2, 4, 3, 5][i]] = C.green;
    const P = events63(480, 690, 160, 150, q, hl);
    lblG('C → C ∪ {e}', 480, 300, C.green, q, 26);
    const oq = Q(S, 1, 'An observer keeps only the part', 0.6);
    ring(P[4][0], P[4][1], 40, C.gold, oq, 3); lbl('E_o', P[4][0] + 50, P[4][1] - 30, C.gold, oq, 20, 'left');
    lblG('O_o(C) = C ∩ ↓E_o', 1300, 340, C.gold, oq, 28);
    lblG('τ_o(C) = Σ ω(e) ,  ω > 0', 1300, 420, C.white, Q(S, 1, 'its clock is a weighted count', 0.6), 28);
    const tq = Q(S, 1, 'three different quantities', 0.6);
    [['history length', C.cyan], ['clock τ', C.gold], ['wait t', C.mag]].forEach(([s, col], i) => chip(1040 + i * 260, 560, 240, 60, s, col, tq, 20));
    lblG('≠', 1170, 568, C.white, tq, 30); lblG('≠', 1430, 568, C.white, tq, 30);
  }
  void t;
};

/* ---- 03 WALK ---- */
SCENES.walk = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The menu is strict', 0.6);
  if (f1 > 0) {
    MODES63.forEach((m, i) => { const q = Q(S, 0, ['zero zero zero', 'one zero zero', 'zero one zero', 'zero zero one', 'one zero one'][i], 0.4) * f1, x = 300 + i * 150; box(x - 60, 290, 120, 60, C.cyan, q, 2, 'rgba(0,0,0,0.45)'); lbl(m[3], x, 330, C.white, q, 26); lbl(m[0], x, 390, C.gold, Q(S, 0, 'that is null, two, three, five', 0.6) * f1, 22); });
    lbl('no adjacent 1 1', 600, 450, C.dim, Q(S, 0, 'the legal three-bit words', 0.6) * f1, 20);
    const kq = Q(S, 0, 'The generator K is the pyramid itself', 0.6) * f1;
    pyr63(1400, 520, 300, 0.6 + t * 0.2, kq, { fillBase: true, K: 1 });
    const K = [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0]];
    mgrid(380, 520, K, 52, 52, kq, { size: 22, colf: v => v ? C.gold : C.dim });
    lblG('K =', 330, 660, C.white, kq, 30, 'right');
    lblG('U(t) = e^{−itK}', 880, 660, C.white, kq, 26);
  }
  const q = Q(S, 1, 'The menu is strict', 0.6, 0.3);
  if (q > 0) {
    [['WAIT  t ≥ 0', C.cyan, 'nonnegative waits'], ['READ  5 outcomes', C.gold, 'a complete five-outcome read'], ['STOP', C.mag, 'Stop'], ['FEEDBACK', C.green, 'finite feedback'], ['RANDOM', C.vio, 'input-independent randomness']].forEach(([s, col, ph], i) => chip(360 + (i % 3) * 300, 330 + Math.floor(i / 3) * 90, 270, 62, s, col, Q(S, 1, ph, 0.5), 20));
    const xq = Q(S, 1, 'No extra phases, no extra gates', 0.6);
    chip(510, 560, 240, 58, 'PHASE', C.dim, xq, 20); chip(810, 560, 240, 58, 'GATE', C.dim, xq, 20); stamp('NOT IN MENU', 660, 570, xq, C.red, 40, -0.05);
    const rq = Q(S, 1, 'A passive change of frame', 0.6);
    lblG('D = diag(1, i, i, i, 1)', 1440, 340, C.white, rq, 28);
    lblG('O(t) = D† U(t) D = e^{tA} ,  Aᵀ = −A', 1440, 410, C.gold, rq, 26);
    const an = t * 0.9; ring(1440, 640, 140, C.dim, rq, 1.5); arrow(1440, 640, 1440 + 140 * Math.cos(an), 640 - 140 * Math.sin(an), C.gold, rq, 4); arrow(1440, 640, 1440 + 140 * Math.cos(an + Math.PI / 2), 640 - 140 * Math.sin(an + Math.PI / 2), C.cyan, rq * 0.7, 3);
    lbl('real rotation', 1440, 830, C.gold, rq, 22);
  }
};

/* ---- 04 BLIND ---- */
SCENES.blind = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Yet deleting the imaginary part', 0.6);
  if (f1 > 0) {
    const gq = Q(S, 0, 'every reading is a real symmetric matrix', 0.6) * f1, x0 = 300, y0 = 300, c = 74;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const re = j >= i; box(x0 + j * c, y0 + i * c, c - 6, c - 6, re ? C.cyan : C.dim, gq * (re ? 1 : 0.5), 1.5, re ? 'rgba(63,248,255,0.12)' : 'rgba(0,0,0,0.4)'); }
    lbl('Re ρ : 15', x0 + 2.5 * c, y0 - 24, C.cyan, gq, 22);
    const bq = Q(S, 0, 'ten blind directions', 0.6) * f1;
    for (let i = 0; i < 5; i++) for (let j = 0; j < i; j++) lbl('iB', x0 + j * c + c / 2 - 3, y0 + i * c + c / 2 + 6, C.mag, bq, 18);
    lbl('Im ρ : 10 blind', x0 + 2.5 * c, y0 + 5 * c + 34, C.mag, bq, 22);
    lblG('15 effects  →  14 coordinates', 1300, 340, C.white, Q(S, 0, 'The whole menu spans fifteen', 0.6) * f1, 28);
    lblG('24 − 14 = 10', 1300, 410, C.mag, bq, 30);
    const pq = Q(S, 0, 'two orthogonal states', 0.6) * f1;
    lblG('ψ± = (e_N ± i e_2) / √2 ,   ⟨ψ+, ψ−⟩ = 0', 1300, 500, C.white, pq, 24);
    const pr = [0.5, 0.5, 0, 0, 0].map((x, i) => x * (0.7 + 0.3 * Math.sin(t * 1.3 + i)));
    bars63(1060, 760, pr, 34, 10, 180, pq, C.cyan, ['∅', '2', '3', '5', '25']); bars63(1340, 760, pr, 34, 10, 180, pq, C.gold, ['∅', '2', '3', '5', '25']);
    lbl('ψ+', 1150, 590, C.cyan, pq, 22); lbl('ψ−', 1430, 590, C.gold, pq, 22);
    lbl('identical on every read', 1300, 840, C.red, Q(S, 0, 'can never be told apart', 0.6) * f1, 22);
  }
  const q = Q(S, 1, 'Yet deleting the imaginary part', 0.6, 0.3);
  if (q > 0) {
    lblG('ℛ(X) = (X + Xᵀ) / 2', 640, 330, C.white, q, 34);
    chip(480, 430, 260, 60, 'positive ✓', C.green, Q(S, 1, 'is positive', 0.5), 22); chip(800, 430, 300, 60, 'trace-preserving ✓', C.green, Q(S, 1, 'keeps the trace', 0.5), 22);
    const cq = Q(S, 1, 'its Choi state has eigenvalue', 0.6), ev = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, -0.1, -0.1];
    bars63(1080, 560, ev, 40, 12, 900, cq, C.cyan, null);
    lbl('Choi spectrum', 1340, 330, C.white, cq, 22); lblG('−1/10', 1080 + 9 * 52 + 20, 700, C.red, cq, 28);
    stamp('NOT CP', 640, 600, Q(S, 1, 'so it is not completely positive', 0.6), C.red, 60, -0.06);
    lblG('readings factor  ≠  legal compression', 960, 820, C.gold, Q(S, 1, 'Readings factor', 0.6), 28);
  }
};

/* ---- 05 PORT ---- */
SCENES.port = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const s0 = clamp(u), y = 470;
  const a1 = Q(S, 0, 'Send every input', 0.6), a2 = Q(S, 0, 'q-dimensional quantum block', 0.6), a3 = Q(S, 0, 'any number of classical flags', 0.6), a4 = Q(S, 0, 'decode with a fixed map', 0.6);
  lblG('ρ', 220, y + 10, C.white, Math.max(s0 * 0.4, a1), 44); arrow(250, y, 380, y, C.dim, a1, 3);
  box(390, y - 70, 200, 140, C.cyan, a1, 2.5, 'rgba(0,0,0,0.5)'); lbl('Enc', 490, y + 8, C.cyan, a1, 30);
  arrow(600, y, 720, y, C.dim, a2, 3);
  box(730, y - 110, 300, 220, C.green, a2, 2.5, 'rgba(77,255,166,0.08)'); lbl('M_q', 880, y - 30, C.green, a2, 34); lbl('q = ?', 880, y + 30, C.white, a2, 30);
  for (let k = 0; k < 6; k++) chip(800 + k * 34, y + 160, 26, 30, '', C.gold, a3, 12);
  lbl('flags f ∈ F', 880, y + 220, C.gold, a3, 18);
  arrow(1040, y, 1160, y, C.dim, a4, 3);
  box(1170, y - 70, 200, 140, C.cyan, a4, 2.5, 'rgba(0,0,0,0.5)'); lbl('Dec', 1270, y + 8, C.cyan, a4, 30);
  const sq = Q(S, 0, 'at two settings', 0.6);
  arrow(1380, y - 20, 1500, y - 110, C.cyan, sq, 2.5); arrow(1380, y + 20, 1500, y + 110, C.gold, sq, 2.5);
  chip(1620, y - 130, 220, 62, 't = 0', C.cyan, sq, 24); chip(1620, y + 130, 220, 62, 't = 2/3', C.gold, sq, 24);
  const eq = Q(S, 0, 'Score the worst total-variation error', 0.6);
  lblG('e_two(T) = sup_ρ max_t TV( p_t(ρ), p_t(Tρ) )', 960, 300, C.white, eq, 28);
  lbl('chosen before the setting', 1270, y + 110, C.dim, a4, 16);
  const q2 = Q(S, 1, 'not seconds', 0.6);
  chip(1620, y + 230, 300, 50, 'not seconds', C.mag, q2, 18);
  txt('min q ?', 960, 820, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.gold, a: Q(S, 1, 'How small can q be', 0.6), ab: 3 });
  void t;
};

/* ---- 06 RIGIDITY ---- */
SCENES.rigidity = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'with a tail below', 'lean'], [0, 'shows every coordinate', 'theory'], [1, '', 'lean'], [1, 'This is not tomography', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'So the five probes span the space', 0.6);
  if (f1 > 0) {
    const pq = Q(S, 0, 'preserves five probes', 0.6) * f1;
    ['[2]', '[3]', '[5]', '[2,5]'].forEach((s, i) => chip(330 + i * 150, 320, 120, 56, s, C.cyan, pq, 22));
    chip(930, 320, 120, 56, 'v', C.gold, Q(S, 0, 'the vector v', 0.5) * f1, 26);
    lblG('v = O(2/3)ᵀ e_N', 640, 410, C.gold, Q(S, 0, 'the two-thirds wait sends to null', 0.6) * f1, 28);
    const tq = Q(S, 0, 'twelfth-order rational Taylor polynomial', 0.6) * f1;
    lblG('S₁₂ = Σ_{k≤12} M^k / k! ,  M = (2/3)A', 640, 490, C.white, tq, 24);
    ['107738440637/248594813775', '490347766/1104865839', '4899328858/9207215325', '490347766/1104865839', '−91371050044/248594813775'].forEach((s, i) => lbl(s, 640, 550 + i * 34, C.dim, tq * clamp((S.u - lineAt(S, 0).s - 6 - i * 0.3) / 0.4), 18));
    const lq = Q(S, 0, 'with a tail below', 0.6) * f1;
    lblG('‖e^M − S₁₂‖ ≤ (7/6)·2¹³/13! < 64/6081075', 640, 760, C.green, lq, 24);
    const cq = Q(S, 0, 'every coordinate of v exceeds', 0.6) * f1;
    bars63(1200, 700, V23.map(Math.abs), 70, 24, 520, s0 * f1, C.gold, ['∅', '2', '3', '5', '25']);
    dashed(1180, 700 - 0.36 * 520, 1680, 700 - 0.36 * 520, C.red, cq, 2.5); lbl('9/25', 1700, 700 - 0.36 * 520 + 6, C.red, cq, 22, 'left');
    lbl('|v_j|', 1430, 380, C.gold, s0 * f1, 22);
  }
  const q = Q(S, 1, 'So the five probes span the space', 0.6, 0.3);
  if (q > 0) {
    const cx = 560, cy = 560, R = 220, sp = ['[2]', '[3]', '[5]', '[2,5]'];
    sp.forEach((s, i) => { const an = -Math.PI / 2 + i * Math.PI / 2 + 0.3, x = cx + R * Math.cos(an), y = cy + R * Math.sin(an); line(cx, cy, x, y, C.gold, Q(S, 1, 'overlap in a connected star', 0.6), 3); dot(x, y, 18, 'c', q); lbl(s, x, y + (Math.sin(an) > 0 ? 46 : -30), C.cyan, q, 22); });
    dot(cx, cy, 24, 'g', q); lbl('v', cx + 34, cy - 20, C.gold, q, 26);
    const iq = Q(S, 1, 'forces the channel to be the identity', 0.6);
    lblG('T = id', 1300, 380, C.green, iq, 54);
    lbl('LEAN · ProbeComponentRigidity.connected_probability_preserving_identity', 1300, 430, C.green, iq, 14);
    const eq = Q(S, 1, 'An exact port needs five dimensions', 0.6);
    lblG('exact port  ⇒  q ≥ 5', 1300, 520, C.white, eq, 40);
    lbl('LEAN · CanonicalFlagCompression.canonical_flag_port_lower_bound', 1300, 565, C.green, eq, 14);
    const nq = Q(S, 1, 'only nine of twenty-five', 0.6);
    for (let k = 0; k < 25; k++) box(1000 + k * 24, 680, 20, 40, k < 9 ? C.gold : C.dim, nq * (k < 9 ? 1 : 0.5), 1.5, k < 9 ? 'rgba(255,207,90,0.35)' : 'rgba(0,0,0,0.3)');
    lbl('9 of 25 real directions · not tomography', 1300, 770, C.gold, nq, 22);
  }
  void t;
};

/* ---- 07 BOUND ---- */
SCENES.bound = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'lean'], [0, 'With mu above one eighth', 'theory'], [1, '', 'theory'], [1, 'The exact optimum below five', 'open']]);
  const s0 = clamp(u), px = 300, py = 800, pw = 760, ph = 440;
  plotAxes(px, py, pw, ph, s0, 'q', 'error floor');
  for (let q = 1; q <= 5; q++) lbl(String(q), px + (q - 1) / 4 * pw, py + 30, C.dim, s0, 18);
  const yS = e => py - e / 0.25 * ph;
  [[0.2, '0.2'], [0.1, '0.1']].forEach(([e, s]) => { dashed(px, yS(e), px + pw, yS(e), C.dim, s0 * 0.5, 1); lbl(s, px - 14, yS(e) + 6, C.dim, s0, 16, 'right'); });
  const fl = [[e => (5 - e) / 102, C.cyan, '(5−q)/102', 0, 'that is five minus q over one hundred and two'], [e => (5 - e) / 30, C.gold, '(5−q)/30', 1, 'the floor rises to five minus q over thirty'], [e => 27 * (5 - e) / 500, C.mag, '27(5−q)/500  (t = 1)', 1, 'a wait of one gives']];
  fl.forEach(([f, col, s, k, ph2], i) => { const a = Q(S, k, ph2, 0.8); curve(z => [px + z * pw, yS(f(1 + 4 * z))], 30, col, a, 3.5); for (let q = 1; q <= 5; q++) dot(px + (q - 1) / 4 * pw, yS(f(q)), 9, ['c', 'g', 'm'][i], a); lbl(s, i === 2 ? px + pw / 4 + 24 : px + 20, i === 2 ? yS(f(2)) - 16 : yS(f(1)) - 14, col, a, 20, 'left'); });
  const gq = Q(S, 0, 'Six survival tests', 0.6);
  lblG('e_two ≥ μ (d − q) / ((2 + μ)(d + 1))', 1450, 330, C.white, gq, 28);
  lbl('LEAN · SparseProbePortBound.sparse_probe_port_bound', 1450, 375, C.green, gq, 14);
  lblG('μ > 1/8  ⇒  μ/(2+μ) > 1/17', 1450, 440, C.cyan, Q(S, 0, 'With mu above one eighth', 0.6), 26);
  const kq = Q(S, 1, 'A spectral gap between the two bases', 0.6);
  lblG('ε ≥ γ (d − q) / (2d) ,  γ = 1 − κ', 1450, 540, C.white, kq, 28);
  lblG('κ(2/3) < 2/3   ·   κ(1) < 23/50', 1450, 610, C.gold, Q(S, 1, 'stays below two thirds', 0.6), 26);
  chip(1450, 730, 520, 60, 'exact optimum for q < 5 : open', C.vio, Q(S, 1, 'The exact optimum below five', 0.6), 22);
  void t;
};

/* ---- 08 COEXIST ---- */
SCENES.coexist = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const kq = Q(S, 0, 'eight independent probabilities', 0.6);
  for (let k = 0; k < 25; k++) { const col = k < 8 ? C.gold : k < 9 ? C.white : C.mag, x = 300 + (k % 5) * 70, y = 300 + Math.floor(k / 5) * 70; box(x, y, 60, 60, col, s0 * (k < 9 ? 1 : 0.8), 1.5, k < 9 ? 'rgba(255,207,90,0.25)' : 'rgba(255,60,210,0.12)'); }
  lbl('8 probabilities + trace', 475, 680, C.gold, kq, 20); lbl('16 blind', 475, 720, C.mag, Q(S, 0, 'sixteen-dimensional blind kernel', 0.6), 22);
  const fq = Q(S, 0, 'many different states read the same', 0.6);
  for (let i = 0; i < 7; i++) { const an = t * 0.6 + i * 0.9; dot(860 + 60 * Math.cos(an), 480 + 60 * Math.sin(an), 10, 'm', fq * 0.8); }
  ring(860, 480, 90, C.mag, fq, 2); lbl('one reading', 860, 610, C.mag, fq, 18);
  const e1 = Q(S, 1, 'Some pair of states agrees', 0.6), e2 = Q(S, 1, 'but no single channel can merge', 0.6);
  box(1060, 300, 720, 130, C.gold, e1, 2, 'rgba(0,0,0,0.5)'); lblG('∃ ρ ≠ σ :  R(ρ) = R(σ)', 1420, 380, C.gold, e1, 34);
  box(1060, 470, 720, 130, C.green, e2, 2, 'rgba(0,0,0,0.5)'); lblG('∀ ρ :  R(Tρ) = R(ρ)  ⇒  T = id', 1420, 550, C.green, e2, 32);
  chip(1240, 680, 300, 60, 'there exists', C.gold, Q(S, 1, 'there exists', 0.5), 22); chip(1600, 680, 300, 60, 'for all', C.green, Q(S, 1, 'the other says for all', 0.5), 22);
  lbl('both true · different quantifiers', 1420, 790, C.white, Q(S, 1, 'One statement says', 0.6), 22);
};

/* ---- 09 GRAPH ---- */
SCENES.graph = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Infinite runs need', 0.6) * 0.6;
  const gq = Q(S, 0, 'is a fixed causal graph', 0.6) * f1;
  const N = [[300, 560, 'ρ'], [520, 420, 'Φ'], [520, 700, 'Ψ'], [760, 560, 'Λ'], [980, 560, 'rec']];
  [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]].forEach(([i, j]) => arrow(N[i][0] + 40, N[i][1], N[j][0] - 44, N[j][1], C.dim, gq, 2.5));
  N.forEach(([x, y, s], i) => { box(x - 44, y - 36, 88, 72, i === 4 ? C.gold : C.cyan, gq, 2, 'rgba(0,0,0,0.5)'); lblG(s, x, y + 10, i === 4 ? C.gold : C.white, gq, 28); });
  lbl('joint law of actual records kept', 640, 820, C.gold, Q(S, 0, 'keeps the joint law', 0.6) * f1, 20);
  const cq = Q(S, 0, 'Independent nodes on different ports commute', 0.6) * f1;
  lblG('(Φ ⊗ id)(id ⊗ Ψ) = Φ ⊗ Ψ = (id ⊗ Ψ)(Φ ⊗ id)', 1430, 360, C.white, cq, 24);
  const sw = 0.5 + 0.5 * Math.sin(t * 1.4);
  chip(1430 - 150 + 300 * sw, 470, 120, 56, 'Φ', C.cyan, cq, 26); chip(1430 + 150 - 300 * sw, 470, 120, 56, 'Ψ', C.mag, cq, 26);
  lbl('order does not change any probability', 1430, 570, C.white, Q(S, 0, 'does not change any probability', 0.6) * f1, 20);
  const q = Q(S, 1, 'Infinite runs need', 0.6);
  if (q > 0) {
    chip(1430, 660, 420, 60, 'compatible states → GNS', C.green, Q(S, 1, 'the GNS construction', 0.6), 22);
    const iq = Q(S, 1, 'an infinite history with equal weights', 0.6);
    for (let k = 0; k < 14; k++) fillBox(1150 + k * 42, 840 - 60, 30, 60, C.red, iq * 0.5 * (1 - k / 16));
    lblG('Σ |c|² = ∞  · not a state', 1430, 760, C.red, iq, 26);
  }
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['OBJECT', 'events · compatibility', C.cyan, 'One static object'], ['MENU', 'wait · read · stop', C.gold, 'a strict menu'], ['BLIND', 'Re ρ only', C.mag, 'a blind real frame'], ['RIGID', 'T = id', C.green, 'a port that cannot shrink'], ['PORT', 'q ≥ 5', C.white, 'below five dimensions'], ['FLOOR', '(5−q)/30', C.orange, 'an error floor']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 20); });
    lbl('LEAN · exp_remainder_le · connected_probability_preserving_identity · canonical_flag_port_lower_bound · sparse_probe_port_bound', W / 2, 480, C.green, Q(S, 1, 'Lean has frozen') * fade, 15);
    lbl('VOLUME · five-mode constants · spectral gap κ · two-setting coexistence', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory volume') * fade, 18);
    lbl('RECOMPUTED · every number', W / 2, 600, C.white, Q(S, 1, 'every number here was recomputed') * fade, 19);
    lbl('NEXT · CONTROL · READOUTS · 1/φ', W / 2, 690, C.gold, Q(S, 1, 'Next: control') * fade, 34);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyr63(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, { fillBase: true, K: 1, lab: 0 });
    txt('AURIC Ω I · TWO-SETTING PORT', W / 2, 680, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('AURIC Ω 第一部 · 静态相融与两设置端口 · TRURETURING FILM 063', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two readings, one channel, no shortcut.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC OMEGA', object: 'STATIC OBJECT', walk: 'FIVE-MODE WALK', blind: 'BLIND REAL FRAME', port: 'THE PORT', rigidity: 'RIGIDITY', bound: 'ERROR FLOOR', coexist: 'EXISTS VS FOR ALL', graph: 'CAUSAL GRAPHS', finale: 'LEDGER' });

function poster63() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(470, 470, 230, 1, C.cyan, 9);
  pyr63(470, 500, 250, 2.2, 1, { fillBase: true, K: 1 });
  txt('T = id', 1340, 430, { size: 72, fam: FG, w: 700, align: 'center', c: C.green });
  txt('exact port  ⇒  q ≥ 5', 1340, 540, { size: 48, fam: FG, w: 700, align: 'center', c: C.white });
  txt('ε ≥ (5 − q)/30', 1340, 640, { size: 48, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC Ω 第一部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC Ω I · TWO-SETTING PORT', W / 2, 890, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('两 个 读 数 · 一 个 通 道 · 没 有 捷 径', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 063', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster63;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
