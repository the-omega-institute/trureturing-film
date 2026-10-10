/* Film 055 */

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

/* ---- film 055: relational quotients and recovery ---- */
const _po55 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po55.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po55.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect55(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
function mat55(M, x, y, cw, ch, a, col, size = 22) { mgrid(x, y, M, cw, ch, a, { colf: () => col, size }); }
/* occupancy coordinates (X, Y, Z): X = position 1 ([2]), Y = position 3 ([5]), Z = position 2 ([3], apex) */
const MODES55 = [['0', [0, 0, 0], 'n'], ['[2]', [1, 0, 0], 'c'], ['[3]', [0, 0, 1], 'g'], ['[5]', [0, 1, 0], 'o'], ['[25]', [1, 1, 0], 'm']];
const PEDGE55 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
function pyr55(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES55.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE55.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.8, 1.8));
  if (opt.labels !== false) MODES55.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(m[0], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -20 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return W3;
}
function tree55(x, y, t, sp, a, depth = 0) {
  if (typeof t === 'string') { dot(x, y, 10, t === 'a' ? 'c' : 'o', a); lbl(t === 'a' ? 'α' : 'β', x, y + 32, t === 'a' ? C.cyan : C.gold, a, 22); return; }
  const lx = x - sp, rx = x + sp, ny = y + 70;
  line(x, y, lx, ny, C.dim, a, 1.8); line(x, y, rx, ny, C.dim, a, 1.8); dot(x, y, 6, 'w', a);
  tree55(lx, ny, t[0], sp * 0.55, a, depth + 1); tree55(rx, ny, t[1], sp * 0.55, a, depth + 1);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  const W3 = pyr55(600, 470, 300, 0.6 + t * 0.2, s0, { fillBase: true });
  if (W3) { const k = 0.5 + 0.5 * Math.sin(t * 1.3), p = W3([0.5, 0.5, 0]); dot(p[0], p[1], 14 + 4 * k, 'm', Q(S, 1, 'one coordinate called kappa', 0.6)); lbl('κ ?', p[0] + 26, p[1] - 14, C.mag, Q(S, 1, 'one coordinate called kappa', 0.6), 26, 'left'); }
  [['a sum', 'only a sum', C.gold], ['a mean', 'a mean', C.cyan], ['one window', 'a single window', C.green]].forEach(([s, ph, col], i) => chip(1400, 330 + i * 90, 360, 60, s, col, Q(S, 0, ph), 24));
  [['3 quotients', 'Three quotients', C.white], ['3 hidden loops', 'three hidden loops', C.orange], ['1 coordinate κ', 'one coordinate', C.mag]].forEach(([s, ph, col], i) => chip(1400, 640 + i * 80, 420, 56, s, col, Q(S, 1, ph), 22));
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const W3 = pyr55(W / 2, 400, 260, 0.5 + t * 0.25, rp, { fillBase: true, lab: 0.6 });
  if (W3) { const a0 = W3([0.25, 0.25, 0]), a1 = W3([0.75, 0.75, 0]); line(a0[0], a0[1], a1[0], a1[1], C.mag, rp * (0.6 + 0.4 * Math.sin(t * 3)), 4); }
  txt(scramble('AURIC FIB ATOM PYRAMID XXVI', rp, 452), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXVI · 关 系 商 与 递 归 恢 复', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 055 · AURIC_FIB_ATOM_RELATIONAL_QUOTIENTS_AND_PHYSICAL_CANDIDATES', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 INDEX ---- */
SCENES.index = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'So seven is a joint mode', 0.6);
  if (f1 > 0) {
    const rows = [['F[null]', '—', '0', '0', 'n'], ['F[1]', 'position 1', '[2]', 'F_(n−1) → 2', 'c'], ['F[2]', 'position 2', '[3]', 'F_n → 3', 'g'], ['F[3]', 'position 3', '[5]', 'F_(n+1) → 5', 'o'], ['F[1,3]', 'positions 1, 3', '[2,5]', 'L_n → 7', 'm']];
    ['index', 'positions', 'mode', 'count (n = 4)'].forEach((h, j) => lbl(h, [380, 640, 900, 1200][j], 290, C.dim, s0 * f1, 18));
    rows.forEach((r, k) => { const q = Q(S, 0, k < 2 ? 'Position one' : k === 2 ? 'position two carries three' : k === 3 ? 'position three carries five' : 'joint mode two-five', 0.5) * f1, y = 350 + k * 64, col = { n: C.dim, c: C.cyan, g: C.green, o: C.gold, m: C.mag }[r[4]]; lbl(r[0], 380, y, col, q, 24); lbl(r[1], 640, y, C.white, q, 20); lbl(r[2], 900, y, col, q, 26); lbl(r[3], 1200, y, C.white, Q(S, 0, 'In standard windows', 0.5, k * 0.15) * f1, 22); });
    eqn('L_n = F_(n−1) + F_(n+1)', 1580, 610, Q(S, 0, 'the Lucas number') * f1, C.mag, 24);
  }
  const q = Q(S, 1, 'So seven is a joint mode', 0.6, 0.3);
  if (q > 0) {
    chip(960, 300, 560, 58, '7 = joint mode, not a fifth atom', C.mag, q, 24);
    const pts = [[620, 480, '2', 'c'], [960, 480, '3', 'g'], [1300, 480, '5', 'o']];
    const cq = Q(S, 1, 'conflicts with both ends', 0.6);
    line(620, 480, 960, 480, C.red, cq, 4); line(960, 480, 1300, 480, C.red, cq, 4);
    lbl('conflict', 790, 460, C.red, cq, 18); lbl('conflict', 1130, 460, C.red, cq, 18);
    pts.forEach(([x, y, s, c]) => { dot(x, y, 22, c, q); lbl(s, x, y + 9, '#000', q, 24); });
    dashed(620, 520, 1300, 520, C.green, Q(S, 1, 'do not conflict with each other', 0.6) * 0.0, 2);
    const iq = Q(S, 1, 'five independent sets', 0.8);
    const sets = [[], ['2'], ['3'], ['5'], ['2', '5']];
    sets.forEach((st, i) => { const x = 460 + i * 250, qq = clamp(iq * 5 - i); box(x - 100, 620, 200, 90, C.cyan, qq, 2, 'rgba(0,0,0,0.5)'); [['2', -50], ['3', 0], ['5', 50]].forEach(([s, dx]) => dot(x + dx, 650, 9, st.includes(s) ? ({ 2: 'c', 3: 'g', 5: 'o' })[s] : 'n', qq)); lbl(st.length ? '{' + st.join(', ') + '}' : '∅', x, 695, C.white, qq, 20); });
    eqn('|Ind(P₃)| = 5 = F₅', 960, 800, iq, C.gold, 28);
  }
};

/* ---- 03 LOOPS ---- */
SCENES.loops = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The first loop belongs', 0.6);
  const ms = ['0', '[2]', '[3]', '[5]', '[25]'], cols = [C.dim, C.cyan, C.green, C.gold, C.mag];
  if (f1 > 0) {
    ms.forEach((m, i) => { const x = 420 + i * 270; box(x - 90, 300, 180, 80, cols[i], s0 * f1, 2, 'rgba(0,0,0,0.5)'); lbl(m, x, 350, cols[i], s0 * f1, 28); });
    const gq = Q(S, 0, 'Zero plus five equals two plus three', 0.6) * f1, g = [1, -1, -1, 1, 0], d = [1, -1, 0, -1, 1];
    g.forEach((v, i) => { if (!v) return; const x = 420 + i * 270, h = 60 * Math.sin(t * 2) * v; arrow(x, 460, x, 460 - h, v > 0 ? C.green : C.red, gq, 3); });
    lbl('g = (1, −1, −1, 1, 0)   ·   0 + 5 = 2 + 3', 960, 560, C.green, gq, 24);
    chip(960, 610, 520, 50, '(U, V) unchanged', C.green, Q(S, 0, 'composition means do not move') * f1, 22);
    const dq = Q(S, 0, 'Zero plus seven equals two plus five', 0.6) * f1;
    d.forEach((v, i) => { if (!v) return; const x = 420 + i * 270, h = 60 * Math.sin(t * 2 + 1) * v; arrow(x, 720, x, 720 - h, v > 0 ? C.mag : C.orange, dq, 3); });
    lbl('d = (1, −1, 0, −1, 1)   ·   0 + 7 = 2 + 5', 960, 800, C.mag, dq, 24);
    chip(960, 850, 520, 50, '(X, Y, Z) unchanged', C.mag, Q(S, 0, 'stay fixed') * f1, 22);
  }
  const q = Q(S, 1, 'The first loop belongs', 0.6, 0.3);
  if (q > 0) {
    [['observation', 'forgets', C.dim], ['composition (U, V)', 'generation g  +  selection d', C.green], ['occupancy (X, Y, Z)', 'selection d only', C.mag], ['full five-state law', 'nothing', C.white]].forEach(([a1, b1, col], i) => { const y = 340 + i * 100, qq = i ? Q(S, 1, ['', 'Composition forgets both', 'occupancy forgets only', 'a single number'][i], 0.5) : q; lbl(a1, 640, y, i ? C.white : C.dim, qq, i ? 26 : 18); lbl(b1, 1260, y, col, qq, i ? 26 : 18); });
    eqn('one hidden number :  κ = p₂₅', 960, 800, Q(S, 1, 'a single number'), C.mag, 34);
  }
};

/* ---- 04 PYRAMID ---- */
SCENES.pyramid = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'lean'], [2, '', 'theory']]);
  const s0 = clamp(u), f2 = Q(S, 2, 'Each point of the pyramid', 0.6);
  const W3 = pyr55(620, 520, 330, 0.55 + t * 0.15, s0, { fillBase: true });
  if (f2 < 1) {
    const a = 1 - f2;
    [['5 vertices', 'five vertices'], ['8 edges', 'eight edges'], ['5 faces', 'five faces'], ['volume 1/3', 'volume one third']].forEach(([s, ph], i) => chip(1450, 320 + i * 80, 340, 56, s, C.cyan, Q(S, 0, ph) * a, 24));
    eqn('X, Y, Z ≥ 0 ,  X + Z ≤ 1 ,  Y + Z ≤ 1', 1450, 680, Q(S, 0, 'square pyramid') * a, C.white, 20);
    const lq = Q(S, 1, 'Lean has frozen', 0.6) * a;
    if (lq > 0) { box(1110, 740, 700, 130, C.green, lq, 2, 'rgba(0,0,0,0.6)'); lbl('LEAN · PathStableSetPolytope', 1460, 785, C.green, lq, 20); lbl('convexHull_three_pyramid', 1460, 820, C.green, lq, 20); lbl('hull of 5 legal words = pyramid', 1460, 852, C.white, lq, 18); }
  }
  if (f2 > 0 && W3) {
    const X = 0.5 + 0.38 * Math.sin(t * 0.5), Y = 0.5 + 0.38 * Math.sin(t * 0.37 + 1), lo = Math.max(0, X + Y - 1), hi = Math.min(X, Y);
    const p = W3([X, Y, 0]); dot(p[0], p[1], 12, 'm', f2); lbl('(X, Y, 0)', p[0] + 20, p[1] - 16, C.mag, f2, 18, 'left');
    const bx = 1180, by = 520, bw = 560;
    line(bx, by, bx + bw, by, C.dim, f2, 2); lbl('0', bx, by + 34, C.dim, f2, 18); lbl('1', bx + bw, by + 34, C.dim, f2, 18);
    fillBox(bx + lo * bw, by - 18, (hi - lo) * bw, 36, C.mag, f2 * 0.4); rect55(bx + lo * bw, by - 18, Math.max(2, (hi - lo) * bw), 36, C.mag, f2, 2);
    lbl('κ ∈ [ ' + lo.toFixed(2) + ' , ' + hi.toFixed(2) + ' ]', bx + bw / 2, by - 40, C.mag, f2, 24);
    eqn('max(0, X + Y − r) ≤ κ ≤ min(X, Y)', bx + bw / 2, 340, Q(S, 2, 'The joint mass kappa ranges'), C.white, 22);
    eqn('width = min{ X, Y, r − X, r − Y }', bx + bw / 2, 400, Q(S, 2, 'The joint mass kappa ranges', 0.6, 0.6), C.gold, 22);
    chip(bx + bw / 2, 660, 460, 54, 'side faces : one law', C.green, Q(S, 2, 'On the side faces'), 22);
    chip(bx + bw / 2, 740, 460, 54, 'base interior : a segment', C.mag, Q(S, 2, 'inside the base'), 22);
  }
};

/* ---- 05 CERTIFICATES ---- */
SCENES.certificates = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'And it appears in the future', 0.6);
  if (f1 > 0) {
    chip(960, 300, 520, 58, 'κ = P(both ends) = E(xy)', C.mag, Q(S, 0, 'the probability that both ends') * f1, 24);
    const mq = Q(S, 0, 'hidden in the base determinant', 0.6) * f1;
    eqn('Q =', 620, 500, mq, C.white, 30); mat55([['p₀', 'p₅'], ['p₂', 'p₂₅']], 690, 430, 110, 70, mq, C.cyan, 26);
    eqn('Δ = det Q = rκ − XY', 1300, 470, Q(S, 0, 'delta equals r times kappa') * f1, C.gold, 32);
    eqn('Δ = r² · Cov(x, y | z = 0)', 1300, 560, Q(S, 0, 'covariance of the two ends') * f1, C.white, 26);
  }
  const q = Q(S, 1, 'And it appears in the future', 0.6, 0.3);
  if (q > 0) {
    const rows = [['0', '0', 'even', '5'], ['[2]', '2', 'even', '⊥'], ['[3]', '3', 'odd', '18'], ['[5]', '5', 'odd', '26'], ['[25]', '7', 'odd', '⊥']];
    ['mode', 'quantity', 'archive', 'continue [5]'].forEach((h, j) => lbl(h, 520 + j * 260, 300, C.dim, q, 18));
    rows.forEach((r, k) => { const qq = Q(S, 1, 'the native reader answers', 0.4, k * 0.3), y = 360 + k * 62, hi = k === 4; if (hi) box(380, y - 38, 1000, 56, C.mag, Q(S, 1, 'only the joint mode is rejected', 0.5), 2, 'rgba(255,61,240,0.12)'); r.forEach((v, j) => lbl(v, 520 + j * 260, y, j === 3 && v === '⊥' ? C.red : (r[2] === 'odd' && j === 2 ? C.gold : C.white), qq, 24)); });
    eqn('P(odd, rejected) = κ', 1600, 520, Q(S, 1, 'exactly kappa'), C.mag, 30);
  }
};

/* ---- 06 FUTURE ---- */
SCENES.future = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Lean has frozen the general', 0.6);
  if (f1 > 0) {
    const ms = ['0', '[2]', '[3]', '[5]', '[25]'], A = [0.5, 0, 0, 0, 0.5], B = [0, 0.5, 0, 0.5, 0];
    [[A, 420, C.cyan, 'half zero plus half two-five', 'law A'], [B, 1060, C.gold, 'half two plus half five', 'law B']].forEach(([p, x0, col, ph, nm]) => { const qq = Q(S, 0, ph, 0.6) * f1; lbl(nm, x0 + 230, 300, col, qq, 24); ms.forEach((m, i) => { const h = p[i] * 300, x = x0 + i * 100; fillBox(x, 640 - h, 70, h, col, qq * 0.35); rect55(x, 640 - h, 70, Math.max(h, 1), col, qq, 2); lbl(m, x + 35, 675, C.white, qq, 18); }); });
    chip(960, 740, 600, 56, 'same point (1/2, 1/2, 0)', C.white, Q(S, 0, 'same pyramid point') * f1, 24);
    lbl('replies : 5 or ⊥', 650, 830, C.cyan, Q(S, 0, 'one replies five', 0.6) * f1, 24);
    lbl('replies : ⊥ or 26', 1290, 830, C.gold, Q(S, 0, 'the other replies', 0.6) * f1, 24);
  }
  const q = Q(S, 1, 'Lean has frozen the general', 0.6, 0.3);
  if (q > 0) {
    box(330, 330, 1260, 330, C.green, q, 2, 'rgba(0,0,0,0.55)');
    lbl('LEAN · NativeContinuation.JointLaw.native_probability_separation', 960, 385, C.green, q, 21);
    lbl('for every n ≥ 3 and 0 < mix < 1 :', 960, 450, C.white, Q(S, 1, 'for every length', 0.5), 22);
    lbl('both laws agree on every proper joint table', 960, 510, C.white, Q(S, 1, 'agree on every proper joint table', 0.5), 22);
    lbl('reply total variation = mix', 960, 590, C.mag, Q(S, 1, 'differ in total variation', 0.5), 28);
  }
};

/* ---- 07 CLOSURE ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Middle excludes both ends', 0.6);
  const parts = [['0', []], ['[2]', [[0, 1]]], ['[3]', [[1, 2]]], ['[5]', [[0, 2]]], ['[25]', [[0, 1], [1, 2], [0, 2]]]];
  if (f1 > 0) {
    eqn('a = x ,  b = y ,  c = z + xy', 960, 300, Q(S, 0, 'add the hidden edge') * f1, C.gold, 32);
    parts.forEach(([m, E], i) => { const cx = 380 + i * 290, cy = 560, P = ringPts(cx, cy, 80, 3), qq = Q(S, 0, 'five ways to partition', 0.5, i * 0.25) * f1; E.forEach(([a, b]) => line(P[a][0], P[a][1], P[b][0], P[b][1], i === 4 ? C.mag : C.cyan, qq, 3)); P.forEach(p => dot(p[0], p[1], 11, 'w', qq)); lbl(m, cx, cy + 140, i === 4 ? C.mag : C.white, qq, 24); });
    lbl('all apart   ·   one pair joined (×3)   ·   all together', 960, 790, C.dim, Q(S, 0, 'all apart', 0.6) * f1, 20);
  }
  const q = Q(S, 1, 'Middle excludes both ends', 0.6, 0.3);
  if (q > 0) {
    chip(960, 300, 760, 56, 'middle excludes ends  ⟺  transitivity', C.gold, q, 24);
    [['0', 'I₃', '{1, 1, 1}', '3', C.white], ['[2] [3] [5]', 'one edge', '{2, 1, 0}', '2', C.cyan], ['[25]', 'J₃', '{3, 0, 0}', '1', C.mag]].forEach(([m, mm, sp_, rk, col], i) => { const qq = Q(S, 1, 'relation matrices have rank', 0.5, i * 0.35), y = 420 + i * 110; lbl(m, 520, y, col, qq, 26); lbl(mm, 840, y, C.white, qq, 24); lbl('spectrum ' + sp_, 1200, y, col, qq, 24); lbl('rank ' + rk, 1560, y, C.gold, qq, 26); });
  }
};

/* ---- 08 SPECTRAL ---- */
SCENES.spectral = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Every route back to kappa', 0.6);
  if (f1 > 0) {
    eqn('C(p) =', 520, 400, s0 * f1, C.white, 30);
    mat55([['1', 'X', 'Y'], ['X', '1', 'Z + κ'], ['Y', 'Z + κ', '1']], 620, 320, 130, 60, s0 * f1, C.cyan, 24);
    eqn('tr C(p)² = 3 + 2( X² + Y² + (Z + κ)² )', 1420, 360, Q(S, 0, 'The trace equals') * f1, C.gold, 26);
    eqn('κ = √( (M₂ − 3)/2 − X² − Y² ) − Z', 1420, 460, Q(S, 0, 'returns kappa with no division') * f1, C.mag, 28);
    chip(960, 640, 760, 58, '(X, Y, Z) + M₂  ⟹  all five probabilities', C.green, Q(S, 0, 'fix all five probabilities') * f1, 24);
  }
  const q = Q(S, 1, 'Every route back to kappa', 0.6, 0.3);
  if (q > 0) {
    lblG('κ', 960, 520, C.mag, q, 90);
    [['a joint event', 'a joint event', -1, -1], ['a determinant', 'a determinant', 1, -1], ['a continuation', 'a continuation', -1, 1], ['a moment, same source', 'a moment taken', 1, 1]].forEach(([s, ph, sx, sy]) => { const qq = Q(S, 1, ph, 0.5), x = 960 + sx * 420, y = 500 + sy * 160; chip(x, y, 420, 60, s, C.cyan, qq, 24); arrow(x - sx * 210, y, 960 + sx * 60, 500 + sy * 20, C.dim, qq, 2); });
    lbl('each needs a real reading', 960, 800, C.white, Q(S, 1, 'needs a real reading', 0.6), 22);
  }
};

/* ---- 09 QUANTITY ---- */
SCENES.quantity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Two future quantities', 0.6);
  if (f1 > 0) {
    eqn('q = 2x + 5y + 3z = 2u + 3v', 960, 360, s0 * f1, C.white, 34);
    eqn('E q = 2X + 5Y + 3Z', 960, 460, Q(S, 0, 'its mean never sees kappa') * f1, C.gold, 32);
    chip(960, 540, 420, 56, 'κ invisible', C.red, Q(S, 0, 'never sees kappa') * f1, 24);
    eqn('q = 2a + 5b + 3c − 3ab', 960, 680, Q(S, 0, 'a correction of minus three') * f1, C.cyan, 32);
  }
  const q = Q(S, 1, 'Two future quantities', 0.6, 0.3);
  if (q > 0) {
    const X0 = 380, Y0 = 760, sx = 70, sy = 14, pts = [['0', 0, 0, 'n'], ['[2]', 2, 8, 'c'], ['[3]', 3, 13, 'g'], ['[5]', 5, 21, 'o'], ['[25]', 7, 29, 'm']];
    plotAxes(X0, Y0, 8 * sx, 32 * sy, q, 'V₀', 'V₁');
    pts.forEach(([m, a, b, c], i) => { const qq = Q(S, 1, 'zero zero', 0.4, i * 0.3); dot(X0 + a * sx, Y0 - b * sy, 12, c, qq); lbl(m + ' (' + a + ', ' + b + ')', X0 + a * sx + 18, Y0 - b * sy - 12, C.white, qq, 18, 'left'); });
    eqn('M³ = [[1, 2], [2, 3]] ,  det = −1', 1400, 360, Q(S, 1, 'determinant minus one'), C.gold, 26);
    chip(1400, 480, 500, 56, 'recovers the mode', C.green, Q(S, 1, 'They recover the mode'), 22);
    chip(1400, 560, 600, 56, 'not leaf order · brackets · history', C.red, Q(S, 1, 'not the leaf order'), 20);
  }
};

/* ---- 10 HISTORIES ---- */
SCENES.histories = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'For words of length n', 0.6);
  if (f1 > 0) {
    const X0 = 330, Y0 = 760, bw = 80, a = [1, 5, 21, 89, 377], fr = [1, 5, 25, 125, 625], ly = v => Math.log10(v + 1) * 150;
    plotAxes(X0, Y0, 5 * 170, 460, s0 * f1, '', 'log count');
    a.forEach((v, i) => { const qq = Q(S, 0, 'One, five, twenty-one', 0.4, i * 0.25) * f1, x = X0 + 40 + i * 170; fillBox(x + bw, Y0 - ly(fr[i]), bw * 0.7, ly(fr[i]), C.dim, qq * 0.25); rect55(x + bw, Y0 - ly(fr[i]), bw * 0.7, ly(fr[i]), C.dim, qq, 1.5); lbl('5^' + i, x + bw * 1.35, Y0 - ly(fr[i]) - 12, C.dim, qq, 16); fillBox(x, Y0 - ly(v), bw, ly(v), C.cyan, qq * 0.35); rect55(x, Y0 - ly(v), bw, ly(v), C.cyan, qq, 2); lbl(String(v), x + bw / 2, Y0 - ly(v) - 12, C.white, qq, 22); lbl('L=' + i, x + bw / 2, Y0 + 30, C.dim, qq, 16); });
    chip(1570, 330, 400, 56, '21, not 25', C.red, Q(S, 0, 'two windows allow twenty-one') * f1, 26);
    eqn('a_(L+2) = 4 a_(L+1) + a_L', 1570, 430, Q(S, 0, 'the counts obey') * f1, C.gold, 26);
    eqn('a_L = F_(3L+2)', 1570, 500, Q(S, 0, 'the counts obey', 0.6, 0.6) * f1, C.cyan, 26);
  }
  const q = Q(S, 1, 'For words of length n', 0.6, 0.3);
  if (q > 0) {
    eqn('dim = F_(n+2)   ·   first order sees n + 1', 960, 310, q, C.white, 28);
    const rows = [[3, 5, 4, 1], [4, 8, 5, 3], [5, 13, 6, 7], [6, 21, 7, 14], [7, 34, 8, 26]];
    ['n', 'F_(n+2)', 'n + 1', 'hidden'].forEach((h, j) => lbl(h, 560 + j * 280, 400, C.dim, q, 20));
    rows.forEach((r, k) => { const qq = Q(S, 1, 'The gap is one', 0.4, k * 0.25), y = 460 + k * 62; r.forEach((v, j) => lbl(String(v), 560 + j * 280, y, j === 3 ? (k ? C.mag : C.green) : C.white, qq, 26)); });
    chip(1400, 820, 520, 54, 'n = 3 : one κ is enough', C.green, Q(S, 1, 'one kappa is enough'), 22);
  }
};

/* ---- 11 TREE ---- */
SCENES.tree = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'still open', 'open']]);
  const s0 = clamp(u);
  tree55(560, 330, [['b', 'a'], 'b'], 150, s0);
  tree55(1360, 330, ['b', ['a', 'b']], 150, Q(S, 0, 'two bracketings', 0.6));
  lbl('⟨⟨β, α⟩, β⟩', 560, 640, C.cyan, s0, 26); lbl('⟨β, ⟨α, β⟩⟩', 1360, 640, C.gold, Q(S, 0, 'two bracketings', 0.6), 26);
  chip(960, 720, 520, 56, 'same leaf word  β α β', C.white, Q(S, 0, 'the same leaf word'), 24);
  eqn('length 10 :  2²¹ = 2 097 152 bracketings', 960, 820, Q(S, 0, 'two to the twenty-first'), C.mag, 28);
  stamp('OPEN', 1640, 820, Q(S, 0, 'still open', 0.6), C.vio, 44, -0.06);
};

/* ---- 12 CANDIDATES ---- */
SCENES.candidates = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const rows = [['five local relations', 'states', 'five local relations'], ['seams', 'direction of time', 'seams as the place'], ['κ , Δ', 'hidden relations', 'kappa and delta'], ['Δ channel', 'candidate light', 'smallest extra channel']];
  rows.forEach(([a1, b1, ph], i) => { const qq = Q(S, 0, ph, 0.6), y = 340 + i * 100; chip(640, y, 460, 60, a1, C.cyan, qq, 24); arrow(890, y, 1030, y, C.dim, qq, 2.5); chip(1280, y, 460, 60, b1, C.gold, qq, 24); });
  stamp('CANDIDATE', 960, 800, Q(S, 1, 'These are candidate readings', 0.6), C.orange, 56, -0.05);
  lbl('proved here : what each quotient forgets · which readings bring it back', 960, 880, C.green, Q(S, 1, 'What is proved here', 0.6), 20);
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['LOOPS', '0+5=2+3 · 0+7=2+5', C.gold, 'Composition forgets'], ['FIBRE', 'κ on a segment', C.mag, 'kappa lives on a segment'], ['CLOSURE', 'c = z + xy', C.cyan, 'transitive closure'], ['RECOVERY', 'M₂ · future reply', C.green, 'one moment or one future']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 26); lblG(a2, x, 350, C.white, q, 20); });
    lbl('LEAN · PathStableSetPolytope.convexHull_three_pyramid · JointLaw.native_probability_separation', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 18);
    lbl('VOLUME · loops · fibre · closure algebra · spectral moment · histories   CLASSICAL · independent sets · poset polytopes', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 16);
    lbl('CANDIDATE · physical readings      RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'physical readings are candidates') * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr55(W / 2, 360, 200, 0.5 + t * 0.2, a, { fillBase: true, lab: 0 });
    txt('AURIC FIB ATOM PYRAMID XXVI', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXVI · 关系商与递归恢复 · TRURETURING FILM 055', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('What the boundary forgets.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WHAT IS FORGOTTEN', index: 'FIXED INDEX', loops: 'TWO HIDDEN LOOPS', pyramid: 'OCCUPANCY PYRAMID', certificates: 'THREE FACES OF KAPPA', future: 'SAME POINT, DIFFERENT FUTURE', closure: 'TRANSITIVE CLOSURE', spectral: 'ONE MOMENT', quantity: 'QUANTITY IS BLIND', histories: 'SEAMS AND DIMENSIONS', tree: 'BRACKETS', candidates: 'CANDIDATE READINGS', finale: 'LEDGER' });

function poster55() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const W3 = pyr55(560, 520, 360, 0.6, 1, { fillBase: true });
  const a0 = W3([0.2, 0.2, 0]), a1 = W3([0.8, 0.8, 0]); line(a0[0], a0[1], a1[0], a1[1], C.mag, 1, 5);
  txt('κ', (a0[0] + a1[0]) / 2 + 30, (a0[1] + a1[1]) / 2 - 20, { size: 56, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('0 + 7 = 2 + 5', 1370, 300, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('Δ = rκ − XY', 1370, 390, { size: 42, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('c = z + xy', 1370, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.green });
  txt('same point, other future', 1370, 570, { size: 34, fam: FG, w: 700, align: 'center', c: C.white });
  txt('FIB 原子金字塔 XXVI', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXVI', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('边 界 忘 掉 了 什 么', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 055', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster55;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
