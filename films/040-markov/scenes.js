/* Film 040 — AURIC FIB ATOM PYRAMID XI · 金字塔 XI：局部规则的反演与闭环修正 */

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


/* ---- film 040: local reconstruction helpers ---- */
function chainLegal(N) { const out = []; for (let m = 0; m < (1 << N); m++) { let ok = true; for (let i = 0; i < N - 1; i++) if ((m >> i) & 1 && (m >> (i + 1)) & 1) ok = false; if (ok) out.push(Array.from({ length: N }, (_, i) => (m >> i) & 1)); } return out; }
const CH6 = chainLegal(6);
function binom(n, k) { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; }
/* path of N positions, independent sets of size k: C(N-k+1, k) */
function pathStats(N, lam) { let Z = 0, m1 = 0, m2 = 0; for (let k = 0; k <= N; k++) { const c = binom(N - k + 1, k) * Math.pow(lam, k); Z += c; m1 += k * c; m2 += k * k * c; } const mean = m1 / Z; return { Z, mean, varr: m2 / Z - mean * mean }; }
function chainDots(x0, y, gap, b, a, o = {}) {
  if (a <= 0) return;
  for (let i = 0; i < b.length - 1; i++) line(x0 + i * gap, y, x0 + (i + 1) * gap, y, b[i] && b[i + 1] ? C.red : C.cyan, a * 0.5, 2);
  b.forEach((v, i) => { if (v) dot(x0 + i * gap, y, o.r || 20, o.dn || 'g', a); else ring(x0 + i * gap, y, (o.r || 20) * 0.55, C.dim, a, 2); if (o.lab) txt(String(i + 1), x0 + i * gap, y + 44, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); });
}
function bars(x0, yb, vals, bw, sc, cols, a, labs) {
  if (a <= 0) return;
  vals.forEach((v, i) => { const h = v * sc; fillBox(x0 + i * bw + 6, yb - h, bw - 12, h, cols[i % cols.length], a * 0.8); if (labs) txt(labs[i], x0 + i * bw + bw / 2, yb + 26, { size: 18, fam: F.mono, w: 700, align: 'center', c: cols[i % cols.length], a }); });
  line(x0, yb, x0 + vals.length * bw, yb, C.dim, a, 1.5);
}
const U3 = [2 / 5, 1 / 5, 2 / 5];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2), k = Math.floor(t * 1.2) % CH6.length;
  const um = [0, 1, 2, 3, 4, 5].map(i => CH6.reduce((s, b) => s + b[i], 0) / CH6.length);
  bars(560, 420, um, 120, 420, [C.gold], P(S, 0, 4), um.map(v => v.toFixed(2)));
  txt('how often each position is occupied', 920, 220, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 4) });
  chainDots(620, 560, 120, CH6[k], s0, { lab: true });
  chip(920, 690, 520, 56, 'which source should we rebuild?', C.white, P(S, 0, 10.5), 24);
  const l = P(S, 1, 0.3);
  if (l > 0) for (let i = 0; i < 5; i++) { const x = 620 + i * 120; curve(s => [x + s * 120, 560 - Math.sin(s * Math.PI) * 50], 20, C.green, l * (0.5 + 0.5 * Math.sin(t * 3 - i)), 2.5); }
  chip(920, 780, 560, 52, 'remember only the neighbour', C.green, l, 22);
  chip(920, 850, 560, 52, 'measure the price exactly', C.gold, P(S, 1, 3.8), 22);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2), N = 8, cs = 44, x0 = W / 2 - N * cs / 2, y0 = 220;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const d = Math.abs(i - j), on = d <= 1; box(x0 + j * cs, y0 + i * cs, cs, cs, on ? (d === 0 ? C.gold : C.cyan) : C.dim, rp * (on ? 0.9 : 0.25), 1.5, on ? rgba(d === 0 ? C.gold : C.cyan, 0.15 + 0.1 * Math.sin(t * 2 + i)) : null); }
  chainDots(x0 + cs / 2, y0 + N * cs + 60, cs, CH6.concat(CH6)[Math.floor(t * 1.5) % 13].concat([0, 0]).slice(0, N), rp, { r: 12 });
  txt(scramble('AURIC FIB ATOM PYRAMID XI', rp, 401), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XI · 局 部 规 则 的 反 演 与 闭 环 修 正', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 040 · AURIC_FIB_ATOM_LOCAL_RECONSTRUCTION_AND_LOOP_CORRECTION', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FIBER ---- */
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const py = pyrTrue(420, 560, 320, t * 0.25, s0, { r: 16, fill: 0.06, lab: false });
  if (py.P) { const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'joint' }; Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: NC[k], a: s0 })); }
  txt('X = Y = 2/5,  Z = 1/5', 420, 260, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  eqn('max(0, X+Y+Z−1) ≤ κ ≤ min(X, Y)', 1280, 270, P(S, 0, 7), C.gold, 28);
  const l = P(S, 1, 0.3), x0 = 940, x1 = 1640, ly = 380;
  const kap = 0.2 + 0.2 * Math.sin(t * 0.9), K = l > 0 ? kap : 0.2;
  if (P(S, 0, 7) > 0) {
    const q = P(S, 0, 7); line(x0, ly, x1, ly, C.dim, q, 3); dot(x0, ly, 10, 'w', q); dot(x1, ly, 10, 'w', q);
    txt('0', x0, ly + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt('2/5', x1, ly + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    const px = lerp(x0, x1, 0.5), pq = P(S, 1, 10.5); dot(px, ly, 16, 'n', pq); txt('product: XY/(1−Z) = 1/5', px, ly - 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: pq });
    const kx = lerp(x0, x1, K / 0.4); dot(kx, ly, 14, 'g', l); txt('κ', kx, ly + 60, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: l });
  }
  const pv = [K, 0.4 - K, 0.2, 0.4 - K, K];
  bars(940, 800, pv, 140, 600, [C.white, C.cyan, C.gold, C.mag, C.green], P(S, 0, 3), ['∅', 'low', 'mid', 'high', 'joint']);
  txt('the same three means', 1290, 520, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 3) });
};

/* ---- 03 CHAIN ---- */
SCENES.chain = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), k = Math.floor(t * 1.4) % CH6.length;
  chainDots(330, 360, 130, CH6[k], s0, { lab: true });
  txt('no two neighbours both occupied', 655, 280, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  txt('|Σ₆| = ' + CH6.length + ' = F₈', 655, 470, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) });
  /* pair table */
  const l = P(S, 0, 6), gx = 1200, gy = 340, cs = 160;
  if (l > 0) {
    const cells = [['rᵢ', C.white], ['uᵢ₊₁', C.cyan], ['uᵢ', C.cyan], ['0', C.red]];
    cells.forEach(([s, col], n) => { const i = Math.floor(n / 2), j = n % 2, q = n === 3 ? l : P(S, 1, [7, 1.6, 4.2][n]); box(gx + j * cs, gy + i * cs, cs, cs, col, q, 2, 'rgba(0,0,0,0.45)'); txt(s, gx + j * cs + cs / 2, gy + i * cs + cs / 2 + 12, { size: 34, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
    ['bᵢ₊₁ = 0', 'bᵢ₊₁ = 1'].forEach((s, j) => txt(s, gx + j * cs + cs / 2, gy - 16, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l }));
    ['bᵢ = 0', 'bᵢ = 1'].forEach((s, i) => txt(s, gx - 16, gy + i * cs + cs / 2 + 8, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: l }));
  }
  eqn('rᵢ = 1 − uᵢ − uᵢ₊₁', 1360, 740, P(S, 1, 7.5), C.white, 28);
  chip(655, 640, 520, 52, 'means fix every neighbour table', C.gold, P(S, 0, 6), 22);
};

/* ---- 04 MARKOV ---- */
SCENES.markov = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  for (let i = 0; i < 5; i++) { const x = 260 + i * 220, q = s0 * clamp((u - 0.3 - i * 0.4) / 0.5); box(x, 300, 260, 110, C.cyan, q, 2, 'rgba(0,30,40,0.4)'); txt('Πᵢ(bᵢ, bᵢ₊₁)'.replace('ᵢ', String.fromCharCode(0x2080 + i + 1)), x + 130, 365, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); }
  for (let i = 1; i < 5; i++) { const x = 260 + i * 220, q = P(S, 0, 3); fillBox(x, 300, 40, 110, C.gold, q * 0.35); txt('÷π', x + 20, 440, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); }
  eqn('P*(b) = ∏ Πᵢ(bᵢ, bᵢ₊₁) / ∏ πᵢ(bᵢ)', 960, 540, P(S, 0, 5.5), C.white, 30);
  chip(960, 620, 560, 52, 'legal · every mean right', C.green, P(S, 0, 7.5), 22);
  const l = P(S, 1, 0.3);
  eqn('Tᵢ = [[ rᵢ/(1−uᵢ), uᵢ₊₁/(1−uᵢ) ], [ 1, 0 ]]', 960, 720, l, C.cyan, 26);
  chip(960, 810, 640, 56, 'unique first-order Markov source', C.gold, P(S, 1, 5.5), 24);
};

/* ---- 05 ACTIVITY ---- */
SCENES.activity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('P_w(b) ∝ ∏ wᵢ  over occupied i', 560, 280, s0, C.white, 30);
  eqn('wᵢ = uᵢ(1 − uᵢ) / (rᵢ₋₁ rᵢ)', 560, 380, P(S, 0, 5.5), C.gold, 34);
  const l = P(S, 1, 0.3);
  eqn('𝒵 = ∏(1 − uᵢ) / ∏ rᵢ', 560, 480, l, C.cyan, 30);
  const ex = P(S, 1, 4.5);
  if (ex > 0) {
    ['low', 'mid', 'high'].forEach((s, i) => { const x = 1180 + i * 220; dot(x, 380, 30, ['c', 'g', 'm'][i], ex); txt(s, x, 330, { size: 22, fam: F.mono, w: 700, align: 'center', c: [C.cyan, C.gold, C.mag][i], a: ex }); txt('u = ' + ['2/5', '1/5', '2/5'][i], x, 450, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ex }); txt('w = 1', x, 500, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 7) }); if (i < 2) line(x + 34, 380, x + 186, 380, C.cyan, ex * 0.5, 2); });
    chip(1400, 620, 420, 56, '𝒵 = 5', C.green, P(S, 1, 9), 30);
    txt('five equally likely patterns', 1400, 260, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ex });
  }
};

/* ---- 06 RESPONSE ---- */
SCENES.response = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'lean'], [1, 5.5, 'theory']]);
  const s0 = clamp(u), N = 5, vi = 2;
  for (let i = 0; i < N; i++) { const x = 260 + i * 110, rem = i === vi && P(S, 0, 9) > 0; if (i < N - 1) line(x, 320, x + 110, 320, C.cyan, s0 * (rem || (i + 1 === vi && P(S, 0, 9) > 0) ? 0.15 : 0.6), 2); dot(x, 320, 16, rem ? 'r' : 'c', s0 * (rem ? 0.4 : 1)); txt('λ', x, 290, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 }); }
  eqn('Pr(v occupied) = 1 − 𝒵(V∖v) / 𝒵(V)', 480, 430, P(S, 0, 8.5), C.white, 26);
  const lq = P(S, 0, 1);
  if (lq > 0) { box(140, 500, 680, 120, C.green, lq, 2, 'rgba(0,30,15,0.6)'); txt('LEAN · HardCore.GibbsOccupation', 480, 535, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: lq }); txt('gibbs_vertex_occupied', 480, 575, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 8.5) }); txt('mean_occupation_fluctuation_response', 480, 605, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.3) }); }
  /* response plot on the path of five positions */
  const l = P(S, 1, 0.3), x0 = 1000, y0 = 760, w = 700, h = 380;
  if (l > 0) {
    plotAxes(x0, y0, w, h, l, 'log λ', null);
    const X = s => x0 + s * w, lamOf = s => Math.exp(-3 + 6 * s);
    curve(s => [X(s), y0 - pathStats(N, lamOf(s)).mean / 3 * h], 120, C.cyan, l, 3);
    curve(s => [X(s), y0 - pathStats(N, lamOf(s)).varr / 3 * h * 2], 120, C.gold, l, 4);
    curve(s => { const lam = lamOf(s), e = 1e-4, d = (pathStats(N, lam * (1 + e)).mean - pathStats(N, lam * (1 - e)).mean) / (2 * e); return [X(s), y0 - d / 3 * h * 2]; }, 60, C.white, P(S, 1, 2.5), 1.5);
    txt('⟨n⟩', x0 + w + 16, y0 - pathStats(N, lamOf(1)).mean / 3 * h + 8, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.cyan, a: l });
    txt('Var n  =  λ d⟨n⟩/dλ', x0 + w / 2 + 40, y0 - h - 10, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2.5) });
    txt('path of 5 positions', x0 + 10, y0 - h + 20, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.dim, a: l });
  }
  chip(1350, 850, 680, 50, 'separate activities: every mean, every covariance', C.orange, P(S, 1, 5.5), 20);
};

/* ---- 07 MISSED ---- */
SCENES.missed = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), x0 = 300, w = 1200;
  const hs = 1.0, ht = 0.68;
  box(x0, 300, w * hs, 70, C.cyan, s0, 2, rgba(C.cyan, 0.15)); txt('H(P*)  Markov completion', x0 + 20, 345, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.cyan, a: s0 });
  const q = P(S, 0, 4.5); box(x0, 400, w * ht, 70, C.mag, q, 2, rgba(C.mag, 0.15)); txt('H(P)  true source, same means', x0 + 20, 445, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.mag, a: q });
  const g = P(S, 0, 7.5); if (g > 0) { fillBox(x0 + w * ht, 400, w * (hs - ht), 70, C.gold, g * 0.35); box(x0 + w * ht, 400, w * (hs - ht), 70, C.gold, g, 2.5); txt('D(P ‖ P*)', x0 + w * (hs + ht) / 2, 445, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: g }); }
  const l = P(S, 1, 0.3);
  eqn('D(P ‖ P*) = Σᵢ I(bᵢ₊₁ ; b₁ … bᵢ₋₁ | bᵢ)', 960, 580, l, C.gold, 30);
  if (l > 0) { const xs = [520, 680, 840, 1000, 1160, 1320]; xs.forEach((x, i) => { const col = i < 3 ? C.dim : i === 3 ? C.white : C.green; dot(x, 700, 16, i < 3 ? 'w' : i === 3 ? 'c' : 'n', l * (i < 3 ? 0.5 : 1)); txt(i < 3 ? 'past' : i === 3 ? 'now' : i === 4 ? 'next' : '', x, 750, { size: 18, fam: F.mono, w: 700, align: 'center', c: col, a: l }); }); curve(s => [lerp(680, 1160, s), 700 - Math.sin(s * Math.PI) * 70], 40, C.gold, P(S, 1, 5), 2.5); txt('given now', 920, 610 + 60, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) }); }
  chip(960, 840, 640, 52, '= 0 only for a true Markov source', C.green, P(S, 1, 9.3), 22);
};

/* ---- 08 PARITY ---- */
SCENES.parity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const even = [[0, 0, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 0, 1], [0, 0, 1, 0, 1]];
  const all = []; for (let m = 0; m < 8; m++) all.push([m & 1, 0, (m >> 1) & 1, 0, (m >> 2) & 1]);
  txt('even parity on 1, 3, 5', 480, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  even.forEach((b, i) => chainDots(260, 290 + i * 70, 110, b, P(S, 0, 6 + i * 0.5), { r: 14, dn: 'g' }));
  txt('4 sources · H = log 4', 480, 590, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 9) });
  const l = P(S, 1, 0.3);
  txt('independent 1, 3, 5', 1440, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: l });
  all.forEach((b, i) => chainDots(1220, 280 + i * 44, 110, b, l * clamp((u - lineAt(S, 1).s - 0.3 - i * 0.2) / 0.3), { r: 10, dn: 'c' }));
  txt('8 sources · H = log 8', 1440, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: l });
  const sq = P(S, 1, 4.5);
  chip(960, 720, 700, 52, 'same: positions · neighbour pairs · runs of three', C.white, sq, 20);
  chip(960, 800, 520, 56, 'ΔH = log 2 : a three-way parity', C.red, P(S, 1, 10), 24);
};

/* ---- 09 INVERSE ---- */
SCENES.inverse = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const C1 = [['6', '−2', '1'], ['−2', '4', '−2'], ['1', '−2', '6']], Ci = [['5', '5/2', '0'], ['5/2', '35/4', '5/2'], ['0', '5/2', '5']];
  txt('C = (1/25) ×', 300, 300, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.white, a: s0 });
  mgrid(330, 240, C1, 100, 80, s0, { colf: (v, i, j) => ((i === 0 && j === 2) || (i === 2 && j === 0) ? C.gold : C.white), size: 28 });
  txt('low–high covariance = +1/25', 480, 530, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 8) });
  const l = P(S, 1, 0.3);
  txt('C⁻¹ =', 1180, 300, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.white, a: l });
  mgrid(1210, 240, Ci, 110, 80, l, { colf: (v, i, j) => (Math.abs(i - j) > 1 ? C.red : Math.abs(i - j) === 1 ? C.cyan : C.white), size: 28 });
  txt('low–high entry = 0', 1375, 530, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3) });
  const g = P(S, 1, 6);
  if (g > 0) { [['low', 'c'], ['mid', 'g'], ['high', 'm']].forEach(([s, d], i) => { const x = 700 + i * 260; dot(x, 700, 26, d, g); txt(s, x, 760, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: g }); if (i < 2) { line(x + 30, 700, x + 230, 700, C.cyan, g, 4); txt('1/r = 5/2', x + 130, 680, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: g }); } }); dashed(700, 730, 1220, 730, C.red, g * 0.5, 2); txt('no direct link', 960, 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 10) }); }
};

/* ---- 10 RESIDUALS ---- */
SCENES.residuals = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('E₁ = R₁,   Eᵢ₊₁ = Rᵢ₊₁ + uᵢ₊₁/(1−uᵢ) · Rᵢ', 960, 250, s0, C.white, 28);
  const vars = [['E₁', 'u₁(1−u₁) = 6/25', C.cyan, 6 / 25], ['E₂', 'u₂r₁/(1−u₁) = 2/15', C.gold, 2 / 15], ['E₃', 'u₃r₂/(1−u₂) = 1/5', C.mag, 1 / 5]];
  vars.forEach(([n, s, col], i) => { const q = P(S, 0, 7 + i * 1.2); chip(1450, 360 + i * 80, 520, 56, n + ' :  ' + s, col, q, 22); });
  /* orthogonal box */
  const v = v3(560, 560, 260, 0.6 + t * 0.2, 0.45), L = vars.map(x => Math.sqrt(x[3]) * 1.6);
  const pts = []; for (let m = 0; m < 8; m++) pts.push(v((m & 1) * L[0], ((m >> 1) & 1) * L[1], ((m >> 2) & 1) * L[2]));
  const bq = P(S, 1, 0.3);
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = i ^ j; if (d === 1 || d === 2 || d === 4) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.white, bq * 0.6, 1.5); }
  [[1, C.cyan], [2, C.gold], [4, C.mag]].forEach(([m, col], i) => arrow(pts[0][0], pts[0][1], pts[m][0], pts[m][1], col, P(S, 0, 7 + i * 1.2), 4));
  txt('pairwise orthogonal', 560, 840, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) });
  eqn('det C = ∏ Var(Eᵢ) = ∏ uᵢ / 𝒵', 1450, 680, bq, C.green, 28);
  txt('6/25 · 2/15 · 1/5 = 4/625', 1450, 740, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 4) });
};

/* ---- 11 VOLUME ---- */
SCENES.volume = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('all activities 1:   𝒵 = F(N+2)', 560, 260, s0, C.white, 28);
  eqn('uᵢ = F(i) · F(N−i+1) / F(N+2)', 560, 330, P(S, 0, 7), C.gold, 28);
  const Fb = [0, 1]; for (let i = 0; i < 30; i++) Fb.push(Fb[Fb.length - 1] + Fb[Fb.length - 2]);
  const N = 7; for (let i = 1; i <= N; i++) { const ui = Fb[i] * Fb[N - i + 1] / Fb[N + 2], x = 240 + (i - 1) * 90, h = ui * 500, q = P(S, 0, 8 + i * 0.25); fillBox(x, 640 - h, 70, h, C.gold, q * 0.8); txt(String(Fb[i] * Fb[N - i + 1]), x + 35, 640 - h - 10, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); }
  line(230, 640, 870, 640, C.dim, P(S, 0, 8), 1.5); txt('N = 7, 𝒵 = F₉ = 34', 560, 690, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 8) });
  const l = P(S, 1, 0.3);
  eqn('det C = (F₁ F₂ ... F_N)² / F(N+2)^(N+1)', 1380, 260, l, C.green, 28);
  const dets = [[1, '1/4', 1 / 4], [2, '1/27', 1 / 27], [3, '4/625', 4 / 625], [4, '9/8192', 9 / 8192], [5, '900/4826809', 900 / 4826809]];
  dets.forEach(([n, s, v], i) => { const q = P(S, 1, 3 + i * 0.8), y = 360 + i * 70, hi = n === 3; box(1080, y, 600, 54, hi ? C.green : C.dim, q * (hi ? 1 : 0.6), hi ? 2.5 : 1.2, 'rgba(0,0,0,0.45)'); txt('N = ' + n, 1160, y + 36, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(s, 1380, y + 36, { size: 24, fam: F.mono, w: 700, align: 'center', c: hi ? C.green : C.gold, a: q }); fillBox(1500, y + 14, Math.max(2, 160 + Math.log10(v) * 22), 26, C.cyan, q * 0.6); });
};

/* ---- 12 BOUNDARY ---- */
SCENES.boundary = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), sq = clamp((u - 0.8) / Math.max(1, lineAt(S, 1).e - 1));
  const r = lerp(0.3, 0.01, ease(sq)), u1 = 0.5 - r / 2, u2 = 0.5 - r / 2, u3 = 0.3;
  const Z = (1 - u2) / ((1 - u1 - u2) * (1 - u2 - u3)), det = u1 * u2 * u3 / Z, inv = 1 / r;
  chainDots(560, 320, 200, [0, 0, 0], s0, { r: 24 });
  ['u₁', 'u₂', 'u₃'].forEach((s, i) => txt(s + ' = ' + [u1, u2, u3][i].toFixed(3), 560 + i * 200, 390, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 }));
  fillBox(580, 300, 160 * clamp(r / 0.3), 40, C.red, s0 * 0.5); txt('seam r₁ = ' + r.toFixed(3), 660, 280, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: s0 });
  const yb = 800, bw = 160;
  const dq = P(S, 0, 2), iq = P(S, 1, 0.3);
  if (dq > 0) { const h = det / 0.008 * 300; fillBox(620, yb - h, bw, h, C.green, dq * 0.8); txt('det C', 700, yb + 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: dq }); txt(det.toFixed(5), 700, yb - h - 14, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: dq }); }
  if (iq > 0) { const h = Math.min(330, inv / 100 * 330); fillBox(1120, yb - h, bw, h, C.gold, iq * 0.8); txt('C⁻¹₁₂ = 1/r₁', 1200, yb + 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: iq }); txt(inv.toFixed(1), 1200, yb - h - 14, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: iq }); }
  line(560, yb, 1360, yb, C.dim, s0, 1.5);
  chip(1580, 560, 460, 56, 'one boundary · two faces', C.white, P(S, 1, 7), 24);
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['MEANS → RULE', 'Markov completion · unique', C.cyan], ['WHAT IT MISSES', 'Σ conditional MI', C.gold], ['SKELETON', 'tridiagonal inverse', C.mag]];
    items.forEach(([a1, a2, col], i) => { const x = 420 + i * 540, q = P(S, 0, [0.3, 9, 11.5][i]) * fade; box(x - 240, 250, 480, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 315, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 365, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    txt('LEAN · GibbsOccupation · vertex occupancy · fluctuation response', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 3) * fade });
    txt('VOLUME · inversion · entropy gap · tridiagonal inverse · response volume', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 6) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 12.5) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, N = 7, cs = 40, x0 = W / 2 - N * cs / 2;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const d = Math.abs(i - j); if (d <= 1) box(x0 + j * cs, 230 + i * cs, cs, cs, d ? C.cyan : C.gold, a * 0.9, 1.5, rgba(d ? C.cyan : C.gold, 0.15)); }
    txt('AURIC FIB ATOM PYRAMID XI', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XI · 局部规则的反演与闭环修正 · TRURETURING FILM 040', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Averages give a rule. The rule tells you what it forgot.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'FROM AVERAGES TO RULES', fiber: 'THE KAPPA FIBER', chain: 'THE FIB CHAIN', markov: 'MARKOV COMPLETION', activity: 'ACTIVITIES FROM MEANS', response: 'FLUCTUATION RESPONSE', missed: 'WHAT IT MISSES', parity: 'A HIDDEN PARITY', inverse: 'THE TRIDIAGONAL INVERSE', residuals: 'ORTHOGONAL RESIDUALS', volume: 'RESPONSE VOLUME', boundary: 'SQUEEZING A SEAM', finale: 'LEDGER' });

function poster40() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const N = 8, cs = 56, x0 = 260, y0 = 230;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const d = Math.abs(i - j), on = d <= 1; box(x0 + j * cs, y0 + i * cs, cs, cs, on ? (d ? C.cyan : C.gold) : C.dim, on ? 1 : 0.3, 1.5, on ? rgba(d ? C.cyan : C.gold, 0.2) : null); if (!on) txt('0', x0 + j * cs + cs / 2, y0 + i * cs + cs / 2 + 7, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: 0.5 }); }
  chainDots(x0 + cs / 2, y0 + N * cs + 60, cs, [1, 0, 1, 0, 0, 1, 0, 1], 1, { r: 14 });
  txt('wᵢ = uᵢ(1−uᵢ) / (rᵢ₋₁ rᵢ)', 1390, 330, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('D(P‖P*) = Σ I(next ; past | now)', 1390, 430, { size: 32, fam: FG, w: 700, align: 'center', c: C.white });
  txt('(C⁻¹)ᵢⱼ = 0  for |i − j| > 1', 1390, 520, { size: 34, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('det C = ∏ uᵢ / 𝒵', 1390, 610, { size: 34, fam: FG, w: 700, align: 'center', c: C.green });
  txt('FIB 原子金字塔 XI', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XI', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('从 平 均 值 反 推 规 则 · 再 量 出 它 遗 漏 了 什 么', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 040', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster40;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
