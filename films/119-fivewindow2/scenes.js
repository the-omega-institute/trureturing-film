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

/* ---- film 119: AURIC FIVE-WINDOW MEMORY II · switched channels ---- */
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
const _po119 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po119.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po119.set(key, off); }
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
/* ---- film 119 data (from verify119.py / vis119.json) ---- */
const VIS119Q = [["r", "0", "0", "η", "0"], ["r", "0", "0", "η", "0"], ["0", "r", "0", "0", "η"], ["0", "0", "1", "0", "0"], ["0", "0", "1", "0", "0"]];
const GA119 = [[1.0, 0.0, 1.0, 0.0, -0.7071, 0.7071, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0, -0.7071, 0.7071, 1.0, 0.0], [1.0, 0.0, 1.0, 0.0, -0.7071, 0.7071, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0, -0.7071, 0.7071, 1.0, 0.0], [-0.7071, -0.7071, -0.7071, -0.7071, 1.0, -1.0, -0.7071, -0.7071], [0.7071, 0.7071, 0.7071, 0.7071, -1.0, 1.0, 0.7071, 0.7071], [0.0, 1.0, 0.0, 1.0, -0.7071, 0.7071, 1.0, 0.0], [1.0, 0.0, 1.0, 0.0, -0.7071, 0.7071, 0.0, 1.0]];
const MIXA119 = [[1, 1.777778], [2, 1.563452], [3, 1.178218], [4, 0.850022], [5, 0.686715], [6, 0.541561], [7, 0.441701], [8, 0.347662], [9, 0.285885], [10, 0.229135], [11, 0.18392], [12, 0.151149], [13, 0.120612], [14, 0.10064], [15, 0.081252], [16, 0.066751], [17, 0.055031], [18, 0.044541], [19, 0.03732], [20, 0.030303], [21, 0.025222], [22, 0.020779], [23, 0.017035], [24, 0.014237], [25, 0.011626], [26, 0.009719], [27, 0.007999], [28, 0.006615], [29, 0.005506], [30, 0.004521], [31, 0.003778], [32, 0.00311], [33, 0.002584], [34, 0.002144], [35, 0.001769], [36, 0.001475], [37, 0.001216], [38, 0.001012], [39, 0.000838], [40, 0.000694]];
const SECOND119 = 0.829484;
const INFALT119 = [[0, 1.92], [1, 1.777778], [2, 1.6], [3, 1.216265], [4, 1.0], [5, 1.0], [6, 1.0], [7, 1.0], [8, 1.0], [9, 1.0], [10, 1.0], [11, 1.0], [12, 1.0], [13, 1.0], [14, 1.0], [15, 1.0], [16, 1.0]];
const SPEC119 = [[1, 2], [-0.5, 3], [0, 20]];
const RATE119 = [[2, 1.333333, 1.333333], [3, 0.666667, 0.666667], [4, 0.333333, 0.333333], [5, 0.166667, 0.166667], [6, 0.083333, 0.083333], [7, 0.041667, 0.041667], [8, 0.020833, 0.020833]];
const INFC119 = [[2, 1.6, 2.333333], [3, 1.216265, 1.666667], [4, 1.0, 1.333333], [5, 1.0, 1.166667], [6, 1.0, 1.083333], [7, 1.0, 1.041667], [8, 1.0, 1.020833]];
const NPT119 = [[0, -0.5, -0.5], [1, -0.25, -0.25], [2, -0.125, -0.125], [3, -0.0625, -0.0625], [4, -0.03125, -0.03125], [5, -0.015625, -0.015625], [6, -0.007813, -0.007812], [7, -0.003906, -0.003906], [8, -0.001953, -0.001953], [9, -0.000977, -0.000977], [10, -0.000488, -0.000488], [11, -0.000244, -0.000244], [12, -0.000122, -0.000122]];
const KLMIN119 = [[0.3, 0.807419], [0.5, 0.623611], [0.7, 0.726169]];
const CODES119 = [5, 3, 2, 1, 1, 1, 1];
const DIAM119 = [[0.0, 2.0], [0.025, 2.0], [0.05, 2.0], [0.075, 2.0], [0.1, 2.0], [0.125, 2.0], [0.15, 2.0], [0.175, 2.0], [0.2, 2.0], [0.225, 2.0], [0.25, 2.0], [0.275, 2.0], [0.3, 2.0], [0.325, 2.0], [0.35, 2.0], [0.375, 2.0], [0.4, 2.0], [0.425, 2.0], [0.45, 2.0], [0.475, 2.0], [0.5, 2.0], [0.525, 1.997498], [0.55, 1.989975], [0.575, 1.977372], [0.6, 1.959592], [0.625, 1.936492], [0.65, 1.907878], [0.675, 1.873499], [0.7, 1.83303], [0.725, 1.786057], [0.75, 1.732051], [0.775, 1.670329], [0.8, 1.6], [0.825, 1.519868], [0.85, 1.428286], [0.875, 1.322876], [0.9, 1.2], [0.925, 1.053565], [0.95, 0.87178], [0.975, 0.6245], [1.0, 0.0]];
const P0C119 = [[0.0, 1.0], [0.01, 0.970396], [0.02, 0.941569], [0.03, 0.913495], [0.04, 0.886154], [0.05, 0.859524], [0.06, 0.833585], [0.07, 0.808318], [0.08, 0.783704], [0.09, 0.759725], [0.1, 0.736364], [0.11, 0.713604], [0.12, 0.691429], [0.13, 0.669823], [0.14, 0.648772], [0.15, 0.628261], [0.16, 0.608276], [0.17, 0.588803], [0.18, 0.569831], [0.19, 0.551345], [0.2, 0.533333], [0.21, 0.515785], [0.22, 0.498689], [0.23, 0.482033], [0.24, 0.465806], [0.25, 0.45], [0.26, 0.434603], [0.27, 0.419606], [0.28, 0.405], [0.29, 0.390775], [0.3, 0.376923], [0.31, 0.363435], [0.32, 0.350303], [0.33, 0.337519], [0.34, 0.325075], [0.35, 0.312963], [0.36, 0.301176], [0.37, 0.289708], [0.38, 0.278551], [0.39, 0.267698], [0.4, 0.257143], [0.41, 0.246879], [0.42, 0.236901], [0.43, 0.227203], [0.44, 0.217778], [0.45, 0.208621], [0.46, 0.199726], [0.47, 0.191088], [0.48, 0.182703], [0.49, 0.174564], [0.5, 0.166667], [0.51, 0.159007], [0.52, 0.151579], [0.53, 0.144379], [0.54, 0.137403], [0.55, 0.130645], [0.56, 0.124103], [0.57, 0.117771], [0.58, 0.111646], [0.59, 0.105723], [0.6, 0.1]];
const ALPHA119 = 0.219224;
const EX119 = {"p0": 0.859524, "delta": 0.418283, "k": 1, "N": 3, "a": 0.857375, "kappa": 0.69938};
const SMALL119 = [[3, 0.333997, 2], [6, 0.017666, 2], [9, 0.000393, 2], [12, 1.5e-05, 2], [15, 0.0, 1.673271], [18, 0.0, 1.170252], [21, 0.0, 0.818451], [24, 0.0, 0.572408], [27, 0.0, 0.400331], [30, 0.0, 0.279983], [33, 0.0, 0.195815], [36, 0.0, 0.136949]];
const WORDS119 = {"rand": [[1, 1.690174], [2, 1.388092], [3, 0.787707], [4, 0.231963], [6, 0.052024], [8, 0.023485], [10, 0.010687], [12, 0.001498], [16, 0.000113], [20, 3e-06], [24, 0.0]], "alt37": [[1, 1.777778], [2, 1.555833], [3, 1.070858], [4, 0.906827], [6, 0.83081], [8, 0.761419], [10, 0.697702], [12, 0.639281], [16, 0.536689], [20, 0.450559], [24, 0.378251]], "c45": [[1, 1.777778], [2, 1.597327], [3, 1.195502], [4, 0.994828], [6, 0.988469], [8, 0.983207], [10, 0.978185], [12, 0.973208], [16, 0.963325], [20, 0.953541], [24, 0.943855]], "abhalf": [[1, 1.777778], [2, 1.6], [3, 1.216265], [4, 1.0], [6, 1.0], [8, 1.0], [10, 1.0], [12, 1.0], [16, 1.0], [20, 1.0], [24, 1.0]]};
const PI119 = {"a": [0.186076, 0.079747, 0.620253, 0.079747, 0.034177], "b": [0.079747, 0.186076, 0.113924, 0.186076, 0.434177]};
const NEAR119 = {"10": [[0.3, 1.331041], [0.31, 1.390568], [0.32, 1.448291], [0.33, 1.503998], [0.34, 1.557485], [0.35, 1.608566], [0.36, 1.657063], [0.37, 1.702816], [0.38, 1.745677], [0.39, 1.785513], [0.4, 1.822204], [0.41, 1.855645], [0.42, 1.885746], [0.43, 1.912429], [0.44, 1.935632], [0.45, 1.955307], [0.46, 1.971418], [0.47, 1.983944], [0.48, 1.992878], [0.49, 1.998224], [0.5, 2.0], [0.51, 1.998236], [0.52, 1.992974], [0.53, 1.984269], [0.54, 1.972184], [0.55, 1.956795], [0.56, 1.938189], [0.57, 1.916461], [0.58, 1.891716], [0.59, 1.864066], [0.6, 1.833635], [0.61, 1.800552], [0.62, 1.764953], [0.63, 1.726981], [0.64, 1.686784], [0.65, 1.644518], [0.66, 1.600342], [0.67, 1.554417], [0.68, 1.506911], [0.69, 1.457993], [0.7, 1.407835]], "40": [[0.3, 0.334853], [0.31, 0.405786], [0.32, 0.485129], [0.33, 0.572559], [0.34, 0.667487], [0.35, 0.769056], [0.36, 0.876143], [0.37, 0.987383], [0.38, 1.101189], [0.39, 1.215794], [0.4, 1.329296], [0.41, 1.439711], [0.42, 1.545029], [0.43, 1.643275], [0.44, 1.732568], [0.45, 1.811179], [0.46, 1.87758], [0.47, 1.930495], [0.48, 1.968933], [0.49, 1.992218], [0.5, 2.0], [0.51, 1.992269], [0.52, 1.969344], [0.53, 1.931857], [0.54, 1.880728], [0.55, 1.817134], [0.56, 1.742464], [0.57, 1.658274], [0.58, 1.566242], [0.59, 1.468112], [0.6, 1.365652], [0.61, 1.2606], [0.62, 1.154624], [0.63, 1.049286], [0.64, 0.946005], [0.65, 0.846037], [0.66, 0.750455], [0.67, 0.660138], [0.68, 0.575767], [0.69, 0.497827], [0.7, 0.42662]], "160": [[0.3, 0.001341], [0.31, 0.002942], [0.32, 0.006107], [0.33, 0.012025], [0.34, 0.022517], [0.35, 0.040181], [0.36, 0.068472], [0.37, 0.111622], [0.38, 0.17436], [0.39, 0.261361], [0.4, 0.376457], [0.41, 0.521666], [0.42, 0.696221], [0.43, 0.895792], [0.44, 1.112137], [0.45, 1.333353], [0.46, 1.544814], [0.47, 1.730713], [0.48, 1.875997], [0.49, 1.968371], [0.5, 2.0], [0.51, 1.96858], [0.52, 1.877591], [0.53, 1.735691], [0.54, 1.555393], [0.55, 1.351302], [0.56, 1.138237], [0.57, 0.929565], [0.58, 0.735984], [0.59, 0.56487], [0.6, 0.42019], [0.61, 0.302873], [0.62, 0.211479], [0.63, 0.142993], [0.64, 0.093589], [0.65, 0.059264], [0.66, 0.036288], [0.67, 0.021473], [0.68, 0.012271], [0.69, 0.006767], [0.7, 0.003597]]};
const DOEB119 = {"kappa4": 0.0081, "min4": 0.027, "lam": 0.9595};
/* ---- film 119 helpers ---- */
function cell119(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.5); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
/* the five windows with the allowed population moves of Q */
const WPOS119 = [[-0.9, -0.75], [0.6, -0.75], [0.6, 0.75], [-0.9, 0.75], [1.75, 0.75]];
const WLAB119 = ['000', '100', '010', '001', '101'];
const QEDGE119 = [[0, 0, 'r'], [0, 3, 'η'], [1, 0, 'r'], [1, 3, 'η'], [2, 1, 'r'], [2, 4, 'η'], [3, 2, '1'], [4, 2, '1']];
function qgraph119(cx, cy, R, a, hl = null) {
  if (a <= 0) return;
  const P = WPOS119.map(p => [cx + R * p[0], cy + R * p[1]]);
  QEDGE119.forEach(([i, j, w], k) => {
    const q = hl ? hl(k) : 1; if (q <= 0) return;
    const col = w === 'r' ? C.cyan : w === 'η' ? C.gold : C.mag;
    if (i === j) { ring(P[i][0] - 34, P[i][1] - 34, 22, col, a * q, 2.5); lblG(w, P[i][0] - 70, P[i][1] - 58, col, a * q, 20, 'right'); return; }
    const dx = P[j][0] - P[i][0], dy = P[j][1] - P[i][1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy * 9, ny = ux * 9;
    arrow(P[i][0] + ux * 30 + nx, P[i][1] + uy * 30 + ny, P[j][0] - ux * 30 + nx, P[j][1] - uy * 30 + ny, col, a * q, 2.5);
    lblG(w, (P[i][0] + P[j][0]) / 2 + nx * 2.6, (P[i][1] + P[j][1]) / 2 + ny * 2.6 + 7, col, a * q, 19);
  });
  P.forEach((p, i) => { dot(p[0], p[1], 15, ['n', 'c', 'g', 'o', 'm'][i], a); const up = i <= 1; lbl(WLAB119[i], p[0] + (i === 0 ? 30 : 0), p[1] + (up ? -28 : 46), C.white, a, 18); lbl('e' + i, p[0] + (i === 0 || i === 3 ? -36 : i === 2 ? -28 : 36), p[1] + (i === 2 ? -20 : 6), C.dim, a, 15); });
}
/* a log-scale plot helper: returns y for value v */
function logY119(py, ph, lo, hi) { return v => py - (Math.log10(Math.max(v, 1e-12)) - lo) / (hi - lo) * ph; }
function tape119(x, y, labs, cols, a, cw = 74) { if (a <= 0) return; labs.forEach((s, i) => { const q = clamp(a * 1.6 - i / (labs.length * 1.2)); cell119(x + i * cw, y, cw - 10, 58, s, cols[i], q, 24); }); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyrG64(470, 470, 220, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.9);
  lbl('five windows : 000 · 100 · 010 · 001 · 101', 470, 720, C.dim, s0, 18);
  lbl('one kept system ℂ⁵ , one schedule fixed in advance', 470, 755, C.dim, Q(S, 0, 'on a schedule fixed in advance', 0.6), 16);
  const items = [['one five-window channel repeated in time', 'PART ONE · FIXED CHANNEL', 'Φ ∘ Φ ∘ Φ ∘ ⋯', C.cyan], ['lets the channel switch at every step', 'PART TWO · SWITCHED CHANNELS', 'Φₙ ∘ ⋯ ∘ Φ₂ ∘ Φ₁ , fixed in advance', C.gold], ['a classical bit', 'WHAT SURVIVES?', 'a classical bit', C.green], ['an entangled pair, or an exact qubit', 'OR …', 'an entangled pair · an exact qubit', C.mag]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyrG64(W / 2, 410, 230, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.7);
  chip(330, 360, 360, 58, 'two mixers , one bit', C.gold, rp, 22); chip(330, 445, 360, 58, 'no qubit after 3 steps', C.mag, rp, 22); chip(330, 530, 360, 58, 'erasure iff ½ ∉ K', C.green, rp, 22);
  box(1400, 340, 400, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('exact codes over the class', 1600, 410, C.cyan, rp, 20); lblG('5 , 3 , 2 , 1 , 1 , …', 1600, 470, C.white, rp, 30);
  txt(scramble('AURIC 5-WINDOW II · SWITCH', rp, 119), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 五 窗 口 记 忆 第 二 部 · 切 换 通 道 、存 活 的 一 位 与 一 致 遗 忘', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 119 · AURIC_FIB_FIVE_WINDOW_SWITCHED_MEMORY · AURIC_FIB_FIVE_WINDOW_UNIFORM_SWITCHING_ERASURE', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 MODEL ---- */
SCENES.model = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The schedule is fixed', 0.6);
  const q0 = Q(S, 0, 'Five windows', 0.6);
  const gq = Q(S, 0, 'windows zero and one go to zero', 0.6);
  qgraph119(450, 500, 210, q0, k => k < 4 ? gq : clamp(gq * 2 - 0.6 - k / 10));
  lbl('five windows , no two adjacent ones', 450, 790, C.dim, q0, 16);
  if (f1 > 0) {
    const aq = Q(S, 0, 'A channel is allowed', 0.6) * f1;
    const M = VIS119Q;
    mgrid(1080, 300, M, 70, 52, aq, { size: 20, colf: v => v === 'r' ? C.cyan : v === 'η' ? C.gold : v === '1' ? C.mag : C.dim });
    lbl('Q = Q_η ,  r = 1 − η', 1255, 280, C.white, aq, 18);
    WLAB119.forEach((s, i) => { lbl(s, 1060, 332 + i * 52, C.dim, aq, 15, 'right'); lbl(s, 1115 + i * 70, 590, C.dim, aq, 14); });
    lbl('in →', 1000, 600, C.dim, aq, 14, 'left'); lbl('out', 1255, 618, C.dim, aq, 14);
    const dq = Q(S, 0, 'its output diagonal is the population matrix Q', 0.6) * f1;
    chip(1440, 680, 720, 60, 'diag Φ(X) = Qᵀ diag X   for every complex X', C.gold, dq, 23);
    lbl('includes every off-diagonal matrix unit |eᵢ⟩⟨eⱼ|', 1440, 740, C.dim, dq, 16);
    const kq = Q(S, 0, 'for every complex input', 0.6) * f1;
    box(1500, 300, 320, 200, C.cyan, kq, 1.6, 'rgba(0,30,40,0.4)');
    lbl('one channel :', 1660, 335, C.cyan, kq, 16);
    lblG('α₀ ⊥ α₁ , β₀ ⊥ β₁', 1660, 375, C.white, kq, 18); lblG('δ₀ ⊥ δ₁ , γ free', 1660, 410, C.white, kq, 18);
    lbl('8 env vectors , one Gram', 1660, 445, C.dim, kq, 15); lbl('Choi rank 2 … 8', 1660, 475, C.dim, kq, 15);
  }
  const q1 = Q(S, 1, 'The schedule is fixed', 0.6, 0.3);
  if (q1 > 0) {
    tape119(1000, 270, ['Φ₁', 'Φ₂', 'Φ₃', 'Φ₄', 'Φ₅', 'Φ₆', '⋯'], [C.cyan, C.gold, C.mag, C.cyan, C.gold, C.mag, C.dim], q1, 110);
    lbl('chosen before the input , no feedback', 1380, 360, C.dim, q1, 16);
    const eq = Q(S, 1, 'every step uses a fresh environment', 0.6);
    for (let i = 0; i < 6; i++) { const x = 1032 + i * 110; ring(x, 400, 13, C.green, eq, 2); line(x, 413, x, 432, C.green, eq * 0.6, 1.5); lbl('✕', x, 452, C.dim, eq, 14); }
    lbl('fresh environment per step , discarded at once', 1380, 490, C.green, eq, 16);
    const bq = Q(S, 1, 'Any block of steps then follows the product', 0.6);
    chip(1380, 560, 780, 58, 'diag T_b:a(X) = Q_η_bᵀ ⋯ Q_η_aᵀ diag X', C.gold, bq, 22);
    const tq = Q(S, 1, 'any three steps pull window two back', 0.6);
    chip(1380, 650, 780, 60, '(Φ₃ Φ₂ Φ₁)† (E₂) = η₂ ( r₁ P_L + P_D ) > 0', C.mag, tq, 23);
    lbl('eigenvalues η₂ r₁ and η₂ ; an effect , not a density', 1380, 712, C.dim, tq, 16);
  }
};

/* ---- 03 MIXERS ---- */
SCENES.mixers = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Repeated alone', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Fix eta at one half', 0.6) * f1;
    chip(530, 260, 860, 58, 'η = ½ :  u = (e₀ + e₃)/√2 , v = (e₁ + e₄)/√2 , z = e₂', C.white, q, 21);
    const cq = Q(S, 0, 'Take the canonical channel C', 0.6) * f1;
    chip(530, 340, 860, 56, 'K₀ = |u⟩⟨e₀| + q|v⟩⟨e₂| + |z⟩⟨e₄|', C.cyan, cq, 21);
    chip(530, 405, 860, 56, 'K₁ = |u⟩⟨e₁| + q|v⟩⟨e₂| + |z⟩⟨e₃|', C.cyan, cq, 21);
    const sq = Q(S, 0, 'a sign flip S on window one', 0.6) * f1;
    chip(530, 485, 860, 56, 'S = diag(1, −1, 1, 1, 1) ,  Ad_S(X) = S X S', C.gold, sq, 22);
    const abq = Q(S, 0, 'A applies C, then S', 0.6) * f1;
    cell119(150, 545, 360, 66, 'A = Ad_S ∘ C', C.gold, abq, 24); cell119(550, 545, 360, 66, 'B = C ∘ Ad_S', C.mag, Q(S, 0, 'B applies S, then C', 0.6) * f1, 24);
    const rq = Q(S, 0, 'Both are allowed', 0.6) * f1;
    lbl('same full-input law · Choi rank 2 · two-dimensional environment', 530, 660, C.green, rq, 16);
    const gx = 1150, gy = 270, cw = 60;
    lbl('G_A : the actual Gram of A', gx + 4 * cw, gy - 14, C.white, rq, 18);
    GA119.forEach((row, i) => row.forEach((v, j) => { const qq = clamp(rq * 1.6 - (i * 8 + j) / 90), col = v > 0.01 ? C.cyan : v < -0.01 ? C.red : C.dim; fillBox(gx + j * cw, gy + i * cw, cw - 6, cw - 6, col, qq * Math.min(0.75, Math.abs(v) * 0.7 + 0.05)); rect63(gx + j * cw, gy + i * cw, cw - 6, cw - 6, col, qq * 0.7, 1); lbl(Math.abs(v) < 0.01 ? '0' : Math.abs(Math.abs(v) - 1) < 0.01 ? (v > 0 ? '1' : '−1') : (v > 0 ? 'q' : '−q'), gx + j * cw + 27, gy + i * cw + 36, C.white, qq, 16); }));
    ['α₀', 'α₁', 'β₀', 'β₁', 'γ₀', 'γ₁', 'δ₀', 'δ₁'].forEach((s, i) => { lblG(s, gx - 22, gy + i * cw + 36, C.dim, rq, 16); });
    lbl('rank 2 ; not in the four-phase orbit of G_C', gx + 4 * cw, gy + 8 * cw + 34, C.gold, rq, 16);
  }
  const q = Q(S, 1, 'Repeated alone', 0.6, 0.3);
  if (q > 0) {
    const tq = Q(S, 1, 'a reflection and a signed three-cycle', 0.6);
    const cx = 450, cy = 520, R = 170, P = [[cx, cy - R], [cx + R * 0.87, cy + R * 0.5], [cx - R * 0.87, cy + R * 0.5]];
    strokePoly(P, C.dim, q * 0.5, 1.5);
    ['u', 'v₋', 'z'].forEach((s, i) => { dot(P[i][0], P[i][1], 16, ['c', 'g', 'm'][i], q); lbl(s, P[i][0] + (i === 0 ? 34 : i === 1 ? 40 : -40), P[i][1] + (i === 0 ? 6 : 34), C.white, q, 22); });
    lbl('output space R₋ = span{u, v₋, z}', cx, cy + R * 0.5 + 80, C.dim, q, 16);
    lbl('qU₀ , qV₁ : the Kraus maps of A on R₋', cx, cy - R - 36, C.dim, q, 15);
    // U0 : fixes u, swaps v- and z (gold, inside) ; V1 : u -> z -> v- -> -u (magenta, along the outside)
    curve(p => [P[2][0] + 40 + p * (P[1][0] - P[2][0] - 80), P[2][1] - 18 - Math.sin(p * Math.PI) * 40], 30, C.gold, tq, 3);
    arrow(P[1][0] - 46, P[1][1] - 22, P[1][0] - 40, P[1][1] - 18, C.gold, tq, 3); arrow(P[2][0] + 46, P[2][1] - 22, P[2][0] + 40, P[2][1] - 18, C.gold, tq, 3);
    ring(P[0][0], P[0][1], 26, C.gold, tq, 2);
    lane(P[0], P[2], 22, C.mag, tq, '', 3); lane(P[2], P[1], 22, C.mag, tq, '', 3); lane(P[1], P[0], 22, C.mag, tq, '−', 3);
    lbl('U₀ : fixes u , swaps v₋ and z ;  U₀² = I', cx, cy + R * 0.5 + 115, C.gold, tq, 17);
    lbl('V₁ : u → z → v₋ → −u ;  V₁³ = −I', cx, cy + R * 0.5 + 148, C.mag, tq, 17);
    const fq = Q(S, 1, 'whose only common fixed matrix is the identity', 0.6);
    chip(cx, 270, 600, 50, 'fixed space of ½(Ad_U₀ + Ad_V₁) = ℂ I', C.green, fq, 20);
    const pq = Q(S, 1, 'So A to the n converges to one reset', 0.6);
    const px = 1060, py = 760, pw = 700, ph = 400, xS = n => px + (n - 1) / 39 * pw, yS = logY119(py, ph, -3.3, 0.5);
    plotAxes(px, py, pw, ph, pq, 'n', '‖Aⁿ − R‖◇  (SDP , log)');
    [1, 0.1, 0.01, 0.001].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, pq, 14, 'right'));
    MIXA119.forEach(([n, v], i) => { const qq = clamp(pq * 1.6 - i / 50); dot(xS(n), yS(v), 6, 'g', qq); });
    curve(p => { const n = 1 + p * 39; return [xS(n), yS(interp119(MIXA119, n))]; }, 80, C.gold, pq, 2);
    lbl('second eigenvalue modulus ' + SECOND119.toFixed(4), px + pw, py - ph + 10, C.dim, pq, 15, 'right');
    chip(1410, 270, 700, 54, 'Aⁿ → R_(P_R₋/3) ,  Bⁿ → R_(P_R/3)', C.cyan, pq, 22);
    stamp('EACH ONE MIXES', 1580, 450, Q(S, 1, 'and so does B', 0.6), C.green, 26, -0.04);
  }
};
function interp119(arr, x) { if (x <= arr[0][0]) return arr[0][1]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][1] * (1 - f) + arr[i][1] * f; } return arr[arr.length - 1][1]; }

/* ---- 04 ALTERNATE ---- */
SCENES.alternate = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So a bit survives forever', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now alternate them', 0.6) * f1;
    const labs = ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B'];
    tape119(250, 280, labs, labs.map(s => s === 'A' ? C.gold : C.mag), q, 90);
    const pq = Q(S, 0, 'B after A is exactly C squared', 0.6) * f1;
    for (let k = 0; k < 4; k++) { const x0 = 250 + k * 180, x1 = x0 + 170; line(x0, 360, x0, 372, C.cyan, pq, 2); line(x0, 372, x1 - 10, 372, C.cyan, pq, 2); line(x1 - 10, 372, x1 - 10, 360, C.cyan, pq, 2); lblG('C²', (x0 + x1 - 10) / 2, 404, C.cyan, pq, 22); }
    lbl('time →', 970, 318, C.dim, q, 16, 'left');
    chip(600, 480, 860, 58, 'B_j A_i = K_j K_i   ⇒   B ∘ A = C²', C.cyan, pq, 23);
    const wq = Q(S, 0, 'so the word A, B, A, B is C to the n', 0.6) * f1;
    chip(600, 560, 860, 58, 'T₂ₘ = C²ᵐ ,   T₂ₘ₊₁ = Ad_S ∘ C²ᵐ⁺¹', C.gold, wq, 24);
    lbl('starting with B :  Ad_S C²ᵐ Ad_S  and  C²ᵐ⁺¹ Ad_S ; full maps , every complex input', 600, 620, C.dim, wq, 15);
    const hq = Q(S, 0, 'The phase is public', 0.6) * f1;
    box(1150, 270, 620, 220, C.green, hq, 2, 'rgba(0,40,20,0.35)');
    lbl('PUBLIC CONTROL', 1460, 310, C.green, hq, 20);
    lbl('start phase and terminal parity', 1460, 355, C.white, hq, 17);
    lbl('one public bit of schedule ,', 1460, 395, C.white, hq, 17);
    lbl('independent of the encoded label', 1460, 430, C.white, hq, 17);
    lbl('kept data : one ℂ⁵ , no copies', 1460, 470, C.dim, hq, 15);
    const sq = Q(S, 0, 'with one extra sign flip at odd times', 0.6) * f1;
    labs.forEach((s, i) => { if (i % 2 === 0) lbl('S', 250 + i * 90 + 40, 262, C.red, sq, 16); });
    lbl('odd times : one sign flip S on the output', 600, 690, C.red, sq, 16);
  }
  const q = Q(S, 1, 'So a bit survives forever', 0.6, 0.3);
  if (q > 0) {
    const eq = Q(S, 1, 'Encode zero as the pure state P along s', 0.6);
    const cx = 360, cy = 450;
    ell119(cx, cy, 230, 150, C.cyan, q, 2); lbl('R = span{u, v, z}', cx, cy - 165, C.cyan, q, 17);
    dot(cx - 120, cy, 16, 'g', eq); lbl('P = |s⟩⟨s|', cx - 120, cy + 44, C.gold, eq, 18); lbl('s = (u + v + z)/√3', cx - 120, cy + 70, C.dim, eq, 14);
    const mq = Q(S, 1, 'and one as M, uniform on the rest of R', 0.6);
    fillEll119(cx + 80, cy, 110, 80, C.mag, mq * 0.25); ell119(cx + 80, cy, 110, 80, C.mag, mq, 2); lbl('M = (P_R − P)/2', cx + 80, cy + 8, C.white, mq, 17); lbl('on R ∩ s⊥', cx + 80, cy + 34, C.dim, mq, 14);
    const bq = Q(S, 1, 'Both have populations one, one, two, one, one over six', 0.6);
    const pop = [1, 1, 2, 1, 1];
    [[150, C.gold, 'diag P'], [400, C.mag, 'diag M']].forEach(([x0, col, nm]) => { pop.forEach((v, i) => { const h = v * 40; fillBox(x0 + i * 40, 740 - h, 30, h, col, bq * 0.45); rect63(x0 + i * 40, 740 - h, 30, h, col, bq, 1.4); }); lbl(nm, x0 + 95, 770, col, bq, 16); });
    lbl('both = (1, 1, 2, 1, 1)/6', 690, 720, C.white, bq, 17, 'left');
    const rq = Q(S, 1, 'yet a terminal projection reads them', 0.6);
    const px = 1060, py = 760, pw = 700, ph = 380, xS = n => px + n / 24 * pw, yS = v => py - v / 2 * ph;
    plotAxes(px, py, pw, ph, rq, 'n', 'distance to the nearest reset (SDP)');
    [0, 1, 2].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, rq, 14, 'right'));
    dashed(px, yS(1), px + pw, yS(1), C.red, rq * 0.7, 1.5);
    INFALT119.forEach(([n, v], i) => dot(xS(n), yS(v), 8, 'g', clamp(rq * 1.6 - i / 25)));
    MIXA119.forEach(([n, v], i) => { if (n <= 24) dot(xS(n), yS(v), 5, 'c', clamp(rq * 1.6 - i / 30) * 0.8); });
    lbl('gold : A, B alternated  ( ≥ 1 forever )', px + pw, py - ph + 20, C.gold, rq, 15, 'right');
    lbl('cyan : A alone  ( → 0 )', px + pw, py - ph + 46, C.cyan, rq, 15, 'right');
    chip(1410, 270, 700, 52, 'read {P, I − P} at even n , {SPS, I − SPS} at odd n', C.white, rq, 18);
    stamp('ZERO ERROR , EVERY n', 1450, 500, Q(S, 1, 'with zero error at every time', 0.6), C.gold, 26, -0.04);
  }
};
function ell119(cx, cy, rx, ry, col, a, lw = 1.5) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
function fillEll119(cx, cy, rx, ry, col, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, TAU); ctx.fill(); ctx.restore(); }

/* ---- 05 LIMITS ---- */
SCENES.limits = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'No reset ever comes close', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The phase limits are explicit', 0.6) * f1;
    chip(530, 260, 860, 58, 'T = (C² + 2C³)/3', C.gold, q, 26);
    const mq = Q(S, 0, 'measure the effect E, then prepare P or M', 0.6) * f1;
    chip(530, 340, 860, 58, 'T(X) = P Tr(E X) + M Tr((I − E) X)', C.cyan, mq, 23);
    lbl('E = P + ⅔ |d⟩⟨d| ,  spec E = (1, ⅔, 0, 0, 0) ,  d = (e₀ − e₁ − e₃ + e₄)/2', 530, 400, C.dim, mq, 15);
    // spectrum of the full 25-dim superoperator
    const sx = 530, sy = 560, sR = 120;
    line(sx - 220, sy, sx + 220, sy, C.dim, q, 1.2); line(sx, sy - 110, sx, sy + 110, C.dim, q, 1.2); ring(sx, sy, sR, C.dim, q * 0.6, 1.5);
    SPEC119.forEach(([re, mult], i) => { const x = sx + re * sR, col = re === 1 ? 'g' : re === 0 ? 'n' : 'm'; dot(x, sy, 10 + Math.sqrt(mult) * 2.5, col, q); lbl('×' + mult, x, sy - 26 - Math.sqrt(mult) * 2, C.white, q, 16); lbl(re === -0.5 ? '−½' : String(re), x, sy + 40, C.dim, q, 15); });
    lbl('det(tI − C) = t²⁰ (t − 1)² (t + ½)³  on all of M₅', sx, sy + 120, C.white, q, 16);
    const rq = Q(S, 0, 'The gap shrinks by minus one half per step', 0.6) * f1;
    const px = 1060, py = 760, pw = 700, ph = 400, xS = n => px + (n - 2) / 6 * pw, yS = logY119(py, ph, -2, 0.4);
    plotAxes(px, py, pw, ph, rq, 'n', '‖Cⁿ − T‖◇  (log)');
    [1, 0.1, 0.01].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, rq, 14, 'right'));
    curve(p => { const n = 2 + p * 6; return [xS(n), yS(4 / 3 * Math.pow(2, 2 - n))]; }, 60, C.gold, rq, 3);
    RATE119.forEach(([n, v], i) => { dot(xS(n), yS(v), 9, 'c', clamp(rq * 1.6 - i / 10)); lbl(String(n), xS(n), py + 26, C.dim, rq, 14); });
    lbl('gold : bound (4/3) 2^(2 − n)', px + pw, py - ph + 12, C.gold, rq, 15, 'right');
    lbl('dots : SDP value , equal to the bound', px + pw, py - ph + 38, C.cyan, rq, 15, 'right');
    lbl('Cⁿ − T = (−½)^(n − 2) (C² − T)', px + pw / 2, py - ph + 90, C.white, rq, 17);
  }
  const q = Q(S, 1, 'No reset ever comes close', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, '‖Tₙ − R_σ‖◇ ≥ 1   for every n and every σ', C.red, q, 23);
    lbl('outputs of P and M stay orthogonal : 2 ≤ 2 ‖Tₙ − R_σ‖◇', 530, 320, C.dim, q, 15);
    const lq = Q(S, 1, 'the limits sit at exactly one', 0.6);
    chip(530, 395, 860, 56, '‖T − R_ρ_t‖◇ = 2 max{t, 1 − t} ,  min = 1 at t = ½', C.gold, lq, 21);
    const px = 150, py = 760, pw = 760, ph = 260, xS = n => px + (n - 2) / 6 * pw, yS = v => py - (v - 0.8) / 1.6 * ph;
    plotAxes(px, py, pw, ph, lq, 'n', 'min over σ of ‖Cⁿ − R_σ‖◇');
    dashed(px, yS(1), px + pw, yS(1), C.red, lq, 1.6); lbl('1', px - 10, yS(1) + 6, C.red, lq, 14, 'right');
    curve(p => { const n = 2 + p * 6; return [xS(n), yS(1 + 4 / 3 * Math.pow(2, 2 - n))]; }, 60, C.gold, lq, 2);
    INFC119.forEach(([n, v], i) => { dot(xS(n), yS(v), 8, 'c', clamp(lq * 1.6 - i / 10)); lbl(String(n), xS(n), py + 24, C.dim, lq, 13); });
    lbl('gold : 1 + ε_n', xS(3), yS(2.3) + 30, C.gold, lq, 15, 'left');
    const dq = Q(S, 1, 'An input outside R, the vector d', 0.6);
    const cx = 1420, cy = 470;
    ell119(cx - 120, cy, 170, 120, C.cyan, dq, 2); lbl('R', cx - 230, cy - 100, C.cyan, dq, 20);
    dot(cx - 160, cy, 14, 'g', dq); lbl('P sector', cx - 160, cy + 36, C.gold, dq, 16);
    dot(cx + 220, cy - 120, 14, 'v', dq); lbl('d ∈ R⊥', cx + 220, cy - 150, C.vio, dq, 18);
    const iq = Q(S, 1, 'still sends two thirds of its weight', 0.6);
    curve(p => [cx + 220 - p * 370, cy - 120 + Math.sin(p * Math.PI) * -60 + p * 120], 40, C.gold, iq, 3); arrow(cx - 140, cy - 6, cx - 150, cy - 2, C.gold, iq, 3);
    chip(1420, 680, 640, 56, 'Tr(E |d⟩⟨d|) = ⅔ → P sector', C.gold, iq, 22);
    lbl('so E cannot be replaced by the projection P', 1420, 735, C.dim, iq, 15);
  }
};

/* ---- 06 NPT ---- */
SCENES.npt = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So every finite output is entangled', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Entangle the input with a reference', 0.6) * f1;
    chip(530, 260, 860, 58, '|Ω⟩ = ( |0⟩ s + |1⟩ w₀ ) / √2 ,  w₀ = (u − 2v + z)/√6', C.white, q, 21);
    const cq = Q(S, 0, 'The coherence between the sectors shrinks', 0.6) * f1;
    const bx = 220, by = 330, bw = 300, bh = 120;
    box(bx, by, bw, bh, C.gold, cq, 2, 'rgba(40,30,0,0.35)'); lbl('P', bx + bw / 2, by + 70, C.gold, cq, 26);
    box(bx + bw + 20, by, bw, bh, C.cyan, cq, 2, 'rgba(0,30,40,0.35)'); lbl('cₙ |s⟩⟨w₀|', bx + bw * 1.5 + 20, by + 70, C.cyan, cq, 22);
    box(bx, by + bh + 20, bw, bh, C.cyan, cq, 2, 'rgba(0,30,40,0.35)'); lbl('cₙ |w₀⟩⟨s|', bx + bw / 2, by + bh + 90, C.cyan, cq, 22);
    box(bx + bw + 20, by + bh + 20, bw, bh, C.mag, cq, 2, 'rgba(40,0,40,0.35)'); lbl('Dₙ on R ∩ s⊥', bx + bw * 1.5 + 20, by + bh + 90, C.mag, cq, 20);
    lbl('½ ×', bx - 40, by + bh + 20, C.white, cq, 22);
    lbl('cₙ = (−½)ⁿ', 530, by + 2 * bh + 70, C.cyan, cq, 22);
    const nq = Q(S, 0, 'yet the partial transpose keeps a negative eigenvalue', 0.6) * f1;
    chip(530, 720, 860, 58, 'partial transpose , on (|1⟩s , |0⟩w₀) :  [[0, cₙ/2], [cₙ/2, 0]]', C.mag, nq, 19);
    const px = 1060, py = 760, pw = 700, ph = 400, xS = n => px + n / 12 * pw, yS = logY119(py, ph, -4.2, 0);
    plotAxes(px, py, pw, ph, nq, 'n', '|negative eigenvalue|  (log)');
    [1, 0.1, 0.01, 0.001].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, nq, 14, 'right'));
    curve(p => { const n = p * 12; return [xS(n), yS(Math.pow(2, -n - 1))]; }, 60, C.gold, nq, 3);
    NPT119.forEach(([n, v], i) => dot(xS(n), yS(-v), 8, 'm', clamp(nq * 1.6 - i / 14)));
    lbl('gold : 2^(−n − 1) ;  dots : smallest eigenvalue , computed', px + pw, py - ph + 12, C.dim, nq, 15, 'right');
    stamp('NPT AT EVERY FINITE n', 1570, 440, Q(S, 0, 'at every finite time', 0.6) * f1, C.mag, 22, -0.04);
  }
  const q = Q(S, 1, 'So every finite output is entangled', 0.6, 0.3);
  if (q > 0) {
    const lq = Q(S, 1, 'every phase limit measures and prepares', 0.6);
    chip(W / 2, 270, 1300, 60, 'phase limit :  X ↦ P Tr(E X) + M Tr((I − E) X)  →  POVM {E, I − E} , then prepare', C.cyan, lq, 21);
    lbl('measure-and-prepare  ⇒  entanglement-breaking ; each finite product is not', W / 2, 330, C.dim, lq, 16);
    const tq = Q(S, 1, 'A classical label, finite entanglement and an exact quantum code', 0.6);
    const items = [['CLASSICAL LABEL', 'kept at every n', 'zero error , public phase', C.gold], ['FINITE NPT', 'every finite n', 'limit breaks it', C.mag], ['EXACT QUBIT', 'gone from n = 3', 'exact codes : dim 1', C.red]];
    items.forEach(([h, a1, a2, col], i) => { const qq = clamp(tq * 1.6 - i / 4), x = 200 + i * 540; box(x, 410, 440, 220, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, x + 220, 470, col, qq, 24); lbl(a1, x + 220, 530, C.white, qq, 20); lbl(a2, x + 220, 580, C.dim, qq, 16); });
    stamp('THREE DIFFERENT THINGS', W / 2, 720, Q(S, 1, 'are three different things', 0.6), C.green, 34, -0.03);
  }
};

/* ---- 07 QUBIT ---- */
SCENES.qubit = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Over the whole switching class', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Can a qubit survive switching', 0.6) * f1;
    chip(530, 260, 860, 58, 'every η , every schedule , n ≥ 3 :  max exact code dim = 1', C.red, Q(S, 0, 'after three steps no terminal recovery', 0.6) * f1, 21);
    lbl('recovery only at the end , on the whole complex code algebra', 530, 320, C.dim, q, 15);
    const gq = Q(S, 0, 'the gauge ranks are forced to one, one, two', 0.6) * f1;
    lbl('Fₜ(X) = Wₜ (X ⊗ τₜ) Wₜ† ,  gauge rank sₜ', 530, 380, C.white, gq, 18);
    [1, 1, 2].forEach((v, i) => { const x = 270 + i * 190, h = v * 110; fillBox(x, 640 - h, 120, h, C.gold, gq * 0.4); rect63(x, 640 - h, 120, h, C.gold, gq, 1.6); lbl('s' + (i + 1) + ' = ' + v, x + 60, 630 - h, C.white, gq, 20); lbl('step ' + (i + 1), x + 60, 670, C.dim, gq, 15); });
    lbl('the only possible pattern', 530, 710, C.gold, gq, 16);
    const pq = Q(S, 0, 'the last channel would have to correct a plane', 0.6) * f1;
    box(1040, 250, 740, 200, C.cyan, pq, 2, 'rgba(0,30,40,0.4)');
    lbl('the forced plane T = span{h, w}', 1410, 290, C.cyan, pq, 18);
    lblG('h = r e₀ + √η e₂ + √(rη) e₃', 1410, 345, C.white, pq, 24);
    lblG('w = √r e₁ + √η e₄', 1410, 395, C.white, pq, 24);
    lbl('orthonormal for every η', 1410, 430, C.dim, pq, 15);
    const nq = Q(S, 0, 'that no allowed channel can', 0.6) * f1;
    chip(1410, 510, 740, 56, 'S₀ , S₁ ≥ r/(1 + r) I  ⇒  rank diag(S₀, S₁) = 4', C.gold, nq, 20);
    chip(1410, 580, 740, 56, 'but the auxiliary channel has Choi rank ≤ 3', C.red, nq, 20);
    lbl('recomputed : smallest KL defect of T found over env-dim-4 channels', 1410, 650, C.dim, nq, 15);
    lbl(KLMIN119.map(r => 'η = ' + r[0] + ' : ' + r[1].toFixed(2)).join('   '), 1410, 680, C.cyan, nq, 16);
    stamp('NO QUBIT AT n = 3', 1410, 760, nq, C.red, 30, -0.04);
  }
  const q = Q(S, 1, 'Over the whole switching class', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'the best exact code dimensions are five, three, two', 0.6);
    const x0 = 150, by = 700;
    CODES119.forEach((v, n) => { const qq = clamp(cq * 1.6 - n / 9), x = x0 + n * 100, h = v * 80; fillBox(x, by - h, 80, h, n < 3 ? C.gold : C.red, qq * 0.45); rect63(x, by - h, 80, h, n < 3 ? C.gold : C.red, qq, 1.6); lbl(String(v), x + 40, by - h - 14, C.white, qq, 24); lbl('n = ' + n, x + 40, by + 28, C.dim, qq, 15); });
    lbl('K_sw(n) : best over every switching schedule', 540, 290, C.white, cq, 18);
    lbl('… then 1 forever', x0 + 7 * 100 - 10, by - 40, C.dim, cq, 17, 'left');
    const oq = Q(S, 1, 'The oldest-bit channel reaches three, then two', 0.6);
    box(1100, 260, 680, 300, C.cyan, oq, 2, 'rgba(0,30,40,0.35)');
    lbl('OLDEST-BIT CHANNEL', 1440, 300, C.cyan, oq, 20);
    lblG('L₀ = |u_η⟩⟨e₀| + |v_η⟩⟨e₂| + |z⟩⟨e₃|', 1440, 350, C.white, oq, 21);
    lblG('L₁ = |u_η⟩⟨e₁| + |z⟩⟨e₄|', 1440, 395, C.white, oq, 21);
    lbl('n = 1 : span{e₀, e₂, e₃}  ·  n = 2 : span{e₀, e₃}', 1440, 445, C.gold, oq, 17);
    lblG('L₀L₀ = |h⟩⟨e₀| + |w⟩⟨e₃|', 1440, 495, C.white, oq, 21);
    lbl('terminal recovery : inverse isometry + reset of the rest', 1440, 535, C.dim, oq, 14);
    const aq = Q(S, 1, 'and so does the alternating pair', 0.6);
    chip(1440, 630, 680, 56, 'A, B alternated : also 5 , 3 , 2 , 1 , 1 , …', C.mag, aq, 21);
    lbl('C isometric on H₊ (dim 3) , C² on a pulled-back plane (dim 2)', 1440, 690, C.dim, aq, 15);
  }
};

/* ---- 08 CAP ---- */
SCENES.cap = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Below eta equal five minus root seventeen', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'If window zero carries a fraction at least a', 0.6) * f1;
    chip(530, 260, 860, 58, 'C_a = { ρ : ⟨e₀, ρ e₀⟩ ≥ a }', C.white, q, 24);
    const dq = Q(S, 0, 'all such states lie within trace distance', 0.6) * f1;
    const px = 160, py = 740, pw = 740, ph = 360, xS = a => px + a * pw, yS = v => py - v / 2.2 * ph;
    plotAxes(px, py, pw, ph, dq, 'a', 'trace-norm diameter of C_a');
    curve(p => [xS(DIAM119[Math.min(40, Math.round(p * 40))][0]), yS(DIAM119[Math.min(40, Math.round(p * 40))][1])], 40, C.gold, dq, 3);
    [0, 0.5, 1].forEach(a => lbl(String(a), xS(a), py + 26, C.dim, dq, 14)); [1, 2].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, dq, 14, 'right'));
    lbl('4 √(a(1 − a))', xS(0.78), yS(1.75), C.gold, dq, 18, 'left');
    const hq = Q(S, 0, 'at one half or below, the diameter is two', 0.6) * f1;
    dashed(xS(0.5), py, xS(0.5), yS(2.1), C.red, hq, 1.6); lbl('2', xS(0.25), yS(2) - 14, C.red, hq, 18);
    const cx = 1420, cy = 480, R = 190;
    ring(cx, cy, R, C.dim, dq * 0.7, 1.5); line(cx - R - 20, cy, cx + R + 20, cy, C.dim, dq * 0.5, 1); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, dq * 0.5, 1);
    lbl('j = e₀', cx, cy - R - 30, C.white, dq, 17); lbl('k', cx + R + 30, cy + 6, C.white, dq, 17);
    const aa = 0.8, th = Math.acos(Math.sqrt(aa));
    [1, -1].forEach(sg => { const x = cx + sg * R * Math.sin(th), y = cy - R * Math.cos(th); arrow(cx, cy, x, y, C.gold, dq, 3); dot(x, y, 10, 'g', dq); });
    lbl('√a j ± √(1 − a) k  attain the diameter', cx, cy + R + 50, C.gold, dq, 16);
    dashed(cx - R, cy - R * aa * 0.9, cx + R, cy - R * aa * 0.9, C.cyan, dq * 0.6, 1.2);
    lbl('dephasing in |±⟩ at a = ½ keeps two orthogonal states', cx, cy + R + 85, C.dim, hq, 15);
  }
  const q = Q(S, 1, 'Below eta equal five minus root seventeen', 0.6, 0.3);
  if (q > 0) {
    const px = 150, py = 740, pw = 720, ph = 380, xS = e => px + e / 0.6 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, q, 'η', 'p₀ = r²/(1 + η)');
    curve(p => [xS(P0C119[Math.min(60, Math.round(p * 60))][0]), yS(P0C119[Math.min(60, Math.round(p * 60))][1])], 60, C.cyan, q, 3);
    dashed(px, yS(0.5), px + pw, yS(0.5), C.red, q, 1.6); lbl('½', px - 10, yS(0.5) + 6, C.red, q, 16, 'right');
    const aq = Q(S, 1, 'about zero point two two', 0.6);
    dashed(xS(ALPHA119), py, xS(ALPHA119), yS(1), C.gold, aq, 1.6); dot(xS(ALPHA119), yS(0.5), 10, 'g', aq);
    lbl('α = (5 − √17)/4 = ' + ALPHA119.toFixed(4), xS(ALPHA119) + 14, yS(0.92), C.gold, aq, 17, 'left');
    [0, 0.2, 0.4, 0.6].forEach(e => lbl(String(e), xS(e), py + 26, C.dim, q, 14)); [0.5, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, q, 14, 'right'));
    const bq = Q(S, 1, 'every block of N steps puts more than half the weight on window zero', 0.6);
    box(1040, 250, 740, 180, C.gold, bq, 2, 'rgba(40,30,0,0.35)');
    lbl('example η = 0.05', 1410, 290, C.gold, bq, 19);
    lblG('k = ' + EX119.k + ' ,  N = 2k + 1 = ' + EX119.N + ' ,  min_i (Q^N)_(i0) = a = ' + EX119.a.toFixed(3), 1410, 345, C.white, bq, 20);
    lblG('κ = 2√(a(1 − a)) = ' + EX119.kappa.toFixed(4), 1410, 395, C.white, bq, 22);
    const rq = Q(S, 1, 'So every schedule forgets', 0.6);
    const qx = 1060, qy = 770, qw = 700, qh = 290, xQ = n => qx + n / 36 * qw, yQ = logY119(qy, qh, -7, 0.5);
    plotAxes(qx, qy, qw, qh, rq, 'n', '‖Tₙ − R_σₙ‖◇  (log)');
    SMALL119.forEach(([n, v, b], i) => { if (v > 1e-7) dot(xQ(n), yQ(v), 8, 'c', clamp(rq * 1.6 - i / 12)); });
    curve(p => { const n = p * 36; return [xQ(n), yQ(Math.min(2, 10 * Math.pow(EX119.kappa, Math.floor(n / EX119.N))))]; }, 360, C.gold, rq, 2.5);
    [1, 1e-3, 1e-6].forEach(v => lbl(v === 1 ? '1' : v === 1e-3 ? '10⁻³' : '10⁻⁶', qx - 10, yQ(v) + 6, C.dim, rq, 14, 'right'));
    [12, 24, 36].forEach(n => lbl(String(n), xQ(n), qy + 24, C.dim, rq, 13));
    lbl('gold : min{2, 10 κ^⌊n/N⌋}   dots : one random schedule (SDP)', qx + qw, qy - qh - 18, C.dim, rq, 14, 'right');
  }
};

/* ---- 09 ERASURE ---- */
SCENES.erasure = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'the four-step merge of populations is only classical', 'classical'], [1, 'and no word ever gets closer', 'theory']]);
  const f1 = 1 - Q(S, 1, 'This is sharp', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'lets eta change at every step too', 0.6) * f1;
    const nx = 170, nw = 760, ny = 300, xN = e => nx + e * nw;
    line(nx, ny, nx + nw, ny, C.dim, q, 2); [0, 0.5, 1].forEach(e => { line(xN(e), ny - 8, xN(e), ny + 8, C.dim, q, 2); lbl(e === 0.5 ? '½' : String(e), xN(e), ny + 34, C.dim, q, 16); });
    const kq = Q(S, 0, 'If K avoids one half', 0.6) * f1;
    fillBox(xN(0.15), ny - 14, xN(0.42) - xN(0.15), 28, C.cyan, kq * 0.4); fillBox(xN(0.6), ny - 14, xN(0.85) - xN(0.6), 28, C.cyan, kq * 0.4);
    lbl('K compact , ½ ∉ K', nx + nw / 2, ny - 30, C.cyan, kq, 18);
    ring(xN(0.5), ny, 12, C.red, kq, 2.5);
    tape119(170, 380, ['η₁', 'η₂', 'η₃', 'η₄', 'η₅', 'η₆', '⋯'], [C.cyan, C.gold, C.cyan, C.mag, C.gold, C.cyan, C.dim], q, 110);
    lbl('each step : any η_j ∈ K , any allowed channel', 550, 480, C.dim, q, 16);
    const tq = Q(S, 0, 'such that every word forgets', 0.6) * f1;
    chip(550, 560, 820, 56, 'δ(Tₙ) ≤ q_K^⌊n/N_K⌋', C.gold, tq, 24);
    chip(550, 640, 820, 56, '‖Tₙ − R_Tₙ(τ)‖◇ ≤ min{ 2 , 10 q_K^⌊n/N_K⌋ }', C.green, Q(S, 0, 'its distance to its own moving reset', 0.6) * f1, 22);
    lbl('the reset density Tₙ(τ) moves with the word ; any reference', 550, 700, C.dim, tq, 15);
    const pq = Q(S, 0, 'every word forgets', 0.6) * f1;
    const px = 1060, py = 760, pw = 700, ph = 420, xS = n => px + n / 24 * pw, yS = v => py - v / 2 * ph;
    plotAxes(px, py, pw, ph, pq, 'n', 'distance to the nearest reset (SDP)');
    [0, 1, 2].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, pq, 14, 'right'));
    const series = [['rand', 'c', C.cyan, 'random letters from {0.3, 0.7}'], ['alt37', 'g', C.gold, 'C_0.3 , C_0.7 alternated'], ['c45', 'o', C.orange, 'C_0.45 repeated'], ['abhalf', 'r', C.red, 'A , B at ½ (outside the theorem)']];
    series.forEach(([k, dn, col, lab], j) => { const arr = WORDS119[k]; const qq = clamp(pq * 1.6 - j / 5); curve(p => { const n = arr[0][0] + p * (arr[arr.length - 1][0] - arr[0][0]); return [xS(n), yS(interp119(arr, n))]; }, 60, col, qq * 0.7, 2); arr.forEach(([n, v]) => dot(xS(n), yS(v), 6, dn, qq)); lbl(lab, px + pw, py - ph + 10 + j * 26, col, qq, 15, 'right'); });
  }
  const q = Q(S, 1, 'This is sharp', 0.6, 0.3);
  if (q > 0) {
    stamp('UNIFORM  ⇔  ½ ∉ K', 530, 290, Q(S, 1, 'forgetting is uniform exactly when one half is not in K', 0.6), C.gold, 34, -0.03);
    const cq = Q(S, 1, 'The constants come only from compactness', 0.6);
    chip(530, 400, 860, 54, 'N_K , q_K : existence by compactness , no formula', C.white, cq, 21);
    const dq = Q(S, 1, 'the four-step merge of populations is only classical', 0.6);
    qgraph119(290, 600, 115, dq, k => 0.6);
    lbl('0 → i → j → k : four steps reach every window', 330, 790, C.dim, dq, 14);
    box(560, 470, 500, 230, '#8fbcff', dq, 2, 'rgba(10,20,45,0.45)');
    lbl('CLASSICAL MERGE (Doeblin)', 810, 510, '#8fbcff', dq, 18);
    lblG('each 4-step entry ≥ κ⁴ ,  κ = min min(η, 1 − η)', 810, 555, C.white, dq, 18);
    lblG('K = {0.3, 0.7} :  κ⁴ = ' + DOEB119.kappa4.toFixed(4), 810, 600, C.white, dq, 18);
    lbl('smallest entry over the 16 words : ' + DOEB119.min4.toFixed(4), 810, 640, C.cyan, dq, 15);
    lbl('populations only , not a quantum horizon', 810, 675, C.dim, dq, 14);
    const lq = Q(S, 1, 'and no word ever gets closer to a reset', 0.6);
    chip(1420, 470, 720, 56, 'δ(Tₙ) ≥ ∏ⱼ ηⱼ > 0', C.mag, lq, 26);
    lbl('Tr(P_D Tₙ(E₃ − E₀)) = (−1)ⁿ ∏ⱼ ηⱼ  ;  checked on 100 random words', 1420, 530, C.dim, lq, 15);
    lbl('forgetting is never instant', 1420, 580, C.mag, lq, 18);
    lbl('half-parameter side : A , B alternated keep distance ≥ 1', 1420, 680, C.red, cq, 16);
  }
};

/* ---- 10 WITNESS ---- */
SCENES.witness = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'Why one half', 0.6);
  chip(W / 2, 250, 1100, 54, 'suppose no finite block contracts strictly :  a_n(K) = 1 for every n', C.white, q, 20);
  const cq = Q(S, 0, 'compactness would give one actual schedule', 0.6);
  chip(W / 2, 330, 1300, 58, 'one schedule , ρₜ ⊥ σₜ for all t , diag ρₜ = diag σₜ = πₜ ≥ κ⁴', C.gold, cq, 21);
  lbl('nested subsequences of letters and midpoints ; each limit letter keeps its own environment', W / 2, 385, C.dim, cq, 15);
  const br = Q(S, 0, 'Their supports are pure and pure', 0.6);
  const cases = [['PURE + PURE', 'two lines', 'contradicts the positive three-step effect', 'Two pure lines contradict', C.cyan], ['MIXED + MIXED', 'only 2 + 2 ; U or V target', 'U forces η = ½ ;  V : ‖c′‖² = ‖c′‖² + ηₜ‖v‖²', 'Two mixed planes need a U shape', C.mag], ['PURE LINE + MIXED', 'partner of rank 2', 'ηₜ₊₁ ≤ ½ , then |ζ| = 1  ⇒  η = ½', 'A pure line with a partner', C.green]];
  cases.forEach(([h, s1, s2, ph, col], i) => {
    const x = 160 + i * 545, qq = clamp(br * 1.5 - i / 4);
    line(W / 2, 400, x + 230, 440, col, qq * 0.7, 1.5);
    box(x, 440, 460, 300, col, qq, 2, 'rgba(0,0,0,0.5)');
    lbl(h, x + 230, 485, col, qq, 22); lbl(s1, x + 230, 525, C.white, qq, 17);
    const kq = Q(S, 1, ph, 0.6);
    lblG(s2, x + 230, 600, C.white, kq, i === 1 ? 15 : 16);
    stamp('✕  FAILS', x + 230, 690, kq, C.red, 26, -0.05);
  });
  const fq = Q(S, 1, 'forces eta one half', 0.6, 1.0);
  lbl('so for compact K avoiding ½ some block has a_N(K) < 1', W / 2, 790, C.gold, fq, 18);
};

/* ---- 11 NEAR HALF ---- */
SCENES.nearhalf = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Near one half, uniformity breaks', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'periodic schedules have a unique attracting orbit', 0.6) * f1;
    chip(530, 260, 860, 58, 'period ℓ :  σⱼ = Φⱼ(σⱼ₋₁) ,  σ_ℓ = σ₀  unique , attracting', C.white, q, 21);
    const fq = Q(S, 0, 'the phase-a populations are', 0.6) * f1;
    chip(530, 340, 860, 60, 'π^a = (r²s , ars , br , ars , a²s) / (1 − ab)', C.gold, fq, 23);
    lbl('r = 1 − a ,  s = 1 − b ;  π^b by swapping a and b', 530, 400, C.dim, fq, 15);
    const bq = Q(S, 0, 'Even the pair zero point three, zero point seven forgets', 0.6) * f1;
    [['a', PI119.a, C.cyan, 'phase 0.3', 160], ['b', PI119.b, C.mag, 'phase 0.7', 560]].forEach(([k, v, col, nm, x0]) => { v.forEach((x, i) => { const h = x * 400; fillBox(x0 + i * 62, 720 - h, 46, h, col, bq * 0.45); rect63(x0 + i * 62, 720 - h, 46, h, col, bq, 1.4); lbl(x.toFixed(3), x0 + i * 62 + 23, 712 - h, C.white, bq, 13); lbl(WLAB119[i], x0 + i * 62 + 23, 745, C.dim, bq, 13); }); lbl(nm, x0 + 145, 780, col, bq, 16); });
    const oq = Q(S, 0, 'unique attracting orbit', 0.6) * f1;
    const cx = 1420, cy = 470;
    ell119(cx, cy, 240, 150, C.dim, oq * 0.6, 1.5);
    dot(cx - 240, cy, 16, 'c', oq); dot(cx + 240, cy, 16, 'm', oq);
    lbl('σ₀', cx - 240, cy - 30, C.cyan, oq, 20); lbl('σ₁', cx + 240, cy - 30, C.mag, oq, 20);
    arrow(cx - 60, cy - 150, cx + 60, cy - 150, C.cyan, oq, 3); lbl('C_0.3', cx, cy - 170, C.cyan, oq, 17);
    arrow(cx + 60, cy + 150, cx - 60, cy + 150, C.mag, oq, 3); lbl('C_0.7', cx, cy + 186, C.mag, oq, 17);
    lbl('diagonals = π^0.3 , π^0.7 (computed from the orbit)', cx, cy + 240, C.dim, oq, 15);
    stamp('FORGETS', cx, cy + 8, bq, C.green, 30, -0.04);
  }
  const q = Q(S, 1, 'Near one half, uniformity breaks', 0.6, 0.3);
  if (q > 0) {
    const fq = Q(S, 1, 'The family C eta deforms the canonical channel', 0.6);
    chip(530, 260, 860, 58, 'C_η : u_η = √r e₀ + √η e₃ , v_η = √r e₁ + √η e₄ ,  C_½ = C', C.cyan, fq, 20);
    lbl('same environment list , every C_η allowed , continuous in η', 530, 320, C.dim, fq, 15);
    const pq = Q(S, 1, 'P and M stay almost two apart', 0.6);
    const px = 150, py = 770, pw = 760, ph = 380, xS = e => px + (e - 0.3) / 0.4 * pw, yS = v => py - v / 2.1 * ph;
    plotAxes(px, py, pw, ph, pq, 'η', '‖C_ηⁿ(P) − C_ηⁿ(M)‖₁');
    [0.3, 0.5, 0.7].forEach(e => lbl(String(e), xS(e), py + 26, C.dim, pq, 14)); [1, 2].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, pq, 14, 'right'));
    [['10', C.gold], ['40', C.cyan], ['160', C.mag]].forEach(([k, col], j) => { const arr = NEAR119[k]; const qq = clamp(pq * 1.6 - j / 4); curve(p => { const i = Math.min(arr.length - 1, Math.round(p * (arr.length - 1))); return [xS(arr[i][0]), yS(arr[i][1])]; }, arr.length - 1, col, qq, 3); lbl('n = ' + k, px + pw + 10, yS(arr[arr.length - 9][1]) - 4 + j * 0, col, qq, 15, 'left'); });
    const sq = Q(S, 1, 'so no single rate covers a set', 0.6);
    stamp('NO UNIFORM RATE NEAR ½', 1420, 380, sq, C.red, 30, -0.04);
    lbl('fix n , then let η → ½ ; limits not exchanged', 1420, 470, C.dim, sq, 16);
    lbl('true even when the set itself avoids ½', 1420, 510, C.white, sq, 17);
    lbl('each single C_η with η ≠ ½ still forgets', 1420, 550, C.cyan, sq, 16);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Choi, Stinespring, Knill–Laflamme and the Dobrushin coefficient are classical tools', 'classical'], [1, 'the rest is argued in the two theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['MIXERS', 'Aⁿ , Bⁿ → reset', C.cyan, 'Two forgetting channels'], ['ONE BIT', 'B ∘ A = C²', C.gold, 'keep a bit when alternated'], ['NPT', '−2^(−n−1)', C.mag, 'finite entanglement survives'], ['NO QUBIT', '5 , 3 , 2 , 1 , 1', C.red, 'no qubit lasts three steps'], ['SMALL η', 'η < 0.2192', C.green, 'away from one half'], ['ERASURE', 'uniform ⇔ ½ ∉ K', C.vio, 'every switching schedule forgets uniformly']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 130, 240, 260, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 20); });
    lbl('CLASSICAL · Choi and Stinespring representations · Knill–Laflamme conditions · Dobrushin coefficient and Doeblin merge · compactness · SVD', W / 2, 470, '#8fbcff', Q(S, 1, 'are classical tools') * fade, 15);
    lbl('VOLUMES · two mixers · alternation = Cⁿ · phase limits · reset distance 1 · finite NPT · three-step qubit bound · 5, 3, 2, 1 · cap · erasure iff ½ ∉ K · near-½ non-uniformity', W / 2, 515, C.orange, Q(S, 1, 'the rest is argued in the two theory volumes') * fade, 14);
    lbl('RECOMPUTED · diag law on all matrix units · Gram ranks · SDP diamond norms · det(tI − C) · −2^(−n−1) · KL defects · code witnesses · κ = ' + EX119.kappa.toFixed(3) + ' at η = 0.05 · κ⁴ · π^a', W / 2, 560, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 650, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyrG64(W / 2, 380, 200, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC 5-WINDOW II · SWITCH', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 五窗口记忆 第二部 · 切换通道、存活的一位与一致遗忘 · TRURETURING FILM 119', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two forgetting channels keep a bit together; away from one half, everything is erased.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC 5-WINDOW II', model: 'ALLOWED CHANNELS', mixers: 'TWO MIXERS', alternate: 'ALTERNATION KEEPS A BIT', limits: 'PHASE LIMITS', npt: 'FINITE ENTANGLEMENT', qubit: 'NO QUBIT AFTER THREE', cap: 'POPULATION CAP', erasure: 'UNIFORM ERASURE', witness: 'WHY ONE HALF', nearhalf: 'PERIODS AND NEAR ONE HALF', finale: 'LEDGER' });

function poster119() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyrG64(460, 500, 260, 2.2, 1, [1, 1, 1], 1);
  txt('B ∘ A = C²  ·  one bit forever', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('exact codes 5 , 3 , 2 , 1 , 1 , …', 1320, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('uniform erasure ⇔ ½ ∉ K', 1320, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('AURIC 五窗口记忆 第二部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC 5-WINDOW II · SWITCH', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('切 换 通 道 · 存 活 的 一 位 · 一 致 遗 忘', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 119', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster119;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
