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

/* ---- film 091: AURIC V21–V22 · static histories and observation quotients ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN DECLARATIONS · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · EXACT VALUE NOT DETERMINED', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po091 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po091.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po091.set(key, off); }
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
/* ---- film 091 data (from verify091.py / vis091.json) ---- */
const FIB091 = [[0.2, 0.3, 0.2, 0.3, 0.0], [0.35, 0.15, 0.2, 0.15, 0.15], [0.5, 0.0, 0.2, 0.0, 0.3]];
const GOLD091 = [0.381966, 0.145898, 0.236068, 0.485868];
const APPROX091 = [[0.0183, 0.0099], [0.8589, 0.3041], [0.0148, 0.0047], [0.0039, 0.0014], [1.9968, 0.4788], [0.2926, 0.1444], [1.4759, 0.3588], [0.2829, 0.1152], [0.0097, 0.0035], [0.0039, 0.0014], [0.0054, 0.0028], [0.412, 0.1627], [0.1509, 0.0443], [1.7888, 0.4721], [0.0066, 0.0041], [1.9981, 0.4929], [0.0124, 0.0046], [0.008, 0.0025], [0.014, 0.0047], [0.0913, 0.0594], [0.463, 0.2389], [0.0037, 0.0014], [1.9745, 0.4984], [0.6922, 0.2844], [0.2805, 0.1227], [1.3499, 0.4929], [0.006, 0.0009], [0.2941, 0.117], [0.0635, 0.018], [0.2607, 0.0726], [0.0036, 0.0014], [0.4748, 0.0608], [0.0513, 0.0164], [0.1601, 0.0348], [0.0624, 0.0296], [0.9448, 0.322], [0.0044, 0.0013], [1.8336, 0.4567], [0.0034, 0.0022], [0.0085, 0.0026], [0.0434, 0.0202], [1.9937, 0.5], [0.0069, 0.0031], [0.0095, 0.0046], [0.0041, 0.0012], [0.95, 0.5], [0.184, 0.0753], [0.0501, 0.0242], [1.9046, 0.4998], [0.488, 0.2041], [0.0169, 0.0079], [0.098, 0.0324], [0.025, 0.0106], [0.0609, 0.012], [0.1289, 0.0227], [1.9059, 0.4661], [1.5025, 0.4893], [1.9993, 0.4726], [0.0102, 0.0062], [0.6945, 0.2935], [1.2822, 0.4801], [0.5416, 0.3043], [1.9912, 0.4836], [0.5366, 0.2606], [0.0482, 0.0099], [1.3873, 0.4822], [0.005, 0.0016], [0.003, 0.0016], [0.0854, 0.0402], [0.9463, 0.1868], [1.7148, 0.4955], [0.0401, 0.0166], [0.5908, 0.2552], [1.998, 0.4791], [0.5334, 0.2529], [0.9983, 0.3553], [0.0293, 0.0081], [1.9811, 0.4544], [0.0083, 0.0033], [0.0026, 0.0008], [1.4769, 0.1468], [1.9988, 0.4983], [0.0943, 0.0455], [0.0974, 0.0469], [1.5283, 0.3145], [0.0078, 0.0028], [0.0734, 0.0232], [0.0392, 0.0202], [0.4978, 0.2434], [1.9504, 0.4346]];
const HPI091 = [0.1, 0.2, 0.3, 0.25, 0.15];
const HRES091 = [8.92615, 8.05585, 7.23018, 6.44915, 5.71274, 5.02096, 4.37381, 3.7713, 3.21342, 2.70016, 2.23154, 1.80755, 1.42818, 1.09345, 0.80335, 0.55788, 0.35705, 0.20084, 0.08926, 0.02232, 0.0, 0.02232, 0.08926, 0.20084, 0.35705, 0.55788, 0.80335, 1.09345, 1.42818, 1.80755, 2.23154, 2.70016, 3.21342, 3.7713, 4.37381, 5.02096, 5.71274, 6.44915, 7.23018, 8.05585, 8.92615];
const UNIF091 = [1.0, 0.8944, 0.8165, 0.7559, 0.7071, 0.6667, 0.6325, 0.603, 0.5774, 0.5547, 0.5345, 0.5164, 0.5, 0.4851, 0.4714, 0.4588, 0.4472, 0.4364, 0.4264, 0.417, 0.4082, 0.4, 0.3922, 0.3849, 0.378, 0.3714, 0.3651, 0.3592, 0.3536, 0.3482, 0.343, 0.3381, 0.3333, 0.3288, 0.3244, 0.3203, 0.3162, 0.3123, 0.3086, 0.305, 0.3015, 0.2981, 0.2949, 0.2917, 0.2887, 0.2857, 0.2828, 0.2801, 0.2774, 0.2747, 0.2722, 0.2697, 0.2673, 0.2649, 0.2626, 0.2604, 0.2582, 0.2561, 0.254, 0.252, 0.25];
const CLK091 = {"K": [0.0, 3.8846, 3.6903, 1.9773, 3.3737, 3.4641, 3.3737, 1.9773, 3.6903, 3.8846, 0.0, 3.8846, 3.6903, 1.9773, 3.3737, 3.4641, 3.3737, 1.9773, 3.6903, 3.8846, 0.0], "SK": [0.0, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 12.7834, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545, 10.9545]};
const PHASE091 = [[0.0, 0.0, 0.0, 0.0], [0.0524, 0.00137, 0.00137, 0.00069], [0.1047, 0.00548, 0.00548, 0.00274], [0.1571, 0.01231, 0.01233, 0.00616], [0.2094, 0.02185, 0.02191, 0.01093], [0.2618, 0.03407, 0.03422, 0.01704], [0.3142, 0.04894, 0.04925, 0.02447], [0.3665, 0.06642, 0.06698, 0.03321], [0.4189, 0.08645, 0.08741, 0.04323], [0.4712, 0.10899, 0.11052, 0.0545], [0.5236, 0.13397, 0.1363, 0.06699], [0.576, 0.16133, 0.16472, 0.08066], [0.6283, 0.19098, 0.19577, 0.09549], [0.6807, 0.22285, 0.22943, 0.11143], [0.733, 0.25686, 0.26568, 0.12843], [0.7854, 0.29289, 0.30448, 0.14645], [0.8378, 0.33087, 0.34582, 0.16543], [0.8901, 0.37068, 0.38966, 0.18534], [0.9425, 0.41221, 0.43597, 0.20611], [0.9948, 0.45536, 0.48473, 0.22768], [1.0472, 0.5, 0.5359, 0.25], [1.0996, 0.54601, 0.58944, 0.273], [1.1519, 0.59326, 0.64532, 0.29663], [1.2043, 0.64163, 0.7035, 0.32082], [1.2566, 0.69098, 0.76393, 0.34549], [1.309, 0.74118, 0.82659, 0.37059], [1.3614, 0.79209, 0.89142, 0.39604], [1.4137, 0.84357, 0.95838, 0.42178], [1.4661, 0.89547, 1.02742, 0.44774], [1.5184, 0.94766, 1.0985, 0.47383], [1.5708, 1.0, 1.17157, 0.5], [1.6232, 1.05234, 1.24658, 0.52617], [1.6755, 1.10453, 1.32348, 0.55226], [1.7279, 1.15643, 1.40221, 0.57822], [1.7802, 1.20791, 1.48272, 0.60396], [1.8326, 1.25882, 1.56495, 0.62941], [1.885, 1.30902, 1.64886, 0.65451], [1.9373, 1.35837, 1.73438, 0.67918], [1.9897, 1.40674, 1.82144, 0.70337], [2.042, 1.45399, 1.91001, 0.727], [2.0944, 1.5, 2.0, 0.75], [2.1468, 1.54464, 2.09136, 0.77232], [2.1991, 1.58779, 2.18404, 0.79389], [2.2515, 1.62932, 2.27796, 0.81466], [2.3038, 1.66913, 2.37305, 0.83457], [2.3562, 1.70711, 2.46927, 0.85355], [2.4086, 1.74314, 2.56653, 0.87157], [2.4609, 1.77715, 2.66477, 0.88857], [2.5133, 1.80902, 2.76393, 0.90451], [2.5656, 1.83867, 2.86394, 0.91934], [2.618, 1.86603, 2.96472, 0.93301], [2.6704, 1.89101, 3.06622, 0.9455], [2.7227, 1.91355, 3.16835, 0.95677], [2.7751, 1.93358, 3.27106, 0.96679], [2.8274, 1.95106, 3.37426, 0.97553], [2.8798, 1.96593, 3.4779, 0.98296], [2.9322, 1.97815, 3.58189, 0.98907], [2.9845, 1.98769, 3.68616, 0.99384], [3.0369, 1.99452, 3.79066, 0.99726], [3.0892, 1.99863, 3.89529, 0.99931], [3.1416, 2.0, 4.0, 1.0]];
const CLO091 = {"native": [5, 6, 7, 7], "unitary": [5, 6, 7, 7], "full": [5, 17, 25, 25]};
const HELL091 = {"p": [0.5, 0.3, 0.2], "q": [0.2, 0.3, 0.5], "hell": 0.1351, "glob": 1.4222};
const PAIR091 = [1.0, 0.381966, 0.145898, 0.90983, 0.673762, 0.055728, 0.673762, 0.90983, 0.145898, 0.381966];
const BARG091 = [[-0.045085, 0.138757], [-0.045085, -0.138757]];
const FUT091 = {"pop": [0.618034, 0.0, 0.381966, 0.0, 0.0], "next_plus": [0.854102, 0.0, 0.145898, 0.0, 0.0], "next_minus": [0.0, 0.0, 1.0, 0.0, 0.0]};
const MPSNZ091 = [[1, 1, 0, 1], [1, 1, 1, 0], [0, 1, 0, 1], [1, 0, 1, 0]];
const NUM091 = {"approxMax": 0.665, "four": 0.2};
/* ---- film 091 helpers ---- */
const MD091 = [['0', [0, 0, 0], 'w', '000'], ['1', [1, 0, 0], 'c', '100'], ['2', [0, 0, 1], 'g', '010'], ['3', [0, 1, 0], 'm', '001'], ['13', [1, 1, 0], 'n', '101']];
const PE091 = [[0, 1], [1, 4], [4, 3], [3, 0], [2, 0], [2, 1], [2, 3], [2, 4]];
const PHI091 = (1 + Math.sqrt(5)) / 2;
function pyr091(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, o.tilt == null ? 0.38 : o.tilt), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MD091.map(m => W3(m[1]));
  if (o.fill) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * o.fill);
  PE091.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], o.ec || C.cyan, a * (o.ea == null ? 0.7 : o.ea), 2));
  MD091.forEach((m, k) => {
    const hl = o.hl === k;
    if (hl) ring(P[k][0], P[k][1], 26, C.gold, a, 3);
    dot(P[k][0], P[k][1], o.r || 13, m[2], a);
    if (o.lab !== false) lbl(o.bits ? m[3] : m[0], P[k][0] + (k === 2 ? 0 : 26), P[k][1] + (k === 2 ? -26 : 8), hl ? C.gold : C.white, a * (o.la == null ? 1 : o.la), o.ls || 19, k === 2 ? 'center' : 'left');
  });
  return P;
}
const cpt091 = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];
function plane091(cx, cy, r, a, re = 'Re', im = 'Im') {
  if (a <= 0) return;
  line(cx - r - 30, cy, cx + r + 30, cy, C.dim, a * 0.6, 1.2); line(cx, cy + r + 30, cx, cy - r - 30, C.dim, a * 0.6, 1.2);
  if (re) lbl(re, cx + r + 34, cy + 24, C.dim, a, 15, 'left'); if (im) lbl(im, cx + 10, cy - r - 30, C.dim, a, 15, 'left');
}
function vecArrow091(cx, cy, r, deg, col, a, lab, lx = 0, ly = 0, w = 3.5) {
  if (a <= 0) return;
  const p = cpt091(cx, cy, r, deg); arrow(cx, cy, p[0], p[1], col, a, w);
  if (lab) lblG(lab, p[0] + lx, p[1] + ly, col, a, 22);
}
function grid091(x, y, rows, cw, ch, a, colf, size = 18) {
  if (a <= 0) return;
  rows.forEach((row, i) => row.forEach((s, j) => { const col = colf ? colf(i, j, s) : C.gold; box(x + j * cw, y + i * ch, cw - 4, ch - 4, col, a, 1.4, 'rgba(0,0,0,0.45)'); lblG(String(s), x + j * cw + (cw - 4) / 2, y + i * ch + (ch - 4) / 2 + size * 0.36, col, a, size); }));
}
function bracket091(x, y, w, h, col, a) {
  if (a <= 0) return;
  strokePoly([[x + 10, y], [x, y], [x, y + h], [x + 10, y + h]], col, a, 2, false);
  strokePoly([[x + w - 10, y], [x + w, y], [x + w, y + h], [x + w - 10, y + h]], col, a, 2, false);
}
function barsG091(x0, y0, vals, bw, gap, hs, a, col, labs, vlab) {
  if (a <= 0) return;
  vals.forEach((v, i) => {
    const x = x0 + i * (bw + gap), h = v * hs;
    line(x - 4, y0, x + bw + 4, y0, C.dim, a, 1.2);
    if (h > 0.5) { fillBox(x, y0 - h, bw, h, col, a * 0.45); rect63(x, y0 - h, bw, h, col, a, 1.6); }
    if (vlab) lbl(vlab(v, i), x + bw / 2, y0 - h - 10, C.white, a, 15);
    if (labs) lbl(labs[i], x + bw / 2, y0 + 24, C.dim, a, 15);
  });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyr091(480, 500, 330, 0.6 + t * 0.2, s0, { fill: 0.1, bits: true });
  const items = [['puts observers, programs, records and clocks', 'V21 · ENDOGENOUS OBSERVERS', 'program B · record R · clock C · environment E', C.gold],
    ['inside one fixed quantum history', 'V21 · STATIC QUANTUM HISTORIES', 'Ω = Σ √π_t |t⟩ ⊗ U_t ψ', C.cyan],
    ['relations between gate histories', 'V22 · RELATIVE GATE HISTORIES', 'R = V†U ,  K(v, w) = ⟨ψ_v , ψ_w⟩', C.mag],
    ['which quotients still predict', 'V22 · OBSERVATION QUOTIENTS', 'keep what every legal successor can read', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 25); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr091(W / 2, 430, 320, 0.5 + t * 0.25, rp * 0.9, { fill: 0.12, lab: false });
  chip(330, 330, 340, 58, 'three readouts', C.gold, rp, 22); chip(330, 415, 340, 58, 'one golden gate', C.mag, rp, 22); chip(330, 500, 340, 58, 'relative gates', C.cyan, rp, 22);
  box(1420, 320, 380, 200, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('order gap · six numbers', 1610, 385, C.green, rp, 20); lblG('φ⁻³ · B = φ⁻⁴ω', 1610, 455, C.white, rp, 28);
  txt(scramble('AURIC V21–V22 · HISTORIES', rp, 491), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V21–V22 · 静 态 历 史 与 观 察 商', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 091 · AURIC_STATIC_QUANTUM_HISTORIES_ENDOGENOUS_OBSERVERS_AND_RELATIONAL_CLOCKS_V21 · AURIC_RELATIVE_GATE_HISTORIES_OBSERVATION_QUOTIENTS_AND_RECURSIVE_CLOSURE_V22', W / 2, 115, { size: 13, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
};

/* ---- 02 FIVE ATOMS (V21 §2) ---- */
SCENES.atoms = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'But three averages are not the state', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Three binary readouts on five modes', 0.6) * f1;
    chip(530, 255, 860, 58, 'N₁ = Π₁ + Π₁₃ ,  N₂ = Π₂ ,  N₃ = Π₃ + Π₁₃   on  H₅ = ℂ⁵', C.gold, q, 21);
    const aq = Q(S, 0, 'exactly five atoms', 0.6) * f1;
    const cols = [190, 300, 380, 460, 560], ty = 330, rh = 56;
    ['mode', 'N₁', 'N₂', 'N₃'].forEach((h, j) => lbl(h, cols[j] + 30, ty, C.dim, q, 17));
    lbl('atom E_s', cols[4], ty, C.dim, aq, 17, 'left');
    const E = ['I − x − y − z + xz', 'x − xz', 'y', 'z − xz', 'xz'];
    const rq = Q(S, 0, 'A complete three-bit record identifies the mode', 0.6) * f1;
    const hlk = Math.floor(u * 0.9) % 5;
    MD091.forEach((m, k) => {
      const y = ty + 20 + k * rh, n = [k === 1 || k === 4 ? 1 : 0, k === 2 ? 1 : 0, k === 3 || k === 4 ? 1 : 0];
      const hl = rq > 0 && k === hlk;
      if (hl) box(cols[0] - 10, y, 360 + 60, rh - 8, C.gold, rq, 2, 'rgba(60,45,0,0.35)');
      dot(cols[0] + 16, y + 22, 10, m[2], q); lbl(m[0], cols[0] + 46, y + 30, C.white, q, 19, 'left');
      n.forEach((b, j) => lbl(String(b), cols[j + 1] + 30, y + 30, b ? C.cyan : C.dim, q, 21));
      lblG('E_' + m[0] + ' = ' + E[k] + ' = Π_' + m[0], cols[4], y + 30, C.white, aq, 18, 'left');
    });
    lbl('record (n₁ n₂ n₃) ↦ unique mode', 380, ty + 20 + 5 * rh + 20, C.gold, rq, 16);
    const cq = Q(S, 0, 'commute', 0.6) * f1;
    chip(530, 700, 860, 54, '[Nᵢ, Nⱼ] = 0 ,  N₁N₂ = N₂N₃ = 0 ,  N₁N₃ = Π₁₃ ≠ 0', C.cyan, cq, 20);
    lbl('span{I, x, y, z, xz} ≅ ℂ⁵ : five commuting rank-one atoms', 530, 765, C.dim, aq, 16);
    const pq = Q(S, 0, 'span a square pyramid', 0.6) * f1;
    pyr091(1400, 470, 320, 0.55 + t * 0.18, Math.max(pq, q * 0.35), { fill: 0.12 * pq, bits: true, hl: rq > 0 ? hlk : -1, la: 1 });
    lbl('conv of the five response vectors (N₁, N₃, N₂)', 1400, 790, C.cyan, pq, 17);
    lbl('square pyramid , volume 1/3 (recomputed)', 1400, 818, C.dim, pq, 15);
  }
  const q = Q(S, 1, 'But three averages are not the state', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, 'X = Tr ρN₁ ,  Y = Tr ρN₃ ,  Z = Tr ρN₂ ,  R = 1 − Z', C.cyan, q, 21);
    const kq = Q(S, 1, 'leaves one hidden coupling kappa', 0.6);
    chip(530, 335, 860, 56, 'p_κ = (R − X − Y + κ ,  X − κ ,  Z ,  Y − κ ,  κ)', C.gold, kq, 22);
    const iq = Q(S, 1, 'between max of zero', 0.6);
    chip(530, 415, 860, 56, 'max(0, X + Y − R) ≤ κ ≤ min(X, Y) ,   κ = Tr(ρ N₁N₃)', C.mag, iq, 20);
    const cq = Q(S, 1, 'while coherence stays unseen', 0.6);
    const gx = 180, gy = 480, cw = 52;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const dg = i === j; box(gx + j * cw, gy + i * cw, cw - 5, cw - 5, dg ? C.cyan : C.dim, cq, 1.4, dg ? 'rgba(0,40,50,0.5)' : 'rgba(0,0,0,0.35)'); lblG(dg ? 'p' : '?', gx + j * cw + 23, gy + i * cw + 32, dg ? C.cyan : C.dim, cq, 18); }
    lbl('ρ in the mode basis', gx + 128, gy + 5 * cw + 26, C.dim, cq, 15);
    lbl('every diagonal reading', 660, 530, C.white, cq, 17); lbl('ignores ρ_st , s ≠ t', 660, 560, C.white, cq, 17);
    stamp('COHERENCE UNSEEN', 660, 660, cq, C.red, 21, -0.05);
    // fiber bars: kappa sweeps the interval [0, 0.3]
    const bq = Q(S, 1, 'leaves one hidden coupling kappa', 0.8);
    const kap = 0.15 + 0.15 * Math.sin((u - lineAt(S, 1).s) * 1.3);
    const fr = kap / 0.3, row = FIB091[0].map((v, i) => v * (1 - fr) + FIB091[2][i] * fr);
    const x0 = 1060, y0 = 690, hs = 640;
    plotAxes(x0 - 20, y0, 700, 360, bq, '', 'p_κ   (X = Y = 0.3 , Z = 0.2)');
    barsG091(x0, y0, row, 92, 44, hs, bq, C.gold, ['0', '1', '2', '3', '13'], v => v.toFixed(2));
    FIB091.forEach(r => r.forEach((v, i) => { const x = x0 + i * 136; line(x - 6, y0 - v * hs, x + 98, y0 - v * hs, C.cyan, bq * 0.35, 1.2); }));
    const sx = x0, sw = 620, sy = 760;
    line(sx, sy, sx + sw, sy, C.dim, bq, 2); lbl('κ = 0', sx, sy + 28, C.dim, bq, 15); lbl('0.3', sx + sw, sy + 28, C.dim, bq, 15);
    dot(sx + fr * sw, sy, 11, 'm', bq); lblG('κ = ' + kap.toFixed(2), sx + fr * sw, sy - 18, C.mag, bq, 18);
    lbl('thin lines : κ = 0 , 0.15 , 0.3', x0 + 650, y0 - 330, C.cyan, bq, 14, 'right');
  }
};

/* ---- 03 ORDER AND THE GOLDEN GATE (V21 §3) ---- */
SCENES.order = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'The native golden gate breaks this', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'exactly when two projections commute', 0.6) * f1;
    chip(W / 2, 255, 1300, 58, 'Tr(ρ PQP) = Tr(ρ QPQ) for every ρ   ⇔   PQP = QPQ   ⇔   [P, Q] = 0', C.gold, q, 22);
    const lq = Q(S, 0, 'provided the labelled records are kept', 0.6) * f1;
    lbl('Lüders branches  ρ ↦ PρP ,  (I − P)ρ(I − P) :  all labelled branch maps order-free  ⇔  commute', W / 2, 315, C.dim, lq, 16);
    const aq = Q(S, 0, 'Averages can hide order', 0.6) * f1;
    const rows = [['ρ', 'Δ_Z', 'Δ_X', 'I/2'], ['ρ', 'Δ_X', 'Δ_Z', 'I/2']];
    rows.forEach((r, k) => { const y = 400 + k * 110; r.forEach((s, i) => { const x = 180 + i * 190; chip(x, y, 130, 60, s, i === 3 ? C.green : i === 0 ? C.white : C.cyan, aq, 22); if (i < 3) arrow(x + 70, y, x + 118, y, C.dim, aq, 2); }); });
    lbl('averaged channels : both orders give I/2 for every input', 470, 600, C.green, aq, 16);
    const bq = Q(S, 0, 'yet affirmative records give one half versus one quarter', 0.6) * f1;
    const x0 = 1150, y0 = 720, hs = 560;
    plotAxes(x0 - 40, y0, 560, 340, bq, '', 'input |0⟩ : two affirmatives');
    barsG091(x0, y0, [0.5, 0.25], 150, 110, hs, bq, C.gold, ['Z+ then X+', 'X+ then Z+'], v => v === 0.5 ? '1/2' : '1/4');
    stamp('ORDER VISIBLE IN RECORDS', 470, 720, bq, C.gold, 24, -0.04);
  }
  const q = Q(S, 1, 'The native golden gate breaks this', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, 'K = ω[I + (ω − 1)P_φ] ,  ω = e^(3πi/5) ,  K¹⁰ = I', C.gold, q, 22);
    lbl('P_φ on the active sector (000, 010) :', 300, 345, C.dim, q, 16, 'left');
    bracket091(300, 365, 360, 120, C.gold, q);
    grid091(310, 372, [['φ⁻¹', 'φ^(−3/2)'], ['φ^(−3/2)', 'φ⁻²']], 170, 54, q, () => C.gold, 20);
    lbl('P_φ = 0 on 100 , 001 ;  P_φ = 1 on 101', 700, 430, C.dim, q, 15, 'left');
    const mq = Q(S, 1, 'the middle readout and its K conjugate', 0.6);
    chip(530, 545, 860, 54, 'P = N₂ = |010⟩⟨010| ,   Q = K†PK  (K, read P, then K⁹ = K†)', C.cyan, mq, 19);
    const oq = Q(S, 1, 'overlap by phi to the minus two', 0.6);
    chip(530, 625, 860, 54, 'Tr PQ = φ⁻² = ' + GOLD091[0].toFixed(3) + ' ,   ‖[P, Q]‖ = φ^(−3/2) = ' + GOLD091[3].toFixed(3), C.mag, oq, 20);
    // the two rays in their plane
    const cx = 1120, cy = 520, R = 160, ang = Math.acos(1 / PHI091) * 180 / Math.PI;
    plane091(cx, cy, R, oq * 0.7, '', '');
    vecArrow091(cx, cy, R, 0, C.cyan, mq, 'ran P', 10, 34);
    vecArrow091(cx, cy, R, ang, C.gold, oq, 'ran Q', 10, -8);
    const pp = cpt091(cx, cy, R * Math.cos(ang * Math.PI / 180), ang);
    dashed(cx + R, cy, pp[0], pp[1], C.white, oq * 0.7, 1.5);
    lbl('angle ' + ang.toFixed(1) + '°  (cos² = φ⁻²)', cx + 70, cy + 60, C.dim, oq, 15);
    const bq = Q(S, 1, 'from the middle mode the orders give', 0.6);
    const x0 = 1420, y0 = 720, hs = 700;
    plotAxes(x0 - 30, y0, 360, 330, bq, '', 'start |010⟩');
    barsG091(x0, y0, [GOLD091[0], GOLD091[1]], 120, 70, hs, bq, C.gold, ['P → Q', 'Q → P'], (v, i) => i ? 'φ⁻⁴' : 'φ⁻²');
    const gq = Q(S, 1, 'a gap of phi to the minus three', 0.6);
    dashed(x0 + 120, y0 - GOLD091[0] * hs, x0 + 320, y0 - GOLD091[0] * hs, C.red, gq, 1.6);
    line(x0 + 250, y0 - GOLD091[0] * hs, x0 + 250, y0 - GOLD091[1] * hs - 22, C.red, gq, 4);
    lblG('gap φ⁻³ = ' + GOLD091[2].toFixed(3), x0 + 250, y0 - GOLD091[0] * hs - 14, C.red, gq, 18);
    stamp('ORDER GAP φ⁻³', 530, 735, gq, C.red, 30, -0.04);
  }
};

/* ---- 04 BASIS AS A PROGRAM (V21 §4) ---- */
SCENES.program = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Distinct exact sharp programs', 'published']]);
  const f1 = 1 - Q(S, 1, 'Sharing matters even classically', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The basis can be a quantum program', 0.6) * f1;
    box(160, 300, 250, 140, C.gold, q, 2, 'rgba(40,30,0,0.4)'); lbl('B : program', 285, 345, C.gold, q, 20); lblG('Σ c_b |b⟩', 285, 400, C.white, q, 24);
    box(160, 480, 250, 140, C.cyan, q, 2, 'rgba(0,30,40,0.4)'); lbl('data H₅', 285, 525, C.cyan, q, 20); lblG('five modes', 285, 580, C.white, q, 20);
    const wq = Q(S, 0, 'Three readouts sharing one controlled unitary', 0.6) * f1;
    box(470, 300, 140, 320, C.mag, wq, 2.5, 'rgba(40,0,40,0.4)'); lblG('W', 540, 470, C.mag, wq, 40);
    arrow(410, 370, 465, 370, C.dim, wq, 2); arrow(410, 550, 465, 550, C.dim, wq, 2);
    ['Ñ₁', 'Ñ₂', 'Ñ₃'].forEach((s, i) => { chip(720, 340 + i * 100, 120, 60, s, C.green, wq, 22); arrow(612, 460, 655, 340 + i * 100, C.dim, wq, 1.6); });
    lblG('W = Σ_b |b⟩⟨b| ⊗ U_b ,   Ñᵢ = W (I ⊗ Nᵢ) W†', 470, 680, C.white, wq, 21);
    const cq = Q(S, 0, 'commute exactly', 0.6) * f1;
    chip(470, 745, 760, 54, '[Ñᵢ, Ñⱼ] = W (I ⊗ [Nᵢ, Nⱼ]) W† = 0', C.green, cq, 22);
    const eq = Q(S, 0, 'even with a coherent or entangled program', 0.6) * f1;
    lbl('recomputed : entangled program–data input , all 6 reading orders give one record law', 470, 805, C.dim, eq, 15);
    const pq = Q(S, 0, 'separately approximated bases', 0.6) * f1;
    const px = 1080, py = 780, pw = 680, ph = 330;
    const xS = x => px + (Math.log10(x) + 3) / 3.5 * pw, yS = y => py - (Math.log10(y) + 4) / 4.3 * ph;
    chip(1420, 330, 760, 54, 'independent Vᵢ :  ‖[VᵢNᵢVᵢ† , VⱼNⱼVⱼ†]‖ ≤ 4 ‖Vᵢ − Vⱼ‖', C.gold, pq, 19);
    plotAxes(px, py, pw, ph, pq, '‖Vᵢ − Vⱼ‖  (log)', 'commutator norm (log)');
    curve(p => { const x = Math.pow(10, -3 + p * (3 + Math.log10(0.5))); return [xS(x), yS(4 * x)]; }, 60, C.red, pq, 2.5);
    lbl('4 ‖Vᵢ − Vⱼ‖', xS(0.02), yS(0.08) - 14, C.red, pq, 16, 'right');
    APPROX091.forEach((r, i) => { const qq = clamp(pq * 1.6 - i / 120); dot(xS(Math.max(r[0], 0.001)), yS(Math.max(r[1], 0.0001)), 6, 'c', qq); });
    [0.001, 0.01, 0.1, 1].forEach(v => lbl(String(v), xS(v), py + 24, C.dim, pq, 13));
    lbl('300 random pairs : largest ratio ' + NUM091.approxMax, px + pw, py - 70, C.cyan, pq, 15, 'right');
    lbl('a shared V gives exactly 0', px + pw, py - 45, C.green, pq, 15, 'right');
  }
  const q = Q(S, 1, 'Sharing matters even classically', 0.6, 0.3);
  if (q > 0) {
    const mq = Q(S, 1, 'Measure a maximally mixed bit twice', 0.6);
    chip(530, 255, 860, 56, 'data ρ = I/2 ,  program : Z or X with probability 1/2', C.white, mq, 21);
    const rq = Q(S, 1, 'reusing the choice gives two affirmatives', 0.6);
    const dq = Q(S, 1, 'redrawing gives three eighths', 0.6);
    // reuse tree and redraw tree
    const tr = (x, y, labs, col, qq, top) => { if (qq <= 0) return; lbl(top, x, y - 14, col, qq, 18); labs.forEach((l, i) => { const sp = labs.length > 2 ? 390 : 300, xx = x - sp / 2 + i * (sp / (labs.length - 1)); line(x, y, xx, y + 90, col, qq * 0.7, 2); chip(xx, y + 115, 104, 46, l[0], col, qq, 18); lbl(l[1], xx, y + 162, C.white, qq, 16); }); };
    tr(290, 340, [['Z Z', '1/2'], ['X X', '1/2']], C.cyan, rq, 'reuse');
    tr(760, 340, [['Z Z', '1/2'], ['Z X', '1/4'], ['X Z', '1/4'], ['X X', '1/2']], C.gold, dq, 'redraw');
    lbl('½·½ + ½·½ = 1/2', 290, 560, C.cyan, rq, 18);
    lbl('½·½ + ½·¼ = 3/8', 760, 560, C.gold, dq, 18);
    const bx = 330, by = 790, hs = 300;
    barsG091(bx + 70, by, [0.5], 110, 0, hs, rq, C.cyan, null, () => '1/2');
    barsG091(bx + 390, by, [0.375], 110, 0, hs, dq, C.gold, null, () => '3/8');
    lbl('same one-step marginals , different records', 640, 830, C.dim, dq, 15);
    const oq = Q(S, 1, 'Distinct exact sharp programs must be orthogonal', 0.6);
    const cx = 1250, cy = 600, R = 200;
    plane091(cx, cy, R, oq * 0.6, '', '');
    vecArrow091(cx, cy, R, 0, C.cyan, oq, '|p⟩', 10, 34);
    vecArrow091(cx, cy, R, 90, C.mag, oq, '|q⟩', 18, 10);
    box(cx - 2, cy - 22, 22, 22, C.white, oq * 0.7, 1.2);
    chip(1450, 290, 680, 56, '⟨p|q⟩ = 0  for distinct exact sharp PVMs', C.green, oq, 21);
    lbl('same processor , pointer and labels ; no program-dependent post-processing', 1450, 345, C.dim, oq, 14);
    lbl('d_B-dimensional programs hold at most d_B of them', 1580, 520, C.white, oq, 16, 'center');
    lbl('Heinosaari–Tukiainen , arXiv:1412.0419 , Prop. 4', 1580, 560, C.cyan, oq, 14, 'center');
  }
};

/* ---- 05 STATIC HISTORIES AND RELATIONAL CLOCKS (V21 §5–§7) ---- */
SCENES.history = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Clocks relate readable records', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Keeping every record makes growth an isometry', 0.6) * f1;
    const nodes = [];
    for (let d = 0; d <= 3; d++) for (let k = 0; k < (1 << d); k++) nodes.push([d, k]);
    const pos = (d, k) => [160 + d * 130, 470 + (k + 0.5 - (1 << d) / 2) * (300 / (1 << d))];
    nodes.forEach(([d, k]) => { const qq = clamp(q * 1.6 - d * 0.3); if (d > 0) { const p0 = pos(d - 1, k >> 1), p1 = pos(d, k); line(p0[0], p0[1], p1[0], p1[1], C.cyan, qq * 0.7, 2); } const p = pos(d, k); dot(p[0], p[1], 9, d === 3 ? 'g' : 'c', qq); });
    lbl('|h⟩ records', 355, 290, C.cyan, q, 16);
    lblG('T(|h⟩ ⊗ ψ) = Σₐ |ha⟩ ⊗ M_(a|h) ψ ,  T†T = I', 420, 680, C.white, q, 20);
    const lq = Q(S, 0, 'a direct limit holds the recursion', 0.6) * f1;
    const ch = ['H₀', 'H₁', 'H₂', '⋯', 'H_∞'];
    ch.forEach((s, i) => { const x = 620 + i * 80; lblG(s, x, 400, i === 4 ? C.gold : C.white, lq, 22); if (i < 4) arrow(x + 22, 393, x + 52, 393, C.dim, lq, 2); });
    lblG('ι_(n+1) T_n = ι_n  ⇒  ι_n ψ_n = Ψ', 780, 455, C.gold, lq, 18);
    const sq = Q(S, 0, 'so change must come from different slice effects', 0.6) * f1;
    chip(480, 750, 800, 54, 'E_n = T_n† E_(n+1) T_n  ⇒  ⟨ψ_n, E_n ψ_n⟩ constant', C.mag, sq, 20);
    lbl('a fixed effect on a fixed Ψ cannot change by itself', 480, 805, C.dim, sq, 15);
    const wq = Q(S, 0, 'With clock weights pi sub t', 0.6) * f1;
    chip(1420, 255, 760, 54, 'Ω = Σ_t √π_t |t⟩ ⊗ U_t ψ ,  U_t = G_t ⋯ G₁', C.cyan, wq, 21);
    barsG091(1150, 470, HPI091, 70, 40, 500, wq, C.cyan, HPI091.map((v, i) => 't = ' + i), v => v.toFixed(2));
    lbl('clock probabilities π_t', 1150, 330, C.dim, wq, 15, 'left');
    const zq = Q(S, 0, 'history states are exactly the zeros of a propagation residual', 0.6) * f1;
    chip(1420, 545, 760, 54, 'ker H_π = im J_π ,  H_π = Σ a_t D_t† D_t ≥ 0', C.gold, zq, 21);
    const px = 1100, py = 790, pw = 640, ph = 170, xS = s => px + (s + 1) / 2 * pw, yS = v => py - v / 9 * ph;
    plotAxes(px, py, pw, ph, zq, 's', '⟨Ξ, H_π Ξ⟩ for Ξ = Ω + s δ');
    curve(p => [xS(-1 + 2 * p), yS(interp091(HRES091, -1 + 2 * p))], 80, C.gold, zq, 3);
    dot(xS(0), yS(0), 9, 'm', zq); lbl('Ω : residual 0', xS(0), py + 24, C.mag, zq, 15);
  }
  const q = Q(S, 1, 'Clocks relate readable records', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'A coarse clock leaves a mixture', 0.6);
    chip(530, 255, 860, 54, 'ρ_(S|s) = Σ_(f(t)=s) π_t |ψ_t⟩⟨ψ_t| / q_s :  pure ⇔ all ψ_t collinear', C.cyan, cq, 19);
    const gq = Q(S, 1, 'a global potential exists exactly when', 0.6);
    chip(530, 330, 860, 54, 'τ(v) − τ(u) = a_e on every edge  ⇔  every closed walk sums to 0', C.gold, gq, 19);
    const dq = Q(S, 1, 'which a diamond graph can violate', 0.6);
    const Pn = { r: [530, 760], a: [360, 590], b: [700, 590], v: [530, 420] };
    const E = [['r', 'a', '+1'], ['a', 'v', '+1'], ['r', 'b', '+1'], ['b', 'v', '+2']];
    E.forEach(([x, y, w], i) => { const A = Pn[x], B = Pn[y]; const col = i < 2 ? C.cyan : C.mag; arrow(A[0] + (B[0] - A[0]) * 0.15, A[1] + (B[1] - A[1]) * 0.15, A[0] + (B[0] - A[0]) * 0.82, A[1] + (B[1] - A[1]) * 0.82, col, dq, 3); lbl(w, (A[0] + B[0]) / 2 + (A[0] < B[0] === A[1] > B[1] ? -34 : 34) * (x === 'r' ? 1 : 1), (A[1] + B[1]) / 2 + 6, col, dq, 20); });
    Object.keys(Pn).forEach(k => { dot(Pn[k][0], Pn[k][1], 14, 'w', dq); lbl(k, Pn[k][0] + 24, Pn[k][1] + 6, C.white, dq, 18, 'left'); });
    lbl('r → a → v : 2      r → b → v : 3', 530, 400 - 10, C.white, dq, 16);
    stamp('NO GLOBAL CLOCK', 250, 800, dq, C.red, 22, -0.05);
    lbl('closed walk : 1 + 1 − 2 − 1 = −1', 810, 790, C.red, dq, 16);
    const kq = Q(S, 1, 'ten golden gates return to identity', 0.6);
    const px = 1080, py = 780, pw = 680, ph = 340, xS = n => px + 14 + n * (pw - 28) / 20, yS = v => py - v / 13.5 * ph;
    plotAxes(px, py, pw, ph, kq, 'n', '‖Gⁿ − I‖_F');
    CLK091.K.forEach((v, n) => { const x = xS(n) - 5; line(x, py, x, yS(v), C.gold, kq * 0.8, 3); dot(x, yS(v), 6, v < 1e-6 ? 'n' : 'g', kq); });
    const nq = Q(S, 1, 'but not on a counting clock', 0.6);
    CLK091.SK.forEach((v, n) => { const x = xS(n) + 5; line(x, py, x, yS(v), C.cyan, nq * 0.8, 3); dot(x, yS(v), 6, 'c', nq); });
    [0, 5, 10, 15].forEach(n => lbl(String(n), xS(n), py + 24, C.dim, kq, 14));
    lbl('gold : K ,  zero at n = 10 , 20', px + pw, py - ph - 40, C.gold, kq, 15, 'right');
    lbl('cyan : S ⊗ K on a 12-step clock , never I', px + pw, py - ph - 14, C.cyan, nq, 15, 'right');
    chip(1420, 280, 760, 54, 'K¹⁰ = I   but   (S ⊗ K)¹⁰ = S¹⁰ ⊗ I ≠ I', C.green, nq, 22);
  }
};
function interp091(arr, x) { const n = arr.length - 1, f = clamp((x + 1) / 2) * n, i = Math.min(Math.floor(f), n - 1), r = f - i; return arr[i] * (1 - r) + arr[i + 1] * r; }

/* ---- 06 RESIDUAL AND INTERFERENCE (V21 §8) ---- */
SCENES.paths = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A unit-length endpoint gives', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two prediction paths A and B to one endpoint', 0.6) * f1;
    chip(530, 255, 860, 54, 'E_ψ(z) = ‖z − Aψ‖² + ‖z − Bψ‖²', C.white, q, 23);
    const sx = 200, sy = 480, ex = 780;
    dot(sx, sy, 14, 'w', q); lblG('ψ', sx - 30, sy + 8, C.white, q, 24);
    curve(p => [sx + p * (ex - 40 - sx), sy - Math.sin(p * Math.PI) * 130 - p * 40], 40, C.gold, q, 3.5);
    curve(p => [sx + p * (ex - 40 - sx), sy + Math.sin(p * Math.PI) * 130 + p * 40], 40, C.mag, q, 3.5);
    lblG('A', 480, sy - 145, C.gold, q, 26); lblG('B', 480, sy + 165, C.mag, q, 26);
    dot(ex - 40, sy - 40, 12, 'g', q); lblG('Aψ', ex - 10, sy - 42, C.gold, q, 20, 'left');
    dot(ex - 40, sy + 40, 12, 'm', q); lblG('Bψ', ex - 10, sy + 48, C.mag, q, 20, 'left');
    const zq = Q(S, 0, 'the least squared residual over that endpoint', 0.6) * f1;
    dot(ex - 40, sy, 13, 'c', zq); lblG('z* = (A + B)ψ / 2', ex - 10, sy + 7, C.cyan, zq, 18, 'left');
    dashed(ex - 40, sy - 40, ex - 40, sy + 40, C.cyan, zq, 2);
    const gq = Q(S, 0, 'half their squared gap', 0.6) * f1;
    chip(530, 700, 900, 62, 'min E = ½‖(A − B)ψ‖² = 1 − Re⟨ψ, A†Bψ⟩ = 2p₋', C.green, gq, 24);
    lbl('recomputed on 100 random unitary pairs', 530, 760, C.dim, gq, 15);
    const iq = Q(S, 0, 'exactly twice the dark-port probability', 0.6) * f1;
    chip(1420, 270, 720, 56, '( |0⟩ Aψ + |1⟩ Bψ ) / √2', C.cyan, iq, 22);
    box(1300, 380, 240, 150, C.vio, iq, 2, 'rgba(20,10,40,0.45)'); lbl('read path', 1420, 440, C.vio, iq, 18); lblG('|±⟩ basis', 1420, 480, C.white, iq, 20);
    arrow(1420, 300, 1420, 375, C.dim, iq, 2);
    arrow(1360, 535, 1240, 640, C.gold, iq, 3); arrow(1480, 535, 1600, 640, C.mag, iq, 3);
    lblG('p₊ (bright)', 1220, 680, C.gold, iq, 20); lblG('p₋ (dark)', 1620, 680, C.mag, iq, 20);
    lblG('p₋ = ‖(A − B)ψ‖² / 4', 1620, 720, C.white, iq, 18);
    stamp('RESIDUAL = 2 × DARK PORT', 1420, 790, Q(S, 0, 'of an interferometer', 0.6) * f1, C.mag, 22, -0.04);
  }
  const q = Q(S, 1, 'A unit-length endpoint gives', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, '‖z‖ = 1 :   min E = 4 (1 − √(1 − p₋))', C.mag, q, 23);
    const pq = Q(S, 1, 'Paths differing by a global phase theta', 0.6);
    chip(530, 340, 860, 56, 'A = e^(iθ) B :  same data ray ,  p₋ = sin²(θ/2)', C.gold, pq, 22);
    lbl('phase references inside a control are physical', 530, 395, C.dim, pq, 15);
    const dq = Q(S, 1, 'a diamond of unit edges halves the residual', 0.6);
    const Pn = { r: [530, 780], m1: [380, 630], m2: [680, 630], e: [530, 480] };
    [['r', 'm1', C.gold], ['m1', 'e', C.gold], ['r', 'm2', C.mag], ['m2', 'e', C.mag]].forEach(([x, y, col]) => { const A = Pn[x], B = Pn[y]; arrow(A[0] + (B[0] - A[0]) * 0.13, A[1] + (B[1] - A[1]) * 0.13, A[0] + (B[0] - A[0]) * 0.85, A[1] + (B[1] - A[1]) * 0.85, col, dq, 3); lbl('1', (A[0] + B[0]) / 2 + (A[0] < B[0] ? 20 : -20) * (x === 'r' ? -1 : 1), (A[1] + B[1]) / 2, col, dq, 17); });
    Object.keys(Pn).forEach(k => dot(Pn[k][0], Pn[k][1], 12, k === 'r' ? 'w' : 'c', dq));
    lblG('ψ', Pn.r[0] + 22, Pn.r[1] + 8, C.white, dq, 20, 'left'); lbl('end', Pn.e[0] + 22, Pn.e[1] - 4, C.white, dq, 16, 'left');
    lblG('k_A = k_B = ½  ⇒  S_min = p₋', 900, 600, C.cyan, dq, 20);
    lbl('half of 2p₋', 900, 640, C.dim, dq, 15);
    const px = 1080, py = 770, pw = 680, ph = 440, xS = th => px + th / Math.PI * pw, yS = v => py - v / 4.2 * ph;
    const gq = Q(S, 1, 'p being sine squared of theta over two', 0.6);
    plotAxes(px, py, pw, ph, Math.max(q, gq), 'θ  (0 … π)', 'least residual ,  A = e^(iθ)B');
    curve(p => { const r = PHASE091[Math.round(p * 60)]; return [xS(r[0]), yS(r[1])]; }, 60, C.gold, Math.max(gq, q * 0.6), 3);
    lbl('2p₋ = 2 sin²(θ/2)', xS(Math.PI) - 6, yS(2) - 12, C.gold, Math.max(gq, q * 0.6), 15, 'right');
    curve(p => { const r = PHASE091[Math.round(p * 60)]; return [xS(r[0]), yS(r[2])]; }, 60, C.mag, q, 3);
    lbl('unit z : 4(1 − √(1 − p₋))', xS(Math.PI) - 6, yS(4) - 12, C.mag, q, 15, 'right');
    curve(p => { const r = PHASE091[Math.round(p * 60)]; return [xS(r[0]), yS(r[3])]; }, 60, C.cyan, dq, 3);
    lbl('unit diamond : p₋', xS(Math.PI) - 6, yS(1) + 26, C.cyan, dq, 15, 'right');
    [1, 2, 3, 4].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, q, 13, 'right'));
  }
};

/* ---- 07 SIX NUMBERS (V21 §9–§10) ---- */
SCENES.six = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Allowing every basis change', 0.6);
  const labs = ['0', '1', '2', '3', '13'];
  if (f1 > 0) {
    const q = Q(S, 0, 'How much must an observer remember', 0.6) * f1;
    const mq = Q(S, 0, 'With the native gate at one address', 0.6) * f1;
    chip(530, 255, 860, 54, 'menu : native K at one address , its powers , five-mode Lüders reading , feedback', C.gold, mq, 17);
    const cq = Q(S, 0, 'future effects close on seven dimensions', 0.6) * f1;
    const gx = 280, gy = 340, cw = 70;
    labs.forEach((l, i) => { lbl(l, gx - 26, gy + i * cw + 42, C.dim, q, 17); lbl(l, gx + i * cw + 33, gy - 12, C.dim, q, 17); });
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const dg = i === j, act = (i === 0 && j === 2) || (i === 2 && j === 0);
      const col = dg ? C.cyan : act ? C.gold : C.dim;
      const on = dg || act ? 1 : 0.35;
      box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, col, q * on, 1.5, dg || act ? (dg ? 'rgba(0,40,50,0.5)' : 'rgba(60,45,0,0.45)') : 'rgba(0,0,0,0.3)');
      if (cq > 0 && (dg || act)) lblG(dg ? 'Π' : (i === 0 ? 'ρ₀₂' : 'ρ₂₀'), gx + j * cw + 32, gy + i * cw + 41, col, cq, 17);
    }
    lbl('cyan : 5 populations   gold : one complex coherence', 455, gy + 5 * cw + 30, C.white, cq, 15);
    lblG('W_∞ = Herm(H₀,₂) ⊕ ℝΠ₁ ⊕ ℝΠ₃ ⊕ ℝΠ₁₃ ,  dim 7', 455, gy + 5 * cw + 70, C.gold, cq, 19);
    const bq = Q(S, 0, 'future effects close on seven dimensions', 0.8) * f1;
    barsG091(1120, 560, CLO091.native, 90, 50, 30, bq, C.cyan, ['W₀', 'W₁', 'W₂', 'W₃'], v => String(v));
    lbl('closure dimension , recomputed', 1325, 305, C.dim, bq, 15);
    const sq = Q(S, 0, 'so exactly six real numbers predict every allowed record', 0.6) * f1;
    chip(1420, 640, 740, 54, 'minimal affine summary = dim W_∞ − 1 = 6', C.green, sq, 21);
    const nq = Q(S, 0, 'X, Y, Z, kappa and one complex coherence', 0.6) * f1;
    ['X', 'Y', 'Z', 'κ', 'Re ρ₀₂', 'Im ρ₀₂'].forEach((s, i) => { const qq = clamp(nq * 1.6 - i * 0.12); chip(1095 + i * 128, 730, 116, 54, s, i < 4 ? C.cyan : C.gold, qq, s.length > 2 ? 17 : 22); });
    stamp('SIX NUMBERS', 1420, 820, nq, C.green, 24, -0.04);
  }
  const q = Q(S, 1, 'Allowing every basis change', 0.6, 0.3);
  if (q > 0) {
    chip(1420, 255, 760, 54, 'all basis changes :  W_∞ = Herm₅ ,  25 − 1 = 24', C.mag, q, 21);
    barsG091(1150, 650, CLO091.full, 90, 50, 13, q, C.mag, ['W₀', 'W₁', 'W₂', 'W₃'], v => String(v));
    lbl('random basis changes + mode reading , recomputed', 1420, 700, C.dim, q, 15);
    const kq = Q(S, 1, 'Since K to the tenth is one', 0.6);
    const cx = 380, cy = 480, R = 165;
    for (let n = 0; n < 10; n++) { const an = -Math.PI / 2 + TAU * n / 10, an2 = -Math.PI / 2 + TAU * (n + 1) / 10; const x = cx + R * Math.cos(an), y = cy + R * Math.sin(an); const qq = clamp(kq * 2 - n * 0.08); arrow(x, y, cx + R * Math.cos(an2) - 10 * Math.cos(an2 + Math.PI / 2), cy + R * Math.sin(an2) - 10 * Math.sin(an2 + Math.PI / 2), C.gold, qq * 0.8, 2); dot(x, y, 10, n === 0 ? 'm' : 'g', qq); lbl('K' + (n === 0 ? '⁰' : ['¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][n - 1]), cx + (R + 36) * Math.cos(an), cy + (R + 36) * Math.sin(an) + 6, C.white, qq, 15); }
    lblG('K¹⁰ = I', cx, cy + 8, C.gold, kq, 26);
    const dq = Q(S, 1, 'nothing decreases strictly under K', 0.6);
    lblG('L(Kψ) < L(ψ) ten times  ⇒  L(ψ) < L(ψ)', 700, 330, C.white, dq, 19, 'left');
    stamp('NO STRICT DESCENT', 860, 430, dq, C.red, 26, -0.05);
    const gq = Q(S, 1, 'gates that keep the three readings for every input are diagonal', 0.6);
    chip(530, 745, 860, 54, 'U†NᵢU = Nᵢ  ⇒  U diagonal  ⇒  never dense in SU(5)', C.cyan, gq, 21);
    lbl('recomputed : the commutant of N₁, N₂, N₃ is 5-dimensional', 530, 800, C.dim, gq, 15);
  }
};

/* ---- 08 RELATIVE GATES (V22 §2–§3) ---- */
SCENES.relative = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A common final frame cancels', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'compares a state history U with a basis history V', 0.6) * f1;
    const row = (y, a1, g, a2, col, qq) => { chip(220, y, 130, 60, a1, C.white, qq, 22); arrow(290, y, 350, y, C.dim, qq, 2); box(355, y - 40, 110, 80, col, qq, 2.5, 'rgba(0,0,0,0.5)'); lblG(g, 410, y + 10, col, qq, 30); arrow(470, y, 530, y, C.dim, qq, 2); chip(690, y, 300, 60, a2, col, qq, 20); };
    row(330, 'ρ₀', 'U', 'ρ_U = U ρ₀ U†', C.gold, q);
    row(450, 'Π_s', 'V', 'P_s(V) = V Π_s V†', C.cyan, q);
    const rq = Q(S, 0, 'Readouts depend only on the relative gate', 0.6) * f1;
    chip(530, 570, 860, 60, 'p_s = Tr[P_s(V) ρ_U] = Tr[Π_s R ρ₀ R†] ,   R = V†U', C.green, rq, 22);
    const sq = Q(S, 0, 'yet the seed stays', 0.6) * f1;
    lbl('ρ₀ stays in the formula : a vector cannot be divided out', 530, 630, C.dim, sq, 16);
    const pq = Q(S, 0, 'overlaps are seed-independent only when that gate is a phase', 0.6) * f1;
    chip(530, 720, 860, 56, 'f_R(Ω) = |⟨Ω, RΩ⟩|² constant in Ω  ⇔  R = e^(iθ) I', C.mag, pq, 21);
    const px = 1080, py = 740, pw = 680, ph = 330, xS = x => px + x / Math.PI * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, Math.max(sq, pq), 'seed Ω = cos s |0⟩ + sin s |1⟩ ,  s ∈ [0, π]', 'f_R(Ω)');
    curve(p => [xS(p * Math.PI), yS(Math.pow(Math.cos(2 * p * Math.PI), 2))], 120, C.gold, Math.max(sq, pq), 3);
    lbl('gold : R = Z , from 0 to 1', px + 110, yS(1) - 50, C.gold, Math.max(sq, pq), 16, 'left');
    line(xS(0), yS(1), xS(Math.PI), yS(1), C.green, pq, 3);
    lbl('green : R = e^(iθ) I , always 1', px + pw, yS(1) - 50, C.green, pq, 16, 'right');
    lbl('1', px - 10, yS(1) + 5, C.dim, pq, 14, 'right'); lbl('0', px - 10, yS(0) + 5, C.dim, pq, 14, 'right');
  }
  const q = Q(S, 1, 'A common final frame cancels', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, '(WV)†(WU) = V†U', C.green, q, 24);
    const oq = Q(S, 1, 'relative gates classify those orbits exactly', 0.6);
    chip(530, 330, 860, 56, 'G \\ (G × G) ≅ G ,   [(U, V)] ↦ V†U', C.cyan, oq, 22);
    const pq = Q(S, 1, 'A common past does not', 0.6);
    lbl('common past : (UW, VW)  ↦  R′ = W† R W', 530, 400, C.gold, pq, 18);
    const hq = Q(S, 1, 'one shared Hadamard turns overlap one into zero', 0.6);
    const pairs = [[230, 'U = Z , V = I , Ω = |0⟩', [[90, C.gold, 'Z|0⟩'], [90, C.cyan, '|0⟩']], 'overlap 1'], [700, 'with a shared H at the start', [[-45, C.gold, '|−⟩'], [45, C.cyan, '|+⟩']], 'overlap 0']];
    pairs.forEach(([cx, h, vs, res], k) => { const qq = k ? hq : pq, cy = 640, R = 110; plane091(cx, cy, R, qq * 0.6, '', ''); ring(cx, cy, R, C.dim, qq * 0.5, 1.2); vs.forEach(([d, col, l], i) => vecArrow091(cx, cy, R - (i ? 0 : 12), d, col, qq, l, k ? 14 : (i ? -50 : 14), k ? 10 : (i ? 4 : 4))); lbl(h, cx, 485, C.white, qq, 16); lbl(res, cx, 800, k ? C.red : C.green, qq, 20); });
    arrow(380, 640, 560, 640, C.dim, hq, 2);
    const aq = Q(S, 1, 'A fixed next step descends to the quotient', 0.6);
    chip(1420, 300, 760, 56, 'A = Z , B = I :  (I, I) ↦ Z ,  (H, H) ↦ HZH = X', C.white, aq, 20);
    lbl('both start at R = I ;  from |0⟩ :  p₀ = 1  versus  p₀ = 0', 1420, 360, C.dim, aq, 15);
    const zq = Q(S, 1, 'only when B dagger A is central', 0.6);
    chip(1420, 470, 760, 60, 'R′ = V†(B†A)V R  well defined  ⇔  B†A ∈ Z(G)', C.gold, zq, 21);
    lbl('for U(d) the centre is the scalar phases', 1420, 530, C.dim, zq, 15);
    stamp('CENTRAL ONLY', 1420, 650, zq, C.red, 30, -0.05);
    lbl('fixes : covariant controls W A W† , or the internal increment D = V†B†AV', 1420, 760, C.cyan, zq, 15);
  }
};

/* ---- 09 QUOTIENTS (V22 §4–§5) ---- */
SCENES.quotients = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Quotient the seed ray and the labelled basis', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A projection is a linear quotient', 0.6) * f1;
    chip(530, 255, 860, 56, 'H / ker P ≅ ran P ,   ‖[ψ]‖ = inf ‖ψ + η‖ = ‖Pψ‖', C.cyan, q, 21);
    const cq = Q(S, 0, 'conditioning forgets the rate', 0.6) * f1;
    const cx = 260, cy = 640, R = 190;
    plane091(cx, cy, R, cq * 0.6, '', '');
    vecArrow091(cx, cy, R, 90, C.cyan, cq, '|0⟩', 14, 10);
    vecArrow091(cx, cy, R, 45, C.gold, cq, '|+⟩', 14, 0);
    const pp = cpt091(cx, cy, R * Math.SQRT1_2, 90), qp = cpt091(cx, cy, R, 45);
    dashed(qp[0], qp[1], pp[0], pp[1], C.gold, cq, 2); dot(pp[0], pp[1], 9, 'g', cq);
    lbl('P = Π₀', cx + 40, cy + 40, C.dim, cq, 16, 'left');
    const bx = 560, by = 760;
    barsG091(bx, by, [1, 0.5], 110, 80, 300, cq, C.cyan, ['|0⟩', '|+⟩'], v => v === 1 ? '1' : '1/2');
    lbl('same post-state |0⟩ , different rates', 700, 400, C.white, cq, 16);
    const dq = Q(S, 0, 'Dephasing removes two off-diagonal units', 0.6) * f1;
    const mats = [['A = |0⟩⟨1|', [['0', '1'], ['0', '0']]], ['B = |1⟩⟨0|', [['0', '0'], ['1', '0']]], ['AB = Π₀', [['1', '0'], ['0', '0']]]];
    mats.forEach(([h, M], k) => { const x = 1060 + k * 250, y = 340; lblG(h, x + 95, y - 16, C.white, dq, 18); bracket091(x, y, 190, 130, C.cyan, dq); grid091(x + 10, y + 8, M, 86, 58, dq, () => C.cyan, 20); lblG('Δ = ' + (k < 2 ? '0' : 'Π₀ ≠ 0'), x + 95, y + 175, k < 2 ? C.dim : C.red, dq, 19); });
    const nq = Q(S, 0, 'but not their product', 0.6) * f1;
    stamp('KERNEL NOT AN IDEAL', 1420, 640, nq, C.red, 26, -0.04);
    lbl('dephasing is a vector-space quotient , not an algebra quotient', 1420, 730, C.dim, nq, 15);
    lbl('a common isometry J cancels ; L keeps all transition probabilities ⇔ L†L = cI', 1420, 770, C.dim, nq, 15);
  }
  const q = Q(S, 1, 'Quotient the seed ray and the labelled basis', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, 'T \\ U(d) / H_ψ₀  ≅  Δ_(d−1) ,   R ↦ ( |⟨s|R|ψ₀⟩|² )_s', C.cyan, q, 21);
    const sq = Q(S, 1, 'exactly the probability simplex remains', 0.6);
    const Tv = [[530, 360], [300, 740], [760, 740]];
    fillPoly(Tv, C.cyan, sq * 0.08); strokePoly(Tv, C.cyan, sq, 2.5);
    ['s = 0', 's = 1', 's = 2'].forEach((l, i) => lbl(l, Tv[i][0] + (i === 0 ? 0 : i === 1 ? -20 : 20), Tv[i][1] + (i === 0 ? -16 : 34), C.dim, sq, 16, i === 1 ? 'right' : i === 2 ? 'left' : 'center'));
    const bp = w => [w[0] * Tv[0][0] + w[1] * Tv[1][0] + w[2] * Tv[2][0], w[0] * Tv[0][1] + w[1] * Tv[1][1] + w[2] * Tv[2][1]];
    const P1 = bp(HELL091.p), Q1 = bp(HELL091.q);
    dot(P1[0], P1[1], 13, 'g', sq); lblG('p', P1[0] - 22, P1[1] + 6, C.gold, sq, 22);
    dot(Q1[0], Q1[1], 13, 'm', sq); lblG('q', Q1[0] + 20, Q1[1] + 6, C.mag, sq, 22);
    lbl('one point = one double-coset class', 530, 800, C.dim, sq, 15);
    const hq = Q(S, 1, 'Optimizing away column phases', 0.6);
    chip(1420, 255, 760, 56, 'min_D ‖z′ − Dz‖² = Σ(√q − √p)² = 2 − 2Σ√(pq)', C.gold, hq, 20);
    const bx = 1110, by = 560;
    barsG091(bx, by, HELL091.p, 50, 14, 300, hq, C.gold, ['p₀', 'p₁', 'p₂'], v => v.toFixed(1));
    barsG091(bx + 230, by, HELL091.q, 50, 14, 300, hq, C.mag, ['q₀', 'q₁', 'q₂'], v => v.toFixed(1));
    const gq = Q(S, 1, 'one global phase leaves more', 0.6);
    const rx = 1580, ry = 560, hs = 170;
    barsG091(rx - 40, ry, [HELL091.hell], 80, 0, hs, hq, C.cyan, ['diagonal D'], v => v.toFixed(4));
    barsG091(rx + 80, ry, [HELL091.glob], 80, 0, hs, gq, C.red, ['global phase'], v => v.toFixed(4));
    chip(1420, 680, 760, 54, 'one global phase :  2 − 2 |⟨z, z′⟩|  ≥  2 − 2Σ√(pq)', C.red, gq, 19);
    lbl('example : p = (.5, .3, .2) , q = (.2, .3, .5) with fixed sample phases', 1420, 740, C.dim, gq, 14);
    lbl('20 000 random phase choices never beat 0.1351 (recomputed)', 1420, 770, C.dim, gq, 14);
  }
};

/* ---- 10 KERNELS AND BARGMANN PHASES (V22 §6–§7) ---- */
SCENES.bargmann = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'a branching recursion needs every cross term conserved', 'theory'], [1, null, 'theory'], [1, 'a controlled cycle on three copies reads them', 'published']]);
  const f1 = 1 - Q(S, 1, 'Pairwise probabilities are not enough', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The overlap kernel of gate histories is positive', 0.6) * f1;
    chip(530, 255, 860, 56, 'K_ρ(v, w) = Tr(ρ U_v† U_w) ,   Σ c̄_v c_w K_ρ(v, w) = ‖A√ρ‖² ≥ 0', C.cyan, q, 19);
    const gx = 240, gy = 320, cw = 62, n = 6;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const m = i === j ? 1 : 0.25 + 0.6 * rnd(Math.min(i, j) * 7 + Math.max(i, j), 3); const ph = (j > i ? 1 : -1) * rnd(Math.min(i, j) * 5 + Math.max(i, j), 9) * 3; const x = gx + j * cw + cw / 2, y = gy + i * cw + cw / 2; ring(x, y, 26 * m, C.cyan, q * 0.8, 1.6); line(x, y, x + 24 * m * Math.cos(ph), y - 24 * m * Math.sin(ph), C.gold, q, 2); }
    lbl('illustrative kernel : modulus and phase of each overlap', gx + 186, gy + n * cw + 26, C.dim, q, 14);
    const hq = Q(S, 0, 'rebuilds the minimal Hilbert space up to unitary equivalence', 0.6) * f1;
    chip(530, 760, 860, 56, 'H_K = completion of ℂ[W] / N_K :  unique up to unitary', C.green, hq, 21);
    const cq = Q(S, 0, 'a branching recursion needs every cross term conserved', 0.6) * f1;
    chip(1420, 255, 760, 56, 'K(v, w) = Σ_o K₊(r_o v, r_o w)  for all pairs', C.gold, cq, 21);
    lbl('⇒  M_o ξ_w = ξ⁺_(r_o w) ,  Σ M_o†M_o = I ,  records isometric', 1420, 312, C.white, cq, 16);
    const nq = Q(S, 0, 'conserving each total is not enough', 0.6) * f1;
    const cx = 1200, cy = 600, R = 160;
    plane091(cx, cy, R, nq * 0.5, '', '');
    vecArrow091(cx, cy, R, 60, C.cyan, nq, 'ξ_a = ξ_b', 10, -6);
    const cx2 = 1580;
    plane091(cx2, cy, R, nq * 0.5, '', '');
    vecArrow091(cx2, cy, R, 90, C.cyan, nq, 'ξ⁺_a', 10, 4); vecArrow091(cx2, cy, R, 0, C.mag, nq, 'ξ⁺_b', -10, 34);
    arrow(1330, cy, 1450, cy, C.dim, nq, 2.5);
    lbl('each norm kept , zero relation ξ_a − ξ_b = 0 broken', 1400, 800, C.red, nq, 16);
  }
  const q = Q(S, 1, 'Pairwise probabilities are not enough', 0.6, 0.3);
  if (q > 0) {
    const sq = Q(S, 1, 'Seeds zero and two under powers of K', 0.6);
    chip(530, 255, 860, 56, 'ψ_j = Kʲ|s⟩ ,  s = 0 or 2 :  |⟨ψ_i, ψ_j⟩|² = |k_t(j − i)|²', C.white, sq, 20);
    const px = 170, py = 720, pw = 760, ph = 360, bw = 26;
    plotAxes(px, py, pw, ph, sq, 'j − i', 'pairwise probability');
    PAIR091.forEach((v, n) => { const qq = clamp(sq * 1.6 - n / 14), x = px + 20 + n * 72; fillBox(x, py - v * ph * 0.95, bw, v * ph * 0.95, C.cyan, qq * 0.45); rect63(x, py - v * ph * 0.95, bw, v * ph * 0.95, C.cyan, qq, 1.4); fillBox(x + bw + 4, py - v * ph * 0.95, bw, v * ph * 0.95, C.gold, qq * 0.45); rect63(x + bw + 4, py - v * ph * 0.95, bw, v * ph * 0.95, C.gold, qq, 1.4); lbl(String(n), x + bw, py + 24, C.dim, qq, 14); });
    lbl('cyan : seed |0⟩   gold : seed |2⟩   identical', px + pw / 2 + 60, py - ph - 34, C.white, sq, 15);
    const bq = Q(S, 1, 'yet their Bargmann invariants are', 0.6);
    const cx = 1400, cy = 545, sc = 1250;
    plane091(cx, cy, 200, bq, 'Re', 'Im');
    ring(cx, cy, Math.hypot(BARG091[0][0], BARG091[0][1]) * sc, C.dim, bq * 0.6, 1.2);
    const B2 = [cx + BARG091[0][0] * sc, cy - BARG091[0][1] * sc], B0 = [cx + BARG091[1][0] * sc, cy - BARG091[1][1] * sc];
    arrow(cx, cy, B2[0], B2[1], C.gold, bq, 3); dot(B2[0], B2[1], 12, 'g', bq);
    arrow(cx, cy, B0[0], B0[1], C.cyan, bq, 3); dot(B0[0], B0[1], 12, 'c', bq);
    lblG('seed |2⟩ : φ⁻⁴ω', B2[0] - 20, B2[1] - 22, C.gold, bq, 20, 'right');
    lblG('seed |0⟩ : φ⁻⁴ω̄', B0[0] - 20, B0[1] + 34, C.cyan, bq, 20, 'right');
    lbl('B = −0.0451 ± 0.1388 i', cx + 200, cy + 75, C.white, bq, 16, 'left');
    chip(1420, 255, 760, 54, 'B = K₀₁ K₁₂ K₂₀  (three histories ψ₀, ψ₁, ψ₂)', C.gold, bq, 20);
    const rq = Q(S, 1, 'a controlled cycle on three copies reads them', 0.6);
    chip(1420, 790, 760, 54, '|+⟩ controls x₀⊗x₁⊗x₂ ↦ x₁⊗x₂⊗x₀ :  ⟨X⟩ = Re B ,  ⟨Y⟩ = Im B', C.green, rq, 17);
  }
};

/* ---- 11 FUTURE CLOSURE (V22 §8–§9) ---- */
SCENES.future = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'the swap test effect', 'published']]);
  const f1 = 1 - Q(S, 1, 'The coarsest quotient that keeps current readings', 0.6);
  const ml = ['0', '1', '2', '3', '13'];
  if (f1 > 0) {
    const q = Q(S, 0, 'From seed two', 0.6) * f1;
    chip(W / 2, 255, 1200, 56, 'ψ₊ = K|2⟩ ,   ψ₋ = K⁹|2⟩ = K†|2⟩   (both legal native histories)', C.white, q, 21);
    const iq = Q(S, 0, 'give identical populations', 0.6) * f1;
    const nq = Q(S, 0, 'yet one more K', 0.6) * f1;
    const sets = [[FUT091.pop, 'ψ₊ now = (0.618 , 0 , 0.382 , 0 , 0)', C.gold, 180, 500, iq], [FUT091.pop, 'ψ₋ now = (0.618 , 0 , 0.382 , 0 , 0)', C.cyan, 180, 780, iq], [FUT091.next_plus, 'K ψ₊ : middle φ⁻⁴ = 0.146', C.gold, 1080, 500, nq], [FUT091.next_minus, 'K ψ₋ = K¹⁰|2⟩ : middle 1', C.cyan, 1080, 780, nq]];
    sets.forEach(([v, h, col, x, y, qq]) => { barsG091(x, y, v, 80, 36, 160, qq, col, ml, x > 600 && v[2] > 0 ? ((vv, i) => i === 2 ? (vv > 0.99 ? '1' : 'φ⁻⁴') : '') : ((vv, i) => i === 0 ? 'φ⁻¹' : i === 2 ? 'φ⁻²' : '')); lbl(h, x, y - 188, col, qq, 18, 'left'); });
    arrow(800, 430, 1040, 430, C.gold, nq, 3); lbl('K', 920, 415, C.gold, nq, 22);
    arrow(800, 710, 1040, 710, C.cyan, nq, 3); lbl('K', 920, 695, C.cyan, nq, 22);
    const sq = Q(S, 0, 'in one history and one in the other', 0.6) * f1;
    stamp('SAME NOW , DIFFERENT NEXT', 920, 560, sq, C.red, 20, -0.03);
  }
  const q = Q(S, 1, 'The coarsest quotient that keeps current readings', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, 'ρ ~∞ σ  ⇔  Tr[(ρ − σ)A] = 0  for all A ∈ W_∞', C.cyan, q, 21);
    lblG('W_∞ = span{ U_h† E U_h : E current , h legal word }', 530, 320, C.white, q, 18);
    const cq = Q(S, 1, 'is the future-effect closure', 0.6);
    barsG091(240, 640, CLO091.unitary, 90, 50, 34, cq, C.cyan, ['W₀', 'W₁', 'W₂', 'W₃'], v => String(v));
    lbl('menu {K} , current Π_s', 760, 450, C.dim, cq, 15, 'left');
    lbl('separates ψ₊ and ψ₋', 760, 500, C.green, cq, 17, 'left');
    lbl('the current Π_s do not', 760, 530, C.dim, cq, 15, 'left');
    lbl('coarsest relation kept by every legal successor', 530, 720, C.white, cq, 17);
    const pq = Q(S, 1, 'One sample of a basis state is only an overlap probe', 0.6);
    const x0 = 1110, ys = [380, 480, 580];
    ['|0⟩', 'σ', 'ρ'].forEach((l, i) => { lblG(l, x0 - 20, ys[i] + 8, i ? C.white : C.gold, pq, 22, 'right'); line(x0, ys[i], x0 + 600, ys[i], C.dim, pq, 2); });
    [x0 + 60, x0 + 380].forEach(x => { box(x, ys[0] - 26, 52, 52, C.gold, pq, 2, 'rgba(0,0,0,0.6)'); lbl('H', x + 26, ys[0] + 8, C.gold, pq, 20); });
    const sx = x0 + 230; dot(sx, ys[0], 9, 'g', pq); line(sx, ys[0], sx, ys[2], C.gold, pq, 2);
    [ys[1], ys[2]].forEach(y => { line(sx - 12, y - 12, sx + 12, y + 12, C.gold, pq, 3); line(sx - 12, y + 12, sx + 12, y - 12, C.gold, pq, 3); });
    box(x0 + 520, ys[0] - 26, 70, 52, C.white, pq, 2, 'rgba(0,0,0,0.6)'); lbl('read', x0 + 555, ys[0] + 7, C.white, pq, 15);
    chip(1420, 680, 720, 54, 'p₊ = (1 + Tr σρ) / 2', C.cyan, pq, 22);
    const eq = Q(S, 1, 'the swap test effect is identity plus sigma over two', 0.6);
    chip(1420, 760, 720, 54, 'E₊ = (I + σ)/2 :  eigenvalues 1 , ½ , ½ , not |β⟩⟨β|', C.mag, eq, 19);
    lbl('ρ ⊥ β still passes with probability 1/2', 1420, 815, C.dim, eq, 15);
  }
};

/* ---- 12 MPS WITNESS (V22 §10) ---- */
SCENES.mps = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Conjugating every tensor and the boundary', 0.6);
  const A = [[['·', '3/5', '·'], ['·', '·', '3/5'], ['·', '·', '·']], [['·', '·', '·'], ['4/5', '·', '·'], ['·', '4/5', '·']], [['·', '·', '4/5'], ['·', '·', '·'], ['·', '·', '·']], [['·', '·', '·'], ['·', '·', '·'], ['3/5', '·', '·']]];
  if (f1 > 0) {
    const q = Q(S, 0, 'A project matrix product witness', 0.6) * f1;
    const lq = Q(S, 0, 'carries charges minus one, one, minus two and two', 0.6) * f1;
    A.forEach((M, k) => { const x = 140 + k * 205, y = 300, cc = [C.gold, C.cyan, C.mag, C.green][k]; lblG('A' + ['₀', '₁', '₂', '₃'][k], x + 88, y - 14, cc, q, 22); bracket091(x, y, 180, 150, cc, q); grid091(x + 8, y + 8, M, 56, 46, q, (i, j, s) => s === '·' ? C.dim : cc, 16); lblG('λ = ' + ['−1', '1', '−2', '2'][k], x + 90, y + 195, cc, lq, 20); });
    lbl('four physical levels , bond dimension three', 540, 540, C.dim, q, 16);
    const nq = Q(S, 0, 'It is normalized', 0.6) * f1;
    chip(540, 620, 860, 54, 'Σ_k A_k A_k† = I₃', C.green, nq, 23);
    chip(540, 700, 860, 54, 'V(θ) A_k V(θ)⁻¹ = e^(iθλ_k) A_k ,  V = diag(1, e^(iθ), e^(2iθ))', C.cyan, lq, 18);
    const gq = Q(S, 0, 'its two-letter amplitudes determine any boundary', 0.6) * f1;
    const PR = { '0,0': 'E₀₂', '0,1': 'E₀₀+E₁₁', '0,3': 'E₁₀', '1,0': 'E₁₁+E₂₂', '1,1': 'E₂₀', '1,2': 'E₁₂', '2,1': 'E₀₁', '2,3': 'E₀₀', '3,0': 'E₂₁', '3,2': 'E₂₂' };
    const gx = 1150, gy = 330, cw = 140, chh = 70;
    for (let i = 0; i < 4; i++) { lbl('A' + i, gx - 30, gy + i * chh + 42, C.dim, gq, 16); lbl('A' + i, gx + i * cw + 66, gy - 12, C.dim, gq, 16); }
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const nz = MPSNZ091[i][j], col = nz ? C.gold : C.dim; box(gx + j * cw, gy + i * chh, cw - 6, chh - 6, col, gq * (nz ? 1 : 0.4), 1.4, nz ? 'rgba(60,45,0,0.35)' : 'rgba(0,0,0,0.3)'); if (nz) lblG(PR[i + ',' + j], gx + j * cw + 67, gy + i * chh + 40, C.white, gq, 16); }
    lbl('A_i A_j ∝ these matrix units : all nine are reached', 1420, gy + 4 * chh + 28, C.white, gq, 15);
    chip(1420, 690, 760, 56, 'Γ₂ : X ↦ ( Tr(X A_i A_j) )_(i,j)  injective on M₃(ℂ)', C.gold, gq, 20);
    lbl('rank 9 of 16 (recomputed exactly)', 1420, 745, C.dim, gq, 15);
    lbl('Lean · D5/S3/Quantum/SpinChains/FourLevelU1SymmetricInjectiveMPS · frozen', 1420, 785, C.green, gq, 14);
  }
  const q = Q(S, 1, 'Conjugating every tensor and the boundary', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, 'A_i′ = S A_i S⁻¹ ,   X′ = S X S⁻¹ ,   S ∈ GL₃(ℂ)', C.cyan, q, 22);
    const cq = Q(S, 1, 'leaves all sixteen amplitudes unchanged', 0.6);
    const segs = [['Tr( ', 0], ['S', 1], [' X ', 0], ['S⁻¹ S', 1], [' A_i ', 0], ['S⁻¹ S', 1], [' A_j ', 0], ['S⁻¹', 1], [' )', 0]];
    const tot = segs.reduce((acc, sg) => acc + tw(sg[0], 26, FG, 700), 0);
    let x = 530 - tot / 2; const y = 430, fade = 1 - cq;
    segs.forEach(([s, red]) => { const w = tw(s, 26, FG, 700); lblG(s, x, y, red ? C.red : C.white, q * (red ? 0.35 + 0.65 * fade : 1), 26, 'left'); if (red && s.length > 3) line(x, y + 12, x + w, y + 12, C.red, cq, 2); x += w; });
    lbl('adjacent S⁻¹S = I ; the outer S … S⁻¹ cancels by cyclicity of the trace', 530, 480, C.red, cq, 15);
    lblG('=  Tr( X A_i A_j )', 530, 560, C.green, cq, 30);
    lbl('16 words (i, j) , every amplitude unchanged', 530, 610, C.dim, cq, 15);
    const rq = Q(S, 1, 'the virtual reference cancels while the boundary survives', 0.6);
    stamp('REFERENCE CANCELS', 530, 690, rq, C.cyan, 22, -0.04);
    stamp('BOUNDARY SURVIVES', 530, 785, rq, C.green, 22, 0.03);
    const mq = Q(S, 1, 'Squared moduli would lose it', 0.6);
    chip(1420, 330, 760, 56, '|Tr(e^(iα)X A_i A_j)|² = |Tr(X A_i A_j)|²', C.red, mq, 21);
    lbl('moduli cannot see a boundary phase ; complex amplitudes can', 1420, 390, C.dim, mq, 15);
    const cx = 1420, cy = 600, R = 150;
    plane091(cx, cy, R, mq * 0.6, 'Re', 'Im');
    ring(cx, cy, R * 0.8, C.dim, mq * 0.5, 1.2);
    const a1 = 35 + 25 * Math.sin(t * 0.8);
    vecArrow091(cx, cy, R * 0.8, 35, C.gold, mq, 'Tr(X A A)', 12, -6);
    vecArrow091(cx, cy, R * 0.8, 35 + 70 + a1, C.mag, mq, 'e^(iα) ×', -20, -6);
    lbl('same length , different phase', cx, cy + R + 50, C.white, mq, 16);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The matrix product witness is frozen', 'lean'], [1, 'history states, program orthogonality', 'published'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['ATOMS', '5 atoms · κ', C.gold, 'Five atoms and a hidden kappa'], ['ORDER', 'gap φ⁻³', C.red, 'a golden order gap'], ['PROGRAMS', '1/2 vs 3/8', C.cyan, 'shared programs'], ['HISTORIES', 'ker H_π · clocks', C.mag, 'static histories and relational clocks'], ['PATHS', 'min E = 2p₋', C.green, 'a dark port'], ['MEMORY', '6 numbers', C.vio, 'six numbers'],
      ['RELATIVE', 'R = V†U', C.gold, 'relative gates'], ['QUOTIENTS', '2 − 2Σ√(pq)', C.cyan, 'quotients'], ['PHASES', 'φ⁻⁴ω vs φ⁻⁴ω̄', C.mag, 'Bargmann phases'], ['FUTURE', 'φ⁻⁴ vs 1', C.red, 'futures that split'], ['BOUNDARY', 'Γ₂ injective', C.green, 'a surviving boundary']];
    items.forEach(([a1, a2, col, ph], i) => { const r = i < 6 ? 0 : 1, k = r ? i - 6 : i, x = r ? 300 + k * 330 : 160 + k * 320, y = 225 + r * 150, q = Q(S, 0, ph) * fade; box(x - 145, y, 290, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 45, col, q, 19); lblG(a2, x, y + 92, C.white, q, 20); });
    lbl('LEAN · FourLevelU1SymmetricInjectiveMPS (frozen) : normalization , charges , two-letter injectivity', W / 2, 560, C.green, Q(S, 1, 'The matrix product witness is frozen') * fade, 15);
    lbl('PUBLISHED · history states (Aharonov et al.) · program orthogonality (Heinosaari–Tukiainen) · Bargmann invariants (Rabei et al.) · swap and cycle tests (Ekert et al.)', W / 2, 600, C.cyan, Q(S, 1, 'history states, program orthogonality') * fade, 14);
    lbl('CLASSICAL · sharp compatibility · direct limits · Gram reconstruction · MPS gauge freedom', W / 2, 640, '#8fbcff', Q(S, 1, 'are published inputs') * fade, 15);
    lbl('VOLUMES · κ fibre · order gap · shared programs · weighted histories · clock potential · 2p₋ · six numbers · relative gates · quotients · golden Bargmann · future closure', W / 2, 680, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · 1716 checks : φ⁻² , φ⁻⁴ , φ⁻³ · 3/8 · closures 7 and 25 · B = −0.0451 ± 0.1388 i · φ⁻⁴ vs 1 · Γ₂ rank 9', W / 2, 720, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr091(W / 2, 430, 270, 0.5 + t * 0.2, a * 0.9, { fill: 0.12, lab: false });
    txt('AURIC V21–V22 · HISTORIES', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V21–V22 · 静态历史与观察商 · TRURETURING FILM 091', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Readings without order, a gate with order, and relations that rebuild their space.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V21–V22', atoms: 'FIVE ATOMS', order: 'ORDER AND THE GOLDEN GATE', program: 'BASIS AS PROGRAM', history: 'STATIC HISTORIES AND CLOCKS', paths: 'RESIDUAL AND INTERFERENCE', six: 'SIX NUMBERS', relative: 'RELATIVE GATES', quotients: 'QUOTIENTS', bargmann: 'KERNELS AND BARGMANN PHASES', future: 'FUTURE CLOSURE', mps: 'MPS WITNESS', finale: 'LEDGER' });

function poster091() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr091(470, 520, 420, 2.2, 1, { fill: 0.14, bits: true, ls: 22 });
  txt('p(P → Q) − p(Q → P) = φ⁻³', 1320, 360, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('six numbers : X, Y, Z, κ, Re ρ₀₂, Im ρ₀₂', 1320, 470, { size: 38, fam: FG, w: 700, align: 'center', c: C.white });
  txt('B = φ⁻⁴ω  versus  φ⁻⁴ω̄', 1320, 580, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V21–V22', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4, ls: 4 });
  txt('AURIC V21–V22 · HISTORIES', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('静 态 历 史 与 观 察 商', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 091', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster091;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
