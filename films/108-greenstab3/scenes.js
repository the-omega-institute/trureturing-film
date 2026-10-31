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

/* ---- film 108: FIB-NATIVE GREEN STABILITY III · CENTRAL NOISE AND THE NEGATIVE LADDER ---- */
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
const _po108 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po108.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po108.set(key, off); }
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
/* ---- film 108 data (from verify108.py / vis108.json) ---- */
const CROSS108 = {"e01": [[-4.0, 4.9996, 5.2453], [-3.8333, 4.8327, 5.0774], [-3.6667, 4.6657, 4.909], [-3.5, 4.4986, 4.74], [-3.3333, 4.3313, 4.5702], [-3.1667, 4.1637, 4.3992], [-3.0, 3.9957, 4.2268], [-2.8333, 3.827, 4.0525], [-2.6667, 3.6574, 3.8756], [-2.5, 3.4865, 3.6956], [-2.3333, 3.3136, 3.5115], [-2.1667, 3.138, 3.3224], [-2.0, 2.9586, 3.1269], [-1.8333, 2.7739, 2.9239], [-1.6667, 2.5819, 2.7119], [-1.5, 2.3807, 2.4896], [-1.3333, 2.1677, 2.2557], [-1.1667, 1.941, 2.0093], [-1.0, 1.699, 1.7499], [-0.8333, 1.441, 1.4777], [-0.6667, 1.1677, 1.1933], [-0.5, 0.8807, 0.8982], [-0.3333, 0.5819, 0.5937], [-0.1667, 0.2739, 0.2818], [0.0, -0.0414, -0.0361]], "e001": [[-4.0, 5.9957, 6.2268], [-3.8333, 5.827, 6.0525], [-3.6667, 5.6574, 5.8756], [-3.5, 5.4865, 5.6956], [-3.3333, 5.3136, 5.5115], [-3.1667, 5.138, 5.3224], [-3.0, 4.9586, 5.1269], [-2.8333, 4.7739, 4.9239], [-2.6667, 4.5819, 4.7119], [-2.5, 4.3807, 4.4896], [-2.3333, 4.1677, 4.2557], [-2.1667, 3.941, 4.0093], [-2.0, 3.699, 3.7499], [-1.8333, 3.441, 3.4777], [-1.6667, 3.1677, 3.1933], [-1.5, 2.8807, 2.8982], [-1.3333, 2.5819, 2.5937], [-1.1667, 2.2739, 2.2818], [-1.0, 1.9586, 1.9639], [-0.8333, 1.638, 1.6416], [-0.6667, 1.3136, 1.316], [-0.5, 0.9865, 0.9881], [-0.3333, 0.6574, 0.6585], [-0.1667, 0.327, 0.3277], [0.0, -0.0043, -0.0038]]};
const PHI108 = [[-1.5708, 1.1264], [-1.5184, 1.1174], [-1.4661, 1.1088], [-1.4137, 1.1006], [-1.3614, 1.0928], [-1.309, 1.0853], [-1.2566, 1.0782], [-1.2043, 1.0715], [-1.1519, 1.0651], [-1.0996, 1.0591], [-1.0472, 1.0534], [-0.9948, 1.048], [-0.9425, 1.0429], [-0.8901, 1.0381], [-0.8378, 1.0337], [-0.7854, 1.0295], [-0.733, 1.0256], [-0.6807, 1.022], [-0.6283, 1.0187], [-0.576, 1.0157], [-0.5236, 1.013], [-0.4712, 1.0105], [-0.4189, 1.0083], [-0.3665, 1.0063], [-0.3142, 1.0046], [-0.2618, 1.0032], [-0.2094, 1.0021], [-0.1571, 1.0012], [-0.1047, 1.0005], [-0.0524, 1.0001], [0.0, 1.0], [0.0524, 1.0001], [0.1047, 1.0005], [0.1571, 1.0012], [0.2094, 1.0021], [0.2618, 1.0032], [0.3142, 1.0046], [0.3665, 1.0063], [0.4189, 1.0083], [0.4712, 1.0105], [0.5236, 1.013], [0.576, 1.0157], [0.6283, 1.0187], [0.6807, 1.022], [0.733, 1.0256], [0.7854, 1.0295], [0.8378, 1.0337], [0.8901, 1.0381], [0.9425, 1.0429], [0.9948, 1.048], [1.0472, 1.0534], [1.0996, 1.0591], [1.1519, 1.0651], [1.2043, 1.0715], [1.2566, 1.0782], [1.309, 1.0853], [1.3614, 1.0928], [1.4137, 1.1006], [1.4661, 1.1088], [1.5184, 1.1174], [1.5708, 1.1264]];
const CAP108 = [[0.0, 0.0, -0.301, -0.6021, -0.4343, 0.3955], [0.039, -0.039, -0.34, -0.7971, -0.4751, 0.3425], [0.078, -0.078, -0.379, -0.9921, -0.5197, 0.2922], [0.117, -0.117, -0.418, -1.1871, -0.5686, 0.2432], [0.156, -0.156, -0.457, -1.3821, -0.622, 0.1949], [0.195, -0.195, -0.496, -1.5771, -0.6804, 0.1465], [0.234, -0.234, -0.535, -1.7721, -0.7444, 0.0977], [0.273, -0.273, -0.574, -1.9671, -0.8143, 0.0482], [0.312, -0.312, -0.613, -2.1621, -0.8908, -0.002], [0.351, -0.351, -0.652, -2.3571, -0.9745, -0.0531], [0.39, -0.39, -0.691, -2.5521, -1.0661, -0.1048], [0.429, -0.429, -0.73, -2.7471, -1.1662, -0.1569], [0.468, -0.468, -0.769, -2.9421, -1.2758, -0.2092], [0.507, -0.507, -0.808, -3.1371, -1.3957, -0.2613], [0.546, -0.546, -0.847, -3.3321, -1.5268, -0.3128], [0.585, -0.585, -0.886, -3.5271, -1.6703, -0.3635], [0.624, -0.624, -0.925, -3.7221, -1.8272, -0.4129], [0.663, -0.663, -0.964, -3.9171, -1.9989, -0.4608], [0.702, -0.702, -1.003, -4.1121, -2.1867, -0.5072], [0.741, -0.741, -1.042, -4.3071, -2.3922, -0.5521], [0.78, -0.78, -1.081, -4.5021, -2.6169, -0.5955], [0.819, -0.819, -1.12, -4.6971, -2.8628, -0.6377], [0.858, -0.858, -1.159, -4.8921, -3.1318, -0.6788], [0.897, -0.897, -1.198, -5.0871, -3.4261, -0.7192], [0.936, -0.936, -1.237, -5.2821, -3.748, -0.759], [0.975, -0.975, -1.276, -5.4771, -4.1001, -0.7985], [1.014, -1.014, -1.315, -5.6721, -4.4854, -0.8377], [1.053, -1.053, -1.354, -5.8671, -4.9068, -0.8768], [1.092, -1.092, -1.393, -6.0621, -5.3678, -0.9159], [1.131, -1.131, -1.432, -6.2571, -5.8722, -0.9549], [1.17, -1.17, -1.471, -6.4521, -6.4239, -0.9939], [1.209, -1.209, -1.51, -6.6471, -7.0275, -1.0329], [1.248, -1.248, -1.549, -6.8421, -7.6878, -1.0719], [1.287, -1.287, -1.588, -7.0371, -8.4101, -1.1109], [1.326, -1.326, -1.627, -7.2321, -9.2003, -1.1499], [1.365, -1.365, -1.666, -7.4271, -10.0647, -1.1889], [1.404, -1.404, -1.705, -7.6222, -11.0104, -1.2279], [1.443, -1.443, -1.744, -7.8172, -12.0449, -1.2669], [1.482, -1.482, -1.783, -8.0122, -13.1766, -1.3059], [1.521, -1.521, -1.822, -8.2072, -14.4147, -1.3449], [1.56, -1.56, -1.8611, -8.4022, -15.769, -1.3839], [1.599, -1.599, -1.9001, -8.5972, -17.2506, -1.4229], [1.638, -1.638, -1.9391, -8.7922, -18.8715, -1.4619], [1.677, -1.677, -1.9781, -8.9872, -20.6446, -1.5009], [1.716, -1.716, -2.0171, -9.1822, -22.5843, -1.5399], [1.755, -1.755, -2.0561, -9.3772, -24.7063, -1.5789], [1.794, -1.794, -2.0951, -9.5722, -27.0276, -1.6179], [1.833, -1.833, -2.1341, -9.7672, -29.5671, -1.6569], [1.872, -1.872, -2.1731, -9.9622, -32.3451, -1.6959], [1.911, -1.911, -2.2121, -10.1572, -35.3842, -1.7349], [1.95, -1.95, -2.2511, -10.3522, -38.7088, -1.7739], [1.989, -1.989, -2.2901, -10.5472, -42.3458, -1.8129], [2.028, -2.028, -2.3291, -10.7422, -46.3245, -1.8519], [2.067, -2.067, -2.3681, -10.9372, -50.677, -1.8909], [2.106, -2.106, -2.4071, -11.1322, -55.4385, -1.9299], [2.145, -2.145, -2.4461, -11.3272, -60.6474, -1.9689], [2.184, -2.184, -2.4851, -11.5222, -66.3457, -2.0079], [2.223, -2.223, -2.5241, -11.7172, -72.5794, -2.0469], [2.262, -2.262, -2.5631, -11.9122, -79.3988, -2.0859], [2.301, -2.301, -2.6021, -12.1072, -86.8589, -2.1249]];
const GAUGE108 = [[0.0, 0.25], [0.025, 0.25], [0.05, 0.25], [0.075, 0.25], [0.1, 0.25], [0.125, 0.25], [0.15, 0.2499], [0.175, 0.2499], [0.2, 0.2498], [0.225, 0.2497], [0.25, 0.2495], [0.275, 0.2493], [0.3, 0.249], [0.325, 0.2486], [0.35, 0.2481], [0.375, 0.2475], [0.4, 0.2468], [0.425, 0.2459], [0.45, 0.2448], [0.475, 0.2436], [0.5, 0.2421], [0.525, 0.2403], [0.55, 0.2383], [0.575, 0.2359], [0.6, 0.2332], [0.625, 0.2301], [0.65, 0.2266], [0.675, 0.2225], [0.7, 0.2179], [0.725, 0.2127], [0.75, 0.2067], [0.775, 0.1999], [0.8, 0.1921], [0.825, 0.1832], [0.85, 0.1728], [0.875, 0.1608], [0.9, 0.1466], [0.925, 0.1294], [0.95, 0.1077], [0.975, 0.0776], [1.0, 0.0]];
const FOUR108 = [[0.4, 0.31788932, 0.65959], [0.3, 0.17932904, 0.66268], [0.2, 0.07986702, 0.66489], [0.15, 0.04495788, 0.66567], [0.1, 0.01999167, 0.66622], [0.07, 0.009798, 0.66645], [0.05, 0.00499948, 0.66656], [0.035, 0.00244987, 0.66661], [0.025, 0.00124997, 0.66664]];
const RANK108 = {"e0": [[4.0, 637], [4.3378, 1007], [4.7042, 1451], [5.1015, 1991], [5.5324, 2663], [5.9996, 3501], [6.5063, 4551], [7.0558, 5883], [7.6517, 7559], [8.298, 9683], [8.9988, 12415], [9.7588, 15881], [10.583, 20293], [11.4768, 25893], [12.4461, 33057], [13.4973, 42197], [14.6372, 53857], [15.8734, 68657], [17.2141, 87613], [18.6679, 111721], [20.2446, 142497], [21.9544, 181761], [23.8086, 233475], [25.8194, 298347], [28.0, 380781]], "e005": [[4.0, 457], [4.3378, 727], [4.7042, 1025], [5.1015, 1381], [5.5324, 1801], [5.9996, 2289], [6.5063, 2851], [7.0558, 3539], [7.6517, 4363], [8.298, 5321], [8.9988, 6475], [9.7588, 7821], [10.583, 9437], [11.4768, 11359], [12.4461, 13615], [13.4973, 16307], [14.6372, 19449], [15.8734, 23171], [17.2141, 27575], [18.6679, 32801], [20.2446, 38919], [21.9544, 46135], [23.8086, 54637], [25.8194, 64641], [28.0, 76407]], "e02": [[4.0, 167], [4.3378, 255], [4.7042, 355], [5.1015, 481], [5.5324, 613], [5.9996, 761], [6.5063, 939], [7.0558, 1141], [7.6517, 1369], [8.298, 1645], [8.9988, 1953], [9.7588, 2323], [10.583, 2767], [11.4768, 3253], [12.4461, 3841], [13.4973, 4533], [14.6372, 5333], [15.8734, 6287], [17.2141, 7403], [18.6679, 8717], [20.2446, 10275], [21.9544, 12079], [23.8086, 14217], [25.8194, 16709], [28.0, 19669]]};
const SEAM108 = [[1278.7484, 2344.2902, 0], [44.865, 49.4568, 1], [81.6389, 88.6585, 0], [10.2082, 16.0616, 1], [86.0185, 100.1688, 0], [101.38, 130.6565, 0], [83.3843, 118.3985, 0], [41.4393, 53.3411, 0], [111.9804, 134.5571, 0], [190.605, 347.5328, 1], [1448.8831, 2718.2963, 0], [151.8369, 165.1056, 0], [142.7712, 174.5084, 0], [231.1662, 340.8819, 0], [172.3712, 196.8031, 0], [1046.553, 2010.4926, 1], [190.746, 316.3298, 1], [93.3465, 114.1066, 0], [469.6215, 832.6609, 1], [145.8603, 168.4384, 0], [177.4602, 305.6117, 1], [18.7166, 24.0401, 0], [84.902, 109.225, 0], [111.2235, 131.8656, 0], [65.5694, 88.4254, 0], [184.9724, 216.9781, 0], [18.5483, 20.9619, 1], [37.3519, 35.9973, 0], [248.4912, 389.6148, 0], [291.5769, 525.5388, 1], [269.6585, 488.4477, 0], [1328.6369, 2536.1925, 1], [19.9777, 31.1019, 0], [394.5957, 649.3873, 0], [127.3849, 195.8377, 0], [17.779, 20.6606, 1], [66.444, 93.9395, 0], [33.0077, 28.5383, 1], [564.4457, 978.5776, 0], [124.2054, 208.215, 1], [940.4516, 1763.4571, 1], [611.5673, 1003.4914, 0], [41.9861, 48.1103, 0], [57.2053, 53.0467, 1], [114.4033, 151.2346, 0], [35.3185, 33.6269, 1], [81.2141, 85.4263, 1], [120.9476, 161.7412, 0], [426.7069, 795.3589, 1], [381.053, 672.1341, 1], [30.7586, 27.9709, 1], [96.9878, 131.221, 0], [21.8127, 22.6292, 1], [20.1466, 27.8117, 1], [51.3575, 72.1456, 0], [23.9695, 30.5587, 0], [1221.1753, 2241.212, 0], [519.9759, 868.4762, 0], [93.1491, 100.8907, 0], [239.543, 422.892, 1], [78.6634, 100.4274, 0], [87.928, 136.6449, 0], [64.9139, 65.7348, 1], [33.0153, 29.7737, 0], [278.6398, 438.3985, 0], [940.2879, 1729.049, 0], [50.7132, 55.0741, 0], [224.4912, 381.9004, 0], [83.2449, 93.8961, 0], [15.5571, 21.8721, 0], [29.0857, 33.4663, 1], [162.9963, 208.7626, 0], [81.7902, 124.6567, 0], [138.2069, 205.1924, 0], [1299.0792, 2440.1627, 0], [115.1659, 157.0233, 0], [68.537, 78.7143, 0], [162.8139, 209.2018, 0], [206.482, 361.3602, 0], [44.9984, 45.901, 1], [51.9831, 66.9995, 0], [545.5142, 920.4095, 1], [1504.6121, 2836.6709, 1], [42.2427, 48.9866, 0], [66.436, 71.2121, 1], [499.1246, 807.3562, 0], [54.37, 65.1744, 0], [75.5444, 109.6456, 0], [102.8195, 149.3654, 0], [40.5711, 47.7946, 0], [84.6547, 122.2997, 0], [112.1929, 178.3783, 0], [453.8006, 795.7552, 1], [91.7016, 114.0826, 0], [117.7084, 131.4304, 0], [317.4317, 543.3249, 0], [84.8794, 130.9051, 0], [5.2351, 15.5006, 1], [175.8733, 330.0219, 1], [144.7871, 178.0497, 0], [41.9835, 50.7039, 0], [26.9312, 25.6215, 0], [613.784, 1141.4746, 0], [113.7343, 192.7615, 1], [98.7794, 144.4495, 0], [26.746, 36.3159, 0], [36.6819, 36.0309, 1], [58.794, 72.5215, 0], [17.2855, 19.9415, 0], [65.996, 68.5731, 0], [81.6953, 107.0605, 0], [694.58, 1306.0068, 0], [683.6985, 1262.2311, 0], [97.5243, 132.4745, 0], [121.7488, 149.7538, 0], [164.4303, 253.5985, 1], [113.2807, 138.3486, 0], [64.6895, 75.3885, 0], [54.6482, 64.9776, 0], [353.8469, 599.7824, 1], [147.4779, 231.0307, 1], [59.75, 87.1418, 0], [74.2149, 107.7073, 0], [133.4998, 201.6589, 1], [50.1822, 71.393, 0], [1538.1795, 2825.4631, 0], [250.9003, 444.3157, 0], [314.9403, 560.975, 1], [119.6287, 138.0419, 0], [57.7415, 65.2307, 0], [64.8732, 66.5949, 1], [1087.5387, 2034.5243, 0], [577.9476, 939.6185, 0], [73.4257, 104.6115, 0], [182.226, 323.386, 0], [1008.4435, 1906.4465, 0], [97.2996, 107.2412, 1], [99.9895, 120.1855, 0], [59.2755, 66.2037, 1], [57.2582, 83.3781, 0], [360.2409, 612.2526, 0], [89.4695, 132.7685, 0], [348.1718, 537.5191, 0], [69.9814, 78.9873, 0], [96.8027, 112.4907, 0], [1077.0957, 2019.2924, 0], [948.6064, 1723.5158, 0], [390.0803, 612.9529, 0], [479.4128, 837.1143, 0], [30.3163, 30.9807, 0], [104.3242, 100.1918, 1], [406.8885, 648.3964, 0], [1128.5602, 2074.9729, 0], [523.717, 921.0476, 1], [86.7259, 108.213, 0], [87.5682, 132.2601, 0], [77.9582, 99.0599, 0], [1230.2053, 2233.064, 0], [106.0703, 136.7176, 0], [32.0694, 29.5405, 1], [243.6621, 336.0648, 0], [94.6484, 107.4636, 0], [42.7897, 46.2485, 0], [86.8469, 116.8349, 0], [52.0277, 73.5063, 0], [120.2727, 159.275, 0], [28.1085, 25.8304, 1], [70.3191, 72.0845, 1], [86.9479, 112.4963, 0], [54.0004, 61.9947, 0], [408.4596, 652.2475, 0], [107.2107, 173.3867, 1], [109.2685, 132.626, 0], [507.6999, 931.0438, 1], [89.1283, 106.6733, 0], [105.5097, 121.9858, 0], [334.8169, 577.5725, 1], [70.6391, 98.8139, 0], [38.0769, 58.0861, 0], [12.6442, 18.661, 0], [120.3139, 160.2747, 0], [1478.4853, 2770.6054, 0], [579.9164, 1080.7966, 1], [47.4881, 47.5856, 1], [1450.2836, 2739.8712, 0], [31.3084, 31.4551, 0], [1417.6126, 2629.4497, 0], [1291.8317, 2376.1256, 0], [35.407, 43.4928, 0], [97.1294, 136.3942, 0], [398.1597, 757.5777, 1], [123.7532, 172.1926, 0], [4.5625, 15.0833, 1], [140.0909, 143.0209, 0], [92.1394, 136.7883, 0], [205.6875, 316.661, 0], [52.8956, 56.6684, 0], [527.8174, 997.8457, 1], [74.5952, 90.6809, 0], [18.1106, 20.9307, 1], [69.1634, 86.7603, 0], [237.8379, 385.9353, 0], [428.8252, 737.4022, 0], [93.3863, 119.2373, 0], [29.2984, 26.1605, 1], [29.047, 42.5922, 0], [1207.6149, 2253.442, 0], [61.7732, 64.501, 1], [20.2531, 24.9767, 0], [18.719, 18.9026, 1], [1440.1518, 2731.5696, 0], [93.4227, 126.4428, 0], [107.5306, 155.4871, 0], [110.0262, 128.4309, 0], [87.671, 119.0984, 0], [32.4293, 34.5571, 1], [422.5621, 718.529, 0], [56.6847, 66.4943, 0], [643.8722, 1138.0759, 0], [96.1658, 126.362, 0], [59.118, 80.7249, 0], [80.1875, 102.8948, 0], [76.3836, 113.7617, 1], [47.4443, 61.2747, 0], [1028.9982, 1892.5883, 0], [156.3729, 263.7086, 0], [1189.6557, 2258.5347, 1], [70.3381, 97.3441, 1], [32.2021, 30.6067, 1], [450.9987, 870.0129, 1], [26.4861, 33.8648, 0], [12.0272, 19.9408, 0], [582.5807, 926.6996, 0], [66.4144, 66.2127, 1], [49.1201, 53.2149, 1], [72.5518, 78.7799, 0], [39.6623, 49.7846, 0], [125.2371, 210.847, 1], [21.62, 23.4767, 1], [73.8429, 76.4917, 1], [29.5847, 30.0936, 1], [62.5405, 78.4484, 0], [29.4769, 34.2937, 0], [45.0324, 54.145, 0], [44.4145, 54.4654, 0], [514.7649, 848.4126, 0], [71.9787, 90.737, 0], [108.4014, 163.0878, 0], [72.3861, 100.1643, 0], [337.9258, 526.4351, 0], [65.4507, 63.0123, 1], [17.3035, 18.4954, 1], [448.9631, 768.3195, 0], [55.8514, 56.5469, 1], [65.5904, 68.3187, 1], [84.7648, 103.2297, 0], [80.3756, 87.9377, 0], [22.5, 40.8654, 0], [26.6466, 38.4076, 0], [546.3451, 985.6115, 0], [105.9363, 175.6318, 1], [47.6421, 60.935, 0], [135.5962, 247.5795, 1], [80.5452, 95.7391, 0], [95.9073, 106.0988, 0], [294.812, 450.6545, 0], [65.9896, 103.0648, 0], [1014.3885, 1921.3124, 0], [475.5778, 837.2161, 0], [739.014, 1432.5557, 1], [44.1013, 71.8187, 0], [51.4546, 71.9377, 0], [82.8683, 123.3672, 0], [563.4828, 945.7706, 0], [284.1863, 525.432, 0], [1555.15, 2878.8187, 0], [89.6288, 101.4897, 0], [82.3788, 94.7907, 1], [714.048, 1329.0676, 0], [82.0794, 115.2035, 0], [12.7762, 19.6386, 1], [64.553, 74.43, 0], [101.5711, 139.5948, 0], [115.5898, 173.9898, 0], [38.0098, 44.4672, 0], [352.2586, 614.0269, 1], [309.9327, 446.1267, 0], [109.6926, 115.7497, 1], [643.4145, 1186.9153, 0], [102.7755, 153.7669, 0], [70.103, 100.4765, 0], [94.1067, 111.2767, 0], [110.3287, 124.9091, 0], [389.8916, 613.8752, 0], [85.4772, 92.4873, 1], [79.7214, 112.3763, 0], [52.4258, 68.9607, 0], [462.686, 759.7514, 0], [167.2978, 203.4931, 0], [19.746, 23.8923, 1], [30.5343, 31.3104, 1], [1333.5578, 2506.5726, 1], [46.1959, 44.8416, 0], [524.8721, 866.0626, 0], [70.2069, 74.9394, 0], [540.5672, 1006.1577, 0], [1040.9044, 1937.3701, 0], [546.2743, 1006.6878, 0], [36.2255, 36.9953, 0], [93.2598, 147.5726, 0], [102.369, 167.2357, 0], [27.0335, 27.1371, 0], [29.7003, 27.9553, 1], [25.2721, 40.4905, 0], [44.4819, 58.9973, 0], [71.1085, 78.7304, 1], [26.779, 25.7234, 1], [61.6604, 66.6371, 1], [1565.0445, 2856.9094, 0], [267.7495, 466.6645, 0]];
const NUM108 = {"lam0": 0.62566, "ratio": 0.6145, "gc": 2.457, "gamc": 3.931, "Et": 0.00998, "mass": 0.01, "pl": 0.6619, "lamI": 109.7, "cst": 0.0524, "Cst": 24.0, "rmin": 0.854, "rmax": 3.761, "A0": 15.0, "frmin": 0.258, "frmax": 0.944, "sl0": 3.02, "sl2": 2.01, "n0": [16.5, 17.3], "n2": [5.9, 7.8]};
const LADDER108 = [-1.0, -0.62, -0.3844, -0.23833, -0.14776, -0.09161, -0.0568, -0.03522, -0.02183, -0.01354, -0.00839, -0.0052, -0.00323];
/* ---- film 108 helpers ---- */
function ell108(cx, cy, rx, ry, col, a, lw = 1.5, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function halo108(cx, cy, r, col, a, n = 7) { if (a <= 0) return; for (let i = n; i >= 1; i--) { ctx.save(); ctx.globalAlpha = a * 0.09 * (n + 1 - i) / n; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx, cy, r * i / n, 0, TAU); ctx.fill(); ctx.restore(); } }
/* the killed cylinder: height interval (vertical) times the phase torus; walls red, pole gold, noise halo cyan */
function cyl108(cx, cy, rx, hh, a, o = {}) {
  if (a <= 0) return;
  const ry = rx * 0.28, top = cy - hh / 2, bot = cy + hh / 2;
  line(cx - rx, top, cx - rx, bot, C.cyan, a * 0.7, 2); line(cx + rx, top, cx + rx, bot, C.cyan, a * 0.7, 2);
  ell108(cx, bot, rx, ry, C.red, a * (o.wall == null ? 0.9 : o.wall), 3); ell108(cx, top, rx, ry, C.red, a * (o.wall == null ? 0.9 : o.wall), 3);
  for (let i = 1; i < 4; i++) ell108(cx, top + i * hh / 4, rx, ry, C.cyan, a * 0.18, 1, 1);
  if (o.seam) { ell108(cx, top + hh * o.seamY, rx, ry, C.gold, a * o.seam, 3.5); }
  const py = top + hh * (o.poleY == null ? 0.42 : o.poleY), px = cx + rx * 0.15;
  if (o.halo) halo108(px, py, o.halo, C.cyan, a);
  dot(px, py, 13, 'g', a);
  if (o.lab !== false) {
    const kl = o.kill ? ' : killed' : '';
    lbl('k = u' + kl, cx + rx + 16, top + 8, C.red, a, 18, 'left'); lbl('k = l' + kl, cx + rx + 16, bot + 8, C.red, a, 18, 'left');
    lbl('o', px + 20, py - 12, C.gold, a, 20, 'left');
  }
  return [px, py];
}
/* a ladder of negative levels climbing to zero */
function ladder108(x, y0, w, hS, a, levels, col = C.gold, prog = 1) {
  if (a <= 0) return;
  line(x - 10, y0, x + w + 10, y0, C.white, a, 2.5); lbl('0', x + w + 24, y0 + 7, C.white, a, 18, 'left');
  levels.forEach((v, j) => { const q = clamp(prog * levels.length - j); if (q <= 0) return; const yy = y0 - v * hS; line(x, yy, x + w, yy, col, a * q, 3); });
  line(x, y0, x, y0 - levels[0] * hS, C.dim, a * 0.6, 1.5); line(x + w, y0, x + w, y0 - levels[0] * hS, C.dim, a * 0.6, 1.5);
}
function emblem108(cx, cy, s, a, t) {
  if (a <= 0) return;
  const hl = 70 + 18 * Math.sin(t * 1.3);
  cyl108(cx - 70 * s, cy, 120 * s, 300 * s, a, { halo: hl * s, lab: false });
  ladder108(cx + 110 * s, cy - 150 * s, 120 * s, 300 * s, a, LADDER108.map(v => v * 0.98), C.gold);
}
function plotLL108(x0, y0, w, h, a, xl, yl, xr, yr, xt, yt) {
  plotAxes(x0, y0, w, h, a, xl, yl);
  const xS = v => x0 + (v - xr[0]) / (xr[1] - xr[0]) * w, yS = v => y0 - (v - yr[0]) / (yr[1] - yr[0]) * h;
  (xt || []).forEach(([v, s]) => { line(xS(v), y0, xS(v), y0 + 6, C.dim, a, 1.2); lbl(s, xS(v), y0 + 26, C.dim, a, 14); });
  (yt || []).forEach(([v, s]) => { line(x0 - 6, yS(v), x0, yS(v), C.dim, a, 1.2); lbl(s, x0 - 10, yS(v) + 5, C.dim, a, 14, 'right'); });
  return [xS, yS];
}
function bump108(cx, cy, w, h, col, a, sh = 0) {
  curve(p => { const x = (p - 0.5) * 2; return [cx + x * w, cy - h * Math.exp(-((x - sh) * (x - sh)) * 4)]; }, 80, col, a, 3);
  line(cx - w, cy, cx + w, cy, C.dim, a * 0.6, 1.2);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  emblem108(470, 470, 1, s0, t);
  const items = [['Part one asked when attraction', 'PART ONE · DOUBLE WALL', 'attraction through the operator’s own Green field', C.gold], ['adds an independent central noise of size epsilon', 'CENTRAL NOISE ν ,  ε = |ν|', 'J = ∫ W¹ dW² + ν C', C.cyan], ['which makes the operator fully elliptic', 'FULLY ELLIPTIC', 'L_ε = −(P² + Q² + ε² Z_c²)', C.mag], ['follows what survives as the noise is removed', 'ε → 0', 'what survives ?', C.green]];
  items.forEach(([ph, hd, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(hd, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, i === 0 ? 24 : 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  emblem108(W / 2, 400, 0.9, rp, t);
  chip(330, 330, 330, 58, 'each ε : stable', C.green, rp, 22); chip(330, 415, 330, 58, 'ε → 0 : −1/ε²', C.red, rp, 22); chip(330, 500, 330, 58, 'one threshold g_c', C.gold, rp, 22);
  box(1420, 320, 380, 200, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('negative ladder', 1610, 380, C.cyan, rp, 22); lblG('λₙ ↑ 0', 1610, 440, C.white, rp, 30); lblG('N(t) ≳ log(1/t)', 1610, 490, C.gold, rp, 22);
  txt(scramble('GREEN STABILITY III · RUNG', rp, 108), W / 2, 740, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('FIB 原 生 Green 稳 定 性 第 三 部 · 中 心 噪 声 与 负 谱 阶 梯', W / 2, 815, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 108 · FIB_NATIVE_CENTRAL_NOISE_GREEN_STABILITY §1–§35 · CONTINUATION_I §1–§6', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 NOISE ---- */
SCENES.noise = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Near the pole an exact Heisenberg chart', 0.6);
  if (f1 > 0) {
    const cq = Q(S, 0, 'Keep the double-wall source of part one', 0.6) * f1, wq = Q(S, 0, 'killed at two height walls', 0.6);
    const nq = Q(S, 0, 'A central noise nu enters the area', 0.6);
    cyl108(400, 500, 190, 380, cq, { halo: nq * (60 + 10 * Math.sin(t * 2)), wall: 0.35 + 0.65 * wq, kill: wq > 0.5 });
    lbl('Ω = (l, u) × T² ,  dμ = dk dα dβ', 400, 800, C.dim, cq, 18);
    chip(1330, 270, 860, 58, 'J_t = ∫₀ᵗ W¹ dW² + ν C_t ,   three covariance-2 Brownian motions', C.cyan, nq * f1, 20);
    const eq = Q(S, 0, 'its size epsilon makes the generator elliptic', 0.6) * f1;
    chip(1330, 350, 860, 58, 'L_ε = −(P² + Q² + ε² Z_c²) ,   P = ∂_k ,  Z_c = −r⁻¹ ∂_β', C.mag, eq, 21);
    lbl('Q = ½∂_α + c(k)∂_β ,  c(k) = ½ − k/r ;  frame (P, Q, εZ_c) spans every tangent space for ε > 0', 1330, 405, C.dim, eq, 15);
    const gq = Q(S, 0, 'The unit-source Green field has mass', 0.6) * f1;
    chip(1330, 485, 860, 62, '∫ Γ_ε,o dμ = (kₒ − l)(u − kₒ)/2 ,   Γ_ε,o = ∫₀^∞ p_ε(t, o, ·) dt', C.gold, gq, 21);
    box(910, 545, 840, 230, C.gold, gq, 1.5, 'rgba(30,20,0,0.35)');
    lbl('recomputed at  I = (0.05, 0.35) ,  kₒ = 0.15 :', 1330, 585, C.gold, gq, 17);
    lblG('mean exit time (40 000 paths) ' + NUM108.Et.toFixed(5) + '  vs  ' + NUM108.mass.toFixed(5), 1330, 630, C.white, gq, 20);
    lblG('survival rate 109.4  vs  λ_I = π²/(u − l)² = ' + NUM108.lamI.toFixed(1), 1330, 675, C.white, gq, 20);
    lbl('no time cutoff · no survival normalization · same clock e^(−t L_ε)', 1330, 735, C.dim, gq, 15);
  }
  const q1 = Q(S, 1, 'Near the pole an exact Heisenberg chart', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 270, 800, 56, 'x = k − kₒ ,  y = 2(α − αₒ) ,  θ = z − xy/2', C.cyan, q1, 21);
    chip(530, 345, 800, 56, 'U = ∂ₓ − (y/2)∂_θ ,  V = ∂_y + (x/2)∂_θ ,  Z_H = ∂_θ', C.cyan, q1, 21);
    lbl('(P, Q, Z_c) = (U, V, Z_H) exactly ;  [U, V] = Z_H', 530, 405, C.dim, q1, 17);
    const dq = Q(S, 1, 'carries density one over two r', 0.6);
    chip(530, 470, 800, 58, 'dμ = m₀ dξ ,   m₀ = 1/(2r)', C.gold, dq, 24);
    lbl('deck action (x, y, z) ↦ (x, y + 4πn, z + 4πr c(kₒ) n − 2πr m)', 530, 530, C.dim, dq, 15);
    const fq = Q(S, 1, 'There the field is comparable', 0.6);
    chip(530, 610, 800, 62, 'Γ_ε,o ≍ 1 / (m₀ d (ε + d))', C.white, fq, 28);
    lbl('heat on the diagonal : (m₀ ε t^(3/2))⁻¹  →  (m₀ t²)⁻¹ ;  d = d_ε(0, ξ)', 530, 670, C.dim, fq, 15);
    lbl('uniform heat bounds : Capogna–Citti–Manfredini , arXiv:1212.6665', 530, 705, C.cyan, fq, 15);
    const [xS, yS] = plotLL108(1060, 760, 680, 440, fq, 'log₁₀ d', 'log₁₀ of the field scale', [-4, 0], [-0.5, 6.5], [[-4, '−4'], [-3, '−3'], [-2, '−2'], [-1, '−1'], [0, '0']], [[0, '0'], [2, '2'], [4, '4'], [6, '6']]);
    [['e01', C.cyan, 'ε = 0.1'], ['e001', C.gold, 'ε = 0.01']].forEach(([k, col, lab], j) => {
      const arr = CROSS108[k];
      curve(p => { const i = Math.min(arr.length - 1, Math.floor(p * (arr.length - 1))); const f = p * (arr.length - 1) - i, A = arr[i], B = arr[Math.min(arr.length - 1, i + 1)]; return [xS(A[0] + (B[0] - A[0]) * f), yS(A[1] + (B[1] - A[1]) * f)]; }, 96, col, fq, 3);
      arr.forEach((r, i) => { if (i % 2 === 0) dot(xS(r[0]), yS(r[2]), 6, j ? 'g' : 'c', fq); });
      lblG(lab, 1720, j ? 330 : 365, col, fq, 17, 'right');
      dashed(xS(Math.log10(j ? 0.01 : 0.1)), 760, xS(Math.log10(j ? 0.01 : 0.1)), yS(2.6), col, fq * 0.5, 1.2);
      lblG('d = ε', xS(Math.log10(j ? 0.01 : 0.1)), yS(2.6) - 10, col, fq * 0.8, 14);
    });
    lbl('curves 1/(d(ε+d)) ; dots : the heat integral (3.5)', 1080, 712, C.dim, fq, 14, 'left');
    lbl('ratio stays in [1.000, 1.771]', 1080, 736, C.dim, fq, 14, 'left');
    const cq = Q(S, 1, 'a Coulomb law below the noise scale', 0.6);
    lbl('slope −1 : Coulomb', xS(-3.95), yS(3.25), C.mag, cq, 17, 'left');
    const iq = Q(S, 1, 'an inverse-square law above it', 0.6);
    lbl('slope −2 : inverse square', xS(0), yS(4.2), C.green, iq, 17, 'right');
  }
};

/* ---- 03 RATE ---- */
SCENES.rate = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Removing the noise is different', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'At each fixed noise the attractive form', 0.6) * f1;
    chip(W / 2, 260, 1300, 62, 'q_ε,g = T_ε − g V_ε ,   T_ε = ‖Pf‖² + ‖Qf‖² + ε²‖Z_c f‖² ,   V_ε[f] = ∫ Γ_ε,o |f|² dμ', C.white, q, 21);
    const cq = Q(S, 0, 'is closed on the free domain for every coupling', 0.6) * f1;
    const mq = Q(S, 0, 'with compact resolvent and an attained minimum', 0.6) * f1;
    [['CLOSED ON F_ε', cq, C.cyan], ['EVERY g > 0', cq, C.gold], ['COMPACT RESOLVENT', mq, C.mag], ['MINIMUM ATTAINED', mq, C.green]].forEach(([s, qq, col], i) => { const x = 150 + i * 410; box(x, 340, 380, 90, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(s, x + 190, 395, col, qq, 22); });
    lblG('E_ε(g) = min q_ε,g[f] over ‖f‖₂ = 1 , finite and attained', W / 2, 480, C.white, mq, 22);
    const kq = Q(S, 0, 'The key bound is C over epsilon root a', 0.6) * f1;
    chip(540, 580, 860, 62, '‖(L_ε + a)⁻¹ Γ_ε,o‖∞ ≤ C/(ε√a) ,   a ≥ ε⁻²', C.gold, kq, 23);
    lblG('⇒  V_ε[f] ≤ K(a)(T_ε[f] + a‖f‖²) ,  K(a) → 0  ⇒  KLMN', 540, 645, C.white, kq, 19);
    lbl('KLMN : Teschl , Mathematical Methods in Quantum Mechanics , Theorem 6.24', 540, 690, C.cyan, kq, 15);
    lbl('model kernel recomputed : K(a) ε √a stays in [1.73, 3.45] for a ≥ ε⁻²', 540, 725, C.dim, kq, 15);
    const gx = 1080, gy = 640, gw = 640;
    box(gx, gy - 70, gw, 150, C.cyan, kq, 1.5, 'rgba(0,20,30,0.35)');
    lbl('relative form bound g K(a) as a grows', gx + gw / 2, gy - 40, C.cyan, kq, 16);
    const kv = 1.6 / (1 + 0.9 * (0.5 + 0.5 * Math.sin(t * 0.8)) * 4);
    line(gx + 30, gy + 20, gx + gw - 30, gy + 20, C.dim, kq, 2); const thx = gx + 30 + (gw - 60) * 0.55;
    line(thx, gy - 10, thx, gy + 50, C.red, kq, 3); lbl('1', thx, gy + 72, C.red, kq, 16);
    dot(gx + 30 + (gw - 60) * 0.55 * kv, gy + 20, 11, 'g', kq);
  }
  const q1 = Q(S, 1, 'Removing the noise is different', 0.6, 0.3);
  if (q1 > 0) {
    const hq = Q(S, 1, 'Above the horizontal coupling g-c', 0.6);
    chip(530, 270, 800, 62, 'g_c = 2π m₀ λ₀ = π λ₀ / r', C.gold, hq, 26);
    lblG('recomputed : λ₀ = ' + NUM108.lam0.toFixed(5) + ' ;  r = 0.8  ⇒  g_c = ' + NUM108.gc.toFixed(3), 530, 335, C.white, hq, 19);
    lbl('λ₀ : lowest angular eigenvalue of the horizontal Hardy problem (variable-coefficient volume)', 530, 370, C.dim, hq, 14);
    const bq = Q(S, 1, 'the minimum lies between two negative multiples', 0.6);
    chip(530, 470, 800, 66, '−C_g/ε²  ≤  E_ε(g)  ≤  −c_g/ε²  <  0', C.red, bq, 28);
    lbl('every fixed g > g_c , every pole and preparation , 0 < ε < ε_g , either sign of ν', 530, 530, C.dim, bq, 15);
    lbl('test state : annular witness v at scale s = ε/κ in the Heisenberg chart', 530, 565, C.dim, bq, 15);
    const sq = Q(S, 1, 'yet not uniformly stable', 0.6);
    stamp('NOT UNIFORMLY STABLE', 530, 680, sq, C.red, 32, -0.04);
    const px = 1060, py = 760, pw = 680, ph = 460, xS = e => px + (e - 0.06) / 0.94 * pw, yS = v => py - (v + 160) / 165 * ph;
    plotAxes(px, py, pw, ph, q1, 'ε', 'E_ε(g) , g > g_c');
    line(px, yS(0), px + pw, yS(0), C.dim, q1 * 0.5, 1);
    lbl('0', px - 10, yS(0) + 5, C.dim, q1, 14, 'right');
    const lo = e => Math.max(-160, -1.0 / (e * e)), hi = e => -0.3 / (e * e);
    const band = []; for (let i = 0; i <= 60; i++) { const e = 0.08 + i / 60 * 0.92; band.push([xS(e), yS(hi(e))]); } for (let i = 60; i >= 0; i--) { const e = 0.08 + i / 60 * 0.92; band.push([xS(e), yS(lo(e))]); }
    fillPoly(band, C.red, q1 * 0.16);
    curve(p => { const e = 0.08 + p * 0.92; return [xS(e), yS(lo(e))]; }, 80, C.red, q1 * 0.8, 2);
    curve(p => { const e = 0.08 + p * 0.92; return [xS(e), yS(hi(e))]; }, 80, C.red, q1 * 0.8, 2);
    curve(p => { const e = 0.08 + p * 0.92; return [xS(e), yS(Math.max(-160, -0.55 / (e * e) + 0.2))]; }, 80, C.gold, bq, 3.5);
    lblG('band : between −C/ε² and −c/ε²', px + pw, 470, C.red, q1, 17, 'right'); lblG('gold : E_ε(g)', px + pw, 500, C.gold, bq, 17, 'right');
    lbl('illustrative envelope', px + pw, 530, C.dim, q1, 14, 'right');
    [0.25, 0.5, 0.75, 1].forEach(e => lbl(String(e), xS(e), py + 26, C.dim, q1, 14));
  }
};

/* ---- 04 COTTON ---- */
SCENES.cotton = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'But that metric is Nil geometry', 0.6);
  const q0 = Q(S, 0, 'Could a flat three-dimensional readout', 0.6);
  if (f1 > 0) {
    const q = q0 * f1;
    cyl108(300, 420, 110, 240, q, { halo: 40, lab: false });
    ell108(330, 400, 55, 40, C.gold, q, 2.5, 1); lbl('U ⊂ Ω', 330, 478, C.gold, q, 18);
    arrow(450, 420, 620, 420, C.white, q, 3); lbl('F', 535, 400, C.white, q, 24);
    for (let i = 0; i <= 6; i++) { line(660 + i * 40, 300, 660 + i * 40, 540, C.cyan, q * 0.45, 1); line(660, 300 + i * 40, 900, 300 + i * 40, C.cyan, q * 0.45, 1); }
    box(660, 300, 240, 240, C.cyan, q, 2); lbl('V ⊂ ℝ³ , constant D', 780, 580, C.cyan, q, 17);
    const mq = Q(S, 0, 'A constant-diffusion match', 0.6) * f1;
    chip(1330, 270, 860, 60, '(a G_ε + B)(f∘F) = (A_D,b f)∘F   for every test f', C.white, mq, 22);
    const rq = Q(S, 0, 'even with a positive retiming factor and arbitrary drifts', 0.6) * f1;
    lbl('a > 0 smooth retiming , B and b arbitrary drifts , no rank assumption on F', 1330, 330, C.dim, rq, 15);
    const cq = Q(S, 0, 'forces the kinetic metric to be conformally flat', 0.6) * f1;
    chip(1330, 410, 860, 60, 'a dF A_ε dFᵀ = D   ⇒   F*(D⁻¹) = a⁻¹ g_ε', C.gold, cq, 23);
    lbl('g_ε would be conformally flat on U', 1330, 470, C.gold, cq, 18);
    chip(1330, 570, 860, 60, 'g_ε = dx² + dy² + ε⁻²(dθ + y dx/2 − x dy/2)²', C.cyan, q, 22);
    lbl('orthonormal frame E₁ = P , E₂ = Q , E₃ = εZ_c ;  [E₁, E₂] = h E₃ ,  h = 1/ε', 1330, 630, C.dim, q, 16);
    chip(530, 680, 800, 56, 'chain rule at a critical point : D = a dF A_ε dFᵀ', C.white, cq, 20);
  }
  const q1 = Q(S, 1, 'But that metric is Nil geometry', 0.6, 0.3);
  if (q1 > 0) {
    const rows = [['R(E₁, E₂)E₂ = −(3h²/4) E₁', C.cyan], ['R(E₁, E₃)E₃ = (h²/4) E₁', C.cyan], ['Ric = diag(−h²/2 , −h²/2 , h²/2)', C.vio], ['Scal = −h²/2', C.vio], ['S = Ric − (Scal/4) g = diag(−3 , −3 , 5) h²/8', C.mag]];
    rows.forEach(([s, col], i) => { const qq = clamp(q1 * 1.6 - i / 6); lblG(s, 1360, 275 + i * 52, col, qq, 22); });
    const cq = Q(S, 1, 'its Cotton tensor is minus epsilon to the minus three', 0.6);
    chip(1360, 560, 760, 74, 'C(E₁, E₂, E₃) = −h³ = −ε⁻³', C.gold, cq, 32);
    const nq = Q(S, 1, 'never zero', 0.6);
    stamp('NOT CONFORMALLY FLAT', 1360, 680, nq, C.red, 30, -0.04);
    lbl('recomputed symbolically ; conformal criterion : García–Hehl–Heinicke–Macías , gr-qc/0309008', 1360, 760, C.cyan, nq, 14);
    const dq = Q(S, 1, 'So no exact Euclidean distance readout exists', 0.6);
    box(150, 270, 760, 200, C.green, dq, 2, 'rgba(0,30,15,0.35)');
    lbl('Corollary 9.3', 530, 310, C.green, dq, 20);
    lblG('no F , D with  d(q, q′) = ‖F(q′) − F(q)‖ in D⁻¹', 530, 365, C.white, dq, 21);
    lbl('for every close pair , also with any smooth retiming a', 530, 410, C.dim, dq, 16);
    const aq = Q(S, 1, 'an all-start killed response on the same clock', 0.6);
    box(150, 500, 760, 230, C.mag, aq, 2, 'rgba(40,0,40,0.3)');
    lbl('Theorem 10.2', 530, 540, C.mag, aq, 20);
    lblG('H_t(f∘F)(q) = S_t f(F(q)) on U , 0 < t < t*', 530, 595, C.white, aq, 21);
    lblG('⇒  G_ε(f∘F) = (A_D,b f)∘F : the excluded case', 530, 645, C.white, aq, 21);
    lbl('localize at each start , differentiate at t = 0 , same killed clock', 530, 695, C.dim, aq, 15);
  }
};

/* ---- 05 CAP ---- */
SCENES.cap = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'With a field cap B', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Command tracking transfers bounded occupation', 0.6) * f1;
    const tx = 150, ty = 300;
    curve(p => [tx + p * 700, ty + 120 + 60 * Math.sin(p * 7) + 30 * Math.sin(p * 17)], 120, C.cyan, q, 3);
    curve(p => [tx + p * 700, ty + 120 + 60 * Math.sin(p * 7) + 30 * Math.sin(p * 17) + 10 * Math.sin(p * 41 + t)], 160, C.gold, q, 2);
    lbl('target path q̄', tx, ty, C.cyan, q, 16, 'left'); lbl('tracked command q̄_N', tx + 220, ty, C.gold, q, 16, 'left');
    chip(1330, 280, 860, 58, '|E∫ F(q̄_N) dt − E∫ F(q̄) dt| ≤ T ω_F(η) + M d_η', C.cyan, q, 22);
    lbl('ideal-history supplier ; the paid supplier adds 2MTδ', 1330, 335, C.dim, q, 15);
    const lq = Q(S, 0, 'in the limit the full Green occupation', 0.6) * f1;
    chip(1330, 410, 860, 58, 'η → 0 , then T → ∞ :   E_o ∫₀^τ F(q_t) dt = ∫ Γ_ε,o F dμ', C.gold, lq, 21);
    const pq = Q(S, 0, 'Path convergence alone cannot carry the singular field', 0.6) * f1;
    const ox = 330, oy = 640;
    halo108(ox, oy, 70, C.red, pq); dot(ox, oy, 14, 'r', pq); lblG('o :  Γ_ε,o(o) = +∞', ox, oy + 60, C.red, pq, 19);
    curve(p => [ox + p * 520, oy - p * p * 110], 60, C.white, pq, 3); lbl('hold hₙ > 0 , then a lawful command', ox + 330, oy + 60, C.white, pq, 16);
    ring(ox, oy, 26 + 6 * Math.sin(t * 4), C.gold, pq, 2.5);
    const iq = Q(S, 0, 'makes the uncapped occupation infinite', 0.6) * f1;
    stamp('INFINITE', 1110, 545, iq, C.red, 30, -0.04);
    lblG('uncapped occupation ∫ Γ_ε,o(q̄ₙ) dt = +∞ for every n', 1330, 615, C.red, iq, 18);
    const sq = Q(S, 0, 'although the field is square integrable', 0.6) * f1;
    chip(1330, 690, 860, 58, 'E_o ∫₀^τ Γ_ε,o(q_t) dt = ∫ Γ_ε,o² dμ < ∞   (Proposition 7.1)', C.green, sq, 20);
  }
  const q1 = Q(S, 1, 'With a field cap B', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 270, 800, 56, 'V_B = min(Γ_ε,o , B) ,   W_NB = e^(g A_NB) ,   A_NB = ∫ V_B(q̄_N) dt', C.cyan, q1, 19);
    const fq = Q(S, 1, 'approaches the exact Feynman–Kac response at the pole', 0.6);
    chip(530, 350, 800, 60, 'R(f) = E_o[e^(gA) f(q†(T))] = (e^(−T H) f)(o)', C.white, fq, 22);
    lblG('E|W_NB − W| + sup |R_NB − R| ≤ C[1/B + B²η + B e_η + √δ + δ e^(gBT)]', 530, 415, C.gold, fq, 17);
    lbl('H : the form operator of q_ε,g ; canonical pole value ; all failed outcomes kept', 530, 450, C.dim, fq, 14);
    lbl('Feynman–Kac and Khas’minskii : Güneysu , arXiv:1109.0151', 530, 478, C.cyan, fq, 14);
    const eq = Q(S, 1, 'Taking eta equal to c over B cubed', 0.6);
    chip(530, 545, 800, 58, 'η = c B⁻³ ,    δ = e^(−(gT+1)B)', C.gold, eq, 24);
    const oq = Q(S, 1, 'gives error of order one over B', 0.6);
    lblG('error = O(1/B) ,   B²η = c/B ,  δ e^(gBT) = e^(−B)', 530, 605, C.white, oq, 19);
    const rq = Q(S, 1, 'with order B to the seventh reads', 0.6);
    chip(530, 685, 800, 58, 'M = O(B⁷) ,   E V = O(B³ + ε²B⁶) ,   E E = O(B⁶ + ε⁴B¹²)', C.mag, rq, 20);
    const [xS, yS] = plotLL108(1060, 760, 680, 440, oq, 'log₁₀ B', 'log₁₀ error term', [0, 2.3], [-6, 0.3], [[0, '0'], [1, '1'], [2, '2']], [[0, '0'], [-2, '−2'], [-4, '−4'], [-6, '−6']]);
    const cols = [C.gold, C.cyan, C.mag, C.red, C.white], labs = ['1/B', 'B²η = c/B', 'B e_η ~ B⁻⁵', '√δ , δe^(gBT)', 'sum'];
    [1, 2, 3, 4, 5].forEach((k, j) => {
      const pts = CAP108.filter(r => r[k] > -6);
      curve(p => { const i = Math.min(pts.length - 1, Math.floor(p * (pts.length - 1))); return [xS(pts[i][0]), yS(pts[i][k])]; }, pts.length - 1, cols[j], oq, k === 5 ? 4 : 2.5);
      lblG(labs[j], 1720, 590 + j * 26, cols[j], oq, 15, 'right');
    });
    lbl('unit constants , c = 0.5 , gT = 1', 1720, 565, C.dim, oq, 14, 'right');
  }
};

/* ---- 06 COEFF ---- */
SCENES.coeff = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'So the native energy is uniformly bounded below', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Zoom into the pole at scale epsilon', 0.6) * f1;
    const p = cyl108(250, 480, 110, 300, q, { halo: 30, lab: false });
    const zx = 560, zy = 480, zs = 150 + 20 * Math.sin(t * 1.2);
    if (p) { box(p[0] - 20, p[1] - 20, 40, 40, C.gold, q, 2); line(p[0] + 20, p[1] - 20, zx - zs, zy - zs, C.gold, q * 0.6, 1.5); line(p[0] + 20, p[1] + 20, zx - zs, zy + zs, C.gold, q * 0.6, 1.5); }
    box(zx - zs, zy - zs, 2 * zs, 2 * zs, C.gold, q, 2, 'rgba(30,20,0,0.3)');
    for (let i = 1; i <= 3; i++) ell108(zx, zy, zs * 0.28 * i, zs * 0.12 * i * i * 0.35 + 6, C.cyan, q * 0.7, 1.5);
    dot(zx, zy, 10, 'g', q);
    lblG('δ_ε(x, y, θ) = (εx, εy, ε²θ)', 560, 690, C.gold, q, 20);
    const uq = Q(S, 0, 'converges to the bottom e of one unit-noise problem', 0.6) * f1;
    chip(1330, 300, 860, 60, 'Q_γ[u] = T₁[u] − γ ∫ G₁ |u|² dξ   on the whole group', C.cyan, uq, 22);
    lblG('T₁ = ‖Uu‖² + ‖Vu‖² + ‖Z_H u‖² ,  e(γ) = inf Q_γ over ‖u‖₂ = 1 ,  −∞ < e(γ) ≤ 0', 1330, 360, C.dim, uq, 16);
    const cq = Q(S, 0, 'at coupling two r g', 0.6) * f1;
    chip(1330, 470, 860, 66, 'ε² E_ε(g)  →  e(g/m₀) = e(2rg)', C.gold, cq, 28);
    const bq = Q(S, 0, 'with a bounded lower remainder', 0.6) * f1;
    chip(1330, 590, 860, 60, 'E_ε(g) ≥ ε⁻² e(2rg) − C_g ,   0 < ε ≤ ε₀', C.white, bq, 24);
    lbl('IMS localization on the actual fields P, Q, Z_c ; full killed periodic remainder kept', 1330, 650, C.dim, bq, 15);
  }
  const q1 = Q(S, 1, 'So the native energy is uniformly bounded below', 0.6, 0.3);
  if (q1 > 0) {
    chip(W / 2, 260, 1400, 60, 'inf over 0 < ε ≤ ε₀ of E_ε(g) > −∞   ⟺   g ≤ g* = Λ*/(2r)', C.white, q1, 24);
    const iq = Q(S, 1, 'identifies g-star with g-c', 0.6);
    lblG('Λ* = 2πλ₀ ,  g* = g_c   (boundary-response volume , Theorem 9.3)', W / 2, 322, C.gold, iq, 19);
    const px = 150, py = 700, pw = 760, ph = 300, xS = a => px + (a + Math.PI / 2) / Math.PI * pw, yS = v => py - (v - 0.95) / 0.2 * ph;
    plotAxes(px, py, pw, ph, iq, '', 'φ(a)'); lbl('angle a', px + pw / 2, py + 52, C.dim, iq, 15);
    curve(p => { const i = Math.min(PHI108.length - 1, Math.round(p * (PHI108.length - 1))); return [xS(PHI108[i][0]), yS(PHI108[i][1])]; }, PHI108.length - 1, C.gold, iq, 3.5);
    PHI108.forEach((r, i) => { if (i % 5 === 0) dot(xS(r[0]), yS(r[1]), 6, 'g', iq); });
    [[-Math.PI / 2, '−π/2'], [0, '0'], [Math.PI / 2, 'π/2']].forEach(([v, s]) => lblG(s, xS(v), py + 28, C.dim, iq, 15));
    [[1, '1'], [1.1, '1.1']].forEach(([v, s]) => lbl(s, px - 12, yS(v) + 5, C.dim, iq, 14, 'right'));
    lblG('S φ = −4(cos a · φ′)′ + cos a · φ = λ₀ φ ,  λ₀ = ' + NUM108.lam0.toFixed(5), px + pw / 2, 395, C.white, iq, 18);
    lbl('recomputed by finite elements and zero-flux shooting', px + pw / 2, 422, C.dim, iq, 14);
    const gx = 1060, gy = 700, gw = 680, gh = 300, xG = g => gx + g / 8 * gw, yG = v => gy - (v + 2.2) / 2.5 * gh;
    plotAxes(gx, gy, gw, gh, q1, 'γ = g/m₀', 'e(γ)');
    const gc = NUM108.gamc;
    line(gx, yG(0), gx + gw, yG(0), C.dim, q1 * 0.5, 1);
    curve(p => { const g = p * 8; return [xG(g), yG(g <= gc ? 0 : -0.16 * Math.pow(g - gc, 1.7))]; }, 120, C.cyan, q1, 3.5);
    dashed(xG(gc), gy, xG(gc), gy - gh, C.gold, iq, 1.5); lblG('γ_c = 2πλ₀', xG(gc), gy + 28, C.gold, iq, 16);
    lbl('bounded below', xG(1.8), yG(0) - 16, C.green, q1, 16);
    const nq = Q(S, 1, 'Above it the bottom is negative', 0.6);
    lbl('e < 0', xG(5.2), yG(-1.6), C.red, nq, 18);
    lbl('illustrative shape', gx + gw, gy - gh - 10, C.dim, q1, 14, 'right');
    const cq = Q(S, 1, 'near-minimizers concentrate at the pole', 0.6);
    lbl('g > g* : mass outside any fixed neighbourhood of o → 0  (Corollary 16.4)', W / 2, 770, C.mag, cq, 18);
  }
};

/* ---- 07 OCCUPY ---- */
SCENES.occupy = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The coefficient comes from the gauge ball', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The self-field occupation', 0.6) * f1;
    chip(530, 280, 820, 62, 'J_ε = E_o ∫₀^τ Γ_ε,o(q_t) dt = ∫ Γ_ε,o² dμ', C.cyan, q, 24);
    const fq = Q(S, 0, 'is finite at each noise', 0.6) * f1;
    lblG('J_ε < ∞ for every ε > 0 : Γ ≍ 1/(ε d) near o in three dimensions', 530, 345, C.white, fq, 18);
    const cq = Q(S, 0, 'with coefficient one over eight m-zero', 0.6) * f1;
    chip(530, 450, 820, 70, 'J_ε / log(1/ε)  →  1/(8m₀) = r/4', C.gold, cq, 32);
    const rq = Q(S, 0, 'which is r over four', 0.6) * f1;
    lbl('independent of the pole , the walls and the preparation phases', 530, 520, C.dim, rq, 16);
    lbl('remainder o(log(1/ε)) , not asserted O(1)', 530, 550, C.dim, rq, 16);
    lbl('the bounded remainder (3.2) cancels m₀ factors exactly', 530, 580, C.dim, rq, 16);
    const gq = Q(S, 0, 'grows like the logarithm of one over epsilon', 0.6) * f1;
    const px = 1060, py = 760, pw = 680, ph = 440, xS = v => px + v / 12 * pw, yS = v => py - v / 4.2 * ph;
    plotAxes(px, py, pw, ph, gq, 'log(1/ε)', 'J_ε');
    const band = []; for (let i = 0; i <= 40; i++) { const v = i / 40 * 12; band.push([xS(v), yS(0.2 * v + 0.6 + 0.25 * Math.sqrt(v))]); } for (let i = 40; i >= 0; i--) { const v = i / 40 * 12; band.push([xS(v), yS(Math.max(0, 0.2 * v + 0.6 - 0.25 * Math.sqrt(v)))]); }
    fillPoly(band, C.gold, gq * 0.14);
    curve(p => { const v = p * 12; return [xS(v), yS(0.2 * v + 0.6)]; }, 40, C.gold, gq, 3);
    lblG('slope r/4 = 0.2  (r = 0.8)', xS(7.2), yS(0.75), C.gold, gq, 18);
    lbl('leading law with an o(log) band , illustrative', px + pw, 735, C.dim, gq, 14, 'right');
  }
  const q1 = Q(S, 1, 'The coefficient comes from the gauge ball', 0.6, 0.3);
  if (q1 > 0) {
    const cx = 520, cy = 480, sx = 330, sy = 330 * 2.2;
    const shape = (s) => { const pts = []; GAUGE108.forEach(([r, th]) => pts.push([cx + r * s * sx, cy - th * s * s * sy])); for (let i = GAUGE108.length - 1; i >= 0; i--) { const [r, th] = GAUGE108[i]; pts.push([cx + r * s * sx, cy + th * s * s * sy]); } for (let i = 0; i < GAUGE108.length; i++) { const [r, th] = GAUGE108[i]; pts.push([cx - r * s * sx, cy + th * s * s * sy]); } for (let i = GAUGE108.length - 1; i >= 0; i--) { const [r, th] = GAUGE108[i]; pts.push([cx - r * s * sx, cy - th * s * s * sy]); } return pts; };
    fillPoly(shape(1), C.cyan, q1 * 0.12); strokePoly(shape(1), C.cyan, q1, 3);
    const sq = Q(S, 1, 'Each logarithmic shell of R to the minus four', 0.6);
    [0.72, 0.52, 0.37].forEach((s, i) => strokePoly(shape(s), i % 2 ? C.gold : C.mag, sq, 2));
    line(cx - sx - 30, cy, cx + sx + 30, cy, C.dim, q1 * 0.6, 1.2); line(cx, cy - 230, cx, cy + 230, C.dim, q1 * 0.6, 1.2);
    lbl('ρ = √(x² + y²)', cx + sx + 30, cy + 40, C.dim, q1, 15, 'left'); lbl('θ', cx + 14, cy - 215, C.dim, q1, 16, 'left');
    lblG('R⁴ = ρ⁴ + 16θ² < 1', cx, cy + 250, C.cyan, q1, 20);
    lbl('shells δ_s : ρ scales by s , θ by s²', cx, cy + 285, C.gold, sq, 15);
    const vq = Q(S, 1, 'of volume pi squared over eight', 0.6);
    chip(1360, 290, 760, 62, '|B₁| = (π/2) ∫₀¹ √(1 − t²) dt = π²/8', C.cyan, vq, 23);
    lblG('= 1.23370 ;  Monte Carlo (2 × 10⁶ points) 1.234', 1360, 350, C.white, vq, 18);
    chip(1360, 450, 760, 62, '∫ over A < R < L of R⁻⁴ dξ = 4|B₁| log(L/A)', C.gold, sq, 22);
    lblG('= (π²/2) log(L/A) ,  since |B_s| = s⁴ |B₁|', 1360, 510, C.white, sq, 18);
    const eq = Q(S, 1, 'one over four pi squared times that is one eighth', 0.6);
    chip(1360, 610, 760, 62, 'G₁ ~ 1/(2πR²) :   (1/(2π))² · π²/2 = 1/8', C.green, eq, 22);
    lblG('J_ε ≈ m₀⁻¹ · (1/8) log(1/ε)', 1360, 670, C.white, eq, 20);
  }
};

/* ---- 08 PROFILE ---- */
SCENES.profile = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Every near-minimizer, rescaled at the pole', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Above g-c the unit problem has a unique positive ground state', 0.6) * f1;
    fillPoly([[150, 560]].concat(Array.from({ length: 81 }, (_, i) => { const x = (i / 80 - 0.5) * 2; return [530 + x * 360, 560 - 250 * Math.exp(-x * x * 4)]; })).concat([[890, 560]]), C.gold, q * 0.15);
    bump108(530, 560, 360, 250, C.gold, q);
    lblG('h_g > 0 almost everywhere ,  ‖h_g‖₂ = 1', 530, 610, C.gold, q, 21);
    const sq = Q(S, 0, 'simple and isolated', 0.6) * f1;
    lblG('every complex minimizer is ζ h_g ,  |ζ| = 1', 530, 655, C.white, sq, 19);
    lbl('isolated bottom eigenvalue ; compact multiplier W^(1/2) from the free domain', 530, 690, C.dim, sq, 15);
    const cq = Q(S, 0, 'with a coercive gap', 0.6) * f1;
    chip(1340, 300, 840, 62, 'Q_γ[v] − e_g‖v‖² ≥ c_g ‖v − ⟨h_g, v⟩ h_g‖² in ℍ₁', C.cyan, cq, 21);
    lbl('compactness : Lenz–Stollmann–Wingert , arXiv:0903.0280', 1340, 360, C.cyan, cq, 14);
    const nq = Q(S, 0, 'The native minimum then equals e-g over epsilon squared', 0.6) * f1;
    chip(1340, 470, 840, 66, '| E_ε(g) − e_g/ε² | ≤ C ,   0 < ε < ε_g', C.gold, nq, 27);
    lbl('upper bound : the ground state cut by φ_ε , |Uφ_ε| + |Vφ_ε| ≤ Cε , |Z_H φ_ε| ≤ Cε²', 1340, 530, C.dim, nq, 14);
    const sx = 1000, sy = 700;
    line(sx, sy, sx + 680, sy, C.dim, nq, 1.5); lbl('spectrum of q_ε,g', sx + 680, sy + 28, C.dim, nq, 14, 'right');
    const e0 = sx + 120; line(e0, sy - 40, e0, sy + 10, C.gold, nq, 4); lblG('E_ε ≈ e_g/ε²', e0, sy - 52, C.gold, nq, 16);
    for (let i = 0; i < 9; i++) { const x = e0 + 140 + i * 50 + 6 * Math.sin(i); line(x, sy - 22, x, sy + 6, C.cyan, nq * 0.7, 2); }
  }
  const q1 = Q(S, 1, 'Every near-minimizer, rescaled at the pole', 0.6, 0.3);
  if (q1 > 0) {
    chip(510, 270, 700, 58, 'w = B_ε f = m₀^(1/2) ε² (χ f)∘Φ_o∘δ_ε', C.cyan, q1, 20);
    const pq = Q(S, 1, 'converges to h-g up to one constant phase', 0.6);
    bump108(400, 560, 220, 200, C.gold, pq);
    bump108(400, 560, 220, 185, C.cyan, pq * 0.8, 0.05 * Math.sin(t * 2));
    dial64(830, 430, 66, t * 0.7, C.mag, pq, 'ζ_ε , one constant phase');
    lbl('e^(i/ε) f has the same energies : the phase must be chosen', 530, 650, C.dim, pq, 15);
    const eq = Q(S, 1, 'with squared error at most C times its defect plus epsilon squared', 0.6);
    chip(1360, 300, 820, 62, '‖ζ⁻¹ B_ε f − h_g‖² + ‖ψ f‖² + ε² T_ε[ψ f] ≤ C(D_ε + ε²)', C.gold, eq, 20);
    lblG('D_ε = ε²(q_ε,g[f] − E_ε(g)) , no tail or tightness assumed', 1340, 360, C.dim, eq, 16);
    const mq = Q(S, 1, 'No mass is lost', 0.6);
    chip(1340, 460, 860, 60, '∫ over Φ_o(δ_ε B₁(R)) of |f|² dμ  →  ∫ over B₁(R) of h_g² dξ', C.green, mq, 20);
    lbl('and the mass outside these balls → 0 as R → ∞', 1340, 515, C.dim, mq, 15);
    const kq = Q(S, 1, 'both energy coefficients converge', 0.6);
    chip(1340, 610, 860, 60, 'ε² T_ε[f] → T₁[h_g] ,    ε² g V_ε[f] → γ ∫ W h_g²', C.cyan, kq, 22);
  }
};

/* ---- 09 CHORD ---- */
SCENES.chord = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'any Hilbert space gives at most zero', 'classical'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'So every Hilbert chord readout', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On that profile the global kinetic distance', 0.6) * f1;
    chip(W / 2, 260, 1400, 58, 'd_Ω(ι_ε ξ , ι_ε η) = ε d₁(ξ , η) on fixed cores ,   ι_ε = Φ_o ∘ δ_ε :  no deck or wall shortcut', C.cyan, q, 20);
    const pq = Q(S, 0, 'Four points at distance t', 0.6) * f1;
    const cx = 480, cy = 520, R = 170;
    const P4 = [[cx + R, cy, '+', 'a₁ = Exp(tU)'], [cx - R, cy, '+', 'a₂ = Exp(−tU)'], [cx, cy - R, '−', 'a₃ = Exp(tZ_H)'], [cx, cy + R, '−', 'a₄ = Exp(−tZ_H)']];
    const sq = Q(S, 0, 'give a signed sum of squared distances', 0.6) * f1;
    [[0, 1, C.gold], [2, 3, C.gold], [0, 2, C.mag], [0, 3, C.mag], [1, 2, C.mag], [1, 3, C.mag]].forEach(([i, j, col]) => line(P4[i][0], P4[i][1], P4[j][0], P4[j][1], col, sq * 0.8, 2.5));
    P4.forEach(([x, y, s, lab], i) => { dot(x, y, 14, s === '+' ? 'g' : 'm', pq); lbl(s, x + (i < 2 ? 0 : 26), y + (i < 2 ? -24 : 8), s === '+' ? C.gold : C.mag, pq, 24); lblG(lab, x + (i === 0 ? 60 : i === 1 ? -60 : 0), y + (i < 2 ? 40 : (i === 2 ? -30 : 46)), C.white, pq, 15); });
    lbl('gold : 2t   magenta : d² = 2t² − t⁴/12 + O(t⁵)', cx, 795, C.dim, sq, 15);
    chip(1340, 350, 860, 62, 'S = Σ sᵢ sⱼ d₁(aᵢ, aⱼ)² = (2/3) t⁴ + O(t⁵) > 0', C.gold, sq, 22);
    const hq = Q(S, 0, 'any Hilbert space gives at most zero', 0.6) * f1;
    chip(1340, 440, 860, 58, 'Hilbert :  Σ sᵢ sⱼ ‖vᵢ − vⱼ‖² = −2 ‖Σ sᵢ vᵢ‖² ≤ 0', C.white, hq, 21);
    lbl('negative type : Schoenberg , Trans. AMS 44 (1938) ; distance expansion : Pennec , arXiv:1906.07418', 1340, 492, C.cyan, hq, 13);
    const px = 1060, py = 760, pw = 680, ph = 220, xS = v => px + v / 0.42 * pw, yS = v => py - (v - 0.655) / 0.015 * ph;
    plotAxes(px, py, pw, ph, sq, 't', 'S / t⁴ (geodesic shooting)');
    dashed(px, yS(2 / 3), px + pw, yS(2 / 3), C.gold, sq, 1.5); lbl('2/3', px + pw + 8, yS(2 / 3) + 5, C.gold, sq, 15, 'left');
    curve(p => { const i = Math.min(FOUR108.length - 1, Math.round(p * (FOUR108.length - 1))); return [xS(FOUR108[i][0]), yS(FOUR108[i][2])]; }, FOUR108.length - 1, C.cyan, sq, 2.5);
    FOUR108.forEach(r => dot(xS(r[0]), yS(r[2]), 7, 'c', sq));
    [0.1, 0.2, 0.3, 0.4].forEach(v => lbl(String(v), xS(v), py + 24, C.dim, sq, 13));
  }
  const q1 = Q(S, 1, 'So every Hilbert chord readout', 0.6, 0.3);
  if (q1 > 0) {
    const ax = 220, ay = 600, bx = 840, by = 600;
    curve(p => [ax + (bx - ax) * p, ay - 230 * Math.sin(Math.PI * p)], 60, C.cyan, q1, 3.5);
    line(ax, ay, bx, by, C.gold, q1, 3.5); dot(ax, ay, 12, 'g', q1); dot(bx, by, 12, 'g', q1);
    lblG('d_Ω(q, q′) : kinetic length', 530, 345, C.cyan, q1, 18); lblG('‖F(q) − F(q′)‖ : Hilbert chord', 530, 640, C.gold, q1, 18);
    lbl('F Borel , any separable Hilbert space , any dimension , may depend on f and ε', 530, 690, C.dim, q1, 14);
    const eq = Q(S, 1, 'keeps an average pair error of at least root c-zero times epsilon', 0.6);
    chip(1340, 280, 860, 62, '∫∫ min{1 , ((‖F(q) − F(q′)‖ − d_Ω)/ε)²} dμ_f dμ_f ≥ c₀', C.gold, eq, 19);
    lblG('μ_f = |f|² dμ on the core ,  near-minimizers with D_ε(f) ≤ d₀', 1340, 340, C.dim, eq, 15);
    const cq = Q(S, 1, 'a constant map achieves order epsilon', 0.6);
    chip(1340, 430, 860, 62, '√c₀ ε  ≤  inf over F of RMS error  ≤  2Rε', C.white, cq, 24);
    stamp('FLOOR √c₀ ε', 1340, 540, cq, C.red, 28, -0.04);
    const dq = Q(S, 1, 'Deleting vanishing mass keeps this floor', 0.6);
    lblG('deleted mass ≤ δ₀ : the same c₀ on the retained pairs  (Theorem 23.2)', 1340, 630, C.white, dq, 17);
    const wq = Q(S, 1, 'a window smaller than epsilon holds vanishing mass', 0.6);
    lblG('B(o , s_ε) with s_ε/ε → 0 :  ∫ |f_ε|² dμ → 0  (Theorem 24.1)', 1340, 680, C.white, wq, 17);
  }
};

/* ---- 10 SEAM ---- */
SCENES.seam = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The best rank approximating the seam inverse', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now cut the cylinder at a seam', 0.6) * f1;
    cyl108(250, 470, 100, 340, q, { seam: 1, seamY: 0.5, poleY: 0.74, halo: 26, lab: false });
    lbl('Σ = {h} × T²', 370, 478, C.gold, q, 18, 'left'); lbl('Ω₊', 250, 380, C.cyan, q, 22); lbl('Ω₋', 250, 600, C.cyan, q, 22);
    const mq = Q(S, 0, 'For every Fourier mode', 0.6) * f1;
    chip(1340, 270, 860, 58, '−φ″ + ((q − bx)² + ε²b² + s) φ = 0 ,   q = m/2 + c(h)n ,  b = n/r', C.cyan, mq, 19);
    const tq = Q(S, 0, 'turning points included', 0.6) * f1;
    lbl('q − bx may vanish inside the slab : no Diophantine or turning-point condition', 1340, 325, C.mag, tq, 15);
    const aq = Q(S, 0, 'the two-sided flux is comparable', 0.6) * f1;
    chip(1340, 395, 860, 58, 'a_mn = φ′₋(0) − φ′₊(0) ,    c* M ≤ a_mn ≤ C* M', C.gold, aq, 22);
    lblG('M = 1 + √s + |m/2 + c(h)n| + √(|n|/r) + ε|n|/r', 1340, 452, C.white, aq, 19);
    lbl('n = 0 : a = ω[coth(ωℓ₋) + coth(ωℓ₊)] , ω = √(s + m²/4)', 1340, 485, C.dim, aq, 15);
    const px = 520, py = 770, pw = 600, ph = 230;
    const XR = [0.5, 3.6], YR = [1.0, 3.8], lu = Math.log10(NUM108.Cst), ll = Math.log10(NUM108.cst);
    const [xS, yS] = plotLL108(px, py, pw, ph, aq, 'log₁₀ M', 'log₁₀ a_mn', XR, YR, [[1, '1'], [2, '2'], [3, '3']], [[1, '1'], [2, '2'], [3, '3']]);
    line(xS(XR[0]), yS(XR[0] + lu), xS(YR[1] - lu), yS(YR[1]), C.red, aq * 0.7, 1.5);
    line(xS(YR[0] - ll), yS(YR[0]), xS(XR[1]), yS(XR[1] + ll), C.red, aq * 0.7, 1.5);
    SEAM108.forEach(r => { const x = Math.log10(r[0]), y = Math.log10(r[1]); if (x <= XR[1] && y <= YR[1] && y >= YR[0]) dot(xS(x), yS(y), r[2] ? 5 : 4, r[2] ? 'm' : 'c', aq); });
    lbl('4000 modes : a/M ∈ [' + NUM108.rmin.toFixed(2) + ', ' + NUM108.rmax.toFixed(2) + ']', 1460, 590, C.white, aq, 17);
    lbl('inside [c*, C*] = [' + NUM108.cst.toFixed(3) + ', ' + NUM108.Cst.toFixed(0) + ']', 1460, 620, C.white, aq, 17);
    lbl('red lines : c* M and C* M ;  magenta : turning modes', 1460, 660, C.dim, aq, 15);
    lbl('ℓ₋ = 0.2 , ℓ₊ = 0.1 , r = 0.8 ;  s ∈ [0, 400] , ε ∈ [0, 3]', 1460, 690, C.dim, aq, 15);
  }
  const q1 = Q(S, 1, 'The best rank approximating the seam inverse', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 270, 800, 58, 'd_ε(η) = #{(m, n) : 1/a_mn > η}   (spectral truncation)', C.cyan, q1, 20);
    lblG('R_ε(s) = R_ε,D(s) + P_s C_ε(s) P_s*   (boundary pairs : Post , arXiv:1210.4707)', 530, 325, C.dim, q1, 15);
    const oq = Q(S, 1, 'is of order one over eta squared times eta plus epsilon', 0.6);
    chip(530, 410, 800, 62, 'K₋/(η²(η + ε))  ≤  d_ε(η)  ≤  K₊/(η²(η + ε))', C.gold, oq, 23);
    const zq = Q(S, 1, 'eta to the minus three without noise', 0.6);
    lblG('ε = 0 :  η⁻³          η ≤ ε :  1/(ε η²)', 530, 470, C.white, zq, 21);
    const fq = Q(S, 1, 'One lower face obeys the same law', 0.6);
    box(150, 520, 760, 220, C.green, fq, 2, 'rgba(0,30,15,0.3)');
    lbl('one lower face , including ε = 0', 530, 560, C.green, fq, 19);
    lblG('M_l/37 ≤ λ_mn ≤ 2 M_l  (checked : λ/M_l ∈ [' + NUM108.frmin.toFixed(2) + ', ' + NUM108.frmax.toFixed(2) + '])', 530, 605, C.white, fq, 17);
    lblG('‖C(s)‖ = [√s coth(h_I √s)]⁻¹ ≤ h_I', 530, 645, C.white, fq, 18);
    lblG('exit masses at s = 0 : (u − kₒ)/h_I and (kₒ − l)/h_I ;  MC ' + NUM108.pl.toFixed(3) + ' vs 0.667', 530, 685, C.white, fq, 15);
    lbl('Poisson value at o = E_o[e^(−sτ) g(q_τ) ; exit at l]', 530, 720, C.dim, fq, 14);
    const [xS, yS] = plotLL108(1060, 760, 680, 440, oq, 'log₁₀ (1/η)', 'log₁₀ rank (one face)', [0.55, 1.5], [2, 5.8], [[Math.log10(4), '4'], [Math.log10(10), '10'], [Math.log10(28), '28']], [[2, '2'], [3, '3'], [4, '4'], [5, '5']]);
    [['e0', C.gold, 'ε = 0'], ['e005', C.cyan, 'ε = 0.05'], ['e02', C.mag, 'ε = 0.2']].forEach(([k, col, lab], j) => {
      const arr = RANK108[k];
      curve(p => { const i = Math.min(arr.length - 1, Math.round(p * (arr.length - 1))); return [xS(Math.log10(arr[i][0])), yS(Math.log10(arr[i][1]))]; }, arr.length - 1, col, oq, 3);
      arr.forEach((r, i) => { if (i % 3 === 0) dot(xS(Math.log10(r[0])), yS(Math.log10(r[1])), 6, j === 0 ? 'g' : j === 1 ? 'c' : 'm', oq); });
      lblG(lab, 1080, 340 + j * 26, col, oq, 16, 'left');
    });
    const tq = Q(S, 1, 'one over epsilon eta squared below it', 0.6);
    lblG('slope ' + NUM108.sl0.toFixed(2), xS(1.15), yS(4.75), C.gold, zq, 17, 'right');
    lblG('slope ' + NUM108.sl2.toFixed(2), xS(1.32), yS(3.55), C.mag, tq, 17, 'left');
    lbl('r = 0.8 , h_I = 0.3 , s = 0 ;  d η²(η+ε) stays in a band', 1720, 735, C.dim, oq, 14, 'right');
  }
};

/* ---- 11 ONSET ---- */
SCENES.onset = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const gc = NUM108.gamc;
  const px = 1060, py = 760, pw = 680, ph = 440, xG = g => px + (g - 2) / 6 * pw, yG = v => py - (v + 2.6) / 3.0 * ph;
  const e = g => g <= gc ? 0 : -0.2 * Math.pow(g - gc, 1.7), de = g => g <= gc ? 0 : -0.34 * Math.pow(g - gc, 0.7);
  const q0 = Q(S, 0, 'The continuation follows the coupling', 0.6);
  plotAxes(px, py, pw, ph, q0, 'γ', 'e(γ)');
  line(px, yG(0), px + pw, yG(0), C.dim, q0 * 0.5, 1); lbl('0', px - 10, yG(0) + 5, C.dim, q0, 14, 'right');
  curve(p => { const g = 2 + p * 6; return [xG(g), yG(e(g))]; }, 140, C.cyan, q0, 3.5);
  lbl('illustrative shape', px + pw, py - ph + 10, C.dim, q0, 14, 'right');
  const cq = Q(S, 0, 'Above gamma-c, two pi lambda-zero', 0.6);
  dashed(xG(gc), py, xG(gc), py - ph, C.gold, cq, 1.5); lblG('γ_c', xG(gc), py + 28, C.gold, cq, 18);
  const sq = Q(S, 0, 'with slope minus the potential energy', 0.6);
  const g0 = 6.2 + 0.6 * Math.sin(t * 0.6);
  line(xG(g0 - 1.2), yG(e(g0) - 1.2 * de(g0)), xG(g0 + 1.2), yG(e(g0) + 1.2 * de(g0)), C.gold, sq, 2.5); dot(xG(g0), yG(e(g0)), 9, 'g', sq);
  lblG('slope −V[h_γ]', xG(g0) - 30, yG(e(g0)) + 46, C.gold, sq, 17, 'right');
  const f1 = 1 - Q(S, 1, 'At onset the energy is little-o', 0.6);
  if (f1 > 0) {
    chip(530, 280, 800, 60, 'γ_c = 2πλ₀ = ' + NUM108.gamc.toFixed(3) + '   (recomputed λ₀)', C.gold, cq * f1, 23);
    lbl('sharp threshold : e = 0 on (0, γ_c] , e < 0 beyond , Q_(γ_c)[v] ≥ ‖Z_H v‖²', 530, 340, C.dim, cq * f1, 15);
    const dq = Q(S, 0, 'continuously differentiable and strictly concave', 0.6) * f1;
    chip(530, 430, 800, 60, 'e ∈ C¹((γ_c, ∞)) ,  strictly concave', C.cyan, dq, 24);
    lbl('W > 0 and W → 0 at infinity rule out an affine piece', 530, 490, C.dim, dq, 15);
    const vq = sq * f1;
    chip(530, 580, 800, 60, 'e′(γ) = −V[h_γ] = −∫ W h_γ² dξ < 0', C.white, vq, 24);
    lblG('−V[h_γ₂] ≤ (e(γ₂) − e(γ₁))/(γ₂ − γ₁) ≤ −V[h_γ₁]', 530, 645, C.dim, vq, 17);
    lbl('finite-dimensional sample checked : concavity and slope', 530, 680, C.dim, vq, 14);
  }
  const q1 = Q(S, 1, 'At onset the energy is little-o', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 280, 800, 60, 'e(γ) = o(γ − γ_c) ,  e′(γ) → 0 ,  ‖Z_H h_γ‖² = o(γ − γ_c)', C.gold, q1, 20);
    const jq = Q(S, 1, 'so the joined curve is C one', 0.6);
    stamp('C¹ AT ONSET', xG(gc) + 150, yG(0) - 80, jq, C.green, 26, -0.04);
    const eq = Q(S, 1, 'the ground states escape', 0.6);
    for (let i = 0; i < 4; i++) { const rr = 30 + i * 45 + 15 * ((t * 0.4) % 1); ring(530, 565, rr, C.cyan, eq * (0.9 - i * 0.18), 2.5); }
    dot(530, 565, 8, 'g', eq); lblG('γ ↓ γ_c', 530, 520, C.cyan, eq, 16);
    const wq = Q(S, 1, 'converge weakly to zero and leave every compact set', 0.6);
    lblG('h_γ ⇀ 0 in ℍ₁ ,  ∫_K h_γ² → 0 ,  T[h_γ] , V[h_γ] → 0', 530, 760, C.white, wq, 18);
    const nq = Q(S, 1, 'though each keeps unit norm', 0.6);
    lblG('‖h_γ‖₂ = 1 : no strong limit', 530, 352, C.mag, nq, 19);
  }
};

/* ---- 12 LADDER ---- */
SCENES.ladder = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Every fixed level transfers to the native cylinder', 0.6);
  const q0 = Q(S, 0, 'infinitely many negative eigenvalues rising to zero', 0.6);
  ladder108(1220, 360, 260, 360, q0 * f1, LADDER108, C.gold, clamp((S.u - lineAt(S, 0).s) / 4));
  lblG('λₙ(γ) ↑ 0', 1350, 300, C.gold, q0 * f1, 22);
  lbl('illustrative levels −L^(−2j) : they accumulate only at 0', 1350, 770, C.dim, q0 * f1, 14);
  if (f1 > 0) {
    chip(530, 270, 800, 60, 'λ₁ = e(γ) < λ₂ ≤ λ₃ ≤ … < 0 ,   λₙ ↑ 0', C.gold, q0 * f1, 23);
    const aq = Q(S, 0, 'Dilating one annular witness by powers of L', 0.6) * f1;
    for (let j = 0; j < 4; j++) { const r0 = 24 * Math.pow(1.6, j), r1 = r0 * 1.32; ring(530, 560, r0, C.cyan, aq * 0.8, 2); ring(530, 560, r1, C.cyan, aq * 0.8, 2); }
    lblG('D_s u = s⁻² u∘δ_(1/s) ,   s_j = s₀ L^j', 530, 760, C.cyan, aq, 19);
    const nq = Q(S, 0, 'gives separated negative directions', 0.6) * f1;
    lblG('Q_γ[Σ d_j D_(s_j) u] ≤ −Σ b s_j⁻² |d_j|²', 530, 340, C.white, nq, 18);
    const cq = Q(S, 0, 'so the count below minus t grows', 0.6) * f1;
    lblG('N_γ(t) ≥ c_γ log(1/t) − C_γ ,  c_γ = 1/(2 log L)', 530, 400, C.gold, cq, 18);
    box(1560, 400, 250, 120, C.gold, cq, 2, 'rgba(0,0,0,0.5)'); lblG('N_γ(t)', 1685, 440, C.gold, cq, 19); lblG('≳ log(1/t)/(2 log L)', 1685, 485, C.white, cq, 15);
  }
  const q1 = Q(S, 1, 'Every fixed level transfers to the native cylinder', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 280, 800, 62, '|E_ε,n(g) − ε⁻² λₙ(g/m₀)| ≤ C_g,n', C.gold, q1, 26);
    lbl('fixed g > g_c and n ; multiplicities counted ; tails ≤ C r₀⁻² (Lemma 4.1)', 530, 340, C.dim, q1, 15);
    const nq = Q(S, 1, 'the native negative count grows', 0.6);
    chip(530, 440, 800, 62, 'N⁻_ε(g) ≥ c_g log(1/ε) − C_g ,   c_g = 1/log L', C.cyan, nq, 23);
    lbl('separated annular witnesses fit inside the chart for s_j ≤ ρ*/ε', 530, 500, C.dim, nq, 15);
    const gq = Q(S, 1, 'the ground gap closes as gamma decreases to gamma-c', 0.6);
    chip(530, 600, 800, 62, 'E_ε,2 − E_ε,1 = ε⁻² Δ_γ + O(1) ,   0 < Δ_γ < |e(γ)|', C.mag, gq, 21);
    lblG('Δ_γ → 0 as γ ↓ γ_c', 530, 660, C.white, gq, 19);
    const gx = 1100, gy = 700, gw = 620, gh = 380, xG = g => gx + (g - 3.9) / 4 * gw, yG = v => gy - (v + 3.2) / 3.4 * gh;
    plotAxes(gx, gy, gw, gh, q1, 'γ', 'λ₁(γ) , λ₂(γ)');
    line(gx, yG(0), gx + gw, yG(0), C.dim, q1 * 0.5, 1); lbl('0', gx - 10, yG(0) + 5, C.dim, q1, 14, 'right');
    const l1 = g => -0.2 * Math.pow(g - 3.93, 1.7), l2 = g => -0.07 * Math.pow(g - 3.93, 1.9);
    curve(p => { const g = 3.93 + p * 3.9; return [xG(g), yG(l1(g))]; }, 80, C.gold, q1, 3);
    curve(p => { const g = 3.93 + p * 3.9; return [xG(g), yG(l2(g))]; }, 80, C.cyan, gq, 3);
    lblG('λ₁ = e(γ)', xG(7.6), yG(l1(7.6)) + 28, C.gold, q1, 16, 'right'); lblG('λ₂', xG(7.6), yG(l2(7.6)) - 14, C.cyan, gq, 16, 'right');
    lbl('illustrative shape', gx + gw, gy - gh - 10, C.dim, q1, 14, 'right');
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'are published inputs', 'published'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['STABLE', 'closed at each ε', C.green, 'Each fixed noise is stable'], ['RATE', '−1/ε²', C.red, 'removing it costs one over epsilon squared'], ['NO FLAT READOUT', 'C = −ε⁻³', C.mag, 'flat readouts fail'], ['CAPS', 'error O(1/B)', C.cyan, 'capped responses converge'], ['THRESHOLD', 'g ≤ g_c', C.gold, 'one threshold decides'],
      ['OCCUPATION', '(r/4) log(1/ε)', C.gold, 'occupation grows logarithmically'], ['PROFILE', 'h_g , one phase', C.cyan, 'the profile is universal'], ['CHORDS', '≥ √c₀ ε', C.mag, 'chords keep a floor'], ['RANK', '1/(η²(η + ε))', C.green, 'seams obey a rank law'], ['LADDER', 'λₙ ↑ 0', C.red, 'and a ladder climbs to zero']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 270 + (i % 5) * 345, y = 230 + Math.floor(i / 5) * 140, q = Q(S, 0, ph) * fade; box(x - 160, y, 320, 115, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 42, col, q, 19); lblG(a2, x, y + 88, C.white, q, 21); });
    lbl('PUBLISHED · heat bounds (Capogna–Citti–Manfredini) · KLMN (Teschl) · Cotton criterion (García–Hehl–Heinicke–Macías) · Feynman–Kac (Güneysu) · boundary pairs (Post) · distance expansion (Pennec)', W / 2, 560, C.cyan, Q(S, 1, 'are published inputs') * fade, 13);
    lbl('CLASSICAL · Itô · Schur test · IMS · Hardy · Rellich · min–max · Hilbert negative type (Schoenberg) · spectral truncation · Laplace uniqueness', W / 2, 600, '#8fbcff', Q(S, 1, 'are published inputs') * fade, 14);
    lbl('VOLUMES · central-noise Green stability §1–§35 · its continuation §1–§6 · λ₀ from the variable-coefficient volume · g* = g_c from the boundary-response volume', W / 2, 640, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · chart and deck action · exit times · crossover integral · λ₀ · Cotton tensor · cap schedule · π²/8 · geodesic four-point sum · seam and face fluxes · rank counts', W / 2, 680, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 750, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    emblem108(W / 2, 360, 0.85, a, t);
    txt('GREEN STABILITY III · RUNG', W / 2, 640, { size: 58, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('FIB 原生 Green 稳定性 第三部 · 中心噪声与负谱阶梯 · TRURETURING FILM 108', W / 2, 710, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 775, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Each fixed noise is stable, the noiseless limit is not, and a negative ladder climbs toward zero.', W / 2, 835, { size: 27, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'GREEN STABILITY III', noise: 'CENTRAL NOISE', rate: 'THE ε⁻² RATE', cotton: 'NO FLAT READOUT', cap: 'CAPPED RESPONSE', coeff: 'COEFFICIENT AND THRESHOLD', occupy: 'SELF-FIELD OCCUPATION', profile: 'UNIVERSAL PROFILE', chord: 'CHORD FLOOR', seam: 'SEAM RANK LAW', onset: 'COUPLING ONSET', ladder: 'NEGATIVE LADDER', finale: 'LEDGER' });

function poster108() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  emblem108(470, 500, 1.25, 1, 2.1);
  txt('Γ_ε,o ≍ 1/(m₀ d(ε + d))', 1320, 360, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('C(E₁, E₂, E₃) = −ε⁻³', 1320, 470, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('λₙ ↑ 0 ,  N(t) ≳ log(1/t)', 1320, 580, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('FIB 原生 Green 稳定性 第三部', W / 2, 140, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('GREEN STABILITY III · RUNG', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('中 心 噪 声 · 负 谱 阶 梯', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 108', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster108;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
