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

/* ---- film 102: AURIC V44–V46 · boundary atlases, squared probabilities and error geometry ---- */
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
const _po102 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po102.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po102.set(key, off); }
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
/* ---- film 102 data (generated by mk102data.py from vis102.json) ---- */
const STAR102 = {"th":[0.0,0.06981317007977318,0.13962634015954636,0.20943951023931956,0.2792526803190927,0.3490658503988659,0.4188790204786391,0.4886921905584123,0.5585053606381855,0.6283185307179586,0.6981317007977318,0.767944870877505,0.8377580409572782,0.9075712110370514,0.9773843811168246,1.0471975511965976,1.117010721276371,1.1868238913561442,1.2566370614359172,1.3264502315156905,1.3962634015954636,1.4660765716752369,1.53588974175501,1.6057029118347832,1.6755160819145565,1.7453292519943295,1.8151424220741028,1.8849555921538759,1.9547687622336491,2.0245819323134224,2.0943951023931953,2.1642082724729685,2.234021442552742,2.303834612632515,2.3736477827122884,2.443460952792061,2.5132741228718345,2.5830872929516078,2.652900463031381,2.722713633111154,2.792526803190927,2.8623399732707004,2.9321531433504737,3.001966313430247,3.07177948351002,3.141592653589793,3.2114058236695664,3.2812189937493397,3.351032163829113,3.420845333908886,3.490658503988659,3.5604716740684323,3.6302848441482056,3.7000980142279785,3.7699111843077517,3.839724354387525,3.9095375244672983,3.9793506945470716,4.049163864626845,4.118977034706618,4.1887902047863905,4.258603374866164,4.328416544945937,4.39822971502571,4.468042885105484,4.537856055185257,4.60766922526503,4.6774823953448035,4.747295565424577,4.817108735504349,4.886921905584122,4.956735075663896,5.026548245743669,5.096361415823442,5.1661745859032155,5.235987755982989,5.305800926062762,5.375614096142535,5.445427266222308,5.515240436302081,5.585053606381854,5.654866776461628,5.724679946541401,5.794493116621174,5.8643062867009474,5.934119456780721,6.003932626860494,6.073745796940266,6.14355896702004,6.213372137099813,6.283185307179586],"R":[1.22,1.24255,1.2524,1.24727,1.22599,1.18878,1.13727,1.07442,1.00437,0.93202,0.86264,0.80137,0.75273,0.72024,0.70602,0.71072,0.73338,0.77166,0.82202,0.88015,0.94142,1.0013,1.05579,1.10178,1.13727,1.16142,1.17457,1.17798,1.17362,1.16377,1.15072,1.13641,1.1222,1.1087,1.09579,1.08264,1.06798,1.05036,1.02843,1.0013,0.96878,0.93158,0.8913,0.85044,0.81217,0.78,0.75745,0.7476,0.75273,0.77401,0.81122,0.86273,0.92558,0.99563,1.06798,1.13736,1.19863,1.24727,1.27976,1.29398,1.28928,1.26662,1.22834,1.17798,1.11985,1.05858,0.9987,0.94421,0.89822,0.86273,0.83858,0.82543,0.82202,0.82638,0.83623,0.84928,0.86359,0.8778,0.8913,0.90421,0.91736,0.93202,0.94964,0.97157,0.9987,1.03122,1.06842,1.1087,1.14956,1.18783,1.22],"Rt":[1.31377,1.31832,1.30892,1.28551,1.24878,1.20011,1.14146,1.07527,1.00438,0.93194,0.8613,0.79591,0.73917,0.69423,0.66378,0.64979,0.65329,0.67418,0.71112,0.76156,0.82189,0.8877,0.9542,1.01671,1.07111,1.11429,1.1445,1.16147,1.16639,1.16166,1.15049,1.13641,1.12264,1.11166,1.10476,1.1019,1.1017,1.10175,1.09902,1.09045,1.07359,1.04712,1.01123,0.96784,0.92044,0.87377,0.83322,0.80412,0.79097,0.79679,0.82254,0.86693,0.92643,0.99565,1.06791,1.13602,1.19317,1.2337,1.25376,1.25173,1.22835,1.18652,1.13086,1.06709,1.00126,0.93904,0.8851,0.84263,0.81315,0.79658,0.79145,0.79536,0.8055,0.81915,0.83412,0.84906,0.86359,0.87825,0.89426,0.91319,0.93662,0.96573,1.00104,1.04216,1.08786,1.13602,1.18397,1.22864,1.26695,1.2961,1.31377],"eps":0.12,"dH":0.1078};
const SPEC102 = {"rho":[0.5,0.3,0.2],"t":0.4,"B":[0.75,0.25,0.0],"purity":0.38};
const POIS102 = {"ang":[0.0,0.0524,0.1047,0.1571,0.2094,0.2618,0.3142,0.3665,0.4189,0.4712,0.5236,0.576,0.6283,0.6807,0.733,0.7854,0.8378,0.8901,0.9425,0.9948,1.0472,1.0996,1.1519,1.2043,1.2566,1.309,1.3614,1.4137,1.4661,1.5184,1.5708,1.6232,1.6755,1.7279,1.7802,1.8326,1.885,1.9373,1.9897,2.042,2.0944,2.1468,2.1991,2.2515,2.3038,2.3562,2.4086,2.4609,2.5133,2.5656,2.618,2.6704,2.7227,2.7751,2.8274,2.8798,2.9322,2.9845,3.0369,3.0892,3.1416],"p0":[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"p4":[3.8889,3.8712,3.8189,3.7346,3.6219,3.4856,3.3309,3.1633,2.9878,2.8089,2.6306,2.456,2.2876,2.127,1.9754,1.8334,1.7013,1.579,1.4663,1.3627,1.2678,1.181,1.1017,1.0293,0.9632,0.903,0.848,0.7979,0.7522,0.7105,0.6723,0.6375,0.6057,0.5766,0.5499,0.5255,0.5032,0.4827,0.464,0.4468,0.4311,0.4167,0.4036,0.3915,0.3805,0.3705,0.3614,0.3532,0.3458,0.3391,0.3331,0.3277,0.3231,0.319,0.3155,0.3126,0.3103,0.3084,0.3072,0.3064,0.3061],"p7":[18.8889,18.3006,16.7083,14.523,12.1783,9.9805,8.0805,6.5154,5.2606,4.2683,3.4876,2.8729,2.3872,2.001,1.6917,1.4423,1.2394,1.0732,0.936,0.8219,0.7263,0.6458,0.5774,0.5191,0.4691,0.4259,0.3885,0.3559,0.3274,0.3024,0.2804,0.2609,0.2436,0.2283,0.2146,0.2023,0.1913,0.1814,0.1726,0.1646,0.1574,0.1509,0.145,0.1397,0.1349,0.1306,0.1267,0.1232,0.1201,0.1173,0.1148,0.1126,0.1107,0.109,0.1076,0.1064,0.1055,0.1047,0.1042,0.1039,0.1038]};
const SCHUR102 = {"lam":1.6936,"G_eig":[1.2541,3.0822],"g2":0.3267,"x2":0.6733,"gGg":1.0};
const OUT102 = {"N":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],"sup":[1.0,0.625,0.390625,0.244141,0.152588,0.095367,0.059605,0.037253,0.023283,0.014552,0.009095,0.005684,0.003553,0.00222,0.001388,0.000867,0.000542,0.000339,0.000212,0.000132,8.3e-05,5.2e-05,3.2e-05,2e-05,1.3e-05,8e-06,5e-06,3e-06,2e-06,1e-06,1e-06],"a":0.5,"b":0.8};
const ATLAS102 = {"w2":[0.6,0.8],"w3":[0.45,-2.1],"n2":[0.6147,0.633,0.4706],"n3":[-0.3778,-0.6461,0.6632],"worst73":0.2721};
const PAIRS102 = {"N":[0.5062,0.5806,0.4654,0.5346,0.4194,0.4938],"labels":["12","13","14","23","24","34"],"sum":3.0,"p":[0.2761,0.2301,0.3045,0.1893]};
const GLUE102 = {"eig":[0.6666666666666666,0.6666666666666666,-0.3333333333333333],"a":[0.5,0.52,0.54,0.56,0.58,0.6,0.62,0.64,0.66,0.68,0.7,0.72,0.74,0.76,0.78,0.8,0.82,0.84,0.86,0.88,0.9,0.92,0.94,0.96,0.98,1.0],"ea":[0.0,-0.0133,-0.0267,-0.04,-0.0533,-0.0667,-0.08,-0.0933,-0.1067,-0.12,-0.1333,-0.1467,-0.16,-0.1733,-0.1867,-0.2,-0.2133,-0.2267,-0.24,-0.2533,-0.2667,-0.28,-0.2933,-0.3067,-0.32,-0.3333]};
const TD102 = [[3,1.0],[4,0.666667],[5,0.5],[6,0.4],[7,0.333333],[8,0.285714]];
const PACK102 = {"N":[1,2,3,4,5,6,7,8,9,10,12,13,15,17,19,21,24,27,30,34,38,42,48,54,60,68,76,86,96,108,122,137,154,173,194,218,245,276,310,349,392,441,495,557,626,704,791,890,1000],"k4":[1.2041,1.9085,2.4082,2.7959,3.1126,3.3804,3.6124,3.817,4.0,4.1656,4.4558,4.5845,4.8165,5.0211,5.2041,5.3697,5.5918,5.7886,5.9654,6.1763,6.3643,6.5339,6.7608,6.9615,7.1413,7.3554,7.546,7.7581,7.9471,8.1497,8.3596,8.5595,8.7613,8.9622,9.1601,9.3618,9.5637,9.7699,9.971,10.1763,10.3776,10.5817,10.7819,10.9865,11.1891,11.3928,11.5949,11.7995,12.0017],"k3":[1.8062,2.5353,3.0,3.3418,3.6124,3.8363,4.0273,4.1938,4.3415,4.4741,4.7046,4.8062,4.9883,5.148,5.2903,5.4185,5.59,5.7414,5.8771,6.0385,6.1821,6.3114,6.4841,6.6366,6.773,6.9353,7.0795,7.2399,7.3827,7.5357,7.694,7.8447,7.9967,8.148,8.297,8.4487,8.6006,8.7557,8.9068,9.0611,9.2123,9.3657,9.5161,9.6697,9.8218,9.9747,10.1264,10.28,10.4318],"Nc":24};
const SQ102 = {"p":[0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2.0,2.05,2.1,2.15,2.2,2.25,2.3,2.35,2.4,2.45,2.5,2.55,2.6,2.65,2.7,2.75,2.8,2.85,2.9,2.95,3.0,3.05,3.1,3.15,3.2,3.25,3.3,3.35,3.4,3.45,3.5,3.55,3.6,3.65,3.7,3.75,3.8,3.85,3.9,3.95,4.0],"third":[0.35286,0.35682,0.36081,0.36482,0.36884,0.37288,0.37695,0.38102,0.38512,0.38923,0.39336,0.3975,0.40166,0.40583,0.41002,0.41421,0.41842,0.42265,0.42688,0.43113,0.43538,0.43965,0.44392,0.4482,0.45249,0.45679,0.46109,0.4654,0.46971,0.47403,0.47835,0.48268,0.48701,0.49134,0.49567,0.5,0.50433,0.50866,0.51299,0.51732,0.52165,0.52597,0.53029,0.5346,0.53891,0.54321,0.54751,0.5518,0.55608,0.56035,0.56462,0.56887,0.57312,0.57735,0.58158,0.58579,0.58998,0.59417,0.59834,0.6025,0.60664,0.61077,0.61488,0.61898,0.62305,0.62712,0.63116,0.63518,0.63919,0.64318,0.64714,0.65109,0.65502,0.65892,0.6628,0.66667]};
const NAT102 = {"odd":[[],[1],[3],[5],[7],[9],[1,3],[1,5],[1,7],[1,9],[3,5],[3,7],[3,9],[5,7],[5,9],[7,9],[1,3,5],[1,3,7],[1,3,9],[1,5,7],[1,5,9],[1,7,9],[3,5,7],[3,5,9],[3,7,9],[5,7,9],[1,3,5,7],[1,3,5,9],[1,3,7,9],[1,5,7,9],[3,5,7,9],[1,3,5,7,9]],"sign":[1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,-1],"active":[0.64714,0.64318,0.63919,0.63518,0.63116,0.62712,0.62305,0.61898,0.61488,0.61077,0.60664,0.6025,0.59834,0.59417,0.58998,0.58579,0.58158,0.57735,0.57312,0.56887,0.56462,0.56035,0.55608,0.5518,0.54751,0.54321,0.53891,0.5346,0.53029,0.52597,0.52165,0.51732,0.51299,0.50866,0.50433,0.5,0.49567,0.49134,0.48701,0.48268,0.47835,0.47403,0.46971,0.4654,0.46109,0.45679,0.45249,0.4482,0.44392,0.43965,0.43538,0.43113,0.42688,0.42265,0.41842,0.41421,0.41002,0.40583,0.40166,0.3975,0.39336,0.38923,0.38512,0.38102,0.37695,0.37288,0.36884,0.36482,0.36081,0.35682,0.35286,0.34891,0.34498,0.34108,0.3372,0.33333]};
const LB102 = {"u":[-3.0,-2.9,-2.8,-2.7,-2.6,-2.5,-2.4,-2.3,-2.2,-2.1,-2.0,-1.9,-1.8,-1.7,-1.6,-1.5,-1.4,-1.3,-1.2,-1.1,-1.0,-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.0],"sech":[0.09933,0.10971,0.12117,0.13381,0.14773,0.16307,0.17995,0.19852,0.21892,0.24129,0.2658,0.29259,0.3218,0.35357,0.38798,0.4251,0.46492,0.50738,0.55229,0.59933,0.64805,0.69779,0.7477,0.79671,0.84355,0.88682,0.92501,0.95663,0.98033,0.99502,1.0,0.99502,0.98033,0.95663,0.92501,0.88682,0.84355,0.79671,0.7477,0.69779,0.64805,0.59933,0.55229,0.50738,0.46492,0.4251,0.38798,0.35357,0.3218,0.29259,0.2658,0.24129,0.21892,0.19852,0.17995,0.16307,0.14773,0.13381,0.12117,0.10971,0.09933],"tanh":[0.99505,0.99396,0.99263,0.99101,0.98903,0.98661,0.98367,0.9801,0.97574,0.97045,0.96403,0.95624,0.94681,0.93541,0.92167,0.90515,0.88535,0.86172,0.83365,0.8005,0.76159,0.7163,0.66404,0.60437,0.53705,0.46212,0.37995,0.29131,0.19738,0.09967,-0.0,-0.09967,-0.19738,-0.29131,-0.37995,-0.46212,-0.53705,-0.60437,-0.66404,-0.7163,-0.76159,-0.8005,-0.83365,-0.86172,-0.88535,-0.90515,-0.92167,-0.93541,-0.94681,-0.95624,-0.96403,-0.97045,-0.97574,-0.9801,-0.98367,-0.98661,-0.98903,-0.99101,-0.99263,-0.99396,-0.99505]};
const REC102 = {"c":[0.0,0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1.0],"same":[0.5,0.525,0.55,0.575,0.6,0.625,0.65,0.675,0.7,0.725,0.75,0.775,0.8,0.825,0.85,0.875,0.9,0.925,0.95,0.975,1.0],"opp":[0.5,0.475,0.45,0.425,0.4,0.375,0.35,0.325,0.3,0.275,0.25,0.225,0.2,0.175,0.15,0.125,0.1,0.075,0.05,0.025,0.0]};
const SER102 = {"resid":[0.666667,0.166667,0.166667,0.010417,0.010417,0.002604,0.002604,0.001017,0.001017,0.000498,0.000498,0.00028,0.00028,0.000173,0.000173,0.000114,0.000114,7.9e-05,7.9e-05,5.7e-05,5.7e-05],"inc":[0.5,0.0,0.15625,0.0,0.007813,0.0,0.001587,0.0,0.000519,0.0,0.000218,0.0,0.000107,0.0,5.9e-05,0.0,3.5e-05,0.0,2.2e-05,0.0,1.5e-05]};
const COND102 = {"eta":[0.001,0.001259,0.001585,0.001995,0.002512,0.003162,0.003981,0.005012,0.00631,0.007943,0.01,0.012589,0.015849,0.019953,0.025119,0.031623,0.039811,0.050119,0.063096,0.079433,0.1,0.125893,0.158489,0.199526,0.251189,0.316228,0.398107,0.501187,0.630957,0.794328,1.0],"inp":[0.002,0.002518,0.00317,0.003991,0.005024,0.006325,0.007962,0.010024,0.012619,0.015887,0.02,0.025179,0.031698,0.039905,0.050238,0.063246,0.079621,0.100237,0.126191,0.158866,0.2,0.251785,0.316979,0.399052,0.502377,0.632456,0.796214,1.002374,1.261915,1.588656,2.0]};
const CLK102 = {"e":[1.0,0.76937,0.69233,0.57746,0.469,0.24199,0.17681,0.12552,0.06442,0.03818,0.03322,0.01541,0.01374],"tau":[-0.0,0.2622,0.3677,0.5491,0.7571,1.4189,1.7327,2.0753,2.7424,3.2655,3.4046,4.173,4.2876]};
const GEO102 = {"s":[0.0,0.0524,0.1047,0.1571,0.2094,0.2618,0.3142,0.3665,0.4189,0.4712,0.5236,0.576,0.6283,0.6807,0.733,0.7854,0.8378,0.8901,0.9425,0.9948,1.0472,1.0996,1.1519,1.2043,1.2566,1.309,1.3614,1.4137,1.4661,1.5184,1.5708],"L":[0.0,0.00274,0.01093,0.02447,0.04323,0.06699,0.09549,0.12843,0.16543,0.20611,0.25,0.29663,0.34549,0.39604,0.44774,0.5,0.55226,0.60396,0.65451,0.70337,0.75,0.79389,0.83457,0.87157,0.90451,0.93301,0.95677,0.97553,0.98907,0.99726,1.0]};
const POW102 = {"a":[0.9,0.6,0.3],"pw":{"1":[0.5,0.3333,0.1667],"2":[0.6429,0.2857,0.0714],"3":[0.75,0.2222,0.0278]}};
const TREE102 = {"theta":{"":0.9,"0":0.6,"1":1.1,"00":0.4,"01":0.8,"10":0.7,"11":1.2},"leaves":{"000":0.2233,"001":0.0399,"010":0.0598,"011":0.0634,"100":0.0739,"101":0.0524,"110":0.064,"111":0.4234}};
/* ---- film 102 helpers ---- */
const TL102 = 0.32;
function sphP102(cx, cy, r, v, rot = 0) { const p = rotZ(v, rot); return [cx + r * p[0], cy - r * (p[2] * Math.cos(TL102) + p[1] * Math.sin(TL102)), -p[1] * Math.cos(TL102) + p[2] * Math.sin(TL102)]; }
function sph102(cx, cy, r, a, rot = 0, col = C.cyan) {
  if (a <= 0) return;
  ring(cx, cy, r, col, a * 0.7, 2);
  ctx.save(); ctx.globalAlpha = a * 0.35; ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(cx, cy, r, r * Math.sin(TL102), 0, 0, TAU); ctx.stroke(); ctx.restore();
  for (let m = 0; m < 2; m++) { const az = rot + m * Math.PI / 2; curve(p => { const th = p * TAU; return sphP102(cx, cy, r, [Math.sin(th) * Math.cos(az), Math.sin(th) * Math.sin(az), Math.cos(th)], 0); }, 60, col, a * 0.22, 1.1); }
  line(cx, cy - r - 12, cx, cy + r + 12, C.dim, a * 0.4, 1);
}
function plot102(px, py, pw, ph, xs, ys, x0, x1, y0, y1, col, a, lw = 3) {
  if (a <= 0) return;
  curve(p => { const i = Math.min(xs.length - 1, Math.round(p * (xs.length - 1))); return [px + (xs[i] - x0) / (x1 - x0) * pw, py - (ys[i] - y0) / (y1 - y0) * ph]; }, xs.length - 1, col, a, lw);
}
function cellG102(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.36, C.white, a, size); }
function lbls102(arr, x, y0, dy, col, a, size = 16, align = 'center') { arr.forEach((s, i) => lbl(s, x, y0 + i * dy, col, a, size, align)); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2), cx = 470, cy = 520, R = 210;
  sph102(cx, cy, R, s0, t * 0.15);
  const fp = clamp((u - 1.5) / 12);
  for (let i = 0; i < 24; i++) {
    const zz = 1 - 2 * (i + 0.5) / 24, rr_ = Math.sqrt(1 - zz * zz), az = i * 2.39996, v = [rr_ * Math.cos(az), rr_ * Math.sin(az), zz];
    const B = sphP102(cx, cy, R, v, t * 0.15);
    dot(B[0], B[1], 9, 'g', s0);
    for (let k = 1; k <= 5; k++) { const q = clamp(fp * 6 - (6 - k)); if (q > 0) { const P = sphP102(cx, cy, R * k / 6, v, t * 0.15); dot(P[0], P[1], 5, 'c', s0 * q * 0.9); } }
  }
  dot(cx, cy, 12, 'w', s0);
  const vq = Q(S, 0, 'Versions forty-one and forty-two', 0.6);
  chip(470, 255, 760, 54, 'V41–V42 : normalisation · observer origins · three axes', C.dim, vq, 18);
  const items = [['rebuilds interiors from boundaries', 'BOUNDARY → INTERIOR', 'cone · Poisson · Cauchy · Schur', C.cyan], ['binary blocks', 'BINARY-BLOCK ATLAS', 'ratios · 2 × 2 blocks · cycles', C.mag], ['why probabilities are squares', 'WHY SQUARES', 'refinement selects w(r) = c r²', C.gold], ['how errors move', 'ERROR GEOMETRY', 'unitaries keep , new records reduce', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 225 + i * 145, 860, 120, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 265 + i * 145, col, q, 21); lblG(s, 1360, 315 + i * 145, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  sph102(W / 2, 410, 175, rp, t * 0.2);
  for (let i = 0; i < 16; i++) { const th = TAU * i / 16, v = [Math.cos(th), Math.sin(th) * 0.2, Math.sin(th)], P = sphP102(W / 2, 410, 175, v, t * 0.2), Pi = sphP102(W / 2, 410, 175 * (0.4 + 0.5 * rnd(i, 3)), v, t * 0.2); dot(P[0], P[1], 8, 'g', rp); dot(Pi[0], Pi[1], 5, 'c', rp * 0.8); }
  chip(330, 360, 330, 58, 'sphere → body', C.cyan, rp, 22); chip(330, 445, 330, 58, 'blocks must agree', C.mag, rp, 22); chip(330, 530, 330, 58, 'w(r) = c r²', C.gold, rp, 24);
  box(1420, 340, 380, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('errors', 1610, 400, C.green, rp, 22); lblG('kept by U , cut by records', 1610, 460, C.white, rp, 22);
  txt(scramble('AURIC V44–V46 · ATLAS', rp, 502), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V44–V46 · 边 界 图 册 、平 方 概 率 与 误 差 几 何', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 102 · AURIC_BOUNDARY_EXTENSION_AND_HIGHER_DIMENSIONAL_RELATIONAL_ATLAS_V44 · AURIC_LOG_RECURSION_SQUARED_PROBABILITIES_AND_ENDOGENOUS_ERROR_GEOMETRY_V46', W / 2, 115, { size: 12, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 0 });
};

/* ---- 02 FILL : stereographic lift, cone filling, density body (V44 §2–§3) ---- */
SCENES.fill = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'any continuous positive radius on it fills', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'For d levels the state body', 0.6);
  if (f1 > 0) {
    const bq = Q(S, 0, 'any continuous positive radius on it fills', 0.6) * f1;
    const cx = 470, cy = 520, sc = 170, th = STAR102.th, R = STAR102.R, Rt = STAR102.Rt;
    const pts = th.map((a, i) => [cx + sc * R[i] * Math.cos(a), cy - sc * R[i] * Math.sin(a)]);
    fillPoly(pts, C.cyan, bq * 0.1); strokePoly(pts, C.cyan, bq, 2.5);
    for (let k = 0; k < 12; k++) { const i = Math.round(k * (th.length - 1) / 12), a = th[i], ex = cx + sc * R[i] * Math.cos(a), ey = cy - sc * R[i] * Math.sin(a); line(cx, cy, ex, ey, C.dim, bq * 0.6, 1.2); [0.33, 0.66].forEach(f => dot(cx + (ex - cx) * f, cy + (ey - cy) * f, 4, 'c', bq * 0.7)); dot(ex, ey, 6, 'g', bq); }
    dot(cx, cy, 9, 'w', bq); lbl('t = 0 : common apex', cx, cy + 34, C.white, bq * 0.8, 15);
    lbl('K_R = { t R(θ) θ : θ ∈ Sⁿ⁻¹ , 0 ≤ t ≤ 1 }', cx, 790, C.cyan, bq, 18);
    const eq = Q(S, 0, 'moving at most epsilon when the radius does', 0.6) * f1;
    const pt2 = th.map((a, i) => [cx + sc * Rt[i] * Math.cos(a), cy - sc * Rt[i] * Math.sin(a)]);
    ctx.save(); ctx.setLineDash([9, 7]); strokePoly(pt2, C.gold, eq, 2.2); ctx.restore();
    lbl('R′ with ‖R − R′‖∞ = 0.12', cx + 150, 280, C.gold, eq, 16);
    const sq = Q(S, 0, 'Inverse stereographic projection lifts real coordinates', 0.6) * f1;
    box(1010, 230, 770, 250, C.cyan, sq, 2, 'rgba(0,25,40,0.35)');
    const ox = 1395, oy = 350, rr = 78;
    ring(ox, oy, rr, C.cyan, sq, 2); line(1050, oy, 1740, oy, C.dim, sq, 1.5); lbl('ℝⁿ⁻¹', 1735, oy - 12, C.dim, sq, 16, 'right');
    const xv = 2.1 + 0.45 * Math.sin(t * 0.5), den = 1 + xv * xv, u1 = 2 * xv / den, u2 = (1 - xv * xv) / den;
    const sx_ = ox, sy_ = oy + rr, px_ = ox + rr * xv, py_ = oy, qx = ox + rr * u1, qy = oy - rr * u2;
    line(sx_, sy_, px_, py_, C.gold, sq * 0.8, 1.6); dot(px_, py_, 8, 'g', sq); dot(qx, qy, 10, 'm', sq); dot(sx_, sy_, 7, 'w', sq * 0.8);
    lbl('x', px_, py_ + 26, C.gold, sq, 17); lbl('S(x)', qx + 14, qy - 10, C.mag, sq, 17, 'left'); lbl('−eₙ', sx_ + 12, sy_ + 18, C.dim, sq, 15, 'left');
    lbl('every n ≥ 2 ;  n = 3 , x = (Re w , Im w) is the Bloch lift', ox, 462, C.dim, sq, 15);
    chip(1395, 525, 770, 54, 'S(x) = (2x , 1 − ‖x‖²) / (1 + ‖x‖²) ,   x = u′ / (1 + uₙ)', C.white, sq, 19);
    chip(1395, 605, 770, 54, '(Sⁿ⁻¹ × [0, 1]) / (Sⁿ⁻¹ × {0})  ≅  K_R ,  ∂K_R = { R(θ) θ }', C.cyan, bq, 18);
    chip(1395, 685, 770, 54, 'd_H(K_R , K_R′) ≤ ‖R − R′‖∞ = ε', C.gold, eq, 22);
    lbl('recomputed : ε = 0.12 , sampled d_H = 0.108 ; concentric spheres attain ε', 1395, 745, C.dim, eq, 15);
    lbl('the radial map x ↦ R(x/‖x‖)x is differentiable at 0 only for constant R', 1395, 775, C.dim, eq, 15);
  }
  const q = Q(S, 1, 'For d levels the state body', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, 'ρ = (1 − t) I/d + t B ,   t = 1 − d λ_min(ρ) ,   λ_min(B) = 0', C.gold, q, 20);
    const groups = [['I/3', [1 / 3, 1 / 3, 1 / 3], C.dim], ['B', SPEC102.B, C.mag], ['ρ', SPEC102.rho, C.cyan]];
    groups.forEach(([nm, v, col], g) => { const qq = clamp(q * 1.6 - g * 0.3), x0 = 170 + g * 280; bars63(x0, 610, v, 50, 18, 300, qq, col, v.map(x => x.toFixed(2))); lblG(nm, x0 + 100, 680, col, qq, 26); });
    lbl('ρ = 0.6 · I/3 + 0.4 · B', 530, 335, C.white, clamp(q * 1.6 - 0.9), 19);
    lbl('spec ρ = (.5 , .3 , .2)  ⇒  t = 2/5 ,  B = (3/4 , 1/4 , 0)', 530, 740, C.white, q, 18);
    lbl('Tr ρ² = 1/d + t² (Tr B² − 1/d) :  0.38 = 1/3 + 0.16 × 0.2917', 530, 778, C.dim, q, 16);
    const dq = Q(S, 1, 'has dimension d squared minus one', 0.6);
    chip(1395, 255, 770, 54, 'dim D_d = d² − 1 ,   D_d ≅ closed ball', C.cyan, dq, 22);
    const rq = Q(S, 1, 'its boundary is every rank-deficient state', 0.6);
    chip(1395, 330, 770, 54, '∂D_d = { rank-deficient states } ≅ sphere', C.green, rq, 21);
    lbl('radius along a traceless unit direction U :  R(U) = −1 / (d λ_min(U))', 1395, 390, C.dim, rq, 15);
    const pq = Q(S, 1, 'Pure states fill it only when d is two', 0.6);
    chip(1395, 450, 770, 54, 'pure states = whole boundary  ⇔  d = 2', C.mag, pq, 21);
    const T = [[1395, 510], [1250, 745], [1540, 745]], mid = [(T[1][0] + T[2][0]) / 2, (T[1][1] + T[2][1]) / 2];
    fillPoly(T, C.cyan, pq * 0.08); strokePoly(T, C.green, pq, 3);
    T.forEach((p, i) => { dot(p[0], p[1], 10, 'g', pq); });
    lbl('e₃', 1420, 512, C.gold, pq, 15, 'left'); lbl('e₁', 1230, 751, C.gold, pq, 15, 'right'); lbl('e₂', 1560, 751, C.gold, pq, 15, 'left');
    dot(mid[0], mid[1], 12, 'm', pq); lbl('diag(½ , ½ , 0)', mid[0], mid[1] + 34, C.mag, pq, 17);
    lbl('d = 3 diagonal slice : corners pure , edges mixed boundary states', 1395, 808, C.dim, pq, 15);
  }
};

/* ---- 03 POISSON (V44 §4) ---- */
SCENES.poisson = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'Averaging a continuous field of boundary states', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Pure qubit boundary states fill the Bloch ball exactly', 0.6);
  if (f1 > 0) {
    const kq = Q(S, 0, 'Inside, use the Poisson kernel', 0.6) * f1;
    const px = 150, py = 740, pw = 760, ph = 420, xS = a => px + a / Math.PI * pw, yS = v => py - v / 20 * ph;
    plotAxes(px, py, pw, ph, kq, 'angle between x and ξ , 0 … π', 'P₃(x , ξ)  on S²');
    [[POIS102.p0, C.cyan, '‖x‖ = 0'], [POIS102.p4, C.gold, '‖x‖ = 0.4'], [POIS102.p7, C.mag, '‖x‖ = 0.7']].forEach(([v, col, lab], j) => { const qq = clamp(kq * 1.6 - j * 0.3); plot102(px, py, pw, ph, POIS102.ang, v, 0, Math.PI, 0, 20, col, qq, 3); lbl(lab, [xS(2.6), xS(0.8), xS(0.36)][j], [yS(1) - 12, yS(2.6), yS(17)][j], col, qq, 16, 'left'); });
    [0, 5, 10, 15, 20].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, kq, 14, 'right'));
    lbl('0', xS(0), py + 26, C.dim, kq, 14); lbl('π/2', xS(Math.PI / 2), py + 26, C.dim, kq, 14);
    chip(1395, 260, 770, 56, 'P_n(x , ξ) = (1 − ‖x‖²) / ‖x − ξ‖ⁿ', C.cyan, kq, 23);
    lbl('P > 0 ,  Δ_x P = 0 ,  ∫ P dσ = 1   (σ of total mass one)', 1395, 320, C.dim, kq, 16);
    const aq = Q(S, 0, 'Averaging a continuous field of boundary states', 0.6) * f1;
    chip(1395, 395, 770, 56, 'ρ_g(x) = ∫ P_n(x , ξ) g(ξ) dσ(ξ) ,   g : Sⁿ⁻¹ → D_d', C.gold, aq, 20);
    const hq = Q(S, 0, 'harmonic entry by entry', 0.6) * f1;
    lbl('harmonic entry by entry  ·  ρ_g ⪰ 0  ·  Tr ρ_g = 1  ·  boundary value g  ·  unique', 1395, 460, C.white, hq, 16);
    const eq = Q(S, 0, 'never enlarges a uniform boundary error', 0.6) * f1;
    chip(1395, 540, 770, 60, 'sup ‖ρ_g − ρ_h‖  ≤  sup ‖g − h‖   (any fixed matrix norm)', C.green, eq, 20);
    lbl('recomputed on the disc , operator norm :', 1395, 600, C.dim, eq, 15);
    lbl('interior 0.066 ≤ boundary 0.106 (d = 2) ,  0.066 ≤ 0.115 (d = 3)', 1395, 625, C.dim, eq, 15);
    lbl('S² quadrature : mass error 8 × 10⁻¹⁵ , Bloch-fill error 1 × 10⁻¹⁴', 1395, 650, C.dim, eq, 15);
    lbl('the scalar Poisson–Dirichlet principle is classical ; the state-valued version is proved in V44', 1395, 720, C.dim, eq, 14);
  }
  const q = Q(S, 1, 'Pure qubit boundary states fill the Bloch ball exactly', 0.6, 0.3);
  if (q > 0) {
    const cx = 470, cy = 500, R = 230;
    sph102(cx, cy, R, q, t * 0.12);
    for (let i = 0; i < 22; i++) {
      const th = Math.acos(1 - 2 * rnd(i, 5)), ph_ = TAU * rnd(i, 9), v = [Math.sin(th) * Math.cos(ph_), Math.sin(th) * Math.sin(ph_), Math.cos(th)];
      const B = sphP102(cx, cy, R, v, t * 0.12); dot(B[0], B[1], 7, 'g', q * (B[2] > 0 ? 1 : 0.45));
      const tt = 0.25 + 0.7 * rnd(i, 13), P = sphP102(cx, cy, R * tt, v, t * 0.12); const qq = clamp(q * 1.6 - i / 30);
      line(cx, cy, P[0], P[1], C.cyan, qq * 0.35, 1.2); dot(P[0], P[1], 6, 'c', qq);
    }
    dot(cx, cy, 10, 'w', q); lbl('I/2', cx + 14, cy + 24, C.white, q, 16, 'left');
    lbl('ρ(t , w) = ½ (I + t S₂(w)·σ) ,  0 ≤ t ≤ 1 ,  w ∈ ℂ ∪ {∞}', cx, 790, C.cyan, q, 18);
    chip(1395, 265, 770, 58, 'g(ξ) = ½(I + ξ·σ)  ⇒  ρ_g(x) = ½(I + x·σ)', C.gold, q, 22);
    lbl('every x in the closed unit ball : every qubit state , exactly once', 1395, 325, C.dim, q, 16);
    const kq = Q(S, 1, "The interior kernel is the boundary's common kernel", 0.6);
    chip(1395, 405, 770, 58, 'ker ρ_g(x) = ∩_ξ ker g(ξ)   for every interior x', C.cyan, kq, 21);
    const rq = Q(S, 1, 'radial steps compose', 0.6);
    chip(1395, 495, 770, 58, '(P_r g)(θ) = ρ_g(rθ) :  P_r P_s = P_rs ,  ‖P_r‖ ≤ 1', C.mag, rq, 21);
    lbl('fresh errors still add up :  e_m ≤ e₀ + Σ η_k', 1395, 555, C.dim, rq, 16);
    const nq = Q(S, 1, 'P r times P s is P r s', 0.6, 0.4);
    box(1010, 600, 770, 160, C.red, nq, 1.5, 'rgba(40,0,10,0.35)');
    lbl('boundary data alone is not a rule :', 1395, 640, C.red, nq, 17);
    lbl('0 and 1 − ‖x‖² agree on the sphere , both real-analytic', 1395, 675, C.white, nq, 16);
    lbl('a constant pure boundary fills only one point ;', 1395, 710, C.dim, nq, 15);
    lbl('a harmonic mean of pure states can be mixed , so it is no unitary', 1395, 735, C.dim, nq, 15);
  }
};

/* ---- 04 INWARD (V44 §5–§6) ---- */
SCENES.inward = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'classical'], [1, 'Outward fails', 'theory']]);
  const f1 = 1 - Q(S, 1, 'In several variables, iterated Cauchy integrals', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'splits an operator into boundary and interior', 0.6) * f1;
    const x0 = 180, y0 = 260, nb = 150, ni = 270;
    cellG102(x0, y0, nb, nb, 'L_BB', C.gold, q, 22); cellG102(x0 + nb + 8, y0, ni, nb, 'L_BI', C.cyan, q, 22);
    cellG102(x0, y0 + nb + 8, nb, ni, 'L_IB', C.cyan, q, 22); cellG102(x0 + nb + 8, y0 + nb + 8, ni, ni, 'L_II', C.vio, q, 24);
    lbl('boundary', x0 + nb / 2, y0 - 12, C.gold, q, 16); lbl('interior', x0 + nb + 8 + ni / 2, y0 - 12, C.vio, q, 16);
    const eq = Q(S, 0, 'Eliminating the interior leaves an effective boundary equation', 0.6) * f1;
    arrow(x0 + nb + 8 + ni / 2, y0 + nb + 8 + ni / 2, x0 + nb / 2 + 10, y0 + nb / 2 + 10, C.white, eq, 3);
    lbl('eliminate the interior', 636, 430, C.white, eq, 17, 'left');
    lbl('x = −R_λ L_IB g', 636, 465, C.cyan, eq, 18, 'left');
    const nq = Q(S, 0, 'the interior norm becomes a boundary metric G', 0.6) * f1;
    const g2 = SCHUR102.g2, x2 = SCHUR102.x2, bw = 700;
    fillBox(180, 720, bw * g2, 40, C.gold, nq * 0.5); rect63(180, 720, bw * g2, 40, C.gold, nq, 1.6);
    fillBox(180 + bw * g2, 720, bw * x2, 40, C.vio, nq * 0.5); rect63(180 + bw * g2, 720, bw * x2, 40, C.vio, nq, 1.6);
    lbl('‖g‖² = ' + g2.toFixed(3), 180 + bw * g2 / 2, 747, C.white, nq, 16); lbl('‖x‖² = ' + x2.toFixed(3), 180 + bw * g2 + bw * x2 / 2, 747, C.white, nq, 16);
    lbl('random 5 × 5 example , λ = ' + SCHUR102.lam.toFixed(4) + ' :  g†Gg = 1.000000', 530, 795, C.dim, nq, 15);
    chip(1395, 260, 770, 56, 'λ ∉ spec L_II ,   R_λ = (L_II − λ)⁻¹', C.white, q, 21);
    chip(1395, 340, 770, 56, 'K_eff(λ) g = λ g ,  K_eff = L_BB − L_BI R_λ L_IB', C.cyan, eq, 20);
    chip(1395, 420, 770, 56, '‖g‖² + ‖x‖² = g† G g ,  G = I − K_eff′(λ)', C.gold, nq, 21);
    const iq = Q(S, 0, 'never below the identity', 0.6) * f1;
    const by = 690, ev = SCHUR102.G_eig, hs = 60;
    line(1150, by - hs, 1640, by - hs, C.green, iq, 2); lbl('1', 1135, by - hs + 6, C.green, iq, 16, 'right');
    ev.forEach((v, i) => { const x = 1270 + i * 170, h = v * hs; fillBox(x, by - h, 90, h, C.gold, iq * 0.45); rect63(x, by - h, 90, h, C.gold, iq, 1.6); lbl(v.toFixed(3), x + 45, by - h - 10, C.white, iq, 16); });
    line(1150, by, 1640, by, C.dim, iq, 1.2);
    lbl('eigenvalues of G for the example : both ≥ 1', 1395, by + 28, C.dim, iq, 14);
    lbl('stability √(1 + ‖L_IB‖² / γ²) , γ = gap ;  L = λI₃ hides e₂ , e₃ from the boundary', 1395, 765, C.dim, iq, 14);
    stamp('G ⪰ I', 1650, 560, iq, C.green, 30, -0.05);
  }
  const q = Q(S, 1, 'In several variables, iterated Cauchy integrals', 0.6, 0.3);
  if (q > 0) {
    [[300, 'ζ₁'], [640, 'ζ₂']].forEach(([cx, nm], j) => { const cy = 450; ring(cx, cy, 125, C.cyan, q, 3); ring(cx, cy, 70, C.dim, q * 0.7, 1.4); dashed(cx - 140, cy, cx + 140, cy, C.dim, q * 0.4, 1); const an = t * 0.6 + j; dot(cx + 125 * Math.cos(an), cy - 125 * Math.sin(an), 9, 'c', q); dot(cx + 42 * Math.cos(-an * 0.7), cy - 42 * Math.sin(-an * 0.7), 8, 'g', q); lblG('|' + nm + '| = 1', cx, cy + 160, C.cyan, q, 20); });
    lbl('distinguished boundary T² ;  z ∈ 𝔻² (gold)', 470, 290, C.white, q, 17);
    chip(470, 660, 860, 56, 'F(z) = (2πi)⁻ᵐ ∮ … ∮ F(ζ) / ∏ (ζ_j − z_j) dζ_m … dζ₁', C.white, q, 19);
    lbl('sup over the closed polydisc |F − H|  ≤  sup over Tᵐ |F − H|', 470, 720, C.green, q, 17);
    lbl('one slice decides nothing : f(z₁) + z₂ H(z₁ , z₂) agrees on z₂ = 0 for every H', 470, 755, C.dim, q, 14);
    lbl('ζ̄ on the circle has a harmonic but no holomorphic extension', 470, 785, C.dim, q, 14);
    const oq = Q(S, 1, 'Outward fails', 0.6);
    chip(1395, 260, 770, 56, 'f_N(z) = (z / b)ᴺ ,   a = 0.5 ,  b = 0.8', C.gold, oq, 22);
    const px = 1040, py = 730, pw = 700, ph = 370, xS = n => px + n / 30 * pw, yS = v => py - v / 1.15 * ph;
    plotAxes(px, py, pw, ph, oq, 'N', 'value');
    OUT102.N.forEach((n, i) => { const qq = clamp(oq * 1.6 - i / 40); dot(xS(n), yS(OUT102.sup[i]), 6, 'g', qq); });
    curve(p => { const n = p * 30; return [xS(n), yS(Math.pow(0.625, n))]; }, 90, C.gold, oq, 2.5);
    lbl('sup over |z| ≤ a of |f_N| = (a/b)ᴺ → 0', xS(3), yS(0.78), C.gold, oq, 16, 'left');
    const bq = Q(S, 1, 'yet equals one at b', 0.6);
    line(xS(0), yS(1), xS(30), yS(1), C.red, bq, 3); lbl('f_N(b) = 1 for every N', xS(29), yS(1) - 14, C.red, bq, 17, 'right');
    [0, 10, 20].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, oq, 14));
    lbl('(a/b)³⁰ = 7.5 × 10⁻⁷', xS(29), yS(0.08) - 6, C.dim, bq, 15, 'right');
    stamp('OUTWARD IS NOT STABLE', 1470, 615, Q(S, 1, 'yet equals one at b', 0.6, 0.3), C.red, 24, -0.04);
  }
};

/* ---- 05 ATLAS (V44 §7–§8) ---- */
SCENES.atlas = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Mixed states unfold into all two-by-two principal blocks', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'divide by one reference amplitude', 0.6) * f1;
    lbl('d = 3 :  ψ ∝ (1 , w₂ , w₃) ,  reference = first component', 470, 270, C.white, q, 18);
    const sp2 = [[ATLAS102.n2, 'w₂ = 0.6 e^(0.8i)', C.gold, 'g'], [ATLAS102.n3, 'w₃ = 0.45 e^(−2.1i)', C.mag, 'm']];
    const bq = Q(S, 0, 'each a point on its own Bloch sphere', 0.6) * f1;
    sp2.forEach(([n, lab, col, dn], j) => { const cx = 290 + j * 360, cy = 470, R = 135; sph102(cx, cy, R, q, 0.4 + t * 0.1); const P = sphP102(cx, cy, R, n, 0.4 + t * 0.1); line(cx, cy, P[0], P[1], col, bq, 3); dot(P[0], P[1], 12, dn, bq); lblG(lab, cx, cy + R + 50, col, bq, 20); lblG('S₂(w) = ' + '(' + n.map(x => x.toFixed(2)).join(' , ') + ')', cx, cy + R + 80, C.dim, bq, 15); });
    const fq = Q(S, 0, 'fix the state', 0.6) * f1;
    lbl('two sphere points fix the ray : 4 real degrees of freedom', 470, 760, C.green, fq, 17);
    chip(1395, 260, 770, 56, 'w_j = α_j / α_k ,  Bloch point of τ_kj = S₂(w_j)', C.gold, q, 20);
    chip(1395, 335, 770, 56, 'ψ ~ (w₁ , … , w_d) / √(Σ |w_i|²) ∈ CPᵈ⁻¹ :  2d − 2 real', C.cyan, fq, 19);
    lbl('change of chart :  w_j(ℓ) = w_j(k) / w_ℓ(k) , holomorphic on overlaps', 1395, 392, C.dim, fq, 15);
    const cq = Q(S, 0, 'Ratios on a graph come from one state', 0.6) * f1;
    const cyq = Q(S, 0, 'every cycle multiplies to one', 0.6) * f1;
    const cx = 1395, cy = 560, R = 115, P = [0, 1, 2, 3].map(i => [cx + R * Math.cos(Math.PI / 4 + i * Math.PI / 2 + Math.PI), cy - R * Math.sin(Math.PI / 4 + i * Math.PI / 2 + Math.PI)]);
    [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]].forEach(([i, j], e) => { const hot = e < 4; line(P[i][0], P[i][1], P[j][0], P[j][1], hot && cyq > 0 ? C.green : C.cyan, cq * (hot ? 0.9 : 0.5), hot ? 3.5 * Math.max(cq, cyq) : 2); const mx = (P[i][0] + P[j][0]) / 2, my = (P[i][1] + P[j][1]) / 2; lbl('w' + (i + 1) + (j + 1), mx + (e === 4 ? 26 : (mx - cx) * 0.25), my + (e === 4 ? -6 : (my - cy) * 0.25 + 6), C.white, cq, 15); });
    P.forEach((p, i) => { ring(p[0], p[1], 20, C.white, cq, 2); lbl('α' + (i + 1), p[0], p[1] + 6, C.white, cq, 15); });
    chip(1395, 740, 770, 56, 'consistent  ⇔  ∏_cycle w_ij = 1 ;  a tree then gives the ray', C.green, cyq, 18);
    lbl('max-modulus chart : ½‖ρ − ρ′‖₁ ≤ 2 (Σ ‖n_j − n′_j‖²)^½  (sampled max ratio 0.27)', 1395, 795, C.dim, cyq, 14);
  }
  const q = Q(S, 1, 'Mixed states unfold into all two-by-two principal blocks', 0.6, 0.3);
  if (q > 0) {
    const gx = 230, gy = 280, cw = 92, pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
    const k = Math.floor((u - lineAt(S, 1).s) / 1.1) % 6, pr = pairs[(k + 6) % 6];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const on = (i === pr[0] || i === pr[1]) && (j === pr[0] || j === pr[1]); const col = on ? C.gold : i === j ? C.cyan : C.dim; box(gx + j * cw, gy + i * cw, cw - 8, cw - 8, col, q * (on ? 1 : 0.7), on ? 2.5 : 1.4, on ? 'rgba(60,45,0,0.5)' : 'rgba(0,0,0,0.45)'); lblG(i === j ? 'p' + (i + 1) : 'ρ' + (i + 1) + (j + 1), gx + j * cw + (cw - 8) / 2, gy + i * cw + (cw - 8) / 2 + 7, col, q, 18); }
    lbl('B' + (pr[0] + 1) + (pr[1] + 1), gx + 4 * cw + 30, gy + 2 * cw - 10, C.gold, q, 22, 'left'); lbl('= N (I + r·σ) / 2', gx + 4 * cw + 30, gy + 2 * cw + 22, C.gold, q, 17, 'left');
    const rq = Q(S, 1, 'rebuilds rho', 0.6);
    chip(470, 690, 860, 58, 'ρ = Σ_(i<j) ι_ij B_ij ι_ij†  −  (d − 2) diag(p₁ , … , p_d)', C.cyan, rq, 20);
    lbl('each off-diagonal entry appears once , each diagonal entry d − 1 times', 470, 745, C.dim, rq, 15);
    lbl('blocks are amplitude channels , not two-body reductions (GHZ± differ here)', 470, 775, C.dim, rq, 15);
    const mq = Q(S, 1, 'the block masses add up to d minus one', 0.6);
    lbl('N_ij = p_i + p_j for a random d = 4 state', 1395, 270, C.white, mq, 17);
    bars63(1080, 520, PAIRS102.N, 70, 38, 360, mq, C.gold, PAIRS102.labels);
    PAIRS102.N.forEach((v, i) => lbl(v.toFixed(3), 1080 + i * 108 + 35, 520 - v * 360 - 10, C.white, mq, 14));
    chip(1395, 600, 770, 54, 'Σ N_ij = d − 1 = 3   (recomputed ' + PAIRS102.sum.toFixed(4) + ')', C.gold, mq, 21);
    const eq = Q(S, 1, 'squared block errors bound the global error both ways', 0.6);
    chip(1395, 680, 770, 56, 'Σ ‖ΔB_ij‖² = ‖Δ‖² + (d − 2) Σ |Δ_ii|²', C.green, eq, 21);
    lbl('⇒  Σ ‖ΔB‖² / (d − 1)  ≤  ‖Δ‖²  ≤  Σ ‖ΔB‖² ;   ‖ΔB‖² = ((ΔN)² + ‖Δv‖²) / 2', 1395, 740, C.dim, eq, 15);
  }
};

/* ---- 06 GLUE (V44 §9, §11) ---- */
SCENES.glue = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'classical'], [1, 'For operator axes', 'theory']]);
  const f1 = 1 - Q(S, 1, 'The global test is a singular Schur recursion', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'One third of the matrix with ones on the diagonal', 0.6) * f1;
    const gx = 210, gy = 300, cw = 108;
    lblG('M = ⅓ ×', gx - 20, gy + 1.5 * cw + 8, C.white, q, 24, 'right');
    const bq = Q(S, 0, 'positive two-by-two blocks', 0.6) * f1, pairs = [[0, 1], [0, 2], [1, 2]];
    const k = Math.floor(Math.max(0, u - lineAt(S, 0).s) / 0.9) % 3, pr = pairs[k];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const on = bq > 0 && (i === pr[0] || i === pr[1]) && (j === pr[0] || j === pr[1]); const col = on ? C.green : i === j ? C.cyan : C.mag; box(gx + j * cw, gy + i * cw, cw - 8, cw - 8, col, q, on ? 2.6 : 1.5, on ? 'rgba(0,50,25,0.5)' : 'rgba(0,0,0,0.45)'); lbl(i === j ? '1' : '−1', gx + j * cw + 50, gy + i * cw + 60, col, q, 26); }
    lbl('2 × 2 block  ⅓[1 −1 ; −1 1] ⪰ 0  ✓', gx + 1.5 * cw, gy - 18, C.green, bq, 17);
    lbl('Tr M = 1 ;  every conditional Bloch point (−1 , 0 , 0)', gx + 1.5 * cw, gy + 3 * cw + 30, C.dim, bq, 15);
    const eq = Q(S, 0, 'yet eigenvalue minus one third along all-ones', 0.6) * f1;
    bars63(640, 560, GLUE102.eig, 62, 28, 270, eq, C.cyan, ['2/3', '2/3', '−1/3']);
    lbl('spectrum of M', 755, 360, C.white, eq, 17);
    chip(470, 740, 860, 56, 'v = (1 , 1 , 1) :  M v = −v/3 ,  v†M v = −1  ⇒  M is not a state', C.red, eq, 19);
    const cq = Q(S, 0, 'its ratio cycle gives minus one', 0.6) * f1;
    const T = [[1395, 260], [1245, 480], [1545, 480]];
    [[0, 1], [1, 2], [2, 0]].forEach(([i, j]) => { line(T[i][0], T[i][1], T[j][0], T[j][1], C.red, cq, 3); lbl('−1', (T[i][0] + T[j][0]) / 2 + ((T[i][0] + T[j][0]) / 2 - 1395) * 0.3, (T[i][1] + T[j][1]) / 2 + 6 + (i === 1 ? 26 : 0), C.red, cq, 18); });
    T.forEach((p, i) => { ring(p[0], p[1], 22, C.white, cq, 2); lbl(String(i + 1), p[0], p[1] + 7, C.white, cq, 18); });
    lbl('(−1)(−1)(−1) = −1 ≠ 1 : no common ray', 1395, 535, C.red, cq, 18);
    const aq = Q(S, 0, 'yet eigenvalue minus one third along all-ones', 0.6, 0.6) * f1;
    const px = 1080, py = 780, pw = 620, ph = 170, xS = a => px + (a - 0.5) / 0.5 * pw, yS = v => py - (v + 0.36) / 0.41 * ph;
    plotAxes(px, py, pw, ph, aq, 'a ∈ (½ , 1)', 'λ for (1,1,1)');
    line(px, yS(0), px + pw, yS(0), C.dim, aq * 0.6, 1);
    plot102(px, py, pw, ph, GLUE102.a, GLUE102.ea, 0.5, 1, -0.36, 0.05, C.mag, aq, 3);
    lbl('off-diagonal −a : blocks strictly positive , λ = (1 − 2a)/3 < 0', px + pw, yS(0.05) - 6, C.mag, aq, 14, 'right');
  }
  const q = Q(S, 1, 'The global test is a singular Schur recursion', 0.6, 0.3);
  if (q > 0) {
    chip(470, 265, 860, 58, 'M = [A  b ; b†  c] ⪰ 0  ⇔  A ⪰ 0 ,  b ∈ Ran A ,  s = c − b†A⁺b ≥ 0', C.gold, q, 18);
    lbl('A⁺ Moore–Penrose ;  rank M = rank A + 1[s > 0] ;  s > 0 needs a new direction', 470, 325, C.dim, q, 14);
    const rq = Q(S, 1, "each new column must lie in the old block's range", 0.6);
    const ox = 470, oy = 500, L = 170;
    line(ox - L, oy + L * 0.6, ox + L, oy - L * 0.6, C.cyan, rq, 3); lbl('Ran A = span(1 , −1)', ox + L + 10, oy - L * 0.6 - 4, C.cyan, rq, 16, 'left');
    const nx = 0.6 / Math.hypot(1, 0.6), ny = 1 / Math.hypot(1, 0.6);
    arrow(ox, oy, ox + nx * 150, oy + ny * 150, C.red, rq, 3.5); lbl('b = −(1 , 1)/3', ox + nx * 150 + 14, oy + ny * 150 + 6, C.red, rq, 17, 'left');
    dot(ox, oy, 8, 'w', rq);
    stamp('b ∉ Ran A : GLUING FAILS', 470, 720, Q(S, 1, 'with nonnegative remainder', 0.6), C.red, 22, -0.04);
    lbl('recomputed : the criterion equals the eigenvalue test on 1833 random matrices', 470, 790, C.dim, Q(S, 1, 'with nonnegative remainder', 0.6), 14);
    const bq = Q(S, 1, 'For operator axes, a Bell state gives', 0.6);
    chip(1395, 265, 770, 56, 'Φ⁺ :  S = I/2 ,  X = σx/2 ,  Y = −σy/2 ,  Z = σz/2', C.cyan, bq, 20);
    lbl('ρ = ½ (I ⊗ S + σx ⊗ X + σy ⊗ Y + σz ⊗ Z) ,  context operators kept', 1395, 325, C.dim, bq, 15);
    const vq = Q(S, 1, 'three quarters, against S squared one quarter', 0.6);
    const by = 640;
    [['X² + Y² + Z²', 0.75, C.red], ['S²', 0.25, C.cyan]].forEach(([nm, v, col], i) => { const x = 1220 + i * 230, h = v * 300; fillBox(x, by - h, 120, h, col, vq * 0.45); rect63(x, by - h, 120, h, col, vq, 1.8); lbl(v === 0.75 ? '¾ I' : '¼ I', x + 60, by - h - 12, C.white, vq, 20); lblG(nm, x + 60, by + 32, col, vq, 19); });
    line(1180, by, 1620, by, C.dim, vq, 1.2);
    chip(1395, 735, 770, 54, 'X² + Y² + Z² ⪯ S² fails for a legal pure state', C.red, vq, 19);
    lbl('m qubits : Pauli expansion with 4ᵐ − 1 real parameters', 1395, 790, C.dim, vq, 15);
  }
};

/* ---- 07 CODE (V44 §10, §12–§13) ---- */
SCENES.code = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Nor can one point in three dimensions carry more', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Coherent pair labels give an exact isometry', 0.6) * f1;
    chip(470, 262, 860, 56, 'V_d ψ = Σ_(i<j) |ij⟩ ⊗ K_ij ψ ,  K_ij = (|0⟩⟨i| + |1⟩⟨j|) / √(d − 1)', C.cyan, q, 17);
    chip(470, 335, 500, 52, 'V_d† V_d = I_d', C.green, q, 22);
    const dq = Q(S, 0, 'Decohere the labels', 0.6) * f1;
    const labs = ['12', '13', '14', '23', '24', '34'];
    labs.forEach((s, i) => { const x = 170 + i * 135, y = 400; if (dq > 0.5) { ctx.save(); ctx.setLineDash([6, 6]); rect63(x, y, 110, 120, C.gold, q, 1.6); ctx.restore(); } else box(x, y, 110, 120, C.cyan, q, 2, 'rgba(0,25,40,0.4)'); lbl('|' + s + '⟩', x + 55, y + 36, dq > 0.5 ? C.gold : C.cyan, q, 18); ring(x + 55, y + 82, 22, C.white, q * 0.8, 1.5); dot(x + 55 + 14 * Math.cos(t + i), y + 82 - 14 * Math.sin(t + i), 6, 'm', q); });
    lbl('d = 4 : six coherent labels , one qubit each', 470, 552, C.dim, q, 15);
    lbl('E_d(ρ) = ⊕ B_ij / (d − 1) ,  label probability N_ij / (d − 1)', 470, 600, C.gold, dq, 18);
    lbl('the full output still determines ρ (statistical inversion)', 470, 635, C.dim, dq, 15);
    const jq = Q(S, 0, 'yet for d above two no quantum channel inverts it', 0.6) * f1;
    lbl('with the V37 five-mode code J :  W_d = (I ⊗ J) V_d is an isometry ,', 470, 700, C.dim, jq, 15);
    lbl('u_ij = u₀ + ν r_ij ,  ν = 1/(1 + 2√3 + √11) ≈ 0.12852', 470, 728, C.dim, jq, 15);
    chip(1395, 262, 770, 56, 'ψ± = (e₁ ± e₂)/√2 :  ‖ρ₊ − ρ₋‖₁ = 2', C.white, jq, 21);
    const tq = Q(S, 0, 'two orthogonal inputs end at trace distance two over d minus one', 0.6) * f1;
    const px = 1060, py = 760, pw = 680, ph = 360, yS = v => py - v / 2.2 * ph;
    plotAxes(px, py, pw, ph, jq, 'd', 'trace distance');
    line(px, yS(2), px + pw, yS(2), C.red, jq, 3); lbl('inputs : 2', px + pw, yS(2) - 12, C.red, jq, 17, 'right');
    TD102.forEach(([d, v], i) => { const x = px + 40 + i * 105, h = v / 2.2 * ph, qq = clamp(tq * 1.6 - i / 8); fillBox(x, py - h, 62, h, C.gold, qq * 0.45); rect63(x, py - h, 62, h, C.gold, qq, 1.6); lbl(d === 3 ? '1' : '2/' + (d - 1), x + 31, py - h - 10, C.white, qq, 15); lbl(String(d), x + 31, py + 24, C.dim, jq, 15); });
    lbl('outputs : 2/(d − 1) < 2', px + 520, yS(1.15), C.gold, tq, 17);
    stamp('NO CPTP LEFT INVERSE , d > 2', 1400, 485, Q(S, 0, 'no quantum channel inverts it', 0.6, 0.3) * f1, C.red, 21, -0.03);
  }
  const q = Q(S, 1, 'Nor can one point in three dimensions carry more', 0.6, 0.3);
  if (q > 0) {
    chip(470, 262, 860, 56, 'c‖x − y‖ ≤ ‖f(x) − f(y)‖ ≤ C‖x − y‖ ,  f : U ⊆ ℝᵏ → ℝ³  ⇒  k ≤ 3', C.gold, q, 17);
    const kq = Q(S, 1, 'forces k at most three', 0.6);
    const px = 150, py = 720, pw = 760, ph = 340, xS = n => px + Math.log10(n) / 3 * pw, yS = v => py - v / 12.2 * ph;
    plotAxes(px, py, pw, ph, kq, 'N (log)', 'log₁₀ count');
    plot102(px, py, pw, ph, PACK102.N.map(n => Math.log10(n)), PACK102.k4, 0, 3, 0, 12.2, C.red, kq, 3);
    plot102(px, py, pw, ph, PACK102.N.map(n => Math.log10(n)), PACK102.k3, 0, 3, 0, 12.2, C.cyan, kq, 3);
    lbl('(N + 1)⁴ grid points', xS(200), yS(4 * Math.log10(201)) - 16, C.red, kq, 16, 'right'); lbl('(1 + 3N)³ disjoint balls fit', xS(60), yS(3 * Math.log10(181)) + 36, C.cyan, kq, 16, 'left');
    const nc = PACK102.Nc; dot(xS(nc), yS(4 * Math.log10(nc + 1)), 10, 'w', kq); lbl('N = ' + nc, xS(nc) - 12, yS(4 * Math.log10(nc + 1)) - 16, C.white, kq, 16, 'right');
    [1, 10, 100].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, kq, 14));
    lbl('k = 4 , c = R = 1 : the grid outgrows the room from N = ' + nc, 530, 790, C.dim, kq, 15);
    const mq = Q(S, 1, 'mixed states need d squared minus one', 0.6);
    const vals = [[2, 3, 2], [3, 8, 4], [4, 15, 6]], by = 560, hs = 17;
    lbl('real parameters', 1395, 270, C.white, mq, 17);
    vals.forEach(([d, mx, pu], i) => { const x = 1080 + i * 190; [[mx, C.mag], [pu, C.cyan]].forEach(([v, col], j) => { const h = v * hs; fillBox(x + j * 70, by - h, 56, h, col, mq * 0.45); rect63(x + j * 70, by - h, 56, h, col, mq, 1.5); lbl(String(v), x + j * 70 + 28, by - h - 8, C.white, mq, 15); }); lbl('d = ' + d, x + 63, by + 26, C.dim, mq, 15); });
    line(1090, by - 3 * hs, 1700, by - 3 * hs, C.gold, mq, 2.5); lbl('one point : 3', 1700, by - 3 * hs - 10, C.gold, mq, 14, 'right');
    lbl('magenta : mixed d² − 1     cyan : pure 2d − 2', 1395, by + 58, C.dim, mq, 14);
    const sq = Q(S, 1, 'Each recursion step keeps its own margin', 0.6);
    chip(1395, 680, 770, 56, 'e_m ≤ (∏ C_j) e₀ + Σ_k η_k ∏_(j>k) C_j', C.green, sq, 21);
    lbl('margins : spectral gap γ , chart denominators , retained coherence ;', 1395, 738, C.dim, sq, 14);
    lbl('project RRO source face :  δ_u T ≤ N_u ≤ T ,  C_opt = 1/δ_u', 1395, 765, C.dim, sq, 14);
  }
};

/* ---- 08 SQUARE (V46 §2–§3) ---- */
SCENES.square = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Split a branch into two orthogonal records', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Normalising alone cannot choose them', 0.6) * f1;
    lbl('amplitudes a = (0.9 , 0.6 , 0.3) ,  p_j = |a_j|ᵖ / Σ |a_k|ᵖ', 470, 270, C.white, q, 17);
    const pq = Q(S, 0, 'every power p divides out to a probability', 0.6) * f1;
    ['1', '2', '3'].forEach((p, g) => { const qq = clamp(pq * 1.6 - g * 0.3), x0 = 175 + g * 260, v = POW102.pw[p]; bars63(x0, 640, v, 52, 14, 300, qq, [C.cyan, C.gold, C.mag][g], v.map(x => x.toFixed(2))); lbl('p = ' + p + ' :  Σ = 1', x0 + 98, 360, [C.cyan, C.gold, C.mag][g], qq, 18); });
    stamp('EVERY p NORMALISES', 470, 760, Q(S, 0, 'every power p divides out to a probability', 0.6, 0.5) * f1, C.gold, 24, -0.03);
    chip(1395, 265, 770, 56, 'Σ_j |a_j|ᵖ / Σ_k |a_k|ᵖ = 1   for every p > 0', C.gold, pq, 21);
    const lq = Q(S, 0, 'Logarithms turn products into sums', 0.6) * f1;
    chip(1395, 355, 770, 56, 'log(ab) = log a + log b ,   u ⊕ v = log(eᵘ + eᵛ)', C.cyan, lq, 21);
    lbl('ℂ^× has no continuous log : one turn adds 2πi', 1395, 410, C.dim, lq, 15);
    const wq = Q(S, 0, 'weights composing by multiplication are powers', 0.6) * f1;
    chip(1395, 495, 770, 58, 'w(rs) = w(r) w(s) , continuous  ⇒  w(r) = rᵖ', C.green, wq, 21);
    lbl('w → 0 at 0 forces p > 0 ;  the logarithm explains the power , not the exponent', 1395, 555, C.dim, wq, 15);
    lbl('c² = a² + b²  ↦  2 log c = log(e^(2 log a) + e^(2 log b)) : the 2 is given , not made', 1395, 620, C.dim, wq, 14);
  }
  const q = Q(S, 1, 'Split a branch into two orthogonal records', 0.6, 0.3);
  if (q > 0) {
    const a0 = [0.7071, 0, 0.7071], a1 = [0.5, 0.5, 0.7071];
    bars63(170, 560, a0, 56, 16, 300, q, C.cyan, ['a₁', 'a₂', 'a₃']);
    const mq = Q(S, 1, 'require an untouched outcome to keep its probability', 0.6);
    arrow(420, 420, 560, 420, C.white, mq, 3); lbl('unitary on 1 , 2', 490, 400, C.white, mq, 15);
    bars63(600, 560, a1, 56, 16, 300, mq, C.gold, ['a₁′', 'a₂′', 'a₃′']);
    lbl('(1/√2 , 0 , 1/√2)', 255, 610, C.cyan, q, 15); lbl('(½ , ½ , 1/√2)', 685, 610, C.gold, mq, 15);
    lbl('third outcome untouched', 470, 300, C.white, mq, 17);
    const wq = Q(S, 1, 'the weight must be c r squared', 0.6);
    chip(470, 680, 860, 56, 'w(r) = w(r cos θ) + w(r sin θ)  ⇒  f(s + t) = f(s) + f(t) , f ≥ 0', C.white, wq, 18);
    chip(470, 750, 860, 52, 'w(r) = c r²  ⇒  p_j = |a_j|² / Σ |a_k|²   (no continuity needed)', C.gold, wq, 18);
    lbl('two branches only : f(s) = s² / (s² + (1 − s)²) also passes', 470, 800, C.dim, wq, 14);
    const tq = Q(S, 1, 'In a three-branch example', 0.6);
    chip(1395, 262, 770, 56, 'P(third) :  1/2  →  1 / (1 + 2^(1 − p/2))', C.cyan, tq, 22);
    const px = 1060, py = 730, pw = 680, ph = 380, xS = p => px + (p - 0.25) / 3.75 * pw, yS = v => py - (v - 0.3) / 0.4 * ph;
    plotAxes(px, py, pw, ph, tq, 'p', 'P(third outcome)');
    dashed(px, yS(0.5), px + pw, yS(0.5), C.green, tq, 2); lbl('before : 1/2', px + pw, yS(0.5) + 24, C.green, tq, 15, 'right');
    plot102(px, py, pw, ph, SQ102.p, SQ102.third, 0.25, 4, 0.3, 0.7, C.cyan, tq, 3);
    [1, 2, 3].forEach(p => lbl(String(p), xS(p), py + 26, C.dim, tq, 14));
    [0.3, 0.5, 0.7].forEach(v => lbl(v.toFixed(1), px - 10, yS(v) + 5, C.dim, tq, 14, 'right'));
    const oq = Q(S, 1, 'stays one half only at p equal two', 0.6);
    dot(xS(2), yS(0.5), 12, 'g', oq); lbl('p = 2', xS(2) + 18, yS(0.5) + 30, C.gold, oq, 18, 'left');
    lbl('p = 1 : 0.414     p = 3 : 0.586', xS(4), yS(0.33), C.dim, oq, 15, 'right');
    stamp('ONLY p = 2', 1230, 420, Q(S, 1, 'stays one half only at p equal two', 0.6, 0.3), C.gold, 28, -0.05);
    lbl('one equal split : 1 = 2 w(1/√2) = 2^(1 − p/2)  ⇔  p = 2', 1395, 800, C.dim, oq, 15);
  }
};

/* ---- 09 NATIVE (V46 §4) ---- */
SCENES.native = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Both conditions carry weight', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The native carrier has eighty-nine legal paths', 0.6) * f1;
    const ex = [1, 3, 6, 9];
    for (let k = 1; k <= 9; k++) { const x = 130 + k * 80, on = ex.includes(k); if (k < 9) line(x, 300, x + 80, 300, on && ex.includes(k + 1) ? C.red : C.dim, q, 2); dot(x, 300, on ? 14 : 8, on ? 'g' : 'w', q * (on ? 1 : 0.5)); lbl(String(k), x, 340, C.dim, q, 15); }
    lbl('q = {1 , 3 , 6 , 9} : legal , no k and k + 1 both in q', 530, 380, C.gold, q, 16);
    const bq = Q(S, 0, 'nine positions, no two neighbours', 0.6) * f1;
    const X0 = 200, Y0 = 420, WW = 640, HH = 290, w0 = WW * 55 / 89, h00 = HH * 34 / 55, h10 = HH * 21 / 34;
    const cells = [[X0, Y0, w0 - 6, h00 - 6, '34', 'b₁ = 0 , b₉ = 0', C.cyan], [X0, Y0 + h00, w0 - 6, HH - h00, '21', 'b₁ = 0 , b₉ = 1', C.vio], [X0 + w0, Y0, WW - w0, h10 - 6, '21', 'b₁ = 1 , b₉ = 0', C.gold], [X0 + w0, Y0 + h10, WW - w0, HH - h10, '13', 'b₁ = 1 , b₉ = 1', C.mag]];
    cells.forEach(([x, y, w, h, n, lab, col], i) => { const qq = clamp(bq * 1.6 - i * 0.25); fillBox(x, y, w, h, col, qq * 0.25); rect63(x, y, w, h, col, qq, 1.8); lbl(n, x + w / 2, y + h / 2 + 4, C.white, qq, 30); lbl(lab, x + w / 2, y + h / 2 + 30, col, qq, 13); });
    lbl('|E| = 89 = 34 + 21 + 21 + 13 ;  address nine : 34 + 34 paired + 21 blocked', 520, 750, C.white, bq, 15);
    chip(1395, 262, 770, 56, 'E = legal paths ,  |E| = 89 = F₁₁ ,  K = ℂ^E', C.gold, q, 21);
    const cq = Q(S, 0, 'In its full class of conserved continuous densities', 0.6) * f1;
    box(1010, 310, 770, 110, C.cyan, cq, 1.5, 'rgba(0,25,40,0.35)');
    lbl('C_nat : continuous , nonnegative , normalised , ray-invariant ,', 1395, 350, C.cyan, cq, 16);
    lbl('nodal , every support component of the eleven address', 1395, 377, C.cyan, cq, 16);
    lbl('Hamiltonians conserved at all internal times', 1395, 404, C.cyan, cq, 16);
    const rq = Q(S, 0, 'the retained-read relation R', 0.6) * f1;
    chip(1395, 470, 770, 56, 'R :  Π_q(χ) = m_i(χ) Π_q(M_i χ) ,   q ∈ E_i', C.white, rq, 21);
    lbl('M_i projects onto b₉ = i ,  m_i = Σ_(q ∈ E_i) Π_q ;  on every finite ready prefix χ', 1395, 525, C.dim, rq, 14);
    const oq = Q(S, 0, 'holds exactly for the Born rule', 0.6) * f1;
    chip(1395, 600, 770, 62, 'Π ∈ C_nat and R  ⇔  Π_q(z) = |z_q|² / ‖z‖²', C.gold, oq, 23);
    lbl('project continuation III , Theorem 173.2 , using its §144 group supply', 1395, 660, C.dim, oq, 15);
    lbl('steps : prefixes → identity on all z ; coarse masses m_i = t_i ; fine coordinates', 1395, 690, C.dim, oq, 14);
  }
  const q = Q(S, 1, 'Both conditions carry weight', 0.6, 0.3);
  if (q > 0) {
    const pq = Q(S, 1, 'R alone allows every power p', 0.6);
    chip(470, 262, 860, 56, 'Π⁽ᵖ⁾_q = |z_q|ᵖ / Σ_r |z_r|ᵖ  satisfies R for every p > 0', C.cyan, pq, 19);
    const cq = Q(S, 1, 'only p equal two conserves components', 0.6);
    const px = 150, py = 740, pw = 760, ph = 360, xS = p => px + (p - 0.25) / 3.75 * pw, yS = v => py - (v - 0.3) / 0.4 * ph;
    plotAxes(px, py, pw, ph, cq, 'p', 'active component mass');
    dashed(px, yS(0.5), px + pw, yS(0.5), C.green, cq, 2); lbl('conserved value 1/2', px + 10, yS(0.5) - 12, C.green, cq, 15, 'left');
    plot102(px, py, pw, ph, SQ102.p, NAT102.active, 0.25, 4, 0.3, 0.7, C.gold, cq, 3);
    dot(xS(2), yS(0.5), 12, 'g', cq);
    lbl('equal-amplitude block + one blocked bystander :', px + pw, yS(0.68), C.dim, cq, 14, 'right');
    lbl('1/2 → 2^(1−p/2) / (1 + 2^(1−p/2))', px + pw, yS(0.68) + 26, C.gold, cq, 16, 'right');
    [1, 2, 3].forEach(p => lbl(String(p), xS(p), py + 26, C.dim, cq, 14));
    const fq = Q(S, 1, 'For two older non-Born families', 0.6);
    lbl('Π^H = b + ε c H ,  correction ±εH on the 32 odd-position paths', 1395, 270, C.white, fq, 16);
    const gx = 1030, gy = 310, cw = 45;
    const subs = NAT102.odd.filter(s => !s.includes(9)).sort((x, y) => x.length - y.length || x.join() < y.join() ? -1 : 1);
    for (let r = 0; r < 2; r++) subs.forEach((s, c) => { const sg = ((s.length + r) % 2 === 0) ? 1 : -1, col = sg > 0 ? C.cyan : C.mag, qq = clamp(fq * 1.6 - c / 24); box(gx + c * cw, gy + r * 60, cw - 5, 52, col, qq, 1.4, sg > 0 ? 'rgba(0,40,50,0.6)' : 'rgba(50,0,40,0.6)'); lbl(sg > 0 ? '+' : '−', gx + c * cw + (cw - 5) / 2, gy + r * 60 + 34, col, qq, 22); });
    lbl('I = b₉ = 0', gx - 12, gy + 32, C.dim, fq, 14, 'right'); lbl('I = 1', gx - 12, gy + 92, C.dim, fq, 14, 'right');
    lbl('columns : W , the 16 subsets of {1 , 3 , 5 , 7}', 1395, gy + 150, C.dim, fq, 14);
    const mq = Q(S, 1, 'two readout marginals agree exactly', 0.6);
    lbl('every row sums to 0 :  I-marginal unchanged', 1395, 520, C.green, mq, 17);
    lbl('every column sums to 0 :  W-marginal unchanged', 1395, 555, C.green, mq, 17);
    const tq = Q(S, 1, 'differs by total variation sixteen epsilon H', 0.6);
    chip(1395, 630, 770, 62, 'TV(J_H , J_proj) = ½ · 32 · εH = 16 εH', C.gold, tq, 24);
    lbl('H ∈ {h , h_sm} , 0 < ε < 1 ; only the (I , W) joint law is compared', 1395, 690, C.dim, tq, 14);
    lbl('the pair of readouts does not replace the relation', 1395, 718, C.dim, tq, 14);
  }
};

/* ---- 10 LOG–BLOCH (V46 §5–§6) ---- */
SCENES.logbloch = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Recursion passes the square along a tree', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "Write a qubit's amplitude ratio as e to the u plus i theta", 0.6) * f1;
    const bq = Q(S, 0, 'Its Bloch vector is', 0.6) * f1;
    const px = 150, py = 720, pw = 760, ph = 400, xS = v => px + (v + 3) / 6 * pw, yS = v => py - (v + 1.1) / 2.2 * ph;
    plotAxes(px, py, pw, ph, bq, 'u = ½ log(p₁/p₀)', '');
    line(px, yS(0), px + pw, yS(0), C.dim, bq * 0.6, 1); line(xS(0), py, xS(0), py - ph, C.dim, bq * 0.4, 1);
    plot102(px, py, pw, ph, LB102.u, LB102.sech, -3, 3, -1.1, 1.1, C.cyan, bq, 3);
    plot102(px, py, pw, ph, LB102.u, LB102.tanh, -3, 3, -1.1, 1.1, C.gold, bq, 3);
    lbl('sech u = |r_x + i r_y|', xS(0.25), yS(1.0) - 10, C.cyan, bq, 16, 'left'); lbl('r_z = −tanh u', xS(-2.9), yS(0.9) + 26, C.gold, bq, 16, 'left');
    [-2, 0, 2].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, bq, 14)); [-1, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, bq, 14, 'right'));
    const mq = Q(S, 0, 'the log odds is exactly two u', 0.6) * f1;
    lbl('mixed : r = (γ sech u cos θ , γ sech u sin θ , −tanh u) ,  1 − |r|² = (1 − γ²) sech² u', 530, 770, C.dim, mq, 14);
    lbl('a general gate acts by z′ = (u₁₀ + u₁₁z) / (u₀₀ + u₀₁z) , not by a shift of log z', 530, 798, C.dim, mq, 14);
    chip(1395, 262, 770, 56, '|ψ⟩ = (|0⟩ + z|1⟩) / √(1 + |z|²) ,  z = e^(u + iθ)', C.white, q, 20);
    chip(1395, 335, 770, 56, 'r = (sech u cos θ , sech u sin θ , −tanh u) ,  |r| = 1', C.cyan, bq, 20);
    const uu = 1.2 * Math.sin(t * 0.5), th = t * 0.8, cx = 1395, cy = 545, R = 135;
    sph102(cx, cy, R, bq, 0.3);
    const v = [Math.cos(th) / Math.cosh(uu), Math.sin(th) / Math.cosh(uu), -Math.tanh(uu)], Pp = sphP102(cx, cy, R, v, 0.3);
    arrow(cx, cy, Pp[0], Pp[1], C.gold, bq, 3); dot(Pp[0], Pp[1], 12, 'g', bq);
    lbl('u = ' + uu.toFixed(2), cx + R + 30, cy - 20, C.gold, bq, 16, 'left'); lbl('r_z = ' + (-Math.tanh(uu)).toFixed(2), cx + R + 30, cy + 8, C.gold, bq, 16, 'left');
    chip(1395, 745, 770, 56, 'p₀ = (1 + r_z)/2 = 1/(1 + e^(2u)) ,   log(p₁/p₀) = 2u', C.gold, mq, 20);
  }
  const q = Q(S, 1, 'Recursion passes the square along a tree', 0.6, 0.3);
  if (q > 0) {
    const th = TREE102.theta, lv = TREE102.leaves, X = (lev, k) => 160 + (k + 0.5) * 720 / Math.pow(2, lev), Y = lev => 270 + lev * 122;
    const eq = Q(S, 1, 'each log probability is twice the sum of the log edge moduli', 0.6);
    for (let lev = 0; lev < 3; lev++) for (let k = 0; k < Math.pow(2, lev); k++) {
      const key = lev === 0 ? '' : k.toString(2).padStart(lev, '0'), x = X(lev, k), y = Y(lev);
      [0, 1].forEach(b => { const x2 = X(lev + 1, 2 * k + b), y2 = Y(lev + 1), c = b === 0 ? Math.cos(th[key]) : Math.sin(th[key]); line(x, y, x2, y2, b ? C.mag : C.cyan, q, 1.5 + 3 * c); lbl(c.toFixed(2), (x + x2) / 2 + (b ? 12 : -12), (y + y2) / 2, b ? C.mag : C.cyan, eq, 13, b ? 'left' : 'right'); });
      dot(x, y, 9, 'w', q);
    }
    Object.keys(lv).sort().forEach((key, k) => { const x = X(3, k), y = Y(3); dot(x, y, 10, 'g', q); lbl(lv[key].toFixed(3), x, y + 30, C.gold, q, 14); lbl(key, x, y + 50, C.dim, q, 12); });
    lbl('|A_ℓ|²', 135, Y(3) + 30, C.gold, q, 14, 'right');
    chip(470, 755, 860, 54, 'log |A_ℓ|² = 2 Σ_(e ∈ path) log |c_e| ,   Σ_ℓ |A_ℓ|² = 1', C.gold, eq, 19);
    const dq = Q(S, 1, 'so depth never turns two into two to the n', 0.6);
    lbl('depth multiplies amplitudes ; the exponent stays 2 , never 2ⁿ', 470, 802, C.white, dq, 15);
    const rq = Q(S, 1, 'Identical records add amplitudes before squaring', 0.6);
    chip(1395, 262, 770, 56, '‖Σ_h A_h |r_h⟩‖² = Σ_(h,k) A_h A_k* ⟨r_k , r_h⟩', C.white, rq, 21);
    const px = 1060, py = 720, pw = 680, ph = 360, xS = c => px + c * pw, yS = v => py - v / 1.1 * ph;
    plotAxes(px, py, pw, ph, rq, 'record overlap ⟨r₁ , r₂⟩', 'weight , A₁ = ½ , A₂ = ±½');
    plot102(px, py, pw, ph, REC102.c, REC102.same, 0, 1, 0, 1.1, C.gold, rq, 3);
    plot102(px, py, pw, ph, REC102.c, REC102.opp, 0, 1, 0, 1.1, C.mag, rq, 3);
    dot(xS(1), yS(1), 11, 'g', rq); lbl('identical : |A₁ + A₂|² = 1', xS(0.97), yS(1) - 18, C.gold, rq, 16, 'right');
    dot(xS(1), yS(0), 11, 'm', rq); lbl('|A₁ − A₂|² = 0 at overlap 1', xS(0.33), yS(0.05), C.mag, rq, 16, 'left');
    const oq = Q(S, 1, 'orthogonal records add probabilities', 0.6);
    dot(xS(0), yS(0.5), 13, 'c', oq); lbl('orthogonal (overlap 0) : |A₁|² + |A₂|² = ½', xS(0.02), yS(0.86), C.cyan, oq, 16, 'left');
    [0, 0.5].forEach(c => lbl(String(c), xS(c), py + 26, C.dim, rq, 14));
  }
};

/* ---- 11 RESIDUAL (V46 §7–§8) ---- */
SCENES.residual = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Nested explanation spaces give a square series', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Errors start as residuals', 0.6) * f1;
    const cut = ease(Q(S, 0, 'shrink only when a new reading cuts them', 1.0) * f1);
    const pos = {};
    for (let x = 0; x < 8; x++) {
      const cx = x % 2 ? 640 : 300, cy = 480, r = Math.floor(x / 2) % 2, hi = x >= 4 ? 1 : 0;
      const before = r === 0 ? [cx, cy + (hi ? 95 : -95)] : [cx + (hi ? 95 : -95), cy];
      const after = [cx + (r ? 75 : -75), cy + (hi ? 70 : -70)];
      pos[x] = [lerp(before[0], after[0], cut), lerp(before[1], after[1], cut)];
    }
    dashed(300, 360, 300, 600, C.green, q * cut, 2); dashed(640, 360, 640, 600, C.green, q * cut, 2);
    lbl('r = 0 | r = 1', 300, 625, C.green, q * cut, 14); lbl('r = 0 | r = 1', 640, 625, C.green, q * cut, 14);
    for (let x = 0; x < 8; x++) for (let y = x + 1; y < 8; y++) if (x % 2 === y % 2 && x % 4 !== y % 4) line(pos[x][0], pos[x][1], pos[y][0], pos[y][1], C.red, q * (1 - cut) * 0.85, 2.5);
    for (let x = 0; x < 8; x++) { dot(pos[x][0], pos[x][1], 17, ['c', 'g', 'm', 'n'][x % 4], q); lbl(String(x), pos[x][0], pos[x][1] + 6, '#02030a', q, 15); }
    lbl('reading q = x mod 2 = 0', 300, 300, C.white, q, 16); lbl('q = 1', 640, 300, C.white, q, 16);
    lbl('colour : target f = x mod 4 ;  red : same reading , different target', 470, 690, C.dim, q, 14);
    lbl(cut > 0.5 ? 'E((q , r) ; f) = E(q ; f) ∩ ker r = ∅ ,  r = ⌊x/2⌋ mod 2' : 'E(q ; f) : 16 ordered pairs', 470, 770, cut > 0.5 ? C.green : C.red, q, 17);
    const pq = Q(S, 0, 'post-processing an old reading never does', 0.6) * f1;
    lbl('a post-processed reading h ∘ q leaves all 16', 470, 802, C.dim, pq, 15);
    const uq = Q(S, 0, 'A unitary can keep both the projection and its remainder', 0.6) * f1;
    const ox = 1250, oy = 520, mx = 1650, my = 470;
    line(1060, oy + (oy - my) * 190 / 400, 1740, oy - (oy - my) * 490 / 400, C.cyan, q, 2.5); lbl('M', 1745, my - 50, C.cyan, q, 18, 'left');
    const px_ = 1560, py_ = oy - (oy - my) * 310 / 400, tx = px_ - 22, ty = py_ - 170;
    arrow(ox, oy, tx, ty, C.white, q, 3); lbl('ψ', tx - 16, ty - 4, C.white, q, 22, 'right');
    arrow(ox, oy, px_, py_, C.gold, q, 3); lbl('m = Pψ', px_ + 12, py_ + 30, C.gold, q, 17, 'left');
    arrow(px_, py_, tx, ty, C.mag, q, 3); lbl('e = Qψ', tx + 12, ty + 60, C.mag, q, 17, 'left');
    lbl('ψ = m + e ,  m ⊥ e ,  ‖ψ‖² = ‖m‖² + ‖e‖² ;  Pψ = argmin_(z ∈ M) ‖ψ − z‖', 1395, 625, C.white, q, 15);
    chip(1395, 700, 770, 56, 'U = P ⊗ I + Q ⊗ X :  U(ψ ⊗ |0⟩) = Pψ ⊗ |0⟩ + Qψ ⊗ |1⟩', C.green, uq, 18);
    lbl('U is unitary ; P alone is not invertible and Pψ/‖Pψ‖ is not linear', 1395, 760, C.dim, uq, 14);
  }
  const q = Q(S, 1, 'Nested explanation spaces give a square series', 0.6, 0.3);
  if (q > 0) {
    lbl('ψ(x) = |x| on [−1 , 1] ,  M_n = polynomials of degree ≤ n', 530, 270, C.white, q, 17);
    const px = 160, py = 720, pw = 740, ph = 390, yS = v => py - (Math.log10(v) + 4.5) / 4.5 * ph;
    plotAxes(px, py, pw, ph, q, 'n', '‖e_n‖² (log)');
    const sq = Q(S, 1, 'each step lowers the squared residual by exactly the squared increment', 0.6);
    const vals = [SER102.resid[0]].concat(SER102.resid.slice(1, 17));
    vals.forEach((v, i) => { const qq = clamp(sq * 1.8 - i / 20), x = px + 14 + i * 43, h = py - yS(v); fillBox(x, py - h, 30, h, i === 0 ? C.white : C.gold, qq * 0.45); rect63(x, py - h, 30, h, i === 0 ? C.white : C.gold, qq, 1.4); if (i < 16 && i % 2 === 0) lbl(i === 0 ? '‖ψ‖²' : String(i - 1), x + 15, py + 24, C.dim, qq, 13); });
    lbl('2/3', px + 29, yS(SER102.resid[0]) - 10, C.white, sq, 15); lbl('1/6', px + 72, yS(SER102.resid[1]) - 10, C.gold, sq, 15); lbl('1/96', px + 158, yS(SER102.resid[3]) - 10, C.gold, sq, 15);
    [-4, -3, -2, -1, 0].forEach(e => lbl('10' + ['⁻⁴', '⁻³', '⁻²', '⁻¹', '⁰'][e + 4], px - 10, yS(Math.pow(10, e)) + 5, C.dim, q, 13, 'right'));
    lbl('odd degrees add nothing : the bars pair up', px + pw, yS(0.3), C.dim, sq, 14, 'right');
    chip(1395, 262, 770, 56, '‖e_n‖² − ‖e_(n+1)‖² = ‖d_n‖² ≥ 0 ,  d_n = (P_(n+1) − P_n)ψ', C.gold, sq, 19);
    const tq = Q(S, 1, 'the pieces add up to the total norm', 0.6);
    chip(1395, 345, 770, 56, '‖ψ‖² = ‖P₀ψ‖² + Σ_n ‖d_n‖² + ‖(I − P_∞)ψ‖²', C.cyan, tq, 20);
    lbl('recomputed : 2/3 = 1/2 + 5/32 + … ;  residual 5.7 × 10⁻⁵ at degree 20', 1395, 400, C.dim, tq, 14);
    const cq = Q(S, 1, 'Conditional expectations obey the same law for mean squared error', 0.6);
    chip(1395, 480, 770, 56, 'E|Y − m_n|² − E|Y − m_(n+1)|² = E|m_(n+1) − m_n|²', C.green, cq, 19);
    lbl('m_n = E[Y | F_n] , F_n ⊆ F_(n+1) : the optimal risk falls , not every path', 1395, 535, C.dim, cq, 14);
    const vq = Q(S, 1, 'Conditional expectations obey the same law for mean squared error', 0.6, 1.0);
    box(1010, 575, 770, 215, C.vio, vq, 1.5, 'rgba(20,10,40,0.4)');
    lbl('static recursion  x = b + Ax , A strictly triangular :', 1395, 610, C.vio, vq, 15);
    lbl('x* = (I + A + … + A^(m−1)) b , unique minimiser of ½⟨(I − A)x − b , W(·)⟩', 1395, 637, C.white, vq, 14);
    lbl('yet J(x) = ½ while J(Ax) = M²/2 = 4.5 (M = 3) : iterations need not descend', 1395, 664, C.dim, vq, 14);
    lbl('Gibbs :  E_P C + τ D(P‖Q) = −τ log Z + τ D(P‖P*) ,  P* = Q e^(−C/τ) / Z', 1395, 710, C.white, vq, 14);
    lbl('V(v) = −τ log Z(v) obeys the log-sum-exp recursion on a DAG', 1395, 740, C.dim, vq, 14);
    lbl('recomputed : identity on 200 random laws ; DAG path sum = recursion', 1395, 768, C.dim, vq, 13);
  }
};

/* ---- 12 DRIFT (V46 §9–§11) ---- */
SCENES.drift = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A shrinking error can be a clock', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "A common unitary keeps an error's size exactly", 0.6) * f1;
    const cx = 470, cy = 500, R = 190, an = t * 0.6;
    ring(cx, cy, R, C.dim, q, 1.5);
    const A = [cx + R * Math.cos(an), cy - R * Math.sin(an)], B = [cx + R * Math.cos(an + 0.45), cy - R * Math.sin(an + 0.45)];
    arrow(cx, cy, A[0], A[1], C.cyan, q, 3); arrow(cx, cy, B[0], B[1], C.mag, q, 3);
    line(A[0], A[1], B[0], B[1], C.gold, q, 4); lbl('δ', (A[0] + B[0]) / 2 + 22 * Math.cos(an + 0.22), (A[1] + B[1]) / 2 - 22 * Math.sin(an + 0.22) + 6, C.gold, q, 22);
    lbl('Uψ', A[0] + 24 * Math.cos(an), A[1] - 24 * Math.sin(an) + 6, C.cyan, q, 18); lbl('Uψ′', B[0] + 28 * Math.cos(an + 0.45), B[1] - 28 * Math.sin(an + 0.45) + 6, C.mag, q, 18);
    chip(470, 262, 860, 56, '‖Uψ′ − Uψ‖ = ‖ψ′ − ψ‖ :  a common unitary neither shrinks nor grows δ', C.cyan, q, 18);
    const gq = Q(S, 0, 'faulty gates add at most their operator distances', 0.6) * f1;
    chip(470, 745, 860, 56, '‖δ_N‖ ≤ ‖δ₀‖ + Σ_(n<N) ‖U′_n − U_n‖_op', C.gold, gq, 21);
    lbl('repeated X : |0⟩ , |1⟩ , |0⟩ , … each step unitary , no convergence', 470, 800, C.dim, gq, 14);
    const cq = Q(S, 0, 'Conditioning differs', 0.6) * f1;
    chip(1395, 262, 770, 56, '‖M/s − N/t‖₁ ≤ (ε + |s − t|) / max(s , t) ≤ 2ε / max(s , t)', C.white, cq, 18);
    lbl('M = η|0⟩⟨0| ,  N = η|1⟩⟨1| ,  ε = ‖M − N‖₁', 1395, 320, C.dim, cq, 16);
    const px = 1060, py = 740, pw = 680, ph = 360, xS = e => px + (Math.log10(e) + 3) / 3 * pw, yS = v => py - (Math.log10(v) + 3) / 3.6 * ph;
    plotAxes(px, py, pw, ph, cq, 'η (log)', 'difference (log)');
    plot102(px, py, pw, ph, COND102.eta.map(e => Math.log10(e)), COND102.inp.map(v => Math.log10(v)), -3, 0, -3, 0.6, C.cyan, cq, 3);
    lbl('before normalising : 2η', xS(0.0013), yS(0.05), C.cyan, cq, 16, 'left');
    const aq = Q(S, 0, 'and by two after, however small eta is', 0.6) * f1;
    line(xS(0.001), yS(2), xS(1), yS(2), C.red, aq, 3.5); lbl('after normalising : 2', xS(0.0013), yS(2) + 28, C.red, aq, 17, 'left');
    COND102.eta.forEach((e, i) => { if (i % 5 === 0) dot(xS(e), yS(2), 6, 'r', aq); });
    ['10⁻³', '10⁻²', '10⁻¹'].forEach((s, i) => lbl(s, xS(Math.pow(10, i - 3)), py + 26, C.dim, cq, 14));
    lbl('no uniform Lipschitz constant : keep a lower bound on branch mass', 1395, 800, C.dim, aq, 14);
  }
  const q = Q(S, 1, 'A shrinking error can be a clock', 0.6, 0.3);
  if (q > 0) {
    chip(470, 262, 860, 56, 'e_(n+1) = λ_n e_n , 0 < λ_n < 1 :  τ_n = −log(e_n / e₀)', C.green, q, 19);
    const px = 150, py = 560, pw = 760, ph = 220, n = CLK102.e.length;
    CLK102.e.forEach((v, i) => { const qq = clamp(q * 1.8 - i / 16), x = px + 12 + i * 57, h = v * ph * 0.9; fillBox(x, py - h, 36, h, C.cyan, qq * 0.4); rect63(x, py - h, 36, h, C.cyan, qq, 1.3); });
    plotAxes(px, py, pw, ph, q, 'step n', '');
    curve(p => { const i = Math.min(n - 1, Math.round(p * (n - 1))); return [px + 30 + i * 57, py - CLK102.tau[i] / 4.6 * ph * 0.95]; }, n - 1, C.gold, q, 3);
    lbl('e_n (bars)', px + 40, py - ph + 8, C.cyan, q, 15, 'left'); lbl('τ_n ↑ ' + CLK102.tau[n - 1].toFixed(2), px + pw - 4, py - CLK102.tau[n - 1] / 4.6 * ph * 0.95 - 14, C.gold, q, 15, 'right');
    const nq = Q(S, 1, 'but time does not need one', 0.6);
    lbl('|j⟩ ↦ |j + 1 mod L⟩ : events stay ordered with no error falling', 530, 600, C.dim, nq, 15);
    const kq = Q(S, 1, "The golden gate's tenth power is the identity", 0.6);
    const gx = 250, gy = 715, gr = 70;
    for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + TAU * k / 10, b = -Math.PI / 2 + TAU * (k + 1) / 10; line(gx + gr * Math.cos(a), gy + gr * Math.sin(a), gx + gr * Math.cos(b), gy + gr * Math.sin(b), C.gold, kq * 0.8, 2); dot(gx + gr * Math.cos(a), gy + gr * Math.sin(a), k === 0 ? 9 : 6, k === 0 ? 'w' : 'g', kq); }
    lbl('Kᵏψ', gx, gy + 6, C.gold, kq, 15);
    lbl('K = ζ[I + (ζ − 1)P] ,  K¹⁰ = I', 360, gy - 26, C.gold, kq, 17, 'left');
    lbl('E(ψ) ≥ E(Kψ) ≥ … ≥ E(K¹⁰ψ) = E(ψ)', 360, gy + 8, C.white, kq, 16, 'left');
    lbl('⇒ all equal : no potential falls at every gate', 360, gy + 40, C.red, kq, 16, 'left');
    const gq = Q(S, 1, 'Geodesics need not descend', 0.6);
    chip(1395, 262, 770, 56, 'ψ(s) = cos s |0⟩ + sin s |1⟩ = e^(−is σy)|0⟩ ,  d_FS = |s − t|', C.cyan, gq, 18);
    const lq = Q(S, 1, 'the shortest path raises the loss sine squared s', 0.6);
    const qx = 1060, qy = 700, qw = 680, qh = 340, xS = s => qx + s / (Math.PI / 2) * qw, yS = v => qy - v / 1.1 * qh;
    plotAxes(qx, qy, qw, qh, gq, 's ∈ [0 , π/2]', 'loss to |0⟩');
    plot102(qx, qy, qw, qh, GEO102.s, GEO102.L, 0, Math.PI / 2, 0, 1.1, C.gold, lq, 3);
    const ss = (u * 0.25) % (Math.PI / 2); dot(xS(ss), yS(Math.sin(ss) ** 2), 10, 'g', lq);
    lbl('L(s) = 1 − |⟨0 , ψ(s)⟩|² = sin² s', xS(0.05), yS(1.02), C.gold, lq, 17, 'left');
    lbl('0', xS(0), qy + 26, C.dim, gq, 14); lbl('π/4', xS(Math.PI / 4), qy + 26, C.dim, gq, 14);
    stamp('ERROR GROWS', 1600, 615, lq, C.red, 22, -0.04);
    lbl('a unitary , shortest path', 1600, 665, C.red, lq, 15);
    lbl('imaginary time : d⟨H⟩/dτ = −2 Var(H) , a nonlinear normalised flow', 1395, 760, C.dim, kq, 14);
    lbl('real time keeps ‖ψ‖ and ⟨H⟩ ; a stationary action is not a minimum', 1395, 788, C.dim, kq, 14);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Poisson and Cauchy integrals are classical', 'classical'], [1, 'the native Born selection comes from', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const row1 = [['FILL', 'd² − 1 , t = 1 − dλ', C.cyan, 'A sphere fills a body', 0], ['POISSON', '½(I + x·σ)', C.gold, 'A sphere fills a body', 0.6], ['INWARD', 'G ⪰ I · (a/b)ᴺ', C.green, 'boundaries fix interiors inward', 0], ['ATLAS', '∏ w = 1 · Σ N = d − 1', C.mag, 'blocks must agree around cycles', 0], ['GLUE', 'λ = −1/3 · s ≥ 0', C.red, 'blocks must agree around cycles', 0.5], ['CODES', '2/(d − 1) · k ≤ 3', C.vio, 'blocks must agree around cycles', 1.0]];
    const row2 = [['SQUARE', 'w(r) = c r²', C.gold, 'refinement chooses the square', 0], ['NATIVE', '89 paths · 16 εH', C.cyan, 'refinement chooses the square', 0.5], ['LOG–BLOCH', 'log odds = 2u', C.mag, 'refinement chooses the square', 1.0], ['RESIDUAL', 'Σ ‖d_n‖²', C.green, 'only new records reduce', 0], ['DRIFT', 'K¹⁰ = I · sin² s', C.red, 'what unitaries preserve', 0]];
    row1.forEach(([a1, a2, col, ph, dl], i) => { const x = 220 + i * 296, q = Q(S, 0, ph, 0.5, dl) * fade; box(x - 130, 230, 260, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 278, col, q, 19); lblG(a2, x, 323, C.white, q, 18); });
    row2.forEach(([a1, a2, col, ph, dl], i) => { const x = 368 + i * 296, q = Q(S, 0, ph, 0.5, dl) * fade; box(x - 130, 398, 260, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 446, col, q, 19); lblG(a2, x, 491, C.white, q, 18); });
    lbl('V44 · boundary extension and higher-dimensional relational atlas', 90, 222, C.dim, Q(S, 0, 'A sphere fills a body') * fade, 13, 'left');
    lbl('V46 · log recursion , squared probabilities , error geometry', 238, 388, C.dim, Q(S, 0, 'refinement chooses the square') * fade, 13, 'left');
    lbl('CLASSICAL · stereographic projection · Poisson kernel · iterated Cauchy formula · Moore–Penrose Schur complement · Cauchy functional equation', W / 2, 570, '#8fbcff', Q(S, 1, 'Poisson and Cauchy integrals are classical') * fade, 14);
    lbl('PROJECT INPUTS · continuation III Theorem 173.2 (native Born selection) · V24 Schur metric · V37 five-mode code and golden gate · RRO margin 1/δ_u', W / 2, 605, C.orange, Q(S, 1, 'the native Born selection comes from') * fade, 14);
    lbl('VOLUMES · star bodies · state-valued Poisson · outward instability · ratio and block atlas · local vs global · no CPTP inverse · refinement square · log–Bloch · residual series · error geometry', W / 2, 640, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 13);
    lbl('RECOMPUTED · Hausdorff 0.108 · Poisson quadrature · G ⪰ I · (a/b)ᴺ · ΣN = 3 · λ = −1/3 · 2/(d−1) · N = 24 · 89 = 34+21+21+13 · TV 16εH · Legendre 2/3, 1/6, 1/96 · K¹⁰ = I', W / 2, 675, C.white, Q(S, 1, 'the finite computations were redone') * fade, 13);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 745, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    sph102(W / 2, 360, 170, a, t * 0.2);
    for (let i = 0; i < 16; i++) { const th = TAU * i / 16, v = [Math.cos(th), Math.sin(th) * 0.2, Math.sin(th)], P = sphP102(W / 2, 360, 170, v, t * 0.2); dot(P[0], P[1], 8, 'g', a); }
    txt('AURIC V44–V46 · ATLAS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V44–V46 · 边界图册、平方概率与误差几何 · TRURETURING FILM 102', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A ball filled from its sphere, blocks that must agree, a square chosen by refinement, and errors that unitaries keep.', W / 2, 875, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V44–V46', fill: 'STAR BODIES', poisson: 'POISSON FILLING', inward: 'INWARD , NOT OUTWARD', atlas: 'RATIO AND BLOCK ATLAS', glue: 'LOCAL VERSUS GLOBAL', code: 'CODES AND MARGINS', square: 'WHY SQUARES', native: 'NATIVE BORN SELECTION', logbloch: 'LOG–BLOCH', residual: 'RESIDUAL SERIES', drift: 'ERROR GEOMETRY', finale: 'LEDGER' });

function poster102() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const cx = 470, cy = 500, R = 250;
  sph102(cx, cy, R, 1, 0.5);
  for (let i = 0; i < 24; i++) { const th = Math.acos(1 - 2 * rnd(i, 5)), ph_ = TAU * rnd(i, 9), v = [Math.sin(th) * Math.cos(ph_), Math.sin(th) * Math.sin(ph_), Math.cos(th)]; const B = sphP102(cx, cy, R, v, 0.5); dot(B[0], B[1], 9, 'g', B[2] > 0 ? 1 : 0.5); const P = sphP102(cx, cy, R * (0.3 + 0.6 * rnd(i, 13)), v, 0.5); line(cx, cy, P[0], P[1], C.cyan, 0.35, 1.2); dot(P[0], P[1], 7, 'c', 1); }
  txt('ρ_g(x) = ½(I + x·σ)', 1320, 360, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('ρ = Σ ι B ι† − (d − 2) diag p', 1320, 470, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('w(r) = c r² · log odds = 2u · K¹⁰ = I', 1320, 580, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V44–V46', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V44–V46 · ATLAS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('边 界 图 册 · 平 方 概 率 · 误 差 几 何', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 102', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster102;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
