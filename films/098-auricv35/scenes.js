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

/* ---- film 098: AURIC V35–V36 · three-axis errors, four-of-five recovery and error series ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN PROJECT THEOREM · APPLIED IN THE VOLUME', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · EXACT VALUE NOT DETERMINED', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po098 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po098.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po098.set(key, off); }
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
/* ---- film 098 data (from verify098.py / vis098.json) ---- */
const BLOCH098 = [[-0.0184,0.0697,0.0514],[0.214,0.0634,-0.6027],[0.1514,0.0225,-0.1515],[0.3727,-0.1726,-0.2353],[0.2718,0.0457,0.0811],[0.3876,-0.1125,-0.0032],[0.2027,-0.1737,0.3479],[-0.0294,-0.0072,-0.4599],[-0.0169,0.0315,0.542],[-0.8046,-0.4753,-0.1998],[-0.0737,0.897,0.1683],[-0.0941,-0.3309,0.772],[0.3556,-0.6483,-0.6097],[0.0371,0.0464,0.1278],[0.018,-0.0021,0.3259],[0.0095,0.0071,0.4117],[-0.1733,0.3313,0.2525],[0.4146,-0.8895,0.034],[-0.2675,0.7494,0.0421],[-0.395,-0.5681,0.2789],[0.8821,0.0045,-0.0404],[0.188,0.0086,-0.9253],[0.1346,0.6634,0.5886],[-0.1225,0.1345,0.7326],[-0.3625,-0.3193,0.2042],[-0.6432,0.2338,0.592],[0.0071,-0.0016,0.7973],[-0.0176,-0.527,0.748],[-0.0218,-0.0437,-0.3657],[-0.1763,-0.3228,-0.851],[-0.1041,0.0052,0.1242],[0.0444,0.6668,0.2368],[-0.2682,0.0454,-0.3406],[0.5633,0.1342,-0.4573],[-0.0981,-0.2313,-0.8897],[0.0389,-0.0887,0.1952],[0.3802,0.1272,-0.2412],[-0.0253,-0.1199,0.7123],[0.2176,0.0323,-0.3262],[-0.6891,0.6963,0.1995],[0.1221,0.2688,0.9399],[-0.0375,0.4047,0.8041],[-0.3859,0.1473,0.1274],[-0.003,0.342,0.7497],[0.7112,-0.4991,0.2623],[-0.0583,0.0256,-0.2096],[0.1755,0.2659,0.0272],[-0.2185,-0.1263,-0.5672],[0.236,0.5615,-0.6723],[0.302,0.8949,-0.2676],[-0.0762,-0.003,0.3742],[-0.0224,-0.4874,-0.8612],[-0.2446,-0.7789,-0.4811],[0.3122,-0.1279,-0.5253],[-0.0543,-0.0797,0.1152],[0.5426,-0.5855,-0.4107],[0.6958,0.2952,-0.0308],[0.0315,-0.9777,0.1158],[0.4466,-0.8723,-0.0696],[0.2704,-0.3088,0.1586]];
const HID098 = [[0.0,0.5,0.0,0.5,0.0],[0.5,0.0,0.0,0.0,0.5],[0.02,0.47,0.02,0.47,0.02],[0.47,0.02,0.02,0.02,0.47]];
const GPROF098 = [[0.0,0.0],[0.0785,0.0443],[0.1571,0.08833],[0.2356,0.13181],[0.3142,0.17448],[0.3927,0.21608],[0.4712,0.25634],[0.5498,0.29502],[0.6283,0.33189],[0.7069,0.36671],[0.7854,0.39926],[0.8639,0.42936],[0.9425,0.45681],[1.021,0.48144],[1.0996,0.5031],[1.1781,0.52166],[1.2566,0.53701],[1.3352,0.54904],[1.4137,0.55769],[1.4923,0.5629],[1.5708,0.56464],[1.6493,0.5629],[1.7279,0.55769],[1.8064,0.54904],[1.885,0.53701],[1.9635,0.52166],[2.042,0.5031],[2.1206,0.48144],[2.1991,0.45681],[2.2777,0.42936],[2.3562,0.39926],[2.4347,0.36671],[2.5133,0.33189],[2.5918,0.29502],[2.6704,0.25634],[2.7489,0.21608],[2.8274,0.17448],[2.906,0.13181],[2.9845,0.08833],[3.0631,0.0443],[3.1416,0.0]];
const GB098 = 0.56464;
const GQ098 = [[0.6712,0.5654,0.3667,0.3089],[0.6712,0.5654,0.3667,-0.3089]];
const GCOMM098 = 0.6177;
const DRIFT098 = [0.0,0.07846,0.15643,0.23345,0.30902,0.38268,0.45399,0.5225,0.58779,0.64945,0.70711,0.76041,0.80902,0.85264,0.89101,0.92388,0.95106,0.97237,0.98769,0.99692,1.0,0.99692,0.98769,0.97237,0.95106,0.92388,0.89101,0.85264,0.80902,0.76041,0.70711,0.64945,0.58779,0.5225,0.45399,0.38268,0.30902,0.23345,0.15643,0.07846,0.0];
const BUDG098 = [[0.29888,0.29888],[0.2891,0.37386],[0.30716,0.40719],[0.31753,0.42594],[0.31309,0.43794],[0.31015,0.44627],[0.30798,0.4524],[0.30934,0.45708],[0.30789,0.46079],[0.30845,0.46379],[0.30822,0.46627],[0.30809,0.46835],[0.30768,0.47012],[0.3077,0.47166],[0.30755,0.47299],[0.30819,0.47416],[0.30781,0.4752],[0.30768,0.47612],[0.30776,0.47696],[0.30731,0.47771],[0.30695,0.47839],[0.3069,0.47901],[0.30674,0.47957],[0.30659,0.48009],[0.3062,0.48057]];
const SYN098 = [[0.1337,0.8433,-0.4698],[-0.3814,0.3831,-0.8199],[0.1613,0.3952,-0.8662],[0.1228,-0.5411,-0.242],[0.0,0.0,1.0]];
const LOGR098 = [0.1529,0.0904,0.4677];
const GRAM098 = [0.55,0.45,0.0,0.0];
const TRAJ098 = [[0.0,0.7,-0.6],[0.12,0.55,-0.21],[0.204,0.445,0.063],[0.2628,0.3715,0.2541],[0.304,0.32,0.3879],[0.3328,0.284,0.4815],[0.3529,0.2588,0.5471],[0.3671,0.2412,0.5929],[0.3769,0.2288,0.6251],[0.3839,0.2202,0.6475],[0.3887,0.2141,0.6633],[0.3921,0.2099,0.6743],[0.3945,0.2069,0.682]];
const SSTAR098 = [0.4,0.2,0.7];
const RESET098 = [[0.25,0.63322,0.95107],[0.5,0.47541,0.84518],[1.0,0.33774,0.60042],[1.5,0.22302,0.39647],[2.0,0.14195,0.25235],[3.0,0.05462,0.0971]];
const CZX098 = [[0.25,0.58104,0.95107],[0.5,0.37314,0.84518],[0.75,0.26763,0.7216],[1.0,0.18263,0.60042],[1.5,0.09936,0.39647],[2.0,0.0629,0.25235],[2.5,0.03911,0.15743],[3.0,0.02924,0.0971],[4.0,0.01077,0.0363]];
const BASIS098 = [[1,0,0,0,0],[1,1,0,0,0],[1,0,0,1,0],[1,0,1,0,0],[1,1,1,0,1]];
const FF098 = [1.0,0.4,0.3,0.2,0.15];
const TANHA098 = [[1.0,0.09948],[2.0,0.19593],[4.0,0.36969],[8.0,0.60928],[16.0,0.77122]];
const TANHS098 = [[4.9173,0.34216],[0.253,0.01807],[4.8036,0.30988],[0.4319,0.03227],[2.0275,0.12334],[1.4098,0.11315],[2.0265,0.08451],[3.6096,0.25377],[3.8028,0.26283],[7.6786,0.43941],[3.7651,0.23414],[0.2062,0.00609],[2.9968,0.23001],[0.6399,0.02076],[3.3774,0.16025],[0.6912,0.02993],[3.9178,0.12919],[5.9802,0.29582],[4.7333,0.11051],[0.4786,0.03918],[1.0052,0.07516],[2.9551,0.2289],[2.1414,0.14914],[0.5082,0.03849],[3.9425,0.23625],[0.6296,0.02475],[1.8614,0.13162],[2.3082,0.11617],[0.2554,0.00318],[2.7582,0.1461],[5.3984,0.35541],[1.7672,0.12753],[3.8219,0.2421],[2.3881,0.18094],[4.1015,0.26746],[0.4542,0.0239],[1.732,0.12618],[1.0911,0.08631],[2.583,0.20219],[4.3202,0.13132],[0.7329,0.05716],[8.596,0.22114],[0.3802,0.02956],[6.4584,0.40562],[1.4656,0.10277],[4.43,0.05575],[0.9337,0.06464],[1.2351,0.05078],[2.4348,0.18067],[0.8364,0.04764],[5.9632,0.363],[3.4119,0.24924],[10.1405,0.13549],[3.2622,0.23893],[1.629,0.1239],[3.7962,0.25941],[4.2424,0.29737],[2.2825,0.18116],[1.4889,0.12064],[6.1184,0.26614],[3.1394,0.24026],[0.1659,0.00961],[1.2977,0.03262],[3.3233,0.24482],[0.9193,0.06756],[2.7872,0.21307],[0.6619,0.02728],[4.7697,0.18733],[3.4688,0.26148],[2.1572,0.14163],[1.1642,0.0819],[0.0521,0.00166],[5.1872,0.26097],[2.2533,0.12393],[4.8134,0.33448],[2.0007,0.15927],[4.3352,0.28136],[7.5199,0.19258],[1.3166,0.09768],[4.8058,0.33766],[1.5593,0.12541],[2.9156,0.22445],[2.3026,0.16265],[1.7409,0.1404],[4.0592,0.13901],[0.2049,0.01669],[3.6807,0.27623],[0.3129,0.02574],[6.3355,0.36458],[1.5634,0.0972],[0.8253,0.0563],[1.8469,0.11952],[3.1071,0.19199],[0.3047,0.01764],[1.755,0.13349],[0.5219,0.04254],[2.6282,0.20576],[4.776,0.32883],[0.4061,0.03011],[1.9491,0.15279],[3.109,0.10257],[0.9676,0.07555],[0.8339,0.06416],[0.6086,0.04347],[3.8302,0.24096],[4.9907,0.17356],[2.7827,0.19168],[1.6919,0.11488],[4.1957,0.23415],[3.4321,0.25607],[0.8306,0.0677],[0.221,0.01685],[2.1402,0.09515],[1.3177,0.08609],[0.4559,0.02603],[0.5986,0.02498],[0.8859,0.05232],[2.9837,0.17091],[0.6365,0.05187],[0.7328,0.05998],[3.0095,0.23151],[2.2496,0.17132],[0.4176,0.02636],[4.5135,0.2065],[5.47,0.18179],[0.4433,0.00552],[5.4524,0.27482],[5.8192,0.34833],[3.554,0.21476],[3.0461,0.22867],[1.2037,0.09778],[2.9878,0.19257],[1.8845,0.15026],[4.1044,0.27388],[2.1246,0.10097],[1.429,0.11125],[3.7143,0.26905],[0.7664,0.05767],[7.3221,0.4183],[0.2911,0.01609],[0.2109,0.01738],[3.1122,0.2068],[3.9237,0.29047],[1.5683,0.12687],[3.6848,0.27648],[4.2616,0.26403],[0.4683,0.02858],[5.1042,0.25097],[6.1394,0.17119],[4.1442,0.18309],[6.9466,0.42291],[1.9557,0.15417],[4.6459,0.28709],[2.9754,0.23011],[0.537,0.03547],[1.2066,0.09491],[6.5642,0.40071],[2.7677,0.18063],[4.7245,0.33255],[3.3442,0.13402]];
const CHI098 = [[0.0025,-4.7591],[0.0075,-3.6035],[0.0125,-3.0354],[0.0175,-2.6412],[0.0225,-2.3318],[0.0275,-2.0726],[0.0325,-1.8464],[0.0375,-1.6436],[0.0425,-1.4582],[0.0475,-1.286],[0.0525,-1.1243],[0.0575,-0.9708],[0.0625,-0.8242],[0.0675,-0.683],[0.0725,-0.5464],[0.0775,-0.4136],[0.0825,-0.2837],[0.0875,-0.1564],[0.0925,-0.0311],[0.0975,0.0927],[0.1025,0.2153],[0.1075,0.3372],[0.1125,0.4586],[0.1175,0.5798],[0.1225,0.7013],[0.1275,0.8232],[0.1325,0.9459],[0.1375,1.0697],[0.1425,1.195],[0.1475,1.322],[0.1525,1.4512],[0.1575,1.5829],[0.1625,1.7177],[0.1675,1.8559],[0.1725,1.9982],[0.1775,2.1452],[0.1825,2.2978],[0.1875,2.4567],[0.1925,2.6233],[0.1975,2.7987],[0.2025,2.9849],[0.2075,3.1842],[0.2125,3.3996],[0.2175,3.6356],[0.2225,3.8985],[0.2275,4.1986],[0.2325,4.5535],[0.2375,4.9986],[0.2425,5.6238],[0.2475,6.8439]];
const KSTAR098 = 0.09375;
const SPLIT098 = {"now":[0.3,0.25,0.2],"A":[0.318,0.305,0.207],"B":[0.35,0.305,0.175],"corner":[0.2,0.0,-0.2]};
const CANC098 = [[1.5,0.5,-0.6,0.8],[2,1,-0.8,0.6],[3,2,-0.92308,0.38462],[5,4,-0.97561,0.21951],[8,7,-0.99115,0.13274],[12,11,-0.99623,0.08679],[20,19,-0.99869,0.05125],[35,34,-0.99958,0.02898],[60,59,-0.99986,0.01681]];
const NEU098 = [[0,4.351077,12.874194],[1,2.003247,7.724517],[2,0.408764,4.63471],[3,0.10084,2.780826],[4,0.045069,1.668496],[5,0.011807,1.001097],[6,0.003832,0.600658],[7,0.001405,0.360395],[8,0.000515,0.216237],[9,0.000189,0.129742],[10,6.4e-05,0.077845],[11,2.4e-05,0.046707],[12,9e-06,0.028024],[13,3e-06,0.016815],[14,1e-06,0.010089],[15,0.0,0.006053]];
const FIBS098 = [[0,-1.9561,0.1275],[1,-1.0313,0.0765],[2,-0.5924,0.0459],[3,-0.3488,0.02754],[4,-0.2074,0.01652],[5,-0.1238,0.00991],[6,-0.0741,0.00595],[7,-0.0444,0.00357],[8,-0.0266,0.00214],[9,-0.016,0.00128],[10,-0.0096,0.00077],[11,-0.0057,0.00046]];
const INJ098 = [[0,1.0],[1,0.65],[2,0.53333],[3,0.475],[4,0.44],[5,0.41667],[6,0.4],[7,0.3875],[8,0.37778],[9,0.37],[10,0.36364],[11,0.35833],[12,0.35385],[13,0.35],[14,0.34667],[15,0.34375],[16,0.34118],[17,0.33889],[18,0.33684],[19,0.335],[20,0.33333],[21,0.33182],[22,0.33043],[23,0.32917],[24,0.328],[25,0.32692],[26,0.32593],[27,0.325],[28,0.32414],[29,0.32333],[30,0.32258],[31,0.32188],[32,0.32121],[33,0.32059],[34,0.32],[35,0.31944],[36,0.31892],[37,0.31842],[38,0.31795],[39,0.3175],[40,0.31707],[41,0.31667],[42,0.31628],[43,0.31591],[44,0.31556],[45,0.31522],[46,0.31489],[47,0.31458],[48,0.31429],[49,0.314],[50,0.31373],[51,0.31346],[52,0.31321],[53,0.31296],[54,0.31273],[55,0.3125],[56,0.31228],[57,0.31207],[58,0.31186],[59,0.31167],[60,0.31148]];
const CONV098 = [[0,1.0],[1,0.60607],[2,0.46178],[3,0.38383],[4,0.3339],[5,0.29866],[6,0.2722],[7,0.25143],[8,0.2346],[9,0.22063],[10,0.2088],[11,0.19861],[12,0.18974],[13,0.18191],[14,0.17495],[15,0.1687],[16,0.16306],[17,0.15793],[18,0.15324],[19,0.14893],[20,0.14495],[21,0.14127],[22,0.13785],[23,0.13466],[24,0.13167],[25,0.12887],[26,0.12624],[27,0.12375],[28,0.12141],[29,0.11918],[30,0.11708],[31,0.11508],[32,0.11317],[33,0.11136],[34,0.10962],[35,0.10797],[36,0.10638],[37,0.10486],[38,0.10341],[39,0.10201],[40,0.10066],[41,0.09937],[42,0.09812],[43,0.09692],[44,0.09576],[45,0.09464],[46,0.09356],[47,0.09251],[48,0.0915],[49,0.09051],[50,0.08956],[51,0.08864],[52,0.08775],[53,0.08688],[54,0.08603],[55,0.08521],[56,0.08441],[57,0.08364],[58,0.08288],[59,0.08215],[60,0.08143]];
const HISTA098 = [1,5,21,89,377,1597,6765,28657,121393];
const HTAIL098 = [[0,0.866667],[1,0.733333],[2,0.621333],[3,0.5264],[4,0.445973],[5,0.377835],[6,0.320107],[7,0.271199],[8,0.229763],[9,0.194659],[10,0.164917],[11,0.13972],[12,0.118373]];
const KAPPA098 = 0.7;
const INJC098 = 0.3;
/* ---- film 098 helpers ---- */
function ell098(cx, cy, rx, ry, col, a, lw = 1.5, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll098(cx, cy, rx, ry, col, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
function cell098(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
/* oblique projection of a Bloch vector (x, y, z) */
function bp098(cx, cy, R, ang) { return (x, y, z) => { const c = Math.cos(ang), s = Math.sin(ang), xx = x * c - y * s, yy = x * s + y * c; return [cx + R * xx, cy - R * z * 0.92 + R * yy * 0.32, yy]; }; }
function ball098(cx, cy, R, a, col = C.cyan) {
  if (a <= 0) return;
  fillEll098(cx, cy, R, R, col, a * 0.05);
  ring(cx, cy, R, col, a * 0.75, 2);
  ell098(cx, cy, R, R * 0.32, col, a * 0.35, 1.3);
  ell098(cx, cy, R * 0.32, R, col, a * 0.18, 1, 1);
}
function plotPts098(pts, xS, yS, col, a, r = 6, name = 'c') { pts.forEach((p, i) => dot(xS(p[0]), yS(p[1]), r, name, a)); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['errors live on three stable axes', 'THREE STABLE AXES', 'error = size + a point of the ball', C.gold], ['when unitary steps stay stable', 'UNITARY ≠ STABLE', 'D_n = |sin nε| reaches 1', C.cyan], ['four mode readings recover a fifth', 'FOUR OF FIVE', '(N − Z) K = X Y', C.mag], ['errors sum as a series', 'ERROR SERIES', 'e = Σ Aʲ r ,  ‖e‖ ≤ ‖r‖ / (1 − q)', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 330, 360, 58, 'keep the size', C.gold, rp, 22); chip(330, 415, 360, 58, 'close the axes', C.cyan, rp, 22); chip(330, 500, 360, 58, 'park it in a syndrome', C.mag, rp, 22);
  box(1420, 320, 380, 200, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('four of five', 1610, 385, C.green, rp, 22); lblG('(N − Z) K = X Y', 1610, 455, C.white, rp, 28);
  txt(scramble('AURIC V35–V36 · ERROR AXES', rp, 498), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V35–V36 · 三 轴 误 差 、四 推 一 恢 复 与 误 差 级 数', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 098 · AURIC_THREE_AXIS_ERROR_GEOMETRY_UNITARY_COMPATIBILITY_AND_ENDOGENOUS_STABILITY_V35 · AURIC_FIVE_MODE_DUAL_BASES_FOUR_OF_FIVE_RECOVERY_AND_RECURSIVE_ERROR_SERIES_V36', W / 2, 115, { size: 12, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 0 });
};

/* ---- 02 TOTAL AND BALL (V35 §2) ---- */
SCENES.bloch = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'Normalising away N hides', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Two anticommuting sharp readouts', 0.6);
  const cx = 1390, cy = 500, R = 230, ang = 0.5 + t * 0.12, P3 = bp098(cx, cy, R, ang);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two strengths and one complex relation', 0.6) * f1;
    box(150, 250, 380, 190, C.gold, q, 2, 'rgba(40,30,0,0.35)');
    lblG('G =', 205, 360, C.white, q, 30);
    lblG('p', 320, 320, C.gold, q, 30); lblG('c̄', 440, 320, C.mag, q, 30); lblG('c', 320, 400, C.mag, q, 30); lblG('q', 440, 400, C.gold, q, 30);
    line(270, 285, 270, 420, C.white, q, 2); line(490, 285, 490, 420, C.white, q, 2);
    lbl('p , q ≥ 0 ,  |c|² ≤ p q', 340, 475, C.dim, q, 17);
    const nq = Q(S, 0, 'are exactly a total N plus a point of the Bloch ball', 0.6) * f1;
    arrow(545, 345, 640, 345, C.dim, nq, 2.5);
    box(660, 270, 330, 150, C.cyan, nq, 2, 'rgba(0,30,40,0.4)');
    lblG('N = p + q > 0', 825, 320, C.white, nq, 24);
    lblG('r = (2Re c, 2Im c, p − q) / N', 825, 375, C.cyan, nq, 17);
    const dq = Q(S, 0, 'one minus r squared is four times the determinant', 0.6) * f1;
    chip(560, 540, 820, 62, '1 − |r|² = 4 det G / N²   ·   rank 1 ⇔ |r| = 1', C.gold, dq, 23);
    lbl('recomputed on 400 random positive matrices', 560, 600, C.dim, dq, 15);
    ball098(cx, cy, R, nq);
    BLOCH098.forEach((r, i) => { const qq = clamp(nq * 1.6 - i / 70), p = P3(r[0], r[1], r[2]); dot(p[0], p[1], 7, 'c', qq * (0.55 + 0.45 * (p[2] + 1) / 2)); });
    lbl('60 sampled matrices : all |r| ≤ 1', cx, cy + R + 50, C.cyan, nq, 16);
    const hq = Q(S, 0, 'Normalising away N hides', 0.6) * f1;
    stamp('N HIDES THE SIZE', 560, 700, hq, C.red, 30, -0.04);
    lbl('G and z² G give the same point ; only N tells them apart', 560, 770, C.dim, hq, 15);
  }
  const q = Q(S, 1, 'Two anticommuting sharp readouts', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, 'A² = B² = I ,  A B = − B A  ⇒  C = − i A B', C.gold, q, 23);
    const rq = Q(S, 1, 'C equals minus i A B', 0.6);
    lblG('A B = i C ,   B C = i A ,   C A = i B', 530, 335, C.white, rq, 22);
    lbl('finite dimensions : (A, B, C) ≅ (Z, X, Y) ⊗ I', 530, 375, C.dim, rq, 16);
    const sq = Q(S, 1, 'three squared expectations sum to at most one', 0.6);
    chip(530, 460, 860, 62, 'ω(A)² + ω(B)² + ω(C)² ≤ 1', C.green, sq, 27);
    lbl('largest sampled sum over 2000 states : 0.99913', 530, 520, C.dim, sq, 15);
    const tq = Q(S, 1, 'trace distance is half the gap between axis vectors', 0.6);
    chip(530, 630, 860, 62, 'D(ρ, σ) = ½ ‖ρ − σ‖₁ = ½ |r_ρ − r_σ|', C.cyan, tq, 25);
    lbl('orthogonal is not enough : Z ⊗ I and I ⊗ Z are both 1 on |00⟩', 530, 695, C.dim, tq, 15);
    ball098(cx, cy, R, q);
    const ax = [[0, 0, 1, 'A = Z', C.gold], [1, 0, 0, 'B = X', C.mag], [0, 1, 0, 'C = Y', C.green]];
    const O = P3(0, 0, 0);
    ax.forEach(([x, y, z, nm, col], i) => { const qq = clamp(q * 2 - i * 0.3), p = P3(x, y, z); arrow(O[0], O[1], p[0], p[1], col, qq, 3); lblG(nm, p[0] + (i === 0 ? 0 : 34), p[1] + (i === 0 ? -16 : 10), col, qq, 22, i === 0 ? 'center' : 'left'); });
    const ra = [0.55, -0.35, 0.5], rb = [-0.2, 0.45, -0.55];
    const pa = P3(...ra), pb = P3(...rb);
    dot(pa[0], pa[1], 13, 'c', tq); dot(pb[0], pb[1], 13, 'm', tq); dashed(pa[0], pa[1], pb[0], pb[1], C.white, tq, 2.5);
    lblG('ρ', pa[0] + 20, pa[1] - 8, C.cyan, tq, 22, 'left'); lblG('σ', pb[0] + 20, pb[1] + 12, C.mag, tq, 22, 'left');
  }
};

/* ---- 03 HIDDEN ERROR (V35 §3) ---- */
SCENES.hidden = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On all five modes an anticommuting sharp pair', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "The pyramid's own occupancy readouts commute", 0.6) * f1;
    pyr63(440, 470, 260, 0.6 + t * 0.15, q, { fillBase: 1 });
    chip(440, 690, 640, 56, 'N₁ , N₂ , N₃ diagonal  ⇒  they commute', C.cyan, q, 22);
    const pq = Q(S, 0, 'so they are not Pauli axes', 0.6) * f1;
    lbl('(X, Y, Z) = (Tr ρN₁ , Tr ρN₃ , Tr ρN₂)  are not Bloch coordinates', 440, 750, C.dim, pq, 15);
    const sq = Q(S, 0, 'Two states with the same readings', 0.6) * f1;
    const labs = ['∅', '2', '3', '5', '25'];
    [[HID098[0], C.cyan, 'p⁽⁰⁾'], [HID098[1], C.mag, 'p⁽¹⁾']].forEach(([v, col, nm], j) => { const x0 = 1010 + j * 400; bars63(x0, 520, v, 52, 14, 360, sq, col, labs); lblG(nm, x0 + 160, 300, col, sq, 26); });
    lblG('(X, Y, Z) = (½ , ½ , 0)  for both', 1395, 600, C.white, sq, 22);
    const dq = Q(S, 0, 'can lie at distance one', 0.6) * f1;
    chip(1395, 660, 740, 56, 'disjoint supports :  D = 1', C.red, dq, 24);
    const eq = Q(S, 0, 'and strictly positive ones at one minus epsilon', 0.6) * f1;
    chip(1395, 740, 740, 56, '(1 − ε) p + ε (1, 1, 1, 1, 1)/5 :  D = 1 − ε', C.gold, eq, 21);
  }
  const q = Q(S, 1, 'On all five modes an anticommuting sharp pair', 0.6, 0.3);
  if (q > 0) {
    box(150, 270, 330, 340, C.gold, q, 2, 'rgba(40,30,0,0.3)'); lbl('A = +1', 315, 315, C.gold, q, 22);
    box(600, 270, 330, 340, C.mag, q, 2, 'rgba(40,0,40,0.3)'); lbl('A = −1', 765, 315, C.mag, q, 22);
    for (let i = 0; i < 3; i++) { dot(235 + i * 80, 450, 11, 'g', q); dot(685 + i * 80, 450, 11, 'm', q); }
    lbl('k dimensions', 315, 570, C.dim, q, 16); lbl('k dimensions', 765, 570, C.dim, q, 16);
    const bq = Q(S, 1, 'since it needs even dimension', 0.6);
    arrow(490, 410, 590, 410, C.white, bq, 3); arrow(590, 490, 490, 490, C.white, bq, 3); lbl('B', 540, 390, C.white, bq, 22);
    chip(540, 680, 780, 58, 'B swaps the ±1 eigenspaces  ⇒  dim = 2k ≠ 5', C.red, bq, 22);
    lbl('Pauli axes live on a support P : a 2-dim code or a 4-dim syndrome block', 540, 745, C.dim, bq, 15);
    const cq = Q(S, 1, 'Three axes predict every future reading exactly', 0.6);
    chip(1390, 270, 780, 62, 'Φ*( span{I, A, B, C} ) ⊆ span{I, A, B, C}', C.green, cq, 22);
    lbl('unitary channel : U* (algebra) U = algebra ; then every operation word is predicted', 1390, 330, C.dim, cq, 15);
    const xq = Q(S, 1, 'maps their algebra into itself', 0.6);
    box(1030, 380, 720, 330, C.cyan, xq, 2, 'rgba(0,30,40,0.35)');
    lbl('without closure :', 1390, 420, C.cyan, xq, 19);
    lblG('|0⟩⟨0| ⊗ |0⟩⟨0|   vs   |0⟩⟨0| ⊗ |1⟩⟨1|', 1390, 470, C.white, xq, 22);
    lbl('same first-factor axes , full distance 1', 1390, 510, C.dim, xq, 16);
    arrow(1390, 535, 1390, 590, C.gold, xq, 3); lbl('internal SWAP', 1420, 570, C.gold, xq, 17, 'left');
    lblG('Z reading :  +1   vs   −1', 1390, 640, C.red, xq, 26);
  }
};

/* ---- 04 QUATERNION GATES (V35 §4) ---- */
SCENES.gates = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Two rotations about anticommuting axes', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A relative gate error is a unit quaternion', 0.6) * f1;
    chip(530, 270, 860, 64, 'E = a I − i (b_A A + b_B B + b_C C)', C.gold, q, 26);
    lblG('a² + |b|² = 1   ·   E and − E give the same state map', 530, 345, C.white, q, 20);
    const dq = Q(S, 0, 'the worst pure-state distance it causes', 0.6) * f1;
    chip(530, 450, 860, 62, 'D(E ρ_r E*, ρ_r)² = |b|² − (b · r)²', C.cyan, dq, 25);
    const lq = Q(S, 0, 'is exactly the length of b', 0.6) * f1;
    chip(530, 560, 860, 62, 'sup over pure states  =  |b| ,  attained at r ⊥ b', C.green, lq, 24);
    lbl('normalising b to a direction would lose this size', 530, 625, C.dim, lq, 16);
    const px = 1040, py = 760, pw = 700, ph = 420, xS = x => px + x / Math.PI * pw, yS = v => py - v / 0.7 * ph;
    plotAxes(px, py, pw, ph, q, 'angle between r and b', 'D(EρE*, ρ)');
    curve(p => { const r = GPROF098[Math.min(GPROF098.length - 1, Math.round(p * (GPROF098.length - 1)))]; return [xS(r[0]), yS(r[1])]; }, GPROF098.length - 1, C.cyan, dq, 3);
    GPROF098.forEach((r, i) => { if (i % 4 === 0) dot(xS(r[0]), yS(r[1]), 6, 'c', dq); });
    dashed(px, yS(GB098), px + pw, yS(GB098), C.green, lq, 2); lbl('|b| = sin 0.6 = ' + GB098.toFixed(4), px + pw - 10, yS(GB098) - 14, C.green, lq, 16, 'right');
    dot(xS(Math.PI / 2), yS(GB098), 11, 'n', lq);
    ['0', 'π/2', 'π'].forEach((s, i) => lblG(s, px + i * pw / 2, py + 28, C.dim, q, 16));
    lbl('a = cos 0.6 , b ∥ (0.6 , 0 , 0.8)', px + 20, py - ph + 10, C.dim, dq, 14, 'left');
  }
  const q = Q(S, 1, 'Two rotations about anticommuting axes', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 60, 'e^(−iαA) e^(−iβB) = a I − i b · σ', C.white, q, 24);
    const vq = Q(S, 1, 'a times b C equal to b A times b B', 0.6);
    chip(530, 345, 860, 62, 'a² + |b|² = 1 ,   a · b_C = b_A · b_B', C.gold, vq, 26);
    lbl('converse by a rank-one 2×2 factorisation ; covers a = 0', 530, 405, C.dim, vq, 15);
    const oq = Q(S, 1, 'The third component records order', 0.6);
    const labs = ['a', 'b_A', 'b_B', 'b_C'];
    [[GQ098[0], C.cyan, 'α then β order'], [GQ098[1], C.mag, 'swapped order']].forEach(([v, col, nm], j) => { const x0 = 170 + j * 420; bars63(x0, 640, v, 60, 22, 200, oq, col, labs, C.red); lbl(nm, x0 + 160, 455, col, oq, 17); });
    lbl('α = 0.7 , β = 0.5', 530, 760, C.dim, oq, 15);
    const sq = Q(S, 1, 'swapping the factors flips its sign', 0.6);
    stamp('b_C FLIPS', 1390, 300, sq, C.red, 30, -0.04);
    const pq = Q(S, 1, 'the products differ by two sine alpha sine beta', 0.6);
    chip(1390, 420, 780, 62, '‖e^(−iαA)e^(−iβB) − e^(−iβB)e^(−iαA)‖ = 2|sin α sin β|', C.cyan, pq, 19);
    lbl('= ' + GCOMM098.toFixed(4) + ' at (0.7 , 0.5)', 1390, 480, C.white, pq, 18);
    lblG('a₂₁ = a₂a₁ − b₂ · b₁', 1390, 560, C.white, pq, 22);
    lblG('b₂₁ = a₂ b₁ + a₁ b₂ + b₂ × b₁', 1390, 605, C.white, pq, 22);
    lbl('same axis adds , opposite cancels , different axes make the normal C', 1390, 660, C.dim, pq, 15);
  }
};

/* ---- 05 DRIFT AND BUDGET (V35 §5) ---- */
SCENES.drift = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'And a channel that keeps two sharp logical axes', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A step error epsilon of pi over two N', 0.6) * f1;
    const px = 150, py = 720, pw = 780, ph = 400, xS = n => px + n / 40 * pw, yS = v => py - v / 1.1 * ph;
    plotAxes(px, py, pw, ph, q, 'step n', 'D_n = |sin nε|');
    lblG('ideal I , actual e^(−iεZ) , start |+⟩ , ε = π/40', px + pw, py - ph - 4, C.dim, q, 15, 'right');
    const dq = Q(S, 0, 'drifts the state by sine n epsilon', 0.6) * f1;
    DRIFT098.forEach((v, n) => { const qq = clamp(dq * 1.6 - n / 50); line(xS(n), yS(0), xS(n), yS(v), C.cyan, qq * 0.5, 2); dot(xS(n), yS(v), 6, 'c', qq); });
    const oq = Q(S, 0, 'reaching distance one at step N', 0.6) * f1;
    dot(xS(20), yS(1), 13, 'r', oq); lbl('n = N = 20 : D = 1', xS(20) + 20, yS(1) - 10, C.red, oq, 17, 'left');
    lbl('each step : ‖e^(−iεZ) − I‖ = 2 sin(ε/2) ≤ ε', 540, 780, C.dim, oq, 15);
    const bq = Q(S, 0, 'summable step errors instead bound the relative gate', 0.6) * f1;
    chip(1390, 270, 780, 60, 'E_n = G_n* H_n ,  ‖E_N − I‖ ≤ Σ_(j<N) ε_j', C.gold, bq, 22);
    lbl('ε_j = ‖U_j − V_j‖ ; summable ⇒ E_n converges to a unitary', 1390, 330, C.dim, bq, 15);
    const qx = 1030, qy = 740, qw = 720, qh = 330, xT = n => qx + n / 25 * qw, yT = v => qy - v / 0.55 * qh;
    plotAxes(qx, qy, qw, qh, bq, 'step n', 'random 3×3 gates , ε_n = 0.3/(n+1)²');
    curve(p => { const k = Math.min(24, Math.round(p * 24)); return [xT(k + 1), yT(BUDG098[k][1])]; }, 24, C.gold, bq, 3);
    BUDG098.forEach((r, k) => dot(xT(k + 1), yT(r[0]), 6, 'c', bq));
    lbl('gold : Σ ε_j', xT(14), yT(BUDG098[13][1]) - 18, C.gold, bq, 16); lbl('cyan : ‖E_n − I‖', xT(14), yT(BUDG098[13][0]) + 30, C.cyan, bq, 16);
  }
  const q = Q(S, 1, 'And a channel that keeps two sharp logical axes', 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 270, 1400, 60, 'Φ*(A) = A ,  Φ*(B) = B  for every input', C.white, q, 24);
    const cq = Q(S, 1, 'must commute with them', 0.6);
    chip(W / 2, 370, 1400, 62, 'Σ_j (A K_j − K_j A)*(A K_j − K_j A) = 2I − Φ*(A) A − A Φ*(A) = 0', C.gold, cq, 22);
    lbl('each term is positive , so every Kraus operator commutes with A , B and C', W / 2, 430, C.dim, cq, 16);
    const iq = Q(S, 1, 'so on a bare qubit it is the identity', 0.6);
    chip(560, 530, 740, 62, 'bare qubit :  Φ = id', C.green, iq, 26);
    chip(1360, 530, 740, 62, 'C² ⊗ K :  Φ = id₂ ⊗ Ψ', C.cyan, iq, 26);
    const eq = Q(S, 1, 'Correctable errors need somewhere else to live', 0.6);
    stamp('CORRECT IN A SYNDROME', W / 2, 680, eq, C.mag, 34, -0.04);
    lbl('transpose keeps the ball but is not completely positive : Bell eigenvalue − 1/2', W / 2, 770, C.dim, eq, 15);
  }
};

/* ---- 06 SYNDROME OF AT MOST TWO (V35 §6) ---- */
SCENES.syndrome = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [0, 'A family needs one common recovery', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Each orthonormal error is an isometric copy', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'One channel can be undone exactly', 0.6) * f1;
    chip(530, 270, 860, 64, 'E_a* E_b = c_ab I   ⇔   a recovery R with R∘E = id', C.green, q, 23);
    lbl('single finite Kraus channel , trace-preserving recovery', 530, 330, C.dim, q, 15);
    const lq = Q(S, 0, 'this Knill–Laflamme criterion is frozen in Lean', 0.6) * f1;
    box(1030, 250, 760, 200, C.green, lq, 2, 'rgba(0,40,20,0.3)');
    lbl('frozen project theorems', 1410, 290, C.green, lq, 18);
    lbl('FiniteKrausReversibility.scalar_products_construct_left_inverse', 1410, 335, C.white, lq, 15);
    lbl('KrausLeftInverseNecessity.left_inverse_error_products', 1410, 365, C.white, lq, 15);
    lbl('D5 / S3 / Quantum / Recovery ; state files present at the subject commit', 1410, 410, C.dim, lq, 14);
    const fq = Q(S, 0, 'A family needs one common recovery', 0.6) * f1;
    chip(530, 490, 860, 62, 'family :  E_(t,a)* E_(u,b) = c I  for all t , u', C.gold, fq, 23);
    const xq = Q(S, 0, 'so cross products must be scalars too', 0.6) * f1;
    box(150, 560, 760, 190, C.red, xq, 2, 'rgba(40,0,10,0.35)');
    lblG('E_t = S U_t :  each one recoverable', 530, 610, C.white, xq, 21);
    lblG('E_t* E_u = U_t* U_u  is not a scalar', 530, 655, C.white, xq, 21);
    stamp('SEPARATE RECOVERIES FAIL', 530, 715, xq, C.red, 22, -0.03);
    /* five-mode carrier */
    const bx = 1250, by = 545;
    ring(1110, 580, 42, C.gold, q, 2.5); lblG('ψ', 1110, 590, C.gold, q, 28); lbl('logical C²', 1110, 655, C.gold, q, 15);
    arrow(1160, 580, 1235, 580, C.white, q, 2.5); lblG('E_a', 1197, 565, C.white, q, 18);
    for (let i = 0; i < 5; i++) { const qq = clamp(q * 1.5 - i / 8); cell098(bx + i * 108, by, 96, 70, ['∅', '2', '3', '5', '25'][i], C.cyan, qq, 20); }
    lbl('the five-mode output C⁵', bx + 265, by + 110, C.dim, q, 16);
    lbl('E_a : C² → C⁵ ,  Σ E_a* E_a = I₂', bx + 265, by + 140, C.dim, q, 15);
  }
  const q = Q(S, 1, 'Each orthonormal error is an isometric copy', 0.6, 0.3);
  if (q > 0) {
    const bx = 150, by = 280, cw = 150;
    for (let i = 0; i < 5; i++) box(bx + i * cw, by, cw - 10, 80, C.dim, q, 1.5, 'rgba(0,0,0,0.4)');
    const s1 = Q(S, 1, 'isometric copy of the qubit', 0.6);
    fillBox(bx, by, 2 * cw - 10, 80, C.gold, s1 * 0.35); rect63(bx, by, 2 * cw - 10, 80, C.gold, s1, 2); lblG('S₁ ψ', bx + cw - 5, by + 50, C.white, s1, 22);
    const s2 = Q(S, 1, 'so two r is at most five', 0.6);
    fillBox(bx + 2 * cw, by, 2 * cw - 10, 80, C.mag, s2 * 0.35); rect63(bx + 2 * cw, by, 2 * cw - 10, 80, C.mag, s2, 2); lblG('S₂ ψ', bx + 3 * cw - 5, by + 50, C.white, s2, 22);
    lbl('no room', bx + 4 * cw + 70, by + 38, C.red, s2, 15); lbl('for S₃', bx + 4 * cw + 70, by + 62, C.red, s2, 15);
    chip(530, 430, 760, 58, 'S_j* S_k = δ_jk I  ⇒  2r ≤ 5  ⇒  r ≤ 2', C.gold, s2, 23);
    const gq = Q(S, 1, 'the syndrome has dimension at most two', 0.6);
    bars63(220, 690, GRAM098, 90, 50, 260, gq, C.green, ['λ₁', 'λ₂', 'λ₃', 'λ₄']);
    lbl('Gram matrix C of a 4-Kraus correctable channel : ' + GRAM098.map(v => v.toFixed(2)).join(' , '), 530, 760, C.dim, gq, 15);
    lbl('C ≥ 0 , Tr C = 1 , rank C ≤ 2', 720, 560, C.green, gq, 18);
    const wq = Q(S, 1, 'Every error acts as W of X tensor tau', 0.6);
    chip(1390, 270, 780, 62, 'E_t(X) = W (X ⊗ τ_t) W* ,  W fixed', C.cyan, wq, 24);
    const cx = 1390, cy = 540, R = 170;
    ring(cx, cy, R, C.mag, wq, 2); lbl('syndrome disc (s_x , s_z)', cx, cy + R + 36, C.mag, wq, 16);
    const vq = Q(S, 1, 'the syndrome varies', 0.6);
    SYN098.forEach((s, i) => { const qq = clamp(vq * 1.5 - i / 6); dot(cx + R * s[0], cy - R * s[2], 10, 'm', qq); });
    lbl('τ_t varies', cx + R + 20, cy - R + 20, C.mag, vq, 17, 'left');
    const kq = Q(S, 1, 'every logical reading stays', 0.6);
    box(1600, 600, 190, 120, C.gold, kq, 2, 'rgba(40,30,0,0.4)'); lbl('logical r', 1695, 635, C.gold, kq, 17);
    lblG('(' + LOGR098.map(v => v.toFixed(2)).join(', ') + ')', 1695, 675, C.white, kq, 15);
    lbl('same for every t', 1695, 705, C.dim, kq, 14);
  }
};

/* ---- 07 STABILISATION AND THE CZX RATE (V35 §7–§8) ---- */
SCENES.stabilize = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'the frozen limit keeps a symmetric term', 'lean']]);
  const f1 = 1 - Q(S, 1, "The project's commuting idempotent CZX windows", 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'mix the identity with a syndrome reset', 0.6) * f1;
    chip(530, 270, 860, 62, 'T_κ = κ id + (1 − κ) Π ,  Π(Y) = W (R(Y) ⊗ τ*) W*', C.gold, q, 21);
    lbl('Π² = Π ,  R Π = R ,  T_κⁿ = Π + κⁿ (id − Π)', 530, 330, C.dim, q, 16);
    const lq = Q(S, 0, 'The logical state never moves', 0.6) * f1;
    chip(530, 420, 860, 58, 'encoded W(ρ_L ⊗ τ)W* :  ρ_L constant', C.cyan, lq, 23);
    const sq = Q(S, 0, 'approach their target as kappa to the n', 0.6) * f1;
    chip(530, 510, 860, 62, 's_n − s* = κⁿ (s₀ − s*)', C.mag, sq, 27);
    const kq = Q(S, 0, 'Kept content needs a summable drift budget', 0.6) * f1;
    box(150, 590, 380, 170, C.gold, kq, 2, 'rgba(40,30,0,0.35)'); lbl('kept content', 340, 630, C.gold, kq, 18); lblG('Σ d_n < ∞', 340, 690, C.white, kq, 26);
    const cq = Q(S, 0, 'correctable directions only need vanishing residual errors', 0.6) * f1;
    box(550, 590, 380, 170, C.cyan, cq, 2, 'rgba(0,30,40,0.35)'); lbl('correctable', 740, 630, C.cyan, cq, 18); lblG('b_n → 0', 740, 690, C.white, cq, 26);
    lbl('then ρ_n → σ_∞ with D(σ_∞, Πρ₀) ≤ Σ d_n', 540, 795, C.dim, cq, 15);
    const cx = 1390, cy = 500, R = 230;
    ring(cx, cy, R, C.mag, q, 2); line(cx - R, cy, cx + R, cy, C.dim, q * 0.4, 1); line(cx, cy - R, cx, cy + R, C.dim, q * 0.4, 1);
    lbl('syndrome axes (s_x , s_z) , κ = ' + KAPPA098, cx, cy + R + 40, C.mag, q, 16);
    const st = [SSTAR098[0], SSTAR098[2]];
    dot(cx + R * st[0], cy - R * st[1], 14, 'g', sq); lbl('s*', cx + R * st[0] + 20, cy - R * st[1] - 10, C.gold, sq, 20, 'left');
    TRAJ098.forEach((s, n) => { const qq = clamp(sq * 1.6 - n / 14); dot(cx + R * s[0], cy - R * s[2], n === 0 ? 13 : 8, 'm', qq); if (n > 0) { const p = TRAJ098[n - 1]; line(cx + R * p[0], cy - R * p[2], cx + R * s[0], cy - R * s[2], C.mag, qq * 0.6, 2); } });
    lbl('s₀', cx + R * TRAJ098[0][0] - 20, cy - R * TRAJ098[0][2] - 12, C.mag, sq, 20, 'right');
  }
  const q = Q(S, 1, "The project's commuting idempotent CZX windows", 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 860, 58, 'E_i commuting , idempotent , CPTP ;  L = Σ (E_i − id)', C.white, q, 21);
    const aq = Q(S, 1, 'the evolution is within one minus', 0.6);
    chip(530, 345, 860, 62, 'd_ref(e^(tL), Π) ≤ 1 − (1 − e^(−t))^m ≤ m e^(−t)', C.gold, aq, 24);
    const px = 160, py = 770, pw = 740, ph = 330, xS = x => px + x / 4 * pw, yS = v => py - v / 1.05 * ph;
    plotAxes(px, py, pw, ph, aq, 't', 'distance to the limit');
    curve(p => { const x = 0.05 + p * 3.95; return [xS(x), yS(1 - Math.pow(1 - Math.exp(-x), 2))]; }, 80, C.gold, aq, 3);
    const mq = Q(S, 1, 'at most m e to the minus t', 0.6);
    curve(p => { const x = 0.7 + p * 3.3; return [xS(x), yS(Math.min(1.05, 2 * Math.exp(-x)))]; }, 60, C.dim, mq, 2);
    lbl('m e^(−t)', xS(1.05), yS(0.72), C.dim, mq, 15, 'left');
    lbl('a(t) , m = 2', xS(2.3), yS(0.42), C.gold, aq, 16, 'left');
    CZX098.forEach(r => dot(xS(r[0]), yS(r[1]), 7, 'c', aq));
    RESET098.forEach(r => dot(xS(r[0]), yS(r[1]), 7, 'n', aq));
    lbl('cyan : CZX ring N = 4 , two windows , sampled inputs', px + pw, py - ph + 6, C.cyan, aq, 14, 'right');
    lbl('green : two qubit resets , exact SDP', px + pw, py - ph + 28, C.green, aq, 14, 'right');
    const zq = Q(S, 1, 'the frozen limit keeps a symmetric term', 0.6);
    box(1030, 250, 760, 470, C.green, zq, 2, 'rgba(0,40,20,0.3)');
    lbl('CZX ring , even N ≥ 4 , m = N/2 windows', 1410, 295, C.green, zq, 18);
    lblG('Π_N(a) = 2^(−N) [ (Tr a) I + Tr(U* a) U ]', 1410, 360, C.white, zq, 22);
    lblG('T_t( 2^(−N) (I + X^⊗N) )', 1410, 440, C.white, zq, 24);
    arrow(1410, 460, 1410, 505, C.gold, zq, 3);
    lblG('2^(−N) ( I + 2^(1−N/2) U_CZX )', 1410, 550, C.gold, zq, 26);
    lbl('not the maximally mixed state ; Tr CZ = 2^(N/2+1) for N = 4 … 10', 1410, 605, C.dim, zq, 15);
    lbl('CZXParentLindbladianSteadyState.result', 1410, 650, C.green, zq, 15);
    lbl('recomputed on N = 4 : windows commute , idempotent , limit at t = 40', 1410, 690, C.dim, zq, 14);
  }
};

/* ---- 08 FIVE FUNCTIONS AND FOUR OF FIVE (V36 §2–§3) ---- */
SCENES.basis = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For five unnormalised moments', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'reads the five modes as functions', 0.6) * f1;
    const gx = 230, gy = 300, cw = 120, ch = 64, cols = ['1', 'x', 'y', 'z', 'xy'], rows = ['∅', '2', '3', '5', '25'];
    cols.forEach((c, j) => lbl(c, gx + j * cw + cw / 2, gy - 18, C.gold, q, 20));
    rows.forEach((r, i) => lbl(r, gx - 30, gy + i * ch + 40, C.cyan, q, 19, 'right'));
    BASIS098.forEach((row, i) => row.forEach((v, j) => { const qq = clamp(q * 1.6 - (i * 5 + j) / 35); cell098(gx + j * cw, gy + i * ch, cw - 8, ch - 8, String(v), v ? C.gold : C.dim, qq, 20, v ? 0.3 : 0.05); }));
    const bq = Q(S, 0, 'form a basis', 0.6) * f1;
    lbl('rank 5 : {1, x, y, z, xy} is a basis of functions on the five modes', 530, 650, C.white, bq, 16);
    lblG('e₀ = 1 − x − y − z + xy ,  e₂ = x − xy ,  e₃ = z ,  e₅ = y − xy ,  e₂₅ = xy', 530, 690, C.dim, bq, 15);
    const eq = Q(S, 0, 'any four masses give the fifth', 0.6) * f1;
    chip(1390, 290, 780, 62, 'w_i = N − (sum of the other four)', C.green, eq, 24);
    lbl('each read mass off by ε  ⇒  missing mass off by at most 4ε', 1390, 350, C.dim, eq, 15);
    const lq = Q(S, 0, 'but a sum check cannot locate a wrong reading', 0.6) * f1;
    box(1030, 420, 720, 260, C.red, lq, 2, 'rgba(40,0,10,0.3)');
    lblG('y = p + δ e_i = q + δ e_j', 1390, 480, C.white, lq, 26);
    lbl('p with reading i corrupted , or q with reading j ?', 1390, 530, C.dim, lq, 16);
    stamp('ERASURE ≠ CORRECTION', 1390, 620, lq, C.red, 26, -0.04);
  }
  const q = Q(S, 1, 'For five unnormalised moments', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 860, 58, 'μ = (N, X, Y, Z, K) ,  w = (N − X − Y − Z + K, X − K, Z, Y − K, K)', C.white, q, 18);
    const tq = Q(S, 1, 'fix the cross ratio of the base corners', 0.6);
    chip(530, 345, 860, 62, '(N − X − Y − Z + K) K = ϑ (X − K)(Y − K)', C.gold, tq, 22);
    lblG('fixed cross ratio  w₀ w₂₅ / (w₂ w₅) = ϑ', 530, 400, C.dim, tq, 17);
    const oq = Q(S, 1, 'At ratio one, N minus Z, times K, equals X Y', 0.6);
    chip(530, 465, 860, 66, 'ϑ = 1 :   (N − Z) K = X Y', C.green, oq, 30);
    const dq = Q(S, 1, 'any four moments of one scale determine the fifth', 0.6);
    const dec = ['K = XY/(N − Z)', 'X = (N − Z)K/Y', 'Y = (N − Z)K/X', 'N = Z + XY/K', 'Z = N − XY/K'];
    dec.forEach((s, i) => { const qq = clamp(dq * 1.6 - i / 6); cell098(150 + (i % 3) * 260, 545 + Math.floor(i / 3) * 80, 240, 64, s, C.cyan, qq, 18); });
    lbl('each partial derivative has a fixed sign on the open positive cone', 530, 725, C.dim, dq, 15);
    const ex = FF098;
    box(1030, 250, 720, 240, C.gold, dq, 2, 'rgba(40,30,0,0.3)');
    lbl('example , ratio one', 1390, 290, C.gold, dq, 18);
    const nm = ['N', 'X', 'Y', 'Z', 'K'];
    nm.forEach((s, i) => { cell098(1060 + i * 136, 320, 120, 64, s, C.white, dq, 22, 0.08); cell098(1060 + i * 136, 395, 120, 64, ex[i].toFixed(2), i === 4 ? C.green : C.cyan, dq, 22); });
    lbl('K = 0.4 × 0.3 / 0.8 = 0.15', 1390, 485, C.green, dq, 16);
    const nq = Q(S, 1, 'normalised ratios alone lose the total', 0.6);
    box(1030, 540, 720, 200, C.red, nq, 2, 'rgba(40,0,10,0.3)');
    lblG('(1 − X̄ − Ȳ − Z̄ + K̄) K̄ = ϑ (X̄ − K̄)(Ȳ − K̄)', 1390, 600, C.white, nq, 20);
    lbl('contains no N : scaling μ keeps every ratio', 1390, 645, C.dim, nq, 16);
    stamp('KEEP THE SCALE', 1390, 705, nq, C.red, 24, -0.04);
  }
};

/* ---- 09 THE HIDDEN RELATION CHI (V36 §4) ---- */
SCENES.chi = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'The log cross ratio chi is a bijection', 'lean'], [0, 'and its slope is at least', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'The sharp bound', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Fix the three axes and let the joint mass move', 0.6) * f1;
    chip(530, 265, 860, 58, 'p(k) = (w − X − Y + k , X − k , Z , Y − k , k) ,  w = 1 − Z', C.white, q, 19);
    lbl('fibre drawn : (X, Y, Z) = (0.3 , 0.25 , 0.2) ,  0.0 < k < 0.25', 530, 320, C.dim, q, 15);
    const px = 160, py = 760, pw = 740, ph = 380, k0 = CHI098[0][0], k1 = CHI098[CHI098.length - 1][0];
    const xS = k => px + (k - k0) / (k1 - k0) * pw, yS = v => py - ph / 2 - v / 14 * ph;
    const cq = Q(S, 0, 'is a bijection onto the real line', 0.6) * f1;
    plotAxes(px, py, pw, ph, cq, 'joint mass k', 'χ(k)');
    line(px, yS(0), px + pw, yS(0), C.dim, cq * 0.5, 1);
    const CHIV = CHI098.filter(r => Math.abs(r[1]) < 6.9);
    curve(p => { const r = CHIV[Math.min(CHIV.length - 1, Math.round(p * (CHIV.length - 1)))]; return [xS(r[0]), yS(r[1])]; }, CHIV.length - 1, C.cyan, cq, 3);
    dot(xS(KSTAR098), yS(0), 11, 'g', cq); lbl('k* = XY/w', xS(KSTAR098) + 14, yS(0) + 30, C.gold, cq, 16, 'left');
    lbl('→ +∞', px + pw + 12, py - ph + 26, C.cyan, cq, 16, 'left'); lbl('−∞ ←', px + 40, py - 6, C.cyan, cq, 16, 'left');
    const lq = Q(S, 0, 'the frozen mixed-coordinate chart', 0.6) * f1;
    box(1030, 250, 760, 230, C.green, lq, 2, 'rgba(0,40,20,0.3)');
    lblG('χ = log ( w₀ w₂₅ / (w₂ w₅) )', 1410, 300, C.white, lq, 26);
    lbl('every interior (X, Y, Z) and every χ ∈ ℝ :', 1410, 350, C.green, lq, 17);
    lbl('exactly one strictly positive law', 1410, 380, C.green, lq, 17);
    lbl('FiveModeMixedCoordinates.mixed_coordinates_global_chart', 1410, 425, C.dim, lq, 14);
    const sq = Q(S, 0, 'its slope is at least sixteen over w', 0.6) * f1;
    chip(1410, 540, 760, 64, "χ′(k) = 1/p₀ + 1/p₂₅ + 1/p₂ + 1/p₅ ≥ 16/w", C.gold, sq, 24);
    lbl('Cauchy–Schwarz on four base masses summing to w', 1410, 600, C.dim, sq, 15);
    chip(1410, 680, 760, 58, 'TV(p, p̃) = 2|k − k̃| ≤ (w/8) |χ − χ̃|', C.cyan, sq, 22);
  }
  const q = Q(S, 1, 'The sharp bound', 0.6, 0.3);
  if (q > 0) {
    const px = 160, py = 770, pw = 760, ph = 440, xS = x => px + x / 12 * pw, yS = v => py - v / 0.85 * ph;
    plotAxes(px, py, pw, ph, q, '|χ − χ̃|', 'TV on one fibre (w = 0.8)');
    const bq = Q(S, 1, 'at most w times tanh of their chi difference over eight', 0.6);
    curve(p => { const x = p * 12; return [xS(x), yS(0.8 * Math.tanh(x / 8))]; }, 80, C.gold, bq, 3);
    curve(p => { const x = p * 8; return [xS(x), yS(0.8 * x / 8)]; }, 40, C.dim, bq * 0.7, 1.5);
    lbl('linear bound (w/8)|Δχ|', xS(5.6), yS(0.62), C.dim, bq, 14, 'right');
    lbl('w tanh(|Δχ|/8)', xS(11.6), yS(0.8 * Math.tanh(11.6 / 8)) - 16, C.gold, bq, 17, 'right');
    TANHS098.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 5, 'c', clamp(q * 1.6 - i / 200)));
    lbl('cyan : 160 random pairs on the fibre (0.3 , 0.25 , 0.2)', 1410, 700, C.cyan, q, 15);
    const eq = Q(S, 1, 'with equality attained', 0.6);
    TANHA098.forEach(r => { if (r[0] <= 12) dot(xS(r[0]), yS(r[1] * 0.8 / 0.8), 11, 'm', eq); });
    lbl('magenta : X = Y = w/2 , χ = ± c  give equality', 1410, 730, C.mag, eq, 15);
    chip(1410, 300, 760, 64, 'TV(p, p̃) ≤ w tanh( |χ − χ̃| / 8 )', C.gold, bq, 26);
    lbl('Jensen for log(1 + h/a) over four base masses', 1410, 360, C.dim, bq, 15);
    const mq = Q(S, 1, 'From the maximum-entropy law, chi zero', 0.6);
    chip(1410, 460, 760, 58, 'max entropy :  χ = 0 ,  k* = X Y / w', C.cyan, mq, 23);
    const tq = Q(S, 1, 'it is w over two times tanh of chi over four', 0.6);
    chip(1410, 550, 760, 64, 'TV(p, p*) ≤ (w/2) tanh( |χ| / 4 )', C.green, tq, 26);
    lbl('attained at X = Y = w/2 ; the completion is a rule , not a fixed channel', 1410, 610, C.dim, tq, 14);
  }
};

/* ---- 10 CLOSURE AND THE RESULT–ERROR RELATION (V36 §5–§6) ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Results and errors also form a positive relation', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Recursion first needs closure', 0.6) * f1;
    const sq = 150, cx = 480, cy = 470;
    const corners = [[cx - sq, cy + sq, '∅', C.white], [cx + sq, cy + sq, '2', C.cyan], [cx + sq, cy - sq, '25', C.green], [cx - sq, cy - sq, '5', C.mag]];
    strokePoly(corners.map(c => [c[0], c[1]]), C.cyan, q * 0.7, 2);
    corners.forEach(([x, y, s, col]) => { dot(x, y, 15, 'c', q); lbl(s, x + (x < cx ? -26 : 26), y + 8, col, q, 22, x < cx ? 'right' : 'left'); });
    lbl('hidden direction (1, −1, 0, −1, 1)', cx, cy + sq + 60, C.dim, q, 16);
    const iq = Q(S, 0, 'satisfy the four-corner identity', 0.6) * f1;
    [[corners[0], corners[2], C.gold], [corners[1], corners[3], C.mag]].forEach(([a1, a2, col], j) => { dashed(a1[0], a1[1], a2[0], a2[1], col, iq, 2.5); });
    chip(cx, 260, 620, 60, 'Φ₀ + Φ₂₅ = Φ₂ + Φ₅', C.gold, iq, 28);
    lbl('Φ_s = Σ_t T_ts v_t , the next means of mode s', cx, 760, C.dim, iq, 15);
    const pq = Q(S, 0, 'phi zero plus phi twenty-five equals phi two plus phi five', 0.6) * f1;
    box(1030, 250, 760, 520, C.red, pq, 2, 'rgba(40,0,10,0.25)');
    lbl('a non-closed update : corner sum ' + '(' + SPLIT098.corner.join(', ') + ')', 1410, 290, C.red, pq, 16);
    const rowsC = [['now , both laws', SPLIT098.now, C.white], ['next , law A', SPLIT098.A, C.cyan], ['next , law B', SPLIT098.B, C.mag]];
    rowsC.forEach(([nm, v, col], i) => { const y = 330 + i * 130; lbl(nm, 1060, y + 40, col, pq, 17, 'left'); ['X', 'Y', 'Z'].forEach((s, j) => cell098(1290 + j * 150, y + 10, 136, 60, s + ' = ' + v[j].toFixed(3), col, pq, 18)); });
    stamp('SAME MEANS , DIFFERENT FUTURES', 1410, 718, pq, C.red, 20, -0.03);
  }
  const q = Q(S, 1, 'Results and errors also form a positive relation', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 860, 58, 'ψ = x + e :  p = ‖x‖² , q = ‖e‖² , c = ⟨e, x⟩ ,  S = p + q', C.white, q, 19);
    const rq = Q(S, 1, 'the relative error squared is one minus r z', 0.6);
    chip(530, 355, 860, 66, '‖e‖² / ‖ψ‖² = (1 − r_z) / (2 (1 + r_x))', C.gold, rq, 27);
    lbl('‖ψ‖² = S (1 + r_x) ;  stable while 1 + r_x ≥ γ > 0', 530, 420, C.dim, rq, 15);
    const hq = Q(S, 1, 'a steady normalised direction can hide a cancelling error', 0.6);
    box(150, 480, 760, 270, C.red, hq, 2, 'rgba(40,0,10,0.3)');
    lblG('x = M u ,  e = (1 − M) u ,  ψ = u', 530, 535, C.white, hq, 24);
    lblG('r → (−1, 0, 0)   but   ‖e‖ = M − 1 → ∞', 530, 590, C.white, hq, 22);
    lbl('1 + r_x → 0 : exactly where recovery is ill-conditioned', 530, 635, C.dim, hq, 15);
    stamp('STEADY AXES , UNBOUNDED ERROR', 530, 705, Q(S, 1, 'that grows without bound', 0.6), C.red, 20, -0.03);
    const px = 1040, py = 760, pw = 700, ph = 440, xS = M => px + M / 62 * pw;
    const yE = v => py - v / 62 * ph, yR = v => py - (v + 1) / 0.6 * ph;
    plotAxes(px, py, pw, ph, hq, 'M', 'gold : ‖e‖ (0 … 62)    cyan : 1 + r_x (0 … 0.6)');
    curve(p => { const M = 1.5 + p * 58.5; return [xS(M), yE(M - 1)]; }, 60, C.gold, hq, 3);
    CANC098.forEach(r => { dot(xS(r[0]), yE(r[1]), 7, 'g', hq); dot(xS(r[0]), yR(r[2]), 7, 'c', hq); });
    curve(p => { const M = 1.5 + p * 58.5, Sv = M * M + (M - 1) * (M - 1); return [xS(M), yR(-1 + 1 / Sv)]; }, 60, C.cyan, hq, 2.5);
    lbl('‖e‖ = M − 1', xS(40), yE(39) - 14, C.gold, hq, 16, 'right');
    lbl('1 + r_x = 1/S → 0', xS(30), yR(-1 + 0.06) - 12, C.cyan, hq, 16);
  }
};

/* ---- 11 ERROR SERIES AND RATES (V36 §7–§8) ---- */
SCENES.series = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'With varying rates', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'If the target solves x equals b plus A x', 0.6) * f1;
    chip(530, 265, 860, 58, 'x* = b + A x* ,  ‖A‖ ≤ q < 1', C.white, q, 24);
    const rq = Q(S, 0, 'the computable defect r gives the unknown error exactly', 0.6) * f1;
    chip(530, 350, 860, 62, 'r = b + A x − x   ⇒   e = x* − x = Σ_(j≥0) Aʲ r', C.gold, rq, 23);
    const bq = Q(S, 0, 'at most r over one minus q', 0.6) * f1;
    chip(530, 440, 860, 62, '‖e‖ ≤ ‖r‖ / (1 − q) ,   tail after m terms ≤ qᵐ ‖r‖ / (1 − q)', C.green, bq, 21);
    box(150, 520, 760, 230, C.mag, bq, 2, 'rgba(40,0,40,0.3)');
    lbl('the same pattern on a fixed fibre', 530, 560, C.mag, bq, 17);
    lblG('T_κ = κ I + (1 − κ) p* 1ᵀ ,  Tⁿp = p* + κⁿ (p − p*)', 530, 610, C.white, bq, 19);
    lbl('means kept ; chi moves to the target :  ' + FIBS098.slice(0, 6).map(r => r[1].toFixed(2)).join(' → '), 530, 655, C.dim, bq, 14);
    lbl('orthogonal refinements : ‖e_n‖² = ‖e_∞‖² + Σ_(j≥n) ‖Δ_j‖²', 530, 705, C.dim, bq, 14);
    const px = 1040, py = 760, pw = 700, ph = 440, xS = m => px + m / 15 * pw, yS = v => py - (Math.log10(v) + 7) / 9 * ph;
    plotAxes(px, py, pw, ph, rq, 'terms m', '‖e − partial sum‖  (log , q = 0.6)');
    curve(p => { const m = p * 15; const r0 = NEU098[0][2]; return [xS(m), yS(r0 * Math.pow(0.6, m))]; }, 60, C.gold, bq, 3);
    NEU098.forEach(r => dot(xS(r[0]), yS(Math.max(1e-7, r[1])), 7, 'c', rq));
    lbl('bound qᵐ ‖r‖/(1 − q)', xS(14.5), yS(NEU098[0][2] * Math.pow(0.6, 13)) - 18, C.gold, bq, 15, 'right');
    lbl('random 6×6 A , ‖A‖ = 0.6', px + 20, py - ph + 10, C.cyan, rq, 14, 'left');
    [['10', 10], ['0.1', 0.1], ['10⁻³', 0.001], ['10⁻⁵', 1e-5], ['10⁻⁷', 1e-7]].forEach(([s_, v]) => lbl(s_, px - 10, yS(v) + 5, C.dim, rq, 13, 'right'));
  }
  const q = Q(S, 1, 'With varying rates', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 860, 60, 'T_n = Π + κ_n Q :  T_(n−1) ⋯ T₀ = Π + (∏ κ_j) Q', C.white, q, 21);
    const dq = Q(S, 1, 'exactly when the sum of one minus kappa n diverges', 0.6);
    chip(530, 350, 860, 64, '∏ κ_n = 0   ⇔   Σ (1 − κ_n) = ∞', C.gold, dq, 28);
    const hq = Q(S, 1, 'gives one over n plus one', 0.6);
    lblG('κ_n = (n + 1)/(n + 2)  ⇒  ∏ = 1/(n + 1) : no uniform gap needed', 530, 430, C.white, hq, 18);
    const iq = Q(S, 1, 'Yet injected errors c over n plus two', 0.6);
    chip(530, 520, 860, 62, 'D_(n+1) ≤ κ_n D_n + η_n ,  η_n = c/(n + 2)  ⇒  D_n = (D₀ + c n)/(n + 1)', C.red, iq, 18);
    lbl('enough :  Σ(1 − κ_n) = ∞  and  η_n / (1 − κ_n) → 0', 530, 590, C.green, iq, 17);
    stamp('RESIDUAL c REMAINS', 530, 690, Q(S, 1, 'leave residual c', 0.6), C.red, 28, -0.04);
    const px = 1040, py = 760, pw = 700, ph = 440, xS = n => px + n / 60 * pw, yS = v => py - v / 1.05 * ph;
    plotAxes(px, py, pw, ph, hq, 'n', 'D_n , κ_n = (n+1)/(n+2) , D₀ = 1');
    curve(p => { const n = p * 60; return [xS(n), yS(1 / (n + 1))]; }, 80, C.dim, hq, 2);
    lbl('grey : no injection , 1/(n+1)', px + 20, py - ph + 58, C.dim, hq, 14, 'left');
    INJ098.forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'r', iq));
    dashed(px, yS(INJC098), px + pw, yS(INJC098), C.red, iq, 1.8); lbl('c = 0.3', px + pw - 6, yS(INJC098) - 12, C.red, iq, 16, 'right');
    CONV098.forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'n', iq));
    lbl('red : η_n = 0.3/(n+2)  →  0.3', px + 20, py - ph + 10, C.red, iq, 14, 'left');
    lbl('green : η_n = 0.3/(n+2)^1.5  →  0', px + 20, py - ph + 34, C.green, iq, 14, 'left');
  }
};

/* ---- 12 HISTORIES AND FINITE READOUTS (V36 §9–§10) ---- */
SCENES.history = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'For a norm-compact family', 'lean'], [1, 'for all point differences on an infinite space', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Errors must also be readable', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "The project's own histories form a series", 0.6) * f1;
    const bx = 170, by = 730, bw = 70, gap = 18, hs = 56;
    HISTA098.forEach((v, L) => { const qq = clamp(q * 1.7 - L / 10), h = (Math.log10(v) + 0.3) * hs, x = bx + L * (bw + gap); fillBox(x, by - h, bw, h, C.gold, qq * 0.45); rect63(x, by - h, bw, h, C.gold, qq, 1.6); lbl(String(v), x + bw / 2, by - h - 10, C.white, qq, v > 9999 ? 12 : 15); lbl('L=' + L, x + bw / 2, by + 26, C.dim, qq, 14); });
    lbl('histories of length L (log height)', 540, by + 55, C.dim, q, 15);
    const fq = Q(S, 0, 'F of three L plus two of length L', 0.6) * f1;
    chip(540, 270, 820, 58, 'a_L = F(3L+2) ,  a_(L+2) = 4 a_(L+1) + a_L', C.gold, fq, 23);
    lblG('Z(t) = Σ a_L t^L = (1 + t) / (1 − 4t − t²)', 540, 340, C.white, fq, 22);
    const rq = Q(S, 0, 'normalise exactly when t is below root five minus two', 0.6) * f1;
    chip(1390, 270, 780, 62, '0 ≤ t < √5 − 2 = 0.23607', C.green, rq, 27);
    lbl('growth (2 + √5)^L ; at the boundary the terms tend to (3 + √5)/(2√5)', 1390, 330, C.dim, rq, 14);
    const tq = Q(S, 0, 'with an exact tail', 0.6) * f1;
    chip(1390, 410, 780, 60, 'P_t(|h| > m) = t^(m+1) (a_(m+1) + t a_m) / (1 + t)', C.cyan, tq, 21);
    const px = 1050, py = 770, pw = 690, ph = 270, xS = m => px + m / 12 * pw, yS = v => py - v / 0.9 * ph;
    plotAxes(px, py, pw, ph, tq, 'cut m', 'tail mass at t = 0.2');
    HTAIL098.forEach((r, i) => { const qq = clamp(tq * 1.6 - i / 16); line(xS(r[0]), yS(0), xS(r[0]), yS(r[1]), C.cyan, qq * 0.5, 2); dot(xS(r[0]), yS(r[1]), 7, 'c', qq); });
    lbl('0.8667 , 0.7333 , 0.6213 , …  (Z(0.2) = 7.5)', px + pw, py - ph + 4, C.cyan, tq, 14, 'right');
  }
  const q = Q(S, 1, 'Errors must also be readable', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'For a norm-compact family of signed errors', 0.6);
    box(150, 250, 760, 330, C.green, cq, 2, 'rgba(0,40,20,0.3)');
    lbl('compact , zero-dimensional X ; finite sensors q_i separate points', 530, 295, C.green, cq, 16);
    lbl('{ Λ_(s_a) } compact in operator norm', 530, 330, C.green, cq, 16);
    lblG('‖s_a‖ − ε  <  ‖(q_J)_* s_a‖  ≤  ‖s_a‖', 530, 410, C.white, cq, 28);
    lbl('one finite J for every a', 530, 455, C.gold, cq, 18);
    lbl('FiniteObservationVariation.exists_uniform_finite_readout_variation', 530, 510, C.dim, cq, 13);
    lbl('it gives no budget , algorithm or depth cost', 530, 545, C.dim, cq, 14);
    const dq = Q(S, 1, 'for all point differences on an infinite space', 0.6);
    const tx = 1390, ty = 270, depth = 4;
    for (let d = 0; d < depth; d++) { const n = 1 << d; for (let i = 0; i < n; i++) { const x = tx + (i - (n - 1) / 2) * (640 / n), y = ty + d * 90; dot(x, y, 8, d < 2 ? 'g' : 'c', dq); if (d + 1 < depth) [0, 1].forEach(b => { const x2 = tx + (2 * i + b - (2 * n - 1) / 2) * (640 / (2 * n)); line(x, y, x2, y + 90, d < 1 ? C.gold : C.dim, dq * 0.7, d < 1 ? 2.5 : 1.5); }); } }
    dashed(1050, ty + 45, 1730, ty + 45, C.gold, dq, 1.5); lbl('readout J : first coordinate only', 1050, ty + 30, C.gold, dq, 14, 'left');
    const x1 = tx + (4 - 3.5) * 80, x2 = tx + (5 - 3.5) * 80;
    ring(x1, ty + 270, 16, C.mag, dq, 3); ring(x2, ty + 270, 16, C.mag, dq, 3);
    lblG('x ≠ y , same readout', tx, ty + 330, C.mag, dq, 20);
    chip(tx, ty + 400, 740, 58, '(q_J)_* (δ_x − δ_y) = 0 ,   ‖δ_x − δ_y‖ = 2', C.red, dq, 21);
    stamp('NO FIXED FINITE READOUT', tx, ty + 500, Q(S, 1, 'no fixed finite readout suffices', 0.6), C.red, 24, -0.04);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'lean'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['BALL', '1 − |r|² = 4det/N²', C.gold, 'A total and a ball'], ['GATES', 'a b_C = b_A b_B', C.cyan, 'quaternion gates'], ['SYNDROME', 'r ≤ 2 , κⁿ', C.mag, 'a syndrome of at most two'], ['FOUR OF FIVE', '(N − Z)K = XY', C.green, 'four-of-five'], ['TANH', 'w tanh(Δχ/8)', C.red, 'a sharp tanh bound'], ['SERIES', 'Σ Aʲ r , √5 − 2', C.vio, 'error series and finite readouts']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 19); });
    lbl('LEAN-FROZEN PROJECT THEOREMS · finite Kraus exact-recovery pair · five-mode mixed-coordinate chart · CZX steady-state limit · uniform finite readout', W / 2, 470, C.green, Q(S, 1, 'are frozen in Lean') * fade, 15);
    lbl('CLASSICAL · Bloch ball · Pauli algebra · Cauchy–Schwarz · Jensen · Neumann series · Knill–Laflamme / Nayak–Sen (named in V35)', W / 2, 515, '#8fbcff', Q(S, 1, 'the mixed-coordinate chart') * fade, 15);
    lbl('VOLUMES · hidden error · closure · two-axis relation · drift · r ≤ 2 · syndrome contraction · CZX rate · four of five · tanh bounds · Gram error · rates · history tail', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · 56 016 sampled and finite checks · CZX N = 4 windows · SDP distances · Fibonacci histories · fibre pairs · Neumann tails', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('THE TWO VOLUMES THEMSELVES HAVE NO DIGESTION RECORDS AT THE SUBJECT COMMIT', W / 2, 690, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V35–V36 · ERROR AXES', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V35–V36 · 三轴误差、四推一恢复与误差级数 · TRURETURING FILM 098', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt("Keep an error's size, close its axes, park it in a syndrome, and sum the rest.", W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V35–V36', bloch: 'TOTAL AND BALL', hidden: 'HIDDEN ERROR', gates: 'QUATERNION GATES', drift: 'DRIFT AND BUDGET', syndrome: 'SYNDROME ≤ 2', stabilize: 'STABILISATION', basis: 'FOUR OF FIVE', chi: 'SHARP TANH BOUND', closure: 'CLOSURE', series: 'ERROR SERIES', history: 'HISTORIES AND READOUTS', finale: 'LEDGER' });

function poster098() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('a · b_C = b_A · b_B', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('(N − Z) K = X Y', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('TV ≤ w tanh(|Δχ|/8) · r ≤ 2', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V35–V36', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V35–V36 · ERROR AXES', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('三 轴 误 差 · 四 推 一 恢 复 · 误 差 级 数', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 098', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster098;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
