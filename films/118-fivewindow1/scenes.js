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

/* ---- film 118: AURIC FIVE-WINDOW MEMORY I · THREE STEPS, ONE HALF AND SIX STATES ---- */
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
const _po118 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po118.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po118.set(key, off); }
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
const WIN118 = {"p": [0.276393, 0.17082, 0.276393, 0.17082, 0.105573], "Q4": [[0.291796, 0.145898, 0.291796, 0.18034, 0.0901699], [0.291796, 0.145898, 0.291796, 0.18034, 0.0901699], [0.291796, 0.145898, 0.291796, 0.18034, 0.0901699], [0.236068, 0.236068, 0.236068, 0.145898, 0.145898], [0.236068, 0.236068, 0.236068, 0.145898, 0.145898]]};
const DET118 = {"det": {"0.2": [[0.0, 0.0609663], [0.025, 0.061115], [0.05, 0.0612563], [0.075, 0.06139], [0.1, 0.0615162], [0.125, 0.061635], [0.15, 0.0617461], [0.175, 0.0618497], [0.2, 0.0619457], [0.225, 0.0620341], [0.25, 0.0621148], [0.275, 0.0621879], [0.3, 0.0622533], [0.325, 0.0623111], [0.35, 0.0623612], [0.375, 0.0624036], [0.4, 0.0624383], [0.425, 0.0624653], [0.45, 0.0624846], [0.475, 0.0624961], [0.5, 0.0625], [0.525, 0.0624961], [0.55, 0.0624846], [0.575, 0.0624653], [0.6, 0.0624383], [0.625, 0.0624036], [0.65, 0.0623612], [0.675, 0.0623111], [0.7, 0.0622533], [0.725, 0.0621879], [0.75, 0.0621148], [0.775, 0.0620341], [0.8, 0.0619457], [0.825, 0.0618497], [0.85, 0.0617461], [0.875, 0.061635], [0.9, 0.0615162], [0.925, 0.06139], [0.95, 0.0612563], [0.975, 0.061115], [1.0, 0.0609663]], "0.5": [[0.0, 0.0493827], [0.025, 0.0505938], [0.05, 0.0517562], [0.075, 0.0528681], [0.1, 0.0539272], [0.125, 0.0549316], [0.15, 0.0558797], [0.175, 0.0567697], [0.2, 0.0576], [0.225, 0.0583692], [0.25, 0.059076], [0.275, 0.0597191], [0.3, 0.0602975], [0.325, 0.0608102], [0.35, 0.0612563], [0.375, 0.061635], [0.4, 0.0619457], [0.425, 0.0621879], [0.45, 0.0623612], [0.475, 0.0624653], [0.5, 0.0625], [0.525, 0.0624653], [0.55, 0.0623612], [0.575, 0.0621879], [0.6, 0.0619457], [0.625, 0.061635], [0.65, 0.0612563], [0.675, 0.0608102], [0.7, 0.0602975], [0.725, 0.0597191], [0.75, 0.059076], [0.775, 0.0583692], [0.8, 0.0576], [0.825, 0.0567697], [0.85, 0.0558797], [0.875, 0.0549316], [0.9, 0.0539272], [0.925, 0.0528681], [0.95, 0.0517562], [0.975, 0.0505938], [1.0, 0.0493827]], "0.8": [[0.0, 0.0192901], [0.025, 0.0224167], [0.05, 0.0256], [0.075, 0.0288056], [0.1, 0.0320012], [0.125, 0.0351562], [0.15, 0.038242], [0.175, 0.0412316], [0.2, 0.0441], [0.225, 0.0468242], [0.25, 0.0493827], [0.275, 0.0517563], [0.3, 0.0539272], [0.325, 0.0558797], [0.35, 0.0576], [0.375, 0.059076], [0.4, 0.0602975], [0.425, 0.0612562], [0.45, 0.0619457], [0.475, 0.0623612], [0.5, 0.0625], [0.525, 0.0623612], [0.55, 0.0619457], [0.575, 0.0612562], [0.6, 0.0602975], [0.625, 0.059076], [0.65, 0.0576], [0.675, 0.0558797], [0.7, 0.0539272], [0.725, 0.0517562], [0.75, 0.0493827], [0.775, 0.0468242], [0.8, 0.0441], [0.825, 0.0412316], [0.85, 0.038242], [0.875, 0.0351562], [0.9, 0.0320012], [0.925, 0.0288056], [0.95, 0.0256], [0.975, 0.0224167], [1.0, 0.0192901]]}, "lower": {"0.2": 0.0390184, "0.5": 0.0123457, "0.8": 0.000771605}};
const NPT118 = {"0.2": [-0.01, -0.0004, -1.6e-05, -6.4e-07, -2.56e-08, -1.024e-09, -4.096e-11, -1.6384e-12, -6.55316e-14, -2.61703e-15, -1.00449e-16, 2.1409e-19, 4.24062e-18, 4.40168e-18, 4.40813e-18, 4.40838e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18, 4.40839e-18], "0.381966": [-0.0364745, -0.00532156, -0.000776405, -0.000113276, -1.65267e-05, -2.41122e-06, -3.51792e-07, -5.13258e-08, -7.48833e-09, -1.09253e-09, -1.59398e-10, -2.32559e-11, -3.39299e-12, -4.95029e-13, -7.22227e-14, -1.0536e-14, -1.53605e-15, -2.2297e-16, -3.13949e-17, -3.4444e-18, 6.3352e-19, 1.22848e-18, 1.31528e-18, 1.32795e-18, 1.3298e-18, 1.33007e-18, 1.33011e-18, 1.33011e-18, 1.33011e-18, 1.33011e-18], "0.5": [-0.0625, -0.015625, -0.00390625, -0.000976563, -0.000244141, -6.10352e-05, -1.52588e-05, -3.8147e-06, -9.53674e-07, -2.38419e-07, -5.96046e-08, -1.49012e-08, -3.72529e-09, -9.31323e-10, -2.32831e-10, -5.82077e-11, -1.45519e-11, -3.63797e-12, -9.095e-13, -2.27367e-13, -5.68423e-14, -1.42055e-14, -3.5417e-15, -8.80913e-16, -2.04325e-16, -4.63993e-17, -2.1691e-17, 3.23032e-18, -2.3083e-18, 5.36271e-18], "0.8": [-0.16, -0.1024, -0.065536, -0.041943, -0.0268435, -0.0171799, -0.0109951, -0.00703687, -0.0045036, -0.0028823, -0.00184467, -0.00118059, -0.000755579, -0.00048357, -0.000309485, -0.00019807, -0.000126765, -8.11296e-05, -5.1923e-05, -3.32307e-05, -2.12676e-05, -1.36113e-05, -8.71123e-06, -5.57519e-06, -3.56812e-06, -2.2836e-06, -1.4615e-06, -9.35361e-07, -5.98631e-07, -3.83124e-07]};
const MIX118 = [[1, 0.574762], [2, 0.0491682], [3, 0.00371738], [4, 0.000447661], [5, 6.10355e-05], [6, 8.68392e-06], [7, 1.25497e-06], [8, 1.82436e-07]];
const HALF118 = {"P": [[0.166667, 0.166667, 0.235702, 0.166667, 0.166667], [0.166667, 0.166667, 0.235702, 0.166667, 0.166667], [0.235702, 0.235702, 0.333333, 0.235702, 0.235702], [0.166667, 0.166667, 0.235702, 0.166667, 0.166667], [0.166667, 0.166667, 0.235702, 0.166667, 0.166667]], "M": [[0.166667, 0.0833333, 0.117851, 0.166667, 0.0833333], [0.0833333, 0.166667, 0.117851, 0.0833333, 0.166667], [0.117851, 0.117851, 0.333333, 0.117851, 0.117851], [0.166667, 0.0833333, 0.117851, 0.166667, 0.0833333], [0.0833333, 0.166667, 0.117851, 0.0833333, 0.166667]], "diag": [0.166667, 0.166667, 0.333333, 0.166667, 0.166667], "Espec": [1, 0.666667, 0, 0, 0], "dn": [[2, 1.33333, 1.33333], [3, 0.666667, 0.666667], [4, 0.333333, 0.333333], [5, 0.166667, 0.166667], [6, 0.0833333, 0.0833333], [7, 0.0416667, 0.0416667], [8, 0.0208333, 0.0208333], [9, 0.0104166, 0.0104167], [10, 0.00520833, 0.00520833]], "npt": [[0, -0.5], [1, -0.25], [2, -0.125], [3, -0.0625], [4, -0.03125], [5, -0.015625], [6, -0.0078125], [7, -0.00390625], [8, -0.00195312], [9, -0.000976562], [10, -0.000488281], [11, -0.000244141], [12, -0.00012207], [13, -6.10352e-05], [14, -3.05176e-05], [15, -1.52588e-05], [16, -7.62939e-06], [17, -3.8147e-06], [18, -1.90735e-06], [19, -9.53674e-07], [20, -4.76837e-07], [21, -2.38419e-07], [22, -1.19209e-07], [23, -5.96046e-08], [24, -2.98023e-08], [25, -1.49012e-08]]};
const SLOW118 = {"0.05": [[1, 1.726, 0.95], [2, 1.5583, 0.9025], [4, 1.08604, 0.814506], [8, 0.884561, 0.66342], [12, 0.72048, 0.54036], [16, 0.586836, 0.440127], [24, 0.389319, 0.291989], [32, 0.258282, 0.193711]], "0.15": [[1, 1.62302, 0.85], [2, 1.38301, 0.7225], [4, 0.696548, 0.522006], [8, 0.363325, 0.272491], [12, 0.189656, 0.142242], [16, 0.0990014, 0.0742511], [24, 0.026977, 0.0202327], [32, 0.00735097, 0.00551322]], "0.4": [[1, 1.4, 0.6], [2, 1.33333, 0.36], [4, 0.333333, 0.1296], [8, 0.0241961, 0.0167962], [12, 0.00291902, 0.00217678], [16, 0.000376559, 0.000282111], [24, 6.31576e-06, 4.73838e-06], [32, 1.01911e-07, 7.95866e-08]]};
const FAM118 = {"curve": [[0.01, 0.411197, 0.01, 0.411197], [0.02, 0.495533, 0.02, 0.495533], [0.03, 0.552512, 0.03, 0.552512], [0.04, 0.596571, 0.04, 0.596571], [0.05, 0.632832, 0.05, 0.632832], [0.06, 0.663773, 0.06, 0.663773], [0.07, 0.690805, 0.07, 0.690805], [0.08, 0.714817, 0.08, 0.714817], [0.09, 0.736407, 0.09, 0.736407], [0.1, 0.756002, 0.1, 0.756002], [0.11, 0.773916, 0.11, 0.773916], [0.12, 0.790389, 0.12, 0.790389], [0.13, 0.805609, 0.13, 0.805609], [0.14, 0.819724, 0.14, 0.819724], [0.15, 0.832857, 0.15, 0.832857], [0.16, 0.845109, 0.16, 0.845109], [0.17, 0.856561, 0.17, 0.856561], [0.18, 0.867287, 0.18, 0.867287], [0.19, 0.877344, 0.19, 0.877344], [0.2, 0.886787, 0.2, 0.886787], [0.21, 0.895659, 0.21, 0.895659], [0.22, 0.904, 0.22, 0.904], [0.23, 0.911845, 0.23, 0.911845], [0.24, 0.919223, 0.24, 0.919223], [0.25, 0.926163, 0.25, 0.926163], [0.26, 0.932688, 0.26, 0.932688], [0.27, 0.93882, 0.27, 0.93882], [0.28, 0.944578, 0.28, 0.944578], [0.29, 0.94998, 0.29, 0.94998], [0.3, 0.955041, 0.3, 0.955041], [0.31, 0.959776, 0.31, 0.959776], [0.32, 0.964199, 0.32, 0.964199], [0.33, 0.96832, 0.33, 0.96832], [0.34, 0.972151, 0.34, 0.972151], [0.35, 0.975702, 0.35, 0.975702], [0.36, 0.978981, 0.36, 0.978981], [0.37, 0.981998, 0.37, 0.981998], [0.38, 0.984759, 0.38, 0.984759], [0.39, 0.987271, 0.39, 0.987271], [0.4, 0.989542, 0.4, 0.989542], [0.41, 0.991576, 0.41, 0.991576], [0.42, 0.993379, 0.42, 0.993379], [0.43, 0.994957, 0.43, 0.994957], [0.44, 0.996312, 0.44, 0.996312], [0.45, 0.997451, 0.45, 0.997451], [0.46, 0.998376, 0.46, 0.998376], [0.47, 0.99909, 0.47, 0.99909], [0.48, 0.999597, 0.48, 0.999597], [0.49, 0.9999, 0.49, 0.9999], [0.5, 1.0, 0.5, 1.0], [0.51, 0.9999, 0.51, 0.9999], [0.52, 0.999602, 0.52, 0.999602], [0.53, 0.999108, 0.53, 0.999108], [0.54, 0.998418, 0.54, 0.998418], [0.55, 0.997535, 0.55, 0.997535], [0.56, 0.996458, 0.56, 0.996458], [0.57, 0.995188, 0.57, 0.995188], [0.58, 0.993726, 0.58, 0.993726], [0.59, 0.992072, 0.59, 0.992072], [0.6, 0.990226, 0.6, 0.990226], [0.61, 0.988187, 0.61, 0.988187], [0.62, 0.985955, 0.62, 0.985955], [0.63, 0.983528, 0.63, 0.983528], [0.64, 0.980907, 0.64, 0.980907], [0.65, 0.978089, 0.65, 0.978089], [0.66, 0.975073, 0.66, 0.975073], [0.67, 0.971857, 0.67, 0.971857], [0.68, 0.968438, 0.68, 0.968438], [0.69, 0.964815, 0.69, 0.964815], [0.7, 0.960984, 0.7, 0.960984], [0.71, 0.956943, 0.71, 0.956943], [0.72, 0.952687, 0.72, 0.952687], [0.73, 0.948213, 0.73, 0.948213], [0.74, 0.943516, 0.74, 0.943516], [0.75, 0.938591, 0.75, 0.938591], [0.76, 0.933434, 0.76, 0.933434], [0.77, 0.928038, 0.77, 0.928038], [0.78, 0.922397, 0.78, 0.922397], [0.79, 0.916504, 0.79, 0.916504], [0.8, 0.910351, 0.8, 0.910351], [0.81, 0.903929, 0.81, 0.903929], [0.82, 0.897229, 0.82, 0.897229], [0.83, 0.890239, 0.83, 0.890239], [0.84, 0.88295, 0.84, 0.88295], [0.85, 0.875347, 0.85, 0.875347], [0.86, 0.867416, 0.86, 0.867416], [0.87, 0.859142, 0.87, 0.87], [0.88, 0.850505, 0.88, 0.88], [0.89, 0.841487, 0.89, 0.89], [0.9, 0.832063, 0.9, 0.9], [0.91, 0.822208, 0.91, 0.91], [0.92, 0.811893, 0.92, 0.92], [0.93, 0.801082, 0.93, 0.93], [0.94, 0.789737, 0.94, 0.94], [0.95, 0.77781, 0.95, 0.95], [0.96, 0.765249, 0.96, 0.96], [0.97, 0.751986, 0.97, 0.97], [0.98, 0.737943, 0.98, 0.98], [0.99, 0.723024, 0.99, 0.99]], "gap": [[0.7, 0.0390157, 0.975394], [0.3, 0.0449589, 1.12397], [0.6, 0.00977426, 0.977426], [0.4, 0.0104583, 1.04583], [0.55, 0.00246522, 0.986089], [0.45, 0.00254909, 1.01963], [0.52, 0.000397513, 0.993783], [0.48, 0.000402852, 1.00713], [0.51, 9.9678e-05, 0.99678], [0.49, 0.000100345, 1.00345], [0.505, 2.4959e-05, 0.998362], [0.495, 2.50424e-05, 1.0017], [0.502, 3.99735e-06, 0.999338], [0.498, 4.00268e-06, 1.00067]], "unit": [0.381966, 0.985272]};
const FORGET118 = {"p0curve": [[0.0, 1.0], [0.01, 0.970396], [0.02, 0.941569], [0.03, 0.913495], [0.04, 0.886154], [0.05, 0.859524], [0.06, 0.833585], [0.07, 0.808318], [0.08, 0.783704], [0.09, 0.759725], [0.1, 0.736364], [0.11, 0.713604], [0.12, 0.691429], [0.13, 0.669823], [0.14, 0.648772], [0.15, 0.628261], [0.16, 0.608276], [0.17, 0.588803], [0.18, 0.569831], [0.19, 0.551345], [0.2, 0.533333], [0.21, 0.515785], [0.22, 0.498689], [0.23, 0.482033], [0.24, 0.465806], [0.25, 0.45], [0.26, 0.434603], [0.27, 0.419606], [0.28, 0.405], [0.29, 0.390775], [0.3, 0.376923], [0.31, 0.363435], [0.32, 0.350303], [0.33, 0.337519], [0.34, 0.325075], [0.35, 0.312963], [0.36, 0.301176], [0.37, 0.289708], [0.38, 0.278551], [0.39, 0.267698], [0.4, 0.257143], [0.41, 0.246879], [0.42, 0.236901], [0.43, 0.227203], [0.44, 0.217778], [0.45, 0.208621], [0.46, 0.199726], [0.47, 0.191088], [0.48, 0.182703], [0.49, 0.174564], [0.5, 0.166667], [0.51, 0.159007], [0.52, 0.151579], [0.53, 0.144379], [0.54, 0.137403], [0.55, 0.130645], [0.56, 0.124103], [0.57, 0.117771], [0.58, 0.111646], [0.59, 0.105723], [0.6, 0.1], [0.61, 0.094472], [0.62, 0.0891358], [0.63, 0.0839877], [0.64, 0.0790244], [0.65, 0.0742424], [0.66, 0.0696386], [0.67, 0.0652096], [0.68, 0.0609524], [0.69, 0.0568639], [0.7, 0.0529412], [0.71, 0.0491813], [0.72, 0.0455814], [0.73, 0.0421387], [0.74, 0.0388506], [0.75, 0.0357143], [0.76, 0.0327273], [0.77, 0.029887], [0.78, 0.027191], [0.79, 0.0246369], [0.8, 0.0222222], [0.81, 0.0199448], [0.82, 0.0178022], [0.83, 0.0157923], [0.84, 0.013913], [0.85, 0.0121622], [0.86, 0.0105376], [0.87, 0.00903743], [0.88, 0.00765957], [0.89, 0.00640212], [0.9, 0.00526316], [0.91, 0.00424084], [0.92, 0.00333333], [0.93, 0.00253886], [0.94, 0.00185567], [0.95, 0.00128205], [0.96, 0.000816327], [0.97, 0.000456853], [0.98, 0.00020202], [0.99, 5.02513e-05], [1.0, 0.0]], "kappa": 0.888952, "alpha": 0.219224, "a": 0.729, "N": 3, "lifts": [[[1, 1.89141], [3, 0.478993], [6, 0.0479286], [9, 0.00255181], [12, 0.000127205], [18, 3.56894e-07]], [[1, 1.86405], [3, 0.560908], [6, 0.0647395], [9, 0.00326252], [12, 0.000228216], [18, 1.79656e-06]], [[1, 1.82273], [3, 0.584598], [6, 0.0196242], [9, 0.000940638], [12, 6.41197e-05], [18, 1.87717e-07]]]};
const CLS118 = {"worst": [[0.05, 0.698691], [0.15, 0.855971], [0.3, 0.791732], [0.4, 0.803558], [0.45, 0.768478], [0.48, 0.867467], [0.52, 0.869304], [0.55, 0.847092], [0.6, 0.876794], [0.7, 0.862661], [0.85, 0.921378], [0.95, 0.96183]], "near": [[0.4, 1.64036], [0.45, 1.90603], [0.49, 1.99622], [0.499, 1.99996], [0.5, 2.0]], "chains": {"random": [1, 9, 13, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], "canonical": [1, 4, 9, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25], "half": [1, 4, 8, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19]}};
const REC118 = {"0.2": [[0, 0.0], [1, 0.2], [2, 0.281447], [3, 0.398667], [4, 0.504185], [5, 0.596675], [6, 0.680474], [7, 0.753823], [8, 0.819595], [9, 0.877543], [10, 0.929193], [11, 0.974865], [12, 1.01546], [13, 1.05141], [14, 1.08333], [15, 1.11162], [16, 1.13672], [17, 1.15897], [18, 1.17871], [19, 1.19621], [20, 1.21173], [21, 1.2255], [22, 1.23771], [23, 1.24853], [24, 1.25813], [25, 1.26664], [26, 1.27419], [27, 1.28089], [28, 1.28683], [29, 1.29209], [30, 1.29676]], "0.35": [[0, 0.0], [1, 0.0460608], [2, 0.064139], [3, 0.0953709], [4, 0.124688], [5, 0.153959], [6, 0.182485], [7, 0.210372], [8, 0.237611], [9, 0.264191], [10, 0.290142], [11, 0.315464], [12, 0.340179], [13, 0.364294], [14, 0.387828], [15, 0.41079], [16, 0.433197], [17, 0.455061], [18, 0.476395], [19, 0.497211], [20, 0.517522], [21, 0.53734], [22, 0.556677], [23, 0.575545], [24, 0.593954], [25, 0.611917], [26, 0.629443], [27, 0.646544], [28, 0.66323], [29, 0.67951], [30, 0.695395]], "0.45": [[0, 0.0], [1, 0.00501256], [2, 0.00688343], [3, 0.0103322], [4, 0.0135972], [5, 0.0169565], [6, 0.0202894], [7, 0.0236291], [8, 0.026959], [9, 0.0302839], [10, 0.0336009], [11, 0.0369105], [12, 0.0402123], [13, 0.0435061], [14, 0.0467919], [15, 0.0500696], [16, 0.0533392], [17, 0.0566007], [18, 0.059854], [19, 0.0630992], [20, 0.0663362], [21, 0.069565], [22, 0.0727857], [23, 0.0759982], [24, 0.0792026], [25, 0.0823989], [26, 0.0855871], [27, 0.0887673], [28, 0.0919393], [29, 0.0951033], [30, 0.0982593]], "0.5": [[0, 0.0], [1, 0.0], [2, 0.0], [3, 0.0], [4, 0.0], [5, 0.0], [6, 0.0], [7, 0.0], [8, 0.0], [9, 0.0], [10, 0.0], [11, 0.0], [12, 0.0], [13, 0.0], [14, 0.0], [15, 0.0], [16, 0.0], [17, 0.0], [18, 0.0], [19, 0.0], [20, 0.0], [21, 0.0], [22, 0.0], [23, 0.0], [24, 0.0], [25, 0.0], [26, 0.0], [27, 0.0], [28, 0.0], [29, 0.0], [30, 0.0]]};
const REC118MN = [1, 2, 4, 6, 6];
/* ---- film 118 helpers ---- */
function ell73(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function cell73(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
const W5_118 = ['000', '100', '010', '001', '101'];
const WC118 = [C.green, C.cyan, C.gold, C.orange, C.mag];
const WD118 = ['n', 'c', 'g', 'o', 'm'];
function wchip118(x, y, w, h, i, a, size = 24, sub) {
  if (a <= 0) return;
  box(x - w / 2, y - h / 2, w, h, WC118[i], a, 2, 'rgba(0,0,0,0.5)');
  lbl(W5_118[i], x, y + size * 0.36, WC118[i], a, size);
  if (sub) lbl(sub, x, y + h / 2 + 22, C.dim, a, 15);
}
function node118(x, y, i, a, r = 30, size = 20) {
  if (a <= 0) return;
  fillEll118(x, y, r, r, WC118[i], a * 0.18); ring(x, y, r, WC118[i], a, 2.4);
  lbl(W5_118[i], x, y + size * 0.36, C.white, a, size);
}
function fillEll118(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
/* arrow between two node centres, shortened by radius r, optionally bent */
function edge118(A, B, r, col, a, lab, bend = 0, w = 2.6, labOff = 18, labSize = 17, lf = 0.5) {
  if (a <= 0) return;
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const mx = (A[0] + B[0]) / 2 + nx * bend, my = (A[1] + B[1]) / 2 + ny * bend;
  const p0 = [A[0] + ux * r, A[1] + uy * r], p1 = [B[0] - ux * r, B[1] - uy * r];
  if (bend === 0) { arrow(p0[0], p0[1], p1[0], p1[1], col, a, w); }
  else {
    curve(p => { const s = p; return [(1 - s) * (1 - s) * p0[0] + 2 * s * (1 - s) * mx + s * s * p1[0], (1 - s) * (1 - s) * p0[1] + 2 * s * (1 - s) * my + s * s * p1[1]]; }, 30, col, a, w);
    const tx = p1[0] - mx, ty = p1[1] - my, tl = Math.hypot(tx, ty) || 1, an = Math.atan2(ty / tl, tx / tl), Lh = 13;
    line(p1[0], p1[1], p1[0] - Lh * Math.cos(an - 0.4), p1[1] - Lh * Math.sin(an - 0.4), col, a, w);
    line(p1[0], p1[1], p1[0] - Lh * Math.cos(an + 0.4), p1[1] - Lh * Math.sin(an + 0.4), col, a, w);
  }
  if (lab) { const s = lf, qx = (1 - s) * (1 - s) * p0[0] + 2 * s * (1 - s) * mx + s * s * p1[0], qy = (1 - s) * (1 - s) * p0[1] + 2 * s * (1 - s) * my + s * s * p1[1], sg = bend >= 0 ? 1 : -1; lblG(lab, qx + nx * labOff * sg, qy + ny * labOff * sg + 6, col, a, labSize); }
}
function selfLoop118(x, y, r, col, a, lab) {
  if (a <= 0) return;
  const cx = x - r - 22;
  ring(cx, y, 24, col, a, 2.6);
  arrow(cx + 14, y + 24, x - r * 0.75, y + r * 0.62, col, a, 2.6);
  if (lab) lblG(lab, cx - 32, y + 7, col, a, 18, 'right');
}
/* 5x5 heat map with optional values */
function heat118(x, y, M, cs, a, vmax, col, fmt, size = 15) {
  if (a <= 0) return;
  for (let i = 0; i < M.length; i++) for (let j = 0; j < M[i].length; j++) {
    const v = M[i][j], q = clamp(Math.abs(v) / vmax);
    fillBox(x + j * cs, y + i * cs, cs - 4, cs - 4, col, a * (0.06 + 0.7 * q));
    rect63(x + j * cs, y + i * cs, cs - 4, cs - 4, col, a * 0.55, 1);
    if (fmt) lbl(fmt(v), x + j * cs + (cs - 4) / 2, y + i * cs + (cs - 4) / 2 + size * 0.36, C.white, a, size);
  }
}
function heads118(x, y, cs, a, side = true, top = true, size = 14) {
  if (a <= 0) return;
  for (let i = 0; i < 5; i++) {
    if (top) lbl(W5_118[i], x + i * cs + (cs - 4) / 2, y - 10, WC118[i], a, size);
    if (side) lbl(W5_118[i], x - 10, y + i * cs + (cs - 4) / 2 + size * 0.36, WC118[i], a, size, 'right');
  }
}
function poly118(pts, xS, yS, col, a, lw = 3) {
  if (a <= 0 || pts.length < 2) return;
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  pts.forEach((p, i) => { const X = xS(p[0]), Y = yS(p[1]); if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
  ctx.stroke(); ctx.globalAlpha = 1;
}
function stair118(x0, y0, vals, bw, hs, a, col, labs, top, hl = -1) {
  if (a <= 0) return;
  vals.forEach((v, i) => {
    const q = clamp(a * 1.6 - i / (vals.length + 2)), x = x0 + i * (bw + 14), h = v * hs, c = i === hl ? C.red : col;
    fillBox(x, y0 - h, bw, h, c, q * 0.42); rect63(x, y0 - h, bw, h, c, q, 1.6);
    lbl(top ? top[i] : String(v), x + bw / 2, y0 - h - 12, C.white, q, 20);
    if (labs) lbl(labs[i], x + bw / 2, y0 + 26, C.dim, q, 15);
  });
}
const BITS118 = (() => { const b = []; let prev = 0; for (let k = 0; k < 600; k++) { const x = prev === 1 ? 0 : (rnd(k, 118) < 0.381966 ? 1 : 0); b.push(x); prev = x; } return b; })();
const lg118 = v => Math.log10(Math.max(v, 1e-30));

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.0);
  // scrolling bit stream with a three-bit window
  const cw = 54, x0 = 150, y0 = 290, n = 15, sp = 1.4, off = u * sp, k0 = Math.floor(off), fr = off - k0;
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - 4, y0 - 10, n * cw - 8, cw + 20); ctx.clip();
  for (let i = -1; i <= n; i++) {
    const b = BITS118[k0 + i + 1] , x = x0 + (i - fr) * cw;
    box(x, y0, cw - 8, cw - 8, b ? C.gold : C.dim, s0 * 0.9, 1.6, b ? 'rgba(60,45,0,0.5)' : 'rgba(0,0,0,0.45)');
    lbl(String(b), x + (cw - 8) / 2, y0 + 34, b ? C.gold : C.white, s0, 24);
  }
  ctx.restore();
  lbl('no two adjacent ones', x0 + 4, y0 - 24, C.dim, s0, 16, 'left');
  const wq = Q(S, 0, 'through a sliding three-bit window', 0.6);
  const wx = x0 + 6 * cw - 8;
  box(wx, y0 - 10, 3 * cw + 8, cw + 12, C.cyan, wq, 3);
  const k = k0 + 7 + (fr > 0.5 ? 1 : 0);
  const cur = '' + BITS118[k] + BITS118[k + 1] + BITS118[k + 2];
  const ci = W5_118.indexOf(cur);
  lbl('window', wx + 1.5 * cw, y0 + cw + 38, C.cyan, wq, 16);
  const lq = Q(S, 0, 'only five windows are legal', 0.6);
  W5_118.forEach((s, i) => { const y = 270 + i * 92; wchip118(1250, y, 200, 64, i, lq, 26); if (i === ci) ring(1250 + 130, y, 12, C.cyan, lq * wq, 3); });
  lbl('5 legal windows : 011 , 110 , 111 never occur', 1250, 735, C.dim, lq, 15);
  const kq = Q(S, 0, 'Give each window a quantum state', 0.6);
  W5_118.forEach((s, i) => { const y = 270 + i * 92; lblG('|' + s + '⟩', 1440, y + 9, WC118[i], kq, 26, 'left'); });
  lblG('H = ℂ⁵', 1440, 785, C.white, kq, 24, 'left');
  const fq = Q(S, 0, 'one fixed channel on five dimensions', 0.6);
  box(320, 470, 460, 210, C.mag, fq, 2, 'rgba(40,0,40,0.35)');
  lblG('Φ : M₅(ℂ) → M₅(ℂ)', 550, 530, C.mag, fq, 30);
  lbl('one fixed CPTP map , repeated', 550, 580, C.white, fq, 18);
  lbl('fresh environment each step , then discarded', 550, 615, C.dim, fq, 16);
  lbl('decoder only after the last step', 550, 648, C.dim, fq, 16);
  const ra = (t * 1.2) % TAU;
  ell73(1000, 575, 90, 90, C.mag, fq * 0.6, 2, 0, 1); dot(1000 + 90 * Math.cos(ra), 575 + 90 * Math.sin(ra), 10, 'm', fq);
  lblG('Φⁿ', 1000, 585, C.white, fq, 28);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr63(W / 2, 430, 230, 0.5 + t * 0.25, rp, { bits: true, K: 0 });
  chip(330, 360, 320, 58, 'three steps', C.gold, rp, 22); chip(330, 445, 320, 58, 'one half', C.mag, rp, 22); chip(330, 530, 320, 58, 'six states', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('k₃ = 1 · η = 1/2 · |S₃| = 6', 1610, 410, C.cyan, rp, 21); lblG('5 → 3 → 2 → 1', 1610, 470, C.white, rp, 30);
  txt(scramble('AURIC 5-WINDOW MEMORY I', rp, 118), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 五 窗 口 记 忆 第 一 部 · 三 步 、二 分 之 一 与 六 个 状 态', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 118 · AURIC_FIB_FIVE_WINDOW_QUANTUM_MEMORY §1–§41', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 WINDOWS ---- */
SCENES.windows = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The stationary law is r squared', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Order the windows', 0.6) * f1;
    const cx = 540, cy = 540, R = 235;
    const PS = [[cx - R * 0.95, cy + R * 0.3], [cx - R * 0.6, cy - R * 0.85], [cx + R * 0.6, cy - R * 0.85], [cx + R * 0.95, cy + R * 0.3], [cx, cy + R * 0.95]];
    const sq = Q(S, 0, 'One step slides a-b-c to b-c-d', 0.6) * f1;
    const pq = Q(S, 0, 'the next bit is one with probability eta', 0.6) * f1;
    const fq = Q(S, 0, 'after a one it is forced to zero', 0.6) * f1;
    selfLoop118(PS[0][0], PS[0][1], 30, C.cyan, pq, 'r');
    edge118(PS[1], PS[0], 34, C.cyan, pq, 'r', -20);
    edge118(PS[0], PS[3], 34, C.gold, pq, 'η', 40);
    edge118(PS[1], PS[3], 34, C.gold, pq, 'η', 0, 2.6, 18, 17, 0.3);
    edge118(PS[2], PS[1], 34, C.cyan, pq, 'r', 0);
    edge118(PS[2], PS[4], 34, C.gold, pq, 'η', -55, 2.6, 18, 17, 0.6);
    edge118(PS[3], PS[2], 34, C.white, fq, '1', 0, 2.6, 18);
    edge118(PS[4], PS[2], 34, C.white, fq, '1', -55, 2.6, 18, 17, 0.6);
    PS.forEach((p, i) => node118(p[0], p[1], i, q, 34, 20));
    lbl('a b c  →  b c d', cx, 262, C.white, sq, 22);
    lbl('r = 1 − η', cx, 290, C.dim, pq, 16);
    const gx = 1150, gy = 340, cw = 110, ch = 62;
    const QS = [['r', '0', '0', 'η', '0'], ['r', '0', '0', 'η', '0'], ['0', 'r', '0', '0', 'η'], ['0', '0', '1', '0', '0'], ['0', '0', '1', '0', '0']];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const v = QS[i][j], qq = clamp(sq * 1.5 - (i * 5 + j) / 40), col = v === '0' ? C.dim : v === '1' ? C.white : v === 'η' ? C.gold : C.cyan; box(gx + j * cw, gy + i * ch, cw - 6, ch - 6, col, qq, 1.4, 'rgba(0,0,0,0.45)'); lblG(v, gx + j * cw + (cw - 6) / 2, gy + i * ch + 37, col, qq, 22); }
    for (let i = 0; i < 5; i++) { lbl(W5_118[i], gx - 14, gy + i * ch + 37, WC118[i], sq, 16, 'right'); lbl(W5_118[i], gx + i * cw + (cw - 6) / 2, gy - 14, WC118[i], sq, 16); }
    lblG('Q_η : row = input window , column = output window', gx + 2.5 * cw, gy + 5 * ch + 34, C.white, sq, 18);
    lbl('source : stationary no-11 chain at activity λ = η / r²', gx + 2.5 * cw, gy + 5 * ch + 70, C.dim, pq, 15);
  }
  const q1 = Q(S, 1, 'The stationary law is r squared', 0.6, 0.3);
  if (q1 > 0) {
    const pv = WIN118.p, px = 170, py = 640, bw = 110;
    lbl('unit activity λ = 1 : η = φ⁻² ≈ 0.382', 470, 270, C.dim, q1, 17);
    pv.forEach((v, i) => { const qq = clamp(q1 * 1.6 - i / 7), h = v * 1100, x = px + i * (bw + 18); fillBox(x, py - h, bw, h, WC118[i], qq * 0.45); rect63(x, py - h, bw, h, WC118[i], qq, 1.6); lbl(v.toFixed(3), x + bw / 2, py - h - 12, C.white, qq, 18); lbl(W5_118[i], x + bw / 2, py + 26, WC118[i], qq, 17); });
    const fl = ['r²', 'ηr', 'η', 'ηr', 'η²'];
    fl.forEach((s, i) => lblG(s, px + i * (bw + 18) + bw / 2, py + 58, C.gold, q1, 20));
    lblG('p = (r², ηr, η, ηr, η²) / (1 + η) ,  Qᵀp = p', 470, py + 110, C.white, q1, 22);
    const hq = Q(S, 1, "the kernel's fourth power is strictly positive", 0.6);
    const hx = 1210, hy = 300, cs = 80;
    heads118(hx, hy, cs, hq, true, true, 14);
    heat118(hx, hy, WIN118.Q4, cs, hq, 0.45, C.cyan, v => v.toFixed(3), 14);
    lbl('Q⁴ at η = φ⁻² : every entry > 0 (min 0.090)', hx + 2.5 * cs, hy + 5 * cs + 30, C.cyan, hq, 17);
    const aq = Q(S, 1, 'An allowed lift is any channel', 0.6);
    chip(1410, 790, 800, 58, 'diag Φ(X) = Qᵀ diag X   for every complex X', C.gold, aq, 23);
  }
};

/* ---- 03 EIGHT EDGES ---- */
SCENES.edges = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So the dual effects are the same for every lift', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Positivity confines every lift to eight edges', 0.6) * f1;
    const xi = 260, xo = 780, yy = i => 290 + i * 100;
    lbl('input', xi, 255, C.dim, q, 16); lbl('output', xo, 255, C.dim, q, 16);
    const vq = Q(S, 0, 'eight unit environment vectors', 0.6) * f1;
    const rq = Q(S, 0, 'always reset to zero one zero', 0.6) * f1;
    const E8 = [[0, 0, '√r α₀', C.gold], [1, 0, '√r α₁', C.gold], [2, 1, '√r γ₀', C.green], [3, 2, 'δ₀', C.mag], [4, 2, 'δ₁', C.mag], [0, 3, '√η β₀', C.cyan], [1, 3, '√η β₁', C.cyan], [2, 4, '√η γ₁', C.green]];
    const LF = [0.5, 0.75, 0.5, 0.5, 0.3, 0.25, 0.75, 0.75];
    E8.forEach(([i, j, lab, col], e) => { const qq = clamp(q * 1.6 - e / 10), hot = (i >= 3) ? 1 + rq : 1; line(xi + 34, yy(i), xo - 34, yy(j), col, qq * Math.min(1, 0.75 * hot), 2.4 * hot); const fx = LF[e]; lblG(lab, xi + 34 + (xo - xi - 68) * fx, yy(i) + (yy(j) - yy(i)) * fx - 10, col, vq * qq, 17); });
    for (let i = 0; i < 5; i++) { node118(xi, yy(i), i, q, 30, 17); node118(xo, yy(i), i, q, 30, 17); }
    const oq = Q(S, 0, 'only three pairs must be orthogonal', 0.6) * f1;
    chip(1380, 300, 760, 58, '⟨α₀, α₁⟩ = ⟨β₀, β₁⟩ = ⟨δ₀, δ₁⟩ = 0', C.gold, oq, 25);
    const fq = Q(S, 0, 'every other complex overlap is free', 0.6) * f1;
    chip(1380, 380, 760, 54, 'all other overlaps free , including ⟨γ₀, γ₁⟩', C.green, fq, 20);
    lbl('V|i⟩ = Σ_j |j⟩ ⊗ e_ji ,  ‖e_ji‖² = Q_ij ;  environment dimension 2 … 8 = rank J', 1380, 440, C.dim, fq, 15);
    lbl('recomputed : 16 random lifts , Choi supported on exactly these 8 edges', 1380, 470, C.dim, fq, 15);
    chip(1380, 560, 760, 58, 'Φ(X) = Tr(X) |010⟩⟨010|   for X on span{001, 101}', C.mag, rq, 21);
    stamp('RESET SECTOR', 1380, 680, rq, C.mag, 30, -0.04);
  }
  const q = Q(S, 1, 'So the dual effects are the same for every lift', 0.6, 0.3);
  if (q > 0) {
    const rows = [['Φ†(P₀₀₀) = r P_A', C.green], ['Φ†(P₁₀₀) = r P_B', C.cyan], ['Φ†(P₀₁₀) = P_D', C.gold], ['Φ†(P₀₀₁) = η P_A', C.orange], ['Φ†(P₁₀₁) = η P_B', C.mag]];
    rows.forEach(([s, col], i) => { const qq = clamp(q * 1.6 - i / 7); box(150, 260 + i * 78, 640, 62, col, qq, 1.6, 'rgba(0,0,0,0.45)'); lblG(s, 470, 300 + i * 78, C.white, qq, 24); });
    lbl('A = span{000, 100} ,  B = span{010} ,  D = span{001, 101}', 470, 670, C.dim, q, 16);
    const pq = Q(S, 1, 'each rank-one output effect pulls back to rank at most one', 0.6);
    chip(470, 740, 780, 56, 'rank(P_C P_R P_C) ≤ 1 , R = A, B, D ,  sum = I_C', C.gold, pq, 21);
    const kq = Q(S, 1, 'one step keeps at most three exact dimensions', 0.6);
    const k2 = Q(S, 1, 'and two steps at most two', 0.6);
    plotAxes(1050, 700, 640, 400, kq, 'step n', 'largest exact code , every lift');
    stair118(1110, 700, [5, 3, 2].slice(0, k2 > 0 ? 3 : 2), 150, 72, kq, C.cyan, ['n = 0', 'n = 1', 'n = 2'], ['5', '≤ 3', '≤ 2']);
    lblG('three-dim code = span{a₀, |010⟩, d₀} , a₀ ∈ A , d₀ ∈ D', 1370, 770, C.white, kq, 17);
  }
};

/* ---- 04 THIRD STEP ---- */
SCENES.third = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Correcting T would give', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Could a qubit survive three steps?', 0.6) * f1;
    lbl('a hypothetical qubit code C , exact after Φ³', W / 2, 270, C.white, q, 22);
    const sq = Q(S, 0, 'Its syndrome ranks would have to be one, one, two', 0.6) * f1;
    [['s₁ = 1', 'isometric'], ['s₂ = 1', 'isometric'], ['s₃ = 2', 'qubit gauge']].forEach(([a, b], i) => { const x = 360 + i * 420; box(x - 150, 320, 300, 110, i === 2 ? C.mag : C.cyan, sq, 2, 'rgba(0,0,0,0.5)'); lbl('step ' + (i + 1), x, 352, C.dim, sq, 16); lblG(a, x, 392, C.white, sq, 28); lbl(b, x, 420, C.dim, sq, 15); if (i < 2) arrow(x + 155, 375, x + 265, 375, C.dim, sq, 2.5); });
    const tq = Q(S, 0, 'its second-step image would be a fixed plane T', 0.6) * f1;
    const P0 = [520, 650];
    fillPoly([[P0[0] - 260, P0[1] + 60], [P0[0] + 120, P0[1] + 60], [P0[0] + 260, P0[1] - 70], [P0[0] - 120, P0[1] - 70]], C.cyan, tq * 0.12);
    strokePoly([[P0[0] - 260, P0[1] + 60], [P0[0] + 120, P0[1] + 60], [P0[0] + 260, P0[1] - 70], [P0[0] - 120, P0[1] - 70]], C.cyan, tq, 2);
    arrow(P0[0], P0[1], P0[0] + 190, P0[1] - 10, C.gold, tq, 3); lblG('h', P0[0] + 205, P0[1] - 4, C.gold, tq, 24, 'left');
    arrow(P0[0], P0[1], P0[0] - 80, P0[1] - 60, C.mag, tq, 3); lblG('w', P0[0] - 95, P0[1] - 62, C.mag, tq, 24, 'right');
    lblG('T', P0[0] - 220, P0[1] + 45, C.cyan, tq, 26);
    chip(1330, 560, 900, 58, 'h = r|000⟩ + √η|010⟩ + √(rη)|001⟩', C.gold, tq, 22);
    chip(1330, 635, 900, 58, 'w = √r|100⟩ + √η|101⟩', C.mag, tq, 22);
    const cq = Q(S, 0, 'which must then be correctable after one more step', 0.6) * f1;
    lbl('after one fixed diagonal phase change of the whole channel :  T must be one-step correctable', W / 2, 760, C.white, cq, 18);
  }
  const q = Q(S, 1, 'Correcting T would give', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 740, pw = 760, ph = 400, xS = x => px + x * pw, yS = v => py - v / 0.075 * ph;
    plotAxes(px, py, pw, ph, q, 't  (eigenvalue of ρ_g)', 'det J_M  (4 × 4 Choi)');
    const cols = { '0.2': C.cyan, '0.5': C.gold, '0.8': C.mag };
    const dq = Q(S, 1, 'of determinant r plus eta squared t one minus t', 0.6);
    Object.keys(DET118.det).forEach((k, j) => { poly118(DET118.det[k], xS, yS, cols[k], dq, 3); const v = DET118.det[k][2][1]; lblG('η = ' + k, xS(0.05) + 4, yS(v) - 10 - (k === '0.2' ? 6 : 0), cols[k], dq, 16, 'left'); dashed(px, yS(DET118.lower[k]), px + pw, yS(DET118.lower[k]), cols[k], dq * 0.5, 1.2); });
    const zq = Q(S, 1, 'never zero', 0.6);
    line(px, yS(0), px + pw, yS(0), C.red, zq, 3);
    lbl('three Kraus operators : rank ≤ 3 , det = 0', px + pw, yS(0) - 12, C.red, zq, 16, 'right');
    [0, 0.5].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, q, 14));
    chip(550, 270, 780, 58, 'det = [r + η² t(1 − t)]² / (1 + r)⁴  ≥  (r / (1 + r))⁴', C.gold, dq, 21);
    const kq = Q(S, 1, 'So every lift keeps one dimension from step three on', 0.6);
    plotAxes(1110, 740, 640, 400, kq, 'step n', 'largest exact code , every lift');
    stair118(1150, 740, [5, 3, 2, 1, 1, 1], 82, 72, kq, C.cyan, ['0', '1', '2', '3', '4', '5'], null, 3);
    stamp('k₃ = 1', 1600, 330, kq, C.red, 40, -0.05);
    lbl('every allowed lift , every 0 < η < 1 , arbitrary complex codes', 1430, 790, C.dim, kq, 15);
  }
};

/* ---- 05 CANONICAL AND ROTATED LIFTS ---- */
SCENES.canon = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'it measures and prepares', 'published'], [0, 'so its entanglement-breaking index is exactly three', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Rotate each equal-row pair first', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the oldest-bit lift', 0.6) * f1;
    const fly = Q(S, 0, 'hands the erased first bit to a fresh environment', 1.2) * f1;
    const cs = 74, x0 = 200, y0 = 300;
    ['a', 'b', 'c'].forEach((s, i) => { cell73(x0 + i * cs, y0, cs - 8, cs - 8, s, i === 0 ? C.gold : C.cyan, q * (i === 0 ? 1 - 0.6 * fly : 1), 26); });
    arrow(x0 + 3 * cs + 10, y0 + 33, x0 + 3 * cs + 110, y0 + 33, C.dim, q, 2.5);
    ['b', 'c', 'd'].forEach((s, i) => { cell73(x0 + 3 * cs + 130 + i * cs, y0, cs - 8, cs - 8, s, i === 2 ? C.green : C.cyan, q, 26); });
    const ex = lerp(x0, 380, fly), ey = lerp(y0, y0 + 190, fly);
    cell73(ex, ey, cs - 8, cs - 8, 'a', C.gold, q * fly, 26);
    box(330, y0 + 165, 220, 120, C.gold, q * fly, 2, 'rgba(40,30,0,0.3)'); lbl('fresh environment', 440, y0 + 305, C.gold, q * fly, 16);
    chip(1330, 300, 860, 58, 'V|abc⟩ = Σ_d √P(c → d) |bcd⟩ ⊗ |a⟩_E', C.cyan, q, 23);
    const kq = Q(S, 0, 'It keeps three, then two dimensions', 0.6) * f1;
    chip(1330, 390, 860, 54, 'C₁ = span{000, 010, 001} : exact after one step', C.gold, kq, 20);
    chip(1330, 460, 860, 54, 'C₂ = span{000, 001} : exact after two steps', C.gold, kq, 20);
    const mq = Q(S, 0, 'it measures and prepares', 0.6) * f1;
    chip(1330, 560, 860, 58, 'Φ³(X) = Σ X_ii |f_c⟩⟨f_c| : measure , then prepare', C.green, mq, 21);
    lbl('EB ⇔ measure-and-prepare : Horodecki–Shor–Ruskai , quant-ph/0302031 , Theorem 4', 1330, 618, C.cyan, mq, 15);
    const iq = Q(S, 0, 'so its entanglement-breaking index is exactly three', 0.6) * f1;
    lbl('reference witness (|0⟩|000⟩ + |1⟩|001⟩)/√2 : determinant −1/4 at steps 1 and 2', 1330, 660, C.dim, iq, 15);
    stamp('INDEX 3', 1330, 750, iq, C.green, 38, -0.04);
    lbl('every exact optimum 5 , 3 , 2 , 1 , 1 , … attained', 440, 680, C.white, kq, 18);
  }
  const q = Q(S, 1, 'Rotate each equal-row pair first', 0.6, 0.3);
  if (q > 0) {
    const cols = [['Ψ', 'classical : measure-and-prepare', '1', C.cyan], ['Φ_can', 'oldest-bit lift', '3', C.gold], ['Ξ = Φ_can ∘ Ad_W', 'rotated within {000,100} , {001,101}', '∞', C.mag]];
    const sq = Q(S, 1, 'Same law, same basis outputs, same codes', 0.6);
    cols.forEach(([nm, sub, idx, col], i) => { const y = 270 + i * 160, qq = i === 0 ? Q(S, 1, 'The classical channel has index one', 0.6) : i === 1 ? sq : Q(S, 1, 'index infinity', 0.6); box(150, y, 760, 130, col, Math.max(qq, sq * 0.35), 2, 'rgba(0,0,0,0.5)'); lblG(nm, 180, y + 48, col, Math.max(qq, sq * 0.35), 26, 'left'); lbl(sub, 180, y + 92, C.dim, Math.max(qq, sq * 0.35), 15, 'left'); lbl('n_EB', 770, y + 48, C.dim, qq, 16); lblG(idx, 770, y + 100, C.white, qq, 40); });
    lbl('same law (2.2) for all three · Φ_can and Ξ : same basis outputs , same codes 5 , 3 , 2 , 1', 530, 760, C.white, sq, 16);
    const wq = Q(S, 1, 'a reference witness has determinant', 0.6);
    const px = 1060, py = 740, pw = 680, ph = 400, xS = n => px + (n - 1) / 9 * pw, yS = v => py - (v + 16) / 16 * ph;
    plotAxes(px, py, pw, ph, wq, 'step n', 'log₁₀ |witness determinant|  (det < 0)');
    const keys = Object.keys(NPT118), cc = [C.cyan, C.gold, C.green, C.mag];
    keys.forEach((k, j) => { const pts = NPT118[k].slice(0, 10).map((d, i) => [i + 1, lg118(-d)]); poly118(pts, xS, yS, cc[j], wq, 2.5); pts.forEach(p => dot(xS(p[0]), yS(p[1]), 5, ['c', 'g', 'n', 'm'][j], wq)); lblG('η = ' + Number(k).toFixed(2), xS(10) + 8, yS(pts[9][1]) + 6, cc[j], wq, 15, 'left'); });
    [0, -4, -8, -12, -16].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, wq, 14, 'right'));
    [1, 5].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, wq, 14));
    chip(1400, 268, 700, 56, 'det = −η²ⁿ / 4 < 0   for every n ≥ 1', C.mag, wq, 22);
    stamp('NPT AT EVERY STEP', 1330, 650, Q(S, 1, 'index infinity', 0.6), C.mag, 26, -0.05);
  }
};

/* ---- 06 MIXTURES AND ENDPOINTS ---- */
SCENES.mixing = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The endpoints are separate models', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Mix any lift with the classical channel', 0.6) * f1;
    chip(530, 280, 820, 58, 'Φ_ε = (1 − ε) Θ + ε Ψ ,  Θ any allowed lift , 0 < ε ≤ 1', C.cyan, q, 20);
    const dq = Q(S, 0, 'the fourth power dominates a full reset', 0.6) * f1;
    chip(530, 370, 820, 58, 'Φ_ε⁴  ≥_CP  5ε⁴m · R_I/5 ,   m = min (Q⁴)_ij > 0', C.gold, dq, 21);
    const fq = Q(S, 0, 'giving a faithful stationary state and a finite index', 0.6) * f1;
    chip(530, 460, 820, 58, 'σ ≥ ε⁴ m I > 0 ,   Φ_εⁿ → R_σ ,   n_EB < ∞', C.green, fq, 22);
    lbl('separable interior : full-rank product states (Hanson–Rouzé–Stilck França)', 530, 520, C.dim, fq, 15);
    const bq = Q(S, 0, 'mixtures with the rotated lift have finite indices beyond any bound', 0.6) * f1;
    const px = 1060, py = 760, pw = 680, ph = 420, xS = n => px + (n - 1) / 7 * pw, yS = v => py - (v + 7.5) / 7.5 * ph;
    plotAxes(px, py, pw, ph, bq, 'N', 'log₁₀ ε*(N)');
    const pts = MIX118.map(r => [r[0], Math.log10(r[1])]);
    poly118(pts, xS, yS, C.mag, bq, 3); pts.forEach(p => dot(xS(p[0]), yS(p[1]), 7, 'm', bq));
    [0, -2, -4, -6].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, bq, 14, 'right'));
    [1, 4].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, bq, 14));
    lbl('Φ_ε = (1 − ε) Ξ + ε Ψ at η = φ⁻² : step N stays NPT for every ε < ε*(N)', px + pw / 2, py - ph - 40, C.white, bq, 15);
    chip(530, 640, 820, 58, 'ε < ε*(N)  ⇒  N < n_EB(Φ_ε) < ∞', C.mag, bq, 23);
    lbl('ε chosen after N : no interchange of limits', 530, 700, C.dim, bq, 15);
  }
  const q = Q(S, 1, 'The endpoints are separate models', 0.6, 0.3);
  if (q > 0) {
    const zq = Q(S, 1, 'At eta zero every lift resets by step three', 0.6);
    box(150, 260, 760, 520, C.green, zq, 2, 'rgba(0,40,20,0.3)');
    lblG('η = 0', 530, 305, C.green, zq, 28);
    chip(530, 370, 680, 56, 'Φ³(X) = Tr(X) |000⟩⟨000|   for every lift', C.green, zq, 21);
    stair118(260, 700, [5, 3, 2, 1, 1], 92, 46, zq, C.green, ['0', '1', '2', '3', '4']);
    lbl('source on the all-zero word', 530, 760, C.dim, zq, 15);
    const oq = Q(S, 1, 'At eta one a swap between zero one zero and one zero one survives forever', 0.6);
    box(1010, 260, 760, 520, C.mag, oq, 2, 'rgba(40,0,40,0.3)');
    lblG('η = 1', 1390, 305, C.mag, oq, 28);
    const A = [1250, 400], B = [1530, 400];
    node118(A[0], A[1], 2, oq, 36, 20); node118(B[0], B[1], 4, oq, 36, 20);
    edge118(A, B, 40, C.mag, oq, 'swap', 34); edge118(B, A, 40, C.mag, oq, null, 34);
    const ph = (Math.floor(t * 1.2) % 2) === 0;
    dot(ph ? A[0] : B[0], A[1] - 56, 9, 'g', oq);
    stair118(1120, 700, [5, 3, 2, 2, 2], 92, 46, Q(S, 1, 'so the optima become five, three, two, two, two', 0.6), C.mag, ['0', '1', '2', '3', '4']);
    lbl('every endpoint lift : Φ(P₀₁₀) = P₁₀₁ , Φ(P₁₀₁) = P₀₁₀', 1390, 760, C.dim, oq, 15);
  }
};

/* ---- 07 HALF ---- */
SCENES.half = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Its powers converge to a measure-and-prepare limit', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a legal lift hides a classical memory', 0.6) * f1;
    chip(W / 2, 262, 1300, 54, 'η = 1/2 :  K₀ = |u⟩⟨000| + |v⟩⟨010|/√2 + |z⟩⟨101| ,  K₁ = |u⟩⟨100| + |v⟩⟨010|/√2 + |z⟩⟨001|', C.white, q, 18);
    const sq = Q(S, 0, 'Two orthogonal stationary states', 0.6) * f1;
    const cs = 50;
    [[HALF118.P, 'P = |s⟩⟨s|', 170, C.gold], [HALF118.M, 'M = (P_R − P) / 2', 520, C.cyan]].forEach(([M, nm, x, col]) => { heads118(x, 345, cs, sq, x < 300, true, 12); heat118(x, 345, M, cs, sq, 0.34, col, null); lblG(nm, x + 2.5 * cs, 622, col, sq, 21); });
    lbl('⟨P, M⟩ = 0 : orthogonal supports', 470, 652, C.white, sq, 16);
    const dq = Q(S, 0, 'have identical populations', 0.6) * f1;
    HALF118.diag.forEach((v, i) => { const x = 170 + i * 128, h = v * 240; fillBox(x, 805 - h, 100, h, WC118[i], dq * 0.45); rect63(x, 805 - h, 100, h, WC118[i], dq, 1.5); lbl(['1/6', '1/6', '1/3', '1/6', '1/6'][i], x + 50, 805 - h - 9, C.white, dq, 16); });
    lbl('diag P = diag M', 820, 770, C.gold, dq, 17, 'left');
    const eq = Q(S, 0, 'a conserved effect tells them apart forever', 0.6) * f1;
    chip(1420, 360, 700, 56, 'E = Φ∘†(P) ,  Φ∘†(E) = E', C.green, eq, 23);
    const ev = HALF118.Espec;
    ev.forEach((v, i) => { const x = 1130 + i * 120, h = v * 240; if (h > 0) { fillBox(x, 680 - h, 90, h, C.green, eq * 0.45); rect63(x, 680 - h, 90, h, C.green, eq, 1.5); } line(x - 4, 680, x + 94, 680, C.dim, eq, 1.2); lbl(['1', '2/3', '0', '0', '0'][i], x + 45, 670 - h, C.white, eq, 18); });
    lbl('Tr(E Φⁿ(X)) = Tr(E X) for every n', 1420, 720, C.white, eq, 17);
    lbl('reads P versus M with zero error at every step', 1420, 752, C.dim, eq, 15);
  }
  const q = Q(S, 1, 'Its powers converge to a measure-and-prepare limit', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 840, 58, 'T = (Φ∘² + 2Φ∘³)/3 :  T(X) = P Tr(EX) + M Tr((I − E)X)', C.green, q, 19);
    const hq = Q(S, 1, 'the distance halving at every step', 0.6);
    const px = 170, py = 740, pw = 720, ph = 380, xS = n => px + (n - 2) / 8 * pw, yS = v => py - (v + 2.6) / 2.9 * ph;
    plotAxes(px, py, pw, ph, hq, 'step n', 'log₁₀ ‖Φ∘ⁿ − T‖_◇  (SDP)');
    curve(p => { const n = 2 + p * 8; return [xS(n), yS(Math.log10(4 / 3 * Math.pow(2, -(n - 2))))]; }, 40, C.gold, hq, 2.5);
    HALF118.dn.forEach(r => dot(xS(r[0]), yS(Math.log10(r[1])), 8, 'n', hq));
    lbl('dots : SDP ;  line : (4/3) 2^−(n−2)', px + pw, py - ph + 30, C.green, hq, 15, 'right');
    [0, -1, -2].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, hq, 14, 'right'));
    [2, 6].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, hq, 14));
    const rq = Q(S, 1, 'every reset stays at diamond distance at least one', 0.6);
    chip(1390, 360, 780, 60, '‖Φ∘ⁿ − R_σ‖_◇ ≥ 1   for every σ , every n', C.red, rq, 23);
    lbl('P , M orthogonal and fixed :  2 = ‖P − M‖₁ ≤ 2 ‖Φ∘ⁿ − R_σ‖_◇', 1390, 425, C.dim, rq, 15);
    const nq = Q(S, 1, 'a reference witness stays NPT at every finite step', 0.6);
    chip(1390, 540, 780, 58, 'witness eigenvalue  −2^−(n+1) < 0  at every n', C.mag, nq, 22);
    lbl('(|0⟩s + |1⟩w)/√2 ,  Φ∘(|s⟩⟨w|) = −½ |s⟩⟨w|', 1390, 600, C.dim, nq, 15);
    stamp('EB LIMIT , NO EB STEP', 1390, 710, nq, C.mag, 26, -0.04);
  }
};

/* ---- 08 SLOW MODE ---- */
SCENES.slow = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Mix in a fraction epsilon', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Encode inside its three-dimensional image', 0.6) * f1;
    const V = [[300, 700], [820, 700], [560, 300]], c = [560, 567];
    fillPoly(V, C.cyan, q * 0.08); strokePoly(V, C.cyan, q, 2);
    [['u', V[0], 'right'], ['v', V[1], 'left'], ['z', V[2], 'center']].forEach(([s, p, al]) => { dot(p[0], p[1], 9, 'c', q); lblG(s, p[0] + (al === 'right' ? -16 : al === 'left' ? 16 : 0), p[1] + (al === 'center' ? -18 : 8), C.cyan, q, 24, al); });
    lbl('R = span{u, v, z}', 560, 760, C.cyan, q, 18);
    const eq = Q(S, 0, 'the genuine two-step error products span', 0.6) * f1;
    dot(c[0], c[1], 12, 'g', eq); lblG('s', c[0] + 18, c[1] - 10, C.gold, eq, 24, 'left');
    ell73(c[0], c[1], 150, 50, C.mag, eq, 2.4, -0.25, 1); lblG('T = R ∩ s⊥', c[0] - 150, c[1] + 70, C.mag, eq, 20);
    const kq = Q(S, 0, 'exact codes shrink three, two, one', 0.6) * f1;
    plotAxes(1110, 640, 600, 330, kq, 'step n', 'd_R(n) : codes inside R');
    stair118(1160, 640, [3, 2, 1, 1], 100, 80, kq, C.gold, ['0', '1', '2', '3']);
    chip(1410, 730, 740, 58, 'S₂ = ℂP ⊕ B(T) ,  dimension 5', C.mag, eq, 23);
    lbl('recomputed : the span of all two-step error products is 5-dimensional', 1410, 790, C.dim, eq, 15);
  }
  const q = Q(S, 1, 'Mix in a fraction epsilon', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 840, 58, 'Φ_ε = (1 − ε) Φ∘ + ε D ,  D classical at η = 1/2', C.cyan, q, 21);
    const pq = Q(S, 1, 'it becomes quantum primitive', 0.6);
    chip(530, 350, 840, 58, 'Φ_ε⁴(ρ) ≥ (ε⁴/8) I ,   unique ρ_ε ≥ (ε⁴/8) I', C.green, pq, 22);
    const hq = Q(S, 1, 'decays only as one minus epsilon to the n', 0.6);
    chip(530, 430, 840, 58, 'Φ_ε(P − M) = (1 − ε)(P − M)  ⇒  ‖Φ_εⁿ − R‖_◇ ≥ (1 − ε)ⁿ', C.gold, hq, 20);
    lbl('Hermitian Doeblin coefficient of every Φ∘ⁿ is 0 (SDP-checked n ≤ 3)', 530, 490, C.dim, hq, 15);
    const px = 1060, py = 760, pw = 680, ph = 440, xS = n => px + n / 32 * pw, yS = v => py - (v + 7) / 7.5 * ph;
    plotAxes(px, py, pw, ph, hq, 'step n', 'log₁₀ ‖Φ_εⁿ − R_ρε‖_◇  (SDP)');
    const ks = Object.keys(SLOW118), cc = [C.gold, C.cyan, C.mag], dn = ['g', 'c', 'm'];
    ks.forEach((k, j) => { const e = Number(k); curve(p => { const n = p * 32; return [xS(n), yS(n * Math.log10(1 - e))]; }, 40, cc[j], hq * 0.7, 1.6); SLOW118[k].forEach(r => dot(xS(r[0]), yS(lg118(r[1])), 7, dn[j], hq)); const lr = SLOW118[k][SLOW118[k].length - 1]; lblG('ε = ' + k, xS(32) + 8, yS(lg118(lr[1])) + 5, cc[j], hq, 15, 'left'); });
    [0, -2, -4, -6].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, hq, 14, 'right'));
    [0, 16].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, hq, 14));
    lbl('dots : SDP ;  lines : (1 − ε)ⁿ', px + 20, py - 24, C.white, hq, 15, 'left');
    const nq = Q(S, 1, 'no common rate exists', 0.6);
    stamp('NO COMMON RATE', 530, 640, nq, C.red, 34, -0.04);
    lbl('sup over ε of ‖Φ_εⁿ − R_ρε‖_◇ = 1 at every n', 530, 720, C.dim, nq, 16);
  }
};

/* ---- 09 SELECTED FAMILY ---- */
SCENES.family = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'A selected family continues this lift to every eta', 0.6);
  const px = 170, py = 760, pw = 760, ph = 460, xS = x => px + x * pw, yS = v => py - v * ph;
  plotAxes(px, py, pw, ph, q, 'η', 'decay roots of B_η');
  const rq = Q(S, 0, 'its coherence root mu plus reaches one only at one half', 0.6);
  poly118(FAM118.curve.map(r => [r[0], r[1]]), xS, yS, C.gold, rq, 3.2);
  poly118(FAM118.curve.map(r => [r[0], r[2]]), xS, yS, C.cyan, rq * 0.8, 2);
  dashed(px, yS(1), px + pw, yS(1), C.dim, rq, 1.2);
  dot(xS(0.5), yS(1), 11, 'r', rq); lbl('μ₊ = 1 only at η = 1/2', xS(0.5), yS(1) - 18, C.red, rq, 16);
  lblG('μ₊', xS(0.75), yS(FAM118.curve[74][1]) - 16, C.gold, rq, 22); lblG('η', xS(0.62) + 14, yS(0.62) + 22, C.cyan, rq, 22, 'left');
  [0, 0.5].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, q, 14));
  [0, 0.5, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, q, 14, 'right'));
  const uq = Q(S, 1, 'At unit activity mu plus is about zero point nine eight five three', 0.6);
  dot(xS(FAM118.unit[0]), yS(FAM118.unit[1]), 10, 'm', uq); lbl('λ = 1 : μ₊ ≈ 0.98527', xS(FAM118.unit[0]) - 12, yS(FAM118.unit[1]) + 34, C.mag, uq, 16, 'right');
  const f1 = 1 - Q(S, 1, 'The gap one minus mu plus closes quadratically', 0.6);
  if (f1 > 0) {
    const cq = Q(S, 0, 'Its characteristic polynomial factors exactly', 0.6) * f1;
    chip(1400, 290, 760, 56, 'χ(t) = t²⁰ (t − 1)(t + η)(t + c)(t² − ct − 2rc)', C.gold, cq, 21);
    lbl('c = √(η/2) ,  μ± = (c ± √(c² + 8rc)) / 2', 1400, 345, C.dim, cq, 16);
    lbl('recomputed : full 25 × 25 spectrum at 7 values of η', 1400, 375, C.dim, cq, 15);
    const sq = Q(S, 0, 'elsewhere the unique stationary state has rank three', 0.6) * f1;
    chip(1400, 460, 760, 58, 'ρ_η = (r P_u + η P_v + η P_z) / (1 + η)', C.green, sq, 22);
    lbl('rank 3 ,  diag ρ_η = p  (source populations)', 1400, 520, C.white, sq, 17);
    lbl('B_1/2 = Φ∘ exactly ; at 1/2 the fixed space has dimension 2', 1400, 560, C.dim, sq, 15);
    lbl('Jordan : four zero blocks of size 2 , every nonzero mode semisimple', 1400, 590, C.dim, sq, 15);
  }
  const q1 = Q(S, 1, 'The gap one minus mu plus closes quadratically', 0.6, 0.3);
  if (q1 > 0) {
    const gx = 1080, gy = 600, gw = 640, gh = 300, xG = x => gx + (x - 0.3) / 0.4 * gw, yG = v => gy - v / 0.05 * gh;
    plotAxes(gx, gy, gw, gh, q1, 'η', '1 − μ₊   vs   (η − 1/2)²');
    const pts = FAM118.curve.filter(r => r[0] >= 0.3 && r[0] <= 0.7);
    poly118(pts.map(r => [r[0], 1 - r[1]]), xG, yG, C.gold, q1, 3);
    curve(p => { const x = 0.3 + p * 0.4; return [xG(x), yG((x - 0.5) * (x - 0.5))]; }, 40, C.cyan, q1, 2);
    lbl('ratio → 1 :  0.9993 , 1.0007 at η = 1/2 ∓ 0.002', gx + gw / 2, gy + 56, C.white, q1, 15);
    [0.3, 0.5].forEach(v => lbl(String(v), xG(v), gy + 26, C.dim, q1, 14));
    const eq = Q(S, 1, 'every lift decays no faster than eta to the n', 0.6);
    chip(1400, 720, 760, 56, 'every lift :  ‖Φⁿ − R_σ‖_◇ ≥ ηⁿ', C.cyan, eq, 23);
    lbl('classical mode −η of Q_η , eigenvector (r², −r, η, ηr, −η)', 1400, 778, C.dim, eq, 15);
  }
};

/* ---- 10 HEAVY POPULATION ---- */
SCENES.forget = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Population powers are exact', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'If after N steps', 0.6) * f1;
    const cx = 460, cy = 520, R = 230, a0 = 0.75;
    ring(cx, cy, R, C.dim, q, 2); lblG('j', cx, cy - R - 16, C.gold, q, 24);
    const wq = Q(S, 0, 'every state puts weight a above one half on one line', 0.6) * f1;
    const th = Math.acos(2 * a0 - 1);
    ctx.save(); ctx.globalAlpha = wq * 0.3; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(cx + R * Math.sin(th), cy - R * Math.cos(th)); ctx.arc(cx, cy, R, -Math.PI / 2 + th, -Math.PI / 2 - th, true); ctx.closePath(); ctx.fill(); ctx.restore();
    lbl('cap :  Tr(P_j ρ) ≥ a', cx, cy - R * Math.cos(th) + 34, C.gold, wq, 17);
    const dq = Q(S, 0, 'all outputs lie in a cap of diameter four root a one minus a', 0.6) * f1;
    const P1 = [cx - R * Math.sin(th), cy - R * Math.cos(th)], P2 = [cx + R * Math.sin(th), cy - R * Math.cos(th)];
    line(P1[0], P1[1], P2[0], P2[1], C.mag, dq, 3); dot(P1[0], P1[1], 9, 'm', dq); dot(P2[0], P2[1], 9, 'm', dq);
    lblG('√a j ± √(1 − a) k', cx, cy + 60, C.mag, dq, 20);
    lbl('Bloch slice , a = 0.75', cx, cy + R + 36, C.dim, q, 15);
    const px = 1060, py = 560, pw = 680, ph = 280, xS = a => px + (a - 0.5) / 0.5 * pw, yS = v => py - v / 2 * ph;
    plotAxes(px, py, pw, ph, dq, 'a', 'cap diameter (trace norm)');
    curve(p => { const a = 0.5 + p * 0.5; return [xS(a), yS(4 * Math.sqrt(a * (1 - a)))]; }, 60, C.mag, dq, 3);
    lbl('4√(a(1 − a))', xS(0.62), yS(1.1), C.mag, dq, 20);
    [0.5, 0.75].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, dq, 14));
    const cq = Q(S, 0, 'so the channel contracts and forgets', 0.6) * f1;
    chip(1400, 660, 780, 56, '‖Ψⁿ(Y)‖₁ ≤ κ^⌊n/N⌋ ‖Y‖₁ ,  κ = 2√(a(1 − a)) < 1', C.gold, cq, 21);
    lbl('unique stationary density , no faithfulness assumed', 1400, 715, C.white, cq, 16);
    const rq = Q(S, 0, 'against every reference', 0.6) * f1;
    lbl('every complex reference :  ‖Ψⁿ − R_*‖_◇ ≤ min{2 , 2d κ^⌊n/N⌋}', 1400, 750, C.dim, rq, 16);
  }
  const q = Q(S, 1, 'Population powers are exact', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 840, 58, 'Qⁿ = Π + (−η)ⁿ⁻² (Q² − Π) ,  n ≥ 2 ,  Π = 𝟏p', C.cyan, q, 22);
    const aq = Q(S, 1, 'below five minus root seventeen over four', 0.6);
    const px = 170, py = 760, pw = 720, ph = 380, xS = x => px + x * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, aq, 'η', 'p₀ = (1 − η)² / (1 + η)');
    poly118(FORGET118.p0curve, xS, yS, C.green, aq, 3);
    dashed(px, yS(0.5), px + pw, yS(0.5), C.red, aq, 1.6); lbl('1/2', px - 10, yS(0.5) + 5, C.red, aq, 14, 'right');
    dot(xS(FORGET118.alpha), yS(0.5), 10, 'r', aq); dashed(xS(FORGET118.alpha), py, xS(FORGET118.alpha), yS(0.5), C.red, aq, 1.4);
    lbl('α = (5 − √17)/4 ≈ 0.2192', xS(FORGET118.alpha) + 14, yS(0.5) - 24, C.red, aq, 16, 'left');
    fillBox(px, yS(1), xS(FORGET118.alpha) - px, ph, C.green, aq * 0.08);
    [0, 0.5].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, aq, 14));
    const rq = Q(S, 1, 'every lift mixes at an explicit common rate', 0.6);
    const gx = 1060, gy = 760, gw = 680, gh = 380, xG = n => gx + n / 48 * gw, yG = v => gy - (v + 7) / 7.5 * gh;
    plotAxes(gx, gy, gw, gh, rq, 'step n', 'log₁₀ ‖Φⁿ − R_ρΦ‖_◇  (SDP)');
    const kap = FORGET118.kappa;
    curve(p => { const n = p * 48; return [xG(n), yG(Math.log10(Math.min(2, 10 * Math.pow(kap, Math.floor(n / 3)))))]; }, 480, C.gold, rq, 2.5);
    FORGET118.lifts.forEach((L, j) => { poly118(L.map(r => [r[0], lg118(r[1])]), xG, yG, [C.cyan, C.mag, C.green][j], rq * 0.8, 2); L.forEach(r => dot(xG(r[0]), yG(lg118(r[1])), 6, ['c', 'm', 'n'][j], rq)); });
    [0, -3, -6].forEach(v => lbl(String(v), gx - 10, yG(v) + 5, C.dim, rq, 14, 'right'));
    [0, 24].forEach(n => lbl(String(n), xG(n), gy + 26, C.dim, rq, 14));
    lbl('gold : common sufficient bound min{2, 10 κ^⌊n/3⌋}', gx + gw - 10, gy - 150, C.gold, rq, 15, 'right');
    lbl('(below 2 from n = 42)', gx + gw - 10, gy - 124, C.gold, rq, 15, 'right');
    lbl('dots : three random lifts (SDP)', gx + gw - 10, gy - 92, C.cyan, rq, 15, 'right');
    chip(1400, 270, 780, 56, 'η = 0.1 :  k = 1 , N = 3 , a = 0.729 , κ = 0.889', C.gold, rq, 21);
  }
};

/* ---- 11 CLASSIFICATION ---- */
SCENES.classify = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'with horizon twenty-four', 'published'], [1, 'near one half no common bound exists', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Elsewhere every lift has a unique stationary state', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'some lift fails to relax exactly when eta is one half', 0.6) * f1;
    const ax = 200, aw = 1520, ay = 420, xS = e => ax + e * aw;
    line(ax, ay, ax + aw, ay, C.green, q, 6);
    fillBox(xS(0.5) - 3, ay - 3, 6, 6, '#000', q);
    ring(ax, ay, 9, C.dim, q, 2); ring(ax + aw, ay, 9, C.dim, q, 2);
    dot(xS(0.5), ay, 16, 'r', q);
    lbl('0', ax, ay + 40, C.dim, q, 16); lbl('1', ax + aw, ay + 40, C.dim, q, 16); lbl('1/2', xS(0.5), ay + 44, C.red, q, 18);
    lbl('every allowed lift relaxes', xS(0.25), ay - 24, C.green, q, 19); lbl('every allowed lift relaxes', xS(0.75), ay - 24, C.green, q, 19);
    lbl('a nonrelaxing lift exists : Φ∘', xS(0.5), ay - 34, C.red, q, 19);
    const kq = Q(S, 0, 'a pure stationary line beside an orthogonal stationary support', 0.6) * f1;
    chip(W / 2, 580, 1300, 60, 'pure stationary ψ  +  stationary support S ⊥ ψ   ⇒   0 = L_t K w = r √η (1 − β)(1 + ηβ)', C.gold, kq, 21);
    const vq = Q(S, 0, 'to vanish', 0.6) * f1;
    chip(W / 2, 670, 1000, 58, '|ηβ| < 1  ⇒  β = 1  ⇒  r = η = 1/2', C.red, vq, 24);
    lbl('factorization (33.11) recomputed symbolically ; mixed-rank sectors 2 + 2 and 2 + 3 excluded separately', W / 2, 730, C.dim, vq, 15);
    lbl('away from 1/2 : unique stationary state , no peripheral eigenvalue other than 1', W / 2, 775, C.white, vq, 17);
  }
  const q = Q(S, 1, 'Elsewhere every lift has a unique stationary state', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 760, pw = 760, ph = 440, xS = x => px + x * pw, yS = v => py - (v - 0.3) / 0.72 * ph;
    plotAxes(px, py, pw, ph, q, 'η', 'second-largest |eigenvalue| of Φ');
    poly118(FAM118.curve.map(r => [r[0], r[3]]), xS, yS, C.gold, q * 0.9, 2.5);
    dashed(px, yS(1), px + pw, yS(1), C.red, q, 1.4);
    CLS118.worst.forEach(r => dot(xS(r[0]), yS(r[1]), 8, 'c', q));
    lbl('dots : worst of 150 random lifts at each η  (< 1)', px + pw - 10, py - 70, C.cyan, q, 15, 'right');
    lbl('gold : selected family , max(η, μ₊)', px + pw - 10, py - 44, C.gold, q, 15, 'right');
    [0, 0.5].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, q, 14));
    [0.4, 0.7, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, q, 14, 'right'));
    const hq = Q(S, 1, 'with horizon twenty-four', 0.6);
    const gx = 1080, gy = 680, gw = 640, gh = 290, xG = n => gx + n / 24 * gw, yG = v => gy - v / 25 * gh;
    plotAxes(gx, gy, gw, gh, hq, 'n', 'dim H_n = span K_w† K_v');
    [['random', C.cyan, 'c'], ['canonical', C.green, 'n'], ['half', C.mag, 'm']].forEach(([k, col, d]) => { poly118(CLS118.chains[k].map((v, i) => [i, v]), xG, yG, col, hq, 2.4); });
    dashed(gx, yG(25), gx + gw, yG(25), C.dim, hq, 1.2); lbl('25 = dim M₅', gx + gw, yG(25) - 10, C.dim, hq, 14, 'right');
    lbl('random , canonical → 25 ;  Φ∘ (half) stays at 19', gx + gw / 2, gy + 52, C.white, hq, 15);
    [0, 12].forEach(n => lbl(String(n), xG(n), gy + 26, C.dim, hq, 14));
    chip(1400, 270, 760, 56, 'δ(Φ²⁴) ≤ q_K < 1 on compact K ∌ 1/2', C.green, hq, 22);
    lbl('horizon d² − 1 = 24 : Gaubert–Qu , arXiv:1307.4649 , Theorem 7.8', 1400, 325, C.cyan, hq, 15);
    const nq = Q(S, 1, 'near one half no common bound exists', 0.6);
    chip(1400, 790, 760, 54, 'S ∋ η → 1/2 :  sup ‖Φⁿ − R‖_◇ ≥ 1 at every n', C.red, nq, 21);
  }
};

/* ---- 12 RECOVERY WITH LABELS ---- */
SCENES.recover = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The optimal error is zero at one half', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A six-state classical controller tracks a permutation of three letters', 0.6) * f1;
    const cx = 480, cy = 520, R = 200;
    const NM = ['I', 'a', 'ba', 'b²', 'b²a', 'b'];
    const PT6 = NM.map((s, i) => [cx + R * Math.cos(-Math.PI / 2 + TAU * i / 6), cy + R * Math.sin(-Math.PI / 2 + TAU * i / 6)]);
    const ix = s => NM.indexOf(s);
    const TBL = { 'I': ['a', 'b'], 'b': ['b²a', 'b²'], 'b²': ['ba', 'I'], 'a': ['I', 'ba'], 'ba': ['b²', 'b²a'], 'b²a': ['b', 'a'] };
    Object.keys(TBL).forEach(k => { TBL[k].forEach((d, j) => { const A = PT6[ix(k)], B = PT6[ix(d)]; edge118(A, B, 36, j ? C.gold : C.cyan, q * 0.85, null, j ? 18 : -18, 2.2); }); });
    const cur = Math.floor(u * 1.1) % 6;
    PT6.forEach((p, i) => { fillEll118(p[0], p[1], 32, 32, C.vio, q * (i === cur ? 0.5 : 0.18)); ring(p[0], p[1], 32, C.vio, q, 2.2); lblG(NM[i], p[0], p[1] + 8, C.white, q, 22); });
    lbl('label 0', cx - 170, cy + R + 64, C.cyan, q, 17); lbl('label 1', cx + 170, cy + R + 64, C.gold, q, 17);
    lbl('S₃ :  a = (12) ,  b = (021)', cx, cy - R - 52, C.white, q, 17);
    chip(1400, 280, 760, 56, 'measured branches A₀ , A₁ : on the code L_j = U_j D_j', C.white, q, 20);
    const tq = Q(S, 0, 'applies one terminal unitary', 0.6) * f1;
    chip(1400, 360, 760, 56, 'P ← U_j P ,  then W_P = B P† B† + I − BB† once', C.vio, tq, 20);
    const sq = Q(S, 0, 'the leftover error follows a two-term Schur recurrence', 0.6) * f1;
    chip(1400, 450, 760, 58, 'Aₙ₊₁ = a Bₙ ,   Bₙ₊₁ = α Aₙ + γ Bₙ', C.cyan, sq, 24);
    lbl('a = 2√(ηr) ,  α = √(r/2) ,  γ = √(η/2) ;  error E_n(X) = C_n ∘ X', 1400, 505, C.dim, sq, 15);
    const oq = Q(S, 0, 'is optimal against every terminal recovery', 0.6) * f1;
    chip(1400, 590, 760, 56, 'ε_η(n) = x  if x ≥ 2y ,  else 4y² / (4y − x)', C.gold, oq, 21);
    lbl('x = 1 − Aₙ ,  y = 1 − Bₙ', 1400, 645, C.dim, oq, 15);
    lbl('recomputed : SDP over all history-dependent CPTP recoveries matches , n ≤ 3', 1400, 680, C.white, oq, 15);
  }
  const q = Q(S, 1, 'The optimal error is zero at one half', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 760, pw = 780, ph = 440, xS = n => px + n / 30 * pw, yS = v => py - v / 1.45 * ph;
    plotAxes(px, py, pw, ph, q, 'horizon n', 'optimal error ε_η(n)  (unhalved ◇)');
    const ks = Object.keys(REC118), cc = [C.mag, C.gold, C.cyan, C.green];
    ks.forEach((k, j) => { poly118(REC118[k], xS, yS, cc[j], q, 2.8); const L = REC118[k][30]; lblG('η = ' + k, xS(30) + 8, yS(L[1]) + [6, 6, -8, 18][j], cc[j], q, 15, 'left'); });
    const lq = Q(S, 1, 'tends to four thirds elsewhere', 0.6);
    dashed(px, yS(4 / 3), px + pw, yS(4 / 3), C.red, lq, 1.8); lbl('4/3', px - 10, yS(4 / 3) + 5, C.red, lq, 16, 'right');
    [0, 15].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, q, 14));
    [0, 0.5, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, q, 14, 'right'));
    lbl('η = 0.2 , n = 2 :  0.28145 ;  η = 0.8 , n = 2 :  0.24914', px + pw / 2, py + 58, C.dim, q, 15);
    const dq = Q(S, 1, 'requires the visible record to determine the permutation', 0.6);
    chip(1400, 290, 760, 56, 'optimum  ⇔  (seed , record) determines P_h', C.vio, dq, 22);
    lbl('a record may split one class , never merge two', 1400, 345, C.dim, dq, 15);
    const mq = Q(S, 1, 'so the smallest alphabets are one, two, four, then six', 0.6);
    plotAxes(1110, 740, 600, 300, mq, 'horizon n', 'smallest record alphabet');
    stair118(1150, 740, REC118MN, 92, 44, mq, C.vio, ['0', '1', '2', '3', '4']);
    lbl('reached permutations : {I} , {a, b} , {I, ba, ab, b²} , S₃', 1410, 790, C.dim, mq, 15);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Choi, Stinespring, Knill and Laflamme, and the entanglement-breaking criterion are published inputs', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['STEP THREE', 'k₃ = 1', C.gold, 'Exact qubits end at step three'], ['ONE LAW', 'n_EB = 1 , 3 , ∞', C.cyan, 'one law carries indices one, three and infinity'], ['ONE HALF', 'P ⊥ M , E conserved', C.mag, 'one half hides a label that never fades'], ['FORGET', 'η ≠ 1/2 ⇒ relax', C.green, 'every other eta forgets'], ['SIX STATES', 'S₃ , ε → 4/3', C.vio, 'six classical states attain the best recovery']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 280 + i * 340, q = Q(S, 0, ph) * fade; box(x - 150, 240, 300, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 20); });
    lbl('PUBLISHED · Choi (1975) · Stinespring (1955) · Knill–Laflamme (quant-ph/9604034) · Horodecki–Shor–Ruskai (quant-ph/0302031)', W / 2, 470, C.cyan, Q(S, 1, 'are published inputs') * fade, 15);
    lbl('ALSO CITED · Burgarth et al. (1210.5625) · Gaubert–Qu (1307.4649) · Hanson–Rouzé–Stilck França (1902.08173) · Gregoratti–Werner', W / 2, 515, '#8fbcff', Q(S, 1, 'are published inputs', 0.6, 0.4) * fade, 15);
    lbl('VOLUME · eight edges · k₁ ≤ 3 , k₂ ≤ 2 , k₃ = 1 · indices 1 , 3 , ∞ · hidden label at 1/2 · family B_η · interval α · η = 1/2 iff · Schur optimum · 1 , 2 , 4 , 6', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · random lifts · witness determinants · diamond SDPs · spectra of B_η · μ₊ ≈ 0.98527 · α ≈ 0.2192 · recovery SDP · S₃ table', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 690, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr63(W / 2, 380, 200, 0.5 + t * 0.2, a, { bits: true, K: 0 });
    txt('AURIC 5-WINDOW MEMORY I', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 五窗口记忆 第一部 · 三步、二分之一与六个状态 · TRURETURING FILM 118', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Three steps, one half and six states.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC 5-WINDOW I', windows: 'FIVE WINDOWS', edges: 'EIGHT EDGES', third: 'THE THIRD STEP', canon: 'ONE LAW , THREE INDICES', mixing: 'MIXTURES AND ENDPOINTS', half: 'HIDDEN LABEL AT ONE HALF', slow: 'NO COMMON RATE', family: 'SELECTED FAMILY', forget: 'HEAVY POPULATION', classify: 'ONLY ONE HALF', recover: 'SIX-STATE RECOVERY', finale: 'LEDGER' });

function poster118() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr63(470, 520, 300, 2.2, 1, { bits: true, K: 0 });
  txt('k₁ ≤ 3 , k₂ ≤ 2 , k₃ = 1', 1330, 360, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('n_EB = 1 , 3 , ∞ · one law', 1330, 470, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('∃ nonrelaxing lift ⇔ η = 1/2 · |S₃| = 6', 1330, 580, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 五窗口记忆 第一部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC 5-WINDOW MEMORY I', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('三 步 · 二 分 之 一 · 六 个 状 态', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 118', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster118;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
