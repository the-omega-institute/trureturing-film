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

/* ---- film 104: AURIC V49–V50 · THE SQUARE LAW, RECURSIVE THREE AXES AND K-BONACCI LIMITS ---- */
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
const _po104 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po104.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po104.set(key, off); }
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
/* film 104 data, generated from vis104.json by verify104.py */
const V104 = {"odds":{"0.5":[0.18243,0.19,0.19782,0.20587,0.21417,0.2227,0.23148,0.24049,0.24974,0.25923,0.26894,0.27888,0.28905,0.29943,0.31003,0.32082,0.33181,0.34299,0.35434,0.36586,0.37754,0.38936,0.40131,0.41338,0.42556,0.43782,0.45017,0.46257,0.47502,0.4875,0.5,0.5125,0.52498,0.53743,0.54983,0.56218,0.57444,0.58662,0.59869,0.61064,0.62246,0.63414,0.64566,0.65701,0.66819,0.67918,0.68997,0.70057,0.71095,0.72112,0.73106,0.74077,0.75026,0.75951,0.76852,0.7773,0.78583,0.79413,0.80218,0.81,0.81757],"1":[0.04743,0.05215,0.05732,0.06297,0.06914,0.07586,0.08317,0.09112,0.09975,0.1091,0.1192,0.13011,0.14185,0.15447,0.16798,0.18243,0.19782,0.21417,0.23148,0.24974,0.26894,0.28905,0.31003,0.33181,0.35434,0.37754,0.40131,0.42556,0.45017,0.47502,0.5,0.52498,0.54983,0.57444,0.59869,0.62246,0.64566,0.66819,0.68997,0.71095,0.73106,0.75026,0.76852,0.78583,0.80218,0.81757,0.83202,0.84553,0.85815,0.86989,0.8808,0.8909,0.90025,0.90888,0.91683,0.92414,0.93086,0.93703,0.94268,0.94785,0.95257],"2":[0.00247,0.00302,0.00368,0.0045,0.00549,0.00669,0.00816,0.00995,0.01213,0.01477,0.01799,0.02188,0.0266,0.0323,0.03917,0.04743,0.05732,0.06914,0.08317,0.09975,0.1192,0.14185,0.16798,0.19782,0.23148,0.26894,0.31003,0.35434,0.40131,0.45017,0.5,0.54983,0.59869,0.64566,0.68997,0.73106,0.76852,0.80218,0.83202,0.85815,0.8808,0.90025,0.91683,0.93086,0.94268,0.95257,0.96083,0.9677,0.9734,0.97812,0.98201,0.98523,0.98787,0.99005,0.99184,0.99331,0.99451,0.9955,0.99632,0.99698,0.99753],"4":[1e-05,1e-05,1e-05,2e-05,3e-05,5e-05,7e-05,0.0001,0.00015,0.00022,0.00034,0.0005,0.00075,0.00111,0.00166,0.00247,0.00368,0.00549,0.00816,0.01213,0.01799,0.0266,0.03917,0.05732,0.08317,0.1192,0.16798,0.23148,0.31003,0.40131,0.5,0.59869,0.68997,0.76852,0.83202,0.8808,0.91683,0.94268,0.96083,0.9734,0.98201,0.98787,0.99184,0.99451,0.99632,0.99753,0.99834,0.99889,0.99925,0.9995,0.99966,0.99978,0.99985,0.9999,0.99993,0.99995,0.99997,0.99998,0.99999,0.99999,0.99999]},"odds_x":[-3.0,-2.9,-2.8,-2.7,-2.6,-2.5,-2.4,-2.3,-2.2,-2.1,-2.0,-1.9,-1.8,-1.7,-1.6,-1.5,-1.4,-1.3,-1.2,-1.1,-1.0,-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.0],"det":{"1.5":[1e-05,6e-05,0.0002,0.00047,0.0009,0.00152,0.00236,0.00344,0.00478,0.0064,0.00831,0.01051,0.01301,0.01581,0.0189,0.02228,0.02594,0.02986,0.03402,0.0384,0.04297,0.0477,0.05256,0.05751,0.0625,0.06749,0.07243,0.07727,0.08195,0.0864,0.09056,0.09437,0.09775,0.10062,0.1029,0.10451,0.10536,0.10535,0.1044,0.1024,0.09925,0.09483,0.08905,0.08178,0.0729,0.0623,0.04984,0.03539,0.01882,0.0,-0.02122,-0.04499,-0.07146,-0.10078,-0.1331,-0.16859,-0.20742,-0.24974,-0.29575,-0.3456,-0.39949,-0.45759,-0.5201,-0.5872,-0.6591,-0.73599,-0.81808,-0.90556,-0.99867,-1.0976,-1.20258,-1.31383,-1.43158,-1.55606,-1.6875,-1.82614,-1.97222,-2.12599,-2.2877,-2.4576],"2.0":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"2.6":[-0.0,-0.0,-1e-05,-4e-05,-9e-05,-0.00019,-0.00035,-0.00058,-0.00092,-0.00137,-0.00196,-0.00272,-0.00366,-0.00481,-0.00619,-0.00781,-0.0097,-0.01187,-0.01432,-0.01707,-0.02013,-0.02349,-0.02714,-0.03108,-0.0353,-0.03976,-0.04444,-0.0493,-0.0543,-0.05939,-0.0645,-0.06957,-0.0745,-0.07921,-0.0836,-0.08755,-0.09093,-0.09361,-0.09543,-0.09622,-0.09581,-0.09399,-0.09056,-0.08528,-0.07792,-0.06821,-0.05587,-0.0406,-0.02209,0.0,0.02603,0.05638,0.09144,0.13163,0.1774,0.22922,0.28758,0.35298,0.42598,0.50713,0.59703,0.69629,0.80556,0.92552,1.05686,1.20032,1.35666,1.52667,1.71117,1.91102,2.12711,2.36035,2.6117,2.88214,3.17271,3.48445,3.81846,4.17588,4.55787,4.96564]},"det_t":[0.02,0.04,0.06,0.08,0.1,0.12,0.14,0.16,0.18,0.2,0.22,0.24,0.26,0.28,0.3,0.32,0.34,0.36,0.38,0.4,0.42,0.44,0.46,0.48,0.5,0.52,0.54,0.56,0.58,0.6,0.62,0.64,0.66,0.68,0.7,0.72,0.74,0.76,0.78,0.8,0.82,0.84,0.86,0.88,0.9,0.92,0.94,0.96,0.98,1.0,1.02,1.04,1.06,1.08,1.1,1.12,1.14,1.16,1.18,1.2,1.22,1.24,1.26,1.28,1.3,1.32,1.34,1.36,1.38,1.4,1.42,1.44,1.46,1.48,1.5,1.52,1.54,1.56,1.58,1.6],"i3":{"quad":0,"cube":6,"quart":36},"feat":[0.49,0.42,0.09],"sm":[1.0,0.58,0.37,0.2482,0.1705,0.11838,0.08257,0.05771],"hyp":[[0.09933,-0.99505],[0.10971,-0.99396],[0.12117,-0.99263],[0.13381,-0.99101],[0.14773,-0.98903],[0.16307,-0.98661],[0.17995,-0.98367],[0.19852,-0.9801],[0.21892,-0.97574],[0.24129,-0.97045],[0.2658,-0.96403],[0.29259,-0.95624],[0.3218,-0.94681],[0.35357,-0.93541],[0.38798,-0.92167],[0.4251,-0.90515],[0.46492,-0.88535],[0.50738,-0.86172],[0.55229,-0.83365],[0.59933,-0.8005],[0.64805,-0.76159],[0.69779,-0.7163],[0.7477,-0.66404],[0.79671,-0.60437],[0.84355,-0.53705],[0.88682,-0.46212],[0.92501,-0.37995],[0.95663,-0.29131],[0.98033,-0.19738],[0.99502,-0.09967],[1.0,0.0],[0.99502,0.09967],[0.98033,0.19738],[0.95663,0.29131],[0.92501,0.37995],[0.88682,0.46212],[0.84355,0.53705],[0.79671,0.60437],[0.7477,0.66404],[0.69779,0.7163],[0.64805,0.76159],[0.59933,0.8005],[0.55229,0.83365],[0.50738,0.86172],[0.46492,0.88535],[0.4251,0.90515],[0.38798,0.92167],[0.35357,0.93541],[0.3218,0.94681],[0.29259,0.95624],[0.2658,0.96403],[0.24129,0.97045],[0.21892,0.97574],[0.19852,0.9801],[0.17995,0.98367],[0.16307,0.98661],[0.14773,0.98903],[0.13381,0.99101],[0.12117,0.99263],[0.10971,0.99396],[0.09933,0.99505]],"born_t":[0.0,0.2,0.4,0.6,0.8,1.0,1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0,3.2,3.4,3.6,3.8,4.0,4.2,4.4,4.6,4.8,5.0,5.2,5.4,5.6,5.8,6.0,6.2,6.4,6.6,6.8,7.0,7.2,7.4,7.6,7.8,8.0,8.2,8.4,8.6,8.8,9.0,9.2,9.4,9.6,9.8,10.0],"born":{"1,1":[1.4,1.41302,1.37939,1.30315,1.1993,1.14105,1.22066,1.32151,1.3898,1.4142,1.39167,1.32283,1.21264,1.09156,1.15209,1.27612,1.36524,1.40959,1.4069,1.35833,1.27013,1.16722,1.15683,1.25636,1.34874,1.40305,1.41194,1.37374,1.29023,1.1694,1.08411,1.19574,1.31048,1.38519,1.41393,1.39564,1.33278,1.23485,1.14516,1.1859,1.29044,1.37162,1.41122,1.40442,1.35074,1.2533,1.12635,1.11081,1.23762,1.34028,1.4],"2,1":[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"3,1":[0.728,0.70889,0.75679,0.84822,0.93646,0.96875,0.92159,0.82833,0.74247,0.70713,0.73985,0.82685,0.92737,0.98704,0.96355,0.87511,0.77554,0.71399,0.71797,0.78439,0.88069,0.95572,0.96118,0.893,0.79636,0.72358,0.71051,0.76438,0.86142,0.95453,0.98909,0.93878,0.84044,0.74887,0.70752,0.73424,0.81546,0.91079,0.96686,0.94495,0.86121,0.76719,0.71158,0.72159,0.7939,0.89563,0.97504,0.9809,0.9086,0.80662,0.728]},"res_d":[0.55409,0.23171,0.10627,0.05169,0.02617,0.01365,0.0073,0.00398,0.00221,0.00124],"res_h":[1.0,0.44591,0.21419,0.10793,0.05624,0.03008,0.01643,0.00913,0.00515,0.00293,0.00169],"res_q":0.7,"zeta":[1.0,0.97365,0.90736,0.82608,0.74821,0.68163,0.62782,0.58562,0.55318,0.52874,0.51082,0.49823,0.49004,0.48553,0.48413,0.48539,0.48895,0.49451,0.50181,0.51064,0.52081,0.53215,0.54448,0.55764,0.57148,0.58583,0.60052,0.61539,0.63024,0.64489,0.65914,0.67277,0.68556,0.6973,0.70774,0.71664,0.72377,0.72888,0.73175,0.73215,0.72987,0.72474,0.7166,0.70534,0.69091,0.67333,0.65268,0.62918,0.60316,0.57512,0.5458,0.51617,0.48753,0.46151,0.44006,0.42531,0.41919,0.42302,0.43708,0.46057,0.49182,0.52875,0.56923,0.61121,0.65289,0.69267,0.72917,0.76118,0.78769,0.80788,0.82109,0.82688,0.82499,0.81542,0.79838,0.77438,0.74422,0.70901,0.67023,0.62974,0.58975,0.55283,0.52165,0.49866,0.48552,0.4826,0.48876,0.50164,0.51827,0.53568,0.5513,0.56315,0.56993,0.57107,0.56676,0.55794,0.54635,0.5345,0.52548,0.52257,0.52856,0.54502,0.57181,0.60716,0.64818,0.69155,0.73393,0.7723,0.80413,0.82738,0.84061,0.84298,0.83422,0.81471,0.78543,0.74795,0.70444,0.65757,0.6104,0.5662,0.52804],"coordpow":[[-0.5,0.866,0.0],[-0.5,-0.866,0.0],[-0.5,0.866,0.0],[-0.5,-0.866,0.0]],"matpow":[0.5,0.8,0.92857,0.97561,0.9918,0.99726,0.99909,0.9997,0.9999,0.99997,0.99999,1.0],"grampow":[0.5,0.25,0.125,0.0625,0.03125,0.01562,0.00781,0.00391,0.00195,0.00098,0.00049,0.00024],"tree_p":[0.4,0.25,0.2,0.1,0.05],"tree_theta":[0.65,0.6154,0.5714,0.6667],"counts":{"2":[1,2,3,5,8,13,21,34,55,89,144],"3":[1,2,4,7,13,24,44,81,149,274,504],"4":[1,2,4,8,15,29,56,108,208,401,773],"5":[1,2,4,8,16,31,61,120,236,464,912]},"hankel":{"2":2,"3":3,"4":4,"5":5},"conv":{"3":{"err":[0.839287,0.456311,0.204402,0.0892868,0.0277396,0.0120946,0.00595342,0.00176553,0.000698554,0.000360581,0.000129303,3.8219e-05,2.0612e-05,9.43247e-06,2.7882e-06,1.34862e-06],"bound":[0.839287,0.456311,0.248091,0.134884,0.0733352,0.0398716,0.0216777,0.0117859,0.00640789,0.0034839,0.00189416,0.00102983,0.000559908,0.000304416,0.000165508,8.99847e-05]},"6":{"err":[0.983583,0.495862,0.245845,0.121871,0.060405,0.0299352,0.0148328,0.00379825,0.00184462,0.000902806,0.000445691,0.000222095,0.000111769,3.96914e-05,1.79079e-05,8.39686e-06],"bound":[0.983583,0.495862,0.249983,0.126026,0.0635345,0.0320302,0.0161476,0.00814064,0.00410401,0.00206899,0.00104306,0.000525844,0.000265098,0.000133646,6.73761e-05,3.39669e-05]}},"lam":[1.618034,1.839287,1.927562,1.965948,1.983583,1.991964,1.996031,1.998029,1.999019,1.99951,1.999756],"tvg":[0.25,0.125,0.0625,0.03125,0.015625,0.0078125,0.00390625,0.001953125,0.0009765625,0.00048828125,0.000244140625,0.0001220703125,6.103515625e-05,3.0517578125e-05],"pstar4":[0.51879,0.26914,0.13963,0.07244],"geom":[0.5,0.25,0.125,0.0625,0.03125,0.01562,0.00781,0.00391],"fixn":[0.09204,0.41626,0.70117,0.8606,0.9375,0.97266,0.98828,0.99512,0.99805,0.99927,0.99976,1.0,1.0,1.0],"fixk":[0.9375,0.8125,0.70117,0.60498,0.52198,0.45037,0.38858,0.33527,0.28927,0.24959,0.21535,0.1858,0.16031,0.13832,0.11934,0.10297,0.08884,0.07665,0.06614,0.05706,0.04923,0.04248,0.03665,0.03162,0.02728,0.02354,0.02031,0.01753,0.01512,0.01305],"crit":[0.60498,0.61044,0.61071,0.60972,0.60868,0.60789,0.60735,0.60701,0.60681,0.60669,0.60662,0.60658,0.60656,0.60655,0.60654],"spin":[[1,2.0,2.0,0],[2,1.0,0.9999999999999998,5],[3,0.6666666666666666,0.6666666666666669,12],[4,0.5,0.5,21],[5,0.4,0.39999999999999997,32],[6,0.3333333333333333,0.3333333333333333,45]]};
/* ---- film 104 helpers ---- */
function ell104(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll104(cx, cy, rx, ry, col, a, rot = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell104(x, y, w, h, s, col, a, size = 20, fillA = 0.35, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.35, tc, a, size); }
function chipG(x, y, w, h, s, col, a, size = 22) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: FG, w: 700, align: 'center', c: col, a }); }
/* Bloch sphere outline; bp104 maps a Bloch vector to the drawing (x right, z up, y as depth) */
function sph104(cx, cy, R, a, col = C.cyan, axes = false) {
  if (a <= 0) return;
  fillEll104(cx, cy, R, R, col, a * 0.05);
  ring(cx, cy, R, col, a * 0.65, 1.8);
  ell104(cx, cy, R, R * 0.3, col, a * 0.35, 1.2, 0, 1);
  dashed(cx, cy - R - 18, cx, cy + R + 18, C.dim, a * 0.45, 1.2);
  if (axes) { dashed(cx - R - 18, cy, cx + R + 18, cy, C.dim, a * 0.45, 1.2); lbl('z', cx + 12, cy - R - 22, C.dim, a, 17, 'left'); lbl('x', cx + R + 24, cy + 6, C.dim, a, 17, 'left'); }
}
function bp104(cx, cy, R, r) { return [cx + r[0] * R - r[1] * R * 0.32, cy - r[2] * R + r[1] * R * 0.2]; }
function pl104(xs, ys, xS, yS, col, a, lw = 3, n = null) {
  if (a <= 0) return;
  const m = n == null ? xs.length : Math.max(1, Math.min(xs.length, Math.floor(n)));
  strokePoly(xs.slice(0, m).map((x, i) => [xS(x), yS(ys[i])]), col, a, lw, false);
}
const TH104 = V104.tree_theta;

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2), cx = 470, cy = 470, R = 240;
  sph104(cx, cy, R, s0, C.cyan, true);
  const th = t * 0.5, r = [0.86 * Math.cos(th), 0.86 * Math.sin(th), 0.5];
  const P = bp104(cx, cy, R, r);
  arrow(cx, cy, P[0], P[1], C.gold, s0, 3); dot(P[0], P[1], 14, 'g', s0);
  lblG('r = (X, Y, Z) / N', cx, cy + R + 70, C.gold, s0, 28);
  const items = [['where handedness enters three axes', 'VERSION 48 · HANDEDNESS AND THREE AXES', 'where orientation enters the three axes', C.cyan], ['which joint conditions force the square', 'THE SQUARE LAW', 'w(r) = r²   ·   Π_q = |z_q|² / ‖z‖²', C.gold], ['becomes three axes again and again', 'RECURSIVE THREE AXES', 'a binary tree of Bloch points', C.mag], ['which constraints vanish as a K-bonacci order grows', 'K-BONACCI LIMITS', 'λ_k ↑ 2   ·   windows   ·   averaged spins', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cx = W / 2, cy = 420, R = 210;
  sph104(cx, cy, R, rp * 0.9, C.cyan, true);
  for (let i = 0; i < 6; i++) { const th = t * 0.4 + i * TAU / 6, r = [Math.cos(th), Math.sin(th), 0.0]; const P = bp104(cx, cy, R, r); dot(P[0], P[1], 10, i % 2 ? 'c' : 'g', rp * 0.8); }
  const Pz = bp104(cx, cy, R, [0, 0, 1]); arrow(cx, cy, Pz[0], Pz[1], C.gold, rp, 3);
  chipG(330, 330, 340, 58, 'merging · 2^(β/2) = 2', C.gold, rp, 21); chipG(330, 415, 340, 58, 'reciprocity · w = r²', C.cyan, rp, 21); chipG(330, 500, 340, 58, 'conservation · β = 2', C.green, rp, 21);
  box(1420, 320, 380, 200, C.mag, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one interface , any order', 1610, 380, C.mag, rp, 20); lblG('λ_k ↑ 2', 1610, 438, C.white, rp, 28); lblG('TV(p*, 2^(−j)) = 2^(−k)', 1610, 488, C.white, rp, 22);
  txt(scramble('AURIC V49–V50 · SQUARE LAW', rp, 504), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V49–V50 · 平 方 律 、递 归 三 轴 与 K-bonacci 极 限', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  const sq = clamp((u - 1.2) / 0.8);
  txt('TRURETURING · FILM 104 · AURIC_SUM_PRODUCT_POWERS_QUADRATIC_RELATION_CLOSURE_AND_NORMALIZED_LIFTING_V49', W / 2, 105, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sq, ls: 2 });
  txt('AURIC_RECURSIVE_THREE_AXIS_ATLAS_POWER_LIMITS_AND_KBONACCI_V50', W / 2, 132, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sq, ls: 2 });
};

/* ---- 02 TWO ROUTES TO THE SQUARE (V49 §3, §5) ---- */
SCENES.select = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A second route needs no continuity', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a continuous weight that respects multiplication', 0.6) * f1;
    chipG(W / 2, 250, 1400, 60, 'w(rs) = w(r) w(s) , w continuous  ⇒  w(r) = r^β      ( g(t) = log w(eᵗ) is additive )', C.gold, q, 21);
    const oq = Q(S, 0, 'any beta gives legal odds', 0.6) * f1;
    const px = 160, py = 770, pw = 700, ph = 360, xs = V104.odds_x, xS = x => px + (x + 3) / 6 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, oq, 'log(a/b)', 'p_β = a^β / (a^β + b^β)');
    [['0.5', C.dim], ['1', C.cyan], ['2', C.gold], ['4', C.mag]].forEach(([b, col], i) => { const qq = clamp(oq * 1.6 - i * 0.15); pl104(xs, V104.odds[b], xS, yS, col, qq, 3); lblG('β = ' + b, px + 20, py - ph + 20 + i * 30, col, qq, 18, 'left'); });
    lblG('log(p/(1 − p)) = β log(a/b) : every β > 0 is a legal odds law', px + pw / 2, py + 62, C.white, oq, 18);
    const mq = Q(S, 0, 'Additive merging of orthogonal pieces', 0.6) * f1;
    chipG(1395, 345, 760, 58, 'w(√(r² + s²)) = w(r) + w(s)   ( r = s = 1 )', C.cyan, mq, 22);
    const bx = 1060, by = 770, bw = 680, bh = 300, bS = b => bx + b / 4 * bw, vS = v => by - v / 4.2 * bh;
    plotAxes(bx, by, bw, bh, mq, 'β', '2^(β/2)');
    curve(p => [bS(p * 4), vS(Math.pow(2, p * 2))], 60, C.cyan, mq, 3);
    const fq = Q(S, 0, 'forces two to the beta over two to equal two', 0.6) * f1;
    dashed(bx, vS(2), bx + bw, vS(2), C.gold, fq, 2); lblG('= 2', bx + bw + 8, vS(2) + 6, C.gold, fq, 18, 'left');
    dot(bS(2), vS(2), 14, 'g', fq); dashed(bS(2), by, bS(2), vS(2), C.gold, fq * 0.7, 1.5);
    [0, 1, 2, 3, 4].forEach(b => lbl(String(b), bS(b), by + 26, C.dim, mq, 15));
    stamp('β = 2', 1600, 700, fq, C.gold, 36, -0.05);
  }
  const q1 = Q(S, 1, 'A second route needs no continuity', 0.6, 0.3);
  if (q1 > 0) {
    lbl('NO CONTINUITY ASSUMED', 530, 255, C.cyan, q1, 22);
    const mq = Q(S, 1, 'put the two weights on the diagonal', 0.6);
    const mx = 250, my = 300, cw = 220, chh = 70;
    cell104(mx, my, cw, chh, 'w(|z₁|)', C.gold, mq, 22); cell104(mx + cw + 10, my, cw, chh, 'z₁* z₂', C.cyan, Q(S, 1, 'the amplitude product off it', 0.6), 22);
    cell104(mx, my + chh + 10, cw, chh, 'z₂* z₁', C.cyan, Q(S, 1, 'the amplitude product off it', 0.6), 22); cell104(mx + cw + 10, my + chh + 10, cw, chh, 'w(|z₂|)', C.gold, mq, 22);
    lblG('G_w(z₁, z₂) ⪰ 0  for all nonzero z₁ , z₂ ;  w(rs) = w(r)w(s)', mx + cw + 5, my + 2 * chh + 50, C.white, mq, 18);
    const pq = Q(S, 1, 'Positivity gives w of r at least r squared', 0.6);
    chipG(530, 545, 820, 56, '(z₁, z₂) = (r, 1) :  det = w(r) − r² ≥ 0  ⇒  w(r) ≥ r²', C.gold, pq, 21);
    const rq = Q(S, 1, 'the reciprocal gives the reverse', 0.6);
    chipG(530, 620, 820, 56, 'w(1/r) ≥ r^(−2) ,  w(r) w(1/r) = w(1) = 1  ⇒  w(r) ≤ r²', C.cyan, rq, 21);
    const sq = Q(S, 1, 'so w is r squared', 0.6);
    stamp('w(r) = r²', 530, 720, sq, C.green, 40, -0.04);
    const dq = Q(S, 1, 'the amplitude product off it', 0.8);
    const px = 1060, py = 760, pw = 680, ph = 420, ts = V104.det_t, xS = x => px + x / 1.6 * pw, yS = v => py - ph / 2 - clamp(v, -1.1, 1.1) / 1.1 * (ph / 2);
    plotAxes(px, py, pw, ph, dq, 't', 'det G_β at z₁ = z₂ = t :  t^(2β) − t⁴');
    dashed(px, yS(0), px + pw, yS(0), C.dim, dq, 1.2);
    [['1.5', C.cyan], ['2.0', C.gold], ['2.6', C.mag]].forEach(([b, col], i) => { const qq = clamp(dq * 1.6 - i * 0.2); let n = V104.det[b].findIndex(v => Math.abs(v) > 1.1); if (n < 0) n = ts.length; pl104(ts, V104.det[b], xS, yS, col, qq, i === 1 ? 4 : 3, n); lblG('β = ' + b, px + 20, py - ph + 24 + i * 28, col, qq, 17, 'left'); });
    lbl('β = 2 : rank one , det ≡ 0 ;  β ≠ 2 : negative somewhere', px + pw / 2, py + 34, C.dim, dq, 15);
    [0.5, 1, 1.5].forEach(x => lbl(String(x), xS(x), py + 58, C.dim, dq, 14));
  }
};

/* ---- 03 BILINEAR CLOSURE (V49 §4, §8) ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Quadratic weights also close at second order', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'its merging correction', 0.6) * f1;
    chipG(W / 2, 250, 1300, 60, 'C_Q(u, v) = [ Q(u + v) − Q(u) − Q(v) ] / 2 ,    Q ≥ 0 , Q(0) = 0', C.gold, q, 22);
    const bq = Q(S, 0, 'If that correction is bilinear', 0.6) * f1;
    box(150, 320, 760, 250, C.cyan, bq, 2, 'rgba(0,30,40,0.35)');
    lblG('C_Q bilinear  ⇒  Q(v) = C_Q(v, v)', 530, 380, C.white, bq, 26);
    lblG('C_Q symmetric , positive semidefinite', 530, 430, C.cyan, bq, 20);
    const nq = Q(S, 0, 'with no continuity assumed', 0.6) * f1;
    lblG('L = Q − B is additive ;  0 ≤ Q(±v/n) = B(v,v)/n² ± L(v)/n', 530, 490, C.dim, nq, 17);
    lblG('⇒ B(v,v) ≥ n |L(v)| for every n  ⇒  L = 0', 530, 525, C.dim, nq, 17);
    lbl('NO CONTINUITY , EVENNESS OR HOMOGENEITY ASSUMED', 530, 620, C.green, nq, 18);
    const pq = Q(S, 0, 'for the norm to the beta', 0.6) * f1;
    const px = 1060, py = 770, pw = 680, ph = 340, bS = b => px + (b - 0.5) / 3.5 * pw, vS = v => py - (v + 0.5) / 7.5 * ph;
    plotAxes(px, py, pw, ph, pq, 'β', 'C(e, e) for Q = ‖v‖^β');
    curve(p => { const b = 0.5 + p * 3.5; return [bS(b), vS((Math.pow(2, b) - 2) / 2)]; }, 60, C.cyan, pq, 3);
    dashed(px, vS(1), px + pw, vS(1), C.gold, pq, 2); lblG('bilinear needs C(e, e) = −C(e, −e) = 1', px + pw - 10, vS(1) + 30, C.gold, pq, 16, 'right');
    dot(bS(2), vS(1), 13, 'g', pq);
    [1, 2, 3, 4].forEach(b => lbl(String(b), bS(b), py + 26, C.dim, pq, 15));
    chipG(1400, 345, 720, 56, 'C(e, −e) = −1 ,  C(e, e) = (2^β − 2)/2', C.cyan, pq, 21);
    stamp('2^β = 4', 1270, 500, Q(S, 0, 'forces two to the beta to be four', 0.6) * f1, C.gold, 36, -0.05);
  }
  const q1 = Q(S, 1, 'Quadratic weights also close at second order', 0.6, 0.3);
  if (q1 > 0) {
    const bq = Q(S, 1, 'on three fixed branches', 0.6);
    const ox = 330, oy = 650;
    [[1, -0.35, C.cyan, 'v₁'], [0.6, 0.75, C.gold, 'v₂'], [-0.55, 0.6, C.mag, 'v₃']].forEach(([x, y, col, l], i) => { const qq = clamp(bq * 1.6 - i * 0.2), X = ox + x * 140, Y = oy - y * 140; arrow(ox, oy, X, Y, col, qq, 3); lblG(l, X + (x > 0 ? 18 : -18), Y - 8, col, qq, 22, x > 0 ? 'left' : 'right'); });
    dot(ox, oy, 8, 'w', bq);
    const terms = [['+μ(123)', C.white], ['−μ(12)', C.red], ['−μ(13)', C.red], ['−μ(23)', C.red], ['+μ(1)', C.green], ['+μ(2)', C.green], ['+μ(3)', C.green]];
    terms.forEach(([s, col], i) => { const qq = clamp(bq * 1.6 - i * 0.1); chipG((i < 4 ? 335 : 400) + (i % 4) * 130, 335 + Math.floor(i / 4) * 66, 118, 52, s, col, qq, 19); });
    lblG('I₃ = μ(123) − Σ μ(pairs) + Σ μ(singles) ,  μ(S) = Q(Σ_S v_j)', 530, 270, C.dim, bq, 17);
    const zq = Q(S, 1, 'the third inclusion-exclusion term vanishes', 0.6);
    chipG(530, 760, 820, 56, 'Q quadratic :  I₃ = 0   ( singles 1 − 2 + 1 = 0 , pairs 1 − 1 = 0 )', C.green, zq, 20);
    const cq = Q(S, 1, 'A cubic weight on three equal unit inputs', 0.6);
    const bx = 1060, by = 720, hs = 50;
    [['quadratic', V104.i3.quad, C.green], ['|x|³', V104.i3.cube, C.mag]].forEach(([l, v, col], i) => { const x = bx + i * 260; line(x - 30, by, x + 150, by, C.dim, cq, 1.5); if (v > 0) { fillBox(x, by - v * hs, 120, v * hs, col, cq * 0.5); rect63(x, by - v * hs, 120, v * hs, col, cq, 1.8); } else dot(x + 60, by, 10, 'n', cq); lblG(l, x + 60, by + 34, col, cq, 20); lblG('I₃ = ' + v, x + 60, by - v * hs - 16, C.white, cq, 22); });
    chipG(1400, 330, 760, 58, '|x|³ , v₁ = v₂ = v₃ = 1 :  27 − 3·8 + 3 = 6', C.mag, cq, 22);
    stamp('I₃ = 6 ≠ 0', 1640, 560, Q(S, 1, 'which is six', 0.5), C.mag, 28, -0.05);
    lbl('I₃ = 0 with nonnegative weights still does not give a positive Gram kernel (V14 §10)', 1400, 790, C.dim, cq, 14);
  }
};

/* ---- 04 POWER FEATURES (V49 §6, V50 §3) ---- */
SCENES.powers = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Higher powers keep the coherent image', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Lift two amplitudes to their m-th power features', 0.6) * f1;
    chipG(W / 2, 250, 1400, 60, 'Φ_m(a, b) = ( √C(m,k) · a^(m−k) b^k ) ,  k = 0 … m   ∈  ℂ^(m+1)', C.gold, q, 22);
    const iq = Q(S, 0, 'inner products become m-th powers', 0.6) * f1;
    chipG(W / 2, 330, 1100, 56, '⟨Φ_m(z), Φ_m(w)⟩ = ⟨z, w⟩^m ,    ‖Φ_m(z)‖² = ‖z‖^(2m)', C.cyan, iq, 22);
    const nq = Q(S, 0, 'there are m plus one', 0.6) * f1;
    for (let m = 1; m <= 5; m++) { const qq = clamp(nq * 1.6 - m * 0.12), y = 380 + m * 70; lblG('m = ' + m, 200, y + 32, C.dim, qq, 20, 'left'); for (let k = 0; k <= m; k++) cell104(320 + k * 92, y, 80, 50, k === 0 ? 'a^' + m : (k === m ? 'b^' + m : '·'), k === 0 || k === m ? C.gold : C.cyan, qq, 18); }
    lbl('m + 1 features , linear span exactly ℂ^(m+1)', 520, 810, C.dim, nq, 16);
    const fq = Q(S, 0, 'For the square, a squared, root two a b, b squared', 0.6) * f1;
    const bx = 1150, by = 720, hs = 380, labs = ['a²', '√2 ab', 'b²'], cols = [C.gold, C.mag, C.gold];
    V104.feat.forEach((v, i) => { const qq = clamp(fq * 1.6 - i * 0.2), x = bx + i * 170; fillBox(x, by - v * hs, 120, v * hs, cols[i], qq * 0.5); rect63(x, by - v * hs, 120, v * hs, cols[i], qq, 1.8); lblG(labs[i], x + 60, by + 32, cols[i], qq, 22); lblG(v.toFixed(2), x + 60, by - v * hs - 14, C.white, qq, 20); });
    line(bx - 20, by, bx + 3 * 170, by, C.dim, fq, 1.5);
    lblG('(a, b) = (√0.7 , √0.3) :  squared feature weights', bx + 245, 420, C.dim, fq, 16);
    const cq = Q(S, 0, 'the cross feature completes the normalisation', 0.6) * f1;
    lblG('endpoints a² , b² alone : 0.58', bx + 245, 455, C.gold, cq, 18);
    lblG('cross feature 2|a|²|b|² = 0.42  ⇒  total 1', bx + 245, 485, C.mag, cq, 18);
  }
  const q1 = Q(S, 1, 'Higher powers keep the coherent image', 0.6, 0.3);
  if (q1 > 0) {
    chipG(W / 2, 250, 1450, 58, 'image of [a : b] ↦ [Φ_m(a, b)] in ℂP^m :  complex dimension 1 , codimension m − 1', C.gold, q1, 21);
    const sq = Q(S, 1, 'from one state', 0.6);
    chipG(530, 330, 760, 56, 'ρ₁ = ½ [[1, ½], [½, 1]] ,  Bloch vector (½, 0, 0)', C.white, sq, 21);
    const px = 160, py = 760, pw = 700, ph = 360, xS = m => px + (m - 1) / 11 * pw, yS = v => py - v * ph, ms = V104.matpow.map((_, i) => i + 1);
    plotAxes(px, py, pw, ph, sq, 'm', 'Bloch length after m-th power');
    const mq = Q(S, 1, 'normalised matrix powers run to a pure state', 0.6);
    pl104(ms, V104.matpow, xS, yS, C.gold, mq, 3); ms.forEach((m, i) => dot(xS(m), yS(V104.matpow[i]), 7, 'g', mq));
    lblG('ρ^m / Tr ρ^m : R_m = tanh(m artanh ½) → 1', xS(3.5), yS(0.8), C.gold, mq, 17, 'left');
    const gq = Q(S, 1, 'tensor Gram powers decay', 0.6);
    pl104(ms, V104.grampow, xS, yS, C.cyan, gq, 3); ms.forEach((m, i) => dot(xS(m), yS(V104.grampow[i]), 7, 'c', gq));
    lblG('G_m / Tr G_m : off-diagonal 2^(−m) → 0', xS(3.2), yS(0.12) - 8, C.cyan, gq, 17, 'left');
    [1, 4, 8, 12].forEach(m => lbl(String(m), xS(m), py + 26, C.dim, sq, 15));
    const cx = 1400, cy = 500, R = 185, k = 1 + Math.floor(clamp((u - lineAt(S, 1).s) / 9) * 11);
    sph104(cx, cy, R, sq, C.cyan, true);
    const pm = bp104(cx, cy, R, [V104.matpow[k - 1], 0, 0]), pg = bp104(cx, cy, R, [V104.grampow[k - 1], 0, 0]);
    dot(pm[0], pm[1], 15, 'g', mq); dot(pg[0], pg[1], 15, 'c', gq);
    lblG('|+⟩⟨+|', cx + R + 16, cy - 20, C.gold, mq, 20, 'left'); lblG('I/2', cx - 10, cy - 26, C.cyan, gq, 20, 'right');
    lbl('m = ' + k, cx, cy + R + 50, C.white, sq, 20);
    stamp('SAME START , OPPOSITE LIMITS', 1400, 815, Q(S, 1, 'to the maximally mixed one', 0.5), C.mag, 26, -0.03);
  }
};

/* ---- 05 THE BLOCH BALL (V49 §7, V50 §2) ---- */
SCENES.bloch = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const cx = 460, cy = 530, R = 230;
  const f1 = 1 - Q(S, 1, 'Limits stay in the ball', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A positive two-by-two relation', 0.6) * f1;
    chipG(W / 2, 250, 1500, 58, 'M = [[A, C], [C*, B]] ⪰ 0 , N = A + B :   M/N = (I + r·σ)/2 ,  r = (2 Re C , −2 Im C , A − B) / N', C.gold, q, 20);
    const bq = Q(S, 0, 'is a point of the Bloch ball', 0.6) * f1;
    sph104(cx, cy, R, bq, C.cyan, true);
    const th = t * 0.45, rr = [0.62 * Math.cos(th), 0.62 * Math.sin(th), 0.45], P = bp104(cx, cy, R, rr);
    arrow(cx, cy, P[0], P[1], C.gold, bq, 3); dot(P[0], P[1], 14, 'g', bq);
    const lq = Q(S, 0, 'one minus its squared length', 0.6) * f1;
    chipG(1400, 340, 720, 58, '1 − ‖r‖² = 4 (AB − |C|²) / N²', C.cyan, lq, 24);
    lbl('rank one ⇔ ‖r‖ = 1 :  pure states fill the sphere , mixtures the ball', 1400, 400, C.dim, lq, 15);
    const hq = Q(S, 0, 'the hyperbolic tangent and secant', 0.6) * f1;
    const ox = 1120, oy = 625, rad = 165;
    line(ox, oy - rad - 20, ox, oy + rad + 20, C.dim, hq, 1.5); line(ox - 10, oy, ox + rad + 30, oy, C.dim, hq, 1.5);
    lbl('tanh δ', ox, oy - rad - 30, C.dim, hq, 15); lbl('sech δ', ox + rad + 36, oy + 5, C.dim, hq, 15, 'left');
    strokePoly(V104.hyp.map(([s, th2]) => [ox + s * rad, oy - th2 * rad]), C.dim, hq * 0.6, 1.5, false);
    V104.hyp.forEach(([s, th2], i) => { if (i % 3 === 0) dot(ox + s * rad, oy - th2 * rad, 7, i === 30 ? 'g' : 'c', clamp(hq * 1.6 - i / 80)); });
    lblG('( sech δ , tanh δ ) on the unit circle', 1440, 650, C.white, hq, 18, 'left');
    lblG('(A − B)/(A + B) = tanh δ', 1440, 520, C.cyan, hq, 19, 'left');
    lblG('2√(AB)/(A + B) = sech δ', 1440, 555, C.cyan, hq, 19, 'left');
    lblG('δ = ½ log(A/B) ; phase θ is extra data', 1440, 590, C.dim, hq, 17, 'left');
  }
  const q1 = Q(S, 1, 'Limits stay in the ball', 0.6, 0.3);
  if (q1 > 0) {
    sph104(cx, cy, R, q1, C.cyan, true);
    const lim = [0.6, -0.2, 0.775];
    for (let j = 1; j <= 8; j++) { const e = 0.5 / j, v = [lim[0] + e * 0.8, lim[1], lim[2] - e * 0.6], n = Math.hypot(...v), P = bp104(cx, cy, R, v.map(x => x / n)); dot(P[0], P[1], 9, 'c', clamp(q1 * 1.6 - j * 0.12)); }
    const PL = bp104(cx, cy, R, lim); dot(PL[0], PL[1], 15, 'g', Q(S, 1, 'pure limits stay pure', 0.6));
    lbl('pure ρ_j → pure ρ', PL[0] + 20, PL[1] - 22, C.gold, Q(S, 1, 'pure limits stay pure', 0.6), 17, 'left');
    chipG(W / 2, 250, 1450, 58, 'ρ_j ⪰ 0 , Tr ρ_j = 1 , ρ_j → ρ  ⇒  ρ ⪰ 0 , Tr ρ = 1 ;   Tr ρ_j² = 1  ⇒  Tr ρ² = 1', C.gold, q1, 20);
    const zq = Q(S, 1, 'two to the minus j times the identity tends to zero', 0.6);
    const bx = 1050, by = 560, bw = 70, hs = 260;
    for (let j = 1; j <= 8; j++) { const v = Math.pow(2, -j) * 2, x = bx + (j - 1) * (bw + 14), qq = clamp(zq * 1.6 - j * 0.1); fillBox(x, by - v * hs / 1, bw, v * hs, C.cyan, qq * 0.5); rect63(x, by - v * hs, bw, v * hs, C.cyan, qq, 1.5); lbl('j=' + j, x + bw / 2, by + 24, C.dim, qq, 14); }
    lblG('Tr G_j = 2 · 2^(−j) → 0', 1395, 300 + 60, C.cyan, zq, 20);
    const nq = Q(S, 1, 'its normalised form stays one half the identity', 0.6);
    for (let j = 1; j <= 8; j++) cell104(bx + (j - 1) * (bw + 14), 650, bw, 52, 'I/2', C.gold, clamp(nq * 1.6 - j * 0.1), 17);
    lblG('G_j / Tr G_j = I/2 for every j', 1395, 750, C.gold, nq, 20);
    stamp('LIMIT 0 , NORMALISED I/2', 1395, 815, Q(S, 1, 'need not commute', 0.6), C.mag, 26, -0.03);
  }
};

/* ---- 06 NATIVE SQUARE LAW (V49 §9) ---- */
SCENES.born = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Then a blocked single site keeps its probability', 0.6);
  if (f1 > 0) {
    const eq = Q(S, 0, 'eighty-nine configurations', 0.6) * f1, occ = [1, 3, 6, 9];
    for (let j = 1; j <= 9; j++) { const x = 190 + (j - 1) * 82; line(x, 300, x + 82, 300, C.dim, eq * (j < 9 ? 0.6 : 0), 1.5); if (occ.includes(j)) dot(x, 300, 18, 'g', eq); else ring(x, 300, 11, C.dim, eq, 2); lbl(String(j), x, 345, C.dim, eq, 15); }
    lblG('E = { q ⊆ {1, …, 9} : no two adjacent } ,  |E| = 89 = F₁₁', 520, 395, C.white, eq, 19);
    const bq = Q(S, 0, 'an active block with x plus x squared equal to one', 0.6) * f1;
    chipG(520, 470, 800, 56, 'Q = [[x, c], [c, x²]] ,  x + x² = 1 ,  c = x√x ,  Q² = Q', C.gold, bq, 20);
    lblG('x = 1/φ = 0.618 ,  Tr Q = 1 ,  Q = (I + n·σ)/2 , n = (2c, 0, x − x²)', 520, 525, C.dim, bq, 16);
    const dq = Q(S, 0, 'drive three pi over five', 0.6) * f1;
    const dx = 1500, dy = 360, dr = 95, calls = Math.min(10, Math.floor(clamp((u - lineAt(S, 0).s - 6) / 5) * 10.99));
    ring(dx, dy, dr, C.cyan, dq * 0.7, 2);
    for (let c = 0; c <= calls; c++) { const an = -Math.PI / 2 + c * 3 * Math.PI / 5, x = dx + dr * Math.cos(an), y = dy + dr * Math.sin(an); dot(x, y, c === calls ? 12 : 7, c === calls ? 'g' : 'c', dq); }
    const an = -Math.PI / 2 + calls * 3 * Math.PI / 5; arrow(dx, dy, dx + dr * 0.85 * Math.cos(an), dy + dr * 0.85 * Math.sin(an), C.gold, dq, 3);
    lbl('calls : ' + calls, dx, dy + dr + 34, C.white, dq, 17);
    lblG('α = 3π/5 ,  10α = 6π  ⇒  U_j(10) = I', 1180, 320, C.cyan, dq, 20, 'center');
    lblG('U_j(t) = e^(iαt) [ I + (e^(iαt) − 1) P_j ]', 1180, 360, C.dim, dq, 16, 'center');
    const fq = Q(S, 0, 'Returns and four-corner consistency', 0.6) * f1;
    const sx0 = 1180, sy0 = 600, hh = 85, CN = [['∅', -1, 1], ['{1}', 1, 1], ['{1,3}', 1, -1], ['{3}', -1, -1]];
    for (let i = 0; i < 4; i++) { const A = CN[i], B = CN[(i + 1) % 4]; line(sx0 + A[1] * hh, sy0 - A[2] * hh, sx0 + B[1] * hh, sy0 - B[2] * hh, C.cyan, fq, 2.5); }
    CN.forEach(([l, x, y]) => { dot(sx0 + x * hh, sy0 - y * hh, 13, 'm', fq); lblG(l, sx0 + x * (hh + 26), sy0 - y * hh + (y > 0 ? -18 : 32), C.white, fq, 18); });
    chipG(1180, 770, 760, 56, 'O(s) O(t) = O(1) O(st)  ⇒  Π_q ∝ k^|q| |z_q|^β ,  k, β > 0', C.mag, Q(S, 0, 'force every unknown density into a power family', 0.6) * f1, 19);
    lblG('common odds  Π_q₁ / Π_q₀ = O(z_q₁ / z_q₀)', 520, 640, C.white, fq, 19);
    lbl('ten-call return contracts the conditional probability : D(10) = D(0) e^(−∫(a+b))', 520, 690, C.dim, fq, 14);
  }
  const q1 = Q(S, 1, 'Then a blocked single site keeps its probability', 0.6, 0.3);
  if (q1 > 0) {
    const nq = q1;
    box(160, 280, 420, 170, C.cyan, nq, 2, 'rgba(0,30,40,0.35)'); lbl('active block , address 1', 370, 268, C.cyan, nq, 16);
    dot(260, 365, 18, 'c', nq); lblG('a : ∅', 260, 420, C.white, nq, 20); dot(480, 365, 18, 'c', nq); lblG('b : {1}', 480, 420, C.white, nq, 20);
    const hq = Q(S, 1, 'keeps its probability', 0.6);
    box(650, 280, 220, 170, C.mag, hq, 2, 'rgba(40,0,40,0.35)'); lbl('blocked {2}', 760, 268, C.mag, hq, 16); dot(760, 365, 18, 'm', hq); lblG('h fixed', 760, 420, C.white, hq, 20);
    chipG(520, 520, 880, 56, 'Π({2}) = k|h|^β / ( |a|^β + k|b|^β + k|h|^β )  is constant', C.mag, hq, 20);
    const cq = Q(S, 1, 'must stay constant as the block moves', 0.6);
    chipG(520, 600, 880, 56, '⇒  |a(t)|^β + k |b(t)|^β  constant ;   d|b|²/dt = −d|a|²/dt = J = 2αc Im(a* b)', C.gold, cq, 18);
    lblG('a = A > 0 , b = iB : J > 0 ;  A = B gives k = 1 , varying A/B gives β = 2', 520, 660, C.dim, cq, 16);
    const px = 1060, py = 770, pw = 700, ph = 400, xS = x => px + x / 10 * pw, yS = v => py - (v - 0.6) / 0.95 * ph, ts = V104.born_t;
    plotAxes(px, py, pw, ph, cq, 't (ten calls)', '|a|^β + |b|^β along the block motion');
    [['1,1', C.cyan, 'β = 1'], ['2,1', C.gold, 'β = 2'], ['3,1', C.mag, 'β = 3']].forEach(([key, col, l], i) => { const qq = clamp(cq * 1.6 - i * 0.2); pl104(ts, V104.born[key], xS, yS, col, qq, key === '2,1' ? 4 : 3); lblG(l, px + pw + 10, yS(V104.born[key][V104.born[key].length - 1]) + 6, col, qq, 17, 'left'); });
    [0, 5].forEach(x => lbl(String(x), xS(x), py + 26, C.dim, cq, 15));
    const sq = Q(S, 1, 'probability is amplitude squared', 0.6);
    stamp('Π_q = |z_q|² / ‖z‖²', 520, 760, sq, C.green, 36, -0.04);
  }
};

/* ---- 07 SQUARED RESIDUALS (V49 §10, §11) ---- */
SCENES.residual = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So two is the degree of the weight', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With a positive contraction below q', 0.6) * f1;
    chipG(W / 2, 250, 1500, 58, '0 ⪯ T ⪯ qI , q < 1 :   U = [[√(I − T), −√T], [√T, √(I − T)]]  is unitary on H ⊕ H', C.gold, q, 21);
    const cq = Q(S, 0, 'into a released part and a smaller remainder', 0.6) * f1;
    for (let j = 0; j < 4; j++) { const qq = clamp(cq * 1.6 - j * 0.25), x = 190 + j * 190; cell104(x, 330, 120, 56, 'h' + '₀₁₂₃'[j], C.cyan, qq, 22); arrow(x + 60, 390, x + 60, 470, C.gold, qq, 2.5); cell104(x, 476, 120, 56, 'd' + '₀₁₂₃'[j], C.gold, qq, 22); if (j < 3) arrow(x + 124, 358, x + 186, 358, C.cyan, qq, 2.5); }
    lblG('U (h_j , 0) = (d_j , h_(j+1)) ,   d_j = √(I − T) h_j ,  h_(j+1) = √T h_j', 530, 580, C.white, cq, 18);
    const nq = Q(S, 0, 'Squared norms add exactly per layer', 0.6) * f1;
    const px = 1060, py = 770, pw = 700, ph = 400, bw = 46;
    plotAxes(px, py, pw, ph, nq, 'layer j', 'squared norms ,  ‖h₀‖² = 1');
    V104.res_d.forEach((d, j) => { const qq = clamp(nq * 1.6 - j * 0.1), x = px + 18 + j * 66, h1 = V104.res_h[j + 1]; fillBox(x, py - d * ph, bw, d * ph, C.gold, qq * 0.5); rect63(x, py - d * ph, bw, d * ph, C.gold, qq, 1.4); fillBox(x, py - (d + h1) * ph, bw, h1 * ph, C.cyan, qq * 0.35); rect63(x, py - (d + h1) * ph, bw, h1 * ph, C.cyan, qq, 1.4); lbl(String(j), x + bw / 2, py + 24, C.dim, qq, 14); });
    lbl('gold ‖d_j‖² + cyan ‖h_(j+1)‖² = ‖h_j‖²', px + pw / 2 + 60, py - ph + 10, C.white, nq, 15);
    const lq = Q(S, 0, 'and n plus one layers leave at most', 0.6) * f1;
    curve(p => { const j = p * 9.5; return [px + 18 + j * 66 + bw / 2, py - Math.pow(V104.res_q, j + 1) * ph]; }, 60, C.red, lq, 2.5);
    lblG('q^(j+1) , q = 0.7', px + 330, py - 0.25 * ph, C.red, lq, 17, 'left');
    chipG(530, 690, 860, 58, '‖h₀‖² = Σ_(j ≤ n) ‖d_j‖² + ‖h_(n+1)‖² ,   ‖h_(n+1)‖² ≤ q^(n+1) ‖h₀‖²', C.cyan, lq, 20);
    lbl('the whole system keeps its norm ; only the named remainder shrinks', 530, 750, C.dim, lq, 15);
  }
  const q1 = Q(S, 1, 'So two is the degree of the weight', 0.6, 0.3);
  if (q1 > 0) {
    chipG(380, 260, 520, 62, 'exponent 2 = degree of the weight', C.gold, q1, 22);
    chipG(980, 260, 520, 62, 'n + 1 = depth of the recursion', C.cyan, Q(S, 1, 'n plus one the depth', 0.6), 22);
    const zq = Q(S, 1, 'Squaring amplitudes n to the minus a', 0.6);
    chipG(530, 360, 880, 56, 'χ_a = Σ_n n^(−a) |n⟩ / √ζ(2a) ,   W_t |n⟩ = n^(−it) |n⟩ ,   a > ½', C.white, zq, 20);
    const gq = Q(S, 1, 'likewise gives zeta of two a', 0.6);
    chipG(530, 450, 880, 62, '⟨χ_a , W_t χ_a⟩ = ζ(2a + it) / ζ(2a)', C.mag, gq, 26);
    lblG('exponent a → 2a ;  carrier ℓ²(ℕ) unchanged', 530, 530, C.white, Q(S, 1, 'in the same space', 0.6), 20);
    lbl('reading ζ(a + it) itself needs another readout ; no measurement on the critical strip is claimed', 530, 580, C.dim, Q(S, 1, 'in the same space', 0.6), 14);
    const px = 1060, py = 770, pw = 700, ph = 360, xS = x => px + x / 30 * pw, yS = v => py - v * ph, ts = V104.zeta.map((_, i) => i * 0.25);
    plotAxes(px, py, pw, ph, gq, 't', '|ζ(2 + it) / ζ(2)|   ( a = 1 )');
    pl104(ts, V104.zeta, xS, yS, C.mag, gq, 3, 1 + clamp((u - lineAt(S, 1).s - 4) / 5) * 120);
    dashed(px, yS(1), px + pw, yS(1), C.dim, gq, 1.2); lbl('1', px - 14, yS(1) + 6, C.dim, gq, 14, 'right');
    [0, 10, 20].forEach(x => lbl(String(x), xS(x), py + 26, C.dim, gq, 15));
  }
};

/* ---- 08 BINARY ATLAS (V50 §4) ---- */
const TN104 = [[520, 330], [330, 470], [710, 470], [810, 610]];
const TL104 = [[230, 610], [430, 610], [610, 610], [720, 750], [900, 750]];
const TE104 = [[0, 1, 0, 'l'], [0, 2, 0, 'r'], [1, -1, 1, 'l', 0], [1, -1, 1, 'r', 1], [2, -1, 2, 'l', 2], [2, 3, 2, 'r'], [3, -1, 3, 'l', 3], [3, -1, 3, 'r', 4]];
function tree104(a, o = {}) {
  if (a <= 0) return;
  TE104.forEach(e => { const A = TN104[e[0]], B = e[1] >= 0 ? TN104[e[1]] : TL104[e[4]], hl = o.path && o.path.includes(e[0] + e[3]); line(A[0], A[1], B[0], B[1], hl ? C.gold : C.cyan, a * (hl ? 1 : 0.55), hl ? 4 : 2); const th = TH104[e[2]], s = e[3] === 'l' ? th : 1 - th; lblG(s.toFixed(2), (A[0] + B[0]) / 2 + (e[3] === 'l' ? -24 : 24), (A[1] + B[1]) / 2, hl ? C.gold : C.dim, a * (o.ratios == null ? 1 : o.ratios), 14, e[3] === 'l' ? 'right' : 'left'); });
  TN104.forEach((p, i) => { const sa = a * (o.nodes == null ? 1 : o.nodes), th = TH104[i]; sph104(p[0], p[1], 34, sa, C.cyan); const P = bp104(p[0], p[1], 34, [2 * Math.sqrt(th * (1 - th)), 0, 2 * th - 1]); dot(P[0], P[1], 8, 'g', sa); });
  TL104.forEach((p, i) => { chipG(p[0], p[1], 92, 44, V104.tree_p[i].toFixed(2), o.leafHl === i ? C.gold : C.white, a, 19); });
  if (o.root) { chipG(520, 260, 150, 44, 'S = 7.3', C.green, a * o.root, 19); }
}
SCENES.atlas = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const tq = Q(S, 0, 'On a binary tree', 0.6);
  const pq = Q(S, 0, 'leaves are products along paths', 0.6), rq = Q(S, 0, 'one root mass restores the scale', 0.6);
  tree104(tq, { nodes: Q(S, 0, 'k minus one split ratios', 0.6), ratios: Q(S, 0, 'k minus one split ratios', 0.6), path: pq > 0 && Q(S, 1, 'Recursion never doubles the exponent', 0.6) < 1 ? ['0r', '2r', '3l'] : null, leafHl: pq > 0 ? 3 : -1, root: rq });
  const f1 = 1 - Q(S, 1, 'Recursion never doubles the exponent', 0.6);
  if (f1 > 0) {
    chipG(1400, 270, 760, 58, 'k positive p_i  ↔  k − 1 ratios ϑ_v ∈ (0, 1)', C.gold, Q(S, 0, 'k positive probabilities correspond exactly', 0.6) * f1, 22);
    const mq = Q(S, 0, 'points on a half meridian', 0.6) * f1;
    sph104(1250, 470, 100, mq, C.cyan, true);
    curve(p => { const an = -Math.PI / 2 + p * Math.PI, P = bp104(1250, 470, 100, [Math.cos(an) * 0 + Math.sin(p * Math.PI), 0, -Math.cos(p * Math.PI)]); return P; }, 40, C.gold, mq, 3);
    const P0 = bp104(1250, 470, 100, [2 * Math.sqrt(TH104[0] * (1 - TH104[0])), 0, 2 * TH104[0] - 1]); dot(P0[0], P0[1], 11, 'g', mq);
    lblG('r(ϑ) = (2√(ϑ(1 − ϑ)) , 0 , 2ϑ − 1)', 1560, 450, C.white, mq, 19);
    lblG('y = 0 , x ≥ 0 : one free parameter', 1560, 485, C.dim, mq, 16);
    chipG(1400, 640, 760, 56, 'p₄ = (1 − 0.65)(1 − 0.57)(0.67) = 0.10', C.gold, pq * f1, 21);
    lblG('p_i = product of ϑ_v or 1 − ϑ_v along the path', 1400, 700, C.dim, pq * f1, 17);
    chipG(1400, 770, 760, 56, 'root mass S :  S·p recovered exactly', C.green, rq * f1, 21);
  }
  const q1 = Q(S, 1, 'Recursion never doubles the exponent', 0.6, 0.3);
  if (q1 > 0) {
    const aq = Q(S, 1, 'a leaf amplitude squared is the product', 0.6);
    chipG(1400, 270, 760, 58, '|A_i|² = Π_(e ∈ i) |c_e|² ,   Σ_i |A_i|² = 1', C.gold, aq, 22);
    lblG('log |A_i|² = 2 Σ_(e ∈ i) log |c_e|', 1400, 345, C.white, aq, 22);
    stamp('EXPONENT 2 AT EVERY DEPTH', 1400, 430, Q(S, 1, 'at any depth', 0.5), C.gold, 28, -0.04);
    lbl('squaring the probabilities again is a different update', 1400, 485, C.dim, Q(S, 1, 'at any depth', 0.5), 15);
    const oq = Q(S, 1, 'the three axes become operators', 0.6);
    chipG(1400, 570, 760, 58, 'M = ½ ( I⊗S + σx⊗X + σy⊗Y + σz⊗Z )', C.cyan, oq, 22);
    lblG('S = A + B , Z = A − B , X = C + C† , Y = i(C − C†)', 1400, 635, C.white, oq, 18);
    const bq = Q(S, 1, 'joined by coherence blocks', 0.6);
    lblG('off-diagonal blocks C carry the coherence between nodes', 1400, 690, C.mag, bq, 17);
    lbl('three scalar expectations alone usually lose information', 1400, 730, C.dim, bq, 15);
  }
};

/* ---- 09 K-BONACCI MEMORY (V50 §5, §6) ---- */
SCENES.kbonacci = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [0, 'Yet predicting', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Normalised, the history shape updates', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Binary words of length n', 0.6) * f1;
    chipG(W / 2, 250, 1400, 58, 'G_n^(k) = number of binary words of length n with no k consecutive ones', C.gold, q, 21);
    const gq = Q(S, 0, 'number two to the n while n is below k', 0.6) * f1, sq = Q(S, 0, 'then each count sums the previous k', 0.6) * f1;
    const tx = 210, ty = 320, cw = 66, chh = 50;
    for (let n = 0; n <= 10; n++) lbl(String(n), tx + 70 + n * cw + cw / 2, ty - 10, C.dim, q, 15);
    lbl('n →', tx + 30, ty - 10, C.dim, q, 15);
    ['2', '3', '4', '5'].forEach((k, r) => { lblG('k = ' + k, tx + 34, ty + r * (chh + 8) + 32, C.white, q, 17); V104.counts[k].forEach((v, n) => { const small = n < +k, a2 = small ? gq : sq; cell104(tx + 70 + n * cw, ty + r * (chh + 8), cw - 6, chh, String(v), small ? C.gold : C.cyan, a2 * clamp(q * 3), v > 99 ? 15 : 17); }); });
    const ex = sq; const y3 = ty + 1 * (chh + 8);
    rect63(tx + 70 + 2 * cw - 3, y3 - 3, 3 * cw, chh + 6, C.mag, ex, 2.5); arrow(tx + 70 + 5 * cw - 10, y3 + chh + 14, tx + 70 + 5 * cw + 20, y3 + chh - 4, C.mag, ex, 2);
    lblG('k = 3 :  24 = 13 + 7 + 4', tx + 70 + 5 * cw, ty + 4 * (chh + 8) + 30, C.mag, ex, 18);
    lbl('LEAN · D5/S0/Tower/DBonacci/Names · dbonacci_name_card', 530, 640, C.green, gq, 15);
    lbl('k = 2 : G_n = F_(n+2)', 530, 670, C.dim, gq, 15);
    const hq = Q(S, 0, "Yet predicting every future's legality", 0.6) * f1;
    const k = 4, hx = 1230, hy = 340, hc = 64;
    for (let s = 0; s < k; s++) { lblG('u' + '₀₁₂₃'[s], hx - 30, hy + s * hc + hc / 2 + 6, C.dim, hq, 17, 'right'); lblG('v' + '₀₁₂₃'[s], hx + s * hc + hc / 2, hy - 14, C.dim, hq, 17); for (let j = 0; j < k; j++) cell104(hx + j * hc, hy + s * hc, hc - 6, hc - 6, s + j < k ? '1' : '0', s + j < k ? C.cyan : C.dim, hq, 20, s + j < k ? 0.35 : 0.1); }
    lblG('H_sj = [ s + j < k ] , u_s = 0^(B−s) 1^s , v_j = 1^j 0^(B−j)', 1360, 640, C.white, hq, 17);
    const mq = Q(S, 0, 'needs linear memory of exactly k', 0.6) * f1;
    chipG(1360, 700, 700, 56, 'legality Hankel rank = k over every field', C.mag, mq, 21);
    lbl('recomputed : k = 2, 3, 4, 5 → rank ' + ['2', '3', '4', '5'].map(x => V104.hankel[x]).join(', ') + '  (over ℚ and GF(2))', 1360, 760, C.dim, mq, 15);
  }
  const q1 = Q(S, 1, 'Normalised, the history shape updates', 0.6, 0.3);
  if (q1 > 0) {
    chipG(W / 2, 250, 1450, 58, 'F_k(p) = (1, p₁, …, p_(k−1)) / (2 − p_k) ,     S_(t+1) = S_t (2 − p_k)', C.gold, q1, 22);
    const sq = Q(S, 1, 'the scale multiplies by that denominator', 0.6);
    const vx = 200, vy = 330;
    ['p₁', 'p₂', '…', 'p_k'].forEach((l, i) => cell104(vx + i * 90, vy, 80, 52, l, i === 3 ? C.mag : C.cyan, q1, 19));
    arrow(vx + 370, vy + 26, vx + 430, vy + 26, C.gold, q1, 2.5);
    ['1', 'p₁', '…', 'p_(k−1)'].forEach((l, i) => cell104(vx + 440 + i * 90, vy, 80, 52, l, i === 0 ? C.gold : C.cyan, q1, i === 3 ? 15 : 19));
    lblG('÷ (2 − p_k)', vx + 610, vy + 90, C.gold, q1, 19);
    lblG('S_(t+1) / S_t = 2 − p_k → λ_k', 530, 470, C.white, sq, 20);
    lbl('dropping the scale S loses the recursion ; keeping S keeps it exactly', 530, 510, C.dim, sq, 15);
    const tq = Q(S, 1, 'From any start', 0.6);
    chipG(530, 590, 880, 56, 'TV(F_k p , F_k q) ≤ TV(p, q) / (2 − min(p_k, q_k))', C.cyan, tq, 22);
    lbl('every p , q in the closed simplex , boundary included', 530, 640, C.dim, tq, 15);
    lblG('2 − p*_k = λ_k  ⇒  TV(F_k^t p₀ , p*) ≤ λ_k^(−t) TV(p₀ , p*)', 530, 690, C.white, tq, 17);
    lblG('noise ε per step :  limsup TV ≤ ε / (1 − 1/λ_k) ≤ φ² ε', 530, 735, C.dim, tq, 17);
    const cq = Q(S, 1, 'From any start', 0.6);
    const px = 1060, py = 770, pw = 700, ph = 420, xS = x => px + x / 15 * pw, yS = v => py - (Math.log10(v) + 6) / 6 * ph;
    plotAxes(px, py, pw, ph, cq, 't', 'TV(F_k^t p₀ , p*) , log scale , start at a vertex');
    [['3', C.gold], ['6', C.cyan]].forEach(([k, col], i) => { const qq = clamp(cq * 1.6 - i * 0.25), d = V104.conv[k], ts = d.err.map((_, j) => j); pl104(ts, d.err, xS, yS, col, qq, 3); ts.forEach(j => dot(xS(j), yS(d.err[j]), 6, k === '3' ? 'g' : 'c', qq)); ctx.save(); ctx.setLineDash([8, 7]); pl104(ts, d.bound, xS, yS, col, qq * 0.8, 1.8); ctx.restore(); lblG('k = ' + k, px + pw + 8, yS(d.err[15]) + 6, col, qq, 17, 'left'); });
    lbl('dashed : λ_k^(−t) TV₀', px + 20, py - 30, C.dim, cq, 15, 'left');
    [0, 5, 10, 15].forEach(x => lbl(String(x), xS(x), py + 26, C.dim, cq, 15));
    ['1', '10⁻³', '10⁻⁶'].forEach((l, i) => lbl(l, px - 12, yS(Math.pow(10, -3 * i)) + 5, C.dim, cq, 14, 'right'));
  }
};

/* ---- 10 GROWTH ROOTS (V50 §7) ---- */
SCENES.limit = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [0, 'The fixed point has weights', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Its distance to the halving law', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The growth root lambda two is the golden ratio', 0.6) * f1;
    const px = 170, py = 770, pw = 760, ph = 460, ks = V104.lam.map((_, i) => i + 2), xS = k => px + (k - 2) / 10 * pw, yS = v => py - (v - 1.5) / 0.55 * ph;
    plotAxes(px, py, pw, ph, q, 'k', 'λ_k :  Σ_(j ≤ k) λ^(−j) = 1');
    const mq = Q(S, 0, 'lambda k strictly increases', 0.6) * f1;
    ks.forEach((k, i) => { const qq = i === 0 ? q : clamp(mq * 1.6 - i * 0.08); dot(xS(k), yS(V104.lam[i]), 9, i === 0 ? 'g' : 'c', qq); lbl(String(k), xS(k), py + 26, C.dim, qq, 14); });
    pl104(ks, V104.lam, xS, yS, C.cyan, mq, 2);
    lblG('λ₂ = φ = 1.618', xS(2) + 18, yS(V104.lam[0]) + 6, C.gold, q, 19, 'left');
    lblG('λ₃ = 1.839 , λ₄ = 1.928', xS(3) + 22, yS(V104.lam[1]) + 30, C.white, mq, 16, 'left');
    const tq = Q(S, 0, 'lambda k tends to two', 0.6) * f1;
    dashed(px, yS(2), px + pw, yS(2), C.gold, tq, 2); lbl('2', px - 14, yS(2) + 6, C.gold, tq, 16, 'right');
    lblG('λ_k ↑ 2', xS(7), yS(2) - 40, C.gold, tq, 20);
    const gq = Q(S, 0, 'two minus lambda k equals', 0.6) * f1;
    chipG(1400, 300, 720, 60, '2 − λ_k = λ_k^(−k)', C.gold, gq, 26);
    lbl('LEAN · D5/S0/Tower/DBonacci/PerronRoot', 1400, 380, C.green, q, 16);
    lbl('dbonacciPerronRoot_two_eq_goldenRatio · _strictMonoOn', 1400, 410, C.green, q, 14);
    lbl('two_sub_dbonacciPerronRoot_eq_inv_pow · _tendsto_two', 1400, 436, C.green, q, 14);
    const fq = Q(S, 0, 'The fixed point has weights', 0.6) * f1;
    chipG(1400, 540, 720, 58, 'p*_j = λ_k^(−j) ,   F_k(p*) = p* ,   M_k p* = λ_k p*', C.cyan, fq, 21);
    lblG('k = 2 :  p* = (φ^(−1) , φ^(−2)) , the golden split', 1400, 600, C.white, fq, 18);
    lbl('M_k has spectral radius λ_k > 1 : it is never unitary', 1400, 650, C.dim, fq, 15);
  }
  const q1 = Q(S, 1, 'Its distance to the halving law', 0.6, 0.3);
  if (q1 > 0) {
    const bx = 170, by = 640, bw = 36, hs = 600;
    plotAxes(bx - 20, by, 800, 340, q1, 'j', 'k = 4 :  p*_j  versus  2^(−j)');
    for (let j = 1; j <= 8; j++) { const x = bx + (j - 1) * 96, g = V104.geom[j - 1], p = j <= 4 ? V104.pstar4[j - 1] : 0; fillBox(x, by - g * hs, bw, g * hs, C.cyan, q1 * 0.35); rect63(x, by - g * hs, bw, g * hs, C.cyan, q1, 1.4); if (p > 0) { fillBox(x + bw + 4, by - p * hs, bw, p * hs, C.gold, q1 * 0.5); rect63(x + bw + 4, by - p * hs, bw, p * hs, C.gold, q1, 1.4); } lbl(String(j), x + bw, by + 24, C.dim, q1, 14); }
    lbl('cyan 2^(−j)  ·  gold λ₄^(−j)', bx + 380, by - 320, C.white, q1, 15);
    const eq = Q(S, 1, 'is exactly two to the minus k', 0.6);
    lblG('excess on j ≤ k : 2^(−k) ;  missing tail : 2^(−k)', bx + 380, by + 70, C.white, eq, 18);
    chipG(530, 770, 760, 58, 'TV( p*(k) , 2^(−j) ) = 2^(−k)  exactly', C.gold, eq, 24);
    const px = 1060, py = 580, pw = 700, ph = 300, xS = k => px + (k - 2) / 13 * pw, yS = v => py - ph + (-Math.log2(v) - 2) / 13 * ph;
    plotAxes(px, py, pw, ph, eq, 'k', 'TV(p*(k) , halving law) , log scale');
    curve(p => { const k = 2 + p * 13; return [xS(k), yS(Math.pow(2, -k))]; }, 40, C.gold, eq * 0.7, 1.8);
    V104.tvg.forEach((v, i) => { const k = i + 2, qq = clamp(eq * 1.6 - i * 0.06); dot(xS(k), yS(v), 8, 'g', qq); });
    lbl('dots : recomputed TV ;  line : 2^(−k)', px + pw - 10, py - ph + 10, C.dim, eq, 15, 'right');
    [2, 6, 10, 15].forEach(k => lbl(String(k), xS(k), py + 26, C.dim, eq, 14));
    [['1/4', 2], ['2^(−15)', 15]].forEach(([l, k]) => lbl(l, px - 12, yS(Math.pow(2, -k)) + 5, C.dim, eq, 13, 'right'));
    const jq = Q(S, 1, 'so after t steps every start', 0.6);
    chipG(1400, 690, 760, 58, 'TV( F_k^t p₀ , 2^(−j) ) ≤ φ^(−t) + 2^(−k)', C.cyan, jq, 23);
    lbl('every start , every order : t → ∞ and k → ∞ together give the halving law', 1400, 750, C.dim, jq, 15);
  }
};

/* ---- 11 WINDOWS AND LIMITS (V50 §8, App. A) ---- */
SCENES.window = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'A frozen bound keeps the gap', 'lean']]);
  const f1 = 1 - Q(S, 1, 'In between, n over two to the k decides', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'once k exceeds n every word is legal', 0.6) * f1;
    lbl('window n = 6', 530, 270, C.dim, q, 18);
    const words = ['010011', '110110', '011101', '111111'];
    words.forEach((w, r) => { for (let i = 0; i < 6; i++) cell104(250 + i * 70, 300 + r * 66, 60, 56, w[i], w[i] === '1' ? C.gold : C.cyan, q, 22); });
    chipG(530, 600, 760, 56, 'k = 7 > n :  all 2⁶ = 64 words legal', C.green, q, 22);
    const xq = Q(S, 0, 'the all-ones word is still out', 0.6) * f1;
    line(240, 300 + 3 * 66 + 28, 670, 300 + 3 * 66 + 28, C.red, xq, 4);
    chipG(530, 680, 760, 56, 'k = 6 = n :  111111 excluded , 63 words', C.red, xq, 22);
    const nq = Q(S, 0, 'fixed n gives one', 0.6) * f1, kq = Q(S, 0, 'fixed k gives zero', 0.6) * f1;
    const px = 1060, py = 470, pw = 680, ph = 190;
    plotAxes(px, py, pw, ph, nq, 'k (n = 12)', 'P_12,k');
    const ks = V104.fixn.map((_, i) => i + 2), xS = k => px + (k - 2) / 13 * pw, yS = v => py - v * ph;
    pl104(ks, V104.fixn, xS, yS, C.gold, nq, 3); ks.forEach((k, i) => dot(xS(k), yS(V104.fixn[i]), 6, 'g', nq));
    lblG('→ 1', px + pw + 10, yS(1) + 6, C.gold, nq, 18, 'left');
    const qy = 770, ns = V104.fixk.map((_, i) => 4 + 4 * i), xS2 = n => px + (n - 4) / 116 * pw, yS2 = v => qy - v * ph;
    plotAxes(px, qy, pw, ph, kq, 'n (k = 4)', 'P_n,4');
    pl104(ns, V104.fixk, xS2, yS2, C.cyan, kq, 3); ns.forEach((n, i) => dot(xS2(n), yS2(V104.fixk[i]), 5, 'c', kq));
    lblG('→ 0', px + pw + 10, yS2(0.02) + 6, C.cyan, kq, 18, 'left');
    chipG(530, 770, 760, 56, 'lim_n lim_k P = 1   ≠   lim_k lim_n P = 0', C.mag, Q(S, 0, 'And the limits do not commute', 0.6) * f1, 22);
  }
  const q1 = Q(S, 1, 'In between, n over two to the k decides', 0.6, 0.3);
  if (q1 > 0) {
    const rows = [['n 2^(−k) → 0', 'P → 1', C.green], ['n 2^(−k) → τ', 'P → e^(−τ/2)', C.gold], ['n 2^(−k) → ∞', 'P → 0', C.cyan]];
    rows.forEach(([a1, a2, col], i) => { const qq = clamp(q1 * 1.6 - i * 0.2); cell104(170, 280 + i * 70, 330, 56, a1, col, qq, 21); cell104(510, 280 + i * 70, 330, 56, a2, col, qq, 21); });
    const cq = Q(S, 1, 'at limit tau', 0.6);
    const px = 170, py = 770, pw = 700, ph = 260, ks = V104.crit.map((_, i) => i + 4), xS = k => px + (k - 4) / 14 * pw, yS = v => py - (v - 0.595) / 0.02 * ph;
    plotAxes(px, py, pw, ph, cq, 'k , with n = 2^k (τ = 1)', 'P_n,k');
    dashed(px, yS(Math.exp(-0.5)), px + pw, yS(Math.exp(-0.5)), C.gold, cq, 2); lblG('e^(−1/2) = 0.6065', px + pw - 6, yS(Math.exp(-0.5)) - 12, C.gold, cq, 17, 'right');
    pl104(ks, V104.crit, xS, yS, C.cyan, cq, 3); ks.forEach((k, i) => dot(xS(k), yS(V104.crit[i]), 6, 'c', cq));
    [4, 8, 12].forEach(k => lbl(String(k), xS(k), py + 26, C.dim, cq, 15));
    const lq = Q(S, 1, 'A frozen bound keeps the gap', 0.6);
    box(1010, 280, 790, 330, C.green, lq, 2, 'rgba(0,40,20,0.35)');
    lblG('| P_n,k − e^(−μ) | ≤ min(1, μ) (k + 1) 2^(−k)', 1405, 345, C.white, lq, 24);
    lblG('μ = (n − k + 2) / 2^(k+1) ,   n ≥ k ≥ 2', 1405, 400, C.green, lq, 21);
    lblG('also  1 − P ≤ μ   and   P ≤ 1/μ', 1405, 450, C.white, lq, 19);
    lbl('LEAN · D5/S1/Words/ClosedRunPoisson', 1405, 520, C.green, lq, 16);
    lbl('closed_word_poisson_bounds  ·  P = dbonacci k (n + 2) / 2^n', 1405, 552, C.green, lq, 14);
    lbl('recomputed : the bound holds for k < 14 , n < 3000 (sampled)', 1405, 660, C.dim, lq, 15);
    lbl('the 1/2 in e^(−τ/2) : a new run starts with a zero , probability 2^(−(k+1))', 1405, 700, C.dim, cq, 15);
  }
};

/* ---- 12 AVERAGED SPINS (V50 §9) ---- */
SCENES.spin = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Inside, readings hide more', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Averaging m symmetric spins', 0.6) * f1;
    chipG(W / 2, 250, 1300, 58, 'X_i = (1/m) Σ_a σ_i^(a)   on   Sym^m(ℂ²) ,  D = m + 1', C.gold, q, 22);
    chipG(530, 345, 820, 56, '[X_i , X_j] = (2i/m) ε_ijk X_k', C.cyan, Q(S, 0, 'commutators shrink as two over m', 0.6) * f1, 23);
    chipG(530, 425, 820, 56, 'X₁² + X₂² + X₃² = (1 + 2/m) I', C.cyan, Q(S, 0, 'the squares sum to one plus two over m', 0.6) * f1, 23);
    const vq = Q(S, 0, 'the minimal total variance is two over m', 0.6) * f1;
    chipG(530, 505, 820, 56, 'Σ Var(X_i) = 1 + 2/m − ‖r‖²  ≥  2/m', C.gold, vq, 23);
    lbl('on the symmetric subspace : F_ab = I gives Σ σ_i^(a) σ_i^(b) = I', 530, 560, C.dim, vq, 15);
    const cq = Q(S, 0, 'reached by coherent states', 0.6) * f1;
    const px = 1060, py = 770, pw = 680, ph = 400, ms = V104.spin.map(r => r[0]), xS = m => px + (m - 0.6) / 6 * pw, yS = v => py - v / 2.2 * ph;
    plotAxes(px, py, pw, ph, vq, 'm', 'minimal total variance  and  ‖[X_x , X_y]‖');
    curve(p => { const m = 0.9 + p * 5.4; return [xS(m), yS(2 / m)]; }, 60, C.dim, vq * 0.6, 1.5);
    V104.spin.forEach((r, i) => { dot(xS(r[0]) - 7, yS(r[1]), 9, 'g', vq); dot(xS(r[0]) + 7, yS(r[2]), 7, 'c', cq); lbl(String(r[0]), xS(r[0]), py + 26, C.dim, vq, 15); });
    lblG('gold : 2/m , attained by |ψ⟩^⊗m', px + pw - 10, py - ph + 30, C.gold, cq, 16, 'right');
    lblG('cyan : ‖[X_x , X_y]‖ = 2/m', px + pw - 10, py - ph + 60, C.cyan, cq, 16, 'right');
    stamp('‖r‖ ≤ 1 FOR EVERY m', 530, 680, Q(S, 0, 'The axes still have length at most one', 0.6) * f1, C.mag, 30, -0.04);
    lbl('r = 0 at every m keeps the total variance near 1', 530, 760, C.dim, Q(S, 0, 'The axes still have length at most one', 0.6) * f1, 15);
  }
  const q1 = Q(S, 1, 'Inside, readings hide more', 0.6, 0.3);
  if (q1 > 0) {
    const fq = Q(S, 1, 'form a fibre of dimension', 0.6);
    const bx = 200, by = 750, hs = 7;
    plotAxes(bx - 30, by, 720, 380, fq, 'm', 'fibre dimension over a point with ‖r‖ < 1');
    V104.spin.forEach((r, i) => { const qq = clamp(fq * 1.6 - i * 0.15), x = bx + i * 110, h = r[3] * hs; if (h > 0) { fillBox(x, by - h, 70, h, C.vio, qq * 0.5); rect63(x, by - h, 70, h, C.vio, qq, 1.6); } lblG(String(r[3]), x + 35, by - h - 14, C.white, qq, 20); lbl(String(r[0]), x + 35, by + 26, C.dim, qq, 15); });
    chipG(530, 270, 760, 56, 'D² − 4 = m² + 2m − 3', C.vio, fq, 24);
    lbl('boundary ‖r‖ = 1 : the fibre is one coherent state', 530, 812, C.dim, fq, 15);
    const sq = Q(S, 1, 'two orthogonal states both read zero', 0.6);
    const cx = 1400;
    chipG(cx - 190, 340, 340, 64, '|Ψ⁺⟩ = (|01⟩ + |10⟩)/√2', C.cyan, sq, 19);
    chipG(cx + 190, 340, 340, 64, '|Φ⁺⟩ = (|00⟩ + |11⟩)/√2', C.gold, sq, 19);
    lblG('r = (0, 0, 0)', cx - 190, 410, C.cyan, sq, 20); lblG('r = (0, 0, 0)', cx + 190, 410, C.gold, sq, 20);
    sph104(cx, 560, 110, sq, C.cyan, true); dot(cx - 6, 560, 12, 'c', sq); dot(cx + 6, 560, 12, 'g', sq);
    lbl('⟨Ψ⁺ | Φ⁺⟩ = 0', cx, 720, C.white, sq, 18);
    const zq = Q(S, 1, 'with z-squared averages zero and one', 0.6);
    chipG(cx - 190, 780, 340, 56, '⟨X_z²⟩ = 0', C.cyan, zq, 22); chipG(cx + 190, 780, 340, 56, '⟨X_z²⟩ = 1', C.gold, zq, 22);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'lean'], [1, 'the Bloch ball and Pauli algebra are classical tools', 'classical'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['SQUARE', '2^(β/2) = 2 · w = r²', C.gold, 'Merging and reciprocity pick the square'], ['CLOSURE', 'I₃ = 0 · a², √2ab, b²', C.cyan, 'closure and cross features complete it'], ['NATIVE', 'Π = |z|² / ‖z‖²', C.green, 'a native single site selects it'], ['ATLAS', 'k − 1 binary nodes', C.mag, 'one binary atlas repeats it'], ['K-BONACCI', 'λ_k ↑ 2 · 2^(−k)', C.orange, 'K-bonacci roots, windows'], ['SPIN', '2/m · m² + 2m − 3', C.vio, 'averaged spins show which constraints fade']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 19); });
    lbl('LEAN · DBonacci/Names (word counts) · DBonacci/PerronRoot (λ₂ = φ , λ_k ↑ 2 , 2 − λ_k = λ_k^(−k)) · ClosedRunPoisson (Poisson bound)', W / 2, 470, C.green, Q(S, 1, 'are frozen in Lean') * fade, 15);
    lbl('CLASSICAL · Bloch ball and Pauli algebra · polarisation · Cauchy additive equation · binomial theorem · Cauchy–Schwarz and Bonferroni', W / 2, 515, '#8fbcff', Q(S, 1, 'the Bloch ball and Pauli algebra are classical tools') * fade, 15);
    lbl('VOLUMES · odds and merging · reciprocal positivity · bilinear closure · power features · native square law · residual recursion · atlas · TV contraction · 2^(−k) · spin fibre', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · 252 checks : 89 configurations · β = 2 spread 1e−14 · Hankel ranks · λ_k · TV = 2^(−k) · e^(−1/2) · Poisson bound · 2/m · m² + 2m − 3', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('THE LEAN THEOREMS ARE GENERAL PROJECT RESULTS , NOT DIGESTED FROM THESE TWO VOLUMES', W / 2, 690, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    sph104(W / 2, 360, 170, a * 0.9, C.cyan, true);
    for (let i = 0; i < 6; i++) { const th = t * 0.4 + i * TAU / 6, P = bp104(W / 2, 360, 170, [Math.cos(th), Math.sin(th), 0]); dot(P[0], P[1], 9, i % 2 ? 'c' : 'g', a * 0.8); }
    txt('AURIC V49–V50 · SQUARE LAW', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V49–V50 · 平方律、递归三轴与 K-bonacci 极限 · TRURETURING FILM 104', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Merging, reciprocity and conservation pick the square; one binary interface repeats.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V49–V50', select: 'TWO ROUTES TO THE SQUARE', closure: 'BILINEAR CLOSURE', powers: 'POWER FEATURES', bloch: 'THE BLOCH BALL', born: 'NATIVE SQUARE LAW', residual: 'SQUARED RESIDUALS', atlas: 'BINARY ATLAS', kbonacci: 'K-BONACCI MEMORY', limit: 'GROWTH ROOTS', window: 'WINDOWS AND LIMITS', spin: 'AVERAGED SPINS', finale: 'LEDGER' });

function poster104() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  sph104(470, 520, 300, 1, C.cyan, true);
  for (let i = 0; i < 8; i++) { const th = i * TAU / 8 + 0.3, P = bp104(470, 520, 300, [0.9 * Math.cos(th), 0.9 * Math.sin(th), 0.3]); dot(P[0], P[1], 13, i % 2 ? 'c' : 'g', 1); }
  const Pz = bp104(470, 520, 300, [0.55, 0.3, 0.75]); arrow(470, 520, Pz[0], Pz[1], C.gold, 1, 4); dot(Pz[0], Pz[1], 18, 'g', 1);
  txt('w(r) = r²  ·  2^(β/2) = 2', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('Π_q = |z_q|² / ‖z‖²', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('λ_k ↑ 2  ·  TV(p*, 2^(−j)) = 2^(−k)', 1320, 590, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V49–V50', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V49–V50 · SQUARE LAW', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('平 方 律 · 递 归 三 轴 · K-bonacci 极 限', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 104', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster104;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
