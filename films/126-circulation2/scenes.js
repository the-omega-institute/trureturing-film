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

/* ---- film 126: AURIC CIRCULATION CONTROL II · index carriers, odd rings and shared roots ---- */
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
const _po126 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po126.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po126.set(key, off); }
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
/* ---- film 126 data (from verify126.py / vis126.json) ---- */
const HEAT126 = [[0.0,35.0,5.0],[0.02,34.7278,4.7278],[0.04,34.4708,4.4708],[0.06,34.228,4.228],[0.08,33.9987,3.9987],[0.1,33.782,3.782],[0.12,33.5773,3.5773],[0.14,33.384,3.384],[0.16,33.2013,3.2013],[0.18,33.0287,3.0287],[0.2,32.8656,2.8656],[0.22,32.7114,2.7114],[0.24,32.5658,2.5658],[0.26,32.4281,2.4281],[0.28,32.2981,2.2981],[0.3,32.1751,2.1751],[0.32,32.0589,2.0589],[0.34,31.949,1.949],[0.36,31.8451,1.8451],[0.38,31.7469,1.7469],[0.4,31.6541,1.6541],[0.42,31.5663,1.5663],[0.44,31.4833,1.4833],[0.46,31.4048,1.4048],[0.48,31.3306,1.3306],[0.5,31.2604,1.2604],[0.52,31.194,1.194],[0.54,31.1312,1.1312],[0.56,31.0718,1.0718],[0.58,31.0156,1.0156],[0.6,30.9624,0.9624],[0.62,30.9121,0.9121],[0.64,30.8645,0.8645],[0.66,30.8194,0.8194],[0.68,30.7768,0.7768],[0.7,30.7364,0.7364],[0.72,30.6982,0.6982],[0.74,30.6621,0.6621],[0.76,30.6278,0.6278],[0.78,30.5954,0.5954],[0.8,30.5648,0.5648],[0.82,30.5357,0.5357],[0.84,30.5082,0.5082],[0.86,30.4822,0.4822],[0.88,30.4575,0.4575],[0.9,30.4341,0.4341],[0.92,30.412,0.412],[0.94,30.391,0.391],[0.96,30.3711,0.3711],[0.98,30.3523,0.3523],[1.0,30.3345,0.3345],[1.02,30.3176,0.3176],[1.04,30.3016,0.3016],[1.06,30.2864,0.2864],[1.08,30.272,0.272],[1.1,30.2583,0.2583],[1.12,30.2454,0.2454],[1.14,30.2331,0.2331],[1.16,30.2215,0.2215],[1.18,30.2105,0.2105],[1.2,30.2,0.2]];
const NM126 = [1,5,14,30,55,91];
const TAB126 = [[2,36,5,0,0,31],[3,120,40,5,0,85],[4,330,180,40,0,190],[5,792,600,180,1,371]];
const DN126 = [[2,3],[3,5],[4,8],[5,13],[6,21],[7,34],[8,55],[9,89]];
const HSTAR126 = [[3,[1,1]],[4,[1,3,1]],[5,[1,7,7,1]],[6,[1,14,31,14,1]]];
const THETA126 = [[3,5,1,2,1,0,1],[4,8,3,5,2,1,1,2],[6,21,14,18,7,4,5,5,4,7]];
const T3_126 = [[1,1,1,1],[1,1,1,0],[1,1,0,0],[1,0,0,0]];
const SEAM126 = [[1,5,25,21],[2,14,196,157],[3,30,900,707]];
const E7_126 = [[1,29,29,0],[2,289,288,1],[3,1640,1633,7],[4,6604,6575,29],[5,21122,21031,91]];
const CORR126 = [[3,0],[4,0],[5,1],[6,7],[7,28],[8,84],[9,210]];
const H7_126 = [1,21,84,85,21,1];
const CK126 = [[7,1,7,28,84,210],[9,1,9,46,174,540],[11,1,11,67,297,1068]];
const TERM126 = [[7,29,8,8,21,[26,24],[7,6],2],[9,76,21,10,66,[73,71,69],[20,19,18],3],[11,199,55,12,187,[196,194,192,190],[54,53,52,51],4]];
const WALK126 = [[0,1,0],[1,1,0],[2,2,1],[5,4,2],[11,9,5],[25,20,11],[56,45,25],[126,101,56]];
const TYPE126 = [2,202,30302];
const BASIC126 = [[3,1,1],[4,505,0],[5,35811,201]];
const ROOT126 = {"5":[[0,0,0,0,0],[1,157,0,157,0],[2,100,1,101,201],[3,31,0,31,0],[4,0,0,0,0],[5,0,0,0,0]],"6":[[0,0,0,0,0],[1,707,0,707,0],[2,543,4,547,4360],[3,298,3,301,1797],[4,85,0,85,0],[5,0,0,0,0],[6,0,0,0,0]],"7":[[0,0,0,0,0],[1,2353,0,2353,0],[2,1978,10,1988,39660],[3,1359,12,1371,32760],[4,695,6,701,8376],[5,190,0,190,0],[6,0,0,0,0],[7,0,0,0,0]]};
const C9I126 = [1,0,1,0,1,0,0,0,0];
const C9A126 = [0,0,0,0,0,1,1,1,0];
/* ---- film 126 helpers ---- */
const _txt126 = txt;
txt = function (s, x, y, o = {}) { if (o.fam === F.mono && /[ΘιηζθφΦΨ]/.test(String(s))) o = Object.assign({}, o, { fam: FG }); return _txt126(s, x, y, o); };
function cell126(x, y, w, h, s, col, a, size = 20, fillA = 0.3, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.5); lbl(s, x + w / 2, y + h / 2 + size * 0.36, tc, a, size); }
function interp126(arr, x, yi = 1) { if (x <= arr[0][0]) return arr[0][yi]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][yi] * (1 - f) + arr[i][yi] * f; } return arr[arr.length - 1][yi]; }
/* a table: rows of strings, column widths, header colour */
function table126(x, y, cols, rows, a, o = {}) {
  if (a <= 0) return;
  const rh = o.rh || 44, size = o.size || 18;
  rows.forEach((r, i) => {
    const q = o.prog == null ? 1 : clamp(o.prog * (rows.length + 1) - i);
    let xx = x;
    r.forEach((s, j) => {
      const col = i === 0 ? (o.hc || C.gold) : (o.colf ? o.colf(i, j) : C.white);
      if (i === 0) fillBox(xx, y, cols[j] - 4, rh - 4, o.hc || C.gold, a * q * 0.12);
      rect63(xx, y + i * rh, cols[j] - 4, rh - 4, i === 0 ? (o.hc || C.gold) : C.dim, a * q * (i === 0 ? 0.8 : 0.5), 1.2);
      lbl(String(s), xx + (cols[j] - 4) / 2, y + i * rh + (rh - 4) / 2 + size * 0.36, col, a * q, i === 0 ? (o.hsize || size - 2) : size);
      xx += cols[j];
    });
  });
}
/* b odd rings of n positions meeting at one root (cx, cy); lit[k][i] for ring k, i = 0 is the root */
function petal126(cx, cy, b, R, a, o = {}) {
  if (a <= 0) return null;
  const n = o.n || 7, P = [], th0 = o.th0 == null ? -Math.PI / 2 : o.th0;
  for (let k = 0; k < b; k++) {
    const th = th0 + TAU * k / b, ox = cx + R * Math.cos(th), oy = cy + R * Math.sin(th), pts = [];
    for (let i = 0; i < n; i++) { const an = th + Math.PI + TAU * i / n; pts.push([ox + R * Math.cos(an), oy + R * Math.sin(an)]); }
    pts[0] = [cx, cy];
    const col = (o.cols && o.cols[k]) || C.cyan;
    for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; line(p[0], p[1], q[0], q[1], col, a * 0.7, 2.4); }
    P.push(pts);
  }
  P.forEach((pts, k) => pts.forEach((p, i) => {
    if (i === 0) return;
    const lit = o.lit && o.lit[k] && o.lit[k][i];
    if (lit) dot(p[0], p[1], o.r || 13, o.dn || 'g', a); else ring(p[0], p[1], (o.r || 13) * 0.62, C.dim, a, 2);
    if (o.labs) lbl(o.labs[k][i], p[0] + (p[0] - cx) * 0.0, p[1] - (o.r || 13) - 8, C.white, a, o.ls || 15);
  }));
  if (o.rootLit) dot(cx, cy, (o.r || 13) * 1.1, 'm', a); else ring(cx, cy, (o.r || 13) * 0.8, C.mag, a, 3);
  if (o.rootLab) lbl(o.rootLab, cx, cy + 40, C.mag, a, 17);
  return P;
}
/* ring of n nodes with a forced two-colouring attempt (odd n leaves one red edge) */
function colourRing126(cx, cy, R, n, a, prog = 1, labs = null) {
  if (a <= 0) return;
  const p = ringPts(cx, cy, R, n);
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n, bad = i === n - 1 && n % 2 === 1;
    const q = clamp(prog * (n + 1) - i);
    line(p[i][0], p[i][1], p[j][0], p[j][1], bad ? C.red : C.cyan, a * (bad ? q : 0.7), bad ? 4 : 2.4);
  }
  for (let i = 0; i < n; i++) { const q = clamp(prog * (n + 1) - i); dot(p[i][0], p[i][1], 15, i % 2 ? 'c' : 'g', a * (0.35 + 0.65 * q)); if (labs) lbl(labs[i], p[i][0], p[i][1] - 26, C.white, a, 16); }
}
/* a row of positions with occupancy bits */
function posRow126(x, y, bits, gap, a, col = 'g', r = 10) {
  if (a <= 0) return;
  for (let i = 0; i < bits.length; i++) { const xx = x + i * gap; if (i < bits.length - 1) line(xx + r, y, xx + gap - r, y, C.dim, a * 0.5, 1.4); if (bits[i]) dot(xx, y, r * 1.3, col, a); else ring(xx, y, r * 0.6, C.dim, a, 1.8); }
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyr63(470, 375, 235, 0.6 + t * 0.2, s0 * 0.95, { fillBase: 1, bits: true });
  const rq = Q(S, 0, 'closes the seam into rings', 0.6);
  colourRing126(470, 705, 82, 7, rq, Q(S, 0, 'where an odd cycle marks every count', 2.0));
  lbl('seven positions , closed seam', 470, 812, C.dim, rq, 16);
  const items = [['one relation among five states', 'ONE RELATION', 'z₁z₃ = z₀z₁₃ , kernel (1, −1, 0, −1, 1)', C.cyan], ['an elliptic carrier', 'AN ELLIPTIC CARRIER', 'ker D⁺ ≅ (R₃)ₘ , index Nₘ', C.gold], ['follows it to every length', 'EVERY LENGTH', 'F(n + 2) modes , shift (3; 1, … , 1)', C.mag], ['an odd cycle marks every count', 'ODD RINGS', 'Σ cᵢ ≤ k m : one tuple with no lift', C.green]];
  items.forEach(([ph, hh, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(hh, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr63(W / 2, 420, 290, 0.5 + t * 0.25, rp * 0.9, { fillBase: 1, bits: true, lab: 0.7 });
  chip(330, 310, 330, 58, 'elliptic carrier', C.cyan, rp, 22); chip(330, 395, 330, 58, 'exact syzygies', C.gold, rp, 22); chip(330, 480, 330, 58, 'odd rings', C.mag, rp, 22); chip(330, 565, 330, 58, 'shared roots', C.green, rp, 22);
  box(1400, 330, 420, 200, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one obstruction', 1610, 395, C.cyan, rp, 22); lblG('(2; 1,1,1,1,1,1,1) ∉ S', 1610, 465, C.white, rp, 26);
  txt(scramble('AURIC CIRC II · ODD RINGS', rp, 126), W / 2, 760, { size: 60, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 环 流 控 制 第 二 部 · 指 标 载 体 、奇 环 与 共 享 根', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 126 · AURIC_FIB_ATOM_CIRCULATION_CONTROL_KL_ACTION_AND_TORIC_RELATIONS_CONTINUATION', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 ELLIPTIC CARRIER (§25) ---- */
SCENES.carrier = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The index alone sees less', 0.6);
  if (f1 > 0) {
    const q0 = Q(S, 0, 'Start with the four-corner relation', 0.6) * f1;
    chip(W / 2, 250, 1500, 56, 'f = z₁z₃ − z₀z₁₃  on  CP⁴ ,  modes (0, 1, 2, 3, 13) ,  R₃ = ℂ[z]/(f)', C.gold, q0, 22);
    const pq = Q(S, 0, 'whose kernel is exactly the degree m quotient', 0.6) * f1;
    lbl('legal sectors (U, V, W) of 3P :  16 + 9 + 4 + 1 = 30', 530, 335, C.white, pq, 18);
    for (let Wl = 0; Wl <= 3; Wl++) {
      const s = 4 - Wl, x0 = 170 + [0, 250, 450, 600][Wl], y0 = 400;
      for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) { const qq = clamp(pq * 1.6 - (Wl * 16 + i * s + j) / 40); dot(x0 + j * 50, y0 + i * 50, 11, ['c', 'g', 'm', 'o'][Wl], qq); }
      lbl('W = ' + Wl, x0 + (s - 1) * 25, y0 + s * 50 + 10, C.dim, pq, 16);
    }
    lbl('one zero mode per sector :  ker Hₘ = (f Pₘ₋₂)⊥ ≅ (R₃)ₘ', 530, 660, C.dim, pq, 16);
    lbl('apex : four facets meet , the pyramid is nonsimple', 530, 690, C.dim, pq, 15);
    const dq = Q(S, 0, 'gives an elliptic Dolbeault complex', 0.6) * f1;
    chip(1390, 340, 760, 56, 'O(m − 2) —f→ O(m) ,  D = √2 (δ + δ†)', C.cyan, dq, 22);
    const kq = Q(S, 0, 'whose kernel is exactly', 0.6) * f1;
    chip(1390, 412, 760, 56, 'ker D⁺ ≅ (R₃)ₘ ≅ ker Hₘ ,  ker D⁻ = 0', C.green, kq, 22);
    const iq = Q(S, 0, 'with index one, five', 0.6) * f1;
    lbl('ind D⁺ = ∫ (e^(mh) − e^((m−2)h)) Td = m³/3 + 3m²/2 + 13m/6 + 1', 1390, 470, C.white, iq, 16);
    const by = 780, bw = 70, gp = 46, hs = 2.3, bx = 1080;
    NM126.forEach((v, i) => { const qq = clamp(iq * 1.6 - i / 7), x = bx + i * (bw + gp), hh = v * hs; fillBox(x, by - hh, bw, hh, C.gold, qq * 0.45); rect63(x, by - hh, bw, hh, C.gold, qq, 1.6); lbl(String(v), x + bw / 2, by - hh - 12, C.white, qq, 20); lbl('m = ' + i, x + bw / 2, by + 26, C.dim, qq, 15); });
    lbl('Nₘ = C(m + 4, 4) − C(m + 2, 4)', 1390, 505, C.gold, iq, 18);
  }
  const q = Q(S, 1, 'The index alone sees less', 0.6, 0.3);
  if (q > 0) {
    const jq = Q(S, 1, 'Scale f to zero', 0.6);
    chip(530, 250, 860, 56, 'f_s = s f :  index Nₘ for every s', C.white, q, 22);
    const tab = [['m = 3', 'ker D⁺', 'ker D⁻', 'index'], ['s ≠ 0', '30', '0', '30'], ['s = 0', '35', '5', '30']];
    table126(240, 300, [160, 150, 150, 150], tab, jq, { size: 22, rh: 50, colf: (i, j) => (i === 2 && j < 3 && j > 0 ? C.red : C.white) });
    const px = 170, py = 790, pw = 720, ph = 300, yS = v => py - v / 36 * ph, xS = x => px + x / 1.2 * pw;
    const hq = Q(S, 1, 'yet their difference stays thirty', 0.6);
    plotAxes(px, py, pw, ph, hq, 't', 'heat traces at m = 3 (finite carrier)');
    curve(p => [xS(p * 1.2), yS(interp126(HEAT126, p * 1.2, 1))], 80, C.cyan, hq, 3);
    curve(p => [xS(p * 1.2), yS(interp126(HEAT126, p * 1.2, 2))], 80, C.mag, hq, 3);
    dashed(px, yS(30), px + pw, yS(30), C.dim, hq * 0.6, 1.2); dashed(px, yS(0), px + pw, yS(0), C.dim, hq * 0.6, 1.2);
    lbl('Tr e^(−tA†A) on P₃ : 35 → 30', xS(0.55), yS(33.6), C.cyan, hq, 15, 'left');
    lbl('Tr e^(−tAA†) on P₁ : 5 → 0', xS(0.55), yS(5.5), C.mag, hq, 15, 'left');
    lbl('difference = 30 for every t', xS(0.55), yS(17), C.green, hq, 17, 'left');
    const sq = Q(S, 1, 'A smooth quadric keeps the count', 0.6);
    box(1050, 280, 720, 330, C.gold, sq, 2, 'rgba(40,30,0,0.35)');
    lbl('Q_ε = { f + ε z₂² = 0 } ⊂ CP⁴ , smooth threefold', 1410, 325, C.gold, sq, 18);
    lbl('Td(TQ) = 1 + 3/2 h + 13/12 h² + 1/2 h³ ,  ∫ h³ = 2', 1410, 380, C.white, sq, 17);
    lbl('index of L^m = 2 (m³/6 + 3m²/4 + 13m/12 + 1/2) = Nₘ', 1410, 430, C.white, sq, 17);
    lbl('Vol(P) = 1/3 = leading coefficient 2/3!', 1410, 480, C.dim, sq, 15);
    const tq = Q(S, 1, 'but only part of the torus symmetry', 0.6);
    lbl('z₂² has character c² , f has ab : only c² = ab survives', 1410, 560, C.red, tq, 16);
    stamp('SAME COUNT , LESS SYMMETRY', 1410, 700, tq, C.red, 28, -0.04);
  }
};

/* ---- 03 PFAFFIAN SYZYGIES (§26) ---- */
SCENES.pfaff = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Its strands count', 0.6);
  if (f1 > 0) {
    const mq = Q(S, 0, 'Four positions give eight modes', 0.6) * f1;
    const B4 = [[0, 0, 0, 0, '∅'], [1, 0, 0, 0, '1'], [0, 1, 0, 0, '2'], [0, 0, 1, 0, '3'], [0, 0, 0, 1, '4'], [1, 0, 1, 0, '13'], [1, 0, 0, 1, '14'], [0, 1, 0, 1, '24']];
    B4.forEach((r, i) => { const qq = clamp(mq * 1.6 - i / 10), x = 170 + (i % 4) * 200, y = 300 + Math.floor(i / 4) * 80; posRow126(x, y, r.slice(0, 4), 36, qq); lbl('z' + r[4], x + 54, y + 38, C.cyan, qq, 16); });
    const fq = Q(S, 0, 'five quadric relations', 0.6) * f1;
    ['f₁ = z₁z₃ − z₀z₁₃', 'f₂ = z₁z₄ − z₀z₁₄', 'f₃ = z₂z₄ − z₀z₂₄', 'f₄ = z₂z₁₄ − z₁z₂₄', 'f₅ = z₄z₁₃ − z₃z₁₄'].forEach((s, i) => { const qq = clamp(fq * 1.6 - i / 6); lblG(s, 170 + (i % 2) * 400, 500 + Math.floor(i / 2) * 44, C.white, qq, 21, 'left'); });
    const pq = Q(S, 0, 'They are the signed Pfaffians', 0.6) * f1;
    const MS = [['0', '−z₂₄', 'z₁₄', '−z₄', '0'], ['z₂₄', '0', '−z₁₃', 'z₃', 'z₂'], ['−z₁₄', 'z₁₃', '0', '0', '−z₁'], ['z₄', '−z₃', '0', '0', 'z₀'], ['0', '−z₂', 'z₁', '−z₀', '0']];
    mgrid(1080, 260, MS, 96, 54, pq, { size: 19, prog: pq * 1.3, colf: v => (v === '0' ? C.dim : v[0] === '−' ? C.mag : C.cyan) });
    lbl('M (skew)', 1080 + 240, 555, C.dim, pq, 16);
    lbl('fᵢ = (−1)^(i+1) Pf(M without row , column i) ,  det = fᵢ²', 1320, 595, C.white, pq, 16);
    const rq = Q(S, 0, 'its resolution of ranks one, five, five, one', 0.6) * f1;
    chip(1360, 650, 800, 56, '0 → S(−5) → S(−3)⁵ → S(−2)⁵ → S → R₄ → 0', C.gold, rq, 23);
    const eq = Q(S, 0, 'characteristic two included', 0.6) * f1;
    stamp('EXACT : INTEGERS , EVERY FIELD', 470, 730, eq, C.green, 24, -0.04);
    lbl('Buchsbaum–Eisenbud criterion ; recomputed ranks mod 2 and mod 32003 , m = 2 … 5', 1360, 715, C.dim, eq, 14);
  }
  const q = Q(S, 1, 'Its strands count', 0.6, 0.3);
  if (q > 0) {
    const rows = [['m', 'S_m', '5 S_(m−2)', '5 S_(m−3)', 'S_(m−5)', 'quotient']].concat(TAB126.map(r => r.map(String)));
    table126(140, 250, [70, 130, 150, 150, 130, 150], rows, q, { size: 20, rh: 50, prog: q * 1.4, colf: (i, j) => (j === 5 ? C.gold : C.white) });
    const iq = Q(S, 1, 'the index of a complex on projective seven-space', 0.6);
    lbl('31 , 85 , 190 , 371  =  ind D⁺ on CP⁷ for m = 2 … 5', 530, 545, C.gold, iq, 18);
    lbl('1 − 5e^(−2h) + 5e^(−3h) − e^(−5h) = 5h³ + O(h⁴)', 530, 590, C.white, iq, 18);
    lbl('so the count has degree four inside dimension seven', 530, 625, C.dim, iq, 15);
    const zq = Q(S, 1, 'Set every relation map to zero at degree three', 0.6);
    const kq = Q(S, 1, 'but the kernels become', 0.6);
    const by = 760, hs = 2.6;
    [['actual maps', 85, 0, C.green, zq], ['all maps zero', 125, 40, C.red, kq]].forEach(([nm, pv, nv, col, qq], i) => {
      const x = 1110 + i * 330;
      fillBox(x, by - pv * hs, 100, pv * hs, col, qq * 0.45); rect63(x, by - pv * hs, 100, pv * hs, col, qq, 1.6); lbl(String(pv), x + 50, by - pv * hs - 12, C.white, qq, 22); lbl('ker D⁺', x + 50, by + 26, C.dim, qq, 15);
      if (nv > 0) { fillBox(x + 120, by - nv * hs, 100, nv * hs, C.mag, qq * 0.45); rect63(x + 120, by - nv * hs, 100, nv * hs, C.mag, qq, 1.6); }
      lbl(String(nv), x + 170, by - nv * hs - 12, C.white, qq, 22); lbl('ker D⁻', x + 170, by + 26, C.dim, qq, 15);
      lbl(nm, x + 110, by + 56, col, qq, 17);
    });
    const sq = Q(S, 1, 'the index stays eighty-five', 0.6);
    chip(1440, 300, 700, 56, 'index 85 − 0 = 125 − 40 = 85 at m = 3', C.white, sq, 22);
    stamp('SAME INDEX , DIFFERENT KERNELS', 530, 730, kq, C.red, 26, -0.04);
  }
};

/* ---- 04 SELF-DUAL PATHS (§27) ---- */
SCENES.paths = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [0, 'The mode algebra is Gorenstein', 'theory'], [1, null, 'theory'], [1, 'The numerators are palindromic', 'published'], [1, 'and the counts obey reciprocity', 'published']]);
  const f1 = 1 - Q(S, 1, 'So the resolution is self-dual', 0.6);
  if (f1 > 0) {
    const fq = Q(S, 0, 'the legal modes number F of n plus two', 0.6) * f1;
    posRow126(200, 290, [1, 0, 1, 0, 0, 1, 0, 1, 0], 70, fq);
    lbl('an open path : no two neighbours occupied', 480, 345, C.dim, fq, 16);
    const by = 760, bw = 64, gp = 30, hs = 3.2;
    DN126.forEach(([n, v], i) => { const qq = clamp(fq * 1.6 - i / 9), x = 160 + i * (bw + gp), hh = v * hs; fillBox(x, by - hh, bw, hh, C.cyan, qq * 0.45); rect63(x, by - hh, bw, hh, C.cyan, qq, 1.5); lbl(String(v), x + bw / 2, by - hh - 12, C.white, qq, 19); lbl('n=' + n, x + bw / 2, by + 26, C.dim, qq, 15); });
    const lq = Q(S, 0, 'a count frozen in Lean', 0.6) * f1;
    chip(530, 410, 760, 54, 'Lean : admissibleWord_card_eq_fib  ·  |B_n| = F(n + 2)', C.green, lq, 18);
    const gq = Q(S, 0, 'The mode algebra is Gorenstein', 0.6) * f1;
    chip(1390, 270, 780, 56, 'int(C_n) ∩ ℤⁿ⁺¹ = (3; 1, … , 1) + S_n', C.gold, gq, 22);
    chip(1390, 340, 780, 56, 'ω_R ≅ R(−(3; 1, … , 1)) : Gorenstein', C.gold, gq, 22);
    const iq = Q(S, 0, 'shifted by three copies and one at every position', 0.6) * f1;
    const ox = 1110, oy = 760, s = 62;
    for (let c1 = 0; c1 <= 6; c1++) for (let c2 = 0; c2 <= 6 - c1; c2++) {
      const inner = c1 >= 1 && c2 >= 1 && c1 + c2 <= 5;
      const x = ox + c1 * s + c2 * s * 0.5, y = oy - c2 * s * 0.86;
      ring(x, y, 8, C.cyan, gq * (inner ? 1 - iq : 1), 2); if (inner) dot(x, y, 13, 'g', iq);
    }
    lbl('n = 2 , m = 6 : 28 points', 1630, 470, C.cyan, gq, 16);
    lbl('interior : 10 = N₂(3) , a copy of 3P', 1630, 500, C.gold, iq, 16);
  }
  const q = Q(S, 1, 'So the resolution is self-dual', 0.6, 0.3);
  if (q > 0) {
    chip(530, 250, 860, 56, 'Fᵢ ≅ Hom(F_(c−i), S)(−Θ) ,  F_c = S(−Θ) , c = F(n+2) − n − 1', C.white, q, 19);
    const rows = [['n', 'modes', 'length c', 'Θ = (degree; occupancies)']].concat(THETA126.map(r => [String(r[0]), String(r[1]), String(r[2]), '(' + r[3] + '; ' + r.slice(4).join(', ') + ')']));
    const tq = Q(S, 1, 'for four positions its shift is five copies', 0.6);
    table126(150, 310, [80, 120, 150, 410], rows, q, { size: 20, rh: 52, colf: (i, j) => (i === 2 ? C.gold : C.white) });
    lbl('Θ_n = (F(n+2) − 3 ; Fᵢ F(n−i+1) − 1)', 530, 545, C.white, tq, 18);
    lbl('n = 4 : the matrix M respects this grading , last shift S(−5)', 530, 580, C.dim, tq, 15);
    const hq = Q(S, 1, 'The numerators are palindromic', 0.6);
    HSTAR126.forEach(([n, hv], k) => {
      const y0 = 340 + k * 115, mx = Math.max(...hv);
      lbl('n = ' + n, 1080, y0 - 10, C.cyan, hq, 17, 'left');
      hv.forEach((v, i) => { const qq = clamp(hq * 1.6 - (k * 5 + i) / 20), x = 1170 + i * 120, hh = 80 * v / 31 + 4; fillBox(x, y0 - hh, 90, hh, C.mag, qq * 0.45); rect63(x, y0 - hh, 90, hh, C.mag, qq, 1.4); lbl(String(v), x + 45, y0 + 22, C.white, qq, 17); });
    });
    lbl('h*(t) = t^(n−2) h*(1/t)', 1440, 270, C.mag, hq, 20);
    const rq = Q(S, 1, 'and the counts obey reciprocity', 0.6);
    chip(530, 700, 860, 56, 'N_n(−m) = (−1)ⁿ N_n(m − 3)', C.gold, rq, 24);
    lbl('path polytopes : Jiang–Yang–Zhong , arXiv:2607.22008', 530, 760, C.cyan, rq, 15);
  }
};

/* ---- 05 SEAM MATRIX AND ODD RINGS (§28) ---- */
SCENES.seam = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Closing an odd ring adds one global limit', 0.6);
  if (f1 > 0) {
    const aq = Q(S, 0, 'share one row set', 0.6) * f1;
    const rows = [[1, 0, 1, 0, 1, 0], [0, 1, 0, 0, 1, 0], [1, 0, 0, 1, 0, 1]];
    rows.forEach((r, i) => { lbl('row ' + (i + 1), 175, 300 + i * 60 + 6, C.dim, aq, 15, 'left'); posRow126(270, 300 + i * 60, r, 70, aq); });
    const cs = [0, 1, 2, 3, 4, 5].map(j => rows.reduce((s, r) => s + r[j], 0));
    line(250, 470, 650, 470, C.dim, aq, 1.5);
    cs.forEach((v, j) => lbl(String(v), 270 + j * 70, 505, C.gold, aq, 22));
    lbl('observation (m; c) = (3; 2, 1, 1, 1, 2, 1)', 450, 545, C.gold, aq, 17);
    const tq = Q(S, 0, 'join through the matrix T', 0.6) * f1;
    mgrid(1080, 280, T3_126, 70, 56, tq, { size: 22, colf: v => (v ? C.cyan : C.dim) });
    lbl('T₃ (a , b = 0 … 3)', 1220, 530, C.cyan, tq, 17);
    const rq = Q(S, 0, 'of full rank m plus one', 0.6) * f1;
    lbl('T_m(a, b) = 1 if a + b ≤ m', 1580, 320, C.white, rq, 18);
    lbl('det T_m = (−1)^(m(m+1)/2)', 1580, 370, C.white, rq, 18);
    lbl('rank m + 1 : no smaller seam space', 1580, 420, C.dim, rq, 15);
    lbl('L_(a+b) = ℓᵀ T_m r', 1580, 470, C.gold, rq, 18);
    const sq = Q(S, 0, 'sew to twenty-one observations', 0.6) * f1;
    const tab = [['m', 'L₃', 'L₃ × L₃', 'sewn L₆']].concat(SEAM126.map(r => r.map(String)));
    table126(1060, 570, [90, 130, 190, 200], tab, sq, { size: 20, rh: 46, colf: (i, j) => (j === 3 ? C.gold : j === 2 ? C.red : C.white) });
    lbl('m = 3 : v₃ = (10, 9, 7, 4) , v₆ = (246, 216, 160, 85)', 450, 640, C.dim, sq, 15);
    stamp('21 , NOT 25', 450, 730, Q(S, 0, 'not the product twenty-five', 0.6) * f1, C.red, 32, -0.05);
  }
  const q = Q(S, 1, 'Closing an odd ring adds one global limit', 0.6, 0.3);
  if (q > 0) {
    chip(530, 250, 860, 56, 'n = 2k + 1 :  Σ cᵢ ≤ k m  (every independent set has ≤ k)', C.gold, q, 21);
    const oq = Q(S, 1, 'The local trace then overcounts', 0.6);
    const tab = [['m', 'Tr T_m⁷', 'L₇(m)', 'excess']].concat(E7_126.map(r => r.map(String)));
    table126(1080, 260, [90, 200, 200, 150], tab, oq, { size: 21, rh: 50, prog: oq * 1.4, colf: (i, j) => (j === 3 ? C.red : C.white) });
    lbl('excess series  t² / ((1 − t²)(1 − t)ⁿ)', 1400, 590, C.white, oq, 18);
    lbl('trace counts position-labelled local tuples', 1400, 625, C.dim, oq, 15);
    const cq = Q(S, 1, 'the only extra tuple is all ones', 0.6);
    const rp = Q(S, 1, 'two rows cannot color an odd ring', 2.0);
    colourRing126(530, 550, 160, 7, cq, rp, ['1', '1', '1', '1', '1', '1', '1']);
    lbl('gold : row 1    cyan : row 2', 530, 770, C.dim, cq, 16);
    lbl('m = 2 , c = (1, … , 1) :  7 > 3 · 2', 530, 315, C.white, cq, 18);
    stamp('NO COMMON LIFT', 1400, 730, rp, C.red, 30, -0.05);
  }
};

/* ---- 06 SEVEN-RING DEFECT (§29–30) ---- */
SCENES.canon = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'its canonical module needs two generators', 'published'], [0, 'Their difference is exactly', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'The quotient between them', 0.6);
  if (f1 > 0) {
    const mq = Q(S, 0, 'The ring has twenty-nine modes', 0.6) * f1;
    const sets = [[[0, 0, 0, 0, 0, 0, 0], '1 empty'], [[1, 0, 0, 0, 0, 0, 0], '7 singletons'], [[1, 0, 1, 0, 0, 0, 0], '14 pairs'], [[1, 0, 1, 0, 1, 0, 0], '7 triples']];
    sets.forEach(([b, nm], i) => { const qq = clamp(mq * 1.6 - i / 5), x = 230 + (i % 2) * 380, y = 360 + Math.floor(i / 2) * 250; drawRing(x, y, 70, b, qq, { r: 11, gaps: i === 3 }); lbl(nm, x, y + 115, C.white, qq, 18); });
    lbl('1 + 7 + 14 + 7 = 29 modes ;  each position in 8', 420, 780, C.cyan, mq, 17);
    const gq = Q(S, 0, 'in degrees three and five', 0.6) * f1;
    chip(1390, 280, 780, 58, 'ν₃ = (3; 1, 1, 1, 1, 1, 1, 1)', C.gold, gq, 24);
    chip(1390, 360, 780, 58, 'ν₅ = (5; 2, 2, 2, 2, 2, 2, 2)', C.mag, gq, 24);
    lbl('ω_R = X^ν₃ R + X^ν₅ R , both minimal  (Miyazaki §4)', 1390, 425, C.dim, gq, 15);
    const dq = Q(S, 0, 'Their difference is exactly two copies', 0.6) * f1;
    chip(1390, 500, 780, 58, 'ν₅ − ν₃ = (2; 1, … , 1) ∉ S', C.red, dq, 24);
    lbl('locally feasible , total 7 > 6 : the tuple with no lift', 1390, 560, C.white, dq, 16);
    const xq = Q(S, 0, 'the tuple with no lift', 0.6) * f1;
    chip(1390, 650, 780, 56, '0 → R(−3) → ω_R → (R/J)(−5) → 0', C.cyan, xq, 22);
    lbl('R/J ≅ ℂ[y₀, … , y₆] , yⱼ = maximum set {j+2, j+4, j+6}', 1390, 710, C.dim, xq, 15);
    stamp('SAME OBSTRUCTION', 1390, 790, xq, C.red, 26, -0.04);
  }
  const q = Q(S, 1, 'The quotient between them', 0.6, 0.3);
  if (q > 0) {
    chip(530, 250, 860, 56, 'ι : CP⁶ ↪ CP²⁸ ,  z_Mⱼ = yⱼ , the other 22 modes = 0', C.cyan, q, 21);
    const iq = Q(S, 1, 'and its index counts the extra interior points', 0.6);
    lbl('ind D⁺(ω, m) − ind D⁺(R, m − 3) = C(m + 1, 6)', 530, 315, C.white, iq, 17);
    lbl('= L°(m) − L(m − 3) = E(m − 3) − E(m − 5)  (trace excess E)', 530, 345, C.gold, iq, 15);
    const vals = CORR126.filter(r => r[0] >= 5 && r[0] <= 8);
    const by = 720, hs = 3.4;
    vals.forEach(([m, v], i) => { const qq = clamp(iq * 1.6 - i / 5), x = 200 + i * 175, hh = v * hs + 3; fillBox(x, by - hh, 110, hh, C.cyan, qq * 0.45); rect63(x, by - hh, 110, hh, C.cyan, qq, 1.6); lbl(String(v), x + 55, by - hh - 12, C.white, qq, 22); lbl('m = ' + m, x + 55, by + 28, C.dim, qq, 16); });
    lbl('zero at m = 3, 4 : O(−2) , O(−1) are acyclic on CP⁶', 530, 790, C.dim, iq, 15);
    const hq = Q(S, 1, 'The Hilbert numerator', 0.6);
    const bx = 1080, by2 = 560;
    H7_126.forEach((v, i) => { const qq = clamp(hq * 1.6 - i / 7), x = bx + i * 115, hh = v * 2.6 + 3; const col = (i === 2 || i === 3) ? C.red : C.gold; fillBox(x, by2 - hh, 90, hh, col, qq * 0.45); rect63(x, by2 - hh, 90, hh, col, qq, 1.6); lbl(String(v), x + 45, by2 + 30, C.white, qq, 21); });
    lbl('H_R(t) = (1 + 21t + 84t² + 85t³ + 21t⁴ + t⁵) / (1 − t)⁸', 1420, 270, C.gold, hq, 16);
    const pq = Q(S, 1, 'is no longer palindromic', 0.6);
    stamp('84 ≠ 85', 1420, 650, pq, C.red, 34, -0.05);
    lbl('−L(−x) = L(x − 3) + C(x + 1, 6)', 1420, 740, C.white, pq, 19);
  }
};

/* ---- 07 NILPOTENT LAYERS (§31–32) ---- */
SCENES.layers = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [0, 'and a mode acts by a face monomial', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'On nine positions a deficit-one mode', 0.6);
  if (f1 > 0) {
    const gq = Q(S, 0, 'has k minus one canonical generators', 0.6) * f1;
    chip(W / 2, 250, 1500, 56, 'νⱼ = (2j + 1; j, … , j) ,  j = 1 … k − 1 ,  minimal generators of ω_R  (Miyazaki §4)', C.gold, gq, 21);
    const lq = Q(S, 0, 'the layers are free over the face', 0.6) * f1;
    const L = ['e₄', 'e₃', 'e₂'];
    L.forEach((s, i) => { const qq = clamp(lq * 1.6 - i / 4), y = 320 + i * 140; cell126(260, y, 380, 90, 'A_k ' + s + '   degree ' + (9 - 2 * i), C.cyan, qq, 22); });
    lbl('k = 5 , eleven positions :  C_k = ω / X^ν₁ R = ⊕ A_k eⱼ', 450, 755, C.white, lq, 17);
    lbl('A_k = ℂ[y₀ , … , y₂ₖ] , the polynomial face', 450, 790, C.dim, lq, 15);
    const nq = Q(S, 0, 'times a lowering map N', 0.6) * f1;
    [0, 1].forEach(i => { arrow(680, 365 + i * 140, 680, 365 + (i + 1) * 140 - 10, C.mag, nq, 3); lbl('N', 705, 445 + i * 140, C.mag, nq, 22, 'left'); });
    arrow(680, 645, 680, 700, C.mag, nq, 3); lbl('N e₂ = 0', 705, 690, C.mag, nq, 18, 'left');
    chip(1390, 360, 760, 62, 'ρ(Xˢ) = y^a(s) N^δ(s)', C.mag, nq, 28);
    lbl('a(s) = edge slack ,  δ(s) = k m − Σ cᵢ = deficit', 1390, 425, C.white, nq, 17);
    const oq = Q(S, 0, 'nilpotent of order k minus two', 0.6) * f1;
    chip(1390, 520, 760, 58, 'N^(k−2) = 0 ,  J_k^(k−2) C_k = 0 ,  J_k^(k−3) C_k ≠ 0', C.gold, oq, 21);
    lbl('Ann C_k = span{ Xˢ : δ(s) ≥ k − 2 } ,  radical J_k', 1390, 585, C.dim, oq, 16);
  }
  const q = Q(S, 1, 'On nine positions a deficit-one mode', 0.6, 0.3);
  if (q > 0) {
    drawRing(430, 470, 175, C9I126, q, { gaps: 1, r: 14 });
    const pts = ringPts(430, 470, 175, 9);
    pts.forEach((p, i) => lbl(String(i), 430 + (p[0] - 430) * 1.2, 470 + (p[1] - 470) * 1.2 + 7, C.dim, q, 16));
    lbl('I = {0, 2, 4} : δ = 4 − 3 = 1 ,  slack on edges 56 , 67 , 78', 430, 700, C.gold, q, 17);
    lbl('a(s_I) = (0, 0, 0, 0, 0, 1, 1, 1, 0)', 430, 735, C.white, q, 17);
    const mq = Q(S, 1, 'sends layer three to layer two', 0.6);
    mgrid(1130, 280, [['0', 'y₅y₆y₇'], ['0', '0']], 170, 70, mq, { size: 22, colf: v => (v === '0' ? C.dim : C.gold) });
    lbl('basis (e₂ , e₃)', 1300, 445, C.dim, mq, 16);
    const zq = Q(S, 1, 'a nonzero matrix whose square is zero', 0.6);
    lbl('ρ(X^s_I) ≠ 0 ,  ρ(X^s_I)² = 0', 1640, 330, C.mag, zq, 19);
    const cq = Q(S, 1, 'The layer counts are differences of trace errors', 0.6);
    const rows = [['n', 'm = 5', '6', '7', '8', '9']].concat(CK126.map(r => r.map(String)));
    table126(1060, 520, [90, 120, 120, 120, 130, 140], rows, cq, { size: 20, rh: 46, colf: (i, j) => (i === 2 ? C.gold : C.white) });
    lbl('C_k(m) = E_k(m − 3) − E_k(m − (2k − 1))', 1420, 745, C.white, cq, 18);
    lbl('series (t⁵ + t⁷ + … + t^(2k−1)) / (1 − t)^(2k+1)', 1420, 785, C.dim, cq, 15);
  }
};

/* ---- 08 INDEX WITHOUT ACTION (§33–34) ---- */
SCENES.split = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Restricted to the face', 0.6);
  if (f1 > 0) {
    const gq = Q(S, 0, 'The same generator degrees fix the end of the resolution', 0.6) * f1;
    chip(W / 2, 250, 1500, 56, 'F_p = ⊕ⱼ S(−Θⱼ) ,  Θⱼ = Σ − νⱼ = (D_n − (2j + 1) ; F(n−1) − j , … )', C.gold, gq, 21);
    const lq = Q(S, 0, 'Its length is the number of modes minus n minus one', 0.6) * f1;
    lbl('D_n = F(n − 1) + F(n + 1) cyclic modes ,  length p_n = D_n − n − 1', W / 2, 315, C.white, lq, 18);
    const tq = Q(S, 0, 'its last module has k minus one summands', 0.6) * f1;
    const rows = [['n', 'modes D_n', 'F(n−1)', 'length p_n', 'last ordinary degrees', 'rank']].concat(TERM126.map(r => [String(r[0]), String(r[1]), String(r[2]), String(r[4]), r[5].join(' , '), String(r[7])]));
    table126(355, 370, [100, 180, 150, 180, 480, 120], rows, tq, { size: 22, rh: 58, prog: tq * 1.4, colf: (i, j) => (j === 4 ? C.gold : C.white) });
    const cq = Q(S, 0, 'seventy-three, seventy-one and sixty-nine on nine', 0.6) * f1;
    lbl('open path of seven : 34 modes , length 26 , one last summand of degree 31', W / 2, 650, C.dim, cq, 17);
    lbl('closing the seam : two terminal summands , 26 and 24 , occupancy degrees 7 and 6', W / 2, 690, C.cyan, cq, 17);
    chip(W / 2, 770, 1300, 54, 'Ext^p(R , S(−Σ)) ≅ ω_R :  each minimal generator νⱼ  ↔  one last summand S(−(Σ − νⱼ))', C.gold, cq, 19);
  }
  const q = Q(S, 1, 'Restricted to the face', 0.6, 0.3);
  if (q > 0) {
    chip(530, 250, 860, 56, 'E_k,m = ⊕ⱼ O(m − 2j − 1)  on  CP²ᵏ', C.cyan, q, 23);
    const iq = Q(S, 1, 'with smooth index equal to the layer count', 0.6);
    lbl('ker D⁺ ≅ (C_k)ₘ , ker D⁻ = 0', 530, 315, C.white, iq, 18);
    lbl('ind D⁺ = Σⱼ C(m + 2k − 2j − 1, 2k) = C_k(m)', 530, 355, C.gold, iq, 18);
    const aq = Q(S, 1, 'A split module with the same layers', 0.6);
    const boxes = [['ACTUAL C_k', C.green, 1], ['SPLIT C_k', C.red, 0]];
    boxes.forEach(([nm, col, act], i) => {
      const x = 1080 + i * 360, y = 270;
      box(x, y, 330, 330, col, aq, 2, 'rgba(0,0,0,0.4)'); lbl(nm, x + 165, y + 40, col, aq, 20);
      cell126(x + 60, y + 80, 210, 60, 'e₃', C.cyan, aq, 22); cell126(x + 60, y + 210, 210, 60, 'e₂', C.cyan, aq, 22);
      if (act) { arrow(x + 165, y + 145, x + 165, y + 205, C.mag, aq, 3); lbl('X^s_I : y^a', x + 185, y + 182, C.mag, aq, 16, 'left'); }
      else { dashed(x + 165, y + 145, x + 165, y + 205, C.dim, aq, 2); lbl('J_k acts by 0', x + 185, y + 182, C.dim, aq, 16, 'left'); }
      lbl('k = 4 , nine positions', x + 165, y + 310, C.dim, aq, 15);
    });
    const eq = Q(S, 1, 'has every index equal', 0.6);
    const by = 770, xs = [200, 360, 520, 680, 840];
    lbl('n = 9 : index of both modules', 530, 470, C.white, eq, 17);
    CK126[1].slice(1).forEach((v, i) => { const qq = clamp(eq * 1.6 - i / 6), hh = Math.sqrt(v) * 10; fillBox(xs[i] - 55, by - hh, 50, hh, C.green, qq * 0.45); rect63(xs[i] - 55, by - hh, 50, hh, C.green, qq, 1.4); fillBox(xs[i] + 5, by - hh, 50, hh, C.red, qq * 0.45); rect63(xs[i] + 5, by - hh, 50, hh, C.red, qq, 1.4); lbl(String(v), xs[i], by - hh - 12, C.white, qq, 18); lbl('m = ' + (5 + i), xs[i], by + 26, C.dim, qq, 15); });
    const fq = Q(S, 1, 'the index forgets the action', 0.6);
    stamp('SAME INDEX , DIFFERENT ACTION', 1430, 700, fq, C.red, 28, -0.04);
    lbl('k ≥ 4 : no R_k-isomorphism ;  k = 3 : the actions agree', 1430, 790, C.dim, Q(S, 1, 'yet for k at least four it is not isomorphic', 0.6), 16);
  }
};

/* ---- 09 SHARED ROOT (§35–36) ---- */
SCENES.root = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On seven-cycles a transfer walk', 0.6);
  if (f1 > 0) {
    const gq = Q(S, 0, 'Now glue b odd rings at one shared root', 0.6) * f1;
    const lit = [[0, 1, 0, 1, 0, 0, 0], [0, 0, 1, 0, 1, 0, 1], [0, 1, 0, 0, 1, 0, 0]];
    petal126(470, 535, 3, 128, gq, { lit, cols: [C.cyan, C.gold, C.vio], r: 12 });
    lbl('b = 3 seven-cycles , 2kb + 1 = 19 vertices , magenta : shared root o', 470, 795, C.dim, gq, 16);
    const aq = Q(S, 0, 'Local arrays glue exactly when they share the degree and the root count', 0.6) * f1;
    chip(1390, 280, 780, 58, 'S_k,b ↔ { (p₁ , … , p_b) : same (m , t) }', C.cyan, aq, 23);
    lbl('t = root occupancy : move the t root rows to the same positions', 1390, 340, C.white, aq, 15);
    lbl('R_k,b ≅ ⊕_(m,t) (R_k)_(m,t) ⊗ … ⊗ (R_k)_(m,t)', 1390, 385, C.gold, aq, 18);
    lbl('normal , Cohen–Macaulay , dimension 2kb + 2', 1390, 425, C.dim, aq, 15);
    const bq = Q(S, 0, 'a global interior point is a minimal generator', 0.6) * f1;
    chip(1390, 510, 780, 58, 'basic  ⇔  some cycle restriction p_a = νⱼ', C.mag, bq, 23);
    lbl('otherwise remove one row from every cycle with the same root bit :', 1390, 570, C.white, bq, 15);
    lbl('root-zero row if 2t < m , root-one row if 2t ≥ m', 1390, 600, C.gold, bq, 17);
  }
  const q = Q(S, 1, 'On seven-cycles a transfer walk', 0.6, 0.3);
  if (q > 0) {
    lbl('closed walk on T₂ from the middle state', 400, 270, C.white, q, 18);
    WALK126.forEach((r, i) => { const qq = clamp(q * 1.6 - i / 9), y = 315 + i * 50; lbl('T₂^' + i, 210, y, C.dim, qq, 17, 'left'); r.forEach((v, j) => cell126(300 + j * 120, y - 30, 105, 40, String(v), (i === 7 && j === 1) ? C.gold : C.cyan, qq, 18, (i === 7 && j === 1) ? 0.55 : 0.18)); });
    lbl('101 local interiors at boundary (5 , 2) ; one of them is ν₂', 430, 745, C.gold, q, 16);
    const tq = Q(S, 1, 'so the type is one plus one hundred one to the b', 0.6);
    chip(1390, 270, 780, 60, 'type R₃,b = 1 + 101ᵇ − 100ᵇ', C.gold, tq, 26);
    const cells = [['b = 1', '2', 'one seven-cycle'], ['b = 2', '202', 'not 2 · 2 = 4'], ['b = 3', '30302', 'not 2³ = 8']];
    const pq = Q(S, 1, 'not the product four', 0.6);
    cells.forEach(([a1, a2, a3], i) => { const qq = clamp(tq * 1.6 - i / 4), y = 340 + i * 82; cell126(1040, y, 180, 64, a1, C.cyan, qq, 21); cell126(1240, y, 260, 64, a2, C.gold, qq, 26, 0.4); lbl(a3, 1530, y + 42, C.red, pq * qq, 18, 'left'); });
    const cq = Q(S, 1, 'then thirty thousand three hundred two', 0.6);
    const rrows = [['m = 5 , t', 'B', 'E', 'I = B + E', 'I² − B²']].concat(ROOT126['5'].filter(r => r[0] >= 1 && r[0] <= 3).map(r => r.map(String)));
    table126(1080, 600, [120, 110, 90, 170, 150], rrows, cq, { size: 18, rh: 40, colf: (i, j) => (j === 4 && i === 2 ? C.gold : C.white) });
    lbl('quotient C₃,₂ in degrees 5 , 6 , 7 :  201 , 6157 , 80796 monomials', 1390, 800, C.white, cq, 16);
    lbl('recomputed : 201 basic tuples among 35811 interiors × 505 modes ; five-cycles : type 1', 430, 790, C.dim, cq, 14);
  }
};

/* ---- 10 CYCLEWISE DEFICIT (§37–38) ---- */
SCENES.action = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The end of the resolution follows the generators', 0.6);
  if (f1 > 0) {
    const dq = Q(S, 0, 'a class dies only when every ring reaches k minus one', 0.6) * f1;
    chip(W / 2, 250, 1500, 56, 'X^s [X^p] = 0  ⇔  δ_a(p) + δ_a(s) ≥ k − 1 for every ring a', C.gold, dq, 22);
    const xq = Q(S, 0, 'modes x and y that are each short on one ring', 0.6) * f1;
    petal126(310, 520, 2, 95, xq, { th0: Math.PI, lit: [[0, 1, 0, 1, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0]], cols: [C.cyan, C.gold], r: 11 });
    lbl('x : {1,3} | {1,3,5}  δ = (1, 0)', 310, 670, C.cyan, xq, 17);
    petal126(760, 520, 2, 95, xq, { th0: Math.PI, lit: [[0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 0, 0]], cols: [C.cyan, C.gold], r: 11 });
    lbl('y : {1,3,5} | {1,3}  δ = (0, 1)', 760, 670, C.gold, xq, 17);
    lbl('two seven-cycles , root empty , k = 3', 535, 725, C.dim, xq, 15);
    const gx = 1150, gy = 760, s = 120;
    const lq = Q(S, 0, 'both act nonzero', 0.6) * f1;
    for (let i = 1; i <= 5; i++) for (let j = 1; j <= 4; j++) { const dead = i >= 2 && j >= 2; fillBox(gx + (i - 1) * s - s / 2 + 4, gy - (j - 1) * s * 0.85 - s * 0.85 / 2 + 4, s - 8, s * 0.85 - 8, dead ? C.red : C.green, dq * (dead ? 0.22 : 0.1)); }
    lbl('δ₁ →', gx + 4.6 * s, gy + 60, C.dim, dq, 16); lbl('δ₂ ↑', gx - 70, gy - 3.4 * s * 0.85, C.dim, dq, 16);
    [1, 2, 3, 4, 5].forEach(i => lbl(String(i), gx + (i - 1) * s, gy + 60, C.dim, dq, 15)); [1, 2, 3, 4].forEach(j => lbl(String(j), gx - 70, gy - (j - 1) * s * 0.85 + 6, C.dim, dq, 15));
    const P = (i, j) => [gx + (i - 1) * s, gy - (j - 1) * s * 0.85];
    const p0 = P(1, 1); dot(p0[0], p0[1], 15, 'g', dq); lbl('p*', p0[0] - 26, p0[1] + 6, C.gold, dq, 18, 'right');
    const a1 = P(2, 1), a2 = P(1, 2); arrow(p0[0] + 16, p0[1], a1[0] - 16, a1[1], C.cyan, lq, 3); arrow(p0[0], p0[1] - 16, a2[0], a2[1] + 16, C.gold, lq, 3);
    dot(a1[0], a1[1], 12, 'c', lq); dot(a2[0], a2[1], 12, 'g', lq); lbl('x', a1[0], a1[1] + 32, C.cyan, lq, 18); lbl('y', a2[0] - 24, a2[1] + 6, C.gold, lq, 18);
    const pq = Q(S, 0, 'every power of x acts nonzero', 0.6) * f1;
    [3, 4, 5].forEach(i => { const P2 = P(i, 1); dot(P2[0], P2[1], 10, 'c', pq); }); lbl('x^q stays on δ₂ = 1', P(4, 1)[0], P(4, 1)[1] - 24, C.cyan, pq, 16);
    const kq = Q(S, 0, 'yet x y kills the whole quotient', 0.6) * f1;
    const b2 = P(2, 2); line(b2[0] - 14, b2[1] - 14, b2[0] + 14, b2[1] + 14, C.red, kq, 4); line(b2[0] + 14, b2[1] - 14, b2[0] - 14, b2[1] + 14, C.red, kq, 4); lbl('xy', b2[0] + 24, b2[1] - 16, C.red, kq, 18, 'left');
    lbl('red : every δ_a ≥ 2 , the class is gone', gx + 2 * s, gy - 3.6 * s * 0.85, C.red, dq, 15);
  }
  const q = Q(S, 1, 'The end of the resolution follows the generators', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, 'F_c = ⊕ⱼ P(−(D − 2j − 1))^μⱼ ,  full shifts Σ − p', C.gold, q, 22);
    const mq = Q(S, 1, 'have five hundred five modes', 0.6);
    petal126(330, 520, 2, 105, mq, { th0: Math.PI, cols: [C.cyan, C.gold], r: 11, labs: [['', '168', '129', '142', '142', '129', '168'], ['', '168', '129', '142', '142', '129', '168']], ls: 15 });
    lbl('Σ coordinates : modes using each vertex ; root (magenta) : 64', 330, 700, C.dim, mq, 15);
    chip(780, 380, 420, 56, 'D₃,₂ = 21² + 8² = 505', C.cyan, mq, 22);
    const pq = Q(S, 1, 'projective dimension four hundred ninety-one', 0.6);
    chip(780, 470, 420, 56, 'pd = 505 − 14 = 491', C.white, pq, 22);
    const lq = Q(S, 1, 'and the last module has one summand', 0.6);
    box(1060, 330, 720, 300, C.gold, lq, 2, 'rgba(40,30,0,0.35)');
    lblG('F₄₉₁ = P(−502) ⊕ P(−500)²⁰¹', 1420, 410, C.white, lq, 32);
    lbl('degree 505 − 3 : one summand (ν₁)', 1420, 470, C.gold, lq, 18);
    lbl('degree 505 − 5 : 201 summands (basic tuples)', 1420, 510, C.gold, lq, 18);
    lbl('rank 202 = Cohen–Macaulay type', 1420, 570, C.green, Q(S, 1, 'two hundred one of degree five hundred', 0.6), 19);
    lbl('an algebraic type , not a zero-mode count or an index', 1420, 700, C.dim, Q(S, 1, 'two hundred one of degree five hundred', 0.6), 15);
  }
};

/* ---- 11 SEPARATOR (§39) ---- */
SCENES.separator = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Matching one-point totals always suffices', 0.6);
  if (f1 > 0) {
    const gq = Q(S, 0, 'glue along any shared induced separator', 0.6) * f1;
    box(380, 300, 320, 300, C.mag, gq, 2.5, 'rgba(40,0,40,0.35)'); lbl('separator H', 540, 335, C.mag, gq, 19);
    [[450, 420], [630, 420], [540, 520]].forEach(p => ring(p[0], p[1], 14, C.mag, gq, 2.5)); line(450, 420, 540, 520, C.mag, gq * 0.6, 2);
    [['G₁', 200, 450, C.cyan], ['G₂', 880, 450, C.gold], ['G₃', 540, 700, C.green]].forEach(([nm, x, y, col]) => { ring(x, y, 70, col, gq, 2.5); lbl(nm, x, y + 8, col, gq, 22); line(x + (540 - x) * 0.18, y + (450 - y) * 0.18, x + (540 - x) * 0.5, y + (450 - y) * 0.5, col, gq * 0.5, 2); });
    lbl('branches meet exactly in H , no cross edges', 540, 810, C.dim, gq, 15);
    const hq = Q(S, 0, 'one common separator histogram', 0.6) * f1;
    chip(1390, 290, 760, 58, 'h_J = #{ rows r : I_r ∩ V(H) = J } ,  J ∈ Ind(H)', C.gold, hq, 21);
    const hv = [3, 1, 2, 0, 1];
    hv.forEach((v, i) => { const qq = clamp(hq * 1.6 - i / 6), x = 1110 + i * 130, hh = v * 50 + 2; fillBox(x, 560 - hh, 90, hh, C.gold, qq * 0.45); rect63(x, 560 - hh, 90, hh, C.gold, qq, 1.4); lbl(['∅', '{u}', '{v}', '{w}', '{u,v}'][i], x + 45, 590, C.white, qq, 17); });
    lbl('illustrative histogram , m = 7 rows', 1390, 625, C.dim, hq, 15);
    const eq = Q(S, 0, 'A global array exists exactly when', 0.6) * f1;
    chip(1390, 700, 760, 58, 'global array  ⇔  ∩ₐ B_a(m , c⁽ᵃ⁾) ≠ ∅', C.green, eq, 23);
  }
  const q = Q(S, 1, 'Matching one-point totals always suffices', 0.6, 0.3);
  if (q > 0) {
    chip(530, 250, 860, 56, 'H complete :  h({v}) = c_v ,  h(∅) = m − Σ c_v , forced by totals', C.green, q, 20);
    const pq = Q(S, 1, 'paths of lengths two and three', 0.6);
    const L = [[1, 0, 1], [0, 1, 0]], R = [[1, 0, 1, 0], [0, 1, 0, 1]];
    lbl('left : a₀ − x − b₀', 300, 350, C.cyan, pq, 18); lbl('right : a₀ − y − z − b₀', 760, 350, C.gold, pq, 18);
    L.forEach((r, i) => { posRow126(200, 410 + i * 70, r, 100, pq, 'c'); });
    R.forEach((r, i) => { posRow126(640, 410 + i * 70, r, 80, pq, 'g'); });
    [['a₀', 200], ['x', 300], ['b₀', 400]].forEach(([s, x]) => lbl(s, x, 580, C.white, pq, 17)); [['a₀', 640], ['y', 720], ['z', 800], ['b₀', 880]].forEach(([s, x]) => lbl(s, x, 580, C.white, pq, 17));
    const sq = Q(S, 1, 'put them in the same row and in opposite rows', 0.6);
    lbl('h({a₀, b₀}) = 1', 300, 630, C.cyan, sq, 19); lbl('h({a₀, b₀}) = 0', 760, 630, C.gold, sq, 19);
    lbl('every left histogram ≠ every right histogram , same one-point totals', 530, 690, C.red, sq, 15);
    const oq = Q(S, 1, 'an odd five-cycle, once more', 0.6);
    colourRing126(1420, 500, 160, 5, oq, Q(S, 1, 'an odd five-cycle, once more', 2.0), ['a₀', 'x', 'b₀', 'z', 'y']);
    lbl('union : a₀ − x − b₀ − z − y − a₀', 1420, 730, C.white, oq, 18);
    stamp('NOT TWO-COLOURABLE', 1420, 790, oq, C.red, 26, -0.04);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'published'], [1, 'the Fibonacci count of path modes is frozen in Lean', 'lean'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['CARRIER', 'ker D⁺ ≅ (R₃)ₘ', C.cyan, 'An elliptic carrier and its kernel'], ['PFAFFIANS', '1 · 5 · 5 · 1 exact', C.gold, 'exact Pfaffian syzygies'], ['PATHS', 'shift (3; 1, … , 1)', C.mag, 'self-dual paths'], ['SEAM', 'T_m , 21 not 25', C.green, 'a seam matrix'], ['ODD RING', '(2; 1, … , 1) ∉ S', C.red, 'the odd-ring defect'],
      ['LAYERS', 'y^a N^δ', C.cyan, 'nilpotent layers'], ['SPLIT', 'same index', C.gold, 'an index that forgets the action'], ['ROOTS', '1 + 101ᵇ − 100ᵇ', C.mag, 'synchronized roots'], ['DEFICITS', 'x y C = 0', C.green, 'cyclewise deficits'], ['SEPARATOR', 'complete ⇔ totals', C.red, 'the separator criterion']];
    items.forEach(([a1, a2, col, ph], i) => { const row = i < 5 ? 0 : 1, k = row ? i - 5 : i, x = W / 2 + (k - 2) * 320, y = 225 + row * 150, q = Q(S, 0, ph) * fade; box(x - 150, y, 300, 125, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 48, col, q, 20); lblG(a2, x, y + 95, C.white, q, 19); });
    lbl('PUBLISHED · path polytopes (Jiang–Yang–Zhong) · odd-cycle canonical modules (Miyazaki) · clique sums (Matsuda–Ohsugi–Shibata) · ℤʳ-graded canonical modules (Barile–Bruns)', W / 2, 560, C.cyan, Q(S, 1, 'Path-polytope reciprocity') * fade, 14);
    lbl('LEAN · FROZEN · AdmissibleCount.admissibleWord_card_eq_fib : words with no two adjacent ones number F(n + 2)', W / 2, 600, C.green, Q(S, 1, 'the Fibonacci count of path modes') * fade, 14);
    lbl('CLASSICAL · Atiyah–Singer · Hodge · Serre GAGA · Stacks 01XT · Buchsbaum–Eisenbud · Hochster · Danilov–Stanley · Auslander–Buchsbaum · Hibi', W / 2, 640, '#8fbcff', Q(S, 1, 'is frozen in Lean') * fade, 14);
    lbl('VOLUME · carriers · four-position resolution · path duality · seam closure · seven-ring defect · layer action · terminal modules · split comparison · root gluing · separators', W / 2, 680, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · kernels and heat traces · ranks mod 2 and p · Ehrhart counts · trace excess · generators by enumeration · layer action · 201 basic tuples · gluing by brute force', W / 2, 720, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('THE VOLUME ITSELF IS NOT YET IN THE DIGESTION LEDGER', W / 2, 790, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr63(W / 2, 440, 230, 0.5 + t * 0.2, a * 0.9, { fillBase: 1, bits: true, lab: 0.6 });
    txt('AURIC CIRC II · ODD RINGS', W / 2, 680, { size: 54, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 环流控制 第二部 · 指标载体、奇环与共享根 · TRURETURING FILM 126', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One relation becomes a kernel, a resolution, a ring defect and a synchronized gluing.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC CIRCULATION II', carrier: 'ELLIPTIC CARRIER', pfaff: 'PFAFFIAN SYZYGIES', paths: 'SELF-DUAL PATHS', seam: 'SEAM MATRIX', canon: 'SEVEN-RING DEFECT', layers: 'NILPOTENT LAYERS', split: 'INDEX WITHOUT ACTION', root: 'SHARED ROOT', action: 'CYCLEWISE DEFICIT', separator: 'SEPARATOR CRITERION', finale: 'LEDGER' });

function poster126() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  colourRing126(460, 500, 210, 7, 1, 1, ['1', '1', '1', '1', '1', '1', '1']);
  txt('ν₅ − ν₃ = (2; 1, … , 1) ∉ S', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('ker D⁺ ≅ (R₃)ₘ · 1 · 5 · 5 · 1 exact', 1320, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('type 1 + 101ᵇ − 100ᵇ : 2 , 202', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 环流控制 第二部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC CIRC II · ODD RINGS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('指 标 载 体 · 奇 环 · 共 享 根', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 126', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster126;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
