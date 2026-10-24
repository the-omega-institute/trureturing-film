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

/* ---- film 071: AURIC-Langlands III · acquisition, cover and critical domain ---- */
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
const _po71 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po71.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po71.set(key, off); }
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
const YS71 = [1.5, 2.2528, 3.6152, 3.2072, 5.6952, 8.3, 12.8152, 18.9368, 27.9176, 40.6096, 59.1, 86.9576, 131.8104, 209.9808, 357.1208, 317.3, 724.5208, 1364.6192, 2855.4024, 5815.8344, 11962.7, 24304.2504, 48982.5976] ;
const PHI71 = [1.1264, 1.113, 1.1006, 1.089, 1.0782, 1.0683, 1.0591, 1.0506, 1.0429, 1.0359, 1.0295, 1.0238, 1.0187, 1.0143, 1.0105, 1.0073, 1.0046, 1.0026, 1.0012, 1.0003, 1.0, 1.0003, 1.0012, 1.0026, 1.0046, 1.0073, 1.0105, 1.0143, 1.0187, 1.0238, 1.0295, 1.0359, 1.0429, 1.0506, 1.0591, 1.0683, 1.0782, 1.089, 1.1006, 1.113, 1.1264] ;
const G2_71 = [29.105, 4.103, 3.674, 3.674, 1.0, 1.0] ;
/* ---- film 071 helpers ---- */
const WORD71 = 'JMJMMM' + 'MMMMMMMM' + 'J' + 'MMMMMMM';
function ell71(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll71(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell71(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function sheets71(x0, y0, w, n, col, a, t, hl = -1, amp = 1) {
  if (a <= 0) return;
  for (let k = 0; k < n; k++) { const ph = k * 0.7; curve(p => [x0 + w * p, y0 - k * 14 + amp * 6 * Math.sin(p * 6.3 + ph + t * 0.3)], 40, k === hl ? C.gold : col, a * (k === hl ? 1 : 0.55), k === hl ? 3 : 1.3); }
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['what it costs to acquire a source', 'ACQUISITION', 'how many readings, at what price?', C.gold], ['which labels survive noise', 'LABELS', 'which worlds stay apart?', C.cyan], ['how one candidate is selected on a cover', 'SELECTION', 'one sheet out of eighteen', C.mag], ['how the critical Green domain is classified', 'CRITICAL DOMAIN', 'what the threshold cannot see', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 28); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 320, 58, 'seventeen readings', C.gold, rp, 22); chip(330, 445, 320, 58, 'one selected sheet', C.mag, rp, 22); chip(330, 530, 320, 58, 'critical domain', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('critical coupling', 1610, 410, C.cyan, rp, 22); lblG('g_c = π ρ det A λ₀ / r', 1610, 470, C.white, rp, 26);
  txt(scramble('AURIC–LANGLANDS III · COVER', rp, 471), W / 2, 760, { size: 66, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC–Langlands 第 三 部 · 取 得 、覆 盖 与 临 界 域', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 071 · AURIC_LANGLANDS_ACQUISITION_COVER_AND_CRITICAL_DOMAIN_THEORY', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 CLOCK ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Seventeen is optimal', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Each gate J or M advances a literal clock', 0.6) * f1;
    const wq = Q(S, 0, 'The word M to the eight, J, M to the seven', 3.0) * f1;
    const nshow = 6 + Math.floor(wq * 16);
    for (let i = 0; i < WORD71.length; i++) {
      const x = 130 + i * 72, y = 250, ch = WORD71[i], pre = i < 6, on = i < nshow;
      cell71(x, y, 60, 52, ch, pre ? C.dim : (ch === 'J' ? C.mag : C.cyan), q * (on ? 1 : 0.2), 22, pre ? 0.15 : 0.35);
    }
    lbl('prefix J M J M M M (clock 0 → 6)', 130 + 3 * 72, 335, C.dim, q, 16);
    lbl('M⁸ J M⁷ : 16 new gates , 17 readings', 130 + 14 * 72, 335, C.gold, wq, 18);
    const px = 140, py = 720, pw = 1560, ph = 220, xS = i => px + (i + 0.5) * 72, yS = v => py - Math.log10(v) / 5 * ph;
    plotAxes(px, py, pw, ph, q, 'clock t', 'log₁₀ y_t');
    for (let i = 0; i <= Math.min(nshow, 22); i++) { if (i > 0) line(xS(i - 1), yS(YS71[i - 1]), xS(i), yS(YS71[i]), C.cyan, q * 0.7, 2); dot(xS(i), yS(YS71[i]), 6, i <= 6 ? 'n' : 'c', q); }
    lbl('y_t = d + g(t) tr(Q_t P) ,  P = [[r, b], [r(1−r)/b, 1−r]]', px + pw / 2, py + 50, C.white, q, 18);
    const dq = Q(S, 0, 'the observation determinant is a power of five', 0.6) * f1;
    chip(1300, 395, 900, 64, 'det C(k, δ) = 5^(k(k+1)) (∏h!)⁴ (∏h!) > 0', C.gold, dq, 24);
    lbl('k = 3 , δ = 0 :  N = 17 ,  det = 5 062 500 000 000', 1300, 458, C.white, dq, 18);
    const gq = Q(S, 0, 'decodes a cubic gain, a constant drift', 0.6) * f1;
    lbl('decoded : drift d , gain g(t₀ + s) , and P = B_a / tr B_a', 440, 440, C.green, gq, 18);
  }
  const q = Q(S, 1, 'Seventeen is optimal', 0.6, 0.3);
  if (q > 0) {
    const cx = 450, cy = 470;
    fillEll71(cx, cy, 300, 200, C.vio, q * 0.08); ell71(cx, cy, 300, 200, C.vio, q, 2); lbl('Θ : open set of environments', cx, cy - 220, C.vio, q, 18);
    const lq = Q(S, 1, 'leaves a direction it never sees', 0.6);
    for (let k = -2; k <= 2; k++) line(cx - 280, cy + k * 60 - 70, cx + 280, cy + k * 60 + 70, C.dim, q * 0.6, 1.5);
    lbl('queries so far (fewer than d)', cx, cy + 250, C.dim, q, 17);
    dot(cx - 90, cy - 22, 11, 'c', lq); dot(cx + 90, cy + 22, 11, 'm', lq); arrow(cx - 80, cy - 20, cx + 80, cy + 20, C.gold, lq, 3);
    lbl('θ', cx - 110, cy - 40, C.cyan, lq, 22); lbl('θ + t h', cx + 130, cy + 50, C.mag, lq, 22); lbl('h ∈ common kernel', cx, cy + 70, C.gold, lq, 18);
    stamp('SAME RECORD', cx, cy - 120, lq, C.red, 32, -0.05);
    const nq = Q(S, 1, 'Normalising by the trace is stable', 0.6);
    chip(1350, 300, 760, 64, '‖P̂ − P‖ ≤ (2η/a)(1 + √2 ‖P‖) ,  |h| ≥ a', C.green, nq, 24);
    const sq = Q(S, 1, 'shrinking the gain makes different sources', 0.6);
    const px = 1000, py = 760, pw = 700, ph = 300, xS = i => px + i / 22 * pw;
    plotAxes(px, py, pw, ph, sq, 'clock t', 'reports of P₁ and P₂ with gain ε g₀');
    const ep = 1 - 0.85 * clamp((u - lineAt(S, 1).s - (lineAt(S, 1).e - lineAt(S, 1).s) * 0.7) / 4);
    [[0, C.cyan], [1, C.mag]].forEach(([k, col]) => curve(p => { const tt = p * 22; return [xS(tt), py - ph / 2 - ep * (k ? 0.8 : 1) * 110 * Math.sin(tt * 0.5 + k)]; }, 80, col, sq, 2.5));
    lbl('ε = ' + ep.toFixed(2) + ' → 0 : records merge, ‖P₁ − P₂‖ stays fixed', px + pw / 2, py + 40, C.red, sq, 17);
  }
};

/* ---- 03 LABELS ---- */
SCENES.labels = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'On a tiny rectangle of readings', 0.6);
  box(130, 230, 300, 210, C.dim, q, 1.5, 'rgba(0,0,0,0.4)'); rect63(250, 300, 60, 60, C.gold, q, 2); fillBox(250, 300, 60, 60, C.gold, q * 0.2);
  lbl('𝒬 = (p_c, v_c) ± 10⁻¹⁰', 280, 270, C.gold, q, 17); lbl('p_c = 7.27697979572462', 280, 395, C.dim, q, 15); lbl('v_c = 61.48668743716016', 280, 420, C.dim, q, 15);
  const wq = Q(S, 0, 'every actual subdomain holds exactly three worlds', 0.6);
  const x0 = 520, x1 = 1780, y1 = 330, xS = v => x0 + (v - 215) / 105 * (x1 - x0);
  line(x0, y1, x1, y1, C.dim, wq, 1.5);
  for (let v = 220; v <= 320; v += 20) { line(xS(v), y1 - 6, xS(v), y1 + 6, C.dim, wq, 1.2); lbl(String(v), xS(v), y1 + 30, C.dim, wq, 14); }
  const iv = [['W₁', 220.965, 220.971, C.cyan], ['W₃', 311.432, 311.632, C.mag], ['W₂', 315.408, 315.725, C.gold]];
  iv.forEach(([nm, a0, a1, col]) => { fillBox(xS(a0) - 3, y1 - 20, Math.max(6, xS(a1) - xS(a0)), 40, col, wq * 0.7); lbl(nm, (xS(a0) + xS(a1)) / 2, y1 - 32, col, wq, 20); });
  lbl('terminal J report a', (x0 + x1) / 2, y1 + 60, C.white, wq, 17);
  const tq = Q(S, 0, 'Two thresholds', 0.8);
  [[266.2015, '266.2015'], [313.52, '313.52']].forEach(([v, s]) => { dashed(xS(v), y1 - 70, xS(v), y1 + 40, C.green, tq, 2.5); lbl(s, xS(v), y1 - 80, C.green, tq, 18); });
  const zq = Q(S, 0, 'below one point eight eight eight', 0.8);
  const zx0 = 900, zx1 = 1700, zy = 560, zS = v => zx0 + (v - 310.5) / 6 * (zx1 - zx0);
  box(zx0 - 30, zy - 90, zx1 - zx0 + 60, 180, C.dim, zq, 1, 'rgba(0,0,0,0.4)'); lbl('zoom 310.5 – 316.5', zx0 + 80, zy - 62, C.dim, zq, 14);
  line(zx0, zy, zx1, zy, C.dim, zq, 1.5);
  fillBox(zS(311.432), zy - 18, zS(311.632) - zS(311.432), 36, C.mag, zq * 0.7); fillBox(zS(315.408), zy - 18, zS(315.725) - zS(315.408), 36, C.gold, zq * 0.7);
  dashed(zS(313.52), zy - 50, zS(313.52), zy + 30, C.green, zq, 2.5);
  arrow(zS(313.52), zy + 50, zS(311.632), zy + 50, C.green, zq, 2); arrow(zS(313.52), zy + 50, zS(315.408), zy + 50, C.green, zq, 2);
  lbl('1.888', (zS(311.632) + zS(313.52)) / 2, zy + 76, C.green, zq, 18); lbl('1.888', (zS(313.52) + zS(315.408)) / 2, zy + 76, C.green, zq, 18);
  chip(470, 560, 620, 60, '|â − a| < 1.888  ⇒  correct label', C.green, zq, 24);
  const sq = Q(S, 1, 'a fixed parameter needs exactly three predictive states', 0.6);
  [['W₁', C.cyan], ['W₃', C.mag], ['W₂', C.gold]].forEach(([s, col], i) => cell71(230 + i * 130, 700, 110, 70, s, col, sq, 26));
  lbl('three predictive states for a fixed (p, v)', 425, 810, C.white, sq, 18);
  stamp('NO J COLLISION IN 𝒬', 1300, 760, Q(S, 1, 'no pair of different worlds collides on J', 0.6), C.red, 34, -0.05);
};

/* ---- 04 SELECTION ---- */
SCENES.selection = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Choosing one candidate needs one root', 0.6);
  const q = Q(S, 0, 'the eighteen candidates form a finite étale algebra', 0.6);
  sheets71(160, 560, 760, 18, C.cyan, q, t, f1 < 1 ? 7 : -1);
  line(160, 640, 920, 640, C.white, q, 2); lbl('good base B = D(Δ) : disc Q invertible', 540, 680, C.white, q, 18);
  lbl('𝒜 = R[z]/(Q) , deg Q = 18 , basis 1, z, …, z¹⁷', 540, 300, C.cyan, q, 19);
  if (f1 > 0) {
    const cq = Q(S, 0, 'Its connection transports the trace reconstruction', 0.6) * f1;
    chip(1380, 300, 700, 62, '∇_i z = − Q_i(z) / Q′(z)', C.cyan, cq, 26);
    chip(1380, 390, 700, 62, '∂_i G = C_iᵀ G + G C_i', C.green, cq, 26);
    lbl('∂_i c + C_i c = G⁻¹(∂_i b − C_iᵀ b)', 1380, 455, C.dim, cq, 18);
    const hq = Q(S, 0, 'can be horizontal only when the cover splits completely', 0.6) * f1;
    chip(1380, 560, 700, 62, '∇z = 0  ⇒  𝒜 ≅ R¹⁸ (split)', C.gold, hq, 26);
    lbl('non-trivial monodromy rules out a horizontal primitive reading', 1380, 620, C.dim, hq, 16);
  }
  const q2 = Q(S, 1, 'Choosing one candidate needs one root', 0.6, 0.3);
  if (q2 > 0) {
    const iq = Q(S, 1, 'a Lagrange idempotent', 0.6);
    chip(1380, 280, 760, 62, 'e_t = q_t(z) / Q′(t) ,  q_t = Q / (T − t)', C.gold, iq, 24);
    lbl('e_t² = e_t ,  Tr e_t = 1 ,  χ(a) = Tr((a ⊗ 1) e_t)', 1380, 345, C.white, iq, 19);
    const oq = Q(S, 1, 'a horizontal choice exists only after a cover', 0.8);
    const cx = 1220, cy = 560, R = 110, m = 5, rot = t * 0.6;
    ring(cx, cy, R, C.dim, oq, 1.5);
    for (let k = 0; k < m; k++) { const ang = rot + k * 2 * Math.PI / m; dot(cx + R * Math.cos(ang), cy + R * Math.sin(ang), 10, k === 0 ? 'g' : 'm', oq); }
    lbl('orbit of size m', cx, cy + R + 36, C.mag, oq, 17);
    lbl('deg(X′/X) = m · [Γ_ω : H]', 1560, 520, C.white, oq, 20); lbl('minimal degree = m', 1560, 560, C.gold, oq, 18);
    const mq = Q(S, 1, 'exactly m memory states', 0.6);
    chip(1560, 650, 440, 60, 'memory = m states', C.green, mq, 24); lbl('≥ ⌈log₂ m⌉ bits · separating words of length ≤ m − 1', 1560, 750, C.dim, mq, 15);
  }
};

/* ---- 05 BUDGET ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, "Fano's inequality", 'classical'], [1, 'a seed that was independent', 'theory']]);
  const f1 = 1 - Q(S, 1, "Fano's inequality", 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Information has a price', 0.6) * f1;
    const cs = [0.6, 1.0, 0.4, 0.8, 0.5, 0.9], is = [0.5, 0.7, 0.35, 0.6, 0.2, 0.8];
    cs.forEach((c, i) => { const x = 180 + i * 120, qq = q * clamp(q * 6 - i); fillBox(x, 560 - c * 200, 40, c * 200, C.gold, qq * 0.5); rect63(x, 560 - c * 200, 40, c * 200, C.gold, qq, 1.4); fillBox(x + 46, 560 - is[i] * 200, 40, is[i] * 200, C.cyan, qq * 0.5); rect63(x + 46, 560 - is[i] * 200, 40, is[i] * 200, C.cyan, qq, 1.4); lbl('t=' + (i + 1), x + 43, 590, C.dim, qq, 14); });
    lbl('cost c_t', 300, 270, C.gold, q, 18); lbl('information ≤ κ c_t', 560, 270, C.cyan, q, 18);
    const tq = Q(S, 0, 'the total information gathered is bounded', 0.6) * f1;
    chip(560, 680, 700, 64, 'I(U ; H_N | H₀) ≤ κ 𝔼C', C.cyan, tq, 30);
    const bq = Q(S, 0, 'for a binary task the cost is at least', 0.6) * f1;
    const px = 1080, py = 700, pw = 640, ph = 360, xS = v => px + v / 0.5 * pw, yS = v => py - v / 0.5 * ph;
    plotAxes(px, py, pw, ph, bq, 'risk reduction Δe', 'κ · 𝔼C');
    fillPoly([[xS(0), yS(0.5)], ...[...Array(41)].map((_, i) => { const v = i / 80; return [xS(v), yS(2 * v * v)]; }), [xS(0.5), yS(0.5)]], C.red, bq * 0.1);
    curve(p => { const v = 0.5 * p; return [xS(v), yS(Math.min(0.5, 2 * v * v))]; }, 60, C.red, bq, 3);
    lbl('𝔼C ≥ 2 (Δe)² / κ', xS(0.28), yS(0.32), C.red, bq, 22);
    lbl('feasible above the curve', xS(0.12), yS(0.42), C.dim, bq, 16);
  }
  const q = Q(S, 1, "Fano's inequality", 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 290, 1240, 70, '𝔼C ≥ [ H(S | H₀) − b(p_e) − p_e log(m − 1) ]₊ / κ', C.gold, q, 28);
    lbl('identifying one of m actual candidates with error p_e', W / 2, 355, C.dim, q, 17);
    const sq = Q(S, 1, 'a seed that was independent at the start', 0.6);
    const rows = [['S', 'Z', 'H₀ = S ⊕ Z'], ['0', '0', '0'], ['0', '1', '1'], ['1', '0', '1'], ['1', '1', '0']];
    rows.forEach((r, i) => r.forEach((s, j) => cell71(560 + j * 160, 420 + i * 62, 140, 52, s, i === 0 ? C.dim : [C.cyan, C.mag, C.gold][j], sq, 20, i === 0 ? 0.15 : 0.25)));
    lbl('I(S ; Z) = 0', 1380, 500, C.green, sq, 24);
    const zq = Q(S, 1, 'revealing Z gives away S', 0.6);
    lbl('I(S ; Z | H₀) = log 2', 1380, 560, C.red, zq, 24);
    stamp('LEAK', 1380, 650, zq, C.red, 40, -0.06);
  }
};

/* ---- 06 COVER ---- */
SCENES.cover = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'the published geometric Langlands results', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Only part of the central data survives', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'pull the candidates back to an open part', 0.6) * f1;
    const cx = 420, cy = 620;
    ell71(cx, cy, 320, 120, C.cyan, q, 2.5); fillEll71(cx, cy, 320, 120, C.cyan, q * 0.05);
    [-210, -70, 70, 210].forEach(dx => ell71(cx + dx, cy, 40, 16, C.white, q, 1.8));
    [[-150, 70], [20, -80], [150, 60], [260, -30], [-260, -40]].forEach(([dx, dy]) => { ring(cx + dx, cy + dy, 7, C.red, q, 2); });
    lbl('X : genus 4 ,  U = X minus finitely many points', cx, cy + 160, C.white, q, 18);
    sheets71(110, 380, 620, 5, C.mag, q, t, -1, 0.6); lbl('branch Z_i → U , degree d_i', cx, 270, C.mag, q, 18);
    arrow(cx, 400, cx, 480, C.dim, q, 2.5);
    const gq = Q(S, 0, 'compactifies to a curve of genus at least', 0.6) * f1;
    chip(1350, 290, 720, 64, 'g(Y_i) ≥ 3 d_i + 1', C.gold, gq, 30);
    lbl('2g(Y) − 2 = 6d + deg Ram ≥ 6d   (Riemann–Hurwitz, g(X) = 4)', 1350, 350, C.dim, gq, 16);
    const dq = Q(S, 0, 'the SO five system stays dense', 0.6) * f1;
    chip(1350, 440, 720, 60, 'g_i* E_X : dense in SO₅ , unramified on all of Y_i', C.green, dq, 21);
    lbl('finite-index subgroups of a dense image stay dense', 1350, 495, C.dim, dq, 16);
    const pq = Q(S, 0, 'the published geometric Langlands results', 0.6) * f1;
    box(990, 550, 720, 150, C.cyan, pq, 2, 'rgba(0,25,40,0.6)');
    lbl('EXTERNAL · Satake (Mirković–Vilonen) · Gaitsgory–Raskin I, V', 1350, 585, C.cyan, pq, 16);
    lblG('nonzero Sp₄ Hecke eigen-object on each Y_i', 1350, 640, C.white, pq, 24);
    lbl('simple, since the centraliser of a dense image in SO₅ is trivial', 1350, 680, C.dim, pq, 15);
  }
  const q = Q(S, 1, 'Only part of the central data survives', 0.6, 0.3);
  if (q > 0) {
    const sq = Q(S, 1, 'at least half for d equal to eighteen', 0.6);
    const x0 = 220, y0 = 260, s = 28;
    for (let k = 0; k < 256; k++) { const i = k % 16, j = Math.floor(k / 16); const kept = sq > 0.5 ? (k % 2 === 0) : true; dot(x0 + i * s, y0 + j * s, 6, kept ? 'g' : 'n', q * (kept ? 1 : 0.3)); }
    lbl(sq > 0.5 ? 'd = 18 : at least 128 inherited' : 'd odd : all 256 inherited', x0 + 7.5 * s, y0 + 16 * s + 20, sq > 0.5 ? C.gold : C.green, q, 19);
    chip(1350, 300, 720, 64, 'inherited lifts = 256 / |V| ,  |V| divides d', C.white, q, 24);
    lbl('V = ker( g* : H¹(X, μ₂) → H¹(Y, μ₂) ) , |V| a power of 2', 1350, 360, C.dim, q, 16);
    const oq = Q(S, 1, 'so all of them for odd d', 0.6);
    [['d = 1, 3, 9 …', '256', C.green], ['d = 18', '≥ 128', C.gold], ['all lifts on Y', '2^(2g(Y))', C.cyan]].forEach(([a1, a2, col], i) => { const qq = i === 1 ? sq : oq; box(1000 + i * 240, 450, 220, 120, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(a1, 1110 + i * 240, 490, col, qq, 17); lblG(a2, 1110 + i * 240, 545, C.white, qq, 26); });
  }
};

/* ---- 07 HANKEL ---- */
SCENES.hankel = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For the Omega model this gives six', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A linear prediction code has a minimal size', 0.6) * f1;
    chip(W / 2, 280, 1100, 64, 'P = UU* ,  A = U*HU ,  D = (I − P)HU ,  F(t) = U* e^(−itH) U', C.white, q, 24);
    const kq = Q(S, 0, 'the full future is determined by the Krylov closure', 0.8) * f1;
    const layers = [['im U', 5, C.cyan], ['+ H im U', 1, C.gold], ['+ H² im U', 0, C.dim]];
    let x = 300;
    layers.forEach(([nm, n, col], i) => { const qq = kq * clamp(kq * 3 - i); lbl(nm, x + Math.max(n, 1) * 35, 400, col, qq, 18); for (let k = 0; k < Math.max(n, 1); k++) cell71(x + k * 70, 420, 60, 60, n ? '' : '∅', col, qq, 20); x += Math.max(n, 1) * 70 + 60; });
    lbl('𝒦_∞ = span H^j im U : stops growing', 640, 530, C.white, kq, 18);
    const gq = Q(S, 0, 'the rank of the Hankel Gram matrices', 0.6) * f1;
    chip(1380, 450, 640, 64, 'd_min = sup_s rank Γ_s = dim 𝒦_∞', C.gold, gq, 26);
    lbl('Γ_s = (M_{i+j}) = K_s* K_s ,  rank Γ₁ = m + rank D', 1380, 515, C.dim, gq, 17);
    lbl('group law F(t+s) = F(t)F(s) ⇔ D = 0', 1380, 560, C.dim, gq, 17);
  }
  const q = Q(S, 1, 'For the Omega model this gives six', 0.6, 0.3);
  if (q > 0) {
    const vs = ['|000⟩', '|100⟩', '|010⟩', '|001⟩', '|101⟩'];
    vs.forEach((s, i) => cell71(140 + i * 130, 290, 115, 70, s, C.cyan, q, 19));
    cell71(140 + 5 * 130 + 30, 290, 115, 70, 'b', C.gold, q, 24);
    lbl('V (visible)', 140 + 2 * 130 + 57, 260, C.cyan, q, 17); lbl('bright', 140 + 5 * 130 + 87, 260, C.gold, q, 17);
    const lq = Q(S, 1, 'with one-dimensional leakage', 0.6);
    curve(p => [140 + 4 * 130 + 57 + (5 * 130 + 30 - 4 * 130) * p, 380 + Math.sin(p * Math.PI) * 40], 30, C.gold, lq, 3);
    lbl('H e₄ = J e₄ + 2|g| b', 600, 460, C.gold, lq, 20); lbl('D = (2|g|/ħ) |b⟩⟨e₄| , rank 1', 600, 495, C.white, lq, 18);
    const dq = Q(S, 1, 'an invisible dark vector', 0.6);
    cell71(140 + 5 * 130 + 30, 560, 115, 70, 'z_dark', C.dim, dq, 18); stamp('NEVER SEEN', 140 + 5 * 130 + 87, 660, dq, C.red, 26, -0.05);
    lbl('H z_dark = 0 , orthogonal to 𝒦_∞', 400, 600, C.dim, dq, 17);
    chip(400, 700, 420, 60, 'd_min = 6', C.green, q, 30);
    const nq = Q(S, 1, 'Finite noisy moments still certify', 0.8);
    const px = 1150, py = 720, pw = 600, ph = 340, yS = v => py - Math.log10(v * 1000) / 5 * ph;
    plotAxes(px, py, pw, ph, nq, 'eigenvalues of Γ₂', 'log scale');
    G2_71.forEach((v, i) => { const x = px + 30 + i * 60, h = py - yS(v); fillBox(x, py - h, 40, h, C.green, nq * 0.5); rect63(x, py - h, 40, h, C.green, nq, 1.4); });
    for (let i = 6; i < 9; i++) fillBox(px + 30 + i * 60, py - 4, 40, 4, C.dim, nq * 0.6);
    const thr = yS(0.05); dashed(px, thr, px + pw, thr, C.red, nq, 2); lbl('(s + 1) ε', px + pw - 10, thr - 10, C.red, nq, 16, 'right');
    lbl('N′ ≥ #{ λ_k(Γ_s) > (s+1)ε } = 6', px + pw / 2, py + 75, C.white, nq, 18);
  }
};

/* ---- 08 DOMAIN ---- */
SCENES.domain = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Two completions coincide exactly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now the critical Green coupling', 0.6) * f1;
    chip(W / 2, 280, 900, 70, 'g_c = π ρ(o) det A(o) λ₀ / r', C.gold, q, 32);
    const pq = Q(S, 0, 'is the lowest eigenvalue of an angular profile', 0.8) * f1;
    const px = 200, py = 700, pw = 700, ph = 260, xS = a => px + (a + Math.PI / 2) / Math.PI * pw, yS = v => py - (v - 0.9) / 0.3 * ph;
    plotAxes(px, py, pw, ph, pq, 'angle a ∈ (−π/2, π/2)', 'φ(a)');
    curve(p => { const i = Math.min(40, p * 40), i0 = Math.floor(i), fr = i - i0, v = PHI71[i0] * (1 - fr) + PHI71[Math.min(40, i0 + 1)] * fr; return [xS(-Math.PI / 2 + Math.PI * p), yS(v)]; }, 80, C.cyan, pq, 3);
    lbl('−4(cos a φ′)′ + cos a φ = λ₀ φ , natural endpoints', px + pw / 2, py + 50, C.white, pq, 17);
    chip(1350, 420, 640, 62, 'λ₀ ≈ 0.6257 < 2/π ≈ 0.6366', C.cyan, pq, 24);
    lbl('finite elements, converged to six digits', 1350, 478, C.dim, pq, 15);
    const cq = Q(S, 0, 'At the threshold the form needs a specific completion', 0.6) * f1;
    chip(1350, 570, 640, 62, '𝒟_A = H 𝒲_H  ⊋  ℱ_A', C.green, cq, 26);
    lbl('H = R⁻¹ φ(a) near the source · infimum attained on 𝒟_A, not on ℱ_A', 1350, 630, C.dim, cq, 15);
  }
  const q = Q(S, 1, 'Two completions coincide exactly', 0.6, 0.3);
  if (q > 0) {
    const cx = 400, cy = 470;
    const sg = 2.2, aq = Q(S, 1, 'share the threshold but not the domain', 0.6);
    [1, 2, 3].forEach(k => ell71(cx, cy, 45 * k, 45 * k, C.cyan, q, 2));
    [1, 2, 3].forEach(k => ell71(cx, cy, 45 * k * Math.sqrt(sg), 45 * k / Math.sqrt(sg), C.mag, aq, 2));
    lbl('A₁ = I', cx - 200, cy - 170, C.cyan, q, 20); lbl('A₂ = diag(σ, 1/σ)', cx + 120, cy - 170, C.mag, aq, 20);
    lbl('level sets of h_i on t = 0', cx, cy + 190, C.dim, q, 16);
    chip(1180, 300, 640, 60, '𝒟₁ = 𝒟₂  ⇔  A₂(o) = c A₁(o)', C.white, q, 24);
    lbl('det A₁ = det A₂ = 1 ⇒ same g_c', 1180, 360, C.green, aq, 20); lbl('𝒟₁ ⊄ 𝒟₂ and 𝒟₂ ⊄ 𝒟₁', 1180, 395, C.red, aq, 20);
    const bq = Q(S, 1, 'Under a trace budget', 0.6);
    const px = 900, py = 760, pw = 560, ph = 230, xS = k => px + k * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, bq, 'κ₁ / τ   (κ₁ + κ₂ = τ)', 'g_c / max');
    curve(p => [xS(p), yS(4 * p * (1 - p))], 60, C.gold, bq, 3); dot(xS(0.5), yS(1), 8, 'g', bq);
    lbl('max at A(o) = τG/2', xS(0.5), yS(1) - 18, C.gold, bq, 16);
    lbl('deficit ∝ (κ₁ − κ₂)²', px + pw + 30, yS(0.5), C.white, bq, 17, 'left');
  }
};

/* ---- 09 ANCHOR ---- */
SCENES.anchor = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'What stays open is listed explicitly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A recovered source fixes one point', 0.6) * f1;
    sheets71(160, 600, 700, 12, C.cyan, q, t, 4, 0.8);
    const ax = 160 + 700 * 0.45, ay = 600 - 4 * 14 + 0.8 * 6 * Math.sin(0.45 * 6.3 + 4 * 0.7 + t * 0.3);
    dot(ax, ay, 12, 'r', q); lbl('anchor (x₀, c₀)', ax, ay - 30, C.red, q, 18);
    const steps = [['recovered source', '(b₀, χ₀) through the strict guards', C.red, 'A recovered source fixes one point'], ['branch Z₀', 'degree m = orbit of the anchor', C.mag, 'the branch through it has degree m'], ['horizontal idempotent', 'χ(a) = Tr((a ⊗ 1) e) , ∇e = 0', C.gold, 'a horizontal idempotent evaluates'], ['compactified Y', 'g ≥ 3m + 1 · dense · Hecke F ≠ 0', C.green, 'the compactified branch carries']];
    steps.forEach(([h, s, col, ph], i) => { const qq = Q(S, 0, ph, 0.6) * f1, y = 230 + i * 140; box(1000, y, 760, 110, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, 1380, y + 38, col, qq, 20); lblG(s, 1380, y + 80, C.white, qq, 22); if (i) arrow(1380, y - 28, 1380, y - 4, C.dim, qq, 2.5); });
  }
  const q = Q(S, 1, 'What stays open is listed explicitly', 0.6, 0.3);
  if (q > 0) {
    const items = [['a common implementation of the four blocks', 'four two-channel blocks in the native permissions'], ['the full exceptional layers', 'all candidate layers and double collisions outside 𝒬'], ['the actual monodromy', 'the actual monodromy of a chosen parameter curve'], ['the noisy acquisition cost', 'condition numbers and the cost of minimal states'], ['the automorphic base change', 'a base-change functor on the automorphic side']];
    items.forEach(([ph, s, ], i) => { const qq = Q(S, 1, ph, 0.5), y = 240 + i * 105; box(320, y, 1280, 85, C.vio, qq, 2, 'rgba(0,0,0,0.5)'); lblG(s, 900, y + 52, C.white, qq, 24); stamp('OPEN', 1500, y + 46, qq, C.vio, 26, -0.04); });
  }
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Geometric Satake and geometric Langlands are published inputs', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['CLOCK', '17 readings', C.gold, 'Seventeen readings decode a world'], ['LABELS', '266.2 · 313.52', C.cyan, 'two thresholds label it'], ['SELECTION', 'e_t , degree m', C.mag, 'one root selects a sheet'], ['BUDGET', 'I ≤ κ 𝔼C', C.red, 'information has a price'], ['COVER', 'g ≥ 3d + 1', C.green, 'every branch keeps a Hecke eigen-object'], ['DOMAIN', 'A(o) up to scale', C.vio, 'the critical domain is classified']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 22); lblG(a2, x, 340, C.white, q, 19); });
    lbl('PUBLISHED · geometric Satake · Hecke eigen-objects  ·  CLASSICAL · finite étale covers · Riemann–Hurwitz · Fano · Pinsker · Weyl', W / 2, 470, C.cyan, Q(S, 1, 'Geometric Satake and geometric Langlands are published inputs') * fade, 15);
    lbl('PROJECT INPUTS · literal clock · three-world certificate · Ω Fock model · Green critical theorems', W / 2, 515, C.gold, Q(S, 1, 'the clock, three-world and Green inputs') * fade, 16);
    lbl('VOLUME · lower bound · normalisation · labels · transport · selection · budget · cover · Hankel · domain classification · anchored composition', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 15);
    lbl('RECOMPUTED · det C exact for 12 (k, δ) · 30 decoded worlds · trace transport · 110 orbits · Pinsker and Fano · Ω dimension 6 · λ₀ ≈ 0.6257', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 15);
    lbl('NEXT · AURIC–LANGLANDS IV · DEGENERATION, RAMIFICATION AND STABLE RECOVERY', W / 2, 700, C.gold, Q(S, 1, 'Next: degeneration, ramification and stable recovery') * fade, 26);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC–LANGLANDS III · COVER', W / 2, 680, { size: 60, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC–Langlands 第三部 · 取得、覆盖与临界域 · TRURETURING FILM 071', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Seventeen readings, one selected sheet, and a domain the threshold cannot see.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC–LANGLANDS III', clock: 'LITERAL CLOCK', labels: 'THREE WORLDS', selection: 'SELECTION', budget: 'INFORMATION PRICE', cover: 'BRANCHES AND LIFTS', hankel: 'MINIMAL REALISATION', domain: 'CRITICAL DOMAIN', anchor: 'ANCHORED COMPOSITION', finale: 'LEDGER' });

function poster71() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('M⁸ J M⁷ : 17 readings', 1320, 370, { size: 50, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('e_t = q_t(z) / Q′(t) · g(Y) ≥ 3d + 1', 1320, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('g_c = π ρ det A λ₀ / r', 1320, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC–Langlands 第三部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC–LANGLANDS III · COVER', W / 2, 890, { size: 68, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('取 得 · 覆 盖 · 临 界 域', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 071', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster71;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
