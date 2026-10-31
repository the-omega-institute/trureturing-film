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

/* ---- film 099: AURIC V37–V38 · binary relations, golden gates and complete processes ---- */
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
const _po099 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po099.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po099.set(key, off); }
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
/* ---- film 099 data (from verify099.py / vis099.json) ---- */
const BALLPTS_099 = [[0.4344,0.3281,0.1612],[0.3952,0.2708,0.1234],[0.4447,0.2984,0.1068],[0.3082,0.3917,0.0674],[0.4449,0.3006,0.1596],[0.3066,0.3478,0.243],[0.3125,0.4185,0.0959],[0.3321,0.3201,0.0765],[0.275,0.3254,0.1885],[0.3783,0.3287,0.1497],[0.2636,0.2452,0.1976],[0.309,0.2798,0.0749],[0.2168,0.3837,0.0938],[0.418,0.2464,0.0885],[0.3985,0.3759,0.1064],[0.3633,0.335,0.1839],[0.2769,0.3459,0.0518],[0.2748,0.3683,0.0731],[0.3796,0.3665,0.0298],[0.2605,0.2861,0.1915],[0.3523,0.4013,0.1692],[0.3874,0.3127,0.0648],[0.3138,0.2787,0.1735],[0.3425,0.2811,0.1981],[0.2767,0.3218,0.1472],[0.3621,0.2257,0.1608],[0.3148,0.3119,0.0079],[0.3346,0.2996,0.1739],[0.3365,0.3507,0.2052],[0.3717,0.3077,0.0962],[0.3479,0.4097,0.1462],[0.2353,0.4062,0.1534],[0.3294,0.3699,0.1482],[0.3701,0.3903,0.1025],[0.3036,0.2409,0.0826],[0.368,0.2888,0.0413],[0.2133,0.3841,0.1316],[0.3643,0.414,0.0721],[0.3012,0.3135,0.0388],[0.2387,0.3612,0.0969],[0.2161,0.3621,0.1421],[0.3488,0.355,0.0257],[0.34,0.4026,0.2024],[0.2518,0.3829,0.139],[0.3466,0.4328,0.1612],[0.2925,0.3278,0.1243],[0.3974,0.425,0.1224],[0.3638,0.2533,0.0647],[0.2858,0.2308,0.1674],[0.3271,0.3881,0.1253],[0.3292,0.3056,0.1961],[0.2892,0.2289,0.1198],[0.2731,0.3639,0.1143],[0.4494,0.3122,0.1457],[0.3062,0.2274,0.2071],[0.2783,0.3347,0.0965],[0.3699,0.2949,0.0911],[0.3113,0.3222,0.2289],[0.3763,0.2657,0.1348],[0.2983,0.2914,0.0864],[0.292,0.33,0.112],[0.2233,0.3469,0.1764],[0.2955,0.2762,0.2338],[0.3405,0.2999,0.2456],[0.2787,0.2584,0.0537],[0.3149,0.3345,0.2049],[0.3762,0.2706,0.2075],[0.3218,0.2192,0.1669],[0.3681,0.3338,0.0767],[0.3308,0.2503,0.0291],[0.3457,0.3172,0.1582],[0.3356,0.3258,0.1203],[0.4343,0.3031,0.0725],[0.378,0.2419,0.0763],[0.3845,0.4213,0.1543],[0.294,0.2478,0.2159],[0.4114,0.3512,0.1651],[0.3491,0.2944,0.1641],[0.3439,0.2567,0.213],[0.2712,0.4267,0.1743],[0.2397,0.3129,0.2146],[0.3956,0.3718,0.1528],[0.2478,0.3685,0.0489],[0.2817,0.33,0.1097],[0.2023,0.3427,0.1002],[0.2973,0.4234,0.1209],[0.3126,0.209,0.1161],[0.2821,0.3806,0.2183],[0.3133,0.3254,0.0276],[0.3198,0.4269,0.1021],[0.2636,0.3705,0.1865],[0.3419,0.2697,0.0466],[0.4006,0.2916,0.216],[0.3488,0.3511,0.2082],[0.2842,0.3854,0.0418],[0.3339,0.2429,0.1199],[0.3259,0.2649,0.0864],[0.2826,0.2526,0.1869],[0.3027,0.3092,0.0655],[0.3808,0.2921,0.2243],[0.3893,0.3063,0.212],[0.3422,0.4214,0.0843],[0.3554,0.3572,0.1845],[0.3644,0.3465,0.1527],[0.2757,0.3432,0.0302],[0.3535,0.3334,0.2101],[0.2704,0.2607,0.1624],[0.39,0.2467,0.0597],[0.3795,0.3453,0.1603],[0.2625,0.4024,0.0762],[0.3096,0.3628,0.0458],[0.2999,0.354,0.1152],[0.3638,0.3591,0.1608],[0.3625,0.2671,0.1068],[0.3638,0.3842,0.1268],[0.2979,0.2926,0.1243],[0.4076,0.3196,0.0507],[0.3993,0.3853,0.1325],[0.3643,0.4256,0.0645],[0.3215,0.2655,0.1769],[0.3608,0.2816,0.2026],[0.3327,0.388,0.0214],[0.3089,0.2479,0.0699],[0.3283,0.4197,0.1479],[0.3274,0.3062,0.1509],[0.3117,0.4164,0.0977],[0.2579,0.3313,0.1388],[0.3289,0.4071,0.0528],[0.2977,0.3589,0.2331],[0.3499,0.243,0.1406],[0.3605,0.384,0.1994],[0.2363,0.3194,0.1727],[0.3841,0.3285,0.06],[0.3629,0.3891,0.052],[0.3024,0.4197,0.1097],[0.3808,0.2477,0.0828],[0.363,0.3454,0.1618],[0.3414,0.3169,0.1704],[0.4208,0.3431,0.0873],[0.3115,0.3379,0.0441]];
const K_099 = {"nu":0.128523,"anu":0.324435,"delta":0.071044,"beta":0.485868,"fourNu":0.514091};
const DP_099 = [-3.0,1.0,2.0,1.0,-1.0];
const ANG_099 = [1.8091,3.6182,5.4273,0.9533,2.7624,4.5715,0.0974,1.9065,3.7157,5.5248,1.0507,2.8598,4.6689,0.1949,2.004,3.8131,5.6222,1.1481,2.9572,4.7663,0.2923,2.1014,3.9105,5.7196,1.2455,3.0547,4.8638,0.3897,2.1988,4.0079,5.817,1.343,3.1521,4.9612,0.4871,2.2962,4.1054,5.9145,1.4404,3.2495,5.0586,0.5846,2.3937,4.2028,6.0119,1.5378,3.3469,5.1561,0.682,2.4911,4.3002,6.1093,1.6353,3.4444,5.2535,0.7794,2.5885,4.3976,6.2067,1.7327,3.5418,5.3509,0.8768,2.6859,4.4951,0.021,1.8301,3.6392,5.4483,0.9743,2.7834,4.5925,0.1184,1.9275,3.7366,5.5458,1.0717,2.8808,4.6899,0.2158,2.025,3.8341,5.6432,1.1691,2.9782,4.7873,0.3133,2.1224,3.9315,5.7406,1.2665,3.0757,4.8848,0.4107,2.2198,4.0289,5.838,1.364,3.1731,4.9822,0.5081,2.3172,4.1263,5.9355,1.4614,3.2705,5.0796,0.6055,2.4147,4.2238,6.0329,1.5588,3.3679,5.177,0.703,2.5121,4.3212,6.1303,1.6562,3.4654,5.2745,0.8004,2.6095,4.4186,6.2277,1.7537,3.5628,5.3719,0.8978,2.7069,4.516,0.042,1.8511,3.6602,5.4693,0.9952,2.8044,4.6135,0.1394,1.9485,3.7576,5.5667,1.0927,2.9018,4.7109,0.2368,2.0459,3.8551,5.6642,1.1901,2.9992,4.8083,0.3343,2.1434,3.9525,5.7616,1.2875,3.0966,4.9058,0.4317];
const BEST_099 = [0.7862,0.6128,0.6128,0.6128,0.4256,0.4256,0.4256,0.28,0.28,0.28,0.0973,0.0973,0.0973,0.0973,0.0973,0.0973,0.0733,0.0519];
const TAIL_099 = [0.39625,0.34596,0.26172,0.13543,0.08493,0.05295,0.04327,0.03357,0.02452,0.0115,0.01075,0.00723,0.00446,0.00417,0.00279,0.00174,0.00136,0.0009,0.0007,0.00049,0.00032,0.00025,0.00014,9e-05,8e-05,5e-05,3e-05,2e-05,2e-05,1e-05,1e-05,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
const TBND_099 = [1.0,0.7,0.49,0.343,0.2401,0.16807,0.11765,0.08235,0.05765,0.04035,0.02825,0.01977,0.01384,0.00969,0.00678,0.00475,0.00332,0.00233,0.00163,0.00114,0.0008,0.00056,0.00039,0.00027,0.00019,0.00013,9e-05,7e-05,5e-05,3e-05,2e-05,2e-05,1e-05,1e-05,1e-05,0.0,0.0,0.0,0.0,0.0,0.0];
const ASTEP_099 = [1.974,1.9951,1.9811,1.9255,1.9652,1.992,1.8603,1.9703,1.9807,1.9977,1.9458,1.9983,1.997,1.8091,1.9681,1.9959,1.9621,1.9763,1.984,1.9843,1.9661,1.8966,1.9848,1.9772,1.945,1.9124,1.9542,1.9994,1.8747,1.9824,1.9978,1.8555,1.9469,1.9991,1.4376,1.8721,1.9858,1.9899,1.8928,1.9472,2.0];
const RESID_099 = [[0.0,0.0],[0.1571,0.026],[0.3142,0.0499],[0.4712,0.0723],[0.6283,0.0926],[0.7854,0.1101],[0.9425,0.1244],[1.0996,0.1351],[1.2566,0.1419],[1.4137,0.1448],[1.5708,0.1435],[1.7279,0.1539],[1.885,0.1622],[2.042,0.1683],[2.1991,0.172],[2.3562,0.1733],[2.5133,0.172],[2.6704,0.1683],[2.8274,0.1622],[2.9845,0.1635],[3.1416,0.1646],[3.2987,0.1635],[3.4558,0.1622],[3.6128,0.1683],[3.7699,0.172],[3.927,0.1733],[4.0841,0.172],[4.2412,0.1683],[4.3982,0.1622],[4.5553,0.1539],[4.7124,0.1435],[4.8695,0.1448],[5.0265,0.1419],[5.1836,0.1351],[5.3407,0.1244],[5.4978,0.1101],[5.6549,0.0926],[5.8119,0.0723],[5.969,0.0499],[6.1261,0.026],[6.2832,0.0]];
const NS_099 = {"delta":0.071044,"lpmax":0.234473,"lpw":0.641463,"nus11":0.426262};
const CHOI_099 = [[0.0,0.25],[0.02,0.235],[0.04,0.22],[0.06,0.205],[0.08,0.19],[0.1,0.175],[0.12,0.16],[0.14,0.145],[0.16,0.13],[0.18,0.115],[0.2,0.1],[0.22,0.085],[0.24,0.07],[0.26,0.055],[0.28,0.04],[0.3,0.025],[0.32,0.01],[0.34,-0.005],[0.36,-0.02],[0.38,-0.035],[0.4,-0.05],[0.42,-0.065],[0.44,-0.08],[0.46,-0.095],[0.48,-0.11],[0.5,-0.125],[0.52,-0.14],[0.54,-0.155],[0.56,-0.17],[0.58,-0.185],[0.6,-0.2],[0.62,-0.215],[0.64,-0.23],[0.66,-0.245],[0.68,-0.26],[0.7,-0.275],[0.72,-0.29],[0.74,-0.305],[0.76,-0.32],[0.78,-0.335],[0.8,-0.35],[0.82,-0.365],[0.84,-0.38],[0.86,-0.395],[0.88,-0.41],[0.9,-0.425],[0.92,-0.44],[0.94,-0.455],[0.96,-0.47],[0.98,-0.485],[1.0,-0.5]];
const FIT_099 = [[0.0299,0.076,0.076],[0.0225,0.0597,0.0597],[0.0345,0.1148,0.1148],[0.0125,0.0427,0.0427],[0.0819,0.2354,0.2355],[0.078,0.1822,0.1823],[0.044,0.1468,0.1468],[0.0544,0.1173,0.1174],[0.0947,0.2015,0.2015],[0.0415,0.1142,0.1142],[0.0586,0.1838,0.1838],[0.036,0.1104,0.1105],[0.0741,0.2102,0.2102],[0.0733,0.2219,0.2219],[0.0318,0.0963,0.0963],[0.0347,0.0974,0.0975],[0.0659,0.1821,0.1822],[0.067,0.119,0.1191],[0.0247,0.0621,0.0622],[0.0551,0.1772,0.1773],[0.0282,0.0772,0.0772],[0.038,0.1058,0.1058],[0.0806,0.2396,0.2396],[0.0104,0.029,0.0291]];
const REC_099 = {"rk13":[3,3,3,2,2],"rk89":[21,21,21,13,13],"pref":["1000000000","1000000010","1000001000","1000001010","1000100000","1000100010","1000101000","1000101010","1001000000","1001000010","1001001000","1001001010","1010000000","1010000010","1010001000","1010001010","1010100000","1010100010","1010101000","1010101010"]};
const RECF_099 = [[0.0,1.0],[0.25,0.933],[0.5,0.8536],[0.75,0.75],[1.0,0.5]];
const DM_099 = [1.0,0.7166,0.629,0.3235,0.6445,0.4917,0.7688,0.929,0.6577,0.4352,0.5268,0.8804,0.5856,0.9388,0.6116,0.7772,0.2285,0.7193,0.8453,0.7802,0.7598,0.2367,0.9098,0.4398,0.7873,0.6086,0.7681,0.4789,0.3294,0.9355,0.7012,0.8363,0.4096,0.5357,0.4552,0.4049,0.8692,0.8661,0.8807,0.478,0.2708,0.4838,0.4254,0.8771,0.8913,0.7693,0.658,0.3979,0.472,0.5698,0.9855,0.6888,0.6204,0.7525,0.7618,0.4018,0.7444,0.8857,0.5161,0.5215,0.8199,0.9077,0.4773,0.725,0.563,0.5976,0.3402,0.8465,0.8216,0.6708,0.6004,0.3959,0.5998,0.1309,0.8785,0.7154,0.7549,0.5996,0.6021,0.4316,0.5024,0.9289,0.6832,0.6983,0.6038,0.8626,0.2986,0.8645,0.7382,0.7417,0.4724,0.6064,0.9492,0.596,0.934,0.2825,0.788,0.3013,0.5658,0.8549,0.8298,0.8193,0.1719,0.7535,0.4264,0.5176,0.7264,0.8377,0.7636,0.4281,0.6655,0.5642,0.6388,0.7133,0.6962,0.6957,0.5103,0.6603,0.7046,0.7037,0.8067,0.4854,0.5888,0.599,0.8837,0.7166,0.6467,0.7694,0.5581,0.4172,0.8113,0.9948,0.6628,0.5109,0.6127,0.7472,0.1802,0.9382,0.8506,0.6822,0.2875,0.5366,0.7195,0.4136,0.921,0.6632,0.6332,0.0405,0.6154,0.6167,0.7298,0.882,0.6189,0.4537,0.3064,0.8162,0.6412,0.8856,0.731,0.7675,0.1174,0.6819,0.8357,0.7687,0.7429,0.4975,0.9343,0.3404,0.8911,0.5592,0.7876,0.3701,0.4077,0.9745,0.7248,0.9255,0.216,0.5994,0.2223,0.33,0.9206,0.9213,0.9346,0.2809,0.3456,0.3358,0.353,0.8801,0.9407,0.8483,0.4994,0.3357,0.4561,0.5248,0.9459,0.7355,0.6804,0.6533,0.702,0.5462,0.6581];
const ETA1_099 = 0.8313;
const CX_099 = [[0.02,0.02,1.0],[0.0376,0.0376,1.0],[0.0552,0.0552,1.0],[0.0729,0.0727,1.0],[0.0905,0.0901,1.0],[0.1081,0.1075,1.0],[0.1257,0.1247,1.0],[0.1433,0.1418,1.0],[0.1609,0.1588,1.0],[0.1786,0.1757,1.0],[0.1962,0.1924,1.0],[0.2138,0.2089,1.0],[0.2314,0.2251,1.0],[0.249,0.2412,1.0],[0.2667,0.257,1.0],[0.2843,0.2725,1.0],[0.3019,0.2878,1.0],[0.3195,0.3028,1.0],[0.3371,0.3174,1.0],[0.3547,0.3317,1.0],[0.3724,0.3456,1.0],[0.39,0.3591,1.0],[0.4076,0.3722,1.0],[0.4252,0.3849,1.0],[0.4428,0.397,1.0],[0.4605,0.4087,0.992],[0.4781,0.4199,0.9453],[0.4957,0.4305,0.9015],[0.5133,0.4405,0.8603],[0.5309,0.4499,0.8213],[0.5485,0.4586,0.7843],[0.5662,0.4667,0.7491],[0.5838,0.474,0.7156],[0.6014,0.4805,0.6836],[0.619,0.4862,0.6528],[0.6366,0.491,0.6233],[0.6543,0.4948,0.5948],[0.6719,0.4976,0.5672],[0.6895,0.4994,0.5405],[0.7071,0.5,0.5145]];
const RAT_099 = [0.007,0.0185,0.0306,0.038,0.0514,0.0614,0.0696,0.0787,0.0863,0.0994,0.108,0.1168,0.126,0.1356,0.1447,0.1557,0.1729,0.1877,0.2017,0.2194,0.2372,0.2611,0.2814,0.2987,0.3193,0.3397,0.3557,0.3768,0.3892,0.4026,0.4165,0.4265,0.4354,0.4424,0.4524,0.4599,0.4656,0.4731,0.4819,0.489,0.4954,0.5008,0.5075,0.5143,0.5198,0.5263,0.5303,0.5359,0.5404,0.5462,0.5512,0.5561,0.5608,0.5656,0.57,0.5747,0.5811,0.5861,0.5904,0.5941,0.5988,0.6036,0.608,0.6117,0.6164,0.6219,0.6264,0.6304,0.6346,0.6387,0.6429,0.6474,0.6517,0.6571,0.6626,0.6668,0.672,0.6781,0.6838,0.6906,0.6977,0.7043,0.7092,0.7161,0.721,0.7277,0.7344,0.7399,0.7462,0.7522,0.7572,0.767,0.7739,0.7822,0.7935,0.8049,0.8159,0.826,0.8425,0.8731,0.974];
const RATMAX_099 = 0.974;
/* ---- film 099 helpers ---- */
const NU99 = K_099.nu, ANU99 = K_099.anu;
const MODE99 = [['0', [0, 0, 0], 'n', '000'], ['2', [1, 0, 0], 'c', '100'], ['3', [0, 0, 1], 'g', '010'], ['5', [0, 1, 0], 'o', '001'], ['25', [1, 1, 0], 'm', '101']];
const PEDGE99 = [[0, 1], [1, 4], [4, 3], [3, 0], [2, 0], [2, 1], [2, 3], [2, 4]];
function cell99(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
/* rotation matrix about unit axis n by angle th */
function rodr99(n, th) {
  const c = Math.cos(th), s = Math.sin(th), v = 1 - c, [x, y, z] = n;
  return [[c + x * x * v, x * y * v - z * s, x * z * v + y * s], [y * x * v + z * s, c + y * y * v, y * z * v - x * s], [z * x * v - y * s, z * y * v + x * s, c + z * z * v]];
}
/* the five-mode pyramid (X low, Y high, Z middle) with the AURIC ball of centre u0 and radius nu */
function pyrBall99(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return null;
  const m = pyrMap(cx, cy, s, ang, o.tilt == null ? 0.42 : o.tilt);
  const P = MODE99.map(md => m(...md[1]));
  fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.07);
  PEDGE99.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.55, 1.8));
  const cX = ANU99, cY = ANU99, cZ = NU99, R = NU99, ba = a * (o.ball == null ? 1 : o.ball);
  const ctr = m(cX, cY, cZ);
  if (ba > 0) {
    const rad = R * s * ctr[2] / 1.0;
    ctx.save(); ctx.globalAlpha = ba * 0.16; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(ctr[0], ctr[1], rad, 0, TAU); ctx.fill(); ctx.restore();
    ring(ctr[0], ctr[1], rad, C.gold, ba * 0.9, 2.2);
    const Rm = o.rot || null;
    [[1, 0, 0, 0, 1, 0], [1, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 1]].forEach(e => curve(p => { const th = p * TAU; let v = [e[0] * Math.cos(th) + e[3] * Math.sin(th), e[1] * Math.cos(th) + e[4] * Math.sin(th), e[2] * Math.cos(th) + e[5] * Math.sin(th)]; if (Rm) v = [0, 1, 2].map(i => Rm[i][0] * v[0] + Rm[i][1] * v[1] + Rm[i][2] * v[2]); const q = m(cX + R * v[0], cY + R * v[1], cZ + R * v[2]); return [q[0], q[1]]; }, 60, C.gold, ba * 0.45, 1.4));
    if (o.pts) o.pts.forEach((pt, k) => { const qq = clamp(ba * 1.8 - k / 160); let d = [pt[0] - cX, pt[1] - cY, pt[2] - cZ]; if (Rm) d = [0, 1, 2].map(i => Rm[i][0] * d[0] + Rm[i][1] * d[1] + Rm[i][2] * d[2]); const q = m(cX + d[0], cY + d[1], cZ + d[2]); dot(q[0], q[1], 4.5, k % 3 ? 'c' : 'm', qq * 0.9); });
    dot(ctr[0], ctr[1], 7, 'g', ba);
  }
  if (o.labels !== false) MODE99.forEach((md, k) => { dot(P[k][0], P[k][1], 11, md[2], a); lbl(md[0] + ' · ' + md[3], P[k][0] + (k === 2 ? 0 : 26), P[k][1] + (k === 2 ? -22 : 8), C.white, a * 0.9, 16, k === 2 ? 'center' : 'left'); });
  return { P, ctr, m };
}

/* a magnified view of the AURIC ball : unit-ball coordinates d = (u - u0)/nu, Z up */
function ballZoom99(bx, by, Rp, ang, a, o = {}) {
  if (a <= 0) return;
  const v = v3(bx, by, Rp, ang, 0.42), Rm = o.rot || null;
  const rot = d => (Rm ? [0, 1, 2].map(i => Rm[i][0] * d[0] + Rm[i][1] * d[1] + Rm[i][2] * d[2]) : d);
  const c0 = v(0, 0, 0), rad = Rp * c0[2];
  ctx.save(); ctx.globalAlpha = a * 0.13; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(c0[0], c0[1], rad, 0, TAU); ctx.fill(); ctx.restore();
  ring(c0[0], c0[1], rad, C.gold, a, 2.5);
  [[1, 0, 0, 0, 1, 0], [1, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 1]].forEach(e => curve(p => { const th = p * TAU; const d = rot([e[0] * Math.cos(th) + e[3] * Math.sin(th), e[1] * Math.cos(th) + e[4] * Math.sin(th), e[2] * Math.cos(th) + e[5] * Math.sin(th)]); const q = v(d[0], d[1], d[2]); return [q[0], q[1]]; }, 72, C.gold, a * 0.4, 1.4));
  if (o.axes) [[[1, 0, 0], 'X', C.cyan], [[0, 1, 0], 'Y', C.orange], [[0, 0, 1], 'Z', C.green]].forEach(([e, nm, col]) => { const q = v(e[0] * 1.28, e[1] * 1.28, e[2] * 1.28); arrow(c0[0], c0[1], q[0], q[1], col, a * 0.8, 2); lbl(nm, q[0] + 12, q[1] + 6, col, a, 18, 'left'); });
  if (o.pts) o.pts.forEach((pt, k) => { const qq = clamp(a * 1.8 - k / 160); const d = rot([(pt[0] - ANU99) / NU99, (pt[1] - ANU99) / NU99, (pt[2] - NU99) / NU99]); const q = v(d[0], d[1], d[2]); dot(q[0], q[1], 6, k % 3 ? 'c' : 'm', qq * (0.55 + 0.45 * clamp(1.6 - q[3] / 1400))); });
  dot(c0[0], c0[1], 9, 'g', a);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['recovered a missing moment', 'V36 : FOUR GIVE THE FIFTH', '(N, X, Y, Z, K) with a fixed cross ratio', C.gold], ['carry a complete qubit', 'A COMPLETE QUBIT', 'u = u₀ + ν r : a ball in the pyramid', C.cyan], ['golden gates', 'GOLDEN GATES', 'K = ζ [ I + (ζ − 1) P ]', C.mag], ['quantum processes and their records', 'PROCESSES AND RECORDS', 'four inputs · Choi · twenty paths', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 330, 380, 58, 'binary relations', C.gold, rp, 22); chip(330, 415, 380, 58, 'golden gates', C.mag, rp, 22); chip(330, 500, 380, 58, 'complete processes', C.green, rp, 22);
  box(1420, 320, 380, 200, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one ball , one margin', 1610, 385, C.cyan, rp, 22); lblG('κ = (1 − |r|) / 2', 1610, 455, C.white, rp, 30);
  txt(scramble('AURIC V37–V38 · GATES', rp, 499), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V37–V38 · 二 元 关 系 、黄 金 门 与 完 整 过 程', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 099 · AURIC_BINARY_RELATIONS_UNITARY_REPRESENTATION_AND_GOLDEN_GATE_UNIVERSALITY_V37 · AURIC_COMPLETE_QUANTUM_PROCESSES_INTERNAL_MEMORY_AND_RANK_BOUNDARY_STABILITY_V38', W / 2, 115, { size: 12, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 0 });
};

/* ---- 02 BINARY RELATIONS (V37 §2, §6) ---- */
SCENES.gram = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'With a context the three axes become operators', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A binary relation is two vectors', 0.6) * f1;
    const ox = 200, oy = 720;
    arrow(ox, oy, ox + 520, oy - 160, C.cyan, q, 4.5); lbl('u', ox + 540, oy - 158, C.cyan, q, 30, 'left');
    arrow(ox, oy, ox + 210, oy - 370, C.mag, q, 4.5); lbl('v', ox + 222, oy - 382, C.mag, q, 30, 'left');
    curve(p => { const an = -0.30 - p * 0.75; return [ox + 150 * Math.cos(an), oy + 150 * Math.sin(an)]; }, 30, C.gold, q, 2.5); lbl('c = ⟨v, u⟩', ox + 185, oy - 180, C.gold, q, 22, 'left');
    lbl('a = ‖u‖² ,  b = ‖v‖²', 640, 700, C.white, q, 22);
    chip(530, 265, 760, 60, 'G = ( a  c* ; c  b ) ⪰ 0 ,   N = Tr G', C.gold, q, 23);
    const bq = Q(S, 0, 'a point of the Bloch ball', 0.6) * f1;
    qubit(1390, 500, 190, 1.0 + 0.2 * Math.sin(t * 0.7), 0.8 + t * 0.3, bq, C.gold, t);
    chip(1390, 265, 760, 60, 'G = (N/2) ( I + r · σ ) ,   |r| ≤ 1', C.cyan, bq, 23);
    lbl('r = ( 2 Re c ,  2 Im c ,  a − b ) / N ;  pure ⇔ |r| = 1', 1390, 735, C.dim, bq, 17);
    const uq = Q(S, 0, 'two pairs differ by one unitary', 0.6) * f1;
    chip(1390, 805, 840, 58, '∃ U : U uᵢ = vᵢ   ⇔   ⟨uᵢ , uⱼ⟩ = ⟨vᵢ , vⱼ⟩  (i, j = 0, 1)', C.green, uq, 21);
    const nq = Q(S, 0, 'their Gram matrices agree', 0.6) * f1;
    lbl('a = b = 1 , c = 2 : det G = −3 < 0 , not a relation', 530, 790, C.red, nq, 17);
    lbl('normalising each state : T = diag(2, 1) moves 1/√2 to 2/√5', 530, 825, C.red, nq, 17);
  }
  const q = Q(S, 1, 'With a context the three axes become operators', 0.6, 0.3);
  if (q > 0) {
    chip(530, 265, 860, 60, 'ρ = ½ ( I⊗S + σx⊗X + σy⊗Y + σz⊗Z ) ⪰ 0', C.gold, q, 22);
    lbl('S = A + B ,  Z = A − B ,  X = C + C* ,  Y = i (C* − C)', 530, 325, C.dim, q, 16);
    const bq = Q(S, 1, 'for the Bell state the squared axes sum to three quarters', 0.6);
    lbl('Bell state |Φ⁺⟩ :  S = I/2 ,  X = σx/2 ,  Y = −σy/2 ,  Z = σz/2', 530, 400, C.white, bq, 18);
    [['X² + Y² + Z²', 0.75, C.red], ['S²', 0.25, C.cyan]].forEach(([lab, v, col], i) => { const y = 460 + i * 110, w = v * 800; fillBox(160, y, w, 74, col, bq * 0.4); rect63(160, y, w, 74, col, bq, 1.8); lbl(lab + ' = ' + (v === 0.75 ? '¾ I' : '¼ I'), 182, y + 47, C.white, bq, 24, 'left'); });
    const sq = Q(S, 1, 'the squared scale to one quarter', 0.6);
    stamp('SCALAR BALL RULE FAILS', 530, 760, sq, C.red, 28, -0.04);
    const pq = Q(S, 1, 'Pairwise positivity is not global positivity either', 0.6);
    const P3 = [[1390, 290], [1180, 600], [1600, 600]];
    [[0, 1], [1, 2], [0, 2]].forEach(([i, j]) => { line(P3[i][0], P3[i][1], P3[j][0], P3[j][1], C.mag, pq, 3); lbl('−1', (P3[i][0] + P3[j][0]) / 2 + (i === 1 && j === 2 ? 0 : (i === 0 && j === 1 ? -26 : 26)), (P3[i][1] + P3[j][1]) / 2 + (i === 1 && j === 2 ? 30 : 0), C.mag, pq, 20); });
    P3.forEach((p, i) => { ring(p[0], p[1], 26, C.white, pq, 2); lbl(String(i + 1), p[0], p[1] + 7, C.white, pq, 20); });
    lbl('three unit vectors , all overlaps −1', 1390, 670, C.dim, pq, 17);
    chip(1390, 730, 760, 56, 'every 2 × 2 sub-table ⪰ 0', C.green, pq, 22);
    chip(1390, 805, 760, 56, '1ᵀ G 1 = 3 − 6 = −3 < 0', C.red, pq, 23);
  }
};

/* ---- 03 THE FIXED CODE (V37 §3) ---- */
SCENES.ball = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'The fixed code', 0.6);
  const bq = Q(S, 0, 'a ball inside the pyramid', 0.6);
  const ang0 = 0.55 + 0.12 * Math.sin(t * 0.25);
  const PB = pyrBall99(290, 560, 340, ang0, q0, { ball: bq });
  if (PB && bq > 0) { dashed(PB.ctr[0], PB.ctr[1], 600, 470, C.gold, bq * 0.6, 1.4); }
  ballZoom99(760, 440, 165, ang0, bq, { pts: BALLPTS_099, axes: 1 });
  lbl('magnified : centre u₀ , radius ν', 760, 665, C.gold, bq, 16);
  lbl('dots : 140 random states , recomputed', 760, 695, C.dim, bq, 15);
  const f1 = 1 - Q(S, 1, 'Trace distance is the distance of means', 0.6);
  if (f1 > 0) {
    const ef = [['E₂₅ = (ν/2)(√3 I − σx − σy − σz) ,  E₀ = 3 E₂₅', C.mag], ['E₂ = (ν/2)(√11 I + 3σx + σy + σz)', C.cyan], ['E₅ = (ν/2)(√11 I + σx + 3σy + σz)', C.orange], ['E₃ = ν (I + σz)', C.gold]];
    const eq = Q(S, 0, 'five rank-one effects sum to the identity', 0.6) * f1;
    ef.forEach(([s, col], i) => chip(1380, 260 + i * 70, 820, 56, s, col, clamp(eq * 1.6 - i * 0.2), 20));
    lbl('Σ E_s = I ,  each E_s rank one and positive', 1380, 555, C.dim, eq, 16);
    const nq = Q(S, 0, 'one over one plus two root three plus root eleven', 0.6) * f1;
    chip(1380, 615, 820, 60, 'ν = 1 / (1 + 2√3 + √11) = ' + NU99.toFixed(5), C.green, nq, 23);
    const uq = Q(S, 0, 'The three native means become', 0.6) * f1;
    chip(1380, 700, 820, 60, 'u = u₀ + ν r ,  u₀ = (' + ANU99.toFixed(4) + ', ' + ANU99.toFixed(4) + ', ' + NU99.toFixed(4) + ')', C.gold, uq, 21);
    lbl('X = low , Y = high , Z = middle occupation', 1380, 765, C.dim, uq, 16);
  }
  const q = Q(S, 1, 'Trace distance is the distance of means', 0.6, 0.3);
  if (q > 0) {
    chip(1380, 265, 820, 62, 'D(ρ, σ) = ‖u(ρ) − u(σ)‖ / 2ν', C.cyan, q, 25);
    const eq = Q(S, 1, 'Effect zero is three times effect twenty-five', 0.6);
    chip(1380, 350, 820, 56, 'E₀ = 3 E₂₅  ⇒  w₀ = 3κ', C.mag, eq, 23);
    const rq = Q(S, 1, 'N minus X minus Y minus Z minus two kappa equals zero', 0.6);
    chip(1380, 440, 820, 66, 'N − X − Y − Z − 2κ = 0', C.gold, rq, 30);
    const fq = Q(S, 1, 'and any four give the fifth', 0.6);
    const nm = ['N', 'X', 'Y', 'Z', 'κ'], miss = Math.floor(Math.max(0, u - lineAt(S, 1).s) / 1.1) % 5;
    nm.forEach((s, i) => { const x = 1010 + i * 150; cell99(x, 520, 128, 80, i === miss ? '?' : s, i === miss ? C.red : C.cyan, fq, 26); });
    lbl('|Δμ_i| ≤ 2 Σ (j ≠ i) |Δμ_j| ;  for κ the constant is ½', 1380, 650, C.white, fq, 18);
    lbl('compatible class : N ≥ 0 ,  ‖(X − a_ν N , Y − a_ν N , Z − νN)‖ ≤ νN', 1380, 690, C.dim, fq, 15);
    lbl('the error of two reconstructions obeys the same linear relation', 1380, 725, C.dim, fq, 15);
  }
};

/* ---- 04 LIFTS AND READOUT (V37 §4–§5) ---- */
SCENES.lift = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Five classical outcomes keep less', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Every two-by-two unitary lifts faithfully', 0.6) * f1;
    const rq = Q(S, 0, 'a rigid rotation of the ball', 0.6) * f1;
    const th = Math.max(0, u - lineAt(S, 0).s - 3) * 0.9;
    const Rr = rodr99([0.577, 0.577, 0.577], th * rq);
    const PB = pyrBall99(290, 560, 340, 0.55, q, { ball: 1, rot: Rr });
    if (PB) dashed(PB.ctr[0], PB.ctr[1], 600, 470, C.gold, q * 0.6, 1.4);
    ballZoom99(760, 440, 165, 0.55, q, { pts: BALLPTS_099, axes: 1, rot: Rr });
    lbl('rotation about the centre ; the ball stays in place', 800, 705, C.gold, rq, 16);
    chip(1380, 270, 820, 62, 'ι(U) = J U J* + ( I₅ − J J* )', C.gold, q, 25);
    const hq = Q(S, 0, 'five-mode unitary', 0.6) * f1;
    chip(1380, 360, 820, 56, 'ι(U) J = J U ,   ι(UV) = ι(U) ι(V)', C.cyan, hq, 22);
    lbl('faithful : ι(U) = ι(V) ⇒ U = V ; reference R : J ⊗ I_R', 1380, 420, C.dim, hq, 16);
    chip(1380, 500, 820, 60, 'u(UρU*) = u₀ + R_U ( u(ρ) − u₀ )', C.green, rq, 23);
    lbl('R_U ∈ SO(3) : U σ_j U* = Σ_i (R_U)_ij σ_i', 1380, 560, C.dim, rq, 16);
    stamp('RIGID ROTATION', 1380, 660, rq, C.gold, 30, -0.04);
  }
  const q = Q(S, 1, 'Five classical outcomes keep less', 0.6, 0.3);
  if (q > 0) {
    const zq = Q(S, 1, 'The two z states are at distance one', 0.6);
    chip(530, 265, 760, 58, 'ρ± = (I ± σz)/2 :  D(ρ₊, ρ₋) = 1', C.cyan, zq, 23);
    const dq = Q(S, 1, 'yet their outcome laws differ by only four nu', 0.6);
    bars63(250, 500, DP_099, 90, 40, 50, dq, C.gold, ['0', '2', '3', '5', '25']);
    lbl('p(ρ₊) − p(ρ₋) = ν · (−3 , 1 , 2 , 1 , −1)', 530, 350, C.white, dq, 18);
    chip(530, 735, 760, 58, 'TV = ½ Σ |Δp| = 4ν = ' + K_099.fourNu.toFixed(3) + ' < 1', C.gold, dq, 23);
    const nq = Q(S, 1, 'so no channel inverts the readout', 0.6);
    stamp('NO CPTP LEFT INVERSE', 530, 825, nq, C.red, 26, -0.04);
    const iq = Q(S, 1, 'Internal records keep every branch coherent', 0.6);
    chip(1380, 270, 820, 60, 'V ψ = |0⟩_R ⊗ M₀ψ + |1⟩_R ⊗ M₁ψ', C.green, iq, 22);
    lbl('V*V = M₀*M₀ + M₁*M₁ = I : unitary extension inside the whole', 1380, 330, C.dim, iq, 16);
    const nodes = []; for (let d = 0; d <= 3; d++) for (let k = 0; k < (1 << d); k++) nodes.push([d, k]);
    nodes.forEach(([d, k]) => { const x = 1380 + (k - ((1 << d) - 1) / 2) * (560 / (1 << d)), y = 400 + d * 95; if (d > 0) { const pk = k >> 1, px = 1380 + (pk - ((1 << (d - 1)) - 1) / 2) * (560 / (1 << (d - 1))); line(px, y - 95, x, y, C.green, iq * 0.7, 2); } dot(x, y, 9, d === 3 ? 'g' : 'c', iq); });
    lbl('K_hi = M_(i|h) K_h ,  Σ (|h| = 3) K_h* K_h = I , all branches kept', 1380, 735, C.white, iq, 16);
  }
};

/* ---- 05 THE GOLDEN GATE (V37 §7.1–7.2) ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Call it at two addresses', 0.6);
  const cx = 420, cy = 560, R = 190;
  if (f1 > 0) {
    const q = Q(S, 0, 'The golden gate', 0.6) * f1;
    chip(530, 262, 860, 60, 'K = ζ [ I + (ζ − 1) P ] ,   ζ = e^(3πi/5)', C.gold, q, 24);
    ring(cx, cy, R, C.dim, q, 2);
    for (let k = 0; k < 10; k++) { const an = TAU * k / 10; line(cx + (R - 10) * Math.cos(an), cy - (R - 10) * Math.sin(an), cx + (R + 10) * Math.cos(an), cy - (R + 10) * Math.sin(an), C.dim, q, 2); }
    lbl('tenth roots of unity', cx, cy + R + 44, C.dim, q, 16);
    const z1 = 3 * Math.PI / 5, z2 = 6 * Math.PI / 5;
    dot(cx + R * Math.cos(z1), cy - R * Math.sin(z1), 13, 'g', q); lbl('ζ  (ker P)', cx + R * Math.cos(z1) - 20, cy - R * Math.sin(z1) - 22, C.gold, q, 18, 'right');
    dot(cx + R * Math.cos(z2), cy - R * Math.sin(z2), 13, 'm', q); lbl('ζ²  (ran P)', cx + R * Math.cos(z2) - 22, cy - R * Math.sin(z2) + 26, C.mag, q, 18, 'right');
    const pq = Q(S, 0, 'times P', 0.6) * f1;
    chip(1380, 262, 820, 56, 'P = n_L n_R + (1 − n_L)(1 − n_R) Q_C', C.cyan, pq, 21);
    chip(1380, 332, 820, 56, 'Q = q q* ,   q = ( φ^(−1/2) , φ⁻¹ )', C.cyan, pq, 21);
    lbl('only flip : 000 ↔ 010 ; the no-11 five-mode space is kept', 1380, 390, C.dim, pq, 16);
    const bq = Q(S, 0, 'a phase the braid relation allows', 0.6) * f1;
    chip(1380, 455, 820, 56, 'B_P B_Q B_P − B_Q B_P B_Q = s³ t (1 + t + λt²)(P − Q)', C.mag, bq, 19);
    chip(1380, 525, 820, 56, 'λ = φ⁻² , t = z − 1 :  z² + φ⁻¹ z + 1 = 0', C.mag, bq, 21);
    lbl('roots z = e^(±3πi/5) ; the common phase s = ζ is a convention', 1380, 583, C.dim, bq, 16);
    const kq = Q(S, 0, 'K to the fifth is a reflection', 0.6) * f1;
    chip(1380, 660, 820, 62, 'K⁵ = 2P − I ,   K¹⁰ = I ,   K⁻¹ = K⁹', C.green, kq, 25);
  }
  const q = Q(S, 1, 'Call it at two addresses', 0.6, 0.3);
  if (q > 0) {
    ring(cx, cy, R, C.dim, q, 2);
    const aq = Q(S, 1, 'so their rotation has infinite order', 0.6);
    const nshow = Math.floor(clamp((u - lineAt(S, 1).s) / 9) * ANG_099.length);
    for (let k = 0; k < nshow; k++) { const an = ANG_099[k]; dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 6, k < 10 ? 'g' : 'c', q * 0.9); }
    lbl('(R_P R_Q)ᵏ , k = 1 … 160', cx, cy - 18, C.white, q, 17);
    lbl('θ / π = ' + (Math.acos((4 - 2 * Math.sqrt(5)) / 2) / Math.PI).toFixed(5), cx, cy + 16, C.gold, aq, 18);
    lbl('code |1 0 q 0 1 0⟩ , addresses b₀ and b₁', cx, cy + R + 44, C.dim, q, 16);
    const tq = Q(S, 1, 'trace product four minus two root five', 0.6);
    chip(1380, 262, 820, 56, 'Tr (R_P R_Q) = 4 Tr(PQ) − 2 = 4 − 2√5', C.gold, tq, 22);
    const cq = Q(S, 1, 'whose conjugate exceeds two', 0.6);
    chip(1380, 332, 820, 56, 'conjugate 4 + 2√5 > 2  ⇒  not a root of unity', C.mag, cq, 21);
    const lq = Q(S, 1, 'The closure is every logical unitary', 0.6);
    chip(1380, 410, 820, 62, 'closure = { U ∈ U(2) : det U ∈ μ₁₀ }', C.green, lq, 25);
    lbl('det K_P = det K_Q = ζ³ , a primitive tenth root', 1380, 468, C.dim, lq, 16);
    const px = 1010, py = 790, pw = 740, ph = 240, xS = n => px + (n - 1) / 17 * pw, yS = v => py - v / 0.85 * ph;
    plotAxes(px, py, pw, ph, aq, 'word length (positive words in K_P , K_Q)', 'best projective distance to H');
    BEST_099.forEach((v, i) => { dot(xS(i + 1), yS(v), 6, 'g', clamp(aq * 1.6 - i / 24)); if (i) line(xS(i), yS(BEST_099[i - 1]), xS(i + 1), yS(v), C.gold, aq * 0.6, 2); });
    lbl('length 18 : ' + BEST_099[17].toFixed(3), xS(18) - 4, yS(BEST_099[17]) - 16, C.gold, aq, 15, 'right');
  }
};

/* ---- 06 ENCODED UNIVERSALITY (V37 §7.3, §8) ---- */
SCENES.ladder = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'By the published Freedman–Larsen–Wang density theorem', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'On the thirteen-dimensional carrier', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With four n plus two sites', 0.6) * f1;
    chip(530, 262, 860, 58, 'H_n = span |10 β 010⟩ ,  β without adjacent 11', C.cyan, q, 21);
    const dq = Q(S, 0, 'two, thirteen, eighty-nine, six hundred ten', 0.6) * f1;
    const dims = [2, 13, 89, 610], fl = ['F₃', 'F₇', 'F₁₁', 'F₁₅'], by = 760;
    dims.forEach((v, i) => { const qq = clamp(dq * 1.5 - i / 5), h = Math.log10(v) / Math.log10(700) * 360, x = 220 + i * 190; fillBox(x, by - h, 120, h, C.gold, qq * 0.4); rect63(x, by - h, 120, h, C.gold, qq, 1.8); lbl(String(v), x + 60, by - h - 14, C.white, qq, 24); lbl('n = ' + (i + 1) + ' · ' + fl[i], x + 60, by + 28, C.dim, qq, 16); });
    lbl('dim H_n = F(4n − 1)  (log scale)', 530, 340, C.gold, dq, 18);
    const pq = Q(S, 0, 'By the published Freedman–Larsen–Wang density theorem', 0.6) * f1;
    box(1000, 240, 780, 170, C.cyan, pq, 2, 'rgba(0,25,40,0.45)');
    lbl('Freedman–Larsen–Wang , Theorem 0.1', 1390, 285, C.cyan, pq, 20);
    lbl('arXiv math/0103200 · Jones representation , r = 5', 1390, 325, C.dim, pq, 16);
    lbl('image dense : closure ⊇ SU(F(4n − 1)) , 4n ≥ 4 strands', 1390, 370, C.white, pq, 17);
    const tq = Q(S, 0, 'native words approximate every encoded n-qubit unitary', 0.6) * f1;
    chip(1390, 470, 780, 62, '‖K_w Ĵₙ − e^(iγ) Ĵₙ U‖ < ε ,  U ∈ U(2ⁿ)', C.green, tq, 22);
    const rows = [['1 , 1', 'τ', '1'], ['1 , τ', 'τ', '0'], ['τ , τ', 'τ', 'φ⁻¹'], ['τ , τ', '1', 'φ⁻²']];
    lbl('Jones–Wenzl table (outer labels , middle , projector entry)', 1390, 555, C.dim, tq, 15);
    rows.forEach((r, i) => { r.forEach((s, j) => cell99(1080 + j * 210, 575 + i * 52, 190, 44, s, j === 2 ? C.gold : C.cyan, tq, 17, 0.2)); });
    lbl('off-diagonal √(a(1 − a)) = φ^(−3/2) : the blocks of P', 1390, 805, C.dim, tq, 15);
  }
  const q = Q(S, 1, 'On the thirteen-dimensional carrier', 0.6, 0.3);
  if (q > 0) {
    lbl('the thirteen legal inner strings abcde of |10 abcde 010⟩', 530, 262, C.cyan, q, 17);
    const S13 = ['00000', '00001', '00010', '00100', '00101', '01000', '01001', '01010', '10000', '10001', '10010', '10100', '10101'];
    const code = { '00000': '0', '10000': '2', '01000': '3', '00100': '5', '10100': '25' };
    S13.forEach((s, i) => { const x = 150 + (i % 4) * 200, y = 300 + Math.floor(i / 4) * 105, c = code[s]; cell99(x, y, 180, 80, s + (c ? '  ·' + c : ''), c ? C.gold : C.cyan, clamp(q * 1.6 - i / 18), 21, c ? 0.4 : 0.15); });
    lbl('gold : the five modes L|s⟩ ;  R uses 00100 and 10100', 530, 760, C.gold, q, 18);
    const sq = Q(S, 1, 'the closure contains SU thirteen', 0.6);
    chip(1390, 262, 780, 60, 'seven addresses :  SU(13) ⊆ closure', C.green, sq, 24);
    lbl('recomputed : Lie algebra of the 7 projectors , dim 169 = dim u(13)', 1390, 326, C.dim, sq, 16);
    lbl('finite determinants + PU(13) density ⇒ SU(13)  (Lemma 8.1)', 1390, 356, C.dim, sq, 16);
    const cq = Q(S, 1, 'so words compile the three-axis code itself', 0.6);
    chip(1390, 450, 780, 62, '‖K_w R − L J U‖ < ε ,  phase exact', C.gold, cq, 25);
    lbl('G_U = V U V* + det(U)⁻¹ P_η + rest ∈ SU(13) ,  V = L J', 1390, 515, C.dim, cq, 16);
    const lq = Q(S, 1, 'Leakage is at most epsilon squared', 0.6);
    chip(1390, 610, 780, 60, 'Pr(outside the five modes) ≤ ε²', C.mag, lq, 24);
    const pq = Q(S, 1, 'stays within four epsilon', 0.6);
    chip(1390, 700, 780, 60, '| p₀ − 3 p₂₅ | ≤ 4ε ,  terminal TV ≤ ε', C.mag, pq, 24);
    lbl('recomputed on 200 perturbed implementations : all bounds hold', 1390, 765, C.dim, pq, 16);
  }
};

/* ---- 07 ERROR SERIES AND PROBABILITY (V37 §9–§10) ---- */
SCENES.series = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'a frozen Lean theorem says', 'lean']]);
  const f1 = 1 - Q(S, 1, 'Probability needs one more relation', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Errors form a series', 0.6) * f1;
    const px = 160, py = 790, pw = 760, ph = 480, xS = n => px + n / 40 * pw, yS = v => py - (Math.log10(Math.max(v, 1e-8)) + 7) / 8 * ph;
    plotAxes(px, py, pw, ph, q, 'n', '‖C_∞ − C_n‖  (log)');
    [1e-6, 1e-4, 1e-2, 1].forEach(v => lbl(v === 1 ? '1' : '1e' + Math.round(Math.log10(v)), px - 10, yS(v) + 6, C.dim, q, 14, 'right'));
    const bq = Q(S, 0, 'the epsilons are summable', 0.6) * f1;
    curve(p => { const n = p * 40; return [xS(n), yS(0.3 * Math.pow(0.7, n) / 0.3)]; }, 80, C.gold, bq, 3);
    lbl('bound Σ (j > n) ε_j', xS(26), yS(0.3 * Math.pow(0.7, 26) / 0.3) - 20, C.gold, bq, 16, 'left');
    const cq = Q(S, 0, 'converges to a unitary', 0.6) * f1;
    TAIL_099.forEach((v, n) => { if (v > 0) dot(xS(n), yS(v), 6, 'c', clamp(cq * 1.6 - n / 50)); });
    const aq = Q(S, 0, 'with tail at most the remaining sum', 0.6) * f1;
    ASTEP_099.forEach((v, n) => dot(xS(n + 1), yS(v), 5, 'r', aq * 0.8));
    lbl('red : ‖A_n − A_(n−1)‖ stays near 2 , the gates keep rotating', px + 20, yS(2) - 20, C.red, aq, 15, 'left');
    lbl('demo : five dimensions , 60 random gates , ε_j = 0.3 · 0.7^(j−1)', 530, 840, C.dim, q, 15);
    chip(1380, 265, 820, 58, 'C_n = A_n* B_n ,  ‖C_n − C_(n−1)‖ ≤ ε_n', C.cyan, q, 22);
    chip(1380, 345, 820, 58, 'Σ ε_j < ∞  ⇒  C_n → C_∞ , a unitary', C.green, bq, 23);
    chip(1380, 425, 820, 58, '‖C_∞ − C_n‖ ≤ Σ (j > n) ε_j', C.gold, aq, 23);
    lbl('A_n and B_n need not converge', 1380, 480, C.dim, aq, 16);
    chip(1380, 555, 820, 58, 'C*Δ + Δ*C + Δ*Δ = 0 ,  Δ = C_n − C_(n−1)', C.mag, aq, 21);
    lbl('readout : D(ρ̂ , ρ) ≤ √(δx² + δy² + δz²) / 2ν after projecting to the ball', 1380, 630, C.dim, aq, 15);
  }
  const q = Q(S, 1, 'Probability needs one more relation', 0.6, 0.3);
  if (q > 0) {
    lbl('one old terminal , 89 dimensions : three fixed events', 530, 262, C.cyan, q, 17);
    [['b₁ = 1', 34], ['b₁ = 0 , b₂ = 1', 21], ['b₁ = b₂ = 0', 34]].forEach(([lab, v], i) => { const x = 210 + i * 230, h = v * 9; fillBox(x, 640 - h, 140, h, C.cyan, q * 0.4); rect63(x, 640 - h, 140, h, C.cyan, q, 1.8); lbl('rank ' + v, x + 70, 625 - h, C.white, q, 20); lbl(lab, x + 70, 675, C.dim, q, 15); });
    lbl('any three effects at once , from one native word', 530, 720, C.dim, q, 15);
    const mq = Q(S, 1, 'program sequences approaching the same effect', 0.6);
    chip(1380, 265, 820, 60, 'E(C_k , A_k) → E  ⇒  P_(C_k)(A_k) → p(E)', C.cyan, mq, 22);
    lbl('cross-program matching : an extra premise , not implied by unitarity', 1380, 325, C.dim, mq, 15);
    const aq = Q(S, 1, 'Then probability is additive on effects', 0.6);
    chip(1380, 400, 820, 58, 'p(E + F) = p(E) + p(F) ,  p(I) = 1 ,  p ≥ 0', C.gold, aq, 22);
    const lq = Q(S, 1, 'a frozen Lean theorem says', 0.6);
    box(970, 470, 820, 210, C.green, lq, 2.5, 'rgba(0,40,20,0.5)');
    lbl('LEAN · FROZEN : effect_density_representation', 1380, 512, C.green, lq, 19);
    lblG('∃! ρ ⪰ 0 ,  Tr ρ = 1 :  p(E) = Tr(ρ E)  for every effect E', 1380, 568, C.white, lq, 22);
    lbl('D5/S3/Quantum/Foundation/EffectProbabilityExtension', 1380, 615, C.dim, lq, 15);
    lbl('state file present at the subject commit', 1380, 648, C.dim, lq, 15);
    lbl('ready seed v calibrated  ⇒  ρ = |v⟩⟨v|  (volume)', 1380, 730, C.orange, lq, 16);
  }
};

/* ---- 08 NO STOCHASTIC UPDATE (V37 §12–§14) ---- */
SCENES.nostoch = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For the golden phase gate', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'update themselves through a fixed stochastic matrix', 0.6) * f1;
    chip(530, 262, 860, 58, '∃ T ≥ 0 , columns sum to 1 :  T p(ρ) = p(UρU*)  ∀ ρ ?', C.cyan, q, 21);
    const px = 170, py = 760, pw = 740, ph = 400, xS = x => px + x / TAU * pw, yS = v => py - v / 0.2 * ph;
    const pq = Q(S, 0, 'Only for scalar phases', 0.6) * f1;
    plotAxes(px, py, pw, ph, pq, '', 'best stochastic residual');
    lbl('z-rotation angle θ', px + pw / 2, py + 26, C.dim, pq, 16);
    curve(p => { const x = p * TAU; let i = Math.min(RESID_099.length - 2, Math.floor(p * (RESID_099.length - 1))); const f = p * (RESID_099.length - 1) - i; return [xS(x), yS(RESID_099[i][1] * (1 - f) + RESID_099[i + 1][1] * f)]; }, 120, C.gold, pq, 3);
    RESID_099.forEach(r => dot(xS(r[0]), yS(r[1]), 5, 'g', pq));
    dot(xS(0), yS(0), 11, 'm', pq); dot(xS(TAU), yS(0), 11, 'm', pq);
    lbl('0', xS(0), py + 26, C.dim, pq, 15); lbl('2π', xS(TAU), py + 26, C.dim, pq, 15);
    lbl('zero only at θ = 0 , 2π  (recomputed , 41 conic programs)', 530, 820, C.mag, pq, 15);
    const tq = Q(S, 0, 'the feasible matrices form one family', 0.6) * f1;
    lbl('U = e^(iγ) I :  all feasible T', 1390, 265, C.gold, tq, 20);
    const M = [['1 − t', '0', '0', '0', '3t'], ['0', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '0'], ['t', '0', '0', '0', '1 − 3t']];
    mgrid(1100, 295, M, 116, 62, tq, { prog: clamp(tq * 1.4), colf: (v, i, j) => (v === '0' ? C.dim : (v === '1' ? C.cyan : C.gold)), size: 20 });
    const mq = Q(S, 0, 'mixing outcomes zero and twenty-five', 0.6) * f1;
    chip(1390, 650, 760, 56, '0 ≤ t ≤ 1/3 ,  order (0, 2, 3, 5, 25)', C.gold, mq, 22);
    lbl('weights ν(4√3 , √11 , 2 , √11) fix directions A and C  ⇒  R_U = I', 1390, 710, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'For the golden phase gate', 0.6, 0.3);
  if (q > 0) {
    chip(530, 262, 860, 58, 'U⋆ = diag(ζ , ζ²) : rotation by 3π/5 about z', C.gold, q, 22);
    const tq = Q(S, 1, 'take three known pure targets', 0.6);
    chip(530, 340, 860, 56, 'ρ₀ , ρ₁ = (I ± σz)/2 ,   ρ_d = (I − m·σ)/2', C.cyan, tq, 21);
    lbl('m = R⁻¹ n_B :  p₂(U⋆ ρ_d U⋆*) = 0 ;  p(ρ_d) ≥ ¼ (p(ρ₀) + p(ρ₁)) coordinatewise', 530, 398, C.dim, tq, 14);
    const dq = Q(S, 1, 'misses one of them by at least delta', 0.6);
    chip(530, 470, 860, 58, 'e₀ + e₁ + 4 e_d ≥ ν√11 = ' + NS_099.nus11.toFixed(4), C.mag, dq, 22);
    chip(530, 550, 860, 62, 'max_j e_j ≥ δ = ν√11 / 6 = ' + NS_099.delta.toFixed(5), C.gold, dq, 24);
    const fq = Q(S, 1, 'On the full ten-bit terminal the gap stays', 0.6);
    chip(530, 650, 860, 58, '1024 labels :  max_j r_j(K) ≥ δ − max_j d_j', C.green, fq, 22);
    lbl('ideal compilation α < δ/8 , β < δ/4 leaves a margin above δ/2', 530, 708, C.dim, fq, 15);
    const lq = Q(S, 1, 'about point zero seven one', 0.6);
    const bx = 1080, by = 740, hs = 560;
    [['δ', NS_099.delta, C.gold], ['LP optimum of max_j e_j', NS_099.lpmax, C.cyan], ['ν√11', NS_099.nus11, C.mag], ['LP optimum of e₀ + e₁ + 4e_d', NS_099.lpw, C.cyan]].forEach(([lab, v, col], i) => { const x = bx + i * 170, h = v * hs; fillBox(x, by - h, 110, h, col, lq * 0.4); rect63(x, by - h, 110, h, col, lq, 1.8); lbl(v.toFixed(3), x + 55, by - h - 12, C.white, lq, 18); lbl(lab.split(' of ')[0], x + 55, by + 26, col, lq, 14); if (lab.indexOf(' of ') > 0) lbl(lab.split(' of ')[1], x + 55, by + 48, col, lq, 14); });
    lbl('recomputed : linear programs over all stochastic 5 × 5 matrices', 1390, 262, C.dim, lq, 15);
    lbl('the bounds are not claimed optimal', 1390, 290, C.dim, lq, 15);
  }
};

/* ---- 09 COMPLETE PROCESSES (V38 §2–§5) ---- */
SCENES.choi = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'It is completely positive exactly when its Choi matrix is', 'classical'], [0, 'and shrinking the ball is not enough', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Four tetrahedral inputs give twelve means', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'acts on the moments as a five-by-five matrix', 0.6) * f1;
    lbl('Φ( (N I + v·σ)/2 ) = (N I + (T v + t N)·σ)/2', 530, 262, C.cyan, Q(S, 0, 'lifts the code to processes', 0.6) * f1, 18);
    const M = [['1', '0', '0', '0', '0'], ['b₁', 'T₁₁', 'T₁₂', 'T₁₃', '0'], ['b₂', 'T₂₁', 'T₂₂', 'T₂₃', '0'], ['b₃', 'T₃₁', 'T₃₂', 'T₃₃', '0'], ['−½Σb', '·', '·', '·', '1']];
    mgrid(250, 300, M, 112, 62, q, { prog: clamp(q * 1.4), colf: (v, i, j) => (v === '0' ? C.dim : (i === 4 ? C.mag : (j === 0 ? C.green : C.gold))), size: 19 });
    ['N', 'X', 'Y', 'Z', 'κ'].forEach((s, i) => lbl(s, 225, 340 + i * 62, C.white, q, 18, 'right'));
    lbl('b = c + ν t − T c ;  κ row : ½ 1ᵀ(I − T) on u', 530, 640, C.dim, q, 15);
    const kq = Q(S, 0, 'keeps the relation and composes exactly', 0.6) * f1;
    chip(530, 700, 860, 56, 'ℓ = N − X − Y − Z − 2κ kept ;  M(Φ₂Φ₁) = M(Φ₂) M(Φ₁)', C.green, kq, 20);
    const cq = Q(S, 0, 'It is completely positive exactly when its Choi matrix is', 0.6) * f1;
    chip(1390, 262, 780, 58, 'CPTP ⇔ C_Φ ⪰ 0 ;  Kraus rank = rank C_Φ ≤ 4', C.cyan, cq, 21);
    lbl('unitary ⇔ rank C_Φ = 1 ⇔ t = 0 , T ∈ SO(3)', 1390, 318, C.dim, cq, 16);
    const sq = Q(S, 0, 'and shrinking the ball is not enough', 0.6) * f1;
    const px = 1040, py = 800, pw = 700, ph = 340, xS = x => px + x * pw, yS = v => py - (v + 0.55) / 0.85 * ph;
    plotAxes(px, py, pw, ph, sq, 'λ', 'smallest Choi eigenvalue');
    line(px, yS(0), px + pw, yS(0), C.dim, sq * 0.6, 1.2);
    curve(p => { const i = Math.min(CHOI_099.length - 1, Math.round(p * (CHOI_099.length - 1))); return [xS(CHOI_099[i][0]), yS(CHOI_099[i][1])]; }, 50, C.gold, sq, 3);
    dot(xS(1 / 3), yS(0), 10, 'm', sq); lbl('λ = 1/3', xS(1 / 3) + 14, yS(0) - 14, C.mag, sq, 16, 'left');
    lbl('(1 − 3λ)/4 < 0 for λ > 1/3', xS(0.62), yS(-0.3) + 40, C.red, sq, 16);
    lbl('Φ_λ(X) = λ Xᵀ + (1 − λ) Tr X · I/2', 1390, 365, C.white, sq, 19);
    lbl('Bloch action λ · diag(1, −1, 1) : a strict contraction , not CP', 1390, 395, C.dim, sq, 15);
  }
  const q = Q(S, 1, 'Four tetrahedral inputs give twelve means', 0.6, 0.3);
  if (q > 0) {
    const v = v3(450, 500, 210, 0.6 + t * 0.25, 0.35);
    const RT = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(r => r.map(x => x / Math.sqrt(3)));
    curve(p => { const q2 = v(Math.cos(p * TAU), Math.sin(p * TAU), 0); return [q2[0], q2[1]]; }, 60, C.dim, q * 0.6, 1.4);
    curve(p => { const q2 = v(Math.cos(p * TAU), 0, Math.sin(p * TAU)); return [q2[0], q2[1]]; }, 60, C.dim, q * 0.6, 1.4);
    const Pp = RT.map(r => v(r[0], r[1], r[2]));
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(Pp[i][0], Pp[i][1], Pp[j][0], Pp[j][1], C.gold, q, 2.5);
    Pp.forEach((p, i) => { dot(p[0], p[1], 12, 'g', q); lbl('r' + i, p[0] + 18, p[1] - 10, C.gold, q, 18, 'left'); });
    lbl('Σ r_a = 0 ,  Σ r_a r_aᵀ = (4/3) I', 450, 790, C.dim, q, 16);
    const rq = Q(S, 1, 'that determine the process', 0.6);
    chip(1390, 262, 780, 60, 't = ¼ Σ s_a ,  T = ¾ Σ s_a r_aᵀ ,  s_a = (u_a − c)/ν', C.cyan, rq, 20);
    const nq = Q(S, 1, 'three inputs never suffice', 0.6);
    lbl('three inputs : Φ_dep ± εΔ agree on them , both CPTP', 1390, 320, C.red, nq, 16);
    const eq = Q(S, 1, 'The parameter error is an exact identity', 0.6);
    chip(1390, 390, 780, 60, '‖δt‖² + ⅓ ‖δT‖²_F = Σ ‖e_a‖² / 4ν²', C.gold, eq, 23);
    const bq = Q(S, 1, 'projecting onto valid processes keeps the bound', 0.6);
    const px = 1060, py = 800, pw = 640, ph = 300, mx = 0.6, xS = x => px + x / mx * pw, yS = y => py - y / mx * ph;
    plotAxes(px, py, pw, ph, bq, 'bound :  E/2ν (cyan) ,  √3E/2ν (gold)', 'observed after CPTP projection');
    dashed(xS(0), yS(0), xS(mx), yS(mx), C.red, bq, 1.6); lbl('y = x', xS(mx) - 6, yS(mx) + 22, C.red, bq, 14, 'right');
    const nu = NU99;
    FIT_099.forEach((r, i) => { const qq = clamp(bq * 1.6 - i / 30); dot(xS(r[0] / (2 * nu)), yS(r[1]), 6, 'c', qq); dot(xS(Math.sqrt(3) * r[0] / (2 * nu)), yS(r[2]), 6, 'g', qq); });
    lbl('24 noisy tables : single-system D and half-diamond (SDP)', 1380, 865, C.dim, bq, 15);
  }
};

/* ---- 10 RECORD CODES (V38 §6–§7) ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A coherent record can always be undone', 0.6);
  const labs = ['0', '2', '3', '5', '25'];
  if (f1 > 0) {
    const q = Q(S, 0, 'each readout sector needs rank at least r', 0.6) * f1;
    chip(530, 262, 860, 58, 'F*Π_s F = E_s ⊗ I_r  ⇔  rank Π_s ≥ r  for all s', C.cyan, q, 21);
    lbl('so a carrier needs 5r dimensions , and 5r suffice', 530, 320, C.dim, q, 16);
    const aq = Q(S, 0, 'Thirteen dimensions give ranks three, three, three, two, two', 0.6) * f1;
    REC_099.rk13.forEach((v, i) => { const x = 200 + i * 145, h = v * 40, y0 = 520; fillBox(x, y0 - h, 100, h, C.gold, aq * 0.4); rect63(x, y0 - h, 100, h, C.gold, aq, 1.8); lbl(String(v), x + 50, y0 - h - 10, C.white, aq, 20); lbl(labs[i], x + 50, y0 + 24, C.dim, aq, 15); });
    dashed(180, 520 - 2 * 40, 900, 520 - 2 * 40, C.red, aq, 2); lbl('r = 2', 905, 520 - 2 * 40 + 6, C.red, aq, 16, 'left');
    lbl('13 dimensions : sectors by prefix abc', 530, 352, C.gold, aq, 16);
    const bq = Q(S, 0, 'in eighty-nine, a twenty-path code keeps four', 0.6) * f1;
    REC_099.rk89.forEach((v, i) => { const x = 200 + i * 145, h = v * 7, y0 = 790; fillBox(x, y0 - h, 100, h, C.cyan, bq * 0.4); rect63(x, y0 - h, 100, h, C.cyan, bq, 1.8); lbl(String(v), x + 50, y0 - h - 10, C.white, bq, 20); lbl(labs[i], x + 50, y0 + 24, C.dim, bq, 15); });
    dashed(180, 790 - 4 * 7, 900, 790 - 4 * 7, C.red, bq, 2); lbl('r = 4', 905, 790 - 4 * 7 + 6, C.red, bq, 16, 'left');
    lbl('89 dimensions', 530, 590, C.cyan, bq, 16);
    lbl('L₈₉ |s, a₁a₂⟩ = |10 abc 0a₁ 0a₂ 00 010⟩ ,  F = L₈₉ (J ⊗ I₄)', 1390, 262, C.cyan, bq, 17);
    REC_099.pref.forEach((s, i) => { const x = 1000 + (i % 4) * 196, y = 295 + Math.floor(i / 4) * 64; cell99(x, y, 180, 50, s, C.green, clamp(bq * 1.6 - i / 26), 16, 0.18); });
    lbl('twenty distinct old ten-bit labels', 1390, 640, C.green, bq, 16);
    const nq = Q(S, 0, 'on the same ten-bit terminal', 0.6) * f1;
    chip(1390, 700, 780, 56, 'F*N_w F = E_s ⊗ |a⟩⟨a| ,  w = 10 abc 0a₁ 0a₂ 0', C.gold, nq, 20);
    lbl('final five-probability laws alone already fit in 13 dimensions', 1390, 760, C.dim, nq, 15);
  }
  const q = Q(S, 1, 'A coherent record can always be undone', 0.6, 0.3);
  if (q > 0) {
    chip(1390, 262, 780, 60, 'R(X) = W*XW + Tr[(I − WW*)X] τ', C.cyan, q, 23);
    lbl('W = Σ_a K_a ⊗ |a⟩ :  R(W ρ W*) = ρ for every input and reference', 1390, 320, C.dim, q, 15);
    const cq = Q(S, 1, 'Once the record is a classical label', 0.6);
    lbl('I(ρ) = Σ_a K_a ρ K_a* ⊗ |a⟩⟨a|', 1390, 400, C.white, cq, 20);
    const kq = Q(S, 1, 'each branch is a scaled unitary', 0.6);
    chip(1390, 470, 780, 62, 'recoverable ⇔ K_a* K_a = p_a I', C.green, kq, 25);
    lbl('nonzero branches : K_a = √p_a · U_a , read a then undo U_a', 1390, 530, C.dim, kq, 16);
    const px = 170, py = 760, pw = 720, ph = 420, xS = g => px + g * pw, yS = f => py - (f - 0.4) / 0.65 * ph;
    plotAxes(px, py, pw, ph, cq, 'damping γ', 'best recovery fidelity (SDP)');
    RECF_099.forEach((r, i) => { dot(xS(r[0]), yS(r[1]), 9, 'c', cq); lbl(r[1].toFixed(3), xS(r[0]) + (i === 4 ? -12 : 12), yS(r[1]) - 14, C.white, cq, 15, i === 4 ? 'right' : 'left'); if (i) line(xS(RECF_099[i - 1][0]), yS(RECF_099[i - 1][1]), xS(r[0]), yS(r[1]), C.cyan, cq * 0.6, 2); });
    dashed(px, yS(1), px + pw, yS(1), C.green, kq, 2); lbl('random-unitary branches : 1', px + pw, yS(1) - 14, C.green, kq, 15, 'right');
    lbl('amplitude damping , classical labels kept', 530, 290, C.cyan, cq, 16);
  }
};

/* ---- 11 AUTONOMY AND MEMORY (V38 §8–§9) ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A fixed finite memory cannot contract strictly forever', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'If a global unitary updates the system through its marginal alone', 0.6) * f1;
    chip(1390, 262, 780, 60, 'Tr_E(UρU*) = Φ(Tr_E ρ)  for all joint ρ', C.cyan, q, 22);
    const pq = Q(S, 0, 'it is a product', 0.6) * f1;
    chip(1390, 345, 780, 64, 'U = W ⊗ V ,   Φ(ρ) = W ρ W*', C.green, pq, 26);
    lbl('fixed ready inputs ρ ⊗ τ_E alone allow any CPTP map', 1390, 405, C.dim, pq, 15);
    const cq = Q(S, 0, 'A controlled-not fails', 0.6) * f1;
    [[0, '|+⟩ ⊗ |0⟩', 'S ends I/2 : mixed', C.red, 'plus with zero ends mixed'], [1, '|+⟩ ⊗ |+⟩', 'S ends |+⟩ : pure', C.green, 'plus with plus stays pure']].forEach(([k, inp, outp, col, ph]) => {
      const qq = Q(S, 0, ph, 0.6) * f1, y0 = 330 + k * 250;
      line(260, y0, 760, y0, C.white, cq, 2); line(260, y0 + 110, 760, y0 + 110, C.white, cq, 2);
      lbl('S', 240, y0 + 7, C.white, cq, 20, 'right'); lbl('E', 240, y0 + 117, C.white, cq, 20, 'right');
      dot(510, y0, 11, 'c', cq); line(510, y0, 510, y0 + 110, C.cyan, cq, 2.5); ring(510, y0 + 110, 20, C.cyan, cq, 2.5); line(490, y0 + 110, 530, y0 + 110, C.cyan, cq, 2.5);
      lbl(inp, 330, y0 - 20, C.gold, qq, 20); lbl(outp, 680, y0 - 20, col, qq, 19);
    });
    stamp('SAME MARGINAL , DIFFERENT OUTPUT', 1390, 560, Q(S, 0, 'from the same marginal', 0.6) * f1, C.red, 24, -0.04);
  }
  const q = Q(S, 1, 'A fixed finite memory cannot contract strictly forever', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 770, pw = 740, ph = 430, xS = m => px + m / 200 * pw, yS = v => py - v / 1.05 * ph;
    plotAxes(px, py, pw, ph, q, 'm', 'D( output of |0⟩ , output of |1⟩ )');
    const rq = Q(S, 1, 'distinguishability comes back', 0.6);
    DM_099.forEach((v, m) => dot(xS(m), yS(v), 3.5, 'c', clamp(q * 2 - m / 260)));
    curve(p => { const m = p * 200; return [xS(m), yS(Math.pow(ETA1_099, m))]; }, 100, C.gold, rq, 3);
    lbl('ηᵐ ,  η = ' + ETA1_099.toFixed(3), xS(14), yS(0.22), C.gold, rq, 16, 'left');
    lbl('fixed U on S ⊗ E (2 × 2) , same memory τ_E each run', 530, 262, C.dim, q, 16);
    chip(1390, 262, 780, 58, 'Uᵐᵏ → I  ⇒  D returns to D(ρ, σ)', C.cyan, rq, 22);
    stamp('NO STRICT CONTRACTION FOREVER', 1390, 360, rq, C.red, 22, -0.04);
    const eq = Q(S, 1, 'the contraction factor is the norm of T', 0.6);
    chip(1390, 470, 780, 58, 'η = ‖T‖_op  for  r ↦ T r + t', C.gold, eq, 23);
    const gq = Q(S, 1, 'errors add as a geometric series', 0.6);
    chip(1390, 550, 780, 58, 'e_(m+1) ≤ η e_m + δ_m', C.mag, gq, 23);
    chip(1390, 630, 780, 58, 'e_m ≤ ηᵐ e₀ + δ (1 − ηᵐ) / (1 − η)', C.mag, gq, 22);
    lbl('coherent chains : errors add as Σ ε_j , not Σ ε_j²', 1390, 690, C.dim, gq, 15);
  }
};

/* ---- 12 RANK BOUNDARY (V38 §10) ---- */
SCENES.rank = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Kappa is the radial margin', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "If two settings' system relations differ by eta", 0.6) * f1;
    chip(530, 262, 860, 58, 'A_S = Σ_i m_Si |z_Si⟩⟨z_Si| / t_Si ,   S = I , B', C.cyan, q, 21);
    lbl('unknown record weights m_Si ; targets t_Si = ‖z_Si‖² ;  X_S = X Sᵀ', 530, 318, C.dim, q, 15);
    const wq = Q(S, 0, 'each unknown weight lies within eta over four beta kappa', 0.6) * f1;
    chip(530, 395, 860, 64, '‖A_B − A_I‖ ≤ η  ⇒  |m_Si − t_Si| ≤ min{1, η / 4βκ}', C.gold, wq, 22);
    const bq = Q(S, 0, 'beta phi to the minus three halves', 0.6) * f1;
    chip(530, 480, 860, 56, 'B = ( −x , y ζ⁻¹ ; y ζ⁻¹ , −x ζ³ ) ,  x = φ⁻¹ , y = √x', C.mag, bq, 20);
    lbl('β = |B₀₀ B₁₀| = φ^(−3/2) = ' + K_099.beta.toFixed(4) + ' ,  1/4β = ' + (1 / (4 * K_099.beta)).toFixed(4), 530, 545, C.white, bq, 17);
    const kq = Q(S, 0, 'kappa the smallest Gram eigenvalue', 0.6) * f1;
    chip(530, 615, 860, 56, 'κ = λ_min(X*X) ,   initial setting : |m_Ii − t_Ii| ≤ t_I0 t_I1 η / βκ', C.green, kq, 19);
    const px = 1040, py = 770, pw = 700, ph = 400, yS = v => py - v / 1.1 * ph;
    plotAxes(px, py, pw, ph, wq, '3000 sampled contracts (sorted)', 'observed deviation / bound');
    dashed(px, yS(1), px + pw, yS(1), C.red, wq, 2); lbl('bound', px + pw - 6, yS(1) - 12, C.red, wq, 15, 'right');
    RAT_099.forEach((v, i) => dot(px + 8 + i * (pw - 16) / (RAT_099.length - 1), yS(v), 4, 'g', clamp(wq * 1.6 - i / 140)));
    lbl('largest ratio ' + RATMAX_099.toFixed(3), px + 30, yS(RATMAX_099) - 18, C.gold, wq, 15, 'left');
  }
  const q = Q(S, 1, 'Kappa is the radial margin', 0.6, 0.3);
  if (q > 0) {
    const cx = 420, cy = 500, R = 200, rr = 0.62, an = 0.7;
    ring(cx, cy, R, C.gold, q, 2.5);
    ctx.save(); ctx.globalAlpha = q * 0.1; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.restore();
    dot(cx, cy, 8, 'g', q); lbl('c', cx - 14, cy + 6, C.gold, q, 18, 'right');
    const ux = cx + R * rr * Math.cos(an), uy = cy - R * rr * Math.sin(an), sx2 = cx + R * Math.cos(an), sy2 = cy - R * Math.sin(an);
    line(cx, cy, ux, uy, C.dim, q, 2); dot(ux, uy, 10, 'c', q); lbl('u_G', ux - 12, uy - 14, C.cyan, q, 18, 'right');
    arrow(ux, uy, sx2, sy2, C.green, q, 3); lbl('margin', (ux + sx2) / 2 + 16, (uy + sy2) / 2 + 6, C.green, q, 17, 'left');
    lbl('the AURIC ball : radius ν', cx, cy + R + 36, C.gold, q, 16);
    chip(530, 790, 860, 56, 'κ = (1 − |r_G|)/2 = (ν − ‖u_G − c‖) / 2ν', C.green, q, 21);
    const nq = Q(S, 1, 'Without it no uniform bound exists', 0.6);
    const px = 1040, py = 690, pw = 700, ph = 340, xS = e => px + (e - 0) / 0.72 * pw, yS = v => py - v / 1.05 * ph;
    plotAxes(px, py, pw, ph, nq, 'ε  (κ = ε²)', 'near rank one');
    const iq = Q(S, 1, 'the isolation error vanishes', 0.6);
    curve(p => { const i = Math.min(CX_099.length - 1, Math.round(p * (CX_099.length - 1))); return [xS(CX_099[i][0]), yS(CX_099[i][1])]; }, 39, C.cyan, iq, 3);
    lbl('isolation error ε√(1 − ε²)', xS(0.36), yS(0.12), C.cyan, iq, 15, 'left');
    const dq = Q(S, 1, 'a weight stays off by one half', 0.6);
    line(xS(CX_099[0][0]), yS(0.5), xS(0.707), yS(0.5), C.red, dq, 3); lbl('|m − t| = 1/2', xS(0.05), yS(0.5) - 14, C.red, dq, 16, 'left');
    curve(p => { const i = Math.min(CX_099.length - 1, Math.round(p * (CX_099.length - 1))); return [xS(CX_099[i][0]), yS(CX_099[i][2])]; }, 39, C.gold, dq * 0.8, 2);
    lbl('Thm 10.2 bound (≥ 1/2 , never violated)', xS(0.03), yS(0.68), C.gold, dq, 14, 'left');
    stamp('NO UNIFORM BOUND', 1390, 272, dq, C.red, 26, -0.03);
    const bq = Q(S, 1, 'With a linear continuity modulus', 0.6);
    chip(1390, 790, 800, 56, '|m₀ − t₀| ≤ (L + 1/4β) η^(1/3) + η^(2/3)', C.gold, bq, 22);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The Freedman–Larsen–Wang density theorem is a published input', 'published'], [1, 'the Choi–Kraus form is classical', 'classical'], [1, 'the effect representation is a frozen Lean theorem', 'lean'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['BALL', 'u = u₀ + ν r', C.gold, 'Relations make a ball'], ['ROTATION', 'R_U ∈ SO(3)', C.cyan, 'unitaries rotate it'], ['GOLDEN GATE', 'det ∈ μ₁₀', C.mag, 'golden gates generate'], ['ERROR SERIES', 'Σ ε_j < ∞', C.green, 'errors sum'], ['FOUR INPUTS', '12 means', C.gold, 'four inputs fix a process'], ['RECORDS', 'rank Π_s ≥ r', C.cyan, 'records need rank'], ['AUTONOMY', 'U = W ⊗ V', C.mag, 'autonomy needs products'], ['MARGIN', 'η / 4βκ', C.green, 'weights need a margin']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 330 + (i % 4) * 420, y = 225 + Math.floor(i / 4) * 140, q = Q(S, 0, ph) * fade; box(x - 190, y, 380, 118, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 46, col, q, 20); lblG(a2, x, y + 92, C.white, q, 22); });
    lbl('PUBLISHED · Freedman–Larsen–Wang , Jones-representation density (arXiv math/0103200)', W / 2, 555, C.cyan, Q(S, 1, 'The Freedman–Larsen–Wang density theorem is a published input') * fade, 15);
    lbl('CLASSICAL · Choi–Kraus form (Watrous) · smearing support (Haapasalo–Pellonpää)', W / 2, 595, '#8fbcff', Q(S, 1, 'the Choi–Kraus form is classical') * fade, 15);
    lbl('LEAN · effect_density_representation · frozen general theorem cited by V37 §10', W / 2, 635, C.green, Q(S, 1, 'the effect representation is a frozen Lean theorem') * fade, 15);
    lbl('VOLUMES · Bloch code · lifts · golden closure · SU(13) compilation · series · no stochastic update · processes · records · autonomy · rank bound', W / 2, 675, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · ν , 4ν · trace 4 − 2√5 · words to H · dims and Lie dim 169 · tails · LP and δ · Choi curve · fits · ranks · fidelities · recurrence · ratios', W / 2, 715, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V37–V38 · GATES', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V37–V38 · 二元关系、黄金门与完整过程 · TRURETURING FILM 099', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A ball inside the pyramid, one gate at two addresses, four inputs per process, and a margin for record weights.', W / 2, 875, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V37–V38', gram: 'BINARY RELATIONS', ball: 'THE FIXED CODE', lift: 'LIFTS AND READOUT', golden: 'THE GOLDEN GATE', ladder: 'ENCODED UNIVERSALITY', series: 'ERROR SERIES', nostoch: 'NO STOCHASTIC UPDATE', choi: 'COMPLETE PROCESSES', records: 'RECORD CODES', memory: 'AUTONOMY AND MEMORY', rank: 'RANK BOUNDARY', finale: 'LEDGER' });

function poster099() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const PB = pyrBall99(390, 560, 330, 0.55, 1, { ball: 1 });
  dashed(PB.ctr[0], PB.ctr[1], 610, 450, C.gold, 0.6, 1.4);
  ballZoom99(760, 420, 160, 0.55, 1, { pts: BALLPTS_099, axes: 1 });
  txt('u = u₀ + ν r ,  ν = 1/(1 + 2√3 + √11)', 1360, 370, { size: 38, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('K = ζ[I + (ζ − 1)P] ,  det ∈ μ₁₀', 1360, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('|m − t| ≤ η / 4βκ', 1360, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('AURIC V37–V38', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V37–V38 · GATES', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('二 元 关 系 · 黄 金 门 · 完 整 过 程', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 099', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster099;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
