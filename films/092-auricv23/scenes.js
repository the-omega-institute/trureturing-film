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

/* ---- film 092: AURIC V23–V24 · MONOTILES, TRIANGLE CENTRES AND THE SQUARE LAW ---- */
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
const _po092 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po092.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po092.set(key, off); }
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
/* ---- film 092 data (generated from vis092.json by verify092.py) ---- */
const HAT92 = [[0.0, 0.0], [-1.5, -0.86603], [-1.0, -1.73205], [1.0, -1.73205], [1.5, -0.86603], [3.0, -1.73205], [4.5, -0.86603], [4.0, 0.0], [3.0, 0.0], [3.0, 1.73205], [1.5, 2.59808], [1.0, 1.73205], [0.0, 1.73205]];
const TRIS92 = [[0, 1, 2], [0, 2, 3], [0, 3, 4], [4, 5, 6], [0, 4, 6], [6, 7, 8], [0, 6, 8], [0, 8, 9], [9, 10, 11], [0, 9, 11], [0, 11, 12]];
const DBL92 = [2, 4, 2, 3, 3, 1, 3, 6, 2, 4, 2];
const CEN92 = {"A": [0.0, 0.0], "B": [1.5, -0.86603], "C": [4.5, -0.86603], "O": [3.0, 3.4641], "H": [0.0, -8.66025], "G": [2.0, -0.57735], "I": [1.57474, -0.5871]};
const BARY92 = {"G": [0.3333333333333333, 0.3333333333333333, 0.3333333333333333], "I": [0.3221, 0.492, 0.1859], "O": [5, -7, 3], "H": [-9, 15, -5]};
const UD92 = [[0.7071, 0.0, -0.4861, 0.5135], [0.0, 0.7071, 0.5135, 0.4861], [0.7071, 0.0, 0.4861, -0.5135], [0.0, 0.7071, -0.5135, -0.4861]];
const OVL92 = [0.5445, 0.6798, 0.719, 0.7362, 0.7542, 0.7743, 0.7838, 0.7957, 0.803, 0.8133, 0.8254, 0.8304, 0.8371, 0.8438, 0.8494, 0.8553, 0.8607, 0.8645, 0.8673, 0.8727, 0.8756, 0.8802, 0.8855, 0.8895, 0.8927, 0.8947, 0.8989, 0.9037, 0.9062, 0.9102, 0.9132, 0.9163, 0.9181, 0.9219, 0.9238, 0.9267, 0.9288, 0.9308, 0.9337, 0.9364, 0.9389, 0.9412, 0.9435, 0.9448, 0.947, 0.95, 0.9534, 0.9556, 0.9577, 0.9598, 0.9621, 0.964, 0.9666, 0.9694, 0.9727, 0.9761, 0.9785, 0.982, 0.9857, 0.9896];
const COVMAX92 = [2.8617, 2.3609, 2.0427, 1.3403, 1.1056, 0.8737, 0.7513, 0.7227, 0.5973, 0.4999, 0.4724, 0.378, 0.3424, 0.3065, 0.2523, 0.2235];
const COVMEAN92 = [1.6822, 1.2515, 0.9515, 0.7154, 0.5935, 0.5059, 0.4311, 0.3638, 0.3062, 0.2627, 0.2234, 0.1944, 0.1729, 0.1514, 0.1329, 0.1172];
const CANG92 = [0.7227, 1.4455, 2.1682, 2.8909, 3.6137, 4.3364, 5.0591, 5.7819, 0.2214, 0.9442, 1.6669, 2.3896, 3.1124, 3.8351, 4.5578, 5.2806, 6.0033, 0.4428, 1.1656, 1.8883, 2.611, 3.3338, 4.0565, 4.7793, 5.502, 6.2247, 0.6643, 1.387, 2.1097, 2.8325, 3.5552, 4.2779, 5.0007, 5.7234, 0.163, 0.8857, 1.6084, 2.3312, 3.0539, 3.7766, 4.4994, 5.2221, 5.9448, 0.3844, 1.1071, 1.8298, 2.5526, 3.2753, 3.9981, 4.7208, 5.4435, 6.1663, 0.6058, 1.3285, 2.0513, 2.774, 3.4967, 4.2195, 4.9422, 5.6649];
const SCHUR92 = [0.6976, 1.0116, 1.6396, 2.2272, 2.8174, 3.3978, 3.9122, 4.4712, 4.9809, 7.173, 7.6664, 7.8911];
const SCHUR92B = [0.6976, 1.0116, 1.6396, 2.2272, 2.8174, 3.3978, 3.9122, 4.4712, 4.9809, 7.173, 7.6664, 7.8911];
const GTRI92 = [0.38197, 0.38197, 0.38197, 0.66174, 0.66174, 1.38197, 1.38197, 1.79094, 1.79094, 1.79094, 3.82709, 3.82709, 3.82709, 3.9563, 3.9563];
const GTRI092 = [-0.0, -0.0, 0.0, 0.38197, 0.38197, 1.79094, 1.79094, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.82709, 3.82709];
const FLIP92 = [[0.12, -1.10724], [0.1417, -0.81096], [0.1634, -0.59833], [0.1851, -0.43963], [0.2068, -0.31765], [0.2285, -0.22173], [0.2502, -0.14492], [0.2719, -0.0825], [0.2936, -0.03116], [0.3153, 0.01148], [0.3369, 0.0472], [0.3586, 0.07732], [0.3803, 0.10288], [0.402, 0.12467], [0.4237, 0.14331], [0.4454, 0.15933], [0.4671, 0.17311], [0.4888, 0.185], [0.5105, 0.19526], [0.5322, 0.20413], [0.5539, 0.2118], [0.5756, 0.21842], [0.5973, 0.22413], [0.619, 0.22904], [0.6407, 0.23325], [0.6624, 0.23685], [0.6841, 0.23991], [0.7058, 0.2425], [0.7275, 0.24465], [0.7492, 0.24644], [0.7708, 0.24788], [0.7925, 0.24904], [0.8142, 0.24992], [0.8359, 0.25057], [0.8576, 0.25101], [0.8793, 0.25126], [0.901, 0.25134], [0.9227, 0.25127], [0.9444, 0.25106], [0.9661, 0.25073], [0.9878, 0.25029], [1.0095, 0.24975], [1.0312, 0.24913], [1.0529, 0.24843], [1.0746, 0.24766], [1.0963, 0.24682], [1.118, 0.24593], [1.1397, 0.24499], [1.1614, 0.244], [1.1831, 0.24298], [1.2047, 0.24192], [1.2264, 0.24083], [1.2481, 0.23971], [1.2698, 0.23857], [1.2915, 0.23741], [1.3132, 0.23623], [1.3349, 0.23503], [1.3566, 0.23382], [1.3783, 0.2326], [1.4, 0.23137]];
const FLIPX92 = 0.30902;
const FLIPB92 = [0.4, 0.8];
const STURM92 = [0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1];
const KSEQ92 = [1.0, 0.382, 0.1459, 0.9098, 0.6738, 0.0557, 0.6738, 0.9098, 0.1459, 0.382, 1.0, 0.382, 0.1459, 0.9098, 0.6738, 0.0557, 0.6738, 0.9098, 0.1459, 0.382, 1.0, 0.382, 0.1459, 0.9098, 0.6738, 0.0557, 0.6738, 0.9098, 0.1459, 0.382];
const ZR92 = [[0.0, 1.0], [0.1, 0.9], [0.2, 0.8], [0.3, 0.7], [0.4, 0.6], [0.5, 0.5], [0.6, 0.4], [0.7, 0.3], [0.8, 0.2], [0.9, 0.1], [1.0, 0.0]];
const RIM92 = [[0.0, 1.0], [0.025, 0.9997], [0.05, 0.9987], [0.075, 0.9972], [0.1, 0.995], [0.125, 0.9922], [0.15, 0.9887], [0.175, 0.9846], [0.2, 0.9798], [0.225, 0.9744], [0.25, 0.9682], [0.275, 0.9614], [0.3, 0.9539], [0.325, 0.9457], [0.35, 0.9367], [0.375, 0.927], [0.4, 0.9165], [0.425, 0.9052], [0.45, 0.893], [0.475, 0.88], [0.5, 0.866], [0.525, 0.8511], [0.55, 0.8352], [0.575, 0.8182], [0.6, 0.8], [0.625, 0.7806], [0.65, 0.7599], [0.675, 0.7378], [0.7, 0.7141], [0.725, 0.6887], [0.75, 0.6614], [0.775, 0.632], [0.8, 0.6], [0.825, 0.5651], [0.85, 0.5268], [0.875, 0.4841], [0.9, 0.4359], [0.925, 0.38], [0.95, 0.3122], [0.975, 0.2222], [1.0, 0.0]];
const SEQZ92 = [[-0.8653, 0.0], [-0.3029, 0.0], [-0.8981, 0.0], [-0.2503, 0.0], [-0.6229, 0.0], [-0.8403, 0.0], [-0.8934, 0.0], [0.9451, 0.0], [0.0005, 0.0], [-0.5446, 0.0], [0.9479, 0.0], [0.5796, 0.0]];
const A192 = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, -1]];
const A292 = [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]];
const A392 = [[0, 0, 0, 1], [0, 0, -1, 0], [0, -1, 0, 0], [1, 0, 0, 0]];
const J92 = [[0, 0, -1, 0], [0, 0, 0, -1], [1, 0, 0, 0], [0, 1, 0, 0]];
const CONE92 = [[0.3194, 0.3194], [0.0237, 0.0237], [0.764, 0.764], [0.4013, 0.3227], [0.4907, 0.1136], [0.4518, 0.2661], [0.5518, 0.2607], [0.4396, 0.4396], [0.0151, 0.0151], [0.4363, 0.4363], [0.8442, 0.8442], [0.913, 0.913], [0.5225, 0.5225], [0.3875, 0.3875], [0.127, 0.127], [0.5225, 0.5225], [0.9487, 0.9487], [0.6267, 0.6267], [0.4826, 0.3009], [0.4168, 0.4168], [0.5224, 0.4331], [0.2541, 0.2541], [0.508, 0.3012], [0.4507, 0.2191], [0.1945, 0.1945], [0.4095, 0.2102], [0.5787, 0.5787], [0.0798, 0.0798], [0.5561, 0.5561], [0.1911, 0.1099], [0.2314, 0.1559], [0.5381, 0.5381], [0.2767, 0.2767], [0.341, 0.341], [0.4253, 0.4253], [0.3209, 0.3209], [0.3233, 0.2066], [0.3906, 0.3906], [0.386, 0.386], [0.5935, 0.5935], [0.4219, 0.2422], [0.1967, 0.1967], [0.5814, 0.5814], [0.1036, 0.1036], [0.5352, 0.5352], [0.6032, 0.6032], [0.3248, 0.2272], [0.7234, 0.7234], [0.6564, 0.6564], [0.3834, 0.265], [0.4418, 0.2831], [0.8721, 0.8721], [0.6109, 0.4739], [0.3144, 0.3144], [0.3597, 0.3597], [0.431, 0.1919], [0.4738, 0.3227], [0.1394, 0.1394], [0.2522, 0.1856], [0.705, 0.705], [0.4327, 0.4327], [0.4453, 0.2965], [0.2889, 0.2889], [0.9499, 0.9499], [0.6903, 0.6903], [0.5202, 0.4623], [0.613, 0.613], [0.3556, 0.1453], [0.9, 0.9], [0.3134, 0.3134], [0.4466, 0.4466], [0.6589, 0.6589], [0.7202, 0.7202], [0.2681, 0.1996], [0.7218, 0.7218], [0.3419, 0.3411], [0.327, 0.2971], [0.1675, 0.1675], [0.3476, 0.3463], [0.2903, 0.0836], [0.9156, 0.9156], [0.3777, 0.181], [0.3613, 0.1504], [0.8447, 0.8447], [0.5432, 0.1548], [0.2935, 0.2935], [0.405, 0.0613], [0.3439, 0.1281], [0.482, 0.3367], [0.5125, 0.5125], [0.824, 0.824], [0.8992, 0.8992], [0.7774, 0.7774], [0.2728, 0.0889], [0.325, 0.2526], [0.1102, 0.1048], [0.4813, 0.2681], [0.8743, 0.8743], [0.3972, 0.3972], [0.3074, 0.1654], [0.6718, 0.6718], [0.3629, 0.2152], [0.7292, 0.7292], [0.3122, 0.2614], [0.4652, 0.2516], [0.4809, 0.3167], [0.4742, 0.0466], [0.8434, 0.8434], [0.6089, 0.5663], [0.7552, 0.7552], [0.2795, 0.2795], [0.3122, 0.1961], [0.9499, 0.9499], [0.5454, 0.36], [0.9471, 0.9471], [0.2689, 0.155], [0.3476, 0.3476], [0.6943, 0.562], [0.4751, 0.4751], [0.607, 0.607], [0.4263, 0.4131], [0.3475, 0.3475], [0.663, 0.6561], [0.4281, 0.3534], [0.3518, 0.3518], [0.5127, 0.5127], [0.3045, 0.3045], [0.6576, 0.6576], [0.9583, 0.9583], [0.3692, 0.3692], [0.3736, 0.1886], [0.4055, 0.3012], [0.1021, 0.1021], [0.4588, 0.2253], [0.358, 0.1759], [0.3709, 0.1276], [0.2445, 0.0919], [0.5638, 0.5638], [0.47, 0.47], [0.8847, 0.8847], [0.4581, 0.4581], [0.4864, 0.221], [0.7568, 0.7568], [0.3287, 0.3287], [0.5791, 0.5791], [0.2484, 0.2484], [0.3372, 0.2356], [0.5273, 0.3053], [0.2647, 0.2647], [0.8504, 0.8504], [0.557, 0.2474], [0.5015, 0.5015], [0.3284, 0.3284], [0.0262, 0.0262], [0.264, 0.1562], [0.4028, 0.1308], [0.2416, 0.1648], [0.5176, 0.5176], [0.2932, 0.0754], [0.4258, 0.4258], [0.3496, 0.3496], [0.4248, 0.4248], [0.2867, 0.2867], [0.4221, 0.2461], [0.1706, 0.1706], [0.4955, 0.3976], [0.2225, 0.1515], [0.3896, 0.272], [0.4305, 0.2516], [0.4809, 0.113], [0.4163, 0.1342], [0.8367, 0.8367], [0.5513, 0.5513], [0.5567, 0.5567], [0.0223, 0.0223], [0.0632, 0.0632], [0.614, 0.614], [0.3882, 0.3882], [0.8336, 0.8336], [0.4264, 0.309], [0.538, 0.538], [0.5291, 0.5291], [0.7667, 0.7667], [0.5133, 0.1434], [0.6629, 0.6629], [0.4292, 0.4292], [0.4644, 0.3112], [0.8236, 0.8236], [0.6325, 0.6325], [0.3752, 0.3752], [0.5241, 0.4009], [0.4489, 0.0899], [0.2528, 0.2528], [0.1625, 0.1625], [0.4366, 0.1414], [0.3153, 0.1845], [0.3344, 0.2216], [0.6051, 0.6051], [0.4638, 0.4638], [0.2512, 0.2512], [0.5163, 0.5163], [0.3955, 0.2502], [0.6313, 0.6313], [0.6485, 0.6485], [0.3781, 0.3781], [0.0861, 0.0861], [0.4588, 0.4588], [0.4563, 0.1413], [0.1439, 0.0972], [0.549, 0.549], [0.5889, 0.0741], [0.1379, 0.1379], [0.5462, 0.2629], [0.7312, 0.7312], [0.4863, 0.4431], [0.2323, 0.0726], [0.85, 0.85], [0.6147, 0.6147], [0.5159, 0.1649], [0.8085, 0.8085]];
const TRP92 = [[-0.0402, -0.0402], [0.2292, 0.2292], [-0.1193, -0.1193], [-0.5002, -0.5002], [-0.9229, -0.9229], [0.3015, 0.3015], [-0.0977, -0.0977], [0.6486, 0.6486], [0.7641, 0.7641], [-0.6733, -0.6733], [0.8176, 0.8176], [0.2333, 0.2333], [-0.8581, -0.8581], [-0.442, -0.442], [0.355, 0.355], [0.25, 0.25], [-0.8808, -0.8808], [-0.0428, -0.0428], [0.6032, 0.6032], [0.6103, 0.6103], [-0.5158, -0.5158], [-0.9949, -0.9949], [0.9094, 0.9094], [-0.9819, -0.9819], [-0.9432, -0.9432], [0.0107, 0.0107], [-0.6684, -0.6684], [0.3109, 0.3109], [-0.7874, -0.7874], [-0.6334, -0.6334], [-0.6845, -0.6845], [0.2058, 0.2058], [-0.1827, -0.1827], [-0.3104, -0.3104], [0.5602, 0.5602], [-0.6205, -0.6205], [-0.9242, -0.9242], [-0.1706, -0.1706], [-0.5329, -0.5329], [-0.5138, -0.5138], [0.7791, 0.7791], [0.1474, 0.1474], [-0.8051, -0.8051], [-0.0013, -0.0013], [-0.6755, -0.6755], [-0.7194, -0.7194], [0.4447, 0.4447], [-0.089, -0.089], [-0.181, -0.181], [-0.6243, -0.6243], [0.5953, 0.5953], [-0.7091, -0.7091], [-0.7069, -0.7069], [-0.206, -0.206], [-0.2479, -0.2479], [-0.2053, -0.2053], [0.1659, 0.1659], [0.765, 0.765], [0.1354, 0.1354], [0.4568, 0.4568], [-0.5068, -0.5068], [-0.2132, -0.2132], [0.6112, 0.6112], [0.59, 0.59], [0.2861, 0.2861], [0.0281, 0.0281], [-0.9909, -0.9909], [-0.6305, -0.6305], [-0.8828, -0.8828], [-0.1623, -0.1623], [0.5866, 0.5866], [0.3687, 0.3687], [-0.5198, -0.5198], [-0.7758, -0.7758], [-0.3486, -0.3486], [-0.6988, -0.6988], [0.5538, 0.5538], [0.6667, 0.6667], [-0.1705, -0.1705], [0.2543, 0.2543], [-0.7774, -0.7774], [0.4732, 0.4732], [0.1584, 0.1584], [-0.881, -0.881], [0.5532, 0.5532], [0.2093, 0.2093], [0.3639, 0.3639], [-0.2705, -0.2705], [-0.307, -0.307], [-0.7977, -0.7977], [0.8319, 0.8319], [0.6483, 0.6483], [0.2578, 0.2578], [0.1487, 0.1487], [0.5439, 0.5439], [0.7122, 0.7122], [0.9484, 0.9484], [0.1902, 0.1902], [0.5628, 0.5628], [0.3691, 0.3691], [-0.3059, -0.3059], [-0.4892, -0.4892], [-0.286, -0.286], [-0.8743, -0.8743], [0.1747, 0.1747], [-0.1423, -0.1423], [-0.0302, -0.0302], [0.5883, 0.5883], [-0.0352, -0.0352], [-0.6919, -0.6919], [-0.6565, -0.6565], [-0.6726, -0.6726], [-0.3535, -0.3535], [-0.4463, -0.4463], [0.8086, 0.8086], [-0.4702, -0.4702], [0.4093, 0.4093], [0.0825, 0.0825], [0.5107, 0.5107], [0.1806, 0.1806], [-0.7793, -0.7793], [-0.5608, -0.5608], [0.7883, 0.7883], [0.0679, 0.0679], [0.3539, 0.3539], [-0.2485, -0.2485], [0.2251, 0.2251], [-0.7696, -0.7696], [-0.5096, -0.5096], [0.3202, 0.3202], [0.4732, 0.4732], [0.8464, 0.8464], [-0.4428, -0.4428], [0.617, 0.617], [0.8266, 0.8266], [0.0919, 0.0919], [0.8858, 0.8858], [-0.2879, -0.2879], [-0.447, -0.447], [0.8991, 0.8991], [0.2584, 0.2584], [-0.1188, -0.1188], [0.0909, 0.0909], [-0.6442, -0.6442], [0.1494, 0.1494], [0.3553, 0.3553], [-0.3723, -0.3723], [0.0168, 0.0168], [-0.1668, -0.1668], [0.2057, 0.2057]];
const TRPAIR92 = [[[0.0, 0.0], [0.5773502691896258, 0.0], [0.28867513459481303, -0.5000000000000001]], [[0.0, 0.0], [0.5773502691896258, 0.0], [0.28867513459481275, 0.4999999999999999]]];
const FBAD92 = [[0.0, 0.0], [0.02, 0.0004], [0.04, 0.0017], [0.06, 0.0041], [0.08, 0.0075], [0.1, 0.0122], [0.12, 0.0183], [0.14, 0.0258], [0.16, 0.035], [0.18, 0.046], [0.2, 0.0588], [0.22, 0.0737], [0.24, 0.0907], [0.26, 0.1099], [0.28, 0.1314], [0.3, 0.1552], [0.32, 0.1813], [0.34, 0.2097], [0.36, 0.2404], [0.38, 0.2731], [0.4, 0.3077], [0.42, 0.344], [0.44, 0.3817], [0.46, 0.4205], [0.48, 0.4601], [0.5, 0.5], [0.52, 0.5399], [0.54, 0.5795], [0.56, 0.6183], [0.58, 0.656], [0.6, 0.6923], [0.62, 0.7269], [0.64, 0.7596], [0.66, 0.7903], [0.68, 0.8187], [0.7, 0.8448], [0.72, 0.8686], [0.74, 0.8901], [0.76, 0.9093], [0.78, 0.9263], [0.8, 0.9412], [0.82, 0.954], [0.84, 0.965], [0.86, 0.9742], [0.88, 0.9817], [0.9, 0.9878], [0.92, 0.9925], [0.94, 0.9959], [0.96, 0.9983], [0.98, 0.9996], [1.0, 1.0]];
const ATB92 = [0.09017, 0.23607, 0.61803, 0.23607, 0.09017, 0.56231, 0.41641, 0.03444, 0.41641, 0.56231];
const ATQ92 = [0.09268, 0.25329, 0.73607, 0.25329, 0.09268, 0.66001, 0.46999, 0.03481, 0.46999, 0.66001];
const FEFF92 = [[-1.0, 4.0], [-0.95, 3.3675], [-0.9, 3.1056], [-0.85, 2.9046], [-0.8, 2.7351], [-0.75, 2.5858], [-0.7, 2.4508], [-0.65, 2.3267], [-0.6, 2.2111], [-0.55, 2.1026], [-0.5, 2.0], [-0.45, 1.9024], [-0.4, 1.8091], [-0.35, 1.7196], [-0.3, 1.6336], [-0.25, 1.5505], [-0.2, 1.4702], [-0.15, 1.3923], [-0.1, 1.3167], [-0.05, 1.2432], [0.0, 1.1716], [0.05, 1.1017], [0.1, 1.0335], [0.15, 0.9668], [0.2, 0.9016], [0.25, 0.8377], [0.3, 0.7751], [0.35, 0.7137], [0.4, 0.6534], [0.45, 0.5941], [0.5, 0.5359], [0.55, 0.4786], [0.6, 0.4223], [0.65, 0.3668], [0.7, 0.3122], [0.75, 0.2583], [0.8, 0.2053], [0.85, 0.1529], [0.9, 0.1013], [0.95, 0.0503], [1.0, 0.0]];
const LAM92 = [9.0, 0.0, 2.25, 5.625, 1.2656, 2.4609, 4.9395, 1.6611, 2.5582, 4.6074, 1.8706, 2.6168, 4.4025, 2.0052, 2.657, 4.2601, 2.1009, 2.6867, 4.1538, 2.1734, 2.7098, 4.0705, 2.2308, 2.7285, 4.003];
const SHARP92 = [[-3.9617, -2.9388], [-3.5115, -2.6391], [-3.0625, -2.3406], [-2.616, -2.0444], [-2.215, -1.7793], [-1.7807, -1.4934], [-1.4689, -1.2881], [-1.1672, -1.0874]];
const NONASSOC92 = [[-0.3827, 0.9239], [0.3827, 0.9239]];
const OVLMIN92 = 0.5444889430612952;
const OVLB92 = 0.21875000000000022;
const C092 = 2.5801;
const SKEW92 = [[1, 10], [2, 5], [3, 10], [4, 5], [5, 2], [6, 5], [7, 10], [8, 5], [9, 10], [10, 1]];
/* ---- film 092 helpers ---- */
const PHI92 = (1 + Math.sqrt(5)) / 2;
function hatMap92(cx, cy, s, rot = 0) {
  const c = Math.cos(rot), sn = Math.sin(rot);
  return (x, y) => { const X = x - 1.5, Y = y - 0.43; return [cx + s * (X * c - Y * sn), cy - s * (X * sn + Y * c)]; };
}
const TRICOL92 = [C.cyan, C.gold, C.mag, C.green, C.vio, C.orange];
function drawHat92(m, a, o = {}) {
  if (a <= 0) return [];
  const P = HAT92.map(p => m(p[0], p[1]));
  fillPoly(P, C.cyan, a * (o.fill == null ? 0.1 : o.fill));
  if (o.tri) TRIS92.forEach((t, k) => {
    const q = clamp(o.tri * 11 - k); if (q <= 0) return;
    const pts = t.map(i => P[i]);
    fillPoly(pts, TRICOL92[k % 6], a * q * (o.hl === k ? 0.45 : 0.12));
    strokePoly(pts, TRICOL92[k % 6], a * q * 0.75, 1.4);
    if (o.nums) { const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3, cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3; lbl('abcdefghijk'[k], cx, cy + 6, C.gold, a * q * o.nums, o.nsize || 16); }
  });
  if (o.hl != null && !o.tri) { const pts = TRIS92[o.hl].map(i => P[i]); fillPoly(pts, C.orange, a * 0.35); strokePoly(pts, C.orange, a, 2.2); }
  strokePoly(P, o.ec || C.white, a * (o.ea || 1), o.lw || 3);
  if (o.dots !== false) P.forEach((p, i) => dot(p[0], p[1], o.r || 7, 'c', a));
  if (o.labels) {
    const cx = P.reduce((s, p) => s + p[0], 0) / 13, cy = P.reduce((s, p) => s + p[1], 0) / 13;
    P.forEach((p, i) => { const dx = p[0] - cx, dy = p[1] - cy, L = Math.hypot(dx, dy) || 1; lbl(String(i), p[0] + dx / L * 24, p[1] + dy / L * 24 + 6, C.white, a * o.labels, o.ls || 17); });
  }
  return P;
}
function cell92(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
/* unit circle with spectral points [angle, colour-name, label] */
function specCirc92(cx, cy, r, a, pts, o = {}) {
  if (a <= 0) return;
  ring(cx, cy, r, C.dim, a * 0.7, 1.6);
  dashed(cx - r - 16, cy, cx + r + 16, cy, C.dim, a * 0.4, 1); dashed(cx, cy - r - 16, cx, cy + r + 16, C.dim, a * 0.4, 1);
  pts.forEach(([an, nm, lab, rr]) => { const x = cx + r * Math.cos(an), y = cy - r * Math.sin(an); dot(x, y, rr || 13, nm, a); if (lab) lbl(lab, cx + (r + 38) * Math.cos(an), cy - (r + 38) * Math.sin(an) + 7, C.white, a, o.ls || 17); });
}
function chipG(x, y, w, h, str, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); lblG(str, x, y + size * 0.36, col, a, size); }
const cm92 = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const ce92 = th => [Math.cos(th), Math.sin(th)];
function grid92(x, y, M, cw, a, o = {}) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((v, j) => {
    const col = v > 0 ? (o.pc || C.cyan) : v < 0 ? (o.nc || C.mag) : C.dim;
    box(x + j * cw, y + i * cw, cw - 3, cw - 3, col, a * (v === 0 ? 0.35 : 0.9), 1.2, v === 0 ? 'rgba(0,0,0,0.3)' : (v > 0 ? 'rgba(0,40,50,0.5)' : 'rgba(50,0,40,0.5)'));
    if (o.text !== false) lbl(v === 0 ? '0' : (v > 0 ? '+' : '−'), x + j * cw + (cw - 3) / 2, y + i * cw + (cw - 3) / 2 + 7, col, a * (v === 0 ? 0.5 : 1), o.size || 18);
  }));
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  drawHat92(hatMap92(470, 500, 95, 0.12 * Math.sin(t * 0.3)), s0, { fill: 0.12, tri: clamp((u - 1.5) / 3), labels: 0.8, r: 8 });
  const items = [['lifts the aperiodic hat tile into a unitary', 'V23 · HAT → UNITARY', 'x + D x*  →  U_D ∈ O(4) ,  M_D ∈ SU(2)', C.gold],
    ['measures its triangles and centres', 'V23 · TRIANGLES AND CENTRES', 'O = 5A − 7B + 3C  lies outside the hat', C.cyan],
    ['relaxes golden relations on a triangle complex', 'V23 · GOLDEN RELAXATION', 'min E = 2 − φ = 1/φ²', C.green],
    ['how two amplitudes and normalisation make three channels', 'V24 · TWO STATES , THREE CHANNELS', 'r₃ = −4√3 × signed area', C.mag]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  drawHat92(hatMap92(W / 2, 430, 78, 0.1 * Math.sin(t * 0.25)), rp * 0.9, { fill: 0.1, hl: 4, r: 7 });
  chip(330, 330, 340, 58, 'one reflection D', C.gold, rp, 22); chip(330, 415, 340, 58, 'eleven triangles', C.cyan, rp, 22); chip(330, 500, 340, 58, 'three channels', C.mag, rp, 22);
  box(1420, 320, 380, 200, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('orientation = normal', 1610, 385, C.green, rp, 22); lblG('r₃ = −4√3 · area', 1610, 455, C.white, rp, 28);
  txt(scramble('AURIC V23–V24 · MONOTILES', rp, 492), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V23–V24 · 单 原 型 瓦 片 、三 角 心 与 平 方 律', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 092 · AURIC_APERIODIC_MONOTILES_UNITARY_PROJECTIONS_TRIANGLE_CENTRES_AND_RECURSIVE_VARIATION_V23 · AURIC_TWO_BASIS_STATES_THREE_CHANNELS_PHASE_CHIRALITY_AND_RECURSIVE_SQUARE_LAW_V24', W / 2, 115, { size: 12, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 0 });
};

/* ---- 02 LIFT (V23 §1–2) ---- */
SCENES.lift = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [0, 'Stacking x minus D x star', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Pairing x with i x star', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Published work writes hat control points', 0.6) * f1;
    chip(530, 260, 860, 58, 'Λ_Hat = { x + D x* : (x, x*) ∈ Λ_CAP lattice , x* ∈ window }', C.cyan, q, 19);
    lbl('Baake–Gähler–Mazáč–Mitchell (J. Math. Phys. 2025) ; Baake et al. (Acta Cryst. A 2026)', 530, 318, C.dim, q, 14);
    const dq = Q(S, 0, 'where D is a reflection', 0.6) * f1;
    const dv = [['−11', '3√15'], ['3√15', '11']];
    dv.forEach((row, i) => row.forEach((v, j) => cell92(200 + j * 120, 360 + i * 80, 110, 70, v, j === i ? C.gold : C.cyan, dq, 22)));
    lbl('D = ( · ) / 16', 330, 545, C.white, dq, 20);
    lbl('Dᵀ = D ,  D² = I ,  det D = −1', 330, 585, C.gold, dq, 18);
    const uq = Q(S, 0, 'Stacking x minus D x star', 0.6) * f1;
    mgrid(520, 350, UD92.map(r => r.map(v => v.toFixed(2))), 100, 60, uq, { size: 18, colf: (v, i, j) => (j < 2 ? C.white : (i < 2 ? C.gold : C.mag)) });
    lbl('U_D = (1/√2) ( I  D ; I  −D )', 720, 630, C.white, uq, 19);
    lbl('U_D (x, x*) = (x + Dx* , x − Dx*) / √2', 720, 670, C.gold, uq, 18);
    lbl('|x + Dx*|² + |x − Dx*|² = 2(|x|² + |x*|²)', 720, 705, C.dim, uq, 15);
    lbl('§1 : a slice of a unitary may contract ; the rest of the norm sits in the dropped part', 530, 760, C.dim, Q(S, 0, 'gives an orthogonal', 0.6) * f1, 14);
    const oq = Q(S, 0, 'of order eight', 0.6) * f1;
    const sp = [[0, 'c', '1'], [Math.PI, 'm', '−1'], [Math.PI / 4, 'g', 'e^(iπ/4)'], [-Math.PI / 4, 'g', 'e^(−iπ/4)']];
    specCirc92(1430, 470, 175, uq, sp, { ls: 17 });
    lbl('spec U_D', 1430, 260, C.white, uq, 19);
    const k = Math.floor((u * 1.5) % 8), an = k * Math.PI / 4;
    arrow(1430, 470, 1430 + 150 * Math.cos(an), 470 - 150 * Math.sin(an), C.gold, oq, 3);
    lbl('U_D⁸ = I , order exactly 8 ,  U_D ∈ O(4)', 1430, 720, C.gold, oq, 19);
    lbl('as four amplitudes it lies in U(4)', 1430, 755, C.dim, oq, 15);
  }
  const q1 = Q(S, 1, 'Pairing x with i x star', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 58, 'z = x + i x*  ∈ ℂ²   (cross-space pairing)', C.cyan, q1, 21);
    const mq = Q(S, 1, 'the one-qubit gate I minus i D over root two', 0.6);
    chip(530, 345, 860, 62, 'M_D = (I − iD)/√2 = e^(−iπD/4) ∈ SU(2)', C.gold, mq, 24);
    const rq = Q(S, 1, 'returns the hat reprojection', 0.6);
    chip(530, 435, 860, 62, 'Re( M_D (x + i x*) ) = (x + D x*) / √2', C.green, rq, 24);
    lbl('M_D⁴ = −I ,  M_D⁸ = I', 530, 505, C.white, rq, 18);
    lbl('U_D itself : det_R = −1 and DJ = −JD , so no complex-linear gate on the native ℂ²', 530, 545, C.dim, rq, 14);
    const eq = Q(S, 1, 'But overlapping encoded states', 0.6);
    lbl('finite patch :  Ψ_R(q) = ( q/R , √(1 − |q|²/R²) ) ,  (U_D ⊕ 1) Ψ_R(q) = Ψ_R(U_D q)', 530, 620, C.white, eq, 15);
    lbl('reference mode : (π_D q)_j = R ⟨X_j⟩ / √(2 p_a)', 530, 655, C.dim, eq, 15);
    lbl('⟨ψ, Eψ⟩ = 1 and ⟨φ, Eφ⟩ = 0  ⇒  ψ ⊥ φ', 530, 705, C.gold, eq, 19);
    const px = 1060, py = 720, pw = 700, ph = 400, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, eq, '780 pairs of a 40-point patch (sorted)', '⟨Ψ_R(q), Ψ_R(r)⟩');
    line(px, yS(0), px + pw, yS(0), C.red, eq * 0.8, 2); lbl('0', px - 10, yS(0) + 6, C.red, eq, 15, 'right');
    dashed(px, yS(OVLB92), px + pw, yS(OVLB92), C.gold, eq, 1.6); lbl('bound 1 − 2M²/R² = ' + OVLB92.toFixed(3), px + pw - 6, yS(OVLB92) - 10, C.gold, eq, 15, 'right');
    lbl('1', px - 10, yS(1) + 6, C.dim, eq, 15, 'right');
    OVL92.forEach((v, i) => { const qq = clamp(eq * 1.6 - i / OVL92.length); dot(px + 10 + i * (pw - 20) / (OVL92.length - 1), yS(v), 6, 'c', qq); });
    lbl('all overlaps > 0 (min ' + OVLMIN92.toFixed(3) + ')', px + 30, yS(0.12), C.cyan, eq, 16, 'left');
    stamp('NO FREE WINDOW', 530, 790, Q(S, 1, 'deterministically by any single effect', 0.6), C.red, 30, -0.05);
  }
};

/* ---- 03 HAT (V23 §3, §9) ---- */
SCENES.hat = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [0, 'eleven triangles tile it', 'theory'], [1, null, 'classical'], [1, 'flipping a diagonal', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Triangles also choose weights', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'has thirteen corners', 0.6) * f1;
    const tq = Q(S, 0, 'eleven triangles tile it', 1.6) * f1;
    const m = hatMap92(500, 520, 100);
    drawHat92(m, clamp(u / 0.8) * f1, { fill: 0.08, tri: tq, nums: 1, labels: q, r: 8, nsize: 17 });
    lbl('lattice e₁ = (1, 0) , e₂ = (1/2, √3/2)', 500, 790, C.dim, q, 15);
    const lq = Q(S, 0, 'perimeter eight plus six root three', 0.6) * f1;
    chip(1410, 260, 760, 58, 'L = 8 + 6√3 ,   A = 8√3', C.gold, lq, 26);
    lbl('edges : eight of length 1 or 2 , six of length √3 ;  angles 90° … 270°', 1410, 320, C.dim, lq, 15);
    const bq = Q(S, 0, 'with doubled lattice areas summing to thirty-two', 0.6) * f1;
    bars63(1065, 640, DBL92, 46, 18, 34, tq, C.cyan, DBL92.map((v, i) => 'abcdefghijk'[i]));
    DBL92.forEach((v, i) => lbl(String(v), 1065 + i * 64 + 23, 640 - v * 34 - 10, C.white, tq, 16));
    lbl('doubled lattice area of each triangle', 1410, 410, C.cyan, tq, 16);
    chip(1410, 710, 760, 52, '2 + 4 + 2 + 3 + 3 + 1 + 3 + 6 + 2 + 4 + 2 = 32', C.green, bq, 20);
    lbl('area centroid (3/2, 0)_h  ≠  corner mean (20/13, 0)_h ;  no translation period under a forced hierarchy', 1410, 770, C.dim, bq, 14);
    const cq = bq;
    const Ca = m(1.5, 0), Cv = m(20 / 13 + 0, 0);
    dot(Ca[0], Ca[1], 10, 'r', cq); dot(Cv[0] + 6, Cv[1], 6, 'g', cq);
  }
  const q1 = Q(S, 1, 'Triangles also choose weights', 0.6, 0.3);
  if (q1 > 0) {
    const cq = Q(S, 1, 'Dirichlet energy is a sum of cotangents', 0.6);
    chip(530, 260, 860, 58, 'E = ½∫|∇z|² = ¼ Σ cot θᵢ |z_j − z_k|²', C.cyan, cq, 23);
    lbl('Pinkall–Polthier convention ; inner edge weight (cot α + cot β)/4', 530, 318, C.dim, cq, 14);
    const sc = 260, ox = 330, oy = 640, sFl = 0.2 + 0.2 * (0.5 + 0.5 * Math.sin(t * 0.9));
    const A = [ox, oy], Cc = [ox + sc, oy], B = [ox + FLIPB92[0] * sc, oy - FLIPB92[1] * sc], Dd = [ox + 0.5 * sc, oy + sFl * sc];
    const ccy = (FLIPB92[0] ** 2 + FLIPB92[1] ** 2 - FLIPB92[0]) / (2 * FLIPB92[1]), rad = Math.hypot(0.5, ccy);
    ring(ox + 0.5 * sc, oy - ccy * sc, rad * sc, C.dim, q1 * 0.8, 1.5);
    strokePoly([A, B, Cc, Dd], C.white, q1, 2.5);
    const fq = Q(S, 1, 'flipping a diagonal', 0.6);
    line(A[0], A[1], Cc[0], Cc[1], C.cyan, q1, 3); dashed(B[0], B[1], Dd[0], Dd[1], C.mag, fq, 3);
    [[A, 'A', -22, 8], [B, 'B', -20, -10], [Cc, 'C', 22, 8], [Dd, 'D', 22, 8]].forEach(([p, s, dx, dy]) => { dot(p[0], p[1], 9, 'w', q1); lbl(s, p[0] + dx, p[1] + dy, C.white, q1, 20); });
    lbl('circle ABC', ox + 0.5 * sc + rad * sc + 12, oy - ccy * sc, C.dim, q1, 15, 'left');
    lbl('diagonal AC (cyan) , BD (magenta)', 700, 700, C.dim, fq, 15, 'left');
    const inside = sFl < FLIPX92;
    lbl(inside ? 'D inside : BD is Delaunay' : 'D outside : AC is Delaunay', 700, 740, inside ? C.mag : C.cyan, fq, 17, 'left');
    chip(1410, 260, 760, 58, 'E_BD − E_AC = t² q Q / (4 s J L)', C.mag, fq, 24);
    lbl('A = (0,0) , C = (1,0) , B = (p,q) , D = (r,−s) ;  Q/q = power of D for circle ABC', 1410, 318, C.dim, fq, 14);
    const px = 1060, py = 770, pw = 700, ph = 340, s0 = 0.2, s1 = 1.4, v0 = -0.35, v1 = 0.3, xS = v => px + (v - s0) / (s1 - s0) * pw, yS = v => py - (v - v0) / (v1 - v0) * ph;
    const pq = Q(S, 1, 'changes it by t squared q Q', 0.8);
    plotAxes(px, py, pw, ph, pq, 's  (D = (1/2, −s) ; t = 1 , B = (0.4, 0.8))', 'E_BD − E_AC');
    fillBox(px, yS(0), xS(FLIPX92) - px, py - yS(0), C.red, pq * 0.08); fillBox(xS(FLIPX92), yS(v1), px + pw - xS(FLIPX92), yS(0) - yS(v1), C.green, pq * 0.08);
    line(px, yS(0), px + pw, yS(0), C.white, pq * 0.6, 1.2); lbl('0', px - 10, yS(0) + 6, C.white, pq, 15, 'right');
    const FL = FLIP92.filter(v => v[0] >= s0 - 1e-9);
    curve(p => { const i = Math.min(FL.length - 1, Math.round(p * (FL.length - 1))); return [xS(FL[i][0]), yS(FL[i][1])]; }, FL.length - 1, C.gold, pq, 3);
    dashed(xS(FLIPX92), py, xS(FLIPX92), py - ph, C.green, pq, 1.6); lbl('D on circle ABC : s = ' + FLIPX92.toFixed(3), xS(FLIPX92) + 10, py - 20, C.green, pq, 15, 'left');
    const near = FL.reduce((b, v) => Math.abs(v[0] - sFl) < Math.abs(b[0] - sFl) ? v : b);
    dot(xS(near[0]), yS(near[1]), 10, 'm', pq);
    stamp('DELAUNAY NEVER COSTS MORE', 420, 795, Q(S, 1, 'so the Delaunay diagonal never has more energy', 0.6), C.green, 24, -0.04);
  }
};

/* ---- 04 CENTRES (V23 §4–5) ---- */
SCENES.centres = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s = 46, mx = x => 470 + s * (x - 1.5), my = y => 250 + s * (3.6 - y);
  const m = (x, y) => [mx(x), my(y)];
  const a0 = clamp(u / 0.8);
  const P = HAT92.map(p => m(p[0], p[1]));
  fillPoly(P, C.cyan, a0 * 0.1); strokePoly(P, C.white, a0, 2.5);
  const T = [CEN92.A, CEN92.B, CEN92.C].map(p => m(p[0], p[1]));
  const tq = Q(S, 0, 'In hat triangle zero, four, six', 0.6);
  fillPoly(T, C.orange, a0 * (0.15 + 0.25 * tq)); strokePoly(T, C.orange, a0, 2.4);
  [['A = p₀', T[0], -14, -12, 'right'], ['B = p₄', T[1], -16, 40, 'right'], ['C = p₆', T[2], 14, -12, 'left']].forEach(([l, p, dx, dy, al]) => lbl(l, p[0] + dx, p[1] + dy, C.orange, a0, 16, al));
  const gq = Q(S, 0, 'the centroid minimises squared distances', 0.6), iq = Q(S, 0, 'the incentre maximises the nearest side', 0.6);
  const oq = Q(S, 0, 'circumcentre and orthocentre make two residual sums vanish', 0.6);
  const G = m(...CEN92.G), I = m(...CEN92.I), O = m(...CEN92.O), Hh = m(...CEN92.H);
  dot(G[0], G[1], 9, 'g', gq); lbl('G', G[0] + 12, G[1] - 10, C.gold, gq, 18, 'left');
  dot(I[0], I[1], 9, 'n', iq); lbl('I', I[0] + 4, I[1] + 30, C.green, iq, 18, 'center');
  ring(O[0], O[1], Math.sqrt(21) * s, C.mag, oq * 0.6, 1.5);
  dot(O[0], O[1], 11, 'm', oq); lbl('O = (1, 4)_h', O[0] + 16, O[1] + 6, C.mag, oq, 18, 'left');
  T.forEach(p => dashed(p[0], p[1], Hh[0], Hh[1], C.red, oq * 0.55, 1.4));
  dot(Hh[0], Hh[1], 11, 'r', oq); lbl('H = (5, −10)_h', Hh[0] + 18, Hh[1] + 6, C.red, oq, 18, 'left');
  const f1 = 1 - Q(S, 1, 'It and the orthocentre lie outside the whole hat', 0.6);
  if (f1 > 0) {
    const rows = [['centroid', 'G = argmin Σ |x − P|²', C.gold, gq], ['incentre', 'I = argmax min d(x, side)', C.green, iq], ['circumcentre', 'O : Σ (|x−P|² − |x−Q|²)² = 0', C.mag, oq], ['orthocentre', 'H : Σ ((x − A)·(B − C))² = 0', C.red, oq]];
    rows.forEach(([h, f, col, qq], i) => { const y = 250 + i * 92; box(1000, y, 790, 78, col, qq * f1, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1020, y + 30, col, qq * f1, 17, 'left'); lblG(f, 1395, y + 56, C.white, qq * f1, 22); });
    const cq = tq * f1;
    chip(1395, 660, 790, 58, 'O = 5A − 7B + 3C ,   H = −9A + 15B − 5C', C.mag, cq, 23);
    lbl('G = (7/3, −2/3)_h ;  O is at squared distance 21 from A, B, C but 39 from p₁ : no common circle', 1395, 720, C.dim, cq, 14);
    lbl('incentre weights a, b, c = 3, √21, √3 ;  inradius r = 2Δ/(a + b + c)', 1395, 750, C.dim, cq, 14);
  }
  const q1 = Q(S, 1, 'It and the orthocentre lie outside the whole hat', 0.6, 0.3);
  if (q1 > 0) {
    const pq = Q(S, 1, 'projection need not commute', 0.6);
    const ox = 1070, oy = 450, sc = 100;
    const t0 = [[0, 0], [2, 0], [1, 1]], t1 = [[0, 0], [2, 0], [1, 0.5]];
    const mp = p => [ox + p[0] * sc, oy - p[1] * sc];
    strokePoly(t0.map(mp), C.cyan, pq, 2.2); strokePoly(t1.map(mp), C.gold, pq, 2.2);
    const c0 = mp([1, 0]), c1 = mp([1, -0.75]);
    dot(c0[0], c0[1], 9, 'c', pq); dot(c1[0], c1[1], 9, 'g', pq);
    lbl('(1, 0)', c0[0] + 14, c0[1] - 8, C.cyan, pq, 15, 'left'); lbl('(1, −3/4)', c1[0] + 14, c1[1] + 6, C.gold, pq, 15, 'left');
    lbl('cyan : (0,0), (2,0), (1,1) , circumcentre (1, 0)', 1400, 300, C.cyan, pq, 15, 'left');
    lbl('gold : projected after a tilted embedding', 1400, 335, C.gold, pq, 15, 'left');
    lbl('its circumcentre (1, −3/4) ≠ projection (1, 0)', 1400, 370, C.gold, pq, 15, 'left');
    lbl('orthocentres (1, 1) → (1, 2) ; affine maps keep only G', 1400, 405, C.dim, pq, 15, 'left');
    const hq = Q(S, 1, 'A diagonal three-mode readout reaches only the convex hull', 0.6);
    chip(1395, 600, 790, 54, '(Tr ρX , Tr ρY) ∈ conv{A, B, C}  for X, Y diagonal', C.cyan, hq, 20);
    const tab = [['G', '1/3', '1/3', '1/3', 'IN', C.gold], ['I', BARY92.I[0].toFixed(2), BARY92.I[1].toFixed(2), BARY92.I[2].toFixed(2), 'IN', C.green], ['O', '5', '−7', '3', 'OUT', C.mag], ['H', '−9', '15', '−5', 'OUT', C.red]];
    lbl('weights on', 1180, 668, C.dim, hq, 15, 'right'); ['A', 'B', 'C'].forEach((h, k) => lbl(h, 1275 + k * 95, 668, C.orange, hq, 16)); lbl('hull', 1690, 668, C.dim, hq, 15);
    tab.forEach((r, i) => {
      const qq = clamp(hq * 1.6 - i / 6) * (i < 2 ? 1 : Q(S, 1, 'these two are not', 0.6) * 0.5 + 0.5), y = 680 + i * 34;
      lbl(r[0], 1050, y + 22, r[5], qq, 19); [1, 2, 3].forEach(k => lbl(r[k], 1180 + k * 95, y + 22, String(r[k]).startsWith('−') ? C.red : C.white, qq, 18));
      lbl(r[4], 1690, y + 22, r[4] === 'IN' ? C.green : C.red, qq, 18);
    });
  }
};

/* ---- 05 TURNS (V23 §5, §5.1, §10) ---- */
SCENES.turns = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'A lifted orbit over base period p', 'lean']]);
  const f1 = 1 - Q(S, 1, 'Three halves is not an algebraic integer', 0.6);
  if (f1 > 0) {
    const kq = Q(S, 0, 'The native golden gate K has order ten', 0.6) * f1;
    const om = 3 * Math.PI / 5;
    specCirc92(320, 470, 150, kq, [[om, 'g', 'ω ×3'], [2 * om, 'm', 'ω² ×2']], { ls: 16 });
    const n = Math.floor((u * 1.6) % 10);
    arrow(320, 470, 320 + 120 * Math.cos(n * om), 470 - 120 * Math.sin(n * om), C.gold, kq, 2.5);
    lbl('K = ω[I + (ω − 1)P] , ω = e^(3πi/5)', 320, 270, C.white, kq, 16);
    chip(320, 700, 400, 54, 'K¹⁰ = I , K⁵ = 2P − I', C.gold, kq, 22);
    const nq = Q(S, 0, 'the hat completion is no power of it', 0.6) * f1;
    specCirc92(760, 470, 150, nq, [[0, 'c', '1 ×2'], [Math.PI, 'c', '−1'], [Math.PI / 4, 'c', ''], [-Math.PI / 4, 'c', '']]);
    lbl('U_D ⊕ 1 : four distinct', 760, 270, C.white, nq, 16);
    chipG(760, 700, 400, 54, 'U_D ⊕ 1 ≠ c V Kⁿ V⁻¹', C.red, nq, 22);
    lbl('every Kⁿ has at most two distinct eigenvalues', 540, 770, C.dim, nq, 15);
    const rq = Q(S, 0, 'the hat gate and its sixty-degree turn', 0.6) * f1;
    const cx = 1390, cy = 480, R = 170;
    ring(cx, cy, R, C.dim, rq * 0.6, 1.5);
    const a0 = Math.atan2(DD92a[1], DD92a[0]);
    [[a0, C.gold, 'D₀ = D mirror'], [a0 + Math.PI / 3, C.mag, 'D₁ = R₆₀ D R₆₀ᵀ']].forEach(([an, col, lab], i) => { line(cx - R * Math.cos(an), cy + R * Math.sin(an), cx + R * Math.cos(an), cy - R * Math.sin(an), col, rq, 3.5); lbl(lab, cx + (R + 20) * Math.cos(an) + (i ? -10 : 10), cy - (R + 20) * Math.sin(an) - 6, col, rq, 17, i ? 'right' : 'left'); });
    lbl('60°', cx + 60 * Math.cos(a0 + Math.PI / 6), cy - 60 * Math.sin(a0 + Math.PI / 6) + 6, C.white, rq, 16);
    const tq = Q(S, 0, 'have product trace three halves', 0.6) * f1;
    chip(1390, 710, 740, 54, 'tr(D₀D₁) = −1  ⇒  tr(M₀M₁) = 3/2', C.green, tq, 22);
    lbl('M_j = (I − iD_j)/√2 , each of order 8', 1390, 770, C.dim, tq, 15);
  }
  const q1 = Q(S, 1, 'Three halves is not an algebraic integer', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 56, '3/2 ∉ ℤ : not an algebraic integer  ⇒  M₀M₁ has infinite order', C.gold, q1, 20);
    const cq = Q(S, 1, 'so the product has infinite order', 0.6);
    const cx = 330, cy = 440, R = 120;
    ring(cx, cy, R, C.dim, cq * 0.7, 1.5);
    CANG92.forEach((an, i) => { const qq = clamp(cq * 2 - i / CANG92.length); dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 7, i < 8 ? 'g' : 'c', qq); });
    lbl('angles nθ , θ = arccos(3/4) , n ≤ 60', cx, cy + R + 36, C.dim, cq, 15);
    const dq = Q(S, 1, 'their words are dense in S U two', 0.6);
    chip(760, 400, 330, 54, '⟨M₀ , M₁⟩ = SU(2)', C.green, dq, 22);
    lbl('closure of positive words', 760, 455, C.dim, dq, 15);
    lbl('(inverses = seventh powers)', 760, 480, C.dim, dq, 15);
    const px = 1060, py = 560, pw = 700, ph = 270, xS = l => px + (l - 1) / 15 * pw, yS = v => py - v / 3 * ph;
    plotAxes(px, py, pw, ph, dq, 'word length ≤ ℓ  (1 … 16)', 'distance to 300 random targets (rad)');
    curve(p => { const l = 1 + p * 15, i = Math.round(p * 15); return [xS(l), yS(COVMAX92[i])]; }, 15, C.mag, dq, 3);
    curve(p => { const l = 1 + p * 15, i = Math.round(p * 15); return [xS(l), yS(COVMEAN92[i])]; }, 15, C.cyan, dq, 3);
    lbl('magenta : worst target , ' + COVMAX92[15].toFixed(2) + ' rad at ℓ = 16', px + 260, py - 190, C.mag, dq, 15, 'left'); lbl('cyan : mean , ' + COVMEAN92[15].toFixed(2) + ' rad', px + 260, py - 162, C.cyan, dq, 15, 'left');
    const lq = Q(S, 1, 'A lifted orbit over base period p', 0.6);
    box(150, 640, 1640, 170, C.green, lq, 2, 'rgba(0,40,20,0.4)');
    lbl('T(x, a) = (f x , a + c(x)) ,  h = S_p(x) = c(x) + … + c(f^(p−1) x)', 560, 690, C.white, lq, 18);
    chip(560, 755, 680, 54, 'minimal period of (x, a) = p · ord(h)', C.green, lq, 23);
    lbl('Lean (frozen) : SkewAdditiveReturn.skew_minimalPeriod', 1340, 690, C.green, lq, 16);
    lbl('infinite order ⇒ no return ;  fibre K^q ⇒ p · 10 / gcd(10, q)', 1340, 730, C.dim, lq, 15);
    lbl('recomputed on 30 random cyclic skew products', 1340, 765, C.dim, lq, 15);
    // base cycle animation
    const p = 3, qo = 4, k = Math.floor(u * 2) % (p * qo);
    for (let i = 0; i < p * qo; i++) { const an = -Math.PI / 2 + TAU * i / (p * qo); dot(1730 + 26 * Math.cos(an), 740 + 26 * Math.sin(an), i === k ? 7 : 4, i === k ? 'g' : 'n', lq * (i === k ? 1 : 0.5)); }
  }
};
const DD92a = (() => { const d = UD92; /* +1 eigenvector of D: columns */ const D = [[-11 / 16, 3 * Math.sqrt(15) / 16], [3 * Math.sqrt(15) / 16, 11 / 16]]; const v = [D[0][1], 1 - D[0][0]]; const L = Math.hypot(v[0], v[1]); return [v[0] / L, v[1] / L]; })();

/* ---- 06 RELAX (V23 §6–8) ---- */
const MESH92 = { V: [[0, 0], [1, 0], [0.5, 0.87], [-0.5, 0.87], [-1, 0], [-0.5, -0.87], [0.5, -0.87]], E: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1]], inner: [0] };
SCENES.relax = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'With the golden gate', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On a triangle complex', 0.6) * f1;
    const cx = 470, cy = 520, R = 220, mp = p => [cx + R * p[0], cy - R * p[1]];
    const eq = Q(S, 0, 'eliminating hidden vertices', 0.6) * f1;
    MESH92.E.forEach(([i, j], k) => { const A = mp(MESH92.V[i]), B = mp(MESH92.V[j]); const inner = i === 0; line(A[0], A[1], B[0], B[1], inner ? C.gold : C.cyan, q * (inner ? 1 - 0.75 * eq : 0.85), 2.5); });
    const uq = Q(S, 0, 'every edge a unitary', 0.6) * f1;
    MESH92.E.forEach(([i, j], k) => { if (k % 2) return; const A = mp(MESH92.V[i]), B = mp(MESH92.V[j]); lbl('U' + (k + 1), (A[0] + B[0]) / 2 + 12, (A[1] + B[1]) / 2 - 6, C.dim, uq * (i === 0 ? 1 - 0.75 * eq : 1), 14, 'left'); });
    MESH92.V.forEach((v, i) => { const p = mp(v), inner = i === 0; for (let k = 0; k < 5; k++) dot(p[0] - 20 + k * 10, p[1] - 22, 4, inner ? 'g' : 'c', q * (inner ? 1 - 0.8 * eq : 0.9)); dot(p[0], p[1], 12, inner ? 'g' : 'c', q * (inner ? 1 - 0.8 * eq : 1)); });
    lbl('boundary B : cyan  ·  hidden interior : gold  ·  five modes per vertex', cx, 805, C.dim, q, 15);
    chip(1395, 260, 790, 56, 'E(ψ) = Σ_e w_e |ψ_v − U_vu ψ_u|²', C.cyan, uq, 23);
    const gq = Q(S, 0, 'The mismatch energy is gauge invariant', 0.6) * f1;
    lblG('ψ_v → G_v ψ_v , U_vu → G_v U_vu G_u⁻¹  :  E unchanged ;  E = 0 ⇔ loops fix a common vector', 1395, 318, C.dim, gq, 15);
    const sq = Q(S, 0, 'one Schur complement', 0.6) * f1;
    chip(1395, 380, 790, 56, 'S = L_BB − L_BI L_II⁻¹ L_IB ≥ 0', C.gold, sq, 24);
    const oq = Q(S, 0, 'the same in any order', 0.6) * f1;
    const by = 660, hs = 26;
    SCHUR92.forEach((v, i) => { const qq = clamp(oq * 1.6 - i / 16), x = 1030 + i * 30; fillBox(x, by - v * hs, 12, v * hs, C.gold, qq * 0.5); rect63(x, by - v * hs, 12, v * hs, C.gold, qq, 1.2); fillBox(x + 13, by - SCHUR92B[i] * hs, 12, SCHUR92B[i] * hs, C.cyan, qq * 0.5); rect63(x + 13, by - SCHUR92B[i] * hs, 12, SCHUR92B[i] * hs, C.cyan, qq, 1.2); });
    line(1020, by, 1400, by, C.dim, oq, 1.2);
    lbl('eigenvalues of S : one-shot (gold) vs layered 4 → 5 → 6 (cyan)', 1215, by + 30, C.dim, oq, 14);
    lbl('random 7-vertex complex , ℂ³ fibres ;', 1430, 520, C.dim, oq, 15, 'left'); lbl('three elimination orders agree', 1430, 548, C.white, oq, 15, 'left'); lbl('to 10⁻⁹', 1430, 576, C.dim, oq, 15, 'left');
    stamp('RECURSION = VARIATION = OPTIMISATION', 1395, 760, Q(S, 0, 'recursion, variation and optimisation coincide', 0.6) * f1, C.green, 20, -0.03);
  }
  const q1 = Q(S, 1, 'With the golden gate', 0.6, 0.3);
  if (q1 > 0) {
    const pq = Q(S, 1, 'paths I and K to the fifth average to the projection P', 0.6);
    chip(530, 260, 860, 56, '|b − a|² + |b − K⁵a|² = 2|b − Pa|² + 2|(I − P)a|²', C.gold, pq, 20);
    lbl('b* = P a ;  a = |2⟩ : |Pa|² = 1/φ² , minimum 2/φ = 1.236', 530, 318, C.dim, pq, 16);
    const tq = Q(S, 1, 'A unit-weight triangle with transports I, I and K', 0.6);
    const V = [[330, 690], [730, 690], [530, 390]];
    strokePoly(V, C.cyan, tq * 0.5, 1);
    lane(V[0], V[1], 0, C.cyan, tq, '', 3); lane(V[1], V[2], 0, C.cyan, tq, '', 3); lane(V[2], V[0], 0, C.gold, tq, '', 3);
    lbl('I', 530, 725, C.cyan, tq, 24); lbl('I', 660, 525, C.cyan, tq, 24); lbl('K', 395, 525, C.gold, tq, 26);
    [['ψ₀', V[0], -30, 30], ['ψ₁', V[1], 30, 30], ['ψ₂', V[2], 0, -20]].forEach(([l, p, dx, dy]) => { dot(p[0], p[1], 14, 'c', tq); lblG(l, p[0] + dx, p[1] + dy, C.white, tq, 24); });
    lbl('E = |ψ₁ − ψ₀|² + |ψ₂ − ψ₁|² + |ψ₀ − Kψ₂|² ,  Σ|ψ_j|² = 1', 530, 785, C.dim, tq, 15);
    const eq = Q(S, 1, 'has least normalised energy two minus phi', 0.6);
    const px = 1060, py = 720, pw = 700, ph = 380, yS = v => py - v / 4.2 * ph;
    plotAxes(px, py, pw, ph, eq, '', 'energy');
    lbl('15 eigenvalues of the triangle Laplacian', px + pw / 2, py + 30, C.dim, eq, 15);
    dashed(px, yS(GTRI92[0]), px + pw, yS(GTRI92[0]), C.gold, eq, 1.6); lbl('2 − φ = 1/φ² = 0.382  ×3', px + 20, py - 210, C.gold, eq, 17, 'left'); line(px + 70, py - 200, px + 55, yS(GTRI92[0]) - 4, C.gold, eq, 1.2);
    const dq = Q(S, 1, 'on a three-dimensional space', 0.6);
    GTRI92.forEach((v, i) => { const qq = clamp(eq * 1.6 - i / 18), x = px + 16 + i * 45, low = i < 3; fillBox(x, yS(v), 32, py - yS(v), low ? C.gold : C.cyan, qq * (low ? 0.4 + 0.4 * dq : 0.35)); rect63(x, yS(v), 32, py - yS(v), low ? C.gold : C.cyan, qq, 1.4); });
    lbl('ground space ψ_j = e^(−ijπ/5) u/√3 , u ∈ ker P : dim 3', px + pw / 2, py + 62, C.gold, dq, 16);
    lbl('with only the channel ω⁻¹K the least energy would be 0 : the phase matters', px + pw / 2, py + 92, C.dim, dq, 14);
  }
};

/* ---- 07 THREE (V24 §1–3) ---- */
SCENES.three = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'classical'], [1, 'But two fixed coordinates', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Two complex amplitudes do give three real coordinates', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On the five modes', 0.6) * f1;
    pyrTrue(440, 540, 330, 0.55 + t * 0.15, q, { fill: 0.12 });
    lbl('X = p₁ + p₁₃ ,  Y = p₃ + p₁₃ ,  Z = p₂', 440, 790, C.dim, q, 16);
    const sq = Q(S, 0, 'X plus Y plus Z equals one minus p zero plus p thirteen', 0.6) * f1;
    chip(1395, 260, 790, 58, 'X + Y + Z = 1 − p₀ + p₁₃', C.gold, sq, 28);
    const PA = [0.5, 0.25, 0, 0.25, 0], PB = [0, 0.25, 0.5, 0.25, 0], labs = ['0', '1', '2', '3', '13'];
    bars63(1030, 540, PA, 46, 12, 360, sq, C.cyan, labs); bars63(1440, 540, PB, 46, 12, 360, sq, C.mag, labs);
    lbl('X = Y = 1/4 ,  Z = 0', 1175, 610, C.cyan, sq, 16); lbl('X = Y = 1/4 ,  Z = 1/2', 1585, 610, C.mag, sq, 16);
    lbl('two pure states (amplitudes √p) with the same X , Y', 1395, 335, C.dim, sq, 15);
    const zq = Q(S, 0, 'between zero and one minus the larger of X and Y', 0.6) * f1;
    chip(1395, 680, 790, 54, '0 ≤ Z ≤ 1 − max(X, Y)', C.green, zq, 24);
    lbl('I , X̂ , Ŷ , Ẑ are linearly independent : no two means fix the third on all states', 1395, 740, C.dim, zq, 14);
  }
  const q1 = Q(S, 1, 'Two complex amplitudes do give three real coordinates', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 56, 'r = ( 2 Re α*β , 2 Im α*β , |α|² − |β|² ) ,  |r| = 1', C.cyan, q1, 20);
    const hq = Q(S, 1, 'the Hopf map lands on the Bloch sphere', 0.6);
    lbl('S³ / U(1)  ≅  ℂP¹  ≅  S²  :  the fibre is a whole circle', 530, 318, C.white, hq, 17);
    const sq = Q(S, 1, 'But two fixed coordinates leave the third up to sign', 0.6);
    const cx = 530, cy = 560, R = 190, th = 0.9, ph = 0.7 + 0.15 * Math.sin(t);
    qubit(cx, cy, R, th, ph, hq, C.gold);
    qubit(cx, cy, R, Math.PI - th, ph, sq, C.mag);
    lbl('r₃ = +√(1 − r₁² − r₂²)', cx + R + 20, cy - 120, C.gold, sq, 17, 'left'); lbl('r₃ = −√(1 − r₁² − r₂²)', cx + R + 20, cy + 150, C.mag, sq, 17, 'left');
    lbl('same r₁ , r₂', cx - R - 20, cy + 6, C.white, sq, 17, 'right');
    const lq = Q(S, 1, 'the inverse is not Lipschitz at the rim', 0.6);
    const px = 1180, py = 720, pw = 560, ph2 = 330, xS = v => px + v * pw, yS = v => py - v * ph2;
    plotAxes(px, py, pw, ph2, lq, 'r₁  (r₂ = 0)', 'r₃ = √(1 − r₁²)');
    curve(p => { const i = Math.round(p * (RIM92.length - 1)); return [xS(RIM92[i][0]), yS(RIM92[i][1])]; }, RIM92.length - 1, C.gold, lq, 3);
    dashed(xS(1), py, xS(1), py - ph2, C.red, lq, 1.6);
    lbl('slope → ∞ at the rim', xS(0.62), yS(0.3), C.red, lq, 16, 'right');
    lbl('ε = 10⁻⁶ : Δr₃ / Δr₁ = 1414', px + pw / 2, py + 60, C.dim, lq, 15);
    lbl('1 − |r|² = 4(ab − |c|²) : a mixed slice is a hidden Gram determinant', 1460, 300, C.dim, lq, 14);
  }
};

/* ---- 08 CLIFFORD (V24 §4) ---- */
SCENES.clifford = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Three real anticommuting reflections build a complex structure', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two anticommuting reflections A and B', 0.6) * f1;
    const mats = [['A = σ_z', [['1', '0'], ['0', '−1']], C.cyan], ['B = σ_x', [['0', '1'], ['1', '0']], C.gold], ['C = −iAB', [['0', '−i'], ['i', '0']], C.mag]];
    const cq = Q(S, 0, 'C equals minus i A B', 0.6) * f1;
    mats.forEach(([h, M, col], k) => { const qq = k < 2 ? q : cq, x = 170 + k * 260; lbl(h, x + 90, 300, col, qq, 20); M.forEach((row, i) => row.forEach((v, j) => cell92(x + j * 92, 330 + i * 72, 86, 64, v, col, qq, 22))); });
    lbl('AB = iC ,  BC = iA ,  CA = iB', 530, 520, C.white, cq, 20);
    const gq = Q(S, 0, 'with Gram determinant', 0.6) * f1;
    chip(530, 600, 860, 58, 'G = ( 1 − x² , iz − xy ; −iz − xy , 1 − y² ) ⪰ 0', C.gold, gq, 21);
    chip(530, 680, 860, 58, 'det G = 1 − x² − y² − z²', C.green, gq, 26);
    lbl('Var A + Var B + Var C = 3 − |r|² ≥ 2', 530, 745, C.dim, gq, 15);
    const mq = Q(S, 0, 'measuring A then B never reads z', 0.6) * f1;
    const px = 1080, py = 560, pw = 680, ph = 170, yS = v => py - v * ph;
    plotAxes(px, py + ph, pw, 2 * ph, mq, '12 random states', '');
    line(px, py, px + pw, py, C.dim, mq, 1.2);
    SEQZ92.forEach((r, i) => { const qq = clamp(mq * 1.6 - i / 14), x = px + 20 + i * 54; fillBox(x, Math.min(py, yS(r[0])), 22, Math.abs(r[0]) * ph, C.mag, qq * 0.5); rect63(x, Math.min(py, yS(r[0])), 22, Math.abs(r[0]) * ph, C.mag, qq, 1.3); line(x + 24, py, x + 46, py, C.red, qq, 4); });
    lbl('z = Tr ρC  (magenta)', px + 10, py - ph - 18, C.mag, mq, 16, 'left'); lbl('A then B : product mean 0 (red)', px + pw, py - ph - 18, C.red, mq, 16, 'right');
    chip(1420, 300, 680, 54, 'P_a B P_a = 0 ,  P_a = (I + aA)/2', C.red, mq, 21);
    lbl('z = Im Tr(ρAB) needs a coherent correlation readout', 1420, 800, C.dim, mq, 15);
  }
  const q1 = Q(S, 1, 'Three real anticommuting reflections build a complex structure', 0.6, 0.3);
  if (q1 > 0) {
    const gs = [['A₁', A192], ['A₂', A292], ['A₃', A392]];
    gs.forEach(([h, M], k) => { const x = 140 + k * 180; lbl(h, x + 74, 285, C.cyan, q1, 20); grid92(x, 300, M, 37, q1, { size: 16 }); });
    const jq = Q(S, 1, 'J equals A one A two A three', 0.6);
    lbl('J', 740 + 74, 285, C.gold, jq, 22); grid92(740, 300, J92, 37, jq, { pc: C.gold, nc: C.red, size: 16 });
    chip(530, 520, 860, 58, 'J = A₁A₂A₃ :  J² = −I ,  Jᵀ = −J ,  J A_i = A_i J', C.gold, jq, 22);
    lbl('h(u, v) = g(u, v) − i g(u, Jv) is a positive complex inner product ; A₃ = −i A₁A₂', 530, 580, C.dim, jq, 14);
    const dq = Q(S, 1, 'on at least four real dimensions', 0.6);
    chip(530, 660, 860, 56, 'dim_R V = 4m :  smallest model ℝ⁴ ≅ ℂ²', C.green, dq, 22);
    lbl('two reflections alone : AB anticommutes with A , B — not a compatible structure', 530, 720, C.dim, dq, 14);
    const oq = Q(S, 1, 'Five modes are odd', 0.6);
    const px = 1080, py = 760, pw = 620, ph = 420, xS = v => px + v * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, oq, 'w = Tr ρΠ', '|r|');
    const cq = Q(S, 1, 'r squared at most w squared', 0.6);
    fillPoly([[xS(0), yS(0)], [xS(1), yS(1)], [xS(1), yS(0)]], C.cyan, cq * 0.12);
    line(xS(0), yS(0), xS(1), yS(1), C.gold, cq, 2.5); lbl('|r| = w', xS(0.88), yS(0.95), C.gold, cq, 17, 'right');
    CONE92.forEach((p, i) => dot(xS(p[0]), yS(p[1]), 5, 'c', clamp(oq * 1.5 - i / CONE92.length)));
    lbl('ℂ⁵ is odd : no two anticommuting involutions on it', 1390, 290, C.white, oq, 16);
    lbl('Paulis on a 2-dim block Π ; 400 random five-mode states', 1390, 318, C.dim, oq, 14);
    lbl('|r|² ≤ w²', xS(0.25), yS(0.7), C.gold, cq, 24);
  }
};

/* ---- 09 TRINE (V24 §5) ---- */
SCENES.trine = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [0, 'the phased outputs close a triangle', 'theory'], [1, null, 'theory']]);
  const w3 = j => ce92(-2 * Math.PI * j / 3);
  const f1 = 1 - Q(S, 1, 'The plane coordinates follow', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A Fourier map sends two amplitudes to three', 0.6) * f1;
    chip(530, 260, 860, 58, 'a_j = (α + ω⁻ʲ β)/√3 ,  ω = e^(2πi/3)', C.gold, q, 23);
    lbl('standard trine POVM , Caves–Fuchs–Manne–Renes ; E_j = (I + n_j·σ)/3 , n_j at 120°', 530, 318, C.dim, q, 14);
    chip(220, 470, 150, 64, 'α', C.cyan, q, 30); chip(220, 600, 150, 64, 'β', C.cyan, q, 30);
    box(390, 420, 200, 230, C.vio, q, 2, 'rgba(20,10,40,0.5)'); lbl('F₃ ⊕ I₂', 490, 545, C.vio, q, 22);
    arrow(298, 470, 385, 500, C.cyan, q, 2.5); arrow(298, 600, 385, 570, C.cyan, q, 2.5);
    [['a₀ → |1⟩', 440], ['a₁ → |3⟩', 535], ['a₂ → |2⟩', 630]].forEach(([s, y], j) => { arrow(595, y, 680, y, TRICOL92[j], q, 2.5); lbl(s, 690, y + 7, TRICOL92[j], q, 20, 'left'); });
    lbl('X = q₀ , Y = q₁ , Z = q₂ ;  p₀ = p₁₃ = 0', 530, 730, C.white, q, 17);
    const cq = Q(S, 0, 'the phased outputs close a triangle', 0.6) * f1;
    chip(530, 790, 860, 50, 'a₀ + ω²a₁ + ω a₂ = 0', C.green, cq, 22);
    const th = 0.8 + 0.3 * Math.sin(0.5 * t), ph = 0.6 * t;
    const al = [Math.cos(th / 2), 0], be = cm92(ce92(ph), [Math.sin(th / 2), 0]);
    const tj = [0, 1, 2].map(j => { const a = [(al[0] + cm92(w3(j), be)[0]) / Math.sqrt(3), (al[1] + cm92(w3(j), be)[1]) / Math.sqrt(3)]; return cm92(w3(j), a); });
    const sc = 330, cxT = 1250, cyT = 520, gx = (2 * tj[0][0] + tj[1][0]) / 3, gy = (2 * tj[0][1] + tj[1][1]) / 3, ox = cxT - sc * gx, oy = cyT + sc * gy;
    const p0 = [ox, oy], p1 = [ox + sc * tj[0][0], oy - sc * tj[0][1]], p2 = [p1[0] + sc * tj[1][0], p1[1] - sc * tj[1][1]];
    const ar = 0.5 * (tj[0][0] * tj[1][1] - tj[0][1] * tj[1][0]);
    fillPoly([p0, p1, p2], ar < 0 ? C.gold : C.mag, cq * 0.18);
    [[p0, p1], [p1, p2], [p2, p0]].forEach(([A, B], j) => { arrow(A[0], A[1], B[0], B[1], TRICOL92[j], cq, 3); });
    const qs = tj.map(z => z[0] * z[0] + z[1] * z[1]);
    bars63(1600, 720, qs, 40, 14, 400, cq, C.cyan, ['q₀', 'q₁', 'q₂']);
    lbl('squared sides = q_j', 1680, 790, C.cyan, cq, 16);
    lbl('q_j = (1 + n_j·r)/3 ,  Σ q_j² ≤ 1/2', 1250, 790, C.dim, cq, 15);
  }
  const q1 = Q(S, 1, 'The plane coordinates follow', 0.6, 0.3);
  if (q1 > 0) {
    const nq = Q(S, 1, 'the hidden normal sits in the triangle', 0.6);
    TRPAIR92.forEach((pts, k) => {
      const ox = 200 + k * 400, oy = 540, sc = 420, P = pts.map(p => [ox + sc * p[0], oy - sc * p[1]]);
      fillPoly(P, k ? C.mag : C.gold, q1 * (0.1 + 0.15 * nq));
      [[P[0], P[1]], [P[1], P[2]], [P[2], P[0]]].forEach(([A, B], j) => arrow(A[0], A[1], B[0], B[1], TRICOL92[j], q1, 3));
      lbl(k ? 'ψ = (0, 1) : r₃ = −1' : 'ψ = (1, 0) : r₃ = +1', ox + 120, k ? 780 : 780, k ? C.mag : C.gold, nq, 17);
      lbl(k ? 'signed area +1/(4√3)' : 'signed area −1/(4√3)', ox + 120, 805, C.dim, nq, 15);
    });
    lbl('same q = (1/3, 1/3, 1/3) , opposite orientation', 530, 262, C.white, q1, 17);
    const aq = Q(S, 1, 'r three equals minus four root three times the signed area', 0.6);
    chip(1395, 260, 790, 58, 'r₃ = −4√3 · A_signed ,  16Δ² = 1 − 2Σ q_j²', C.gold, aq, 22);
    const px = 1080, py = 690, pw = 620, ph = 330, xS = v => px + (v + 1) / 2 * pw, yS = v => py - (v + 1) / 2 * ph;
    plotAxes(px, py, pw, ph, aq, '−4√3 × signed area', 'r₃');
    line(xS(-1), yS(-1), xS(1), yS(1), C.gold, aq * 0.6, 1.5);
    TRP92.forEach((p, i) => dot(xS(p[0]), yS(p[1]), 5, 'c', clamp(aq * 1.5 - i / TRP92.length)));
    lbl('150 random pure states', px + 20, py - ph + 20, C.cyan, aq, 15, 'left');
    const bq = Q(S, 1, 'Any three-outcome qubit reader', 0.6);
    chip(1395, 790, 790, 52, 'any 3-outcome POVM :  (I ± n·σ)/2 give equal statistics', C.red, bq, 19);
  }
};

/* ---- 10 SQUARE (V24 §6–7) ---- */
SCENES.square = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Golden gates have three frequencies', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A non-negative calibration of squared amplitudes', 0.6) * f1;
    const sq = Q(S, 0, 'sums to one over every three-way split', 0.6) * f1;
    const bx = 160, bw = 740;
    fillBox(bx, 300, bw, 50, C.white, q * 0.25); rect63(bx, 300, bw, 50, C.white, q, 2); lbl('|a|² = 1', bx + bw / 2, 334, C.white, q, 20);
    const sp = [0.35, 0.25, 0.4], cols = [C.cyan, C.gold, C.mag], names = ['s', 't', 'u'];
    let xx = bx; sp.forEach((v, i) => { fillBox(xx, 400, v * bw - 6, 50, cols[i], sq * 0.35); rect63(xx, 400, v * bw - 6, 50, cols[i], sq, 2); lbl(names[i], xx + v * bw / 2, 434, cols[i], sq, 22); xx += v * bw; });
    const mq = Q(S, 0, 'is the identity', 0.6) * f1;
    fillBox(bx, 500, 0.6 * bw - 6, 50, C.green, mq * 0.35); rect63(bx, 500, 0.6 * bw - 6, 50, C.green, mq, 2); lbl('s + t', bx + 0.3 * bw, 534, C.green, mq, 22);
    fillBox(bx + 0.6 * bw, 500, 0.4 * bw - 6, 50, C.mag, mq * 0.35); rect63(bx + 0.6 * bw, 500, 0.4 * bw - 6, 50, C.mag, mq, 2); lbl('u', bx + 0.8 * bw, 534, C.mag, mq, 22);
    chip(530, 620, 860, 56, 'f(s) + f(t) + f(u) = 1  for all s + t + u = 1', C.gold, sq, 22);
    chip(530, 700, 860, 56, '⇒ f(s + t) = f(s) + f(t)  ⇒  f(s) = s ,  p = |a|²', C.green, mq, 22);
    lbl('no continuity assumed : additivity + non-negativity', 530, 760, C.dim, mq, 15);
    const tq = Q(S, 0, 'two-way normalisation alone allows', 0.6) * f1;
    const px = 1100, py = 720, pw = 560, ph = 400, xS = v => px + v * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, mq, 's', 'f(s)');
    line(xS(0), yS(0), xS(1), yS(1), C.green, mq, 3); lbl('f(s) = s', xS(0.55), yS(0.6) - 12, C.green, mq, 17, 'right');
    curve(p => { const i = Math.round(p * (FBAD92.length - 1)); return [xS(FBAD92[i][0]), yS(FBAD92[i][1])]; }, FBAD92.length - 1, C.red, tq, 3);
    dot(xS(0.75), yS(0.9), 11, 'r', tq); lbl('f(3/4) = 9/10', xS(0.75) - 14, yS(0.9) - 18, C.red, tq, 17, 'right');
    lbl('s² / (s² + (1 − s)²) : f(s) + f(1 − s) = 1', 1380, 270, C.red, tq, 16);
    lbl('but f(1/2) + 2 f(1/4) = 0.70 ≠ 1', 1380, 300, C.red, tq, 16);
    lbl('trine frame functions (Caves–Fuchs–Manne–Renes) : F = (1 + r·n)/3', 1380, 790, C.dim, tq, 14);
  }
  const q1 = Q(S, 1, 'Golden gates have three frequencies', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 56, 'R(s) = s³ − x²s² + x²s − 1 = (s − 1)(s − ζ)(s − ζ*)', C.cyan, q1, 19);
    lbl('U = ζ[(I − Q) + ζQ] , ζ = e^(3πi/5) , x = 1/φ :  a_t = a + bζᵗ + b*ζ⁻ᵗ', 530, 318, C.dim, q1, 14);
    const fq = Q(S, 1, 'obey a four-time law', 0.6);
    chip(530, 400, 860, 66, 'a₃ + x² a₁  =  a₀ + x² a₂', C.gold, fq, 32);
    lbl('also (1/10) Σ ζ^(−2t) a_t = 0 : frequency 2 is forbidden', 530, 465, C.dim, fq, 15);
    const cq = Q(S, 1, 'Held in every context it forces quadratic rules', 0.6);
    chip(530, 545, 860, 56, 'all p , f , w :  P_w(ψ) = ⟨ψ, E_w ψ⟩ ,  E_w ⪰ 0 ,  Σ E_w = I', C.green, cq, 19);
    lbl('ten sites , seven native gates , H = 13 = 5 + 8 ; plus basis calibration ⇒ |ψ_w|²', 530, 600, C.dim, cq, 14);
    const bq = Q(S, 1, 'a quartic rule breaks it by a multiple of x to the eighth', 0.6);
    chip(530, 690, 860, 56, 'P_u = q_u + λ q_u q_v :  defect −λ(1 + 2x)x⁸', C.red, bq, 21);
    lbl('λ = 1/2 :  ' + VIS92DEF + '  ;  forbidden frequency λx⁹ζ⁶ ≠ 0', 530, 750, C.dim, bq, 15);
    const px = 1080, py = 720, pw = 680, ph = 380, xS = k => px + 30 + k * 68, yS = v => py - v / 0.8 * ph;
    const pq = Q(S, 1, 'obey a four-time law', 0.8);
    plotAxes(px, py, pw, ph, pq, '', 'a_t = P_u(K₁ K₀ᵗ K₁ K₃ v)');
    lbl('t  (calls of K₀)', px + pw / 2, py + 56, C.dim, pq, 15);
    for (let k = 0; k < 10; k++) { lbl(String(k), xS(k), py + 26, C.dim, pq, 14); }
    fillBox(xS(0) - 22, py - ph, xS(3) - xS(0) + 44, ph, C.gold, pq * 0.06);
    ATB92.forEach((v, k) => { dot(xS(k), yS(v), 9, 'c', clamp(pq * 1.6 - k / 12)); });
    ATQ92.forEach((v, k) => { dot(xS(k) + 8, yS(v), 8, 'r', clamp(bq * 1.6 - k / 12)); });
    lbl('Born : d_t = x⁴, x², 1, x² for t = 0 … 3', px + pw, py - ph + 16, C.cyan, pq, 15, 'right');
    lbl('quartic λ = 1/2 (red)', px + pw, py - ph + 46, C.red, bq, 15, 'right');
    lbl('four-time combination :  Born 0 ,  quartic ' + VIS92DEF, px + pw / 2, py + 86, C.white, bq, 15);
  }
};
const VIS92DEF = '−0.0238';

/* ---- 11 METRIC (V24 §8, §10–14) ---- */
SCENES.metric = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Finally, stability', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'normalised merging is not associative', 0.6) * f1;
    chip(530, 260, 860, 56, 'u * v = (u + v)/|u + v|', C.cyan, q, 24);
    const ox = 530, oy = 640, sc = 230;
    const vecs = [[[1, 0], 'u = e₁', C.cyan], [[0, 1], 'v = e₂', C.gold], [[-1, 0], 'w = −e₁', C.mag]];
    vecs.forEach(([v, l, col]) => { arrow(ox, oy, ox + sc * v[0], oy - sc * v[1], col, q, 3); lbl(l, ox + sc * v[0] * 1.08, oy - sc * v[1] * 1.08 + (v[1] ? -10 : 26), col, q, 18); });
    const rq = Q(S, 0, 'is not associative', 0.6, 0.6) * f1;
    const [l1, l2] = NONASSOC92;
    arrow(ox, oy, ox + sc * l1[0], oy - sc * l1[1], C.red, rq, 4); lbl('(u * v) * w', ox + sc * l1[0] - 10, oy - sc * l1[1] - 14, C.red, rq, 18, 'right');
    arrow(ox, oy, ox + sc * l2[0], oy - sc * l2[1], C.green, rq, 4); lbl('u * (v * w)', ox + sc * l2[0] + 10, oy - sc * l2[1] - 14, C.green, rq, 18, 'left');
    lbl('first coordinates −0.383 and +0.383', ox, oy + 80, C.white, rq, 17);
    lbl('keep the full sum (or direction and length) to merge associatively', ox, oy + 112, C.dim, rq, 14);
    const gq = Q(S, 0, 'the right boundary condition is g dagger G g equals one', 0.6) * f1;
    chipG(1395, 260, 790, 58, '⟨g , G(λ) g⟩ = 1', C.gold, gq, 28);
    lbl('G = I + L_BI R_λ² L_IB = I − K′_eff(λ) > 0 ;  K_eff g = λ g', 1395, 318, C.dim, gq, 15);
    const pq = Q(S, 0, 'with G the identity minus the derivative', 0.6) * f1;
    const px = 1080, py = 740, pw = 620, ph = 330, xS = v => px + (v + 1) / 2 * pw, yS = v => py - v / 4.2 * ph;
    plotAxes(px, py, pw, ph, pq, 't = Re⟨u, v⟩', 'unit-centre elimination');
    curve(p => { const i = Math.round(p * (FEFF92.length - 1)); return [xS(FEFF92[i][0]), yS(FEFF92[i][1])]; }, FEFF92.length - 1, C.gold, pq, 3);
    line(xS(-1), yS(4), xS(1), yS(0), C.dim, pq, 1.8);
    lbl('F_eff = 4 − 2√(2 + 2t)', xS(-0.55), yS(3.0) - 6, C.gold, pq, 16, 'left'); lbl('affine chord 2 − 2t', xS(0.15), yS(1.7) - 20, C.dim, pq, 15, 'left');
    dot(xS(0), yS(4 - 2 * Math.SQRT2), 9, 'g', pq); dot(xS(0), yS(2), 9, 'w', pq);
    lbl('t = 0 : 1.17 vs 2 — not a fixed quadratic edge', px + pw / 2, py + 62, C.dim, pq, 14);
  }
  const q1 = Q(S, 1, 'Finally, stability', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 56, 'ε = ‖ Σ_j F(O n_j) − 1 ‖_L²(SO(3))', C.cyan, q1, 22);
    const bq = Q(S, 1, 'almost sums to one over every rotated trine', 0.6);
    const bx = 150, by = 700, hs = 36;
    bars63(bx, by, LAM92.map((v, i) => i === 1 ? 0 : v), 24, 8, hs, bq, C.cyan, LAM92.map((v, i) => i % 4 === 0 ? String(i) : ''));
    dashed(bx, by - 15 / 64 * hs, bx + 25 * 32, by - 15 / 64 * hs, C.gold, bq, 1.6);
    lbl('λ₁ = 0 : the Bloch part', bx + 30, by + 54, C.red, bq, 15, 'left');
    lbl('λ_l = 3 + 6 P_l(−1/2) :  9 , 0 , 9/4 , 45/8 , …  ≥ 15/64 for l ≠ 1', 530, 335, C.white, bq, 16);
    lbl('degree l', bx + 25 * 32, by + 54, C.dim, bq, 14, 'right');
    const sq = Q(S, 1, 'lies within C epsilon to the two thirds of a Bloch response', 0.6);
    chip(1395, 260, 790, 58, 'dist(F, Bloch) ≤ C₀ ε^(2/3) ,  C₀ = ' + C092.toFixed(2), C.gold, sq, 24);
    const px = 1080, py = 760, pw = 620, ph = 340, xS = v => px + (v + 4.2) / 3.4 * pw, yS = v => py - (v + 3.2) / 3.0 * ph;
    plotAxes(px, py, pw, ph, sq, 'log₁₀ ε', 'log₁₀ dist');
    curve(p => { const lx = -4.2 + p * 3.4; return [xS(lx), yS(Math.log10(C092) + 2 / 3 * lx)]; }, 40, C.gold, sq, 2.5);
    lbl('C₀ ε^(2/3)', xS(-1.2), yS(Math.log10(C092) + 2 / 3 * -1.2) - 12, C.gold, sq, 16, 'right');
    const eq = Q(S, 1, 'the exponent two thirds cannot be improved', 0.6);
    SHARP92.forEach((p, i) => dot(xS(p[0]), yS(p[1]), 9, 'm', clamp(sq * 1.5 - i / 10)));
    curve(p => { const i = Math.min(SHARP92.length - 1, Math.round(p * (SHARP92.length - 1))); return [xS(SHARP92[i][0]), yS(SHARP92[i][1])]; }, SHARP92.length - 1, C.mag, eq, 2);
    lbl('F_t = max(0, 1/3 + (1/3 + t) z) : slope 0.666', xS(-0.9), yS(-2.7), C.mag, eq, 15, 'right');
    stamp('EXPONENT 2/3 IS SHARP', 1395, 352, eq, C.mag, 22, -0.03);
    lbl('§11 : the same seven-address 13-dim carrier compiles this trine target ;  §14 : exact for every rotation ⇒ pointwise', 960, 800, C.dim, eq, 14);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'published'], [1, 'Bloch and cotangent formulas are classical', 'classical'], [1, 'one skew-orbit period is frozen in Lean', 'lean'], [1, 'the rest is argued', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['LIFT', 'U_D⁸ = I', C.gold, 'A hat projection completes to a unitary'], ['CENTRES', 'O = 5A − 7B + 3C', C.cyan, 'centres solve different problems'], ['TWO TURNS', 'tr M₀M₁ = 3/2', C.mag, 'two turns are universal'], ['GOLDEN', 'min E = 1/φ²', C.green, 'golden relaxation leaves one over phi squared'], ['TRINE', 'r₃ = −4√3 · area', C.red, 'carries the normal'], ['CONSISTENCY', 'f(s) = s · ε^(2/3)', C.vio, 'come from consistency']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 130, 240, 260, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 19); });
    lbl('PUBLISHED · hat and Spectre (Smith–Myers–Kaplan–Goodman-Strauss) · Hat reprojection D (Baake–Gähler–Mazáč–Mitchell ; Baake et al.) · trine frame functions (CFMR)', W / 2, 455, C.cyan, Q(S, 1, 'The hat, its four-dimensional projection') * fade, 14);
    lbl('CLASSICAL · Bloch sphere and Hopf map · Pauli algebra · cotangent Dirichlet energy (Pinkall–Polthier) · Delaunay roughness (Rippa) · Schur complements · Legendre polynomials', W / 2, 500, '#8fbcff', Q(S, 1, 'Bloch and cotangent formulas are classical') * fade, 14);
    lbl('LEAN · SkewAdditiveReturn.skew_minimalPeriod (frozen) : lifted orbit period = p · ord(h)', W / 2, 545, C.green, Q(S, 1, 'one skew-orbit period is frozen in Lean') * fade, 16);
    lbl('VOLUMES · U_D , M_D · eleven triangles · centres · two-turn density · Schur relaxation · gap 1/φ² · trine area · square law · four-time law · ε^(2/3) stability', W / 2, 590, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · 143 checks : order 8 · areas 32 · O, H · tr 3/2 and word covering · Schur orders · 0.382 ×3 · 13-dim native gates · d_t · −0.0238 · λ_l · slope 0.666', W / 2, 635, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('DIGESTION LEDGER · V23 : 71 ATOMS · V24 : 55 ATOMS · ALL RESIDUAL-OPEN', W / 2, 705, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    drawHat92(hatMap92(W / 2, 400, 70, 0.1 * Math.sin(t * 0.3)), a * 0.9, { fill: 0.12, tri: 1, r: 6 });
    txt('AURIC V23–V24 · MONOTILES', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V23–V24 · 单原型瓦片、三角心与平方律 · TRURETURING FILM 092', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A tile becomes a gate, a triangle hides its normal, and squares come from consistency.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V23–V24', lift: 'HAT REPROJECTION', hat: 'THIRTEEN CORNERS', centres: 'TRIANGLE CENTRES', turns: 'TWO TURNS', relax: 'GOLDEN RELAXATION', three: 'TWO MAKE THREE?', clifford: 'THE THIRD OPERATOR', trine: 'TRINE TRIANGLE', square: 'SQUARE LAW', metric: 'SCALE AND STABILITY', finale: 'LEDGER' });

function poster092() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawHat92(hatMap92(470, 520, 105, 0.08), 1, { fill: 0.12, tri: 1, r: 8 });
  txt('Re M_D (x + i x*) = (x + Dx*)/√2', 1320, 370, { size: 40, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('r₃ = −4√3 · signed area', 1320, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('min E = 2 − φ = 1/φ²', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V23–V24', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V23–V24 · MONOTILES', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('单 原 型 瓦 片 · 三 角 心 · 平 方 律', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 092', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster092;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
