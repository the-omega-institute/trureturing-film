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

/* ---- film 101: AURIC V41–V42 · units, observer origins and the relation F[13] ---- */
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
const _po101 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po101.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po101.set(key, off); }
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
const FUNC101 = [[1, 1, 1, 1, 1], [0, 1, 0, 0, 1], [0, 0, 0, 1, 1], [0, 0, 1, 0, 0], [0, 0, 0, 0, 1]];
const LAWA101 = [0.5, 0.0, 0.0, 0.0, 0.5];
const LAWB101 = [0.0, 0.5, 0.0, 0.5, 0.0];
const ALG101 = [["C²", 2, 1], ["C⁴", 4, 3], ["M₂(C)", 4, 3], ["C⁵", 5, 4], ["M₅(C)", 25, 24], ["M₄(C)", 16, 15]];
const TET101 = [[0.1349, 0.1349], [0.0353, 0.0353], [0.1763, 0.1763], [1.5514, 1.5514], [0.0975, 0.0975], [2.3532, 2.3532], [0.0381, 0.0381], [0.3697, 0.3697], [0.3133, 0.3133], [0.487, 0.487], [0.9087, 0.9087], [1.0898, 1.0898], [0.7393, 0.7393], [0.5635, 0.5635], [0.1964, 0.1964], [0.8533, 0.8533], [0.5273, 0.5273], [0.2384, 0.2384], [0.6614, 0.6614], [1.3367, 1.3367], [0.5017, 0.5017], [0.9956, 0.9956], [0.4978, 0.4978], [2.6716, 2.6716], [0.5045, 0.5045], [1.853, 1.853], [0.3388, 0.3388], [1.0178, 1.0178], [0.2373, 0.2373], [0.86, 0.86], [0.2776, 0.2776], [1.4641, 1.4641], [0.1599, 0.1599], [0.999, 0.999], [0.3228, 0.3228], [0.6846, 0.6846], [0.021, 0.021], [1.2813, 1.2813], [0.0852, 0.0852], [0.8606, 0.8606], [0.3437, 0.3437], [1.3937, 1.3937], [0.288, 0.288], [1.1624, 1.1624], [0.7413, 0.7413], [1.9377, 1.9377], [0.9547, 0.9547], [1.2584, 1.2584], [0.7248, 0.7248], [0.6552, 0.6552], [0.4431, 0.4431], [1.2696, 1.2696], [0.2237, 0.2237], [1.5818, 1.5818], [0.1089, 0.1089], [1.0511, 1.0511], [0.1398, 0.1398], [1.3468, 1.3468], [0.27, 0.27], [1.824, 1.824], [0.1776, 0.1776], [1.123, 1.123], [0.2811, 0.2811], [0.4099, 0.4099], [0.2777, 0.2777], [2.0724, 2.0724], [0.5516, 0.5516], [2.3158, 2.3158], [0.1878, 0.1878], [1.6771, 1.6771], [0.0312, 0.0312], [0.9819, 0.9819], [0.2629, 0.2629], [0.8859, 0.8859], [0.007, 0.007], [2.6961, 2.6961], [0.0448, 0.0448], [0.4241, 0.4241], [0.7493, 0.7493], [0.7387, 0.7387]];
const REC101 = [[0.5928, 0.4072, 0.0], [0.0325, 0.6892, 0.2783], [0.1577, 0.774, 0.0683], [0.0105, 0.3226, 0.6669], [0.2022, 0.498, 0.2998], [0.003, 0.6911, 0.3058], [0.2085, 0.469, 0.3225], [0.0007, 0.6014, 0.3979], [0.0076, 0.1962, 0.7963], [0.0287, 0.3821, 0.5892], [0.0002, 0.0249, 0.975], [0.0071, 0.4367, 0.5561]];
const H5_101 = [[2, 1, 1, -2], [1, 2, 1, -2], [1, 1, 2, -1], [-2, -2, -1, 4]];
const H5E101 = [0.4475, 1.0, 1.6091, 6.9434];
const PA101 = [0.5, 0.0, 0.0, 0.0, 0.5];
const PB101 = [0.25, 0.25, 0.0, 0.25, 0.25];
const STAB101 = [[0.2604, 0.2604], [0.0664, 0.0664], [1.2806, 0.5585], [0.2999, 0.1295], [0.2774, 0.2774], [0.3657, 0.3657], [0.2778, 0.2778], [0.1573, 0.1573], [1.2066, 1.0492], [0.1868, 0.1821], [0.2131, 0.1242], [0.1441, 0.1441], [0.0635, 0.0635], [0.0392, 0.0392], [0.0342, 0.0342], [0.1575, 0.1575], [0.322, 0.322], [0.4511, 0.356], [0.0996, 0.0996], [0.311, 0.311], [0.1034, 0.1034], [0.0751, 0.0751], [0.0933, 0.0933], [0.0194, 0.0194], [0.273, 0.273], [0.0746, 0.0746], [0.0815, 0.0815], [0.0411, 0.0411], [1.3987, 1.2641], [0.2628, 0.2628], [0.3653, 0.3653], [0.3037, 0.3037], [0.0548, 0.0548], [0.0135, 0.0135], [0.2319, 0.1315], [0.2079, 0.2079], [0.0204, 0.0204], [0.1843, 0.1843], [0.1876, 0.1876], [0.1432, 0.1432], [0.4451, 0.4451], [0.0414, 0.0414], [0.4057, 0.2641], [0.2472, 0.2472], [0.2124, 0.157], [0.2412, 0.2412], [0.1976, 0.1976], [0.0572, 0.0572], [0.0671, 0.0671], [1.1954, 1.1954], [0.8433, 0.8433], [0.0548, 0.0548], [0.1795, 0.1795], [0.0028, 0.0028], [0.3537, 0.1146], [1.6906, 1.2043], [0.0129, 0.0129], [0.0512, 0.0512], [0.0825, 0.0825], [0.0553, 0.0553], [0.1975, 0.1975], [0.0235, 0.0235], [0.628, 0.2715], [0.2944, 0.2944], [0.1878, 0.1878], [0.1169, 0.1169], [0.0131, 0.0131], [0.1718, 0.1718], [0.065, 0.065], [0.0771, 0.0445], [0.0394, 0.0394], [0.4379, 0.4379], [0.8972, 0.6157], [0.0428, 0.0428], [0.1781, 0.1781], [0.0805, 0.0805], [0.1635, 0.149], [0.0377, 0.0377], [0.0803, 0.0803], [0.5236, 0.5236], [0.0088, 0.0088], [1.8766, 1.5716], [1.0958, 0.6815], [0.1093, 0.1093], [0.2117, 0.2117], [0.1797, 0.1719], [0.0768, 0.0768], [0.0488, 0.0346], [0.014, 0.014], [1.0831, 1.0831]];
const EPSC101 = [[0.02, 0.9992], [0.06, 0.9928], [0.1, 0.9802], [0.14, 0.9616], [0.18, 0.9372], [0.22, 0.9077], [0.26, 0.8734], [0.3, 0.8349], [0.34, 0.7928], [0.38, 0.7476], [0.42, 0.7001], [0.46, 0.6507], [0.5, 0.6], [0.54, 0.5485], [0.58, 0.4966], [0.62, 0.4447], [0.66, 0.3931], [0.7, 0.3423], [0.74, 0.2923], [0.78, 0.2435], [0.82, 0.1959], [0.86, 0.1497], [0.9, 0.105], [0.94, 0.0618], [0.98, 0.0202]];
const PTS101 = [-0.5, 0.5, 0.5, 0.5];
const QV101 = [0, 2, 3, 5, 7];
const Q2V101 = [0, 4, 9, 25, 49];
const FIB101 = {"X": 0.4, "Y": 0.5, "Z": 0.2, "r": 0.8, "L": 0.09999999999999998, "U": 0.4, "w": 0.30000000000000004};
const ENT101 = [[0.1, 1.84644], [0.1025, 1.87224], [0.105, 1.8929], [0.1075, 1.91154], [0.11, 1.92881], [0.1125, 1.94504], [0.115, 1.9604], [0.1175, 1.97503], [0.12, 1.989], [0.1225, 2.0024], [0.125, 2.01526], [0.1275, 2.02763], [0.13, 2.03955], [0.1325, 2.05103], [0.135, 2.06212], [0.1375, 2.07282], [0.14, 2.08315], [0.1425, 2.09314], [0.145, 2.10279], [0.1475, 2.11211], [0.15, 2.12113], [0.1525, 2.12984], [0.155, 2.13826], [0.1575, 2.14639], [0.16, 2.15424], [0.1625, 2.16183], [0.165, 2.16915], [0.1675, 2.17621], [0.17, 2.18302], [0.1725, 2.18958], [0.175, 2.19589], [0.1775, 2.20197], [0.18, 2.20781], [0.1825, 2.21342], [0.185, 2.2188], [0.1875, 2.22395], [0.19, 2.22888], [0.1925, 2.2336], [0.195, 2.23809], [0.1975, 2.24237], [0.2, 2.24644], [0.2025, 2.2503], [0.205, 2.25395], [0.2075, 2.25739], [0.21, 2.26063], [0.2125, 2.26366], [0.215, 2.26649], [0.2175, 2.26912], [0.22, 2.27155], [0.2225, 2.27379], [0.225, 2.27582], [0.2275, 2.27766], [0.23, 2.27931], [0.2325, 2.28075], [0.235, 2.28201], [0.2375, 2.28307], [0.24, 2.28394], [0.2425, 2.28461], [0.245, 2.28509], [0.2475, 2.28538], [0.25, 2.28548], [0.2525, 2.28538], [0.255, 2.28509], [0.2575, 2.28461], [0.26, 2.28394], [0.2625, 2.28307], [0.265, 2.28201], [0.2675, 2.28075], [0.27, 2.27931], [0.2725, 2.27766], [0.275, 2.27582], [0.2775, 2.27379], [0.28, 2.27155], [0.2825, 2.26912], [0.285, 2.26649], [0.2875, 2.26366], [0.29, 2.26063], [0.2925, 2.25739], [0.295, 2.25395], [0.2975, 2.2503], [0.3, 2.24644], [0.3025, 2.24237], [0.305, 2.23809], [0.3075, 2.2336], [0.31, 2.22888], [0.3125, 2.22395], [0.315, 2.2188], [0.3175, 2.21342], [0.32, 2.20781], [0.3225, 2.20197], [0.325, 2.19589], [0.3275, 2.18958], [0.33, 2.18302], [0.3325, 2.17621], [0.335, 2.16915], [0.3375, 2.16183], [0.34, 2.15424], [0.3425, 2.14639], [0.345, 2.13826], [0.3475, 2.12984], [0.35, 2.12113], [0.3525, 2.11211], [0.355, 2.10279], [0.3575, 2.09314], [0.36, 2.08315], [0.3625, 2.07282], [0.365, 2.06212], [0.3675, 2.05103], [0.37, 2.03955], [0.3725, 2.02763], [0.375, 2.01526], [0.3775, 2.0024], [0.38, 1.989], [0.3825, 1.97503], [0.385, 1.9604], [0.3875, 1.94504], [0.39, 1.92881], [0.3925, 1.91154], [0.395, 1.8929], [0.3975, 1.87224], [0.4, 1.84644]];
const KSTAR101 = 0.25;
const HSTAR101 = 2.28548;
const KTH101 = [[-8.0, 0.00719], [-7.8, 0.00794], [-7.6, 0.00875], [-7.4, 0.00965], [-7.2, 0.01064], [-7.0, 0.01172], [-6.8, 0.01292], [-6.6, 0.01423], [-6.4, 0.01567], [-6.2, 0.01724], [-6.0, 0.01897], [-5.8, 0.02086], [-5.6, 0.02293], [-5.4, 0.02519], [-5.2, 0.02766], [-5.0, 0.03034], [-4.8, 0.03327], [-4.6, 0.03645], [-4.4, 0.0399], [-4.2, 0.04364], [-4.0, 0.04768], [-3.8, 0.05204], [-3.6, 0.05674], [-3.4, 0.06179], [-3.2, 0.06719], [-3.0, 0.07297], [-2.8, 0.07913], [-2.6, 0.08567], [-2.4, 0.09259], [-2.2, 0.0999], [-2.0, 0.10758], [-1.8, 0.11562], [-1.6, 0.12401], [-1.4, 0.13272], [-1.2, 0.14174], [-1.0, 0.15102], [-0.8, 0.16052], [-0.6, 0.17022], [-0.4, 0.18007], [-0.2, 0.19001], [0.0, 0.2], [0.2, 0.20999], [0.4, 0.21993], [0.6, 0.22978], [0.8, 0.23948], [1.0, 0.24898], [1.2, 0.25826], [1.4, 0.26728], [1.6, 0.27599], [1.8, 0.28438], [2.0, 0.29242], [2.2, 0.3001], [2.4, 0.30741], [2.6, 0.31433], [2.8, 0.32087], [3.0, 0.32703], [3.2, 0.33281], [3.4, 0.33821], [3.6, 0.34326], [3.8, 0.34796], [4.0, 0.35232], [4.2, 0.35636], [4.4, 0.3601], [4.6, 0.36355], [4.8, 0.36673], [5.0, 0.36966], [5.2, 0.37234], [5.4, 0.37481], [5.6, 0.37707], [5.8, 0.37914], [6.0, 0.38103], [6.2, 0.38276], [6.4, 0.38433], [6.6, 0.38577], [6.8, 0.38708], [7.0, 0.38828], [7.2, 0.38936], [7.4, 0.39035], [7.6, 0.39125], [7.8, 0.39206], [8.0, 0.39281]];
const KTH2_101 = [[-8.0, 0.1004], [-7.8, 0.10049], [-7.6, 0.10059], [-7.4, 0.10073], [-7.2, 0.10088], [-7.0, 0.10108], [-6.8, 0.10131], [-6.6, 0.10159], [-6.4, 0.10193], [-6.2, 0.10235], [-6.0, 0.10284], [-5.8, 0.10344], [-5.6, 0.10416], [-5.4, 0.10501], [-5.2, 0.10603], [-5.0, 0.10723], [-4.8, 0.10864], [-4.6, 0.11029], [-4.4, 0.11221], [-4.2, 0.11443], [-4.0, 0.11697], [-3.8, 0.11987], [-3.6, 0.12315], [-3.4, 0.12683], [-3.2, 0.13092], [-3.0, 0.13545], [-2.8, 0.14042], [-2.6, 0.14584], [-2.4, 0.15171], [-2.2, 0.15802], [-2.0, 0.16477], [-1.8, 0.17193], [-1.6, 0.17949], [-1.4, 0.18742], [-1.2, 0.19569], [-1.0, 0.20426], [-0.8, 0.21309], [-0.6, 0.22212], [-0.4, 0.23132], [-0.2, 0.24063], [0.0, 0.25], [0.2, 0.25937], [0.4, 0.26868], [0.6, 0.27788], [0.8, 0.28691], [1.0, 0.29574], [1.2, 0.30431], [1.4, 0.31258], [1.6, 0.32051], [1.8, 0.32807], [2.0, 0.33523], [2.2, 0.34198], [2.4, 0.34829], [2.6, 0.35416], [2.8, 0.35958], [3.0, 0.36455], [3.2, 0.36908], [3.4, 0.37317], [3.6, 0.37685], [3.8, 0.38013], [4.0, 0.38303], [4.2, 0.38557], [4.4, 0.38779], [4.6, 0.38971], [4.8, 0.39136], [5.0, 0.39277], [5.2, 0.39397], [5.4, 0.39499], [5.6, 0.39584], [5.8, 0.39656], [6.0, 0.39716], [6.2, 0.39765], [6.4, 0.39807], [6.6, 0.39841], [6.8, 0.39869], [7.0, 0.39892], [7.2, 0.39912], [7.4, 0.39927], [7.6, 0.39941], [7.8, 0.39951], [8.0, 0.3996]];
const THJ101 = [0.69315, -0.28768, 0.10536, -0.04082, 0.0155, -0.00593, 0.00227, -0.00087, 0.00033, -0.00013];
const TAIL101 = [[0, 0.046209, 0.115212], [1, 0.019865, 0.045897], [2, 0.007191, 0.017129], [3, 0.0028, 0.006593], [4, 0.001061, 0.00251], [5, 0.000407, 0.00096], [6, 0.000155, 0.000367], [7, 5.9e-05, 0.00014], [8, 2.3e-05, 5.3e-05], [9, 9e-06, 2e-05], [10, 3e-06, 8e-06]];
const REFB101 = [[0.0217, 0.6974, 0.2809], [0.0127, 0.7049, 0.2824], [0.2524, 0.3151, 0.4325], [0.0332, 0.6287, 0.3382], [0.026, 0.5694, 0.4046], [0.1956, 0.3763, 0.4282], [0.022, 0.6381, 0.34], [0.0717, 0.4989, 0.4295], [0.2981, 0.378, 0.3239], [0.0731, 0.4795, 0.4474], [0.3861, 0.4811, 0.1328], [0.1765, 0.4181, 0.4054]];
const ELL101 = [[0.6141, 0.3838, -0.7843], [-0.6188, -0.3984, 0.7175], [-0.0396, 0.0139, -0.9657], [0.1817, -0.1958, 0.926], [-0.1889, 0.0074, 0.4059], [-0.8518, -0.5343, -0.2982], [0.6545, 0.4406, -0.7446], [0.7162, 0.434, -0.5364], [0.6143, 0.8746, 0.2854], [-0.1935, -0.148, 0.9793], [-0.056, -0.0588, 0.07], [-0.6257, 0.0561, -0.2652], [0.0069, 0.8694, -0.0044], [0.1421, 0.778, 0.0346], [0.2197, 0.3649, 0.056], [0.3342, 0.2186, 0.9406], [0.0797, 0.0974, 0.4196], [0.4801, 0.1005, 0.0999], [0.349, 0.7574, -0.6521], [-0.5013, 0.118, 0.4832], [-0.629, -0.5894, 0.6665], [-0.9061, -0.5787, -0.3973], [0.1674, 0.1504, -0.2335], [-0.0866, 0.4999, -0.3154], [0.0244, 0.8759, 0.0694], [0.9508, 0.2613, 0.1265], [-0.2362, 0.4734, 0.3799], [0.1271, 0.9178, 0.1046], [0.1275, -0.5774, 0.5425], [-0.5996, -0.445, 0.5823], [0.1167, -0.8006, -0.0529], [-0.2665, 0.4925, 0.2718], [0.0131, 0.6374, -0.2899], [0.7097, 0.8366, -0.4323], [-0.878, -0.3988, -0.4693], [0.3883, 0.451, -0.1195], [0.2171, 0.6347, 0.764], [0.1657, -0.1564, -0.2973], [0.2147, -0.0437, -0.0653], [-0.6801, 0.1965, 0.392], [0.0522, -0.7348, 0.3828], [-0.3835, -0.2373, -0.0575], [-0.1804, -0.3498, 0.9368], [-0.7668, 0.1508, -0.0391], [0.445, 0.0978, -0.8565], [0.0844, 0.5553, -0.8011], [0.3638, 0.1056, -0.7579], [-0.1721, -0.7785, 0.4038], [-0.4162, 0.1127, -0.8304], [0.6835, -0.0409, 0.0748], [-0.0397, 0.3139, -0.4916], [0.5456, -0.2721, 0.5535], [-0.2212, -0.7085, -0.1197], [0.1173, 0.2186, -0.4563], [0.8014, 0.0494, -0.4396], [-0.4103, 0.3406, 0.1195], [0.3441, 0.31, 0.427], [-0.9935, -0.5421, 0.1008], [0.7864, 0.6843, 0.1229], [0.6948, 0.2647, 0.614], [-0.089, 0.7702, -0.3273], [0.8291, 0.5777, -0.4985], [-0.4696, -0.346, 0.1658], [0.1804, 0.9276, 0.1799], [0.5651, -0.3142, 0.2619], [-0.6564, -0.2588, 0.6813], [-0.097, -0.4702, 0.8681], [-0.1732, -0.0448, -0.8707], [0.1951, 0.2081, -0.7532], [-0.0401, 0.602, 0.6946], [-0.3124, -0.2333, 0.3318], [0.6284, 0.3889, 0.2207], [-0.2442, -0.3829, -0.9218], [0.0259, -0.6984, -0.2073], [-0.0103, 0.0127, 0.5922], [0.4294, -0.5671, -0.0256], [0.0286, 0.7964, 0.1637], [0.8768, 0.812, -0.0959], [0.567, -0.4187, -0.1447], [-0.3875, -0.2299, 0.1101], [-0.5584, -0.6587, 0.1103], [-0.8353, 0.0357, -0.1685], [-0.1992, 0.273, -0.8793], [0.9486, 0.3873, 0.281], [-0.7273, 0.1512, 0.3427], [0.2062, -0.6145, 0.1801], [0.2542, 0.3559, 0.9093], [0.6334, 0.2752, 0.7723], [-0.2206, 0.169, 0.7255], [-0.7166, -0.4474, -0.2839], [-0.3485, -0.7692, -0.6376], [0.2429, 0.8801, -0.1188], [0.5055, -0.1175, 0.0899], [-0.0104, -0.7067, 0.5863], [-0.0038, -0.1435, -0.3657], [-0.0846, -0.012, 0.3719], [-0.1952, -0.7468, -0.6325], [-0.1297, -0.424, 0.177], [-0.5182, -0.0877, 0.2057], [-0.529, -0.7179, 0.6678], [-0.0096, 0.3659, 0.2192], [0.7975, 0.5859, 0.1038], [0.1431, 0.4777, -0.8715], [-0.0092, 0.0263, -0.0124], [-0.1584, -0.4863, 0.5383], [0.141, 0.7638, -0.5824], [0.8006, 0.4212, 0.505], [-0.2763, 0.3795, 0.5487], [0.3366, -0.6471, 0.0173], [-0.3347, -0.3226, -0.4526], [0.6722, 0.503, -0.6609], [0.5842, 0.923, 0.3578], [-0.4334, -0.2464, 0.6228], [0.2157, -0.2833, -0.7158], [-0.3035, -0.6885, -0.7237], [0.1157, -0.2932, -0.6394], [-0.8094, -0.1053, 0.046], [0.617, 0.9512, 0.262], [-0.2385, -0.0074, -0.6521], [0.1668, -0.2901, 0.0693], [0.522, 0.4307, 0.8301], [-0.0615, -0.1039, -0.4184], [-0.2839, 0.0256, 0.1073], [-0.9377, -0.6944, 0.2299], [-0.08, 0.7077, 0.4218], [0.7833, -0.1231, 0.1748], [0.2495, -0.0492, 0.9473], [0.1745, 0.6006, 0.4454], [-0.2931, -0.0481, 0.0718], [0.9046, 0.7121, -0.3028], [-0.6719, -0.3583, -0.248], [0.5569, 0.5731, 0.2584], [0.268, 0.2322, -0.9567], [0.4178, -0.4406, 0.28], [-0.7617, -0.4075, 0.2893], [-0.6244, -0.671, 0.6622], [-0.0389, 0.6428, 0.2081], [-0.397, -0.7602, -0.5174], [-0.2242, 0.4826, 0.6914], [-0.3078, 0.2762, -0.8102], [0.3746, -0.5014, -0.0228], [-0.8477, -0.8681, 0.1351], [-0.4804, 0.277, 0.0012], [-0.6987, -0.4334, 0.5055], [-0.619, -0.0496, 0.7258], [-0.3321, -0.8319, -0.1326], [0.2284, 0.5196, -0.6639], [0.0457, -0.6675, -0.602], [-0.6707, -0.8277, 0.0115], [0.5256, 0.005, -0.335], [0.2633, -0.6895, -0.1776], [-0.1145, 0.6614, 0.1565], [0.3067, -0.5165, 0.5169], [0.9254, 0.7691, 0.1358], [-0.1802, -0.7917, -0.3072], [-0.7764, 0.0258, 0.3352], [-0.0918, 0.243, 0.9382], [0.3676, 0.8301, 0.364], [-0.2836, -0.901, -0.2604], [0.5287, 0.9559, 0.2877]];
const CONDR101 = [0.8166, 1.4137];
const CONDC101 = [[0.0, 1.0, 1.0], [0.02, 1.01, 0.9899], [0.04, 1.0198, 0.9798], [0.06, 1.0296, 0.9695], [0.08, 1.0392, 0.9592], [0.1, 1.0488, 0.9487], [0.12, 1.0583, 0.9381], [0.14, 1.0677, 0.9274], [0.16, 1.077, 0.9165], [0.18, 1.0863, 0.9055], [0.2, 1.0954, 0.8944], [0.22, 1.1045, 0.8832], [0.24, 1.1136, 0.8718], [0.26, 1.1225, 0.8602], [0.28, 1.1314, 0.8485], [0.3, 1.1402, 0.8367], [0.32, 1.1489, 0.8246], [0.34, 1.1576, 0.8124], [0.36, 1.1662, 0.8], [0.38, 1.1747, 0.7874], [0.4, 1.1832, 0.7746], [0.42, 1.1916, 0.7616], [0.44, 1.2, 0.7483], [0.46, 1.2083, 0.7348], [0.48, 1.2166, 0.7211], [0.5, 1.2247, 0.7071], [0.52, 1.2329, 0.6928], [0.54, 1.241, 0.6782], [0.56, 1.249, 0.6633], [0.58, 1.257, 0.6481], [0.6, 1.2649, 0.6325], [0.62, 1.2728, 0.6164], [0.64, 1.2806, 0.6], [0.66, 1.2884, 0.5831], [0.68, 1.2961, 0.5657], [0.7, 1.3038, 0.5477], [0.72, 1.3115, 0.5292], [0.74, 1.3191, 0.5099], [0.76, 1.3266, 0.4899], [0.78, 1.3342, 0.469], [0.8, 1.3416, 0.4472], [0.82, 1.3491, 0.4243], [0.84, 1.3565, 0.4], [0.86, 1.3638, 0.3742], [0.88, 1.3711, 0.3464], [0.9, 1.3784, 0.3162], [0.92, 1.3856, 0.2828], [0.94, 1.3928, 0.2449], [0.96, 1.4, 0.2], [0.98, 1.4071, 0.1414]];
const TREEB101 = [[0.2605, 0.2187], [0.3891, 0.1515], [0.3874, 0.2882], [0.1569, 0.0796], [0.3098, 0.1616], [0.528, 0.226], [0.1356, 0.1031], [0.3841, 0.12], [0.4354, 0.245], [0.0994, 0.0867], [0.3523, 0.1527], [0.45, 0.2798], [0.3858, 0.2782], [0.1972, 0.1178], [0.2454, 0.0897], [0.3168, 0.2045], [0.3476, 0.1753], [0.3301, 0.1446], [0.2565, 0.1628], [0.4159, 0.2423], [0.1551, 0.0697], [0.1911, 0.1152], [0.2976, 0.1195], [0.462, 0.2722], [0.2724, 0.2083], [0.4767, 0.2419], [0.3994, 0.2983], [0.0717, 0.0514], [0.2657, 0.1006], [0.1736, 0.0883], [0.4251, 0.2124], [0.5714, 0.3492], [0.8181, 0.3983], [0.1373, 0.0907], [0.5521, 0.3798], [0.6833, 0.1402], [0.6148, 0.3043], [0.5206, 0.3334], [0.2649, 0.1245], [0.096, 0.0516], [0.3842, 0.2109], [0.4268, 0.2784], [0.7629, 0.567], [0.7384, 0.2419], [0.4374, 0.2378], [0.043, 0.0252], [0.5796, 0.378], [0.7631, 0.3231], [0.4307, 0.2427], [0.307, 0.1382], [0.244, 0.0778], [0.3027, 0.2459], [0.3387, 0.188], [0.1469, 0.0886], [0.2886, 0.1705], [0.5632, 0.3725], [0.3163, 0.118], [0.2703, 0.2], [0.2754, 0.1308], [0.3373, 0.2267], [0.2575, 0.1578], [0.5516, 0.4095], [0.5028, 0.3472], [0.1846, 0.0935], [0.3963, 0.23], [0.2915, 0.1722], [0.5779, 0.365], [0.309, 0.1059], [0.2286, 0.0895], [0.1732, 0.1132], [0.5744, 0.2977], [0.533, 0.3802], [0.3534, 0.2248], [0.2482, 0.094], [0.6648, 0.4379], [0.1946, 0.1323], [0.31, 0.1289], [0.5478, 0.3503], [0.1723, 0.1044], [0.4783, 0.2574], [0.5214, 0.3512], [0.3118, 0.1985], [0.3494, 0.1918], [0.6528, 0.4279], [0.1376, 0.0689], [0.4613, 0.2588], [0.4832, 0.2676], [0.7718, 0.4539], [0.5283, 0.1628], [0.6876, 0.3285]];
const PREF101 = [0.236068, 0.381966, 0.381966];
/* ---- film 101 helpers ---- */
function ell101(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll101(cx, cy, rx, ry, col, a, rot = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell101(x, y, w, h, s, col, a, size = 20, fillA = 0.35, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, tc, a, size); }
const L101 = ['N', '1', '2', '3', '13'];
/* the five-mode pyramid with logical labels; hl marks highlighted modes */
function pyr101(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), P = MODES63.map(m => v(m[1][0] - 0.5, m[1][1] - 0.5, m[1][2] - 0.35));
  if (o.fill) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * o.fill);
  PEDGE63.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.45, 1.8));
  if (o.joint) { line(P[1][0], P[1][1], P[4][0], P[4][1], C.gold, a * o.joint, 4); line(P[3][0], P[3][1], P[4][0], P[4][1], C.gold, a * o.joint, 4); }
  MODES63.forEach((m, k) => { const h = o.hl ? o.hl[k] : 0; dot(P[k][0], P[k][1], 13 + 7 * h, m[2], a); lbl(L101[k], P[k][0] + (k === 2 ? 0 : 30), P[k][1] + (k === 2 ? -26 : 8), h ? C.gold : C.white, a, o.ls || 22, k === 2 ? 'center' : 'left'); });
  return P;
}
/* Bloch sphere outline; bp101 maps a Bloch vector to the drawing (x right, z up, y as depth) */
function sph101(cx, cy, R, a, col = C.cyan) {
  if (a <= 0) return;
  fillEll101(cx, cy, R, R, col, a * 0.05);
  ring(cx, cy, R, col, a * 0.65, 1.8);
  ell101(cx, cy, R, R * 0.3, col, a * 0.35, 1.2, 0, 1);
  dashed(cx, cy - R - 18, cx, cy + R + 18, C.dim, a * 0.45, 1.2);
}
function bp101(cx, cy, R, r) { return [cx + r[0] * R - r[1] * R * 0.32, cy - r[2] * R + r[1] * R * 0.2]; }
const TV101 = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
/* tetrahedron with vertices (1,1,1),(1,-1,-1),(-1,1,-1),(-1,-1,1), optionally inside the cube [-1,1]^3 */
function tetra101(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, o.tilt == null ? 0.42 : o.tilt), V = TV101.map(p => v(...p));
  if (o.cube) {
    const cn = []; for (let m = 0; m < 8; m++) cn.push([(m & 1) ? 1 : -1, (m & 2) ? 1 : -1, (m & 4) ? 1 : -1]);
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = cn[i].reduce((s2, x, k) => s2 + (x !== cn[j][k] ? 1 : 0), 0); if (d === 1) { const A = v(...cn[i]), B = v(...cn[j]); dashed(A[0], A[1], B[0], B[1], '#8fbcff', a * 0.55, 1.3); } }
  }
  [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]].forEach(f => fillPoly(f.map(i => V[i]), o.col || C.cyan, a * 0.07));
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(V[i][0], V[i][1], V[j][0], V[j][1], o.col || C.cyan, a * 0.85, 2.2);
  V.forEach((p, i) => { dot(p[0], p[1], 12, 'g', a); if (o.labs) lbl(o.labs[i], p[0] + (p[0] > cx ? 18 : -18), p[1] + (p[1] > cy ? 30 : -14), C.gold, a, 17, p[0] > cx ? 'left' : 'right'); });
  return { v, V };
}
function stack101(x0, y0, data, bw, gap, hs, cols, a) {
  if (a <= 0) return;
  data.forEach((r, i) => { const qq = clamp(a * 1.6 - i / 16); let y = y0; const x = x0 + i * (bw + gap); r.forEach((v, k) => { const h = v * hs; if (h > 0.2) { fillBox(x, y - h, bw, h, cols[k], qq * 0.5); rect63(x, y - h, bw, h, cols[k], qq, 1.2); } y -= h; }); });
  dashed(x0 - 8, y0 - hs, x0 + data.length * (bw + gap), y0 - hs, C.white, a * 0.7, 1.4);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pyr101(470, 480, 330, 0.6 + t * 0.2, s0, { fill: 0.1, joint: 0.8 * s0, hl: [0, 1, 0, 1, 1] });
  lblG('e₁₃ = ξη', 470, 760, C.gold, s0, 30);
  const items = [['what a fixed visible window forgets', 'VERSION 40 · VISIBLE WINDOW', 'what a compressed view forgets', C.cyan], ['what normalisation actually fixes', 'NORMALISATION', 'ω(1) = 1 : a condition on the unit', C.gold], ['where an observer sits as an origin', 'OBSERVER ORIGIN', 'a reference state ρ_O as the coordinate origin', C.green], ['ties two ends together as a relation', 'F[13] AS A RELATION', 'e₁₃ = ξη   ·   AB = S + iC', C.mag]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr101(W / 2, 420, 300, 0.5 + t * 0.25, rp * 0.9, { fill: 0.1, joint: 0.8 * rp, hl: [0, 1, 0, 1, 1], ls: 20 });
  chip(330, 330, 330, 58, 'unit 1 ≠ e_N', C.gold, rp, 22); chip(330, 415, 330, 58, 'mass + Bloch point', C.cyan, rp, 22); chip(330, 500, 330, 58, 'observer origin', C.green, rp, 22);
  box(1420, 320, 380, 200, C.mag, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one relation , two ends', 1610, 385, C.mag, rp, 22); lblG('e₁₃ = ξη', 1610, 440, C.white, rp, 28); lblG('AB = S + iC', 1610, 490, C.white, rp, 28);
  txt(scramble('AURIC V41–V42 · RELATIONS', rp, 501), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V41–V42 · 单 位 元 、观 察 者 原 点 与 关 系 F[13]', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  const sq = clamp((u - 1.2) / 0.8);
  txt('TRURETURING · FILM 101 · AURIC_NORMALIZATION_UNITS_OBSERVER_ORIGINS_AND_QUADRATIC_INVARIANTS_V41', W / 2, 105, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sq, ls: 2 });
  txt('AURIC_F13_RELATIONAL_SEMANTICS_QUANTUM_THREE_AXES_AND_RECURSIVE_COMPATIBILITY_V42', W / 2, 132, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sq, ls: 2 });
};

/* ---- 02 EVENTS AND THE UNIT (V41 §2) ---- */
SCENES.events = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Mass, three axis means', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Take the five modes', 0.6) * f1;
    const tx = 170, ty = 300, cw = 92, ch = 62, rows = ['1', 'ξ', 'η', 'ζ', 'ξη'];
    L101.forEach((m, j) => lbl(m, tx + 120 + j * cw + (cw - 8) / 2, ty - 18, C.gold, q, 22));
    lbl('mode →', tx + 40, ty - 18, C.dim, q, 16);
    FUNC101.forEach((row, i) => { lblG(rows[i], tx + 50, ty + i * ch + 38, i === 0 ? C.white : C.cyan, q, 24); row.forEach((v, j) => cell101(tx + 120 + j * cw, ty + i * ch, cw - 8, ch - 8, String(v), v ? C.cyan : C.dim, clamp(q * 1.5 - (i * 5 + j) / 40), 20, v ? 0.3 : 0.06, v ? C.white : C.dim)); });
    lbl('ξ , η , ζ : occupancy of positions 1 , 3 , 2 ;  five functions , a basis of ℝ⁵', tx + 330, ty + 5 * ch + 26, C.dim, q, 15);
    const eq = Q(S, 0, 'Their five events sum to the constant one', 0.6) * f1;
    ['e_N = 1 − ξ − η − ζ + ξη', 'e₁ = ξ − ξη', 'e₂ = ζ', 'e₃ = η − ξη', 'e₁₃ = ξη'].forEach((s, i) => lblG(s, 1060, 300 + i * 52, i === 0 ? C.gold : C.white, clamp(eq * 1.6 - i / 6), 25, 'left'));
    chip(1390, 590, 760, 56, 'e_s e_t = δ_st e_s ,   Σ_s e_s = 1', C.cyan, eq, 23);
    const nq = Q(S, 0, 'but the null event is not one', 0.6) * f1;
    lbl('1   = (1, 1, 1, 1, 1)', 1060, 670, C.white, nq, 20, 'left'); lbl('e_N = (1, 0, 0, 0, 0)', 1060, 704, C.gold, nq, 20, 'left');
    stamp('NULL EVENT ≠ UNIT', 1600, 692, nq, C.red, 24, -0.05);
    const wq = Q(S, 0, "Normalisation is the state's value on the unit", 0.6) * f1;
    chip(470, 710, 640, 54, 'ω(1) = Tr ρ = Σ_s p_s = 1 : normalisation', C.green, wq, 20);
    const iq = Q(S, 0, 'the null probability is information', 0.6) * f1;
    lblG('p_N = Tr(ρ P_N) is part of the state , not the unit', 470, 775, C.white, iq, 19);
    lblG('P_N = |N⟩⟨N| ,  Σ_s P_s = I₅', 1390, 775, C.dim, iq, 18);
  }
  const q1 = Q(S, 1, 'Mass, three axis means', 0.6, 0.3);
  if (q1 > 0) {
    chip(W / 2, 255, 1560, 58, 's = Σ w ,  X = w₁ + w₁₃ ,  Y = w₃ + w₁₃ ,  Z = w₂ ,  κ = w₁₃   ⇄   w = (s − X − Y − Z + κ , X − κ , Z , Y − κ , κ)', C.white, q1, 19);
    const iq = Q(S, 1, 'kappa still ranges over an interval', 0.6);
    chip(W / 2, 330, 1000, 56, 's = 1 :   max(0, X + Y + Z − 1) ≤ κ ≤ min(X, Y)', C.gold, iq, 23);
    lbl('feasible axes : X , Y , Z ≥ 0 ,  X + Z ≤ 1 ,  Y + Z ≤ 1 ;   X + Y + Z = 1 − p_N + p₁₃', W / 2, 385, C.dim, iq, 15);
    const lq = Q(S, 1, 'half null plus half joint', 0.6), mq = Q(S, 1, 'and half one plus half three', 0.6), cq = Q(S, 1, 'are complete coordinates', 0.6);
    [[LAWA101, '½ δ_N + ½ δ₁₃ :  κ = ½', C.mag, lq, 170], [LAWB101, '½ δ₁ + ½ δ₃ :  κ = 0', C.cyan, mq, 600]].forEach(([p, nm, col, qq, x0]) => {
      p.forEach((v, i) => { const h = v * 380, x = x0 + i * 70; line(x - 4, 720, x + 54, 720, C.dim, cq, 1.2); rect63(x, 720 - 190, 50, 190, C.dim, cq * 0.35, 1); if (h > 0) { fillBox(x, 720 - h, 50, h, col, qq * 0.45); rect63(x, 720 - h, 50, h, col, qq, 1.6); } lbl(L101[i], x + 25, 748, C.dim, cq, 16); });
      lblG(nm, x0 + 165, 470, col, qq, 21);
      lblG('(X, Y, Z) = (½, ½, 0)', x0 + 165, 790, C.white, qq, 19);
    });
    lbl('mode probabilities  w = (w_N , w₁ , w₂ , w₃ , w₁₃)', 570, 440, C.dim, cq * (1 - lq), 16);
    const kq = Q(S, 1, 'read exactly the same axes', 0.6), iq2 = Q(S, 1, 'kappa still ranges over an interval', 0.6);
    const sx = v => 1130 + v / 0.5 * 560;
    line(sx(0), 640, sx(0.5), 640, C.gold, iq2, 4); lbl('κ', sx(0.5) + 30, 648, C.gold, iq2, 22, 'left');
    dot(sx(0), 640, 13, 'c', Math.max(mq, kq)); dot(sx(0.5), 640, 13, 'm', Math.max(lq, kq)); lbl('0', sx(0), 680, C.cyan, iq2, 18); lbl('½', sx(0.5), 680, C.mag, iq2, 18);
    lbl('fibre over (½, ½, 0) :  κ ∈ [0, ½]', 1410, 730, C.white, iq2, 18);
    stamp('SAME AXES , DIFFERENT κ', 1410, 520, kq, C.gold, 26, -0.04);
  }
};

/* ---- 03 THREE NUMBERS (V41 §3) ---- */
SCENES.three = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The means of two classical signs', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Three linear readouts can determine every state', 0.6) * f1;
    const objs = ['one classical bit', 'two classical bits , joint law', 'one qubit', 'five-mode occupancy', 'five-mode quantum state', 'two qubits , all relations'];
    lbl('object', 160, 300, C.dim, q, 16, 'left'); lbl('algebra', 600, 300, C.dim, q, 16); lbl('n = Σ d²', 740, 300, C.dim, q, 16); lbl('dim n − 1', 880, 300, C.dim, q, 16);
    const hq = Q(S, 0, 'A complete state space of exactly three dimensions', 0.6) * f1;
    ALG101.forEach((r, i) => { const qq = clamp(q * 1.6 - i / 8), y = 320 + i * 64, hl = r[2] === 3; box(150, y, 800, 52, hl ? C.gold : C.dim, qq * (hl ? Math.max(0.4, hq) : 0.5), hl ? 2 : 1.2, hl ? 'rgba(40,30,0,0.35)' : 'rgba(0,0,0,0.35)'); lbl(objs[i], 170, y + 34, C.white, qq, 17, 'left'); lblG(r[0], 600, y + 35, C.cyan, qq, 22); lbl(String(r[1]), 740, y + 34, C.white, qq, 20); lbl(String(r[2]), 880, y + 34, hl ? C.gold : C.white, qq, 22); });
    chip(1390, 300, 780, 58, 'E₁ , E₂ , E₃ complete  ⇔  span_ℝ{I, E₁, E₂, E₃} = B_sa', C.cyan, q, 21);
    const nq = Q(S, 0, 'the squared block sizes sum to at most four', 0.6) * f1;
    chip(1390, 390, 780, 58, 'B = ⊕ M_dα(ℂ) :  possible  ⇔  n = Σ dα² ≤ 4', C.gold, nq, 22);
    lbl('proof : a traceless H ⊥ span gives ρ* ± εH , same readings , different states', 1390, 450, C.dim, nq, 15);
    chip(1390, 530, 780, 56, '4 = 2²   or   4 = 1² + 1² + 1² + 1²', C.white, hq, 23);
    const bq = Q(S, 0, 'a qubit or four classical events', 0.6) * f1;
    chip(1390, 620, 780, 62, 'B ≃ M₂(ℂ)    or    B ≃ ℂ⁴', C.green, bq, 27);
    lbl('existence of good readouts — not a free native menu', 1390, 690, C.dim, bq, 15);
  }
  const q = Q(S, 1, 'The means of two classical signs', 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 255, 1150, 58, 'p_st = (1 + s a + t b + st c)/4 ,   a² + b² + c² = 4 Σ p_st² − 1 ∈ [0, 3]', C.gold, q, 22);
    lbl('two qubits :  4 Tr ρ_AB² − 1 = |a|² + |b|² + ‖T‖_F²  (positivity still checked on the whole matrix)', W / 2, 310, C.dim, q, 15);
    const tq = Q(S, 1, 'fill a tetrahedron', 0.6);
    tetra101(320, 520, 100, 0.5 + t * 0.08, tq, { labs: ['(1, 1, 1)', '(1, −1, −1)', '(−1, 1, −1)', '(−1, −1, 1)'] });
    lbl('means of (S, T, ST)', 320, 770, C.cyan, tq, 17); lbl('4 extreme points , |·|² = 3', 320, 800, C.gold, tq, 17);
    const sq = Q(S, 1, "The qubit's extreme points are a whole sphere", 0.6);
    sph101(800, 520, 140, sq);
    for (let i = 0; i < 26; i++) { const th = Math.acos(1 - 2 * rnd(i, 3)), ph = TAU * rnd(i, 4), p = bp101(800, 520, 140, [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]); dot(p[0], p[1], 5, 'm', sq * 0.8); }
    lbl('one qubit , M₂(ℂ)', 800, 770, C.mag, sq, 17); lbl('extreme points : the sphere , |r|² = 1', 800, 800, C.mag, sq, 17);
    const pq = Q(S, 1, 'is four times the summed squared probabilities', 0.6);
    const px = 1080, py = 760, pw = 640, ph = 380, xS = x => px + x / 3 * pw, yS = y => py - y / 3 * ph;
    plotAxes(px, py, pw, ph, pq, '4 Σ p² − 1', 'a² + b² + c²');
    line(xS(0), yS(0), xS(3), yS(3), C.gold, pq * 0.7, 1.6);
    TET101.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 6, 'c', clamp(pq * 1.6 - i / 100)));
    [0, 1, 2, 3].forEach(v => { lbl(String(v), xS(v), py + 26, C.dim, pq, 14); lbl(String(v), px - 12, yS(v) + 5, C.dim, pq, 14, 'right'); });
    lbl('80 sampled laws : exact identity', px + 30, py - ph + 30, C.cyan, pq, 15, 'left');
  }
};

/* ---- 04 CONE AND OBSERVER ORIGIN (V41 §4–5) ---- */
SCENES.origin = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, "Put an observer's reference state at the origin", 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'For a positive two by two matrix with total s', 0.6) * f1;
    const ax = 450, ay = 770, top = 300, sl = 440;
    line(ax, ay, ax - 330, top, C.cyan, q, 2.5); line(ax, ay, ax + 330, top, C.cyan, q, 2.5);
    dashed(ax, ay + 10, ax, top - 20, C.dim, q, 1.2); lbl('s', ax + 14, top - 6, C.dim, q, 20, 'left');
    dot(ax, ay, 9, 'w', q); lbl('0', ax + 18, ay + 6, C.dim, q, 17, 'left');
    lbl('M ≥ 0  ⇔  s ≥ |r_hom|', ax, 810, C.cyan, q, 18);
    const sq = Q(S, 0, 'The slice s equals one is normalisation', 0.6) * f1;
    const hw = 330 * (ay - sl) / (ay - top);
    fillEll101(ax, sl, hw, 44, C.gold, sq * 0.18); ell101(ax, sl, hw, 44, C.gold, sq, 2.5);
    lbl('s = 1 : Bloch ball', ax + hw + 14, sl + 6, C.gold, sq, 18, 'left');
    dot(ax, sl, 9, 'c', sq); lbl('I/2', ax + 14, sl - 12, C.white, sq, 17, 'left');
    const pq = Q(S, 0, 'twice the purity minus one', 0.6) * f1;
    dot(ax - hw, sl, 10, 'm', pq); dot(ax + hw, sl, 10, 'm', pq); lbl('det = 0 : pure', ax - hw - 14, sl + 36, C.mag, pq, 16, 'right');
    chip(1390, 290, 780, 58, 'M = (s I + r_hom · σ)/2 ,  r_hom = (2 Re c , −2 Im c , p − q)', C.white, q, 19);
    const dq = Q(S, 0, 's squared minus the squared homogeneous Bloch vector', 0.6) * f1;
    chip(1390, 380, 780, 62, 's² − |r_hom|² = 4 det M = 4(pq − |c|²)', C.gold, dq, 25);
    lbl('eigenvalues (s ± |r_hom|)/2', 1390, 440, C.dim, dq, 16);
    chip(1390, 520, 780, 58, 'ρ = M / s ,   r = r_hom / s ,   |r| ≤ 1', C.cyan, sq, 23);
    chip(1390, 610, 780, 62, '|r|² = 2 Tr ρ² − 1 = 1 − 4 det ρ', C.green, pq, 26);
    lbl('centre r = 0 is I/2 , not the zero operator ;  mixed states fill the ball', 1390, 675, C.dim, pq, 15);
  }
  const q = Q(S, 1, "Put an observer's reference state at the origin", 0.6, 0.3);
  if (q > 0) {
    const cx = 430, cy = 520, R = 200;
    sph101(cx, cy, R, q);
    const N = bp101(cx, cy, R, [0, 0, 1]);
    dot(N[0], N[1], 16, 'g', q); lbl('ρ_O = |0⟩⟨0| : observer reference', N[0] + 24, N[1] - 10, C.gold, q, 17, 'left');
    const rq = Q(S, 1, 'Relative to the reference state zero', 0.6);
    dot(cx, cy, 14, 'c', rq); lbl('I/2', cx - 22, cy + 8, C.cyan, rq, 20, 'right');
    arrow(N[0] + 6, N[1] + 18, cx + 6, cy - 16, C.mag, rq, 3); lbl('d = (0, 0, −1) ,  |d|² = 1', cx + 26, cy - R / 2, C.mag, rq, 18, 'left');
    const pq = Q(S, 1, 'yet its purity is only one half', 0.6);
    lbl('Tr (I/2)² = ½', cx + 26, cy + 40, C.white, pq, 20, 'left');
    stamp('ORIGIN ≠ CENTRE', cx, 790, pq, C.red, 28, -0.04);
    const mq = Q(S, 1, 'the radius needs a centre and a metric', 0.6);
    chip(1390, 280, 800, 58, 'E_i = a_i I + b_i · σ ,   m − a = B r ,   H = B Bᵀ', C.cyan, mq, 21);
    chip(1390, 360, 800, 60, '|r|² = (m − a)ᵀ H⁻¹ (m − a)', C.gold, mq, 25);
    chip(1390, 450, 800, 58, 'origin at ρ_O :  |r|² = (d + B r_O)ᵀ H⁻¹ (d + B r_O)', C.green, rq, 21);
    chip(1390, 530, 800, 58, 'dᵀ H⁻¹ d = |r − r_O|² = 2 Tr (ρ − ρ_O)²', C.white, rq, 21);
    lbl('I/2 : the only state fixed by every unitary', 1390, 610, C.dim, pq, 16);
    lbl('one reference pure state fixes an axis , not the transverse phase frame', 1390, 640, C.dim, pq, 16);
    lblG('chart :  r = (2 Re w , 2 Im w , 1 − |w|²)/(1 + |w|²)', 1390, 700, C.white, pq, 19);
  }
};

/* ---- 05 BUDGETS (V41 §6–8) ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For the five modes, purity is one fifth', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Inside one pure whole', 0.6) * f1;
    chip(530, 265, 860, 58, 'Ψ = |0⟩ ⊗ a + |1⟩ ⊗ b ,   ρ = [[p , c] , [c̄ , q]]', C.white, q, 21);
    lbl('p = ‖a‖² ,  q = ‖b‖² ,  c = ⟨b, a⟩ ,  p + q = 1', 530, 325, C.dim, q, 16);
    const O = [250, 680], A = [O[0] + 380, O[1] - 90], B = [O[0] + 120, O[1] - 260];
    const gq = Q(S, 0, 'the Gram gap', 0.6) * f1;
    fillPoly([O, A, [A[0] + B[0] - O[0], A[1] + B[1] - O[1]], B], C.mag, gq * 0.2); strokePoly([O, A, [A[0] + B[0] - O[0], A[1] + B[1] - O[1]], B], C.mag, gq * 0.6, 1.2);
    arrow(O[0], O[1], A[0], A[1], C.cyan, q, 3.5); arrow(O[0], O[1], B[0], B[1], C.gold, q, 3.5);
    lbl('a', A[0] + 16, A[1] + 8, C.cyan, q, 24, 'left'); lbl('b', B[0] - 12, B[1] - 6, C.gold, q, 24, 'right');
    lbl('area² = pq − |c|²', 560, 470, C.mag, gq, 17, 'left');
    lbl('P = |p − q| ,  V = 2|c| ,  G = 2√(pq − |c|²)', 530, 760, C.white, Q(S, 0, 'imbalance, coherence and the Gram gap', 0.6) * f1, 19);
    lbl('G = 0  ⇔  a , b dependent  ⇔  product state', 530, 800, C.dim, gq, 16);
    const bq = Q(S, 0, 'P squared plus V squared plus G squared equals one', 0.6) * f1;
    chip(1390, 270, 780, 60, 'P² + V² + G² = 1 ,   |r|² + G² = 1', C.gold, bq, 25);
    lbl('P²', 1150, 330, C.cyan, bq, 18); lbl('V²', 1300, 330, C.gold, bq, 18); lbl('G²', 1450, 330, C.mag, bq, 18); lbl('12 sampled records', 1640, 330, C.dim, bq, 15);
    stack101(1080, 760, REC101, 40, 14, 340, [C.cyan, C.gold, C.mag], bq);
    lbl('sample 1 : b ∝ a  →  G = 0', 1080, 795, C.dim, bq, 15, 'left');
    const vq = Q(S, 0, 'the squared radius lost is exactly the Gram gap', 0.6) * f1;
    lbl('Σ Var σᵢ = 3 − |r|² = 2 + G² ;   D² + V² = 1 ,  D² = P² + G²', 1390, 392, C.white, vq, 16);
  }
  const q = Q(S, 1, 'For the five modes, purity is one fifth', 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 255, 1500, 58, 'Σ p_s² = 1/5 + δqᵀ H₅ δq ,   δq = (X, Y, Z, κ) − (2/5, 2/5, 1/5, 1/5)', C.gold, q, 22);
    const hq = Q(S, 1, 'a positive definite quadratic form', 0.6);
    const gx = 240, gy = 340, cw = 84, labs = ['X', 'Y', 'Z', 'κ'];
    labs.forEach((s, i) => { lblG(s, gx + i * cw + 38, gy - 14, C.cyan, hq, 22); lblG(s, gx - 24, gy + i * cw + 50, C.cyan, hq, 22); });
    H5_101.forEach((row, i) => row.forEach((v, j) => cell101(gx + j * cw, gy + i * cw, cw - 8, cw - 8, String(v), v < 0 ? C.red : C.gold, clamp(hq * 1.6 - (i * 4 + j) / 20), 24, 0.25)));
    lbl('H₅ = AᵀA ,  eigenvalues ' + H5E101.map(x => x.toFixed(3)).join(' , ') + '  > 0', 410, 700, C.white, hq, 16);
    const cq = Q(S, 1, 'plus twice the coherences', 0.6);
    chip(470, 770, 720, 56, 'Tr ρ² = 1/5 + δqᵀ H₅ δq + 2 Σ_s<t |ρ_st|²', C.green, cq, 21);
    const lq = Q(S, 1, 'Two laws with equal axes', 0.6);
    [[PA101, 'p_A', 'purity ½', C.mag, 1000], [PB101, 'p_B', 'purity ¼', C.cyan, 1410]].forEach(([p, nm, pu, col, x0]) => {
      p.forEach((v, i) => { const h = v * 500, x = x0 + i * 72; line(x - 4, 640, x + 56, 640, C.dim, hq, 1.2); if (h > 0) { fillBox(x, 640 - h, 52, h, col, hq * 0.45); rect63(x, 640 - h, 52, h, col, hq, 1.6); } lbl(L101[i], x + 26, 668, C.dim, hq, 16); });
      lblG(nm, x0 + 120, 340, col, hq, 22); lblG(pu, x0 + 230, 340, C.white, lq, 22);
    });
    lblG('both : (X, Y, Z) = (½, ½, 0) ,  R² = ½', 1390, 715, C.white, lq, 20);
    lbl('blocks :  Tr ρ̄² = Σ t_s² Tr ρ_s²  ;  pure compression → Σ t_s²', 1390, 770, C.dim, lq, 16);
  }
};

/* ---- 06 RENORMALISATION (V41 §9–10) ---- */
SCENES.renorm = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Keeping pure states pure is not unitarity', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Dividing by a branch mass', 0.6) * f1;
    chip(W / 2, 255, 1300, 60, '‖M/s − N/t‖₁  ≤  (δ + |s − t|) / max(s, t)  ≤  2δ / max(s, t) ,   δ = ‖M − N‖₁', C.gold, q, 22);
    const px = 170, py = 760, pw = 700, ph = 400, xS = x => px + x / 2 * pw, yS = y => py - y / 2 * ph;
    const pq = Q(S, 0, 'the normalised distance is at most two delta', 0.6) * f1;
    plotAxes(px, py, pw, ph, pq, 'bound (δ + |s − t|)/max(s, t)', '‖M/s − N/t‖₁');
    line(xS(0), yS(0), xS(2), yS(2), C.gold, pq * 0.8, 1.6);
    STAB101.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 5, 'c', clamp(pq * 1.6 - i / 110)));
    lbl('90 sampled pairs , all below the line ; equality at M = s|0⟩⟨0| , N = M + δ|1⟩⟨1|', px + 20, py - ph + 20, C.cyan, pq, 14, 'left');
    const zq = Q(S, 0, 'stable only away from zero mass', 0.6) * f1;
    chip(1390, 360, 780, 56, 'η|0⟩⟨0| vs η|1⟩⟨1| :  input 2η → 0 ,  output 2', C.red, zq, 21);
    lbl('no global Lipschitz constant as the mass goes to zero', 1390, 415, C.dim, zq, 15);
    const rq = Q(S, 0, 'Through recursion', 0.6) * f1;
    ['K₁', 'K₂', 'K₃'].forEach((s, i) => { const x = 1100 + i * 200; cell101(x, 470, 130, 64, s, C.cyan, rq, 22, 0.25); lbl('t' + ['₁', '₂', '₃'][i], x + 65, 560, C.gold, rq, 18); if (i < 2) arrow(x + 134, 502, x + 196, 502, C.dim, rq, 2); });
    chip(1390, 630, 800, 62, '1 − |r_n|² = (1 − |r₀|²) Π|det K_j|² / (Π t_j)²', C.gold, rq, 23);
    lbl('total mass of the word W_n = K_n ⋯ K₁ :  s_n = Π t_j', 1390, 690, C.dim, rq, 16);
  }
  const q = Q(S, 1, 'Keeping pure states pure is not unitarity', 0.6, 0.3);
  if (q > 0) {
    const cx = 400, cy = 520, R = 190;
    sph101(cx, cy, R, q);
    const dq = Q(S, 1, 'with diagonal one and epsilon does it', 0.6);
    const ip = bp101(cx, cy, R, [1, 0, 0]), im = bp101(cx, cy, R, [-1, 0, 0]), op = bp101(cx, cy, R, [0.8, 0, 0.6]), om = bp101(cx, cy, R, [-0.8, 0, 0.6]);
    dot(ip[0], ip[1], 12, 'w', q); dot(im[0], im[1], 12, 'w', q); lbl('|+⟩', ip[0] + 18, ip[1] + 6, C.white, q, 18, 'left'); lbl('|−⟩', im[0] - 18, im[1] + 6, C.white, q, 18, 'right');
    arrow(ip[0] - 4, ip[1] - 14, op[0] + 4, op[1] + 14, C.gold, dq, 2.5); arrow(im[0] + 4, im[1] - 14, om[0] - 4, om[1] + 14, C.gold, dq, 2.5);
    dot(op[0], op[1], 12, 'g', dq); dot(om[0], om[1], 12, 'g', dq);
    lbl('K = diag(1, ε) , ε = ½ : outputs stay pure', cx, cy + R + 50, C.gold, dq, 17);
    lbl('overlap 0.6 instead of 0', cx, cy + R + 80, C.gold, dq, 17);
    const oq = Q(S, 1, 'tilts orthogonal inputs to overlap', 0.6);
    chip(1390, 270, 800, 58, '|⟨out₊ , out₋⟩| = (1 − ε²)/(1 + ε²)', C.gold, oq, 23);
    const px = 1060, py = 660, pw = 660, ph = 300, xS = x => px + x * pw, yS = y => py - y * ph;
    plotAxes(px, py, pw, ph, oq, 'ε', 'output overlap');
    curve(p => { const e = 0.02 + p * 0.96; return [xS(e), yS((1 - e * e) / (1 + e * e))]; }, 60, C.gold, oq, 2.5);
    EPSC101.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 5, 'c', clamp(oq * 1.6 - i / 30)));
    lbl('the mass t(ρ) depends on the input', px + pw, py - ph + 10, C.dim, oq, 14, 'right');
    const uq = Q(S, 1, "A channel preserving every state's radius is unitary", 0.6);
    chip(1390, 730, 840, 58, 'Φ CPTP ,  |r(Φ(ρ))| = |r(ρ)| for every ρ   ⇒   Φ(ρ) = U ρ U†', C.green, uq, 20);
    lbl('a transpose also keeps radii , but (id ⊗ T)|Φ⁺⟩⟨Φ⁺| has spectrum ' + PTS101.map(x => (x > 0 ? '' : '−') + Math.abs(x).toFixed(1)).join(' , '), 1390, 790, C.dim, uq, 14);
  }
};

/* ---- 07 RELATION FIBRE (V42 §1–3) ---- */
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'With fixed axes, kappa spans a fibre', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'reads F thirteen as a relation', 0.6) * f1;
    const jq = Q(S, 0, 'the joint event is xi times eta', 0.6) * f1;
    pyr101(450, 520, 320, 0.7 + t * 0.15, q, { fill: 0.1, joint: jq, hl: [0, 1, 0, 1, 1] });
    lblG('end ξ : modes 1 , 13      end η : modes 3 , 13', 450, 770, C.white, jq, 19);
    chip(1390, 280, 780, 58, 'ξ = e₁ + e₁₃ ,   η = e₃ + e₁₃ ,   ζ = e₂', C.cyan, jq, 22);
    chip(1390, 360, 780, 62, 'e₁₃ = ξ η = (I + A + B + AB)/4', C.gold, jq, 25);
    lbl('A = 2ξ − I ,  B = 2η − I  (commuting here)', 1390, 420, C.dim, jq, 16);
    const kq = Q(S, 0, 'A task needs as many extra readouts', 0.6) * f1;
    chip(1390, 500, 780, 60, 'k_min = dim(V₀ + T) − dim V₀', C.green, kq, 25);
    const fq = Q(S, 0, 'for the five modes, exactly one', 0.6) * f1;
    [['span{1, ξ, η, ζ}', 4, C.cyan], ['+ ξη', 5, C.gold]].forEach(([s, v, col], i) => { const y = 590 + i * 70; fillBox(1220, y, v * 80, 50, col, fq * 0.4); rect63(1220, y, v * 80, 50, col, fq, 1.6); lbl(String(v), 1220 + v * 80 + 20, y + 35, col, fq, 24, 'left'); lblG(s, 1205, y + 33, C.white, fq, 19, 'right'); });
    stamp('k_min = 1', 1390, 790, fq, C.green, 26, -0.04);
  }
  const q = Q(S, 1, 'With fixed axes, kappa spans a fibre', 0.6, 0.3);
  if (q > 0) {
    const F_ = FIB101;
    chip(530, 260, 860, 56, 'p_κ = (r − X − Y + κ , X − κ , Z , Y − κ , κ) ,  r = 1 − Z', C.white, q, 20);
    lbl('example  X = ' + F_.X + ' , Y = ' + F_.Y + ' , Z = ' + F_.Z + ' ,  r = ' + F_.r.toFixed(1), 530, 314, C.dim, q, 16);
    const sx = v => 180 + v / 0.5 * 700;
    line(sx(0), 430, sx(0.5), 430, C.dim, q, 2); [0, 0.1, 0.2, 0.3, 0.4, 0.5].forEach(v => { line(sx(v), 422, sx(v), 438, C.dim, q, 1.5); lbl(v.toFixed(1), sx(v), 466, C.dim, q, 15); });
    line(sx(F_.L), 430, sx(F_.U), 430, C.gold, q, 7); dot(sx(F_.L), 430, 11, 'g', q); dot(sx(F_.U), 430, 11, 'g', q);
    lbl('L = max(0, X + Y − r) ,   U = min(X, Y)', 530, 352, C.white, q, 17);
    lbl('L = 0.1', sx(F_.L), 395, C.gold, q, 16); lbl('U = 0.4', sx(F_.U), 395, C.gold, q, 16); lbl('κ', sx(0.5) + 20, 438, C.gold, q, 22, 'left');
    lbl('w = U − L = min{X, Y, r − X, r − Y} = 0.3', 530, 510, C.white, q, 19);
    const jq = Q(S, 1, 'a target f is uncertain by J of f times w over two', 0.6);
    chip(530, 590, 860, 56, 'E f = f_N + (f₁ − f_N)X + (f₃ − f_N)Y + (f₂ − f_N)Z + J_f κ', C.cyan, jq, 19);
    chip(530, 670, 860, 58, 'J_f = f₁₃ − f₁ − f₃ + f_N ,   minimax error = |J_f| w / 2', C.gold, jq, 21);
    lbl('law itself : TV(p_κ , p_κ′) = 2|κ − κ′| ,  minimax TV = w', 530, 730, C.dim, jq, 16);
    const tq = Math.max(Q(S, 1, 'Two xi plus five eta plus three zeta', 0.6), 0.6 * jq);
    const tx = 1060, ty = 300, cw = 108;
    L101.forEach((m, j) => lbl(m, tx + 150 + j * cw + 48, ty - 14, C.gold, tq, 20));
    [['q', QV101, C.cyan], ['q²', Q2V101, C.mag]].forEach(([nm, vals, col], i) => { lblG(nm, tx + 70, ty + i * 80 + 46, col, tq, 26); vals.forEach((v, j) => cell101(tx + 150 + j * cw, ty + i * 80, cw - 12, 66, String(v), col, clamp(tq * 1.6 - (i * 5 + j) / 12), 24, 0.25)); });
    lblG('q = 2ξ + 5η + 3ζ', 1430, 500, C.white, tq, 22);
    lbl('J_q = 7 − 2 − 5 + 0 = 0', 1430, 560, C.cyan, tq, 21);
    const sq = Q(S, 1, 'yet its square has J twenty', 0.6);
    lbl('J_q² = 49 − 4 − 25 + 0 = 20', 1430, 610, C.mag, sq, 21);
    lbl('on the example fibre : error 0 for q ,  20 · 0.3 / 2 = 3 for q²', 1430, 670, C.white, sq, 16);
    stamp('MEAN BLIND , SQUARE SEES κ', 1430, 760, sq, C.mag, 24, -0.04);
  }
};

/* ---- 08 ODDS AND ENTROPY (V42 §4) ---- */
SCENES.odds = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'lean'], [1, 'Kappa moves at rate at most r over sixteen', 'theory']]);
  const f1 = 1 - Q(S, 1, 'A finite log-odds theta picks exactly one law', 0.6);
  const F_ = FIB101;
  if (f1 > 0) {
    const q = Q(S, 0, 'the two by two table has determinant delta', 0.6) * f1;
    const gx = 230, gy = 300, c = 150;
    [['p_N', 'p₃'], ['p₁', 'p₁₃']].forEach((row, i) => row.forEach((s, j) => cell101(gx + j * c, gy + i * 110, c - 10, 100, s, i === j ? C.gold : C.cyan, q, 26, 0.2)));
    lbl('ζ = 0 : the base square', gx + 145, gy - 16, C.dim, q, 16);
    lblG('Δ = det Q = r κ − XY', gx + 145, gy + 260, C.gold, q, 26);
    lblG('Cov(ξ, η | ζ = 0) = Δ / r²', gx + 145, gy + 310, C.white, q, 22);
    lblG('Cov(ξ, η) = (Δ + XYZ) / r', gx + 145, gy + 355, C.dim, q, 19);
    const eq = Q(S, 0, 'has maximal entropy', 0.6) * f1;
    const px = 1060, py = 790, pw = 660, ph = 270, hmin = 1.8, hmax = 2.32, xS = k => px + (k - F_.L) / (F_.U - F_.L) * pw, yS = h => py - (h - hmin) / (hmax - hmin) * ph;
    plotAxes(px, py, pw, ph, eq, 'κ ∈ [L, U] = [0.1, 0.4]', 'H(p_κ) bits');
    curve(p => { const k = ENT101[Math.round(p * (ENT101.length - 1))]; return [xS(k[0]), yS(k[1])]; }, ENT101.length - 1, C.cyan, eq, 3);
    dot(xS(KSTAR101), yS(HSTAR101), 13, 'g', eq); dashed(xS(KSTAR101), yS(HSTAR101), xS(KSTAR101), py, C.gold, eq * 0.6, 1.2);
    lbl('κ* = XY / r = 0.25', xS(KSTAR101) + 16, yS(HSTAR101) - 14, C.gold, eq, 17, 'left');
    lbl('H(p*) = ' + HSTAR101.toFixed(3), xS(KSTAR101) + 16, yS(HSTAR101) + 16, C.dim, eq, 15, 'left');
    chip(1390, 270, 780, 56, 'independent completion :  Δ = 0  ⇔  κ* = XY / r', C.gold, eq, 21);
    const mq = Q(S, 0, 'falls short by r times the conditional mutual information', 0.6) * f1;
    chip(1390, 340, 780, 56, 'H(p*) − H(p) = D(p ‖ p*) = r I(ξ : η | ζ = 0)', C.white, mq, 21);
    const tq = Q(S, 0, 'at distance two delta over r', 0.6) * f1;
    chip(1390, 410, 780, 56, 'TV(p , p*) = 2|Δ| / r', C.green, tq, 23);
  }
  const q = Q(S, 1, 'A finite log-odds theta picks exactly one law', 0.6, 0.3);
  if (q > 0) {
    const px = 170, py = 760, pw = 720, ph = 420, xS = th => px + (th + 8) / 16 * pw, yS = k => py - k / 0.5 * ph;
    plotAxes(px, py, pw, ph, q, 'θ = log(p_N p₁₃ / p₁ p₃)', 'κ(θ)');
    curve(p => { const r = KTH101[Math.round(p * (KTH101.length - 1))]; return [xS(r[0]), yS(r[1])]; }, KTH101.length - 1, C.gold, q, 3);
    curve(p => { const r = KTH2_101[Math.round(p * (KTH2_101.length - 1))]; return [xS(r[0]), yS(r[1])]; }, KTH2_101.length - 1, C.cyan, q, 2.5);
    [0, 0.1, 0.2, 0.3, 0.4, 0.5].forEach(v => lbl(v.toFixed(1), px - 10, yS(v) + 5, C.dim, q, 14, 'right'));
    [-8, -4, 0, 4, 8].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, q, 14));
    lbl('gold : X = Y = 0.4 , r = 0.8  (fibre (0, 0.4))', px + 20, py - ph + 20, C.gold, q, 15, 'left');
    lbl('cyan : X = 0.4 , Y = 0.5 , r = 0.8  (fibre (0.1, 0.4))', px + 20, py - ph + 44, C.cyan, q, 15, 'left');
    lbl('Lean frozen : FiveModeMixedCoordinates.mixed_coordinates_global_chart (interior of the pyramid)', 530, 815, C.green, q, 14);
    chip(1390, 770, 800, 56, 'θ ↦ p_θ : one law for each θ , κ strictly increasing on (L, U)', C.green, q, 19);
    const rq = Q(S, 1, 'Kappa moves at rate at most r over sixteen', 0.6);
    const k0 = 0.2, sl = 0.8 / 16;
    dashed(xS(-3), yS(k0 - 3 * sl), xS(3), yS(k0 + 3 * sl), C.red, rq, 2); lbl('slope r/16 = 0.05', xS(3) + 10, yS(k0 + 3 * sl) + 6, C.red, rq, 16, 'left');
    chip(1390, 280, 800, 58, 'dκ/dθ = (1/p_N + 1/p₁ + 1/p₃ + 1/p₁₃)⁻¹ ≤ r / 16', C.cyan, rq, 21);
    lbl('Cauchy : four cells of total mass r give Σ 1/p ≥ 16 / r', 1390, 340, C.dim, rq, 15);
    const tq = Q(S, 1, 'so total variation is at most r over eight', 0.6);
    chip(1390, 420, 800, 62, 'TV(p_θ , p_θ′) ≤ min{ 2w , (r/8)|θ − θ′| }', C.gold, tq, 24);
    const sq = Q(S, 1, 'that constant is sharp at the centre', 0.6);
    lbl('equality of the rate at X = Y = r/2 , θ = 0 ; recomputed ratio → 0.1000 = r/8', 1390, 490, C.white, sq, 16);
    stamp('r / 8 IS SHARP', 1390, 600, sq, C.green, 34, -0.05);
    lbl('certificate d₋ ≤ Δ ≤ d₊ cuts the fibre to [L′, U′] ; error |J_f|(U′ − L′)/2', 1390, 700, C.dim, sq, 15);
  }
};

/* ---- 09 GRAPHS BUILD RELATIONS (V42 §5) ---- */
SCENES.graph = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Separate interior blocks multiply their odds', 0.6);
  function wpath(x0, y0, dx, a) { const P = [[x0, y0], [x0 + dx, y0], [x0 + 2 * dx, y0]]; line(P[0][0], P[0][1], P[2][0], P[2][1], C.cyan, a, 3); P.forEach((p, i) => { dot(p[0], p[1], 15, ['c', 'g', 'm'][i], a); lbl(['1', '2', '3'][i], p[0], p[1] - 24, C.white, a, 19); }); return P; }
  if (f1 > 0) {
    const q = Q(S, 0, 'In a hard-core graph', 0.6) * f1;
    chip(1390, 270, 800, 56, 'P(I) = λ^|I| / Z_G ,   I independent', C.white, q, 22);
    const eq = Q(S, 0, 'eliminating the interior turns the odds into four partition functions', 0.6) * f1;
    chip(1390, 350, 800, 56, 'p_S = λ^|S| Z_(R∖N_R(S)) / Z_G', C.cyan, eq, 22);
    chip(1390, 440, 800, 66, 'η_odds = Z_R Z_(R∖(N₁ ∪ N₃)) / ( Z_(R∖N₁) Z_(R∖N₃) )', C.gold, eq, 21);
    lbl('W = {1, 2, 3} a three-path , R the rest ; Z_G and λ cancel', 1390, 505, C.dim, eq, 15);
    const aq = Q(S, 0, 'a vertex touching both ends gives one plus lambda', 0.6) * f1;
    const P1 = wpath(170, 360, 150, aq); const a1 = [320, 540];
    line(P1[0][0], P1[0][1], a1[0], a1[1], C.white, aq, 2); line(P1[2][0], P1[2][1], a1[0], a1[1], C.white, aq, 2); dot(a1[0], a1[1], 13, 'w', aq); lbl('a', a1[0] + 20, a1[1] + 6, C.white, aq, 18, 'left');
    lblG('η_odds = 1 + λ > 1', 320, 640, C.green, aq, 24); lbl('positive base relation', 320, 675, C.dim, aq, 16);
    const bq = Q(S, 0, 'an edge whose ends touch one side each gives less than one', 0.6) * f1;
    const P2 = wpath(640, 360, 150, bq); const ba = [700, 540], bb = [880, 540];
    line(P2[0][0], P2[0][1], ba[0], ba[1], C.white, bq, 2); line(P2[2][0], P2[2][1], bb[0], bb[1], C.white, bq, 2); line(ba[0], ba[1], bb[0], bb[1], C.white, bq, 2.5);
    dot(ba[0], ba[1], 13, 'w', bq); dot(bb[0], bb[1], 13, 'w', bq); lbl('a', ba[0] - 20, ba[1] + 6, C.white, bq, 18, 'right'); lbl('b', bb[0] + 20, bb[1] + 6, C.white, bq, 18, 'left');
    lblG('η_odds = (1 + 2λ)/(1 + λ)² < 1', 790, 640, C.red, bq, 24); lbl('negative base relation , no direct end edge', 790, 675, C.dim, bq, 16);
    lbl('recomputed by exhaustive enumeration on 30 random graphs', 1390, 600, C.dim, bq, 15);
  }
  const q = Q(S, 1, 'Separate interior blocks multiply their odds', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, 'η_odds = Π_j η_j ,   θ = Σ_j θ_j ,   θ_j = log η_j', C.gold, q, 23);
    const bq = Q(S, 1, 'log-odds add like a series', 0.6);
    const bx = 190, by = 520, hs = 300;
    line(bx - 10, by, bx + 10 * 68, by, C.dim, bq, 1.2);
    THJ101.forEach((v, i) => { const qq = clamp(bq * 1.6 - i / 12), x = bx + i * 68, h = v * hs; fillBox(x, h > 0 ? by - h : by, 46, Math.max(Math.abs(h), 1.5), v > 0 ? C.gold : C.cyan, qq * 0.5); rect63(x, h > 0 ? by - h : by, 46, Math.max(Math.abs(h), 1.5), v > 0 ? C.gold : C.cyan, qq, 1.4); lbl(String(i + 1), x + 23, by + (v > 0 ? 26 : Math.abs(h) + 26), C.dim, qq, 14); });
    lbl('θ_j , j = 1 … 10', bx + 340, 330, C.white, bq, 17);
    const iq = Q(S, 1, 'In our recomputed example', 0.6);
    lbl('recomputed illustration : λ = 1 , component j = a path with j inner vertices joining 1 and 3', 530, 700, C.cyan, iq, 14);
    lblG('η_j = F(j+2) F(j) / F(j+1)² = 1 + (−1)^(j+1) / F(j+1)²', 530, 740, C.gold, iq, 20);
    lbl('η₁ = 2 ,  η₂ = 3/4 ,  η₃ = 10/9 ,  η₄ = 24/25 , …', 530, 780, C.white, iq, 16);
    const tq = Q(S, 1, 'the completed laws converge within r over eight times the tail', 0.6);
    chip(1390, 270, 800, 60, 'TV(p_θn , p_θ∞) ≤ (r/8) Σ_(j>n) |θ_j|', C.green, tq, 24);
    const px = 1060, py = 760, pw = 660, ph = 380, xS = n => px + n / 10 * pw, yS = v => py - (Math.log10(v) + 6) / 5.4 * ph;
    plotAxes(px, py, pw, ph, tq, 'n', 'log scale');
    curve(p => { const r = TAIL101[Math.round(p * 10)]; return [xS(r[0]), yS(r[2])]; }, 10, C.gold, tq, 2.5);
    curve(p => { const r = TAIL101[Math.round(p * 10)]; return [xS(r[0]), yS(r[1])]; }, 10, C.cyan, tq, 2.5);
    TAIL101.forEach(r => { dot(xS(r[0]), yS(r[2]), 6, 'g', tq); dot(xS(r[0]), yS(r[1]), 6, 'c', tq); });
    [1e-5, 1e-3, 1e-1].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, tq, 13, 'right'));
    lbl('gold : bound (r/8) × tail', px + pw, py - ph + 20, C.gold, tq, 15, 'right'); lbl('cyan : actual TV , X = 0.35 , Y = 0.45 , r = 0.8', px + pw, py - ph + 44, C.cyan, tq, 15, 'right');
  }
};

/* ---- 10 TWO REFLECTIONS (V42 §6–8) ---- */
SCENES.reflect = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Fixing the angle c', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'the two ends are reflections A and B', 0.6) * f1;
    const cx = 420, cy = 520, R = 190;
    sph101(cx, cy, R, q);
    const th = Math.PI / 3 + 0.15 * Math.sin(t * 0.6), a = [0, 0, 1], b = [Math.sin(th), 0, Math.cos(th)], n = [0, 1.7, 0];
    const O = [cx, cy], pa = bp101(cx, cy, R, a), pb = bp101(cx, cy, R, b), pn = bp101(cx, cy, R, n);
    arrow(O[0], O[1], pa[0], pa[1], C.cyan, q, 3.5); arrow(O[0], O[1], pb[0], pb[1], C.gold, q, 3.5);
    lbl('A = a · σ', pa[0] + 16, pa[1] - 6, C.cyan, q, 19, 'left'); lbl('B = b · σ', pb[0] + 14, pb[1] + 4, C.gold, q, 19, 'left');
    const pq = Q(S, 0, 'the relation is their product', 0.6) * f1;
    arrow(O[0], O[1], pn[0], pn[1], C.mag, pq, 3); lbl('N ∝ a × b', pn[0] - 14, pn[1] + 24, C.mag, pq, 18, 'right');
    lbl('c = a · b = cos θ', cx, cy + R + 50, C.white, pq, 18);
    lbl('A² = B² = I ,  A = A† ,  B = B†', cx, cy + R + 82, C.dim, q, 16);
    chip(1390, 270, 800, 60, 'AB = S + iC ,   (AB)†(AB) = (AB)(AB)† = I', C.gold, pq, 22);
    chip(1390, 345, 800, 56, '[S, C] = 0 ,  S² + C² = I ,  S ↔ A , B commute ,  C anticommutes', C.cyan, pq, 18);
    const bq = Q(S, 0, 'its squared mean plus the variances of S and C is exactly one', 0.6) * f1;
    chip(1390, 425, 800, 60, '|ω(AB)|² + Var S + Var C = 1', C.green, bq, 25);
    lbl('|ω(AB)|²', 1160, 490, C.gold, bq, 16); lbl('Var S', 1330, 490, C.cyan, bq, 16); lbl('Var C', 1480, 490, C.mag, bq, 16); lbl('12 sampled states', 1650, 490, C.dim, bq, 14);
    stack101(1080, 770, REFB101, 40, 14, 250, [C.gold, C.cyan, C.mag], bq);
    lbl('sector S = c :  AB = cI + isN  →  a logical qubit ;  every SU(2) element is (a · σ)(b · σ)', W / 2, 812, C.dim, bq, 14);
  }
  const q = Q(S, 1, 'Fixing the angle c', 0.6, 0.3);
  if (q > 0) {
    const c = 0.5, cx = 450, cy = 540, sc = 200;
    chip(530, 265, 880, 60, '(x₁² − 2c x₁x₃ + x₃²) / (1 − c²) + x₂² ≤ 1', C.gold, q, 24);
    lbl('x₁ = ω(A) ,  x₃ = ω(B) ,  x₂ = ω(N) ;  z = ω(AB) = c + i s x₂', 530, 322, C.dim, q, 15);
    const eq = Q(S, 1, 'three readings fill an exact ellipsoid with a cross term', 0.6);
    line(cx - 240, cy, cx + 240, cy, C.dim, eq, 1.2); line(cx, cy - 240, cx, cy + 240, C.dim, eq, 1.2);
    lbl('x₁', cx + 250, cy + 6, C.dim, eq, 17, 'left'); lbl('x₃', cx + 6, cy - 248, C.dim, eq, 17, 'left');
    fillEll101(cx, cy, Math.sqrt(1 + c) * sc, Math.sqrt(1 - c) * sc, C.gold, eq * 0.1, -Math.PI / 4);
    ell101(cx, cy, Math.sqrt(1 + c) * sc, Math.sqrt(1 - c) * sc, C.gold, eq, 2.5, -Math.PI / 4);
    ELL101.forEach((r, i) => dot(cx + r[0] * sc, cy - r[1] * sc, 4, Math.abs(r[2]) < 0.15 ? 'g' : 'c', clamp(eq * 1.6 - i / 200) * 0.85));
    lbl('c = ½ : section x₂ = 0 and 160 sampled states (x₁ , x₃)', cx, cy + 270, C.white, eq, 15);
    const rq = Q(S, 1, 'each reading triple rebuilds one qubit state', 0.6);
    chip(1390, 290, 820, 56, 'ρ = ½ [ I + (x₁ − c x₃)/(1 − c²) A + (x₃ − c x₁)/(1 − c²) B + x₂ N ]', C.white, rq, 17);
    lbl('Gram positivity : |z − a₀b₀|² ≤ (1 − a₀²)(1 − b₀²) , every disc point realised', 1390, 345, C.dim, rq, 14);
    const sq = Q(S, 1, 'Errors scale between one over root one plus c', 0.6);
    chip(1390, 410, 820, 58, '‖Δm‖/√(1 + |c|) ≤ ‖ρ − σ‖₁ ≤ ‖Δm‖/√(1 − |c|)', C.green, sq, 21);
    const px = 1080, py = 790, pw = 640, ph = 300, xS = x => px + x * pw, yS = y => py - y / 3 * ph;
    plotAxes(px, py, pw, ph, sq, '|c|', 'error factor');
    curve(p => { const x = p * 0.95; return [xS(x), yS(1 / Math.sqrt(1 - x))]; }, 60, C.red, sq, 2.5);
    curve(p => { const x = p * 0.95; return [xS(x), yS(1 / Math.sqrt(1 + x))]; }, 60, C.cyan, sq, 2.5);
    line(xS(0.5), yS(CONDR101[0]), xS(0.5), yS(CONDR101[1]), C.green, sq, 5);
    lbl('sampled at c = ½ : ' + CONDR101[0].toFixed(3) + ' … ' + CONDR101[1].toFixed(3), xS(0.5) + 14, yS(1.15), C.green, sq, 14, 'left');
    lbl('1/√(1 − |c|)', xS(0.95), yS(2.9), C.red, sq, 15, 'right'); lbl('1/√(1 + |c|)', xS(0.95), yS(0.72) + 22, C.cyan, sq, 15, 'right');
    [1, 2, 3].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, sq, 13, 'right'));
  }
};

/* ---- 11 TREES AND CYCLES (V42 §9–10) ---- */
SCENES.cycle = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A triangle needs more', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'consistent edge couplings glue into one normalised Markov law', 0.6) * f1;
    const N = [[470, 320], [300, 470], [640, 470], [560, 620], [740, 620]], E = [[0, 1], [0, 2], [2, 3], [2, 4]];
    E.forEach(([i, j], k) => { line(N[i][0], N[i][1], N[j][0], N[j][1], C.gold, q, 3); lblG('π', (N[i][0] + N[j][0]) / 2 + (N[j][0] < N[i][0] ? -16 : 16), (N[i][1] + N[j][1]) / 2 + 4, C.gold, q, 20, N[j][0] < N[i][0] ? 'right' : 'left'); });
    N.forEach((p, i) => { dot(p[0], p[1], 15, i ? 'c' : 'm', q); lblG('μ' + ['₀', '₁', '₂', '₃', '₄'][i], p[0], p[1] - 24, C.white, q, 19); });
    lbl('root', 470, 290 - 22, C.mag, q, 15);
    chip(530, 700, 820, 58, 'P_T = μ_root Π_(i→j) K_(j|i) ,   K_(j|i) = π_ij / μ_i', C.cyan, q, 21);
    const tq = Q(S, 0, 'with error at most the edge errors plus degree-weighted node errors', 0.6) * f1;
    chip(1390, 270, 840, 60, 'TV(P, Q) ≤ min{ 1 , Σ_e TV(π_e , χ_e) + Σ_i (deg i − 1) TV(μ_i , ν_i) }', C.gold, tq, 17);
    const px = 1080, py = 760, pw = 620, ph = 380, xS = x => px + x * pw, yS = y => py - y * ph;
    plotAxes(px, py, pw, ph, tq, 'bound', 'TV(P, Q)');
    line(xS(0), yS(0), xS(1), yS(1), C.gold, tq * 0.8, 1.6);
    TREEB101.forEach((r, i) => dot(xS(r[0]), yS(r[1]), 5, 'c', clamp(tq * 1.6 - i / 110)));
    lbl('90 sampled four-node trees , all below the line', px + 20, py - ph + 20, C.cyan, tq, 15, 'left');
    const hq = Q(S, 0, 'can still hide a triple relation tau', 0.6) * f1;
    lblG('P_τ = (1 + τ abc)/8 : same singles and pairs , E(ABC) = τ', 530, 780, C.mag, hq, 19);
  }
  const q = Q(S, 1, 'A triangle needs more', 0.6, 0.3);
  if (q > 0) {
    const tt = tetra101(440, 520, 150, 0.55 + t * 0.12, q, { cube: 1, col: C.cyan });
    const bq = Q(S, 1, 'Three perfectly opposite pairs are each legal', 0.6);
    const bad = tt.v(-1, -1, -1), fix = tt.v(-1 / 3, -1 / 3, -1 / 3);
    dot(bad[0], bad[1], 16, 'r', bq); lbl('(−1, −1, −1)', bad[0] - 20, bad[1] + 34, C.red, bq, 17, 'right');
    lbl('(u, v, w) = (E AB , E BC , E CA)', 440, 300, C.dim, q, 16);
    const rq = Q(S, 1, 'The smallest uniform repair is two thirds', 0.6);
    arrow(bad[0], bad[1], fix[0], fix[1], C.green, rq, 3); dot(fix[0], fix[1], 13, 'n', rq); lbl('(−⅓, −⅓, −⅓)', fix[0] + 20, fix[1] - 10, C.green, rq, 17, 'left');
    box(1000, 250, 780, 150, C.cyan, q, 2, 'rgba(0,30,40,0.4)');
    lbl('global law  ⇔', 1390, 285, C.cyan, q, 18);
    lblG('1 + u + v + w ≥ 0 ,   1 + u − v − w ≥ 0', 1390, 330, C.white, q, 21);
    lblG('1 − u + v − w ≥ 0 ,   1 − u − v + w ≥ 0', 1390, 372, C.white, q, 21);
    const nq = Q(S, 1, 'but no joint law exists', 0.6);
    lbl('each edge in [−1, 1] , shared uniform margins ;  1 + u + v + w = −2', 1390, 440, C.red, nq, 16);
    stamp('EACH EDGE LEGAL , NO JOINT LAW', 1390, 530, nq, C.red, 24, -0.04);
    chip(1390, 640, 780, 60, 'dist∞(c, T) = ⅓ max_σ [ −h_σ(c) ]₊', C.gold, rq, 23);
    lbl('h_σ(c) = 1 + σ · c ;  at most one face fails ;  here d = 2/3', 1390, 700, C.white, rq, 16);
    lbl('recomputed with a linear program on 400 random edge triples', 1390, 740, C.dim, rq, 15);
  }
};

/* ---- 12 WHAT FUTURES KEEP (V42 §11–12) ---- */
SCENES.future = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On the real prefix seventy-eight', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Those that change an allowed future', 0.6) * f1;
    chip(530, 270, 860, 58, 'V_(n+1) = V_n + Σ_a T_a* V_n ,   V₀ ∋ I', C.cyan, q, 22);
    ['V₀', 'V₁', 'V₂', '⋯', 'V_n = V_(n+1)'].forEach((s, i) => { const qq = clamp(q * 1.6 - i / 6), x = 160 + i * 150; if (i < 4) box(x, 350, 120, 70, C.cyan, qq, 1.6, 'rgba(0,30,40,0.35)'); else box(x, 350, 200, 70, C.green, qq, 2, 'rgba(0,40,20,0.35)'); lblG(s, x + (i < 4 ? 60 : 100), 395, i < 4 ? C.white : C.green, qq, 20); if (i < 4) lbl('⊆', x + 135, 395, C.dim, qq, 20); });
    lbl('stops after at most dim Herm − dim V₀ strict steps', 530, 460, C.dim, q, 16);
    const bq = Q(S, 0, 'In the native terminal source', 0.6) * f1;
    const bx = 170;
    [[21, C.cyan, '21'], [21, C.cyan, '21'], [13, C.mag, '13']].forEach(([d, col, s], i) => { const x = bx + [0, 240, 480][i], h = d * 9; fillBox(x, 760 - h, h, h, col, bq * 0.2); rect63(x, 760 - h, h, h, col, bq, 1.8); lbl('M' + (s === '21' ? '₂₁' : '₁₃'), x + h / 2, 760 - h / 2 + 8, C.white, bq, 22); });
    lbl('A₀ ≃ M₂₁ ⊕ M₂₁ ⊕ M₁₃ ;  same-type blocks are synchronised', 530, 800, C.dim, bq, 15);
    const dq = Q(S, 0, "the event's effects span six hundred nine dimensions", 0.6) * f1;
    chip(1390, 290, 800, 58, 'raw effect span : 609 ,   with the unit : 610', C.gold, dq, 24);
    lbl('dim Herm₂₁ + dim Herm₁₃ = 441 + 169 = 610', 1390, 350, C.white, dq, 18);
    const wq = Q(S, 0, 'five times twenty-one minus eight times thirteen is one', 0.6) * f1;
    chip(1390, 430, 800, 58, 'W = { (X, Y) : 5 Tr X = 8 Tr Y } ,   W⊥ = ℝ (5 I₂₁ , −8 I₁₃)', C.cyan, wq, 19);
    chip(1390, 510, 800, 60, '5 · 21 − 8 · 13 = 105 − 104 = 1', C.green, wq, 26);
    lbl('normalised differences have trace zero , so λ = 0 : the unit adds no new ambiguity', 1390, 570, C.white, wq, 15);
    lbl('project input : native terminal certification §§12–17 (609 is not recomputed here)', 1390, 620, C.dim, wq, 14);
    lblG('Γ₀(σ) = (σ₀₀₀ + σ₀₁₀ , σ₁₀₀) ,   Γ₁(σ) = (σ₀₀₁ , σ₁₀₁)', 1390, 690, C.white, wq, 19);
  }
  const q = Q(S, 1, 'On the real prefix seventy-eight', 0.6, 0.3);
  if (q > 0) {
    const x = PREF101[1] ** 0.5 * 0 + (Math.sqrt(5) - 1) / 2;
    chip(530, 270, 860, 58, 'prefix 78 :  (t₀₀₀ , t₀₁₀ , t₁₀₀) = (x³ , x² , x²) ,  x = (√5 − 1)/2', C.gold, q, 20);
    lbl('x³ + 2x² = 1 ;  the two 21-blocks share one gauge pure ray , the 13-block has positive mass', 530, 325, C.dim, q, 14);
    const iq = Q(S, 1, 'leave one invisible direction', 0.6);
    const amp = 0.5 * (x * x + x ** 3) * 0.92, mid = 0.5 * (x * x - x ** 3), dl = (mid + amp * Math.sin(t * 1.3)) * iq;
    const vals = [x ** 3 + dl, x * x - dl, x * x], names = ['β₀₀₀', 'β₀₁₀', 'β₁₀₀'], cols = [C.cyan, C.cyan, C.mag];
    vals.forEach((v, i) => { const bx = 220 + i * 210, h = v * 480; line(bx - 6, 760, bx + 126, 760, C.dim, q, 1.2); fillBox(bx, 760 - h, 120, h, cols[i], q * 0.45); rect63(bx, 760 - h, 120, h, cols[i], q, 1.8); lbl(names[i], bx + 60, 790, C.white, q, 18); lbl(v.toFixed(3), bx + 60, 760 - h - 12, C.white, q, 17); });
    lbl('β(z) = (x³ + δ(z) , x² − δ(z) , x²)', 530, 380, C.white, iq, 18);
    lbl('animated δ is illustrative ;  −x³ ≤ δ ≤ x² ,  ∫ δ dν = 0', 530, 410, C.dim, iq, 15);
    chip(1390, 290, 800, 58, 'K_u = ℝ (1 , −1 , 0)', C.gold, iq, 26);
    lbl('nonzero only at record zero , both 21-blocks occupied , same gauge ray', 1390, 350, C.dim, iq, 15);
    const mq = Q(S, 1, 'mass moving between the twin twenty-one blocks changes no allowed future', 0.6);
    stamp('INVISIBLE TO EVERY ALLOWED FUTURE', 1390, 470, mq, C.green, 22, -0.04);
    lbl('still seen by the full terminal label', 1390, 560, C.white, mq, 18);
    lbl('exists when the cut has a measurable event of probability strictly between 0 and 1', 1390, 600, C.dim, mq, 14);
    chip(1390, 690, 820, 60, 'keep exactly the distinctions that change an allowed future', C.cyan, mq, 20);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The log-odds chart is frozen in Lean', 'lean'], [1, 'the Bloch sphere, Pauli algebra, Gram positivity and tree Markov gluing are classical tools', 'classical'], [1, 'the rest is argued in the two theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['UNIT', 'ω(1) = 1 , e_N ≠ 1', C.gold, 'The unit normalises'], ['THREE', 'M₂(ℂ) or ℂ⁴', C.cyan, 'three numbers suffice only for a qubit or four events'], ['ORIGIN', 'centre + metric H', C.green, 'observers need a centre'], ['BUDGETS', 'P² + V² + G² = 1', C.mag, 'masses and coherences fill exact budgets'], ['FIBRE', '|J_f| w / 2', C.gold, 'a relation narrows a fibre'], ['BUILD', 'Π η_j · AB = S + iC', C.cyan, 'graphs and reflections build it'], ['FUTURES', '105 − 104 = 1', C.green, 'futures decide what to keep']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 215 + i * 248, q = Q(S, 0, ph) * fade; box(x - 115, 270, 230, 150, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 330, col, q, 21); lblG(a2, x, 385, C.white, q, 18); });
    pyr101(W / 2, 680, 210, 0.5 + t * 0.2, clamp(u / 1.2) * (1 - Q(S, 1, 'are classical tools', 0.6)) * fade * 0.9, { fill: 0.1, joint: 0.8, hl: [0, 1, 0, 1, 1], ls: 18 });
    lbl('CLASSICAL · Bloch sphere and Pauli algebra · Gram / Schur positivity · Cauchy–Schwarz · tree Markov factorisation · finite-dimensional observable spaces', W / 2, 500, '#8fbcff', Q(S, 1, 'are classical tools') * fade, 15);
    lbl('PROJECT INPUTS · relation fibre , J_f , max-entropy completion (pyramid volumes) · block algebras (continuation III) · 609 / 610 and prefix 78 (native terminal volume)', W / 2, 548, C.dim, Q(S, 1, 'are classical tools', 0.6, 0.6) * fade, 14);
    lbl('VOLUMES · unit and events · n ≤ 4 · observer metric · Gram budget · H₅ · renormalisation bounds · radius ⇒ unitary · k_min · r/8 · elimination · two reflections · ellipsoid · tree TV · triangle repair', W / 2, 596, C.orange, Q(S, 1, 'the rest is argued in the two theory volumes') * fade, 14);
    lbl('RECOMPUTED · 84 checks : identities on random states , H₅ = AᵀA , J_q = 0 / 20 , κ* = 0.25 , r/8 , graph odds , disc and ellipsoid , conditioning 0.817–1.414 , tree TV , LP repair 2/3', W / 2, 644, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('LEAN · FiveModeMixedCoordinates.mixed_coordinates_global_chart : each log-odds value gives exactly one positive law', W / 2, 452, C.green, Q(S, 1, 'The log-odds chart is frozen in Lean') * fade, 15);
    lbl('NEITHER VOLUME HAS DIGESTION RECORDS AT THIS COMMIT · NO ATOM OF THEM IS COVERED BY LEAN', W / 2, 730, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr101(W / 2, 400, 280, 0.5 + t * 0.2, a * 0.9, { fill: 0.1, joint: 0.8 * a, hl: [0, 1, 0, 1, 1], ls: 0.01 });
    txt('AURIC V41–V42 · RELATIONS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V41–V42 · 单位元、观察者原点与关系 F[13] · TRURETURING FILM 101', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Normalise on the unit, keep the mass, centre the observer, and let one relation bind two ends.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V41–V42', events: 'EVENTS AND THE UNIT', three: 'THREE NUMBERS', origin: 'OBSERVER ORIGIN', budget: 'EXACT BUDGETS', renorm: 'RENORMALISATION', fiber: 'RELATION FIBRE', odds: 'ODDS AND ENTROPY', graph: 'GRAPHS BUILD RELATIONS', reflect: 'TWO REFLECTIONS', cycle: 'TREES AND CYCLES', future: 'WHAT FUTURES KEEP', finale: 'LEDGER' });

function poster101() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr101(470, 520, 380, 2.2, 1, { fill: 0.12, joint: 1, hl: [0, 1, 0, 1, 1] });
  txt('e₁₃ = ξη  ·  e_N ≠ 1', 1320, 370, { size: 46, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('|r|² = 2 Tr ρ² − 1', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('AB = S + iC · TV ≤ (r/8)|Δθ|', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V41–V42', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V41–V42 · RELATIONS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('单 位 元 · 观 察 者 原 点 · 关 系 F[13]', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 101', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster101;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
