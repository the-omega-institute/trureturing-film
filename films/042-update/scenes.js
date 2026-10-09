/* Film 042 — AURIC FIB ATOM PYRAMID XIII · 金字塔 XIII：观察更新如何暴露隐藏关系 */

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


/* ---- film 042: observation update helpers ---- */
const SEL42 = [[], [1], [2], [3], [1, 3]], SNM42 = ['∅', 'low', 'mid', 'high', 'joint'];
const SCOL42 = [C.white, C.cyan, C.gold, C.mag, C.green];
const POSD42 = { 1: 'c', 2: 'g', 3: 'm' };
function pat42(x, y, I, a, gap = 30, r = 10) {
  if (a <= 0) return;
  line(x - gap, y, x + gap, y, C.dim, a * 0.5, 1.5);
  [1, 2, 3].forEach((i, k) => { const px = x + (k - 1) * gap; if (I.includes(i)) dot(px, y, r, POSD42[i], a); else ring(px, y, r * 0.6, C.dim, a, 1.8); });
}
function cross42(x, y, s, a) { if (a <= 0) return; line(x - s, y - s, x + s, y + s, C.red, a, 3); line(x - s, y + s, x + s, y - s, C.red, a, 3); }
function tick42(x, y, s, a) { if (a <= 0) return; line(x - s, y, x - s * 0.3, y + s * 0.7, C.green, a, 3.5); line(x - s * 0.3, y + s * 0.7, x + s, y - s * 0.7, C.green, a, 3.5); }
/* oblique Bloch sphere: X right, Y into the page (drawn down-left), Z up */
function bloch42(x, y, r, v, a, col, labs = true) {
  if (a <= 0) return;
  ring(x, y, r, C.cyan, a * 0.5, 1.5);
  ctx.globalAlpha = a * 0.25; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.32, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
  const P = (vx, vy, vz) => [x + vx * r - vy * r * 0.42, y - vz * r + vy * r * 0.32];
  [[[1, 0, 0], 'X'], [[0, 1, 0], 'Y'], [[0, 0, 1], 'Z']].forEach(([u, s]) => { const p = P(...u), m = P(-u[0], -u[1], -u[2]); line(m[0], m[1], p[0], p[1], C.dim, a * 0.5, 1); if (labs) txt(s, p[0] + (s === 'Y' ? -14 : 10), p[1] + (s === 'Z' ? -8 : 18), { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); });
  const p = P(v[0], v[1], v[2]);
  arrow(x, y, p[0], p[1], col, a, 3.5); dot(p[0], p[1], 14, col === C.mag ? 'm' : col === C.gold ? 'g' : 'c', a);
}
/* posterior bars over hidden parameters */
function pbars(x0, yb, vals, bw, sc, col, a, labs) {
  if (a <= 0) return;
  vals.forEach((v, i) => { fillBox(x0 + i * bw + 6, yb - v * sc, bw - 12, v * sc, col, a * 0.8); if (labs) txt(labs[i], x0 + i * bw + bw / 2, yb + 26, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); });
  line(x0, yb, x0 + vals.length * bw, yb, C.dim, a, 1.5);
}
const FB42 = (() => { const f = [0, 1]; for (let i = 0; i < 40; i++) f.push(f[f.length - 1] + f[f.length - 2]); return f; })();
const R42 = k => FB42[k + 1] / FB42[k + 3];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  const py = pyrTrue(560, 520, 330, 0.5 + t * 0.15, s0, { r: 16, fill: 0.06, lab: false });
  if (py.P) {
    const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'joint' };
    Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: NC[k], a: s0 }));
    const q = P(S, 0, 5.5), e = [1250, 300];
    if (q > 0) { dot(e[0], e[1], 22, 'c', q); ring(e[0], e[1], 40 + 6 * Math.sin(t * 3), C.cyan, q * 0.6, 2); dashed(e[0], e[1], py.P.L[0], py.P.L[1], C.cyan, q * 0.8, 2.5); txt('observer reads low', e[0], e[1] - 60, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); }
  }
  ['read', 'update', 'return'].forEach((s, k) => { const q = P(S, 0, 6.5 + k * 0.75); chip(1180 + k * 230, 470, 200, 56, s, [C.cyan, C.gold, C.mag][k], q, 24); if (k < 2) arrow(1180 + k * 230 + 104, 470, 1180 + k * 230 + 126, 470, C.white, q, 2.5); });
  const l = P(S, 1, 0.3), l2 = P(S, 1, 2.2);
  chip(1290, 620, 480, 60, 'same node', C.white, l, 26); tick42(1500, 620, 16, l);
  chip(1290, 720, 480, 60, 'same knowledge', C.white, l2, 26); cross42(1500, 720, 16, l2);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const py = pyrTrue(W / 2, 430, 300, t * 0.3, rp, { r: 18, fill: 0.08, lab: false });
  if (py.P) { const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'joint' }; Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 28, { size: 20, fam: F.mono, w: 700, align: 'center', c: NC[k], a: rp })); dashed(py.P.L[0], py.P.L[1], W / 2 + 380, 240, C.cyan, rp * 0.5, 2); dot(W / 2 + 380, 240, 16, 'c', rp); }
  txt(scramble('AURIC FIB ATOM PYRAMID XIII', rp, 423), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XIII · 观 察 更 新 如 何 暴 露 隐 藏 关 系', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 042 · AURIC_FIB_ATOM_OBSERVATION_UPDATE_AND_RETURN_PREDICTION', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FIBER ---- */
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const py = pyrTrue(440, 560, 320, 0.6 + t * 0.2, s0, { r: 14, fill: 0.06, lab: false });
  if (py.P) {
    const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'joint' };
    Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 24, { size: 18, fam: F.mono, w: 700, align: 'center', c: NC[k], a: s0 }));
    const m = pyrMap(440, 560, 320, 0.6 + t * 0.2, 0.45)(0.4, 0.4, 0.2), q = P(S, 0, 2.5);
    dot(m[0], m[1], 18, 'w', q); ring(m[0], m[1], 30 + 5 * Math.sin(t * 4), C.white, q * 0.6, 2); txt('(X, Y, Z) = (2/5, 2/5, 1/5)', 440, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  }
  eqn('max(0, X+Y+Z−1) ≤ κ ≤ min(X, Y)', 1290, 250, P(S, 0, 7.5), C.gold, 28);
  const K = 0.2 + 0.2 * Math.sin(t * 0.9), q2 = P(S, 0, 5);
  if (q2 > 0) {
    const x0 = 940, x1 = 1640, ly = 340; line(x0, ly, x1, ly, C.dim, q2, 3); txt('0', x0, ly + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q2 }); txt('2/5', x1, ly + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q2 });
    dot(lerp(x0, x1, K / 0.4), ly, 14, 'g', q2); txt('κ', lerp(x0, x1, K / 0.4), ly - 24, { size: 24, fam: FG, w: 700, align: 'center', c: C.gold, a: q2 });
    const pv = [K, 0.4 - K, 0.2, 0.4 - K, K];
    pv.forEach((v, i) => { fillBox(950 + i * 140, 760 - v * 600, 116, v * 600, SCOL42[i], q2 * 0.8); txt(SNM42[i], 1008 + i * 140, 790, { size: 18, fam: F.mono, w: 700, align: 'center', c: SCOL42[i], a: q2 }); });
  }
  chip(1290, 850, 640, 56, 'a summary of readings, not the whole source', C.cyan, P(S, 1, 0.5), 22);
};

/* ---- 03 SLICE ---- */
SCENES.slice = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0);
  if (fade > 0) {
    chip(960, 230, 300, 60, 'read x (low)', C.cyan, s0 * fade, 26);
    const b1 = P(S, 0, 2) * fade, b0 = P(S, 0, 8) * fade;
    arrow(860, 265, 560, 380, C.green, b1, 3); txt('x = 1   (prob X)', 640, 300, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: b1 });
    box(260, 400, 620, 180, C.green, b1, 2, 'rgba(0,30,15,0.5)'); pat42(570, 450, [1], b1, 36, 12);
    txt('middle forced empty', 570, 500, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: b1 });
    eqn('(X₁, Y₁, Z₁) = (1, κ/X, 0)', 570, 555, P(S, 0, 5.5) * fade, C.green, 28);
    arrow(1060, 265, 1360, 380, C.mag, b0, 3); txt('x = 0   (prob 1 − X)', 1280, 300, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: b0 });
    box(1040, 400, 620, 180, C.mag, b0, 2, 'rgba(30,0,30,0.5)'); pat42(1350, 450, [], b0, 36, 12);
    eqn('(X₀, Y₀, Z₀) = (0, (Y−κ)/(1−X), Z/(1−X))', 1350, 555, P(S, 0, 9.5) * fade, C.mag, 24);
    txt('the high mean needs κ', 960, 680, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 11.5) * fade });
  }
  const l = P(S, 1, 0.3);
  if (l > 0) {
    const src = [['μ_A', [[], [1, 3]], C.white, [[1, 3], []]], ['μ_B', [[1], [3]], C.gold, [[1], [3]]]];
    src.forEach(([nm, pats, col, outs], m) => {
      const y = 330 + m * 280, q = P(S, 1, 2.6 + m * 1.2);
      txt(nm, 260, y + 10, { size: 30, fam: FG, w: 700, align: 'center', c: col, a: q });
      pats.forEach((I, k) => { pat42(420 + k * 150, y, I, q, 30, 11); }); txt('½ + ½', 495, y + 50, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
      txt('(X, Y, Z) = (½, ½, 0)', 790, y + 8, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
      const r1 = P(S, 1, 9 + m * 1.4), r0 = P(S, 1, 10.8);
      arrow(940, y - 10, 1120, y - 50, C.green, r1, 2.5); txt('x = 1', 1030, y - 52, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: r1 }); pat42(1220, y - 50, outs[0], r1, 30, 11); txt(outs[0].length === 2 ? 'joint' : 'low', 1350, y - 44, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.green, a: r1 });
      arrow(940, y + 10, 1120, y + 50, C.mag, r0, 2.5); txt('x = 0', 1030, y + 76, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.mag, a: r0 }); pat42(1220, y + 50, outs[1], r0, 30, 11); txt(outs[1].length ? 'high' : '∅', 1350, y + 56, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.mag, a: r0 });
    });
    chip(960, 820, 700, 56, 'same reading, same odds, different successor', C.gold, P(S, 1, 11), 22);
  }
};

/* ---- 04 CLOSURE ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('E[f | o] = E[f ℓ_o] / E[ℓ_o]', 960, 240, s0, C.white, 30);
  chip(960, 340, 620, 60, 'f ℓ_o ∈ V   for every f ∈ V', C.gold, P(S, 0, 8), 26);
  const l = P(S, 1, 0.3);
  const base = ['1', 'x', 'y', 'z'];
  base.forEach((s, k) => chip(560 + k * 140, 480, 110, 60, s, C.cyan, l, 28));
  txt('V₀', 380, 490, { size: 28, fam: FG, w: 700, align: 'center', c: C.cyan, a: l });
  const rz = P(S, 1, 1);
  txt('read z :  z·1 = z,  z·x = 0,  z·y = 0,  z·z = z   → closed', 940, 575, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: rz }); tick42(1420, 568, 14, rz);
  const rx = P(S, 1, 4.5);
  txt('read x, predict y :  x·y ∉ V₀', 960, 645, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: rx });
  const ad = P(S, 1, 7);
  if (ad > 0) { chip(1120, 480, 110, 60, 'xy', C.green, ad, 28); txt('V* = span{1, x, y, z, xy}', 960, 725, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: ad }); }
  chip(960, 810, 640, 56, 'already every function on the five patterns', C.green, P(S, 1, 9.5), 22);
};

/* ---- 05 TILT ---- */
SCENES.tilt = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const cx = 520, cy = 520, h = 170, cor = { 0: [cx - h, cy + h], 1: [cx + h, cy + h], 4: [cx + h, cy - h], 3: [cx - h, cy - h] };
  const l = P(S, 1, 0.3), post = [1 / 9, 2 / 9, 1 / 9, 2 / 9, 3 / 9], pre = 0.2;
  const pv = i => lerp(pre, post[i], ease(P(S, 1, 8)));
  strokePoly([cor[0], cor[1], cor[4], cor[3]], C.cyan, s0, 2);
  line(cor[0][0], cor[0][1], cor[4][0], cor[4][1], C.gold, s0 * 0.8, 3); line(cor[1][0], cor[1][1], cor[3][0], cor[3][1], C.mag, s0 * 0.8, 3);
  [0, 1, 4, 3].forEach(i => { dot(cor[i][0], cor[i][1], 14 + 40 * pv(i), ['w', 'c', 'g', 'm', 'n'][i], s0); txt(SNM42[i], cor[i][0] + (cor[i][0] < cx ? -50 : 50), cor[i][1] + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: SCOL42[i], a: s0 }); txt(fmt42(pv(i)), cor[i][0], cor[i][1] + (cor[i][1] > cy ? 60 : -50), { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) }); });
  eqn('Δ = p∅ p₁₃ − p₁ p₃', 1380, 240, P(S, 0, 3), C.white, 30);
  eqn('stays 0  ⟺  ℓ∅ ℓ₁₃ = ℓ₁ ℓ₃', 1380, 310, P(S, 0, 8.5), C.gold, 28);
  /* balance beam */
  const D = (pv(0) * pv(4) - pv(1) * pv(3)), ang = clamp(-D * 81 / 1, -1, 1) * 0.18, bx = 1380, by = 520, L = 260;
  if (s0 > 0) { line(bx, by, bx, by + 120, C.dim, s0, 3); const e1 = [bx - L * Math.cos(ang), by - L * Math.sin(ang)], e2 = [bx + L * Math.cos(ang), by + L * Math.sin(ang)]; line(e1[0], e1[1], e2[0], e2[1], C.white, s0, 4); txt('∅·joint', e1[0], e1[1] - 24, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 }); txt('low·high', e2[0], e2[1] - 24, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: s0 }); }
  eqn('ℓ = (1 + x + y) / 3', 1380, 700, P(S, 1, 4), C.cyan, 28);
  txt('q = 3/5 · posterior (1, 2, 1, 2, 3)/9', 1380, 760, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 8) });
  chip(1380, 840, 520, 56, 'Δ = 3/81 − 4/81 = −1/81', C.red, P(S, 1, 11), 24);
};
function fmt42(v) { const m = Math.round(v * 45); if (Math.abs(v - 0.2) < 1e-6) return '1/5'; const n = Math.round(v * 9); if (Math.abs(v - n / 9) < 1e-6) return n + '/9'; return v.toFixed(2); }

/* ---- 06 COVARIANCE ---- */
SCENES.covariance = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('C = Σ q_o C_o  +  Σ q_o (m_o − m)(m_o − m)ᵀ', 960, 240, s0, C.white, 30);
  txt('within results', 700, 300, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) });
  txt('between result means', 1260, 300, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 4.2) });
  /* illustrative clouds */
  const c0 = [760, 600], c1 = [1160, 560], q = P(S, 0, 2);
  for (let i = 0; i < 70; i++) { const a1 = rnd(i, 3) * TAU, rr = Math.sqrt(rnd(i, 5)); const g = i % 2 ? c1 : c0, col = i % 2 ? 'n' : 'm'; dot(g[0] + Math.cos(a1) * rr * 120, g[1] + Math.sin(a1) * rr * 70, 5, col, q * 0.7); }
  ring(c0[0], c0[1], 10, C.mag, q, 2); ring(c1[0], c1[1], 10, C.green, q, 2);
  txt('x = 0', c0[0], c0[1] + 110, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q }); txt('x = 1', c1[0], c1[1] + 110, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: q });
  const l = P(S, 1, 0.3);
  if (l > 0) { arrow(c0[0], c0[1], c1[0], c1[1], C.gold, l, 4); dashed(c0[0] - 200, c0[1] + 20, c1[0] + 200, c1[1] - 20, C.gold, l * 0.5, 2); }
  eqn('Cov(m_o) = c_x c_xᵀ / (X(1 − X)) ,   rank 1', 960, 780, l, C.gold, 26);
  eqn('c_x = (X(1−X), κ − XY, −XZ)', 960, 830, P(S, 1, 2), C.dim, 22);
  txt('separation, not a promise that every variance falls', 960, 880, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4.5) });
};

/* ---- 07 KNOWLEDGE ---- */
SCENES.knowledge = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('ν^w(k) = ν(k) L_w(k) / Σ_j ν(j) L_w(j)', 960, 230, s0, C.white, 28);
  const prior = [0.25, 0.25, 0.25, 0.25], Lw = [0.5, 0.8, 1.2, 1.5];
  const postv = (() => { const w = prior.map((p, i) => p * Lw[i]), s = w.reduce((a, b) => a + b); return w.map(v => v / s); })();
  const q = P(S, 0, 2);
  pbars(300, 620, prior, 90, 600, C.cyan, q, ['k₁', 'k₂', 'k₃', 'k₄']); txt('before', 480, 690, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
  const q2 = P(S, 0, 3.5);
  Lw.forEach((v, i) => txt('× ' + v, 345 + i * 90, 360, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q2 }));
  const l = P(S, 1, 0.3);
  /* control loop */
  const nx = 1300, ny = 480;
  if (l > 0) { ring(nx, ny, 40, C.white, l, 3); txt('node', nx, ny + 8, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: l }); curve(s => [nx + Math.cos(-Math.PI / 2 + s * TAU * 0.85) * 120, ny + Math.sin(-Math.PI / 2 + s * TAU * 0.85) * 120], 60, C.cyan, l, 3); arrow(nx - 70, ny - 98, nx - 10, ny - 118, C.cyan, l, 3); }
  const c1 = P(S, 1, 2.5), c2 = P(S, 1, 8);
  pbars(1000, 820, prior, 70, 400, C.green, c1, null); txt('L constant → same knowledge', 1140, 860, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: c1 });
  pbars(1360, 820, postv, 70, 400, C.mag, c2, null); txt('L varies → only control returned', 1500, 860, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.mag, a: c2 });
  const pb = P(S, 0, 5.5);
  pbars(700, 620, postv, 90, 600, C.mag, pb, ['k₁', 'k₂', 'k₃', 'k₄']); txt('after', 880, 690, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pb });
};

/* ---- 08 DEPTH ---- */
SCENES.depth = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('Pr(next = α | depth k) = r_k = F(k+1) / F(k+3)', 960, 230, s0, C.white, 28);
  const x0 = 360, x1 = 1560, v0 = 0.32, v1 = 0.41, X = v => lerp(x0, x1, (v - v0) / (v1 - v0)), ly = 420;
  line(x0, ly, x1, ly, C.dim, s0, 2);
  [0.33, 0.35, 0.37, 0.39, 0.41].forEach(v => { line(X(v), ly - 8, X(v), ly + 8, C.dim, s0, 1.5); txt(v.toFixed(2), X(v), ly + 34, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 }); });
  const gi = 1 / (((1 + Math.sqrt(5)) / 2) ** 2);
  dashed(X(gi), ly - 120, X(gi), ly + 60, C.gold, P(S, 0, 15.5), 2); txt('1/φ² ≈ 0.382', X(gi), ly - 130, { size: 20, fam: FG, w: 700, align: 'center', c: C.gold, a: P(S, 0, 15.5) });
  const labs = ['1/3', '2/5', '3/8', '5/13', '8/21', '13/34'];
  for (let k = 1; k <= 6; k++) { const q = P(S, 0, 10.8 + (k - 1) * 1.0), v = R42(k), up = k % 2 ? -1 : 1; dot(X(v), ly, 12, k % 2 ? 'c' : 'm', q); if (k <= 4) txt(labs[k - 1], X(v), ly + up * 60 + (up > 0 ? 12 : 0), { size: 22, fam: F.mono, w: 700, align: 'center', c: k % 2 ? C.cyan : C.mag, a: q }); }
  const l = P(S, 1, 0.3);
  if (l > 0) {
    const word = 'βαβααβαβαβ', n = Math.min(word.length, Math.floor((u - lineAt(S, 1).s) * 1.4));
    for (let i = 0; i < word.length; i++) { const q = l * (i < n ? 1 : 0.15); txt(word[i], 420 + i * 60, 620, { size: 34, fam: FG, w: 700, align: 'center', c: word[i] === 'α' ? C.cyan : C.gold, a: q }); }
    /* posterior over k = 1..4 after the letters read so far */
    let nu = [0.25, 0.25, 0.25, 0.25];
    for (let i = 0; i < n; i++) { nu = nu.map((p, j) => p * (word[i] === 'α' ? R42(j + 1) : 1 - R42(j + 1))); const s = nu.reduce((a, b) => a + b); nu = nu.map(v => v / s); }
    pbars(1180, 760, nu, 90, 500, C.green, l, ['k=1', 'k=2', 'k=3', 'k=4']);
    txt('posterior over depth', 1360, 560, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: l });
    txt('every letter read counts, rejected pairs too', 720, 700, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) });
  }
};

/* ---- 09 RISE ---- */
SCENES.rise = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('L_βα(k) = r_k (1 − r_k)', 560, 230, s0, C.white, 28);
  eqn('m_hw − m_h = Cov(r, r(1−r)) / E[r(1−r)]', 1280, 230, P(S, 0, 7), C.gold, 26);
  eqn('Var / 5E  ≤  rise  ≤  Var / 3E', 1280, 290, P(S, 0, 10.5), C.dim, 22);
  const l = P(S, 1, 0.3), x0 = 360, y0 = 820, w = 1200, h = 420, lo = 0.364, hi = 0.402, Y = v => y0 - (v - lo) / (hi - lo) * h;
  if (l > 0) {
    plotAxes(x0, y0, w, h, l, 'returns n', null);
    dashed(x0, Y(0.4), x0 + w, Y(0.4), C.gold, l * 0.7, 2); txt('2/5', x0 + w + 14, Y(0.4) + 8, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.gold, a: l });
    const N = 60, ms = n => { const g = Math.pow(27 / 25, n); return (1 / 3 + 0.4 * g) / (1 + g); };
    const prog = clamp((u - lineAt(S, 1).s - 8) / 7);
    curve(s => [x0 + s * w * prog, Y(ms(s * N * prog))], 80, C.cyan, l, 3);
    for (let n = 0; n <= 3; n++) dot(x0 + n / N * w, Y(ms(n)), 9, 'c', l);
    txt('m₀ = 11/30', x0 + 20, Y(ms(0)) + 40, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.cyan, a: P(S, 1, 8) });
    txt('m₁ − m₀ = 1/780', x0 + 230, Y(ms(1)) + 40, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.green, a: P(S, 1, 11) });
    chip(1200, 690, 560, 56, 'each return: weight ratio × 27/25', C.white, P(S, 1, 4), 22);
  }
};

/* ---- 10 MOVE ---- */
SCENES.move = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const lanes = [['target future', 'T_h', 'T_hw', C.gold, 330], ['predictor', 'D_z', 'D_z′', C.cyan, 560]];
  lanes.forEach(([nm, a1, a2, col, y], k) => { const q = P(S, 0, k ? 5 : 0.3); txt(nm, 300, y + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: q }); chip(560, y, 160, 60, a1, col, q, 26); chip(1260, y, 160, 60, a2, col, q, 26); arrow(650, y, 1170, y, col, q, 3); });
  const mv = P(S, 0, 2);
  txt('control back at the node · the future moved', 910, 280, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: mv });
  eqn('V_h ≥ TV(T_h, T_hw) − e(h) − e(hw)', 960, 700, P(S, 0, 9), C.gold, 30);
  const l = P(S, 1, 0.3);
  eqn('TV(T_h, T_hw) ≥ m_hw − m_h > 0', 960, 780, l, C.green, 26);
  chip(960, 860, 520, 56, 'standing still is never exact', C.red, P(S, 1, 3.8), 22);
};

/* ---- 11 FINITE ---- */
SCENES.finite = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  txt('h₀ (βα)ⁿ  →  m₀ < m₁ < m₂ < …', 960, 230, { size: 28, fam: FG, w: 700, align: 'center', c: C.white, a: s0 });
  const ms = n => { const g = Math.pow(27 / 25, n); return (1 / 3 + 0.4 * g) / (1 + g); };
  const N = 9;
  for (let n = 0; n < N; n++) { const x = 300 + n * 150, q = P(S, 0, 2 + n * 0.6), hgt = (ms(n) - 0.36) / 0.04 * 260; fillBox(x - 40, 560 - hgt, 80, hgt, C.cyan, q * 0.7); txt('m' + String.fromCharCode(0x2080 + n), x, 590, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); const qc = P(S, 0, 6.5 + n * 0.45); box(x - 50, 640, 100, 60, C.gold, qc, 2, 'rgba(0,0,0,0.5)'); txt('cfg ' + n, x, 678, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: qc }); }
  txt('…', 300 + N * 150 - 20, 680, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 10.5) });
  const l = P(S, 1, 0.3);
  chip(960, 780, 640, 58, 'no finite set of configurations is exact', C.red, l, 24);
  chip(960, 860, 640, 52, 'exact prediction only · approximation is another question', C.white, P(S, 1, 3), 20);
};

/* ---- 12 KERNEL ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('p^o = K_o p / q_o ,   q_o = 1ᵀ K_o p', 960, 230, s0, C.white, 28);
  chip(960, 320, 520, 60, 'K_oᵀ V ⊆ V   for every o', C.gold, P(S, 0, 5), 26);
  const l = P(S, 1, 0.3);
  eqn('V_{n+1} = span(V_n ∪ K_oᵀ V_n)', 960, 420, l, C.cyan, 26);
  const g1 = P(S, 1, 2.2);
  if (g1 > 0) {
    txt('five patterns', 520, 520, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: g1 });
    [4, 5, 5, 5].forEach((d, k) => { const q = g1 * clamp((u - lineAt(S, 1).s - 2.2 - k * 0.45) / 0.4); fillBox(340 + k * 100, 820 - d * 50, 70, d * 50, C.green, q * 0.8); txt(String(d), 375 + k * 100, 810 - d * 50, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: q }); });
    txt('closed at 5', 520, 860, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 4) });
  }
  const g2 = P(S, 1, 5.2);
  if (g2 > 0) {
    txt('shared depth, unbounded histories', 1360, 520, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: g2 });
    for (let k = 0; k < 7; k++) { const q = g2 * clamp((u - lineAt(S, 1).s - 5.2 - k * 0.35) / 0.4), d = 2 + k * 1.6; fillBox(1080 + k * 85, Math.max(560, 820 - d * 38), 60, Math.min(260, d * 38), C.mag, q * 0.8); }
    txt('never closes in finite dimension', 1360, 860, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 7.5) });
  }
};

/* ---- 13 QUANTUM ---- */
SCENES.quantum = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), rot = ease(P(S, 1, 0.5, 2.5));
  const st = [[1, C.cyan, 'ρ₊ = (I + Y)/2', 560], [-1, C.mag, 'ρ₋ = (I − Y)/2', 1360]];
  st.forEach(([sg, col, nm, x]) => {
    const ph = sg * Math.PI / 2 + rot * Math.PI / 2;
    bloch42(x, 470, 190, [Math.cos(ph), Math.sin(ph), 0], s0, col);
    txt(nm, x, 230, { size: 26, fam: FG, w: 700, align: 'center', c: col, a: s0 });
    const xr = Math.round(Math.cos(ph) * 100) / 100;
    txt('⟨X⟩ = ' + (Math.abs(xr) < 0.01 ? '0' : xr.toFixed(0)) + '    ⟨Z⟩ = 0', x, 740, { size: 24, fam: FG, w: 700, align: 'center', c: rot > 0.95 ? C.gold : C.white, a: P(S, 0, 4) });
  });
  txt('same X and Z readings', 960, 800, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) * (1 - P(S, 1, 0.3)) });
  eqn('U = e^{−iπZ/4} :   Y ↦ −X', 960, 800, P(S, 1, 0.5), C.gold, 26);
  chip(960, 870, 760, 52, 'a later step reads it, so it cannot be dropped', C.green, P(S, 1, 8.5), 20);
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['SLICE', 'a reading needs κ', C.cyan], ['CLOSE', 'K_oᵀ V ⊆ V', C.gold], ['RETURN', 'control ≠ knowledge', C.mag]];
    items.forEach(([a1, a2, col], i) => { const x = 420 + i * 540, q = P(S, 0, [0.3, 2.5, 5.5][i]) * fade; box(x - 240, 250, 480, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 315, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 365, { size: 22, fam: FG, w: 700, align: 'center', c: C.white, a: q }); });
    txt('NO LEAN BADGE · no frozen declaration for this model', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 0.3) * fade });
    txt('VOLUME · slices · closure · four-corner tilt · return prediction', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 5) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 12) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    const py = pyrTrue(W / 2, 430, 250, t * 0.3, a, { r: 14, fill: 0.08, lab: false });
    if (py.P) { dashed(py.P.L[0], py.P.L[1], W / 2 + 320, 260, C.cyan, a * 0.6, 2); dot(W / 2 + 320, 260, 14, 'c', a); }
    txt('AURIC FIB ATOM PYRAMID XIII', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XIII · 观察更新如何暴露隐藏关系 · TRURETURING FILM 042', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Back at the same node, and still knowing more.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'READ, UPDATE, RETURN', fiber: 'A SUMMARY, NOT A SOURCE', slice: 'CONDITIONAL SLICES', closure: 'WHAT SURVIVES AN UPDATE', tilt: 'THE FOUR-CORNER TILT', covariance: 'SPLITTING THE SPREAD', knowledge: 'CONTROL VS KNOWLEDGE', depth: 'A SHARED DEPTH', rise: 'EACH RETURN TEACHES', move: 'THE PREDICTOR MUST MOVE', finite: 'NO FINITE EXACT OBSERVER', kernel: 'BACKWARD CLOSURE', quantum: 'THE SAME DISCIPLINE', finale: 'LEDGER' });

function poster42() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const py = pyrTrue(500, 500, 300, 0.7, 1, { r: 18, fill: 0.08, lab: false });
  const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'joint' };
  Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 30, { size: 24, fam: F.mono, w: 700, align: 'center', c: NC[k] }));
  dashed(py.P.L[0], py.P.L[1], 860, 300, C.cyan, 0.8, 2.5); dot(860, 300, 18, 'c', 1);
  txt('x = 1  ⟹  (1, κ/X, 0)', 1380, 330, { size: 36, fam: FG, w: 700, align: 'center', c: C.green });
  txt('f ℓ_o ∈ V', 1380, 420, { size: 36, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('Δ: 0 → −1/81', 1380, 510, { size: 36, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('m₁ − m₀ = 1/780', 1380, 600, { size: 36, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('K_oᵀ V ⊆ V', 1380, 690, { size: 36, fam: FG, w: 700, align: 'center', c: C.white });
  txt('FIB 原子金字塔 XIII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XIII', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('回 到 同 一 个 位 置 · 不 等 于 回 到 同 一 份 知 识', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 042', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster42;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
