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

/* ---- film 073: AURIC Ω VII · paths, tensors and Hecke ---- */
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
const _po73 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po73.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po73.set(key, off); }
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
const CMPLX73 = [[0.2, 5, 1.1243, 0.7888], [0.2, 4, 0.9943, 0.7977], [0.2, 4, 0.8713, 0.7947], [0.2, 4, 0.845, 0.7947], [0.2, 5, 0.9931, 0.7997], [0.2, 3, 0.6739, 0.797], [0.5, 3, 0.8013, 0.5], [0.5, 4, 0.9815, 0.4979], [0.5, 5, 1.0975, 0.4978], [0.5, 3, 0.7471, 0.5], [0.5, 3, 0.7961, 0.5], [0.5, 3, 0.8644, 0.5]];
const ATTAIN73 = [[0.2, 0.1056], [0.5, 0.2929]];
const LEAK73 = [[0.0, 0.0], [0.1, 0.021], [0.2, 0.0824], [0.3, 0.1786], [0.4, 0.3015], [0.5, 0.4404], [0.6, 0.5831], [0.7, 0.7174], [0.8, 0.8317], [0.9, 0.9159], [1.0, 0.9629], [1.1, 0.9685], [1.2, 0.9323], [1.3, 0.8573], [1.4, 0.7502], [1.5, 0.6201], [1.6, 0.4784], [1.7, 0.3373], [1.8, 0.209], [1.9, 0.1048], [2.0, 0.0336], [2.1, 0.0015], [2.2, 0.0114], [2.3, 0.0624], [2.4, 0.1501], [2.5, 0.2669], [2.6, 0.4026], [2.7, 0.5456], [2.8, 0.6833], [2.9, 0.8039], [3.0, 0.897], [3.1, 0.9544], [3.2, 0.9711], [3.3, 0.9458], [3.4, 0.8807], [3.5, 0.7813], [3.6, 0.6562], [3.7, 0.5164], [3.8, 0.374], [3.9, 0.2412], [4.0, 0.1296], [4.1, 0.0488], [4.2, 0.006], [4.3, 0.0047], [4.4, 0.0451], [4.5, 0.1236], [4.6, 0.2336], [4.7, 0.3654], [4.8, 0.5076], [4.9, 0.6479], [5.0, 0.7742], [5.1, 0.8755], [5.2, 0.943], [5.3, 0.9708], [5.4, 0.9566], [5.5, 0.9016], [5.6, 0.8105], [5.7, 0.6913], [5.8, 0.5543], [5.9, 0.4113], [6.0, 0.2748], [6.1, 0.1565], [6.2, 0.0668], [6.3, 0.0134], [6.4, 0.0009], [6.5, 0.0304], [6.6, 0.0994], [6.7, 0.2018], [6.8, 0.3289], [6.9, 0.4696], [7.0, 0.6116], [7.1, 0.7427], [7.2, 0.8516], [7.3, 0.9287], [7.4, 0.9675], [7.5, 0.9645], [7.6, 0.92], [7.7, 0.8378], [7.8, 0.7252], [7.9, 0.5917], [8.0, 0.4491]];
const RET73 = [2.1265, 4.2531, 6.3796];
const TR73 = [5.0, -0.065, -2.4329, 3.8931, 2.8923, -2.9007, 1.1849, 4.8023, -1.2096, -1.6256, 4.6078, 1.7044, -2.9829, 2.4165, 4.2286, -2.1358, -0.5588, 4.9658, 0.4469, -2.6713, 3.5081, 3.3357, -2.7519, 0.6622, 4.9318, -0.7559, -1.9967, 4.3517, 2.2119, -2.9971, 1.9166, 4.509, -1.7851, -1.0259, 4.8639, 0.9683, -2.847, 3.0803, 3.7392, -2.539];
const RAT73 = [10.3, 11.13, 11.46, 11.73, 12.0, 12.18, 12.37, 12.55, 12.75, 12.96, 13.17, 13.37, 13.53, 13.74, 13.96, 14.17, 14.37, 14.53, 14.74, 14.94, 15.13, 15.34, 15.55, 15.76, 15.97, 16.19, 16.36, 16.5, 16.68, 16.85, 17.07, 17.29, 17.51, 17.75, 17.91, 18.12, 18.37, 18.63, 18.84, 19.06, 19.3, 19.53, 19.76, 19.97, 20.19, 20.39, 20.56, 20.74, 20.89, 21.06, 21.23, 21.37, 21.52, 21.65, 21.79, 21.92, 22.08, 22.2, 22.32, 22.47, 22.61, 22.75, 22.91, 23.02, 23.18, 23.32, 23.45, 23.6, 23.71, 23.86, 23.98, 24.16, 24.3, 24.47, 24.6, 24.75, 24.95, 25.1, 25.24, 25.41, 25.63, 25.86, 26.09, 26.28, 26.53, 26.82, 27.1, 27.36, 27.78, 28.11, 28.58, 29.16, 29.71, 30.36, 30.89, 31.81, 32.73, 34.05, 35.99, 38.87];
const JUMP73 = [[0.0, 2.0, 0.0, 4, 16], [0.005, 2.0, 0.0046, 0, 1], [0.01, 2.0, 0.0092, 0, 1], [0.02, 2.0, 0.0183, 0, 1], [0.04, 1.9999, 0.0366, 0, 1], [0.06, 1.9998, 0.0549, 0, 1], [0.08, 1.9997, 0.0731, 0, 1], [0.1, 1.9995, 0.0914, 0, 1]];
const BUD73 = [[2, 1.4142, 2.0, 2.0], [4, 0.7654, 2.0, 2.0], [8, 0.3902, 2.0, 2.0], [16, 0.196, 2.0, 2.0], [64, 0.0491, 2.0, 2.0]];
/* ---- film 073 helpers ---- */
function ell73(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll73(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell73(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
/* a genus-three surface with its a- and b-loops */
function surf73(cx, cy, w, h, a, qa, qb, t) {
  if (a <= 0) return;
  fillEll73(cx, cy, w / 2, h / 2, C.cyan, a * 0.06);
  ell73(cx, cy, w / 2, h / 2, C.cyan, a, 2.5);
  for (let i = 0; i < 3; i++) {
    const hx = cx + (i - 1) * w * 0.29;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.ellipse(hx, cy - 4, w * 0.075, h * 0.1, 0, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.beginPath(); ctx.ellipse(hx, cy + h * 0.06, w * 0.06, h * 0.07, 0, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); ctx.restore();
    ell73(hx, cy + 2, w * 0.115, h * 0.2, C.gold, a * qa, 2.6);
    ell73(hx, cy + h * 0.29, w * 0.022, h * 0.21, C.mag, a * qb, 2.6, 0, 1);
    lbl('a' + (i + 1), hx, cy - h * 0.25, C.gold, a * qa, 18); lbl('b' + (i + 1), hx + w * 0.05, cy + h * 0.47, C.mag, a * qb, 18, 'left');
  }
}
function interp73(arr, x) { if (x <= arr[0][0]) return arr[0][1]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][1] * (1 - f) + arr[i][1] * f; } return arr[arr.length - 1][1]; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['found the optimal recovery error', 'REAL CLASS → COMPLEX CLASS', 'optimal recovery error 1 − √(1 − β)', C.gold], ['an excursion that returns', 'EXCURSION AND RETURN', 'what leaves can come back', C.cyan], ['loops become rotations', 'LOOPS ON A CURVE', 'π₁ of a genus-three surface → SO(5)', C.mag], ['a fourteen-dimensional system records them', 'W₁₄ = Sym²₀ ℂ⁵', 'a fourteen-dimensional record of the paths', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 320, 58, 'three gates', C.gold, rp, 22); chip(330, 445, 320, 58, 'two tensors', C.mag, rp, 22); chip(330, 530, 320, 58, 'two references', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one sign , one jump', 1610, 410, C.cyan, rp, 22); lblG('κ = ±1 · 16 → 1', 1610, 470, C.white, rp, 28);
  txt(scramble('AURIC Ω VII · SO5 PATHS', rp, 473), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC Ω 第 七 部 · SO₅ 路 径 、十 四 维 恢 复 与 Hecke', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 073 · AURIC_OMEGA_SO5_PATH_RECONSTRUCTION_CONTINUATION · PHASE_GAIN §18 · BOSONIC §7–8', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 COMPLEX CLASS ---- */
SCENES.complex = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'With that cap', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Start with the complex class', 0.6) * f1;
    chip(W / 2, 245, 1300, 60, 'ρ± = N(θ±) ,  θ± = (|0⟩ ± |1⟩)/√2 ,  N complex , no real Kraus premise', C.gold, q, 21);
    const dq = Q(S, 0, 'outputs at trace distance two', 0.6) * f1;
    const bx = 170, by = 340;
    box(bx, by, 300, 300, C.cyan, dq, 2, 'rgba(0,30,40,0.35)'); lbl('B₊ = supp ρ₊', bx + 150, by - 14, C.cyan, dq, 18);
    box(bx + 340, by, 300, 300, C.mag, dq, 2, 'rgba(40,0,40,0.35)'); lbl('B₋ = supp ρ₋', bx + 490, by - 14, C.mag, dq, 18);
    lbl('spec ρ₊ = (1 − β, β)', bx + 150, by + 160, C.white, dq, 18); lbl('spec ρ₋ = (1 − β, β)', bx + 490, by + 160, C.white, dq, 18);
    const oq = Q(S, 0, 'so their supports are orthogonal', 0.6) * f1;
    chip(bx + 320, by + 360, 640, 58, '‖ρ₊ − ρ₋‖₁ = 2  ⇒  B₊ ⊥ B₋', C.white, oq, 23);
    const cq = Q(S, 0, 'leaves the environment with weight at most one minus beta', 0.6) * f1;
    chip(1390, 330, 760, 58, 'τ_ψ = Γ(ψ) ⪯ (1 − β) I_E   for every ψ ∈ H', C.green, cq, 22);
    const px = 1060, py = 760, pw = 680, ph = 330;
    plotAxes(px, py, pw, ph, cq, '12 complex encoders', 'max eigenvalue of τ_ψ');
    const yS = v => py - v / 1.0 * ph;
    [[0.8, 0, 6, 'β = 0.2 : cap 0.8'], [0.5, 6, 12, 'β = 0.5 : cap 0.5']].forEach(([cap, i0, i1, lab]) => { const x0 = px + 20 + i0 * 54, x1 = px + 20 + i1 * 54 - 14; dashed(x0 - 6, yS(cap), x1 + 6, yS(cap), C.red, cq, 2); lbl(lab, (x0 + x1) / 2, yS(cap) - 14, C.red, cq, 15); });
    CMPLX73.forEach((r, i) => { const qq = clamp(cq * 1.5 - i / 18), x = px + 20 + i * 54, h = r[3] * ph; fillBox(x, py - h, 40, h, r[0] < 0.3 ? C.gold : C.cyan, qq * 0.45); rect63(x, py - h, 40, h, r[0] < 0.3 ? C.gold : C.cyan, qq, 1.4); });
  }
  const q = Q(S, 1, 'With that cap', 0.6, 0.3);
  if (q > 0) {
    const steps = [['cap', 'τ_ψ ⪯ (1 − β) I', C.green, 'With that cap'], ['exclusion', 'common projection', C.gold, 'the common-projection exclusion'], ['minimax', 'inputs × contractions', C.cyan, 'and the minimax go through unchanged'], ['fidelity', 'F ≤ √((1+√(1−β))/2)', C.mag, 'Fidelity is at most']];
    steps.forEach(([h, s, col, ph], i) => { const qq = Q(S, 1, ph, 0.6), x = 60 + i * 232; box(x, 250, 216, 120, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, x + 108, 290, col, qq, 18); lblG(s, x + 108, 335, C.white, qq, i === 3 ? 15 : 17); if (i < 3) arrow(x + 218, 310, x + 232, 310, C.dim, qq, 2); });
    const eq = Q(S, 1, 'so every complex recovery has error at least', 0.6);
    chip(530, 460, 820, 66, '‖R N − id₃‖_◇  ≥  1 − √(1 − β)   for every complex R', C.gold, eq, 24);
    lbl('diamond norm with arbitrary complex reference ; recovery on the whole output', 530, 525, C.dim, eq, 15);
    const sq = Q(S, 1, 'the same optimum as the real class', 0.6);
    stamp('SAME OPTIMUM AS THE REAL CLASS', 530, 640, sq, C.green, 30, -0.04);
    lbl('recovery duality : Bény–Oreshkov , arXiv:1103.0649', 530, 715, C.cyan, sq, 15);
    const pq = Q(S, 1, 'every complex recovery has error at least', 0.8);
    const px = 1060, py = 760, pw = 680, ph = 420, xS = b => px + b / 0.55 * pw, yS = v => py - v / 1.25 * ph;
    plotAxes(px, py, pw, ph, pq, 'β', 'optimal recovery error (SDP)');
    curve(p => { const b = 0.001 + p * 0.5; return [xS(b), yS(1 - Math.sqrt(1 - b))]; }, 80, C.gold, pq, 3);
    lbl('1 − √(1 − β)', xS(0.5) + 10, yS(0.29) + 34, C.gold, pq, 17, 'right');
    CMPLX73.forEach((r, i) => { const qq = clamp(pq * 1.6 - i / 20), jx = ((i % 6) - 2.5) * 9; dot(xS(r[0]) + jx, yS(r[2]), 7, r[0] < 0.3 ? 'g' : 'c', qq); });
    ATTAIN73.forEach(r => { dot(xS(r[0]), yS(r[1]), 10, 'm', sq); });
    lbl('dots : 12 random complex encoders', px + 20, py - 130, C.cyan, pq, 15, 'left');
    lbl('magenta : attaining encoder 0.1056 , 0.2929', px + 20, py - 105, C.mag, sq, 15, 'left');
    [0.2, 0.5].forEach(b => lbl(String(b), xS(b), py + 26, C.dim, pq, 15));
  }
};

/* ---- 03 LEAK AND RETURN ---- */
SCENES.leak = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'Compress the evolution to the five kept states', 0.6);
  const f1 = 1 - Q(S, 1, 'Two steps are not the square of one', 0.6);
  if (f1 > 0) {
    const q = q0 * f1;
    box(150, 260, 470, 300, C.cyan, q, 2, 'rgba(0,30,40,0.35)'); lbl('V = ran P : five kept states', 385, 245, C.cyan, q, 18);
    ['e₀', 'e₁', 'e₂', 'e₃', 'e₄'].forEach((s, i) => { dot(205 + i * 90, 420, 12, i === 4 ? 'g' : 'c', q); lbl(s, 205 + i * 90, 460, C.white, q, 18); });
    ring(870, 420, 50, C.mag, q, 2.5); lbl('b', 870, 428, C.mag, q, 24); lbl('bright state , in ran Q', 870, 500, C.mag, q, 16);
    const lq = Q(S, 0, 'the squared amplitude sent out', 0.6) * f1;
    arrow(575, 400, 815, 400, C.gold, lq, 3); lbl('L = QUP = C(t) |b⟩⟨e₄|', 700, 375, C.gold, lq, 17);
    chip(530, 640, 860, 62, 'I − K†K = L†L = η² sin²τ |e₄⟩⟨e₄| ,   K = PUP', C.gold, lq, 23);
    const sq = Q(S, 0, 'short-time coefficient four r squared', 0.6) * f1;
    lbl('leak ≈ 4r² t² ⟨e₄, ρ e₄⟩ / ħ²  for small t ;  QHP = 2r |b⟩⟨e₄|', 530, 715, C.dim, sq, 16);
  }
  const q1 = Q(S, 1, 'Two steps are not the square of one', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 62, 'P U(2t) P  =  K(t)²  +  P U(t) Q U(t) P', C.white, q1, 24);
    const oq = Q(S, 1, 'leaves through the bright state in the first interval', 0.6);
    box(150, 340, 300, 160, C.cyan, oq, 2, 'rgba(0,30,40,0.35)'); lbl('V', 300, 380, C.cyan, oq, 22);
    ring(740, 420, 46, C.mag, oq, 2.5); lbl('b', 740, 428, C.mag, oq, 24);
    curve(p => [440 + p * 260, 400 - Math.sin(p * Math.PI) * 50], 30, C.gold, oq, 3); lbl('first interval', 570, 335, C.gold, oq, 16);
    const bq = Q(S, 1, 'comes back in the second', 0.6);
    curve(p => [700 - p * 260, 450 + Math.sin(p * Math.PI) * 50], 30, C.mag, bq, 3); lbl('second interval', 570, 530, C.mag, bq, 16);
    arrow(452, 452, 445, 450, C.mag, bq, 3);
    const tq = Q(S, 1, 'a term minus eta squared', 0.6);
    chip(530, 625, 860, 62, 'P U Q U P = −η² e^(−2iχ) sin²τ |e₄⟩⟨e₄|', C.mag, tq, 23);
    lbl('χ = Jt/2 ,  τ = Δt/2 ,  Δ = √(J² + 16r²) ,  η = 4r/Δ', 530, 690, C.dim, tq, 16);
  }
  const pq = Q(S, 0, 'eta squared sine squared tau', 0.8);
  if (pq > 0) {
    const px = 1060, py = 760, pw = 680, ph = 400, xS = x => px + x / 8 * pw, yS = v => py - v / 1.1 * ph;
    plotAxes(px, py, pw, ph, pq, 't', 'η² sin²τ : leaked weight = |return term|');
    curve(p => { const x = p * 8; return [xS(x), yS(interp73(LEAK73, x))]; }, 160, C.gold, pq, 3);
    lbl('g = 0.7 + 0.2i ,  J = −0.5', px + pw, py - ph + 12, C.dim, pq, 15, 'right');
    const rq = Q(S, 1, 'which vanishes only at the return times', 0.6);
    RET73.forEach((x, i) => { dot(xS(x), yS(0), 10, 'm', rq); lbl('t' + (i + 1), xS(x), py + 28, C.mag, rq, 16); dashed(xS(x), py, xS(x), py - ph * 0.9, C.mag, rq * 0.5, 1.2); });
    lbl('returns at 2πk / Δ', xS(RET73[1]), py + 58, C.mag, rq, 17);
    stamp('ZERO ONLY AT RETURNS', 530, 775, rq, C.mag, 28, -0.04);
  }
};

/* ---- 04 PATHS ---- */
SCENES.paths = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The traces one plus four cosine', 0.6);
  if (f1 > 0) {
    const sq = Q(S, 0, 'Fix a genus-three surface', 0.6) * f1;
    const aq = Q(S, 0, 'Send the a-loops to the gates', 0.6), bq = Q(S, 0, 'the first b-loop', 0.6);
    surf73(470, 470, 640, 300, sq, aq, bq, t);
    lbl('[a₁,b₁][a₂,b₂][a₃,b₃] = 1', 470, 680, C.dim, sq, 18);
    const gq = Q(S, 0, 'three gates, rotations by pi root two', 0.6) * f1;
    chip(1360, 250, 820, 56, 'A₁ = J₀₁ − J₃₄ ,  A₂ = J₀₂ ,  A₃ = J₀₃ − J₁₄', C.gold, gq, 21);
    chip(1360, 320, 820, 56, 'U_j = exp(θ A_j) ,  θ = π√2', C.gold, gq, 22);
    const lq = Q(S, 0, 'whose Lie algebra is all of so five', 0.6) * f1;
    lbl('Lie(A₁, A₂, A₃) = 𝔰𝔬(5) , dim 10  ⇒  ⟨U₁, U₂, U₃⟩ dense in SO(5)', 1360, 395, C.green, lq, 17);
    const rows = [['a₁ ↦ U₁', 'a₂ ↦ U₂', 'a₃ ↦ U₃', C.gold, aq], ['b₁ ↦ U₁ⁿ', 'b₂ ↦ I', 'b₃ ↦ I', C.mag, bq]];
    rows.forEach(([x1, x2, x3, col, qq], j) => { [x1, x2, x3].forEach((s, i) => { cell73(990 + i * 250, 460 + j * 90, 230, 70, s, col, qq * f1, 24); }); });
    lbl('ρₙ ,  n = 0, 1, 2, …   all inside the same three-gate menu', 1360, 680, C.white, bq * f1, 18);
  }
  const q = Q(S, 1, 'The traces one plus four cosine', 0.6, 0.3);
  if (q > 0) {
    const px = 150, py = 620, pw = 800, ph = 360, yS = v => py - (v + 3.2) / 8.4 * ph;
    plotAxes(px, py, pw, ph, q, 'n = 0 … 39', 'tr ρₙ(b₁) = 1 + 4 cos(nθ)');
    line(px, yS(0), px + pw, yS(0), C.dim, q * 0.4, 1);
    TR73.forEach((v, n) => { const qq = clamp(q * 1.7 - n / 50), x = px + 12 + n * (pw - 24) / 39; line(x, yS(0), x, yS(v), C.gold, qq * 0.6, 2); dot(x, yS(v), 6, 'g', qq); });
    const dq = Q(S, 1, 'pairwise non-isomorphic', 0.6);
    chip(550, 700, 780, 56, 'all distinct (n = 0 … 200 : min gap 4.2 × 10⁻⁴)  ⇒  Eₙ ≄ Eₘ', C.gold, dq, 19);
    const aq = Q(S, 1, 'Yet they all have the same abstract tensor data', 0.6);
    box(1080, 250, 700, 250, C.cyan, aq, 2, 'rgba(0,30,40,0.4)');
    lbl('every n : abstract data ≃', 1430, 300, C.cyan, aq, 19);
    lblG('( Rep(SO₅) ,  forget ,  W )', 1430, 365, C.white, aq, 32);
    lbl('generator , fibre functor , all tensor maps kept', 1430, 420, C.dim, aq, 16);
    lbl('Tannakian input : Deligne–Milne 2.20–2.21', 1430, 460, C.dim, aq, 15);
    const pq = Q(S, 1, 'What is lost is the path', 0.6);
    stamp('THE PATH IS LOST', 1430, 600, pq, C.red, 36, -0.05);
    lbl('the embedding into Loc(X) and its parallel transport', 1430, 670, C.dim, pq, 16);
  }
};

/* ---- 05 TENSORS ---- */
SCENES.tensors = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Two parallel tensors remove it', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'traceless symmetric matrices', 0.6) * f1;
    const gx = 200, gy = 260, cw = 74;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const col = i === j ? (i === 4 ? C.dim : C.gold) : i < j ? C.cyan : C.vio; const qq = clamp(q * 1.6 - (i * 5 + j) / 40); box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, col, qq, 1.6, i === j && i === 4 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.45)'); lbl(i === j ? (i === 4 ? '−Σ' : 's' + i) : i < j ? 'x' : '=', gx + j * cw + 34, gy + i * cw + 43, col, qq, 17); }
    lbl('W = Sym²₀ ℂ⁵ :  10 + 4 = 14 ,  R(g) S = g S gᵀ', gx + 185, gy + 410, C.white, q, 19);
    const iq = Q(S, 0, 'every intertwiner is a scalar c', 0.6) * f1;
    chip(1350, 300, 820, 62, 'T R(ρ(γ)) = R(σ(γ)) T  ⇒  T = c R(h)', C.cyan, iq, 24);
    lbl('W irreducible , Schur ; outer automorphisms of type B₂ trivial ; Z(SO₅) = 1', 1350, 365, C.dim, iq, 15);
    const uq = Q(S, 0, 'the image of a unique group element', 0.6) * f1;
    chip(1350, 450, 820, 58, 'h ∈ SO₅(ℂ) unique ,  h ρ h⁻¹ = σ', C.gold, uq, 23);
    const dq = Q(S, 0, 'up to that scalar', 0.6) * f1;
    chip(1350, 560, 820, 58, 'Aut(E_ρ) = 1   but   Aut(E_ρ(W)) = ℂ^×', C.mag, dq, 23);
  }
  const q = Q(S, 1, 'Two parallel tensors remove it', 0.6, 0.3);
  if (q > 0) {
    const cx = 390, cy = 470, R = 170;
    ring(cx, cy, R, C.dim, q, 2); lbl('c ∈ ℂ^× on the unit circle', cx, cy + R + 44, C.dim, q, 16);
    const bq = Q(S, 1, 'The trace of S T forces c squared', 0.6), dq = Q(S, 1, 'the trace of S T U forces c cubed', 0.6), oq = Q(S, 1, 'so c is one', 0.6);
    [0, Math.PI].forEach(an => { const x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); ring(x, y, 20, C.gold, bq, 3); });
    [0, 2 * Math.PI / 3, 4 * Math.PI / 3].forEach(an => { const x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); ring(x, y, 12, C.mag, dq, 3); dot(x, y, 6, 'm', dq); });
    dot(cx + R, cy, 13, 'g', oq); lbl('c = 1', cx + R + 30, cy + 7, C.green, oq, 22, 'left');
    lbl('μ₂ (gold) ∩ μ₃ (magenta) = {1}', cx, cy - R - 26, C.white, dq, 17);
    chip(1220, 250, 900, 56, 'b(S, T) = tr(ST)  ⇒  c² = 1', C.gold, bq, 23);
    chip(1220, 320, 900, 56, 'd(S, T, U) = tr(STU)  ⇒  c³ = 1', C.mag, dq, 23);
    lbl('S₀ = diag(1, 1, −2, 0, 0) :  b(S₀, S₀) = 6 ,  d(S₀, S₀, S₀) = −6', 1220, 380, C.dim, dq, 15);
    const sq = Q(S, 1, 'their joint stabiliser is exactly SO five', 0.6);
    chip(1220, 440, 900, 60, 'Stab_GL(W)(b, d) = R(SO₅(ℂ))', C.green, sq, 25);
    lbl('recomputed : infinitesimal stabiliser in 𝔤𝔩(14) has dimension 10', 1220, 500, C.dim, sq, 15);
    const nq = Q(S, 1, 'Without density this fails', 0.6);
    const by = 760, hs = 0.9;
    [['Aut of trivial W-system : GL₁₄', 196, C.red], ['ℂ^× · R(SO₅)', 11, C.cyan]].forEach(([lab, v, col], i) => { const y = 590 + i * 75; fillBox(820, y, v * 4.6, 50, col, nq * 0.4); rect63(820, y, v * 4.6, 50, col, nq, 1.6); lbl(String(v), 820 + v * 4.6 + 20, y + 35, col, nq, 24, 'left'); lbl(lab, 800, y + 33, C.white, nq, 16, 'right'); });
  }
};

/* ---- 06 HECKE ---- */
SCENES.hecke = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'the published geometric Langlands equivalence', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Minus forty is minus twenty', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the dual group is Sp four', 0.6) * f1;
    box(150, 250, 600, 300, C.cyan, q, 2, 'rgba(0,30,40,0.4)'); box(1170, 250, 600, 300, C.gold, q, 2, 'rgba(40,30,0,0.4)');
    lbl('SPECTRAL SIDE', 450, 295, C.cyan, q, 20); lblG('Eₙ : π₁(X) → SO₅(ℂ)', 450, 360, C.white, q, 28); lbl('coroots ±e₁ ± e₂ , ±eᵢ', 450, 420, C.dim, q, 17);
    lbl('AUTOMORPHIC SIDE', 1470, 295, C.gold, q, 20); lblG('D-mod½ ( Bun Sp₄ (X) )', 1470, 360, C.white, q, 26); lbl('roots ±e₁ ± e₂ , ±2eᵢ', 1470, 420, C.dim, q, 17);
    lbl('swap lattice , roots and coroots', W / 2, 400, C.white, q, 17); arrow(770, 410, 1150, 410, C.dim, q, 2); arrow(1150, 430, 770, 430, C.dim, q, 2);
    const gq = Q(S, 0, 'the published geometric Langlands equivalence', 0.6) * f1;
    chip(W / 2, 620, 1100, 62, 'GLC (Gaitsgory–Raskin et al.) :  F̃ₙ ↔ ℂ[−40]  in  D_Hecke,Eₙ ≃ Vect', C.cyan, gq, 22);
    const hq = Q(S, 0, 'gives a Hecke eigen-object', 0.6) * f1;
    chip(W / 2, 710, 1100, 58, 'H_B(Fₙ) ≃ (Eₙ)_B ⊠ Fₙ   for all B ∈ Rep(SO₅)', C.gold, hq, 23);
  }
  const q = Q(S, 1, 'Minus forty is minus twenty', 0.6, 0.3);
  if (q > 0) {
    chip(530, 250, 860, 62, '−40 = −dim Bun_Sp₄ + dim Bun_N,P_T = −20 + (−20)', C.gold, q, 22);
    const eq = Q(S, 1, 'whose Euler sums are two, two, six and ten', 0.6);
    const vals = [[1, 'ω', 2], [1, 'ω', 2], [2, 'ω²', 6], [3, 'ω³', 10]];
    vals.forEach(([hgt, s, v], i) => { const qq = clamp(eq * 1.5 - i / 6), x = 210 + i * 170, h = v * 26; fillBox(x, 620 - h, 110, h, C.gold, qq * 0.45); rect63(x, 620 - h, 110, h, C.gold, qq, 1.6); lbl(String(v), x + 55, 610 - h, C.white, qq, 22); lbl('height ' + hgt + ' : ' + s, x + 55, 650, C.dim, qq, 15); });
    lbl('χ(ω^h) = (2h − 1)(g − 1) ,  g = 3 :  sum = 20', 530, 700, C.white, eq, 18);
    const gq = Q(S, 1, 'in general the shift is minus twenty times g minus one', 0.6);
    chip(530, 765, 640, 54, 'general genus :  ℂ[−20(g − 1)]', C.cyan, gq, 22);
    const sq = Q(S, 1, 'Since the automorphism group is trivial', 0.6);
    box(1090, 270, 680, 360, C.green, sq, 2, 'rgba(0,40,20,0.35)');
    lbl('S_Eₙ = Z(ρₙ) = 1', 1430, 320, C.green, sq, 24);
    lblG('Fₙ = ⊕_τ F_τ^(dim τ) = one term', 1430, 385, C.white, sq, 24);
    lbl('regular holonomic · in the heart · nilpotent singular support', 1430, 440, C.dim, sq, 15);
    lbl('Gaitsgory–Raskin I , Theorem 6.1.3 (1)–(4)', 1430, 475, C.dim, sq, 15);
    const oq = Q(S, 1, 'the forgotten sheaf is one nonzero simple object', 0.6);
    stamp('ONE NONZERO SIMPLE OBJECT', 1430, 565, oq, C.green, 28, -0.04);
    lbl('Z(Sp₄) = μ₂ is not connected : no claim CC = [Nilp]', 1430, 690, C.dim, oq, 15);
  }
};

/* ---- 07 TWO REFERENCES ---- */
SCENES.acquire = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'With N preparations', 'classical'], [1, 'the fitted rotation is within', 'theory']]);
  const f1 = 1 - Q(S, 1, 'One reference is not enough', 0.6);
  const sp = [[[0.16, 0.18, 0.2, 0.22, 0.24], 'S₀', C.cyan], [[0.28, 0.18, 0.18, 0.18, 0.18], 'T₀', C.gold]];
  if (f1 > 0) {
    const q = Q(S, 0, 'send two known reference states through it', 0.6) * f1;
    sp.forEach(([v, nm, col], j) => { const y0 = 400 + j * 220; v.forEach((x, i) => { const h = x * 600; fillBox(150 + i * 48, y0 - h, 36, h, col, q * 0.45); rect63(150 + i * 48, y0 - h, 36, h, col, q, 1.4); }); lbl(nm, 400, y0 - 60, col, q, 26, 'left'); lbl(v.map(x => x.toFixed(2)).join('  '), 270, y0 + 28, C.dim, q, 14); });
    box(530, 400, 140, 140, C.mag, q, 2.5, 'rgba(40,0,40,0.4)'); lbl('U ∈ SO(5)', 600, 478, C.mag, q, 18);
    arrow(450, 340, 525, 430, C.cyan, q, 2); arrow(450, 560, 525, 510, C.gold, q, 2);
    lbl('U S₀ Uᵀ , U T₀ Uᵀ', 600, 600, C.white, q, 18);
    const pq = Q(S, 0, 'Together they pin it', 0.6) * f1;
    chip(1350, 260, 820, 62, '‖U − V‖_F ≤ 1600 · ε(U, V)', C.green, pq, 26);
    lbl('ε = max over S₀ , T₀ of ‖U H Uᵀ − V H Vᵀ‖_F', 1350, 322, C.dim, pq, 15);
    const px = 1010, py = 760, pw = 700, ph = 360, yS = v => py - Math.log10(v) / 3.5 * ph;
    plotAxes(px, py, pw, ph, pq, '6000 pairs (sorted sample)', '‖U − V‖_F / ε  (log)');
    dashed(px, yS(1600), px + pw, yS(1600), C.red, pq, 2); lbl('1600', px + pw - 6, yS(1600) - 12, C.red, pq, 18, 'right');
    RAT73.forEach((v, i) => { const qq = clamp(pq * 1.6 - i / 130); dot(px + 10 + i * (pw - 20) / 99, yS(v), 4, 'c', qq); });
    [1, 10, 100, 1000].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, pq, 14, 'right'));
    lbl('largest observed ratio 63', px + 30, yS(63) - 20, C.cyan, pq, 16, 'left');
  }
  const q = Q(S, 1, 'One reference is not enough', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 60, 'P = diag(−1, −1, 1, 1, 1) :  P S₀ Pᵀ = S₀', C.red, q, 22);
    lbl('any single real reference is fixed by a flip of two of its eigen-coordinates', 530, 320, C.dim, q, 15);
    stamp('ONE IS NOT ENOUGH', 530, 410, Q(S, 1, 'flipping two coordinates in its own eigenbasis fixes it', 0.6), C.red, 32, -0.05);
    const nq = Q(S, 1, 'With N preparations for each of thirty settings', 0.6);
    for (let k = 0; k < 2; k++) for (let i = 0; i < 15; i++) { const qq = clamp(nq * 1.5 - (k * 15 + i) / 40); cell73(150 + i * 50, 500 + k * 70, 42, 52, i < 5 ? 'e' : '+', k ? C.gold : C.cyan, qq, 16); }
    lbl('per output : 5 effects eᵢeᵢᵀ + 10 effects (eᵢ + eⱼ)(eᵢ + eⱼ)ᵀ/2  →  30 settings', 530, 660, C.dim, nq, 15);
    const fq = Q(S, 1, 'the fitted rotation is within', 0.6);
    chip(1350, 300, 820, 62, 'ζ = √( 85 log(60/δ) / 2N )', C.cyan, fq, 24);
    chip(1350, 400, 820, 62, '‖Û − U‖_F ≤ 1600 (2ζ + τ)', C.green, fq, 26);
    const cq = Q(S, 1, 'with confidence one minus delta', 0.6);
    lbl('probability ≥ 1 − δ  (Hoeffding + union bound)', 1350, 470, C.white, cq, 17);
    chip(1350, 560, 820, 56, 'cost : 30N preparations and transports', C.gold, cq, 22);
    lbl('τ is the fitting tolerance ; word length ℓ adds 30Nℓ gate executions', 1350, 620, C.dim, cq, 15);
  }
};

/* ---- 08 EXPLICIT CORRECTION ---- */
SCENES.correct = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The gap matters', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Measured matrices are never exact', 0.6) * f1;
    const cx = 470, cy = 500;
    curve(p => [140 + p * 680, 610 - 120 * Math.sin(p * 2.6)], 60, C.cyan, q, 3);
    lbl('exact flat tuples  ℛ(z) = I', 300, 680, C.cyan, q, 17);
    const gq = Q(S, 0, 'has a spectral gap s', 0.6) * f1;
    ell73(cx, cy - 60, 150, 150, C.green, gq, 2, 0, 1); lbl('d₂ < s/4', cx + 110, cy - 200, C.green, gq, 17);
    dot(cx, cy - 60, 10, 'g', q); lbl('z (measured)', cx - 20, cy - 80, C.white, q, 17, 'right');
    const xq = Q(S, 0, 'then an exact flat tuple lies within', 0.6) * f1;
    const tx = cx + 62, ty = 610 - 120 * Math.sin((tx - 140) / 680 * 2.6);
    arrow(cx, cy - 60, tx, ty - 8, C.gold, xq, 3); dot(tx, ty, 10, 'm', xq); lbl('z♯', tx + 20, ty + 24, C.mag, xq, 20, 'left');
    chip(1350, 270, 840, 58, 'σ₁₀(z) = inf ‖([z_s, X])_s‖ ≥ s > 0 ,  X ∈ 𝔰𝔬(5)', C.green, gq, 21);
    const rq = Q(S, 0, 'the relation is off by r', 0.6) * f1;
    chip(1350, 350, 840, 58, 'r = d_K(I, ∏[A_i, B_i]) < s² / (64g)', C.gold, rq, 23);
    chip(1350, 430, 840, 58, 'd₂(z, z♯) ≤ 16g r / s ,   ℛ(z♯) = I', C.mag, xq, 23);
    const sq = Q(S, 0, 'with gap still above s over two', 0.6) * f1;
    chip(1350, 510, 840, 58, 'σ₁₀(z♯) > s / 2', C.green, sq, 24);
    lbl('recomputed : 8 perturbed genus-3 tuples corrected by Newton steps ;', 1350, 590, C.dim, sq, 15);
    lbl('distance / (16g r / s) between 0.013 and 0.017', 1350, 615, C.dim, sq, 15);
  }
  const q = Q(S, 1, 'The gap matters', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 860, 58, 'X = J₁₂ , Y = J₂₃ , [X, Y] = J₁₃ ≠ 0 :  A₁ = e^(tX) , B₁ = e^(tY)', C.white, q, 19);
    lbl('both tensors b₀ , d₀ kept exactly ; σ₁₀ → 0 at the trivial representation', 530, 330, C.dim, q, 15);
    const px = 1040, py = 760, pw = 700, ph = 420, xS = x => px + x * pw, yS = v => py - v / 1.05 * ph;
    const pq = Q(S, 1, 'relation defect of order t squared', 0.6);
    plotAxes(px, py, pw, ph, pq, 't', 'near the trivial representation');
    curve(p => [xS(p), yS(p * p)], 60, C.gold, pq, 3); lbl('relation defect ~ t² ‖[X, Y]‖', xS(0.98), yS(0.96) - 14, C.gold, pq, 16, 'right');
    const dq = Q(S, 1, 'yet stay at distance of order t', 0.6);
    curve(p => [xS(p), yS(p)], 60, C.cyan, dq, 3); lbl('distance to the exact set ~ t', xS(0.55), yS(0.6) - 20, C.cyan, dq, 16, 'right');
    lbl('recomputed : defect / t² → 1.4142 = ‖J₁₃‖_F', 530, 420, C.gold, pq, 17);
    stamp('NO GAP : SMALL DEFECT , FAR AWAY', 530, 540, dq, C.red, 28, -0.05);
    lbl('five-dimensional irreducibility is open and survives small corrections', 530, 640, C.dim, dq, 15);
  }
};

/* ---- 09 SPIN LIFTS ---- */
SCENES.spin = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Two extra half-turn gates', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Lifting to Spin five, which is Sp four', 0.6) * f1;
    box(150, 260, 360, 110, C.gold, q, 2, 'rgba(40,30,0,0.4)'); lblG('Spin₅(ℂ) ≃ Sp₄(ℂ)', 330, 325, C.white, q, 26);
    box(150, 470, 360, 110, C.cyan, q, 2, 'rgba(0,30,40,0.4)'); lblG('SO₅(ℂ)', 330, 535, C.white, q, 28);
    arrow(330, 375, 330, 465, C.dim, q, 2.5); lbl('p , kernel μ₂ = {±1}', 350, 425, C.dim, q, 16, 'left');
    const kq = Q(S, 0, 'multiply their commutators to get a sign kappa', 0.6) * f1;
    chip(1150, 280, 1000, 62, 'κ(ρ) = ∏ᵢ [Ãᵢ, B̃ᵢ] ∈ μ₂   (independent of the lifts)', C.gold, kq, 23);
    const eq = Q(S, 0, 'A lift exists exactly when kappa is plus one', 0.6) * f1;
    chip(1150, 370, 1000, 58, 'lift exists ⇔ κ = +1 ;  lifts form an H¹(X; μ₂)-torsor', C.green, eq, 22);
    const nq = Q(S, 0, 'two to the two g of them', 0.6) * f1;
    lbl('2²ᵍ lift classes ;  genus 3 :  64', 1150, 445, C.white, nq, 20);
    const sq = Q(S, 0, 'for the genus-three family, sixty-four', 0.6) * f1;
    for (let i = 0; i < 64; i++) { const qq = clamp(sq * 1.6 - i / 80), x = 760 + (i % 16) * 49, y = 500 + Math.floor(i / 16) * 49; fillBox(x, y, 40, 40, C.green, qq * 0.35); rect63(x, y, 40, 40, C.green, qq, 1.2); }
    lbl('ρₙ : κ = +1 , 64 lifts , none merged', 1150, 720, C.green, sq, 17);
  }
  const q = Q(S, 1, 'Two extra half-turn gates', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 56, 'P₀ = diag(−1, −1, 1, 1, 1) ← e₁e₂', C.mag, q, 22);
    chip(530, 330, 860, 56, 'Q₀ = diag(1, −1, −1, 1, 1) ← e₂e₃', C.mag, q, 22);
    const aq = Q(S, 1, 'lift to anticommuting Clifford pairs', 0.6);
    chip(530, 410, 860, 58, '(e₁e₂)(e₂e₃) = −(e₂e₃)(e₁e₂)  ⇒  κ = −1', C.red, aq, 23);
    lbl('genus 4 : a₁ ↦ P₀ , b₁ ↦ Q₀ , other a ↦ the three dense gates , b ↦ I', 530, 470, C.dim, aq, 15);
    const dq = Q(S, 1, 'a dense representation with kappa minus one and no lift', 0.6);
    stamp('DENSE , NO LIFT', 530, 570, dq, C.red, 34, -0.05);
    const cq = Q(S, 1, 'costs a cover of degree m, or two m', 0.6);
    box(1040, 250, 740, 200, C.gold, cq, 2, 'rgba(40,30,0,0.4)');
    lbl('source + orientation + Spin lift :  D_min =', 1410, 295, C.gold, cq, 18);
    lblG('m   if ε₀ = 1 and (κ = 1 or m even)', 1410, 350, C.white, cq, 22);
    lblG('2m  otherwise', 1410, 405, C.white, cq, 22);
    const ex = [['ε₀ = 1 , κ = 1 , m = 3', '3'], ['ε₀ = 1 , κ = −1 , m = 3', '6'], ['ε₀ = 1 , κ = −1 , m = 4', '4'], ['ε₀ = −1 , κ = 1 , m = 3', '6']];
    ex.forEach(([a1, a2], i) => { const y = 490 + i * 62; box(1040, y, 740, 50, C.white, cq, 1.2, 'rgba(0,0,0,0.45)'); lbl(a1, 1070, y + 33, C.white, cq, 17, 'left'); lbl('D = ' + a2, 1750, y + 33, C.gold, cq, 20, 'right'); });
  }
};

/* ---- 10 SIXTEEN TO ONE ---- */
SCENES.jump = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'Now an explicit family z of t', 0.6);
  chip(W / 2, 250, 1500, 56, 'z(t) : A₁ = R₁₂(π + t) R₃₄(2t) ,  A₂ = exp(t(J₂₅ + J₄₅)) D₂ ,  A₃ = D₃ ,  Bᵢ = I ,  0 ≤ t ≤ 1/10', C.white, q0, 19);
  const gq = Q(S, 0, 'with gap above one throughout', 0.6);
  lbl('σ₁₀(z(t)) ≥ 2 − 2√14 t > 1 ,  κ = 1 ,  same genus-three curve', W / 2, 310, C.green, gq, 17);
  const zq = Q(S, 0, 'At t equal zero the complex commutant has dimension four', 0.6);
  box(150, 360, 760, 420, C.gold, zq, 2, 'rgba(40,30,0,0.3)');
  lbl('t = 0 :  q = 4 ,  Z = μ₂⁴', 530, 400, C.gold, zq, 22);
  const sq = Q(S, 0, 'the forgotten object has sixteen simple summands', 0.6);
  for (let i = 0; i < 16; i++) { const qq = clamp(sq * 1.6 - i / 20), x = 290 + (i % 4) * 125, y = 430 + Math.floor(i / 4) * 80; fillBox(x, y, 100, 60, C.gold, qq * 0.35); rect63(x, y, 100, 60, C.gold, qq, 1.4); lbl('F_χ' + (i + 1), x + 50, y + 38, C.white, qq, 15); }
  const pq = Q(S, 1, 'For every positive t the kernel is zero', 0.6);
  box(1010, 360, 760, 420, C.cyan, pq, 2, 'rgba(0,30,40,0.3)');
  lbl('t > 0 :  q = 0 ,  Z = 1', 1390, 400, C.cyan, pq, 22);
  fillBox(1300, 430, 180, 80, C.cyan, pq * 0.35); rect63(1300, 430, 180, 80, C.cyan, pq, 2); lbl('F_E_t simple', 1390, 478, C.white, pq, 17);
  const lq = Q(S, 1, 'the complex gap grows only linearly', 0.6);
  const px = 1060, py = 760, pw = 650, ph = 200, xS = x => px + x / 0.1 * pw, yS = v => py - v / 0.1 * ph;
  plotAxes(px, py, pw, ph, lq, 't', 'σ₂₄(z(t))');
  curve(p => { const x = p * 0.1; return [xS(x), yS(interp73(JUMP73.map(r => [r[0], r[2]]), x))]; }, 60, C.cyan, lq, 3);
  JUMP73.forEach(r => dot(xS(r[0]), yS(r[2]), 6, 'c', lq));
  lbl('σ₂₄ / t ≈ 0.915', xS(0.06), yS(0.08), C.cyan, lq, 16);
  const cq = Q(S, 1, 'The characteristic cycle stays the same', 0.6);
  chip(W / 2, 855, 1400, 50, 'CC(F_E_t) = CC(F_E_0) = Σ_χ CC(F_E_0,χ)   ·   End⁰(F̃_E_t) = ℂ : no projection lifts', C.mag, cq, 19);
  stamp('16 → 1', 1650, 475, pq, C.red, 40, -0.05);
};

/* ---- 11 FINITE BUDGETS ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Without a budget there is no uniform bound', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'For words of length at most L', 0.6) * f1;
    chip(530, 260, 860, 62, 'Δ_D,L(ρ, σ) ≤ min{ 2 ,  D L δ(ρ, σ) }', C.gold, q, 25);
    lbl('δ = max over generators of ‖ρ(s) − σ(s)‖_op ; telescoping over word and tensor factors', 530, 320, C.dim, q, 14);
    const gq = Q(S, 0, 'a weighted sum over all budgets', 0.6) * f1;
    const gx = 200, gy = 380, cw = 52;
    for (let D = 1; D <= 8; D++) for (let L = 1; L <= 8; L++) { const wgt = Math.pow(2, -(D + L)) * 4, qq = clamp(gq * 1.6 - (D + L) / 18); fillBox(gx + (L - 1) * cw, gy + (D - 1) * cw, cw - 5, cw - 5, C.cyan, qq * Math.min(0.9, 0.1 + wgt * 3)); rect63(gx + (L - 1) * cw, gy + (D - 1) * cw, cw - 5, cw - 5, C.cyan, qq * 0.6, 1); }
    lbl('L →', gx + 4 * cw, gy - 12, C.dim, gq, 16); lbl('D ↓', gx - 30, gy + 4 * cw, C.dim, gq, 16);
    lbl('weight 2^−(D+L)', gx + 4 * cw, gy + 8 * cw + 30, C.cyan, gq, 16);
    const mq = Q(S, 0, 'gives a complete metric', 0.6) * f1;
    chip(1350, 330, 840, 62, 'd_fin = Σ_D,L 2^−(D+L) min{ 1 , Δ_D,L }', C.cyan, mq, 24);
    chip(1350, 430, 840, 62, '¼ min{1, δ} ≤ d_fin ≤ 4δ', C.green, Q(S, 0, 'd fin at most four delta', 0.6) * f1, 26);
    lbl('Σ 2^−(D+L) D L = 4 ;  compact , complete ; conjugation quotient separates the points', 1350, 495, C.dim, mq, 15);
    lbl('W₁₄ tasks need only standard tensor budget 2D', 1350, 540, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'Without a budget there is no uniform bound', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, 'ρₙ(a₁) = I ,  σₙ(a₁) = R₁₂(π/n) ,  other gates dense , Bᵢ = I', C.white, q, 20);
    const dq = Q(S, 1, 'the gate distance two sine pi over two n goes to zero', 0.6);
    const px = 150, py = 760, pw = 760, ph = 380, xS = n => px + (Math.log2(n) - 1) / 5 * pw, yS = v => py - v / 2.2 * ph;
    plotAxes(px, py, pw, ph, dq, 'n  (2 … 64 , log)', 'distance');
    curve(p => { const n = Math.pow(2, 1 + p * 5); return [xS(n), yS(2 * Math.sin(Math.PI / (2 * n)))]; }, 60, C.gold, dq, 3);
    BUD73.forEach(r => { dot(xS(r[0]), yS(r[1]), 7, 'g', dq); lbl(String(r[0]), xS(r[0]), py + 26, C.dim, dq, 14); });
    lbl('δₙ = 2 sin(π/2n) → 0', xS(4), yS(0.9), C.gold, dq, 17, 'left');
    const wq = Q(S, 1, 'yet the word of length n and the n-th tensor power both stay at distance two', 0.6);
    line(xS(2), yS(2), xS(64), yS(2), C.red, wq, 3);
    BUD73.forEach(r => { dot(xS(r[0]), yS(r[2]), 7, 'r', wq); });
    lbl('Δ₁,ₙ = Δₙ,₁ = 2', xS(16), yS(2) - 16, C.red, wq, 17);
    stamp('NO UNIFORM BOUND', 1400, 420, wq, C.red, 36, -0.05);
    lbl('word a₁ⁿ : I versus R₁₂(π) ;  tensor power v^⊗n : eigenvalue −1', 1400, 500, C.dim, wq, 15);
    lbl('common compact conjugation does not remove it', 1400, 535, C.dim, wq, 15);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Geometric Langlands, Tannakian reconstruction and recovery duality are published inputs', 'published'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['COMPLEX', '1 − √(1 − β)', C.gold, 'Complex recovery meets the same curve'], ['RETURN', 'K² + PUQUP', C.cyan, 'the second step brings back'], ['PATH', '1 + 4cos nθ', C.mag, 'the path decides what tensors cannot'], ['TENSORS · REFS', 'c = 1 · 1600 ε', C.green, 'two tensors and two references pin the rotation'], ['SIGN', 'κ = ±1', C.red, 'one sign decides the lift'], ['JUMP', '16 → 1 , same CC', C.vio, 'sixteen summands become one']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 130, 240, 260, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 20); });
    lbl('PUBLISHED · geometric Langlands (Gaitsgory–Raskin et al.) · Tannakian reconstruction (Deligne–Milne) · recovery duality (Bény–Oreshkov)', W / 2, 470, C.cyan, Q(S, 1, 'Geometric Langlands, Tannakian reconstruction and recovery duality are published inputs') * fade, 15);
    lbl('CLASSICAL · Schur · root data of B₂ and C₂ · Riemann–Hilbert · Hoeffding · Spin obstruction class · Jordan automorphisms', W / 2, 515, '#8fbcff', Q(S, 1, 'are published inputs') * fade, 15);
    lbl('VOLUMES · complex-class bound · leak–return identity · infinite path family · c²=c³=1 · Sp₄ eigen-object · two references · correction · D_min · 16 → 1 · budgets', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · SDP recovery errors · leak and return term · traces · stabiliser dim 10 · shift −40 · ratio ≤ 63 · Newton corrections · Clifford sign · σ₁₀ , σ₂₄ , q · δₙ', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 690, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC Ω VII · SO5 PATHS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC Ω 第七部 · SO₅ 路径、十四维恢复与 Hecke · TRURETURING FILM 073', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Three gates, two tensors, two references, one sign, and a jump from sixteen to one.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC Ω VII', complex: 'COMPLEX CLASS', leak: 'LEAK AND RETURN', paths: 'INFINITE PATH FAMILY', tensors: 'TWO TENSORS', hecke: 'Sp4 EIGEN-OBJECTS', acquire: 'TWO REFERENCES', correct: 'EXPLICIT CORRECTION', spin: 'SPIN LIFTS', jump: 'SIXTEEN TO ONE', budget: 'FINITE BUDGETS', finale: 'LEDGER' });

function poster73() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('tr ρₙ(b₁) = 1 + 4 cos(nπ√2)', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('Stab(tr ST , tr STU) = SO₅', 1320, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('Sp₄ eigen-object ↔ ℂ[−40] · 16 → 1', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC Ω 第七部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC Ω VII · SO5 PATHS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('SO₅ 路 径 · 十 四 维 恢 复 · Hecke', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 073', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster73;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
