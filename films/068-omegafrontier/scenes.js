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

/* ---- film 068: AURIC Omega VI · population elimination and finite-root frontier ---- */
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
const _po68 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po68.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po68.set(key, off); }
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

/* ---- film 068 helpers ---- */
const DOM68 = {"light": {"smax": 1.0, "pts": [[0.01552, 0.01552, 0.03103], [0.03103, 0.03103, 0.06207], [0.04655, 0.04655, 0.0931], [0.06207, 0.06207, 0.12414], [0.07759, 0.07759, 0.15517], [0.0931, 0.0931, 0.18621], [0.10862, 0.10862, 0.21724], [0.12414, 0.12414, 0.24828], [0.13966, 0.13966, 0.27931], [0.15517, 0.15517, 0.31034], [0.17069, 0.17069, 0.34138], [0.18621, 0.18621, 0.37241], [0.20172, 0.20172, 0.40345], [0.21724, 0.21724, 0.43448], [0.23276, 0.23276, 0.46552], [0.24828, 0.24828, 0.49655], [0.26379, 0.26379, 0.52759], [0.27931, 0.27931, 0.55862], [0.29483, 0.29483, 0.58966], [0.31034, 0.31034, 0.62069], [0.32586, 0.32586, 0.65172], [0.34138, 0.34138, 0.68276], [0.3569, 0.3569, 0.71379], [0.37241, 0.37241, 0.74483], [0.38793, 0.38793, 0.77586], [0.40345, 0.40345, 0.8069], [0.41897, 0.41897, 0.83793], [0.43448, 0.43448, 0.86897], [0.45, 0.45, 0.9], [0.45, 0.45, 0.9], [0.45085, 0.45085, 0.90169], [0.45169, 0.45169, 0.90339], [0.45254, 0.45254, 0.90508], [0.45339, 0.45339, 0.90678], [0.45424, 0.45424, 0.90847], [0.45508, 0.45508, 0.91017], [0.45593, 0.45593, 0.91186], [0.45678, 0.45678, 0.91356], [0.45763, 0.45763, 0.91525], [0.45847, 0.45847, 0.91695], [0.45932, 0.45932, 0.91864], [0.46017, 0.46017, 0.92034], [0.46102, 0.46102, 0.92203], [0.46186, 0.46186, 0.92373], [0.46271, 0.46271, 0.92542], [0.46356, 0.46356, 0.92712], [0.46441, 0.46441, 0.92881], [0.46525, 0.46525, 0.93051], [0.4661, 0.4661, 0.9322], [0.46695, 0.46695, 0.9339], [0.4678, 0.4678, 0.93559], [0.46864, 0.46864, 0.93729], [0.46949, 0.46949, 0.93898], [0.47034, 0.47034, 0.94068], [0.47119, 0.47119, 0.94237], [0.47203, 0.47203, 0.94407], [0.47288, 0.47288, 0.94576], [0.47373, 0.47373, 0.94746], [0.47458, 0.47458, 0.94915], [0.47542, 0.47542, 0.95085], [0.47627, 0.47627, 0.95254], [0.47712, 0.47712, 0.95424], [0.47797, 0.47797, 0.95593], [0.47881, 0.47881, 0.95763], [0.47966, 0.47966, 0.95932], [0.48051, 0.48051, 0.96102], [0.48136, 0.48136, 0.96271], [0.4822, 0.4822, 0.96441], [0.48305, 0.48305, 0.9661], [0.4839, 0.4839, 0.9678], [0.48475, 0.48475, 0.96949], [0.48559, 0.48559, 0.97119], [0.48644, 0.48644, 0.97288], [0.48729, 0.48729, 0.97458], [0.48814, 0.48814, 0.97627], [0.48898, 0.48898, 0.97797], [0.48983, 0.48983, 0.97966], [0.49068, 0.49068, 0.98136], [0.49153, 0.49153, 0.98305], [0.49237, 0.49237, 0.98475], [0.49322, 0.49322, 0.98644], [0.49407, 0.49407, 0.98814], [0.49492, 0.49492, 0.98983], [0.49954, 0.49199, 0.99153], [0.51224, 0.48098, 0.99322], [0.52891, 0.46601, 0.99492], [0.54112, 0.45549, 0.99661], [0.5549, 0.4434, 0.99831], [0.6, 0.4, 1.0]]}, "heavy": {"smax": 0.9798, "pts": [[0.0152, 0.0152, 0.03041], [0.03041, 0.03041, 0.06081], [0.04561, 0.04561, 0.09122], [0.06081, 0.06081, 0.12163], [0.07602, 0.07602, 0.15204], [0.09122, 0.09122, 0.18244], [0.10643, 0.10643, 0.21285], [0.12163, 0.12163, 0.24326], [0.13683, 0.13683, 0.27367], [0.15204, 0.15204, 0.30407], [0.16724, 0.16724, 0.33448], [0.18244, 0.18244, 0.36489], [0.19765, 0.19765, 0.3953], [0.21285, 0.21285, 0.4257], [0.22806, 0.22806, 0.45611], [0.24326, 0.24326, 0.48652], [0.25846, 0.25846, 0.51693], [0.27367, 0.27367, 0.54733], [0.28887, 0.28887, 0.57774], [0.30407, 0.30407, 0.60815], [0.31928, 0.31928, 0.63856], [0.33448, 0.33448, 0.66896], [0.35633, 0.34304, 0.69937], [0.40541, 0.32437, 0.72978], [0.46222, 0.29797, 0.76019], [0.52832, 0.26227, 0.79059], [0.58355, 0.23745, 0.821], [0.63225, 0.21916, 0.85141], [0.6772, 0.20461, 0.88182], [0.6772, 0.20461, 0.88182], [0.67958, 0.2039, 0.88348], [0.68195, 0.20319, 0.88514], [0.68431, 0.20249, 0.8868], [0.68667, 0.20179, 0.88846], [0.68902, 0.2011, 0.89012], [0.69136, 0.20042, 0.89178], [0.69429, 0.19915, 0.89344], [0.69825, 0.19685, 0.8951], [0.70223, 0.19453, 0.89676], [0.70625, 0.19217, 0.89842], [0.71031, 0.18978, 0.90008], [0.71439, 0.18735, 0.90174], [0.71851, 0.18489, 0.90341], [0.72267, 0.18239, 0.90507], [0.72687, 0.17986, 0.90673], [0.7311, 0.17729, 0.90839], [0.73537, 0.17468, 0.91005], [0.73967, 0.17203, 0.91171], [0.74402, 0.16935, 0.91337], [0.74842, 0.16661, 0.91503], [0.75285, 0.16384, 0.91669], [0.75733, 0.16102, 0.91835], [0.76185, 0.15816, 0.92001], [0.76643, 0.15525, 0.92167], [0.77105, 0.15229, 0.92333], [0.77572, 0.14928, 0.92499], [0.78044, 0.14621, 0.92665], [0.78522, 0.1431, 0.92832], [0.79005, 0.13992, 0.92998], [0.79494, 0.1367, 0.93164], [0.79989, 0.13341, 0.9333], [0.8049, 0.13005, 0.93496], [0.80998, 0.12664, 0.93662], [0.81512, 0.12316, 0.93828], [0.82034, 0.1196, 0.93994], [0.82562, 0.11598, 0.9416], [0.83098, 0.11228, 0.94326], [0.83642, 0.1085, 0.94492], [0.84195, 0.10464, 0.94658], [0.84756, 0.10069, 0.94824], [0.85326, 0.09665, 0.9499], [0.85905, 0.09251, 0.95156], [0.86495, 0.08828, 0.95323], [0.87095, 0.08394, 0.95489], [0.87706, 0.07948, 0.95655], [0.88329, 0.07491, 0.95821], [0.88965, 0.07022, 0.95987], [0.89614, 0.06539, 0.96153], [0.90277, 0.06042, 0.96319], [0.90955, 0.0553, 0.96485], [0.9165, 0.05001, 0.96651], [0.92361, 0.04456, 0.96817], [0.93092, 0.03891, 0.96983], [0.93843, 0.03306, 0.97149], [0.94616, 0.02699, 0.97315], [0.95414, 0.02067, 0.97481], [0.96238, 0.01409, 0.97647], [0.97092, 0.00721, 0.97814], [0.97979, 0.0, 0.9798]]}};
const CAND68 = [0.0, 0.068, 0.1, 0.1646, 0.1892, 0.1899, 0.1971, 0.2072, 0.2085, 0.2144, 0.2381, 0.2554, 0.269, 0.273, 0.3, 0.3228, 0.3229, 0.3235, 0.3251, 0.3343, 0.3359, 0.353, 0.3598, 0.3708, 0.3754, 0.4, 0.4101, 0.4243, 0.45];
const PASS68 = [0.068, 0.1, 0.1646, 0.1892, 0.1899];
/* best product F(x) along the first coordinate, z = (0.3, 0.25, 0.2, 0.15, 0.1), a = 0.5, b = 0.3 (XII.13), (XII.16) */
const F68 = x => { const A = 0.0625, Q = 0.55, V = 0.25, T = 1 - x, u = A / x, q = Q - x, k = Math.max(u, q), W = Math.min(V, u, T / 3, (T - k) / 2), Y = Math.max(k, (T - W) / 2), Z = T - Y - W; return x * Y * Z * W; };
function bars68(x0, y0, vals, w, gap, hs, col, a, labels) {
  if (a <= 0) return;
  vals.forEach((v, i) => { const x = x0 + i * (w + gap), h = v * hs; if (h >= 0) { fillBox(x, y0 - h, w, h, col, 0.35 * a); rect63(x, y0 - h, w, h, col, a, 1.6); } else { fillBox(x, y0, w, -h, col, 0.35 * a); rect63(x, y0, w, -h, col, a, 1.6); } if (labels) lbl(labels[i], x + w / 2, y0 + (h >= 0 ? 30 : -h + 30), col, a, 18); });
}
function mat68(x, y, cells, col, a, cw = 92) {
  if (a <= 0) return;
  line(x - 10, y - 8, x - 10, y + 164, col, a, 2.5); line(x + 2 * cw - 2, y - 8, x + 2 * cw - 2, y + 164, col, a, 2.5);
  cells.forEach((row, i) => row.forEach((s, j) => lblG(s, x + j * cw + cw / 2 - 6, y + i * 78 + 34, s === '0' ? C.dim : C.white, a, 26)));
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2), f1 = 1 - Q(S, 1, 'Part six asks which pairs a, b can occur', 0.6);
  omega63(440, 450, 150, s0, C.cyan, 7);
  pyrG64(440, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  if (f1 > 0) {
    const zq = Q(S, 0, 'Two states with the same five populations', 0.6) * f1;
    lbl('same populations z', 1060, 270, C.cyan, zq, 18);
    bars68(950, 450, [0.30, 0.25, 0.20, 0.15, 0.10], 40, 14, 500, C.cyan, zq, ['000', '100', '010', '001', '101']);
    const pq = Q(S, 0, 'differ only in a phase part with two weights', 0.6) * f1;
    lbl('phase part : spectrum (a, b, 0, −b, −a)', 1530, 270, C.mag, pq, 18);
    bars68(1400, 470, [0.5, 0.3, 0, -0.3, -0.5], 40, 14, 260, C.mag, pq, ['a', 'b', '0', '−b', '−a']);
    chip(1180, 700, 330, 60, 'one call → a', C.gold, Q(S, 0, 'One call of the installed phase reads a', 0.6) * f1, 24);
    chip(1560, 700, 330, 60, 'two calls → a + b', C.green, Q(S, 0, 'two calls read a plus b', 0.6) * f1, 24);
  }
  const q = Q(S, 1, 'Part six asks which pairs a, b can occur', 0.6, 0.3);
  if (q > 0) {
    const px = 1000, py = 760, pw = 620, ph = 420, xS = v => px + v * pw, yS = v => py - v / 0.5 * ph;
    plotAxes(px, py, pw, ph, q, null, 'second weight b'); lbl('a', px + pw + 18, py + 6, C.dim, q, 20, 'left');
    line(xS(0), yS(0), xS(0.5), yS(0.5), C.dim, q * 0.6, 1.5); line(xS(0.5), yS(0.5), xS(1), yS(0), C.dim, q * 0.6, 1.5);
    lbl('b ≤ a', xS(0.24), yS(0.3), C.dim, q, 18); lbl('a + b ≤ 1', xS(0.82), yS(0.3), C.dim, q, 18);
    lblG('which (a, b) for this z ?', xS(0.5), yS(0.12), C.white, q, 28);
    stamp('NO SEARCH', 1650, 330, Q(S, 1, 'answers without any search', 0.5), C.gold, 40, -0.06);
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 300, 58, 'five populations', C.cyan, rp, 22); chip(330, 445, 300, 58, 'one candidate', C.gold, rp, 22); chip(330, 530, 300, 58, 'two tests', C.mag, rp, 22);
  box(1440, 340, 340, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('frontier', 1610, 410, C.green, rp, 24); lblG('H = max of roots', 1610, 470, C.white, rp, 26);
  txt(scramble('AURIC Ω VI · FRONTIER', rp, 468), W / 2, 760, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('AURIC Ω 第 六 部 · 全 人 口 消 去 与 有 限 根 前 沿', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 068 · AURIC_OMEGA_STATIC_COMPATIBILITY_FIBER_FINITE_ROOT_CONTINUATION', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 INTERFACE ---- */
SCENES.interface = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Finding such a spectrum is a search', 0.6);
  const rq = Q(S, 0, 'four numbers x, y, xi and w', 0.6);
  lbl('shared real part : spectrum r', 520, 270, C.cyan, rq, 20);
  bars68(360, 640, [0.42, 0.28, 0.18, 0.12], 70, 24, 800, C.cyan, rq, ['x', 'y', 'ξ', 'w']);
  if (f1 > 0) {
    const bq = Q(S, 0, 'Three population bounds', 0.6) * f1, iq = Q(S, 0, 'and four product inequalities', 0.6) * f1;
    ['x ≥ P', 'x + y ≥ Q', 'w ≤ V'].forEach((s, i) => chip(1100, 330 + i * 80, 280, 60, s, C.cyan, bq * clamp(bq * 3 - i), 24));
    ['x y ≥ A', 'x w ≥ B', 'y ξ ≥ B', 'x y ξ w ≥ A B'].forEach((s, i) => chip(1500, 330 + i * 80, 320, 60, s, C.gold, iq * clamp(iq * 4 - i), 24));
    lbl('A = a²/4 ,  B = b²/4', 1500, 670, C.dim, iq, 20);
    lblG('one and the same r for all seven', 1300, 760, C.white, Q(S, 0, 'for one and the same spectrum', 0.6) * f1, 28);
  }
  const q = Q(S, 1, 'Finding such a spectrum is a search', 0.6, 0.3);
  if (q > 0) {
    const cx = 1300, cy = 520, R = 260, tri = [[cx, cy - R], [cx - R * 0.87, cy + R * 0.5], [cx + R * 0.87, cy + R * 0.5]];
    strokePoly(tri, C.dim, q, 1.5); fillPoly(tri, C.vio, 0.06 * q);
    lbl('three free coordinates', cx, cy + R * 0.5 + 44, C.dim, q, 18);
    const cq = Q(S, 1, 'This volume replaces the search by a single candidate', 0.8);
    for (let k = 0; k < 60; k++) { const r1 = (Math.sin(k * 12.9898 + 1.3) * 43758.5453) % 1, r2 = (Math.sin(k * 78.233 + 4.1) * 12345.678) % 1; let p = Math.abs(r1), w2 = Math.abs(r2); if (p + w2 > 1) { p = 1 - p; w2 = 1 - w2; } const x = tri[0][0] * (1 - p - w2) + tri[1][0] * p + tri[2][0] * w2, y = tri[0][1] * (1 - p - w2) + tri[1][1] * p + tri[2][1] * w2; dot(x, y, 5, 'n', q * (0.5 + 0.5 * Math.sin(t * 3 + k)) * (1 - cq)); }
    lbl('search', cx - R * 0.6, cy - R * 0.55, C.dim, q * (1 - cq), 20);
    dot(cx + 40, cy + 40, 16, 'g', cq); lbl('candidate (X, Y, Z, W)', cx + 66, cy + 46, C.gold, cq, 22, 'left');
    lbl('computed from z, a, b', cx + 66, cy + 80, C.dim, cq, 18, 'left');
  }
  void t; void s0;
};

/* ---- 03 CANDIDATE ---- */
SCENES.candidate = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Membership then needs two inequalities only', 0.6);
  if (f1 > 0) {
    lblG('X = max { P ,  h(a) ,  B / d }', W / 2, 330, C.white, Q(S, 0, "The candidate's first coordinate X", 0.6) * f1, 40);
    chip(560, 440, 360, 60, 'P : top population', C.cyan, Q(S, 0, 'the top population P', 0.6) * f1, 22);
    chip(960, 440, 360, 60, 'h(a) : geometric bound', C.gold, Q(S, 0, 'a geometric bound h of a', 0.6) * f1, 22);
    chip(1360, 440, 400, 60, 'B/d , d = min{V, (1−Q)/2}', C.mag, Q(S, 0, 'and B over d', 0.6) * f1, 22);
    const oq = Q(S, 0, 'The other three coordinates follow', 0.6) * f1;
    lblG('u = A/X ,  q = Q − X ,  v = (1 − X − u)/2', W / 2, 570, C.cyan, oq, 26);
    lblG('W = min{d, u, v} ,  Y = max{u, q, (1 − X − W)/2} ,  Z = 1 − X − Y − W', W / 2, 640, C.cyan, oq, 26);
  }
  const q = Q(S, 1, 'Membership then needs two inequalities only', 0.6, 0.3);
  if (q > 0) {
    box(1200, 290, 620, 210, C.green, q, 2, 'rgba(0,0,0,0.45)');
    lblG('X (1 − X)  ≥  A + 2B', 1510, 370, C.white, Q(S, 1, 'X times one minus X at least A plus two B', 0.6), 32);
    lblG('X Y Z W  ≥  A B', 1510, 450, C.white, Q(S, 1, 'the product X Y Z W at least A B', 0.6), 32);
    lbl('(a, b) possible  ⇔  both hold', 1510, 540, C.green, Q(S, 1, 'the product X Y Z W at least A B', 0.6), 20);
    const mq = Q(S, 1, 'The reason is monotone', 0.6);
    const px = 300, py = 760, pw = 760, ph = 400, X0 = 0.3, X1 = 0.8775, xS = x => px + (x - X0) / (X1 - X0) * pw, yS = v => py - v / 0.0042 * ph;
    plotAxes(px, py, pw, ph, mq, null, 'best product F(x)'); lbl('first coordinate x', px + pw, py + 34, C.dim, mq, 18, 'right');
    const dq = Q(S, 1, 'the best product never increases', 1.0);
    curve(z => { const x = X0 + (X1 - X0) * z * dq; return [xS(x), yS(F68(x))]; }, 120, C.gold, mq * (dq > 0 ? 1 : 0), 3);
    dashed(px, yS(0.00140625), px + pw, yS(0.00140625), C.mag, mq, 1.5); lbl('A B', px + pw + 10, yS(0.00140625) + 6, C.mag, mq, 18, 'left');
    const xq = Q(S, 1, 'the smallest admissible first coordinate is always the best choice', 0.6);
    dot(xS(X0), yS(F68(X0)), 12, 'g', xq); lbl('X = P = 0.3', xS(X0) + 18, yS(F68(X0)) - 12, C.green, xq, 20, 'left');
    lbl('z = (0.3, 0.25, 0.2, 0.15, 0.1) ,  a = 0.5 ,  b = 0.3', px, py + 40, C.dim, mq, 16, 'left');
  }
  void t; void s0;
};

/* ---- 04 CONSTRUCTION ---- */
SCENES.construction = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'theory'], [1, 'one real orthogonal rotation sets the five populations exactly', 'classical']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Placed between the square roots of the spectrum', 0.6);
  lblG('M ∈ ℝ²ˣ² ,  singular values a/2 , b/2', W / 2, 300, C.white, Q(S, 0, 'A real two by two matrix with singular values', 0.6) * f1, 30);
  if (f1 > 0) {
    const br = [['anti-diagonal', [['0', 'a/2'], ['b/2', '0']], C.cyan, 'A ≤ max{xw, yξ}', 'anti-diagonal'], ['diagonal', [['a/2', '0'], ['0', 'b/2']], C.gold, 'A > L ,  B ≤ ξw', 'diagonal, or'], ['scaled rotation', [['√θ', '−√(1−θ)'], ['√(1−θ)', '√θ']], C.mag, 'A > L ,  B > ξw', 'a scaled rotation']];
    br.forEach(([nm, cells, col, cond, ph], i) => { const x = 420 + i * 540, q = Q(S, 0, 'A real two by two matrix with singular values', 0.6, 0.8 + i * 0.5) * f1; box(x - 200, 370, 400, 360, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(i === 2 ? 'scaled rotation U_θ' : nm, x, 410, col, q, 22); if (i === 2) mat68(x - 136, 450, cells, col, q, 136); else mat68(x - 92, 450, cells, col, q); lbl(cond, x, 690, C.dim, q, 18); });
    lbl('scaled rotation : M = τ · diag(√x, √ξ) · U_θ · diag(√y, √w)', W / 2, 790, C.mag, Q(S, 0, 'a scaled rotation', 0.6) * f1, 18);
  }
  const q = Q(S, 1, 'Placed between the square roots of the spectrum', 0.6, 0.3);
  if (q > 0) {
    lblG('ρ, σ = O ( R* ± i C* ) Oᵀ', 620, 340, C.white, q, 36);
    lbl('R* = diag(x, ξ, y, w, 0)', 620, 410, C.cyan, q, 22);
    lbl('C* = [ 0  M ; −Mᵀ  0 ] ⊕ 0', 620, 460, C.mag, q, 22);
    const pq = Q(S, 1, 'two positive density matrices with the same real part', 0.6);
    chip(620, 560, 560, 60, 'both ⪰ 0 , trace 1 , same real part', C.green, pq, 22);
    chip(620, 650, 560, 60, 'difference spectrum (a, b, 0, −b, −a)', C.mag, pq, 22);
    const oq = Q(S, 1, 'one real orthogonal rotation sets the five populations exactly', 0.6);
    lbl('real Schur–Horn rotation O', 1450, 320, '#8fbcff', oq, 22);
    bars68(1270, 640, [0.30, 0.25, 0.20, 0.15, 0.10], 52, 18, 700, C.cyan, oq, ['000', '100', '010', '001', '101']);
    lbl('diag ρ = diag σ = z', 1450, 720, C.cyan, oq, 22);
    lbl('recomputed : 73 pairs · branches 51 / 19 / 3', 1450, 780, C.dim, oq, 17);
  }
  void t; void s0;
};

/* ---- 05 FRONTIER ---- */
SCENES.frontier = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Four ways of eliminating x', 0.6);
  lblG('fix  s = a + b ,  maximize  b = t', W / 2, 300, C.white, Q(S, 0, 'Now fix the total distance s', 0.6) * f1, 32);
  if (f1 > 0) {
    const nq = Q(S, 0, 'Nineteen polynomials in x and t', 1.4) * f1;
    for (let j = 0; j < 19; j++) { const col = j < 5 ? C.cyan : j < 13 ? C.gold : C.mag, x = 330 + (j % 7) * 210, y = 400 + Math.floor(j / 7) * 110; chip(x, y, 170, 70, 'f' + (j + 1) + '(x, t)', col, nq * clamp(nq * 19 - j), 22); }
    const rq = Q(S, 0, 'record every switch', 0.6) * f1;
    lbl('X branch  f₁–f₅', 520, 760, C.cyan, rq, 20); lbl('max / min selectors  f₆–f₁₃', 960, 760, C.gold, rq, 20); lbl('the two tests  f₁₄–f₁₉', 1420, 760, C.mag, rq, 20);
  }
  const q = Q(S, 1, 'Four ways of eliminating x', 0.6, 0.3);
  if (q > 0) {
    [['x = P', C.cyan], ['x = a/2', C.gold], ['x = B/d', C.mag], ['x = x_g  mod 3x² − x + A', C.green]].forEach(([s, col], i) => { const y = 360 + i * 95, qq = q * clamp(q * 4 - i); chip(470, y, 440, 64, s, col, qq, 22); arrow(700, y, 860, 500, C.dim, qq, 2); });
    chip(1010, 500, 280, 74, '76 in t', C.white, Q(S, 1, 'seventy-six polynomials in t', 0.6), 28);
    lbl('degree ≤ 8', 1010, 570, C.dim, Q(S, 1, 'of degree at most eight', 0.6), 20);
    lblG('≤ 76 · 8 + 2 = 610 candidates', 1500, 380, C.white, Q(S, 1, 'at most six hundred and ten candidates', 0.6), 30);
    chip(1500, 500, 460, 64, 'filter : the two tests', C.green, Q(S, 1, 'Filter them with the two tests', 0.6), 24);
    lblG('H_z(s) = largest survivor', 1500, 620, C.green, Q(S, 1, 'the frontier is the largest survivor', 0.6), 32);
    lbl('t = 0 and t = s/2 are added to the table', 1500, 680, C.dim, Q(S, 1, 'the frontier is the largest survivor', 0.6), 18);
  }
  void t; void s0;
};

/* ---- 06 EXAMPLE ---- */
SCENES.example = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Sweeping the distance traces the whole domain', 0.6);
  if (f1 > 0) {
    lbl('z = (3/5, 1/5, 1/10, 3/50, 1/25) ,  s = 9/10', W / 2, 290, C.white, Q(S, 0, 'Take a heavy population', 0.6) * f1, 24);
    const px = 300, py = 560, pw = 1320, xS = v => px + v / 0.45 * pw;
    const aq = Q(S, 0, 'The root table has twenty-nine distinct candidates', 0.6) * f1;
    line(px, py, px + pw, py, C.dim, aq, 2); lbl('t = b', px + pw + 16, py + 6, C.dim, aq, 18, 'left');
    [0, 0.1, 0.2, 0.3, 0.4, 0.45].forEach(v => lbl(String(v), xS(v), py + 40, C.dim, aq, 16));
    const pq = Q(S, 0, 'only five pass', 0.6) * f1;
    CAND68.forEach((v, i) => { const ok = PASS68.includes(v), qq = aq * clamp(aq * 29 - i); line(xS(v), py - 60, xS(v), py, ok ? (pq > 0 ? C.green : C.white) : (pq > 0 ? C.red : C.white), qq, ok ? 3 : 2); });
    lbl('29 distinct candidates', px, py - 90, C.white, aq, 20, 'left'); lbl('5 positive candidates pass', px + 360, py - 90, C.green, pq, 20, 'left');
    const hq = Q(S, 0, 'The frontier is a root of twenty t squared', 0.6) * f1;
    dot(xS(0.18990), py - 70, 14, 'g', hq); lblG('H = (2√6 − 3)/10 ≈ 0.1899', xS(0.19), 420, C.green, hq, 30);
    lbl('root of 20t² + 12t − 3 ,  a factor of E_P[f₁₈]', xS(0.19), 690, C.green, Q(S, 0, 'two root six minus three, over ten', 0.6) * f1, 20);
    lbl('independent search over spectra : 0.189898', xS(0.19), 740, C.dim, Q(S, 0, 'An independent search over spectra', 0.6) * f1, 20);
  }
  const q = Q(S, 1, 'Sweeping the distance traces the whole domain', 0.6, 0.3);
  if (q > 0) {
    const px = 300, py = 760, pw = 1000, ph = 480, xS = v => px + v * pw, yS = v => py - v / 0.5 * ph;
    plotAxes(px, py, pw, ph, q, null, 'second weight b'); lbl('a', px + pw + 18, py + 6, C.dim, q, 20, 'left');
    [0.25, 0.5, 0.75, 1].forEach(v => lbl(String(v), xS(v), py + 30, C.dim, q, 16)); [0.25, 0.5].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, q, 16, 'right'));
    const poly = (d, close) => [[xS(0), yS(0)], ...d.pts.map(p => [xS(p[0]), yS(p[1])]), ...close.map(p => [xS(p[0]), yS(p[1])])];
    const lq = Q(S, 1, 'For the lighter populations', 0.8), hq = Q(S, 1, 'The heavy population never reaches distance one', 0.8);
    const PL = poly(DOM68.light, [[1, 0]]), PH = poly(DOM68.heavy, []);
    fillPoly(PL, C.cyan, 0.16 * lq); strokePoly(PL, C.cyan, lq, 2.5);
    fillPoly(PH, C.mag, 0.2 * hq); strokePoly(PH, C.mag, hq, 2.5);
    const fq = Q(S, 1, 'zero point four', 0.6);
    dot(xS(0.6), yS(0.4), 12, 'c', fq); lbl('light, s = 1 : H = 0.4', 1600, 630, C.cyan, fq, 20); lbl('= min{1/2, 1 − 2P, 2V}', 1600, 662, C.cyan, fq, 18);
    dot(xS(0.97980), yS(0), 12, 'm', Q(S, 1, 'about zero point nine eight', 0.6)); lbl('heavy : s_max = 2√(0.6 · 0.4) ≈ 0.98', 1600, 720, C.mag, Q(S, 1, 'about zero point nine eight', 0.6), 20);
    chip(1600, 360, 440, 60, 'light z : P = 0.3', C.cyan, lq, 22); chip(1600, 450, 440, 60, 'heavy z : P = 0.6', C.mag, hq, 22);
    lbl('domain = {(s − b, b) : b ≤ H_z(s)}', 1600, 540, C.white, q, 20);
  }
  void t; void s0;
};

/* ---- 07 SCOPE ---- */
SCENES.scope = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'These are existence statements', 0.6);
  if (f1 > 0) {
    const px = 300, py = 760, pw = 520, ph = 460, xS = v => px + v * pw, yS = v => py - v * ph, mq = Q(S, 0, 'With the original fixed menu', 0.6) * f1;
    plotAxes(px, py, pw, ph, mq, null, 'two calls  B₂ = s'); lbl('one call  B₁ = s − b', px + pw, py + 34, C.dim, mq, 18, 'right');
    const pts = DOM68.heavy.pts, rq = Q(S, 0, 'the two-call readouts are exactly the pairs', 1.0) * f1;
    const L = [[xS(0), yS(0)], ...pts.map(p => [xS(p[2]), yS(p[2])])], R = pts.slice().reverse().map(p => [xS(p[2] - p[1]), yS(p[2])]);
    fillPoly([...L, ...R], C.mag, 0.2 * rq); strokePoly([...L, ...R], C.mag, rq, 2);
    lbl('heavy z', xS(0.72), yS(0.5), C.mag, rq, 18);
    chip(1350, 360, 620, 60, 'rational inputs : exact real algebra', C.green, Q(S, 0, 'For rational populations every step is exact real algebra', 0.6) * f1, 22);
    chip(1350, 460, 620, 60, 'arbitrary reals : needs exact real arithmetic', C.orange, Q(S, 0, 'certified roots need exact real arithmetic', 0.6) * f1, 22);
    lbl('root isolation and sign decisions are an extra resource', 1350, 530, C.dim, Q(S, 0, 'certified roots need exact real arithmetic', 0.6) * f1, 18);
  }
  const q = Q(S, 1, 'These are existence statements', 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 330, 520, 64, 'matrices : yes', C.green, q, 26);
    [['preparation procedures', 'They supply matrices, not preparation procedures'], ['pulse counts', 'They supply matrices, not preparation procedures'], ['costs', 'They supply matrices, not preparation procedures'], ['new controls or readouts', 'they add nothing to the original menu']].forEach(([s, ph], i) => { const qq = Q(S, 1, ph, 0.5, i * 0.3); chip(W / 2, 440 + i * 86, 520, 62, s + ' : no', C.red, qq, 22); });
  }
  void t; void s0;
};

/* ---- 08 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['CANDIDATE', 'max{P, h(a), B/d}', C.cyan, 'One candidate instead of a search'], ['TESTS', 'X(1−X) ≥ A+2B', C.green, 'two inequalities'], ['PRODUCT', 'XYZW ≥ AB', C.green, 'two inequalities'], ['MATRICES', 'three branches', C.gold, 'an explicit three-branch construction'], ['ROOTS', '76 · deg ≤ 8', C.mag, 'a frontier read from finitely many roots'], ['EXAMPLE', '(2√6 − 3)/10', C.vio, 'a frontier read from finitely many roots']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 19); });
    lbl('CLASSICAL TOOL · real Schur–Horn theorem (Carlen–Lieb) · spectral bounds reused from the original volume', W / 2, 480, '#8fbcff', Q(S, 1, 'with the real Schur–Horn theorem as a classical tool') * fade, 17);
    lbl('VOLUME · determined spectrum · two tests · three-branch matrices · finite-root frontier', W / 2, 540, C.orange, Q(S, 1, 'derived in the theory volume') * fade, 17);
    lbl('RECOMPUTED · 29 900 random cases · 73 explicit pairs · 28 frontiers against a direct search', W / 2, 600, C.white, Q(S, 1, 'every number here was recomputed') * fade, 19);
    lbl('NEXT · AURIC–LANGLANDS · STRUCTURE ACQUISITION AND SPECTRAL EXTENSION', W / 2, 690, C.gold, Q(S, 1, 'Next: the Auric–Langlands volumes') * fade, 30);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC Ω VI · FRONTIER', W / 2, 680, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('AURIC Ω 第六部 · 全人口消去与有限根前沿 · TRURETURING FILM 068', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One candidate, two tests, finitely many roots.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC OMEGA VI', interface: 'COMMON SPECTRUM', candidate: 'ONE CANDIDATE', construction: 'EXPLICIT STATES', frontier: 'FINITE ROOTS', example: 'AN EXAMPLE', scope: 'SCOPE', finale: 'LEDGER' });

function poster68() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('X = max{P, h(a), B/d}', 1340, 370, { size: 56, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('X(1 − X) ≥ A + 2B · XYZW ≥ AB', 1340, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('76 eliminants · H = (2√6 − 3)/10', 1340, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC Ω 第六部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC Ω VI · FRONTIER', W / 2, 890, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('一 个 候 选 · 两 个 检 验 · 有 限 个 根', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 068', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster68;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
