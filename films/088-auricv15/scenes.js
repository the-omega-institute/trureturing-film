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

/* ---- film 088: AURIC V15–V16 · golden gate arithmetic and variational prediction ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME · NOT RECOMPUTED HERE', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · NOT SETTLED IN THE VOLUMES', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL RESULT · PROVED IN THE VOLUME · RECOMPUTED', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po088 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po088.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po088.set(key, off); }
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
/* ---- film 088 data (from verify088.py / vis088.json) ---- */
const CIRC_088 = [1.80911, 3.61823, 5.42734, 0.95327, 2.76238, 4.5715, 0.09743, 1.90654, 3.71565, 5.52477, 1.0507, 2.85981, 4.66892, 0.19485, 2.00397, 3.81308, 5.62219, 1.14812, 2.95724, 4.76635, 0.29228, 2.10139, 3.91051, 5.71962, 1.24555, 3.05466, 4.86378, 0.3897, 2.19882, 4.00793, 5.81704, 1.34297, 3.15209, 4.9612, 0.48713, 2.29624, 4.10536, 5.91447, 1.4404, 3.24951, 5.05863, 0.58456, 2.39367, 4.20278, 6.0119, 1.53783, 3.34694, 5.15605, 0.68198, 2.4911, 4.30021, 6.10932, 1.63525, 3.44436, 5.25348, 0.77941, 2.58852, 4.39763, 6.20675, 1.73268, 3.54179, 5.3509, 0.87683, 2.68595, 4.49506, 0.02099, 1.8301, 3.63922, 5.44833, 0.97426, 2.78337, 4.59249, 0.11842, 1.92753, 3.73664, 5.54576, 1.07168, 2.8808, 4.68991, 0.21584, 2.02495, 3.83407, 5.64318, 1.16911, 2.97822, 4.78734, 0.31327, 2.12238, 3.93149, 5.74061, 1.26654, 3.07565, 4.88476, 0.41069, 2.21981, 4.02892, 5.83803, 1.36396, 3.17308, 4.98219, 0.50812, 2.31723, 4.12635, 5.93546, 1.46139, 3.2705, 5.07962, 0.60554, 2.41466, 4.22377, 6.03289, 1.55881, 3.36793, 5.17704, 0.70297, 2.51208, 4.3212, 6.13031, 1.65624, 3.46535];
const THETA_088 = 1.809114;
const POW_088 = {"1": [0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.14025, 0.14025, 0.14025, 0.04727], "2": [1.045, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.15692, 0.14025, 0.14025, 0.14025, 0.07054, 0.07054, 0.07054, 0.05136, 0.05136, 0.05136], "5": [0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537, 0.76537]};
const R5_088 = 0.76537;
const GEOM_088 = [0.47214, 0.24922, 0.13156, 0.06944, 0.03666, 0.01935, 0.01021, 0.00539];
const ABORT_088 = [1.0, 0.52786, 0.27864, 0.14708, 0.07764, 0.04098, 0.02163, 0.01142, 0.00603, 0.00318, 0.00168];
const PAR_088 = [[2, 0.38197, -1.618, 1], [10, 0.0507, -215.9493, 11], [6, 0.67376, -15.3262, 11], [5, 1.0, 0.0, 1], [8, 0.38197, -1.618, 1], [1, 1.0, 0.0, 1], [8, 0.38197, -1.618, 1], [11, 0.88352, -163.1165, 145], [1, 1.0, 0.0, 1], [3, 0.38197, -1.618, 1], [14, 1.0, 0.0, 1], [13, 0.9524, -105.0476, 101], [4, 0.1459, -5.8541, 1], [2, 0.38197, -1.618, 1]];
const FIBH_088 = [[0.0, 0.95027], [0.0025, 0.96094], [0.005, 0.96808], [0.0075, 0.97383], [0.01, 0.97865], [0.0125, 0.98277], [0.015, 0.98631], [0.0175, 0.98935], [0.02, 0.99195], [0.0225, 0.99416], [0.025, 0.99601], [0.0275, 0.99753], [0.03, 0.99874], [0.0325, 0.99966], [0.035, 1.0003], [0.0375, 1.00068], [0.04, 1.0008], [0.0425, 1.00068], [0.045, 1.00033], [0.0475, 0.99974], [0.05, 0.99893], [0.0525, 0.9979], [0.055, 0.99666], [0.0575, 0.99521], [0.06, 0.99356], [0.0625, 0.9917], [0.065, 0.98964], [0.0675, 0.98738], [0.07, 0.98493], [0.0725, 0.98228], [0.075, 0.97943], [0.0775, 0.9764], [0.08, 0.97317], [0.0825, 0.96975], [0.085, 0.96614], [0.0875, 0.96234], [0.09, 0.95835], [0.0925, 0.95416], [0.095, 0.94979], [0.0975, 0.94521], [0.1, 0.94045], [0.1025, 0.93548], [0.105, 0.93032], [0.1075, 0.92496], [0.11, 0.9194], [0.1125, 0.91363], [0.115, 0.90766], [0.1175, 0.90147], [0.12, 0.89507], [0.1225, 0.88846], [0.125, 0.88162], [0.1275, 0.87456], [0.13, 0.86726], [0.1325, 0.85974], [0.135, 0.85197], [0.1375, 0.84395], [0.14, 0.83568], [0.1425, 0.82715], [0.145, 0.81835], [0.1475, 0.80927], [0.15, 0.7999], [0.1525, 0.79023], [0.155, 0.78025], [0.1575, 0.76995], [0.16, 0.7593], [0.1625, 0.74829], [0.165, 0.73689], [0.1675, 0.7251], [0.17, 0.71288], [0.1725, 0.70019], [0.175, 0.68701], [0.1775, 0.67327], [0.18, 0.65894], [0.1825, 0.64394], [0.185, 0.62819], [0.1875, 0.61155], [0.19, 0.59386], [0.1925, 0.57487], [0.195, 0.55414], [0.1975, 0.53076], [0.2, 0.5004]];
const FLOW_088 = [[0.0, 0.15, 0.15], [0.05, 0.14464, 0.14826], [0.1, 0.13953, 0.14652], [0.15, 0.13468, 0.14477], [0.2, 0.13006, 0.14303], [0.25, 0.12567, 0.14129], [0.3, 0.12149, 0.13955], [0.35, 0.11752, 0.13781], [0.4, 0.11374, 0.13606], [0.45, 0.11014, 0.13432], [0.5, 0.10672, 0.13258], [0.55, 0.10346, 0.13084], [0.6, 0.10037, 0.1291], [0.65, 0.09743, 0.12735], [0.7, 0.09462, 0.12561], [0.75, 0.09196, 0.12387], [0.8, 0.08943, 0.12213], [0.85, 0.08702, 0.12039], [0.9, 0.08472, 0.11864], [0.95, 0.08254, 0.1169], [1.0, 0.08047, 0.11516], [1.05, 0.07849, 0.11342], [1.1, 0.07662, 0.11167], [1.15, 0.07483, 0.10993], [1.2, 0.07313, 0.10819], [1.25, 0.07152, 0.10645], [1.3, 0.06998, 0.10471], [1.35, 0.06852, 0.10296], [1.4, 0.06713, 0.10122], [1.45, 0.0658, 0.09948], [1.5, 0.06454, 0.09774], [1.55, 0.06335, 0.096], [1.6, 0.06221, 0.09425], [1.65, 0.06113, 0.09251], [1.7, 0.0601, 0.09077], [1.75, 0.05912, 0.08903], [1.8, 0.05818, 0.08729], [1.85, 0.0573, 0.08554], [1.9, 0.05645, 0.0838], [1.95, 0.05565, 0.08206], [2.0, 0.05489, 0.08032], [2.05, 0.05416, 0.07858], [2.1, 0.05347, 0.07683], [2.15, 0.05281, 0.07509], [2.2, 0.05219, 0.07335], [2.25, 0.05159, 0.07161], [2.3, 0.05103, 0.06987], [2.35, 0.05049, 0.06812], [2.4, 0.04998, 0.06638], [2.45, 0.04949, 0.06464], [2.5, 0.04903, 0.0629], [2.55, 0.04859, 0.06116], [2.6, 0.04817, 0.05941], [2.65, 0.04777, 0.05767], [2.7, 0.04739, 0.05593], [2.75, 0.04703, 0.05419], [2.8, 0.04669, 0.05244], [2.85, 0.04636, 0.0507], [2.9, 0.04605, 0.04896], [2.95, 0.04576, 0.04722], [3.0, 0.04548, 0.04548]];
const RATIO_088 = [[0.05, 1.00021], [0.15063, 1.00189], [0.25127, 1.00526], [0.3519, 1.0103], [0.45253, 1.01701], [0.55316, 1.02537], [0.6538, 1.03537], [0.75443, 1.04699], [0.85506, 1.0602], [0.9557, 1.07498], [1.05633, 1.0913], [1.15696, 1.10913], [1.25759, 1.12845], [1.35823, 1.1492], [1.45886, 1.17137], [1.55949, 1.1949], [1.66013, 1.21977], [1.76076, 1.24592], [1.86139, 1.27332], [1.96203, 1.30193], [2.06266, 1.33171], [2.16329, 1.3626], [2.26392, 1.39457], [2.36456, 1.42758], [2.46519, 1.46158], [2.56582, 1.49653], [2.66646, 1.53238], [2.76709, 1.5691], [2.86772, 1.60665], [2.96835, 1.64498], [3.06899, 1.68405], [3.16962, 1.72384], [3.27025, 1.76429], [3.37089, 1.80539], [3.47152, 1.84708], [3.57215, 1.88934], [3.67278, 1.93213], [3.77342, 1.97544], [3.87405, 2.01921], [3.97468, 2.06344], [4.07532, 2.10808], [4.17595, 2.15312], [4.27658, 2.19853], [4.37722, 2.24429], [4.47785, 2.29037], [4.57848, 2.33675], [4.67911, 2.38342], [4.77975, 2.43035], [4.88038, 2.47754], [4.98101, 2.52495], [5.08165, 2.57258], [5.18228, 2.6204], [5.28291, 2.66842], [5.38354, 2.7166], [5.48418, 2.76495], [5.58481, 2.81345], [5.68544, 2.86209], [5.78608, 2.91086], [5.88671, 2.95974], [5.98734, 3.00874], [6.08797, 3.05784], [6.18861, 3.10703], [6.28924, 3.15632], [6.38987, 3.20568], [6.49051, 3.25512], [6.59114, 3.30463], [6.69177, 3.3542], [6.79241, 3.40383], [6.89304, 3.45352], [6.99367, 3.50326], [7.0943, 3.55304], [7.19494, 3.60287], [7.29557, 3.65274], [7.3962, 3.70264], [7.49684, 3.75258], [7.59747, 3.80255], [7.6981, 3.85254], [7.79873, 3.90257], [7.89937, 3.95262], [8.0, 4.00268]];
const FLOWP_088 = {"k0": 0.15, "ks": 0.04, "T": 3.0, "ratio3": 1.65719};
const FMIN_088 = [[-2.6, 22.95709], [-2.55, 17.5906], [-2.5, 13.13281], [-2.45, 9.48791], [-2.4, 6.56669], [-2.35, 4.28623], [-2.3, 2.56964], [-2.25, 1.34583], [-2.2, 0.54915], [-2.15, 0.11926], [-2.1, 0.00076], [-2.05, 0.14305], [-2.0, 0.5], [-1.95, 1.02979], [-1.9, 1.69464], [-1.85, 2.46059], [-1.8, 3.29731], [-1.75, 4.17786], [-1.7, 5.07848], [-1.65, 5.97845], [-1.6, 6.85981], [-1.55, 7.70723], [-1.5, 8.50781], [-1.45, 9.25091], [-1.4, 9.92797], [-1.35, 10.53233], [-1.3, 11.0591], [-1.25, 11.505], [-1.2, 11.86819], [-1.15, 12.14814], [-1.1, 12.34548], [-1.05, 12.4619], [-1.0, 12.5], [-0.95, 12.46315], [-0.9, 12.35542], [-0.85, 12.18143], [-0.8, 11.94627], [-0.75, 11.6554], [-0.7, 11.31452], [-0.65, 10.92957], [-0.6, 10.50653], [-0.55, 10.05145], [-0.5, 9.57031], [-0.45, 9.06901], [-0.4, 8.55325], [-0.35, 8.02853], [-0.3, 7.50006], [-0.25, 6.97278], [-0.2, 6.45123], [-0.15, 5.93961], [-0.1, 5.4417], [-0.05, 4.96086], [-0.0, 4.5], [0.05, 4.06161], [0.1, 3.6477], [0.15, 3.25986], [0.2, 2.89923], [0.25, 2.56653], [0.3, 2.26206], [0.35, 1.98578], [0.4, 1.73725], [0.45, 1.51576], [0.5, 1.32031], [0.55, 1.1497], [0.6, 1.00253], [0.65, 0.87732], [0.7, 0.77252], [0.75, 0.68665], [0.8, 0.61827], [0.85, 0.56618], [0.9, 0.52942], [0.95, 0.5074], [1.0, 0.5], [1.05, 0.50765], [1.1, 0.53148], [1.15, 0.57339], [1.2, 0.63619], [1.25, 0.72375], [1.3, 0.8411], [1.35, 0.99458], [1.4, 1.19197], [1.45, 1.44266], [1.5, 1.75781], [1.55, 2.15048], [1.6, 2.63581], [1.65, 3.2312], [1.7, 3.95648], [1.75, 4.83411], [1.8, 5.88931], [1.85, 7.15034], [1.9, 8.64864], [1.95, 10.41904], [2.0, 12.5]];
const ROOT_088 = -2.1038;
const DAG_088 = {"edges": [["s", "a", 2], ["s", "b", 4], ["a", "b", 1], ["a", "c", 5], ["b", "c", 1], ["b", "d", 6], ["c", "d", 2], ["c", "t", 7], ["d", "t", 1]], "V": {"t": 0, "d": 1, "c": 3, "b": 4, "a": 5, "s": 7}, "best": ["s", "a", "b", "c", "d", "t"], "npaths": 8};
const GIBBS_088 = [[0.05, 7.13863], [0.1, 7.27725], [0.15, 7.41551], [0.2, 7.55184], [0.25, 7.68415], [0.3, 7.81105], [0.35, 7.93209], [0.4, 8.04739], [0.45, 8.15724], [0.5, 8.26195], [0.55, 8.36172], [0.6, 8.45673], [0.65, 8.54709], [0.7, 8.6329], [0.75, 8.71424], [0.8, 8.79124], [0.85, 8.86404], [0.9, 8.93277], [0.95, 8.99762], [1.0, 9.05876], [1.05, 9.1164], [1.1, 9.17071], [1.15, 9.22191], [1.2, 9.27018], [1.25, 9.3157], [1.3, 9.35865], [1.35, 9.39922], [1.4, 9.43754], [1.45, 9.47379], [1.5, 9.50809], [1.55, 9.54059], [1.6, 9.5714], [1.65, 9.60063], [1.7, 9.6284], [1.75, 9.6548], [1.8, 9.67992], [1.85, 9.70384], [1.9, 9.72665], [1.95, 9.7484], [2.0, 9.76918], [2.05, 9.78904], [2.1, 9.80803], [2.15, 9.82621], [2.2, 9.84363], [2.25, 9.86033], [2.3, 9.87636], [2.35, 9.89174], [2.4, 9.90653], [2.45, 9.92074], [2.5, 9.93442], [2.55, 9.94759], [2.6, 9.96028], [2.65, 9.97251], [2.7, 9.98431], [2.75, 9.9957], [2.8, 10.0067], [2.85, 10.01733], [2.9, 10.0276], [2.95, 10.03754], [3.0, 10.04716]];
const LOGQ_088 = 2.77259;
const ZN_088 = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];
const ZR_088 = [2.0, 1.5, 1.66667, 1.6, 1.625, 1.61538, 1.61905, 1.61765, 1.61818, 1.61798, 1.61806, 1.61803, 1.61804, 1.61803];
const HCUR_088 = [[0.005, 0.03132], [0.015, 0.07673], [0.025, 0.11406], [0.035, 0.14658], [0.045, 0.17562], [0.055, 0.20188], [0.065, 0.22583], [0.075, 0.2478], [0.085, 0.26803], [0.095, 0.28672], [0.105, 0.30401], [0.115, 0.32004], [0.125, 0.33491], [0.135, 0.34871], [0.145, 0.36152], [0.155, 0.37341], [0.165, 0.38444], [0.175, 0.39466], [0.185, 0.40413], [0.195, 0.41288], [0.205, 0.42096], [0.215, 0.4284], [0.225, 0.43524], [0.235, 0.4415], [0.245, 0.44721], [0.255, 0.4524], [0.265, 0.45709], [0.275, 0.46131], [0.285, 0.46507], [0.295, 0.46839], [0.305, 0.4713], [0.315, 0.4738], [0.325, 0.47591], [0.335, 0.47765], [0.345, 0.47903], [0.355, 0.48006], [0.365, 0.48076], [0.375, 0.48114], [0.385, 0.4812], [0.395, 0.48095], [0.405, 0.48042], [0.415, 0.47959], [0.425, 0.47849], [0.435, 0.47712], [0.445, 0.47549], [0.455, 0.4736], [0.465, 0.47146], [0.475, 0.46908], [0.485, 0.46646], [0.495, 0.46361], [0.505, 0.46053], [0.515, 0.45723], [0.525, 0.4537], [0.535, 0.44996], [0.545, 0.44601], [0.555, 0.44186], [0.565, 0.43749], [0.575, 0.43292], [0.585, 0.42816], [0.595, 0.42319], [0.605, 0.41803], [0.615, 0.41267], [0.625, 0.40712], [0.635, 0.40137], [0.645, 0.39543], [0.655, 0.3893], [0.665, 0.38298], [0.675, 0.37647], [0.685, 0.36976], [0.695, 0.36286], [0.705, 0.35576], [0.715, 0.34846], [0.725, 0.34097], [0.735, 0.33327], [0.745, 0.32536], [0.755, 0.31725], [0.765, 0.30892], [0.775, 0.30037], [0.785, 0.2916], [0.795, 0.28259], [0.805, 0.27335], [0.815, 0.26385], [0.825, 0.2541], [0.835, 0.24407], [0.845, 0.23376], [0.855, 0.22315], [0.865, 0.21222], [0.875, 0.20094], [0.885, 0.18931], [0.895, 0.17727], [0.905, 0.16481], [0.915, 0.15186], [0.925, 0.13838], [0.935, 0.12429], [0.945, 0.1095], [0.955, 0.09387], [0.965, 0.07721], [0.975, 0.05919], [0.985, 0.03924], [0.995, 0.01578]];
const SLICE_088 = [0.27639, 0.17082, 0.27639, 0.17082, 0.10557];
const CEXP_088 = {"vals": [0.875, 0.75, 0.5, 0.0, 0.0], "leaf": [0, 0, 1, 0], "sib": [1.0, 1.0, 1.0, 0.0]};
const ECNT_088 = [0.5, 4.5, 0.0];
const IMAG_088 = [[0.0, -0.99135], [0.1, -1.99076], [0.2, -2.69261], [0.3, -3.09543], [0.4, -3.3069], [0.5, -3.41627], [0.6, -3.47396], [0.7, -3.50529], [0.8, -3.52278], [0.9, -3.53274], [1.0, -3.53851], [1.1, -3.54188], [1.2, -3.54387], [1.3, -3.54505], [1.4, -3.54575], [1.5, -3.54617], [1.6, -3.54642], [1.7, -3.54657], [1.8, -3.54665], [1.9, -3.54671], [2.0, -3.54674], [2.1, -3.54676], [2.2, -3.54677], [2.3, -3.54678], [2.4, -3.54678], [2.5, -3.54678], [2.6, -3.54678], [2.7, -3.54679], [2.8, -3.54679], [2.9, -3.54679], [3.0, -3.54679], [3.1, -3.54679], [3.2, -3.54679], [3.3, -3.54679], [3.4, -3.54679], [3.5, -3.54679], [3.6, -3.54679], [3.7, -3.54679], [3.8, -3.54679], [3.9, -3.54679], [4.0, -3.54679], [4.1, -3.54679], [4.2, -3.54679], [4.3, -3.54679], [4.4, -3.54679], [4.5, -3.54679], [4.6, -3.54679], [4.7, -3.54679], [4.8, -3.54679], [4.9, -3.54679], [5.0, -3.54679], [5.1, -3.54679], [5.2, -3.54679], [5.3, -3.54679], [5.4, -3.54679], [5.5, -3.54679], [5.6, -3.54679], [5.7, -3.54679], [5.8, -3.54679], [5.9, -3.54679], [6.0, -3.54679]];
const IMIN_088 = -3.54679;
const EL_088 = [0.653986, 0.389419, 0.389419, 0.389419, 0.237754, 0.237754, 0.237754, 0.237754, 0.237754, 0.237754, 0.112766, 0.112766, 0.112766, 0.112766, 0.112766, 0.112766, 0.112766, 0.112766, 0.112766, 0.068218];
const ELB_088 = [0.46244, 0.16812, 0.058536, 0.02027, 0.0070142, 0.0024271, 0.0008398, 0.00029058, 0.00010055, 3.479e-05, 1.2038e-05, 4.1653e-06, 1.4412e-06, 4.9869e-07, 1.7255e-07, 5.9706e-08, 2.0659e-08, 7.1484e-09, 2.4734e-09, 8.5585e-10];
const GAM_088 = 8.35241;
const QMIN_088 = [0.38197, 0.1459, 0.1459, 0.1459, 0.055728, 0.055728, 0.055728, 0.0081306, 0.0081306, 0.0081306, 0.0081306, 0.0081306];
/* ---- film 088 helpers ---- */
function cell088(x, y, w, h, s, col, a, size = 20, fillA = 0.3, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.36, tc, a, size); }
/* polyline of data pairs through a map */
function poly088(pts, mx, my, col, a, lw = 3, prog = 1) {
  if (a <= 0 || !pts.length) return;
  const n = Math.max(2, Math.floor(pts.length * clamp(prog)));
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i < n; i++) { const X = mx(pts[i][0]), Y = my(pts[i][1]); if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y); }
  ctx.stroke(); ctx.globalAlpha = 1;
}
function ticks088(vals, f, y, a, lab = v => String(v), size = 14) { vals.forEach(v => lbl(lab(v), f(v), y, C.dim, a, size)); }
/* three sites with the gate box */
function sites088(cx, cy, a, bits = ['L', 'C', 'R'], col = C.gold, gap = 110) {
  if (a <= 0) return;
  box(cx - 1.5 * gap + 10, cy - 60, 3 * gap - 20, 120, col, a, 2, 'rgba(40,30,0,0.25)');
  bits.forEach((b, i) => { const x = cx + (i - 1) * gap; ring(x, cy, 30, i === 1 ? C.gold : C.cyan, a, 2.5); lbl(b, x, cy + 8, C.white, a, 22); });
  lbl('K', cx, cy - 72, col, a, 24);
}
function unitc088(cx, cy, R, a, col = C.dim) { if (a <= 0) return; ring(cx, cy, R, col, a, 1.8); line(cx - R - 20, cy, cx + R + 20, cy, C.dim, a * 0.4, 1); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, a * 0.4, 1); }
/* a small DAG drawing used by the Bellman and Gibbs scenes */
const DPOS088 = { s: [0, 0.5], a: [0.22, 0.12], b: [0.36, 0.8], c: [0.56, 0.3], d: [0.76, 0.78], t: [1, 0.45] };
function dag088(x0, y0, w, h, a, o = {}) {
  if (a <= 0) return;
  const P = k => [x0 + DPOS088[k][0] * w, y0 + DPOS088[k][1] * h];
  const best = DAG_088.best, onBest = (u, v) => best.some((n, i) => i < best.length - 1 && n === u && best[i + 1] === v);
  DAG_088.edges.forEach(([u, v, c]) => {
    const A = P(u), B = P(v), bb = onBest(u, v) && o.best ? o.best : 0;
    const dx = B[0] - A[0], dy = B[1] - A[1], Lh = Math.hypot(dx, dy), ux = dx / Lh, uy = dy / Lh;
    arrow(A[0] + ux * 30, A[1] + uy * 30, B[0] - ux * 30, B[1] - uy * 30, bb > 0 ? C.gold : C.cyan, a * (bb > 0 ? 1 : 0.55), bb > 0 ? 4 : 2.2);
    const mxp = (A[0] + B[0]) / 2 - uy * 18, myp = (A[1] + B[1]) / 2 + ux * 18;
    lbl(String(c), mxp, myp + 6, bb > 0 ? C.gold : C.white, a, 18);
  });
  Object.keys(DPOS088).forEach(k => { const p = P(k); dot(p[0], p[1], 16, k === 's' || k === 't' ? 'g' : 'c', a); lbl(k, p[0], p[1] - 26, C.white, a, 20); if (o.V) lbl('V = ' + DAG_088.V[k], p[0], p[1] + 44, C.green, a * o.V, 16); });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['one fixed golden gate can act like NAND', 'V15 · ONE FIXED GOLDEN GATE', 'K = ζ [ I + (ζ − 1) P ] ,  K¹⁰ = I', C.gold], ['where exactness stops', 'V15 · ARITHMETIC LIMITS', 'probabilities are algebraic integers', C.red], ['when prediction, recursion', 'V16 · PREDICTION = RECURSION', 'Bellman , Gibbs , conditional expectation', C.cyan], ['optimization and variation coincide', 'V16 · OPTIMUM = VARIATION', 'same solution , stated conditions', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 340, 58, 'one fixed gate', C.gold, rp, 22); chip(330, 445, 340, 58, 'two addresses', C.cyan, rp, 22); chip(330, 530, 340, 58, 'integer probabilities', C.red, rp, 22);
  box(1420, 340, 380, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one answer , three forms', 1610, 410, C.green, rp, 21); lblG('recursion = optimum', 1610, 460, C.white, rp, 26); lblG('= variation', 1610, 500, C.white, rp, 26);
  txt(scramble('AURIC V15–V16 · GOLDEN', rp, 488), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V15–V16 · 黄 金 门 的 算 术 与 变 分 预 测', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 088 · AURIC_GOLDEN_GATE_NAND_UNIVERSALITY_AND_ARITHMETIC_LIMITS_V15 · AURIC_PREDICTION_RECURSION_OPTIMIZATION_AND_VARIATION_V16', W / 2, 115, { size: 14, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
};

/* ---- 02 NAND AND THE GATE (V15 §2–3) ---- */
SCENES.gate = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The gate is one fixed matrix', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The target is NAND', 0.6) * f1;
    lbl('NAND', 865, 268, C.gold, q, 22);
    [['a', 'b', 'NAND'], ['0', '0', '1'], ['0', '1', '1'], ['1', '0', '1'], ['1', '1', '0']].forEach((r, i) => r.forEach((s, j) => cell088(765 + j * 70, 290 + i * 52, 62, 44, s, i === 0 ? C.dim : j === 2 ? C.gold : C.cyan, q, 18, i === 0 ? 0.1 : 0.25)));
    const vq = Q(S, 0, 'Its reversible version', 0.6) * f1;
    const ys = [320, 400, 480], wl = ['a', 'b', 't'];
    ys.forEach((y, i) => { line(190, y, 560, y, C.white, vq * 0.7, 2); lbl(wl[i], 170, y + 7, C.white, vq, 22, 'right'); });
    line(330, ys[0], 330, ys[2] + 22, C.cyan, vq, 2.5); dot(330, ys[0], 10, 'c', vq); dot(330, ys[1], 10, 'c', vq); ring(330, ys[2], 22, C.cyan, vq, 2.5); line(308, ys[2], 352, ys[2], C.cyan, vq, 2.5);
    cell088(430, ys[2] - 26, 56, 52, 'X', C.gold, vq, 22);
    lbl('Toffoli', 330, 290, C.cyan, vq, 16);
    lbl('t ⊕ (1 ⊕ ab)', 575, ys[2] + 7, C.gold, vq, 18, 'left');
    const sq = Q(S, 0, 'squares to the identity', 0.6) * f1;
    chip(420, 580, 560, 56, 'V_f = X_t · Toffoli ,  V_f² = I', C.gold, sq, 23);
    lbl('on t = 0 the target bit reads NAND(a, b)', 420, 640, C.dim, sq, 16);
    const eq = Q(S, 0, 'compressing two input bits coherently', 0.6) * f1;
    chip(1400, 265, 760, 58, 'W |ab⟩ = |1 ⊕ ab⟩ |e_ab⟩   isometric', C.cyan, eq, 23);
    const v = v3(1400, 500, 150, 0.7 + 0.15 * Math.sin(t * 0.5), 0.35), O = v(0, 0, 0);
    const ax = [[1, 0, 0, 'e₀₀ ← 00', C.cyan], [0, 1, 0, 'e₀₁ ← 01', C.gold], [0, 0, 1, 'e₁₀ ← 10', C.mag]];
    ax.forEach(([x, y, z, s, col], i) => { const p = v(x, y, z), qq = clamp(eq * 1.6 - i * 0.25); arrow(O[0], O[1], p[0], p[1], col, qq, 3.5); lblG(s, p[0] + (i === 2 ? 0 : 18), p[1] + (i === 2 ? -16 : 8), col, qq, 20, i === 2 ? 'center' : 'left'); });
    lbl('three inputs with output 1 need orthogonal environments', 1400, 690, C.white, eq, 16);
    const dq = Q(S, 0, 'needs at least a three-dimensional environment', 0.6) * f1;
    stamp('dim E ≥ 3', 1400, 790, dq, C.green, 30, -0.04);
    lbl('11 ↦ |0⟩|e₀₀⟩ : three dimensions suffice', 1400, 718, C.dim, dq, 15);
  }
  const q = Q(S, 1, 'The gate is one fixed matrix', 0.6, 0.3);
  if (q > 0) {
    sites088(420, 330, q);
    chip(420, 460, 740, 58, 'K = ζ [ I + (ζ − 1) P ] ,  ζ = e^(3πi/5)', C.gold, q, 23);
    const pq = Q(S, 1, 'built from a golden projection', 0.6);
    lbl('P = n_L n_R + (1 − n_L)(1 − n_R) Q_C', 420, 525, C.white, pq, 18);
    lbl('Q_C = φ⁻¹ (1 − n) + φ⁻² n + φ^(−3/2) X', 420, 560, C.white, pq, 18);
    const md = [['000', 1], ['100', 1], ['010', 1], ['001', 1], ['101', 1], ['110', 0], ['011', 0], ['111', 0]];
    md.forEach(([s, lg], i) => cell088(110 + i * 80, 610, 70, 44, s, lg ? C.cyan : C.dim, pq, 17, lg ? 0.25 : 0.08, lg ? C.white : C.dim));
    curve(p => [145 + p * 160, 662 + Math.sin(p * Math.PI) * 34], 30, C.gold, pq, 2.5);
    lbl('only 000 ↔ 010 mixes ; five legal modes kept', 420, 730, C.gold, pq, 16);
    const rq = Q(S, 1, 'Its tenth power is the identity', 0.6);
    const cx = 1240, cy = 420, R = 140;
    unitc088(cx, cy, R, rq);
    for (let r = 0; r < 10; r++) { const an = 2 * Math.PI * r / 10; dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 7, 'c', rq * 0.8); }
    const rr = Math.floor(u * 1.5) % 10, a1 = 3 * Math.PI / 5 * rr, a2 = 6 * Math.PI / 5 * rr;
    dot(cx + R * Math.cos(a1), cy - R * Math.sin(a1), 14, 'c', rq); dot(cx + R * Math.cos(a2), cy - R * Math.sin(a2), 14, 'g', rq);
    lbl('ζ^r on 1 − P (cyan) ,  ζ^(2r) on P (gold) ,  r = ' + rr, cx, cy + R + 44, C.dim, rq, 15);
    chip(1600, 330, 330, 54, 'K¹⁰ = I', C.cyan, rq, 24);
    const fq = Q(S, 1, 'its fifth is a reflection', 0.6);
    chip(1600, 400, 330, 54, 'K⁵ = 2P − I', C.green, fq, 24);
    chip(1600, 470, 330, 54, 'K⁻¹ = K⁹', C.white, fq, 24);
    const bq = Q(S, 1, 'braiding forces the phase', 0.6);
    chip(1390, 640, 780, 56, 'B_P B_Q B_P − B_Q B_P B_Q = s³(z − 1)[z + φ⁻²(z − 1)²](P − Q)', C.mag, bq, 18);
    lbl('PQP = φ⁻² P ,  QPQ = φ⁻² Q :  zero  ⇔  z = e^(±3πi/5)', 1390, 700, C.white, bq, 17);
    lbl('valid on the legal path space , not on all of (ℂ²)^⊗N', 1390, 735, C.dim, bq, 15);
  }
};

/* ---- 03 TWO ADDRESSES (V15 §4–5) ---- */
SCENES.density = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Its conjugate exceeds two', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Encode a qubit as one, zero, q, zero, one, zero', 0.6) * f1;
    const bits = ['1', '0', 'q', '0', '1', '0'], nm = ['b₋₁', 'b₀', 'b₁', 'b₂', 'b₃', 'b₄'];
    bits.forEach((b, i) => { cell088(150 + i * 100, 300, 84, 70, b, b === 'q' ? C.gold : C.cyan, q, 28); lbl(nm[i], 192 + i * 100, 400, C.dim, q, 16); });
    const aq = Q(S, 0, 'call K at two neighbouring addresses', 0.6) * f1;
    rect63(140, 430, 300, 36, C.mag, aq, 2.5); lbl('K_P : centre b₀', 290, 455, C.mag, aq, 17);
    rect63(240, 480, 300, 36, C.green, aq, 2.5); lbl('K_Q : centre b₁', 390, 505, C.green, aq, 17);
    lbl('both keep the code exactly', 450, 560, C.dim, aq, 16);
    const pq = Q(S, 0, 'Their projections overlap by one over phi squared', 0.6) * f1;
    lbl('P = |1⟩⟨1|', 1080, 280, C.mag, pq, 22, 'left');
    lbl('Q =', 1080, 360, C.green, pq, 22, 'left');
    [['φ⁻¹', 'φ^(−3/2)'], ['φ^(−3/2)', 'φ⁻²']].forEach((r, i) => r.forEach((s, j) => cell088(1150 + j * 130, 320 + i * 60, 122, 52, s, C.green, pq, 19)));
    chip(1600, 350, 300, 56, 'Tr PQ = φ⁻²', C.gold, pq, 23);
    lbl('≈ 0.382', 1600, 410, C.dim, pq, 16);
    const tq = Q(S, 0, 'the product of their fifth powers has trace', 0.6) * f1;
    chip(1400, 500, 780, 58, 'R_P = K_P⁵ = 2P − I ,  R_Q = K_Q⁵ = 2Q − I', C.white, tq, 22);
    chip(1400, 580, 780, 62, 'Tr(R_P R_Q) = 4 − 2√5 ≈ −0.472', C.gold, tq, 26);
    const cx = 450, cy = 690, th = Math.acos(1 / PHI_);
    line(cx - 170, cy, cx + 170, cy, C.mag, pq * 0.85, 2.5); lbl('P', cx + 185, cy + 7, C.mag, pq, 18, 'left');
    line(cx - 110 * Math.cos(th), cy + 110 * Math.sin(th), cx + 110 * Math.cos(th), cy - 110 * Math.sin(th), C.green, pq * 0.85, 2.5); lbl('Q', cx + 120 * Math.cos(th) + 8, cy - 120 * Math.sin(th), C.green, pq, 18, 'left');
    ctx.save(); ctx.globalAlpha = pq; ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, 46, -th, 0); ctx.stroke(); ctx.restore(); lbl('θ', cx + 60, cy - 18, C.gold, pq, 18, 'left');
    lbl('two mirror lines ,  cos²θ = Tr PQ = φ⁻²', cx, cy + 118, C.dim, pq, 15);
  }
  const q = Q(S, 1, 'Its conjugate exceeds two', 0.6, 0.3);
  if (q > 0) {
    chip(530, 262, 860, 56, '4 + 2√5 ≈ 8.47 > 2  ⇒  R_P R_Q has infinite order', C.gold, q, 22);
    const cx = 330, cy = 520, R = 170, cq = Q(S, 1, 'so the rotation has infinite order', 0.6);
    unitc088(cx, cy, R, cq);
    const nshow = Math.floor(clamp((u - lineAt(S, 1).s - 1.0) / 6) * 120);
    for (let n = 0; n < nshow; n++) { const an = CIRC_088[n]; dot(cx + R * Math.cos(an), cy - R * Math.sin(an), n === nshow - 1 ? 11 : 6, n === nshow - 1 ? 'g' : 'c', cq * (n === nshow - 1 ? 1 : 0.8)); }
    lbl('n θ ,  cos θ = 2 − √5 ,  n = 1 … ' + Math.max(1, nshow), cx, cy + R + 44, C.dim, cq, 15);
    const zq = Q(S, 1, 'the closure is every unitary', 0.6);
    box(560, 380, 400, 240, C.cyan, zq, 2, 'rgba(0,30,40,0.35)');
    lbl('closure of ⟨K_P , K_Q⟩', 760, 425, C.cyan, zq, 18);
    lblG('{ U ∈ U(2) : det U ∈ μ₁₀ }', 760, 490, C.white, zq, 25);
    lbl('det K_P = det K_Q = ζ³', 760, 545, C.dim, zq, 16);
    lbl('two circles , two axes ⇒ SU(2)', 760, 585, C.dim, zq, 16);
    const sq = Q(S, 1, 'Squares suffice too', 0.6);
    const px = 1080, py = 700, pw = 680, ph = 360, xS = L => px + (L - 1) / 15 * pw, yS = v => py - (Math.log10(v) + 1.6) / 1.7 * ph;
    plotAxes(px, py, pw, ph, sq, 'letters in the word', 'best error to S = diag(1, i)  (log)');
    [0.03, 0.1, 0.3, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, sq, 13, 'right'));
    [[POW_088['1'], C.cyan, 'c'], [POW_088['2'], C.gold, 'g']].forEach(([arr, col, dn]) => { poly088(arr.map((v, i) => [i + 1, v]), xS, yS, col, sq, 3); arr.forEach((v, i) => dot(xS(i + 1), yS(v), 5, dn, sq)); });
    lbl('K words', xS(5), yS(0.157) + 26, C.cyan, sq, 15); lbl('K² words', xS(11.5), yS(0.0705) + 26, C.gold, sq, 15);
    ticks088([1, 4, 8, 12, 16], xS, py + 24, sq);
    const rq = Q(S, 1, 'but reflections alone miss a phase gate', 0.6);
    poly088(POW_088['5'].map((v, i) => [i + 1, v]), xS, yS, C.red, rq, 3);
    lbl('K⁵ (reflections) : stuck at √(2 − √2) ≈ 0.765', xS(8.5), yS(R5_088) - 16, C.red, rq, 16);
    lbl('exhaustive word search , 16 letters', px + pw, py + 54, C.dim, sq, 14, 'right');
    lbl('k mod 10 :  1,3,7,9 → det ∈ μ₁₀  ·  2,4,6,8 → det ∈ μ₅  ·  5 → O(2)  ·  0 → {I}', W / 2, 790, C.dim, rq, 15);
  }
};

/* ---- 04 ENCODING BRIDGE AND DEFECTS (V15 §6–7) ---- */
SCENES.bridge = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'the published braid density theorem', 'published'], [0, 'with nine calls per inverse', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Without the encoding', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'use four n plus two sites in vacuum blocks', 0.6) * f1;
    const xs = ['1', 'τ', 'a₁', 'τ', '1', 'τ', 'a₂', 'τ', '1', 'τ'], bs = ['1', '0', 'q₁', '0', '1', '0', 'q₂', '0', '1', '0'];
    lbl('fusion path x', 120, 300, C.mag, q, 17, 'left'); lbl('bits b', 120, 400, C.cyan, q, 17, 'left');
    xs.forEach((s, i) => cell088(300 + i * 92, 266, 80, 54, s, C.mag, q, 21));
    bs.forEach((s, i) => cell088(300 + i * 92, 366, 80, 54, s, s[0] === 'q' ? C.gold : C.cyan, q, 21));
    for (let i = 0; i < 10; i++) line(340 + i * 92, 322, 340 + i * 92, 364, C.dim, q * 0.6, 1.2);
    lbl('b_j = 1  ⇔  x_(j+1) = vacuum ;  last τ is a bystander', 760, 460, C.dim, q, 15);
    rect63(296, 260, 368, 166, C.white, q * 0.5, 1); rect63(664, 260, 368, 166, C.white, q * 0.5, 1);
    lbl('block 1', 480, 252, C.white, q * 0.7, 14); lbl('block 2', 848, 252, C.white, q * 0.7, 14);
    const gq = Q(S, 0, 'Every Fibonacci braid generator is then exactly K at one address', 0.6) * f1;
    chip(760, 530, 1000, 58, 'B_i  =  K at centre b_(i−1) ,   i = 1 … 4n − 1 ,  boundaries included', C.gold, gq, 22);
    lbl('recomputed : n = 1 and n = 2 (6 and 10 sites) agree entry by entry ; dim V₈ = 13', 760, 590, C.dim, gq, 15);
    const pq = Q(S, 0, 'the published braid density theorem gives universality', 0.6) * f1;
    chip(760, 650, 1000, 56, 'Fibonacci braid density : Freedman–Larsen–Wang (quant-ph/0001108 , math/0103200)', C.cyan, pq, 18);
    const nq = Q(S, 0, 'with nine calls per inverse', 0.6) * f1;
    chip(1560, 300, 400, 58, 'K⁻¹ = K⁹', C.white, nq, 24);
    lbl('word of L generators → ≤ 9L calls', 1560, 360, C.dim, nq, 15);
    chip(1560, 430, 400, 58, 'NAND within ε', C.green, nq, 22);
    lbl('error + leakage ≤ ε² per basis input', 1560, 490, C.dim, nq, 15);
    lbl('half-diamond distance ≤ ε', 1560, 515, C.dim, nq, 15);
  }
  const q = Q(S, 1, 'Without the encoding', 0.6, 0.3);
  if (q > 0) {
    const ch = [0, 1, 1, 0, 1, 0, 0, 1, 1];
    ch.forEach((b, i) => { const x = 220 + i * 100, bad = b && (ch[i + 1] === 1 || ch[i - 1] === 1); dot(x, 330, b ? 18 : 8, bad ? 'r' : b ? 'g' : 'c', q); ring(x, 330, 26, C.dim, q * 0.6, 1.5); lbl(String(b), x, 395, bad ? C.red : C.white, q, 20); });
    [[1, 2], [7, 8]].forEach(([i, j]) => rect63(220 + i * 100 - 36, 290, (j - i) * 100 + 72, 80, C.red, q, 2.5));
    const kq = Q(S, 1, 'K commutes with every product', 0.6);
    const pos = (Math.floor(u * 0.9) % 7) + 1;
    box(220 + (pos - 1) * 100 - 40, 270, 280, 120, C.gold, kq, 2, null); lbl('K_j', 220 + pos * 100, 262, C.gold, kq, 20);
    chip(620, 480, 840, 60, '[ K_j ,  n_i n_(i+1) ] = 0   for all i , j', C.gold, kq, 25);
    lbl('recomputed on a 7-site chain : all 30 commutators vanish', 620, 540, C.dim, kq, 15);
    const sq = Q(S, 1, 'so adjacent pairs of ones survive every word', 0.6);
    stamp('EVERY 11 DEFECT IS CONSERVED', 620, 640, sq, C.red, 28, -0.04);
    const fq = Q(S, 1, 'a single bit flip stays at distance one', 0.6);
    box(1180, 300, 580, 330, C.cyan, fq, 2, 'rgba(0,30,40,0.35)');
    lbl('input n_i = 0 , n_(i+1) = 1', 1470, 350, C.white, fq, 18);
    cell088(1340, 380, 120, 56, '0 1', C.cyan, fq, 24); arrow(1470, 408, 1560, 408, C.gold, fq, 2.5); cell088(1570, 380, 120, 56, '1 1', C.red, fq, 24);
    lbl('X_i jumps to the D_i = 1 sector', 1470, 480, C.white, fq, 17);
    lbl('every K word stays in D_i = 0', 1470, 515, C.white, fq, 17);
    chip(1470, 580, 520, 54, 'distance 1 from every word', C.red, fq, 22);
    lbl('the code lives in the common sector D_i = 0 , so universality on the code is unaffected', 1000, 740, C.dim, fq, 15);
  }
};

/* ---- 05 INTEGERS AND THE FAIR COIN (V15 §8, §11) ---- */
SCENES.rational = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Postselection changes this', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Every amplitude of a finite golden protocol is an algebraic integer', 0.6) * f1;
    chip(530, 270, 860, 58, 'entries of K ∈ ℤ[ζ, β] ,  β = φ^(−1/2) ,  β⁴ + β² − 1 = 0', C.cyan, q, 21);
    lbl('measurements , branches and failures kept : a finite complete protocol', 530, 330, C.dim, q, 15);
    const pq = Q(S, 0, 'so is every complete event probability', 0.6) * f1;
    chip(530, 400, 860, 60, 'p = Σ |(M_h)_yx|²  is a real algebraic integer', C.gold, pq, 23);
    lbl('recomputed exactly on 400 random words : p = m + n(1 − φ) ,  m , n ∈ ℤ', 530, 460, C.dim, pq, 15);
    const rq = Q(S, 0, 'a rational one must be zero or one', 0.6) * f1;
    chip(530, 535, 640, 64, 'p ∈ ℚ  ⇒  p ∈ {0, 1}', C.green, rq, 30);
    const nq = Q(S, 0, 'no exact fair coin, Bell state or Hadamard', 0.6) * f1;
    ['fair coin  1/2', 'Bell state', 'Hadamard'].forEach((s, i) => { const x = 1160 + i * 220; cell088(x, 280, 190, 80, s, C.red, nq, 18, 0.2); line(x + 10, 290, x + 180, 350, C.red, nq, 3); line(x + 180, 290, x + 10, 350, C.red, nq, 3); });
    lbl('each needs a computational-basis event of probability exactly 1/2', 1490, 400, C.white, nq, 16);
    const bq = Q(S, 0, 'no exact fair coin', 0.6, 1.0) * f1;
    chip(1490, 500, 640, 58, '|p − 1/2| ≥ 1 / (2 · 3⁷ · κ^(14L))', C.gold, bq, 23);
    lbl('unitary word of length L ,  κ = 1 + 2φ³ ≈ 9.47 (Prop. 8.3)', 1490, 560, C.dim, bq, 15);
    lbl('approximation is still allowed : the bound is not a uniform gap', 1490, 600, C.dim, bq, 15);
  }
  const q = Q(S, 1, 'Postselection changes this', 0.6, 0.3);
  if (q > 0) {
    const kq = Q(S, 1, 'Run K on two fresh blocks', 0.6);
    [0, 1].forEach(j => { const y = 300 + j * 120; cell088(150, y - 28, 120, 56, '|000⟩', C.cyan, kq, 20); arrow(280, y, 330, y, C.dim, kq, 2); cell088(340, y - 30, 70, 60, 'K', C.gold, kq, 24); arrow(420, y, 470, y, C.dim, kq, 2); lbl('B' + (j ? '₂' : '₁'), 500, y + 8, C.white, kq, 22); });
    lbl('Pr(B = 1) = 1/φ ≈ 0.618 ,  Pr(B = 0) = 1/φ² ≈ 0.382', 330, 520, C.dim, kq, 15);
    const oq = Q(S, 1, 'keep only zero one or one zero', 0.6);
    const outs = [['00', 'φ⁻⁴', 0], ['01', 'φ⁻³', 1], ['10', 'φ⁻³', 1], ['11', 'φ⁻²', 0]];
    outs.forEach(([s, p, k], i) => { const x = 600 + (i % 2) * 190, y = 270 + Math.floor(i / 2) * 120; cell088(x, y, 170, 96, '', k ? C.green : C.dim, oq, 18, k ? 0.25 : 0.06); lbl(s, x + 85, y + 40, k ? C.green : C.dim, oq, 24); lblG(p, x + 85, y + 78, C.white, oq, 18); });
    lbl('keep', 790, 520, C.green, oq, 16);
    const sq = Q(S, 1, 'success is two over phi cubed', 0.6);
    chip(560, 600, 820, 58, 's = 2/φ³ ≈ 0.4721 ,  output bit exactly fair', C.gold, sq, 23);
    lbl('Monte Carlo , 400 000 rounds : success 0.4722 , Pr(1 | kept) = 0.5011', 560, 660, C.dim, sq, 15);
    lbl('E T = 1/s = φ³/2 ≈ 2.118 rounds', 560, 695, C.dim, sq, 15);
    const px = 1080, py = 700, pw = 680, ph = 380, xS = r => px + (r - 0.5) / 10.5 * pw, yS = v => py - v / 0.6 * ph;
    plotAxes(px, py, pw, ph, sq, 'round r', 'Pr(T = r) = (1 − s)^(r−1) s');
    GEOM_088.forEach((v, i) => { const qq = clamp(sq * 1.6 - i / 10); fillBox(xS(i + 1) - 18, yS(v), 36, py - yS(v), C.gold, qq * 0.45); rect63(xS(i + 1) - 18, yS(v), 36, py - yS(v), C.gold, qq, 1.4); });
    const aq = Q(S, 1, 'stopping after M rounds leaves an abort', 0.6);
    poly088(ABORT_088.slice(1).map((v, M) => [M + 1, v]), xS, yS, C.red, aq, 2.5);
    ABORT_088.slice(1).forEach((v, M) => dot(xS(M + 1), yS(v), 6, 'r', aq));
    lbl('abort after M rounds : (1 − s)^M > 0', xS(3.2), yS(0.45), C.red, aq, 16, 'left');
    ticks088([1, 2, 4, 6, 8, 10], xS, py + 24, sq);
  }
};

/* ---- 06 PARITY (V15 §9–10) ---- */
SCENES.parity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So no clean exact NOT', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Same-parity amplitudes lie in Z of zeta', 0.6) * f1;
    box(150, 260, 360, 120, C.cyan, q, 2, 'rgba(0,30,40,0.4)'); lbl('same parity', 330, 300, C.cyan, q, 19); lblG('C_yx ∈ ℤ[ζ]', 330, 350, C.white, q, 26);
    const oq = Q(S, 0, 'opposite-parity ones in beta times Z of zeta', 0.6) * f1;
    box(550, 260, 360, 120, C.mag, oq, 2, 'rgba(40,0,40,0.4)'); lbl('opposite parity', 730, 300, C.mag, oq, 19); lblG('C_yx ∈ β ℤ[ζ]', 730, 350, C.white, oq, 26);
    lbl('one flip of the centre bit costs a factor β ; β² = t = 1/φ ∈ ℤ[ζ]', 530, 420, C.dim, oq, 15);
    const gq = Q(S, 0, 'the Galois map zeta to zeta cubed', 0.6) * f1;
    chip(530, 490, 860, 60, 'σ : ζ ↦ ζ³ ,   t = −(ζ + ζ⁻¹) = 1/φ  ↦  −φ', C.gold, gq, 23);
    const sq = Q(S, 0, 'so a rational opposite-parity probability is zero', 0.6) * f1;
    chip(530, 580, 860, 60, 'p = t Σ |c|²   ⇒   σ(p) = −φ Σ |σ(c)|² ≤ 0', C.green, sq, 23);
    lbl('p ∈ ℚ and p > 0 would force σ(p) = p > 0 : impossible', 530, 640, C.white, sq, 16);
    const px = 1060, py = 470, pw = 700, ph = 170, n = 10, bw = pw / n;
    const dq = Q(S, 0, 'sends beta squared to minus phi', 0.6) * f1;
    plotAxes(px, py, pw, ph, dq, '', 'opposite-parity probability p');
    line(px, py, px + pw, py, C.white, dq * 0.6, 1.5);
    PAR_088.slice(0, n).forEach((r, i) => { const pv = 1 - r[1], x = px + i * bw + 12, qq = clamp(dq * 1.6 - i / 14); if (pv > 1e-9) { fillBox(x, py - pv * ph, bw - 24, pv * ph, C.mag, qq * 0.45); rect63(x, py - pv * ph, bw - 24, pv * ph, C.mag, qq, 1.4); } const sh = Math.log10(1 + Math.abs(r[2])) * 62; if (sh > 0.5) { fillBox(x, py, bw - 24, sh, C.gold, qq * 0.4); rect63(x, py, bw - 24, sh, C.gold, qq, 1.4); } lbl('ℓ=' + r[0], x + (bw - 24) / 2, py + 175, C.dim, qq, 13); });
    lbl('σ(p) ≤ 0  (log scale , down)', px + pw / 2, py + 205, C.gold, dq, 16);
    lbl('exact arithmetic in ℤ[ζ] : 400 random words on 5 sites , every σ(p) ≤ 0', px + pw / 2, py + 240, C.dim, dq, 14);
  }
  const q = Q(S, 1, 'So no clean exact NOT', 0.6, 0.3);
  if (q > 0) {
    lbl('word encoding , ancillas restored :  w(Ĵ_n q) = n + 1 + Σ q_r', 530, 275, C.dim, q, 16);
    const gs = [['NOT', 'So no clean exact NOT'], ['CNOT', 'CNOT'], ['Toffoli', 'Toffoli'], ['V_f  (reversible NAND)', 'or reversible NAND']];
    gs.forEach(([s, ph], i) => { const qq = Q(S, 1, ph, 0.5), y = 310 + i * 76; cell088(170, y, 520, 60, s, C.red, qq, 22, 0.15); line(180, y + 30, 680, y + 30, C.red, qq * 0.8, 3); });
    lbl('exactly , clean', 830, 345, C.red, Q(S, 1, 'CNOT', 0.5), 18);
    const eq = Q(S, 1, 'even after discarding a fixed environment', 0.6);
    chip(530, 660, 860, 56, 'δ(x) = π(ω(x)) ⊕ π(x) must be constant (Thm 9.5)', C.gold, eq, 21);
    lbl('they remain approximable to any accuracy', 530, 715, C.dim, eq, 15);
    const bq = Q(S, 1, 'every finite word has invertible same-parity blocks', 0.6);
    const mx = 1180, my = 280, cs = 150;
    [['C_ee', C.green, 1], ['C_eo', C.dim, 0], ['C_oe', C.dim, 0], ['C_oo', C.green, 1]].forEach(([s, col, k], i) => cell088(mx + (i % 2) * cs, my + Math.floor(i / 2) * cs, cs - 10, cs - 10, s, col, bq, 26, k ? 0.3 : 0.08));
    lbl('even | odd', mx + cs, my - 14, C.dim, bq, 15);
    lbl('C_ee , C_oo invertible', mx + cs, my + 2 * cs + 30, C.green, bq, 20);
    lbl('proof : the metric diag((−φ)^w) of the conjugate field', mx + cs, my + 2 * cs + 62, C.dim, bq, 14);
    lbl('recomputed : 500 random words , smallest singular value 0.053', mx + cs, my + 2 * cs + 88, C.dim, bq, 14);
    const nq = Q(S, 1, 'no state of definite parity is flipped completely', 0.6);
    stamp('NEVER A COMPLETE FLIP', 1330, 740, nq, C.red, 28, -0.04);
  }
};

/* ---- 07 TWO OPTIMA ON ONE FIBER (V16 §3, §12) ---- */
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The gap is a Kullback-Leibler reserve', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Version sixteen starts on the five modes', 0.6) * f1;
    pyrG64(330, 430, 200, 0.6 + t * 0.15, q * 0.9, [1, 1, 1], 1);
    const rq = Q(S, 0, 'Three readings leave a hidden coupling kappa', 0.6) * f1;
    chip(530, 610, 860, 54, 'X = p₁ + p₁₃ ,  Y = p₃ + p₁₃ ,  Z = p₂ ,  R = 1 − Z', C.cyan, rq, 21);
    chip(530, 680, 860, 54, 'max(0, X + Y − R) ≤ κ = p₁₃ ≤ min(X, Y)', C.white, rq, 21);
    const kk = 0.1 + 0.1 * Math.sin(u * 0.8), pv = [0.6 + kk, 0.2 - kk, 0, 0.2 - kk, kk], lab = ['000', '100', '010', '001', '101'];
    pv.forEach((v, i) => { const x = 640 + i * 62, h = v * 300; fillBox(x, 520 - h, 44, h, C.gold, rq * 0.45); rect63(x, 520 - h, 44, h, C.gold, rq, 1.4); lbl(lab[i], x + 22, 545, C.dim, rq, 13); });
    lbl('κ = ' + kk.toFixed(3), 795, 270, C.gold, rq, 17);
    const px = 1060, py = 690, pw = 700, ph = 380, xS = k => px + k / 0.2 * pw, yS = h => py - (h - 0.45) / 0.65 * ph;
    plotAxes(px, py, pw, ph, rq, 'κ ∈ [0 , 1/5]', 'Shannon entropy H(p(κ))');
    poly088(FIBH_088.slice(1), xS, yS, C.cyan, rq, 3);
    ticks088([0, 0.05, 0.1], xS, py + 24, rq, v => v.toFixed(2));
    const mq = Q(S, 0, 'maximum entropy picks X Y over R', 0.6) * f1;
    dashed(xS(0.04), py, xS(0.04), yS(1.06), C.gold, mq, 2); dot(xS(0.04), yS(FIBH_088[16][1]), 11, 'g', mq);
    lbl('κ* = XY/R = 1/25 (max entropy)', xS(0.04) - 10, yS(1.07), C.gold, mq, 17, 'left');
    const nq = Q(S, 0, 'minimax the midpoint', 0.6) * f1;
    dashed(xS(0.1), py, xS(0.1), yS(0.6), C.mag, nq, 2); dot(xS(0.1), yS(FIBH_088[40][1]), 11, 'm', nq);
    lbl('minimax = 1/10 , worst error 1/10', xS(0.1) - 12, yS(0.62), C.mag, nq, 16, 'right');
    const sq = Q(S, 0, 'one twenty-fifth against one tenth', 0.6) * f1;
    stamp('TWO OPTIMA , ONE FIBER', 1410, 790, sq, C.red, 26, -0.04);
  }
  const q = Q(S, 1, 'The gap is a Kullback-Leibler reserve', 0.6, 0.3);
  if (q > 0) {
    chip(530, 262, 860, 56, 'D(p ‖ p*) = H(p*) − H(p) = R · I(x₁ : x₃ | x₂ = 0)', C.gold, q, 21);
    const fq = Q(S, 1, 'Mass-action relaxation toward kappa star', 0.6);
    chip(530, 335, 860, 56, 'κ̇ = γ(b − a) = −M D′(κ) = −γR(κ − κ*) ,  M = γ Λ(a, b)', C.cyan, fq, 20);
    lbl('a = κ(R − X − Y + κ) ,  b = (X − κ)(Y − κ) ,  Λ = logarithmic mean', 530, 390, C.dim, fq, 14);
    const px = 160, py = 700, pw = 740, ph = 260, xS = s => px + s / 3 * pw, yS = k => py - (k - 0.03) / 0.13 * ph;
    plotAxes(px, py, pw, ph, fq, 'time u', 'κ(u)');
    poly088(FLOW_088.map(r => [r[0], r[1]]), xS, yS, C.gold, fq, 3);
    const aq = Q(S, 1, 'yet its action exceeds the straight path', 0.6);
    poly088(FLOW_088.map(r => [r[0], r[2]]), xS, yS, C.cyan, aq, 3);
    dashed(px, yS(FLOWP_088.ks), px + pw, yS(FLOWP_088.ks), C.dim, fq * 0.7, 1.2); lbl('κ* = 0.04', px + pw, yS(FLOWP_088.ks) - 8, C.dim, fq, 14, 'right');
    lbl('mass-action flow', xS(0.55), yS(0.085), C.gold, fq, 16, 'left'); lbl('straight path , same ends', xS(1.4), yS(0.108), C.cyan, aq, 16, 'left');
    const eq = Q(S, 1, 'saturates the energy-dissipation identity', 0.6);
    chip(1400, 262, 760, 56, 'D(κ_T) − D(κ₀) + ½ ∫ [ κ̇²/M + M D′² ] = ½ ∫ (κ̇ + MD′)²/M', C.green, eq, 17);
    lbl('recomputed : defect 0 on the flow , 0.072 on the straight path', 1400, 315, C.dim, eq, 15);
    const rx = 1080, ry = 700, rw = 680, rh = 300, xR = z => rx + z / 8 * rw, yR = v => ry - (v - 1) / 3.2 * rh;
    plotAxes(rx, ry, rw, rh, aq, 'αT', 'A_exp / A_straight');
    poly088(RATIO_088, xR, yR, C.mag, aq, 3);
    dot(xR(3), yR(FLOWP_088.ratio3), 11, 'm', aq); lbl('αT = 3 : 1.657', xR(3) + 16, yR(FLOWP_088.ratio3) + 26, C.mag, aq, 16, 'left');
    lbl('(αT/2) coth(αT/2) > 1', xR(4.4), yR(3.6), C.white, aq, 18);
    ticks088([0, 2, 4, 6, 8], xR, ry + 24, aq);
  }
};

/* ---- 08 RECURSION AND BELLMAN (V16 §4–5) ---- */
SCENES.recursion = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classical']);
  const f1 = 1 - Q(S, 1, 'On a finite acyclic graph', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A contraction shrinks its residual by q squared per step', 0.6) * f1;
    chip(1400, 270, 760, 56, 'E(x) = ½ ‖x − Tx‖² ,  E(Tx) ≤ q² E(x)', C.cyan, q, 22);
    lbl('‖x − x*‖ ≤ ‖x − Tx‖ / (1 − q) : the recursion certifies its error', 1400, 325, C.dim, q, 15);
    lbl('without contraction : T(x) = −x cycles with period two forever', 1400, 360, C.dim, q, 15);
    const fq = Q(S, 0, 'x cubed minus three x plus three', 0.6) * f1;
    const px = 160, py = 720, pw = 780, ph = 420, xS = x => px + (x + 2.6) / 4.6 * pw, yS = e => py - e / 4.5 * ph;
    plotAxes(px, py, pw, ph, fq, 'x', 'E(x) = ½ F(x)² ,  F = x³ − 3x + 3');
    ctx.save(); ctx.globalAlpha = fq; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3;
    for (let i = 1; i < FMIN_088.length; i++) { const A = FMIN_088[i - 1], B = FMIN_088[i]; if (A[1] <= 4.5 && B[1] <= 4.5) { ctx.beginPath(); ctx.moveTo(xS(A[0]), yS(A[1])); ctx.lineTo(xS(B[0]), yS(B[1])); ctx.stroke(); } }
    ctx.restore();
    ticks088([-2, -1, 0, 1, 2], xS, py + 24, fq);
    const lq = Q(S, 0, 'has a strict local minimum of squared residual', 0.6) * f1;
    dot(xS(1), yS(0.5), 13, 'r', lq); fillBox(xS(0.95) - 180, yS(3.5) - 24, 360, 66, '#060c1c', lq * 0.85); lbl('x = 1 :  E = 1/2 ,  E′ = 0 ,  E″ = 6', xS(0.95), yS(3.5), C.red, lq, 16);
    lbl('F(1) = 1 ≠ 0', xS(0.95), yS(3.0), C.red, lq, 16); dashed(xS(1), yS(0.6), xS(1), yS(2.7), C.red, lq * 0.6, 1.2);
    const nq = Q(S, 0, 'solving nothing', 0.6) * f1;
    dot(xS(ROOT_088), yS(0), 13, 'n', nq); lbl('the only zero : x = ' + ROOT_088.toFixed(4), xS(ROOT_088) + 16, yS(0) - 22, C.green, nq, 16, 'left');
    stamp('LOCAL MINIMUM , NO SOLUTION', 1400, 560, nq, C.red, 26, -0.04);
    lbl('zero energy ⇔ solution ; a positive local minimum is not one', 1400, 650, C.dim, nq, 15);
  }
  const q = Q(S, 1, 'On a finite acyclic graph', 0.6, 0.3);
  if (q > 0) {
    const vq = Q(S, 1, 'the Bellman recursion', 0.6);
    dag088(170, 300, 760, 330, q, { V: vq, best: Q(S, 1, 'A path with all reduced costs zero', 0.6) });
    lbl(DAG_088.npaths + ' complete paths from s to t', 550, 720, C.dim, q, 15);
    const rows = [['the Bellman recursion', 'Bellman', 'V(v) = min ( c + V(w) ) ,  V(s) = 7'], ['the cheapest complete path', 'path', 'min over 8 paths = 7'], ['the cheapest unit flow', 'flow', 'min Σ c f ,  div f = δ_s − δ_t :  7 (LP)'], ['the best potential lower bound', 'potential', 'max u(s) ,  u(v) ≤ c + u(w) :  7 (LP)']];
    rows.forEach(([ph, h, s], i) => { const qq = Q(S, 1, ph, 0.5), y = 255 + i * 92; box(1040, y, 730, 76, C.cyan, qq, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1060, y + 46, C.cyan, qq, 20, 'left'); lblG(s, 1200, y + 46, C.white, qq, 19, 'left'); });
    const cq = Q(S, 1, 'A path with all reduced costs zero', 0.6);
    chip(1405, 660, 730, 56, 'c_vw + u(w) − u(v) = 0  along  s → a → b → c → d → t', C.gold, cq, 19);
    stamp('ITS OWN CERTIFICATE', 1405, 760, Q(S, 1, 'certifies its own global optimality', 0.6), C.green, 26, -0.04);
  }
};

/* ---- 09 GIBBS AND CONDITIONAL EXPECTATION (V16 §6, §8) ---- */
SCENES.gibbs = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const f1 = 1 - Q(S, 1, 'Prediction from records is similar', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Add a reference law and a temperature tau', 0.6) * f1;
    chip(530, 262, 860, 56, 'F_τ(P) = E_P C + τ D(P ‖ Q) ,  Q = uniform reference law', C.cyan, q, 21);
    const gq = Q(S, 0, 'is minimized by the Gibbs path law', 0.6) * f1;
    chip(530, 335, 860, 56, 'P*(h) = Q(h) e^(−C(h)/τ) / Z(s)', C.gold, gq, 23);
    lbl('F_τ(P) = −τ log Z(s) + τ D(P ‖ P*)   (150 random P checked)', 530, 392, C.dim, gq, 15);
    const sq = Q(S, 0, 'a soft Bellman recursion computes minus tau log Z', 0.6) * f1;
    chip(530, 455, 860, 56, 'Z(v) = Σ q(w|v) e^(−c_vw/τ) Z(w) ,  Z(t) = 1', C.green, sq, 21);
    dag088(240, 520, 600, 190, sq * 0.8, {});
    const px = 1080, py = 700, pw = 680, ph = 400, xS = tau => px + tau / 3 * pw, yS = v => py - (v - 6) / 5.5 * ph;
    plotAxes(px, py, pw, ph, sq, 'temperature τ', '−τ log Z(s)');
    poly088(GIBBS_088, xS, yS, C.gold, sq, 3);
    const zq = Q(S, 0, 'returns to the Bellman optimum as tau goes to zero', 0.6) * f1;
    line(px, yS(7), px + pw, yS(7), C.cyan, zq, 2); lbl('Bellman optimum m = 7', px + pw, yS(7) + 24, C.cyan, zq, 15, 'right');
    poly088([[0, 7], [3, 7 + 3 * LOGQ_088]].filter(r => r[1] < 11.5).concat([]), xS, yS, C.mag, zq * 0.0, 2);
    curve(p => { const tau = p * Math.min(3, 4.4 / LOGQ_088); return [xS(tau), yS(7 + tau * LOGQ_088)]; }, 30, C.mag, zq, 2);
    lbl('m + τ log 16', xS(1.55), yS(7 + 1.55 * LOGQ_088) - 12, C.mag, zq, 15, 'right');
    ticks088([0, 1, 2, 3], xS, py + 24, sq);
  }
  const q = Q(S, 1, 'Prediction from records is similar', 0.6, 0.3);
  if (q > 0) {
    const rq = Q(S, 1, 'Under one joint law', 0.6);
    chip(530, 262, 860, 56, 'E(Y − g)² = E(Y − m_F)² + E(g − m_F)² ,  m_F = E[Y | F]', C.cyan, rq, 20);
    const dq = Q(S, 1, 'lowers the squared risk by exactly the squared change', 0.6);
    chip(530, 340, 860, 56, 'F ⊂ G :  risk(m_F) − risk(m_G) = E(m_G − m_F)²', C.gold, dq, 22);
    lbl('recomputed on a random 64-point law with nested partitions', 530, 395, C.dim, dq, 15);
    lbl('it needs one shared joint law ; it does not promise every pointwise error falls', 530, 425, C.dim, dq, 14);
    const tq = Q(S, 1, 'following conditional expectations below one', 0.6);
    chip(530, 520, 860, 56, '7 clauses on 4 bits ,  E B = 7/8 < 1', C.green, tq, 22);
    lbl('choose the child whose conditional expectation does not increase', 530, 575, C.dim, tq, 15);
    const tx = 1060, ty = 262, lev = 108, vals = CEXP_088.vals, sib = CEXP_088.sib, leaf = CEXP_088.leaf;
    let x = 1480;
    for (let d = 0; d <= 4; d++) {
      const qq = clamp(tq * 1.5 - d / 6), y = ty + d * lev;
      dot(x, y, 14, d === 4 ? 'n' : 'g', qq); lbl(vals[d].toFixed(3), x + 24, y + 7, d === 4 ? C.green : C.gold, qq, 17, 'left');
      if (d < 4) {
        const dir = leaf[d] ? 1 : -1, w = 260 / (d + 1), nx = x + dir * w, ox = x - dir * w;
        line(x, y, nx, y + lev, C.gold, qq, 3); line(x, y, ox, y + lev, C.dim, qq * 0.7, 1.5);
        ring(ox, y + lev, 10, C.dim, qq * 0.8, 1.5); lbl(sib[d].toFixed(2), ox + (dir > 0 ? -16 : 16), y + lev + 6, C.dim, qq * 0.9, 14, dir > 0 ? 'right' : 'left');
        lbl('x' + (d + 1) + ' = ' + leaf[d], (x + nx) / 2 + dir * 14, y + lev / 2, C.white, qq, 14, dir > 0 ? 'left' : 'right');
        x = nx;
      }
    }
    const lq = Q(S, 1, 'reaches a leaf with no bad event', 0.6);
    stamp('B = 0', x + 230, ty + 4 * lev + 6, lq, C.green, 30, -0.05);
  }
};

/* ---- 10 GOLDEN SPECTRUM (V16 §7) ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [1, null, 'published'], [1, 'Its three-site slice', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Equality picks one Markov chain', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Forbid two adjacent ones', 0.6) * f1;
    const strs = ['0101001', '1001010', '0010100'];
    strs.forEach((s, j) => cells64(170, 255 + j * 64, s, 58, q, C.cyan, {}, 22));
    cells64(170, 450, '0110100', 58, q, C.dim, { 1: C.red, 2: C.red }, 22); lbl('illegal', 600, 485, C.red, q, 16, 'left');
    const fq = Q(S, 0, 'Legal strings follow the Fibonacci recursion', 0.6) * f1;
    chip(530, 560, 860, 56, 'Z_n = Z_(n−1) + Z_(n−2) :  1 , 2 , 3 , 5 , 8 , 13 , 21 , …', C.gold, fq, 21);
    const gq = Q(S, 0, 'they grow at the Perron root phi', 0.6) * f1;
    const px = 160, py = 760, pw = 740, ph = 120, xS = n => px + n / 13 * pw, yS = v => py - (v - 1.4) / 0.7 * ph;
    plotAxes(px, py, pw, ph, gq, 'n', 'Z_(n+1) / Z_n');
    dashed(px, yS(PHI_), px + pw, yS(PHI_), C.gold, gq, 1.5); lbl('φ = 1.618', px + pw, yS(PHI_) - 8, C.gold, gq, 15, 'right');
    ZR_088.slice(0, 14).forEach((v, i) => dot(xS(i), yS(v), 6, 'c', clamp(gq * 1.6 - i / 18)));
    const hq = Q(S, 0, 'every stationary process on them has entropy rate at most log phi', 0.6) * f1;
    const qx = 1080, qy = 700, qw = 680, qh = 400, xQ = x => qx + x * qw, yQ = h => qy - h / 0.55 * qh;
    plotAxes(qx, qy, qw, qh, hq, 'Q(0 → 1) = x', 'entropy rate  H(x) / (1 + x)');
    poly088(HCUR_088, xQ, yQ, C.cyan, hq, 3);
    dashed(qx, yQ(Math.log(PHI_)), qx + qw, yQ(Math.log(PHI_)), C.gold, hq, 1.5);
    const mq = Q(S, 0, 'about zero point four eight one', 0.6) * f1;
    dot(xQ(1 / PHI_ / PHI_), yQ(Math.log(PHI_)), 12, 'g', mq);
    lbl('max = log φ = 0.4812 at x = 1/φ² = 0.382', xQ(0.42), yQ(Math.log(PHI_)) - 20, C.gold, mq, 16, 'left');
    ticks088([0, 0.25, 0.5, 0.75, 1], xQ, qy + 24, hq, v => String(v));
    lbl('h(Q) + (log λ) ν₁ = log ρ − Σ ν_i D(Q_i ‖ P_i) ; checked on 57 chains', qx + qw / 2, qy + 60, C.dim, mq, 14);
  }
  const q = Q(S, 1, 'Equality picks one Markov chain', 0.6, 0.3);
  if (q > 0) {
    const ax = 300, bx = 640, cy = 420;
    ring(ax, cy, 50, C.cyan, q, 3); lbl('0', ax, cy + 9, C.cyan, q, 28); ring(bx, cy, 50, C.gold, q, 3); lbl('1', bx, cy + 9, C.gold, q, 28);
    const rq = Q(S, 1, 'repeat it with probability one over phi', 0.6);
    ctx.save(); ctx.globalAlpha = rq; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ax - 85, cy, 36, 0.3 * Math.PI, 1.7 * Math.PI); ctx.stroke(); ctx.restore();
    lblG('1/φ ≈ 0.618', ax - 90, cy - 56, C.cyan, rq, 20);
    const wq = Q(S, 1, 'write a one with one over phi squared', 0.6);
    curve(p => [ax + 50 + p * (bx - ax - 100), cy - 30 - Math.sin(p * Math.PI) * 60], 30, C.gold, wq, 3); arrow(bx - 62, cy - 34, bx - 50, cy - 28, C.gold, wq, 3);
    lblG('1/φ² ≈ 0.382', (ax + bx) / 2, cy - 110, C.gold, wq, 20);
    curve(p => [bx - 50 - p * (bx - ax - 100), cy + 30 + Math.sin(p * Math.PI) * 60], 30, C.white, wq, 2.5); arrow(ax + 62, cy + 34, ax + 50, cy + 28, C.white, wq, 2.5);
    lblG('1', (ax + bx) / 2, cy + 125, C.white, wq, 20);
    chip(470, 620, 640, 56, 'π = (φ , φ − 1)/(2φ − 1) ≈ (0.724 , 0.276)', C.green, wq, 21);
    lbl('Parry 1964 : the unique maximal-entropy chain , entropy rate log φ', 470, 680, C.dim, wq, 15);
    const sq = Q(S, 1, 'Its three-site slice of the five modes', 0.6);
    const lab = ['000', '100', '010', '001', '101'], px = 1110, py = 620, bw = 110;
    SLICE_088.forEach((v, i) => { const h = v * 1100, qq = clamp(sq * 1.6 - i / 8); fillBox(px + i * bw, py - h, bw - 26, h, C.gold, qq * 0.45); rect63(px + i * bw, py - h, bw - 26, h, C.gold, qq, 1.4); lbl(v.toFixed(3), px + i * bw + (bw - 26) / 2, py - h - 12, C.white, qq, 16); lbl(lab[i], px + i * bw + (bw - 26) / 2, py + 26, C.dim, qq, 15); });
    lblG('(1 , 1/φ , 1 , 1/φ , 1/φ²) / (φ√5)', 1380, 690, C.white, sq, 22);
    const iq = Q(S, 1, 'one over phi, one over phi squared', 0.6);
    lbl('p₀₀₀ p₁₀₁ = p₁₀₀ p₀₀₁ : the two ends are independent given a middle 0', 1380, 740, C.dim, iq, 15);
    lbl('a positive-weight completion , not the Born output of the gate', 1380, 770, C.dim, iq, 14);
  }
};

/* ---- 11 HISTORIES WITHOUT DESCENT (V16 §9–11, §13) ---- */
SCENES.history = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'zero-energy history state', 'published'], [0, 'Eliminating the inside', 'theory'], [1, null, 'theory'], [1, 'Real-time Schrödinger evolution', 'classical']]);
  const f1 = 1 - Q(S, 1, 'But no single step descends', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'prediction is the unique zero-residual completion', 0.6) * f1;
    chip(530, 262, 860, 56, 'x = (I + A + … + A^(m−1)) b  =  unique zero of ½‖(I − A)x − b‖²_W', C.cyan, q, 19);
    const bq = Q(S, 0, 'prediction is the unique zero-residual completion', 0.6, 1.2) * f1;
    ECNT_088.forEach((v, i) => { const x = 200 + i * 120, h = v * 22; fillBox(x, 470 - h, 70, Math.max(h, 2), i === 1 ? C.red : C.cyan, bq * 0.45); rect63(x, 470 - h, 70, Math.max(h, 2), i === 1 ? C.red : C.cyan, bq, 1.4); lbl(['x', 'Ax', 'A²x'][i], x + 35, 498, C.dim, bq, 15); lbl(String(v), x + 35, 460 - h, C.white, bq, 16); });
    lbl('parallel recursion need not descend : 1/2 → 9/2 → 0 (M = 3)', 680, 400, C.dim, bq, 14, 'left');
    lbl('finite solving ≠ stepwise descent', 680, 430, C.red, bq, 16, 'left');
    const hq = Q(S, 0, 'zero-energy history state of a propagation Hamiltonian', 0.6) * f1;
    for (let j = 0; j < 5; j++) { const x = 180 + j * 165; cell088(x, 560, 90, 54, 'ψ' + ['₀', '₁', '₂', '₃', '₄'][j], C.gold, hq, 20); lbl('|' + j + '⟩', x + 45, 640, C.dim, hq, 15); if (j < 4) { arrow(x + 96, 587, x + 158, 587, C.white, hq, 2); lbl('U' + ['₁', '₂', '₃', '₄'][j], x + 127, 577, C.white, hq, 14); } }
    lbl('H_prop = ½ Σ ‖ψ_j − U_j ψ_(j−1)‖² ;  with an input penalty the zero state is unique', 530, 690, C.dim, hq, 14);
    lbl('recomputed : 4 golden gates on 4 sites , zero space dim 16 , then 1', 530, 720, C.dim, hq, 14);
    const eq = Q(S, 0, 'Eliminating the inside of ten K gates', 0.6) * f1;
    const cx = 1400, cy = 450, R = 150;
    for (let j = 0; j < 10; j++) { const an = -Math.PI / 2 + 2 * Math.PI * j / 10, an2 = -Math.PI / 2 + 2 * Math.PI * (j + 1) / 10; const x1 = cx + R * Math.cos(an), y1 = cy + R * Math.sin(an), x2 = cx + R * Math.cos(an2), y2 = cy + R * Math.sin(an2); line(x1, y1, x2, y2, C.gold, eq * 0.7, 2); cell088((x1 + x2) / 2 - 18, (y1 + y2) / 2 - 16, 36, 32, 'K', C.gold, eq, 15); dot(x1, y1, j === 0 ? 12 : 6, j === 0 ? 'c' : 'w', eq * (j === 0 ? 1 : 0.5)); }
    lbl('x = ψ₀ , y = ψ₁₀ , K¹⁰ = I', cx, cy + 8, C.cyan, eq, 16);
    chip(cx, 680, 760, 58, 'min over interior  Σ ‖ψ_j − K ψ_(j−1)‖²  =  ‖y − x‖² / 10', C.gold, eq, 21);
    lbl('general weights : (Σ 1/w_j)⁻¹ ‖y − U_L … U_1 x‖² (recomputed)', cx, 735, C.dim, eq, 14);
  }
  const q = Q(S, 1, 'But no single step descends', 0.6, 0.3);
  if (q > 0) {
    const kq = Q(S, 1, 'Because K to the tenth is the identity', 0.6);
    const cx = 330, cy = 470, R = 150;
    unitc088(cx, cy, R, kq);
    for (let r = 0; r < 10; r++) { const an = 3 * Math.PI / 5 * r; dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 9, 'c', kq); lbl('ζ' + ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][r], cx + (R + 28) * Math.cos(an), cy - (R + 28) * Math.sin(an) + 6, C.dim, kq, 13); }
    const rr = Math.floor((u - lineAt(S, 1).s) * 2) % 10, anr = 3 * Math.PI / 5 * rr; dot(cx + R * Math.cos(anr), cy - R * Math.sin(anr), 15, 'g', kq);
    const eq = Q(S, 1, 'any energy that never rises under K is constant', 0.6);
    chip(560, 262, 780, 56, 'E(ψ) = E(K¹⁰ψ) ≤ E(K⁹ψ) ≤ … ≤ E(Kψ) ≤ E(ψ)', C.gold, eq, 20);
    stamp('NO STRICT DESCENT', 760, 470, eq, C.red, 28, -0.04);
    lbl('a whole history can be a minimizer ; no single gate lowers it', 760, 560, C.dim, eq, 15);
    const sq = Q(S, 1, 'Real-time Schrödinger evolution is a saddle of the action', 0.6);
    chip(1410, 262, 680, 56, 'δS = 0  ⇔  iħ ψ̇ = Hψ', C.cyan, sq, 23);
    lbl('H = 0 : S[ψ_ε] − S[b] = −ħ ε² ω ∫ f²  takes both signs : a saddle', 1410, 318, C.dim, sq, 15);
    const iq = Q(S, 1, 'only normalized imaginary time lowers energy', 0.6);
    const px = 1080, py = 720, pw = 680, ph = 260, xS = tau => px + tau / 2 * pw, IM = IMAG_088.filter(r => r[0] <= 2.0001);
    const ymin = Math.min(...IM.map(r => r[1])) - 0.2, ymax = Math.max(...IM.map(r => r[1])) + 0.2, yS = e => py - (e - ymin) / (ymax - ymin) * ph;
    plotAxes(px, py, pw, ph, iq, 'imaginary time τ', 'E(τ) = ⟨ψ , Hψ⟩');
    poly088(IM, xS, yS, C.gold, iq, 3, clamp((u - lineAt(S, 1).s - 9) / 3));
    dashed(px, yS(IMIN_088), px + pw, yS(IMIN_088), C.green, iq, 1.5); lbl('lowest level', px + pw, yS(IMIN_088) + 22, C.green, iq, 14, 'right');
    const vq = Q(S, 1, 'at twice the variance', 0.6);
    chip(1420, 375, 600, 56, 'dE/dτ = −2 Var_ψ(H) ≤ 0', C.gold, vq, 23);
    ticks088([0, 0.5, 1, 1.5, 2], xS, py + 24, iq);
  }
};

/* ---- 12 FINITE BUDGETS (V16 §14) ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'How close real compilation comes is open', 'open']]);
  const q = Q(S, 0, 'Let e sub L be the best error', 0.6);
  const bits = ['1', '0', 'q', '0', '1', '0'];
  const cq = Q(S, 0, 'Back to the gate as an optimizer', 0.6);
  bits.forEach((b, i) => cell088(160 + i * 90, 260, 76, 60, b, b === 'q' ? C.gold : C.cyan, cq, 24));
  lbl('K_P , K_Q at two addresses ; target : logical X', 430, 360, C.dim, cq, 16);
  chip(530, 420, 860, 58, 'e_L = min over words |C| ≤ L ,  min_θ ‖C J − e^(iθ) J X‖', C.cyan, q, 21);
  const mq = Q(S, 0, 'It is positive', 0.6);
  chip(530, 500, 860, 58, 'e_L > 0 ,   e_(L+1) ≤ e_L ,   e_L → 0', C.gold, mq, 25);
  const iq = Q(S, 0, 'so no finite word attains the infimum', 0.6);
  stamp('INFIMUM 0 , NEVER ATTAINED', 530, 600, iq, C.red, 26, -0.04);
  const px = 1040, py = 740, pw = 720, ph = 460, xS = L => px + (L - 1) / 19 * pw;
  const f1 = 1 - Q(S, 1, 'Parity makes this quantitative', 0.8);
  const sq = Q(S, 0, 'never increases, and tends to zero', 0.6);
  if (f1 > 0) {
    const a0 = q * f1, yS = v => py - v / 0.7 * ph;
    plotAxes(px, py, pw, ph, a0, 'word length L', 'e_L  (linear)');
    [0, 0.2, 0.4, 0.6].forEach(v => lbl(v.toFixed(1), px - 10, yS(v) + 5, C.dim, a0, 13, 'right'));
    ticks088([1, 5, 10, 15, 20], xS, py + 24, a0);
    const a1 = sq * f1;
    ctx.save(); ctx.globalAlpha = a1; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
    EL_088.forEach((v, i) => { const X = xS(i + 1), Y = yS(v); if (i === 0) ctx.moveTo(X, Y); else { ctx.lineTo(X, yS(EL_088[i - 1])); ctx.lineTo(X, Y); } }); ctx.stroke(); ctx.restore();
    EL_088.forEach((v, i) => dot(xS(i + 1), yS(v), 6, 'c', a1));
    lbl('exhaustive search over all positive words , L ≤ 20', xS(10.5), yS(0.62), C.cyan, a1, 15);
    lbl('0.654 → 0.389 → 0.238 → 0.113 → 0.068', xS(10.5), yS(0.56), C.white, a1, 15);
    dashed(px, yS(0), px + pw, yS(0), C.red, iq * f1, 1.5); lbl('infimum 0', px + pw, yS(0) - 10, C.red, iq * f1, 14, 'right');
  }
  const q1 = Q(S, 1, 'Parity makes this quantitative', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 690, 860, 58, 'Γ = φ³ + √(φ⁶ − 1) ≈ 8.352 < 9', C.mag, q1, 23);
    const yL = v => py - (Math.log10(Math.max(v, 1e-10)) + 10) / 10 * ph;
    plotAxes(px, py, pw, ph, q1, 'word length L', 'error  (log scale)');
    [1e-10, 1e-8, 1e-6, 1e-4, 1e-2, 1].forEach(v => lbl(v === 1 ? '1' : '1e' + Math.log10(v), px - 10, yL(v) + 5, C.dim, q1, 13, 'right'));
    ticks088([1, 5, 10, 15, 20], xS, py + 24, q1);
    ctx.save(); ctx.globalAlpha = q1; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
    EL_088.forEach((v, i) => { const X = xS(i + 1), Y = yL(v); if (i === 0) ctx.moveTo(X, Y); else { ctx.lineTo(X, yL(EL_088[i - 1])); ctx.lineTo(X, Y); } }); ctx.stroke(); ctx.restore();
    lbl('e_L', xS(20) + 10, yL(EL_088[19]) + 5, C.cyan, q1, 16, 'left');
    const bq = Q(S, 1, 'e sub L is at least root of two over one plus gamma to the L', 0.6);
    poly088(ELB_088.map((v, i) => [i + 1, v]), xS, yL, C.mag, bq, 3);
    ELB_088.forEach((v, i) => dot(xS(i + 1), yL(v), 4, 'm', bq));
    lbl('lower bound √(2 / (1 + Γ^L))', xS(12) - 12, yL(ELB_088[11]) + 34, C.mag, bq, 16, 'right');
    chip(530, 770, 860, 52, 'e_L ≤ ε requires L ≥ log(2ε⁻² − 1) / log Γ', C.white, bq, 20);
    lbl('recomputed exactly over all 2^L words , L ≤ 12 : q · σ(q) is an integer ≥ 1', xS(1.6), yL(1e-8), C.dim, bq, 14, 'left');
    const oq = Q(S, 1, 'How close real compilation comes is open', 0.6);
    lbl('gap between this lower bound and constructive upper bounds : open', xS(1.6), yL(1e-9), C.vio, oq, 15, 'left');
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Fibonacci braid density, Parry', 'published'], [1, 'Bellman, Gibbs and Schrödinger are classical', 'classical'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['ADDRESSES', 'two K , μ₁₀', C.gold, 'Two addresses'], ['CIRCLE', '4 + 2√5 > 2', C.cyan, 'a dense circle'], ['BLOCKS', 'B_i = K', C.mag, 'braiding blocks'], ['INTEGERS', 'p ∈ ℚ ⇒ 0 , 1', C.red, 'integers against fair coins'], ['PARITY', 'σ(p) ≤ 0', C.green, 'parity against flips'], ['FIBER', '1/25 vs 1/10', C.gold, 'two optima'], ['BELLMAN · GIBBS', 'V(s) = 7', C.cyan, 'Bellman and Gibbs'], ['SPECTRUM', 'log φ', C.gold, 'the golden spectrum'], ['HISTORY', 'K¹⁰ = I', C.mag, 'histories without descent'], ['INFIMUM', '√(2/(1+Γ^L))', C.green, 'an unattained infimum']];
    items.forEach(([a1, a2, col, ph], i) => { const r = i < 5 ? 0 : 1, c = r ? i - 5 : i, x = 300 + c * 330, y = 230 + r * 125, q = Q(S, 0, ph) * fade; box(x - 150, y, 300, 105, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 40, col, q, 18); lblG(a2, x, y + 80, C.white, q, 20); });
    lbl('PUBLISHED · Fibonacci braid density (Freedman–Larsen–Wang) · Parry measure (Parry 1964) · history states (Aharonov et al.)', W / 2, 525, C.cyan, Q(S, 1, 'Fibonacci braid density, Parry') * fade, 15);
    lbl('CLASSICAL · Bellman recursion and LP duality · Gibbs variational principle · conditional expectation · Schrödinger action · imaginary time', W / 2, 565, '#8fbcff', Q(S, 1, 'Bellman, Gibbs and Schrödinger are classical') * fade, 15);
    lbl('VOLUMES · V15 §2–11 : gate , density , powers , bridge , defects , integers , parity , coin  ·  V16 §3–14 : fiber , residuals , dissipation , history , e_L bound', W / 2, 605, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · braid identity · Tr 4 − 2√5 · word search to 20 letters · 6- and 10-site bridge · exact ℤ[ζ] probabilities · Monte Carlo coin · LPs · Parry · EDI', W / 2, 645, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM ; NEITHER VOLUME IS DIGESTED YET', W / 2, 720, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V15–V16 · GOLDEN', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V15–V16 · 黄金门的算术与变分预测 · TRURETURING FILM 088', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One matrix approximates every gate; its exact words obey integers and parity.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V15–V16', gate: 'NAND AND THE GATE', density: 'TWO ADDRESSES', bridge: 'ENCODING BRIDGE', rational: 'INTEGER PROBABILITIES', parity: 'PARITY SELECTION', fiber: 'TWO OPTIMA', recursion: 'RECURSION AND BELLMAN', gibbs: 'GIBBS AND RECORDS', golden: 'GOLDEN SPECTRUM', history: 'HISTORIES', budget: 'FINITE WORDS', finale: 'LEDGER' });

function poster088() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('K = ζ[I + (ζ − 1)P] ,  K¹⁰ = I', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('p ∈ ℚ  ⇒  p ∈ {0, 1}', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('e_L ≥ √(2 / (1 + Γ^L)) ,  Γ < 9', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 黄金门的算术与变分预测', W / 2, 140, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V15–V16 · GOLDEN', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('NAND 式普适性 · 算术边界 · 预测 · 递归 · 变分', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 088', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster088;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
