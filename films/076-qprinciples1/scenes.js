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

/* ---- film 076: AURIC QUANTUM PRINCIPLES I · five modes, complex structure and coherent records ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN GENERAL THEOREM · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · EXACT VALUE NOT DETERMINED', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po076 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po076.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po076.set(key, off); }
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
/* ---- film 076 data: generated from vis076.json by verify076.py ---- */
const WIN076 = [[1, 2, 2], [2, 3, 3], [3, 5, 4], [4, 8, 5], [5, 13, 6]];
const DIMS076 = [4, 14, 24];
const FIB076 = {"X": 0.45, "Y": 0.4, "Z": 0.25, "lo": 0.10000000000000009, "hi": 0.4, "p": [[0.0, 0.35, 0.25, 0.3, 0.1], [0.15, 0.2, 0.25, 0.15, 0.25], [0.3, 0.05, 0.25, 0.0, 0.4]], "E": [[0.1, 3.95], [0.115, 3.995], [0.13, 4.04], [0.145, 4.085], [0.16, 4.13], [0.175, 4.175], [0.19, 4.22], [0.205, 4.265], [0.22, 4.31], [0.235, 4.355], [0.25, 4.4], [0.265, 4.445], [0.28, 4.49], [0.295, 4.535], [0.31, 4.58], [0.325, 4.625], [0.34, 4.67], [0.355, 4.715], [0.37, 4.76], [0.385, 4.805], [0.4, 4.85]]};
const BORN076 = [[-1.0, 0.0, 0.0], [-0.95, 0.0713, 0.025], [-0.9, 0.1355, 0.05], [-0.85, 0.1929, 0.075], [-0.8, 0.244, 0.1], [-0.75, 0.2891, 0.125], [-0.7, 0.3285, 0.15], [-0.65, 0.3627, 0.175], [-0.6, 0.392, 0.2], [-0.55, 0.4168, 0.225], [-0.5, 0.4375, 0.25], [-0.45, 0.4544, 0.275], [-0.4, 0.468, 0.3], [-0.35, 0.4786, 0.325], [-0.3, 0.4865, 0.35], [-0.25, 0.4922, 0.375], [-0.2, 0.496, 0.4], [-0.15, 0.4983, 0.425], [-0.1, 0.4995, 0.45], [-0.05, 0.4999, 0.475], [0.0, 0.5, 0.5], [0.05, 0.5001, 0.525], [0.1, 0.5005, 0.55], [0.15, 0.5017, 0.575], [0.2, 0.504, 0.6], [0.25, 0.5078, 0.625], [0.3, 0.5135, 0.65], [0.35, 0.5214, 0.675], [0.4, 0.532, 0.7], [0.45, 0.5456, 0.725], [0.5, 0.5625, 0.75], [0.55, 0.5832, 0.775], [0.6, 0.608, 0.8], [0.65, 0.6373, 0.825], [0.7, 0.6715, 0.85], [0.75, 0.7109, 0.875], [0.8, 0.756, 0.9], [0.85, 0.8071, 0.925], [0.9, 0.8645, 0.95], [0.95, 0.9287, 0.975], [1.0, 1.0, 1.0]];
const PTEV076 = [-0.5, 0.5, 0.5, 0.5];
const WIT076 = [[0.0, 1.0, 1.0], [0.01, 0.9988, 0.9994], [0.02, 0.99521, 0.9976], [0.03, 0.98924, 0.99462], [0.04, 0.98094, 0.99045], [0.05, 0.97033, 0.98512], [0.06, 0.95749, 0.97864], [0.07, 0.94247, 0.97104], [0.08, 0.92535, 0.96236], [0.09, 0.90624, 0.95261], [0.1, 0.88522, 0.94183], [0.11, 0.86241, 0.93008], [0.12, 0.83792, 0.91738], [0.13, 0.81189, 0.90378], [0.14, 0.78445, 0.88933], [0.15, 0.75573, 0.87409], [0.16, 0.72589, 0.85811], [0.17, 0.69508, 0.84144], [0.18, 0.66345, 0.82414], [0.19, 0.63115, 0.80627], [0.2, 0.59836, 0.78789], [0.21, 0.56522, 0.76907], [0.22, 0.5319, 0.74986], [0.23, 0.49856, 0.73033], [0.24, 0.46536, 0.71055], [0.25, 0.43244, 0.69057], [0.26, 0.39995, 0.67045], [0.27, 0.36805, 0.65027], [0.28, 0.33687, 0.63007], [0.29, 0.30654, 0.60993], [0.3, 0.27719, 0.58989], [0.31, 0.24893, 0.57001], [0.32, 0.22187, 0.55036], [0.33, 0.19611, 0.53097], [0.34, 0.17174, 0.5119], [0.35, 0.14883, 0.4932], [0.36, 0.12746, 0.4749], [0.37, 0.10769, 0.45706], [0.38, 0.08955, 0.43971], [0.39, 0.07308, 0.42289], [0.4, 0.05831, 0.40662], [0.41, 0.04524, 0.39094], [0.42, 0.03389, 0.37588], [0.43, 0.02423, 0.36144], [0.44, 0.01625, 0.34766], [0.45, 0.00992, 0.33456], [0.46, 0.00519, 0.32213], [0.47, 0.00201, 0.31039], [0.48, 0.00033, 0.29935], [0.49, 7e-05, 0.28901], [0.5, 0.00115, 0.27937], [0.51, 0.0035, 0.27043], [0.52, 0.00702, 0.26218], [0.53, 0.01161, 0.25461], [0.54, 0.01718, 0.24772], [0.55, 0.02361, 0.24149], [0.56, 0.0308, 0.2359], [0.57, 0.03864, 0.23095], [0.58, 0.04702, 0.2266], [0.59, 0.05581, 0.22285], [0.6, 0.06492, 0.21966], [0.61, 0.07422, 0.21703], [0.62, 0.0836, 0.21492], [0.63, 0.09296, 0.21331], [0.64, 0.10219, 0.21217], [0.65, 0.11119, 0.21149], [0.66, 0.11987, 0.21124], [0.67, 0.12813, 0.21139], [0.68, 0.1359, 0.21191], [0.69, 0.14309, 0.21279], [0.7, 0.14964, 0.21399], [0.71, 0.15547, 0.2155], [0.72, 0.16055, 0.21729], [0.73, 0.16482, 0.21935], [0.74, 0.16825, 0.22164], [0.75, 0.17081, 0.22415], [0.76, 0.17247, 0.22687], [0.77, 0.17323, 0.22977], [0.78, 0.17309, 0.23283], [0.79, 0.17206, 0.23605], [0.8, 0.17014, 0.23941]];
const WPOP076 = [0.7557, 0.0773, 0.0822, 0.0773, 0.0075];
const GRP076 = [["D SO(5) D†", 10], ["SU(4) ⊕ 1", 15], ["SU(5)", 24], ["U(5)", 25]];
const CONC076 = [[0.0, 0.0], [0.1309, 0.0654], [0.2618, 0.1305], [0.3927, 0.1951], [0.5236, 0.2588], [0.6545, 0.3214], [0.7854, 0.3827], [0.9163, 0.4423], [1.0472, 0.5], [1.1781, 0.5556], [1.309, 0.6088], [1.4399, 0.6593], [1.5708, 0.7071], [1.7017, 0.7518], [1.8326, 0.7934], [1.9635, 0.8315], [2.0944, 0.866], [2.2253, 0.8969], [2.3562, 0.9239], [2.4871, 0.9469], [2.618, 0.9659], [2.7489, 0.9808], [2.8798, 0.9914], [3.0107, 0.9979], [3.1416, 1.0], [3.2725, 0.9979], [3.4034, 0.9914], [3.5343, 0.9808], [3.6652, 0.9659], [3.7961, 0.9469], [3.927, 0.9239], [4.0579, 0.8969], [4.1888, 0.866], [4.3197, 0.8315], [4.4506, 0.7934], [4.5815, 0.7518], [4.7124, 0.7071], [4.8433, 0.6593], [4.9742, 0.6088], [5.1051, 0.5556], [5.236, 0.5], [5.3669, 0.4423], [5.4978, 0.3827], [5.6287, 0.3214], [5.7596, 0.2588], [5.8905, 0.1951], [6.0214, 0.1305], [6.1523, 0.0654], [6.2832, 0.0], [6.4141, 0.0654], [6.545, 0.1305], [6.6759, 0.1951], [6.8068, 0.2588], [6.9377, 0.3214], [7.0686, 0.3827], [7.1995, 0.4423], [7.3304, 0.5], [7.4613, 0.5556], [7.5922, 0.6088], [7.7231, 0.6593], [7.854, 0.7071], [7.9849, 0.7518], [8.1158, 0.7934], [8.2467, 0.8315], [8.3776, 0.866], [8.5085, 0.8969], [8.6394, 0.9239], [8.7703, 0.9469], [8.9012, 0.9659], [9.0321, 0.9808], [9.163, 0.9914], [9.2939, 0.9979], [9.4248, 1.0], [9.5557, 0.9979], [9.6866, 0.9914], [9.8175, 0.9808], [9.9484, 0.9659], [10.0793, 0.9469], [10.2102, 0.9239], [10.3411, 0.8969], [10.472, 0.866], [10.6029, 0.8315], [10.7338, 0.7934], [10.8647, 0.7518], [10.9956, 0.7071], [11.1265, 0.6593], [11.2574, 0.6088], [11.3883, 0.5556], [11.5192, 0.5], [11.6501, 0.4423], [11.781, 0.3827], [11.9119, 0.3214], [12.0428, 0.2588], [12.1737, 0.1951], [12.3046, 0.1305], [12.4355, 0.0654], [12.5664, 0.0]];
const READ076 = [[0.0, 0.4], [0.131, 0.4261], [0.262, 0.4518], [0.393, 0.4765], [0.524, 0.5], [0.654, 0.5218], [0.785, 0.5414], [0.916, 0.5587], [1.047, 0.5732], [1.178, 0.5848], [1.309, 0.5932], [1.44, 0.5983], [1.571, 0.6], [1.702, 0.5983], [1.833, 0.5932], [1.963, 0.5848], [2.094, 0.5732], [2.225, 0.5587], [2.356, 0.5414], [2.487, 0.5218], [2.618, 0.5], [2.749, 0.4765], [2.88, 0.4518], [3.011, 0.4261], [3.142, 0.4], [3.272, 0.3739], [3.403, 0.3482], [3.534, 0.3235], [3.665, 0.3], [3.796, 0.2782], [3.927, 0.2586], [4.058, 0.2413], [4.189, 0.2268], [4.32, 0.2152], [4.451, 0.2068], [4.581, 0.2017], [4.712, 0.2], [4.843, 0.2017], [4.974, 0.2068], [5.105, 0.2152], [5.236, 0.2268], [5.367, 0.2413], [5.498, 0.2586], [5.629, 0.2782], [5.76, 0.3], [5.89, 0.3235], [6.021, 0.3482], [6.152, 0.3739], [6.283, 0.4]];
const SEAM076 = [[0, 0, 1], [0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 0, 1], [1, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1], [2, 0, 1], [2, 1, 1], [2, 2, 1], [2, 3, 1], [2, 4, 1], [3, 0, 1], [3, 1, 0], [3, 2, 1], [3, 3, 1], [3, 4, 0], [4, 0, 1], [4, 1, 0], [4, 2, 1], [4, 3, 1], [4, 4, 0]];
const ETA076 = [[0.05, 0.9979], [0.075, 0.9953], [0.1, 0.9917], [0.125, 0.9871], [0.15, 0.9814], [0.175, 0.9747], [0.2, 0.9671], [0.225, 0.9584], [0.25, 0.9487], [0.275, 0.9381], [0.3, 0.9266], [0.325, 0.9141], [0.35, 0.9007], [0.375, 0.8864], [0.4, 0.8713], [0.425, 0.8553], [0.45, 0.8384], [0.475, 0.8208], [0.5, 0.8025], [0.525, 0.7834], [0.55, 0.7635], [0.575, 0.7431], [0.6, 0.722], [0.625, 0.7003], [0.65, 0.6781], [0.675, 0.6554], [0.7, 0.6323], [0.725, 0.6088], [0.75, 0.5851], [0.775, 0.5611], [0.8, 0.5371], [0.825, 0.5132], [0.85, 0.4894], [0.875, 0.4662], [0.9, 0.4437], [0.925, 0.4225], [0.95, 0.4033], [0.975, 0.4264], [1.0, 0.45], [1.025, 0.4712], [1.05, 0.4899], [1.075, 0.5061], [1.1, 0.5197], [1.125, 0.5384], [1.15, 0.5701], [1.175, 0.5999], [1.2, 0.6278], [1.225, 0.6536], [1.25, 0.6773], [1.275, 0.6988], [1.3, 0.7181], [1.325, 0.7351], [1.35, 0.7498], [1.375, 0.7622], [1.4, 0.7722], [1.425, 0.7797], [1.45, 0.7848], [1.475, 0.7875], [1.5, 0.7878]];
const DEC076 = [[1, 0.08315, 1.0], [2, 0.06048, 0.66303], [3, 0.03923, 0.43961], [4, 0.02602, 0.29148], [5, 0.01725, 0.19326], [6, 0.01144, 0.12814], [7, 0.00758, 0.08496], [8, 0.00503, 0.05633], [9, 0.00333, 0.03735], [10, 0.00221, 0.02476], [11, 0.00147, 0.01642], [12, 0.00097, 0.01089]];
const DEC0076 = [[1, 0.8, 1.0], [2, 0.08315, 0.66303], [3, 0.06048, 0.43961], [4, 0.03923, 0.29148], [5, 0.02602, 0.19326], [6, 0.01725, 0.12814], [7, 0.01144, 0.08496], [8, 0.00758, 0.05633], [9, 0.00503, 0.03735], [10, 0.00333, 0.02476], [11, 0.00221, 0.01642], [12, 0.00147, 0.01089]];
const TOMO076 = [[9, 10], [16, 16]];
const LAB076 = [0, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 1, 3, 2, 2, 2, 0, 3, 3, 4, 0, 1, 1, 1, 3, 0, 2, 0, 2, 2, 0, 1, 1, 1, 4, 0, 0, 1, 0, 1, 1, 0, 1, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 0, 4, 4, 4, 4, 0];
/* ---- film 076 helpers ---- */
const MN076 = ['∅', '1', '2', '3', '13'];
const MB076 = ['000', '100', '010', '001', '101'];
const ML076 = ['N', '[2]', '[3]', '[5]', '[2,5]'];
const MC076 = [C.white, C.cyan, C.gold, C.mag, C.green];
const MD076 = ['w', 'c', 'g', 'm', 'n'];
function cell076(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function cellG076(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function interp076(arr, x, k = 1) { if (x <= arr[0][0]) return arr[0][k]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][k] * (1 - f) + arr[i][k] * f; } return arr[arr.length - 1][k]; }
/* three bits of a mode as cells, occupied cells coloured */
function bits076(x, y, bits, cw, col, a) { for (let i = 0; i < 3; i++) { const on = bits[i] === '1'; box(x + i * cw, y, cw - 8, cw - 8, on ? col : C.dim, a, 2, on ? 'rgba(40,40,0,0.35)' : 'rgba(0,0,0,0.45)'); if (on) dot(x + i * cw + (cw - 8) / 2, y + (cw - 8) / 2, 11, 'g', a); } }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyrG64(470, 470, 240, 0.6 + t * 0.2, s0, [1, 1, 1], 1);
  lbl('sites 1 — 2 — 3 , no two neighbours both occupied', 470, 760, C.dim, Q(S, 0, 'with no two neighbours both occupied', 0.6), 17);
  const items = [['five legal modes', 'FIVE LEGAL MODES', 'Σ = { ∅ , 1 , 2 , 3 , 13 }', C.cyan, 27], ['which added principles', 'ADDED PRINCIPLES', 'composition · transport · effects · kernels · references', C.gold, 21], ['a complex quantum system', 'A COMPLEX QUANTUM SYSTEM', 'M₅(ℂ) · Born weights · CPTP updates · unitary gates', C.mag, 22], ['which quantum rule each principle buys', 'ONE RULE PER PRINCIPLE', 'and a counter-model where the principle is missing', C.green, 21]];
  items.forEach(([ph, h, s, col, sz], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, sz); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  ring(W / 2, 420, 250, C.cyan, rp * 0.45, 2);
  ring(W / 2, 420, 262, C.mag, rp * 0.25, 1.2);
  pyrG64(W / 2, 430, 220, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 330, 58, 'five modes', C.gold, rp, 22); chip(330, 445, 330, 58, 'one shared i', C.mag, rp, 22); chip(330, 530, 330, 58, 'coherent records', C.green, rp, 22);
  box(1410, 340, 400, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('six stated conditions', 1610, 410, C.cyan, rp, 22); lblG('A1 – A6  →  M₅(ℂ)', 1610, 470, C.white, rp, 30);
  txt(scramble('AURIC QP I · FIVE MODES', rp, 476), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 量 子 原 理 第 一 部 · 五 模 式 、复 结 构 与 相 干 记 录', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 076 · AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 ATOM ---- */
SCENES.atom = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Five modes do not choose a theory', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Start with the atom', 0.6) * f1;
    [[230, 1], [380, 2], [530, 3]].forEach(([x, k], i) => { ring(x, 280, 24, C.cyan, q, 2.5); lbl(String(k), x, 288, C.white, q, 22); if (i < 2) line(x + 26, 280, x + 124, 280, C.cyan, q, 2.5); });
    lbl('no two neighbours occupied', 380, 335, C.dim, q, 16);
    const rows = [[0, 'empty'], [1, 'empty, one, two, three'], [2, 'empty, one, two, three'], [3, 'empty, one, two, three'], [4, 'the pair one and three']];
    const lq = Q(S, 0, 'with project labels two, three, five and two-five', 0.6) * f1;
    rows.forEach(([k, ph], i) => { const qq = Q(S, 0, ph, 0.5, k > 0 && k < 4 ? (k - 1) * 0.35 : 0) * f1, y = 375 + i * 78; bits076(180, y, MB076[k], 64, MC076[k], qq); lbl(MN076[k], 420, y + 38, MC076[k], qq, 24); lbl('→', 480, y + 38, C.dim, lq, 20); lbl(ML076[k], 560, y + 38, C.white, lq, 24); });
    lbl('bits : site 1 , site 2 , site 3', 330, 785, C.dim, q, 15);
    const pq = Q(S, 0, 'Start with the atom', 0.8, 0.4) * f1;
    chip(1360, 250, 760, 58, 'Σ = independent sets of 1 — 2 — 3 :  5 modes', C.cyan, pq, 22);
    pyr63(1360, 500, 230, 0.7 + t * 0.18, pq, { fillBase: true, bits: false });
    const nq = Q(S, 0, 'A label is only a name', 0.6) * f1;
    chip(1360, 745, 820, 58, 'a label fixes no length , probability or gate angle', C.gold, nq, 21);
  }
  const q = Q(S, 1, 'Five modes do not choose a theory', 0.6, 0.3);
  if (q > 0) {
    const cols = [['CLASSICAL SIMPLEX Δ₄', ['recursion , records  ✓', 'static history graph  ✓', 'phase  ✗'], C.cyan, 'a classical simplex keeps recursion'], ['REAL QUANTUM , ℝ⁵', ['square weights  ✓', 'rotations , non-commuting  ✓', 'complex field  ✗'], C.gold, 'real quantum theory adds squares and rotations'], ['COMPLEX QUANTUM , ℂ⁵', ['Hermitian density matrices', 'the target of this film', 'needs added principles'], C.mag, 'Classical, real and complex states']];
    cols.forEach(([h, rs, col, ph], i) => { const qq = Q(S, 1, ph, 0.6), x = 170 + i * 560; box(x, 245, 460, 205, col, qq, 2, 'rgba(0,0,0,0.5)'); lblG(h, x + 230, 287, col, qq, 21); rs.forEach((r, j) => lbl(r, x + 230, 333 + j * 38, C.white, qq, 18)); });
    const bq = Q(S, 1, 'four, fourteen and twenty-four real parameters', 0.6);
    const y0 = 770;
    DIMS076.forEach((v, i) => { const qq = clamp(bq * 1.6 - i * 0.25), x = 340 + i * 560, h = v * 7.6 * qq; fillBox(x, y0 - h, 120, h, [C.cyan, C.gold, C.mag][i], 0.4 * qq); rect63(x, y0 - h, 120, h, [C.cyan, C.gold, C.mag][i], qq, 2); lbl(String(v), x + 60, y0 - h - 14, C.white, qq, 28); });
    line(240, y0, 1660, y0, C.dim, bq, 1.5);
    lbl('normalised real parameters :  5 − 1 ,  5·6/2 − 1 ,  5² − 1', 960, 505, C.dim, bq, 17);
    lbl('pure complex ray : 8', 1600, 740, C.mag, bq, 17, 'left');
    const sq = Q(S, 1, 'Five modes do not choose a theory', 0.6, 1.0);
    stamp('FIVE MODES DO NOT CHOOSE A THEORY', 960, 640, sq * (1 - bq), C.red, 28, -0.04);
  }
};

/* ---- 03 CORNER ---- */
SCENES.corner = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The three occupation means leave one number hidden', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Every readout is a constant', 0.6) * f1;
    const P = { 0: [260, 640], 1: [620, 640], 3: [260, 330], 13: [620, 330], 2: [800, 470] };
    [[0, 1], [1, 13], [13, 3], [3, 0]].forEach(([a, b]) => line(P[a][0], P[a][1], P[b][0], P[b][1], C.cyan, q * 0.7, 2.5));
    dashed(P[0][0], P[0][1], P[2][0], P[2][1], C.dim, q * 0.6, 1.5);
    lbl('x : site 1 →', 440, 735, C.dim, q, 16); lbl('y : site 3 ↑', 160, 485, C.dim, q, 16, 'right');
    const jq = Q(S, 0, 'one corner term J f x y', 0.6) * f1;
    const fv = { 0: 'f₀ = 0', 1: 'f₁ = 2', 3: 'f₃ = 5', 13: 'f₁₃ = c', 2: 'f₂ = 3' };
    const sg = { 0: '+', 1: '−', 3: '−', 13: '+' };
    [0, 1, 3, 13, 2].forEach(k => { const col = MC076[[0, 1, 2, 3, 13].indexOf(k)], rt = k === 1 || k === 13 || k === 2, up = k === 3 || k === 13; dot(P[k][0], P[k][1], 15, MD076[[0, 1, 2, 3, 13].indexOf(k)], q); lbl(String(k === 0 ? '∅' : k), P[k][0], P[k][1] + (up ? -26 : 40), col, q, 20); lblG(fv[k], P[k][0] + (rt ? 30 : -30), P[k][1] + 7, C.white, Q(S, 0, 'For labels two, three, five', 0.6) * f1, 18, rt ? 'left' : 'right'); if (sg[k]) { const gx_ = P[k][0] + (rt ? -48 : 48), gy_ = P[k][1] + (up ? 48 : -48); ring(gx_, gy_, 20, sg[k] === '+' ? C.gold : C.red, jq, 2); lbl(sg[k], gx_, gy_ + 8, sg[k] === '+' ? C.gold : C.red, jq, 24); } });
    lbl('z : site 2 , outside the square', P[2][0], P[2][1] - 34, C.dim, q, 15);
    chip(1380, 250, 860, 58, 'f = f₀ + (f₁−f₀)x + (f₃−f₀)y + (f₂−f₀)z + J_f · xy', C.cyan, q, 21);
    lbl('basis 1 , x , y , z , xy :  x² = x ,  y² = y ,  z² = z ,  xz = yz = 0', 1380, 312, C.dim, q, 15);
    chip(1380, 385, 860, 62, 'J_f = f₁₃ − f₁ − f₃ + f₀', C.gold, Q(S, 0, 'with J f equal to f thirteen minus f one', 0.6) * f1, 28);
    const eq = Q(S, 0, 'For labels two, three, five', 0.6) * f1;
    lbl('labels f₀ = 0 , f₁ = 2 , f₂ = 3 , f₃ = 5 :  J_f = c − 7', 1380, 470, C.white, eq, 18);
    const aq = Q(S, 0, 'joint value seven gives J zero', 0.6) * f1, mq = Q(S, 0, 'ten, the product, gives three', 0.6) * f1;
    box(980, 505, 380, 150, C.cyan, aq, 2, 'rgba(0,30,40,0.4)'); lbl('c = 7 = 2 + 5', 1170, 555, C.cyan, aq, 22); lbl('J_f = 0', 1170, 610, C.white, aq, 28);
    box(1400, 505, 380, 150, C.gold, mq, 2, 'rgba(40,30,0,0.4)'); lbl('c = 10 = 2 · 5', 1590, 555, C.gold, mq, 22); lbl('J_f = 3', 1590, 610, C.white, mq, 28);
    lbl('five values define no binary operation on real inputs', 1380, 705, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'The three occupation means leave one number hidden', 0.6, 0.3);
  if (q > 0) {
    const F_ = FIB076, k = F_.lo + (F_.hi - F_.lo) * (0.5 - 0.5 * Math.cos(u * 1.3));
    chip(530, 255, 820, 56, 'X = p₁ + p₁₃ = 0.45 ,  Y = p₃ + p₁₃ = 0.40 ,  Z = p₂ = 0.25', C.white, q, 18);
    const pv = [1 - F_.X - F_.Y - F_.Z + k, F_.X - k, F_.Z, F_.Y - k, k];
    const y0 = 610;
    pv.forEach((v, i) => { const x = 195 + i * 135, h = v * 600; fillBox(x, y0 - h, 90, h, MC076[i], q * 0.4); rect63(x, y0 - h, 90, h, MC076[i], q, 2); lbl(MN076[i], x + 45, y0 + 30, MC076[i], q, 20); lbl(v.toFixed(2), x + 45, y0 - h - 12, C.white, q, 16); });
    line(170, y0, 860, y0, C.dim, q, 1.5);
    const kq = Q(S, 1, 'the joint probability kappa', 0.6);
    const sx0 = 220, sx1 = 820, ky = 700, kx = sx0 + (k - F_.lo) / (F_.hi - F_.lo) * (sx1 - sx0);
    line(sx0, ky, sx1, ky, C.green, kq, 3); dot(kx, ky, 13, 'n', kq);
    lbl('κ = p₁₃', kx, ky - 22, C.green, kq, 17);
    const iq = Q(S, 1, 'free between the maximum of zero', 0.6);
    lbl('max(0 , X+Y+Z−1) = 0.10', sx0, ky + 38, C.white, iq, 16, 'left'); lbl('min(X , Y) = 0.40', sx1, ky + 38, C.white, iq, 16, 'right');
    lbl('blind direction (1 , −1 , 0 , −1 , 1)', 530, 790, C.dim, iq, 15);
    const pq = Q(S, 1, 'Means fix an expectation exactly when J f is zero', 0.6);
    const px = 1060, py = 640, pw = 680, ph = 330, xS = x => px + (x - 0.05) / 0.4 * pw, yS = v => py - (v - 3.4) / 1.6 * ph;
    plotAxes(px, py, pw, ph, iq, '', 'E_p f at fixed X , Y , Z');
    lbl('κ', px + pw / 2, py + 30, C.dim, iq, 18);
    curve(p => { const x = F_.lo + p * (F_.hi - F_.lo); return [xS(x), yS(interp076(F_.E, x))]; }, 40, C.gold, iq, 3);
    lbl('f₁₃ = 10 : slope J_f = 3', xS(0.4), yS(4.85) - 12, C.gold, iq, 16, 'right');
    curve(p => { const x = F_.lo + p * (F_.hi - F_.lo); return [xS(x), yS(3.65)]; }, 4, C.cyan, pq, 3);
    lbl('f₁₃ = 7 : J_f = 0 , flat', xS(0.4), yS(3.65) + 30, C.cyan, pq, 16, 'right');
    dashed(xS(k), py, xS(k), py - ph, C.green, iq * 0.6, 1.2);
    dashed(xS(F_.lo), py, xS(F_.lo), py - ph * 0.95, C.dim, iq * 0.5, 1); dashed(xS(F_.hi), py, xS(F_.hi), py - ph * 0.95, C.dim, iq * 0.5, 1);
    lbl('0.10', xS(F_.lo), py + 26, C.dim, iq, 14); lbl('0.40', xS(F_.hi), py + 26, C.dim, iq, 14);
    chip(1400, 735, 760, 54, 'E_p f = f₀ + … + J_f · κ  :  fixed by X , Y , Z  ⇔  J_f = 0', C.white, pq, 18);
    lbl('path windows 1 , 2 , 3 : modes 2 , 3 , 5 vs mean terms 2 , 3 , 4 — three sites is the shortest window with a gap', 1400, 795, C.dim, pq, 14);
  }
};

/* ---- 04 CLIFFORD ---- */
SCENES.clifford = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [1, 'Transport that unit through five matrix units', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Transport that unit through five matrix units', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Complex numbers enter through composition', 0.6) * f1;
    const v = v3(450, 520, 230, 0.6 + t * 0.15, 0.45), O = v(0, 0, 0);
    const ax = [['u', [1, 0, 0], C.cyan, 'c'], ['v', [0, 1, 0], C.gold, 'g'], ['n', [0, 0, 1], C.mag, 'm']];
    const pl = []; for (let i = 0; i <= 40; i++) { const a_ = i / 40 * TAU; pl.push(v(0.55 * Math.cos(a_), 0.55 * Math.sin(a_), 0)); }
    fillPoly(pl, C.cyan, q * 0.08); strokePoly(pl, C.cyan, q * 0.5, 1.5);
    ax.forEach(([s, d, col, dn]) => { const p = v(...d); arrow(O[0], O[1], p[0], p[1], col, q, 3.5); dot(p[0], p[1], 12, dn, q); lbl(s, p[0] + 22, p[1] + 8, col, q, 26, 'left'); });
    const jq = Q(S, 0, 'squares to minus one', 0.6) * f1;
    const arc = []; for (let i = 0; i <= 24; i++) { const a_ = i / 24 * Math.PI * 0.5; arc.push(v(0.4 * Math.cos(a_), 0.4 * Math.sin(a_), 0)); }
    strokePoly(arc, C.green, jq, 3, false); lbl('uv : x ↦ n × x , (uv)² = −1', 450, 790, C.green, jq, 17);
    chip(1380, 255, 820, 60, 'ab + ba = 2⟨a, b⟩ 1', C.cyan, Q(S, 0, 'the Clifford rule', 0.6) * f1, 28);
    lbl('composition of directions , not only distance and angle', 1380, 318, C.dim, Q(S, 0, 'the Clifford rule', 0.6) * f1, 15);
    chip(1380, 395, 820, 60, 'ω = uvn :  ω² = −1 ,  ω† = −ω ,  ω central', C.mag, jq, 23);
    const gq = Q(S, 0, 'the axes generate two by two complex matrices', 0.6) * f1;
    ['1', 'u', 'v', 'n', 'uv', 'vn', 'nu', 'uvn'].forEach((s, i) => cell076(1010 + i * 94, 470, 84, 64, s, [C.white, C.cyan, C.gold, C.mag, C.green, C.green, C.green, C.mag][i], clamp(gq * 1.6 - i / 12), 22));
    lbl('8 real words  →  Cl₃,₀ ≅ M₂(ℂ) as real *-algebras', 1380, 580, C.white, gq, 19);
    lbl('u , v , n ↦ σx , σy , σz ;  corner p = (1 + n)/2 ,  j = ωp ,  j² = −p', 1380, 625, C.dim, gq, 15);
    stamp('i FROM COMPOSITION', 1380, 730, gq, C.gold, 30, -0.04);
  }
  const q = Q(S, 1, 'Transport that unit through five matrix units', 0.6, 0.3);
  if (q > 0) {
    const gx = 190, gy = 255, cw = 104;
    for (let s = 0; s < 5; s++) for (let tt = 0; tt < 5; tt++) { const qq = clamp(q * 1.8 - (s * 5 + tt) / 30), x = gx + tt * cw, y = gy + s * cw; box(x, y, cw - 10, cw - 10, s === tt ? C.gold : C.cyan, qq, 1.5, 'rgba(0,0,0,0.45)'); lbl('E', x + 26, y + 40, C.cyan, qq, 18); lbl('F', x + 66, y + 72, C.mag, qq, 18); }
    MN076.forEach((m, i) => { lbl(m, gx - 30, gy + i * cw + 52, MC076[i], q, 17); lbl(m, gx + i * cw + 47, gy - 12, MC076[i], q, 17); });
    lbl('E_st E_uv = δ_tu E_sv ,  F_st = E_s0 j E_0t', 440, 790, C.dim, q, 16);
    const fq = Q(S, 1, 'fifty real elements form exactly M five of C', 0.6);
    chip(1380, 255, 820, 60, '25 E + 25 F = 50 real elements  ≅  M₅(ℂ)', C.cyan, fq, 24);
    chip(1380, 345, 820, 60, 'J = Σ_s F_ss :  J² = −1 ,  J† = −J ,  Z = span{1 , J}', C.mag, Q(S, 1, 'one shared i on every mode', 0.6), 21);
    stamp('ONE SHARED i', 1380, 455, Q(S, 1, 'one shared i on every mode', 0.6), C.green, 34, -0.04);
    const oq = Q(S, 1, 'Odd dimension blocks shortcuts', 0.6);
    lbl('ODD DIMENSION', 1380, 545, C.red, oq, 20);
    chip(1380, 600, 820, 56, 'real 5×5 :  L² = −I  ⇒  det(L)² = −1   ✗', C.red, Q(S, 1, 'no real five by five matrix squares to minus one', 0.6), 21);
    chip(1380, 680, 820, 56, 'AB = −BA  ⇒  det(AB) = (−1)⁵ det(BA)   ⇒  not invertible', C.red, Q(S, 1, 'no two invertible ones anticommute', 0.6), 19);
    lbl('so three Pauli-type axes cannot act on all five modes at once', 1380, 740, C.dim, Q(S, 1, 'no two invertible ones anticommute', 0.6), 15);
  }
};

/* ---- 05 BORN ---- */
SCENES.born = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [1, 'Frames alone are not enough', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Frames alone are not enough', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A valuation additive on every effect', 0.6) * f1;
    box(150, 245, 760, 190, C.cyan, q, 2, 'rgba(0,30,40,0.4)');
    lbl('EVERY EFFECT', 530, 285, C.cyan, q, 20);
    lblG('Eff₅ = { E = E† : 0 ≤ E ≤ I }', 530, 335, C.white, q, 26);
    lblG('μ(I) = 1 ,  μ(E + F) = μ(E) + μ(F)  when E + F ≤ I', 530, 390, C.white, q, 20);
    const bq = Q(S, 0, 'must be the Born rule', 0.6) * f1;
    arrow(530, 445, 530, 495, C.gold, bq, 3);
    chip(530, 535, 760, 66, 'μ(E) = tr(ρE) ,  ρ ⪰ 0 ,  tr ρ = 1', C.gold, bq, 28);
    const cq = Q(S, 0, 'continuity comes for free', 0.6) * f1;
    chip(530, 625, 760, 54, '|μ(E) − μ(F)| ≤ ‖E − F‖_op  — a conclusion , not an axiom', C.green, cq, 19);
    lblG('pure states :  μ(|φ⟩⟨φ|) = |⟨φ, ψ⟩|²', 530, 700, C.white, cq, 22);
    lbl('Busch , PRL 91 , 120403 (2003) , finite-dimensional full-effect version', 530, 750, C.cyan, bq, 15);
    const mq = Q(S, 0, 'not only on the five mode projections', 0.6) * f1;
    const gx = 1150, gy = 260, cw = 84;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const d = i === j; box(gx + j * cw, gy + i * cw, cw - 8, cw - 8, d ? C.gold : C.dim, mq, 1.6, d ? 'rgba(40,30,0,0.45)' : 'rgba(0,0,0,0.45)'); lblG(d ? 'ρ' + MN076[i] : '?', gx + j * cw + 38, gy + i * cw + 48, d ? C.white : C.dim, mq, d ? 17 : 22); }
    lbl('one five-outcome test sees only the diagonal of ρ', 1358, 715, C.gold, mq, 17);
    lbl('the full effect domain is an extra condition', 1358, 750, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'Frames alone are not enough', 0.6, 0.3);
  if (q > 0) {
    const fq = Q(S, 1, 'Every orthonormal frame has a fitting state', 0.6);
    qubit(470, 470, 190, 0.9, 0.5, q, C.dim, t);
    const v = v3(470, 470, 190, t * 0.4, 0.28);
    const O = v(0, 0, 0);
    const fr = [[Math.cos(t * 0.5), Math.sin(t * 0.5), 0.3], [-Math.sin(t * 0.5), Math.cos(t * 0.5), -0.25], [0, 0, 1]];
    const nrm = a => { const l = Math.hypot(...a); return a.map(x => x / l); };
    const e1 = nrm(fr[0]); let e2 = fr[1]; const dp = e2[0] * e1[0] + e2[1] * e1[1] + e2[2] * e1[2]; e2 = nrm(e2.map((x, i) => x - dp * e1[i])); const e3 = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
    [e1, e2, e3].forEach((e, i) => { const p = v(e[0], e[2], e[1]); arrow(O[0], O[1], p[0], p[1], [C.cyan, C.gold, C.mag][i], fq, 3); });
    const r = [0, 0, 0]; [e1, e2, e3].forEach(e => { const c3 = Math.pow(e[2], 3); for (let k = 0; k < 3; k++) r[k] += c3 * e[k]; });
    const rp = v(r[0], r[2], r[1]); arrow(O[0], O[1], rp[0], rp[1], C.green, fq, 4); dot(rp[0], rp[1], 12, 'n', fq);
    lbl('frame (n₁ , n₂ , n₃) ,  fitting r = Σ n_iz³ n_i ,  ‖r‖ ≤ 1', 470, 720, C.green, fq, 16);
    lbl('5000 random frames : max ‖r‖ = 0.9993', 470, 755, C.dim, fq, 15);
    chip(1380, 255, 820, 58, 'μ(P_n) = (1 + n_z³)/2 ,  μ(P_n) + μ(P_−n) = 1', C.gold, Q(S, 1, 'let mu of P n be one plus n z cubed', 0.6), 22);
    const pq = Q(S, 1, 'let mu of P n be one plus n z cubed', 0.8);
    const px = 1040, py = 700, pw = 700, ph = 360, xS = z => px + (z + 1) / 2 * pw, yS = v_ => py - v_ * ph;
    plotAxes(px, py, pw, ph, pq, 'n_z', 'probability of P_n');
    curve(p => { const z = -1 + 2 * p; return [xS(z), yS(interp076(BORN076, z, 1))]; }, 80, C.gold, pq, 3);
    const sq = Q(S, 1, 'where the standard axes force three quarters', 0.6);
    curve(p => { const z = -1 + 2 * p; return [xS(z), yS(interp076(BORN076, z, 2))]; }, 80, C.cyan, sq, 3);
    const nq = Q(S, 1, 'at n z one half it gives nine sixteenths', 0.6);
    dashed(xS(0.5), py, xS(0.5), yS(0.85), C.dim, nq, 1.2);
    dot(xS(0.5), yS(9 / 16), 11, 'g', nq); lbl('9/16', xS(0.5) + 18, yS(9 / 16) + 26, C.gold, nq, 20, 'left');
    dot(xS(0.5), yS(3 / 4), 11, 'c', sq); lbl('3/4', xS(0.5) - 18, yS(3 / 4) - 8, C.cyan, sq, 20, 'right');
    lbl('Born with r = (0, 0, 1) : (1 + n_z)/2', xS(-0.95), yS(0.92), C.cyan, sq, 15, 'left');
    lbl('n_z = 1/2', xS(0.5), py + 28, C.dim, nq, 14);
    stamp('FRAMES ≠ ALL EFFECTS', 1390, 780, sq, C.red, 26, -0.03);
  }
};

/* ---- 06 KERNEL (records and references) ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'References force complete positivity', 'classical']]);
  const f1 = 1 - Q(S, 1, 'References force complete positivity', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a positive kernel is conserved across all branches', 0.6) * f1;
    chip(530, 255, 840, 58, 'K_t(x, y) = Σ_o K_t+1(r_o x , r_o y)   for all x , y', C.cyan, q, 21);
    lbl('cross terms included ; failure and stop are outcomes', 530, 315, C.dim, q, 15);
    dot(220, 470, 16, 'w', q); lbl('x', 220, 440, C.white, q, 22);
    [[560, 370, 'r₁x'], [560, 470, 'r₂x'], [560, 570, 'r₃x']].forEach(([x, y, s], i) => { const qq = clamp(q * 1.6 - i * 0.2); arrow(240, 470, x - 22, y, [C.cyan, C.gold, C.mag][i], qq, 2.5); dot(x, y, 13, ['c', 'g', 'm'][i], qq); lbl(s, x + 24, y + 7, C.white, qq, 20, 'left'); lbl('M' + (i + 1), 400, y - (i - 1) * 2 + (i === 1 ? -12 : (i === 0 ? -18 : 24)), [C.cyan, C.gold, C.mag][i], qq, 16); });
    const iq = Q(S, 0, 'keeping the outcome is an isometry', 0.6) * f1;
    chip(530, 665, 840, 56, 'Σ_o M_o† M_o = I ,   V ψ = Σ_o M_o ψ ⊗ |o⟩ ,  V†V = I', C.gold, iq, 20);
    lbl('linear because all finite null relations descend to the quotient', 530, 722, C.dim, iq, 15);
    const rq = Q(S, 0, 'Equal branches can still differ in record phase', 0.6) * f1;
    chip(1380, 255, 760, 56, 'V₊ z = z |+⟩      V₋ z = z |−⟩', C.white, rq, 22);
    const y0 = 540, hs = 180;
    [[1080, 'V₊', C.cyan, [0.5, 0.5], 'n'], [1440, 'V₋', C.mag, [0.5, 0.5], 'm']].forEach(([x, s, col, v]) => { lbl(s + ' : record basis |0⟩ , |1⟩', x + 120, 340, col, rq, 16); v.forEach((p, j) => { const h = p * hs; fillBox(x + j * 130, y0 - h, 100, h, col, rq * 0.35); rect63(x + j * 130, y0 - h, 100, h, col, rq, 2); lbl('1/2', x + j * 130 + 50, y0 - h - 12, C.white, rq, 17); lbl('|' + j + '⟩', x + j * 130 + 50, y0 + 26, C.dim, rq, 16); }); });
    const tq = Q(S, 0, 'one later test gives one, or zero', 0.6) * f1;
    [[1080, C.cyan, 1], [1440, C.mag, 0]].forEach(([x, col, p]) => { const h = p * 230; fillBox(x + 60, 740 - h * 0.5, 140, h * 0.5, col, tq * 0.35); rect63(x + 60, 740 - Math.max(2, h * 0.5), 140, Math.max(2, h * 0.5), col, tq, 2); lbl('|+⟩⟨+| : ' + p, x + 130, 740 - h * 0.5 - 12, C.white, tq, 18); });
    line(1060, 740, 1720, 740, C.dim, tq, 1.2);
    lbl('same ordinary branches , different cross block', 1380, 790, C.gold, tq, 16);
  }
  const q = Q(S, 1, 'References force complete positivity', 0.6, 0.3);
  if (q > 0) {
    const tq = Q(S, 1, 'Transposition keeps every single state positive', 0.6);
    chip(530, 255, 840, 58, 'T : X ↦ Xᵀ  is positive and trace-preserving', C.cyan, tq, 22);
    const eq = Q(S, 1, 'on half of a maximally entangled pair', 0.6);
    chip(530, 340, 840, 58, '(id ⊗ T)(|Ω⟩⟨Ω|) = Swap / 2', C.gold, eq, 26);
    const vq = Q(S, 1, 'it gives the swap over two', 0.6);
    const y0 = 560, hs = 220;
    PTEV076.forEach((v, i) => { const x = 230 + i * 160, h = v * hs * vq; const col = v < 0 ? C.red : C.cyan; if (v < 0) { fillBox(x, y0, 110, -h, col, 0.4 * vq); rect63(x, y0, 110, -h, col, vq, 2); } else { fillBox(x, y0 - h, 110, h, col, 0.4 * vq); rect63(x, y0 - h, 110, h, col, vq, 2); } lbl((v > 0 ? '+' : '−') + '1/2', x + 55, v < 0 ? y0 - h + 30 : y0 - h - 12, C.white, vq, 20); });
    line(200, y0, 860, y0, C.dim, vq, 1.5);
    lbl('eigenvector (|01⟩ − |10⟩)/√2 : −1/2  →  not a legal process with a reference', 530, 730, C.red, Q(S, 1, 'with eigenvalue minus one half', 0.6), 15);
    const uq = Q(S, 1, 'a process with a legal inverse process must be unitary', 0.6);
    box(1010, 300, 760, 210, C.green, uq, 2, 'rgba(0,40,20,0.35)');
    lblG('Φ , Ψ CPTP ,  ΨΦ = ΦΨ = id', 1390, 360, C.white, uq, 26);
    lblG('⇒  Φ(X) = U X U†', 1390, 420, C.green, uq, 32);
    lbl('Heisenberg dual is a *-isomorphism ; same dimension', 1390, 475, C.dim, uq, 15);
    lbl('depolarising λ = 0.6 : its linear inverse has Choi eigenvalue −1/3', 1390, 565, C.white, uq, 16);
    lbl('so the inverse map is not a process ; unitary inverses are', 1390, 600, C.dim, uq, 15);
    lbl('Nayak–Sen , quant-ph/0605041 ; Choi–Kraus : Watrous , ch. 2', 1390, 645, C.cyan, uq, 15);
    stamp('REFERENCES ⇒ CP', 1390, 745, Q(S, 1, 'with eigenvalue minus one half', 0.6), C.gold, 32, -0.04);
  }
};

/* ---- 07 WITNESS ---- */
SCENES.witness = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, "Now the project's own wait", 0.6);
  pyr63(400, 400, 210, 0.7 + t * 0.15, q0, { K: 1 });
  lbl('K : ∅ to 1 , 2 , 3 ;  13 to 1 and 3', 400, 600, C.gold, q0, 16);
  const kq = Q(S, 0, 'U of t equals e to the minus i t K', 0.6);
  const Km = [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0]];
  mgrid(270, 630, Km, 52, 34, kq, { size: 17, colf: v => (v ? C.gold : C.dim) });
  lbl('U(t) = e^(−itK)', 680, 700, C.white, kq, 20, 'left'); lbl('(K²)₀₀ = 3', 680, 735, C.gold, kq, 18, 'left');
  const f1 = 1 - Q(S, 1, 'Yet for small t the return to empty differs', 0.6);
  if (f1 > 0) {
    const aq = Q(S, 0, 'Wait twice', 0.6) * f1, bq = Q(S, 0, 'read all five modes, forget the result', 0.6) * f1;
    const stepA = ['|0⟩', 'U(t)', 'U(t)', 'read'], stepB = ['|0⟩', 'U(t)', 'read , forget', 'U(t)', 'read'];
    lbl('A', 990, 288, C.cyan, aq, 22); stepA.forEach((s, i) => { cell076(1020 + i * 175, 255, 150, 50, s, C.cyan, aq, 17); if (i < 3) arrow(1172 + i * 175, 280, 1193 + i * 175, 280, C.dim, aq, 2); });
    lbl('B', 990, 368, C.gold, bq, 22); stepB.forEach((s, i) => { cell076(1020 + i * 145, 335, 130, 50, s, i === 2 ? C.red : C.gold, bq, i === 2 ? 14 : 17); if (i < 4) arrow(1152 + i * 145, 360, 1163 + i * 145, 360, C.dim, bq, 2); });
    const mq = Q(S, 0, 'Halfway, the populations are identical', 0.6) * f1;
    const y0 = 700, hs = 300;
    [[1040, 'A at the midpoint', C.cyan], [1420, 'B at the midpoint', C.gold]].forEach(([x, s, col]) => { lbl(s, x + 150, 440, col, mq, 17); WPOP076.forEach((p, i) => { const h = p * hs; fillBox(x + i * 64, y0 - h, 48, h, MC076[i], mq * 0.4); rect63(x + i * 64, y0 - h, 48, h, MC076[i], mq, 1.6); lbl(MN076[i], x + i * 64 + 24, y0 + 26, MC076[i], mq, 15); }); });
    lbl('=', 1375, 600, C.white, mq, 40);
    lbl('t = 0.3 : populations 0.756 , 0.077 , 0.082 , 0.077 , 0.008 in both', 1390, 770, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'Yet for small t the return to empty differs', 0.6, 0.3);
  if (q > 0) {
    const px = 1040, py = 740, pw = 700, ph = 340, xS = x => px + x / 0.8 * pw, yS = v => py - (v - 0.0) / 1.0 * ph;
    plotAxes(px, py, pw, ph, q, '', 'probability of reading ∅ at the end');
    lbl('t', px + pw + 22, py + 6, C.dim, q, 18, 'left');
    const aq = Q(S, 1, 'one minus twelve t squared without the read', 0.6), bq = Q(S, 1, 'one minus six t squared with it', 0.6);
    curve(p => { const x = p * 0.8; return [xS(x), yS(interp076(WIT076, x, 1))]; }, 80, C.cyan, aq, 3);
    curve(p => { const x = p * 0.8; return [xS(x), yS(interp076(WIT076, x, 2))]; }, 80, C.gold, bq, 3);
    lbl('A : 1 − 12t² + O(t⁴)', xS(0.3), yS(interp076(WIT076, 0.3, 1)) - 4, C.cyan, aq, 17, 'right');
    lbl('B : 1 − 6t² + O(t⁴)', xS(0.42), yS(interp076(WIT076, 0.42, 2)) - 16, C.gold, bq, 17, 'left');
    [0.2, 0.4, 0.6, 0.8].forEach(x => lbl(String(x), xS(x), py + 26, C.dim, q, 14)); lbl('0', px, py + 26, C.dim, q, 14);
    chip(1390, 255, 760, 54, 'p_B − p_A = 6t² + O(t⁴) > 0 for small t > 0', C.white, bq, 19);
    const sq = Q(S, 1, 'Five populations still miss what a native future test needs', 0.6);
    stamp('POPULATIONS ARE NOT ENOUGH', 1390, 805, sq, C.red, 22, -0.02);
    const nq = Q(S, 1, 'not every classical model with extra hidden state', 0.6);
    lbl('refutes this summary ; hidden-state classical models are not excluded', 1390, 315, C.dim, nq, 15);
  }
};

/* ---- 08 CONTROL ---- */
SCENES.control = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'One fixed phase gate, S star', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Three independent flips', 0.6) * f1;
    pyrG64(430, 460, 230, 0.6 + t * 0.15, q, [1, 1, 1], 0.8);
    [['R₁ : 0–1 , 3–13', C.cyan], ['R₂ : 0–2', C.gold], ['R₃ : 0–3 , 1–13', C.mag]].forEach(([s, col], i) => lbl(s, 180 + i * 260, 750, col, q, 18, 'left'));
    lbl('each a PXP flip that keeps the legal space', 430, 790, C.dim, q, 15);
    const dq = Q(S, 0, 'reach exactly D S O five D dagger', 0.6) * f1;
    chip(1380, 255, 820, 58, 'words = D · SO(5) · D† ,   D = diag(1, i, i, i, 1)', C.cyan, dq, 21);
    lbl('L_j = D†(−iH_j)D real antisymmetric ; Lie algebra dimension 10 = so(5)', 1380, 315, C.dim, dq, 15);
    const hq = Q(S, 0, "The pyramid's Hodge-dual swap lies outside", 0.6) * f1;
    box(1000, 350, 760, 200, C.mag, hq, 2, 'rgba(40,0,40,0.35)');
    lbl('Hodge compression T = Q_S ⋆ :  T†T = P₂ + P₁₃', 1380, 390, C.white, hq, 17);
    lblG('U_rel = T + P₀ + |3⟩⟨1| + |1⟩⟨3|', 1380, 440, C.mag, hq, 24);
    lbl('1 ↔ 3 , 2 ↔ 13 ;  U_rel² = I ,  det = 1', 1380, 485, C.white, hq, 17);
    lbl('D† U_rel D sends |2⟩ to i|13⟩ : no global phase makes it real', 1380, 525, C.dim, hq, 15);
    const sq = Q(S, 0, 'stays at least one half away', 0.6) * f1;
    const bx = 1120, by = 715, bw = 520;
    lbl('native wait , read , stop : real in the D frame', 1380, 590, C.white, sq, 16);
    line(bx, by, bx + bw, by, C.dim, sq, 1.5);
    fillBox(bx, by - 30, bw * 0.43, 30, C.cyan, sq * 0.5); rect63(bx, by - 30, bw * 0.43, 30, C.cyan, sq, 1.6);
    dashed(bx + bw * 0.5, by + 10, bx + bw * 0.5, by - 60, C.red, sq, 2);
    lbl('max ⟨y, σy⟩ over 3000 real states : 0.43 ≤ 1/2', bx, by - 42, C.cyan, sq, 15, 'left');
    lbl('1/2', bx + bw * 0.5, by + 26, C.red, sq, 16); lbl('1', bx + bw, by + 26, C.dim, sq, 14);
    chip(1380, 775, 640, 46, '⇒  sup trace distance to U_rel ≥ 1/2', C.red, sq, 18);
    lbl('no quantum bypass , no extra quantum memory', 1380, 625, C.dim, sq, 14);
  }
  const q = Q(S, 1, 'One fixed phase gate, S star', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 840, 58, 'S* = e^(iπP₁₃/2) = diag(1, 1, 1, 1, i) ,  det S* = i', C.gold, q, 20);
    const wq = Q(S, 1, 'with R one and R three, all of S U four on the base', 0.6);
    chip(530, 340, 840, 56, 'R₃(−π/2) S* R₃(π/2) S* = diag(1, 1, i, i) on the base', C.cyan, wq, 19);
    lbl('base = span(|0⟩ , |1⟩ , |3⟩ , |13⟩) , mode |2⟩ untouched', 530, 395, C.dim, wq, 15);
    const rq = Q(S, 1, 'determinant a fourth root of unity', 0.6);
    const cx = 530, cy = 590, R = 140;
    ring(cx, cy, R, C.dim, rq, 2); line(cx - R - 30, cy, cx + R + 30, cy, C.dim, rq * 0.5, 1); line(cx, cy - R - 30, cx, cy + R + 30, C.dim, rq * 0.5, 1);
    [[1, 0, '1'], [0, -1, 'i'], [-1, 0, '−1'], [0, 1, '−i']].forEach(([a, b, s]) => { dot(cx + a * R, cy + b * R, 13, 'g', rq); lbl(s, cx + a * (R + 34), cy + b * (R + 30) + 8, C.gold, rq, 20); });
    lbl('det of every word ∈ {1 , i , −1 , −i}', cx, cy + R + 64, C.white, rq, 17);
    const gq = Q(S, 1, 'adding R two, all of S U five', 0.6);
    const px = 1050, py = 700, pw = 700, ph = 320;
    plotAxes(px, py, pw, ph, wq, '', 'real dimension of the reachable Lie algebra');
    GRP076.forEach(([s, d], i) => { const qq = i === 0 ? wq : i === 1 ? wq : i === 2 ? gq : gq * 0.7, x = px + 40 + i * 168, h = d / 25 * ph * 0.92 * clamp(qq * 1.4); const col = [C.cyan, C.gold, C.green, C.vio][i]; fillBox(x, py - h, 110, h, col, qq * 0.4); rect63(x, py - h, 110, h, col, qq, 2); lbl(String(d), x + 55, py - h - 12, C.white, qq, 22); lblG(s, x + 55, py + 28, col, qq, 16); });
    lbl('R₁ R₂ R₃', px + 95, py + 52, C.dim, wq, 13); lbl('R₁ R₃ S*', px + 263, py + 52, C.dim, wq, 13); lbl('+ R₂', px + 431, py + 52, C.dim, gq, 13); lbl('continuous phase', px + 599, py + 52, C.dim, gq, 13);
    stamp('ALL FIVE-MODE GATES', 1400, 290, gq, C.green, 28, -0.03);
  }
};

/* ---- 09 PHASE ---- */
SCENES.phase = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So probabilities can stand still', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Under the gate e to the minus i t f', 0.6) * f1;
    chip(530, 255, 840, 58, 'U_f(t) = e^(−it diag f) ,  f = (0 , 2 , 3 , 5 , 10)', C.white, q, 20);
    const fr = [0, 2, 3, 5, 10], rate = 0.22, uu = Math.max(0, u - lineAt(S, 0).s);
    fr.forEach((f, i) => { const x = 200 + i * 165; dial64(x, 400, 55, 0.4 + rate * f * uu, MC076[i], q); lbl('θ' + ['₀', '₁', '₂', '₃', '₁₃'][i], x, 485, MC076[i], q, 20); fillBox(x - 24, 560 - 0.2 * 150, 48, 0.2 * 150, MC076[i], q * 0.4); rect63(x - 24, 560 - 30, 48, 30, MC076[i], q, 1.5); lbl('1/5', x, 585, C.dim, q, 14); });
    lbl('populations stay at 1/5', 530, 615, C.dim, Q(S, 0, 'while no population moves', 0.6) * f1, 15);
    const pq = Q(S, 0, 'the relation phase', 0.6) * f1;
    dial64(530, 705, 60, 0.4 + rate * 3 * uu, C.green, pq);
    lbl('Φ = θ₀ + θ₁₃ − θ₁ − θ₃', 330, 690, C.green, pq, 18, 'right'); lbl('rate J_f = 3', 330, 725, C.white, Q(S, 0, 'advances by t J f', 0.6) * f1, 18, 'right');
    lbl('single-site shifts leave Φ fixed', 730, 715, C.dim, pq, 15, 'left');
    const cq = Q(S, 0, 'On the base, the gate is a product exactly when', 0.6) * f1;
    const px = 1050, py = 640, pw = 700, ph = 330, xS = x => px + x / (4 * Math.PI) * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, cq, '', 'entanglement of U_f(t)|++⟩');
    lbl('t J_f', px + pw + 22, py + 6, C.dim, cq, 18, 'left');
    curve(p => { const x = p * 4 * Math.PI; return [xS(x), yS(interp076(CONC076, x))]; }, 120, C.mag, cq, 3);
    [[0, '0'], [2 * Math.PI, '2π'], [4 * Math.PI, '4π']].forEach(([x, s]) => { dot(xS(x), yS(0), 11, 'g', cq); lbl(s, xS(x), py + 28, C.gold, cq, 17); });
    lbl('concurrence |sin(tJ_f/2)|', px + pw, py - ph - 14, C.mag, cq, 17, 'right');
    chip(1400, 735, 700, 52, 'product gate  ⇔  t J_f ∈ 2πℤ', C.gold, cq, 21);
  }
  const q = Q(S, 1, 'So probabilities can stand still', 0.6, 0.3);
  if (q > 0) {
    const mq = Q(S, 1, 'one minus sign gives a maximally entangled base state', 0.6);
    lbl('base amplitudes , logical bits (a , b)', 450, 260, C.dim, q, 16);
    [['00', '+½'], ['01', '+½'], ['10', '+½'], ['11', '−½']].forEach(([s, v], i) => { const x = 270 + (i % 2) * 190, y = 290 + Math.floor(i / 2) * 150; const neg = v[0] === '−'; box(x, y, 170, 130, neg ? C.red : C.cyan, mq, 2, neg ? 'rgba(50,0,10,0.45)' : 'rgba(0,30,40,0.45)'); lbl(v, x + 85, y + 72, C.white, mq, 34); lbl('|' + s + '⟩', x + 85, y + 112, C.dim, mq, 16); });
    lbl('each mode 1/4 ;  marginal I₂/2 :  maximally entangled', 450, 640, C.white, mq, 17);
    lbl('all signs + : product state , same four populations', 450, 680, C.dim, mq, 15);
    const rq = Q(S, 1, 'A fixed reference pulse R one of alpha reads the phase', 0.6);
    chip(1400, 255, 760, 56, 'ψ_θ = (|0⟩ + |1⟩ + |2⟩ + |3⟩ + e^(−iθ)|13⟩)/√5', C.white, rq, 19);
    lbl('all populations 1/5 , means (2/5 , 2/5 , 1/5) for every θ', 1400, 312, C.dim, rq, 15);
    const px = 1050, py = 700, pw = 700, ph = 330, xS = x => px + x / (2 * Math.PI) * pw, yS = v => py - (v - 0.1) / 0.6 * ph;
    plotAxes(px, py, pw, ph, rq, '', 'after R₁(π/4) , α = π/4');
    lbl('θ', px + pw + 22, py + 6, C.dim, rq, 18, 'left');
    const nq = Q(S, 1, 'N x shifts by sine two alpha sine theta over five', 0.6);
    curve(p => { const x = p * 2 * Math.PI; return [xS(x), yS(interp076(READ076, x))]; }, 80, C.cyan, nq, 3);
    curve(p => [xS(p * 2 * Math.PI), yS(0.4)], 2, C.gold, nq, 2.5);
    curve(p => [xS(p * 2 * Math.PI), yS(0.2)], 2, C.mag, nq, 2.5);
    lbl('⟨N_x⟩ = 2/5 + sin 2α · sin θ / 5', xS(Math.PI * 0.5), yS(0.6) - 14, C.cyan, nq, 17, 'left');
    lbl('⟨N_y⟩ = 2/5', xS(2 * Math.PI) - 8, yS(0.4) - 10, C.gold, nq, 16, 'right'); lbl('⟨N_z⟩ = 1/5', xS(2 * Math.PI) - 8, yS(0.2) - 10, C.mag, nq, 16, 'right');
    ['0', 'π', '2π'].forEach((s, i) => lbl(s, xS(i * Math.PI) + (i === 1 ? 18 : 0), py + 26, C.dim, nq, 15));
    lbl('one sine component of the phase , not a full reconstruction', 1400, 790, C.dim, nq, 15);
  }
};

/* ---- 10 SEAM ---- */
SCENES.seam = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Composition also separates complex from real', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two atoms side by side', 0.6) * f1;
    const gq = Q(S, 0, 'allow only twenty-one of the twenty-five mode pairs', 0.6) * f1;
    const gx = 240, gy = 300, cw = 92;
    lbl('right window t →', gx + 2.5 * cw, gy - 40, C.dim, q, 16); lbl('left s ↓', gx - 40, gy - 14, C.dim, q, 16, 'right');
    MN076.forEach((m, i) => { lbl(m, gx + i * cw + 41, gy - 10, MC076[i], q, 17); lbl(m, gx - 18, gy + i * cw + 52, MC076[i], q, 17, 'right'); });
    SEAM076.forEach(([i, j, ok]) => { const qq = clamp(q * 1.6 - (i * 5 + j) / 30); const bad = !ok && gq > 0; box(gx + j * cw, gy + i * cw, cw - 10, cw - 10, bad ? C.red : C.cyan, qq, 1.6, bad ? 'rgba(60,0,10,0.55)' : 'rgba(0,30,40,0.4)'); lbl(bad ? '✗' : '✓', gx + j * cw + 41, gy + i * cw + 54, bad ? C.red : C.cyan, qq, 22); });
    lbl('21 legal of 25 : left ends in 1 and right starts with 1 is forbidden', 470, 790, C.white, gq, 16);
    const nq = Q(S, 0, 'so they cannot hold C five tensor C five isometrically', 0.6) * f1;
    chip(1400, 255, 760, 56, 'dim 21 < 25 :  no isometry ℂ⁵ ⊗ ℂ⁵ → 21 modes', C.red, nq, 20);
    const bq = Q(S, 0, 'Adjacent three-site windows', 0.6) * f1;
    lbl('adjacent', 1100, 375, C.dim, bq, 16, 'left');
    cells64(1100, 395, '101101', 76, bq, C.cyan, { 2: C.red, 3: C.red }, 26);
    lbl('… 1 1 …  breaks no-11', 1328, 505, C.red, bq, 17);
    const sq = Q(S, 0, 'One separator site, set to zero', 0.6) * f1;
    lbl('with a separator', 1100, 560, C.dim, sq, 16, 'left');
    cells64(1060, 580, '1010101', 76, sq, C.cyan, { 3: C.gold }, 26);
    chip(1400, 720, 760, 56, 'ι(|s⟩ ⊗ |t⟩) = |s 0 t⟩ :  isometric , 25 = 25', C.green, sq, 20);
    lbl('independence of two atoms is a composition rule , not a picture', 1400, 785, C.dim, sq, 14);
  }
  const q = Q(S, 1, 'Composition also separates complex from real', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'Complex local product effects fix every joint state', 0.6), rq = Q(S, 1, 'Real ones cannot', 0.6);
    const px = 200, py = 700, pw = 660, ph = 380, yS = v => py - v / 17 * ph;
    plotAxes(px, py, pw, ph, cq, '', 'two qubits : directions of joint states');
    [[0, 'REAL', TOMO076[0], rq, C.gold], [1, 'COMPLEX', TOMO076[1], cq, C.cyan]].forEach(([k, s, [a, b], qq, col]) => { const x = px + 60 + k * 320; [[a, 'local products'], [b, 'joint states']].forEach(([v, l], j) => { const h = py - yS(v); fillBox(x + j * 120, py - h, 100, h, j ? C.dim : col, qq * 0.4); rect63(x + j * 120, py - h, 100, h, j ? C.white : col, qq, 2); lbl(String(v), x + j * 120 + 50, py - h - 12, C.white, qq, 22); lbl(l, x + j * 120 + 50, py + 26, C.dim, qq, 14); }); lbl(s, x + 110, py + 58, col, qq, 18); });
    lbl('real symmetric 4×4 : 10 directions ; Hermitian 4×4 : 16', 530, 790, C.dim, cq, 15);
    chip(1400, 255, 760, 56, 'J₀ = [[0, −1], [1, 0]] ,  T = J₀ ⊗ J₀', C.gold, rq, 22);
    lbl('Tᵀ = T ,  T² = I ,  tr T = 0', 1400, 315, C.white, rq, 18);
    const sq = Q(S, 1, 'the states one plus or minus epsilon J zero tensor J zero, over four', 0.6);
    chip(1400, 395, 760, 60, 'ρ± = (I ± εT) / 4', C.white, sq, 28);
    const aq = Q(S, 1, 'agree on every real local product', 0.6);
    lbl('tr((A ⊗ B) T) = tr(AJ₀) tr(BJ₀) = 0  for real symmetric A , B', 1400, 480, C.cyan, aq, 16);
    lbl('500 random pairs : |tr((A ⊗ B)T)| < 10⁻¹²', 1400, 515, C.dim, aq, 15);
    const eq = Q(S, 1, 'yet read plus and minus epsilon on that tensor', 0.6);
    chip(1400, 590, 760, 56, 'tr(T ρ±) = ± ε', C.mag, eq, 26);
    stamp('LOCALLY BLIND', 1400, 720, eq, C.red, 32, -0.04);
  }
};

/* ---- 11 MIRROR ---- */
SCENES.mirror = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'But the full history keeps its first difference forever', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Wait, read all five modes, and repeat', 0.6) * f1;
    chip(960, 255, 1500, 56, 'M_ij = |U_ij|² ,   η = ‖M − J₅‖ ,   D_tr(ρ_n , I/5) ≤ η^(n−1)   for the state averaged over past results', C.white, q, 18);
    const eq = Q(S, 0, 'with eta below two thirds for wait two thirds', 0.6) * f1;
    const px = 180, py = 720, pw = 680, ph = 360, xS = x => px + x / 1.5 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, q, '', 'η(t)');
    lbl('wait t', px + pw / 2, py + 30, C.dim, q, 17);
    curve(p => { const x = 0.05 + p * 1.45; return [xS(x), yS(interp076(ETA076, x))]; }, 100, C.cyan, q, 3);
    dot(xS(2 / 3), yS(0.66303), 11, 'g', eq); dashed(xS(2 / 3) - 60, yS(2 / 3), xS(2 / 3) + 60, yS(2 / 3), C.red, eq, 2);
    lbl('η(2/3) = 0.6630 < 2/3', xS(2 / 3) + 70, yS(2 / 3) - 6, C.gold, eq, 16, 'left');
    const oq = Q(S, 0, 'below twenty-three fiftieths for wait one', 0.6) * f1;
    dot(xS(1), yS(0.45001), 11, 'g', oq); dashed(xS(1) - 60, yS(0.46), xS(1) + 60, yS(0.46), C.red, oq, 2);
    lbl('η(1) = 0.4500 < 23/50', xS(1) + 70, yS(0.46) + 22, C.gold, oq, 16, 'left');
    [0.5, 1, 1.5].forEach(x => lbl(String(x), xS(x) + (x === 1 ? 0 : 0), py + 26, C.dim, q, 14));
    const dq = Q(S, 0, 'The state averaged over past results forgets', 0.6) * f1;
    const qx = 1060, qy = 720, qw = 680, qh = 360, lx = n => qx + (n - 1) / 11 * qw, ly = v => qy - (Math.log10(v) + 3.2) / 3.2 * qh;
    plotAxes(qx, qy, qw, qh, dq, '', 'trace distance to I/5 (log)');
    lbl('read n', qx + qw / 2, qy + 30, C.dim, dq, 17);
    curve(p => { const n = 1 + p * 11; return [lx(n), ly(Math.pow(0.66303, n - 1))]; }, 60, C.red, dq, 2.5);
    DEC0076.forEach(([n, d]) => dot(lx(n), ly(d), 8, 'c', clamp(dq * 1.6 - n / 14)));
    lbl('bound η^(n−1) , t = 2/3', lx(7), ly(0.09) - 12, C.red, dq, 16, 'left');
    lbl('start in ∅ : 0.80 , 0.083 , 0.060 , …', lx(3), ly(0.0015) + 4, C.cyan, dq, 15, 'left');
    [1, 4, 8, 12].forEach(n => lbl(String(n), lx(n), qy + 26, C.dim, dq, 14));
    [[1, '1'], [0.1, '0.1'], [0.01, '0.01'], [0.001, '0.001']].forEach(([v, s]) => lbl(s, qx - 10, ly(v) + 5, C.dim, dq, 13, 'right'));
  }
  const q = Q(S, 1, 'But the full history keeps its first difference forever', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 840, 58, 'TV(full records of ρ , σ) = TV(first reads of ρ , σ)', C.gold, q, 21);
    lbl('every later step multiplies both by the same kernel M', 530, 315, C.dim, q, 15);
    lbl('checked exactly : 20 random pairs , depth 4', 530, 345, C.dim, q, 15);
    const lq = Q(S, 1, 'And the label never freezes', 0.6);
    lbl('one sampled record , 60 reads , wait 2/3', 530, 400, C.white, lq, 16);
    LAB076.forEach((m, i) => { const qq = clamp(lq * 2 - i / 70), x = 160 + (i % 20) * 37, y = 425 + Math.floor(i / 20) * 70; fillBox(x, y, 31, 52, MC076[m], qq * 0.55); rect63(x, y, 31, 52, MC076[m], qq, 1.3); lbl(MN076[m], x + 15, y + 33, C.white, qq, m === 4 ? 11 : 15); });
    lbl('Pr(the reading is eventually constant) = 0 ;  each conditional state P_i stays 4/5 from I/5', 530, 660, C.dim, lq, 14);
    const sq = [Q(S, 1, 'The margin settles', 0.6), Q(S, 1, 'the past stays', 0.6), Q(S, 1, 'the present moves', 0.6)];
    [['MARGIN SETTLES', C.cyan], ['PAST STAYS', C.gold], ['PRESENT MOVES', C.mag]].forEach(([s, col], i) => stamp(s, 1400, 330 + i * 170, sq[i], col, 30, -0.04));
    chip(530, 745, 840, 52, 'margin → I/5 ,  history keeps TV ,  labels keep changing', C.white, sq[2], 19);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['ATOM', '4 · 14 · 24', C.cyan, 'Five modes need added principles'], ['CORNER', 'J_f hidden in κ', C.gold, 'a corner hides from three means'], ['CLIFFORD', 'ω² = −1 → M₅(ℂ)', C.mag, 'Clifford composition gives one i'], ['BORN', 'μ(E) = tr(ρE)', C.green, 'full effects force Born'], ['REFERENCES', 'Swap/2 : −1/2', C.red, 'references force complete positivity'], ['WITNESS', '12t² vs 6t²', C.cyan, 'a native wait beats populations'], ['CONTROL', 'S* → all gates', C.gold, 'one fixed phase reaches every unitary'], ['PHASE', 'Φ += t J_f', C.mag, 'the corner entangles'], ['SEAM', '21 < 25', C.green, 'seams need a separator'], ['SETTLING', 'η^(n−1)', C.vio, 'margins settle while records move']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 280 + (i % 5) * 340, y = 235 + Math.floor(i / 5) * 140, q = Q(S, 0, ph) * fade; box(x - 150, y, 300, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 45, col, q, 19); lblG(a2, x, y + 92, C.white, q, 20); });
    lbl("PUBLISHED · Busch's effect theorem (PRL 91, 120403) · invertible operations (Nayak–Sen, quant-ph/0605041)", W / 2, 560, C.cyan, Q(S, 1, 'are published or classical inputs') * fade, 15);
    lbl('CLASSICAL · Clifford–Pauli correspondence · matrix units · Choi–Kraus (Watrous) · Hodge star · Cauchy–Schwarz', W / 2, 600, '#8fbcff', Q(S, 1, 'are published or classical inputs', 0.5, 0.4) * fade, 15);
    lbl('VOLUME · five-mode underdetermination · four-corner fibre · transport to M₅(ℂ) · kernel isometry · native witness · D·SO(5)·D† · S* control · relation phase · seams · read stability', W / 2, 640, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 13);
    lbl('RECOMPUTED · 59 checks : fibre bounds · 50 real elements · 9/16 vs 3/4 · −1/2 · 12t² , 6t² · Lie dims 10 , 15 , 24 · |sin(tJ/2)| · 21 of 25 · η = 0.663 , 0.450', W / 2, 680, C.white, Q(S, 1, 'the finite computations were redone') * fade, 13);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM · 151 ATOMS , ALL RESIDUAL-OPEN', W / 2, 750, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    ring(W / 2, 360, 200, C.cyan, a * 0.45, 2);
    pyrG64(W / 2, 370, 190, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC QP I · FIVE MODES', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 量子原理 第一部 · 五模式、复结构与相干记录 · TRURETURING FILM 076', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Six stated conditions build one complex five-dimensional model.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC QP I', atom: 'FIVE-MODE ATOM', corner: 'FOUR-CORNER RELATION', clifford: 'CLIFFORD AND TRANSPORT', born: 'BORN FROM EFFECTS', kernel: 'RECORDS AND REFERENCES', witness: 'NATIVE WITNESS', control: 'CONTROL AND PHASE', phase: 'RELATION PHASE', seam: 'SEAMS AND COMPOSITION', mirror: 'WHAT SETTLES', finale: 'LEDGER' });

function poster076() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  ring(470, 500, 270, C.cyan, 0.5, 2.5); ring(470, 500, 284, C.mag, 0.3, 1.4);
  pyrG64(470, 520, 240, 2.2, 1, [1, 1, 1], 1);
  txt('J_f = f₁₃ − f₁ − f₃ + f₀', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('ω = uvn , ω² = −1  →  M₅(ℂ)', 1320, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('1 − 12t²  vs  1 − 6t²', 1320, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('AURIC 量子原理 第一部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC QP I · FIVE MODES', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('五 模 式 · 复 结 构 · 相 干 记 录', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 076', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster076;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
