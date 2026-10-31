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

/* ---- film 093: AURIC V25–V27 · GOLDEN TILINGS AND RIGID MIRRORS ---- */
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
const _po093 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po093.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po093.set(key, off); }
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
/* ---- film 093 data (from verify093.py / vis093.json) ---- */
const GOLD093 = {"r": 0.6180339887498949, "s": 0.7861513777574233};
const BDEF093 = [[-3.1416, 1.05573], [-3.1067, 1.05464], [-3.0718, 1.05137], [-3.0369, 1.04592], [-3.002, 1.03832], [-2.9671, 1.02859], [-2.9322, 1.01674], [-2.8972, 1.00281], [-2.8623, 0.98684], [-2.8274, 0.96887], [-2.7925, 0.94895], [-2.7576, 0.92712], [-2.7227, 0.90345], [-2.6878, 0.878], [-2.6529, 0.85084], [-2.618, 0.82203], [-2.5831, 0.79166], [-2.5482, 0.7598], [-2.5133, 0.72654], [-2.4784, 0.69197], [-2.4435, 0.65616], [-2.4086, 0.61923], [-2.3736, 0.58127], [-2.3387, 0.54237], [-2.3038, 0.50264], [-2.2689, 0.46218], [-2.234, 0.42109], [-2.1991, 0.3795], [-2.1642, 0.33749], [-2.1293, 0.29519], [-2.0944, 0.2527], [-2.0595, 0.21014], [-2.0246, 0.1676], [-1.9897, 0.12522], [-1.9548, 0.08308], [-1.9199, 0.04131], [-1.885, 0.0], [-1.85, 0.04073], [-1.8151, 0.08078], [-1.7802, 0.12005], [-1.7453, 0.15844], [-1.7104, 0.19585], [-1.6755, 0.23218], [-1.6406, 0.26735], [-1.6057, 0.30127], [-1.5708, 0.33385], [-1.5359, 0.36501], [-1.501, 0.39468], [-1.4661, 0.42278], [-1.4312, 0.44925], [-1.3963, 0.47402], [-1.3614, 0.49704], [-1.3265, 0.51824], [-1.2915, 0.53758], [-1.2566, 0.55503], [-1.2217, 0.57053], [-1.1868, 0.58407], [-1.1519, 0.5956], [-1.117, 0.60512], [-1.0821, 0.6126], [-1.0472, 0.61803], [-1.0123, 0.62142], [-0.9774, 0.62276], [-0.9425, 0.62205], [-0.9076, 0.61932], [-0.8727, 0.61458], [-0.8378, 0.60786], [-0.8029, 0.59918], [-0.7679, 0.58858], [-0.733, 0.5761], [-0.6981, 0.56178], [-0.6632, 0.54569], [-0.6283, 0.52786], [-0.5934, 0.50837], [-0.5585, 0.48728], [-0.5236, 0.46466], [-0.4887, 0.44058], [-0.4538, 0.41512], [-0.4189, 0.38836], [-0.384, 0.36039], [-0.3491, 0.3313], [-0.3142, 0.30117], [-0.2793, 0.27011], [-0.2443, 0.23821], [-0.2094, 0.20557], [-0.1745, 0.17229], [-0.1396, 0.13848], [-0.1047, 0.10423], [-0.0698, 0.06967], [-0.0349, 0.03489], [0.0, 0.0], [0.0349, 0.03489], [0.0698, 0.06967], [0.1047, 0.10423], [0.1396, 0.13848], [0.1745, 0.17229], [0.2094, 0.20557], [0.2443, 0.23821], [0.2793, 0.27011], [0.3142, 0.30117], [0.3491, 0.3313], [0.384, 0.36039], [0.4189, 0.38836], [0.4538, 0.41512], [0.4887, 0.44058], [0.5236, 0.46466], [0.5585, 0.48728], [0.5934, 0.50837], [0.6283, 0.52786], [0.6632, 0.54569], [0.6981, 0.56178], [0.733, 0.5761], [0.7679, 0.58858], [0.8029, 0.59918], [0.8378, 0.60786], [0.8727, 0.61458], [0.9076, 0.61932], [0.9425, 0.62205], [0.9774, 0.62276], [1.0123, 0.62142], [1.0472, 0.61803], [1.0821, 0.6126], [1.117, 0.60512], [1.1519, 0.5956], [1.1868, 0.58407], [1.2217, 0.57053], [1.2566, 0.55503], [1.2915, 0.53758], [1.3265, 0.51824], [1.3614, 0.49704], [1.3963, 0.47402], [1.4312, 0.44925], [1.4661, 0.42278], [1.501, 0.39468], [1.5359, 0.36501], [1.5708, 0.33385], [1.6057, 0.30127], [1.6406, 0.26735], [1.6755, 0.23218], [1.7104, 0.19585], [1.7453, 0.15844], [1.7802, 0.12005], [1.8151, 0.08078], [1.85, 0.04073], [1.885, 0.0], [1.9199, 0.04131], [1.9548, 0.08308], [1.9897, 0.12522], [2.0246, 0.1676], [2.0595, 0.21014], [2.0944, 0.2527], [2.1293, 0.29519], [2.1642, 0.33749], [2.1991, 0.3795], [2.234, 0.42109], [2.2689, 0.46218], [2.3038, 0.50264], [2.3387, 0.54237], [2.3736, 0.58127], [2.4086, 0.61923], [2.4435, 0.65616], [2.4784, 0.69197], [2.5133, 0.72654], [2.5482, 0.7598], [2.5831, 0.79166], [2.618, 0.82203], [2.6529, 0.85084], [2.6878, 0.878], [2.7227, 0.90345], [2.7576, 0.92712], [2.7925, 0.94895], [2.8274, 0.96887], [2.8623, 0.98684], [2.8972, 1.00281], [2.9322, 1.01674], [2.9671, 1.02859], [3.002, 1.03832], [3.0369, 1.04592], [3.0718, 1.05137], [3.1067, 1.05464], [3.1416, 1.05573]];
const ORBIT093 = [1.3786, 2.7573, 4.1359, 5.5145, 0.61, 1.9886, 3.3672, 4.7459, 6.1245, 1.22, 2.5986, 3.9772, 5.3559, 0.4513, 1.8299, 3.2086, 4.5872, 5.9658, 1.0613, 2.4399, 3.8185, 5.1972, 0.2926, 1.6713, 3.0499, 4.4285, 5.8072, 0.9026, 2.2812, 3.6599, 5.0385, 0.134, 1.5126, 2.8912, 4.2699, 5.6485, 0.7439, 2.1226, 3.5012, 4.8798, 6.2585, 1.3539, 2.7325, 4.1112, 5.4898, 0.5853, 1.9639, 3.3425, 4.7212, 6.0998, 1.1952, 2.5739, 3.9525, 5.3311, 0.4266, 1.8052, 3.1838, 4.5625, 5.9411, 1.0366];
const CTRL093 = {"trAB": 1.0, "trABinv": 0.381966, "conj": 2.618034, "alpha": 1.378633, "h00": 0.236068, "h01": 0.381966};
const CUTSV093 = [1.782, 1.618, 1.1756, 0.908, 0.0, 0.0, 0.0, 0.0];
const TRSC093 = [[0.0862, 1.0287], [0.6698, 1.2233], [0.313, 1.1043], [0.9878, 1.3293], [0.7285, 1.2428], [0.6409, 1.2136], [0.4979, 1.166], [0.7391, 1.2464], [0.9899, 1.33], [0.5119, 1.1706], [0.7107, 1.2369], [0.9226, 1.3075], [0.7146, 1.2382], [0.7659, 1.2553], [0.345, 1.115], [0.2912, 1.0971], [0.3852, 1.1284], [0.575, 1.1917], [0.7825, 1.2608], [0.312, 1.104], [0.55, 1.1833], [0.3453, 1.1151], [0.733, 1.2443], [0.9807, 1.3269], [0.7844, 1.2615], [0.9746, 1.3249], [0.7421, 1.2474], [0.5189, 1.173], [0.3237, 1.1079], [0.4421, 1.1474], [0.6474, 1.2158], [0.2225, 1.0742], [0.3578, 1.1193], [0.6575, 1.2192], [0.7941, 1.2647], [0.5369, 1.179], [0.6702, 1.2234], [0.7708, 1.2569], [0.0333, 1.0111], [0.5417, 1.1806], [0.9832, 1.3277], [0.4374, 1.1458], [0.1068, 1.0356], [0.476, 1.1587], [0.9492, 1.3164], [0.6781, 1.226], [0.5871, 1.1957], [0.6045, 1.2015], [0.3566, 1.1189], [0.2481, 1.0827], [0.2178, 1.0726], [0.6732, 1.2244], [0.7071, 1.2357], [0.857, 1.2857], [0.884, 1.2947], [0.3919, 1.1306], [0.5385, 1.1795], [0.4853, 1.1618], [0.7801, 1.26], [0.7626, 1.2542], [0.4196, 1.1399], [0.7193, 1.2398], [0.7153, 1.2384], [0.5632, 1.1877], [0.9437, 1.3146], [0.4193, 1.1398], [0.243, 1.081], [0.6072, 1.2024], [0.5982, 1.1994], [0.9396, 1.3132], [0.6555, 1.2185], [0.7915, 1.2638], [0.872, 1.2907], [0.5443, 1.1814], [0.9518, 1.3173], [0.9382, 1.3127], [0.7676, 1.2559], [0.7135, 1.2378], [0.5029, 1.1676], [0.5794, 1.1931], [0.7786, 1.2595], [0.6906, 1.2302], [0.0265, 1.0088], [0.7569, 1.2523], [0.9381, 1.3127], [0.9616, 1.3205], [0.9192, 1.3064], [0.6097, 1.2032], [0.5868, 1.1956], [0.6821, 1.2274], [0.8975, 1.2992], [0.9316, 1.3105], [0.3716, 1.1239], [0.1944, 1.0648], [0.151, 1.0503], [0.8715, 1.2905], [0.301, 1.1003], [0.4165, 1.1388], [0.3801, 1.1267], [0.8473, 1.2824], [0.7426, 1.2475], [0.4192, 1.1397], [0.1808, 1.0603], [0.929, 1.3097], [0.9315, 1.3105], [0.5955, 1.1985], [0.7576, 1.2525], [0.1407, 1.0469], [0.322, 1.1073], [0.9015, 1.3005], [0.4486, 1.1495], [0.913, 1.3043], [0.9846, 1.3282], [0.5234, 1.1745], [0.4803, 1.1601], [0.657, 1.219], [0.7124, 1.2375], [0.28, 1.0933], [0.4304, 1.1435], [0.4537, 1.1512]];
const INTF093 = [[0.0, 1.0], [0.105, 0.9973], [0.209, 0.9891], [0.314, 0.9755], [0.419, 0.9568], [0.524, 0.933], [0.628, 0.9045], [0.733, 0.8716], [0.838, 0.8346], [0.942, 0.7939], [1.047, 0.75], [1.152, 0.7034], [1.257, 0.6545], [1.361, 0.604], [1.466, 0.5523], [1.571, 0.5], [1.676, 0.4477], [1.78, 0.396], [1.885, 0.3455], [1.99, 0.2966], [2.094, 0.25], [2.199, 0.2061], [2.304, 0.1654], [2.409, 0.1284], [2.513, 0.0955], [2.618, 0.067], [2.723, 0.0432], [2.827, 0.0245], [2.932, 0.0109], [3.037, 0.0027], [3.142, 0.0], [3.246, 0.0027], [3.351, 0.0109], [3.456, 0.0245], [3.56, 0.0432], [3.665, 0.067], [3.77, 0.0955], [3.875, 0.1284], [3.979, 0.1654], [4.084, 0.2061], [4.189, 0.25], [4.294, 0.2966], [4.398, 0.3455], [4.503, 0.396], [4.608, 0.4477], [4.712, 0.5], [4.817, 0.5523], [4.922, 0.604], [5.027, 0.6545], [5.131, 0.7034], [5.236, 0.75], [5.341, 0.7939], [5.445, 0.8346], [5.55, 0.8716], [5.655, 0.9045], [5.76, 0.933], [5.864, 0.9568], [5.969, 0.9755], [6.074, 0.9891], [6.178, 0.9973], [6.283, 1.0]];
const GABS093 = [[1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0], [0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0]];
const BETA093 = ["00000", "00001", "00010", "00100", "00101", "01000", "01001", "01010", "10000", "10001", "10010", "10100", "10101"];
const CHC093 = [[0.0, 1.1756], [0.0524, 1.1786], [0.1047, 1.1877], [0.1571, 1.2025], [0.2094, 1.2228], [0.2618, 1.2479], [0.3142, 1.2775], [0.3665, 1.3108], [0.4189, 1.3472], [0.4712, 1.3862], [0.5236, 1.4271], [0.576, 1.4692], [0.6283, 1.4734], [0.6807, 1.4511], [0.733, 1.4267], [0.7854, 1.4008], [0.8378, 1.374], [0.8901, 1.3462], [0.9425, 1.3179], [0.9948, 1.2881], [1.0472, 1.2578], [1.0996, 1.2258], [1.1519, 1.1933], [1.2043, 1.1603], [1.2566, 1.1264], [1.309, 1.0909], [1.3614, 1.0557], [1.4137, 1.0202], [1.4661, 0.9827], [1.5184, 0.9468], [1.5708, 0.908]];
const CHD093 = [1.4627, 1.4863, 1.5094, 1.5094, 1.5121, 1.522, 1.5252, 1.53, 1.5321, 1.5321, 1.5321, 1.5321, 1.5321, 1.5321, 1.5321, 1.5321, 1.5321, 1.5321, 1.5354, 1.5381, 1.5469, 1.5489, 1.5489, 1.5532, 1.5543, 1.5543, 1.5543, 1.5543, 1.5543, 1.5544, 1.5562, 1.5587, 1.5595, 1.5598, 1.5604, 1.561, 1.5669, 1.5672, 1.5673, 1.5726, 1.5755, 1.576, 1.576, 1.576, 1.576, 1.576, 1.576, 1.576, 1.576, 1.5771, 1.5812, 1.5821, 1.5822, 1.5877, 1.5936, 1.5968, 1.5973, 1.5973, 1.5973, 1.5996];
const TOPT093 = {"2": 0.666667, "3": 0.5, "4": 0.4};
const NUM093 = {"bz": 750, "bell": 0.5, "chi": 0.8, "err": 4.577566798522237e-16, "recK": 0.5712, "tl": 88, "gap": 0.90798, "resid": 0.8966};
/* ---- film 093 helpers ---- */
const X093 = 1 / PHI_, Y093 = Math.sqrt(1 / PHI_), ZA093 = 3 * Math.PI / 5;
function ell093(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll093(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell093(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
/* arrow between two label boxes (half sizes bw, bh) */
function boxArrow093(P, Q, bw, bh, col, a, w = 3) {
  if (a <= 0) return;
  const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  const tt = Math.min(bw / Math.max(Math.abs(ux), 1e-6), bh / Math.max(Math.abs(uy), 1e-6)) + 6;
  arrow(P[0] + ux * tt, P[1] + uy * tt, Q[0] - ux * tt, Q[1] - uy * tt, col, a, w);
}
/* the pentagon of bracketings: a -> b -> c -> d (three steps) and a -> e -> d (two steps) */
const PTREE093 = ['(((ab)c)d)', '((a(bc))d)', '(a((bc)d))', '(a(b(cd)))', '((ab)(cd))'];
function pent093(cx, cy, R, a, o = {}) {
  if (a <= 0) return;
  const P = [[cx - 0.62 * R, cy - 0.62 * R], [cx - R, cy + 0.22 * R], [cx, cy + 0.86 * R], [cx + R, cy + 0.22 * R], [cx + 0.62 * R, cy - 0.62 * R]];
  const sz = o.size || 18, bw = sz * 4.2, bh = sz * 1.1;
  const p3 = o.p3 == null ? 1 : o.p3, p2 = o.p2 == null ? 1 : o.p2;
  [[0, 1], [1, 2], [2, 3]].forEach(([i, j], k) => { boxArrow093(P[i], P[j], bw, bh, C.cyan, a * p3, 3); const mx = (P[i][0] + P[j][0]) / 2, my = (P[i][1] + P[j][1]) / 2; lblG('F', mx + (k === 0 ? -26 : k === 1 ? -20 : 20), my + (k === 0 ? 0 : 24), C.cyan, a * p3, 22); });
  [[0, 4], [4, 3]].forEach(([i, j], k) => { boxArrow093(P[i], P[j], bw, bh, C.gold, a * p2, 3); const mx = (P[i][0] + P[j][0]) / 2, my = (P[i][1] + P[j][1]) / 2; lblG('F', mx + (k === 0 ? 0 : 26), my + (k === 0 ? -16 : 0), C.gold, a * p2, 22); });
  P.forEach((p, i) => { box(p[0] - bw, p[1] - bh, 2 * bw, 2 * bh, C.white, a * 0.8, 1.4, 'rgba(0,0,0,0.6)'); lbl(PTREE093[i], p[0], p[1] + sz * 0.36, C.white, a, sz); });
  return P;
}
/* a Bloch sphere: returns projector (x, y, z) -> screen; z up */
function sph093(cx, cy, R, ang, a, o = {}) {
  const v = v3(cx, cy, R, ang, o.tilt == null ? 0.32 : o.tilt);
  if (a <= 0) return v;
  ring(cx, cy, R, C.cyan, a * 0.45, 1.5);
  curve(p => { const q = TAU * p, s = v(Math.cos(q), Math.sin(q), 0); return [s[0], s[1]]; }, 72, C.cyan, a * (o.eq == null ? 0.3 : o.eq), 1.2);
  if (o.axes !== false) { [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach(e => { const p = v(...e), m = v(-e[0], -e[1], -e[2]); dashed(m[0], m[1], p[0], p[1], C.dim, a * 0.4, 1); }); }
  return v;
}
function greatCircle093(v, axis, col, a, lw = 2) {
  const n = axis, t1 = Math.abs(n[0]) < 0.9 ? [0, -n[2], n[1]] : [-n[2], 0, n[0]];
  const l1 = Math.hypot(...t1), e1 = t1.map(z => z / l1), e2 = [n[1] * e1[2] - n[2] * e1[1], n[2] * e1[0] - n[0] * e1[2], n[0] * e1[1] - n[1] * e1[0]];
  curve(p => { const q = TAU * p, s = v(...[0, 1, 2].map(k => Math.cos(q) * e1[k] + Math.sin(q) * e2[k])); return [s[0], s[1]]; }, 72, col, a, lw);
  return [e1, e2];
}
function uc093(cx, cy, R, a, col = C.dim) { ring(cx, cy, R, col, a, 1.6); dashed(cx - R - 20, cy, cx + R + 20, cy, C.dim, a * 0.5, 1); dashed(cx, cy - R - 20, cx, cy + R + 20, C.dim, a * 0.5, 1); }
const ucp093 = (cx, cy, R, an) => [cx + R * Math.cos(an), cy - R * Math.sin(an)];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pent093(480, 470, 300, s0, { size: 17, p3: 0.55 + 0.45 * Math.sin(t * 1.3), p2: 0.55 - 0.45 * Math.sin(t * 1.3) });
  lbl('two recouplings of the same boundary', 480, 790, C.dim, s0, 17);
  const items = [['continues the versioned Auric volumes', 'VERSIONED AURIC VOLUMES', 'V25 and V27 at one subject commit', C.cyan],
    ['whether one quantum gate can tile a whole', 'V25 · QUANTUM TILINGS', 'cover · glue · observe · generate', C.gold],
    ['what a rigid mirror does to amplitudes', 'V27 · RIGID MIRRORS', 'unitary reflection versus conjugation', C.mag],
    ['to native golden gates', 'V27 · NATIVE GOLDEN GATES', 'K = ζ[I + (ζ − 1)P] ,  ζ = e^(3πi/5)', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 25); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pent093(W / 2, 400, 230, rp, { size: 15, p3: 0.6 + 0.4 * Math.sin(t * 1.5), p2: 0.6 - 0.4 * Math.sin(t * 1.5) });
  chip(330, 330, 340, 58, 'golden F', C.gold, rp, 22); chip(330, 415, 340, 58, 'braids · trines', C.cyan, rp, 22); chip(330, 500, 340, 58, 'rigid mirror S', C.mag, rp, 22);
  box(1420, 320, 380, 200, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('28 calls · 8 against 5', 1610, 385, C.green, rp, 20); lblG('Δ_K = e^(4πi/5) S', 1610, 455, C.white, rp, 28);
  txt(scramble('AURIC V25–V27 · MIRRORS', rp, 493), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V25–V27 · 黄 金 铺 砌 与 刚 性 镜 像', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 093 · AURIC_QUANTUM_TILINGS_PENTAGON_COHERENCE_GOLDEN_GATES_AND_GLOBAL_OBSERVATION_V25 · AURIC_RIGID_MIRRORS_COMPLEX_PHASE_AND_NATIVE_GOLDEN_GATES_V27', W / 2, 115, { size: 13, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
};

/* ---- 02 PENTAGON (V25 §1–2) ---- */
SCENES.pentagon = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'One pentagon component forces', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Powers of one gate commute', 0.6) * f1;
    const cx = 450, cy = 430, R = 150;
    ring(cx, cy, R, C.dim, q, 1.6);
    for (let m = 0; m < 10; m++) { const an = Math.PI / 2 - m * TAU / 10, p = ucp093(cx, cy, R, an), qq = clamp(q * 1.6 - m / 14); dot(p[0], p[1], 13, m === 0 ? 'w' : 'g', qq); lblG('K' + (m === 0 ? '⁰' : ['¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][m - 1]), cx + (R + 34) * Math.cos(an), cy - (R + 34) * Math.sin(an) + 8, C.gold, qq, 18); }
    lblG('K² K³ = K³ K² = K⁵', cx, cy - 6, C.white, q, 22); lblG('K¹⁰ = I : ten powers', cx, cy + 30, C.gold, q, 19);
    const rq = Q(S, 0, 'so repetition alone cannot cover everything', 0.6) * f1;
    lbl('one address : abelian closure ≠ PU(d)', cx, cy + R + 80, C.red, rq, 18);
    lbl('finite words are countable ; PU(d) is not', cx, cy + R + 110, C.dim, rq, 16);
    const fq = Q(S, 0, 'Fibonacci fusion', 0.6) * f1;
    chip(1360, 270, 780, 60, '1 ⊗ a = a ⊗ 1 = a ,   τ ⊗ τ = 1 ⊕ τ', C.cyan, fq, 26);
    lbl('types on every edge : L = {1 , τ}', 1360, 330, C.dim, fq, 16);
    // a small fusion tree: three tau leaves, root tau, internal label e
    const tx = 1150, ty = 420;
    [[tx - 80, ty], [tx, ty], [tx + 80, ty]].forEach((p, i) => { dot(p[0], p[1], 10, 'c', fq); lblG('τ', p[0], p[1] - 18, C.cyan, fq, 20); });
    line(tx - 80, ty, tx - 40, ty + 60, C.cyan, fq, 2); line(tx, ty, tx - 40, ty + 60, C.cyan, fq, 2); line(tx - 40, ty + 60, tx + 20, ty + 120, C.white, fq, 2); line(tx + 80, ty, tx + 20, ty + 120, C.cyan, fq, 2); line(tx + 20, ty + 120, tx + 20, ty + 160, C.gold, fq, 2.5);
    lblG('e', tx - 62, ty + 74, C.mag, fq, 20); lblG('τ', tx + 40, ty + 168, C.gold, fq, 20);
    const mq = Q(S, 0, 'a two-by-two recoupling matrix', 0.6) * f1;
    const mx = 1400, my = 400, cw = 110;
    [['r', 's'], ['s', '−r']].forEach((row, i) => row.forEach((v, j) => cell093(mx + j * cw, my + i * 80, cw - 10, 70, v, i === j ? C.gold : C.mag, mq, 28)));
    lbl('F : (τ τ) τ → τ (τ τ) ,  order (1 , τ)', 1505, my + 185, C.white, mq, 17);
    lbl('all other legal F-blocks = 1', 1505, my + 210, C.dim, mq, 16);
    const pq = Q(S, 0, 'positive entries r and s', 0.6) * f1;
    lbl('real symmetric gauge ,  r , s > 0', 1505, my + 245, C.gold, pq, 18);
  }
  const q = Q(S, 1, 'One pentagon component forces', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'One pentagon component forces', 0.6);
    pent093(440, 420, 240, q, { size: 15 });
    lbl('three-step side A B A  =  two-step side C B', 440, 705, C.white, cq, 18);
    lbl('a = b = c = d = z = τ ,  e = h = 1 ,  f = g = τ :  r² − r s² = 0', 440, 740, C.dim, cq, 16);
    const px = 1150, py = 780, pw = 500, ph = 360, xS = s => px + s * pw, yS = r => py - r * ph;
    plotAxes(px, py, pw, ph, q, 's', 'r');
    [0.5, 1].forEach(v => { lbl(String(v), xS(v), py + 26, C.dim, q, 15); lbl(String(v), px - 10, yS(v) + 5, C.dim, q, 15, 'right'); });
    const parq = Q(S, 1, 'so r equals s squared', 0.6);
    curve(p => [xS(p), yS(p * p)], 60, C.gold, parq, 3); lbl('r = s²  (pentagon)', xS(0.64) + 12, yS(0.3), C.gold, parq, 17, 'left');
    const uq = Q(S, 1, 'with unitarity', 0.6);
    curve(p => [xS(Math.sin(p * Math.PI / 2)), yS(Math.cos(p * Math.PI / 2))], 60, C.cyan, uq, 3); lbl('r² + s² = 1  (unitarity)', xS(0.33), yS(0.97) - 12, C.cyan, uq, 17, 'left');
    const sq = Q(S, 1, 'The only solution is r equal to one over phi', 0.6);
    const gx = xS(GOLD093.s), gy = yS(GOLD093.r);
    dashed(gx, gy, gx, py, C.mag, sq * 0.6, 1.4); dashed(px, gy, gx, gy, C.mag, sq * 0.6, 1.4);
    dot(gx, gy, 14, 'm', sq); ring(gx, gy, 22, C.mag, sq * (0.5 + 0.5 * Math.sin(t * 4)), 2);
    chip(1420, 280, 560, 56, 'r = 1/φ = ' + GOLD093.r.toFixed(4), C.mag, sq, 23);
    chip(1420, 345, 560, 56, 's = 1/√φ = ' + GOLD093.s.toFixed(4), C.mag, Q(S, 1, 's its square root', 0.6), 23);
    lbl('recomputed : every typed pentagon holds ; A B A = C B', 440, 772, C.dim, sq, 15);
  }
};

/* ---- 03 BRAID (V25 §3, §11) ---- */
SCENES.braid = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [0, 'For two golden projections', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'This is the native gate K', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Weighted path projections', 0.6) * f1;
    // a legal Fibonacci path: labels 1 (low) / tau (high)
    const path = [1, 1, 0, 1, 1, 1, 0, 1, 1], x0 = 170, dx = 88, yH = 330, yL = 430;
    const flip = Math.floor(t * 0.7) % 2;
    const pp = path.map((v, i) => [x0 + i * dx, v ? yH : yL]);
    pp.forEach((p, i) => { if (i < pp.length - 1) line(p[0], p[1], pp[i + 1][0], pp[i + 1][1], C.cyan, q, 2.5); });
    pp.forEach((p, i) => { const hl = i === 4; dot(p[0], p[1], hl ? 13 : 10, hl ? 'g' : 'c', q); });
    const alt = [x0 + 4 * dx, flip ? yL : yH];
    dashed(pp[3][0], pp[3][1], alt[0], alt[1], C.gold, q * 0.8, 2); dashed(alt[0], alt[1], pp[5][0], pp[5][1], C.gold, q * 0.8, 2);
    ring(alt[0], alt[1], 18, C.gold, q, 2.5);
    lbl('τ', x0 - 40, yH + 7, C.cyan, q, 20); lbl('1', x0 - 40, yL + 7, C.cyan, q, 20);
    lbl('P_i changes only label i', x0 + 4 * dx, yL + 52, C.gold, q, 17);
    const rq = Q(S, 0, 'obey the Temperley–Lieb relations', 0.6) * f1;
    chip(540, 540, 800, 54, 'P_i† = P_i = P_i² ,   [P_i , P_j] = 0  (|i − j| ≥ 2)', C.cyan, rq, 20);
    chip(540, 610, 800, 54, 'P_i P_(i±1) P_i = δ⁻² P_i ,   δ⁻² = φ⁻² = 0.382', C.cyan, rq, 20);
    lbl('weights d = (1 , φ) ,  δ = φ :  Σ_(b~a) d_b = δ d_a', 540, 668, C.dim, rq, 16);
    const lq = Q(S, 0, 'a general theorem frozen', 0.6) * f1;
    box(150, 700, 780, 78, C.green, lq, 2, 'rgba(0,40,20,0.45)');
    lbl('LEAN · weighted_legal_path_temperley_lieb', 540, 732, C.green, lq, 17);
    lbl('frozen at the subject commit ; recomputed on ' + NUM093.tl + ' path spaces', 540, 760, C.dim, lq, 15);
    const bq = Q(S, 0, 'For two golden projections', 0.6) * f1;
    chip(1390, 260, 780, 58, 'T_P T_Q T_P − T_Q T_P T_Q', C.white, bq, 22);
    chip(1390, 330, 780, 58, '= (z − 1) [ z + φ⁻² (z − 1)² ] (P − Q)', C.gold, bq, 22);
    const px = 1060, py = 760, pw = 680, ph = 300, xS = an => px + (an + Math.PI) / TAU * pw, yS = v => py - v / 1.2 * ph;
    const cq = Q(S, 0, 'the braid relation then holds only at the phases', 0.6) * f1;
    plotAxes(px, py, pw, ph, bq, 'arg z', '|defect coefficient|');
    curve(p => { const k = Math.min(BDEF093.length - 1, Math.round(p * (BDEF093.length - 1))); return [xS(BDEF093[k][0]), yS(BDEF093[k][1])]; }, BDEF093.length - 1, C.gold, bq, 3);
    [-ZA093, 0, ZA093].forEach((an, i) => { dot(xS(an), yS(0), i === 1 ? 9 : 13, i === 1 ? 'w' : 'm', i === 1 ? bq : cq); });
    lbl('−108°', xS(-ZA093), py + 28, C.mag, cq, 16); lbl('+108°', xS(ZA093), py + 28, C.mag, cq, 16); lbl('z = 1 trivial', xS(0), py + 28, C.dim, bq, 15);
    lbl('zeros : z = e^(±3πi/5) ,  z + 1/z = −φ⁻¹', px + pw / 2, py - ph - 52, C.mag, cq, 17);
  }
  const q = Q(S, 1, 'This is the native gate K', 0.6, 0.3);
  if (q > 0) {
    const cx = 420, cy = 470, R = 190;
    uc093(cx, cy, R, q);
    for (let k = 0; k < 10; k++) { const p = ucp093(cx, cy, R, k * Math.PI / 5); dot(p[0], p[1], 5, 'w', q * 0.5); }
    const zq = Q(S, 1, 'K to the tenth is the identity', 0.6);
    const pz = ucp093(cx, cy, R, ZA093), pz2 = ucp093(cx, cy, R, 2 * ZA093);
    dot(pz[0], pz[1], 14, 'g', q); dot(pz2[0], pz2[1], 14, 'g', q);
    lblG('ζ', pz[0] - 26, pz[1] - 10, C.gold, q, 24); lblG('ζ²', pz2[0] - 30, pz2[1] + 26, C.gold, q, 24);
    lbl('spec K ⊂ {ζ , ζ²}', cx, cy + R + 50, C.gold, q, 18);
    lbl('K¹⁰ = I', cx, cy + 8, C.white, zq, 26);
    chip(1360, 260, 840, 58, 'K = ζ [ I + (ζ − 1) P ] ,   ζ = e^(3πi/5)', C.gold, q, 23);
    const wq = Q(S, 1, 'Swapping the phase for an inner gate W keeps unitarity', 0.6);
    chip(1360, 340, 840, 58, 'U_P = I + P ⊗ (W − I)  is always unitary', C.cyan, wq, 22);
    const sq = Q(S, 1, 'the braid survives only if W has spectrum in one, zeta and zeta bar', 0.6);
    chip(1360, 420, 840, 58, 'braid  ⇔  (W − I)[W + φ⁻²(W − I)²] = 0  ⇔  spec W ⊂ {1 , ζ , ζ̄}', C.green, sq, 18);
    [0, ZA093, -ZA093].forEach(an => { const p = ucp093(cx, cy, R, an); ring(p[0], p[1], 24, C.green, sq, 3); });
    lbl('allowed : 1 , ζ , ζ̄', cx + R + 20, cy - 60, C.green, sq, 17, 'left');
    const kq = Q(S, 1, 'K itself fails', 0.6);
    ring(pz2[0], pz2[1], 26, C.red, kq, 3);
    const bx = 1100, by = 720, hs = 260;
    lbl('‖U_P U_Q U_P − U_Q U_P U_Q‖ (recomputed)', 1360, 530, C.dim, sq, 15);
    [['W = diag(1 , ζ , ζ̄)', 0, C.green, sq], ['W = K', NUM093.recK, C.red, clamp(sq * 1.5 - 0.4)]].forEach(([lab, v, col, qa], i) => { const y = 560 + i * 80; fillBox(bx, y, Math.max(4, v * hs * 1.4), 48, col, qa * 0.4); rect63(bx, y, Math.max(4, v * hs * 1.4), 48, col, qa, 1.6); lbl(lab, bx - 16, y + 32, C.white, qa, 17, 'right'); lbl(v ? v.toFixed(3) : '0', bx + Math.max(4, v * hs * 1.4) + 16, y + 32, col, qa, 18, 'left'); });
    stamp('K ITSELF FAILS : ζ² ∉ {1 , ζ , ζ̄}', 1360, 790, kq, C.red, 22, -0.03);
  }
};

/* ---- 04 CONTROL (V25 §4) ---- */
SCENES.control = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Control is not preparation', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On two overlapping addresses', 0.6) * f1;
    cells64(170, 260, ['0', 'b₁', 'b₂', '0'], 120, q, C.cyan, { 0: C.dim, 3: C.dim }, 26);
    box(165, 385, 345, 40, C.gold, q, 2, 'rgba(40,30,0,0.35)'); lbl('address 1 : (0 , b₁ , b₂)', 337, 412, C.gold, q, 16);
    box(285, 435, 345, 40, C.mag, q, 2, 'rgba(40,0,40,0.35)'); lbl('address 2 : (b₁ , b₂ , 0)', 457, 462, C.mag, q, 16);
    const wq = Q(S, 0, 'a two-dimensional invariant sector', 0.6) * f1;
    lblG('g₁ = √x |00⟩ + x |10⟩ ,  g₂ = √x |00⟩ + x |01⟩', 420, 520, C.white, wq, 22);
    lblG('x = φ⁻¹ ,  ⟨g₁ , g₂⟩ = x ,  W = span{g₁ , g₂}', 420, 565, C.dim, wq, 19);
    const tq = Q(S, 0, 'trace of A B equal to one', 0.6) * f1, iq = Q(S, 0, 'trace of A B inverse equal to phi to the minus two', 0.6) * f1, cq = Q(S, 0, 'whose conjugate exceeds two', 0.6) * f1;
    chip(420, 630, 640, 54, 'A , B = e^(−9πi/10) K₁ , K₂ on W  ∈ SU(2)', C.cyan, tq, 19);
    chip(420, 700, 640, 54, 'Tr(AB) = 1 ,   Tr(AB⁻¹) = φ⁻² = ' + CTRL093.trABinv.toFixed(4), C.gold, iq, 20);
    chip(420, 770, 640, 54, 'Galois conjugate φ² = ' + CTRL093.conj.toFixed(3) + ' > 2  ⇒  infinite order', C.mag, cq, 19);
    const dq = Q(S, 0, 'so they are dense in PU two', 0.6) * f1;
    const cx = 1390, cy = 500, R = 210;
    uc093(cx, cy, R, iq);
    lbl('eigen-angle of (AB⁻¹)^k , k = 1 … 60', cx, cy - R - 40, C.dim, iq, 16);
    ORBIT093.forEach((an, k) => { const qq = clamp(iq * 1.6 - k / 50) * (0.4 + 0.6 * (k < 60 ? 1 : 0)), p = ucp093(cx, cy, R, an); dot(p[0], p[1], 8, k < 10 ? 'g' : 'c', qq); });
    lbl('α = arccos(φ⁻²/2) = ' + CTRL093.alpha.toFixed(4) + ' rad : never closes', cx, cy + R + 50, C.gold, iq, 16);
    stamp('DENSE IN PU(2)', cx, cy + 6, dq, C.green, 30, -0.04);
  }
  const q = Q(S, 1, 'Control is not preparation', 0.6, 0.3);
  if (q > 0) {
    stamp('CONTROL ≠ PREPARATION', 540, 300, Q(S, 1, 'Control is not preparation', 0.6), C.red, 30, -0.04);
    const hq = Q(S, 1, 'A dark vector h is killed by both projections', 0.6);
    chip(540, 420, 800, 60, 'h = (√x |00⟩ − |01⟩ − |10⟩) / √(x + 2)', C.mag, hq, 22);
    lbl('P₁ h = P₂ h = 0 ,   h ⊥ W', 540, 480, C.white, hq, 18);
    const zq = Q(S, 1, 'so every word only multiplies it by zeta', 0.6);
    chip(540, 560, 800, 58, 'K₁ h = K₂ h = ζ h   for every word', C.gold, zq, 22);
    lbl('the weight |⟨h , ψ⟩|² is invariant under all gate words', 540, 620, C.dim, zq, 16);
    const bq = Q(S, 1, 'from zero zero', 0.6);
    const bx = 1080, by = 740, bw = 150, hs = 1000;
    const vals = [['|00⟩', CTRL093.h00, 'φ⁻³'], ['|01⟩', CTRL093.h01, 'φ⁻²'], ['|10⟩', CTRL093.h01, 'φ⁻²']];
    plotAxes(bx - 20, by, 640, 440, bq, '', 'weight on h  (same for every word)');
    vals.forEach(([lab, v, sym], i) => { const x = bx + 30 + i * 200, h = v * hs; fillBox(x, by - h, bw, h, i ? C.cyan : C.mag, bq * 0.45); rect63(x, by - h, bw, h, i ? C.cyan : C.mag, bq, 1.8); lbl(lab, x + bw / 2, by + 30, C.white, bq, 20); lblG(sym + ' = ' + v.toFixed(3), x + bw / 2, by - h - 14, i ? C.cyan : C.mag, bq, 19); });
    const lq = Q(S, 1, 'the weight phi to the minus three on h never leaves', 0.6);
    lbl('from |00⟩ the overlap with W stays at most 1 − φ⁻³ = 0.764', 540, 700, C.mag, lq, 17);
    lbl('preparation of the encoded sector is a separate input', 540, 735, C.dim, lq, 16);
  }
};

/* ---- 05 CUTS (V25 §5–6) ---- */
SCENES.cuts = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Edges glue globally', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A static tensor reads as evolution only along unitary cuts', 0.6) * f1;
    // a gate tile with two cut directions
    const gx = 360, gy = 470;
    box(gx - 110, gy - 85, 220, 170, C.cyan, q, 2.5, 'rgba(0,30,40,0.45)'); lblG('U', gx, gy + 14, C.white, q, 40);
    [[-55, -1], [55, -1], [-55, 1], [55, 1]].forEach(([dx, s]) => line(gx + dx, gy + s * 85, gx + dx, gy + s * 150, C.cyan, q, 3));
    lbl('a', gx - 55, gy + 180, C.dim, q, 20); lbl('b', gx + 55, gy + 180, C.dim, q, 20); lbl('c', gx - 55, gy - 162, C.dim, q, 20); lbl('d', gx + 55, gy - 162, C.dim, q, 20);
    arrow(gx + 170, gy + 120, gx + 170, gy - 120, C.gold, q, 3); lbl('time cut :', gx + 192, gy - 10, C.gold, q, 18, 'left'); lbl('U_(cd , ab)', gx + 192, gy + 18, C.gold, q, 18, 'left');
    const sq0 = Q(S, 0, 'sideways cut', 0.6) * f1;
    arrow(gx - 120, gy + 225, gx + 120, gy + 225, C.mag, sq0, 3); lbl('sideways cut :  Ũ_((a , c) , (b , d)) = U_(cd , ab)', gx, gy + 265, C.mag, sq0, 17);
    const px = 1040, py = 450;
    const iq = Q(S, 0, 'sideways cut has rank one', 0.6) * f1;
    lbl('singular values of the sideways cut', 1400, 255, C.dim, iq, 17);
    bars63(px, py, [2, 0, 0, 0], 34, 10, 70, iq, C.red, null); lbl('identity', px + 83, py + 34, C.red, iq, 17); lbl('rank 1', px + 83, py + 58, C.red, iq, 16);
    bars63(px + 250, py, [1, 1, 1, 1], 34, 10, 70, iq, C.green, null); lbl('swap', px + 333, py + 34, C.green, iq, 17); lbl('unitary', px + 333, py + 58, C.green, iq, 16);
    const kq = Q(S, 0, 'the native three-qubit gate has a cut of rank four out of eight', 0.6) * f1;
    bars63(px + 500, py, CUTSV093, 28, 8, 70, kq, C.gold, null); lbl('native three-qubit K', px + 640, py + 34, C.gold, kq, 17); lbl('rank ' + CUTSV093.filter(v => v > 1e-6).length + ' of 8', px + 640, py + 58, C.gold, kq, 16);
    lbl('1.78  1.62  1.18  0.91  0  0  0  0', px + 640, py + 84, C.dim, kq, 14);
    const bq = Q(S, 0, 'a dual-unitary phase swap', 0.6) * f1;
    chip(1400, 610, 760, 56, 'B_ζ |a , b⟩ = ζ^(ab) |b , a⟩ : dual unitary , braids', C.cyan, bq, 19);
    lbl('B_ζ |++⟩ : amplitude determinant (ζ − 1)/4 ≠ 0  ⇒  entangling', 1400, 668, C.dim, bq, 15);
    const nq = Q(S, 0, 'makes only seven hundred fifty gates on three qubits', 0.6) * f1;
    chip(1400, 735, 760, 60, '⟨B₁₂ , B₂₃⟩ on 3 qubits : ' + NUM093.bz + ' elements', C.gold, nq, 22);
    lbl('monomial , tenth roots of unity ; bound 10⁸ · 8! ≈ 4.0 × 10¹² ; never dense', 1400, 793, C.dim, nq, 15);
  }
  const q = Q(S, 1, 'Edges glue globally', 0.6, 0.3);
  if (q > 0) {
    const cx = 460, cy = 450, R = 170, n = 6;
    const P = ringPts(cx, cy, R, n);
    P.forEach((p, i) => { const qn = P[(i + 1) % n]; line(p[0], p[1], qn[0], qn[1], i === 2 ? C.gold : C.cyan, q, i === 2 ? 4.5 : 2.5); });
    P.forEach((p, i) => dot(p[0], p[1], i === 0 ? 15 : 11, i === 0 ? 'm' : 'c', q));
    lbl('root o', P[0][0], P[0][1] - 24, C.mag, q, 17);
    const e2 = [(P[2][0] + P[3][0]) / 2, (P[2][1] + P[3][1]) / 2];
    lblG('U ≠ I', e2[0] + 34, e2[1] + 8, C.gold, q, 22, 'left');
    const hq = Q(S, 1, 'a hole can keep a loop nontrivial', 0.6);
    fillEll093(cx, cy, 70, 70, '#000', hq * 0.6); ell093(cx, cy, 70, 70, C.red, hq, 2, 0, 1); lbl('hole', cx, cy + 7, C.red, hq, 18);
    chip(460, 700, 760, 56, 'sections  ≅  ∩ ker(H − I)  over loops H at o', C.cyan, q, 20);
    lbl('every root vector transports path-independently ⇔ all root loops = I', 460, 755, C.dim, q, 15);
    const iq = Q(S, 1, 'Equal rays still interfere', 0.6);
    const px = 1070, py = 720, pw = 660, ph = 380, xS = x => px + x / TAU * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, iq, 'θ', 'port probability');
    chip(1400, 270, 740, 56, 'V = e^(iθ) U : same ray , different interference', C.gold, iq, 20);
    const cq = Q(S, 1, 'a relative phase theta gives port probability', 0.6);
    curve(p => { const k = Math.round(p * (INTF093.length - 1)); return [xS(INTF093[k][0]), yS(INTF093[k][1])]; }, INTF093.length - 1, C.cyan, cq, 3);
    lbl('‖(U + V)ψ‖² / 4 = (1 + cos θ) / 2', xS(Math.PI), yS(0.85), C.cyan, cq, 18);
    ['0', 'π', '2π'].forEach((s, i) => lbl(s, xS(i * Math.PI), py + 28, C.dim, iq, 16));
    lbl('assumes the two paths keep no orthogonal record', 1400, py + 64, C.dim, cq, 15);
  }
};

/* ---- 06 TRINE (V25 §7–8) ---- */
SCENES.trine = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'classical'], [1, 'Three states with pair probabilities', 'theory']]);
  const f1 = 1 - Q(S, 1, 'A seam remains', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'One trine readout sees only a disc', 0.6) * f1;
    const cx = 450, cy = 470, R = 230, ang = 0.5 + t * 0.15;
    const v = sph093(cx, cy, R, ang, q);
    const tq = Q(S, 0, 'Three trines on orthogonal axes', 0.6) * f1;
    const axes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], cols = [C.cyan, C.gold, C.mag], dn = ['c', 'g', 'm'];
    axes.forEach((ax, a) => {
      const qa = a === 2 ? q : tq;
      const [e1, e2] = greatCircle093(v, ax, cols[a], qa * 0.85, 2.2);
      for (let j = 0; j < 3; j++) { const c = Math.cos(TAU * j / 3), s = Math.sin(TAU * j / 3), p = v(...[0, 1, 2].map(k => c * e1[k] + s * e2[k])); dot(p[0], p[1], 11, dn[a], qa); }
    });
    lbl('one trine : q_j = (1 + n_j · r)/3 sees only P_u r', cx, cy + R + 60, C.mag, q, 17);
    lbl('nine directions n_aj ,  Σ_j n_aj n_ajᵀ = (3/2)(I − u_a u_aᵀ)', cx, cy + R + 92, C.dim, tq, 15);
    const rq = Q(S, 0, 'recover the whole Bloch vector', 0.6) * f1;
    chip(1400, 260, 760, 56, 'r = Σ_(a , j) q_aj n_aj', C.cyan, rq, 24);
    const sq = Q(S, 0, 'the squared probabilities sum to one plus r squared over three', 0.6) * f1;
    chip(1400, 330, 760, 56, 'Σ q_aj² = 1 + |r|² / 3', C.gold, sq, 24);
    const dq = Q(S, 0, 'every squared distance shrinks by exactly a factor three', 0.6) * f1;
    chip(1400, 400, 760, 56, 'Σ (q_aj(r) − q_aj(s))² = |r − s|² / 3', C.mag, dq, 22);
    const px = 1100, py = 770, pw = 600, ph = 270, xS = x => px + x * pw, yS = v => py - (v - 1) / 0.4 * ph;
    plotAxes(px, py, pw, ph, sq, '|r|²', 'Σ q²');
    curve(p => [xS(p), yS(1 + p / 3)], 20, C.gold, sq, 2.5);
    TRSC093.forEach((pt, k) => dot(xS(pt[0]), yS(pt[1]), 5, 'c', clamp(sq * 1.6 - k / 140)));
    lbl('120 random states , all on the line', px + 20, py - ph + 6, C.cyan, sq, 15, 'left');
    ['0', '1'].forEach((s, i) => lbl(s, xS(i), py + 26, C.dim, sq, 15));
  }
  const q = Q(S, 1, 'A seam remains', 0.6, 0.3);
  if (q > 0) {
    const cx = 430, cy = 470, R = 210;
    const v = sph093(cx, cy, R, 0.4, q, { eq: 0.9 });
    const nq = Q(S, 1, 'no continuous rule picks an amplitude for every pure state', 0.6);
    fillEll093(cx, cy - R * 0.45, R * 0.75, R * 0.3, C.cyan, nq * 0.12); lbl('chart s_N', cx, cy - R - 24, C.cyan, nq, 18);
    fillEll093(cx, cy + R * 0.45, R * 0.75, R * 0.3, C.gold, nq * 0.12); lbl('chart s_S', cx, cy + R + 40, C.gold, nq, 18);
    const wq = Q(S, 1, 'the two charts differ by a phase of winding minus one', 0.6);
    const ph = (t * 0.9) % TAU, e = v(Math.cos(ph), Math.sin(ph), 0);
    dot(e[0], e[1], 12, 'w', wq);
    dial64(cx + R + 150, cy, 70, -ph, C.mag, wq, 'e^(−iφ)');
    lbl('on the equator s_S = e^(−iφ) s_N : winding −1', cx, cy + R + 80, C.mag, wq, 17);
    const bq = Q(S, 1, 'Three states with pair probabilities one half', 0.6);
    const sx = 1390, sy = 430, SR = 170;
    const w = sph093(sx, sy, SR, 2.36, bq);
    const A = w(1, 0, 0), B = w(0, 1, 0), Cc = w(0, 0, 1);
    strokePoly([A, B, Cc].map(p => [p[0], p[1]]), C.gold, bq, 2.5);
    [[A, 'a = e_x'], [B, 'b = e_y'], [Cc, 'c = e_z']].forEach(([p, s]) => { dot(p[0], p[1], 12, 'g', bq); lbl(s, p[0] + 16, p[1] - 12, C.gold, bq, 16, 'left'); });
    lbl('pair probabilities (1 + a·b)/2 = 1/2', sx, sy + SR + 44, C.dim, bq, 16);
    const lq = Q(S, 1, 'still carry a loop value', 0.6);
    chip(sx, sy + SR + 100, 760, 58, '⟨a|b⟩⟨b|c⟩⟨c|a⟩ = (1 + i)/4  ;  mirror : (1 − i)/4', C.gold, lq, 21);
    lbl('Im part = a · (b × c) / 4 : chirality that edge lengths cannot see', sx, sy + SR + 160, C.dim, lq, 15);
  }
};

/* ---- 07 GLOBAL (V25 §9–10) ---- */
SCENES.global = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Global structure can protect information', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The infinite whole is built from compatible finite regions', 0.6) * f1;
    for (let k = 0; k < 4; k++) { const s = 110 + k * 55; rect63(470 - s, 365 - s * 0.45, 2 * s, s * 0.9, [C.gold, C.cyan, C.mag, C.vio][k], clamp(q * 1.6 - k / 6), 2); }
    lblG('Λ', 470, 372, C.gold, q, 24); lblG('Γ', 470 + 150, 372 - 64, C.cyan, q, 22);
    lbl('Λ ⊂ Γ :  Tr_(Γ∖Λ) ρ_Γ = ρ_Λ', 470, 528, C.white, q, 18);
    lbl('⇒ one quasi-local state ω , and a GNS Hilbert space', 470, 558, C.dim, q, 16);
    const mq = Q(S, 0, 'matching overlaps are not enough', 0.6) * f1;
    const nodes = [[1180, 330, 'A'], [1400, 330, 'B'], [1620, 330, 'C']];
    const ab = Q(S, 0, 'Bell pairs on A B and B C', 0.6) * f1;
    curve(p => [1180 + p * 220, 330 - Math.sin(p * Math.PI) * 60], 30, C.cyan, ab, 4); lbl('Φ⁺_AB', 1290, 255, C.cyan, ab, 20);
    curve(p => [1400 + p * 220, 330 - Math.sin(p * Math.PI) * 60], 30, C.mag, ab, 4); lbl('Φ⁺_BC', 1510, 255, C.mag, ab, 20);
    nodes.forEach(([x, y, s]) => { dot(x, y, 20, 'w', mq); lbl(s, x, y + 50, C.white, mq, 22); });
    const bq = Q(S, 0, 'agree on B', 0.6) * f1;
    lbl('both give ρ_B = I/2', 1400, 430, C.green, bq, 18);
    const nq = Q(S, 0, 'yet no three-qubit state has both', 0.6) * f1;
    stamp('NO GLOBAL STATE', 1400, 520, nq, C.red, 30, -0.04);
    lbl('a pure AB marginal forces ρ_ABC = Φ⁺ ⊗ σ_C , so ρ_BC = I/2 ⊗ σ_C has rank ≥ 2', 1400, 600, C.dim, nq, 15);
    const sq = Q(S, 0, 'a semidefinite search finds an error of at least one half', 0.6) * f1;
    chip(1400, 680, 780, 58, 'min over ρ_ABC of max ‖marginal − Φ⁺‖₁ = ' + NUM093.bell.toFixed(2), C.gold, sq, 20);
    lbl('recomputed SDP (Clarabel) ; compactness turns finite consistency into a whole', 1400, 738, C.dim, sq, 15);
    chip(470, 620, 760, 56, 'finitely satisfiable closed conditions  ⇒  all satisfiable', C.cyan, mq, 18);
    lbl('compactness ; no uniqueness , no greedy guarantee', 470, 672, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'Global structure can protect information', 0.6, 0.3);
  if (q > 0) {
    lbl('configurations c = (c_A | c_B)', 470, 270, C.white, q, 19);
    const rows = [['C₀', '0 | 0 0', '1 | 1 1'], ['C₁', '0 | 0 1', '1 | 1 0']];
    rows.forEach((r, i) => { const y = 310 + i * 90; lbl(r[0], 210, y + 40, i ? C.mag : C.cyan, q, 24); cell093(260, y, 210, 60, r[1], i ? C.mag : C.cyan, q, 21); cell093(500, y, 210, 60, r[2], i ? C.mag : C.cyan, q, 21); });
    lbl('toy code : c = (a | a , a ⊕ i) , weights 1/2 , any fixed phases', 470, 520, C.dim, q, 15);
    const cq = Q(S, 1, 'If the B part fixes each configuration', 0.6);
    chip(470, 580, 760, 52, '(i)  c_B determines c', C.gold, cq, 21);
    const sq = Q(S, 1, 'the A statistics ignore the logical class', 0.6);
    chip(470, 645, 760, 52, '(ii)  p_A(a) is the same for every class i', C.gold, sq, 21);
    const eq = Q(S, 1, 'erasing A is exactly correctable', 0.6);
    chip(470, 720, 760, 58, 'Tr_B |i_L⟩⟨j_L| = δ_ij Σ p_A(a) |a⟩⟨a|  ⇒  recover from B', C.green, eq, 19);
    lbl('recomputed : decoder on B returns the logical qubit with its reference', 470, 775, C.dim, eq, 15);
    const fq = Q(S, 1, 'Equal statistics alone fail', 0.6);
    chip(1400, 300, 760, 58, 'C₀ = {00 , 11} → Φ⁺ ,   C₁ = {01 , 10} → Ψ⁺', C.white, fq, 21);
    lbl('both single-bit marginals are I/2', 1400, 360, C.dim, fq, 16);
    const xq = Q(S, 1, 'leave a cross term X over two', 0.6);
    chip(1400, 440, 760, 60, 'Tr_B |Φ⁺⟩⟨Ψ⁺| = X/2 ≠ 0', C.red, xq, 26);
    lbl('logical |±_L⟩ = |±±⟩ : either bit leaks the logical phase', 1400, 500, C.dim, xq, 16);
    stamp('SAME STATISTICS , NOT A CODE', 1400, 610, xq, C.red, 26, -0.04);
  }
};

/* ---- 08 MIRROR (V27 §2–4) ---- */
SCENES.mirror = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The native gate hides an exact reflection', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'separates the plane of the tiles', 0.6) * f1;
    [['PLANE E = ℝ²', 'q ↦ Rq + t , R ∈ O(2)', C.cyan], ['AMPLITUDES H', 'complex-linear U , U†U = I', C.gold], ['BLOCH BALL', 'ρ = (I + r·σ)/2 , r ∈ ℝ³', C.mag]].forEach(([h, s, col], i) => { const x = 330 + i * 630; box(x - 290, 230, 580, 100, col, clamp(q * 1.6 - i / 4), 2, 'rgba(0,0,0,0.45)'); lbl(h, x, 268, col, clamp(q * 1.6 - i / 4), 20); lblG(s, x, 310, C.white, clamp(q * 1.6 - i / 4), 21); });
    const rq = Q(S, 0, 'A reflection two P minus I is unitary', 0.6) * f1;
    const cx = 500, cy = 560, R = 170;
    const v = sph093(cx, cy, R, 0.6, rq);
    const n = [0.45, 0.35, 0.82], nl = Math.hypot(...n), nn = n.map(z => z / nl);
    const pn = v(...nn), mn = v(...nn.map(z => -z));
    line(mn[0], mn[1], pn[0], pn[1], C.gold, rq, 3); lbl('n', pn[0] + 10, pn[1] - 10, C.gold, rq, 20, 'left');
    const hq = Q(S, 0, 'on the Bloch ball it is a half turn', 0.6) * f1;
    const r0 = [0.9, -0.3, 0.1], rl = Math.hypot(...r0), rr = r0.map(z => z / rl);
    const dotn = rr[0] * nn[0] + rr[1] * nn[1] + rr[2] * nn[2], rpar = nn.map(z => z * dotn), rperp = rr.map((z, k) => z - rpar[k]);
    const w = [nn[1] * rperp[2] - nn[2] * rperp[1], nn[2] * rperp[0] - nn[0] * rperp[2], nn[0] * rperp[1] - nn[1] * rperp[0]];
    const ang = Math.PI * clamp((u - (lineAt(S, 0).s + 0)) / 1.0 - 0) * hq;
    const rot = a2 => rr.map((z, k) => rpar[k] + Math.cos(a2) * rperp[k] + Math.sin(a2) * w[k]);
    const p0 = v(...rr), p1 = v(...rot(Math.PI * hq));
    arrow(cx, cy, p0[0], p0[1], C.cyan, rq, 3); arrow(cx, cy, p1[0], p1[1], C.mag, hq, 3);
    curve(p => { const s = v(...rot(Math.PI * hq * p)); return [s[0], s[1]]; }, 30, C.mag, hq * 0.7, 2);
    lbl('2P − I = n·σ :  r ↦ (2nnᵀ − I) r', cx, cy + R + 50, C.gold, rq, 18);
    lbl('half turn about n ,  det = +1', cx, cy + R + 82, C.green, hq, 18);
    const cq = Q(S, 0, 'conjugating amplitudes is the true mirror', 0.6) * f1;
    const sx = 1380;
    const v2 = sph093(sx, cy, R, 0.6, cq);
    const a0 = [0.5, 0.7, 0.5], al = Math.hypot(...a0), aa = a0.map(z => z / al), bb = [aa[0], -aa[1], aa[2]];
    const q0 = v2(...aa), q1 = v2(...bb);
    arrow(sx, cy, q0[0], q0[1], C.cyan, cq, 3); arrow(sx, cy, q1[0], q1[1], C.mag, cq, 3);
    const m1 = v2(0.75, 0, 0.75), m2 = v2(-0.75, 0, 0.75), m3 = v2(-0.75, 0, -0.75), m4 = v2(0.75, 0, -0.75);
    fillPoly([m1, m2, m3, m4].map(p => [p[0], p[1]]), C.mag, cq * 0.08); strokePoly([m1, m2, m3, m4].map(p => [p[0], p[1]]), C.mag, cq * 0.5, 1.4);
    lbl('ψ ↦ ψ̄ :  (r_x , r_y , r_z) ↦ (r_x , −r_y , r_z)', sx, cy + R + 50, C.mag, cq, 18);
    const dq = Q(S, 0, 'with determinant minus one', 0.6) * f1;
    lbl('antiunitary ,  det = −1 :  a true mirror', sx, cy + R + 82, C.red, dq, 18);
  }
  const q = Q(S, 1, 'The native gate hides an exact reflection', 0.6, 0.3);
  if (q > 0) {
    chip(540, 260, 820, 58, 'K_P⁵ = 2P − I ,   K¹⁰ = I ,   K⁻¹ = K⁹', C.gold, q, 23);
    const modes = ['000', '100', '010', '001', '101'], sgn = ['+', '−', '+', '−', '+'];
    lbl('five legal modes : 2P − I has eigenvalues +1 (×2) , −1 (×3)', 540, 335, C.dim, q, 16);
    modes.forEach((m, i) => { const x = 210 + i * 135; cell093(x, 360, 115, 60, m, i === 0 || i === 2 ? C.cyan : i === 4 ? C.green : C.dim, q, 20); });
    lbl('{000 , 010} : rank-one block Q    ·    101 : fixed', 540, 450, C.white, q, 16);
    const oq = Q(S, 1, 'Two such reflections give only the real orthogonal group', 0.6);
    chip(540, 520, 820, 56, 'Tr(R_P R_Q) = 4 − 2√5 = −0.472 ;  conjugate 4 + 2√5 = 8.47 > 2', C.cyan, oq, 18);
    lbl('infinite order  ⇒  ⟨R_P , R_Q⟩ dense in O(2) , and no more', 540, 575, C.dim, oq, 16);
    const gq = Q(S, 1, 'root of two minus root two from a quarter phase', 0.6);
    chip(540, 650, 820, 58, 'inf ‖O − c·diag(1 , i)‖ = √(2 − √2) = 0.765', C.mag, gq, 22);
    lbl('attained at O = I , c = e^(−iπ/4)', 540, 708, C.dim, gq, 16);
    const cx = 1390, cy = 480, R = 200;
    uc093(cx, cy, R, oq);
    for (let k = 0; k < 40; k++) { const an = k * Math.acos((4 - 2 * Math.sqrt(5)) / 2); const p = ucp093(cx, cy, R, an); dot(p[0], p[1], 7, 'c', clamp(oq * 1.5 - k / 50)); }
    lbl('rotation angle of R_P R_Q : real orbit', cx, cy - R - 30, C.cyan, oq, 16);
    const pq = Q(S, 1, 'the complex phase gives all of PU two', 0.6);
    chip(cx, cy + R + 70, 720, 58, 'K_P , K_Q with phase ζ :  closure PU(2)', C.green, pq, 22);
    lbl('K_P J K_P⁻¹ = cos θ J − i sin θ σ_x ,  θ = 3π/5', cx, cy + R + 125, C.dim, pq, 16);
  }
};

/* ---- 09 GARSIDE (V27 §5–6) ---- */
SCENES.garside = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'A Garside half twist', 'classical'], [0, 'twenty-eight forward calls', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Known programs mirror too', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On the native thirteen-dimensional sector', 0.6) * f1;
    const sites = ['1', '0', 'β₁', 'β₂', 'β₃', 'β₄', 'β₅', '0', '1', '0'], x0 = 150, cw = 78;
    sites.forEach((s, i) => { const fixed = i < 2 || i > 6; cell093(x0 + i * cw, 262, cw - 8, 56, s, fixed ? C.dim : C.cyan, q, 20, fixed ? 0.15 : 0.35); lbl('b' + (i - 1 < 0 ? '₋₁' : ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈'][i - 1]), x0 + i * cw + (cw - 8) / 2, 342, C.dim, q, 14); });
    lbl('13 legal middle strings (no adjacent 1s) :  a₅ = 13', 540, 246, C.white, q, 16);
    const mq = Q(S, 0, 'reversing the middle sites is a mirror S', 0.6) * f1;
    for (let k = 0; k < 2; k++) { const i = 2 + k, j = 6 - k, xa = x0 + i * cw + 35, xb = x0 + j * cw + 35; curve(p => [xa + (xb - xa) * p, 352 + Math.sin(p * Math.PI) * (14 + 12 * k)], 24, C.mag, mq, 2); }
    lblG('S K_j S† = K_(6−j) ,  S v = v', 540, 410, C.mag, mq, 22);
    const gq = Q(S, 0, 'A Garside half twist builds it', 0.6) * f1, cq = Q(S, 0, 'twenty-eight forward calls', 0.6) * f1;
    lbl('Δ_K = (K₀⋯K₆)(K₀⋯K₅)(K₀⋯K₄)(K₀⋯K₃)(K₀K₁K₂)(K₀K₁)K₀', 540, 448, C.gold, gq, 16);
    let n = 0;
    for (let r = 0; r < 7; r++) for (let j = 0; j <= 6 - r; j++) { const qq = clamp(cq * 2.2 - n / 28); cell093(190 + j * 66, 468 + r * 44, 58, 36, 'K' + ['₀', '₁', '₂', '₃', '₄', '₅', '₆'][j], C.gold, qq, 15, 0.25); n++; }
    lbl('7 + 6 + … + 1 = 28 calls', 760, 610, C.gold, cq, 18, 'left'); lbl('no ancillas ,', 760, 640, C.dim, cq, 15, 'left'); lbl('no measurement', 760, 662, C.dim, cq, 15, 'left');
    const hq = Q(S, 0, 'exact up to a global phase', 0.6) * f1;
    const hx = 1180, hy = 290, hc = 30;
    lbl('|⟨e_β′ , Δ_K e_β⟩|  (recomputed)', hx + 6.5 * hc, hy - 18, C.dim, hq, 15);
    for (let i = 0; i < 13; i++) for (let j = 0; j < 13; j++) { const val = GABS093[i][j]; fillBox(hx + j * hc + 1, hy + i * hc + 1, hc - 2, hc - 2, val > 0.5 ? C.mag : C.dim, hq * (val > 0.5 ? 0.85 : 0.12)); }
    rect63(hx, hy, 13 * hc, 13 * hc, C.mag, hq * 0.7, 1.4);
    BETA093.forEach((b, i) => { if (i % 2 === 0) lbl(b, hx - 8, hy + i * hc + 20, C.dim, hq * 0.8, 12, 'right'); });
    lbl('a permutation : β ↦ reversed β', hx + 6.5 * hc, hy + 13 * hc + 30, C.mag, hq, 16);
    const pq = Q(S, 0, 'here four pi over five', 0.6) * f1;
    chip(hx + 6.5 * hc, 760, 600, 58, 'Δ_K = e^(iχ) S ,  χ = 4π/5', C.green, pq, 23);
    lbl('max entry error ' + NUM093.err.toExponential(1), hx + 6.5 * hc, 812, C.dim, pq, 14);
  }
  const q = Q(S, 1, 'Known programs mirror too', 0.6, 0.3);
  if (q > 0) {
    const p = [0, 3, 1, 5];
    lbl('program p (call order)', 150, 275, C.white, q, 18, 'left');
    p.forEach((j, i) => cell093(150 + i * 110, 295, 96, 60, 'K' + ['₀', '₁', '₂', '₃', '₄', '₅', '₆'][j], C.cyan, q, 22));
    const mq = Q(S, 1, 'replace every call by nine calls of the same gate', 0.6);
    lbl('mirror program m(p) : 9 ℓ calls , same order', 150, 420, C.gold, mq, 18, 'left');
    p.forEach((j, i) => { for (let k = 0; k < 9; k++) { const qq = clamp(mq * 2 - (i * 9 + k) / 40); fillBox(150 + i * 200 + k * 21, 440, 17, 56, C.gold, qq * 0.5); rect63(150 + i * 200 + k * 21, 440, 17, 56, C.gold, qq, 1); } lbl('K' + ['₀', '₁', '₂', '₃', '₄', '₅', '₆'][j] + '⁹', 150 + i * 200 + 94, 524, C.gold, mq, 17); });
    const iq = Q(S, 1, 'The inverse program is different', 0.6);
    lbl('inverse program : reversed order', 150, 600, C.red, iq, 18, 'left');
    p.slice().reverse().forEach((j, i) => { for (let k = 0; k < 9; k++) { fillBox(150 + i * 200 + k * 21, 620, 17, 56, C.red, iq * 0.4); rect63(150 + i * 200 + k * 21, 620, 17, 56, C.red, iq, 1); } lbl('K' + ['₀', '₁', '₂', '₃', '₄', '₅', '₆'][j] + '⁹', 150 + i * 200 + 94, 704, C.red, iq, 17); });
    const cq = Q(S, 1, 'you get the complex conjugate matrix', 0.6);
    chip(1400, 300, 760, 60, 'K_m(p) = conj(K_p) ,   K_m(p) v = conj(K_p v)', C.gold, cq, 22);
    lbl('each P_j is real , so conj(K_j) = K_j⁻¹ = K_j⁹', 1400, 362, C.dim, cq, 16);
    chip(1400, 470, 760, 58, 'K_p⁻¹ = K_j1⁻¹ ⋯ K_jℓ⁻¹  ≠  conj(K_p)', C.red, iq, 22);
    lbl('recomputed on 25 random words ; e.g. p = (0 , 3 , 1 , 5)', 1400, 530, C.dim, iq, 15);
    chip(1400, 640, 760, 58, 'P(m(q) | m(p)) = P(s(q) | s(p)) = P(q | p)', C.cyan, iq, 21);
    lbl('relative readout |⟨v , K_q† K_p v⟩|² survives a common mirror', 1400, 700, C.dim, iq, 15);
  }
};

/* ---- 10 CHIRAL (V27 §7) ---- */
SCENES.chiral = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The gap is exact', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The boundary gate K zero', 0.6) * f1;
    const cx = 470, cy = 500, R = 190;
    uc093(cx, cy, R, q);
    const st = (an, n, nm, qq, lab, col) => { const p = ucp093(cx, cy, R, an); for (let k = 0; k < n; k++) { const rr = R - (24 + k * 12); dot(cx + rr * Math.cos(an), cy - rr * Math.sin(an), 6, nm, qq); } dot(p[0], p[1], 12, nm, qq); const L = ucp093(cx, cy, R + 50, an); lblG(lab, L[0], L[1] + 8, col, qq, 20); };
    st(ZA093, 8, 'g', q, 'ζ ×8', C.gold); st(2 * ZA093, 5, 'g', q, 'ζ² ×5', C.gold);
    const iq = Q(S, 0, 'no change of frame turns K into a phase times its inverse', 0.6) * f1;
    st(-ZA093, 8, 'm', iq, 'ζ⁻¹ ×8', C.mag); st(-2 * ZA093, 5, 'm', iq, 'ζ⁻² ×5', C.mag);
    lbl('gold : K₀ on H ;  magenta : K₀⁻¹', cx, cy + R + 80, C.dim, iq, 16);
    const mq = Q(S, 0, 'Because eight and five differ', 0.6) * f1;
    chip(1390, 260, 760, 58, 'P e_β = β₁ e_β :  β₁ = 1 → 5 strings ,  β₁ = 0 → 8', C.cyan, q, 19);
    chip(1390, 340, 760, 58, 'U K U† = c K⁻¹  needs  c = ζ²  and  c = ζ⁴', C.gold, mq, 21);
    stamp('EIGHT ≠ FIVE', 1390, 470, mq, C.red, 36, -0.04);
    lbl('the inverse gate K⁹ is still executable ;', 1390, 570, C.dim, iq, 16);
    lbl('what fails is conjugating K into it by a fixed frame', 1390, 598, C.dim, iq, 16);
  }
  const q = Q(S, 1, 'The gap is exact', 0.6, 0.3);
  if (q > 0) {
    chip(540, 270, 820, 64, 'inf_(U , c) ‖U K U† − c K⁻¹‖ = 2 sin(3π/20) = ' + NUM093.gap.toFixed(3), C.gold, q, 22);
    lbl('principal angles : five 2×2 blocks + a 3-dim common kernel', 540, 330, C.dim, q, 15);
    lbl('spectrum of D_P D_Q ⊃ {1 , e^(i(θ ± ω))} ,  arc ≥ θ = 3π/5', 540, 358, C.dim, q, 15);
    const aq = Q(S, 1, 'about point nine one', 0.6);
    chip(540, 430, 820, 56, 'attained : Q ⊥ P (5 + 5 ≤ 13) ,  c = −i', C.green, aq, 21);
    const tq = Q(S, 1, 'In two dimensions, with one against one, such a frame exists', 0.6);
    chip(540, 540, 820, 56, '2D , real P :  Y K_P Y = ζ³ K_P⁻¹', C.cyan, tq, 22);
    lbl('balance 1 + 1 allows it ; 8 + 5 does not', 540, 595, C.dim, tq, 16);
    chip(540, 680, 820, 56, 'doubled 26 dims :  J (K ⊕ K̄) J = (K ⊕ K̄)⁻¹', C.vio, tq, 20);
    lbl('a chirality label is extra structure , not supplied by the 13-dim model', 540, 735, C.dim, tq, 15);
    const px = 1070, py = 760, pw = 660, ph = 440, xS = b => px + b / (Math.PI / 2) * pw, yS = v => py - (v - 0.6) / 1.1 * ph;
    plotAxes(px, py, pw, ph, q, '', 'best ‖D_P D_Q − d I‖');
    lbl('common principal angle β of the five blocks', px + pw / 2, py + 52, C.dim, q, 16);
    dashed(px, yS(NUM093.gap), px + pw, yS(NUM093.gap), C.red, q, 2); lbl('2 sin(3π/20) = 0.908', px + pw - 8, yS(NUM093.gap) + 26, C.red, q, 16, 'right');
    curve(p => { const k = Math.round(p * (CHC093.length - 1)); return [xS(CHC093[k][0]), yS(CHC093[k][1])]; }, CHC093.length - 1, C.gold, q, 3);
    CHC093.forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'g', q));
    dot(xS(Math.PI / 2), yS(NUM093.gap), 13, 'n', aq);
    lbl('0', xS(0), py + 26, C.dim, q, 15); lbl('π/2', xS(Math.PI / 2), py + 26, C.dim, q, 15);
    CHD093.forEach((v, k) => dot(px + 30 + k * 4, yS(v), 4, 'c', q * 0.8));
    lbl('random U in U(13) : ≥ 1.46', px + 30, yS(1.62) - 10, C.cyan, q, 14, 'left');
  }
};

/* ---- 11 GRAM (V27 §8) ---- */
SCENES.gram = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'Equal Gram matrices give one unitary', 'lean'], [0, 'with a phase per state', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Zero, plus and plus i', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Non-orthogonal readouts', 0.6) * f1;
    const labs = ['∅', '1', '2', '3', '13'];
    const P = kgraph64(430, 450, 170, 5, q, [[0, 1, C.cyan, 1], [1, 2, C.cyan, 1], [2, 3, C.cyan, 1], [3, 4, C.cyan, 1], [4, 0, C.cyan, 1], [0, 2, C.dim, 0.4], [1, 3, C.dim, 0.4]], labs);
    lbl('five readout rays : G_ij = ⟨v_i , v_j⟩ ,  G ⪰ 0 , G_ii = 1', 430, 680, C.white, q, 17);
    lbl('points and plain edges are not enough : a complex kernel is', 430, 712, C.dim, q, 15);
    const lq = Q(S, 0, 'Equal Gram matrices give one unitary', 0.6) * f1;
    chip(1400, 260, 760, 58, 'G(v) = G(w)  ⇒  ∃ U unitary , U v_i = w_i', C.green, lq, 22);
    const fq = Q(S, 0, 'a theorem frozen', 0.6) * f1;
    box(1020, 310, 760, 74, C.green, fq, 2, 'rgba(0,40,20,0.45)');
    lbl('LEAN · exists_unitary_mul_eq_of_conjTranspose_mul_eq', 1400, 340, C.green, fq, 16);
    lbl('Bᴴ B = Aᴴ A  ⇒  B = U A  (frozen at the subject commit)', 1400, 368, C.dim, fq, 15);
    const pq = Q(S, 0, 'with a phase per state', 0.6) * f1;
    chip(1400, 440, 760, 58, 'U v_i = g_i w_i  ⇔  |G(v)_ij| = |G(w)_ij|  and', C.cyan, pq, 19);
    chip(1400, 505, 760, 58, 'Π_(edges of C) G(v)_ij / G(w)_ij = 1 for every loop C', C.cyan, pq, 19);
    const sq = Q(S, 0, 'overlap moduli and loop products must agree', 0.6) * f1;
    // four-cycle with no triangles
    const sx = 1260, sy = 640, d = 70;
    const sqP = [[sx - d, sy - d * 0.6], [sx + d, sy - d * 0.6], [sx + d, sy + d * 0.6], [sx - d, sy + d * 0.6]];
    sqP.forEach((p, i) => { const qn = sqP[(i + 1) % 4]; line(p[0], p[1], qn[0], qn[1], C.gold, sq, 2.5); });
    sqP.forEach(p => dot(p[0], p[1], 9, 'g', sq));
    lbl('a 4-cycle , no triangles', sx, sy + d * 0.6 + 34, C.gold, sq, 15);
    lbl('same moduli 0.3 ;', 1380, sy - 10, C.white, sq, 16, 'left'); lbl('loop phase 1.0 vs 1.2', 1380, sy + 16, C.white, sq, 16, 'left'); lbl('⇒ no unitary , even with phases', 1380, sy + 42, C.red, sq, 16, 'left');
  }
  const q = Q(S, 1, 'Zero, plus and plus i', 0.6, 0.3);
  if (q > 0) {
    const rows = [['v₁ = |0⟩', 'w₁ = |0⟩'], ['v₂ = |+⟩', 'w₂ = |+⟩'], ['v₃ = |+i⟩', 'w₃ = |−i⟩']];
    rows.forEach(([a1, a2], i) => { cell093(170, 270 + i * 80, 300, 60, a1, C.cyan, q, 22); cell093(530, 270 + i * 80, 300, 60, a2, C.mag, Q(S, 1, 'and so do their conjugates', 0.6), 22); });
    lbl('family v', 320, 255, C.cyan, q, 17); lbl('w = conjugates', 680, 255, C.mag, Q(S, 1, 'and so do their conjugates', 0.6), 17);
    const pq = Q(S, 1, 'have pair probabilities one half', 0.6);
    lbl('|⟨v_i , v_j⟩|² = |⟨w_i , w_j⟩|² = 1/2  for i ≠ j', 500, 545, C.white, pq, 18);
    const lq = Q(S, 1, 'the loop products are one plus i over four', 0.6);
    const cx = 1390, cy = 470, R = 180;
    uc093(cx, cy, R, lq); lbl('Re', cx + R + 30, cy + 6, C.dim, lq, 15, 'left'); lbl('Im', cx, cy - R - 26, C.dim, lq, 15);
    const sc = R / 0.4;
    const pv = [cx + 0.25 * sc, cy - 0.25 * sc], pw_ = [cx + 0.25 * sc, cy + 0.25 * sc];
    arrow(cx, cy, pv[0], pv[1], C.cyan, lq, 3.5); dot(pv[0], pv[1], 12, 'c', lq); lbl('B(v) = (1 + i)/4', pv[0] + 18, pv[1] - 8, C.cyan, lq, 18, 'left');
    const mq = Q(S, 1, 'one minus i over four', 0.6);
    arrow(cx, cy, pw_[0], pw_[1], C.mag, mq, 3.5); dot(pw_[0], pw_[1], 12, 'm', mq); lbl('B(w) = (1 − i)/4', pw_[0] + 18, pw_[1] + 24, C.mag, mq, 18, 'left');
    lbl('|B| = √2 / 4 for both : only the phase differs', cx, cy + R + 50, C.dim, mq, 16);
    const nq = Q(S, 1, 'no unitary maps one triple to the other', 0.6);
    stamp('NO UNITARY , EVEN WITH PHASES', 500, 670, nq, C.red, 26, -0.04);
    lbl('the antiunitary branch conjugates every loop value instead', 500, 760, C.dim, nq, 15);
  }
};

/* ---- 12 TRANSPOSE (V27 §9) ---- */
SCENES.transpose = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [1, null, 'published']]);
  const f1 = 1 - Q(S, 1, 'The best channel adds noise', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Conjugating every unknown state is not a channel', 0.6) * f1;
    chip(540, 270, 820, 58, 'target :  ρ ↦ ρᵀ  for every unknown ψ', C.white, q, 23);
    const eq = Q(S, 0, 'on half of a maximally entangled pair', 0.6) * f1;
    dot(300, 400, 18, 'c', eq); dot(520, 400, 18, 'c', eq); curve(p => [300 + p * 220, 400 - Math.sin(p * Math.PI) * 50], 30, C.cyan, eq, 3);
    lbl('R', 300, 450, C.white, eq, 20); lbl('ψ', 520, 450, C.white, eq, 20); lbl('|Ω⟩ = d^(−1/2) Σ |ii⟩', 410, 330, C.cyan, eq, 18);
    box(600, 370, 150, 60, C.gold, eq, 2, 'rgba(40,30,0,0.4)'); lbl('id ⊗ T', 675, 408, C.gold, eq, 20);
    const fq = Q(S, 0, 'the transpose gives the swap over d', 0.6) * f1;
    chip(540, 520, 820, 60, '(id ⊗ T)(|Ω⟩⟨Ω|) = F / d', C.gold, fq, 26);
    const nq = Q(S, 0, 'which has eigenvalue minus one over d', 0.6) * f1;
    lbl('(|ij⟩ − |ji⟩)/√2 :  eigenvalue −1/d', 540, 590, C.red, nq, 18);
    stamp('NOT COMPLETELY POSITIVE', 540, 690, nq, C.red, 26, -0.04);
    // eigenvalue bars for d = 2
    const bx = 1150, by = 560;
    lbl('spectrum of F/2 (d = 2)', 1400, 300, C.dim, fq, 16);
    bars63(bx, by, [0.5, 0.5, 0.5, -0.5], 90, 40, 300, fq, C.cyan, ['+1/2', '+1/2', '+1/2', '−1/2'], C.red);
    lbl('symmetric', bx + 200, by + 80, C.cyan, fq, 16); lbl('antisymmetric', bx + 455, by + 200, C.red, nq, 16);
  }
  const q = Q(S, 1, 'The best channel adds noise', 0.6, 0.3);
  if (q > 0) {
    chip(540, 270, 820, 62, 'Φ*(X) = (Xᵀ + Tr(X) I) / (d + 1)', C.gold, q, 25);
    lbl('Choi matrix (F + I)/(d + 1) ⪰ 0 , trace preserving', 540, 330, C.dim, q, 16);
    const fq = Q(S, 1, 'gives fidelity two over d plus one on every pure state', 0.6);
    chip(540, 410, 820, 58, 'Tr[ρᵀ Φ*(ρ)] = 2/(d + 1)  for every pure ρ', C.green, fq, 22);
    const aq = Q(S, 1, 'nothing beats it on average', 0.6);
    lbl('any channel :  E Tr[ρᵀ Φ(ρ)] = Tr[J(I + F)] / (d(d + 1)) ≤ 2/(d + 1)', 540, 470, C.white, aq, 16);
    lbl('optimal transposition : Buscemi , D’Ariano , Perinotti , Sacchi 2003', 540, 500, C.cyan, aq, 15);
    const px = 1080, py = 760, pw = 620, ph = 420, xS = dd => px + (dd - 1.5) / 3 * pw, yS = v => py - v / 0.8 * ph;
    plotAxes(px, py, pw, ph, aq, 'd', 'best average fidelity');
    curve(p => { const dd = 1.6 + p * 2.8; return [xS(dd), yS(2 / (dd + 1))]; }, 40, C.gold, aq, 2.5);
    [2, 3, 4].forEach(dd => { const v = TOPT093[dd]; dot(xS(dd), yS(v), 12, 'g', aq); lbl(String(dd), xS(dd), py + 26, C.dim, aq, 16); lbl(v.toFixed(3), xS(dd), yS(v) - 22, C.gold, aq, 16); });
    lbl('dots : SDP over all channels ;  curve : 2/(d + 1)', px + pw / 2, py + 58, C.dim, aq, 15);
    const bq = Q(S, 1, 'For a qubit the mirror shrinks the Bloch ball to one third', 0.6);
    const cx = 270, cy = 655, R = 95;
    ring(cx, cy, R, C.cyan, bq * 0.6, 1.6); ell093(cx, cy, R, R * 0.28, C.cyan, bq * 0.3, 1);
    fillEll093(cx + 250, cy, R / 3, R / 3, C.mag, bq * 0.25); ring(cx + 250, cy, R / 3, C.mag, bq, 2.5);
    arrow(cx + R + 16, cy, cx + 250 - R / 3 - 14, cy, C.dim, bq, 2.5);
    lbl('r ↦ η (r_x , −r_y , r_z)', 590, cy - 12, C.white, bq, 16, 'left');
    lbl('CP ⇔ 0 ≤ η ≤ 1/3 ;  fidelity 2/3', 590, cy + 24, C.mag, bq, 17, 'left');
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'lean'], [1, 'Hopf, Garside', 'published'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['PENTAGON', 'r = 1/φ', C.gold, 'A pentagon fixes the golden matrix'], ['BRAID', 'e^(±3πi/5)', C.cyan, 'braids fix the phase'], ['CONTROL', 'Tr AB⁻¹ = φ⁻²', C.mag, 'two addresses give control'], ['CUTS · LOOPS', 'rank 4 · holonomy', C.green, 'cuts, loops and trines keep their data'], ['TRINES', '1 + |r|²/3', C.cyan, 'cuts, loops and trines keep their data'], ['WHOLE', 'Bell gap · erasure', C.vio, 'pieces make the whole'],
      ['REFLECTION', 'K⁵ = 2P − I', C.gold, 'a mirror is a reflection'], ['28 CALLS', 'Δ_K = e^(4πi/5) S', C.green, 'twenty-eight calls'], ['8 AGAINST 5', '2 sin(3π/20)', C.red, 'an eight-five obstruction'], ['LOOP TEST', '(1 ± i)/4', C.mag, 'a loop test'], ['TRANSPOSE', '2/(d + 1)', C.cyan, 'a noisy transpose']];
    items.forEach(([a1, a2, col, ph], i) => { const row = i < 6 ? 0 : 1, k = row ? i - 6 : i, n = row ? 5 : 6, x = W / 2 + (k - (n - 1) / 2) * 280, y = 230 + row * 140, q = Q(S, 0, ph) * fade; box(x - 128, y, 256, 116, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 44, col, q, 18); lblG(a2, x, y + 88, C.white, q, 19); });
    lbl('LEAN-FROZEN · weighted path Temperley–Lieb relations · equal Gram matrices ⇒ one unitary', W / 2, 545, C.green, Q(S, 1, 'The path relations and the Gram criterion are frozen') * fade, 16);
    lbl('PUBLISHED / CLASSICAL · Hopf fibration · Garside half twist · Jones-representation density (Freedman–Larsen–Wang) · optimal transposition (Buscemi et al.)', W / 2, 590, C.cyan, Q(S, 1, 'Hopf, Garside') * fade, 14);
    lbl('VOLUMES V25 · V27 · golden F · braid phases · dense control · cuts · trines · seams · compactness · erasure · mirror S · 8 + 5 gap · Gram loops', W / 2, 635, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · typed pentagons · 88 path spaces · Tr AB⁻¹ · cut rank 4 · 750 gates · Bell SDP 0.50 · Δ_K = e^(4πi/5) S · gap 0.908 · SDP 2/(d + 1)', W / 2, 680, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('DIGESTION · V25 67 atoms , V27 72 atoms , all residual-open', W / 2, 745, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pent093(W / 2, 380, 210, a, { size: 14, p3: 0.6 + 0.4 * Math.sin(t * 1.4), p2: 0.6 - 0.4 * Math.sin(t * 1.4) });
    txt('AURIC V25–V27 · MIRRORS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V25–V27 · 黄金铺砌与刚性镜像 · TRURETURING FILM 093', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A pentagon fixes the golden matrix, twenty-eight calls build a mirror, and a phase survives every covering.', W / 2, 875, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V25–V27', pentagon: 'GOLDEN PENTAGON', braid: 'BRAID PHASES', control: 'DENSE CONTROL', cuts: 'CUTS AND LOOPS', trine: 'TRINES AND SEAMS', global: 'GLOBAL STATES', mirror: 'REFLECTIONS', garside: 'TWENTY-EIGHT CALLS', chiral: 'EIGHT AGAINST FIVE', gram: 'GRAM LOOPS', transpose: 'NOISY TRANSPOSE', finale: 'LEDGER' });

function poster093() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pent093(500, 500, 290, 1, { size: 17 });
  txt('r = 1/φ ,  s = 1/√φ', 1340, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('Δ_K = e^(4πi/5) S  · 28 calls', 1340, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('8 against 5 · gap 2 sin(3π/20)', 1340, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('AURIC V25–V27', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V25–V27 · MIRRORS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('黄 金 铺 砌 与 刚 性 镜 像', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 093', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster093;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
