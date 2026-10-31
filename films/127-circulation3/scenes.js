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

/* ---- film 127: AURIC CIRCULATION CONTROL III · the missing coordinate, one shared edge and the final module ---- */
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
const _po127 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po127.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po127.set(key, off); }
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
/* ---- film 127 data (from verify127.py -> vis127.json) ---- */
const P3EX_127 = [[0,1,0,1,0],[1,0,0,0,1]];
const TV_127 = [[0.0022,0.0045],[0.0084,0.0168],[0.0143,0.0287],[0.0177,0.0353],[0.0273,0.0546],[0.0311,0.0623],[0.0319,0.0638],[0.0328,0.0657],[0.0494,0.0989],[0.0523,0.1046],[0.0539,0.1079],[0.0617,0.1235],[0.0751,0.1503],[0.0767,0.1535],[0.0902,0.1803],[0.1011,0.2021],[0.1023,0.2045],[0.125,0.2499],[0.1425,0.285],[0.1448,0.2897],[0.1479,0.2957],[0.1729,0.3457],[0.2025,0.4049],[0.2161,0.4321]];
const T2ROWS_127 = [[0,1,0],[1,1,0],[2,2,1],[5,4,2],[11,9,5],[25,20,11],[56,45,25],[126,101,56]];
const TYPES_127 = {"edge":[2,90,5942],"root":[2,202,30302]};
const BF_127 = [[3,1,1],[4,297,0],[5,15119,89],[6,295340,0],[7,3210093,0]];
const SYNC_127 = {"ex":[6,3,2,1,1,1,1,1,1,1,1,1,1],"row":[1,1,0,0,0,0,0,0,0,0,0,0,0],"rest":[5,2,2,1,1,1,1,1,1,1,1,1,1]};
const DEG5_127 = [[0,0,0,0,0],[0,1,0,0,0],[0,2,0,0,0],[0,3,0,0,0],[0,4,0,0,0],[0,5,0,0,0],[1,0,0,0,0],[1,1,70,0,70],[1,2,56,0,56],[1,3,31,0,31],[1,4,0,0,0],[2,0,0,0,0],[2,1,56,0,56],[2,2,44,1,45],[2,3,0,0,0],[3,0,0,0,0],[3,1,31,0,31],[3,2,0,0,0],[4,0,0,0,0],[4,1,0,0,0],[5,0,0,0,0]];
const DEG6_127 = {"ord":[246,216,160,85,189,138],"q":2053};
const SIG_127 = {"shared":[64,64],"private":[89,79,84,79,89]};
const MODES_127 = {"00":169,"10":64,"01":64};
const PATHC_127 = [1,2,3,5,8,13,21,34];
const TRIPLES_127 = [[1,1,1],[1,1,2],[1,2,1],[1,2,2],[1,3,1],[2,1,1],[2,1,2],[2,2,1]];
const C7C9_127 = {"A":[[3,2,45],[4,2,227],[3,3,390]],"M":[1,271,390]};
const RATIO_127 = {"2":{"rho1":5.048917,"seq":[5.625,5.04444,5.04846,5.04887,5.04891,5.04892,5.04892,5.04892,5.04892,5.04892,5.04892,5.04892,5.04892,5.04892]},"3":{"rho1":12.343538,"seq":[14.44444,12.3641,12.34239,12.34341,12.34352,12.34354,12.34354,12.34354,12.34354,12.34354,12.34354,12.34354,12.34354,12.34354]}};
const ATAB_127 = {"2,1":1,"2,2":8,"2,3":27,"2,4":64,"2,5":125,"2,6":216,"3,1":1,"3,2":45,"3,3":390,"3,4":1756,"3,5":5575,"3,6":14241,"4,1":1,"4,2":227,"4,3":4822,"4,4":40368,"4,5":205845,"4,6":771409,"5,1":1,"5,2":1146,"5,3":59515,"5,4":923582,"5,5":7546185,"5,6":41412732,"6,1":1,"6,2":5786,"6,3":734618,"6,4":21132045,"6,5":276642937,"6,6":2223105961,"7,1":1,"7,2":29213,"7,3":9067774,"7,4":483517125,"7,5":10141826018,"7,6":119341318707};
const EXTRA_127 = [["K3",3,4,0],["P3",3,5,1],["P4",4,8,3],["C5",5,11,5]];
const BARS_127 = {"p":[0.3,0.15,0.2,0.1,0.25],"q":[0.22,0.23,0.2,0.18,0.17],"tv":0.16};
const C7STEP_127 = {"c":[1,2,1,1,2,1,1],"slack":2,"set":[4,6,1],"rest":[1,1,1,1,1,1,0]};
const EIG_127 = {"2":{"lam":[2.24698,-0.80194,0.55496],"w":[1.76354,0.06918,0.16727]},"3":{"lam":[3.51334,-1.20362,0.76352,-0.59435,0.52111],"w":[2.56367,0.15398,0.1754,0.0102,0.09675]}};
/* ---- film 127 helpers ---- */
/* odd cycles glued along one retained edge: b above, a below, branch 0 bulges left, branch 1 right */
function gpos127(cx, cy, s, ks) {
  const b = [cx, cy - s / 2], a = [cx, cy + s / 2], br = [];
  ks.forEach((k, i) => {
    const n = 2 * k + 1, Rr = s / (2 * Math.sin(Math.PI / n)), d = s / (2 * Math.tan(Math.PI / n)), dir = i === 0 ? -1 : 1, ccx = cx + dir * d, pts = [];
    for (let q = 1; q <= 2 * k - 1; q++) { const th = dir < 0 ? -Math.PI / n - 2 * Math.PI * q / n : Math.PI + Math.PI / n + 2 * Math.PI * q / n; pts.push([ccx + Rr * Math.cos(th), cy + Rr * Math.sin(th), Math.cos(th), Math.sin(th)]); }
    br.push({ c: [ccx, cy], pts });
  });
  return { a, b, br };
}
function glue127(cx, cy, s, ks, a, o = {}) {
  if (a <= 0) return null;
  const G = gpos127(cx, cy, s, ks);
  G.br.forEach((B, i) => {
    const path = [G.b, ...B.pts, G.a], col = (o.bc && o.bc[i]) || C.cyan;
    if (o.fill && o.fill[i]) fillPoly(path, o.fill[i], a * 0.1);
    for (let q = 0; q < path.length - 1; q++) line(path[q][0], path[q][1], path[q + 1][0], path[q + 1][1], col, a * (o.ea || 0.8), o.lw || 3);
  });
  line(G.a[0], G.a[1], G.b[0], G.b[1], o.ec || C.gold, a, o.elw || 5);
  G.br.forEach((B, i) => B.pts.forEach((p, q) => {
    const hl = o.hl && o.hl[i] && o.hl[i][q];
    dot(p[0], p[1], (o.r || 12) * (hl ? 1.4 : 1), hl ? 'm' : ((o.dn && o.dn[i]) || 'c'), a);
    if (o.vals && o.vals[i]) lbl(String(o.vals[i][q]), p[0] + p[2] * 32, p[1] + p[3] * 32 + 8, (o.vc && o.vc[i]) || C.white, a, o.vs || 20);
  }));
  dot(G.a[0], G.a[1], (o.r || 12) * 1.25, o.ad || 'g', a); dot(G.b[0], G.b[1], (o.r || 12) * 1.25, o.bd || 'g', a);
  if (o.lab !== false) { lbl(o.la || 'a', G.a[0], G.a[1] + 40, C.gold, a, o.ls || 20); lbl(o.lb || 'b', G.b[0], G.b[1] - 24, C.gold, a, o.ls || 20); }
  return G;
}
/* a regular cycle with vertex values; o.slack = edge index i (i,i+1) in green, o.set = highlighted vertices */
function cyc127(cx, cy, R, vals, a, o = {}) {
  if (a <= 0) return null;
  const n = vals.length, P = [];
  for (let i = 0; i < n; i++) { const th = -Math.PI / 2 + 2 * Math.PI * i / n; P.push([cx + R * Math.cos(th), cy + R * Math.sin(th), Math.cos(th), Math.sin(th)]); }
  for (let i = 0; i < n; i++) { const j = (i + 1) % n, sl = o.slack === i; line(P[i][0], P[i][1], P[j][0], P[j][1], sl ? C.green : C.cyan, a * (sl ? 1 : 0.7), sl ? 6 : 3); }
  P.forEach((p, i) => { const hs = o.set && o.set.includes(i); dot(p[0], p[1], hs ? 17 : 13, hs ? 'g' : 'c', a); lbl(String(vals[i]), p[0] + p[2] * 36, p[1] + p[3] * 36 + 8, hs ? C.gold : C.white, a, o.vs || 22); if (o.idx) lbl(String(i), p[0] - p[2] * 30, p[1] - p[3] * 30 + 6, C.dim, a, 15); });
  return P;
}
/* three sites in a row, pattern pat = [b1, b2, b3] */
function mini127(x, y, pat, a, col = C.cyan, g = 26) {
  if (a <= 0) return;
  line(x - g, y, x + g, y, C.dim, a * 0.8, 2);
  pat.forEach((b, i) => { const xx = x + (i - 1) * g; if (b) dot(xx, y, 11, col === C.gold ? 'g' : col === C.mag ? 'm' : 'c', a); else ring(xx, y, 6, C.dim, a, 2); });
}
const PATS127 = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1]];
const PNAME127 = ['∅', '{1}', '{2}', '{3}', '{1,3}'];
function cellG127(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.36, C.white, a, size); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  glue127(470, 470, 150, [3, 3], s0, { ea: 0.75 });
  lbl('two seven-cycles , one retained edge', 470, 720, C.dim, s0, 17);
  const items = [['followed a hidden joint coordinate', 'PARTS I – II', 'κ : from one loop to cycles at one vertex', C.gold], ['what a shared separator must remember', 'THE SEPARATOR', 'joint moments μ_T beyond the means', C.cyan], ['glues odd cycles along one common edge', 'ONE RETAINED EDGE', 'three edge states : ∅ , {a} , {b}', C.mag], ['counts every canonical generator', 'EVERY GENERATOR', 'type = 1 + 45ᵇ − 44ᵇ', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  glue127(W / 2, 420, 140, [3, 3], rp, { ea: 0.75 });
  chip(330, 340, 340, 58, 'one joint number', C.cyan, rp, 22); chip(330, 425, 340, 58, 'one shared edge', C.gold, rp, 22); chip(330, 510, 340, 58, 'one final module', C.mag, rp, 22);
  box(1420, 330, 400, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('two seven-cycles', 1620, 395, C.cyan, rp, 22); lblG('F₂₈₄ = S(−294) ⊕ S(−292)⁸⁹', 1620, 460, C.white, rp, 25);
  txt(scramble('AURIC CIRCULATION III·EDGE', rp, 127), W / 2, 760, { size: 60, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 环 流 控 制 第 三 部 · 缺 失 坐 标 、一 条 共 享 边 与 末 端 模', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 127 · AURIC_FIB_ATOM_CIRCULATION_CONTROL_KL_ACTION_AND_TORIC_RELATIONS_CONTINUATION_2 · §40–47', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 THE MISSING COORDINATE (§40) ---- */
SCENES.joint = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'by Möbius inversion', 'classical'], [1, 'For three sites that is one coordinate', 'theory']]);
  const f1 = 1 - Q(S, 1, 'In general, a separator with q sites', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Three sites in a row', 0.6) * f1;
    [[250, '1'], [400, '2'], [550, '3']].forEach(([x, s], i) => { if (i < 2) line(x, 290, x + 150, 290, C.cyan, q, 3); });
    [[250, '1'], [400, '2'], [550, '3']].forEach(([x, s]) => { dot(x, 290, 16, 'c', q); lbl(s, x, 330, C.white, q, 20); });
    lbl('H = P₃ : edges 1 – 2 , 2 – 3', 400, 250, C.dim, q, 17);
    const pq = Q(S, 0, 'allow five legal patterns', 0.6) * f1;
    PATS127.forEach((p, i) => { const x = 170 + i * 115, qq = clamp(pq * 1.6 - i / 7); box(x - 50, 375, 100, 80, i === 4 ? C.gold : C.cyan, qq, 1.6, 'rgba(0,0,0,0.45)'); mini127(x, 405, p, qq, i === 4 ? C.gold : C.cyan, 24); lblG('h' + ['∅', '₁', '₂', '₃', '₁₃'][i], x, 443, C.white, qq, 18); });
    const hq = Q(S, 0, 'fix the histogram up to one integer K', 0.6) * f1;
    chip(410, 520, 640, 58, 'h = (m − X − Y − Z + K , X − K , Z , Y − K , K)', C.white, hq, 19);
    lbl('X = c₁ ,  Z = c₂ ,  Y = c₃ ,  K = h₁₃', 410, 575, C.dim, hq, 16);
    const iq = Q(S, 0, 'from the larger of zero', 0.6) * f1;
    chip(410, 640, 640, 58, 'max(0, X + Y + Z − m) ≤ K ≤ min(X, Y)', C.gold, iq, 21);
    const eq = Q(S, 0, 'the rows with both ends lit', 0.6) * f1;
    box(1000, 250, 780, 400, C.cyan, eq, 2, 'rgba(0,20,30,0.35)');
    lbl('m = 2 ,  (X, Z, Y) = (1, 0, 1)', 1390, 295, C.cyan, eq, 21);
    P3EX_127.forEach((h, j) => {
      const x0 = 1110 + j * 360, rows = []; h.forEach((c, i) => { for (let r = 0; r < c; r++) rows.push(i); });
      lbl('K = ' + h[4], x0 + 110, 350, j ? C.gold : C.cyan, eq, 22);
      rows.forEach((pi, r) => { box(x0, 375 + r * 90, 220, 70, j ? C.gold : C.cyan, eq, 1.6, 'rgba(0,0,0,0.5)'); mini127(x0 + 70, 410 + r * 90, PATS127[pi], eq, j ? C.gold : C.cyan, 26); lblG(PNAME127[pi], x0 + 170, 418 + r * 90, C.white, eq, 20); });
      lblG('h = (' + h.join(', ') + ')', x0 + 110, 595, C.dim, eq, 17);
    });
    stamp('SAME MEANS · DIFFERENT HISTOGRAMS', 1390, 720, Q(S, 0, 'to the smaller of X and Y', 0.6) * f1, C.mag, 22, -0.03);
  }
  const q = Q(S, 1, 'In general, a separator with q sites', 0.6, 0.3);
  if (q > 0) {
    const M = [['1', 1, 1, 1, 1, 1], ['c₁', 0, 1, 0, 0, 1], ['c₂', 0, 0, 1, 0, 0], ['c₃', 0, 0, 0, 1, 1]];
    PNAME127.forEach((s, j) => lblG(s, 300 + j * 95, 270, C.dim, q, 17));
    M.forEach((r, i) => { lblG(r[0], 215, 322 + i * 62, C.cyan, q, 19); r.slice(1).forEach((v, j) => { box(258 + j * 95, 292 + i * 62, 84, 50, v ? C.cyan : C.dim, q, 1.4, v ? 'rgba(0,40,50,0.5)' : 'rgba(0,0,0,0.4)'); lbl(String(v), 300 + j * 95, 325 + i * 62, v ? C.white : C.dim, q, 20); }); });
    const rq = Q(S, 1, 'needs exactly D minus q minus one', 0.6);
    lbl('rank q + 1 = 4 ,  kernel (1, −1, 0, −1, 1)', 490, 575, C.gold, rq, 18);
    const tq = Q(S, 1, 'D legal patterns', 0.6);
    const hx = 1040;
    [['H', 'q', 'D', 'D − q − 1']].concat(EXTRA_127.map(r => [r[0], r[1], r[2], r[3]])).forEach((r, i) => { const qq = clamp(tq * 1.6 - i / 7), y = 270 + i * 58, hd = i === 0, hl = r[0] === 'P3'; r.forEach((v, j) => { box(hx + j * 180, y, 170, 48, hd ? C.dim : hl ? C.gold : C.cyan, qq, 1.4, hd ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)'); lblG(String(v).replace('K3', 'K₃').replace('P3', 'P₃').replace('P4', 'P₄').replace('C5', 'C₅'), hx + j * 180 + 85, y + 32, hd ? C.dim : C.white, qq, 19); }); });
    const mq = Q(S, 1, 'by Möbius inversion', 0.6);
    chip(960, 640, 1500, 56, 'μ_T = Σ_(J ⊇ T) p_J   ⟺   p_I = Σ_(T ⊇ I) (−1)^(|T|−|I|) μ_T', C.cyan, mq, 21);
    lbl('Rota , Möbius functions §3 : the joint moments of every legal T with |T| ≥ 2 complete the rank', 960, 692, C.dim, mq, 15);
    const kq = Q(S, 1, 'For three sites that is one coordinate', 0.6);
    stamp('ONE EXTRA COORDINATE', 820, 772, kq, C.gold, 24, -0.03);
    lblG('κ = μ₁₃ = p₁₃', 1260, 782, C.gold, kq, 28, 'left');
  }
};

/* ---- 03 LEAST DISAGREEMENT (§40) ---- */
SCENES.mismatch = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'the least chance', 'classical'], [0, 'with equal site means', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'A positive mismatch is a relaxation', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two branches may carry different separator laws', 0.6) * f1;
    const bx = 170, by = 530, bw = 46, sc = 780;
    BARS_127.p.forEach((pv, i) => {
      const qv = BARS_127.q[i], x = bx + i * 150, mn = Math.min(pv, qv);
      fillBox(x, by - pv * sc, bw, pv * sc, C.cyan, q * 0.4); rect63(x, by - pv * sc, bw, pv * sc, C.cyan, q, 1.6);
      fillBox(x + bw + 6, by - qv * sc, bw, qv * sc, C.gold, q * 0.4); rect63(x + bw + 6, by - qv * sc, bw, qv * sc, C.gold, q, 1.6);
      lblG(PNAME127[i], x + bw + 3, by + 30, C.dim, q, 17);
    });
    line(bx - 10, by, bx + 4 * 150 + 110, by, C.dim, q, 1.4);
    lbl('p (branch 1)', 220, 245, C.cyan, q, 18, 'left'); lbl('q′ (branch 2)', 470, 245, C.gold, q, 18, 'left');
    const cq = Q(S, 0, 'the least chance', 0.6) * f1;
    chip(490, 600, 760, 56, 'min over couplings  P(J₁ ≠ J₂) = ½ Σ |p_J − q′_J|', C.cyan, cq, 20);
    const eq = Q(S, 0, 'with equal site means', 0.6) * f1;
    chip(490, 670, 760, 56, 'p − q′ = (κ_P − κ_Q)(1, −1, 0, −1, 1)  ⇒  TV = 2|Δκ|', C.gold, eq, 19);
    lbl('here Δκ = 0.08 ,  TV = 0.16', 490, 720, C.dim, eq, 16);
    const aq = Q(S, 0, 'and for arrays twice the K gap', 0.6) * f1;
    chip(490, 775, 760, 52, 'arrays : least mismatched rows = 2|K_P − K_Q|', C.mag, aq, 19);
    const pq = Q(S, 0, 'is the total variation distance', 0.6) * f1;
    const px = 1060, py = 740, pw = 680, ph = 440, xS = x => px + x / 0.26 * pw, yS = v => py - v / 0.52 * ph;
    plotAxes(px, py, pw, ph, pq, '|κ_P − κ_Q|', 'least disagreement (LP optimum)');
    curve(p => [xS(p * 0.25), yS(2 * p * 0.25)], 20, C.gold, pq, 2.5);
    lbl('2 |Δκ|', xS(0.25) - 6, yS(0.5) + 26, C.gold, pq, 17, 'right');
    TV_127.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 7, 'c', clamp(pq * 1.6 - i / 30)));
    lbl('random pairs with equal means , solved as linear programs', px + 20, py - ph + 20, C.dim, pq, 15, 'left');
  }
  const q = Q(S, 1, 'A positive mismatch is a relaxation', 0.6, 0.3);
  if (q > 0) {
    stamp('A RELAXATION , NOT A GLUING', W / 2, 280, q, C.red, 30, -0.03);
    lbl('a genuine global row has one restriction to the separator', W / 2, 340, C.dim, q, 16);
    const lq = Q(S, 1, 'a path of length two puts both ends in one row', 0.6);
    const L = [['a', 170], ['x', 320], ['b', 470]], RW = [[1, 0, 1], [0, 1, 0]];
    for (let i = 0; i < 2; i++) line(L[i][1], 440, L[i + 1][1], 440, C.cyan, lq, 3);
    L.forEach(([s, x]) => { dot(x, 440, 14, s === 'x' ? 'c' : 'g', lq); lbl(s, x, 412, C.white, lq, 19); });
    RW.forEach((r, j) => r.forEach((v, i) => { box(L[i][1] - 38, 490 + j * 72, 76, 60, v ? C.gold : C.dim, lq, 1.5, v ? 'rgba(60,40,0,0.5)' : 'rgba(0,0,0,0.4)'); lbl(String(v), L[i][1], 529 + j * 72, v ? C.gold : C.dim, lq, 22); lbl('row ' + (j + 1), 95, 529 + j * 72, C.dim, lq * (i === 0 ? 1 : 0), 15, 'left'); }));
    lbl('a , b in the same row :  h_ab = 1', 320, 670, C.cyan, lq, 18);
    const rq = Q(S, 1, 'a path of length three in opposite rows', 0.6);
    const Rr = [['a', 1040], ['y', 1190], ['z', 1340], ['b', 1490]], RR = [[1, 0, 1, 0], [0, 1, 0, 1]];
    for (let i = 0; i < 3; i++) line(Rr[i][1], 440, Rr[i + 1][1], 440, C.mag, rq, 3);
    Rr.forEach(([s, x]) => { dot(x, 440, 14, s === 'a' || s === 'b' ? 'g' : 'm', rq); lbl(s, x, 412, C.white, rq, 19); });
    RR.forEach((r, j) => r.forEach((v, i) => { box(Rr[i][1] - 38, 490 + j * 72, 76, 60, v ? C.gold : C.dim, rq, 1.5, v ? 'rgba(60,40,0,0.5)' : 'rgba(0,0,0,0.4)'); lbl(String(v), Rr[i][1], 529 + j * 72, v ? C.gold : C.dim, rq, 22); }));
    lbl('a , b in opposite rows :  h_ab = 0', 1265, 670, C.mag, rq, 18);
    const nq = Q(S, 1, 'never meet', 0.6);
    chip(W / 2, 740, 1300, 56, 'm = 2 , all totals one :  attainable joint counts  {1} ∩ {0} = ∅', C.red, nq, 21);
    lbl('together the five occupied vertices form an odd cycle a – x – b – z – y – a , which two rows cannot colour', W / 2, 795, C.dim, nq, 15);
  }
};

/* ---- 04 ONE RETAINED EDGE (§41) ---- */
SCENES.edge = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Each cycle splits into rows', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now glue b labelled odd cycles', 0.6) * f1;
    const eq = Q(S, 0, 'along one retained edge a b', 0.6) * f1;
    glue127(470, 480, 150, [3, 3], q, { ea: 0.75, elw: 4 + 4 * eq });
    lbl('C₇ ∪ C₇ along ab :  |V| = 2 + b(2k − 1) = 12', 470, 760, C.dim, q, 17);
    const sq = Q(S, 0, 'only three states', 0.6) * f1;
    const st = [['O = ∅', 'm − t − u rows', C.white, 'empty'], ['A = {a}', 't rows', C.gold, 'a alone'], ['B = {b}', 'u rows', C.cyan, 'b alone']];
    st.forEach(([h, s, col, ph], i) => { const qq = Q(S, 0, ph, 0.5) * f1; box(1000, 250 + i * 88, 380, 72, col, qq, 2, 'rgba(0,0,0,0.5)'); lblG(h, 1110, 296 + i * 88, col, qq, 23); lbl(s, 1290, 296 + i * 88, C.white, qq, 18); });
    box(1400, 250, 380, 72, C.red, sq, 2, 'rgba(40,0,0,0.4)'); lblG('{a, b} forbidden', 1590, 296, C.red, sq, 22);
    lbl('forced counts , the same on every branch', 1590, 360, C.dim, sq, 15);
    const rq = Q(S, 0, 'so local arrays line up row by row', 0.6) * f1;
    const cols = [C.white, C.white, C.gold, C.gold, C.cyan];
    [0, 1].forEach(j => { const x0 = 1010 + j * 400; lbl('branch ' + (j + 1) + ' rows', x0 + 160, 545, C.dim, rq, 16); cols.forEach((col, r) => { box(x0, 560 + r * 40, 320, 32, col, rq, 1.4, 'rgba(0,0,0,0.5)'); lbl(['O', 'O', 'A', 'A', 'B'][r], x0 + 20, 583 + r * 40, col, rq, 16); lbl('private choice', x0 + 190, 583 + r * 40, C.dim, rq, 13); }); });
    for (let r = 0; r < 5; r++) arrow(1335, 576 + r * 40, 1405, 576 + r * 40, C.dim, rq, 1.6);
    lbl('rowwise union : independent sets of the glued graph', 1400, 780, C.green, rq, 16);
  }
  const q = Q(S, 1, 'Each cycle splits into rows', 0.6, 0.3);
  if (q > 0) {
    const sq = Q(S, 1, 'because some edge always has slack', 0.6), mq = Q(S, 1, 'saturating them all', 0.6);
    cyc127(420, 470, 170, C7STEP_127.c, q, { slack: sq > 0 ? C7STEP_127.slack : -1, set: mq > 0 ? C7STEP_127.set : [], idx: true });
    lbl('m = 3 :  (1, 2, 1, 1, 2, 1, 1)', 420, 705, C.white, q, 19);
    lbl('slack edge 2 – 3 :  1 + 1 ≤ m − 1', 420, 745, C.green, sq, 17);
    lbl('subtract {4, 6, 1}  →  m = 2 :  (1, 1, 1, 1, 1, 1, 0)', 420, 785, C.gold, mq, 17);
    chip(1290, 280, 920, 58, 'every edge saturated ⇒ 2 Σ c = (2k + 1) m > 2 k m', C.green, mq, 21);
    lbl('so some edge has slack ; remove the independent set {i+2, i+4, …, i+2k}', 1290, 340, C.dim, mq, 15);
    const rq = Q(S, 1, 'The ring is a normal', 0.6);
    chip(1290, 430, 920, 58, 'R = ℂ[S] : normal , Cohen–Macaulay , dim 3 + b(2k − 1)', C.cyan, rq, 21);
    lbl('S = cone ∩ lattice ; Hochster gives Cohen–Macaulay', 1290, 490, C.dim, rq, 15);
    const cq = Q(S, 1, 'its canonical module the strict interior', 0.6);
    chip(1290, 580, 920, 58, 'ω_R :  c_v ≥ 1 ,  c_v + c_w ≤ m − 1 ,  δ_ℓ ≥ 1', C.gold, cq, 22);
    lbl('Danilov–Stanley in the graded form of Barile–Bruns , Thm 5.1', 1290, 640, C.dim, cq, 15);
    lbl('clique-sum precedent : Matsuda–Ohsugi–Shibata , Prop 1.3', 1290, 670, C.dim, cq, 15);
  }
};

/* ---- 05 SYNCHRONIZED DESCENT (§42) ---- */
SCENES.descent = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Otherwise one row comes off every branch at once', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'An interior exponent is basic', 0.6) * f1;
    chip(490, 260, 800, 56, 'basic :  no s ≠ 0 in S with p − s still interior', C.white, q, 20);
    const nq = Q(S, 0, 'On one cycle these are nu j', 0.6) * f1;
    chip(490, 335, 800, 56, 'ν_j = (2j + 1 ; j · 1) ,   1 ≤ j ≤ k − 1', C.gold, nq, 22);
    const gq = Q(S, 0, 'On the glued graph', 0.6) * f1;
    glue127(490, 545, 120, [3, 3], gq, { vals: [[2, 2, 2, 2, 2], [1, 1, 1, 1, 1]], vc: [C.gold, C.white], bc: [C.gold, C.cyan], dn: ['g', 'c'], la: 'a = 2', lb: 'b = 2', vs: 19 });
    lbl('m = 5', 490, 745, C.white, gq, 19);
    const bq = Q(S, 0, 'basic exactly when some branch equals some nu j', 0.6) * f1;
    stamp('BASIC', 880, 560, bq, C.gold, 30, -0.06);
    lbl('ν₂ on the left blocks every subtraction', 490, 785, C.gold, bq, 16);
    const tq = Q(S, 0, 'An interior exponent is basic', 0.8, 0.8) * f1;
    box(1040, 250, 740, 480, C.cyan, tq, 2, 'rgba(0,20,30,0.4)');
    lbl('recomputed :  two seven-cycles at one edge', 1410, 290, C.cyan, tq, 18);
    [['degree m', 'interior points', 'basic']].concat(BF_127.map(r => [String(r[0]), r[1].toLocaleString('en-US'), String(r[2])])).forEach((r, i) => {
      const qq = clamp(tq * 1.6 - i / 8), y = 320 + i * 56, hd = i === 0, hl = r[2] !== '0' && !hd;
      r.forEach((v, j) => { const x = 1065 + [0, 180, 470][j], w = [170, 280, 240][j]; box(x, y, w, 46, hd ? C.dim : hl ? C.gold : C.cyan, qq, 1.3, 'rgba(0,0,0,0.5)'); lbl(v, x + w / 2, y + 31, hd ? C.dim : hl ? C.gold : C.white, qq, 19); });
    });
    lbl('basic ⟺ some branch equals ν_j , checked on every point', 1410, 700, C.dim, tq, 15);
  }
  const q = Q(S, 1, 'Otherwise one row comes off every branch at once', 0.6, 0.3);
  if (q > 0) {
    const hq = Q(S, 1, 'Every branch has m minus t minus u minus one empty-edge rows', 0.6);
    chip(1410, 270, 740, 56, 'h = m − t − u − 1  empty-edge rows , every branch', C.white, hq, 20);
    const rules = [['h > 0', 'remove an empty-edge row', C.white, 'If that is positive'], ['h = 0 , t ≥ u', 'remove a row with a alone', C.gold, 'a row with a alone'], ['h = 0 , t < u', 'remove a row with b alone', C.cyan, 'else b alone']];
    rules.forEach(([c1, c2, col, ph], i) => { const qq = Q(S, 1, ph, 0.5), y = 330 + i * 72; box(1040, y, 280, 56, col, qq, 1.8, 'rgba(0,0,0,0.5)'); lblG(c1, 1180, y + 36, col, qq, 21); arrow(1328, y + 28, 1382, y + 28, C.dim, qq, 2); box(1390, y, 390, 56, col, qq, 1.8, 'rgba(0,0,0,0.5)'); lbl(c2, 1585, y + 36, C.white, qq, 18); });
    const ex = SYNC_127.ex, rest = SYNC_127.rest;
    glue127(290, 500, 78, [3, 3], q, { vals: [ex.slice(3, 8), ex.slice(8, 13)], la: 'a = ' + ex[1], lb: 'b = ' + ex[2], vs: 17, ls: 17, r: 9 });
    lbl('m = ' + ex[0] + ' :  h = ' + (ex[0] - ex[1] - ex[2] - 1) + ' ,  t = ' + ex[1] + ' > u = ' + ex[2], 290, 690, C.white, q, 17);
    const aq = Q(S, 1, 'a row with a alone', 0.6);
    arrow(500, 500, 560, 500, C.gold, aq, 3);
    lbl('remove', 530, 465, C.gold, aq, 15); lbl('{a}', 530, 540, C.gold, aq, 17);
    glue127(770, 500, 78, [3, 3], aq, { vals: [rest.slice(3, 8), rest.slice(8, 13)], la: 'a = ' + rest[1], lb: 'b = ' + rest[2], vs: 17, ls: 17, r: 9, ad: 'm' });
    lbl('m = ' + rest[0] + ' : still interior', 770, 690, C.green, aq, 17);
    chip(1410, 610, 740, 56, 'example :  h = 0 , t = 3 ≥ u = 2  ⇒  remove {a}', C.gold, aq, 19);
    const rq = Q(S, 1, 'else b alone', 0.6);
    lbl('every branch loses the same row {a} : both restrictions stay interior , so p was not basic', W / 2, 790, C.dim, rq, 15);
  }
};

/* ---- 06 CANONICAL TYPE (§42) ---- */
SCENES.type = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Two seven-cycles have type ninety', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'with A a transfer-matrix entry', 0.6) * f1;
    const T2 = [[1, 1, 1], [1, 1, 0], [1, 0, 0]];
    lbl('T₂ : x + y ≤ 2', 290, 260, C.cyan, q, 19);
    T2.forEach((r, i) => r.forEach((v, j) => { box(200 + j * 62, 285 + i * 62, 54, 54, v ? C.cyan : C.dim, q, 1.4, v ? 'rgba(0,40,50,0.5)' : 'rgba(0,0,0,0.4)'); lbl(String(v), 227 + j * 62, 321 + i * 62, v ? C.white : C.dim, q, 20); }));
    lbl('(x, y, z) ↦ (x + y + z , x + y , x)', 290, 500, C.dim, q, 15);
    T2ROWS_127.forEach((r, p) => { const qq = clamp(q * 1.7 - p / 9), y = 280 + p * 58, hl6 = p === 6, hl7 = p === 7; lbl('p = ' + p, 520, y + 6, C.dim, qq, 17, 'left'); r.forEach((v, j) => { const h = (j === 1 && (hl6 || hl7)); box(620 + j * 105, y - 24, 95, 44, h ? (hl6 ? C.gold : C.mag) : C.cyan, qq, h ? 2.4 : 1.2, 'rgba(0,0,0,0.5)'); lbl(String(v), 667 + j * 105, y + 7, h ? (hl6 ? C.gold : C.mag) : C.white, qq, 19); }); });
    lbl('edge : six edges , middle entry 45', 780, 760, C.gold, q, 16); lbl('vertex : seven edges , 101', 780, 790, C.mag, q, 16);
    const mq = Q(S, 0, 'carries A to the b minus', 0.6) * f1;
    chip(1400, 300, 720, 60, 'μ_j = A^b − (A − 1)^b   in degree 2j + 1', C.cyan, mq, 23);
    lbl('A_k,j = (T_(2j−2)^(2k))_(j−1, j−1)', 1400, 365, C.dim, mq, 17);
    lbl('tuples at boundary (2j + 1, j, j) with at least one ν_j', 1400, 395, C.dim, mq, 15);
    const sq = Q(S, 0, 'For seven-cycles A is one and forty-five', 0.6) * f1;
    chip(1400, 480, 720, 60, 'k = 3 :  A₃,₁ = 1 ,  A₃,₂ = 45', C.gold, sq, 24);
    const tq = Q(S, 0, 'type one plus forty-five to the b', 0.6) * f1;
    chip(1400, 580, 720, 66, 'type R = 1 + 45ᵇ − 44ᵇ', C.green, tq, 30);
    lbl('b = 2 :  45² − 44² = 1 + 44 + 44 = 89', 1400, 650, C.white, tq, 18);
  }
  const q = Q(S, 1, 'Two seven-cycles have type ninety', 0.6, 0.3);
  if (q > 0) {
    const px = 200, py = 740, pw = 900, ph = 440, yS = v => py - Math.log10(v) / 4.7 * ph;
    plotAxes(px, py, pw, ph, q, '', 'canonical type (log scale)');
    lbl('number b of labelled seven-cycles', px + pw / 2, py + 62, C.dim, q, 16);
    [1, 10, 100, 1000, 10000].forEach(v => { lbl(String(v), px - 10, yS(v) + 6, C.dim, q, 14, 'right'); dashed(px, yS(v), px + pw, yS(v), C.dim, q * 0.25, 1); });
    const eq = Q(S, 1, 'Two seven-cycles have type ninety', 0.6), rq = Q(S, 1, 'Glued at one vertex instead', 0.6);
    [0, 1, 2].forEach(i => {
      const x = px + 90 + i * 280, ve = TYPES_127.edge[i], vr = TYPES_127.root[i];
      const he = (py - yS(ve)) * eq, hr = (py - yS(vr)) * rq;
      fillBox(x, py - he, 90, he, C.cyan, 0.45 * q); rect63(x, py - he, 90, he, C.cyan, eq, 1.6); lbl(String(ve), x + 45, py - he - 12, C.cyan, eq, 19);
      fillBox(x + 100, py - hr, 90, hr, C.gold, 0.45 * q); rect63(x + 100, py - hr, 90, hr, C.gold, rq, 1.6); lbl(String(vr), x + 145, py - hr - 12, C.gold, rq, 19);
      lbl('b = ' + (i + 1), x + 95, py + 28, C.dim, q, 16);
    });
    box(1200, 260, 580, 150, C.cyan, eq, 2, 'rgba(0,20,30,0.4)'); lbl('one retained edge', 1490, 300, C.cyan, eq, 20); lblG('1 + 45ᵇ − 44ᵇ ,  5b + 2 vertices', 1490, 360, C.white, eq, 21);
    box(1200, 430, 580, 150, C.gold, rq, 2, 'rgba(40,30,0,0.4)'); lbl('one common vertex', 1490, 470, C.gold, rq, 20); lblG('1 + 101ᵇ − 100ᵇ ,  6b + 1 vertices', 1490, 530, C.white, rq, 21);
    const nq = Q(S, 1, 'These are different graphs', 0.6);
    stamp('DIFFERENT GRAPHS · NO GENERAL TREND', 1490, 660, nq, C.red, 22, -0.03);
    lbl('recomputed by brute force : 90 (edge) and 202 (vertex) for b = 2', 1490, 730, C.dim, nq, 15);
  }
};

/* ---- 07 ENDPOINT QUOTIENT (§43) ---- */
SCENES.quotient = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Squares must be taken sector by sector', 0.6);
  const gx = 1080, gy = 270, cw = 112;
  const grid = (a, show) => {
    if (a <= 0) return;
    lbl('u →', gx + 3 * cw, gy - 14, C.dim, a, 16); lbl('t ↓', gx - 34, gy + 3 * cw, C.dim, a, 16);
    DEG5_127.forEach(r => { const [tt, uu, B, E, I] = r, x = gx + uu * cw, y = gy + tt * cw * 0.82, nz = I > 0, hl = E > 0; box(x, y, cw - 8, cw * 0.82 - 8, hl ? C.mag : nz ? C.cyan : C.dim, a * (nz ? 1 : 0.4), hl ? 2.6 : 1.3, nz ? 'rgba(0,30,40,0.55)' : 'rgba(0,0,0,0.3)'); lbl(nz ? (hl ? B + '+' + E : String(I)) : '0', x + (cw - 8) / 2, y + 52, hl ? C.mag : nz ? C.white : C.dim, a * (nz ? 1 : 0.5), hl ? 21 : 22); });
  };
  if (f1 > 0) {
    const q = Q(S, 0, 'Now resolve by both endpoints', 0.6) * f1;
    chip(510, 270, 820, 58, 'I_k(m, t, u) = B_k(m, t, u) + E_k(m, t, u)', C.white, q, 22);
    const bq = Q(S, 0, 'a shifted legal one', 0.6) * f1;
    chip(510, 350, 820, 58, 'B_k(m, t, u) = L_k(m − 3, t − 1, u − 1)', C.cyan, bq, 22);
    lbl('ordinary interiors : ν₁ plus a legal point', 510, 405, C.dim, bq, 15);
    const eq = Q(S, 0, 'counted by two binomials', 0.6) * f1;
    chip(510, 480, 820, 58, 'E_k = Σ_(2 ≤ j ≤ k−1) C(t−j+k−1, k−1) · C(u−j+k−1, k−1)', C.mag, eq, 18);
    lbl('valid when m ≥ t + u + 1 ; slack groups of sizes k , k , 1', 510, 535, C.dim, eq, 15);
    const sq = Q(S, 0, 'For two seven-cycles in degree five', 0.6) * f1;
    grid(sq, 1);
    lbl('k = 3 , m = 5 :  I₃(5, t, u)', 1560, 770, C.cyan, sq, 17);
    const xq = Q(S, 0, 'forty-four plus one', 0.6) * f1;
    chip(510, 620, 820, 58, 'E₃(5, 2, 2) = C(2,2) · C(2,2) = 1 :  45 = 44 + 1', C.mag, xq, 21);
    lbl('column sums  B = 288 ,  E = 1 ,  I = 289', 510, 680, C.dim, xq, 16);
  }
  const q = Q(S, 1, 'Squares must be taken sector by sector', 0.6, 0.3);
  if (q > 0) {
    grid(q * 0.9, 1);
    const s1 = Q(S, 1, 'fifteen thousand one hundred nineteen', 0.6);
    chip(510, 270, 820, 56, 'Σ I² = 70² + 2·56² + 2·31² + 45² = 15119', C.cyan, s1, 21);
    chip(510, 340, 820, 56, 'Σ B² = 70² + 2·56² + 2·31² + 44² = 15030', C.white, s1, 21);
    const lq = Q(S, 1, 'leaves eighty-nine', 0.6);
    chip(510, 420, 820, 64, 'dim (C)₅ = 2 · 44 · 1 + 1² = 89', C.gold, lq, 26);
    lbl('the whole degree-five quotient = the 89 basic generators', 510, 480, C.dim, lq, 15);
    lbl('(Σ I)² = 289² would discard endpoint compatibility', 510, 510, C.red, q, 15);
    const dq = Q(S, 1, 'In degree six the quotient has dimension', 0.6);
    chip(510, 590, 820, 56, 'dim (C)₆ = (2·189 + 1) + 2(2·138·3 + 9) = 2053', C.cyan, dq, 20);
    lbl('ordinary 246 , 216 , 160 , 85 , 189 , 138 ;  exceptional 1 , 3 , 3', 510, 645, C.dim, dq, 15);
    const mq = Q(S, 1, 'but these are multiples, not new generators', 0.6);
    stamp('MULTIPLES , NOT NEW GENERATORS', 510, 735, mq, C.red, 24, -0.03);
  }
};

/* ---- 08 THE LAST FREE MODULE (§44) ---- */
SCENES.terminal = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'A path on n vertices', 'lean'], [0, 'so the edge family has', 'theory'], [1, null, 'classical'], [1, 'and the canonical module fixes', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Auslander-Buchsbaum gives length', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'One variable per independent set', 0.6) * f1;
    chip(510, 265, 820, 56, 'S = ℂ[z_I : I independent] → R ,  z_I ↦ X^(1, 1_I)', C.white, q, 19);
    const pq = Q(S, 0, 'A path on n vertices', 0.6) * f1;
    const px = 160, py = 700, ph = 330;
    PATHC_127.forEach((v, n) => { const qq = clamp(pq * 1.6 - n / 10), x = px + n * 92, h = v / 34 * ph; fillBox(x, py - h, 64, h, C.green, qq * 0.4); rect63(x, py - h, 64, h, C.green, qq, 1.6); lbl(String(v), x + 32, py - h - 12, C.white, qq, 19); lbl('n = ' + n, x + 32, py + 26, C.dim, qq, 15); });
    lbl('independent sets of a path on n vertices :  F(n + 2)', 500, 365, C.green, pq, 17);
    lbl('Lean : admissibleWord_card_eq_fib (no-11 words of length m number F(m + 2))', 500, 770, C.green, pq, 14);
    const mq = Q(S, 0, 'so the edge family has', 0.6) * f1;
    const parts = [['00', '13² = ' + MODES_127['00'], C.white], ['10', '8² = ' + MODES_127['10'], C.gold], ['01', '8² = ' + MODES_127['01'], C.cyan]];
    parts.forEach(([h, s, col], i) => { const qq = clamp(mq * 1.6 - i / 4); box(1060, 270 + i * 100, 330, 80, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl('edge ' + h, 1140, 318 + i * 100, col, qq, 20); lblG(s, 1300, 318 + i * 100, C.white, qq, 22); });
    lbl('private paths of 5 , 4 , 4 vertices on each branch', 1225, 590, C.dim, mq, 15);
    const dq = Q(S, 0, 'two hundred ninety-seven for two seven-cycles', 0.6) * f1;
    chip(1430, 670, 720, 62, 'D = F(2k+1)ᵇ + 2 F(2k)ᵇ = 169 + 128 = 297', C.gold, dq, 22);
    box(1420, 270, 360, 280, C.cyan, mq, 1.6, 'rgba(0,20,30,0.35)'); lbl('Σ γ_I : ordinary 297', 1600, 310, C.cyan, mq, 16); lbl('shared 64 , 64', 1600, 345, C.white, mq, 16);
    SIG_127.private.forEach((v, i) => { lbl('x' + (i + 1) + ' : ' + v, 1600, 385 + i * 30, C.dim, mq, 15); });
  }
  const q = Q(S, 1, 'Auslander-Buchsbaum gives length', 0.6, 0.3);
  if (q > 0) {
    const ch = ['R', 'F₀', 'F₁', '⋯', 'F₂₈₃', 'F₂₈₄'];
    ch.forEach((s, i) => { const x = 1640 - i * 300, last = i === 5; box(x - 90, 250, 180, 70, last ? C.gold : C.cyan, q, last ? 2.6 : 1.6, 'rgba(0,0,0,0.5)'); lblG(s, x, 296, last ? C.gold : C.white, q, 24); if (i < 5) arrow(x - 210, 285, x - 96, 285, C.dim, q, 2); });
    lbl('minimal graded free resolution over S , 297 variables', W / 2, 360, C.dim, q, 15);
    chip(510, 430, 820, 58, 'pd R = depth S − depth R = 297 − 13 = 284', C.cyan, q, 22);
    lbl('Auslander–Buchsbaum , Stacks 090U', 510, 485, C.dim, q, 15);
    const fq = Q(S, 1, 'and the canonical module fixes the last free module', 0.6);
    chip(510, 560, 820, 64, 'F₂₈₄ = S(−294) ⊕ S(−292)⁸⁹', C.gold, fq, 28);
    lbl('dual generators : canonical degrees 3 and 5 , Ext into S(−Σ) (Barile–Bruns 4.5)', 510, 620, C.dim, fq, 14);
    box(1050, 420, 730, 230, C.mag, fq, 2, 'rgba(40,0,40,0.35)');
    lbl('one common vertex , two seven-cycles', 1415, 460, C.mag, fq, 18);
    lblG('505 = 21² + 8² modes ,  pd 491', 1415, 515, C.white, fq, 22);
    lblG('F₄₉₁ = S(−502) ⊕ S(−500)²⁰¹', 1415, 575, C.white, fq, 24);
    lbl('types 202 and 90 : different rings', 1415, 625, C.dim, fq, 15);
    const sq = Q(S, 1, 'These count summands', 0.6);
    stamp('SUMMAND COUNTS , NOT STATE DIMENSIONS', W / 2, 735, sq, C.red, 24, -0.03);
  }
};

/* ---- 09 FIVE AND SEVEN (§45–46) ---- */
SCENES.mixed = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So the type is one plus eight to the r', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now mix r five-cycles and s seven-cycles', 0.6) * f1;
    glue127(470, 480, 150, [2, 3], q, { bc: [C.mag, C.cyan], dn: ['m', 'c'], ea: 0.8 });
    lbl('C₅', 300, 485, C.mag, q, 24); lbl('C₇', 700, 485, C.cyan, q, 24);
    lbl('r five-cycles , s seven-cycles , one edge ab', 470, 760, C.dim, q, 17);
    const rq = Q(S, 0, 'Residual degrees differ', 0.6) * f1;
    chip(1350, 270, 860, 58, 'p_C = ν_C,j_C + q_C ,  deg q_C = m − 2j_C − 1  (may differ)', C.white, rq, 19);
    const hq = Q(S, 0, 'every branch has the same empty-edge count', 0.6) * f1;
    chip(1350, 350, 860, 58, 'A_C = t − j_C ,  B_C = u − j_C ,  O_C = m − t − u − 1 = h', C.cyan, hq, 20);
    lbl('h does not depend on j_C or on the cycle length', 1350, 405, C.dim, hq, 15);
    const zq = Q(S, 0, 'the largest layer still forces t or u above it', 0.6) * f1;
    chip(1350, 480, 860, 58, 'h = 0 :  t + u = m − 1 > 2J ,  J = max j_C', C.gold, zq, 21);
    lbl('so t > J (remove A everywhere) or u > J (remove B everywhere)', 1350, 535, C.dim, zq, 15);
    const oq = Q(S, 0, 'so one common row comes off', 0.6) * f1;
    stamp('ONE COMMON ROW', 1350, 640, oq, C.green, 30, -0.04);
  }
  const q = Q(S, 1, 'So the type is one plus eight to the r', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 64, 'type = 1 + 8ʳ (45ˢ − 44ˢ)', C.green, q, 30);
    lbl('degree 3 : (3 ; 1) ;  degree 5 : boundary (5, 2, 2) , some seven-cycle all twos', 530, 320, C.dim, q, 15);
    const tq = Q(S, 1, 'a five-cycle has eight private triples there', 0.6);
    TRIPLES_127.forEach((tr, i) => { const qq = clamp(tq * 1.6 - i / 10), x = 150 + (i % 4) * 200, y = 400 + Math.floor(i / 4) * 105; box(x, y, 180, 76, C.mag, qq, 1.8, 'rgba(40,0,40,0.4)'); lbl('(' + tr.join(', ') + ')', x + 90, y + 47, C.white, qq, 22); });
    box(150, 630, 380, 76, C.red, tq, 1.8, 'rgba(40,0,0,0.4)'); lbl('(2, 2, 2) : total 10 > 9', 340, 677, C.red, tq, 19);
    lbl('4 + 3 + 1 = 8 private triples at (5, 2, 2)', 750, 677, C.mag, tq, 16);
    const oq = Q(S, 1, 'One of each gives type nine', 0.6);
    box(1040, 400, 740, 310, C.cyan, oq, 2, 'rgba(0,20,30,0.4)');
    lbl('r = s = 1 :  C₅ + C₇ , 10 vertices', 1410, 448, C.cyan, oq, 20);
    lblG('D = 5 · 13 + 2 · 3 · 8 = 113 ,  dim 11', 1410, 510, C.white, oq, 22);
    lblG('type 9 ,  length 113 − 11 = 102', 1410, 570, C.white, oq, 22);
    lblG('F₁₀₂ = P(−110) ⊕ P(−108)⁸', 1410, 645, C.gold, Q(S, 1, 'last shifts one ten and one oh eight', 0.6), 26);
    lbl('recomputed by brute force :  C₅+C₇ → 1 + 8 ,  C₅+C₅+C₇ → 1 + 64', W / 2, 790, C.dim, oq, 15);
  }
};

/* ---- 10 SHORT-BRANCH SUBTRACTION (§47) ---- */
SCENES.short = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For a seven-cycle with a nine-cycle', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Any finite mixture works the same way', 0.6) * f1;
    const cq = Q(S, 0, 'the total cap removes a sum of squared binomials', 0.6) * f1;
    chip(W / 2, 265, 1500, 60, 'A_k,j = uᵀ H_j^(2k−2) u  −  Σ_(q = 0)^(j−k) C(q + k − 1, k − 1)²', C.white, Math.max(q * 0.6, cq), 23);
    lbl('H_j[x, y] = 1 if x + y ≤ 2j  (1 ≤ x, y ≤ 2j − 1) ;  u_j = indicator of x ≤ j', W / 2, 322, C.dim, q, 15);
    const kq = Q(S, 0, 'a branch with k at most j', 0.6) * f1, fq = Q(S, 0, 'For a five-cycle the count is j cubed', 0.6) * f1;
    const tx = 430, ty = 380, cw = 150, ch = 62;
    lbl('j →', tx + 2.5 * cw, ty - 14, C.dim, q, 16);
    for (let j = 1; j <= 5; j++) lbl('j = ' + j, tx + (j - 1) * cw + cw / 2, ty + 18, C.dim, q, 16);
    for (let k = 2; k <= 6; k++) {
      lbl('k = ' + k, tx - 50, ty + (k - 1) * ch - 30 + 36, C.dim, q, 16);
      for (let j = 1; j <= 5; j++) {
        const v = ATAB_127[k + ',' + j], x = tx + (j - 1) * cw, y = ty + (k - 1) * ch - 30, corr = j >= k, five = k === 2;
        const qq = clamp(q * 1.6 - (k + j) / 14);
        box(x + 4, y, cw - 8, ch - 8, corr ? C.mag : C.cyan, qq, corr ? 2.2 * Math.max(0.5, kq) : 1.2, five && fq > 0 ? 'rgba(60,40,0,0.5)' : 'rgba(0,0,0,0.5)');
        lbl(String(v), x + cw / 2, y + 36, five && fq > 0 ? C.gold : corr && kq > 0 ? C.mag : C.white, qq, 19);
      }
    }
    lbl('magenta : j ≥ k , the all-j vector breaks the total cap', 1380, 470, C.mag, kq, 16, 'left');
    lbl('k = 2 row :  1 , 8 , 27 , 64 , 125 = j³', 1380, 420, C.gold, fq, 17, 'left');
    lbl('checked against a direct count , k = 2 … 7 , j = 1 … 6', 1380, 520, C.dim, kq, 15, 'left');
  }
  const q = Q(S, 1, 'For a seven-cycle with a nine-cycle', 0.6, 0.3);
  if (q > 0) {
    glue127(380, 480, 120, [3, 4], q, { bc: [C.cyan, C.gold], dn: ['c', 'g'], ea: 0.8 });
    lbl('C₇', 240, 485, C.cyan, q, 24); lbl('C₉', 560, 485, C.gold, q, 24);
    lbl('14 vertices , D = 13 · 34 + 2 · 8 · 21 = 778', 380, 760, C.dim, q, 16);
    const aq = Q(S, 1, 'the counts are forty-five', 0.6);
    C7C9_127.A.forEach(([k, j, v], i) => { const qq = clamp(aq * 1.6 - i / 3), x = 800 + i * 330; box(x, 255, 300, 110, i === 2 ? C.mag : C.cyan, qq, 2, 'rgba(0,0,0,0.5)'); lblG('A' + ['', '', '₂', '₃', '₄'][k] + ',' + ['', '', '₂', '₃'][j], x + 150, 295, C.dim, qq, 20); lbl(String(v), x + 150, 345, i === 2 ? C.mag : C.white, qq, 30); });
    const oq = Q(S, 1, 'one less than three hundred ninety-one', 0.6);
    lbl('391 − 1 : the all-3 vector on the seven-cycle exceeds its cap', 1295, 400, C.mag, oq, 16);
    const mq = Q(S, 1, 'The multiplicities are one', 0.6);
    chip(1295, 480, 950, 62, '(M₁ , M₂ , M₃) = (1 , 271 , 390)', C.green, mq, 26);
    lbl('M₂ = 45 · 227 − 44 · 226 = 271 ;  M₃ = A₃,₃ = 390 (only C₉ eligible)', 1295, 540, C.dim, mq, 15);
    const tq = Q(S, 1, 'type six hundred sixty-two', 0.6);
    chip(1295, 620, 950, 60, 'type 662 ,  F₇₆₃ = P(−775) ⊕ P(−773)²⁷¹ ⊕ P(−771)³⁹⁰', C.gold, tq, 20);
    lbl('recomputed : 271 basic of 76 355 degree-five interiors ; 390 at (7, 3, 3)', 1295, 680, C.dim, tq, 15);
  }
};

/* ---- 11 SPECTRUM AND GROWTH (§47) ---- */
SCENES.growth = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Consecutive counts grow by the ratio rho one', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the counts follow the spectrum of a cosine matrix', 0.6) * f1;
    const px = 330, py = 500, pw = 640;
    const xS = x => px + pw / 2 + x / 4 * (pw / 2);
    line(px, py, px + pw, py, C.dim, q, 1.5); line(xS(0), py - 12, xS(0), py + 12, C.dim, q, 1.5); lbl('0', xS(0), py + 34, C.dim, q, 15);
    [-4, -3, -2, -1, 1, 2, 3, 4].forEach(v => { line(xS(v), py - 6, xS(v), py + 6, C.dim, q, 1.2); lbl(String(v), xS(v), py + 34, C.dim, q, 14); });
    const eq = Q(S, 0, 'eigenvalues one over two sine', 0.6) * f1;
    [['2', C.cyan, 'c', -1], ['3', C.gold, 'g', 1]].forEach(([j, col, dn, side]) => {
      const E = EIG_127[j];
      const rk = E.lam.map((l, i) => [l, i]).sort((x, y) => x[0] - y[0]).map(z => z[1]);
      E.lam.forEach((l, i) => { const r = 8 + 26 * Math.sqrt(E.w[i]), off = (rk.indexOf(i) % 2) * 22; dot(xS(l), py + side * 70, r, dn, eq); lbl(l.toFixed(3), xS(l), py + side * 70 + side * (r + 20 + off) + (side > 0 ? 10 : 0), col, eq * 0.9, 14); });
      lbl('j = ' + j + ' (N = ' + (2 * j - 1) + ')', px - 20, py + side * 70 + 6, col, eq, 16, 'right');
    });
    lbl('dot area ∝ weight w_ℓ > 0 ,  weights sum to j', px + pw / 2, 680, C.dim, eq, 15);
    chip(W / 2 + 0, 265, 1500, 58, 'λ_ℓ = (−1)^(ℓ+1) / (2 sin(θ_ℓ / 2)) ,  θ_ℓ = (2ℓ − 1)π / (2N + 1) ,  N = 2j − 1', C.cyan, eq, 21);
    const pq = Q(S, 0, 'No pole cancels', 0.6) * f1;
    chip(1390, 470, 760, 60, 'Q_N(w) = Σ (−1)^r C(N + r, 2r) w^r', C.gold, pq, 24);
    lbl('= det(I − w H_j²) ; continuant Q_N = (2 − w) Q_(N−1) − Q_(N−2)', 1390, 530, C.dim, pq, 15);
    const oq = Q(S, 0, 'so the recurrence has order exactly two j minus one', 0.6) * f1;
    chip(1390, 610, 760, 58, 'all w_ℓ > 0 :  least recurrence order 2j − 1', C.green, oq, 22);
  }
  const q = Q(S, 1, 'Consecutive counts grow by the ratio rho one', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 760, pw = 820, ph = 470, xS = k => px + (k - 2) / 13 * pw, yS = v => py - v / 15 * ph;
    plotAxes(px, py, pw, ph, q, '', 'A_(k+1, j) / A_(k, j)');
    lbl('branch half-length k', px + pw / 2, py + 60, C.dim, q, 16);
    [['2', C.cyan, 'c'], ['3', C.gold, 'g']].forEach(([j, col, dn]) => {
      const R = RATIO_127[j];
      dashed(px, yS(R.rho1), px + pw, yS(R.rho1), col, q * 0.8, 1.6);
      lbl('ρ₁ = ' + R.rho1.toFixed(4), px + pw - 4, yS(R.rho1) - 12, col, q, 16, 'right');
      R.seq.forEach((v, i) => dot(xS(i + 2), yS(Math.min(v, 15)), 7, dn, clamp(q * 1.6 - i / 20)));
      lbl('layer j = ' + j, px + 330, yS(R.rho1) + 34, col, q, 16, 'left');
    });
    [2, 5, 10, 15].forEach(k => lbl(String(k), xS(k), py + 26, C.dim, q, 14));
    const rq = Q(S, 1, 'one over four sine squared', 0.6);
    chip(1400, 290, 740, 62, 'ρ₁ = 1 / (4 sin²(π / (8j − 2)))', C.cyan, rq, 26);
    lbl('j = 2 : 5.0489 ,  j = 3 : 12.3435', 1400, 350, C.white, rq, 18);
    lbl('0 ≤ A_k,j − w₁ ρ₁^(k−1) ≤ (j − w₁) ρ₂^(k−1)  for k > j', 1400, 390, C.dim, rq, 15);
    const cq = Q(S, 1, 'a layer is constant unless another branch is eligible', 0.6);
    chip(1400, 480, 740, 60, 'M_j(k) = (C_j − E_j) A_k,j + E_j', C.gold, cq, 25);
    lbl('C_j = Π A_i,j ,  E_j = Π (A_i,j − ε_i,j) over the fixed branches', 1400, 540, C.dim, cq, 15);
    lbl('C_j = E_j (no other eligible branch) : constant in k', 1400, 580, C.white, cq, 16);
    lbl('otherwise : ratio limit ρ₁', 1400, 612, C.white, cq, 16);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Möbius inversion, maximal coupling', 'classical'], [1, 'the gluing and canonical inputs are published', 'published'], [1, 'the path count is frozen in Lean', 'lean'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['JOINT', 'κ = μ₁₃', C.gold, 'One missing coordinate'], ['MISMATCH', 'TV = 2|Δκ|', C.cyan, 'a coupling that measures disagreement'], ['EDGE', '∅ · {a} · {b}', C.mag, 'three edge states'], ['DESCENT', 'some branch = ν_j', C.green, 'synchronized descent'], ['TYPE', '1 + 45ᵇ − 44ᵇ', C.red, 'one plus forty-five to the b'], ['QUOTIENT', '15119 − 15030', C.vio, 'an exact quotient'], ['LAST MODULE', 'S(−294) ⊕ S(−292)⁸⁹', C.gold, 'the last free module'], ['MIXED', '1 + 8ʳ(45ˢ − 44ˢ)', C.cyan, 'mixed cycles'], ['SHORT BRANCH', '391 − 1 = 390', C.mag, 'a short-branch subtraction'], ['GROWTH', 'ρ₁ ≈ 5.05', C.green, 'and a growth rate']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 230 + (i % 5) * 365, y = 230 + Math.floor(i / 5) * 140, q = Q(S, 0, ph) * fade; box(x - 170, y, 340, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 45, col, q, 19); lblG(a2, x, y + 92, C.white, q, i === 6 ? 19 : 22); });
    lbl('CLASSICAL · Möbius inversion (Rota) · maximal coupling (Griffeath) · Auslander–Buchsbaum (Stacks 090U) · Hochster · Hilbert syzygy', W / 2, 560, '#8fbcff', Q(S, 1, 'Möbius inversion, maximal coupling') * fade, 15);
    lbl('PUBLISHED · clique sums (Matsuda–Ohsugi–Shibata) · cycle generators (Miyazaki) · canonical modules (Barile–Bruns) · transfer matrices', W / 2, 600, C.cyan, Q(S, 1, 'the gluing and canonical inputs are published') * fade, 15);
    lbl('LEAN · admissibleWord_card_eq_fib : a path on n vertices has F(n + 2) independent sets', W / 2, 640, C.green, Q(S, 1, 'the path count is frozen in Lean') * fade, 15);
    lbl('VOLUME · separator profile · edge realization · synchronized descent · types · quotients · last modules · mixtures · growth', W / 2, 680, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 15);
    lbl('RECOMPUTED · generators by brute force to degree 7 · 15119 , 15030 , 2053 · 297 , 505 , 778 modes · LP couplings · spectra', W / 2, 720, C.white, Q(S, 1, 'the finite computations were redone') * fade, 15);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    glue127(W / 2, 380, 130, [3, 3], a, { ea: 0.75 });
    txt('AURIC CIRCULATION III·EDGE', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 环流控制 第三部 · 缺失坐标、一条共享边与末端模 · TRURETURING FILM 127', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One joint number to keep, one edge that synchronizes descent, and the last free module, counted exactly.', W / 2, 875, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC CIRCULATION III', joint: 'THE MISSING COORDINATE', mismatch: 'LEAST DISAGREEMENT', edge: 'ONE RETAINED EDGE', descent: 'SYNCHRONIZED DESCENT', type: 'CANONICAL TYPE', quotient: 'ENDPOINT QUOTIENT', terminal: 'THE LAST FREE MODULE', mixed: 'FIVE AND SEVEN', short: 'SHORT-BRANCH SUBTRACTION', growth: 'SPECTRUM AND GROWTH', finale: 'LEDGER' });

function poster127() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  glue127(480, 520, 158, [3, 3], 1, { ea: 0.85, r: 14, elw: 7, ls: 26 });
  txt('κ = μ₁₃ : one missing coordinate', 1320, 360, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('type = 1 + 45ᵇ − 44ᵇ', 1320, 470, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('F₂₈₄ = S(−294) ⊕ S(−292)⁸⁹', 1320, 580, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 环流控制 第三部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC CIRCULATION III·EDGE', W / 2, 890, { size: 60, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('缺 失 坐 标 · 一 条 共 享 边 · 末 端 模', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 127', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster127;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
