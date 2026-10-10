/* Film 052 */

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

/* ---- film 052: seams, cycles and arithmetic boundaries ---- */
const _po52 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po52.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po52.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect52(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const PHI52 = (1 + Math.sqrt(5)) / 2;
const LUC52 = [0, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, 199, 322, 521, 843];
const CUBE52 = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
const EDGE52 = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]];
function cube52(cx, cy, s, ang, a, colf, lw = 1.5) {
  const v = v3(cx, cy, s, ang, 0.42), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.5);
  EDGE52.forEach(([i, j]) => { const p = W3(CUBE52[i]), q = W3(CUBE52[j]); line(p[0], p[1], q[0], q[1], C.dim, a, lw); });
  return CUBE52.map((p, k) => { const pp = W3(p); if (colf) colf(pp, p, k); return pp; });
}
/* ring of N seam places with a legal configuration */
function seamRing52(cx, cy, R, bits, a, col = C.cyan) {
  const N = bits.length, P = ringPts(cx, cy, R, N);
  strokePoly(P, C.dim, a * 0.8, 1.5);
  P.forEach((p, k) => dot(p[0], p[1], bits[k] ? 12 : 7, bits[k] ? 'g' : 'c', a));
  return P;
}
function mat2(M, x, y, cw, ch, a, col, size = 24) { mgrid(x, y, M, cw, ch, a, { colf: () => col, size }); }
function mmul52(A, B) { return [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]]; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  cube52(420, 400, 170, 0.6 + t * 0.25, s0, (pp) => dot(pp[0], pp[1], 9, 'g', s0));
  lbl('a box', 420, 620, C.dim, s0, 18);
  const gq = Q(S, 0, 'glues boxes together', 0.8);
  [0, 1, 2].forEach(k => { const x = 760 + k * 130; box(x, 330, 110, 110, C.cyan, gq, 2, 'rgba(0,0,0,0.45)'); lbl(['x', 'y', 'z'][k], x + 55, 395, C.cyan, gq, 26); if (k) line(x - 20, 385, x, 385, C.gold, gq, 3); });
  lbl('seams', 1020, 480, C.gold, gq, 18);
  const cq = Q(S, 0, 'closes them into cycles', 0.8);
  seamRing52(1020, 600, 90, [1, 0, 0, 1, 0, 1, 0, 0], cq);
  const rq = Q(S, 0, "Robin's inequality", 0.8), X = 1360, Y = 300;
  rect52(X, Y, 300, 220, C.mag, rq, 2.5); fillBox(X, Y, 300, 220, C.mag, rq * 0.12);
  [['n', X, Y + 220], ['np', X + 300, Y + 220], ['nq', X, Y], ['npq', X + 300, Y]].forEach(([s, x, y]) => { dot(x, y, 10, 'm', rq); lbl(s, x, y + (y > Y ? 36 : -16), C.mag, rq, 20); });
  [['guards', C.white, 'the guards', 330], ['cut', C.gold, 'the cut', 650], ['direction', C.cyan, 'the direction', 970], ['shared scale', C.mag, 'the shared scale', 1290], ['lose one ⟹ lost', C.red, 'Lose one', 1610]]
    .forEach(([s, col, ph, x]) => chip(x, 820, 280, 54, s, col, Q(S, 1, ph), 20));
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const P = ringPts(W / 2, 400, 200, 11, -Math.PI / 2 + t * 0.15);
  strokePoly(P, C.cyan, rp * 0.6, 1.5);
  const bits = [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0];
  P.forEach((p, k) => dot(p[0], p[1], bits[k] ? 13 : 8, bits[k] ? 'g' : 'c', clamp(rp * 11 - k)));
  lbl('C₁₁ = 199', W / 2, 410, C.gold, clamp((u - 0.6) / 0.6), 30);
  txt(scramble('AURIC FIB ATOM PYRAMID XXIII', rp, 452), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXIII · 接 缝 闭 路 与 算 术 边 界', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 052 · AURIC_FIB_SEAMS_CYCLES_ARITHMETIC_BOUNDARY_RECONSTRUCTION', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 CORNERS ---- */
SCENES.corners = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Change the model', 0.6);
  if (f1 > 0) {
    const q1 = Q(S, 0, 'two endpoints', 0.6) * f1, q2 = Q(S, 0, 'four for a square', 0.6) * f1, q3 = Q(S, 0, 'eight for a cube', 0.6) * f1;
    line(260, 520, 480, 520, C.cyan, q1, 3); dot(260, 520, 11, 'g', q1); dot(480, 520, 11, 'g', q1); lbl('2', 370, 600, C.white, q1, 26);
    rect52(600, 410, 220, 220, C.cyan, q2, 2.5); fillBox(600, 410, 220, 220, C.cyan, q2 * 0.1); [[600, 410], [820, 410], [600, 630], [820, 630]].forEach(p => dot(p[0], p[1], 11, 'g', q2)); lbl('4', 710, 690, C.white, q2, 26);
    cube52(1080, 520, 190, 0.5 + t * 0.25, q3, pp => dot(pp[0], pp[1], 10, 'g', q3)); lbl('8', 1080, 700, C.white, q3, 26);
    eqn('f(t) = Σ_ε f(ε) Π t_j^ε_j (1 − t_j)^(1−ε_j)', 1500, 380, Q(S, 0, 'is fixed by its corners') * f1, C.white, 21);
    eqn('∫ f = 2^(−d) Σ_ε f(ε)', 1500, 470, Q(S, 0, 'Its average over the box') * f1, C.gold, 30);
    lbl('affine in each direction separately', 1500, 540, C.dim, s0 * f1, 18);
  }
  const q = Q(S, 1, 'Change the model', 0.6, 0.3);
  if (q > 0) {
    const sq = Q(S, 1, 'On a simplex', 0.6), T = [[300, 640], [660, 560], [420, 330]], vals = ['f(v₀)', 'f(v₁)', 'f(v₂)'];
    fillPoly(T, C.cyan, sq * 0.15); strokePoly(T, C.cyan, sq, 2.5);
    T.forEach((p, k) => { dot(p[0], p[1], 11, 'g', sq); lbl(vals[k], p[0] + (k === 1 ? 50 : -10), p[1] + (k === 2 ? -22 : 40), C.green, sq, 18); });
    eqn('∫_K f = Vol(K)/(d+1) · Σ f(v_j)', 480, 760, Q(S, 1, 'weight volume over d plus one'), C.white, 22);
    const bq = Q(S, 1, 'And a bubble', 0.6);
    const pts = cube52(1250, 470, 230, 0.5 + t * 0.2, bq, pp => dot(pp[0], pp[1], 8, 'n', bq));
    const glow = 0.5 + 0.5 * Math.sin(t * 2);
    for (let r = 5; r >= 1; r--) ring(1250, 470, r * 16, C.mag, bq * (0.12 + 0.12 * glow) * (6 - r) / 5, 3);
    dot(1250, 470, 18, 'm', bq);
    eqn('b = x(1−x) y(1−y) z(1−z)', 1600, 330, bq, C.mag, 22);
    lbl('b = 0 on every face', 1600, 390, C.dim, bq, 18);
    eqn('∫ b = 1/216', 1600, 460, Q(S, 1, 'still integrates to'), C.gold, 30);
    chip(1600, 560, 420, 54, 'invisible to corners', C.red, Q(S, 1, 'corners alone never see it'), 22);
  }
};

/* ---- 03 KERNEL ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Their product is the kernel', 0.6);
  if (f1 > 0) {
    const rows = [['[null]', '000', '1'], ['[2]', '100', 'x'], ['[3]', '010', 'y'], ['[5]', '001', 'z'], ['[25]', '101', 'xz']];
    lbl('mode', 360, 300, C.dim, s0 * f1, 18); lbl('window', 560, 300, C.dim, s0 * f1, 18); lbl('weight', 760, 300, C.dim, s0 * f1, 18);
    rows.forEach((r, k) => { const qq = Q(S, 0, 'the legal modes are', 0.5, k * 0.3) * f1, y = 360 + k * 70, col = k === 4 ? C.gold : C.cyan; lbl(r[0], 360, y, col, qq, 24); lbl(r[1], 560, y, C.white, qq, 24); lbl(r[2], 760, y, col, qq, 26); });
    const bq = Q(S, 0, 'Each place is a two by two block', 0.6) * f1;
    eqn('B(t) =', 1180, 470, bq, C.white, 30);
    mat2([['1', 't'], ['1', '0']], 1280, 400, 90, 70, bq, C.cyan, 28);
    lbl('rows: input seam · columns: output seam', 1370, 600, C.dim, bq, 18);
  }
  const q = Q(S, 1, 'Their product is the kernel', 0.6, 0.3);
  if (q > 0) {
    eqn('K = B(x) B(y) B(z) =', 520, 330, q, C.white, 26);
    mat2([['1 + x + y', 'z + xz'], ['1 + y', 'z']], 300, 380, 220, 80, Q(S, 1, 'one plus x plus y', 0.8), C.gold, 26);
    eqn('det K = −xyz', 520, 620, Q(S, 1, 'with determinant minus x y z'), C.mag, 32);
    const cq = Q(S, 1, 'so eight corners rebuild it', 0.6);
    cube52(1150, 480, 170, 0.6 + t * 0.25, cq, pp => dot(pp[0], pp[1], 9, 'g', cq));
    const aq = Q(S, 1, 'averaging over the cube', 0.6);
    eqn('K̄ =', 1430, 400, aq, C.white, 26);
    mat2([['2', '3/4'], ['3/2', '1/2']], 1500, 340, 110, 66, aq, C.cyan, 24);
    eqn('open  (1,0) K̄ (1,1)ᵀ = 11/4', 1620, 560, Q(S, 1, 'eleven over four'), C.green, 24);
    eqn('trace  tr K̄ = 5/2', 1620, 620, Q(S, 1, 'five over two for the trace'), C.mag, 24);
  }
};

/* ---- 04 PHASES ---- */
SCENES.phases = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Independent signs recover', 0.6);
  if (f1 > 0) {
    eqn('B(t)³ =', 640, 420, s0 * f1, C.white, 32);
    mat2([['1 + 2t', 't + t²'], ['1 + t', 't']], 760, 360, 180, 76, Q(S, 0, 'Use the same weight twice', 0.6) * f1, C.cyan, 26);
    box(940, 360, 180, 76, C.red, Q(S, 0, 't plus t squared', 0.5) * f1, 3, 'rgba(255,59,92,0.2)');
    chip(960, 640, 620, 54, 'one weight used twice ⟹ not affine', C.red, Q(S, 0, 'no longer affine') * f1, 22);
    chip(960, 720, 540, 54, 'parameters stay independent', C.green, Q(S, 0, 'must stay independent') * f1, 22);
  }
  const q = Q(S, 1, 'Independent signs recover', 0.6, 0.3);
  if (q > 0) {
    const gq = Q(S, 1, 'Eight sign patterns', 0.6);
    cube52(480, 470, 230, 0.5 + t * 0.2, gq, (pp, p, k) => { const s = p.map(e => e ? '−' : '+').join(''); dot(pp[0], pp[1], 10, k % 3 ? 'c' : 'g', gq); lbl(s, pp[0], pp[1] - 18, C.white, gq, 16); });
    eqn('c_b = ⅛ Σ_η K(±1) (−1)^(η·b)', 480, 750, Q(S, 1, 'return every coefficient'), C.green, 22);
    const pq = Q(S, 1, 'A single shared phase', 0.6);
    lbl('common phase :  U = V = W', 1380, 320, C.dim, pq, 20);
    eqn('1 + U  =  1 + V', 1380, 390, Q(S, 1, 'agree whenever all phases'), C.gold, 32);
    const dq = Q(S, 1, 'yet at minus one, one, one', 0.6);
    lbl('at (−1, 1, 1)', 1380, 500, C.dim, dq, 20);
    eqn('1 + U = 0', 1230, 570, dq, C.red, 32); eqn('1 + V = 2', 1530, 570, dq, C.green, 32);
    chip(1380, 680, 520, 54, 'one shared phase cannot separate', C.red, Q(S, 1, 'they read zero against two'), 20);
  }
};

/* ---- 05 COUPLING ---- */
SCENES.coupling = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Divide by phi', 0.6);
  if (f1 > 0) {
    eqn('A = Q³ =', 480, 420, Q(S, 0, 'a whole window becomes') * f1, C.white, 32);
    mat2([['3', '2'], ['2', '1']], 600, 350, 90, 76, Q(S, 0, 'three, two, two, one', 0.6) * f1, C.gold, 30);
    eqn('det A = −1', 645, 580, Q(S, 0, 'Its determinant is minus one') * f1, C.mag, 28);
    const lq = Q(S, 0, 'so L windows', 0.8) * f1;
    for (let L = 1; L <= 5; L++) { const x = 1000 + (L - 1) * 150, qq = clamp(lq * 5 - L + 1); for (let j = 0; j < L; j++) rect52(x - 40 + j * 8, 300 + j * 8, 80, 80, C.cyan, qq, 1.5); lbl('L=' + L, x, 460, C.white, qq, 18); lbl((L % 2 ? '−1' : '+1'), x, 500, L % 2 ? C.red : C.green, qq, 22); }
    eqn('det A^L = (−1)^L', 1300, 570, lq, C.mag, 28);
    chip(1300, 680, 680, 54, 'rank two: never a(i)·b(j)', C.red, Q(S, 0, 'no product of one-sided') * f1, 22);
  }
  const q = Q(S, 1, 'Divide by phi', 0.6, 0.3);
  if (q > 0) {
    const X0 = 300, Y0 = 760, PW = 900, PH = 440, ly = v => Y0 - v * PH, lx = L => X0 + (L - 0.5) * PW / 9;
    plotAxes(X0, Y0, PW + 20, PH + 20, q, 'L', 'φ^(−3L) A^L');
    const Pp = [[0.723607, 0.447214], [0.447214, 0.276393]], cols = [C.gold, C.cyan, C.cyan, C.mag];
    let M = [[1, 0], [0, 1]];
    for (let L = 1; L <= 9; L++) {
      M = mmul52(M, [[3, 2], [2, 1]]); const sc = Math.pow(PHI52, -3 * L), qq = Q(S, 1, 'converges to a rank-one', 0.4, (L - 1) * 0.15);
      [[0, 0], [0, 1], [1, 1]].forEach(([i, j], k) => dot(lx(L), ly(M[i][j] * sc), 8, ['o', 'c', 'm'][k], qq));
    }
    [[0, 0, C.gold], [0, 1, C.cyan], [1, 1, C.mag]].forEach(([i, j, col]) => dashed(X0, ly(Pp[i][j]), X0 + PW, ly(Pp[i][j]), col, Q(S, 1, 'converges to a rank-one', 0.8) * 0.6, 1.5));
    eqn('φ^(−3L) A^L = P₊ + (−φ^(−6))^L P₋', 1500, 330, Q(S, 1, 'converges to a rank-one'), C.white, 24);
    eqn('rank P₊ = 1', 1500, 410, Q(S, 1, 'rank-one projector', 0.6), C.gold, 28);
    eqn('det → 0', 1500, 500, Q(S, 1, 'The determinant goes to zero'), C.dim, 26);
    chip(1500, 600, 560, 54, 'every finite stack invertible', C.green, Q(S, 1, 'every finite stack'), 22);
    eqn('correction ∼ φ^(−6L)', 1500, 690, Q(S, 1, 'an exact correction'), C.mag, 24);
  }
};

/* ---- 06 GLUE ---- */
SCENES.glue = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Twelve weighted sequences', 0.6);
  if (f1 > 0) {
    const oq = Q(S, 0, 'An open chain of three places', 0.6) * f1;
    ['x', 'y', 'z'].forEach((s, k) => { const x = 300 + k * 150; box(x, 330, 120, 120, C.cyan, oq, 2, 'rgba(0,0,0,0.45)'); lbl(s, x + 60, 402, C.cyan, oq, 30); if (k) line(x - 30, 390, x, 390, C.gold, oq, 3); });
    eqn('open:  1 + x + y + z + xz', 525, 540, Q(S, 0, 'reads one plus x plus y plus z plus x z') * f1, C.green, 28);
    const cq = Q(S, 0, 'Close it into a triangle', 0.8) * f1;
    const T = ringPts(1350, 400, 150, 3);
    strokePoly(T, C.cyan, cq, 2.5); ['x', 'y', 'z'].forEach((s, k) => { dot(T[k][0], T[k][1], 26, 'n', cq); lbl(s, T[k][0], T[k][1] + 9, C.cyan, cq, 26); });
    line(T[2][0], T[2][1], T[0][0], T[0][1], C.gold, cq * (0.6 + 0.4 * Math.sin(t * 4)), 5);
    lbl('seam', (T[2][0] + T[0][0]) / 2 - 50, (T[2][1] + T[0][1]) / 2, C.gold, cq, 18);
    eqn('closed:  1 + x + y + z', 1350, 640, Q(S, 0, 'the trace reads') * f1, C.mag, 28);
    const wq = Q(S, 0, 'the word one zero one', 0.6) * f1;
    lbl('1 0 1', 1350, 720, C.white, wq, 32);
    line(1290, 710, 1410, 710, C.red, Q(S, 0, 'so it is excluded', 0.5) * f1, 4);
    lbl('two ones across the seam', 1350, 770, C.red, Q(S, 0, 'puts two ones side by side', 0.5) * f1, 18);
  }
  const q = Q(S, 1, 'Twelve weighted sequences', 0.6, 0.3);
  if (q > 0) {
    const seqs = [['0', 1, 1], ['1', 2, 1], ['2', 3, 1], ['3', 4, 1], ['1 2', 4, 4], ['0 3', 4, 4], ['2 2', 5, 5], ['1 1 1', 5, 4], ['1 2 3', 10, 7], ['3 0 2', 12, 6], ['1 2 0 3', 16, 13], ['2 1 3 0 2', 39, 23]];
    lbl('weights', 420, 270, C.dim, q, 18); lbl('open', 640, 270, C.green, q, 18); lbl('closed', 780, 270, C.mag, q, 18);
    lbl('weights', 1080, 270, C.dim, q, 18); lbl('open', 1300, 270, C.green, q, 18); lbl('closed', 1440, 270, C.mag, q, 18);
    seqs.forEach(([w, o, c], k) => { const col = k < 6 ? 0 : 1, row = k % 6, x = col ? 1080 : 420, y = 330 + row * 66, qq = Q(S, 1, 'from a single place', 0.4, k * 0.18), last = k === 11; if (last) box(x - 140, y - 38, 520, 56, C.gold, Q(S, 1, 'which read thirty-nine', 0.5), 2, 'rgba(255,207,90,0.12)'); lbl(w, x, y, last ? C.gold : C.white, qq, 22); lbl(String(o), x + 220, y, C.green, qq, 24); lbl(String(c), x + 360, y, C.mag, qq, 24); });
    chip(960, 760, 620, 54, 'open number ⇏ closed number', C.red, Q(S, 1, 'The cut must be kept'), 22);
  }
};

/* ---- 07 CYCLES ---- */
SCENES.cycles = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Package them as a zeta', 0.6);
  if (f1 > 0) {
    const N = 6, configs = [[0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0], [1, 0, 1, 0, 1, 0], [1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 1, 0]];
    const k = Math.floor(t * 1.2) % configs.length, rq = Q(S, 0, 'Close a chain of N places', 0.6) * f1;
    seamRing52(470, 470, 170, configs[k], rq);
    lbl('N = 6 , no two adjacent ones', 470, 700, C.dim, rq, 18);
    const bq = Q(S, 0, 'the Lucas numbers', 0.6) * f1, X0 = 860, Y0 = 720, bw = 70;
    for (let n = 1; n <= 10; n++) { const qq = clamp(bq * 10 - n + 1), h = Math.log(1 + LUC52[n]) * 70; fillBox(X0 + (n - 1) * (bw + 18), Y0 - h, bw, h, n <= 6 ? C.gold : C.cyan, qq * 0.3); rect52(X0 + (n - 1) * (bw + 18), Y0 - h, bw, h, n <= 6 ? C.gold : C.cyan, qq, 2); lbl(String(LUC52[n]), X0 + (n - 1) * (bw + 18) + bw / 2, Y0 - h - 12, C.white, qq, 20); lbl(String(n), X0 + (n - 1) * (bw + 18) + bw / 2, Y0 + 30, C.dim, qq, 18); }
    eqn('C_N = tr(Q^N) = F_(N−1) + F_(N+1)', 1300, 300, Q(S, 0, 'the trace of Q to the N') * f1, C.white, 26);
    chip(1300, 820, 640, 54, 'enumerated for N ≤ 14', C.green, Q(S, 0, 'Every case up to fourteen') * f1, 20);
  }
  const q = Q(S, 1, 'Package them as a zeta', 0.6, 0.3);
  if (q > 0) {
    eqn('Z(t) = exp( Σ C_N t^N / N )', 960, 320, q, C.white, 34);
    eqn('= 1 / (1 − t − t²)', 960, 420, Q(S, 1, 'It equals one over one minus t'), C.gold, 40);
    lbl('= 1 + t + 2t² + 3t³ + 5t⁴ + 8t⁵ + …', 960, 490, C.cyan, Q(S, 1, 'the Fibonacci generating', 0.6), 24);
    const dq = Q(S, 1, 'absolutely for t smaller', 0.8);
    ring(960, 700, 120 / PHI52, C.green, dq, 2.5); fillPoly(ringPts(960, 700, 120 / PHI52, 60), C.green, dq * 0.12);
    ring(960, 700, 120, C.dim, dq * 0.6, 1); dot(960, 700, 6, 'w', dq);
    lbl('|t| < 1/φ', 1150, 710, C.green, dq, 22, 'left');
  }
};

/* ---- 08 PRIMITIVE ---- */
SCENES.primitive = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The necklaces run', 0.6);
  if (f1 > 0) {
    const rq = Q(S, 0, 'may repeat a shorter cycle', 0.6) * f1;
    seamRing52(420, 470, 150, [1, 0, 0, 1, 0, 0], rq);
    lbl('100100 = (100)²', 420, 680, C.red, rq, 22);
    const nq = Q(S, 0, 'removes the free rotation', 0.6) * f1, rot = t * 0.6;
    const P = ringPts(900, 470, 150, 6, -Math.PI / 2 + rot); strokePoly(P, C.dim, nq * 0.8, 1.5);
    [1, 0, 1, 0, 0, 0].forEach((b, k) => dot(P[k][0], P[k][1], b ? 12 : 7, b ? 'g' : 'c', nq));
    lbl('rotations = one necklace', 900, 680, C.green, nq, 20);
    eqn('P_N = Σ_(d|N) μ(d) C_(N/d)', 1500, 380, Q(S, 0, 'Möbius inversion over the divisors') * f1, C.gold, 28);
    eqn('a_N = P_N / N', 1500, 470, Q(S, 0, 'dividing by N', 0.6) * f1, C.cyan, 30);
    lbl('exact period N', 1500, 540, C.dim, Q(S, 0, 'the cycles of exact period', 0.6) * f1, 18);
  }
  const q = Q(S, 1, 'The necklaces run', 0.6, 0.3);
  if (q > 0) {
    const tab = [[1, 1, 1, 1], [2, 3, 2, 1], [3, 4, 3, 1], [4, 7, 4, 1], [5, 11, 10, 2], [6, 18, 12, 2], [7, 29, 28, 4], [8, 47, 40, 5], [9, 76, 72, 8], [10, 123, 110, 11], [11, 199, 198, 18]];
    ['N', 'C_N', 'P_N', 'a_N'].forEach((h, j) => lbl(h, 300 + j * 140, 280, j === 3 ? C.green : C.dim, q, 18));
    tab.forEach((r, k) => { const qq = Q(S, 1, 'one, one, one, one', 0.4, k * 0.2), y = 330 + k * 46; r.forEach((v, j) => lbl(String(v), 300 + j * 140, y, j === 3 ? C.green : C.white, qq, 22)); });
    eqn('Π_d (1 − t^d)^(−a_d) = 1/(1 − t − t²)', 1350, 360, Q(S, 1, 'Multiply one over one minus t'), C.white, 26);
    const fq = Q(S, 1, 'the Fibonacci numbers come back', 1.2);
    [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89].forEach((v, k) => cellv(1000 + k * 64, 470, 56, v, C.gold, clamp(fq * 11 - k), 'rgba(0,0,0,0.5)', 0.36));
    lbl('coefficients of t⁰ … t¹⁰', 1350, 580, C.dim, fq, 18);
  }
};

/* ---- 09 5040 ---- */
SCENES.d5040 = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const D = [1, 2, 3, 5, 7, 6, 10, 14, 15, 21, 35, 30, 42, 70, 105, 210], mu = d => { let c = 0, n = d; [2, 3, 5, 7].forEach(p => { if (n % p === 0) { c++; n /= p; } }); return c % 2 ? -1 : 1; };
  const sq = Q(S, 0, 'The same sixteen Möbius signs', 1.0);
  D.forEach((d, k) => { const x = 330 + (k % 8) * 180, y = 300 + Math.floor(k / 8) * 110, qq = clamp(sq * 16 - k), m = mu(d); box(x - 70, y - 36, 140, 64, m > 0 ? C.green : C.red, qq, 2, m > 0 ? 'rgba(77,255,166,0.12)' : 'rgba(255,59,92,0.12)'); lbl((m > 0 ? '+' : '−') + d, x, y + 8, m > 0 ? C.green : C.red, qq, 22); });
  lbl('d | 210 = 2·3·5·7 , sign μ(d)', 960, 520, C.dim, sq, 18);
  const aq = Q(S, 0, 'Applied to cycle counts', 0.6);
  arrow(700, 560, 520, 620, C.cyan, aq, 2.5);
  eqn('Σ μ(d) C_(5040/d) = P₅₀₄₀', 480, 660, aq, C.cyan, 24);
  const pq = Q(S, 0, 'a positive integer with one thousand', 0.8);
  lbl(scramble('198475479525742676585355 … 136227799040', pq, 52), 480, 715, C.white, pq, 20);
  chip(480, 775, 600, 54, '1054 digits · divisible by 5040', C.cyan, Q(S, 0, 'divisible by five thousand'), 20);
  const bq = Q(S, 1, 'Applied to sigma over n', 0.6);
  arrow(1220, 560, 1400, 620, C.gold, bq, 2.5);
  eqn('Σ μ(d) Z(5040/d) = 1/5040', 1440, 660, bq, C.gold, 26);
  lbl('Z(n) = σ(n)/n', 1440, 712, C.dim, bq, 18);
  chip(1440, 775, 620, 54, 'same inversion · different target atom', C.gold, Q(S, 1, 'Same inversion'), 20);
};

/* ---- 10 ROBIN CORNERS ---- */
SCENES.robin = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The divisor part splits', 0.6);
  eqn('G(n) = log(σ(n)/n) − γ − log log log n', 960, 280, s0, C.white, 26);
  if (f1 > 0) {
    chip(960, 360, 560, 54, 'n > 5040 :  Robin  ⟺  G(n) < 0', C.mag, Q(S, 0, "Robin's inequality says G") * f1, 20);
    const X = 700, Y = 460, qq = Q(S, 0, 'four corners from the same n', 0.8) * f1;
    const cq = [Q(S, 0, 'Multiply n by a prime p', 0.4), Q(S, 0, 'by a prime q', 0.4), Q(S, 0, 'by both', 0.4)];
    dot(X, Y + 300, 12, 'w', s0 * f1); lbl('n', X - 20, Y + 330, C.white, s0 * f1, 24);
    arrow(X, Y + 300, X + 480, Y + 300, C.cyan, cq[0] * f1, 2.5); dot(X + 500, Y + 300, 12, 'c', cq[0] * f1); lbl('np', X + 520, Y + 330, C.cyan, cq[0] * f1, 24);
    arrow(X, Y + 300, X, Y + 20, C.cyan, cq[1] * f1, 2.5); dot(X, Y, 12, 'c', cq[1] * f1); lbl('nq', X - 20, Y - 16, C.cyan, cq[1] * f1, 24);
    dot(X + 500, Y, 12, 'm', cq[2] * f1); lbl('npq', X + 520, Y - 16, C.mag, cq[2] * f1, 24);
    rect52(X, Y, 500, 300, C.mag, qq, 2);
  }
  const q = Q(S, 1, 'The divisor part splits', 0.6, 0.3);
  if (q > 0) {
    eqn('σ(npq)/npq = Z(n)·Z_p·Z_q  (multiplicative)', 960, 360, q, C.cyan, 20);
    const X0 = 300, Y0 = 760, PW = 520, PH = 300, rq = Q(S, 1, 'positive rectangle integral', 1.0);
    for (let i = 0; i < 14; i++) for (let j = 0; j < 9; j++) { const hh = 1 / (1 + 0.12 * (i + j)); fillBox(X0 + i * PW / 14, Y0 - (j + 1) * PH / 9, PW / 14 - 2, PH / 9 - 2, C.gold, rq * 0.5 * hh); }
    rect52(X0, Y0 - PH, PW, PH, C.gold, rq, 2.5);
    lbl('log p', X0 + PW / 2, Y0 + 32, C.white, rq, 18); lbl('log q', X0 - 20, Y0 - PH / 2, C.white, rq, 18, 'right');
    eqn('G(npq) + G(n) − G(np) − G(nq)', 1380, 460, rq, C.white, 22);
    eqn('= ∫₀^log p ∫₀^log q h(log n + s + t) > 0', 1380, 520, rq, C.gold, 22);
    eqn('h = −(log log)″ > 0', 1380, 590, Q(S, 1, 'minus the second derivative'), C.dim, 22);
    const aq = Q(S, 1, 'With more primes the signs alternate', 0.6);
    chip(1150, 700, 360, 54, '8 corners : gap < 0', C.red, Q(S, 1, 'eight corners give a negative'), 20);
    chip(1600, 700, 380, 54, '16 corners : gap > 0', C.green, Q(S, 1, 'sixteen a positive'), 20);
    lbl('alternating signs', 1380, 780, C.dim, aq, 18);
  }
};

/* ---- 11 CERTIFICATE ---- */
SCENES.certificate = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'lean'], [2, '', 'published']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Lean has frozen', 0.6);
  if (f1 > 0) {
    const X = 300, Y = 300, Wd = 560, H = 360;
    const c = [['10080', '39/10', X, Y + H, 'Start at ten thousand'], ['20160', '1651/420', X + Wd, Y + H, 'multiply by two'], ['30240', '4', X, Y, 'and by three'], ['60480', '254/63', X + Wd, Y, 'The three boundary integers']];
    rect52(X, Y, Wd, H, C.dim, s0 * f1, 1.5);
    c.forEach(([n, z, x, y, ph], k) => { const qq = Q(S, 0, ph, 0.5) * f1, col = k === 3 ? C.mag : C.cyan; dot(x, y, 12, k === 3 ? 'm' : 'c', qq); lbl(n, x, y + (y > Y ? 40 : -40), col, qq, 24); lbl('Z = ' + z, x, y + (y > Y ? 72 : -14), C.white, qq, 18); });
    eqn('Z(60480) = Z(20160)·Z(30240)/Z(10080) = 254/63', 1420, 330, Q(S, 0, 'The three boundary integers') * f1, C.gold, 20);
    eqn('U = G(20160) + G(30240) − G(10080) + h(log 10080)·log2·log3', 1420, 410, Q(S, 0, 'Bound the rectangle') * f1, C.white, 18);
    const X0 = 1150, Y0 = 520, sc = 4000, uq = Q(S, 0, 'the budget U is about', 0.6) * f1, gq = Q(S, 0, 'so G of sixty thousand', 0.6) * f1;
    line(X0, Y0, X0 + 560, Y0, C.dim, uq, 1.5); lbl('0', X0 - 14, Y0 + 6, C.dim, uq, 18, 'right');
    fillBox(X0 + 40, Y0, 160, 0.0568 * sc, C.gold, uq * 0.3); rect52(X0 + 40, Y0, 160, 0.0568 * sc, C.gold, uq, 2); lbl('U ≈ −0.0568', X0 + 120, Y0 + 0.0568 * sc + 30, C.gold, uq, 20);
    fillBox(X0 + 300, Y0, 160, 0.0580 * sc, C.mag, gq * 0.3); rect52(X0 + 300, Y0, 160, 0.0580 * sc, C.mag, gq, 2); lbl('G(60480) ≈ −0.0580', X0 + 380, Y0 + 0.0580 * sc + 30, C.mag, gq, 20);
    lbl('G ≤ U < 0', X0 + 280, Y0 + 300, C.green, gq, 24);
  }
  const lq = Q(S, 1, 'Lean has frozen', 0.6, 0.3) * (1 - Q(S, 2, "Robin's criterion itself", 0.6));
  if (lq > 0) {
    box(360, 300, 1200, 240, C.green, lq, 2, 'rgba(0,0,0,0.5)');
    lbl('LEAN · Arith.Robin.SevenSmooth.robin_seven_smooth', 960, 350, C.green, lq, 22);
    lbl('5040 < 2ᵃ 3ᵇ 5ᶜ 7ᵈ  ⟹  σ(n)/n < e^γ log log n', 960, 420, C.white, lq, 26);
    lbl('60480 = 2⁶ · 3³ · 5 · 7', 960, 500, C.gold, Q(S, 1, 'two to the sixth', 0.6), 30);
  }
  const pq = Q(S, 2, "Robin's criterion itself", 0.6, 0.3);
  if (pq > 0) {
    eqn('σ(n)/n < e^γ log log n   for every n > 5040', 960, 380, pq, C.white, 28);
    eqn('⟺   Riemann hypothesis', 960, 470, Q(S, 2, 'is equivalent to the Riemann', 0.6), C.gold, 36);
    lbl('Robin 1984', 960, 560, C.dim, pq, 20);
  }
};

/* ---- 12 LIMITS ---- */
SCENES.limits = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'open'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Classical readouts also stop', 0.6);
  if (f1 > 0) {
    chip(560, 380, 620, 54, 'sufficient bound for one integer', C.green, Q(S, 0, 'A certificate is a sufficient') * f1, 20);
    chip(560, 470, 620, 54, 'not an inversion of arithmetic history', C.red, Q(S, 0, 'not an inversion') * f1, 20);
    chip(560, 560, 620, 54, 'no global sign', C.red, Q(S, 0, 'no global sign') * f1, 20);
    stamp('OPEN', 1350, 430, Q(S, 0, 'the question stays open', 0.6) * f1, C.gold, 72, -0.06);
    lbl('G(n) < 0 for all n > 5040 ⟺ RH', 1350, 560, C.gold, Q(S, 0, 'For all n', 0.6) * f1, 20);
  }
  const q = Q(S, 1, 'Classical readouts also stop', 0.6, 0.3);
  if (q > 0) {
    const aq = Q(S, 1, 'Two quantum states', 0.6);
    mat2([['1/2', '0'], ['0', '1/2']], 420, 340, 110, 80, aq, C.cyan, 26);
    mat2([['1/2', '1/2'], ['1/2', '1/2']], 1280, 340, 110, 80, aq, C.mag, 26);
    lbl('ρ₁', 530, 310, C.cyan, aq, 24); lbl('ρ₂', 1390, 310, C.mag, aq, 24);
    lbl('same diagonal (1/2, 1/2)', 960, 420, C.white, Q(S, 1, 'with the same diagonal', 0.6), 22);
    const rq = Q(S, 1, 'read one half and one', 0.6);
    eqn('⟨+|ρ₁|+⟩ = 1/2', 530, 620, rq, C.cyan, 28); eqn('⟨+|ρ₂|+⟩ = 1', 1390, 620, rq, C.mag, 28);
    chip(960, 760, 700, 54, 'no count of corners or cycles separates them', C.red, Q(S, 1, 'No count of corners'), 20);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['CORNERS', '2^d affine reads', C.gold, 'Corners rebuild'], ['SEAMS', 'det K = −xyz', C.cyan, 'seams keep both'], ['CYCLES', 'C_N = Lucas', C.green, 'cycles count Lucas'], ['ROBIN', '∫∫ h > 0', C.mag, 'bound Robin']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 26); lblG(a2, x, 350, C.white, q, 20); });
    lbl('LEAN · Robin.SevenSmooth · every 7-smooth n > 5040 satisfies Robin', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 21);
    lbl('VOLUME · kernel · seams · cycles · corner certificate   CLASSICAL · interpolation · trace formulas · Möbius   PUBLISHED · Robin', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 16);
    lbl('OPEN · the general case      RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'the general case is open') * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    const P = ringPts(W / 2, 380, 150, 11, -Math.PI / 2 + t * 0.15); strokePoly(P, C.cyan, a * 0.6, 1.5);
    [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0].forEach((b, k) => dot(P[k][0], P[k][1], b ? 12 : 7, b ? 'g' : 'c', a));
    txt('AURIC FIB ATOM PYRAMID XXIII', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXIII · 接缝闭路与算术边界 · TRURETURING FILM 052', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Glue along the seam, keep the cut.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'GLUE AND CLOSE', corners: 'AFFINE CORNERS', kernel: 'FIVE-MODE KERNEL', phases: 'INDEPENDENT SIGNS', coupling: 'SEAM COUPLING', glue: 'CUT AND GLUE', cycles: 'CLOSED CYCLES', primitive: 'NECKLACES', d5040: 'TWO INVERSIONS', robin: 'ROBIN CORNERS', certificate: 'THE 60480 CERTIFICATE', limits: 'LIMITS', finale: 'LEDGER' });

function poster52() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const P = ringPts(560, 520, 260, 11, -Math.PI / 2);
  strokePoly(P, C.cyan, 0.8, 2);
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0].forEach((b, k) => dot(P[k][0], P[k][1], b ? 18 : 10, b ? 'g' : 'c', 1));
  txt('C₁₁ = 199', 560, 535, { size: 46, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('det K = −xyz', 1370, 300, { size: 40, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('tr Qᴺ = Lucas', 1370, 390, { size: 38, fam: FG, w: 700, align: 'center', c: C.green });
  txt('Σ μ(d) Z(5040/d) = 1/5040', 1370, 480, { size: 34, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('G(60480) < 0', 1370, 570, { size: 38, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('FIB 原子金字塔 XXIII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXIII', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('沿 接 缝 粘 合 · 留 住 切 口', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 052', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster52;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
