/* Film 049 — single-lineage partition geometry */

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

/* ---- film 049: single-lineage partition geometry ---- */
const _po49 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po49.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po49.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }

const PHI49 = (1 + Math.sqrt(5)) / 2, G49 = 1 / PHI49;
const COL49 = { a: C.cyan, b: C.gold };
const GR49 = { a: 'α', b: 'β' };
function rho49(t) { return t === 'a' ? 'b' : t === 'b' ? ['b', 'a'] : [rho49(t[0]), rho49(t[1])]; }
function rhoN49(t, n) { for (let i = 0; i < n; i++) t = rho49(t); return t; }
function leaves49(t, s, a = 0, L = 1, addr = '') {
  if (typeof t === 'string') return [[a, a + L, t, addr]];
  return leaves49(t[0], s, a, s * L, addr + 'L').concat(leaves49(t[1], s, a + s * L, (1 - s) * L, addr + 'R'));
}
function cuts49(t, s, a = 0, L = 1, d = 0) {
  if (typeof t === 'string') return [];
  return [[a + s * L, d]].concat(cuts49(t[0], s, a, s * L, d + 1), cuts49(t[1], s, a + s * L, (1 - s) * L, d + 1));
}
function rect49(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
/* a labeled partition bar; o.colf(lab, addr, i) overrides colour, o.alpha(lab, addr, i) scales alpha per leaf */
function bar49(x, y, w, h, lv, a, o = {}) {
  if (a <= 0) return;
  lv.forEach(([l, r, lab, addr], i) => {
    const x0 = x + l * w, x1 = x + r * w, col = o.colf ? o.colf(lab, addr, i) : COL49[lab], q = a * (o.alpha ? o.alpha(lab, addr, i) : 1);
    fillBox(x0, y, x1 - x0, h, col, q * (o.fill == null ? 0.2 : o.fill));
    line(x0, y, x0, y + h, col, q, 2);
    if (o.labels !== false && x1 - x0 > (o.minLab || 26)) lblG(o.text ? o.text(lab, addr, i) : GR49[lab], (x0 + x1) / 2, y + h / 2 + 9, col, q, o.size || 24);
  });
  rect49(x, y, w, h, C.white, a * 0.6, 1.5);
}
function arc49(cx, cy, R, a0, a1, col, a, lw = 6) { const pts = []; for (let i = 0; i <= 40; i++) { const th = a0 + (a1 - a0) * i / 40; pts.push([cx + R * Math.cos(th), cy + R * Math.sin(th)]); } strokePoly(pts, col, a, lw, false); }
function h2_49(x) { return -x * Math.log2(x) - (1 - x) * Math.log2(1 - x); }
function stats49(t0, n, s) { const out = []; let t = t0; for (let k = 0; k <= n; k++) { const lv = leaves49(t, s); const p = lv.map(q => q[1] - q[0]); out.push([lv.length, -p.reduce((acc, x) => acc + x * Math.log2(x), 0)]); t = rho49(t); } return out; }
const MODE49 = [['000', '[null]', '0'], ['001', '[2]', '2'], ['010', '[3]', '3'], ['100', '[5]', '5'], ['101', '[25]', '25']];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2), n = Math.min(7, Math.floor(u / 1.7));
  const X = 360, Y = 300, Wd = 1200, Hh = 80, r = 0.43;
  bar49(X, Y, Wd, Hh, leaves49(rhoN49('b', n), G49), s0, { minLab: 30 });
  lbl('n = ' + n, X - 24, Y + Hh / 2 + 8, C.dim, s0, 20, 'right');
  const rx = X + r * Wd; line(rx, Y - 36, rx, Y + Hh + 36, C.red, s0, 3); lbl('one fixed point', rx, Y - 48, C.red, s0, 18);
  const code = []; for (let k = 0; k <= n; k++) { const L = leaves49(rhoN49('b', k), G49).find(q => q[0] <= r && r < q[1]); code.push(L[2] === 'a' ? '1' : '0'); }
  lbl('its lineage   ' + code.join(' '), W / 2, Y + Hh + 90, C.white, s0, 28);
  lbl('one leaf · one line · cut again and again', W / 2, Y + Hh + 140, C.dim, s0, 20);
  [['five modes', C.white, 'five modes', 420], ['s = 1/φ', C.gold, 'the golden ratio', 790], ['h₂(s)/(2 − s)', C.green, 'an entropy rate', 1160], ['frontier μ', C.mag, 'honest frontier', 1530]]
    .forEach(([s, col, ph, x]) => chip(x, 720, 320, 56, s, col, Q(S, 1, ph), 22));
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const n = Math.min(8, 1 + Math.floor(u / 0.8));
  bar49(360, 330, 1200, 90, leaves49(rhoN49('b', n), G49), rp, { minLab: 28 });
  txt(scramble('AURIC FIB ATOM PYRAMID XX', rp, 449), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XX · 单 支 系 分 割 几 何', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 049 · AURIC_FIB_SINGLE_LINEAGE_PARTITION_GEOMETRY', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 LINEAGE ---- */
SCENES.lineage = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [2, '', 'lean']]);
  const s0 = clamp(u);
  const X0 = 300, DX = 150, Y0 = 250, DY = 125;
  const nodes = [['r', 0, 2, 'b', null, ''], ['L', 1, 1, 'b', 'r', 'L'], ['R', 1, 3.5, 'a', 'r', 'R'],
    ['LL', 2, 0.5, 'b', 'L', 'L'], ['LR', 2, 2, 'a', 'L', 'R'], ['R.', 2, 3.5, 'b', 'R', ''],
    ['LLL', 3, 0, 'b', 'LL', 'L'], ['LLR', 3, 1, 'a', 'LL', 'R'], ['LR.', 3, 2, 'b', 'LR', ''], ['R.L', 3, 3, 'b', 'R.', 'L'], ['R.R', 3, 4, 'a', 'R.', 'R']];
  const pos = id => { const nd = nodes.find(q => q[0] === id); return [X0 + nd[2] * DX, Y0 + nd[1] * DY]; };
  const lev = [s0, Q(S, 0, 'Beta has two', 0.6), Q(S, 0, 'a right alpha', 0.6, 0.4), Q(S, 0, 'Write beta as zero', 0.6)];
  const path = ['r', 'R', 'R.', 'R.L'], hl = Q(S, 0, 'never holds two ones', 0.6);
  nodes.forEach(([id, d, x, lab, par, side]) => {
    const p = pos(id), q = lev[d];
    if (par) {
      const pp = pos(par), onp = path.includes(id) && path.includes(par);
      line(pp[0], pp[1] + 24, p[0], p[1] - 24, onp && hl > 0 ? C.red : C.dim, q, onp ? 2 + 2 * hl : 2);
      if (side) lbl(side, (pp[0] + p[0]) / 2 + (side === 'L' ? -16 : 16), (pp[1] + p[1]) / 2, C.dim, q, 18);
    }
    ring(p[0], p[1], 24, COL49[lab], q, 2.5); lblG(GR49[lab], p[0], p[1] + 9, COL49[lab], q, 26);
  });
  lbl('c = 1 0 0', pos('R.')[0] + 44, pos('R.')[1] + 8, C.red, hl, 22, 'left');
  const f0 = 1 - Q(S, 1, 'Three steps from beta', 0.6);
  chip(1400, 280, 520, 56, 'α → β   (one child)', C.cyan, Q(S, 0, 'Alpha has exactly one child') * f0, 22);
  chip(1400, 360, 520, 56, 'β → ⟨β, α⟩   (left β, right α)', C.gold, Q(S, 0, 'Beta has two') * f0, 22);
  chip(1400, 440, 520, 56, 'code:  β = 0 ,  α = 1', C.white, Q(S, 0, 'Write beta as zero') * f0, 22);
  chip(1400, 520, 520, 56, 'never two 1s in a row', C.red, Q(S, 0, 'never holds two ones') * f0, 22);
  const q1 = Q(S, 1, 'exactly five codes', 0.6);
  MODE49.forEach(([c, m, k], i) => { const qq = Q(S, 1, 'exactly five codes', 0.5, i * 0.25); lbl(c, X0 + i * DX, Y0 + 3 * DY + 66, C.white, qq, 24); lbl(m, X0 + i * DX, Y0 + 3 * DY + 104, PC[k], Q(S, 1, 'canonical modes', 0.5, i * 0.2), 22); });
  const g2 = 1 - Q(S, 2, 'Lean has frozen', 0.6);
  const qm = Q(S, 1, 'Counted by start', 0.6) * g2;
  lbl('start \\ end', 1250, 300, C.dim, qm, 18); lblG('β', 1375, 300, C.gold, qm, 26); lblG('α', 1485, 300, C.cyan, qm, 26);
  lblG('β', 1300, 362, C.gold, qm, 26); lblG('α', 1300, 432, C.cyan, qm, 26);
  mgrid(1320, 320, [['3', '2'], ['2', '1']], 110, 70, qm, { colf: () => C.white, size: 28 });
  eqn('A = N³ ,   N = [[1,1],[1,0]]', 1430, 520, Q(S, 1, 'cube of the one-step') * g2, C.green, 26);
  lbl('(A counts lineages, not whole layers)', 1430, 570, C.dim, Q(S, 1, 'cube of the one-step', 0.6, 0.6) * g2, 17);
  const q2 = Q(S, 2, 'Lean has frozen', 0.6, 0.3);
  if (q2 > 0) {
    lbl('LEAN · Combinatorics.Graph.LegalWordDegree', 1420, 250, C.green, q2, 18);
    const row = (w, y, qq, tag) => {
      const n = w.length, x0 = 1420 - n * 35;
      w.forEach((c, i) => {
        const fz = c === 0 && (i === 0 || w[i - 1] === 0) && (i === n - 1 || w[i + 1] === 0);
        const col = c ? C.cyan : fz ? C.green : C.red, mk = Q(S, 2, c ? 'removes a one' : 'turns on a zero', 0.5);
        box(x0 + i * 70, y, 60, 60, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(String(c), x0 + i * 70 + 30, y + 40, C.white, qq, 26);
        lbl(c ? '−' : fz ? '+' : '×', x0 + i * 70 + 30, y + 92, col, qq * mk, 24);
      });
      lbl(tag, 1420, y + 136, C.white, qq, 20);
    };
    row([1, 0, 0, 1, 0, 0, 0], 300, q2, 'n = 7 , k = 2 :  flips 2 + 2 = 4  ≤  6');
    row([1, 0, 1, 0, 1, 0, 1], 500, Q(S, 2, 'with equality only', 0.6), 'n = 7 , k = 4 :  flips 0 + 4 = 4  =  8 − 4');
    eqn('flips ≤ n + 1 − k', 1420, 720, Q(S, 2, 'at most n plus one minus k'), C.gold, 30);
  }
};

/* ---- 03 INTERVALS ---- */
SCENES.intervals = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f0 = 1 - Q(S, 1, 'Alpha beta alpha can', 0.6);
  const X = 360, Y = 270, Wd = 1200, Hh = 70, sv = 0.6;
  if (f0 > 0) {
    const T = [['b', 'a'], ['a', ['b', 'a']]], lv = leaves49(T, sv), cuts = cuts49(T, sv);
    const pr = 3 * Q(S, 0, 'cut every pair', 2.4);
    rect49(X, Y, Wd, Hh, C.white, s0 * f0, 1.5);
    lbl('0', X, Y + Hh + 34, C.dim, s0 * f0, 18); lbl('1', X + Wd, Y + Hh + 34, C.dim, s0 * f0, 18);
    const lq = Q(S, 0, 'labeled endpoints', 0.6);
    bar49(X, Y, Wd, Hh, lv, lq * f0, { minLab: 30 });
    cuts.forEach(([c, d]) => { const q = clamp(pr - d) * f0; line(X + c * Wd, Y - 14 + d * 6, X + c * Wd, Y + Hh + 14 - d * 6, C.white, q, 3 - d * 0.6); });
    const lq0 = Q(S, 0, 'the left child gets s', 0.5);
    lbl('s', X + sv * Wd / 2, Y - 24, C.white, lq0 * f0, 22); lbl('1 − s', X + sv * Wd + (1 - sv) * Wd / 2, Y - 24, C.white, Q(S, 0, 'the right gets', 0.5) * f0, 22);
    /* recovered tree below */
    const tq = Q(S, 0, 'recover the whole bracketed tree', 0.8);
    const draw = (tr, a, L, d) => {
      const yy = 450 + d * 85;
      if (typeof tr === 'string') { const x = X + (a + L / 2) * Wd; lblG(GR49[tr], x, yy + 9, COL49[tr], tq * f0, 28); dashed(x, Y + Hh + 4, x, yy - 24, COL49[tr], tq * f0 * 0.5, 1.5); return x; }
      const xl = draw(tr[0], a, sv * L, d + 1), xr = draw(tr[1], a + sv * L, (1 - sv) * L, d + 1), x = (xl + xr) / 2;
      line(x, yy, xl, yy + 85 - (typeof tr[0] === 'string' ? 26 : 0), C.dim, tq * f0, 2); line(x, yy, xr, yy + 85 - (typeof tr[1] === 'string' ? 26 : 0), C.dim, tq * f0, 2);
      dot(x, yy, 8, 'w', tq * f0); return x;
    };
    draw(T, 0, 1, 0);
    chip(1620, 520, 300, 52, 'record ⟺ tree', C.green, Q(S, 0, 'For any fixed s', 0.5) * f0, 22);
  }
  const q = Q(S, 1, 'Alpha beta alpha can', 0.6, 0.3);
  if (q > 0) {
    const T1 = [['a', 'b'], 'a'], T2 = ['a', ['b', 'a']], X2 = 300, W2 = 800;
    [[T1, 300, 'T₁ = ⟨⟨α, β⟩, α⟩', ['1/4', '1/4', '1/2']], [T2, 470, 'T₂ = ⟨α, ⟨β, α⟩⟩', ['1/2', '1/4', '1/4']]].forEach(([T, y, name, ls], k) => {
      const qq = Q(S, 1, k ? 'against a half' : 'At s one half', 0.6);
      lblG(name, X2, y - 18, C.white, qq, 24, 'left');
      const lv = leaves49(T, 0.5); bar49(X2, y, W2, 60, lv, qq, { minLab: 30 });
      lv.forEach(([l, r], i) => lbl(ls[i], X2 + (l + r) / 2 * W2, y + 92, C.white, qq, 20));
    });
    chip(700, 650, 520, 54, 'same leaf word α β α', C.gold, Q(S, 1, 'the same leaf word'), 22);
    const cq = Q(S, 1, 'Close the line into a circle', 0.8), cx = 1460, cy = 470, R = 160, rot = 0.6 * Math.sin(t * 0.8) * (1 - Q(S, 1, 'root mark must stay', 0.8));
    leaves49(T1, 0.5).forEach(([l, r, lab]) => arc49(cx, cy, R, -Math.PI / 2 + rot + TAU * l + 0.03, -Math.PI / 2 + rot + TAU * r - 0.03, COL49[lab], cq, 8));
    const rm = Q(S, 1, 'root mark must stay', 0.6), rp = [cx + (R + 26) * Math.cos(-Math.PI / 2 + rot), cy + (R + 26) * Math.sin(-Math.PI / 2 + rot)];
    dot(rp[0], rp[1], 13, 'r', Math.max(cq * 0.5, rm)); lbl('root mark', cx, cy - R - 58, C.red, rm, 20);
    lbl('drop it and ⟨α,β⟩, ⟨β,α⟩ coincide', cx, cy + R + 60, C.dim, rm, 17);
  }
};

/* ---- 04 REFINE ---- */
SCENES.refine = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'Lean has frozen', 'lean'], [1, '', 'theory']]);
  const s0 = clamp(u), sv = 0.6, X = 360, Y = 230, Wd = 1200, Hh = 70;
  const L0 = lineAt(S, 0), n = S.u < L0.s ? 0 : Math.min(5, Math.floor((S.u - L0.s) / 1.6));
  const g2 = 1 - Q(S, 2, 'Not every infinite', 0.6);
  bar49(X, Y, Wd, Hh, leaves49(rhoN49('b', n), sv), s0 * g2, { minLab: 30 });
  lbl('ρ' + (n ? superscript49(n) : '⁰') + '(β)', X - 24, Y + Hh / 2 + 8, C.dim, s0 * g2, 20, 'right');
  const f1 = 1 - Q(S, 1, 'Fix one reading point', 0.6);
  if (f1 > 0) {
    const qa = Q(S, 0, 'is relabeled beta', 0.6), qb = Q(S, 0, 'splits into', 0.6);
    rect49(420, 400, 160, 56, C.cyan, qa * f1, 2); lblG('α', 500, 437, C.cyan, qa * f1, 26); arrow(600, 428, 690, 428, C.white, qa * f1, 2.5);
    rect49(710, 400, 160, 56, C.gold, qa * f1, 2); lblG('β', 790, 437, C.gold, qa * f1, 26); lbl('relabel · no cut', 645, 490, C.dim, qa * f1, 18);
    rect49(1010, 400, 160, 56, C.gold, qb * f1, 2); lblG('β', 1090, 437, C.gold, qb * f1, 26); arrow(1190, 428, 1280, 428, C.white, qb * f1, 2.5);
    bar49(1300, 400, 260, 56, [[0, sv, 'b', 'L'], [sv, 1, 'a', 'R']], qb * f1, {}); lbl('s : 1 − s', 1430, 490, C.dim, qb * f1, 18);
    const lq = Q(S, 0, 'Lean has frozen', 0.6) * f1;
    box(380, 560, 1160, 120, C.green, lq, 2, 'rgba(0,0,0,0.5)');
    lbl('LEAN · FibonacciAtomic.GenealogicalFiberTransport.result', 960, 598, C.green, lq, 20);
    lbl('ρⁿ is injective on every composition fibre', 960, 634, C.white, Q(S, 0, 'never merges', 0.6) * f1, 22);
    lbl('composition(ρⁿ t) = stepⁿ(composition t)  ·  Fibonacci counts', 960, 666, C.white, Q(S, 0, 'follow the Fibonacci step', 0.6) * f1, 18);
  }
  const q1 = Q(S, 1, 'Fix one reading point', 0.6, 0.3) * g2;
  if (q1 > 0) {
    const r = 0.335, rx = X + r * Wd; line(rx, Y - 30, rx, Y + Hh + 30, C.red, q1, 3); lbl('reading point', rx, Y - 42, C.red, q1, 18);
    const lv = leaves49(rhoN49('b', 3), sv), Y2 = 420, fm = ['s³', 's²(1−s)', 's(1−s)', 's(1−s)', '(1−s)²'];
    const wq = Q(S, 1, 'the five three-step windows', 0.8);
    bar49(X, Y2, Wd, 70, lv, wq, { colf: (lab, addr, i) => PC[MODE49[i][2]], text: (lab, addr, i) => MODE49[i][0], size: 22 });
    lv.forEach(([l, r], i) => { const xx = X + (l + r) / 2 * Wd; lblG(fm[i], xx, Y2 + 110, PC[MODE49[i][2]], Q(S, 1, 'have lengths', 0.5, i * 0.35), 22); lbl(MODE49[i][1], xx, Y2 + 145, PC[MODE49[i][2]], wq, 18); });
    eqn('s³ + s²(1 − s) + 2 s(1 − s) + (1 − s)² = 1', 960, 650, Q(S, 1, 'tile the start interval'), C.green, 28);
  }
  const q2 = Q(S, 2, 'Not every infinite', 0.6, 0.3);
  if (q2 > 0) {
    const Y3 = 330; rect49(X, Y3, Wd, 60, C.white, q2, 1.5);
    const kk = 9 * Q(S, 2, 'Always going left', 3);
    for (let k = 1; k <= 9; k++) { const qq = clamp(kk - k + 1) * q2, w = Math.pow(sv, k) * Wd; rect49(X, Y3 - k * 4, w, 60 + k * 8, C.gold, qq, 2); }
    lbl('[0, sⁿ)  →  {0}', 960, 470, C.gold, Q(S, 2, 'shrinks onto', 0.5), 28);
    dot(X, Y3 + 30, 14, 'r', Q(S, 2, 'boundary point zero', 0.5)); lbl('0 is a cut point', X, Y3 + 130, C.red, Q(S, 2, 'boundary point zero', 0.5), 20);
    chip(960, 600, 680, 56, 'code 0 0 0 0 …  has no reading point', C.red, Q(S, 2, 'must avoid'), 22);
    lbl('every finite prefix still does', 960, 670, C.dim, Q(S, 2, 'must avoid', 0.6, 0.6), 18);
  }
};
function superscript49(n) { return String(n).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join(''); }

/* ---- 05 GOLDEN ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [2, '', 'classical']]);
  const s0 = clamp(u), X = 360, Y = 250, Wd = 1200;
  const g2 = 1 - Q(S, 2, 'At this ratio', 0.6);
  const settle = Q(S, 0, 'The only solution', 1.5), sv = lerp(0.62 + 0.13 * Math.sin(t * 0.9), G49, settle);
  if (g2 > 0) {
    const lv = leaves49(rhoN49('b', 3), sv);
    bar49(X, Y, Wd, 70, lv, s0 * g2, { colf: (lab, addr, i) => PC[MODE49[i][2]], text: (lab, addr, i) => MODE49[i][1], size: 20 });
    const ends = ['β', 'α', 'β', 'β', 'α'], f1 = 1 - Q(S, 1, 'Then three modes', 0.6);
    lv.forEach(([l, r], i) => { const xx = X + (l + r) / 2 * Wd; lblG('end ' + ends[i], xx, Y - 20, ends[i] === 'β' ? C.gold : C.cyan, Q(S, 0, 'the same end type', 0.5) * g2, 18); lbl(((r - l)).toFixed(3), xx, Y + 104, C.white, s0 * g2 * f1, 20); });
    lbl('s = ' + sv.toFixed(3), X - 24, Y + 44, C.white, s0 * g2 * f1, 22, 'right');
    eqn('s³ = s(1 − s)   ⟺   s² = 1 − s   ⟺   s²(1 − s) = (1 − s)²', 960, 460, Q(S, 0, 'exactly when s squared') * f1 * g2, C.white, 26);
    chip(960, 560, 480, 56, 's = 1/φ ≈ 0.618', C.gold, Q(S, 0, 'one over phi') * f1 * g2, 24);
    const q1 = Q(S, 1, 'Then three modes', 0.6) * g2;
    lv.forEach(([l, r], i) => { const xx = X + (l + r) / 2 * Wd; lblG(ends[i] === 'β' ? 'φ⁻³' : 'φ⁻⁴', xx, Y + 108, ends[i] === 'β' ? C.gold : C.cyan, q1, 26); });
    eqn('3 φ⁻³ + 2 φ⁻⁴ = 1', 700, 470, Q(S, 1, 'is exactly one') * g2, C.green, 34);
    const sq = Q(S, 1, 'In a unit square', 0.8) * g2, SX = 1180, SY = 420, SS = 300;
    rect49(SX, SY, SS, SS, C.white, sq, 1.5);
    fillBox(SX, SY + SS - G49 * SS, G49 * SS, G49 * SS, C.gold, sq * 0.35); rect49(SX, SY + SS - G49 * SS, G49 * SS, G49 * SS, C.gold, sq, 2);
    fillBox(SX + G49 * SS, SY, (1 - G49) * SS, SS, C.cyan, sq * 0.35); rect49(SX + G49 * SS, SY, (1 - G49) * SS, SS, C.cyan, sq, 2);
    lblG('s²', SX + G49 * SS / 2, SY + SS - G49 * SS / 2 + 9, C.gold, sq, 28); lblG('1 − s', SX + G49 * SS + (1 - G49) * SS / 2, SY + 60, C.cyan, sq, 22);
    lbl('equal areas ⟺ s² = 1 − s', SX + SS / 2, SY + SS + 44, C.white, Q(S, 1, 'have equal area'), 20);
  }
  const q2 = Q(S, 2, 'At this ratio', 0.6, 0.3);
  if (q2 > 0) {
    for (let k = 0; k <= 6; k++) {
      const qq = Q(S, 2, 'cuts every longest', 0.5, k * 0.35) * q2, yy = 230 + k * 74, lv = leaves49(rhoN49('b', k), G49);
      const mx = Math.max(...lv.map(q => q[1] - q[0]));
      bar49(X, yy, Wd, 44, lv, qq, { labels: false, colf: (lab, addr, i) => Math.abs(lv[i][1] - lv[i][0] - mx) < 1e-9 ? C.red : COL49[lab], fill: 0.25 });
      lbl('n = ' + k, X - 24, yy + 30, C.dim, qq, 18, 'right');
    }
    chip(960, 790, 760, 56, 'cut every longest interval · keep the rest', C.red, Q(S, 2, 'the Kakutani refinement'), 22);
  }
};

/* ---- 06 TELESCOPE ---- */
SCENES.telescope = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f0 = 1 - Q(S, 1, 'But length is not history', 0.6);
  if (f0 > 0) {
    const seq = ['b', 'b', 'a', 'b', 'b', 'a', 'b'], rat = { bb: '1/φ', ba: '1/φ²', ab: '1' };
    seq.forEach((lab, i) => {
      const x = 380 + i * 190, y = 300, q = Q(S, 0, 'every lineage telescopes', 0.4, i * 0.25) * f0;
      ring(x, y, 34, COL49[lab], q, 2.5); lblG(GR49[lab], x, y + 10, COL49[lab], q, 30);
      lbl(lab === 'a' ? 'ℓ = 1' : 'ℓ = φ', x, y + 70, C.dim, Q(S, 0, 'Give alpha length one', 0.5) * f0, 18);
      if (i) { const r = rat[seq[i - 1] + lab]; arrow(x - 190 + 40, y, x - 40, y, C.white, q, 2.5); lbl('×' + r, x - 95, y - 22, C.green, q, 20); }
    });
    chip(960, 470, 520, 56, 'ℓ_α = 1 ,  ℓ_β = φ', C.gold, Q(S, 0, 'Give alpha length one') * f0, 22);
    eqn('w(h) = ∏ ℓ(x_{k+1}) / (φ ℓ(x_k))  =  ℓ_end / (φⁿ ℓ_start)', 960, 570, Q(S, 0, 'its length is the end length') * f0, C.white, 28);
    chip(960, 670, 760, 56, 'same start · same time · same end  ⟹  same length', C.green, Q(S, 0, 'Same start, same time') * f0, 21);
  }
  const q = Q(S, 1, 'But length is not history', 0.6, 0.3);
  if (q > 0) {
    const X = 360, Y = 290, Wd = 1200, lv = leaves49(rhoN49('b', 3), G49);
    const hot = Q(S, 1, 'Zero zero one and one zero one', 0.6);
    bar49(X, Y, Wd, 70, lv, q, { colf: (lab, addr, i) => (addr === 'LLR' || addr === 'RR') && hot > 0 ? C.mag : COL49[lab], alpha: (lab, addr) => (addr === 'LLR' || addr === 'RR') ? 1 : 1 - 0.6 * hot });
    lv.forEach(([l, r, lab, addr], i) => { const xx = X + (l + r) / 2 * Wd, on = addr === 'LLR' || addr === 'RR'; lbl(addr, xx, Y - 20, on ? C.mag : C.dim, on ? Q(S, 1, 'at addresses', 0.5) : q * 0.6, 20); if (on) { lbl(MODE49[i][0], xx, Y + 104, C.mag, hot, 20); lblG('φ⁻⁴', xx, Y + 140, C.mag, Q(S, 1, 'with length phi', 0.5), 24); } });
    chip(960, 510, 560, 56, 'same scale ≠ same history', C.mag, Q(S, 1, 'two disjoint intervals'), 24);
    const zq = Q(S, 1, 'already certain', 0.6);
    chip(960, 610, 900, 56, 'a certain zero window:  length × φ⁻³ ,  surprise −log₂ 1 = 0', C.gold, zq, 21);
    lbl('geometric resolution is measured against the whole root, surprise against what is already known', 960, 680, C.dim, Q(S, 1, 'no surprise at all', 0.6), 17);
  }
};

/* ---- 07 ENTROPY ---- */
SCENES.entropy = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The long-run rate', 0.6);
  eqn("b′ = 1 − (1 − s) b", 560, 290, Q(S, 0, 'beta mass obeys'), C.gold, 30);
  eqn("H′ − H = b · h₂(s)", 560, 370, Q(S, 0, 'address entropy grows'), C.green, 30);
  eqn('h₂(s) = −s log₂ s − (1 − s) log₂(1 − s)', 560, 450, Q(S, 0, 'binary entropy of one cut'), C.white, 22);
  if (f1 > 0) {
    const bq = Q(S, 0, 'Pick the reading point', 0.6) * f1, X = 260, Y = 560, Wd = 600;
    bar49(X, Y, Wd, 50, leaves49(rhoN49('b', 6), G49), bq, { labels: false, fill: 0.18 });
    for (let i = 0; i < 26; i++) { const r = (Math.sin(i * 12.9898) * 43758.5453) % 1, rr = r < 0 ? r + 1 : r, qq = clamp(bq * 26 - i); dot(X + rr * Wd, Y + 25, 6, 'r', qq); }
    lbl('uniform reading point', X + Wd / 2, Y + 90, C.dim, bq, 18);
    const pq = Q(S, 0, 'grows by exactly', 0.8) * f1, st = stats49('b', 12, G49);
    plotAxes(1080, 740, 640, 400, pq, 'n', 'H_n (bits)');
    st.forEach(([N, H], k) => { const qq = clamp(pq * 13 - k); dot(1080 + k * 50, 740 - H / 9 * 400, 8, 'n', qq); });
    dashed(1080, 740, 1080 + 12 * 50, 740 - 12 * Math.log2(PHI49) / 9 * 400, C.green, pq * 0.7, 2);
    lbl('golden ratio, from β', 1400, 320, C.green, pq, 18);
  }
  const q = Q(S, 1, 'The long-run rate', 0.6, 0.3);
  if (q > 0) {
    const X0 = 1080, Y0 = 740, PW = 640, PH = 400, sx = s => X0 + s * PW, sy = e => Y0 - e / 0.8 * PH;
    plotAxes(X0, Y0, PW, PH, q, 's', 'h₂(s)/(2 − s)');
    curve(k => { const s = 0.005 + 0.99 * k; return [sx(s), sy(h2_49(s) / (2 - s))]; }, 200, C.cyan, Q(S, 1, 'h two of s over', 1.2), 3);
    const lp = Math.log2(PHI49), mq = Q(S, 1, 'never exceeds', 0.6);
    dashed(X0, sy(lp), X0 + PW, sy(lp), C.gold, mq, 2); lbl('log₂φ ≈ 0.694', X0 + PW + 10, sy(lp) + 6, C.gold, mq, 18, 'left');
    const gq = Q(S, 1, 'only at s equals', 0.6); dot(sx(G49), sy(lp), 13, 'g', gq); lbl('s = 1/φ', sx(G49), sy(lp) - 26, C.gold, gq, 20);
    dashed(sx(G49), sy(lp), sx(G49), Y0, C.gold, gq * 0.6, 1.5);
    dot(sx(0.5), sy(2 / 3), 10, 'w', Q(S, 1, 'never exceeds', 0.6, 0.6)); lbl('½ → 2/3', sx(0.5) - 14, sy(2 / 3) + 34, C.white, Q(S, 1, 'never exceeds', 0.6, 0.6), 16, 'right');
    eqn('rate = h₂(s) / (2 − s)  ≤  log₂φ', 560, 580, Q(S, 1, 'The long-run rate'), C.cyan, 28);
    chip(560, 670, 520, 56, 'equality only at s = 1/φ', C.gold, gq, 22);
    chip(560, 760, 620, 56, 'scale condition = entropy maximum', C.green, Q(S, 1, 'pick the same point'), 22);
  }
};

/* ---- 08 HALVES ---- */
SCENES.halves = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), X = 260, Wd = 600, st = stats49('a', 6, 0.5);
  const Hs = ['0', '0', '1', '3/2', '9/4', '23/8', '57/16'], hl3 = Q(S, 1, 'Halves at three steps', 0.6);
  for (let k = 0; k <= 6; k++) {
    const yy = 230 + k * 74, qq = Q(S, 0, 'Starting from alpha', 0.4, k * 0.3), lv = leaves49(rhoN49('a', k), 0.5);
    bar49(X, yy, Wd, 44, lv, qq * (k === 3 ? 1 : 1 - 0.5 * hl3), { labels: false, fill: k === 3 ? 0.2 + 0.25 * hl3 : 0.2 });
    lbl('n = ' + k, X - 20, yy + 30, C.dim, qq, 18, 'right');
    if (k === 3) lv.forEach(([l, r]) => lbl(['¼', '¼', '½'][lv.findIndex(q => q[0] === l)], X + (l + r) / 2 * Wd, yy + 30, C.white, hl3, 22));
  }
  const f1 = 1 - Q(S, 1, 'The gap between', 0.6);
  if (f1 > 0) {
    const TX = 1100;
    lbl('n', TX, 250, C.dim, s0 * f1, 20); lbl('N_n', TX + 140, 250, C.dim, s0 * f1, 20); lbl('H_n', TX + 300, 250, C.dim, s0 * f1, 20);
    for (let k = 0; k <= 6; k++) {
      const yy = 300 + k * 50, qn = Q(S, 0, 'the leaf counts are', 0.4, k * 0.3) * f1, qh = Q(S, 0, 'the entropy runs', 0.4, k * 0.35) * f1;
      lbl(String(k), TX, yy, C.white, qn, 22); lbl(String(st[k][0]), TX + 140, yy, C.gold, qn, 22); lbl(Hs[k], TX + 300, yy, C.green, qh, 22);
    }
    eqn('rate = h₂(½) / (3/2) = 2/3  <  log₂φ ≈ 0.694', 1250, 700, Q(S, 0, 'The rate is two thirds') * f1, C.cyan, 24);
  }
  const q = Q(S, 1, 'The gap between', 0.6, 0.3);
  if (q > 0) {
    eqn('log₂ N − H = D(p ‖ uniform) ≥ 0', 1300, 270, q, C.white, 28);
    eqn('halves, n = 3:  log₂ 3 − 3/2 ≈ 0.085', 1300, 330, hl3, C.cyan, 24);
    const gq = Q(S, 1, 'At the golden ratio', 0.8), X0 = 1000, Y0 = 720, PW = 600, PH = 300, st2 = stats49('b', 20, G49), lp = Math.log2(PHI49), sy = e => Y0 - e / 0.8 * PH;
    plotAxes(X0, Y0, PW, PH, gq, 'n', 'log₂N − H');
    dashed(X0, sy(lp), X0 + PW, sy(lp), C.gold, gq, 2); lbl('log₂φ', X0 + PW + 10, sy(lp) + 6, C.gold, gq, 18, 'left');
    st2.forEach(([N, H], k) => dot(X0 + k * 30, sy(Math.log2(N) - H), 7, 'g', clamp(gq * 21 - k)));
    lbl('golden ratio: stays below log₂φ', X0 + PW / 2, Y0 - PH - 30, C.green, gq, 18);
    chip(1300, 790, 460, 54, 'p_max ≤ φ · p_min', C.gold, Q(S, 1, 'no leaf is more'), 22);
  }
};

/* ---- 09 FRONTIER ---- */
SCENES.frontier = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), X = 360, Y = 230, Wd = 1200;
  const T = [[['b', 'a'], 'a'], [['a', ['b', 'b']], 'a']], lv = leaves49(T, 0.5), READ = ['LLL', 'LR', 'RR'];
  const rq = Q(S, 0, 'keeps leaf replies', 0.6);
  bar49(X, Y, Wd, 70, lv, s0, { colf: (lab, addr) => READ.includes(addr) && rq > 0 ? COL49[lab] : C.dim, text: (lab, addr) => READ.includes(addr) && rq > 0 ? GR49[lab] : '?', fill: 0.22, alpha: (lab, addr) => READ.includes(addr) ? 1 : 0.7 });
  lv.forEach(([l, r, lab, addr]) => { const xx = X + (l + r) / 2 * Wd; lbl(['1/8', '1/8', '1/4', '1/8', '1/16', '1/16', '1/4'][lv.findIndex(q => q[3] === addr)], xx, Y + 100, READ.includes(addr) ? C.white : C.dim, s0, 18); if (READ.includes(addr)) lbl('read', xx, Y - 16, C.green, rq, 16); });
  eqn('μ = Σ_read p(q) = 5/8 ,   b_read = 1/8', 960, 400, Q(S, 0, 'add up to mu'), C.white, 26);
  /* number line */
  const NX = 460, NW = 1000, NY = 520, xx = v => NX + v * NW;
  line(NX, NY, NX + NW, NY, C.dim, s0, 2); lbl('0', NX, NY + 34, C.dim, s0, 18); lbl('1', NX + NW, NY + 34, C.dim, s0, 18); lbl('β mass', NX - 20, NY + 6, C.dim, s0, 18, 'right');
  const eq = Q(S, 0, 'lies between', 0.8);
  fillBox(xx(1 / 8), NY - 14, (3 / 8) * NW * eq, 28, C.cyan, eq * 0.3); line(xx(1 / 8), NY - 22, xx(1 / 8), NY + 22, C.cyan, eq, 3); line(xx(1 / 8) + (3 / 8) * NW * eq, NY - 22, xx(1 / 8) + (3 / 8) * NW * eq, NY + 22, C.cyan, eq, 3);
  lbl('b_read', xx(1 / 8), NY - 34, C.cyan, eq, 18); lbl('b_read + 1 − μ', xx(1 / 2), NY - 34, C.cyan, eq, 18);
  const ends = Q(S, 0, 'reach both ends', 0.6);
  lbl('unread → all α', xx(1 / 8), NY + 66, C.cyan, ends, 16); lbl('unread → all β', xx(1 / 2), NY + 66, C.gold, ends, 16);
  dot(xx(1 / 8), NY, 11, 'c', ends); dot(xx(1 / 2), NY, 11, 'g', ends);
  const mq = Q(S, 1, 'The best guess is the midpoint', 0.6);
  if (mq > 0) {
    const m = xx(5 / 16); line(m, NY - 40, m, NY + 40, C.mag, mq, 3); lbl('midpoint', m, NY - 50, C.mag, mq, 18);
    arrow(m, NY + 50, xx(1 / 8) + 6, NY + 50, C.mag, Q(S, 1, 'worst error', 0.5), 2); arrow(m, NY + 50, xx(1 / 2) - 6, NY + 50, C.mag, Q(S, 1, 'worst error', 0.5), 2);
    lbl('worst error (1 − μ)/2 = 3/16', m + 300, NY + 110, C.mag, Q(S, 1, 'worst error', 0.5), 20);
  }
  chip(960, 690, 760, 54, 'μ = 1  ⟺  every leaf in hand  ⟺  tree recovered', C.green, Q(S, 1, 'Mu equals one'), 21);
  const lq = Q(S, 1, 'A small one minus mu', 0.6);
  if (lq > 0) {
    const m5 = 5, sv = 0.5, LX = 560, LW = 800, LY = 770;
    /* L^m leaf at the left, then L^{k-1}R leaves to the right */
    const segs = [[0, Math.pow(sv, m5), '?']]; let pos = Math.pow(sv, m5);
    for (let k = m5; k >= 1; k--) { const w = Math.pow(sv, k); segs.push([pos, pos + w, 'α']); pos += w; }
    segs.forEach(([l, r, s_], i) => { const x0 = LX + l * LW, x1 = LX + r * LW, col = i ? C.cyan : C.red; fillBox(x0, LY, x1 - x0, 44, col, lq * (i ? 0.2 : 0.5)); line(x0, LY, x0, LY + 44, col, lq, 2); if (x1 - x0 > 24) lblG(s_, (x0 + x1) / 2, LY + 31, col, lq, 20); });
    rect49(LX, LY, LW, 44, C.white, lq * 0.6, 1.5);
    lbl('?', LX + Math.pow(sv, m5) * LW / 2, LY - 12, C.red, lq, 22);
    lbl('L^m unread:  μ = 1 − s^m , target still moves by s^m', LX + LW / 2, LY + 84, C.red, Q(S, 1, 'move the target', 0.5), 18);
  }
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['CODE', 'no 1 1', C.cyan, 'a code without'], ['MODES', 'five in three steps', C.gold, 'five modes'], ['GOLDEN', 's = 1/φ', C.mag, 'one golden ratio'], ['FRONTIER', 'μ = 1 ⟺ recovery', C.green, 'and a frontier']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 28); lblG(a2, x, 350, C.white, q, 22); });
    lbl('LEAN · GenealogicalFiberTransport · ρⁿ injective on composition fibres   ·   LegalWordDegree · flips ≤ n + 1 − k', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 19);
    lbl('VOLUME · partition · golden equivalences · entropy rates · frontier envelope   CLASSICAL · entropy identities', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 19);
    lbl('RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'every number') * fade, 24);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, n = Math.min(8, Math.floor((u - L[1].e - 1.5) / 0.7));
    bar49(360, 360, 1200, 90, leaves49(rhoN49('b', Math.max(0, n)), G49), a, { minLab: 28 });
    txt('AURIC FIB ATOM PYRAMID XX', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XX · 单支系分割几何 · TRURETURING FILM 049', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One leaf, one line.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'ONE LEAF', lineage: 'THE LINEAGE CODE', intervals: 'INTERVALS KEEP BRACKETS', refine: 'FIVE LENGTHS', golden: 'THE GOLDEN CUT', telescope: 'SCALE IS NOT HISTORY', entropy: 'ENTROPY RATE', halves: 'CUT IN HALVES', frontier: 'WHAT WAS READ', finale: 'LEDGER' });

function poster49() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  for (let k = 0; k <= 6; k++) bar49(150, 220 + k * 72, 760, 46, leaves49(rhoN49('b', k), G49), 0.95, { labels: false, fill: 0.3 });
  txt('s² = 1 − s  ⟺  s = 1/φ', 1370, 300, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('3φ⁻³ + 2φ⁻⁴ = 1', 1370, 390, { size: 36, fam: FG, w: 700, align: 'center', c: C.white });
  txt('h₂(s)/(2 − s) ≤ log₂φ', 1370, 480, { size: 36, fam: FG, w: 700, align: 'center', c: C.green });
  txt('μ = 1 ⟺ recovery', 1370, 570, { size: 36, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('FIB 原子金字塔 XX', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XX', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('一 片 叶 · 一 条 线', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 049', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster49;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
