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

/* ---- film 075: AURIC–Langlands V · cubic shallow-twist collision ---- */
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
const _po075 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po075.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po075.set(key, off); }
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
const GRID075 = {"+": [[0, 1, 2, 3, 4, 5, 6], [4, 5, 6, 0, 1, 2, 3], [0, 1, 2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 0, 1], [3, 4, 5, 6, 0, 1, 2], [3, 4, 5, 6, 0, 1, 2], [2, 3, 4, 5, 6, 0, 1]], "-": [[0, 1, 2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 0, 1], [3, 4, 5, 6, 0, 1, 2], [3, 4, 5, 6, 0, 1, 2], [2, 3, 4, 5, 6, 0, 1], [0, 1, 2, 3, 4, 5, 6], [4, 5, 6, 0, 1, 2, 3]]};
const PAIRS075 = {"+": [[1, 1], [2, 4], [4, 2]], "-": [[6, 1], [5, 4], [3, 2]]};
const BSUM075 = [0.0, 0.0, 0.0, 0.0, 7.0, 0.0];
const PHP075 = [0, 3, 0, 5, 4, 4, 5];
const PHM075 = [0, 5, 4, 4, 5, 0, 3];
const G075 = [-1.147948, -2.38374];
const SAMP075 = [[0.97615, -0.21709, 0.97615, -0.21709], [-0.97143, 0.23732, -0.97143, 0.23732], [-0.80761, 0.58971, -0.80761, 0.58971], [-0.4903, -0.87155, -0.4903, -0.87155], [0.47371, -0.88068, 0.47371, -0.88068], [0.4274, -0.90406, 0.4274, -0.90406], [-0.96092, -0.27682, -0.96092, -0.27682], [0.93928, -0.34315, 0.93928, -0.34315], [-0.6885, -0.72524, -0.6885, -0.72524], [0.67224, 0.74034, 0.67224, 0.74034], [0.55552, 0.83151, 0.55552, 0.83151], [0.62377, -0.7816, 0.62377, -0.7816]];
const SUPP075 = [0.0, 0.0, 0.142857, 0.0, 0.0];
const RAT075 = [[1, 4], [2, 2], [3, 6], [4, 1], [5, 5], [6, 3]];
const CUBE075 = [1, 1, 6, 1, 6, 6];
/* ---- film 075 helpers ---- */
const PAL075 = [C.white, C.cyan, C.green, C.gold, C.orange, C.mag, C.vio];
function grid075(x0, y0, cw, G, a, title, col) {
  if (a <= 0) return;
  lbl(title, x0 + 3.5 * cw - 2, y0 - 44, col, a, 19);
  lbl('a↓ b→', x0 - 6, y0 - 12, C.dim, a, 13, 'right');
  for (let i = 0; i < 7; i++) { lbl(String(i), x0 - 20, y0 + i * cw + cw / 2 + 4, C.dim, a, 15); lbl(String(i), x0 + i * cw + cw / 2 - 2, y0 - 12, C.dim, a, 15); }
  for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { const v = G[i][j], qq = clamp(a * 1.6 - (i * 7 + j) / 60), x = x0 + j * cw, y = y0 + i * cw; fillBox(x, y, cw - 4, cw - 4, PAL075[v], qq * 0.3); rect63(x, y, cw - 4, cw - 4, PAL075[v], qq * 0.85, 1.2); lbl(String(v), x + (cw - 4) / 2, y + (cw - 4) / 2 + 7, C.white, qq, 18); }
}
function rootsCircle075(cx, cy, R, a, lab = true) {
  if (a <= 0) return;
  ring(cx, cy, R, C.dim, a * 0.7, 1.5);
  line(cx - R - 20, cy, cx + R + 20, cy, C.dim, a * 0.35, 1); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, a * 0.35, 1);
  for (let k = 0; k < 7; k++) { const an = 2 * Math.PI * k / 7, x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); ring(x, y, 6, C.dim, a, 1.4); if (lab) lbl('e(' + k + '/7)', cx + (R + 46) * Math.cos(an), cy - (R + 46) * Math.sin(an) + 6, C.dim, a, 13); }
}
function rootXY075(cx, cy, R, k) { const an = 2 * Math.PI * k / 7; return [cx + R * Math.cos(an), cy - R * Math.sin(an)]; }
function check075(x, y, s, col, a, size = 19, mark = '✓') { if (a <= 0) return; lbl(mark, x, y, mark === '✓' ? C.green : C.red, a, size + 4, 'left'); lblG(s, x + 40, y, col, a, size, 'left'); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['readings collide while sources stay apart', 'PART FOUR · COLLISIONS', 'readings collide , sources stay apart', C.gold], ['a local Langlands test', 'A LOCAL LANGLANDS TEST', 'GL₃ over F₇((t)) , twisted by GL₁', C.cyan], ['two different representations of GL three', 'TWO REPRESENTATIONS', 'π₊ ≄ π₋', C.mag], ['answer every shallow twist alike', 'ONE COMPLETE RESPONSE', 'γ(s, π₊ × χ) = γ(s, π₋ × χ) ,  d(χ) ≤ 2/3', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 340, 58, 'F = F₇((t))', C.gold, rp, 22); chip(330, 445, 340, 58, 'E = F(u) ,  u³ = t', C.mag, rp, 22); chip(330, 530, 340, 58, 'θ₊ , θ₋ :  ε = ±1', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one sign apart', 1610, 410, C.cyan, rp, 22); lblG('π₊ ≄ π₋ · γ₊ = γ₋', 1610, 470, C.white, rp, 28);
  txt(scramble('AURIC–LANGLANDS V · CUBIC', rp, 475), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC–Langlands 第 五 部 · 三 次 浅 扭 碰 撞', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 075 · AURIC_LANGLANDS_CUBIC_SHALLOW_TWIST_COLLISION', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FIELDS AND CHARACTERS ---- */
SCENES.field = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Principal units one plus a u plus b u squared', 0.6);
  if (f1 > 0) {
    const fq = Q(S, 0, 'Take Laurent series in t', 0.6) * f1, eq = Q(S, 0, 'adjoin u, a cube root of t', 0.6) * f1;
    box(220, 560, 460, 90, C.gold, fq, 2, 'rgba(40,30,0,0.4)'); lblG('F = F₇((t))', 450, 616, C.white, fq, 30);
    lbl('Laurent series in t , coefficients mod 7', 450, 690, C.dim, fq, 16);
    box(220, 270, 460, 90, C.mag, eq, 2, 'rgba(40,0,40,0.4)'); lblG('E = F₇((u))', 450, 326, C.white, eq, 30);
    line(450, 362, 450, 556, C.white, eq, 2.5); lblG('t = u³', 470, 450, C.white, eq, 26, 'left'); lbl('degree 3', 430, 440, C.dim, eq, 16, 'right'); lbl('X³ − t Eisenstein', 430, 470, C.dim, eq, 16, 'right');
    lbl('v_E(u) = v_F(t) = 1 ,  |u| = |t| = 7⁻¹', 450, 245, C.dim, eq, 16);
    const tq = Q(S, 0, 'Seven does not divide three', 0.6) * f1;
    chip(450, 770, 700, 56, '7 does not divide 3  ⇒  tame ;  e = 3 , f = 1', C.green, tq, 21);
    const cq = Q(S, 0, 'cyclic and totally tamely ramified', 0.6) * f1;
    const cx = 1390, cy = 510, R = 175;
    lbl('F₇ = {0, 1, …, 6} :  the cube roots of unity', cx, 280, C.white, cq, 18);
    const P = []; for (let k = 0; k < 7; k++) { const an = -Math.PI / 2 + 2 * Math.PI * k / 7; P.push([cx + R * Math.cos(an), cy + R * Math.sin(an)]); }
    ring(cx, cy, R, C.dim, cq * 0.5, 1.5);
    [[1, 2], [2, 4], [4, 1]].forEach(([i, j]) => arrow(P[i][0], P[i][1], P[j][0], P[j][1], C.gold, cq, 2.5));
    P.forEach((p, k) => { const hl = k === 1 || k === 2 || k === 4; dot(p[0], p[1], hl ? 13 : 9, hl ? 'g' : 'n', cq); lbl(String(k), cx + (R + 34) * Math.cos(-Math.PI / 2 + 2 * Math.PI * k / 7), cy + (R + 34) * Math.sin(-Math.PI / 2 + 2 * Math.PI * k / 7) + 7, hl ? C.gold : C.dim, cq, 20); });
    lbl('× 2', cx, cy + 8, C.gold, cq, 24);
    lbl('2³ = 8 ≡ 1  ⇒  ζ = 2 ,  μ₃(F₇) = {1, 2, 4}', cx, 760, C.gold, cq, 18);
    lbl('σ_j(u) = ζʲ u :  Gal(E/F) ≅ ℤ/3 , cyclic', cx, 800, C.cyan, cq, 18);
  }
  const q = Q(S, 1, 'Principal units one plus a u plus b u squared', 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 255, 1500, 58, '(1 + au + bu²)(1 + a′u + b′u²) ≡ 1 + (a + a′)u + (b + b′ + aa′)u²   mod u³', C.white, q, 21);
    const cq = Q(S, 1, 'have additive coordinates a, and b minus a squared over two', 0.6);
    lbl('so  a  and  b − a²/2  are additive coordinates on U¹/U³', W / 2, 315, C.cyan, cq, 18);
    const gq = Q(S, 1, 'Theta epsilon is e of epsilon a plus the second', 0.6);
    grid075(210, 420, 50, GRID075['+'], gq, 'θ₊ :  k = a + b − a²/2', C.cyan);
    grid075(650, 420, 50, GRID075['-'], gq, 'θ₋ :  k = −a + b − a²/2', C.mag);
    lbl('cell (a, b) shows k with θ_ε(1 + au + bu²) = e(k/7) ,  e(x) = exp(2πi x / 7)', 560, 800, C.dim, gq, 15);
    chip(1450, 420, 640, 58, 'θ_ε(uᵐ r v) = e(εa + b − a²/2)', C.gold, gq, 22);
    const lq = Q(S, 1, 'trivial on the third level, not on the second', 0.6);
    [['θ_ε(u) = 1', C.white], ['θ_ε = 1 on residue units F₇^×', C.white], ['θ_ε(1 + bu²) = e(b) : nontrivial on U²', C.gold], ['θ_ε = 1 on U³ = 1 + u³O_E', C.green]].forEach(([s, col], i) => { const qq = clamp(lq * 1.6 - i / 5); check075(1160, 520 + i * 56, s, col, qq, 19); });
    stamp('CONDUCTOR EXPONENT 3', 1450, 780, Q(S, 1, 'not on the second', 0.6), C.green, 28, -0.04);
  }
};

/* ---- 03 TWO PARAMETERS ---- */
SCENES.pair = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const x0 = 230, y0 = 760, sp = 62, X = c => x0 + c * sp, Y = c => y0 - c * sp;
  const pq = Q(S, 0, 'Its conjugates have coefficient pairs', 0.6);
  if (pq > 0) {
    lbl('coefficient pairs (first , second) of the conjugates θ_ε ∘ σ_j', 430, 250, C.white, pq, 17);
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) dot(X(i), Y(j), 3, 'n', pq * 0.7);
    for (let i = 0; i < 7; i++) { lbl(String(i), X(i), y0 + 32, C.dim, pq, 15); lbl(String(i), x0 - 30, Y(i) + 5, C.dim, pq, 15); }
    lbl('first coefficient ε · 2ʲ', X(6), y0 + 62, C.dim, pq, 15, 'right'); lbl('second : 4ʲ', x0 - 40, Y(6) - 24, C.dim, pq, 15, 'left');
    const Pp = PAIRS075['+'];
    strokePoly(Pp.map(([a, b]) => [X(a), Y(b)]), C.cyan, pq * 0.6, 2);
    Pp.forEach(([a, b], j) => { dot(X(a), Y(b), 12, 'c', pq); lbl('j=' + j, X(a) + 18, Y(b) - 14, C.cyan, pq, 15, 'left'); });
    lbl('θ₊ : (1,1) (2,4) (4,2)', 430, 285, C.cyan, pq, 17);
    const mq = Q(S, 1, 'theta minus would be a conjugate of theta plus', 0.6);
    const Pm = PAIRS075['-'];
    strokePoly(Pm.map(([a, b]) => [X(a), Y(b)]), C.mag, mq * 0.6, 2);
    Pm.forEach(([a, b], j) => { ring(X(a), Y(b), 12, C.mag, mq, 3); lbl('j=' + j, X(a) + 16, Y(b) + 28, C.mag, mq, 15, 'left'); });
    lbl('θ₋ : (6,1) (5,4) (3,2)', 430, 315, C.mag, mq, 17);
    const sq = Q(S, 1, 'the second coefficient forces j zero', 0.6);
    dashed(X(0) - 10, Y(1), X(6) + 16, Y(1), C.gold, sq, 2.2);
    lbl('second = 1 only at j = 0', X(3), Y(1) + 34, C.gold, sq, 15);
    const oq = Q(S, 1, 'then one equals minus one mod seven', 0.6);
    lbl('1 ≠ −1 = 6', X(6) + 34, Y(1) + 6, C.red, oq, 18, 'left');
  }
  const f1 = 1 - Q(S, 1, 'Were R plus and R minus isomorphic', 0.6);
  if (f1 > 0) {
    const iq = Q(S, 0, 'Induce theta epsilon', 0.6) * f1;
    chip(1390, 260, 760, 58, 'R_ε = Ind(θ_ε) :  W_E ⊂ W_F of index 3 ,  dim 3', C.gold, iq, 21);
    const wq = Q(S, 0, 'so wild inertia sees three distinct lines', 0.6) * f1;
    const cx = 1390, cy = 500, rr = 150;
    lbl('P_F = P_E :  restriction to U²/U³', cx, 335, C.white, wq, 17);
    const L = [['e(b)', 1], ['e(4b)', 4], ['e(2b)', 2]];
    const pts = L.map((_, i) => [cx + rr * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / 3), cy + 30 + rr * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / 3)]);
    const tq = Q(S, 0, 'permuted transitively', 0.6) * f1;
    pts.forEach((p, i) => { const q2 = pts[(i + 1) % 3]; arrow(p[0] + (q2[0] - p[0]) * 0.28, p[1] + (q2[1] - p[1]) * 0.28, p[0] + (q2[0] - p[0]) * 0.72, p[1] + (q2[1] - p[1]) * 0.72, C.dim, tq, 2.2); });
    lbl('σ', cx, cy + 40, C.dim, tq, 22);
    pts.forEach((p, i) => { const qq = clamp(wq * 1.6 - i / 4); box(p[0] - 70, p[1] - 30, 140, 60, C.cyan, qq, 2, 'rgba(0,30,40,0.6)'); lbl(L[i][0], p[0], p[1] + 8, C.white, qq, 22); });
    const rq = Q(S, 0, 'R epsilon is irreducible', 0.6) * f1;
    chip(1390, 735, 760, 56, 'Res_P R_ε = e(b) ⊕ e(4b) ⊕ e(2b) , all distinct', C.cyan, rq, 20);
    stamp('IRREDUCIBLE · MULTIPLICITY-FREE', 1390, 805, rq, C.green, 26, -0.03);
  }
  const q = Q(S, 1, 'Were R plus and R minus isomorphic', 0.6, 0.3);
  if (q > 0) {
    chip(1390, 270, 780, 58, 'R₊ ≅ R₋  ⇒  θ₋ = θ₊ ∘ σ_j  for some j', C.white, q, 22);
    const sq = Q(S, 1, 'the second coefficient forces j zero', 0.6);
    chip(1390, 370, 780, 58, 'second coefficient :  4ʲ = 1  ⇒  j = 0', C.gold, sq, 22);
    const oq = Q(S, 1, 'then one equals minus one mod seven', 0.6);
    chip(1390, 470, 780, 58, 'first coefficient :  −1 = 1 in F₇ ,  impossible', C.red, oq, 22);
    const dq = Q(S, 1, 'So pi plus and pi minus are different supercuspidals', 0.6);
    stamp('π₊ ≄ π₋', 1390, 600, dq, C.mag, 44, -0.04);
    lbl('irreducible 3-dim parameters with N = 0 ↦ supercuspidals ;', 1390, 690, C.dim, dq, 15);
    lbl('local Langlands is injective', 1390, 718, C.dim, dq, 15);
  }
};

/* ---- 04 CONDUCTOR AND DEPTH ---- */
SCENES.depth = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Both thetas are trivial on F star', 0.6);
  if (f1 > 0) {
    const dq = Q(S, 0, 'The different is generated by three u squared', 0.6) * f1;
    chip(450, 260, 640, 58, '𝔇(E/F) = (3u²) ,  v_E(𝔇) = 2', C.gold, dq, 23);
    const lev = [['U⁰ / U¹', 'residue r : θ = 1', C.white, 0], ['U¹ / U²', 'a : e(εa) , nontrivial', C.cyan, 1], ['U² / U³', 'b : e(b) , nontrivial', C.gold, 1], ['U³', 'θ = 1', C.green, 0]];
    lev.forEach(([n, s, col, nt], i) => { const qq = clamp(dq * 1.6 - i / 5), w = 560 - i * 90, x = 450 - w / 2, y = 340 + i * 95; box(x, y, w, 70, col, qq, 2, nt ? 'rgba(40,30,0,0.35)' : 'rgba(0,0,0,0.45)'); lbl(n, x + 16, y + 30, col, qq, 18, 'left'); lbl(s, x + 16, y + 56, C.white, qq, 15, 'left'); });
    lbl('a_E(θ_ε) = 3', 450, 760, C.cyan, dq, 22);
    const cq = Q(S, 0, 'so the conductor of R epsilon is three plus two', 0.6) * f1;
    chip(1390, 260, 780, 58, 'a_F(R_ε) = f · (a_E(θ_ε) + v_E(𝔇)) = 1 · (3 + 2) = 5', C.white, cq, 20);
    const bx = 1080, U = 120;
    fillBox(bx, 350, 3 * U, 60, C.cyan, cq * 0.4); rect63(bx, 350, 3 * U, 60, C.cyan, cq, 2); lbl('a_E(θ) = 3', bx + 1.5 * U, 388, C.white, cq, 18);
    fillBox(bx + 3 * U, 350, 2 * U, 60, C.gold, cq * 0.4); rect63(bx + 3 * U, 350, 2 * U, 60, C.gold, cq, 2); lbl('𝔇 : 2', bx + 4 * U, 388, C.white, cq, 18);
    lbl('= 5', bx + 5 * U + 20, 390, C.white, cq, 24, 'left');
    const wq = Q(S, 0, 'The Swan conductor is two', 0.6) * f1;
    fillBox(bx, 450, 3 * U, 60, C.dim, wq * 0.3); rect63(bx, 450, 3 * U, 60, C.dim, wq, 2); lbl('dim R = 3', bx + 1.5 * U, 488, C.white, wq, 18);
    fillBox(bx + 3 * U, 450, 2 * U, 60, C.mag, wq * 0.4); rect63(bx + 3 * U, 450, 2 * U, 60, C.mag, wq, 2); lbl('Swan 2', bx + 4 * U, 488, C.white, wq, 18);
    lbl('no inertia invariants', bx + 1.5 * U, 535, C.dim, wq, 15);
    const pq = Q(S, 0, 'the depth is five minus three over three', 0.6) * f1;
    const lx = 1080, lw = 600, ly = 680;
    line(lx, ly, lx + lw, ly, C.dim, pq, 2);
    [0, 1 / 3, 2 / 3, 1].forEach((v, i) => { line(lx + v * lw, ly - 8, lx + v * lw, ly + 8, C.dim, pq, 2); lbl(['0', '1/3', '2/3', '1'][i], lx + v * lw, ly + 34, C.dim, pq, 16); });
    dot(lx + 2 / 3 * lw, ly, 13, 'm', pq);
    chip(1390, 600, 640, 56, 'd(π_ε) = (a_F(R_ε) − 3)/3 = 2/3', C.mag, pq, 22);
    lbl('depth preserved by local Langlands', 1390, 760, C.dim, pq, 15);
  }
  const q = Q(S, 1, 'Both thetas are trivial on F star', 0.6, 0.3);
  if (q > 0) {
    lbl('θ_ε on F^× = t^ℤ · F₇^× · U_F¹', 450, 265, C.white, q, 20);
    [['t = u³ ↦ θ_ε(u)³ = 1'], ['F₇^× ↦ 1'], ['U_F¹ ⊂ U_E³ ↦ 1']].forEach(([s], i) => { const qq = clamp(q * 1.6 - i / 5); check075(230, 340 + i * 70, s, C.white, qq, 22); });
    chip(450, 600, 560, 58, 'θ_ε | F^× = 1', C.green, q, 25);
    const tq = Q(S, 1, 'the transfer is trivial', 0.6);
    lbl('transfer ↔ inclusion F^× → E^× :  θ_ε | F^× = 1', 450, 680, C.cyan, tq, 17);
    const pq = Q(S, 1, 'the cyclic permutation has determinant one', 0.6);
    const M = [[0, 0, 1], [1, 0, 0], [0, 1, 0]], gx = 1180, gy = 290, cw = 86;
    lbl('monomial induced basis : permutation part', 1310, 265, C.white, pq, 17);
    M.forEach((row, i) => row.forEach((v, j) => { box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, v ? C.gold : C.dim, pq, 1.8, v ? 'rgba(40,30,0,0.45)' : 'rgba(0,0,0,0.4)'); lbl(String(v), gx + j * cw + 40, gy + i * cw + 50, v ? C.gold : C.dim, pq, 24); }));
    lbl('3-cycle :  det = +1', gx + 140, gy + 300, C.gold, pq, 20);
    const dq = Q(S, 1, 'So both representations have trivial central character', 0.6);
    chip(1310, 680, 700, 60, 'det R_ε = 1  ⇒  ω_π₊ = ω_π₋ = 1', C.green, dq, 24);
    stamp('TRIVIAL CENTRAL CHARACTER', 1310, 780, dq, C.green, 26, -0.03);
  }
};

/* ---- 05 SHALLOW TWISTS ---- */
SCENES.twists = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Twisting multiplies theta by chi of the norm', 0.6);
  if (f1 > 0) {
    const dq = Q(S, 0, 'For GL one, depth at most two thirds means trivial on principal units', 0.6) * f1;
    const px = 210, py = 690, ph = 330, hs = 100;
    plotAxes(px, py, 640, ph, dq, '', 'GL₁ depth d(χ)'); lbl('conductor a(χ)', px + 640, py + 62, C.dim, dq, 16, 'right');
    const D = [0, 0, 1, 2];
    D.forEach((d, i) => { const qq = clamp(dq * 1.6 - i / 6), x = px + 60 + i * 150, h = Math.max(d * hs, 6), col = d <= 2 / 3 ? C.green : C.red; fillBox(x, py - h, 70, h, col, qq * 0.45); rect63(x, py - h, 70, h, col, qq, 1.6); lbl(String(i), x + 35, py + 28, C.dim, qq, 17); lbl(String(d), x + 35, py - h - 12, col, qq, 18); });
    dashed(px, py - 2 / 3 * hs, px + 640, py - 2 / 3 * hs, C.gold, dq, 2); lbl('d = 2/3', px + 640, py - 2 / 3 * hs - 12, C.gold, dq, 16, 'right');
    chip(530, 805, 680, 54, 'd(χ) ≤ 2/3  ⇔  χ = 1 on U_F¹', C.green, dq, 22);
    lbl('a ≥ 2 ⇒ d = a − 1 ≥ 1', 530, 315, C.dim, dq, 16);
    chip(1390, 260, 780, 56, 'F^× = t^ℤ · F₇^× · U_F¹   ⇒   χ ↔ (η , z)', C.white, dq, 21);
    const eq = Q(S, 0, 'any of six residue characters eta', 0.6) * f1;
    const hx = 1180, hy = 520, hr = 120;
    lbl('η : F₇^× → ℂ^× ,  η(3) = e^(2πik/6)', hx, 360, C.cyan, eq, 16);
    for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + k * Math.PI / 3, x = hx + hr * Math.cos(an), y = hy + hr * Math.sin(an), qq = clamp(eq * 1.6 - k / 8); line(hx, hy, x, y, C.cyan, qq * 0.3, 1.2); dot(x, y, 12, 'c', qq); lbl('η' + ['₀', '₁', '₂', '₃', '₄', '₅'][k], hx + (hr + 30) * Math.cos(an), hy + (hr + 30) * Math.sin(an) + 7, C.white, qq, 17); }
    lbl('any of 6', hx, hy + 6, C.cyan, eq, 17);
    const zq = Q(S, 0, 'with any nonzero complex number z', 0.6) * f1;
    const zx = 1580, zy = 520, zr = 140;
    fillPoly(ringPts(zx, zy, zr, 48), C.gold, zq * 0.08); ring(zx, zy, zr, C.gold, zq * 0.4, 1.2);
    line(zx - zr - 10, zy, zx + zr + 10, zy, C.dim, zq, 1.2); line(zx, zy - zr - 10, zx, zy + zr + 10, C.dim, zq, 1.2);
    ring(zx, zy, 7, C.red, zq, 2.5); lbl('0 excluded', zx + 12, zy + 28, C.red, zq, 14, 'left');
    const zt = t * 0.6, zz = [zx + 90 * Math.cos(zt) + 25 * Math.cos(2.3 * zt), zy - 80 * Math.sin(1.3 * zt)];
    dot(zz[0], zz[1], 10, 'g', zq); lbl('z', zz[0] + 14, zz[1] - 10, C.gold, zq, 18, 'left');
    lbl('z = χ(t) ∈ ℂ^× , any', zx, zy + zr + 40, C.gold, zq, 17);
    lbl('×', (hx + zx) / 2, hy + 8, C.white, zq, 30);
  }
  const q = Q(S, 1, 'Twisting multiplies theta by chi of the norm', 0.6, 0.3);
  if (q > 0) {
    chip(W / 2, 260, 900, 60, 'ξ_ε = θ_ε · (χ ∘ N_E/F)', C.gold, q, 26);
    const nq = Q(S, 1, 'The norm sends u to t and a residue unit r to r cubed', 0.6);
    chip(560, 370, 820, 56, 'N(u) = t ,  N(r) = r³ ,  N(U_E¹) ⊂ U_F¹', C.cyan, nq, 22);
    const cx0 = 260, cw = 90;
    lbl('r', cx0 - 40, 470, C.dim, nq, 18); lbl('r³', cx0 - 40, 560, C.dim, nq, 18);
    CUBE075.forEach((v, i) => { const qq = clamp(nq * 1.6 - i / 8); cellv(cx0 + i * cw, 430, 70, i + 1, C.white, qq, 'rgba(0,0,0,0.5)', 0.4); cellv(cx0 + i * cw, 520, 70, v === 6 ? '−1' : '1', v === 6 ? C.mag : C.cyan, qq, 'rgba(0,0,0,0.5)', 0.36); });
    lbl('cubes in F₇^× are ±1 :  ξ_ε(r) = η(r³)', 560, 640, C.white, nq, 18);
    const zq = Q(S, 1, 'so the twisted character sends u to z', 0.6);
    chip(1390, 400, 720, 56, 'ξ_ε(u) = z', C.gold, zq, 26);
    chip(1390, 490, 720, 56, 'ξ_ε(r) = η(r³)', C.cyan, zq, 24);
    chip(1390, 580, 720, 56, 'ξ_ε(1 + au + bu²) = e(εa + b − a²/2)', C.white, zq, 21);
    const kq = Q(S, 1, 'and still has conductor three', 0.6);
    stamp('CONDUCTOR STILL 3', 1390, 690, kq, C.green, 30, -0.04);
    lbl('for every z ∈ ℂ^× : no unitarity , no finite-order condition', 1390, 770, C.dim, kq, 16);
  }
};

/* ---- 06 THE UNIT SUM ---- */
SCENES.sum = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'The Fourier transform lives on valuation minus two', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Summing over b kills every r except one third', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "Tate's functional equation gives the factor", 0.6) * f1;
    chip(1390, 260, 780, 54, 'ψ_E(Σ yⱼ uʲ) = e(3y₀) ,  since Tr uʲ = 3t^(j/3) or 0', C.white, q, 19);
    chip(1390, 330, 780, 54, 'vol O_K = 7^(1/2) ,  vol(u³O_E) = 7^(−5/2)', C.white, q, 20);
    chip(1390, 400, 780, 54, 'φ_ε = ξ_ε⁻¹ · 1(O_E^×) ,  Z(s, φ_ε, ξ_ε) = 1', C.white, q, 20);
    const sq = Q(S, 0, 'The Fourier transform lives on valuation minus two', 0.6) * f1;
    const px = 200, py = 690, pw = 640, ph = 360, hs = ph / 0.18;
    plotAxes(px, py, pw, ph, sq, '', '|φ̂_ε(y)| ,  brute force over O_E / u⁵'); lbl('valuation v of y', px + pw, py + 62, C.dim, sq, 16, 'right');
    SUPP075.forEach((v, i) => { const qq = clamp(sq * 1.6 - i / 6), x = px + 50 + i * 120, h = Math.max(v * hs, 4), col = v > 1e-6 ? C.gold : C.dim; fillBox(x, py - h, 70, h, col, qq * 0.45); rect63(x, py - h, 70, h, col, qq, 1.6); lbl(String(-i), x + 35, py + 28, C.dim, qq, 17); if (v > 1e-6) lbl('1/7', x + 35, py - h - 14, C.gold, qq, 20); });
    lbl('support : u⁻² O_E^×', 420, 780, C.gold, sq, 18);
    const gq = Q(S, 0, 'the factor is z squared', 0.6) * f1;
    chip(1390, 520, 780, 66, 'γ_E(s, ξ_ε, ψ_E) = z² · 7^(−2(s − 1/2)) · 7^(−3/2) · S_ε(η)', C.gold, gq, 21);
    const uq = Q(S, 0, 'times a complete unit sum S', 0.6) * f1;
    chip(1390, 630, 780, 66, 'S_ε(η) = Σ r ∈ F₇^× , a , b   η(r³)⁻¹ e(a²/2 − εa + (3r − 1)b)', C.cyan, uq, 18);
    lbl('both rank-one L-factors are 1 : γ_E is the full epsilon factor', 1390, 710, C.dim, uq, 15);
  }
  const q = Q(S, 1, 'Summing over b kills every r except one third', 0.6, 0.3);
  if (q > 0) {
    const px = 200, py = 600, pw = 640, ph = 300, hs = ph / 8;
    plotAxes(px, py, pw, ph, q, '', '| Σ_b e((3r − 1) b) |'); lbl('residue r', px + pw + 12, py + 6, C.dim, q, 16, 'left');
    BSUM075.forEach((v, i) => { const qq = clamp(q * 1.6 - i / 7), x = px + 40 + i * 100, h = Math.max(v * hs, 4), col = v > 1e-6 ? C.gold : C.dim; fillBox(x, py - h, 60, h, col, qq * 0.45); rect63(x, py - h, 60, h, col, qq, 1.6); lbl(String(i + 1), x + 30, py + 28, i === 4 ? C.gold : C.dim, qq, 17); if (v > 1e-6) lbl('7', x + 30, py - h - 14, C.gold, qq, 22); });
    const tq = Q(S, 1, 'which gives seven', 0.6);
    lbl('r = 5 = 1/3', px + 40 + 4 * 100 + 30, py - 8 * hs - 44, C.gold, tq, 17);
    const cq = Q(S, 1, 'one third cubed is minus one', 0.6);
    chip(520, 690, 680, 54, '(1/3)³ = 5³ = 125 ≡ −1 mod 7  ⇒  η(r³)⁻¹ = η(−1)', C.mag, cq, 18);
    const rq = Q(S, 1, 'What remains is the sum of e of a squared over two minus epsilon a', 0.6);
    chip(520, 770, 680, 56, 'S_ε(η) = 7 η(−1) Σₐ e(a²/2 − εa)', C.gold, rq, 23);
    const cx = 1390, cy = 480, R = 160;
    rootsCircle075(cx, cy, R, rq, false);
    lbl('the seven terms e(a²/2 − εa) on the 7th roots of unity', cx, 255, C.white, rq, 17);
    const groupP = {}, groupM = {};
    PHP075.forEach((k, a) => { (groupP[k] = groupP[k] || []).push(a); }); PHM075.forEach((k, a) => { (groupM[k] = groupM[k] || []).push(a); });
    Object.keys(groupP).forEach(k => { const [x, y] = rootXY075(cx, cy, R, +k); dot(x, y, 11, 'c', rq); const [lx, ly] = rootXY075(cx, cy, R + 50, +k); lbl('a=' + groupP[k].join(','), lx, ly + 6, C.cyan, rq, 16); });
    const sq = Q(S, 1, 'a to minus a swaps the signs', 0.6);
    Object.keys(groupM).forEach(k => { const [x, y] = rootXY075(cx, cy, R, +k); ring(x, y, 18, C.mag, sq, 3); const [lx, ly] = rootXY075(cx, cy, R - 46, +k); lbl(groupM[k].join(','), lx, ly + 6, C.mag, sq, 16); });
    lbl('cyan : ε = +1 , labels a outside   ·   magenta : ε = −1 , labels a inside', cx, 720, C.white, sq, 15);
    stamp('a ↦ −a :  S₊ = S₋', cx, 790, sq, C.green, 30, -0.03);
    const gv = Q(S, 1, 'swaps the signs', 0.6, 0.8);
    arrow(cx, cy, cx + G075[0] * R / 3, cy - G075[1] * R / 3, C.gold, gv, 3);
    lbl('Σ / 3 ,  |Σ| = √7', cx + G075[0] * R / 3 - 14, cy - G075[1] * R / 3 + 28, C.gold, gv, 15, 'right');
  }
};

/* ---- 07 COMPLETE COLLISION ---- */
SCENES.collision = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'conjecture one point three of Luo and Stevens', 'published'], [1, 'Central characters agree', 'theory']]);
  const f1 = 1 - Q(S, 1, 'In rank three that is the whole twisting range', 0.6);
  if (f1 > 0) {
    const iq = Q(S, 0, 'Induction adds the same constant lambda on both sides', 0.6) * f1;
    chip(560, 260, 820, 54, 'R_ε ⊗ χ ≅ Ind(ξ_ε)', C.white, iq, 22);
    chip(560, 335, 820, 54, 'ε_F(s, R_ε ⊗ χ, ψ_F) = λ_E/F(ψ_F) · ε_E(s, ξ_ε, ψ_E)', C.gold, iq, 19);
    lbl('same E/F , same ψ_F : the same λ for ε = +1 and −1', 560, 390, C.dim, iq, 15);
    const lq = Q(S, 0, 'every L factor is one', 0.6) * f1;
    chip(560, 450, 820, 54, 'L(s, R_ε ⊗ χ) = L(1 − s, (R_ε ⊗ χ)^∨) = 1', C.cyan, lq, 19);
    lbl('χ = 1 on P_F : all three wild constituents stay nontrivial', 560, 505, C.dim, lq, 15);
    const tq = Q(S, 0, 'local Langlands transfers the identity', 0.6) * f1;
    chip(560, 565, 820, 54, 'γ(s, π_ε × χ, ψ_F) = γ(s, R_ε ⊗ χ, ψ_F) ,  sign χ(−1)² = 1', C.mag, tq, 19);
    lbl('pair factors preserved ; Henniart–Lomelí normalisation comparison', 560, 620, C.dim, tq, 15);
    const aq = Q(S, 0, 'the complete Rankin–Selberg factors of pi plus and pi minus agree', 0.6) * f1;
    chip(W / 2, 715, 1560, 66, 'γ(s, π₊ × χ) = γ(s, π₋ × χ) = λ_E/F(ψ_F) · η(−1) z² · 7^(−2(s − 1/2)) · 7^(−1/2) · Σₐ e(a²/2 − a)', C.green, aq, 20);
    lbl('for every η , every z ∈ ℂ^× , every complex s   (Proposition 2 , formula 1)', W / 2, 785, C.white, aq, 16);
    const pq = Q(S, 0, 'for every shallow chi and every complex s', 0.6) * f1;
    const cx = 1420, cy = 430, R = 160;
    ring(cx, cy, R, C.dim, pq * 0.6, 1.5); line(cx - R - 20, cy, cx + R + 20, cy, C.dim, pq * 0.35, 1); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, pq * 0.35, 1);
    lbl('γ_E for ε = +1 (dots) and ε = −1 (rings)', cx, 240, C.white, pq, 16);
    SAMP075.forEach((r, i) => { const qq = clamp(pq * 1.6 - i / 16); dot(cx + r[0] * R, cy - r[1] * R, 8, 'c', qq); ring(cx + r[2] * R, cy - r[3] * R, 15, C.mag, clamp(qq * 1.4 - 0.3), 2.5); });
    lbl('12 samples :  Re s = 1/2 ,  |z| = 1 ,  all six η ;  |γ_E| = 1', cx, cy + R + 44, C.dim, pq, 15);
  }
  const q = Q(S, 1, 'In rank three that is the whole twisting range', 0.6, 0.3);
  if (q > 0) {
    const cq = Q(S, 1, 'conjecture one point three of Luo and Stevens', 0.6);
    box(150, 240, 1620, 470, C.cyan, cq, 2, 'rgba(0,25,40,0.35)');
    lbl('Luo–Stevens , arXiv:2505.22357v1 , Conjecture 1.3', W / 2, 285, C.cyan, cq, 22);
    const rows = [['supercuspidal π₁ , π₂ of GL_n(F) with equal central characters', 'ω₊ = ω₋ = 1', 'Central characters agree'],
      ['equal γ for all supercuspidal twists of rank 1 ≤ r ≤ ⌊n/2⌋ , depth ≤ d(π₁) , d(π₂)', 'n = 3 : r = 1 ,  d(χ) ≤ 2/3 , all agree', 'In rank three that is the whole twisting range'],
      ['F any nonarchimedean local field', 'F = F₇((t)) is allowed', 'stated for all nonarchimedean local fields']];
    rows.forEach(([hyp, ok, ph], i) => { const qq = Q(S, 1, ph, 0.6), y = 350 + i * 80; lblG(hyp, 190, y, C.white, clamp(cq * 1.6 - i / 4), 18, 'left'); check075(1240, y, ok, C.green, qq * cq, 18); });
    const nq = Q(S, 1, 'the pair is not isomorphic', 0.6);
    lblG('⇒  π₁ ≅ π₂ ?', 190, 610, C.white, cq, 26, 'left'); check075(1240, 610, 'π₊ ≄ π₋', C.red, nq, 22, '✗');
    const fq = Q(S, 1, 'so it is false as literally stated', 0.6);
    stamp('FALSE AS LITERALLY STATED', W / 2, 785, fq, C.red, 40, -0.03);
  }
};

/* ---- 08 RANK VERSUS DEPTH ---- */
SCENES.converse = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const q0 = Q(S, 0, 'Rank limits and depth limits differ', 0.6);
  const ax = 210, ay = 640, us = 200, Xd = d => ax + d * us;
  if (q0 > 0) {
    lbl('rank-one twists χ of GL₁ , by depth', 560, 260, C.white, q0, 18);
    line(ax, ay, Xd(3.5), ay, C.dim, q0, 2);
    [0, 1, 2, 3].forEach(d => { line(Xd(d), ay - 8, Xd(d), ay + 8, C.dim, q0, 2); lbl(String(d), Xd(d), ay + 34, C.dim, q0, 17); });
    lbl('2/3', Xd(2 / 3), ay + 34, C.gold, q0, 17); line(Xd(2 / 3), ay - 8, Xd(2 / 3), ay + 8, C.gold, q0, 2);
    lbl('depth d(χ)', Xd(3.5), ay + 64, C.dim, q0, 16, 'right');
    fillBox(Xd(0), 500, Xd(2 / 3) - Xd(0), 60, C.green, q0 * 0.35); rect63(Xd(0), 500, Xd(2 / 3) - Xd(0), 60, C.green, q0, 2);
    lbl('this collision : d ≤ 2/3', Xd(2 / 3) + 16, 538, C.green, q0, 17, 'left');
    const jq = Q(S, 0, 'use twists of every depth', 0.6);
    fillBox(Xd(0), 360, Xd(3.3) - Xd(0), 60, C.cyan, jq * 0.25); rect63(Xd(0), 360, Xd(3.3) - Xd(0), 60, C.cyan, jq, 2); arrow(Xd(3.3), 390, Xd(3.55), 390, C.cyan, jq, 3);
    lbl('all-depth converse theorems : every depth', Xd(0) + 16, 398, C.cyan, jq, 17, 'left');
    dot(Xd(0), ay, 12, 'v', q0); lbl('γ₊ = γ₋', Xd(0), ay - 30, C.green, q0, 17);
    const dq = Q(S, 1, 'every twist of conductor two, depth one, already separates the pair', 0.6);
    [1, 2, 3].forEach(d => ring(Xd(d), ay, 8, C.dim, q0 * (1 - dq * (d === 1 ? 1 : 0)), 2));
    dot(Xd(1), ay, 13, 'r', dq); lbl('γ₊ ≠ γ₋', Xd(1), ay - 30, C.red, dq, 17);
    lbl('conductor 2', Xd(1), ay + 64, C.red, dq, 15);
  }
  const f1 = 1 - Q(S, 1, 'Recomputed for this film', 0.6);
  if (f1 > 0) {
    const refs = [['Jacquet–Liu', 'arXiv:1601.03656v2 , Theorem 1.3', 'The converse theorems of Jacquet and Liu'], ['Adrian–Liu–Stevens–Xu', 'arXiv:1409.4790v1 , Prop. 7.2 , Cor. 7.3', 'of Adrian, Liu, Stevens and Xu'], ['Jiang–Nien–Stevens', 'arXiv:1504.02819v1 , Theorem 1.5', 'and of Jiang, Nien and Stevens']];
    refs.forEach(([n, s, ph], i) => { const qq = Q(S, 0, ph, 0.6) * f1, y = 260 + i * 130; box(1090, y, 690, 105, C.cyan, qq, 2, 'rgba(0,25,40,0.45)'); lbl(n, 1435, y + 40, C.cyan, qq, 21); lbl(s, 1435, y + 78, C.white, qq, 16); });
    const nq = Q(S, 0, 'and are not contradicted', 0.6) * f1;
    stamp('NOT CONTRADICTED', 1435, 700, nq, C.green, 34, -0.04);
    lbl('rank-three case includes positive-depth twists absent here', 1435, 780, C.dim, nq, 15);
  }
  const q = Q(S, 1, 'Recomputed for this film', 0.6, 0.3);
  if (q > 0) {
    const cx = 1300, cy = 480, R = 160;
    lbl('γ(s, π₊ × χ) / γ(s, π₋ × χ) for conductor-2 twists', cx + 60, 250, C.white, q, 17);
    rootsCircle075(cx, cy, R, q, false);
    const rq = Q(S, 1, 'by a nontrivial seventh root of unity', 0.6);
    const [ox, oy] = rootXY075(cx, cy, R, 0); ring(ox, oy, 16, C.green, rq, 2.5); lbl('1 : never', ox + 24, oy + 6, C.green, rq, 16, 'left');
    RAT075.forEach(([al, c], i) => { const qq = clamp(rq * 1.6 - i / 8), [x, y] = rootXY075(cx, cy, R, c), [lx, ly] = rootXY075(cx, cy, R + 40, c); dot(x, y, 11, 'm', qq); lbl('α=' + al, lx, ly + 5, C.mag, qq, 15); });
    lbl('χ(1 + ct) = e(αc) , α ≠ 0 :  six α × six η = 36 twists', 1620, 700, C.white, rq, 15, 'right');
    lbl('ratio = e(c/7) , c ≠ 0 , independent of η , z , s', 1620, 728, C.white, rq, 15, 'right');
    stamp('SEPARATED AT DEPTH ONE', 560, 755, rq, C.red, 30, -0.04);
    const oq = Q(S, 1, 'One admissible pair refutes the universal claim', 0.6);
    chip(W / 2, 835, 1500, 50, 'one admissible pair refutes the universal implication  ·  no positive statement for a restricted family', C.gold, oq, 18);
  }
};

/* ---- 09 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The Luo–Stevens conjecture', 'published'], [1, 'the collision is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['TWO CHARACTERS', 'θ₊ , θ₋ : ε = ±1', C.gold, 'One flipped sign gives two characters'], ['TWO PARAMETERS', 'π₊ ≄ π₋ , d = 2/3', C.mag, 'two supercuspidals of depth two thirds'], ['UNIT SUM', 'a ↦ −a : S₊ = S₋', C.cyan, 'a unit sum symmetric under a to minus a'], ['COLLISION', 'γ₊ = γ₋ , d(χ) ≤ 2/3', C.green, 'one complete answer to every shallow twist'], ['CONJECTURE 1.3', 'false as stated', C.red, 'every shallow twist']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 270 + i * 345, q = Q(S, 0, ph) * fade; box(x - 155, 240, 310, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 19); lblG(a2, x, 340, C.white, q, 20); });
    const pq = Q(S, 1, 'The Luo–Stevens conjecture') * fade;
    lbl('PUBLISHED · Luo–Stevens Conjecture 1.3 (arXiv:2505.22357) · Adrian–Liu–Stevens–Tam inducing family and local constants', W / 2, 460, C.cyan, pq, 15);
    lbl('Bushnell–Henniart (arXiv:1302.4304) · Aubert–Baum–Plymen–Solleveld (arXiv:1311.1606) · Henniart–Lomelí (arXiv:1305.5452)', W / 2, 495, C.cyan, pq, 15);
    lbl('CLASSICAL · Tate functional equation · local class field theory (Milne) · conductor of an induced representation', W / 2, 540, '#8fbcff', Q(S, 1, 'are published inputs') * fade, 15);
    lbl('VOLUME · Proposition 2 , complete-response collision · Corollary 3 , depth-restricted converse in rank three', W / 2, 585, C.orange, Q(S, 1, 'the collision is argued in the theory volume') * fade, 15);
    lbl('RECOMPUTED · unit law · conjugate pairs · trace , norm · conductor 5 · Fourier support · unit sum · γ₊ = γ₋ on samples · depth-one ratios', W / 2, 630, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM', W / 2, 710, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 22);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC–LANGLANDS V · CUBIC', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC–Langlands 第五部 · 三次浅扭碰撞 · TRURETURING FILM 075', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two characters one sign apart, and one answer to every shallow twist.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC–LANGLANDS V', field: 'FIELDS AND CHARACTERS', pair: 'TWO PARAMETERS', depth: 'CONDUCTOR AND DEPTH', twists: 'SHALLOW TWISTS', sum: 'THE UNIT SUM', collision: 'COMPLETE COLLISION', converse: 'RANK VERSUS DEPTH', finale: 'LEDGER' });

function poster075() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('θ_ε = e(εa + b − a²/2) ,  ε = ±1', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('γ(s, π₊ × χ) = γ(s, π₋ × χ)', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('d(χ) ≤ 2/3  ·  π₊ ≄ π₋', 1320, 590, { size: 44, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC–Langlands 第五部', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC–LANGLANDS V · CUBIC', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('三 次 浅 扭 碰 撞', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 075', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster075;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
