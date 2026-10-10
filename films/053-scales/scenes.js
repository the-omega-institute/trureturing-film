/* Film 053 */

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

/* ---- film 053: divisor scales and polygon association ---- */
const _po53 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po53.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po53.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect53(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const EG53 = 1.7810724179901979;
const PHI53 = (1 + Math.sqrt(5)) / 2;
/* hexagonal prism of window positions (u, v, w) */
const HEX53 = [[0, 0], [4, 0], [5, 1], [5, 2], [1, 2], [0, 1]];
function prismPts53() { const P = []; for (let u = 0; u <= 5; u++) for (let v = 0; v <= 2; v++) for (let w = 0; w <= 2; w++) if (u - w <= 4 && w - u <= 1) P.push([u, v, w, (u >= 1 && u <= 4 && w === 1) ? 2 : 1]); return P; }
const PR53 = prismPts53();
function prism53(cx, cy, s, ang, a, hi) {
  const v = v3(cx, cy, s, ang, 0.42), W3 = (u, vv, w) => v(u - 2.5, w - 1, vv - 1);
  if (a <= 0) return;
  [0, 2].forEach(vv => strokePoly(HEX53.map(([u, w]) => W3(u, vv, w)), C.cyan, a * 0.8, 1.6));
  HEX53.forEach(([u, w]) => { const p = W3(u, 0, w), q = W3(u, 2, w); line(p[0], p[1], q[0], q[1], C.cyan, a * 0.5, 1.2); });
  PR53.forEach(([u, vv, w, m]) => { const p = W3(u, vv, w); const h = hi && hi(u, vv, w); dot(p[0], p[1], m === 2 ? 9 : 6, h ? 'm' : (m === 2 ? 'o' : 'c'), a); });
}
function shape53(kind, cx, cy, r, col, a, fill = 0.12) {
  if (a <= 0) return;
  if (kind === 'disc') { ring(cx, cy, r, col, a, 2); fillPoly(ringPts(cx, cy, r, 48), col, a * fill); return; }
  const n = kind === 'tri' ? 3 : kind === 'sq' ? 4 : 5, P = ringPts(cx, cy, r, n, kind === 'sq' ? -Math.PI / 4 : -Math.PI / 2);
  fillPoly(P, col, a * fill); strokePoly(P, col, a, 2);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  const items = [['sublattice', 'a sublattice', 'g'], ['polygon', 'a shrunken polygon', 'p'], ['box', 'a box', 'b'], ['phase', 'a phase', 'r'], ['prism', 'a hexagonal prism', 'h']];
  items.forEach(([s, ph, k], i) => {
    const x = 260 + i * 350, y = 420, q = Q(S, 0, ph, 0.6);
    if (k === 'g') { for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) dot(x - 100 + a * 40, y - 100 + b * 40, (a % 2 === 0 && b % 2 === 0) ? 8 : 4, (a % 2 === 0 && b % 2 === 0) ? 'g' : 'n', q); }
    if (k === 'p') { [1, 1 / 2, 1 / 3, 1 / 6].forEach((s_, j) => shape53('tri', x, y, 120 * s_, [C.cyan, C.gold, C.green, C.mag][j], q)); }
    if (k === 'b') { const vv = v3(x, y, 90, 0.6 + t * 0.2, 0.42); const L = [7 / 4, 4 / 3, 1]; const c = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]].map(p => vv((p[0] - 0.5) * L[0], (p[1] - 0.5) * L[1], (p[2] - 0.5) * L[2])); [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]].forEach(([i_, j_]) => line(c[i_][0], c[i_][1], c[j_][0], c[j_][1], C.gold, q, 1.8)); }
    if (k === 'r') { ring(x, y, 110, C.dim, q, 1.2); const th = t * 0.8; arrow(x, y, x + 110 * Math.cos(th), y + 110 * Math.sin(th), C.mag, q, 3); }
    if (k === 'h') prism53(x, y, 34, 0.5 + t * 0.25, q);
    lbl(s, x, y + 180, C.white, q, 20);
  });
  eqn('σ(n) / n', W / 2, 760, Q(S, 1, 'All of them read the same'), C.gold, 44);
  chip(W / 2, 850, 760, 54, 'which questions each shape can answer', C.cyan, Q(S, 1, 'What changes'), 20);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  prism53(W / 2, 380, 70, 0.5 + t * 0.2, rp, (a, b, c) => a === 1 && b === 0 && c === 1);
  txt(scramble('AURIC FIB ATOM PYRAMID XXIV', rp, 452), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXIV · 约 数 尺 度 与 多 边 形 关 联', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 053 · AURIC_FIB_ROBIN_DIVISOR_SCALE_GEOMETRY · DIVISOR_POLYGON_ASSOCIATION', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 LATTICES ---- */
SCENES.lattices = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Both operations are needed', 0.6);
  if (f1 > 0) {
    const n = 6, X = 300, Y = 260, c = 70, ds = [1, 2, 3, 6], k = Math.floor(t * 0.7) % 4, d = ds[k];
    for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) { const inW = a % d === 0 && b % d === 0; dot(X + a * c, Y + b * c, inW ? 11 : 5, inW ? 'g' : 'n', s0 * f1); }
    lbl('V₆  ·  W = ' + d + 'V₆ ,  |W| = ' + (n / d) ** 2, X + 2.5 * c, Y + 6 * c + 20, C.green, Q(S, 0, 'exactly d times the grid', 0.5) * f1, 22);
    eqn('M(u, v) = (v, u + v)', 1400, 300, Q(S, 0, 'the FIB step') * f1, C.cyan, 28);
    eqn('∂(u, v) = (v, 0)', 1400, 370, Q(S, 0, 'and the shift') * f1, C.mag, 28);
    eqn('closed under both  ⟺  W = dV_n ,  d | n', 1400, 470, Q(S, 0, 'The subgroups closed under both') * f1, C.white, 22);
    eqn('scale  √(|W| / |V_n|) = 1/d', 1400, 550, Q(S, 0, 'scale one over d') * f1, C.gold, 28);
    chip(1400, 650, 520, 54, 'brute force: every n ≤ 8', C.green, Q(S, 0, 'Brute force confirms') * f1, 20);
  }
  const q = Q(S, 1, 'Both operations are needed', 0.6, 0.3);
  if (q > 0) {
    const X = 340, Y = 260, c = 80, L = [0, 1, 2, 3, 4].map(tt => [tt % 5, (3 * tt) % 5]);
    for (let a = 0; a < 5; a++) for (let b = 0; b < 5; b++) dot(X + a * c, Y + (4 - b) * c, 5, 'n', q);
    const lq = Q(S, 1, 'the line through one, three', 0.6);
    L.forEach(([a, b]) => dot(X + a * c, Y + (4 - b) * c, 12, 'c', lq));
    lbl('L = { t(1,3) }  in V₅', X + 2 * c, Y + 5 * c + 10, C.cyan, lq, 22);
    chip(1400, 340, 460, 54, 'M(L) ⊆ L', C.green, Q(S, 1, 'closed under the FIB step'), 24);
    chip(1400, 430, 600, 54, '∂(1,3) = (3,0) ∉ L', C.red, Q(S, 1, 'not under the shift'), 24);
    chip(1400, 540, 640, 54, '|L| = 5 ∉ { 25, 1 }', C.red, Q(S, 1, 'its size five matches no'), 24);
  }
};

/* ---- 03 TEMPLATES ---- */
SCENES.templates = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'theory'], [1, "Robin's criterion", 'published']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The labels matter', 0.6);
  if (f1 > 0) {
    const kinds = [['tri', 'triangle'], ['sq', 'square'], ['disc', 'disc'], ['pent', 'pentagon']], ds = [1, 2, 3, 6];
    kinds.forEach(([k, nm], i) => { const x = 230 + i * 250, q = Q(S, 0, 'Shrink any triangle', 0.5, i * 0.3) * f1; ds.forEach((d, j) => shape53(k, x, 420, 100 / d, [C.cyan, C.gold, C.green, C.mag][j], q, 0.08)); lbl(nm, x, 580, C.dim, q, 18); });
    eqn('L_d / L = √(A_d / A) = ∛(V_d / V) = 1/d', 1560, 360, Q(S, 0, 'all read one over d') * f1, C.white, 24);
    eqn('Σ_(d|n) 1/d = σ(n)/n', 1560, 460, Q(S, 0, 'the labeled sum over all divisors') * f1, C.gold, 34);
  }
  const q = Q(S, 1, 'The labels matter', 0.6, 0.3);
  if (q > 0) {
    [1, 2, 3, 6].forEach((d, j) => shape53('sq', 480, 450, 180 / d, [C.cyan, C.gold, C.green, C.mag][j], Q(S, 1, 'For six the four scales', 0.5, j * 0.25), 0.1));
    eqn('1 + 1/2 + 1/3 + 1/6 = 2', 480, 700, Q(S, 1, 'add up to two'), C.gold, 30);
    chip(480, 780, 520, 54, 'union area = 1', C.red, Q(S, 1, 'with relative area one'), 22);
    eqn('RH  ⟺  Σ_(d|n) 1/d < e^γ log log n', 1380, 400, Q(S, 1, "Robin's criterion"), C.white, 26);
    lbl('for every n > 5040', 1380, 460, C.dim, Q(S, 1, "Robin's criterion", 0.6), 20);
    chip(1380, 560, 520, 54, 'labeled sum, not union', C.gold, Q(S, 1, 'exactly this labeled sum'), 22);
  }
};

/* ---- 04 BOXES ---- */
SCENES.boxes = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Telescoping each direction', 0.6);
  const X = 300, Y = 700, sc = 220;
  if (f1 > 0) {
    const sq = Q(S, 0, 'for twelve a seven-quarters', 0.8) * f1;
    const xs = [1, 1 / 2, 1 / 4], ys = [1, 1 / 3];
    let xc = 0; xs.forEach((a, i) => { let yc = 0; ys.forEach((b, j) => { fillBox(X + xc * sc, Y - (yc + b) * sc, a * sc - 3, b * sc - 3, (i + j) % 2 ? C.cyan : C.gold, sq * 0.25); rect53(X + xc * sc, Y - (yc + b) * sc, a * sc - 3, b * sc - 3, C.white, sq, 1.2); lbl('1/' + (2 ** i * 3 ** j), X + (xc + a / 2) * sc, Y - (yc + b / 2) * sc + 8, C.white, sq, a * b > 0.2 ? 20 : 14); yc += b; }); xc += a; });
    lbl('7/4', X + 7 / 8 * sc, Y + 34, C.gold, sq, 22); lbl('4/3', X - 30, Y - 2 / 3 * sc, C.gold, sq, 22, 'right');
    eqn('Z(12) = 7/4 · 4/3 = 7/3', X + 200, Y - 1.6 * sc, sq, C.gold, 26);
    eqn('Vol(Q_n) = Π_p (1 + 1/p + … + p^(−a)) = σ(n)/n', 1420, 330, Q(S, 0, 'The box they span') * f1, C.white, 22);
    const bq = Q(S, 0, 'for thirty a box', 0.6) * f1, vv = v3(1420, 560, 110, 0.6 + t * 0.25, 0.42), L = [3 / 2, 4 / 3, 6 / 5];
    const c = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]].map(p => vv((p[0] - 0.5) * L[0], (p[1] - 0.5) * L[1], (p[2] - 0.5) * L[2]));
    [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]].forEach(([i, j]) => line(c[i][0], c[i][1], c[j][0], c[j][1], C.cyan, bq, 2));
    lbl('Z(30) = 3/2 · 4/3 · 6/5 = 12/5', 1420, 760, C.cyan, bq, 22);
  }
  const q = Q(S, 1, 'Telescoping each direction', 0.6, 0.3);
  if (q > 0) {
    eqn('(1 − 1/p)(1 + 1/p + … + p^(−a)) = 1 − p^(−(a+1))', 960, 300, q, C.white, 24);
    eqn('Z(n) = Π (1 − 1/p)^(−1) · Π (1 − p^(−(a+1)))', 960, 380, Q(S, 1, 'a saturation times a truncation'), C.gold, 24);
    eqn('Z(12) = 3 · 7/9', 960, 470, Q(S, 1, 'three times seven ninths'), C.green, 34);
    chip(700, 600, 460, 54, 'perimeter 37/6 : unused', C.red, Q(S, 1, 'The perimeter'), 22);
    chip(1220, 600, 520, 54, 'dimension = ω(n) grows', C.cyan, Q(S, 1, 'no fixed number of directions'), 22);
  }
};

/* ---- 05 PHASES ---- */
SCENES.phases = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'With equal unit lengths', 0.6);
  if (f1 > 0) {
    const ps = [[2, 4], [3, 2], [5, 1], [7, 1]];
    ps.forEach(([p, a], i) => {
      const cx = 300 + i * 300, cy = 420, q = Q(S, 0, 'Give each prime its own phase', 0.5, i * 0.25) * f1, th = t * (0.5 + 0.23 * i);
      ring(cx, cy, 110, C.dim, q, 1.2);
      let x = cx, y = cy; for (let k = 0; k <= a; k++) { const r = 70 * Math.pow(p, -k / 2), nx = x + r * Math.cos(k * th), ny = y + r * Math.sin(k * th); arrow(x, y, nx, ny, [C.gold, C.cyan, C.green, C.mag][i], q, 2.5); x = nx; y = ny; }
      lbl('p = ' + p + ' , a = ' + a, cx, cy + 160, C.white, q, 18);
    });
    eqn('avg |Π_p F_p(θ_p)|² = σ(n)/n', 1500, 330, Q(S, 0, 'The average squared response') * f1, C.white, 24);
    eqn('5040 :  403/105', 1500, 410, Q(S, 0, 'exactly four hundred three'), C.gold, 30);
    eqn('shared phase (n = 6) :  2 + 2/√6', 1500, 560, Q(S, 0, 'One shared phase') * f1, C.red, 24);
    lbl('instead of 2', 1500, 610, C.dim, Q(S, 0, 'instead of two', 0.5) * f1, 20);
  }
  const q = Q(S, 1, 'With equal unit lengths', 0.6, 0.3);
  if (q > 0) {
    const P = ringPts(560, 470, 200, 5), pq = Q(S, 1, 'five steps close a pentagon', 1.0);
    for (let k = 0; k < 5; k++) { const a = P[k], b = P[(k + 1) % 5]; arrow(a[0], a[1], a[0] + (b[0] - a[0]) * clamp(pq * 5 - k), a[1] + (b[1] - a[1]) * clamp(pq * 5 - k), C.cyan, clamp(pq * 5 - k), 3); }
    const dq = Q(S, 1, 'its diagonal over its side', 0.6); line(P[0][0], P[0][1], P[2][0], P[2][1], C.gold, dq, 3);
    eqn('diagonal / side = φ', 1350, 360, dq, C.gold, 34);
    eqn('φ² = φ + 1   ⟷   det(λI − M) = λ² − λ − 1', 1350, 450, Q(S, 1, 'the same quadratic'), C.white, 22);
    chip(1350, 570, 560, 54, 'shared equation ≠ e^γ', C.red, Q(S, 1, 'it does not supply'), 22);
  }
};

/* ---- 06 PRISM ---- */
SCENES.prism = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Twelve points carry', 0.6);
  const pq = Q(S, 0, 'all the lattice points', 0.8);
  prism53(620, 500, 95, 0.55 + t * 0.2, Math.max(pq, Q(S, 1, 'Twelve points carry', 0.5)), (a, b, c) => Q(S, 1, 'At one, zero, one', 0.5) > 0 && a === 1 && b === 0 && c === 1);
  if (f1 > 0) {
    eqn('[2] [3] [5] [2+5] ,   [2+5] = 7', 1420, 300, Q(S, 0, 'the joint block two-five') * f1, C.white, 24);
    eqn('(u, v, w) = (a + k, b, c + k)', 1420, 380, Q(S, 0, 'Counting window positions') * f1, C.cyan, 26);
    eqn('60 divisors → 48 points', 1420, 470, Q(S, 0, 'exactly forty-eight') * f1, C.gold, 30);
    eqn('Area(K) = 9 ,  Vol = 18', 1420, 550, Q(S, 0, 'area nine and volume eighteen') * f1, C.green, 28);
    lbl('K = conv{(0,0),(4,0),(5,1),(5,2),(1,2),(0,1)}', 1420, 610, C.dim, Q(S, 0, 'hexagonal prism', 0.6) * f1, 17);
  }
  const q = Q(S, 1, 'Twelve points carry', 0.6, 0.3);
  if (q > 0) {
    lbl('orange : two divisors   ·   cyan : one', 1420, 300, C.dim, q, 18);
    eqn('(1, 0, 1) :  { 7 , 10 }', 1420, 380, Q(S, 1, 'At one, zero, one'), C.mag, 30);
    eqn('Ω = 1/7 + 1/10 = 17/70', 1420, 460, Q(S, 1, 'true weight seventeen'), C.gold, 28);
    eqn('(1/√7 + 1/√10)² = 17/70 + 2/√70', 1420, 560, Q(S, 1, 'Adding their amplitudes'), C.red, 22);
    chip(1420, 660, 520, 54, 'correct weight, not count', C.green, Q(S, 1, 'needs its correct weight'), 22);
  }
};

/* ---- 07 CONTINUATION ---- */
SCENES.continuation = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'With kappa kept', 0.6);
  if (f1 > 0) {
    eqn('q(7) = q(10) = (1, 0, 1)', 960, 290, s0 * f1, C.white, 28);
    const mq = Q(S, 0, 'Multiply by five', 0.6) * f1;
    chip(600, 420, 320, 60, '7', C.cyan, s0 * f1, 30); chip(1320, 420, 320, 60, '10', C.cyan, s0 * f1, 30);
    arrow(600, 460, 600, 560, C.white, mq, 2.5); arrow(1320, 460, 1320, 560, C.white, mq, 2.5);
    lbl('× 5', 640, 520, C.white, mq, 22, 'left'); lbl('× 5', 1360, 520, C.white, mq, 22, 'left');
    chip(600, 610, 380, 60, '35 | 5040', C.green, Q(S, 0, 'seven becomes thirty-five'), 26);
    chip(1320, 610, 380, 60, '50 ∤ 5040', C.red, Q(S, 0, 'ten becomes fifty'), 26);
    eqn('(u, v, w; κ) :  κ(7) = 1 ,  κ(10) = 0', 960, 760, Q(S, 0, 'One association bit') * f1, C.gold, 26);
  }
  const q = Q(S, 1, 'With kappa kept', 0.6, 0.3);
  if (q > 0) {
    const ph = 0.5 + 0.5 * Math.sin(t * 1.4);
    prism53(560, 470, 80, 0.55 + t * 0.15, q, (a, b, c) => (a === 1 && b === 0 && c === 1) || (a === 4 && b === 2 && c === 1));
    eqn('(u, v, w; κ)  ↦  (5 − u, 2 − v, 2 − w; 1 − κ)', 1420, 360, Q(S, 1, 'u v w kappa goes to'), C.white, 22);
    lbl('d ↦ 5040 / d  =  central inversion + flip', 1420, 420, C.cyan, Q(S, 1, 'central inversion with a flip', 0.6), 20);
    eqn('H(D | position) = 2/5 bit', 1420, 540, Q(S, 1, 'exactly two fifths of a bit'), C.gold, 30);
    lbl('12 fibres × 2/60 × 1 bit', 1420, 600, C.dim, Q(S, 1, 'exactly two fifths of a bit', 0.6), 20);
    void ph;
  }
};

/* ---- 08 SAMPLES ---- */
SCENES.samples = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'theory'], [2, '', 'lean']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Adding one more layer', 0.6);
  if (f1 > 0) {
    eqn('R(n) = (σ(n)/n) / (e^γ log log n)', 960, 290, s0 * f1, C.white, 28);
    const Y0 = 720, base = 0.97, sc = 9000, xs = [[5040, 1.005558981, '1.0056'], [10080, 0.985818612, '0.986'], [55440, 0.983253964, '0.983']];
    dashed(400, Y0 - (1 - base) * sc, 1520, Y0 - (1 - base) * sc, C.gold, s0 * f1, 2); lbl('R = 1', 1530, Y0 - (1 - base) * sc + 6, C.gold, s0 * f1, 20, 'left');
    const phs = ['At five thousand and forty R', 'At ten thousand and eighty', 'fifty-five thousand four hundred forty'];
    xs.forEach(([n, r, s], i) => { const q = Q(S, 0, phs[i], 0.6) * f1, x = 520 + i * 360, h = (r - base) * sc, col = r > 1 ? C.red : C.cyan; fillBox(x, Y0 - h, 180, h, col, q * 0.3); rect53(x, Y0 - h, 180, h, col, q, 2); lbl(s, x + 90, Y0 - h - 14, col, q, 24); lbl(String(n), x + 90, Y0 + 34, C.white, q, 22); });
  }
  const q = Q(S, 1, 'Adding one more layer', 0.6, 0.3) * (1 - Q(S, 2, 'Lean has frozen', 0.6));
  if (q > 0) {
    eqn('Z(np)/Z(n) = 1 + (p − 1) / (p (p^(a+1) − 1))', 960, 300, q, C.white, 24);
    const X0 = 360, Y0 = 640, lq = Q(S, 1, 'a gain that shrinks with depth', 0.8) * q;
    plotAxes(X0, Y0, 560, 280, lq, 'a', 'gain');
    for (let a = 0; a < 7; a++) { const g = (2 - 1) / (2 * (Math.pow(2, a + 1) - 1)), h = g * 520; fillBox(X0 + 20 + a * 76, Y0 - h, 50, h, C.green, clamp(lq * 7 - a) * 0.4); rect53(X0 + 20 + a * 76, Y0 - h, 50, h, C.green, clamp(lq * 7 - a), 1.5); }
    lbl('p = 2', X0 + 280, Y0 - 300, C.green, lq, 20);
    eqn('2, 3, 5, 7 only :  σ(n)/n < 35/8', 1400, 450, Q(S, 1, 'With only two, three, five and seven') * q, C.gold, 26);
    eqn('n > e^(e^((35/8) e^(−γ))) ≈ 116143.04  ⟹  R < 1', 1400, 540, Q(S, 1, 'the danger ends by') * q, C.green, 20);
  }
  const lq = Q(S, 2, 'Lean has frozen', 0.6, 0.3);
  if (lq > 0) {
    box(360, 330, 1200, 220, C.green, lq, 2, 'rgba(0,0,0,0.5)');
    lbl('LEAN · Arith.Robin.SevenSmooth.robin_seven_smooth', 960, 385, C.green, lq, 22);
    lbl('5040 < 2ᵃ 3ᵇ 5ᶜ 7ᵈ  ⟹  σ(n)/n < e^γ log log n', 960, 470, C.white, Q(S, 2, 'every such number', 0.5), 26);
  }
};

/* ---- 09 PRICES ---- */
SCENES.prices = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'lean'], [1, '', 'published']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Count divisors instead', 0.6);
  if (f1 > 0) {
    const X0 = 300, Y0 = 760, PW = 900, PH = 460, lx = x => X0 + x / 13 * PW, ly = y => Y0 - y / 1.6 * PH;
    plotAxes(X0, Y0, PW + 20, PH + 20, s0 * f1, 'log n', 'log σ(n)/n');
    const pts = [[1, 1], [2, 1.5], [4, 1.75], [6, 2], [12, 2.33333], [24, 2.5], [36, 2.52778], [48, 2.58333], [60, 2.8], [120, 3], [180, 3.03333], [240, 3.1], [360, 3.25], [720, 3.35833], [840, 3.42857], [1260, 3.46667], [1680, 3.54286], [2520, 3.71429], [5040, 3.8381], [10080, 3.9], [15120, 3.93651], [25200, 3.96603], [27720, 4.05195], [55440, 4.18701], [110880, 4.25455], [166320, 4.29437], [332640, 4.36364]];
    const pq = Q(S, 0, 'Put each integer at the point', 1.2) * f1;
    pts.forEach(([n, z], k) => dot(lx(Math.log(n)), ly(Math.log(z)), n === 5040 ? 12 : 7, n === 5040 ? 'o' : 'c', clamp(pq * pts.length - k)));
    const b = Math.log(403 / 105) - Math.log(5040) / 25, lq = Q(S, 0, 'every point lies under one line', 0.8) * f1;
    line(lx(0), ly(b), lx(13), ly(b + 13 / 25), C.gold, lq, 2.5);
    lbl('5040', lx(Math.log(5040)), ly(Math.log(403 / 105)) - 22, C.gold, lq, 22);
    box(1260, 300, 620, 210, C.green, Q(S, 0, 'Lean has frozen') * f1, 2, 'rgba(0,0,0,0.5)');
    lbl('LEAN · GoldenResourceOptimalInteger', 1570, 345, C.green, Q(S, 0, 'Lean has frozen') * f1, 18);
    lbl('golden_resource_unique_optimum', 1570, 380, C.green, Q(S, 0, 'Lean has frozen') * f1, 18);
    lbl('Z(n)/n^(1/25) ≤ Z(5040)/5040^(1/25)', 1570, 430, C.white, Q(S, 0, 'at price one twenty-fifth') * f1, 20);
    lbl('equality ⟺ n = 5040', 1570, 475, C.gold, Q(S, 0, 'the unique best', 0.5) * f1, 20);
  }
  const q = Q(S, 1, 'Count divisors instead', 0.6, 0.3);
  if (q > 0) {
    eqn('τ(n) / n^(3/10)  ⟶  max at 5040 ,  τ = 60', 960, 330, q, C.white, 26);
    lbl('Ramanujan · highly composite numbers', 960, 390, C.dim, Q(S, 1, "Ramanujan's published", 0.6), 20);
    const rows = [['2', '(6/5)¹⁰ < 8 < (5/4)¹⁰', '4'], ['3', '(4/3)¹⁰ < 27 < (3/2)¹⁰', '2'], ['5', '(3/2)¹⁰ < 125 < 2¹⁰', '1'], ['7', '(3/2)¹⁰ < 343 < 2¹⁰', '1'], ['p ≥ 11', '2¹⁰ < 11³', '0']];
    rows.forEach((r, k) => { const qq = Q(S, 1, 'highly composite thresholds', 0.4, k * 0.2), y = 460 + k * 50; lbl(r[0], 620, y, C.cyan, qq, 22); lbl(r[1], 960, y, C.white, qq, 22); lbl(r[2], 1300, y, C.gold, qq, 24); });
    chip(960, 760, 620, 54, 'window view : 48 / 60 = 4/5', C.mag, Q(S, 1, 'only forty-eight remain'), 22);
  }
};

/* ---- 10 LEDGER ---- */
SCENES.ledger = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'theory'], [1, 'a published fact', 'published']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The scale term can take', 0.6);
  if (f1 > 0) {
    eqn('log R(5040) = ε(7) − D_cap − L', 960, 290, s0 * f1, C.white, 30);
    const X0 = 500, Y0 = 700, sc = 1100, items = [['ε(7)', 0.232961, C.cyan, 'a prefix term'], ['− D_cap', -0.130930, C.red, 'minus a truncation'], ['− L', -0.096487, C.mag, 'minus a scale term']];
    let acc = 0;
    items.forEach(([s, v, col, ph], i) => { const q = Q(S, 0, ph, 0.6) * f1, x = X0 + i * 260, y1 = Y0 - acc * sc, y2 = Y0 - (acc + v) * sc; fillBox(x, Math.min(y1, y2), 160, Math.abs(y2 - y1), col, q * 0.3); rect53(x, Math.min(y1, y2), 160, Math.abs(y2 - y1), col, q, 2); lbl(s, x + 80, Y0 + 40, col, q, 22); lbl((v > 0 ? '+' : '') + v.toFixed(3), x + 80, Math.min(y1, y2) - 12, C.white, q, 20); acc += v; });
    line(X0 - 40, Y0, X0 + 1000, Y0, C.dim, s0 * f1, 1.5);
    const rq = Q(S, 0, 'The result is plus', 0.6) * f1;
    fillBox(X0 + 780, Y0 - 0.005544 * sc, 160, 0.005544 * sc, C.gold, rq * 0.4); rect53(X0 + 780, Y0 - 0.005544 * sc, 160, 0.005544 * sc, C.gold, rq, 2.5);
    lbl('+0.0055', X0 + 860, Y0 - 30, C.gold, rq, 24); lbl('log R(5040)', X0 + 860, Y0 + 40, C.gold, rq, 20);
  }
  const q = Q(S, 1, 'The scale term can take', 0.6, 0.3);
  if (q > 0) {
    eqn('L(n) = log( log log n / log P(n) )', 960, 300, q, C.white, 26);
    chip(680, 410, 380, 56, 'L(11) < 0', C.red, Q(S, 1, 'negative for eleven'), 26);
    chip(1240, 410, 380, 56, 'L(2²⁰) > 0', C.green, Q(S, 1, 'positive for two to the twentieth'), 26);
    eqn('limsup R(n) = 1   (Gronwall)', 960, 560, Q(S, 1, 'R comes back arbitrarily close'), C.gold, 30);
    chip(960, 680, 640, 54, 'no fixed gap R ≤ 1 − δ', C.red, Q(S, 1, 'no fixed gap below one'), 22);
  }
};

/* ---- 11 CONCAVE ---- */
SCENES.concave = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), X0 = 300, Y0 = 760, PW = 1100, PH = 480, lx = x => X0 + (x - 8) / 8 * PW, ly = y => Y0 - (y - 1.3) / 0.33 * PH, f = x => 0.5772156649 + Math.log(Math.log(x));
  plotAxes(X0, Y0, PW + 20, PH + 20, s0, 'x = log n', 'y = log σ(n)/n');
  const cq = Q(S, 0, 'a concave curve', 0.8);
  curve(s => { const x = 8.5 + s * 7.3; return [lx(x), ly(f(x))]; }, 100, C.gold, cq, 3);
  lbl('γ + log log x', lx(15.6), ly(f(15.6)) - 18, C.gold, cq, 20);
  const f1 = 1 - Q(S, 1, 'If every point between', 0.6);
  if (f1 > 0) {
    const x0 = 11, tq = Q(S, 0, 'Tangent lines lie above', 0.6) * f1, d = 1 / (x0 * Math.log(x0));
    line(lx(8.5), ly(f(x0) + d * (8.5 - x0)), lx(15.8), ly(f(x0) + d * (15.8 - x0)), C.cyan, tq, 2);
    const hq = Q(S, 0, 'chords lie below', 0.6) * f1; line(lx(9), ly(f(9)), lx(14), ly(f(14)), C.green, hq, 2);
    const pq = Q(S, 0, 'can still lie above the curve', 0.6) * f1, px = 13.5, py = (f(px) + f(x0) + d * (px - x0)) / 2;
    dot(lx(px), ly(py), 12, 'r', pq); lbl('under the tangent, over the curve', lx(px), ly(py) - 24, C.red, pq, 18);
  }
  const q = Q(S, 1, 'If every point between', 0.6, 0.3);
  if (q > 0) {
    const a = 10, b = 14, ya = f(a) - 0.02, yb = f(b) - 0.02;
    dot(lx(a), ly(ya), 12, 'g', q); dot(lx(b), ly(yb), 12, 'g', q); line(lx(a), ly(ya), lx(b), ly(yb), C.green, q, 2.5);
    lbl('safe', lx(a), ly(ya) + 34, C.green, q, 18); lbl('safe', lx(b), ly(yb) + 34, C.green, q, 18);
    const bq = Q(S, 1, 'But two safe endpoints alone', 0.6);
    dot(lx(12), ly(f(12) + 0.025), 12, 'r', bq); lbl('?', lx(12), ly(f(12) + 0.025) - 22, C.red, bq, 26);
    chip(1660, 500, 420, 54, 'chord bound ⟹ safe', C.green, Q(S, 1, 'the whole interval would be safe'), 20);
    chip(1660, 590, 420, 54, 'safe endpoints ⇏ safe', C.red, bq, 20);
  }
};

/* ---- 12 GAP ---- */
SCENES.gap = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'open'], [1, '', 'theory']]);
  const s0 = clamp(u);
  const bridges = ['sublattices', 'templates', 'prime boxes', 'phases', 'prefix ledger'];
  bridges.forEach((s, i) => chip(300 + i * 330, 300, 290, 54, s, C.cyan, Q(S, 0, 'Every bridge', 0.5, i * 0.2), 20));
  lbl('⟺  Robin  ⟺  RH', W / 2, 400, C.white, Q(S, 0, 'an equivalent statement', 0.6), 26);
  eqn('𝔊(n) = D_miss + D_cap + L(n) − ε(P(n)) > 0   for all n > 5040', W / 2, 500, Q(S, 0, 'one joint gap'), C.gold, 24);
  stamp('OPEN', W / 2, 600, Q(S, 0, 'remains open', 0.6), C.gold, 64, -0.06);
  const q = Q(S, 1, 'The missing primes', 0.6);
  ['missing primes', 'truncation', 'largest prime', 'log n'].forEach((s, i) => chip(420 + i * 360, 740, 300, 54, s, C.mag, Q(S, 1, 'The missing primes', 0.5, i * 0.25), 20));
  chip(W / 2, 830, 760, 54, 'one actual integer · no mixing of favorable values', C.red, Q(S, 1, 'cannot be added together'), 20);
  void q;
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['LABELS', 'Σ 1/d = σ(n)/n', C.gold, 'Sublattices'], ['DIRECTIONS', 'Vol Q_n = Z(n)', C.cyan, 'prime boxes'], ['PHASES', 'avg |A|² = Z(n)', C.green, 'independent phases'], ['κ', '48 → 60', C.mag, 'the window prism']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 26); lblG(a2, x, 350, C.white, q, 20); });
    lbl('LEAN · Robin.SevenSmooth · GoldenResourceOptimalInteger (5040 unique at price 1/25)', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 19);
    lbl('VOLUMES · bridges · prism · ledger   CLASSICAL · geometry · Fourier   PUBLISHED · Robin · Ramanujan', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 17);
    lbl('OPEN · the general case      RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'the general case is open') * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    prism53(W / 2, 360, 60, 0.5 + t * 0.2, a, (x, y, z) => x === 1 && y === 0 && z === 1);
    txt('AURIC FIB ATOM PYRAMID XXIV', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXIV · 约数尺度与多边形关联 · TRURETURING FILM 053', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One number, many shapes.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'ONE NUMBER', lattices: 'CLOSED SUBLATTICES', templates: 'SIMILAR SHAPES', boxes: 'PRIME BOXES', phases: 'INDEPENDENT PHASES', prism: 'THE WINDOW PRISM', continuation: 'THE ASSOCIATION BIT', samples: 'ROBIN RATIO', prices: 'PRICE LINES', ledger: 'THE PREFIX LEDGER', concave: 'CONCAVE BOUNDARY', gap: 'THE OPEN TARGET', finale: 'LEDGER' });

function poster53() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  prism53(560, 520, 110, 0.6, 1, (a, b, c) => a === 1 && b === 0 && c === 1);
  txt('60 → 48', 560, 790, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('Σ 1/d = σ(n)/n', 1370, 300, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('Vol Q₁₂ = 7/3', 1370, 390, { size: 38, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('{7, 10} : 17/70', 1370, 480, { size: 38, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('R(5040) ≈ 1.0056', 1370, 570, { size: 36, fam: FG, w: 700, align: 'center', c: C.red });
  txt('FIB 原子金字塔 XXIV', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXIV', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('一 个 数 · 许 多 形 状', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 053', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster53;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
