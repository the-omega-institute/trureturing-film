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

/* ---- film 117: AURIC ENVIRONMENT MEMORY II · exact task errors and matching certificates ---- */
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
const _po117 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po117.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po117.set(key, off); }
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
const PROJ117 = {"h1": [0, 0, 0, 0, 0, 0, 146, 162, 97, 69, 63, 61, 61, 55, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0], "h2": [0, 0, 0, 0, 0, 0, 0, 15, 118, 104, 101, 69, 86, 88, 84, 21, 21, 17, 9, 11, 9, 7, 5, 2], "best": 0.6277, "eta6": 0.4846};
const BAL117 = [[2, 0.314425], [3, 0.389279], [4, 0.441778], [5, 0.46978], [6, 0.484626], [7, 0.492249], [8, 0.496109], [9, 0.498051], [10, 0.499024], [11, 0.499512], [12, 0.499756], [13, 0.499878], [14, 0.499939]];
const SP2_117 = [[0.0125, 0.2539, "D", 0.96439, 0.02957], [0.025, 0.25789, "D", 0.94017, 0.05121], [0.0375, 0.26199, "D", 0.92023, 0.06898], [0.05, 0.26619, "D", 0.90265, 0.08429], [0.0625, 0.27049, "D", 0.88659, 0.09781], [0.075, 0.27491, "D", 0.87161, 0.10996], [0.0875, 0.27943, "D", 0.85743, 0.12101], [0.1, 0.28407, "D", 0.84387, 0.13113], [0.1125, 0.28883, "D", 0.8308, 0.14047], [0.125, 0.29371, "D", 0.81815, 0.14912], [0.1375, 0.29865, "M", 0.80583, 0.15717], [0.15, 0.30331, "M", 0.7938, 0.16467], [0.1625, 0.30761, "M", 0.78201, 0.17168], [0.175, 0.31153, "M", 0.77044, 0.17825], [0.1875, 0.31509, "M", 0.75905, 0.1844], [0.2, 0.31828, "M", 0.74782, 0.19017], [0.2125, 0.32113, "M", 0.73674, 0.19558], [0.225, 0.32365, "M", 0.72578, 0.20065], [0.2375, 0.32585, "M", 0.71493, 0.20541], [0.25, 0.32774, "M", 0.70419, 0.20987], [0.2625, 0.32934, "M", 0.69353, 0.21404], [0.275, 0.33066, "M", 0.68296, 0.21795], [0.2875, 0.3317, "M", 0.67246, 0.22159], [0.3, 0.33248, "M", 0.66202, 0.22498], [0.3125, 0.333, "M", 0.65165, 0.22812], [0.325, 0.33328, "M", 0.64132, 0.23104], [0.3375, 0.33332, "M", 0.63105, 0.23372], [0.35, 0.33313, "M", 0.62082, 0.23619], [0.3625, 0.33271, "M", 0.61062, 0.23844], [0.375, 0.33207, "M", 0.60047, 0.24048], [0.3875, 0.33121, "M", 0.59034, 0.24231], [0.4, 0.33015, "M", 0.58024, 0.24394], [0.4125, 0.32887, "M", 0.57016, 0.24537], [0.425, 0.3274, "M", 0.5601, 0.24661], [0.4375, 0.32572, "M", 0.55006, 0.24765], [0.45, 0.32385, "M", 0.54003, 0.2485], [0.4625, 0.32178, "M", 0.53001, 0.24916], [0.475, 0.31952, "M", 0.52, 0.24962], [0.4875, 0.31707, "M", 0.51, 0.24991], [0.5, 0.31442, "M", 0.5, 0.25], [0.5125, 0.3116, "M", 0.49, 0.24991], [0.525, 0.30858, "M", 0.48, 0.24962], [0.5375, 0.30538, "M", 0.46999, 0.24916], [0.55, 0.30199, "M", 0.45997, 0.2485], [0.5625, 0.29842, "M", 0.44994, 0.24765], [0.575, 0.29466, "M", 0.4399, 0.24661], [0.5875, 0.29071, "M", 0.42984, 0.24537], [0.6, 0.28657, "M", 0.41976, 0.24394], [0.6125, 0.28225, "M", 0.40966, 0.24231], [0.625, 0.27774, "M", 0.39953, 0.24048], [0.6375, 0.27304, "P", 0.38938, 0.23844], [0.65, 0.26822, "P", 0.37918, 0.23619], [0.6625, 0.26331, "P", 0.36895, 0.23372], [0.675, 0.25829, "P", 0.35868, 0.23104], [0.6875, 0.25316, "P", 0.34835, 0.22812], [0.7, 0.2479, "P", 0.33798, 0.22498], [0.7125, 0.24251, "P", 0.32754, 0.22159], [0.725, 0.23697, "P", 0.31704, 0.21795], [0.7375, 0.23128, "P", 0.30647, 0.21404], [0.75, 0.22543, "P", 0.29581, 0.20987], [0.7625, 0.21939, "P", 0.28507, 0.20541], [0.775, 0.21315, "P", 0.27422, 0.20065], [0.7875, 0.20669, "P", 0.26326, 0.19558], [0.8, 0.2, "P", 0.25218, 0.19017], [0.8125, 0.19305, "P", 0.24095, 0.1844], [0.825, 0.18581, "P", 0.22956, 0.17825], [0.8375, 0.17825, "P", 0.21799, 0.17168], [0.85, 0.17033, "P", 0.2062, 0.16467], [0.8625, 0.16201, "P", 0.19417, 0.15717], [0.875, 0.15324, "P", 0.18185, 0.14912], [0.8875, 0.14394, "P", 0.1692, 0.14047], [0.9, 0.13405, "P", 0.15613, 0.13113], [0.9125, 0.12344, "P", 0.14257, 0.12101], [0.925, 0.112, "P", 0.12839, 0.10996], [0.9375, 0.09952, "P", 0.11341, 0.09781], [0.95, 0.08575, "P", 0.09735, 0.08429], [0.9625, 0.07029, "P", 0.07977, 0.06898], [0.975, 0.05243, "P", 0.05983, 0.05121], [0.9875, 0.03077, "P", 0.03561, 0.02957], [0.992, 0.02135, "R", 0.02494, 0.02026], [0.995, 0.01403, "R", 0.0168, 0.01336], [0.998, 0.00585, "R", 0.00738, 0.0057]];
const SP3_117 = [[0.0125, 0.3764, "M", 0.95499, 0.0676], [0.025, 0.3778, "M", 0.93394, 0.1026], [0.0375, 0.37918, "M", 0.91685, 0.12928], [0.05, 0.38055, "M", 0.90162, 0.15142], [0.0625, 0.38191, "M", 0.8875, 0.17056], [0.075, 0.38324, "M", 0.87412, 0.1875], [0.0875, 0.38456, "M", 0.86125, 0.20273], [0.1, 0.38585, "M", 0.84878, 0.21658], [0.1125, 0.38711, "M", 0.83662, 0.22927], [0.125, 0.38833, "M", 0.82469, 0.24097], [0.1375, 0.38952, "M", 0.81296, 0.25181], [0.15, 0.39067, "M", 0.8014, 0.26188], [0.1625, 0.39177, "M", 0.78997, 0.27127], [0.175, 0.39282, "M", 0.77866, 0.28004], [0.1875, 0.39382, "M", 0.76744, 0.28824], [0.2, 0.39476, "M", 0.75632, 0.29592], [0.2125, 0.39563, "M", 0.74526, 0.30311], [0.225, 0.39644, "M", 0.73427, 0.30984], [0.2375, 0.39718, "M", 0.72334, 0.31615], [0.25, 0.39784, "M", 0.71246, 0.32205], [0.2625, 0.39842, "M", 0.70163, 0.32758], [0.275, 0.39891, "M", 0.69083, 0.33274], [0.2875, 0.39932, "M", 0.68007, 0.33755], [0.3, 0.39964, "M", 0.66934, 0.34202], [0.3125, 0.39986, "M", 0.65865, 0.34618], [0.325, 0.39998, "M", 0.64797, 0.35002], [0.3375, 0.39999, "M", 0.63732, 0.35356], [0.35, 0.3999, "M", 0.62669, 0.35681], [0.3625, 0.39971, "M", 0.61607, 0.35978], [0.375, 0.39939, "M", 0.60547, 0.36246], [0.3875, 0.39896, "M", 0.59489, 0.36488], [0.4, 0.39841, "M", 0.58432, 0.36702], [0.4125, 0.39774, "M", 0.57375, 0.36891], [0.425, 0.39694, "M", 0.5632, 0.37053], [0.4375, 0.39601, "M", 0.55266, 0.3719], [0.45, 0.39494, "M", 0.54212, 0.37302], [0.4625, 0.39374, "M", 0.53158, 0.37389], [0.475, 0.3924, "M", 0.52105, 0.37451], [0.4875, 0.39091, "M", 0.51053, 0.37488], [0.5, 0.38928, "M", 0.5, 0.375], [0.5125, 0.38749, "M", 0.48947, 0.37488], [0.525, 0.38555, "M", 0.47895, 0.37451], [0.5375, 0.38345, "M", 0.46842, 0.37389], [0.55, 0.38118, "M", 0.45788, 0.37302], [0.5625, 0.37874, "M", 0.44734, 0.3719], [0.575, 0.37613, "M", 0.4368, 0.37053], [0.5875, 0.37334, "M", 0.42625, 0.36891], [0.6, 0.37036, "M", 0.41568, 0.36702], [0.6125, 0.36723, "P", 0.40511, 0.36488], [0.625, 0.364, "P", 0.39453, 0.36246], [0.6375, 0.36068, "P", 0.38393, 0.35978], [0.65, 0.35725, "P", 0.37331, 0.35681], [0.6625, 0.3537, "P", 0.36268, 0.35356], [0.675, 0.35003, "P", 0.35203, 0.35002], [0.6875, 0.34618, "C", 0.34135, 0.34618], [0.7, 0.34202, "C", 0.33066, 0.34202], [0.7125, 0.33755, "C", 0.31993, 0.33755], [0.725, 0.33274, "C", 0.30917, 0.33274], [0.7375, 0.32758, "C", 0.29837, 0.32758], [0.75, 0.32205, "C", 0.28754, 0.32205], [0.7625, 0.31615, "C", 0.27666, 0.31615], [0.775, 0.30984, "C", 0.26573, 0.30984], [0.7875, 0.30311, "C", 0.25474, 0.30311], [0.8, 0.29592, "C", 0.24368, 0.29592], [0.8125, 0.28824, "C", 0.23256, 0.28824], [0.825, 0.28004, "C", 0.22134, 0.28004], [0.8375, 0.27127, "C", 0.21003, 0.27127], [0.85, 0.26188, "C", 0.1986, 0.26188], [0.8625, 0.25181, "C", 0.18704, 0.25181], [0.875, 0.24097, "C", 0.17531, 0.24097], [0.8875, 0.22927, "C", 0.16338, 0.22927], [0.9, 0.21658, "C", 0.15122, 0.21658], [0.9125, 0.20273, "C", 0.13875, 0.20273], [0.925, 0.1875, "C", 0.12588, 0.1875], [0.9375, 0.17056, "C", 0.1125, 0.17056], [0.95, 0.15142, "C", 0.09838, 0.15142], [0.9625, 0.12928, "C", 0.08315, 0.12928], [0.975, 0.1026, "C", 0.06606, 0.1026], [0.9875, 0.0676, "C", 0.04501, 0.0676], [0.992, 0.05089, "C", 0.03516, 0.05089], [0.995, 0.03721, "C", 0.02695, 0.03721], [0.998, 0.0193, "C", 0.01551, 0.0193]];
const SIMP3_117 = [[0.0455, 0.0455, 0.9091, "r"], [0.0455, 0.0909, 0.8636, "s"], [0.0455, 0.1364, 0.8182, "s"], [0.0455, 0.1818, 0.7727, "s"], [0.0455, 0.2273, 0.7273, "s"], [0.0455, 0.2727, 0.6818, "s"], [0.0455, 0.3182, 0.6364, "s"], [0.0455, 0.3636, 0.5909, "f"], [0.0455, 0.4091, 0.5455, "f"], [0.0455, 0.4545, 0.5, "f"], [0.0455, 0.5, 0.4545, "f"], [0.0455, 0.5455, 0.4091, "f"], [0.0455, 0.5909, 0.3636, "r"], [0.0455, 0.6364, 0.3182, "r"], [0.0455, 0.6818, 0.2727, "r"], [0.0455, 0.7273, 0.2273, "r"], [0.0455, 0.7727, 0.1818, "r"], [0.0455, 0.8182, 0.1364, "s"], [0.0455, 0.8636, 0.0909, "s"], [0.0455, 0.9091, 0.0455, "s"], [0.0909, 0.0455, 0.8636, "r"], [0.0909, 0.0909, 0.8182, "s"], [0.0909, 0.1364, 0.7727, "s"], [0.0909, 0.1818, 0.7273, "s"], [0.0909, 0.2273, 0.6818, "s"], [0.0909, 0.2727, 0.6364, "s"], [0.0909, 0.3182, 0.5909, "f"], [0.0909, 0.3636, 0.5455, "f"], [0.0909, 0.4091, 0.5, "f"], [0.0909, 0.4545, 0.4545, "f"], [0.0909, 0.5, 0.4091, "f"], [0.0909, 0.5455, 0.3636, "r"], [0.0909, 0.5909, 0.3182, "r"], [0.0909, 0.6364, 0.2727, "r"], [0.0909, 0.6818, 0.2273, "r"], [0.0909, 0.7273, 0.1818, "r"], [0.0909, 0.7727, 0.1364, "r"], [0.0909, 0.8182, 0.0909, "s"], [0.0909, 0.8636, 0.0455, "s"], [0.1364, 0.0455, 0.8182, "r"], [0.1364, 0.0909, 0.7727, "s"], [0.1364, 0.1364, 0.7273, "s"], [0.1364, 0.1818, 0.6818, "s"], [0.1364, 0.2273, 0.6364, "s"], [0.1364, 0.2727, 0.5909, "f"], [0.1364, 0.3182, 0.5455, "f"], [0.1364, 0.3636, 0.5, "f"], [0.1364, 0.4091, 0.4545, "f"], [0.1364, 0.4545, 0.4091, "f"], [0.1364, 0.5, 0.3636, "r"], [0.1364, 0.5455, 0.3182, "r"], [0.1364, 0.5909, 0.2727, "r"], [0.1364, 0.6364, 0.2273, "r"], [0.1364, 0.6818, 0.1818, "r"], [0.1364, 0.7273, 0.1364, "r"], [0.1364, 0.7727, 0.0909, "s"], [0.1364, 0.8182, 0.0455, "s"], [0.1818, 0.0455, 0.7727, "r"], [0.1818, 0.0909, 0.7273, "s"], [0.1818, 0.1364, 0.6818, "s"], [0.1818, 0.1818, 0.6364, "s"], [0.1818, 0.2273, 0.5909, "f"], [0.1818, 0.2727, 0.5455, "f"], [0.1818, 0.3182, 0.5, "f"], [0.1818, 0.3636, 0.4545, "f"], [0.1818, 0.4091, 0.4091, "f"], [0.1818, 0.4545, 0.3636, "r"], [0.1818, 0.5, 0.3182, "r"], [0.1818, 0.5455, 0.2727, "r"], [0.1818, 0.5909, 0.2273, "r"], [0.1818, 0.6364, 0.1818, "r"], [0.1818, 0.6818, 0.1364, "r"], [0.1818, 0.7273, 0.0909, "r"], [0.1818, 0.7727, 0.0455, "s"], [0.2273, 0.0455, 0.7273, "r"], [0.2273, 0.0909, 0.6818, "s"], [0.2273, 0.1364, 0.6364, "f"], [0.2273, 0.1818, 0.5909, "f"], [0.2273, 0.2273, 0.5455, "f"], [0.2273, 0.2727, 0.5, "f"], [0.2273, 0.3182, 0.4545, "f"], [0.2273, 0.3636, 0.4091, "f"], [0.2273, 0.4091, 0.3636, "r"], [0.2273, 0.4545, 0.3182, "r"], [0.2273, 0.5, 0.2727, "r"], [0.2273, 0.5455, 0.2273, "r"], [0.2273, 0.5909, 0.1818, "r"], [0.2273, 0.6364, 0.1364, "r"], [0.2273, 0.6818, 0.0909, "r"], [0.2273, 0.7273, 0.0455, "r"], [0.2727, 0.0455, 0.6818, "r"], [0.2727, 0.0909, 0.6364, "f"], [0.2727, 0.1364, 0.5909, "f"], [0.2727, 0.1818, 0.5455, "f"], [0.2727, 0.2273, 0.5, "f"], [0.2727, 0.2727, 0.4545, "f"], [0.2727, 0.3182, 0.4091, "f"], [0.2727, 0.3636, 0.3636, "r"], [0.2727, 0.4091, 0.3182, "r"], [0.2727, 0.4545, 0.2727, "r"], [0.2727, 0.5, 0.2273, "r"], [0.2727, 0.5455, 0.1818, "r"], [0.2727, 0.5909, 0.1364, "r"], [0.2727, 0.6364, 0.0909, "r"], [0.2727, 0.6818, 0.0455, "r"], [0.3182, 0.0455, 0.6364, "f"], [0.3182, 0.0909, 0.5909, "f"], [0.3182, 0.1364, 0.5455, "f"], [0.3182, 0.1818, 0.5, "f"], [0.3182, 0.2273, 0.4545, "f"], [0.3182, 0.2727, 0.4091, "f"], [0.3182, 0.3182, 0.3636, "r"], [0.3182, 0.3636, 0.3182, "r"], [0.3182, 0.4091, 0.2727, "r"], [0.3182, 0.4545, 0.2273, "r"], [0.3182, 0.5, 0.1818, "r"], [0.3182, 0.5455, 0.1364, "r"], [0.3182, 0.5909, 0.0909, "r"], [0.3182, 0.6364, 0.0455, "r"], [0.3636, 0.0455, 0.5909, "f"], [0.3636, 0.0909, 0.5455, "f"], [0.3636, 0.1364, 0.5, "f"], [0.3636, 0.1818, 0.4545, "f"], [0.3636, 0.2273, 0.4091, "f"], [0.3636, 0.2727, 0.3636, "r"], [0.3636, 0.3182, 0.3182, "r"], [0.3636, 0.3636, 0.2727, "r"], [0.3636, 0.4091, 0.2273, "r"], [0.3636, 0.4545, 0.1818, "r"], [0.3636, 0.5, 0.1364, "r"], [0.3636, 0.5455, 0.0909, "r"], [0.3636, 0.5909, 0.0455, "r"], [0.4091, 0.0455, 0.5455, "f"], [0.4091, 0.0909, 0.5, "f"], [0.4091, 0.1364, 0.4545, "f"], [0.4091, 0.1818, 0.4091, "f"], [0.4091, 0.2273, 0.3636, "r"], [0.4091, 0.2727, 0.3182, "r"], [0.4091, 0.3182, 0.2727, "r"], [0.4091, 0.3636, 0.2273, "r"], [0.4091, 0.4091, 0.1818, "r"], [0.4091, 0.4545, 0.1364, "r"], [0.4091, 0.5, 0.0909, "r"], [0.4091, 0.5455, 0.0455, "s"], [0.4545, 0.0455, 0.5, "f"], [0.4545, 0.0909, 0.4545, "f"], [0.4545, 0.1364, 0.4091, "f"], [0.4545, 0.1818, 0.3636, "f"], [0.4545, 0.2273, 0.3182, "r"], [0.4545, 0.2727, 0.2727, "r"], [0.4545, 0.3182, 0.2273, "r"], [0.4545, 0.3636, 0.1818, "r"], [0.4545, 0.4091, 0.1364, "s"], [0.4545, 0.4545, 0.0909, "s"], [0.4545, 0.5, 0.0455, "s"], [0.5, 0.0455, 0.4545, "f"], [0.5, 0.0909, 0.4091, "f"], [0.5, 0.1364, 0.3636, "f"], [0.5, 0.1818, 0.3182, "r"], [0.5, 0.2273, 0.2727, "r"], [0.5, 0.2727, 0.2273, "s"], [0.5, 0.3182, 0.1818, "s"], [0.5, 0.3636, 0.1364, "s"], [0.5, 0.4091, 0.0909, "s"], [0.5, 0.4545, 0.0455, "s"], [0.5455, 0.0455, 0.4091, "f"], [0.5455, 0.0909, 0.3636, "f"], [0.5455, 0.1364, 0.3182, "r"], [0.5455, 0.1818, 0.2727, "s"], [0.5455, 0.2273, 0.2273, "s"], [0.5455, 0.2727, 0.1818, "s"], [0.5455, 0.3182, 0.1364, "s"], [0.5455, 0.3636, 0.0909, "s"], [0.5455, 0.4091, 0.0455, "s"], [0.5909, 0.0455, 0.3636, "f"], [0.5909, 0.0909, 0.3182, "s"], [0.5909, 0.1364, 0.2727, "s"], [0.5909, 0.1818, 0.2273, "s"], [0.5909, 0.2273, 0.1818, "s"], [0.5909, 0.2727, 0.1364, "s"], [0.5909, 0.3182, 0.0909, "s"], [0.5909, 0.3636, 0.0455, "s"], [0.6364, 0.0455, 0.3182, "f"], [0.6364, 0.0909, 0.2727, "s"], [0.6364, 0.1364, 0.2273, "s"], [0.6364, 0.1818, 0.1818, "s"], [0.6364, 0.2273, 0.1364, "s"], [0.6364, 0.2727, 0.0909, "s"], [0.6364, 0.3182, 0.0455, "s"], [0.6818, 0.0455, 0.2727, "f"], [0.6818, 0.0909, 0.2273, "s"], [0.6818, 0.1364, 0.1818, "s"], [0.6818, 0.1818, 0.1364, "s"], [0.6818, 0.2273, 0.0909, "s"], [0.6818, 0.2727, 0.0455, "s"], [0.7273, 0.0455, 0.2273, "s"], [0.7273, 0.0909, 0.1818, "s"], [0.7273, 0.1364, 0.1364, "s"], [0.7273, 0.1818, 0.0909, "s"], [0.7273, 0.2273, 0.0455, "s"], [0.7727, 0.0455, 0.1818, "s"], [0.7727, 0.0909, 0.1364, "s"], [0.7727, 0.1364, 0.0909, "s"], [0.7727, 0.1818, 0.0455, "s"], [0.8182, 0.0455, 0.1364, "s"], [0.8182, 0.0909, 0.0909, "s"], [0.8182, 0.1364, 0.0455, "s"], [0.8636, 0.0455, 0.0909, "s"], [0.8636, 0.0909, 0.0455, "s"], [0.9091, 0.0455, 0.0455, "s"]];
const TYPES117 = [["endpoint projector", 0], ["P", 23], ["L", 4], ["U", 0], ["conic (M < 0)", 32], ["conic (M > 0)", 39]];
const EX383_117 = {"q": 0.07416, "t": 0.18642, "rows": [[0.03, 0.23853, 0.13063], [0.02, 0.22281, 0.12681], [0.01, 0.2056, 0.12416], [0.005, 0.19631, 0.12379], [0.002, 0.19045, 0.12422], [0.001, 0.18845, 0.12454]]};
const EX382_117 = {"t": 0.392161, "k": 0.24206};
const COMBO117 = {"r=0": 8, "p=0": 6, "simple": 21, "floor": 10, "repeated": 15, "n=1": 13, "n=0": 17};
const PC3_117 = 0.6786;
/* ---- film 117 helpers ---- */
function cell117(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
/* a 3x3 matrix of strings */
function mat117(x, y, cw, ch, M, a, colf, size = 18) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((v, j) => { const col = colf ? colf(v, i, j) : C.cyan; box(x + j * cw, y + i * ch, cw - 6, ch - 6, col, a, 1.4, 'rgba(0,0,0,0.45)'); lblG(v, x + j * cw + (cw - 6) / 2, y + i * ch + (ch - 6) / 2 + size * 0.36, C.white, a, size); }));
}
/* the qutrit basis xi, e, f as three nodes; coherence links dashed when pinched */
function qutrit117(cx, cy, R, a, pinch = 0, rot = 0, t = 0) {
  if (a <= 0) return;
  const P = [[cx, cy - R], [cx - R * 0.87, cy + R * 0.5], [cx + R * 0.87, cy + R * 0.5]];
  const nm = ['ξ', 'e', 'f'], cn = ['g', 'c', 'm'], cc = [C.gold, C.cyan, C.mag];
  line(P[0][0], P[0][1], P[1][0], P[1][1], C.cyan, a * 0.8, 2.5);
  [[0, 2], [1, 2]].forEach(([i, j]) => { if (pinch < 1) line(P[i][0], P[i][1], P[j][0], P[j][1], C.white, a * (1 - pinch) * 0.7, 2.5); if (pinch > 0) dashed(P[i][0], P[i][1], P[j][0], P[j][1], C.red, a * pinch * 0.7, 1.6); });
  if (rot > 0) { ctx.save(); ctx.globalAlpha = a * rot; ctx.strokeStyle = C.green; ctx.lineWidth = 3; ctx.beginPath(); const mx = (P[1][0] + P[2][0]) / 2, my = (P[1][1] + P[2][1]) / 2; ctx.arc(mx, my + 10, R * 0.55, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); ctx.restore(); lbl('U₀ : rotate the e–f plane', cx, cy + R * 0.5 + R * 0.55 + 46, C.green, a * rot, 16); }
  P.forEach((p, i) => { dot(p[0], p[1], 18, cn[i], a); lblG(nm[i], p[0] + (i === 0 ? 0 : i === 1 ? -34 : 34), p[1] + (i === 0 ? -28 : 8), cc[i], a, 26); });
  return P;
}
/* horizontal spectrum axis on [-1/2, 1/2] */
function spec117(x0, y0, w, marks, a, o = {}) {
  if (a <= 0) return;
  const xS = v => x0 + (v + 0.5) * w;
  line(x0 - 10, y0, x0 + w + 10, y0, C.dim, a, 1.6);
  [-0.5, 0, 0.5].forEach(v => { line(xS(v), y0 - 8, xS(v), y0 + 8, C.dim, a, 1.4); lbl(v === 0 ? '0' : v > 0 ? '1/2' : '−1/2', xS(v), y0 + 32, C.dim, a, 15); });
  if (o.k != null) { [-o.k, o.k].forEach(v => dashed(xS(v), y0 - 50, xS(v), y0 + 14, C.cyan, a * 0.7, 1.4)); lbl('±k', xS(o.k) + 6, y0 - 56, C.cyan, a * 0.8, 15, 'left'); }
  marks.forEach(([v, lab, dn, col, dy], i) => { dot(xS(v), y0, 11, dn, a); if (lab) lblG(lab, xS(v), y0 - 22 - (dy || 0), col, a, 18); });
}
/* barycentric simplex with xi bottom-left, e bottom-right, f top */
function simp117(cx, cy, R, a, pts, colf, rp = 5) {
  if (a <= 0) return;
  const V = [[cx - R * 0.87, cy + R * 0.5], [cx + R * 0.87, cy + R * 0.5], [cx, cy - R]];
  strokePoly(V, C.dim, a, 2);
  lblG('ξ  (p = 1)', V[0][0] - 10, V[0][1] + 34, C.gold, a, 17, 'left'); lblG('e  (q = 1)', V[1][0] + 10, V[1][1] + 34, C.cyan, a, 17, 'right'); lblG('f  (r = 1)', V[2][0], V[2][1] - 18, C.mag, a, 17);
  pts.forEach((p, i) => { const c = colf(p, i); if (!c) return; const x = p[0] * V[0][0] + p[1] * V[1][0] + p[2] * V[2][0], y = p[0] * V[0][1] + p[1] * V[1][1] + p[2] * V[2][1]; dot(x, y, rp, c[0], a * c[1]); });
}
const BRC117 = { C: ['m', C.mag], P: ['g', C.gold], M: ['c', C.cyan], D: ['n', C.green], R: ['o', C.orange] };

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  qutrit117(470, 440, 180, s0, clamp((u - 2) / 1.5), clamp((u - 3.5) / 1.2), t);
  const rq = Q(S, 0, 'whose chronological record is erased', 0.6);
  for (let i = 0; i < 10; i++) { const b = rnd(i, 117) > 0.5 ? '1' : '0'; cell117(225 + i * 50, 700, 42, 46, b, C.dim, rq * (1 - 0.6 * clamp((u - 6) / 1.5)), 17); }
  line(215, 723, 735, 723, C.red, rq * clamp((u - 6) / 1.0), 3); lbl('chronological record : erased', 480, 790, C.red, rq, 16);
  const items = [['whose chronological record is erased', 'ACTUAL CHANNEL', 'F = Ad_U₀ ∘ Δ_W ,  n uses : Fⁿ', C.cyan], ['one decoder must answer one yes-or-no task', 'ONE TASK , ONE DECODER', 'η_n(E) = min_D sup_ρ |Tr(E·D Fⁿ ρ) − Tr(Eρ)|', C.gold], ['Part one found the error floor and two boundary faces', 'PART ONE', 'floor k = √(r(1 − r)) ;  faces p = 0 , q = 0', C.mag], ['part two finds the exact error', 'PART TWO', 'exact η_n(E) for every v and every finite n', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, i === 1 ? 24 : 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  qutrit117(W / 2, 400, 150, rp, 0.5 + 0.5 * Math.sin(t * 0.8), 0, t);
  ring(W / 2, 430, 230, C.cyan, rp * 0.35, 2);
  chip(330, 330, 330, 58, 'horizon six', C.red, rp, 22); chip(330, 415, 330, 58, 'one quartic', C.gold, rp, 22); chip(330, 500, 330, 58, 'four families', C.cyan, rp, 22);
  box(1420, 320, 380, 210, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('exact , certified', 1610, 380, C.green, rp, 22); lblG('primal = dual = η', 1610, 440, C.white, rp, 28); lbl('one decoder per task', 1610, 495, C.dim, rp, 17);
  txt(scramble('ENVIRONMENT MEMORY II', rp, 117), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC 环 境 记 录 记 忆 第 二 部 · 精 确 任 务 误 差 与 匹 配 证 书', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 117 · AURIC_FIB_ENVIRONMENT_RECORD_MEMORY_II · §29–§44', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 OBSTRUCTION AT HORIZON SIX (§29) ---- */
SCENES.obstruct = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'No projection does as well', 0.6);
  if (f1 > 0) {
    const q0 = Q(S, 0, 'The channel pinches by W', 0.6) * f1;
    chip(W / 2, 250, 1300, 56, 'F = Ad_U₀ ∘ Δ_W ,  Δ_W(X) = (X + WXW)/2 ,  W = diag(1, 1, −1) ,  U₀ = 1 ⊕ rotation of (e, f)', C.cyan, q0, 20);
    qutrit117(420, 510, 150, q0, Q(S, 0, 'pinches by W', 1.0), Q(S, 0, 'then rotates by U zero', 1.0), t);
    lbl('Fⁿ after n uses ; no record , no reference', 420, 770, C.dim, Q(S, 0, 'so n uses give F to the n', 0.6) * f1, 16);
    const tq = Q(S, 0, 'Take horizon six', 0.6) * f1;
    chip(1320, 345, 820, 56, 'n = 6 ,  v* = (ξ + e)/√2 ,  E* = |v*⟩⟨v*|', C.gold, tq, 22);
    mat117(1200, 400, 82, 56, [['1/2', '1/2', '0'], ['1/2', '1/2', '0'], ['0', '0', '0']], tq, v => v === '0' ? C.dim : C.gold, 19);
    lbl('E* in (ξ, e, f)', 1320, 590, C.dim, tq, 15);
    const cq = Q(S, 0, 'The constant effect one half', 0.6) * f1;
    bars63(1560, 520, [-0.5, 0.5, 0.5], 46, 20, 180, cq, C.gold, ['−1/2', '1/2', '1/2']);
    lbl('B = I/2 : residual spectrum', 1660, 410, C.white, cq, 16);
    chip(1320, 700, 820, 56, '(F⁶)†(I/2) − E* = I/2 − E*  ⇒  η₆(E*) ≤ 1/2', C.green, cq, 21);
  }
  const q = Q(S, 1, 'No projection does as well', 0.6, 0.3);
  if (q > 0) {
    const sq = Q(S, 1, 'Five more steps multiply coherence', 0.6);
    chip(530, 250, 860, 54, 'P = P† = P² , any rank m ;  s = (−1/2)⁵ = −1/32', C.white, q, 20);
    lblG('C = (F⁶)†(P) = [[x , sz , 0] , [s z̄ , h , 0] , [0 , 0 , g]]', 530, 318, C.cyan, sq, 19);
    lblG('h = (31y + 33d)/64 ,  g = (33y + 31d)/64 ,  |g − h| ≤ 1/32', 530, 352, C.cyan, sq, 18);
    const eq = Q(S, 1, 'an error of at most one half', 0.6);
    lblG('error ≤ 1/2  ⇒  |sz − 1/2| ≥ 31/64 ,  (x − 1/2)² ≤ 63/4096 < 1/64', 530, 400, C.white, eq, 18);
    lblG('x , h ∈ [3/8 , 5/8] ,  g ∈ [11/32 , 21/32]', 530, 434, C.white, eq, 18);
    const nq = Q(S, 1, 'would put the trace between', 0.6);
    const x0 = 160, w = 740, yN = 580, xS = v => x0 + v / 3 * w;
    line(x0 - 10, yN, x0 + w + 10, yN, C.dim, nq, 2);
    [0, 1, 2, 3].forEach(m => { line(xS(m), yN - 10, xS(m), yN + 10, C.dim, nq, 1.6); lbl(String(m), xS(m), yN + 36, C.white, nq, 18); });
    const bq = Q(S, 1, 'strictly between one and two', 0.6);
    fillBox(xS(35 / 32), yN - 24, xS(61 / 32) - xS(35 / 32), 48, C.red, nq * 0.35); rect63(xS(35 / 32), yN - 24, xS(61 / 32) - xS(35 / 32), 48, C.red, nq, 2);
    lblG('Tr C ∈ [35/32 , 61/32]', (xS(35 / 32) + xS(61 / 32)) / 2, yN - 40, C.red, nq, 18);
    lbl('⊂ (1 , 2)', (xS(35 / 32) + xS(61 / 32)) / 2, yN + 68, C.red, bq, 17);
    const iq = Q(S, 1, 'But the trace is the integer rank', 0.6);
    [0, 1, 2, 3].forEach(m => dot(xS(m), yN, 12, 'g', iq));
    lbl('Tr C = Tr P = m ∈ {0, 1, 2, 3}', 530, 690, C.gold, iq, 18);
    stamp('NO OPTIMAL PROJECTION', 530, 775, iq, C.red, 28, -0.04);
    /* histogram of sampled projection errors */
    const px = 1050, py = 740, pw = 700, ph = 360, xH = v => px + (v - 0.44) / 0.58 * pw;
    plotAxes(px, py, pw, ph, q, 'error ‖(F⁶)†(P) − E*‖', '3000 random projections , ranks 1 , 2');
    const mx = Math.max(...PROJ117.h1.map((v, i) => v + PROJ117.h2[i]));
    PROJ117.h1.forEach((v, i) => { const qq = clamp(q * 1.6 - i / 30), x = xH(0.5 + i / 48), bw = pw * (1 / 48) / 0.58 - 4, h1 = v / mx * ph * 0.85, h2 = PROJ117.h2[i] / mx * ph * 0.85; fillBox(x, py - h1, bw, h1, C.cyan, qq * 0.5); fillBox(x, py - h1 - h2, bw, h2, C.mag, qq * 0.5); });
    dashed(xH(0.5), py, xH(0.5), py - ph, C.green, q, 2); lbl('1/2', xH(0.5), py + 26, C.green, q, 16);
    lbl('rank 1', px + pw - 10, py - ph + 30, C.cyan, q, 15, 'right'); lbl('rank 2', px + pw - 10, py - ph + 55, C.mag, q, 15, 'right');
    lbl('ranks 0 and 3 : error 1', px + pw - 10, py - ph + 80, C.dim, q, 15, 'right');
    const lq = Q(S, 1, 'No projection does as well', 0.6, 1.0);
    lbl('local search : best ' + PROJ117.best.toFixed(4) + ' > 1/2', xH(0.5) + 14, py - ph + 30, C.white, lq, 15, 'left');
    dot(xH(PROJ117.eta6), py, 10, 'n', lq); lbl('exact η₆ = ' + PROJ117.eta6.toFixed(4), xH(PROJ117.eta6) - 8, py - 22, C.green, lq, 15, 'right');
  }
};

/* ---- 03 BALANCED TASK, EVERY HORIZON (§30) ---- */
SCENES.balanced = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const pq = Q(S, 0, 'Now the exact value of that balanced task', 0.6);
  const px = 1050, py = 740, pw = 700, ph = 430, xS = n => px + (n - 1.5) / 13 * pw, yS = v => py - (v - 0.28) / 0.24 * ph;
  plotAxes(px, py, pw, ph, pq, 'horizon n', 'η_n(E*) , balanced task');
  dashed(px, yS(0.5), px + pw, yS(0.5), C.red, pq, 2); lbl('1/2', px + pw, yS(0.5) - 12, C.red, pq, 16, 'right');
  [0.3, 0.4].forEach(v => lbl(v.toFixed(1), px - 10, yS(v) + 6, C.dim, pq, 14, 'right'));
  [2, 4, 6, 8, 10, 12, 14].forEach(n => lbl(String(n), xS(n), py + 26, C.dim, pq, 14));
  const gq = Q(S, 0, 'from horizon four on', 0.6), eq = Q(S, 1, 'Horizons two and three need degree-eight polynomials', 0.6);
  const qa = BAL117.map(([n], i) => n <= 3 ? eq : clamp(gq * 1.6 - i / 16));
  BAL117.forEach(([n, v], i) => { const ex = n <= 3; dot(xS(n), yS(v), ex ? 11 : 8, ex ? 'm' : 'g', qa[i]); if (i > 0) line(xS(BAL117[i - 1][0]), yS(BAL117[i - 1][1]), xS(n), yS(v), C.gold, Math.min(qa[i], qa[i - 1]) * 0.6, 2); });
  lbl('0.3144', xS(2) + 14, yS(0.3144) + 6, C.mag, eq, 15, 'left'); lbl('0.3893', xS(3) + 14, yS(0.3893) + 8, C.mag, eq, 15, 'left');
  lbl('gold : quartic root (n ≥ 4) · magenta : degree eight', px + pw, py - 30, C.dim, gq, 14, 'right');
  const f1 = 1 - Q(S, 1, 'Horizons two and three need degree-eight polynomials', 0.6);
  if (f1 > 0) {
    const q = pq * f1;
    chip(530, 250, 860, 54, 'τ = |s| = 2^(1 − n) ,  L = (1 − τ)/2 ,  E* = |(ξ + e)/√2⟩⟨·|', C.white, q, 20);
    const rq = Q(S, 0, 'the unique root between', 0.6) * f1;
    chip(530, 340, 860, 62, 'τ⁴t⁴ + 2τ²(1 − τ²)t³ + (1 − τ²)²t² − t + 1/4 = 0', C.gold, rq, 23);
    lblG('one root t ∈ (L , 1/2)  ⇒  η_n(E*) = t   for every n ≥ 4', 530, 410, C.gold, rq, 19);
    const kq = Q(S, 0, 'of a quartic in t', 0.6) * f1;
    mat117(250, 450, 120, 56, [['1 − t', 'εw', '0'], ['εw', 't', '0'], ['0', '0', 't']], kq, (v, i, j) => (i === 2 && j === 2) ? C.mag : v === '0' ? C.dim : C.cyan, 19);
    lbl('K_n , w = √(t(1 − t)) , ε = sgn s', 430, 640, C.dim, kq, 15);
    lbl('upper block : rank-one projection', 780, 500, C.cyan, kq, 15); lbl('third eigenvalue t ∈ (0, 1/2)', 780, 535, C.mag, kq, 15); lbl('⇒ K_n is not a projection', 780, 570, C.white, kq, 15);
    lbl('attaining effect B_n = U₀ K_n U₀†', 530, 700, C.green, kq, 17);
  }
  const q = Q(S, 1, 'Horizons two and three need degree-eight polynomials', 0.6, 0.3);
  if (q > 0) {
    chip(530, 250, 860, 54, 'n = 2 :  p₂(u) = 64u⁸ + 576u⁷ + … − 36u − 32 ,  u ∈ (1/2 , 3/4)', C.mag, q, 19);
    chip(530, 320, 860, 54, 'n = 3 :  p₃(u) = 256u⁸ + 3840u⁷ + … − 15000u + 6400 ,  u ∈ (1 , 17/16)', C.mag, q, 19);
    lblG('t = P(u) / (2(√Q(u) + 3))  :  η₂ = 0.3144 ,  η₃ = 0.3893', 530, 390, C.white, Q(S, 1, 'giving point three one four four', 0.6), 19);
    const cq = Q(S, 1, 'Each value comes with an effect that attains it', 0.6);
    box(150, 440, 760, 210, C.green, cq, 2, 'rgba(0,40,20,0.35)');
    lblG('‖E* − G_s(K_n)‖_op = t', 530, 495, C.green, cq, 24);
    lblG('= Tr(Y_n E*) − Tr((Fⁿ(Y_n))₊) ,  ‖Y_n‖₁ = 1', 530, 545, C.white, Q(S, 1, 'a witness that meets it', 0.6), 21);
    lbl('primal effect and dual witness meet : no gap', 530, 605, C.dim, cq, 15);
    const lq = Q(S, 1, 'the error climbs toward one half', 0.6);
    stamp('t → 1/2 AS n → ∞', 530, 740, lq, C.gold, 28, -0.04);
    lbl('recomputed : SDP over all complex effects agrees to 2 × 10⁻⁷ , n = 2 … 14', 1400, 800, C.dim, lq, 14);
  }
};

/* ---- 04 SPECTATOR PLANE, CONDITIONAL QUARTIC (§31) ---- */
SCENES.spectator = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const pq = Q(S, 0, 'Stationarity of a one-variable distance', 0.6);
  const px = 1050, py = 740, pw = 700, ph = 430, xS = p => px + p * pw, yS = v => py - v * ph;
  plotAxes(px, py, pw, ph, pq, 'p  (q = 1 − p , r = 0)', 'horizon three');
  [0, 0.25, 0.5].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, pq, 14)); [0.25, 0.5, 0.75, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 6, C.dim, pq, 14, 'right'));
  const fq = Q(S, 1, 'When y zero is at most t zero', 0.6);
  fillBox(xS(PC3_117), py - ph, xS(1) - xS(PC3_117), ph, C.mag, fq * 0.08);
  dashed(xS(PC3_117), py, xS(PC3_117), py - ph, C.mag, fq, 1.6); lbl('y₀ ≤ t₀', xS(PC3_117) + 10, py - ph + 22, C.mag, fq, 16, 'left');
  const yq = Q(S, 0, 'exactly one admissible root y zero', 0.8), tq = Q(S, 0, 'a residual t zero always below one half', 0.8);
  const D = SP3_117.filter(r => r[0] < 0.99);
  curve(i => { const r = D[Math.round(i * (D.length - 1))]; return [xS(r[0]), yS(r[3])]; }, D.length - 1, C.cyan, yq, 3);
  curve(i => { const r = D[Math.round(i * (D.length - 1))]; return [xS(r[0]), yS(r[4])]; }, D.length - 1, C.gold, tq, 3);
  lbl('y₀(p)', xS(0.08), yS(D[5][3]) - 14, C.cyan, yq, 16, 'left'); lbl('t₀(p)', xS(0.2), yS(D[15][4]) + 30, C.gold, tq, 16, 'left');
  const sq = Q(S, 1, 'this pair is optimal', 0.6);
  D.forEach((r, i) => { if (i % 2) return; dot(xS(r[0]), yS(r[1]), 5, r[2] === 'C' ? 'm' : 'w', sq * 0.9); });
  lbl('dots : SDP value η₃(E_p)', xS(0.28), yS(0.16), C.white, sq, 15, 'left');
  lbl('η = t₀ exactly where y₀ ≤ t₀', xS(0.28), yS(0.16) + 25, C.mag, sq, 15, 'left');
  const f1 = 1 - Q(S, 1, 'When y zero is at most t zero', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'every population on the xi, e plane', 0.6) * f1;
    chip(530, 250, 860, 56, 'v_p = √p ξ + √q e ,  q = 1 − p ,  c = √(pq) ,  r = 0', C.white, q, 21);
    const gq = Q(S, 0, 'Stationarity of a one-variable distance', 0.6) * f1;
    lblG('g(y) = (y − q)² + (c − τ√(y(1 − y)))² ,  g″ > 0', 530, 330, C.cyan, gq, 20);
    chip(530, 400, 860, 60, 'C(y) = D(y)² y(1 − y) − pqτ²(1 − 2y)² = 0', C.cyan, yq * f1, 22);
    lblG('D(y) = 2(1 − τ²)y + τ² − 2q ;  filter D(y₀)(1 − 2y₀) ≥ 0', 530, 460, C.dim, yq * f1, 17);
    lbl('exactly one admissible root y₀ ∈ (0, 1)', 530, 500, C.white, yq * f1, 17);
    chip(530, 580, 860, 60, 't₀ = √((y₀ − q)² + ℓ₀²) < 1/2 ,  ℓ₀ = c − τ√(y₀(1 − y₀))', C.gold, tq * f1, 20);
    lbl('t₀² ≤ g(q) = (1 − τ)² pq < 1/4', 530, 645, C.dim, tq * f1, 16);
  }
  const q = Q(S, 1, 'When y zero is at most t zero', 0.6, 0.3);
  if (q > 0) {
    mat117(190, 250, 150, 56, [['1 − y₀', 'εw₀', '0'], ['εw₀', 'y₀', '0'], ['0', '0', 'y₀']], q, (v, i, j) => v === '0' ? C.dim : (i === 2 ? C.mag : C.cyan), 18);
    lbl('K^C', 160, 330, C.cyan, q, 22, 'right');
    lblG('Y^C = [[2Δ , ℓ₀] , [ℓ₀ , 0]] / (2t₀) ⊕ 0 ,  Δ = y₀ − q', 530, 460, C.gold, q, 19);
    const mq = Q(S, 1, 'its residual and its witness meet at t zero', 0.6);
    chip(530, 545, 860, 60, 'y₀ ≤ t₀  ⇒  η_n(E_p) = t₀ = ‖E_p − G_s(K^C)‖', C.mag, mq, 22);
    lbl('bottom residual y₀ ≤ t₀ ;  upper residual eigenvalues ± t₀', 530, 605, C.dim, mq, 15);
    const hq = Q(S, 1, 'this holds once p exceeds about point six eight', 0.6);
    lbl('recomputed threshold at n = 3 :  p > ' + PC3_117.toFixed(4), 530, 655, C.mag, hq, 18);
    const fq2 = Q(S, 1, 'When the filter fails', 0.6);
    stamp('ELSE : FOUR FAMILIES', 530, 755, fq2, C.cyan, 28, -0.04);
  }
};

/* ---- 05 FOUR FAMILIES (§32–§33) ---- */
SCENES.families = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Every root that passes its filters', 0.6);
  if (f1 > 0) {
    const cards = [['P', 'quartic in t', 'K = projection ⊕ t', C.gold, 'The families are called P'], ['M', 'degree 8 in u', 'quotient P(u)/(√Q(u) + m)', C.cyan, 'a degree-eight polynomial'], ['D±', 'quartic in t', 'scalar d = 0 (s > 0) , d = 1 (s < 0)', C.green, 'a quartic, and either'], ['R±', 'degree 8 (s < 0)', 'quadratic (s > 0)', C.orange, 'either degree eight or a quadratic']];
    cards.forEach(([h, a1, a2, col, ph], i) => { const q = Q(S, 0, ph, 0.6) * f1, x = 150 + (i % 2) * 390, y = 250 + Math.floor(i / 2) * 175; box(x, y, 370, 155, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(h, x + 185, y + 45, col, q, 28); lblG(a1, x + 185, y + 92, C.white, q, 19); lblG(a2, x + 185, y + 128, C.dim, q, 15); });
    const rq = Q(S, 0, 'so at most twenty-four roots', 0.6) * f1;
    chip(530, 640, 860, 56, 'even n (s < 0) :  4 + 8 + 4 + 8 = 24 roots', C.white, rq, 21);
    chip(530, 712, 860, 56, 'odd n (s > 0) :  4 + 8 + 4 + 2 = 18 roots', C.white, Q(S, 0, 'and eighteen at odd ones', 0.6) * f1, 21);
    /* branch strips along p */
    const sq = Q(S, 0, 'The families are called P', 0.6, 0.8) * f1;
    [[SP2_117, 'n = 2', 320], [SP3_117, 'n = 3', 520]].forEach(([D, nm, y]) => {
      lbl(nm, 1030, y + 30, C.white, sq, 20, 'left');
      const x0 = 1140, w = 620;
      D.forEach((r, i) => { const pn = i + 1 < D.length ? D[i + 1][0] : 1, p0 = i === 0 ? 0 : r[0], c = BRC117[r[2]]; fillBox(x0 + p0 * w, y, (pn - p0) * w + 1, 46, c[1], sq * 0.55); });
      rect63(x0, y, w, 46, C.dim, sq, 1.4);
      let prev = null, st = 0;
      D.concat([[1, 0, '#']]).forEach((r, i) => { if (r[2] !== prev) { if (prev && prev !== '#') { const mid = (st + (i < D.length ? r[0] : 1)) / 2; const wd = (i < D.length ? r[0] : 1) - st; if (wd > 0.04) lbl(prev === 'C' ? 'cond.' : prev, x0 + mid * w, y + 30, '#000', sq, 17); } prev = r[2]; st = i === 0 ? 0 : r[0]; } });
      lbl('0', x0, y + 72, C.dim, sq, 14); lbl('p', x0 + w / 2, y + 72, C.dim, sq, 14); lbl('1', x0 + w, y + 72, C.dim, sq, 14);
    });
    lbl('selected branch along the ξ–e plane (recomputed)', 1450, 280, C.dim, sq, 15);
    lbl('n = 2 : R only for p > 0.99', 1450, 420, C.orange, sq, 15);
    lbl('cond. = conditional pair of §31', 1450, 640, C.mag, sq, 15);
  }
  const q = Q(S, 1, 'Every root that passes its filters', 0.6, 0.3);
  if (q > 0) {
    const ck = [['0 ≤ K ≤ I₃ , all denominators nonzero', 'a feasible effect'], ['Y = Y† ,  ‖Y‖₁ = 1', 'a witness of trace norm one'], ['Tr(G_s(Y) K) = Tr(G_s(Y)₊)', 'equal primal and dual values'], ['‖E_p − G_s(K)‖ = t = Tr(Y(E_p − G_s(K)))', 'equal primal and dual values']];
    ck.forEach(([s, ph], i) => { const qq = Q(S, 1, ph, 0.6, i === 3 ? 0.6 : 0); box(150, 250 + i * 82, 760, 66, C.green, qq, 1.6, 'rgba(0,40,20,0.35)'); lblG(s, 530, 292 + i * 82, C.white, qq, 20); });
    const aq = Q(S, 1, 'So retained roots never disagree', 0.6);
    chip(530, 610, 860, 58, '⇒  η_n(E_p) = t  for every retained root', C.green, aq, 23);
    stamp('ALL RETAINED ROOTS AGREE', 530, 720, aq, C.green, 26, -0.04);
    const px = 1050, py = 740, pw = 700, ph = 430, xS = p => px + p * pw, yS = v => py - v / 0.52 * ph;
    plotAxes(px, py, pw, ph, q, 'p', 'η_n(E_p) , coloured by selected branch');
    [0.1, 0.2, 0.3, 0.4, 0.5].forEach(v => lbl(v.toFixed(1), px - 10, yS(v) + 6, C.dim, q, 14, 'right'));
    [[SP2_117, 'n = 2'], [SP3_117, 'n = 3']].forEach(([D, nm], k) => { D.forEach((r, i) => { const qq = clamp(q * 1.8 - i / 120 - k * 0.3); dot(xS(r[0]), yS(r[1]), 6, BRC117[r[2]][0], qq); }); lbl(nm, xS(0.5) + 8, yS(D[39][1]) + (k ? -14 : 30), C.white, q, 16, 'left'); });
    [['C', 'cond.'], ['P', 'P'], ['M', 'M'], ['D', 'D'], ['R', 'R']].forEach(([k, s], i) => { dot(px + 30 + i * 120, py - ph + 20, 8, BRC117[k][0], q); lbl(s, px + 46 + i * 120, py - ph + 26, BRC117[k][1], q, 15, 'left'); });
    lbl('recomputed : n = 2 … 7 , 82 tasks each ; every retained root = SDP value', 1400, 800, C.dim, aq, 14);
  }
};

/* ---- 06 NONEMPTINESS AND THE DECODER (§34–§35) ---- */
SCENES.decoder = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So for every p and every finite horizon', 0.6);
  if (f1 > 0) {
    const steps = [['compact convex image', 'G_s( effects ) , optimum K', C.cyan, 'An optimum and a supporting witness'], ['0 < t < 1/2', 'strict at both ends', C.gold, 'always exist'], ['separation', 'witness Y , ‖Y‖₁ = 1', C.mag, 'a supporting witness always exist'], ['spectral cases', 'A indefinite / A rank one', C.green, 'a case analysis of their spectra']];
    steps.forEach(([h, s, col, ph], i) => { const qq = Q(S, 0, ph, 0.6) * f1, y = 250 + i * 125; box(150, y, 560, 100, col, qq, 2, 'rgba(0,0,0,0.5)'); lbl(h, 430, y + 40, col, qq, 20); lblG(s, 430, y + 78, C.white, qq, 18); if (i < 3) arrow(430, y + 102, 430, y + 122, C.dim, qq, 2); });
    const tq = Q(S, 0, 'places every optimum in the conditional pair', 0.6) * f1;
    const rows = [['Y = A ⊕ (−μ) , A indefinite , μ = 0', '→ conditional pair (§31)', C.mag], ['A indefinite , μ > 0 , K₂ a projection', '→ P', C.gold], ['A indefinite , μ > 0 , free eigenvalue', '→ M  (0 < d < 1) ,  D±  (d = 0 , 1)', C.cyan], ['A positive of rank one', '→ R−  (s < 0) ,  R+  (s > 0)', C.orange]];
    rows.forEach(([a1, a2, col], i) => { const qq = clamp(tq * 1.6 - i * 0.25), y = 260 + i * 120; box(860, y, 920, 96, col, qq, 1.8, 'rgba(0,0,0,0.5)'); lblG(a1, 1320, y + 38, C.white, qq, 18); lblG(a2, 1320, y + 74, col, qq, 19); });
    const eq = Q(S, 0, 'including endpoints and transitions', 0.6) * f1;
    lbl('non-strict filters keep h = ±1 , μ = 0 , d = 0, 1 , λ = 0, t and multiple roots', 1320, 770, C.dim, eq, 15);
    stamp('NEVER EMPTY', 430, 790, eq, C.green, 26, -0.04);
  }
  const q = Q(S, 1, 'So for every p and every finite horizon', 0.6, 0.3);
  if (q > 0) {
    const mq = Q(S, 1, 'measure the effect B', 0.6), pq2 = Q(S, 1, 'then prepare the task state', 0.6);
    box(150, 390, 150, 100, C.white, q, 2, 'rgba(0,0,0,0.5)'); lblG('ρ', 225, 452, C.white, q, 30);
    arrow(305, 440, 365, 440, C.dim, q, 2.5);
    box(370, 390, 150, 100, C.cyan, q, 2, 'rgba(0,30,40,0.4)'); lblG('Fⁿ', 445, 452, C.cyan, q, 30);
    arrow(525, 440, 585, 440, C.dim, mq, 2.5);
    box(590, 390, 180, 100, C.gold, mq, 2, 'rgba(40,30,0,0.4)'); lblG('{B , I − B}', 680, 452, C.gold, mq, 22);
    arrow(775, 425, 860, 370, C.green, pq2, 2.5); arrow(775, 455, 860, 515, C.mag, pq2, 2.5);
    chip(990, 360, 240, 54, 'prepare E_p', C.green, pq2, 20); chip(990, 525, 240, 54, '(I − E_p)/2', C.mag, pq2, 20);
    lblG('D_B(X) = Tr(BX) E_p + Tr((I − B)X) (I − E_p)/2', 640, 610, C.white, pq2, 20);
    lblG('Kraus : 3 × √b_j |v_p⟩⟨u_j|  +  6 × √((1 − b_j)/2) |w_k⟩⟨u_j|', 640, 650, C.dim, pq2, 16);
    lblG('one CPTP map on the same qutrit , fixed for all inputs ;  D_B†(E_p) = B', 640, 685, C.dim, pq2, 16);
    const vq = Q(S, 1, 'the value is exact', 0.6);
    chip(1450, 390, 620, 60, 'η_n(E_p) = t = ‖(Fⁿ)†(B) − E_p‖_op', C.green, vq, 22);
    lbl('B = U₀ K U₀† , K the selected effect', 1450, 450, C.dim, vq, 15);
    const cq = Q(S, 1, 'The complementary task has the same value', 0.6);
    chip(1450, 560, 620, 60, 'η_n(I − E_p) = η_n(E_p)', C.mag, cq, 23);
    lbl('same channel , prepared states exchanged', 1450, 620, C.dim, cq, 15);
    lbl('recomputed : Kraus sum = I ; worst sampled error ≤ t ; eigenstate attains t', 960, 790, C.dim, pq2, 15);
  }
};

/* ---- 07 INTERIOR RESIDUALS (§36) ---- */
SCENES.interior = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q0 = Q(S, 0, 'Now the interior', 0.6);
  const q1 = Q(S, 1, 'Two cases remain', 0.6);
  simp117(470, 540, 280, q0, SIMP3_117, p => p[3] === 'f' ? ['c', 0.35] : (q1 > 0 ? (p[3] === 'r' ? ['g', 1] : ['m', 1]) : ['o', 0.9]), 6);
  lbl('horizon three , grid of 210 tasks , SDP optima', 470, 762, C.dim, q0, 16);
  lbl('cyan : floor (η = k) · orange : floor test fails', 470, 795, C.orange, q0 * (1 - q1), 15);
  lbl('cyan : floor · gold : repeated , h = t · magenta : simple , h < t', 470, 795, C.white, q1, 15);
  const f1 = 1 - Q(S, 1, 'A real witness supports each optimum', 0.6);
  spec117(1020, 470, 660, [[-0.2228, '−t', 'g', C.gold], [0.1268, 'h', 'c', C.cyan], [0.2228, 't', 'g', C.gold]], Q(S, 0, 'Every optimal residual then has spectrum', 0.6));
  if (f1 > 0) {
    const sq = Q(S, 0, 'Every optimal residual then has spectrum', 0.6) * f1;
    chip(1350, 270, 820, 58, 'R = G_s(K) − E ,  spec R = (−t , h , t)', C.white, sq, 23);
    lbl('example : n = 3 , r = 0.02 near the task of Proposition 38.3', 1350, 560, C.dim, sq, 15);
    const kq = Q(S, 0, 'the floor k', 0.6) * f1;
    chip(1350, 640, 820, 58, 'k = √(r(1 − r)) < t < 1/2 ,  0 ≤ h ≤ t', C.cyan, kq, 23);
    lbl('k < t : floor test of part one fails ;  t < 1/2 : explicit inverse perturbation', 1350, 700, C.dim, kq, 14);
  }
  if (q1 > 0 || Q(S, 1, 'A real witness supports each optimum', 0.6) > 0) {
    const wq = Q(S, 1, 'A real witness supports each optimum', 0.6, 0.3);
    chip(1350, 270, 820, 58, 'Y = Y₊ − Y₋ ,  ‖Y‖₁ = 1 ,  real symmetric', C.white, wq, 22);
    const pq = Q(S, 1, 'its positive part on the minus t eigenspace', 0.6), nq = Q(S, 1, 'its negative part on the plus t eigenspace', 0.6);
    arrow(1020 + 0.2772 * 660, 395, 1020 + 0.2772 * 660, 425, C.green, pq, 3); lbl('Y₊ here', 1020 + 0.2772 * 660, 383, C.green, pq, 16);
    arrow(1020 + 0.7228 * 660, 395, 1020 + 0.7228 * 660, 425, C.red, nq, 3); lbl('Y₋ here', 1020 + 0.7228 * 660, 383, C.red, nq, 16);
    lblG('t = Tr(YE) − Tr((Fⁿ(Y))₊) = −Tr(YR) ,  Tr(HK) = Tr(H₊)', 1350, 560, C.white, nq, 18);
    chip(1150, 650, 400, 60, 'repeated : h = t', C.gold, Q(S, 1, 'repeated contact, where h equals t', 0.6), 22);
    chip(1570, 650, 400, 60, 'simple : h < t', C.mag, Q(S, 1, 'simple contact, where h is below t', 0.6), 22);
    lbl('recomputed : 240 random interior tasks , n = 2 … 5 ; every SDP optimum has this spectrum', 1350, 750, C.dim, q1, 14);
  }
};

/* ---- 08 REPEATED CONTACT (§37–§38) ---- */
SCENES.repeated = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'An exact example', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Repeated contact is finite', 0.6) * f1;
    lbl('active constraint', 330, 255, C.dim, q, 15); lbl('root degree', 640, 255, C.dim, q, 15); lbl('signs e₀', 820, 255, C.dim, q, 15);
    const rows = [['d = 0', '2'], ['d = 1', '2'], ['det K₂ = 0', '4'], ['det(I − K₂) = 0', '4']];
    rows.forEach(([a1, a2], i) => { const qq = clamp(Q(S, 0, 'four root equations', 0.6) * 1.6 - i * 0.2) * f1, y = 275 + i * 72; box(150, y, 760, 60, C.gold, qq, 1.6, 'rgba(40,30,0,0.35)'); lblG(a1, 330, y + 38, C.white, qq, 20); lbl(a2, 640, y + 38, C.gold, qq, 22); lblG('±√(t² − k²)', 820, y + 38, C.cyan, Q(S, 0, 'each with two signs', 0.6) * f1, 17); });
    lblG('roots k < t < 1/2 :  2 · (2 + 2 + 4 + 4) = 24 sign-roots , 12 roots', 530, 600, C.white, Q(S, 0, 'each with two signs', 0.6) * f1, 17);
    const gq = Q(S, 0, 'at most two normal generators', 0.6) * f1;
    lblG('normals : 0 ⊕ (−1) , 0 ⊕ 1 , −(I − K₂/T₀) , (K₂ − (T₀ − 1)I)/(2 − T₀) ;  ≤ 2 active', 530, 650, C.dim, gq, 15);
    lbl('two generators : ≤ 13 exact samples in θ', 530, 685, C.dim, gq, 15);
    const aq = Q(S, 0, 'Every accepted entry is a global optimum', 0.6) * f1;
    chip(1350, 300, 820, 60, 'accepted ⇒ ‖G_s(K) − E‖ = t = Tr(YE) − Tr((FⁿY)₊)', C.green, aq, 20);
    const eq = Q(S, 0, 'one exists whenever a repeated optimum does', 0.6) * f1;
    chip(1350, 400, 820, 60, 'repeated optimum exists ⇒ accepted list ≠ ∅', C.gold, eq, 22);
    lbl('empty list ⇒ every optimum has h < t', 1350, 460, C.dim, eq, 16);
    spec117(1020, 620, 660, [[-0.3, '−t', 'g', C.gold], [0.3, 't , t', 'g', C.gold]], aq);
    lbl('residual R = tI − 2t wwᵀ : one −t , a double +t', 1350, 700, C.dim, aq, 15);
    lbl('recomputed : every repeated SDP optimum has a certified accepted entry', 1350, 760, C.dim, eq, 14);
  }
  const q = Q(S, 1, 'An exact example', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 58, 'n = 3 ,  p = q = 1/32 ,  r = 15/16 ,  any phases', C.white, q, 22);
    const eq = Q(S, 1, 'The error solves', 0.6);
    chip(530, 350, 860, 62, '2560t² + 498t − 589 = 0', C.gold, eq, 28);
    lblG('t = (√1569841 − 249)/2560 ≈ ' + EX382_117.t.toFixed(4), 530, 420, C.gold, Q(S, 1, 'about point three nine two two', 0.6), 22);
    const kq = Q(S, 1, 'p and q one thirty-second', 0.6, 1.2);
    lblG('K₂ = (1/13) [[5t + 3 , 12 − 32t] , [12 − 32t , 8t − 3]] ,  d = 1', 530, 490, C.cyan, kq, 19);
    lblG('det K₂ = 3(8t − 3)(17 − 41t)/169 > 0 ,  Tr K₂ = t', 530, 528, C.dim, kq, 17);
    lbl('Theorem 38.1 quadratic family (odd n) ; open neighbourhood of populations', 530, 580, C.dim, kq, 15);
    const sq = Q(S, 1, 'about point three nine two two', 0.6);
    const px = 1050, py = 640;
    lbl('residual spectrum', 1350, 300, C.white, q, 18);
    bars63(1180, py - 120, [-EX382_117.t, EX382_117.t, EX382_117.t], 70, 40, 400, sq, C.gold, ['−t', 't', 't']);
    dashed(1120, py - 120 - EX382_117.k * 400, 1560, py - 120 - EX382_117.k * 400, C.cyan, sq, 1.6); lbl('k = √15/16 ≈ ' + EX382_117.k.toFixed(3), 1570, py - 120 - EX382_117.k * 400 + 6, C.cyan, sq, 15, 'left');
    stamp('SPECTRUM (−t , t , t)', 1350, 760, sq, C.gold, 26, -0.04);
    lbl('recomputed : SDP agrees to 5 × 10⁻⁹', 1350, 820, C.dim, sq, 14);
  }
};

/* ---- 09 SIMPLE CONTACT (§38.3, §39–§42) ---- */
SCENES.simple = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For these tasks the volume enumerates', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'At horizon three take q star', 0.6) * f1;
    chip(530, 260, 860, 58, '123904 q*² − 43264 q* + 2527 = 0 ,  q* ≈ ' + EX383_117.q.toFixed(4), C.gold, q, 21);
    lblG('ρ = 0 :  K₂ = [[7/8 , √7/8] , [√7/8 , 1/8]] ,  d = 1/8', 530, 330, C.cyan, q, 19);
    lblG('spec = (−t* , 1/8 , t*) ,  t* ≈ ' + EX383_117.t.toFixed(4), 530, 368, C.cyan, q, 19);
    const rq = Q(S, 0, 'put a small weight rho on f', 0.6) * f1;
    chip(530, 450, 860, 58, 'p = (1 − ρ)p* ,  q = (1 − ρ)q* ,  r = ρ', C.white, rq, 22);
    const hq = Q(S, 0, 'Every optimum then has h below t', 0.6) * f1;
    chip(530, 560, 860, 58, 'small ρ > 0 :  every optimum has h < t', C.mag, hq, 23);
    lbl('a repeated limit would need spectrum (−t*, t*, t*) at ρ = 0 , but 1/8 < t*', 530, 620, C.dim, hq, 15);
    const px = 1050, py = 740, pw = 700, ph = 430, xS = r => px + r / 0.032 * pw, yS = v => py - v / 0.25 * ph;
    plotAxes(px, py, pw, ph, rq, 'ρ (weight on f)', 'SDP optimum , horizon three');
    [0.1, 0.2].forEach(v => lbl(v.toFixed(1), px - 10, yS(v) + 6, C.dim, rq, 14, 'right')); [0, 0.01, 0.02].forEach(v => lbl(String(v), xS(v), py + 26, C.dim, rq, 14));
    const R = EX383_117.rows.slice().sort((a, b) => a[0] - b[0]);
    const cq = Q(S, 0, 'recomputed, h stays near one eighth', 0.6) * f1;
    dot(xS(0), yS(EX383_117.t), 9, 'g', rq); dot(xS(0), yS(0.125), 9, 'c', rq);
    R.forEach((r, i) => { dot(xS(r[0]), yS(r[1]), 8, 'g', rq); dot(xS(r[0]), yS(r[2]), 8, 'c', hq); if (i) { line(xS(R[i - 1][0]), yS(R[i - 1][1]), xS(r[0]), yS(r[1]), C.gold, rq * 0.6, 2); line(xS(R[i - 1][0]), yS(R[i - 1][2]), xS(r[0]), yS(r[2]), C.cyan, hq * 0.6, 2); } });
    line(xS(0), yS(EX383_117.t), xS(R[0][0]), yS(R[0][1]), C.gold, rq * 0.6, 2); line(xS(0), yS(0.125), xS(R[0][0]), yS(R[0][2]), C.cyan, hq * 0.6, 2);
    lbl('t (error)', xS(0.03) - 6, yS(R[R.length - 1][1]) - 16, C.gold, rq, 16, 'right'); lbl('h (middle eigenvalue)', xS(0.03) - 6, yS(R[R.length - 1][2]) + 30, C.cyan, hq, 16, 'right');
    dashed(px, yS(0.125), px + pw, yS(0.125), C.cyan, cq * 0.6, 1.2); lbl('1/8', px + pw + 8, yS(0.125) + 6, C.cyan, cq, 15, 'left');
  }
  const q = Q(S, 1, 'For these tasks the volume enumerates', 0.6, 0.3);
  if (q > 0) {
    const pq = Q(S, 1, 'projector faces', 0.6);
    chip(530, 260, 860, 56, 'faces : Π_j(u) ⊕ δ ,  P : Π ⊕ w ,  L : wΠ ⊕ 1 ,  U : (I − wΠ) ⊕ 0', C.gold, pq, 18);
    const cq = Q(S, 1, 'two reciprocal charts of a dual conic', 0.6);
    const cx = 530, cy = 520, sc = 95;
    line(cx - 330, cy, cx + 330, cy, C.dim, cq * 0.5, 1); line(cx, cy - 190, cx, cy + 190, C.dim, cq * 0.5, 1);
    [1, -1].forEach(sg => curve(i => { const th = (i - 0.5) * 2.3; const x = sg * Math.cosh(th), y = Math.sinh(th) * 0.9; return [cx + (x * 1.0 + y * 0.35) * sc, cy - (y + 0.15 * x) * sc]; }, 60, C.cyan, cq, 3));
    const bx = cx + (1.0) * sc, by = cy - 0.15 * sc;
    dot(bx, by, 10, 'g', cq); lbl('base point (1, 0)', bx + 16, by + 30, C.gold, cq, 15, 'left');
    [-1.6, -0.6, 0.5, 1.4].forEach((j, i) => { const ang = Math.atan(j); line(bx - Math.cos(ang) * 260, by + Math.sin(ang) * 260, bx + Math.cos(ang) * 200, by - Math.sin(ang) * 200, C.gold, cq * 0.55, 1.4); });
    dashed(bx, cy - 190, bx, cy + 190, C.mag, cq, 2); lbl('chart B : j ↦ 1/j covers the vertical line', cx, cy + 225, C.mag, cq, 15);
    lbl('chart A : lines y = j(x − 1)', cx - 300, cy - 175, C.gold, cq, 15, 'left');
    const rq = Q(S, 1, 'rebuilds the effect from each dual point', 0.6);
    lblG('rebuild : C = E − tS + hP₀ , then invert G_s ;  exact filters (41.9)', 530, 790, C.white, rq, 17);
    const tq = Q(S, 1, 'Every support type is covered', 0.6);
    const bx0 = 1080, by0 = 300, mx = Math.max(...TYPES117.map(r => r[1]));
    lbl('support types of sampled simple-contact optima', 1420, 265, C.white, tq, 16);
    TYPES117.forEach(([nm, v], i) => { const y = by0 + i * 62, w = v / mx * 420, qq = clamp(tq * 1.6 - i * 0.15); lbl(nm, bx0 + 190, y + 34, C.white, qq, 15, 'right'); fillBox(bx0 + 205, y + 8, Math.max(w, 2), 38, i < 4 ? C.gold : C.cyan, qq * 0.5); rect63(bx0 + 205, y + 8, Math.max(w, 2), 38, i < 4 ? C.gold : C.cyan, qq, 1.4); lbl(String(v), bx0 + 215 + w, y + 34, C.white, qq, 16, 'left'); });
    lbl('gold : projector faces (§40) · cyan : dual conics (§41)', 1420, 700, C.dim, tq, 15);
    lbl('0 : type not met in this sample of 98 optima', 1420, 728, C.dim, tq, 15);
    const nq = Q(S, 1, 'so the simple-contact list is never empty', 0.6);
    stamp('LIST NEVER EMPTY', 1420, 795, nq, C.green, 26, -0.04);
  }
};

/* ---- 10 DEGREE BOUNDS (§43) ---- */
SCENES.degrees = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'All of this is bounded in advance', 0.6);
  const bars = [['total degree factored', 11, C.gold, 'total degree at most eleven'], ['primal resultant (u)', 57, C.cyan, 'solves equations in one variable'], ['dual resultant (u)', 61, C.cyan, 'solves equations in one variable'], ['projection polynomial', 104, C.mag, 'degree at most one hundred four'], ['candidate bound', 1e5, C.green, 'fewer than one hundred thousand candidates'], ['algebraic degree of the value', 505825689600, C.red, 'The selected value has algebraic degree']];
  const x0 = 520, y0 = 270, lw = 1180, rs = 72, L = v => Math.log10(v) / 12 * lw;
  lbl('log₁₀ scale', x0 + lw, y0 + 6 * rs + 40, C.dim, q, 15, 'right');
  [0, 3, 6, 9, 12].forEach(e => { line(x0 + e / 12 * lw, y0 - 10, x0 + e / 12 * lw, y0 + 6 * rs - 10, C.dim, q * 0.25, 1); lbl(['10⁰', '10³', '10⁶', '10⁹', '10¹²'][e / 3], x0 + e / 12 * lw, y0 + 6 * rs + 14, C.dim, q, 14); });
  bars.forEach(([nm, v, col, ph], i) => { const k = i === 5 ? 1 : 0, qq = Q(S, k, ph, 0.6), y = y0 + i * rs; lbl(nm, x0 - 20, y + 38, C.white, qq, 17, 'right'); fillBox(x0, y + 10, L(v), 44, col, qq * 0.45); rect63(x0, y + 10, L(v), 44, col, qq, 1.6); if (v > 1e6) lbl('16 · 792 · 11! = 505 825 689 600', x0 + 20, y + 40, C.white, qq, 18, 'left'); else lbl(v === 1e5 ? '< 100 000' : String(v), x0 + L(v) + 14, y + 40, col, qq, 18, 'left'); });
  lbl('57 = 4·6 + 3·11 ,  61 = 5·5 + 6·6 ,  104 = 6 + 66 + 6 + 2 + 24', 960, 745, C.dim, Q(S, 0, 'degree at most one hundred four', 0.6), 16);
  const oq = Q(S, 1, 'A fixed order takes the first accepted entry', 0.6);
  lbl('order : repeated j = 1…4 , t ↑ , e₀ − before + → endpoints → P → L → U (chart 1, 2) → dual ε = −1 , +1 (chart A , B)', 960, 785, C.white, oq, 15);
  const sq = Q(S, 1, 'every choice gives the same value', 0.6);
  stamp('SAME VALUE FOR EVERY CHOICE', 1400, 300, sq, C.green, 24, -0.04);
};

/* ---- 11 ASSEMBLY (§44) ---- */
SCENES.assembly = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'Finally the pieces combine', 0.6);
  box(150, 250, 380, 110, C.white, q, 2, 'rgba(0,0,0,0.5)'); lbl('any complex unit v', 340, 295, C.white, q, 20); lblG('n ≥ 0 , any angle θ', 340, 335, C.dim, q, 18);
  const br = [['n = 0 , 1', 'Theorem 27.3 (part one)', C.dim, 'Horizons zero and one', 'n=0'], ['p = 0 or q = 0', 'Theorems 27.4–27.5 (part one)', C.dim, 'the faces p zero and q zero', 'p=0'], ['r = 0 , pq > 0', 'Theorem 35.1 , p = 1/2 : 30.3', C.mag, 'the family r zero', 'r=0'], ['floor (27.24)', 'Theorem 27.7 , value k', C.cyan, 'the floor region', 'floor'], ['repeated contact', '§37 , accepted list', C.gold, 'repeated contact and simple contact', 'repeated'], ['simple contact', '§§40–43 , faces and conics', C.green, 'and simple contact cover', 'simple']];
  br.forEach(([a1, a2, col, ph, key], i) => { const qq = Q(S, 0, ph, 0.6), y = 250 + i * 90; line(530, 305, 640, y + 38, C.dim, qq * 0.6, 1.6); box(650, y, 560, 76, col === C.dim ? C.white : col, qq, 1.8, 'rgba(0,0,0,0.5)'); lblG(a1, 680, y + 33, col === C.dim ? C.white : col, qq, 19, 'left'); lbl(a2, 680, y + 62, C.dim, qq, 14, 'left'); const c = COMBO117[key] || 0; lbl(String(c), 1190, y + 48, C.white, qq, 20, 'right'); });
  lbl('recomputed sample counts (90 random complex v)', 1190, 240, C.dim, Q(S, 0, 'Horizons zero and one', 0.6), 13, 'right');
  const cq = Q(S, 0, 'cover every complex unit vector', 0.6);
  lbl('n = 0 , 1 · faces · r = 0 · floor · repeated · simple : exhaustive', 680, 800, C.white, cq, 16);
  const f1 = 1 - Q(S, 1, 'Each case returns the value', 0.6);
  if (f1 > 0) {
    const aq = cq * f1;
    chip(1520, 330, 480, 58, 'phase transfer Λ', C.cyan, aq, 21);
    lblG('v = Λ(√p , √q , √r)ᵀ', 1520, 400, C.white, aq, 19);
    lblG('K_Λ = ΛKΛ† , Y_Λ = ΛYΛ†', 1520, 440, C.white, aq, 19);
    lbl('value depends only on (p , q , r)', 1520, 490, C.dim, aq, 15);
    lbl('recomputed : SDP with random phases', 1520, 525, C.dim, aq, 15);
  }
  const q1 = Q(S, 1, 'Each case returns the value', 0.6, 0.3);
  if (q1 > 0) {
    const outs = [['value η_n(E)', C.white, 'Each case returns the value'], ['effect B = U₀ K_Λ U₀†', C.cyan, 'an attaining effect'], ['witness Y_Λ , ‖Y_Λ‖₁ = 1', C.gold, 'a matching lower certificate'], ['decoder D_B , all inputs', C.green, 'one same-qutrit decoder'], ['complement I − E : same value', C.mag, 'Complements give the rank-two tasks'], ['E = 0 , I : error zero', C.dim, 'the trivial tasks have error zero']];
    outs.forEach(([s, col, ph], i) => { const qq = Q(S, 1, ph, 0.6), y = 255 + i * 88; box(1250, y, 540, 70, col === C.dim ? C.white : col, qq, 1.6, 'rgba(0,0,0,0.5)'); lblG(s, 1520, y + 44, col === C.dim ? C.white : col, qq, 19); });
    lblG('zero value : Y = E , Tr(E²) − Tr(Fⁿ(E)) = 0', 1520, 800, C.dim, Q(S, 1, 'the trivial tasks have error zero', 0.6), 15);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The observable-recovery framework of Bény, Kempf and Kribs is a published input', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['HORIZON SIX', 'no projection', C.red, 'Projections fail at horizon six'], ['BALANCED', 'quartic , n ≥ 4', C.gold, 'the balanced task reduces to a quartic'], ['ξ–e PLANE', 'quartic + P M D R', C.cyan, 'the xi, e plane closes'], ['INTERIOR', '(−t , h , t)', C.mag, 'the interior splits'], ['CONTACT', 'h = t  or  h < t', C.green, 'into repeated and simple contact'], ['DEGREE', '≤ 16·792·11!', C.vio, 'all of finite degree']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + i * 296, q = Q(S, 0, ph) * fade; box(x - 130, 240, 260, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 19); lblG(a2, x, 340, C.white, q, 20); });
    lbl('PUBLISHED · observable recovery framework : Bény–Kempf–Kribs , Phys. Rev. A 76 , 042303 (2007) , Definition 8 , Theorem 9', W / 2, 470, C.cyan, Q(S, 1, 'is a published input') * fade, 15);
    lbl('PART ONE · channel , effect image (27.6) , floor and faces (27.3–27.8) , decoder (27.5)', W / 2, 515, '#8fbcff', Q(S, 1, 'is a published input', 0.5, 0.6) * fade, 15);
    lbl('VOLUME · no projection at n = 6 · balanced quartic · conditional quartic · P M D R · nonemptiness · interior spectra · repeated · simple · degrees', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · SDP over complex effects · projection search 0.6277 · η_n(E*) · 492 r = 0 tasks · 240 interior tasks · t = 0.3922 · q* · conic identities', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM · VOLUME NOT YET DIGESTED', W / 2, 690, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    qutrit117(W / 2, 380, 140, a, 0.5 + 0.5 * Math.sin(t * 0.8), 0, t);
    ring(W / 2, 410, 210, C.cyan, a * 0.35, 2);
    txt('ENVIRONMENT MEMORY II', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC 环境记录记忆 第二部 · 精确任务误差与匹配证书 · TRURETURING FILM 117', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Every task gets an attaining effect, a lower witness that meets it, and one fixed decoder.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'ENVIRONMENT MEMORY II', obstruct: 'HORIZON SIX', balanced: 'BALANCED TASK', spectator: 'CONDITIONAL QUARTIC', families: 'FOUR FAMILIES', decoder: 'EXACT VALUE AND DECODER', interior: 'INTERIOR RESIDUALS', repeated: 'REPEATED CONTACT', simple: 'SIMPLE CONTACT', degrees: 'DEGREE BOUNDS', assembly: 'ASSEMBLY', finale: 'LEDGER' });

function poster117() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  qutrit117(460, 500, 210, 1, 0.6, 0.8, t);
  ring(460, 530, 300, C.cyan, 0.35, 2);
  txt('‖(F⁶)†(P) − E*‖ > 1/2 ≥ η₆', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.red });
  txt('η_n(E) = primal = dual', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('spec (−t , h , t) · P M D R', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 环境记录记忆 第二部', W / 2, 140, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ENVIRONMENT MEMORY II', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('精 确 任 务 误 差 · 匹 配 证 书', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 117', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster117;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
