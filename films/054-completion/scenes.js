/* Film 054 */

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

/* ---- film 054: completing second-order relations ---- */
const _po54 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po54.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po54.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect54(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const PHI54 = (1 + Math.sqrt(5)) / 2;
function mat54(M, x, y, cw, ch, a, col, size = 22) { mgrid(x, y, M, cw, ch, a, { colf: () => col, size }); }
/* small binary tree drawing for leaves list */
function tree54(x, y, w, depth, leaves, a) {
  if (a <= 0) return;
  const n = leaves.length, step = w / Math.max(1, n - 1);
  const pts = leaves.map((l, i) => [x - w / 2 + i * step, y + depth * 60]);
  let layer = pts.map(p => p.slice());
  let lv = depth;
  while (layer.length > 1) { const next = []; for (let i = 0; i < layer.length; i += 2) { if (i + 1 < layer.length) { const m = [(layer[i][0] + layer[i + 1][0]) / 2, layer[i][1] - 60]; line(m[0], m[1], layer[i][0], layer[i][1], C.dim, a, 1.5); line(m[0], m[1], layer[i + 1][0], layer[i + 1][1], C.dim, a, 1.5); next.push(m); } else next.push(layer[i]); } layer = next; lv--; }
  leaves.forEach((l, i) => { dot(pts[i][0], pts[i][1], 9, l === 'a' ? 'c' : 'o', a); lbl(l === 'a' ? 'α' : 'β', pts[i][0], pts[i][1] + 32, l === 'a' ? C.cyan : C.gold, a, 20); });
}
/* cone of positive 2x2 relations */
function cone54(cx, cy, s, ang, a, pts) {
  const v = v3(cx, cy, s, ang, 0.35);
  for (let k = 0; k < 4; k++) { const tz = 0.4 + k * 0.4, P = []; for (let j = 0; j <= 48; j++) { const th = j / 48 * TAU; P.push(v(tz * Math.cos(th), tz * Math.sin(th), tz)); } strokePoly(P, C.cyan, a * (0.35 + k * 0.15), 1.4, false); }
  for (let j = 0; j < 8; j++) { const th = j / 8 * TAU, p = v(0, 0, 0), q = v(1.6 * Math.cos(th), 1.6 * Math.sin(th), 1.6); line(p[0], p[1], q[0], q[1], C.cyan, a * 0.4, 1.2); }
  if (pts) pts.forEach(([x, z, tau, col]) => { const p = v(x, z, tau); dot(p[0], p[1], 9, col, a); });
  return v;
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  dot(420, 380, 14, 'c', s0); lbl('α', 420, 430, C.cyan, s0, 30);
  dot(620, 380, 14, 'o', s0); lbl('β', 620, 430, C.gold, s0, 30);
  const rq = Q(S, 0, 'alpha becomes beta', 0.6);
  eqn('ρ(α) = β', 520, 520, rq, C.white, 30);
  eqn('ρ(β) = ⟨β, α⟩', 520, 580, Q(S, 0, 'beta becomes the pair'), C.white, 30);
  const gq = Q(S, 0, 'Twenty-four parts', 1.2);
  for (let k = 0; k < 24; k++) { const x = 1000 + (k % 8) * 100, y = 300 + Math.floor(k / 8) * 100; box(x, y, 80, 70, C.cyan, clamp(gq * 24 - k) * 0.7, 1.5, 'rgba(0,0,0,0.4)'); lbl(String(k + 1), x + 40, y + 44, C.dim, clamp(gq * 24 - k), 22); }
  box(1000 + 3.5 * 100, 600, 80, 70, C.gold, Q(S, 0, 'Part twenty-five', 0.6), 3, 'rgba(255,207,90,0.25)'); lbl('25', 1000 + 3.5 * 100 + 40, 644, C.gold, Q(S, 0, 'Part twenty-five', 0.6), 26);
  [['2 · sources', C.cyan, 'two numbers for the sources'], ['3 · relations', C.gold, 'three for their pair'], ['4 · phase', C.mag, 'four for a phase'], ['3 · roles', C.green, 'the number three itself']]
    .forEach(([s, col, ph], i) => chip(360 + i * 400, 800, 340, 56, s, col, Q(S, 1, ph), 22));
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const P = ringPts(W / 2, 400, 170, 3, -Math.PI / 2 + t * 0.3);
  strokePoly(P, C.gold, rp, 2.5); P.forEach((p, k) => dot(p[0], p[1], 14, ['c', 'o', 'm'][k], rp));
  lbl('U', P[0][0], P[0][1] - 26, C.cyan, rp, 26); lbl('V', P[1][0] + 30, P[1][1] + 10, C.gold, rp, 26); lbl('W', P[2][0] - 30, P[2][1] + 10, C.mag, rp, 26);
  txt(scramble('AURIC FIB ATOM PYRAMID XXV', rp, 452), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXV · 二 阶 关 系 的 补 全', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 054 · AURIC_FIB_SECOND_ORDER_RELATION_COMPLETION', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 RECOVER ---- */
SCENES.recover = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The third reading adds', 0.6);
  if (f1 > 0) {
    tree54(480, 280, 360, 3, ['b', 'a', 'b', 'a', 'b'], s0 * f1);
    lbl('a = 2 α ,  b = 3 β', 480, 560, C.white, s0 * f1, 22);
    eqn('y₀ = 2a + 3b', 1350, 300, Q(S, 0, 'reads quantity two a') * f1, C.cyan, 30);
    eqn('y₁ = 3a + 5b', 1350, 370, Q(S, 0, 'Advance it once') * f1, C.gold, 30);
    const dq = Q(S, 0, 'determinant one', 0.6) * f1;
    eqn('O =', 1180, 520, dq, C.white, 26); mat54([['2', '3'], ['3', '5']], 1240, 460, 80, 60, dq, C.white, 24);
    eqn('det O = 1', 1560, 520, dq, C.green, 26);
    eqn('a = 5y₀ − 3y₁ ,  b = −3y₀ + 2y₁', 1350, 680, Q(S, 0, 'they return a and b') * f1, C.green, 24);
  }
  const q = Q(S, 1, 'The third reading adds', 0.6, 0.3);
  if (q > 0) {
    eqn('y₂ = 5a + 8b = y₀ + y₁', 960, 300, q, C.white, 30);
    const sq = Q(S, 1, 'two, three, five, eight', 0.8);
    [2, 3, 5, 8, 13, 21].forEach((v, k) => { const qq = clamp(sq * 6 - k), h = v * 18; fillBox(560 + k * 140, 760 - h, 90, h, C.gold, qq * 0.3); rect54(560 + k * 140, 760 - h, 90, h, C.gold, qq, 2); lbl(String(v), 605 + k * 140, 745 - h, C.white, qq, 24); });
    chip(700, 860, 460, 54, '1 state : impossible', C.red, Q(S, 1, 'no linear model with one'), 22);
    chip(1260, 860, 460, 54, '2 states : exact', C.green, Q(S, 1, 'two states are exactly'), 22);
  }
};

/* ---- 03 SQUARES ---- */
SCENES.squares = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The squares four', 0.6);
  if (f1 > 0) {
    eqn('ν₂(a, b) = (a² , ab , b²)', 960, 290, s0 * f1, C.white, 32);
    [['a²', C.cyan, 'a squared'], ['ab', C.gold, 'a b and'], ['b²', C.mag, 'b squared']].forEach(([s, col, ph], i) => chip(620 + i * 340, 400, 260, 70, s, col, Q(S, 0, ph) * f1, 34));
    chip(960, 520, 640, 54, 'any linear quadratic readout : d ≥ 3', C.green, Q(S, 0, 'at least three dimensions') * f1, 22);
    const tq = Q(S, 0, 'one three by three matrix', 0.6) * f1;
    eqn('ν₂(Mc) = T ν₂(c) ,  T =', 820, 690, tq, C.white, 26);
    mat54([['0', '0', '1'], ['0', '1', '1'], ['1', '2', '1']], 1130, 630, 60, 46, tq, C.gold, 22);
  }
  const q = Q(S, 1, 'The squares four', 0.6, 0.3);
  if (q > 0) {
    const sq = Q(S, 1, 'sixty-four, one hundred sixty-nine', 0.8);
    [4, 9, 25, 64, 169].forEach((v, k) => { const qq = clamp(sq * 5 - k), h = Math.sqrt(v) * 26; fillBox(380 + k * 130, 560 - h, 90, h, C.mag, qq * 0.3); rect54(380 + k * 130, 560 - h, 90, h, C.mag, qq, 2); lbl(String(v), 425 + k * 130, 545 - h, C.white, qq, 22); });
    lbl('z_n = F²_(n+3)', 640, 610, C.dim, q, 20);
    eqn('z_(n+3) = 2z_(n+2) + 2z_(n+1) − z_n', 1420, 300, Q(S, 1, 'z n plus three equals'), C.white, 24);
    const hq = Q(S, 1, 'Hankel determinant is two', 0.6);
    mat54([['4', '9', '25'], ['9', '25', '64'], ['25', '64', '169']], 1250, 360, 110, 54, hq, C.cyan, 22);
    eqn('det H = 2  ⟹  exactly 3', 1420, 580, hq, C.green, 26);
    const kq = Q(S, 1, 'Cubes need four', 0.6);
    [[1, 2], [2, 3], [3, 4], [4, 5]].forEach(([k, d], i) => lbl('F^' + k + ' : ' + d, 1200 + i * 150, 680, i === 1 ? C.mag : C.white, kq, 22));
    lbl('k-th power : k + 1', 1420, 740, C.gold, Q(S, 1, 'k-th powers need', 0.5), 22);
  }
};

/* ---- 04 MOMENTS ---- */
SCENES.moments = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Read the moments', 0.6);
  if (f1 > 0) {
    eqn('s_n = E[(ℓ Mⁿ c)²]', 520, 300, s0 * f1, C.white, 28);
    const mq = Q(S, 0, 'the observation matrix', 0.6) * f1;
    mat54([['4', '12', '9'], ['9', '30', '25'], ['25', '80', '64']], 300, 380, 110, 60, mq, C.cyan, 24);
    lbl('(s₀, s₁, s₂) = O₂ (U, V, W)', 465, 620, C.dim, mq, 20);
    eqn('det O₂ = −2', 1360, 420, Q(S, 0, 'has determinant minus two') * f1, C.mag, 32);
    eqn('U = 40s₀ + 24s₁ − 15s₂', 1360, 520, Q(S, 0, 'U equals forty') * f1, C.gold, 30);
  }
  const q = Q(S, 1, 'Read the moments', 0.6, 0.3);
  if (q > 0) {
    const O = [520, 700], uu = [O[0] + 360, O[1] - 60], vv = [O[0] + 160, O[1] - 300];
    fillPoly([O, uu, vv], C.gold, Q(S, 1, 'an area whose square', 0.6) * 0.2);
    arrow(O[0], O[1], uu[0], uu[1], C.cyan, q, 3); arrow(O[0], O[1], vv[0], vv[1], C.mag, q, 3);
    lbl('u', uu[0] + 20, uu[1], C.cyan, q, 24); lbl('v', vv[0] - 10, vv[1] - 16, C.mag, q, 24);
    dashed(uu[0], uu[1], vv[0], vv[1], C.green, Q(S, 1, 'a distance', 0.6), 2.5);
    eqn('‖u − v‖² = U + W − 2V', 1360, 320, Q(S, 1, 'a distance'), C.green, 28);
    eqn('Area² = (UW − V²) / 4', 1360, 400, Q(S, 1, 'an area whose square'), C.gold, 28);
    eqn('|(s₂ − s₀ − s₁)/2| ≤ √(s₀ s₁)', 1360, 500, Q(S, 1, 'the triangle bound'), C.white, 26);
    chip(1360, 600, 520, 54, '50 random sources : all pass', C.green, Q(S, 1, 'fifty random sources do'), 22);
  }
};

/* ---- 05 LORENTZ ---- */
SCENES.lorentz = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'So the real positive relations', 0.6);
  if (f1 > 0) {
    const sq = s0 * f1, cx = 520, cy = 500, k = Math.floor(t * 0.8) % 4;
    const base = [[0, 0], [160, 0], [60, -120]], M = [[0, 1], [1, 1]];
    let P = base.map(p => [p[0] / 100, -p[1] / 100]);
    for (let i = 0; i < k; i++) P = P.map(([x, y]) => [y, x + y]);
    const sc = 100 / Math.pow(PHI54, k * 0.6), pts = P.map(([x, y]) => [cx + x * sc, cy - y * sc]);
    fillPoly(pts, k % 2 ? C.mag : C.cyan, sq * 0.25); strokePoly(pts, k % 2 ? C.mag : C.cyan, sq, 2.5);
    lbl('M^' + k + ' : orientation ' + (k % 2 ? '−' : '+'), cx, cy + 200, k % 2 ? C.mag : C.cyan, sq, 22);
    eqn('det(M S Mᵀ) = det S', 1360, 300, Q(S, 0, 'keeps the determinant') * f1, C.white, 28);
    eqn('det(Mu, Mv) = −det(u, v)', 1360, 370, Q(S, 0, 'flips oriented area') * f1, C.mag, 26);
    eqn('Mᵀ Q M = Q , Q > 0  ⟹  φ² = 1', 1360, 470, Q(S, 0, 'no positive length is kept') * f1, C.red, 24);
    chip(1360, 550, 360, 54, 'impossible', C.red, Q(S, 0, 'is not one') * f1, 22);
    eqn('det S = τ² − x² − z²', 1360, 660, Q(S, 0, 'a Lorentz form') * f1, C.gold, 30);
  }
  const q = Q(S, 1, 'So the real positive relations', 0.6, 0.3);
  if (q > 0) {
    cone54(560, 640, 230, 0.5 + t * 0.15, q, [[0.2, 0.1, 1.0, 'g'], [-0.3, 0.4, 1.2, 'o']]);
    lbl('τ > √(x² + z²)', 560, 860, C.cyan, q, 22);
    const hq = Q(S, 1, 'a hyperbolic plane', 0.8);
    curve(s => { const x = -2 + 4 * s; return [1400 + x * 150, 640 - Math.sqrt(1 + x * x) * 150 + 150]; }, 80, C.green, hq, 3);
    lbl('t² − x² − z² = 1', 1400, 360, C.green, hq, 24);
    const dq = Q(S, 1, 'keep the distance between two shapes', 0.6), drift = (t * 0.25) % 1;
    const xa = -0.6 + drift * 1.4, xb = xa + 0.8;
    [xa, xb].forEach((x, i) => dot(1400 + x * 150, 640 - Math.sqrt(1 + x * x) * 150 + 150, 11, i ? 'm' : 'c', dq));
    eqn('d = arcosh(½ tr(P⁻¹Q))  unchanged', 1400, 760, dq, C.white, 22);
  }
};

/* ---- 06 BLOCH ---- */
SCENES.bloch = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Close under the commutator', 0.6);
  const bq = Q(S, 0, 'exactly the unit ball', 0.8), v = v3(560, 520, 210, 0.5 + t * 0.2, 0.35);
  if (f1 > 0) {
    eqn('H = ½ [[s + z , x − iy],[x + iy , s − z]]', 1360, 300, Q(S, 0, 'a phase y') * f1, C.white, 22);
    eqn('det H = (s² − x² − y² − z²) / 4', 1360, 380, Q(S, 0, 'the determinant becomes') * f1, C.gold, 26);
    for (let k = -2; k <= 2; k++) { const zz = k / 2.5, r = Math.sqrt(1 - zz * zz), P = []; for (let j = 0; j <= 48; j++) { const th = j / 48 * TAU; P.push(v(r * Math.cos(th), r * Math.sin(th), zz)); } strokePoly(P, C.cyan, bq * f1 * 0.5, 1.3, false); }
    for (let j = 0; j < 6; j++) { const P = []; for (let k = 0; k <= 32; k++) { const ph = -Math.PI / 2 + k / 32 * Math.PI, th = j / 6 * Math.PI; P.push(v(Math.cos(ph) * Math.cos(th), Math.cos(ph) * Math.sin(th), Math.sin(ph))); } strokePoly(P, C.cyan, bq * f1 * 0.35, 1.2, false); }
    const pq = Q(S, 0, 'pure states on the sphere', 0.6) * f1, mq = Q(S, 0, 'mixtures inside', 0.6) * f1, th = t * 0.6;
    const ps = v(Math.cos(th) * 0.8, Math.sin(th) * 0.8, 0.6); dot(ps[0], ps[1], 12, 'o', pq);
    const ms = v(0.2 * Math.cos(-th), 0.3, 0.1 * Math.sin(th)); dot(ms[0], ms[1], 10, 'm', mq);
    lbl('pure : |r| = 1', 1360, 520, C.gold, pq, 22); lbl('mixed : |r| < 1', 1360, 570, C.mag, mq, 22);
    chip(1360, 670, 520, 54, 'H ≥ 0  ⟺  x² + y² + z² ≤ 1', C.green, bq * f1, 22);
  }
  const q = Q(S, 1, 'Close under the commutator', 0.6, 0.3);
  if (q > 0) {
    eqn('A ◇ B = (AB − BA) / 2i', 960, 300, q, C.white, 28);
    const pq = Q(S, 1, 'three Pauli matrices', 0.8);
    [['I', [['1', '0'], ['0', '1']], C.white], ['X', [['0', '1'], ['1', '0']], C.cyan], ['Y', [['0', '−i'], ['i', '0']], C.mag], ['Z', [['1', '0'], ['0', '−1']], C.gold]].forEach(([nm, M, col], i) => { const qq = clamp(pq * 4 - i); lbl(nm, 420 + i * 360, 410, col, qq, 30); mat54(M, 360 + i * 360, 440, 60, 50, qq, col, 22); });
    chip(960, 680, 640, 54, 'phase y : added, not free', C.red, Q(S, 1, 'The phase is an added contract'), 22);
  }
};

/* ---- 07 THREE ROLES ---- */
SCENES.three = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Brute force over two', 0.6);
  const P = ringPts(560, 500, 190, 3, -Math.PI / 2 + t * 0.12), cols = ['c', 'o', 'm'], names = ['A', 'B', 'Γ'];
  if (f1 > 0) {
    eqn('x ⋆ x = x', 1360, 300, Q(S, 0, 'returns x on the diagonal') * f1, C.white, 28);
    eqn('x ≠ y  ⟹  x ⋆ y ∉ {x, y}', 1360, 370, Q(S, 0, 'never returns either input') * f1, C.white, 26);
    eqn('σ(x ⋆ y) = σx ⋆ σy  for all σ', 1360, 440, Q(S, 0, 'commutes with every relabeling') * f1, C.white, 24);
    const rq = Q(S, 0, 'exactly three roles', 0.6) * f1;
    strokePoly(P, C.gold, rq, 2); P.forEach((p, k) => { dot(p[0], p[1], 16, cols[k], rq); lbl(names[k], p[0], p[1] - 30, C.white, rq, 26); });
    const k = Math.floor(t * 0.9) % 3, gq = Q(S, 0, 'two different roles always give', 0.6) * f1;
    const a = P[k], b = P[(k + 1) % 3], c = P[(k + 2) % 3];
    ring(a[0], a[1], 26, C.white, gq, 2.5); ring(b[0], b[1], 26, C.white, gq, 2.5); ring(c[0], c[1], 30, C.green, gq * (0.6 + 0.4 * Math.sin(t * 5)), 4);
    chip(1360, 580, 520, 54, 'exists ⟺ |D| = 3 , unique', C.green, Q(S, 0, 'and there it is unique') * f1, 22);
  }
  const q = Q(S, 1, 'Brute force over two', 0.6, 0.3);
  if (q > 0) {
    [['|D| = 2', '0 rules', C.red], ['|D| = 3', '1 rule', C.green], ['|D| = 4', '0 rules', C.red]].forEach(([a_, b_, col], i) => { const qq = Q(S, 1, 'Brute force over two', 0.4, i * 0.3); chip(420 + i * 380, 320, 320, 54, a_ + ' : ' + b_, col, qq, 22); });
    const X = [700, 560], Y = [1220, 560], Z = [960, 760], Wp = [960, 400], sw = Q(S, 1, 'swapping it with the output', 1.0);
    dot(X[0], X[1], 14, 'c', q); lbl('x', X[0] - 30, X[1], C.cyan, q, 24, 'right'); dot(Y[0], Y[1], 14, 'c', q); lbl('y', Y[0] + 30, Y[1], C.cyan, q, 24, 'left');
    const zp = [Z[0] + (Wp[0] - Z[0]) * sw, Z[1] + (Wp[1] - Z[1]) * sw], wp = [Wp[0] + (Z[0] - Wp[0]) * sw, Wp[1] + (Z[1] - Wp[1]) * sw];
    dot(zp[0], zp[1], 14, 'g', q); lbl('x ⋆ y', zp[0] + 40, zp[1], C.green, q, 22, 'left');
    dot(wp[0], wp[1], 14, 'r', Q(S, 1, 'If a fourth role existed', 0.6)); lbl('w', wp[0] + 30, wp[1], C.red, Q(S, 1, 'If a fourth role existed', 0.6), 24, 'left');
    chip(960, 880, 560, 54, 'the answer moves : forbidden', C.red, Q(S, 1, 'that is forbidden'), 22);
  }
};

/* ---- 08 FANO ---- */
SCENES.fano = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), cx = 560, cy = 520, R = 240;
  const T = ringPts(cx, cy + 30, R, 3), mids = [0, 1, 2].map(i => [(T[i][0] + T[(i + 1) % 3][0]) / 2, (T[i][1] + T[(i + 1) % 3][1]) / 2]), Cc = [cx, cy + 30];
  const lq = Q(S, 0, 'seven lines of the Fano plane', 1.0);
  const lines = [[T[0], mids[0], T[1]], [T[1], mids[1], T[2]], [T[2], mids[2], T[0]], [T[0], Cc, mids[1]], [T[1], Cc, mids[2]], [T[2], Cc, mids[0]]];
  lines.forEach((L, k) => strokePoly(L, C.cyan, clamp(lq * 7 - k) * 0.8, 2, false));
  ring(Cc[0], Cc[1], R / 2, C.cyan, clamp(lq * 7 - 6) * 0.8, 2);
  const labels = ['100', '010', '001', '110', '011', '101', '111'], ptsF = [T[0], T[1], T[2], mids[0], mids[1], mids[2], Cc];
  ptsF.forEach((p, k) => { dot(p[0], p[1], 13, 'o', Q(S, 0, 'nonzero vectors', 0.4, k * 0.1)); lbl(labels[k], p[0] + (p[0] < cx ? -40 : 40), p[1] - 14, C.white, Q(S, 0, 'nonzero vectors', 0.4, k * 0.1), 18); });
  const f1 = 1 - Q(S, 1, 'But that group moves pairs', 0.6);
  if (f1 > 0) {
    eqn('x ⋆₇ y = x + y  (mod 2)', 1380, 320, Q(S, 0, 'x plus y gives the third') * f1, C.white, 28);
    eqn('7 points · 7 lines', 1380, 410, lq * f1, C.cyan, 30);
    eqn('|GL(3, 2)| = 168', 1380, 500, Q(S, 0, 'one hundred sixty-eight') * f1, C.gold, 32);
  }
  const q = Q(S, 1, 'But that group moves pairs', 0.6, 0.3);
  if (q > 0) {
    chip(1380, 320, 560, 54, 'transitive on pairs ≠ all of S₇', C.red, q, 22);
    eqn('F : D₇ → {A, B, Γ} keeping ⋆', 1380, 430, Q(S, 1, 'every map from the seven points'), C.white, 24);
    eqn('⟹  F constant', 1380, 500, Q(S, 1, 'is constant'), C.gold, 30);
    const cq = Q(S, 1, 'maps were checked', 0.6);
    lbl('3⁷ = 2187 maps checked', 1380, 590, C.dim, cq, 22);
    chip(1380, 670, 420, 54, '3 survive : constants', C.green, Q(S, 1, 'only the three constant'), 22);
  }
};

/* ---- 09 RULER ---- */
SCENES.ruler = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), cx = 560, cy = 500, R = 220, th = t * 0.5;
  ring(cx, cy, R, C.dim, s0, 1.2);
  const P = [0, 1, 2].map(k => [cx + R * Math.cos(th + k * TAU / 3), cy + R * Math.sin(th + k * TAU / 3)]);
  const wq = Q(S, 0, 'a cube root of one', 0.6);
  P.forEach((p, k) => { arrow(cx, cy, p[0], p[1], [C.cyan, C.gold, C.mag][k], wq, 3); lbl(['1', 'ω', 'ω²'][k], p[0] + (p[0] - cx) * 0.15, p[1] + (p[1] - cy) * 0.15, [C.cyan, C.gold, C.mag][k], wq, 24); });
  lbl('1 + ω + ω² = 0', cx, cy + R + 60, C.white, wq, 22);
  eqn('a³ − b³ = (a − b)(a − ωb)(a − ω²b)', 1360, 330, Q(S, 0, 'splits into a minus b'), C.white, 24);
  eqn('|a − bω|² = a² + ab + b²', 1360, 420, Q(S, 0, 'the phase-plane length'), C.gold, 30);
  chip(1360, 510, 520, 54, 'the one ruler a 3-step rotation keeps', C.green, Q(S, 0, 'the one ruler'), 18);
  const q = Q(S, 1, 'Two sources, three relations', 0.6);
  [['2', 'sources', C.cyan], ['3', 'relations', C.gold], ['3', 'roles', C.green], ['3', 'step phase', C.mag]].forEach(([n, s, col], i) => { const qq = Q(S, 1, ['Two sources', 'three relations', 'three roles', 'a three-step phase'][i], 0.5); box(1050 + i * 160, 640, 130, 140, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(n, 1115 + i * 160, 710, col, qq, 44); lbl(s, 1115 + i * 160, 760, C.white, qq, 16); });
  void q;
};

/* ---- 10 SERIES ---- */
SCENES.series = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'lean']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Lean has frozen', 0.6);
  const words = ['leaves', 'windows', 'seams', 'cycles', 'divisors', 'phases'];
  if (f1 > 0) {
    words.forEach((w_, i) => { const qq = Q(S, 0, w_ === 'leaves' ? 'two leaves' : w_, 0.5) * f1, x = 300 + i * 264; box(x - 110, 320, 220, 90, [C.cyan, C.gold, C.green, C.mag, C.orange, C.white][i], qq, 2, 'rgba(0,0,0,0.5)'); lbl(w_, x, 375, C.white, qq, 24); if (i) arrow(x - 154, 365, x - 116, 365, C.dim, qq, 2); });
    [['a reference', C.gold], ['a seam', C.cyan], ['a cut', C.red], ['a label', C.green], ['a phase', C.mag]].forEach(([s, col], i) => chip(320 + i * 320, 560, 280, 56, s, col, Q(S, 0, s, 0.5) * f1, 22));
    lbl('each part kept only what its task required', W / 2, 700, C.dim, Q(S, 0, 'each part kept only', 0.6) * f1, 22);
  }
  const q = Q(S, 1, 'Lean has frozen', 0.6, 0.3);
  if (q > 0) {
    const gq = Q(S, 1, 'one hundred seven modules', 1.6);
    for (let k = 0; k < 107; k++) { const x = 320 + (k % 18) * 72, y = 300 + Math.floor(k / 18) * 64; box(x, y, 56, 48, C.green, clamp(gq * 107 - k) * 0.85, 1.4, 'rgba(77,255,166,0.15)'); }
    lbl('LEAN · D5/S3/Arith/FibonacciAtomic · 107 / 107 frozen', W / 2, 700, C.green, gq, 24);
    lbl('+ Robin.SevenSmooth · GoldenResourceOptimalInteger', W / 2, 740, C.green, Q(S, 1, 'the Robin results', 0.6), 20);
    chip(W / 2, 795, 760, 54, 'argued · published · open : each film says which', C.white, Q(S, 1, 'each film says which'), 20);
  }
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['2', 'two readings', C.cyan, 'Two readings recover'], ['3', 'U · V · W', C.gold, 'three coordinates'], ['CONE', 'τ² − x² − z²', C.green, 'a Lorentz cone'], ['BALL', '+ phase y', C.mag, 'opens the Bloch ball'], ['3', 'roles', C.white, 'exactly three roles']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 310 + i * 325, q = Q(S, 0, ph) * fade; box(x - 145, 240, 290, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 28); lblG(a2, x, 350, C.white, q, 20); });
    lbl('VOLUME · recovery · dimension counts · moment geometry · phase closure · three roles', W / 2, 520, C.orange, Q(S, 1, 'argued in the theory') * fade, 19);
    lbl('CLASSICAL · linear algebra · Pauli matrices · Fano plane      LEAN · FIB atomic modules frozen', W / 2, 580, C.green, Q(S, 1, 'frozen in Lean') * fade, 19);
    lbl('RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'every number here') * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    const P = ringPts(W / 2, 380, 140, 3, -Math.PI / 2 + t * 0.3); strokePoly(P, C.gold, a, 2.5); P.forEach((p, k) => dot(p[0], p[1], 14, ['c', 'o', 'm'][k], a));
    txt('AURIC FIB ATOM PYRAMID XXV', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXV · 二阶关系的补全 · TRURETURING FILM 054', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two sources, three relations.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'TWO LEAVES', recover: 'TWO READINGS', squares: 'THREE RELATIONS', moments: 'MOMENT GEOMETRY', lorentz: 'LORENTZ CONE', bloch: 'PHASE AND BALL', three: 'THREE ROLES', fano: 'FANO PLANE', ruler: 'THE THREE-STEP RULER', series: 'THE PYRAMID', finale: 'LEDGER' });

function poster54() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const P = ringPts(560, 520, 230, 3, -Math.PI / 2);
  strokePoly(P, C.gold, 1, 3); P.forEach((p, k) => dot(p[0], p[1], 22, ['c', 'o', 'm'][k], 1));
  txt('a²', P[0][0], P[0][1] - 40, { size: 40, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('ab', P[1][0] + 50, P[1][1] + 14, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('b²', P[2][0] - 50, P[2][1] + 14, { size: 40, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('det [[2,3],[3,5]] = 1', 1370, 300, { size: 38, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('4, 9, 25, 64, 169 → dim 3', 1370, 390, { size: 34, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('τ² − x² − y² − z²', 1370, 480, { size: 38, fam: FG, w: 700, align: 'center', c: C.green });
  txt('x ⋆ y = the third', 1370, 570, { size: 38, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('FIB 原子金字塔 XXV', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXV', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('两 个 来 源 · 三 种 关 系', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 054', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster54;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
