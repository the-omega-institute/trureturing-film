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

/* ---- film 079: AURIC QUANTUM PRINCIPLES IV · conservation, readers and record histories ---- */
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
const _po079 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po079.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po079.set(key, off); }
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
/* data produced by verify079.py (vis079.json) */
const SEPTR079 = [[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.618,0.618],[0.618,0.618],[0.618,0.618],[0.8541,0.8541],[0.8541,0.8541],[0.8541,0.8541],[0.8541,0.8541],[0.8541,0.8541],[0.8541,0.8541],[0.8541,0.8541],[0.8541,0.8541],[0.618,0.618],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.382,0.382],[0.2671,0.1466],[0.3381,0.2921],[0.3381,0.2921],[0.3381,0.2921],[0.3381,0.2921],[0.3381,0.2921],[0.3381,0.2921],[0.3381,0.2921],[0.3381,0.2921],[0.2055,0.5066],[0.2055,0.5066],[0.2055,0.5066],[0.2055,0.5066],[0.2055,0.5066],[0.2055,0.5066],[0.2055,0.5066],[0.2055,0.5066],[0.2055,0.5066],[0.3336,0.5188],[0.3336,0.5188],[0.8705,0.0681],[0.8705,0.0681],[0.8705,0.0681],[0.8705,0.0681],[0.8705,0.0681]];
const SEP079 = {"len":73,"q0":0.87048,"q1":0.06813};
const BR079 = {"t":0.1459,"p0":0.87048,"p1":0.06813};
const ALR079 = [[1,3,0.75,0.01758],[2,5,0.3454915,0.001865],[3,9,0.11697778,0.0001425],[4,17,0.03376389,8.906e-06],[5,33,0.00903565,5.103e-07],[6,65,0.00233418,2.838e-08],[7,129,0.00059297,1.57e-09],[8,257,0.00014942,8.721e-11]];
const T9_079 = [[0.0,0.117,0.4132,0.75,0.9698,0.9698,0.75,0.4132,0.117],[0.117,0.0,0.117,0.4132,0.75,0.9698,0.9698,0.75,0.4132],[0.4132,0.117,0.0,0.117,0.4132,0.75,0.9698,0.9698,0.75],[0.75,0.4132,0.117,0.0,0.117,0.4132,0.75,0.9698,0.9698],[0.9698,0.75,0.4132,0.117,0.0,0.117,0.4132,0.75,0.9698],[0.9698,0.9698,0.75,0.4132,0.117,0.0,0.117,0.4132,0.75],[0.75,0.9698,0.9698,0.75,0.4132,0.117,0.0,0.117,0.4132],[0.4132,0.75,0.9698,0.9698,0.75,0.4132,0.117,0.0,0.117],[0.117,0.4132,0.75,0.9698,0.9698,0.75,0.4132,0.117,0.0]];
const FIT079 = [[1,0.375,0.01758],[2,0.4523,0.001865],[3,0.2951,0.0001425]];
const DYAD079 = [[0.0,0],[0.015625,6],[0.03125,5],[0.046875,6],[0.0625,4],[0.078125,6],[0.09375,5],[0.109375,6],[0.125,3],[0.140625,6],[0.15625,5],[0.171875,6],[0.1875,4],[0.203125,6],[0.21875,5],[0.234375,6],[0.25,2],[0.265625,6],[0.28125,5],[0.296875,6],[0.3125,4],[0.328125,6],[0.34375,5],[0.359375,6],[0.375,3],[0.390625,6],[0.40625,5],[0.421875,6],[0.4375,4],[0.453125,6],[0.46875,5],[0.484375,6],[0.5,1],[0.515625,6],[0.53125,5],[0.546875,6],[0.5625,4],[0.578125,6],[0.59375,5],[0.609375,6],[0.625,3],[0.640625,6],[0.65625,5],[0.671875,6],[0.6875,4],[0.703125,6],[0.71875,5],[0.734375,6],[0.75,2],[0.765625,6],[0.78125,5],[0.796875,6],[0.8125,4],[0.828125,6],[0.84375,5],[0.859375,6],[0.875,3],[0.890625,6],[0.90625,5],[0.921875,6],[0.9375,4],[0.953125,6],[0.96875,5],[0.984375,6],[1.0,0]];
const JV079 = {"p1":0.61803,"ptau":0.94427,"p2":0.8541,"P2":0.03115};
const JMC079 = [0.6161,0.3528,0.0311];
const JC079 = [[0.0,0.0],[0.025,0.0005],[0.05,0.0021],[0.075,0.0047],[0.1,0.0084],[0.125,0.013],[0.15,0.0187],[0.175,0.0255],[0.2,0.0332],[0.225,0.0418],[0.25,0.0515],[0.275,0.062],[0.3,0.0735],[0.325,0.0859],[0.35,0.0991],[0.375,0.1131],[0.4,0.128],[0.425,0.1436],[0.45,0.1599],[0.475,0.1769],[0.5,0.1946],[0.525,0.2129],[0.55,0.2318],[0.575,0.2512],[0.6,0.2711],[0.625,0.2915],[0.65,0.3122],[0.675,0.3333],[0.7,0.3547],[0.725,0.3764],[0.75,0.3983],[0.775,0.4203],[0.8,0.4425],[0.825,0.4647],[0.85,0.487],[0.875,0.5092],[0.9,0.5313],[0.925,0.5533],[0.95,0.5751],[0.975,0.5967],[1.0,0.618],[1.025,0.639],[1.05,0.6596],[1.075,0.6798],[1.1,0.6996],[1.125,0.7188],[1.15,0.7375],[1.175,0.7556],[1.2,0.7731],[1.225,0.7899],[1.25,0.806],[1.275,0.8213],[1.3,0.8359],[1.325,0.8497],[1.35,0.8626],[1.375,0.8747],[1.4,0.8859],[1.425,0.8961],[1.45,0.9054],[1.475,0.9138],[1.5,0.9212],[1.525,0.9275],[1.55,0.9329],[1.575,0.9372],[1.6,0.9405],[1.625,0.9428],[1.65,0.944],[1.675,0.9442],[1.7,0.9433],[1.725,0.9414],[1.75,0.9385],[1.775,0.9345],[1.8,0.9294],[1.825,0.9234],[1.85,0.9164],[1.875,0.9083],[1.9,0.8993],[1.925,0.8894],[1.95,0.8785],[1.975,0.8668],[2.0,0.8541]];
const EZH079 = [12,30,63,78,112,112,155,272,305,430,460,320,270,226,205,238,175,205,203,129];
const RET079 = [[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.9242,0.4508],[0.0,0.0],[0.3003,0.0],[0.0,0.0],[0.5712,0.5573],[0.3003,0.0],[0.9242,0.9017],[0.0,0.0],[0.0,0.0],[0.5712,0.0],[0.5712,0.4033],[0.0,0.0],[0.7862,0.0],[0.7862,0.0],[0.0,0.0],[0.3003,0.0],[0.0,0.0],[0.3003,0.1803],[0.7862,0.0],[0.0,0.0],[0.7862,0.0],[0.0,0.0],[0.706,0.0],[0.7862,0.7639],[0.3003,0.0],[0.0,0.0],[0.3003,0.0],[0.0,0.0],[0.9242,0.0],[0.9717,0.0],[0.0,0.0],[0.5712,0.3059],[0.3003,0.0],[0.9242,0.0],[0.0,0.0],[0.0,0.0],[0.3003,0.2129],[0.3003,0.0],[0.9717,0.0],[0.7862,0.5836],[0.9242,0.0],[0.7862,0.4033],[0.9242,0.0],[0.0,0.0],[0.3003,0.1803],[0.7862,0.4396],[0.3003,0.0],[0.3003,0.2918],[0.7862,0.7639],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.5712,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.5712,0.0],[0.0,0.0],[0.5712,0.5279],[0.0,0.0],[0.9242,0.0],[0.7862,0.0],[0.0,0.0],[0.5712,0.0],[0.0,0.0],[0.0,0.0],[0.5448,0.0],[0.3003,0.2918],[0.7862,0.0],[0.7862,0.0],[0.7862,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.3003,0.0],[0.5712,0.2968],[0.9717,0.0],[0.0,0.0],[0.5712,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.7862,0.4033],[0.9242,0.0],[0.5712,0.0],[0.0,0.0],[0.5712,0.0],[0.5712,0.0],[0.9242,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.3003,0.2918],[0.0,0.0],[0.3085,0.0],[0.5712,0.4033],[0.7862,0.7639],[0.0,0.0],[0.7862,0.0],[0.5712,0.5279],[0.3003,0.0],[0.0,0.0],[0.3003,0.2918],[0.5712,0.0],[0.3003,0.0],[0.0,0.0],[0.0,0.0],[0.9717,0.9443],[0.5712,0.5279],[0.3003,0.154],[0.0,0.0],[0.3003,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.9496,0.0],[0.9717,0.0],[0.7862,0.0],[0.4588,0.3181],[0.0,0.0],[0.5712,0.5573],[0.0,0.0],[0.3003,0.0],[0.5712,0.0],[0.0,0.0],[0.5712,0.0],[0.9242,0.9017],[0.0,0.0],[0.7862,0.0],[0.0,0.0],[0.3003,0.0],[0.9242,0.0],[0.0,0.0],[0.0,0.0],[0.3003,0.0],[0.3003,0.1803],[0.0,0.0],[0.0,0.0],[0.7862,0.4984],[0.3003,0.0],[0.5712,0.0],[0.0,0.0],[0.5712,0.2786],[0.3003,0.1803],[0.0,0.0],[0.0,0.0],[0.7862,0.7639],[0.7862,0.0],[0.7862,0.5836],[0.0,0.0],[0.0,0.0],[0.0,0.0],[0.0,0.0]];
const SPAN079_0 = [[3,159],[6,314],[9,457],[12,610],[15,749],[18,865],[21,957],[24,1049],[27,1051],[30,1051],[33,1051],[36,1051],[39,1051],[42,1051],[45,1051],[48,1051],[51,1051],[54,1051],[57,1051],[60,1051]];
const SPAN079_1 = [[3,98],[6,190],[9,285],[12,374],[15,460],[18,514],[21,574],[24,610],[27,610],[30,610],[33,610],[36,610],[39,610],[42,610],[45,610],[48,610],[51,610],[54,610],[57,610],[60,610]];
const DENS079 = {"e":[0.0,1.0],"7":[0.61803,0.38197],"77":[0.8541,0.1459]};
const S151_079 = {"len":69,"q21":0.94694,"q13":0.00311,"d7":0.58332,"d77":0.80613};
const ETA079_0 = {"00000":0.0902,"00100":0.1459,"01000":0.382,"10000":0.1459,"10100":0.2361};
const ETA079_1 = {"00010":1.0};
const BELL079 = {"0":{"e11":0.6178,"mean":3.908,"path0":[[6,0.9542,"01000","01010"],[8,0.1392,"01010","00010"],[11,0.5775,"00010","00000"],[13,0.1108,"00000","01000"]]},"1":{"e11":0.6182,"mean":4.01,"path0":[[1,0.9658,"01000","00000"],[3,0.6075,"00000","00100"],[7,0.3058,"00100","00000"],[8,0.4775,"00000","01000"],[11,0.6042,"01000","01010"],[13,0.3125,"01010","00010"]]}};
const VIOL079 = [[0.0,0.0],[0.025,-6.6e-05],[0.05,-0.000262],[0.075,-0.000589],[0.1,-0.001045],[0.125,-0.001631],[0.15,-0.002343],[0.175,-0.003182],[0.2,-0.004144],[0.225,-0.005229],[0.25,-0.006432],[0.275,-0.007753],[0.3,-0.009187],[0.325,-0.010732],[0.35,-0.012384],[0.375,-0.01414],[0.4,-0.015995],[0.425,-0.017946],[0.45,-0.019988],[0.475,-0.022117],[0.5,-0.024328],[0.525,-0.026615],[0.55,-0.028975],[0.575,-0.031401],[0.6,-0.033889],[0.625,-0.036432],[0.65,-0.039026],[0.675,-0.041664],[0.7,-0.04434],[0.725,-0.047049],[0.75,-0.049785],[0.775,-0.052541],[0.8,-0.055311],[0.825,-0.05809],[0.85,-0.060871],[0.875,-0.063647],[0.9,-0.066414],[0.925,-0.069164],[0.95,-0.071891],[0.975,-0.07459],[1.0,-0.077254]];
const MS079 = [13,10,6,2,1];
const DET079 = {"0":[],"1":[[4,1.0,"01000","00000"],[11,1.0,"00000","00010"]]};
/* ---- film 079 helpers ---- */
/* the literal path b_-1 b_0 | b_1 .. b_9 | b_10 b_11 b_12 as a chain of sites */
function chain79(x0, y, bits, cw, a, o = {}) {
  if (a <= 0) return;
  const n = bits.length;
  for (let k = 0; k < n - 1; k++) line(x0 + k * cw + 14, y, x0 + (k + 1) * cw - 14, y, C.dim, a * 0.6, 2);
  for (let k = 0; k < n; k++) {
    const xx = x0 + k * cw, fixed = o.fixed && o.fixed[k], hl = o.hl && o.hl[k];
    const col = hl || (fixed ? C.dim : C.cyan);
    if (bits[k]) dot(xx, y, 13, hl === C.mag ? 'm' : 'g', a); else ring(xx, y, 11, col, a, 2);
    if (hl) ring(xx, y, 20, hl, a, 2.5);
    if (o.labs) lbl(o.labs[k], xx, y + 44, fixed ? C.dim : C.white, a, 15);
  }
}
/* 89 legal paths on a ring: 55 cyan (b9 = 0) and 34 magenta (b9 = 1) */
function ring89(cx, cy, R, a, t, o = {}) {
  if (a <= 0) return;
  ring(cx, cy, R, C.dim, a * 0.35, 1.2);
  for (let k = 0; k < 89; k++) {
    const an = -Math.PI / 2 + TAU * k / 89 + (o.spin || 0.08) * t, sec = k < 55 ? 0 : 1;
    const q = o.prog == null ? 1 : clamp(o.prog * 1.4 - k / 120);
    dot(cx + R * Math.cos(an), cy + R * Math.sin(an), o.r || 7, sec ? 'm' : 'c', a * q);
  }
}
/* a program strip: labelled boxes joined by arrows */
function strip79(x, y, cells, cw, h, a) {
  if (a <= 0) return;
  cells.forEach(([s, col], i) => { const xx = x + i * (cw + 34); box(xx, y, cw, h, col, a, 2, 'rgba(0,0,0,0.5)'); lblG(s, xx + cw / 2, y + h / 2 + 8, C.white, a, 20); if (i < cells.length - 1) arrow(xx + cw + 4, y + h / 2, xx + cw + 30, y + h / 2, C.dim, a, 2); });
}
function heat79(x, y, M, cs, a, prog = 1, col = [255, 200, 70]) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((v, j) => { const q = clamp(prog * 1.6 - (i + j) / (2 * M.length)); fillBox(x + j * cs, y + i * cs, cs - 3, cs - 3, `rgb(${col[0]},${col[1]},${col[2]})`, a * q * (0.06 + 0.85 * v)); rect63(x + j * cs, y + i * cs, cs - 3, cs - 3, i === j ? C.cyan : C.dim, a * q * (i === j ? 0.9 : 0.35), i === j ? 2 : 1); }));
}
const fmt79 = (v, d = 3) => v.toFixed(d);

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  ring89(480, 440, 230, s0, t, { prog: s0 });
  lblG('89 legal paths', 480, 430, C.white, s0, 30);
  lbl('cyan : b₉ = 0 (55)   magenta : b₉ = 1 (34)', 480, 470, C.dim, s0, 15);
  chain79(250, 760, [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], 36, Q(S, 0, 'one source of eighty-nine paths', 0.6), { fixed: { 0: 1, 1: 1, 11: 1, 12: 1, 13: 1 } });
  lbl('ready path R₀v', 480, 815, C.gold, Q(S, 0, 'one source of eighty-nine paths', 0.6), 16);
  const items = [['built a complex Fibonacci path model', 'EARLIER PARTS', 'complex Fibonacci paths · coherent records', C.cyan],
    ['one source of eighty-nine paths', 'ONE SOURCE', '89 paths · one ready · 11 + 7 addresses', C.gold],
    ['native statistical rules, readers and hidden histories', 'RULES · READERS · HISTORIES', 'duties C, D, E · readers · jump paths', C.mag],
    ['the squared amplitudes', 'TARGET', 'mᵢ(a) = ‖Mᵢ K_a R₀v‖²', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  ring89(W / 2, 420, 230, rp, t, { r: 6 });
  ring(W / 2, 420, 248, C.mag, rp * 0.25, 1.2);
  lblG('m = ‖M K_a R₀v‖²', W / 2, 432, C.white, rp, 34);
  chip(330, 360, 330, 58, 'two duties', C.gold, rp, 22); chip(330, 445, 330, 58, 'one event', C.mag, rp, 22); chip(330, 530, 330, 58, 'fifteen calls', C.green, rp, 22);
  box(1410, 340, 400, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('records from the source', 1610, 410, C.cyan, rp, 22); lblG('C + D  ⟺  Born records', 1610, 470, C.white, rp, 28);
  txt(scramble('AURIC QP IV · READERS', rp, 479), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 量 子 原 理 第 四 部 · 统 计 守 恒 、读 器 与 记 录 历 史', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 079 · AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION_CONTINUATION_III · §138–172', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 SOURCE ---- */
SCENES.source = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'published'], [1, 'so one finite word family', 'theory']]);
  const f1 = 1 - Q(S, 1, 'By the joint density theorem', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'eighty-nine legal paths', 0.6) * f1;
    const labs = ['b₋₁', 'b₀', 'b₁', 'b₂', 'b₃', 'b₄', 'b₅', 'b₆', 'b₇', 'b₈', 'b₉', 'b₁₀', 'b₁₁', 'b₁₂'];
    const bq = Q(S, 0, 'The record bit b nine splits', 0.6) * f1;
    chain79(210, 330, [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], 54, q, { labs, fixed: { 0: 1, 1: 1, 11: 1, 12: 1, 13: 1 }, hl: bq > 0.5 ? { 10: C.mag } : {} });
    lbl('fixed', 237, 290, C.dim, q, 15); lbl('fixed', 858, 290, C.dim, q, 15);
    lbl('interior b₁ … b₉ : no two neighbours occupied  ·  89 paths  ·  ready = R₀v (gold)', 560, 430, C.white, q, 16);
    const aq = Q(S, 0, 'eleven pre-read addresses', 0.6) * f1;
    chip(560, 500, 860, 52, 'pre-read  K₀ … K₁₀  ·  post-read  K₀ … K₆  ·  Kⱼ¹⁰ = I', C.gold, aq, 20);
    lbl('Kⱼ = ζ[I + (ζ − 1)Pⱼ] ,  ζ = e^(3πi/5) ,  Pⱼ = n n + (1 − n)(1 − n) Q  (138.2a)', 560, 560, C.dim, aq, 15);
    const nq = Q(S, 0, 'the first nine addresses never change it', 0.6) * f1;
    chip(560, 640, 860, 54, '[Kⱼ , Mᵢ] = 0  for  j = 0 … 8 ;  Mᵢ = (b₉ = i)', C.cyan, nq, 22);
    lbl('K₉ moves the record ;  K₈ is controlled by b₉ but never flips it', 560, 700, C.dim, nq, 15);
    bars63(1180, 720, [55, 34], 170, 120, 7.2, bq, C.cyan, ['b₉ = 0', 'b₉ = 1']);
    lbl('55', 1265, 720 - 55 * 7.2 - 16, C.cyan, bq, 30); lbl('34', 1555, 720 - 34 * 7.2 - 16, C.mag, bq, 30);
    lbl('record sectors 𝒦₀ , 𝒦₁', 1410, 270, C.white, bq, 19);
    lbl('code 13 × 2 = 26 , complement 63', 1410, 790, C.dim, q, 15);
  }
  const q = Q(S, 1, 'By the joint density theorem', 0.6, 0.3);
  if (q > 0) {
    box(150, 250, 360, 200, C.cyan, q, 2, 'rgba(0,30,40,0.35)'); lbl('𝒦₀  (55)', 330, 300, C.cyan, q, 22); lblG('u₀ ∈ S(𝒦₀)', 330, 360, C.white, q, 24);
    box(560, 250, 360, 200, C.mag, q, 2, 'rgba(40,0,40,0.35)'); lbl('𝒦₁  (34)', 740, 300, C.mag, q, 22); lblG('u₁ ∈ S(𝒦₁)', 740, 360, C.white, q, 24);
    const dq = Q(S, 1, 'act densely on both sectors at once', 0.6);
    chip(535, 510, 770, 56, 'closure of { ([K_g|𝒦₀] , [K_g|𝒦₁]) } = PU(55) × PU(34)', C.cyan, dq, 20);
    lbl('FLW Theorem 0.1 , (k, r, n) = (2, 5, 10) , shapes [6,4] and [5,5]', 535, 570, C.dim, dq, 15);
    const sq = Q(S, 1, 'separates any two conditional states by more than one half', 0.6);
    chip(535, 650, 770, 56, '∃ finite 𝒢 :  q_g(u₀) − q_g(u₁) > 1/2 for one g ∈ 𝒢', C.gold, sq, 21);
    lbl('q_g(u) = ⟨K_g u , Q K_g u⟩ ,  Q = (b₁ = 1) ;  the same g acts on both parts', 535, 710, C.dim, sq, 15);
    const pq = Q(S, 1, 'For the prefix nine nine', 0.6);
    const px = 1060, py = 760, pw = 700, ph = 420, xS = k => px + k / (SEPTR079.length - 1) * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, pq, 'letters of the found word (' + SEP079.len + ')', '⟨Q⟩ after the word');
    lbl('a = 99 : t₀ = x⁴ , both start at 0', px + 10, py - ph + 30, C.dim, pq, 15, 'left');
    const n = Math.max(2, Math.floor(clamp(pq * 1.4) * SEPTR079.length));
    curve(p => { const k = p * (n - 1); const i0 = Math.floor(k), f = k - i0, a0 = SEPTR079[i0], a1 = SEPTR079[Math.min(i0 + 1, n - 1)]; return [xS(k), yS(a0[0] * (1 - f) + a1[0] * f)]; }, 3 * n, C.cyan, pq, 7);
    curve(p => { const k = p * (n - 1); const i0 = Math.floor(k), f = k - i0, a0 = SEPTR079[i0], a1 = SEPTR079[Math.min(i0 + 1, n - 1)]; return [xS(k), yS(a0[1] * (1 - f) + a1[1] * f)]; }, 3 * n, C.mag, pq, 2.5);
    lbl('cyan : u₀ (record 0)   magenta : u₁ (record 1) ; equal until K₈ acts', px, py + 58, C.dim, pq, 14, 'left');
    const eq = Q(S, 1, 'a found word gives point eight seven', 0.6);
    lbl('q(u₀) = ' + fmt79(SEP079.q0), xS(SEPTR079.length - 1) - 10, yS(SEP079.q0) - 14, C.cyan, eq, 18, 'right');
    lbl('q(u₁) = ' + fmt79(SEP079.q1), xS(SEPTR079.length - 1) - 10, yS(SEP079.q1) - 14, C.mag, eq, 18, 'right');
    line(xS(SEPTR079.length - 1) + 14, yS(SEP079.q0), xS(SEPTR079.length - 1) + 14, yS(SEP079.q1), C.gold, eq, 3);
    lbl('gap ' + fmt79(SEP079.q0 - SEP079.q1, 2), xS(SEPTR079.length - 1) + 22, (yS(SEP079.q0) + yS(SEP079.q1)) / 2, C.gold, eq, 18, 'left');
  }
};

/* ---- 03 BRIDGE ---- */
SCENES.bridge = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Together they force every record weight', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now add two native duties', 0.6) * f1;
    lbl('T(a)', 130, 300, C.dim, q, 20, 'left'); strip79(230, 265, [['ready', C.gold], ['a', C.cyan], ['terminal w', C.white]], 140, 66, q);
    lbl('R(a, f)', 130, 420, C.dim, q, 20, 'left'); strip79(230, 385, [['ready', C.gold], ['a', C.cyan], ['read b₉ = i', C.mag], ['f', C.cyan], ['terminal w', C.white]], 140, 66, q);
    const cq = Q(S, 0, 'C: a control at any of those nine addresses', 0.6) * f1;
    chip(560, 560, 820, 60, 'C :  m₀(a j) = m₀(a)   for  j = 0 … 8', C.gold, cq, 24);
    lbl('the actual record marginal ; any dependence on the real history allowed', 560, 615, C.dim, cq, 15);
    const dq = Q(S, 0, 'D: inserting the reader leaves', 0.6) * f1;
    chip(560, 700, 820, 60, 'D :  P_R(a,ε)(b₁ = 1) = P_T(a)(b₁ = 1)', C.mag, dq, 24);
    lbl('one fixed old event A = {b₁ = 1} , empty continuation', 560, 755, C.dim, dq, 15);
    const mq = Q(S, 0, 'leaves the record marginal unchanged', 0.6) * f1;
    box(1150, 270, 620, 460, C.cyan, mq, 2, 'rgba(0,30,40,0.3)');
    lbl('unknown record weights', 1460, 315, C.cyan, mq, 20);
    lblG('mᵢ(a) ≥ 0 ,  m₀ + m₁ = 1', 1460, 380, C.white, mq, 26);
    lblG('tᵢ(a) = ‖Mᵢ χ_a‖² = 0  ⇒  mᵢ(a) = 0', 1460, 440, C.white, mq, 22);
    lblG('after record i : pure successor [Mᵢ χ_a]', 1460, 500, C.white, mq, 22);
    lbl('no continuity , no ray dependence assumed', 1460, 560, C.dim, mq, 16);
    lbl('χ_a = K_a R₀v', 1460, 610, C.gold, mq, 18);
  }
  const q = Q(S, 1, 'Together they force every record weight', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 860, 66, 'C + D   ⟺   mᵢ(a) = ‖Mᵢ K_a R₀ v‖²   for every a', C.green, q, 25);
    lbl('then  P_R(a,f)(i, w) = ‖N_w K_f Mᵢ K_a R₀ v‖²  on all 1024 labels (140.4)', 530, 330, C.dim, q, 15);
    const iq = Q(S, 1, 'D says m minus t', 0.6);
    chip(530, 420, 860, 62, 'D  ⇔  (m − t)(p₀ − p₁) = 0', C.mag, iq, 26);
    lbl('P_R(A) = m p₀ + (1 − m) p₁ ,  P_T(A) = t p₀ + (1 − t) p₁ ,  pᵢ = ⟨uᵢ , Q uᵢ⟩', 530, 480, C.dim, iq, 15);
    const sq = Q(S, 1, 'a separating word makes the second factor exceed one half', 0.6);
    lbl('C carries m back from a g to a :  m₀(a g) = m₀(a)', 530, 540, C.gold, sq, 17);
    const nq = Q(S, 1, 'Neither duty alone suffices', 0.6);
    stamp('NEITHER DUTY ALONE SUFFICES', 530, 650, nq, C.red, 30, -0.04);
    lbl('II models with λ = 1/2 at the prefix 99 :  m₀ ≠ t₀ = x⁴ (Proposition 141.1)', 530, 715, C.dim, nq, 15);
    const px = 1080, py = 740, ph = 380;
    plotAxes(px, py, 660, ph, q, '', 'a = 99');
    const vals = [[iq, 'p₀ − p₁ at a', 0, C.dim], [sq, 'p₀ − p₁ at a g', BR079.p0 - BR079.p1, C.gold], [iq, 't₀ = x⁴', BR079.t, C.cyan]];
    vals.forEach(([qq, lab, v, col], i) => { const x = px + 50 + i * 210, h = v * ph; if (v > 0) { fillBox(x, py - h, 120, h, col, qq * 0.45); rect63(x, py - h, 120, h, col, qq, 2); } else line(x, py - 2, x + 120, py - 2, C.red, qq, 4); lbl(fmt79(v, 3), x + 60, py - h - 16, col === C.dim ? C.red : col, qq, 20); lbl(lab, x + 60, py + 30, C.white, qq, 15); });
    lbl('blind', px + 110, py - 50, C.red, iq, 18);
    dashed(px, py - 0.5 * ph, px + 660, py - 0.5 * ph, C.gold, sq * 0.7, 1.5); lbl('1/2', px + 670, py - 0.5 * ph + 6, C.gold, sq, 16, 'left');
  }
};

/* ---- 04 ALPHABET ---- */
SCENES.alphabet = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A pigeonhole on the two to the n support sets', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'No finite classical alphabet', 0.6) * f1;
    chip(530, 265, 880, 60, 'H(a; f, w) = Σₛ αₐ(s) β_f,w(s) ,  s ∈ {1, … , n}', C.white, q, 22);
    lbl('any prefix encoding α_a , any continuation response β , no linearity , no continuity', 530, 322, C.dim, q, 15);
    const pq = Q(S, 0, 'native prefixes and continuations', 0.6) * f1;
    lbl('m = 2ⁿ + 1 prefixes pᵢ and continuations fⱼ , all from R₀v , label w* = 1000000010', 530, 380, C.gold, pq, 16);
    const tq = Q(S, 0, 'reproduce a table close to', 0.6) * f1;
    heat79(1130, 270, T9_079, 54, tq, tq);
    lbl('Tᵢⱼ = sin²(π(i − j)/m) ,  n = 3 , m = 9', 1370, 790, C.white, tq, 18);
    lbl('i ↓', 1100, 300, C.dim, tq, 16); lbl('j →', 1160, 255, C.dim, tq, 16, 'left');
    const dq = Q(S, 0, 'which vanishes on the diagonal', 0.6) * f1;
    chip(530, 470, 880, 60, 'Tᵢᵢ = 0 ,   Tᵢⱼ ≥ γₙ = sin²(π/m)  for i ≠ j', C.cyan, dq, 23);
    lbl('|Hᵢⱼ − Tᵢⱼ| < δₙ : native finite words from the PU(13) density of the ready block', 530, 530, C.dim, dq, 15);
    const mq = Q(S, 0, 'For n hidden states', 0.6) * f1;
    for (let i = 0; i < 9; i++) { const x = 230 + i * 70; ring(x, 650, 20, C.gold, mq, 2); lbl('p' + i, x, 657, C.white, mq, 15); }
    for (let j = 0; j < 9; j++) { const x = 230 + j * 70; box(x - 22, 710, 44, 44, C.cyan, mq, 1.5, 'rgba(0,0,0,0.4)'); lbl('f' + j, x, 738, C.cyan, mq, 15); }
    lbl('m² = 81 programs T(pᵢ fⱼ) , one old terminal label', 530, 800, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'A pigeonhole on the two to the n support sets', 0.6, 0.3);
  if (q > 0) {
    const hq = Q(S, 1, 'support sets', 0.6);
    lbl('supports Aᵢ = { s : αᵢ(s) ≥ γ/4n } ⊆ {1, 2, 3} : only 2³ = 8 possible sets , but 9 rows', 530, 262, C.white, hq, 16);
    for (let k = 0; k < 8; k++) { const x = 180 + k * 90; box(x - 36, 300, 72, 92, C.cyan, hq, 1.5, 'rgba(0,30,40,0.35)'); lbl(['∅', '1', '2', '3', '12', '13', '23', '123'][k], x, 382, C.dim, hq, 14); }
    for (let i = 0; i < 9; i++) { const k = i < 8 ? i : 4, x = 180 + k * 90 + (i === 8 ? 18 : (i === 4 ? -18 : 0)), qq = clamp(hq * 1.6 - i / 12); dot(x, 336, 13, i === 8 || i === 4 ? 'm' : 'g', qq); }
    lbl('two rows share a support set  ⇒  contradiction', 530, 425, C.mag, hq, 17);
    const bq = Q(S, 1, 'miss by more than gamma squared over thirty-two n', 0.6);
    chip(530, 495, 880, 60, 'max |Hᵢⱼ − Σ αᵢ bⱼ| > δₙ = γₙ² / (32 n)', C.gold, bq, 25);
    lbl('every n , every stochastic encoding , every [0, 1] response ; n = 1 :  γ = 3/4 ,  δ = 9/512', 530, 552, C.dim, bq, 15);
    const px = 1080, py = 770, pw = 680, ph = 460, lo = -8, hi = 0, yS = v => py - (Math.log10(v) - lo) / (hi - lo) * ph, xS = n => px + 40 + (n - 1) / 7 * (pw - 80);
    plotAxes(px, py, pw, ph, bq, 'n', 'error (log)');
    [-8, -6, -4, -2, 0].forEach(e => { lbl('10^' + e, px - 12, yS(Math.pow(10, e)) + 5, C.dim, bq, 13, 'right'); dashed(px, yS(Math.pow(10, e)), px + pw, yS(Math.pow(10, e)), C.dim, bq * 0.25, 1); });
    const rows = ALR079.filter(r => r[3] > 1e-8);
    curve(p => { const k = p * (rows.length - 1), i0 = Math.min(rows.length - 2, Math.floor(k)), f = k - i0; const v = Math.exp(Math.log(rows[i0][3]) * (1 - f) + Math.log(rows[i0 + 1][3]) * f); return [xS(rows[i0][0] + f), yS(v)]; }, 60, C.gold, bq, 3);
    rows.forEach(r => { dot(xS(r[0]), yS(r[3]), 7, 'g', bq); lbl(String(r[0]), xS(r[0]), py + 26, C.dim, bq, 14); });
    lbl('δₙ lower bound', xS(4.2), yS(rows[3][3]) - 18, C.gold, bq, 16, 'left');
    const fq = Q(S, 1, 'the best fit found still misses by three eighths', 0.6);
    FIT079.forEach(r => { dot(xS(r[0]), yS(r[1]), 10, 'm', fq); lbl(fmt79(r[1], 3), xS(r[0]) + 14, yS(r[1]) - 12, C.mag, fq, 15, 'left'); });
    lbl('magenta : best fits found by alternating LPs', px + 30, py - 40, C.mag, fq, 15, 'left');
    stamp('NO FINITE ALPHABET', 530, 680, fq, C.red, 34, -0.04);
    lbl('infinite, continuous or context-reading models are not excluded', 530, 745, C.dim, fq, 15);
  }
};

/* ---- 05 ONE EVENT ---- */
SCENES.oneevent = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A bit reversal turns the record split', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Keep only one unknown continuous response q', 0.6) * f1;
    chip(530, 270, 880, 62, 'q : ℙ(𝒦) → [0, 1] continuous ,  P_T(a)(A) = q([χ_a])', C.cyan, q, 22);
    lbl('the same q after every record and archive ; no formula for any other label', 530, 330, C.dim, q, 15);
    const cq = Q(S, 0, 'calibrated at the ready and at one flipped path', 0.6) * f1;
    chip(530, 410, 880, 58, 'q([e₀]) = 0 ,  q([e₁]) = 1 ,  e₁ = R₀ e₁₀₁₀₀', C.gold, cq, 22);
    lbl('e₁ differs from the ready only in b₁ ; it is a calibration , not a new preparation', 530, 465, C.dim, cq, 15);
    const eq = Q(S, 0, 'add relation E', 0.6) * f1;
    chip(530, 550, 880, 58, 'E :  P_T(a j)(A) = P_T(a)(A)  for  j = 2 … 10', C.mag, eq, 22);
    lbl('with C (j = 0 … 8) and D , three relations between real histories', 530, 605, C.dim, eq, 15);
    const lq = Q(S, 0, 'Now drop the full terminal rule', 0.6) * f1;
    box(1150, 270, 620, 420, C.dim, lq, 2, 'rgba(0,0,0,0.35)');
    lbl('dropped', 1460, 315, C.red, lq, 20);
    lblG('P(w) = ‖N_w ξ‖²  on all 1024 labels', 1460, 380, C.dim, lq, 22);
    line(1200, 372, 1720, 372, C.red, lq, 3);
    lbl('kept', 1460, 460, C.green, lq, 20);
    lblG('one event  A = {b₁ = 1}', 1460, 520, C.white, lq, 24);
    lblG('records : support , pure successor', 1460, 580, C.white, lq, 22);
    lbl('U : coherent source , zero failure', 1460, 640, C.dim, lq, 16);
  }
  const q = Q(S, 1, 'A bit reversal turns the record split', 0.6, 0.3);
  if (q > 0) {
    const bits = [0, 1, 0, 0, 1, 0, 1, 0, 1];
    chain79(200, 290, bits, 52, q, { labs: ['b₁', 'b₂', 'b₃', 'b₄', 'b₅', 'b₆', 'b₇', 'b₈', 'b₉'], hl: { 0: C.gold, 8: C.mag } });
    chain79(200, 400, bits.slice().reverse(), 52, q, { hl: { 0: C.mag, 8: C.gold } });
    arrow(680, 300, 680, 380, C.dim, q, 2); lbl('S', 700, 348, C.white, q, 20, 'left');
    lbl('S Kⱼ S⁻¹ = K₁₀₋ⱼ  ,   S M₁ S⁻¹ = Q', 940, 350, C.cyan, q, 18, 'left');
    const tq = Q(S, 1, 'with blocks of thirty-four, twenty-one, twenty-one and thirteen', 0.6);
    const tab = [[34, 21], [21, 13]], cx0 = 260, cy0 = 500;
    lbl('I − Q', cx0 + 80, cy0 - 12, C.dim, tq, 16); lbl('Q', cx0 + 240, cy0 - 12, C.dim, tq, 16);
    lbl('M₀', cx0 - 30, cy0 + 70, C.dim, tq, 16, 'right'); lbl('M₁', cx0 - 30, cy0 + 200, C.dim, tq, 16, 'right');
    tab.forEach((r, i) => r.forEach((v, j) => { const s = 20 + v * 3.2; const x = cx0 + j * 160 + (150 - s) / 2, yy = cy0 + i * 130 + (120 - s) / 2; fillBox(x, yy, s, s, i ? C.mag : C.cyan, tq * 0.35); rect63(x, yy, s, s, i ? C.mag : C.cyan, tq, 1.6); lbl(String(v), cx0 + j * 160 + 75, cy0 + i * 130 + 68, C.white, tq, 26); }));
    lbl('SU × SU control on both splits', cx0 + 160, cy0 + 285, C.dim, tq, 15);
    const fq = Q(S, 1, 'give a functional equation', 0.6);
    chip(1290, 460, 900, 58, 'F(t r₀ + (1 − t) r₁) = F(t) F(r₀) + (1 − F(t)) F(r₁)', C.gold, fq, 21);
    lbl('q([ξ]) = F(‖Qξ‖²) by E ;  m = F(t) and the joint constraint by C and D', 1290, 515, C.dim, fq, 15);
    const mq = Q(S, 1, 'midpoints force F of s equal to s', 0.6);
    const px = 1000, py = 800, pw = 220, ph = 220;
    plotAxes(px, py, pw, ph, mq, 's', 'F');
    line(px, py, px + pw, py - ph, C.dim, mq * 0.4, 1.2);
    DYAD079.forEach(([s, lev]) => { const qq = clamp(mq * 7 - lev); dot(px + s * pw, py - s * ph, 5, lev < 2 ? 'g' : 'c', qq); });
    lbl('F(1/2) = 1/2 ,  F(k/2ⁿ) = k/2ⁿ', px + pw + 40, 600, C.white, mq, 17, 'left');
    const rq = Q(S, 1, 'so q is the squared norm and the records are Born', 0.6);
    chip(1520, 690, 520, 56, 'q([ξ]) = ‖Qξ‖² ,  mᵢ(a) = ‖Mᵢ χ_a‖²', C.green, rq, 21);
    lbl('and  P_R(a,f)(i, A) = ‖Q K_f Mᵢ χ_a‖²', 1520, 745, C.dim, rq, 16);
    lbl('if any equation fails : a real finite prefix shows a defect', 1520, 785, C.dim, rq, 14);
  }
};

/* ---- 06 JUMPS ---- */
SCENES.jumps = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [0, 'A gate makes at most two jumps', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Given the readable history', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Bell-type minimal-rate jumps', 0.6) * f1;
    chip(530, 268, 880, 60, 'σ(q | r) = [2 Im(ψ̄(q) H(q, r) ψ(r))]₊ / |ψ(r)|²', C.cyan, q, 22);
    lbl('Dürr–Goldstein–Tumulka–Zanghì rates ; Georgii–Tumulka existence , no explosion', 530, 325, C.dim, q, 15);
    const gq = Q(S, 0, 'each gate a fixed pulse of angle three pi over five', 0.6) * f1;
    chip(530, 400, 880, 58, 'Hⱼ = −α(I + Pⱼ) ,  α = 3π/5 ,  Uⱼ(1) = Kⱼ', C.gold, gq, 23);
    const tq = Q(S, 0, 'A gate makes at most two jumps', 0.6) * f1;
    lbl('a two-point block : current ∝ sin(αs + θ) , angle α < π : one sign change at most', 530, 465, C.white, tq, 16);
    stamp('AT MOST TWO JUMPS PER GATE', 530, 545, tq, C.gold, 28, -0.03);
    const wq = Q(S, 0, 'two address-one calls from the ready', 0.6) * f1;
    chip(530, 650, 880, 58, 'Pr(Z₂ = 2) = (p(τ) − p(1))(p(τ) − p(2)) / p(τ) = ' + fmt79(JV079.P2, 4), C.mag, wq, 21);
    lbl('τ = 5/3 ,  p(1) = x ,  p(τ) = 4x³ = ' + fmt79(JV079.ptau, 3) + ' ,  p(2) = ' + fmt79(JV079.p2, 3), 530, 710, C.dim, wq, 15);
    const px = 1080, py = 610, pw = 680, ph = 320, xS = s => px + s / 2 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, wq, '', 'p(t) on the flipped path');
    lbl('t (two pulses of address 1)', px + pw / 2, py + 52, C.dim, wq, 15);
    curve(p => { const r = JC079[Math.min(JC079.length - 1, Math.round(p * (JC079.length - 1)))]; return [xS(r[0]), yS(r[1])]; }, JC079.length - 1, C.cyan, wq, 3);
    dashed(xS(1), py, xS(1), py - ph, C.dim, wq * 0.6, 1.2); dashed(xS(5 / 3), py, xS(5 / 3), py - ph, C.gold, wq * 0.8, 1.5);
    lbl('τ = 5/3', xS(5 / 3), py + 26, C.gold, wq, 15); lbl('1', xS(1), py + 26, C.dim, wq, 15); lbl('2', xS(2), py + 26, C.dim, wq, 15);
    arrow(xS(1.25), yS(0.62), xS(1.25), yS(0.9), C.gold, wq, 2.5); lbl('jump in', xS(1.25) - 8, yS(0.6) + 20, C.gold, wq, 14, 'right');
    arrow(xS(1.85), yS(0.92), xS(1.85), yS(0.64), C.mag, wq, 2.5); lbl('jump back', xS(1.85) + 8, yS(0.6) + 20, C.mag, wq, 14, 'left');
    const bq = Q(S, 0, 'with probability point zero three one', 0.6) * f1;
    const hx = 1100, hy = 815;
    lbl('second pulse , 200000 Monte Carlo runs :', hx, hy - 90, C.white, bq, 15, 'left');
    ['Z₂ = 0', 'Z₂ = 1', 'Z₂ = 2'].forEach((s, i) => { const v = JMC079[i], w = Math.max(3, v * 420); fillBox(hx + 90, hy - 70 + i * 26, w, 18, i === 2 ? C.mag : C.cyan, bq * 0.5); lbl(s, hx + 80, hy - 56 + i * 26, C.dim, bq, 14, 'right'); lbl(fmt79(v, 4), hx + 100 + w, hy - 56 + i * 26, i === 2 ? C.mag : C.white, bq, 14, 'left'); });
  }
  const q = Q(S, 1, 'Given the readable history', 0.6, 0.3);
  if (q > 0) {
    box(90, 237, 880, 66, C.gold, q, 2, 'rgba(0,0,0,0.5)'); lblG('E[Z | readable past] ≤ y = φ^(−1/2) = 0.786', 530, 279, C.gold, q, 26);
    lbl('per block ∫|p′| ≤ 2c sin(α/2) m ;  2 sin(3π/10) = φ ,  so 2xy sin(3π/10) = y', 530, 330, C.dim, q, 15);
    const sq = Q(S, 1, 'this golden constant is sharp', 0.6);
    lbl('equality at ψ* = e^(−iαQ/2)(|q₀⟩ − i|q₁⟩)/√2  (a mathematical input , not a preparation)', 530, 390, C.white, sq, 15);
    const hq = Q(S, 1, 'Conditioning on the hidden past can exceed it', 0.6);
    chip(530, 500, 880, 60, 'on {Q₁ = q₀} :  E[Z₂ | hidden past] ≥ 3x − 1 = 0.854 > y', C.mag, hq, 22);
    lbl('(3x − 1)² − x = 10 − 16x > 0 ;  same ready program as the two-jump witness', 530, 558, C.dim, hq, 15);
    stamp('READABLE ≠ HIDDEN CONDITIONING', 530, 660, hq, C.red, 28, -0.04);
    lbl('symmetric extra traffic keeps the square marginals but adds jumps : minimality is a choice', 530, 730, C.dim, hq, 14);
    const px = 1080, py = 760, pw = 680, ph = 400, xS = v => px + v / 0.85 * pw;
    const mx = Math.max(...EZH079);
    plotAxes(px, py, pw, ph, q, 'E[Z] for 4000 random block inputs', 'count');
    EZH079.forEach((c, i) => { const x0 = xS(i * 0.04), w = xS(0.04) - xS(0) - 3, h = c / mx * (ph - 40), qq = clamp(q * 1.5 - i / 30); fillBox(x0, py - h, w, h, C.cyan, qq * 0.45); rect63(x0, py - h, w, h, C.cyan, qq, 1.2); });
    line(xS(0.786), py, xS(0.786), py - ph, C.gold, sq, 3); lbl('y = 0.786', xS(0.786) - 6, py - ph + 16, C.gold, sq, 17, 'right');
    line(xS(0.854), py, xS(0.854), py - ph * 0.7, C.mag, hq, 3); lbl('0.854', xS(0.854) + 4, py - ph * 0.7 - 10, C.mag, hq, 16, 'left');
  }
};

/* ---- 07 CAPACITY ---- */
SCENES.capacity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'That criterion holds exactly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the event prediction rows span a finite-dimensional space', 0.6) * f1;
    chip(530, 268, 880, 60, 'x_a = ( 1 , p(a f) )_f ,  r = dim span{ x_a } < ∞', C.cyan, q, 23);
    lbl('p(a) = P_T(a)(A) : actual probabilities only , no common ray response assumed', 530, 325, C.dim, q, 15);
    const rq = Q(S, 0, 'ten repeats of any address statistically return', 0.6) * f1;
    chip(530, 410, 880, 58, 'R₁₀ :  p(a j¹⁰ f) = p(a f)', C.gold, rq, 25);
    lbl('Kⱼ¹⁰ = I is a matrix fact ; R₁₀ is a separate statistical law', 530, 465, C.dim, rq, 15);
    const cq = Q(S, 0, 'prefixes whose rays return to the ready ray must have returning rows', 0.6) * f1;
    chip(530, 580, 880, 62, 'd([χ_aₙ], [e₀]) → 0   ⇒   ‖x_aₙ − x_ε‖_∞ → 0', C.mag, cq, 24);
    lbl('rows move by isometries T_j with T_j¹⁰ = I ; the joint closure L is a compact group', 530, 640, C.dim, cq, 15);
    const gq = Q(S, 0, 'Then one criterion decides everything', 0.6) * f1;
    const cx = 1430, cy = 500, R = 220;
    ring(cx, cy, R, C.dim, gq, 2); lbl('ray space ℙ(𝒦) , dim 89', cx, cy + R + 40, C.dim, gq, 16);
    dot(cx + R * 0.55, cy - R * 0.3, 14, 'g', gq); lbl('[e₀]', cx + R * 0.55 + 22, cy - R * 0.3 + 6, C.gold, gq, 18, 'left');
    for (let k = 0; k < 7; k++) { const an = t * 0.4 + k * 0.9, rr = 140 / (k + 1.2); const xx = cx + R * 0.55 + rr * Math.cos(an), yy = cy - R * 0.3 + rr * Math.sin(an); dot(xx, yy, 7, 'c', cq * clamp(1 - k * 0.08)); }
    lbl('returning words aₙ', cx - 30, cy + 40, C.cyan, cq, 16);
  }
  const q = Q(S, 1, 'That criterion holds exactly', 0.6, 0.3);
  if (q > 0) {
    chip(530, 268, 880, 62, 'ready return  ⟺  ∃! continuous q :  p(a) = q([χ_a])', C.green, q, 24);
    lbl('compact quotient : the row map factors through the ray', 530, 325, C.dim, q, 15);
    const fq = Q(S, 1, 'r minus one fixed futures already detect any failure', 0.6);
    chip(530, 420, 880, 60, '‖x_a − x_b‖_∞ ≤ C max over f₁ … f_(r−1) of |p(a fₗ) − p(b fₗ)|', C.gold, fq, 20);
    lbl('if return fails : one fixed future f* and δ > 0 with |p(aₙ f*) − p(f*)| ≥ δ', 530, 478, C.dim, fq, 15);
    lbl('existence only : no list of futures , no word lengths , no sample costs', 530, 515, C.dim, fq, 14);
    const bq = Q(S, 1, 'For the Born law the deviation is at most twice the ray distance', 0.6);
    chip(530, 610, 880, 56, 'Born :  sup_f |p(a f) − p(f)| ≤ ‖P_χ − P_e₀‖₁ = 2 d', C.cyan, bq, 22);
    lbl('the Born comparison law has r ≤ 89² = 7921 and satisfies R₁₀', 530, 665, C.dim, bq, 15);
    const sq = Q(S, 1, 'at most twice the ray distance', 0.6, 0.8);
    const px = 1080, py = 770, pw = 680, ph = 460, mxd = 1.0, xS = d => px + d / mxd * pw, yS = v => py - v / 1.2 * ph;
    plotAxes(px, py, pw, ph, bq, 'd([χ_a] , [e₀])', 'sup over 150 futures');
    line(xS(0), yS(0), xS(0.6), yS(1.2), C.gold, bq, 2.5); lbl('2 d', xS(0.6) + 12, yS(1.15), C.gold, bq, 18, 'left');
    dashed(px, yS(1), px + pw, yS(1), C.dim, bq * 0.4, 1); lbl('1', px - 10, yS(1) + 5, C.dim, bq, 14, 'right');
    RET079.forEach((r, i) => { const qq = clamp(sq * 2 - i / 200); dot(xS(Math.min(r[0], 1)), yS(r[1]), 6, 'c', qq); });
    lbl('160 near-return prefixes', px + 24, py - ph + 30, C.cyan, sq, 15, 'left');
  }
};

/* ---- 08 EFFECTS ---- */
SCENES.effects = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So a pure state can be predictively non-extreme', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the seven post-read addresses only see block-diagonal data', 0.6) * f1;
    lbl('tails (b₇, b₈, b₉) are never touched by K₀ … K₆', 530, 262, C.white, q, 17);
    const blocks = [['000', 21, C.cyan], ['010', 21, C.cyan], ['100', 13, C.cyan], ['001', 21, C.mag], ['101', 13, C.mag]];
    let xx = 170;
    blocks.forEach(([s, d, col], i) => { const w = d * 8, qq = clamp(q * 1.6 - i / 6); fillBox(xx, 300, w, w, col, qq * 0.3); rect63(xx, 300, w, w, col, qq, 2); lbl(s, xx + w / 2, 300 + w / 2 + 2, C.white, qq, 18); lbl(String(d), xx + w / 2, 300 + w + 26, col, qq, 18); xx += w + (i === 2 ? 60 : 18); });
    lbl('record 0 : 21 + 21 + 13 = 55', 410, 520, C.cyan, q, 16); lbl('record 1 : 21 + 13 = 34', 850, 520, C.mag, q, 16);
    const sq = Q(S, 0, 'The real span of all actual effects is the full block algebra', 0.6) * f1;
    chip(530, 680, 880, 58, 'span_ℝ { Mᵢ K_h* N_w K_h Mᵢ } = Herm(𝒜ᵢ)', C.gold, sq, 23);
    lbl('𝒜₀ = M₂₁ ⊕ M₂₁ ⊕ M₁₃ ,  𝒜₁ = M₂₁ ⊕ M₁₃ ;  joint closure PU(21) × PU(13) (FLW)', 530, 738, C.dim, sq, 15);
    const px = 1080, py = 770, pw = 680, ph = 460, xS = n => px + n / 60 * pw, yS = v => py - v / 1150 * ph;
    plotAxes(px, py, pw, ph, sq, 'random post-read words h', 'real rank of the effects');
    [[SPAN079_0, C.cyan, 1051], [SPAN079_1, C.mag, 610]].forEach(([arr, col, tgt], k) => {
      curve(p => { const r = arr[Math.min(arr.length - 1, Math.floor(p * (arr.length - 1)))]; return [xS(r[0]), yS(r[1])]; }, arr.length - 1, col, sq, 3);
      arr.forEach(r => dot(xS(r[0]), yS(r[1]), 5, k ? 'm' : 'c', sq));
      dashed(px, yS(tgt), px + pw, yS(tgt), col, sq * 0.6, 1.2); lbl(String(tgt) + (k ? ' = 21² + 13²' : ' = 2·21² + 13²'), px + pw - 10, yS(tgt) - 12, col, Q(S, 0, k ? 'six hundred ten for record one' : 'one thousand fifty-one dimensions', 0.6) * f1, 18, 'right');
    });
  }
  const q = Q(S, 1, 'So a pure state can be predictively non-extreme', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 720, ph = 420, pw = 420, xS = v => px + 0.9 * v * pw, yS = v => py - 0.9 * v * ph;
    plotAxes(px, py, pw, ph, q, 'weight on tail 000', 'weight on tail 100');
    line(xS(0), yS(1), xS(1), yS(0), C.dim, q * 0.5, 1.5);
    const D7 = DENS079['7'], D77 = DENS079['77'], De = DENS079['e'];
    const pq = Q(S, 1, 'the prefix seven equals alpha times prefix seven seven', 0.6);
    line(xS(De[0]), yS(De[1]), xS(D77[0]), yS(D77[1]), C.gold, pq, 3);
    [[De, 'ready (0, 1)', 'g'], [D77, '77 : (1 − x⁴, x⁴)', 'm'], [D7, '7 : (x, x²)', 'c']].forEach(([d, s, cc], i) => { dot(xS(d[0]), yS(d[1]), 11, cc, i === 2 ? pq : q); lbl(s, xS(d[0]) + 22, yS(d[1]) - 12, C.white, i === 2 ? pq : q, 16, 'left'); });
    const aq = Q(S, 1, 'with alpha equal to one over one plus x squared', 0.6);
    chip(1290, 268, 900, 62, 'r(χ₇) = α r(χ₇₇) + (1 − α) r(ready) ,  α = 1/(1 + x²) = ' + fmt79(1 / (1 + 0.6180339887 * 0.6180339887), 4), C.gold, aq, 20);
    const eq = Q(S, 1, 'exactly on every future and label', 0.6);
    lbl('checked on 300 random post-read words × 89 labels : max deviation < 10⁻¹³', 1290, 330, C.dim, eq, 15);
    const dq = Q(S, 1, 'although all three states are different', 0.6);
    lbl('three different pure states of the same source , not a physical mixture', 1290, 375, C.white, dq, 17);
    const hq = Q(S, 1, 'although all three states are different', 0.6, 0.6);
    chip(1290, 470, 900, 58, 'a found post-read word h (' + S151_079.len + ' letters) :  q₂₁ = ' + fmt79(S151_079.q21, 3) + ' ,  q₁₃ = ' + fmt79(S151_079.q13, 3), C.cyan, hq, 20);
    lbl('event A after h :  r(7) − r(ready) = ' + fmt79(S151_079.d7, 3) + ' ,  r(77) − r(ready) = ' + fmt79(S151_079.d77, 3), 1290, 525, C.dim, hq, 15);
    stamp('PURE YET NON-EXTREME', 1290, 630, dq, C.mag, 32, -0.04);
    lbl('central weights βₛ are the whole positive posterior freedom (Theorem 151.6)', 1290, 700, C.dim, dq, 15);
  }
};

/* ---- 09 READER ---- */
SCENES.reader = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'With Bell jumps on the whole carrier', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'add four vacuum sites', 0.6) * f1;
    chip(530, 268, 880, 60, '610 = 55 × 8 + 34 × 5 ,   Ξ(|q⟩ ⊗ |r⟩) = |q⟩ ⊗ |010r0⟩', C.cyan, q, 22);
    lbl('V₁₆ : b₁ … b₁₃ free , image of Ξ 178 , complement 432 kept', 530, 325, C.dim, q, 15);
    const sq = Q(S, 0, 'A fixed half twist of fifteen forward calls', 0.6) * f1;
    const gx = 260, gy = 390, cw = 46, ch = 40;
    const dw = [10, 11, 10, 12, 11, 10, 13, 12, 11, 10, 14, 13, 12, 11, 10];
    for (let r = 0; r < 5; r++) lbl('K' + (10 + r), gx - 16, gy + r * ch + 27, C.dim, sq, 15, 'right');
    for (let k = 0; k < 15; k++) { const qq = clamp(sq * 18 - k); for (let r = 0; r < 5; r++) { const on = dw[k] === 10 + r; box(gx + k * cw, gy + r * ch, cw - 4, ch - 4, on ? C.gold : C.dim, qq * (on ? 1 : 0.25), on ? 2 : 1, on ? 'rgba(60,45,0,0.6)' : 'rgba(0,0,0,0.3)'); } lbl(String(k + 1), gx + k * cw + 21, gy + 5 * ch + 22, C.dim, qq, 13); }
    lbl('D K₁₀ = K₁₄ D ,  D K₁₄ = K₁₀ D  (Garside half twist)', 530, gy + 5 * ch + 62, C.gold, sq, 16);
    const cq = Q(S, 0, 'copies b nine into a new bit b thirteen', 0.6) * f1;
    chip(530, 720, 880, 58, 'D Ξ₀ |q⟩ = |q⟩ ⊗ η_b₉(q) ,  supp ηᵢ ⊆ { b₁₃ = i }', C.green, cq, 22);
    lbl('checked on all 89 source columns ; old prefix and future pulses still intertwine', 530, 775, C.dim, cq, 15);
    const gq = Q(S, 0, 'keeping its garbage', 0.6) * f1;
    const keys0 = Object.keys(ETA079_0).sort(), keys1 = Object.keys(ETA079_1).sort();
    lbl('|η₀(z)|² , record 0 (tails z₁₀ … z₁₄)', 1430, 270, C.cyan, gq, 16);
    keys0.forEach((z, i) => { const v = ETA079_0[z], w = v * 520; fillBox(1180, 290 + i * 34, w, 24, C.cyan, gq * 0.45); rect63(1180, 290 + i * 34, w, 24, C.cyan, gq, 1.2); lbl(z, 1170, 308 + i * 34, C.white, gq, 14, 'right'); lbl(fmt79(v, 3), 1190 + w, 308 + i * 34, C.dim, gq, 13, 'left'); });
    const y1 = 310 + keys0.length * 34;
    lbl('|η₁(z)|² , record 1', 1430, y1 + 6, C.mag, gq, 16);
    keys1.forEach((z, i) => { const v = ETA079_1[z], w = v * 520; fillBox(1180, y1 + 24 + i * 34, w, 24, C.mag, gq * 0.45); rect63(1180, y1 + 24 + i * 34, w, 24, C.mag, gq, 1.2); lbl(z, 1170, y1 + 42 + i * 34, C.white, gq, 14, 'right'); lbl(fmt79(v, 3), 1190 + w, y1 + 42 + i * 34, C.dim, gq, 13, 'left'); });
    lbl('b₁₃ = z₁₃ is the fourth tail bit : always equal to the record', 1430, y1 + 110, C.dim, gq, 14);
  }
  const q = Q(S, 1, 'With Bell jumps on the whole carrier', 0.6, 0.3);
  if (q > 0) {
    chip(530, 268, 880, 60, '(F)₊ μ̂_a,f (dh , dr) = μ^proj_a,f (dh) · R_I(h) (dr)', C.cyan, q, 22);
    lbl('h : full old source history ;  r : complete reader micro-history ;  I : the record', 530, 325, C.dim, q, 15);
    const fq = Q(S, 1, 'factors off the old source history given the record', 0.6);
    strip79(150, 400, [['prefix a', C.cyan], ['15 calls', C.gold], ['report b₁₃', C.mag], ['future f', C.cyan]], 170, 64, fq);
    lbl('the reader rates cancel |χ_a(q)|² : only the record i enters', 530, 505, C.dim, fq, 15);
    const sq = Q(S, 1, 'The squared record weights and the projected pure successor follow', 0.6);
    chip(530, 590, 880, 58, 'Pr(I = i , W = w) = ‖N_w K_f Mᵢ χ_a‖² ,  slice ray [V_f φᵢ]', C.gold, sq, 21);
    const nq = Q(S, 1, 'the global wave function is never collapsed', 0.6);
    chip(530, 700, 880, 58, 'global vector stays  Σᵢ cᵢ(s) ⊗ ηᵢ  — no projection rule', C.green, nq, 22);
    stamp('NO COLLAPSE NEEDED', 1420, 330, nq, C.green, 34, -0.04);
    const mq = Q(S, 1, 'With Bell jumps on the whole carrier', 0.6, 0.8);
    box(1080, 420, 680, 330, C.cyan, mq, 2, 'rgba(0,30,40,0.35)');
    lbl('Monte Carlo of the Bell reader', 1420, 465, C.cyan, mq, 19);
    lbl('record 0 and record 1 , 20000 runs each', 1420, 510, C.white, mq, 17);
    lbl('every report b₁₃ equals b₉', 1420, 565, C.green, mq, 22);
    lbl('at most two jumps per call , at most 30 per reader', 1420, 615, C.white, mq, 16);
    lbl('final tails match |ηᵢ|² within 0.015', 1420, 660, C.white, mq, 16);
    lbl('second call : a jump with frequency ' + fmt79(BELL079['0'].e11, 3), 1420, 710, C.gold, mq, 16);
  }
};

/* ---- 10 DENSITY ---- */
SCENES.density = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'In the full continuous class the answer is no', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Can native conservation alone select the square law', 0.6) * f1;
    chip(530, 268, 880, 62, 'Σ_(q ∈ B) Π_q(Uⱼ(t) z) = Σ_(q ∈ B) Π_q(z)', C.cyan, q, 24);
    lbl('every address j = 0 … 10 , every support component B , every z ≠ 0 , t ∈ [0, 1]', 530, 325, C.dim, q, 15);
    const kq = Q(S, 0, 'Among coherent quartic densities that vanish at nodes', 0.6) * f1;
    chip(530, 420, 880, 60, 'Π_q = ⟨z⊗z , A_q z⊗z⟩ / N² ,  Σ A_q = I ,  z_q = 0 ⇒ Π_q = 0', C.gold, kq, 21);
    lbl('A_q need not be positive : coherent nonnegativity allows det = −ε²/4', 530, 478, C.dim, kq, 15);
    const fq = Q(S, 0, 'conservation on every native component forces Born', 0.6) * f1;
    chip(530, 570, 880, 60, 'forced :  F_q = p_q N ,  Π = Born', C.green, fq, 25);
    lbl('phases die (four distinct diagonals 0 , x² , x , 1) ; the flip graph minus any path stays connected', 530, 628, C.dim, fq, 14);
    const dq = Q(S, 0, 'a node-respecting deformation fails', 0.6) * f1;
    const px = 1080, py = 700, pw = 680, ph = 380, mn = -0.1, mxv = 0.02, xS = v => px + v * pw, yS = v => py - (v - mn) / (mxv - mn) * ph;
    plotAxes(px, py, pw, ph, dq, 't', 'change of the component sum');
    line(px, yS(0), px + pw, yS(0), C.dim, dq * 0.6, 1.2);
    curve(p => { const r = VIOL079[Math.min(VIOL079.length - 1, Math.round(p * (VIOL079.length - 1)))]; return [xS(r[0]), yS(r[1])]; }, VIOL079.length - 1, C.red, dq, 3);
    VIOL079.filter((r, i) => i % 4 === 0).forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'r', dq));
    lbl('−ε x³ sin²(3πt/10) ,  ε = 1/2', xS(0.95), yS(-0.088), C.red, dq, 17, 'right');
    lbl('Π̃ₑ = pₑ/N + ε pₑ pᵣ/N² ,  address 2 , B = {∅ , {2}}', 1420, 760, C.dim, dq, 15);
  }
  const q = Q(S, 1, 'In the full continuous class the answer is no', 0.6, 0.3);
  if (q > 0) {
    const oq = Q(S, 1, 'Thirty-two odd-site sectors with golden eigenvectors', 0.6);
    lbl('odd sectors s ⊆ {1, 3, 5, 7, 9} , 2^m paths each', 500, 262, C.white, oq, 16);
    let k = 0;
    const cols = [C.dim, C.cyan, C.gold, C.mag, C.green];
    for (let m = 4; m >= 0; m--) for (let c = 0; c < MS079[m]; c++) { const xx = 170 + (k % 8) * 80, yy = 300 + Math.floor(k / 8) * 76, qq = clamp(oq * 2 - k / 40), w = 18 + m * 14; fillBox(xx + (80 - w) / 2, yy + (64 - w) / 2, w, w, cols[m], qq * 0.4); rect63(xx + (80 - w) / 2, yy + (64 - w) / 2, w, w, cols[m], qq, 1.5); k++; }
    lbl('32 sectors :  Σ 2^m = 89  (m = 4 : 1 sector , 16 paths)', 500, 625, C.dim, oq, 15);
    lbl('wₛ = Σ x^(m − |r|) (−y)^|r| |s ∪ r⟩ ,  Pⱼ wₛ = eⱼ(s) wₛ for even j', 500, 665, C.cyan, oq, 15);
    const hq = Q(S, 1, 'give a continuous, even smooth, non-Born density', 0.6);
    chip(1290, 268, 900, 62, 'Π = b + ε c h ,  c_q = (−1)^|q| on odd sets ,  0 < ε < 1', C.gold, hq, 21);
    lbl('h = min over s of [x^m |⟨wₛ, z⟩| − ‖vₛ‖]₊² / N ≤ bₛ ;  smooth version with e^(−1/u²)', 1290, 325, C.dim, hq, 14);
    const cq = Q(S, 1, 'that conserves every component', 0.6);
    lbl('odd addresses : components pair opposite parities ;  even addresses : h is invariant', 1290, 385, C.white, cq, 15);
    lbl('300 sampled rays near z* : residual < 10⁻¹² on every component', 1290, 420, C.cyan, cq, 15);
    const wq = Q(S, 1, 'at the witness it exceeds Born by x to the eighth over sixty-four', 0.6);
    chip(1290, 520, 900, 62, 'z* = Σ wₛ / √32 :  Π_∅ − b_∅ = ε x⁸/32 = x⁸/64 = 3.3 × 10⁻⁴', C.mag, wq, 20);
    lbl('all 89 coordinates nonzero ; h = 0 on an open set , so no finite polynomial degree', 1290, 580, C.dim, wq, 15);
    stamp('CONTINUOUS UNIQUENESS FAILS', 1290, 680, wq, C.red, 30, -0.04);
    lbl('quartic rigidity stays ; degree three and above remains open', 1290, 745, C.dim, wq, 15);
  }
};

/* ---- 11 ZERO ---- */
SCENES.zero = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Finally, a deterministic reader', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'any fixed unknown vector in the plane B', 0.6) * f1;
    const cx = 420, cy = 520, R = 190;
    line(cx - R - 30, cy, cx + R + 30, cy, C.dim, q, 1.5); line(cx, cy + R + 30, cx, cy - R - 30, C.dim, q, 1.5);
    lbl('|01000⟩', cx + R + 40, cy + 6, C.cyan, q, 18, 'left'); lbl('|01010⟩', cx, cy - R - 42, C.mag, q, 18);
    const an = 0.35 + 0.2 * Math.sin(t * 0.6);
    arrow(cx, cy, cx + R * Math.cos(an), cy - R * Math.sin(an), C.gold, q, 4); lblG('u_B', cx + R * Math.cos(an) + 16, cy - R * Math.sin(an) - 10, C.gold, q, 24);
    ring(cx, cy, R, C.dim, q * 0.5, 1.2);
    lbl('B = span{ z⁽⁰⁾ , z⁽¹⁾ }', cx, cy + R + 70, C.white, q, 18);
    const nq = Q(S, 0, 'any configuration law on its support, even a non-Born one', 0.6) * f1;
    chip(1290, 268, 900, 58, 'R ∼ ν ,  ν_s > 0 ⇒ u_s ≠ 0 ,  ν ≠ |u|² allowed', C.cyan, nq, 22);
    lbl('u = (1, 1)/√2 with ν = δ₀ or δ₁ : the same global vector , disjoint auxiliary starts', 1290, 325, C.dim, nq, 15);
    dot(cx + R, cy, 13, 'c', nq); dot(cx, cy - R, 13, 'm', nq);
    const lq = Q(S, 0, 'the old source history keeps its law', 0.6) * f1;
    chip(1290, 420, 900, 60, '(F)₊ μ̂ = μ^proj(dh) · R_I^(u,ν)(dr)', C.gold, lq, 23);
    lbl('change of measure dP^ν/dP^eq = ν_s / |u_s|² ≤ 2 keeps every safety property', 1290, 478, C.dim, lq, 15);
    const iq = Q(S, 0, 'B is exactly the common interface', 0.6) * f1;
    chip(1290, 570, 900, 58, 'correct report on all b₉ = 1 columns  ⟺  tail ∈ B', C.green, iq, 22);
    const vq = Q(S, 0, 'B is exactly the common interface', 0.6, 1.2) * f1;
    lbl('v* = 00000 :  n₁₃ D₁ v* = 0 , reports 0 with probability one', 1290, 630, C.red, vq, 17);
    lbl('checked with the 610-path matrices', 1290, 670, C.dim, vq, 14);
  }
  const q = Q(S, 1, 'Finally, a deterministic reader', 0.6, 0.3);
  if (q > 0) {
    chip(530, 268, 880, 60, 'stay while ψ(current) ≠ 0 ; at the first zero , move along the gate edge', C.gold, q, 20);
    lbl('exact zero of the complex amplitude , not a threshold ; no seeds , no hazard', 530, 325, C.dim, q, 15);
    const oq = Q(S, 1, 'Each call makes at most one jump', 0.6);
    lbl('two-point block : the zeros of the two coordinates need ⟨Q⟩ = x² or x , so only one can occur', 530, 380, C.white, oq, 14);
    const tx = 170, tw = 720, cw = tw / 15;
    const rowY = [450, 560];
    [['Bell reader (one sampled run)', BELL079['1'].path0, C.cyan], ['zero-amplitude reader', DET079['1'], C.gold]].forEach(([lab, ev, col], r) => {
      const y = rowY[r], qq = r ? Q(S, 1, 'every report is correct', 0.6) : oq;
      lbl(lab, tx, y - 26, col, qq, 16, 'left');
      line(tx, y, tx + tw, y, C.dim, qq, 2);
      for (let k = 0; k <= 15; k++) line(tx + k * cw, y - 8, tx + k * cw, y + 8, C.dim, qq * 0.6, 1);
      ev.forEach(e => { const xx = tx + (e[0] + e[1]) * cw; dot(xx, y, 9, r ? 'g' : 'c', qq); });
      lbl(ev.length + ' jumps', tx + tw + 14, y + 6, col, qq, 16, 'left');
    });
    lbl('calls 1 … 15 of the half twist , record 1 , start 01000 , u = (1, 0) ; zero-rule jumps sit at call ends', 530, 625, C.dim, oq, 14);
    const bq = Q(S, 1, 'yet in the second call Bell jumps with probability x', 0.6);
    const px = 1180, py = 760, ph = 400;
    plotAxes(px, py, 520, ph, bq, '', 'Pr(jump in call 2)');
    [['Bell', BELL079['1'].e11, C.cyan, 'x = 0.618 (MC ' + fmt79(BELL079['1'].e11, 3) + ')'], ['zero rule', 0, C.gold, '0']].forEach(([lab, v, col, s], i) => { const x = px + 70 + i * 220, h = v * ph; if (v > 0) { fillBox(x, py - h, 140, h, col, bq * 0.45); rect63(x, py - h, 140, h, col, bq, 2); } else line(x, py - 2, x + 140, py - 2, col, bq, 5); lbl(s, x + 70, py - h - 16, col, bq, 16); lbl(lab, x + 70, py + 28, C.white, bq, 16); });
    const rq = Q(S, 1, 'the old law is unchanged', 0.6);
    chip(530, 675, 880, 56, 'all 89 columns report correctly ; old source law = μ^proj', C.green, rq, 21);
    stamp('A NEW MICRO-HISTORY , THE SAME OLD LAW', 530, 795, Q(S, 1, 'and this rule never does', 0.6), C.mag, 24, -0.03);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The joint density theorem of Freedman, Larsen and Wang and the Bell jump-process theorems are published inputs', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['DUTIES', 'C + D ⇒ Born', C.gold, 'duties fix the records'], ['ALPHABET', 'δₙ = γₙ²/32n', C.red, 'no finite alphabet predicts the terminal'], ['ONE EVENT', 'F(s) = s', C.mag, 'one event suffices'], ['JUMPS', '≤ 2 , y = φ^(−1/2)', C.cyan, 'jumps obey a golden bound'], ['RETURN', 'ready return ⟺ q', C.green, 'ready return decides the response'], ['EFFECTS', '1051 · 610', C.vio, 'effects fill block algebras'], ['READER', '15 calls , no collapse', C.gold, 'fifteen calls replace collapse'], ['DENSITY', 'quartic ✓ · continuous ✗', C.red, 'continuous densities need not be Born'], ['ZERO RULE', 'x versus 0', C.cyan, 'a zero-amplitude reader needs no randomness']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 280 + (i % 5) * 340, y = 240 + Math.floor(i / 5) * 120, q = Q(S, 0, ph) * fade; box(x - 150, y, 300, 100, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 38, col, q, 18); lblG(a2, x, y + 76, C.white, q, 18); });
    lbl('PUBLISHED · joint density of Jones representations (Freedman–Larsen–Wang) · Bell-type rates (Dürr–Goldstein–Tumulka–Zanghì) · existence (Georgii–Tumulka)', W / 2, 520, C.cyan, Q(S, 1, 'are published inputs') * fade, 15);
    lbl('CLASSICAL · conditional probability · compactness and finite subcovers · pigeonhole · midpoint convexity · finite-dimensional trace duality', W / 2, 565, '#8fbcff', Q(S, 1, 'are published inputs', 0.6, 0.6) * fade, 15);
    lbl('VOLUME · sector separation · C + D bridge · alphabet exclusion · one-event theorem · two-jump and golden bounds · ready return · effect span · reader factorisation · quartic rigidity · non-Born family · zero rule', W / 2, 610, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · 89 / 610 carriers · found separating words · LP fits · S Kⱼ S⁻¹ · jump Monte Carlo · ranks 1051 , 610 · η on 89 columns · component residuals · zero-rule reports', W / 2, 655, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 740, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    ring89(W / 2, 360, 170, a, t, { r: 6 });
    lblG('C + D ⟺ Born', W / 2, 372, C.white, a, 28);
    txt('AURIC QP IV · READERS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 量子原理 第四部 · 统计守恒、读器与记录历史 · TRURETURING FILM 079', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two duties, one event, fifteen calls, and a reader that moves only at zero.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC QP IV', source: 'ONE SOURCE', bridge: 'TWO DUTIES', alphabet: 'NO FINITE ALPHABET', oneevent: 'ONE EVENT', jumps: 'TWO JUMPS , GOLDEN BOUND', capacity: 'READY RETURN', effects: 'EFFECT SPAN', reader: 'FIFTEEN-CALL READER', density: 'DENSITY QUESTION', zero: 'ZERO-AMPLITUDE READER', finale: 'LEDGER' });

function poster079() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  ring89(470, 500, 250, 1, t, { r: 8 });
  txt('89 paths', 470, 490, { size: 40, fam: FG, w: 700, align: 'center', c: C.white });
  txt('55 + 34', 470, 545, { size: 34, fam: FG, w: 700, align: 'center', c: C.dim });
  txt('C + D  ⟺  mᵢ(a) = ‖Mᵢ K_a R₀v‖²', 1300, 370, { size: 42, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('gate jumps ≤ 2 ,  E[Z] ≤ φ^(−1/2)', 1300, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('quartic: Born · continuous: not unique', 1300, 590, { size: 38, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 量子原理 第四部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC QP IV · READERS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('统 计 守 恒 · 读 器 · 记 录 历 史', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 079', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster079;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
