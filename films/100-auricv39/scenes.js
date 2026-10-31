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

/* ---- film 100: AURIC V39–V40 · sharp settings, future closure and hidden memory ---- */
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
const _po100 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po100.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po100.set(key, off); }
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
/* ---- film 100 data (from verify100.py) ---- */
const ELL100 = [[1.29012, -0.194701], [1.26824, -0.0574156], [1.23671, 0.0803068], [1.19577, 0.217418], [1.14572, 0.352875], [1.08696, 0.485645], [1.01992, 0.61472], [0.945126, 0.739117], [0.863136, 0.857888], [0.774576, 0.970131], [0.680122, 1.07499], [0.580491, 1.17167], [0.476443, 1.25943], [0.368768, 1.3376], [0.258287, 1.4056], [0.14584, 1.4629], [0.0322835, 1.50906], [-0.081519, 1.54374], [-0.194701, 1.56667], [-0.306401, 1.57768], [-0.41577, 1.57668], [-0.521974, 1.56368], [-0.624205, 1.53878], [-0.721686, 1.50217], [-0.813675, 1.45413], [-0.899471, 1.39502], [-0.978421, 1.32529], [-1.04993, 1.24548], [-1.11344, 1.15619], [-1.16848, 1.0581], [-1.21462, 0.951952], [-1.25153, 0.838564], [-1.27891, 0.718793], [-1.29655, 0.593551], [-1.30433, 0.463793], [-1.30218, 0.330505], [-1.29012, 0.194701], [-1.26824, 0.0574156], [-1.23671, -0.0803068], [-1.19577, -0.217418], [-1.14572, -0.352875], [-1.08696, -0.485645], [-1.01992, -0.61472], [-0.945126, -0.739117], [-0.863136, -0.857888], [-0.774576, -0.970131], [-0.680122, -1.07499], [-0.580491, -1.17167], [-0.476443, -1.25943], [-0.368768, -1.3376], [-0.258287, -1.4056], [-0.14584, -1.4629], [-0.0322835, -1.50906], [0.081519, -1.54374], [0.194701, -1.56667], [0.306401, -1.57768], [0.41577, -1.57668], [0.521974, -1.56368], [0.624205, -1.53878], [0.721686, -1.50217], [0.813675, -1.45413], [0.899471, -1.39502], [0.978421, -1.32529], [1.04993, -1.24548], [1.11344, -1.15619], [1.16848, -1.0581], [1.21462, -0.951952], [1.25153, -0.838564], [1.27891, -0.718793], [1.29655, -0.593551], [1.30433, -0.463793], [1.30218, -0.330505], [1.29012, -0.194701]];
const ELLC100 = [1.30473, 1.57872, 0.123354];
const PLANE100 = [[0.796016, -3.40666e-17], [-0.177646, 0.633423], [0.737971, 0.206967]];
const AMP2_100 = [[0.0001, 1250.43], [0.000124407, 1005.2], [0.000154771, 808.077], [0.000192547, 649.627], [0.000239542, 522.263], [0.000298007, 419.887], [0.000370742, 337.595], [0.00046123, 271.448], [0.000573803, 218.279], [0.000713852, 175.54], [0.000888084, 141.187], [0.00110484, 113.573], [0.0013745, 91.3764], [0.00170998, 73.5347], [0.00212733, 59.1933], [0.00264655, 47.6656], [0.0032925, 38.3995], [0.00409611, 30.9513], [0.00509585, 24.9644], [0.00633961, 20.1521], [0.00788692, 16.284], [0.0098119, 13.1749], [0.0122067, 10.6758], [0.015186, 8.6672], [0.0188925, 7.05281], [0.0235036, 5.75536], [0.0292402, 4.71272], [0.0363769, 3.87498], [0.0452554, 3.20204], [0.056301, 2.66168], [0.0700425, 2.22806], [0.0871379, 1.88046], [0.108406, 1.60229], [0.134865, 1.38036], [0.167781, 1.20424], [0.208732, 1.06585], [0.259677, 0.959229], [0.323057, 0.880599], [0.401906, 0.829032], [0.5, 0.809017]];
const AMP3_100 = [[0.0001, 35.3571, 97.9506], [0.000134138, 30.5287, 84.5745], [0.000179929, 26.3599, 73.0254], [0.000241353, 22.7605, 63.0539], [0.000323745, 19.6528, 54.4445], [0.000434264, 16.9696, 47.0114], [0.000582511, 14.6531, 40.5938], [0.000781367, 12.6531, 35.0532], [0.00104811, 10.9265, 30.2699], [0.00140591, 9.43588, 26.1404], [0.00188585, 8.14913, 22.5757], [0.00252963, 7.03844, 19.4987], [0.00339319, 6.0798, 16.843], [0.00455155, 5.2525, 14.5511], [0.00610534, 4.53868, 12.5736], [0.00818956, 3.92293, 10.8678], [0.0109853, 3.39194, 9.39677], [0.0147354, 2.93425, 8.12883], [0.0197657, 2.54, 7.03662], [0.0265133, 2.20069, 6.09662], [0.0355643, 1.90902, 5.28861], [0.0477051, 1.65877, 4.59534], [0.0639905, 1.44463, 4.0021], [0.0858353, 1.26215, 3.49655], [0.115137, 1.10767, 3.06859], [0.154443, 0.978363, 2.71038], [0.207166, 0.872378, 2.41677], [0.277887, 0.789257, 2.1865], [0.372751, 0.731182, 2.02561], [0.5, 0.707107, 1.95891]];
const BR100 = [[1e-06, 0.00238616, 0.00118921], [1.36317e-06, 0.00278615, 0.00138846], [1.85823e-06, 0.00325323, 0.00162109], [2.53308e-06, 0.00379867, 0.0018927], [3.45301e-06, 0.00443562, 0.00220982], [4.70703e-06, 0.00517948, 0.00258007], [6.41647e-06, 0.00604821, 0.00301235], [8.74673e-06, 0.00706283, 0.00351706], [1.19233e-05, 0.0082479, 0.00410634], [1.62534e-05, 0.00963215, 0.00479435], [2.21561e-05, 0.0112492, 0.00559763], [3.02025e-05, 0.0131383, 0.0065355], [4.11711e-05, 0.0153455, 0.00763051], [5.61231e-05, 0.0179246, 0.00890899], [7.65052e-05, 0.0209389, 0.0104017], [0.000104289, 0.0244621, 0.0121444], [0.000142164, 0.0285811, 0.0141792], [0.000193793, 0.0333976, 0.0165549], [0.000264173, 0.0390312, 0.0193287], [0.000360112, 0.0456224, 0.0225671], [0.000490893, 0.0533368, 0.0263482], [0.00066917, 0.0623693, 0.0307628], [0.000912191, 0.07295, 0.035917], [0.00124347, 0.0853511, 0.0419349], [0.00169506, 0.0998947, 0.0489609], [0.00231065, 0.116963, 0.0571642], [0.0031498, 0.137012, 0.066742], [0.00429371, 0.160585, 0.0779245], [0.00585305, 0.18833, 0.0909805], [0.00797869, 0.22103, 0.106224], [0.0108763, 0.259623, 0.124022], [0.0148262, 0.30525, 0.144801], [0.0202106, 0.359295, 0.169062], [0.0275505, 0.423447, 0.197389], [0.0375559, 0.499785, 0.230461], [0.051195, 0.590869, 0.269074], [0.0697874, 0.699883, 0.314156], [0.0951319, 0.830798, 0.366793], [0.129681, 0.988607, 0.428248], [0.176777, 1.17961, 0.5]];
const BRK100 = [2.38516, 1.18921];
const CH6_100 = [2, 4, 7, 11, 16, 21, 27, 34, 36];
const CH4_100 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const ISO100 = [[0.270173, 0.167471], [0.270173, 0.067867], [0.270173, 0.11482], [0.270173, 0.0064115], [0.270173, 0.126005], [0.270173, 0.0669843], [0.270173, 0.121883], [0.270173, 0.00965487], [0.270173, 0.177242], [0.270173, 0.218917], [0.270173, 0.0134028], [0.270173, 0.0635368], [0.270173, 0.246654], [0.270173, 0.00366817], [0.270173, 0.00368328], [0.270173, 0.0726569], [0.270173, 0.0767864], [0.270173, 0.0827563], [0.270173, 0.226391], [0.270173, 0.0362562], [0.270173, 0.220103], [0.270173, 0.0956452], [0.270173, 0.14598], [0.270173, 0.175728], [0.270173, 0.0412963]];
const ALPHA100 = [[0.02, 9.99967e-05], [0.0725694, 0.001316], [0.125139, 0.00390982], [0.177708, 0.00787429], [0.230277, 0.0131984], [0.282847, 0.0198676], [0.335416, 0.0278633], [0.387986, 0.0371635], [0.440555, 0.0477424], [0.493124, 0.0595709], [0.545694, 0.0726163], [0.598263, 0.0868424], [0.650832, 0.10221], [0.703402, 0.118677], [0.755971, 0.136197], [0.808541, 0.154723], [0.86111, 0.174202], [0.913679, 0.194582], [0.966249, 0.215805], [1.01882, 0.237814], [1.07139, 0.260547], [1.12396, 0.283941], [1.17653, 0.307933], [1.2291, 0.332455], [1.28166, 0.35744], [1.33423, 0.382819], [1.3868, 0.408522], [1.43937, 0.434477], [1.49194, 0.460614], [1.54451, 0.486859], [1.59708, 0.486859], [1.64965, 0.460614], [1.70222, 0.434477], [1.75479, 0.408522], [1.80736, 0.382819], [1.85993, 0.35744], [1.9125, 0.332455], [1.96507, 0.307933], [2.01764, 0.283941], [2.07021, 0.260547], [2.12277, 0.237814], [2.17534, 0.215805], [2.22791, 0.194582], [2.28048, 0.174202], [2.33305, 0.154723], [2.38562, 0.136197], [2.43819, 0.118677], [2.49076, 0.10221], [2.54333, 0.0868424], [2.5959, 0.0726163], [2.64847, 0.0595709], [2.70104, 0.0477424], [2.75361, 0.0371635], [2.80618, 0.0278633], [2.85875, 0.0198676], [2.91132, 0.0131984], [2.96388, 0.00787429], [3.01645, 0.00390982], [3.06902, 0.001316], [3.12159, 9.99967e-05]];
const NAT100 = [[0.618034, 0.381966], [0.145898, 1.0]];
const ORB100 = [[0.994786, 0.994786, 0.994786], [0.717568, 0.86, 0.994786], [0.520195, 0.0, 0.994786], [0.379155, 0.0, 0.994786], [0.277941, 0.0, 0.994786], [0.204956, 0.0, 0.994786], [0.152043, 0.0, 0.994786], [0.113459, 0.0, 0.994786], [0.0851504, 0.0, 0.994786], [0.0642488, 0.0, 0.994786], [0.0487186, 0.0, 0.994786], [0.0371082, 0.0, 0.994786], [0.0283775, 0.0, 0.994786]];
const LIM100 = [[5, 26, 1.57109, 1.41442, 0.416711], [10, 51, 1.58984, 1.42762, 0.304932], [30, 147, 1.57606, 1.41793, 0.180329], [100, 483, 1.57089, 1.41428, 0.0994024], [300, 1446, 1.57145, 1.41468, 0.0425789], [1000, 4813, 1.57092, 1.4143, 0.0313264]];
const OV100 = [[0.0, 1.0, 1.0], [0.04, 0.979744, 0.989937], [0.08, 0.958947, 0.979744], [0.12, 0.937564, 0.969415], [0.16, 0.915542, 0.958947], [0.2, 0.89282, 0.948331], [0.24, 0.869328, 0.937564], [0.28, 0.844981, 0.926636], [0.32, 0.819677, 0.915542], [0.36, 0.793296, 0.904273], [0.4, 0.765685, 0.89282], [0.44, 0.736656, 0.881175], [0.48, 0.705964, 0.869328], [0.52, 0.673286, 0.857267], [0.56, 0.638178, 0.844981], [0.6, 0.6, 0.832456], [0.64, 0.557771, 0.819677], [0.68, 0.509839, 0.80663], [0.72, 0.452982, 0.793296], [0.76, 0.378885, 0.779655], [0.8, 0.2, 0.765685]];
const RET100 = [[0, 1.0, 1.0], [1, 0.6, 0.6], [2, 0.36, 0.04], [3, 0.216, 0.216], [4, 0.1296, 0.8464], [5, 0.07776, 0.92256], [6, 0.046656, 0.322624], [7, 0.0279936, 0.0064896], [8, 0.0167962, 0.479972], [9, 0.0100777, 0.985499], [10, 0.00604662, 0.714228], [11, 0.00362797, 0.100192], [12, 0.00217678, 0.125849]];
const KER100 = [[0, 1.0, 1.0], [1, 0.996917, 0.996917], [2, 0.987688, 0.993844], [3, 0.97237, 0.99078], [4, 0.951057, 0.987726], [5, 0.92388, 0.984681], [6, 0.891007, 0.981646], [7, 0.85264, 0.97862], [8, 0.809017, 0.975603], [9, 0.760406, 0.972596], [10, 0.707107, 0.969597], [11, 0.649448, 0.966609], [12, 0.587785, 0.963629], [13, 0.522499, 0.960658], [14, 0.45399, 0.957697], [15, 0.382683, 0.954745], [16, 0.309017, 0.951801], [17, 0.233445, 0.948867], [18, 0.156434, 0.945942], [19, 0.0784591, 0.943026], [20, 6.12323e-17, 0.940119]];
const KERN100 = [20, 0.938315];
const GAP100 = [[1, 0.520221, 0.0960409, 0.999931, 0.0492324], [2, 1.11534, 0.164642, 1.00108, 0.0420443], [3, 1.72881, 0.205802, 1.00093, 0.0349097], [4, 1.78176, 0.219522, 1.02358, 0.0278275], [5, 1.65388, 0.205802, 1.01033, 0.0349097], [6, 1.45, 0.164642, 1.0354, 0.0420443], [7, 0.82896, 0.0960409, 1.00014, 0.0492324]];
const GAMMA100 = 0.109761;
const CYC100 = [0.04, 5, 0.276941, 0.937205, 0.96];
const NOISY100 = [[0, 1.0], [1, 0.99999], [2, 0.99996], [3, 0.99991], [4, 0.99984], [5, 0.99975], [6, 0.99964], [7, 0.99951], [8, 0.99936], [9, 0.99919], [10, 0.999], [11, 0.99879], [12, 0.998561], [13, 0.998311], [14, 0.998041], [15, 0.997752], [16, 0.997442], [17, 0.997113], [18, 0.996763], [19, 0.996394], [20, 0.996005], [21, 0.995596], [22, 0.995168], [23, 0.994719], [24, 0.994251], [25, 0.993763], [26, 0.993255], [27, 0.992728], [28, 0.99218], [29, 0.991614], [30, 0.991027], [31, 0.990421], [32, 0.989795], [33, 0.989149], [34, 0.988484], [35, 0.9878], [36, 0.987096], [37, 0.986372], [38, 0.985629], [39, 0.984867], [40, 0.984085], [41, 0.983284], [42, 0.982463], [43, 0.981624], [44, 0.980765], [45, 0.979886], [46, 0.978989], [47, 0.978072], [48, 0.977136], [49, 0.976182], [50, 0.975208], [51, 0.974215], [52, 0.973203], [53, 0.972172], [54, 0.971122], [55, 0.970054], [56, 0.968966], [57, 0.96786], [58, 0.966736], [59, 0.965592], [60, 0.96443]];
const NOISYP100 = [10, 0.001, 0.00632456];
const TENAX100 = [[0.0, 0.0, 1.0], [0.300283, 0.924176, -0.236068], [0.414981, -0.571172, -0.708204], [0.0438107, -0.571172, 0.81966], [0.158509, 0.924176, 0.347524], [0.458792, -3.12853e-16, -0.888544], [0.158509, -0.924176, 0.347524], [0.0438107, 0.571172, 0.81966], [0.414981, 0.571172, -0.708204], [0.300283, -0.924176, -0.236068]];
const TENQ100 = [0.971737, 0.0, 0.236068];
const TEN100 = [[0.0001, 56.2136], [0.000134138, 48.5173], [0.000179929, 41.8692], [0.000241353, 36.1256], [0.000323745, 31.1625], [0.000434264, 26.8728], [0.000582511, 23.1638], [0.000781367, 19.9555], [0.00104811, 17.1787], [0.00140591, 14.7738], [0.00188585, 12.6891], [0.00252963, 10.8801], [0.00339319, 9.30847], [0.00455155, 7.94147], [0.00610534, 6.75113], [0.00818956, 5.71388], [0.0109853, 4.81013], [0.0147354, 4.02383], [0.0197657, 3.34204], [0.0265133, 2.75433], [0.0355643, 2.25208], [0.0477051, 1.82775], [0.0639905, 1.47423], [0.0858353, 1.18439], [0.115137, 0.95097], [0.154443, 0.766832], [0.207166, 0.625426], [0.277887, 0.521612], [0.372751, 0.453246], [0.5, 0.425987]];
const TENMN100 = [0.789337, 4.72136];
const AX3_100 = [[0.0, 0.0, 1.0], [0.300283, 0.924176, -0.236068], [0.414981, -0.571172, -0.708204]];
const NUM100 = {"x": 0.6180339887498949, "beta": 0.48586827175664576, "c0": 0.2605968178245204, "c0low": 0.21352549156242118, "mu": 0.7893370497854909, "nu": 4.721359549995795, "gamma": 0.10976106831433126};
/* ---- film 100 helpers ---- */
function fillEll100(cx, cy, rx, ry, col, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
function cell100(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function chipG100(x, y, w, h, s, col, a, size = 22) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: FG, w: 700, align: 'center', c: col, a }); }
function lmap100(px, py, pw, ph, x0, x1, y0, y1) { return [v => px + (Math.log10(v) - x0) / (x1 - x0) * pw, v => py - (Math.log10(v) - y0) / (y1 - y0) * ph]; }
function bar100(x, y0, w, h, col, a) { if (a <= 0) return; fillBox(x, y0 - h, w, h, col, a * 0.45); rect63(x, y0 - h, w, h, col, a, 1.5); }
function polyl100(pts, col, a, lw = 3) { if (a <= 0 || pts.length < 2) return; strokePoly(pts, col, a, lw, false); }
function logTicks100(px, py, fx, fy, xs, ys, a) { xs.forEach(([v, s]) => lbl(s, fx(v), py + 26, C.dim, a, 14)); ys.forEach(([v, s]) => lbl(s, px - 10, fy(v) + 5, C.dim, a, 14, 'right')); }
/* plane of the two successor differences */
function plane100(ox, oy, sc, a, opt = {}) {
  if (a <= 0) return;
  const [h0, h1, e0] = PLANE100, P = v => [ox + v[0] * sc, oy - v[1] * sc];
  fillPoly([P([-0.55, -0.35]), P([1.15, -0.35]), P([1.15, 0.95]), P([-0.55, 0.95])], C.cyan, a * 0.07);
  strokePoly([P([-0.55, -0.35]), P([1.15, -0.35]), P([1.15, 0.95]), P([-0.55, 0.95])], C.cyan, a * 0.5, 1.4);
  lbl('span{ h₀ , h₁ } inside the support of X', ox + 0.3 * sc, oy + 0.35 * sc + 34, C.cyan, a, 15);
  const o = P([0, 0]);
  arrow(o[0], o[1], P(h0)[0], P(h0)[1], C.gold, a * (opt.h0 == null ? 1 : opt.h0), 3.5); lbl('h₀', P(h0)[0] + 24, P(h0)[1] + 8, C.gold, a * (opt.h0 == null ? 1 : opt.h0), 22, 'left');
  arrow(o[0], o[1], P(h1)[0], P(h1)[1], C.mag, a, 3.5); lbl('h₁', P(h1)[0] - 14, P(h1)[1] - 14, C.mag, a, 22, 'right');
  if (opt.delta > 0) { const d0 = 0.42, d1 = 0.55, dv = [d1 * h1[0] - d0 * h0[0], d1 * h1[1] - d0 * h0[1]]; arrow(o[0], o[1], P(dv)[0], P(dv)[1], C.white, a * opt.delta, 3); lbl('Δ = δ₁h₁ − δ₀h₀', P(dv)[0] - 10, P(dv)[1] - 16, C.white, a * opt.delta, 18, 'right'); }
  if (opt.e0 > 0) {
    const n = Math.hypot(e0[0], e0[1]), ev = [e0[0] / n * 0.85, e0[1] / n * 0.85];
    arrow(o[0], o[1], P(ev)[0], P(ev)[1], C.green, a * opt.e0, 4); lbl('e₀ ⊥ h₁', P(ev)[0] + 16, P(ev)[1] - 6, C.green, a * opt.e0, 20, 'left');
    const m1 = Math.hypot(h1[0], h1[1]), u1 = [h1[0] / m1 * 0.1, h1[1] / m1 * 0.1], u2 = [ev[0] / 0.85 * 0.1, ev[1] / 0.85 * 0.1];
    polyl100([P(u1), P([u1[0] + u2[0], u1[1] + u2[1]]), P(u2)], C.green, a * opt.e0, 2);
  }
  dot(o[0], o[1], 7, 'c', a);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['After versions thirty-seven and thirty-eight', 'V37–V38 · UNKNOWN RECORD MASSES', 'fixed before the future , never assumed Born', '#8fbcff'], ['how far unknown record masses amplify errors', 'V39 · AMPLIFICATION', '1/κ with two settings → 1/√κ with three', C.gold], ['closes the future in finite depth', 'V39 · FUTURE CLOSURE', 'V₀ ⊂ V₁ ⊂ … ⊂ V_L = V∞', C.cyan], ['version forty tracks how dropped relations come back', 'V40 · HIDDEN MEMORY', 'vₙ₊₁ = A vₙ + B D₀ⁿ z₀ + Σₖ B D₀ᵏ C vₙ₋₁₋ₖ', C.mag]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 320, 58, 'two settings', C.gold, rp, 22); chip(330, 445, 320, 58, 'then three', C.mag, rp, 22); chip(330, 530, 320, 58, 'a closing future', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('a memory that returns', 1610, 410, C.cyan, rp, 22); lblG('B D₀ᵏ C', 1610, 475, C.white, rp, 32);
  txt(scramble('AURIC V39–V40 · CLOSURE', rp, 100), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V39–V40 · 锐 利 设 置 、未 来 闭 合 与 隐 藏 记 忆', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 100 · AURIC_SHARP_NATIVE_THREE_SETTING_STABILITY_FUTURE_CLOSURE_AND_RECURSIVE_ERROR_ENERGY_V39 · AURIC_APPROXIMATE_CLOSURE_HIDDEN_MEMORY_AND_NATIVE_RECURSION_V40', W / 2, 115, { size: 12, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 0 });
};

/* ---- 02 ERROR PLANE (V39 §2–§3.1) ---- */
SCENES.plane = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'One projection per weight is enough', 0.6);
  const q0 = Q(S, 0, 'Send one coherent input', 0.6);
  chipG100(550, 250, 860, 58, 'χ = J(z₀ ⊗ |0⟩ + z₁ ⊗ |1⟩) ,  G = X*X ,  κ = λ_min G', C.white, q0, 21);
  lbl('masses m_i0 = t_i0 + δ_i , m_i1 = t_i1 − δ_i : unknown , fixed before any later choice', 550, 305, C.dim, Q(S, 0, 'with unknown masses', 0.6), 15);
  const pq = Q(S, 0, 'The error lies in the plane of two successor differences', 0.6);
  plane100(330, 640, 330, pq, { delta: pq, e0: Q(S, 1, 'the part of the first difference orthogonal to the second', 0.6), h0: 1 });
  if (f1 > 0) {
    const lq = Q(S, 0, 'each of squared length the determinant of G over p', 0.6) * f1;
    chipG100(1400, 250, 760, 58, 'h_i = a C_g n_i / q_i ,   ‖h_i‖² = det G / p_i', C.gold, lq, 22);
    lbl('A_i = XX* + δ_i H_i  ,  Δ = A₁ − A₀ = δ₁H₁ − δ₀H₀', 1400, 305, C.dim, lq, 15);
    const eq = Q(S, 0, 'their Gram matrix gives the exact error ellipse', 0.6) * f1;
    const cx = 1430, cy = 560, sc = 108;
    line(cx - 215, cy, cx + 215, cy, C.dim, eq, 1.3); line(cx, cy - 200, cx, cy + 200, C.dim, eq, 1.3);
    lbl('δ₀ / η', cx + 215, cy + 26, C.dim, eq, 15, 'right'); lbl('δ₁ / η', cx + 12, cy - 190, C.dim, eq, 15, 'left');
    fillPoly(ELL100.map(p => [cx + p[0] * sc, cy - p[1] * sc]), C.cyan, eq * 0.15);
    strokePoly(ELL100.map(p => [cx + p[0] * sc, cy - p[1] * sc]), C.cyan, eq, 3);
    lblG('‖Δ‖²_op = δᵀ Γ δ ≤ η²', cx - 175, cy - 120, C.cyan, eq, 21, 'right');
    const oq = Q(S, 0, 'optimal constants', 0.6) * f1;
    const [C0, C1, kp] = ELLC100;
    strokePoly([[cx - C0 * sc, cy - C1 * sc], [cx + C0 * sc, cy - C1 * sc], [cx + C0 * sc, cy + C1 * sc], [cx - C0 * sc, cy + C1 * sc]], C.gold, oq, 1.6);
    lbl('C₀ = ' + C0.toFixed(3), cx + C0 * sc + 10, cy + 50, C.gold, oq, 17, 'left');
    lbl('C₁ = ' + C1.toFixed(3), cx + C0 * sc + 10, cy - C1 * sc + 14, C.gold, oq, 17, 'left');
    lbl('C_i = 1/(‖h_i‖ sin ϑ₀₁) ; sample input κ = ' + kp.toFixed(3) + ' , settings I and B', cx - 30, cy + 235, C.dim, oq, 15);
  }
  const q1 = Q(S, 1, 'One projection per weight is enough', 0.6, 0.3);
  if (q1 > 0) {
    chipG100(1400, 380, 760, 58, 'F₀ = Q (I + e₀·σ)/2 Q* ,  e₀ ∝ h₀ − (C/B₁) h₁', C.green, Q(S, 1, 'the part of the first difference orthogonal to the second', 0.6), 21);
    const rq = Q(S, 1, 'reads minus delta zero over C zero', 0.6);
    chipG100(1400, 470, 760, 64, 'Tr(F₀ Δ) = −δ₀ / C₀', C.green, rq, 30);
    const cq = Q(S, 1, 'cancelling the other unknown', 0.6);
    chipG100(1400, 560, 760, 58, 'Tr(F₁ Δ) = δ₁ / C₁   (swap 0 and 1)', C.mag, cq, 23);
    lbl('compiled as native word events : |δ_i| ≤ C_i (r_i + 4τ_i)', 1400, 625, C.dim, cq, 16);
    stamp('TWO EVENTS · TWO WEIGHTS', 1400, 730, Q(S, 1, 'so two events identify both weights', 0.6), C.green, 32, -0.04);
  }
};

/* ---- 03 SHARP ORDERS (V39 §3.2–§4) ---- */
SCENES.sharp = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const px = 170, py = 790, pw = 740, ph = 500;
  const [fx, fy] = lmap100(px, py, pw, ph, -4, -0.3, -0.6, 3.5);
  const pq = Q(S, 0, 'the worst amplification is one over kappa', 0.6);
  plotAxes(px, py, pw, ph, pq, 'κ = λ_min G (log)', 'worst |δ₀| / residual (log)');
  logTicks100(px, py, fx, fy, [[1e-4, '10⁻⁴'], [1e-3, '10⁻³'], [1e-2, '10⁻²'], [1e-1, '10⁻¹']], [[1, '1'], [10, '10'], [100, '10²'], [1000, '10³']], pq);
  const gq = Q(S, 0, 'an explicit family keeps the mass error fixed', 0.6);
  polyl100(AMP2_100.map(r => [fx(r[0]), fy(r[1])]), C.gold, gq, 3.5);
  AMP2_100.forEach((r, i) => { if (i % 3 === 0) dot(fx(r[0]), fy(r[1]), 5, 'g', gq); });
  lbl('gold : two settings , family , slope −1', fx(0.006), fy(1800), C.gold, gq, 16, 'left');
  const tq = Q(S, 1, 'the amplification drops to one over root kappa', 0.6);
  polyl100(AMP3_100.map(r => [fx(r[0]), fy(r[2])]), C.cyan, tq, 2.5);
  lbl('cyan : three settings , bound , slope −1/2', fx(0.006), fy(1800) + 28, C.cyan, tq, 16, 'left');
  const bq = Q(S, 1, 'an order that a balanced family shows cannot improve', 0.6);
  AMP3_100.forEach(r => dot(fx(r[0]), fy(r[1]), 5, 'm', bq));
  lbl('magenta : balanced family , δ₀ = 1/2', fx(0.006), fy(1800) + 56, C.mag, bq, 16, 'left');
  const f1 = 1 - Q(S, 1, 'Add a third native setting, B squared', 0.6);
  if (f1 > 0) {
    chipG100(1400, 260, 780, 56, 'S₀ = I ,  S₁ = B ,  n₀·n₁ = −x³ ,  |n₀ × n₁| = 2x^(3/2)', C.white, Q(S, 0, 'For the golden pair, the identity and B', 0.6) * f1, 20);
    chipG100(1400, 350, 780, 56, 'G_κ = (I + (1 − 2κ) n·σ)/2 ,  n = (n₀ + n₁)/2x', C.gold, pq * f1, 21);
    chipG100(1400, 440, 780, 56, 'δ₀ = δ ,  δ₁ = −δ ,  0 < δ ≤ x²/2 : all masses legal', C.gold, gq * f1, 21);
    const rq = Q(S, 0, 'while the residual shrinks like kappa', 0.6) * f1;
    chipG100(1400, 540, 780, 66, '‖A₁ − A₀‖ = 8δκ(1 − κ) / (1 + 4xκ(1 − κ))', C.cyan, rq, 24);
    lbl('λ_min Γ = 32 d_G² / (1 + 4x d_G)² , attained along (δ , −δ)', 1400, 605, C.dim, rq, 15);
    stamp('1/κ IS SHARP', 1400, 710, rq, C.gold, 38, -0.05);
  }
  const q1 = Q(S, 1, 'Add a third native setting, B squared', 0.6, 0.3);
  if (q1 > 0) {
    const v = v3(1180, 420, 150, 0.9 + t * 0.12, 0.35);
    ring(1180, 420, 150, C.dim, q1 * 0.6, 1.5);
    const aq = Q(S, 1, 'the three record axes are independent', 0.6);
    const cols = [C.gold, C.mag, C.green], labs = ['n₀ (I)', 'n₁ (B)', 'n₂ (B²)'];
    AX3_100.forEach((n, i) => { const qq = i < 2 ? q1 : aq; const o = v(0, 0, 0), e = v(n[0], n[1], n[2]); arrow(o[0], o[1], e[0], e[1], cols[i], qq, 3.5); lbl(labs[i], e[0] + 10, e[1] - 10, cols[i], qq, 17, 'left'); });
    lblG('S₂ = B² : two native calls', 1580, 300, C.white, q1, 19);
    lbl('with its own full record contract', 1580, 328, C.dim, q1, 13);
    lblG('|det(n₀, n₁, n₂)| > 0', 1580, 360, C.green, aq, 20);
    lbl('= 2x³(1 − x⁶) sin θ (1 − cos θ) , θ = 3π/5', 1580, 395, C.dim, aq, 13);
    const cq = Q(S, 1, 'with an explicit golden constant c zero', 0.6);
    chipG100(1400, 620, 780, 56, 'c₀ ≥ x²(1 − x⁴) / (1 + x(1 − x⁴)) = 0.2135 ;  c₀ = ' + NUM100.c0.toFixed(4), C.green, cq, 19);
    chipG100(1400, 700, 780, 64, '|δ₀| ≤ √(η₁² + η₂²) / (2√(d_G c₀))', C.cyan, tq, 25);
    stamp('1/√κ CANNOT IMPROVE', 1400, 790, bq, C.mag, 30, -0.04);
  }
};

/* ---- 04 RANK-ONE BRIDGE (V39 §5) ---- */
SCENES.bridge = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'Across the rank-one boundary', 0.6);
  const cx = 470, cy = 630, R = 175;
  ring(cx, cy, R, C.cyan, q0, 2.5); fillEll100(cx, cy, R, R, C.cyan, q0 * 0.05);
  lbl('full rank : κ > 0', cx - 20, cy + 40, C.cyan, q0, 16); lbl('boundary circle : rank one , κ = 0', cx - 20, cy + 70, C.cyan, q0, 15);
  const an = -0.75, tx = cx + R * Math.cos(an), ty = cy + R * Math.sin(an);
  dot(tx, ty, 11, 'm', q0); lbl('χ₀ target', tx + 18, ty - 10, C.mag, q0, 18, 'left');
  const aq = Q(S, 0, 'approaching a rank-one target', 0.6);
  [0.55, 0.38, 0.24, 0.13, 0.06].forEach((tau, i) => { const qq = clamp(aq * 1.6 - i * 0.18), r = R * (1 - tau); dot(cx + r * Math.cos(an), cy + r * Math.sin(an), 7, 'c', qq); });
  arrow(cx + R * 0.4 * Math.cos(an), cy + R * 0.4 * Math.sin(an), cx + R * 0.88 * Math.cos(an), cy + R * 0.88 * Math.sin(an), C.gold, aq, 2.5);
  lbl('χ_τ , trace distance τ = √ε', cx + 30, cy - 10, C.gold, aq, 16, 'left');
  const f1 = 1 - Q(S, 1, 'The square root is sharp', 0.6);
  if (f1 > 0) {
    const mq = Q(S, 0, 'with masses moving at most L tau', 0.6) * f1;
    chipG100(550, 260, 820, 56, '|m₀₀(χ_τ) − m₀₀(χ₀)| ≤ Lτ ,   E_τ = √(η₁² + η₂²) ≤ ε', C.white, mq, 20);
    const bq = Q(S, 0, 'the mass error is at most', 0.6) * f1;
    chipG100(550, 340, 820, 62, '|m₀₀ − t₀₀|(χ₀) ≤ (L + 1/√(2c₀)) √ε + ε', C.gold, bq, 25);
    lbl('three settings on each χ_τ , same conditional terminal', 550, 395, C.dim, bq, 15);
  }
  const q1 = Q(S, 1, 'The square root is sharp', 0.6, 0.3);
  if (q1 > 0) {
    const dq = Q(S, 1, 'record rules drifting as b minus L tau', 0.6);
    chipG100(550, 260, 820, 56, 'δ₀(τ) = (b − Lτ)₊ ,  δ₁ = δ₂ = 0 ,  b = √(√2 L ε)', C.mag, dq, 21);
    const sq = Q(S, 1, 'stay within budget', 0.6);
    chipG100(550, 340, 820, 56, 'E_τ = 2√2 τ√(1 − τ²)(b − Lτ)₊ ≤ b²/(√2 L) = ε', C.mag, sq, 21);
    lbl('target error b = 2^(1/4) √L √ε , on the balanced curve t₀₀ ≡ 1/2', 550, 395, C.dim, Q(S, 1, 'miss the target by a constant times root epsilon', 0.6), 15);
  }
  const px = 1060, py = 780, pw = 700, ph = 470;
  const [fx, fy] = lmap100(px, py, pw, ph, -6, -0.75, -3.4, 0.3);
  const plq = Q(S, 0, 'this gives a square-root rate', 0.6);
  plotAxes(px, py, pw, ph, plq, 'budget ε (log)', 'target mass error (log) , L = 1');
  logTicks100(px, py, fx, fy, [[1e-6, '10⁻⁶'], [1e-4, '10⁻⁴'], [1e-2, '10⁻²']], [[1e-3, '10⁻³'], [1e-2, '10⁻²'], [1e-1, '10⁻¹'], [1, '1']], plq);
  const uq = Q(S, 0, 'the mass error is at most', 0.6);
  polyl100(BR100.map(r => [fx(r[0]), fy(r[1])]), C.gold, uq, 3.5);
  lbl('gold : upper bound ' + BRK100[0].toFixed(3) + ' √ε + ε', fx(1.5e-6), fy(0.9), C.gold, uq, 16, 'left');
  const lq = Q(S, 1, 'miss the target by a constant times root epsilon', 0.6);
  polyl100(BR100.map(r => [fx(r[0]), fy(r[2])]), C.mag, lq, 3.5);
  BR100.forEach((r, i) => { if (i % 4 === 0) dot(fx(r[0]), fy(r[2]), 6, 'm', lq); });
  lbl('magenta : lower family ' + BRK100[1].toFixed(3) + ' √ε', fx(1.5e-6), fy(0.9) + 28, C.mag, lq, 16, 'left');
  stamp('SLOPE 1/2 : EXPONENT SHARP', 1555, 735, lq, C.mag, 24, -0.04);
};

/* ---- 05 FINITE FUTURE (V39 §6) ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On the eighty-nine-dimensional carrier', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Keep adding what one more native call can reveal', 0.6) * f1;
    const px = 170, py = 780, pw = 740, ph = 470, xS = n => px + n / 12.5 * pw, yS = v => py - v / 38 * ph;
    plotAxes(px, py, pw, ph, q, 'step n', 'dim V_n');
    [0, 4, 8, 12].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, q, 14)); [0, 16, 36].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, q, 14, 'right'));
    const st = arr => { const p = []; arr.forEach((v, n) => { if (n) p.push([xS(n), yS(arr[n - 1])]); p.push([xS(n), yS(v)]); }); p.push([xS(arr.length - 1 + 0.9), yS(arr[arr.length - 1])]); return p; };
    polyl100(st(CH6_100), C.gold, q, 3.5); CH6_100.forEach((v, n) => dot(xS(n), yS(v), 6, 'g', q));
    dashed(px, yS(36), px + pw, yS(36), C.gold, q * 0.6, 1.4); lbl('D² = 36', px + pw, yS(36) - 10, C.gold, q, 15, 'right');
    lbl('D = 6 : shift + golden block , L = 8 ≤ 34', xS(0.3), yS(31), C.gold, q, 16, 'left');
    const sq = Q(S, 0, 'once a step adds nothing, the chain stops for good', 0.6) * f1;
    polyl100(st(CH4_100), C.cyan, sq, 3); CH4_100.forEach((v, n) => dot(xS(n), yS(v), 5, 'c', sq));
    dashed(px, yS(16), px + pw, yS(16), C.cyan, sq * 0.6, 1.4); lbl('D² = 16', px + pw, yS(16) - 10, C.cyan, sq, 15, 'right');
    lbl('D = 4 , one word : +1 per step , stops at 14 < 16', xS(4.6), yS(2.5), C.cyan, sq, 16, 'left');
    chipG100(1400, 270, 800, 56, 'V₀ = span{I, E_s} ,  V_(n+1) = V_n + Σ_j K_j* V_n K_j', C.white, q, 20);
    chipG100(1400, 360, 800, 56, 'V_(n+1) = V_n  ⇒  V_m = V_n = V∞ for all m ≥ n', C.cyan, sq, 21);
    const lq = Q(S, 0, 'within D squared minus dim V zero steps', 0.6) * f1;
    chipG100(1400, 460, 800, 62, 'L ≤ dim V∞ − dim V₀ ≤ D² − dim V₀', C.gold, lq, 25);
    lbl('each step before stopping adds at least one direction', 1400, 520, C.dim, lq, 15);
    const hq = Q(S, 0, 'one hundred fifty-six on the thirteen-dimensional carrier', 0.6) * f1;
    chipG100(1400, 610, 800, 58, 'H₁₃ : 13 terminal effects  →  L ≤ 169 − 13 = 156', C.green, hq, 22);
    lbl('five-prefix readout : dim V₀ = 5  →  L ≤ 164', 1400, 670, C.dim, hq, 16);
  }
  const q1 = Q(S, 1, 'On the eighty-nine-dimensional carrier', 0.6, 0.3);
  if (q1 > 0) {
    const tq = Q(S, 1, 'fifty-five Fibonacci prefixes', 0.6);
    for (let i = 0; i < 55; i++) { const r2 = i < 34, qq = clamp(tq * 1.6 - i / 70), x = 160 + (i % 11) * 70, y = 290 + Math.floor(i / 11) * 70; fillBox(x, y, 58, 58, r2 ? C.gold : C.cyan, qq * 0.35); rect63(x, y, 58, 58, r2 ? C.gold : C.cyan, qq, 1.3); lbl(r2 ? '2' : '1', x + 29, y + 37, C.white, qq, 18); }
    const rq = Q(S, 1, 'thirty-four of rank two and twenty-one of rank one', 0.6);
    lbl('34 prefixes ending in 0 : rank 2 (gold) · 21 ending in 1 : rank 1 (cyan)', 545, 680, C.white, rq, 16);
    lbl('8-bit prefixes with no 11 : F₁₀ = 55 ;  2·34 + 21 = 89', 545, 712, C.dim, rq, 16);
    const dq = Q(S, 1, 'bound the depth by seven thousand eight hundred sixty-six', 0.6);
    chipG100(545, 785, 780, 60, 'H₈₉ : L ≤ 89² − 55 = 7866', C.gold, dq, 26);
    const iq = Q(S, 1, 'Once closed, unitary words act on kept relations as exact isometries', 0.6);
    const px = 1060, py = 690, pw = 700, ph = 300, xS = n => px + n / 24 * pw, yS = v => py - v / 0.32 * ph;
    plotAxes(px, py, pw, ph, iq, 'letters of a random word', 'HS length of the difference');
    polyl100(ISO100.map((r, n) => [xS(n), yS(r[1])]), C.dim, iq, 2); ISO100.forEach((r, n) => dot(xS(n), yS(r[1]), 4, 'n', iq));
    polyl100(ISO100.map((r, n) => [xS(n), yS(r[0])]), C.green, iq, 4);
    lbl('projected to the closure V : constant', px + pw, yS(ISO100[0][0]) - 14, C.green, iq, 16, 'right');
    lbl('grey : projected to V₀ only , varies', px + 10, py + 52, C.dim, iq, 15, 'left');
    chipG100(1410, 290, 760, 58, '‖P_V(K_w(ρ − σ)K_w*)‖_HS = ‖P_V(ρ − σ)‖_HS', C.green, iq, 21);
    lbl('dense native words : V∞ = Herm(H_D) , a linear summary needs D² − 1 = 168 or 7920 numbers', 1410, 345, C.dim, iq, 13);
  }
};

/* ---- 06 GRAM METRIC (V39 §7) ---- */
SCENES.gram = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On the golden seed this is concrete', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Basis effects among future words', 0.6) * f1;
    chipG100(550, 270, 820, 56, 'A_ℓ = K_wℓ* E_sℓ K_wℓ ,  B_ℓ = A_ℓ − (Tr A_ℓ / D) I', C.white, q, 20);
    chipG100(550, 350, 820, 56, 'x_ℓ(ρ) = Tr(ρ A_ℓ) − Tr A_ℓ / D ,  Gram_ℓm = Tr(B_ℓ B_m)', C.white, q, 20);
    const mq = Q(S, 0, 'a Gram matrix that is the exact metric', 0.6) * f1;
    chipG100(550, 440, 820, 60, '‖P_V(ρ − σ)‖²_HS = δxᵀ Gram⁻¹ δx', C.cyan, mq, 25);
    const tq = Q(S, 0, 'outcomes of every future word, of any length', 0.6) * f1;
    chipG100(550, 530, 820, 62, 'TV(p_w(ρ), p_w(σ)) ≤ √D / (2√α) · ‖δx‖₂', C.gold, tq, 25);
    lbl('for every word w , any length ; α = λ_min Gram', 550, 592, C.dim, tq, 15);
    lbl('recomputed on a 4-dimensional block menu : sampled max ratio 0.27 ≤ 1', 550, 625, C.dim, tq, 15);
    lbl('in the Gram basis each native step is an isometry : Rᵀ Gram⁻¹ R = Gram⁻¹', 550, 690, C.cyan, tq, 15);
    const rq = Q(S, 0, 'But a rotation closes in one step while alpha tends to zero', 0.6) * f1;
    const px = 1060, py = 790, pw = 700, ph = 360, xS = th => px + th / Math.PI * pw, yS = v => py - v / 0.55 * ph;
    plotAxes(px, py, pw, ph, rq, 'θ', 'α = λ_min Gram');
    polyl100(ALPHA100.map(r => [xS(r[0]), yS(r[1])]), C.mag, rq, 3.5);
    [[0, '0'], [Math.PI / 2, 'π/2'], [Math.PI, 'π']].forEach(([v, s]) => lbl(s, xS(v), py + 26, C.dim, rq, 15));
    lbl('0.5', px - 10, yS(0.5) + 5, C.dim, rq, 14, 'right');
    lbl('α = (1 − |cos θ|)/2 → 0', xS(2.25), yS(0.47), C.mag, rq, 17, 'left');
    chipG100(1410, 280, 740, 56, 'K = R_y(θ) , E = (I + Z)/2 : V₁ = span{I, Z, X} = V∞', C.mag, rq, 19);
    lbl('depth one for every 0 < θ < π ; θ = π/2N : gap sin θ after one step , 1 after N', 1410, 332, C.dim, rq, 13);
  }
  const q1 = Q(S, 1, 'On the golden seed this is concrete', 0.6, 0.3);
  if (q1 > 0) {
    const hq = Q(S, 1, 'the histories K-three v and K-three inverse v', 0.6);
    const by = 730, hs = 380;
    const grp = [['K₃v now', [NAT100[0][0], NAT100[0][1]], hq], ['K₃⁻¹v now', [NAT100[0][0], NAT100[0][1]], hq]];
    grp.forEach(([nm, vals, qq], g) => { const x0 = 170 + g * 230; vals.forEach((v, k) => bar100(x0 + k * 80, by, 62, v * hs, k ? C.cyan : C.gold, qq)); lbl(nm, x0 + 70, by + 30, C.white, qq, 17); });
    const pq = Q(S, 1, 'with probabilities x and x squared', 0.6);
    lbl('p_u = x', 201, by - NAT100[0][0] * hs - 12, C.gold, pq, 15); lbl('p_v = x²', 281, by - NAT100[0][1] * hs - 12, C.cyan, pq, 15);
    lbl('p_u = x', 431, by - NAT100[0][0] * hs - 12, C.gold, pq, 15); lbl('p_v = x²', 511, by - NAT100[0][1] * hs - 12, C.cyan, pq, 15);
    const nq = Q(S, 1, 'yet one more call gives x to the fourth versus one', 0.6);
    bar100(700, by, 70, NAT100[1][0] * hs, C.mag, nq); lbl('x⁴', 735, by - NAT100[1][0] * hs - 12, C.mag, nq, 18); lbl('K₃K₃v', 735, by + 30, C.white, nq, 16);
    bar100(830, by, 70, NAT100[1][1] * hs, C.green, nq); lbl('1', 865, by - hs - 12, C.green, nq, 18); lbl('K₃K₃⁻¹v', 865, by + 30, C.white, nq, 16);
    lbl('p_v after one more K₃', 800, by + 58, C.dim, nq, 15);
    line(640, by - hs - 30, 640, by + 40, C.dim, nq * 0.6, 1.4);
    chipG100(1410, 270, 760, 56, 'seed v = e₀₀₁₀₀ ,  u = e₀₀₀₀₀ :  K₃ on span{u, v} = golden block', C.white, q1, 19);
    chipG100(1410, 350, 760, 56, 'ψ₊ = K₃ v ,   ψ₋ = K₃⁹ v = K₃* v', C.gold, hq, 23);
    chipG100(1410, 430, 760, 56, 'now : p_u = x ,  p_v = x²  for both', C.cyan, pq, 23);
    chipG100(1410, 510, 760, 56, 'next : |⟨v|K₃ψ₊⟩|² = x⁴ ,  |⟨v|K₃ψ₋⟩|² = 1', C.mag, nq, 22);
    stamp('SAME NOW · DIFFERENT NEXT', 1410, 620, nq, C.red, 32, -0.04);
    lbl('4-cycle : steps 0 and 1 agree , step 2 separates — recurse on the full carrier', 1410, 700, C.dim, nq, 14);
  }
};

/* ---- 07 ERROR ENERGY (V39 §8–§9) ---- */
SCENES.energy = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'lean'], [0, 'Discretely, finite energy means', 'classical'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'One step need not shrink', 0.6);
  if (f1 > 0) {
    const dq = Q(S, 0, "Datko's theorem, frozen in Lean", 0.6) * f1;
    box(150, 240, 800, 210, C.green, dq, 2, 'rgba(0,40,20,0.4)');
    lbl('DATKO · FROZEN GENERAL THEOREM', 550, 280, C.green, dq, 19);
    lblG('∀x : ∫₀^∞ ‖S(t)x‖² dt < ∞   ⇔   ‖S(t)‖ ≤ M e^(−ωt)', 550, 340, C.white, Q(S, 0, 'has finite squared orbit energy for every vector', 0.6) * f1, 24);
    lbl('strongly continuous contraction semigroup , real Banach space , M ≥ 1 , ω > 0', 550, 385, C.dim, dq, 14);
    lbl('D5/S3/Quantum/Analysis/DatkoStability · integrable_sq_orbit_iff_exponential_stability', 550, 420, C.green, dq, 13);
    const lq = Q(S, 0, 'Discretely, finite energy means', 0.6) * f1;
    chipG100(550, 520, 800, 60, 'Σₙ ‖Tⁿe‖² < ∞ ∀e   ⇔   TᵀPT = P − I , P ≻ 0', C.gold, lq, 23);
    const sq = Q(S, 0, 'or spectral radius below one', 0.6) * f1;
    chipG100(550, 605, 800, 56, '⇔   ρ(T) < 1', C.gold, sq, 24);
    lbl('then ‖Te‖²_P = ‖e‖²_P − ‖e‖² ≤ q²‖e‖²_P ,  q = √(1 − 1/λ_max P)', 550, 668, C.dim, sq, 15);
    lbl('standard discrete Lyapunov theory (Boyd , EE363) , applied to three-axis errors', 550, 700, C.dim, sq, 14);
  }
  const px = 1060, py = 520, pw = 700, ph = 260, xS = n => px + n / 12 * pw, yS = v => py - v / 1.1 * ph;
  const oq = Q(S, 0, "Datko's theorem, frozen in Lean", 0.6);
  plotAxes(px, py, pw, ph, oq, 'step n', '‖eₙ‖');
  polyl100(ORB100.map((r, n) => [xS(n), yS(r[2])]), C.dim, oq, 2.5); lbl('unitary : no decay', px + pw, yS(ORB100[0][2]) - 12, C.dim, oq, 15, 'right');
  const gq = Q(S, 0, 'or spectral radius below one', 0.6);
  polyl100(ORB100.map((r, n) => [xS(n), yS(r[0])]), C.gold, gq, 3.5); ORB100.forEach((r, n) => dot(xS(n), yS(r[0]), 5, 'g', gq));
  lbl('gold : ρ(T) = 0.78 , exponential', xS(5.5), yS(0.42), C.gold, gq, 15, 'left');
  const nq = Q(S, 1, 'yet T squared is zero', 0.6);
  polyl100(ORB100.map((r, n) => [xS(n), yS(r[1])]), C.cyan, nq, 3.5); ORB100.forEach((r, n) => dot(xS(n), yS(r[1]), 6, 'c', nq));
  lbl('cyan : ‖T‖ = 1 , T² = 0 , zero after two steps', xS(5.5), yS(0.7), C.cyan, nq, 15, 'left');
  const q1 = Q(S, 1, 'One step need not shrink', 0.6, 0.3);
  if (q1 > 0) {
    chipG100(550, 270, 800, 56, 'Φ(ρ) = ⟨0|ρ|0⟩ |+⟩⟨+| + ⟨1|ρ|1⟩ |−⟩⟨−|', C.white, q1, 22);
    const cq = Q(S, 1, 'a legal channel sending z to x has norm one', 0.6);
    chipG100(550, 350, 800, 56, '(r_x, r_y, r_z) ↦ (r_z, 0, 0) :  ‖T‖ = 1', C.cyan, cq, 22);
    chipG100(550, 430, 800, 56, 'T² = 0 ,  P = I + TᵀT = diag(1, 1, 2) ,  q = 1/√2', C.cyan, nq, 22);
    lbl('forced errors : limsup ‖e_m‖_P ≤ δ / (1 − q)', 550, 490, C.dim, nq, 15);
    const rq = Q(S, 1, 'Rotations by one over j converge input by input', 0.6);
    chipG100(550, 580, 800, 56, 'θ_j = 1/j ,  Σ sin²(1/j) = 1.3263 < ∞ ,  V_N = U₁ ⋯ U_N', C.mag, rq, 20);
    const wq = Q(S, 1, 'never uniformly: a gap of root two remains', 0.6);
    chipG100(550, 660, 800, 56, 'V_N → V strongly ,  but  ‖V_N − V_M‖ ≥ √2', C.red, wq, 23);
    lbl('minimal N with Σ_(M<j≤N) 1/j ≥ π/2 : tensor eigenvector gives |e^(iΘ) − 1| ≥ √2', 550, 720, C.dim, wq, 13);
    const bpx = 1060, bpy = 800, bph = 190;
    plotAxes(bpx, bpy, 700, bph, rq, '', '');
    LIM100.forEach((r, i) => { const x = bpx + 30 + i * 112; bar100(x, bpy, 46, r[4] / 1.6 * bph, C.mag, rq); dot(x + 23, bpy - r[3] / 1.6 * bph, 7, 'r', wq); lbl('M=' + r[0], x + 23, bpy + 20, C.dim, rq, 13); lbl('N=' + r[1], x + 23, bpy + 38, C.dim, rq, 12); });
    dashed(bpx, bpy - Math.SQRT2 / 1.6 * bph, bpx + 700, bpy - Math.SQRT2 / 1.6 * bph, C.red, wq, 1.6);
    lbl('√2', bpx + 706, bpy - Math.SQRT2 / 1.6 * bph + 5, C.red, wq, 15, 'left');
    lbl('bars : ‖(V_∞ − V_M) vac‖ → 0 ;  dots : |e^(iΘ) − 1|', bpx + 350, bpy - bph - 10, C.dim, rq, 14);
  }
};

/* ---- 08 COMMON CHANNEL (V40 §2) ---- */
SCENES.encode = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A common two-Kraus channel does it', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'To shrink residual mass y in mode five to beta y', 0.6) * f1;
    const by = 640, hs = 330, modes = ['|2⟩', '|5⟩', '|3⟩'], cols = [C.cyan, C.mag, C.gold];
    [[0.4, 0.4, 0.2], [0.6, 0.2, 0.2]].forEach((vals, g) => { const x0 = 180 + g * 420; vals.forEach((v, k) => { bar100(x0 + k * 95, by, 70, v * hs, cols[k], q); lbl(modes[k], x0 + k * 95 + 35, by + 28, cols[k], q, 18); lbl(v.toFixed(1), x0 + k * 95 + 35, by - v * hs - 12, C.white, q, 15); }); });
    lbl('v_y : (a − y , y , 1 − a)', 320, by + 62, C.white, q, 16); lbl('v_βy : (a − βy , βy , 1 − a)', 740, by + 62, C.white, q, 16);
    arrow(500, by - 120, 580, by - 120, C.gold, q, 3);
    lbl('a = 0.8 , y = 0.4 , β = 0.5', 550, 300, C.dim, q, 15);
    lblG('v_y = √(a − y)|2⟩ + √y|5⟩ + √(1 − a)|3⟩', 550, 262, C.white, q, 22);
    const eq = Q(S, 0, 'each state can be rotated', 0.6) * f1;
    lbl('each single v_y : some unitary sends it to v_βy', 550, 760, C.dim, eq, 15);
    const nq = Q(S, 0, 'no common unitary works for all y', 0.6) * f1;
    const px = 1060, py = 720, pw = 700, ph = 400, xS = y => px + y / 0.8 * pw, yS = v => py - (v - 0.15) / 0.88 * ph;
    plotAxes(px, py, pw, ph, nq, 'y', 'overlap with v₀');
    polyl100(OV100.map(r => [xS(r[0]), yS(r[1])]), C.gold, nq, 3.5); polyl100(OV100.map(r => [xS(r[0]), yS(r[2])]), C.cyan, nq, 3.5);
    const oq = Q(S, 0, 'overlaps with the y equal zero state would have to grow', 0.6) * f1;
    lbl('|⟨v₀, v_y⟩|', xS(0.8) - 14, yS(OV100[20][1]) + 6, C.gold, nq, 16, 'right'); lbl('|⟨v₀, v_βy⟩|', xS(0.8) - 4, yS(OV100[20][2]) - 14, C.cyan, nq, 16, 'right');
    for (let i = 4; i <= 20; i += 4) arrow(xS(OV100[i][0]), yS(OV100[i][1]) - 4, xS(OV100[i][0]), yS(OV100[i][2]) + 8, C.red, oq, 2);
    [0, 0.4, 0.8].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, nq, 14));
    stamp('NO COMMON UNITARY', 1330, 640, oq, C.red, 28, -0.04);
    lbl('same for density matrices : I₃/3 would have to move to ((2 − β)/3 , β/3 , 1/3)', 1410, 770, C.dim, oq, 13);
  }
  const q1 = Q(S, 1, 'A common two-Kraus channel does it', 0.6, 0.3);
  if (q1 > 0) {
    chipG100(550, 270, 820, 56, 'A₀ = diag(1, √β, 1) ,   A₁ = √(1 − β) |2⟩⟨5|', C.white, q1, 22);
    const mq = Q(S, 1, 'moving one minus beta of mode five into mode two', 0.6);
    chipG100(550, 355, 820, 60, '(X, Y, Z) ↦ (X + (1 − β)Y , βY , Z)', C.gold, mq, 26);
    lbl('exact on every density matrix of span{|2⟩, |5⟩, |3⟩}', 550, 410, C.dim, mq, 15);
    const kq = Q(S, 1, 'keeping the history in an internal record', 0.6);
    chipG100(550, 480, 820, 56, 'V_β ψ = A₀ψ ⊗ |0⟩ + A₁ψ ⊗ |1⟩', C.cyan, kq, 23);
    lbl('purity of the system output : 1 − 2(1 − β)y((1 − a) + βy) < 1', 550, 535, C.dim, kq, 15);
    const rq = Q(S, 1, 'the final channel needs two record dimensions', 0.6);
    chipG100(550, 610, 820, 56, 'final channel Φⁿ : 2 Kraus , record dimension 2', C.green, rq, 21);
    const hq = Q(S, 1, 'all first-transfer times n plus one', 0.6);
    chipG100(550, 690, 820, 56, 'whole history βⁿ , (1 − β)βʲ⁻¹ : record dimension ≥ n + 1', C.mag, hq, 20);
    const cq = Q(S, 1, 'an unreset record returns cosine squared n theta', 0.6);
    const px = 1060, py = 760, pw = 700, ph = 440, xS = n => px + n / 12 * pw, yS = v => py - v / 1.1 * ph;
    plotAxes(px, py, pw, ph, rq, 'round n', 'mass left in mode five');
    polyl100(RET100.map(r => [xS(r[0]), yS(r[1])]), C.gold, rq, 3.5); RET100.forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'g', rq));
    lbl('fresh record each round : βⁿ', px + 10, py + 54, C.gold, rq, 16, 'left');
    const thc = Math.acos(Math.sqrt(0.6));
    curve(p => [xS(p * 12), yS(Math.cos(p * 12 * thc) ** 2)], 160, C.mag, cq * 0.45, 1.5); RET100.forEach(r => { line(xS(r[0]), yS(0), xS(r[0]), yS(r[2]), C.mag, cq * 0.5, 1.5); dot(xS(r[0]), yS(r[2]), 7, 'm', cq); });
    lbl('one unreset record : cos²(nθ) , cos θ = √β', px + pw, py - ph - 40, C.mag, cq, 16, 'right');
    lbl('β = 0.6', px + pw, py + 54, C.dim, rq, 14, 'right');
  }
};

/* ---- 09 MEMORY KERNEL (V40 §3–§4) ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For a near-closed word of length L', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Compress an orthogonal evolution to a visible subspace', 0.6) * f1;
    box(170, 330, 300, 200, C.cyan, q, 2.5, 'rgba(0,30,40,0.4)'); lbl('VISIBLE V = ran P', 320, 370, C.cyan, q, 18); lblG('vₙ', 320, 450, C.white, q, 36);
    const dq = Q(S, 0, 'the dropped part returns through an exact memory kernel', 0.6) * f1;
    box(630, 330, 300, 200, C.mag, dq, 2.5, 'rgba(40,0,40,0.4)'); lbl('HIDDEN Q W', 780, 370, C.mag, dq, 18); lblG('zₙ', 780, 450, C.white, dq, 36);
    ring(320, 300, 34, C.cyan, q, 2); lbl('A', 320, 258, C.cyan, q, 20);
    ring(780, 300, 34, C.mag, dq, 2); lbl('D₀', 780, 258, C.mag, dq, 20);
    arrow(475, 380, 625, 380, C.gold, dq, 3); lbl('C', 550, 365, C.gold, dq, 20);
    arrow(625, 480, 475, 480, C.green, dq, 3); lbl('B', 550, 512, C.green, dq, 20);
    const lq = Q(S, 0, 'leave, linger, come back', 0.6) * f1;
    if (lq > 0) { const ph = (t * 0.45) % 1; let px_, py_; if (ph < 0.25) { const s = ph / 0.25; px_ = 475 + s * 150; py_ = 380; } else if (ph < 0.75) { const s = (ph - 0.25) / 0.5; px_ = 780 + 34 * Math.cos(Math.PI + s * TAU); py_ = 300 + 34 * Math.sin(Math.PI + s * TAU); } else { const s = (ph - 0.75) / 0.25; px_ = 625 - s * 150; py_ = 480; } dot(px_, py_, 9, 'o', lq); }
    chipG100(550, 610, 820, 64, 'vₙ₊₁ = A vₙ + B D₀ⁿ z₀ + Σ_(k<n) B D₀ᵏ C v_(n−1−k)', C.white, dq, 22);
    lbl('exact : no averaging , no reset , no independent noise', 550, 670, C.dim, dq, 15);
    lbl('recomputed : random orthogonal map on R⁸ , rank-3 V , 15 steps', 550, 700, C.dim, dq, 14);
    const vq = Q(S, 0, 'it vanishes exactly when the subspace is invariant', 0.6) * f1;
    chipG100(1410, 290, 760, 60, 'B D₀ᵏ C = 0 ∀k   ⇔   C = 0   ⇔   U V = V', C.cyan, vq, 23);
    lbl('then B = 0 and A is orthogonal on V', 1410, 345, C.dim, vq, 15);
    const hq = Q(S, 0, 'h plus one steps decide', 0.6) * f1;
    chipG100(1410, 430, 760, 58, 'enough : k ≤ h − 1 , or PUⁿP = Aⁿ for n ≤ h + 1', C.gold, hq, 21);
    lbl('h = dim of the hidden part (Cayley–Hamilton)', 1410, 485, C.dim, hq, 15);
    lbl('finite dimension is needed : the two-sided shift on ℓ²(Z)', 1410, 560, C.dim, hq, 14);
    lbl('has A = 0 , C ≠ 0 , yet P Uⁿ P = Aⁿ = 0 for all n ≥ 1', 1410, 585, C.dim, hq, 14);
  }
  const q1 = Q(S, 1, 'For a near-closed word of length L', 0.6, 0.3);
  if (q1 > 0) {
    chipG100(550, 270, 840, 60, '‖P U_L⋯U₁x − A_L⋯A₁Px‖ ≤ min(1, s_L)‖Qx‖ + min(2, t_L)‖Px‖', C.white, q1, 19);
    lbl('ℓ_j = ‖Q U_j P‖ , s_L = Σ ℓ_j , t_L = Σ_(i<j) ℓ_i ℓ_j ; sampled max ratio 0.93 ≤ 1', 550, 325, C.dim, q1, 14);
    const hq = Q(S, 1, 'hidden error grows like L ell', 0.6);
    chipG100(550, 400, 840, 56, 'hidden start : s_L ≈ L ℓ', C.mag, hq, 23);
    const rq = Q(S, 1, 'the return like L, L minus one, over two, ell squared', 0.6);
    chipG100(550, 480, 840, 56, 'visible start : t_L ≈ L(L − 1) ℓ² / 2', C.gold, rq, 23);
    const aq = Q(S, 1, 'a rotation attains both', 0.6);
    chipG100(550, 570, 840, 56, 'R_y(θ) : |cos Lθ − cosᴸθ| / ℓ² → L(L − 1)/2 ,  |sin Lθ| / ℓ → L', C.cyan, aq, 18);
    lbl('kernel −sin²θ cosᵏθ : each term → 0 , absolute sum = 1 + cos θ', 550, 630, C.dim, aq, 15);
    const tq = Q(S, 1, 'At theta pi over two N the truth reaches zero', 0.6);
    const px = 1060, py = 770, pw = 700, ph = 440, xS = n => px + n / 20 * pw, yS = v => py - v / 1.08 * ph;
    plotAxes(px, py, pw, ph, tq, 'step n  (N = 20)', 'visible coefficient');
    polyl100(KER100.map(r => [xS(r[0]), yS(r[1])]), C.gold, tq, 3.5); KER100.forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'g', tq));
    lbl('truth cos(nθ) → 0', xS(19.5), yS(0.12), C.gold, tq, 16, 'right');
    const pq = Q(S, 1, 'while the prediction stays near one', 0.6);
    polyl100(KER100.map(r => [xS(r[0]), yS(r[2])]), C.cyan, pq, 3.5); KER100.forEach(r => dot(xS(r[0]), yS(r[2]), 5, 'c', pq));
    dashed(px, yS(KERN100[1]), px + pw, yS(KERN100[1]), C.cyan, pq * 0.7, 1.4);
    lbl('memoryless (cos θ)ⁿ ≥ 1 − π²/8N = ' + KERN100[1].toFixed(3), xS(19.5), yS(KERN100[1]) + 30, C.cyan, pq, 15, 'right');
    stamp('TRUTH 0 · PREDICTION ≈ 1', 1290, 715, pq, C.red, 22, -0.04);
  }
};

/* ---- 10 GOLDEN GAP (V40 §5) ---- */
SCENES.gap = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const px = 1060, py = 760, pw = 700, ph = 400;
  const f1 = 1 - Q(S, 1, 'Each native gate returns after ten steps', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The fixed golden menu has no such escape', 0.6) * f1;
    chipG100(550, 270, 840, 56, 'R_j(X) = K_j X K_j* on Herm₀ ,  d = D² − 1 , native menu dense in PU(D)', C.white, q, 18);
    const gq = Q(S, 0, 'its symmetric gap gamma is positive', 0.6) * f1;
    chipG100(550, 350, 840, 56, 'T(Z) = (1/2m) Σ_j (R_j Z R_j* + R_j* Z R_j)', C.cyan, gq, 22);
    chipG100(550, 430, 840, 60, 'γ = λ_min (I − T) on Sym₀ > 0', C.cyan, gq, 26);
    const lq = Q(S, 0, 'every proper visible subspace leaks under some native gate', 0.6) * f1;
    chipG100(550, 520, 840, 56, '(1/m) Σ_j ‖Q R_j P‖²_F ≥ γ r(d − r)/d', C.gold, lq, 23);
    const mq = Q(S, 0, 'by at least gamma over two in squared norm', 0.6) * f1;
    chipG100(550, 600, 840, 56, 'max_j ‖Q R_j P‖²_op ≥ c_r = γ max(r, d − r)/d ≥ γ/2', C.gold, mq, 21);
    stamp('NO PROPER SUMMARY CLOSES', 550, 710, Q(S, 0, 'no nontrivial linear summary closes', 0.6) * f1, C.red, 30, -0.04);
    const yS = v => py - v / 2.0 * ph, bw = 36;
    plotAxes(px, py, pw, ph, lq, 'rank r of V  (D = 3 , d = 8)', 'mean squared leak');
    GAP100.forEach((r, i) => { const x = px + 40 + i * 92; bar100(x, py, bw, r[1] / 2.0 * ph, C.cyan, lq); line(x - 8, yS(r[2]), x + bw + 8, yS(r[2]), C.gold, lq, 3); lbl(String(r[0]), x + bw / 2, py + 24, C.dim, lq, 14); });
    lbl('cyan : sampled subspace ; gold : γ r(d − r)/d', px + pw, py - ph - 14, C.dim, lq, 14, 'right');
    lbl('random three-gate golden menu in D = 3 : γ = ' + GAMMA100.toFixed(3), px + pw / 2, py + 56, C.cyan, gq, 15);
  }
  const q1 = Q(S, 1, 'Each native gate returns after ten steps', 0.6, 0.3);
  if (q1 > 0) {
    const cx = 330, cy = 470, R = 150;
    ring(cx, cy, R, C.gold, q1, 2.5);
    for (let k = 0; k < 10; k++) { const an = -Math.PI / 2 + k * TAU / 10; dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 8, k ? 'g' : 'm', q1); lbl(String(k), cx + (R + 28) * Math.cos(an), cy + (R + 28) * Math.sin(an) + 6, C.dim, q1, 14); }
    const st = Math.floor((t * 2.2) % 10), an = -Math.PI / 2 + st * TAU / 10;
    arrow(cx, cy, cx + (R - 18) * Math.cos(an), cy + (R - 18) * Math.sin(an), C.mag, q1, 3);
    lblG('K¹⁰ = I', cx, cy + 10, C.white, q1, 30);
    chipG100(780, 300, 500, 56, 'K = ζ(I − Π) + ζ²Π', C.gold, q1, 23);
    lbl('ζ = e^(3πi/5) , Π a projection', 780, 352, C.dim, q1, 15);
    const wq = Q(S, 1, 'separates truth from the memoryless prediction by at least gamma over four', 0.6);
    chipG100(550, 690, 840, 60, '‖P R_j¹⁰ P − (P R_j P)¹⁰‖ ≥ b_r = 1 − √(1 − c_r) ≥ γ/4', C.green, wq, 21);
    const sq = Q(S, 1, 'some finite preparation word shows it in a current readout', 0.6);
    lbl('D = 13 , r = 3 : d = 168 , c_r = 55γ/56 , max_ℓ |Δf_ℓ(p)| ≥ b_r √(α/39) for some word p', 550, 755, C.dim, sq, 13);
    const yS = v => py - v / 1.15 * ph, bw = 36;
    plotAxes(px, py, pw, ph, wq, 'rank r of V  (D = 3)', '‖I − A_j¹⁰‖');
    GAP100.forEach((r, i) => { const x = px + 40 + i * 92; bar100(x, py, bw, r[3] / 1.15 * ph, C.green, wq); line(x - 8, yS(r[4]), x + bw + 8, yS(r[4]), C.gold, wq, 3); lbl(String(r[0]), x + bw / 2, py + 24, C.dim, wq, 14); });
    lbl('green : leakiest gate ; gold : bound b_r ≈ 0.03–0.05', px + pw, py - ph - 14, C.dim, wq, 14, 'right');
    lbl('truth R_j¹⁰ = I exactly', px + pw / 2, py + 56, C.green, wq, 15);
  }
};

/* ---- 11 PERIODS AND EVIDENCE (V40 §6–§7) ---- */
SCENES.cycle = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Nor can finite noisy evidence certify exact closure', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Channels share the rigidity', 0.6) * f1;
    lbl('example : U = SWAP of system and record , q = 2 , τ_M = |0⟩⟨0|', 550, 260, C.dim, q, 15);
    const rows = [['step 0', 'ρ', '|0⟩'], ['step 1', '|0⟩', 'ρ'], ['step 2', 'ρ', '|0⟩']];
    rows.forEach(([s, a1, a2], i) => { const x = 210 + i * 260, qq = clamp(q * 1.6 - i * 0.3); lbl(s, x + 90, 305, C.white, qq, 17); cell100(x, 325, 180, 64, 'S : ' + a1, i === 1 ? C.red : C.cyan, qq, 20); cell100(x, 405, 180, 64, 'M : ' + a2, C.mag, qq, 20); if (i < 2) arrow(x + 186, 397, x + 254, 397, C.dim, qq, 2.5); });
    lbl('Λ₁ erases the system ; Λ₂ = id ; but Λ₁² = Λ₁ ≠ id', 550, 510, C.gold, q, 17);
    const uq = Q(S, 0, 'the channel is unitary', 0.6) * f1;
    chipG100(550, 580, 840, 56, 'U^q = I , Λₙ(ρ) = Tr_M[Uⁿ(ρ ⊗ τ_M)U*ⁿ] :  Φ^q = Λ_q  ⇒  Φ unitary', C.cyan, uq, 19);
    lbl('Λ_q = id gives Φ a CPTP left inverse ; its Kraus products are scalars', 550, 635, C.dim, uq, 14);
    const dq = Q(S, 0, 'with diamond error epsilon', 0.6) * f1;
    chipG100(550, 710, 840, 60, '‖Φ^q − id‖_◇ ≤ ε < 1  ⇒  q₀ ≥ (1 − ε)^(1/q)', C.gold, dq, 24);
    const ex = Q(S, 0, 'its contraction factor is at least one minus epsilon', 0.6) * f1;
    box(1050, 280, 720, 330, C.gold, ex, 2, 'rgba(40,30,0,0.35)');
    lbl('RECOMPUTED EXAMPLE', 1410, 320, C.gold, ex, 19);
    lblG('Φ = (1 − p) U·U* + p I/2 ,  U⁵ = I ,  p = ' + CYC100[0], 1410, 375, C.white, ex, 21);
    lblG('‖Φ⁵ − id‖_◇ = 1.5(1 − 0.96⁵) = ' + CYC100[2].toFixed(4), 1410, 430, C.white, ex, 21);
    lblG('(1 − ε)^(1/5) = ' + CYC100[3].toFixed(4) + '  ≤  q₀ = ' + CYC100[4].toFixed(3), 1410, 485, C.green, ex, 22);
    lbl('diamond norm by SDP (cvxpy , Clarabel) ; reference test min ratio 0.959 ≥ 1 − ε', 1410, 540, C.dim, ex, 13);
    lbl('every state pair , with any internal reference , keeps (1 − ε) of its distance', 1410, 575, C.dim, ex, 13);
  }
  const q1 = Q(S, 1, 'Nor can finite noisy evidence certify exact closure', 0.6, 0.3);
  if (q1 > 0) {
    chipG100(550, 270, 840, 56, 'y(n) = p_θ(n) + η ,  |η| ≤ ε ,  p_θ(n) = (1 + cos nθ)/2', C.white, q1, 20);
    const sq = Q(S, 1, 'a protocol stopping after lengths up to H', 0.6);
    chipG100(550, 355, 840, 56, 'stops after lengths n ≤ H on the all-ones record', C.cyan, sq, 22);
    const fq = Q(S, 1, 'is fooled by any small angle', 0.6);
    chipG100(550, 440, 840, 60, 'H² θ² / 4 ≤ ε  ⇒  1 − p_θ(n) ≤ ε for all n ≤ H', C.gold, fq, 23);
    lbl('yet K*ZK = cos θ Z + sin θ X : span{I, Z} is not closed', 550, 500, C.dim, fq, 15);
    lbl('an honest estimate ℓ̂ = 0 only gives ℓ ≤ η , with a finite-horizon budget', 550, 535, C.dim, fq, 14);
    stamp('FINITE REPORTS CANNOT CERTIFY', 550, 640, Q(S, 1, 'at most epsilon', 0.6), C.red, 28, -0.04);
    const [H, ee, th] = NOISYP100;
    const px = 1060, py = 770, pw = 700, ph = 440, xS = n => px + n / 60 * pw, yS = v => py - (v - 0.96) / 0.042 * ph;
    plotAxes(px, py, pw, ph, sq, 'length n', 'mean p_θ(n)');
    fillBox(px, yS(1), xS(H) - px, yS(1 - ee) - yS(1), C.gold, fq * 0.3);
    lbl('gold band : reports within ε of 1 up to H = 10', xS(14), yS(1) - 16, C.gold, fq, 15, 'left');
    polyl100(NOISY100.map(r => [xS(r[0]), yS(r[1])]), C.cyan, fq, 3.5);
    for (let n = 1; n <= H; n++) dot(xS(n), yS(1), 5, 'w', sq);
    lbl('θ = 2√ε / H = ' + th.toFixed(5) + ' , ε = 10⁻³', px + 30, py - 50, C.cyan, fq, 15, 'left');
    [[0.96, '0.96'], [0.98, '0.98'], [1, '1']].forEach(([v, s]) => lbl(s, px - 10, yS(v) + 5, C.dim, sq, 14, 'right'));
    [0, 10, 30, 60].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, sq, 14));
  }
};

/* ---- 12 TEN SETTINGS (V40 §8) ---- */
SCENES.ten = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'the full golden cycle of ten record settings', 0.6);
  const v = v3(470, 520, 230, 0.6 + t * 0.15, 0.3);
  const o = v(0, 0, 0), qa = v(TENQ100[0] * 1.15, TENQ100[1] * 1.15, TENQ100[2] * 1.15), qb = v(-TENQ100[0] * 0.5, -TENQ100[1] * 0.5, -TENQ100[2] * 0.5);
  dashed(qb[0], qb[1], qa[0], qa[1], C.gold, q0, 2); lbl('q_R', qa[0] + 12, qa[1] - 8, C.gold, q0, 18, 'left');
  const tips = TENAX100.map(n => v(n[0], n[1], n[2]));
  strokePoly(tips, C.cyan, q0 * 0.5, 1.5);
  TENAX100.forEach((n, k) => { const qq = clamp(q0 * 1.8 - k * 0.08), e = tips[k]; line(o[0], o[1], e[0], e[1], k ? C.cyan : C.mag, qq, k ? 2.2 : 3.5); dot(e[0], e[1], 6, k ? 'c' : 'm', qq); });
  lbl('n₀', tips[0][0] + 12, tips[0][1] + 6, C.mag, q0, 18, 'left');
  lbl('ten axes n_k of S_k = B^k on the cone n·q_R = x³', 470, 800, C.dim, q0, 15);
  const f1 = 1 - Q(S, 1, 'A weighted energy gives the best constant', 0.6);
  if (f1 > 0) {
    chipG100(1410, 280, 760, 56, 'Σ_k n_k n_kᵀ = 5s² P_⊥ + 10c² P_∥ ,  c = x³ ,  s² = 4x³', C.white, q0 * f1, 19);
    const mq = Q(S, 0, 'the cross products of the ten axes have exact second moments', 0.6) * f1;
    chipG100(1410, 380, 760, 56, 'M₁₀ = Σ_(k=1..9) (n₀ × n_k)(n₀ × n_k)ᵀ', C.cyan, mq, 22);
    const eq = Q(S, 0, 'eigenvalues sixty x to the ninth and twenty x cubed', 0.6) * f1;
    chipG100(1410, 480, 760, 62, 'μ = 60x⁹ = ' + TENMN100[0].toFixed(4) + ' ,  ν = 20x³ = ' + TENMN100[1].toFixed(4), C.gold, eq, 23);
    lbl('eigenvalues on n₀⊥ : slow direction n₀ × q_R , fast direction q_R − c n₀', 1410, 540, C.dim, eq, 14);
    lbl('ten-th roots of unity cancel the cross terms', 1410, 570, C.dim, eq, 14);
  }
  const q1 = Q(S, 1, 'A weighted energy gives the best constant', 0.6, 0.3);
  if (q1 > 0) {
    chipG100(1410, 270, 760, 56, 'E_q² = Σ_(k=1..9) q_k ‖A_k − A₀‖²', C.white, q1, 22);
    const bq = Q(S, 1, 'the base mass error is at most', 0.6);
    chipG100(1410, 350, 760, 64, '|δ₀| ≤ E_q / (2√(d_G(60x⁹ + 80 d_G x³)))', C.gold, bq, 24);
    const aq = Q(S, 1, 'An explicit input attains it', 0.6);
    lbl('attained : g = √(1 − 4d_G) e_slow ,  δ_k = (n₀·n_k) δ₀', 1410, 410, C.dim, aq, 15);
    const px = 1060, py = 790, pw = 700, ph = 320;
    const [fx, fy] = lmap100(px, py, pw, ph, -4, -0.3, -0.5, 2.0);
    plotAxes(px, py, pw, ph, aq, 'κ (log)', '|δ₀| / E_q (log)');
    polyl100(TEN100.map(r => [fx(r[0]), fy(r[1])]), C.gold, aq, 3.5); TEN100.forEach((r, i) => { if (i % 3 === 0) dot(fx(r[0]), fy(r[1]), 5, 'g', aq); });
    logTicks100(px, py, fx, fy, [[1e-4, '10⁻⁴'], [1e-2, '10⁻²']], [[1, '1'], [10, '10'], [100, '10²']], aq);
    const sq = Q(S, 1, 'the order stays one over root kappa', 0.6);
    lbl('slope −1/2', fx(1e-3), fy(TEN100[8][1]) - 22, C.gold, sq, 17, 'left');
    stamp('STILL 1/√κ', 1260, 720, sq, C.mag, 30, -0.05);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, null, 'lean'], [1, 'the Lyapunov criterion is classical', 'classical'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['PLANE', 'δᵀΓδ', C.cyan, 'Errors live in a plane'], ['THIRD SETTING', '1/√κ · √ε', C.gold, 'a third setting buys a square root'], ['CLOSURE', 'D² − dim V₀', C.green, 'the future closes in finite depth'], ['ENERGY', 'TᵀPT = P − I', '#8fbcff', 'energy decides decay'], ['KERNEL', 'B D₀ᵏ C', C.mag, 'dropped relations return through an exact kernel'], ['GOLDEN GAP', 'γ/4 · K¹⁰ = I', C.red, 'the golden menu leaks'], ['TEN', '60x⁹ · 20x³', C.vio, 'ten settings keep the root kappa order']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 195 + i * 255, q = Q(S, 0, ph) * fade; box(x - 115, 240, 230, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 17); lblG(a2, x, 340, C.white, q, 19); });
    lbl("LEAN · Datko stability : D5/S3/Quantum/Analysis/DatkoStability (frozen , cited in V39 , not linked in the digestion ledger)", W / 2, 470, C.green, Q(S, 1, "Datko's theorem is frozen in Lean") * fade, 15);
    lbl('CLASSICAL · discrete Lyapunov criterion (Boyd , EE363) · Kraus and internal isometries , diamond norm (Watrous)', W / 2, 515, '#8fbcff', Q(S, 1, 'the Lyapunov criterion is classical') * fade, 15);
    lbl('VOLUMES · plane and ellipse · 1/κ and 1/√κ sharp · √ε bridge · depth bound · Gram metric · counterexamples · kernel · gap · periods · ten settings', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · 86 checks : geometry , amplification curves , c₀ = 0.2606 , 55 = 34 + 21 , x⁴ vs 1 , P = diag(1,1,2) , √2 gap , kernel , γ , SDP ε , 60x⁹ , 20x³', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('ONE LEAN-FROZEN GENERAL THEOREM IS USED ; NEITHER VOLUME HAS DIGESTION RECORDS YET', W / 2, 690, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V39–V40 · CLOSURE', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V39–V40 · 锐利设置、未来闭合与隐藏记忆 · TRURETURING FILM 100', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two settings, then three; a closing future; and a memory that returns.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V39–V40', plane: 'ERROR PLANE', sharp: 'ONE OVER ROOT KAPPA', bridge: 'RANK-ONE BRIDGE', closure: 'FINITE FUTURE', gram: 'GRAM METRIC', energy: 'ERROR ENERGY', encode: 'COMMON CHANNEL', kernel: 'MEMORY KERNEL', gap: 'GOLDEN GAP', cycle: 'PERIODS AND EVIDENCE', ten: 'TEN SETTINGS', finale: 'LEDGER' });

function poster100() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('|δ₀| ≤ √(η₁² + η₂²) / 2√(d_G c₀)', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('L ≤ D² − dim V₀ · K¹⁰ = I', 1320, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('vₙ₊₁ = A vₙ + Σₖ B D₀ᵏ C vₙ₋₁₋ₖ', 1320, 590, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V39–V40', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V39–V40 · CLOSURE', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('锐 利 设 置 · 未 来 闭 合 · 隐 藏 记 忆', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 100', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster100;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
