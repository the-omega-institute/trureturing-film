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

/* ---- film 090: AURIC V19–V20 · arithmetic spectra and golden selector gates ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN GENERAL THEOREM · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN PROBLEM · RH NOT PROVED HERE', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po090 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po090.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po090.set(key, off); }
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
const CH_090 = {"l7": [[0.0, 0.96158], [0.05, 0.94375], [0.1, 0.92591], [0.15, 0.90808], [0.2, 0.89025], [0.25, 0.87241], [0.3, 0.85458]], "l10": [[0.0, 0.96158], [0.05, 0.96158], [0.1, 0.96158], [0.15, 0.96158], [0.2, 0.96158], [0.25, 0.96158], [0.3, 0.96158]]};
const GIBBS_090 = {"p": [0.60793, 0.15198, 0.06755, 0.038, 0.02432, 0.01689, 0.01241, 0.0095, 0.00751, 0.00608, 0.00502, 0.00422], "mean": 0.57, "var": 0.8845};
const N6_090 = [2.0, 2.8165];
const ROBREC_090 = [[3, 1.3333, 0.1675], [4, 1.75, 0.5818], [6, 2.0, 1.0387], [12, 2.3333, 1.6212], [24, 2.5, 2.0594], [36, 2.5278, 2.2733], [48, 2.5833, 2.4108], [60, 2.8, 2.5106], [120, 3.0, 2.7892], [180, 3.0333, 2.934], [240, 3.1, 3.03], [360, 3.25, 3.1571], [720, 3.3583, 3.3554], [840, 3.4286, 3.3966], [1260, 3.4667, 3.5008], [1680, 3.5429, 3.5712], [2520, 3.7143, 3.6658], [5040, 3.8381, 3.8169], [10080, 3.9, 3.9561], [15120, 3.9365, 4.0328], [25200, 3.966, 4.1249], [27720, 4.0519, 4.1416], [55440, 4.187, 4.2583], [110880, 4.2545, 4.3679], [166320, 4.2944, 4.429], [277200, 4.3266, 4.5031], [332640, 4.3636, 4.5289], [554400, 4.3964, 4.599], [665280, 4.3983, 4.6234], [720720, 4.5091, 4.634]];
const ROBMAX_090 = 0.98582;
const PSUM_090 = {"0.75": [[1, 1.0], [2, 1.3536], [3, 1.546], [4, 1.671], [5, 1.7604], [6, 1.8285], [8, 1.9267], [10, 1.9953], [13, 2.0681], [16, 2.1201], [20, 2.1707], [25, 2.2163], [32, 2.2616], [40, 2.2981], [50, 2.3309], [63, 2.3614], [79, 2.3881], [100, 2.4129], [126, 2.4346], [158, 2.4535], [200, 2.4711], [251, 2.4863], [316, 2.5], [398, 2.5122], [501, 2.5231], [631, 2.5328], [794, 2.5414], [1000, 2.5491], [1259, 2.556], [1585, 2.5621], [1995, 2.5676], [2512, 2.5725], [3162, 2.5768], [3981, 2.5807], [5012, 2.5841], [6310, 2.5872], [7943, 2.5899], [10000, 2.5924]], "0.5": [[1, 1.0], [2, 1.5], [3, 1.8333], [4, 2.0833], [5, 2.2833], [6, 2.45], [8, 2.7179], [10, 2.929], [13, 3.1801], [16, 3.3807], [20, 3.5977], [25, 3.816], [32, 4.0585], [40, 4.2785], [50, 4.4992], [63, 4.7283], [79, 4.953], [100, 5.1874], [126, 5.4175], [158, 5.643], [200, 5.878], [251, 6.1047], [316, 6.3345], [398, 6.5649], [501, 6.7948], [631, 7.0253], [794, 7.2549], [1000, 7.4855], [1259, 7.7157], [1585, 7.9459], [1995, 8.1759], [2512, 8.4062], [3162, 8.6363], [3981, 8.8666], [5012, 9.0969], [6310, 9.3272], [7943, 9.5573], [10000, 9.7876]], "0.4": [[1, 1.0], [2, 1.5743], [3, 1.9896], [4, 2.3195], [5, 2.5954], [6, 2.8339], [8, 3.2342], [10, 3.5651], [13, 3.9774], [16, 4.3219], [20, 4.7105], [25, 5.1186], [32, 5.5936], [40, 6.0449], [50, 6.5179], [63, 7.0315], [79, 7.5587], [100, 8.1344], [126, 8.7265], [158, 9.3338], [200, 9.9967], [251, 10.666], [316, 11.3766], [398, 12.1223], [501, 12.9015], [631, 13.7195], [794, 14.5728], [1000, 15.4698], [1259, 16.4078], [1585, 17.3899], [1995, 18.4174], [2512, 19.4951], [3162, 20.6222], [3981, 21.8034], [5012, 23.0402], [6310, 24.3353], [7943, 25.6906], [10000, 27.1106]]};
const Z15_090 = 2.6124;
const PTR_090 = [[0.0, 1.0], [0.25, 0.9736], [0.5, 0.9074], [0.75, 0.8261], [1.0, 0.7482], [1.25, 0.6816], [1.5, 0.6278], [1.75, 0.5856], [2.0, 0.5532], [2.25, 0.5287], [2.5, 0.5108], [2.75, 0.4982], [3.0, 0.49], [3.25, 0.4855], [3.5, 0.4841], [3.75, 0.4854], [4.0, 0.489], [4.25, 0.4945], [4.5, 0.5018], [4.75, 0.5106], [5.0, 0.5208], [5.25, 0.5321], [5.5, 0.5445], [5.75, 0.5576], [6.0, 0.5715], [6.25, 0.5858], [6.5, 0.6005], [6.75, 0.6154], [7.0, 0.6302], [7.25, 0.6449], [7.5, 0.6591], [7.75, 0.6728], [8.0, 0.6856], [8.25, 0.6973], [8.5, 0.7077], [8.75, 0.7166], [9.0, 0.7238], [9.25, 0.7289], [9.5, 0.7318], [9.75, 0.7322], [10.0, 0.7299], [10.25, 0.7247], [10.5, 0.7166], [10.75, 0.7053], [11.0, 0.6909], [11.25, 0.6733], [11.5, 0.6527], [11.75, 0.6292], [12.0, 0.6032], [12.25, 0.5751], [12.5, 0.5458], [12.75, 0.5162], [13.0, 0.4875], [13.25, 0.4615], [13.5, 0.4401], [13.75, 0.4253], [14.0, 0.4192], [14.25, 0.423], [14.5, 0.4371], [14.75, 0.4606], [15.0, 0.4918], [15.25, 0.5288], [15.5, 0.5692], [15.75, 0.6112], [16.0, 0.6529], [16.25, 0.6927], [16.5, 0.7292], [16.75, 0.7612], [17.0, 0.7877], [17.25, 0.8079], [17.5, 0.8211], [17.75, 0.8269], [18.0, 0.825], [18.25, 0.8154], [18.5, 0.7984], [18.75, 0.7744], [19.0, 0.7442], [19.25, 0.709], [19.5, 0.6702], [19.75, 0.6297], [20.0, 0.5898], [20.25, 0.5528], [20.5, 0.5217], [20.75, 0.4987], [21.0, 0.4855], [21.25, 0.4826], [21.5, 0.4888], [21.75, 0.5016], [22.0, 0.5183], [22.25, 0.5357], [22.5, 0.5513], [22.75, 0.5631], [23.0, 0.5699], [23.25, 0.5711], [23.5, 0.5668], [23.75, 0.5579], [24.0, 0.5464], [24.25, 0.5345], [24.5, 0.5255], [24.75, 0.5226], [25.0, 0.5286], [25.25, 0.545], [25.5, 0.5718], [25.75, 0.6072], [26.0, 0.6482], [26.25, 0.6915], [26.5, 0.7339], [26.75, 0.7723], [27.0, 0.8041], [27.25, 0.8274], [27.5, 0.8406], [27.75, 0.843], [28.0, 0.8342], [28.25, 0.8147], [28.5, 0.7854], [28.75, 0.748], [29.0, 0.7044], [29.25, 0.6576], [29.5, 0.6104], [29.75, 0.5662], [30.0, 0.528], [30.25, 0.4983], [30.5, 0.4779], [30.75, 0.4662], [31.0, 0.4614], [31.25, 0.4607], [31.5, 0.4617], [31.75, 0.4627], [32.0, 0.4634], [32.25, 0.4649], [32.5, 0.4693], [32.75, 0.4791], [33.0, 0.4969], [33.25, 0.5239], [33.5, 0.5596], [33.75, 0.602], [34.0, 0.648], [34.25, 0.694], [34.5, 0.7365], [34.75, 0.7723], [35.0, 0.7989], [35.25, 0.8145], [35.5, 0.8182], [35.75, 0.81], [36.0, 0.791], [36.25, 0.763], [36.5, 0.729], [36.75, 0.6926], [37.0, 0.6578], [37.25, 0.6286], [37.5, 0.6081], [37.75, 0.5974], [38.0, 0.5955], [38.25, 0.5997], [38.5, 0.6062], [38.75, 0.6111], [39.0, 0.6116], [39.25, 0.6058], [39.5, 0.5934], [39.75, 0.5751], [40.0, 0.5529], [40.25, 0.5298], [40.5, 0.5089], [40.75, 0.4931], [41.0, 0.4843], [41.25, 0.4825], [41.5, 0.4862], [41.75, 0.4932], [42.0, 0.5011], [42.25, 0.5085], [42.5, 0.5154], [42.75, 0.5234], [43.0, 0.535], [43.25, 0.5532], [43.5, 0.5805], [43.75, 0.6172], [44.0, 0.662], [44.25, 0.7115], [44.5, 0.7615], [44.75, 0.8077], [45.0, 0.8458], [45.25, 0.8725], [45.5, 0.8855], [45.75, 0.8836], [46.0, 0.8666], [46.25, 0.8358], [46.5, 0.7935], [46.75, 0.7427], [47.0, 0.6876], [47.25, 0.6323], [47.5, 0.5811], [47.75, 0.5374], [48.0, 0.5031], [48.25, 0.4782], [48.5, 0.4615], [48.75, 0.451], [49.0, 0.4452], [49.25, 0.444], [49.5, 0.4481], [49.75, 0.4588], [50.0, 0.4767], [50.25, 0.5012], [50.5, 0.5302], [50.75, 0.5604], [51.0, 0.5885], [51.25, 0.6115], [51.5, 0.6275], [51.75, 0.6359], [52.0, 0.6377], [52.25, 0.6354], [52.5, 0.6327], [52.75, 0.6337], [53.0, 0.6415], [53.25, 0.6576], [53.5, 0.6806], [53.75, 0.7075], [54.0, 0.7338], [54.25, 0.755], [54.5, 0.7677], [54.75, 0.7697], [55.0, 0.7605], [55.25, 0.7412], [55.5, 0.7145], [55.75, 0.6842], [56.0, 0.6548], [56.25, 0.6303], [56.5, 0.613], [56.75, 0.6031], [57.0, 0.5986], [57.25, 0.5958], [57.5, 0.5911], [57.75, 0.5818], [58.0, 0.5665], [58.25, 0.5456], [58.5, 0.5208], [58.75, 0.4952], [59.0, 0.4718], [59.25, 0.4537], [59.5, 0.4424], [59.75, 0.4385], [60.0, 0.4416]];
const PTRMIN_090 = 0.4192;
const CAY_090 = {"gam": [14.1347, 21.022, 25.0109, 30.4249, 32.9351, 37.5862, 40.9187, 43.3271, 48.0052, 49.7738], "ang": [4.0519, 2.725, 2.2905, 1.883, 1.7395, 1.5243, 1.4002, 1.3223, 1.1935, 1.1511], "off": [0.7, 3.0], "offz": [0.9262, 0.3161]};
const CONC_090 = [0.03535, 0.02378, 0.01999, 0.01643, 0.01518, 0.0133, 0.01222, 0.01154, 0.01041, 0.01004];
const FIB_090 = {"prim": [1, 1, 1, 1, 2, 2, 4, 5, 8, 11], "poles": [0.6180339887498948, -1.618033988749895]};
const SPECL_090 = [[1, 2], [1, 2, 4], [1, 2, 4, 8], [1, 2, 4, 6, 8], [1, 2, 4, 6, 8]];
const MERT_090 = {"band": [[126, -8, 5], [376, -9, 3], [626, -12, 7], [876, -5, 6], [1126, -15, 2], [1376, -4, 13], [1626, -16, 2], [1876, -12, 8], [2126, -4, 12], [2376, -15, 10], [2626, -15, 13], [2876, -25, -5], [3126, -9, 19], [3376, 9, 23], [3626, -12, 14], [3876, -16, -4], [4126, -20, -6], [4376, -19, -3], [4626, -9, 4], [4876, 2, 21], [5126, -6, 4], [5376, -6, 13], [5626, 2, 17], [5876, -12, 10], [6126, -11, 6], [6376, -25, -6], [6626, -24, -9], [6876, -27, -12], [7126, -29, 3], [7376, 1, 22], [7626, -7, 16], [7876, -11, 5], [8126, -1, 24], [8376, 13, 29], [8626, 13, 35], [8876, 1, 18], [9126, -4, 7], [9376, -24, 2], [9626, -36, -15], [9876, -43, -23], [10126, -26, -11], [10376, -35, -19], [10626, -28, -14], [10876, -21, -6], [11126, -11, 4], [11376, -5, 15], [11626, 7, 32], [11876, 14, 42], [12126, 12, 24], [12376, 9, 23], [12626, -4, 12], [12876, -9, 15], [13126, -15, -5], [13376, -20, 1], [13626, -5, 11], [13876, -8, 16], [14126, 10, 22], [14376, 6, 25], [14626, -4, 19], [14876, -21, -4], [15126, -10, 12], [15376, -14, 8], [15626, -28, -9], [15876, -34, -18], [16126, -42, -22], [16376, -39, -25], [16626, -29, -17], [16876, -26, -9], [17126, -27, -13], [17376, -24, -12], [17626, -25, 1], [17876, -13, 2], [18126, -25, -6], [18376, -26, -17], [18626, -27, 2], [18876, -3, 39], [19126, 37, 50], [19376, 33, 51], [19626, 22, 49], [19876, 25, 48], [20126, 19, 27], [20376, 17, 30], [20626, 25, 48], [20876, 33, 45], [21126, 28, 44], [21376, 19, 38], [21626, 0, 22], [21876, -9, 9], [22126, -23, 0], [22376, -30, -16], [22626, -27, -14], [22876, -27, -18], [23126, -39, -20], [23376, -39, -22], [23626, -41, -27], [23876, -45, -35], [24126, -72, -45], [24376, -67, -47], [24626, -59, -31], [24876, -34, -19], [25126, -20, -2], [25376, -12, 3], [25626, -18, 0], [25876, -17, -1], [26126, -8, 8], [26376, -2, 9], [26626, -7, 16], [26876, -18, -4], [27126, -23, -1], [27376, -14, 13], [27626, 8, 25], [27876, -6, 15], [28126, -10, 4], [28376, -2, 11], [28626, -19, 11], [28876, -28, -16], [29126, -25, -1], [29376, -14, 7], [29626, 6, 24], [29876, 17, 34], [30126, 1, 21], [30376, -2, 28], [30626, 21, 40], [30876, 37, 47], [31126, 34, 51], [31376, 30, 47], [31626, 41, 59], [31876, 40, 73], [32126, 51, 72], [32376, 35, 59], [32626, 17, 37], [32876, 13, 28], [33126, -2, 15], [33376, -5, 14], [33626, -25, 1], [33876, -33, -19], [34126, -34, -17], [34376, -29, -16], [34626, -38, -27], [34876, -39, -14], [35126, -22, -8], [35376, -29, -14], [35626, -28, -12], [35876, -22, 1], [36126, -15, 0], [36376, -10, 8], [36626, -13, 8], [36876, -24, -1], [37126, -21, -5], [37376, -36, -17], [37626, -45, -26], [37876, -39, -23], [38126, -37, -19], [38376, -40, -20], [38626, -25, -12], [38876, -26, -8], [39126, -16, 5], [39376, -27, -14], [39626, -26, -9], [39876, -14, 0], [40126, -20, 1], [40376, -20, 1], [40626, -9, 3], [40876, -13, 3], [41126, -13, 9], [41376, -17, -4], [41626, -24, -3], [41876, -39, -19], [42126, -48, -34], [42376, -63, -42], [42626, -76, -62], [42876, -88, -72], [43126, -80, -44], [43376, -52, -34], [43626, -39, -18], [43876, -30, -12], [44126, -25, -8], [44376, -12, 10], [44626, -3, 11], [44876, -4, 8], [45126, -10, 2], [45376, -5, 6], [45626, -5, 11], [45876, 4, 25], [46126, 24, 41], [46376, 31, 51], [46626, 28, 44], [46876, 28, 45], [47126, 42, 65], [47376, 54, 68], [47626, 55, 67], [47876, 51, 65], [48126, 61, 88], [48376, 79, 96], [48626, 77, 96], [48876, 68, 84], [49126, 62, 79], [49376, 49, 69], [49626, 41, 52], [49876, 20, 45], [50126, 6, 28], [50376, -1, 18], [50626, -1, 20], [50876, 12, 26], [51126, 19, 33], [51376, 22, 40], [51626, 18, 30], [51876, 1, 19], [52126, 0, 15], [52376, 2, 17], [52626, 11, 24], [52876, 12, 27], [53126, 10, 19], [53376, 7, 17], [53626, 4, 18], [53876, 13, 25], [54126, 18, 37], [54376, 10, 36], [54626, 2, 15], [54876, 5, 17], [55126, 3, 17], [55376, 2, 28], [55626, 19, 38], [55876, 2, 24], [56126, -7, 4], [56376, -15, 1], [56626, -40, -15], [56876, -65, -34], [57126, -75, -57], [57376, -67, -53], [57626, -59, -42], [57876, -68, -49], [58126, -82, -57], [58376, -79, -64], [58626, -68, -56], [58876, -86, -57], [59126, -95, -81], [59376, -106, -82], [59626, -113, -101], [59876, -109, -80], [60126, -97, -78], [60376, -86, -65], [60626, -70, -50], [60876, -85, -61], [61126, -82, -61], [61376, -71, -51], [61626, -75, -59], [61876, -72, -56], [62126, -78, -64], [62376, -71, -48], [62626, -54, -36], [62876, -41, -26], [63126, -45, -31], [63376, -43, -30], [63626, -69, -38], [63876, -86, -64], [64126, -76, -48], [64376, -55, -36], [64626, -36, -7], [64876, -11, 20], [65126, 0, 21], [65376, 1, 17], [65626, -8, 16], [65876, -7, 9], [66126, 3, 30], [66376, 27, 40], [66626, 21, 39], [66876, 23, 45], [67126, 27, 41], [67376, 24, 40], [67626, 23, 32], [67876, 12, 29], [68126, 15, 31], [68376, 27, 50], [68626, 38, 56], [68876, 44, 58], [69126, 56, 74], [69376, 61, 82], [69626, 75, 95], [69876, 71, 85], [70126, 51, 77], [70376, 50, 67], [70626, 41, 59], [70876, 48, 65], [71126, 42, 54], [71376, 18, 51], [71626, 16, 38], [71876, 17, 38], [72126, 24, 38], [72376, 28, 45], [72626, 33, 45], [72876, 15, 40], [73126, 11, 39], [73376, 30, 46], [73626, 33, 43], [73876, 41, 59], [74126, 45, 57], [74376, 37, 51], [74626, 32, 46], [74876, 22, 47], [75126, 20, 39], [75376, 20, 28], [75626, 1, 26], [75876, -12, 5], [76126, -5, 7], [76376, -12, 16], [76626, 1, 22], [76876, 8, 21], [77126, 1, 18], [77376, 3, 14], [77626, -9, 13], [77876, -14, 3], [78126, -12, 2], [78376, -10, 16], [78626, -4, 15], [78876, 5, 17], [79126, 11, 25], [79376, 10, 23], [79626, -6, 16], [79876, -2, 12], [80126, -1, 10], [80376, -2, 15], [80626, 7, 20], [80876, -8, 10], [81126, -18, -2], [81376, -20, -6], [81626, -34, -13], [81876, -34, -18], [82126, -53, -27], [82376, -64, -48], [82626, -60, -49], [82876, -57, -48], [83126, -60, -34], [83376, -39, -26], [83626, -31, -18], [83876, -22, -2], [84126, -10, 10], [84376, -10, 13], [84626, -9, 9], [84876, 5, 32], [85126, 16, 31], [85376, 14, 32], [85626, 28, 44], [85876, 39, 65], [86126, 46, 68], [86376, 27, 52], [86626, 26, 47], [86876, 32, 43], [87126, 29, 45], [87376, 26, 40], [87626, 25, 49], [87876, 17, 30], [88126, 17, 47], [88376, 37, 49], [88626, 32, 50], [88876, 25, 52], [89126, 13, 31], [89376, 15, 29], [89626, 1, 16], [89876, 1, 20], [90126, -15, 10], [90376, -13, 10], [90626, -2, 16], [90876, 3, 22], [91126, 9, 22], [91376, -7, 19], [91626, -9, 7], [91876, -13, 9], [92126, -19, -1], [92376, -33, -11], [92626, -34, -18], [92876, -53, -28], [93126, -59, -37], [93376, -68, -54], [93626, -69, -49], [93876, -59, -44], [94126, -81, -59], [94376, -97, -63], [94626, -101, -87], [94876, -108, -85], [95126, -113, -97], [95376, -120, -105], [95626, -126, -106], [95876, -129, -108], [96126, -132, -107], [96376, -128, -114], [96626, -126, -102], [96876, -131, -111], [97126, -121, -93], [97376, -96, -77], [97626, -88, -67], [97876, -77, -59], [98126, -82, -62], [98376, -78, -58], [98626, -71, -58], [98876, -68, -53], [99126, -76, -52], [99376, -71, -50], [99626, -62, -50], [99876, -66, -47]], "rmax": 0.8944, "M1e5": -48};
const COVER_090 = [[1, 5, 1.5098, 0.8267], [2, 17, 0.9665, 0.5591], [3, 53, 0.8442, 0.4314], [4, 161, 0.6817, 0.3078], [5, 485, 0.5276, 0.2214], [6, 1457, 0.4636, 0.1477], [7, 4373, 0.3228, 0.0982], [8, 13121, 0.2229, 0.0653], [9, 39365, 0.1321, 0.0466], [10, 118097, 0.0775, 0.033]];
const SKB_090 = {"0.02": [0.02, 0.016970562748, 0.013264644533, 0.009166312826, 0.005265544197, 0.002292535894, 0.000658605672], "0.01": [0.01, 0.006, 0.002788548009, 0.000883524179, 0.00015757195, 1.1867783e-05, 2.45305e-07]};
const SKRUN_090 = [[0, 0.058157, 0.031029, 10], [1, 0.027962, 0.014622, 50], [2, 0.005707, 0.002342, 250], [3, 0.00038, 0.000159, 1186]];
const PAD_090 = [[0, 5, 0.726224, 4.357343], [1, 15, 0.272334, 4.357343], [2, 25, 0.16759, 4.357343], [3, 35, 0.121037, 4.357343], [4, 45, 0.094725, 4.357343], [5, 55, 0.07781, 4.357343], [6, 65, 0.06602, 4.357343]];
const PATH_090 = [[0.05, 1.6653, 20, 0.6653], [0.05425, 1.7503, 20, 0.6653], [0.05885, 1.8423, 20, 0.6653], [0.06385, 1.9423, 20, 0.6653], [0.06927, 2.0507, 20, 0.6653], [0.07515, 2.1683, 20, 0.6653], [0.08153, 2.28923, 10, 1.47393], [0.08845, 2.35843, 10, 1.47393], [0.09596, 2.43353, 10, 1.47393], [0.10411, 2.51503, 10, 1.47393], [0.11295, 2.60343, 10, 1.47393], [0.12254, 2.69933, 10, 1.47393], [0.13294, 2.80333, 10, 1.47393], [0.14422, 2.91613, 10, 1.47393], [0.15647, 3.03863, 10, 1.47393], [0.16975, 3.13376, 0, 3.13376], [0.18417, 3.13376, 0, 3.13376], [0.1998, 3.13376, 0, 3.13376], [0.21677, 3.13376, 0, 3.13376], [0.23517, 3.13376, 0, 3.13376], [0.25514, 3.13376, 0, 3.13376], [0.2768, 3.13376, 0, 3.13376], [0.3003, 3.13376, 0, 3.13376], [0.32579, 3.13376, 0, 3.13376], [0.35345, 3.13376, 0, 3.13376], [0.38346, 3.13376, 0, 3.13376], [0.41602, 3.13376, 0, 3.13376], [0.45134, 3.13376, 0, 3.13376], [0.48966, 3.13376, 0, 3.13376], [0.53123, 3.13376, 0, 3.13376], [0.57633, 3.13376, 0, 3.13376], [0.62526, 3.13376, 0, 3.13376], [0.67835, 3.13376, 0, 3.13376], [0.73594, 3.13376, 0, 3.13376], [0.79842, 3.13376, 0, 3.13376], [0.86621, 3.13376, 0, 3.13376], [0.93975, 3.13376, 0, 3.13376], [1.01953, 3.13376, 0, 3.13376], [1.10609, 3.13376, 0, 3.13376], [1.2, 3.13376, 0, 3.13376]];
const GAM_090 = 8.3524;
const FRONT_090 = {"cand": [[0, 3.13376], [10, 1.47393], [20, 0.6653], [30, 0.55913], [40, 0.19804], [50, 0.22748], [60, 0.00941], [70, 0.00941], [80, 0.00838]], "hull": [[0, 3.13376], [10, 1.47393], [20, 0.6653], [40, 0.19804], [60, 0.00941], [80, 0.00838]], "B": 37, "supp": [[20, 0.15], [40, 0.85]], "val": 0.26813};
const K_090 = {"phi": 1.618033988749895, "trD": 0.381966, "concG": 0.78615, "tdist": 0.07852, "c": 3.9694, "log07": -0.35667};
/* ---- film 090 helpers ---- */
function cell090(x, y, w, h, s, col, a, size = 20, fillA = 0.3, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.36, tc, a, size); }
function cellG090(x, y, w, h, s, col, a, size = 20, fillA = 0.3, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.36, tc, a, size); }
function poly090(pts, mx, my, col, a, lw = 3, prog = 1) {
  if (a <= 0 || !pts.length) return;
  const n = Math.max(2, Math.floor(pts.length * clamp(prog)));
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i < n; i++) { const X = mx(pts[i][0]), Y = my(pts[i][1]); if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y); }
  ctx.stroke(); ctx.globalAlpha = 1;
}
function unitc090(cx, cy, R, a, col = C.dim) { if (a <= 0) return; ring(cx, cy, R, col, a, 1.8); line(cx - R - 30, cy, cx + R + 30, cy, C.dim, a * 0.4, 1); line(cx, cy - R - 30, cx, cy + R + 30, C.dim, a * 0.4, 1); }
function note090(s, x, y, a, col = C.dim, size = 15, align = 'center') { lbl(s, x, y, col, a, size, align); }
const LG10 = x => Math.log(x) / Math.LN10;

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['sums, products, logarithms and squares', 'V19 · SUMS , PRODUCTS , LOGARITHMS', '[2 + 5] = 7   versus   [2][5] = 10', C.gold], ['reach the Riemann hypothesis', 'V19 · ARITHMETIC SPECTRA', 'exact restatements · RH not proved', C.mag], ['returns to one fixed golden gate', 'V20 · ONE FIXED GOLDEN GATE', 'K = ω [ I + (ω − 1) P ] ,  K¹⁰ = I', C.cyan], ['cancel its own errors recursively', 'V20 · RECURSIVE COMPILATION', 'ε  →  6 ε^(3/2)  per level', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 340, 58, 'hidden log charge', C.gold, rp, 22); chip(330, 445, 340, 58, 'threshold 1/2', C.mag, rp, 22); chip(330, 530, 340, 58, 'Cayley circle', C.cyan, rp, 22);
  box(1420, 340, 380, 190, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one selector gate', 1610, 400, C.green, rp, 21); lblG('Tr D = φ⁻²', 1610, 450, C.white, rp, 26); lblG('ε → 6 ε^(3/2)', 1610, 495, C.white, rp, 26);
  txt(scramble('AURIC V19–V20 · SPECTRA', rp, 490), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V19–V20 · 算 术 谱 与 黄 金 选 择 门', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 090 · AURIC_SUM_PRODUCT_LOGARITHMS_AND_ARITHMETIC_SPECTRA_V19 · AURIC_GOLDEN_SELECTOR_GATES_RECURSIVE_COMPILATION_AND_VARIATIONAL_PRINCIPLES_V20', W / 2, 115, { size: 13, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
};

/* ---- 02 HIDDEN LOG CHARGE (V19 §2) ---- */
SCENES.charge = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The charge vanishes exactly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Start with the five modes', 0.6) * f1;
    const modes = [['∅', '000', '1', C.green], ['1', '100', '2', C.cyan], ['2', '010', '3', C.gold], ['3', '001', '5', C.orange], ['13', '101', '7', C.mag]];
    lbl('mode', 175, 312, C.dim, q, 16, 'right'); lbl('bits', 175, 372, C.dim, q, 16, 'right'); lbl('w_s', 175, 452, C.dim, q, 16, 'right');
    const vq = Q(S, 0, 'valued one, two, three, five and seven', 0.6) * f1;
    modes.forEach(([m, b, w, col], i) => { const x = 200 + i * 150; cell090(x, 280, 120, 50, m, col, q, 22, 0.15); lbl(b, x + 60, 372, C.white, q, 22); cell090(x, 410, 120, 64, w, col, vq, 32, 0.3); });
    const lq = Q(S, 0, 'average the logarithm', 0.6) * f1;
    chip(530, 530, 760, 56, 'L_w(p) = Σ_s p_s log w_s', C.white, lq, 23);
    const fq = Q(S, 0, 'where every visible mean is fixed', 0.6) * f1;
    lblG('p_κ = (R − X − Y + κ , X − κ , Z , Y − κ , κ)', 530, 610, C.cyan, fq, 21);
    lbl('X = p₁ + p₁₃ ,  Y = p₃ + p₁₃ ,  Z = p₂ ,  R = 1 − Z  all fixed', 530, 650, C.dim, fq, 16);
    const sq = Q(S, 0, 'slope log of seven tenths', 0.6) * f1;
    chip(530, 730, 860, 58, 'L_w(p_κ) = const + κ · log(w₀ w₁₃ / w₁ w₃) = const + κ log(7/10)', C.gold, sq, 20);
  }
  const q1 = Q(S, 1, 'The charge vanishes exactly', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 265, 860, 60, 'no hidden charge   ⟺   w₀ w₁₃ = w₁ w₃', C.cyan, q1, 25);
    lbl('(1 · 7 = 7  ≠  10 = 2 · 5 ;  a joint value of 10 would hide the fiber)', 530, 322, C.dim, q1, 15);
    const aq = Q(S, 1, 'Adding the blocks two and five gives seven', 0.6);
    box(150, 365, 360, 130, C.green, aq, 2, 'rgba(0,30,20,0.4)'); lbl('ADD BLOCKS', 330, 405, C.green, aq, 19); lbl('[2 + 5] = 7', 330, 462, C.white, aq, 34);
    const mq = Q(S, 1, 'multiplying gives ten', 0.6);
    box(550, 365, 360, 130, C.mag, mq, 2, 'rgba(40,0,40,0.4)'); lbl('MULTIPLY', 730, 405, C.mag, mq, 19); lbl('[2][5] = 10', 730, 462, C.white, mq, 34);
    lbl('log(7/10) = −0.3567 : log(ab) = log a + log b , but log(a + b) is another operation', 530, 530, C.gold, mq, 15);
    const iq = Q(S, 1, 'for integer counts the two completions are ten and seven', 0.6);
    lbl('n = 2^(u−k) · 3^v · 5^(w−k) · 7^k ,   0 ≤ k ≤ min(u, w)', 530, 600, C.white, iq, 21);
    lbl('log n = u log 2 + v log 3 + w log 5 − k log(10/7)', 530, 640, C.dim, iq, 17);
    cell090(220, 680, 300, 70, '(1,0,1) , k = 0 → 10', C.mag, iq, 21, 0.25); cell090(540, 680, 300, 70, '(1,0,1) , k = 1 → 7', C.green, iq, 21, 0.25);
  }
  const pq = Q(S, 0, 'this readout still moves', 0.8);
  if (pq > 0) {
    const px = 1080, py = 740, pw = 640, ph = 400, xS = k => px + 20 + k / 0.3 * (pw - 40), yS = v => py - (v - 0.83) / 0.15 * ph;
    plotAxes(px, py, pw, ph, pq, '', 'average log readout L_w(p_κ)'); lblG('κ', px + pw / 2, py + 52, C.dim, pq, 18);
    lbl('fiber : X = 0.3 , Y = 0.4 , Z = 0.1', px + pw, py - ph - 12, C.dim, pq, 15, 'right');
    poly090(CH_090.l7, xS, yS, C.gold, pq, 4, clamp(pq * 1.4));
    CH_090.l7.forEach(r => dot(xS(r[0]), yS(r[1]), 7, 'g', pq));
    lbl('w = (1, 2, 3, 5, 7) : slope log 0.7 = −0.357', xS(0.02), yS(0.858), C.gold, Q(S, 0, 'slope log of seven tenths', 0.6), 16, 'left');
    [0, 0.1, 0.2, 0.3].forEach(k => lbl(String(k), xS(k), py + 26, C.dim, pq, 14));
    [0.85, 0.9, 0.95].forEach(v => lbl(v.toFixed(2), px - 12, yS(v) + 5, C.dim, pq, 14, 'right'));
    const dq = Q(S, 1, 'w zero times w thirteen equals w one times w three', 0.6);
    poly090(CH_090.l10, xS, yS, C.cyan, dq, 3);
    lbl('w₁₃ = 10 : flat , the fiber is invisible', xS(0.3), yS(0.962) + 28, C.cyan, dq, 16, 'right');
  }
};

/* ---- 03 EULER, GIBBS, ROBIN (V19 §3–§4) ---- */
SCENES.robin = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'Draw an integer', 'theory'], [1, null, 'theory'], [1, "Robin's criterion", 'published']]);
  const f1 = 1 - Q(S, 1, 'Divisor sums are squares', 0.6);
  if (f1 > 0) {
    const lq = Q(S, 0, 'Logarithms turn products into sums of lengths', 0.6) * f1;
    lbl('log(mn) = log m + log n : Dirichlet convolution adds lengths', 530, 262, C.dim, lq, 17);
    const eq = Q(S, 0, "Euler's product separates the primes", 0.6) * f1;
    chip(530, 320, 860, 58, 'ζ(s) = Σ n^(−s) = Π_p (1 − p^(−s))⁻¹ ,  Re s > 1', C.cyan, eq, 23);
    const gq = Q(S, 0, 'Draw an integer', 0.6) * f1;
    chip(530, 420, 860, 58, 'Pr_σ(N = n) = n^(−σ) / ζ(σ) ,   σ > 1', C.gold, gq, 24);
    const iq = Q(S, 0, 'independent geometric variables', 0.6) * f1;
    chip(530, 505, 860, 56, 'Pr(ν_p = k) = (1 − p^(−σ)) p^(−σk) ,  independent over p', C.green, iq, 21);
    lblG('Var_σ(log N) = Σ_p (log p)² p^σ / (p^σ − 1)² > 0', 530, 580, C.white, iq, 21);
    lblG('D(q ‖ Pr_σ) = −H(q) + σ E_q log N + log ζ(σ) ≥ 0', 530, 625, C.white, iq, 21);
    lbl('an exact prediction–variation model for σ > 1 ; it needs no RH', 530, 665, C.dim, iq, 15);
    const bq = Q(S, 0, 'Draw an integer', 0.8) * f1;
    const bx = 1090, by = 700;
    plotAxes(bx - 20, by, 680, 420, bq, 'n', 'Pr₂(N = n) = n⁻² / ζ(2)');
    GIBBS_090.p.forEach((pv, i) => { const qq = clamp(bq * 1.5 - i / 16), h = pv / 0.62 * 380, x = bx + i * 54; fillBox(x, by - h, 40, h, C.gold, qq * 0.45); rect63(x, by - h, 40, h, C.gold, qq, 1.5); lbl(String(i + 1), x + 20, by + 24, C.dim, qq, 14); });
    lbl('Pr(N = 1) = 6/π² = 0.608', bx + 120, by - 340, C.gold, bq, 17, 'left');
    lbl('E log N = 0.570 ,  Var log N = 0.885  (σ = 2)', bx + 120, by - 305, C.white, iq, 16, 'left');
  }
  const q1 = Q(S, 1, 'Divisor sums are squares', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 265, 860, 60, 'σ(n)/n = Σ_(d|n) 1/d = ∫ |A_n|² dm', C.cyan, q1, 25);
    lblG('A_n(θ) = Π_(p|n) Σ_(k ≤ a_p) p^(−k/2) e^(ikθ_p)', 530, 330, C.white, q1, 21);
    const nq = Q(S, 1, 'two for six with independent phases', 0.6), sq = Q(S, 1, 'with a shared phase', 0.6);
    const by = 720, sc = 100;
    lbl('n = 6 = 2 · 3', 160, 395, C.dim, nq, 18, 'left');
    fillBox(290, by - N6_090[0] * sc, 140, N6_090[0] * sc, C.cyan, nq * 0.4); rect63(290, by - N6_090[0] * sc, 140, N6_090[0] * sc, C.cyan, nq, 2);
    lbl('2', 360, by - N6_090[0] * sc - 14, C.cyan, nq, 26); lbl('independent θ₂ , θ₃', 360, by + 30, C.cyan, nq, 16);
    fillBox(630, by - N6_090[1] * sc, 140, N6_090[1] * sc, C.gold, sq * 0.4); rect63(630, by - N6_090[1] * sc, 140, N6_090[1] * sc, C.gold, sq, 2);
    lbl('2 + 2/√6 = 2.817', 700, by - N6_090[1] * sc - 14, C.gold, sq, 22); lbl('one shared phase', 700, by + 30, C.gold, sq, 16);
    line(240, by, 820, by, C.dim, nq, 1.5);
    const rq = Q(S, 1, "Robin's criterion", 0.6);
    const px = 1080, py = 720, pw = 660, ph = 380, xS = n => px + 10 + (LG10(n) - LG10(3)) / (6 - LG10(3)) * (pw - 20), yS = v => py - v / 5 * ph;
    plotAxes(px, py, pw, ph, rq, '', 'σ(n)/n at record n'); lbl('n (log scale)', px + pw / 2, py + 50, C.dim, rq, 15);
    curve(p => { const n = Math.pow(10, LG10(3) + p * (6 - LG10(3))); return [xS(n), yS(1.7810724 * Math.log(Math.log(n)))]; }, 120, C.gold, rq, 3);
    lbl('e^γ log log n', xS(3e4), yS(4.4) - 26, C.gold, rq, 17);
    ROBREC_090.forEach((r, i) => { const qq = clamp(rq * 1.6 - i / 60); dot(xS(r[0]), yS(r[1]), 7, r[1] >= r[2] ? 'r' : 'c', qq); });
    dashed(xS(5040), py, xS(5040), py - ph, C.red, rq * 0.7, 1.5); lbl('5040', xS(5040), py + 24, C.red, rq, 15);
    [1, 2, 3, 4, 5].forEach(v => lbl(String(v), px - 12, yS(v) + 5, C.dim, rq, 14, 'right'));
    [10, 1000, 100000].forEach(n => lbl(n === 10 ? '10' : n === 1000 ? '10³' : '10⁵', xS(n), py + 24, C.dim, rq, 14));
    const bq = Q(S, 1, 'one bound on these averages', 0.6);
    chip(px + pw / 2, 262, 700, 50, 'RH ⟺ σ(n)/n < e^γ log log n for all n > 5040', C.cyan, bq, 19);
    lbl('red : 26 exceptions , all ≤ 5040 ;  5040 < n ≤ 10⁶ : max ratio ' + ROBMAX_090.toFixed(3), px + pw / 2, py + 78, C.dim, bq, 14);
    lbl('finite data , not a proof', px + pw / 2, py + 100, C.dim, bq, 14);
  }
};

/* ---- 04 SQUARES AND ONE HALF (V19 §6–§7) ---- */
SCENES.squares = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A true pointer overlap', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Prime characters are orthonormal', 0.6) * f1;
    chip(530, 265, 860, 58, 'χ_n(z) = Π_p z_p^(ν_p(n)) on the prime torus ,  ⟨χ_m , χ_n⟩ = δ_mn', C.cyan, q, 20);
    const nq = Q(S, 0, 'has square norm zeta of two a', 0.6) * f1;
    chip(530, 360, 860, 62, '‖ Σ_(n ≤ N) n^(−a) χ_n ‖² = Σ_(n ≤ N) n^(−2a)  →  ζ(2a)', C.gold, nq, 23);
    const hq = Q(S, 0, 'finite exactly when a exceeds one half', 0.6) * f1;
    stamp('L² LIMIT  ⟺  a > 1/2', 530, 470, hq, C.gold, 34, -0.03);
    lbl('squaring turns a into 2a ; the series boundary 2a = 1 gives the half', 530, 535, C.dim, hq, 15);
    const pq = Q(S, 0, 'Yet a norm-one sum can reach root N at one point', 0.6) * f1;
    chip(530, 620, 860, 58, 'g_N = N^(−1/2) Σ_(n ≤ N) conj χ_n(z₀) χ_n :  ‖g_N‖ = 1 ,  g_N(z₀) = √N', C.mag, pq, 20);
    lbl('a square average does not control the value at a chosen point', 530, 680, C.dim, pq, 15);
    lbl('checked on primes ≤ 12 : norm 1.0000 , value √12 = 3.4641', 530, 712, C.dim, pq, 15);
    const gq = Q(S, 0, 'has square norm zeta of two a', 0.8);
    const px = 1080, py = 740, pw = 660, ph = 420, xS = n => px + 10 + LG10(n) / 4 * (pw - 20), yS = v => py - Math.min(v, 12) / 12 * ph;
    plotAxes(px, py, pw, ph, gq * f1, '', 'Σ_(n ≤ N) n^(−2a)'); lbl('N (log scale)', px + pw / 2, py + 50, C.dim, gq * f1, 15);
    [['0.75', C.gold, 'a = 0.75'], ['0.5', C.cyan, 'a = 0.5'], ['0.4', C.mag, 'a = 0.4']].forEach(([k, col, lab], i) => { const qq = clamp(gq * 1.4 - i * 0.25) * f1, pts = PSUM_090[k].filter(r => r[1] <= 12); poly090(pts, xS, yS, col, qq, 3); const L = pts[pts.length - 1]; lbl(lab + (k === '0.4' ? ' → ∞' : ''), xS(L[0]) - 10, yS(L[1]) + (k === '0.75' ? 26 : -10), col, qq, 16, 'right'); });
    dashed(xS(1), yS(Z15_090), xS(1e4), yS(Z15_090), C.gold, gq * f1 * 0.7, 1.5);
    lbl('ζ(1.5) = ' + Z15_090.toFixed(3), xS(300), yS(Z15_090) - 10, C.gold, gq * f1, 15);
    lbl('a = 0.5 : like log N', px + 30, py - ph + 70, C.dim, hq, 15, 'left'); lbl('a = 0.4 : like N^0.2', px + 30, py - ph + 94, C.dim, hq, 15, 'left');
    [1, 10, 100, 1000, 10000].forEach((n, i) => lbl(['1', '10', '10²', '10³', '10⁴'][i], xS(n), py + 24, C.dim, gq * f1, 14));
    [4, 8, 12].forEach(v => lbl(String(v), px - 12, yS(v) + 5, C.dim, gq * f1, 14, 'right'));
  }
  const q1 = Q(S, 1, 'A true pointer overlap', 0.6, 0.3);
  if (q1 > 0) {
    lblG('H|n⟩ = (log n)|n⟩ ,  W_t = e^(−itH) ,  |ψ_σ⟩ ∝ Σ n^(−σ/2) |n⟩', 530, 262, C.white, q1, 21);
    chip(530, 330, 860, 62, '⟨ψ_σ| W_t |ψ_σ⟩ = ζ(σ + it) / ζ(σ)', C.cyan, q1, 26);
    const bq = Q(S, 1, 'at least two fifths at sigma two', 0.6);
    chip(530, 425, 860, 58, '1 ≥ |m_σ(t)| ≥ ζ(2σ)/ζ(σ)² = 2/5  at σ = 2', C.green, bq, 23);
    const dq = Q(S, 1, 'But Born squares double the exponent', 0.6);
    chip(530, 535, 860, 62, '|χ_a⟩ ∝ Σ n^(−a) |n⟩  ⇒  ⟨χ_a| W_t |χ_a⟩ = ζ(2a + it) / ζ(2a)', C.mag, dq, 21);
    const rq = Q(S, 1, 'read zeta of two a plus i t', 0.6);
    lbl('legal states need a > 1/2 , so the pointer reads Re s = 2a > 1 , never the critical strip', 530, 600, C.dim, rq, 15);
    lbl('summing amplitudes would pair with the all-ones vector , norm √N , not in ℓ²', 530, 630, C.dim, rq, 15);
    stamp('EXPONENT DOUBLED', 530, 715, rq, C.mag, 34, -0.04);
    const pq = Q(S, 1, 'A true pointer overlap', 0.8, 0.4);
    const px = 1080, py = 740, pw = 660, ph = 420, xS = x => px + x / 60 * pw, yS = v => py - v / 1.05 * ph;
    plotAxes(px, py, pw, ph, pq, 't', '|ζ(2 + it)| / ζ(2)');
    poly090(PTR_090, xS, yS, C.cyan, pq, 2.5, clamp(pq * 1.3));
    dashed(px, yS(0.4), px + pw, yS(0.4), C.red, bq, 2); lbl('ζ(4)/ζ(2)² = 2/5', px + pw - 6, yS(0.4) + 26, C.red, bq, 16, 'right');
    lbl('sampled min on 0 ≤ t ≤ 60 : ' + PTRMIN_090.toFixed(3), px + pw - 6, py - ph + 6, C.dim, bq, 15, 'right');
    [0, 20, 40].forEach(x => lbl(String(x), xS(x), py + 24, C.dim, pq, 14));
    [0.4, 1].forEach(v => lbl(String(v), px - 12, yS(v) + 5, C.dim, pq, 14, 'right'));
  }
};

/* ---- 05 CAYLEY CIRCLE (V19 §8–§9) ---- */
SCENES.cayley = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Put z on the joint mode', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Map each zero rho', 0.6) * f1;
    const ox = 210, oy = 720, sx = 260, sy = 8.4, X = r => ox + r * sx, Y = g => oy - g * sy;
    line(ox - 40, oy, ox + 330, oy, C.dim, q, 1.5); line(ox, oy + 20, ox, oy - 440, C.dim, q, 1.5);
    lbl('Re s', ox + 330, oy + 28, C.dim, q, 15, 'right'); lbl('Im s', ox + 8, oy - 446, C.dim, q, 15, 'left');
    line(X(0.5), oy + 10, X(0.5), oy - 440, C.cyan, q, 2.5); lbl('1/2', X(0.5), oy + 28, C.cyan, q, 15); lbl('1', X(1), oy + 28, C.dim, q, 15);
    CAY_090.gam.forEach((g, i) => dot(X(0.5), Y(g), 7, 'g', clamp(q * 1.5 - i / 14)));
    lbl('lowest ten zeros , 1/2 + it', X(0.5) + 14, Y(52), C.gold, q, 15, 'left');
    const oq = Q(S, 0, 'z is on the unit circle exactly when', 0.6) * f1;
    dot(X(0.95), Y(0.8 * 6), 8, 'o', oq); lbl('ρ = 0.95 + 0.8i (any off-line point)', X(0.95) + 12, Y(0.8 * 6) - 14, C.orange, oq, 13, 'left');
    lbl('(height × 6)', X(0.95) + 12, Y(0.8 * 6) + 4, C.dim, oq, 12, 'left');
    arrow(570, 440, 700, 440, C.white, q, 2.5); lblG('z = 1 − 1/ρ', 635, 420, C.white, q, 22);
    const cx = 960, cy = 470, R = 190;
    unitc090(cx, cy, R, q, C.cyan); ring(cx + R, cy, 9, C.white, q, 2); lbl('z = 1 excluded', cx + R + 14, cy + 34, C.dim, q, 13, 'left');
    CAY_090.ang.forEach((ad, i) => { const a1 = ad * Math.PI / 180, qq = clamp(oq * 1.5 - i / 14); dot(cx + R * Math.cos(a1), cy - R * Math.sin(a1), 6, 'g', qq); dot(cx + R * Math.cos(a1), cy + R * Math.sin(a1), 6, 'g', qq * 0.6); });
    const zo = [1 - 0.95 / 1.5425, 0.8 / 1.5425];
    dot(cx + R * zo[0], cy - R * zo[1], 8, 'o', oq); lbl('|z| < 1', cx + R * zo[0] - 14, cy - R * zo[1] - 14, C.orange, oq, 14, 'right');
    lblG('|z_ρ|² − 1 = (1 − 2 Re ρ) / |ρ|²', cx, cy + R + 52, C.white, oq, 20);
    const zx = 1440, zy = 470, kz = 40;
    box(zx - 30, zy - 205, 330, 410, C.gold, oq, 1.5, 'rgba(0,0,0,0.4)'); lbl('zoom near z = 1', zx + 135, zy - 215, C.gold, oq, 15);
    line(zx + 40, zy - 185, zx + 40, zy + 150, C.cyan, oq, 2); ring(zx + 40, zy, 7, C.white, oq, 2);
    CAY_090.ang.forEach((ad, i) => { const qq = clamp(oq * 1.5 - i / 14); dot(zx + 40, zy - ad * kz, 6, 'g', qq); dot(zx + 40, zy + ad * kz, 6, 'g', qq * 0.6); if (i < 3) lbl(ad.toFixed(2) + '°', zx + 58, zy - ad * kz + 5, C.gold, qq, 14, 'left'); });
    lbl('arg z = 2 arctan(1/2t)', zx + 60, zy + 172, C.dim, oq, 14, 'left');
    lbl('|z| = 1 to 10⁻¹² , all ten', zx + 60, zy + 194, C.dim, oq, 14, 'left');
    const sq = Q(S, 0, 'a symmetric function can have four zeros off the line', 0.6) * f1;
    chip(W / 2, 790, 1500, 50, 'F(s) = ((u − b)² + c²)((u + b)² + c²) , u = s − 1/2 :  F(s) = F(1 − s) , F > 0 on ℝ , zeros 1/2 ± b ± ic', C.red, sq, 18);
  }
  const q1 = Q(S, 1, 'Put z on the joint mode', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 265, 860, 62, '|Ψ_z⟩ ∝ |0⟩ + |1⟩ + √λ |2⟩ + |3⟩ + z |13⟩', C.cyan, q1, 24);
    const eq = Q(S, 1, 'the four-corner log odds becomes two log of the size of z', 0.6);
    chip(530, 355, 860, 58, 'η = log(p₀ p₁₃ / p₁ p₃) = 2 log|z| ,  Ω = α₀α₁₃/α₁α₃ = z', C.gold, eq, 21);
    lblG('Rκ − XY = (r − 1)/D² = (1 − 2 Re ρ) / (|ρ|² D²)', 530, 430, C.white, eq, 21);
    const kq = Q(S, 1, 'so the critical line kills the classical correlation', 0.6);
    chip(530, 505, 860, 58, 'Re ρ = 1/2  ⟺  η = 0  ⟺  κ = XY/R', C.green, kq, 24);
    const cq = Q(S, 1, 'yet entanglement stays', 0.6);
    lblG('middle bit 0 : C = 2|z − 1| / (3 + |z|²) = 1/√(1 + 4t²) > 0', 530, 585, C.mag, cq, 21);
    lbl('ρ is an input : off-line points encode just as legally , with η ≠ 0', 530, 640, C.dim, cq, 15);
    lbl('the encoding restates the question ; it does not locate the zeros', 530, 668, C.dim, cq, 15);
    const px = 1080, py = 740, pw = 660, ph = 420, L0 = -2.3, xS = x => px + x / 50 * pw, yS = v => py - (LG10(v) - L0) / (0 - L0) * ph;
    plotAxes(px, py, pw, ph, cq, 't', 'concurrence C (log scale)');
    curve(p => { const x = p * 50; return [xS(x), yS(1 / Math.sqrt(1 + 4 * x * x))]; }, 160, C.mag, cq, 3);
    CAY_090.gam.forEach((g, i) => dot(xS(g), yS(CONC_090[i]), 7, 'g', clamp(cq * 1.5 - i / 14)));
    lbl('C = ' + String(CONC_090[0]) + ' at t = 14.13', xS(14.13) + 10, yS(CONC_090[0]) - 18, C.gold, cq, 15, 'left');
    [1, 0.1, 0.01].forEach(v => lbl(String(v), px - 12, yS(v) + 5, C.dim, cq, 14, 'right'));
    [0, 10, 20, 30, 40].forEach(x => lbl(String(x), xS(x), py + 24, C.dim, cq, 14));
    lbl('gold : lowest ten zeta zeros', px + pw - 6, py - ph + 8, C.gold, cq, 15, 'right');
  }
};

/* ---- 06 FINITE SPECTRA (V19 §5, §10) ---- */
SCENES.spectrum = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Recursive gates stay finite', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Closed paths have Euler products too', 0.6) * f1;
    chip(530, 265, 860, 60, 'det(I − uT)⁻¹ = Π_[c] det(I − w_c u^ℓ(c) U_c)⁻¹', C.cyan, q, 22);
    lbl('primitive closed paths , traces of operator-weighted transfer T', 530, 322, C.dim, q, 15);
    const gq = Q(S, 0, 'On the Fibonacci graph', 0.6) * f1;
    const A = [330, 440], B = [620, 440];
    ring(A[0], A[1], 34, C.gold, gq, 2.5); ring(B[0], B[1], 34, C.gold, gq, 2.5); lbl('a', A[0], A[1] + 8, C.white, gq, 22); lbl('b', B[0], B[1] + 8, C.white, gq, 22);
    ctx.save(); ctx.globalAlpha = gq; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(A[0] - 52, A[1], 22, 0.6, TAU - 0.6); ctx.stroke(); ctx.restore();
    curve(p => [A[0] + 36 + p * (B[0] - A[0] - 72), A[1] - 26 - Math.sin(p * Math.PI) * 30], 30, C.cyan, gq, 2.5); arrow(B[0] - 46, A[1] - 30, B[0] - 36, A[1] - 24, C.cyan, gq, 2.5);
    curve(p => [B[0] - 36 - p * (B[0] - A[0] - 72), A[1] + 26 + Math.sin(p * Math.PI) * 30], 30, C.cyan, gq, 2.5); arrow(A[0] + 46, A[1] + 30, A[0] + 36, A[1] + 24, C.cyan, gq, 2.5);
    lbl('B = [[1, 1], [1, 0]]', 475, 525, C.white, gq, 19);
    lbl('primitive loops of length ℓ = 1 … 10', 475, 575, C.dim, gq, 15);
    FIB_090.prim.forEach((c, i) => { const qq = clamp(gq * 1.6 - i / 14), x = 230 + i * 50, h = c * 14; fillBox(x, 740 - h, 34, h, C.cyan, qq * 0.45); rect63(x, 740 - h, 34, h, C.cyan, qq, 1.4); lbl(String(c), x + 17, 740 - h - 8, C.white, qq, 14); lbl(String(i + 1), x + 17, 762, C.dim, qq, 13); });
    const pq = Q(S, 0, 'each primitive loop has poles on the unit circle', 0.6) * f1;
    const cx = 1380, cy = 490, R = 150;
    unitc090(cx, cy, R, gq, C.dim);
    for (let l = 1; l <= 8; l++) for (let j = 0; j < l; j++) { const an = TAU * j / l; dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 5, 'c', pq * 0.8); }
    lbl('poles of (1 − u^ℓ)⁻¹ : roots of unity', cx, cy - R - 40, C.cyan, pq, 16);
    const wq = Q(S, 0, 'has poles at one over phi and minus phi', 0.6) * f1;
    dot(cx + R * FIB_090.poles[0], cy, 11, 'g', wq); dot(cx + R * FIB_090.poles[1], cy, 11, 'g', wq);
    lbl('1/φ = 0.618', cx + R * FIB_090.poles[0], cy + 36, C.gold, wq, 16); lbl('−φ = −1.618', cx + R * FIB_090.poles[1], cy + 36, C.gold, wq, 16);
    chip(cx, 700, 640, 54, '1 / (1 − u − u²) : poles off the unit circle', C.gold, wq, 20);
    lbl('global singularities come from the whole infinite family , not from one factor', cx, 760, C.dim, wq, 14);
  }
  const q1 = Q(S, 1, 'Recursive gates stay finite', 0.6, 0.3);
  if (q1 > 0) {
    lblG('C_P(W) = (I − P)⊗I + P⊗W :  det(I − uC) = (1 − u)^(m(d−q)) D_W(u)^q', 530, 270, C.white, q1, 18);
    lblG('L_P(W) = (I − P)⊗W + P⊗W² :  det(I − uL) = D_W(u)^(d−q) D_(W²)(u)^q', 530, 310, C.white, q1, 18);
    const cq = Q(S, 1, 'the controlled lift keeps only one and omega', 0.6);
    chip(530, 385, 860, 56, 'controlled lift from ω :  spectrum {1 , ω} at every level', C.cyan, cq, 21);
    const lq = Q(S, 1, 'the squaring lift visits omega', 0.6);
    chip(530, 465, 860, 56, 'squaring lift :  ω^(2^k) ,  exponents 1 → 2 → 4 → 8 → 6 → 2 …', C.gold, lq, 21);
    lbl('levels 1 – 5 recomputed from the matrices : ' + SPECL_090.map(s => '{' + s.join(',') + '}').join(' '), 530, 515, C.dim, lq, 13);
    const fq = Q(S, 1, 'Five phases cannot hold infinitely many zeros', 0.6);
    lbl('ξ has infinitely many distinct zeros and ρ ↦ z_ρ is injective', 530, 590, C.white, fq, 17);
    stamp('FINITE SPECTRUM', 530, 670, fq, C.red, 36, -0.04);
    lbl('likewise r fixed edge lengths cannot give every prime a loop of length log p :', 530, 745, C.dim, fq, 14);
    lbl('log 2 , log 3 , log 5 , … are linearly independent over ℚ', 530, 768, C.dim, fq, 14);
    const cx = 1390, cy = 490, R = 200, pos = k => { const an = (3 * Math.PI / 5) * k; return [cx + R * Math.cos(an), cy - R * Math.sin(an)]; };
    unitc090(cx, cy, R, q1, C.dim);
    for (let j = 0; j < 10; j++) { const an = Math.PI * j / 5; ring(cx + R * Math.cos(an), cy - R * Math.sin(an), 7, C.dim, q1, 1.5); }
    for (let k = 0; k < 10; k++) { const p = pos(k); lbl('ω' + (k === 1 ? '' : ['⁰', '', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][k]), cx + (p[0] - cx) * 1.2, cy + (p[1] - cy) * 1.2 + 7, C.dim, q1, 16); }
    [0, 1].forEach(k => { const p = pos(k); dot(p[0], p[1], 14, 'c', cq); });
    const seq = [1, 2, 4, 8, 6, 2];
    seq.forEach((k, i) => { const qq = clamp(lq * 1.4 - i * 0.18), p = pos(k); if (i < 5) dot(p[0], p[1], 11, 'g', qq); if (i > 0) { const p0 = pos(seq[i - 1]); arrow(p0[0] + (p[0] - p0[0]) * 0.08, p0[1] + (p[1] - p0[1]) * 0.08, p0[0] + (p[0] - p0[0]) * 0.92, p0[1] + (p[1] - p0[1]) * 0.92, C.gold, qq * 0.8, 2); } });
    lbl('ω = e^(3πi/5) , tenth roots of unity', cx, cy + R + 66, C.dim, q1, 15);
  }
};

/* ---- 07 TWO SUFFICIENT CONDITIONS (V19 §11) ---- */
SCENES.suffice = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Neither premise is proved', 'open']]);
  const f1 = 1 - Q(S, 1, 'Or cancellation', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'If determinants of self-adjoint matrices', 0.6) * f1;
    chip(530, 265, 860, 60, 'F_N(s) = g_N(s) det((s − 1/2) I − i H_N) ,  H_N = H_N*', C.cyan, q, 22);
    lbl('g_N entire and nowhere zero : every zero of F_N lies on Re s = 1/2', 530, 322, C.dim, q, 15);
    const ox = 250, oy = 690;
    line(ox - 40, oy, ox + 280, oy, C.dim, q, 1.5); line(ox + 120, oy + 15, ox + 120, oy - 300, C.cyan, q, 2.2); lbl('Re s = 1/2', ox + 120, oy + 28, C.cyan, q, 14);
    for (let i = 0; i < 9; i++) dot(ox + 120, oy - 30 - i * 30 - 6 * Math.sin(i * 1.7 + t * 0.6), 6, 'c', q);
    lbl('zeros of F_N', ox + 140, oy - 300, C.cyan, q, 15, 'left');
    const hq = Q(S, 0, 'converge to xi uniformly on compact sets', 0.6) * f1;
    arrow(480, 540, 600, 540, C.white, hq, 2.5); lbl('locally uniformly', 540, 520, C.white, hq, 14);
    box(620, 470, 300, 140, C.gold, hq, 2, 'rgba(40,30,0,0.35)'); lblG('ξ(s) = ½ s(s−1) π^(−s/2) Γ(s/2) ζ(s)', 770, 530, C.white, hq, 14); lbl('⇒ RH (Hurwitz / Rouché)', 770, 575, C.gold, hq, 18);
    lbl('ξ(2) = ξ(−1) ≠ 0 excludes the zero limit', 770, 640, C.dim, hq, 14);
    const sq = Q(S, 0, 'small gate errors do not', 0.6) * f1;
    chip(1390, 265, 760, 58, 'U_N = e^(i/N) I_N :  ‖U_N − I‖ → 0 ,  det U_N = e^i', C.mag, sq, 21);
    const px = 1080, py = 740, pw = 640, ph = 360, xS = n => px + 10 + LG10(n) / LG10(64) * (pw - 20), yS = v => py - v / 1.2 * ph;
    plotAxes(px, py, pw, ph, sq, '', ''); lbl('N (log scale)', px + pw / 2, py + 50, C.dim, sq, 15);
    curve(p => { const n = Math.pow(64, p); return [xS(n), yS(2 * Math.sin(1 / (2 * n)))]; }, 80, C.gold, sq, 3);
    lbl('‖U_N − I‖ = |e^(i/N) − 1| → 0', xS(6), yS(0.36), C.gold, sq, 16, 'left');
    line(xS(1), yS(1), xS(64), yS(1), C.cyan, sq, 3); lbl('arg det U_N = 1 for every N', xS(8), yS(1) - 16, C.cyan, sq, 16);
    [1, 4, 16, 64].forEach(n => lbl(String(n), xS(n), py + 24, C.dim, sq, 14));
    lbl('dimension grows : count total trace and determinant error , not just gate error', px + pw / 2, py + 76, C.dim, sq, 14);
  }
  const q1 = Q(S, 1, 'Or cancellation', 0.6, 0.3);
  if (q1 > 0) {
    lblG('μ(n) = (−1)^k on square-free n ,  Σ_(d|n) μ(d) = 0 (n > 1) ,  1/ζ(s) = Σ μ(n) n^(−s)', 530, 270, C.white, q1, 17);
    const mq = Q(S, 1, 'is at most a constant times x to the one half plus epsilon', 0.6);
    chip(530, 345, 860, 62, '|M(x)| = |Σ_(n ≤ x) μ(n)| ≤ C_ε x^(1/2 + ε)  for every ε', C.gold, mq, 22);
    const fq = Q(S, 1, 'the hypothesis follows', 0.6);
    lbl('⇒ s ∫ M(x) x^(−s−1) dx = 1/ζ(s) extends to Re s > 1/2', 530, 420, C.white, fq, 17);
    lbl('⇒ no zeros there ; the functional equation reflects the left side', 530, 455, C.white, fq, 17);
    stamp('⇒ RH', 530, 540, fq, C.green, 40, -0.04);
    const nq = Q(S, 1, 'Neither premise is proved', 0.6);
    lbl('both theorems are conditional : construction and limit , or the cancellation estimate', 530, 625, C.vio, nq, 15);
    lbl('finite gate cancellation or random-walk pictures do not supply the premise', 530, 652, C.vio, nq, 15);
    const pq = Q(S, 1, 'below a hundred thousand the sum stays within root x', 0.6);
    const pq0 = Q(S, 1, 'Or cancellation', 0.8, 0.5);
    const px = 1080, py = 540, pw = 660, ph = 230, xS = x => px + x / 1e5 * pw, yS = v => py - v / 330 * ph;
    plotAxes(px, py + ph, pw, 2 * ph, pq0, 'x ≤ 10⁵', 'M(x)');
    line(px, py, px + pw, py, C.dim, pq0 * 0.6, 1);
    MERT_090.band.forEach((b, i) => { const qq = clamp(pq0 * 1.5 - i / 500), x = xS(b[0]); line(x, yS(b[1]), x, yS(b[2]) + 0.5, C.cyan, qq, 1.4); });
    curve(p => { const x = p * 1e5; return [xS(x), yS(Math.sqrt(x))]; }, 120, C.gold, pq, 2.5);
    curve(p => { const x = p * 1e5; return [xS(x), yS(-Math.sqrt(x))]; }, 120, C.gold, pq, 2.5);
    lbl('±√x', xS(9e4), yS(316) - 12, C.gold, pq, 16);
    lbl('max |M(x)|/√x = ' + MERT_090.rmax.toFixed(3) + ' (x = 5) ;  finite data , not the premise', px + pw / 2, py + ph + 56, C.dim, pq, 14);
  }
};

/* ---- 08 PHASE-FIXED BLOCKS (V20 §2–§3) ---- */
SCENES.blocks = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The trace of D is phi to the minus two', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'two addresses of one qubit code', 0.6) * f1;
    const bits = ['1', '0', 'q', '0', '1', '0'];
    bits.forEach((b, i) => cell090(190 + i * 110, 380, 90, 70, b, b === 'q' ? C.white : C.dim, q, 30, b === 'q' ? 0.35 : 0.15));
    lbl('J|q⟩ = |1 0 q 0 1 0⟩', 530, 262, C.white, q, 20);
    const aq = Q(S, 0, 'A and B', 0.6) * f1;
    line(190, 365, 190, 355, C.gold, aq, 3); line(190, 355, 500, 355, C.gold, aq, 3); line(500, 355, 500, 365, C.gold, aq, 3);
    lbl('A : window (1, 0, q) → P = |1⟩⟨1|', 345, 335, C.gold, aq, 17);
    line(300, 465, 300, 475, C.cyan, aq, 3); line(300, 475, 610, 475, C.cyan, aq, 3); line(610, 475, 610, 465, C.cyan, aq, 3);
    lbl('B : window (0, q, 0) → Q', 455, 505, C.cyan, aq, 17);
    lblG('Q = [[φ⁻¹ , φ^(−3/2)] , [φ^(−3/2) , φ⁻²]] ,  Tr PQ = φ⁻²', 530, 570, C.white, aq, 19);
    const oq = Q(S, 0, 'each of order ten', 0.6) * f1;
    chip(530, 640, 860, 58, 'A = ω[I + (ω − 1)P] , B = ω[I + (ω − 1)Q] ,  A¹⁰ = B¹⁰ = I ,  det = ω³', C.gold, oq, 19);
    lbl('ω = e^(3πi/5) ; the same native gate at two places , not two free rotations', 530, 700, C.dim, oq, 15);
    const dq = Q(S, 0, 'The blocks D, A inverse B, and E, B A inverse', 0.6) * f1;
    box(1050, 280, 330, 150, C.mag, dq, 2, 'rgba(40,0,40,0.35)'); lbl('D = A⁻¹B = A⁹B', 1215, 340, C.white, dq, 26); lbl('10 native calls', 1215, 390, C.mag, dq, 17);
    box(1420, 280, 330, 150, C.cyan, dq, 2, 'rgba(0,30,40,0.35)'); lbl('E = BA⁻¹ = BA⁹', 1585, 340, C.white, dq, 26); lbl('10 native calls', 1585, 390, C.cyan, dq, 17);
    const tq = Q(S, 0, 'have determinant one', 0.6) * f1;
    chip(1400, 490, 700, 60, 'det D = det E = 1', C.green, tq, 26);
    ['D', 'E', 'D⁻¹ = B⁹A', 'E⁻¹ = AB⁹'].forEach((s, i) => cell090(1060 + i * 175, 570, 160, 60, s, C.gold, tq, 19, 0.2));
    lbl('alphabet Σ = {D , E , D⁻¹ , E⁻¹} ,  native cost C(w) = 10 |w|', 1400, 680, C.dim, tq, 15);
    stamp('PHASE FIXED', 1400, 760, tq, C.green, 34, -0.04);
  }
  const q1 = Q(S, 1, 'The trace of D is phi to the minus two', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 265, 860, 60, 'Tr D = φ⁻² = 0.382 ,  Galois conjugate φ² = 2.618 > 2', C.mag, q1, 22);
    const iq = Q(S, 1, 'so D has infinite order', 0.6);
    lbl('finite order would force every conjugate of the trace into [−2 , 2]', 530, 322, C.dim, iq, 15);
    const dq = Q(S, 1, 'with E it is dense in SU two', 0.6);
    chip(530, 395, 860, 58, 'DE ≠ ED  ⇒  closure ⟨D , E⟩ = SU(2)', C.green, dq, 24);
    const pq = Q(S, 1, 'And the phase is fixed', 0.6);
    const cx = 330, cy = 600, R = 120;
    unitc090(cx, cy, R, pq, C.dim);
    for (let k = 0; k < 10; k++) { const an = TAU * k / 10; dot(cx + R * Math.cos(an), cy - R * Math.sin(an), 7, 'c', pq); }
    const aT = Math.PI / 4; line(cx, cy, cx + R * Math.cos(aT), cy - R * Math.sin(aT), C.gold, pq, 3); dot(cx + R * Math.cos(aT), cy - R * Math.sin(aT), 9, 'g', pq);
    lbl('det T = e^(iπ/4)', cx + R + 14, cy - R * 0.85, C.gold, pq, 15, 'left'); lbl('μ₁₀ : det of the closure', cx, cy + R + 32, C.cyan, pq, 15);
    const tq = Q(S, 1, 'T stays two sine pi over eighty from the native closure', 0.6);
    lbl('δ(T) = π/20  (9° to the nearest tenth root)', 690, 560, C.white, tq, 17);
    chip(690, 620, 470, 56, 'dist(T , G₁₀) = 2 sin(δ/4)', C.gold, tq, 22);
    lbl('= 2 sin(π/80) = ' + K_090.tdist.toFixed(4) + '  (numerical minimum agrees)', 690, 680, C.white, tq, 16);
    lbl('projectively T is reachable ; with its phase it is not', 690, 715, C.dim, tq, 15);
    const cq = Q(S, 1, 'with E it is dense in SU two', 0.8, 0.3);
    const px = 1080, py = 740, pw = 660, ph = 420, xS = L => px + 20 + (L - 1) / 9 * (pw - 40), yS = v => py - v / 1.6 * ph;
    plotAxes(px, py, pw, ph, cq, '', 'distance to the best word ≤ L'); lbl('word length L (letters of Σ)', px + pw / 2, py + 50, C.dim, cq, 15);
    poly090(COVER_090.map(r => [r[0], r[2]]), xS, yS, C.gold, cq, 3, clamp(cq * 1.4)); poly090(COVER_090.map(r => [r[0], r[3]]), xS, yS, C.cyan, cq, 3, clamp(cq * 1.4));
    COVER_090.forEach(r => { dot(xS(r[0]), yS(r[2]), 6, 'g', cq); dot(xS(r[0]), yS(r[3]), 6, 'c', cq); lbl(String(r[0]), xS(r[0]), py + 24, C.dim, cq, 14); });
    lbl('max over 3000 Haar targets', xS(3.2), yS(0.95), C.gold, cq, 15, 'left'); lbl('mean', xS(2.2), yS(0.32), C.cyan, cq, 15, 'left');
    lbl('L = 10 : ' + COVER_090[9][1] + ' words , max ' + COVER_090[9][2] + ' (sampled)', px + pw - 6, py - ph + 8, C.dim, cq, 15, 'right');
    [0.5, 1, 1.5].forEach(v => lbl(String(v), px - 12, yS(v) + 5, C.dim, cq, 14, 'right'));
  }
};

/* ---- 09 GOLDEN SELECTOR GATE (V20 §4) ---- */
SCENES.selector = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'It entangles', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now one fixed two-qubit gate', 0.6) * f1;
    line(160, 360, 860, 360, C.white, q * 0.7, 2); line(160, 470, 860, 470, C.white, q * 0.7, 2);
    lbl('select', 150, 366, C.gold, q, 18, 'right'); lbl('data', 150, 476, C.cyan, q, 18, 'right');
    box(430, 320, 160, 190, C.gold, q, 2.5, 'rgba(40,30,0,0.6)'); lbl('G', 510, 430, C.gold, q, 44);
    const sq = Q(S, 0, 'a select bit in zero applies A', 0.6) * f1;
    lbl('|0⟩ : A', 700, 345, C.green, sq, 20, 'left'); lbl('|1⟩ : B', 700, 395, C.mag, Q(S, 0, 'in one applies B', 0.6) * f1, 20, 'left');
    chip(530, 590, 860, 60, 'G = |0⟩⟨0| ⊗ A + |1⟩⟨1| ⊗ B = ω[I + (ω − 1)Π] ,  G¹⁰ = I', C.gold, sq, 20);
    lbl('G = (I ⊗ A)(|0⟩⟨0| ⊗ I + |1⟩⟨1| ⊗ D) : a controlled D with Tr D = φ⁻²', 530, 650, C.dim, sq, 15);
    const hq = Q(S, 0, 'With computational-basis helper bits', 0.6) * f1;
    const wy = [300, 380, 460, 540, 620], wx0 = 1060, wx1 = 1760;
    ['|0⟩ helper', 'q₁', 'q₂', 'q₃', '|1⟩ helper'].forEach((s, i) => { line(wx0 + 80, wy[i], wx1, wy[i], i === 0 || i === 4 ? C.dim : C.white, hq * 0.7, 2); lbl(s, wx0 + 70, wy[i] + 6, i === 0 || i === 4 ? C.dim : C.cyan, hq, 16, 'right'); });
    const calls = [[0, 1, 1200], [4, 2, 1300], [1, 2, 1400], [2, 3, 1500], [3, 1, 1600], [0, 3, 1690]];
    const cq = Q(S, 0, 'calls on any ordered pair', 0.6) * f1;
    calls.forEach(([s_, d_, x], i) => { const qq = clamp(cq * 1.6 - i / 8); line(x, wy[s_], x, wy[d_], C.gold, qq, 2.5); dot(x, wy[s_], 9, 'g', qq); cell090(x - 22, wy[d_] - 22, 44, 44, 'G', C.gold, qq, 18, 0.5); });
    const dq = Q(S, 0, 'its circuits are dense', 0.6) * f1;
    chip(1410, 700, 700, 56, 'finite G circuits are dense in PU(2ⁿ) for every n', C.green, dq, 21);
    lbl('recomputed : local su(2) plus G on both orders spans su(4) , dimension 15', 1410, 760, C.dim, dq, 15);
  }
  const q1 = Q(S, 1, 'It entangles', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 265, 860, 60, 'G |+⟩|1⟩ = ( |0⟩ A|1⟩ + |1⟩ B|1⟩ ) / √2', C.cyan, q1, 23);
    const cq = Q(S, 1, 'concurrence phi to the minus one half', 0.6);
    lblG('C = √(1 − |⟨1|A†B|1⟩|²) ,  |⟨1|A†B|1⟩|² = φ⁻²', 530, 335, C.white, cq, 20);
    const by = 640, bw = 520;
    rect63(270, by - 40, bw, 50, C.dim, cq, 1.5); fillBox(270, by - 40, bw * K_090.concG, 50, C.mag, cq * 0.55);
    lbl('C = φ^(−1/2) = ' + K_090.concG.toFixed(4), 530, by - 70, C.mag, cq, 24);
    lbl('0', 270, by + 34, C.dim, cq, 14); lbl('1', 270 + bw, by + 34, C.dim, cq, 14);
    lbl('product inputs , one-qubit gates and wire swaps alone never entangle : two is the minimal arity', 530, 720, C.dim, cq, 14);
    const aq = Q(S, 1, 'It also sits exactly inside one five-mode atom', 0.6);
    const hx = 1060, hy = 270;
    ['select', 'data', 'word', 'mode'].forEach((h, j) => lbl(h, hx + 80 + j * 170, hy, C.dim, aq, 16));
    [['0', '0', '100', '1'], ['0', '1', '101', '13'], ['1', '0', '000', '0'], ['1', '1', '010', '2']].forEach((r, i) => r.forEach((s, j) => cell090(hx + 10 + j * 170, hy + 20 + i * 62, 140, 52, s, j < 2 ? C.cyan : C.gold, clamp(aq * 1.5 - i / 6), 21, 0.2)));
    lblG('K J₂ = J₂ G ;  mode 001 : eigenvalue ω', 1400, 560, C.white, aq, 20);
    const wq = Q(S, 1, 'cannot be split across physical wires', 0.6);
    stamp('NO WIRE SPLIT', 1400, 650, wq, C.red, 36, -0.04);
    lbl('all six bipartitions of the three sites fail (checked) : data 1 is 01 or 10', 1400, 725, C.dim, wq, 14);
    lbl('global wiring of many atoms is a separate claim , still to prove', 1400, 752, C.dim, wq, 14);
  }
};

/* ---- 10 RECURSIVE COMPILER (V20 §5) ---- */
SCENES.compile = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So each level obeys', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Any residual Delta in SU two', 0.6) * f1;
    chip(530, 265, 860, 60, 'Δ = U U_(n−1)† ,  d = ‖Δ − I‖', C.white, q, 24);
    const cq = Q(S, 0, 'is exactly a commutator of two factors', 0.6) * f1;
    const P4 = [[330, 380], [700, 380], [700, 620], [330, 620]];
    const labs = ['V', 'W', 'V†', 'W†'], cols = [C.gold, C.cyan, C.gold, C.cyan];
    P4.forEach((p, i) => { const r = P4[(i + 1) % 4], qq = clamp(cq * 1.6 - i * 0.2); arrow(p[0] + (r[0] - p[0]) * 0.12, p[1] + (r[1] - p[1]) * 0.12, p[0] + (r[0] - p[0]) * 0.88, p[1] + (r[1] - p[1]) * 0.88, cols[i], qq, 3); lbl(labs[i], (p[0] + r[0]) / 2 + (i === 1 ? 30 : i === 3 ? -30 : 0), (p[1] + r[1]) / 2 + (i === 0 ? -14 : i === 2 ? 34 : 8), cols[i], qq, 24); dot(p[0], p[1], 8, 'w', cq); });
    lbl('[V , W] = V W V† W† = Δ', 515, 508, C.white, cq, 22);
    const rq = Q(S, 0, 'within root d of the identity', 0.6) * f1;
    lbl('‖V − I‖ , ‖W − I‖ ≤ √d ;  sin²α = d/2 , V₀ = e^(iαX) , W₀ = e^(iαY)', 530, 680, C.white, rq, 16);
    const eq = Q(S, 0, 'their exact inverses cancel the leading error', 0.6) * f1;
    chip(530, 745, 860, 56, '‖[V , W] − [Ṽ , W̃]‖ ≤ 4rε + 2ε²', C.green, eq, 23);
    const fq = Q(S, 0, 'compile both with the same alphabet', 0.6) * f1;
    lbl('one level of the compiler', 1400, 275, C.dim, fq, 17);
    const fac = [['V_(n−1)', C.gold], ['W_(n−1)', C.cyan], ['V_(n−1)†', C.gold], ['W_(n−1)†', C.cyan], ['U_(n−1)', C.white]];
    fac.forEach(([s, col], i) => cell090(1045 + i * 145, 320, 130, 76, s, col, clamp(fq * 1.6 - i * 0.12), 19, 0.25));
    lbl('U_n  =', 1020, 368, C.white, fq, 22, 'right');
    lbl('same Σ , same compiler , exact inverses ( D⁻¹ , E⁻¹ in Σ )', 1400, 450, C.dim, fq, 15);
    lbl('the source of the recursion : Solovay–Kitaev (Dawson–Nielsen , arXiv:quant-ph/0505030)', 1400, 480, C.cyan, fq, 14);
    lbl('this volume : explicit constants for the golden alphabet', 1400, 505, C.dim, fq, 14);
    lbl('real gate drift adds Σ_j δ_j to any word (Prop 5.4)', 1400, 560, C.dim, eq, 15);
  }
  const q1 = Q(S, 1, 'So each level obeys', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 265, 860, 62, 'ε_(n+1) ≤ 4ε_n^(3/2) + 2ε_n² ≤ 6 ε_n^(3/2)', C.gold, q1, 24);
    const nq = Q(S, 1, 'from a net below one thirty-sixth', 0.6);
    chip(530, 355, 860, 60, 'ε₀ < 1/36  ⇒  ε_n ≤ (36ε₀)^((3/2)ⁿ) / 36', C.green, nq, 24);
    const gq = Q(S, 1, 'while words grow five-fold per level', 0.6);
    lbl('L_n ≤ 5ⁿ L₀ ,  native calls C ≤ 10 L₀ 5ⁿ', 530, 440, C.white, gq, 20);
    lbl('C(ε) = O(log^c(1/ε)) ,  c = log 5 / log(3/2) = ' + K_090.c.toFixed(2), 530, 480, C.white, gq, 20);
    lbl('an explicit, provable exponent ; not claimed shortest or optimal', 530, 520, C.dim, gq, 15);
    const rq = Q(S, 1, 'the error falls doubly exponentially', 0.6);
    lbl('actual run (illustration) : net = all words ≤ 10 letters ,', 530, 600, C.mag, rq, 15);
    lbl('60 random targets ; sampled covering radius 0.078 > 1/36 : premise not met', 530, 625, C.mag, rq, 15);
    SKRUN_090.forEach((r, i) => cell090(170 + i * 185, 655, 170, 70, 'n=' + r[0] + ' : ' + (r[1] < 0.001 ? r[1].toExponential(1) : r[1].toFixed(4)), C.mag, clamp(rq * 1.6 - i * 0.15), 16, 0.2));
    lbl('max error per level , words up to ' + SKRUN_090[3][3] + ' letters at n = 3', 530, 755, C.dim, rq, 14);
    const pq = Q(S, 1, 'So each level obeys', 0.8, 0.4);
    const px = 1080, py = 740, pw = 660, ph = 420, L0 = -7, L1 = -1, xS = n => px + 20 + n / 6 * (pw - 40), yS = v => py - (LG10(v) - L0) / (L1 - L0) * ph;
    plotAxes(px, py, pw, ph, pq, '', 'error bound (log scale)');
    [['0.02', C.cyan], ['0.01', C.gold]].forEach(([k, col], j) => { const pts = SKB_090[k].map((v, n) => [n, Math.max(v, 1e-7)]); poly090(pts, xS, yS, col, clamp(pq * 1.4 - j * 0.3), 3); pts.forEach(p => dot(xS(p[0]), yS(p[1]), 6, j ? 'g' : 'c', clamp(pq * 1.4 - j * 0.3))); lbl('ε₀ = ' + k, xS(6) - 4, yS(pts[6][1]) + (j ? 22 : -14), col, clamp(pq * 1.4 - j * 0.3), 15, 'right'); });
    SKRUN_090.forEach(r => dot(xS(r[0]), yS(r[1]), 8, 'm', rq));
    lbl('magenta : actual run , max over 60 targets', px + pw - 6, py - ph + 8, C.mag, rq, 15, 'right');
    [-7, -5, -3, -1].forEach(e => lbl('10' + ['⁻⁷', '⁻⁶', '⁻⁵', '⁻⁴', '⁻³', '⁻²', '⁻¹'][e + 7], px - 12, yS(Math.pow(10, e)) + 5, C.dim, pq, 14, 'right'));
    [0, 2, 4, 6].forEach(n => lbl(String(n), xS(n), py + 24, C.dim, pq, 14)); lbl('level n', px + pw / 2, py + 50, C.dim, pq, 15);
    line(px, yS(1 / 36), px + pw, yS(1 / 36), C.green, nq * 0.6, 1.2); lbl('1/36', px + pw - 6, yS(1 / 36) - 8, C.green, nq, 14, 'right');
  }
};

/* ---- 11 ACTION AND BELLMAN (V20 §6–§8) ---- */
SCENES.variation = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Add a positive cost per call', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'over all intermediate matrices', 0.6) * f1;
    const nodes = ['X₀ = I', 'X₁', 'X₂', '…', 'X_L', 'V'];
    nodes.forEach((s, i) => { const x = 200 + i * 135; cell090(x - 50, 300, 100, 56, s, i === 5 ? C.gold : C.cyan, q, 18, 0.2); if (i < 5) { arrow(x + 52, 328, x + 83, 328, i === 4 ? C.gold : C.white, q, 2); lbl(i === 4 ? 'I' : i === 3 ? '' : 'G' + ['₁', '₂', '₃'][i], x + 67, 292, i === 4 ? C.gold : C.dim, q, 15); } });
    lbl('X_j free complex matrices ; the extra edge X_L → V is the identity', 530, 400, C.dim, q, 15);
    chip(530, 465, 860, 60, 'S_w(X) = Σ_j ‖X_j − G_j X_(j−1)‖_F² + ‖V − X_L‖_F²', C.cyan, q, 21);
    const mq = Q(S, 0, 'is its boundary error squared over L plus one', 0.6) * f1;
    chip(530, 560, 860, 66, 'min_X S_w = ‖V − U_w‖_F² / (L + 1)', C.gold, mq, 28);
    lbl('equal increments Y_j = I + j (U_w†V − I)/(L + 1) attain it (Cauchy–Schwarz)', 530, 625, C.dim, mq, 15);
    const pq = Q(S, 0, 'Padding with K to the tenth', 0.6) * f1;
    const px = 1080, py = 740, pw = 660, ph = 400, xS = m => px + 40 + m / 6 * (pw - 80), yS = v => py - v / 0.8 * ph;
    plotAxes(px, py, pw, ph, pq, '', 'min S (least squares)'); lbl('copies of K¹⁰ = I inserted', px + pw / 2, py + 50, C.dim, pq, 15);
    PAD_090.forEach((r, i) => { const qq = clamp(pq * 1.6 - i / 9), h = r[2] / 0.8 * ph; fillBox(xS(r[0]) - 22, py - h, 44, h, C.gold, qq * 0.45); rect63(xS(r[0]) - 22, py - h, 44, h, C.gold, qq, 1.5); lbl(String(r[0]), xS(r[0]), py + 24, C.dim, qq, 14); lbl('L=' + r[1], xS(r[0]), py - h - 10, C.dim, qq, 13); });
    lbl('word A B A A B , target T ; the gate never changes', px + pw - 6, py - ph + 30, C.dim, pq, 15, 'right');
    const nq = Q(S, 0, 'so that factor is required', 0.6) * f1;
    chip(1410, 240, 700, 54, '(L + 1) · min S = ' + PAD_090[0][3].toFixed(3) + ' for every padding', C.green, nq, 20);
    stamp('RAW ACTION → 0', 1580, 540, nq, C.red, 26, -0.04);
  }
  const q1 = Q(S, 1, 'Add a positive cost per call', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 265, 860, 60, 'F_η(R) = min{ b(R) , min_g [ η c_g + F_η(g†R) ] }', C.cyan, q1, 22);
    lbl('b(R) = ‖R − I‖_F² / d ∈ [0 , 4] ,  c_g > 0 ,  for Σ every c_g = 10', 530, 322, C.dim, q1, 15);
    const uq = Q(S, 1, 'the Bellman equation has one solution', 0.6);
    chip(530, 395, 860, 58, 'unique solution with values in [0 , 4]', C.green, uq, 23);
    const cq = Q(S, 1, 'optimal words cost at most four over eta', 0.6);
    chip(530, 470, 860, 58, 'optimum attained by a finite word ,  C(w) ≤ 4/η', C.gold, cq, 23);
    const zq = Q(S, 1, 'Without cost, even the identity alone solves it with zero', 0.6);
    lbl('η = 0 :  F ≡ 0 solves F = min{b , min_g F(g†R)} for any menu , even {I}', 530, 548, C.white, zq, 16);
    stamp('SPURIOUS ZERO', 530, 620, zq, C.red, 32, -0.04);
    const gq = Q(S, 1, 'As eta shrinks, optimal cost grows without bound', 0.6);
    lbl('optimal C_η → ∞ ,  e_η → 0 ,  η C_η → 0 ;  C_η ≤ C₀ log^c(1/η)', 530, 700, C.white, gq, 16);
    lbl('for iX : C_η ≥ (log(1/η) − c log log(1/η) − O(1)) / log Γ ,  Γ = φ³ + √(φ⁶ − 1) = ' + GAM_090.toFixed(3) + ' < 9', 530, 735, C.dim, gq, 13);
    const pq = Q(S, 1, 'Add a positive cost per call', 0.8, 0.4);
    const px = 1080, py = 740, pw = 660, ph = 420, la = Math.log(0.05), lb = Math.log(1.2), xS = e => px + 10 + (Math.log(e) - la) / (lb - la) * (pw - 20);
    const cmax = Math.max(...PATH_090.map(r => r[2]), 10), yC = v => py - v / (cmax * 1.1) * ph, yF = v => py - v / 4.2 * ph;
    plotAxes(px, py, pw, ph, pq, '', 'gold : optimal native cost C_η'); lblG('η (log scale)', px + pw / 2, py + 50, C.dim, pq, 16);
    let prev = null;
    PATH_090.forEach(r => { const x = xS(r[0]), y = yC(r[2]); if (prev) { line(prev[0], prev[1], x, prev[1], C.gold, pq, 3); line(x, prev[1], x, y, C.gold, pq, 3); } prev = [x, y]; });
    poly090(PATH_090.map(r => [r[0], r[3]]), xS, yF, C.cyan, pq, 2.5);
    poly090(PATH_090.map(r => [r[0], r[1]]), xS, yF, C.white, pq * 0.8, 2);
    lbl('cyan : error e_η²  ·  white : value F_η (concave)', px + pw - 6, py - ph + 30, C.dim, pq, 14, 'right');
    lbl('exact by enumeration of all words ≤ 8 letters , one target R ∈ SU(2)', px + pw / 2, py + 76, C.dim, pq, 14);
    [0.05, 0.1, 0.2, 0.5, 1].forEach(e => lbl(String(e), xS(e), py + 24, C.dim, pq, 14));
    [0, 20, 40, 60, 80].filter(v => v <= cmax * 1.1).forEach(v => lbl(String(v), px - 12, yC(v) + 5, C.gold, pq, 14, 'right'));
  }
};

/* ---- 12 PROGRAMS AND RECORDS (V20 §9–§12) ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [0, 'no finite processor stores every gate exactly', 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'If the target is uncertain', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'NAND read from an epsilon-close word', 0.6) * f1;
    lbl('V_f |a , b , t⟩ = |a , b , t ⊕ (1 ⊕ ab)⟩', 530, 262, C.white, q, 20);
    [['a', 'b', 'NAND'], ['0', '0', '1'], ['0', '1', '1'], ['1', '0', '1'], ['1', '1', '0']].forEach((r, i) => r.forEach((s, j) => cell090(220 + j * 76, 290 + i * 46, 68, 40, s, i === 0 ? C.dim : j === 2 ? C.gold : C.cyan, q, 17, i === 0 ? 0.1 : 0.22)));
    const eq = Q(S, 0, 'errs with probability at most epsilon squared', 0.6) * f1;
    box(500, 300, 430, 160, C.gold, eq, 2, 'rgba(40,30,0,0.35)');
    lbl('‖WJ − e^(iγ) J V_f‖ ≤ ε', 715, 350, C.white, eq, 20); lbl('⇒ Pr(wrong NAND) ≤ ε²', 715, 405, C.gold, eq, 22);
    lbl('approximate only : native words give no exact clean NAND', 715, 490, C.dim, eq, 13);
    const dq = Q(S, 0, 'Discard the program register', 0.6) * f1;
    chip(530, 550, 860, 58, 'SELECT = Σ_w |w⟩⟨w| ⊗ U_w ;  drop |w⟩ :  ρ ↦ Σ_w |c_w|² U_w ρ U_w†', C.cyan, dq, 19);
    const uq = Q(S, 0, 'the channel is unitary only if all weighted programs agree up to phase', 0.6) * f1;
    lbl('unitary channel ⟺ Choi matrix of rank one ⟺ all U_w equal up to phase', 530, 610, C.white, uq, 16);
    const nq = Q(S, 0, 'no finite processor stores every gate exactly', 0.6) * f1;
    chip(530, 690, 860, 58, 'U(|p_U⟩ ⊗ ψ) = |q_U⟩ ⊗ Uψ  ⇒  ⟨p_U , p_V⟩ = 0', C.mag, nq, 21);
    lbl('no-programming theorem : Nielsen–Chuang , arXiv:quant-ph/9703032', 530, 745, C.cyan, nq, 14);
    const cx = 1150, by = 640;
    lbl('Choi rank of the discarded-program channel', 1410, 300, C.dim, uq, 16);
    [['A , iA', 1, C.green, 'unitary'], ['A , B', 2, C.red, 'not unitary']].forEach(([s, r, col, lab], i) => { const x = cx + i * 300, h = r * 120; fillBox(x, by - h, 140, h, col, uq * 0.45); rect63(x, by - h, 140, h, col, uq, 2); lbl('rank ' + r, x + 70, by - h - 14, col, uq, 20); lbl(s, x + 70, by + 30, C.white, uq, 18); lbl(lab, x + 70, by + 58, col, uq, 15); });
    line(cx - 30, by, cx + 470, by, C.dim, uq, 1.5);
    lbl('weights 0.3 / 0.7 (recomputed)', 1410, 740, C.dim, uq, 14);
  }
  const q1 = Q(S, 1, 'If the target is uncertain', 0.6, 0.3);
  if (q1 > 0) {
    chip(530, 265, 860, 60, 'M_π = Σ_j π_j |v_j⟩⟨v_j| ,  v_j = (I ⊗ V_j) Φ_d', C.cyan, q1, 22);
    const rq = Q(S, 1, 'the best risk is at least one minus the top eigenvalue', 0.6);
    chip(530, 350, 860, 60, 'R(π) = 1 − max_U ⟨u|M_π|u⟩ ≥ 1 − λ_max(M_π)', C.gold, rq, 23);
    lbl('loss ℓ(U , V) = 1 − |Tr V†U|² / d²', 530, 408, C.dim, rq, 15);
    const hq = Q(S, 1, 'one half for I or i X at equal odds', 0.6);
    cell090(170, 450, 200, 70, 'I : ½', C.cyan, hq, 24, 0.25); cell090(390, 450, 200, 70, 'iX : ½', C.mag, hq, 24, 0.25);
    lbl('Choi vectors orthogonal , λ_max = ½', 790, 480, C.white, hq, 16); lbl('predict I : risk ½', 790, 510, C.white, hq, 16);
    const gq = Q(S, 1, 'however rich the gates', 0.6);
    stamp('RISK 1/2', 470, 600, gq, C.red, 32, -0.04);
    lbl('compilation error can vanish ; an unidentified target relation cannot', 530, 665, C.dim, gq, 15);
    lbl('records lower the average risk : 0.383 ≤ 0.475 in a sampled case', 530, 692, C.dim, gq, 15);
    const bq = Q(S, 1, 'Budgets need at most two words', 0.6);
    const px = 1080, py = 740, pw = 660, ph = 420, cand = FRONT_090.cand, ymax = Math.max(...cand.map(c => c[1])) * 1.1, xS = c => px + 20 + c / 80 * (pw - 40), yS = v => py - v / ymax * ph;
    plotAxes(px, py, pw, ph, bq, '', 'loss of the best word of that length'); lbl('native cost C(w)', px + pw / 2, py + 46, C.dim, bq, 15);
    cand.forEach((c, i) => { dot(xS(c[0]), yS(c[1]), 8, 'c', clamp(bq * 1.6 - i / 12)); lbl(String(c[0]), xS(c[0]), py + 24, C.dim, bq, 13); });
    poly090(FRONT_090.hull, xS, yS, C.gold, bq, 3);
    dashed(xS(FRONT_090.B), py, xS(FRONT_090.B), py - ph, C.green, bq, 2); lbl('budget B = ' + FRONT_090.B, xS(FRONT_090.B) + 8, py - ph + 20, C.green, bq, 15, 'left');
    FRONT_090.supp.forEach(s => { const c = cand.find(cc => cc[0] === s[0]); dot(xS(c[0]), yS(c[1]), 13, 'g', bq); lbl('p = ' + s[1].toFixed(2), xS(c[0]) + 14, yS(c[1]) - 12, C.gold, bq, 15, 'left'); });
    lbl('LP optimum mixes two words , loss ' + FRONT_090.val.toFixed(4), px + pw / 2, py + 72, C.gold, bq, 15);
    lbl('average-loss optimum , with the choice record kept', px + pw / 2, py + 94, C.dim, bq, 14);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, "Euler's product, Robin's criterion", 'published'], [1, 'the rest is argued in the theory volumes', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['CHARGE', 'log(7/10)', C.gold, 'A hidden charge'], ['ROBIN', 'σ(n)/n = ∫|A|²', C.cyan, 'squares for Robin'], ['HALF', 'ζ(2a) , a > ½', C.gold, 'a threshold at one half'], ['POINTER', 'ζ(2a + it)', C.mag, 'a doubling pointer'], ['CAYLEY', '|z_ρ| = 1', C.cyan, 'a Cayley circle'], ['FINITE', 'ω^(2^k)', C.red, 'repeating phases'],
      ['SUFFICE', 'Hurwitz · Möbius', C.vio, 'two sufficient conditions'], ['BLOCKS', 'Tr D = φ⁻²', C.mag, 'two golden blocks'], ['SELECTOR', 'C = φ^(−1/2)', C.gold, 'a selector gate'], ['COMPILER', '6 ε^(3/2)', C.green, 'a recursive compiler'], ['ACTION', '‖V − U‖² / (L+1)', C.cyan, 'a normalized action'], ['RECORDS', 'risk ½', C.orange, 'and limits on learning']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 220 + (i % 6) * 296, y = 225 + Math.floor(i / 6) * 135, q = Q(S, 0, ph) * fade; box(x - 130, y, 260, 112, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 42, col, q, 19); lblG(a2, x, y + 86, C.white, q, 19); });
    lbl('PUBLISHED · Robin\'s criterion (Robin 1984 ; Choie–Lichiardopol–Moree–Solé , arXiv:math/0604314) · Solovay–Kitaev (Dawson–Nielsen , arXiv:quant-ph/0505030) · no-programming (Nielsen–Chuang)', W / 2, 545, C.cyan, Q(S, 1, "Euler's product, Robin's criterion") * fade, 13);
    lbl('CLASSICAL · Euler product · Möbius inversion · Hurwitz and Rouché · Riemann–von Mangoldt count · Parseval · Bellman', W / 2, 585, '#8fbcff', Q(S, 1, 'are published or classical inputs') * fade, 14);
    lbl('VOLUMES · hidden charge · Gibbs law · square response · ½ threshold · doubling · Cayley encoding · finite spectra · two conditions · D , E density · selector G · 6ε^(3/2) · L+1 action · Bellman · Choi risk', W / 2, 625, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 13);
    lbl('RECOMPUTED · 259 checks : Robin to 10⁶ · ζ(2+it) floor · ten zeros on the Cayley circle · Mertens to 10⁵ · covering radius · SK run · least-squares action · Bellman enumeration · two-word LP', W / 2, 665, C.white, Q(S, 1, 'the finite computations were redone') * fade, 13);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM · THE RIEMANN HYPOTHESIS IS NOT PROVED', W / 2, 740, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V19–V20 · SPECTRA', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V19–V20 · 算术谱与黄金选择门 · TRURETURING FILM 090', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Sums, products and squares restate the Riemann hypothesis; one golden gate compiles what cancels its own errors.', W / 2, 875, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V19–V20', charge: 'HIDDEN LOG CHARGE', robin: 'EULER · GIBBS · ROBIN', squares: 'SQUARES AND ONE HALF', cayley: 'CAYLEY CIRCLE', spectrum: 'FINITE SPECTRA', suffice: 'TWO SUFFICIENT CONDITIONS', blocks: 'PHASE-FIXED BLOCKS', selector: 'GOLDEN SELECTOR GATE', compile: 'RECURSIVE COMPILER', variation: 'ACTION AND BELLMAN', records: 'PROGRAMS AND RECORDS', finale: 'LEDGER' });

function poster090() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('log(7/10) · ζ(2a) · |1 − 1/ρ| = 1 ⟺ Re ρ = ½', 1270, 370, { size: 36, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('Tr A⁻¹B = φ⁻² · G = |0⟩⟨0|⊗A + |1⟩⟨1|⊗B', 1270, 480, { size: 36, fam: FG, w: 700, align: 'center', c: C.white });
  txt('ε → 6 ε^(3/2) · min S = ‖V − U‖² / (L + 1)', 1270, 590, { size: 36, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V19–V20', W / 2, 140, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V19–V20 · SPECTRA', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('算 术 谱 与 黄 金 选 择 门', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 090', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster090;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
