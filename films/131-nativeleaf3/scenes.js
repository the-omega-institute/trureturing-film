/* Film 008 — QUANTUM LEDGER · 量子账本. The project's quantum theory: what a proof checker will sign. */

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

/* ---- film 131: RRO NATIVE LEAF BOUNDARY III · hidden modes, repairs and a serial clock ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN DECLARATION · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · EXACT VALUE NOT DETERMINED', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po131 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po131.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po131.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect63(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const MODES63 = [['∅', [0, 0, 0], 'n', '000'], ['[2]', [1, 0, 0], 'c', '100'], ['[3]', [0, 0, 1], 'g', '010'], ['[5]', [0, 1, 0], 'o', '001'], ['[2,5]', [1, 1, 0], 'm', '101']];
const KEDGE63 = [[0, 1], [0, 2], [0, 3], [1, 4], [3, 4]];
const PEDGE63 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
/* the pyramid with the walk generator K highlighted */
function pyr63(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES63.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE63.forEach(([i, j]) => { const k = KEDGE63.some(([x, y]) => (x === i && y === j) || (x === j && y === i)); if (k && opt.K) line(P[i][0], P[i][1], P[j][0], P[j][1], C.gold, a * opt.K, 3.5); else dashed(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * (opt.K ? 0.3 : 0.8), 1.6); });
  if (opt.labels !== false) MODES63.forEach((m, k) => { dot(P[k][0], P[k][1], 12, m[2], a); lbl(opt.bits ? m[3] : m[0], P[k][0] + (k === 2 ? 0 : 30), P[k][1] + (k === 2 ? -22 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return P;
}
/* a big Omega built from a ring and two feet */
function omega63(cx, cy, r, a, col = C.cyan, lw = 6) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 0.72, Math.PI * 2.28); ctx.stroke();
  const lx = cx + r * Math.cos(Math.PI * 0.72), ly = cy + r * Math.sin(Math.PI * 0.72), rx = cx + r * Math.cos(Math.PI * 2.28), ry = cy + r * Math.sin(Math.PI * 2.28);
  ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx - r * 0.42, ly); ctx.moveTo(rx, ry); ctx.lineTo(rx + r * 0.42, ry); ctx.stroke(); ctx.restore();
}
function bars63(x0, y0, v, bw, gap, hs, a, col, labs, neg = C.red) {
  if (a <= 0) return;
  v.forEach((x, i) => { const xx = x0 + i * (bw + gap); line(xx - 4, y0, xx + bw + 4, y0, C.dim, a, 1.2); if (Math.abs(x) > 1e-9) { const h = x * hs; fillBox(xx, h > 0 ? y0 - h : y0, bw, Math.abs(h), x > 0 ? col : neg, a * 0.5); rect63(xx, h > 0 ? y0 - h : y0, bw, Math.abs(h), x > 0 ? col : neg, a, 1.8); } if (labs) lbl(labs[i], xx + bw / 2, y0 + (x < 0 ? Math.abs(x) * hs + 26 : 26), C.dim, a, 15); });
}
/* ---- film 064 helpers ---- */
function cells64(x, y, s, cw, a, col = C.cyan, hl = {}, size = 26) {
  if (a <= 0) return;
  for (let i = 0; i < s.length; i++) { const c = hl[i] || col; box(x + i * cw, y, cw - 8, cw - 8, c, a, 2, 'rgba(0,0,0,0.45)'); txt(s[i], x + i * cw + (cw - 8) / 2, y + (cw - 8) / 2 + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c, a }); }
}
/* pyramid with the three constrained flips coloured: G1 cyan, G2 gold, G3 magenta */
const GEDGE64 = [[[0, 1], [3, 4]], [[0, 2]], [[0, 3], [1, 4]]];
const GCOL64 = [C.cyan, C.gold, C.mag];
function pyrG64(cx, cy, s, ang, a, on = [1, 1, 1], lab = 1) {
  if (a <= 0) return;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES63.map(m => W3(m[1]));
  fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.1);
  PEDGE63.forEach(([i, j]) => dashed(P[i][0], P[i][1], P[j][0], P[j][1], C.dim, a * 0.35, 1.4));
  GEDGE64.forEach((es, g) => es.forEach(([i, j]) => { if (on[g] > 0) line(P[i][0], P[i][1], P[j][0], P[j][1], GCOL64[g], a * on[g], 4); }));
  MODES63.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(m[3], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -22 : 8), C.white, a * lab, 17, k === 2 ? 'center' : 'left'); });
}
function dial64(cx, cy, r, ang, col, a, lab) {
  if (a <= 0) return;
  ring(cx, cy, r, col, a * 0.7, 2); dashed(cx, cy, cx + r, cy, C.dim, a * 0.6, 1.2);
  const x = cx + r * Math.cos(-ang), y = cy + r * Math.sin(-ang);
  line(cx, cy, x, y, col, a, 3.5); dot(x, y, 9, col === C.gold ? 'g' : col === C.mag ? 'm' : 'c', a);
  if (lab) lblG(lab, cx, cy + r + 40, col, a, 24);
}
/* complete graph on k pentagon nodes, edges given as index pairs with colours */
function kgraph64(cx, cy, r, k, a, edges, labs) {
  if (a <= 0) return;
  const P = []; for (let i = 0; i < k; i++) { const th = -Math.PI / 2 + 2 * Math.PI * i / k; P.push([cx + r * Math.cos(th), cy + r * Math.sin(th)]); }
  edges.forEach(([i, j, col, q]) => { if (q > 0) line(P[i][0], P[i][1], P[j][0], P[j][1], col, a * q, 3); });
  P.forEach((p, i) => { ring(p[0], p[1], 20, C.white, a, 2); lbl(labs ? labs[i] : String(i), p[0], p[1] + 7, C.white, a, 18); });
  return P;
}
const FIB64 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
const BOARD131 = {"terms": ["LL", "RLL", "RR"], "depth": [2, 3, 2], "vals": [[1, 0, 1, 0, 2, 0, 5, 0], [0, 0, 0, 0, 0, 1, 0, 6], [0, 0, 0, 0, 1, 0, 5, 0]]};
const MARK131 = {"t": "('p', 'b', ('p', 'b', 'a'))", "L": 3, "a": 1, "c": 2, "b": 5, "N": 12, "I": 7, "q": 4, "H": 2, "sel": [[1, 1], [1, 3], [2, 1], [2, 3]], "full": 40, "omitted": 36, "terms": ["LLL", "LR", "RLLL", "RLR", "RRL"]};
const GCNT131 = [6414, 83, 463];
const GCNT7_131 = [42229, 331, 2326];
const EX79_131 = [{"g": 1, "N": 7, "rank": 7, "r": 6, "rankImA": 6}, {"g": 2, "N": 7, "rank": 6, "r": 6, "rankImA": 6}, {"g": 3, "N": 8, "rank": 6, "r": 8, "rankImA": 6}];
const QRAT131 = [1.9259259259259258, 1.9615384615384615, 1.9733333333333334, 1.9791666666666667, 1.9696969696969697, 1.9411764705882353, 1.9591836734693877];
const QH131 = [27, 52, 75, 96, 66, 34, 49];
const QLAM131 = 1.969615506024416;
const QWORDS131 = 21845;
const QCOLL131 = [2, 7, 16];
const MASK131 = [[13, 2, 17, 5], [13, 3, 21, 6], [7, 3, 16, 4], [10, 4, 22, 6], [8, 3, 16, 4], [10, 3, 18, 5]];
const CHERRY131 = [[0, 6], [1, 4], [2, 2], [3, 0]];
const COMB131 = [[3, 10, 4, 5, 0], [5, 16, 6, 8, 0], [7, 22, 8, 11, 0], [9, 28, 10, 14, 0]];
const JAC131 = [[0, 0, 1, 2], [1, 1, 0, 8], [2, 1, 2, 14], [3, 3, 2, 32], [4, 5, 6, 62], [5, 11, 10, 128], [6, 21, 22, 254], [7, 43, 42, 512], [8, 85, 86, 1022]];
const FOUR131 = {"N": 11, "M": 14, "H": 3, "bill": {"P": 5, "S": 4, "Read": 11, "Add": 32, "Tick": 10, "Hold": 5}, "sel": 11};
const BWORDS131 = 8191;
/* ---- film 131 helpers: native material trees ---- */
/* term: 'a' | 'b' | ['p', l, r]; cells are addresses over L, R */
function mat131(t, p = '') {
  if (t === 'a') return { cells: [[p, 'a']], edges: [] };
  if (t === 'b') return { cells: [[p, 'b'], [p + 'L', 'm']], edges: [[p, p + 'L']] };
  const l = mat131(t[1], p + 'L'), r = mat131(t[2], p + 'R');
  return { cells: [[p, 'n']].concat(l.cells, r.cells), edges: [[p, p + 'L'], [p, p + 'R']].concat(l.edges, r.edges) };
}
function lay131(t, x0, y0, w, dy) {
  const M = mat131(t), kids = {};
  M.edges.forEach(([u, v]) => { (kids[u] = kids[u] || []).push(v); });
  const nl = M.cells.filter(c => !kids[c[0]]).length, pos = {};
  let li = 0;
  const go = p => {
    const k = kids[p];
    if (!k) { const x = x0 + (li + 0.5) * w / nl; li++; pos[p] = [x, y0 + p.length * dy]; return x; }
    const xs = k.map(go), x = (Math.min(...xs) + Math.max(...xs)) / 2; pos[p] = [x, y0 + p.length * dy]; return x;
  };
  go('');
  return { M, pos, kids };
}
/* o: col(p, kind) -> dot name, ecol(u, v) -> colour, lab(p, kind) -> string, r, ls, ly */
function tree131(t, x0, y0, w, dy, a, o = {}) {
  if (a <= 0) return null;
  const T = lay131(t, x0, y0, w, dy);
  T.M.edges.forEach(([u, v]) => { const [x1, y1] = T.pos[u], [x2, y2] = T.pos[v]; const ec = o.ecol ? o.ecol(u, v) : null; line(x1, y1, x2, y2, ec || C.dim, a * (ec ? 1 : 0.8), ec ? 4 : 2); });
  T.M.cells.forEach(([p, kind]) => {
    const [x, y] = T.pos[p], nm = o.col ? o.col(p, kind) : (kind === 'a' || kind === 'm' ? 'c' : 'w');
    if (nm) dot(x, y, o.r || 10, nm, a);
    if (o.ring && o.ring(p)) ring(x, y, (o.r || 10) + 7, o.ring(p), a, 2.5);
    if (o.lab) { const s = o.lab(p, kind); if (s !== null && s !== undefined && s !== '') lbl(String(s), x + (o.lx || 0), y + (o.ly || 30), o.lc ? o.lc(p, kind) : C.white, a, o.ls || 14); }
  });
  return T;
}
const U7_131 = ['p', 'b', ['p', 'b', 'a']];
const U3_131 = ['p', 'b', ['p', 'b', 'b']];
const T2_131 = ['p', ['p', 'b', 'b'], ['p', 'b', 'b']];
const isTerm131 = k => k === 'a' || k === 'm';
function grid131(x, y, cw, ch, vals, a, colf, labf, size = 16) {
  if (a <= 0) return;
  vals.forEach((row, i) => row.forEach((v, j) => { const col = colf(v, i, j); box(x + j * cw, y + i * ch, cw - 6, ch - 6, col, a, 1.4, 'rgba(0,0,0,0.45)'); const s = labf(v, i, j); if (s !== '') lbl(s, x + j * cw + (cw - 6) / 2, y + i * ch + (ch - 6) / 2 + size * 0.36, col, a, size); }));
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  tree131(T2_131, 150, 290, 640, 115, s0, { r: 13, col: (p, k) => isTerm131(k) ? 'c' : (p.length % 2 ? 'g' : 'w') });
  lbl('C(u) : one native material tree', 470, 690, C.dim, s0, 17);
  const items = [['grew a native tree of alpha and beta leaves', 'NATIVE GRAMMAR', 'u ::= α | β | ⟨u, u⟩ ,  no α at an address ending in L', C.cyan],
    ['counted the terminal Reads', 'PARTS ONE AND TWO', 'how many terminal Reads recover the rational field', C.gold],
    ['lets the observer grow the tree', 'GROWTH DURING ACQUISITION', 'P : α → β ,  S : β → ⟨β, α⟩ ,  fresh cells zero', C.green],
    ['leave leaves unread', 'UNREAD SITES', 'two omitted leaves · inherited masks · fresh sensors', C.mag],
    ['read through a serial clock', 'SERIAL CLOCK', 'one leaf per Tick , period L', C.vio]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 122, 860, 106, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 252 + i * 122, col, q, 20); lblG(s, 1360, 297 + i * 122, C.white, q, 23); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  tree131(['p', ['p', 'b', 'b'], ['p', 'b', ['p', 'b', 'b']]], W / 2 - 300, 240, 600, 70, rp, { r: 11, col: (p, k) => isTerm131(k) ? 'c' : (p.length % 2 ? 'g' : 'w'), ecol: (a, b) => ((a === '' && b === 'L') || (a === 'R' && b === 'RR') || (a === 'L' && b === 'LL') || (a === 'LL' && b === 'LLL') || (a === 'LR' && b === 'LRL') || (a === 'RL' && b === 'RLL') || (a === 'RRL' && b === 'RRLL') || (a === 'RRR' && b === 'RRRL')) ? C.gold : null });
  chip(330, 330, 330, 58, 'depth parity', C.cyan, rp, 22); chip(330, 415, 330, 58, 'gcd divisor', C.mag, rp, 22); chip(330, 500, 330, 58, 'one birth', C.green, rp, 22);
  box(1420, 300, 380, 200, C.gold, rp, 2, 'rgba(0,0,0,0.4)'); lbl('perfect matching', 1610, 360, C.gold, rp, 22); lblG('det B = ±1', 1610, 425, C.white, rp, 30); lbl('Tick invertible', 1610, 470, C.dim, rp, 17);
  txt(scramble('NATIVE LEAF III · REPAIRS', rp, 131), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('RRO 原 生 叶 边 界 获 取 第 三 部 · 隐 藏 模 态 、修 复 与 串 行 时 钟', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 131 · RECURSIVE_RELATIONAL_OBSERVATION_NATIVE_LEAF_BOUNDARY_ACQUISITION_III · §§75–109', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 DEPTH PARITY (§76) ---- */
SCENES.grade = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So a binary word stored by Tick and Add', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Start with depth parity', 0.6) * f1;
    tree131(U7_131, 150, 300, 620, 80, q, { r: 13, col: p => (p.length % 2 ? 'g' : 'c'), lab: p => '|' + (p === '' ? 'ε' : p) + '| = ' + p.length, lx: 0, ly: 34, ls: 13, lc: p => (p.length % 2 ? C.gold : C.cyan) });
    lbl('cyan : even depth    gold : odd depth', 460, 270, C.dim, q, 15);
    const eq = Q(S, 0, 'Every material edge changes depth by one', 0.6) * f1;
    chip(460, 640, 720, 56, 'D e_p = (−1)^|p| e_p ,   D A = −A D', C.cyan, eq, 22);
    const gq = Q(S, 0, 'growth keeps old depths', 0.6) * f1;
    chip(460, 715, 720, 56, 'D_s′ E = E D_s ,   D_s H = (−1)^T H D_u', C.green, gq, 22);
    const bq = Q(S, 0, 'so a Read at terminal f sees', 0.6) * f1;
    lbl('reply e_fᵀ Aᵏ e_LL on ⟨β, ⟨β, α⟩⟩ (recomputed)', 1390, 260, C.white, bq, 17);
    const cw = 78, ch = 66, gx = 1100, gy = 300;
    for (let k = 0; k < 8; k++) lbl('k=' + k, gx + 70 + k * cw + cw / 2, gy - 8, C.dim, bq, 14);
    BOARD131.terms.forEach((f, i) => { lbl(f + ' |' + BOARD131.depth[i] + '|', gx + 60, gy + i * ch + 40, C.white, bq, 15, 'right'); });
    grid131(gx + 70, gy + 8, cw, ch, BOARD131.vals, bq, (v, i, j) => ((j - (BOARD131.depth[i] - 2)) % 2 ? C.dim : (v ? C.gold : C.cyan)), v => String(v), 19);
    const rq = Q(S, 0, 'only when k matches', 0.6) * f1;
    chip(1440, 560, 700, 58, 'reply ≠ 0  only if  k ≡ |f| − |e| − T (mod 2)', C.gold, rq, 21);
    lbl('dim cells : forbidden parity , always 0', 1440, 615, C.dim, rq, 15);
    lbl('142 forbidden-parity replies on random grown paths : all 0', 1440, 645, C.dim, rq, 15);
  }
  const q = Q(S, 1, 'So a binary word stored by Tick and Add', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 800, 60, 'length two :  x_w = A² e + d₀ A e + d₁ e', C.white, q, 24);
    const pq = Q(S, 1, 'one of each effective parity', 0.6);
    box(150, 330, 410, 150, C.cyan, pq, 2, 'rgba(0,30,40,0.4)'); lbl('effective even Read', 355, 370, C.cyan, pq, 18); lblG('sees d₁ (and A²e)', 355, 425, C.white, pq, 22);
    box(600, 330, 410, 150, C.gold, pq, 2, 'rgba(40,30,0,0.4)'); lbl('effective odd Read', 805, 370, C.gold, pq, 18); lblG('sees d₀', 805, 425, C.white, pq, 22);
    lbl('missing parity ⇒ flip that digit ⇒ same complete transcript , same report', 580, 520, C.dim, pq, 15);
    const gq = Q(S, 1, 'even if the receiver may grow the tree adaptively', 0.6);
    stamp('TWO READS , EVEN WITH GROWTH', 580, 620, gq, C.red, 28, -0.04);
    const aq = Q(S, 1, 'Two Reads at the advanced field attain this', 0.6);
    box(1100, 270, 680, 470, C.green, aq, 2, 'rgba(0,40,20,0.3)');
    lbl('PAID ORIGIN  P_ε ; S_ε  →  ⟨β, α⟩ ,  I = 2', 1440, 315, C.green, aq, 17);
    tree131(['p', 'b', 'a'], 1260, 350, 360, 70, aq, { r: 12, col: (p, k) => (p === 'LL' ? 'g' : isTerm131(k) ? 'c' : 'w'), lab: p => (p === 'LL' ? 'e' : ''), ly: 32, ls: 16 });
    lbl('Sample2 replies  eᵀ A x_w ,  eᵀ A² x_w', 1440, 560, C.white, aq, 17);
    lbl(BWORDS131 + ' binary words of length ≤ 12 : all pairs distinct', 1440, 595, C.gold, aq, 16);
    lbl('P 1 · S 1 · Read m+2 · Add m+3 · Tick m+2 · Hold m+4', 1440, 650, C.dim, aq, 15);
    lbl('endpoint  A^I x_w = x_(w0^I) , Reset 0', 1440, 685, C.dim, aq, 15);
  }
};

/* ---- 03 MARKED SLICE (§77–78) ---- */
SCENES.mark = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const old = new Set(['', 'L', 'LL', 'R', 'RL', 'RLL', 'RR']);
  const f1 = 1 - Q(S, 1, 'Forward control then returns every old cell', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Next, the marked entrance', 0.6) * f1;
    lbl('entry t = ⟨β, ⟨β, α⟩⟩ ,  arbitrary x', 300, 262, C.white, q, 16);
    tree131(U7_131, 130, 300, 340, 70, q, { r: 10, col: (p, k) => (isTerm131(k) ? 'm' : 'w') });
    const mq = Q(S, 0, 'saves the overwritten leaf values', 0.6) * f1;
    arrow(480, 420, 560, 420, C.dim, mq, 2.5); lbl('mark', 520, 405, C.dim, mq, 14);
    lbl('u = ρ(t) : gold old , cyan fresh', 770, 262, C.white, mq, 16);
    tree131(['p', ['p', 'b', 'a'], ['p', ['p', 'b', 'a'], 'b']], 570, 300, 400, 62, mq, { r: 9, col: (p, k) => (old.has(p) ? (U7_TERMS131.has(p) ? 'm' : 'g') : 'c') });
    lbl('magenta : old terminals , values z saved', 770, 610, C.mag, mq, 14);
    const cq = Q(S, 0, 'leaves b minus one unknown internal coordinates', 0.6) * f1;
    chip(560, 660, 840, 54, 'L = 3 , c = 2 , b = 5 , N = 12 , I = 7 ,  q = |W| = b − 1 = 4', C.gold, cq, 20);
    chip(560, 728, 840, 54, 'marked field  m = m₀ + D h ,  h = x restricted to W', C.white, cq, 20);
    const sq = Q(S, 0, 'A geometry-only choice of exactly b minus one Reads', 0.6) * f1;
    const gx = 1130, gy = 290, cw = 76, ch = 52;
    lbl('candidate rows e_ℓᵀ Aᵏ D ,  k = 0 … I', 1440, 262, C.white, sq, 16);
    MARK131.terms.forEach((s, j) => lbl(s, gx + j * cw + cw / 2 + 40, gy - 4, C.dim, sq, 13));
    for (let k = 0; k <= 7; k++) {
      lbl('k=' + k, gx + 20, gy + 18 + k * ch + 18, C.dim, sq, 13, 'right');
      for (let j = 0; j < 5; j++) {
        const pick = MARK131.sel.some(r => r[0] === k && r[1] === j), col = k === 0 ? C.dim : pick ? C.gold : C.cyan;
        box(gx + 40 + j * cw, gy + 12 + k * ch, cw - 8, ch - 8, col, sq * (pick ? 1 : 0.55), pick ? 2.5 : 1.2, pick ? 'rgba(60,45,0,0.6)' : 'rgba(0,0,0,0.4)');
        if (pick) lbl('✓', gx + 40 + j * cw + (cw - 8) / 2, gy + 12 + k * ch + 31, C.gold, sq, 18);
      }
    }
    lbl('k = 0 rows vanish on W ;  4 selected ,  H = 2', 1440, gy + 12 + 8 * ch + 22, C.gold, sq, 15);
    const fq = Q(S, 0, 'and fewer never suffice', 0.6) * f1;
    chip(1440, 780, 640, 52, 'y = v + M h ,  h = M⁻¹ (y − v)', C.green, fq, 21);
  }
  const q = Q(S, 1, 'Forward control then returns every old cell', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 800, 58, 'g = C (f − A^(I+1) d_ℓ) ,   K C = Id ,   K = [J, AJ, …, A^I J]', C.white, q, 20);
    lbl('round s : Tick ; Add every terminal entry of g_(I−s) ; Hold', 530, 318, C.dim, q, 15);
    chip(530, 380, 800, 58, 'A^(I+1) d_ℓ + Σ A^(I−s) J g_(I−s) = f', C.green, q, 23);
    tree131(['p', ['p', 'b', 'a'], ['p', ['p', 'b', 'a'], 'b']], 250, 450, 560, 56, q, { r: 10, col: p => (old.has(p) ? 'g' : 'c'), lab: p => (old.has(p) ? 'x' : '0'), ly: 4, lx: 22, ls: 15, lc: p => (old.has(p) ? C.gold : C.cyan) });
    const nq = Q(S, 1, 'with no Reset and no inverse Tick', 0.6);
    stamp('NO RESET · NO INVERSE TICK', 530, 770, nq, C.green, 26, -0.03);
    const bq = Q(S, 1, 'Compared with the full window', 0.6);
    const px = 1080, py = 700, ph = 380;
    plotAxes(px, py, 640, ph, bq, '', 'scalar Reads (example)');
    [[MARK131.full, 'full window b(I+1)', C.cyan], [MARK131.q, 'sparse q = b − 1', C.gold]].forEach(([v, lab, col], i) => { const x = px + 90 + i * 280, h = v / 46 * ph; fillBox(x, py - h, 150, h, col, bq * 0.4); rect63(x, py - h, 150, h, col, bq, 1.8); lbl(String(v), x + 75, py - h - 12, col, bq, 24); lbl(lab, x + 75, py + 28, C.dim, bq, 15); });
    const oq = Q(S, 1, 'this omits b times I plus one complete Read transactions', 0.6);
    chip(1400, 785, 720, 52, 'omitted  b(I + 1) − q = bI + 1 = 36', C.gold, oq, 21);
  }
};
const U7_TERMS131 = new Set(['LL', 'RLL', 'RR']);

/* ---- 04 TWO OMITTED LEAVES (§79–80) ---- */
SCENES.divisor = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const path = { RLL: 1, RL: 1, R: -0, RR: -1, RRL: -1 };
  const pv = { RLL: '1', RL: '1', R: '0', RR: '−1', RRL: '−1' };
  const onPath = (a, b) => (a in path && b in path);
  const f1 = 1 - Q(S, 1, 'So the entry field is recoverable exactly when g is one', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'leave two terminals unread', 0.6) * f1;
    lbl('⟨β, ⟨β, β⟩⟩ : omit RLL and RRL', 470, 262, C.white, q, 17);
    const pq = Q(S, 0, 'Let d be their path length', 0.6) * f1;
    tree131(U3_131, 170, 300, 600, 92, q, { r: 13, col: (p, k) => (p === 'RLL' || p === 'RRL' ? 'r' : isTerm131(k) ? 'c' : 'w'), ecol: (a, b) => (pq > 0 && onPath(a, b) ? C.mag : null), ring: p => (p === 'R' && pq > 0 ? C.gold : null) });
    lbl('path d = 4 ,  attachment at j = 2 (R)', 470, 760, C.gold, pq, 17);
    const gq = Q(S, 0, 'and g the gcd of d plus two', 0.6) * f1;
    chip(1350, 270, 780, 58, 'g = gcd( d + 2 , j + 1 : j ∈ 𝒥 )', C.mag, gq, 23);
    lbl('here g = gcd(6, 3) = 3', 1350, 330, C.white, gq, 18);
    const hq = Q(S, 0, 'The hidden space has dimension g minus one', 0.6) * f1;
    chip(1350, 400, 780, 58, 'dim W = g − 1 ,  spec = { 2cos(qπ/g) : 1 ≤ q < g }', C.gold, hq, 21);
    lbl('hidden eigenvalue 1 : path values (1, 1, 0, −1, −1) , zero off the path ; dimension and spectrum checked on all pairs below', 1350, 455, C.dim, hq, 13);
    const T = lay131(U3_131, 170, 300, 600, 92);
    Object.keys(pv).forEach(p => { const [x, y] = T.pos[p]; lbl(pv[p], x + 24, y - 14, C.gold, hq, 17, 'left'); });
    const cq = Q(S, 0, 'with eigenvalues two cosine q pi over g', 0.6) * f1;
    const px = 1010, py = 790, pw = 680, ph = 250, tot = GCNT131[0] + GCNT131[1] + GCNT131[2];
    plotAxes(px, py, pw, ph, cq, '', 'g over 6960 (tree, omitted pair) , 3–6 leaves , log');
    GCNT131.forEach((v, i) => { const h = Math.log10(v) / 4.6 * ph, x = px + 70 + i * 210; fillBox(x, py - h, 120, h, [C.cyan, C.gold, C.mag][i], cq * 0.4); rect63(x, py - h, 120, h, [C.cyan, C.gold, C.mag][i], cq, 1.6); lbl(String(v), x + 60, py - h - 10, C.white, cq, 17); lbl('g = ' + (i + 1), x + 60, py + 26, C.dim, cq, 15); });
  }
  const q = Q(S, 1, 'So the entry field is recoverable exactly when g is one', 0.6, 0.3);
  if (q > 0) {
    box(150, 260, 760, 130, C.cyan, q, 2, 'rgba(0,30,40,0.4)'); lbl('ENTRY x', 530, 300, C.cyan, q, 20); lblG('recoverable  ⇔  g = 1   (N Reads)', 530, 355, C.white, q, 24);
    const cq = Q(S, 1, 'and the advanced current field exactly when g is at most two', 0.6);
    box(150, 420, 760, 130, C.gold, cq, 2, 'rgba(40,30,0,0.4)'); lbl('CURRENT  A^(H+1) x', 530, 460, C.gold, cq, 20); lblG('recoverable  ⇔  g ≤ 2   (r = rank A Reads)', 530, 515, C.white, cq, 22);
    const zq = Q(S, 1, 'because the only hidden mode at g equal two is a zero mode', 0.6);
    lbl('g = 2 : the single hidden eigenvalue 2cos(π/2) = 0 is killed by one Tick', 530, 590, C.dim, zq, 15);
    stamp('g ≥ 3 : CURRENT LOST', 530, 690, zq, C.red, 30, -0.04);
    const rows = [['⟨β,⟨β,α⟩⟩  omit RLL , RR', 0], ['⟨β,⟨β,α⟩⟩  omit LL , RR', 1], ['⟨β,⟨β,β⟩⟩  omit RLL , RRL', 2]];
    lbl('recomputed examples', 1400, 270, C.white, q, 17);
    rows.forEach(([nm, i], k) => { const e = EX79_131[i], qq = Q(S, 1, k === 0 ? 'So the entry field' : k === 1 ? 'at most two' : 'is a zero mode', 0.6), y = 300 + k * 150; box(1040, y, 740, 130, [C.cyan, C.gold, C.mag][i], qq, 1.6, 'rgba(0,0,0,0.45)'); lbl(nm + '  :  g = ' + e.g, 1410, y + 38, [C.cyan, C.gold, C.mag][i], qq, 17); lbl('rank O_S = ' + e.rank + ' of N = ' + e.N + '   ' + (e.rank === e.N ? 'entry ✓' : 'entry ✗'), 1410, y + 75, C.white, qq, 16); lbl('rank on im A = ' + e.rankImA + ' of r = ' + e.r + '   ' + (e.rankImA === e.r ? 'current ✓' : 'current ✗'), 1410, y + 108, C.white, qq, 16); });
  }
};

/* ---- 05 QUATERNARY (§82, §102) ---- */
SCENES.quat = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const ord = ['LL', 'L', '', 'R', 'RL', 'RLL', 'RR'];
  const f1 = 1 - Q(S, 1, 'Freezing rows one at a time', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Quaternary words on the seven-cell tree', 0.6) * f1;
    lbl('⟨β, ⟨β, α⟩⟩ ,  x_w = F_w(A) e_LL ,  digits 0 … 3', 470, 262, C.white, q, 17);
    const hq = Q(S, 0, 'A positive comparison vector', 0.6) * f1;
    tree131(U7_131, 170, 310, 600, 88, q, { r: 13, col: (p, k) => (p === 'LL' ? 'g' : isTerm131(k) ? 'c' : 'w'), lab: p => (hq > 0 ? 'h=' + QH131[ord.indexOf(p)] : ''), ly: 36, ls: 15, lc: () => C.gold });
    chip(470, 680, 740, 58, 'A h ≤ c h ,  c = 95/48 ,  c² = 9025/2304 < 4', C.gold, hq, 22);
    const mq = Q(S, 0, 'so one graded Read always merges two digit strings', 0.6) * f1;
    lbl('4ⁿ digit strings  vs  O(c²ⁿ) integer row values  ⇒  a collision', 470, 745, C.white, mq, 16);
    lbl('recomputed : Read LL , two even digits : ' + QCOLL131[1] + ' values for ' + QCOLL131[2] + ' strings', 470, 780, C.dim, mq, 15);
    const px = 1040, py = 700, pw = 720, ph = 380, yS = v => py - (v - 1.88) / 0.14 * ph;
    plotAxes(px, py, pw, ph, hq, '', '(A h)_v / h_v');
    dashed(px, yS(95 / 48), px + pw, yS(95 / 48), C.gold, hq, 2); lbl('95/48 = 1.979', px + pw - 6, yS(95 / 48) - 12, C.gold, hq, 16, 'right');
    dashed(px, yS(2), px + pw, yS(2), C.red, hq, 1.5); lbl('2', px + pw - 6, yS(2) - 10, C.red, hq, 16, 'right');
    line(px, yS(QLAM131), px + pw, yS(QLAM131), C.cyan, hq * 0.7, 1.4); lbl('λ_max = ' + QLAM131.toFixed(4), px + 10, yS(QLAM131) + 22, C.cyan, hq, 14, 'left');
    QRAT131.forEach((v, i) => { const x = px + 40 + i * 96, h = py - yS(v), qq = clamp(hq * 1.6 - i / 10); fillBox(x, py - h, 60, h, C.mag, qq * 0.4); rect63(x, py - h, 60, h, C.mag, qq, 1.5); lbl(ord[i] === '' ? 'ε' : ord[i], x + 30, py + 26, C.dim, qq, 14); });
  }
  const q = Q(S, 1, 'Freezing rows one at a time', 0.6, 0.3);
  if (q > 0) {
    lbl('every adaptive receiver , at most three Reads', 530, 262, C.white, q, 17);
    const gx = 260, gy = 300, cw = 260, ch = 110;
    lbl('P₀', gx - 40, gy + 62, C.cyan, q, 22); lbl('P₁', gx - 40, gy + ch + 62, C.cyan, q, 22);
    lbl('Q₀', gx + cw / 2, gy - 12, C.gold, q, 22); lbl('Q₁', gx + cw * 1.5, gy - 12, C.gold, q, 22);
    const cq = Q(S, 1, 'two words still collide after any three Reads', 0.6);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const hit = (i === 0 && cq > 0); box(gx + j * cw, gy + i * ch, cw - 12, ch - 12, hit ? C.mag : C.white, q, hit ? 2.5 : 1.4, hit ? 'rgba(50,0,40,0.5)' : 'rgba(0,0,0,0.45)'); lblG('P' + '₀₁'[i] + ' + Q' + '₀₁'[j], gx + j * cw + cw / 2 - 6, gy + i * ch + 60, C.white, q, 22); }
    lbl('Read 1 sees P only , Read 2 sees Q only ; Read 3 sees one factor : fix it , vary the other', 530, gy + 2 * ch + 30, C.dim, q, 14);
    stamp('THREE READS COLLIDE', 530, 640, cq, C.red, 30, -0.04);
    lbl('parity per Read is fixed only after the earlier complete replies', 530, 720, C.dim, cq, 15);
    const aq = Q(S, 1, 'Four Reads at epochs three and four on two leaves suffice', 0.6);
    box(1040, 270, 740, 330, C.green, aq, 2, 'rgba(0,40,20,0.3)');
    lbl('ASSAY (82.4)', 1410, 310, C.green, aq, 18);
    lblG('Tick³ ; Hold ; Read LL ; Read RR ;', 1410, 365, C.white, aq, 22);
    lblG('Tick ; Hold ; Read LL ; Read RR ; Hold', 1410, 410, C.white, aq, 22);
    lbl('four performed scalars Y₄(w) , endpoint A⁴ F_w(A) e', 1410, 460, C.dim, aq, 15);
    lbl(QWORDS131 + ' quaternary words of length ≤ 7 : all Y₄ distinct', 1410, 520, C.gold, aq, 16);
    lbl('P 2 · S 2 · Add m+1 · Tick m+4 · Hold m+4 · Read m+4', 1410, 565, C.dim, aq, 15);
    const sq = Q(S, 1, 'so four is the exact worst case', 0.6);
    stamp('FOUR IS EXACT', 1410, 700, sq, C.green, 34, -0.04);
  }
};

/* ---- 06 ONE-BIRTH REPAIR (§83–84) ---- */
SCENES.repair = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So the fewest successful births', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Return to two omitted labels', 0.6) * f1;
    const dq = Q(S, 0, 'The divisor is always one, two or three', 0.6) * f1;
    const px = 1080, py = 580, pw = 640, ph = 220;
    lbl('every native tree with b ≥ 3 , every omitted pair', 1400, 262, C.white, dq, 16);
    plotAxes(px, py, pw, ph, dq, '', 'pairs by g , 3–7 leaves , log');
    GCNT7_131.forEach((v, i) => { const h = Math.log10(v) / 5 * ph, x = px + 60 + i * 200; fillBox(x, py - h, 120, h, [C.cyan, C.gold, C.mag][i], dq * 0.4); rect63(x, py - h, 120, h, [C.cyan, C.gold, C.mag][i], dq, 1.6); lbl(String(v), x + 60, py - h - 10, C.white, dq, 16); lbl('g = ' + (i + 1), x + 60, py + 26, C.dim, dq, 15); });
    lbl('no other value occurs', 1400, 640, C.gold, dq, 16);
    const aq = Q(S, 0, 'At two, promote an omitted deep alpha', 0.6) * f1;
    lbl('g = 2 : omit LL , RR on ⟨β,⟨β,α⟩⟩', 300, 262, C.gold, aq, 15);
    tree131(U7_131, 140, 290, 320, 62, aq, { r: 9, col: (p, k) => (p === 'LL' || p === 'RR' ? 'r' : isTerm131(k) ? 'c' : 'w') });
    arrow(470, 400, 540, 400, C.gold, aq, 2.5); lbl('P_RR', 505, 385, C.gold, aq, 14);
    tree131(U3_131, 550, 290, 320, 62, aq, { r: 9, col: (p, k) => (p === 'LL' || p === 'RRL' ? 'r' : p === 'RRL' ? 'r' : isTerm131(k) ? 'c' : 'w'), ring: p => (p === 'RRL' ? C.green : null) });
    const bq = Q(S, 0, 'at three, split the owner of an omitted deep beta', 0.6) * f1;
    lbl('g = 3 : omit RLL , RRL on ⟨β,⟨β,β⟩⟩', 300, 550, C.mag, bq, 15);
    tree131(U3_131, 140, 575, 320, 52, bq, { r: 8, col: (p, k) => (p === 'RLL' || p === 'RRL' ? 'r' : isTerm131(k) ? 'c' : 'w') });
    arrow(470, 670, 540, 670, C.mag, bq, 2.5); lbl('S_RL', 505, 655, C.mag, bq, 14);
    tree131(['p', 'b', ['p', ['p', 'b', 'a'], 'b']], 550, 575, 320, 46, bq, { r: 8, col: (p, k) => (p === 'RLLL' || p === 'RRL' ? 'r' : isTerm131(k) ? 'c' : 'w'), ring: p => (p === 'RLLL' ? C.green : null) });
    const oq = Q(S, 0, 'Either birth makes the divisor one', 0.6) * f1;
    chip(1400, 705, 700, 58, 'after the birth :  g = 1', C.green, oq, 24);
    lbl('recomputed : every g = 2 and g = 3 pair above is repaired to 1', 1400, 762, C.dim, oq, 15);
  }
  const q = Q(S, 1, 'So the fewest successful births', 0.6, 0.3);
  if (q > 0) {
    lbl('minimum successful births , worst case over x', 530, 262, C.white, q, 17);
    const gx = 330, gy = 300, cw = 180, ch = 100;
    ['g = 1', 'g = 2', 'g = 3'].forEach((s, j) => lbl(s, gx + j * cw + cw / 2, gy - 8, C.dim, q, 17));
    const eq = Q(S, 1, 'for the entry report', 0.6), cq = Q(S, 1, 'for the current field', 0.6);
    lbl('entry report', gx - 20, gy + 60, C.cyan, eq, 17, 'right'); lbl('current field', gx - 20, gy + ch + 60, C.gold, cq, 17, 'right');
    [[0, 1, 1], [0, 0, 1]].forEach((r, i) => r.forEach((v, j) => { const qq = i ? cq : eq, col = v ? C.mag : C.green; box(gx + j * cw, gy + 10 + i * ch, cw - 14, ch - 14, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(String(v), gx + j * cw + (cw - 14) / 2, gy + 10 + i * ch + 56, col, qq, 34); }));
    const lq = Q(S, 1, 'Births confined to readable cones', 0.6);
    box(150, 560, 760, 200, C.red, lq, 2, 'rgba(40,0,10,0.35)');
    lbl('births only in cones of readable terminals', 530, 600, C.red, lq, 18);
    lblG('B₁ E η = E A η  for every hidden η', 530, 650, C.white, lq, 22);
    lbl('entry stays lost at g > 1 , current at g = 3 , for any number of births', 530, 700, C.dim, lq, 15);
    const rq = Q(S, 1, 'never repair these defects', 0.6);
    box(1040, 270, 740, 400, C.green, rq * 0.9 + lq * 0.1, 2, 'rgba(0,40,20,0.3)');
    lbl('AFTER THE REPAIR (§84)', 1410, 315, C.green, rq, 18);
    lblG('N Reads :  x = R_e⁻¹ y ,  d = B^(H_e) E x', 1410, 375, C.white, rq, 21);
    lblG('optional return :  c = K⁻¹ (E x − B^L d)', 1410, 435, C.white, rq, 21);
    lbl('M Adds , L Ticks , L + 1 Holds , no omitted port', 1410, 480, C.dim, rq, 15);
    lblG('g = 3 current : r Reads , one split', 1410, 540, C.white, rq, 21);
    lbl('recomputed : ⟨β,⟨β,β⟩⟩ split at RL , N = 8 → M = 10 , rank O′E = 8', 1410, 610, C.dim, rq, 14);
  }
};

/* ---- 07 ARBITRARY MASK (§87–88) ---- */
SCENES.mask = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'That tree has at most N plus five times k minus one cells', 0.6);
  const P = { p: [420, 340], pL: [320, 450], pR: [560, 450], pLL: [240, 560], pLR: [420, 560], pLLL: [240, 670] };
  const E = [['p', 'pL'], ['p', 'pR'], ['pL', 'pLL'], ['pL', 'pLR'], ['pLL', 'pLLL']];
  if (f1 > 0) {
    const q = Q(S, 0, 'An inherited mask may hide any k labels', 0.6) * f1;
    const rq = Q(S, 0, 'Replace each chosen masked leaf by a short native chain', 0.6) * f1;
    lbl('beta owner p :  S_p ; S_pL   (alpha : P_p , then the same)', 420, 250, C.white, rq, 16);
    line(420, 280, 420, 340, C.dim, rq, 2); lbl('old parent', 440, 300, C.dim, rq, 13, 'left');
    E.forEach(([a, b]) => line(P[a][0], P[a][1], P[b][0], P[b][1], C.dim, rq, 2.5));
    const fq = Q(S, 0, 'the allowed terminals then zero-force', 0.6) * f1;
    [['pR', 'p'], ['pLR', 'pL'], ['pL', 'pLL'], ['pLL', 'pLLL']].forEach(([a, b], i) => { const qq = clamp(fq * 2 - i * 0.3); if (qq > 0) { const [x1, y1] = P[a], [x2, y2] = P[b]; arrow(x1 + (x2 - x1) * 0.15, y1 + (y2 - y1) * 0.15, x1 + (x2 - x1) * 0.75, y1 + (y2 - y1) * 0.75, C.gold, qq, 3.5); } });
    Object.entries(P).forEach(([k, [x, y]]) => { const nm = k === 'pLLL' ? 'r' : (k === 'pR' || k === 'pLR') ? 'n' : 'w'; dot(x, y, 14, nm, rq); lbl(k, x + 24, y + 6, nm === 'r' ? C.red : nm === 'n' ? C.green : C.white, rq, 16, 'left'); });
    lbl('red : masked label moves to pLLL   green : fresh readable', 420, 730, C.dim, rq, 14);
    lbl('gold : forcing  pR→p , pLR→pL , pL→pLL , pLL→pLLL', 420, 760, C.gold, fq, 14);
    chip(1350, 270, 780, 58, 'M = N + 4q + a_Z ,   s = b − k + 2q', C.cyan, q, 23);
    const lq = Q(S, 0, 'even leaving one mask unreplaced', 0.6) * f1;
    chip(1350, 345, 780, 54, 'leave one mask :  q = k − 1', C.gold, lq, 22);
    lbl('recomputed random masks (zero forcing and full rank checked)', 1350, 410, C.white, fq, 16);
    ['N', 'k', 'M', 's'].forEach((h, j) => lbl(h, 1120 + j * 150, 450, C.dim, fq, 17));
    MASK131.forEach((r, i) => r.forEach((v, j) => { const qq = clamp(fq * 2 - i / 6); lbl(String(v), 1120 + j * 150, 490 + i * 42, j === 2 ? C.gold : C.white, qq, 19); }));
  }
  const q = Q(S, 1, 'That tree has at most N plus five times k minus one cells', 0.6, 0.3);
  if (q > 0) {
    chip(530, 262, 760, 56, 'M ≤ N + 5 (k − 1)', C.gold, q, 26);
    const px = 170, py = 750, pw = 720, ph = 340, yS = v => py - v / 26 * ph;
    plotAxes(px, py, pw, ph, q, '', 'cells');
    MASK131.forEach((r, i) => { const x = px + 40 + i * 112, qq = clamp(q * 1.6 - i / 8); fillBox(x, yS(r[0]), 36, py - yS(r[0]), C.cyan, qq * 0.4); rect63(x, yS(r[0]), 36, py - yS(r[0]), C.cyan, qq, 1.4); fillBox(x + 40, yS(r[2]), 36, py - yS(r[2]), C.gold, qq * 0.4); rect63(x + 40, yS(r[2]), 36, py - yS(r[2]), C.gold, qq, 1.4); dashed(x - 4, yS(r[0] + 5 * Math.max(r[1] - 1, 0)), x + 80, yS(r[0] + 5 * Math.max(r[1] - 1, 0)), C.red, qq, 1.6); lbl('k=' + r[1], x + 38, py + 26, C.dim, qq, 13); });
    lbl('random masks :  cyan N , gold M , red N + 5(k − 1)', 530, 325, C.dim, q, 14);
    const nq = Q(S, 1, 'Exactly N Reads report the entry', 0.6);
    chip(1350, 300, 780, 60, '(Read, Add, Tick, Hold) = (N, M, H + L, H + L + 2)', C.white, nq, 21);
    lbl('N Reads ; then M allowed-terminal Adds return E x', 1350, 360, C.dim, nq, 15);
    const lq = Q(S, 1, 'the least possible', 0.6);
    chip(1350, 450, 780, 58, 'fewer than N Reads : a common kernel η ≠ 0', C.red, lq, 21);
    lbl('x and x + η follow one complete adaptive transcript', 1350, 505, C.dim, lq, 15);
    stamp('N READS , SHARP', 1350, 610, lq, C.green, 32, -0.04);
    const rq = Q(S, 1, 'return the old cells physically', 0.6);
    lbl('old cells regain x , fresh cells 0 ; topology and moved labels stay', 1350, 700, C.gold, rq, 15);
  }
};

/* ---- 08 FRESH SENSORS (§89–90) ---- */
SCENES.fresh = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'This holds on the zero-extended entrance', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'grow one readable leaf beside each native leaf', 0.6) * f1;
    lbl('alpha p :  P_p ; S_p ,  sensor pR', 300, 262, C.white, q, 16);
    const A = { p: [300, 320], pL: [220, 430], pLL: [220, 540], pR: [380, 430] };
    [['p', 'pL'], ['pL', 'pLL'], ['p', 'pR']].forEach(([a, b]) => line(A[a][0], A[a][1], A[b][0], A[b][1], C.dim, q, 2.5));
    Object.entries(A).forEach(([k, [x, y]]) => { const nm = k === 'p' ? 'g' : k === 'pR' ? 'n' : 'w'; dot(x, y, 13, nm, q); lbl(k, x + 22, y + 6, nm === 'n' ? C.green : nm === 'g' ? C.gold : C.white, q, 15, 'left'); });
    lbl('beta p :  S_p ; S_pL ,  sensor pLR', 740, 262, C.white, q, 16);
    const B = { p: [740, 320], pL: [660, 420], pR: [840, 420], pLL: [600, 520], pLR: [720, 520], pLLL: [600, 620] };
    [['p', 'pL'], ['p', 'pR'], ['pL', 'pLL'], ['pL', 'pLR'], ['pLL', 'pLLL']].forEach(([a, b]) => line(B[a][0], B[a][1], B[b][0], B[b][1], C.dim, q, 2.5));
    Object.entries(B).forEach(([k, [x, y]]) => { const nm = k === 'pL' ? 'g' : k === 'pLR' ? 'n' : 'w'; dot(x, y, 13, nm, q); lbl(k, x + 22, y + 6, nm === 'n' ? C.green : nm === 'g' ? C.gold : C.white, q, 15, 'left'); });
    lbl('gold : old terminal value    green : designated fresh sensor', 530, 690, C.dim, q, 14);
    const cq = Q(S, 0, 'One Tick copies every old terminal value into a sensor', 0.6) * f1;
    chip(530, 750, 800, 54, 'M = N + 3a + 4c ,   C E = 0 ,   C B E = Jᵀ', C.gold, cq, 21);
    const rq = Q(S, 0, 'so the record fixes the entry', 0.6) * f1;
    chip(1350, 290, 780, 60, 'rank (O E) = N', C.green, rq, 26);
    lbl('N Reads , H Ticks , H + 1 Holds , no Add', 1350, 350, C.dim, rq, 15);
    const hq = Q(S, 0, 'and so does the current field after any number of Ticks', 0.6) * f1;
    chip(1350, 430, 780, 60, 'rank (B^h E) = rank (O B^h E) = N   for all h ≥ 0', C.cyan, hq, 21);
    for (let h = 0; h < 6; h++) { const x = 1060 + h * 115, qq = clamp(hq * 2 - h / 6); dot(x, 540, 14, h < 4 ? 'n' : 'c', qq); lbl('h=' + h, x, 585, C.white, qq, 15); }
    lbl('green : rank N recomputed on 9 trees ;  symmetry keeps B^h injective on the entrance', 1350, 630, C.dim, hq, 14);
  }
  const q = Q(S, 1, 'This holds on the zero-extended entrance', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 800, 58, 'injective on B^h E ℚ^N , not on ℚ^M', C.white, q, 23);
    const tq = Q(S, 1, 'On the tree with four beta leaves', 0.6);
    const term = ['p', ['p', ['p', ['p', 'b', 'a'], 'b'], ['p', ['p', 'b', 'a'], 'b']], ['p', ['p', ['p', 'b', 'a'], 'b'], ['p', ['p', 'b', 'a'], 'b']]];
    const vals = { L: '1', R: '−1', LLR: '−1', LRR: '−1', RLR: '1', RRR: '1' };
    lbl('⟨⟨β,β⟩,⟨β,β⟩⟩ after the fresh-sensor growth : M = 27', 530, 340, C.white, tq, 16);
    tree131(term, 140, 380, 780, 66, tq, { r: 8, col: (p, k) => (vals[p] ? (vals[p][0] === '−' ? 'm' : 'g') : (p.endsWith('LR') && p.length === 4) ? 'n' : 'w'), lab: p => vals[p] || '', ly: -14, lx: 16, ls: 15, lc: p => (vals[p] && vals[p][0] === '−' ? C.mag : C.gold) });
    const zq = Q(S, 1, 'a nonzero field is sent to zero by Tick', 0.6);
    chip(1350, 300, 780, 60, 'B h* = 0 ,   C h* = 0 ,   h* ∉ im E', C.red, zq, 24);
    lbl('h* = 1 at L , −1 at R , minus its grandparent at each fresh pR', 1350, 360, C.dim, zq, 15);
    const mq = Q(S, 1, 'missed by every sensor', 0.6);
    stamp('NO AMBIENT INVERSE', 1350, 480, mq, C.red, 32, -0.04);
    lbl('h*ᵀ Bʲ Cᵀ = 0 : sensor Adds cannot reach h* either', 1350, 580, C.dim, mq, 15);
    lbl('the actual fresh-zero entrance is essential', 1350, 620, C.gold, mq, 16);
  }
};

/* ---- 09 GUARDED CHERRIES (§91–92) ---- */
SCENES.cherry = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const G0 = ['p', 'b', ['p', 'b', 'b']], U2 = ['p', G0, ['p', G0, 'a']];
  const masked = new Set(['LRLL', 'LRRL', 'RLRLL', 'RLRRL']), guard = new Set(['LLL', 'RLLL']);
  const f1 = 1 - Q(S, 1, 'So every exact receiver splits each cherry', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A guarded family makes the price exact', 0.6) * f1;
    lbl('U₂ : two modules ⟨β, ⟨β, β⟩⟩ on a right spine , N = 9k + 1 = 19', 520, 262, C.white, q, 16);
    const mq = Q(S, 0, 'Each module has a cherry with both markers masked', 0.6) * f1;
    tree131(U2, 130, 300, 780, 82, q, { r: 11, col: (p, k) => (masked.has(p) ? (mq > 0 ? 'r' : 'c') : guard.has(p) ? 'n' : isTerm131(k) ? 'c' : 'w'), lab: p => ({ LL: 'g₁', LR: 'c₁', LRL: 'ℓ₁', LRR: 'r₁', RLL: 'g₂', RLR: 'c₂', RRR: '' })[p] || '', ly: -14, lx: -20, ls: 14, lc: () => C.gold });
    lbl('red : masked markers m_i , n_i    green : readable guard markers', 520, 760, C.dim, mq, 14);
    const hq = Q(S, 0, 'leaves a hidden space of dimension exactly twice the number of unrepaired cherries', 0.6) * f1;
    chip(1350, 280, 780, 58, 'W_J = ⊕ over unrepaired i of span{ v_i , w_i }', C.gold, hq, 21);
    lbl('v_i = e_ℓ − e_r ,  w_i = e_m − e_n ,  B v_i = w_i ,  B w_i = v_i', 1350, 340, C.dim, hq, 15);
    const px = 1060, py = 760, pw = 640, ph = 290;
    plotAxes(px, py, pw, ph, hq, '', 'dim W_J against repaired |J| , k = 3 (recomputed)');
    CHERRY131.forEach(([j, d], i) => { const x = px + 60 + i * 150, h = d / 6.5 * ph, qq = clamp(hq * 1.6 - i / 6); if (d > 0) { fillBox(x, py - h, 90, h, C.mag, qq * 0.4); rect63(x, py - h, 90, h, C.mag, qq, 1.6); } lbl(String(d), x + 45, py - h - 12, C.white, qq, 22); lbl(String(j), x + 45, py + 26, C.dim, qq, 16); });
    const eq = Q(S, 0, 'with eigenvalues plus and minus one', 0.6) * f1;
    lbl('hidden eigenvalues ±1 : no finite number of Ticks erases them', 1350, 375, C.mag, eq, 15);
  }
  const q = Q(S, 1, 'So every exact receiver splits each cherry', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 800, 60, 'every exact path :  ≥ k splits ,  ≥ 2k fresh cells', C.red, q, 23);
    lbl('an unedited cherry keeps η = v_i + w_i with A η = η , invisible to every allowed Read', 530, 330, C.dim, q, 14);
    lbl('the earliest internal edit must be S_ℓ or S_r ; the branch c_i is not a growth target', 530, 360, C.dim, q, 14);
    const sq = Q(S, 1, 'With all k split', 0.6);
    box(150, 410, 760, 300, C.green, sq, 2, 'rgba(0,40,20,0.3)');
    lbl('ALL k CHERRIES SPLIT (92.1)', 530, 455, C.green, sq, 18);
    lblG('split k ,  fresh 2k ,  M = 11k + 1', 530, 515, C.white, sq, 24);
    lblG('Read 9k + 1 ,  Add 11k + 1', 530, 575, C.white, sq, 24);
    lbl('Tick H + L , Hold H + L + 2 , H , L ≤ 9k', 530, 625, C.dim, sq, 16);
    lbl('allowed s = 2k + 1 ; forcing horizon F = 9k', 530, 665, C.dim, sq, 16);
    const tq = Q(S, 1, 'report and return the entry', 0.6);
    const rows = [[1, 10, 12, 10, 12], [2, 19, 23, 19, 23], [3, 28, 34, 28, 34]];
    ['k', 'N', 'M', 'Read', 'Add'].forEach((h, j) => lbl(h, 1110 + j * 150, 300, C.dim, tq, 18));
    rows.forEach((r, i) => r.forEach((v, j) => lbl(String(v), 1110 + j * 150, 350 + i * 52, j === 0 ? C.gold : C.white, tq, 22)));
    lbl('recomputed for k = 1, 2, 3 : all subsets J , hidden dims and ranks', 1410, 530, C.dim, tq, 15);
    stamp('k SPLITS , SHARP', 1410, 640, tq, C.green, 32, -0.04);
  }
};

/* ---- 10 SERIAL CLOCK (§94–96) ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For even L, plus and minus lambda collide', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'read the leaves one per Tick', 0.6) * f1;
    lbl('one cycle , period L = 6 , b = 4 leaves', 530, 262, C.white, q, 16);
    const x0 = 160, y0 = 360, dx = 60;
    for (let c = 0; c < 2; c++) for (let r = 0; r < 6; r++) { const i = c * 6 + r, x = x0 + i * dx, qq = clamp(q * 2 - i / 14); line(x, y0, x + dx, y0, C.dim, qq, 2); if (r < 4) { dot(x, y0, 12, ['c', 'g', 'm', 'n'][r], qq); lbl('s' + r, x, y0 - 24, C.white, qq, 15); } else { ring(x, y0, 9, C.dim, qq, 2); lbl('wait', x, y0 - 24, C.dim, qq, 13); } lbl('T', x + dx / 2, y0 + 30, C.dim, qq, 13); }
    lbl('cycle n = 0', x0 + 150, y0 + 70, C.dim, q, 14); lbl('cycle n = 1', x0 + 510, y0 + 70, C.dim, q, 14);
    chip(530, 500, 800, 56, 'y_(n,r) = e_(s_r)ᵀ A^(Ln + r) x ,   N cycles ,   endpoint A^(LN) x', C.white, q, 19);
    lbl('N cycles already have the kernel of the infinite record (finite saturation)', 530, 555, C.dim, q, 14);
    const oq = Q(S, 0, 'For odd L the hidden part is the kernel of A', 0.6) * f1;
    chip(530, 640, 800, 60, 'L odd :  ker S_L = ker A ∩ ker e_(s₀)ᵀ', C.gold, oq, 23);
    const cq = Q(S, 0, 'so the current field is always determined', 0.6) * f1;
    lbl('ker A^M ⊇ this kernel , so the endpoint A^M x is decoded exactly', 530, 700, C.green, cq, 15);
    const T = lay131(['p', 'b', ['p', 'b', ['p', 'b', 'a']]], 1080, 300, 640, 100);
    tree131(['p', 'b', ['p', 'b', ['p', 'b', 'a']]], 1080, 300, 640, 100, q, { r: 13, col: (p, k) => (isTerm131(k) ? 'c' : 'w'), lab: (p, k) => ({ LL: 's₀', RLL: 's₁', RRLL: 's₂', RRR: 's₃' })[p] || '', ly: 34, ls: 16, lc: () => C.cyan });
    lbl('comb u₃ : natural order , b = 4', 1400, 262, C.white, q, 16);
  }
  const q = Q(S, 1, 'For even L, plus and minus lambda collide', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 800, 58, 'L even :  λ^L = (−λ)^L ,  D maps E_λ onto E_(−λ)', C.mag, q, 21);
    const bq = Q(S, 1, 'half of all dimensions stay blind forever', 0.6);
    tree131(['p', 'b', ['p', 'b', ['p', 'b', 'a']]], 160, 340, 620, 78, bq, { r: 13, col: p => (p.length % 2 ? 'm' : 'c') });
    lbl('magenta : odd depth = the blind sector , dimension N/2 , det A = ±1', 470, 680, C.mag, bq, 14);
    const lq = Q(S, 1, 'though a later Read would see them', 0.6);
    lbl('yet e_(RLL)ᵀ A^(bR) e_L > 0 : an owed later Read separates them', 470, 720, C.gold, lq, 14);
    const rq = Q(S, 1, 'One extra Tick per cycle removes the blind sector', 0.6);
    const px = 1060, py = 690, pw = 700, ph = 360, yS = v => py - v / 15 * ph;
    plotAxes(px, py, pw, ph, bq, '', 'blind dimension , odd combs m = 3 , 5 , 7 , 9 (recomputed)');
    COMB131.forEach((r, i) => { const x = px + 40 + i * 165, qq = clamp(bq * 1.6 - i / 6); fillBox(x, yS(r[3]), 60, py - yS(r[3]), C.mag, qq * 0.4); rect63(x, yS(r[3]), 60, py - yS(r[3]), C.mag, qq, 1.6); lbl(String(r[3]), x + 30, yS(r[3]) - 10, C.mag, qq, 18); line(x + 70, py, x + 130, py, C.green, rq, 4); lbl('0', x + 100, py - 12, C.green, rq, 18); lbl('N=' + r[1], x + 65, py + 26, C.dim, qq, 14); });
    lbl('magenta L = b    green L = b + 1', px + pw / 2, py - ph - 40, C.dim, bq, 14);
    chip(1410, 790, 700, 52, 'Read bN ,  Tick and Hold bN → (b + 1)N', C.green, rq, 20);
  }
};

/* ---- 11 PERFECT MATCHINGS (§103–104) ---- */
SCENES.complete = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'At a single leaf', 'lean'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'A min-plus recursion over child cones', 0.6);
  const PM = new Set(['|L', 'L|LL', 'LL|LLL', 'LR|LRL', 'RL|RLL', 'R|RR', 'RR|RRL', 'RRL|RRLL', 'RR|RRR', 'RRR|RRRL']);
  if (f1 > 0) {
    const q = Q(S, 0, 'make Tick itself invertible', 0.6) * f1;
    const mq = Q(S, 0, 'exactly when it has a perfect matching', 0.6) * f1;
    const pm = new Set(['|L', 'LL|LLL', 'LR|LRL', 'RL|RLL', 'R|RR', 'RRL|RRLL', 'RRR|RRRL']);
    tree131(['p', ['p', 'b', 'b'], ['p', 'b', ['p', 'b', 'b']]], 140, 300, 680, 72, q, { r: 11, col: (p, k) => (isTerm131(k) ? 'c' : 'w'), ecol: (a, b) => (mq > 0 && pm.has(a + '|' + b) ? C.gold : null) });
    chip(480, 690, 760, 56, 'det B = (−1)^(m/2) with a perfect matching , 0 otherwise', C.gold, mq, 19);
    lbl('gold : the unique perfect matching ; then B⁻¹ is an integer matrix', 480, 745, C.dim, mq, 14);
    const lq = Q(S, 0, 'At a single leaf', 0.6) * f1;
    lbl('exact undominated (promotions , splits) at one leaf', 1400, 262, C.white, lq, 16);
    const gx = 1150, gy = 320, cw = 260, ch = 120;
    lbl('F : perfect', gx + cw / 2, gy - 8, C.cyan, lq, 17); lbl('R : root free', gx + cw * 1.5, gy - 8, C.gold, lq, 17);
    lbl('α', gx - 30, gy + 70, C.white, lq, 28); lbl('β', gx - 30, gy + ch + 70, C.white, lq, 28);
    [['{(1, 0)}', '{(0, 0)}'], ['{(0, 0)}', '{(1, 1)}']].forEach((r, i) => r.forEach((s, j) => { const qq = Q(S, 0, i === 0 ? (j === 0 ? 'costs alpha one promotion' : 'costs alpha nothing') : (j === 0 ? 'and beta nothing' : 'beta one of each'), 0.5) * f1; box(gx + j * cw, gy + 8 + i * ch, cw - 14, ch - 14, j ? C.gold : C.cyan, qq, 2, 'rgba(0,0,0,0.5)'); lblG(s, gx + j * cw + (cw - 14) / 2, gy + 8 + i * ch + 62, C.white, qq, 26); }));
    const bq = Q(S, 0, 'beta one of each', 0.6) * f1;
    lbl('β → ⟨β, α⟩ → ⟨β, β⟩ :  S_p ; P_pR', 1400, 600, C.gold, bq, 17);
    lbl('frozen : NativeGuardedLeafRepair.result', 1400, 640, C.green, lq, 15);
  }
  const q = Q(S, 1, 'A min-plus recursion over child cones', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 800, 58, 'F⟨l,r⟩ = Min( (R_l + F_r) ∪ (F_l + R_r) )', C.cyan, q, 22);
    chip(530, 340, 800, 58, 'R⟨l,r⟩ = Min( F_l + F_r )', C.gold, q, 22);
    const pq = Q(S, 1, 'gives the exact Pareto frontier for every tree', 0.6);
    lbl('every refinement , any depth or interleaving , dominates a normalized leaf repair', 530, 400, C.dim, pq, 14);
    lbl('recomputed : DP frontier = brute force on 14 small terms', 530, 430, C.dim, pq, 14);
    const jq = Q(S, 1, 'Balanced all-beta trees need k promotions and k splits', 0.6);
    chip(530, 520, 800, 60, 'k_h = (2^h − (−1)^h) / 3 ,   P = S = k_h', C.green, jq, 22);
    lbl('M_h = 4·2^h − 1 − (−1)^h :  2 , 8 , 14 , 32 , 62 , 128', 530, 580, C.white, jq, 17);
    lbl('t₀ = β ,  t_(h+1) = ⟨t_h , t_h⟩ ,  b_h = 2^h', 530, 625, C.dim, jq, 15);
    const px = 1060, py = 730, pw = 700, ph = 420, yS = v => py - v / 90 * ph;
    const nq = Q(S, 1, 'k being the Jacobsthal numbers', 0.6);
    plotAxes(px, py, pw, ph, jq, 'h', 'k_h (DP , recomputed)');
    JAC131.forEach((r, i) => { const x = px + 30 + i * 74, qq = clamp(nq * 1.8 - i / 10); fillBox(x, yS(r[1]), 46, py - yS(r[1]), C.green, qq * 0.4); rect63(x, yS(r[1]), 46, py - yS(r[1]), C.green, qq, 1.5); lbl(String(r[1]), x + 23, yS(r[1]) - 10, C.white, qq, 16); lbl(String(r[0]), x + 23, py + 26, C.dim, qq, 15); });
  }
};

/* ---- 12 FOUR VIEWS (§105–107) ---- */
SCENES.views = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Space, Time, Boundary and Memory then recover one another', 0.6);
  const old = new Set(['', 'L', 'LL', 'LLL', 'LR', 'LRL', 'R', 'RL', 'RLL', 'RR', 'RRL']);
  if (f1 > 0) {
    const q = Q(S, 0, 'After completion', 0.6) * f1;
    lbl('⟨⟨β,β⟩,⟨β,β⟩⟩ completed by S_RR ; P_RRR : N = 11 → M = 14', 480, 262, C.white, q, 16);
    tree131(['p', ['p', 'b', 'b'], ['p', 'b', ['p', 'b', 'b']]], 140, 300, 680, 72, q, { r: 11, col: (p, k) => (old.has(p) ? 'g' : 'c') });
    lbl('gold : old cells , value x    cyan : fresh , value 0', 480, 650, C.dim, q, 14);
    const rq = Q(S, 0, 'Reads chosen from geometry alone recover the whole entry', 0.6) * f1;
    chip(1350, 280, 780, 58, 'N = ' + FOUR131.N + ' Reads ,  H = ' + FOUR131.H + ' ,  x = R_e⁻¹ y', C.gold, rq, 23);
    const iq = Q(S, 0, 'and the actual current field is installed', 0.6) * f1;
    chip(1350, 360, 780, 58, 'installed :  w = B^H E x', C.white, iq, 23);
    const bq = Q(S, 0, 'Because B is invertible', 0.6) * f1;
    chip(1350, 450, 780, 58, 'D_h = Eᵀ B^(−h) ,   D_h B^h E = Id   for all h', C.green, bq, 21);
    lbl('recomputed on this completion : det B = ±1 , rank O E = 11', 1350, 505, C.dim, bq, 14);
    const cq = Q(S, 0, 'the entry stays recoverable at every later epoch', 0.6) * f1;
    const b = FOUR131.bill;
    lbl('one run , paid origin included :', 1350, 580, C.white, cq, 16);
    lbl('P ' + b.P + ' · S ' + b.S + ' · Read ' + b.Read + ' · Add ' + b.Add + ' · Tick ' + b.Tick + ' · Hold ' + b.Hold + ' · Reset 0', 1350, 620, C.gold, cq, 17);
  }
  const q = Q(S, 1, 'Space, Time, Boundary and Memory then recover one another', 0.6, 0.3);
  if (q > 0) {
    const V = [['SPACE', 'grown tree , current z', 290, 300, C.cyan], ['TIME', 'E(v) , N measured triples', 710, 300, C.gold], ['BOUNDARY', 'metric , computed germ O z', 290, 560, C.mag], ['MEMORY', 'predictor , raw map', 710, 560, C.green]];
    V.forEach(([h, s, x, y, col]) => { box(x - 170, y - 70, 340, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(h, x, y - 20, col, q, 22); lbl(s, x, y + 25, C.white, q, 15); });
    const aq = Q(S, 1, 'recover one another on this image', 0.6);
    [[462, 300, 538, 300], [538, 300, 462, 300], [290, 372, 290, 488], [290, 488, 290, 372], [710, 372, 710, 488], [710, 488, 710, 372], [462, 560, 538, 560], [538, 560, 462, 560]].forEach(([a1, b1, a2, b2]) => arrow(a1, b1, a2, b2, C.dim, aq, 2.2));
    lbl('every route decodes the same x', 500, 436, C.white, aq, 16);
    const sq = Q(S, 1, 'a fixed script of Ticks and shears', 0.6);
    chip(1350, 290, 780, 58, 'z = W B^H E x ,   D = Eᵀ B^(−H) W⁻¹ ,   D L = Id', C.white, sq, 20);
    lbl('W : product of the script factors B and G , latest on the left', 1350, 345, C.dim, sq, 14);
    const gq = Q(S, 1, 'each shear adding a donor value at a terminal', 0.6);
    chip(1350, 430, 780, 58, 'G = I + e_ℓ e_aᵀ ,   G⁻¹ = I − e_ℓ e_aᵀ', C.gold, gq, 22);
    lbl('Add(ℓ, z_a) ; Hold ; Read(ℓ) → reply z_ℓ + z_a ,  a ≠ ℓ', 1350, 485, C.dim, gq, 15);
    stamp('ROUTES COMMUTE', 1350, 600, gq, C.green, 32, -0.03);
    lbl('fixed phase and retained context ; no inverse physical Tick', 1350, 690, C.dim, gq, 15);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The single-leaf repair costs are a frozen Lean declaration', 'lean'], [1, 'zero forcing and the tree determinant are classical', 'classical'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['PARITY', 'k ≡ |f|−|e|−T', C.cyan, 'Parity survives growth'], ['MARK', 'b − 1 Reads', C.gold, 'marking needs b minus one Reads'], ['DIVISOR', 'dim W = g − 1', C.mag, 'a gcd hides modes'], ['QUATERNARY', 'four Reads', C.green, 'quaternary words need four Reads'], ['REPAIR', 'g → 1', C.red, 'one birth repairs'], ['MASK · SENSOR', 'N Reads', C.vio, 'masks are repaired'],
      ['CHERRY', 'k splits', C.orange, 'cherries set a price'], ['CLOCK', 'N/2 blind', C.mag, 'a clock can alias'], ['MATCHING', 'det = ±1', C.gold, 'matchings make Tick invertible']];
    items.forEach(([a1, a2, col, ph], i) => { const x = (i < 5 ? 280 + i * 340 : 450 + (i - 5) * 340), y = 240 + Math.floor(i / 5) * 140, q = Q(S, 0, ph) * fade; box(x - 150, y, 300, 115, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 45, col, q, 19); lblG(a2, x, y + 90, C.white, q, 21); });
    lbl('LEAN · NativeGuardedLeafRepair.result : α {(1,0)} , {(0,0)} ; β {(0,0)} , {(1,1)} (Lemma 103.3)', W / 2, 560, C.green, Q(S, 1, 'The single-leaf repair costs are a frozen Lean declaration') * fade, 15);
    lbl('CLASSICAL · zero forcing and control (Burgarth et al.) · tree determinant and matchings · PBH and path spectra', W / 2, 600, '#8fbcff', Q(S, 1, 'zero forcing and the tree determinant are classical') * fade, 15);
    lbl('VOLUME · parity converse · b − 1 · divisor spectrum · four Reads · one-birth table · masks · sensors · cherries · clock · frontiers', W / 2, 640, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · 6960 + 44886 omitted pairs · 8191 and 21845 words · random masks · cherry kernels · comb kernels · DP frontiers', W / 2, 680, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    tree131(['p', ['p', 'b', 'b'], ['p', 'b', ['p', 'b', 'b']]], W / 2 - 280, 220, 560, 62, a, { r: 10, col: (p, k) => (isTerm131(k) ? 'c' : (p.length % 2 ? 'g' : 'w')) });
    txt('NATIVE LEAF III · REPAIRS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('RRO 原生叶边界获取 第三部 · 隐藏模态、修复与串行时钟 · TRURETURING FILM 131', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Parity survives growth, a gcd hides modes, one birth repairs them, and a perfect matching makes Tick invertible.', W / 2, 875, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'NATIVE LEAF III', grade: 'DEPTH PARITY', mark: 'MARKED SLICE', divisor: 'TWO OMITTED LEAVES', quat: 'FOUR READS', repair: 'ONE-BIRTH REPAIR', mask: 'INHERITED MASK', fresh: 'FRESH SENSORS', cherry: 'GUARDED CHERRIES', clock: 'SERIAL CLOCK', complete: 'PERFECT MATCHINGS', views: 'FOUR VIEWS', finale: 'LEDGER' });

function poster131() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  tree131(['p', ['p', 'b', 'b'], ['p', 'b', ['p', 'b', 'b']]], 140, 300, 680, 88, 1, { r: 14, col: (p, k) => (isTerm131(k) ? 'c' : (p.length % 2 ? 'g' : 'w')), ecol: (a, b) => (['|L', 'LL|LLL', 'LR|LRL', 'RL|RLL', 'R|RR', 'RRL|RRLL', 'RRR|RRRL'].includes(a + '|' + b) ? C.gold : null) });
  txt('dim W = g − 1 ,  spec 2cos(qπ/g)', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('b − 1 Reads · four Reads · k splits', 1320, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('det B = ±1 ⇔ perfect matching', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('原生叶边界获取 第三部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('NATIVE LEAF III · REPAIRS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('隐 藏 模 态 · 修 复 · 串 行 时 钟', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 131', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster131;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
