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

/* ---- film 072: AURIC-Langlands IV · degeneration, ramification and stable recovery ---- */
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
const _po72 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po72.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po72.set(key, off); }
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
const C13_72 = [[0.001, 500.025], [0.001122, 445.5419], [0.00126, 396.9967], [0.001414, 353.7423], [0.001586, 315.2024], [0.001781, 280.8633], [0.001998, 250.2672], [0.002243, 223.0066], [0.002517, 198.718], [0.002825, 177.0778], [0.00317, 157.7976], [0.003558, 140.6203], [0.003993, 125.3172], [0.004481, 111.6841], [0.005029, 99.5395], [0.005645, 88.7215], [0.006335, 79.0859], [0.00711, 70.5043], [0.007979, 62.8623], [0.008955, 56.058], [0.01005, 50.0008], [0.011279, 44.6099], [0.012659, 39.8134], [0.014207, 35.5474], [0.015944, 31.7549], [0.017894, 28.3854], [0.020083, 25.3938], [0.022539, 22.7401], [0.025296, 20.3888], [0.028389, 18.3083], [0.031861, 16.4703], [0.035758, 14.85], [0.040131, 13.425], [0.045039, 12.1755], [0.050547, 11.0836], [0.056729, 10.1333], [0.063667, 9.3099], [0.071454, 8.6003], [0.080192, 7.9922], [0.09, 7.4742]];
const LAM72 = [[0.0, 0.0], [0.0393, 0.00308], [0.0785, 0.01233], [0.1178, 0.02773], [0.1571, 0.04925], [0.1963, 0.07686], [0.2356, 0.11052], [0.2749, 0.15018], [0.3142, 0.19577], [0.3534, 0.24723], [0.3927, 0.30448], [0.432, 0.36743], [0.4712, 0.43597], [0.5105, 0.51002], [0.5498, 0.58944], [0.589, 0.67412], [0.6283, 0.76393], [0.6676, 0.85873], [0.7069, 0.95838], [0.7461, 1.06271], [0.7854, 1.17157], [0.8247, 1.2848], [0.8639, 1.40221], [0.9032, 1.52362], [0.9425, 1.64886], [0.9817, 1.77772], [1.021, 1.91001], [1.0603, 2.04552], [1.0996, 2.18404], [1.1388, 2.32536], [1.1781, 2.46927], [1.2174, 2.61553], [1.2566, 2.76393], [1.2959, 2.91424], [1.3352, 3.06622], [1.3744, 3.21964], [1.4137, 3.37426], [1.453, 3.52985], [1.4923, 3.68616], [1.5315, 3.84296], [1.5708, 4.0]];
const CAP72 = [[6, 1.5117], [20, 1.7435], [80, 1.9021], [300, 1.9656]];
const FIRST72 = [0.7541, 0.8716, 0.9511, 0.9828];
/* ---- film 072 helpers ---- */
function ell72(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function fillEll72(cx, cy, rx, ry, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function cell72(x, y, w, h, s, col, a, size = 20, fillA = 0.35) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function sphere72(cx, cy, R, col, a, t) {
  if (a <= 0) return;
  fillEll72(cx, cy, R, R, col, a * 0.05);
  ring(cx, cy, R, col, a, 2.5);
  ell72(cx, cy, R, R * 0.28, col, a * 0.6, 1.5);
  for (let k = 0; k < 3; k++) { const ph = t * 0.25 + k * Math.PI / 3; ell72(cx, cy, Math.abs(Math.cos(ph)) * R, R, col, a * 0.35, 1.2); }
}
const WALK72 = (() => { let s = 72, x = 0, y = 0; const pts = [[0, 0]]; const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; for (let i = 0; i < 90; i++) { x += (rnd() < 0.5 ? -1 : 1) * 14 + 1.5; y += (rnd() < 0.5 ? -1 : 1) * 14; pts.push([x, y]); } return pts; })();

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['where data stop separating sources', 'FIBRES', 'a sphere the data cannot see', C.gold], ['where readings collide', 'COLLISIONS', 'readings meet, sources stay apart', C.cyan], ['where sources ramify', 'RAMIFICATION', 'a sign that lives on a cover', C.mag], ['where an observation turns critical', 'CRITICAL MEAN', 'a first step that never goes away', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 28); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 320, 58, 'blind circle', C.gold, rp, 22); chip(330, 445, 320, 58, 'seven readings', C.mag, rp, 22); chip(330, 530, 320, 58, 'sign on a cover', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('first step', 1610, 410, C.cyan, rp, 22); lblG('I_n → √(κC)', 1610, 470, C.white, rp, 28);
  txt(scramble('AURIC–LANGLANDS IV · DEGENERATION', rp, 472), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC–Langlands 第 四 部 · 退 化 、分 歧 与 稳 定 恢 复', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 072 · AURIC_LANGLANDS_DEGENERATION_RAMIFICATION_AND_STABLE_RECOVERY_THEORY', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FIBRE ---- */
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Away from that layer', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Start with the quadratic covariants', 0.6) * f1;
    chip(W / 2, 250, 1320, 64, 'q(A) = ( −½ tr A² ,  −A² + ⅕ tr(A²) I ,  *(ω_A ∧ ω_A) )  ∈  ℝ ⊕ Sym²₀V ⊕ V', C.gold, q, 22);
    lbl('source ρ = S + iA ⪰ 0 ,  A ∈ 𝔰𝔬₅ ,  compared up to the common sign [A]±', W / 2, 310, C.dim, q, 16);
    const sq = Q(S, 0, 'on the equal-weight rank-four layer', 0.6) * f1;
    const cx = 470, cy = 560, R = 165;
    sphere72(cx, cy, R, C.cyan, sq, t);
    lbl('equal-weight rank-4 fibre : S²  (common-sign quotient ℝP²)', cx, cy + R + 48, C.cyan, sq, 16);
    const tq = Q(S, 0, 'exactly the tangent plane', 0.6) * f1;
    const px = cx + R * 0.42, py = cy - R * 0.52, ux = 105, uy = -18, vx = 38, vy = 52;
    const pl = [[px - ux - vx, py - uy - vy], [px + ux - vx, py + uy - vy], [px + ux + vx, py + uy + vy], [px - ux + vx, py - uy + vy]];
    fillPoly(pl, C.gold, tq * 0.15); strokePoly(pl, C.gold, tq, 2); dot(px, py, 8, 'g', tq);
    lbl('ker Dq_A = T_A S²', px + 70, py - 92, C.gold, tq, 20);
    const kq = Q(S, 0, 'Their differential is injective almost everywhere', 0.6) * f1;
    lbl('dim ker Dq_A  (on the 10-dimensional 𝔰𝔬₅)', 1410, 420, C.dim, kq, 17);
    const rows = [['A = 0', '10', C.white, kq], ['rank 2', '0', C.white, kq], ['rank 4 , distinct scales', '0', C.white, kq], ['rank 4 , equal scales', '2', C.gold, sq]];
    rows.forEach(([a1, a2, col, qq], i) => { const y = 445 + i * 72; box(1050, y, 720, 58, col, qq, 1.5, 'rgba(0,0,0,0.45)'); lbl(a1, 1080, y + 37, C.white, qq, 20, 'left'); lbl(a2, 1740, y + 38, col, qq, 26, 'right'); });
  }
  const q = Q(S, 1, 'Away from that layer', 0.6, 0.3);
  if (q > 0) {
    chip(500, 250, 840, 62, 'compact C ⊂ ℛ :  d±(A, B) ≤ c_C ‖q(A) − q(B)‖', C.green, q, 22);
    const fq = Q(S, 1, 'Yet two strictly legal sources', 0.6);
    lbl('A_δ = (s+δ) J₁₂ + (s−δ) J₃₄', 500, 355, C.cyan, fq, 21);
    lbl('B_δ = (s+δ) J₁₃ − (s−δ) J₂₄', 500, 395, C.mag, fq, 21);
    lbl('same σ , same β = 2(s² − δ²) e₅ ;  γ differs by diag(0, 4sδ, −4sδ, 0, 0)', 500, 440, C.dim, fq, 15);
    const cq = Q(S, 1, 'condition ratio of about one over two delta', 0.6);
    chip(500, 545, 840, 66, 'd± / ‖Δq‖ = √(s² + δ²) / (2sδ)  ~  1/(2δ)', C.gold, cq, 26);
    lbl('S = I/5 , s + δ < 1/5 : both strictly legal', 500, 610, C.green, fq, 17);
    const pq = Q(S, 1, 'condition ratio', 0.8);
    const px = 1060, py = 760, pw = 680, ph = 430, xS = d => px + (Math.log10(d) + 3) / 2 * pw, yS = v => py - (Math.log10(v) - 0.8) / 2 * ph;
    plotAxes(px, py, pw, ph, pq, 'δ   (10⁻³ … 10⁻¹)', 'ratio , s = 0.1 (log)');
    curve(p => { const i = Math.min(C13_72.length - 1, p * (C13_72.length - 1)), i0 = Math.floor(i), fr = i - i0, A0 = C13_72[i0], A1 = C13_72[Math.min(C13_72.length - 1, i0 + 1)]; return [xS(A0[0] * (1 - fr) + A1[0] * fr), yS(A0[1] * (1 - fr) + A1[1] * fr)]; }, 80, C.gold, pq, 3);
    dot(xS(0.001), yS(500.025), 7, 'g', pq); lbl('≈ 500 at δ = 10⁻³', xS(0.001) + 20, yS(500) + 8, C.gold, pq, 16, 'left');
    stamp('LEGAL , HARD TO SEPARATE', 500, 710, Q(S, 1, 'ever harder to tell apart', 0.6), C.red, 28, -0.05);
  }
};

/* ---- 03 DEPTH ---- */
SCENES.depth = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Depth one is not enough', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A calibrated filter', 0.6) * f1;
    chip(W / 2, 245, 1240, 60, 'F = diag(1, 2, 3, 4, 5) / 6 ,  depths 0, 1, 2 :  𝒯_F(A) = ( K(A), β(A), K(FAF), K(F²AF²) )', C.gold, q, 20);
    const pq = Q(S, 0, 'a panel of fifty numbers', 0.8) * f1;
    const groups = [[15, C.cyan, 'K(A) : 15'], [5, C.gold, 'β(A) : 5'], [15, C.mag, 'K(FAF) : 15'], [15, C.vio, 'K(F²AF²) : 15']];
    let k = 0;
    groups.forEach(([n, col, lab]) => { const x0 = 175 + k * 31.5; for (let i = 0; i < n; i++) { const qq = clamp(pq * 1.6 - (k + i) / 80); fillBox(175 + (k + i) * 31.5, 330, 26, 44, col, qq * 0.45); rect63(175 + (k + i) * 31.5, 330, 26, 44, col, qq, 1.2); } lbl(lab, x0 + n * 31.5 / 2, 400, col, pq, 16); k += n; });
    const rq = Q(S, 0, 'The panel has rank forty-five', 0.6) * f1;
    const bx = 410, by = 480, bw = 1100, u55 = bw / 55;
    fillBox(bx, by, 40 * u55, 54, C.green, rq * 0.4); rect63(bx, by, 40 * u55, 54, C.green, rq, 1.6);
    fillBox(bx + 40 * u55, by, 5 * u55, 54, C.gold, rq * 0.5); rect63(bx + 40 * u55, by, 5 * u55, 54, C.gold, rq, 1.6);
    rect63(bx + 45 * u55, by, 10 * u55, 54, C.red, rq, 1.6);
    lbl('40 square-moment directions', bx + 20 * u55, by + 35, C.white, rq, 18); lbl('+5', bx + 42.5 * u55, by + 35, C.white, rq, 18);
    lbl('kernel 10', bx + 50 * u55, by + 35, C.red, rq, 18);
    lbl('rank 𝓛_F = 45   of   dim Sym²(ℝ¹⁰) = 55', W / 2, by - 18, C.white, rq, 20);
    const nq = Q(S, 0, 'no tensor of rank two or less', 0.6) * f1;
    stamp('NO RANK ≤ 2 IN THE KERNEL', W / 2, 640, nq, C.green, 34, -0.04);
    lbl('rank-one source tensors x xᵀ are recovered ;  arbitrary symmetric tensors are not', W / 2, 715, C.dim, nq, 16);
    lbl('certificate : c_F = 1/40310784000 ,  C_T = 4/(7c_F)', W / 2, 750, C.dim, nq, 15);
  }
  const q = Q(S, 1, 'Depth one is not enough', 0.6, 0.3);
  if (q > 0) {
    const cx = 420, cy = 500, R = 190;
    ring(cx, cy, R, C.gold, q, 3);
    lbl('ℝP¹ : θ mod π', cx, cy - R - 26, C.gold, q, 20);
    const nP = 6;
    for (let i = 0; i < nP; i++) { const th = i / nP * Math.PI + t * 0.15, x = cx + R * Math.cos(2 * th), y = cy + R * Math.sin(2 * th); dot(x, y, 8, 'g', q); }
    lbl('A_θ = s (cos θ L₂ + sin θ L₃)  on  n⊥', cx, cy + R + 50, C.white, q, 18);
    lbl('n = (√30, 0, √35, 0, √63) / √128', cx, cy + R + 85, C.cyan, q, 18);
    lbl('spec PGP |_{n⊥} = (g₂, g₂, g₄, g₄)', cx, cy + R + 118, C.dim, q, 16);
    const rq = Q(S, 1, 'gives identical original, success and failure readings', 0.6);
    const labs = [['original q', C.cyan], ['success q(FAF)', C.mag], ['failure q(LAL)', C.vio]];
    const H72 = [0.8, 0.55, 0.9, 0.35, 0.65];
    labs.forEach(([lab, col], j) => { const x0 = 860 + j * 300; for (let i = 0; i < 5; i++) { const h = 150 * H72[(i + j * 2) % 5]; fillBox(x0 + i * 42, 560 - h, 30, h, col, rq * 0.5); rect63(x0 + i * 42, 560 - h, 30, h, col, rq, 1.3); } lbl(lab, x0 + 95, 600, col, rq, 17); });
    for (let j = 0; j < 3; j++) arrow(cx + R + 20, cy, 845 + j * 300, 470, C.dim, rq * 0.5, 1.5);
    stamp('SAME READINGS ALONG THE CIRCLE', 1290, 330, rq, C.red, 30, -0.05);
    const tq = Q(S, 1, 'Any two fixed depths fail the same way', 0.6);
    chip(1290, 680, 820, 60, 'depths r < s :  A_θ = F⁻ʳ B_θ F⁻ʳ  is blind again', C.white, tq, 22);
    lbl('three depths (0, 1, 2) are the minimum ;  near A = 0 no Hölder exponent beats ½', 1290, 740, C.dim, tq, 15);
  }
};

/* ---- 04 HECKE ---- */
SCENES.hecke = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'as supplied by the published geometric Langlands results', 'published']]);
  const f1 = 1 - Q(S, 1, 'So it cannot replace the Hecke functors', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The quadratic data are a twenty-dimensional quotient', 0.6) * f1;
    const bx = 410, by = 300, bw = 1100, u55 = bw / 55;
    lbl('Sym²(𝔰𝔬₅) : 55', W / 2, by - 20, C.white, q, 22);
    fillBox(bx, by, 20 * u55, 70, C.cyan, q * 0.35); rect63(bx, by, 20 * u55, 70, C.cyan, q, 2);
    [[1, '𝟏'], [14, 'V₁₄'], [5, 'V₅']].reduce((x, [n, s]) => { line(bx + (x + n) * u55, by, bx + (x + n) * u55, by + 70, C.cyan, q * 0.6, 1.2); lbl(s, bx + (x + n / 2) * u55, by + 44, C.white, q, n > 2 ? 20 : 16); return x + n; }, 0);
    const wq = Q(S, 0, 'with a thirty-five-dimensional kernel W', 0.6) * f1;
    fillBox(bx + 20 * u55, by, 35 * u55, 70, C.mag, wq * 0.3); rect63(bx + 20 * u55, by, 35 * u55, 70, C.mag, wq, 2);
    lbl('W = ker Ψ : 35', bx + 37.5 * u55, by + 44, C.mag, wq, 22);
    lbl('Ψ(A ⊙ A) = q(A) : image 20', bx + 10 * u55, by + 110, C.cyan, q, 17);
    const dq = Q(S, 0, 'The panel sees a difference inside W', 0.6) * f1;
    chip(W / 2, 520, 1000, 62, 'A = sL₁ , B = sL₂ :  q(A) = q(B) ,  A⊙A − B⊙B ∈ W ∖ {0}', C.gold, dq, 22);
    lbl('the three-depth panel separates the two tensors', W / 2, 580, C.green, dq, 18);
    const eq = Q(S, 0, 'its fixed filter is not equivariant', 0.6) * f1;
    lbl('F = diag(1, …, 5)/6 does not commute with SO₅ changes of basis  →  no tensor-functor structure', W / 2, 660, C.red, eq, 18);
  }
  const q = Q(S, 1, 'So it cannot replace the Hecke functors', 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 260, 900, 64, 'ε_T : 𝖧_T(𝓕)  ≅  E_T ⊠ 𝓕', C.cyan, q, 28);
    const nq = Q(S, 1, 'the full eigen-structure and its naturality', 0.6);
    const x1 = 620, x2 = 1300, y1 = 400, y2 = 560;
    lblG('𝖧_{R,x}(𝓕)', x1, y1, C.white, nq, 26); lblG('𝖧_{W,x}(𝓕)', x2, y1, C.white, nq, 26);
    lblG('E_{R,x} ⊗ 𝓕', x1, y2, C.white, nq, 26); lblG('E_{W,x} ⊗ 𝓕', x2, y2, C.white, nq, 26);
    arrow(x1 + 120, y1 - 8, x2 - 120, y1 - 8, C.gold, nq, 2.5); arrow(x1 + 120, y2 - 8, x2 - 120, y2 - 8, C.gold, nq, 2.5);
    arrow(x1, y1 + 20, x1, y2 - 40, C.cyan, nq, 2.5); arrow(x2, y1 + 20, x2, y2 - 40, C.cyan, nq, 2.5);
    lbl('𝖧(p_W)_x(𝓕) ≠ 0', (x1 + x2) / 2, y1 - 30, C.gold, nq, 18); lbl('p_{W,E,x} ⊗ id', (x1 + x2) / 2, y2 + 30, C.gold, nq, 17);
    lbl('ε_R', x1 - 50, (y1 + y2) / 2, C.cyan, nq, 18); lbl('ε_W', x2 + 50, (y1 + y2) / 2, C.cyan, nq, 18);
    const pq = Q(S, 1, 'as supplied by the published geometric Langlands results', 0.6);
    box(460, 640, 1000, 120, C.cyan, pq, 2, 'rgba(0,25,40,0.6)');
    lbl('EXTERNAL · Gaitsgory–Raskin I §6.1 , V §5.5 · geometric Satake (Mirković–Vilonen)', W / 2, 678, C.cyan, pq, 16);
    lblG('de Rham , half-twisted , unramified · E without parabolic reduction', W / 2, 725, C.white, pq, 20);
  }
};

/* ---- 05 RAMIFY ---- */
SCENES.ramify = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, "A reading's discriminant", 'classical'], [0, 'yet even order proves nothing', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'For two sources the residue', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "A reading's discriminant", 0.6) * f1;
    chip(W / 2, 245, 900, 64, 'disc Q_m = I_m² · Δ_{𝒜,b}', C.gold, q, 30);
    lbl('v_s(disc Q_m) = v_s(Δ) + 2 length_R(𝒜 / R[m])', W / 2, 305, C.dim, q, 17);
    const eq = Q(S, 0, 'so over an étale source collisions vanish to even order', 0.6) * f1;
    const lx = 460, ly = 560, pw = 520, ph = 300;
    plotAxes(lx - pw / 2, ly + ph / 2, pw, ph, eq, 's', 'readings m(s)');
    line(lx - pw / 2 + 10, ly - ph / 2 + 30, lx + pw / 2 - 10, ly + ph / 2 - 30, C.cyan, eq, 3);
    line(lx - pw / 2 + 10, ly + ph / 2 - 30, lx + pw / 2 - 10, ly - ph / 2 + 30, C.mag, eq, 3);
    dot(lx, ly, 8, 'g', eq);
    lbl('étale source 𝒜 = R ⊕ R , readings ±s collide', lx, ly + ph / 2 + 45, C.white, eq, 17);
    lbl('Δ unit , disc = 4s² : even order', lx, ly + ph / 2 + 78, C.green, eq, 17);
    const rq = Q(S, 0, 't cubed equals s', 0.6) * f1;
    const rx = 1380, ry = 560;
    const sv = 0.5 + 0.5 * Math.cos(t * 0.8), rad = 130 * Math.cbrt(Math.max(sv, 0.001));
    ring(rx, ry, 130, C.dim, rq * 0.5, 1.2);
    for (let k = 0; k < 3; k++) { const ang = t * 0.27 + k * 2 * Math.PI / 3; dot(rx + rad * Math.cos(ang), ry + rad * Math.sin(ang), 8, 'm', rq); }
    dot(rx, ry, 4, 'n', rq);
    lbl('𝒜 = R[t] / (t³ − s) : three sources merge', rx, ry + 190, C.white, rq, 17);
    lbl('Δ = −27 s² : even order, yet ramified', rx, ry + 223, C.red, rq, 17);
    stamp('EVEN ≠ UNRAMIFIED', rx, ry - 190, rq, C.red, 30, -0.05);
  }
  const q = Q(S, 1, 'For two sources the residue', 0.6, 0.3);
  if (q > 0) {
    chip(520, 250, 880, 62, '𝒜_η = R[e]/(e² − s^η) ,  m = c + s^k u e', C.white, q, 22);
    const rows = [['η = 0', 'Δ = 4', 'residue k', 'monodromy +1', C.green], ['η = 1', 'Δ = 4s', 'residue k + ½', 'monodromy −1', C.mag]];
    rows.forEach(([a1, a2, a3, a4, col], i) => { const y = 320 + i * 72, qq = Q(S, 1, i ? 'the monodromy is minus one exactly when the source ramifies' : 'the residue is k plus eta over two', 0.6); box(100, y, 840, 58, col, qq, 1.5, 'rgba(0,0,0,0.45)'); lbl(a1, 160, y + 37, col, qq, 19); lbl(a2, 330, y + 37, C.white, qq, 19); lbl(a3, 560, y + 37, C.white, qq, 19); lbl(a4, 810, y + 37, col, qq, 19); });
    const mq = Q(S, 1, 'the monodromy is minus one', 0.6);
    const cx = 520, cy = 640, R = 80;
    ring(cx, cy, R, C.mag, mq, 2); dot(cx, cy, 5, 'n', mq);
    const ph = (t * 0.6) % (2 * Math.PI);
    dot(cx + R * Math.cos(ph / 2) * 0 + R * Math.cos(ph), cy + R * Math.sin(ph), 7, 'c', mq);
    const sgn = Math.cos(ph / 2);
    fillBox(cx + 130, cy - 40, 30, 80 * Math.abs(sgn), sgn >= 0 ? C.green : C.red, mq * 0.6);
    lbl('√s : sign flips once around s = 0', cx + 185, cy + 6, C.white, mq, 17, 'left');
    const cq = Q(S, 1, 'a combination m plus lambda j changes the chart', 0.6);
    const px = 1350, py = 470, pts = [[-2, 1], [-2, -1], [0.5, 1.6], [1.5, -0.6], [-0.4, -1.4]];
    plotAxes(px - 250, py + 170, 500, 340, cq, 'm', 'j');
    pts.forEach(([m, j], i) => dot(px + m * 90, py + j * 90 * -1, 9, i < 2 ? 'r' : 'c', cq));
    dashed(px - 2 * 90, py - 170, px - 2 * 90, py + 170, C.red, cq * 0.6, 1.5);
    lbl('same m', px - 2 * 90 + 12, py + 150, C.red, cq, 15, 'left');
    const lam = 0.45, dx = Math.cos(Math.atan(lam)), dy = Math.sin(Math.atan(lam));
    line(px - 230 * dx, py + 230 * dy, px + 230 * dx, py - 230 * dy, C.gold, cq, 2.5);
    lbl('project along m + λ j', px + 150, py - 130, C.gold, cq, 16);
    chip(1350, 720, 740, 60, 'm + λ j :  at most C(n, 2) bad λ', C.gold, Q(S, 1, 'avoiding at most n choose two bad values', 0.6), 22);
    lbl('old power basis : σ_min(V_m) ≍ |d| , λ_min(G_m) ≍ d²', 1350, 775, C.dim, cq, 15);
  }
};

/* ---- 06 ORIENTATION ---- */
SCENES.orientation = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'a class of order two in the Picard group', 'classical'], [1, 'trivial exactly when the discriminant is a square', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Extending the twisted lift', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The sign of the source permutation', 0.6) * f1;
    const cx = 330, cy = 470, R = 120;
    const P3 = [0, 1, 2].map(k => [cx + R * Math.cos(-Math.PI / 2 + k * 2 * Math.PI / 3), cy + R * Math.sin(-Math.PI / 2 + k * 2 * Math.PI / 3)]);
    ring(cx, cy, R, C.dim, q * 0.5, 1.2); P3.forEach(([x, y], k) => dot(x, y, 10, ['c', 'm', 'g'][k], q)); lbl('sources over a point of U', cx, cy - R - 50, C.dim, q, 16);
    curve(p => { const a = -Math.PI / 2 + 2 * Math.PI / 3 * (p + 0.15) * 0.7; return [cx + (R + 30) * Math.cos(a), cy + (R + 30) * Math.sin(a)]; }, 30, C.red, q, 2.5);
    lbl('transposition : −1', cx, cy + R + 60, C.red, q, 18);
    lbl('3-cycle : +1', cx, cy + R + 92, C.green, q, 18);
    chip(1060, 245, 860, 62, 'ε = sgn ∘ ν : Γ → μ₂ ,   ρ̃^ε(γ) = ε(γ) ρ̃(j_*γ)', C.gold, q, 22);
    const kq = Q(S, 0, 'keeps the SO five system and its eigenvalues', 0.6) * f1;
    box(650, 330, 820, 80, C.green, kq, 2, 'rgba(0,0,0,0.45)'); lbl('SO₅ system ϖ ρ̃^ε = ϖ ρ̃ : unchanged , all SO₅ eigenvalues kept', 1060, 378, C.green, kq, 18);
    const vq = Q(S, 0, 'but changes the spinor system', 0.6) * f1;
    box(650, 430, 820, 80, C.mag, vq, 2, 'rgba(0,0,0,0.45)'); lbl('V₄(ρ̃^ε) = V₄(ρ̃) ⊗ L_ε : spinor system changes ,  Λ²₀V₄ does not', 1060, 478, C.mag, vq, 18);
    const dq = Q(S, 0, 'selecting a source and killing the sign together', 0.6) * f1;
    chip(1060, 590, 860, 66, '[F₀ : H ∩ ker sgn] = m · [H : H ∩ ker sgn]  ∈  {m , 2m}', C.white, dq, 22);
    lbl('natural S_n : 2n for n ≥ 3 ,  S₂ : 2 ;  80 random transitive groups : 44 × m , 36 × 2m', 1060, 650, C.dim, dq, 16);
  }
  const q = Q(S, 1, 'Extending the twisted lift', 0.6, 0.3);
  if (q > 0) {
    const cx = 450, cy = 500;
    ell72(cx, cy, 320, 130, C.cyan, q, 2.5); fillEll72(cx, cy, 320, 130, C.cyan, q * 0.05);
    [-160, 0, 160].forEach(dx => ell72(cx + dx, cy, 45, 16, C.white, q, 1.6));
    const bp = [[-230, -70, 2], [-60, 90, 1], [110, -95, 4], [250, 50, 3]];
    const bq = Q(S, 1, 'it needs only even discriminant order at the branch points', 0.6);
    bp.forEach(([dx, dy, o]) => { const ev = o % 2 === 0; ring(cx + dx, cy + dy, 9, ev ? C.green : C.red, bq, 2.5); lbl('ord ' + o, cx + dx, cy + dy - 18, ev ? C.green : C.red, bq, 15); });
    lbl('Y₀ : compactified selecting branch', cx, cy + 180, C.white, q, 17);
    chip(1250, 260, 840, 62, 'ε(δ_x) = (−1)^{ord_x Δ_m}', C.gold, q, 24);
    chip(1250, 360, 840, 62, 'unramified on Y₀  ⇔  div(g) ∈ 2 Div(Y₀) ,  g = f₀* Δ_m', C.green, bq, 21);
    const pq = Q(S, 1, 'a class of order two in the Picard group', 0.6);
    chip(1250, 470, 840, 62, 'D_g = ½ div(g) :  𝒪(D_g) ∈ Pic⁰(Y₀)[2]', C.cyan, pq, 22);
    const sq = Q(S, 1, 'trivial exactly when the discriminant is a square', 0.6);
    chip(1250, 570, 840, 62, 'trivial  ⇔  g ∈ ℂ(Y₀)^×²', C.white, sq, 24);
    lbl('global orientation may need 2m while the unramified extension needs only m', 1250, 640, C.dim, sq, 16);
  }
};

/* ---- 07 SEVEN ---- */
SCENES.seven = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'That is a local inverse', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The six atoms J J J J M J', 0.6) * f1;
    const word = ['·', 'J', 'J', 'J', 'J', 'M', 'J'], acc = ['I', 'J', 'I', 'J', 'I', 'M', 'JM'], tr = [1, 1, 1, 1, 1, 5 / 3, 4 / 3];
    word.forEach((w, i) => { const x = 180 + i * 110, qq = clamp(q * 2 - i / 7); cell72(x, 250, 80, 56, w, w === 'M' ? C.cyan : w === 'J' ? C.mag : C.dim, qq, 22); lbl(acc[i], x + 40, 340, C.gold, qq, 18); const h = tr[i] * 120; fillBox(x + 20, 580 - h, 40, h, C.green, qq * 0.5); rect63(x + 20, 580 - h, 40, h, C.green, qq, 1.4); lbl('t=' + i, x + 40, 610, C.dim, qq, 15); });
    lbl('A_i (left products)', 180 - 20, 340, C.gold, q, 15, 'right');
    lbl('tr(A_i P) at the test point : 1, 1, 1, 1, 1, 5/3, 4/3', 560, 650, C.white, q, 17);
    lbl('Φ_i = d + g(i) tr(A_i P) ,  i = 0 … 6 :  7 readings , 7 unknowns (r, b, h₀ … h₃, d)', 560, 690, C.dim, q, 15);
    const jq = Q(S, 0, 'give a full-rank Jacobian', 0.6) * f1;
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { const x = 1150 + j * 46, y = 250 + i * 46, d = i === j; fillBox(x, y, 40, 40, d ? C.gold : C.cyan, jq * (d ? 0.55 : 0.12 + 0.1 * ((i * 3 + j * 5) % 4))); }
    lbl('DΦ : 7 × 7', 1150 + 160, 600, C.white, jq, 18);
    const dq = Q(S, 0, 'its determinant is forty-eight', 0.6) * f1;
    chip(1310, 670, 700, 64, 'det DΦ = 48  at r = 1/3 , b = 2/3 , g ≡ 1 , d = 0', C.gold, dq, 22);
    lbl('full rank at 300 / 300 random points ;  denominator a power of b', 1310, 730, C.dim, dq, 15);
  }
  const q = Q(S, 1, 'That is a local inverse', 0.6, 0.3);
  if (q > 0) {
    const bx = 300, sc = 120;
    lbl('readings', bx - 30, 300, C.dim, q, 16, 'right');
    fillBox(bx, 330, 7 * sc, 70, C.green, q * 0.4); rect63(bx, 330, 7 * sc, 70, C.green, q, 2); lbl('local inverse near a regular point : 7', bx + 3.5 * sc, 375, C.white, q, 20);
    const eq = Q(S, 1, 'still demands eight readings', 0.6);
    fillBox(bx, 450, 8 * sc, 70, C.gold, eq * 0.4); rect63(bx, 450, 8 * sc, 70, C.gold, eq, 2); lbl('decode every source : ≥ max(k + d + 4, k + 5) = 8', bx + 4 * sc, 495, C.white, eq, 20);
    stamp('LOCAL ≠ DECODER', 1500, 420, Q(S, 1, 'not a decoder', 0.6), C.red, 36, -0.05);
    const fq = Q(S, 1, 'at least two extra readings are needed', 0.6);
    chip(W / 2, 640, 1100, 62, 'fixed degenerate fibre ℝP² , q already read :  ≥ 2 extra readings', C.cyan, fq, 22);
    lbl('each extra scalar cuts the common-history fibre by at most one dimension', W / 2, 700, C.dim, fq, 16);
  }
};

/* ---- 08 SWITCH ---- */
SCENES.switch = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'But the seventh dimension unlocks weakly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'When couplings may be switched mid-word', 0.6) * f1;
    ['|000⟩', '|100⟩', '|010⟩', '|001⟩', '|101⟩'].forEach((s, i) => cell72(140 + i * 130, 260, 115, 64, s, C.cyan, q, 18));
    lbl('V (visible)', 140 + 2.5 * 130, 245, C.cyan, q, 17);
    chip(1350, 290, 820, 66, 'd_min = 5 + dim span{ b_{g_a} }', C.gold, Q(S, 0, 'has dimension five plus the span of the bright vectors', 0.6) * f1, 26);
    const rq = Q(S, 0, 'six if all coupling ratios are real', 0.6) * f1, cq = Q(S, 0, 'seven as soon as one ratio is genuinely complex', 0.6) * f1;
    const d1x = 460, d2x = 1050, dy = 560, R = 130;
    [[d1x, rq, [0, Math.PI, 0]], [d2x, cq, [0, 0.9, 2.2]]].forEach(([x, qq, angs]) => { ring(x, dy, R, C.dim, qq * 0.6, 1.5); angs.forEach((a, k) => arrow(x, dy, x + R * Math.cos(a - Math.PI / 2 * 0), dy - R * Math.sin(a), [C.gold, C.mag, C.green][k], qq, 3)); });
    lbl('hidden plane Q = span(|200⟩, |002⟩)', (d1x + d2x) / 2, dy - R - 40, C.dim, Math.max(rq, cq), 16);
    lbl('all g_a / g₀ real : one bright line', d1x, dy + R + 45, C.gold, rq, 18); lbl('d_min = 6', d1x, dy + R + 85, C.green, rq, 26);
    lbl('some Im(g_a ḡ₀) ≠ 0 : two bright directions', d2x, dy + R + 45, C.mag, cq, 18); lbl('d_min = 7', d2x, dy + R + 85, C.mag, cq, 26);
    lbl('recomputed : single 6 · three real ratios 6 · complex ratio 7', 1560, 560, C.dim, cq, 15);
  }
  const q = Q(S, 1, 'But the seventh dimension unlocks weakly', 0.6, 0.3);
  if (q > 0) {
    const lq = Q(S, 1, 'The old dark vector leaks', 0.6);
    chip(520, 270, 860, 64, '‖P_V e^(−itH₁/ħ) z_{g₀}‖² = η₁² sin²τ₁ sin²α', C.cyan, lq, 22);
    lbl('α = arg(g₁/g₀) ,  η₁ = 4r₁/Δ₁ ,  τ₁ = Δ₁ t / (2ħ)', 520, 330, C.dim, lq, 16);
    const gq = Q(S, 1, 'the smallest Gram eigenvalue vanishes like sine squared alpha', 0.6);
    chip(520, 440, 860, 64, 'λ₋ ~ 4 r₀² r₁² sin²α / ( ħ² (r₀² + r₁²) )', C.gold, gq, 22);
    const px = 1080, py = 740, pw = 640, ph = 420, xS = a => px + a / (Math.PI / 2) * pw, yS = v => py - v / 4 * ph;
    plotAxes(px, py, pw, ph, gq, 'α  (0 … π/2)', 'λ₋ , r₀ = r₁ = 1 , ħ = 1');
    curve(p => { const i = Math.min(LAM72.length - 1, p * (LAM72.length - 1)), i0 = Math.floor(i), fr = i - i0, A0 = LAM72[i0], A1 = LAM72[Math.min(LAM72.length - 1, i0 + 1)]; return [xS(A0[0] * (1 - fr) + A1[0] * fr), yS(A0[1] * (1 - fr) + A1[1] * fr)]; }, 80, C.gold, gq, 3);
    lbl('flat near α = 0', xS(0.12) + 20, yS(0) - 60, C.red, gq, 16, 'left');
    stamp('RANK JUMP ≠ STABILITY', 520, 600, Q(S, 1, 'An exact rank jump is not uniform stability', 0.6), C.red, 34, -0.05);
  }
};

/* ---- 09 OCCUPATION ---- */
SCENES.occupation = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory']]);
  const cx = 440, cy = 500;
  const q0 = Q(S, 0, 'A random command with step one over n', 0.6);
  const q = Math.max(q0, Q(S, 1, 'The deciding term is the first step', 0.1));
  if (q > 0) {
    line(120, 250, 760, 250, C.red, q, 2); line(120, 760, 760, 760, C.red, q, 2);
    lbl('wall', 130, 240, C.red, q, 14, 'left'); lbl('wall', 130, 785, C.red, q, 14, 'left');
    [40, 90, 150, 220].forEach((r, i) => ring(cx, cy, r, C.cyan, q * (0.5 - i * 0.1), 1.2));
    const nshow = Math.floor(clamp(q0 * 1.5) * (WALK72.length - 1));
    for (let i = 1; i <= nshow; i++) { const [x0, y0] = WALK72[i - 1], [x1, y1] = WALK72[i]; line(cx + x0, cy + y0, cx + x1, cy + y1, i === 1 ? C.gold : C.mag, q * (i === 1 ? 1 : 0.7), i === 1 ? 4 : 1.6); }
    dot(cx, cy, 9, 'g', q); lbl('source o', cx - 20, cy - 18, C.gold, q, 16, 'right');
    lbl('δ_n = n⁻² ,  e_n = n⁻¹ ,  m_n = n³', cx, 820, C.dim, q, 16);
  }
  const f1 = 1 - Q(S, 1, 'The deciding term is the first step', 0.6);
  if (f1 > 0) {
    const a = Q(S, 0, 'accumulates expected occupation of a radial observation', 0.6) * f1;
    chip(1330, 300, 900, 62, 'ν_n(W) = 𝔼 ∫₀^ζ W(q̄_n(t)) dt   →   ν(W) = ∫ Γ W dμ', C.cyan, a, 21);
    const cq = Q(S, 0, 'the capped mean converges exactly when', 0.6) * f1;
    chip(1330, 430, 900, 70, 'ν_n(W ∧ M_n) → ν(W)   ⇔   e_n H_w(M_n) → 0', C.gold, cq, 26);
    const hq = Q(S, 0, 'where H integrates the capped profile', 0.6) * f1;
    chip(1330, 560, 900, 62, 'H_w(M) = ∫₀^{r₀} min(M , w(r)) dr', C.white, hq, 24);
    lbl('any finite caps M_n → ∞ , not necessarily monotone', 1330, 625, C.dim, hq, 16);
  }
  const q2 = Q(S, 1, 'The deciding term is the first step', 0.6, 0.3);
  if (q2 > 0) {
    lbl('first cell : a straight chord , R(q̄_n(t)) = ℓ t / δ_n ,  ℓ = 2e_n + O(e_n²)', cx + 30, 205, C.gold, q2, 15);
    chip(1330, 290, 900, 64, '(e_n / 3) ∫₀^{e_n} v_{M_n}  ≤  I_n  ≤  e_n H_w(M_n)', C.gold, q2, 22);
    const tq = Q(S, 1, 'Power profiles recover the known thresholds', 0.6);
    lbl('W = Γ^p :', 1330, 390, C.dim, tq, 18);
    const rows = [['0 < p < ½', 'any M_n → ∞ , or no cap'], ['p = ½', 'log M_n = o(n)'], ['½ < p < 1', 'M_n = o(n^(2p/(2p−1)))'], ['p ≥ 1', 'target infinite']];
    rows.forEach(([a1, a2], i) => { const y = 420 + i * 72; box(900, y, 860, 58, i === 3 ? C.red : C.cyan, tq, 1.5, 'rgba(0,0,0,0.45)'); lbl(a1, 930, y + 37, C.white, tq, 20, 'left'); lbl(a2, 1730, y + 37, i === 3 ? C.red : C.gold, tq, 20, 'right'); });
  }
};

/* ---- 10 CRITICAL ---- */
SCENES.critical = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'At the borderline cap', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'At the logarithmic critical profile', 0.6) * f1;
    chip(W / 2, 250, 900, 64, 'w_β(t) = κ t⁻² (log 1/t)^(−β) ,  β > 1', C.gold, q, 26);
    const px = 160, py = 760, pw = 720, ph = 400, xS = r => px + r / 0.3 * pw, wv = r => 1 / (r * r * Math.pow(Math.log(1 / r), 2)), yS = v => py - Math.min(v, 60) / 60 * ph;
    plotAxes(px, py, pw, ph, q, 'radius t', 'w_β');
    const Mcap = 40, mq = Q(S, 0, 'The capped mean converges exactly when', 0.6) * f1;
    fillPoly([[px, py]].concat(Array.from({ length: 61 }, (_, i) => { const r = 0.004 + i / 60 * 0.296; return [xS(r), yS(Math.min(Mcap, wv(r)))]; })).concat([[xS(0.3), py]]), C.cyan, mq * 0.25);
    curve(p => { const r = 0.0405 + p * 0.2595; return [xS(r), yS(wv(r))]; }, 80, C.gold, q, 3);
    dashed(px, yS(Mcap), px + pw, yS(Mcap), C.cyan, mq, 2); lbl('cap M', px + pw - 10, yS(Mcap) - 12, C.cyan, mq, 16, 'right');
    lbl('shaded area = H(M)', xS(0.15), yS(8), C.cyan, mq, 16);
    const fq = Q(S, 0, 'the target is finite', 0.6) * f1;
    lbl('∫ t w_β dt < ∞  ⇒  ν(W_β) < ∞', 1350, 380, C.green, fq, 22);
    const iq = Q(S, 0, 'every uncapped mean is infinite', 0.6) * f1;
    lbl('∫ w_β dt = ∞  ⇒  every uncapped mean = ∞', 1350, 440, C.red, iq, 22);
    chip(1350, 560, 860, 70, 'converges  ⇔  M_n / (log M_n)^β = o(n²)', C.gold, mq, 26);
    lbl('H_{w_β}(M) ~ 2^(1+β/2) √κ √M / (log M)^(β/2)', 1350, 625, C.white, mq, 18);
    lbl('recomputed ratio for β = 2 : 0.888 , 0.930 , 0.968 , 0.986 at M = 10¹⁰ … 10³⁰⁰', 1350, 665, C.dim, mq, 15);
  }
  const q = Q(S, 1, 'At the borderline cap', 0.6, 0.3);
  if (q > 0) {
    const bx = 170, by = 640, sc = 160;
    plotAxes(bx, by, 760, 360, q, 'n = 10⁶ , 10²⁰ , 10⁸⁰ , 10³⁰⁰', 'M_n = n² (log n)² , κ = C = 1');
    dashed(bx, by - 2 * sc, bx + 760, by - 2 * sc, C.cyan, q, 1.5); lbl('2√(κC)', bx + 770, by - 2 * sc + 5, C.cyan, q, 15, 'left');
    dashed(bx, by - 1 * sc, bx + 760, by - 1 * sc, C.gold, q, 1.5); lbl('√(κC)', bx + 770, by - sc + 5, C.gold, q, 15, 'left');
    CAP72.forEach(([n, v], i) => { const x = bx + 50 + i * 180, h = v * sc, h2 = FIRST72[i] * sc; fillBox(x, by - h, 50, h, C.cyan, q * 0.45); rect63(x, by - h, 50, h, C.cyan, q, 1.3); fillBox(x + 60, by - h2, 50, h2, C.gold, q * 0.55); rect63(x + 60, by - h2, 50, h2, C.gold, q, 1.3); });
    lbl('e_n H(M_n)', bx + 140, by + 60, C.cyan, q, 16); lbl('first cell I_n', bx + 420, by + 60, C.gold, q, 16);
    const oq = Q(S, 1, 'so the limit overshoots the target by at least that', 0.6);
    chip(1440, 300, 760, 66, 'liminf ν_n(W_β ∧ M_n)  ≥  ν(W_β) + √(κC)', C.gold, oq, 23);
    stamp('OVERSHOOT', 1440, 390, oq, C.red, 34, -0.05);
    const dq = Q(S, 1, 'The profile is the square of a finite-energy state', 0.6);
    chip(1440, 500, 760, 62, 'u_β = N_β⁻¹ χ R⁻¹ (log 1/R)^(−β/2) ∈ ℱ_A ,  ‖u_β‖ = 1', C.green, dq, 19);
    const rq = Q(S, 1, 'yet no general path readout follows', 0.6);
    chip(1440, 610, 760, 62, 'path restriction ℛ_n is not closable', C.red, rq, 22);
    lbl('fixed-profile mean convergence ≠ form-continuous path readout', 1440, 670, C.dim, rq, 16);
  }
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'Geometric Satake and geometric Langlands are published inputs', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['FIBRE', '~ 1/(2δ)', C.gold, 'A sphere makes the inverse blow up'], ['DEPTHS', 'ℝP¹ blind', C.cyan, 'one depth leaves a circle blind'], ['COLLISION', 'disc = I² Δ', C.mag, 'a collision is not a ramification'], ['SIGN', 'm or 2m', C.red, 'a sign lives on a cover'], ['SEVEN', 'det = 48', C.green, 'seven readings invert locally'], ['SWITCH', 'Ω₆ / Ω₇', C.vio, 'a complex phase adds a dimension'], ['FIRST STEP', '√(κC)', C.orange, 'a first step decides the critical mean']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 195 + i * 255, q = Q(S, 0, ph) * fade; box(x - 115, 240, 230, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 20); lblG(a2, x, 340, C.white, q, 20); });
    lbl('PUBLISHED · geometric Satake · Gaitsgory–Raskin Hecke eigen-objects  ·  CLASSICAL · discriminant change of basis · Kummer sequence · Stacks 0BVH, 0BND, 03PK', W / 2, 470, C.cyan, Q(S, 1, 'Geometric Satake and geometric Langlands are published inputs') * fade, 15);
    lbl('PROJECT INPUTS · real fibre classification · three-depth recovery certificate · common-history bound · Green and singular-occupation theorems', W / 2, 515, C.gold, Q(S, 1, 'the fibre classification, clock and Green inputs') * fade, 15);
    lbl('VOLUME · differential kernel · condition blow-up · rank 45 · blind circle · reading versus source · orientation cover · seven readings · Ω₆/Ω₇ · radial criterion · log-critical cap', W / 2, 560, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · ker Dq · rank 45 / kernel 10 · blind ℝP¹ · disc = I²Δ · degree m or 2m · det = 48 · Ω dimensions 6 and 7 · H(M) asymptotics', W / 2, 605, C.white, Q(S, 1, 'the finite computations were redone') * fade, 15);
    lbl('AURIC–LANGLANDS I · II · III · IV  —  SERIES COMPLETE', W / 2, 700, C.gold, Q(S, 1, 'This completes the four-part series') * fade, 26);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC–LANGLANDS IV · DEGENERATION', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC–Langlands 第四部 · 退化、分歧与稳定恢复 · TRURETURING FILM 072', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A blind circle, seven readings, a sign that lives on a cover, and a first step that never goes away.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC–LANGLANDS IV', fiber: 'DIFFERENTIAL FIBRE', depth: 'THREE DEPTHS', hecke: 'HECKE TYPES', ramify: 'COLLISION AND RAMIFICATION', orientation: 'ORIENTATION AND LIFTS', seven: 'SEVEN READINGS', switch: 'SWITCHING Ω6 / Ω7', occupation: 'RADIAL OCCUPATION', critical: 'LOG-CRITICAL CAP', finale: 'LEDGER' });

function poster72() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('disc Q_m = I_m² · Δ', 1320, 370, { size: 50, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('J J J J M J : det DΦ = 48 · Ω₆ / Ω₇', 1320, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.white });
  txt('liminf ≥ ν(W_β) + √(κC)', 1320, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC–Langlands 第四部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC–LANGLANDS IV · DEGENERATION', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('退 化 · 分 歧 · 稳 定 恢 复', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 072', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster72;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
