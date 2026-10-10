/* Film 051 */

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

/* ---- film 051: atomic boundary calculus ---- */
const _po51 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po51.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po51.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect51(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const FIB51 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584];
/* divisor box panels of 5040: axes 2 (5 levels) x 3 (3 levels), panels for 5^c 7^d */
function divbox51(x0, y0, cell, a, colf, lab) {
  for (let c = 0; c < 2; c++) for (let d = 0; d < 2; d++) {
    const px = x0 + c * (5 * cell + 40), py = y0 + d * (3 * cell + 40);
    if (lab) lbl('5^' + c + ' 7^' + d, px + 2.5 * cell, py - 10, C.dim, a, 15);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) { const col = colf(i, j, c, d); box(px + i * cell, py + (2 - j) * cell, cell - 6, cell - 6, col[0], a * col[1], 1.5, col[2] || 'rgba(0,0,0,0.4)'); }
  }
}
const SA51 = [[60, 2.8], [120, 3.0], [180, 3.03333], [240, 3.1], [360, 3.25], [720, 3.35833], [840, 3.42857], [1260, 3.46667], [1680, 3.54286], [2520, 3.71429], [5040, 3.8381], [10080, 3.9], [15120, 3.93651], [25200, 3.96603], [27720, 4.05195], [55440, 4.18701], [110880, 4.25455]];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  for (let r = 1; r <= 6; r++) for (let k = 0; k < r; k++) dot(560 - (r - 1) * 26 + k * 52, 240 + r * 56, 9, 'g', clamp(s0 * 7 - r));
  lbl('a line of numbers', 560, 660, C.dim, s0, 18);
  const dq = Q(S, 0, 'the divisors of five thousand', 0.8);
  divbox51(1060, 300, 40, dq, (i, j) => [C.cyan, 1]);
  lbl('5040 = 2⁴ · 3² · 5 · 7', 1290, 640, C.cyan, dq, 22);
  [['local law', C.white, 'a local law', 330], ['start', C.gold, 'a starting value', 650], ['seams', C.cyan, 'the seams', 970], ['tail', C.mag, 'a tail that has not', 1290], ['drop one ⟹ lost', C.red, 'Drop any one', 1610]]
    .forEach(([s, col, ph, x]) => chip(x, 780, 280, 54, s, col, Q(S, 1, ph), 20));
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  divbox51(700, 230, 46, rp, (i, j, c, d) => (i === 4 && j === 2 && c === 1 && d === 1) ? [C.gold, 1, 'rgba(255,207,90,0.4)'] : [C.cyan, 0.7]);
  txt(scramble('AURIC FIB ATOM PYRAMID XXII', rp, 452), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXII · 原 子 边 界 演 算', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 051 · AURIC_FIB_ATOMIC_BOUNDARY_CALCULUS', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 DIFFERENCES ---- */
SCENES.differences = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Stack layers', 0.6);
  if (f1 > 0) {
    const fv = [3, 5, 4, 7, 6, 8, 5, 9], X = 420, Y = 600, sh = Q(S, 0, 'Without the first value', 0.8) * 2 * Math.sin(t * 1.5);
    fv.forEach((v, k) => {
      const x = X + k * 110, h = v * 40, q = clamp(s0 * 8 - k) * f1;
      fillBox(x, Y - h, 70, h, k === 0 ? C.gold : C.cyan, q * 0.35); rect51(x, Y - h, 70, h, k === 0 ? C.gold : C.cyan, q, 2);
      if (k) { const dv = v - fv[k - 1]; lbl((dv >= 0 ? '+' : '') + dv, x + 35, Y + 40, C.green, Q(S, 0, 'Its increments', 0.5, k * 0.15) * f1, 22); }
      if (sh) rect51(x, Y - h - sh * 40, 70, h, C.red, Q(S, 0, 'Without the first value', 0.5) * f1 * 0.7, 1.5);
    });
    lbl('f₀ (reference)', X + 35, Y + 40, C.gold, Q(S, 0, 'plus the first value', 0.5) * f1, 18);
    eqn('f_k = f₀ + Σ_{j ≤ k} (f_j − f_{j−1})', 1600, 300, Q(S, 0, 'rebuild every term') * f1, C.white, 26);
    chip(1600, 400, 520, 54, 'no f₀  ⟹  only up to + c', C.red, Q(S, 0, 'Without the first value') * f1, 22);
  }
  const q = Q(S, 1, 'Stack layers', 0.6, 0.3);
  if (q > 0) {
    const tq = Q(S, 1, 'Rows of one, two, three', 1.2);
    for (let r = 1; r <= 6; r++) for (let k = 0; k < r; k++) dot(520 - (r - 1) * 30 + k * 60, 260 + r * 66, 11, 'c', clamp(tq * 6 - r + 1) * q);
    eqn('Σ k = N(N+1)/2', 520, 760, tq, C.cyan, 30);
    const pq = Q(S, 1, 'Squares of one, four, nine', 1.4);
    for (let r = 1; r <= 5; r++) { const qq = clamp(pq * 5 - r + 1) * q, w = r * 46, x = 1320 - w / 2, y = 250 + r * 78; fillBox(x, y, w, 50, C.gold, qq * 0.3); rect51(x, y, w, 50, C.gold, qq, 2); lbl(r + '²', x + w + 30, y + 34, C.gold, qq, 20, 'left'); }
    eqn('Σ k² = N(N+1)(2N+1)/6', 1320, 760, pq, C.gold, 30);
  }
};

/* ---- 03 CORNERS ---- */
SCENES.corners = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), X = 300, Y = 230, c = 64, a = 4, b = 3;
  for (let i = 0; i < 7; i++) for (let j = 0; j < 6; j++) { const v = ((i * 7 + j * 3) % 5) + 1; box(X + i * c, Y + (5 - j) * c, c - 6, c - 6, C.dim, s0 * 0.8, 1.2, 'rgba(0,0,0,0.4)'); lbl(String(v), X + i * c + 29, Y + (5 - j) * c + 38, C.dim, s0, 18); }
  const blk = (ii, jj, col, a_, sgn) => { if (ii < 0 || jj < 0) return; fillBox(X - 3, Y + (5 - jj) * c - 3, (ii + 1) * c, (jj + 1) * c, col, a_ * 0.18); rect51(X - 3, Y + (5 - jj) * c - 3, (ii + 1) * c, (jj + 1) * c, col, a_, 3); };
  const q1 = Q(S, 0, 'take the big block', 0.5), q2 = Q(S, 0, 'subtract the left', 0.5), q3 = Q(S, 0, 'add back their overlap', 0.5);
  blk(a, b, C.cyan, q1); blk(a - 1, b, C.red, q2); blk(a, b - 1, C.red, q2); blk(a - 1, b - 1, C.green, q3);
  box(X + a * c, Y + (5 - b) * c, c - 6, c - 6, C.gold, Q(S, 0, 'one atom is four corners', 0.5), 3, 'rgba(255,207,90,0.35)');
  eqn('w_ab = F(a,b) − F(a−1,b) − F(a,b−1) + F(a−1,b−1)', 1350, 300, Q(S, 0, 'one atom is four corners'), C.white, 22);
  const cq = Q(S, 0, 'it takes eight corners', 0.6), v = v3(1350, 560, 110, 0.6 + t * 0.2, 0.42);
  const P = itr51();
  const W3 = p => v(p[0] * 1.2 - 0.6, p[1] * 1.2 - 0.6, p[2] * 1.2 - 0.6);
  [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]].forEach(([i, j]) => { const a_ = W3(P[i]), b_ = W3(P[j]); line(a_[0], a_[1], b_[0], b_[1], C.dim, cq, 1.5); });
  P.forEach(p => { const pp = W3(p), plus = (p[0] + p[1] + p[2]) % 2 === 1; dot(pp[0], pp[1], 9, plus ? 'g' : 'r', cq); lbl(plus ? '+' : '−', pp[0] + 16, pp[1] - 10, plus ? C.green : C.red, cq, 20); });
  lbl('3D: 8 corners   ·   r directions: 2^r', 1350, 760, C.white, Q(S, 0, 'two to the r', 0.5), 20);
  chip(1350, 820, 620, 54, 'accumulated values, not bare coordinates', C.gold, Q(S, 1, 'must carry accumulated'), 20);
  chip(760, 820, 520, 54, 'one corner set → one atom', C.red, Q(S, 1, 'one set of corners'), 20);
};
function itr51() { const P = []; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) P.push([i, j, k]); return P; }

/* ---- 04 CONES ---- */
SCENES.cones = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Each moment needs', 0.6);
  if (f1 > 0) {
    const O = [600, 520], Pg = [[420, 380], [640, 300], [800, 420], [760, 640], [520, 700], [400, 560]];
    const fan = Q(S, 0, 'cut it into cones', 1.2) * f1;
    Pg.forEach((p, k) => {
      const n = Pg[(k + 1) % Pg.length], qq = clamp(fan * 6 - k);
      fillPoly([O, p, n], k % 2 ? C.cyan : C.mag, qq * 0.14); line(O[0], O[1], p[0], p[1], C.dim, qq, 1.2);
      const ex = n[0] - p[0], ey = n[1] - p[1], L2 = ex * ex + ey * ey, tt = ((O[0] - p[0]) * ex + (O[1] - p[1]) * ey) / L2, F_ = [p[0] + tt * ex, p[1] + tt * ey];
      dashed(O[0], O[1], F_[0], F_[1], C.gold, Q(S, 0, 'height times edge length', 0.5, k * 0.1) * f1, 2);
    });
    strokePoly(Pg, C.cyan, s0 * f1, 2.5); dot(O[0], O[1], 11, 'w', s0 * f1); lbl('O', O[0] - 16, O[1] - 14, C.white, s0 * f1, 20, 'right');
    eqn('A = ½ Σ h_e |e|', 1380, 330, Q(S, 0, 'The area is one half') * f1, C.gold, 32);
    eqn('V = ⅓ Σ h_E A(E)', 1380, 420, Q(S, 0, 'the volume is one third') * f1, C.cyan, 32);
    lbl('h = distance from O to the edge or face', 1380, 480, C.dim, Q(S, 0, 'the volume is one third', 0.5) * f1, 18);
  }
  const q = Q(S, 1, 'Each moment needs', 0.6, 0.3);
  if (q > 0) {
    eqn('∫_K f dx = 1/(d + r) ∮ f(x) x·ν dS ,   f of degree r', 960, 270, q, C.white, 24);
    const sc = 70, OX = 560, OY = 560, P = (x, y) => [OX + x * sc, OY - y * sc], T1 = [[-1, -1], [3, -1], [-1, 2]], T2 = T1.map(p => [-p[0], -p[1]]);
    line(OX - 4 * sc, OY, OX + 4 * sc, OY, C.dim, q, 1.2); line(OX, OY - 2.6 * sc, OX, OY + 2.6 * sc, C.dim, q, 1.2);
    const tq = Q(S, 1, 'A triangle with corners', 0.6), mq = Q(S, 1, 'its mirror image', 0.6);
    fillPoly(T1.map(p => P(...p)), C.cyan, tq * 0.2); strokePoly(T1.map(p => P(...p)), C.cyan, tq, 2.5);
    fillPoly(T2.map(p => P(...p)), C.mag, mq * 0.15); strokePoly(T2.map(p => P(...p)), C.mag, mq, 2.5);
    const c1 = P(1 / 3, 0), c2 = P(-1 / 3, 0); dot(c1[0], c1[1], 10, 'c', tq); dot(c2[0], c2[1], 10, 'm', mq);
    eqn('area 6 ,  ∫ x₁ = 2', 1400, 420, Q(S, 1, 'has area six'), C.cyan, 28);
    eqn('mirror:  area 6 ,  ∫ x₁ = −2', 1400, 500, mq, C.mag, 28);
    chip(1400, 610, 560, 54, 'total area does not fix the moments', C.red, Q(S, 1, 'moment minus two'), 20);
  }
};

/* ---- 05 WINDOWS ---- */
SCENES.windows = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Those end terms vanish', 0.6);
  if (f1 > 0) {
    const vals = [1, 5, 21, 89, 377], X0 = 360, Y0 = 700, sc = 400 / Math.log(625 * 1.2);
    plotAxes(X0 - 30, Y0, 820, 440, s0 * f1, 'n windows', 'count (log)');
    vals.forEach((v, n) => {
      const qq = Q(S, 0, 'one, five, twenty-one', 0.4, n * 0.25) * f1, x = X0 + n * 160, h = Math.log(v * 1.2) * sc, h5 = Math.log(Math.pow(5, n) * 1.2) * sc;
      fillBox(x, Y0 - h, 50, h, C.gold, qq * 0.5); rect51(x, Y0 - h, 50, h, C.gold, qq, 2); lbl(String(v), x + 25, Y0 - h - 12, C.gold, qq, 20);
      const q5 = Q(S, 0, 'not five to the n', 0.4, n * 0.15) * f1; rect51(x + 60, Y0 - h5, 50, h5, C.red, q5, 2); lbl(String(Math.pow(5, n)), x + 85, Y0 - h5 - 12, C.red, q5, 18);
    });
    lbl('F₃ₙ₊₂', X0 + 120, 300, C.gold, Q(S, 0, 'F of three n plus two', 0.5) * f1, 24); lbl('5ⁿ', X0 + 300, 300, C.red, Q(S, 0, 'not five to the n', 0.5) * f1, 24);
    eqn('(1 − 4z − z²) G_N(z) = 1 + z − a_{N+1} z^{N+1} − a_N z^{N+2}', 1300, 760, Q(S, 0, 'an exact identity') * f1, C.white, 21);
    mgrid(1320, 330, [['3', '2'], ['2', '1']], 90, 64, Q(S, 0, 'With seams', 0.6) * f1, { colf: () => C.cyan, size: 24 });
    lbl('seam matrix A = B³', 1410, 300, C.cyan, Q(S, 0, 'With seams', 0.6) * f1, 18); lbl('A² = 4A + I', 1410, 500, C.cyan, Q(S, 0, 'With seams', 0.6, 0.6) * f1, 20);
  }
  const q = Q(S, 1, 'Those end terms vanish', 0.6, 0.3);
  if (q > 0) {
    const cx = 520, cy = 520, R = 200, rq = 0.236;
    ring(cx, cy, R, C.green, q, 3); line(cx - 260, cy, cx + 260, cy, C.dim, q, 1); line(cx, cy - 260, cx, cy + 260, C.dim, q, 1);
    lbl('|z| < φ⁻³ ≈ 0.236', cx, cy - R - 20, C.green, q, 22);
    const zq = Q(S, 1, 'there, and only there', 0.6), zr = 0.75 * R, ang = t * 0.8; dot(cx + zr * Math.cos(ang), cy + zr * Math.sin(ang), 11, 'g', zq);
    dot(cx + R * 1.25, cy, 11, 'r', zq); lbl('outside: terms do not → 0', cx + R * 1.25, cy + 40, C.red, zq, 16);
    eqn('Σ aₙ zⁿ = (1 + z) / (1 − 4z − z²)', 520, 800, zq, C.green, 26);
    const fq = Q(S, 1, 'the squares of Fibonacci', 1.6), s = 22, sq = [[0, 0, 1], [1, 0, 1], [0, 1, 2], [-3, 0, 3], [-3, -5, 5], [2, -5, 8]];
    const ox = 1300, oy = 560;
    sq.forEach(([x, y, w], k) => { const qq = clamp(fq * 6 - k); fillBox(ox + x * s, oy + y * s, w * s, w * s, [C.cyan, C.gold, C.mag, C.green, C.cyan, C.gold][k], qq * 0.25); rect51(ox + x * s, oy + y * s, w * s, w * s, [C.cyan, C.gold, C.mag, C.green, C.cyan, C.gold][k], qq, 2); if (w > 1) lbl(w + '²', ox + (x + w / 2) * s, oy + (y + w / 2) * s + 8, C.white, qq, 18); });
    eqn('Σ F_k² = F_N F_{N+1}', 1420, 820, Q(S, 1, 'the last rectangle'), C.gold, 28);
  }
};

/* ---- 06 DIVISORS ---- */
SCENES.divisors = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), cell = 54, X0 = 280, Y0 = 280;
  const top = [4, 2, 1, 1], corner = Q(S, 1, 'Sixteen signed readings', 0.8);
  divbox51(X0, Y0, cell, s0, (i, j, c, d) => {
    const dd = [4 - i, 2 - j, 1 - c, 1 - d], isC = dd.every(x => x === 0 || x === 1);
    if (corner > 0 && isC) { const neg = dd.reduce((a_, b_) => a_ + b_, 0) % 2 === 1; return [neg ? C.red : C.green, 1, neg ? 'rgba(255,59,92,0.3)' : 'rgba(77,255,166,0.3)']; }
    return [C.cyan, 0.75];
  }, true);
  lbl('60 divisors = 5 × 3 × 2 × 2', X0 + 330, Y0 + 430, C.cyan, Q(S, 0, 'sixty divisors', 0.6), 22);
  eqn('5040 = 2⁴ · 3² · 5 · 7', 1400, 300, Q(S, 0, 'Five thousand and forty is'), C.white, 30);
  eqn('σ(n)/n = Σ_{d | n} 1/d', 1400, 380, Q(S, 0, 'Accumulate one over d'), C.gold, 30);
  const mq = Q(S, 1, 'Möbius inversion', 0.6);
  eqn('f(n) = Σ_{d | n} μ(d) F(n/d)', 1400, 470, mq, C.white, 26);
  eqn('Σ_{d | 210} μ(d) Z(5040/d) = 1/5040', 1400, 560, Q(S, 1, 'return the top atom'), C.green, 28);
  lbl('green +   red −   (16 corners)', 1400, 620, C.dim, corner, 18);
  lbl('Z(5040) = 403/105', 1400, 680, C.cyan, corner, 22);
};

/* ---- 07 OUTER ---- */
SCENES.outer = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Phases give a third view', 0.6);
  if (f1 > 0) {
    const cell = 44, X0 = 300, Y0 = 300, eq = Q(S, 0, 'sixteen outer endpoints', 0.8) * f1;
    for (let c = 0; c < 3; c++) for (let d = 0; d < 3; d++) {
      const px = X0 + c * (6 * cell + 30), py = Y0 + d * (4 * cell + 30);
      if (c < 2 && d < 2) for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) box(px + i * cell, py + (3 - j) * cell, cell - 6, cell - 6, C.cyan, s0 * f1 * 0.7, 1.2, 'rgba(0,0,0,0.4)');
    }
    for (let e = 0; e < 16; e++) {
      const b = [e & 1, (e >> 1) & 1, (e >> 2) & 1, (e >> 3) & 1], idx = [b[0] * 5, b[1] * 3, b[2] * 1, b[3] * 1];
      const c = b[2] ? 2 : 0, d = b[3] ? 2 : 0, px = X0 + c * (6 * cell + 30), py = Y0 + d * (4 * cell + 30), x = px + idx[0] * cell, y = py + (3 - idx[1]) * cell;
      const neg = (b[0] + b[1] + b[2] + b[3]) % 2 === 1; dot(x + cell / 2 - 3, y + cell / 2 - 3, 10, neg ? 'r' : 'g', clamp(eq * 16 - e));
    }
    eqn('∏ (1 − x_p) · P = (1 − x₂⁵)(1 − x₃³)(1 − x₅²)(1 − x₇²)', 1360, 300, Q(S, 0, 'One minus x to the m') * f1, C.white, 21);
    chip(1360, 400, 560, 54, '16 outer jumps + box rule → 60 terms', C.gold, Q(S, 0, 'rebuild all sixty') * f1, 20);
    chip(1360, 480, 560, 54, 'outside the box, not corners inside', C.red, Q(S, 0, 'not corners inside') * f1, 20);
  }
  const q = Q(S, 1, 'Phases give a third view', 0.6, 0.3);
  if (q > 0) {
    [[2, 5, C.cyan], [3, 3, C.gold], [5, 2, C.mag], [7, 2, C.green]].forEach(([p, m, col], k) => {
      const cx = 360 + k * 260, cy = 450, R = 90, qq = Q(S, 1, 'on its own grid', 0.5, k * 0.25);
      ring(cx, cy, R, col, qq, 2); lbl('p = ' + p, cx, cy + R + 40, col, qq, 22); lbl(m + ' angles', cx, cy + R + 72, C.dim, qq, 18);
      for (let j = 0; j < m; j++) { const a_ = -Math.PI / 2 + j * TAU / m; dot(cx + R * Math.cos(a_), cy + R * Math.sin(a_), 9, 'w', qq); line(cx, cy, cx + R * Math.cos(a_), cy + R * Math.sin(a_), col, qq * 0.5, 1); }
    });
    eqn('average |A|² = σ(n)/n = 403/105', 1480, 380, Q(S, 1, 'the average of the squared'), C.green, 26);
    chip(1480, 490, 460, 54, 'independent grid: 60 pairs', C.green, Q(S, 1, 'the average of the squared', 0.6, 0.6), 20);
    chip(1480, 570, 460, 54, 'one shared phase: 548 pairs', C.red, Q(S, 1, 'One shared phase'), 20);
  }
};

/* ---- 08 STRIPS ---- */
SCENES.strips = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Expand the strips', 0.6);
  const X0 = 300, Y0 = 720, PW = 900, PH = 420, sx = x => X0 + x / 0.56 * PW, sy = y => Y0 - (y - 0.0) / 2.4 * PH;
  if (f1 > 0) {
    plotAxes(X0, Y0, PW + 20, PH + 20, s0 * f1, 't', '1/(1 − t)');
    const strips = [[2, 1 / 32, 1 / 2, C.cyan], [3, 1 / 27, 1 / 3, C.gold], [5, 1 / 25, 1 / 5, C.mag], [7, 1 / 49, 1 / 7, C.green]];
    strips.forEach(([p, c, b, col], k) => {
      const qq = Q(S, 0, 'For five thousand and forty', 0.5, k * 0.3) * f1, pts = [[sx(c), sy(0)]];
      for (let i = 0; i <= 40; i++) { const tt = c + (b - c) * i / 40; pts.push([sx(tt), sy(1 / (1 - tt))]); }
      pts.push([sx(b), sy(0)]); fillPoly(pts, col, qq * 0.2); strokePoly(pts, col, qq, 2);
      lbl('p = ' + p, sx(b) + 6, sy(1 / (1 - b)) - 14 - k * 4, col, qq, 18, 'left');
    });
    curve(s => { const tt = 0.56 * s; return [sx(tt), sy(1 / (1 - tt))]; }, 100, C.white, s0 * f1, 2.5);
    eqn('log σ(n)/n = Σ_p ∫ from p^−(a+1) to 1/p of dt/(1 − t)', 1450, 300, Q(S, 0, 'becomes a labeled strip') * f1, C.white, 19);
    eqn('= log(403/105)  for 5040', 1450, 360, Q(S, 0, 'add up to log') * f1, C.green, 24);
    chip(1450, 460, 440, 54, 'labels count overlaps', C.gold, Q(S, 0, 'the labels matter') * f1, 20);
    chip(1450, 540, 440, 54, 'the union pays less', C.red, Q(S, 0, 'the union would pay less') * f1, 20);
  }
  const q = Q(S, 1, 'Expand the strips', 0.6, 0.3);
  if (q > 0) {
    const LK = [0, 1.0475, 1.25607, 1.31367, 1.33289, 1.34004, 1.34288, 1.34406, 1.34457], target = Math.log(403 / 105);
    const PX = 380, PY = 720, pw = 900, ph = 420, yv = v => PY - (v - 1.0) / 0.45 * ph;
    plotAxes(PX - 20, PY, pw + 40, ph + 20, q, 'K', 'partial sum');
    dashed(PX - 20, yv(target), PX + pw + 20, yv(target), C.green, q, 2); lbl('log(403/105) ≈ 1.3449', PX + pw + 30, yv(target) + 6, C.green, q, 18, 'left');
    LK.forEach((v, k) => { if (!k) return; const qq = Q(S, 1, 'Every finite cut', 0.4, k * 0.2), x = PX + (k - 1) * 110; const eps = [1.91667, 0.37024, 0.10632, 0.0365, 0.01383, 0.00557, 0.00233, 0.00101, 0.00044][k];
      dot(x, yv(v), 9, 'c', qq); line(x, yv(v), x, yv(Math.min(v + eps, 1.45)), C.gold, Q(S, 1, 'computable tail budget', 0.4, k * 0.15), 3); });
    lbl('lower: L_K', PX + 60, PY - 30, C.cyan, Q(S, 1, 'strict lower bound', 0.5), 20, 'left'); lbl('upper: L_K + ε_K', PX + 360, PY - 30, C.gold, Q(S, 1, 'computable tail budget', 0.5), 20, 'left');
    chip(1500, 560, 420, 54, 'error kept, never dropped', C.white, Q(S, 1, 'never dropped'), 20);
  }
};

/* ---- 09 DIRICHLET ---- */
SCENES.dirichlet = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), cx = 560, cy = 520, sc = 120;
  line(cx - 260, cy, cx + 420, cy, C.dim, s0, 1.2); line(cx, cy - 280, cx, cy + 280, C.dim, s0, 1.2);
  lbl('Re s', cx + 430, cy + 6, C.dim, s0, 18, 'left'); lbl('Im s', cx, cy - 292, C.dim, s0, 18);
  const hq = Q(S, 0, 'for real part of s above one', 0.8);
  fillBox(cx + sc, cy - 280, 300, 560, C.green, hq * 0.12); dashed(cx + sc, cy - 280, cx + sc, cy + 280, C.green, hq, 2); lbl('Re s > 1', cx + sc + 150, cy - 240, C.green, hq, 22);
  lbl('1', cx + sc, cy + 30, C.white, s0, 20);
  eqn('Σ_n (σ(n)/n) n^−s = ζ(s) ζ(s + 1)', 1400, 330, Q(S, 0, 'it splits into zeta'), C.white, 28);
  lbl('absolute convergence first, then regrouping', 1400, 390, C.dim, Q(S, 0, 'converges absolutely', 0.6), 18);
  const dq = Q(S, 1, 'At s equal to one', 0.6); dot(cx + sc, cy, 13, 'r', dq);
  eqn('s = 1 :  Σ σ(n)/n² ≥ Σ 1/n = ∞', 1400, 500, dq, C.red, 26);
  chip(1400, 610, 600, 54, 'says nothing by itself about zeros', C.gold, Q(S, 1, 'says nothing by itself'), 20);
};

/* ---- 10 ROBIN ---- */
SCENES.robin = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'published'], [1, '', 'lean'], [2, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Lean has frozen', 0.6);
  if (f1 > 0) {
    const X0 = 300, Y0 = 740, PW = 900, PH = 460, lx = n => X0 + (Math.log(n) - Math.log(50)) / (Math.log(130000) - Math.log(50)) * PW, ly = z => Y0 - (z - 2.6) / 1.9 * PH;
    plotAxes(X0, Y0, PW + 20, PH + 20, s0 * f1, 'n (log)', 'σ(n)/n');
    const cq = Q(S, 0, 'stays below e to the gamma', 1.0) * f1;
    curve(s => { const n = Math.exp(Math.log(60) + s * (Math.log(125000) - Math.log(60))); return [lx(n), ly(Math.exp(0.5772156649) * Math.log(Math.log(n)))]; }, 120, C.gold, cq, 3);
    lbl('e^γ log log n', lx(100000), ly(4.45), C.gold, cq, 20);
    dashed(lx(5040), Y0, lx(5040), Y0 - PH, C.dim, cq, 1.5); lbl('5040', lx(5040), Y0 + 30, C.white, cq, 18);
    SA51.forEach(([n, z], k) => { const above = z > Math.exp(0.5772156649) * Math.log(Math.log(n)); dot(lx(n), ly(z), 9, above ? 'r' : 'c', Q(S, 0, 'stays below e to the gamma', 0.4, k * 0.08) * f1); });
    eqn('RH  ⟺  σ(n)/n < e^γ log log n  for all n > 5040', 1450, 300, Q(S, 0, "Robin's criterion") * f1, C.white, 20);
    eqn('m(n) = γ + log log log n − log(σ(n)/n)', 1450, 380, Q(S, 0, 'Write the margin') * f1, C.gold, 22);
    chip(1450, 470, 460, 54, 'exact rational intervals', C.cyan, Q(S, 0, 'exact rational intervals') * f1, 20);
    eqn('m(5040) ≈ −0.0055', 1450, 560, Q(S, 0, 'Five thousand and forty itself') * f1, C.red, 26);
    eqn('m(10080) ≈ +0.014', 1450, 630, Q(S, 0, 'ten thousand and eighty') * f1, C.green, 26);
  }
  const lq = Q(S, 1, 'Lean has frozen', 0.6, 0.3) * (1 - Q(S, 2, 'The volume gives', 0.6));
  if (lq > 0) {
    box(360, 300, 1200, 220, C.green, lq, 2, 'rgba(0,0,0,0.5)');
    lbl('LEAN · Arith.Robin.SevenSmooth.robin_seven_smooth', 960, 350, C.green, lq, 22);
    lbl('5040 < 2ᵃ 3ᵇ 5ᶜ 7ᵈ  ⟹', 960, 410, C.white, Q(S, 1, 'every product of powers', 0.5), 26);
    lbl('σ(n)/n < e^γ log log n', 960, 470, C.white, Q(S, 1, "satisfies Robin's inequality", 0.5), 28);
  }
  const q2 = Q(S, 2, 'The volume gives', 0.6, 0.3);
  if (q2 > 0) {
    const X0 = 360, Y0 = 720, PW = 1200, PH = 360, cap = 35 / 8, ly = z => Y0 - (z - 3.5) / 1.0 * PH;
    plotAxes(X0, Y0, PW + 20, PH + 20, q2, '', 'max σ(n)/n');
    const capq = Q(S, 2, 'thirty-five over eight', 0.6);
    dashed(X0, ly(cap), X0 + PW, ly(cap), C.red, capq, 2.5); lbl('35/8 for every 7-smooth n', X0 + 10, ly(cap) - 14, C.red, capq, 18, 'left');
    const segs = [['5041–10079', 72, 80 / 21, '80/21'], ['10080–25199', 121, 248 / 63, '248/63'], ['25200–119999', 270, 3844 / 945, '3844/945'], ['≥ 120000', '∞', cap, '< 35/8']];
    segs.forEach(([rng, cnt, mx, ml], k) => { const qq = Q(S, 2, 'three segments', 0.5, k * 0.35), x = X0 + 60 + k * 290, h = Y0 - ly(mx); fillBox(x, Y0 - h, 180, h, k === 3 ? C.mag : C.cyan, qq * 0.3); rect51(x, Y0 - h, 180, h, k === 3 ? C.mag : C.cyan, qq, 2); lbl(rng, x + 90, Y0 + 30, C.white, qq, 17); lbl(cnt + ' numbers', x + 90, Y0 + 56, C.dim, qq, 16); lbl(ml, x + 90, Y0 - h - 12, C.white, qq, 20); });
    lbl('each segment: margin > 0 with outward rational bounds', 960, 300, C.green, Q(S, 2, 'checked exactly', 0.6), 20);
  }
};

/* ---- 11 GAP ---- */
SCENES.gap = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'open'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'That is not a counterexample', 0.6);
  stamp('OPEN', 560, 330, Q(S, 0, 'stays open', 0.6), C.gold, 64, -0.06);
  lbl('all integers n > 5040  ⟺  Riemann hypothesis', 560, 460, C.gold, Q(S, 0, 'the Riemann hypothesis itself', 0.6), 20);
  const X0 = 1100, Y0 = 640, ly = z => Y0 - (z - 3.5) / 1.2 * 340, cap = 35 / 8, bq = Q(S, 0, 'seven hundred twenty thousand', 0.6);
  dashed(X0 - 40, ly(cap), X0 + 520, ly(cap), C.red, s0, 2.5); lbl('35/8 = 4.375', X0 + 530, ly(cap) + 6, C.red, s0, 18, 'left');
  fillBox(X0, ly(403 / 105), 160, Y0 - ly(403 / 105), C.cyan, s0 * 0.3); rect51(X0, ly(403 / 105), 160, Y0 - ly(403 / 105), C.cyan, s0, 2); lbl('5040', X0 + 80, Y0 + 30, C.white, s0, 18); lbl('403/105', X0 + 80, ly(403 / 105) - 12, C.cyan, s0, 18);
  fillBox(X0 + 280, ly(3224 / 715), 160, Y0 - ly(3224 / 715), C.mag, bq * 0.3); rect51(X0 + 280, ly(3224 / 715), 160, Y0 - ly(3224 / 715), C.mag, bq, 2); lbl('720720 = 5040·11·13', X0 + 360, Y0 + 30, C.white, bq, 16); lbl('3224/715 ≈ 4.509', X0 + 360, ly(3224 / 715) - 12, C.mag, bq, 18);
  const q = Q(S, 1, 'That is not a counterexample', 0.6, 0.3);
  chip(560, 600, 620, 54, 'not a counterexample · edge of the method', C.white, q, 20);
  [['new primes', C.cyan], ['deeper exponents', C.gold], ['growth of log n', C.green], ['the whole tail', C.mag]].forEach(([s, col], k) => chip(380 + k * 400, 790, 340, 54, s, col, Q(S, 1, 'must pay at once', 0.5, k * 0.3), 20));
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['START', 'f₀ + Σ ∇f', C.gold, 'differences with a reference'], ['CORNERS', '2ʳ signed reads', C.cyan, 'corners with accumulated'], ['SEAMS', '|z| < φ⁻³', C.green, 'windows inside their disc'], ['TAIL', 'L_K < log Z ≤ L_K + ε_K', C.mag, 'margins with their errors']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 26); lblG(a2, x, 350, C.white, q, 20); });
    lbl('LEAN · Robin.SevenSmooth · every 7-smooth n > 5040 satisfies Robin', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 21);
    lbl('VOLUME · differences · divisor bridges · strips · certificate   CLASSICAL · Möbius · zeta products   PUBLISHED · Robin', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 17);
    lbl('OPEN · the general case      RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'the general case is open') * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    divbox51(720, 250, 40, a, (i, j, c, d) => (i === 4 && j === 2 && c === 1 && d === 1) ? [C.gold, 1, 'rgba(255,207,90,0.4)'] : [C.cyan, 0.7]);
    txt('AURIC FIB ATOM PYRAMID XXII', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXII · 原子边界演算 · TRURETURING FILM 051', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Keep the start, the seam and the tail.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'BOUNDARY TO INSIDE', differences: 'DIFFERENCES', corners: 'CORNERS', cones: 'CONES AND MOMENTS', windows: 'WINDOWS AND TAILS', divisors: 'DIVISOR CORNERS', outer: 'OUTER ENDPOINTS', strips: 'LABELED STRIPS', dirichlet: 'ALL DIVISORS', robin: 'ROBIN MARGIN', gap: 'THE OPEN CASE', finale: 'LEDGER' });

function poster51() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  divbox51(150, 260, 62, 1, (i, j, c, d) => {
    const dd = [4 - i, 2 - j, 1 - c, 1 - d], isC = dd.every(x => x === 0 || x === 1);
    if (isC) { const neg = dd.reduce((a_, b_) => a_ + b_, 0) % 2 === 1; return [neg ? C.red : C.green, 1, neg ? 'rgba(255,59,92,0.3)' : 'rgba(77,255,166,0.3)']; }
    return [C.cyan, 0.8];
  });
  txt('Σ μ(d) Z(5040/d) = 1/5040', 1370, 300, { size: 38, fam: FG, w: 700, align: 'center', c: C.green });
  txt('w = F − F − F + F', 1370, 390, { size: 36, fam: FG, w: 700, align: 'center', c: C.white });
  txt('a_n = F₃ₙ₊₂ ,  |z| < φ⁻³', 1370, 480, { size: 34, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('σ(n)/n < e^γ log log n', 1370, 570, { size: 34, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('FIB 原子金字塔 XXII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXII', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('留 住 起 点 · 接 缝 与 尾 项', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 051', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster51;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
