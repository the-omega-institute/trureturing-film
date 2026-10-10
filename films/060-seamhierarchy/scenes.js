/* Film 060 */

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

/* ---- film 060: symmetric mixing, path defect, Fibonacci hierarchy ---- */
const _po60 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po60.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po60.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: s.includes('½') ? FG : F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect60(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const MODES60 = [['∅', [0, 0, 0], 'n', '000'], ['[2]', [1, 0, 0], 'c', '100'], ['[3]', [0, 0, 1], 'g', '010'], ['[5]', [0, 1, 0], 'o', '001'], ['[2,5]', [1, 1, 0], 'm', '101']];
const PEDGE60 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
function pyr60(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES60.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE60.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.8, 1.8));
  if (opt.labels !== false) MODES60.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(opt.bits ? m[3] : m[0], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -20 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return W3;
}
/* a soft node: ring plus a pearl whose size and glow follow the value */
function soft60(x, y, v, a, col = C.cyan, nm = 'c', lab = null, r = 24) {
  if (a <= 0) return;
  ring(x, y, r, col, a * 0.8, 2);
  if (v > 0.001) dot(x, y, r * (0.35 + 0.6 * Math.sqrt(v)), nm, a * (0.35 + 0.65 * v));
  if (lab != null) lbl(lab, x, y + r + 26, C.white, a, 18);
}
/* three atoms carrying 2, 3, 5 */
function atoms60(x, y, bits, a, sp = 90, r = 24, vals = true) {
  const nm = ['c', 'g', 'o'], v = ['2', '3', '5'];
  for (let i = 0; i < 3; i++) { const xx = x + i * sp; if (i) line(xx - sp + r, y, xx - r, y, C.dim, a * 0.7, 2); ring(xx, y, r, C.dim, a * 0.8, 2); if (bits[i]) dot(xx, y, r * 0.95, nm[i], a); if (vals) lbl(v[i], xx, y + 7, bits[i] ? '#06121c' : C.dim, a, Math.round(r * 0.8)); }
}
/* a regular k-gon blended with its inscribed disk: (1 - tau) P_k (+) tau rho D, circumradius R px */
function blend60(cx, cy, R, k, tau, col, a, lw = 2.5, fill = 0, dash = false, rot = -Math.PI / 2) {
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
const NM60 = ['∅', '[2]', '[3]', '[5]', '[2,5]'], DOT60 = ['n', 'c', 'g', 'o', 'm'];
/* five state nodes in a row */
function row60(x0, y, sp, a, opt = {}) {
  const P = NM60.map((s, i) => [x0 + i * sp, y]);
  P.forEach((p, i) => { ring(p[0], p[1], 26, C.cyan, a * 0.8, 2); dot(p[0], p[1], 14, DOT60[i], a * (opt.dim ? 0.4 : 1)); lbl(s60n(i), p[0], p[1] + 54, C.white, a, 20); });
  return P;
}
function s60n(i) { return NM60[i]; }
/* signed bars above a row of nodes */
function sbars60(P, v, y0, hs, a, col, labels = false) {
  v.forEach((x, i) => { if (Math.abs(x) < 1e-9) { line(P[i][0] - 22, y0, P[i][0] + 22, y0, C.dim, a, 2); return; } const h = x * hs; fillBox(P[i][0] - 22, h > 0 ? y0 - h : y0, 44, Math.abs(h), x > 0 ? col : C.red, a * 0.5); rect60(P[i][0] - 22, h > 0 ? y0 - h : y0, 44, Math.abs(h), x > 0 ? col : C.red, a, 2); if (labels) lbl((x > 0 ? '+' : '') + x, P[i][0], h > 0 ? y0 - h - 12 : y0 - h + 26, C.white, a, 18); });
}
/* curved arrow between two row nodes */
function arc60(p, q, col, a, up = 1, hgt = 60) {
  if (a <= 0) return;
  if (Math.abs(p[0] - q[0]) < 1) { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(p[0], p[1] - up * 44, 16, 0, TAU * 0.85); ctx.stroke(); ctx.restore(); return; }
  const mx = (p[0] + q[0]) / 2, my = p[1] - up * (hgt + Math.abs(q[0] - p[0]) * 0.18);
  curve(z => [(1 - z) * (1 - z) * p[0] + 2 * z * (1 - z) * mx + z * z * q[0], (1 - z) * (1 - z) * (p[1] - up * 28) + 2 * z * (1 - z) * my + z * z * (q[1] - up * 28)], 30, col, a, 2.5);
  const tx = q[0] - (q[0] - mx) * 0.12, ty = (q[1] - up * 28) - ((q[1] - up * 28) - my) * 0.12; arrow(tx, ty, q[0], q[1] - up * 28, col, a, 2.5);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  pyr60(520, 450, 280, 0.6 + t * 0.2, s0, { fillBase: true });
  chip(1180, 330, 440, 62, 'S : symmetric mixing', C.cyan, Q(S, 0, 'a symmetric mixing of two changes'), 24);
  chip(1660, 330, 400, 62, 'H : order defect', C.mag, Q(S, 0, 'a defect in their order'), 24);
  const gq = Q(S, 0, 'how the hidden part grows', 0.6), hv = [1, 3, 7, 14, 26];
  hv.forEach((v, i) => { const x = 1100 + i * 130, h = v * 13, q = gq * clamp((S.u - lineAt(S, 0).s - (lineAt(S, 0).e - lineAt(S, 0).s) * 0.8 - i * 0.25) / 0.4); fillBox(x, 760 - h, 80, h, C.mag, q * 0.45); rect60(x, 760 - h, 80, h, C.mag, q, 2); lbl(String(v), x + 40, 745 - h, C.white, q, 22); lbl('n=' + (i + 3), x + 40, 795, C.dim, q, 18); });
  lbl('hidden directions', 1360, 430, C.mag, gq, 22);
  lblG('F(n + 2) − n − 1', 1360, 850, C.gold, Q(S, 1, 'a Fibonacci hierarchy', 0.6), 30);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr60(W / 2, 400, 260, 0.5 + t * 0.25, rp, { fillBase: true, lab: 0.6 });
  const sq = [[300, 300], [520, 300], [520, 520], [300, 520]], ph = 0.5 + 0.5 * Math.sin(t * 2);
  line(sq[0][0], sq[0][1], sq[1][0], sq[1][1], C.cyan, rp, 3); line(sq[1][0], sq[1][1], sq[2][0], sq[2][1], C.cyan, rp, 3);
  line(sq[0][0], sq[0][1], sq[3][0], sq[3][1], C.mag, rp, 3); line(sq[3][0], sq[3][1], sq[2][0] - 30, sq[2][1] + 10, C.mag, rp, 3);
  dot(sq[2][0], sq[2][1], 12, 'c', rp); dot(sq[2][0] - 30, sq[2][1] + 10, 12, 'm', rp * ph); dot(sq[0][0], sq[0][1], 12, 'w', rp);
  [1, 3, 7, 14].forEach((v, i) => { const x = 1380 + i * 70, h = v * 14; fillBox(x, 520 - h, 44, h, C.mag, rp * 0.4); rect60(x, 520 - h, 44, h, C.mag, rp, 2); });
  txt(scramble('AURIC FIB ATOM PYRAMID XXXI', rp, 460), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXXI · 对 称 混 合 、 路 径 缺 陷 与 Fibonacci 层 级', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 060 · SYMMETRIC_SEAM_PATH_DEFECT_AND_FIBONACCI_HIERARCHY', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 SPLIT ---- */
SCENES.split = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'On the five states', 0.6);
  if (f1 > 0) {
    const a = s0 * f1;
    eqn('D = U − I', 960, 290, Q(S, 0, 'Write each action as a change', 0.6) * f1, C.white, 34);
    const P0 = [330, 640], Pa = [560, 440], Pb = [560, 780], Pab = [800, 600], Pba = [800, 680], gq = Q(S, 0, 'A product of two changes', 0.6) * f1;
    dot(P0[0], P0[1], 14, 'w', gq); lbl('p', P0[0] - 30, P0[1] + 8, C.white, gq, 22);
    arrow(P0[0] + 14, P0[1] - 10, Pa[0] - 14, Pa[1] + 10, C.cyan, gq, 3); lbl('b', 430, 520, C.cyan, gq, 22); dot(Pa[0], Pa[1], 12, 'c', gq);
    arrow(Pa[0] + 14, Pa[1] + 10, Pab[0] - 14, Pab[1] - 10, C.gold, gq, 3); lbl('a', 700, 500, C.gold, gq, 22);
    arrow(P0[0] + 14, P0[1] + 10, Pb[0] - 14, Pb[1] - 10, C.gold, gq, 3); lbl('a', 430, 740, C.gold, gq, 22); dot(Pb[0], Pb[1], 12, 'o', gq);
    arrow(Pb[0] + 14, Pb[1] - 10, Pba[0] - 14, Pba[1] + 10, C.cyan, gq, 3); lbl('b', 700, 770, C.cyan, gq, 22);
    dot(Pab[0], Pab[1], 13, 'c', gq); dot(Pba[0], Pba[1], 13, 'o', gq);
    const hq = Q(S, 0, 'H is half the commutator', 0.6) * f1;
    line(Pab[0] + 20, Pab[1], Pba[0] + 20, Pba[1], C.mag, hq, 4); lbl('2H', Pab[0] + 56, 648, C.mag, hq, 24);
    eqn('D_a D_b = S + H', 1380, 380, gq, C.white, 34);
    eqnG('S = ½ (D_a D_b + D_b D_a)', 1380, 470, Q(S, 0, 'a symmetric part S', 0.6) * f1, C.cyan, 30);
    eqnG('H = ½ (D_a D_b − D_b D_a)', 1380, 540, Q(S, 0, 'an antisymmetric part H', 0.6) * f1, C.mag, 30);
    eqnG('= ½ [U_a, U_b]', 1430, 600, hq, C.mag, 30);
    lbl('swap a ↔ b :  S ↦ S ,  H ↦ −H', 1380, 690, C.gold, Q(S, 0, 'under swapping the two actions', 0.6) * f1, 22);
    void a; void t;
  }
  const q = Q(S, 1, 'On the five states', 0.6, 0.3);
  if (q > 0) {
    const cols = ['x', 'y', 'xy'], xv = [[0, 1, 0, 0, 1], [0, 0, 0, 1, 1], [0, 0, 0, 0, 1]], x0 = 420, y0 = 330;
    NM60.forEach((s, i) => { lbl(s, x0 - 90, y0 + 60 + i * 64, C.white, q, 22); dot(x0 - 150, y0 + 52 + i * 64, 12, DOT60[i], q); });
    cols.forEach((c, j) => { const cq = j < 2 ? q : Q(S, 1, 'their symmetric product is multiplication by x y', 0.6); lblG(c, x0 + j * 140 + 50, y0, j === 2 ? C.mag : C.cyan, cq, 28); xv[j].forEach((v, i) => { const y = y0 + 40 + i * 64; rect60(x0 + j * 140, y, 100, 50, C.dim, cq, 1.2); if (v) fillBox(x0 + j * 140 + 3, y + 3, 94, 44, j === 2 ? C.mag : C.cyan, cq * 0.45); lbl(String(v), x0 + j * 140 + 50, y + 33, C.white, cq, 22); }); });
    eqn('M_x M_y = M_y M_x', 1380, 360, Q(S, 1, 'Multiplying by x and multiplying by y commute', 0.6), C.white, 32);
    eqn('[M_x, M_y] = 0', 1380, 430, Q(S, 1, 'so their commutator is zero', 0.6), C.cyan, 32);
    eqnG('½ (M_x M_y + M_y M_x) = M_xy', 1380, 510, Q(S, 1, 'their symmetric product is multiplication by x y', 0.6), C.mag, 30);
    eqn('κ = E[xy] = ⟨p, M_x M_y 1⟩', 1380, 600, Q(S, 1, 'and kappa is its expected value', 0.6), C.gold, 30);
    lbl('static seam : symmetric , not a commutator', 1380, 690, C.white, Q(S, 1, 'the static seam is the symmetric kind', 0.6), 22);
  }
};

/* ---- 03 ORDERS ---- */
SCENES.orders = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, "In the volume's example", 0.6);
  if (f1 > 0) {
    eqn('R U_aU_b d = R d + R D_a d + R D_b d + s + h', 960, 300, Q(S, 0, 'An actual two-step response expands', 0.6) * f1, C.white, 30);
    const px = 380, py = 760, pw = 620, ph = 360, sq = Q(S, 0, 'The two orders have slopes', 0.6) * f1;
    plotAxes(px, py - ph / 2, pw, ph / 2, sq, 't  (hidden coordinate)', 'reading');
    line(px, py - ph / 2, px, py, C.dim, sq, 1.5);
    const s = 0.25, h = 0.45 + 0.1 * Math.sin(t);
    curve(z => [px + z * pw, py - ph / 2 - (s + h) * z * ph * 0.5], 20, C.cyan, sq, 3); curve(z => [px + z * pw, py - ph / 2 - (s - h) * z * ph * 0.5], 20, C.mag, sq, 3);
    lbl('order a·b : s + h', px + pw + 20, py - ph / 2 - (s + h) * ph * 0.5, C.cyan, sq, 22, 'left'); lbl('order b·a : s − h', px + pw + 20, py - ph / 2 - (s - h) * ph * 0.5 + 10, C.mag, sq, 22, 'left');
    const cq = Q(S, 0, 'so their contrast is two h', 0.6) * f1;
    line(px + pw - 10, py - ph / 2 - (s + h) * ph * 0.5, px + pw - 10, py - ph / 2 - (s - h) * ph * 0.5, C.gold, cq, 4); lbl('2h', px + pw - 50, py - ph / 2 - s * ph * 0.5, C.gold, cq, 26);
    chip(1460, 820, 420, 60, 'rank ≤ 1 on the fibre', C.white, cq, 20);
  }
  const q = Q(S, 1, "In the volume's example", 0.6, 0.3);
  if (q > 0) {
    const P = row60(460, 560, 230, q);
    const aq = Q(S, 1, 'action a sends null to two', 0.6), bq = Q(S, 1, 'action b sends five to two', 0.6);
    arc60(P[0], P[1], C.gold, aq, 1); arc60(P[4], P[3], C.gold, aq, 1); lbl('U_a', 520, 350, C.gold, aq, 24);
    arc60(P[3], P[1], C.cyan, bq, -1, 40); lbl('U_b', 920, 760, C.cyan, bq, 24);
    ring(P[3][0], P[3][1], 40, C.green, Q(S, 1, 'read the mass on five', 0.6), 3); lbl('R = mass on [5]', P[3][0], 470, C.green, Q(S, 1, 'read the mass on five', 0.6), 20);
    lbl('d = (1, −1, 0, −1, 1)', 460, 300, C.white, q, 22, 'left');
    const rq = Q(S, 1, 'Then s is minus one half', 0.6);
    lbl('s = −½    h = ½', 1500, 300, C.gold, rq, 30);
    lbl('R D_aD_b d = s + h = 0', 1500, 360, C.cyan, Q(S, 1, 'one order cancels to zero', 0.6), 22);
    lbl('R D_bD_a d = s − h = −1', 1500, 400, C.mag, Q(S, 1, 'the other reads minus one', 0.6), 22);
    lbl('R U_aU_b d = 1', 1500, 440, C.green, Q(S, 1, 'the actual composite reads one', 0.6), 24);
  }
};

/* ---- 04 DELAY ---- */
SCENES.delay = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'lean'], [1, 'The volume extends', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'How long can it hide', 0.6);
  if (f1 > 0) {
    const a = s0 * f1, P = row60(420, 400, 200, a), mq = Q(S, 0, 'One map sends', 0.6) * f1;
    arc60(P[0], P[2], C.gold, mq, 1); arc60(P[1], P[2], C.gold, mq, 1, 30); arc60(P[2], P[2], C.gold, mq, 1); arc60(P[3], P[3], C.gold, mq, 1); arc60(P[4], P[0], C.gold, mq, -1, 30);
    lbl('U', 1300, 300, C.gold, mq, 28);
    ring(P[2][0], P[2][1], 40, C.green, Q(S, 0, 'Reading the mass on three', 0.6) * f1, 3);
    const rows = [['d', [1, -1, 0, -1, 1], '0', 'reads zero now'], ['U d', [1, 0, 0, -1, 0], '0', 'zero after one step'], ['U² d', [0, 0, 1, -1, 0], '1', 'one after two']];
    rows.forEach(([nm, v, r, ph], k) => {
      const qq = Q(S, 0, ph, 0.5) * f1, y = 660 + k * 72;
      lblG(nm, 300, y + 8, C.white, qq, 26, 'right');
      v.forEach((x, i) => { const xx = P[i][0]; if (x) { fillBox(xx - 30, y - 20, 60, 40, x > 0 ? C.cyan : C.red, qq * 0.45); } rect60(xx - 30, y - 20, 60, 40, C.dim, qq, 1.2); lbl(x ? (x > 0 ? '+1' : '−1') : '0', xx, y + 8, C.white, qq, 18); });
      lbl('R = ' + r, 1360, y + 8, r === '1' ? C.green : C.dim, qq, 26, 'left');
    });
    lbl('all words are powers of U : everything commutes', 960, 880, C.gold, Q(S, 0, 'every word is a power of this one map', 0.6) * f1, 20);
  }
  const q = Q(S, 1, 'How long can it hide', 0.6, 0.3);
  if (q > 0) {
    const gq = Q(S, 1, 'grows strictly at most', 0.6), dims = [1, 2, 3, 4, 5, 5, 5];
    plotAxes(360, 760, 640, 420, q, 'step j', 'dim V_j');
    dims.forEach((v, i) => { const x = 400 + i * 86, h = v * 76, qq = gq * clamp((S.u - lineAt(S, 1).s - (lineAt(S, 1).e - lineAt(S, 1).s) * 0.3 - i * 0.25) / 0.4); fillBox(x, 760 - h, 56, h, i < 4 ? C.cyan : C.dim, qq * 0.45); rect60(x, 760 - h, 56, h, i < 4 ? C.cyan : C.dim, qq, 2); lbl(String(v), x + 28, 744 - h, C.white, qq, 20); });
    lbl('strict growth ≤ n − rank C', 680, 300, C.white, gq, 26);
    lbl('LEAN · ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound', 1390, 360, C.green, Q(S, 1, 'Lean has frozen', 0.6), 16);
    const vq = Q(S, 1, 'The volume extends', 0.6);
    chip(1400, 470, 560, 64, 'several sub-kernels · one fixed carrier', C.orange, vq, 22);
    lblG('m = 5 ,  r = 4  →  one step', 1400, 580, C.gold, Q(S, 1, 'that is a single step', 0.6), 30);
    lbl('mass + three means', 1400, 630, C.dim, Q(S, 1, 'that is a single step', 0.6), 20);
  }
};

/* ---- 05 LABELS ---- */
const LEG60 = [[1, 3, 6, 8], [2, 4, 7], [1, 4, 6], [3, 5, 8], [1, 3, 5, 7], [2, 5, 8], [4, 6, 8], [1, 6]];
SCENES.labels = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), wts = [2, 3, 5, 8, 13, 21, 34, 55], set = LEG60[Math.floor(t * 0.8) % LEG60.length];
  const wq = Q(S, 0, 'weighted two, three, five, eight', 0.6);
  for (let i = 0; i < 8; i++) { const x = 360 + i * 140, on = set.includes(i + 1); if (i) line(x - 140 + 30, 360, x - 30, 360, C.dim, s0, 2); ring(x, 360, 30, C.cyan, s0, 2); if (on && wq > 0) dot(x, 360, 28, 'c', wq); lbl(String(wts[i]), x, 368, on && wq > 0 ? '#06121c' : C.white, wq, 22); lbl(String(i + 1), x, 420, C.dim, s0, 16); }
  const sum = set.reduce((acc, i) => acc + wts[i - 1], 0);
  lbl('{' + set.join(', ') + '}  →  ' + set.map(i => wts[i - 1]).join(' + ') + ' = ' + sum, 850, 490, C.gold, Q(S, 0, 'Different legal sets always have different weighted sums', 0.6), 24);
  const mq = Q(S, 0, 'the largest legal sum using the first r positions', 0.6), Mr = [[1, 2, 3], [2, 3, 5], [3, 7, 8], [4, 11, 13], [5, 20, 21], [6, 32, 34]];
  lbl('r', 520, 590, C.white, mq, 20); lblG('M_r = F(r+3) − 1 or 2', 820, 590, C.gold, mq, 22); lblG('next weight', 1160, 590, C.cyan, mq, 22);
  Mr.forEach(([r, m, w], i) => { const y = 630 + i * 36, qq = Q(S, 0, 'the largest legal sum', 0.4, i * 0.25); lbl(String(r), 520, y, C.white, qq, 20); lbl(String(m), 820, y, C.gold, qq, 20); lbl('<  ' + w, 1160, y, C.cyan, qq, 20); });
  const lq = Q(S, 1, 'So the labels lose nothing', 0.6);
  chip(1600, 640, 420, 64, 'labels : lossless', C.green, lq, 24);
  chip(1600, 740, 420, 64, 'hiding : observation', C.mag, Q(S, 1, 'Hiding comes only from compressing the observation', 0.6), 24);
};

/* ---- 06 BASIS ---- */
SCENES.basis = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'lean']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Lean has frozen', 0.6) * 0.7;
  const rowsN = ['1', 'x₁', 'x₂', 'x₃', 'x₁x₃'], colsN = ['∅', '{1}', '{2}', '{3}', '{1,3}'], sets = [[], [1], [2], [3], [1, 3]], cw = 84, x0 = 330, y0 = 330;
  const mq = Q(S, 0, 'The evaluation matrix', 0.6) * f1, oq = Q(S, 0, 'one for each legal set', 0.6) * f1;
  rowsN.forEach((r, i) => lblG(r, x0 - 40, y0 + i * cw + cw / 2 + 8, C.cyan, oq, 22, 'right'));
  colsN.forEach((c, j) => lbl(c, x0 + j * cw + cw / 2, y0 - 16, C.white, mq, 18));
  sets.forEach((A, i) => sets.forEach((B, j) => { const v = A.every(e => B.includes(e)) ? 1 : 0, x = x0 + j * cw, y = y0 + i * cw; if (v) fillBox(x + 3, y + 3, cw - 6, cw - 6, i === j ? C.gold : C.cyan, mq * (i === j ? 0.5 : 0.3)); rect60(x, y, cw, cw, C.dim, mq, 1.2); lbl(String(v), x + cw / 2, y + cw / 2 + 8, v ? C.white : C.dim, mq, 22); }));
  lbl('x_A(I) = 1[A ⊆ I]  ·  triangular, ones on the diagonal', x0 + 2.5 * cw, y0 + 5 * cw + 46, C.gold, mq, 18);
  const iq = Q(S, 0, 'Möbius inversion', 0.6) * f1;
  eqnG('p_I = Σ over J ⊇ I of (−1)^(|J| − |I|) κ_J', 1360, 380, iq, C.white, 28);
  eqn('p_∅ = 1 − X − Y − Z + κ', 1360, 450, iq, C.gold, 28);
  eqnG('κ_J = Σ over I ⊇ J of p_I', 1360, 520, iq, C.cyan, 28);
  const lq = Q(S, 1, 'Lean has frozen', 0.6);
  if (lq > 0) {
    box(1000, 600, 760, 250, C.green, lq, 2, 'rgba(0,0,0,0.6)');
    lblG('dim (all linear relations) = F(n+2)²', 1380, 650, C.white, lq, 26);
    const dv = [4, 9, 25, 64, 169, 441];
    dv.forEach((v, i) => { const x = 1080 + i * 110, qq = Q(S, 1, 'has dimension F n plus two, squared', 0.4, i * 0.2); lbl(String(v), x, 710, C.cyan, qq, 22); lbl('n=' + (i + 1), x, 740, C.dim, qq, 16); if (i) lbl((v / dv[i - 1]).toFixed(2), x - 55, 780, C.gold, Q(S, 1, 'the ratio of consecutive dimensions', 0.4, i * 0.2), 16); });
    lbl('ratio → φ² ≈ 2.618', 1380, 820, C.gold, Q(S, 1, 'tends to the golden ratio squared', 0.6), 20);
    lbl('LEAN · AdmissibleRelationSpaceGrowth.admissible_relation_space_finrank / _growth', 1380, 570, C.green, lq, 15);
  }
  void t;
};

/* ---- 07 HIERARCHY ---- */
SCENES.hierarchy = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Second-order readings first fail', 0.6) * 0.75;
  eqn('N(n, k) = C(n − k + 1, k)', 520, 300, Q(S, 0, 'Legal sets of size k', 0.6), C.white, 30);
  const data = [[3, 5, 4], [4, 8, 5], [5, 13, 6], [6, 21, 7], [7, 34, 8]], hs = 11, y0 = 800;
  const vq = Q(S, 0, 'First-order readings span', 0.6) * f1, hq = Q(S, 0, 'stay hidden', 0.6) * f1;
  data.forEach(([n, tot, vis], i) => { const x = 240 + i * 150, qq = vq * clamp((S.u - lineAt(S, 0).s - (lineAt(S, 0).e - lineAt(S, 0).s) * 0.45 - i * 0.2) / 0.4); fillBox(x, y0 - vis * hs, 90, vis * hs, C.cyan, qq * 0.45); rect60(x, y0 - vis * hs, 90, vis * hs, C.cyan, qq, 2); const hh = (tot - vis) * hs; fillBox(x, y0 - vis * hs - hh, 90, hh, C.mag, hq * 0.45); rect60(x, y0 - vis * hs - hh, 90, hh, C.mag, hq, 2); lbl(String(tot - vis), x + 45, y0 - tot * hs - 14, C.mag, hq, 22); lbl('n=' + n, x + 45, y0 + 30, C.white, qq, 18); });
  lbl('visible  n + 1', 400, 360, C.cyan, vq, 20, 'left'); lbl('hidden  F(n+2) − n − 1', 400, 395, C.mag, hq, 20, 'left');
  const q = Q(S, 1, 'Second-order readings first fail', 0.6, 0.3);
  if (q > 0) {
    for (let i = 0; i < 5; i++) { const x = 1150 + i * 120, on = i % 2 === 0; if (i) line(x - 120 + 28, 340, x - 28, 340, C.dim, q, 2); ring(x, 340, 28, C.mag, q, 2); if (on) dot(x, 340, 26, 'm', q); lbl(String(i + 1), x, 400, C.white, q, 18); }
    lblG('x₁ x₃ x₅ : third-order seam', 1390, 450, C.mag, Q(S, 1, 'leaves a single third-order seam', 0.6), 26);
    const st = [[1, 3], [2, 5], [3, 7], [4, 9]], gq = Q(S, 1, 'In general, readings of order r first fail', 0.6);
    lbl('order r', 1180, 540, C.white, gq, 20); lbl('first fails at n', 1520, 540, C.white, gq, 20);
    st.forEach(([r, n], i) => { const qq = Q(S, 1, 'In general, readings of order r first fail', 0.4, i * 0.3); const y = 590 + i * 50; lbl(String(r), 1180, y, C.cyan, qq, 24); lbl(String(n) + '  (1 hidden)', 1520, y, C.mag, qq, 24); });
    lblG('n = 2r + 1', 1390, 820, C.gold, Q(S, 1, 'the longer the window', 0.6), 32);
  }
  void t;
};

/* ---- 08 IDENTIFY ---- */
SCENES.identify = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'With several hidden directions', 0.6);
  if (f1 > 0) {
    const a = s0 * f1, kap = 0.15 + 0.12 * Math.sin(t * 1.2), A = [0.30, 0.25, 0.18, 0.12, 0.08, 0.07], B = [-0.30, -0.10, 0.05, 0.12, 0.13, 0.10];
    const x0 = 420, y0 = 700, bw = 70;
    plotAxes(x0 - 20, y0, 6 * (bw + 20) + 20, 400, a, 'waiting time', 'law');
    const eq = Q(S, 0, 'Whenever B gives some event a nonzero mass', 0.6) * f1;
    fillBox(x0 + 3 * (bw + 20) - 10, y0 - 380, 3 * (bw + 20) + 10, 380, C.gold, eq * 0.12); lbl('event E', x0 + 4.5 * (bw + 20), y0 - 390, C.gold, eq, 20);
    A.forEach((v, i) => { const c = v + kap * B[i], h = c * 900; fillBox(x0 + i * (bw + 20), y0 - h, bw, h, C.cyan, a * 0.45); rect60(x0 + i * (bw + 20), y0 - h, bw, h, C.cyan, a, 2); });
    eqn('C = A + κ B', 1380, 330, Q(S, 0, 'the mixture is A plus kappa times B', 0.6) * f1, C.white, 34);
    lbl('κ = ' + kap.toFixed(3), 1380, 400, C.mag, Q(S, 0, 'If each state carries a known waiting law', 0.6) * f1, 26);
    eqn('κ = ( C(E) − A(E) ) / B(E)', 1380, 520, Q(S, 0, 'kappa is the event', 0.6) * f1, C.gold, 32);
  }
  const q = Q(S, 1, 'With several hidden directions', 0.6, 0.3);
  if (q > 0) {
    const L4 = ['∅', '1', '2', '3', '4', '13', '14', '24'], qv = [0, 0, 0, -1, 1, 1, -1, 0], cl = [2, 2, 2, 2, 2, 3, 3, 3];
    const x0 = 300, dx = 120;
    L4.forEach((s, i) => { const x = x0 + i * dx; lbl(s, x, 700, C.white, q, 22); });
    const bq = Q(S, 1, 'cannot see the difference', 0.6);
    qv.forEach((v, i) => { const x = x0 + i * dx; if (v) { fillBox(x - 30, v > 0 ? 560 - v * 80 : 560, 60, Math.abs(v) * 80, v > 0 ? C.cyan : C.red, bq * 0.5); rect60(x - 30, v > 0 ? 560 - v * 80 : 560, 60, Math.abs(v) * 80, v > 0 ? C.cyan : C.red, bq, 2); } line(x - 30, 560, x + 30, 560, C.dim, bq, 1.5); });
    lbl('q = e₄ − e₃ + e₁₃ − e₁₄', x0 + 3.5 * dx, 420, C.white, bq, 24);
    const kq = Q(S, 1, 'a clock that reads kappa one three', 0.6);
    cl.forEach((v, i) => lbl(v === 3 ? '3/8' : '1/4', x0 + i * dx, 760, v === 3 ? C.gold : C.dim, kq, 18));
    lbl('clock : success 1/4 + (x₁₃ + x₁₄ + x₂₄)/8', x0 + 3.5 * dx, 810, C.gold, kq, 20);
    const zq = Q(S, 1, 'the means and the clock both stay fixed', 0.6);
    lbl('means · q = 0', 1640, 500, C.green, zq, 26); lbl('clock · q = 0', 1640, 560, C.green, zq, 26);
    stamp('BLIND', 1640, 680, zq, C.red, 56, -0.06);
  }
  void t;
};

/* ---- 09 POTENTIAL ---- */
SCENES.potential = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical']);
  const s0 = clamp(u), wq = Q(S, 0, 'a waiting law is not an additive clock step', 0.6);
  [0.1, 0.35, 0.3, 0.15, 0.1].forEach((v, i) => { fillBox(300 + i * 34, 420 - v * 300, 26, v * 300, C.cyan, wq * 0.5); });
  lbl('waiting law', 385, 460, C.cyan, wq, 18); lblG('≠  Δ', 560, 380, C.red, wq, 34); lbl('additive step', 600, 460, C.red, wq, 18);
  const pq = Q(S, 0, 'a potential exists exactly when every signed cycle sums to zero', 0.6);
  lblG('potential  ⇔  Σ over every signed cycle = 0', 1350, 330, C.white, pq, 28);
  const dq = Q(S, 0, 'A diamond whose two paths', 0.6), N = { s: [760, 650], u: [1060, 500], v: [1060, 800], t: [1360, 650] };
  [['s', 'u', '1', C.cyan], ['u', 't', '1', C.cyan], ['s', 'v', '1', C.mag], ['v', 't', '2', C.mag]].forEach(([a, b, w, col]) => { const p = N[a], q = N[b]; arrow(p[0] + (q[0] - p[0]) * 0.1, p[1] + (q[1] - p[1]) * 0.1, p[0] + (q[0] - p[0]) * 0.9, p[1] + (q[1] - p[1]) * 0.9, col, dq, 3); lbl(w, (p[0] + q[0]) / 2 + (b === 'u' || a === 'u' ? -20 : 20), (p[1] + q[1]) / 2 + (b === 'u' || a === 'u' ? -16 : 30), col, dq, 26); });
  Object.entries(N).forEach(([k, p]) => { dot(p[0], p[1], 16, 'w', dq); lbl(k, p[0], p[1] - 28, C.white, dq, 22); });
  lbl('path s→u→t : 2', 1650, 520, C.cyan, dq, 22); lbl('path s→v→t : 3', 1650, 560, C.mag, dq, 22);
  lbl('signed cycle : 1 + 1 − 2 − 1 = −1', 1650, 620, C.red, Q(S, 0, 'yet no potential', 0.6), 20);
  const lq = Q(S, 0, 'a layered global time', 0.6);
  [['0', N.s], ['1', N.u], ['1', N.v], ['2', N.t]].forEach(([l, p]) => lbl('layer ' + l, p[0], p[1] + 44, C.gold, lq, 18));
  lbl('no directed cycle', 1650, 700, C.green, Q(S, 0, 'has no directed cycle', 0.6), 20);
  stamp('NO POTENTIAL', 1650, 800, Q(S, 0, 'yet no potential', 0.6), C.red, 44, -0.05);
  void t; void s0;
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['SPLIT', 'D_aD_b = S + H', C.cyan, 'Two changes mix symmetrically'], ['STATIC', '[M_x, M_y] = 0', C.green, 'the static seam is symmetric'], ['DELAY', 'R U² d = 1', C.gold, 'delay needs no non-commutation'], ['LABELS', 'lossless', C.orange, 'Fibonacci labels lose nothing'], ['HIERARCHY', 'n = 2r + 1', C.mag, 'the hidden part climbs a hierarchy']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 270 + i * 345, q = Q(S, 0, ph) * fade; box(x - 160, 240, 320, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 22); });
    lbl('LEAN · admissible_relation_space_finrank · admissible_relation_space_growth · observable_krylov_strict_growth_bound', W / 2, 480, C.green, Q(S, 1, 'Lean has frozen') * fade, 17);
    lbl('VOLUME · order split · five-state example · hierarchy · clock statements', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory volume') * fade, 19);
    lbl('CLASSICAL · counting · Möbius inversion · Zeckendorf sums · potentials      RECOMPUTED · every number', W / 2, 600, C.white, Q(S, 1, 'with classical tools') * fade, 18);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr60(W / 2, 360, 200, 0.5 + t * 0.2, a, { fillBase: true, lab: 0 });
    txt('AURIC FIB ATOM PYRAMID XXXI', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXXI · 对称混合、路径缺陷与 Fibonacci 层级 · TRURETURING FILM 060', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two kinds of second-order change.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WHAT KIND OF CHANGE', split: 'SYMMETRIC AND ANTISYMMETRIC', orders: 'TWO ORDERS', delay: 'DELAY AND HORIZON', labels: 'LOSSLESS LABELS', basis: 'MONOMIAL BASIS', hierarchy: 'FIBONACCI HIERARCHY', identify: 'CLOCK READOUT', potential: 'NO POTENTIAL', finale: 'LEDGER' });

function poster60() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr60(500, 520, 330, 0.6, 1, { fillBase: true });
  [1, 3, 7, 14, 26].forEach((v, i) => { const x = 1080 + i * 120, h = v * 13; fillBox(x, 700 - h, 80, h, C.mag, 0.45); rect60(x, 700 - h, 80, h, C.mag, 1, 2.5); txt(String(v), x + 40, 680 - h, { size: 30, fam: FG, w: 700, align: 'center', c: C.white }); txt('n=' + (i + 3), x + 40, 740, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim }); });
  txt('D_aD_b = S + H', 1360, 280, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('F(n+2) − n − 1', 1360, 780, { size: 36, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('FIB 原子金字塔 XXXI', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXXI', W / 2, 890, { size: 78, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('两 种 二 阶 变 化', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 060', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster60;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
