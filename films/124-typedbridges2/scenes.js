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

/* ---- film 124: AURIC TYPED BRIDGES II · quantum networks, hidden memory and the RH interface ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN GENERAL THEOREM · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · CONJECTURE OR UNBUILT BRIDGE · NOT PROVED', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po124 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po124.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po124.set(key, off); }
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
/* ---- film 124 data (from verify124.py) ---- */
const HOL124 = [0.2391, 0.2797, 0.2929, 0.2984, 0.3132, 0.3242, 0.3346, 0.3381, 0.3488, 0.3641, 0.3781, 0.3838, 0.3865, 0.3948, 0.4042, 0.4078, 0.411, 0.4184, 0.4229, 0.4316, 0.435, 0.4373, 0.4378, 0.4426, 0.4459, 0.4497, 0.455, 0.4565, 0.4594, 0.4626, 0.4683, 0.472, 0.4784, 0.4819, 0.486, 0.4908, 0.4962, 0.5063, 0.5093, 0.514, 0.5209, 0.5248, 0.5264, 0.5285, 0.5333, 0.5379, 0.5438, 0.5517, 0.5544, 0.5616, 0.5663, 0.5718, 0.5773, 0.5812, 0.586, 0.5925, 0.5938, 0.5967, 0.6009, 0.604, 0.6104, 0.6153, 0.6225, 0.6257, 0.6426, 0.6478, 0.6547, 0.6618, 0.6698, 0.6766, 0.6832, 0.693, 0.7006, 0.7149, 0.724, 0.7432, 0.7523, 0.7717, 0.7972, 0.8999];
const HOLMAX124 = 0.9;
const CURV124 = [["two-point", 2.0, 2.0], ["complete K3", 0.8333, 1.0], ["complete K5", 0.7, 1.0], ["complete K8", 0.625, 1.0], ["cycle C6", 0.0, 1.0]];
const BUD124 = [[74.212, 6.54], [75.242, 4.972], [74.403, 6.524], [70.404, 8.438], [76.647, 7.411], [73.585, 10.056], [83.683, 5.921], [71.745, 7.224], [79.733, 7.945], [74.522, 2.995], [71.078, 6.436], [78.236, 5.515], [70.902, 9.042], [71.557, 5.763], [72.319, 5.236], [74.51, 5.008], [79.069, 4.899], [78.269, 5.723], [77.634, 5.652], [75.812, 5.219], [80.585, 5.436], [73.528, 6.007], [73.302, 6.783], [78.006, 5.909]];
const BUDSRC124 = [26.957, 27.156, 20.098];
const SLDEX124 = [2, -5, 0, -10, 10];
const DEF124 = [[0.0001, 0.30328], [0.0051, 0.27159], [0.0101, 0.24679], [0.0151, 0.22495], [0.0201, 0.20517], [0.0251, 0.18701], [0.0301, 0.17021], [0.0351, 0.15459], [0.0401, 0.14003], [0.0451, 0.12645], [0.0501, 0.11375], [0.0551, 0.1019], [0.0601, 0.09083], [0.0651, 0.08052], [0.0701, 0.07092], [0.0751, 0.06201], [0.08, 0.05376], [0.085, 0.04615], [0.09, 0.03917], [0.095, 0.0328], [0.1, 0.02702], [0.105, 0.02182], [0.11, 0.0172], [0.115, 0.01314], [0.12, 0.00964], [0.125, 0.00668], [0.13, 0.00427], [0.135, 0.0024], [0.14, 0.00107], [0.145, 0.00027], [0.15, 0.0], [0.155, 0.00027], [0.16, 0.00107], [0.165, 0.0024], [0.17, 0.00427], [0.175, 0.00668], [0.18, 0.00964], [0.185, 0.01314], [0.19, 0.0172], [0.195, 0.02182], [0.2, 0.02702], [0.205, 0.0328], [0.21, 0.03917], [0.215, 0.04615], [0.22, 0.05376], [0.2249, 0.06201], [0.2299, 0.07092], [0.2349, 0.08052], [0.2399, 0.09083], [0.2449, 0.1019], [0.2499, 0.11375], [0.2549, 0.12645], [0.2599, 0.14003], [0.2649, 0.15459], [0.2699, 0.17021], [0.2749, 0.18701], [0.2799, 0.20517], [0.2849, 0.22495], [0.2899, 0.24679], [0.2949, 0.27159], [0.2999, 0.30328]];
const DEFK124 = [0, 0.3, 0.15];
const OBS1_124 = [[0.0, 0.0, 0.0], [0.0256, -0.0083, 0.0433], [0.0437, -0.0139, 0.0749], [0.0558, -0.0174, 0.0973], [0.0634, -0.0193, 0.1124], [0.0674, -0.02, 0.1218], [0.0687, -0.0199, 0.1268], [0.0681, -0.0192, 0.1284], [0.066, -0.0182, 0.1274], [0.0628, -0.0169, 0.1246], [0.059, -0.0155, 0.1203], [0.0547, -0.0141, 0.1151], [0.0502, -0.0127, 0.1093], [0.0457, -0.0113, 0.1032], [0.0412, -0.0101, 0.0968], [0.0368, -0.0089, 0.0905], [0.0327, -0.0079, 0.0843], [0.0287, -0.007, 0.0782], [0.025, -0.0062, 0.0724], [0.0216, -0.0055, 0.0668], [0.0185, -0.0049, 0.0616], [0.0156, -0.0044, 0.0567], [0.013, -0.004, 0.0521], [0.0107, -0.0036, 0.0478], [0.0086, -0.0034, 0.0439], [0.0067, -0.0032, 0.0402], [0.0051, -0.003, 0.0368], [0.0036, -0.0029, 0.0337], [0.0023, -0.0028, 0.0309], [0.0012, -0.0028, 0.0282], [0.0003, -0.0027, 0.0258], [-0.0006, -0.0027, 0.0237], [-0.0013, -0.0027, 0.0217], [-0.0019, -0.0028, 0.0198], [-0.0024, -0.0028, 0.0182], [-0.0028, -0.0028, 0.0167], [-0.0031, -0.0028, 0.0153], [-0.0034, -0.0029, 0.014], [-0.0036, -0.0029, 0.0129], [-0.0037, -0.0029, 0.0119], [-0.0038, -0.003, 0.0109]];
const OBS2_124 = [[0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, -0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]];
const LEV124 = [0.0, 0.0, 0.0, 0.51];
const LEVR124 = [0.091, 0.273, 0.724, 2.706];
const LEVR_ODD124 = 0.273;
const MEMC124 = [[0.0001, 6.1266], [0.001, 6.092], [0.005, 5.9408], [0.01, 5.7577], [0.02, 5.4097], [0.05, 4.4982], [0.1, 3.3336], [0.2, 1.8832], [0.3, 1.1011], [0.4, 0.664], [0.6, 0.2615], [0.8, 0.1124]];
const TRI124 = [[5, -6.1715, -6.6556], [7, -4.761, -4.3393], [11, -3.9353, -3.1574], [13, -3.7579, -2.9223], [17, -3.5495, -2.6552], [19, -3.4831, -2.5722], [23, -3.3891, -2.4565], [29, -3.3012, -2.3501], [31, -3.2801, -2.3249], [37, -3.2315, -2.2671], [41, -3.2075, -2.2388], [43, -3.1972, -2.2267], [47, -3.1795, -2.206], [53, -3.1582, -2.1811], [59, -3.1414, -2.1616], [61, -3.1366, -2.156], [67, -3.1239, -2.1413], [71, -3.1167, -2.133], [73, -3.1134, -2.1292], [79, -3.1045, -2.1189], [83, -3.0993, -2.113], [89, -3.0924, -2.105], [97, -3.0846, -2.0961], [101, -3.0812, -2.0921], [103, -3.0796, -2.0903], [107, -3.0765, -2.0868], [109, -3.0751, -2.0852], [113, -3.0724, -2.0821], [127, -3.0642, -2.0728], [131, -3.0622, -2.0705], [137, -3.0595, -2.0673], [139, -3.0586, -2.0663], [149, -3.0546, -2.0618], [151, -3.0538, -2.0609], [157, -3.0518, -2.0586], [163, -3.0498, -2.0564], [167, -3.0486, -2.055], [173, -3.0469, -2.053], [179, -3.0453, -2.0512], [181, -3.0448, -2.0507], [191, -3.0424, -2.048], [193, -3.042, -2.0475], [197, -3.0411, -2.0465], [199, -3.0407, -2.046], [211, -3.0384, -2.0433]];
const TRI7_124 = [0.0, 0.0, 0.2512, 0.2456, 0.2551, 0.0001, 0.248];
const TRICOUNT124 = 8543;
const TRIHL124 = 8591.2;
const SH124 = 2.858249;
const ZANG124 = [0.07072, 0.04756, 0.03998, 0.03286, 0.03036, 0.0266, 0.02444, 0.02308, 0.02083, 0.02009, 0.01888, 0.01772];
const BSY124 = [[0.0, 0.0], [2.0, 0.05178], [4.0, 0.00485], [6.0, -0.0037], [8.0, -0.00278], [10.0, 8e-05], [12.0, 0.00214], [14.0, 0.00072], [16.0, -0.00164], [18.0, -7e-05], [20.0, 0.00106], [22.0, -0.00022], [24.0, 0.0001], [26.0, -0.00063], [28.0, 0.00012], [30.0, 0.00056], [32.0, 1e-05], [34.0, -0.00041], [36.0, 8e-05], [38.0, 1e-05], [40.0, 0.00018], [42.0, -8e-05], [44.0, -0.00026], [46.0, 8e-05], [48.0, 0.00018], [50.0, -0.00012], [52.0, -3e-05], [54.0, -7e-05], [56.0, 0.00011], [58.0, 7e-05], [60.0, -4e-05], [62.0, -0.00013], [64.0, 8e-05], [66.0, 5e-05], [68.0, -3e-05], [70.0, -6e-05], [72.0, -2e-05], [74.0, 4e-05], [76.0, 4e-05], [78.0, -5e-05], [80.0, -7e-05], [82.0, 5e-05], [84.0, 3e-05], [86.0, 0.0], [88.0, -3e-05], [90.0, -4e-05], [92.0, 5e-05], [94.0, 4e-05], [96.0, -5e-05], [98.0, -1e-05], [100.0, 0.0]];
const BSY100124 = 0.0;
const CLK124 = [0.0, 0.18803, 0.32124, 0.42234, 0.50116, 0.56354, 0.61341, 0.65356, 0.68607, 0.71249, 0.73403, 0.75164, 0.76606, 0.77789, 0.78761, 0.79561, 0.80219, 0.80761, 0.81209, 0.81578, 0.81882, 0.82134, 0.82342, 0.82515, 0.82657, 0.82776, 0.82874, 0.82955, 0.83022, 0.83078, 0.83125, 0.83164, 0.83196, 0.83223, 0.83246, 0.83264, 0.8328, 0.83293, 0.83304, 0.83313, 0.83321, 0.83327, 0.83333, 0.83337, 0.83341, 0.83344, 0.83347, 0.83349, 0.83351, 0.83352, 0.83354, 0.83355, 0.83356, 0.83357, 0.83357, 0.83358, 0.83358, 0.83359, 0.83359, 0.83359, 0.83359];
const CLKD0124 = 0.8336;
/* ---- film 124 helpers ---- */
function ell124(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll124(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function series124(px, py, pw, ph, xs, ys, x0, x1, y0, y1, col, a, lw = 3, prog = 1, dash = 0) {
  if (a <= 0) return;
  const n = Math.max(2, Math.floor(xs.length * clamp(prog)));
  const pts = []; for (let i = 0; i < n && i < xs.length; i++) pts.push([px + (xs[i] - x0) / (x1 - x0) * pw, py - (ys[i] - y0) / (y1 - y0) * ph]);
  ctx.save(); ctx.beginPath(); ctx.rect(px - 4, py - ph - 4, pw + 8, ph + 8); ctx.clip();
  if (dash) ctx.setLineDash([9, 8]);
  strokePoly(pts, col, a, lw, false); ctx.restore();
}
function node124(x, y, r, s, col, a, size = 20) { if (a <= 0) return; fillEll124(x, y, r, r, 'rgba(0,0,0,0.65)', a); ring(x, y, r, col, a, 2.5); lbl(s, x, y + size * 0.36, col, a, size); }
function diamond124(x, y, r, col, a) { if (a <= 0) return; const P = [[x, y - r], [x + r, y], [x, y + r], [x - r, y]]; fillPoly(P, col, a * 0.35); strokePoly(P, col, a, 2); }
/* a triangle network: nodes A, B, C and edge sources on the three sides */
function tri124(cx, cy, R, a, opt = {}) {
  if (a <= 0) return null;
  const P = { A: [cx, cy - R], B: [cx - R * 0.87, cy + R * 0.5], C: [cx + R * 0.87, cy + R * 0.5] };
  const mid = (u, v) => [(P[u][0] + P[v][0]) / 2, (P[u][1] + P[v][1]) / 2];
  const src = { AB: mid('A', 'B'), BC: mid('B', 'C'), CA: mid('C', 'A') };
  [['A', 'B'], ['B', 'C'], ['C', 'A']].forEach(([u, v]) => line(P[u][0], P[u][1], P[v][0], P[v][1], C.dim, a * 0.8, 2));
  Object.keys(src).forEach(k => { const p = src[k]; diamond124(p[0], p[1], 15, C.gold, a); if (opt.srcLab !== false) lbl((opt.srcPre || 'ω_') + k, p[0] + (k === 'BC' ? 0 : k === 'AB' ? -26 : 26), p[1] + (k === 'BC' ? 40 : -16), C.gold, a, 17, k === 'BC' ? 'center' : k === 'AB' ? 'right' : 'left'); });
  ['A', 'B', 'C'].forEach(k => node124(P[k][0], P[k][1], 28, k, C.cyan, a, 22));
  if (opt.out) {
    const O = { A: [0, -1], B: [-0.87, 0.5], C: [0.87, 0.5] }, nm = { A: 'a', B: 'b', C: 'c' };
    ['A', 'B', 'C'].forEach(k => { const x = P[k][0] + O[k][0] * 34, y = P[k][1] + O[k][1] * 34, x2 = P[k][0] + O[k][0] * 86, y2 = P[k][1] + O[k][1] * 86; arrow(x, y, x2, y2, C.mag, a * opt.out, 2.5); lbl(nm[k], x2 + O[k][0] * 20, y2 + O[k][1] * 20 + 7, C.mag, a * opt.out, 20); });
  }
  return { P, src };
}
function residueWheel124(cx, cy, R, l, a, adm) {
  if (a <= 0) return;
  ring(cx, cy, R, C.dim, a * 0.7, 1.5);
  for (let r = 0; r < l; r++) { const an = -Math.PI / 2 + TAU * r / l, x = cx + R * Math.cos(an), y = cy + R * Math.sin(an); const ok = adm.indexOf(r) >= 0; dot(x, y, ok ? 10 : 7, ok ? 'g' : 'r', a); lbl(String(r), cx + (R + 22) * Math.cos(an), cy + (R + 22) * Math.sin(an) + 6, ok ? C.green : C.dim, a, 14); }
  lbl('ℓ = ' + l, cx, cy + 7, C.white, a, 18);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyrG64(470, 470, 230, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  lbl('the five-state pyramid', 470, 740, C.dim, Q(S, 0, 'on the five-state pyramid', 0.6), 18);
  const items = [['carries them into quantum networks', 'QUANTUM NETWORKS', 'diagonal sector · channels · triangle sources', C.cyan], ['curvature', 'CURVATURE AND LIMITS', 'Γ₂ ≥ K Γ · four layers of a limit', C.gold], ['hidden memory', 'HIDDEN MEMORY', 'two steps − (one step)² = what leaves and returns', C.mag], ['prime triplets', 'PRIME TRIPLETS', 'pattern 0 , 2 , 6 · a three-body tail ℓ⁻³', C.green], ['the interface with the Riemann hypothesis', 'RH INTERFACE', 'a conditional bridge , not a proof', C.vio]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 222 + i * 124, 860, 108, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 262 + i * 124, col, q, 21); lblG(s, 1360, 306 + i * 124, C.white, q, 24); });
  stamp('MISSING BRIDGES STAY MARKED', 470, 830, Q(S, 0, 'marking every bridge still missing', 0.6), C.vio, 26, -0.04);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 340, 360, 58, 'channels blur', C.cyan, rp, 22); chip(330, 425, 360, 58, 'curvature ≠ non-collapse', C.gold, rp, 20); chip(330, 510, 360, 58, 'compression remembers', C.mag, rp, 21);
  box(1400, 330, 420, 200, C.vio, rp, 2, 'rgba(0,0,0,0.4)'); lbl('the RH interface', 1610, 395, C.vio, rp, 22); lblG('a bridge , still conditional', 1610, 455, C.white, rp, 24);
  txt(scramble('AURIC TYPED BRIDGES II', rp, 124), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 类 型 化 桥 第 二 部 · 量 子 网 络 、隐 藏 记 忆 与 RH 接 口', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 124 · AURIC_FIB_ATOM_TYPED_BRIDGES_AND_ARITHMETIC_TRIANGLE_RH_PIPELINE_CONTINUATION §27–48 · CONTINUATION_II §49–65', W / 2, 115, { size: 14, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
};

/* ---- 02 QUANTUM CARRIER ---- */
SCENES.sector = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On a triangle network', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Put the five probabilities on the diagonal', 0.6) * f1;
    const gx = 150, gy = 250, cw = 66, labs = ['p₀', 'p₂', 'p₃', 'p₅', 'p₂₅'], cols = [C.white, C.cyan, C.gold, C.mag, C.green];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const qq = clamp(q * 1.6 - (i * 5 + j) / 40); const dg = i === j; box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, dg ? cols[i] : C.dim, qq, 1.5, dg ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)'); lbl(dg ? labs[i] : '0', gx + j * cw + 30, gy + i * cw + 40, dg ? cols[i] : C.dim, qq, dg ? 18 : 14); }
    lbl('ι(p) = Σ p_s |s⟩⟨s|', gx + 165, gy + 360, C.white, q, 20);
    const kq = Q(S, 0, 'each stochastic readout lifts', 0.6) * f1;
    arrow(490, 410, 570, 410, C.dim, kq, 2.5);
    box(575, 350, 180, 120, C.gold, kq, 2, 'rgba(40,30,0,0.4)'); lbl('E_W', 665, 400, C.gold, kq, 26); lbl('CPTP', 665, 440, C.dim, kq, 16);
    arrow(760, 410, 820, 410, C.dim, kq, 2.5);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const dg = i === j; box(830 + j * 40, 350 + i * 40, 36, 36, dg ? C.gold : C.dim, kq, 1.3, 'rgba(0,0,0,0.4)'); if (dg) lbl('•', 848 + j * 40, 374 + i * 40, C.gold, kq, 16); }
    lbl('ι(Wp)', 890, 500, C.gold, kq, 18);
    chip(1380, 260, 820, 56, 'K_a,s = √W(a|s) |a⟩⟨s| ,  Σ K*K = I', C.gold, kq, 22);
    chip(1380, 330, 820, 56, 'E_W( ι(p) ) = ι( W p )   exactly', C.gold, Q(S, 0, 'acting exactly as the kernel', 0.6) * f1, 23);
    const dq = Q(S, 0, 'the hidden seam becomes', 0.6) * f1;
    chip(1380, 420, 820, 58, 'D = diag(1, −1, 0, −1, 1) ,  D = D* ,  tr D = 0', C.mag, dq, 22);
    chip(1380, 495, 820, 56, 'ι(p_κ) − ι(p_κ′) = (κ − κ′) D', C.mag, dq, 23);
    const bx = 1080, by = 690, dv = [1, -1, 0, -1, 1];
    dv.forEach((v, i) => { const x = bx + i * 120, h = v * 70; line(x - 10, by, x + 60, by, C.dim, dq, 1.2); if (v) { fillBox(x, h > 0 ? by - h : by, 50, Math.abs(h), v > 0 ? C.mag : C.cyan, dq * 0.45); rect63(x, h > 0 ? by - h : by, 50, Math.abs(h), v > 0 ? C.mag : C.cyan, dq, 1.6); } lbl(['0', '2', '3', '5', '25'][i], x + 25, by + (v < 0 ? 96 : 30), C.dim, dq, 16); });
    lbl('seam direction on the diagonal', 1380, 830, C.dim, dq, 16);
    lbl('recomputed : 200 random kernels — Choi matrix ⪰ 0 , partial trace = I', 150, 660, C.dim, kq, 15, 'left');
  }
  const q = Q(S, 1, 'On a triangle network', 0.6, 0.3);
  if (q > 0) {
    const sq = Q(S, 1, 'three independent edge sources', 0.6), nq = Q(S, 1, 'three local node channels', 0.6);
    tri124(480, 480, 180, q, { out: nq });
    lbl('Ω = ω_AB ⊗ ω_BC ⊗ ω_CA', 480, 700, C.gold, sq, 20);
    const pq = Q(S, 1, 'every output is a probability law', 0.6);
    chip(500, 770, 760, 56, 'P(a,b,c) = tr[ (M_a ⊗ M_b ⊗ M_c) ρ_ABC ] ≥ 0 ,  Σ P = 1', C.mag, pq, 19);
    lbl('recomputed : 60 random networks , two-qubit edge sources , min P = 0.042 , Σ P = 1', 500, 830, C.dim, pq, 15);
    const cq = Q(S, 1, 'classical triangle-local laws form its diagonal subclass', 0.6);
    ell124(1400, 470, 380, 230, C.cyan, cq, 2.5); lbl('quantum triangle-network outputs', 1400, 285, C.cyan, cq, 18);
    ell124(1400, 520, 220, 120, C.green, cq, 2.5); fillEll124(1400, 520, 220, 120, C.green, cq * 0.08);
    lbl('classical triangle-local', 1400, 512, C.green, cq, 18); lbl('= diagonal sources + classical nodes', 1400, 542, C.white, cq, 15);
    lbl('P = Σ μ_AB(α) μ_BC(β) μ_CA(γ) A(a|γ,α) B(b|α,β) C(c|β,γ)', 1400, 745, C.green, cq, 15);
    const iq = Q(S, 1, 'Only this inclusion is proved', 0.6);
    stamp('INCLUSION ONLY', 1400, 352, iq, C.red, 30, -0.04);
    lbl('triangle lift of an arbitrary five-state law : not claimed', 1400, 800, C.dim, iq, 15);
  }
};

/* ---- 03 CHANNELS AND LOOPS ---- */
SCENES.holonomy = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Effective resistance gives', 0.6);
  if (f1 > 0) {
    const dq = Q(S, 0, 'a channel never raises the trace-norm Dirichlet energy', 0.6) * f1;
    chip(530, 260, 860, 58, 'Q(ρ) = Σ_e w_e ‖ρ_u − ρ_v‖₁²  ⇒  Q(E ρ) ≤ Q(ρ)', C.cyan, dq, 21);
    lbl('dual form of the trace norm + Kadison : ‖E(X)‖₁ ≤ ‖X‖₁', 530, 318, C.dim, dq, 15);
    const lq = Q(S, 0, 'around a closed loop', 0.6) * f1;
    const cx = 500, cy = 520, R = 150, P = [0, 1, 2].map(i => [cx + R * Math.cos(-Math.PI / 2 + TAU * i / 3), cy + R * Math.sin(-Math.PI / 2 + TAU * i / 3)]);
    for (let i = 0; i < 3; i++) { const A = P[i], B = P[(i + 1) % 3]; arrow(A[0] + (B[0] - A[0]) * 0.18, A[1] + (B[1] - A[1]) * 0.18, A[0] + (B[0] - A[0]) * 0.82, A[1] + (B[1] - A[1]) * 0.82, C.gold, lq, 3); lbl('E' + ['₁', '₂', '₃'][i], (A[0] + B[0]) / 2 + (i === 0 ? 34 : i === 1 ? 0 : -34), (A[1] + B[1]) / 2 + (i === 1 ? 40 : -6), C.gold, lq, 22); }
    P.forEach(p => node124(p[0], p[1], 22, 'H', C.cyan, lq, 18));
    lbl('Ω_γ = E₃E₂E₁ − id', 690, cy + 8, C.white, lq, 20, 'left');
    const bq = Q(S, 0, 'the holonomy defect is at most', 0.6) * f1;
    chip(530, 780, 860, 60, '‖Ω_γ‖ ≤ ‖E₁ − id‖ + ‖E₂ − id‖ + ‖E₃ − id‖', C.gold, bq, 23);
    const px = 1060, py = 760, pw = 680, ph = 420, yS = v => py - v / 1.15 * ph;
    plotAxes(px, py, pw, ph, bq, '240 random qubit loops (sorted)', '‖Ω_γ‖ / Σ ‖E_k − id‖');
    dashed(px, yS(1), px + pw, yS(1), C.red, bq, 2); lbl('bound = 1', px + pw - 6, yS(1) - 12, C.red, bq, 17, 'right');
    HOL124.forEach((v, i) => dot(px + 10 + i * (pw - 20) / (HOL124.length - 1), yS(v), 5, 'g', clamp(bq * 1.6 - i / 100)));
    lbl('largest observed ratio ' + HOLMAX124.toFixed(2), px + pw - 20, yS(HOLMAX124) + 40, C.gold, bq, 16, 'right');
    [0, 0.5, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, bq, 14, 'right'));
  }
  const q = Q(S, 1, 'Effective resistance gives', 0.6, 0.3);
  if (q > 0) {
    const N = { '0': [300, 620], '2': [620, 620], '25': [620, 340], '5': [300, 340], '3': [150, 790] };
    const E = [['0', '2'], ['2', '25'], ['25', '5'], ['5', '0'], ['0', '3']];
    E.forEach(([a, b]) => line(N[a][0], N[a][1], N[b][0], N[b][1], C.cyan, q, 3));
    Object.keys(N).forEach(k => node124(N[k][0], N[k][1], 26, k, PC[k], q, 19));
    lbl('unit weights on the five-state graph', 460, 270, C.dim, q, 16);
    const rq = Q(S, 1, 'its square root is a metric', 0.6);
    [['R(0,2) = 3/4', 0], ['R(0,25) = 1', 1], ['R(2,5) = 1', 2], ['R(3,25) = 2', 3]].forEach(([s, i]) => lbl(s, 780, 380 + i * 50, C.white, rq, 19, 'left'));
    lbl('√2 ≤ √1 + √1', 780, 600, C.green, rq, 19, 'left');
    chip(1380, 270, 820, 58, 'R_w(u,v) = (e_u − e_v)ᵀ L_w⁺ (e_u − e_v)', C.cyan, q, 22);
    chip(1380, 350, 820, 58, '√R_w is a metric on the vertices', C.green, rq, 23);
    const wq = Q(S, 1, 'raising an edge weight never increases it', 0.6);
    chip(1380, 430, 820, 58, 'w′ ≥ w  ⇒  R_w′ ≤ R_w   (Thomson)', C.gold, wq, 23);
    lbl('recomputed : 300 random weight increases , no resistance went up', 1380, 492, C.dim, wq, 15);
    const gq = Q(S, 1, 'No rule yet assigns weights to channels', 0.6);
    chip(1380, 590, 820, 58, 'w_e = η(E_e) ?   η not specified', C.vio, gq, 23);
    stamp('GRAVITY : STILL A BRIDGE', 1380, 720, Q(S, 1, 'remains a bridge', 0.6), C.vio, 30, -0.04);
  }
};

/* ---- 04 CURVATURE AND LIMITS ---- */
SCENES.curvature = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A limit needs four separate layers', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'If gamma two is at least K times gamma', 0.6) * f1;
    chip(530, 260, 860, 60, 'CD_G(K, ∞) :  Γ₂(f)(x) ≥ K Γ(f)(x)  for all f , x', C.gold, q, 21);
    lbl('Γ(f) = ½(L f² − 2 f L f) ,  Γ₂(f) = ½ L Γ(f) − Γ(f, L f) : finite sums', 530, 318, C.dim, q, 15);
    const gq = Q(S, 0, 'the spectral gap is at least K', 0.6) * f1, eq = Q(S, 0, 'energy decays like', 0.6) * f1, rq = Q(S, 0, 'resistance is at most', 0.6) * f1;
    chip(530, 410, 760, 58, 'λ₁(−L) ≥ K', C.cyan, gq, 25);
    chip(530, 490, 760, 58, 'E(P_t f) ≤ e^(−2Kt) E(f)', C.cyan, eq, 25);
    chip(530, 570, 760, 58, 'R_μ(u,v) ≤ (1/μ_u + 1/μ_v) / K', C.cyan, rq, 25);
    lbl('independent quantum edges : QCD(min_e K_e)', 530, 650, C.dim, rq, 16);
    const px = 1060, py = 720, pw = 700, ph = 380, yS = v => py - v / 2.3 * ph;
    plotAxes(px, py, pw, ph, gq, '', 'recomputed Bakry–Émery K (gold) and gap λ₁ (cyan)');
    CURV124.forEach((r, i) => { const x = px + 40 + i * 132, qq = clamp(gq * 1.6 - i / 8); const hk = r[1] / 2.3 * ph, hl = r[2] / 2.3 * ph; fillBox(x, py - hk, 44, hk, C.gold, qq * 0.45); rect63(x, py - hk, 44, Math.max(hk, 1), C.gold, qq, 1.5); fillBox(x + 50, py - hl, 44, hl, C.cyan, qq * 0.45); rect63(x + 50, py - hl, 44, hl, C.cyan, qq, 1.5); lbl(r[1].toFixed(3), x + 22, py - hk - 10, C.gold, qq, 14); lbl(r[0].replace('complete ', ''), x + 47, py + 28, C.dim, qq, 15); });
    lbl('λ₁ ≥ K in every case', 1410, 790, C.green, rq, 18);
  }
  const q = Q(S, 1, 'A limit needs four separate layers', 0.6, 0.3);
  if (q > 0) {
    const L4 = [['(G)', 'compactness', 'compactness', C.cyan], ['(M)', 'Mosco', 'Mosco convergence', C.gold], ['(L)', 'vanishing jumps', 'vanishing jumps', C.mag], ['(K)', 'Γ-bounds stable', 'stable gradient bounds', C.green]];
    L4.forEach(([h, s, ph, col], i) => { const qq = Q(S, 1, ph, 0.6), x = 120 + i * 430; box(x, 240, 380, 100, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, x + 190, 280, col, qq, 22); lbl(s, x + 190, 320, C.white, qq, 18); if (i < 3) arrow(x + 384, 290, x + 426, 290, C.dim, qq, 2); });
    const tq = Q(S, 1, 'A two-point space keeps curvature two', 0.6);
    box(120, 400, 800, 400, C.gold, tq, 2, 'rgba(40,30,0,0.25)');
    const sep = 280 / (1 + 3 * clamp((u - lineAt(S, 1).s) / Math.max(1, lineAt(S, 1).e - lineAt(S, 1).s) * 1.6 - 0.4));
    dot(520 - sep / 2, 560, 14, 'g', tq); dot(520 + sep / 2, 560, 14, 'g', tq); dashed(520 - sep / 2, 560, 520 + sep / 2, 560, C.gold, tq, 2);
    lbl('d_j(0,1) = 1/j → 0', 520, 520, C.gold, tq, 18);
    lbl('Γ₂ = 2Γ  ⇒  CD(2, ∞) for every j ; gap and semigroup unchanged', 520, 640, C.white, tq, 16);
    stamp('CURVATURE ⇏ NON-COLLAPSE', 520, 730, Q(S, 1, 'while shrinking to a point', 0.6), C.red, 24, -0.04);
    const cq = Q(S, 1, 'complete graphs keep gap one', 0.6);
    box(1000, 400, 800, 400, C.mag, cq, 2, 'rgba(40,0,40,0.25)');
    const xs = [0, 1, 2, 3, 4, 5, 6, 7].map(i => 1080 + i * 92);
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const mx = (xs[i] + xs[j]) / 2, rr = (xs[j] - xs[i]) / 2; ctx.save(); ctx.globalAlpha = cq * 0.35; ctx.strokeStyle = C.mag; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(mx, 590, rr, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.restore(); }
    xs.forEach(x => dot(x, 590, 8, 'm', cq)); line(1080, 610, 1724, 610, C.dim, cq, 1.2); lbl('0', 1080, 636, C.dim, cq, 14); lbl('1', 1724, 636, C.dim, cq, 14);
    lbl('L_j f = f̄ − f : spectrum {0, 1} , jumps stay long', 1400, 680, C.white, cq, 16);
    lbl('E_j(f) = Var f → 1/12 for f(x) = x ,  not ∫ f′² = 1', 1400, 712, C.white, cq, 16);
    stamp('GAP ⇏ LOCAL LIMIT', 1400, 770, Q(S, 1, 'while their limit stays nonlocal', 0.6), C.red, 24, -0.04);
  }
};

/* ---- 05 FISHER BUDGET ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Every channel contracts it', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'quantum and classical Fisher information agree', 0.6) * f1;
    const pv = [0.5, 0.2, 0.1, 0.1, 0.1], nm = ['0', '2', '3', '5', '25'], cols = [C.white, C.cyan, C.gold, C.mag, C.green];
    lbl('ρ_κ = ι(p_κ) ,  p = (0.5 , 0.2 , 0.1 , 0.1 , 0.1)', 530, 260, C.white, q, 19);
    pv.forEach((v, i) => { const x = 200 + i * 135, h = v * 300; fillBox(x, 520 - h, 70, h, cols[i], q * 0.4); rect63(x, 520 - h, 70, h, cols[i], q, 1.5); lbl(nm[i], x + 35, 548, C.dim, q, 16); lbl(v.toFixed(1), x + 35, 510 - h, C.white, q, 15); });
    const sq = Q(S, 0, 'The symmetric logarithmic derivative is d over p', 0.6) * f1;
    lbl('SLD  L_κ = diag(d_s / p_s)', 530, 600, C.gold, sq, 20);
    SLDEX124.forEach((v, i) => { const x = 200 + i * 135, h = v * 9; line(x - 10, 700, x + 80, 700, C.dim, sq, 1.2); if (v) { fillBox(x, h > 0 ? 700 - h : 700, 70, Math.abs(h), v > 0 ? C.gold : C.cyan, sq * 0.45); rect63(x, h > 0 ? 700 - h : 700, 70, Math.abs(h), v > 0 ? C.gold : C.cyan, sq, 1.5); } lbl(String(v), x + 35, v >= 0 ? 690 - h : 700 - h + 22, C.white, sq, 15); });
    const fq = Q(S, 0, 'the quantum Fisher information along the seam', 0.6) * f1;
    chip(1380, 280, 820, 62, 'F_Q(ρ_κ) = 1/p₀ + 1/p₂ + 1/p₅ + 1/p₂₅ = I(κ)', C.gold, fq, 22);
    lbl('example : 2 + 5 + 10 + 10 = 27 ,  state 3 is off the seam', 1380, 342, C.dim, fq, 16);
    chip(1380, 420, 820, 58, 'ds_B² = ¼ I(κ) dκ²', C.gold, fq, 24);
    const aq = Q(S, 0, 'independent nodes add', 0.6) * f1;
    chip(1380, 520, 820, 62, 'F_Q( ⊗_v ρ_v ; κ̇ ) = Σ_v κ̇_v² I_v(κ_v)', C.cyan, aq, 23);
    lbl('cross terms carry tr(ρ_v L_v) = 0', 1380, 582, C.dim, aq, 16);
  }
  const q = Q(S, 1, 'Every channel contracts it', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, 'F_Φ(ρ)( Φ(X) ) ≤ F_ρ(X)   for every channel Φ', C.gold, q, 22);
    lbl('variational form of the SLD Fisher information + Kadison : Φ*(Y²) ⪰ Φ*(Y)²', 530, 318, C.dim, q, 15);
    const nq = Q(S, 1, 'A triangle network may rearrange', 0.6);
    const TN = tri124(420, 600, 150, nq, { out: nq, srcPre: 'I_' });
    if (TN) { lbl(BUDSRC124[0].toFixed(1), TN.src.AB[0] - 30, TN.src.AB[1] + 20, C.gold, nq, 16, 'right'); lbl(BUDSRC124[1].toFixed(1), TN.src.BC[0], TN.src.BC[1] + 64, C.gold, nq, 16); lbl(BUDSRC124[2].toFixed(1), TN.src.CA[0] + 30, TN.src.CA[1] + 20, C.gold, nq, 16, 'left'); }
    const hq = Q(S, 1, 'or hide it in coherences', 0.6);
    lbl('outputs : qubits with off-diagonal coherences', 420, 850, C.mag, hq, 15);
    const px = 1040, py = 760, pw = 720, ph = 420, yS = v => py - v / 100 * ph;
    const bq = Q(S, 1, 'its output never holds more than their sum', 0.6);
    plotAxes(px, py, pw, ph, nq, '24 random networks with FIB sources', 'Fisher information');
    BUD124.forEach((r, i) => { const x = px + 14 + i * 29; rect63(x, yS(r[0]), 20, r[0] / 100 * ph, C.gold, clamp(nq * 1.6 - i / 30), 1.4); const hh = r[1] / 100 * ph; fillBox(x, py - hh, 20, hh, C.mag, bq * 0.7); });
    lbl('gold : source budget Σ I_e ≈ 74', px + 20, py - ph + 34, C.gold, nq, 16, 'left');
    lbl('magenta : output F_Q , at most 14 % of the budget', px + 20, py - ph + 60, C.mag, bq, 16, 'left');
    chip(1400, 850, 720, 52, 'J_out ⪯ diag(J_AB , J_BC , J_CA)', C.green, bq, 22);
  }
};

/* ---- 06 ESCAPE AND PREDICTION ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'On the base of the pyramid', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Prediction is stricter', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Coarse-graining loses relative information', 0.6) * f1;
    chip(530, 260, 860, 60, 'I_O(ρ‖π) = D(ρ‖π) − D(Oρ‖Oπ) ≥ 0', C.cyan, q, 24);
    lbl('quantum relative-entropy data processing for a CPTP coarse-graining O', 530, 320, C.dim, q, 15);
    const bq = Q(S, 0, 'On the base of the pyramid', 0.6) * f1;
    const sx = 200, sy = 400, ss = 200;
    [['0', 0, 1, C.white], ['2', 1, 1, C.cyan], ['5', 0, 0, C.mag], ['25', 1, 0, C.green]].forEach(([s, i, j, col]) => { box(sx + i * ss, sy + j * ss * 0.9, ss - 10, ss * 0.9 - 10, col, bq, 2, 'rgba(0,0,0,0.45)'); lbl('p' + ({ '0': '₀', '2': '₂', '5': '₅', '25': '₂₅' })[s], sx + i * ss + 95, sy + j * ss * 0.9 + 95, col, bq, 26); });
    lbl('x = 0', sx + 95, sy + 390, C.dim, bq, 15); lbl('x = 1', sx + 295, sy + 390, C.dim, bq, 15); lbl('y = 1', sx - 20, sy + 85, C.dim, bq, 15, 'right'); lbl('y = 0', sx - 20, sy + 265, C.dim, bq, 15, 'right');
    lbl('base z = 0 : a 2 × 2 joint law of (x , y)', 800, 420, C.white, bq, 17, 'left');
    lbl('(1 − Z) · D( p_xy|z=0 ‖ p_x|z=0 p_y|z=0 )', 800, 470, C.gold, bq, 18, 'left');
    const zq = Q(S, 0, 'which vanishes exactly when', 0.6) * f1;
    lbl('= 0  ⇔  p₀ p₂₅ = p₂ p₅  ⇔  (1 − Z) κ = X Y', 800, 520, C.green, zq, 18, 'left');
    const px = 1080, py = 820, pw = 680, ph = 250, x0 = DEFK124[0], x1 = DEFK124[1];
    let ym = 0; DEF124.forEach(r => { ym = Math.max(ym, r[1]); });
    plotAxes(px, py, pw, ph, bq, 'κ along one fibre', 'base defect , X = 0.4 , Y = 0.3 , Z = 0.2');
    series124(px, py, pw, ph, DEF124.map(r => r[0]), DEF124.map(r => r[1]), x0, x1, 0, ym * 1.1, C.gold, bq, 3, clamp(bq * 1.3));
    const xk = px + (DEFK124[2] - x0) / (x1 - x0) * pw;
    dot(xk, py, 10, 'g', zq); lbl('κ* = XY/(1 − Z) = 0.15', xk, py - 30, C.green, zq, 16);
  }
  const q = Q(S, 1, 'Prediction is stricter', 0.6, 0.3);
  if (q > 0) {
    const gq = Q(S, 1, 'The coarsest state keeping every future observation', 0.6);
    chip(530, 260, 860, 58, 'x ∼_O y  ⇔  O(F_w x) = O(F_w y)  for every word w', C.cyan, gq, 21);
    chip(530, 335, 860, 58, '∼_O = greatest fixed point of Φ_O', C.cyan, Q(S, 1, 'is a greatest fixed point', 0.6), 23);
    lbl('every exact predictive representation maps onto X/∼_O uniquely', 530, 392, C.dim, gq, 15);
    lbl('recomputed : 40 random systems , refinement = behaviour equivalence', 530, 418, C.dim, gq, 15);
    const wq = Q(S, 1, 'Two laws in one fibre differ after a word w', 0.6);
    chip(530, 500, 860, 60, 'O(F_w p_κ) − O(F_w p_κ′) = (κ − κ′) O A_w d', C.gold, wq, 23);
    const nq = Q(S, 1, 'the first n powers decide', 0.6);
    chip(530, 590, 860, 60, 'O e^(tA) d ≡ 0  ⇔  O A^k d = 0 ,  k = 0 … n − 1', C.green, nq, 22);
    lbl('Cayley–Hamilton ; n = 5 for the five-state carrier', 530, 650, C.dim, nq, 15);
    const px = 1060, py = 780, pw = 700, ph = 400, yS = v => py - (v + 0.04) / 0.2 * ph;
    plotAxes(px, py, pw, ph, wq, 't', 'O e^(tA) d : the three visible coordinates');
    line(px, yS(0), px + pw, yS(0), C.dim, wq * 0.5, 1);
    const ts = OBS1_124.map((r, i) => i * 0.1);
    [[0, C.cyan, 'X'], [1, C.mag, 'Y'], [2, C.gold, 'Z']].forEach(([k, col, nmk]) => { series124(px, py, pw, ph, ts, OBS1_124.map(r => r[k]), 0, 4, -0.04, 0.16, col, wq, 3, clamp(wq * 1.3)); const r7 = OBS1_124[7]; lbl(nmk, px + 0.7 / 4 * pw + 14, yS(r7[k]) + (k === 1 ? 22 : -8), col, wq, 17, 'left'); });
    series124(px, py, pw, ph, ts, OBS2_124.map(r => r[0]), 0, 4, -0.04, 0.16, C.green, nq, 4, 1, 1);
    lbl('generator A₁ : O A₁ d = (0.3 , −0.1 , 0.5) , seam visible at once', 530, 720, C.white, wq, 15);
    lbl('generator A₂ : A₂ d = −0.5 d , O A₂ᵏ d = 0 for k ≤ 4 : invisible forever (dashed)', 530, 750, C.green, nq, 15);
  }
};

/* ---- 07 HIDDEN MEMORY ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [0, 'it grows like t squared', 'theory'], [1, null, 'lean'], [1, 'Seven and ten share a position', 'theory']]);
  const f1 = 1 - Q(S, 1, 'On the divisor box of five thousand and forty', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two compressed steps minus one compressed step squared', 0.6) * f1;
    chip(530, 260, 860, 62, 'F S² F* − (F S F*)² = F S Q S F* ,  Q = 1 − F*F', C.green, q, 23);
    lbl('Lean : D5.S3.Quantum.Dynamics.CompressedPowerDefect.compressed_power_defect', 530, 320, C.green, q, 14);
    lbl('F a coisometry , S self-adjoint : the part that leaves the visible space and returns', 530, 346, C.dim, q, 14);
    const gq = Q(S, 0, 'it grows like t squared', 0.6) * f1;
    chip(530, 440, 860, 60, '⟨f , (T_2t − T_t²) f⟩_π = ‖(I − P) S_t f‖²_π', C.mag, gq, 23);
    chip(530, 520, 860, 56, '→  t² ‖(I − P) L f‖²_π   as t → 0', C.mag, gq, 23);
    const lq = Q(S, 0, 'exactly when the readout is lumpable', 0.6) * f1;
    chip(530, 610, 860, 58, 'lumpable  ⇔  (I − P) L P = 0', C.gold, lq, 24);
    lbl('autonomous reduced law  ⇔  L(ker P) ⊆ ker P', 530, 672, C.dim, lq, 16);
    const px = 1060, py = 760, pw = 700, ph = 420, ym = 7.0, yS = v => py - v / ym * ph, xS = x => px + x / 0.8 * pw;
    plotAxes(px, py, pw, ph, gq, 't', 'defect / t²  (× 10⁻⁴) on the 5040 box');
    dashed(px, yS(6.1305), px + pw, yS(6.1305), C.green, gq, 2); lbl('21/34255 = 6.13 × 10⁻⁴', px + pw - 6, yS(6.1305) - 12, C.green, gq, 16, 'right');
    series124(px, py, pw, ph, MEMC124.map(r => r[0]), MEMC124.map(r => r[1]), 0, 0.8, 0, ym, C.mag, gq, 3, clamp(gq * 1.3));
    MEMC124.forEach(r => dot(xS(r[0]), yS(r[1]), 6, 'm', gq));
  }
  const q = Q(S, 1, 'On the divisor box of five thousand and forty', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, 'source (a,b,c,k) ↦ 2ᵃ3ᵇ5ᶜ7ᵏ | 5040 ,  q = (a + k , b , c + k)', C.white, q, 19);
    const cq = Q(S, 1, 'sixty sources fold onto forty-eight positions', 0.6);
    for (let i = 0; i < 60; i++) { const x = 160 + (i % 15) * 26, y = 340 + Math.floor(i / 15) * 26; dot(x, y, 6, 'c', clamp(cq * 1.6 - i / 80)); }
    arrow(560, 380, 620, 380, C.dim, cq, 2.5);
    for (let i = 0; i < 48; i++) { const x = 650 + (i % 12) * 26, y = 340 + Math.floor(i / 12) * 26; dot(x, y, 6, 'g', clamp(cq * 1.6 - i / 70)); }
    lbl('60 sources', 340, 460, C.cyan, cq, 16); lbl('48 positions', 800, 460, C.green, cq, 16);
    lbl('Lean : DivisorAssociationFiber.image_card ,  (B+1)((A+1)(C+1) + D(A+C+1)) = 48', 530, 492, C.green, cq, 14);
    const sq = Q(S, 1, 'Seven and ten share a position', 0.6);
    ell124(330, 690, 80, 115, C.gold, sq, 2.5); lbl('position (1, 0, 1)', 330, 560, C.gold, sq, 17);
    node124(330, 635, 30, '7', C.white, sq, 22); node124(330, 745, 30, '10', C.white, sq, 22);
    node124(740, 620, 34, '35', C.green, sq, 20); lbl('target (1, 0, 2)', 740, 575, C.green, sq, 16);
    const rq = Q(S, 1, 'only seven steps to the target', 0.6);
    arrow(364, 632, 702, 620, C.green, rq, 3); lbl('× 5 , rate 1/5', 530, 612, C.green, rq, 17);
    arrow(364, 752, 520, 800, C.red, rq, 3); lbl('× 5 blocked : c = C', 535, 815, C.red, rq, 16, 'left');
    const vq = Q(S, 1, 'Their fibre alone adds', 0.6);
    chip(1390, 290, 800, 58, 'Z = Σ 2⁻ᵃ 3⁻ᵇ 5⁻ᶜ 7⁻ᵏ = 403/105', C.white, sq, 23);
    chip(1390, 370, 800, 58, 'fibre mass 17/(70Z) ,  P(7) = 10/17 ,  P(10) = 7/17', C.white, sq, 20);
    chip(1390, 460, 800, 62, '(17/70Z)(10/17)(7/17)(1/5)² = 1/(425 Z)', C.gold, vq, 22);
    chip(1390, 545, 800, 62, '= 21/34255 > 0', C.gold, vq, 28);
    lbl('recomputed exactly : the only fibre that contributes , total ‖(I − P)Lf‖² = 21/34255', 1390, 610, C.dim, vq, 14);
    stamp('HIDDEN MEMORY', 1390, 720, Q(S, 1, 'hidden memory', 0.6), C.mag, 36, -0.05);
  }
};

/* ---- 08 FISHER LEVELS ---- */
SCENES.levels = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Swapping two and five splits the tangent space', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the Hessian of a potential is self-adjoint', 0.6) * f1;
    chip(530, 260, 860, 60, 'B_q(a, b) = g_q^F(H_q a , b) ,  g_q^F(a, b) = Σ a_s b_s / q_s', C.gold, q, 20);
    chip(530, 340, 860, 58, 'Ĥ = G^(−1/2) B G^(−1/2)  real symmetric ⪰ 0', C.gold, q, 22);
    const lq = Q(S, 0, 'its eigenvalues are the local levels', 0.6) * f1;
    chip(530, 440, 860, 58, 'λ_j ≥ 0 : local field levels', C.cyan, lq, 24);
    const dq = Q(S, 0, 'the decay rates of a Fisher gradient flow', 0.6) * f1;
    chip(530, 520, 860, 58, 'δ̇ = −H δ : mode j decays like e^(−λ_j t)', C.cyan, dq, 22);
    lbl('with J* = −J , δ̇ = J H δ can oscillate at ± iω : not the same operator', 530, 580, C.dim, dq, 15);
    const px = 1060, py = 760, pw = 700, ph = 420;
    plotAxes(px, py, pw, ph, lq, 't', 'Fisher gradient flow , one mirror-invariant potential');
    const cols = [C.cyan, C.cyan, C.cyan, C.mag];
    LEVR124.forEach((lam, i) => { curve(p => { const x = p * 4; return [px + x / 4 * pw, py - Math.exp(-lam * x) * ph * 0.95]; }, 60, LEVR_ODD124 === lam ? C.mag : C.cyan, dq, 3); lbl('λ = ' + lam.toFixed(3), px + pw - 10, py - ph + 20 + i * 26, LEVR_ODD124 === lam ? C.mag : C.cyan, lq, 15, 'right'); });
  }
  const q = Q(S, 1, 'Swapping two and five splits the tangent space', 0.6, 0.3);
  if (q > 0) {
    const nm = ['0', '2', '3', '5', '25'], X = i => 180 + i * 150;
    nm.forEach((s, i) => node124(X(i), 300, 30, s, PC[s], q, 19));
    ctx.save(); ctx.globalAlpha = q; ctx.strokeStyle = C.vio; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(1), 268); ctx.quadraticCurveTo((X(1) + X(3)) / 2, 200, X(3), 268); ctx.stroke(); ctx.restore();
    lbl('τ : 2 ↔ 5', (X(1) + X(3)) / 2, 222, C.vio, q, 18);
    const vq = Q(S, 1, 'three even directions and one odd', 0.6);
    [[[0, 1, 0, -1, 0], 'o : odd', C.mag, 420], [[1, -1, 0, -1, 1], 'd : even (the seam)', C.green, 560]].forEach(([v, s, col, y]) => { v.forEach((x, i) => { const h = x * 40; line(X(i) - 30, y, X(i) + 30, y, C.dim, vq, 1); if (x) { fillBox(X(i) - 22, h > 0 ? y - h : y, 44, Math.abs(h), col, vq * 0.45); rect63(X(i) - 22, h > 0 ? y - h : y, 44, Math.abs(h), col, vq, 1.5); } }); lbl(s, 900, y + 6, col, vq, 17, 'left'); });
    lbl('ℝ⁵ = E₊ ⊕ E₋ , dims (4, 1) ;  tangent space : 3 even + 1 odd ;  ker P = span(e₀ , d) ⊂ E₊', 530, 680, C.white, vq, 15);
    const pq = Q(S, 1, 'The potential kappa o over two', 0.6);
    chip(1390, 270, 800, 58, 'E_odd(p) = (κₒ/2)(p₂ − p₅)² ,  q₂ = q₅ = r', C.mag, pq, 21);
    chip(1390, 350, 800, 58, 'g(o, o) = 2/r  ⇒  λ_odd = 4κₒ / (2/r) = 2κₒ r', C.mag, Q(S, 1, 'has one level, two kappa o r', 0.6), 21);
    lbl('recomputed at κₒ = 1.7 , r = 0.15 : levels (0 , 0 , 0 , 0.51)', 1390, 410, C.dim, pq, 15);
    const fq = Q(S, 1, 'The Fibonacci matrix has spectrum phi', 0.6);
    const mx = 1150, my = 480;
    box(mx, my, 200, 160, C.cyan, fq, 2, 'rgba(0,30,40,0.4)'); [['1', '1'], ['1', '0']].forEach((r, i) => r.forEach((s, j) => lbl(s, mx + 60 + j * 80, my + 65 + i * 60, C.white, fq, 28)));
    lbl('A_Fib', mx + 100, my + 196, C.cyan, fq, 17);
    lbl('spectrum :  φ = 1.618 ,  −1/φ = −0.618', 1560, 540, C.cyan, fq, 18);
    lbl('real , finite , symmetric', 1560, 580, C.dim, fq, 16);
    stamp('NO EULER FACTORS', 1560, 680, Q(S, 1, 'without Euler factors', 0.6), C.red, 28, -0.05);
  }
};

/* ---- 09 PRIME TRIPLETS ---- */
SCENES.triplets = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'whose triplet count stays conjectural', 'open'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Removing what pairs explain', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'For the pattern zero, two, six', 0.6) * f1;
    lbl('H = (0 , 2 , 6) :  green = admissible start a mod ℓ', 530, 255, C.white, q, 18);
    const W5 = [[2, [1]], [3, [2]], [5, [1, 2]], [7, [2, 3, 4, 6]]];
    W5.forEach(([l, adm], i) => residueWheel124(180 + i * 230, 410, 70, l, clamp(q * 1.6 - i / 5), adm));
    const nq = Q(S, 0, 'with nu one, two, then three', 0.6) * f1;
    [['ν = 1', 'τ = 1/2'], ['ν = 2', 'τ = 1/3'], ['ν = 3', 'τ = 2/5'], ['ν = 3', 'τ = 4/7']].forEach(([a1, a2], i) => { lbl(a1, 180 + i * 230, 540, C.gold, nq, 18); lbl(a2, 180 + i * 230, 570, C.white, nq, 18); });
    const tq = Q(S, 0, 'form a projection of trace one minus nu over ell', 0.6) * f1;
    chip(530, 650, 860, 58, 'τ_ℓ(P_H,ℓ) = 1 − ν_H(ℓ)/ℓ ;  q squarefree : τ_q = ∏_ℓ|q τ_ℓ', C.green, tq, 20);
    const sq = Q(S, 0, 'these traces multiply into the Hardy–Littlewood constant', 0.6) * f1;
    chip(1390, 270, 800, 62, '𝔖(H) = 9/2 · ∏_ℓ≥5 ℓ²(ℓ − 3)/(ℓ − 1)³ = ' + SH124.toFixed(6), C.gold, sq, 20);
    lbl('κ_H(2) = log 4 ,  κ_H(3) = log 9/8 : local CRT obstructions', 1390, 332, C.dim, sq, 15);
    const oq = Q(S, 0, 'whose triplet count stays conjectural', 0.6) * f1;
    chip(1390, 410, 800, 58, '# triplets ~ 𝔖(H) ∫ dt / log³ t   :  conjecture', C.vio, oq, 21);
    const px = 1060, py = 760, pw = 660, ph = 230, yS = v => py - v / 0.32 * ph;
    plotAxes(px, py, pw, ph, oq, '', 'triplet starts p ≤ 10⁷ , by residue mod 7');
    TRI7_124.forEach((v, i) => { const x = px + 20 + i * 92, h = v / 0.32 * ph; fillBox(x, py - h, 60, h, v > 0.01 ? C.green : C.red, oq * 0.5); rect63(x, py - h, 60, Math.max(h, 1), v > 0.01 ? C.green : C.red, oq, 1.4); lbl(String(i), x + 30, py + 26, C.dim, oq, 15); });
    lbl(TRICOUNT124 + ' triplets below 10⁷ ; the conjectural benchmark gives ' + Math.round(TRIHL124) + ' (numerics only)', 1390, 845, C.dim, oq, 15);
  }
  const q = Q(S, 1, 'Removing what pairs explain', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 62, 'I⁽³⁾(ℓ) = Σ_J⊆H (−1)^(3−|J|) φ_J(ℓ)', C.gold, q, 23);
    lbl('φ_J(ℓ) = log[ (1 − ν_J(ℓ)/ℓ) / (1 − 1/ℓ)^|J| ] : triple minus the three pairs', 530, 322, C.dim, q, 15);
    const vq = Q(S, 1, 'minus log two at two', 0.6);
    chip(530, 410, 860, 58, 'I⁽³⁾(2) = −log 2 ,   I⁽³⁾(3) = log 4/3', C.green, vq, 24);
    const cq = Q(S, 1, 'as the ell to the minus two terms cancel', 0.6);
    chip(530, 500, 860, 58, 'ℓ⁻² coefficient ∝ 3² − 3·2² + 3 = 0', C.cyan, cq, 23);
    chip(530, 580, 860, 58, 'ℓ⁻³ coefficient = −(27 − 24 + 3)/3 = −2', C.cyan, cq, 23);
    const tq = Q(S, 1, 'a tail of order ell to the minus three', 0.6);
    const px = 1060, py = 760, pw = 700, ph = 460, yS = v => py - (v + 7) / 7.5 * ph, lmax = 211, xS = l => px + (l - 5) / (lmax - 5) * pw;
    plotAxes(px, py, pw, ph, tq, 'prime ℓ , 5 … 211', 'scaled local potentials');
    dashed(px, yS(-3), px + pw, yS(-3), C.gold, tq * 0.7, 1.5); dashed(px, yS(-2), px + pw, yS(-2), C.green, tq * 0.7, 1.5);
    series124(px, py, pw, ph, TRI124.map(r => r[0]), TRI124.map(r => r[1]), 5, lmax, -7, 0.5, C.gold, tq, 3, clamp(tq * 1.3));
    series124(px, py, pw, ph, TRI124.map(r => r[0]), TRI124.map(r => r[2]), 5, lmax, -7, 0.5, C.green, tq, 3, clamp(tq * 1.3));
    lbl('ℓ² κ_H(ℓ) → −3 : the triple potential is O(ℓ⁻²)', px + pw - 6, yS(-3) + 28, C.gold, tq, 15, 'right');
    lbl('ℓ³ I⁽³⁾(ℓ) → −2 : the irreducible part is O(ℓ⁻³)', px + pw - 6, yS(-2) - 14, C.green, tq, 15, 'right');
    stamp('LOCAL CRT FIELD · NO ZETA ZEROS', 530, 720, Q(S, 1, 'It is a local field', 0.6), C.red, 24, -0.04);
  }
};

/* ---- 10 PYRAMIDS AND RH ---- */
SCENES.mirror = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'a published equivalence', 'published'], [1, 'An equivariant map from zeros', 'open']]);
  const f1 = 1 - Q(S, 1, 'On the Riemann side', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The five-state laws form a four-dimensional pyramid', 0.6) * f1;
    chip(1390, 260, 800, 58, 'Δ⁴ = Cone over conv(e₀ , e₂ , e₃ , e₅) ≅ Δ³', C.cyan, q, 22);
    const sq = Q(S, 0, 'The readout maps it onto a square pyramid', 0.6) * f1;
    const v = v3(500, 520, 300, 0.5 + t * 0.15, 0.42), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
    const PV = { '0': W3([0, 0, 0]), '2': W3([1, 0, 0]), '5': W3([0, 1, 0]), '25': W3([1, 1, 0]), '3': W3([0, 0, 1]) };
    if (sq > 0) {
      fillPoly([PV['0'], PV['2'], PV['25'], PV['5']], C.cyan, sq * 0.1);
      [['0', '2'], ['2', '25'], ['25', '5'], ['5', '0'], ['0', '3'], ['2', '3'], ['5', '3'], ['25', '3']].forEach(([a1, b1]) => line(PV[a1][0], PV[a1][1], PV[b1][0], PV[b1][1], C.cyan, sq * 0.8, 2));
      const tq = Q(S, 0, 'between two triangulations of the base', 0.6) * f1;
      line(PV['0'][0], PV['0'][1], PV['25'][0], PV['25'][1], C.gold, tq, 3.5); dashed(PV['2'][0], PV['2'][1], PV['5'][0], PV['5'][1], C.mag, tq, 3);
      Object.keys(PV).forEach(k => { dot(PV[k][0], PV[k][1], 11, ({ '0': 'n', '2': 'c', '3': 'g', '5': 'm', '25': 'g' })[k], sq); lbl(k, PV[k][0] + 22, PV[k][1] - 10, C.white, sq, 18, 'left'); });
    }
    chip(1390, 340, 800, 58, 'X , Y , Z ≥ 0 ,  X + Z ≤ 1 ,  Y + Z ≤ 1', C.cyan, sq, 22);
    const kq = Q(S, 0, 'with kappa running along the segment', 0.6) * f1;
    chip(1390, 430, 800, 58, 'fibre over (X , Y , Z) :  κ ∈ [max(0 , X + Y − r) , min(X , Y)]', C.gold, kq, 19);
    const tq = Q(S, 0, 'between two triangulations of the base', 0.6) * f1;
    lbl('κ₊ → diagonal v₀v₂₅ (gold) ,  κ₋ → diagonal v₂v₅ (magenta)', 1390, 495, C.white, tq, 16);
    lbl('circuit  v₀ − v₂ − v₅ + v₂₅ = 0', 1390, 525, C.dim, tq, 16);
    const mq = Q(S, 0, 'the mirror swapping two and five fixes a tetrahedral slice', 0.6) * f1;
    chip(1390, 610, 800, 62, 'Fix τ ∩ Δ⁴ = conv(e₀ , e₃ , e₂₅ , (e₂ + e₅)/2)', C.mag, mq, 21);
    lbl('a tetrahedron ;  mirror normal  η = ½ log(p₂ / p₅)', 1390, 672, C.dim, mq, 16);
    lbl('κ (seam , mirror-even)  ≠  η (mirror-odd normal)', 1390, 720, C.white, mq, 17);
  }
  const q = Q(S, 1, 'On the Riemann side', 0.6, 0.3);
  if (q > 0) {
    const cx = 330, cy = 520, R = 200;
    const zq = Q(S, 1, 'lies on the unit circle', 0.6);
    ring(cx, cy, R, C.cyan, q, 2.5); line(cx - R - 30, cy, cx + R + 30, cy, C.dim, q * 0.5, 1); line(cx, cy - R - 30, cx, cy + R + 30, C.dim, q * 0.5, 1);
    ZANG124.forEach((an, i) => { const qq = clamp(zq * 1.6 - i / 15); [an, -an].forEach(g => dot(cx + R * Math.cos(g), cy - R * Math.sin(g), 7, 'g', qq)); });
    rect63(cx + R - 16, cy - 30, 32, 60, C.green, zq, 1.5); dashed(cx + R + 16, cy - 30, cx + R + 80, cy - 170, C.green, zq * 0.6, 1.2); dashed(cx + R + 16, cy + 30, cx + R + 80, cy + 170, C.green, zq * 0.6, 1.2);
    const ix = cx + R + 95; line(ix, cy - 180, ix, cy + 180, C.cyan, zq, 2.5);
    ZANG124.forEach((an, i) => { const qq = clamp(zq * 1.6 - i / 15); [an, -an].forEach(g => dot(ix, cy - g / 0.08 * 180, 7, 'g', qq)); });
    lbl('arc near z = 1 , magnified', ix + 14, cy - 190, C.green, zq, 14, 'left'); lbl('arg z = 0.018 … 0.071', ix + 14, cy + 6, C.white, zq, 14, 'left');
    lbl('z = 1 − 1/ρ : first 12 zeros and conjugates', cx + 60, cy + R + 56, C.green, zq, 15);
    const off = 1 / 1.08; dot(cx + R * off * Math.cos(2.6), cy - R * off * Math.sin(2.6), 8, 'r', zq); lbl('a point with Re ρ ≠ ½', cx - R + 50, cy - 70, C.red, zq, 15, 'left'); lbl('lands off the circle', cx - R + 50, cy - 48, C.red, zq, 15, 'left');
    chip(330, 270, 560, 54, 'Re ρ = ½  ⇔  |1 − 1/ρ| = 1', C.cyan, zq, 21);
    const bq = Q(S, 1, 'a published equivalence makes RH a vanishing Poisson-weighted defect', 0.6);
    chip(1250, 265, 1020, 58, '∫ log|ζ(½ + it)| dt / (2π(t² + ¼)) = Σ_(Re ρ > ½) log|ρ/(1 − ρ)| ≥ 0', C.cyan, bq, 19);
    lbl('= 0 ⇔ RH   (Balazard–Saias–Yor ; Bui–Lester–Milinovich , arXiv:1306.0856)', 1250, 322, C.cyan, bq, 14);
    const px = 830, py = 580, pw = 480, ph = 180, yS = v => py - (v + 0.02) / 0.08 * ph;
    plotAxes(px, py, pw, ph, bq, 'T', 'truncated integral over |t| ≤ T');
    line(px, yS(0), px + pw, yS(0), C.dim, bq * 0.5, 1);
    series124(px, py, pw, ph, BSY124.map(r => r[0]), BSY124.map(r => r[1]), 0, 100, -0.02, 0.06, C.gold, bq, 3, clamp(bq * 1.3));
    lbl('T = 100 : ' + BSY100124.toFixed(4) + '  (numerical , not a proof)', px + pw, py + 54, C.gold, bq, 14, 'right');
    const mq = Q(S, 1, 'An equivariant map from zeros', 0.6);
    box(1360, 400, 480, 250, C.vio, mq, 2, 'rgba(20,10,40,0.5)');
    lbl('IF  Φ : zeros → Δ⁴', 1600, 440, C.vio, mq, 19); lbl('Φ(1 − ρ*) = τ Φ(ρ) , ρ* conjugate', 1600, 480, C.white, mq, 17); lbl('η(Φ(ρ)) = log|1 − 1/ρ|', 1600, 515, C.white, mq, 18);
    lbl('THEN  RH ⇔ Φ(zeros) ⊆ Fix τ', 1600, 565, C.gold, mq, 19); lbl('(conditional theorem 63.4)', 1600, 600, C.dim, mq, 15);
    stamp('Φ NOT CONSTRUCTED', 1250, 740, Q(S, 1, 'none is built', 0.6), C.red, 34, -0.05);
  }
};

/* ---- 11 SPACE AND TIME ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Time is the relative-entropy ledger', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Space and time come out of one network', 0.6) * f1;
    const N = [[260, 360], [620, 360], [440, 620], [440, 800]], E = [[0, 1], [1, 2], [2, 0], [2, 3]];
    const cq = Q(S, 0, 'changes with the capacities', 0.6) * f1, sp = 0.5 + 0.5 * Math.sin(t * 1.3);
    const cw = [1 + 0.5 * sp, 2 - 0.8 * sp, 1.5 + 0.3 * sp * sp, 0.7 + 0.1 * sp];
    E.forEach(([a1, b1], i) => { line(N[a1][0], N[a1][1], N[b1][0], N[b1][1], C.cyan, q, 2 + 3 * (cq > 0 ? cw[i] : 1)); lbl('c' + ['₁', '₂', '₃', '₄'][i], (N[a1][0] + N[b1][0]) / 2 + (i === 3 ? 26 : i === 0 ? 0 : i === 1 ? 30 : -30), (N[a1][1] + N[b1][1]) / 2 + (i === 0 ? -16 : 6), C.cyan, q, 17, i === 3 ? 'left' : 'center'); });
    N.forEach((p, i) => node124(p[0], p[1], 24, String(i), C.white, q, 18));
    const bq = Q(S, 0, 'The static response b transpose L plus b', 0.6) * f1;
    lbl('+b', 220, 320, C.gold, bq, 20); lbl('−b', 480, 830, C.gold, bq, 20, 'left');
    chip(530, 260, 860, 56, 'R[b] = bᵀ L_c⁺ b = 2 E_c(b) ,  L_c = Σ c_e q_e q_eᵀ', C.gold, bq, 20);
    chip(1390, 290, 800, 60, 'd/ds L⁺ = − L⁺ L′ L⁺', C.gold, cq, 24);
    chip(1390, 380, 800, 62, 'dR/ds = − Σ_e c_e′ (q_eᵀ φ)² ,  φ = L⁺ b', C.gold, Q(S, 0, 'by minus the sum of c e prime times the squared edge current', 0.6) * f1, 22);
    lbl('recomputed : finite differences match the formula to 10⁻⁶', 1390, 442, C.dim, cq, 15);
    const dq = Q(S, 0, 'capacities lost to local dissipation raise the response', 0.6) * f1;
    chip(1390, 540, 800, 60, 'c_e′ = −α_e σ_e ≤ 0  ⇒  R[b] increases', C.mag, dq, 22);
    lbl('a response-curvature candidate , not yet Ricci or Einstein curvature', 1390, 602, C.dim, dq, 15);
  }
  const q = Q(S, 1, 'Time is the relative-entropy ledger', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 60, 'τ(t) = D(ρ₀‖σ) − D(ρ_t‖σ) = ∫ Σ(ρ_s) ds', C.green, q, 23);
    const nq = Q(S, 1, 'It never decreases and adds over steps', 0.6);
    chip(530, 345, 860, 58, 'Σ_e(ρ) ≥ 0 ,  dτ/dt = Σ(ρ_t) ≥ 0 ,  τ_N = Σ Δτ_n', C.green, nq, 22);
    const hq = Q(S, 1, 'a coherent part commuting with sigma leaves it still', 0.6);
    chip(530, 435, 860, 58, '[H , σ] = 0  ⇒  D(e^(t L_coh) ρ ‖ σ) = D(ρ‖σ)', C.mag, hq, 22);
    lbl('three qubits on a triangle , σ-preserving edge generators', 530, 500, C.dim, q, 15);
    const px = 1060, py = 760, pw = 700, ph = 420, Dm = CLKD0124 * 1.1, yS = v => py - v / Dm * ph, xS = x => px + x / 6 * pw;
    plotAxes(px, py, pw, ph, q, 'parameter time t', 'entropy time τ(t)');
    dashed(px, yS(CLKD0124), px + pw, yS(CLKD0124), C.dim, q, 1.5); lbl('D(ρ₀‖σ) = ' + CLKD0124.toFixed(3), px + pw - 6, yS(CLKD0124) - 12, C.dim, q, 15, 'right');
    series124(px, py, pw, ph, CLK124.map((v, i) => i * 0.1), CLK124, 0, 6, 0, Dm, C.green, nq, 3.5, clamp(nq * 1.3));
    line(px, py - 3, px + pw, py - 3, C.mag, hq, 3.5); lbl('coherent part only : τ stays 0', px + pw - 6, py - 16, C.mag, hq, 15, 'right');
    stamp('t AND τ : TWO CLOCKS', 530, 690, Q(S, 1, 'are different clocks', 0.6), C.gold, 32, -0.05);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'lean'], [1, 'the Poisson defect equivalence is a published input', 'published'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['CHANNELS', 'Q(Eρ) ≤ Q(ρ)', C.cyan, 'So channels blur'], ['LOOPS', '‖Ω‖ ≤ Σ‖E − id‖', C.gold, 'loops are budgeted'], ['CURVATURE', 'λ₁ ≥ K only', C.gold, 'curvature bounds gaps but not collapse'], ['FISHER', 'F_out ≤ Σ F_e', C.green, 'Fisher information cannot grow'], ['MEMORY', '21/34255', C.mag, 'compression leaves memory'], ['TRIPLETS', 'O(ℓ⁻³) tail', C.green, 'triplets keep a three-body tail'], ['RH', 'Φ not built', C.vio, 'RH waits behind a map not yet built']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 175 + i * 262, q = Q(S, 0, ph) * fade; box(x - 120, 240, 240, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 19); lblG(a2, x, 340, C.white, q, 19); });
    lbl('LEAN · compressed_power_defect (two-step compression identity) · DivisorAssociationFiber.image_card (60 sources → 48 positions)', W / 2, 455, C.green, Q(S, 1, 'are Lean-checked') * fade, 15);
    lbl('PUBLISHED · Balazard–Saias–Yor equivalence (Bui–Lester–Milinovich , arXiv:1306.0856)', W / 2, 497, C.cyan, Q(S, 1, 'the Poisson defect equivalence is a published input') * fade, 15);
    lbl('CLASSICAL · Kraus–Choi · Kadison · Cayley–Hamilton · Thomson principle · quantum data processing · Hardy–Littlewood conjecture (open)', W / 2, 539, '#8fbcff', Q(S, 1, 'is a published input') * fade, 15);
    lbl('VOLUMES · CPTP lift · triangle inclusion · holonomy budget · CD and four limit layers · Fisher budget · predictive quotient · memory defect · levels · I⁽³⁾ · RH bridge 63.4 · entropy time', W / 2, 581, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · Choi · triangle laws · 240 loops ≤ 0.90 · K and λ₁ · F_out ≤ 14 % · 21/34255 exact · S(H) = 2.858249 · 8543 triplets · 12 zeros on |z| = 1 · τ(t)', W / 2, 623, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO DIGESTION RECORD COVERS THESE VOLUMES · RH IS NOT PROVED HERE', W / 2, 700, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyrG64(W / 2, 360, 200, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC TYPED BRIDGES II', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 类型化桥 第二部 · 量子网络、隐藏记忆与 RH 接口 · TRURETURING FILM 124', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Channels only blur, compression leaves memory, and the road to RH is still conditional.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'TYPED BRIDGES II', sector: 'QUANTUM CARRIER', holonomy: 'CHANNELS AND LOOPS', curvature: 'CURVATURE AND LIMITS', budget: 'FISHER BUDGET', closure: 'ESCAPE AND PREDICTION', memory: 'HIDDEN MEMORY', levels: 'FISHER LEVELS', triplets: 'PRIME TRIPLETS', mirror: 'PYRAMIDS AND RH', clock: 'SPACE AND TIME', finale: 'LEDGER' });

function poster124() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyrG64(460, 500, 260, 2.2, 1, [1, 1, 1], 1);
  txt('F_Q(output) ≤ Σ F_Q(sources)', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('memory defect / t² → 21/34255', 1320, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('if Φ existed : RH ⇔ Φ(zeros) ⊆ Fix τ', 1320, 590, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 类型化桥 第二部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC TYPED BRIDGES II', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('量 子 网 络 · 隐 藏 记 忆 · RH 接 口', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 124', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster124;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
