/* Film 058 */

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

/* ---- film 058: output-resolved instrument closure and seam curvature ---- */
const _po58 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po58.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po58.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect58(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
function ell58(x, y, rx, ry, col, a, lw = 2, dash = false) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
const MODES58 = [['0', [0, 0, 0], 'n'], ['[2]', [1, 0, 0], 'c'], ['[3]', [0, 0, 1], 'g'], ['[5]', [0, 1, 0], 'o'], ['[25]', [1, 1, 0], 'm']];
const PEDGE58 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
const NM58 = ['∅', '[2]', '[3]', '[5]', '[2,5]'], COL58 = () => [C.dim, C.cyan, C.green, C.gold, C.mag], DOT58 = ['n', 'c', 'g', 'o', 'm'];
function pyr58(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES58.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE58.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.8, 1.8));
  if (opt.labels !== false) MODES58.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(m[0], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -20 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return W3;
}
function bars58(p, x0, y0, bw, gap, hs, a, cols, labels = true) { p.forEach((v, i) => { const x = x0 + i * (bw + gap), h = v * hs; fillBox(x, y0 - Math.max(h, 0), bw, Math.abs(h), cols[i], a * 0.45); rect58(x, y0 - Math.max(h, 0), bw, Math.max(Math.abs(h), 1), cols[i], a, 2); if (labels) lbl(NM58[i], x + bw / 2, y0 + 32, C.white, a, 18); }); }
function lamp58(x, y, on, a, lab) { dot(x, y, on ? 18 : 10, on ? 'm' : 'n', a); if (lab) lbl(lab, x, y + 40, C.dim, a, 18); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  pyr58(560, 470, 280, 0.6 + t * 0.2, s0, { fillBase: true });
  const ib = 0.5 + 0.5 * Math.sin(t * 2.3);
  box(880, 380, 220, 180, C.cyan, s0, 2, 'rgba(0,0,0,0.5)'); lbl('instrument', 990, 420, C.cyan, s0, 20); lamp58(950, 490, ib > 0.5, s0, 'o₁'); lamp58(1030, 490, Math.sin(t * 1.7) > 0, s0, 'o₂');
  arrow(780, 470, 870, 470, C.dim, s0, 2.5);
  [['in a product', 'in a product', C.cyan], ['in an action', 'in an action', C.gold], ['in the output labels', 'only in the labels', C.mag]].forEach(([s, ph, col], i) => chip(1490, 360 + i * 90, 460, 62, s, col, Q(S, 0, ph), 24));
  chip(700, 800, 480, 64, 'average : closed', C.green, Q(S, 1, 'An average can look perfectly closed'), 26);
  chip(1240, 800, 480, 64, 'branches : leak κ', C.mag, Q(S, 1, 'still leak kappa'), 26);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const W3 = pyr58(W / 2, 400, 260, 0.5 + t * 0.25, rp, { fillBase: true, lab: 0.6 });
  if (W3) { const a0 = W3([0.25, 0.25, 0]), a1 = W3([0.75, 0.75, 0]); line(a0[0], a0[1], a1[0], a1[1], C.mag, rp * (0.6 + 0.4 * Math.sin(t * 3)), 4); }
  [[420, 0], [500, 1], [1420, 2], [1500, 3]].forEach(([x, k]) => lamp58(x, 400, Math.sin(t * (1.3 + k * 0.4) + k) > 0, rp));
  txt(scramble('AURIC FIB ATOM PYRAMID XXIX', rp, 458), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXIX · 输 出 分 辨 闭 包 与 接 缝 曲 率', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 058 · OUTPUT_RESOLVED_INSTRUMENT_CLOSURE + SEAM_BILINEAR_CURVATURE', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 REACTION ---- */
SCENES.reaction = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'So every function', 0.6);
  if (f1 > 0) {
    const a = s0 * f1, ph = Math.sin(t * 1.4);
    lblG('∅ + [2,5]', 640, 360, C.mag, a, 44); lblG('[2] + [5]', 1280, 360, C.cyan, a, 44);
    arrow(820, 340, 1100, 340, ph > 0 ? C.white : C.dim, a, 3); arrow(1100, 380, 820, 380, ph < 0 ? C.white : C.dim, a, 3);
    lbl('d = (1, −1, 0, −1, 1)', 960, 440, C.white, Q(S, 0, 'Read the hidden direction', 0.6) * f1, 24);
    const k = 0.15 + 0.12 * Math.sin(t * 1.4), X = 0.4, Y = 0.35, Z = 0.15, p = [1 - X - Y - Z + k, X - k, Z, Y - k, k];
    const bq = Q(S, 0, 'moving probability this way', 0.6) * f1;
    bars58(p, 520, 800, 90, 40, 700, bq, COL58());
    lbl('X = 0.40   Y = 0.35   Z = 0.15', 1440, 620, C.white, bq, 24); lbl('κ = ' + k.toFixed(3), 1440, 680, C.mag, Q(S, 0, 'changes only kappa') * f1, 28);
  }
  const q = Q(S, 1, 'So every function', 0.6, 0.3);
  if (q > 0) {
    eqn('f = f_edge + J(f) · xy', 960, 330, q, C.white, 34);
    const f = [3, 1, 2, 4, 5], e = [3, 1, 2, 4, 2], j = [0, 0, 0, 0, 3], hs = 50, y0 = 720;
    [[f, 300, 'f', C.white], [e, 820, 'f_edge', C.cyan], [j, 1340, 'J(f) · xy', C.mag]].forEach(([v, x0, nm, col], g) => { const qq = Q(S, 1, g === 0 ? 'every function on the five states' : g === 1 ? 'an edge part' : 'plus J of f', 0.5); bars58(v, x0, y0, 56, 20, hs, qq, [col, col, col, col, col]); lbl(nm, x0 + 180, 420, col, qq, 24); });
    lblG('=', 760, 620, C.white, Q(S, 1, 'an edge part', 0.5), 44); lblG('+', 1280, 620, C.white, Q(S, 1, 'plus J of f', 0.5), 44);
    lbl('J(f) = f∅ + f₁₃ − f₁ − f₃ = 3 + 5 − 1 − 4 = 3', 960, 830, C.gold, Q(S, 1, 'the four-corner difference'), 22);
  }
};

/* ---- 03 SEAM ---- */
SCENES.seam = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The volume calls it the seam curvature', 0.6);
  if (f1 > 0) {
    lbl('1, x, y, z  :  products leave the span', 960, 310, C.dim, s0 * f1, 22);
    const gx = 420, gy = 420, cw = 90, hd = ['1', 'x', 'y', 'z'], gq = Q(S, 0, 'Their product defect is a symmetric form', 0.6) * f1;
    hd.forEach((h, j) => { lbl(h, gx + j * cw, gy - 40, C.cyan, gq, 22); lbl(h, gx - 60, gy + j * 60 + 8, C.cyan, gq, 22); });
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const v = (i === 1 && j === 2) || (i === 2 && j === 1) ? 1 : 0; lbl(String(v), gx + j * cw, gy + i * 60 + 8, v ? C.mag : C.dim, gq, 26); }
    lbl('Ω on (1, x, y, z)', gx + 135, gy + 260, C.white, gq, 20);
    eqn('Ω(f, g) = J(fg) = a₁b₂ + a₂b₁', 1350, 440, Q(S, 0, 'it equals a one b two') * f1, C.mag, 30);
    const hq = Q(S, 0, 'On the two ends its matrix', 0.6) * f1;
    if (hq > 0) { lbl('H = [[0, 1], [1, 0]]', 1350, 560, C.white, hq, 28); lbl('eigenvalues  +1 , −1', 1350, 620, C.gold, Q(S, 0, 'with eigenvalues plus and minus one') * f1, 24); }
    const ex = 1130, ey = 760, sw = 0.5 + 0.5 * Math.sin(t * 2.5);
    dot(ex, ey, 14, 'c', hq); dot(ex + 440, ey, 14, 'o', hq); lbl('x', ex, ey + 40, C.cyan, hq, 22); lbl('y', ex + 440, ey + 40, C.gold, hq, 22);
    curve(z => [ex + 440 * z, ey - 90 * Math.sin(Math.PI * z)], 40, C.mag, hq * (0.5 + 0.5 * sw), 4);
  }
  const q = Q(S, 1, 'The volume calls it the seam curvature', 0.6, 0.3);
  if (q > 0) {
    chip(960, 320, 640, 60, 'hidden relation = cross-coupling of the ends', C.mag, q, 24);
    const rows = [['U = x + z', [0, 1, 1, 0, 1], C.cyan, 'x plus z'], ['V = y + z', [0, 0, 1, 1, 1], C.gold, 'y plus z'], ['UV = xy + z', [0, 0, 1, 0, 1], C.mag, 'equals x y plus z']];
    NM58.forEach((h, j) => lbl(h, 760 + j * 130, 430, C.dim, q, 20));
    rows.forEach(([nm, v, col, ph], i) => { const qq = Q(S, 1, ph, 0.5), y = 490 + i * 70; lbl(nm, 560, y, col, qq, 26, 'right'); v.forEach((b, j) => lbl(String(b), 760 + j * 130, y, b ? col : C.dim, qq, 26)); });
    eqn('κ = E[UV] − Z', 960, 790, Q(S, 1, 'so kappa is the mean'), C.green, 34);
  }
};

/* ---- 04 ACTION ---- */
SCENES.action = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'One map sends null', 0.6) * 0.0;
  const P = [[420, 630], [700, 440], [960, 630], [1220, 440], [1500, 630]], T = [1, 0, 2, 0, 4];
  eqn('U_a f = f ∘ T_a', 600, 300, Q(S, 0, 'An action pulls each function back'), C.white, 28);
  eqn('reveals κ  ⟺  J(U_a f) ≠ 0', 1350, 300, Q(S, 0, 'nonzero four-corner difference'), C.mag, 28);
  const mq = Q(S, 1, 'One map sends null', 0.8);
  P.forEach(([x, y], i) => { dot(x, y, 20, DOT58[i], s0); lbl(NM58[i], x, y + (y < 500 ? -34 : 50), C.white, s0, 22); });
  if (mq > 0) T.forEach((j, i) => { const [x1, y1] = P[i], [x2, y2] = P[j]; if (i === j) { ring(x1, y1 - 34, 18, C.gold, mq, 2.5); } else { const mx = (x1 + x2) / 2 + (y1 - y2) * 0.25, my = (y1 + y2) / 2 + (x2 - x1) * 0.12; curve(z => [(1 - z) * (1 - z) * x1 + 2 * (1 - z) * z * mx + z * z * x2, (1 - z) * (1 - z) * y1 + 2 * (1 - z) * z * my + z * z * y2], 30, C.gold, mq, 2.5); const ex = x2 + (mx - x2) * 0.12, ey = y2 + (my - y2) * 0.12; arrow(ex, ey, x2 + (ex - x2) * 0.4, y2 + (ey - y2) * 0.4, C.gold, mq, 2.5); } });
  const vq = Q(S, 1, 'Then x after the move', 0.6);
  if (vq > 0) {
    ['1', '0', '0', '0', '1'].forEach((v, i) => lbl("x' = " + v, P[i][0], P[i][1] + (P[i][1] < 500 ? -70 : 86), C.cyan, vq, 20));
    chip(600, 830, 360, 56, 'J(x ∘ T) = 2', C.mag, Q(S, 1, 'with J equal to two'), 24);
    const lq = Q(S, 1, 'two laws with the same means', 0.6);
    lbl('(X, Y, Z) = (0.4, 0.4, 0.1)', 1300, 790, C.white, lq, 22);
    lbl("κ = 0.1 :  E[x'] = 0.3", 1300, 835, C.cyan, lq, 24); lbl("κ = 0.3 :  E[x'] = 0.7", 1300, 875, C.gold, lq, 24);
  }
};

/* ---- 05 HORIZON ---- */
SCENES.horizon = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const s0 = clamp(u), g = Q(S, 1, 'grows strictly at most', 0.6);
  const dims = [1, 2, 3, 4, 4, 4], nst = Math.min(6, Math.floor(u / 0.9) + 1);
  for (let m = 0; m < nst; m++) { const h = dims[m] * 80, x = 380 + m * 110, col = m > 0 && dims[m] === dims[m - 1] ? C.dim : C.cyan; fillBox(x, 760 - h, 80, h, col, s0 * 0.4); rect58(x, 760 - h, 80, h, col, s0, 2); lbl('m=' + m, x + 40, 795, C.dim, s0, 18); }
  lbl('observable Krylov tower', 680, 330, C.white, s0, 22);
  if (g > 0) { dashed(370, 760 - 4 * 80, 1050, 760 - 4 * 80, C.gold, g, 2); lbl('≤ n − rank C = 4 growths', 710, 760 - 4 * 80 - 16, C.gold, g, 20); }
  const l0 = Q(S, 0, 'Lean has frozen the general answer', 0.6);
  if (l0 > 0) { box(1120, 340, 700, 200, C.green, l0, 2, 'rgba(0,0,0,0.6)'); lbl('LEAN · FiniteObservabilityOrthogonalDuality', 1470, 385, C.green, l0, 19); lbl('finite_unobservable_eq_observable_orthogonal', 1470, 425, C.green, l0, 18); lbl('⋂_{k≤m} ker(C Tᵏ) = (Krylov space)ᗮ', 1470, 480, C.white, Q(S, 0, 'orthogonal complement', 0.5), 22); }
  if (g > 0) { box(1120, 580, 700, 220, C.green, g, 2, 'rgba(0,0,0,0.6)'); lbl('LEAN · ObservableKrylovGrowthBound', 1470, 625, C.green, g, 19); lbl('strict growths ≤ n − rank C', 1470, 665, C.white, g, 22); lbl('LEAN · ObservableKrylovPermanentStability', 1470, 715, C.green, Q(S, 1, 'once it stalls', 0.6), 19); lbl('stalls once ⟹ stalls forever', 1470, 755, C.white, Q(S, 1, 'once it stalls', 0.6), 22); }
  chip(680, 860, 560, 56, '5 states, 1 record : ≤ 4 growth steps', C.gold, Q(S, 1, 'at most four growth steps'), 22);
};

/* ---- 06 INSTRUMENT ---- */
SCENES.instrument = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The four records', 0.6);
  if (f1 > 0) {
    eqn('M_{a,o}(s, t) = Pr(o, next = t | s, a) ,   K_a = Σ_o M_{a,o}', 960, 320, Q(S, 0, 'Split each action into sub-kernels') * f1, C.white, 24);
    const steps = [['state s', 300, C.white, 'Take a two-step instrument'], ['report o₁ = x', 660, C.cyan, 'report x'], ['y = 1 → [2]\ny = 0 → ∅', 1020, C.gold, 'jump to two'], ['report o₂ = x = y', 1400, C.mag, 'report x again']];
    steps.forEach(([s, x, col, ph], i) => { const q = Q(S, 0, ph, 0.6) * f1; box(x - 140, 470, 280, 120, col, q, 2, 'rgba(0,0,0,0.5)'); s.split('\n').forEach((ln, k, arr) => lbl(ln, x, 530 + (k - (arr.length - 1) / 2) * 30 + 8, col, q, 20)); if (i) arrow(x - 220, 530, x - 150, 530, C.dim, q, 2.5); });
    lamp58(660, 680, Math.sin(t * 2) > 0, Q(S, 0, 'report x', 0.6) * f1, 'o₁'); lamp58(1400, 680, Math.sin(t * 2 + 1) > 0, Q(S, 0, 'report x again', 0.6) * f1, 'o₂');
  }
  const q = Q(S, 1, 'The four records', 0.6, 0.3);
  if (q > 0) {
    const X = 0.4, Y = 0.35, k = 0.15 + 0.12 * Math.sin(t * 1.2), rec = [['(0, 0)', '1 − X − Y + κ', 1 - X - Y + k], ['(1, 0)', 'X − κ', X - k], ['(0, 1)', 'Y − κ', Y - k], ['(1, 1)', 'κ', k]];
    rec.forEach(([r, fm, v], i) => { const y = 380 + i * 100, hot = i === 3, qq = Q(S, 1, 'The four records', 0.5, i * 0.3); lbl(r, 500, y + 8, hot ? C.mag : C.white, qq, 28); lbl(fm, 820, y + 8, hot ? C.mag : C.white, qq, 26); fillBox(1040, y - 24, v * 1400, 48, hot ? C.mag : C.cyan, qq * 0.45); rect58(1040, y - 24, v * 1400, 48, hot ? C.mag : C.cyan, qq, 2); lbl(v.toFixed(3), 1060 + v * 1400, y + 8, C.white, qq, 20, 'left'); });
    chip(960, 820, 520, 60, 'Pr(1, 1) = κ', C.mag, Q(S, 1, 'happens with probability exactly kappa'), 30);
  }
};

/* ---- 07 CANCEL ---- */
SCENES.cancel = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'One step of records', 0.6);
  if (f1 > 0) {
    [['K1 = 1', 'it sends one to one'], ['Kx = y', 'x to y'], ['Ky = Kz = 0', 'and y and z to zero']].forEach(([s, ph], i) => chip(420, 380 + i * 90, 340, 60, s, C.green, Q(S, 0, ph) * f1, 26));
    lbl('averaged kernel : span{1, x, y, z} closed', 420, 320, C.green, Q(S, 0, 'keeps the visible span closed') * f1, 20);
    const bq = Q(S, 0, 'Branch by branch', 0.6) * f1, cq = Q(S, 0, 'The hidden parts cancel', 1.2) * f1;
    eqn('M₁x = xy', 1120, 400, bq, C.mag, 30); eqn('M₀x = y − xy', 1520, 400, Q(S, 0, 'output zero sends x', 0.5) * f1, C.cyan, 30);
    const sep = 200 * (1 - cq), cx = 1320, cy = 600;
    if (bq > 0) { box(cx - sep - 160, cy - 40, 140, 80, C.mag, bq * (1 - cq * 0.8), 2, 'rgba(255,61,240,0.25)'); lbl('+ xy', cx - sep - 90, cy + 8, C.mag, bq * (1 - cq * 0.8), 26); box(cx + sep + 20, cy - 40, 140, 80, C.mag, bq * (1 - cq * 0.8), 2, 'rgba(255,61,240,0.25)'); lbl('− xy', cx + sep + 90, cy + 8, C.mag, bq * (1 - cq * 0.8), 26); }
    if (cq > 0.5) lbl('M₀x + M₁x = y', cx, cy + 120, C.green, (cq - 0.5) * 2, 28);
  }
  const q = Q(S, 1, 'One step of records', 0.6, 0.3);
  if (q > 0) {
    const dims = [1, 2, 4, 4];
    dims.forEach((dv, m) => { const qq = Q(S, 1, 'grows from one to two to four', 0.4, m * 0.35), h = dv * 90, x = 420 + m * 140; fillBox(x, 760 - h, 100, h, m >= 2 ? C.mag : C.cyan, qq * 0.4); rect58(x, 760 - h, 100, h, m >= 2 ? C.mag : C.cyan, qq, 2); lbl('dim ' + dv, x + 50, 760 - h - 14, C.white, qq, 20); lbl('m=' + m, x + 50, 795, C.dim, qq, 18); });
    lbl('record-only closure', 630, 330, C.white, q, 22);
    eqn('d · M₁1 = 0', 1360, 420, Q(S, 1, 'One step of records shows nothing'), C.dim, 30);
    eqn('d · M₁M₁1 = 1', 1360, 500, Q(S, 1, 'two steps expose kappa'), C.mag, 30);
    chip(1360, 640, 640, 60, 'averaged closure ≠ output-labelled closure', C.gold, Q(S, 1, 'Averaged future closure cannot replace'), 22);
  }
};

/* ---- 08 BAYES ---- */
SCENES.bayes = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical']);
  const s0 = clamp(u);
  eqn('Q_E(κ) = Q₀ + c_E κ', 1380, 330, Q(S, 0, 'an event whose probability is affine'), C.white, 28);
  eqn('E[κ | E] − E[κ] = c_E · Var(κ) / E[Q_E]', 1380, 410, Q(S, 0, 'the mean shifts by the slope'), C.gold, 26);
  lbl('belief moves  ⟺  c_E ≠ 0', 1380, 480, C.mag, Q(S, 0, 'exactly when its slope is nonzero'), 24);
  const m = Q(S, 0, 'seeing one, one moves the mean', 1.6), pr = [0.5 * (1 - m) + 0.25 * m, 0.5 * (1 - m) + 0.75 * m], bx = 420;
  [['κ = 0.1', pr[0], C.cyan], ['κ = 0.3', pr[1], C.mag]].forEach(([nm, v, col], i) => { const x = bx + i * 220, h = v * 400, q = Q(S, 0, 'With kappa equally likely', 0.6); fillBox(x, 760 - h, 140, h, col, q * 0.45); rect58(x, 760 - h, 140, h, col, q, 2); lbl(nm, x + 70, 800, C.white, q, 20); lbl(v.toFixed(2), x + 70, 760 - h - 14, col, q, 22); });
  const mean = 0.2 + 0.05 * m, mq = Q(S, 0, 'With kappa equally likely', 0.6);
  lbl('E[κ] = ' + mean.toFixed(3), 640, 330, C.gold, mq, 28);
  lbl(m > 0.05 ? 'after (1, 1) : prior × κ' : 'prior', 640, 380, C.dim, mq, 20);
  lbl('= 1 × 0.01 / 0.2 = 0.05', 1380, 560, C.white, Q(S, 0, 'from 0.2 to 0.25'), 24);
  chip(1380, 660, 440, 58, 'E[κ] : 0.20 → 0.25', C.green, Q(S, 0, 'from 0.2 to 0.25'), 26);
};

/* ---- 09 MEMORY ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'If no word sees it', 0.6) * 0.5;
  [['linear', 'E f', 'J_f ≠ 0', C.cyan, 'a single mean'], ['joint', 'E[fg]', 'Ω(f, g) ≠ 0', C.gold, 'a paired product'], ['future', 'records', 'd · M_ω 1 ≠ 0', C.mag, 'a future record']].forEach(([a1, b1, c1, col, ph], i) => { const y = 340 + i * 110, q = Q(S, 0, ph, 0.6) * f1; chip(420, y, 240, 64, a1, col, q, 26); lbl(b1, 720, y + 8, C.white, q, 26); arrow(830, y, 960, y, C.dim, q, 2.5); chip(1180, y, 380, 64, c1, col, q, 26); });
  lbl('none replaces another', 1640, 450, C.dim, Q(S, 0, 'none replaces another') * f1, 20);
  const q = Q(S, 1, 'If no word sees it', 0.6, 0.3);
  if (q > 0) {
    box(300, 690, 600, 170, C.dim, q, 2, 'rgba(0,0,0,0.6)'); lbl('no word sees κ', 600, 735, C.white, q, 24); lbl('hidden forever · (X, Y, Z) enough', 600, 790, C.dim, q, 20);
    const q2 = Q(S, 1, 'if one does', 0.6); box(1020, 690, 600, 170, C.mag, q2, 2, 'rgba(0,0,0,0.6)'); lbl('some word sees κ', 1320, 735, C.mag, q2, 24); lbl('identifiable at depth ρ', 1320, 780, C.white, q2, 20); lbl('memory : + 1 scalar', 1320, 820, C.green, Q(S, 1, 'one extra scalar of memory'), 22);
  }
};

/* ---- 10 MAINTAIN ---- */
SCENES.maintain = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const A = [700, 520], D = [1220, 520], N = [960, 800];
  box(520, 380, 880, 290, C.green, s0 * 0.7, 2, 'rgba(0,255,150,0.04)'); lbl('safe set K', 960, 410, C.green, s0, 20);
  dot(A[0], A[1], 22, 'c', s0); lbl('A = [2]', A[0], A[1] + 56, C.cyan, s0, 22); lbl('x = 1', A[0], A[1] + 86, C.dim, Q(S, 0, 'report the same x'), 18);
  dot(D[0], D[1], 22, 'm', s0); lbl('D = [2,5]', D[0], D[1] + 56, C.mag, s0, 22); lbl('x = 1', D[0], D[1] + 86, C.dim, Q(S, 0, 'report the same x'), 18);
  dot(N[0], N[1], 18, 'n', s0); lbl('∅  (unsafe)', N[0], N[1] + 44, C.red, s0, 20);
  const lq = Q(S, 0, 'Action L keeps the first safe', 0.6), rq = Q(S, 0, 'action R keeps the second safe', 0.6), wq = Q(S, 0, 'each wrong action falls to null', 0.6);
  ring(A[0] - 50, A[1] - 40, 26, C.green, lq, 3); lbl('L', A[0] - 96, A[1] - 60, C.green, lq, 24);
  ring(D[0] + 50, D[1] - 40, 26, C.green, rq, 3); lbl('R', D[0] + 96, D[1] - 60, C.green, rq, 24);
  arrow(A[0] + 20, A[1] + 30, N[0] - 30, N[1] - 20, C.red, wq, 2.5); lbl('R', 820, 690, C.red, wq, 22);
  arrow(D[0] - 20, D[1] + 30, N[0] + 30, N[1] - 20, C.red, wq, 2.5); lbl('L', 1100, 690, C.red, wq, 22);
  const mq = Q(S, 1, 'the merged belief has no common safe action', 0.6);
  if (mq > 0) {
    ell58(960, 540, 360, 110, C.gold, mq, 3, true); lbl('merged belief {A, D}', 960, 470, C.gold, mq, 22);
    lbl('Safe(A) = {L}', 330, 470, C.cyan, mq, 22, 'left'); lbl('Safe(D) = {R}', 330, 510, C.mag, mq, 22, 'left'); lbl('∩ = ∅', 330, 560, C.red, mq, 28, 'left');
    lbl('V* = { ∅, {A}, {D} }', 1640, 470, C.white, Q(S, 1, 'the greatest safe fixed point'), 22); lbl('{A, D} ∉ V*', 1640, 520, C.red, Q(S, 1, 'not the pair'), 24);
    lbl('forget only when a shared action', 1640, 600, C.green, Q(S, 1, 'Forgetting is safe only when'), 20); lbl('keeps the next belief safe', 1640, 632, C.green, Q(S, 1, 'Forgetting is safe only when'), 20);
  }
};

/* ---- 11 TIME ---- */
SCENES.time = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [0, 'And the same hiding appears in 5040', 'theory'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The volume also offers', 0.6);
  if (f1 > 0) {
    const a = s0 * f1, ch = [[320, 420], [460, 360], [600, 420], [740, 360]];
    ch.forEach(([x, y], i) => { dot(x, y, 14, 'c', a); lbl('τ=' + i, x, y - 28, C.cyan, a, 18); if (i) arrow(ch[i - 1][0] + 14, ch[i - 1][1], x - 14, y, C.cyan, a, 2.5); });
    lbl('acyclic : strict time', 530, 500, C.green, a, 20);
    const cq = Q(S, 0, 'with cycles only a preorder remains', 0.6) * f1, cc = [[420, 640], [560, 640], [490, 740]];
    cc.forEach(([x, y], i) => { dot(x, y, 14, 'o', cq); const [x2, y2] = cc[(i + 1) % 3]; arrow(x + (x2 - x) * 0.15, y + (y2 - y) * 0.15, x + (x2 - x) * 0.85, y + (y2 - y) * 0.85, C.gold, cq, 2.5); });
    lbl('cycle : only a preorder', 490, 820, C.red, cq, 20);
    const tq = Q(S, 0, 'And the same hiding appears in 5040', 0.6) * f1;
    eqn('u = a₂ + a₇ ,  v = a₃ ,  w = a₅ + a₇', 1380, 330, tq, C.white, 24);
    const rows = [['7', '(1, 0, 1)', 'a₇ = 1', C.cyan, 'so 7 and 10'], ['10', '(1, 0, 1)', 'a₇ = 0', C.cyan, 'so 7 and 10'], ['7200', '(5, 2, 2)', 'a₇ = 0', C.gold, 'and 7200'], ['5040', '(5, 2, 2)', 'a₇ = 1', C.mag, 'and 7200'], ['3528', '(5, 2, 2)', 'a₇ = 2', C.gold, 'and 7200']];
    rows.forEach(([n, r, k, col, ph], i) => { const y = 420 + i * 70 + (i >= 2 ? 30 : 0), q = Q(S, 0, ph, 0.5, (i % 3) * 0.25) * f1; lbl(n, 1120, y, col, q, 28, 'right'); lbl(r, 1340, y, C.white, q, 26); lbl(k, 1600, y, col, q, 24); });
  }
  const q = Q(S, 1, 'The volume also offers', 0.6, 0.3);
  if (q > 0) {
    [['selective future quotient', 'a selective future quotient', C.cyan], ['executable memory update', 'an executable memory update', C.gold], ['safe feasible control', 'safe feasible control', C.green]].forEach(([s, ph, col], i) => { const x = 420 + i * 540, qq = Q(S, 1, ph, 0.6); chip(x, 480, 460, 70, s, col, qq, 22); if (i) lblG('+', x - 270, 492, C.white, qq, 40); });
    lbl('candidate definition of life', 960, 380, C.white, q, 26);
    stamp('OPEN MODEL', 960, 700, Q(S, 1, 'It remains an open model', 0.6), C.vio, 56, -0.05);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['SEAM', 'Ω = a₁b₂ + a₂b₁', C.mag, 'cross-coupling of the two ends'], ['ACTION', 'J(U_a f) ≠ 0', C.gold, 'actions reveal it'], ['INSTRUMENT', 'Pr(1, 1) = κ', C.cyan, 'an averaged kernel can hide'], ['MAINTAIN', '{A, D} ∉ V*', C.green, 'keeping a system safe']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 26); lblG(a2, x, 350, C.white, q, 20); });
    lbl('LEAN · finite_unobservable_eq_observable_orthogonal · observable_krylov_strict_growth_bound', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 18);
    lbl('VOLUMES · seam form · instrument counterexample · three layers · safety example      CLASSICAL · Bayes', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 17);
    lbl('OPEN · life reading      RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'the life reading is open') * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr58(W / 2, 360, 200, 0.5 + t * 0.2, a, { fillBase: true, lab: 0 });
    txt('AURIC FIB ATOM PYRAMID XXIX', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXIX · 输出分辨闭包与接缝曲率 · TRURETURING FILM 058', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Where the hidden relation leaks.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WHERE IT SHOWS', reaction: 'THE HIDDEN REACTION', seam: 'SEAM CURVATURE', action: 'ACTIONS REVEAL', horizon: 'HOW LONG IT HIDES', instrument: 'OUTPUT LABELS', cancel: 'THE AVERAGE HIDES', bayes: 'BAYES FORM', memory: 'THREE LAYERS', maintain: 'PREDICT IS NOT MAINTAIN', time: 'TIME AND 5040', finale: 'LEDGER' });

function poster58() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const W3 = pyr58(560, 520, 360, 0.6, 1, { fillBase: true });
  const a0 = W3([1, 0, 0]), a1 = W3([0, 1, 0]); curve(z => [a0[0] + (a1[0] - a0[0]) * z, a0[1] + (a1[1] - a0[1]) * z - 120 * Math.sin(Math.PI * z)], 40, C.mag, 1, 5);
  txt('Ω(x, y) = 1', 1370, 300, { size: 46, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('Pr(1, 1) = κ', 1370, 390, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('K closed · M₀ M₁ leak', 1370, 480, { size: 38, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('{A, D} ∉ V*', 1370, 570, { size: 42, fam: FG, w: 700, align: 'center', c: C.green });
  txt('FIB 原子金字塔 XXIX', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXIX', W / 2, 890, { size: 78, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('隐 藏 关 系 从 哪 里 泄 漏', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 058', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster58;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
