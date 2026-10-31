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

/* ---- film 105: AURIC V51–V52 · antipodal constraints, phase quotients and lossless recursion ---- */
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
const _po105 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po105.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po105.set(key, off); }
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
const V105 = {"kernel_eigs":[0.0,2.197,5.6486,11.7888,23.3883],"anti_pts":[[0.0446,0.0446,1],[0.5988,0.5747,0],[0.561,0.4254,0],[0.3197,0.1318,0],[0.6917,0.6917,1],[0.7568,0.7159,0],[0.4221,0.282,0],[0.6997,0.5613,0],[0.7902,0.7902,1],[0.8852,0.8561,0],[0.2709,0.1414,0],[0.7656,0.7629,0],[0.2577,0.2577,1],[0.4258,0.3057,0],[0.5569,0.3292,0],[0.3965,0.2815,0],[0.0753,0.0753,1],[0.2075,0.0861,0],[0.5284,0.3462,0],[0.2693,0.1657,0],[0.2919,0.2919,1],[0.6385,0.4118,0],[0.7751,0.6468,0],[0.5946,0.5576,0],[0.5314,0.5314,1],[0.551,0.41,0],[0.5057,0.4194,0],[0.4058,0.2009,0],[0.3403,0.3403,1],[0.1176,0.0349,0],[0.8814,0.8677,0],[0.6412,0.5208,0],[0.4274,0.4274,1],[0.6181,0.5868,0],[0.4583,0.4138,0],[0.2052,0.0507,0],[0.2638,0.2638,1],[0.4096,0.2804,0],[0.4888,0.3049,0],[0.4567,0.3316,0],[0.3587,0.3587,1],[0.1715,0.1038,0],[0.5096,0.4396,0],[0.8737,0.857,0],[0.4964,0.4964,1],[0.5265,0.4633,0],[0.0713,0.0555,0],[0.2418,0.1002,0],[0.4482,0.4482,1],[0.3038,0.1299,0],[0.7194,0.5432,0],[0.1293,0.1039,0],[0.6514,0.6514,1],[0.1829,0.1591,0],[0.7188,0.7122,0],[0.558,0.3403,0],[0.1879,0.1879,1],[0.3164,0.2038,0],[0.4586,0.2403,0],[0.2571,0.2268,0],[0.5176,0.5176,1],[0.4054,0.3028,0],[0.7654,0.5958,0],[0.8057,0.7526,0],[0.9487,0.9487,1],[0.4503,0.2225,0],[0.6588,0.5574,0],[0.6141,0.53,0],[0.4759,0.4759,1],[0.6846,0.6465,0],[0.8458,0.7178,0],[0.4596,0.276,0],[0.5774,0.5774,1],[0.2185,0.1395,0],[0.2172,0.1835,0],[0.7061,0.5001,0],[0.4869,0.4869,1],[0.3681,0.2474,0],[0.1066,0.0913,0],[0.7289,0.5847,0],[0.5219,0.5219,1],[0.6694,0.5692,0],[0.7511,0.7006,0],[0.2479,0.0709,0],[0.3816,0.3816,1],[0.199,0.1436,0],[0.2975,0.207,0],[0.717,0.6,0],[0.4418,0.4418,1],[0.5714,0.335,0],[0.3542,0.142,0],[0.8338,0.7464,0],[0.6574,0.6574,1],[0.4062,0.2662,0],[0.3623,0.1725,0],[0.6467,0.4846,0],[0.5132,0.5132,1],[0.6165,0.5788,0],[0.524,0.3615,0],[0.3184,0.1618,0],[0.898,0.898,1],[0.8304,0.8141,0],[0.5484,0.3341,0],[0.5474,0.463,0],[0.9827,0.9827,1],[0.9093,0.8599,0],[0.5205,0.3991,0],[0.8866,0.7981,0],[0.9165,0.9165,1],[0.8237,0.7815,0],[0.3886,0.18,0],[0.8093,0.7517,0],[0.2659,0.2659,1],[0.3997,0.1925,0],[0.5324,0.305,0],[0.4427,0.2551,0],[0.4105,0.4105,1],[0.2177,0.1432,0],[0.7614,0.6538,0],[0.9121,0.8349,0],[0.7025,0.7025,1],[0.2141,0.083,0],[0.3768,0.3493,0],[0.3284,0.187,0],[0.4889,0.4889,1],[0.6283,0.5971,0],[0.4913,0.2659,0],[0.3585,0.2045,0],[0.6053,0.6053,1],[0.6219,0.5308,0],[0.3545,0.1605,0],[0.8049,0.7835,0],[0.2569,0.2569,1],[0.3045,0.2289,0],[0.4585,0.2271,0],[0.3064,0.1343,0],[0.0735,0.0735,1],[0.7076,0.511,0],[0.6305,0.5287,0],[0.3517,0.3108,0],[0.8276,0.8276,1],[0.3313,0.1307,0],[0.5515,0.527,0],[0.4562,0.3077,0],[0.144,0.144,1],[0.7067,0.6317,0],[0.6977,0.5571,0],[0.1537,0.1193,0],[0.9697,0.9697,1],[0.2691,0.2386,0],[0.8862,0.7908,0],[0.711,0.6807,0],[0.5865,0.5865,1],[0.454,0.2544,0],[0.6549,0.6328,0],[0.6875,0.5975,0],[0.1535,0.1535,1],[0.823,0.8186,0],[0.417,0.4141,0],[0.2684,0.1118,0]],"nmap_eigs":[-0.5,0.5,0.5,0.5],"nu":0.12852,"anu":0.32443,"native_w_H":[0.1874,0.3391,0.2108,0.2003,0.0625],"native_w_S":[0.4804,0.0872,0.0463,0.226,0.1601],"native_uH":[0.4015,0.2627,0.2108],"native_uS":[0.2473,0.3861,0.0463],"native_u0":[0.3244,0.3244,0.1285],"trunc":[[0,0.1783,0.5774],[1,0.1744,0.2887],[2,0.1008,0.1443],[3,0.02929,0.07217],[4,0.01593,0.03608],[5,0.009165,0.01804],[6,0.00586,0.009021],[7,0.002392,0.004511],[8,0.001434,0.002255],[9,0.00054,0.001128],[10,0.0002414,0.0005638],[11,0.0002191,0.0002819],[12,4.794e-05,0.000141]],"r2r":[[1,0.3162],[3,0.156],[10,0.04969],[30,0.01666],[100,0.005],[1000,0.0005]],"m3_eigs":[-0.3333333333333333,0.6666666666666666,0.6666666666666666],"hist_gap":[[1,1.0],[2,1.5279],[3,1.7826],[4,1.9298],[5,2.0254],[6,2.0922],[7,2.1415],[8,2.1794],[9,2.2095],[10,2.2338],[11,2.254],[12,2.271],[13,2.2854],[14,2.2979],[15,2.3088],[16,2.3184],[17,2.3269],[18,2.3344],[19,2.3412],[20,2.3474],[21,2.3529],[22,2.358],[23,2.3626],[24,2.3669],[25,2.3708]],"inf_energy":[[1,0.375],[2,0.0804],[3,0.0187],[4,0.00454],[5,0.00112],[6,0.000277],[7,6.89e-05],[8,1.72e-05],[9,4.3e-06],[10,1.07e-06],[11,2.68e-07],[12,6.71e-08]],"chart_ratio":[[0.7558,0.6391],[0.3542,0.709],[0.813,0.8455],[0.4073,0.6973],[0.8333,0.7156],[1.1111,0.6871],[1.4086,0.5061],[1.5866,0.5813],[0.7393,0.8367],[0.4338,0.6664],[1.1412,0.7508],[0.3256,0.6362],[1.4162,0.6635],[1.6856,0.5772],[0.4268,0.7253],[0.4679,0.5554],[0.7787,0.6986],[0.4733,0.7507],[0.2408,0.6459],[1.4375,0.6167],[1.4861,0.6406],[1.4018,0.6322],[1.5154,0.6189],[1.0689,0.7669],[0.8387,0.676],[0.6641,0.694],[0.3606,0.6382],[0.1747,0.6684],[0.7066,0.8533],[0.8838,0.6964],[1.2427,0.61],[0.242,0.8],[0.3684,0.6067],[0.4657,0.6675],[0.8767,0.7214],[0.5823,0.7047],[0.3863,0.5976],[0.559,0.8582],[0.1458,0.7195],[0.5762,0.7487],[1.0938,0.6082],[0.5691,0.6289],[0.3539,0.7333],[0.6292,0.6009],[0.2861,0.7974],[1.064,0.6816],[1.0914,0.7546],[1.1086,0.6059],[1.761,0.5603],[0.6363,0.6163],[0.9001,0.7917],[0.4994,0.6671],[1.144,0.6922],[1.0457,0.6236],[0.5377,0.5423],[0.6617,0.5649],[1.5179,0.6221],[0.7728,0.7934],[0.3934,0.9391],[1.3578,0.6594],[0.7145,0.6728],[0.5007,0.8544],[0.9158,0.7743],[1.2235,0.6679],[1.7341,0.5662],[1.3482,0.6726],[1.1903,0.7185],[0.5884,0.7447],[0.5403,0.7489],[1.0572,0.5832],[1.2895,0.7031],[0.8599,0.5992],[0.8527,0.7271],[0.8424,0.7379],[0.5078,0.7143],[1.0697,0.7607],[0.3327,0.7354],[1.4487,0.6532],[0.7814,0.7627],[1.7032,0.5715],[1.0242,0.6776],[1.0829,0.7152],[0.7978,0.7948],[0.3977,0.6376],[0.5965,0.8686],[0.6922,0.7726],[0.6792,0.6244],[0.5497,0.848],[1.4788,0.5976],[1.2996,0.6547],[0.8104,0.8282],[1.1836,0.7092],[0.5891,0.6243],[0.5663,0.5927],[1.4951,0.6403],[0.481,0.7443],[0.9533,0.7632],[0.7786,0.6239],[1.4185,0.5969],[1.4773,0.5921],[1.0478,0.7796],[0.8074,0.7771],[0.87,0.8217],[0.7864,0.7404],[1.8579,0.5228],[0.9266,0.673],[1.1947,0.7011],[1.5907,0.6083],[0.7986,0.6404],[1.185,0.7287],[0.7555,0.7811],[1.3231,0.669],[0.4545,0.5791],[0.854,0.7219],[1.1259,0.7242],[0.6108,0.6361],[1.5056,0.6244],[1.6308,0.5783],[0.6463,0.5628],[1.2143,0.652],[1.1604,0.6611],[1.3765,0.6311],[1.0544,0.6898],[0.8604,0.684],[1.1956,0.7294],[1.2724,0.6831],[0.7911,0.6652],[1.3818,0.6337],[1.1321,0.7175],[1.0777,0.7354],[0.9289,0.6911],[1.0463,0.7696],[0.4518,0.8441],[0.7765,0.6924],[0.5901,0.7639],[0.3274,0.6227],[0.7456,0.7371],[1.2804,0.6796],[1.1092,0.6687],[1.5595,0.5964],[0.7969,0.6009],[0.9715,0.7098],[0.8943,0.7933],[1.66,0.5916],[0.4298,0.8093],[0.8286,0.7404],[0.7312,0.7612],[1.7745,0.5591],[0.9457,0.6183],[1.0358,0.5879],[1.2469,0.702],[1.2381,0.7072],[0.5971,0.6648],[1.0117,0.6101],[1.2888,0.6736],[0.3935,0.8051],[0.7762,0.6959],[0.2845,0.8718],[0.5992,0.6633],[0.2667,0.7938],[0.6832,0.6846],[1.5427,0.6256],[0.5651,0.7035],[0.4894,0.7325],[0.6555,0.7488],[0.7349,0.7853],[0.4252,0.8252],[1.639,0.5947],[0.4723,0.6186],[0.7612,0.7102],[0.6993,0.7332],[0.9776,0.5507],[0.6069,0.5088],[1.122,0.7471],[0.3063,0.7482],[0.9425,0.8053],[1.1126,0.7195],[0.4378,0.8277],[0.8579,0.7568],[1.3217,0.6607],[0.8294,0.769],[0.2939,0.8254],[1.1668,0.6939],[1.4234,0.6289],[1.77,0.5519],[1.4089,0.6209],[1.3929,0.661],[0.9836,0.5601],[1.2303,0.6882],[0.1922,0.8404],[0.6951,0.8301],[0.9002,0.7067],[1.4012,0.6673],[1.3697,0.6235],[0.7209,0.7352],[0.692,0.6831],[0.485,0.7423],[0.4473,0.8952],[0.2363,0.6],[1.6452,0.5964],[0.8026,0.7052],[0.729,0.6431],[1.3633,0.6398],[0.8986,0.7055],[0.2144,0.5525],[0.9676,0.5385],[1.1361,0.7232],[0.4989,0.8795],[1.3752,0.6419],[0.7173,0.6533],[1.7032,0.5675],[0.1082,0.704],[1.1899,0.6842],[1.2589,0.6912],[0.4663,0.6225],[1.0332,0.5549],[0.1409,0.5894],[0.286,0.6762],[0.5201,0.692],[0.8055,0.8056]],"dimtab":[[2,3],[4,7,8],[6,11,14,15],[8,15,20,23,24]],"rank_lams":[0.5,0.3,0.2],"add_defect":[[0.5,-0.8108],[0.6,-0.7689],[0.7,-0.7254],[0.8,-0.6805],[0.9,-0.634],[1.0,-0.5858],[1.1,-0.5359],[1.2,-0.4843],[1.3,-0.4308],[1.4,-0.3755],[1.5,-0.3182],[1.6,-0.2589],[1.7,-0.1975],[1.8,-0.1339],[1.9,-0.0681],[2.0,0.0],[2.1,0.0705],[2.2,0.1435],[2.3,0.2191],[2.4,0.2974],[2.5,0.3784],[2.6,0.4623],[2.7,0.5491],[2.8,0.639],[2.9,0.7321],[3.0,0.8284],[3.1,0.9282],[3.2,1.0314],[3.3,1.1383],[3.4,1.249],[3.5,1.3636],[3.6,1.4822],[3.7,1.605],[3.8,1.7321],[3.9,1.8637],[4.0,2.0]],"cubic":[0.5625,0.75],"rec_p":[0.1893,0.1629,0.6479],"kb_windows5":[["111101","000000"],["111011","000001"],["110111","000011"],["101111","000111"]],"kb_res":[[2,1,2,3,3],[3,2,4,6,5],[4,3,6,9,7],[5,4,8,12,9],[6,5,10,15,11],[7,6,12,18,13],[8,7,14,21,15]],"kb_ex":{"c":[2,1,3,1],"l":[1,2,1,3],"D":10,"YZ":[[1,4,2],[2,3,6],[3,18,6]]},"Rt":[[0.5,1],[1,2],[2,3]]};
/* ---- film 105 helpers ---- */
function ell105(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll105(cx, cy, rx, ry, col, a, rot = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell105(x, y, w, h, s, col, a, size = 20, fillA = 0.3, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.35, tc, a, size); }
function chipG(x, y, w, h, s, col, a, size = 22) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: FG, w: 700, align: 'center', c: col, a }); }
/* Bloch sphere outline; bp105 maps a Bloch vector to the drawing (x right, z up, y as depth) */
function sph105(cx, cy, R, a, col = C.cyan, axes = false) {
  if (a <= 0) return;
  fillEll105(cx, cy, R, R, col, a * 0.05);
  ring(cx, cy, R, col, a * 0.65, 1.8);
  ell105(cx, cy, R, R * 0.3, col, a * 0.35, 1.2, 0, 1);
  dashed(cx, cy - R - 18, cx, cy + R + 18, C.dim, a * 0.45, 1.2);
  if (axes) { dashed(cx - R - 18, cy, cx + R + 18, cy, C.dim, a * 0.45, 1.2); lbl('z', cx + 12, cy - R - 22, C.dim, a, 17, 'left'); lbl('x', cx + R + 24, cy + 6, C.dim, a, 17, 'left'); }
}
function bp105(cx, cy, R, r) { return [cx + r[0] * R - r[1] * R * 0.32, cy - r[2] * R + r[1] * R * 0.2]; }
function pl105(pts, xS, yS, col, a, lw = 3) { if (a <= 0) return; strokePoly(pts.map(p => [xS(p[0]), yS(p[1])]), col, a, lw, false); }
const lg105 = v => Math.log10(Math.max(v, 1e-30));

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2), cx = 470, cy = 470, R = 240;
  sph105(cx, cy, R, s0, C.cyan, true);
  const th = t * 0.35, s = [0.78 * Math.cos(th), 0.78 * Math.sin(th), 0.62];
  const P = bp105(cx, cy, R, s), M = bp105(cx, cy, R, s.map(x => -x));
  arrow(cx, cy, P[0], P[1], C.mag, s0, 3); dot(P[0], P[1], 14, 'm', s0);
  arrow(cx, cy, M[0], M[1], C.gold, s0, 3); dot(M[0], M[1], 14, 'g', s0);
  lblG('constraint s', P[0] + 22, P[1] - 10, C.mag, s0, 20, 'left'); lblG('solution −s', M[0] + 22, M[1] + 22, C.gold, s0, 20, 'left');
  const items = [['repeated one binary interface', 'VERSION 50 · ONE BINARY INTERFACE', 'the same two-by-two block , again and again', C.cyan], ['what an exactly vanishing constraint selects', 'A CONSTRAINT THAT VANISHES', 'Tr(Hρ) = 0  ⇒  ρ* = I − Ĥ', C.mag], ['what survives when a common phase is divided out', 'DIVIDE OUT THE PHASE', '(ℂ² ∖ 0) / U(1) ≅ ℝ³ ∖ 0', C.gold], ['what recursion keeps without loss', 'LOSSLESS RECURSION', 'anchors · blocks · trees · histories', C.green]];
  items.forEach(([ph, h, s1, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s1, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cx = W / 2, cy = 420, R = 210;
  sph105(cx, cy, R, rp * 0.9, C.cyan, true);
  const th = t * 0.3, s = [0.8 * Math.cos(th), 0.8 * Math.sin(th), 0.6];
  const P = bp105(cx, cy, R, s), M = bp105(cx, cy, R, s.map(x => -x));
  arrow(cx, cy, P[0], P[1], C.mag, rp, 3); dot(P[0], P[1], 13, 'm', rp);
  arrow(cx, cy, M[0], M[1], C.gold, rp, 3); dot(M[0], M[1], 13, 'g', rp);
  chipG(330, 330, 340, 58, 'ρ* = I − Ĥ', C.gold, rp, 23); chipG(330, 415, 340, 58, 'u(ρ*) = 2u₀ − u(Ĥ)', C.mag, rp, 21); chipG(330, 500, 340, 58, 'G_ij = z_i z*_j', C.cyan, rp, 23);
  box(1420, 320, 380, 200, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('anchors , blocks , trees', 1610, 375, C.green, rp, 20); lblG('z_j = C_j0 / C_00', 1610, 432, C.white, rp, 26); lblG('gap ≥ 1/N²', 1610, 485, C.white, rp, 24);
  txt(scramble('AURIC V51–V52 · ANTIPODES', rp, 505), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V51–V52 · 对 跖 约 束 、相 位 商 与 无 损 递 归', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  const sq = clamp((u - 1.2) / 0.8);
  txt('TRURETURING · FILM 105 · AURIC_CONSTRAINT_RECURSION_PURE_STATE_DUALITY_AND_ENDOGENOUS_STATIC_HISTORY_V51', W / 2, 105, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sq, ls: 2 });
  txt('AURIC_PURE_STATE_QUOTIENT_GEOMETRY_QUADRATIC_RELATION_GENERATORS_AND_LOSSLESS_RECURSION_V52', W / 2, 132, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sq, ls: 2 });
};

/* ---- 02 KERNEL (V51 §2–§3) ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So a one-dimensional kernel', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a weighted sum of squared linear residuals', 0.6) * f1;
    chipG(W / 2, 250, 1400, 60, 'H = Σ_j w_j L_j† L_j ,  w_j > 0   ⇒   ⟨ψ, Hψ⟩ = Σ_j w_j ‖L_j ψ‖²', C.gold, q, 23);
    const kq = Q(S, 0, 'It vanishes exactly on the common kernel', 0.6) * f1;
    chipG(530, 360, 760, 60, '⟨ψ, Hψ⟩ = 0  ⇔  ψ ∈ K = ∩_j ker L_j = ker H', C.cyan, kq, 22);
    const dq = Q(S, 0, 'a density state has zero penalty exactly when', 0.6) * f1;
    chipG(530, 450, 760, 60, 'Tr(Hρ) = ‖H^(1/2) ρ^(1/2)‖²_HS = 0  ⇔  supp ρ ⊆ K', C.green, dq, 21);
    lbl('every term is nonnegative : no cancellation between positive and negative parts', 530, 515, C.dim, dq, 15);
    const sx = 230, sy = 600;
    box(sx, sy, 600, 170, C.dim, dq, 1.5, 'rgba(0,0,0,0.3)'); lbl('state space', sx + 300, sy + 28, C.dim, dq, 16);
    fillBox(sx + 210, sy + 60, 180, 80, C.green, dq * 0.25); rect63(sx + 210, sy + 60, 180, 80, C.green, dq, 2); lbl('K', sx + 300, sy + 110, C.green, dq, 26);
    const px = 1060, py = 760, pw = 680, ph = 360, ev = V105.kernel_eigs, yS = v => py - v / 25 * ph;
    plotAxes(px, py, pw, ph, kq, 'eigenvalues of one sampled H (d = 5)', 'spectrum of H');
    ev.forEach((v, i) => { const x = px + 40 + i * 125, h = Math.max(v / 25 * ph, 0), qq = clamp(kq * 1.6 - i * 0.12); fillBox(x, py - h, 80, h, i === 0 ? C.green : C.gold, qq * 0.45); rect63(x, py - h, 80, Math.max(h, 2), i === 0 ? C.green : C.gold, qq, 1.6); lbl(v.toFixed(2), x + 40, py - h - 12, C.white, qq, 16); });
    lbl('one zero eigenvalue : dim K = 1', px + 60, py - ph + 30, C.green, kq, 17, 'left');
  }
  const q1 = Q(S, 1, 'So a one-dimensional kernel', 0.6, 0.3);
  if (q1 > 0) {
    const cases = [['dim K = 0', 'no zero-penalty state', C.red, 'So a one-dimensional kernel'], ['dim K = 1', 'unique state , pure', C.green, 'selects one pure state'], ['dim K ≥ 2', 'pure states and mixtures', C.gold, 'while a larger kernel admits mixtures']];
    cases.forEach(([h, s1, col, ph], i) => { const qq = Q(S, 1, ph, 0.6), x = 160 + i * 540; box(x, 250, 500, 130, col, qq, 2, 'rgba(0,0,0,0.5)'); lblG(h, x + 250, 300, col, qq, 28); lbl(s1, x + 250, 350, C.white, qq, 19); });
    const nq = Q(S, 1, 'norm squared equal to one is a sphere', 0.6);
    box(160, 430, 500, 300, C.mag, nq, 2, 'rgba(40,0,40,0.3)'); lbl('NONZERO LEVEL', 410, 470, C.mag, nq, 19);
    ring(410, 600, 90, C.mag, nq, 2.5); lblG('‖ψ‖² = 1', 410, 608, C.white, nq, 24); lbl('solution set : a sphere', 410, 715, C.dim, nq, 15);
    const pq = Q(S, 1, 'Positivity and zero level both matter', 0.6);
    box(700, 430, 500, 300, C.orange, pq, 2, 'rgba(40,20,0,0.3)'); lbl('NOT POSITIVE', 950, 470, C.orange, pq, 19);
    lblG('|a|² − |b|² = 0', 950, 530, C.white, pq, 26);
    lblG('(1, 1) ✓   (1, −1) ✓', 950, 590, C.green, pq, 22); lblG('(1,1) + (1,−1) = (2, 0) ✗', 950, 640, C.red, pq, 22); lbl('zero set is not a linear space', 950, 700, C.dim, pq, 15);
    const mq = Q(S, 1, 'three zero Pauli means give the maximally mixed state', 0.6);
    box(1240, 430, 500, 300, C.cyan, mq, 2, 'rgba(0,30,40,0.3)'); lbl('AFFINE READOUTS', 1490, 470, C.cyan, mq, 19);
    lblG('Tr(ρσ_x) = Tr(ρσ_y) = Tr(ρσ_z) = 0', 1490, 540, C.white, mq, 20);
    lblG('⇒  ρ = I / 2', 1490, 610, C.gold, mq, 32); lbl('a strictly mixed state', 1490, 700, C.dim, mq, 15);
  }
};

/* ---- 03 ANTIPODE (V51 §4) ---- */
SCENES.antipode = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, "Any state's squared trace distance", 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On a qubit', 0.6) * f1;
    const cx = 480, cy = 480, R = 220, sv = [0.6, 0, 0.8];
    sph105(cx, cy, R, q, C.cyan, true);
    const hq = Q(S, 0, 'Normalised, it is itself a pure state', 0.6) * f1;
    const P = bp105(cx, cy, R, sv), Mm = bp105(cx, cy, R, sv.map(x => -x));
    arrow(cx, cy, P[0], P[1], C.mag, hq, 3); dot(P[0], P[1], 14, 'm', hq); lblG('Ĥ = (I + s·σ)/2', P[0] + 20, P[1] - 14, C.mag, hq, 20, 'left');
    const aq = Q(S, 0, 'the unique solution is one minus it', 0.6) * f1;
    arrow(cx, cy, Mm[0], Mm[1], C.gold, aq, 3); dot(Mm[0], Mm[1], 14, 'g', aq); lblG('ρ* = I − Ĥ', Mm[0] - 30, Mm[1] + 52, C.gold, aq, 22, 'right');
    const tq = Q(S, 0, 'the antipodal point', 0.6) * f1;
    const dx = Mm[0] - cx, dy = Mm[1] - cy, dl = Math.hypot(dx, dy), ux = -dy / dl, uy = dx / dl; const T1 = [Mm[0] + ux * 170, Mm[1] + uy * 170], T2 = [Mm[0] - ux * 170, Mm[1] - uy * 170];
    dashed(T1[0], T1[1], T2[0], T2[1], C.gold, tq, 2); const Tb = T1[1] > T2[1] ? T1 : T2; lbl('support plane r·s = −1', Tb[0] + 14, Tb[1] + 6, C.gold, tq, 16, 'left');
    const rq = Q(S, 0, 'has a zero-penalty state exactly when it has rank one', 0.6) * f1;
    chipG(1390, 290, 760, 60, 'H ⪰ 0 , H ≠ 0 on ℂ² :  zero penalty  ⇔  rank H = 1', C.cyan, rq, 21);
    chipG(1390, 370, 760, 56, '⇔  ‖s‖ = 1 :  the constraint itself is pure', C.mag, hq, 21);
    chipG(1390, 450, 760, 60, 'ρ* = I − Ĥ = (I − s·σ)/2 ,  r* = −s', C.gold, aq, 24);
    lblG('row relation ℓ = (α, β) :  ψ* = (−β, α) / √(|α|² + |β|²) ,  ℓψ* = 0', 1390, 515, C.white, aq, 17);
    lbl('rank two : kernel zero , no solution ;  H = 0 : every state allowed', 1390, 560, C.dim, rq, 15);
    stamp('ANTIPODAL', 1390, 680, tq, C.gold, 40, -0.05);
  }
  const q1 = Q(S, 1, "Any state's squared trace distance", 0.6, 0.3);
  if (q1 > 0) {
    chipG(530, 255, 860, 60, 'ε = Tr(ρĤ) = (1 + r·s)/2 ,   D(ρ, ρ*)² = ε − (1 − ‖r‖²)/4 ≤ ε', C.gold, q1, 21);
    const px = 160, py = 770, pw = 720, ph = 430, xS = x => px + x * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, q1, 'penalty ε', 'D(ρ, ρ*)²');
    const eq = Q(S, 1, 'exact for pure inputs', 0.6);
    dashed(xS(0), yS(0), xS(1), yS(1), C.gold, q1, 2); lbl('D² = ε', xS(0.9), yS(0.9) - 16, C.gold, q1, 17, 'right');
    V105.anti_pts.forEach((p, i) => { const qq = clamp(q1 * 1.6 - i / 200) * (p[2] ? Math.max(eq, 0.35) : 1); dot(xS(p[0]), yS(p[1]), p[2] ? 7 : 5, p[2] ? 'g' : 'c', qq); });
    lbl('160 sampled states : cyan mixed (below) , gold pure (on the line)', px + 20, py - ph + 10, C.dim, q1, 15, 'left');
    lbl('pure input at angle δ from ρ* :  ε = sin²(δ/2) ,  D = |sin(δ/2)|', px + pw / 2, py + 58, C.white, eq, 16);
    const nq = Q(S, 1, 'On unknown states the flip is not completely positive', 0.6);
    chipG(1390, 300, 760, 60, 'N(X) = Tr(X) I − X :  positive , trace preserving', C.cyan, nq, 22);
    const bq = Q(S, 1, 'a Bell pair gets eigenvalue minus one half', 0.6);
    chipG(1390, 380, 760, 58, '(N ⊗ id)(P_Φ) = I₄/2 − P_Φ', C.white, bq, 23);
    const bx = 1130, by = 580, ev = V105.nmap_eigs;
    line(bx - 10, by, bx + 540, by, C.dim, bq, 1.2);
    ev.forEach((v, i) => { const x = bx + i * 135, h = v * 260; fillBox(x, h > 0 ? by - h : by, 90, Math.abs(h), v < 0 ? C.red : C.cyan, bq * 0.45); rect63(x, h > 0 ? by - h : by, 90, Math.abs(h), v < 0 ? C.red : C.cyan, bq, 1.6); lbl((v > 0 ? '+' : '−') + '1/2', x + 45, v > 0 ? by - h - 12 : by - h + 26, v < 0 ? C.red : C.white, bq, 18); });
    lbl('eigenvalues', bx - 20, by + 6, C.dim, bq, 15, 'right');
    stamp('NOT COMPLETELY POSITIVE', 1390, 795, bq, C.red, 26, -0.04);
  }
};

/* ---- 04 NATIVE (V51 §6, V52 §7) ---- */
SCENES.native = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'In these three native means', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'into five AURIC modes', 0.6) * f1;
    const rows = [['E₀', '3 E₂₅', C.white], ['E₂', 'ν/2 (√11 I + 3σ_x + σ_y + σ_z)', C.cyan], ['E₃', 'ν (I + σ_z)', C.gold], ['E₅', 'ν/2 (√11 I + σ_x + 3σ_y + σ_z)', C.mag], ['E₂₅', 'ν/2 (√3 I − σ_x − σ_y − σ_z)', C.green]];
    rows.forEach(([a1, a2, col], i) => { const qq = clamp(q * 1.6 - i * 0.12), y = 250 + i * 66; box(150, y, 760, 54, col, qq, 1.6, 'rgba(0,0,0,0.45)'); lblG(a1, 200, y + 36, col, qq, 22); lblG(a2, 560, y + 36, C.white, qq, 20); });
    const eq = Q(S, 0, 'five rank-one effects summing to the identity', 0.6) * f1;
    lblG('ν = 1 / (1 + 2√3 + √11) ≈ 0.1285 ;  each effect rank one ;  Σ_s E_s = I', 530, 610, C.gold, eq, 18);
    lbl('modes 0 , 2 , 3 , 5 , 25  ↔  ∅ , 1 , 2 , 3 , 13 ;  J ψ = Σ_s |s⟩⟨η_s, ψ⟩ ,  J†J = I', 530, 645, C.dim, eq, 15);
    const lq = Q(S, 0, 'Every state obeys N minus X minus Y minus Z', 0.6) * f1;
    chipG(530, 720, 760, 60, 'N − X − Y − Z − 2κ = 0   for every G ⪰ 0', C.cyan, lq, 23);
    lbl('X = w₂ + w₂₅ ,  Y = w₅ + w₂₅ ,  Z = w₃ ,  κ = w₂₅ ,  w_s = Tr(G E_s)', 530, 775, C.dim, lq, 15);
    const sq = Q(S, 0, 'pure states also lie on a sphere of radius nu', 0.6) * f1;
    const cx = 1400, cy = 480, R = 200;
    sph105(cx, cy, R, sq, C.green, false);
    dot(cx, cy, 9, 'w', sq); lblG('u₀ = (0.3244 , 0.3244 , 0.1285)', cx, cy + R + 50, C.white, sq, 19);
    for (let i = 0; i < 14; i++) { const th = i * TAU / 14 + t * 0.2, r = [Math.cos(th) * 0.7, Math.sin(th) * 0.7, (i % 2 ? 0.7 : -0.7)]; const nr = Math.hypot(...r); const Pp = bp105(cx, cy, R, r.map(x => x / nr)); dot(Pp[0], Pp[1], 8, 'g', sq); }
    for (let i = 0; i < 8; i++) { const r = [Math.sin(i * 1.7) * 0.5, Math.cos(i * 2.3) * 0.4, Math.sin(i * 0.9) * 0.45]; const Pp = bp105(cx, cy, R, r); dot(Pp[0], Pp[1], 6, 'c', sq * 0.8); }
    lblG('pure : ‖u − u₀‖ = ν', cx, cy - R - 30, C.green, sq, 22); lbl('mixed : inside (cyan)', cx, cy + R + 82, C.cyan, sq, 15);
  }
  const q1 = Q(S, 1, 'In these three native means', 0.6, 0.3);
  if (q1 > 0) {
    const cx = 480, cy = 470, R = 200, u0 = V105.native_u0, uH = V105.native_uH, uS = V105.native_uS;
    sph105(cx, cy, R, q1, C.green, false);
    const toR = v => [(v[0] - u0[0]) / V105.nu, (v[1] - u0[1]) / V105.nu, (v[2] - u0[2]) / V105.nu];
    const PH = bp105(cx, cy, R, toR(uH)), PS = bp105(cx, cy, R, toR(uS));
    const rq = Q(S, 1, 'becomes a point reflection through the centre u zero', 0.6);
    dot(cx, cy, 10, 'w', q1); lblG('u₀', cx + 16, cy + 26, C.white, q1, 20, 'left');
    dot(PH[0], PH[1], 13, 'm', q1); lblG('u(Ĥ)', PH[0] + 18, PH[1] - 10, C.mag, q1, 20, 'left');
    dashed(PH[0], PH[1], PS[0], PS[1], C.gold, rq, 2.5); dot(PS[0], PS[1], 13, 'g', rq); lblG('u(ρ*)', PS[0] - 18, PS[1] + 30, C.gold, rq, 20, 'right');
    chipG(530, 730, 760, 60, 'u(ρ*) = 2u₀ − u(Ĥ)', C.gold, rq, 26);
    const bx = 1060, by = 470, wh = V105.native_w_H, ws = V105.native_w_S, lab = ['0', '2', '3', '5', '25'];
    lbl('five native weights w_s (one sampled constraint and its solution)', 1400, 255, C.dim, q1, 15);
    lab.forEach((l, i) => { const x = bx + i * 140; [[wh[i], C.mag, 0], [ws[i], C.gold, 52]].forEach(([v, col, dx], k) => { const qq = k ? rq : q1, h = v * 380; fillBox(x + dx, by - h, 44, h, col, qq * 0.45); rect63(x + dx, by - h, 44, h, col, qq, 1.4); lbl(v.toFixed(2), x + dx + 22, by - h - 10, C.white, qq, 13); }); lbl('s = ' + l, x + 48, by + 26, C.dim, q1, 15); });
    lbl('magenta : Ĥ    gold : ρ*', 1400, by + 60, C.white, rq, 16);
    const lq = Q(S, 1, 'the same isometry lifts every qubit unitary coherently', 0.6);
    chipG(1400, 620, 760, 60, 'Ũ = J U J† + (I₅ − J J†)', C.cyan, lq, 26);
    lblG('Ũ†Ũ = I₅ ,  Ũ J = J U   for every U ∈ U(2)', 1400, 690, C.white, lq, 20);
    lbl('recomputed on 20 random U : unitary and intertwining to 1e−9', 1400, 730, C.dim, lq, 15);
  }
};

/* ---- 05 ANCHORED CODES (V51 §7) ---- */
SCENES.code = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Countable data are squashed', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Put an anchor one before the data', 0.6) * f1;
    const vals = ['1', 'z₁', 'z₂', 'z₃', '…', 'z_M'];
    vals.forEach((s, i) => cell105(160 + i * 110, 260, 96, 70, s, i === 0 ? C.gold : C.cyan, clamp(q * 1.6 - i * 0.1), 24));
    lbl('anchor', 208, 360, C.gold, q, 16); lbl('v(z) = (1, z₁, … , z_M)ᵀ', 640, 360, C.white, q, 18);
    const nq = Q(S, 0, 'the result is pure', 0.6) * f1;
    chipG(530, 430, 760, 62, 'C(z) = v v† / (1 + Σ|z_j|²) :  pure , trace one', C.cyan, nq, 21);
    const gx = 230, gy = 490, cw = 64;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const isA = i === 0 && j === 0, isC = j === 0 && i > 0, col = isA ? C.gold : isC ? C.green : C.dim, qq = clamp(nq * 1.6 - (i + j) / 10); box(gx + j * cw, gy + i * 54, cw - 6, 48, col, qq, 1.4, isA || isC ? 'rgba(20,40,20,0.45)' : 'rgba(0,0,0,0.35)'); }
    lbl('C₀₀', gx + 29, gy + 31, C.gold, nq, 15); lbl('C_j0', gx + 29, gy + 85, C.green, nq, 15);
    const rq = Q(S, 0, 'every coefficient returns as a ratio to the anchor entry', 0.6) * f1;
    chipG(760, 600, 330, 70, 'z_j = C_j0 / C₀₀', C.green, rq, 26);
    const tq = Q(S, 0, 'so finite towers decode layer by layer', 0.6) * f1;
    ['data z', 'code C(z)', 'code of the code', '…'].forEach((s, i) => { const qq = clamp(tq * 1.6 - i * 0.2), y = 680 - i * 115; box(1180, y, 460, 90, [C.cyan, C.green, C.gold, C.dim][i], qq, 2, 'rgba(0,0,0,0.45)'); lbl(s, 1410, y + 55, C.white, qq, 22); if (i < 3) { arrow(1250, y - 4, 1250, y - 22, C.dim, qq, 2); arrow(1570, y - 22, 1570, y - 4, C.green, qq, 2); } });
    lbl('encode ↑', 1235, 270, C.dim, tq, 15, 'right'); lbl('decode ↓', 1590, 270, C.green, tq, 15, 'left');
    lbl('a code exists even for contradictory constraints : encoding is not solving', 1410, 790, C.dim, tq, 15);
  }
  const q1 = Q(S, 1, 'Countable data are squashed', 0.6, 0.3);
  if (q1 > 0) {
    chipG(530, 255, 860, 60, 'f(z) = z / (1 + |z|) ,  v(c) = (1, f(c₁)/2, f(c₂)/4, f(c₃)/8, …)', C.cyan, q1, 21);
    lblG('1 ≤ ‖v‖² < 4/3 ,  C₀₀ > 3/4 ;  c_j = q_j / (1 − |q_j|) ,  q_j = 2ʲ C_j0 / C₀₀', 530, 320, C.white, q1, 17);
    const tq = Q(S, 1, 'Truncating after M terms moves the code', 0.6);
    const px = 160, py = 770, pw = 720, ph = 380, xS = m => px + m / 12 * pw, yS = v => py - (lg105(v) + 4.5) / 4.5 * ph;
    plotAxes(px, py, pw, ph, tq, 'M', 'trace distance (log)');
    const tr = V105.trunc;
    pl105(tr.map(r => [r[0], r[2]]), xS, yS, C.gold, tq, 3);
    tr.forEach((r, i) => { const qq = clamp(tq * 1.6 - i / 16); dot(xS(r[0]), yS(r[1]), 7, 'c', qq); });
    lblG('bound 2^(−M) / √3', xS(5.5), yS(tr[5][2]) - 18, C.gold, tq, 17, 'left');
    lbl('cyan : one sampled sequence of 40 complex terms', px + pw, py - ph + 10, C.cyan, tq, 15, 'right');
    [0, 4, 8].forEach(m => lbl(String(m), xS(m), py + 26, C.dim, tq, 14));
    [1, 0.01, 0.0001].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, tq, 13, 'right'));
    const dq = Q(S, 1, 'yet recovering the j-th coordinate costs a factor like two to the j', 0.6);
    chipG(1400, 300, 760, 62, '|c_j − d_j| ≤ (4/3)(1 + M₀)² (2ʲ + 1) ε', C.mag, dq, 23);
    lbl('ε = ‖C(c) − C(d)‖₁ ,  |c_j| , |d_j| ≤ M₀', 1400, 360, C.dim, dq, 15);
    const bx = 1090, by = 650;
    for (let j = 1; j <= 8; j++) { const h = Math.log2(Math.pow(2, j) + 1) * 26, qq = clamp(dq * 1.6 - j / 10); fillBox(bx + (j - 1) * 76, by - h, 52, h, C.mag, qq * 0.45); rect63(bx + (j - 1) * 76, by - h, 52, h, C.mag, qq, 1.4); lbl('j=' + j, bx + (j - 1) * 76 + 26, by + 24, C.dim, qq, 14); }
    lbl('decoding constant 2ʲ + 1 (log scale)', 1400, by + 56, C.mag, dq, 15);
    lblG('unbounded data : z = R vs 2R  →  D = R / √((1 + R²)(1 + 4R²)) → 0', 1400, 770, C.white, dq, 16);
  }
};

/* ---- 06 ATLAS (V51 §8–§9, V52 §7) ---- */
SCENES.atlas = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'One more relation is decided by a Schur remainder', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'rebuilt from all its two-by-two principal blocks', 0.6) * f1;
    const gx = 190, gy = 260, cw = 90, d = 4, pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]], cols = [C.cyan, C.gold, C.mag, C.green, C.orange, C.vio];
    const k = Math.floor(t * 0.8) % 6, [pi, pj] = pairs[k];
    for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) { const on = (i === pi || i === pj) && (j === pi || j === pj); box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, on ? cols[k] : C.dim, q, on ? 2.4 : 1.2, on ? 'rgba(30,30,10,0.5)' : 'rgba(0,0,0,0.35)'); lblG('ρ' + (i + 1) + (j + 1), gx + j * cw + 42, gy + i * cw + 52, on ? C.white : C.dim, q, 18); }
    lblG('B_ij = [[p_i , ρ_ij] , [ρ_ij* , p_j]] ,  N_ij = p_i + p_j', 370, 650, C.white, q, 18);
    const mq = Q(S, 0, 'with masses adding to d minus one', 0.6) * f1;
    chipG(370, 715, 520, 56, 'Σ_(i<j) N_ij = d − 1', C.gold, mq, 24);
    lblG('ρ = Σ ι_ij B_ij ι_ij† − (d − 2) diag(p)', 370, 780, C.dim, mq, 16);
    const cq = Q(S, 0, 'Pure blocks can still conflict', 0.6) * f1;
    const M = [['1', '−1', '−1'], ['−1', '1', '−1'], ['−1', '−1', '1']];
    lbl('M = (1/3) ×', 900, 330, C.white, cq, 20, 'right');
    M.forEach((row, i) => row.forEach((v, j) => cell105(920 + j * 70, 255 + i * 62, 62, 54, v, i === j ? C.gold : C.red, cq, 20)));
    lbl('each 2 × 2 block : rank one , positive ;  Tr M = 1', 1030, 470, C.dim, cq, 15);
    const tq = Q(S, 0, 'since phases must close around cycles', 0.6) * f1;
    const tri = [[1460, 262], [1370, 410], [1550, 410]];
    [[0, 1], [1, 2], [2, 0]].forEach(([i, j]) => { line(tri[i][0], tri[i][1], tri[j][0], tri[j][1], C.red, tq, 3); lblG('−1', (tri[i][0] + tri[j][0]) / 2 + (i === 1 ? 0 : (i === 0 ? -26 : 26)), (tri[i][1] + tri[j][1]) / 2 + (i === 1 ? 30 : 0), C.red, tq, 18); });
    tri.forEach((p, i) => { dot(p[0], p[1], 14, 'w', tq); lbl(String(i + 1), p[0], p[1] - 20, C.white, tq, 16); });
    lblG('cycle product (−1)³ = −1 ≠ 1', 1460, 484, C.red, tq, 20);
    const eq = Q(S, 0, 'give eigenvalue minus one third', 0.6) * f1;
    const bx = 1150, by = 670, ev = V105.m3_eigs;
    line(bx - 10, by, bx + 470, by, C.dim, eq, 1.2);
    ev.forEach((v, i) => { const x = bx + i * 160, h = v * 210; fillBox(x, h > 0 ? by - h : by, 100, Math.abs(h), v < 0 ? C.red : C.cyan, eq * 0.45); rect63(x, h > 0 ? by - h : by, 100, Math.abs(h), v < 0 ? C.red : C.cyan, eq, 1.6); lbl(v < 0 ? '−1/3' : '2/3', x + 50, v > 0 ? by - h - 12 : by - h + 26, v < 0 ? C.red : C.white, eq, 18); });
    lbl('spectrum of M :  M(1,1,1)ᵀ = −(1/3)(1,1,1)ᵀ', 1390, by + 125, C.white, eq, 16);
  }
  const q1 = Q(S, 1, 'One more relation is decided by a Schur remainder', 0.6, 0.3);
  if (q1 > 0) {
    const gx = 170, gy = 270;
    fillBox(gx, gy, 300, 300, C.cyan, q1 * 0.2); rect63(gx, gy, 300, 300, C.cyan, q1, 2); lblG('A', gx + 150, gy + 160, C.cyan, q1, 40);
    fillBox(gx + 310, gy, 90, 300, C.gold, q1 * 0.2); rect63(gx + 310, gy, 90, 300, C.gold, q1, 2); lblG('b', gx + 355, gy + 160, C.gold, q1, 32);
    fillBox(gx, gy + 310, 300, 90, C.gold, q1 * 0.2); rect63(gx, gy + 310, 300, 90, C.gold, q1, 2); lblG('b†', gx + 150, gy + 368, C.gold, q1, 32);
    fillBox(gx + 310, gy + 310, 90, 90, C.mag, q1 * 0.2); rect63(gx + 310, gy + 310, 90, 90, C.mag, q1, 2); lblG('c', gx + 355, gy + 368, C.mag, q1, 32);
    lblG('Q ⪰ 0  ⇔  A ⪰ 0 ,  b ∈ Ran A ,  s = c − b†A⁺b ≥ 0', 640, 300, C.white, q1, 19, 'left');
    const rq = Q(S, 1, 'the rank grows exactly when it is positive', 0.6);
    chipG(900, 380, 560, 60, 'rank Q = rank A + 1_(s > 0)', C.gold, rq, 24);
    lbl('s = 0 : no new orthogonal component ; pure stays pure only if rank A = 1', 900, 445, C.dim, rq, 15);
    const tq = Q(S, 1, 'A pure state also rebuilds from an ordered binary tree', 0.6);
    const leaves = [1, 0, 1, 1, 0, 1, 0, 1], lx = l => 760 + l * 70, ly = 780;
    const lev = [[0, 8], [0, 4], [4, 8], [0, 2], [2, 4], [4, 6], [6, 8]];
    const yOf = n => n[1] - n[0] === 8 ? 520 : n[1] - n[0] === 4 ? 610 : 700, xOf = n => (lx(n[0]) + lx(n[1] - 1)) / 2;
    const act = n => { const m = (n[0] + n[1]) / 2; return leaves.slice(n[0], m).some(x => x) && leaves.slice(m, n[1]).some(x => x); };
    const nq = Q(S, 1, 'where s nonzero leaves need s minus one nodes', 0.6);
    lev.forEach(n => { const m = (n[0] + n[1]) / 2; const kids = n[1] - n[0] === 2 ? [[n[0], n[0] + 1], [m, n[1]]] : [[n[0], m], [m, n[1]]]; kids.forEach(c => { const cx = c[1] - c[0] === 1 ? lx(c[0]) : xOf(c), cy = c[1] - c[0] === 1 ? ly : yOf(c); line(xOf(n), yOf(n), cx, cy, C.dim, tq, 1.6); }); });
    lev.forEach(n => { const on = act(n); dot(xOf(n), yOf(n), on ? 13 : 8, on ? 'g' : 'w', tq * (on ? Math.max(nq, 0.4) : 0.5)); });
    leaves.forEach((v, i) => { dot(lx(i), ly, v ? 11 : 7, v ? 'c' : 'w', tq * (v ? 1 : 0.35)); });
    lbl('leaves (cyan : nonzero , grey : zero mark)', 1005, ly + 40, C.dim, tq, 15);
    chipG(1530, 600, 420, 62, 's = 5  →  4 nodes ,  8 reals', C.green, nq, 22);
    lblG('χ_v = a_v χ_L ⊕ b_v χ_R ,  a_v > 0 ,  |a_v|² + |b_v|² = 1', 1530, 680, C.white, nq, 16);
    lbl('no fixed channel turns an unknown ψ into a product of node states', 1530, 715, C.dim, nq, 14);
  }
};

/* ---- 07 HISTORY (V51 §10–§12) ---- */
SCENES.history = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'Zero propagation residual forces', 'lean'], [0, 'A start constraint then leaves', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'A gap delta bounds the distance', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Zero propagation residual', 0.6) * f1;
    const sx = 170, sy = 300;
    for (let k = 0; k < 6; k++) { const x = sx + k * 135; box(x, sy, 100, 80, k === 0 ? C.gold : C.cyan, q, 2, 'rgba(0,0,0,0.45)'); lblG(k === 5 ? 'x_T' : 'x' + ['₀', '₁', '₂', '₃', '₄'][k], x + 50, sy + 50, C.white, q, 22); lbl(k === 5 ? '|T⟩' : '|' + k + '⟩', x + 50, sy - 14, C.dim, q, 15); if (k < 5) { arrow(x + 102, sy + 40, x + 133, sy + 40, C.cyan, q, 2); lblG(k === 4 ? '⋯' : 'U' + ['₁', '₂', '₃', '₄'][k], x + 118, sy + 100, C.dim, q, 16); } }
    const lq = Q(S, 0, 'Zero propagation residual forces', 0.6) * f1;
    chipG(530, 470, 800, 60, 'D_T x = (x_t − U_t x_(t−1))_t = 0  ⇔  x_t = W_t x₀', C.green, lq, 21);
    lbl('Lean : FinitePropagationHistory.propagation_kernel , history_range (frozen)', 530, 530, C.green, lq, 15);
    const cq = Q(S, 0, 'A start constraint then leaves one history state', 0.6) * f1;
    chipG(530, 600, 800, 58, 'H_T = D_T† D_T + |0⟩⟨0| ⊗ (I − |φ⟩⟨φ|)', C.gold, cq, 22);
    lblG('ker H_T = span Ω_T ,  Ω_T = N^(−1/2) Σ_t |t⟩ ⊗ W_t φ ,  N = T + 1', 530, 665, C.white, cq, 17);
    lbl('without the start constraint : kernel as large as the system', 530, 705, C.dim, cq, 15);
    const gq = Q(S, 0, 'with residual gap at least one over N squared', 0.6) * f1;
    chipG(530, 765, 800, 56, 'H_T ⪰ N^(−2) (I − |Ω_T⟩⟨Ω_T|)', C.mag, gq, 23);
    const px = 1060, py = 760, pw = 680, ph = 420, xS = n => px + (n - 1) / 24 * pw, yS = v => py - v / 2.6 * ph;
    plotAxes(px, py, pw, ph, gq, 'N = T + 1', 'N² × gap of H_T');
    dashed(px, yS(1), px + pw, yS(1), C.red, gq, 2); lbl('bound : N² gap ≥ 1', px + pw - 6, yS(1) + 26, C.red, gq, 16, 'right');
    dashed(px, yS(Math.PI * Math.PI / 4), px + pw, yS(Math.PI * Math.PI / 4), C.dim, gq, 1.2); lbl('π²/4', px + pw + 8, yS(Math.PI * Math.PI / 4) + 5, C.dim, gq, 15, 'left');
    V105.hist_gap.forEach((r, i) => { const qq = clamp(gq * 1.6 - i / 30); dot(xS(r[0]), yS(r[1]), 7, 'm', qq); });
    lbl('3 random unitary chains per N , d = 3 (minimum shown)', px + 20, py - ph + 10, C.dim, gq, 15, 'left');
    [1, 5, 10, 15, 20, 25].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, gq, 14));
  }
  const q1 = Q(S, 1, 'A gap delta bounds the distance', 0.6, 0.3);
  if (q1 > 0) {
    chipG(530, 260, 860, 62, 'H ⪰ Δ (I − |φ⟩⟨φ|)  ⇒  D(ρ, |φ⟩⟨φ|) ≤ √( Tr(Hρ) / Δ )', C.gold, q1, 21);
    const hq = Q(S, 1, 'here N times the root penalty', 0.6);
    chipG(530, 345, 860, 58, 'D(ρ, |Ω_T⟩⟨Ω_T|) ≤ N √Tr(H_T ρ)', C.mag, hq, 23);
    lbl('without a gap even a one-dimensional kernel fails : H e_n = e_n / n', 530, 405, C.dim, hq, 15);
    const iq = Q(S, 1, 'Infinite weighted histories stay unique and pure', 0.6);
    lblG('Ω = Σ_t √w_t |t⟩ ⊗ W_t φ ,  Σ w_t = 1 :  unique zero-penalty state', 530, 470, C.white, iq, 17);
    const nq = Q(S, 1, 'but their local residual has no gap', 0.6);
    const px = 170, py = 780, pw = 720, ph = 260, xS = n => px + (n - 1) / 11 * pw, yS = v => py - (lg105(v) + 8) / 8 * ph;
    plotAxes(px, py, pw, ph, nq, 'n', 'energy of unit y_n ⊥ Ω (log)');
    V105.inf_energy.forEach((r, i) => { const qq = clamp(nq * 1.6 - i / 14); dot(xS(r[0]), yS(r[1]), 8, 'c', qq); });
    pl105(V105.inf_energy, xS, yS, C.cyan, nq * 0.6, 2);
    lbl('w_t = 2^(−t−1) : energies → 0', px + pw, py - ph - 14, C.cyan, nq, 15, 'right');
    stamp('NO POSITIVE GAP', 700, 572, nq, C.red, 26, -0.04);
    const gq = Q(S, 1, 'pure GHZ states can converge locally to a mixture', 0.6);
    box(1060, 250, 720, 520, C.vio, gq, 2, 'rgba(20,10,40,0.35)');
    lbl('GHZ_N on the first N bits , then 0s', 1420, 295, C.vio, gq, 19);
    for (let b = 0; b < 12; b++) { const x = 1110 + b * 52, on = b < 6; box(x, 330, 42, 42, on ? C.gold : C.dim, gq, 1.6, on ? 'rgba(40,30,0,0.45)' : 'rgba(0,0,0,0.3)'); lbl(on ? '?' : '0', x + 21, 358, on ? C.gold : C.dim, gq, 18); }
    lblG('ω_N pure for every N', 1420, 430, C.white, gq, 22);
    lblG('local limit :  ½ ω_(0^∞) + ½ ω_(1^∞)', 1420, 500, C.gold, gq, 24);
    lbl('fixed m < N : prefix state ½|0^m⟩⟨0^m| + ½|1^m⟩⟨1^m|', 1420, 560, C.dim, gq, 15);
    lblG('⟨X^⊗N⟩ = 1 in ω_N ,  0 in the limit', 1420, 620, C.white, gq, 19);
    stamp('PURE → MIXED LOCALLY', 1420, 710, gq, C.vio, 26, -0.04);
  }
};

/* ---- 08 HOPF (V52 §1–§3) ---- */
SCENES.hopf = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'no continuous injective chart into the plane exists', 'classical'], [1, 'With the larger amplitude as denominator', 'theory']]);
  const f1 = 1 - Q(S, 1, 'A flat disc needs a hemisphere flag', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two complex amplitudes become three real coordinates', 0.6) * f1;
    chipG(530, 255, 860, 62, 'Q(a, b) = ( 2 Re(ā b) , 2 Im(ā b) , |a|² − |b|² )', C.gold, q, 22);
    const lq = Q(S, 0, 'whose length is the total weight', 0.6) * f1;
    lblG('‖Q‖ = |a|² + |b|² = S ;   Q(z) = Q(w)  ⇔  w = e^(iθ) z', 530, 325, C.white, lq, 19);
    chipG(530, 395, 860, 58, '(ℂ² ∖ 0) / U(1)  ≅  ℝ³ ∖ 0', C.cyan, lq, 26);
    const rows = [['ℂ² ∖ 0', '4', 'phase and scale kept', C.white], ['z z† (rank one)', '3', 'common phase divided out', C.gold], ['S³ (unit amplitudes)', '3', 'norm fixed , phase kept', C.dim], ['ℂP¹ ≅ S² (pure states)', '2', 'phase and scale divided out', C.cyan]];
    const sq = Q(S, 0, 'normalised pure states form a sphere', 0.6) * f1;
    rows.forEach(([a1, a2, a3, col], i) => { const qq = i < 2 ? lq : sq, y = 455 + i * 72; box(150, y, 760, 60, col, qq, 1.5, 'rgba(0,0,0,0.45)'); lblG(a1, 180, y + 39, col, qq, 20, 'left'); lbl(a2, 560, y + 40, C.white, qq, 24); lbl(a3, 880, y + 38, C.dim, qq, 15, 'right'); });
    const cx = 1400, cy = 480, R = 210;
    sph105(cx, cy, R, sq, C.cyan, true);
    for (let i = 0; i < 18; i++) { const th = i * TAU / 18 + t * 0.15, z = Math.cos(i * 0.9) * 0.8, rr = Math.sqrt(1 - z * z), P = bp105(cx, cy, R, [rr * Math.cos(th), rr * Math.sin(th), z]); dot(P[0], P[1], 8, i % 3 ? 'c' : 'g', sq * 0.85); }
    lblG('Tr(ρ_r ρ_s) = (1 + r·s)/2', cx, cy + R + 38, C.white, sq, 21);
    const oq = Q(S, 0, 'Only the common phase is lost', 0.6) * f1;
    stamp('ONLY THE COMMON PHASE IS LOST', 1400, 805, oq, C.gold, 24, -0.03);
  }
  const q1 = Q(S, 1, 'A flat disc needs a hemisphere flag', 0.6, 0.3);
  if (q1 > 0) {
    const cx = 480, cy = 400, R = 170;
    sph105(cx, cy, R, q1, C.cyan, false);
    const top = bp105(cx, cy, R, [0, 0, 1]), bot = bp105(cx, cy, R, [0, 0, -1]);
    dot(top[0], top[1], 13, 'g', q1); lbl('|0⟩', top[0] + 20, top[1] + 6, C.gold, q1, 20, 'left');
    dot(bot[0], bot[1], 13, 'm', q1); lbl('|1⟩', bot[0] + 20, bot[1] + 6, C.mag, q1, 20, 'left');
    const dy = 690;
    fillEll105(cx, dy, R, R * 0.3, C.cyan, q1 * 0.12); ell105(cx, dy, R, R * 0.3, C.cyan, q1, 2);
    dashed(top[0], top[1], cx, dy, C.gold, q1, 1.6); dashed(bot[0], bot[1], cx, dy, C.mag, q1, 1.6);
    dot(cx, dy, 12, 'w', q1); lblG('(r_x , r_y) = (0 , 0) for both', cx, dy + 80, C.white, q1, 18);
    lblG('r_z = ± √(1 − r_x² − r_y²)', cx + R + 30, dy - 10, C.gold, q1, 18, 'left');
    const nq = Q(S, 1, 'no continuous injective chart into the plane exists', 0.6);
    chipG(1400, 270, 760, 60, 'no continuous injective  f : S² → ℝ²', C.red, nq, 23);
    lbl('domain invariance (Hatcher , Theorem 2B.3) : image open , compact , in connected ℝ²', 1400, 330, '#8fbcff', nq, 14);
    const cq = Q(S, 1, 'With the larger amplitude as denominator', 0.6);
    chipG(1400, 400, 760, 58, 'D(P_w , P_v) = |w − v| / √((1 + |w|²)(1 + |v|²))', C.cyan, cq, 20);
    const px = 1060, py = 780, pw = 680, ph = 300, xS = x => px + x / 2 * pw, yS = v => py - (v - 0.3) / 0.8 * ph;
    plotAxes(px, py, pw, ph, cq, '|w − v|  ( |w| , |v| ≤ 1 )', 'D / |w − v|');
    dashed(px, yS(1), px + pw, yS(1), C.gold, cq, 1.8); dashed(px, yS(0.5), px + pw, yS(0.5), C.gold, cq, 1.8);
    lbl('1', px - 10, yS(1) + 5, C.gold, cq, 15, 'right'); lbl('1/2', px - 10, yS(0.5) + 5, C.gold, cq, 15, 'right');
    V105.chart_ratio.forEach((p, i) => { const qq = clamp(cq * 1.6 - i / 300); dot(xS(p[0]), yS(p[1]), 4.5, 'c', qq); });
    lbl('220 sampled chart pairs', px + pw, py - ph + 4, C.cyan, cq, 15, 'right');
  }
};

/* ---- 09 SQUARE (V51 §5, V52 §5) ---- */
SCENES.square = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Phase sharpens this', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Every power of a residual has the same zero set', 0.6) * f1;
    chipG(530, 260, 860, 60, '‖Lψ‖^q = 0  ⇔  Lψ = 0   for every q > 0', C.cyan, q, 24);
    const eq = Q(S, 0, "only the square is a fixed positive operator's expectation", 0.6) * f1;
    chipG(530, 345, 860, 60, '‖Lψ‖^q = ⟨ψ, H_L ψ⟩ for all ψ ,  L ≠ 0  ⇒  q = 2', C.gold, eq, 22);
    const sq = Q(S, 0, 'scaling by c gives c to the q on one side', 0.6) * f1;
    lblG('ψ → cψ :   |c|^q ‖Lψ‖^q   versus   |c|² ⟨ψ, H_L ψ⟩', 530, 420, C.white, sq, 20);
    lbl('q = 2 : H_L = L†L ;  the readout Tr(H_L ρ) is affine in mixtures', 530, 460, C.dim, sq, 15);
    const px = 160, py = 770, pw = 720, ph = 270, xS = x => px + x / 1.4 * pw, yS = v => py - v / 4 * ph;
    plotAxes(px, py, pw, ph, sq, '|c|', 'scale factor');
    [[1, C.dim], [2, C.gold], [3, C.mag], [4, C.cyan]].forEach(([qq, col], i) => { const a = clamp(sq * 1.6 - i * 0.15); curve(p => { const x = p * 1.4; return [xS(x), yS(Math.pow(x, qq))]; }, 60, col, a, qq === 2 ? 4 : 2.5); lbl('|c|^' + qq, px + 200 + i * 110, py - ph + 8, col, a, 16, 'left'); });
    lbl('only |c|² matches a fixed quadratic form', px + pw / 2, py + 52, C.gold, sq, 15);
    const xq = Q(S, 0, 'c squared on the other', 0.6) * f1;
    box(1060, 260, 720, 280, C.orange, xq, 2, 'rgba(40,20,0,0.3)');
    lbl('HIGHER DEGREES NEED NEW COORDINATES', 1420, 300, C.orange, xq, 18);
    lblG('x⁴ + y⁴ = 1 is linear in (x⁴, x³y, x²y², xy³, y⁴)', 1420, 370, C.white, xq, 19);
    lbl('but those five coordinates must obey their own compatibility equations', 1420, 420, C.dim, xq, 15);
    lbl('the square is a norm of a fixed linear map in the source variables', 1420, 470, C.green, xq, 16);
    lblG('projection example :  p^(q/2) = p for all 0 < p < 1  ⇒  q = 2', 1420, 620, C.white, xq, 18);
  }
  const q1 = Q(S, 1, 'Phase sharpens this', 0.6, 0.3);
  if (q1 > 0) {
    chipG(530, 255, 860, 60, 'z^α (z*)^β  ↦  e^(i(|α| − |β|)θ) z^α (z*)^β', C.cyan, q1, 23);
    const bq = Q(S, 1, 'exactly when every monomial is balanced', 0.6);
    const gx = 230, gy = 330, cw = 92;
    for (let a = 0; a <= 4; a++) for (let b = 0; b <= 4; b++) { const bal = a === b, col = bal ? C.gold : C.dim, x = gx + a * cw, y = gy + (4 - b) * cw * 0.85; const qq = clamp(bq * 1.6 - (a + b) / 12); box(x, y, cw - 8, cw * 0.85 - 8, col, qq, bal ? 2.4 : 1.2, bal ? 'rgba(40,30,0,0.5)' : 'rgba(0,0,0,0.3)'); lbl(bal ? (a === 0 ? '1' : 'G^' + a) : '×', x + (cw - 8) / 2, y + cw * 0.42, bal ? C.gold : C.dim, qq, bal ? 18 : 16); }
    lbl('|α| →', gx + 2.5 * cw, gy + 5 * cw * 0.85 + 20, C.dim, bq, 16); lbl('|β| ↑', gx - 40, gy + 2 * cw * 0.85, C.dim, bq, 16, 'right');
    lbl('gold : invariant (balanced) ; grey : not invariant', gx + 2.5 * cw, gy + 5 * cw * 0.85 + 50, C.white, bq, 15);
    const gq = Q(S, 1, 'all invariants are generated by the quadratics z i times z j bar', 0.6);
    chipG(1400, 300, 760, 62, 'G_ij(z) = z_i z*_j  generate ; lowest degree 2', C.gold, gq, 22);
    lblG('G_ij G_kl = G_il G_kj ;   z z† separates phase orbits , keeps Tr = ‖z‖²', 1400, 365, C.white, gq, 17);
    lblG('real quadratic invariants :  Q_H(z) = z†Hz ,  H = H† ;  ≥ 0  ⇔  H ⪰ 0', 1400, 410, C.dim, gq, 16);
    const dq = Q(S, 1, 'with d squared real generators needed', 0.6);
    chipG(1400, 500, 760, 60, 'd² real quadratic generators , no fewer', C.green, dq, 24);
    const bx = 1110, by = 760;
    [1, 2, 3, 4, 5].forEach((d, i) => { const h = d * d * 7, qq = clamp(dq * 1.6 - i * 0.15); fillBox(bx + i * 120, by - h, 70, h, C.green, qq * 0.45); rect63(bx + i * 120, by - h, 70, h, C.green, qq, 1.5); lbl(String(d * d), bx + i * 120 + 35, by - h - 10, C.white, qq, 17); lbl('d=' + d, bx + i * 120 + 35, by + 24, C.dim, qq, 14); });
    lbl('d = 2 :  S , Q_x , Q_y , Q_z  (S = ‖Q‖ is a non-polynomial recovery)', 1400, by + 58, C.dim, dq, 14);
  }
};

/* ---- 10 BORN (V52 §6, §10) ---- */
SCENES.born = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Matching three axes is not enough', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A nonnegative radial weight adding over orthogonal pieces', 0.6) * f1;
    chipG(530, 260, 860, 60, 'u ⊥ v  ⇒  W(u + v) = W(u) + W(v) ,  W ≥ 0 radial', C.cyan, q, 22);
    const cq = Q(S, 0, 'is a constant times the squared norm', 0.6) * f1;
    chipG(530, 340, 860, 58, '⇒  W(v) = c ‖v‖²   (no continuity assumed)', C.gold, cq, 24);
    const px = 160, py = 780, pw = 720, ph = 330, xS = x => px + (x - 0.5) / 3.5 * pw, yS = v => py - ph / 2 - v / 2.2 * (ph / 2);
    plotAxes(px, py, pw, ph, cq, 'exponent q', 'W(u+v) − W(u) − W(v) for W = ‖·‖^q');
    dashed(px, yS(0), px + pw, yS(0), C.dim, cq, 1.2);
    pl105(V105.add_defect, xS, yS, C.cyan, cq, 3);
    dot(xS(2), yS(0), 14, 'g', cq); lbl('q = 2', xS(2), yS(0) + 34, C.gold, cq, 18);
    lbl('unit orthogonal u , v :  2^(q/2) − 2', px + 30, py - ph + 14, C.dim, cq, 15, 'left');
    [1, 2, 3, 4].forEach(x => lbl(String(x), xS(x), py + 26, C.dim, cq, 14));
    const eq = Q(S, 0, 'an additive readout on all effects is a trace against a density matrix', 0.6) * f1;
    chipG(1400, 300, 760, 60, 'F(A + B) = F(A) + F(B) on 0 ⪯ E ⪯ I ,  F(I) = 1', C.cyan, eq, 21);
    chipG(1400, 385, 760, 60, '⇒  F(E) = Tr(ρE)  for a unique density ρ', C.gold, eq, 23);
    const bq = Q(S, 0, "giving Born's square for pure sources", 0.6) * f1;
    chipG(1400, 470, 760, 60, 'F(P_ψ) = 1  ⇒  ρ = P_ψ ,  F(E) = ψ†Eψ', C.green, bq, 23);
    lbl('one-dimensional projection :  p_i = |⟨e_i , z⟩|² / ‖z‖²', 1400, 535, C.white, bq, 17);
    lbl('inputs : inner product , orthogonality , additivity , share interpretation', 1400, 575, C.dim, bq, 14);
  }
  const q1 = Q(S, 1, 'Matching three axes is not enough', 0.6, 0.3);
  if (q1 > 0) {
    chipG(530, 255, 860, 60, 'w(P(n)) = (1 + n_z³)/2 :  w(P(n)) + w(P(−n)) = 1', C.mag, q1, 22);
    lbl('on the three axes it agrees with the Born values of |0⟩⟨0|', 530, 315, C.dim, q1, 15);
    const cx = 330, cy = 520, R = 150;
    sph105(cx, cy, R, q1, C.cyan, false);
    const np = [Math.sqrt(3) / 2, 0, 0.5], nm = [-Math.sqrt(3) / 2, 0, 0.5];
    const dq = Q(S, 1, 'gives one effect nine sixteenths through one decomposition', 0.6);
    [[np, 'n₊'], [nm, 'n₋']].forEach(([n, l]) => { const P = bp105(cx, cy, R, n); arrow(cx, cy, P[0], P[1], C.mag, dq, 2.5); dot(P[0], P[1], 11, 'm', dq); lblG(l, P[0] + (n[0] > 0 ? 16 : -16), P[1] - 10, C.mag, dq, 18, n[0] > 0 ? 'left' : 'right'); });
    const rq = Q(S, 1, 'and three quarters through another', 0.6);
    [[[0, 0, 1], '+e_z'], [[0, 0, -1], '−e_z']].forEach(([n, l]) => { const P = bp105(cx, cy, R, n); dot(P[0], P[1], 11, 'g', rq); lblG(l, P[0] + 18, P[1] + 6, C.gold, rq, 18, 'left'); });
    lblG('½P(n₊) + ½P(n₋) = ¾P(e_z) + ¼P(−e_z)', 400, 760, C.white, dq, 19);
    const bx = 640, by = 650, cb = V105.cubic;
    [[cb[0], C.mag, '9/16', dq, 'left split'], [cb[1], C.gold, '3/4', rq, 'right split']].forEach(([v, col, l, qq, lab], i) => { const h = v * 230, x = bx + i * 120; fillBox(x, by - h, 80, h, col, qq * 0.45); rect63(x, by - h, 80, h, col, qq, 1.6); lbl(l, x + 40, by - h - 12, C.white, qq, 20); lbl(lab, x + 40, by + 26, C.dim, qq, 14); });
    stamp('NOT ADDITIVE', 780, 385, rq, C.red, 28, -0.05);
    const oq = Q(S, 1, 'Orthogonal internal records then carry exactly the squared branch norms', 0.6);
    chipG(1400, 300, 760, 60, 'V ψ = Σ_i |i⟩ ⊗ K_i ψ ,  Σ K_i†K_i = I', C.cyan, oq, 22);
    chipG(1400, 385, 760, 58, 'p_i = ‖K_i ψ‖² ,  p_h = ‖K_(i_t) ⋯ K_(i_1) ψ‖²', C.gold, oq, 21);
    const rp = V105.rec_p, rx = 1170, ry = 700;
    rp.forEach((v, i) => { const h = v * 300, x = rx + i * 160; fillBox(x, ry - h, 100, h, C.gold, oq * 0.45); rect63(x, ry - h, 100, h, C.gold, oq, 1.5); lbl(v.toFixed(3), x + 50, ry - h - 12, C.white, oq, 17); lbl('record ' + (i + 1), x + 50, ry + 26, C.dim, oq, 14); });
    lbl('one sampled 3-outcome instrument : records sum to 1 ; histories too', 1400, ry + 62, C.dim, oq, 14);
  }
};

/* ---- 11 COMPRESS (V52 §4, §8) ---- */
SCENES.compress = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Lossless physical compression depends on the whole family', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Rank r density matrices in dimension d', 0.6) * f1;
    chipG(530, 260, 860, 60, 'dim { ρ : rank ρ = r } = 2dr − r² − 1', C.gold, q, 25);
    const gx = 260, gy = 340, cw = 120, ch = 70, tab = V105.dimtab;
    [1, 2, 3, 4, 5].forEach((r, j) => lbl('r=' + r, gx + j * cw + 55, gy + 18, C.dim, q, 15));
    tab.forEach((row, i) => { lbl('d=' + (i + 2), gx - 20, gy + 40 + i * ch + 42, C.dim, q, 15, 'right'); row.forEach((v, j) => { const hl = (i === 1 && j === 0) || (i === 0 && j === 1); cell105(gx + j * cw, gy + 40 + i * ch, cw - 10, ch - 10, String(v), hl ? C.gold : C.cyan, clamp(q * 1.6 - (i + j) / 10), 22, hl ? 0.4 : 0.15); }); });
    const pq = Q(S, 0, 'so a qutrit pure state has four', 0.6) * f1;
    lbl('qutrit pure : 4 ;  qubit mixed : 3   (recomputed : Jacobian rank)', 530, gy + 40 + 4 * ch + 30, C.gold, pq, 16);
    const eq = Q(S, 0, 'the nearest rank-m state lies at the eigenvalue tail sum', 0.6) * f1;
    chipG(1400, 280, 760, 62, 'min_(rank σ ≤ m) D(ρ, σ) = Σ_(j > m) λ_j', C.cyan, eq, 23);
    lbl('attained by P_m ρ P_m / Tr(P_m ρ) ;  nearest pure state : 1 − λ₁', 1400, 340, C.dim, eq, 15);
    const lam = V105.rank_lams, bx = 1130, by = 700;
    lam.forEach((v, i) => { const h = v * 600, x = bx + i * 180; fillBox(x, by - h, 120, h, i === 0 ? C.cyan : C.mag, eq * 0.45); rect63(x, by - h, 120, h, i === 0 ? C.cyan : C.mag, eq, 1.6); lbl('λ' + (i + 1) + ' = ' + v, x + 60, by - h - 12, C.white, eq, 17); });
    lbl('m = 1 : distance 0.3 + 0.2 = 0.5', 1400, by + 34, C.mag, eq, 17);
    lbl('qubit :  min over pure P of D(ρ_r , P) = (1 − ‖r‖)/2', 1400, by + 70, C.dim, eq, 15);
  }
  const q1 = Q(S, 1, 'Lossless physical compression depends on the whole family', 0.6, 0.3);
  if (q1 > 0) {
    chipG(W / 2, 260, 1400, 60, 'R ∘ E (ρ) = ρ on the whole target family ,  E , R fixed CPTP ,  E : D(H) → D(ℂ^m)', C.cyan, q1, 21);
    const sq = Q(S, 1, 'an r-dimensional support needs r dimensions', 0.6);
    box(160, 340, 760, 330, C.gold, sq, 2, 'rgba(40,30,0,0.3)');
    lbl('FIXED SUPPORT K , dim K = r', 540, 385, C.gold, sq, 20);
    lblG('all of D(K) recovered  ⇔  m ≥ r', 540, 450, C.white, sq, 26);
    lblG('attained :  E(ρ) = V†ρV + Tr((I − P_K)ρ) τ₀ ,  R(σ) = VσV†', 540, 515, C.white, sq, 17);
    lbl('lower bound : the family spans all r² Hermitian matrices on K', 540, 565, C.dim, sq, 15);
    lbl('with a full-rank purification kept , one state of rank r already needs m ≥ r', 540, 610, C.dim, sq, 14);
    const fq = Q(S, 1, 'a family of pure states needs the dimension of its linear span', 0.6);
    box(1000, 340, 760, 330, C.mag, fq, 2, 'rgba(40,0,40,0.3)');
    lbl('ANY FAMILY OF PURE STATES', 1380, 385, C.mag, fq, 20);
    lblG('m ≥ dim span { ψ : P_ψ ∈ ℱ }', 1380, 450, C.white, fq, 26);
    const ox = 1180, oy = 600;
    [[1, 0.1, C.cyan], [0.2, 1, C.gold], [-0.6, 0.5, C.green]].forEach(([x, y, col], i) => { const qq = clamp(fq * 1.6 - i * 0.2); arrow(ox, oy, ox + x * 110, oy - y * 110, col, qq, 3); });
    lbl('ψ₁ , ψ₂ , ψ₃ : each rank one', ox + 60, oy + 40, C.dim, fq, 15);
    arrow(1350, 560, 1470, 560, C.dim, fq, 2.5); box(1490, 500, 200, 120, C.mag, fq, 2, 'rgba(0,0,0,0.5)'); lbl('m ≥ 3', 1590, 572, C.white, fq, 26);
    const oq = Q(S, 1, 'though each member has rank one', 0.6);
    stamp('RANK ONE EACH , NOT ONE DIMENSION', W / 2, 760, oq, C.red, 26, -0.03);
  }
};

/* ---- 12 K-BONACCI (V52 §9) ---- */
SCENES.kbonacci = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'Each legal window of length k plus one', 'lean'], [0, 'Two windows per preparation', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'That needs two k minus two windows', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'K-bonacci acquisition', 0.6) * f1;
    chipG(530, 255, 860, 60, 'target R = c ℓᵀ ,  c , ℓ ∈ (0, ∞)^k ;  each run prepares the same unknown c', C.white, q, 19);
    const lq = Q(S, 0, 'acts as a rank-one endpoint operator', 0.6) * f1;
    chipG(530, 335, 860, 58, 'window 1^p 0^(k+1−p−t) 1^t  acts as  E_(p,t) = e_t r_pᵀ', C.green, lq, 21);
    lbl('Lean : KBonacciActualEndpointOperators.actual_endpoint_operators (frozen)', 530, 390, C.green, lq, 14);
    const gx = 260, gy = 430, cw = 50, k = 5, p = 3, tt = 2;
    for (let i = 0; i < k; i++) for (let s = 0; s < k; s++) { const on = i === tt && s + p < k; box(gx + s * cw, gy + i * cw, cw - 5, cw - 5, on ? C.green : C.dim, lq, on ? 2.2 : 1, on ? 'rgba(0,40,20,0.5)' : 'rgba(0,0,0,0.3)'); lbl(on ? '1' : '0', gx + s * cw + 22, gy + i * cw + 31, on ? C.green : C.dim, lq, 15); }
    lbl('k = 5 , p = 3 , t = 2', gx + 2.5 * cw, gy + k * cw + 26, C.dim, lq, 15);
    lbl('keeps c₀ + c₁ , puts it at slot 2', gx + 2.5 * cw, gy + k * cw + 52, C.white, lq, 15);
    const wq = Q(S, 0, 'Two windows per preparation read', 0.6) * f1;
    const wins = V105.kb_windows5;
    lbl('k = 5 protocol words (run j)', 720, 450, C.dim, wq, 15);
    wins.forEach(([a1, a2], j) => { const y = 470 + j * 58, qq = clamp(wq * 1.6 - j * 0.15); lbl('j=' + (j + 1), 600, y + 30, C.dim, qq, 15, 'left'); lbl(a1, 700, y + 30, C.cyan, qq, 20, 'left'); lbl(a2, 820, y + 30, C.gold, qq, 20, 'left'); });
    chipG(1400, 285, 760, 60, 'Y_j = C_j ℓ_j ,  Z_j = C_j ℓ_(j−1) ,  C_j = Σ_(i<j) c_i', C.cyan, wq, 22);
    const rq = Q(S, 0, 'k minus one preparations rebuild c ell transpose', 0.6) * f1;
    lblG('b_j = b_(j−1) Y_j / Z_j = ℓ_j / ℓ₀ ,  H_j = Z_j / b_(j−1) = ℓ₀ C_j', 1400, 355, C.white, rq, 17);
    lblG('a_i = H_(i+1) − H_i ,  a_(k−1) = (D − Σ a_i b_i) / b_(k−1) ;  R_it = a_i b_t', 1400, 392, C.white, rq, 16);
    const ex = V105.kb_ex;
    box(1040, 430, 720, 340, C.gold, rq, 2, 'rgba(40,30,0,0.3)');
    lbl('example world , k = 4', 1400, 470, C.gold, rq, 18);
    lbl('c = (' + ex.c.join(', ') + ')    ℓ = (' + ex.l.join(', ') + ')    D = ' + ex.D, 1400, 510, C.white, rq, 18);
    ex.YZ.forEach((r, i) => { const qq = clamp(rq * 1.6 - i * 0.2); lbl('run ' + r[0] + ' :  Y = ' + r[1] + ' ,  Z = ' + r[2], 1400, 560 + i * 40, C.cyan, qq, 18); });
    lbl('→  b = (1, 2, 1, 3) ,  a = (2, 1, 3, 1) ,  R = a bᵀ = c ℓᵀ  exactly', 1400, 700, C.green, rq, 17);
    lbl('rechecked for k = 2 … 8 with exact rationals', 1400, 740, C.dim, rq, 14);
  }
  const q1 = Q(S, 1, 'That needs two k minus two windows', 0.6, 0.3);
  if (q1 > 0) {
    const px = 170, py = 760, pw = 720, ph = 420, xS = k => px + 40 + (k - 2) * 105, yS = v => py - v / 22 * ph;
    plotAxes(px, py, pw, ph, q1, 'k', 'resources (sharp worst case)');
    const ser = [[1, C.dim, 'preparations k − 1'], [2, C.cyan, 'windows 2k − 2'], [3, C.mag, 'reads A 3k − 3'], [4, C.gold, 'reads B 2k − 1']];
    V105.kb_res.forEach((r, i) => { ser.forEach(([idx, col], j) => { const qq = clamp(q1 * 1.6 - i / 10); fillBox(xS(r[0]) + j * 20 - 40, py - r[idx] / 22 * ph, 16, r[idx] / 22 * ph, col, qq * 0.5); rect63(xS(r[0]) + j * 20 - 40, py - r[idx] / 22 * ph, 16, r[idx] / 22 * ph, col, qq, 1.2); }); lbl(String(r[0]), xS(r[0]), py + 26, C.dim, q1, 14); });
    ser.forEach(([idx, col, l], j) => lbl(l, px + 30, py - ph + 14 + j * 26, col, q1, 15, 'left'));
    const oq = Q(S, 1, 'Over its trace the relation is an oblique projection', 0.6);
    chipG(1400, 270, 760, 60, 'Q = R / S :  Q² = Q ,  Tr Q = 1 ,  rank Q = 1 ,  S = ℓᵀc', C.cyan, oq, 21);
    lbl('Q is a quantum pure state only when c ∝ ℓ ; otherwise oblique', 1400, 330, C.dim, oq, 15);
    const dq = Q(S, 1, 'a positive diagonal similarity makes it pure', 0.6);
    chipG(1400, 405, 760, 60, 'D R D⁻¹ = u uᵀ ,  u_i = √(c_i ℓ_i) ,  D = diag √(ℓ_i / c_i)', C.gold, dq, 20);
    lblG('R = S D⁻¹ P D ,  P_ij = √(q_i q_j) ,  d_j / d_i = √(R_ij / R_ji)', 1400, 470, C.white, dq, 17);
    const kq = Q(S, 1, 'keeping two k minus one numbers', 0.6);
    chipG(1400, 545, 760, 58, 'S , q , D mod scale :  1 + (k − 1) + (k − 1) = 2k − 1', C.green, kq, 21);
    lbl('keeping only P loses scale and asymmetry :', 1400, 610, C.white, kq, 16);
    lblG('R_t = (S/2) [[1 , t] , [1/t , 1]] share P = ½[[1, 1], [1, 1]] for every t > 0', 1400, 650, C.dim, kq, 15);
    lbl('strict positivity is needed : [[1, 1], [0, 0]] has no symmetric diagonal similar', 1400, 690, C.dim, kq, 14);
    lbl('the K-bonacci to native FIB bridge stays open', 1400, 740, C.vio, kq, 15);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'lean'], [1, 'the domain invariance theorem is a classical tool', 'classical'], [1, 'the rest is argued in the two theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['ANTIPODE', 'ρ* = I − Ĥ', C.gold, 'A rank-one constraint picks its antipode'], ['NATIVE', '2u₀ − u(Ĥ)', C.mag, 'native modes reflect it'], ['ANCHORS', 'z_j = C_j0/C₀₀', C.green, 'anchors encode again'], ['BLOCKS', 'Σ N_ij = d − 1', C.cyan, 'blocks glue'], ['HISTORY', 'gap ≥ 1/N²', C.vio, 'a gap stabilises histories'], ['PHASE', 'z_i z*_j', C.orange, 'phase leaves squares'], ['BORN', 'Tr(ρE)', C.white, 'additivity picks Born'], ['K-BONACCI', '2k − 1', C.red, 'K-bonacci windows rebuild a relation']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 230 + (i % 4) * 487, y = 220 + Math.floor(i / 4) * 125, q = Q(S, 0, ph) * fade; box(x - 210, y, 420, 105, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 40, col, q, 19); lblG(a2, x, y + 82, C.white, q, 21); });
    lbl('LEAN · FinitePropagationHistory (zero residual ⇔ x_t = W_t x₀) · KBonacciActualEndpointOperators (window acts as e_t r_pᵀ)', W / 2, 520, C.green, Q(S, 1, 'are frozen in Lean') * fade, 15);
    lbl('CLASSICAL · domain invariance (Hatcher 2B.3) · Pauli algebra · Schur complements · trace distance (Watrous)', W / 2, 565, '#8fbcff', Q(S, 1, 'the domain invariance theorem is a classical tool') * fade, 15);
    lbl('VOLUMES · kernel theorem · antipodal duality · native reflection · anchored codes · cycle law · gap bounds · Hopf quotient · balanced invariants · Born readout · compression · 2k − 1', W / 2, 610, C.orange, Q(S, 1, 'the rest is argued in the two theory volumes') * fade, 14);
    lbl('RECOMPUTED · 15,000+ checks · ν = 0.12852 · N² gap ≥ 1 · 2^(−M)/√3 · −1/3 · 9/16 vs 3/4 · 2dr − r² − 1 · exact K-bonacci rebuild k = 2 … 8', W / 2, 655, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('THE LEAN THEOREMS ARE GENERAL PROJECT RESULTS , NOT DIGESTED FROM THESE TWO VOLUMES', W / 2, 735, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    sph105(W / 2, 360, 170, a * 0.9, C.cyan, true);
    const th = t * 0.3, s = [0.8 * Math.cos(th), 0.8 * Math.sin(th), 0.6], P = bp105(W / 2, 360, 170, s), M = bp105(W / 2, 360, 170, s.map(x => -x));
    arrow(W / 2, 360, P[0], P[1], C.mag, a, 3); dot(P[0], P[1], 12, 'm', a); arrow(W / 2, 360, M[0], M[1], C.gold, a, 3); dot(M[0], M[1], 12, 'g', a);
    txt('AURIC V51–V52 · ANTIPODES', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V51–V52 · 对跖约束、相位商与无损递归 · TRURETURING FILM 105', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A constraint and its solution sit opposite on one sphere; phase leaves only squares.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V51–V52', kernel: 'POSITIVE KERNELS', antipode: 'ANTIPODAL DUALITY', native: 'NATIVE REFLECTION', code: 'ANCHORED CODES', atlas: 'BLOCKS AND TREES', history: 'STATIC HISTORIES', hopf: 'PHASE QUOTIENT', square: 'WHY SQUARES', born: 'BORN READOUT', compress: 'RANK AND COMPRESSION', kbonacci: 'K-BONACCI ACQUISITION', finale: 'LEDGER' });

function poster105() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  sph105(470, 520, 300, 1, C.cyan, true);
  const s = [0.55, 0.35, 0.76], n = Math.hypot(...s), sv = s.map(x => x / n);
  const P = bp105(470, 520, 300, sv), M = bp105(470, 520, 300, sv.map(x => -x));
  arrow(470, 520, P[0], P[1], C.mag, 1, 4); dot(P[0], P[1], 18, 'm', 1);
  arrow(470, 520, M[0], M[1], C.gold, 1, 4); dot(M[0], M[1], 18, 'g', 1);
  txt('ρ* = I − Ĥ  ·  u(ρ*) = 2u₀ − u(Ĥ)', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('(ℂ² ∖ 0) / U(1) ≅ ℝ³ ∖ 0', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('invariants generated by z_i z*_j', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V51–V52', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V51–V52 · ANTIPODES', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('对 跖 约 束 · 相 位 商 · 无 损 递 归', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 105', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster105;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
