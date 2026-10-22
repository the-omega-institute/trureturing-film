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

/* ---- film 065: AURIC Omega III · phase gain and recovery ---- */
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
const _po65 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po65.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po65.set(key, off); }
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

/* ---- film 065 helpers ---- */
function ladder65(x, y, a, hl = {}, w = 150) {
  if (a <= 0) return;
  ['|2⟩', '|1⟩', '|0⟩'].forEach((s, i) => { const yy = y + i * 70, col = hl[2 - i] || C.cyan; line(x, yy, x + w, yy, col, a, 3); lbl(s, x - 16, yy + 7, col, a, 22, 'right'); });
}
const L65 = b => 2 * b / (3 + 2 * Math.sqrt(2 * (1 - b)));
const U65 = b => 1 - Math.sqrt(1 - b);
function arc65(r, al) { if (r === 0 || Math.cos(al) <= 0) return 1; return r <= Math.cos(al) ? Math.sqrt(1 + r * r - 2 * r * Math.cos(al)) : Math.sin(al); }
function vec65(x0, y0, x1, y1, col, a, lw = 3) { if (a <= 0) return; arrow(x0, y0, x1, y1, col, a, lw); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  omega63(460, 450, 150, s0, C.cyan, 7);
  pyrG64(460, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  chip(1290, 290, 420, 62, 'PART II ·  one phase install', C.gold, Q(S, 0, 'one fixed phase completes control', 0.6), 22);
  const qq = Q(S, 0, 'puts that phase to work on a qutrit', 0.6);
  ladder65(1080, 390, qq, {}, 130); arrow(1240, 460, 1330, 460, C.white, qq, 2.5); lbl('N', 1285, 445, C.white, qq, 20);
  for (let i = 0; i < 5; i++) box(1350 + i * 64, 432, 56, 56, C.cyan, qq, 1.8, 'rgba(0,0,0,0.45)');
  lbl('five-mode chain', 1508, 520, C.dim, qq, 17);
  chip(1130, 610, 300, 60, 'read phase', C.gold, Q(S, 0, 'how much phase can be read', 0.6), 22);
  chip(1460, 610, 300, 60, 'recover input', C.cyan, Q(S, 0, 'how well can the whole input', 0.6), 22);
  const bq = Q(S, 1, 'pull against each other', 0.6), tilt = 0.12 * Math.sin(t * 1.4) * bq;
  const cx = 1295, cy = 740, Lb = 300;
  fillPoly([[cx, cy], [cx - 26, cy + 44], [cx + 26, cy + 44]], C.dim, 0.5 * bq);
  line(cx - Lb * Math.cos(tilt), cy - Lb * Math.sin(tilt), cx + Lb * Math.cos(tilt), cy + Lb * Math.sin(tilt), C.white, bq, 3);
  dot(cx - Lb * Math.cos(tilt), cy - Lb * Math.sin(tilt) - 14, 14, 'g', bq); dot(cx + Lb * Math.cos(tilt), cy + Lb * Math.sin(tilt) - 14, 14, 'c', bq);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 300, 60, '0 calls :  0', C.dim, rp, 22); chip(330, 445, 300, 60, '1 call :  1 − β', C.gold, rp, 22); chip(330, 530, 300, 60, '2 calls :  1', C.green, rp, 22);
  box(1460, 340, 300, 190, C.mag, rp, 2, 'rgba(0,0,0,0.4)'); lbl('recovery', 1610, 410, C.mag, rp, 24); lblG('δ ≥ L(β)', 1610, 465, C.white, rp, 26);
  txt(scramble('AURIC Ω III · PHASE GAIN', rp, 465), W / 2, 760, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('AURIC Ω 第 三 部 · 相 位 增 益 与 恢 复', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 065 · AURIC_OMEGA_PHASE_GAIN_AND_QUTRIT_RECOVERY §1–13', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 ENCODER ---- */
SCENES.encoder = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'So every real reading sees nothing', 0.6);
  const qq = Q(S, 0, 'A qutrit with basis', 0.6);
  ladder65(330, 290, qq, {}, 170);
  chip(410, 540, 330, 58, 'θ± = (|0⟩ ± |1⟩)/√2', C.gold, Q(S, 0, 'Two candidate inputs', 0.6), 21);
  const nq = Q(S, 0, 'is encoded into the five-mode chain', 0.6);
  arrow(560, 360, 700, 360, C.white, nq, 2.5); lbl('N', 630, 342, C.white, nq, 22);
  ['000', '100', '010', '001', '101'].forEach((w, i) => { box(720 + i * 74, 330, 66, 60, C.cyan, nq, 1.8, 'rgba(0,0,0,0.45)'); lbl(w, 753 + i * 74, 368, C.cyan, nq, 17); });
  const dq = Q(S, 0, 'leave outputs whose difference is purely imaginary', 0.6);
  lblG('Δ = ρ − σ = i·A0 ,  A0 real antisymmetric', 905, 470, C.white, dq, 26);
  const b = 0.3, a = 1 - b, sq = Q(S, 0, 'with spectrum a, beta', 0.6);
  bars63(1300, 680, [a, b, 0, -b, -a], 64, 30, 170, sq * f1, C.gold, ['a', 'β', '0', '−β', '−a']);
  if (sq > 0 && f1 > 0) lblG('a = 1 − β', 1530, 470, C.gold, sq * f1, 26);
  const q = Q(S, 1, 'So every real reading sees nothing', 0.6, 0.3);
  if (q > 0) {
    chip(905, 580, 400, 58, 'Re ρ = Re σ', C.cyan, q, 22);
    lblG('real effect E :  tr(E Δ) = 0', 905, 670, C.white, Q(S, 1, 'the two outputs share their whole real part', 0.6), 24);
    const pq = Q(S, 1, 'split between two planes', 0.6);
    bars63(1300, 680, [a, b, 0, -b, -a], 64, 30, 170, 1, C.gold, ['a', 'β', '0', '−β', '−a']);
    ring(1380, 330, 60, C.gold, pq, 3); lbl('plane 1 · a', 1380, 420, C.gold, pq, 18); ring(1600, 330, 60 * Math.sqrt(b / a), C.mag, pq, 3); lbl('plane 2 · β', 1600, 420, C.mag, pq, 18);
    lblG('β ≤ 1/2', 1490, 480, C.white, Q(S, 1, 'at most one half', 0.6), 26);
  }
  void t; void s0;
};

/* ---- 03 GAIN ---- */
SCENES.gain = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), b = 0.3;
  const px = 330, py = 760, pw = 860, ph = 420;
  plotAxes(px, py, pw, ph, s0, 'phase calls k', 'contrast B_k');
  [[1, '1'], [0.5, '0.5']].forEach(([v, s]) => { dashed(px, py - v * ph, px + pw, py - v * ph, C.dim, s0 * 0.5, 1); lbl(s, px - 12, py - v * ph + 6, C.dim, s0, 16, 'right'); });
  const vals = [[0, 'With zero calls', C.dim, '0'], [1 - b, 'one call reveals', C.gold, '1 − β'], [1, 'two calls reveal everything', C.green, '1'], [1, 'two calls reveal everything', C.green, '1']];
  vals.forEach(([v, ph2, col, s], k) => { const q = Q(S, 0, ph2, 0.6), x = px + 60 + k * 180, h = v * ph * q; fillBox(x, py - h, 90, h, col, 0.35 * q); rect63(x, py - h, 90, Math.max(h, 2), col, q, 2); lbl(String(k), x + 45, py + 30, C.dim, s0, 20); lblG(s, x + 45, py - h - 16, col, q, 22); });
  lbl('β = 0.3 shown', px + pw, py - ph - 60, C.dim, s0, 16, 'right');
  const sq = Q(S, 0, 'Now count calls of the one installed phase', 0.6);
  chip(1460, 320, 420, 60, 'S13 = diag(1,1,1,1,i)', C.gold, sq, 22);
  lbl('each call costs one use; inverse costs three', 1460, 380, C.dim, sq, 16);
  lblG('k = 0 :  real effects only  ⇒  0', 1460, 470, C.white, Q(S, 0, 'With zero calls', 0.6), 24);
  const gq = Q(S, 1, 'The second call adds exactly beta', 0.6);
  const x1 = px + 60 + 180 + 90, x2 = px + 60 + 360;
  line(x1 + 8, py - (1 - b) * ph, x2 + 120, py - (1 - b) * ph, C.mag, gq, 2); line(x2 + 110, py - (1 - b) * ph, x2 + 110, py - ph, C.mag, gq, 3); lblG('β', x2 + 132, py - (1 - b / 2) * ph + 8, C.mag, gq, 28, 'left');
  lblG('γ = B2 − B1 = β', 1460, 600, C.mag, Q(S, 1, 'gamma equals beta', 0.6), 40);
  void t;
};

/* ---- 04 TRADEOFF ---- */
SCENES.tradeoff = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'theory'], [1, 'the exact curve is still open', 'open']]);
  const s0 = clamp(u), px = 330, py = 770, pw = 760, ph = 440;
  const xS = b => px + b / 0.5 * pw, yS = v => py - v / 0.32 * ph;
  plotAxes(px, py, pw, ph, s0, null, 'full-input error δ'); lbl('β = γ', px + pw + 24, py + 6, C.dim, s0, 18, 'left');
  [[0.1, '0.1'], [0.2, '0.2'], [0.3, '0.3']].forEach(([v, s]) => { dashed(px, yS(v), px + pw, yS(v), C.dim, s0 * 0.4, 1); lbl(s, px - 12, yS(v) + 6, C.dim, s0, 16, 'right'); });
  [0, 0.25, 0.5].forEach(b => lbl(String(b), xS(b), py + 28, C.dim, s0, 16));
  const lq = Q(S, 0, 'the full-input error is at least', 0.8), uq = Q(S, 1, 'An explicit encoder reaches', 0.8), oq = Q(S, 1, 'the best value over the class', 0.6);
  if (oq > 0) fillPoly([...Array.from({ length: 31 }, (_, i) => [xS(i / 60), yS(L65(i / 60))]), ...Array.from({ length: 31 }, (_, i) => [xS(0.5 - i / 60), yS(U65(0.5 - i / 60))])], C.vio, 0.22 * oq);
  curve(z => [xS(0.5 * z), yS(L65(0.5 * z))], 40, C.mag, lq, 3.5);
  curve(z => [xS(0.5 * z), yS(U65(0.5 * z))], 40, C.cyan, uq, 3.5);
  lbl('L(β)', xS(0.5) + 12, yS(L65(0.5)) + 6, C.mag, lq, 20, 'left'); lbl('U(β)', xS(0.5) + 12, yS(U65(0.5)) + 6, C.cyan, uq, 20, 'left');
  dot(xS(0.5), yS(0.2), 10, 'm', oq); dot(xS(0.5), yS(U65(0.5)), 10, 'c', oq);
  lblG('δ ≥ 2β / (3 + 2√(2(1 − β)))', 1480, 320, C.mag, lq, 28);
  lbl('every encoder in the class · every recovery', 1480, 365, C.dim, lq, 17);
  lbl('proof uses Bény–Oreshkov recovery duality', 1480, 400, C.dim, lq, 16);
  lblG('δ(N_β) = 1 − √(1 − β)', 1480, 480, C.cyan, uq, 28);
  lbl('explicit encoder · its exact optimum', 1480, 525, C.dim, uq, 17);
  lblG('β = 1/2 :  1/5 ≤ δ* ≤ 0.293', 1480, 610, C.white, oq, 28);
  chip(1480, 700, 380, 60, 'sharp curve: open', C.vio, Q(S, 1, 'the exact curve is still open', 0.6), 22);
  void t;
};

/* ---- 05 SAME OUTPUTS ---- */
SCENES.sameout = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Even at zero gain', 0.6);
  function blk(x, y, erased, a, col) {
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const cross = (i === 2) !== (j === 2), off = cross && erased; box(x + j * 62, y + i * 62, 54, 54, off ? C.red : col, a, 1.6, off ? 'rgba(255,60,60,0.12)' : 'rgba(0,229,255,0.12)'); if (off) { line(x + j * 62 + 10, y + i * 62 + 10, x + j * 62 + 44, y + i * 62 + 44, C.red, a, 2); line(x + j * 62 + 44, y + i * 62 + 10, x + j * 62 + 10, y + i * 62 + 44, C.red, a, 2); } }
  }
  if (f1 > 0) {
    const aq = Q(S, 0, 'Do the phase outputs decide recovery', 0.6) * f1, eq = Q(S, 0, 'Erase the coherence', 0.6) * f1;
    lbl('coherent N_β', 520, 290, C.cyan, aq, 22); blk(430, 320, false, aq, C.cyan);
    lbl('erased twin', 1400, 290, C.red, eq, 22); blk(1310, 320, true, eq, C.red);
    lbl('levels {0,1} ↔ {2}', 960, 410, C.dim, eq, 18);
    const oq = Q(S, 0, 'the two candidate outputs stay exactly the same', 0.6) * f1;
    lblG('N(θ±) identical  ·  γ = β identical', 960, 590, C.gold, oq, 28);
    const rq = Q(S, 0, 'yet the best recovery error jumps to one', 0.6) * f1;
    lblG('δ = 1 − √(1 − β)', 520, 680, C.cyan, rq, 28); lblG('δ = 1', 1400, 680, C.red, rq, 34);
    stamp('SAME OUTPUTS', 960, 760, rq, C.orange, 30, -0.04);
  }
  const q = Q(S, 1, 'Even at zero gain', 0.6, 0.3);
  if (q > 0) {
    lblG('γ = 0', 960, 300, C.white, q, 32);
    const iq = Q(S, 1, 'an isometric embedding recovers perfectly', 0.6), tq = Q(S, 1, 'while its erased twin cannot', 0.6);
    chip(560, 420, 420, 64, 'isometric embedding E', C.green, iq, 22); lblG('δ = 0', 560, 520, C.green, iq, 34);
    chip(1360, 420, 420, 64, 'E with coherence erased', C.red, tq, 22); lblG('δ = 1', 1360, 520, C.red, tq, 34);
    lblG('the whole channel sets recovery', 960, 680, C.gold, Q(S, 1, 'The whole channel, not two of its outputs', 0.6), 32);
  }
  void t; void s0;
};

/* ---- 06 FIBER ---- */
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'What remains is a ball', 'published'], [0, 'the channel distance is exactly', 'theory'], [1, '', 'theory']]);
  const s0 = clamp(u), b = 0.3, a = 1 - b, cx = 640, cy = 540, R = 300;
  const bq = Q(S, 0, 'What remains is a ball', 0.6);
  ctx.save(); ctx.globalAlpha = bq; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(cx, cy, R * Math.sqrt(a), R * Math.sqrt(b), 0, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  line(cx - R, cy, cx + R, cy, C.dim, bq * 0.5, 1); line(cx, cy + R * 0.7, cx, cy - R * 0.7, C.dim, bq * 0.5, 1);
  const axq = bq * (1 - Q(S, 1, 'One decoder serves several channels', 0.6));
  lbl('w0 ≤ √a', cx + R * Math.sqrt(a) + 12, cy + 6, C.dim, axq, 16, 'left'); lbl('w1 ≤ √β', cx + 10, cy - R * Math.sqrt(b) - 14, C.dim, axq, 16, 'left');
  const f1 = 1 - Q(S, 1, 'One decoder serves several channels', 0.6);
  if (f1 > 0) {
    const w = [0.55 * Math.cos(0.5 + 0.2 * Math.sin(t * 0.7)), 0.28 * Math.sin(0.9 + 0.3 * Math.sin(t * 0.5))], w2 = [-0.2, 0.25];
    const dq = Q(S, 0, 'the channel distance is exactly', 0.6) * f1;
    vec65(cx, cy, cx + w[0] * R, cy - w[1] * R, C.gold, bq * f1); lbl('w', cx + w[0] * R + 14, cy - w[1] * R, C.gold, bq * f1, 20, 'left');
    vec65(cx, cy, cx + w2[0] * R, cy - w2[1] * R, C.mag, dq); lbl("w′", cx + w2[0] * R - 30, cy - w2[1] * R, C.mag, dq, 20, 'left');
    dashed(cx + w[0] * R, cy - w[1] * R, cx + w2[0] * R, cy - w2[1] * R, C.white, dq, 2);
    lblG("‖N_w − N_w′‖◇ = |w − w′|", 1460, 340, C.white, dq, 30);
    lblG('δ(N_w) = 1 − |w|', 1460, 430, C.gold, Q(S, 0, 'the best recovery error is one minus', 0.6) * f1, 32);
    lbl('min 1 − √a  ·  max 1 at w = 0', 1460, 480, C.dim, Q(S, 0, 'the best recovery error is one minus', 0.6) * f1, 18);
  }
  const q = Q(S, 1, 'One decoder serves several channels', 0.6, 0.3);
  if (q > 0) {
    const s = Math.sqrt(b);
    const oq = Q(S, 1, 'Two channels with orthogonal vectors', 0.6);
    vec65(cx, cy, cx + s * R, cy, C.gold, oq); lbl('wA', cx + s * R + 10, cy + 26, C.gold, oq, 20, 'left');
    vec65(cx, cy, cx, cy - s * R, C.mag, oq); lbl('wB', cx + 12, cy - s * R - 6, C.mag, oq, 20, 'left');
    const sq = Q(S, 1, 'but a shared decoder', 0.6);
    dashed(cx, cy, cx + R * 0.62, cy - R * 0.62, C.green, sq, 2); lbl('shared t', cx + R * 0.62 + 10, cy - R * 0.62, C.green, sq, 18, 'left');
    lblG('same direction ⇔ one optimal decoder', 1460, 330, C.white, Q(S, 1, 'exactly when their vectors point the same way', 0.6), 26);
    lblG('alone :  1 − √β', 1460, 450, C.gold, oq, 30);
    lblG('shared :  1 − √(β/2)', 1460, 530, C.green, sq, 30);
    lbl('β = 0.3 :  0.452  vs  0.613', 1460, 590, C.dim, sq, 18);
  }
  void s0;
};

/* ---- 07 CIRCLE ---- */
SCENES.circle = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const cx = 560, cy = 520, R = 230, r = 0.6;
  const cq = Q(S, 0, 'the channels trace a circle', 0.6);
  ring(cx, cy, R, C.cyan, cq, 2.5); line(cx - R - 30, cy, cx + R + 30, cy, C.dim, cq * 0.4, 1); line(cx, cy + R + 30, cx, cy - R - 30, C.dim, cq * 0.4, 1);
  const p1 = 0.4 + 0.25 * Math.sin(t * 0.6), p2 = 2.0;
  const P = ph => [cx + R * Math.cos(ph), cy - R * Math.sin(ph)];
  const f1 = 1 - Q(S, 1, 'If the phase is only known', 0.6);
  if (f1 > 0) {
    const dq = Q(S, 0, 'Two of them sit at chord distance', 0.6) * f1;
    dot(...P(p1), 12, 'g', cq * f1); lbl('φ', P(p1)[0] + 18, P(p1)[1] - 10, C.gold, cq * f1, 22, 'left');
    dot(...P(p2), 12, 'm', dq); lbl('ψ', P(p2)[0] - 34, P(p2)[1] - 10, C.mag, dq, 22, 'left');
    line(...P(p1), ...P(p2), C.white, dq, 3);
    lblG('‖N_φ − N_ψ‖◇ = 2r |sin((φ − ψ)/2)|', 1450, 360, C.white, dq, 28);
    lblG('δ(N_φ) = 1 − r  for each φ', 1450, 450, C.gold, Q(S, 0, 'while each alone is recoverable', 0.6) * f1, 28);
    lbl('radius r = coherence strength, not a population', 1450, 500, C.dim, cq * f1, 17);
  }
  const q = Q(S, 1, 'If the phase is only known', 0.6, 0.3);
  if (q > 0) {
    const al = 0.3 + 1.2 * (0.5 + 0.5 * Math.sin(t * 0.5));
    ctx.save(); ctx.globalAlpha = 0.25 * q; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, -al, al); ctx.closePath(); ctx.fill(); ctx.restore();
    lbl('±α', cx + R + 24, cy + 8, C.gold, q, 22, 'left');
    const px = 1150, py = 780, pw = 620, ph = 380, xS = v => px + v / Math.PI * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, q, 'α', 'shared error');
    const fq = Q(S, 1, 'Its exact error rises from one minus r', 1.0);
    curve(z => [xS(Math.PI * z), yS(arc65(r, Math.PI * z))], 80, C.cyan, fq, 3);
    dot(xS(al), yS(arc65(r, al)), 10, 'g', fq);
    dashed(xS(Math.acos(r)), py, xS(Math.acos(r)), yS(arc65(r, Math.acos(r))), C.dim, fq * 0.7, 1);
    lbl('1 − r', px - 10, yS(1 - r) + 6, C.dim, fq, 15, 'right'); lbl('1', px - 10, yS(1) + 6, C.dim, fq, 15, 'right'); lbl('π/2', xS(Math.PI / 2), py + 26, C.dim, fq, 15); lbl('cos α = r', xS(Math.acos(r)), py + 26, C.dim, fq, 14);
    lblG('√(1 + r² − 2r cos α)  →  sin α  →  1', 1460, 330, C.white, Q(S, 1, 'through root of one plus r squared', 0.6), 26);
    lbl('r = 0.6 shown', 1460, 375, C.dim, q, 16);
  }
};

/* ---- 08 RECORD ---- */
SCENES.record = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'classical'], [1, 'Populations stay fixed', 'theory']]);
  const r = 0.7, f1 = 1 - Q(S, 1, 'For a phase that diffuses', 0.6);
  if (f1 > 0) {
    const kq = Q(S, 0, 'Keep a classical record', 0.6) * f1;
    chip(460, 310, 300, 58, 'ℓ = 1 :  φ = 0', C.cyan, kq, 21); chip(460, 390, 300, 58, 'ℓ = 2 :  φ = π/2', C.cyan, kq, 21);
    lblG('kept :  δ = 1 − r', 460, 490, C.green, Q(S, 0, 'recovery stays at one minus r', 0.6) * f1, 30);
    const dq = Q(S, 0, 'Discard it', 0.6) * f1;
    const cx = 1300, cy = 500, R = 200;
    ring(cx, cy, R, C.dim, dq, 1.5); vec65(cx, cy, cx + R, cy, C.cyan, dq); vec65(cx, cy, cx, cy - R, C.cyan, dq);
    const mq = Q(S, 0, 'the modulus of the mean phase factor', 0.6) * f1;
    vec65(cx, cy, cx + R / 2, cy - R / 2, C.gold, mq, 4); lbl('μ', cx + R / 2 + 14, cy - R / 2 - 6, C.gold, mq, 24, 'left');
    lbl('|μ| = 0.707', cx, cy + R + 40, C.gold, mq, 22);
    lblG('discarded :  δ = 1 − r|μ|', 460, 600, C.mag, mq, 30);
    lbl('r = 0.7 :  0.30  →  0.505', 460, 650, C.dim, mq, 18);
  }
  const q = Q(S, 1, 'For a phase that diffuses', 0.6, 0.3);
  if (q > 0) {
    const px = 330, py = 760, pw = 620, ph = 380;
    plotAxes(px, py, pw, ph, q, 'D t', '|μ|');
    curve(z => [px + z * pw, py - Math.exp(-3 * z) * ph], 50, C.gold, Q(S, 1, 'that factor decays', 0.8), 3);
    lblG('|μ| = e^(−Dt)', px + pw / 2 + 60, py - ph + 40, C.gold, Q(S, 1, 'that factor decays', 0.6), 26);
    lblG('δ = 1 − r e^(−Dt)', 1460, 320, C.white, Q(S, 1, 'that factor decays', 0.6), 28);
    const pq = Q(S, 1, 'Populations stay fixed', 0.6);
    [0.35, 0.35, 0.15, 0.15, 0].forEach((v, i) => { const x = 1260 + i * 80, h = v * 400 + 2; fillBox(x, 600 - h, 56, h, C.cyan, 0.4 * pq); rect63(x, 600 - h, 56, h, C.cyan, pq, 1.6); });
    lbl('populations unchanged', 1420, 640, C.cyan, pq, 18);
    chip(1420, 730, 420, 60, 'dephasing, not loss', C.orange, Q(S, 1, 'This is dephasing, not loss', 0.6), 22);
  }
  void t;
};

/* ---- 09 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['CALLS', '0 · 1−β · 1', C.cyan, 'Zero calls see nothing'], ['GAIN', 'γ = β', C.gold, 'the gain beta of the second call'], ['FLOOR', 'δ ≥ L(β)', C.mag, 'forces a recovery floor'], ['OUTPUTS', '≠ recovery', C.red, 'Equal phase outputs do not fix recovery'], ['FIBER', 'δ = 1 − |w|', C.green, 'recovery is one minus the length'], ['RECORD', '1 − r|μ|', C.orange, 'a lost phase record costs']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 20); });
    lbl('PUBLISHED INPUTS · Bény–Oreshkov recovery duality · Åberg gluing of CP maps', W / 2, 480, C.cyan, Q(S, 1, 'with published recovery duality') * fade, 17);
    lbl('VOLUME · gain law · recovery floor · same-output counterexamples · fiber metric · arc formula · record cost', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory volume') * fade, 17);
    lbl('RECOMPUTED · every number · recovery optima by semidefinite programming', W / 2, 600, C.white, Q(S, 1, 'every number here was recomputed') * fade, 19);
    lbl('NEXT · FULL-INPUT RECOVERY CERTIFICATES', W / 2, 690, C.gold, Q(S, 1, 'Next: full-input recovery') * fade, 34);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC Ω III · PHASE GAIN', W / 2, 680, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('AURIC Ω 第三部 · 相位增益与恢复 · TRURETURING FILM 065', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('What you can read is not what you can return.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC OMEGA III', encoder: 'QUTRIT ENCODER', gain: 'PHASE GAIN', tradeoff: 'GAIN VS RECOVERY', sameout: 'SAME OUTPUTS', fiber: 'COHERENCE FIBER', circle: 'PHASE CIRCLE', record: 'PHASE RECORD', finale: 'LEDGER' });

function poster65() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('γ = B₂ − B₁ = β', 1340, 380, { size: 60, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('δ ≥ 2β / (3 + 2√(2(1−β)))', 1340, 500, { size: 46, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('δ = 1 − |w|', 1340, 630, { size: 60, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('AURIC Ω 第三部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC Ω III · PHASE GAIN', W / 2, 890, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('读 得 出 的 · 不 等 于 还 得 回 的', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 065', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster65;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
