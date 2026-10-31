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

/* ---- film 080: AURIC QUANTUM PRINCIPLES V · STATIC SLICES, RETURN RECORDS AND PHASE READOUTS ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN GENERAL THEOREM · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN QUESTION · LEFT OPEN IN THE VOLUME', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po080 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po080.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po080.set(key, off); }
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
/* ---- film 080 data (from verify080.py) ---- */
const LOOP080 = [[0.0, 0.0], [0.01, 0.56569], [0.02, 0.8], [0.03, 0.9798], [0.04, 1.13137], [0.05, 1.26491], [0.06, 1.38564], [0.07, 1.49666], [0.08, 1.6], [0.09, 1.69706], [0.1, 1.78885], [0.11, 1.87617], [0.12, 1.95959], [0.13, 2.03961], [0.14, 2.1166], [0.15, 2.19089], [0.16, 2.26274], [0.17, 2.33238], [0.18, 2.4], [0.19, 2.46577], [0.2, 2.52982], [0.21, 2.5923], [0.22, 2.6533], [0.23, 2.71293], [0.24, 2.77128], [0.25, 2.82843], [0.26, 2.88444], [0.27, 2.93939], [0.28, 2.99333], [0.29, 3.04631], [0.3, 3.09839], [0.31, 3.1496], [0.32, 3.2], [0.33, 3.24962], [0.34, 3.29848], [0.35, 3.34664]];
const LOOPEX080 = 0.29289;
const SPECT080 = [1.0, 1.0, 0.0, 0.0, 0.0, 0.0, -0.5, -0.5, -0.5];
const BDIA080 = [[2, 1.333333, 1.333333], [3, 0.666667, 0.666667], [4, 0.333333, 0.333333], [5, 0.166667, 0.166667], [6, 0.083333, 0.083333], [7, 0.041667, 0.041667], [8, 0.020833, 0.020833], [9, 0.010417, 0.010417], [10, 0.005208, 0.005208]];
const BPOP080 = [0.16667, 0.16667, 0.33333, 0.16667, 0.16667];
const BDRIFT080 = [[0.0934, 0.2124, 0.1131, 0.1822, 0.3989], [0.1529, 0.0566, 0.5811, 0.1529, 0.0566], [0.1047, 0.2905, 0.2095, 0.1047, 0.2905], [0.1976, 0.1047, 0.3953, 0.1976, 0.1047], [0.1512, 0.1976, 0.3024, 0.1512, 0.1976], [0.1744, 0.1512, 0.3488, 0.1744, 0.1512], [0.1628, 0.1744, 0.3256, 0.1628, 0.1744], [0.1686, 0.1628, 0.3372, 0.1686, 0.1628], [0.1657, 0.1686, 0.3314, 0.1657, 0.1686]];
const TREE080 = [[0, 1.0, 0.333333], [1, 0.666667, 0.5], [2, 0.5, 0.666667], [3, 0.416667, 0.8], [4, 0.375, 0.888889], [5, 0.354167, 0.941176], [6, 0.34375, 0.969697], [7, 0.338542, 0.984615], [8, 0.335938, 0.992248], [9, 0.334635, 0.996109], [10, 0.333984, 0.998051], [11, 0.333659, 0.999024], [12, 0.333496, 0.999512]];
const RESET080 = {"0.2": [0.0, 0.67232, 0.89263, 0.96482, 0.98847, 0.99622, 0.99876, 0.99959, 0.99987, 0.99996, 0.99999, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "0.05": [0.0, 0.22622, 0.40126, 0.53671, 0.64151, 0.72261, 0.78536, 0.83392, 0.87149, 0.90056, 0.92306, 0.94046, 0.95393, 0.96435, 0.97242, 0.97866, 0.98348, 0.98722, 0.99011, 0.99235, 0.99408, 0.99542, 0.99646, 0.99726, 0.99788, 0.99836, 0.99873, 0.99902, 0.99924, 0.99941, 0.99954, 0.99965, 0.99973, 0.99979, 0.99984, 0.99987, 0.9999, 0.99992, 0.99994, 0.99995, 0.99996, 0.99997, 0.99998, 0.99998, 0.99999, 0.99999, 0.99999, 0.99999, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], "0.01": [0.0, 0.04901, 0.09562, 0.13994, 0.18209, 0.22218, 0.2603, 0.29655, 0.33103, 0.36381, 0.39499, 0.42465, 0.45284, 0.47966, 0.50516, 0.52941, 0.55248, 0.57441, 0.59527, 0.6151, 0.63397, 0.65191, 0.66897, 0.68519, 0.70062, 0.71529, 0.72925, 0.74252, 0.75513, 0.76714, 0.77855, 0.7894, 0.79972, 0.80954, 0.81887, 0.82775, 0.83619, 0.84422, 0.85186, 0.85912, 0.86602, 0.87259, 0.87883, 0.88477, 0.89042, 0.89579, 0.9009, 0.90575, 0.91037, 0.91476, 0.91894, 0.92291, 0.92669, 0.93028, 0.9337, 0.93695, 0.94004, 0.94298, 0.94577, 0.94843, 0.95096]};
const EVJ080 = [1.0, 0.66667, 0.0, 0.0, 0.0];
const SIGNC080 = [[0.0, 0.0, 0.0], [0.01, 0.04, 0.02], [0.02, 0.07998, 0.03999], [0.03, 0.11995, 0.05997], [0.04, 0.15987, 0.07994], [0.05, 0.19975, 0.09987], [0.06, 0.23957, 0.11978], [0.07, 0.27931, 0.13966], [0.08, 0.31897, 0.15949], [0.09, 0.35854, 0.17927], [0.1, 0.39799, 0.199], [0.11, 0.43733, 0.21866], [0.12, 0.47653, 0.23827], [0.13, 0.51559, 0.25779], [0.14, 0.55448, 0.27724], [0.15, 0.59321, 0.29661], [0.16, 0.63175, 0.31588], [0.17, 0.6701, 0.33505], [0.18, 0.70824, 0.35412], [0.19, 0.74616, 0.37308], [0.2, 0.78384, 0.39192], [0.21, 0.82127, 0.41063], [0.22, 0.85844, 0.42922], [0.23, 0.89534, 0.44767], [0.24, 0.93194, 0.46597], [0.25, 0.96825, 0.48412], [0.26, 1.00423, 0.50212], [0.27, 1.03989, 0.51994], [0.28, 1.0752, 0.5376], [0.29, 1.11015, 0.55508], [0.3, 1.14473, 0.57236], [0.31, 1.17891, 0.58946], [0.32, 1.21269, 0.60635], [0.33, 1.24605, 0.62303], [0.34, 1.27898, 0.63949], [0.35, 1.31145, 0.65572], [0.36, 1.34345, 0.67173], [0.37, 1.37497, 0.68748], [0.38, 1.40598, 0.70299], [0.39, 1.43647, 0.71824], [0.4, 1.46642, 0.73321], [0.41, 1.49582, 0.74791], [0.42, 1.52464, 0.76232], [0.43, 1.55287, 0.77643], [0.44, 1.58048, 0.79024], [0.45, 1.60745, 0.80373], [0.46, 1.63377, 0.81689], [0.47, 1.65941, 0.82971], [0.48, 1.68436, 0.84218], [0.49, 1.70858, 0.85429], [0.5, 1.73205, 0.86603], [0.51, 1.75476, 0.87738], [0.52, 1.77667, 0.88833], [0.53, 1.79775, 0.89888], [0.54, 1.818, 0.909], [0.55, 1.83736, 0.91868], [0.56, 1.85582, 0.92791], [0.57, 1.87335, 0.93667], [0.58, 1.88991, 0.94496], [0.59, 1.90547, 0.95274], [0.6, 1.92, 0.96], [0.61, 1.93346, 0.96673], [0.62, 1.94581, 0.97291], [0.63, 1.95702, 0.97851], [0.64, 1.96704, 0.98352], [0.65, 1.97583, 0.98791], [0.66, 1.98334, 0.99167], [0.67, 1.98953, 0.99476], [0.68, 1.99434, 0.99717], [0.69, 1.99771, 0.99886], [0.7, 1.9996, 0.9998], [0.71, 1.99993, 0.99997], [0.72, 1.99865, 0.99932], [0.73, 1.99567, 0.99783], [0.74, 1.99092, 0.99546], [0.75, 1.98431, 0.99216], [0.76, 1.97577, 0.98788], [0.77, 1.96518, 0.98259], [0.78, 1.95243, 0.97622], [0.79, 1.93742, 0.96871], [0.8, 1.92, 0.96], [0.81, 1.90003, 0.95002], [0.82, 1.87735, 0.93868], [0.83, 1.85177, 0.92589], [0.84, 1.82309, 0.91155], [0.85, 1.79106, 0.89553], [0.86, 1.75541, 0.87771], [0.87, 1.71582, 0.85791], [0.88, 1.67191, 0.83595], [0.89, 1.62322, 0.81161], [0.9, 1.5692, 0.7846], [0.91, 1.50917, 0.75459], [0.92, 1.44226, 0.72113], [0.93, 1.36732, 0.68366], [0.94, 1.28282, 0.64141], [0.95, 1.18655, 0.59327], [0.96, 1.0752, 0.5376], [0.97, 0.94325, 0.47162], [0.98, 0.78007, 0.39004], [0.99, 0.55863, 0.27931], [1.0, 0.0, 0.0]];
const SIGNS080 = [[0.25, 0.96825], [0.5, 1.73205], [0.7071, 2.0], [0.9, 1.5692]];
const RANKH080 = [[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], [0.5, 0.5625, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5625, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5625, 0.5, 0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5, 0.5625, 0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5625, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5625, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5625, 0.5], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5625]];
const RANKSV080 = [5.244403, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.0625, 0.011917];
const RANKG080 = 0.0067621;
const NATD080 = [[0.0, 0.0, 0.0], [0.001, 0.002549, 0.002469], [0.002, 0.005097, 0.004777], [0.003, 0.007646, 0.006926], [0.004, 0.010194, 0.008914], [0.005, 0.012742, 0.010743], [0.006, 0.01529, 0.012411], [0.007, 0.017838, 0.01392], [0.008, 0.020386, 0.015268], [0.009, 0.022933, 0.016457], [0.01, 0.025481, 0.017485], [0.011, 0.028027, 0.018354], [0.012, 0.030574, 0.019063], [0.013, 0.03312, 0.019611], [0.014, 0.035666, 0.02], [0.015, 0.038212, 0.020228], [0.016, 0.040757, 0.020297], [0.017, 0.043301, 0.020205], [0.018, 0.045845, 0.019954], [0.019, 0.048389, 0.019542], [0.02, 0.050932, 0.018971], [0.021, 0.053474, 0.018239], [0.022, 0.056016, 0.017348], [0.023, 0.058557, 0.016297], [0.024, 0.061097, 0.015085], [0.025, 0.063637, 0.013714], [0.026, 0.066176, 0.012182], [0.027, 0.068714, 0.010491], [0.028, 0.071251, 0.008639], [0.029, 0.073788, 0.006628], [0.03, 0.076324, 0.004456], [0.031, 0.078859, 0.002125], [0.032, 0.081392, -0.000366], [0.033, 0.083925, -0.003018], [0.034, 0.086457, -0.005829], [0.035, 0.088988, -0.008801], [0.036, 0.091518, -0.011932], [0.037, 0.094047, -0.015224], [0.038, 0.096575, -0.018675], [0.039, 0.099102, -0.022287], [0.04, 0.101627, -0.026058], [0.041, 0.104152, -0.02999], [0.042, 0.106675, -0.034081], [0.043, 0.109197, -0.038332], [0.044, 0.111718, -0.042744], [0.045, 0.114237, -0.047315], [0.046, 0.116755, -0.052047], [0.047, 0.119272, -0.056938], [0.048, 0.121787, -0.06199], [0.049, 0.124301, -0.067201], [0.05, 0.126814, -0.072573], [0.051, 0.129325, -0.078104], [0.052, 0.131834, -0.083796], [0.053, 0.134342, -0.089647], [0.054, 0.136849, -0.095658], [0.055, 0.139354, -0.10183], [0.056, 0.141857, -0.108161], [0.057, 0.144358, -0.114653], [0.058, 0.146858, -0.121304], [0.059, 0.149357, -0.128116], [0.06, 0.151853, -0.135087]];
const NATP080 = [[0.25279, 0.00778, 0.48586, 0.2458, 0.00777], [0.24005, 0.00658, 0.4998, 0.247, 0.00657]];
const POLX080 = [1.0, 0.0, 0.0, 0.0, 0.0];
const POLY080 = [0.0, 0.12774, 0.74452, 0.12774, 0.0];
/* ---- film 080 helpers ---- */
function ell080(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll080(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell080(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function interp080(arr, x) { if (x <= arr[0][0]) return arr[0][1]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][1] * (1 - f) + arr[i][1] * f; } return arr[arr.length - 1][1]; }
const LBL080 = ['N', '2', '3', '5', '25'];
/* horizontal binary record tree; pf(k, i) gives the mass of node i at depth k ; node 0 is the all-plus word */
function rtree080(x0, y0, w, h, D, pf, a, o = {}) {
  if (a <= 0) return;
  const dx = w / D;
  for (let k = 0; k <= D; k++) {
    const n = 1 << k, q = o.prog == null ? 1 : clamp(o.prog * (D + 1) - k);
    for (let i = 0; i < n; i++) {
      const x = x0 + k * dx, y = y0 + (i + 0.5) / n * h;
      if (k < D) for (let c = 0; c < 2; c++) {
        const y2 = y0 + (2 * i + c + 0.5) / (2 * n) * h, hl = o.hl && i === 0 && c === 0;
        const q2 = o.prog == null ? 1 : clamp(o.prog * (D + 1) - k - 1);
        line(x, y, x + dx, y2, hl ? C.gold : (c === 0 ? C.cyan : C.mag), a * q2 * (hl ? 1 : 0.5), hl ? 3.5 : 1.6);
      }
      const pr = pf(k, i);
      dot(x, y, 3 + 15 * Math.sqrt(pr), o.hl && i === 0 ? 'g' : 'c', a * q);
    }
  }
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['static slices with no global clock', 'STATIC SLICES', 'directed regions , no global clock', C.gold], ['observers that keep their records', 'INTERNAL OBSERVERS', 'records , memory and return ports kept', C.cyan], ['a balanced five-mode channel with a return instrument', 'BALANCED CHANNEL', 'a segment τ_p and an exact record tree', C.mag], ['phases the native menu cannot read', 'PHASE READOUTS', 'a sign that no real effect can see', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 340, 58, 'pairwise ≠ global', C.gold, rp, 22); chip(330, 445, 340, 58, 'a segment τ_p', C.mag, rp, 22); chip(330, 530, 340, 58, 'a record tree', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('a hidden sign', 1610, 410, C.cyan, rp, 22); lblG('‖S₊ − S₋‖ = 4t√(1 − t²)', 1610, 470, C.white, rp, 24);
  txt(scramble('AURIC QP V · STATIC SLICES', rp, 480), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 量 子 原 理 第 五 部 · 静 态 切 面 、返 回 记 录 与 相 位 读 口', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 080 · AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION · §14–§36', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 KERNEL : static slices, positive kernels and loop phases (§14–§16) ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Loops carry phase', 0.6);
  if (f1 > 0) {
    const sq = Q(S, 0, 'Static slices are finite regions', 0.6) * f1;
    const EV = [[230, 380], [330, 300], [330, 460], [450, 380], [570, 300], [570, 460], [690, 380], [810, 380]];
    const EE = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7]];
    EE.forEach(([i, j]) => line(EV[i][0], EV[i][1], EV[j][0], EV[j][1], C.dim, sq * 0.7, 1.5));
    EV.forEach(p => dot(p[0], p[1], 9, 'c', sq));
    fillEll080(330, 380, 140, 120, C.cyan, sq * 0.08); ell080(330, 380, 140, 120, C.cyan, sq, 2.2); lbl('C', 262, 462, C.cyan, sq, 28);
    ell080(430, 345, 165, 85, C.mag, sq, 2.2, -0.15); lbl('D', 525, 312, C.mag, sq, 28);
    const xq = Q(S, 0, 'any two share an extension', 0.6) * f1;
    ell080(400, 380, 240, 145, C.gold, xq, 2.4, 0, 1); lbl('C ∪ D', 660, 250, C.gold, xq, 20);
    lbl('C ≤ D ⇔ C ⊆ D :  any two finite slices have the common extension C ∪ D', 520, 565, C.white, xq, 16);
    lbl('incompatible successors have no common bound : limits stay in one sector', 520, 595, C.dim, xq, 15);
    const mq = Q(S, 0, 'with off-diagonals minus three quarters', 0.6) * f1;
    const M = [['1', '−3/4', '−3/4'], ['−3/4', '1', '−3/4'], ['−3/4', '−3/4', '1']];
    mgrid(380, 625, M, 96, 56, mq, { size: 20, colf: (v, i, j) => i === j ? C.white : C.gold });
    const bq = Q(S, 0, 'every two-by-two block is positive', 0.6) * f1;
    rect63(374, 619, 204, 124, C.cyan, bq, 3.5);
    lbl('K₃ =', 330, 720, C.white, mq, 22, 'right');
    const kq = Q(S, 0, 'Positive kernels build their Hilbert space', 0.6) * f1;
    chip(1400, 250, 760, 56, 'Σ c̄_j c_k K(x_j, x_k) ≥ 0  ⇒  unique minimal H_K ,  dim = Gram rank', C.cyan, kq, 19);
    lbl('bare graph decides nothing : K ≡ 1 gives dim 1 ,  K = δ gives dim n', 1400, 310, C.dim, kq, 15);
    const y0 = 600, hs = 90;
    lbl('every 2 × 2 block', 1165, 400, C.cyan, bq, 18);
    bars63(1120, y0, [0.25, 1.75], 60, 30, hs, bq, C.cyan, ['1/4', '7/4']);
    const wq = Q(S, 0, 'yet the whole has eigenvalue minus one half', 0.6) * f1;
    lbl('the whole 3 × 3', 1525, 400, C.gold, wq, 18);
    bars63(1420, y0, [-0.5, 1.75, 1.75], 60, 30, hs, wq, C.gold, ['−1/2', '7/4', '7/4']);
    lbl('eigenvector (1, 1, 1)', 1500, y0 + 92, C.red, wq, 16);
    stamp('PAIRWISE ≠ GLOBAL', 1450, 770, wq, C.red, 30, -0.04);
  }
  const q1 = Q(S, 1, 'Loops carry phase', 0.6, 0.3);
  if (q1 > 0) {
    const cq = Q(S, 1, 'one minus the product of the phases', 0.6);
    chip(530, 255, 860, 60, '|1 − ∏ u_j|  ≤  Σ √(2(1 − r_j)) ,   ⟨v_j , v_j+1⟩ = r_j u_j', C.gold, cq, 22);
    const P4 = [[330, 360], [730, 360], [730, 620], [330, 620]];
    const ph = ['+1', '+1', '+1', '−1'];
    for (let j = 0; j < 4; j++) { const A = P4[j], Bp = P4[(j + 1) % 4], col = j === 3 ? C.red : C.cyan; line(A[0], A[1], Bp[0], Bp[1], col, q1, j === 3 ? 4 : 3); lblG('r u = r · (' + ph[j] + ')', (A[0] + Bp[0]) / 2 + (j === 1 ? 20 : j === 3 ? -20 : 0), (A[1] + Bp[1]) / 2 + (j === 0 ? -16 : j === 2 ? 34 : 8), col, q1, 17, j === 1 ? 'left' : j === 3 ? 'right' : 'center'); }
    P4.forEach((p, j) => { dot(p[0], p[1], 14, 'g', q1); lblG('v' + (j + 1), p[0] + (j === 1 || j === 2 ? 26 : -26), p[1] + 8, C.white, q1, 20, j === 1 || j === 2 ? 'left' : 'right'); });
    const sq = Q(S, 1, 'so a four-loop with one sign flip', 0.6);
    lbl('product of phases = −1 :  2 ≤ 4 √(2ε)  ⇒  ε ≥ 1/8', 530, 700, C.gold, sq, 19);
    lbl('flat transport ⇔ every loop multiplies to I ;  relative phase is visible in p₊ = (1 + Re⟨U_pψ, U_qψ⟩)/2', 530, 740, C.dim, sq, 14);
    const pq = Q(S, 1, 'Around a loop of unit vectors', 0.8);
    const px = 1060, py = 760, pw = 680, ph2 = 420, xS = e => px + e / 0.35 * pw, yS = v => py - v / 3.5 * ph2;
    plotAxes(px, py, pw, ph2, pq, '', 'phase budget for the loop (+, +, +, −)');
    lblG('ε', px + pw + 22, py + 6, C.dim, pq, 20);
    lblG('all overlaps r_j ≥ 1 − ε', px + pw - 10, yS(0.9), C.dim, pq, 15, 'right');
    fillBox(px + 1, py - ph2, xS(1 / 8) - px, ph2, C.red, sq * 0.12);
    fillBox(xS(1 / 8), py - ph2, xS(LOOPEX080) - xS(1 / 8), ph2, C.red, sq * 0.05);
    curve(p => { const e = p * 0.35; return [xS(e), yS(interp080(LOOP080, e))]; }, 70, C.cyan, pq, 3);
    lbl('right side 4√(2ε)', xS(0.25), yS(2.95) - 16, C.cyan, pq, 16, 'right');
    line(px, yS(2), px + pw, yS(2), C.gold, pq, 2.5); lbl('left side |1 − (−1)| = 2', px + pw - 10, yS(2) - 12, C.gold, pq, 16, 'right');
    dot(xS(1 / 8), yS(2), 10, 'g', sq); dashed(xS(1 / 8), py, xS(1 / 8), yS(2), C.gold, sq, 1.5); lbl('1/8', xS(1 / 8), py + 26, C.gold, sq, 16);
    const eq = Q(S, 1, 'cannot keep every overlap above seven eighths', 0.6);
    dot(xS(LOOPEX080), py, 10, 'm', eq); lbl('0.293', xS(LOOPEX080), py + 26, C.mag, eq, 16);
    lbl('SDP : exact limit 1 − 1/√2 ≈ 0.293', px + pw - 10, yS(1.45), C.mag, eq, 15, 'right');
    lbl('the bound is necessary , not sharp', px + pw - 10, yS(1.45) + 25, C.dim, eq, 15, 'right');
  }
};

/* ---- 03 BALANCED CHANNEL (§18) ---- */
SCENES.bath = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So there is no single equilibrium', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now a balanced channel on five modes', 0.6) * f1;
    const EX = [200, 340, 480, 620, 760], EY = 650, CX = { u: 280, v: 480, z: 690 }, CY = 450;
    EX.forEach((x, i) => { dot(x, EY, 13, 'c', q); lblG('e' + '₀₁₂₃₄'[i], x, EY + 42, C.white, q, 20); });
    const kq = Q(S, 0, 'Two Kraus operators push every input', 0.6) * f1;
    [['u', CX.u], ['v', CX.v], ['z', CX.z]].forEach(([n, x]) => { ring(x, CY, 30, C.gold, q, 2.5); lblG(n, x, CY + 8, C.gold, q, 24); });
    lbl('code B = (u, v, z)', 480, CY - 52, C.gold, q, 18);
    const K0 = [[0, 'u'], [2, 'v'], [4, 'z']], K1 = [[1, 'u'], [2, 'v'], [3, 'z']];
    K0.forEach(([i, n]) => arrow(EX[i] - 6, EY - 18, CX[n] - 8, CY + 34, C.cyan, kq, 2.4));
    K1.forEach(([i, n]) => arrow(EX[i] + 6, EY - 18, CX[n] + 8, CY + 34, C.mag, kq, 2.4));
    chip(480, 260, 720, 50, 'K₀ = |u⟩⟨e₀| + |v⟩⟨e₂|/√2 + |z⟩⟨e₄|', C.cyan, kq, 20);
    chip(480, 322, 720, 50, 'K₁ = |u⟩⟨e₁| + |v⟩⟨e₂|/√2 + |z⟩⟨e₃|', C.mag, kq, 20);
    lbl('u = (e₀ + e₃)/√2 ,  v = (e₁ + e₄)/√2 ,  z = e₂ ;  K₀†K₀ + K₁†K₁ = I', 480, 735, C.dim, kq, 15);
    lbl('on the code :  T(X) = ½ (U X U† + UW X W†U†) ,  U , W permutations', 480, 770, C.white, kq, 16);
    const eq = Q(S, 0, 'with eigenvalues one twice', 0.6) * f1;
    const nx0 = 1100, nx1 = 1740, ny = 440, xS = v => nx0 + (v + 0.75) / 2 * (nx1 - nx0);
    line(nx0, ny, nx1, ny, C.dim, eq, 1.5);
    [-0.5, 0, 0.5, 1].forEach(v => { line(xS(v), ny - 6, xS(v), ny + 6, C.dim, eq, 1.5); lbl(String(v), xS(v), ny + 32, C.dim, eq, 16); });
    const cnt = {};
    SPECT080.forEach((v, i) => { const k = Math.round(v * 2) / 2; cnt[k] = (cnt[k] || 0) + 1; const qq = clamp(eq * 2 - i / 12), col = k === 1 ? 'g' : k === 0 ? 'n' : 'm'; dot(xS(k), ny - 26 - (cnt[k] - 1) * 34, 12, col, qq); });
    lbl('[3]', xS(-0.5), ny - 118, C.mag, eq, 18); lbl('[4]', xS(0), ny - 152, C.dim, eq, 18); lbl('[2]', xS(1), ny - 84, C.gold, eq, 18);
    lbl('spectrum of T on M₃ (computed)', 1420, 255, C.white, eq, 17);
    const cq = Q(S, 0, 'the characteristic polynomial', 0.6) * f1;
    chip(1420, 545, 700, 58, 'χ_G(t) = t²⁰ (t − 1)² (t + 1/2)³', C.gold, cq, 26);
    for (let k = 0; k < 25; k++) { const x = 1210 + (k % 13) * 32, y = 600 + Math.floor(k / 13) * 34, col = k < 20 ? C.dim : k < 22 ? C.gold : C.mag, qq = clamp(cq * 1.8 - k / 30); fillBox(x, y, 26, 26, col, qq * 0.45); rect63(x, y, 26, 26, col, qq, 1.2); }
    lbl('25 = 20 + 2 + 3 on all of M₅ (exact , sympy)', 1420, 700, C.dim, cq, 15);
    lbl('G² (G − I)(G + I/2) = 0 :  a second-order zero transient remains', 1420, 735, C.white, cq, 16);
  }
  const q1 = Q(S, 1, 'So there is no single equilibrium', 0.6, 0.3);
  if (q1 > 0) {
    const sq = Q(S, 1, 'a segment, tau p', 0.6);
    const p = 0.5 + 0.5 * Math.sin(t * 0.9), X0 = 220, X1 = 860, Y = 340;
    line(X0, Y, X1, Y, C.gold, sq, 4); dot(X0, Y, 13, 'c', sq); dot(X1, Y, 13, 'm', sq);
    lblG('τ̂₀', X0, Y + 44, C.cyan, sq, 22); lblG('τ̂₁', X1, Y + 44, C.mag, sq, 22);
    dot(lerp(X0, X1, p), Y, 15, 'g', sq); ring(lerp(X0, X1, p), Y, 24, C.gold, sq * 0.6, 2);
    lblG('p = ' + p.toFixed(2), lerp(X0, X1, p), Y - 30, C.gold, sq, 18);
    lblG('τ_p = pP + (1 − p) Q/2 ,  P = |ξ⟩⟨ξ| ,  ξ = (1,1,1)/√3', 540, 260, C.white, sq, 19);
    const nq = Q(S, 1, 'yet the whole segment shows the same five populations', 0.6);
    lbl('five populations of τ̂_p at the moving p', 540, 430, C.white, nq, 17);
    bars63(300, 640, BPOP080, 70, 30, 480, nq, C.gold, ['1/6', '1/6', '1/3', '1/6', '1/6']);
    LBL080.forEach((s, i) => lbl('e' + '₀₁₂₃₄'[i], 335 + i * 100, 700, C.dim, nq, 15));
    stamp('SAME POPULATIONS FOR EVERY p', 540, 755, nq, C.red, 24, -0.03);
    lbl('yet ‖τ̂₁ − τ̂₀‖₁ = 2 :  the effect |χ⟩⟨χ| separates the endpoints', 540, 808, C.dim, nq, 15);
    const cq = Q(S, 1, 'Every input converges', 0.6);
    chip(1400, 255, 760, 56, 'Gⁿ(ρ) → τ̂_Tr(Jρ) ,   J = |χ⟩⟨χ| + (2/3)|d⟩⟨d|', C.cyan, cq, 21);
    const dq = Q(S, 1, 'with diamond error at most', 0.6);
    const px = 1080, py = 760, pw = 660, ph = 400, lo = -2.5, hi = 0.5, xS = n => px + (n - 2) / 8 * pw, yS = v => py - (Math.log10(v) - lo) / (hi - lo) * ph;
    plotAxes(px, py, pw, ph, dq, '', '‖Gⁿ − E_G‖◇  (log)');
    lbl('n', px + pw + 24, py + 6, C.dim, dq, 18);
    [1, 0.1, 0.01].forEach(v => { lbl(String(v), px - 10, yS(v) + 6, C.dim, dq, 14, 'right'); dashed(px, yS(v), px + pw, yS(v), C.dim, dq * 0.3, 1); });
    curve(p_ => { const n = 2 + p_ * 8; return [xS(n), yS(4 / 3 * Math.pow(2, 2 - n))]; }, 60, C.gold, dq, 3);
    BDIA080.forEach(r => { dot(xS(r[0]), yS(r[1]), 8, 'c', dq); lbl(String(r[0]), xS(r[0]), py + 26, C.dim, dq, 14); });
    lbl('bound (4/3)·2^(2−n)', xS(6.5), yS(0.2), C.gold, dq, 16, 'left');
    lbl('dots : SDP diamond norm , equal to the bound (1.3333 at n = 2)', px + pw, py - ph + 10, C.cyan, dq, 14, 'right');
  }
};

/* ---- 04 RECORD TREE (§19) ---- */
SCENES.tree = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Add a return channel', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The native record gives each label probability one half', 0.6) * f1;
    chip(520, 255, 760, 56, 'A_j τ̂_p A_j† = ½ τ̂_p   for every θ and every p', C.cyan, q, 21);
    lbl('A₀ = cos θ K₀ + i sin θ K₁ ,  A₁ = i sin θ K₀ + cos θ K₁', 520, 315, C.dim, q, 15);
    rtree080(180, 350, 640, 360, 4, (k, i) => Math.pow(2, -k), q, { prog: Q(S, 0, 'for every angle and every code input', 1.6) });
    const nq = Q(S, 0, 'so it says nothing', 0.6) * f1;
    lbl('every word of length n : 2⁻ⁿ', 880, 540, C.white, nq, 18, 'left');
    lbl('any code input , any reference', 880, 570, C.dim, nq, 15, 'left');
    stamp('NO INFORMATION', 520, 770, nq, C.red, 26, -0.03);
    const lq = Q(S, 0, 'A supplied environment readout', 0.6) * f1;
    chip(1420, 255, 640, 56, 'L± = (K₀ ± K₁)/√2 ,  L± B = B U P±', C.mag, lq, 21);
    const R = [1180, 480], Pp = [1500, 360], Pm = [1500, 600];
    dot(R[0], R[1], 16, 'g', lq); lblG('τ̂_p', R[0] - 30, R[1] + 8, C.gold, lq, 22, 'right');
    arrow(R[0] + 20, R[1] - 10, Pp[0] - 24, Pp[1] + 8, C.cyan, lq, 3); arrow(R[0] + 20, R[1] + 10, Pm[0] - 24, Pm[1] - 8, C.mag, lq, 3);
    lblG('q₊ = (1 + p)/2', 1300, 390, C.cyan, lq, 19, 'right'); lblG('q₋ = (1 − p)/2', 1300, 590, C.mag, lq, 19, 'right');
    dot(Pp[0], Pp[1], 13, 'c', lq); dot(Pm[0], Pm[1], 13, 'm', lq);
    const bq = Q(S, 0, 'broken in each branch', 0.6) * f1;
    lblG('σ₊ not fixed  →  τ̂_2p/(1+p)', Pp[0] + 26, Pp[1] + 8, C.cyan, bq, 19, 'left');
    lblG('σ₋ not fixed  →  τ̂₀', Pm[0] + 26, Pm[1] + 8, C.mag, bq, 19, 'left');
    const aq = Q(S, 0, 'balanced on average', 0.6) * f1;
    box(1090, 660, 680, 110, C.gold, aq, 2, 'rgba(40,30,0,0.35)');
    lbl('p = 1/3 :  branches 2/3 , 1/3  ;  return weights 1/2 , 0', 1430, 700, C.gold, aq, 18);
    lbl('average  (2/3)(1/2) + (1/3)(0) = 1/3 = p', 1430, 745, C.white, aq, 18);
  }
  const q1 = Q(S, 1, 'Add a return channel', 0.6, 0.3);
  if (q1 > 0) {
    const p = 1 / 3;
    chip(520, 255, 760, 56, 'J± = E_G ∘ Ad L± ,   J₊ + J₋ = E_G', C.gold, q1, 22);
    rtree080(180, 320, 640, 400, 5, (k, i) => i === 0 ? p + (1 - p) * Math.pow(2, -k) : (1 - p) * Math.pow(2, -k), q1, { hl: 1, prog: Q(S, 1, 'the records form an exact unbounded tree', 1.6) });
    lbl('p = 1/3 ;  gold : the all-plus branch ;  dot area ∝ probability', 500, 760, C.dim, q1, 15);
    const wq = Q(S, 1, 'All-plus words have probability', 0.6);
    const px = 1080, py = 640, pw = 660, ph = 320, xS = n => px + n / 12 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, wq, 'n', '');
    [0, 0.5, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, wq, 14, 'right'));
    dashed(px, yS(1 / 3), px + pw, yS(1 / 3), C.gold, wq * 0.7, 1.5); lbl('p = 1/3', px + pw, yS(1 / 3) + 22, C.gold, wq, 15, 'right');
    curve(p_ => { const n = p_ * 12; return [xS(n), yS(interp080(TREE080.map(r => [r[0], r[1]]), n))]; }, 60, C.gold, wq, 3);
    TREE080.forEach(r => { dot(xS(r[0]), yS(r[1]), 6, 'g', wq); });
    lblG('Pr(+ⁿ) = p + (1 − p) 2⁻ⁿ', xS(3), yS(0.62), C.gold, wq, 18, 'left');
    const posq = Q(S, 1, 'plus one minus p times two to the minus n', 0.6);
    curve(p_ => { const n = p_ * 12; return [xS(n), yS(interp080(TREE080.map(r => [r[0], r[2]]), n))]; }, 60, C.cyan, posq, 3);
    TREE080.forEach(r => dot(xS(r[0]), yS(r[2]), 6, 'c', posq));
    lblG('protected weight after +ⁿ : 2ⁿp/(1 − p + 2ⁿp) → 1', xS(12), yS(1) - 16, C.cyan, posq, 15, 'right');
    lbl('a word with a minus : (1 − p) 2⁻ⁿ , protected weight 0', 1410, py + 50, C.mag, posq, 15);
    const lq = Q(S, 1, 'the infinite law is p on the all-plus ray', 0.6);
    chip(1410, 760, 700, 56, 'law = p δ(+∞) + (1 − p) Bernoulli(1/2)^ℕ', C.green, lq, 21);
  }
};

/* ---- 05 RESET (§21) ---- */
SCENES.reset = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Every finite depth stays close', 0.6);
  const q0 = Q(S, 0, 'Mix in a reset to tau zero', 0.6);
  if (f1 > 0) {
    chip(530, 260, 860, 58, 'G_ε = (1 − ε) G + ε R₀ ,   R₀(X) = Tr(X) τ̂₀', C.white, q0 * f1, 22);
    const nq = Q(S, 0, 'Then n steps are exactly', 0.6) * f1;
    chip(530, 350, 860, 58, 'G_εⁿ = (1 − ε)ⁿ Gⁿ + [1 − (1 − ε)ⁿ] R₀', C.gold, nq, 23);
    lbl('because G R₀ = R₀ G = R₀² = R₀', 530, 405, C.dim, nq, 15);
    const n = Math.floor(clamp((u - lineAt(S, 0).s - 4) / 9) * 60), w = Math.pow(0.95, n), bx = 150, by = 450, bw = 760;
    fillBox(bx, by, bw * w, 46, C.cyan, nq * 0.5); fillBox(bx + bw * w, by, bw * (1 - w), 46, C.red, nq * 0.5); rect63(bx, by, bw, 46, C.dim, nq, 1.5);
    lblG('ε = 0.05 ,  n = ' + n + ' :  (1 − ε)ⁿ = ' + w.toFixed(3), 530, by + 80, C.white, nq, 17);
    lbl('weight on G', bx, by - 10, C.cyan, nq, 14, 'left'); lbl('weight on the reset', bx + bw, by - 10, C.red, nq, 14, 'right');
    const dq = Q(S, 0, 'the diamond distance to the unperturbed channel', 0.6) * f1;
    chip(530, 640, 860, 58, '‖G_εⁿ − Gⁿ‖◇ = 2[1 − (1 − ε)ⁿ] ≤ 2nε', C.mag, dq, 23);
    lbl('equality at the input τ̂₁ : the outputs τ̂₁ , τ̂₀ have orthogonal supports', 530, 700, C.dim, dq, 15);
    lbl('SDP : 0.5420 at (ε, n) = (0.1, 3) ,  0.1922 at (0.02, 5)', 530, 735, C.cyan, dq, 15);
  }
  const pq = Q(S, 0, 'one minus epsilon to the n times the channel', 0.8);
  if (pq > 0) {
    const px = 1080, py = 760, pw = 660, ph = 420, xS = n => px + n / 300 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, pq, 'depth n', 'TV( G_εⁿ τ̂₁ , τ̂₁ )');
    [0, 0.5, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, pq, 14, 'right'));
    [100, 200].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, pq, 14));
    [['0.2', C.red], ['0.05', C.gold], ['0.01', C.cyan]].forEach(([k, col], j) => { const arr = RESET080[k]; curve(p_ => { const i = p_ * (arr.length - 1), i0 = Math.floor(i), f = i - i0, v = arr[i0] * (1 - f) + (arr[Math.min(i0 + 1, arr.length - 1)] || 0) * f; return [xS(i * 5), yS(v)]; }, 120, col, pq, 3); line(xS(170), yS(0.42 - j * 0.07), xS(200), yS(0.42 - j * 0.07), col, pq, 3); lblG('ε = ' + k, xS(208), yS(0.42 - j * 0.07) + 6, col, pq, 16, 'left'); });
    line(px, yS(0) - 2, px + pw, yS(0) - 2, C.green, pq, 3); line(xS(170), yS(0.21), xS(200), yS(0.21), C.green, pq, 3); lblG('ε = 0 : stays at τ̂₁', xS(208), yS(0.21) + 6, C.green, pq, 16, 'left');
    lbl('computed : 1 − (1 − ε)ⁿ exactly', xS(170), yS(0.5), C.dim, pq, 14, 'left');
  }
  const q1 = Q(S, 1, 'Every finite depth stays close', 0.6, 0.3);
  if (q1 > 0) {
    const lq = Q(S, 1, 'but the limits do not commute', 0.6);
    box(150, 250, 760, 130, C.red, lq, 2, 'rgba(40,0,0,0.35)');
    lbl('depth first', 530, 290, C.red, lq, 19); lblG('lim_ε↓0 lim_n→∞ G_εⁿ(τ̂₁) = τ̂₀', 530, 345, C.white, lq, 26);
    const eq = Q(S, 1, 'epsilon first keeps tau one', 0.6);
    box(150, 410, 760, 130, C.cyan, eq, 2, 'rgba(0,30,40,0.35)');
    lbl('epsilon first', 530, 450, C.cyan, eq, 19); lblG('lim_n→∞ lim_ε↓0 G_εⁿ(τ̂₁) = τ̂₁', 530, 505, C.white, eq, 26);
    stamp('LIMITS DO NOT COMMUTE', 530, 610, eq, C.red, 30, -0.04);
    const gq = Q(S, 1, 'Their difference has eigenvalue one minus epsilon', 0.6);
    chip(530, 700, 860, 56, 'D* = τ̂₁ − τ̂₀ :  eigenvalue 1 under G ,  1 − ε under G_ε', C.gold, gq, 21);
    lbl('fixed density for every ε > 0 : only τ̂₀  ·  no uniform spectral gap as ε ↓ 0', 530, 760, C.dim, Q(S, 1, 'so there is no uniform gap', 0.6), 15);
  }
};

/* ---- 06 ANSWER TABLES (§22, §25) ---- */
SCENES.square = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'Answer tables fail', 'classical']]);
  const f1 = 1 - Q(S, 1, 'Answer tables fail', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two states with the same eigenvalues', 0.6) * f1;
    qubit(300, 420, 110, 0, 0, q, C.cyan); qubit(700, 420, 110, Math.PI / 2, 0, q, C.mag);
    lblG('ρ₀ = |0⟩⟨0|', 300, 280, C.cyan, q, 20); lblG('ρ₊ = |+⟩⟨+|', 700, 280, C.mag, q, 20);
    lbl('eigenvalues', 500, 600, C.dim, q, 16);
    bars63(240, 690, [1, 0], 50, 20, 70, q, C.cyan, ['1', '0']); bars63(640, 690, [1, 0], 50, 20, 70, q, C.mag, ['1', '0']);
    const pq = Q(S, 0, 'give one effect probability one and one half', 0.6) * f1;
    lblG('Tr(ρ |0⟩⟨0|)', 500, 760, C.white, pq, 18);
    lblG('= 1', 300, 760, C.cyan, pq, 22); lblG('= 1/2', 700, 760, C.mag, pq, 22);
    const tq = Q(S, 0, 'transposing everything keeps each commuting slice', 0.6) * f1;
    box(1040, 250, 740, 230, C.gold, tq, 2, 'rgba(40,30,0,0.3)');
    lblG('ρ → ρᵀ ,  A → Aᵀ :  every commuting slice and every Tr(ρA) kept', 1410, 290, C.gold, tq, 18);
    lblG('XY = iZ        (XY)ᵀ = iZ        XᵀYᵀ = −iZ', 1410, 350, C.white, tq, 22);
    lbl('(AB)ᵀ = BᵀAᵀ : the order of composition flips', 1410, 400, C.dim, tq, 15);
    const iq = Q(S, 0, 'turns the word moment X Y from i into minus i', 0.6) * f1;
    cell080(1090, 520, 300, 90, 'Tr(ρ₀ XY) = i', C.cyan, iq, 24);
    cell080(1430, 520, 300, 90, 'Tr(ρ₀ᵀ XᵀYᵀ) = −i', C.mag, iq, 24);
    lblG('and on a Bell pair : (id ⊗ T)|Ω⟩⟨Ω| = Swap/2 , eigenvalue −1/2', 1410, 670, C.dim, iq, 16);
    lbl('commuting slices do not fix the direction of composition', 1410, 710, C.white, iq, 17);
  }
  const q1 = Q(S, 1, 'Answer tables fail', 0.6, 0.3);
  if (q1 > 0) {
    const mq = Q(S, 1, 'In the Mermin–Peres square', 0.6);
    const G = [['X⊗I', 'I⊗X', 'X⊗X'], ['I⊗Y', 'Y⊗I', 'Y⊗Y'], ['X⊗Y', 'Y⊗X', 'Z⊗Z']];
    const gx = 200, gy = 280, cw = 170, ch = 110;
    G.forEach((row, i) => row.forEach((s, j) => { const qq = clamp(mq * 2 - (i * 3 + j) / 12); cell080(gx + j * cw, gy + i * ch, cw - 14, ch - 14, s, C.cyan, qq, 24, 0.2); }));
    const rq = Q(S, 1, 'every row and the first two columns multiply to the identity', 0.6);
    for (let i = 0; i < 3; i++) lbl('→  I', gx + 3 * cw + 10, gy + i * ch + 58, C.green, rq, 22, 'left');
    lbl('↓ I', gx + 0 * cw + 78, gy + 3 * ch + 26, C.green, rq, 22); lbl('↓ I', gx + 1 * cw + 78, gy + 3 * ch + 26, C.green, rq, 22);
    const lq = Q(S, 1, 'the last column to minus the identity', 0.6);
    lbl('↓ −I', gx + 2 * cw + 78, gy + 3 * ch + 26, C.red, lq, 22);
    rect63(gx + 2 * cw - 6, gy - 6, cw - 2, 3 * ch - 2, C.red, lq, 3);
    const nq = Q(S, 1, 'so no context-free table of signs exists', 0.6);
    lbl('a ±1 table : each cell counted twice ⇒ +1 = −1', 460, 690, C.white, nq, 17);
    lbl('recomputed : none of the 512 sign tables meets all six products', 460, 725, C.dim, nq, 15);
    stamp('NO ±1 ANSWER TABLE', 460, 790, nq, C.red, 28, -0.04);
    const cq = Q(S, 1, 'for CHSH', 0.6);
    lblG('CHSH  a₀(b₀ + b₁) + a₁(b₀ − b₁)', 1410, 270, C.white, cq, 21);
    const vals = [[2, 'answer tables', C.gold, 'tables reach two'], [2 * Math.SQRT2, 'quantum 2√2', C.cyan, 'quantum two root two'], [4, 'PR box', C.mag, 'quantum two root two']];
    vals.forEach(([v, s, col, ph], i) => { const qq = Q(S, 1, ph, 0.6, i === 2 ? 0.8 : 0), x = 1130 + i * 210, h = v * 80; fillBox(x, 700 - h, 120, h, col, qq * 0.45); rect63(x, 700 - h, 120, h, col, qq, 2); lblG(v === 2 ? '2' : v === 4 ? '4' : '2.828', x + 60, 700 - h - 14, col, qq, 22); lblG(s, x + 60, 734, col, qq, 17); });
    lbl('PR box : uniform marginals , no signalling , not quantum', 1410, 775, C.dim, Q(S, 1, 'quantum two root two', 0.6, 0.8), 15);
  }
};

/* ---- 07 STABLE CONCEPTS (§28–§29) ---- */
SCENES.concept = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'J is not a projection', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The fixed effects are exactly combinations', 0.6) * f1;
    chip(530, 260, 860, 58, 'Fix(G†) = span{ I , J } ,   J = |χ⟩⟨χ| + (2/3)|d⟩⟨d|', C.gold, q, 22);
    lbl('χ = B ξ in the code ,  d = (e₀ − e₁ − e₃ + e₄)/2 outside it', 530, 315, C.dim, q, 15);
    const eq = Q(S, 0, 'with eigenvalues one, two thirds and zero', 0.6) * f1;
    lbl('eigenvalues of J (computed)', 530, 400, C.white, eq, 17);
    bars63(300, 700, EVJ080, 70, 30, 240, eq, C.gold, ['1', '2/3', '0', '0', '0']);
    ['χ', 'd', '', 'rest', ''].forEach((s, i) => lblG(s, 335 + i * 100, 760, C.dim, eq, 16));
    const rq = Q(S, 0, 'so every stable readout is two numbers', 0.6) * f1;
    box(1040, 250, 740, 120, C.cyan, rq, 2, 'rgba(0,30,40,0.35)');
    lblG('A = aI + bJ  reads  a + b·p_ρ ,   p_ρ = Tr(Jρ)', 1410, 300, C.white, rq, 22);
    lbl('the protected weight p_ρ is all a stable effect sees', 1410, 345, C.dim, rq, 15);
    const px = 1180, py = 800, s = 280;
    plotAxes(px, py, s + 80, s + 60, rq, 'a', 'a + b');
    fillBox(px, py - s, s, s, C.cyan, rq * 0.25); rect63(px, py - s, s, s, C.cyan, rq, 2);
    lbl('0', px - 10, py + 22, C.dim, rq, 14, 'right'); lbl('1', px + s, py + 26, C.dim, rq, 14); lbl('1', px - 10, py - s + 6, C.dim, rq, 14, 'right');
    lblG('0 ≤ aI + bJ ≤ I  ⇔  0 ≤ a , a + b ≤ 1', 1500, 560, C.white, rq, 17, 'left');
    lbl('also for every matrix amplification', 1500, 590, C.dim, rq, 14, 'left');
  }
  const q1 = Q(S, 1, 'J is not a projection', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 60, 'J² − J = −(2/9) |d⟩⟨d|  ≠ 0', C.red, q1, 26);
    stamp('NOT A PROJECTION', 530, 360, q1, C.red, 28, -0.04);
    const mq = Q(S, 1, 'The return rule multiplies instead', 0.6);
    lblG('A ∘ C = E_G†(AC)', 530, 450, C.gold, mq, 24);
    lblG('(aI + bJ) ∘ (cI + eJ) = acI + (ae + bc + be) J', 530, 505, C.white, mq, 22);
    const cq = Q(S, 1, 'coordinate by coordinate on the pair a, a plus b', 0.6);
    lblG('aI + bJ ↦ (a , a + b) :  products multiply coordinatewise', 530, 570, C.cyan, cq, 20);
    cell080(250, 610, 260, 80, '(a , a + b)', C.cyan, cq, 22); lbl('·', 530, 660, C.white, cq, 30); cell080(550, 610, 260, 80, '(c , c + e)', C.cyan, cq, 22);
    lblG('J ∘ J = J :  a two-point algebra ℂ²', 530, 740, C.green, cq, 19);
    const oq = Q(S, 1, 'an input outside the code still feeds weight two thirds', 0.6);
    box(1060, 250, 300, 300, C.gold, oq, 2, 'rgba(40,30,0,0.3)'); lbl('three-dimensional code', 1210, 285, C.gold, oq, 16);
    dot(1210, 400, 14, 'g', oq); lblG('χ', 1210, 445, C.gold, oq, 20);
    dot(1580, 400, 14, 'm', oq); lblG('d ⊥ code', 1580, 445, C.mag, oq, 20);
    arrow(1560, 400, 1240, 400, C.mag, oq, 3);
    lblG('Tr(J dd†) = 2/3', 1480, 365, C.white, oq, 20);
    chip(1410, 620, 700, 56, 'E_G(|d⟩⟨d|) = τ̂_2/3', C.mag, oq, 24);
    lbl('compressing to the code first would drop this feed', 1410, 680, C.dim, oq, 15);
    lbl('no faithful invariant density : the ordinary fixed algebra rule does not apply', 1410, 715, C.dim, oq, 15);
  }
};

/* ---- 08 SIGN WORLDS (§30) ---- */
SCENES.sign = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'An effect with an imaginary cross term', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two candidate worlds differ only by a sign', 0.6) * f1;
    chip(530, 260, 860, 58, 'T±(X) = B P₊XP₊B† + (f†Xf) w± w±† ,   S± = G T±', C.white, q, 21);
    box(170, 330, 340, 150, C.cyan, q, 2, 'rgba(0,30,40,0.35)'); lbl('world S₊', 340, 370, C.cyan, q, 20); lblG('w₊ = α c + i t p₀', 340, 430, C.white, q, 22);
    box(550, 330, 340, 150, C.mag, q, 2, 'rgba(40,0,40,0.35)'); lbl('world S₋', 720, 370, C.mag, q, 20); lblG('w₋ = α c − i t p₀', 720, 430, C.white, q, 22);
    lblG('α = √(1 − t²) ,  0 < t < 1', 530, 515, C.dim, q, 16);
    const rq = Q(S, 0, 'On every real effect, at every depth', 0.6) * f1;
    chip(530, 580, 860, 56, 'T₊†(F) = T₋†(F)  for every real symmetric F ;  J_s real for all s', C.gold, rq, 19);
    stamp('SAME ON EVERY REAL EFFECT', 530, 690, rq, C.green, 26, -0.03);
  }
  const pq = Q(S, 0, 'yet their diamond distance is four t root one minus t squared', 0.6);
  if (f1 > 0 && pq > 0) {
    const a = pq * f1, px = 1080, py = 760, pw = 660, ph = 400, xS = x => px + x * pw, yS = v => py - v / 2.2 * ph;
    plotAxes(px, py, pw, ph, a, 't', 'diamond distance');
    [0, 1, 2].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, a, 14, 'right'));
    curve(p_ => [xS(p_), yS(interp080(SIGNC080.map(r => [r[0], r[1]]), p_))], 100, C.gold, a, 3);
    SIGNS080.forEach(r => dot(xS(r[0]), yS(r[1]), 9, 'm', a));
    lblG('‖S₊ − S₋‖◇ = 4t√(1 − t²)', xS(0.5), yS(2) - 16, C.gold, a, 18);
    lbl('magenta : SDP at t = 0.25 , 0.5 , 0.707 , 0.9', px + pw - 70, py - 28, C.mag, a, 14, 'right');
    const hq = Q(S, 0, 'any common reconstruction errs by at least half of that', 0.6) * f1;
    curve(p_ => [xS(p_), yS(interp080(SIGNC080.map(r => [r[0], r[2]]), p_))], 100, C.cyan, hq, 3);
    lblG('best common reconstruction : 2t√(1 − t²)', xS(0.64), yS(0.42), C.cyan, hq, 16);
  }
  const q1 = Q(S, 1, 'An effect with an imaginary cross term', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 58, 'E_y = B h h† B† ,   h = (g + i a)/√2', C.gold, q1, 24);
    lbl('legal effect :  B h is a unit vector', 530, 315, C.dim, q1, 15);
    const pq1 = Q(S, 1, 'one and zero at t equal one over root two', 0.6);
    lblG('at t = 1/√2 :', 530, 400, C.white, pq1, 20);
    bars63(330, 680, [1, 0], 120, 160, 220, pq1, C.cyan, ['', '']);
    rect63(610, 674, 120, 6, C.mag, pq1, 2);
    lblG('S₊ : 1', 390, 720, C.cyan, pq1, 20); lblG('S₋ : 0', 670, 720, C.mag, pq1, 20);
    const oq = Q(S, 1, 'It lies outside the original real menu', 0.6);
    lbl('imaginary cross terms : not in the original real menu', 530, 770, C.red, oq, 17);
    const cq = Q(S, 1, 'with probabilities one half plus or minus', 0.6);
    const px = 1080, py = 760, pw = 660, ph = 420, xS = x => px + x * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, cq, 't', 'Tr[ E_y S±(ff†) ]');
    [0, 0.5, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, cq, 14, 'right'));
    curve(p_ => [xS(p_), yS(0.5 + interp080(SIGNC080.map(r => [r[0], r[2]]), p_) / 2)], 100, C.cyan, cq, 3);
    curve(p_ => [xS(p_), yS(0.5 - interp080(SIGNC080.map(r => [r[0], r[2]]), p_) / 2)], 100, C.mag, cq, 3);
    lblG('½ + t√(1 − t²)', xS(0.18), yS(0.85), C.cyan, cq, 17); lblG('½ − t√(1 − t²)', xS(0.18), yS(0.13), C.mag, cq, 17);
    dashed(xS(Math.SQRT1_2), py, xS(Math.SQRT1_2), yS(1), C.gold, pq1, 1.5); dot(xS(Math.SQRT1_2), yS(1), 9, 'c', pq1); dot(xS(Math.SQRT1_2), yS(0), 9, 'm', pq1);
    lblG('1/√2', xS(Math.SQRT1_2), py + 26, C.gold, pq1, 15);
  }
};

/* ---- 09 RESPONSE RANK (§32) ---- */
SCENES.rank = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On the three-level code', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Responses also bound dimension', 0.6) * f1;
    lblG('H_ij = Tr(F_i ρ_j)', 530, 270, C.white, q, 24);
    const rq = Q(S, 0, 'give a response matrix of rank at most d squared', 0.6) * f1;
    fillBox(170, 320, 220, 220, C.gold, rq * 0.25); rect63(170, 320, 220, 220, C.gold, rq, 2); lbl('H  (m × n)', 280, 440, C.white, rq, 18);
    lbl('=', 430, 440, C.white, rq, 30);
    fillBox(470, 320, 80, 220, C.cyan, rq * 0.25); rect63(470, 320, 80, 220, C.cyan, rq, 2); lbl('A', 510, 440, C.white, rq, 20);
    lbl('·', 575, 440, C.white, rq, 30);
    fillBox(600, 390, 220, 80, C.mag, rq * 0.25); rect63(600, 390, 220, 80, C.mag, rq, 2); lbl('B', 710, 440, C.white, rq, 20);
    lbl('inner size d² (Hilbert–Schmidt basis)', 645, 580, C.dim, rq, 15);
    chip(530, 640, 860, 56, 'rank H ≤ d²', C.gold, rq, 26);
    const sq = Q(S, 0, 'a k-th singular value above epsilon root m n', 0.6) * f1;
    chip(530, 730, 860, 56, '|H_obs − H|_ij ≤ ε ,  σ_k(H_obs) > ε√(mn)  ⇒  d ≥ ⌈√k⌉', C.cyan, sq, 21);
    [[2, 1180, C.mag], [3, 1500, C.cyan]].forEach(([d, x, col]) => { const qq = Q(S, 0, d === 2 ? 'rank at most d squared' : 'forces d at least root k', 0.6) * f1; for (let k = 0; k < d * d; k++) { const xx = x + (k % d) * 64, yy = 330 + Math.floor(k / d) * 64; fillBox(xx, yy, 56, 56, col, qq * 0.4); rect63(xx, yy, 56, 56, col, qq, 1.5); } lbl('d = ' + d + ' :  rank ≤ ' + d * d, x + d * 32, 560, col, qq, 20); });
    lbl('strict inequality matters : equality cannot exclude a true zero singular value', 1440, 640, C.dim, sq, 15);
  }
  const q1 = Q(S, 1, 'On the three-level code', 0.6, 0.3);
  if (q1 > 0) {
    const hq = Q(S, 1, 'nine supplied states and nine effects', 0.6);
    const gx = 210, gy = 300, cw = 54;
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) { const v = RANKH080[i][j], col = v > 0.9 ? C.gold : v > 0.53 ? C.cyan : C.vio, qq = clamp(hq * 2 - (i * 9 + j) / 100); fillBox(gx + j * cw, gy + i * cw, cw - 4, cw - 4, col, qq * (v > 0.9 ? 0.6 : v > 0.53 ? 0.45 : 0.25)); lbl(v > 0.9 ? '1' : v > 0.53 ? '9/16' : '1/2', gx + j * cw + 25, gy + i * cw + 32, C.white, qq, 12); }
    lbl('ρ_j = I/3 + H_j/8   ·   F_i = I/2 + H_i/4   (i, j = 1 … 8 ;  ρ₀ = I/3 , F₀ = I)', 450, 810, C.dim, hq, 14);
    lbl('9 × 9 response on the three-level code', 450, 280, C.white, hq, 17);
    const dq = Q(S, 1, 'determinant one sixteenth to the eighth', 0.6);
    chip(1410, 260, 700, 56, 'det H = (1/16)⁸ ≈ 2.33 × 10⁻¹⁰', C.gold, dq, 22);
    const sq = Q(S, 1, 'smallest singular value at least gamma', 0.6);
    const px = 1100, py = 740, pw = 480, ph = 400, lo = -3.5, hi = 1, yS = v => py - (Math.log10(v) - lo) / (hi - lo) * ph;
    lbl('γ = β/((1+√2)(1+2√2)) ≈ 0.0068 ,  β = 1/16', 1470, 305, C.green, sq, 15);
    plotAxes(px, py, pw, ph, sq, '', 'σ_k(H)  (log)');
    lbl('k = 1 … 9', px + pw / 2, py + 28, C.dim, sq, 15);
    [10, 1, 0.1, 0.01, 0.001].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, sq, 13, 'right'));
    RANKSV080.forEach((v, k) => { const x = px + 20 + k * 50, qq = clamp(sq * 2 - k / 12); fillBox(x, yS(v), 32, py - yS(v), k === 8 ? C.gold : C.cyan, qq * 0.45); rect63(x, yS(v), 32, py - yS(v), k === 8 ? C.gold : C.cyan, qq, 1.5); });
    dashed(px, yS(RANKG080), px + pw, yS(RANKG080), C.green, sq, 2); lblG('γ ≈ 0.0068', px + pw + 12, yS(RANKG080) + 14, C.green, sq, 15, 'left');
    lblG('σ₉ = 0.0119', px + pw + 12, yS(RANKSV080[8]) - 6, C.gold, sq, 15, 'left');
    const eq = Q(S, 1, 'entry errors below gamma over eighteen', 0.6);
    dashed(px, yS(RANKG080 / 2), px + pw, yS(RANKG080 / 2), C.red, eq, 2); lblG('9ε at ε = γ/18', px + pw + 12, yS(RANKG080 / 2) + 20, C.red, eq, 15, 'left');
    const nq = Q(S, 1, 'rule out every two-level model', 0.6);
    stamp('d ≥ 3 : NO TWO-LEVEL MODEL', 1410, 805, nq, C.red, 22, -0.03);
  }
};

/* ---- 10 NATIVE READOUT (§35) ---- */
SCENES.native = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Yet the sign worlds are still told apart', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Can the native menu of waits, full reads and stop', 0.6) * f1;
    [['wait V(s) = e^(−isK)', C.cyan], ['full read P_j', C.gold], ['Stop', C.mag], ['record feedback', C.green]].forEach(([s, col], i) => chip(320 + (i % 2) * 420, 280 + Math.floor(i / 2) * 80, 380, 56, s, col, q, 20));
    lbl('plus input-free classical randomness ; no ancilla , reference or phase control', 530, 450, C.dim, q, 15);
    const rq = Q(S, 0, 'every permitted record has a real effect in the D frame', 0.6) * f1;
    chip(530, 530, 860, 58, 'D† F D real symmetric ,   D = diag(1, i, i, i, 1)', C.gold, rq, 22);
    lbl('for every permitted record and every protocol', 530, 585, C.dim, rq, 15);
    const tq = Q(S, 0, 'Not on all inputs', 0.6) * f1;
    box(1040, 250, 740, 120, C.mag, tq, 2, 'rgba(40,0,40,0.3)');
    lbl('target effect E_y has an imaginary D-frame entry', 1410, 290, C.mag, tq, 17);
    lblG('(D†E_y D)₀₁ = (√3 − √6)/24 − i √2/48', 1410, 340, C.white, tq, 23);
    const wq = Q(S, 0, 'two inputs with equal real parts', 0.6) * f1;
    lblG('σ± = D η± η±† D† ,   η± = (e₀ ± i e₁)/√2', 1410, 430, C.white, wq, 21);
    lblG('Re(D†σ₊D) = Re(D†σ₋D)  ⇒  every permitted record has one law', 1410, 475, C.cyan, wq, 18);
    const dq = Q(S, 0, 'differ on the target by root two over twenty-four', 0.6) * f1;
    chip(1410, 560, 740, 60, '|Tr[E_y(σ₊ − σ₋)]| = √2/24 ≈ 0.059', C.gold, dq, 24);
    stamp('NOT NATIVE ON ALL INPUTS', 1410, 690, dq, C.red, 28, -0.04);
  }
  const q1 = Q(S, 1, 'Yet the sign worlds are still told apart', 0.6, 0.3);
  if (q1 > 0) {
    const pq = Q(S, 1, 'Wait one hundredth, read all five labels, stop', 0.6);
    cell080(160, 250, 220, 70, 'wait τ = 1/100', C.cyan, pq, 19); arrow(390, 285, 430, 285, C.dim, pq, 2);
    cell080(440, 250, 220, 70, 'read 5 labels', C.gold, pq, 19); arrow(670, 285, 710, 285, C.dim, pq, 2);
    cell080(720, 250, 180, 70, 'Stop', C.mag, pq, 19);
    lbl('t = 1/√2 :  five record probabilities in each world', 530, 380, C.white, pq, 16);
    LBL080.forEach((s, i) => { const x = 200 + i * 140, h0 = NATP080[0][i] * 520, h1 = NATP080[1][i] * 520; fillBox(x, 640 - h0, 44, h0, C.cyan, pq * 0.5); rect63(x, 640 - h0, 44, h0, C.cyan, pq, 1.5); fillBox(x + 50, 640 - h1, 44, h1, C.mag, pq * 0.5); rect63(x + 50, 640 - h1, 44, h1, C.mag, pq, 1.5); lbl(s, x + 47, 670, C.white, pq, 17); });
    lbl('cyan S₊ , magenta S₋', 530, 705, C.dim, pq, 15);
    const eq = Q(S, 1, 'the empty-mode probabilities differ', 0.6);
    lblG('label N :  0.2528  vs  0.2400', 530, 745, C.gold, eq, 19);
    const px = 1080, py = 700, pw = 640, ph = 380, xS = s => px + s / 0.06 * pw, yS = v => py - v / 0.16 * ph;
    plotAxes(px, py, pw, ph, eq, '', 'd(s) = (p₀₊ − p₀₋) / t√(1 − t²)');
    lbl('wait s', px + pw + 14, py + 6, C.dim, eq, 16, 'left');
    [0, 0.05, 0.1, 0.15].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, eq, 14, 'right'));
    [0.02, 0.04].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, eq, 14));
    curve(p_ => [xS(p_ * 0.06), yS(interp080(NATD080.map(r => [r[0], r[1]]), p_ * 0.06))], 80, C.gold, eq, 3);
    const bq = Q(S, 1, 'more than three over two hundred fifty', 0.6);
    curve(p_ => { const s = p_ * 0.032; return [xS(s), yS(Math.max(0, interp080(NATD080.map(r => [r[0], r[2]]), s)))]; }, 60, C.cyan, bq, 2.5);
    dashed(px, yS(3 / 250), px + pw, yS(3 / 250), C.red, bq, 2); lblG('3/250', px + pw, yS(3 / 250) - 10, C.red, bq, 15, 'right');
    dot(xS(0.01), yS(interp080(NATD080.map(r => [r[0], r[1]]), 0.01)), 10, 'g', bq);
    lblG('d(1/100) = 0.0255', xS(0.003), yS(0.078), C.gold, bq, 15, 'left'); dashed(xS(0.0085), yS(0.072), xS(0.01), yS(0.03), C.gold, bq * 0.7, 1.2);
    lblG('lower bound s·d′(0) − 80s²', xS(0.034), yS(0.034), C.cyan, bq, 15, 'left');
    lblG('d′(0) = √3 + √6/3 ≈ 2.549', xS(0.034), yS(0.034) + 22, C.cyan, bq, 15, 'left');
    const tq = Q(S, 1, 'for every t', 0.6);
    chip(1410, 790, 700, 52, 'p₀₊ − p₀₋ > (3/250) t√(1 − t²) ,  one protocol', C.green, tq, 19);
  }
};

/* ---- 11 POLAR RAY (§36) ---- */
SCENES.polar = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'Whether native operations force a global complex structure is open', 'open']]);
  const f1 = 1 - Q(S, 1, 'So any model giving that ray one record law', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Away from a dark line', 0.6) * f1;
    const cx = 520, cy = 500;
    line(cx, cy - 230, cx, cy + 230, C.dim, q, 3); dashed(cx, cy - 230, cx, cy + 230, C.white, q * 0.6, 2);
    lblG('dark line ℝz , z = (e₂ − e₅)/√2', cx, cy - 245, C.white, q, 17);
    const w1 = Math.sqrt((5 - Math.sqrt(17)) / 2), w2 = Math.sqrt((5 + Math.sqrt(17)) / 2);
    ell080(cx - 170, cy + 40, 130, 60, C.cyan, q, 2.2); ell080(cx + 190, cy - 20, 150, 70, C.mag, q, 2.2);
    dot(cx - 170 + 130 * Math.cos(t * w1 * 1.6), cy + 40 + 60 * Math.sin(t * w1 * 1.6), 10, 'c', q);
    dot(cx + 190 + 150 * Math.cos(t * w2 * 1.6), cy - 20 + 70 * Math.sin(t * w2 * 1.6), 10, 'm', q);
    lblG('ω² = (5 − √17)/2', cx - 170, cy + 140, C.cyan, q, 17); lblG('ω² = (5 + √17)/2', cx + 190, cy + 90, C.mag, q, 17);
    const jq = Q(S, 0, 'its polar factor is a complex structure commuting with every wait', 0.6) * f1;
    chip(530, 770, 860, 56, 'J_p = A|_E (−A²|_E)^(−1/2) ,  J_p² = −I_E ,  J_p O(t) = O(t) J_p', C.gold, jq, 19);
    const xq = Q(S, 0, 'separates e N from its partner', 0.6) * f1;
    lblG('x = e_N ,   y = J_p x = −(e₂ + (1 + √2) e₃ + e₅)/n ,   n = √(5 + 2√2)', 1410, 260, C.white, xq, 17);
    lbl('one internal complex ray , orthogonal physical inputs', 1410, 295, C.dim, xq, 15);
    LBL080.forEach((s, i) => { const x = 1130 + i * 120, h0 = POLX080[i] * 300, h1 = POLY080[i] * 300; fillBox(x, 640 - h0, 44, h0, C.cyan, xq * 0.5); rect63(x, 640 - h0, 44, h0, C.cyan, xq, 1.5); fillBox(x + 50, 640 - h1, 44, h1, C.mag, xq * 0.5); rect63(x + 50, 640 - h1, 44, h1, C.mag, xq, 1.5); lbl(s, x + 47, 670, C.white, xq, 17); });
    lblG('cyan p_x = (1, 0, 0, 0, 0) ;  magenta p_y = (0, 1, (1+√2)², 1, 0)/(5 + 2√2)', 1410, 710, C.dim, xq, 14);
    const tq = Q(S, 0, 'with total variation one', 0.6) * f1;
    stamp('TV = 1', 1410, 790, tq, C.red, 30, -0.03);
  }
  const q1 = Q(S, 1, 'So any model giving that ray one record law', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 260, 860, 58, 'any common law q :  max{ TV(p_x, q) , TV(p_y, q) } ≥ 1/2', C.gold, q1, 21);
    const eq = Q(S, 1, 'only constant effects descend', 0.6);
    chip(530, 350, 860, 58, '[F_w , J_p] = 0  ⇔  w_N = w₃ = w₂₅ = (w₂ + w₅)/2', C.cyan, eq, 21);
    lbl('then F_w = λ I_E :  no single-label effect descends', 530, 410, C.dim, eq, 16);
    const mq = Q(S, 1, 'a read can push half the mass onto the dark line', 0.6);
    lblG('input f = (e₂ + e₅)/√2 on the polar support', 530, 480, C.white, mq, 18);
    [['before the read', 1, 0], ['after a full read', 0.5, 0.5]].forEach(([s, a, b], i) => { const x = 240 + i * 340, y0 = 720, h = 180; fillBox(x, y0 - a * h, 90, a * h, C.gold, mq * 0.5); rect63(x, y0 - a * h, 90, a * h, C.gold, mq, 1.5); fillBox(x + 100, y0 - b * h, 90, Math.max(b * h, 0.1), C.red, mq * 0.5); if (b > 0) rect63(x + 100, y0 - b * h, 90, b * h, C.red, mq, 1.5); lbl(s, x + 95, y0 + 30, C.white, mq, 16); lbl(a === 1 ? '1' : '1/2', x + 45, y0 - a * h - 10, C.gold, mq, 15); lbl(b === 0 ? '0' : '1/2', x + 145, y0 - Math.max(b * h, 0) - 10, C.red, mq, 15); });
    lbl('gold : polar support  ·  red : dark line', 530, 790, C.dim, mq, 15);
    const sq = Q(S, 1, 'onto the dark line', 0.6);
    lblG('dark-line mass after a read = (ρ₂₂ + ρ₅₅)/2 ∈ [0, 1/2]', 1410, 300, C.white, sq, 18);
    lbl('the polar support is not an instrument for the native read', 1410, 340, C.dim, sq, 15);
    const oq = Q(S, 1, 'Whether native operations force a global complex structure is open', 0.6);
    box(1040, 420, 740, 220, C.vio, oq, 2.5, 'rgba(20,10,40,0.6)');
    lbl('OPEN', 1410, 470, C.vio, oq, 26);
    lbl('do the native readouts , phase comparisons and', 1410, 520, C.white, oq, 18);
    lbl('juxtapositions force a global complex structure J_c ?', 1410, 552, C.white, oq, 18);
    lbl('§24 , interface 3 :  real and classical subtheories not yet excluded', 1410, 605, C.dim, oq, 15);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'are classical tools', 'classical'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['KERNEL', '−3/4 ⇒ λ = −1/2', C.gold, 'Pairwise positivity is not global'], ['CHANNEL', 'segment τ_p', C.cyan, 'the channel keeps a segment of equilibria'], ['TREE', 'p + (1 − p)2⁻ⁿ', C.mag, 'records grow an exact tree'], ['RESET', '2[1 − (1 − ε)ⁿ]', C.green, 'a reset flips the limit'], ['TABLES', 'I , I , −I · 2√2', '#8fbcff', 'answer tables fail'], ['CONCEPT', 'span{I, J} ≅ ℂ²', C.gold, 'stable concepts are two numbers'], ['SIGN', '4t√(1 − t²)', C.cyan, 'a sign hides from real effects'], ['RANK', '(1/16)⁸ ⇒ d ≥ 3', C.mag, 'responses bound dimension'], ['NATIVE', '> (3/250) t√(1 − t²)', C.green, 'the native wait still tells the sign apart'], ['POLAR', 'TV = 1', C.red, 'one read splits the wait\'s own polar ray']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 250 + (i % 5) * 355, y = 240 + Math.floor(i / 5) * 150, q = Q(S, 0, ph) * fade; box(x - 160, y, 320, 125, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 48, col, q, 20); lblG(a2, x, y + 95, C.white, q, 20); });
    lbl('CLASSICAL · Mermin–Peres square (Mermin ; Cabello arXiv:0808.2456) · CHSH and contextual gluing (Abramsky–Brandenburger) · Choi–Kraus · GNS · polar decomposition (Moretti–Oppio)', W / 2, 590, '#8fbcff', Q(S, 1, 'are classical tools') * fade, 14);
    lbl('PROJECT VOLUMES · five-window quantum memory §§17–19 · Half-Gram Cor. 6.1 · environment record Thm 2.2 · predictive waves §29 · static compatibility fiber §9.3', W / 2, 630, C.cyan, Q(S, 1, 'the channel package comes from other project volumes') * fade, 14);
    lbl('THIS VOLUME §§14–36 · kernel and loop bounds · return-tree law · reset limits · two-scalar concept · response certificate · native separation · polar ray', W / 2, 670, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · eigenvalues · exact char. poly · SDP diamond norms · record tree · 512 sign tables · det H = 16⁻⁸ · d(1/100) = 0.0255 · TV = 1', W / 2, 710, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 780, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC QP V · STATIC SLICES', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 量子原理 第五部 · 静态切面、返回记录与相位读口 · TRURETURING FILM 080', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A positivity that fails globally, a segment of equilibria, a record tree, and a sign that hides from every real effect.', W / 2, 875, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC QP V', kernel: 'STATIC SLICES', bath: 'BALANCED CHANNEL', tree: 'RECORD TREE', reset: 'RESET LIMITS', square: 'ANSWER TABLES', concept: 'STABLE CONCEPTS', sign: 'SIGN WORLDS', rank: 'RESPONSE RANK', native: 'NATIVE READOUT', polar: 'POLAR RAY', finale: 'LEDGER' });

function poster080() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('χ_G(t) = t²⁰ (t − 1)² (t + ½)³', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('Pr(+ⁿ) = p + (1 − p) 2⁻ⁿ', 1320, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('‖S₊ − S₋‖◇ = 4t√(1 − t²)', 1320, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 量子原理 第五部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC QP V · STATIC SLICES', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('静 态 切 面 · 返 回 记 录 · 相 位 读 口', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 080', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster080;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
