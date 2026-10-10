/* Film 059 */

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

/* ---- film 059: local fillings, soft to rigid, odd cycles ---- */
const _po59 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po59.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po59.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: s.includes('½') ? FG : F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect59(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const MODES59 = [['∅', [0, 0, 0], 'n', '000'], ['[2]', [1, 0, 0], 'c', '100'], ['[3]', [0, 0, 1], 'g', '010'], ['[5]', [0, 1, 0], 'o', '001'], ['[2,5]', [1, 1, 0], 'm', '101']];
const PEDGE59 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
function pyr59(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES59.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE59.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.8, 1.8));
  if (opt.labels !== false) MODES59.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(opt.bits ? m[3] : m[0], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -20 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return W3;
}
/* a soft node: ring plus a pearl whose size and glow follow the value */
function soft59(x, y, v, a, col = C.cyan, nm = 'c', lab = null, r = 24) {
  if (a <= 0) return;
  ring(x, y, r, col, a * 0.8, 2);
  if (v > 0.001) dot(x, y, r * (0.35 + 0.6 * Math.sqrt(v)), nm, a * (0.35 + 0.65 * v));
  if (lab != null) lbl(lab, x, y + r + 26, C.white, a, 18);
}
/* three atoms carrying 2, 3, 5 */
function atoms59(x, y, bits, a, sp = 90, r = 24, vals = true) {
  const nm = ['c', 'g', 'o'], v = ['2', '3', '5'];
  for (let i = 0; i < 3; i++) { const xx = x + i * sp; if (i) line(xx - sp + r, y, xx - r, y, C.dim, a * 0.7, 2); ring(xx, y, r, C.dim, a * 0.8, 2); if (bits[i]) dot(xx, y, r * 0.95, nm[i], a); if (vals) lbl(v[i], xx, y + 7, bits[i] ? '#06121c' : C.dim, a, Math.round(r * 0.8)); }
}
/* a regular k-gon blended with its inscribed disk: (1 - tau) P_k (+) tau rho D, circumradius R px */
function blend59(cx, cy, R, k, tau, col, a, lw = 2.5, fill = 0, dash = false, rot = -Math.PI / 2) {
  if (a <= 0) return;
  const rho = R * Math.cos(Math.PI / k), r = tau * rho, Rv = (1 - tau) * R;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([10, 8]);
  ctx.beginPath();
  for (let i = 0; i < k; i++) { const th = rot + TAU * i / k, vx = cx + Rv * Math.cos(th), vy = cy + Rv * Math.sin(th); ctx.arc(vx, vy, Math.max(r, 0.01), th - Math.PI / k, th + Math.PI / k); }
  ctx.closePath();
  if (fill) { ctx.fillStyle = col; ctx.globalAlpha = a * fill; ctx.fill(); ctx.globalAlpha = a; }
  ctx.stroke(); ctx.restore();
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  pyr59(560, 450, 280, 0.6 + t * 0.2, s0, { fillBase: true });
  [['soft = mixture of rigid', 'when a soft filling is a mixture of rigid ones', C.cyan], ['windows → one global law', 'when local windows stitch', C.gold], ['a cycle forbids it', 'when a cycle forbids it', C.red]].forEach(([s, ph, col], i) => chip(1490, 330 + i * 90, 480, 62, s, col, Q(S, 0, ph), 24));
  const pq = Q(S, 1, 'Paths', 0.6), bq = Q(S, 1, 'bipartite graphs', 0.6), oq = Q(S, 1, 'odd cycles do not', 0.6);
  for (let i = 0; i < 5; i++) { const x = 1150 + i * 70; if (i) line(x - 70 + 14, 690, x - 14, 690, C.cyan, pq * 0.8, 2); soft59(x, 690, 0.5, pq, C.cyan, 'c', null, 14); }
  lbl('path : fills', 1290, 760, C.green, pq, 20);
  const hx = ringPts(1700, 690, 60, 6);
  hx.forEach((p, i) => { const q2 = hx[(i + 1) % 6]; line(p[0], p[1], q2[0], q2[1], C.cyan, bq * 0.8, 2); });
  hx.forEach(p => soft59(p[0], p[1], 0.5, bq, C.cyan, 'c', null, 12));
  lbl('even cycle : fills', 1700, 790, C.green, bq, 20);
  const pt = ringPts(470, 760, 60, 5);
  pt.forEach((p, i) => { const q2 = pt[(i + 1) % 5]; line(p[0], p[1], q2[0], q2[1], C.red, oq * 0.9, 2.5); });
  pt.forEach(p => soft59(p[0], p[1], 0.5, oq, C.red, 'r', null, 12));
  lbl('odd cycle : fails', 470, 855, C.red, oq, 20);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr59(W / 2, 400, 260, 0.5 + t * 0.25, rp, { fillBase: true, lab: 0.6 });
  [[380, 0], [1540, 1]].forEach(([x, k]) => { const p = ringPts(x, 420, 90, 5); p.forEach((q, i) => { const q2 = p[(i + 1) % 5]; line(q[0], q[1], q2[0], q2[1], k ? C.mag : C.cyan, rp * 0.8, 2); }); p.forEach((q, i) => soft59(q[0], q[1], 0.5 + 0.5 * Math.sin(t * 2 + i * 0.9 + k * Math.PI), rp, k ? C.mag : C.cyan, k ? 'm' : 'c', null, 14)); });
  txt(scramble('AURIC FIB ATOM PYRAMID XXX', rp, 459), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXX · 局 部 填 充 、 软 到 刚 与 奇 环 障 碍', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 059 · RELATIONAL_ORDER_AND_FILLING_CLOSURE + LOCAL_FILLINGS_SOFT_TO_RIGID', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FILLINGS ---- */
SCENES.fillings = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'lean']]);
  const s0 = clamp(u);
  const blink = Math.floor(t * 1.2) % 4;
  atoms59(420, 300, blink === 1 ? [1, 1, 0] : blink === 3 ? [0, 1, 1] : [1, 0, 1], s0, 140, 34);
  const nb = Q(S, 0, 'neighbours may not both be filled', 0.6);
  if (blink === 1 || blink === 3) lbl('✕ neighbours', 560, 370, C.red, nb, 20); else lbl('legal', 560, 370, C.green, nb, 20);
  const W5 = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1]], ws = ['q⁰', 'q²', 'q³', 'q⁵', 'q⁷'], nm = ['∅', '[2]', '[3]', '[5]', '[2,5]'];
  W5.forEach((b, i) => { const y = 440 + i * 68, q = Q(S, 0, 'The five legal fillings', 0.5, i * 0.35); atoms59(380, y, b, q, 60, 18); lbl(nm[i], 640, y + 7, C.white, q, 20, 'left'); lblG(ws[i], 800, y + 8, C.gold, Q(S, 0, 'weigh zero, two, three, five and seven', 0.5, i * 0.25), 28); });
  eqn('Z(q) = 1 + q² + q³ + q⁵ + q⁷', 560, 800, Q(S, 0, 'so their generating function', 0.6), C.gold, 32);
  const lq = Q(S, 1, 'Lean has frozen the count', 0.6);
  if (lq > 0) {
    lblG('#{ legal words of length m } = F(m + 2)', 1420, 280, C.white, lq, 28);
    lbl('LEAN · AdmissibleCount.admissibleWord_card_eq_fib', 1420, 330, C.green, lq, 18);
    const Fv = [2, 3, 5, 8, 13, 21, 34, 55, 89, 144], y0 = 760, hs = 360 / 144;
    Fv.forEach((v, i) => { const x = 1090 + i * 68, q = Q(S, 1, 'the number of legal words', 0.4, i * 0.3); fillBox(x, y0 - v * hs, 48, v * hs, C.cyan, q * 0.4); rect59(x, y0 - v * hs, 48, Math.max(v * hs, 1), C.cyan, q, 2); lbl(String(v), x + 24, y0 - v * hs - 14, C.white, q, 18); lbl(String(i + 1), x + 24, y0 + 30, C.dim, q, 18); });
    lbl('m', 1770, 790, C.dim, lq, 18);
  }
};

/* ---- 03 RIGID ---- */
SCENES.rigid = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'lean'], [1, '', 'classical']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The volume extends this', 0.6);
  const X = 0.35 + 0.12 * Math.sin(t * 0.9), Z = 0.25 + 0.1 * Math.sin(t * 1.3), Y = 0.4 + 0.1 * Math.cos(t * 0.8);
  if (f1 > 0) {
    const a = s0 * f1, xs = [X, Z, Y];
    for (let i = 0; i < 3; i++) { const x = 330 + i * 170; if (i) line(x - 170 + 30, 360, x - 30, 360, C.dim, a, 2); soft59(x, 360, xs[i], a, C.cyan, 'c', xs[i].toFixed(2), 30); }
    const pq = Q(S, 0, 'every neighbouring pair', 0.6) * f1;
    lbl('x₁ + x₂ = ' + (X + Z).toFixed(2) + ' ≤ 1', 500, 480, C.gold, pq, 22); lbl('x₂ + x₃ = ' + (Z + Y).toFixed(2) + ' ≤ 1', 500, 520, C.gold, pq, 22);
    const hq = Q(S, 0, 'the convex hull of the legal words', 0.6) * f1;
    eqn('convexHull ℝ (vertices n) = polytope n', 560, 640, Q(S, 0, 'Lean has frozen that on a path', 0.6) * f1, C.white, 28);
    lbl('LEAN · PathStableSetPolytope.convexHull_vertices', 560, 700, C.green, Q(S, 0, 'Lean has frozen that on a path', 0.6) * f1, 18);
    lbl('n = 3 : the pyramid is the path polytope', 560, 780, C.cyan, hq, 22);
    const W3 = pyr59(1360, 470, 300, 0.55 + t * 0.12, a, { fillBase: true, bits: true });
    const mq = Q(S, 0, 'exactly the mixtures of rigid ones', 0.6) * f1;
    if (W3 && mq > 0) {
      const kl = Math.max(0, X + Y + Z - 1), ku = Math.min(X, Y), k = (kl + ku) / 2, p = [1 - X - Y - Z + k, X - k, Z, Y - k, k];
      const pt = W3([X, Y, Z]);
      MODES59.forEach((m, i) => { const v = W3(m[1]); line(pt[0], pt[1], v[0], v[1], C.gold, mq * (0.15 + 1.6 * p[i]), 1 + 5 * p[i]); });
      dot(pt[0], pt[1], 14, 'w', mq); lbl('soft point', pt[0] + 20, pt[1] - 22, C.white, mq, 18, 'left');
    }
  }
  const q = Q(S, 1, 'The volume extends this', 0.6, 0.3);
  if (q > 0) {
    const hx = ringPts(560, 480, 180, 6), ph = Math.floor(t * 1.6) % 2, sq = Q(S, 1, 'soft becomes rigid in law', 0.6);
    hx.forEach((p, i) => { const q2 = hx[(i + 1) % 6]; line(p[0], p[1], q2[0], q2[1], C.cyan, q * 0.8, 2.5); });
    hx.forEach((p, i) => { soft59(p[0], p[1], 0.5, q * (1 - sq * 0.6), C.cyan, 'c', null, 24); if (sq > 0 && i % 2 === ph) dot(p[0], p[1], 20, i % 2 ? 'm' : 'g', sq); });
    lbl('x = ½ on every vertex', 560, 740, C.white, q, 22);
    lbl('= ½ · evens + ½ · odds', 560, 780, C.gold, sq, 22);
    eqn('Q(G) = STAB(G)', 1360, 330, q, C.white, 40);
    lbl('G bipartite · totally unimodular', 1360, 400, C.cyan, Q(S, 1, 'by total unimodularity', 0.6), 22);
    lbl('in law : every mean is kept', 1360, 520, C.green, sq, 22);
    lbl('one sample : rigid only if x ∈ {0, 1}ⁿ', 1360, 590, C.red, Q(S, 1, 'though a single soft sample', 0.6), 22);
  }
};

/* ---- 04 ODD ---- */
SCENES.odd = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'So it is a soft filling', 0.6);
  if (f1 > 0) {
    [[3, 1, 420], [5, 2, 960], [7, 3, 1500]].forEach(([n, k, x], j) => {
      const a = Q(S, 0, j === 0 ? 'Odd cycles break this' : 'On a cycle of length two k plus one', 0.6, j * 0.3) * f1, p = ringPts(x, 430, 130, n);
      p.forEach((q, i) => { const q2 = p[(i + 1) % n]; line(q[0], q[1], q2[0], q2[1], C.red, a * 0.85, 2.5); });
      const hq = Q(S, 0, 'the point that puts one half on every vertex', 0.6) * f1;
      p.forEach(q => soft59(q[0], q[1], hq > 0 ? 0.5 : 0, a, C.cyan, 'c', null, 18));
      p.forEach(q => lbl('½', q[0], q[1] - 26, C.white, hq, 16));
      lbl('C' + ['', '', '', '₃', '', '₅', '', '₇'][n] + '  (k = ' + k + ')', x, 620, C.white, a, 22);
      lbl('Σ x = ' + n + '/2', x, 680, C.gold, Q(S, 0, 'its total is k plus one half', 0.6) * f1, 24);
      lbl('max independent = ' + k, x, 730, C.red, Q(S, 0, 'no independent set holds more than k', 0.6) * f1, 22);
    });
  }
  const q = Q(S, 1, 'So it is a soft filling', 0.6, 0.3);
  if (q > 0) {
    const v = v3(640, 560, 330, -1.7 + 0.05 * Math.sin(t * 0.5), 0.5), P = p => v(p[0] - 0.33, p[1] - 0.33, p[2] - 0.33);
    const O = P([0, 0, 0]), E1 = P([1, 0, 0]), E2 = P([0, 1, 0]), E3 = P([0, 0, 1]), H = P([0.5, 0.5, 0.5]);
    fillPoly([E1, E2, E3], C.cyan, q * 0.12);
    [[O, E1], [O, E2], [O, E3], [E1, E2], [E2, E3], [E3, E1]].forEach(([a, b]) => line(a[0], a[1], b[0], b[1], C.cyan, q * 0.9, 2.5));
    [[E1, H], [E2, H], [E3, H]].forEach(([a, b]) => dashed(a[0], a[1], b[0], b[1], C.red, q, 2.5));
    [[O, '0', 30, 10], [E1, 'e₁', 30, -8], [E2, 'e₂', -30, 10], [E3, 'e₃', 30, -8]].forEach(([p, s, dx, dy]) => { dot(p[0], p[1], 11, 'c', q); lbl(s, p[0] + dx, p[1] + dy, C.white, q, 20); });
    dot(H[0], H[1], 15, 'r', q); lbl('(½, ½, ½)', H[0] - 24, H[1] - 18, C.red, q, 22, 'right');
    const cq = Q(S, 1, 'The odd-cycle inequality', 0.6);
    fillPoly([E1, E2, E3], C.gold, cq * 0.28 * (0.7 + 0.3 * Math.sin(t * 3)));
    lbl('triangle : soft  ⊋  rigid', 640, 300, C.white, q, 22);
    eqn('Σ x_v ≤ k', 1380, 380, cq, C.gold, 40);
    lbl('odd-cycle inequality · sum over the 2k + 1 vertices', 1380, 450, C.gold, cq, 20);
    lbl('triangle : x₁ + x₂ + x₃ ≤ 1', 1380, 540, C.white, Q(S, 1, 'on a triangle the bound is one', 0.6), 22);
    lbl('(½, ½, ½) : 3/2 > 1  →  cut away', 1380, 600, C.red, Q(S, 1, 'cuts it away', 0.6), 22);
    lbl('no mixture of rigid fillings', 1380, 680, C.red, q, 20);
  }
};

/* ---- 05 STITCH ---- */
SCENES.stitch = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'In pyramid coordinates', 0.6);
  if (f1 > 0) {
    const a = s0 * f1, xs = i => 420 + i * 180, word = [1, 0, 1, 0, 0, 1, 0], WC = [C.cyan, C.gold, C.mag, C.green, C.vio];
    const mk = Q(S, 0, 'a Markov chain built window by window', 0.5) * f1, reveal = mk > 0 ? Math.min(7, 3 + Math.floor((S.u - lineAt(S, 0).s - (lineAt(S, 0).e - lineAt(S, 0).s) * 0.78) * 1.4)) : 0;
    for (let i = 0; i < 7; i++) { if (i) line(xs(i) - 180 + 26, 470, xs(i) - 26, 470, C.dim, a, 2); ring(xs(i), 470, 26, C.dim, a, 2); if (i < reveal && word[i]) dot(xs(i), 470, 24, 'c', a); if (i < reveal) lbl(String(word[i]), xs(i), 530, C.white, a, 22); }
    const wq = Q(S, 0, 'Windows of three atoms', 0.6) * f1;
    for (let w = 0; w < 5; w++) { const y = w % 2 ? 380 : 330, q2 = wq * clamp((S.u - lineAt(S, 0).s - (lineAt(S, 0).e - lineAt(S, 0).s) * 0.25 - w * 0.3) / 0.4); strokePoly([[xs(w) - 40, y + 30], [xs(w) - 40, y], [xs(w + 2) + 40, y], [xs(w + 2) + 40, y + 30]], WC[w], q2, 2.5, false); lbl('q' + ['₁', '₂', '₃', '₄', '₅'][w], xs(w + 1), y - 14, WC[w], q2, 20); }
    const sq = Q(S, 0, 'agree on the pair they share', 0.6) * f1;
    for (let w = 0; w < 4; w++) fillBox(xs(w + 1) - 34, 438, 214, 64, C.gold, sq * 0.14 * (0.6 + 0.4 * Math.sin(t * 3 + w)));
    eqn('qᵢ(b, c) = qᵢ₊₁(b, c)   on every shared pair', 960, 640, sq, C.gold, 28);
    eqn('P(w) = q₁(w₁w₂w₃) · Πᵢ qᵢ(wᵢwᵢ₊₁wᵢ₊₂) / qᵢ(wᵢwᵢ₊₁)', 960, 720, mk, C.white, 26);
  }
  const q = Q(S, 1, 'In pyramid coordinates', 0.6, 0.3);
  if (q > 0) {
    const xs = i => 520 + i * 250, y = 520;
    for (let i = 0; i < 4; i++) { if (i) line(xs(i) - 250 + 32, y, xs(i) - 32, y, C.dim, q, 2); ring(xs(i), y, 32, C.dim, q, 2); dot(xs(i), y, 18, 'w', q * 0.5); lbl(['i', 'i+1', 'i+2', 'i+3'][i], xs(i), y + 8, C.white, q, 18); }
    strokePoly([[xs(0) - 50, 450], [xs(0) - 50, 420], [xs(2) + 50, 420], [xs(2) + 50, 450]], C.cyan, q, 2.5, false); lbl('window i', xs(1), 400, C.cyan, q, 20);
    strokePoly([[xs(1) - 50, 590], [xs(1) - 50, 620], [xs(3) + 50, 620], [xs(3) + 50, 590]], C.gold, q, 2.5, false); lbl('window i+1', xs(2), 650, C.gold, q, 20);
    ['Xᵢ', 'Zᵢ', 'Yᵢ'].forEach((s, i) => lblG(s, xs(i) - 52, 486, C.cyan, q, 22));
    ['Xᵢ₊₁', 'Zᵢ₊₁', 'Yᵢ₊₁'].forEach((s, i) => lblG(s, xs(i + 1) - 52, 572, C.gold, q, 22));
    lblG('Zᵢ = Xᵢ₊₁', 1640, 420, C.white, Q(S, 1, 'the middle of one window is the low end of the next', 0.6), 30);
    lblG('Yᵢ = Zᵢ₊₁', 1640, 480, C.white, Q(S, 1, 'the high end of one is the middle of the next', 0.6), 30);
    const kq = Q(S, 1, 'The hidden kappa of a window is never shared', 0.6);
    curve(z => [xs(0) + (xs(2) - xs(0)) * z, y - 40 - 150 * Math.sin(Math.PI * z)], 40, C.mag, kq, 3);
    curve(z => [xs(1) + (xs(3) - xs(1)) * z, y + 40 + 200 * Math.sin(Math.PI * z)], 40, C.vio, kq, 3);
    lblG('κᵢ', xs(1), 300, C.mag, kq, 26); lblG('κᵢ₊₁', xs(2), 790, C.vio, kq, 26);
    lbl('κ never shared', 1640, 580, C.mag, kq, 22); lbl('each window keeps its own', 1640, 620, C.mag, Q(S, 1, 'so each window keeps its own', 0.6), 20);
  }
};

/* ---- 06 C5 ---- */
SCENES.c5 = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), p = ringPts(620, 500, 210, 5);
  p.forEach((q, i) => { const q2 = p[(i + 1) % 5]; line(q[0], q[1], q2[0], q2[1], C.cyan, s0 * 0.8, 2.5); });
  const hq = Q(S, 0, 'every atom is filled with probability one half', 0.6);
  const wk = Q(S, 1, 'Each step flips', 0.4), L1 = lineAt(S, 1);
  let step = -1;
  if (wk > 0) { const i0 = L1.en.indexOf('Each step flips') / L1.en.length * (L1.e - L1.s); step = Math.min(10, Math.floor((S.u - L1.s - i0) / 0.75)); }
  p.forEach((q, i) => {
    if (step < 0) { soft59(q[0], q[1], hq > 0 ? 0.5 : 0, s0, C.cyan, 'c', null, 26); lbl('½', q[0], q[1] - 38, C.white, hq, 20); }
    else {
      const seen = [];
      for (let s = 0; s <= Math.min(step, 10); s++) if (s % 5 === i) seen.push(s);
      const last = seen.length ? seen[seen.length - 1] : -1, bit = last < 0 ? null : (last % 2 === 0 ? 1 : 0);
      const cl = i === 0 && last === 10, fl = i === 0 && last === 5;
      ring(q[0], q[1], 26, cl ? C.green : fl ? C.red : C.cyan, s0, cl || fl ? 4 : 2); if (bit === 1) dot(q[0], q[1], 24, cl ? 'g' : last >= 5 ? 'o' : 'c', s0);
      if (bit != null) lbl(String(bit), q[0], q[1] - 40, cl ? C.green : fl ? C.red : last >= 5 ? C.gold : C.cyan, s0, 22);
      if (fl) lbl('start was 1', q[0], q[1] - 70, C.red, s0, 18); if (cl) lbl('back to 1', q[0], q[1] - 70, C.green, s0, 18);
    }
  });
  lbl('C₅', 620, 510, C.white, s0, 30);
  const wq = Q(S, 0, 'Give every window', 0.6), f1 = 1 - Q(S, 1, 'Then the expected total', 0.6);
  if (f1 > 0) {
    lblG('each window  =  ½ [101] + ½ [010]', 1380, 340, C.white, wq * f1, 28);
    atoms59(1180, 440, [1, 0, 1], wq * f1, 70, 20, false); atoms59(1460, 440, [0, 1, 0], wq * f1, 70, 20, false);
    lbl('½', 1250, 495, C.gold, wq * f1, 22); lbl('½', 1530, 495, C.gold, wq * f1, 22);
    const nq = Q(S, 0, 'Neighbours agree', 0.6) * f1;
    lbl('shared pair : (0,1) ½ · (1,0) ½', 1380, 590, C.green, nq, 22); lbl('neighbours agree', 1380, 630, C.green, nq, 22);
    lbl('every atom : ½', 1380, 700, C.cyan, hq * f1, 24);
  }
  const q = Q(S, 1, 'Then the expected total', 0.6, 0.3);
  if (q > 0) {
    lblG('E[ Σ ] = 5/2', 1380, 340, C.gold, q, 34);
    lblG('α(C₅) = 2', 1380, 400, C.red, Q(S, 1, 'a five-cycle holds at most two', 0.6), 34);
    if (step >= 0) { lbl('step ' + Math.min(step, 10), 1380, 490, C.white, wk, 26); }
    lbl('after 5 : phase flipped', 1380, 560, C.red, step >= 5 ? 1 : 0, 24);
    lbl('after 10 : closed', 1380, 610, C.green, step >= 10 ? 1 : 0, 24);
    stamp('LOCALLY CONSISTENT · GLOBALLY IMPOSSIBLE', 960, 800, Q(S, 1, 'locally consistent, globally impossible', 0.6), C.red, 34, -0.03);
  }
};

/* ---- 07 TRANSFER ---- */
SCENES.transfer = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical']);
  const s0 = clamp(u), st = ['000', '001', '010', '100', '101'], cw = 82, x0 = 330, y0 = 330;
  const mq = Q(S, 0, 'The transfer matrix', 0.6), tq = Q(S, 0, 'counted by the trace', 0.6);
  st.forEach((s, i) => { lbl(s, x0 - 50, y0 + i * cw + cw / 2 + 7, C.white, mq, 18); lbl(s, x0 + i * cw + cw / 2, y0 - 16, C.white, mq, 18); });
  st.forEach((a, i) => st.forEach((b, j) => { const on = a.slice(1) === b.slice(0, 2), diag = i === j; const x = x0 + j * cw, y = y0 + i * cw; if (on) fillBox(x + 3, y + 3, cw - 6, cw - 6, diag && tq > 0 ? C.gold : C.cyan, mq * 0.35); rect59(x, y, cw, cw, C.dim, mq, 1.2); lbl(on ? '1' : '0', x + cw / 2, y + cw / 2 + 8, on ? C.white : C.dim, mq, 22); }));
  lbl('M[a, b] = 1  ⇔  a₂a₃ = b₁b₂', x0 + 2.5 * cw, y0 + 5 * cw + 50, C.cyan, mq, 20);
  const cq = Q(S, 0, 'Chains of L windows', 0.6), lq = Q(S, 0, 'the Lucas numbers', 0.6);
  const ch = [5, 8, 13, 21, 34, 55], lu = [1, 3, 4, 7, 11, 18];
  lbl('L', 1100, 340, C.white, cq, 22); lblG('1ᵀ Mᴸ⁻¹ 1 = F(L + 4)', 1340, 340, C.cyan, cq, 22); lblG('tr Mᴸ', 1640, 340, C.gold, tq, 22);
  for (let i = 0; i < 6; i++) { const y = 400 + i * 58; lbl(String(i + 1), 1100, y, C.white, cq, 22); lbl(String(ch[i]), 1340, y, C.cyan, Q(S, 0, 'number F L plus four', 0.4, i * 0.2), 24); lbl(String(lu[i]), 1640, y, C.gold, Q(S, 0, 'the Lucas numbers', 0.4, i * 0.3), 24); }
  lbl('Lucas · L ≥ 3 : independent sets of the L-cycle', 1400, 790, C.gold, Q(S, 0, 'which count the independent sets', 0.6), 20);
  void s0; void lq; void t;
};

/* ---- 08 SHAPES ---- */
SCENES.shapes = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Its area is', 0.6);
  const tau = 0.5 + 0.5 * Math.sin(t * 0.9);
  if (f1 > 0) {
    const a = s0 * f1, nq = Q(S, 0, 'Softer shapes nest inside harder ones', 0.6) * f1;
    eqn('γ [ (1 − τ) P_k ⊕ τ ρ_k D ]', 960, 290, Q(S, 0, 'gamma times one minus tau', 0.6) * f1, C.white, 34);
    [[3, 420], [4, 960], [6, 1500]].forEach(([k, x]) => {
      const R = k === 3 ? 170 : 150;
      blend59(x, 540, R, k, 0, C.gold, nq, 2, 0, true); blend59(x, 540, R, k, 1, C.mag, nq, 2, 0, true);
      blend59(x, 540, R, k, tau, C.cyan, a, 3, 0.12);
      lbl('k = ' + k, x, 760, C.white, a, 22);
    });
    lbl('τ = ' + tau.toFixed(2), 960, 820, C.cyan, a, 24);
    lbl('τ = 0 : polygon (rigid)', 420, 820, C.gold, nq, 18); lbl('τ = 1 : inscribed disk (soft)', 1500, 820, C.mag, nq, 18);
  }
  const q = Q(S, 1, 'Its area is', 0.6, 0.3);
  if (q > 0) {
    eqn('Area = γ² [ A + (πρ² − A) τ² ]', 960, 290, q, C.white, 34);
    lbl('linear term cancels', 960, 345, C.gold, Q(S, 1, 'so the linear term cancels', 0.6), 22);
    const px = 360, py = 760, pw = 560, ph = 360; plotAxes(px, py, pw, ph, q, 'τ', 'Area / A');
    const eta = { 3: 1 - Math.PI / (3 * Math.tan(Math.PI / 3)), 4: 1 - Math.PI / 4, 6: 1 - Math.PI / (6 * Math.tan(Math.PI / 6)) };
    [[3, C.mag], [4, C.gold], [6, C.cyan]].forEach(([k, col]) => curve(z => [px + z * pw, py - ph * (1 - eta[k] * z * z) * 0.95], 60, col, q, 3));
    const eq2 = Q(S, 1, 'The relative loss at full softness', 0.6);
    [['triangle  η₃ = 0.395', C.mag, 'for a triangle'], ['square  η₄ = 0.215', C.gold, 'for a square'], ['hexagon  η₆ = 0.093', C.cyan, 'for a hexagon']].forEach(([s, col, ph2], i) => lbl(s, 1400, 440 + i * 56, col, Q(S, 1, ph2, 0.5) * eq2, 24));
    const aq = Q(S, 1, 'Mapping shapes to conflict graphs', 0.6);
    chip(1400, 680, 520, 64, 'shapes → conflict graphs : adapter', C.orange, aq, 22);
    lbl('not yet a proved bridge', 1400, 760, C.red, Q(S, 1, 'not yet a proved bridge', 0.6), 22);
  }
};

/* ---- 09 HARDEN ---- */
const H59 = { Lc: 3.4, poses: [[2.664, 2.767, 1.2796], [0.743, 0.975, 1.5495], [0.762, 2.516, 0.2033], [2.218, 0.845, 0.5010], [2.842, 1.409, 0.3313], [1.782, 2.205, 1.3287], [1.707, 1.320, 0.9606]], vthr: [0.2484, -1, -1, -1, 0.6538, -1, -1], ethr: { '1-6': 0.8986, '2-5': 0.7858, '3-4': 2, '3-6': 2, '4-6': 0.3324, '5-6': 2 } };
function harden59G(tau) {
  const V = [], E = [];
  for (let i = 0; i < 7; i++) if (!(H59.vthr[i] >= 0 && tau < H59.vthr[i])) V.push(i);
  Object.entries(H59.ethr).forEach(([k, v]) => { const [i, j] = k.split('-').map(Number); if (V.includes(i) && V.includes(j) && tau <= v) E.push([i, j]); });
  let n = 0;
  for (let m = 0; m < 128; m++) { let ok = true; for (let i = 0; i < 7; i++) if ((m >> i & 1) && !V.includes(i)) ok = false; if (ok) for (const [i, j] of E) if ((m >> i & 1) && (m >> j & 1)) { ok = false; break; } if (ok) n++; }
  return { V, E, n };
}
SCENES.harden = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), hq = Q(S, 0, 'Harden the shapes', 0.5), L0 = lineAt(S, 0);
  let tau = 1;
  if (hq > 0) { const i0 = L0.en.indexOf('Harden the shapes') / L0.en.length * (L0.e - L0.s); tau = 1 - clamp((S.u - L0.s - i0) / 7); }
  const g = harden59G(tau), sc = 150, ox = 250, oy = 300, side = H59.Lc * sc, f1 = 1 - Q(S, 1, 'That nesting is a theorem', 0.6) * 0.6;
  const a = s0 * f1, f2 = 1 - Q(S, 1, 'That nesting is a theorem', 0.6);
  rect59(ox, oy, side, side, C.white, a, 2.5); lbl('container', ox, oy - 18, C.dim, a, 18, 'left');
  H59.poses.forEach(([cx, cy, th], i) => { const inV = g.V.includes(i), x = ox + cx * sc, y = oy + side - cy * sc; blend59(x, y, sc / Math.SQRT2, 4, tau, inV ? C.cyan : C.red, a * (inV ? 1 : 0.6), 2.5, inV ? 0.1 : 0.05, !inV, -th - Math.PI / 4 + Math.PI / 4); lbl(String(i + 1), x, y + 8, inV ? C.white : C.red, a, 20); });
  g.E.forEach(([i, j]) => { const [a1, b1] = H59.poses[i], [a2, b2] = H59.poses[j]; line(ox + a1 * sc, oy + side - b1 * sc, ox + a2 * sc, oy + side - b2 * sc, C.red, a * 0.9, 3); });
  lbl('τ = ' + tau.toFixed(2) + (tau > 0.95 ? '  soft' : tau < 0.05 ? '  rigid' : ''), ox + side, oy - 18, C.cyan, a * clamp(u), 22, 'right'); 
  const gq = Q(S, 0, 'Two poses conflict', 0.6) * f2;
  if (gq > 0) {
    const gx = 1080, gy = 300, gs = 120;
    g.E.forEach(([i, j]) => { const [a1, b1] = H59.poses[i], [a2, b2] = H59.poses[j]; line(gx + a1 * gs, gy + H59.Lc * gs - b1 * gs, gx + a2 * gs, gy + H59.Lc * gs - b2 * gs, C.red, gq, 3); });
    H59.poses.forEach(([cx, cy], i) => { const inV = g.V.includes(i), x = gx + cx * gs, y = gy + H59.Lc * gs - cy * gs; dot(x, y, 16, inV ? 'c' : 'n', gq * (inV ? 1 : 0.4)); lbl(String(i + 1), x, y - 26, inV ? C.white : C.red, gq, 18); if (!inV) lbl('out', x, y + 34, C.red, gq, 16); });
    lbl('conflict graph G_τ', gx + 1.7 * gs, gy - 20, C.white, gq, 20);
    lbl('independent sets : ' + g.n, 1600, 360, C.gold, Q(S, 0, 'a rigid packing is an independent set', 0.6) * f2, 24, 'left');
    lbl('|V| = ' + g.V.length + '   |E| = ' + g.E.length, 1600, 410, C.white, gq, 22, 'left');
    eqn('STAB(G_hard) ⊆ STAB(G_soft)', 1500, 740, Q(S, 0, 'the harder polytope nests inside the softer one', 0.6) * f2, C.gold, 30);
  }
  const q = Q(S, 1, 'That nesting is a theorem', 0.6, 0.3);
  if (q > 0) {
    chip(1440, 330, 600, 64, 'nesting : theorem in the fixed universe', C.green, q, 22);
    chip(1440, 420, 600, 64, 'search optimum : not monotone', C.orange, Q(S, 1, 'which local optimum a numerical search finds is not', 0.6), 22);
    lbl('hardening : another route, not a dominating one', 1440, 500, C.white, Q(S, 1, 'so hardening is another search route', 0.6), 20);
    const bq = Q(S, 1, 'And on a bipartite graph', 0.6), xv = [1, 0, 0.5, 0.5, 0.5, 0], r1 = [1, 0, 1, 0, 1, 0], r2 = [1, 0, 0, 1, 0, 0], ph = Math.floor(t * 1.4) % 2, mx = Q(S, 1, 'is a mixture of rigid fillings', 0.6);
    for (let i = 0; i < 6; i++) {
      const x = 1110 + i * 130, y = 640, bd = i === 0 || i === 5;
      if (i) line(x - 130 + 28, y, x - 28, y, C.dim, bq, 2);
      if (bd) { rect59(x - 26, y - 26, 52, 52, C.gold, bq, 3); if (xv[i]) dot(x, y, 22, 'o', bq); }
      else { soft59(x, y, xv[i], bq * (1 - mx * 0.6), C.cyan, 'c', null, 24); if (mx > 0 && (ph ? r1 : r2)[i]) dot(x, y, 20, 'm', mx); }
      lbl(xv[i] === 0.5 ? '½' : String(xv[i]), x, y + 56, bd ? C.gold : C.white, bq, 20);
    }
    lbl('boundary fixed', 1110, 720, C.gold, bq, 18); lbl('boundary fixed', 1760, 720, C.gold, bq, 18);
    lbl('= ½ · 101010 + ½ · 100100', 1435, 780, C.mag, mx, 22);
  }
};

/* ---- 10 TENSOR ---- */
SCENES.tensor = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u), sq = Q(S, 0, 'The five-state algebra splits', 0.6);
  lblG('5 = 4 + 1', 360, 340, C.white, sq, 40);
  lblG('V = span{1, x, y, z}', 360, 420, C.cyan, sq, 26); lblG('H = span{xy}', 360, 470, C.mag, Q(S, 0, 'the joint direction', 0.6), 26);
  const cw = 72, x0 = 800, y0 = 290, gq = Q(S, 0, 'so the pair algebra splits', 0.6), nq = Q(S, 0, 'sixteen, four, four and one', 0.6);
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
    const blk = (i < 4 ? 0 : 2) + (j < 4 ? 0 : 1), col = [C.cyan, C.gold, C.gold, C.mag][blk], d = (i + j) * 0.04;
    const q = gq * clamp((S.u - lineAt(S, 0).s - 0.1) / 0.3 - d); fillBox(x0 + j * cw + 3, y0 + i * cw + 3, cw - 6, cw - 6, col, q * (blk === 0 ? 0.3 : 0.55)); rect59(x0 + j * cw, y0 + i * cw, cw, cw, col, q, 1.2);
  }
  lblG('V ⊗ V', x0 + 2 * cw, y0 + 2 * cw - 10, C.white, nq, 24); lbl('16', x0 + 2 * cw, y0 + 2 * cw + 30, C.white, nq, 34);
  lbl('4', x0 + 4.5 * cw, y0 + 2 * cw + 10, C.white, nq, 30); lbl('4', x0 + 2 * cw, y0 + 4.5 * cw + 10, C.white, nq, 30); lbl('1', x0 + 4.5 * cw, y0 + 4.5 * cw + 10, C.white, nq, 26);
  lbl('window 1', x0 + 2.5 * cw, y0 - 20, C.white, gq, 18); lbl('window 2', x0 - 60, y0 + 2.5 * cw, C.white, gq, 18, 'right');
  const fq = Q(S, 0, 'First-order pair readings see sixteen', 0.6);
  lbl('seen : 16 / 25', 1560, 400, C.cyan, fq, 30); lbl('hidden : 9', 1560, 470, C.mag, Q(S, 0, 'and miss nine', 0.6), 34);
  lbl('4 + 4 + 1 = 9', 1560, 530, C.gold, Q(S, 0, 'and miss nine', 0.6), 22);
  void t; void s0;
};

/* ---- 11 TIME ---- */
SCENES.time = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Static, future and maintenance', 0.6);
  if (f1 > 0) {
    const a = s0 * f1;
    eqn('M(a, b) = (b, a + b)', 560, 300, Q(S, 0, 'Under the update', 0.6) * f1, C.white, 32);
    eqn('q₀ = 2a + 3b', 1380, 300, Q(S, 0, 'the reading two a plus three b', 0.6) * f1, C.gold, 32);
    const r1 = Q(S, 0, 'gives six for both', 0.6) * f1, r2 = Q(S, 0, 'and then nine and ten', 0.6) * f1;
    [[480, '(3, 0)', '(0, 3)', '9'], [880, '(0, 2)', '(2, 2)', '10']].forEach(([x, s1, s2, v2]) => {
      lblG(s1, x, 430, C.cyan, a, 30); lbl('q₀ = 6', x, 480, C.gold, r1, 22);
      arrow(x, 510, x, 600, C.white, r2, 3); lblG(s2, x, 650, C.cyan, r2, 30); lbl('q₀ = ' + v2, x, 700, C.red, r2, 24);
    });
    lbl('6 = 6 : equivalent now', 1380, 450, C.gold, r1, 24);
    lbl('9 ≠ 10 : the update breaks it', 1380, 520, C.red, r2, 24);
    const dq = Q(S, 0, 'the direction of time', 0.6) * f1;
    chip(1380, 640, 580, 64, 'time → : legal updates break equivalence', C.mag, dq, 22);
    lbl('model definition', 1380, 720, C.dim, dq, 18);
  }
  const q = Q(S, 1, 'Static, future and maintenance', 0.6, 0.3);
  if (q > 0) {
    [['static', C.cyan], ['future', C.gold], ['maintenance', C.green]].forEach(([s, col], i) => chip(480 + i * 480, 320, 400, 64, s + ' quotient', col, Q(S, 1, i === 0 ? 'Static' : i === 1 ? 'future' : 'maintenance quotients', 0.5), 24));
    const dm = Q(S, 1, 'a death map', 0.6), p = ringPts(760, 600, 180, 4);
    lbl('∅', 760, 612, C.red, dm, 34); ring(760, 600, 34, C.red, dm, 2.5);
    p.forEach((pp, i) => { dot(pp[0], pp[1], 16, ['c', 'g', 'o', 'm'][i], dm); lbl(['[2]', '[3]', '[5]', '[2,5]'][i], pp[0] + (i === 1 ? 50 : i === 3 ? -50 : 0), pp[1] + (i === 2 ? 40 : i === 0 ? -26 : 8), C.white, dm, 18); arrow(pp[0] + (760 - pp[0]) * 0.15, pp[1] + (600 - pp[1]) * 0.15, pp[0] + (760 - pp[0]) * 0.75, pp[1] + (600 - pp[1]) * 0.75, C.red, dm, 2.5); });
    lbl('T(s) = ∅ for every s', 1380, 500, C.white, dm, 24);
    lbl('perfectly predictable', 1380, 570, C.green, Q(S, 1, 'perfectly predictable', 0.6), 24);
    lbl('cannot keep a target alive', 1380, 630, C.red, Q(S, 1, 'nothing it does can keep a target set alive', 0.6), 24);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['COUNT', 'F(m + 2)', C.cyan, 'Legal fillings count'], ['RIGID', 'Q = STAB', C.green, 'soft fillings on paths'], ['ODD', 'Σ x ≤ k', C.red, 'odd cycles cut'], ['HARDEN', 'STAB shrinks', C.orange, 'hardening shrinks'], ['STITCH', 'Zᵢ = Xᵢ₊₁', C.gold, 'path windows stitch'], ['HIDDEN', '25 = 16 + 9', C.mag, 'two windows hide nine']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 22); });
    lbl('LEAN · admissibleWord_card_eq_fib · PathStableSetPolytope.convexHull_vertices', W / 2, 480, C.green, Q(S, 1, 'Lean has frozen') * fade, 19);
    lbl('VOLUMES · bipartite and odd-cycle results · stitching · shape area · hardening nesting · two windows', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory') * fade, 17);
    lbl('CLASSICAL · total unimodularity · mixed area      MODEL · time reading      RECOMPUTED · every number', W / 2, 600, C.white, Q(S, 1, 'the time reading is a model definition') * fade, 18);
    lbl('PARTS XXVI – XXX', W / 2, 690, C.gold, Q(S, 1, 'This closes parts') * fade, 34);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr59(W / 2, 360, 200, 0.5 + t * 0.2, a, { fillBase: true, lab: 0 });
    txt('AURIC FIB ATOM PYRAMID XXX', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXX · 局部填充、软到刚与奇环障碍 · TRURETURING FILM 059', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Where local becomes global.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WHEN LOCAL FILLS', fillings: 'LEGAL FILLINGS', rigid: 'SOFT TO RIGID', odd: 'ODD CYCLES', stitch: 'STITCHING WINDOWS', c5: 'THE FIVE-CYCLE', transfer: 'TRANSFER MATRIX', shapes: 'SOFT SHAPES', harden: 'HARDENING', tensor: 'TWO WINDOWS', time: 'TIME AND QUOTIENTS', finale: 'LEDGER' });

function poster59() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr59(520, 520, 340, 0.6, 1, { fillBase: true, bits: true });
  const p = ringPts(1380, 470, 170, 5);
  p.forEach((q, i) => { const q2 = p[(i + 1) % 5]; line(q[0], q[1], q2[0], q2[1], C.red, 1, 3); });
  p.forEach(q => { soft59(q[0], q[1], 0.5, 1, C.cyan, 'c', null, 26); txt('½', q[0], q[1] - 40, { size: 30, fam: FG, w: 700, align: 'center', c: C.white }); });
  txt('Σ x = 5/2 > 2', 1380, 480, { size: 34, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('soft  ≠  rigid', 1380, 720, { size: 40, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('FIB 原子金字塔 XXX', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXX', W / 2, 890, { size: 78, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('局 部 在 哪 里 变 成 整 体', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 059', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster59;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
