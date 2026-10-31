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

/* ---- film 089: AURIC V17–V18 · QUANTUM PYTHAGORAS AND RECURSIVE GOLDEN GATES ---- */
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
const _po089 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po089.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po089.set(key, off); }
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
/* ---- film 089 data (from verify089.py / vis089.json) ---- */
const TRI089 = [[["0", "1", "2"], [1, 1, 2], "right"], [["0", "1", "3"], [1, 1, 2], "right"], [["0", "1", "13"], [1, 1, 2], "right"], [["0", "2", "3"], [1, 1, 2], "right"], [["0", "2", "13"], [1, 2, 3], "right"], [["0", "3", "13"], [1, 1, 2], "right"], [["1", "2", "3"], [2, 2, 2], "equilateral"], [["1", "2", "13"], [1, 2, 3], "right"], [["1", "3", "13"], [1, 1, 2], "right"], [["2", "3", "13"], [1, 2, 3], "right"]];
const FIBH089 = [[0.002, 1.0801, -10.58661], [0.008, 1.13335, -7.78364], [0.014, 1.17629, -6.63356], [0.02, 1.21373, -5.88888], [0.026, 1.24733, -5.33232], [0.032, 1.27794, -4.88469], [0.038, 1.30608, -4.50812], [0.044, 1.33213, -4.18148], [0.05, 1.35634, -3.89182], [0.056, 1.37889, -3.63058], [0.062, 1.39995, -3.39182], [0.068, 1.41963, -3.17125], [0.074, 1.43803, -2.96566], [0.08, 1.45524, -2.77259], [0.086, 1.47133, -2.59009], [0.092, 1.48634, -2.41662], [0.098, 1.50034, -2.25092], [0.104, 1.51337, -2.09194], [0.11, 1.52546, -1.9388], [0.116, 1.53664, -1.79077], [0.122, 1.54695, -1.6472], [0.128, 1.55642, -1.50754], [0.134, 1.56505, -1.37131], [0.14, 1.57288, -1.23808], [0.146, 1.57991, -1.10746], [0.152, 1.58617, -0.9791], [0.158, 1.59167, -0.85269], [0.164, 1.59641, -0.72793], [0.17, 1.6004, -0.60456], [0.176, 1.60366, -0.48232], [0.182, 1.60619, -0.36098], [0.188, 1.608, -0.24029], [0.194, 1.60908, -0.12004], [0.2, 1.60944, 0.0], [0.206, 1.60908, 0.12004], [0.212, 1.608, 0.24029], [0.218, 1.60619, 0.36098], [0.224, 1.60366, 0.48232], [0.23, 1.6004, 0.60456], [0.236, 1.59641, 0.72793], [0.242, 1.59167, 0.85269], [0.248, 1.58617, 0.9791], [0.254, 1.57991, 1.10746], [0.26, 1.57288, 1.23808], [0.266, 1.56505, 1.37131], [0.272, 1.55642, 1.50754], [0.278, 1.54695, 1.6472], [0.284, 1.53664, 1.79077], [0.29, 1.52546, 1.9388], [0.296, 1.51337, 2.09194], [0.302, 1.50034, 2.25092], [0.308, 1.48634, 2.41662], [0.314, 1.47133, 2.59009], [0.32, 1.45524, 2.77259], [0.326, 1.43803, 2.96566], [0.332, 1.41963, 3.17125], [0.338, 1.39995, 3.39182], [0.344, 1.37889, 3.63058], [0.35, 1.35634, 3.89182], [0.356, 1.33213, 4.18148], [0.362, 1.30608, 4.50812], [0.368, 1.27794, 4.88469], [0.374, 1.24733, 5.33232], [0.38, 1.21373, 5.88888], [0.386, 1.17629, 6.63356], [0.392, 1.13335, 7.78364], [0.398, 1.0801, 10.58661]];
const FOUR089 = {"terms": [0.10465, 0.02573, 0.00402, 0.00402], "total": 0.13842, "pp": 0.10465, "psq": 0.03377};
const C2PHI089 = [[0.0, 0.0], [0.08727, 0.0019], [0.17453, 0.0076], [0.2618, 0.01704], [0.34907, 0.03015], [0.43633, 0.04685], [0.5236, 0.06699], [0.61087, 0.09042], [0.69813, 0.11698], [0.7854, 0.14645], [0.87266, 0.17861], [0.95993, 0.21321], [1.0472, 0.25], [1.13446, 0.28869], [1.22173, 0.32899], [1.309, 0.37059], [1.39626, 0.41318], [1.48353, 0.45642], [1.5708, 0.5], [1.65806, 0.54358], [1.74533, 0.58682], [1.8326, 0.62941], [1.91986, 0.67101], [2.00713, 0.71131], [2.0944, 0.75], [2.18166, 0.78679], [2.26893, 0.82139], [2.35619, 0.85355], [2.44346, 0.88302], [2.53073, 0.90958], [2.61799, 0.93301], [2.70526, 0.95315], [2.79253, 0.96985], [2.87979, 0.98296], [2.96706, 0.9924], [3.05433, 0.9981], [3.14159, 1.0], [3.22886, 0.9981], [3.31613, 0.9924], [3.40339, 0.98296], [3.49066, 0.96985], [3.57792, 0.95315], [3.66519, 0.93301], [3.75246, 0.90958], [3.83972, 0.88302], [3.92699, 0.85355], [4.01426, 0.82139], [4.10152, 0.78679], [4.18879, 0.75], [4.27606, 0.71131], [4.36332, 0.67101], [4.45059, 0.62941], [4.53786, 0.58682], [4.62512, 0.54358], [4.71239, 0.5], [4.79966, 0.45642], [4.88692, 0.41318], [4.97419, 0.37059], [5.06145, 0.32899], [5.14872, 0.28869], [5.23599, 0.25], [5.32325, 0.21321], [5.41052, 0.17861], [5.49779, 0.14645], [5.58505, 0.11698], [5.67232, 0.09042], [5.75959, 0.06699], [5.84685, 0.04685], [5.93412, 0.03015], [6.02139, 0.01704], [6.10865, 0.0076], [6.19592, 0.0019], [6.28319, 0.0]];
const BRAID089 = [[0.25, 180.0], [0.26269, 154.602], [0.27539, 144.648], [0.28808, 137.358], [0.30078, 131.479], [0.31347, 126.514], [0.32617, 122.205], [0.33886, 118.393], [0.35156, 114.976], [0.36425, 111.88], [0.37695, 109.053], [0.38964, 106.453], [0.40234, 104.048], [0.41503, 101.813], [0.42773, 99.728], [0.44042, 97.774], [0.45312, 95.939], [0.46581, 94.209], [0.47851, 92.574], [0.4912, 91.026], [0.5039, 89.557], [0.51659, 88.159], [0.52929, 86.828], [0.54198, 85.557], [0.55468, 84.343], [0.56737, 83.18], [0.58007, 82.066], [0.59276, 80.997], [0.60546, 79.969], [0.61815, 78.981], [0.63085, 78.029], [0.64354, 77.112], [0.65624, 76.227], [0.66893, 75.372], [0.68163, 74.546], [0.69432, 73.747], [0.70702, 72.974], [0.71971, 72.225], [0.73241, 71.499], [0.7451, 70.795], [0.7578, 70.111], [0.77049, 69.448], [0.78319, 68.803], [0.79588, 68.175], [0.80858, 67.565], [0.82127, 66.972], [0.83397, 66.393], [0.84666, 65.83], [0.85936, 65.281], [0.87205, 64.746], [0.88475, 64.223], [0.89744, 63.713], [0.91014, 63.216], [0.92283, 62.73], [0.93553, 62.255], [0.94822, 61.791], [0.96092, 61.337], [0.97361, 60.893], [0.98631, 60.458], [0.999, 60.033]];
const TM089 = [1.0, 0.38197, 0.52786, 0.49342, 0.50155, 0.49963, 0.50009, 0.49998, 0.5, 0.5, 0.5, 0.5, 0.5];
const KM089 = [1.0, 0.38197, 0.1459, 0.90983, 0.67376, 0.05573, 0.67376, 0.90983, 0.1459, 0.38197, 1.0, 0.38197, 0.1459];
const THR089 = [[0.25, 0.5, 0.25, 0.25, 180.0], [0.26, 0.48, 0.26, 0.26, 157.38014], [0.27, 0.46, 0.27, 0.27, 148.41366], [0.28, 0.44, 0.28, 0.28, 141.78679], [0.29, 0.42, 0.29, 0.29, 136.39718], [0.3, 0.4, 0.3, 0.3, 131.81031], [0.31, 0.38, 0.31, 0.31, 127.79972], [0.32, 0.36, 0.32, 0.32, 124.22887], [0.33, 0.34, 0.33, 0.33, 121.00758], [0.34, 0.32, 0.34, 0.34, 118.07249], [0.35, 0.3, 0.35, 0.35, 115.37693], [0.36, 0.28, 0.36, 0.36, 112.88538], [0.37, 0.26, 0.37, 0.37, 110.56999], [0.38, 0.24, 0.38, 0.38, 108.40848], [0.39, 0.22, 0.39, 0.39, 106.38267], [0.4, 0.2, 0.4, 0.4, 104.47751], [0.41, 0.18, 0.41, 0.41, 102.68038], [0.42, 0.16, 0.42, 0.42, 100.98058], [0.43, 0.14, 0.43, 0.43, 99.36892], [0.44, 0.12, 0.44, 0.44, 97.83748], [0.45, 0.1, 0.45, 0.45, 96.37937], [0.46, 0.08, 0.46, 0.46, 94.98854], [0.47, 0.06, 0.47, 0.47, 93.65967], [0.48, 0.04, 0.48, 0.48, 92.38802], [0.49, 0.02, 0.49, 0.49, 91.16938], [0.5, 0.0, 0.5, 0.5, 90.0]];
const REV089 = [1.0, 0.58779, 0.30902, 0.95106, 0.80902, 0.0, 0.80902, 0.95106, 0.30902, 0.58779, 1.0, 0.58779, 0.30902, 0.95106, 0.80902, 0.0, 0.80902, 0.95106, 0.30902, 0.58779, 1.0];
const FRESH089 = [1.0, 0.58779, 0.34549, 0.20307, 0.11936, 0.07016, 0.04124, 0.02424, 0.01425, 0.00837, 0.00492, 0.00289, 0.0017, 0.001, 0.00059, 0.00035, 0.0002, 0.00012, 7e-05, 4e-05, 2e-05];
const PAR089 = [[0.0, 0.0], [0.05, 0.1], [0.1, 0.2], [0.15000000000000002, 0.30000000000000004], [0.2, 0.4], [0.25, 0.5], [0.30000000000000004, 0.6000000000000001], [0.35000000000000003, 0.7000000000000001], [0.4, 0.8], [0.45, 0.9], [0.5, 1.0]];
const REC089 = [[0.25, 0.6666666666666666], [0.5, 0.16666666666666666], [0.75, 0.6666666666666666]];
const NUM089 = {"robust": 0.415, "lgap": 2.0, "bfail": 0.808, "tl": [2.197, 2.773, 3.219]};
/* ---- film 089 helpers ---- */
const MD089 = [['0', [0, 0, 0], 'w', '000', 'v₀'], ['1', [1, 0, 0], 'c', '100', 'v₁'], ['2', [0, 0, 1], 'g', '010', 'v₂'], ['3', [0, 1, 0], 'm', '001', 'v₃'], ['13', [1, 1, 0], 'n', '101', 'v₁₃']];
const PE089 = [[0, 1], [1, 4], [4, 3], [3, 0], [2, 0], [2, 1], [2, 3], [2, 4]];
const ZD089 = 108, PHI089 = (1 + Math.sqrt(5)) / 2;
function pyr089(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, o.tilt == null ? 0.38 : o.tilt), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MD089.map(m => W3(m[1]));
  if (o.fill) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * o.fill);
  if (o.tri) o.tri.forEach(([ids, col, q]) => { if (q > 0) { fillPoly(ids.map(i => P[i]), col, a * q * 0.3); strokePoly(ids.map(i => P[i]), col, a * q, 3.5); } });
  PE089.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], o.ec || C.cyan, a * (o.ea == null ? 0.7 : o.ea), 2));
  if (o.d1) dashed(P[0][0], P[0][1], P[4][0], P[4][1], C.gold, a * o.d1, 3);
  if (o.d2) dashed(P[1][0], P[1][1], P[3][0], P[3][1], C.red, a * o.d2, 3);
  if (o.mid) { const M = W3([0.5, 0.5, 0]); dot(M[0], M[1], 11, 'o', a * o.mid); }
  MD089.forEach((m, k) => { dot(P[k][0], P[k][1], o.r || 13, m[2], a); if (o.lab !== false) lbl(o.bits ? m[3] : m[4], P[k][0] + (k === 2 ? 0 : 24), P[k][1] + (k === 2 ? -24 : 8), C.white, a * (o.la == null ? 1 : o.la), o.ls || 19, k === 2 ? 'center' : 'left'); });
  return P;
}
const cpt089 = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];
function circ089(cx, cy, r, a) {
  if (a <= 0) return;
  ring(cx, cy, r, C.dim, a * 0.8, 1.6);
  line(cx - r - 30, cy, cx + r + 30, cy, C.dim, a * 0.5, 1.2); line(cx, cy + r + 30, cx, cy - r - 30, C.dim, a * 0.5, 1.2);
  lbl('Re', cx + r + 34, cy + 26, C.dim, a, 15, 'left'); lbl('Im', cx + 10, cy - r - 30, C.dim, a, 15, 'left');
  dot(cx, cy, 6, 'w', a); lbl('0', cx - 14, cy + 22, C.dim, a, 15);
}
function spt089(cx, cy, r, deg, col, dn, a, lab, lx = 0, ly = 0) { if (a <= 0) return; const p = cpt089(cx, cy, r, deg); dot(p[0], p[1], 14, dn, a); if (lab) lblG(lab, p[0] + lx, p[1] + ly, col, a, 24); return p; }
function cell089(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function fpath089(pts, col, a, lw = 3) { if (a <= 0 || pts.length < 2) return; ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.globalAlpha = 1; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyr089(480, 500, 330, 0.6 + t * 0.2, s0, { fill: 0.1, bits: true, d1: 0.7, d2: 0.7 });
  const items = [['turns sums and products into logarithms', 'V17 · SUM , PRODUCT , LOGARITHM', 'log(ab) = log a + log b', C.gold],
    ['triangles and squared amplitudes', 'V17 · TRIANGLES AND SQUARES', 'a² + b² = c²  ·  ‖u ⊗ v‖² = ‖u‖² ‖v‖²', C.cyan],
    ['when a triangulation is a measurement', 'V18 · TRIANGULATION AND COLLAPSE', 'two diagonals → two endpoints → one instrument', C.mag],
    ['when a phase inside a gate becomes a gate', 'V18 · RECURSIVE UNITARY GATES', 'z  →  W  →  C_P(W) = (I − P) ⊗ I + P ⊗ W', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr089(W / 2, 430, 320, 0.5 + t * 0.25, rp * 0.9, { fill: 0.12, lab: false, d1: 0.8, d2: 0.8 });
  chip(330, 330, 340, 58, 'one hidden ratio', C.gold, rp, 22); chip(330, 415, 340, 58, 'a log and a phase', C.mag, rp, 22); chip(330, 500, 340, 58, 'two triangulations', C.cyan, rp, 22);
  box(1420, 320, 380, 200, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('a gate inside a gate', 1610, 385, C.green, rp, 22); lblG('spec W ⊆ {1, ζ, ζ̄}', 1610, 455, C.white, rp, 28);
  txt(scramble('AURIC V17–V18 · PYTHAGORAS', rp, 489), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V17–V18 · 量 子 勾 股 与 递 归 黄 金 门', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 089 · AURIC_SUM_PRODUCT_LOGARITHMS_AND_QUANTUM_PYTHAGOREAN_GEOMETRY_V17 · AURIC_TRIANGULATION_COLLAPSE_AND_RECURSIVE_UNITARY_GATES_V18', W / 2, 115, { size: 13, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
};

/* ---- 02 SUM AND PRODUCT (V17 §2, §8) ---- */
SCENES.logs = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const f1 = 1 - Q(S, 1, 'Squared length does the same', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The logarithm is a semiring isomorphism', 0.6) * f1;
    chip(530, 265, 860, 60, '( ℝ≥0 , + , × )   ⇄   ( [−∞, ∞) , ⊕ , ⊗ )', C.gold, q, 24);
    lbl('log →   ← exp ;   0 ↦ −∞ ,  1 ↦ 0', 530, 322, C.dim, q, 16);
    const mq = Q(S, 0, 'multiplication becomes addition', 0.6) * f1;
    chip(530, 400, 860, 58, 'log(a b) = log a + log b   :   a ⊗ b = a + b', C.cyan, mq, 22);
    const aq = Q(S, 0, 'addition becomes log-sum-exp', 0.6) * f1;
    chip(530, 480, 860, 58, 'log(a + b) = log a ⊕ log b   :   a ⊕ b = log(eᵃ + eᵇ)', C.mag, aq, 22);
    lbl('associativity , commutativity and distributivity carry over', 530, 540, C.dim, aq, 15);
    lbl('continuous L with L(ab) = L(a) + L(b)  ⇒  L = c · log   (Prop. 2.4)', 530, 610, C.white, aq, 17);
    lbl('Z = Σ q e^(−c/τ) :  E_P c + τ D(P‖q) = −τ log Z + τ D(P‖P*)', 530, 660, C.dim, aq, 16);
    const tq = Q(S, 0, 'so three, four, five reads', 0.6) * f1;
    chip(1400, 265, 720, 60, '3² + 4² = 5²', C.white, tq, 26);
    const sq = [[3, C.cyan, '9'], [4, C.gold, '16'], [5, C.green, '25']], s = 34, base = 700;
    let x = 1060;
    sq.forEach(([n, col, lab], i) => { const qq = clamp(tq * 1.5 - i * 0.25), w = n * s; fillBox(x, base - w, w, w, col, qq * 0.25); rect63(x, base - w, w, w, col, qq, 2); for (let k = 1; k < n; k++) { line(x + k * s, base - w, x + k * s, base, col, qq * 0.3, 1); line(x, base - k * s, x + w, base - k * s, col, qq * 0.3, 1); } lbl(lab, x + w / 2, base - w / 2 + 9, C.white, qq, 24); lbl(i < 2 ? (i ? '=' : '+') : '', x + w + 30, base - 60, C.white, qq, 30); x += w + 60; });
    const lq = Q(S, 0, 'two log five equals two log three', 0.6) * f1;
    chip(1400, 350, 720, 58, '2 log 5 = (2 log 3) ⊕ (2 log 4)', C.gold, lq, 24);
    lbl(NUM089.tl[2].toFixed(3) + ' = log( e^' + NUM089.tl[0].toFixed(3) + ' + e^' + NUM089.tl[1].toFixed(3) + ' ) = log(9 + 16)', 1400, 410, C.white, lq, 18);
    lbl('exact change of coordinates ; + and × stay different operations', 1400, 445, C.dim, lq, 15);
  }
  const q = Q(S, 1, 'Squared length does the same', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 860, 60, 'w(v) = ‖v‖² :  w(u ⊕ v) = w(u) + w(v) ,  w(u ⊗ v) = w(u) w(v)', C.gold, q, 20);
    const dq = Q(S, 1, 'adding on direct sums', 0.6);
    const s = 52, x0 = 180, y0 = 380;
    for (let i = 0; i < 5; i++) { const col = i < 3 ? C.gold : C.cyan; fillBox(x0 + i * s, y0, s - 4, 46, col, dq * 0.35); rect63(x0 + i * s, y0, s - 4, 46, col, dq, 1.6); }
    lbl('‖u‖² = 3', x0 + 1.5 * s, y0 - 14, C.gold, dq, 17); lbl('‖v‖² = 2', x0 + 4 * s, y0 - 14, C.cyan, dq, 17);
    lbl('u ⊕ v :  3 + 2 = 5', x0 + 2.5 * s, y0 + 80, C.white, dq, 18);
    const tq = Q(S, 1, 'multiplying on tensor products', 0.6);
    const gx = 600, gy = 350;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { const qq = clamp(tq * 1.6 - (i * 2 + j) / 8); fillBox(gx + i * s, gy + j * s, s - 4, s - 4, C.mag, qq * 0.35); rect63(gx + i * s, gy + j * s, s - 4, s - 4, C.mag, qq, 1.6); }
    lbl('u ⊗ v :  3 × 2 = 6', gx + 1.5 * s, gy + 2 * s + 34, C.white, tq, 18);
    lbl('cross term in one space :  ‖u + v‖² = ‖u‖² + ‖v‖² + 2 Re⟨u, v⟩', 530, 560, C.dim, tq, 16);
    lbl('‖u + e^(iθ) v‖² = ‖u‖² + ‖v‖²  for every θ  ⇔  ⟨u, v⟩ = 0', 530, 600, C.white, tq, 17);
    const wq = Q(S, 1, 'with unitary invariance', 0.6);
    box(1040, 240, 740, 300, C.green, wq, 2, 'rgba(0,40,20,0.35)');
    lbl('W ≥ 0 on a Hilbert space , dim ≥ 2', 1410, 290, C.green, wq, 19);
    [['W(Uv) = W(v)  for unitary U', 'with unitary invariance'], ['W(u + v) = W(u) + W(v)  for u ⊥ v', 'orthogonal additivity'], ['W(e) = 1  for unit e', 'unit weight one']].forEach(([s2, ph], i) => lblG(s2, 1410, 345 + i * 50, C.white, Q(S, 1, ph, 0.6), 22));
    const nq = Q(S, 1, 'the squared norm is the only such weight', 0.6);
    chip(1410, 610, 740, 64, 'W(v) = ‖v‖²', C.gold, nq, 30);
    lbl('finite classical channel : V|x⟩ = Σ_y √T(y|x) |y⟩|x, y⟩_E is an isometry', 1410, 690, C.dim, nq, 15);
  }
};

/* ---- 03 FIVE MODES (V17 §3–§4) ---- */
SCENES.pyramid = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Fixing the three occupation means', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now the five modes', 0.6) * f1;
    const rq = Q(S, 0, 'exactly one affine relation', 0.6) * f1, eq = Q(S, 0, 'left, middle, right is equilateral', 0.6) * f1;
    pyr089(500, 540, 400, 0.6 + t * 0.12, q, { fill: 0.1, bits: true, d1: rq, d2: rq, mid: rq, tri: [[[1, 2, 3], C.gold, eq]] });
    chip(1400, 260, 760, 56, 'Σ = (0, 1, 2, 3, 13) = (000, 100, 010, 001, 101)', C.white, q, 21);
    lbl('v₀ = 0 ,  v₁ = eₓ ,  v₂ = e_z ,  v₃ = e_y ,  v₁₃ = eₓ + e_y   (left , middle , right)', 1400, 318, C.dim, q, 15);
    chip(1400, 380, 760, 56, 'rank (1, v_s) = 4 ,   kernel  h = (1, −1, 0, −1, 1)', C.cyan, rq, 21);
    const vq = Q(S, 0, 'v zero plus v thirteen equals', 0.6) * f1;
    chip(1400, 455, 760, 62, 'v₀ + v₁₃ = v₁ + v₃', C.gold, vq, 30);
    const tq = Q(S, 0, 'Of their ten triangles nine are right', 0.6) * f1;
    TRI089.forEach(([ids, sq, kind], i) => { const qq = clamp(tq * 1.6 - i / 14), x = 1030 + (i % 5) * 150, y = 525 + Math.floor(i / 5) * 92, col = kind === 'right' ? C.cyan : C.gold; const qe = kind === 'right' ? qq : Math.max(qq * 0.6, eq); box(x, y, 136, 78, col, qe, kind === 'right' ? 1.5 : 2.5, 'rgba(0,0,0,0.45)'); lbl(ids.join(' · '), x + 68, y + 32, C.white, qe, 17); lbl(sq.join(' ') + '', x + 68, y + 60, col, qe, 15); });
    lbl('side² of each triangle :  nine right ,  one equilateral (2 2 2) , side √2', 1400, 740, C.white, tq, 16);
  }
  const q = Q(S, 1, 'Fixing the three occupation means', 0.6, 0.3);
  if (q > 0) {
    const X = 0.4, Y = 0.4, Z = 0.2, R = 0.8;
    const kap = 0.2 + 0.19 * Math.sin(t * 0.55);
    chip(530, 265, 860, 58, 'X = p₁ + p₁₃ ,  Y = p₃ + p₁₃ ,  Z = p₂ ,  R = 1 − Z ,  κ = p₁₃', C.white, q, 20);
    chip(530, 345, 860, 58, 'p(κ) = (R − X − Y + κ , X − κ , Z , Y − κ , κ)', C.cyan, q, 22);
    lbl('κ₋ = max(0, X + Y − R)  ≤  κ  ≤  min(X, Y) = κ₊', 530, 402, C.dim, q, 16);
    const sx = k => 180 + k / 0.4 * 700, sy = 460;
    line(sx(0), sy, sx(0.4), sy, C.cyan, q, 4); dot(sx(0), sy, 10, 'r', q); dot(sx(0.4), sy, 10, 'g', q);
    lbl('κ₋ = 0', sx(0), sy + 34, C.red, q, 16); lbl('κ₊ = 0.4', sx(0.4), sy + 34, C.gold, q, 16); lbl('X = Y = 0.4 , Z = 0.2', sx(0.2), sy - 22, C.dim, q, 15);
    dot(sx(kap), sy, 13, 'w', q);
    const pk = [R - X - Y + kap, X - kap, Z, Y - kap, kap], cols = [C.white, C.cyan, C.gold, C.mag, C.green];
    pk.forEach((v, i) => { const x = 200 + i * 140, h = v * 430; fillBox(x, 760 - h, 80, h, cols[i], q * 0.4); rect63(x, 760 - h, 80, h, cols[i], q, 1.6); lbl(MD089[i][3], x + 40, 790, C.dim, q, 15); });
    lbl('p(κ) moves along h = (1, −1, 0, −1, 1) ; the three means stay fixed', 530, 540, C.dim, q, 15);
    const eq = Q(S, 1, 'Its coordinate is eta', 0.6);
    chip(1400, 265, 760, 58, 'η = log ( p₀ p₁₃ / p₁ p₃ )', C.gold, eq, 26);
    const dq = Q(S, 1, 'the log of the four-corner ratio', 0.6);
    chip(1400, 345, 760, 58, 'p₀ p₁₃ − p₁ p₃ = R κ − X Y', C.mag, dq, 24);
    const px = 1060, py = 770, pw = 680, ph = 300, xS = k => px + k / 0.4 * pw, yS = v => py - ph / 2 - clamp(v / 6, -1, 1) * ph / 2;
    plotAxes(px, py, pw, ph, eq, 'κ along the fiber', 'η(κ)');
    line(px, yS(0), px + pw, yS(0), C.dim, eq * 0.6, 1.2);
    fpath089(FIBH089.filter(r => Math.abs(r[2]) <= 6).map(r => [xS(r[0]), yS(r[2])]), C.gold, eq, 3);
    const ek = Math.log(pk[0] * pk[4] / (pk[1] * pk[3]));
    dot(xS(kap), yS(ek), 11, 'w', eq);
    const iq = Q(S, 1, 'which vanishes exactly when the ends are independent', 0.6);
    dot(xS(0.2), yS(0), 12, 'm', iq); lbl('κ* = XY/R = 0.2', xS(0.2) + 16, yS(0) + 30, C.mag, iq, 16, 'left');
    stamp('η = 0 :  INDEPENDENT ENDS', 1560, 705, iq, C.mag, 20, -0.03);
  }
};

/* ---- 04 INFORMATION PYTHAGORAS (V17 §5, §10) ---- */
SCENES.pythag = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'Toward any target without hidden coupling', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'The quantum version adds a layer', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'entropy has slope eta', 0.6) * f1;
    chip(530, 265, 860, 58, 'F(κ) = −H(p(κ)) :  F′(κ) = η ,  F″ = 1/p₀ + 1/p₁ + 1/p₃ + 1/p₁₃ > 0', C.cyan, q, 19);
    const px = 150, py = 720, pw = 760, ph = 360, xS = k => px + k / 0.4 * pw, yS = h => py - (h - 1.0) / 0.7 * ph;
    plotAxes(px, py, pw, ph, q, 'κ  (X = Y = 0.4 , Z = 0.2)', 'H(p(κ))');
    curve(p => { const r = FIBH089[Math.min(FIBH089.length - 1, Math.floor(p * (FIBH089.length - 1)))]; return [xS(r[0]), yS(r[1])]; }, FIBH089.length - 1, C.cyan, q, 3);
    const k0 = 0.08 + 0.06 * Math.sin(t * 0.7), r0 = FIBH089.reduce((b, r) => Math.abs(r[0] - k0) < Math.abs(b[0] - k0) ? r : b), sl = -r0[2];
    dot(xS(r0[0]), yS(r0[1]), 10, 'w', q); line(xS(r0[0] - 0.05), yS(r0[1] - sl * 0.05), xS(r0[0] + 0.05), yS(r0[1] + sl * 0.05), C.white, q * 0.8, 2);
    lbl('tangent : slope of −H is η', xS(0.2) + 14, py - 60, C.white, q, 15, 'left');
    const mq = Q(S, 0, 'peaking at kappa star', 0.6) * f1;
    dot(xS(0.2), yS(Math.log(5)), 13, 'g', mq); dashed(xS(0.2), yS(Math.log(5)), xS(0.2), py, C.gold, mq, 1.5);
    lbl('κ* = XY/R = 0.2 ,  H = log 5', xS(0.2), yS(Math.log(5)) - 22, C.gold, mq, 17);
    const gq = Q(S, 0, 'Toward any target without hidden coupling', 0.6) * f1;
    chip(1400, 265, 760, 58, 'D(p‖q) = D(p‖p*) + D(p*‖q)   for  η_q = 0', C.gold, gq, 22);
    lbl('general positive q :  − η_q (κ − κ*)  ;  Csiszár–Shields information projection', 1400, 318, C.dim, gq, 14);
    const A = [1130, 400], B = [1130, 540], Cc = [1460, 540];
    fillPoly([A, B, Cc], C.gold, gq * 0.08); strokePoly([A, B, Cc], C.dim, gq * 0.5, 1);
    line(A[0], A[1], B[0], B[1], C.mag, gq, 4); line(B[0], B[1], Cc[0], Cc[1], C.cyan, gq, 4); line(A[0], A[1], Cc[0], Cc[1], C.gold, gq, 4);
    rect63(B[0], B[1] - 18, 18, 18, C.white, gq, 1.4);
    dot(A[0], A[1], 11, 'w', gq); dot(B[0], B[1], 11, 'm', gq); dot(Cc[0], Cc[1], 11, 'c', gq);
    lbl('p', A[0] - 22, A[1] + 6, C.white, gq, 20); lbl('p*', B[0] - 30, B[1] + 8, C.mag, gq, 20); lbl('q', Cc[0] + 22, Cc[1] + 8, C.cyan, gq, 20);
    lbl('hidden', A[0] - 14, (A[1] + B[1]) / 2, C.mag, gq, 15, 'right'); lbl('visible', (B[0] + Cc[0]) / 2, B[1] + 28, C.cyan, gq, 15);
    lbl('D(p‖q) = ' + FOUR089.total.toFixed(4), 1340, 455, C.gold, gq, 16, 'left');
    const bq = Q(S, 0, 'one hidden correlation plus three visible', 0.6) * f1;
    const labs = ['R I₀', 'd(Z‖Z′)', 'R d(u‖u′)', 'R d(v‖v′)'], cols = [C.mag, C.cyan, C.cyan, C.cyan];
    FOUR089.terms.forEach((v, i) => { const qq = clamp(bq * 1.5 - i * 0.2), x = 1090 + i * 170, h = v * 1100; fillBox(x, 760 - h, 110, h, cols[i], qq * 0.45); rect63(x, 760 - h, 110, h, cols[i], qq, 1.6); lbl(v.toFixed(4), x + 55, 750 - h, C.white, qq, 15); lbl(labs[i], x + 55, 790, cols[i], qq, 15); });
    lbl('p = (.3, .1, .2, .1, .3) ;  q ∈ E : Z′ = .3 , u′ = .45 , v′ = .55 ;  sum = ' + FOUR089.total.toFixed(4), 1400, 600, C.dim, bq, 14);
  }
  const q = Q(S, 1, 'The quantum version adds a layer', 0.6, 0.3);
  if (q > 0) {
    const L = [['record-basis coherence', 'C_rel(ρ) = H(diag ρ) − S(ρ)', C.cyan], ['plus hidden correlation', 'R I₀(p) = D(p‖p*)', C.mag], ['plus visible mismatch', 'D(p*‖q)', C.gold]];
    L.forEach(([ph, s, col], i) => { const qq = Q(S, 1, ph, 0.6), y = 250 + i * 115; box(150, y, 760, 95, col, qq, 2, 'rgba(0,0,0,0.45)'); lblG(s, 530, y + 45, C.white, qq, 24); lbl(ph.replace('plus ', ''), 530, y + 78, col, qq, 15); });
    const sq = Q(S, 1, 'all non-negative', 0.6);
    chip(530, 640, 860, 62, 'D_Q(ρ‖σ) = C_rel + R I₀ + D(p*‖q) ,   σ = diag q ,  q ∈ E', C.green, sq, 21);
    lbl('recomputed on 200 random 5 × 5 states : largest deviation 2 × 10⁻¹⁵', 530, 700, C.dim, sq, 15);
    const gx = 1240, gy = 250, cw = 64, mq = Q(S, 1, 'so the maximum quantum entropy state', 0.6);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const dg = i === j, al = dg ? 1 : (1 - mq) * (0.35 + 0.35 * rnd(i * 5 + j, 3)); box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, dg ? C.gold : C.cyan, q * (dg ? 1 : Math.max(al, 0.12)), 1.4, dg ? 'rgba(60,45,0,0.5)' : `rgba(0,60,70,${0.5 * al})`); }
    lbl('ρ on H₅ :  diagonal = record probabilities p', gx + 2.5 * cw, gy + 5 * cw + 26, C.dim, q, 15);
    chip(1400, 655, 760, 62, 'S(ρ) ≤ H(diag ρ) ≤ H(p*)  ⇒  ρ* = diag p*', C.gold, mq, 22);
    lbl('coherence term : Baumgratz–Cramer–Plenio , PRL 113 , 140401 (2014)', 1400, 715, C.dim, mq, 14);
  }
};

/* ---- 05 ORTHOGONAL DIRECTIONS AND AREAS (V17 §6–§7) ---- */
SCENES.areas = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'classical'], [1, 'So two posterior means', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Areas add as squares too', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'three readout directions and one interaction direction', 0.6) * f1;
    const nm = ['1', 't_z', 't_x', 't_y', 't_h'], gx = 230, gy = 300, cw = 80;
    nm.forEach((s, i) => { lbl(s, gx - 20, gy + i * cw + 46, i === 4 ? C.mag : C.white, q, 17, 'right'); lbl(s, gx + i * cw + 37, gy - 14, i === 4 ? C.mag : C.white, q, 17); });
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const qq = clamp(q * 1.6 - (i * 5 + j) / 40), dg = i === j; box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, dg ? (i === 4 ? C.mag : C.gold) : C.dim, qq, 1.4, 'rgba(0,0,0,0.45)'); lbl(dg ? '1' : '0', gx + j * cw + 37, gy + i * cw + 46, dg ? C.white : C.dim, qq, 20); }
    lbl('⟨tᵢ , tⱼ⟩ under p*  (recomputed , 100 random laws)', gx + 2.5 * cw - 3, gy + 5 * cw + 30, C.dim, q, 15);
    lbl('t_h = (1 − z)(x − u)(y − v) / √(R u(1 − u) v(1 − v)) : the one direction the means cannot see', 530, 770, C.mag, q, 14);
    const vq = Q(S, 0, 'every variance is a sum of four squares', 0.6) * f1;
    chip(1400, 290, 760, 64, 'Var f = |E f t_z|² + |E f t_x|² + |E f t_y|² + |E f t_h|²', C.gold, vq, 20);
    const pq = Q(S, 0, "the hidden part alone gives Pearson's chi squared", 0.6) * f1;
    chip(1400, 400, 760, 64, 'Σ (p_s − p*_s)² / p*_s  =  δ² / (R u(1 − u) v(1 − v))', C.mag, pq, 21);
    lbl('δ = κ − κ* ,  u = X/R ,  v = Y/R', 1400, 462, C.dim, pq, 15);
    lbl('Fisher metric at δ = 0 :', 1400, 540, C.white, pq, 17);
    lblG('ds² = dZ²/ZR + R du²/u(1−u) + R dv²/v(1−v) + dδ²/(R u(1−u) v(1−v))', 1400, 580, C.white, pq, 17);
    lbl('p ↦ 2√p maps the simplex isometrically onto a sphere of radius 2', 1400, 625, C.dim, pq, 15);
  }
  const q = Q(S, 1, 'Areas add as squares too', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'a covariance determinant is a weighted sum', 0.6);
    chip(530, 265, 860, 60, 'det Cov = (d!)² Σ ( Π pᵢ ) Vol_d(simplex)²', C.gold, cq, 24);
    lbl('Cauchy–Binet on rows √pᵢ (1, vᵢ) ; checked for d = 2 , 3 on 80 random point sets', 530, 322, C.dim, cq, 14);
    chip(530, 400, 860, 58, 'five modes :  det Cov(x, y, z) = Z (p₀p₁p₃ + p₀p₁p₁₃ + p₀p₃p₁₃ + p₁p₃p₁₃)', C.cyan, cq, 17);
    lbl('four base points are coplanar ; the four tetrahedra through v₂ have volume 1/6', 530, 455, C.dim, cq, 14);
    const tq = Q(S, 1, 'need three record outcomes', 0.6);
    chip(530, 545, 860, 58, 'two outcomes :  Cov = q₀ q₁ (u₁ − u₀)(v₁ − v₀)  ⇒  one mean stays', C.red, tq, 19);
    const sq = Q(S, 1, 'and three suffice', 0.6);
    chip(530, 630, 860, 58, 'three outcomes :  det Cov_q(u, v) = 4 q₀q₁q₂ A² = 1/432', C.green, sq, 21);
    lbl('q = (1/3, 1/3, 1/3) ;  Var u = 1/24 ,  Var v = 1/18 ,  Cov(u, v) = 0', 530, 690, C.white, sq, 16);
    const px = 1100, py = 760, pw = 420, xS = v => px + v * pw, yS = v => py - v * pw;
    plotAxes(px, py, pw, pw, tq, 'posterior u', 'posterior v');
    rect63(px, py - pw, pw, pw, C.dim, tq * 0.6, 1);
    const pts = REC089.map(p => [xS(p[0]), yS(p[1])]);
    fillPoly(pts, C.green, sq * 0.25); strokePoly(pts, C.green, sq, 3);
    REC089.forEach((p, i) => { dot(xS(p[0]), yS(p[1]), 12, 'n', tq); lbl('(' + ['1/4, 2/3', '1/2, 1/6', '3/4, 2/3'][i] + ')', xS(p[0]), yS(p[1]) + (i === 1 ? 36 : -20), C.white, tq, 15); });
    dot(xS(0.5), yS(0.5), 10, 'g', sq); lbl('mean (1/2, 1/2)', xS(0.5), yS(0.5) - 18, C.gold, sq, 15);
    lbl('area 1/8', xS(0.5), yS(0.42) + 6, C.green, sq, 18);
    stamp('THREE RECORDS SUFFICE', 1310, 268, sq, C.green, 24, -0.03);
  }
};

/* ---- 06 LOG RATIO AND PHASE (V17 §9, §11) ---- */
SCENES.core = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The ends are separable only when', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With complex amplitudes', 0.6) * f1;
    const cells = [[0, 0, 'α₀', 0.2], [0, 1, 'α₃', 1.1], [1, 0, 'α₁', 2.3], [1, 1, 'α₁₃', 3.7]];
    lbl('M = conditional amplitude table (middle empty)', 530, 262, C.dim, q, 16);
    cells.forEach(([i, j, s, ph]) => { const x = 330 + j * 210, y = 290 + i * 180, an = ph + t * (0.35 + 0.1 * i + 0.07 * j); box(x, y, 190, 165, C.cyan, q, 2, 'rgba(0,30,40,0.4)'); ring(x + 95, y + 75, 50, C.dim, q, 1.4); arrow(x + 95, y + 75, x + 95 + 48 * Math.cos(an), y + 75 - 48 * Math.sin(an), C.gold, q, 3); lblG(s, x + 95, y + 152, C.white, q, 20); });
    lbl('rows : left end 0 / 1     columns : right end 0 / 1', 530, 670, C.dim, q, 14);
    const oq = Q(S, 0, 'the four-corner ratio Omega', 0.6) * f1;
    chip(530, 730, 860, 58, 'Ω = α₀ α₁₃ / (α₁ α₃) ,   log Ω = η/2 + iΦ', C.gold, oq, 24);
    const cq = Q(S, 0, 'C squared is proportional to', 0.6) * f1;
    chip(1400, 265, 760, 60, 'C² = 16 √(p₀p₁p₃p₁₃) / R² · [ sinh²(η/4) + sin²(Φ/2) ]', C.mag, cq, 19);
    lbl('|det M|² = (s − t)² + 4 st sin²(Φ/2) ,  s = √(p₀p₁₃) ,  t = √(p₁p₃)', 1400, 322, C.dim, cq, 15);
    const eta = 2.4 * Math.sin(t * 0.4), Ph = Math.PI * (0.55 + 0.4 * Math.sin(t * 0.3 + 1)), a1 = Math.sinh(Math.abs(eta) / 4), b1 = Math.abs(Math.sin(Ph / 2)), sc = 300;
    const O = [1180, 740], A = [1180 + a1 * sc, 740], B = [1180 + a1 * sc, 740 - b1 * sc];
    line(O[0], O[1], A[0], A[1], C.cyan, cq, 5); line(A[0], A[1], B[0], B[1], C.mag, cq, 5); line(O[0], O[1], B[0], B[1], C.gold, cq, 4);
    rect63(A[0] - 18, A[1] - 18, 18, 18, C.white, cq, 1.4);
    lbl('sinh(η/4) = ' + (eta >= 0 ? '' : '−') + a1.toFixed(2), (O[0] + A[0]) / 2, O[1] + 30, C.cyan, cq, 16);
    lbl('sin(Φ/2) = ' + b1.toFixed(2), A[0] + 16, (A[1] + B[1]) / 2, C.mag, cq, 16, 'left');
    lbl('|sinh(½ log Ω)|', (O[0] + B[0]) / 2 - 20, (O[1] + B[1]) / 2 - 14, C.gold, cq, 17, 'right');
    lbl('η = ' + eta.toFixed(2) + ' ,  Φ = ' + (Ph / Math.PI).toFixed(2) + 'π', 1760, 420, C.white, cq, 16, 'right');
    lbl('|sinh(a + ib)|² = sinh² a + sin² b', 1760, 455, C.dim, cq, 15, 'right');
  }
  const q = Q(S, 1, 'The ends are separable only when', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 860, 60, 'separable  ⇔  det M = 0  ⇔  κ = XY/R  and  Φ = 0', C.gold, q, 23);
    const bq = Q(S, 1, 'C squared plus Bloch length squared is one', 0.6);
    chip(530, 350, 860, 60, 'ρ_A = MM†/R = (I + r·σ)/2 :   C² + ‖r‖² = 1', C.cyan, bq, 23);
    lbl('Wootters : pure-state concurrence C = 2|det M| / R', 530, 405, C.dim, bq, 15);
    const sq = Q(S, 1, 'Two states with all probabilities one fifth', 0.6);
    chip(530, 480, 860, 56, 'Ψ₊ = (|000⟩ + |100⟩ + |010⟩ + |001⟩ + |101⟩)/√5 :  C = 0', C.green, sq, 18);
    chip(530, 555, 860, 56, 'Ψ₋ = (|000⟩ + |100⟩ + |010⟩ + |001⟩ − |101⟩)/√5 :  C = 1', C.mag, sq, 18);
    lbl('same p_s = 1/5 ,  X = Y = 2/5 ,  Z = 1/5 ,  η = 0 ;  only Φ = 0 or π differs', 530, 610, C.white, sq, 15);
    const rq = Q(S, 1, 'product versus maximally entangled', 0.6);
    lbl('diagonal record :  Ω′ = Ω · m₀m₁₃ / (m₁m₃) ;  Bayes :  η′ = η + log(ℓ₀ℓ₁₃ / ℓ₁ℓ₃)', 530, 680, C.dim, rq, 14);
    const px = 1060, py = 760, pw = 680, ph = 360, xS = v => px + v / (2 * Math.PI) * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, bq, '', '');
    lbl('Φ   (η = 0 , every |α_s|² = 1/5)', px + pw, py + 56, C.dim, bq, 16, 'right');
    curve(p => { const r = C2PHI089[Math.round(p * (C2PHI089.length - 1))]; return [xS(r[0]), yS(r[1])]; }, C2PHI089.length - 1, C.mag, bq, 3);
    ctx.save(); ctx.setLineDash([8, 7]); curve(p => { const r = C2PHI089[Math.round(p * (C2PHI089.length - 1))]; return [xS(r[0]), yS(1 - r[1])]; }, C2PHI089.length - 1, C.cyan, bq, 2.5); ctx.restore();
    lbl('C² = sin²(Φ/2)', xS(Math.PI) + 14, yS(1) - 10, C.mag, bq, 16, 'left'); lbl('‖r‖² = 1 − C²', xS(Math.PI) + 14, yS(0) - 14, C.cyan, bq, 16, 'left');
    ['0', 'π', '2π'].forEach((s, i) => lbl(s, xS(i * Math.PI), py + 26, C.dim, bq, 15));
    dot(xS(0), yS(0), 12, 'n', sq); lbl('Ψ₊', xS(0) + 18, yS(0) - 12, C.green, sq, 18, 'left');
    dot(xS(Math.PI), yS(1), 12, 'm', sq); lbl('Ψ₋', xS(Math.PI) - 18, yS(1) - 12, C.mag, sq, 18, 'right');
  }
};

/* ---- 07 GOLDEN GATE (V17 §12–§13) ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [0, 'Projection gates with overlap lambda', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'So lambda is at least one quarter', 0.6);
  const a = 1 / PHI089, b = Math.pow(PHI089, -0.5);
  if (f1 > 0) {
    const q = Q(S, 0, 'tau times tau equals one plus tau', 0.6) * f1;
    chip(530, 265, 860, 60, 'τ ⊗ τ = 1 ⊕ τ   →   d² = 1 + d   →   d = φ = 1.618', C.gold, q, 23);
    lbl('d adds on ⊕ and multiplies on ⊗ ,  d(1) = 1 ;  Fibonacci fusion (Hadjiivanov–Georgiev)', 530, 322, C.dim, q, 14);
    const tq = Q(S, 0, 'one over phi squared plus one over phi is one', 0.6) * f1, sc = 360;
    const A = [180, 760], B = [180 + a * sc, 760], Cc = [180 + a * sc, 760 - b * sc];
    fillPoly([A, B, Cc], C.gold, tq * 0.15); line(A[0], A[1], B[0], B[1], C.cyan, tq, 4); line(B[0], B[1], Cc[0], Cc[1], C.mag, tq, 4); line(A[0], A[1], Cc[0], Cc[1], C.gold, tq, 4);
    rect63(B[0] - 20, B[1] - 20, 20, 20, C.white, tq, 1.4);
    lbl('a = φ⁻¹ = ' + a.toFixed(3), (A[0] + B[0]) / 2, A[1] + 30, C.cyan, tq, 15); lbl('b = φ^(−1/2) = ' + b.toFixed(3), B[0] + 12, (B[1] + Cc[1]) / 2, C.mag, tq, 15, 'left'); lbl('1', (A[0] + Cc[0]) / 2 - 18, (A[1] + Cc[1]) / 2 - 8, C.gold, tq, 22);
    chip(700, 420, 460, 56, 'a² + b² = 1/φ² + 1/φ = 1', C.gold, tq, 22);
    lbl('F =', 625, 604, C.white, tq, 20, 'right');
    mgrid(640, 540, [['a', 'b'], ['b', '−a']], 90, 56, tq, { size: 22, colf: () => C.cyan });
    lbl('F = Fᵀ ,  F² = I ,  det F = −1', 730, 690, C.white, tq, 16);
    const gq = Q(S, 0, 'Projection gates with overlap lambda', 0.6) * f1;
    chip(1400, 265, 760, 60, 'G_P G_Q G_P = G_Q G_P G_Q  ⇔  4λ sin²(θ/2) = 1', C.green, gq, 22);
    lbl('G = I + (z − 1)P ,  PQP = λP ,  QPQ = λQ ,  z = e^(iθ) ;  z + λ(z − 1)² = 0', 1400, 322, C.dim, gq, 14);
    const px = 1080, py = 760, pw = 660, ph = 340, xS = l => px + l * pw, yS = d => py - (d - 40) / 150 * ph;
    plotAxes(px, py, pw, ph, gq, '', 'phase θ (degrees)');
    lbl('overlap λ', px + pw, py + 56, C.dim, gq, 16, 'right');
    fillBox(px, py - ph, 0.25 * pw, ph, C.red, gq * 0.12); lbl('λ < 1/4 : none', px + 0.125 * pw, py - ph * 0.5, C.red, gq, 15);
    fpath089(BRAID089.map(r => [xS(r[0]), yS(r[1])]), C.green, gq, 3);
    [60, 108, 180].forEach(d => lbl(String(d), px - 10, yS(d) + 5, C.dim, gq, 14, 'right'));
    ['0.25', '0.5', '1'].forEach(s => lbl(s, xS(+s), py + 26, C.dim, gq, 14));
    const lq = Q(S, 0, 'braid exactly when four lambda', 0.6) * f1;
    dot(xS(1 / (PHI089 * PHI089)), yS(108), 13, 'g', lq); lbl('λ = φ⁻² , θ = 108°', xS(0.382) + 18, yS(108) - 14, C.gold, lq, 17, 'left');
  }
  const q = Q(S, 1, 'So lambda is at least one quarter', 0.6, 0.3);
  if (q > 0) {
    const cx = 330, cy = 470, r = 150;
    circ089(cx, cy, r, q);
    const zq = Q(S, 1, 'the phase is e to the three pi i over five', 0.6);
    spt089(cx, cy, r, 108, C.gold, 'g', zq, 'ζ', -10, -22); spt089(cx, cy, r, -108, C.gold, 'g', zq, 'ζ̄', -10, 40);
    lbl('108°', cx - 40, cy - 50, C.gold, zq, 15);
    chip(780, 360, 420, 56, 'z = e^(±3πi/5)', C.gold, zq, 24); lbl('2 cos(3π/5) = −1/φ', 780, 415, C.dim, zq, 15);
    const tq = Q(S, 1, 'keeping a state with weight one over phi squared', 0.6);
    lbl('T = |G_Q|² :', 600, 520, C.white, tq, 18, 'left');
    mgrid(600, 545, [['0.382', '0.618'], ['0.618', '0.382']], 110, 56, tq, { size: 20, colf: (v, i, j) => i === j ? C.cyan : C.mag });
    lbl('= ( φ⁻² , φ⁻¹ ; φ⁻¹ , φ⁻² ) :  keep φ⁻² ,  flip φ⁻¹', 710, 690, C.white, tq, 15);
    const kq = Q(S, 1, 'The gate returns at power ten', 0.6);
    const px = 1080, py = 760, pw = 660, ph = 330, xS = m => px + m / 12 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, tq, '', 'keep probability of |000⟩');
    lbl('step m', px + pw, py + 56, C.dim, tq, 16, 'right');
    dashed(px, yS(0.5), px + pw, yS(0.5), C.dim, tq * 0.6, 1.2);
    KM089.forEach((v, m) => { const qq = clamp(kq * 1.6 - m / 16); line(xS(m), yS(0), xS(m), yS(v), C.gold, qq * 0.6, 2); dot(xS(m), yS(v), 8, 'g', qq); lbl(String(m), xS(m), py + 24, C.dim, tq, 13); });
    dot(xS(10), yS(1), 14, 'g', kq);
    lbl('gold : coherent |Kᵐ₀₀|² ,  K¹⁰ = I', 1090, 350, C.gold, kq, 16, 'left');
    const rq = Q(S, 1, 'recorded each step, it relaxes to uniform', 0.6);
    fpath089(TM089.map((v, m) => [xS(m), yS(v)]), C.cyan, rq, 3); TM089.forEach((v, m) => dot(xS(m), yS(v), 6, 'c', rq));
    lbl('cyan : recorded Tᵐ₀₀ → 1/2 ,  r = 2 − √5 = −φ⁻³', 1090, 378, C.cyan, rq, 16, 'left');
    lbl('K = ζ[I + (ζ − 1)P] ,  Kᵐ = ζᵐ (I − P) + ζ²ᵐ P', 1410, 300, C.dim, kq, 15);
  }
};

/* ---- 08 TRIANGULATION AND COLLAPSE (V18 §2–§4) ---- */
SCENES.collapse = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'An instrument can', 0.6);
  const sqv = (cx, cy, h) => ({ 0: [cx - h, cy + h], 1: [cx + h, cy + h], 13: [cx + h, cy - h], 3: [cx - h, cy - h] });
  if (f1 > 0) {
    const q = Q(S, 0, 'returns to the segment', 0.6) * f1;
    [[300, C.gold, [0, 13], [[0, 1, 13], [0, 13, 3]], 'diagonal zero to thirteen', 'κ₊ = min(X, Y)'], [720, C.red, [1, 3], [[0, 1, 3], [1, 13, 3]], 'the other to the lower', 'κ₋ = max(0, X + Y − R)']].forEach(([cx, col, dg, tris, ph, lab]) => {
      const P = sqv(cx, 420, 115), qq = Q(S, 0, ph, 0.6) * f1;
      strokePoly([P[0], P[1], P[13], P[3]], C.cyan, q, 2);
      tris.forEach((tr, k) => fillPoly(tr.map(i => P[i]), col, qq * (k ? 0.12 : 0.24)));
      line(P[dg[0]][0], P[dg[0]][1], P[dg[1]][0], P[dg[1]][1], col, qq, 4);
      [[0, '000'], [1, '100'], [13, '101'], [3, '001']].forEach(([k, s]) => { dot(P[k][0], P[k][1], 11, k === 13 ? 'n' : k === 1 ? 'c' : k === 3 ? 'm' : 'w', q); lbl(s, P[k][0] + (k === 1 || k === 13 ? 16 : -16), P[k][1] + (k === 0 || k === 1 ? 30 : -16), C.white, q, 15, k === 1 || k === 13 ? 'left' : 'right'); });
      lbl(lab, cx, 590, col, qq, 18);
    });
    lbl('cone each base triangle to v₂ ; barycentric completion inside each tetrahedron', 510, 260, C.dim, q, 15);
    const sx = k => 180 + k * 660, sy = 680;
    line(sx(0), sy, sx(1), sy, C.cyan, q, 4); dot(sx(0), sy, 12, 'r', Q(S, 0, 'the other to the lower', 0.6) * f1); dot(sx(1), sy, 12, 'g', Q(S, 0, 'diagonal zero to thirteen', 0.6) * f1);
    lbl('fiber of p with the same three means', sx(0.5), sy + 34, C.dim, q, 15);
    const nq = Q(S, 0, 'The rule is not affine', 0.6) * f1;
    chip(1400, 265, 760, 58, 'δ₁ ↦ δ₁ ,  δ₃ ↦ δ₃ ,  ½(δ₁ + δ₃) ↦ ½(δ₀ + δ₁₃)', C.gold, nq, 20);
    lbl('the lower rule likewise sends ½(δ₀ + δ₁₃) to ½(δ₁ + δ₃)', 1400, 320, C.dim, nq, 15);
    stamp('NOT AFFINE : NO FIXED CHANNEL', 1400, 395, Q(S, 0, 'so no fixed channel performs it', 0.6) * f1, C.red, 24, -0.03);
    const cq = Q(S, 0, 'channels keeping all three readouts', 0.6) * f1;
    chip(1400, 490, 760, 60, 'Λ†(N_a) = N_a for all inputs  ⇔  Λ(ρ) = C ⊙ ρ', C.cyan, cq, 21);
    lbl('C ≥ 0 ,  C_ss = 1 :  every p_s , hence κ , is kept', 1400, 545, C.white, cq, 16);
    const pq = Q(S, 0, 'only change phases', 0.6) * f1;
    lbl('diagonal phase gate :  Ω′ = e^(i(χ₀ + χ₁₃ − χ₁ − χ₃)) Ω ,  |Ω| unchanged', 1400, 610, C.mag, pq, 16);
    lbl('near-stable :  ‖Λ†(NₓN_y) − NₓN_y‖ ≤ √εₓ + √ε_y', 1400, 660, C.dim, pq, 15);
    lbl('300 random channels : largest ratio ' + NUM089.robust.toFixed(2), 1400, 690, C.dim, pq, 14);
  }
  const q = Q(S, 1, 'An instrument can', 0.6, 0.3);
  if (q > 0) {
    const kq = Q(S, 1, 'two diagonal Kraus operators return the two endpoints', 0.6);
    chip(530, 265, 860, 60, 'w₊ = (κ − κ₋)/(κ₊ − κ₋) ,   (M±)_ss = √( w± p±,s / p_s )', C.gold, kq, 20);
    lbl('calibrated to the given source p ; M₊†M₊ + M₋†M₋ = I', 530, 322, C.dim, kq, 15);
    const rows = [['source p_s = 1/5', [0.2, 0.2, 0.2, 0.2, 0.2], C.white], ['outcome + , prob 1/2', [0.4, 0, 0.2, 0, 0.4], C.gold], ['outcome − , prob 1/2', [0, 0.4, 0.2, 0.4, 0], C.red]];
    rows.forEach(([lab, v, col], j) => { const qq = j ? Q(S, 1, 'each keeping the three means', 0.6) : kq, y0 = 470 + j * 125; v.forEach((x, i) => { const h = x * 230; fillBox(200 + i * 95, y0 - h, 60, h, col, qq * 0.45); rect63(200 + i * 95, y0 - h, 60, h, col, qq, 1.5); line(196 + i * 95, y0, 264 + i * 95, y0, C.dim, qq, 1); }); lbl(lab, 690, y0 - 18, col, qq, 16, 'left'); });
    ['000', '100', '010', '001', '101'].forEach((s, i) => lbl(s, 230 + i * 95, 745, C.dim, kq, 14));
    lbl('M₊ = diag(1, 0, 1/√2, 0, 1) ,  M₋ = diag(0, 1, 1/√2, 1, 0) ;  both keep (X, Y, Z) = (2/5, 2/5, 1/5)', 530, 785, C.dim, Q(S, 1, 'each keeping the three means', 0.6), 13);
    const bq = Q(S, 1, 'on the balanced base', 0.6);
    chip(1400, 265, 760, 58, 'E = |000⟩⟨000| + |101⟩⟨101| ,  O = I − E', C.cyan, bq, 21);
    lbl('balanced base Z = 0 , X = Y = 1/2 :  p|E = κ₊ end ,  p|O = κ₋ end', 1400, 322, C.white, bq, 15);
    const px = 1100, py = 720, pw = 600, ph = 300, xS = k => px + k / 0.5 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, bq, '', 'Pr(E)');
    lbl('κ', px + pw + 22, py + 6, C.dim, bq, 18, 'left');
    const pq = Q(S, 1, 'with probability two kappa', 0.6);
    fpath089(PAR089.map(r => [xS(r[0]), yS(r[1])]), C.green, pq, 3); PAR089.forEach(r => dot(xS(r[0]), yS(r[1]), 6, 'n', pq));
    lbl('Pr(E) = 2κ', xS(0.3), yS(0.6) - 20, C.green, pq, 18, 'right'); ['0', '1/4', '1/2'].forEach((s, i) => lbl(s, xS(i * 0.25), py + 26, C.dim, bq, 14));
    lbl('on |+⟩|+⟩ the same test gives Bell states (|00⟩ + |11⟩)/√2 or (|10⟩ + |01⟩)/√2', 1400, 770, C.dim, pq, 14);
  }
};

/* ---- 09 PHASES BECOME GATES (V18 §5–§6) ---- */
SCENES.lifts = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'A golden block still squares', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'A phase lifts two ways', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'giving each edge of a kernel its own unitary', 0.6) * f1;
    chip(530, 265, 860, 58, 'V(|i⟩ ⊗ ψ) = Σ_j √T_ji |j⟩ ⊗ U_ji ψ ⊗ e_ji', C.cyan, q, 22);
    const I = [[230, 420], [230, 560]], J = [[760, 370], [760, 490], [760, 610]];
    I.forEach((p, i) => J.forEach((r, j) => line(p[0] + 22, p[1], r[0] - 22, r[1], i ? C.mag : C.gold, q * 0.75, 2)));
    I.forEach((p, i) => { ring(p[0], p[1], 22, C.white, q, 2); lbl(i ? 'k' : 'i', p[0], p[1] + 7, C.white, q, 18); });
    J.forEach((p, j) => { ring(p[0], p[1], 22, C.white, q, 2); lbl('j' + (j + 1), p[0], p[1] + 7, C.white, q, 16); });
    lbl('edge :  √T_ji · U_ji · e_ji', 495, 360, C.dim, q, 15);
    const xq = Q(S, 0, 'cross-column condition', 0.6) * f1;
    chip(530, 690, 860, 60, 'Σ_j √(T_ji T_jk) ⟨e_ji , e_jk⟩ U_ji† U_jk = δ_ik I', C.gold, xq, 22);
    lbl('i = k : columns normalised ;  i ≠ k : the condition column sums never test', 530, 745, C.dim, xq, 15);
    const gq = Q(S, 0, 'A golden block still squares', 0.6) * f1;
    const bx = 1180, by = 270, bw = 210;
    [['a I', C.cyan], ['b W', C.gold], ['b W†', C.gold], ['−a I', C.cyan]].forEach(([s, col], k) => cell089(bx + (k % 2) * bw, by + Math.floor(k / 2) * 120, bw - 10, 110, s, col, gq, 28));
    lbl('F_W', bx - 30, by + 125, C.white, gq, 22, 'right');
    chip(1400, 540, 760, 58, 'F_W† = F_W ,  F_W² = I ,  a = φ⁻¹ ,  b = φ^(−1/2)', C.gold, gq, 21);
    lbl('|c| < 1 alone is no unitary :  (cI)†(cI) = |c|² I', 1400, 600, C.dim, gq, 15);
    lbl('contraction A :  J(A) = ( A , (I − AA†)^½ ; (I − A†A)^½ , −A† ) unitary (Halmos)', 1400, 640, C.dim, gq, 14);
  }
  const q = Q(S, 1, 'A phase lifts two ways', 0.6, 0.3);
  if (q > 0) {
    const L = [['controlled, W only on P', 'C_P(W) = (I − P) ⊗ I + P ⊗ W', [['I − P', 'I'], ['P', 'W']], C.green], ['or whole, W off P and W squared on P', 'L_P(W) = (I − P) ⊗ W + P ⊗ W²', [['I − P', 'W'], ['P', 'W²']], C.gold]];
    L.forEach(([ph, s, cells, col], j) => { const qq = Q(S, 1, ph, 0.6), y = 260 + j * 250; chip(530, y, 860, 56, s, col, qq, 22); cells.forEach(([a1, b1], k) => { box(200 + k * 330, y + 50, 300, 130, col, qq, 2, 'rgba(0,0,0,0.45)'); lbl('sector ' + a1, 350 + k * 330, y + 90, C.dim, qq, 16); lblG(b1, 350 + k * 330, y + 150, C.white, qq, 30); }); });
    const uq = Q(S, 1, 'Only the controlled lift', 0.6);
    lbl('both unitary ;  C_P(W)ᵐ = C_P(Wᵐ) ,  L_P(W)ᵐ = L_P(Wᵐ)', 530, 775, C.white, uq, 16);
    const cq = Q(S, 1, 'Only the controlled lift composes for every pair', 0.6);
    chip(1400, 265, 760, 58, 'C_P(UV) = C_P(U) C_P(V)   for all U , V', C.green, cq, 22);
    chip(1400, 345, 760, 58, 'L_P(UV) = L_P(U) L_P(V)   ⇔   UV = VU', C.red, cq, 22);
    lbl('Pauli X , Z :  ‖L_P(XZ) − L_P(X) L_P(Z)‖ = ' + NUM089.lgap.toFixed(0) + '   (recomputed)', 1400, 405, C.dim, cq, 15);
    const pq = Q(S, 1, 'a global phase of W becomes a visible relative phase', 0.6);
    chip(1400, 500, 760, 58, 'C_P(e^(iχ)W) = [(I − P + e^(iχ)P) ⊗ I] C_P(W)', C.mag, pq, 20);
    lbl('L_P(e^(iχ)W) picks up the same controlled factor , times e^(iχ)', 1400, 555, C.dim, pq, 15);
    stamp('GLOBAL PHASE → RELATIVE PHASE', 1400, 650, pq, C.mag, 24, -0.03);
    lbl('a lift needs a given W with its phase convention (unknown gates cannot be controlled : Araújo et al.)', 1400, 740, C.dim, pq, 13);
  }
};

/* ---- 10 WHICH GATES BRAID (V18 §7) ---- */
SCENES.braid = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const cx = 470, cy = 500, r = 190;
  const q0 = Q(S, 0, 'Which inner gates keep the braid', 0.6);
  circ089(cx, cy, r, q0);
  const aq = Q(S, 0, 'every eigenvalue is one, zeta or zeta bar', 0.6);
  spt089(cx, cy, r, 0, C.green, 'n', aq, '1', 22, -16); spt089(cx, cy, r, ZD089, C.gold, 'g', aq, 'ζ', -12, -24); spt089(cx, cy, r, -ZD089, C.gold, 'g', aq, 'ζ̄', -14, 44);
  lbl('allowed : {1 , ζ , ζ̄} ,  ζ = e^(3πi/5)', cx, cy + r + 70, C.gold, aq, 18);
  const nq = Q(S, 1, 'its eigenvalue zeta squared is not allowed', 0.6);
  if (nq > 0) { const p = cpt089(cx, cy, r, 2 * ZD089); dot(p[0], p[1], 14, 'r', nq); line(p[0] - 16, p[1] - 16, p[0] + 16, p[1] + 16, C.red, nq, 3); line(p[0] - 16, p[1] + 16, p[0] + 16, p[1] - 16, C.red, nq, 3); lblG('ζ²', p[0] - 30, p[1] + 8, C.red, nq, 24, 'right'); }
  const f1 = 1 - Q(S, 1, 'So the whole golden gate cannot be substituted', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With a shared operator W', 0.6) * f1;
    chip(1400, 265, 760, 58, 'C_P(W) C_Q(W) C_P(W) = C_Q(W) C_P(W) C_Q(W)', C.cyan, q, 21);
    lbl('P ≠ Q nonzero projections ,  PQP = λP ,  QPQ = λQ ,  0 < λ < 1', 1400, 320, C.dim, q, 15);
    const bq = Q(S, 0, 'it holds exactly when W minus I', 0.6) * f1;
    chip(1400, 400, 760, 62, '⇔   (W − I) [ W + λ (W − I)² ] = 0', C.gold, bq, 26);
    lbl('difference of the two sides = (P − Q) ⊗ (A + A² + λA³) ,  A = W − I', 1400, 458, C.dim, bq, 15);
    lbl('same condition with every C replaced by L', 1400, 490, C.dim, bq, 15);
    chip(1400, 580, 760, 62, 'λ = φ⁻² :   spec W ⊆ {1 , ζ , ζ̄}', C.green, aq * f1, 26);
    lbl('nonscalar W allowed : a direct sum of trivial braid and the two chiral phases', 1400, 640, C.dim, aq * f1, 15);
    lbl('recomputed : spectra {1, ζ, ζ̄} , {ζ, ζ̄} braid ;  {ζ, ζ²} , {1, −1} , {ζ, i} do not', 1400, 680, C.dim, aq * f1, 14);
  }
  const q = Q(S, 1, 'So the whole golden gate cannot be substituted', 0.6, 0.3);
  if (q > 0) {
    chip(1400, 265, 760, 58, 'K = ζ (I − R₀) + ζ² R₀ :  spec K = {ζ , ζ²}', C.gold, q, 22);
    chip(1400, 340, 760, 58, 'ζ² ∉ {1 , ζ , ζ̄}  ⇒  K as parameter breaks the braid', C.red, nq, 21);
    const lq = Q(S, 1, 'though the lift stays unitary', 0.6);
    lbl('yet L_P(K) is unitary and L_P(K)¹⁰ = I ;  braid defect ' + NUM089.bfail.toFixed(2) + ' (recomputed)', 1400, 398, C.white, lq, 15);
    stamp('SELF-SUBSTITUTION BREAKS THE BRAID', 1400, 460, lq, C.red, 22, -0.03);
    const rq = Q(S, 1, 'The controlled recursion closes', 0.6);
    chip(1400, 560, 760, 62, 'W₀ = ζ ,  Wₙ = C_Pₙ(Wₙ₋₁) = I + (ζ − 1) Eₙ', C.green, rq, 22);
    const eq = Q(S, 1, 'times all control projections', 0.6);
    lbl('Eₙ = Pₙ ⊗ ⋯ ⊗ P₁ :  phase only when every control holds', 1400, 620, C.white, eq, 16);
    lbl('spec Wₙ ⊆ {1 , ζ} at every level ;  W_χ = ζ(I − R₀) + ζ̄ R₀ = ζ³ K⁸', 1400, 660, C.dim, eq, 15);
  }
};

/* ---- 11 SPECTRAL HULL (V18 §8) ---- */
SCENES.hull = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const cx = 1400, cy = 520, r = 200;
  const q0 = Q(S, 0, 'When does an inner gate become a record', 0.6);
  circ089(cx, cy, r, q0);
  const f1 = 1 - Q(S, 1, 'No two of one, zeta and zeta bar are opposite', 0.6);
  const hq = Q(S, 0, 'zero lies in the convex hull of the spectrum', 0.6);
  if (f1 > 0) {
    const nq = q0 * f1;
    const A = spt089(cx, cy, r, ZD089, C.gold, 'g', nq, 'ζ', -12, -24), B = spt089(cx, cy, r, 2 * ZD089, C.gold, 'g', nq, 'ζ²', -40, 10);
    if (A && B) { line(A[0], A[1], B[0], B[1], C.gold, nq, 4); const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]; dashed(cx, cy, M[0], M[1], C.red, hq * f1, 2); lbl('|m| ≥ cos(3π/10) = 0.588', cx + 20, cy + r + 60, C.red, hq * f1, 17); }
    lbl('native pair {ζ , ζ²} : the chord misses 0', cx, cy - r - 60, C.gold, nq, 17);
    const q = Q(S, 0, 'multiplies the parent', 0.6) * f1;
    lbl('parent ρ after tracing out the inner system', 530, 258, C.dim, q, 16);
    const mm = 0.55 + 0.45 * Math.cos(t * 0.8);
    [['(I−P)ρ(I−P)', 1, C.cyan], ['m̄ (I−P)ρP', mm, C.mag], ['m Pρ(I−P)', mm, C.mag], ['PρP', 1, C.cyan]].forEach(([s, al, col], k) => { const x = 170 + (k % 2) * 370, y = 290 + Math.floor(k / 2) * 150; box(x, y, 350, 130, col, q * Math.max(al, 0.15), 2, `rgba(0,0,0,0.45)`); fillBox(x, y, 350, 130, col, q * 0.18 * al); lblG(s, x + 175, y + 75, C.white, q * Math.max(al, 0.3), 22); });
    lbl('|m| = ' + mm.toFixed(2), 530, 615, C.mag, q, 17);
    const mq = Q(S, 0, 'the trace of sigma W', 0.6) * f1;
    chip(530, 680, 860, 58, 'm = Tr(σW) ,   1 = |m|² + Tr[ σ (W − m)†(W − m) ]', C.gold, mq, 21);
    chip(530, 760, 860, 54, 'm = 0 for some σ  ⇔  0 ∈ conv spec W', C.green, hq * f1, 22);
  }
  const q = Q(S, 1, 'No two of one, zeta and zeta bar are opposite', 0.6, 0.3);
  if (q > 0) {
    const P1 = spt089(cx, cy, r, 0, C.green, 'n', q, '1', 22, -16), P2 = spt089(cx, cy, r, ZD089, C.gold, 'g', q, 'ζ', -12, -24), P3 = spt089(cx, cy, r, -ZD089, C.gold, 'g', q, 'ζ̄', -14, 44);
    const wq = Q(S, 1, 'with unique weights one over phi cubed', 0.6);
    if (P1) { fillPoly([P1, P2, P3], C.green, q * 0.18); strokePoly([P1, P2, P3], C.green, q, 3); }
    dot(cx, cy, 9, 'n', wq);
    lbl('φ⁻³ = 0.236', P1[0] - 20, P1[1] + 36, C.green, wq, 16, 'right'); lbl('φ⁻² = 0.382', P2[0] + 18, P2[1] - 6, C.gold, wq, 16, 'left'); lbl('φ⁻² = 0.382', P3[0] + 18, P3[1] + 14, C.gold, wq, 16, 'left');
    lbl('allowed triple surrounds 0 : a three-level pointer records', cx, cy - r - 60, C.green, q, 17);
    chip(530, 265, 860, 58, 'golden record : q₁ = φ⁻³ ,  q_ζ = q_ζ̄ = φ⁻² ,  dimension 3', C.green, wq, 21);
    const tq = Q(S, 1, 'one coupling records only for lambda', 0.6);
    const px = 170, py = 720, pw = 720, ph = 340, xS = l => px + (l - 0.25) / 0.25 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, tq, '', 'zero-moment weights');
    lbl('λ', px + pw + 22, py + 6, C.dim, tq, 18, 'left');
    const cols = [C.green, C.gold];
    fpath089(THR089.map(rw => [xS(rw[0]), yS(rw[1])]), C.green, tq, 3); fpath089(THR089.map(rw => [xS(rw[0]), yS(rw[2])]), C.gold, tq, 3);
    lbl('q₁ = 1 − 2λ', xS(0.27), yS(0.5) - 10, C.green, tq, 16, 'left'); lbl('q± = λ', xS(0.47), yS(0.47) - 14, C.gold, tq, 16, 'right');
    const gl = 1 / (PHI089 * PHI089); dashed(xS(gl), py, xS(gl), py - ph, C.white, tq, 1.6); lbl('golden φ⁻²', xS(gl) + 8, py - ph + 16, C.white, tq, 15, 'left');
    ['1/4', '3/8', '1/2'].forEach((s, i) => lbl(s, xS(0.25 + i * 0.125), py + 26, C.dim, tq, 14));
    lbl('λ < 1/4 : no braid phase ;  λ > 1/2 : every allowed point has Re > 0', 530, 780, C.dim, tq, 14);
    lbl('ends : dimension 2 ({1, −1} at 1/4 ; {±i} at 1/2) ;  inside : 3', 530, 810, C.dim, tq, 14);
  }
};

/* ---- 12 RESOLVE AND RETURN (V18 §9–§10) ---- */
SCENES.revival = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const px = 1060, py = 760, pw = 700, ph = 305, xS = n => px + n / 20 * pw, yS = v => py - v * ph;
  const rq = Q(S, 0, 'reusing one record gives', 0.6);
  chip(1400, 265, 760, 58, 'mₙ = ⟨χ, Wⁿ χ⟩ = (ζⁿ + ζ²ⁿ)/2', C.gold, rq, 24);
  lbl('same inner system reused n times , W = ζ(I − R₀) + ζ² R₀ , χ = equal superposition', 1400, 320, C.dim, rq, 14);
  plotAxes(px, py, pw, ph, rq, '', '|mₙ|');
  lbl('n', px + pw + 22, py + 6, C.dim, rq, 18, 'left');
  const zq = Q(S, 1, 'At the fifth use it is zero', 0.6), oq = Q(S, 1, 'at the tenth it is one', 0.6);
  REV089.forEach((v, n) => { const qq = clamp(rq * 1.6 - n / 24), z = v < 1e-9, o = Math.abs(v - 1) < 1e-9 && n > 0; const col = z ? C.mag : o ? C.green : C.gold; line(xS(n), yS(0), xS(n), yS(v), col, qq * 0.6, 2.5); dot(xS(n), yS(v), z || o ? 11 : 7, z ? 'm' : o ? 'n' : 'g', qq); if (n % 5 === 0) lbl(String(n), xS(n), py + 26, C.dim, qq, 14); });
  if (zq > 0) { [5, 15].forEach(n => ring(xS(n), yS(0), 22, C.mag, zq, 2.5)); lbl('n = 5 , 15 :  m = 0 , pointers orthogonal', 1070, 372, C.mag, zq, 16, 'left'); }
  if (oq > 0) { [10, 20].forEach(n => ring(xS(n), yS(1), 22, C.green, oq, 2.5)); lbl('n = 10 , 20 :  m = 1 , coupling returns to I', 1070, 396, C.green, oq, 16, 'left'); }
  lbl('|m₁| = cos(3π/10) = 0.588', 1070, 348, C.gold, rq, 15, 'left');
  const f1 = 1 - Q(S, 1, 'At the fifth use it is zero', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With fresh records', 0.6) * f1;
    for (let j = 0; j < 6; j++) { const qq = clamp(q * 1.6 - j / 8), x = 160 + j * 125; box(x, 255, 105, 70, C.cyan, qq, 2, 'rgba(0,30,40,0.45)'); lblG('σ' + '₁₂₃₄₅₆'[j], x + 52, 285, C.white, qq, 20); lbl('× m' + '₁₂₃₄₅₆'[j], x + 52, 312, C.cyan, qq, 15); }
    const gq = Q(S, 0, 'coherence shrinks by the product of overlaps', 0.6) * f1;
    chip(530, 395, 860, 60, 'Γₙ = Π mⱼ  →  0   ⇔   Σ −log|mⱼ| = ∞', C.gold, gq, 23);
    lbl('fresh , pre-chosen , never revisited ;  ‖Λ_Γ(ρ) − Λ₀(ρ)‖₁ = 2|Γₙ| ‖Pρ(I − P)‖₁', 530, 450, C.dim, gq, 14);
    const qx = 170, qy = 760, qw = 720, qh = 240, xs = n => qx + n / 20 * qw, ys = v => qy - v * qh;
    plotAxes(qx, qy, qw, qh, gq, 'layer n', '|Γₙ|');
    fpath089(FRESH089.map((v, n) => [xs(n), ys(v)]), C.cyan, gq, 3); FRESH089.forEach((v, n) => dot(xs(n), ys(v), 5, 'c', gq));
    lbl('example : every |mⱼ| = 0.588  ⇒  |Γₙ| = 0.588ⁿ', xs(20), ys(0.9), C.cyan, gq, 15, 'right');
    lbl('if |mⱼ| → 1 fast enough , the product can stay positive', xs(20), ys(0.75), C.dim, gq, 14, 'right');
  }
  const q = Q(S, 1, 'At the fifth use it is zero', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 860, 58, 'n = 5 :  ζ⁵ = −1 ,  m₅ = 0 ,  orthogonal pointers', C.mag, zq, 21);
    chip(530, 340, 860, 58, 'n = 10 :  ζ¹⁰ = 1 ,  m₁₀ = 1 ,  C_P(W)¹⁰ = I', C.green, oq, 21);
    lbl('a copy kept by another , unreversed observer would block this return', 530, 395, C.dim, oq, 14);
    const nq = Q(S, 1, 'The gates never converge in norm', 0.6);
    chip(530, 480, 860, 60, '‖W_(n+1) − I ⊗ Wₙ‖ = |ζ − 1| = 2 sin(3π/10) = φ', C.gold, nq, 21);
    const sq = Q(S, 1, "yet a fixed observer's prediction settles", 0.6);
    chip(530, 570, 860, 60, 'Tr(ρ⁽ⁿ⁾ Wₙ) = 1 + (ζ − 1) Π rⱼ  →  1', C.cyan, sq, 23);
    lbl('rⱼ = Tr(ρⱼ Pⱼ) ,  Π rⱼ → 0 ;  one readout settles , the operators do not', 530, 625, C.white, sq, 15);
    lbl('consistent cuts Tr_K ρₙ₊₁ = ρₙ extend to one state on all levels (Thm 10.3)', 530, 680, C.dim, sq, 14);
    stamp('RESOLVE AT 5 , RETURN AT 10', 530, 760, oq, C.green, 24, -0.03);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Information projection, Cauchy-Binet, concurrence', 'published'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['LOG', 'log ab = log a + log b', C.gold, 'Logarithms turn products into sums'], ['ONE RATIO', 'v₀ + v₁₃ = v₁ + v₃', C.cyan, 'five modes leave one hidden ratio'], ['SQUARES', 'sinh²(η/4) + sin²(Φ/2)', C.mag, 'divergence and entanglement split into squares'], ['GOLDEN', '1/φ² + 1/φ = 1', C.gold, 'fusion gives a golden triangle'], ['INSTRUMENT', 'Pr(E) = 2κ', C.green, 'instruments turn triangulations into measurements'], ['BRAID', '{1 , ζ , ζ̄}', C.vio, 'inner gates braid on three phases']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 130, 240, 260, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 19); });
    lbl('PUBLISHED · information projection (Csiszár–Shields) · coherence (Baumgratz–Cramer–Plenio) · concurrence (Wootters) · Fibonacci F and R (Hadjiivanov–Georgiev) · instruments (Watrous)', W / 2, 470, C.cyan, Q(S, 1, 'Information projection, Cauchy-Binet, concurrence') * fade, 14);
    lbl('CLASSICAL · log semiring and Cauchy equation · Cauchy–Binet · Bayes · Lüders measurement · Schur products · Halmos dilation · spectral theorem', W / 2, 515, '#8fbcff', Q(S, 1, 'are published or classical inputs') * fade, 14);
    lbl('VOLUMES · unique relation · ten triangles · KL and quantum three-term splits · record triangle · double-square identity · golden braid phase · endpoint instrument · lifts · {1, ζ, ζ̄} · hull · revival', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · 97 checks : kernel h · 9 right + 1 equilateral · KL splits · det Cov · 1/432 · C² identity · D_Q split · braid spectra · M± · Pr(E) = 2κ · φ⁻³ , φ⁻² · m₅ = 0 , m₁₀ = 1', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 690, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr089(W / 2, 450, 230, 0.5 + t * 0.2, a * 0.9, { fill: 0.12, lab: false, d1: 0.8, d2: 0.8 });
    txt('AURIC V17–V18 · PYTHAGORAS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V17–V18 · 量子勾股与递归黄金门 · TRURETURING FILM 089', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One hidden ratio with a log and a phase, two triangulations, and a gate inside a gate.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V17–V18', logs: 'SUM AND PRODUCT', pyramid: 'FIVE MODES , ONE RELATION', pythag: 'INFORMATION PYTHAGORAS', areas: 'DIRECTIONS AND AREAS', core: 'LOG RATIO AND PHASE', golden: 'GOLDEN GATE', collapse: 'TRIANGULATION AND COLLAPSE', lifts: 'PHASES BECOME GATES', braid: 'WHICH GATES BRAID', hull: 'SPECTRAL HULL', revival: 'RESOLVE AND RETURN', finale: 'LEDGER' });

function poster089() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr089(470, 520, 420, 2.2, 1, { fill: 0.14, bits: true, d1: 1, d2: 1, tri: [[[1, 2, 3], C.gold, 0.8]] });
  txt('C² ∝ sinh²(η/4) + sin²(Φ/2)', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('1/φ² + 1/φ = 1', 1320, 480, { size: 50, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('spec W ⊆ {1, ζ, ζ̄} · m₅ = 0 · m₁₀ = 1', 1320, 590, { size: 40, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('AURIC V17–V18', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4, ls: 4 });
  txt('AURIC V17–V18 · PYTHAGORAS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('量 子 勾 股 与 递 归 黄 金 门', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 089', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster089;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
