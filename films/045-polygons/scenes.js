/* Film 045 — AURIC FIB ATOM PYRAMID XVI: intrinsic classes and polygon geometry */

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


/* ---- film 045: polygons, ears and intrinsic classes ---- */
/* phase progress keyed to a phrase of narration line k (offset = character position / length × line duration) */
const _po45 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po45.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po45.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function frame45(x0, y0, w, h, xa, xb, ya, yb) { return (x, y) => [x0 + (x - xa) / (xb - xa) * w, y0 - (y - ya) / (yb - ya) * h]; }
function poly45(pts, col, a, fill = 0.14, lw = 2.5) { if (a <= 0) return; fillPoly(pts, col, a * fill); strokePoly(pts, col, a, lw); }
function reg45(cx, cy, R, N, rot = -Math.PI / 2) { return ringPts(cx, cy, R, N, rot); }
const FB45 = (() => { const f = [0, 1]; for (let i = 0; i < 40; i++) f.push(f[f.length - 1] + f[f.length - 2]); return f; })();
const TREE45 = (() => { const T = ['a', 'b']; for (let n = 2; n <= 12; n++) T.push(T[n - 1] + T[n - 2]); return T; })();
const MODE45 = [['∅', 'O', []], ['1', 'L', [1]], ['2', 'T', [2]], ['3', 'R', [3]], ['13', 'J', [1, 3]]];
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2), cx = 760, cy = 520, R = 300;
  const pts = reg45(cx, cy, R, 9, -Math.PI / 2 - 0.2);
  const cut = ease(Q(S, 0, 'cut one ear', 1.6));
  const shown = pts.filter((_, i) => !(i === 2 && cut >= 1));
  poly45(shown, C.cyan, s0, 0.08);
  /* ear at vertex 2 */
  const ear = [pts[1], pts[2], pts[3]];
  fillPoly(ear, C.gold, s0 * 0.25 * (1 - cut * 0.6));
  if (cut > 0) { const o = 60 * cut; const dx = (pts[2][0] - cx) / R * o, dy = (pts[2][1] - cy) / R * o; strokePoly(ear.map(p => [p[0] + dx, p[1] + dy]), C.gold, s0 * (1 - 0.5 * cut), 2.5); line(pts[1][0], pts[1][1], pts[3][0], pts[3][1], C.gold, s0, 3); }
  [0, 1, 2, 3, 4].forEach(i => dot(pts[i][0], pts[i][1], 11, i >= 1 && i <= 3 ? 'g' : 'w', s0));
  lbl('five recorded vertices', cx, cy + R + 60, C.white, Q(S, 0, 'recorded boundary'));
  chip(1420, 360, 520, 58, 'where do five modes come from?', C.gold, Q(S, 0, 'ask where'), 22);
  chip(1420, 470, 520, 58, 'a fight over shared edges', C.green, Q(S, 1, 'fight'), 22);
  ['complement', 'reflection', 'sign flip'].forEach((s, i) => chip(1420, 580 + i * 70, 400, 50, s, [C.cyan, C.mag, C.orange][i], Q(S, 1, ['a complement', 'a reflection', 'a sign flip'][i]), 20));
  lbl('three operations · three backgrounds', 1420, 810, C.dim, Q(S, 1, 'different background'), 20);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const pts = reg45(W / 2, 400, 210, 5, -Math.PI / 2 + t * 0.15);
  poly45(pts, C.cyan, rp, 0.06);
  strokePoly([0, 2, 4, 1, 3].map(i => pts[i]), C.gold, rp * 0.9, 2);
  pts.forEach((p, i) => dot(p[0], p[1], 12, ['w', 'c', 'g', 'm', 'n'][i], rp));
  txt(scramble('AURIC FIB ATOM PYRAMID XVI', rp, 446), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XVI · 内 生 分 类 与 多 边 形 几 何', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 045 · AURIC_FIB_ATOM_INTRINSIC_CLASSIFICATION_AND_POLYGON_GEOMETRY', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 TRIANGLE ---- */
SCENES.triangle = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, 'Four equal sides', 'theory']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Four equal sides', 0.6);
  if (fade > 0) {
    const O = [420, 700], U = [880, 700], V = [640 + 40 * Math.sin(t * 0.7), 360];
    arrow(O[0], O[1], U[0], U[1], C.cyan, s0 * fade, 4); arrow(O[0], O[1], V[0], V[1], C.mag, s0 * fade, 4);
    dashed(U[0], U[1], V[0], V[1], C.gold, Q(S, 0, 'minus c squared') * fade, 3);
    lbl('a = |u|', 650, 745, C.cyan, s0 * fade); lbl('b = |v|', 470, 500, C.mag, s0 * fade, 22, 'right'); lbl('c = |u − v|', 820, 510, C.gold, Q(S, 0, 'minus c squared') * fade, 22, 'left');
    fillPoly([O, U, V], C.green, Q(S, 0, 'signed area') * fade * 0.15);
    eqn('g = (a² + b² − c²) / 2 = ⟨u, v⟩', 1350, 300, Q(S, 0, 'inner product') * fade, C.white, 28);
    eqn('4τ² = a²b² − g²', 1350, 380, Q(S, 0, 'four tau squared') * fade, C.green, 30);
    eqn('16A² = 2a²b² + 2b²c² + 2c²a² − a⁴ − b⁴ − c⁴', 1350, 490, Q(S, 1, 'Heron', 0.6) * fade, C.gold, 24);
    lbl('three sides → unique up to mirror', 1350, 560, C.dim, Q(S, 1, 'mirror') * fade, 20);
  }
  const q = Q(S, 1, 'Four equal sides', 0.6, 0.3);
  if (q > 0) {
    const th = Math.PI / 2 + (Math.PI / 6 - Math.PI / 2) * (0.5 - 0.5 * Math.cos(t * 0.9)), l = 300, O = [520, 700];
    const A = [O[0] + l, O[1]], B = [O[0] + l * Math.cos(th), O[1] - l * Math.sin(th)], Cc = [A[0] + B[0] - O[0], A[1] + B[1] - O[1]];
    poly45([O, A, Cc, B], C.cyan, q, 0.16, 3);
    [O, A, Cc, B].forEach(p => dot(p[0], p[1], 10, 'w', q));
    lbl('side 1, angle ' + Math.round(th * 180 / Math.PI) + '°', 680, 780, C.white, q);
    eqn('area = ℓ² sin θ = ' + Math.sin(th).toFixed(2), 1350, 360, q, C.cyan, 30);
    chip(1350, 470, 520, 56, 'θ = 90° → area 1', C.green, Q(S, 1, 'area one'), 22);
    chip(1350, 550, 520, 56, 'θ = 30° → area 1/2', C.mag, Q(S, 1, 'one half'), 22);
    lbl('four equal sides do not fix the area', 1350, 640, C.red, Q(S, 1, 'one half', 0.5, 0.6), 20);
  }
};

/* ---- 03 REGULAR ---- */
SCENES.regular = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Reflecting', 0.6);
  if (fade > 0) {
    for (let N = 3; N <= 8; N++) {
      const x = 330 + (N - 3) * 252, y = 420, q = Q(S, 0, N === 3 ? 'acute only' : N === 4 ? 'right only' : 'obtuse beyond', 0.5, (N - 5) * 0.15 * (N >= 5));
      const col = N === 3 ? C.cyan : N === 4 ? C.gold : C.mag;
      poly45(reg45(x, y, 95, N), col, Math.max(s0 * 0.35, q) * fade, 0.1);
      lbl(N + '-gon', x, y + 140, C.white, s0 * fade, 20);
      lbl(Math.round(180 - 360 / N) + '°', x, y + 175, col, Math.max(q, 0) * fade, 24);
    }
    eqn('θ_N = π − 2π/N', 960, 250, Q(S, 0, 'interior angle') * fade, C.white, 30);
    lbl('acute', 330, 680, C.cyan, Q(S, 0, 'acute only') * fade); lbl('right', 582, 680, C.gold, Q(S, 0, 'right only') * fade); lbl('obtuse', 1212, 680, C.mag, Q(S, 0, 'obtuse beyond') * fade);
    chip(960, 770, 680, 56, 'all < π  ⟹  no concave regular polygon', C.green, Q(S, 0, 'no regular polygon'), 22);
  }
  const q = Q(S, 1, 'Reflecting', 0.6, 0.3);
  if (q > 0) {
    const O = [520, 600], L = 230, a1 = Math.PI / 3, a2 = 2 * Math.PI / 3, k = ease(Q(S, 1, 'turning sixty', 1.2));
    const av = lerp(a1, a2, k);
    arrow(O[0], O[1], O[0] + L, O[1], C.cyan, q, 4); lbl('u', O[0] + L + 22, O[1] + 8, C.cyan, q);
    arrow(O[0], O[1], O[0] + L * Math.cos(av), O[1] - L * Math.sin(av), C.mag, q, 4);
    dashed(O[0], O[1] + 40, O[0], O[1] - 280, C.dim, q, 1.5);
    lbl(Math.round(av * 180 / Math.PI) + '°', O[0] + 70, O[1] - 60, C.gold, q, 26);
    eqn('R_u : g → −g,   det(u, R_u v) = det(u, v)', 520, 300, Q(S, 1, 'flips the inner'), C.white, 24);
    /* class complement */
    const cls = ['P₃', 'P₄', 'P₅', 'P₆', 'P₇', '…'], rm = Q(S, 1, 'unless the square', 0.8), cq = Q(S, 1, 'complement of the triangle');
    cls.forEach((c, i) => {
      const x = 1100 + i * 100, y = 420, isT = i === 0, isQ = i === 1;
      const inComp = !isT && !(isQ && rm > 0.5);
      box(x - 40, y - 40, 80, 70, isT ? C.cyan : inComp && cq > 0 ? C.mag : C.dim, cq * (isQ ? 1 - 0.7 * rm : 1), 2, 'rgba(0,0,0,0.4)');
      txt(c, x, y + 8, { size: 26, fam: FG, w: 700, align: 'center', c: isT ? C.cyan : C.white, a: cq * (isQ ? 1 - 0.7 * rm : 1) });
    });
    lbl('complement of {P₃} in all regular classes', 1350, 330, C.mag, cq, 20);
    lbl(rm > 0.5 ? 'background without P₄: complement = N ≥ 5' : 'still contains the square', 1350, 520, rm > 0.5 ? C.green : C.gold, Q(S, 1, 'still contains'), 22);
  }
};

/* ---- 04 FLIP ---- */
SCENES.flip = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Squared area', 0.6);
  if (fade > 0) {
    const pts = reg45(560, 520, 260, 6, -Math.PI / 2);
    poly45(pts, C.cyan, s0 * fade, 0.06);
    /* triangulation sequence: zig-zag → fan from vertex 0 via flips */
    const tris = [[[1, 5], [1, 4], [2, 4]], [[0, 4], [1, 4], [2, 4]], [[0, 4], [0, 2], [2, 4]], [[0, 4], [0, 2], [0, 3]]];
    const st = Math.min(3, Math.floor(Math.max(0, S.u - lineAt(S, 0).s - 2) / 2.2) % 4);
    tris[st].forEach(([i, j], k) => line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], [C.gold, C.mag, C.green][k], s0 * fade, 3));
    pts.forEach(p => dot(p[0], p[1], 10, 'w', s0 * fade));
    lbl('N − 2 = 4 triangles · same area', 560, 860, C.white, Q(S, 0, 'N minus two') * fade);
    eqn('K(a,b,c) + K(a,c,d) = K(a,b,d) + K(b,c,d)', 1350, 300, Q(S, 0, 'four-point flip') * fade, C.gold, 26);
    eqn('K = ½[det(a,b) + det(b,c) + det(c,a)]', 1350, 400, Q(S, 0, 'shoelace kernel') * fade, C.green, 26);
    chip(1350, 500, 420, 56, 'shoelace passes ✓', C.green, Q(S, 0, 'passes') * fade, 24);
  }
  const q = Q(S, 1, 'Squared area', 0.6, 0.3);
  if (q > 0) {
    const sq = (x0, y0, d1) => { const f = frame45(x0, y0, 330, 220, 0, 3, 0, 2); const P_ = [[0, 0], [3, 0], [2, 1], [0, 2]].map(p => f(...p)); const T = d1 ? [[0, 1, 2], [0, 2, 3]] : [[0, 1, 3], [1, 2, 3]]; T.forEach((tr, k) => poly45(tr.map(i => P_[i]), k ? C.mag : C.cyan, q, 0.2, 2)); return P_; };
    sq(330, 620, true); sq(1000, 620, false);
    lbl('areas 3/2 + 2', 495, 680, C.white, Q(S, 1, 'seven halves')); lbl('areas 3 + 1/2', 1165, 680, C.white, Q(S, 1, 'seven halves'));
    lbl('total 7/2', 495, 720, C.green, Q(S, 1, 'seven halves')); lbl('total 7/2', 1165, 720, C.green, Q(S, 1, 'seven halves'));
    lbl('Σ area² = 25/4', 495, 780, C.red, Q(S, 1, 'twenty-five'), 26); lbl('Σ area² = 37/4', 1165, 780, C.red, Q(S, 1, 'thirty-seven'), 26);
    lbl('(0,0) (3,0) (2,1) (0,2)', 830, 290, C.dim, Q(S, 1, 'zero zero'), 20);
    chip(1530, 470, 300, 56, 'area² ✗', C.red, Q(S, 1, 'thirty-seven', 0.5, 0.5), 24);
    lbl('passes on every square', 1530, 380, C.gold, Q(S, 1, 'passes on every'), 18);
  }
};

/* ---- 05 CONFLICT ---- */
SCENES.conflict = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, 'N open edges', 'classical']]);
  const s0 = clamp(u), f = frame45(300, 640, 760, 360, 0, 4, 0, 1.2);
  const V = [0, 1, 2, 3, 4].map(i => f(i, 1 - Math.pow((i - 2) / 2.3, 2)));
  for (let i = 0; i < 4; i++) { line(V[i][0], V[i][1], V[i + 1][0], V[i + 1][1], C.cyan, s0, 3); lbl('e' + (i + 1), (V[i][0] + V[i + 1][0]) / 2, (V[i][1] + V[i + 1][1]) / 2 - 18, C.cyan, s0, 18); }
  V.forEach((p, i) => { dot(p[0], p[1], 11, 'w', s0); lbl('p' + i, p[0], p[1] + 34, C.dim, s0, 18); });
  const CC = [C.cyan, C.gold, C.mag], cand = [[0, 2], [1, 3], [2, 4]];
  const tq = [Q(S, 0, 'vertex one'), Q(S, 0, 'two or three'), Q(S, 0, 'two or three', 0.5, 0.4)];
  cand.forEach(([i, j], k) => { const blink = 0.55 + 0.45 * Math.sin(t * 2 + k * 2); fillPoly([V[i], V[i + 1], V[j]], CC[k], tq[k] * 0.12 * blink); dashed(V[i][0], V[i][1] + 2 * k, V[j][0], V[j][1] + 2 * k, CC[k], tq[k], 2.5); });
  lbl('cut C₁ · C₂ · C₃ : chord replaces two old edges', 680, 760, C.white, Q(S, 0, 'replaces two'), 20);
  chip(680, 830, 620, 50, 'no edge consumed twice in one round', C.red, Q(S, 0, 'no edge may'), 20);
  /* conflict path graph */
  const g = [[1280, 260], [1450, 260], [1620, 260]], gq = Q(S, 1, 'Cuts one and two');
  line(g[0][0], g[0][1], g[1][0], g[1][1], C.red, gq, 3); line(g[1][0], g[1][1], g[2][0], g[2][1], C.red, Q(S, 1, 'as do two'), 3);
  lbl('e₂', 1365, 245, C.red, gq, 18); lbl('e₃', 1535, 245, C.red, Q(S, 1, 'as do two'), 18);
  g.forEach((p, k) => { dot(p[0], p[1], 16, ['c', 'g', 'm'][k], gq); lbl('C' + (k + 1), p[0], p[1] + 44, CC[k], gq, 20); });
  MODE45.forEach(([nm, key, set], k) => {
    const q = Q(S, 1, 'The legal choices', 0.5, k * 0.45), y = 400 + k * 70;
    box(1240, y - 30, 420, 56, NC[key], q, 1.5, 'rgba(0,0,0,0.4)');
    lbl(set.length ? '{' + set.map(i => 'C' + i).join(', ') + '}' : 'none', 1360, y + 6, C.white, q, 22);
    lbl('mode ' + nm, 1560, y + 6, NC[key], q, 22);
  });
  const cq = Q(S, 1, 'N open edges');
  if (cq > 0) { const seq = [1, 2, 3, 5, 8, 13, 21]; lbl('N = 1…7 open edges:', 1450, 760, C.white, cq, 20); lbl(seq.join('  '), 1450, 795, C.gold, cq, 24); }
  chip(1450, 860, 420, 50, 'closed ring of four: 7', C.green, Q(S, 1, 'closed ring'), 20);
};

/* ---- 06 MOMENTS ---- */
SCENES.moments = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Fill a notch', 0.6, 1.4);
  eqn('D = τ₁x + τ₂z + τ₃y', 1350, 240, s0 * fade, C.white, 28);
  eqn('E D = τ₁X + τ₂Z + τ₃Y', 1350, 310, Q(S, 0, 'expected change') * fade, C.cyan, 26);
  eqn('E D² = τ₁²X + τ₂²Z + τ₃²Y + 2τ₁τ₃κ', 1350, 380, Q(S, 0, 'second moment') * fade, C.gold, 26);
  if (fade > 0) {
    const f = frame45(260, 760, 640, 480, 0, 4, 0, 16), P_ = [0, 1, 2, 3, 4].map(i => f(i, i * i)), q = Q(S, 1, 'On a parabola');
    strokePoly(P_, C.cyan, s0 * fade, 2.5, false); line(P_[4][0], P_[4][1], P_[0][0], P_[0][1], C.cyan, s0 * fade * 0.6, 2);
    [1, 2, 3].forEach(i => { fillPoly([P_[i - 1], P_[i], P_[i + 1]], [C.cyan, C.gold, C.mag][i - 1], q * fade * 0.3); });
    P_.forEach(p => dot(p[0], p[1], 9, 'w', s0 * fade));
    lbl('every ear: area 1', 580, 820, C.white, q * fade);
    const rows = [['½ none + ½ both', 'D ∈ {0, 2}', 'E D = 1', 'E D² = 2', C.green], ['½ C₁ + ½ C₃', 'D = 1', 'E D = 1', 'E D² = 1', C.mag]];
    rows.forEach(([a1, a2, a3, a4, col], k) => { const qq = Q(S, 1, k ? 'against half one' : 'Half none') * fade, y = 520 + k * 110; box(1050, y - 40, 600, 80, col, qq, 1.5, 'rgba(0,0,0,0.4)'); lbl(a1, 1190, y - 6, col, qq, 22); lbl(a2, 1190, y + 26, C.dim, qq, 18); lbl(a3, 1400, y + 8, C.white, Q(S, 1, 'same mean change') * fade, 22); lbl(a4, 1560, y + 8, C.gold, Q(S, 1, 'second moments two'), 22); });
  }
  const q = Q(S, 1, 'Fill a notch', 0.6, 1.8);
  if (q > 0) {
    const f = frame45(420, 760, 600, 450, 0, 4, -0.5, 3), N_ = [[0, 0], [1, 1], [2, 0], [3, -0.5], [4, 0], [4, 3], [0, 3]].map(p => f(...p));
    poly45(N_, C.cyan, q, 0.08);
    fillPoly([N_[0], N_[1], N_[2]], C.red, q * 0.35); fillPoly([N_[2], N_[3], N_[4]], C.green, q * 0.35);
    lbl('fill notch: τ₁ = −1', 520, 820, C.red, q, 20); lbl('cut ear: τ₃ = 1/2', 920, 820, C.green, q, 20);
    eqn('2τ₁τ₃ = −1', 1350, 520, Q(S, 1, 'cross term'), C.red, 34);
    lbl('responses (−1, 1/4, 1/2)', 1350, 590, C.white, Q(S, 1, 'cross term'), 22);
  }
};

/* ---- 07 FIBAREA ---- */
SCENES.fibarea = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const n = Math.max(2, Math.min(10, 2 + Math.floor(Math.max(0, S.u - 1.5) / 1.6))), w = TREE45[n];
  let x = 0, y = 0; const path = [[0, 0]]; for (const ch of w) { if (ch === 'a') y++; else x++; path.push([x, y]); }
  const sc = Math.min(560 / Math.max(1, x), 420 / Math.max(1, y)), f = (px, py) => [300 + px * sc, 780 - py * sc];
  const SP = path.map(p => f(...p));
  fillPoly(SP, C.gold, s0 * 0.25); strokePoly(SP, C.cyan, s0, 2.5, false); line(SP[SP.length - 1][0], SP[SP.length - 1][1], SP[0][0], SP[0][1], C.mag, s0, 2);
  lbl('T_' + n + ' : ' + w.length + ' leaves   α = ↑   β = →', 580, 830, C.white, s0, 20);
  const An = (FB45[n - 2] + (n % 2 ? -1 : 1)) / 2;
  lbl('A_' + n + ' = ' + (An % 1 ? (2 * An) + '/2' : An), 580, 300, C.gold, s0, 26);
  eqn('(q, A) ⋆ (r, B) = (q + r, A + B + ½ det(q, r))', 1360, 260, Q(S, 0, 'Joining two walks'), C.white, 24);
  chip(1360, 350, 520, 54, 'the seam a chord forgets', C.mag, Q(S, 0, 'exactly the seam'), 22);
  eqn('q_{n+2} = q_{n+1} + q_n', 1360, 450, Q(S, 1, 'Fibonacci rule'), C.cyan, 26);
  eqn('A_n = d/2 · (F_{n−2} + (−1)ⁿ)', 1360, 530, Q(S, 1, 'the areas obey'), C.gold, 30);
  const tq = Q(S, 1, 'the areas obey', 0.5, 2.5);
  if (tq > 0) { const vals = ['1/2', '0', '1', '1/2', '2', '2', '9/2', '6', '11']; vals.forEach((v, i) => { const xx = 1060 + i * 75; lbl(String(i + 2), xx, 610, C.dim, tq, 18); lbl(v, xx, 650, C.white, tq, 22); }); lbl('n', 1010, 610, C.dim, tq, 18); lbl('A_n', 1000, 650, C.dim, tq, 18); lbl('(d = 1)', 1360, 690, C.dim, tq, 18); }
  chip(1360, 780, 560, 54, 'keep the inner record → next cut computable', C.green, Q(S, 1, 'Keep the inner'), 20);
};

/* ---- 08 CIRCLE ---- */
SCENES.circle = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'classical']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'With the perimeter', 0.6);
  if (fade > 0) {
    const N = Math.min(40, 3 + Math.floor(Math.max(0, S.u - 1) * 1.6)), cx = 560, cy = 520, R = 280;
    ring(cx, cy, R, C.dim, s0 * fade, 1.5);
    poly45(reg45(cx, cy, R, N), C.cyan, s0 * fade, 0.12);
    lbl('N = ' + N, cx, cy + R + 50, C.white, s0 * fade, 24);
    const AN = N / 2 * Math.sin(2 * Math.PI / N);
    eqn('A_N = (N R² / 2) sin(2π/N)', 1350, 280, Q(S, 0, 'has area') * fade, C.white, 28);
    lbl('A_N / πR² = ' + (AN / Math.PI).toFixed(4), 1350, 360, C.cyan, Q(S, 0, 'has area') * fade, 24);
    eqn('0 ≤ πR² − A_N ≤ 2π³R² / (3N²)', 1350, 460, Q(S, 0, 'the gap'), C.gold, 28);
    lbl('gap ' + (Math.PI - AN).toFixed(4) + ' ≤ ' + (2 * Math.PI ** 3 / (3 * N * N)).toFixed(4), 1350, 520, C.dim, Q(S, 0, 'the gap') * fade, 20);
    [[3, '3√3/4 R²'], [4, '2 R²'], [6, '3√3/2 R²']].forEach(([n, s], k) => lbl('A_' + n + ' = ' + s, 1350, 620 + k * 44, C.white, Q(S, 0, 'grows toward') * fade, 22));
  }
  const q = Q(S, 1, 'With the perimeter', 0.6, 0.3);
  if (q > 0) {
    const x0 = 360, y0 = 760, bw = 90;
    for (let N = 3; N <= 12; N++) { const r = (Math.PI / N) / Math.tan(Math.PI / N), qq = Q(S, 1, 'the regular polygon', 0.5, (N - 3) * 0.12); fillBox(x0 + (N - 3) * bw + 10, y0 - r * 420, bw - 20, r * 420, C.cyan, qq * 0.75); lbl(String(N), x0 + (N - 3) * bw + bw / 2, y0 + 30, C.dim, qq, 18); }
    dashed(x0, y0 - 420, x0 + 10 * bw, y0 - 420, C.gold, q, 2); lbl('circle = 1', x0 + 10 * bw + 20, y0 - 412, C.gold, q, 20, 'left');
    eqn('4πA / P² = (π/N) cot(π/N) < 1', 860, 260, q, C.white, 28);
    chip(1500, 520, 460, 56, 'fixed perimeter: regular wins', C.green, Q(S, 1, 'holds the most'), 20);
    chip(1500, 610, 460, 56, 'yet less than the circle', C.gold, Q(S, 1, 'less than the circle'), 20);
  }
};

/* ---- 09 PRIME ---- */
SCENES.prime = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'classical']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'For a prime p', 0.6);
  if (fade > 0) {
    const walk = (cx, cy, R, N, k, col, a, prog) => { const pts = reg45(cx, cy, R, N); pts.forEach(p => dot(p[0], p[1], 8, 'w', a)); const L = N / gcd45(N, k), m = Math.min(L, prog); for (let i = 0; i < Math.floor(m); i++) { const p = pts[(i * k) % N], q = pts[((i + 1) * k) % N]; line(p[0], p[1], q[0], q[1], col, a, 3); } return L; };
    const pr = Math.max(0, S.u - 1.5) * 2.2;
    walk(420, 470, 190, 6, 2, C.red, s0 * fade, pr); lbl('N = 6, k = 2 → 3 steps', 420, 720, C.red, Q(S, 0, 'A hexagon') * fade, 20);
    walk(900, 470, 190, 7, 2, C.green, s0 * fade, pr); lbl('N = 7, k = 2 → 7 steps', 900, 720, C.green, s0 * fade, 20);
    eqn('return after N / gcd(N, k)', 1400, 280, Q(S, 0, 'you return') * fade, C.white, 28);
    for (let N = 3; N <= 12; N++) { const p = [3, 5, 7, 11].includes(N), q = Q(S, 0, 'exactly when N is prime', 0.5, (N - 3) * 0.1) * fade; box(1180 + ((N - 3) % 5) * 90, 380 + Math.floor((N - 3) / 5) * 90, 74, 70, p ? C.green : C.dim, q, 2, 'rgba(0,0,0,0.4)'); lbl(String(N), 1217 + ((N - 3) % 5) * 90, 425 + Math.floor((N - 3) / 5) * 90, p ? C.green : C.dim, q, 26); }
    lbl('every step tours all vertices ⟺ N prime', 1400, 590, C.green, Q(S, 0, 'exactly when N is prime') * fade, 20);
  }
  const q = Q(S, 1, 'For a prime p', 0.6, 0.3);
  if (q > 0) {
    const p5 = reg45(420, 480, 180, 5); poly45(p5, C.cyan, q, 0.06); p5.forEach(p => dot(p[0], p[1], 16, 'c', q)); dot(420, 480, 10, 'g', q); lbl('weights 1/5 each', 420, 720, C.cyan, q, 20);
    const h6 = reg45(900, 480, 180, 6), hq = Q(S, 1, 'A composite'); poly45(h6, C.mag, hq, 0.06); h6.forEach((p, i) => dot(p[0], p[1], i % 2 ? 6 : 20, i % 2 ? 'w' : 'm', hq)); dot(900, 480, 10, 'g', hq); lbl('1/3 on alternate corners', 900, 720, C.mag, hq, 20);
    eqn('Φ_p(T+1) = Σ C(p,i) T^(i−1)  · Eisenstein', 1400, 300, Q(S, 1, 'Eisenstein'), C.white, 22);
    chip(1400, 390, 500, 54, 'rational centre ⟹ uniform (p prime)', C.cyan, Q(S, 1, 'are uniform'), 20);
    const tq = Q(S, 1, 'Yet a prime polygon');
    if (tq > 0) { const pp = reg45(1400, 620, 150, 5); poly45(pp, C.gold, tq, 0.08); line(pp[0][0], pp[0][1], pp[2][0], pp[2][1], C.gold, tq, 2); line(pp[0][0], pp[0][1], pp[3][0], pp[3][1], C.gold, tq, 2); lbl('p − 2 = 3 triangles', 1400, 820, C.gold, tq, 22); }
  }
};
function gcd45(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }

/* ---- 10 SPECTRUM ---- */
SCENES.spectrum = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'On a regular N-gon', 0.6);
  if (fade > 0) {
    const pts = reg45(470, 500, 230, 5, -Math.PI / 2 + t * 0.1);
    poly45(pts, C.cyan, s0 * fade, 0.12); poly45([0, 2, 4, 1, 3].map(i => pts[i]), C.gold, Q(S, 0, 'Star polygons') * fade, 0.06, 2);
    lbl('k = 1', 330, 790, C.cyan, s0 * fade, 22); lbl('k = 2', 610, 790, C.gold, Q(S, 0, 'Star polygons') * fade, 22);
    eqn('q_k = 4 sin²(2πk/p)', 1350, 260, Q(S, 0, 'scaled squared areas'), C.white, 28);
    const rows = [[3, '3', '3'], [5, '5', '5'], [7, '7', '7'], [11, '11', '11']];
    lbl('p      Σ q_k    Π q_k', 1350, 340, C.dim, Q(S, 0, 'both their sum'), 22);
    rows.forEach(([p, a1, a2], k) => lbl(String(p).padEnd(7) + a1.padEnd(9) + a2, 1350, 385 + k * 40, C.green, Q(S, 0, 'both their sum', 0.5, k * 0.25) * fade, 24));
    eqn('Q² − 5Q + 5 = 0   ⟹   q± = (5 ± √5)/2', 1350, 600, Q(S, 0, 'For the pentagon') * fade, C.gold, 26);
    eqn('q₊ − 2 = φ ,   Q ↦ M + 2I', 1350, 670, Q(S, 0, 'golden ratio') * fade, C.cyan, 28);
  }
  const q = Q(S, 1, 'On a regular N-gon', 0.6, 0.3);
  if (q > 0) {
    const pts = reg45(470, 500, 230, 7);
    poly45(pts, C.cyan, q, 0.08); fillPoly([pts[0], pts[1], pts[2]], C.gold, q * 0.5); line(pts[0][0], pts[0][1], pts[2][0], pts[2][1], C.gold, q, 2.5);
    eqn('γ_N = 2(1 − cos 2π/N) / N', 1350, 280, q, C.gold, 28);
    lbl('γ₅ = (5 − √5)/10 ≈ 0.2764', 1350, 340, C.white, Q(S, 1, 'for the pentagon'), 24);
    const bars = [['0', '1 − m + κ', 0.55, C.white], ['γ', 'm − 2κ', 0.3, C.cyan], ['2γ', 'κ', 0.15, C.green]];
    bars.forEach(([a1, a2, v, col], k) => { const qq = Q(S, 1, 'One round loses', 0.5, k * 0.5), x = 1110 + k * 170; fillBox(x, 760 - v * 360, 110, v * 360, col, qq * 0.7); lbl('loss ' + a1, x + 55, 795, col, qq, 20); lbl(a2, x + 55, 750 - v * 360, C.white, Q(S, 1, 'with chances', 0.5, k * 0.6), 20); });
  }
};

/* ---- 11 SUFFIX ---- */
SCENES.suffix = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'lean']]);
  const s0 = clamp(u), up = Q(S, 1, 'Lean has frozen', 0.8);
  const ty = lerp(0, -40, up), sc = 1;
  const rows = [['0', 'O', '0', '5'], ['1', 'L', 'γ', '⊥'], ['2', 'T', 'γ', '18'], ['3', 'R', 'γ', '26'], ['13', 'J', '2γ', '⊥']];
  const hq = s0 * (1 - 0.65 * up);
  lbl('mode', 520, 250 + ty, C.dim, hq, 20); lbl('area loss', 760, 250 + ty, C.dim, hq, 20); lbl('reply to mode 3', 1040, 250 + ty, C.dim, Q(S, 0, 'request one more') * (1 - 0.65 * up), 20); lbl('signature', 1340, 250 + ty, C.dim, Q(S, 0, 'five signatures') * (1 - 0.65 * up), 20);
  rows.forEach(([m, key, a, r], k) => {
    const y = 300 + k * 62 + ty, q = s0 * (1 - 0.65 * up);
    box(420, y - 32, 1100, 54, NC[key], q * 0.5, 1.2, 'rgba(0,0,0,0.35)');
    lbl(m, 520, y + 6, NC[key], q, 24);
    lbl(a, 760, y + 6, a === 'γ' ? C.gold : C.white, Q(S, 0, 'Area alone') * (1 - 0.65 * up), 24);
    lbl(r, 1040, y + 6, r === '⊥' ? C.red : C.cyan, Q(S, 0, 'The replies are', 0.5, k * 0.45) * (1 - 0.65 * up), 24);
    lbl('(' + a + ', ' + r + ')', 1340, y + 6, C.green, Q(S, 0, 'five signatures', 0.5, k * 0.15) * (1 - 0.65 * up), 24);
  });
  const mq = Q(S, 0, 'merges the three') * (1 - Q(S, 0, 'The replies are'));
  if (mq > 0) { box(700, 300 + 62 - 34, 120, 3 * 62 + 4, C.red, mq, 2, null); lbl('merged', 760, 300 + 4 * 62 + 10, C.red, mq, 18); }
  if (up > 0) {
    box(300, 640, 1320, 140, C.green, up, 2, 'rgba(0,30,15,0.65)');
    lbl('LEAN · NativeContinuation.JointLaw.native_reply_injective', 960, 680, C.green, up, 20);
    lblG('∀ n,  Function.Injective (reply : Source n → ℕ)   ·   reply = quantity after one null window', 960, 730, C.white, Q(S, 1, 'separates all'), 22);
    const cq = Q(S, 1, 'Lengths one to four');
    [5, 21, 89, 377].forEach((v, i) => { const qq = Q(S, 1, 'Lengths one to four', 0.5, i * 0.5); lbl('n = ' + (i + 1), 560 + i * 260, 830, C.dim, qq, 18); lbl(v + ' sources', 560 + i * 260, 862, C.gold, qq, 22); });
    lbl('every reply different', 1700, 862, C.green, Q(S, 1, 'every reply different'), 18, 'right');
  }
};

/* ---- 12 CUBE ---- */
SCENES.cube = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const tq = 1 - Q(S, 0, 'In the unit cube', 0.6);
  if (tq > 0) {
    const rows = [['0', '∅', '{1,2,3}', false], ['1', '{1}', '{2,3}', false], ['2', '{2}', '{1,3}', true], ['3', '{3}', '{1,2}', false], ['13', '{1,3}', '{2}', true]];
    lbl('mode    positions    complement', 960, 260, C.dim, s0 * tq, 22);
    rows.forEach(([m, p, c, ok], k) => { const y = 320 + k * 66, q = Q(S, 0, 'Complementing', 0.5, k * 0.2) * tq; box(560, y - 34, 800, 54, ok ? C.green : C.red, q * 0.6, 1.2, 'rgba(0,0,0,0.35)'); lbl(m, 650, y + 6, C.white, q, 24); lbl(p, 860, y + 6, C.cyan, q, 24); lbl(c, 1080, y + 6, ok ? C.green : C.red, q, 24); lbl(ok ? 'legal' : 'illegal', 1270, y + 6, ok ? C.green : C.red, Q(S, 0, 'only one pair') * tq, 20); });
    chip(960, 700, 560, 54, '2 ↔ 13 : the only legal pair', C.green, Q(S, 0, 'trade places') * tq, 22);
  }
  const q = Q(S, 0, 'In the unit cube', 0.6, 0.3);
  if (q > 0) {
    const v = v3(600, 560, 330, 0.65 + t * 0.18, 0.42, [0.5, 0.5, 0.5]);
    const cubeE = [[0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1], [1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 0], [1, 0, 0, 1, 1, 0], [1, 0, 0, 1, 0, 1], [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 1], [0, 0, 1, 0, 1, 1]];
    cubeE.forEach(e => { const a = v(e[0], e[1], e[2]), b = v(e[3], e[4], e[5]); line(a[0], a[1], b[0], b[1], C.dim, q, 1.5); });
    const tet = (pts, col, a) => { const P_ = pts.map(p => v(...p)); for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(P_[i][0], P_[i][1], P_[j][0], P_[j][1], col, a, 2.5); [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]].forEach(f => fillPoly(f.map(i => P_[i]), col, a * 0.07)); };
    /* coordinates (X, Y, Z); pyramid P: X+Z ≤ 1, Y+Z ≤ 1 (apex Z=1 over corner X=Y=0) */
    const pyr = (col, a, mirror) => { const m = p => mirror ? p.map(c => 1 - c) : p; const base = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]].map(m), ap = m([0, 0, 1]); const B = base.map(p => v(...p)), A = v(...ap); for (let i = 0; i < 4; i++) { line(B[i][0], B[i][1], B[(i + 1) % 4][0], B[(i + 1) % 4][1], col, a, 2.5); line(B[i][0], B[i][1], A[0], A[1], col, a, 2.5); fillPoly([B[i], B[(i + 1) % 4], A], col, a * 0.06); } };
    const st = Q(S, 1, 'The cube splits', 0.5);
    pyr(C.gold, q, false);
    pyr(C.mag, Q(S, 1, 'and its mirror'), true);
    tet([[1, 0, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1]], C.cyan, Q(S, 1, 'two mixed'));
    tet([[0, 1, 0], [1, 1, 0], [0, 0, 1], [0, 1, 1]], C.green, Q(S, 1, 'two mixed', 0.5, 0.4));
    const L_ = [['pyramid 𝒫', '1/3', C.gold, 'The cube splits'], ['mirror C(𝒫)', '1/3', C.mag, 'and its mirror'], ['mixed T_x', '1/6', C.cyan, 'two mixed'], ['mixed T_y', '1/6', C.green, 'two mixed']];
    L_.forEach(([a1, a2, col, ph], k) => { const qq = Q(S, 1, ph, 0.5, k === 3 ? 0.4 : 0); lbl(a1, 1250, 300 + k * 56, col, qq, 24, 'left'); lbl(a2, 1640, 300 + k * 56, col, qq, 24, 'right'); });
    lbl('six order simplices × 1/6', 1445, 540, C.white, Q(S, 1, 'six order simplices'), 20);
    eqn('mirror:  X+Z ≥ 1  and  Y+Z ≥ 1', 1445, 620, Q(S, 0, 'mirror image', 0.5) * (1 - 0.5 * st), C.mag, 24);
    eqn('difference:  X+Z > 1  or  Y+Z > 1', 1445, 680, Q(S, 0, 'set difference', 0.5) * (1 - 0.5 * st), C.red, 24);
    chip(1445, 770, 520, 54, 'set difference volume = 2/3', C.red, Q(S, 1, 'The true difference'), 22);
    lbl('at least one fails ≠ both reverse', 1445, 840, C.gold, Q(S, 1, 'at least one'), 20);
  }
};

/* ---- 13 CERTIFICATES ---- */
SCENES.certificates = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'classical'], [1, 'With the means fixed', 'theory']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'In the plane', 0.6);
  if (fade > 0) {
    const f = frame45(330, 760, 400, 400, 0, 2, 0, 2);
    const sq = [[0, 0], [2, 0], [2, 2], [0, 2]].map(p => f(...p)), pn = [[0, 0], [2, 0], [2, 2], [1, 1], [0, 2]].map(p => f(...p));
    poly45(sq, C.cyan, s0 * fade, 0.1); poly45(pn.map(p => [p[0] + 520, p[1]]), C.mag, Q(S, 0, 'notched pentagon') * fade, 0.18);
    lbl('area 4', 530, 820, C.cyan, Q(S, 0, 'area four') * fade, 22); lbl('area 3', 1050, 820, C.mag, Q(S, 0, 'area three') * fade, 22);
    const th = t * 0.6, uu = [Math.cos(th), Math.sin(th)];
    [[sq, 0, C.cyan], [pn, 520, C.mag]].forEach(([P_, dx, col]) => { const pts = P_.map(p => [p[0] + dx, p[1]]); let best = -1e9, bp = pts[0]; pts.forEach(p => { const v = p[0] * uu[0] - p[1] * uu[1]; if (v > best) { best = v; bp = p; } }); const nx = -uu[1], ny = -uu[0]; line(bp[0] - nx * 260, bp[1] - ny * 260, bp[0] + nx * 260, bp[1] + ny * 260, C.gold, Q(S, 0, 'share every support') * fade, 2.5); dot(bp[0], bp[1], 10, 'g', Q(S, 0, 'share every support') * fade); });
    chip(1500, 330, 440, 56, 'same support, every direction', C.gold, Q(S, 0, 'share every support') * fade, 20);
    ring(1420, 560, 90, C.cyan, Q(S, 0, 'a circle') * fade, 3); fillPoly(ringPts(1640, 560, 90, 60), C.cyan, Q(S, 0, 'its disk') * fade * 0.35); ring(1640, 560, 90, C.cyan, Q(S, 0, 'its disk') * fade, 3);
    lbl('circle · area 0', 1420, 700, C.white, Q(S, 0, 'a circle') * fade, 18); lbl('disk · area πR²', 1640, 700, C.white, Q(S, 0, 'its disk') * fade, 18);
    lbl('linear readouts recover only the convex hull', 960, 250, C.white, s0 * fade, 22);
  }
  const q = Q(S, 1, 'In the plane', 0.6, 0.3);
  if (q > 0) {
    const f = frame45(260, 800, 540, 540, -3, 2, -3, 2), H1 = [[0, -3], [2, -3], [2, 2], [0, 2]], H2 = [[-3, 0], [2, 0], [2, 2], [-3, 2]], H3 = [[-3, -3], [2, -3], [-3, 2]];
    fillPoly(H1.map(p => f(...p)), C.cyan, q * 0.12); fillPoly(H2.map(p => f(...p)), C.gold, q * 0.12); fillPoly(H3.map(p => f(...p)), C.mag, q * 0.14);
    line(...f(0, -3), ...f(0, 2), C.cyan, q, 2.5); line(...f(-3, 0), ...f(2, 0), C.gold, q, 2.5); line(...f(-3, 2), ...f(2, -3), C.mag, q, 2.5);
    [[0, 0, 'n'], [0, -1, 'c'], [-1, 0, 'g']].forEach(([x, y, c]) => { const p = f(x, y); dot(p[0], p[1], 12, c, Q(S, 1, 'three convex constraints')); });
    lbl('x ≥ 0', 840, 330, C.cyan, q, 20, 'left'); lbl('y ≥ 0', 840, 370, C.gold, q, 20, 'left'); lbl('x + y ≤ −1', 840, 410, C.mag, q, 20, 'left');
    lbl('each pair meets · all three: empty', 530, 860, C.white, Q(S, 1, 'certify a conflict'), 20);
    chip(1350, 290, 560, 54, 'plane: 3 constraints certify a conflict', C.green, Q(S, 1, 'certify a conflict'), 20);
    eqn('κ₋ = max(0, X+Y+Z−1)  ≤  κ  ≤  κ₊ = min(X, Y)', 1350, 420, Q(S, 1, 'four atomic'), C.gold, 24);
    lbl('xy ≥ 0,  xy ≥ x+y+z−1,  xy ≤ x,  xy ≤ y', 1350, 480, C.white, Q(S, 1, 'four atomic'), 20);
    eqn('Vol₄(𝒦_f) = ∫ (f̄ − f̲) = |J_f| / 24', 1350, 600, Q(S, 1, 'lifted body'), C.cyan, 28);
    lbl('thickness at height Z: (1 − Z)³/6', 1350, 660, C.dim, Q(S, 1, 'lifted body', 0.5, 0.6), 20);
  }
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['AREA', '3 points', C.cyan, 'Three points'], ['RIGID', '3 sides', C.gold, 'three sides'], ['MODES', '3 cuts → 5', C.mag, 'three cuts'], ['CONFLICT', '3 constraints', C.green, 'three constraints']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 28); lblG(a2, x, 350, C.white, q, 24); });
    lbl('each smallest unit is smallest for its own task', W / 2, 450, C.dim, Q(S, 0, 'Each smallest unit') * fade, 22);
    lbl('LEAN · NativeContinuation.JointLaw.native_reply_injective', W / 2, 540, C.green, Q(S, 1, 'Lean has frozen') * fade, 24);
    lbl('VOLUME · ear calculus · area spectrum · complement cube · sharp bounds', W / 2, 600, C.orange, Q(S, 1, 'The ear calculus') * fade, 22);
    lbl('RECOMPUTED · every number in this film', W / 2, 660, C.white, Q(S, 1, 'every number') * fade, 24);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, pts = reg45(W / 2, 420, 150, 5, -Math.PI / 2 + t * 0.12);
    poly45(pts, C.cyan, a, 0.08); strokePoly([0, 2, 4, 1, 3].map(i => pts[i]), C.gold, a * 0.9, 2); pts.forEach((p, i) => dot(p[0], p[1], 10, ['w', 'c', 'g', 'm', 'n'][i], a));
    txt('AURIC FIB ATOM PYRAMID XVI', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XVI · 内生分类与多边形几何 · TRURETURING FILM 045', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Every class needs its background.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'ONE EAR', triangle: 'THREE DISTANCES', regular: 'REGULAR CLASSES', flip: 'FLIPS AND KERNELS', conflict: 'FIVE MODES FROM CONFLICT', moments: 'AREA MOMENTS', fibarea: 'FIB TREE AREA', circle: 'TOWARD THE CIRCLE', prime: 'PRIME CYCLES', spectrum: 'AREA SPECTRUM', suffix: 'AREA PLUS REPLY', cube: 'COMPLEMENT CUBE', certificates: 'CERTIFICATES', finale: 'LEDGER' });

function poster45() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const pts = reg45(560, 500, 290, 5, -Math.PI / 2);
  poly45(pts, C.cyan, 0.95, 0.1); strokePoly([0, 2, 4, 1, 3].map(i => pts[i]), C.gold, 0.9, 2.5);
  fillPoly([pts[1], pts[2], pts[3]], C.mag, 0.3); line(pts[1][0], pts[1][1], pts[3][0], pts[3][1], C.mag, 0.9, 3);
  pts.forEach((p, i) => dot(p[0], p[1], 14, ['w', 'c', 'g', 'm', 'n'][i], 1));
  txt('Z₄ = 1 + w₁ + w₂ + w₃ + w₁w₃', 1360, 300, { size: 36, fam: FG, w: 700, align: 'center', c: C.green });
  txt('Σ 4sin²(2πk/p) = Π = p', 1360, 390, { size: 36, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('A_n = d/2 · (F_{n−2} + (−1)ⁿ)', 1360, 480, { size: 34, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('Vol = |J| / 24', 1360, 570, { size: 36, fam: FG, w: 700, align: 'center', c: C.white });
  txt('FIB 原子金字塔 XVI', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XVI', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('三 个 点 围 出 面 积 · 五 个 顶 点 生 成 选 择', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 045', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster45;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
