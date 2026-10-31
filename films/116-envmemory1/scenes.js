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

/* ---- film 116: AURIC ENVIRONMENT MEMORY I · same channel, six values or n bits ---- */
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
const _po116 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po116.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po116.set(key, off); }
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
const MU116 = [1, 2, 4, 6, 6, 6, 6, 6, 6, 6, 6];
const GROW116 = {"0": [1, 2, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6], "pi6": [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048], "pi4": [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]};
const MSTAR116 = [1, 2, 4, 8, 16, 32, 62, 118, 224, 424, 798];
const OVL116 = [0.00012, 0.00101, 0.00249, 0.00367, 0.00516, 0.00688, 0.0089, 0.01012, 0.01175, 0.01271, 0.01461, 0.01599, 0.01682, 0.0178, 0.01883, 0.0199, 0.02065, 0.02129, 0.02182, 0.02272, 0.02325, 0.02378, 0.02451, 0.02506, 0.02556, 0.02596, 0.02632, 0.02708, 0.02757, 0.02811, 0.02853, 0.02923, 0.02952, 0.03003, 0.03057, 0.03113, 0.03143, 0.03175, 0.03218, 0.03261, 0.03292, 0.03336, 0.03388, 0.03413, 0.03443, 0.03505, 0.03546, 0.03581, 0.03613, 0.03639, 0.03673, 0.03719, 0.03763, 0.03791, 0.0382, 0.03846, 0.03887, 0.03918, 0.03951, 0.03999, 0.04056, 0.04106, 0.04149, 0.04186, 0.04228, 0.04268, 0.04301, 0.04351, 0.04383, 0.04421, 0.04471, 0.04526, 0.04567, 0.04622, 0.04682, 0.04747, 0.04784, 0.04848, 0.04905, 0.04978, 0.05052, 0.05137, 0.05234, 0.05343, 0.05453, 0.05557, 0.05665, 0.05863, 0.05951, 0.06206, 0.06359, 0.0655, 0.06802, 0.07092, 0.07358, 0.07764, 0.08287, 0.09039, 0.10426, 0.13826];
const SIM116 = [0.16, 0.29289, 0.23051, 0.90627];
const APP116 = [[1, 0.01495, 0.015], [2, 0.02973, 0.03], [3, 0.04426, 0.045], [4, 0.05871, 0.06], [5, 0.07294, 0.075], [6, 0.08705, 0.09], [7, 0.10098, 0.105], [8, 0.11477, 0.12], [9, 0.1284, 0.135], [10, 0.14189, 0.15], [11, 0.15522, 0.165], [12, 0.16841, 0.18], [13, 0.18145, 0.195], [14, 0.19435, 0.21], [15, 0.20711, 0.225], [16, 0.21973, 0.24], [17, 0.23222, 0.255], [18, 0.24456, 0.27], [19, 0.25677, 0.285], [20, 0.26885, 0.3], [21, 0.2808, 0.315], [22, 0.29261, 0.33], [23, 0.3043, 0.345], [24, 0.31586, 0.36]];
const COR116 = [26, 0.09387, 0.09733];
const COMM116 = [9, 5, 2, 2, 2, 2];
const ORI116 = [[1, 0.0, 0.5], [2, 0.25, 0.5], [3, 0.375, 0.5], [4, 0.4375, 0.5], [5, 0.46875, 0.5], [6, 0.48438, 0.5], [7, 0.49219, 0.5], [8, 0.49609, 0.5], [9, 0.49805, 0.5], [10, 0.49902, 0.5]];
const Q0N2116 = [[0.0, 0.0], [0.025, 0.15612], [0.05, 0.21794], [0.075, 0.26339], [0.1, 0.3], [0.125, 0.33072], [0.15, 0.35707], [0.175, 0.37997], [0.2, 0.4], [0.225, 0.41758], [0.25, 0.43301], [0.275, 0.44651], [0.3, 0.45826], [0.325, 0.46837], [0.35, 0.47697], [0.375, 0.48412], [0.4, 0.4899], [0.425, 0.49434], [0.45, 0.49749], [0.475, 0.49937], [0.5, 0.5], [0.525, 0.49937], [0.55, 0.49749], [0.575, 0.49434], [0.6, 0.4899], [0.625, 0.48412], [0.65, 0.47697], [0.675, 0.46837], [0.7, 0.45826], [0.725, 0.44651], [0.75, 0.43301], [0.775, 0.41758], [0.8, 0.4], [0.825, 0.38125], [0.85, 0.3625], [0.875, 0.34375], [0.9, 0.325], [0.925, 0.30625], [0.95, 0.2875], [0.975, 0.26875], [1.0, 0.25]];
const S28116 = [["3", 0.0, 0.08], ["4", 0.0, 0.18868], ["5", 0.0, 0.23853], ["6", 0.0, 0.26244], ["7", 0.0, 0.27416], ["8", 0.0, 0.27996], ["9", 0.0, 0.28284], ["10", 0.0, 0.28428], ["inf", 0.0, 0.28571]];
/* ---- film 116 helpers ---- */
function ell116(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function bit116(k, s = 0) { return rnd(k, 116 + s) < 0.5 ? 0 : 1; }
/* a tape of label cells; n cells shown, the first k filled with bits */
function tape116(x, y, n, k, cw, a, seed = 0, col = C.cyan) {
  if (a <= 0) return;
  for (let i = 0; i < n; i++) {
    const on = i < k;
    box(x + i * cw, y, cw - 6, cw - 6, on ? col : C.dim, a * (on ? 1 : 0.4), 1.4, 'rgba(0,0,0,0.45)');
    if (on) lbl(String(bit116(i, seed)), x + i * cw + (cw - 6) / 2, y + (cw - 6) / 2 + 8, col, a, 20);
  }
}
/* five levels as a short ladder */
function ladder116(x, y, w, gap, a, labs, cols) {
  if (a <= 0) return;
  for (let i = 0; i < 5; i++) { const yy = y + i * gap; line(x, yy, x + w, yy, cols ? cols[i] : C.cyan, a, 2.5); lbl(labs[i], x - 16, yy + 7, C.white, a, 18, 'right'); }
}
/* a matrix of strings drawn as cells */
function mat116(x, y, rows, cw, ch, a, col, size = 18, colf) {
  if (a <= 0) return;
  rows.forEach((r, i) => r.forEach((s, j) => { const c = colf ? colf(s, i, j) : col; box(x + j * cw, y + i * ch, cw - 6, ch - 6, c, a, 1.4, 'rgba(0,0,0,0.45)'); lblG(s, x + j * cw + (cw - 6) / 2, y + i * ch + (ch - 6) / 2 + size * 0.36, c, a, size); }));
}
/* bracketed small matrix */
function brk116(x, y, w, h, col, a) {
  if (a <= 0) return;
  strokePoly([[x + 12, y], [x, y], [x, y + h], [x + 12, y + h]], col, a, 2.2, false);
  strokePoly([[x + w - 12, y], [x + w, y], [x + w, y + h], [x + w - 12, y + h]], col, a, 2.2, false);
}
function bend116(p, q, k, col, a, w = 2.6, head = true) {
  if (a <= 0) return;
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = q[0] - p[0], dy = q[1] - p[1];
  const cx = mx - dy * k, cy = my + dx * k;
  curve(s => [(1 - s) * (1 - s) * p[0] + 2 * (1 - s) * s * cx + s * s * q[0], (1 - s) * (1 - s) * p[1] + 2 * (1 - s) * s * cy + s * s * q[1]], 30, col, a, w);
  if (head) { const s = 0.97, x1 = (1 - s) * (1 - s) * p[0] + 2 * (1 - s) * s * cx + s * s * q[0], y1 = (1 - s) * (1 - s) * p[1] + 2 * (1 - s) * s * cy + s * s * q[1]; const an = Math.atan2(q[1] - y1, q[0] - x1), L = 13; line(q[0], q[1], q[0] - L * Math.cos(an - 0.45), q[1] - L * Math.sin(an - 0.45), col, a, w); line(q[0], q[1], q[0] - L * Math.cos(an + 0.45), q[1] - L * Math.sin(an + 0.45), col, a, w); }
}
/* the qutrit triangle u, v, z with the actual permutations */
function tri116(cx, cy, R, a, qa, qb, qw) {
  if (a <= 0) return null;
  const P = [[cx, cy - R], [cx - R * 0.87, cy + R * 0.5], [cx + R * 0.87, cy + R * 0.5]];
  strokePoly(P, C.dim, a * 0.5, 1.5);
  /* U0 : u fixed, v <-> z */
  bend116(P[1], P[2], 0.18, C.gold, a * qa, 3); bend116(P[2], P[1], 0.18, C.gold, a * qa, 3);
  ring(P[0][0], P[0][1] - 42, 14, C.gold, a * qa, 2.5);
  /* U1 : u -> z -> v -> u */
  bend116(P[0], P[2], -0.16, C.cyan, a * qb, 3); bend116(P[2], P[1], -0.16, C.cyan, a * qb, 3); bend116(P[1], P[0], -0.16, C.cyan, a * qb, 3);
  /* W : u <-> v */
  if (qw > 0) { ctx.save(); ctx.setLineDash([9, 8]); bend116(P[0], P[1], 0.3, C.mag, a * qw, 2.6); bend116(P[1], P[0], 0.3, C.mag, a * qw, 2.6); ctx.restore(); }
  ['u', 'v', 'z'].forEach((s, i) => { dot(P[i][0], P[i][1], 15, i === 0 ? 'g' : 'c', a); lbl(s, P[i][0] + (i === 0 ? 30 : i === 1 ? -30 : 30), P[i][1] + (i === 0 ? 8 : 34), C.white, a, 24); });
  return P;
}
function sphere116(cx, cy, R, a, t, qz, qy) {
  if (a <= 0) return;
  ring(cx, cy, R, C.cyan, a * 0.6, 2);
  ell116(cx, cy, R, R * 0.3, C.dim, a * 0.5, 1.4);
  ell116(cx, cy, R * 0.3, R, C.dim, a * 0.35, 1.2);
  arrow(cx, cy, cx, cy - R - 40, C.gold, a, 2.5); lbl('z', cx + 18, cy - R - 34, C.gold, a, 20, 'left');
  arrow(cx, cy, cx + R + 50, cy + 14, C.mag, a, 2.5); lbl('y', cx + R + 58, cy + 22, C.mag, a, 20, 'left');
  const k = 0.5 + 0.5 * Math.sin(t * 1.3);
  arcE116(cx, cy - R * 0.72, R * 0.42, R * 0.11, 0.3, 0.3 + 4.6 + 0.8 * k, C.gold, a * qz, 3.2);
  lbl('R_z(π/3)', cx - R * 0.5, cy - R * 0.92, C.gold, a * qz, 17, 'right');
  arcE116(cx + R * 0.74, cy + 8, R * 0.11, R * 0.42, -1.2, -1.2 + 4.6 + 0.8 * k, C.mag, a * qy, 3.2);
  lbl('R_y(2π/3)', cx + R * 0.95, cy + R * 0.62, C.mag, a * qy, 17, 'left');
}
function pax116(x0, y0, w, h, a, xl, yl) { line(x0, y0, x0 + w, y0, C.dim, a, 1.5); line(x0, y0, x0, y0 - h, C.dim, a, 1.5); if (xl) txt(xl, x0 + w, y0 + 56, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); if (yl) txt(yl, x0, y0 - h - 14, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.dim, a }); }
function arcE116(cx, cy, rx, ry, a0, a1, col, a, lw = 3) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, a0, a1); ctx.stroke(); ctx.restore();
  const x = cx + rx * Math.cos(a1), y = cy + ry * Math.sin(a1), dx = -rx * Math.sin(a1), dy = ry * Math.cos(a1), an = Math.atan2(dy, dx), L = 14;
  line(x, y, x - L * Math.cos(an - 0.45), y - L * Math.sin(an - 0.45), col, a, lw); line(x, y, x - L * Math.cos(an + 0.45), y - L * Math.sin(an + 0.45), col, a, lw);
}
/* simple log2 plot of counts */
function lplot116(px, py, pw, ph, nmax, ymax, a, xl, yl) { pax116(px, py, pw, ph, a, xl, yl); for (let n = 0; n <= nmax; n += (nmax > 12 ? 4 : 2)) lbl(String(n), px + n / nmax * pw, py + 24, C.dim, a, 14); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  box(150, 300, 300, 330, C.cyan, s0, 2, 'rgba(0,30,40,0.35)'); lbl('H = ℂ⁵', 300, 285, C.cyan, s0, 20);
  ladder116(220, 360, 200, 55, s0, ['e₀', 'e₁', 'e₂', 'e₃', 'e₄']);
  const ph = (u * 0.9) % 1;
  dot(220 + ((u * 160) % 200), 360 + 55 * (Math.floor(u * 0.8) % 5), 11, 'g', s0);
  arrow(470, 465, 590, 465, C.dim, s0, 2.5);
  dial64(690, 465, 70, 0.0, C.gold, s0, 'qubit E , measured');
  arrow(780, 465, 860, 465, C.dim, s0, 2.5);
  const k = Math.min(12, Math.floor(u * 0.9));
  tape116(150, 730, 12, k, 58, s0, 0, C.gold);
  lbl('labels h₁ h₂ h₃ …', 150, 712, C.gold, s0, 18, 'left');
  const items = [['every step leaves a label', 'ONE LABEL PER STEP', 'h = (h₁, …, hₙ) ∈ {0, 1}ⁿ', C.gold], ['must be kept to undo the channel exactly', 'HOW MUCH MUST BE KEPT ?', 'exact recovery on the qutrit , any reference', C.cyan], ['depends on how the environment is measured', 'THE MEASUREMENT DECIDES', 'same averaged channel , different records', C.mag]];
  items.forEach(([p, h, s, col], i) => { const q = Q(S, 0, p, 0.6); box(960, 240 + i * 190, 840, 150, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1380, 292 + i * 190, col, q, 22); lblG(s, 1380, 350 + i * 190, C.white, q, 25); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  dial64(W / 2 - 150, 420, 110, 0, C.gold, rp, 'basis f');
  dial64(W / 2 + 150, 420, 110, 0.5 + 0.12 * Math.sin(t * 0.9), C.mag, rp, 'basis g , rotated by θ');
  chip(330, 340, 330, 58, 'six values', C.gold, rp, 22); chip(330, 425, 330, 58, '2ⁿ values', C.mag, rp, 22); chip(330, 510, 330, 58, 'erased history', C.green, rp, 22);
  box(1350, 330, 470, 200, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one channel', 1585, 395, C.cyan, rp, 22); lblG('A₀XA₀† + A₁XA₁†', 1585, 450, C.white, rp, 22); lblG('= K₀XK₀† + K₁XK₁†', 1585, 492, C.white, rp, 22);
  txt(scramble('ENVIRONMENT MEMORY I', rp, 116), W / 2, 760, { size: 66, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 环 境 记 录 记 忆 第 一 部 · 同 一 信 道 、六 个 值 或 n 比 特 与 被 擦 除 的 历 史', W / 2, 835, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 116 · AURIC_FIB_ENVIRONMENT_RECORD_MEMORY · §§1–28', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 TWO INSTRUMENTS ---- */
SCENES.two = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On the embedded qutrit', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'At each step a five-level system', 0.6) * f1;
    box(150, 270, 250, 330, C.cyan, q, 2, 'rgba(0,30,40,0.35)'); lbl('H = ℂ⁵', 275, 255, C.cyan, q, 19);
    ladder116(215, 320, 150, 60, q, ['e₀', 'e₁', 'e₂', 'e₃', 'e₄']);
    const eq = Q(S, 0, 'meets a fresh qubit environment', 0.6) * f1;
    ring(520, 480, 46, C.white, eq, 2.5); lbl('f₀', 520, 488, C.white, eq, 22); lbl('fresh E = ℂ²', 520, 560, C.dim, eq, 16); line(520, 392, 520, 432, C.dim, eq, 2);
    box(430, 300, 180, 90, C.gold, eq, 2, 'rgba(40,30,0,0.4)'); lblG('isometry 𝒱', 520, 352, C.gold, eq, 20);
    arrow(405, 345, 428, 345, C.dim, eq, 2);
    const mq = Q(S, 0, 'Measure it in its own basis', 0.6) * f1;
    dial64(760, 330, 62, 0, C.gold, mq, 'f basis : K₀ , K₁');
    const rq = Q(S, 0, 'or in a basis rotated by theta', 0.6) * f1;
    dial64(760, 540, 62, 0.45 + 0.15 * Math.sin(t), C.mag, rq, 'g basis : A₀ , A₁');
    arrow(612, 345, 690, 335, C.dim, mq, 2); arrow(612, 380, 690, 520, C.dim, rq, 2);
    chip(1380, 255, 820, 54, '𝒱e₀ = u⊗f₀ ,  𝒱e₁ = u⊗f₁ ,  𝒱e₂ = v⊗(f₀+f₁)/√2', C.gold, eq, 20);
    chip(1380, 320, 820, 54, '𝒱e₃ = z⊗f₁ ,  𝒱e₄ = z⊗f₀', C.gold, eq, 20);
    lbl('u = (e₀ + e₃)/√2 ,  v = (e₁ + e₄)/√2 ,  z = e₂', 1380, 375, C.dim, eq, 16);
    chip(1380, 435, 820, 54, 'g₀ = c f₀ − i s f₁ ,  g₁ = −i s f₀ + c f₁', C.mag, rq, 21);
    lbl('c = cos θ , s = sin θ   ⇒   A₀ = cK₀ + isK₁ ,  A₁ = isK₀ + cK₁', 1380, 490, C.dim, rq, 16);
    const cq = Q(S, 0, 'the two averaged channels agree on every complex input', 0.6) * f1;
    chip(1380, 565, 820, 60, 'A₀XA₀† + A₁XA₁† = K₀XK₀† + K₁XK₁† = Φ∘(X)', C.green, cq, 22);
    lbl('cross terms : (−ics + ics) K₀XK₁† = 0', 1380, 625, C.dim, cq, 16);
    const zq = Q(S, 0, 'with any reference attached', 0.6) * f1;
    lbl('for every complex X ∈ M₅ ⊗ B(Z)', 1380, 660, C.white, zq, 18);
    stamp('SAME CHANNEL', 1380, 755, zq, C.green, 32, -0.04);
  }
  const q = Q(S, 1, 'On the embedded qutrit', 0.6, 0.3);
  if (q > 0) {
    lbl('R = span{u, v, z} = B ℂ³', 470, 260, C.cyan, q, 20);
    const pq = Q(S, 1, 'the permutations U zero and U one', 0.6), vq = Q(S, 1, 'with W a reflection', 0.6);
    tri116(470, 500, 170, q, pq, pq, vq);
    lbl('U₀ (gold) : v ↔ z', 200, 760, C.gold, pq, 18, 'left'); lbl('U₁ (cyan) : u → z → v → u', 470, 760, C.cyan, pq, 18, 'left');
    lbl('W (magenta, dashed) : u ↔ v', 200, 795, C.mag, vq, 18, 'left');
    const hq = Q(S, 1, 'each outcome has probability one half', 0.6);
    chip(1380, 270, 820, 58, 'K_j B = B U_j / √2 ,   A_j B = B V_j / √2', C.cyan, hq, 23);
    chip(1380, 345, 820, 54, 'B† A_j† A_j B = I₃ / 2   :  probability ½ on R', C.white, hq, 20);
    const xq = Q(S, 1, 'or V j equal to U j times e to the i theta W', 0.6);
    chip(1380, 440, 820, 60, 'V_j = U_j e^(iθW) ,   V₁ = V₀ W', C.mag, xq, 25);
    chip(1380, 515, 820, 54, 'W = U₀† U₁ ,  W† = W ,  W² = I₃', C.mag, vq, 22);
    lbl('V_j unitary : cI + isW = e^(iθW) (cross terms cancel)', 1380, 570, C.dim, vq, 16);
    const fq = Q(S, 1, 'with W a reflection', 0.6, 0.8);
    box(990, 610, 780, 150, C.orange, fq, 2, 'rgba(40,20,0,0.35)');
    lbl('on all of H the effects are not fair :', 1380, 650, C.orange, fq, 17);
    lbl('K₀†K₀ = diag(1, 0, ½, 0, 1) ,  K₁†K₁ = diag(0, 1, ½, 1, 0)', 1380, 695, C.white, fq, 18);
    lbl('fairness and recovery are asserted only on R', 1380, 735, C.dim, fq, 15);
  }
};

/* ---- 03 RECORD CRITERION AND SIX VALUES ---- */
const HIST116 = ['000', '001', '010', '011', '100', '101', '110', '111'];
const CLS116 = [0, 1, 2, 3, 1, 0, 4, 5];
const CLN116 = ['a', 'b', 'b²', 'b²a', 'ba', 'e'];
const CLC116 = [C.gold, C.cyan, C.mag, C.green, C.orange, C.white];
SCENES.record = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'In the native basis the words lie in S three', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A record is everything the decoder sees at the end', 0.6) * f1;
    lbl('8 histories , n = 3', 360, 255, C.dim, q, 17);
    HIST116.forEach((h, i) => { const y = 280 + i * 58; box(170, y, 120, 44, C.white, q, 1.5, 'rgba(0,0,0,0.45)'); lbl(h, 230, y + 30, C.white, q, 20); });
    const cq = Q(S, 0, 'each record value comes from histories with one projective word class', 0.6) * f1;
    CLN116.forEach((s, c) => { const y = 300 + c * 75; box(600, y, 150, 50, CLC116[c], q, 2, 'rgba(0,0,0,0.45)'); lbl('a = ' + (c + 1), 675, y + 32, CLC116[c], q, 18); lblG('[Q] = ' + s, 830, y + 32, CLC116[c], cq, 18, 'left'); });
    HIST116.forEach((h, i) => { const c = CLS116[i]; arrow(295, 302 + i * 58, 596, 325 + c * 75, CLC116[c], cq * 0.8, 1.8); });
    lbl('native letters , chronological product Q_h = U_h₃ U_h₂ U_h₁', 460, 790, C.dim, cq, 15);
    const eq = Q(S, 0, 'Exact recovery works if and only if', 0.6) * f1;
    chip(1420, 260, 760, 58, 'exact  ⇔  each record value a :', C.cyan, eq, 23);
    lbl('#{ [Q_h] : r(a | h) > 0 } = 1', 1420, 335, C.white, eq, 26);
    const rq = Q(S, 0, 'even with random compression and any decoder', 0.6) * f1;
    lbl('random compression r(a | h) · any CPTP decoder on all of H', 1420, 395, C.dim, rq, 16);
    lbl('success only on average · every reference', 1420, 422, C.dim, rq, 16);
    lbl('identity channel : rank-one Choi matrix ⇒ no branch may err', 1420, 460, C.gold, rq, 17);
    lbl('Knill–Laflamme cross terms  F_h† F_k = c I₃', 1420, 490, C.cyan, rq, 16);
    const mq = Q(S, 0, 'The minimum alphabet is the class count m n', 0.6) * f1;
    chip(1420, 570, 760, 62, 'min |alphabet| = m_n = #{ [Q_h] : |h| = n }', C.green, mq, 23);
    lbl('attained online : at most m_n values at every prefix', 1420, 635, C.white, mq, 17);
    lbl('decoder D = B Q† B† + (I₅ − P_R) , unitary on all of H', 1420, 665, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'In the native basis the words lie in S three', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 720, pw = 720, ph = 380, xS = n => px + 30 + n * (pw - 60) / 10, yS = v => py - v / 7 * ph;
    pax116(px, py, pw, ph, q, 'horizon n', 'm_n , native basis');
    const bq = Q(S, 1, 'one, two, four, then six classes', 0.6);
    MU116.forEach((v, n) => { const qq = clamp(bq * 1.7 - n / 14), x = xS(n) - 20; fillBox(x, yS(v), 40, py - yS(v), n < 3 ? C.cyan : C.gold, qq * 0.45); rect63(x, yS(v), 40, py - yS(v), n < 3 ? C.cyan : C.gold, qq, 1.5); lbl(String(v), x + 20, yS(v) - 10, C.white, qq, 17); lbl(String(n), x + 20, py + 24, C.dim, qq, 14); });
    lbl('computed : 1, 2, 4, 6, 6, 6, … (n ≤ 12)', px + pw / 2, py - ph - 30, C.dim, bq, 15);
    const tq = Q(S, 1, 'One six-value register with twelve fixed transitions', 0.6);
    const rows = [['e', 'a', 'b'], ['b', 'b²a', 'b²'], ['b²', 'ba', 'e'], ['a', 'e', 'ba'], ['ba', 'b²', 'b²a'], ['b²a', 'b', 'a']];
    lbl('g', 1145, 262, C.dim, tq, 17); lbl('on 0', 1305, 262, C.dim, tq, 17); lbl('on 1', 1465, 262, C.dim, tq, 17);
    mat116(1070, 275, rows, 160, 62, tq, C.gold, 21, (s, i, j) => j === 0 ? C.white : C.gold);
    lbl('a = U₀ = (23) ,  b = U₁ = (132) ,  g ← U_j g', 1310, 668, C.dim, tq, 16);
    const sq = Q(S, 1, 'and six is necessary', 0.6);
    stamp('SIX VALUES , EVERY HORIZON', 1310, 755, sq, C.gold, 28, -0.03);
  }
};

/* ---- 04 PARITY AT PI/6 ---- */
SCENES.parity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So all two to the n histories give different words', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Rotate by pi over six and nothing merges', 0.6) * f1;
    chip(530, 255, 800, 54, 'θ = π/6 ,  basis b₁ = (1, 0, −1) , b₂ = (0, 1, −1) on ξ⊥', C.white, q, 19);
    const mq = Q(S, 0, 'the scaled letters are integer matrices over Z of i root three', 0.6) * f1;
    lbl('P₀ = −2i V̂₀', 290, 335, C.gold, mq, 20); lbl('P₁ = −2i V̂₁', 690, 335, C.cyan, mq, 20);
    mat116(170, 355, [['−τ', '1'], ['τ − 1', 'τ − 1']], 125, 64, mq, C.gold, 21);
    mat116(570, 355, [['1', '−τ'], ['τ − 1', 'τ − 1']], 125, 64, mq, C.cyan, 21);
    lbl('τ = i√3 ,  τ² = −3', 530, 520, C.white, mq, 18);
    const dq = Q(S, 0, 'with determinants four and minus four', 0.6) * f1;
    lbl('det = 1 − τ² = 4', 290, 490, C.gold, dq, 17); lbl('det = τ² − 1 = −4', 690, 490, C.cyan, dq, 17);
    const rq = Q(S, 0, 'Reduce a plus b tau to a plus b modulo two', 0.6) * f1;
    chip(530, 585, 800, 56, 'φ : ℤ[τ] → 𝔽₂ ,  φ(a + bτ) = a + b mod 2 ,  a ring map', C.mag, rq, 20);
    arrow(300, 625, 450, 680, C.mag, rq, 2.5); arrow(700, 625, 560, 680, C.mag, rq, 2.5);
    const iq = Q(S, 0, 'both become one idempotent E', 0.6) * f1;
    mat116(445, 685, [['1', '1'], ['0', '0']], 90, 56, iq, C.green, 20);
    lbl('φ(P₀) = φ(P₁) = E ,  E² = E', 640, 735, C.green, iq, 18, 'left');
    const wq = Q(S, 0, 'and W times E is not E', 0.6) * f1;
    chip(1380, 300, 820, 58, 'φ(Ŵ) E = [[0, 0], [1, 1]] ≠ E', C.red, wq, 23);
    lbl('leftmost unequal letter :  P₀X = P₁Y = P₀ŴY  ⇒  X = ŴY', 1380, 390, C.white, wq, 18);
    lbl('reduce the integral tails :  E = φ(Ŵ) E  — impossible', 1380, 430, C.white, wq, 18);
    lbl('cancel over ℚ(τ) before reducing ; never invert modulo two', 1380, 470, C.dim, wq, 15);
    lbl('other lengths :  P(h) = (1 − τ)^(m − n) P(g) ,  φ(1 − τ) = 0  ⇒  E = 0', 1380, 530, C.white, wq, 17);
    stamp('NO TWO WORDS EQUAL', 1380, 640, wq, C.green, 32, -0.04);
    lbl('exact check : all 2ⁿ integral products distinct for n ≤ 12', 1380, 735, C.dim, wq, 15);
  }
  const q = Q(S, 1, 'So all two to the n histories give different words', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 720, pw = 720, ph = 420, xS = n => px + 20 + n * (pw - 40) / 11, yS = v => py - v / 11.5 * ph;
    pax116(px, py, pw, ph, q, 'horizon n', 'log₂ m_n');
    for (let n = 0; n <= 11; n++) lbl(String(n), xS(n), py + 24, C.dim, q, 14);
    const r6 = GROW116['0'], rr = GROW116['pi6'];
    curve(p => { const x = p * 11, i = Math.min(10, Math.floor(x)), f = x - i; return [xS(x), yS(Math.log2(r6[i]) * (1 - f) + Math.log2(r6[i + 1]) * f)]; }, 110, C.gold, q, 3);
    r6.forEach((v, n) => dot(xS(n), yS(Math.log2(v)), 7, 'g', q));
    const gq = Q(S, 1, 'even across lengths', 0.6);
    rr.forEach((v, n) => dot(xS(n), yS(Math.log2(v)), 7, 'm', clamp(gq * 1.6 - n / 14)));
    curve(p => [xS(p * 11), yS(p * 11)], 40, C.mag, gq, 3);
    lbl('θ = π/6 : 2ⁿ', xS(7.2), yS(8.4), C.mag, gq, 18, 'right'); lbl('θ = 0 : six', xS(10.5), yS(2.585) - 16, C.gold, q, 18, 'right');
    const eq = Q(S, 1, 'Exact recovery needs two to the n values, n bits and entropy n', 0.6);
    chip(1380, 260, 820, 58, 'min alphabet 2ⁿ · min bits n · min entropy n', C.mag, eq, 23);
    const sq = Q(S, 1, 'even with a free shared seed', 0.6);
    lbl('random summaries · any decoder on H · free independent seed', 1380, 320, C.dim, sq, 16);
    const rq = Q(S, 1, 'and a shift register attains it', 0.6);
    chip(1380, 390, 820, 54, 'shift register :  r_k = 2 r_(k−1) + h_k', C.cyan, rq, 22);
    const cq = Q(S, 1, 'The averaged channel is unchanged', 0.6);
    const rows = [['θ', 'n=0', '1', '2', 'n≥3'], ['0', '1', '2', '4', '6'], ['π/6', '1', '2', '4', '2ⁿ']];
    mat116(1030, 455, rows, 140, 58, cq, C.white, 20, (s, i, j) => i === 0 ? C.dim : i === 1 ? C.gold : C.mag);
    stamp('SAME CHANNEL , 6 OR 2ⁿ', 1380, 720, cq, C.mag, 30, -0.04);
  }
};

/* ---- 05 ANGLES ---- */
SCENES.angles = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'At rational angles it is a Radin–Sadun group', 'published'], [1, 'yet never free on its letters', 'theory']]);
  const f1 = 1 - Q(S, 1, 'At every other angle the counts grow strictly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now let theta vary', 0.6) * f1;
    const cx = 460, cy = 500, R = 210, th = 0.6 + 1.9 * (0.5 + 0.5 * Math.sin(t * 0.45));
    ring(cx, cy, R, C.cyan, q * 0.7, 2); line(cx - R - 40, cy, cx + R + 40, cy, C.dim, q * 0.6, 1.4); line(cx, cy - R - 40, cx, cy + R + 40, C.dim, q * 0.6, 1.4);
    const x = cx + R * Math.cos(th), y = cy - R * Math.sin(th);
    line(cx, cy, x, y, C.white, q, 2.5); dot(x, y, 10, 'c', q); dashed(x, y, x, cy, C.white, q * 0.6, 1.4);
    dot(x, cy, 8, 'm', q); lblG('cos θ', x, cy + 34, C.mag, q, 18);
    lblG('θ', cx + 46, cy - 16, C.white, q, 22);
    const bq = Q(S, 0, 'and stay bounded exactly at its multiples', 0.6) * f1;
    [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([a, b]) => { dot(cx + R * a, cy - R * b, 15, 'g', bq); ring(cx + R * a, cy - R * b, 24, C.gold, bq, 2.5); });
    lbl('bounded : θ ∈ (π/2)ℤ , counts 1, 2, 4, 6, 6, …', cx, cy + R + 70, C.gold, bq, 17);
    const sq = Q(S, 0, 'The counts are even, repeat with period pi over two', 0.6) * f1;
    chip(1380, 270, 820, 56, 'V_j(θ + π/2) = i V_(1−j)(θ) ,  V_j(−θ) = V_j(θ)*', C.cyan, sq, 21);
    lbl('m_n even , π/2-periodic ;  pairs equivalent ⇔ φ ≡ ±θ mod π/2', 1380, 325, C.dim, sq, 16);
    chip(1380, 400, 820, 58, 'sup_n m_n(θ) < ∞  ⇔  θ ∈ (π/2)ℤ', C.gold, bq, 25);
    const aq = Q(S, 0, 'bounded counts would make minus cos theta an algebraic integer', 0.6) * f1;
    lbl('finite projective group  ⇒  r t has finite order', 1380, 480, C.white, aq, 18);
    lbl('tr(r t) = −cos θ  is an algebraic integer', 1380, 515, C.white, aq, 18);
    lbl('every conjugate (η + η⁻¹)/2 lies in [−1, 1]', 1380, 550, C.dim, aq, 16);
    const fq = Q(S, 0, 'forcing cos theta to be zero or plus or minus one', 0.6) * f1;
    lbl('0 < |cos θ| < 1  ⇒  0 < |norm| < 1 , not an integer', 1380, 600, C.white, fq, 18);
    chip(1380, 670, 820, 58, 'cos θ ∈ {0, 1, −1}', C.green, fq, 26);
  }
  const q = Q(S, 1, 'At every other angle the counts grow strictly', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 820, 58, 'm_(n+1) > m_n  for all n ,   m_n ≥ n + 1', C.cyan, q, 23);
    lbl('a plateau would force a finite group H_θ = ⟨aᵏ W a⁻ᵏ⟩', 530, 325, C.dim, q, 15);
    const dq = Q(S, 1, 'the rotation group is dense in SO three', 0.6);
    sphere116(470, 560, 170, dq, t, dq, dq);
    lbl('d = R_z(2π/L) ,  r = R_y(2π/3)', 470, 800, C.white, dq, 17);
    chip(1380, 270, 820, 56, 'closure = SO(3) ,  not virtually solvable', C.green, dq, 22);
    const rq = Q(S, 1, 'At rational angles it is a Radin–Sadun group', 0.6);
    chip(1380, 360, 820, 58, 'θ/π = p/q , q > 2 :  G(L, 3) ≅ C_L ∗ D₃  over C₂', C.cyan, rq, 21);
    lbl('L = lcm(q, 2) ;  π/6 :  G(6, 3) ≅ C₆ ∗ D₃ over C₂', 1380, 418, C.white, rq, 17);
    lbl('Radin–Sadun , J. Algebra 202 (1998) , Thm 1(ii) , Cor 2', 1380, 450, C.dim, rq, 15);
    const fq = Q(S, 1, 'yet never free on its letters', 0.6);
    chip(1380, 540, 820, 60, 'V₀⁻¹ V₁ = W ≠ I ,   W² = I', C.mag, fq, 26);
    lbl('positive words never collide at π/6 , but (0⁻¹1)² is a relation', 1380, 600, C.dim, fq, 16);
    stamp('NOT FREE', 1380, 710, Q(S, 1, 'which squares to the identity', 0.6), C.mag, 34, -0.05);
  }
};

/* ---- 06 GROWTH AND THE COLLISION ---- */
SCENES.growth = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [0, 'Two to the n is exact when', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Not everywhere', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "By Breuillard's strong Tits alternative", 0.6) * f1;
    chip(W / 2, 260, 1500, 60, 'max{ n + 1 , βⁿ } ≤ m_n(θ) ≤ 2ⁿ   at every unbounded θ ,  one β > 1', C.cyan, q, 24);
    lbl('β = 1 + 1/(2N(2)) from Breuillard , A Strong Tits Alternative , arXiv:0804.1395 , Thm 1.1 ; N(2) is not specified numerically', W / 2, 320, C.dim, q, 15);
    const bq = Q(S, 0, 'one constant beta above one', 0.6) * f1;
    lbl('free pair in ≤ N letters  ⇒  |F₊ D| ≥ (1 + 1/2N) |D|  ⇒  m_n ≥ βⁿ', W / 2, 355, C.white, bq, 17);
    const eq = Q(S, 0, 'Two to the n is exact when i tan theta is transcendental', 0.6) * f1;
    box(150, 400, 760, 360, C.mag, eq, 2, 'rgba(40,0,40,0.3)');
    lbl('z = i tan θ ,   P₀ = Û₀ + z Û₁ ,  P₁ = P₀ Ŵ', 530, 445, C.mag, eq, 19);
    lbl('ring map ℤ[z] → 𝔽₂ ,  z ↦ 1  ⇒  same parity proof', 530, 485, C.white, eq, 17);
    const pq = Q(S, 0, 'or its polynomial is even at one', 0.6) * f1;
    lbl('exists  ⇔  z transcendental , or f(1) even', 530, 530, C.gold, pq, 18);
    const rows = [['θ', 'primitive f', 'f(1)'], ['π/3', 'X² + 3', '4'], ['π/4', 'X² + 1', '2'], ['π/5', 'X⁴ + 10X² + 5', '16'], ['π/6', '3X² + 1', '4']];
    const rq = Q(S, 0, 'so at every rational unbounded angle', 0.6) * f1;
    rows.forEach((r, i) => { const y = 570 + i * 38; [190, 330, 700].forEach((x, j) => lblG(r[j], x + (j === 1 ? 100 : 30), y, i === 0 ? C.dim : j === 2 ? C.gold : C.white, rq, 17)); });
    chip(1380, 470, 800, 60, 'θ/π ∈ ℚ ∖ ½ℤ  ⇒  m_n = 2ⁿ', C.green, rq, 26);
    lbl('F_q(X) = (1 − X)^φ(q) Φ_q((1 + X)/(1 − X)) : primitive part even at 1', 1380, 530, C.dim, rq, 15);
    lbl('recomputed : irreducible and even at 1 for q = 3 … 30 ;', 1380, 580, C.white, rq, 16);
    lbl('word counts 2ⁿ (n ≤ 11) at π/3, π/4, π/5, π/7, π/8, π/12', 1380, 608, C.white, rq, 16);
    lbl('60-digit counts 2ⁿ (n ≤ 10) at θ = 0.05 and θ = 1', 1380, 636, C.white, rq, 16);
  }
  const q = Q(S, 1, 'Not everywhere', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 820, 58, 'θ* = arcsin((√5 − 1)/2) ,  θ*/π irrational', C.white, q, 22);
    const cq = Q(S, 1, 'a to the fifth commutes with b', 0.6);
    lbl('tr(i a_T) = 2cos(2π/5)  ⇒  a_T⁵ = −i I ,  a⁵ b = b a⁵', 530, 330, C.gold, cq, 18);
    lbl('z* : X⁴ − X² − 1 ,  f(1) = −1 odd', 530, 365, C.dim, cq, 16);
    const hq = Q(S, 1, 'Two length-six histories collide', 0.6);
    cells64(220, 410, '100000', 58, hq, C.cyan, {}, 24); cells64(220, 490, '000001', 58, hq, C.cyan, {}, 24);
    lbl('=', 590, 478, C.white, hq, 34); lbl('a⁵b = ba⁵ , each probability 1/64', 640, 475, C.white, hq, 17, 'left');
    const px = 1040, py = 770, pw = 720, ph = 330, xS = n => px + 20 + (n - 1) * (pw - 40) / 9, yS = v => py - (v - 0.94) / 0.075 * ph;
    const pq = Q(S, 1, 'm six is at most sixty-three', 0.6);
    pax116(px, py, pw, ph, pq, 'n', 'log₂ m_n / n  at θ*');
    for (let n = 1; n <= 10; n++) lbl(String(n), xS(n), py + 24, C.dim, pq, 14);
    line(xS(1), yS(1), xS(10), yS(1), C.mag, pq, 2); lbl('rate 1 (collision-free)', xS(10), yS(1) - 12, C.mag, pq, 15, 'right');
    const bnd = Math.log2(63) / 6;
    dashed(xS(1), yS(bnd), xS(10), yS(bnd), C.red, pq, 1.8); lbl('log₂63 / 6 ≈ 0.996', xS(1.2), yS(bnd) + 22, C.red, pq, 15, 'left');
    MSTAR116.slice(1).forEach((m, i) => { const n = i + 1, qq = clamp(pq * 1.6 - n / 14); dot(xS(n), yS(Math.log2(m) / n), 8, n >= 6 ? 'o' : 'c', qq); });
    lbl('computed (60 digits) : m₆ = 62 , m₇ = 118 , m₁₀ = 798', px + pw, py - ph - 40, C.cyan, pq, 15, 'right');
    chip(530, 600, 820, 58, 'm₆(θ*) ≤ 63   ⇒   h₀(θ*) ≤ log₂63 / 6 < 1', C.orange, pq, 22);
    const rq = Q(S, 1, 'the growth rate falls below one bit per step', 0.6);
    lbl('h₀ = lim log₂ m_n / n = inf log₂ m_n / n', 530, 665, C.white, rq, 17);
    lbl('fixed-length bits :  min b_n = ⌈log₂ m_n⌉ at every angle', 530, 700, C.white, rq, 17);
    lbl('class entropy H(C₆) = 6 − 4/64 = 5.9375 < 6 (computed)', 530, 735, C.dim, rq, 15);
  }
};

/* ---- 07 SIMULATION ON FIVE LEVELS ---- */
SCENES.simulate = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'its exact value is open', 'open']]);
  const f1 = 1 - Q(S, 1, 'An explicit coin and measurement simulator', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'simulate the whole flagged instrument on all five levels', 0.6) * f1;
    chip(530, 260, 820, 58, 'J_θ(X) = Σ_j |j⟩⟨j| ⊗ A_j X A_j†  on all of M₅', C.white, q, 22);
    const mq = Q(S, 0, 'using only unitaries, projective measurements and classical feedback', 0.6) * f1;
    box(170, 400, 110, 70, C.cyan, mq, 2, 'rgba(0,30,40,0.4)'); lbl('U', 225, 445, C.cyan, mq, 24);
    box(330, 395, 130, 80, C.gold, mq, 2, 'rgba(40,30,0,0.4)'); lbl('PVM', 395, 443, C.gold, mq, 20);
    arrow(282, 435, 328, 435, C.dim, mq, 2);
    [0, 1, 2].forEach(i => { const y = 330 + i * 105; arrow(462, 435, 560, y + 35, C.gold, mq, 2); box(565, y, 100, 70, C.cyan, mq, 2, 'rgba(0,30,40,0.4)'); lbl('U' + (i + 1), 615, y + 45, C.cyan, mq, 20); arrow(668, y + 35, 730, y + 35, C.dim, mq, 2); chip(790, y + 35, 100, 52, 'flag ' + (i === 1 ? 1 : 0), C.mag, mq, 17); });
    lbl('coins · adaptive feedback · terminal coarsening', 470, 680, C.dim, mq, 16);
    const bq = Q(S, 0, 'Every such protocol misses by at least four over twenty-five in diamond norm', 0.6) * f1;
    chip(530, 755, 820, 60, '‖J_θ − T‖_◇ ≥ 4/25 = 0.16', C.red, bq, 28);
    lbl('earliest nontrivial PVM has a block of rank 1 or 2 :', 1380, 260, C.white, bq, 18);
    lbl('Schmidt weights (2/5, 2/5, 1/5)  ⇒  overlap ≤ 23/25', 1380, 295, C.gold, bq, 18);
    const px = 1010, py = 600, pw = 740, ph = 220, xS = v => px + v * pw;
    pax116(px, py, pw, ph, bq, 'witness overlap Tr(Π σ)', '');
    OVL116.forEach((v, i) => dot(xS(v), py - 30 - (i % 9) * 18, 5, 'c', clamp(bq * 1.6 - i / 120)));
    dashed(xS(23 / 25), py, xS(23 / 25), py - ph, C.red, bq, 2); lbl('23/25', xS(23 / 25), py + 26, C.red, bq, 16);
    dot(xS(1), py - ph / 2, 11, 'g', bq); lbl('target 1', xS(1) - 6, py - ph / 2 - 20, C.green, bq, 15, 'right');
    lbl('1500 random adaptive trees : max 0.231 (sampled)', px + 10, py - ph - 14, C.cyan, bq, 15, 'left');
    dot(xS(SIM116[3]), py - ph * 0.25, 10, 'm', bq); lbl('explicit simulator 0.906', xS(SIM116[3]) - 18, py - ph * 0.25 + 6, C.mag, bq, 15, 'right');
    [0, 0.5].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, bq, 14));
    const sq = Q(S, 0, 'at every angle, even with unbounded stopping times', 0.6) * f1;
    lbl('finite depth  ⊆  almost-sure stopping  ⊆  diamond closure : same bound', 1380, 690, C.white, sq, 17);
    lbl('A_j(θ) = K_j D_θ :  one initial unitary moves every angle to θ = 0', 1380, 725, C.dim, sq, 15);
  }
  const q = Q(S, 1, 'An explicit coin and measurement simulator', 0.6, 0.3);
  if (q > 0) {
    box(160, 380, 140, 90, C.white, q, 2, 'rgba(0,0,0,0.45)'); lbl('coin', 230, 432, C.white, q, 22);
    chip(510, 320, 300, 56, 'PVM { P + S , Q }', C.gold, q, 20); chip(510, 530, 300, 56, 'PVM { P , Q + S }', C.gold, q, 20);
    arrow(302, 410, 355, 330, C.dim, q, 2); arrow(302, 440, 355, 520, C.dim, q, 2);
    chip(850, 425, 250, 60, 'flag j : T_j', C.mag, q, 21);
    arrow(662, 330, 722, 410, C.dim, q, 2); arrow(662, 530, 722, 445, C.dim, q, 2);
    lbl('K_j = T_j (P_j + S/√2) ;  effects already exact : P_j + S/2', 530, 640, C.dim, q, 15);
    const eq = Q(S, 1, 'misses by exactly one minus one over root two', 0.6);
    chip(530, 700, 820, 58, '‖J_θ − T_θ‖_◇ = 1 − 1/√2 = 0.2929', C.cyan, eq, 24);
    const wq = Q(S, 1, 'attained by one state without a reference', 0.6);
    lbl('ψ* = (e₀ + e₁)/2 + e₂/√2', 530, 775, C.white, wq, 19);
    const nq = Q(S, 1, 'The best distance lies between point one six and point two nine', 0.6);
    const lx = 1030, lw = 720, ly = 470, xS = v => lx + v / 0.35 * lw;
    line(lx, ly, lx + lw, ly, C.dim, nq, 2);
    [0, 0.1, 0.2, 0.3].forEach(v => { line(xS(v), ly - 8, xS(v), ly + 8, C.dim, nq, 1.5); lbl(v.toFixed(1), xS(v), ly + 42, C.dim, nq, 15); });
    fillBox(xS(0.16), ly - 34, xS(0.2929) - xS(0.16), 48, C.vio, nq * 0.3); rect63(xS(0.16), ly - 34, xS(0.2929) - xS(0.16), 48, C.vio, nq, 2);
    lbl('4/25', xS(0.16), ly - 54, C.red, nq, 18); lbl('1 − 1/√2', xS(0.2929), ly - 54, C.cyan, nq, 18);
    dot(xS(SIM116[1]), ly, 10, 'c', Math.min(eq, nq));
    lblG('d* lies here', (xS(0.16) + xS(0.2929)) / 2, ly + 92, C.vio, nq, 20);
    lbl('SDP : ‖J₀ − T₀‖_◇ = 0.292893 (recomputed)', 1390, 300, C.cyan, eq, 16);
    lbl('d* is the same at every angle', 1390, 335, C.white, nq, 17);
    const oq = Q(S, 1, 'its exact value is open', 0.6);
    stamp('EXACT d* OPEN', 1390, 660, oq, C.vio, 32, -0.04);
  }
};

/* ---- 08 SMALLER TASKS AND EXTRA ROOM ---- */
SCENES.capacity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Extra room fixes the full task', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The smaller tasks are exact', 0.6) * f1;
    const tasks = [['outcome statistics', 'Tr(E_j(θ) ρ)', 'same effects D†(P_j + S/2)D', C.cyan, 'the outcome statistics'], ['averaged channel', 'PVM { H₊ , H₋ }', 'H± = (I ± F)/2 , ranks 3 and 2', C.gold, 'the averaged channel through a measurement'], ['encoded instrument', 'coin + B V_j B†', 'on R and every reference', C.green, 'and the instrument on the encoded qutrit'], ['full flagged instrument', '≥ 4/25 away', 'on five levels alone', C.red, 'The smaller tasks are exact']];
    tasks.forEach(([h, s1, s2, col, ph], i) => { const qq = Q(S, 0, ph, 0.6) * f1, x = 150 + i * 415; box(x, 250, 390, 260, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, x + 195, 295, col, qq, 20); lblG(s1, x + 195, 360, C.white, qq, 22); lbl(s2, x + 195, 405, C.dim, qq, 15); chip(x + 195, 465, 220, 44, i < 3 ? 'EXACT' : 'NOT EXACT', col, qq, 19); });
    const gq = Q(S, 0, 'the averaged channel through a measurement of the two halves of a reflection', 0.6) * f1;
    chip(W / 2, 590, 1300, 56, 'G± = (K₀ ± K₁)/√2 ,  G±†G± = H± ,  Σ U± H± X H± U±† = Φ∘(X)', C.gold, gq, 21);
    lbl('the new PVM outcome is not the instrument flag', W / 2, 645, C.dim, gq, 15);
    const nq = Q(S, 0, 'The channel is not unital, so it is no mixture of unitaries', 0.6) * f1;
    chip(W / 2, 720, 1300, 60, 'Φ∘(I₅) = 2|u⟩⟨u| + |v⟩⟨v| + 2|z⟩⟨z| ≠ I₅', C.orange, nq, 25);
    lbl('a mixture of unitary conjugations would be unital', W / 2, 780, C.dim, nq, 16);
  }
  const q = Q(S, 1, 'Extra room fixes the full task', 0.6, 0.3);
  if (q > 0) {
    const tq = Q(S, 1, 'A qubit ancilla, ten dimensions in all', 0.6);
    lbl('tensor : H ⊗ E₂', 400, 270, C.cyan, tq, 22);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) { const qq = clamp(tq * 1.6 - (i * 2 + j) / 14); box(270 + j * 140, 300 + i * 70, 120, 56, C.cyan, qq, 1.6, 'rgba(0,30,40,0.4)'); lbl('e' + i + ' ⊗ f' + j, 330 + j * 140, 336 + i * 70, C.white, qq, 16); }
    lbl('5 · 2 = 10 , minimum m = 2', 400, 690, C.cyan, tq, 20);
    lbl('prepare f₀ , joint unitary , measure g_j , discard', 400, 725, C.dim, tq, 15);
    const dq = Q(S, 1, 'One extra level, six in all, is the minimum as a direct sum', 0.6);
    lbl('direct sum : H ⊕ ℂ', 1000, 270, C.gold, dq, 22);
    for (let i = 0; i < 6; i++) { const qq = clamp(dq * 1.6 - i / 8); if (i < 5) box(930, 300 + i * 62, 140, 50, C.gold, qq, 1.6, 'rgba(40,30,0,0.4)'); else { ctx.save(); ctx.setLineDash([7, 6]); rect63(930, 300 + i * 62, 140, 50, C.gold, qq, 2); ctx.restore(); } lbl('h' + i, 1000, 333 + i * 62, C.white, qq, 18); }
    lbl('5 + 1 = 6 , minimum N = 6', 1000, 705, C.gold, dq, 20);
    const rq = Q(S, 1, 'and every output returns to the qutrit', 0.6);
    chip(1500, 320, 560, 56, 'Z_θ J = C₀A₀ + C₁A₁', C.gold, dq, 22);
    chip(1500, 400, 560, 56, 'R_j Γ_j Z_θ J = J A_j', C.green, rq, 24);
    lbl('output in J R ,  h₅ empty after feedback', 1500, 460, C.white, rq, 17);
    lbl('m = 1 or N = 5 is the five-level menu :', 1500, 540, C.dim, rq, 16);
    lbl('excluded by the 4/25 bound', 1500, 568, C.dim, rq, 16);
    stamp('6 VERSUS 10', 1500, 670, rq, C.gold, 32, -0.04);
  }
};

/* ---- 09 APPROXIMATE SIX-STATE RECOVERY ---- */
SCENES.approx = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The sign matters', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Back to records, now approximately', 0.6) * f1;
    chip(1380, 260, 820, 54, 'θ = kπ/2 + η ,   δ = |η| = dist(θ, (π/2)ℤ)', C.white, q, 21);
    const sq = Q(S, 0, 'keep only the six-valued permutation state', 0.6) * f1;
    chip(1380, 330, 820, 54, 'P_(t+1) = U_(h ⊕ ε) P_t ∈ S₃ :  6 values , 12 transitions', C.gold, sq, 20);
    const dq = Q(S, 0, 'and apply one signed terminal unitary', 0.6) * f1;
    chip(1380, 400, 820, 54, 'D = B (Y^η_(n, P))† B† + (I₅ − P_R)', C.cyan, dq, 22);
    lbl('Y = e^(inη) on ξ  ⊕  e^(iηH_c) P_T e^(−iηH_c) ,  H_c = diag(2/3, −2/3)', 1380, 455, C.dim, dq, 15);
    const bq = Q(S, 0, 'The averaged error is at most two n delta squared over three', 0.6) * f1;
    chip(1380, 535, 820, 62, '‖F_(n,θ) − ι‖_◇ ≤ min{ 2 , 2nδ²/3 }', C.green, bq, 26);
    lbl('local residual mixes to second order (Duhamel) ; errors add over n steps', 1380, 595, C.dim, bq, 15);
    const rq = Q(S, 0, 'for every reference', 0.6) * f1;
    lbl('exactly zero at δ = 0 , every horizon', 1380, 640, C.white, rq, 17);
    const px = 170, py = 740, pw = 760, ph = 430, xS = n => px + 20 + n * (pw - 40) / 24, yS = v => py - v / 0.42 * ph;
    pax116(px, py, pw, ph, q, 'horizon n', 'diamond error , η = 0.15');
    [0, 6, 12, 18, 24].forEach(n => lbl(String(n), xS(n), py + 24, C.dim, q, 14));
    [0.1, 0.2, 0.3, 0.4].forEach(v => lbl(v.toFixed(1), px - 10, yS(v) + 5, C.dim, q, 13, 'right'));
    curve(p => [xS(p * 24), yS(2 * p * 24 * 0.0225 / 3)], 30, C.red, bq, 2.5);
    lbl('bound 2nη²/3', xS(23), yS(0.36) - 16, C.red, bq, 16, 'right');
    APP116.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 6, 'g', clamp(bq * 1.6 - i / 30)));
    lbl('dots : SDP diamond norm of the actual averaged channel', px + 30, py - ph + 10, C.green, bq, 15, 'left');
  }
  const q = Q(S, 1, 'The sign matters', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 820, 58, 'decode with +d at angle −d :  error 4d + O(d²)', C.red, q, 22);
    lbl('witness (ξ + t₁)/√2 ;  recomputed ratio 4.0000 at d = 10⁻⁴', 530, 325, C.dim, q, 15);
    lbl('the sign is static calibration , not more history', 530, 360, C.white, q, 17);
    chip(530, 430, 820, 56, 'n = 1 :  error ≥ (3/2) sin²(2η/3) = (2/3)η² + O(η⁴)', C.gold, q, 20);
    lbl('coefficient 2/3 is sharp for this fixed gauge', 530, 485, C.dim, q, 15);
    const iq = Q(S, 1, 'At theta equal pi over twenty-six with ten steps', 0.6);
    chip(1380, 265, 820, 58, 'θ = π/26 ,  n = 10 ,  ε = 0.1', C.white, iq, 23);
    lbl('q > max{4, π√(2n/3ε)} = 25.65', 1380, 320, C.dim, iq, 15);
    const eq = Q(S, 1, 'exact recovery needs one thousand twenty-four values', 0.6);
    for (let i = 0; i < 1024; i++) { const qq = clamp(eq * 1.4 - i / 1400); fillBox(1000 + (i % 32) * 11, 370 + Math.floor(i / 32) * 11, 8, 8, C.mag, qq * 0.75); }
    lbl('exact : 2¹⁰ = 1024 values , 10 bits', 1176, 750, C.mag, eq, 18);
    const sq = Q(S, 1, 'while six states stay within one tenth', 0.6);
    for (let i = 0; i < 6; i++) { const x = 1460 + (i % 2) * 120, y = 375 + Math.floor(i / 2) * 102; box(x, y, 100, 90, C.gold, sq, 2, 'rgba(40,30,0,0.4)'); lbl(['e', 'a', 'b', 'b²', 'ba', 'b²a'][i], x + 50, y + 54, C.white, sq, 22); }
    lbl('6 states : error 0.0939 < 0.1 (SDP)', 1580, 728, C.gold, sq, 17);
    lbl('bound 2nδ²/3 = 0.0973', 1580, 758, C.dim, sq, 15);
    chip(530, 640, 820, 60, 'same instance :  exact 2ⁿ   versus   6 states within ε', C.green, sq, 22);
    lbl('valid for each finite n and ε , with the angle chosen for them', 530, 700, C.dim, sq, 15);
  }
};

/* ---- 10 ERASED HISTORY ---- */
SCENES.erase = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So for two or more steps the only nontrivial sharp question', 0.6);
  const pat = [[[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[1, 0, 1], [0, 1, 0], [1, 0, 1]], [[1, 0, 0], [0, 2, 0], [0, 0, 2]]];
  if (f1 > 0) {
    const q = Q(S, 0, 'Now erase the history and ask which observables one decoder can restore', 0.6) * f1;
    chip(W / 2, 255, 1400, 56, 'N(X) = Σ_h p_h Q_h X Q_h† ,  p full support ;  one qutrit decoder D , no labels', C.white, q, 21);
    lbl('correctable algebra = commutant { Q_h† Q_g }′  (Bény–Kempf–Kribs criterion) ; basis (ξ , t₁ , t₂)', W / 2, 310, C.dim, q, 15);
    const heads = [['n = 0', 'M₃', 'dim 9', 'all of M three with no step', C.cyan], ['n = 1', '{W}′ ≅ M₂ ⊕ ℂ', 'dim 5', 'the commutant of W after one step', C.gold], ['n ≥ 2', 'ℂP ⊕ ℂ(I − P)', 'dim 2', 'and from two steps on only the spectator line', C.mag]];
    heads.forEach(([h, alg, dm, ph, col], k) => {
      const qq = Q(S, 0, ph, 0.6) * f1, x0 = 230 + k * 540;
      lbl(h, x0 + 120, 365, col, qq, 22);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const v = pat[k][i][j]; const c = v === 2 ? C.white : col; box(x0 + j * 85, 390 + i * 85, 72, 72, v ? c : C.dim, qq * (v ? 1 : 0.35), 1.6, v ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.2)'); if (v) fillBox(x0 + j * 85, 390 + i * 85, 72, 72, c, qq * 0.25); }
      if (k === 2) lbl('one scalar on t₁ , t₂', x0 + 210, 680, C.white, qq, 15);
      lblG(alg, x0 + 120, 720, col, qq, 24); lbl(dm, x0 + 120, 760, C.dim, qq, 17);
    });
    lbl('decoders : id , Ad(a†) , id', W / 2, 800, C.dim, Q(S, 0, 'and its complement', 0.6) * f1, 16);
  }
  const q = Q(S, 1, 'So for two or more steps the only nontrivial sharp question', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 820, 60, 'n ≥ 2 :  E ∈ { 0 , I , P , I − P } ,  P = |ξ⟩⟨ξ|', C.mag, q, 23);
    lbl('the only nontrivial sharp question : is the qutrit in ξ ?', 530, 335, C.white, q, 18);
    const cx = 530, cy = 540;
    ring(cx, cy, 130, C.dim, q, 2); dot(cx, cy - 130, 16, 'm', q); lblG('ξ = (1, 1, 1)/√3', cx, cy - 160, C.mag, q, 20);
    lbl('every word fixes the line ℂξ', cx, cy + 175, C.dim, q, 16);
    const sq = Q(S, 1, 'Full support matters', 0.6);
    const rows = [['law on one history', 'M₃', 'dim 9', C.cyan], ['law on o , e₁ (relative W)', '{W}′', 'dim 5', C.gold], ['law on o , e₁ , e₂', 'ℂP ⊕ ℂ(I − P)', 'dim 2', C.mag]];
    rows.forEach(([a, b, c, col], i) => { const qq = clamp(sq * 1.5 - i / 4), y = 300 + i * 120; box(1010, y, 770, 96, col, qq, 2, 'rgba(0,0,0,0.45)'); lbl(a, 1040, y + 40, C.white, qq, 18, 'left'); lblG(b, 1740, y + 40, col, qq, 22, 'right'); lbl(c, 1740, y + 76, C.dim, qq, 15, 'right'); });
    const wq = Q(S, 1, 'still restores the whole commutant of W', 0.6);
    lbl('t id + (1 − t) Ad_W after undoing aⁿ ;  extra task v₊ = (ξ + t₂)/√2', 1395, 680, C.white, wq, 16);
    lbl('recomputed commutant dimensions 9 , 5 , 2 , 2 , 2 at four angles', 1395, 720, C.dim, wq, 15);
  }
};

/* ---- 11 QUANTITATIVE TASKS AND SCALAR OBSERVATIONS ---- */
SCENES.tasks = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Scalar observations are not enough', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With the fair law, a rank-one task has one-step error', 0.6) * f1;
    chip(1380, 260, 820, 54, 'E = |v⟩⟨v| ;  p , q , r = weights of v on ξ , e , f', C.white, q, 21);
    chip(1380, 330, 820, 58, 'η₁(E) = √(r(1 − r))', C.gold, q, 26);
    const fq = Q(S, 0, 'a floor that persists', 0.6) * f1;
    lbl('η_n(E) ≥ √(r(1 − r)) for every n ≥ 1 :  erased W-coherence', 1380, 390, C.white, fq, 17);
    const oq = Q(S, 0, 'two tasks with no spectator weight have errors one minus tau over two and one half', 0.6) * f1;
    chip(1380, 470, 820, 56, 'p = 0 :  η_n = ½ √(4qr + (|q − r| − τ)₊²) ,  τ = 2^(1−n)', C.cyan, oq, 19);
    lbl('v = e  →  (1 − τ)/2 ,     v = (e + f)/√2  →  1/2', 1380, 530, C.white, oq, 19);
    const tq = Q(S, 0, 'three eighths against one half at three steps', 0.6) * f1;
    stamp('3/8  vs  1/2', 1380, 640, tq, C.mag, 34, -0.04);
    lbl('same spectator weight p , different error', 1380, 720, C.dim, tq, 16);
    const px = 170, py = 740, pw = 760, ph = 440, xS = n => px + 20 + (n - 1) * (pw - 40) / 9, yS = v => py - v / 0.6 * ph;
    pax116(px, py, pw, ph, q, 'horizon n', 'optimal task error (SDP)');
    for (let n = 1; n <= 10; n++) lbl(String(n), xS(n), py + 24, C.dim, q, 14);
    [0.1, 0.2, 0.3, 0.4, 0.5].forEach(v => lbl(v.toFixed(1), px - 10, yS(v) + 5, C.dim, q, 13, 'right'));
    ORI116.forEach((r, i) => { dot(xS(r[0]), yS(r[2]), 8, 'c', clamp(oq * 1.6 - i / 14)); dot(xS(r[0]), yS(r[1]), 8, 'g', clamp(oq * 1.6 - i / 14)); });
    curve(p => { const n = 1 + p * 9; return [xS(n), yS((1 - Math.pow(0.5, n - 1)) / 2)]; }, 60, C.gold, oq, 2);
    lbl('v = (e + f)/√2 : 1/2', xS(1.3), yS(0.5) - 18, C.cyan, oq, 16, 'left'); lbl('v = e : (1 − τ)/2', xS(4.2), yS(0.36), C.gold, oq, 16, 'left');
    dot(xS(3), yS(0.375), 13, 'm', tq); lbl('3/8', xS(3) + 18, yS(0.375) + 28, C.mag, tq, 18, 'left');
  }
  const q = Q(S, 1, 'Scalar observations are not enough', 0.6, 0.3);
  if (q > 0) {
    const pq = Q(S, 1, 'A separable partner has the same marginals', 0.6);
    [['actual F^n', 'NPT Choi state', C.cyan], ['partner Ψ_n', 'separable , entanglement-breaking', C.gold]].forEach(([h, s, col], i) => { const x = 150 + i * 400, qq = i === 0 ? q : pq; box(x, 260, 370, 290, col, qq, 2, 'rgba(0,0,0,0.45)'); lbl(h, x + 185, 305, col, qq, 22); lbl(s, x + 185, 340, C.dim, qq, 15); lbl('marginals I/3', x + 185, 400, C.white, pq, 18); lbl('SIC norm (5 + 3τ)/36', x + 185, 440, C.white, pq, 18); lbl('MUB norm 5/3 + τ', x + 185, 480, C.white, pq, 18); lbl('τ = 2^(1−n)', x + 185, 520, C.dim, pq, 15); });
    lbl('Ψ_p(X) = Σ_j ⟨j|X|j⟩ (p P_j + (1 − p) I/3) ,  p_n = (1 + 3τ)/2', 535, 590, C.dim, pq, 15);
    lbl('recomputed with random local SIC and MUB frames , n = 3 , 4 , 6 , ∞', 535, 620, C.dim, pq, 15);
    const eq = Q(S, 1, 'yet the spectator task goes from zero error', 0.6);
    chip(535, 700, 780, 60, 'η_P(F^n) = 0 ,   η_P(Ψ_n) = 2(1 − 3τ)/(7 − 3τ)', C.green, eq, 22);
    const px = 1040, py = 740, pw = 720, ph = 420, xS = i => px + 40 + i * (pw - 80) / 8, yS = v => py - v / 0.32 * ph;
    pax116(px, py, pw, ph, eq, 'horizon n', 'spectator-task error (SDP)');
    S28116.forEach((r, i) => { const qq = clamp(eq * 1.6 - i / 12), x = xS(i), h = py - yS(r[2]); fillBox(x - 22, yS(r[2]), 44, h, C.gold, qq * 0.45); rect63(x - 22, yS(r[2]), 44, h, C.gold, qq, 1.5); dot(x, py - 6, 7, 'c', qq); lbl(r[0] === 'inf' ? '∞' : r[0], x, py + 24, C.dim, qq, 15); });
    const tq = Q(S, 1, 'to two over twenty-five at three steps', 0.6);
    lbl('2/25', xS(0), yS(S28116[0][2]) - 12, C.gold, tq, 17);
    const lq = Q(S, 1, 'and two sevenths in the limit', 0.6);
    lbl('2/7', xS(8), yS(S28116[8][2]) - 12, C.gold, lq, 17);
    lbl('gold bars : partner ;  cyan dots : actual channel , zero error', px + pw, py - ph - 40, C.dim, eq, 15, 'right');
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The rotation-group classification, the strong Tits alternative and the error-correction criteria are published inputs', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['CHANNEL', 'K or A(θ)', C.white, 'One channel, two measurements'], ['RECORD', '6 or 2ⁿ', C.gold, 'six values or every label'], ['PARITY', 'φ(P) = E', C.mag, 'a parity that separates all words'], ['ANGLES', 'θ ∈ (π/2)ℤ', C.cyan, 'a lattice of bounded angles'], ['SIMULATE', '4/25 ≤ d*', C.red, 'a gap of four over twenty-five'], ['SIX STATES', '2nδ²/3', C.green, 'six states that nearly suffice'], ['ERASED', 'ℂP ⊕ ℂ(I − P)', C.vio, 'an erased history that keeps only the spectator']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 205 + i * 251, q = Q(S, 0, ph) * fade; box(x - 115, 240, 230, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 290, col, q, 19); lblG(a2, x, 338, C.white, q, 19); });
    const pq = Q(S, 1, 'are published inputs') * fade;
    lbl('PUBLISHED · Radin–Sadun G(p, q) · Breuillard strong Tits alternative · Knill–Laflamme · Gregoratti–Werner · Bény–Kempf–Kribs', W / 2, 460, C.cyan, pq, 15);
    lbl('CLASSICAL · rank-one Choi extremality · Schmidt truncation · Duhamel and Taylor · Poisson correction · unitary mixing · EB channels', W / 2, 505, '#8fbcff', pq, 15);
    lbl('VOLUME · six-value register · ℤ[i√3] parity · bounded angles · rational maximality · 4/25 ≤ d* ≤ 1 − 1/√2 · 6 and 10 · 2nδ²/3 · erased algebra · task optima', W / 2, 550, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · exact ℤ[τ] words to n = 12 · 60-digit counts · collision at θ* · diamond and task SDPs · random protocols · SIC/MUB norms', W / 2, 595, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 680, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    dial64(W / 2 - 130, 400, 95, 0, C.gold, a, '');
    dial64(W / 2 + 130, 400, 95, 0.5 + 0.1 * Math.sin(t), C.mag, a, '');
    txt('ENVIRONMENT MEMORY I', W / 2, 640, { size: 58, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 环境记录记忆 第一部 · 同一信道、六个值或 n 比特与被擦除的历史 · TRURETURING FILM 116', W / 2, 710, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 780, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One dilation, two measurement bases, and a record that is either six values forever or every label.', W / 2, 840, { size: 27, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'ENVIRONMENT MEMORY I', two: 'ONE CHANNEL , TWO INSTRUMENTS', record: 'RECORD CRITERION', parity: 'PARITY AT π/6', angles: 'BOUNDED ANGLES', growth: 'GROWTH AND COLLISION', simulate: 'FIVE-LEVEL SIMULATION', capacity: 'EXTRA ROOM', approx: 'SIX STATES , APPROXIMATELY', erase: 'ERASED HISTORY', tasks: 'TASK OPTIMA', finale: 'LEDGER' });

function poster116() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  dial64(330, 470, 150, 0, C.gold, 1, '');
  dial64(700, 470, 150, 0.55, C.mag, 1, '');
  txt('same channel', 515, 700, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white });
  txt('θ = 0 :  1, 2, 4, 6, 6, 6, …', 1360, 360, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('θ = π/6 :  2ⁿ  (n bits)', 1360, 470, { size: 44, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('4/25 ≤ d* ≤ 1 − 1/√2', 1360, 580, { size: 42, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('AURIC 环境记录记忆 第一部', W / 2, 140, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ENVIRONMENT MEMORY I', W / 2, 890, { size: 66, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('同 一 信 道 · 六 个 值 或 n 比 特 · 被 擦 除 的 历 史', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 116', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster116;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
