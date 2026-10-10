/* Film 050 */

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

/* ---- film 050: stable relations and three-dimensional closure ---- */
const _po50 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po50.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po50.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function vec50(v, p, col, a, w = 4, lab, dx = 12) { const O = v(0, 0, 0), q = v(...p); arrow(O[0], O[1], q[0], q[1], col, a, w); if (lab) lblG(lab, q[0] + dx, q[1] - 8, col, a, 24, 'left'); return q; }
function cross50(u, v) { return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]; }
function add50(...vs) { return vs.reduce((acc, v) => acc.map((x, i) => x + v[i])); }
function sc50(k, v) { return v.map(x => k * x); }
function box50(v, u, w, z, col, a, fa = 0.08) {
  const O = [0, 0, 0], pts = [O, u, add50(u, w), w, z, add50(u, z), add50(u, w, z), add50(w, z)].map(p => v(...p));
  const faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]];
  faces.forEach(f => { fillPoly(f.map(i => pts[i]), col, a * fa); strokePoly(f.map(i => pts[i]), col, a, 1.6); });
}
function qmul50(x, y) { const [s, a, b, c] = x, [t, p, q, r] = y; return [s * t - a * p - b * q - c * r, s * p + t * a + (b * r - c * q), s * q + t * b + (c * p - a * r), s * r + t * c + (a * q - b * p)]; }
function qname50(x) { const n = ['1', 'i', 'j', 'k']; for (let i = 0; i < 4; i++) if (Math.abs(Math.abs(x[i]) - 1) < 1e-9) return (x[i] < 0 ? '−' : '') + n[i]; return '?'; }
function qtree50(t) { return t === 'a' ? [0, 1, 0, 0] : t === 'b' ? [0, 0, 1, 0] : qmul50(qtree50(t[0]), qtree50(t[1])); }
/* draw an ordered tree; returns root position */
function tree50(t, x, y, dx, dy, a, lab = l => (l === 'a' ? 'α' : 'β')) {
  const leaves = []; const walk = (s, d) => { if (typeof s === 'string') { leaves.push([s, d]); return; } walk(s[0], d + 1); walk(s[1], d + 1); }; walk(t, 0);
  let k = 0;
  const draw = (s, d) => {
    if (typeof s === 'string') { const p = [x + (k++) * dx, y + d * dy]; lblG(lab(s), p[0], p[1] + 9, s === 'a' ? C.cyan : C.gold, a, 26); return p; }
    const l = draw(s[0], d + 1), r = draw(s[1], d + 1), p = [(l[0] + r[0]) / 2, y + d * dy];
    line(p[0], p[1], l[0], l[1] - 22, C.dim, a, 2); line(p[0], p[1], r[0], r[1] - 22, C.dim, a, 2); dot(p[0], p[1], 7, 'w', a); return p;
  };
  return draw(t, 0);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2), f1 = 1 - Q(S, 1, 'The answer is a volume', 0.6);
  if (f1 > 0) {
    box(760, 400, 260, 160, C.gold, s0 * f1, 2, 'rgba(0,0,0,0.5)'); lblG('T', 890, 495, C.gold, s0 * f1, 44);
    arrow(480, 420, 750, 440, C.cyan, Q(S, 0, 'two inputs', 0.5) * f1, 3); lblG('u', 470, 410, C.cyan, Q(S, 0, 'two inputs', 0.5) * f1, 30, 'right');
    arrow(480, 540, 750, 520, C.cyan, Q(S, 0, 'two inputs', 0.5, 0.2) * f1, 3); lblG('v', 470, 550, C.cyan, Q(S, 0, 'two inputs', 0.5, 0.2) * f1, 30, 'right');
    arrow(1300, 480, 1030, 480, C.mag, Q(S, 0, 'one probe', 0.5) * f1, 3); lblG('w', 1310, 490, C.mag, Q(S, 0, 'one probe', 0.5) * f1, 30, 'left');
    lbl('T(u, v, w) ∈ ℝ', 890, 640, C.white, Q(S, 0, 'three slots', 0.5) * f1, 26);
    const rq = Q(S, 0, 'treats every rotation fairly', 0.8) * f1; ring(890, 480, 260 + 10 * Math.sin(t * 2), C.green, rq * 0.6, 2); lbl('rotate all three together', 890, 780, C.green, rq, 20);
  }
  const q = Q(S, 1, 'The answer is a volume', 0.6, 0.3);
  if (q > 0) {
    const v = v3(640, 520, 130, 0.6 + t * 0.25, 0.42);
    box50(v, [1.3, 0, 0], [0.3, 1.2, 0], [0.2, 0.3, 1.3], C.gold, q);
    [['volume', C.gold, 'The answer is a volume', 330], ['three dimensions', C.white, 'only in three dimensions', 410], ['areas · rotations', C.cyan, 'carries areas', 490], ['tree readout', C.green, 'the whole tree readout', 570], ['loops · seams', C.mag, 'loops and seams', 650]]
      .forEach(([s, col, ph, y]) => chip(1350, y, 460, 54, s, col, Q(S, 1, ph), 22));
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const v = v3(W / 2, 400, 120, 0.5 + t * 0.3, 0.42);
  box50(v, [1.3, 0, 0], [0.3, 1.2, 0], [0.2, 0.3, 1.3], C.gold, rp);
  txt(scramble('AURIC FIB ATOM PYRAMID XXI', rp, 451), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXI · 稳 定 关 系 与 三 维 闭 合', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 050 · AURIC_FIB_STABLE_RELATION_BOUNDARY_THREE_DIMENSIONAL_CLOSURE', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 PROBES ---- */
SCENES.probes = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'A round sphere', 0.6);
  if (f1 > 0) {
    const v = v3(620, 560, 150, 0.6 + t * 0.15, 0.42), uu = [1.3, 0, 0], vv = [0.3, 1.2, 0], B = cross50(uu, vv);
    vec50(v, uu, C.cyan, s0 * f1, 4, 'u'); vec50(v, vv, C.cyan, s0 * f1, 4, 'v');
    vec50(v, sc50(0.75, B), C.gold, Q(S, 0, 'unique product B', 0.6) * f1, 4, 'B(u,v)');
    const wq = Q(S, 0, 'probe B of u and v', 0.6) * f1; vec50(v, [0.9 * Math.cos(t), 0.9 * Math.sin(t), 0.8], C.mag, wq, 3, 'w');
    eqn('g( B(u,v), w ) = T(u, v, w)', 1420, 300, Q(S, 0, 'Together they fix') * f1, C.white, 28);
    lbl('B(u,v) = G⁻¹ t(u,v)   (unique)', 1420, 360, C.gold, Q(S, 0, 'unique product B') * f1, 22);
    chip(1420, 470, 560, 54, 'g alone:  B = 0  ≡  B = ×', C.dim, Q(S, 0, 'Drop the probe') * f1, 22);
    chip(1420, 550, 560, 54, 'probe (e₁, e₂, e₃):  0  vs  1', C.red, Q(S, 0, 'reads zero against one') * f1, 22);
  }
  const q = Q(S, 1, 'A round sphere', 0.6, 0.3);
  if (q > 0) {
    const v = v3(620, 540, 170, 0.5 + t * 0.2, 0.42);
    for (let k = 0; k < 3; k++) { const pts = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * TAU; pts.push(k === 0 ? v(Math.cos(a), Math.sin(a), 0) : k === 1 ? v(Math.cos(a), 0, Math.sin(a)) : v(0, Math.cos(a), Math.sin(a))); } strokePoly(pts, C.dim, q, 1.2, false); }
    const th = t * 0.9; vec50(v, [Math.cos(th), Math.sin(th) * 0.7, Math.sin(th) * 0.7], C.cyan, Q(S, 1, 'carry any direction', 0.6), 4, 'any → any');
    const sq = Q(S, 1, 'fixed seed', 0.6); vec50(v, [1.25, 0, 0], C.gold, sq, 4, 'seed n = e₁');
    lbl('every d ≥ 2 : SO(d) is transitive on the sphere', 1420, 300, C.white, Q(S, 1, 'In every dimension'), 20);
    eqn('T_n(u,v,w) = ⟨u,n⟩⟨v,n⟩⟨w,n⟩', 1420, 380, sq, C.gold, 26);
    lbl('T_n(e₁,e₁,e₁) = 1     T_n(e₂,e₂,e₂) = 0', 1420, 440, C.white, Q(S, 1, 'reads one at e one'), 22);
    chip(1420, 550, 600, 54, 'each direction fair  ≠  triple contract', C.red, Q(S, 1, 'the triple contract fails'), 21);
  }
};

/* ---- 03 CLOSURE ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Only three dimensions survive', 0.6);
  eqn('T(Au, Av, Aw) = T(u, v, w)   for all A ∈ SO(d)', 960, 250, Q(S, 0, 'rotate all three inputs together') * Math.max(f1, 0.4), C.green, 26);
  if (f1 > 0) {
    const kill2 = Q(S, 0, 'kills everything', 0.8), kill4 = Q(S, 0, 'kills every coefficient', 1.2);
    lbl('d = 2 : 8 coefficients', 470, 340, C.white, s0 * f1, 20);
    for (let i = 0; i < 8; i++) { const x = 330 + (i % 4) * 70, y = 380 + Math.floor(i / 4) * 70, val = (Math.sin(i * 7.1) * 0.9).toFixed(1); cellv(x, y, 60, kill2 > 0.5 ? '0' : val, kill2 > 0.5 ? C.dim : C.cyan, s0 * f1, 'rgba(0,0,0,0.5)', 0.32); }
    lbl('−I ∈ SO(2) :  T = −T', 470, 560, C.red, Q(S, 0, 'minus the identity', 0.5) * f1, 22);
    lbl('d = 4 : 64 coefficients', 1300, 340, C.white, Q(S, 0, 'From four up', 0.5) * f1, 20);
    for (let i = 0; i < 64; i++) { const x = 1060 + (i % 16) * 30, y = 380 + Math.floor(i / 16) * 30, off = clamp(kill4 * 64 - i); box(x, y, 26, 26, off > 0.5 ? C.dim : C.gold, Q(S, 0, 'From four up', 0.5) * f1, 1.2, off > 0.5 ? 'rgba(0,0,0,0.4)' : 'rgba(255,207,90,0.35)'); }
    lbl('flip e_p, e_q (det = +1) :  t_ijk = −t_ijk', 1300, 560, C.red, Q(S, 0, 'flipping two axes', 0.5) * f1, 20);
    lbl('every d ≥ 4  ⟹  T = 0', 1300, 610, C.red, Q(S, 0, 'kills every coefficient', 0.5) * f1, 22);
  }
  const q = Q(S, 1, 'Only three dimensions survive', 0.6, 0.3);
  if (q > 0) {
    const sym = (i, j, k) => (i === j || j === k || i === k) ? 0 : ((j - i + 3) % 3 === 1 ? 1 : -1);
    lbl('d = 3 : 27 coefficients', 620, 320, C.white, q, 20);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) {
      const e = sym(i, j, k), x = 330 + (j * 3 + k) * 66, y = 350 + i * 66, live = Q(S, 1, 'only one shape', 0.6);
      cellv(x, y, 58, live > 0.5 ? (e === 0 ? '0' : e > 0 ? '+c' : '−c') : 't', e === 0 ? (live > 0.5 ? C.dim : C.cyan) : C.gold, q, 'rgba(0,0,0,0.5)', 0.3);
    }
    lbl('i = 1, 2, 3 (rows)  ·  (j, k) (columns)', 620, 580, C.dim, q, 16);
    eqn('T = c · vol ,   B = c · ×', 1420, 370, Q(S, 1, 'T is c times the volume'), C.gold, 34);
    chip(1420, 470, 520, 54, 'antisymmetry is forced', C.green, Q(S, 1, 'it is forced'), 22);
    chip(1420, 550, 520, 54, 'reflection:  T → −T', C.red, Q(S, 1, 'A reflection flips'), 22);
    chip(1420, 630, 520, 54, '7D cross product: not SO(7)-fair', C.red, Q(S, 1, 'seven-dimensional cross product'), 20);
  }
};

/* ---- 04 CALIBRATE ---- */
SCENES.calibrate = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Sum it around', 0.6);
  if (f1 > 0) {
    const v = v3(620, 600, 150, 0.6 + t * 0.12, 0.42), uu = [1.3, 0, 0], vv = [0.4, 1.1, 0], Cc = cross50(uu, vv);
    const pg = [[0, 0, 0], uu, add50(uu, vv), vv].map(p => v(...p)); fillPoly(pg, C.cyan, s0 * f1 * 0.15); strokePoly(pg, C.cyan, s0 * f1, 2);
    const tri = [[0, 0, 0], uu, vv].map(p => v(...p)); fillPoly(tri, C.gold, Q(S, 0, 'triangles by one half', 0.6) * f1 * 0.3);
    vec50(v, uu, C.cyan, s0 * f1, 4, 'u'); vec50(v, vv, C.cyan, s0 * f1, 4, 'v'); vec50(v, sc50(0.8, Cc), C.mag, Q(S, 0, 'perpendicular', 0.6) * f1, 4, 'C(u,v)');
    eqn('C = B / c', 1420, 260, Q(S, 0, 'Divide by the signed') * f1, C.white, 30);
    eqn('C ⟂ u ,  C ⟂ v', 1420, 330, Q(S, 0, 'perpendicular') * f1, C.mag, 26);
    eqn('‖C(u,v)‖² = ‖u‖²‖v‖² − ⟨u,v⟩²', 1420, 400, Q(S, 0, 'Gram determinant') * f1, C.white, 24);
    eqn('triangle = ½ ‖C‖ ,   tetrahedron = ⅙ |⟨C(u,v), w⟩|', 1420, 470, Q(S, 0, 'triangles by one half') * f1, C.gold, 22);
  }
  const q = Q(S, 1, 'Sum it around', 0.6, 0.3);
  if (q > 0) {
    const O = [300, 760], hex = []; for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; hex.push([560 + 140 * Math.cos(a), 450 + 140 * Math.sin(a)]); }
    const fan = Q(S, 1, 'from any origin', 1.2);
    hex.forEach((p, k) => { const n = hex[(k + 1) % 6], qq = clamp(fan * 6 - k) * q; fillPoly([O, p, n], k % 2 ? C.cyan : C.mag, qq * 0.12); line(O[0], O[1], p[0], p[1], C.dim, qq, 1.2); });
    strokePoly(hex, C.cyan, q, 2.5); dot(O[0], O[1], 10, 'w', q); lbl('O', O[0] - 20, O[1] + 8, C.white, q, 20, 'right');
    eqn('A = ½ Σ C(pᵢ, pᵢ₊₁)', 560, 680, Q(S, 1, 'area vector'), C.cyan, 28);
    eqn('disc  A = r L / 2      ball  V = r S / 3', 1360, 290, Q(S, 1, 'A disc has area'), C.white, 24);
    const rows = [[2, 1], [3, 3], [4, 6], [7, 21]], dq = Q(S, 1, 'only in three dimensions', 0.6);
    lbl('d', 1200, 380, C.dim, dq, 20); lbl('dim Λ²V', 1360, 380, C.dim, dq, 20); lbl('lost', 1520, 380, C.dim, dq, 20);
    rows.forEach(([d, l], k) => { const y = 430 + k * 50, col = d === 3 ? C.green : C.white; lbl(String(d), 1200, y, col, dq, 24); lbl(String(l), 1360, y, col, dq, 24); lbl(d === 3 ? '0  (iso)' : d === 2 ? '—' : '≥ ' + (l - d), 1520, y, d === 3 ? C.green : C.red, Q(S, 1, d === 7 ? 'in seven' : d === 4 ? 'in four' : 'only in three', 0.5), 22); });
  }
};

/* ---- 05 RULER ---- */
SCENES.ruler = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'But a volume is not a ruler', 0.6);
  if (f1 > 0) {
    const mq = Q(S, 0, 'L u sends w', 0.6) * f1;
    lblG('L_(x,y,z) =', 320, 445, C.white, mq, 28, 'right');
    mgrid(340, 330, [['0', '−z', 'y'], ['z', '0', '−x'], ['−y', 'x', '0']], 110, 70, mq, { colf: v => v === '0' ? C.dim : C.cyan, size: 26 });
    eqn('L_u w = u × w', 1380, 300, Q(S, 0, 'L u sends w') * f1, C.cyan, 30);
    eqn('tr(L_u L_v) = −2 g(u, v)', 1380, 380, Q(S, 0, 'the trace of L u') * f1, C.gold, 30);
    eqn('[L_u, L_v] = L_{u×v}', 1380, 460, Q(S, 0, 'their commutator') * f1, C.green, 30);
    chip(1380, 570, 560, 56, 'u ↦ L_u :  ℝ³ ≅ so(3)', C.white, Q(S, 0, 'Every infinitesimal rotation') * f1, 24);
    const ax = Q(S, 0, 'Every infinitesimal', 0.6) * f1, v = v3(500, 680, 80, t * 0.6, 0.4);
    const pts = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * TAU; pts.push(v(Math.cos(a), Math.sin(a), 0)); } strokePoly(pts, C.cyan, ax, 2, false);
    vec50(v, [0, 0, 1.4], C.gold, ax, 3, 'u'); const a0 = t * 2; vec50(v, [Math.cos(a0), Math.sin(a0), 0], C.cyan, ax, 3);
  }
  const q = Q(S, 1, 'But a volume is not a ruler', 0.6, 0.3);
  if (q > 0) {
    const el = (cx, cy, rx, ry, col, a) => { const p = []; for (let i = 0; i <= 72; i++) { const th = i / 72 * TAU; p.push([cx + rx * Math.cos(th), cy + ry * Math.sin(th)]); } fillPoly(p, col, a * 0.1); strokePoly(p, col, a, 2.5, false); };
    const R = 110, m1 = Q(S, 1, 'The identity metric', 0.6), m2 = Q(S, 1, 'diag four', 0.6);
    el(520, 520, R, R, C.cyan, m1); lbl('g = I', 520, 340, C.cyan, m1, 24);
    el(1000, 520, R / 2, R * 2, C.mag, m2); lbl('g = diag(4, ¼, 1)', 1000, 270, C.mag, m2, 22);
    lbl('unit balls in the (e₁, e₂) plane · equal area', 760, 790, C.dim, Math.max(m1, m2) * q, 17);
    const aq = Q(S, 1, 'the same two inputs', 0.6);
    arrow(520, 520, 520 + R, 520, C.gold, aq, 4); lblG('e₁', 520 + R + 14, 512, C.gold, aq, 26, 'left');
    arrow(1000, 520, 1000 + R / 4, 520, C.gold, aq, 4); lblG('e₁ / 4', 1000 + R / 4 + 14, 512, C.gold, aq, 26, 'left');
    lbl('B(e₂, e₃)', 760, 530, C.white, aq, 22);
    eqn('same volume form  T = det', 1460, 380, Q(S, 1, 'have the same volume form'), C.white, 26);
    chip(1460, 500, 520, 56, 'volume ≠ ruler', C.red, Q(S, 1, 'give e one in one'), 26);
    chip(1460, 590, 520, 56, 'calibration must be supplied', C.gold, Q(S, 1, 'must be supplied'), 22);
  }
};

/* ---- 06 QUATERNION ---- */
SCENES.quaternion = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Now it is associative', 0.6);
  if (f1 > 0) {
    eqn('(e₁ × e₁) × e₂ = 0', 560, 330, Q(S, 0, 'The cross product alone') * f1, C.white, 30);
    eqn('e₁ × (e₁ × e₂) = −e₂', 560, 410, Q(S, 0, 'grouping the other way') * f1, C.white, 30);
    chip(560, 510, 560, 56, 'cross product alone: not associative', C.red, Q(S, 0, 'grouping the other way', 0.6, 0.5) * f1, 22);
    const pq = Q(S, 0, 'Keep the contracted term', 0.6) * f1;
    eqn('(s, u) · (t, v) = ( st − ⟨u, v⟩ ,  sv + tu + u × v )', 1300, 650, pq, C.gold, 28);
    lbl('contracted term', 1010, 700, C.green, Q(S, 0, 'the contracted term', 0.6) * f1, 18); lbl('area term', 1560, 700, C.cyan, Q(S, 0, 'the area term', 0.6) * f1, 18);
    chip(1300, 780, 420, 56, '= the quaternions ℍ', C.green, Q(S, 0, 'becomes the quaternions') * f1, 24);
    const v = v3(1400, 400, 120, 0.6 + t * 0.2, 0.42), sq = s0 * f1;
    vec50(v, [1.3, 0, 0], C.cyan, sq, 3, 'i'); vec50(v, [0, 1.3, 0], C.gold, sq, 3, 'j'); vec50(v, [0, 0, 1.3], C.mag, sq, 3, 'k');
  }
  const q = Q(S, 1, 'Now it is associative', 0.6, 0.3);
  if (q > 0) {
    chip(520, 320, 520, 56, '(xy)z = x(yz)', C.green, Q(S, 1, 'Now it is associative'), 26);
    chip(520, 400, 520, 56, 'N(xy) = N(x) N(y)', C.gold, Q(S, 1, 'the norm multiplies'), 26);
    chip(520, 480, 520, 56, 'x⁻¹ = x̄ / N(x)', C.cyan, Q(S, 1, 'has an inverse'), 26);
    const v = v3(1300, 560, 160, 0.55 + t * 0.1, 0.42), n = [0.35, 0.3, 1].map(x => x / Math.hypot(0.35, 0.3, 1)), rq = Q(S, 1, 'Rodrigues rotation', 0.6);
    vec50(v, sc50(1.4, n), C.gold, q, 3, 'n');
    const uu = [1.1, 0, 0.2], th = t * 1.2, nu = n[0] * uu[0] + n[1] * uu[1] + n[2] * uu[2], cr = cross50(n, uu);
    const Ru = a => add50(sc50(Math.cos(a), uu), sc50(Math.sin(a), cr), sc50(nu * (1 - Math.cos(a)), n));
    const cone = []; for (let i = 0; i <= 60; i++) cone.push(v(...Ru(i / 60 * TAU))); strokePoly(cone, C.cyan, rq * 0.6, 1.5, false);
    vec50(v, Ru(th), C.cyan, rq, 4, 'R u');
    eqn('q = (cos θ/2 , n sin θ/2)', 1300, 270, Q(S, 1, 'Conjugating by a unit'), C.white, 24);
    eqn('q (0, u) q⁻¹ = (0, R_{θ,n} u)', 1300, 330, rq, C.cyan, 26);
    chip(520, 620, 520, 56, 'q and −q : the same rotation', C.mag, Q(S, 1, 'q and minus q'), 22);
  }
};

/* ---- 07 TREES ---- */
SCENES.trees = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The readout forgets', 0.6);
  const Q8 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [-1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -1, 0], [0, 0, 0, -1]];
  if (f1 > 0) {
    const tq = Q(S, 0, 'Read every ordered tree', 0.6) * f1, T = [['b', 'a'], 'a'];
    tree50(T, 300, 300, 120, 110, tq, l => (l === 'a' ? 'α' : 'β'));
    lbl('j', 300, 570, C.gold, Q(S, 0, 'alpha is i', 0.5) * f1, 24); lbl('i', 420, 570, C.cyan, Q(S, 0, 'alpha is i', 0.5) * f1, 24); lbl('i', 540, 460, C.cyan, Q(S, 0, 'alpha is i', 0.5) * f1, 24);
    lbl('(j · i) · i = −k · i = −j', 420, 650, C.white, Q(S, 0, 'a pair is the product', 0.6) * f1, 24);
    const cx = 1320, cy = 470, R = 200, rq = Q(S, 0, 'every value lies', 0.6) * f1;
    Q8.forEach((x, k) => { const a = -Math.PI / 2 + k * TAU / 8, p = [cx + R * Math.cos(a), cy + R * Math.sin(a)]; dot(p[0], p[1], 12, 'w', Math.max(rq, 0.25 * f1 * s0)); lblG(qname50(x), p[0] + 34 * Math.cos(a), p[1] + 34 * Math.sin(a) + 9, C.white, Math.max(rq, 0.3 * f1 * s0), 24); });
    lbl('Q₈', cx, cy + 10, C.dim, rq, 26);
    const cyc = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, -1]], pos = x => { const k = Q8.findIndex(y => y.every((z, i) => z === x[i])), a = -Math.PI / 2 + k * TAU / 8; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; };
    const cq = Q(S, 0, 'a single rotation R', 0.8) * f1;
    cyc.forEach((x, k) => { const p = pos(x), n = pos(cyc[(k + 1) % 3]); arrow(p[0] + (n[0] - p[0]) * 0.12, p[1] + (n[1] - p[1]) * 0.12, n[0] - (n[0] - p[0]) * 0.12, n[1] - (n[1] - p[1]) * 0.12, C.mag, cq, 3); });
    eqn('Q(ρ t) = R Q(t) ,   R³ = I', 1320, 760, cq, C.mag, 28);
    lbl('i → j → −k → i', 1320, 810, C.mag, cq, 20);
  }
  const q = Q(S, 1, 'The readout forgets', 0.6, 0.3);
  if (q > 0) {
    const c1 = Q(S, 1, 'Two bracketings', 0.6);
    tree50([['a', 'a'], 'b'], 260, 270, 70, 60, c1); tree50(['a', ['a', 'b']], 500, 270, 70, 60, c1);
    lbl('−j', 330, 470, C.red, c1, 26); lbl('−j', 570, 470, C.red, c1, 26);
    const c2 = Q(S, 1, 'alpha alpha and beta beta', 0.6);
    tree50(['a', 'a'], 860, 270, 80, 70, c2); tree50(['b', 'b'], 1120, 270, 80, 70, c2);
    lbl('−1   quantity 4', 900, 430, C.red, c2, 22); lbl('−1   quantity 6', 1160, 430, C.red, c2, 22);
    const mq = Q(S, 1, 'the five modes read', 0.6), modes = [['[null]', '1', C.white], ['[2]', 'a', C.cyan], ['[3]', 'b', C.gold], ['[5]', 'c', C.mag], ['[25]', '−b', C.green]];
    modes.forEach(([m, r, col], k) => { const x = 440 + k * 200, qq = Q(S, 1, 'the five modes read', 0.5, k * 0.25); box(x - 80, 520, 160, 100, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(m, x, 558, col, qq, 22); lblG(r, x, 604, C.white, qq, 30); });
    lbl('chosen representatives · reversing the last gives +b, quantity still 7', 840, 660, C.dim, mq, 17);
    chip(1500, 380, 500, 56, '[null] still acts', C.white, Q(S, 1, 'the null window still'), 22);
    eqn('(2, 1) → (4, 7) :  7 → 29', 1500, 470, Q(S, 1, 'two, one to four, seven'), C.gold, 26);
  }
};

/* ---- 08 FINITE ---- */
SCENES.finite = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Average over the group', 0.6);
  if (f1 > 0) {
    lbl('H_d = signed axis permutations, det = +1 ,  |H_d| = 2^(d−1) d!', 960, 270, C.white, Q(S, 0, 'Signed permutations') * f1, 22);
    const X0 = 420, Y0 = 680, bw = 100;
    line(X0 - 30, Y0, X0 + 9 * (bw + 20), Y0, C.dim, s0 * f1, 1.5);
    for (let d = 2; d <= 10; d++) {
      const x = X0 + (d - 2) * (bw + 20), qq = Q(S, 0, 'fixed three-slot tensors', 0.4, (d - 2) * 0.2) * f1, fd = d === 3 ? 1 : 0;
      if (fd) { fillBox(x, Y0 - 240, bw, 240, C.gold, qq * 0.5); rect50(x, Y0 - 240, bw, 240, C.gold, qq); lbl('vol', x + bw / 2, Y0 - 255, C.gold, Q(S, 0, 'only the volume line', 0.5) * f1, 22); }
      else { fillBox(x, Y0 - 4, bw, 4, C.red, qq); }
      lbl('d = ' + d, x + bw / 2, Y0 + 34, C.white, qq, 20); lbl(String(fd), x + bw / 2, Y0 - 16 - (fd ? 240 : 0), fd ? C.gold : C.red, qq, 22);
    }
    lbl('dimension of the fixed 3-slot tensors', 960, 340, C.dim, Q(S, 0, 'fixed three-slot tensors') * f1, 18);
  }
  const q = Q(S, 1, 'Average over the group', 0.6, 0.3);
  if (q > 0) {
    eqn('P_H T = |H|⁻¹ Σ A·T ,   dist(T, ℝ vol) ≤ max_A ‖A·T − T‖', 960, 280, q, C.white, 24);
    const cx = 620, cy = 560, pq = Q(S, 1, 'x to the fourth plus', 0.8), f = th => Math.pow(Math.cos(th), 4) + Math.pow(Math.sin(th), 4);
    curve(s => { const th = s * TAU, r = 60 + 160 * f(th); return [cx + r * Math.cos(th), cy + r * Math.sin(th)]; }, 200, C.cyan, pq, 3);
    ring(cx, cy, 60 + 160 * 0.5, C.dim, pq * 0.5, 1);
    lbl('x⁴ + y⁴ on the unit circle', cx, cy + 270, C.dim, pq, 17);
    chip(1380, 420, 560, 56, 'passes every signed permutation', C.green, Q(S, 1, 'passes every signed'), 22);
    eqn('axis (1,0,0) :  1', 1380, 520, Q(S, 1, 'one on an axis'), C.white, 28);
    eqn('diagonal (1,1,1)/√3 :  1/3', 1380, 590, Q(S, 1, 'one third on the diagonal'), C.red, 28);
    chip(1380, 690, 560, 56, 'the check stops at third order', C.red, Q(S, 1, 'stops at third order'), 22);
  }
};
function rect50(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }

/* ---- 09 MONSTER ---- */
SCENES.monster = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'published'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'A symmetric cubic that is fair', 0.6);
  if (f1 > 0) {
    txt('196883', 620, 470, { size: 120, fam: F.orb, w: 900, align: 'center', c: C.mag, a: Q(S, 0, 'one hundred ninety-six', 0.8) * f1, ab: 4 });
    lbl('dim W ,  W = e⊥ in the first layer', 620, 540, C.dim, Q(S, 0, 'one hundred ninety-six', 0.6) * f1, 20);
    eqn('positive metric g', 1400, 320, Q(S, 0, 'a positive metric') * f1, C.cyan, 28);
    eqn('symmetric cubic  T♮(u,v,w) = g(u·v, w)', 1400, 390, Q(S, 0, 'a symmetric cubic') * f1, C.gold, 26);
    chip(1400, 500, 560, 60, 'Stab  T♮  ≅  MONSTER', C.mag, Q(S, 0, 'is the Monster') * f1, 26);
    lbl('Griess algebra · moonshine module', 1400, 570, C.dim, Q(S, 0, 'is the Monster', 0.6) * f1, 18);
  }
  const q = Q(S, 1, 'A symmetric cubic that is fair', 0.6, 0.3);
  if (q > 0) {
    eqn('symmetric  +  SO(d)-fair   ⟹   T = 0', 960, 290, q, C.red, 30);
    lbl('so T♮ ≠ 0 is not rotation fair', 960, 340, C.dim, Q(S, 1, 'so this one is not', 0.6), 20);
    const rows = [['', 'calibrated directions', 'moonshine first layer'], ['metric', '3D, positive', '196883D, positive'], ['third order', 'alternating volume', 'symmetric T♮'], ['product', 'associative, not commutative', 'commutative, not associative'], ['keeping group', 'SO(3)', 'Monster']];
    rows.forEach((r, k) => { const y = 430 + k * 66, qq = Q(S, 1, 'One system is commutative', 0.5, k * 0.25); r.forEach((c, j) => lbl(c, [430, 960, 1490][j], y, k === 0 ? C.dim : j === 1 ? C.cyan : j === 2 ? C.mag : C.white, qq, k === 0 ? 20 : 22)); if (k) line(260, y + 22, 1660, y + 22, C.dim, qq * 0.4, 1); });
    chip(960, 800, 720, 56, 'two labels + a dimension count ≠ the Monster', C.gold, Q(S, 1, 'do not build the Monster'), 22);
  }
};

/* ---- 10 LOOPS ---- */
SCENES.loops = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'Lean has frozen', 'lean'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Two parallel edges', 0.6);
  if (f1 > 0) {
    const N = [[360, 380], [620, 300], [620, 520], [880, 410]], nq = s0 * f1;
    [[0, 1], [0, 2], [1, 3], [2, 3], [1, 2]].forEach(([a, b]) => { line(N[a][0], N[a][1], N[b][0], N[b][1], C.cyan, nq, 2.5); });
    N.forEach(p => { strokePoly(ringPts(p[0], p[1], 30, 3), C.gold, nq, 2.5); });
    lbl('invariant pieces · typed seams', 620, 640, C.dim, Q(S, 0, 'typed seams', 0.6) * f1, 18);
    eqn('Σ_jk ε_ijk ε_ljk = 2 δ_il', 620, 700, Q(S, 0, 'contracted twice') * f1, C.gold, 26);
    eqn('every closed walk = I  ⟺  one global frame makes every edge I', 1340, 300, Q(S, 0, 'every closed walk is trivial') * f1, C.white, 21);
    const lq = Q(S, 0, 'Lean has frozen', 0.6) * f1;
    box(1040, 380, 600, 140, C.green, lq, 2, 'rgba(0,0,0,0.5)');
    lbl('LEAN · AgencyHolonomy.ZeroLoopPotentialEquivalence', 1340, 418, C.green, lq, 17);
    lbl('C(loop) = 0 on every loop', 1340, 456, C.white, Q(S, 0, 'zero on every loop', 0.5) * f1, 21);
    lbl('⟺  C(x → y) = φ(y) − φ(x)', 1340, 494, C.white, Q(S, 0, 'difference of potentials', 0.5) * f1, 21);
  }
  const q = Q(S, 1, 'Two parallel edges', 0.6, 0.3);
  if (q > 0) {
    const A = [520, 520], B = [940, 520];
    const arc = (sgn, col, a) => curve(s => [A[0] + (B[0] - A[0]) * s, A[1] - sgn * 150 * Math.sin(Math.PI * s)], 60, col, a, 3.5);
    arc(1, C.cyan, q); arc(-1, C.mag, Q(S, 1, 'one turned by R', 0.6));
    lbl('p : I', 730, 350, C.cyan, q, 22); lbl('q : R', 730, 710, C.mag, Q(S, 1, 'one turned by R', 0.6), 22);
    const lq = Q(S, 1, 'a self loop', 0.6); ring(A[0] - 90, A[1], 90, C.gold, lq, 3); lbl('ℓ : R', A[0] - 200, A[1] - 100, C.gold, lq, 22);
    dot(A[0], A[1], 16, 'w', q); dot(B[0], B[1], 16, 'w', q); lbl('0', A[0], A[1] + 46, C.white, q, 22); lbl('1', B[0], B[1] + 46, C.white, q, 22);
    const hq = Q(S, 1, 'the loop through both edges', 0.6);
    if (hq > 0) { const ph = (t * 0.35) % 1, s = ph < 0.5 ? ph * 2 : 2 - ph * 2, sg = ph < 0.5 ? 1 : -1; dot(A[0] + (B[0] - A[0]) * s, A[1] - sg * 150 * Math.sin(Math.PI * s), 12, 'r', hq); }
    mgrid(1300, 380, [['0', '1', '0'], ['0', '0', '−1'], ['−1', '0', '0']], 90, 64, hq, { colf: v => v === '0' ? C.dim : C.red, size: 24 });
    lbl('H(p q̄) = R⁻¹ ≠ I', 1435, 350, C.red, hq, 24);
    chip(1435, 650, 520, 56, 'no change of frame removes it', C.red, Q(S, 1, 'no change of frame'), 22);
    lbl('every edge keeps metric and volume', 1435, 720, C.dim, Q(S, 1, 'every edge keeps', 0.6), 18);
  }
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['THREE', 'fair ⟹ c · vol', C.gold, 'chooses three dimensions'], ['AREAS', '½ ‖u × v‖', C.cyan, 'it measures areas'], ['QUATERNIONS', 'Q(ρt) = R Q(t)', C.green, 'becomes the quaternions'], ['LOOPS', 'R⁻¹ ≠ I', C.mag, 'loops keep a record']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 26); lblG(a2, x, 350, C.white, q, 22); });
    lbl('LEAN · ZeroLoopPotentialEquivalence · zero on every loop ⟺ potential difference', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 20);
    lbl('VOLUME · selection · calibration · tree readout · finite check · networks   CLASSICAL · cross product · quaternions', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 18);
    lbl('PUBLISHED · Monster identification      RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'Monster identification is published') * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, v = v3(W / 2, 420, 100, 0.5 + t * 0.3, 0.42);
    box50(v, [1.3, 0, 0], [0.3, 1.2, 0], [0.2, 0.3, 1.3], C.gold, a);
    txt('AURIC FIB ATOM PYRAMID XXI', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXI · 稳定关系与三维闭合 · TRURETURING FILM 050', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Fair to every rotation, only volume survives.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'THREE SLOTS', probes: 'PROBES AND FAIRNESS', closure: 'ONLY VOLUME SURVIVES', calibrate: 'AREAS AND VOLUMES', ruler: 'GENERATORS AND RULERS', quaternion: 'KEEP THE CONTRACTION', trees: 'TREES IN Q8', finite: 'A FINITE CHECK', monster: 'THE MONSTER', loops: 'SEAMS AND LOOPS', finale: 'LEDGER' });

function poster50() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const v = v3(560, 520, 170, 0.75, 0.42);
  box50(v, [1.3, 0, 0], [0.3, 1.2, 0], [0.2, 0.3, 1.3], C.gold, 1, 0.12);
  txt('T = c · vol', 1370, 300, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('d = 3 only', 1370, 390, { size: 36, fam: FG, w: 700, align: 'center', c: C.white });
  txt('Q(ρt) = R Q(t) ∈ Q₈', 1370, 480, { size: 36, fam: FG, w: 700, align: 'center', c: C.green });
  txt('H = R⁻¹ ≠ I', 1370, 570, { size: 36, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('FIB 原子金字塔 XXI', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXI', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('对 每 次 旋 转 公 平 · 只 有 体 积 留 下', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 050', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster50;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
