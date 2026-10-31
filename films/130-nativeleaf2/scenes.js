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

/* ---- film 130: NATIVE LEAF BOUNDARY II ---- */
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
const _po130 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po130.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po130.set(key, off); }
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
/* ---- film 130 data (from verify130.py / vis130.json) ---- */
const MARK130 = {"t0":{"n":[[0.375,0.0,""],[0.0,0.3333,"L"],[0.0,0.6667,"LL"],[0.75,0.3333,"R"],[0.5,0.6667,"RL"],[0.5,1.0,"RLL"],[1.0,0.6667,"RR"]],"e":[[0,1],[1,2],[0,3],[3,4],[4,5],[3,6]],"t":[2,5,6]},"t1":{"n":[[0.4688,0.0,""],[0.125,0.25,"L"],[0.0,0.5,"LL"],[0.0,0.75,"LLL"],[0.25,0.5,"LR"],[0.8125,0.25,"R"],[0.625,0.5,"RL"],[0.5,0.75,"RLL"],[0.5,1.0,"RLLL"],[0.75,0.75,"RLR"],[1.0,0.5,"RR"],[1.0,0.75,"RRL"]],"e":[[0,1],[1,2],[2,3],[1,4],[0,5],[5,6],[6,7],[7,8],[6,9],[5,10],[10,11]],"t":[3,4,8,9,11]},"lam0":{"1":"RR","2":"LL","3":"RLL"},"scans":[[1,0,1],[1,1,0,1],[0,1,1,1,1]],"perm":[2,4,3,5,1],"canon":["LLL","LR","RLLL","RLR","RRL"]};
const BATCH130 = {"masks":[[0,1,0,1,0,1,0,1],[0,0,1,1,0,0,1,1],[0,0,0,0,1,1,1,1]],"Kmin38":12,"age8":[7,6,5,4,3,2,1,8],"curve":[[3,9,6,3],[4,16,8,4],[5,25,15,5],[6,36,18,6],[7,49,21,7],[8,64,24,8],[9,81,36,9],[10,100,40,10],[11,121,44,11],[12,144,48,12],[13,169,52,13],[14,196,56,14],[15,225,60,15],[16,256,64,16],[17,289,85,17],[18,324,90,18],[19,361,95,19],[20,400,100,20],[21,441,105,21],[22,484,110,22],[23,529,115,23],[24,576,120,24],[25,625,125,25],[26,676,130,26],[27,729,135,27],[28,784,140,28],[29,841,145,29],[30,900,150,30],[31,961,155,31],[32,1024,160,32]]};
const NULL130 = {"t0":{"n":[[0.375,0.0,""],[0.0,0.3333,"L"],[0.0,0.6667,"LL"],[0.75,0.3333,"R"],[0.5,0.6667,"RL"],[0.5,1.0,"RLL"],[1.0,0.6667,"RR"]],"e":[[0,1],[1,2],[0,3],[3,4],[4,5],[3,6]],"t":[2,5,6]},"x0":[3,-2,5,1,-4,2,7],"u":{"n":[[0.4688,0.0,""],[0.125,0.25,"L"],[0.0,0.5,"LL"],[0.0,0.75,"LLL"],[0.25,0.5,"LR"],[0.8125,0.25,"R"],[0.625,0.5,"RL"],[0.5,0.75,"RLL"],[0.5,1.0,"RLLL"],[0.75,0.75,"RLR"],[1.0,0.5,"RR"],[1.0,0.75,"RRL"]],"e":[[0,1],[1,2],[2,3],[1,4],[0,5],[5,6],[6,7],[7,8],[6,9],[5,10],[10,11]],"t":[3,4,8,9,11]},"norms":[178.0,331.0,739.0,41956.0,41609.0,78205.0,38803.0,14445.0,0.0],"restore":[3,-2,5,0,0,1,-4,2,0,0,7,0],"vertsU":["","L","LL","LLL","LR","R","RL","RLL","RLLL","RLR","RR","RRL"],"I":7,"b":5,"N":12};
const ONE130 = {"u":{"n":[[0.358,0.0,""],[0.0357,0.1111,"L"],[0.0,0.2222,"LL"],[0.0,0.3333,"LLL"],[0.0714,0.2222,"LR"],[0.6802,0.1111,"R"],[0.4308,0.2222,"RL"],[0.3616,0.3333,"RLL"],[0.2946,0.4444,"RLLL"],[0.2321,0.5556,"RLLLL"],[0.1786,0.6667,"RLLLLL"],[0.1429,0.7778,"RLLLLLL"],[0.1429,0.8889,"RLLLLLLL"],[0.2143,0.7778,"RLLLLLR"],[0.2857,0.6667,"RLLLLR"],[0.3571,0.5556,"RLLLR"],[0.4286,0.4444,"RLLR"],[0.5,0.3333,"RLR"],[0.9297,0.2222,"RR"],[0.8594,0.3333,"RRL"],[0.7902,0.4444,"RRLL"],[0.7232,0.5556,"RRLLL"],[0.6607,0.6667,"RRLLLL"],[0.6071,0.7778,"RRLLLLL"],[0.5714,0.8889,"RRLLLLLL"],[0.5714,1.0,"RRLLLLLLL"],[0.6429,0.8889,"RRLLLLLR"],[0.7143,0.7778,"RRLLLLR"],[0.7857,0.6667,"RRLLLR"],[0.8571,0.5556,"RRLLR"],[0.9286,0.4444,"RRLR"],[1.0,0.3333,"RRR"]],"e":[[0,1],[1,2],[2,3],[1,4],[0,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[10,13],[9,14],[8,15],[7,16],[6,17],[5,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[23,26],[22,27],[21,28],[20,29],[19,30],[18,31]],"t":[3,4,12,13,14,15,16,17,25,26,27,28,29,30,31]},"z":"LR","vcur":["LLL","RLLLLLLL","RRLLLLLLL"],"firsts":[11,3,10],"ydig":226,"ybits":749,"D":11,"H":12,"M":36,"K":12,"N":32,"blocks_raw":[["0","0","0","0","0","0","0","0","0","0","0","1"],["0","0","0","1","0","4","0","15","0","58","0","235"],["0","0","0","0","0","0","0","0","0","0","1","0"]],"ylead":"148059663038321393","ytail":"938913636352"};
const CHERRY130 = {"M4":[[2,0,0,0],[0,2,0,0],[15,0,2,0],[0,19,0,2]],"T3":{"n":[[0.3646,0.0,""],[0.0833,0.2,"L"],[0.0,0.4,"LL"],[0.0,0.6,"LLL"],[0.1667,0.4,"LR"],[0.1667,0.6,"LRL"],[0.6458,0.2,"R"],[0.4167,0.4,"RL"],[0.3333,0.6,"RLL"],[0.3333,0.8,"RLLL"],[0.5,0.6,"RLR"],[0.5,0.8,"RLRL"],[0.875,0.4,"RR"],[0.75,0.6,"RRL"],[0.6667,0.8,"RRLL"],[0.6667,1.0,"RRLLL"],[0.8333,0.8,"RRLR"],[0.8333,1.0,"RRLRL"],[1.0,0.6,"RRR"],[1.0,0.8,"RRRL"]],"e":[[0,1],[1,2],[2,3],[1,4],[4,5],[0,6],[6,7],[7,8],[8,9],[7,10],[10,11],[6,12],[12,13],[13,14],[14,15],[13,16],[16,17],[12,18],[18,19]],"t":[3,5,9,11,15,17,19]},"T3acq":{"n":[[0.4132,0.0,""],[0.1389,0.1667,"L"],[0.0556,0.3333,"LL"],[0.0,0.5,"LLL"],[0.0,0.6667,"LLLL"],[0.1111,0.5,"LLR"],[0.2222,0.3333,"LR"],[0.2222,0.5,"LRL"],[0.6875,0.1667,"R"],[0.4722,0.3333,"RL"],[0.3889,0.5,"RLL"],[0.3333,0.6667,"RLLL"],[0.3333,0.8333,"RLLLL"],[0.4444,0.6667,"RLLR"],[0.5556,0.5,"RLR"],[0.5556,0.6667,"RLRL"],[0.9028,0.3333,"RR"],[0.8056,0.5,"RRL"],[0.7222,0.6667,"RRLL"],[0.6667,0.8333,"RRLLL"],[0.6667,1.0,"RRLLLL"],[0.7778,0.8333,"RRLLR"],[0.8889,0.6667,"RRLR"],[0.8889,0.8333,"RRLRL"],[1.0,0.5,"RRR"],[1.0,0.6667,"RRRL"]],"e":[[0,1],[1,2],[2,3],[3,4],[2,5],[1,6],[6,7],[0,8],[8,9],[9,10],[10,11],[11,12],[10,13],[9,14],[14,15],[8,16],[16,17],[17,18],[18,19],[19,20],[18,21],[17,22],[22,23],[16,24],[24,25]],"t":[4,5,7,12,13,15,20,21,23,25]}};
const WIT130 = {"t":{"n":[[0.375,0.0,""],[0.0,0.25,"L"],[0.0,0.5,"LL"],[0.75,0.25,"R"],[0.5,0.5,"RL"],[0.3333,0.75,"RLL"],[0.3333,1.0,"RLLL"],[0.6667,0.75,"RLR"],[1.0,0.5,"RR"],[1.0,0.75,"RRL"]],"e":[[0,1],[1,2],[0,3],[3,4],[4,5],[5,6],[4,7],[3,8],[8,9]],"t":[2,6,7,9]},"field":{"":8,"L":0,"LL":1,"R":0,"RL":22,"RLL":0,"RLLL":9,"RLR":0,"RR":7,"RRL":0},"tpre":{"n":[[0.375,0.0,""],[0.0,0.3333,"L"],[0.0,0.6667,"LL"],[0.75,0.3333,"R"],[0.5,0.6667,"RL"],[0.5,1.0,"RLL"],[1.0,0.6667,"RR"],[1.0,1.0,"RRL"]],"e":[[0,1],[1,2],[0,3],[3,4],[4,5],[3,6],[6,7]],"t":[2,5,7]}};
const DIG130 = {"p4":{"n":[[0.5,0.0,""],[0.0,0.5,"L"],[0.0,1.0,"LL"],[1.0,0.5,"R"]],"e":[[0,1],[1,2],[0,3]],"t":[2,3]},"p5":{"n":[[0.5,0.0,""],[0.0,0.5,"L"],[0.0,1.0,"LL"],[1.0,0.5,"R"],[1.0,1.0,"RL"]],"e":[[0,1],[1,2],[0,3],[3,4]],"t":[2,4]},"w2":[1,2,5,13,34],"w3":[1,4,13,40]};
const RANK130 = {"traj":[{"r0":8,"N0":9,"ranks":[9,9,9,9,9,9,9,9,9,9,9]},{"r0":12,"N0":13,"ranks":[13,13,13,13,13,13,13,13,13,13,13]},{"r0":12,"N0":12,"ranks":[12,12,12,12,12,12,12,12,12,12,12]},{"r0":10,"N0":10,"ranks":[10,10,10,10,10,10,10,10,10,10,10]},{"r0":12,"N0":12,"ranks":[12,12,12,12,12,12,12,12,12,12,12]},{"r0":12,"N0":12,"ranks":[12,12,12,12,12,12,12,12,12,12,12]}],"rk":[[16,6,16],[7,3,6],[10,4,10],[17,7,16],[11,5,10],[4,2,4],[11,5,10],[4,2,4],[11,4,10],[9,4,8],[7,3,6],[19,7,18],[15,6,14],[5,2,4],[19,7,18],[16,6,16],[17,7,16],[13,5,12],[11,4,10],[17,7,16],[10,4,10],[7,3,6],[14,5,14],[13,5,12],[14,5,14]],"t":{"n":[[0.3125,0.0,""],[0.0,0.25,"L"],[0.0,0.5,"LL"],[0.625,0.25,"R"],[0.375,0.5,"RL"],[0.25,0.75,"RLL"],[0.25,1.0,"RLLL"],[0.5,0.75,"RLR"],[0.875,0.5,"RR"],[0.75,0.75,"RRL"],[0.75,1.0,"RRLL"],[1.0,0.75,"RRR"],[1.0,1.0,"RRRL"]],"e":[[0,1],[1,2],[0,3],[3,4],[4,5],[5,6],[4,7],[3,8],[8,9],[9,10],[8,11],[11,12]],"t":[2,6,7,10,12]},"sel":[[0,"LL"],[0,"RLL"],[0,"RR"],[1,"LL"],[1,"RLL"],[1,"RR"]],"H":1,"match":[[1,2],[5,6],[7,4],[9,10],[11,12]],"rankA":12,"Ldisp":5,"plot":[{"sched":["T","G","T","G","T","T","G","T"],"ranks":[13,12,12,12,12,12,12,12,12]},{"sched":["G","T","T","G","G","T","G","T"],"ranks":[13,13,13,13,13,13,13,13,13]},{"sched":["T","T","G","G","T","G","T","T"],"ranks":[13,12,12,12,12,12,12,12,12]}],"nonsym":[2,1,0,0,0,0,0,0,0],"N0":13};
const QUAT130 = {"t":{"n":[[0.375,0.0,""],[0.0,0.3333,"L"],[0.0,0.6667,"LL"],[0.75,0.3333,"R"],[0.5,0.6667,"RL"],[0.5,1.0,"RLL"],[1.0,0.6667,"RR"]],"e":[[0,1],[1,2],[0,3],[3,4],[4,5],[3,6]],"t":[2,5,6]},"order":["LL","L","","R","RL","RLL","RR"],"roots":[0.4679111137620439,1.6527036446661394,3.879385241571817],"h":[27,52,75,96,66,34,49],"nwords":21845,"chi":[0,1,0,1,0,1,0]};
const LAW130 = {"t":{"n":[[0.375,0.0,""],[0.0,0.3333,"L"],[0.0,0.6667,"LL"],[0.75,0.3333,"R"],[0.5,0.6667,"RL"],[0.5,1.0,"RLL"],[1.0,0.6667,"RR"]],"e":[[0,1],[1,2],[0,3],[3,4],[4,5],[3,6]],"t":[2,5,6]},"lam":[-1.969615506024416,-1.2855752193730787,-0.6840402866513374,0.0,0.6840402866513374,1.2855752193730787,1.969615506024416],"Hs":2,"Lc":2,"adds":7,"reads":4,"curve":[[-3.0,0.125],[-2.95,0.13124999999999998],[-2.9,0.1375],[-2.85,0.14375],[-2.8,0.15000000000000002],[-2.75,0.15625],[-2.7,0.16249999999999998],[-2.65,0.16875],[-2.6,0.175],[-2.55,0.18125000000000002],[-2.5,0.1875],[-2.45,0.19374999999999998],[-2.4,0.2],[-2.35,0.20625],[-2.3,0.21250000000000002],[-2.25,0.21875],[-2.2,0.22499999999999998],[-2.15,0.23125],[-2.1,0.2375],[-2.05,0.24375000000000002],[-2.0,0.25],[-1.95,0.25625],[-1.9,0.2625],[-1.8499999999999999,0.26875000000000004],[-1.7999999999999998,0.275],[-1.75,0.28125],[-1.7,0.2875],[-1.65,0.29375],[-1.5999999999999999,0.30000000000000004],[-1.5499999999999998,0.30625],[-1.5,0.3125],[-1.45,0.31875],[-1.4,0.325],[-1.3499999999999999,0.33125000000000004],[-1.2999999999999998,0.3375],[-1.25,0.34375],[-1.2,0.35],[-1.15,0.35625],[-1.0999999999999999,0.36250000000000004],[-1.0499999999999998,0.36875],[-1.0,0.375],[-0.9499999999999997,0.38125000000000003],[-0.8999999999999999,0.3875],[-0.8500000000000001,0.39375],[-0.7999999999999998,0.4],[-0.75,0.40625],[-0.6999999999999997,0.41250000000000003],[-0.6499999999999999,0.41875],[-0.5999999999999996,0.42500000000000004],[-0.5499999999999998,0.43125],[-0.5,0.4375],[-0.44999999999999973,0.44375000000000003],[-0.3999999999999999,0.45],[-0.34999999999999964,0.45625000000000004],[-0.2999999999999998,0.4625],[-0.25,0.46875],[-0.19999999999999973,0.47500000000000003],[-0.1499999999999999,0.48125],[-0.09999999999999964,0.48750000000000004],[-0.04999999999999982,0.49375],[0.0,0.5],[0.050000000000000266,0.5062500000000001],[0.10000000000000009,0.5125],[0.15000000000000036,0.51875],[0.20000000000000018,0.525],[0.25,0.53125],[0.30000000000000027,0.5375000000000001],[0.3500000000000001,0.54375],[0.40000000000000036,0.55],[0.4500000000000002,0.55625],[0.5,0.5625],[0.5500000000000003,0.5687500000000001],[0.6000000000000001,0.575],[0.6500000000000004,0.58125],[0.7000000000000002,0.5875],[0.75,0.59375],[0.8000000000000003,0.6000000000000001],[0.8500000000000001,0.60625],[0.9000000000000004,0.6125],[0.9500000000000002,0.61875],[1.0,0.625],[1.0499999999999998,0.63125],[1.1000000000000005,0.6375000000000001],[1.1500000000000004,0.64375],[1.2000000000000002,0.65],[1.25,0.65625],[1.2999999999999998,0.6625],[1.3500000000000005,0.6687500000000001],[1.4000000000000004,0.675],[1.4500000000000002,0.68125],[1.5,0.6875],[1.5499999999999998,0.69375],[1.6000000000000005,0.7000000000000001],[1.6500000000000004,0.70625],[1.7000000000000002,0.7125],[1.75,0.71875],[1.8000000000000007,0.7250000000000001],[1.8500000000000005,0.7312500000000001],[1.9000000000000004,0.7375],[1.9500000000000002,0.74375],[2.0,0.75],[2.0500000000000007,0.7562500000000001],[2.1000000000000005,0.7625000000000001],[2.1500000000000004,0.76875],[2.2,0.775],[2.25,0.78125],[2.3000000000000007,0.7875000000000001],[2.3500000000000005,0.7937500000000001],[2.4000000000000004,0.8],[2.45,0.80625],[2.5,0.8125],[2.5500000000000007,0.8187500000000001],[2.6000000000000005,0.8250000000000001],[2.6500000000000004,0.83125],[2.7,0.8375],[2.75,0.84375],[2.8000000000000007,0.8500000000000001],[2.8500000000000005,0.8562500000000001],[2.9000000000000004,0.8625],[2.95,0.86875],[3.0,0.875]]};
const PROT130 = {"t":{"n":[[0.375,0.0,""],[0.0,0.3333,"L"],[0.0,0.6667,"LL"],[0.75,0.3333,"R"],[0.5,0.6667,"RL"],[0.5,1.0,"RLL"],[1.0,0.6667,"RR"]],"e":[[0,1],[1,2],[0,3],[3,4],[4,5],[3,6]],"t":[2,5,6]},"u2":{"n":[[0.4688,0.0,""],[0.125,0.25,"L"],[0.0,0.5,"LL"],[0.0,0.75,"LLL"],[0.25,0.5,"LR"],[0.8125,0.25,"R"],[0.625,0.5,"RL"],[0.5,0.75,"RLL"],[0.5,1.0,"RLLL"],[0.75,0.75,"RLR"],[1.0,0.5,"RR"],[1.0,0.75,"RRL"]],"e":[[0,1],[1,2],[2,3],[1,4],[0,5],[5,6],[6,7],[7,8],[6,9],[5,10],[10,11]],"t":[3,4,8,9,11]},"eta":[1,0,-1,0,0,0,-1],"ranks":[[0,7,7],[1,6,7],[2,6,7],[3,6,7],[4,6,7],[5,6,7],[6,6,7]],"fresh":[3,4,8,9,11],"acq":[720,5,138,144]};
/* ---- film 130 helpers ---- */
function idx130(T, ad) { return T.n.findIndex(n => n[2] === ad); }
/* draw a native material tree from a precomputed layout {n:[[x,y,addr]], e:[[i,j]], t:[terminal indices]} */
function tree130(T, x0, y0, w, h, a, o = {}) {
  if (a <= 0) return null;
  const P = T.n.map(n => [x0 + n[0] * w, y0 + n[1] * h, n[2]]);
  const term = new Set(T.t);
  T.e.forEach(([i, j]) => {
    const col = o.ec ? o.ec(P[i][2], P[j][2]) : C.cyan;
    const ea = o.eaf ? o.eaf(P[i][2], P[j][2]) : 1;
    if (ea > 0) line(P[i][0], P[i][1], P[j][0], P[j][1], col, a * (o.ea || 0.7) * ea, o.lw || 2.5);
  });
  P.forEach((p, i) => {
    const isT = term.has(i);
    const nm = o.dn ? o.dn(p[2], isT) : (isT ? 'g' : 'c');
    const da = o.daf ? o.daf(p[2], isT) : 1;
    if (nm && da > 0) dot(p[0], p[1], o.rf ? o.rf(p[2], isT) : (o.r || 12), nm, a * da);
    if (o.lab) {
      const s = o.lab(p[2], isT);
      if (s != null && s !== '') lbl(s, p[0] + (o.lxf ? o.lxf(p[2], isT) : (o.lx || 0)), p[1] + (o.lyf ? o.lyf(p[2], isT) : (o.ly || 34)), o.lc ? o.lc(p[2], isT) : C.white, a * (o.la == null ? 1 : o.la), o.ls || 18);
    }
  });
  return P;
}
function cells130(x, y, vals, cw, ch, a, colf, size = 20, gap = 6) {
  if (a <= 0) return;
  vals.forEach((v, i) => { const col = colf ? colf(v, i) : C.cyan; box(x + i * (cw + gap), y, cw, ch, col, a, 1.6, 'rgba(0,0,0,0.5)'); lbl(String(v), x + i * (cw + gap) + cw / 2, y + ch / 2 + size * 0.36, col, a, size); });
}
const RAW130 = (() => { const m = {}; MARK130.canon.forEach((ad, i) => { m[ad] = MARK130.perm[i]; }); return m; })();
const LAM0_130 = (() => { const m = {}; Object.keys(MARK130.lam0).forEach(j => { m[MARK130.lam0[j]] = j; }); return m; })();
const fmt130 = ad => (ad === '' ? 'ε' : ad);

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  const q1 = Q(S, 0, 'Part one read a growing tree', 0.6), q2 = Q(S, 0, 'Part two scrambles the labels', 0.6);
  chip(490, 255, 560, 50, 'PART I · ORDERED LEAVES', C.cyan, q1 * (1 - q2 * 0.6), 20);
  tree130(MARK130.t1, 200, 320, 580, 360, s0, { r: 13, dn: (ad, isT) => (isT ? 'g' : 'c'), lab: (ad, isT) => (isT ? (q2 > 0.01 ? String(RAW130[ad]) : '') : null), ly: 38, lc: () => C.gold, la: q2, ls: 22 });
  lbl('raw labels 2 , 4 , 3 , 5 , 1 in left-to-right order', 490, 760, C.gold, q2, 17);
  const items = [['scrambles the labels', 'RAW LABELS', 'arbitrary permutation at attachment', C.gold], ['hides the field', 'HIDDEN FIELD', 'arbitrary rationals , interior included', C.cyan], ['at last the law', 'HIDDEN LAW', 'unknown positive weights , any diagonal', C.mag], ['how few actual calls', 'FEWEST CALLS', 'one Read · two · four · rank many', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(960, 215 + i * 150, 820, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1370, 255 + i * 150, col, q, 21); lblG(s, 1370, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  tree130(MARK130.t1, W / 2 - 290, 250, 580, 330, rp * 0.9, { r: 13, dn: (ad, isT) => (isT ? 'g' : 'c'), lab: (ad, isT) => (isT ? String(RAW130[ad]) : null), ly: 38, lc: () => C.gold, ls: 22 });
  chip(330, 330, 330, 58, 'fresh zeros', C.gold, rp, 22); chip(330, 415, 330, 58, 'one packed Read', C.cyan, rp, 22); chip(330, 500, 330, 58, 'four Reads', C.green, rp, 22);
  box(1420, 300, 380, 230, C.mag, rp, 2, 'rgba(0,0,0,0.4)'); lbl('hidden law', 1610, 360, C.mag, rp, 22); lblG('N − rank M', 1610, 425, C.white, rp, 30); lbl('fresh Reads', 1610, 480, C.dim, rp, 18);
  txt(scramble('NATIVE LEAF BOUNDARY II', rp, 130), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('RRO 原生叶边界获取 第二部 · 乱序标签、单次读取与隐藏规律', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 130 · RECURSIVE_RELATIONAL_OBSERVATION_NATIVE_LEAF_BOUNDARY_ACQUISITION_II · §17–§86', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 MARKING ---- */
SCENES.marking = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A traversal edits each leaf once', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Start with an unknown tree', 0.6) * f1, lq = Q(S, 0, 'arbitrary raw labels', 0.6) * f1, oq = Q(S, 0, 'Set every terminal to one', 0.6) * f1;
    const P = tree130(MARK130.t0, 220, 300, 520, 300, q, { r: 15, dn: (ad, isT) => (isT ? 'g' : 'c'), lab: (ad, isT) => (isT ? 'label ' + LAM0_130[ad] : null), ly: 44, lc: () => C.gold, la: lq, ls: 19 });
    if (P) P.forEach(p => { if (MARK130.t0.t.includes(idx130(MARK130.t0, p[2]))) { chip(p[0], p[1] - 38, 44, 34, '1', C.green, oq, 20); } });
    lbl('t = ⟨β , ⟨β , α⟩⟩ :  λ₀(1) = RR , λ₀(2) = LL , λ₀(3) = RLL', 480, 720, C.dim, lq, 17);
    lbl('the observer is not given t or λ₀', 480, 752, C.dim, lq, 16);
    const eq = Q(S, 0, 'make one native edit', 0.6) * f1, zq = Q(S, 0, 'only the moved label reads zero', 0.6) * f1;
    lbl('ASSAY', 1060, 270, C.dim, eq, 17, 'left'); lbl('EDIT', 1260, 270, C.dim, eq, 17, 'left'); lbl('READ OLD LABELS 1 … n', 1400, 270, C.dim, eq, 17, 'left');
    const rows = [['leaf L , β', 'S_L', MARK130.scans[0], 'label 2'], ['leaf RL , β', 'S_RL', MARK130.scans[1], 'label 3'], ['leaf RR , α', 'P_RR', MARK130.scans[2], 'label 1']];
    rows.forEach(([a1, a2, rd, res], i) => {
      const qq = (i === 0 ? eq : zq * clamp((S.u - lineAt(S, 0).s - 0) * 1)) * f1;
      const y = 300 + i * 110;
      lbl(a1, 1060, y + 38, C.white, qq, 19, 'left'); lbl(a2, 1260, y + 38, C.cyan, qq, 19, 'left');
      cells130(1400, y + 6, rd, 46, 46, qq, v => (v === 0 && zq > 0 ? C.gold : C.cyan), 22);
      lbl('→ ' + res, 1400 + rd.length * 52 + 16, y + 38, C.gold, qq * zq, 19, 'left');
    });
    const fq = Q(S, 0, 'growth starts every fresh cell at zero', 0.6) * f1;
    chip(1400, 660, 760, 58, 'old cells keep their values · fresh cells start at 0', C.green, fq, 21);
    lbl('the acted label moves to the fresh marker ; a split appends label n + 1 (not scanned)', 1400, 720, C.dim, fq, 15);
  }
  const q = Q(S, 1, 'A traversal edits each leaf once', 0.6, 0.3);
  if (q > 0) {
    tree130(MARK130.t1, 200, 290, 560, 330, q, { r: 13, dn: (ad, isT) => (isT ? 'g' : 'c'), lab: (ad, isT) => (isT ? String(RAW130[ad]) : null), ly: 40, lc: () => C.gold, ls: 22 });
    lbl('endpoint ρ(t) : 12 vertices , 5 terminals , field zero', 480, 720, C.dim, q, 17);
    const eq = Q(S, 1, 'earns both the entry labels and the current ones', 0.6);
    chip(1390, 270, 780, 56, 'entry :  1 → RR ,  2 → LL ,  3 → RLL', C.cyan, eq, 22);
    chip(1390, 340, 780, 56, 'current :  1 → RRL , 2 → LLL , 3 → RLLL , 4 → LR , 5 → RLR', C.gold, eq, 18);
    const cq = Q(S, 1, 'seven addressed calls', 0.6);
    const cnt = [['P', 5], ['S', 2], ['Reset', 2], ['Add', 8], ['Read', 12], ['Hold', 5], ['Tick', 0]];
    cnt.forEach(([n, v], i) => { const x = 1020 + i * 108, qq = clamp(cq * 1.6 - i / 9); box(x, 410, 96, 96, i === 4 ? C.gold : C.cyan, qq, 2, 'rgba(0,0,0,0.5)'); lbl(n, x + 48, 445, C.dim, qq, 17); lbl(String(v), x + 48, 488, i === 4 ? C.gold : C.white, qq, 28); });
    lbl('46 request bits · 45 reply bits for the seven addressed calls', 1390, 545, C.dim, cq, 16);
    const pq = Q(S, 1, 'gives the permutation', 0.6);
    lbl('canonical order', 1390, 610, C.dim, pq, 16);
    cells130(1135, 625, ['LLL', 'LR', 'RLLL', 'RLR', 'RRL'], 94, 40, pq, () => C.white, 16, 8);
    cells130(1135, 680, MARK130.perm, 94, 52, pq, () => C.gold, 26, 8);
    lbl('raw label at each canonical terminal', 1390, 765, C.gold, pq, 16);
  }
};

/* ---- 03 BATCH ---- */
SCENES.batch = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For eight labels', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Split selected cones by a fixed binary table', 0.6) * f1;
    const gx = 230, gy = 300, cw = 74;
    lbl('cone →', gx - 20, gy - 20, C.dim, q, 16, 'right');
    for (let i = 0; i < 8; i++) lbl(String(i + 1), gx + i * cw + 32, gy - 20, C.dim, q, 17);
    BATCH130.masks.forEach((row, r) => { lbl('round ' + (r + 1), gx - 20, gy + r * cw + 42, C.dim, q, 16, 'right'); row.forEach((b, i) => { const qq = clamp(q * 1.6 - (r * 8 + i) / 30); box(gx + i * cw, gy + r * cw, cw - 8, cw - 8, b ? C.gold : C.cyan, qq, 1.8, b ? 'rgba(60,45,0,0.6)' : 'rgba(0,0,0,0.45)'); lbl(String(b), gx + i * cw + 33, gy + r * cw + 45, b ? C.gold : C.dim, qq, 22); }); });
    lbl('1 = split this cone in this round', gx + 4 * cw - 4, gy + 3 * cw + 24, C.gold, q, 16);
    const zq = Q(S, 0, 'the zero pattern of each label is its column', 0.6) * f1;
    box(gx + 5 * cw - 6, gy - 6, cw + 4, 3 * cw + 4, C.green, zq, 3);
    lbl('label j in cone 6 reads 0 , 1 , 0 → its column (1 , 0 , 1) ', gx + 4 * cw, gy + 3 * cw + 64, C.green, zq, 16);
    chip(1380, 300, 780, 58, 'Read_r(j_i) = 1 − b_ri ,  z_rj = b_ri', C.cyan, zq, 23);
    const dq = Q(S, 0, 'Decoding works exactly when the L columns are distinct', 0.6) * f1;
    chip(1380, 400, 780, 58, 'decoder exists  ⇔  columns pairwise distinct', C.gold, dq, 23);
    lbl('equal columns : swap the two labels , every reply stays the same', 1380, 460, C.dim, dq, 16);
    const cq = Q(S, 0, 'which costs L times the ceiling of log two L reads', 0.6) * f1;
    chip(1380, 545, 780, 58, '2^q ≥ L  ⇒  least Reads  L · ⌈log₂ L⌉', C.green, cq, 23);
    lbl('L = 8 , q = 3 : lightest columns need K_min(3, 8) = 12 splits', 1380, 605, C.dim, cq, 16);
    lbl('no Tick ; every field value stays 0 or 1', 1380, 640, C.dim, cq, 16);
  }
  const q = Q(S, 1, 'For eight labels', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 760, pw = 760, ph = 440, xS = L => px + (L - 3) / 29 * pw, yS = v => py - Math.log10(v) / 3.1 * ph;
    plotAxes(px, py, pw, ph, q, 'L labels (3 … 32)', 'scalar Reads (log)');
    [1, 10, 100, 1000].forEach(v => { lbl(String(v), px - 10, yS(v) + 6, C.dim, q, 14, 'right'); dashed(px, yS(v), px + pw, yS(v), C.dim, q * 0.25, 1); });
    const cv = BATCH130.curve;
    [[1, C.red, 'one-edit scan ≥ L²'], [2, C.cyan, 'binary batch L·⌈log₂ L⌉'], [3, C.gold, 'age schedule L']].forEach(([k, col, lab], m) => {
      const qq = m === 2 ? Q(S, 1, 'An age schedule goes further', 0.6) : q;
      curve(p => { const i = Math.min(cv.length - 1, Math.floor(p * (cv.length - 1))); return [xS(cv[i][0]), yS(cv[i][k])]; }, cv.length - 1, col, qq, 3);
      lbl(lab, xS(32) - 6, yS(cv[cv.length - 1][k]) - 14, col, qq, 16, 'right');
    });
    const sq = Q(S, 1, 'that is twenty-four reads instead of at least sixty-four', 0.6);
    dot(xS(8), yS(24), 12, 'c', sq); dot(xS(8), yS(64), 12, 'r', sq);
    lbl('24', xS(8) + 18, yS(24) + 8, C.cyan, sq, 20, 'left'); lbl('64', xS(8) + 18, yS(64) - 4, C.red, sq, 20, 'left');
    const aq = Q(S, 1, 'where the label of cone i reads L minus i', 0.6);
    const bx = 1080, by = 640;
    BATCH130.age8.forEach((v, i) => { const qq = clamp(aq * 1.6 - i / 10), h = v * 34; fillBox(bx + i * 82, by - h, 60, h, i === 7 ? C.gold : C.cyan, qq * 0.45); rect63(bx + i * 82, by - h, 60, h, i === 7 ? C.gold : C.cyan, qq, 1.6); lbl(String(v), bx + i * 82 + 30, by - h - 10, C.white, qq, 20); lbl('cone ' + (i + 1), bx + i * 82 + 30, by + 26, C.dim, qq, 14); });
    lbl('one final scan , L = 8 : Read(j_i) = L − i , last cone L', 1400, 290, C.gold, aq, 18);
    const pq = Q(S, 1, 'paid for with L squared unit adds', 0.6);
    chip(1400, 720, 760, 56, 'age : Reads L = 8 ,  unit Adds L² = 64 ,  Ticks 0', C.gold, pq, 21);
  }
};

/* ---- 04 NULLING ---- */
SCENES.nulling = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Reversed boundary controls', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'let the whole field be arbitrary and unknown', 0.6) * f1;
    const mq = Q(S, 0, 'Marking still works', 0.6) * f1;
    stamp('NO RESET', 480, 270, Q(S, 0, 'Now remove Reset', 0.6) * f1, C.red, 32, -0.04);
    const vals = {}; MARK130.t0.n.forEach((n, i) => { vals[n[2]] = NULL130.x0[i]; });
    tree130(MARK130.t0, 220, 340, 520, 300, q, { r: 15, dn: (ad, isT) => (isT ? 'g' : 'c'), lab: (ad, isT) => (isT ? (mq > 0.5 ? '1' : String(vals[ad])) : '?'), ly: 46, lc: (ad, isT) => (isT ? (mq > 0.5 ? C.green : C.gold) : C.mag), ls: 22 });
    lbl('terminals : Read z_j , then Add(j , 1 − z_j)', 480, 740, C.green, mq, 17);
    lbl('interior values stay unknown', 480, 772, C.mag, q, 16);
    const nq = Q(S, 0, 'without a tick the hidden interior never reaches the terminals', 0.6) * f1;
    chip(1390, 290, 780, 56, 'no Tick during marking ⇒ unique zero , any interior', C.cyan, nq, 21);
    const wq = Q(S, 0, 'A window of terminal reads', 0.6) * f1;
    const I = NULL130.I, b = NULL130.b;
    for (let r = 0; r <= I; r++) for (let j = 0; j < b; j++) { const qq = clamp(wq * 1.6 - (r * b + j) / (b * (I + 1) * 1.2)); box(1060 + r * 74, 380 + j * 44, 64, 36, C.gold, qq, 1.4, 'rgba(40,30,0,0.4)'); }
    for (let r = 0; r <= I; r++) lbl('t' + r, 1092 + r * 74, 372, C.dim, wq, 14);
    lbl('b = 5 terminals × (I + 1) = 8 epochs : 40 Reads', 1390, 625, C.gold, wq, 17);
    const fq = Q(S, 0, 'because the leaves force the whole tree', 0.6) * f1;
    chip(1390, 690, 780, 58, 'K = [J , AJ , … , AᴵJ] ,  K C = Id  ⇒  x = Cᵀ Y', C.green, fq, 22);
    lbl('a marked vertex with one unmarked neighbour forces it', 1390, 750, C.dim, fq, 15);
  }
  const q = Q(S, 1, 'Reversed boundary controls', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 740, pw = 720, ph = 360, nm = NULL130.norms, yS = v => py - (v > 0 ? Math.log10(v) : 0) / 5.2 * ph;
    plotAxes(px, py, pw, ph, q, 'control round 0 … I + 1', 'max |field| over all 12 vertices (log)');
    nm.forEach((v, i) => { const qq = clamp(q * 1.6 - i / 12), x = px + 30 + i * 82, y = yS(Math.max(v, 1)); if (v > 0) { fillBox(x, y, 52, py - y, C.cyan, qq * 0.45); rect63(x, y, 52, py - y, C.cyan, qq, 1.5); lbl(String(Math.round(v)), x + 26, y - 10, C.white, qq, 14); } else { dot(x + 26, py - 10, 12, 'n', qq); lbl('0', x + 26, py - 30, C.green, qq, 22); } });
    const zq = Q(S, 1, 'to exactly zero', 0.6);
    stamp('EVERY VERTEX = 0', 530, 268, zq, C.green, 26, -0.03);
    chip(1400, 270, 760, 56, 'g = − C A^(I+1) d :  Tick , Add g_(I−s) , Hold', C.cyan, zq, 21);
    lbl('I + 1 = 8 rounds , 40 Adds , no inverse Tick , no interior actuator', 1400, 325, C.dim, zq, 15);
    const rq = Q(S, 1, 'puts the arbitrary entry field back', 0.6);
    const bx = 1030, by = 560, rs = NULL130.restore, vs = NULL130.vertsU;
    line(bx - 10, by, bx + 12 * 62, by, C.dim, rq, 1.2);
    rs.forEach((v, i) => { const qq = clamp(rq * 1.6 - i / 14), h = v * 26, x = bx + i * 62, old = ['', 'L', 'LL', 'R', 'RL', 'RLL', 'RR'].includes(vs[i]); if (v !== 0) { fillBox(x, h > 0 ? by - h : by, 44, Math.abs(h), old ? C.gold : C.cyan, qq * 0.45); rect63(x, h > 0 ? by - h : by, 44, Math.abs(h), old ? C.gold : C.cyan, qq, 1.5); lbl(String(v), x + 22, h > 0 ? by - h - 8 : by - h + 22, C.white, qq, 15); } else dot(x + 22, by, 6, old ? 'g' : 'c', qq); lbl(fmt130(vs[i]), x + 22, by + 130, old ? C.gold : C.dim, qq, 12); });
    lbl('restored field on ρ(t) : gold = old vertices carry x , cyan = fresh vertices 0', 1400, 410, C.gold, rq, 15);
    chip(1400, 740, 760, 54, 'target f = x on V(t) , 0 on fresh : g = C(f − A^(I+1) d)', C.gold, rq, 19);
  }
};

/* ---- 05 ONE READ ---- */
SCENES.oneread = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const T = ONE130.u, vc = ONE130.vcur, dists = [3, 10, 11];
  const f1 = 1 - Q(S, 1, 'For a three-leaf tree the single reply', 0.6);
  const q = Q(S, 0, 'Splits give each label its own distance', 0.6);
  const aq = Q(S, 0, 'from a known appended anchor', 0.6);
  const P = tree130(T, 150, 250, 760, 470, q * (0.35 + 0.65 * f1), { r: 8, lw: 2, dn: (ad, isT) => (ad === ONE130.z ? 'g' : vc.includes(ad) ? 'm' : isT ? 'c' : 'c'), rf: (ad, isT) => (ad === ONE130.z ? 16 : vc.includes(ad) ? 14 : isT ? 8 : 6), daf: (ad, isT) => (isT || ad.length < 3 ? 1 : 0.6) });
  if (P && f1 > 0) {
    const zp = P[idx130(T, ONE130.z)];
    lbl('anchor z , label L + 1', zp[0] + 18, zp[1] - 16, C.gold, aq * f1, 16, 'left');
    vc.forEach((ad, i) => { const p = P[idx130(T, ad)]; lbl('d = ' + dists[i], p[0] + (i === 0 ? -20 : 18), p[1] + 30, C.mag, aq * f1, 18, i === 0 ? 'right' : 'left'); });
  }
  lbl('ρ-normalized t = ⟨β , ⟨β , α⟩⟩ after K = 12 left-chain splits : N = 32', 530, 790, C.dim, q * f1, 15);
  if (f1 > 0) {
    const zq = Q(S, 0, 'Start from whole zero instead', 0.6) * f1;
    chip(1400, 270, 760, 56, 'whole zero , full menu with Reset , labels scrambled', C.cyan, zq, 20);
    const dq = Q(S, 0, 'its own distance', 0.6) * f1;
    chip(1400, 345, 760, 56, 'd(z , v_i) = 3 , D₀ + i + 4 = 10 , 11 :  distinct', C.mag, dq, 21);
    const pq = Q(S, 0, 'inputs weighted by powers of four to the D', 0.6) * f1;
    chip(1400, 430, 760, 58, 'Add(j , B^(H(j−1) + D − r)) ,  B = 4^D , D = 11 , H = 12', C.gold, pq, 20);
    lbl('batches r = 0 … D , one Tick between batches , then Read(z) once', 1400, 490, C.dim, pq, 15);
    const wq = Q(S, 0, 'keep every walk count in its own digit', 0.6) * f1;
    chip(1400, 570, 760, 58, 'walk counts ≤ 3^D < 4^D  ⇒  no carries', C.green, wq, 23);
    lbl('first positive digit of block j = distance of the cone holding j', 1400, 630, C.dim, wq, 15);
    lbl('Kronecker packing (Harvey , arXiv:0712.4046 §3.1) , walk counts (mathlib)', 1400, 665, C.dim, wq, 14);
  }
  const q1 = Q(S, 1, 'For a three-leaf tree the single reply', 0.6, 0.3);
  if (q1 > 0) {
    lbl('y in base B = 4¹¹ : three blocks of 12 digits , labelling 1 → RR , 2 → LL , 3 → RLL', 1400, 260, C.dim, q1, 15);
    ONE130.blocks_raw.forEach((blk, j) => {
      const y = 290 + j * 96;
      lbl('label ' + (j + 1), 1010, y + 40, C.white, q1, 18, 'left');
      blk.forEach((v, k) => { const fp = k === ONE130.firsts[j], qq = clamp(q1 * 1.6 - (j * 12 + k) / 40); box(1110 + k * 56, y + 10, 50, 50, fp ? C.gold : (v !== '0' ? C.cyan : C.dim), qq, fp ? 2.5 : 1.2, 'rgba(0,0,0,0.45)'); lbl(v, 1135 + k * 56, y + 42, fp ? C.gold : (v !== '0' ? C.white : C.dim), qq, v.length > 2 ? 13 : 17); });
      const cone = ONE130.firsts[j] === 3 ? 'cone 0 : LL' : ONE130.firsts[j] === 10 ? 'cone 1 : RLL' : 'cone 2 : RR';
      lbl('digit ' + ONE130.firsts[j] + ' → ' + cone, 1110 + 6 * 56, y + 82, C.gold, q1, 15);
    });
    const dq = Q(S, 1, 'decimal digits', 0.6);
    chip(1400, 600, 760, 54, 'y = ' + ONE130.ylead + ' … ' + ONE130.ytail, C.white, dq, 17);
    lbl('this labelling : 226 digits , 749 bits ; all six labellings : 226 – 235 digits', 1400, 650, C.dim, dq, 15);
    const zq = Q(S, 1, 'Zero reads can never work', 0.6);
    stamp('ZERO READS : IMPOSSIBLE', 530, 330, zq, C.red, 26, -0.04);
    const mq = Q(S, 1, 'So one is the exact minimum', 0.6);
    stamp('EXACT MINIMUM = 1', 1400, 740, mq, C.gold, 30, -0.03);
    lbl('P 5 · S 12 · Add 36 · Tick 11 · Read 1 · Reset 1 · Hold 13', 530, 750, C.white, mq, 16);
  }
};

/* ---- 06 MIRROR ---- */
SCENES.mirror = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'At the first terminal', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Signed amplitudes on k twin cherries', 0.6) * f1, sq = Q(S, 0, 'One split inside each cherry', 0.6) * f1;
    const T = sq > 0.5 ? CHERRY130.T3acq : CHERRY130.T3;
    const amp = { LLL: '+a₁', LRL: '−a₁', RLLL: '+a₂', RLRL: '−a₂', RRLLL: '+a₃', RRLRL: '−a₃' };
    const fresh = ['LLLL', 'LLR', 'RLLLL', 'RLLR', 'RRLLLL', 'RRLLR'];
    tree130(T, 170, 270, 720, 420, q, { r: 11, dn: (ad, isT) => (fresh.includes(ad) ? 'o' : ad === '' ? 'w' : amp[ad] ? (amp[ad][0] === '+' ? 'g' : 'm') : 'c'), rf: ad => (ad === '' ? 16 : 11), lab: ad => (ad === '' ? 'root' : (amp[ad] || null)), ly: 34, lc: ad => (ad === '' ? C.white : amp[ad] && amp[ad][0] === '+' ? C.gold : C.mag), ls: 17 });
    lbl(sq > 0.5 ? 'one split per cherry : orange = fresh zero cells' : 'T₃ : swapping the two arms of a cherry fixes the root', 530, 760, sq > 0.5 ? C.orange : C.dim, q, 16);
    const bq = Q(S, 0, 'invisible from the root at every time', 0.6) * f1;
    chip(1400, 270, 760, 56, 'e_oᵀ Aⁿ w_i = 0 for every n ≥ 0', C.mag, bq, 23);
    const mq = Q(S, 0, 'a triangular matrix with diagonal two', 0.6) * f1;
    lbl('M_ij = e_oᵀ B^(h_i) ι w_j ,  h_i = i + 4  (k = 4)', 1400, 345, C.dim, mq, 16);
    CHERRY130.M4.forEach((row, i) => row.forEach((v, j) => { const qq = clamp(mq * 1.6 - (i * 4 + j) / 18); box(1240 + j * 84, 370 + i * 70, 74, 60, i === j ? C.gold : v ? C.cyan : C.dim, qq, 1.6, 'rgba(0,0,0,0.5)'); lbl(String(v), 1277 + j * 84, 409 + i * 70, i === j ? C.gold : v ? C.white : C.dim, qq, 22); }));
    const nq = Q(S, 0, 'Both k reads and k splits are necessary', 0.6) * f1;
    chip(1400, 700, 760, 56, 'Reads ≥ k ,  splits ≥ k :  one run attains both', C.green, nq, 21);
    lbl('k = 3 : P 7 , S 9 , Add 6 , Tick 7 , Read₀ 3 , Hold 1', 1400, 760, C.dim, nq, 15);
  }
  const q = Q(S, 1, 'At the first terminal', 0.6, 0.3);
  if (q > 0) {
    const fq = Q(S, 1, 'the whole field has entries', 0.6);
    tree130(WIT130.t, 180, 290, 640, 380, q, { r: 14, dn: (ad, isT) => (ad === 'LL' ? 'g' : (ad === 'RLLL' || ad === 'RLR') ? 'o' : 'c'), lab: ad => String(WIT130.field[ad]), ly: 38, lc: ad => (WIT130.field[ad] ? C.gold : C.dim), la: fq, ls: 20 });
    lbl('after S_RL : ⟨β , ⟨⟨β , α⟩ , β⟩⟩ , ten vertices , first terminal LL', 500, 740, C.dim, q, 15);
    const pq = Q(S, 1, 'nine passive reads of an alternating field', 0.6);
    chip(1400, 270, 760, 56, 'δ = e_RL − e_RR : the right-arm swap fixes LL', C.mag, pq, 21);
    const vals = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    cells130(1060, 340, vals, 58, 58, pq, () => C.cyan, 24, 10);
    lbl('nine passive Reads at LL', 1400, 440, C.cyan, pq, 16);
    const aq = Q(S, 1, 'the same terminal reads one', 0.6);
    chip(1400, 520, 300, 70, 'Read(1) = 1', C.gold, aq, 26);
    lbl('S_RL , six Ticks : the walk takes the new RL – RLR excursion', 1400, 590, C.dim, aq, 15);
    lbl('comparison run with field 0 : Read(1) = 0', 1400, 625, C.dim, aq, 15);
    chip(1400, 720, 760, 56, 'field (ε , L , LL , R , RL , RLL , RLLL , RLR , RR , RRL) = (8 , 0 , 1 , 0 , 22 , 0 , 9 , 0 , 7 , 0)', C.white, fq, 15);
  }
};

/* ---- 07 DIGITS ---- */
function path130(x0, y, gap, labs, a, hl = {}) {
  if (a <= 0) return;
  for (let i = 0; i < labs.length - 1; i++) line(x0 + i * gap, y, x0 + (i + 1) * gap, y, C.cyan, a * 0.8, 3);
  labs.forEach((s, i) => { dot(x0 + i * gap, y, 15, hl[i] || 'c', a); lbl(s, x0 + i * gap, y + 40, hl[i] ? C.gold : C.dim, a, 17); });
}
SCENES.digits = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Ternary digits need five vertices', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Feed binary digits into the first terminal', 0.6) * f1;
    chip(530, 270, 780, 56, 'Next(d) = Tick ; Add(e , d) ; Hold ; Read(e)', C.cyan, q, 21);
    chip(530, 340, 780, 56, 'x_w = F_w(A) e ,  F_w = zᵐ + Σ dᵢ z^(m−1−i)', C.white, q, 21);
    const bq = Q(S, 0, 'exactly when the tree branches', 0.6) * f1;
    path130(250, 450, 150, ['LL = e', 'L', 'ε', 'R'], bq, { 0: 'g' });
    lbl('⟨β , α⟩ : the smallest branch , four vertices', 480, 540, C.gold, bq, 16);
    lbl('α : ∅ and 1 give e    β : ∅ and 00 give e', 480, 580, C.red, bq, 16);
    stamp('INJECTIVE ⇔ BRANCH', 480, 680, Q(S, 0, 'four vertices at least', 0.6) * f1, C.green, 28, -0.04);
    const tq = Q(S, 0, 'two late reads', 0.6) * f1;
    chip(1400, 270, 760, 56, 'Y₁ = eᵀ A x_w ,  Y₂ = eᵀ A² x_w', C.gold, tq, 23);
    lbl('odd and even coefficients , weights a_j = eᵀ A^(2j+2) e', 1400, 325, C.dim, tq, 15);
    const gq = Q(S, 0, 'decode it by greedy subtraction', 0.6) * f1;
    const by = 640;
    DIG130.w2.forEach((v, i) => { const qq = clamp(gq * 1.6 - i / 7), h = v * 8, x = 1110 + i * 120; fillBox(x, by - h, 80, h, C.gold, qq * 0.45); rect63(x, by - h, 80, h, C.gold, qq, 1.6); lbl(String(v), x + 40, by - h - 10, C.white, qq, 22); lbl('a' + i, x + 40, by + 26, C.dim, qq, 15); });
    lbl('on ⟨β , α⟩ : each weight exceeds the sum of all earlier ones', 1400, 700, C.gold, gq, 16);
    lbl('one late Read never suffices : 00 collides with 01 or 10', 1400, 740, C.dim, gq, 15);
  }
  const q = Q(S, 1, 'Ternary digits need five vertices', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'On the four-vertex path', 0.6);
    path130(250, 300, 150, ['LL = e', 'L', 'ε', 'R'], cq, { 0: 'g' });
    chip(530, 410, 780, 56, '1000001 :  F = z⁷ + z⁶ + 1', C.cyan, cq, 22);
    chip(530, 480, 780, 56, '0020200 :  G = z⁷ + 2z⁴ + 2z²', C.mag, cq, 22);
    const eq = Q(S, 1, 'leave the same whole field', 0.6);
    chip(530, 570, 780, 60, 'F − G = (z² + 1)(z⁴ − 3z² + 1)  ⇒  F(A)e = G(A)e', C.red, eq, 20);
    lbl('z⁴ − 3z² + 1 is the characteristic polynomial of the four-vertex path', 530, 630, C.dim, eq, 15);
    const pq = Q(S, 1, 'while the five-vertex path decodes', 0.6);
    path130(1100, 300, 150, ['LL = e', 'L', 'ε', 'R', 'RL = f'], pq, { 0: 'g', 4: 'm' });
    lbl('⟨β , β⟩ : read the opposite terminal f at offsets 3 and 4', 1400, 380, C.mag, pq, 16);
    const wq = Q(S, 1, 'weights one, four, thirteen, forty', 0.6);
    const by = 640;
    DIG130.w3.forEach((v, i) => { const qq = clamp(wq * 1.6 - i / 6), h = v * 5, x = 1130 + i * 140; fillBox(x, by - h, 90, h, C.mag, qq * 0.45); rect63(x, by - h, 90, h, C.mag, qq, 1.6); lbl(String(v), x + 45, by - h - 10, C.white, qq, 22); lbl('a' + i, x + 45, by + 26, C.dim, qq, 15); });
    lbl('a_j = (3^(j+1) − 1)/2 : each weight exceeds twice the earlier sum', 1400, 700, C.mag, wq, 16);
    lbl('ternary injective ⇔ N ≥ 5 ; larger trees use a moment search', 1400, 740, C.dim, wq, 15);
  }
};

/* ---- 08 RANK ---- */
SCENES.rank = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const T = RANK130.t, mt = RANK130.match;
  const q = Q(S, 0, 'Growth cannot erase what the adjacency already holds', 0.6);
  const mq = Q(S, 1, 'That rank is twice the maximum matching', 0.6);
  tree130(T, 170, 270, 700, 380, q, { r: 13, ec: (a1, a2) => (mt.some(([i, j]) => (T.n[i][2] === a1 && T.n[j][2] === a2) || (T.n[i][2] === a2 && T.n[j][2] === a1)) && mq > 0 ? C.gold : C.cyan), lw: 3, dn: (ad, isT) => (isT ? 'g' : 'c') });
  lbl('t = ⟨β , ⟨⟨β , α⟩ , ⟨β , β⟩⟩⟩ : N₀ = ' + RANK130.N0 + ' , L = ' + RANK130.Ldisp, 520, 720, C.dim, q, 16);
  lbl('gold : a matching of size L (one edge per logical leaf)', 520, 755, C.gold, mq, 16);
  const f1 = 1 - Q(S, 1, 'So reporting, predicting or nulling', 0.6);
  if (f1 > 0) {
    const eq = Q(S, 0, 'Native edits never change an old edge', 0.6) * f1;
    chip(1400, 260, 760, 54, 'Eᵀ B E = A  (old–old block unchanged)', C.cyan, eq, 22);
    const iq = Q(S, 0, 'symmetry keeps the old image injective', 0.6) * f1;
    lbl('B E z = 0 , z = A y  ⇒  zᵀz = yᵀ A z = 0', 1400, 315, C.dim, iq, 16);
    const px = 1040, py = 700, pw = 720, ph = 320, N0 = RANK130.N0, yS = v => py - (v - 9) / 5 * ph;
    plotAxes(px, py, pw, ph, iq, '', 'rank of entry-to-current map');
    [10, 11, 12, 13].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, iq, 14, 'right'));
    lbl('steps of the gold run (G growth , T Tick)', px + pw / 2, py + 54, C.dim, iq, 14);
    lbl('gold , magenta : Tick first    cyan : growth first', px + pw / 2, py + 80, C.white, iq, 14);
    const rq = Q(S, 0, 'the surviving rank never drops below the rank of the entry adjacency', 0.6) * f1;
    dashed(px, yS(RANK130.rankA), px + pw, yS(RANK130.rankA), C.red, iq, 2); lbl('rank A₀ = ' + RANK130.rankA, px + pw, yS(RANK130.rankA) + 24, C.red, iq, 16, 'right');
    const cols = [C.gold, C.cyan, C.mag];
    RANK130.plot.forEach((tr, m) => { const qq = clamp(iq * 1.5 - m * 0.25); curve(p => { const i = Math.min(tr.ranks.length - 1, Math.round(p * (tr.ranks.length - 1))); return [px + 20 + i * 80, yS(tr.ranks[i]) - m * 4]; }, tr.ranks.length - 1, cols[m], qq, 2.5); tr.ranks.forEach((r, i) => dot(px + 20 + i * 80, yS(r) - m * 4, 6, m === 0 ? 'g' : m === 1 ? 'c' : 'm', qq)); });
    RANK130.plot[0].sched.forEach((s, i) => lbl(s, px + 100 + i * 80, py + 24, C.gold, iq, 14));
    lbl('nonsymmetric [[0 , 1] , [0 , 0]] : ranks 2 → 1 → 0', 1400, py + 110, C.red, rq, 15);
  }
  const q1 = Q(S, 1, 'So reporting, predicting or nulling', 0.6, 0.3);
  if (q1 > 0) {
    chip(1400, 270, 760, 58, 'rank A = 2 ν(C(t)) ≥ 2L', C.gold, mq, 26);
    chip(1400, 360, 760, 58, 'Reads ≥ rank P ≥ rank A₀ ≥ 2L', C.cyan, q1, 25);
    lbl('freeze any terminating transcript : the Reads must see every surviving difference', 1400, 420, C.dim, q1, 15);
    lbl('with no Tick an interior difference is never read , so a Tick is forced', 1400, 450, C.dim, q1, 15);
    stamp('READS ≥ 2L', 1400, 540, Q(S, 1, 'needs at least that many successful reads', 0.6), C.red, 32, -0.04);
    const aq = Q(S, 1, 'a geometry-only schedule attains exactly that many', 0.6);
    chip(1400, 660, 760, 58, 'seven-vertex tree : r = 6 Reads , 2 Ticks , no Add', C.green, aq, 21);
    lbl('rows chosen from the earned graph alone ; endpoint A²x , kernel ker A discarded', 1400, 720, C.dim, aq, 15);
  }
};

/* ---- 09 FOUR READS ---- */
SCENES.fourread = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const T = QUAT130.t, chiv = {}; T.n.forEach((n, i) => { chiv[n[2]] = QUAT130.chi[i]; });
  const q = Q(S, 0, 'On the seven-vertex tree', 0.6);
  const f1 = 1 - Q(S, 1, 'Yet every fixed passive schedule', 0.6);
  tree130(T, 170, 280, 640, 360, q, { r: 15, dn: ad => (ad === 'LL' ? 'g' : chiv[ad] ? 'm' : 'c'), lab: ad => fmt130(ad), ly: 40, lc: ad => (chiv[ad] ? C.mag : C.cyan), ls: 17 });
  lbl('⟨β , ⟨β , α⟩⟩ : terminals LL = e , RLL , RR', 490, 720, C.dim, q, 16);
  lbl('cyan / magenta : the two bipartition classes', 490, 755, C.dim, Q(S, 1, 'one coefficient parity is seen at most once', 0.6), 15);
  if (f1 > 0) {
    const cq = Q(S, 0, 'The characteristic polynomial', 0.6) * f1;
    chip(1400, 270, 760, 56, 'det(zI − A) = z⁷ − 6z⁵ + 9z³ − 3z = z · q(z²)', C.cyan, cq, 21);
    chip(1400, 340, 760, 56, 'q(y) = y³ − 6y² + 9y − 3 ,  det[e , Ae , … , A⁶e] = −1', C.white, cq, 19);
    const rq = Q(S, 0, 'no nonzero polynomial with coefficients from minus three to three', 0.6) * f1;
    const nx = 1050, nw = 700, ny = 470, xS = v => nx + v / 4.2 * nw;
    line(nx, ny, nx + nw, ny, C.dim, rq, 1.5);
    [0, 1, 2, 3, 4].forEach(v => { line(xS(v), ny - 8, xS(v), ny + 8, C.dim, rq, 1.2); lbl(String(v), xS(v), ny + 30, C.dim, rq, 14); });
    QUAT130.roots.forEach((r, i) => { dot(xS(r), ny, 12, i === 0 ? 'c' : 'g', rq); lbl(r.toFixed(3), xS(r), ny - 22, i === 0 ? C.cyan : C.gold, rq, 16); });
    lbl('roots of q : one contracting , two expanding', 1400, 545, C.dim, rq, 15);
    chip(1400, 620, 760, 58, 'q does not divide any nonzero P with |coefficients| ≤ 3', C.gold, rq, 20);
    lbl('so the whole field stores every quaternary history , empty and all-zero words included', 1400, 680, C.dim, rq, 15);
  }
  const q1 = Q(S, 1, 'Yet every fixed passive schedule', 0.6, 0.3);
  if (q1 > 0) {
    const pq = Q(S, 1, 'one coefficient parity is seen at most once', 0.6);
    chip(1400, 270, 760, 56, 'a Read at time t sees only one parity of coefficients', C.mag, pq, 20);
    lbl('3 Reads : some parity read once ⇒ 2^m words share < 15 c^(m+K) values , c = 95/48', 1400, 325, C.dim, pq, 14);
    const sq = Q(S, 1, 'Four reads at two terminals', 0.6);
    const steps = [['Tick', C.cyan], ['Tick', C.cyan], ['Tick', C.cyan], ['Hold', C.dim], ['Read LL', C.gold], ['Read RR', C.gold], ['Tick', C.cyan], ['Hold', C.dim], ['Read LL', C.gold], ['Read RR', C.gold], ['Hold', C.dim]];
    steps.forEach(([s, col], i) => { const qq = clamp(sq * 1.6 - i / 14), x = 1010 + i * 70; box(x, 380, 62, 80, col, qq, 1.6, 'rgba(0,0,0,0.5)'); lbl(s.split(' ')[0], x + 31, 412, col, qq, 13); if (s.includes(' ')) lbl(s.split(' ')[1], x + 31, 440, C.white, qq, 14); });
    lbl('time 3 : odd coefficients O     time 4 : even coefficients E', 1400, 500, C.white, sq, 16);
    const rq = Q(S, 1, 'recover every word', 0.6);
    chip(1400, 570, 760, 56, 'L₂(O) = 0 or L₂(E) = 0  ⇒  zero , by the small root', C.cyan, rq, 20);
    lbl('recomputed : all 21 845 words of length ≤ 7 give distinct quadruples', 1400, 625, C.dim, rq, 15);
    stamp('FOUR IS EXACT', 1400, 730, Q(S, 1, 'so four is the exact minimum', 0.6), C.gold, 32, -0.03);
  }
};

/* ---- 10 LAW ---- */
SCENES.law = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Its key step, that F minus every power of A is invertible, is a frozen Lean theorem', 'lean']]);
  const f1 = 1 - Q(S, 1, 'For a known integer law', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'unknown positive edge weights and an arbitrary diagonal', 0.6) * f1;
    const eq = Q(S, 0, 'earn the weights', 0.6) * f1;
    const P = tree130(LAW130.t, 200, 270, 580, 300, q, { r: 15, dn: ad => (['LL', 'RLL', 'RR'].includes(ad) ? 'g' : 'c') });
    if (P) LAW130.t.e.forEach(([i, j]) => { const mx = (P[i][0] + P[j][0]) / 2, my = (P[i][1] + P[j][1]) / 2; lbl(eq > 0.5 ? 'w' : '?', mx - 16, my + 4, eq > 0.5 ? C.green : C.mag, q, 18, 'right'); });
    lbl('T = Tᵀ , T_vw > 0 on edges , diagonal arbitrary , x₀ arbitrary', 490, 620, C.dim, q, 16);
    const sq = Q(S, 0, 'One free scan and one pulse per terminal', 0.6) * f1;
    const tx = 170, tw0 = 700, ty = 700, xS = e => tx + e / 60 * tw0;
    line(tx, ty, tx + tw0, ty, C.dim, sq, 2);
    for (let e = 0; e <= 60; e++) { const qq = clamp(sq * 1.6 - e / 70); line(xS(e), ty - 6, xS(e), ty + 6, C.cyan, qq, 1); }
    [15, 30, 45].forEach((e, j) => { dot(xS(e), ty, 13, 'g', sq); lbl('Add(' + (j + 1) + ' , 1)', xS(e), ty - 22, C.gold, sq, 15); });
    lbl('0', xS(0), ty + 30, C.dim, sq, 14); lbl('60', xS(60), ty + 30, C.dim, sq, 14);
    lbl('free scan , then a pulse every H = 15 epochs ; all terminals read at every epoch', 520, ty + 60, C.dim, sq, 14);
    chip(1400, 270, 760, 56, 'Tick x = T x ,  Read(j) = x at terminal j', C.cyan, q, 22);
    const rq = Q(S, 0, 'earn the weights, the entry field and the advanced endpoint', 0.6) * f1;
    chip(1400, 345, 760, 56, 'R = 3b − 1 = 8 : a monic recurrence of order R from 2R returns', C.white, rq, 18);
    lbl('subtract earlier pulses ; onset of (M_k)_ij = tree distance ; infection gives T and x₀', 1400, 400, C.dim, rq, 14);
    const cq = Q(S, 0, 'For three terminals that is', 0.6) * f1;
    const cnt = [['Tick', 60], ['Add', 3], ['Read', 192], ['Hold', 64]];
    cnt.forEach(([n, v], i) => { const qq = clamp(cq * 1.6 - i / 6), x = 1050 + i * 180; box(x, 460, 160, 120, i === 2 ? C.gold : C.cyan, qq, 2, 'rgba(0,0,0,0.5)'); lbl(n, x + 80, 500, C.dim, qq, 18); lbl(String(v), x + 80, 555, i === 2 ? C.gold : C.white, qq, 36); });
    lbl('(b + 1)(2R − 1) Ticks , b Adds , 2R b(b + 1) Reads , 2R(b + 1) Holds', 1400, 620, C.dim, cq, 15);
    lbl('a singular T loses ker T : A η = 0 for η = e_ε − e_LL − e_RR', 1400, 660, C.dim, cq, 14);
  }
  const q = Q(S, 1, 'For a known integer law', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 720, pw = 760, ph = 420, xS = l => px + (l + 3.2) / 6.4 * pw, yS = v => py - (v + 1.1) / 2.4 * ph;
    plotAxes(px, py, pw, ph, q, 'λ  (eigenvalues of the seven-vertex A)', 'f(λ) = (4 + λ)/8  versus  λᵏ');
    line(px, yS(0), px + pw, yS(0), C.dim, q * 0.5, 1);
    curve(p => { const l = -3.2 + 6.4 * p; return [xS(l), yS((4 + l) / 8)]; }, 60, C.gold, q, 3);
    lbl('(4 + λ)/8 ∈ [1/8 , 7/8]', xS(3.1), yS(0.87) - 14, C.gold, q, 16, 'right');
    const kq = Q(S, 1, 'F minus every power of A is invertible', 0.6);
    for (let k = 1; k <= 4; k++) curve(p => { const l = -1.25 + 2.5 * p; return [xS(l), yS(Math.max(-1.1, Math.min(1.3, Math.pow(l, k))))]; }, 60, C.cyan, kq * 0.55, 1.6);
    LAW130.lam.forEach(l => { dot(xS(l), yS((4 + l) / 8), 9, 'g', q); for (let k = 1; k <= 4; k++) { const v = Math.pow(l, k); if (v > -1.1 && v < 1.3) dot(xS(l), yS(v), 6, 'c', kq); } dashed(xS(l), yS(-1.05), xS(l), yS(1.25), C.dim, q * 0.4, 1); });
    lbl('cyan : λᵏ , k = 1 … 4 (near zero)', px + 10, py - ph + 10, C.cyan, kq, 15, 'left');
    chip(1400, 270, 760, 56, 'F = (4I + A)/8 ,  ‖F‖ < 1 ,  F invertible', C.gold, q, 22);
    const mq = Q(S, 1, 'costs exactly N minus the rank of M fresh reads', 0.6);
    chip(1400, 345, 760, 56, 'fresh Reads = N − rank M  (lower bound and attained)', C.cyan, mq, 21);
    lbl('seven-vertex tree , M = terminal values : 4 Reads , 7 Adds , 4 Ticks', 1400, 400, C.dim, mq, 15);
    const lq = Q(S, 1, 'is a frozen Lean theorem', 0.6);
    box(1030, 470, 740, 190, C.green, lq, 2, 'rgba(0,40,20,0.4)');
    lbl('LEAN · FROZEN · LEMMA 78.2', 1400, 510, C.green, lq, 20);
    lbl('D5/S3/Arith/Lattices/ContractingIntegralSeparation', 1400, 555, C.white, lq, 17);
    lbl('polynomial_sub_pow_isUnit', 1400, 590, C.green, lq, 22);
    lbl('integer A , rational f , f(A) invertible , ‖f(A)‖ < 1 ⇒ f(A) − Aᵏ invertible', 1400, 632, C.dim, lq, 14);
  }
};

/* ---- 11 PROTECT ---- */
SCENES.protect = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Or protect first', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a singular law has already pushed the kernel directions', 0.6) * f1;
    const ev = {}; PROT130.t.n.forEach((n, i) => { ev[n[2]] = PROT130.eta[i]; });
    tree130(PROT130.t, 200, 290, 580, 330, q, { r: 15, dn: ad => (ev[ad] > 0 ? 'g' : ev[ad] < 0 ? 'm' : 'c'), lab: ad => String(ev[ad]), ly: 40, lc: ad => (ev[ad] > 0 ? C.gold : ev[ad] < 0 ? C.mag : C.dim), ls: 20 });
    lbl('η ∈ ker T for the unit law : A η = 0', 490, 690, C.mag, q, 17);
    lbl('entries x and x + η reach the same endpoint after any Tick', 490, 725, C.dim, q, 15);
    chip(1400, 270, 760, 56, 'U4 endpoint z = Tᵐ x + r_T : ker T is gone', C.mag, q, 21);
    const dq = Q(S, 0, 'with d the kernel dimension and at most b minus one', 0.6) * f1;
    chip(1400, 350, 760, 56, 'd = dim ker T ≤ b − 1', C.cyan, dq, 25);
    lbl('any b − 1 terminals force the tree , so they see all of ker T', 1400, 405, C.dim, dq, 15);
    const aq = Q(S, 0, 'write them back into the bare current field', 0.6) * f1;
    chip(1400, 490, 760, 58, 'Add q = W⁻¹ Vᵀ x at d terminals Z', C.gold, aq, 22);
    chip(1400, 565, 760, 58, 'w = F x + r_T ,  F = Tᵐ + B_Z W⁻¹ Vᵀ invertible', C.green, aq, 21);
    lbl('fewer than d fixed affine Add slots cannot work ; one packed integer Add can', 1400, 625, C.dim, aq, 14);
    lbl('here d = 1 : one Add , no new Read , Tick or cell', 1400, 660, C.dim, aq, 15);
  }
  const q = Q(S, 1, 'Or protect first', 0.6, 0.3);
  if (q > 0) {
    const fresh = new Set(PROT130.fresh);
    tree130(PROT130.u2, 200, 280, 600, 360, q, { r: 13, dn: (ad, isT) => (fresh.has(idx130(PROT130.u2, ad)) ? 'o' : 'c'), rf: ad => (fresh.has(idx130(PROT130.u2, ad)) ? 15 : 12) });
    lbl('guard-only pass on ⟨β , ⟨β , α⟩⟩ : 5 P calls , 2 S , no field call', 500, 700, C.white, q, 16);
    lbl('orange : fresh cells , each attached to an old terminal or its owner', 500, 735, C.orange, q, 15);
    const kq = Q(S, 1, 'because the kernel of B to the h times E is zero', 0.6);
    chip(1400, 270, 760, 58, 'ker(Bʰ E) = ker T ∩ ker K_newᵀ = 0', C.green, kq, 24);
    const pq = Q(S, 1, 'every passive phase keeps the entry', 0.6);
    const bx = 1080, by = 640;
    lbl('rank after h Ticks , seven-vertex unit law', 1400, 360, C.dim, pq, 16);
    PROT130.ranks.forEach(([h, ra, rb], i) => { const qq = clamp(pq * 1.6 - i / 9), x = bx + i * 96; fillBox(x, by - ra * 30, 34, ra * 30, C.red, qq * 0.4); rect63(x, by - ra * 30, 34, ra * 30, C.red, qq, 1.4); fillBox(x + 38, by - rb * 30, 34, rb * 30, C.green, qq * 0.45); rect63(x + 38, by - rb * 30, 34, rb * 30, C.green, qq, 1.4); lbl(String(ra), x + 17, by - ra * 30 - 8, C.red, qq, 14); lbl(String(rb), x + 55, by - rb * 30 - 8, C.green, qq, 14); lbl('h=' + h, x + 36, by + 24, C.dim, qq, 14); });
    lbl('red : unprotected Aʰ (6 after one Tick)    green : protected Bʰ E (always 7)', 1400, by + 60, C.white, pq, 15);
    lbl('then acquisition on M = 12 vertices , s = 5 terminals', 1400, by + 95, C.dim, pq, 15);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Kronecker packing, leaf forcing and the Perron comparison are published or classical inputs', 'published'], [1, 'one integrality lemma is frozen in Lean', 'lean'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['MARKING', '2 4 3 5 1', C.gold, 'Fresh zeros earn scrambled labels'], ['BATCH · AGE', 'L⌈log₂L⌉ · L', C.cyan, 'batches and ages cut reads'], ['NO RESET', 'K C = Id', C.green, 'controls null or restore'], ['ONE READ', 'B = 4^D', C.gold, 'one packed read can suffice'], ['MIRROR', 'k Reads , k splits', C.mag, 'growth breaks mirrors'], ['DIGITS', 'branch · N ≥ 5', C.cyan, 'branching stores digits'], ['RANK', 'Reads ≥ 2L', C.red, 'rank survives growth'], ['FOUR READS', 'z · q(z²)', C.gold, 'four reads hear four digits'], ['HIDDEN LAW', 'N − rank M', C.mag, 'hidden laws are paid for'], ['PROTECT', 'ker Bʰ E = 0', C.green, 'hidden laws are paid for']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 230 + (i % 5) * 365, y = 230 + Math.floor(i / 5) * 140, q = Q(S, 0, ph) * fade; box(x - 165, y, 330, 115, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 42, col, q, 19); lblG(a2, x, y + 88, C.white, q, 22); });
    lbl('PUBLISHED · Kronecker packing (Harvey) · infection / zero forcing (Burgarth–Maruyama) · Akiyama–Thuswaldner–Zaïmi · separating systems (Katona)', W / 2, 545, C.cyan, Q(S, 1, 'Kronecker packing, leaf forcing and the Perron comparison') * fade, 14);
    lbl('CLASSICAL · Perron comparison and path spectra (Brouwer–Haemers) · Cayley–Hamilton · Cauchy–Schwarz · superincreasing decoding · pigeonhole', W / 2, 585, '#8fbcff', Q(S, 1, 'are published or classical inputs') * fade, 14);
    lbl('LEAN · Lemma 78.2 = ContractingIntegralSeparation.polynomial_sub_pow_isUnit , frozen , digestion atom absorbed-closed', W / 2, 625, C.green, Q(S, 1, 'one integrality lemma is frozen in Lean') * fade, 14);
    lbl('VOLUME · fresh-zero marking · batch iff · no-Reset nulling · one-Read minimum · cherry bounds · branching criteria · rank bound · four Reads · U4 · U5 · protection', W / 2, 665, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · marking runs · K_min · exact nulling · 226-digit reply · M diag 2 · witness field · collisions · ranks · 21 845 words · pulse recovery · F − Aᵏ', W / 2, 705, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    tree130(MARK130.t1, W / 2 - 260, 230, 520, 300, a * 0.9, { r: 12, dn: (ad, isT) => (isT ? 'g' : 'c'), lab: (ad, isT) => (isT ? String(RAW130[ad]) : null), ly: 36, lc: () => C.gold, ls: 20 });
    txt('NATIVE LEAF BOUNDARY II', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('RRO 原生叶边界获取 第二部 · 乱序标签、单次读取与隐藏规律 · TRURETURING FILM 130', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Fresh zeros, one packed read, four reads for four digits, and a law paid for in reads.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'NATIVE LEAF II', marking: 'FRESH-ZERO MARKING', batch: 'BATCH AND AGE', nulling: 'NO RESET', oneread: 'ONE PACKED READ', mirror: 'BREAKING THE MIRROR', digits: 'DIGITS NEED BRANCHES', rank: 'RANK SURVIVES GROWTH', fourread: 'FOUR READS', law: 'HIDDEN LAW', protect: 'PROTECT THE ENTRY', finale: 'LEDGER' });

function poster130() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  tree130(MARK130.t1, 170, 300, 620, 420, 1, { r: 16, dn: (ad, isT) => (isT ? 'g' : 'c'), lab: (ad, isT) => (isT ? String(RAW130[ad]) : null), ly: 46, lc: () => C.gold, ls: 28 });
  txt('fresh zero ⇒ (2 , 4 , 3 , 5 , 1)', 1320, 360, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('one Read : B = 4^D , no carries', 1320, 470, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('z · q(z²) : four Reads , exact', 1320, 580, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('RRO 原生叶边界获取 第二部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('NATIVE LEAF BOUNDARY II', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('乱 序 标 签 · 单 次 读 取 · 隐 藏 规 律', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 130', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster130;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
