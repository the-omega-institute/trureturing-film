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

/* ---- film 064: AURIC Omega II · control, readouts and the golden ratio ---- */
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
const _po64 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po64.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po64.set(key, off); }
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

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  omega63(460, 450, 150, s0, C.cyan, 7);
  pyrG64(460, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  chip(1290, 300, 420, 64, 'PART I ·  q ≥ 5', C.gold, Q(S, 0, 'Part one fixed a strict menu', 0.6), 24);
  chip(1100, 450, 340, 64, 'extra control → ?', C.green, Q(S, 0, 'what extra control buys', 0.6), 22);
  chip(1490, 450, 340, 64, 'one readout → ?', C.mag, Q(S, 0, 'what a single readout can still see', 0.6), 22);
  const gq = Q(S, 1, 'to the golden ratio', 0.6);
  txt('1/φ', 1290, 720, { size: 150, fam: FG, w: 700, align: 'center', c: C.gold, a: gq });
  lbl('0.6180339887…', 1290, 790, C.dim, gq, 24);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 260, 64, 'flip  G1', C.cyan, rp, 24); chip(330, 445, 260, 64, 'flip  G2', C.gold, rp, 24); chip(330, 530, 260, 64, 'flip  G3', C.mag, rp, 24);
  box(1480, 340, 260, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('1 bit', 1610, 420, C.green, rp, 26); lbl('c_n → 1/φ', 1610, 470, C.gold, rp, 24);
  txt(scramble('AURIC Ω II · GOLDEN READOUT', rp, 464), W / 2, 760, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('AURIC Ω 第 二 部 · 控 制 、 读 口 与 黄 金 比 例', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 064 · AURIC_OMEGA_STATIC_COMPATIBILITY_FIBER_THEORY §19–42', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FLIPS ---- */
SCENES.flips = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'the open-chain PXP rule', 'published'], [0, 'and the three add up', 'theory'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'A bare flip is not safe', 0.6);
  const g = [Q(S, 0, 'three constrained flips', 0.6), Q(S, 0, 'Each one flips a position', 0.6), Q(S, 0, 'only when its neighbours are zero', 0.6)];
  if (f1 > 0) {
    lblG('G1 = X1 · P0(2)', 330, 330, C.cyan, g[0] * f1, 28, 'left');
    lblG('G2 = P0(1) · X2 · P0(3)', 330, 410, C.gold, g[1] * f1, 28, 'left');
    lblG('G3 = P0(2) · X3', 330, 490, C.mag, g[2] * f1, 28, 'left');
    lbl('flip a position only if its neighbours are 0', 330, 560, C.dim, Q(S, 0, 'only when its neighbours are zero', 0.6) * f1, 20, 'left');
    chip(560, 660, 300, 60, 'PXP · open chain', C.cyan, Q(S, 0, 'the open-chain PXP rule', 0.6) * f1, 22);
    lblG('H1 + H2 + H3 = K', 560, 780, C.white, Q(S, 0, 'the three add up exactly to K', 0.6) * f1, 34);
    pyrG64(1400, 520, 300, 0.6 + t * 0.2, s0 * f1, g, 1);
  }
  const q = Q(S, 1, 'A bare flip is not safe', 0.6, 0.3);
  if (q > 0) {
    cells64(300, 300, '010', 76, q, C.cyan, {}, 30);
    arrow(540, 338, 660, 338, C.white, q, 2.5); lbl('X1', 600, 318, C.white, q, 20);
    cells64(690, 300, '110', 76, q, C.red, { 0: C.red, 1: C.red }, 30);
    stamp('ILLEGAL', 800, 440, Q(S, 1, 'which is illegal', 0.5), C.red, 40, -0.06);
    const tq = Q(S, 1, 'Knowing only that the state is not empty', 0.6);
    [['100', 'X1  X3'], ['010', 'X2'], ['001', 'X1  X3'], ['101', 'X1  X3']].forEach(([w, m], i) => { cells64(1080, 270 + i * 82, w, 60, tq, C.cyan, {}, 24); lbl(m, 1330, 312 + i * 82, C.gold, tq, 22, 'left'); });
    lbl('legal bare flips', 1330, 250, C.dim, tq, 18, 'left');
    lblG('common:  ∅', 1250, 640, C.red, Q(S, 1, 'leaves no common legal bare flip', 0.6), 32);
    chip(1250, 740, 520, 62, 'e^{−iθH_j}: legal on every input', C.green, Q(S, 1, 'while the constrained exponentials', 0.6), 22);
  }
};

/* ---- 03 NO INVERSE ---- */
SCENES.noinverse = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const K = [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0]];
  mgrid(300, 280, K, 50, 50, s0, { size: 20, colf: v => v ? C.gold : C.dim });
  lblG('K =', 280, 410, C.white, s0, 30, 'right');
  lblG('U(s) = e^{−isK} ,  s ≥ 0', 425, 600, C.cyan, Q(S, 0, 'Can the fixed waiting menu undo a wait', 0.6), 26);
  lblG('det(λI − K) = λ(λ⁴ − 5λ² + 2)', 1330, 320, C.white, Q(S, 0, 'characteristic polynomial', 0.6), 30);
  lblG('ω±² = (5 ± √17) / 2', 1330, 400, C.gold, Q(S, 0, 'its two frequencies satisfy', 0.6), 30);
  const rq = Q(S, 1, 'Their ratio is irrational', 0.6);
  lblG('(ω+/ω−)² = (21 + 5√17)/4  ∉ ℚ', 1330, 480, C.mag, rq, 28);
  const T = Math.max(0, u - lineAt(S, 1).s) * 1.3, wp = Math.sqrt((5 + Math.sqrt(17)) / 2), wm = Math.sqrt((5 - Math.sqrt(17)) / 2);
  dial64(1130, 650, 70, wp * T, C.cyan, rq, 'ω+ s'); dial64(1530, 650, 70, wm * T, C.gold, rq, 'ω− s');
  lbl('never back to 0 together', 1330, 780, C.dim, Q(S, 1, 'no later wait returns to the identity', 0.6), 20);
  const kq = Q(S, 1, 'any read loses rank', 0.6);
  chip(425, 700, 300, 58, 'read: rank 1', C.mag, kq, 22); chip(425, 780, 300, 58, 'unitary: rank 5', C.green, kq, 22);
  stamp('NO EXACT INVERSE', 830, 440, Q(S, 1, 'No exact, deterministic, finite protocol', 0.5), C.red, 30, -0.05);
  void t;
};

/* ---- 04 CONTROL ---- */
SCENES.control = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'In the real frame they generate', 'classical'], [0, 'add one adjustable phase', 'theory'], [1, '', 'theory']]);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Every step is legal', 0.6);
  if (f1 > 0) {
    const gq = Q(S, 0, 'three independent flip controls', 0.6) * f1;
    lblG('A1 = J01 − J34', 330, 320, C.cyan, gq, 28, 'left'); lblG('A2 = J02', 330, 390, C.gold, gq, 28, 'left'); lblG('A3 = J03 − J14', 330, 460, C.mag, gq, 28, 'left');
    const bq = Q(S, 0, 'In the real frame they generate', 0.6) * f1, aq = Q(S, 0, 'all ten rotations', 0.8) * f1;
    lblG('[A2,[A2,A1]] = −J01', 330, 550, C.white, bq, 24, 'left'); lblG('[A2,[A2,A3]] = −J03', 330, 600, C.white, bq, 24, 'left');
    const E = []; for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) { const seed = [[0, 1], [0, 2], [0, 3], [1, 4], [3, 4]].some(([a, b]) => a === i && b === j); E.push([i, j, seed ? C.gold : C.cyan, seed ? bq : aq]); }
    kgraph64(1000, 470, 170, 5, s0 * f1, E, ['N', '2', '3', '5', '25']);
    lblG('so(5) · 10', 1000, 720, C.cyan, aq, 32);
    const uq = Q(S, 0, 'add one adjustable phase', 0.6) * f1, fq = Q(S, 0, 'the algebra fills u of five', 0.8) * f1;
    lblG('+ i E_NN', 1530, 300, C.mag, uq, 28);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const col = i === j ? C.gold : (i < j ? C.cyan : C.mag), q = i === j || i < j ? fq : fq; box(1400 + j * 54, 350 + i * 54, 48, 48, col, q, 1.5, i === j ? 'rgba(255,207,90,0.25)' : i < j ? 'rgba(0,229,255,0.18)' : 'rgba(255,60,210,0.18)'); }
    lblG('u(5) · 25', 1530, 660, C.mag, fq, 32);
    lbl('10 real antisym + 10 imag sym + 5 imag diag', 1530, 700, C.dim, fq, 16);
  }
  const q = Q(S, 1, 'Every step is legal', 0.6, 0.3);
  if (q > 0) {
    const r1 = Q(S, 1, 'flipping position one and then position two', 0.6), r2 = Q(S, 1, 'while the other order', 0.6);
    lbl('V1 then V2', 260, 320, C.cyan, r1, 22, 'left');
    cells64(260, 350, '000', 70, r1, C.white, {}, 26); arrow(490, 383, 580, 383, C.cyan, r1, 2.5); lbl('V1', 535, 365, C.cyan, r1, 18);
    cells64(600, 350, '100', 70, r1, C.cyan, { 0: C.cyan }, 26); arrow(830, 383, 920, 383, C.gold, r1, 2.5); lbl('V2', 875, 365, C.gold, r1, 18);
    cells64(940, 350, '100', 70, r1, C.cyan, { 0: C.cyan }, 26); lbl('H2 = 0 here', 1050, 460, C.dim, r1, 16);
    lbl('V2 then V1', 260, 560, C.gold, r2, 22, 'left');
    cells64(260, 590, '000', 70, r2, C.white, {}, 26); arrow(490, 623, 580, 623, C.gold, r2, 2.5); lbl('V2', 535, 605, C.gold, r2, 18);
    cells64(600, 590, '010', 70, r2, C.gold, { 1: C.gold }, 26); arrow(830, 623, 920, 623, C.cyan, r2, 2.5); lbl('V1', 875, 605, C.cyan, r2, 18);
    cells64(940, 590, '010', 70, r2, C.gold, { 1: C.gold }, 26); lbl('H1 = 0 here', 1050, 700, C.dim, r2, 16);
    lblG('−i|100⟩  ≠  −i|010⟩', 1520, 480, C.white, r2, 34);
    lblG('[H1, H2] ≠ 0', 1520, 560, C.mag, r2, 28);
    chip(1520, 660, 420, 60, 'legal ≠ order-free', C.orange, Q(S, 1, 'yet order still matters', 0.6), 22);
  }
  void t;
};

/* ---- 05 CHAIN ---- */
SCENES.chain = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The proof splits the chain', 0.6);
  if (f1 > 0) {
    const cq = Q(S, 0, 'On a legal chain of length n', 0.6) * f1;
    cells64(300, 260, '010010', 64, cq, C.cyan, { 1: C.gold, 4: C.gold }, 24); lbl('no two adjacent 1s', 492, 360, C.dim, cq, 18);
    const px = 300, py = 760, pw = 700, ph = 320, bq = Q(S, 0, 'there are F of n plus two basis words', 0.8) * f1;
    plotAxes(px, py, pw, ph, bq, 'n', 'legal words F(n+2)');
    for (let n = 1; n <= 6; n++) { const v = FIB64[n + 2], h = v / 21 * ph, x = px + (n - 0.5) / 6 * pw - 30; fillBox(x, py - h * bq, 60, h * bq, C.cyan, 0.35 * bq); rect63(x, py - h * bq, 60, h * bq, C.cyan, bq, 1.6); lbl(String(v), x + 30, py - h * bq - 14, C.white, bq, 20); lbl(String(n), x + 30, py + 28, C.dim, bq, 18); }
    const lq = Q(S, 0, 'the flips alone generate all of so', 0.6) * f1;
    lblG('Lie(flips) = so(F(n+2))', 1450, 300, C.gold, lq, 32);
    [['n = 3', 'so(5)', 10, 'ten'], ['n = 4', 'so(8)', 28, 'twenty-eight'], ['n = 5', 'so(13)', 78, 'seventy-eight'], ['n = 6', 'so(21)', 210, 'two hundred and ten']].forEach(([a1, a2, v, ph2], i) => { const q = Q(S, 0, ph2, 0.5) * f1; lbl(a1, 1250, 400 + i * 90, C.dim, q, 22, 'left'); lblG(a2, 1420, 400 + i * 90, C.cyan, q, 28, 'left'); lblG(String(v), 1640, 400 + i * 90, C.gold, q, 30, 'left'); });
  }
  const q = Q(S, 1, 'The proof splits the chain', 0.6, 0.3);
  if (q > 0) {
    lblG('K_n = A ⊕ B', 560, 310, C.white, q, 32);
    lbl('A = { x0 } , dim F(n+1)', 560, 370, C.cyan, q, 22); lbl('B = { u01 } , dim F(n)', 560, 410, C.mag, q, 22);
    const x0 = 1150, y0 = 270, a = 300, b = 190;
    const iq = Q(S, 1, 'grows the algebra by induction', 0.8);
    rect63(x0, y0, a + b, a + b, C.white, q, 2);
    fillBox(x0, y0, a, a, C.cyan, 0.3 * q); lblG('so(a)', x0 + a / 2, y0 + a / 2 + 10, C.cyan, q, 28);
    fillBox(x0 + a, y0, b, a, C.gold, 0.3 * iq); fillBox(x0, y0 + a, a, b, C.gold, 0.3 * iq); lblG('cross', x0 + a + b / 2, y0 + a / 2 + 8, C.gold, iq, 22); lblG('cross', x0 + a / 2, y0 + a + b / 2 + 8, C.gold, iq, 22);
    fillBox(x0 + a, y0 + a, b, b, C.mag, 0.3 * iq); lblG('so(b)', x0 + a + b / 2, y0 + a + b / 2 + 10, C.mag, iq, 26);
    lblG('→  so(a + b)', x0 + (a + b) / 2, y0 + a + b + 60, C.white, iq, 30);
    lbl('last bit 0 / last bits 01', 560, 470, C.dim, q, 18);
    chip(560, 640, 440, 60, 'full induction · no extrapolation', C.green, Q(S, 1, 'it does not extrapolate', 0.6), 22);
  }
  void t;
};

/* ---- 06 PHASE ---- */
SCENES.phase = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Zero installs cannot do it', 0.6);
  if (f1 > 0) {
    const iq = Q(S, 0, 'Install one fixed quarter-turn phase', 0.6) * f1;
    cells64(300, 270, '1010000', 64, s0 * f1, C.cyan, { 0: C.gold, 2: C.gold }, 24);
    lbl('1', 328, 365, C.gold, iq, 18); lbl('3', 456, 365, C.gold, iq, 18);
    lblG('S⋆ = exp( iπ/2 · n1 n3 ) ,  S⋆⁴ = I', 520, 450, C.gold, iq, 28);
    lbl('one install · reusable · not tunable', 520, 500, C.dim, iq, 18);
    const rq = Q(S, 0, 'Flips alone stay real', 0.6) * f1, sq = Q(S, 0, 'the closure contains every special unitary', 0.8) * f1;
    const N = 8, x0 = 1180, y0 = 260, c = 46;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const re = i !== j, q = re ? rq : sq * (i === N - 1 && j === N - 1 ? 0.3 : 1); box(x0 + j * c, y0 + i * c, c - 6, c - 6, re ? C.cyan : C.gold, q, 1.4, re ? 'rgba(0,229,255,0.16)' : 'rgba(255,207,90,0.2)'); if (re && i > j) fillBox(x0 + j * c, y0 + i * c, c - 6, c - 6, C.mag, 0.25 * sq); }
    lblG('so(d)  →  su(d)', 1360, 670, C.white, sq, 30);
    lblG('det ∈ ⟨ i^{F(n−2)} ⟩ ,  PU(d) reached', 1360, 730, C.gold, Q(S, 0, 'with the determinant restricted to powers of i', 0.6) * f1, 24);
  }
  const q = Q(S, 1, 'Zero installs cannot do it', 0.6, 0.3);
  if (q > 0) {
    const aq = Q(S, 1, 'On the alternating code', 0.6);
    cells64(260, 280, 'b0b0b', 64, aq, C.cyan, { 1: C.dim, 3: C.dim }, 24); lbl('alternating code', 420, 380, C.dim, aq, 18);
    const cx = 1300, cy = 520, R = 200, dq = Q(S, 1, 'every flip word stays at distance', 0.6);
    ring(cx, cy, R, C.dim, q, 1.5); line(cx - R - 30, cy, cx + R + 30, cy, C.dim, q * 0.5, 1); line(cx, cy + R + 30, cx, cy - R - 30, C.dim, q * 0.5, 1);
    dot(cx + R, cy, 12, 'c', q); lbl('1', cx + R + 26, cy + 8, C.cyan, q, 22, 'left');
    dot(cx, cy - R, 12, 'm', q); lbl('i', cx + 22, cy - R - 10, C.mag, q, 24, 'left');
    const ex = cx + R * Math.SQRT1_2, ey = cy - R * Math.SQRT1_2;
    dot(ex, ey, 12, 'g', dq); lbl('e^{iπ/4}', ex + 22, ey - 12, C.gold, dq, 20, 'left');
    line(ex, ey, cx + R, cy, C.gold, dq, 3); line(ex, ey, cx, cy - R, C.gold, dq, 3);
    lblG('√(2 − √2) = 0.765', cx, cy + R + 80, C.gold, dq, 32);
    lbl('real flips: R_xx ∈ [−1, 1]', 520, 500, C.dim, dq, 20);
    chip(520, 600, 380, 60, '0 installs: distance ≥ 0.765', C.red, dq, 21);
    chip(520, 690, 380, 60, '1 install: any gate', C.green, Q(S, 1, 'The minimum number of phase installs is one', 0.6), 21);
    lblG('minimum = 1', 520, 790, C.white, Q(S, 1, 'The minimum number of phase installs is one', 0.8), 32);
  }
  void t;
};

/* ---- 07 READOUT ---- */
SCENES.readout = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const words = ['0000', '1000', '0100', '0010', '1010', '0001', '1001', '0101'];
  const rq = Q(S, 0, 'Its projector has rank F of n', 0.6);
  lbl('legal words, n = 4', 330, 250, C.dim, s0, 18, 'left');
  words.forEach((w, i) => { const one = w[0] === '1'; cells64(330 + (i % 2) * 300, 280 + Math.floor(i / 2) * 76, w, 56, s0, one && rq > 0 ? C.gold : C.cyan, one ? { 0: C.gold } : {}, 22); });
  lblG('rank n1 = F(n) = 3 of 8', 600, 620, C.gold, rq, 28);
  const bq = Q(S, 0, 'Now read only the first position', 0.6);
  chip(600, 700, 360, 58, 'read position 1 · one bit', C.mag, bq, 21);
  const wq = Q(S, 0, 'any word can act first', 0.6);
  lblG('R_w(ρ) = tr( ρ w†n1w )', 1400, 300, C.white, wq, 30);
  const tq = Q(S, 0, 'the full table of bit probabilities', 0.8);
  for (let k = 0; k < 6; k++) { const p = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(1.7 * k + 0.6)); chip(1170 + k * 92, 380, 80, 50, 'w' + (k + 1), C.cyan, tq, 18); fillBox(1145 + k * 92, 540 - p * 100, 50, p * 100, C.gold, 0.45 * tq); rect63(1145 + k * 92, 540 - p * 100, 50, p * 100, C.gold, tq, 1.5); }
  lblG('all w equal  ⇔  ρx = ρy', 1400, 620, C.green, Q(S, 0, 'determines the input state exactly', 0.6), 30);
  const nq = Q(S, 1, 'Determining the state from probabilities', 0.6);
  chip(1400, 710, 520, 58, 'probabilities ≠ name from one copy', C.orange, nq, 20);
  chip(1400, 790, 520, 58, 'estimation needs repeated sources', C.dim, Q(S, 1, 'still needs repeated sources', 0.6), 20);
  void t;
};

/* ---- 08 GOLDEN ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [0, 'At worst a fraction c n', 'classical'], [0, 'Both constants are sharp', 'theory'], [1, '', 'theory'], [1, 'fall toward one over the golden ratio', 'lean'], [1, 'and always stay above it', 'theory']]);
  const s0 = clamp(u);
  lblG('c_n · D  ≤  B_n  ≤  D', 520, 310, C.white, Q(S, 0, 'How much of the trace distance', 0.6), 34);
  lbl('B_n = best single-bit gap · D = trace distance', 520, 360, C.dim, Q(S, 0, 'How much of the trace distance', 0.6), 18);
  const cq = Q(S, 0, 'At worst a fraction c n', 0.6);
  lblG('c_n = F(n+1) / (F(n+2) − 1)', 520, 440, C.gold, cq, 32);
  lbl('Ky Fan: best rank-q projection = top q eigenvalues', 520, 490, C.dim, cq, 17);
  const wq = Q(S, 0, 'Both constants are sharp', 0.6);
  lbl('witness: ρ0 = |ψ⟩⟨ψ| ,  ρ1 = (I − ρ0)/(d − 1)', 520, 560, C.cyan, wq, 19);
  bars63(300, 720, [1, -0.25, -0.25, -0.25, -0.25], 60, 26, 110, wq, C.cyan, ['1', '−¼', '−¼', '−¼', '−¼']);
  lbl('n = 3 : top-2 sum = 3/4', 720, 680, C.gold, wq, 18, 'left');
  const px = 1150, py = 760, pw = 620, ph = 420, pq = Q(S, 1, 'Three quarters', 0.8);
  const yS = v => py - (v - 0.58) / 0.2 * ph, xS = n => px + (n - 3) / 9 * pw;
  plotAxes(px, py, pw, ph, pq, 'n', 'c_n');
  dashed(px, yS(0.618034), px + pw, yS(0.618034), C.gold, pq * 0.8, 1.5); lbl('1/φ = 0.618', px + pw + 10, yS(0.618034) + 6, C.gold, Q(S, 1, 'fall toward one over the golden ratio', 0.6), 18, 'left');
  const cs = []; for (let n = 3; n <= 12; n++) cs.push([n, FIB64[n + 1] / (FIB64[n + 2] - 1)]);
  const lq = Q(S, 1, 'fall toward one over the golden ratio', 1.2);
  for (let i = 0; i < cs.length - 1; i++) if (lq > i / 9) line(xS(cs[i][0]), yS(cs[i][1]), xS(cs[i + 1][0]), yS(cs[i + 1][1]), C.cyan, pq, 3);
  [['3/4', 'Three quarters'], ['5/7', 'five sevenths'], ['2/3', 'two thirds'], ['13/20', 'thirteen twentieths']].forEach(([s, ph2], i) => { const q = Q(S, 1, ph2, 0.4); dot(xS(cs[i][0]), yS(cs[i][1]), 10, 'g', q); lbl(s, xS(cs[i][0]) + 16, yS(cs[i][1]) - 14, C.white, q, 18, 'left'); });
  lbl('LEAN · RevivalSpectrum.fibonacci_return_ratio_tendsto : F(n+1)/F(n) → φ', 1460, 820, C.green, Q(S, 1, 'fall toward one over the golden ratio', 0.6), 14);
  chip(1460, 290, 360, 58, 'c_n > 1/φ  for every n', C.gold, Q(S, 1, 'and always stay above it', 0.6), 21);
  void t; void s0;
};

/* ---- 09 BUDGET ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'theory'], [1, 'but it needs at least', 'classical'], [1, 'exponential in the Fibonacci dimension', 'theory']]);
  const px = 300, py = 760, pw = 640, ph = 420, s0 = clamp(u);
  const eq = Q(S, 0, 'With one bit per copy', 0.6);
  plotAxes(px, py, pw, ph, eq, 'copies M', 'error e(M)');
  const yS = l => py - (l + 8) / 8 * ph, xS = m => px + m / 12 * pw;
  [[0, '1'], [-2, '10^−2'], [-4, '10^−4'], [-6, '10^−6']].forEach(([l, s]) => { dashed(px, yS(l), px + pw, yS(l), C.dim, eq * 0.5, 1); lbl(s, px - 12, yS(l) + 6, C.dim, eq, 15, 'right'); });
  [[1 / 4, C.cyan, 'n=3 · β=1/4'], [2 / 7, C.gold, 'n=4 · β=2/7'], [1 / 3, C.mag, 'n=5 · β=1/3']].forEach(([b, col, s], i) => { const q = Q(S, 0, 'where beta is q minus one', 0.8); curve(z => [xS(12 * z), yS(Math.max(-8, Math.log10(0.5 * Math.pow(b, 12 * z))))], 40, col, q, 3); lbl(s, px + pw - 10, py - ph + 40 + i * 30, col, q, 17, 'right'); });
  lblG('e_n(M) = ½ β^M ,  β = (q − 1)/(d − 1)', 620, 300, C.white, eq, 26);
  const mq = Q(S, 0, 'an error of one in a million needs ten copies', 0.6);
  dot(xS(10), yS(Math.log10(0.5 * Math.pow(0.25, 10))), 12, 'g', mq); lbl('M = 10 · 4.8 × 10^−7', xS(10) + 4, yS(Math.log10(0.5 * Math.pow(0.25, 10))) + 34, C.gold, mq, 17, 'center');
  lbl('orthogonal states, still never zero', 620, 350, C.dim, Q(S, 0, 'even two orthogonal states', 0.6), 17);
  const q1 = Q(S, 1, 'A fixed menu that keeps a uniform contrast', 0.6);
  lblG('χ · D  ≤  max_j |tr((ρ − σ)P_j)|', 1450, 300, C.white, q1, 26);
  const bq = Q(S, 1, 'but it needs at least', 0.6);
  lblG('m  ≥  ½ exp( 2χ²(d − 1)³ / d² )', 1450, 380, C.gold, bq, 28);
  const rows = [['n = 3', 'd = 5', 'm ≥ 1.8'], ['n = 6', 'd = 21', 'm ≥ 4.4 × 10^3'], ['n = 10', 'd = 144', 'm ≥ 2.1 × 10^30'], ['n = 14', 'd = 987', 'm ≥ 2.4 × 10^213']];
  const xq = Q(S, 1, 'exponential in the Fibonacci dimension', 0.8);
  lbl('χ = 1/2', 1450, 440, C.dim, xq, 18);
  rows.forEach(([a1, a2, a3], i) => { const q = clamp(xq * 4 - i); lbl(a1, 1180, 500 + i * 70, C.dim, q, 20, 'left'); lbl(a2, 1300, 500 + i * 70, C.cyan, q, 20, 'left'); lbl(a3, 1460, 500 + i * 70, C.gold, q, 22, 'left'); });
  void t; void s0;
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['FLIPS', 'H1+H2+H3 = K', C.cyan, 'Constrained flips add up'], ['WAIT', 'no exact inverse', C.mag, 'waiting cannot undo itself'], ['CONTROL', 'so(F(n+2))', C.green, 'flips fill so'], ['PHASE', 'one install', C.gold, 'one fixed phase completes control'], ['BIT', 'rank F(n)', C.white, 'one bit keeps a share'], ['GOLDEN', 'c_n → 1/φ', C.orange, 'falls toward one over the golden ratio']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 20); });
    lbl('LEAN · RevivalSpectrum.fibonacci_return_ratio_tendsto  (F(n+1)/F(n) → φ)', W / 2, 480, C.green, Q(S, 1, 'Lean has frozen') * fade, 16);
    lbl('VOLUME · PXP split · inverse obstruction · so(F(n+2)) · one phase · √(2−√2) · c_n · β_n · settings bound', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory volume') * fade, 17);
    lbl('RECOMPUTED · every number', W / 2, 600, C.white, Q(S, 1, 'every number here was recomputed') * fade, 19);
    lbl('NEXT · PHASE GAIN · FULL-INPUT RECOVERY', W / 2, 690, C.gold, Q(S, 1, 'Next: phase gain') * fade, 34);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC Ω II · GOLDEN READOUT', W / 2, 680, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('AURIC Ω 第二部 · 控制、读口与黄金比例 · TRURETURING FILM 064', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One phase, one bit, one constant.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC OMEGA II', flips: 'CONSTRAINED FLIPS', noinverse: 'NO EXACT INVERSE', control: 'SO(5) AND U(5)', chain: 'WHOLE LEGAL CHAIN', phase: 'ONE PHASE', readout: 'ONE-BIT READOUT', golden: 'GOLDEN CONTRAST', budget: 'COPIES AND SETTINGS', finale: 'LEDGER' });

function poster64() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(470, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('Lie(flips) = so(F(n+2))', 1340, 400, { size: 52, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('one phase  ⇒  every gate', 1340, 510, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('c_n → 1/φ', 1340, 640, { size: 72, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC Ω 第二部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC Ω II · GOLDEN READOUT', W / 2, 890, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('一 处 相 位 · 一 个 比 特 · 一 个 常 数', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 064', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster64;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
