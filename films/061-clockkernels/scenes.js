/* Film 061 */

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

/* ---- film 061: local clock kernels and seam visibility ---- */
const _po61 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po61.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po61.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: s.includes('½') ? FG : F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect61(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const MODES61 = [['∅', [0, 0, 0], 'n', '000'], ['[2]', [1, 0, 0], 'c', '100'], ['[3]', [0, 0, 1], 'g', '010'], ['[5]', [0, 1, 0], 'o', '001'], ['[2,5]', [1, 1, 0], 'm', '101']];
const PEDGE61 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
function pyr61(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES61.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE61.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.8, 1.8));
  if (opt.labels !== false) MODES61.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(opt.bits ? m[3] : m[0], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -20 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return W3;
}
/* a soft node: ring plus a pearl whose size and glow follow the value */
function soft61(x, y, v, a, col = C.cyan, nm = 'c', lab = null, r = 24) {
  if (a <= 0) return;
  ring(x, y, r, col, a * 0.8, 2);
  if (v > 0.001) dot(x, y, r * (0.35 + 0.6 * Math.sqrt(v)), nm, a * (0.35 + 0.65 * v));
  if (lab != null) lbl(lab, x, y + r + 26, C.white, a, 18);
}
/* three atoms carrying 2, 3, 5 */
function atoms61(x, y, bits, a, sp = 90, r = 24, vals = true) {
  const nm = ['c', 'g', 'o'], v = ['2', '3', '5'];
  for (let i = 0; i < 3; i++) { const xx = x + i * sp; if (i) line(xx - sp + r, y, xx - r, y, C.dim, a * 0.7, 2); ring(xx, y, r, C.dim, a * 0.8, 2); if (bits[i]) dot(xx, y, r * 0.95, nm[i], a); if (vals) lbl(v[i], xx, y + 7, bits[i] ? '#06121c' : C.dim, a, Math.round(r * 0.8)); }
}
/* a regular k-gon blended with its inscribed disk: (1 - tau) P_k (+) tau rho D, circumradius R px */
function blend61(cx, cy, R, k, tau, col, a, lw = 2.5, fill = 0, dash = false, rot = -Math.PI / 2) {
  if (a <= 0) return;
  const rho = R * Math.cos(Math.PI / k), r = tau * rho, Rv = (1 - tau) * R;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([10, 8]);
  ctx.beginPath();
  for (let i = 0; i < k; i++) { const th = rot + TAU * i / k, vx = cx + Rv * Math.cos(th), vy = cy + Rv * Math.sin(th); ctx.arc(vx, vy, Math.max(r, 0.01), th - Math.PI / k, th + Math.PI / k); }
  ctx.closePath();
  if (fill) { ctx.fillStyle = col; ctx.globalAlpha = a * fill; ctx.fill(); ctx.globalAlpha = a; }
  ctx.stroke(); ctx.restore();
}

function eqnG(s, x, y, a, col = C.white, size = 28) { txt(s, x, y, { size, fam: FG, w: 700, align: 'center', c: col, a }); }
const NM61 = ['∅', '[2]', '[3]', '[5]', '[2,5]'], DOT61 = ['n', 'c', 'g', 'o', 'm'];
/* five state nodes in a row */
function row61(x0, y, sp, a, opt = {}) {
  const P = NM61.map((s, i) => [x0 + i * sp, y]);
  P.forEach((p, i) => { ring(p[0], p[1], 26, C.cyan, a * 0.8, 2); dot(p[0], p[1], 14, DOT61[i], a * (opt.dim ? 0.4 : 1)); lbl(s61n(i), p[0], p[1] + 54, C.white, a, 20); });
  return P;
}
function s61n(i) { return NM61[i]; }
/* signed bars above a row of nodes */
function sbars61(P, v, y0, hs, a, col, labels = false) {
  v.forEach((x, i) => { if (Math.abs(x) < 1e-9) { line(P[i][0] - 22, y0, P[i][0] + 22, y0, C.dim, a, 2); return; } const h = x * hs; fillBox(P[i][0] - 22, h > 0 ? y0 - h : y0, 44, Math.abs(h), x > 0 ? col : C.red, a * 0.5); rect61(P[i][0] - 22, h > 0 ? y0 - h : y0, 44, Math.abs(h), x > 0 ? col : C.red, a, 2); if (labels) lbl((x > 0 ? '+' : '') + x, P[i][0], h > 0 ? y0 - h - 12 : y0 - h + 26, C.white, a, 18); });
}
/* curved arrow between two row nodes */
function arc61(p, q, col, a, up = 1, hgt = 60) {
  if (a <= 0) return;
  if (Math.abs(p[0] - q[0]) < 1) { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(p[0], p[1] - up * 44, 16, 0, TAU * 0.85); ctx.stroke(); ctx.restore(); return; }
  const mx = (p[0] + q[0]) / 2, my = p[1] - up * (hgt + Math.abs(q[0] - p[0]) * 0.18);
  curve(z => [(1 - z) * (1 - z) * p[0] + 2 * z * (1 - z) * mx + z * z * q[0], (1 - z) * (1 - z) * (p[1] - up * 28) + 2 * z * (1 - z) * my + z * z * (q[1] - up * 28)], 30, col, a, 2.5);
  const tx = q[0] - (q[0] - mx) * 0.12, ty = (q[1] - up * 28) - ((q[1] - up * 28) - my) * 0.12; arrow(tx, ty, q[0], q[1] - up * 28, col, a, 2.5);
}

/* a small histogram */
function hist61(x0, y0, vals, bw, hs, col, a, gap = 4) { vals.forEach((v, i) => { const h = v * hs; if (Math.abs(h) < 0.5) return; fillBox(x0 + i * (bw + gap), h > 0 ? y0 - h : y0, bw, Math.abs(h), h > 0 ? col : C.red, a * 0.5); rect61(x0 + i * (bw + gap), h > 0 ? y0 - h : y0, bw, Math.abs(h), h > 0 ? col : C.red, a, 1.5); }); line(x0 - 4, y0, x0 + vals.length * (bw + gap), y0, C.dim, a, 1.2); }
const KER61 = [[0.30, 0.25, 0.18, 0.12, 0.09, 0.06], [0.10, 0.30, 0.28, 0.16, 0.10, 0.06], [0.20, 0.20, 0.20, 0.16, 0.14, 0.10], [0.08, 0.14, 0.30, 0.26, 0.14, 0.08], [0.05, 0.10, 0.20, 0.30, 0.22, 0.13]];
const COL61 = () => [C.dim, C.cyan, C.green, C.gold, C.mag];
function clock61(x, y, r, t, a, col = C.cyan) { if (a <= 0) return; ring(x, y, r, col, a, 3); for (let i = 0; i < 12; i++) { const an = TAU * i / 12; line(x + Math.cos(an) * r * 0.82, y + Math.sin(an) * r * 0.82, x + Math.cos(an) * r * 0.95, y + Math.sin(an) * r * 0.95, col, a, 2); } const h = t * 1.3; line(x, y, x + Math.cos(h - Math.PI / 2) * r * 0.7, y + Math.sin(h - Math.PI / 2) * r * 0.7, C.gold, a, 4); dot(x, y, 8, 'o', a); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  pyr61(500, 440, 270, 0.6 + t * 0.2, s0, { fillBase: true });
  clock61(500, 760, 70, t, Q(S, 0, 'what a local clock can see', 0.6));
  [['a rate', 'when a rate', C.cyan], ['a mean', 'a mean', C.green], ['a waiting law', 'a waiting law', C.gold], ['a whole history', 'a whole history', C.mag]].forEach(([s, ph, col], i) => chip(1100 + (i % 2) * 520, 330 + Math.floor(i / 2) * 90, 460, 62, s, col, Q(S, 0, ph), 24));
  chip(1360, 530, 560, 62, 'hidden = erased ?', C.red, Q(S, 0, 'whether a hidden seam has really been erased'), 24);
  const fq = Q(S, 1, 'a family of waiting laws', 0.6);
  KER61.forEach((k, i) => { const x = 1000 + i * 175; hist61(x, 820, k, 18, 260, COL61()[i], fq, 3); lbl(NM61[i], x + 60, 852, C.white, fq, 18); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr61(W / 2, 400, 260, 0.5 + t * 0.25, rp, { fillBase: true, lab: 0.6 });
  clock61(380, 420, 110, t, rp);
  KER61.slice(0, 3).forEach((k, i) => hist61(1400 + i * 0, 300 + i * 120, k, 22, 220, COL61()[i + 1], rp, 4));
  txt(scramble('AURIC FIB ATOM PYRAMID XXXII', rp, 461), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXXII · 局 部 时 钟 核 与 接 缝 可 见 性', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 061 · LOCAL_CLOCK_KERNEL_AND_OUTPUT_RESOLVED_SEAM_VISIBILITY + LOCAL_CLOCK_CAUSAL_FIELD', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 KERNEL ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), kq = Q(S, 0, 'Give each of the five states a waiting law', 0.6);
  KER61.forEach((k, i) => { const x = 300 + i * 290, q = kq * clamp((S.u - lineAt(S, 0).s - 0.3 - i * 0.3) / 0.4); hist61(x, 560, k, 30, 400, COL61()[i], q, 4); lbl(NM61[i], x + 100, 600, C.white, q, 22); lbl('K' + ['∅', '₂', '₃', '₅', '₂₅'][i], x + 100, 360, COL61()[i], q, 22); });
  const cq = Q(S, 0, 'the four-corner difference of the kernels', 0.6);
  const curv = KER61[0].map((v, j) => v - KER61[1][j] - KER61[3][j] + KER61[4][j]);
  hist61(840, 760, curv, 30, 500, C.mag, cq, 4);
  lblG('Curv_K = K∅ − K₂ − K₅ + K₂₅', 1500, 740, C.mag, cq, 26);
  eqnG('Σ p_s K_s = C₀ + κ · Curv_K', 960, 300, Q(S, 0, 'The mixed law is a baseline plus kappa', 0.6), C.white, 32);
  const sq = Q(S, 1, 'a clock separates the hidden fibre', 0.6);
  lbl('clock separates the fibre  ⇔  Curv_K ≠ 0', 1500, 800, C.green, sq, 22);
  const mq = Q(S, 1, 'Keeping only the mean waiting time', 0.6);
  if (mq > 0) {
    KER61.forEach((k, i) => { const m = k.reduce((acc, v, j) => acc + v * j, 0) / k.reduce((acc, v) => acc + v, 0), x = 300 + i * 290 + m * 34 + 15; line(x, 560, x, 380, C.white, mq, 2); dot(x, 380, 8, 'w', mq); });
    lbl('means : Curv_m = m∅ − m₂ − m₅ + m₂₅', 1500, 850, C.white, mq, 20);
  }
  void t; void s0;
};

/* ---- 03 RATES ---- */
SCENES.rates = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'A mean can still be blind', 0.6);
  const a = 0.5, b = 1.0, c = 1.5, dd = 0.7, r = [a, a + b, a + dd, a + c, a + b + c];
  if (f1 > 0) {
    const rq = Q(S, 0, 'Take exponential waits', 0.6) * f1;
    ['∅  : a', '[2] : a + b', '[3] : a + d', '[5] : a + c', '[2,5] : a + b + c'].forEach((s, i) => lbl(s, 300, 330 + i * 44, COL61()[i], rq, 22, 'left'));
    lbl('corner of rates = 0', 300, 570, C.red, Q(S, 0, 'The rates have zero four-corner difference', 0.6) * f1, 22, 'left');
    lbl('initial hazard h(0) : blind', 300, 610, C.red, Q(S, 0, 'the initial hazard rate cannot see kappa', 0.6) * f1, 22, 'left');
    const px = 860, py = 760, pw = 900, ph = 420, sq = Q(S, 0, 'But the survival curve', 0.6) * f1;
    plotAxes(px, py, pw, ph, sq, 't', 'S(t)');
    const p1 = [0.30, 0.25, 0.10, 0.30, 0.05], p2 = [0.45, 0.10, 0.10, 0.15, 0.20];
    [[p1, C.cyan, 'κ = 0.05'], [p2, C.gold, 'κ = 0.20']].forEach(([p, col, nm], k) => { curve(z => { const tt = z * 4; return [px + z * pw, py - ph * p.reduce((acc, v, i) => acc + v * Math.exp(-r[i] * tt), 0)]; }, 60, col, sq, 3); lbl(nm, px + pw - 40, py - 40 - k * 36, col, sq, 20, 'right'); });
    curve(z => { const tt = z * 4; return [px + z * pw, py - ph * 2.2 * Math.exp(-a * tt) * (1 - Math.exp(-b * tt)) * (1 - Math.exp(-c * tt))]; }, 60, C.mag, Q(S, 0, 'which is positive', 0.6) * f1, 3);
    lblG('ΔS(t) = e^(−at)(1 − e^(−bt))(1 − e^(−ct)) > 0', 1310, 300, C.mag, Q(S, 0, 'carries kappa times', 0.6) * f1, 24);
  }
  const q = Q(S, 1, 'In this example the mean also sees kappa', 0.6, 0.3);
  if (q > 0) {
    lblG('Curv_m = bc(2a + b + c) / (a(a+b)(a+c)(a+b+c)) > 0', 960, 300, C.green, q * f1 + Q(S, 1, 'A mean can still be blind', 0.6) * 0.5, 24);
    const bq = Q(S, 1, 'A mean can still be blind', 0.6);
    if (bq > 0) {
      const K = [[0.5, 0, 0.5], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]];
      K.forEach((k, i) => { const x = 300 + i * 290; hist61(x, 640, k, 50, 220, COL61()[i], bq, 6); lbl(NM61[i], x + 80, 680, C.white, bq, 22); lbl('mean 1', x + 80, 720, C.green, Q(S, 1, 'all means equal one', 0.6), 18); });
      lbl('waits : 0 or 2', 380, 380, C.white, bq, 18); lbl('waits : exactly 1', 1100, 380, C.white, bq, 18);
      lblG('Curv_K = ½δ₀ + ½δ₂ − δ₁ ≠ 0', 960, 820, C.mag, Q(S, 1, 'yet the full laws differ', 0.6), 28);
    }
  }
  void t; void s0;
};

/* ---- 04 HISTORY ---- */
SCENES.history = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'classical']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'But on one common path space', 0.6);
  if (f1 > 0) {
    const oq = Q(S, 0, 'the resolution order', 0.6) * f1, vals = [0, 0, 0, 0.6, 0.9, 1.0];
    plotAxes(320, 520, 760, 200, oq, 'history length n', '|Curv_Γ⁽ⁿ⁾|');
    vals.forEach((v, i) => { const x = 380 + i * 120; dot(x, 520 - v * 180, 12, v ? 'm' : 'n', oq); lbl(String(i + 1), x, 552, C.dim, oq, 18); });
    ring(380 + 3 * 120, 520 - 0.6 * 180, 26, C.gold, Q(S, 0, 'becomes nonzero', 0.6) * f1, 3); lbl('ℓ* = 4', 380 + 3 * 120, 520 - 0.6 * 180 - 40, C.gold, Q(S, 0, 'becomes nonzero', 0.6) * f1, 24);
    lbl('never nonzero  ⇒  ℓ* = ∞', 1450, 380, C.white, Q(S, 0, 'or infinity if it never does', 0.6) * f1, 22);
    const bq = Q(S, 0, 'A bounded prefix is not enough', 0.6) * f1, seqs = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1]];
    seqs.forEach((sq, k) => sq.forEach((v, i) => { const x = 420 + i * 100, y = 680 + k * 80, diff = i === 6; box(x, y, 80, 60, diff ? C.red : C.cyan, bq, 2, diff && k === 1 ? 'rgba(255,59,92,0.25)' : 'rgba(0,0,0,0.4)'); lbl(String(v), x + 40, y + 40, C.white, bq, 26); }));
    strokePoly([[410, 670], [1010, 670], [1010, 830], [410, 830]], C.green, bq, 2); lbl('first H steps agree', 710, 655, C.green, bq, 20);
    lbl('then differ', 1160, 760, C.red, Q(S, 0, 'differ on the next', 0.6) * f1, 22, 'left');
  }
  const q = Q(S, 1, 'But on one common path space', 0.6, 0.3);
  if (q > 0) {
    const root = [560, 300], lev = 4, nodes = [];
    for (let l = 0; l <= lev; l++) for (let i = 0; i < 2 ** l; i++) nodes.push([l, i, [root[0] + (i + 0.5) * 900 / 2 ** l - 450 + 0, 300 + l * 120]]);
    const pos = (l, i) => nodes.find(n => n[0] === l && n[1] === i)[2];
    for (let l = 1; l <= lev; l++) for (let i = 0; i < 2 ** l; i++) { const p = pos(l, i), pr = pos(l - 1, i >> 1), on = (i >> (l - 1)) === 0 && l <= Math.floor(1 + (S.u - lineAt(S, 1).s) * 1.2); line(pr[0], pr[1], p[0], p[1], on ? C.gold : C.cyan, q * (on ? 1 : 0.5), on ? 3 : 1.5); }
    nodes.forEach(([l, i, p]) => dot(p[0], p[1], 8, 'c', q));
    lbl('finite cylinders', 1450, 360, C.gold, q, 24);
    lblG('all finite prefix laws equal', 1450, 450, C.white, Q(S, 1, 'if every finite prefix law agrees', 0.6), 26);
    lblG('⇒ whole infinite law equal', 1450, 510, C.green, Q(S, 1, 'the whole infinite history law agrees', 0.6), 26);
    lbl('π–λ uniqueness · cylinders generate the σ-algebra', 1450, 600, C.dim, Q(S, 1, 'because finite cylinders determine the measure', 0.6), 18);
  }
  void t; void s0;
};

/* ---- 05 DYNAMICS ---- */
SCENES.dynamics = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'lean'], [1, 'Nonlinear leaks', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'For one linear update', 0.6);
  if (f1 > 0) {
    const px = 360, py = 680, pw = 760, ph = 320, gq = Q(S, 0, 'mass-preserving linear generator', 0.6) * f1;
    plotAxes(px, py, pw, ph, gq, 'time s', 'P e^(sL) d');
    const hq = Q(S, 0, 'the seam stays hidden forever', 0.6) * f1, lq = Q(S, 0, 'the seam becomes visible after any short time', 0.6) * f1;
    line(px, py, px + pw, py, C.cyan, hq, 4); lbl('PLd = 0 : hidden forever', px + pw - 10, py - 18, C.cyan, hq, 20, 'right');
    curve(z => [px + z * pw, py - ph * (1 - Math.exp(-3 * z)) * 0.9], 40, C.mag, lq, 3); line(px, py, px + 120, py - ph * 3 * 0.9 * 120 / pw, C.gold, lq, 2);
    lbl('PLd ≠ 0 : leaks at rate s · PLd', px + pw - 10, py - ph - 10, C.mag, lq, 20, 'right');
    eqnG('PLd = 0  ⇒  Ld = λd  ⇒  P e^(sL) d = 0', 1460, 360, hq, C.cyan, 26);
    eqnG('PLd ≠ 0  ⇒  P e^(sL) d ≈ s · PLd', 1460, 450, lq, C.mag, 26);
    lbl('five states · one hidden direction', 1460, 520, C.dim, gq, 18);
  }
  const q = Q(S, 1, 'For one linear update', 0.6, 0.3);
  if (q > 0) {
    box(300, 300, 700, 200, C.green, q, 2, 'rgba(0,0,0,0.6)');
    lblG('⋂_(k ≤ m) ker(C Tᵏ) = (observable Krylov)^⊥', 650, 380, C.white, Q(S, 1, 'what no reading up to step m can see', 0.6), 26);
    lbl('LEAN · finite_unobservable_eq_observable_orthogonal', 650, 450, C.green, Q(S, 1, 'Lean has frozen', 0.6), 16);
    const nq = Q(S, 1, 'Nonlinear leaks need not recover kappa', 0.6), px = 1150, py = 780, pw = 600, ph = 320;
    plotAxes(px, py, pw, ph, nq, null, 'output');
    curve(z => { const k = z * 0.5; return [px + z * pw, py - ph * (k - 0.25) ** 2 * 14]; }, 50, C.gold, nq, 3);
    const eq = Q(S, 1, 'reads the same at zero and one half', 0.6);
    dot(px, py - ph * 0.0625 * 14, 12, 'r', eq); dot(px + pw, py - ph * 0.0625 * 14, 12, 'r', eq); line(px, py - ph * 0.0625 * 14, px + pw, py - ph * 0.0625 * 14, C.red, eq, 2);
    lbl('κ = 0', px, py + 30, C.red, eq, 18); lbl('κ = ½', px + pw, py + 30, C.red, eq, 18);
    lblG('(κ − 1/4)²', px + pw / 2, py - ph - 20, C.gold, nq, 26);
    lbl('visible, yet not recoverable', 650, 640, C.red, eq, 22);
  }
  void t; void s0;
};

/* ---- 06 ERASE ---- */
SCENES.erase = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'And erasing the state does not erase the record', 0.6) * 0.75;
  [['dT = 0', 'erased in the carrier', C.dim, 'the difference d T is zero'], ['dT ≠ 0 ,  R(dT) = 0', 'kept, unobserved', C.gold, 'so it is kept but unobserved'], ['R(dT) ≠ 0', 'visible', C.green, 'or the readout sees it']].forEach(([a1, a2, col, ph], i) => { const x = 360 + i * 600, q = Q(S, 0, ph, 0.6) * f1; box(x - 260, 280, 520, 150, col, q, 2.5, 'rgba(0,0,0,0.5)'); lblG(a1, x, 340, C.white, q, 28); lbl(a2, x, 395, col, q, 22); });
  lbl('hidden  ≠  erased', 960, 480, C.red, Q(S, 0, 'Hidden is not erased', 0.6) * f1, 28);
  const q = Q(S, 1, 'And erasing the state does not erase the record', 0.6, 0.3);
  if (q > 0) {
    const P = row61(360, 620, 200, q), N = [1300, 620];
    P.forEach((p, i) => arrow(p[0], p[1] + 30, N[0] - 40, N[1] + 10 + (i - 2) * 8, C.cyan, Q(S, 1, 'Let both output branches reset to null', 0.6) * 0.6, 2));
    dot(N[0], N[1], 26, 'n', q); ring(N[0], N[1], 40, C.white, q, 2.5); lbl('∅  (reset)', N[0], N[1] + 70, C.white, q, 22);
    const lq = Q(S, 1, 'with output one firing on the joint mode', 0.6), on = Math.sin(t * 3) > 0.3;
    dot(1620, 560, on ? 26 : 14, on ? 'm' : 'n', lq); lbl('output 1', 1620, 610, C.mag, lq, 20); line(P[4][0] + 30, P[4][1] - 30, 1590, 560, C.mag, lq, 2.5);
    lbl('final state always ∅  →  dT = 0', 960, 800, C.white, Q(S, 1, 'The final state is always null', 0.6), 24);
    lblG('P(output 1) = κ', 1620, 700, C.mag, Q(S, 1, 'yet output one fires with probability exactly kappa', 0.6), 30);
  }
  void s0;
};

/* ---- 07 RAY ---- */
SCENES.ray = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u), rq = Q(S, 0, 'An occluded ray', 0.6);
  dot(320, 520, 22, 'o', rq); lbl('source', 320, 570, C.white, rq, 20);
  const ph = (t * 0.6) % 1; line(342, 520, 342 + 320 * Math.min(1, ph * 1.5), 520, C.gold, rq, 4);
  fillBox(680, 400, 26, 240, C.dim, rq * 0.6); lbl('occluder', 693, 380, C.dim, rq, 18);
  const oq = Q(S, 0, 'residues, recoil or outputs already emitted', 0.6);
  [['residue', 380, 700], ['recoil', 260, 420], ['emitted output', 520, 380]].forEach(([s, x, y], i) => { dot(x, y, 12, ['c', 'g', 'm'][i], oq); line(320, 520, x, y, C.cyan, oq * 0.6, 1.5); lbl(s, x, y + 32, C.cyan, oq, 18); });
  lbl('ray removed  ⇏  every port blind', 520, 300, C.red, Q(S, 0, 'does not make every other port blind', 0.6), 22);
  const cq = Q(S, 0, 'Conversely, all-zero responses do not prove the ray left', 0.6);
  box(1150, 400, 260, 160, C.cyan, cq, 2.5, 'rgba(0,0,0,0.5)'); lblG('T = I', 1280, 490, C.white, cq, 32);
  arrow(1420, 480, 1540, 480, C.cyan, cq, 2.5); box(1550, 430, 220, 100, C.gold, cq, 2, 'rgba(0,0,0,0.5)'); lblG('g = const', 1660, 490, C.gold, cq, 26);
  lbl('response : 0', 1460, 620, C.white, Q(S, 0, 'sees nothing', 0.6), 24);
  lbl('all zero  ⇏  ray left', 1460, 700, C.red, Q(S, 0, 'with no ray leaving at all', 0.6), 22);
  void s0;
};

/* ---- 08 HOLONOMY ---- */
SCENES.holonomy = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'And a path difference', 0.6);
  if (f1 > 0) {
    const a = s0 * f1, P = row61(380, 560, 220, a), sq = Q(S, 0, 'Swapping two and five', 0.6) * f1;
    arc61(P[1], P[3], C.gold, sq, 1, 60); arc61(P[3], P[1], C.gold, sq, -1, 60); arc61(P[0], P[0], C.cyan, sq, 1); arc61(P[2], P[2], C.cyan, sq, 1); arc61(P[4], P[4], C.cyan, sq, 1);
    lblG('H ≠ id', 1500, 330, C.gold, sq, 32);
    const uq = Q(S, 0, 'it fixes the uniform law', 0.6) * f1;
    P.forEach((p, i) => { fillBox(p[0] - 24, 800 - 0.2 * 300, 48, 0.2 * 300, C.cyan, uq * 0.45); rect61(p[0] - 24, 800 - 60, 48, 60, C.cyan, uq, 2); });
    lbl('uniform law : unchanged', 1500, 420, C.cyan, uq, 22);
    ring(P[2][0], P[2][1], 40, C.green, Q(S, 0, 'and the state three', 0.6) * f1, 3); lbl('δ[3] : fixed', 1500, 470, C.green, Q(S, 0, 'and the state three', 0.6) * f1, 22);
  }
  const q = Q(S, 1, 'And a path difference', 0.6, 0.3);
  if (q > 0) {
    const src = [360, 560], A = [960, 380], B = [960, 740];
    dot(src[0], src[1], 18, 'w', q); lbl('p', src[0] - 30, src[1] + 8, C.white, q, 22);
    arrow(src[0] + 20, src[1] - 10, A[0] - 30, A[1] + 10, C.cyan, q, 3); arrow(src[0] + 20, src[1] + 10, B[0] - 30, B[1] - 10, C.mag, q, 3);
    dot(A[0], A[1], 20, 'n', q); lbl('everything → ∅', A[0] + 40, A[1] + 8, C.cyan, q, 22, 'left');
    dot(B[0], B[1], 20, 'g', q); lbl('everything → [3]', B[0] + 40, B[1] + 8, C.mag, q, 22, 'left');
    lblG('R d = 0', 1500, 520, C.green, Q(S, 1, 'Their difference kills d', 0.6), 32);
    lblG('P R p = (0, 0, −1)  for every p', 1500, 600, C.red, Q(S, 1, 'yet every law reads a visible gap', 0.6), 28);
  }
  void t;
};

/* ---- 09 WINDOWS ---- */
SCENES.windows = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u), gq = Q(S, 0, 'On the full pair carrier of twenty-five states', 0.6);
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const x = 300 + j * 56, y = 330 + i * 56; box(x, y, 48, 48, C.cyan, gq, 1.2, 'rgba(63,248,255,0.12)'); }
  lbl('Σ × Σ  ·  25 states', 440, 640, C.white, gq, 22);
  const rows = [['cross-window first-order moments', 16, 'cross-window first-order moments see sixteen'], ['separate means of each window', 7, "the two windows' separate means"], ['both full marginals', 9, 'even both full marginals']];
  rows.forEach(([nm, v, ph], k) => { const q = Q(S, 0, ph, 0.6), y = 360 + k * 130; lbl(nm, 820, y, C.white, q, 22, 'left'); for (let c = 0; c < 25; c++) { const x = 820 + c * 38; box(x, y + 20, 32, 40, c < v ? C.cyan : C.mag, q, 1.2, c < v ? 'rgba(63,248,255,0.35)' : 'rgba(255,60,210,0.3)'); } lbl('seen ' + v + ' · hidden ' + (25 - v), 1780, y, c25(v), q, 20, 'right'); });
  lbl('marginals cannot rebuild cross moments without a model such as independence', 1300, 290, C.gold, Q(S, 0, 'Marginals cannot rebuild cross moments', 0.6), 20);
  void t; void s0;
};
function c25(v) { return v === 16 ? C.cyan : C.gold; }

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['KERNEL', 'C₀ + κ Curv_K', C.cyan, 'A clock is a family of waiting laws'], ['RATES', 'h(0) blind', C.red, 'rates can be blind'], ['MEANS', 'Curv_m = 0', C.gold, 'means can be blind'], ['HISTORY', 'prefixes fix all', C.green, 'finite prefixes fix'], ['DYNAMICS', 'PLd = 0 or leak', C.mag, 'linear dynamics either hide'], ['ERASE', 'hidden ≠ erased', C.orange, 'hidden is not erased']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 20); });
    lbl('LEAN · finite_unobservable_eq_observable_orthogonal', W / 2, 480, C.green, Q(S, 1, 'Lean has frozen') * fade, 19);
    lbl('VOLUMES · clock, rate and mean examples · erasure cases · ray · holonomy · window counts', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory volumes') * fade, 17);
    lbl('CLASSICAL · cylinder sets and measure uniqueness      RECOMPUTED · every number', W / 2, 600, C.white, Q(S, 1, 'the cylinder argument is classical') * fade, 18);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr61(W / 2, 360, 200, 0.5 + t * 0.2, a, { fillBase: true, lab: 0 });
    txt('AURIC FIB ATOM PYRAMID XXXII', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXXII · 局部时钟核与接缝可见性 · TRURETURING FILM 061', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('What a clock can see.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WHAT A CLOCK SEES', kernel: 'CLOCK KERNELS', rates: 'RATE, MEAN, LAW', history: 'HISTORY ORDER', dynamics: 'HIDDEN OR LEAKING', erase: 'HIDDEN IS NOT ERASED', ray: 'THE OCCLUDED RAY', holonomy: 'LOOPS AND PATHS', windows: 'TWO WINDOWS', finale: 'LEDGER' });

function poster61() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr61(480, 520, 320, 0.6, 1, { fillBase: true });
  clock61(1000, 420, 110, 2.0, 1);
  const px = 1180, py = 720, pw = 560, ph = 360, a = 0.5, b = 1, c = 1.5;
  line(px, py, px + pw, py, C.dim, 1, 2); line(px, py, px, py - ph, C.dim, 1, 2);
  curve(z => { const tt = z * 4; return [px + z * pw, py - ph * 2.2 * Math.exp(-a * tt) * (1 - Math.exp(-b * tt)) * (1 - Math.exp(-c * tt))]; }, 60, C.mag, 1, 5);
  txt('ΔS(t) > 0', 1460, 300, { size: 46, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('hidden ≠ erased', 1000, 640, { size: 38, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('FIB 原子金字塔 XXXII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXXII', W / 2, 890, { size: 78, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('时 钟 能 看 见 什 么', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 061', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster61;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
