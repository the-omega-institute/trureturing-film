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

/* ---- film 067: AURIC Omega V · bosonic excursion and return ---- */
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
const _po67 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po67.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po67.set(key, off); }
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

/* ---- film 067 helpers ---- */
/* three mode wells at positions 1,2,3 with stacked bosons */
function wells67(x, y, occ, a, col = C.cyan, nm = 'c', lab = null) {
  if (a <= 0) return;
  for (let k = 0; k < 3; k++) {
    const cx = x + k * 96;
    line(cx - 36, y - 84, cx - 36, y, col, a * 0.8, 2.5); line(cx - 36, y, cx + 36, y, col, a * 0.8, 2.5); line(cx + 36, y, cx + 36, y - 84, col, a * 0.8, 2.5);
    for (let i = 0; i < occ[k]; i++) dot(cx, y - 19 - i * 34, 15, nm, a);
  }
  if (lab) lbl(lab, x + 96, y + 34, col, a, 20);
}
/* best synchronous error over the first m returns, recomputed for the three ratios */
const CK67 = [10, 100, 1e3, 1e4, 1e5, 1e6, 2e6];
const AP67 = {
  g: [0.322, 0.00701, 0.00267, 0.000348, 3.61e-05, 8.59e-06, 1.79e-06],
  m: [0.533, 0.533, 0.518, 0.518, 0.518, 0.518, 0.518],
  yc: [0.28, 0.0707, 0.00426, 0.000372, 6.46e-05, 4.98e-06, 9.79e-07],
  yp: [1.09, 1.03, 1.0, 1.0, 1.0, 1.0, 1.0]
};
/* e4 amplitude for the design: tau in [0, pi], chi = tau / 2, d = 1/2 */
const A67 = tau => { const c = Math.cos(tau / 2), s = -Math.sin(tau / 2), re = Math.cos(tau), im = -0.5 * Math.sin(tau); return [c * re - s * im, c * im + s * re]; };
function dial67(cx, cy, R, a) {
  if (a <= 0) return;
  ring(cx, cy, R, C.dim, a * 0.8, 1.5);
  line(cx - R - 20, cy, cx + R + 20, cy, C.dim, a * 0.5, 1); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, a * 0.5, 1);
  lbl('1', cx + R + 30, cy + 7, C.dim, a, 18, 'left'); lbl('i', cx, cy - R - 28, C.dim, a, 20); lbl('−1', cx - R - 30, cy + 7, C.dim, a, 18, 'right'); lbl('−i', cx, cy + R + 40, C.dim, a, 18);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  omega63(440, 450, 150, s0, C.cyan, 7);
  pyrG64(440, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const vq = Q(S, 0, 'Part two installed one phase', 0.6);
  box(930, 250, 420, 470, C.cyan, vq * 0.7, 1.5, 'rgba(0,229,255,0.04)'); lbl('five-state space V', 1140, 240, C.cyan, vq, 18);
  ['000', '100', '010', '001', '101'].forEach((s, i) => { const q = vq * clamp(vq * 5 - i); chip(1060, 300 + i * 92, 150, 58, s, i === 4 ? C.mag : C.cyan, q, 24); });
  const pq = Q(S, 0, 'S multiplies the two-particle state', 0.6);
  ['× 1', '× 1', '× 1', '× 1'].forEach((s, i) => lbl(s, 1240, 308 + i * 92, C.dim, Q(S, 0, 'leaves the other four states alone', 0.6), 22));
  lblG('× i', 1240, 676, C.gold, pq, 30);
  lblG('S = diag(1, 1, 1, 1, i)', 1140, 790, C.white, pq, 28);
  const eq = Q(S, 1, 'The answer runs through an excursion', 0.6);
  if (eq > 0) {
    chip(1640, 560, 150, 58, '200', C.vio, eq, 24); chip(1640, 680, 150, 58, '002', C.vio, eq, 24);
    lbl('outside V', 1640, 500, C.vio, eq, 18);
    const k = Q(S, 1, 'the state leaves the five-state space and comes back', 1.6);
    curve(z => [1300 + 265 * z, 655 - 95 * z - 50 * Math.sin(Math.PI * z)], 40, C.mag, eq * clamp(k * 2), 2.5);
    curve(z => [1565 - 265 * z, 680 + 10 * z + 50 * Math.sin(Math.PI * z)], 40, C.gold, eq * clamp(k * 2 - 1), 2.5);
    lbl('excursion', 1440, 555, C.mag, eq * clamp(k * 2), 18); lbl('return', 1440, 765, C.gold, eq * clamp(k * 2 - 1), 18);
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 300, 58, 'exchange g', C.cyan, rp, 22); chip(330, 445, 300, 58, 'interaction J', C.gold, rp, 22); chip(330, 530, 300, 58, 'one return', C.mag, rp, 22);
  box(1440, 340, 340, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('design return', 1610, 410, C.green, rp, 24); lblG('λ = i', 1610, 470, C.white, rp, 30);
  txt(scramble('AURIC Ω V · EXCURSION', rp, 467), W / 2, 760, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('AURIC Ω 第 五 部 · 玻 色 游 程 与 回 归', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 067 · AURIC_OMEGA_BOSONIC_EXCURSION_RETURN_AND_PHASE_CORRECTION', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 CARRIER ---- */
SCENES.carrier = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'exchange between the outer modes', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Because bosons pile up', 0.6);
  const q0 = Q(S, 0, 'Embed the five states into three bosonic modes', 0.6);
  wells67(420, 380, [1, 0, 1], q0, C.mag, 'm', '101');
  lbl('modes 1 · 2 · 3', 516, 260, C.dim, q0 * f1, 18);
  const qo = Q(S, 0, 'two zero zero and zero zero two', 0.6);
  wells67(300, 640, [2, 0, 0], qo, C.vio, 'v', '200'); wells67(640, 640, [0, 0, 2], qo, C.vio, 'v', '002');
  lbl('outside the five states', 625, 740, C.vio, qo * f1, 18);
  if (f1 > 0) {
    lblG('H = g a₁†a₃ + ḡ a₃†a₁ + J n₁n₃', 1400, 360, C.white, Q(S, 0, 'Fix one Hamiltonian', 0.6) * f1, 30);
    chip(1260, 470, 300, 60, 'exchange g', C.cyan, Q(S, 0, 'exchange between the outer modes', 0.6) * f1, 22);
    chip(1580, 470, 300, 60, 'interaction J n₁n₃', C.gold, Q(S, 0, 'plus an interaction J', 0.6) * f1, 22);
    lbl('number, parity and n₂ are conserved', 1400, 560, C.dim, Q(S, 0, 'plus an interaction J', 0.6) * f1, 18);
  }
  const q = Q(S, 1, 'Because bosons pile up', 0.6, 0.3);
  if (q > 0) {
    const pq = Q(S, 1, 'exchange pushes one zero one out', 0.6), bq = Q(S, 1, 'The outside pair splits into a bright state', 0.8);
    chip(1180, 470, 150, 60, '101', C.mag, q, 24);
    chip(1620, 330, 150, 60, '200', C.vio, q * (1 - bq), 24); chip(1620, 610, 150, 60, '002', C.vio, q * (1 - bq), 24);
    arrow(1260, 450, 1540, 345, C.cyan, pq * (1 - bq), 2.5); arrow(1260, 490, 1540, 595, C.cyan, pq * (1 - bq), 2.5);
    lbl('√2 g', 1400, 370, C.cyan, pq * (1 - bq), 22); lbl('√2 ḡ', 1400, 590, C.cyan, pq * (1 - bq), 22);
    chip(1640, 400, 240, 60, 'bright b', C.green, bq, 24); line(1258, 462, 1518, 408, C.green, bq, 3); lbl('2r', 1390, 410, C.green, bq, 24);
    const dq = Q(S, 1, 'a dark state that never moves', 0.6);
    chip(1640, 580, 240, 60, 'dark z', C.dim, dq, 24); lbl('H z = 0', 1640, 650, C.dim, dq, 20);
    lblG('spectrum on W :  0, 0, 0,  ± r,  (J ± Δ)/2', 1400, 770, C.white, dq, 26);
    lbl('Δ = √(J² + 16 r²) ,  r = |g|', 1400, 815, C.dim, dq, 18);
  }
  void t; void s0;
};

/* ---- 03 LEAKAGE ---- */
SCENES.leakage = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const px = 300, py = 720, pw = 820, ph = 380, T = 3, xS = z => px + z / T * pw, yS = v => py - v * ph;
  plotAxes(px, py, pw, ph, s0, null, 'leaked weight from |101⟩');
  lbl('t', px + pw + 18, py + 6, C.dim, s0, 18, 'left');
  [[0.75, 'η²'], [0.5, '0.5']].forEach(([v, s]) => { dashed(px, yS(v), px + pw, yS(v), C.dim, s0 * 0.35, 1); lbl(s, px - 12, yS(v) + 6, C.dim, s0, 16, 'right'); });
  const cq = Q(S, 0, 'The leak has an exact formula', 1.4);
  curve(z => [xS(T * z * cq), yS(0.75 * Math.pow(Math.sin(Math.PI * T * z * cq), 2))], 160, C.mag, s0 * (cq > 0 ? 1 : 0), 3);
  const fq = 1 - Q(S, 1, 'the two-particle state carries a phase lambda', 0.6), f0 = 1 - Q(S, 1, 'Returns come on a lattice', 0.6);
  lblG('L_ρ(t) = κ η² sin²(Δt / 2ħ)', 1450, 330, C.white, Q(S, 0, 'The leak has an exact formula', 0.6) * f0, 32);
  lbl('κ = weight on |101⟩ ,  η = 4r/Δ', 1450, 390, C.dim, Q(S, 0, 'the weight on one zero one', 0.6) * f0, 20);
  chip(1450, 480, 460, 60, 'only |101⟩ ever leaves', C.mag, Q(S, 0, 'Only that one state ever leaves', 0.6) * f0, 22);
  const rq = Q(S, 1, 'Returns come on a lattice', 0.6);
  for (let m = 0; m <= T; m++) { dot(xS(m), py, 11, 'g', rq * clamp(rq * 4 - m)); lbl(m ? 't' + '₀₁₂₃'[m] : 't₀', xS(m), py + 36, C.green, rq, 18); }
  lblG('t_m = 2πħ m / Δ', 1450, 330, C.green, rq * fq, 30);
  lbl('every input is back', 1450, 380, C.green, Q(S, 1, 'every input is back', 0.6) * fq, 20);
  const lq = Q(S, 1, 'the two-particle state carries a phase lambda', 0.6);
  if (lq > 0) {
    const cx = 1450, cy = 500, R = 180, th = Math.PI / 2 * clamp(lq * 1.5);
    dial67(cx, cy, R, lq);
    dot(cx + R * Math.cos(th), cy - R * Math.sin(th), 13, 'c', lq); lbl('λ (true)', cx + R * Math.cos(th) + 26, cy - R * Math.sin(th) - 14, C.cyan, lq, 20, 'left');
    const nq = Q(S, 1, 'the naive projected Hamiltonian would predict lambda squared', 0.8), th2 = Math.PI * nq;
    dot(cx + R * Math.cos(th2), cy - R * Math.sin(th2), 13, 'm', nq); lbl('λ² (projected H)', cx + R * Math.cos(th2), cy - R * Math.sin(th2) + 46, C.mag, nq, 20);
    lblG('λ_m = (−1)^m e^{−iπ m d} ,  d = J/Δ', cx, 780, C.white, lq, 24);
    stamp('EXCURSION CHANGES THE PHASE', 720, 245, Q(S, 1, 'The excursion changes the phase', 0.5), C.gold, 30, -0.04);
  }
  void t;
};

/* ---- 04 CORRECTION ---- */
SCENES.correction = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Lambda equals i only when', 0.6);
  if (f1 > 0) {
    const rows = [['|000⟩ → |000⟩', C.dim], ['(|100⟩, |001⟩) → B(θ_m)', C.cyan], ['|010⟩ → |010⟩', C.dim], ['|101⟩ → λ_m |101⟩', C.mag]];
    lbl('the return U_m', 560, 280, C.white, s0 * f1, 22);
    rows.forEach(([s, col], i) => chip(560, 340 + i * 82, 520, 60, s, col, s0 * f1 * clamp(s0 * 4 - i), 22));
    const oq = Q(S, 0, 'Allow one real rotation before or after the pulse', 0.6) * f1;
    chip(1350, 340, 420, 62, 'one real rotation O', C.gold, oq, 24); lbl('in D₃ · SO(5) · D₃†', 1350, 405, C.dim, oq, 18);
    lblG('O U_m = S', 1350, 500, C.white, Q(S, 0, 'Then S is reached exactly at a return', 0.6) * f1, 34);
    lblG('⇔  λ_m = i', 1350, 580, C.cyan, Q(S, 0, 'when lambda equals i', 0.6) * f1, 30);
    lblG('and  Re(g) · sin θ_m = 0', 1350, 645, C.cyan, Q(S, 0, 'the one-particle block is already real', 0.6) * f1, 28);
  }
  const q = Q(S, 1, 'Lambda equals i only when', 0.6, 0.3);
  if (q > 0) {
    [[420, 1 / 4, 'd = 1/2', C.green, 'reaches i'], [860, 1 / 3, 'd = 1/3', C.red, 'misses i']].forEach(([cx, al, s, col, res]) => {
      const cy = 480, R = 140; dial67(cx, cy, R, q);
      const n = Math.round(1 / al); for (let k = 1; k <= n; k++) { const th = 2 * Math.PI * k * al; dot(cx + R * Math.cos(th), cy - R * Math.sin(th), 11, col === C.green ? 'g' : 'r', q * clamp(q * 6 - k)); }
      lbl(s, cx, cy + R + 80, col, q, 24); lbl(res, cx, cy + R + 115, col, q, 18);
    });
    lbl('λ = i  ⇔  d has an even reduced denominator', 630, 290, C.white, q, 20);
    const mq = Q(S, 1, 'And the pulse alone never hits S', 0.6);
    chip(1450, 330, 460, 62, 'pulse alone : never exactly S', C.mag, mq, 22);
    lblG('4m² = L² + 16k²   (L odd)', 1450, 450, C.white, Q(S, 1, 'four m squared to equal an odd square', 0.6), 30);
    lblG('0  ≢  1   (mod 4)', 1450, 530, C.gold, Q(S, 1, 'which is impossible modulo four', 0.6), 30);
    stamp('NO SOLUTION', 1450, 640, Q(S, 1, 'which is impossible modulo four', 0.5, 0.4), C.red, 40, -0.06);
  }
  void t;
};

/* ---- 05 DESIGN ---- */
SCENES.design = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 620, cy = 470, R = 230;
  dial67(cx, cy, R, s0);
  const run = Q(S, 0, 'After one return the joint phase is exactly i', 2.2);
  const tau = Math.PI * run;
  curve(z => { const p = A67(tau * z); return [cx + R * p[0], cy - R * p[1]]; }, 80, C.cyan, s0 * (run > 0 ? 1 : 0), 3.5);
  curve(z => [cx + R * Math.cos(-tau * z), cy - R * Math.sin(-tau * z)], 80, C.mag, s0 * (run > 0 ? 0.8 : 0), 2.5);
  if (run > 0) { const p = A67(tau); dot(cx + R * p[0], cy - R * p[1], 13, 'c', s0); dot(cx + R * Math.cos(-tau), cy - R * Math.sin(-tau), 12, 'm', s0 * 0.9); }
  lbl('amplitude on |101⟩ (true)', cx - R - 10, cy + R + 70, C.cyan, run, 18, 'left');
  lbl('naive projection e^{−iJt/ħ}', cx - R - 10, cy + R + 100, C.mag, run, 18, 'left');
  const f1 = 1 - Q(S, 1, 'Halfway through, three quarters', 0.6);
  ['g = i r', 'J = 4r/√3', 't* = π√3 ħ / 4r', 'd = 1/2'].forEach((s, i) => chip(1430, 300 + i * 78, 420, 60, s, [C.cyan, C.gold, C.green, C.white][i], Q(S, 0, ['Take g equal to i r', 'J equal to four r over root three', 'After one return', 'After one return'][i], 0.5) * f1, 22));
  lblG('R₀ U(t*) = S', 1430, 650, C.green, Q(S, 0, 'a real rotation of the one-particle block finishes S', 0.6) * f1, 32);
  const q = Q(S, 1, 'Halfway through, three quarters', 0.6, 0.3);
  if (q > 0) {
    const p = A67(Math.PI / 2); dot(cx + R * p[0], cy - R * p[1], 14, 'o', q);
    lbl('t*/2 : |A|² = 1/4', cx + R * p[0] - 24, cy - R * p[1] + 44, C.orange, q, 20, 'right');
    lblG('3/4 of |101⟩ outside V', 1430, 320, C.orange, q, 30);
    lblG('true phase  i   ·   projection  −1', 1430, 410, C.white, Q(S, 1, 'The naive projection would have predicted minus one', 0.6), 26);
    chip(1430, 530, 520, 62, 'ordinary beam splitter instead of R₀', C.red, Q(S, 1, 'an ordinary beam splitter cannot stand in', 0.6), 21);
    lblG('leaks |101⟩ :  sin²(π√3/2) ≈ 0.167', 1430, 630, C.red, Q(S, 1, 'probability about seventeen percent', 0.6), 28);
  }
  void t;
};

/* ---- 06 APPROXIMATION ---- */
SCENES.approximation = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'every integer relation', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Three ratios show the cases', 0.6);
  if (f1 > 0) {
    lbl('wait for later returns m = 1, 2, 3, …', W / 2, 290, C.dim, s0 * f1, 20);
    lblG('(h, k) ∈ 𝓛   ⇒   4 | h', W / 2, 400, C.white, Q(S, 0, 'the returns approach S exactly when', 0.6) * f1, 44);
    lbl('𝓛 = { (h, k) : h α + k v ∈ ℤ } ,  α = (1 − d)/2', W / 2, 470, C.dim, Q(S, 0, 'every integer relation', 0.6) * f1, 20);
    [['aligned g = ± i r : phase test only', C.green], ['real-corrected : v = x', C.cyan], ['pulse only : v = x / 2', C.mag]].forEach(([s, col], i) => chip(W / 2, 570 + i * 76, 620, 58, s, col, Q(S, 0, 'a first coefficient divisible by four', 0.5, i * 0.25) * f1, 21));
  }
  const q = Q(S, 1, 'Three ratios show the cases', 0.6, 0.3);
  if (q > 0) {
    const px = 300, py = 770, pw = 900, ph = 450, lmin = -6.2, lmax = Math.log10(2.2);
    const xS = m => px + (Math.log10(m) - 1) / (Math.log10(2e6) - 1) * pw, yS = v => py - (Math.log10(v) - lmin) / (lmax - lmin) * ph;
    plotAxes(px, py, pw, ph, q, null, 'best error ‖U_m − S‖ so far');
    lbl('returns m', px + pw + 16, py + 6, C.dim, q, 18, 'left');
    [[10, '10'], [1e3, '10³'], [1e6, '10⁶']].forEach(([m, s]) => lbl(s, xS(m), py + 30, C.dim, q, 16));
    [[1, '1'], [1e-3, '10⁻³'], [1e-6, '10⁻⁶']].forEach(([v, s]) => { dashed(px, yS(v), px + pw, yS(v), C.dim, q * 0.3, 1); lbl(s, px - 10, yS(v) + 6, C.dim, q, 16, 'right'); });
    const poly = (arr, col, a, dash) => { for (let i = 0; i + 1 < arr.length; i++) (dash ? dashed : line)(xS(CK67[i]), yS(arr[i]), xS(CK67[i + 1]), yS(arr[i + 1]), col, a, 3); arr.forEach((v, i) => dot(xS(CK67[i]), yS(v), 7, col === C.green ? 'g' : col === C.mag ? 'm' : 'o', a)); };
    const gq = Q(S, 1, 'everything converges', 0.8), mq = Q(S, 1, 'the phase is dense, yet the error never drops', 0.8), yq = Q(S, 1, 'the exchange block lands near minus the identity', 0.8);
    poly(AP67.g, C.green, gq, false); poly(AP67.m, C.mag, mq, false); poly(AP67.yp, C.gold, yq, true); poly(AP67.yc, C.gold, Q(S, 1, 'only a real sign correction finishes the approach', 0.8), false);
    chip(1500, 330, 470, 56, 'J/r = 4/√3 : converges', C.green, gq, 21);
    chip(1500, 420, 470, 56, 'J/r = 4 : stalls near 0.52', C.mag, mq, 21);
    chip(1500, 510, 470, 56, 'J/r = 1 : pulse only stays at 1', C.gold, yq, 21);
    chip(1500, 600, 470, 56, 'J/r = 1 : sign-corrected → 0', C.gold, Q(S, 1, 'only a real sign correction finishes the approach', 0.6), 21);
    lbl('real g · recomputed over 2 × 10⁶ returns', 1500, 690, C.dim, q, 17);
    lbl('B(θ_m) → −I', 1500, 740, C.gold, yq, 22);
  }
  void t;
};

/* ---- 07 BOUNDARY ---- */
SCENES.boundary = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Hard-core or fermion modes', 0.6);
  if (f1 > 0) {
    lblG('|t − t_m| ≤ (πħ / 4r) √ε', 560, 330, C.green, Q(S, 0, 'Near returns are stable', 0.6) * f1, 30);
    lblG('‖U(t) − U(t_m)‖ ≤ π(Δ + |J|)/(8r) · √ε', 560, 400, C.green, Q(S, 0, 'a small leak pins both the time', 0.6) * f1, 26);
    const nq = Q(S, 0, 'the original rule of the five-state model forbids any excursion', 0.6) * f1;
    chip(1400, 320, 560, 62, 'native rule : Q U(s) P = 0 at every s', C.orange, nq, 22);
    const px = 1140, py = 700, pw = 520, ph = 220, lq = Q(S, 0, 'every positive pulse leaks at once', 1.0) * f1;
    plotAxes(px, py, pw, ph, nq, null, 'leak from |101⟩ near t = 0');
    curve(z => [px + pw * z * lq, py - ph * 0.9 * Math.pow(Math.sin(1.4 * z * lq), 2)], 60, C.mag, nq * (lq > 0 ? 1 : 0), 3);
    lbl('≈ 4κ r² t² / ħ²  > 0', px + 30, py - 170, C.mag, lq, 20, 'left');
    stamp('EVERY PULSE IS INADMISSIBLE', 560, 600, Q(S, 0, 'every positive pulse leaks at once', 0.5, 0.6) * f1, C.red, 30, -0.05);
  }
  const q = Q(S, 1, 'Hard-core or fermion modes', 0.6, 0.3);
  if (q > 0) {
    [['bosons (CCR)', 'leak · this model', C.mag, [1, 0, 1]], ['hard-core', 'no leak · other algebra', C.dim, [1, 0, 1]], ['fermions (CAR)', 'no leak · other algebra', C.dim, [1, 0, 1]]].forEach(([s, s2, col, occ], i) => {
      const x = 300 + i * 340, qq = i === 0 ? q : Q(S, 1, 'but they are different algebras', 0.6);
      wells67(x, 420, occ, qq, col, i === 0 ? 'm' : 'n'); lbl(s, x + 96, 280, col, qq, 22); lbl(s2, x + 96, 470, col, qq, 18);
    });
    const vq = Q(S, 1, 'S is invisible to number-preserving readouts', 0.6);
    chip(W / 2, 580, 760, 60, 'number-preserving readouts cannot see S', C.white, vq, 22);
    const cq = Q(S, 1, 'seeing it needs a coherent superposition', 0.6);
    lblG('ψ = (|000⟩ + |101⟩)/√2 :  ⟨Y⟩ = 0  →  ⟨Y⟩ = 1 after S', W / 2, 680, C.cyan, cq, 28);
    lbl('H conserves number and fixes |000⟩ : it cannot prepare ψ', W / 2, 740, C.dim, Q(S, 1, 'which this Hamiltonian cannot prepare', 0.6), 20);
  }
  void t; void s0;
};

/* ---- 08 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['LEAK', 'κ η² sin²', C.mag, 'An exact leak formula'], ['LATTICE', '2πħm/Δ', C.green, 'a return lattice'], ['PHASE', 'λ, not λ²', C.cyan, 'a return phase that differs'], ['DESIGN', 'g = ir · J = 4r/√3', C.gold, 'a corrected design'], ['TEST', '4 | h', C.vio, 'a divisibility test for long waits'], ['BOUNDARY', 'no native path', C.orange, 'a divisibility test for long waits']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 19); });
    lbl('CLASSICAL INPUT · Kronecker theorem · two-site Bose–Hubbard model family', W / 2, 480, '#8fbcff', Q(S, 1, "with Kronecker's theorem as a classical input") * fade, 17);
    lbl('VOLUME · leakage · returns · exact correction · design · approximation criteria · boundary', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory volume') * fade, 17);
    lbl('RECOMPUTED · explicit Fock space up to two bosons · two million returns', W / 2, 600, C.white, Q(S, 1, 'every number here was recomputed') * fade, 19);
    lbl('NEXT · FULL POPULATION ELIMINATION · FINITE-ROOT FRONTIER', W / 2, 690, C.gold, Q(S, 1, 'Next: full population elimination') * fade, 32);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC Ω V · EXCURSION', W / 2, 680, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('AURIC Ω 第五部 · 玻色游程与回归 · TRURETURING FILM 067', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Leave the space, come back, and count the phase.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC OMEGA V', carrier: 'BOSONIC CARRIER', leakage: 'LEAK AND RETURN', correction: 'EXACT CORRECTION', design: 'A DESIGN', approximation: 'LONG WAITS', boundary: 'BOUNDARY', finale: 'LEDGER' });

function poster67() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('S = diag(1, 1, 1, 1, i)', 1340, 380, { size: 58, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('|101⟩  ⇄  |200⟩, |002⟩', 1340, 480, { size: 40, fam: FG, w: 700, align: 'center', c: C.white });
  txt('g = ir · J = 4r/√3 · λ = i', 1340, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC Ω 第五部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC Ω V · EXCURSION', W / 2, 890, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('离 开 · 回 来 · 再 数 一 数 相 位', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 067', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster67;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
