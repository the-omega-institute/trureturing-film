/* Film 057 */

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

/* ---- film 057: joint projection, multi-window order and response fibres ---- */
const _po57 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po57.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po57.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect57(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const MODES57 = [['0', [0, 0, 0], 'n'], ['[2]', [1, 0, 0], 'c'], ['[3]', [0, 0, 1], 'g'], ['[5]', [0, 1, 0], 'o'], ['[25]', [1, 1, 0], 'm']];
const PEDGE57 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
const NM57 = ['∅', '[2]', '[3]', '[5]', '[2,5]'], COL57 = () => [C.dim, C.cyan, C.green, C.gold, C.mag];
function pyr57(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES57.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE57.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.8, 1.8));
  if (opt.labels !== false) MODES57.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(m[0], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -20 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return W3;
}
function grid57(M, x, y, cw, ch, a, colf, size = 22) { M.forEach((row, i) => row.forEach((v, j) => lbl(String(v), x + j * cw, y + i * ch, colf(i, j, v), a, size))); }
function corners57(cx, cy, s, vals, a, J, title) {
  if (a <= 0) return;
  const P = [[cx - s, cy + s], [cx + s, cy + s], [cx - s, cy - s], [cx + s, cy - s]], nm = ['∅', '[2]', '[5]', '[2,5]'], sg = ['+', '−', '−', '+'];
  strokePoly([P[0], P[1], P[3], P[2]], C.cyan, a, 2);
  P.forEach((p, i) => { dot(p[0], p[1], 10, ['n', 'c', 'o', 'm'][i], a); lbl(nm[i] + (vals ? ' : ' + vals[i] : ''), p[0], p[1] + (i < 2 ? 44 : -24), C.white, a, 20); lbl(sg[i], p[0] + (i % 2 ? 28 : -28), p[1] + 8, sg[i] === '+' ? C.green : C.red, a, 26); });
  if (J != null) lbl('J = ' + J, cx, cy + 10, J ? C.green : C.red, a, 30);
  if (title) lbl(title, cx, cy - s - 70, C.white, a, 24);
}
function bars57(p, x0, y0, bw, gap, hs, a, cols, labels = true) { p.forEach((v, i) => { const x = x0 + i * (bw + gap), h = v * hs; fillBox(x, y0 - h, bw, h, cols[i], a * 0.45); rect57(x, y0 - h, bw, Math.max(h, 1), cols[i], a, 2); if (labels) lbl(NM57[i], x + bw / 2, y0 + 32, C.white, a, 18); }); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  const W3 = pyr57(600, 480, 300, 0.6 + t * 0.2, s0, { fillBase: true });
  if (W3) { const a0 = W3([0.15, 0.15, 0]), a1 = W3([0.85, 0.85, 0]); line(a0[0], a0[1], a1[0], a1[1], C.mag, s0 * (0.6 + 0.4 * Math.sin(t * 3)), 4); const wq = Q(S, 0, 'which single observation completes', 0.6); const pz = W3([0.5, 0.5, 0.0]); dot(pz[0], pz[1], 14, 'm', wq); lblG('W', pz[0] + 24, pz[1] - 14, C.mag, wq, 30, 'left'); }
  [['one more reading', 'what one more reading buys', C.white], ['completes the pyramid', 'completes the pyramid', C.mag], ['two windows', 'what two windows hide', C.cyan], ['when a response sees κ', 'when a response can see', C.gold]].forEach(([s, ph, col], i) => chip(1460, 320 + i * 84, 480, 60, s, col, Q(S, 0, ph), 24));
  [['1', 'extra mean', 'One extra mean', C.mag], ['12', 'hidden cycles', 'twelve hidden cycles', C.cyan], ['1', 'four-corner number', 'one four-corner number', C.gold]].forEach(([n, s, ph, col], i) => { const q = Q(S, 1, ph, 0.6), x = 520 + i * 440; lblG(n, x, 830, col, q, 64); lbl(s, x, 875, C.white, q, 20); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const W3 = pyr57(W / 2, 400, 260, 0.5 + t * 0.25, rp, { fillBase: true, lab: 0.6 });
  if (W3) { const a0 = W3([0.25, 0.25, 0]), a1 = W3([0.75, 0.75, 0]); line(a0[0], a0[1], a1[0], a1[1], C.mag, rp * (0.6 + 0.4 * Math.sin(t * 3)), 4); }
  for (let g = 0; g < 2; g++) for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const bad = (i === 1 || i === 4) && (j === 3 || j === 4), x = (g ? 1440 : 360) + j * 26, y = 320 + i * 26; fillBox(x, y, 22, 22, bad ? C.red : C.cyan, rp * (bad ? 0.5 : 0.25)); }
  txt(scramble('AURIC FIB ATOM PYRAMID XXVIII', rp, 457), W / 2, 760, { size: 74, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXVIII · 联 合 投 影 、 多 窗 口 次 序 与 响 应 纤 维', W / 2, 835, { size: 38, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 057 · AURIC_FIB_ATOM_JOINT_PROJECTION_MULTIWINDOW_ORDER_AND_RESPONSE_FIBERS', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 COMPLETION ---- */
SCENES.completion = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Now X, Y, Z and W fix', 0.6);
  if (f1 > 0) {
    const W3 = pyr57(620, 540, 320, 0.55 + t * 0.15, s0 * f1, { fillBase: true });
    if (W3) { const k = 0.5 + 0.3 * Math.sin(t * 0.9), p = W3([0.5, 0.5, 0]); dot(p[0], p[1], 13, 'm', s0 * f1); lbl('(X, Y, Z) fixed', p[0] + 22, p[1] - 18, C.white, s0 * f1, 18, 'left'); }
    const bx = 1180, bw = 520, by = 420, k = 0.5 + 0.45 * Math.sin(t * 0.9);
    line(bx, by, bx + bw, by, C.dim, s0 * f1, 2); rect57(bx, by - 16, bw, 32, C.mag, s0 * f1, 2); dot(bx + k * bw, by, 11, 'm', s0 * f1);
    lbl('κ-segment', bx + bw / 2, by - 34, C.mag, s0 * f1, 20);
    lbl('d = (1, −1, 0, −1, 1)', bx + bw / 2, by + 56, C.white, Q(S, 0, 'along the direction', 0.6) * f1, 22);
    eqn('W = E[ z + xy ] = Z + κ', bx + bw / 2, 600, Q(S, 0, 'Add one more mean') * f1, C.mag, 30);
    lbl('W pins the point on the segment', bx + bw / 2, 660, C.dim, Q(S, 0, 'which equals Z plus kappa') * f1, 20);
  }
  const q = Q(S, 1, 'Now X, Y, Z and W fix', 0.6, 0.3);
  if (q > 0) {
    const Mx = [[1, 1, 1, 1, 1], [0, 1, 0, 0, 1], [0, 0, 0, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 1]];
    NM57.forEach((h, j) => lbl(h, 420 + j * 90, 320, C.dim, q, 18)); ['1', 'X', 'Y', 'Z', 'W'].forEach((h, i) => lbl(h, 340, 370 + i * 54, i === 4 ? C.mag : C.white, q, 22));
    grid57(Mx, 420, 370, 90, 54, q, (i, j, v) => v ? (i === 4 ? C.mag : C.cyan) : C.dim, 24);
    chip(600, 660, 300, 56, 'det = −1', C.gold, Q(S, 1, 'determinant minus one'), 26);
    [['p₁₃ = W − Z', C.mag], ['p₂ = Z', C.green], ['p₁ = X − W + Z', C.cyan], ['p₃ = Y − W + Z', C.gold], ['p∅ = 1 − X − Y − 2Z + W', C.dim]].forEach(([s, col], i) => lbl(s, 1100, 360 + i * 50, col, Q(S, 1, 'kappa is W minus Z', 0.5, i * 0.15), 24, 'left'));
    const eq = Q(S, 1, 'has its own blind direction', 0.6);
    lbl('ker(X, Y, Z) = span (1, −1, 0, −1, 1)', 1300, 660, C.white, eq, 20);
    lbl('ker(X, Y, W) = span (2, −1, −1, −1, 1)', 1300, 700, C.white, eq, 20);
    chip(1300, 770, 520, 56, 'two blind directions meet only at 0', C.green, Q(S, 1, 'meet only at zero'), 22);
  }
};

/* ---- 03 COUNTS ---- */
SCENES.counts = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u);
  const Mi = [[1, -1, -1, -2, 1], [0, 1, 0, 1, -1], [0, 0, 0, 1, 0], [0, 0, 1, 1, -1], [0, 0, 0, -1, 1]];
  lbl('T⁻¹', 190, 470, C.white, s0, 30);
  ['1', 'X', 'Y', 'Z', 'W'].forEach((h, j) => lbl(h, 380 + j * 80, 320, C.dim, s0, 18));
  NM57.forEach((h, i) => lbl(h, 330, 370 + i * 54, C.dim, s0, 18, 'right'));
  grid57(Mi.map(r => r.map(v => v < 0 ? '−' + (-v) : String(v))), 380, 370, 80, 54, s0, (i, j, v) => v === '0' ? C.dim : C.cyan, 24);
  chip(540, 680, 420, 56, 'integer inverse · unimodular', C.green, Q(S, 0, 'only integer entries'), 22);
  const eq = Q(S, 0, 'an error delta in W', 0.6);
  if (eq > 0) {
    const dl = 0.06 * Math.sin(t * 1.2), base = [0.3, 0.2, 0.15, 0.2, 0.15], d = [1, -1, 0, -1, 1], p = base.map((v, i) => v + dl * d[i]);
    bars57(p, 1060, 700, 90, 40, 900, eq, COL57());
    d.forEach((v, i) => lbl(v > 0 ? '+δ' : v < 0 ? '−δ' : '0', 1060 + i * 130 + 45, 780, v ? C.mag : C.dim, eq, 20));
    eqn('W → W + δ   ⟹   p → p + δ·d', 1380, 330, eq, C.white, 26);
    eqn('TV = 2|δ| = ' + (2 * Math.abs(dl)).toFixed(3), 1380, 390, Q(S, 0, 'total variation two delta'), C.gold, 26);
  }
};

/* ---- 04 BLIND ---- */
SCENES.blind = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The volume proves more', 0.6);
  if (f1 > 0) {
    eqn('J = f∅ + f₁₃ − f₁ − f₃', 960, 310, Q(S, 0, 'four-corner contrast J') * f1, C.mag, 30);
    corners57(560, 600, 140, [0, 2, 5, 7], Q(S, 0, 'The quantity zero, two', 0.6) * f1, 0, 'q = (0, 2, 3, 5, 7)');
    corners57(1360, 600, 140, [0, 0, 0, 1], Q(S, 0, 'the closure indicator', 0.6) * f1, 1, 'χ = z + xy');
    chip(560, 860, 260, 54, 'blind', C.red, Q(S, 0, 'has J equal to zero') * f1, 24); chip(1360, 860, 300, 54, 'sees κ', C.green, Q(S, 0, 'has J equal to one') * f1, 24);
  }
  const q = Q(S, 1, 'The volume proves more', 0.6, 0.3);
  if (q > 0) {
    eqn('q(∅) = 0 ,   q([2,5]) = q([2]) + q([5])   ⟹   J_q = 0', 960, 320, q, C.white, 26);
    const k = Math.floor(t / 1.1), a1 = ((k * 7) % 11) + 1, a3 = ((k * 5) % 9) + 2;
    corners57(960, 610, 150, [0, a1, a3, a1 + a3], Q(S, 1, 'any additive quantity', 0.6), 0, 'additive q : [2] → ' + a1 + ' , [5] → ' + a3);
    chip(960, 870, 520, 58, 'adding never sees κ', C.red, Q(S, 1, 'Adding things up never sees kappa'), 26);
  }
};

/* ---- 05 ODDS ---- */
SCENES.odds = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), j1 = Q(S, 1, 'Only a joint factor', 0.6);
  const mu = Q(S, 0, 'Multiply each mode', 0.6), uu = Math.exp(0.6 * Math.sin(t * 0.9) * mu), vv = Math.exp(0.5 * Math.sin(t * 1.3 + 1) * mu), eta = Math.exp(0.8 * Math.sin(t * 1.1) * j1);
  const w = { n: 0.3, 1: 0.2 * uu, 3: 0.15 * vv, 13: 0.12 * uu * vv * eta };
  const cells = [['∅', w.n, 0, 0, C.dim], ['[5]', w[3], 0, 1, C.gold], ['[2]', w[1], 1, 0, C.cyan], ['[2,5]', w[13], 1, 1, C.mag]], gx = 560, gy = 520, cs = 220;
  lbl('y = 0', gx - cs / 2, gy - cs - 30, C.dim, s0, 20); lbl('y = 1', gx + cs / 2, gy - cs - 30, C.dim, s0, 20);
  lbl('x = 0', gx - cs - 20, gy - cs / 2 + 6, C.dim, s0, 20, 'right'); lbl('x = 1', gx - cs - 20, gy + cs / 2 + 6, C.dim, s0, 20, 'right');
  cells.forEach(([nm, v, i, j, col]) => { const cx = gx + (j - 0.5) * cs, cy = gy + (i - 0.5) * cs, sd = Math.min(200, 330 * Math.sqrt(v)); rect57(cx - cs / 2, cy - cs / 2, cs, cs, C.dim, s0 * 0.6, 1.2); fillBox(cx - sd / 2, cy - sd / 2, sd, sd, col, s0 * (nm === '[2,5]' && j1 > 0 ? 0.6 : 0.35)); lbl(nm, cx, cy + 8, C.white, s0, 22); });
  const Om = w.n * w[13] / (w[1] * w[3]);
  eqn('weight × λ · u^x · v^y · t^z', 1420, 330, mu, C.white, 26);
  lbl('u = ' + uu.toFixed(2) + '    v = ' + vv.toFixed(2), 1420, 390, C.cyan, mu, 22);
  eqn('C(w) → λ² u v · C(w)', 1420, 460, Q(S, 0, 'multiplied by lambda squared'), C.gold, 26);
  eqn('Ω = w∅ w₁₃ / (w₁ w₃) = ' + Om.toFixed(3), 1420, 540, Q(S, 0, 'the odds ratio stays'), j1 > 0 ? C.mag : C.green, 26);
  if (j1 > 0) { eqn('× η^(xy) :  η = ' + eta.toFixed(2) + '   ⟹   Ω′ = η Ω', 1420, 630, j1, C.mag, 24); chip(1420, 720, 620, 58, 'main effects cannot create interaction', C.green, Q(S, 1, 'Main effects cannot create'), 22); }
};

/* ---- 06 SAME ---- */
SCENES.same = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Both see the coarse record', 0.6);
  const pm = [0.1, 0.3, 0.2, 0.3, 0.1], pp = [0.3, 0.1, 0.2, 0.1, 0.3];
  if (f1 > 0) {
    [[pm, 360, 'p⁻', 'one tenth, three tenths', 'κ = 0.1'], [pp, 1080, 'p⁺', 'against three tenths', 'κ = 0.3']].forEach(([p, x0, nm, ph, kk]) => { const q = Q(S, 0, ph, 0.6) * f1; lbl(nm, x0 + 240, 330, C.white, q, 28); bars57(p, x0, 680, 80, 26, 900, q, COL57()); lbl(kk, x0 + 4 * 106 + 40, 680 - p[4] * 900 - 22, C.mag, Q(S, 0, 'but kappa is', 0.5) * f1, 22); });
    chip(960, 820, 620, 58, 'X = Y = 0.4 ,  Z = 0.2  for both', C.white, Q(S, 0, 'Both have X and Y equal') * f1, 24);
  }
  const q = Q(S, 1, 'Both see the coarse record', 0.6, 0.3);
  if (q > 0) {
    chip(960, 320, 560, 58, 'P(A) = 0.6 ,  A = {[3], [5], [2,5]}', C.white, q, 22);
    const bx = 520, bw = 900, rows = [['p⁻', 1 / 6, '1/6', C.cyan, 'one sixth'], ['p⁺', 1 / 2, '1/2', C.mag, 'one half']];
    lbl('Pr( reject | A )  after continuing with [5]', bx + bw / 2, 420, C.dim, Q(S, 1, 'Continue with a five'), 20);
    rows.forEach(([nm, v, s, col, ph], i) => { const y = 490 + i * 100, qq = Q(S, 1, ph, 0.6); lbl(nm, bx - 30, y + 8, C.white, qq, 26, 'right'); fillBox(bx, y - 28, bw * v, 56, col, qq * 0.45); rect57(bx, y - 28, bw * v, 56, col, qq, 2); lbl(s, bx + bw * v + 20, y + 8, col, qq, 26, 'left'); });
    const kq = Q(S, 1, 'The independence guess', 0.6), xs = bx + bw / 3;
    dashed(xs, 440, xs, 660, C.gold, kq, 2.5); lbl('κ* = XY / r = 0.2  →  1/3', xs, 700, C.gold, kq, 24);
    chip(960, 800, 600, 56, 'same means, different futures', C.green, Q(S, 1, 'predicts one third for both'), 24);
  }
};

/* ---- 07 WINDOWS ---- */
SCENES.windows = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const s0 = clamp(u), gx = 520, gy = 330, cs = 92, R1 = [1, 4], C1 = [3, 4];
  const bad = (i, j) => R1.includes(i) && C1.includes(j);
  lbl('second window →', gx + 2 * cs + cs / 2, gy - 52, C.dim, s0, 18); lbl('first ↓', gx - 70, gy - 52, C.dim, s0, 18);
  NM57.forEach((h, j) => lbl(h, gx + j * cs + cs / 2, gy - 14, C1.includes(j) ? C.gold : C.white, s0, 18));
  NM57.forEach((h, i) => lbl(h, gx - 18, gy + i * cs + cs / 2 + 6, R1.includes(i) ? C.cyan : C.white, s0, 18, 'right'));
  const bq = Q(S, 0, 'The seam guard forbids', 0.6), cyc = Q(S, 1, 'Fix both window laws', 0.6);
  const pairs = []; for (let i = 1; i < 5; i++) for (let j = 1; j < 5; j++) if (!bad(i, j)) pairs.push([i, j]);
  const k = Math.floor(t / 0.8) % 12, [ci, cj] = pairs[k];
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
    const x = gx + j * cs, y = gy + i * cs, b = bad(i, j);
    fillBox(x + 3, y + 3, cs - 6, cs - 6, b ? C.red : C.cyan, s0 * (b ? 0.3 * bq + 0.12 : 0.14));
    rect57(x + 3, y + 3, cs - 6, cs - 6, b ? C.red : C.cyan, s0 * (b ? 0.4 + 0.6 * bq : 0.5), 1.5);
    if (b && bq > 0) { line(x + 16, y + 16, x + cs - 16, y + cs - 16, C.red, bq, 3); line(x + cs - 16, y + 16, x + 16, y + cs - 16, C.red, bq, 3); }
    if (cyc > 0) { const sg = (i === ci && j === cj) || (i === 0 && j === 0) ? '+' : (i === ci && j === 0) || (i === 0 && j === cj) ? '−' : ''; if (sg) { fillBox(x + 3, y + 3, cs - 6, cs - 6, sg === '+' ? C.green : C.mag, cyc * 0.55); lbl(sg, x + cs / 2, y + cs / 2 + 12, '#fff', cyc, 36); } }
  }
  eqn('25 − 4 = 21 legal cells', 1450, 340, Q(S, 0, 'leaves twenty-one legal cells'), C.white, 28);
  lbl('a = P(first window low end)', 1450, 420, C.cyan, Q(S, 0, 'With a the chance'), 20); lbl('b = P(second window high end)', 1450, 456, C.gold, Q(S, 0, 'b the chance'), 20);
  chip(1450, 530, 420, 60, 'joint law exists  ⟺  a + b ≤ 1', C.green, Q(S, 0, 'a joint law exists exactly'), 22);
  if (cyc > 0) {
    eqn('D_ij = E_ij + E_∅∅ − E_i∅ − E_∅j', 1450, 650, cyc, C.white, 24);
    lbl('rank 9  ·  21 − 9 = 12 cycles', 1450, 710, C.gold, Q(S, 1, 'twelve free directions'), 24);
    lbl('cycle ' + (k + 1) + ' / 12', 1450, 760, C.mag, cyc, 24);
    chip(1450, 840, 560, 58, 'the seam is a 12-dimensional space', C.mag, Q(S, 1, 'The seam is not one bit'), 22);
  }
};

/* ---- 08 PHASE ---- */
SCENES.phase = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'published']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Five probabilities cannot recover', 0.6);
  const p = { n: 0.4, 1: 0.2, 3: 0.2, 13: 0.1 }, th = [0.6 * Math.sin(t * 0.7), 0.9 * Math.sin(t * 0.5 + 1), 0.7 * Math.sin(t * 0.6 + 2), 0.8 * Math.sin(t * 0.4 + 3)];
  if (f1 > 0) {
    const cells = [['∅', p.n, th[0], 0, 0], ['[5]', p[3], th[3], 0, 1], ['[2]', p[1], th[1], 1, 0], ['[2,5]', p[13], th[2], 1, 1]], gx = 560, gy = 560, cs = 200;
    lbl('A = (1/√r) ·', gx - cs - 40, gy + 8, C.white, s0 * f1, 24, 'right');
    cells.forEach(([nm, pv, a, i, j]) => { const cx = gx + (j - 0.5) * cs, cy = gy + (i - 0.5) * cs, R = 80 * Math.sqrt(pv / 0.4); rect57(cx - cs / 2, cy - cs / 2, cs, cs, C.dim, s0 * f1 * 0.6, 1.2); ring(cx, cy, R, C.cyan, s0 * f1 * 0.5, 1.5); arrow(cx, cy, cx + R * Math.cos(a), cy - R * Math.sin(a), C.gold, s0 * f1, 3); lbl(nm, cx, cy + cs / 2 - 14, C.white, s0 * f1, 18); });
    const Phi = th[0] + th[2] - th[1] - th[3];
    eqn('Φ = θ∅ + θ₁₃ − θ₁ − θ₃ = ' + Phi.toFixed(2), 1380, 340, Q(S, 0, 'the phase Phi', 0.6) * f1, C.mag, 26);
    lbl('r²|det A|² = ( √(p∅p₁₃) − √(p₁p₃) )²', 1380, 470, C.white, Q(S, 0, 'splits into a classical part', 0.6) * f1, 22);
    lbl('+ 4 √(p∅p₁p₃p₁₃) · sin²(Φ/2)', 1380, 520, C.gold, Q(S, 0, 'plus a term in sine squared', 0.6) * f1, 22);
    lbl('classical part = 0  when  Δ = 0', 1380, 600, C.dim, Q(S, 0, 'which vanishes when delta is zero', 0.6) * f1, 20);
  }
  const q = Q(S, 1, 'Five probabilities cannot recover', 0.6, 0.3);
  if (q > 0) {
    const bx = 360, bw = 760, by = 720, sc = 1100, r = 0.9, Phi = Math.PI * Math.sin(t * 0.45), f = ph => 0.16 * Math.sin(ph / 2) ** 2 / (r * r);
    lbl('law (0.4, 0.2, 0.1, 0.2, 0.1) : Δ = 0', bx + bw / 2, 320, C.white, q, 22);
    line(bx, by, bx + bw, by, C.dim, q, 1.5); lbl('−π', bx, by + 30, C.dim, q, 18); lbl('0', bx + bw / 2, by + 30, C.dim, q, 18); lbl('π', bx + bw, by + 30, C.dim, q, 18); lbl('Φ', bx + bw + 30, by + 6, C.mag, q, 22, 'left');
    curve(z => { const ph = -Math.PI + 2 * Math.PI * z; return [bx + bw * z, by - f(ph) * sc]; }, 80, C.gold, q, 3);
    const mx = bx + bw * (Phi + Math.PI) / (2 * Math.PI), cc = 2 * Math.sqrt(f(Phi)); dot(mx, by - f(Phi) * sc, 10, 'm', q);
    lbl('|det A|²  ∝  sin²(Φ/2)', bx, by - 270, C.gold, q, 20, 'left');
    lbl('concurrence 2|det A| = ' + cc.toFixed(3), bx + bw / 2, 400, C.mag, Q(S, 1, "Wootters' concurrence"), 24);
    chip(1500, 420, 520, 58, 'five probabilities : Φ invisible', C.red, Q(S, 1, 'cannot recover Phi'), 22);
    chip(1500, 510, 520, 58, 'needs interference or a phase reference', C.cyan, Q(S, 1, 'that needs interference'), 20);
    chip(1500, 600, 520, 58, 'Wootters 1998 : C = 2|det A|', C.gold, Q(S, 1, "Wootters' concurrence"), 22);
    chip(1500, 690, 520, 58, 'Δ = 0  ≠  no entanglement', C.mag, Q(S, 1, 'still not the same'), 22);
  }
};

/* ---- 09 RESPONSE ---- */
SCENES.response = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'So on a segment of positive width', 0.6);
  const L = [[0.2, 0.3, 0.3, 0.2], [0.3, 0.4, 0.2, 0.1], [0.25, 0.25, 0.25, 0.25], [0.2, 0.3, 0.4, 0.1], [0.1, 0.3, 0.2, 0.4]], cols = COL57();
  const JL = [0, 1, 2, 3].map(e => L[0][e] + L[4][e] - L[1][e] - L[3][e]);
  if (f1 > 0) {
    NM57.forEach((nm, m) => { const x0 = 300 + m * 230, q = Q(S, 0, 'Give every mode a response vector', 0.5, m * 0.2) * f1; lbl(nm, x0 + 70, 470, cols[m], q, 22); L[m].forEach((v, e) => { const h = v * 300, x = x0 + e * 36; fillBox(x, 640 - h, 28, h, cols[m], q * 0.45); rect57(x, 640 - h, 28, Math.max(h, 1), cols[m], q, 1.5); }); lbl('L_' + nm, x0 + 70, 680, C.white, q, 18); });
    const jq = Q(S, 0, 'through the vector J L', 0.6) * f1;
    lbl('J_L = L∅ + L₁₃ − L₁ − L₃ = (' + JL.map(v => v.toFixed(1)).join(', ') + ')', 960, 760, C.mag, jq, 24);
    chip(700, 850, 420, 54, 'J_L ≠ 0 : kernel 0', C.green, Q(S, 0, 'dimension zero when') * f1, 22); chip(1220, 850, 420, 54, 'J_L = 0 : kernel 1', C.red, Q(S, 0, 'one when it vanishes') * f1, 22);
  }
  const q = Q(S, 1, 'So on a segment of positive width', 0.6, 0.3);
  if (q > 0) {
    const X = 0.4, Y = 0.35, Z = 0.15, k = 0.175 + 0.16 * Math.sin(t * 0.9), p = [1 - X - Y - Z + k, X - k, Z, Y - k, k];
    const Lb = [0, 1, 2, 3].map(e => p.reduce((s, pv, m) => s + pv * L[m][e], 0));
    const L0 = L.map(r => r.slice()); L0[4] = [0, 1, 2, 3].map(e => L[1][e] + L[3][e] - L[0][e]);
    const Lz = [0, 1, 2, 3].map(e => p.reduce((s, pv, m) => s + pv * L0[m][e], 0));
    [[Lb, 380, 'J_L ≠ 0 : future moves with κ', C.green], [Lz, 1100, 'J_L = 0 : future frozen', C.red]].forEach(([v, x0, s, col]) => { lbl(s, x0 + 200, 340, col, q, 22); v.forEach((vv, e) => { const h = vv * 900, x = x0 + e * 110; fillBox(x, 650 - h, 80, h, col, q * 0.4); rect57(x, 650 - h, 80, Math.max(h, 1), col, q, 2); lbl('E' + (e + 1), x + 40, 685, C.dim, q, 18); }); });
    lbl('κ = ' + k.toFixed(3), 960, 740, C.mag, q, 26);
    chip(960, 840, 640, 56, 'counts recovered  ≠  κ recovered', C.gold, Q(S, 1, 'Recovering the read counts'), 22);
  }
};

/* ---- 10 DEPTH ---- */
SCENES.depth = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'lean'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Couple modes to depth', 0.6);
  const Fb = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55], r = k => Fb[k + 1] / Fb[k + 3], s = k => Fb[k + 2] / Fb[k + 3];
  if (f1 > 0) {
    const w = [1, 2, 3, 4, 5, 6].map(k => Math.pow(r(k), 5) * Math.pow(s(k), 3)), tot = w.reduce((a, b) => a + b, 0), post = w.map(v => v / tot);
    const m = 0.5 - 0.5 * Math.cos(Math.min(1, Math.max(0, (u - 1.5) / 3)) * Math.PI), bx = 420;
    lbl('prior  →  posterior after (A, B) = (5, 3)', bx + 300, 330, C.white, s0 * f1, 22);
    for (let k = 0; k < 6; k++) { const v = (1 / 6) * (1 - m) + post[k] * m, h = v * 900, x = bx + k * 100; fillBox(x, 690 - h, 70, h, C.cyan, s0 * f1 * 0.45); rect57(x, 690 - h, 70, Math.max(h, 1), C.cyan, s0 * f1, 2); lbl('k=' + (k + 1), x + 35, 725, C.dim, s0 * f1, 18); }
    const lq = Q(S, 0, 'Lean has frozen', 0.6) * f1;
    if (lq > 0) { box(1120, 400, 700, 220, C.green, lq, 2, 'rgba(0,0,0,0.6)'); lbl('LEAN · NativeConditionalControl', 1470, 445, C.green, lq, 20); lbl('sameK_conditional_tail', 1470, 485, C.green, lq, 20); lbl('condition on a native history', 1470, 535, C.white, Q(S, 0, 'conditioning on a native history', 0.5) * f1, 20); lbl('= same model, prior μ → posterior', 1470, 575, C.mag, Q(S, 0, 'replaced by its posterior', 0.5) * f1, 20); }
  }
  const q = Q(S, 1, 'Couple modes to depth', 0.6, 0.3);
  if (q > 0) {
    eqn('Ξ = (r_i / r_j)^(A_I − A_J) · (s_i / s_j)^(B_I − B_J)', 960, 330, q, C.white, 26);
    const gx = 620, gy = 560, cs = 190;
    [['π(I, i)', 0, 0, C.green], ['π(I, j)', 0, 1, C.red], ['π(J, i)', 1, 0, C.red], ['π(J, j)', 1, 1, C.green]].forEach(([s_, i, j, col]) => { const cx = gx + (j - 0.5) * cs, cy = gy + (i - 0.5) * cs; rect57(cx - cs / 2 + 4, cy - cs / 2 + 4, cs - 8, cs - 8, col, q, 2); lbl(s_, cx, cy + 8, col, q, 22); });
    lbl('depth i', gx - cs / 2, gy - cs - 18, C.dim, q, 18); lbl('depth j', gx + cs / 2, gy - cs - 18, C.dim, q, 18);
    lbl('mode I', gx - cs - 20, gy - cs / 2 + 6, C.dim, q, 18, 'right'); lbl('mode J', gx - cs - 20, gy + cs / 2 + 6, C.dim, q, 18, 'right');
    lbl('Ξ = (green × green) / (red × red)', gx, gy + cs + 50, C.dim, q, 18);
    const ex = Q(S, 1, 'By the integer kernel', 0.6);
    lbl('(i, j) = (1, 2) ,  ΔA = 2 ,  ΔB = −1', 1420, 470, C.white, ex, 22);
    lbl('Ξ = (5/6)² · (10/9)⁻¹ = 5/8', 1420, 520, C.gold, ex, 26);
    lbl('ΔA = ΔB = 0  ⟹  Ξ = 1', 1420, 590, C.green, ex, 24);
    chip(1420, 690, 560, 58, 'Ξ ≡ 1  ⟺  equal read counts', C.green, Q(S, 1, 'exactly when all modes carry'), 22);
    chip(1420, 780, 560, 58, 'otherwise mode and depth are tied', C.mag, Q(S, 1, 'otherwise mode and depth'), 22);
  }
};

/* ---- 11 SUFFICIENCY ---- */
SCENES.sufficiency = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'open']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The volume closes', 0.6);
  if (f1 > 0) {
    [['static law', '(P, W)', C.green, 'P and W recover'], ['read counts', 'future law', C.cyan, 'the future recovers'], ['history · ancestry', 'neither', C.red, 'neither recovers']].forEach(([a1, b1, col, ph], i) => { const x = 440 + i * 520, q = Q(S, 0, ph, 0.6) * f1; chip(x, 420, 400, 70, a1, col, q, 26); arrow(x, 600, x, 470, col, q, 3); chip(x, 640, 300, 60, b1, C.white, q, 24); });
    lbl('three sufficiencies', 960, 320, C.dim, s0 * f1, 22);
  }
  const q = Q(S, 1, 'The volume closes', 0.6, 0.3);
  if (q > 0) {
    for (let i = 0; i < 6; i++) { const y = 800 - i * 85, qq = Q(S, 1, 'a conjectured chain of readouts', 0.4, i * 0.2); line(420, y, 820, y, C.vio, qq, 3); lbl('O' + '₀₁₂₃₄₅'[i], 620, y - 12, C.white, qq, 24); }
    line(420, 375, 420, 800, C.vio, q, 2); line(820, 375, 820, 800, C.vio, q, 2);
    lbl('each level lists what it can still miss', 620, 318, C.dim, Q(S, 1, 'each level listing', 0.6), 18);
    stamp('CONJECTURE', 620, 880, Q(S, 1, 'each level listing', 0.6, 0.6), C.vio, 44, -0.05);
    [['clocks', 'clocks'], ['decay', 'decay'], ['light', 'and light']].forEach(([s_, ph], i) => chip(1400, 420 + i * 90, 360, 60, s_, C.gold, Q(S, 1, ph, 0.5), 26));
    stamp('CANDIDATE', 1400, 720, Q(S, 1, 'candidate bridges', 0.6), C.orange, 48, -0.05);
    lbl('checked here : the finite algebra', 1400, 830, C.green, Q(S, 1, 'what is checked here'), 22);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['COMPLETION', 'W = Z + κ', C.mag, 'One closure mean'], ['BLIND', 'additive · main effects', C.red, 'additive quantities'], ['WINDOWS', '21 cells · 12 cycles', C.cyan, 'two windows hide'], ['RESPONSE', 'J_L ≠ 0  ⟺  κ', C.green, 'every response sees']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 26); lblG(a2, x, 350, C.white, q, 20); });
    lbl('LEAN · NativeConditionalControl.sameK_conditional_tail', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 19);
    lbl('VOLUME · completion · blindness · window cycles · response rule · cross-ratio   CLASSICAL · odds ratios · transportation polytopes', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 15);
    lbl('PUBLISHED · Wootters concurrence      OPEN · bridges      RECOMPUTED · every number', W / 2, 640, C.white, Q(S, 1, 'the bridges are open') * fade, 19);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    const W3 = pyr57(W / 2, 360, 200, 0.5 + t * 0.2, a, { fillBase: true, lab: 0 });
    if (W3) { const a0 = W3([0.2, 0.2, 0]), a1 = W3([0.8, 0.8, 0]); line(a0[0], a0[1], a1[0], a1[1], C.mag, a, 4); }
    txt('AURIC FIB ATOM PYRAMID XXVIII', W / 2, 680, { size: 68, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXVIII · 联合投影、多窗口次序与响应纤维 · TRURETURING FILM 057', W / 2, 750, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One more reading.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'ONE MORE READING', completion: 'COMPLETING THE MEANS', counts: 'INTEGER COUNTS', blind: 'ADDITIVE IS BLIND', odds: 'NO NEW INTERACTION', same: 'SAME MEANS, OTHER FUTURE', windows: 'TWO WINDOWS', phase: 'THE COHERENT PHASE', response: 'RESPONSE FIBRES', depth: 'MODE AND DEPTH', sufficiency: 'THREE SUFFICIENCIES', finale: 'LEDGER' });

function poster57() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const W3 = pyr57(560, 520, 360, 0.6, 1, { fillBase: true });
  const a0 = W3([0.2, 0.2, 0]), a1 = W3([0.8, 0.8, 0]); line(a0[0], a0[1], a1[0], a1[1], C.mag, 1, 5);
  txt('W', (a0[0] + a1[0]) / 2 + 34, (a0[1] + a1[1]) / 2 - 20, { size: 56, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('W = Z + κ', 1370, 300, { size: 46, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('21 − 9 = 12 cycles', 1370, 390, { size: 40, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('additive ⟹ J = 0', 1370, 480, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('Δ = 0 ≠ Φ = 0', 1370, 570, { size: 40, fam: FG, w: 700, align: 'center', c: C.green });
  txt('FIB 原子金字塔 XXVIII', W / 2, 140, { size: 74, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXVIII', W / 2, 890, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('再 多 一 个 读 数', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 057', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster57;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
