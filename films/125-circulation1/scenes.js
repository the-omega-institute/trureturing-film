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

/* ---- film 125: AURIC circulation control I ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN THEOREM · CITED IN THE VOLUME', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · NOT SUPPLIED IN THE VOLUME', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po125 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po125.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po125.set(key, off); }
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
const ACT125 = [[0.0, 0.34793], [0.005, 0.3146], [0.01, 0.28858], [0.015, 0.26553], [0.02, 0.24454], [0.025, 0.22517], [0.03, 0.20715], [0.035, 0.1903], [0.04, 0.1745], [0.045, 0.15966], [0.05, 0.1457], [0.055, 0.13256], [0.06, 0.1202], [0.065, 0.10857], [0.07, 0.09764], [0.075, 0.08738], [0.08, 0.07777], [0.085, 0.06879], [0.09, 0.06041], [0.095, 0.05262], [0.1, 0.0454], [0.105, 0.03875], [0.11, 0.03265], [0.115, 0.02709], [0.12, 0.02207], [0.125, 0.01757], [0.13, 0.01359], [0.135, 0.01013], [0.14, 0.00718], [0.145, 0.00474], [0.15, 0.00281], [0.155, 0.00138], [0.16, 0.00045], [0.165, 3e-05], [0.17, 0.00011], [0.175, 0.0007], [0.18, 0.00181], [0.185, 0.00343], [0.19, 0.00556], [0.195, 0.00823], [0.2, 0.01142], [0.205, 0.01516], [0.21, 0.01945], [0.215, 0.02431], [0.22, 0.02974], [0.225, 0.03576], [0.23, 0.0424], [0.235, 0.04967], [0.24, 0.05761], [0.245, 0.06623], [0.25, 0.07558], [0.255, 0.0857], [0.26, 0.09666], [0.265, 0.1085], [0.27, 0.12134], [0.275, 0.13528], [0.28, 0.15049], [0.285, 0.16724], [0.29, 0.18595], [0.295, 0.20755], [0.3, 0.23636]];
const LEGAL125 = [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 1, 1, 0], [1, 0, 1, 1, 0]];
const PSEAM125 = {"Pstar": [[1, 3, 1, 1, 3], [1, 3, 1, 1, 3], [1, 3, 1, 1, 3], [3, 0, 3, 3, 0], [3, 0, 3, 3, 0]], "Pm": [[0, 0, 1, 0, 0], [0, 0, 0, 0, 1], [0, 1, 0, 0, 0], [0, 0, 0, 1, 0], [1, 0, 0, 0, 0]], "Pp": [[0, 0, 0, 0, 1], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0]]};
const CNT125 = [5, 21, 89, 377]; const DIM125 = [0, 12, 76, 360];
const ROB125 = [[5041, 0.80211], [5141, 0.82055], [5241, 0.89803], [5341, 0.89904], [5441, 0.89895], [5541, 0.88009], [5641, 0.81347], [5741, 0.89819], [5841, 0.90672], [5941, 0.83676], [6041, 0.89219], [6141, 0.87862], [6241, 0.92734], [6341, 0.80396], [6441, 0.89777], [6541, 0.87333], [6641, 0.93617], [6741, 0.88181], [6841, 0.83498], [6941, 0.86245], [7041, 0.87142], [7141, 0.90652], [7241, 0.79087], [7341, 0.84021], [7441, 0.79195], [7541, 0.97689], [7641, 0.81913], [7741, 0.85473], [7841, 0.93726], [7941, 0.8614], [8041, 0.84057], [8141, 0.85197], [8241, 0.86564], [8341, 0.93379], [8441, 0.78989], [8541, 0.89855], [8641, 0.82245], [8741, 0.89783], [8841, 0.80983], [8941, 0.85916], [9041, 0.84228], [9141, 0.94949], [9241, 0.75795], [9341, 0.91753], [9441, 0.80661], [9541, 0.83457], [9641, 0.85346], [9741, 0.80757], [9841, 0.8651]]; const ROBMAX125 = [0.976893, 7560];
const KER125 = [1, 5, 14, 30, 55, 91];
const SEC125 = {"U": 6, "V": 5, "R": 12, "k": [0, 1, 2, 3, 4, 5], "pi": [0.00758, 0.11364, 0.37879, 0.37879, 0.11364, 0.00758], "eig": [0, 12, 22, 30, 36, 40]};
const CLK125 = [[0.0, 0.0, 0.0, 0.5, 0.5], [0.04, 0.002, 0.038, 0.54, 0.46], [0.08, 0.006, 0.074, 0.58, 0.42], [0.12, 0.014, 0.107, 0.619, 0.381], [0.16, 0.025, 0.137, 0.657, 0.343], [0.2, 0.039, 0.165, 0.695, 0.305], [0.24, 0.057, 0.191, 0.731, 0.269], [0.28, 0.076, 0.214, 0.766, 0.234], [0.32, 0.099, 0.236, 0.799, 0.201], [0.36, 0.124, 0.257, 0.83, 0.17], [0.4, 0.152, 0.275, 0.859, 0.141], [0.44, 0.181, 0.293, 0.885, 0.115], [0.48, 0.213, 0.309, 0.91, 0.09], [0.52, 0.247, 0.323, 0.931, 0.069], [0.56, 0.282, 0.337, 0.95, 0.05], [0.6, 0.319, 0.349, 0.966, 0.034], [0.64, 0.357, 0.361, 0.979, 0.021], [0.68, 0.395, 0.372, 0.989, 0.011], [0.72, 0.435, 0.382, 0.996, 0.004], [0.76, 0.475, 0.391, 0.999, 0.001], [0.8, 0.515, 0.399, 1.0, 0.0], [0.84, 0.554, 0.407, 0.997, 0.003], [0.88, 0.594, 0.414, 0.991, 0.009], [0.92, 0.633, 0.421, 0.982, 0.018], [0.96, 0.671, 0.427, 0.97, 0.03], [1.0, 0.708, 0.432, 0.955, 0.045], [1.04, 0.744, 0.438, 0.937, 0.063], [1.08, 0.778, 0.442, 0.916, 0.084], [1.12, 0.81, 0.447, 0.892, 0.108], [1.16, 0.841, 0.451, 0.866, 0.134], [1.2, 0.869, 0.455, 0.838, 0.162], [1.24, 0.895, 0.458, 0.807, 0.193], [1.28, 0.918, 0.461, 0.775, 0.225], [1.32, 0.938, 0.464, 0.74, 0.26], [1.36, 0.956, 0.467, 0.705, 0.295], [1.4, 0.971, 0.47, 0.667, 0.333], [1.44, 0.983, 0.472, 0.629, 0.371], [1.48, 0.992, 0.474, 0.59, 0.41], [1.52, 0.997, 0.476, 0.551, 0.449], [1.56, 1.0, 0.478, 0.511, 0.489], [1.6, 0.999, 0.48, 0.471, 0.529], [1.64, 0.995, 0.481, 0.431, 0.569], [1.68, 0.988, 0.483, 0.392, 0.608], [1.72, 0.978, 0.484, 0.353, 0.647], [1.76, 0.965, 0.485, 0.315, 0.685], [1.8, 0.948, 0.486, 0.279, 0.721], [1.84, 0.929, 0.487, 0.244, 0.756], [1.88, 0.907, 0.488, 0.21, 0.79], [1.92, 0.883, 0.489, 0.179, 0.821], [1.96, 0.856, 0.49, 0.149, 0.851], [2.0, 0.827, 0.491, 0.122, 0.878], [2.04, 0.796, 0.492, 0.097, 0.903], [2.08, 0.762, 0.492, 0.074, 0.926], [2.12, 0.728, 0.493, 0.055, 0.945], [2.16, 0.691, 0.493, 0.038, 0.962], [2.2, 0.654, 0.494, 0.024, 0.976], [2.24, 0.615, 0.494, 0.013, 0.987], [2.28, 0.576, 0.495, 0.006, 0.994], [2.32, 0.536, 0.495, 0.001, 0.999], [2.36, 0.496, 0.496, 0.0, 1.0], [2.4, 0.456, 0.496, 0.002, 0.998], [2.44, 0.417, 0.496, 0.007, 0.993], [2.48, 0.377, 0.496, 0.015, 0.985], [2.52, 0.339, 0.497, 0.027, 0.973], [2.56, 0.302, 0.497, 0.041, 0.959], [2.6, 0.266, 0.497, 0.058, 0.942], [2.64, 0.231, 0.497, 0.078, 0.922], [2.68, 0.198, 0.498, 0.101, 0.899], [2.72, 0.167, 0.498, 0.127, 0.873], [2.76, 0.139, 0.498, 0.154, 0.846], [2.8, 0.112, 0.498, 0.184, 0.816], [2.84, 0.088, 0.498, 0.216, 0.784], [2.88, 0.067, 0.498, 0.25, 0.75], [2.92, 0.048, 0.499, 0.286, 0.714], [2.96, 0.033, 0.499, 0.322, 0.678], [3.0, 0.02, 0.499, 0.36, 0.64], [3.04, 0.01, 0.499, 0.399, 0.601], [3.08, 0.004, 0.499, 0.439, 0.561], [3.12, 0.0, 0.499, 0.478, 0.522], [3.16, 0.0, 0.499, 0.518, 0.482], [3.2, 0.003, 0.499, 0.558, 0.442]];
const SWP125 = [[0.0, 0.2, 0.2], [0.0524, 0.2, 0.2042], [0.1047, 0.2, 0.2083], [0.1571, 0.2, 0.2124], [0.2094, 0.2, 0.2163], [0.2618, 0.2, 0.22], [0.3142, 0.2, 0.2235], [0.3665, 0.2, 0.2268], [0.4189, 0.2, 0.2297], [0.4712, 0.2, 0.2324], [0.5236, 0.2, 0.2346], [0.576, 0.2, 0.2365], [0.6283, 0.2, 0.238], [0.6807, 0.2, 0.2391], [0.733, 0.2, 0.2398], [0.7854, 0.2, 0.24], [0.8378, 0.2, 0.2398], [0.8901, 0.2, 0.2391], [0.9425, 0.2, 0.238], [0.9948, 0.2, 0.2365], [1.0472, 0.2, 0.2346], [1.0996, 0.2, 0.2324], [1.1519, 0.2, 0.2297], [1.2043, 0.2, 0.2268], [1.2566, 0.2, 0.2235], [1.309, 0.2, 0.22], [1.3614, 0.2, 0.2163], [1.4137, 0.2, 0.2124], [1.4661, 0.2, 0.2083], [1.5184, 0.2, 0.2042], [1.5708, 0.2, 0.2], [1.6232, 0.2, 0.1958], [1.6755, 0.2, 0.1917], [1.7279, 0.2, 0.1876], [1.7802, 0.2, 0.1837], [1.8326, 0.2, 0.18], [1.885, 0.2, 0.1765], [1.9373, 0.2, 0.1732], [1.9897, 0.2, 0.1703], [2.042, 0.2, 0.1676], [2.0944, 0.2, 0.1654], [2.1468, 0.2, 0.1635], [2.1991, 0.2, 0.162], [2.2515, 0.2, 0.1609], [2.3038, 0.2, 0.1602], [2.3562, 0.2, 0.16], [2.4086, 0.2, 0.1602], [2.4609, 0.2, 0.1609], [2.5133, 0.2, 0.162], [2.5656, 0.2, 0.1635], [2.618, 0.2, 0.1654], [2.6704, 0.2, 0.1676], [2.7227, 0.2, 0.1703], [2.7751, 0.2, 0.1732], [2.8274, 0.2, 0.1765], [2.8798, 0.2, 0.18], [2.9322, 0.2, 0.1837], [2.9845, 0.2, 0.1876], [3.0369, 0.2, 0.1917], [3.0892, 0.2, 0.1958], [3.1416, 0.2, 0.2]];
const REP125 = {"X": 0.3, "Y": 0.25, "Z": 0.4, "kstar": 0.125, "seq": [0.0, 0.075, 0.105, 0.117, 0.1218, 0.12372, 0.124488, 0.124795, 0.124918]};
const MINV125 = {"2,0": 1, "2,1": null, "2,2": null, "2,3": null, "3,0": 1, "3,1": 2, "3,2": null, "3,3": null, "4,0": 1, "4,1": 2, "4,2": null, "4,3": null, "5,0": 1, "5,1": 2, "5,2": 4, "5,3": null, "6,0": 1, "6,1": 2, "6,2": 4, "6,3": null, "7,0": 1, "7,1": 2, "7,2": 4, "7,3": 8};
const FIB125 = [7200, 5040, 3528];
/* ---- film 125 helpers ---- */
function cell125(x, y, w, h, s, col, a, size = 20, fillA = 0.35, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, tc, a, size); }
function poly125(arr, xS, yS, col, a, lw = 3, xi = 0, yi = 1) {
  if (a <= 0 || !arr.length) return;
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  arr.forEach((r, j) => { const x = xS(r[xi]), y = yS(r[yi]); if (j) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
  ctx.stroke(); ctx.globalAlpha = 1;
}
/* three sites in a row, lit sites as gold pearls */
function sites125(x, y, b, a, gap = 34, r = 11, col = 'g') {
  if (a <= 0) return;
  for (let i = 0; i < 3; i++) { const xx = x + (i - 1) * gap; if (b[i] === '1') dot(xx, y, r * 1.4, col, a); else ring(xx, y, r * 0.75, C.dim, a, 2); }
  line(x - gap - r, y + r + 8, x + gap + r, y + r + 8, C.dim, a * 0.5, 1);
}
const ST125 = [['000', '∅', C.white], ['100', '[2]', C.cyan], ['010', '[3]', C.gold], ['001', '[5]', C.orange], ['101', '[2,5]', C.mag]];
/* the bipartite transport graph: left pairs (first two sites) to right pairs (last two sites) */
const TV125 = { L00: [330, 300], R00: [630, 300], L10: [630, 570], R01: [330, 570], L01: [330, 700], R10: [630, 700] };
const TE125 = [['000', 'L00', 'R00', C.cyan, 1], ['100', 'L10', 'R00', C.cyan, -1], ['001', 'L00', 'R01', C.cyan, -1], ['101', 'L10', 'R01', C.cyan, 1], ['010', 'L01', 'R10', C.mag, 0]];
function tgraph125(a, qs, qb, t) {
  if (a <= 0) return;
  TE125.forEach(([s, i, j, col, sg], e) => {
    const P = TV125[i], R2 = TV125[j], hl = sg !== 0 ? qs : qb;
    line(P[0], P[1], R2[0], R2[1], col, a * (0.35 + 0.65 * hl), 2 + 2.5 * hl);
    const mx = (P[0] + R2[0]) / 2, my = (P[1] + R2[1]) / 2, vert = Math.abs(P[0] - R2[0]) < 1;
    const lx = vert ? mx + (mx > 480 ? 22 : -22) : mx, ly = vert ? my + 6 : my + (my > 450 && my < 650 ? 34 : -14);
    lbl(s, lx, ly, col === C.mag ? C.mag : C.white, a, 19, vert ? (mx > 480 ? 'left' : 'right') : 'center');
    if (sg !== 0) lbl(sg > 0 ? '+1' : '−1', lx, ly + 24, sg > 0 ? C.green : C.red, a * qs, 16, vert ? (mx > 480 ? 'left' : 'right') : 'center');
  });
  Object.keys(TV125).forEach(k => { const P = TV125[k]; ring(P[0], P[1], 26, k[0] === 'L' ? C.gold : C.cyan, a, 2.5); lbl(k.slice(1), P[0], P[1] + 7, C.white, a, 19); });
  lbl('gold : first two sites    cyan : last two sites', 480, 245, C.dim, a, 16);
  if (qs > 0) {
    const loop = [TV125.L00, TV125.R00, TV125.L10, TV125.R01, TV125.L00];
    const f = (t * 0.35) % 1, seg = Math.floor(f * 4), w = f * 4 - seg, A2 = loop[seg], B2 = loop[seg + 1];
    dot(A2[0] + (B2[0] - A2[0]) * w, A2[1] + (B2[1] - A2[1]) * w, 16, 'g', a * qs);
  }
}
function interp125(arr, x) { if (x <= arr[0][0]) return arr[0][1]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][1] * (1 - f) + arr[i][1] * f; } return arr[arr.length - 1][1]; }
/* 5x5 seam grid: rows = first window U, columns = next window V, order O L T R J */
const SL125 = ['O', 'L', 'T', 'R', 'J'], SB125 = ['000', '100', '010', '001', '101'];
function sgrid125(x, y, cw, a, valf, o = {}) {
  if (a <= 0) return;
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
    const ok = LEGAL125[i][j], xx = x + j * cw, yy = y + i * cw;
    if (!ok) { fillBox(xx, yy, cw - 4, cw - 4, C.red, a * 0.25); rect63(xx, yy, cw - 4, cw - 4, C.red, a, 1.4); line(xx + 6, yy + 6, xx + cw - 10, yy + cw - 10, C.red, a, 2); line(xx + cw - 10, yy + 6, xx + 6, yy + cw - 10, C.red, a, 2); continue; }
    const v = valf ? valf(i, j) : null;
    fillBox(xx, yy, cw - 4, cw - 4, o.col || C.cyan, a * (v == null ? 0.12 : 0.08 + 0.5 * v)); rect63(xx, yy, cw - 4, cw - 4, o.col || C.cyan, a * 0.8, 1.2);
    if (o.txt) { const s = o.txt(i, j); if (s) lbl(s, xx + (cw - 4) / 2, yy + (cw - 4) / 2 + 6, C.white, a, o.size || 16); }
  }
  if (o.labels !== false) for (let i = 0; i < 5; i++) { lbl(SL125[i], x - 16, y + i * cw + cw / 2 + 4, C.gold, a, o.ls || 17); lbl(SL125[i], x + i * cw + cw / 2 - 2, y - 12, C.cyan, a, o.ls || 17); }
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyr63(480, 430, 280, 0.6 + t * 0.2, s0 * 0.95, { fillBase: 1, bits: true });
  const rq = Q(S, 0, 'give five states', 0.6);
  ST125.forEach(([b, nm, col], i) => { const x = 200 + i * 140, qq = clamp(rq * 1.6 - i / 6); sites125(x, 700, b, qq); lbl(nm, x, 760, col, qq, 18); });
  const items = [['give five states', 'FIVE STATES , NO TWO NEIGHBOURS LIT', '000 · 100 · 010 · 001 · 101', C.cyan], ['Fix how often each site is lit', 'THREE SITE FREQUENCIES', 'X = P(low) , Z = P(middle) , Y = P(high)', C.gold], ['one number is still free', 'ONE FREE NUMBER', 'κ = P(both ends lit) = p₁₃', C.mag], ['This film follows that hidden number', 'ONE HIDDEN RELATION', 'loop · action · binomial · swap', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr63(W / 2, 430, 300, 0.5 + t * 0.25, rp * 0.9, { fillBase: 1, bits: true, lab: 0.7 });
  chip(330, 330, 320, 58, 'one loop', C.cyan, rp, 22); chip(330, 415, 320, 58, 'one KL action', C.gold, rp, 22); chip(330, 500, 320, 58, 'one binomial', C.mag, rp, 22); chip(330, 585, 320, 58, 'one swap', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one relation', 1610, 405, C.cyan, rp, 22); lblG('h = (1, −1, 0, −1, 1)', 1610, 470, C.white, rp, 27);
  txt(scramble('AURIC CIRCULATION I · LOOP', rp, 125), W / 2, 760, { size: 60, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 环 流 控 制 第 一 部 · 一 个 环 、KL 作 用 量 与 四 角 交 换', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 125 · AURIC_FIB_ATOM_CIRCULATION_CONTROL_KL_ACTION_AND_TORIC_RELATIONS', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 ONE LOOP ---- */
SCENES.loop = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'With the boundary fixed', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Read each state as an edge', 0.6) * f1, qs = Q(S, 0, 'close a square', 0.6), qb = Q(S, 0, 'the middle state lies in a second component', 0.6);
    tgraph125(q, qs, qb, t);
    lbl('square loop : 000 , 100 , 101 , 001', 480, 770, C.cyan, qs * f1, 17);
    lbl('010 : the other component', 480, 800, C.mag, qb * f1, 17);
    const cq = Q(S, 0, 'Edges minus vertices plus components', 0.6) * f1;
    chip(1350, 290, 760, 58, 'E = 5 edges : the five states', C.white, cq, 22);
    chip(1350, 365, 760, 58, 'V = 6 vertices : left and right pairs apart', C.gold, cq, 22);
    chip(1350, 440, 760, 58, 'c = 2 connected components', C.mag, cq, 22);
    const dq = Q(S, 0, 'five minus six plus two', 0.6) * f1;
    chip(1350, 530, 760, 66, 'dim ker ∂ = E − V + c = 5 − 6 + 2 = 1', C.green, dq, 25);
    lbl('rank ∂ = V − c = 4 (recomputed)', 1350, 590, C.dim, dq, 16);
    stamp('ONE LOOP', 1350, 700, dq, C.green, 40, -0.05);
  }
  const q = Q(S, 1, 'With the boundary fixed', 0.6, 0.3);
  if (q > 0) {
    const hq = Q(S, 1, 'kappa moves only along the circulation h', 0.6);
    lbl('h = δ₀₀₀ − δ₁₀₀ − δ₀₀₁ + δ₁₀₁', 480, 280, C.gold, hq, 22);
    bars63(190, 480, [1, -1, 0, -1, 1], 76, 42, 120, hq, C.green, null, C.red);
    ST125.forEach(([b, nm, col], i) => { const x = 228 + i * 118, hv = [1, -1, 0, -1, 1][i]; lbl(b, x, 640, col, hq, 18); lbl(hv > 0 ? '+1' : hv < 0 ? '−1' : '0', x, 668, hv > 0 ? C.green : hv < 0 ? C.red : C.dim, hq, 18); });
    lbl('∂h = 0 :  p ↦ p + t h keeps X , Y , Z', 480, 715, C.white, hq, 18);
    lbl('κ = p₁₃ is the edge coordinate ; along fixed boundary it moves by t', 480, 748, C.dim, hq, 15);
    const bq = Q(S, 1, 'Site frequencies cannot see it', 0.6);
    chip(1350, 260, 800, 56, 'ℓ = L(1, X, Y, Z)  ⇒  ℓ(h) = 0 : blind', C.red, bq, 21);
    const rows = [['S = 2x + 3z + 5y', [0, 2, 3, 5, 7], '0', C.red, 'the weighted mean pairs with h to zero'], ['S²', [0, 4, 9, 25, 49], '20', C.green, 'its square to twenty'], ['χ = z + xy', [0, 0, 1, 0, 1], '1', C.green, 'one nonzero pairing recovers kappa']];
    ST125.forEach(([b, nm, col], i) => lbl(b, 1150 + i * 92 + 38, 335, col, bq, 16));
    lbl('⟨·, h⟩', 1690, 335, C.dim, bq, 16);
    rows.forEach(([nm, v, pr, col, ph], j) => { const qq = Q(S, 1, ph, 0.6), y = 355 + j * 92; lblG(nm, 1130, y + 46, C.white, qq, 19, 'right'); v.forEach((x, i) => cell125(1150 + i * 92, y, 78, 70, String(x), C.cyan, qq, 22, 0.2)); cell125(1650, y, 84, 70, pr, col, qq, 26, 0.35); });
    const gq = Q(S, 1, 'one nonzero pairing recovers kappa', 0.6);
    chip(1350, 700, 800, 56, 'R(h) ≠ 0  ⇒  (X, Y, Z, R) recovers κ', C.green, gq, 21);
    lbl('E[S²] = 4X + 9Z + 25Y + 20κ', 1350, 760, C.dim, gq, 16);
  }
};

/* ---- 03 KL ACTION ---- */
SCENES.action = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'No hidden adjustment repairs the base', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'score kappa by its relative entropy', 0.6) * f1;
    const px = 170, py = 760, pw = 720, ph = 430, xS = k => px + k / 0.3 * pw, yS = v => py - v / 0.36 * ph;
    plotAxes(px, py, pw, ph, q, 'κ', 'A(κ) = D_KL( p(κ) ‖ p(κ₀) )');
    poly125(ACT125, xS, yS, C.gold, q, 3);
    [0, 0.1, 0.2, 0.3].forEach(k => lbl(String(k), xS(k), py + 26, C.dim, q, 14));
    lbl('X = 0.5 , Y = 0.3 , Z = 0.1', px + pw, py - ph + 10, C.dim, q, 15, 'right');
    const kq = Q(S, 0, 'kappa zero equals X Y over one minus Z', 0.6) * f1, k0 = 1 / 6;
    dashed(xS(k0), py, xS(k0), py - ph * 0.85, C.green, kq, 1.6); dot(xS(k0), yS(0), 11, 'n', kq);
    lbl('κ₀ = XY/(1 − Z) = 1/6', xS(k0) + 14, py - ph * 0.85, C.green, kq, 18, 'left');
    chip(1360, 270, 820, 58, 'A(κ) = Σ pᵢ(κ) log( pᵢ(κ) / pᵢ(κ₀) )', C.gold, q, 22);
    const sq = Q(S, 0, 'The slope is the log odds ratio', 0.6) * f1;
    chip(1360, 360, 820, 58, "A′(κ) = log( p₀ p₁₃ / (p₁ p₃) ) = log(1 + Δ/(p₁p₃))", C.cyan, sq, 21);
    const cq = Q(S, 0, 'the curvature a sum of four reciprocals', 0.6) * f1;
    chip(1360, 450, 820, 58, 'A″(κ) = 1/p₀ + 1/p₁ + 1/p₃ + 1/p₁₃ > 0', C.mag, cq, 22);
    const uq = Q(S, 0, 'so the minimum is unique', 0.6) * f1;
    stamp('UNIQUE MINIMUM AT κ₀', 1360, 570, uq, C.green, 30, -0.04);
    lbl('interior of the fiber : p₀ , p₁ , p₃ , p₁₃ > 0 and Z < 1', 1360, 650, C.dim, uq, 16);
    lbl('a dimensionless relative entropy , equal to (1 − Z) · I(x ; y | middle off)', 1360, 680, C.dim, uq, 15);
    lbl('recomputed : slope and curvature by finite differences , 200 random laws', 1360, 710, C.dim, uq, 15);
  }
  const q = Q(S, 1, 'No hidden adjustment repairs the base', 0.6, 0.3);
  if (q > 0) {
    const cx = 480, cy = 500, R = 210, P = ringPts(cx, cy, R, 5);
    const wq = Q(S, 1, 'Around a five-cycle', 0.6);
    for (let i = 0; i < 5; i++) { const j = (i + 1) % 5; line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, wq * 0.7, 2.5); }
    const w0 = Math.floor(t * 0.6) % 5;
    [w0, (w0 + 1) % 5, (w0 + 2) % 5].forEach((i, k) => ring(P[i][0], P[i][1], 46, C.gold, wq * 0.8, 3));
    P.forEach((p, i) => { ring(p[0], p[1], 30, C.white, wq, 2); fillEll125(p[0], p[1], 26, wq); lbl('1/2', p[0], p[1] + 7, C.white, wq, 19); });
    lbl('window = three consecutive sites (gold)', cx, cy + R + 70, C.gold, wq, 16);
    chip(1360, 270, 820, 58, 'each window : ½ δ₁₀₁ + ½ δ₀₁₀', C.gold, wq, 23);
    ['101', '010'].forEach((b, k) => { sites125(1180 + k * 360, 360, b, wq, 40, 12); lbl('weight ½', 1180 + k * 360, 410, C.dim, wq, 16); });
    const oq = Q(S, 1, 'all overlaps consistent', 0.6);
    chip(1360, 470, 820, 54, 'overlap of neighbours : ½ (0,1) + ½ (1,0) on both sides', C.cyan, oq, 19);
    const tq = Q(S, 1, 'five halves', 0.6);
    chip(1360, 545, 820, 58, 'site occupancy ½ each  ⇒  total 5/2', C.white, tq, 23);
    const iq = Q(S, 1, 'the largest independent set', 0.6);
    chip(1360, 620, 820, 58, 'any law on independent sets of C₅ : total ≤ 2', C.mag, iq, 22);
    stamp('5/2 > 2 : NO κ FIXES THE BASE', 1360, 735, iq, C.red, 28, -0.04);
  }
};
function fillEll125(x, y, r, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a * 0.5; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(x, y, r, Math.PI / 2, Math.PI * 1.5); ctx.fill(); ctx.restore(); }

/* ---- 04 THE 5040 FIBER ---- */
SCENES.fivek = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'Integers carry a fiber of the same shape', 0.6);
  const cards = [['7200', '2⁵ · 3² · 5²', 'seven thousand two hundred', 0], ['5040', '2⁴ · 3² · 5 · 7', 'five thousand forty', 1], ['3528', '2³ · 3² · 7²', 'three thousand five hundred twenty-eight', 2]];
  cards.forEach(([n, fct, ph, k], i) => {
    const qq = Q(S, 0, ph, 0.5), x = 120 + i * 280;
    box(x, 300, 240, 200, k === 1 ? C.gold : C.cyan, qq, 2, 'rgba(0,0,0,0.5)');
    lbl(n, x + 120, 370, C.white, qq, 40); lblG(fct, x + 120, 420, k === 1 ? C.gold : C.cyan, qq, 21); lbl('κ = a₇ = ' + k, x + 120, 470, C.mag, qq, 19);
    if (i < 2) { const aq = Q(S, 0, 'each step times seven tenths', 0.5); arrow(x + 244, 400, x + 276, 400, C.green, aq, 2.5); lbl('× 7/10', x + 260, 545, C.green, aq, 19); }
  });
  lbl('n(κ) = 2^(u − κ) 3^v 5^(w − κ) 7^κ = 2^u 3^v 5^w (7/10)^κ', 520, 610, C.white, Q(S, 0, 'each step times seven tenths', 0.6), 18);
  const EXP125 = [[5, 2, 2, 0], [4, 2, 1, 1], [3, 2, 0, 2]];
  cards.forEach(([n, fct, ph, k], i) => { const qq = Q(S, 0, ph, 0.5), x = 120 + i * 280; EXP125[i].forEach((e, j) => { const xx = x + 20 + j * 54, h = e * 20; if (e > 0) { fillBox(xx, 760 - h, 40, h, j === 3 ? C.mag : C.cyan, qq * 0.45); rect63(xx, 760 - h, 40, h, j === 3 ? C.mag : C.cyan, qq, 1.4); } lbl(String(e), xx + 20, 752 - h, C.white, qq, 14); lbl(['a₂', 'a₃', 'a₅', 'a₇'][j], xx + 20, 784, C.dim, qq, 15); }); });
  const f1 = 1 - Q(S, 1, 'In the golden ring', 0.6);
  if (f1 > 0) {
    const tq = Q(S, 0, 'Trading two times five for seven', 0.6) * f1;
    chip(1360, 290, 820, 58, '2 · 5 ↔ 7 :  η = (−1, 0, −1, 1) on (a₂, a₃, a₅, a₇)', C.gold, tq, 21);
    const lq = Q(S, 0, 'keeps the leaf counts', 0.6) * f1;
    chip(1360, 380, 820, 58, 'u = a₂ + a₇ = 5 ,  v = a₃ = 2 ,  w = a₅ + a₇ = 2', C.cyan, lq, 22);
    lbl('leaf relation  b₂ + b₅ = b₇ :  [2] + [5] = [2,5]', 1360, 440, C.dim, lq, 16);
    const kq = Q(S, 0, 'moves kappa, the power of seven', 0.6) * f1;
    chip(1360, 510, 820, 58, 'κ ∈ {0, 1, 2} = [0 , min(u, w)]', C.mag, kq, 23);
    const sq = Q(S, 0, 'each step times seven tenths', 0.6) * f1;
    chip(1360, 600, 820, 58, 'n(κ + 1) / n(κ) = 7/10 ,  Δ log n = log(7/10)', C.green, sq, 22);
    lbl('a legal step needs both exponent points inside the box', 1360, 660, C.dim, sq, 15);
  }
  const g = Q(S, 1, 'In the golden ring', 0.6, 0.3);
  if (g > 0) {
    chip(1360, 270, 820, 58, 'ℤ[θ]/(θ² − θ − 1) :  N(a + bθ) = a² + ab − b²', C.gold, g, 21);
    const nq = Q(S, 1, 'have norms one, minus one, one and five', 0.6);
    const at = [['2 ↦ 1', '1'], ['3 ↦ θ', '−1'], ['5 ↦ θ²', '1'], ['7 ↦ 2 + θ', '5']];
    at.forEach(([a1, nv], i) => { const x = 1000 + i * 182; cell125(x, 330, 166, 60, a1, C.cyan, g, 20, 0.2); cell125(x, 400, 166, 54, 'N = ' + nv, i === 3 ? C.mag : C.white, nq, 20, 0.2); });
    lbl('U(a) = 1^a₂ θ^a₃ (θ²)^a₅ (2 + θ)^a₇ ,  N(U) = (−1)^a₃ · 5^a₇', 1360, 510, C.white, nq, 18);
    const vq = Q(S, 1, 'the power of five in the norm reads kappa', 0.6);
    chip(1360, 580, 820, 62, 'v₅( |N(U)| ) = a₇ = κ', C.green, vq, 26);
    const zq = Q(S, 1, 'zero, one, two along this fiber', 0.6);
    cards.forEach(([n, fct, ph, k], i) => { const x = 120 + i * 280; lbl('N(U) = ' + [1, 5, 25][i] + ' , v₅ = ' + k, x + 120, 820, C.green, zq, 18); });
    lbl('the same relation shape on a different carrier ; equality holds for this U', 1360, 650, C.dim, zq, 15);
  }
};

/* ---- 05 TORIC RELATION ---- */
SCENES.toric = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Lifted to monomials', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Among the five pattern columns', 0.6) * f1;
    const cols = [[1, 0, 0, 0], [1, 1, 0, 0], [1, 0, 0, 1], [1, 0, 1, 0], [1, 1, 1, 0]], hd = ['∅', '1', '2', '3', '13'], rl = ['mass', 'X', 'Y', 'Z'];
    const eq = Q(S, 0, 'empty plus joint equals low plus high', 0.6);
    hd.forEach((h, j) => { const col = (j === 0 || j === 4) ? C.cyan : (j === 1 || j === 3) ? C.mag : C.dim; lbl('c' + (h === '∅' ? '∅' : h), 290 + j * 110, 300, eq > 0 ? col : C.gold, q, 20); });
    rl.forEach((r, i) => lbl(r, 220, 352 + i * 76, C.dim, q, 18, 'right'));
    cols.forEach((c, j) => c.forEach((v, i) => { const col = eq > 0 && (j === 0 || j === 4) ? C.cyan : eq > 0 && (j === 1 || j === 3) ? C.mag : C.gold; cell125(250 + j * 110, 318 + i * 76, 84, 64, String(v), col, q, 24, 0.18); }));
    const bq = Q(S, 0, 'both two, one, one, zero', 0.6) * f1;
    chip(530, 660, 760, 58, 'c∅ + c₁₃ = (2, 1, 1, 0) = c₁ + c₃', C.white, bq, 24);
    const mq = Q(S, 0, 'every integer relation is a multiple of one', 0.6) * f1;
    chip(1360, 300, 820, 58, 'Σ rᵢ cᵢ = 0 :  r₂ = 0 , r₁ = r₃ = −r₁₃ , r₀ = r₁₃', C.gold, mq, 21);
    chip(1360, 390, 820, 62, 'ker_ℤ = ℤ · (1, −1, 0, −1, 1) = ℤ h', C.green, mq, 25);
    stamp('RELATION LATTICE OF RANK ONE', 1360, 520, bq, C.green, 28, -0.04);
    lbl('sum of masses fixed, three occupations fixed : one free direction', 1360, 600, C.dim, bq, 16);
  }
  const q = Q(S, 1, 'Lifted to monomials', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 860, 58, 'φ : p₀ ↦ s , p₁ ↦ sx , p₂ ↦ sz , p₃ ↦ sy , p₁₃ ↦ sxy', C.cyan, q, 21);
    lbl('φ(p₀ p₁₃) = s²xy = φ(p₁ p₃)', 530, 335, C.white, q, 19);
    const gq = Q(S, 1, 'generated by one binomial', 0.6);
    chip(530, 410, 860, 66, 'ker φ = ⟨ p₀ p₁₃ − p₁ p₃ ⟩', C.gold, gq, 28);
    lbl('recomputed : Gröbner elimination of s , x , y , z', 530, 470, C.dim, gq, 15);
    const fq = Q(S, 1, 'On the fiber it equals', 0.6);
    chip(530, 550, 860, 62, 'Δ = p₀ p₁₃ − p₁ p₃ = (1 − Z) κ − XY', C.mag, fq, 24);
    const zq = Q(S, 1, 'zero exactly at the independent point', 0.6);
    lbl('for Z < 1 :  Δ = 0  ⇔  κ = κ₀ = XY/(1 − Z)  ⇔  x ⊥ y | middle off', 530, 625, C.green, zq, 17);
    lbl('it cuts out the independence model , not every five-state law', 530, 660, C.dim, zq, 15);
    const px = 1080, py = 740, pw = 660, ph = 380, xS = k => px + k / 0.3 * pw, yS = v => py - (v + 0.16) / 0.3 * ph;
    plotAxes(px, py, pw, ph, fq, '', 'Δ on the fiber'); lbl('X = 0.5 , Y = 0.3 , Z = 0.1', px + pw, py - ph + 10, C.dim, fq, 15, 'right'); lbl('κ', px + pw + 22, py + 6, C.dim, fq, 18);
    line(px, yS(0), px + pw, yS(0), C.dim, fq * 0.6, 1.2);
    curve(p => { const k = p * 0.3; return [xS(k), yS(0.9 * k - 0.15)]; }, 30, C.mag, fq, 3);
    dot(xS(1 / 6), yS(0), 11, 'n', zq); lbl('κ₀ = 1/6', xS(1 / 6), yS(0) - 22, C.green, zq, 18);
    [0, 0.1, 0.2, 0.3].forEach(k => lbl(String(k), xS(k), py + 26, C.dim, fq, 14));
  }
};

/* ---- 06 SEAM MINIMUM ---- */
SCENES.seam = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For uniform marginals', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now join two windows', 0.6) * f1;
    const lq = Q(S, 0, 'may not both be lit', 0.6) * f1;
    sgrid125(260, 330, 86, q, null, { txt: (i, j) => null });
    lbl('U (first window) ↓', 200, 300, C.gold, q, 16, 'right'); lbl('V (next window) →', 470, 290, C.cyan, q, 16);
    SB125.forEach((b, i) => { lbl(b, 150, 330 + i * 86 + 48, C.dim, q, 14, 'right'); });
    chip(480, 790, 640, 52, 'a(U) = last site , b(V) = first site :  a·b = 0', C.red, lq, 20);
    const cq = Q(S, 0, 'leaving twenty-one legal pairs', 0.6) * f1;
    stamp('25 − 4 = 21 LEGAL PAIRS', 1400, 700, cq, C.cyan, 28, -0.04);
    const mq = Q(S, 0, 'With fixed marginals', 0.6) * f1;
    chip(1400, 290, 760, 56, 'r = p_R + p_J ,  s = q_L + q_J ,  c = 1 − r − s', C.gold, mq, 21);
    lbl('legal couplings exist  ⇔  r + s ≤ 1', 1400, 350, C.dim, mq, 16);
    const pq = Q(S, 0, 'one grouped coupling, P star', 0.6) * f1;
    chip(1400, 420, 760, 56, 'P*ᵢⱼ = ρ_ab · αᵢ · βⱼ  (grouped by a , b)', C.cyan, pq, 21);
    const iq = Q(S, 0, 'has the least mutual information', 0.6) * f1;
    chip(1400, 510, 760, 62, 'I_seam = c log c − (1−r) log(1−r) − (1−s) log(1−s)', C.green, iq, 19);
    lbl('I(U ; V) = I_seam + D(P ‖ P*) :  P* is the unique minimiser', 1400, 570, C.white, iq, 16);
    lbl('recomputed : convex max-entropy solves on uniform and random marginals', 1400, 600, C.dim, iq, 15);
  }
  const q = Q(S, 1, 'For uniform marginals', 0.6, 0.3);
  if (q > 0) {
    const uq = Q(S, 1, 'about point two nine one', 0.6);
    chip(W / 2, 260, 1500, 56, 'p = q = (1/5 , … , 1/5) :  r = s = 2/5 ,  I_seam = log 5 − (6/5) log 3 ≈ 0.2911', C.gold, q, 21);
    const tq = Q(S, 1, 'Two other couplings share the marginals', 0.6);
    const panels = [['P* × 45', PSEAM125.Pstar, C.gold, q, '473/8100 ≈ 0.058', 473 / 8100], ['P₋ × 5', PSEAM125.Pm, C.cyan, tq, '−11/20', -0.55], ['P₊ × 5', PSEAM125.Pp, C.mag, tq, '21/20', 1.05]];
    const sq = Q(S, 1, 'yet a five-cycle target scores', 0.6);
    panels.forEach(([nm, M, col, qq, qs, qv], k) => {
      const x = 220 + k * 520, y = 360;
      lbl(nm, x + 150, y - 44, col, qq, 18);
      sgrid125(x, y, 62, qq, (i, j) => M[i][j] ? Math.min(1, M[i][j] / 3) : 0, { col, txt: (i, j) => (M[i][j] ? String(M[i][j]) : ''), size: 15, ls: 14 });
      lbl('Q = ' + qs, x + 150, y + 360, qv < 0 ? C.red : C.green, sq, 22);
    });
    lbl('P₋ , P₊ : same marginals , entropy log 5 , D(P± ‖ P*) = (6/5) log 3', W / 2, 790, C.white, tq, 18);
    lbl('Q(P) = Σ A_ik A_jl P_ij P_kl ,  A = (11/10) 11ᵀ − 2 C₅ on the cycle O − L − T − R − J − O', W / 2, 822, C.dim, sq, 15);
  }
};

/* ---- 07 LONG HISTORY ---- */
SCENES.history = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Legal words of N windows', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Along a chain', 0.6) * f1;
    for (let i = 0; i < 6; i++) { const x = 220 + i * 130; box(x, 270, 100, 60, C.cyan, q, 2, 'rgba(0,0,0,0.45)'); lbl('S' + (i + 1), x + 50, 308, C.white, q, 19); if (i < 5) { line(x + 100, 300, x + 130, 300, C.gold, q, 3); } }
    const sq = Q(S, 0, 'splits into pairing terms and long-history terms', 0.6) * f1;
    chip(W / 2, 390, 1500, 60, 'D(P ‖ Q*_N) = Σᵢ D(Pᵢ ‖ Pᵢ*) + Σᵢ I(Sᵢ₊₁ ; S₁ … Sᵢ₋₁ | Sᵢ)', C.white, sq, 23);
    lbl('pairing beyond the seam reference', 760, 450, C.gold, sq, 17); lbl('long history beyond the Markov completion', 1260, 450, C.mag, sq, 17);
    const wq = Q(S, 0, 'Words of empty and middle windows', 0.6) * f1;
    const words = []; for (let m = 0; m < 8; m++) { const b = [0, 1, 2].map(i => (m >> (2 - i)) & 1); words.push(b); }
    const ev = words.filter(b => (b[0] + b[1] + b[2]) % 2 === 0), od = words.filter(b => (b[0] + b[1] + b[2]) % 2 === 1);
    [[ev, 'even : P_e', C.green, 220], [od, 'odd : P_o', C.mag, 620]].forEach(([ws, nm, col, x]) => {
      lbl(nm, x + 130, 510, col, wq, 19);
      ws.forEach((b, r) => b.forEach((v, i) => cell125(x + 30 + i * 74, 530 + r * 62, 64, 52, v ? 'T' : 'O', v ? C.gold : C.white, wq, 18, v ? 0.35 : 0.1)));
    });
    const pq = Q(S, 0, 'even and odd parity agree on every proper subset', 0.6) * f1;
    chip(1400, 540, 720, 54, 'every proper subset of windows : fair , independent', C.cyan, pq, 19);
    const lq = Q(S, 0, 'yet each lies log two away', 0.6) * f1;
    chip(1400, 620, 720, 58, 'D(P_e ‖ Q*) = D(P_o ‖ Q*) = log 2', C.mag, lq, 23);
    lbl('Q* = fair product 2^(−N) ; all of it long history ; N ≥ 3', 1400, 680, C.dim, lq, 16);
    lbl('E(−1)^#T = +1  versus  −1', 1400, 720, C.white, lq, 18);
  }
  const q = Q(S, 1, 'Legal words of N windows', 0.6, 0.3);
  if (q > 0) {
    const px = 200, py = 760, pw = 860, ph = 420, yS = v => py - v / 400 * ph;
    plotAxes(px, py, pw, ph, q, '', 'count');
    const cq = Q(S, 1, 'five, twenty-one, eighty-nine', 0.8), dq = Q(S, 1, 'zero, twelve, seventy-six', 0.8);
    for (let n = 0; n < 4; n++) {
      const x = px + 60 + n * 200;
      const c1 = CNT125[n], d1 = DIM125[n], qa = clamp(cq * 1.5 - n / 5), qb = clamp(dq * 1.5 - n / 5);
      fillBox(x, yS(c1), 60, py - yS(c1), C.cyan, qa * 0.45); rect63(x, yS(c1), 60, py - yS(c1), C.cyan, qa, 1.6); lbl(String(c1), x + 30, yS(c1) - 10, C.cyan, qa, 20);
      if (d1 > 0) { fillBox(x + 70, yS(d1), 60, py - yS(d1), C.gold, qb * 0.45); rect63(x + 70, yS(d1), 60, py - yS(d1), C.gold, qb, 1.6); }
      lbl(String(d1), x + 100, yS(d1) - 10, C.gold, qb, 20);
      lbl('N = ' + (n + 1), x + 65, py + 28, C.dim, q, 16);
    }
    chip(1420, 300, 680, 58, '|Ω_N| = F(3N + 2)', C.cyan, cq, 25);
    lbl('legal words of 3N sites , no two neighbours lit', 1420, 360, C.dim, cq, 16);
    chip(1420, 450, 680, 58, 'rank of window marginals = 1 + 4N', C.white, dq, 22);
    chip(1420, 540, 680, 58, 'free directions = F(3N + 2) − 1 − 4N', C.gold, dq, 22);
    lbl('fiber dimension at a fully positive law', 1420, 600, C.dim, dq, 16);
    lbl('recomputed by enumeration and rank , N = 1 … 4', 1420, 640, C.dim, dq, 15);
  }
};

/* ---- 08 FINITE ROBIN TARGET ---- */
SCENES.robin = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'A frozen Lean theorem', 'lean'], [1, 'With primes up to thirty-seven', 'theory']]);
  const f1 = 1 - Q(S, 1, 'A frozen Lean theorem', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A finite Robin target keeps every prime address', 0.6) * f1;
    chip(530, 270, 860, 56, 'R(n) = σ(n)/n ,  H(n) = e^γ log log n', C.gold, q, 22);
    const rq = Q(S, 0, 'recursion over the primes up to B', 0.6) * f1;
    const pr = [2, 3, 5, 7, 11, 13, '…', 'p_K'];
    pr.forEach((p, i) => { const x = 170 + i * 102; ring(x, 380, 26, C.cyan, rq, 2); lbl(String(p), x, 387, C.white, rq, 17); if (i < pr.length - 1) arrow(x + 28, 380, x + 72, 380, C.dim, rq, 2); });
    lbl('stage k : choose every exponent a ≥ 0 with m p_k^a ≤ B', 530, 445, C.dim, rq, 16);
    chip(530, 510, 860, 56, 'W_k(m) = max over a of S_p(a) · W_k+1(m p^a)', C.cyan, rq, 21);
    const wq = Q(S, 0, 'returns the largest ratio', 0.6) * f1;
    chip(530, 600, 860, 62, 'W₁(1) = max over 5040 < n ≤ B of R(n) / H(n)', C.green, wq, 23);
    const bq = Q(S, 0, 'below one, Robin holds up to B', 0.6) * f1;
    lbl('W₁(1) < 1  ⇔  σ(n)/n < e^γ log log n for every 5040 < n ≤ B', 530, 670, C.white, bq, 17);
    lbl('Robin (1984) : this for all n > 5040  ⇔  the Riemann hypothesis', 530, 705, C.cyan, bq, 16);
    const px = 1060, py = 740, pw = 700, ph = 400, xS = n => px + (n - 5041) / 5000 * pw, yS = v => py - (v - 0.7) / 0.35 * ph;
    plotAxes(px, py, pw, ph, wq, 'n (5041 … 10000)', 'R(n)/H(n) , max per 100');
    dashed(px, yS(1), px + pw, yS(1), C.red, wq, 2); lbl('1', px - 10, yS(1) + 6, C.red, wq, 16, 'right');
    ROB125.forEach((r, i) => { const qq = clamp(wq * 1.6 - i / 60); fillBox(xS(r[0]), yS(r[1]), 11, py - yS(r[1]), C.gold, qq * 0.5); });
    dot(xS(ROBMAX125[1]), yS(ROBMAX125[0]), 10, 'n', bq);
    lbl('B = 10000 : W₁(1) = ' + ROBMAX125[0].toFixed(5) + ' at n = ' + ROBMAX125[1], px + pw, py - ph + 10, C.green, bq, 16, 'right');
    lbl('recomputed', px + pw, py - ph + 36, C.dim, bq, 14, 'right');
  }
  const q = Q(S, 1, 'A frozen Lean theorem', 0.6, 0.3);
  if (q > 0) {
    box(150, 250, 1620, 130, C.green, q, 2, 'rgba(0,40,20,0.4)');
    lbl('LEAN · FROZEN : D5.S3.Arith.Robin.FewDistinctPrimes.robin_lt_223092870', W / 2, 295, C.green, q, 20);
    lblG('5040 < n < 223092870  ⇒  σ(n)/n < e^γ log log n', W / 2, 348, C.white, q, 27);
    const lx = 200, lw = 1520, ly = 470, xL = v => lx + (Math.log10(v) - 3.6) / (20.5 - 3.6) * lw;
    const pq = Q(S, 1, 'With primes up to thirty-seven', 0.6);
    line(lx, ly, lx + lw, ly, C.dim, q, 2);
    fillBox(xL(5041), ly - 14, xL(223092870) - xL(5041), 28, C.green, q * 0.5); lbl('Lean', (xL(5041) + xL(223092870)) / 2, ly + 46, C.green, q, 17);
    fillBox(xL(223092870), ly - 14, xL(1.8447e19) - xL(223092870), 28, C.vio, pq * 0.45); lbl('open here : needs a finite box certificate', (xL(223092870) + xL(1.8447e19)) / 2, ly + 46, C.vio, pq, 16);
    fillBox(xL(1.8447e19), ly - 14, lx + lw - xL(1.8447e19), 28, C.orange, pq * 0.5); lbl('theory', (xL(1.8447e19) + lx + lw) / 2, ly + 46, C.orange, pq, 17);
    [[5041, '5041'], [223092870, '223092870'], [1.8447e19, '2⁶⁴']].forEach(([v, s]) => { line(xL(v), ly - 22, xL(v), ly + 22, C.white, q, 2); lbl(s, xL(v), ly - 30, C.white, q, 16); });
    lbl('n with all prime factors ≤ 37  (log scale)', lx + lw, ly - 60, C.dim, pq, 15, 'right');
    const sq = Q(S, 1, 'stays below six point seven two four', 0.6);
    chip(560, 600, 800, 58, 'σ(n)/n < ∏_(p ≤ 37) p/(p − 1) = 3212440751/477757440', C.gold, sq, 19);
    lbl('≈ 6.72398 ; every Euler factor is a finite geometric sum', 560, 655, C.dim, sq, 15);
    const tq = Q(S, 1, 'under two stated bounds', 0.6);
    chip(1380, 600, 760, 58, 'e^γ > 89/50 (Lean) ,  log log 2⁶⁴ > 379/100 (stated)', C.cyan, tq, 19);
    const fq = Q(S, 1, 'past two to the sixty-four passes', 0.6);
    chip(1380, 690, 760, 58, '89/50 · 379/100 = 33731/5000 = 6.7462 > 6.72398', C.green, fq, 21);
    lbl('recomputed : e^γ = 1.78107 , log log 2⁶⁴ = 3.79247', 1380, 750, C.dim, fq, 15);
  }
};

/* ---- 09 FOCK SPECTRUM ---- */
SCENES.spectrum = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So each sector has one zero-energy ray', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Lift the relation to five boson modes', 0.6) * f1;
    chip(530, 270, 860, 60, 'Â = a₁a₃ − a₀a₁₃ ,   Ĥ = Â†Â ≥ 0', C.gold, q, 25);
    lbl('B = a₀†a₁₃†a₁a₃ moves occupations by h ; Ĥ keeps N , U , V , W', 530, 330, C.dim, q, 16);
    const cq = Q(S, 0, 'Each fixed-charge sector is a birth-death chain in disguise', 0.6) * f1;
    chip(530, 410, 860, 56, 'sector (m ; U , V , W) ,  R = m − W ,  basis k = n₁₃', C.cyan, cq, 21);
    chip(530, 490, 860, 56, 'βₖ = (U − k)(V − k) ,   δₖ = k (R − U − V + k)', C.cyan, cq, 21);
    const hq = Q(S, 0, 'hypergeometric balance', 0.6) * f1;
    chip(530, 580, 860, 60, 'Ĥ = − S_π L S_π⁻¹ ,  πₖ = C(U,k) C(R−U, V−k) / C(R,V)', C.mag, hq, 20);
    lbl('Bernoulli–Laplace exchange chain (Lim–Pickering , arXiv:1812.01143)', 530, 640, C.dim, hq, 15);
    const sx = 1060, sw = 116, sy = 470, n = SEC125.k.length;
    SEC125.k.forEach((k, i) => { const x = sx + i * sw; ring(x + 40, sy, 24, C.cyan, cq, 2); lbl(String(k), x + 40, sy + 7, C.white, cq, 18); if (i < n - 1) { arrow(x + 66, sy - 10, x + sw + 14, sy - 10, C.gold, cq, 2); arrow(x + sw + 14, sy + 10, x + 66, sy + 10, C.mag, cq, 2); } });
    lbl('U = 6 , V = 5 , R = 12 :  k = 0 … 5', sx + 300, sy - 50, C.white, cq, 18);
    SEC125.pi.forEach((p, i) => { const x = sx + i * sw + 20, h = p * 520; fillBox(x, 740 - h, 40, h, C.mag, hq * 0.5); rect63(x, 740 - h, 40, h, C.mag, hq, 1.4); lbl(p.toFixed(3), x + 20, 735 - h - 8, C.white, hq, 14); });
    lbl('πₖ (hypergeometric)', sx + 300, 775, C.mag, hq, 16);
    const eq = Q(S, 0, 'eigenvalues j times R minus j plus one', 0.6) * f1;
    chip(1400, 290, 720, 58, 'λⱼ = j (R − j + 1) :  ' + SEC125.eig.join(' , '), C.green, eq, 21);
    lbl('recomputed for every sector with m ≤ 12 (3184 sectors)', 1400, 350, C.dim, eq, 15);
  }
  const q = Q(S, 1, 'So each sector has one zero-energy ray', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 860, 58, 'one zero-energy ray per sector ;  gap R when D ≥ 2', C.gold, q, 22);
    const kq = Q(S, 1, 'those rays add up to', 0.6);
    const px = 170, py = 740, pw = 720, ph = 360, yS = v => py - v / 60 * ph;
    plotAxes(px, py, pw, ph, kq, '', 'dim ker Ĥ_m');
    for (let m = 0; m < 5; m++) { const v = KER125[m], x = px + 50 + m * 140, qq = clamp(kq * 1.5 - m / 6); fillBox(x, yS(v), 80, py - yS(v), C.green, qq * 0.45); rect63(x, yS(v), 80, py - yS(v), C.green, qq, 1.6); lbl(String(v), x + 40, yS(v) - 10, C.green, qq, 22); lbl('m = ' + m, x + 40, py + 28, C.dim, kq, 15); }
    lbl('(m + 1)(m + 2)(2m + 3)/6 = C(m+4, 4) − C(m+2, 4)', 530, 800, C.white, kq, 18);
    const lq = Q(S, 1, 'the lattice points of m times the pyramid', 0.6);
    const v = v3(1400, 520, 300, 0.55 + t * 0.15, 0.38), W3 = p => v(p[0] / 2 - 0.5, p[1] / 2 - 0.5, p[2] / 2 - 0.35);
    const Pv = [[0, 0, 0], [2, 0, 0], [2, 2, 0], [0, 2, 0], [0, 0, 2]].map(W3);
    [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4]].forEach(([i, j]) => line(Pv[i][0], Pv[i][1], Pv[j][0], Pv[j][1], C.cyan, lq * 0.6, 1.8));
    const pts = []; for (let X = 0; X <= 2; X++) for (let Y = 0; Y <= 2; Y++) for (let Z = 0; Z <= 2; Z++) if (X + Z <= 2 && Y + Z <= 2) pts.push(W3([X, Y, Z]));
    pts.forEach((p, i) => dot(p[0], p[1], 12, 'g', clamp(lq * 1.6 - i / 20)));
    lbl('m = 2 : 14 lattice points of 2P', 1400, 760, C.gold, lq, 19);
    const gq = Q(S, 1, 'unless trivial, gap R', 0.6);
    lbl('the whole degree-m space has positive gap 2 (m ≥ 2)', 530, 330, C.dim, gq, 16);
  }
};

/* ---- 10 TWO CLOCKS ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const px = 1040, py = 740, pw = 720, ph = 400, xS = x => px + x / 3.2 * pw, yS = v => py - v / 1.05 * ph;
  const f1 = 1 - Q(S, 1, 'The states L plus or minus i R', 0.5);
  if (f1 > 0) {
    const q = Q(S, 0, 'The smallest sector has two states', 0.6) * f1;
    cell125(170, 300, 330, 80, '|L⟩ = |0,1,0,1,0⟩', C.cyan, q, 22, 0.2); cell125(620, 300, 330, 80, '|R⟩ = |1,0,0,0,1⟩', C.mag, q, 22, 0.2);
    lbl('k = 0', 335, 410, C.dim, q, 16); lbl('k = 1', 785, 410, C.dim, q, 16);
    arrow(505, 325, 615, 325, C.gold, q, 2.5); arrow(615, 355, 505, 355, C.gold, q, 2.5); lbl('B , B†', 560, 300, C.gold, q, 16);
    const sq = Q(S, 0, 'spectrum zero and two', 0.6) * f1;
    chip(560, 480, 800, 60, 'Ĥ = ( 1  −1 ; −1  1 ) ,  spec {0 , 2} ,  L = −Ĥ', C.white, sq, 22);
    const uq = Q(S, 0, 'with probability sine squared t', 0.6) * f1;
    chip(560, 570, 800, 58, 'unitary :  P_R(t) = sin² t', C.cyan, uq, 24);
    const mq = Q(S, 0, 'the Markov chain with the same spectrum relaxes', 0.6) * f1;
    chip(560, 650, 800, 58, 'Markov :  P_R(t) = (1 − e^(−2t)) / 2', C.gold, mq, 24);
    plotAxes(px, py, pw, ph, uq, 't', 'P_R(t) from |L⟩');
    line(px, yS(0.5), px + pw, yS(0.5), C.dim, uq * 0.5, 1);
    poly125(CLK125, xS, yS, C.cyan, uq, 3, 0, 1); poly125(CLK125, xS, yS, C.gold, mq, 3, 0, 2);
    lbl('sin² t', xS(1.57), yS(1.0) - 12, C.cyan, uq, 18); lbl('(1 − e^(−2t))/2', xS(2.6), yS(0.5) - 14, C.gold, mq, 17);
  }
  const q = Q(S, 1, 'Same spectrum, different time laws', 0.6);
  if (q > 0) {
    stamp('SAME SPECTRUM , DIFFERENT TIME LAWS', 560, 780, q * f1, C.gold, 26, -0.03);
  }
  const q2 = Q(S, 1, 'The states L plus or minus i R', 0.6, 0.4);
  if (q2 > 0) {
    chip(560, 300, 800, 58, 'Ψ± = ( |L⟩ ± i |R⟩ ) / √2', C.white, q2, 24);
    lbl('both : mean occupations (1/2 , 1/2 , 0 , 1/2 , 1/2)', 560, 365, C.dim, q2, 17);
    const rq = Q(S, 1, 'starts to rise or fall at rate one', 0.6);
    chip(560, 450, 800, 58, 'd⟨n₁₃⟩/dt at t = 0  =  ± 1', C.green, rq, 24);
    lbl('i [Ĥ , n₁₃] = σ_y ;  ⟨n₁₃⟩(t) = (1 ± sin 2t) / 2', 560, 510, C.white, rq, 18);
    stamp('EQUAL AVERAGES , DIFFERENT FUTURES', 560, 640, rq, C.mag, 26, -0.03);
    plotAxes(px, py, pw, ph, q2, 't', '⟨n₁₃⟩ under the same evolution');
    line(px, yS(0.5), px + pw, yS(0.5), C.dim, q2 * 0.5, 1);
    poly125(CLK125, xS, yS, C.green, rq, 3, 0, 3); poly125(CLK125, xS, yS, C.mag, rq, 3, 0, 4);
    lbl('Ψ₊', xS(0.78) + 10, yS(1.0) - 10, C.green, rq, 20); lbl('Ψ₋', xS(0.78) + 10, yS(0.0) + 26, C.mag, rq, 20);
  }
};

/* ---- 11 TWO-COPY SWAP ---- */
SCENES.swap = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So uniform laws with phase zero never move', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With two distinguishable copies', 0.6) * f1;
    const lab = ['0', '1', '2', '3', '13'], gx = 250, gy = 320, cw = 78;
    const xq = Q(S, 0, 'swaps empty and joint for low and high', 0.6) * f1;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const s = lab[i] + ',' + lab[j], act = (s === '0,13' || s === '13,0') ? C.gold : (s === '1,3' || s === '3,1') ? C.mag : null;
      box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, act && xq > 0 ? act : C.dim, q, 1.4, act && xq > 0 ? 'rgba(40,30,0,0.4)' : 'rgba(0,0,0,0.35)');
      lbl(s, gx + j * cw + (cw - 6) / 2, gy + i * cw + cw / 2 + 2, act && xq > 0 ? act : C.dim, q, 14);
    }
    for (let i = 0; i < 5; i++) { lbl(lab[i], gx - 22, gy + i * cw + cw / 2 + 4, C.white, q, 16); lbl(lab[i], gx + i * cw + cw / 2 - 3, gy - 12, C.white, q, 16); }
    lbl('copy 1 ↓ , copy 2 →', gx + 190, gy - 44, C.dim, q, 15);
    const c13 = [gx + 4 * cw + 36, gy + 36], c31 = [gx + 1 * cw + 36, gy + 3 * cw + 36], a = [gx + 3 * cw + 36, gy + 1 * cw + 36], b = [gx + 0 * cw + 36, gy + 4 * cw + 36];
    arrow(a[0] + 4, a[1] - 18, c13[0] - 8, c13[1] + 18, C.gold, xq, 2.5); arrow(c31[0] - 18, c31[1] + 14, b[0] + 18, b[1] - 14, C.gold, xq, 2.5);
    chip(530, 760, 780, 54, 'A = |0,13⟩⟨1,3| + |13,0⟩⟨3,1| ,  V = A + A†', C.gold, xq, 20);
    const kq = Q(S, 0, 'the only smallest exchange keeping mass and all three occupations', 0.6) * f1;
    chip(1400, 270, 760, 56, '[Q_a , V] = 0 : total mass , X , Y , Z kept', C.cyan, kq, 21);
    chip(1400, 345, 760, 56, 'no 1-for-1 ; unique 2-for-2 :  {0 , 13} ↔ {1 , 3}', C.mag, xq, 21);
    const pq = Q(S, 0, 'From two equal preparations', 0.6) * f1;
    chip(1400, 440, 760, 56, '|ψ⟩ ⊗ |ψ⟩ ,  ψₛ = √pₛ e^(−iθₛ) ,  U(u) = e^(−iuV)', C.white, pq, 19);
    const dq = Q(S, 0, 'minus delta sine squared u', 0.6) * f1;
    chip(1400, 530, 760, 62, "p′ = p + δκ · h ,  δκ = −Δ sin² u + R sin χ sin 2u", C.green, dq, 21);
    lbl('Δ = p₀p₁₃ − p₁p₃ ,  R = √(p₀p₁p₃p₁₃) ,  χ = θ₀ − θ₁ − θ₃ + θ₁₃', 1400, 595, C.white, dq, 16);
    lbl('recomputed : exact two-copy evolution , 100 random preparations', 1400, 630, C.dim, dq, 15);
  }
  const q = Q(S, 1, 'So uniform laws with phase zero never move', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 740, pw = 760, ph = 400, xS = x => px + x / Math.PI * pw, yS = v => py - (v - 0.15) / 0.105 * ph;
    plotAxes(px, py, pw, ph, q, '', "κ′ (uniform p = 1/5)"); lbl('u', px + pw + 22, py + 6, C.dim, q, 18);
    poly125(SWP125, xS, yS, C.cyan, q, 3, 0, 1); lbl('χ = 0 : stays 1/5', xS(2.6), yS(0.2) + 26, C.cyan, q, 17);
    const hq = Q(S, 1, 'while phase pi over two gives', 0.6);
    poly125(SWP125, xS, yS, C.gold, hq, 3, 0, 2); lbl('χ = π/2 : 1/5 + sin(2u)/25', xS(0.8) + 20, yS(0.245) - 8, C.gold, hq, 17, 'left');
    dot(xS(Math.PI / 4), yS(0.24), 10, 'n', hq); lbl('u = π/4 : 6/25', xS(Math.PI / 4) - 10, yS(0.24) + 30, C.green, hq, 16, 'right');
    ['0', 'π/2', 'π'].forEach((s, i) => lbl(s, px + i * pw / 2, py + 26, C.dim, q, 15));
    lbl('same probabilities , different relation phase', 550, 800, C.white, hq, 16);
    const rq = Q(S, 1, 'Re-pairing fresh copies each round', 0.6);
    const qx = 1060, qy = 740, qw = 700, qh = 360, nS = n => qx + 30 + n * (qw - 60) / 8, kS = v => qy - v / 0.14 * qh;
    plotAxes(qx, qy, qw, qh, rq, 'round n', 'κₙ');
    dashed(qx, kS(REP125.kstar), qx + qw, kS(REP125.kstar), C.green, rq, 1.6); lbl('κ* = XY/(1 − Z) = 0.125', qx + qw, kS(REP125.kstar) - 12, C.green, rq, 16, 'right');
    REP125.seq.forEach((k, n) => dot(nS(n), kS(k), 9, 'g', clamp(rq * 1.6 - n / 12)));
    lbl('X = 0.3 , Y = 0.25 , Z = 0.4 ; diagonal inputs , u = π/2 , joint state discarded', qx + qw / 2, qy + 60, C.dim, rq, 14);
    const zq = Q(S, 1, 'delta becomes Z times delta', 0.6);
    chip(1410, 290, 700, 58, "κ′ = Zκ + XY ,  Δ′ = Z Δ", C.gold, zq, 25);
    lbl('the same pair swapped again returns its joint law', 1410, 345, C.dim, zq, 15);
  }
};

/* ---- 12 MINIMAL TRADES ---- */
SCENES.trade = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'needs at least two to the r copies per side', 'published'], [0, 'and exists exactly when', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Isolating one moment of order k', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On a path of n sites', 0.6) * f1;
    for (let i = 0; i < 7; i++) { const x = 200 + i * 105; if (i < 6) line(x, 300, x + 105, 300, C.cyan, q, 2.5); ring(x, 300, 20, C.white, q, 2); lbl(String(i + 1), x, 307, C.white, q, 17); }
    lbl('legal set : no two neighbours  (n = 7 : 34 sets)', 515, 360, C.dim, q, 16);
    const mq = Q(S, 0, 'keeping every moment up to order r', 0.6) * f1;
    chip(515, 430, 820, 56, 'Σ over I ⊇ S of c_I = 0  for every |S| ≤ r', C.gold, mq, 22);
    const nq = Q(S, 0, 'needs at least two to the r copies per side', 0.6) * f1;
    const tx = 290, ty = 500, cw = 100, rh = 52;
    for (let n = 2; n <= 7; n++) lbl('n = ' + n, tx + (n - 2) * cw + 45, ty, C.cyan, nq, 16);
    for (let r = 0; r <= 3; r++) {
      lbl('r = ' + r, tx - 20, ty + 28 + r * rh + 26, C.gold, nq, 16, 'right');
      for (let n = 2; n <= 7; n++) { const v = MINV125[n + ',' + r], qq = clamp(nq * 1.6 - (r * 6 + n) / 30); cell125(tx + (n - 2) * cw, ty + 28 + r * rh, 90, rh - 6, v == null ? '—' : String(v), v == null ? C.dim : C.green, qq, 20, v == null ? 0.05 : 0.25); }
    }
    lbl('minimum m(c) by integer programming (recomputed)', 515, ty + 28 + 4 * rh + 24, C.dim, nq, 15);
    chip(1400, 300, 760, 62, 'm(c) = ‖c‖₁ / 2  ≥  2^r', C.green, nq, 26);
    lbl('Boolean-cube trade bound : Ghorbani–Kamali–Khosrovshahi–Krotov', 1400, 365, C.cyan, nq, 15);
    lbl('arXiv:1810.02296 ; legal supports by zero extension', 1400, 390, C.cyan, nq, 15);
    const eq = Q(S, 0, 'and exists exactly when r is below half of n', 0.6) * f1;
    chip(1400, 470, 760, 58, 'nonzero trade exists  ⇔  r < ⌈n/2⌉', C.gold, eq, 24);
    lbl('⌈n/2⌉ = largest legal order ; attained by T = {1, 3, …, 2r + 1}', 1400, 530, C.dim, eq, 15);
  }
  const q = Q(S, 1, 'Isolating one moment of order k', 0.6, 0.3);
  if (q > 0) {
    chip(530, 270, 860, 58, 'only μ_T moves :  c = a · D_T ,  m(c) = |a| · 2^(k − 1)', C.gold, q, 21);
    const L = ['∅', '13', '15', '35'], R2 = ['1', '3', '5', '135'];
    L.forEach((s, i) => cell125(200 + i * 170, 350, 140, 64, s, C.cyan, q, 24, 0.2));
    R2.forEach((s, i) => cell125(200 + i * 170, 470, 140, 64, s, C.mag, q, 24, 0.2));
    lbl('↕  T = {1, 3, 5} : 4 on 4 , all other moments kept', 530, 452, C.white, q, 17);
    const nq = Q(S, 1, 'On nine sites, eighty-nine legal sets', 0.6);
    const ord = [1, 9, 28, 35, 15, 1], px = 1050, py = 700, yS = v => py - v * 8;
    ord.forEach((v, k) => { const x = px + k * 110, qq = clamp(nq * 1.6 - k / 8); fillBox(x, yS(v), 70, v * 8, C.cyan, qq * 0.45); rect63(x, yS(v), 70, v * 8, C.cyan, qq, 1.5); lbl(String(v), x + 35, yS(v) - 10, C.cyan, qq, 19); lbl('k = ' + k, x + 35, py + 26, C.dim, nq, 15); });
    lbl('legal sets on 9 sites by order : total 89', px + 300, py + 60, C.dim, nq, 15);
    const dq = Q(S, 1, 'leave fifty-one directions', 0.6);
    chip(1400, 290, 720, 58, '89 − (1 + 9 + 28) = 51 directions beyond order two', C.green, dq, 20);
    const iq = Q(S, 1, 'isolating orders three, four and five', 0.6);
    [['order 3', '35 targets', '4'], ['order 4', '15 targets', '8'], ['order 5', '1 target', '16']].forEach(([a1, a2, a3], i) => { const y = 580 + i * 62; box(170, y, 720, 52, C.white, iq, 1.2, 'rgba(0,0,0,0.45)'); lbl(a1, 200, y + 34, C.gold, iq, 18, 'left'); lbl(a2, 480, y + 34, C.white, iq, 18); lbl('per side ' + a3, 860, y + 34, C.green, iq, 20, 'right'); });
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'published'], [1, "Robin's inequality below", 'lean'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['LOOP', 'E − V + c = 1', C.cyan, 'One loop and a blind mean'], ['ACTION', 'A″ > 0 , κ₀', C.gold, 'a convex action'], ['5040', '× 7/10 , v₅N = κ', C.mag, 'a seven-tenths step'], ['TORIC', 'p₀p₁₃ − p₁p₃', C.green, 'one binomial'], ['SEAM', 'log 5 − (6/5) log 3', C.cyan, 'a seam minimum'], ['HISTORY', 'log 2 , F(3N + 2)', C.gold, 'long-history parity'],
      ['ROBIN', 'W₁(1) < 1 ⇔ Robin ≤ B', C.mag, 'a finite Robin target'], ['SPECTRUM', 'j (R − j + 1)', C.green, 'a hypergeometric spectrum'], ['CLOCKS', 'sin² t vs Markov', C.cyan, 'two clocks'], ['SWAP', 'Δ′ = Z Δ', C.gold, 'a phase-driven swap'], ['TRADES', '2^r · 4 , 8 , 16', C.mag, 'trades of size two to the r']];
    items.forEach(([a1, a2, col, ph], i) => { const row = i < 6 ? 0 : 1, k = row ? i - 6 : i, n = row ? 5 : 6, x = W / 2 + (k - (n - 1) / 2) * 290, y = 225 + row * 150, q = Q(S, 0, ph) * fade; box(x - 135, y, 270, 125, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 48, col, q, 20); lblG(a2, x, y + 95, C.white, q, 18); });
    lbl("PUBLISHED · Robin's criterion (Robin 1984) · Bernoulli–Laplace chain (Lim–Pickering) · minimal trades (Ghorbani et al.)", W / 2, 565, C.cyan, Q(S, 1, "Robin's criterion") * fade, 15);
    lbl('LEAN · FROZEN · FewDistinctPrimes.robin_lt_223092870 · ElevenSmooth.exp_gamma_lower (cited in §22)', W / 2, 605, C.green, Q(S, 1, 'is frozen in Lean') * fade, 15);
    lbl('VOLUME · cycle space · KL action · base obstruction · 5040 fiber · toric kernel · seam minimum · parity · Robin target · sector chain · two clocks · swap law · trades', W / 2, 645, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · ranks · KL derivatives · Gröbner · convex seam minima · Q values · enumerations · Robin to 10000 · sector spectra · two-copy evolution · integer programs', W / 2, 685, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('THE VOLUME ITSELF IS NOT YET IN THE DIGESTION LEDGER', W / 2, 760, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr63(W / 2, 440, 230, 0.5 + t * 0.2, a * 0.9, { fillBase: 1, bits: true, lab: 0.6 });
    txt('AURIC CIRCULATION I · LOOP', W / 2, 680, { size: 54, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 环流控制 第一部 · 一个环、KL 作用量与四角交换 · TRURETURING FILM 125', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One relation among five states: a loop, an action, a binomial and a swap.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC CIRCULATION I', loop: 'ONE LOOP', action: 'KL ACTION', fivek: '5040 FIBER', toric: 'TORIC RELATION', seam: 'SEAM MINIMUM', history: 'LONG HISTORY', robin: 'FINITE ROBIN TARGET', spectrum: 'FOCK SPECTRUM', clock: 'TWO CLOCKS', swap: 'TWO-COPY SWAP', trade: 'MINIMAL TRADES', finale: 'LEDGER' });

function poster125() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr63(470, 520, 380, 2.2, 1, { fillBase: 1, bits: true });
  txt('E − V + c = 5 − 6 + 2 = 1', 1320, 360, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('ker φ = ⟨ p₀p₁₃ − p₁p₃ ⟩', 1320, 470, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('δκ = −Δ sin²u + R sin χ sin 2u', 1320, 580, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 环流控制 第一部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC CIRCULATION I · LOOP', W / 2, 890, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('一 个 环 · KL 作 用 量 · 四 角 交 换', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 125', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster125;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
