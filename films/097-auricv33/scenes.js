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

/* ---- film 097: AURIC V33–V34 · information clocks and robust finite observers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN REFUTATION · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · NOT SETTLED HERE', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po097 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po097.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po097.set(key, off); }
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
/* ---- film 097 data (from verify097.py / vis097.json) ---- */
const GOLD_PATHS_097 = [[0.45,0.6817,0.8487,0.9362,0.9746,0.9902,0.9962,0.9986,0.9994,0.9998,0.9999,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],[0.45,0.6817,0.8487,0.9362,0.9746,0.9902,0.9962,0.9986,0.9994,0.9998,0.9999,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],[0.45,0.6817,0.8487,0.9362,0.9746,0.9902,0.9962,0.9986,0.9994,0.9998,0.9999,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],[0.45,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],[0.45,0.6817,0.8487,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]];
const MP_PATHS_097 = [[0.45,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,0.0,1.0,0.0],[0.45,0.0,0.0,0.0,0.0,1.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,1.0]];
const CLOCK_MC_097 = [1.0,0.62163,0.38427,0.2385,0.14672,0.09091,0.0562,0.03472,0.02145,0.01326,0.0082,0.00506,0.00313,0.00193,0.0012];
const CLOCK_EXACT_097 = [1.0,0.61803,0.38197,0.23607,0.1459,0.09017,0.05573,0.03444,0.02129,0.01316,0.00813,0.00502,0.00311,0.00192,0.00119];
const WEAKA_097 = [0.0,0.2554,0.2939,0.3095,0.318,0.3233,0.327,0.3296,0.3316,0.3332,0.3345,0.3356,0.3365,0.3372,0.3379,0.3384,0.3389,0.3394,0.3398,0.3401,0.3404,0.3407,0.341,0.3412,0.3414,0.3416,0.3418,0.342,0.3422,0.3423,0.3425,0.3426,0.3427,0.3428,0.3429,0.343,0.3431,0.3432,0.3433,0.3434,0.3435,0.3436,0.3436,0.3437,0.3438,0.3438,0.3439,0.3439,0.344,0.344,0.3441,0.3441,0.3442,0.3442,0.3443,0.3443,0.3444,0.3444,0.3444,0.3445,0.3445,0.3445,0.3446,0.3446,0.3446,0.3447,0.3447,0.3447,0.3447,0.3448,0.3448,0.3448,0.3448,0.3449,0.3449,0.3449,0.3449,0.345,0.345,0.345,0.345,0.345,0.3451,0.3451,0.3451,0.3451,0.3451,0.3451,0.3452,0.3452,0.3452,0.3452,0.3452,0.3452,0.3452,0.3453,0.3453,0.3453,0.3453,0.3453,0.3453];
const WEAKB_097 = [0.0,0.8047,1.0986,1.2825,1.4166,1.5223,1.6094,1.6836,1.7483,1.8055,1.8568,1.9033,1.9459,1.9851,2.0215,2.0554,2.0872,2.1171,2.1452,2.1719,2.1972,2.2213,2.2443,2.2663,2.2874,2.3076,2.327,2.3457,2.3637,2.3811,2.3979,2.4142,2.4299,2.4452,2.46,2.4744,2.4884,2.502,2.5152,2.5281,2.5407,2.553,2.5649,2.5766,2.5881,2.5992,2.6102,2.6209,2.6313,2.6416,2.6517,2.6615,2.6712,2.6806,2.6899,2.6991,2.7081,2.7169,2.7255,2.734,2.7424,2.7506,2.7587,2.7667,2.7745,2.7823,2.7899,2.7974,2.8047,2.812,2.8192,2.8262,2.8332,2.8401,2.8469,2.8536,2.8602,2.8667,2.8731,2.8795,2.8857,2.8919,2.898,2.9041,2.91,2.9159,2.9218,2.9275,2.9332,2.9389,2.9444,2.9499,2.9554,2.9608,2.9661,2.9714,2.9766,2.9818,2.9869,2.992,2.997];
const DRIFT_097 = [0.4418,0.4,0.06];
const GOLD_ALLONES_097 = [0.5,0.72361,0.87268,0.94721,0.97916,0.99193,0.9969,0.99882];
const CERT_RATES_097 = [0.0272,0.043,0.0282,0.05,0.1,0.0526];
const TAIL_MC_097 = [1.0,0.8007,0.3709,0.2827,0.1024,0.0411,0.0249,0.0111,0.0045,0.0024,0.001,0.0006,0.0002,0.0001,0.0001,0.0001,0.0001,0.0001,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
const TAIL_BD_097 = [1.0,1.0,1.0,0.7771,0.5417,0.3776,0.2633,0.1835,0.1279,0.0892,0.0622,0.0433,0.0302,0.0211,0.0147,0.0102,0.0071,0.005,0.0035,0.0024,0.0017,0.0012,0.0008,0.0006,0.0004,0.0003,0.0002,0.0001,0.0001,0.0001,0.0];
const TABLE_097 = [26,353,6,9,8834,0.04826,0.83492];
const TABLE_FAIL_097 = 0.0049;
const EN_097 = [0.5,0.241,0.1679,0.1634,0.1057,0.07768,0.07376,0.05277,0.03881,0.03599,0.02766,0.02015,0.01824,0.01491,0.01071,0.009473,0.00818,0.005792,0.005003,0.004549,0.003173,0.002677,0.002556,0.001756,0.001448,0.001447,0.0009804,0.0007898,0.0007727,0.0005514,0.0004343,0.0004155,0.0003121,0.0002405,0.0002249,0.0001776,0.000134,0.0001224,0.0001016,7.512e-05,6.703e-05];
const ENLOW_097 = [0.25,0.1743,0.1215,0.08469,0.05903,0.04115,0.02869,0.02,0.01394,0.009718,0.006774,0.004722,0.003292,0.002295,0.0016,0.001115,0.0007773,0.0005419,0.0003777,0.0002633,0.0001836,0.000128,8.92e-05,6.218e-05,4.334e-05,3.021e-05,2.106e-05,1.468e-05,1.024e-05,7.135e-06,4.974e-06,3.467e-06,2.417e-06,1.685e-06,1.174e-06,8.187e-07,5.707e-07,3.978e-07,2.773e-07,1.933e-07,1.348e-07];
const FREEZE_097 = [4.46,8];
const HCURVE_097 = [-0.0,-0.3359,-0.5852,-0.7632,-0.8832,-0.9564,-0.9925,-0.9994,-0.9838,-0.9514,-0.9067,-0.8536,-0.7952,-0.7339,-0.6717,-0.6101,-0.5502,-0.4929,-0.4388,-0.3883,-0.3416,-0.2988,-0.2599,-0.2248,-0.1934,-0.1654,-0.1407,-0.119,-0.1,-0.0836,-0.0694,-0.0573,-0.047,-0.0382,-0.0309,-0.0248,-0.0197,-0.0155,-0.0121,-0.0094,-0.0072,-0.0054,-0.004,-0.003,-0.0021,-0.0015,-0.0011,-0.0007,-0.0005,-0.0003,-0.0002,-0.0001,-0.0001,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,-0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0001,0.0001,0.0002,0.0003,0.0005,0.0007,0.0011,0.0015,0.0021,0.003,0.004,0.0054,0.0072,0.0094,0.0121,0.0155,0.0197,0.0248,0.0309,0.0382,0.047,0.0573,0.0694,0.0836,0.1,0.119,0.1407,0.1654,0.1934,0.2248,0.2599,0.2988,0.3416,0.3883,0.4388,0.4929,0.5502,0.6101,0.6717,0.7339,0.7952,0.8536,0.9067,0.9514,0.9838,0.9994,0.9925,0.9564,0.8832,0.7632,0.5852,0.3359,0.0];
const HMAX_097 = 7.844727495944184e-07;
const ANCHORS_097 = [0.6180339887498949,0.38196601125010515,0.2360679774997897,0.7639320225002103,0.7236067977499789,0.276393202250021,0.14589803375031546];
const GX4_097 = 1.9349996770563094e-08;
const NEST_PTS_097 = [["lam",4.848e-07,7.845e-07],["lam",3.636e-07,5.884e-07],["lam",2.424e-07,3.922e-07],["lam",1.212e-07,1.961e-07],["lam",0.0,0.0],["lam",1.212e-07,1.961e-07],["lam",2.424e-07,3.922e-07],["lam",3.636e-07,5.884e-07],["lam",4.848e-07,7.845e-07],["pow",0.3195,0.1859],["pow",0.1487,0.08192],["pow",0.07177,0.03874],["pow",0.06697,0.03505],["pow",0.1591,0.08192],["pow",0.2929,0.1481],["pow",0.5,0.25],["trig",0.2612,0.1001],["trig",0.2232,0.07575],["trig",0.3178,0.1053],["trig",0.06107,0.03771],["trig",0.1268,0.05391],["trig",0.1665,0.05728],["trig",0.2243,0.08361],["trig",0.1917,0.07595],["trig",0.03615,0.01655],["trig",0.2111,0.1086],["trig",0.0549,0.02121],["trig",0.3527,0.1313],["trig",0.191,0.06544],["trig",0.01992,0.008947],["trig",0.2035,0.08306],["trig",0.08607,0.02829],["trig",0.1096,0.04427],["trig",0.1174,0.0475],["trig",0.149,0.05881],["trig",0.1536,0.06429],["trig",0.02109,0.01119],["trig",0.2538,0.1075],["trig",0.1845,0.05979],["trig",0.04446,0.01799],["trig",0.0429,0.02713],["trig",0.1148,0.04497],["trig",0.01785,0.009541],["trig",0.2877,0.08684],["trig",0.2142,0.0773],["trig",0.008877,0.004236],["trig",0.2369,0.0735],["trig",0.06706,0.02732],["trig",0.1025,0.0427],["trig",0.3337,0.1073],["trig",0.1651,0.04912],["trig",0.1083,0.05088],["trig",0.1299,0.06576],["trig",0.01562,0.008264],["trig",0.07083,0.02693],["trig",0.1207,0.05031],["trig",0.03974,0.0202],["trig",0.04461,0.02101],["trig",0.1322,0.04915],["trig",0.4517,0.1436],["trig",0.4654,0.1475],["trig",0.001537,0.0007269],["trig",0.002998,0.001502],["trig",0.1423,0.08509],["trig",0.0473,0.01924],["trig",0.01084,0.004315],["trig",0.0009543,0.0003798],["trig",0.1886,0.07235],["trig",0.1772,0.06492],["trig",0.08127,0.04152],["trig",0.2545,0.09455],["trig",0.07236,0.02908],["trig",0.2037,0.07107],["trig",0.2186,0.07546],["trig",0.06902,0.02598],["trig",0.1984,0.08181],["anch",2.876e-08,4.656e-08],["anch",5.221e-05,8.43e-05],["anch",5.017e-05,8.159e-05],["anch",8.488e-07,9.004e-07],["anch",1.682e-07,2.722e-07],["anch",0.0006066,0.0003082],["anch",2.068e-06,3.335e-06],["anch",3.778e-07,6.112e-07],["anch",3.502e-06,2.768e-06],["anch",0.0001182,5.829e-05],["anch",0.0001409,6.467e-05],["anch",0.0001112,5.053e-05],["anch",1.12e-05,1.812e-05],["anch",2.139e-05,3.461e-05],["anch",0.0007614,0.001231],["anch",0.0003841,0.0006235],["anch",0.0007045,0.001149],["anch",0.0006551,0.0004598],["anch",8.151e-06,1.318e-05],["anch",0.0003754,0.0005921],["anch",3.385e-06,3.799e-06],["anch",5.6e-08,9.065e-08],["anch",0.001725,0.0008262],["anch",9.834e-08,1.591e-07],["anch",1.876e-07,3.035e-07],["anch",1.919e-06,3.122e-06],["anch",2.583e-06,4.151e-06],["anch",2.839e-06,4.668e-06],["anch",1.103e-06,1.777e-06],["anch",5.398e-07,8.734e-07],["anch",2.12e-08,3.413e-08],["anch",5.866e-05,2.673e-05],["anch",1.163e-08,1.938e-08],["anch",0.0006649,0.0003039],["anch",6.449e-07,2.905e-07],["anch",0.001357,0.0006494],["anch",1.561e-05,2.525e-05],["anch",3.056e-08,1.985e-08],["anch",0.0003765,0.0006084],["anch",1.433e-06,1.383e-06],["step",0.4719,0.1985],["step",0.5238,0.2348],["step",0.5302,0.238],["step",0.477,0.2317],["step",0.8588,0.3415],["step",0.4985,0.1988],["step",0.6595,0.3544],["step",0.4835,0.2509],["step",0.5603,0.241],["step",0.4619,0.3398],["step",0.4739,0.2093],["step",0.3607,0.2188],["step",0.7614,0.3885],["step",0.4786,0.2146],["step",0.38,0.1825],["step",0.7503,0.2982],["step",0.4536,0.2609],["step",0.3533,0.1502],["step",0.3005,0.1821],["step",0.3736,0.2115],["step",0.6747,0.275],["step",0.4502,0.2421],["step",0.4013,0.1615],["step",0.3286,0.1221],["step",0.3626,0.2002],["step",0.5658,0.2644],["step",0.8936,0.3419],["step",0.3562,0.1807],["step",0.4606,0.2312],["step",0.3805,0.2216],["step",0.4311,0.2508],["step",0.4203,0.209],["step",0.3563,0.2071],["step",0.5593,0.263],["step",0.462,0.2333],["step",0.6681,0.3818],["step",0.4126,0.2151],["step",0.4941,0.2651],["step",0.5451,0.2793],["step",0.7646,0.3188]];
const WINE_097 = [0.382,0.1459,0.3262,0.1591,0.07391,0.1552,0.07984,0.03953,0.08059,0.04253,0.02176,0.04357,0.02335,0.01219,0.02413,0.01306,0.006917,0.01357,0.007402,0.003959,0.002081,0.004234,0.002282,0.001211,0.002439,0.001323,0.0007072,0.001413,0.0007701,0.0004143,0.0008221,0.00045,0.0002433,0.0004802,0.0002638,0.0001433,0.0002814,0.0001551,8.452e-05,0.0001653];
const WINP_097 = [0.1,0.19,0.271,0.0523,0.08146,0.1143,0.1497,0.03809,0.05297,0.07019,0.01853,0.02564,0.03416,0.00923,0.01272,0.017,0.004667,0.006415,0.008593,0.002386,0.003273,0.00439,0.00123,0.001684,0.002261,0.0006379,0.0008724,0.001172,0.0003326,0.0004544,0.0006109,0.0008094,0.0002377,0.0003197,0.0004243,0.0001248,0.0001679,0.0002231,6.571e-05,8.845e-05];
const WINB_097 = [1.181,0.9858,0.8231,0.6872,0.5738,0.4791,0.4,0.3339,0.2788,0.2328,0.1944,0.1623,0.1355,0.1131,0.09445,0.07886,0.06584,0.05497,0.0459,0.03832,0.03199,0.02671,0.0223,0.01862,0.01555,0.01298,0.01084,0.009049,0.007555,0.006308,0.005267,0.004397,0.003671,0.003065,0.002559,0.002137,0.001784,0.00149,0.001244,0.001038];
const WIN42_097 = [0.0063,0.1933,2,20,0.25];
const SWAPS_097 = [1.978,4.213,6.482,8.703,9.4];
const SWAPS_H_097 = [2.02,4.197,6.486,8.788,9.481];
const WIDTH_097 = [0.0001,0.0002,0.0002,0.0003,0.0003,0.0004,0.0005,0.0006,0.0007,0.0008,0.001,0.0013,0.0015,0.0019,0.0023,0.0028,0.0034,0.0041,0.0051,0.0062,0.0075,0.0091,0.0111,0.0135,0.0164,0.0198,0.024,0.0289,0.0349,0.0418,0.05,0.0596,0.0706,0.0831,0.0972,0.1127,0.1295,0.1472,0.1653,0.1832,0.2,0.2149,0.227,0.2355,0.2399,0.2398,0.2352,0.2266,0.2143,0.1993,0.1825,0.1646,0.1465,0.1288,0.1121,0.0966,0.0826,0.0701,0.0592,0.0497,0.0415,0.0346,0.0287,0.0238,0.0197,0.0162,0.0134,0.011,0.0091,0.0074,0.0061,0.005,0.0041,0.0034,0.0028,0.0023,0.0019,0.0015,0.0012,0.001,0.0008];
const WIDTHD_097 = [0.9808,0.2404];
const BAYES_097 = [[0.0,0.0,0.0],[0.1,0.0025,0.05],[0.2,0.0101,0.1],[0.3,0.023,0.15],[0.4,0.0417,0.2],[0.5,0.067,0.25],[0.6,0.1,0.3],[0.7,0.1429,0.35],[0.8,0.2,0.4],[0.9,0.2821,0.45],[1.0,0.5,0.5]];
const ROC_097 = [0.1,0.4,0.1,0.4007959479015919];
const CLOCK_INFO_097 = [0.0,0.4812,0.9624,1.4436,1.9248,2.4061,2.8873,3.3685,3.8497,4.3309,4.8121,5.2933,5.7745,6.2558,6.737,7.2182,7.6994];
const CLOCK_EXEC_097 = [0,3,6,9,13,17,21,26,31,36,42,48,54,61,68,75,83];
const LJ_097 = [3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8];
const OSC_D_097 = [0.003,0.006,0.009,0.012,0.015,0.018,0.021,0.024,0.027,0.03,0.033,0.036,0.039,0.042,0.045,0.048,0.051,0.054,0.057,0.06,0.063,0.066,0.069,0.072,0.075,0.078,0.081,0.084,0.087,0.09,0.093,0.096,0.099,0.102,0.105,0.108,0.111,0.114,0.117,0.12,0.123,0.126,0.129,0.132,0.135,0.138,0.141,0.144,0.147,0.15,0.153,0.156,0.159,0.162,0.165,0.168,0.171,0.174,0.177,0.18,0.183,0.186,0.189,0.192,0.195,0.198,0.201,0.204,0.207,0.21,0.213,0.216,0.219,0.222,0.225,0.228,0.231,0.234,0.237,0.24,0.243,0.246,0.249,0.252,0.255,0.258,0.261,0.264,0.267,0.27,0.273,0.276,0.279,0.282,0.285,0.288,0.291,0.294,0.297,0.3,0.303,0.306,0.309,0.312,0.315,0.318,0.321,0.324,0.327,0.33,0.333,0.336,0.339,0.342,0.345,0.348,0.351,0.354,0.357,0.36,0.363,0.366,0.369,0.372,0.375,0.378,0.381,0.384,0.387,0.39,0.393,0.396,0.399,0.402,0.405,0.408,0.411,0.414,0.417,0.42,0.423,0.426,0.429,0.432,0.435,0.438,0.441,0.444,0.447,0.45,0.453,0.456,0.459,0.462,0.465,0.468,0.471,0.474,0.477,0.48,0.483,0.486,0.489,0.492,0.495,0.498,0.501,0.504,0.507,0.51,0.513,0.516,0.519,0.522,0.525,0.528,0.531,0.534,0.537,0.54,0.543,0.546,0.549,0.552,0.555,0.558,0.561,0.564,0.567,0.57,0.573,0.576,0.579,0.582,0.585,0.588,0.591,0.594,0.597,0.6];
const OSC_SRC_097 = [0.09651,0.09651,0.12175,0.12175,0.12175,0.18785,0.18785,0.18785,0.18785,0.18785,0.18785,0.18785,0.18785,0.18785,0.18785,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.36089,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,0.81393,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0,2.0];
const OSC_COR_097 = [0.10032,0.11973,0.13915,0.15857,0.17798,0.1974,0.21682,0.23623,0.25565,0.27507,0.29448,0.3139,0.33332,0.35273,0.37215,0.39156,0.41098,0.4304,0.44981,0.46923,0.48865,0.50806,0.52748,0.5469,0.56631,0.58573,0.60514,0.62456,0.64398,0.66339,0.68281,0.70223,0.72164,0.74106,0.76048,0.77989,0.79931,0.81873,0.83814,0.85756,0.87697,0.89639,0.91581,0.93522,0.95464,0.97406,0.99347,1.01289,1.03231,1.05172,1.07114,1.09055,1.10997,1.12939,1.1488,1.16822,1.18764,1.20705,1.22647,1.24589,1.2653,1.28472,1.30414,1.32355,1.34297,1.36238,1.3818,1.40122,1.42063,1.44005,1.45947,1.47888,1.4983,1.51772,1.53713,1.55655,1.57597,1.59538,1.6148,1.63421,1.65363,1.67305,1.69246,1.71188,1.7313,1.75071,1.77013,1.78955,1.80896,1.82838,1.84779,1.86721,1.88663,1.90604,1.92546,1.94488,1.96429,1.98371,2.00313,2.02254,2.04196,2.06138,2.08079,2.10021,2.11962,2.13904,2.15846,2.17787,2.19729,2.21671,2.23612,2.25554,2.27496,2.29437,2.31379,2.33321,2.35262,2.37204,2.39145,2.41087,2.43029,2.4497,2.46912,2.48854,2.50795,2.52737,2.54679,2.5662,2.58562,2.60503,2.62445,2.64387,2.66328,2.6827,2.70212,2.72153,2.74095,2.76037,2.77978,2.7992,2.81862,2.83803,2.85745,2.87686,2.89628,2.9157,2.93511,2.95453,2.97395,2.99336,3.01278,3.0322,3.05161,3.07103,3.09044,3.10986,3.12928,3.14869,3.16811,3.18753,3.20694,3.22636,3.24578,3.26519,3.28461,3.30403,3.32344,3.34286,3.36227,3.38169,3.40111,3.42052,3.43994,3.45936,3.47877,3.49819,3.51761,3.53702,3.55644,3.57586,3.59527,3.61469,3.6341,3.65352,3.67294,3.69235,3.71177,3.73119,3.7506,3.77002,3.78944,3.80885,3.82827,3.84768,3.8671,3.88652,3.90593,3.92535,3.94477,3.96418];
/* ---- film 097 helpers ---- */
const PHI97 = (1 + Math.sqrt(5)) / 2, X97 = 1 / PHI97;
function cell97(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.36, C.white, a, size); }
function ylog97(v, lo, hi, y0, h) { const l = Math.log10(Math.max(v, 1e-12)); return y0 - (l - lo) / (hi - lo) * h; }
function path97(pts, col, a, lw = 3) { if (a <= 0 || pts.length < 2) return; strokePoly(pts, col, a, lw, false); }
function logTicks97(px, py, ph, lo, hi, a, step = 1) { for (let e = lo; e <= hi; e += step) { const y = ylog97(Math.pow(10, e), lo, hi, py, ph); line(px - 6, y, px, y, C.dim, a, 1.2); lbl(e === 0 ? '1' : '10^' + e, px - 10, y + 5, C.dim, a, 13, 'right'); } }
/* a fixed pseudo-random record used for illustrations */
const REC97 = Array.from({ length: 40 }, (_, i) => (rnd(i, 97) < 0.38 ? 0 : 1));

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['no finite memory predicts', 'V32 : THE FULL-HISTORY WALL', 'no finite memory is right on every history', C.red], ['turn information gain into an internal clock', 'INFORMATION CLOCK', 'Tₙ = −log(r₀ r₁ ⋯ rₙ₋₁)', C.gold], ['construct finite observers', 'FINITE OBSERVERS', 'every future prediction , chance ≥ 1 − δ', C.cyan], ['even from an unknown start', 'UNKNOWN START', 'wait m , read L , then choose', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 330, 380, 58, 'overlap clock', C.gold, rp, 22); chip(330, 415, 380, 58, 'stopping certificates', C.cyan, rp, 22); chip(330, 500, 380, 58, 'golden nesting', C.mag, rp, 22);
  box(1420, 320, 380, 200, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('finite tables', 1610, 385, C.green, rp, 22); lblG('Tₙ = n log φ', 1610, 455, C.white, rp, 30);
  txt(scramble('AURIC V33–V34 · CLOCKS', rp, 497), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V33–V34 · 信 息 钟 与 稳 健 有 限 观 察 者', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 097 · AURIC_ENDOGENOUS_INFORMATION_CLOCKS_AND_CERTIFIABLE_FINITE_OBSERVERS_V33 · AURIC_GOLDEN_NESTED_CLOSURE_AND_ROBUST_FINITE_OBSERVERS_V34', W / 2, 115, { size: 12, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 0 });
};

/* ---- 02 ODDS AND SUCCESSORS (V33 §2) ---- */
SCENES.calib = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Single-round odds do not decide', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'First, a project stability bound', 0.6) * f1;
    chip(550, 260, 800, 54, 'x = (√5 − 1)/2 ,  φ = 1/x ,  σ = x² ,  ζ = e^(3πi/5)', C.gold, q, 20);
    const kq = Q(S, 0, 'With kappa naught equal to x over two', 0.6) * f1;
    chip(550, 330, 800, 54, 'κ₀ = |1 − ζ³| / 2 = x / 2 ≈ 0.309', C.cyan, kq, 22);
    const rq = Q(S, 0, 'four-point residual', 0.6) * f1;
    lblG('ρ(f) = sup over rank-5 Π , ψ of |f(J³ψ) + σ f(Jψ) − f(ψ) − σ f(J²ψ)|', 550, 395, C.white, rq, 16);
    lblG('J = I + (ζ − 1)Π  on rays of ℂ¹³ ,  d = √(1 − |⟨a, b⟩|²)', 550, 425, C.dim, rq, 15);
    const bq = Q(S, 0, 'plus twice its sup norm over kappa naught', 0.6) * f1;
    chip(550, 500, 840, 62, '|f(A) − f(B)| ≤ φ ρ(f) + (2‖f‖∞ / κ₀) d(A, B)', C.green, bq, 23);
    lblG('from the source bound with the largest m having d ≤ κ₀ σ^(m−1) , since 1/(1 − σ) = φ', 550, 560, C.dim, bq, 15);
    const fq = Q(S, 0, 'times their distance', 0.6) * f1;
    lbl('a fixed residual leaves the additive floor φρ : no common modulus for the class', 550, 605, C.white, fq, 15);
    lblG('project §116 : 1 ≤ liminf M(ε)/√ε ≤ limsup M(ε)/√ε ≤ √φ  (asymptotic sandwich)', 550, 645, C.dim, fq, 15);
    const pq = Q(S, 0, 'differs at two rays', 0.8) * f1;
    const px = 1060, py = 760, pw = 680, ph = 420, xS = d => px + d / 0.6 * pw, yS = v => py - v / 2.2 * ph;
    plotAxes(px, py, pw, ph, pq, 'distance d(A, B)', 'bound on |f(A) − f(B)|');
    path97(OSC_D_097.map((d, i) => [xS(d), yS(OSC_COR_097[i])]).filter((p, i) => OSC_COR_097[i] <= 2.2), C.gold, pq, 3);
    path97(OSC_D_097.map((d, i) => [xS(d), yS(OSC_SRC_097[i])]), C.cyan, pq, 2.5);
    dashed(xS(0.309), py, xS(0.309), py - ph * 0.95, C.dim, pq * 0.7, 1.2); lbl('κ₀', xS(0.309), py + 26, C.dim, pq, 16);
    dashed(px, yS(PHI97 * 0.05), px + pw, yS(PHI97 * 0.05), C.mag, pq * 0.7, 1.2); lbl('floor φρ = 0.081', px + pw - 6, yS(PHI97 * 0.05) - 10, C.mag, pq, 15, 'right');
    lbl('gold : φρ + 2‖f‖ d/κ₀', px + 20, py - ph + 20, C.gold, pq, 15, 'left');
    lbl('cyan : source staircase , best m', px + 20, py - ph + 45, C.cyan, pq, 15, 'left');
    lbl('ρ(f) = 0.05 , ‖f‖∞ = 1', px + pw, py - ph + 20, C.dim, pq, 15, 'right');
  }
  const q = Q(S, 1, 'Single-round odds do not decide', 0.6, 0.3);
  if (q > 0) {
    box(150, 250, 380, 190, C.gold, q, 2, 'rgba(40,30,0,0.4)'); lbl('GOLDEN', 340, 290, C.gold, q, 20);
    lblG('M₀ = √x E', 340, 345, C.white, q, 24); lblG('M₁ = xE + ζ⁻³ P', 340, 395, C.white, q, 24);
    box(570, 250, 380, 190, C.red, q, 2, 'rgba(40,0,0,0.4)'); lbl('MEASURE-AND-PREPARE', 760, 290, C.red, q, 19);
    lblG('outcome 0 → |p⟩⟨p|', 760, 345, C.white, q, 22); lblG('outcome 1 → |e⟩⟨e|', 760, 395, C.white, q, 22);
    const eq = Q(S, 1, 'share the effects', 0.6);
    chip(550, 500, 800, 56, 'same effects xE , x²E + P : same odds for every input', C.white, eq, 20);
    lbl('single-round odds do not fix successors or the joint record law', 550, 555, C.dim, eq, 15);
    const gq = Q(S, 1, 'share the effects', 0.8), mq = Q(S, 1, 'the golden record polarizes', 0.8);
    stamp('GOLDEN : POLARIZES', 550, 640, Q(S, 1, 'the golden record polarizes', 0.6), C.gold, 30, -0.04);
    stamp('OTHER : FLIPS FOREVER', 550, 730, Q(S, 1, 'flips between zero and one forever', 0.6), C.red, 30, -0.04);
    const px = 1060, py = 690, pw = 680, ph = 380, xS = n => px + 10 + n / 30 * (pw - 20), yS = v => py - 10 - v * (ph - 30);
    const pq = Q(S, 1, 'A golden instrument', 0.6);
    plotAxes(px, py, pw, ph, pq, 'round n', 'posterior qₙ');
    [0, 1].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, pq, 15, 'right'));
    MP_PATHS_097.slice(0, 1).forEach(p => path97(p.map((v, n) => [xS(n), yS(v)]), C.red, mq * 0.55, 1.6));
    GOLD_PATHS_097.forEach((p, j) => path97(p.map((v, n) => [xS(n), yS(v)]), C.gold, gq, 4));
    lbl('gold : sampled golden paths , q₀ = 0.45 (up , or one drop to 0)', px, py + 58, C.gold, gq, 15, 'left');
    lbl('red : measure-and-prepare with the same odds', px, py + 84, C.red, mq, 15, 'left');
  }
};

/* ---- 03 INFORMATION CLOCK (V33 §3) ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'For the golden readout the overlap is x', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A readout that leaves both sectors intact', 0.6) * f1;
    chip(550, 255, 800, 54, 'M_n,y = √a E + e^(iθ) √b P   (both sectors kept)', C.cyan, q, 20);
    const rq = Q(S, 0, 'has overlap r', 0.6) * f1;
    chip(550, 325, 800, 54, 'rₙ = Σ_y √(a b) ,   U(q) = √(q(1 − q))', C.gold, rq, 22);
    const sq = Q(S, 0, 'shrinks by exactly r each round', 0.6) * f1;
    chip(550, 405, 800, 62, 'E[ U(qₙ₊₁) | Fₙ ] = rₙ U(qₙ)', C.green, sq, 25);
    lblG('E U(qₙ) = U(q₀) Rₙ ,   Rₙ = r₀ r₁ ⋯ rₙ₋₁', 550, 470, C.white, sq, 19);
    const iq = Q(S, 0, 'polarization is almost sure exactly when', 0.6) * f1;
    chip(550, 545, 840, 62, 'qₙ → {0, 1} a.s.  ⇔  Rₙ → 0  ⇔  Tₙ = −log Rₙ → ∞', C.mag, iq, 21);
    lbl('then P(q∞ = 1) = q₀ ;  if R∞ > 0 an interior limit has positive probability', 550, 610, C.dim, iq, 15);
  }
  const pq = Q(S, 0, 'Its expected square-root impurity', 0.8);
  if (pq > 0) {
    const px = 1060, py = 760, pw = 680, ph = 420, lo = -3, hi = 0, xS = n => px + 20 + n / 14 * (pw - 40), yS = v => ylog97(v, lo, hi, py, ph);
    plotAxes(px, py, pw, ph, pq, 'round n', 'E U(qₙ) / U(q₀)  (log)');
    logTicks97(px, py, ph, lo, hi, pq);
    path97(CLOCK_EXACT_097.map((v, n) => [xS(n), yS(v)]), C.gold, pq, 3);
    CLOCK_MC_097.forEach((v, n) => dot(xS(n), yS(v), 7, 'c', clamp(pq * 1.6 - n / 20)));
    lbl('gold : xⁿ exact', px + pw, py - ph + 20, C.gold, pq, 15, 'right');
    lbl('dots : 40000 sampled golden paths , q₀ = 0.3', px + pw, py - ph + 45, C.cyan, pq, 15, 'right');
    const tq = Q(S, 1, 'the clock ticks exactly log phi per round', 0.6);
    for (let n = 1; n <= 14; n++) { const x = xS(n); line(x, py, x, py - 10, C.gold, tq, 2); if (n % 2 === 0) lbl(String(n), x, py + 22, C.dim, tq, 13); }
    lbl('each round adds log φ ≈ 0.481 to Tₙ', px + pw / 2, py + 56, C.gold, tq, 16);
  }
  const q = Q(S, 1, 'For the golden readout the overlap is x', 0.6, 0.3);
  if (q > 0) {
    chip(550, 260, 800, 56, 'golden :  r = √(x · 0) + √(x² · 1) = x', C.gold, q, 22);
    const tq = Q(S, 1, 'the clock ticks exactly log phi per round', 0.6);
    const x0 = 170, x1 = 930, yR = 370;
    line(x0, yR, x1, yR, C.dim, tq, 2);
    for (let n = 0; n <= 10; n++) { const x = x0 + n * 0.4812 / (10 * 0.4812) * (x1 - x0), qq = clamp(tq * 1.6 - n / 14); line(x, yR - 12, x, yR + 12, C.gold, qq, 3); lbl(String(n), x, yR + 36, C.white, qq, 15); }
    lblG('Tₙ = n log φ ,  E U(qₙ) = U(q₀) xⁿ', 550, 335, C.white, tq, 19);
    lbl('any continuous additive scale is c · (−log r)', 550, 435, C.dim, tq, 15);
    const cq = Q(S, 1, 'Coherence shrinks by at most r', 0.6);
    chip(550, 510, 820, 56, 'E Φ(ρ) P = c E ρ P ,  |c| ≤ r ;  golden c = x ζ³', C.cyan, cq, 21);
    const vq = Q(S, 1, 'yet can vanish with no information gained', 0.6);
    chip(550, 590, 820, 56, 'M₀ = I/√2 , M₁ = (E − P)/√2 :  r = 1 ,  c = 0', C.red, vq, 21);
    stamp('COHERENCE GONE , NO INFORMATION', 550, 690, vq, C.red, 28, -0.04);
  }
};

/* ---- 04 SQUARE-SUM TEST (V33 §4) ---- */
SCENES.weak = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Real instruments drift', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'If the sectors give outcome zero', 0.6) * f1;
    chip(550, 255, 800, 54, 'outcome 0 :  (1 − gₙ)/2 in E ,  (1 + gₙ)/2 in P', C.cyan, q, 20);
    chip(550, 325, 800, 54, 'rₙ = √(1 − gₙ²)', C.gold, q, 24);
    const pq = Q(S, 0, 'polarization is almost sure exactly when', 0.6) * f1;
    chip(550, 405, 800, 62, 'polarizes a.s.  ⇔  Σ gₙ² = ∞', C.green, pq, 26);
    const aq = Q(S, 0, 'g like one over n stalls', 0.6) * f1;
    lblG('gₙ = 1/(n + 2) :  Σ gₙ² = π²/6 − 1 ,  R∞ = 1/√2 ,  T∞ = log √2', 550, 480, C.gold, aq, 18);
    const bq = Q(S, 0, 'one over root n does not', 0.6) * f1;
    lblG('gₙ = 1/√(n + 2) :  Rₙ = 1/√(n + 1) ,  Tₙ = ½ log(n + 1) → ∞', 550, 520, C.cyan, bq, 18);
    lbl('infinitely many layers do not by themselves give unbounded information', 550, 570, C.dim, bq, 15);
    const px = 1060, py = 760, pw = 680, ph = 420, xS = n => px + n / 400 * pw, yS = v => py - v / 3.3 * ph;
    const gq = Q(S, 0, 'Weak readouts can stall', 0.8) * f1;
    plotAxes(px, py, pw, ph, gq, 'round n (0 … 400)', 'information clock Tₙ');
    [1, 2, 3].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, gq, 14, 'right'));
    const cq = Q(S, 0, 'polarization is almost sure exactly when', 0.8) * f1;
    path97(WEAKA_097.map((v, i) => [xS(i * 4), yS(v)]), C.gold, cq, 3);
    dashed(px, yS(0.3466), px + pw, yS(0.3466), C.gold, cq * 0.6, 1.2); lbl('gₙ = 1/(n + 2) : log √2 = 0.347', px + pw, yS(0.3466) - 10, C.gold, cq, 15, 'right');
    path97(WEAKB_097.map((v, i) => [xS(i * 4), yS(v)]), C.cyan, cq, 3);
    lbl('gₙ = 1/√(n + 2) : ½ log(n + 1)', xS(250), yS(2.95) - 14, C.cyan, cq, 16);
    stamp('STALLS', xS(200), yS(0.75), aq, C.gold, 26, -0.04);
  }
  const q = Q(S, 1, 'Real instruments drift', 0.6, 0.3);
  if (q > 0) {
    const dq = Q(S, 1, 'If the drift is summable', 0.6);
    chip(550, 260, 820, 54, '|E(qₙ₊₁ | Fₙ) − qₙ| ≤ dₙ ,   D* = Σ dₙ < ∞', C.gold, dq, 21);
    const iq = Q(S, 1, 'the accumulated information diverges', 0.6);
    chip(550, 330, 820, 54, 'reference : Var(qₙ₊₁ | Fₙ) ≥ κₙ [qₙ(1 − qₙ)]²', C.cyan, iq, 20);
    const eq = Q(S, 1, 'the instrument error is small relative to it', 0.6);
    lblG('Σ κₙ = ∞ ,   eₙ / κₙ → 0   (weak readout : κₙ = 4gₙ²)', 550, 395, C.white, eq, 18);
    const rq = Q(S, 1, 'polarization still holds', 0.6);
    chip(550, 470, 820, 62, 'qₙ → {0, 1} a.s. ,   |P(q∞ = 1) − q₀| ≤ D*', C.green, rq, 23);
    lbl('no need for dₙ/κₙ → 0 , nor for Σ eₙ < ∞', 550, 535, C.dim, rq, 15);
    const bq = Q(S, 1, 'the chance of branch one stays within D star of q naught', 0.6);
    const bx = 1150, by = 700, hs = 700;
    const bars = [['q₀', DRIFT_097[1], C.white], ['sampled', DRIFT_097[0], C.cyan], ['q₀ + D*', DRIFT_097[1] + DRIFT_097[2], C.gold]];
    lbl('P(q∞ = 1) with drift toward 1', 1400, 270, C.white, q, 18);
    bars.forEach(([nm, v, col], i) => { const x = bx + i * 170, h = v * hs * Q(S, 1, 'Real instruments drift', 1.2); fillBox(x, by - h, 110, h, col, q * 0.4); rect63(x, by - h, 110, h, col, q, 1.6); lbl(v.toFixed(3), x + 55, by - h - 12, col, q, 18); lbl(nm, x + 55, by + 28, C.dim, q, 16); });
    line(bx - 20, by, bx + 480, by, C.dim, q, 1.5);
    lbl('sampled : gₙ = 1/√(n + 2) , dₙ = 0.03 · 2^(−n) toward 1 , 6000 paths', 1400, 770, C.dim, bq, 14);
  }
};

/* ---- 05 STOPPING CERTIFICATES (V33 §5) ---- */
SCENES.cert = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Zero error is impossible', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'When may a checker declare a branch?', 0.6) * f1;
    chip(550, 255, 820, 54, 'qₙ + Dₙ  and  1 − qₙ + Dₙ : nonnegative supermartingales', C.cyan, q, 19);
    chip(550, 325, 820, 54, '|P(B = 1 | F_τ) − q_τ| ≤ D_τ ,   Dₙ = tail of the drift envelope', C.gold, q, 19);
    const sq = Q(S, 0, 'At the first round where', 0.6) * f1;
    chip(550, 410, 820, 54, 'q̂ₙ + νₙ + D̄ₙ ≤ α   ⇒   C = 0', C.white, sq, 22);
    chip(550, 475, 820, 54, '1 − q̂ₙ + νₙ + D̄ₙ ≤ α   ⇒   C = 1', C.white, sq, 22);
    lbl('rational certified intervals νₙ ; computable tail bound D̄ₙ → 0', 550, 530, C.dim, sq, 15);
    const rq = Q(S, 0, 'The branch is then wrong', 0.6) * f1;
    lbl('wrong branch ≤ α  ·  crossing the other half ≤ 2α  ·  later opposite certificate ≤ α/(1 − α)', 550, 590, C.green, rq, 16);
    const px = 1080, by = 690, hs = 3600;
    lbl('sampled (fill) vs bound (outline)', 1410, 270, C.white, rq, 18);
    const nm = ['wrong', 'cross ½', 'opposite'], col = [C.gold, C.cyan, C.mag];
    for (let i = 0; i < 3; i++) {
      const x = px + i * 230, qq = clamp(rq * 1.6 - i * 0.3), vb = CERT_RATES_097[i + 3], vs = CERT_RATES_097[i];
      rect63(x, by - vb * hs, 150, vb * hs, col[i], qq, 2); fillBox(x + 25, by - vs * hs, 100, vs * hs, col[i], qq * 0.55);
      lbl(vs.toFixed(3), x + 75, by - vs * hs - 10, C.white, qq, 16); lbl('≤ ' + vb.toFixed(3), x + 75, by - vb * hs - 12, col[i], qq, 16); lbl(nm[i], x + 75, by + 28, C.dim, qq, 16);
    }
    line(px - 20, by, px + 680, by, C.dim, rq, 1.5);
    lbl('s = 1/10 , q₀ = 1/2 , α = 0.05 , exact QND , 20000 paths', 1410, 760, C.dim, rq, 14);
  }
  const q = Q(S, 1, 'Zero error is impossible', 0.6, 0.3);
  if (q > 0) {
    chip(550, 260, 820, 54, 's > 0 :  every finite history has mass in both sectors', C.red, q, 20);
    lbl('0 < qₙ < 1 always , so any a.s. finite certifier errs with positive probability', 550, 315, C.dim, q, 15);
    stamp('ZERO ERROR IMPOSSIBLE', 550, 395, q, C.red, 30, -0.04);
    const aq = Q(S, 1, 'but any alpha below one half works', 0.6);
    chip(550, 470, 820, 54, 'every 0 < α < 1/2 : a threshold certificate exists', C.green, aq, 21);
    const gq = Q(S, 1, 'The golden readout bounds the wait outright', 0.6);
    chip(550, 560, 840, 62, 'τ_α ≤ ⌈ log((1 − q₀)(1 − α) / (α q₀)) / (2 log φ) ⌉', C.gold, gq, 21);
    const fq = Q(S, 1, 'five rounds always suffice', 0.6);
    lblG('q₀ = 1/2 , α = 1/100 :  ⌈ 4.77 ⌉ = 5 rounds', 550, 630, C.gold, fq, 22);
    lbl('any outcome 0 confirms E at once (q = 0)', 550, 670, C.dim, gq, 15);
    const px = 1080, py = 760, pw = 660, ph = 420, lo = -3, hi = 0, xS = n => px + 30 + n / 7 * (pw - 120), yS = v => ylog97(v, lo, hi, py, ph);
    plotAxes(px, py, pw, ph, gq, 'round n', '1 − qₙ on the all-ones path (log)');
    logTicks97(px, py, ph, lo, hi, gq);
    dashed(px, yS(0.01), px + pw, yS(0.01), C.red, gq, 2); lbl('α = 0.01', px + pw, yS(0.01) + 24, C.red, gq, 15, 'right');
    GOLD_ALLONES_097.forEach((v, n) => { const w = 1 - v, qq = clamp(gq * 1.6 - n / 10), x = xS(n); line(x, py, x, yS(w), n === 5 ? C.green : C.gold, qq * 0.6, 2); dot(x, yS(w), 8, n === 5 ? 'g' : 'o', qq); lbl(String(n), x, py + 24, C.dim, qq, 14); });
    lbl('n = 5 : first below α', xS(5) + 24, yS(0.0081) - 30, C.green, fq, 16, 'left');
  }
};

/* ---- 06 FINITE TABLE (V33 §6–7) ---- */
SCENES.table = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'No contradiction with version thirty-two', 0.6);
  const Nn = TABLE_097[0];
  if (f1 > 0) {
    const q = Q(S, 0, 'For the positive-support readout', 0.6) * f1;
    const lq = Q(S, 0, 'count rounds and zeros to depth N', 0.6) * f1;
    const cx = 420, y0 = 270, sp = 13.5;
    for (let n = 0; n < Nn; n++) for (let k = 0; k <= n; k++) { const x = cx + (k - n / 2) * sp, y = y0 + n * sp, qq = clamp(lq * 1.8 - n / Nn); dot(x, y, 3.2, 'c', qq); }
    /* a token walking down the lattice with a fixed record */
    let kk = 0; const steps = Math.min(Nn - 1, Math.floor(clamp((u - lineAt(S, 0).s - 4) / 8) * (Nn - 1)));
    for (let n = 0; n < steps; n++) if (REC97[n] === 0) kk++;
    if (lq > 0.5) { dot(cx + (kk - steps / 2) * sp, y0 + steps * sp, 8, 'g', lq); }
    lbl('transient (n, k) : 0 ≤ k ≤ n < N , k = zeros seen', cx, y0 + Nn * sp + 28, C.cyan, lq, 15);
    const aq = Q(S, 0, 'then freeze', 0.6) * f1;
    const ay = y0 + Nn * sp + 90;
    arrow(cx - 40, ay - 50, cx - 130, ay - 10, C.gold, aq, 2.5); arrow(cx + 40, ay - 50, cx + 130, ay - 10, C.mag, aq, 2.5);
    ring(cx - 160, ay + 20, 30, C.gold, aq, 3); lbl('A_E', cx - 160, ay + 27, C.gold, aq, 17); lbl('output x', cx - 160, ay + 75, C.dim, aq, 14);
    ring(cx + 160, ay + 20, 30, C.mag, aq, 3); lbl('A_P', cx + 160, ay + 27, C.mag, aq, 17); lbl('output s', cx + 160, ay + 75, C.dim, aq, 14);
    lbl('depth N : compare q̃ with 1/2', cx, ay + 27, C.white, aq, 14);
    chip(1360, 260, 840, 54, 'P( |p̂ₙ − pₙ| ≤ ε for every n ≥ 0 ) ≥ 1 − δ', C.green, q, 21);
    const cq = Q(S, 0, 'keeps every future prediction within epsilon', 0.6) * f1;
    chip(1360, 330, 840, 54, 'b = ε/2g ,  ξ = δb/4 ,  C₀ r^N / √(b(1 − b)) ≤ δ/2', C.cyan, cq, 19);
    chip(1360, 410, 840, 62, '|S| ≤ N(N + 1)/2 + 2', C.gold, lq, 28);
    const eq = Q(S, 0, 'With s one tenth', 0.6) * f1;
    box(940, 470, 840, 250, C.white, eq, 1.5, 'rgba(0,0,0,0.45)');
    lblG('s = 1/10 ,  q₀ = 1/2 ,  ε = δ = 0.05 ,  g = x − s', 1360, 515, C.white, eq, 19);
    lblG('r = ' + TABLE_097[6].toFixed(3) + ' ,  b = ' + TABLE_097[5].toFixed(4) + '  →  N* = ' + Nn + ' ,  |S| = ' + TABLE_097[1], 1360, 560, C.gold, eq, 21);
    lbl('sampled failure over 1500 steps , 8000 paths : ' + TABLE_FAIL_097.toFixed(4) + ' ≤ 0.05', 1360, 610, C.cyan, Q(S, 0, 'three hundred fifty-three states suffice', 0.6) * f1, 16);
    lbl('install table ≈ ' + TABLE_097[4] + ' bits + O(log) ;  outputs ' + TABLE_097[2] + ' + 1 bits each', 1360, 650, C.dim, eq, 15);
    lbl('construction bound , not claimed optimal', 1360, 690, C.dim, eq, 15);
  }
  const q = Q(S, 1, 'No contradiction with version thirty-two', 0.6, 0.3);
  if (q > 0) {
    chip(550, 260, 820, 56, 'V32 : every history   ·   here : bad paths of mass δ allowed', C.white, q, 19);
    lbl('a guarantee after every prefix would force accuracy on every history again', 550, 318, C.dim, q, 15);
    const fq = Q(S, 1, 'Any fixed-depth freeze needs', 0.6);
    chip(550, 410, 840, 62, 'freeze at depth N :   N ≥ log(C₀²/δ) / (2 log(1/r))', C.gold, fq, 22);
    lbl('Bayes error of any freeze :  e_N ≥ C₀² r^(2N)  (Cauchy–Schwarz)', 550, 475, C.white, fq, 16);
    const hq = Q(S, 1, 'here four point four six', 0.6);
    lbl('example : N ≥ ' + FREEZE_097[0].toFixed(2) + ' ;  least N with e_N ≤ δ is ' + FREEZE_097[1] + ' ;  the table uses ' + Nn, 550, 525, C.gold, hq, 17);
    lbl('this lower bound is for the freeze architecture only', 550, 565, C.dim, hq, 15);
    const px = 1060, py = 760, pw = 680, ph = 440, lo = -7, hi = 0, xS = n => px + n / 40 * pw, yS = v => ylog97(v, lo, hi, py, ph);
    plotAxes(px, py, pw, ph, q, 'freeze depth N', 'error (log)');
    logTicks97(px, py, ph, lo, hi, q, 1);
    path97(ENLOW_097.map((v, n) => [xS(n), yS(v)]).filter((p, n) => ENLOW_097[n] >= 1e-7), C.mag, fq, 2.5);
    EN_097.forEach((v, n) => { if (v >= 1e-7) dot(xS(n), yS(v), 5, 'c', clamp(q * 1.6 - n / 50)); });
    dashed(px, yS(0.05), px + pw, yS(0.05), C.red, q, 1.8); lbl('δ = 0.05', px + pw, yS(0.05) - 10, C.red, q, 15, 'right');
    dashed(xS(FREEZE_097[0]), py, xS(FREEZE_097[0]), py - ph, C.gold, hq, 1.5); lbl('4.46', xS(FREEZE_097[0]), py + 24, C.gold, hq, 14);
    dashed(xS(Nn), py, xS(Nn), py - ph, C.green, hq, 1.5); lbl('26', xS(Nn), py + 24, C.green, hq, 14);
    lbl('dots : exact Bayes error e_N', px + pw, py - ph + 20, C.cyan, q, 15, 'right');
    lbl('magenta : C₀² r^(2N)', px + pw, py - ph + 45, C.mag, fq, 15, 'right');
  }
};

/* ---- 07 GOLDEN NESTING (V34 §1.1–2) ---- */
SCENES.nest = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'An added relation, golden nesting', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, "the project's family", 0.6) * f1;
    chip(550, 255, 820, 54, 'A₀ = { x , x² , x³ , 1 − x³ , ρ* , 1 − ρ* } ,  ρ* = 1/(1 + x²)', C.gold, q, 18);
    chip(550, 325, 820, 54, 'g_λ(t) = t + λ h(t) ,   h = t(1 − t)(2t − 1) R(t)²', C.cyan, q, 20);
    lblG('R(t) = ∏ over A₀ of (t − a) ;  |λ| ≤ 1 : increasing , normalised , label-symmetric', 550, 385, C.dim, q, 15);
    const mq = Q(S, 0, 'matches every anchor', 0.6) * f1;
    lbl('same anchors , same pure successors , same current supply contracts', 550, 425, C.white, mq, 16);
    const dq = Q(S, 0, 'yet two members differ on an allowed event', 0.6) * f1;
    chip(550, 505, 820, 62, '|P_λ(E) − P_μ(E)| = |λ − μ| Γ(x⁴)', C.mag, dq, 25);
    lblG('Γ(t) = t(1 − t)(1 − 2t) R(t)² ,   Γ(x⁴) ≈ ' + (GX4_097 * 1e8).toFixed(2) + ' × 10⁻⁸ > 0', 550, 570, C.white, dq, 17);
    lbl('the gap lies in actual record masses on other allowed inputs', 550, 610, C.dim, dq, 15);
    const px = 1060, py = 500, pw = 680, ph = 230, xS = v => px + v * pw, yS = v => py - v * ph;
    plotAxes(px, py + ph + 30, pw, 2 * ph + 60, q, 't', '');
    line(px, py, px + pw, py, C.dim, q, 1.2);
    lbl('h(t) / max|h| ,  max|h| ≈ 7.8 × 10⁻⁷', px + pw / 2, py - ph - 40, C.cyan, q, 16);
    path97(HCURVE_097.map((v, i) => [xS(i / 240), yS(v)]), C.cyan, q, 3);
    ANCHORS_097.slice(0, 6).forEach((a, i) => { dot(xS(a), py, 8, 'g', clamp(mq * 1.6 - i / 8)); });
    lbl('gold dots : anchors , where g_λ(a) = a', px + pw, py + ph + 10, C.gold, mq, 15, 'right');
    const x4 = ANCHORS_097[6];
    dashed(xS(x4), py - ph, xS(x4), py + ph, C.mag, dq, 1.8); lbl('x⁴', xS(x4) + 8, py - ph + 16, C.mag, dq, 18, 'left');
    [0, 1].forEach(v => lbl(String(v), xS(v), py + ph + 56, C.dim, q, 14));
  }
  const q = Q(S, 1, 'An added relation, golden nesting', 0.6, 0.3);
  if (q > 0) {
    chip(550, 260, 820, 54, 'c = sup |g(1 − t) + g(t) − 1|   (complementarity)', C.cyan, q, 20);
    chip(550, 325, 820, 54, 'η = sup |g(xt) − g(x) g(t)|   (golden nesting)', C.gold, q, 20);
    const iq = Q(S, 1, 'it forces g to be the identity', 0.6);
    lbl('η = c = 0  ⇒  g(t) = t for every t ;  no continuity , measurability or monotonicity', 550, 385, C.white, iq, 15);
    const bq = Q(S, 1, 'the distance is at most phi cubed', 0.6);
    chip(550, 455, 840, 62, '‖g − id‖∞ ≤ φ³ (η + c) ≈ 4.236 (η + c)', C.green, bq, 25);
    lblG('|g(x) − x| ≤ x(η + c) ;  if g(x) = x :  ‖g − id‖∞ ≤ φ² (η + c)', 550, 520, C.white, bq, 17);
    lblG('family : g(x⁴) − g(x) g(x³) = −λ Γ(x⁴)  ⇒  exact nesting forces λ = 0', 550, 565, C.mag, bq, 16);
    lbl('t² nests exactly (η = 0) but c = 1/2 : both relations are needed', 550, 605, C.dim, bq, 15);
    lblG('finite orbit certificate : |g(t₀) − t₀| ≤ x^N + Σ x^j |Δ(t_j+1)|', 550, 645, C.dim, bq, 15);
    const px = 1060, py = 760, pw = 680, ph = 440, lo = -8, hi = 0, xS = v => px + (Math.log10(Math.max(v, 1e-12)) - lo) / (hi - lo) * pw, yS = v => ylog97(v, lo, hi, py, ph);
    plotAxes(px, py, pw, ph, q, '', '‖g − id‖∞  (log)');
    lbl('η + c  (log)', px + pw / 2, py + 54, C.dim, q, 16);
    for (let e = lo; e <= hi; e += 2) { lbl(e === 0 ? '1' : '10^' + e, xS(Math.pow(10, e)), py + 24, C.dim, q, 13); lbl(e === 0 ? '1' : '10^' + e, px - 10, yS(Math.pow(10, e)) + 5, C.dim, q, 13, 'right'); }
    path97([[xS(1e-8), yS(PHI97 ** 3 * 1e-8)], [xS(0.236), yS(1)]], C.red, bq, 2.5);
    lbl('φ³ (η + c)', xS(0.02) - 8, yS(PHI97 ** 3 * 0.02) - 12, C.red, bq, 16, 'right');
    const KC = { lam: 'm', pow: 'g', trig: 'c', anch: 'n', step: 'o' };
    NEST_PTS_097.forEach((p, i) => { if (p[1] <= 0 || p[2] <= 0) return; dot(xS(p[1]), yS(p[2]), 6, KC[p[0]], clamp(q * 1.6 - i / 200)); });
    const lg = [['g_λ family', C.mag], ['powers tᵖ', C.gold], ['smooth random', C.cyan], ['random anchors', C.green], ['step rules', C.orange]];
    lg.forEach(([s, col], i) => lbl(s, px + 20, py - ph + 20 + i * 24, col, q, 14, 'left'));
    lbl('156 sampled rules , all below the line', px + pw, py - 14, C.white, bq, 15, 'right');
  }
};

/* ---- 08 START-BLIND WINDOWS (V34 §3–4) ---- */
SCENES.window = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'So wait m rounds', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now an actual instrument within e n', 0.6) * f1;
    chip(550, 255, 820, 54, '½ ‖I_n,h(ρ_h) − J(ρ_h)‖₁ ≤ eₙ   on every actual input', C.cyan, q, 20);
    const fq = Q(S, 0, 'failures and kept carrier included', 0.6) * f1;
    lbl('all labels including failure , and the whole kept quantum carrier', 550, 310, C.dim, fq, 15);
    lblG('J : M₀ = √x E + √s P ,  M₁ = xE + √(1 − s) e^(iθ) P ,  r = √(xs) + x√(1 − s)', 550, 345, C.white, fq, 15);
    const dq = Q(S, 0, 'Its drift is at most e n', 0.6) * f1;
    chip(550, 420, 820, 54, 'drift ≤ eₙ ,   |pₙ − (x − g* qₙ)| ≤ eₙ', C.gold, dq, 22);
    lblG('E U(qₙ₊₁) ≤ r U(qₙ) + √(2eₙ)', 550, 475, C.white, dq, 18);
    const wq = Q(S, 0, 'window errors simply add', 0.6) * f1;
    chip(550, 540, 820, 54, 'window :  ½ ‖Ω_act − Ω_ref‖₁ ≤ e_m + ⋯ + e_(m+L−1)', C.mag, wq, 20);
    const cq = Q(S, 0, 'counting zeros over L rounds', 0.6) * f1;
    chip(550, 620, 820, 54, 'count zeros :  each sector misread ≤ √2 r^L', C.green, cq, 22);
    lbl('rational v̂ within 1/6 of B/(A + B) : no exact equality test', 550, 675, C.dim, cq, 15);
    const px = 1060, py = 760, pw = 680, ph = 440, lo = -5, hi = 0.2, xS = L => px + L / 40 * pw, yS = v => ylog97(v, lo, hi, py, ph);
    const aq = Q(S, 0, 'window errors simply add', 0.8) * f1;
    plotAxes(px, py, pw, ph, aq, '', 'misread probability (log)');
    logTicks97(px, py, ph, -5, 0, aq);
    lbl('window length L', px + pw / 2, py + 54, C.dim, aq, 16);
    path97(WINB_097.map((v, i) => [xS(i + 1), yS(v)]), C.red, cq, 3);
    WINE_097.forEach((v, i) => dot(xS(i + 1), yS(v), 5, 'g', clamp(cq * 1.6 - i / 50)));
    WINP_097.forEach((v, i) => dot(xS(i + 1), yS(v), 5, 'c', clamp(cq * 1.6 - i / 50)));
    lbl('red : √2 r^L', px + pw, py - ph + 20, C.red, cq, 15, 'right');
    lbl('gold : E misread , cyan : P misread (worst rounding)', px + pw, py - ph + 45, C.white, cq, 14, 'right');
    lbl('s = 1/10 , r = 0.835', px + pw, py - ph + 70, C.dim, cq, 14, 'right');
    [10, 20, 30, 40].forEach(L => lbl(String(L), xS(L), py + 24, C.dim, aq, 14));
  }
  const q = Q(S, 1, 'So wait m rounds', 0.6, 0.3);
  if (q > 0) {
    const m = 2, L = 20, cw = 34, x0 = 160, y0 = 255;
    for (let j = 0; j < m + L; j++) { const qq = clamp(q * 2 - j / 30), col = j < m ? C.dim : C.cyan; box(x0 + j * cw, y0, cw - 5, 44, col, qq, 1.5, 'rgba(0,0,0,0.45)'); if (j >= m) lbl(String(REC97[j]), x0 + j * cw + (cw - 5) / 2, y0 + 30, REC97[j] === 0 ? C.gold : C.white, qq, 17); }
    lbl('wait m = 2', x0 + cw, y0 + 72, C.dim, q, 15); lbl('read L = 20 , count zeros', x0 + (m + L / 2) * cw, y0 + 72, C.cyan, q, 15);
    const cq = Q(S, 1, 'and choose', 0.6);
    arrow(x0 + (m + L) * cw + 4, y0 + 22, x0 + (m + L) * cw + 44, y0 + 22, C.gold, cq, 2.5); lbl('C', x0 + (m + L) * cw + 62, y0 + 30, C.gold, cq, 24);
    const bq = Q(S, 1, 'the chance of ever straying by b', 0.6);
    chip(550, 420, 840, 62, 'P( |qₙ − C| ≥ b for some n ≥ m + L ) ≤ (√2 r^L + D_m) / b', C.green, bq, 20);
    const nq = Q(S, 1, 'never knowing the initial weight', 0.6);
    lbl('for every initial state ; no q₀ and no posterior values are needed', 550, 485, C.white, nq, 16);
    lblG('D_m = e_m + e_(m+1) + ⋯ < ∞', 550, 520, C.dim, bq, 16);
    const pq = Q(S, 1, 'A computable tail makes it a finite program', 0.6);
    chip(550, 600, 820, 56, 'computable tail  ⇒  states ≤ m + L(L + 1)/2 + 2', C.gold, pq, 21);
    lbl('example m = 2 , L = 20 : 214 logical states ; predictions from n ≥ m + L', 550, 655, C.dim, pq, 15);
    const bx = 1180, by = 690, hs = 1800;
    lbl('sampled vs bound', 1440, 300, C.white, bq, 18);
    [['sampled , worst start', WIN42_097[0], C.cyan], ['bound', WIN42_097[1], C.gold]].forEach(([nm, v, col], i) => { const x = bx + i * 260, h = v * hs; fillBox(x, by - h, 150, h, col, bq * 0.45); rect63(x, by - h, 150, h, col, bq, 1.8); lbl(v.toFixed(4), x + 75, by - h - 12, col, bq, 18); lbl(nm, x + 75, by + 28, C.dim, bq, 15); });
    line(bx - 20, by, bx + 450, by, C.dim, bq, 1.5);
    lbl('q₀ ∈ {0 , 0.2 , 0.5 , 0.9 , 1} , b = 1/4 , eₙ = 0.02 · 2^(−n) (flagged swap)', 1440, 765, C.dim, bq, 14);
  }
};

/* ---- 09 TWO CONDITIONS (V34 §4–5) ---- */
SCENES.limits = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Starting at time zero is different', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'paying two to the minus k minus two', 0.6) * f1;
    chip(550, 255, 820, 54, 'eₙ : pay 2^(−k−2) once when machine k is seen to halt', C.gold, q, 20);
    lbl('computable , nonnegative , Σ eₙ ≤ 1/2', 550, 310, C.dim, q, 15);
    const hq = Q(S, 0, 'a tail bound would decide halting', 0.6) * f1;
    chip(550, 380, 820, 54, 'a computable tail D̄_N → 0 would decide halting', C.red, hq, 21);
    stamp('SUMMABLE ≠ EFFECTIVE TAIL', 550, 460, hq, C.red, 28, -0.04);
    const vq = Q(S, 0, 'And vanishing errors do not freeze', 0.6) * f1;
    chip(550, 550, 820, 54, 'swap sectors with chance eₙ = 1/(n + 2) → 0 ,  U(qₙ) = 0', C.cyan, vq, 19);
    const rq = Q(S, 0, 'recur forever', 0.6) * f1;
    lblG('∏ from n₀ to M of (1 − 1/(n + 2)) = (n₀ + 1)/(M + 2) → 0', 550, 605, C.white, rq, 17);
    lbl('a two-state machine can still track the kept swap flag', 550, 645, C.dim, rq, 15);
    const px = 1060, py = 760, pw = 680, ph = 420, xS = n => px + (Math.log10(n) - 1) / (Math.log10(20000) - 1) * pw, yS = v => py - v / 11 * ph;
    plotAxes(px, py, pw, ph, vq, '', 'number of swaps so far');
    lbl('round n  (log scale)', px + pw / 2, py + 54, C.dim, vq, 16);
    const NS = [10, 100, 1000, 10000, 20000];
    path97(NS.map((n, i) => [xS(n), yS(SWAPS_H_097[i])]), C.gold, rq, 2.5);
    NS.forEach((n, i) => { dot(xS(n), yS(SWAPS_097[i]), 9, 'c', clamp(rq * 1.6 - i / 6)); if (n !== 10000) lbl(String(n), xS(n), py + 24, C.dim, vq, 13); });
    [2, 4, 6, 8, 10].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, vq, 13, 'right'));
    lbl('dots : mean swaps over 400 sampled runs', px + 20, py - ph + 20, C.cyan, rq, 15, 'left');
    lbl('gold : Σ 1/(k + 2) , grows like log n', px + 20, py - ph + 45, C.gold, rq, 15, 'left');
  }
  const q = Q(S, 1, 'Starting at time zero is different', 0.6, 0.3);
  if (q > 0) {
    const iq = Q(S, 1, 'If only an interval for q naught is known', 0.6);
    chip(550, 260, 820, 56, 'q₀ ∈ [ℓ, u] only :   ε ≥ g* (u − ℓ) / 2  at time zero', C.red, iq, 21);
    lbl('p̂₀ is one number ; p₀ = x − g* q₀ sweeps an interval of length g*(u − ℓ)', 550, 320, C.white, iq, 15);
    lbl('example [0.2 , 0.4] , s = 1/10 :  ε ≥ 0.0518', 550, 360, C.gold, iq, 17);
    const lq = Q(S, 1, 'An exact prior interval keeps its logit width', 0.6);
    chip(550, 450, 820, 56, 'logit qₙ = logit q₀ + log Λₙ :  logit width D stays fixed', C.cyan, lq, 20);
    const wq = Q(S, 1, 'so its width never exceeds', 0.6);
    chip(550, 530, 840, 62, 'sup over Λ of [T_Λ(u) − T_Λ(ℓ)] = tanh(D/4)', C.green, wq, 23);
    lbl('D = logit 0.4 − logit 0.2 = ' + WIDTHD_097[0].toFixed(3) + ' :  tanh(D/4) = ' + WIDTHD_097[1].toFixed(3), 550, 595, C.white, wq, 16);
    lbl('window guarantees start at m + L ; this barrier concerns time zero', 550, 640, C.dim, wq, 15);
    const px = 1060, py = 760, pw = 680, ph = 420, xS = l => px + (l + 8) / 16 * pw, yS = v => py - v / 0.3 * ph;
    plotAxes(px, py, pw, ph, q, '', 'interval width T_Λ(u) − T_Λ(ℓ)');
    lbl('log Λ  (accumulated likelihood ratio)', px + pw / 2, py + 54, C.dim, q, 16);
    path97(WIDTH_097.map((v, i) => [xS(-8 + i * 0.2), yS(v)]), C.cyan, lq, 3);
    dashed(px, yS(WIDTHD_097[1]), px + pw, yS(WIDTHD_097[1]), C.green, wq, 2); lbl('tanh(D/4) = 0.240', px + pw, yS(WIDTHD_097[1]) - 12, C.green, wq, 16, 'right');
    dashed(px, yS(0.2), px + pw, yS(0.2), C.dim, lq * 0.7, 1.2); lbl('start : u − ℓ = 0.2', px + 10, yS(0.2) + 22, C.dim, lq, 14, 'left');
    [-8, -4, 0, 4, 8].forEach(l => lbl(String(l), xS(l), py + 24, C.dim, q, 13));
  }
};

/* ---- 10 OVERLAP AND DECISION (V34 §6) ---- */
SCENES.risk = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'at equal priors both ends are reached', 'theory'], [1, null, 'lean']]);
  const f1 = 1 - Q(S, 1, 'The Lean kernel has frozen a related refutation', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With prior overlap C', 0.6) * f1;
    chip(550, 255, 860, 54, 'C = Σ_h √((1 − q)A_h · q B_h) ,   e_Bayes = Σ_h min{(1 − q)A_h , q B_h}', C.cyan, q, 16);
    const bq = Q(S, 0, 'the Bayes error lies between', 0.6) * f1;
    chip(550, 340, 860, 62, '(1 − √(1 − 4C²)) / 2   ≤   e_Bayes   ≤   min{C , q , 1 − q}', C.gold, bq, 21);
    lbl('classical affinity bounds (Cauchy–Schwarz)', 550, 400, C.dim, bq, 15);
    const eq = Q(S, 0, 'at equal priors both ends are reached', 0.6) * f1;
    lblG('equal priors , R = Σ √(A B) :   (1 − √(1 − R²))/2 ≤ e ≤ R/2', 550, 450, C.white, eq, 18);
    lblG('lower end :  A = ((1 + t)/2 , (1 − t)/2) ,  B reversed ,  t = √(1 − R²)', 550, 490, C.gold, eq, 15);
    lblG('upper end :  A = (1 − R , R , 0) ,  B = (0 , R , 1 − R)', 550, 525, C.cyan, eq, 15);
    const sq = Q(S, 0, 'for every overlap', 0.6) * f1;
    stamp('SAME CLOCK , DIFFERENT ERRORS', 550, 620, sq, C.red, 28, -0.04);
    const px = 1060, py = 760, pw = 680, ph = 420, xS = R => px + R * pw, yS = v => py - v / 0.55 * ph;
    plotAxes(px, py, pw, ph, bq, '', 'Bayes error');
    lbl('overlap R  (equal priors)', px + pw / 2, py + 54, C.dim, bq, 16);
    const lowP = [], upP = [];
    for (let i = 0; i <= 60; i++) { const R = i / 60; lowP.push([xS(R), yS((1 - Math.sqrt(1 - R * R)) / 2)]); upP.push([xS(R), yS(R / 2)]); }
    fillPoly(lowP.concat(upP.slice().reverse()), C.vio, bq * 0.18);
    path97(lowP, C.gold, bq, 3); path97(upP, C.cyan, bq, 3);
    BAYES_097.forEach((r, i) => { dot(xS(r[0]), yS(r[1]), 7, 'g', clamp(eq * 1.6 - i / 14)); dot(xS(r[0]), yS(r[2]), 7, 'c', clamp(eq * 1.6 - i / 14)); });
    lbl('upper end R/2', xS(0.3), yS(0.15) - 22, C.cyan, bq, 15, 'right');
    lbl('lower end (1 − √(1 − R²))/2', xS(0.98), yS(0.035), C.gold, bq, 15, 'right');
    [0, 0.5, 1].forEach(R => lbl(String(R), xS(R), py + 24, C.dim, bq, 13));
    [0.25, 0.5].forEach(v => lbl(String(v), px - 10, yS(v) + 5, C.dim, bq, 13, 'right'));
  }
  const q = Q(S, 1, 'The Lean kernel has frozen a related refutation', 0.6, 0.3);
  if (q > 0) {
    const mq = Q(S, 1, 'for a full-rank three by three pair', 0.6);
    lblG('ρ = (1/20) ·', 230, 300, C.cyan, mq, 20, 'center');
    mgrid(310, 255, [[2, 1, 1], [1, 10, 1], [1, 1, 8]], 56, 40, mq, { size: 18, colf: () => C.cyan });
    lblG('σ = (1/40) ·', 640, 300, C.gold, mq, 20, 'center');
    mgrid(720, 255, [[16, 4, 2], [4, 20, 1], [2, 1, 4]], 56, 40, mq, { size: 18, colf: () => C.gold });
    lblG('σ = D ρ D ,  D = diag(2 , 1 , 1/2) = fidelity observable', 550, 430, C.white, mq, 17);
    lbl('ordered basis : likelihood ratios 4 > 1 > 1/4', 550, 465, C.dim, mq, 15);
    const rq = Q(S, 1, 'first ROC point is not optimal', 0.6);
    stamp('FIRST ROC POINT NOT OPTIMAL', 550, 550, rq, C.red, 30, -0.04);
    lbl('D5/S3/Quantum/Measurement/FidelityMeasurementROCRefutation', 550, 630, C.green, rq, 15);
    lbl('theorem result : ¬ claim  (frozen state at the subject commit)', 550, 660, C.green, rq, 15);
    const tq = Q(S, 1, 'a projection along thirty-seven, two, minus three', 0.6);
    const tx = 1010, ty = 260, cws = [300, 220, 260];
    const rows = [['effect', 'false pos. Tr(Fρ)', 'true pos. Tr(Fσ)', C.dim], ['first coordinate', '1/10', '2/5', C.cyan], ['F* = v vᵀ / 1382', '1/10', '5539/13820', C.gold]];
    rows.forEach((r, i) => { let x = tx; for (let j = 0; j < 3; j++) { box(x, ty + i * 70, cws[j] - 8, 58, r[3], tq, 1.5, 'rgba(0,0,0,0.45)'); lblG(r[j], x + (cws[j] - 8) / 2, ty + i * 70 + 37, i === 0 ? C.white : r[3], tq, i === 0 ? 15 : 19); x += cws[j]; } });
    lblG('v = (37 , 2 , −3) ,  ‖v‖² = 1382 ,  F* a projection', 1400, 500, C.white, tq, 17);
    const gq = Q(S, 1, 'gains eleven over thirteen thousand eight hundred twenty', 0.6);
    chip(1400, 575, 760, 62, 'true-positive gain  11/13820 ≈ 7.96 × 10⁻⁴', C.green, gq, 22);
    lbl('it does not formalise the golden closure or the finite observers', 1400, 640, C.dim, gq, 15);
  }
};

/* ---- 11 COSTS AND CLOCKS (V33 §8 , V34 §7) ---- */
SCENES.clocks = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Clocks are separate contracts', 0.6);
  if (f1 > 0) {
    const tq = Q(S, 0, 'In the typed cocycle family', 0.6) * f1;
    box(150, 250, 780, 300, C.cyan, tq, 2, 'rgba(0,30,40,0.4)'); lbl('TYPED COCYCLE (project §25)', 540, 295, C.cyan, tq, 19);
    lblG('C_stat(X_N) = 2', 540, 355, C.white, tq, 26); lblG('F(X_N) = N', 540, 410, C.white, tq, 26); lblG('C_on(X_N) ≤ 2N   (N ≥ 3)', 540, 465, C.white, tq, 24);
    lbl('F : min–max fibre width for faithful tracking ; 2N is only an upper bound', 540, 520, C.dim, tq, 14);
    const aq = Q(S, 0, 'at the actual-cut entry', 0.6) * f1;
    box(990, 250, 780, 300, C.gold, aq, 2, 'rgba(40,30,0,0.4)'); lbl('ACTUAL CUT (project §§37–39)', 1380, 295, C.gold, aq, 19);
    lblG('answer f(s) = U_s(2) : two kept values', 1380, 355, C.white, aq, 22);
    const wq = Q(S, 0, 'every correct run submits a word longer than n over two', 0.6) * f1;
    lblG('M(s, n) > n/2 ,   W(s, n) > n/2', 1380, 425, C.white, wq, 26);
    lbl('every deterministic total-correct run ; M = longest word , W = total length', 1380, 480, C.dim, wq, 14);
    lbl('a price of that entry , not a time bound for the QND readout', 1380, 520, C.dim, wq, 14);
    stamp('SMALL ANSWERS DO NOT REFUND COSTS', W / 2, 650, wq, C.red, 32, -0.03);
  }
  const q = Q(S, 1, 'Clocks are separate contracts', 0.6, 0.3);
  if (q > 0) {
    const iq = Q(S, 1, 'The golden information clock reads n log phi', 0.6), eq = Q(S, 1, 'an execution clock adds native word lengths', 0.6);
    const pw = 640, ph = 330;
    [[180, 'information clock Tₙ = n log φ', CLOCK_INFO_097, 8.5, C.gold, iq], [1040, 'execution clock Gₙ = L₀ + ⋯ + Lₙ₋₁', CLOCK_EXEC_097, 85, C.cyan, eq]].forEach(([px, ttl, arr, top, col, qq]) => {
      const py = 640, xS = n => px + 20 + n / 16 * (pw - 40), yS = v => py - v / top * ph;
      plotAxes(px, py, pw, ph, qq, 'round n', ttl);
      for (let n = 0; n < 16; n++) { const x = xS(n), x2 = xS(n + 1), qq2 = clamp(qq * 1.6 - n / 20); line(x, yS(arr[n]), x2, yS(arr[n]), col, qq2, 3); line(x2, yS(arr[n]), x2, yS(arr[n + 1]), col, qq2, 3); }
    });
    lbl('steps of log φ ≈ 0.481', 500, 330, C.gold, iq, 16);
    lbl('sample word lengths 3 , 3 , 3 , 4 , 4 , 4 , 5 …', 1360, 330, C.cyan, eq, 16);
    const rq = Q(S, 1, 'their ratio is log phi over L', 0.6);
    chip(W / 2, 715, 1100, 56, 'fixed length L :  Tₙ / Gₙ = log φ / L ;   V34 reference :  T_L = L log(1/r) ,  G_N = Σ L_j', C.white, rq, 19);
    const nq = Q(S, 1, 'Neither is yet physical proper time', 0.6);
    stamp('NOT YET PHYSICAL PROPER TIME', W / 2, 800, nq, C.red, 28, -0.03);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The affinity bounds are classical', 'classical'], [1, 'the ROC refutation is a frozen Lean theorem', 'lean'], [1, 'the stability bound', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['ODDS', 'same effects', C.red, 'Odds without successors'], ['CLOCK', 'Tₙ = n log φ', C.gold, 'a log phi clock'], ['SQUARE SUM', 'Σ gₙ² = ∞', C.cyan, 'a square-sum test'], ['CERTIFICATES', 'wrong ≤ α', C.green, 'stopping certificates'], ['TABLE', 'N(N + 1)/2 + 2', C.vio, 'a finite table'], ['NESTING', 'φ³ (η + c)', C.mag, 'golden nesting'], ['WINDOWS', '(√2 r^L + D_m)/b', C.cyan, 'start-blind windows'], ['CONDITIONS', 'tail · freeze', C.red, 'two conditions'], ['OVERLAP', 'one R , many errors', C.gold, 'overlap versus decision'], ['COSTS', 'M > n/2', C.green, 'costs that small answers keep']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 230 + (i % 5) * 365, y = 240 + Math.floor(i / 5) * 140, q = Q(S, 0, ph) * fade; box(x - 160, y, 320, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 45, col, q, 19); lblG(a2, x, y + 92, C.white, q, 20); });
    lbl('CLASSICAL · Bayes affinity bounds · martingale maximal inequality · Markov · Cauchy–Schwarz · logistic Bayes update', W / 2, 560, '#8fbcff', Q(S, 1, 'The affinity bounds are classical') * fade, 15);
    lbl('LEAN · FidelityMeasurementROCRefutation : result : ¬ claim (frozen)', W / 2, 600, C.green, Q(S, 1, 'the ROC refutation is a frozen Lean theorem') * fade, 16);
    lbl('PROJECT · quantum continuation II §§115–120 · typed cocycle §25 · actual cut §§37–39', W / 2, 640, C.cyan, Q(S, 1, 'come from other project volumes') * fade, 15);
    lbl('VOLUMES · ray bound · overlap clock · square-sum test · certificates · table · golden closure · windows · tails · barrier', W / 2, 680, C.orange, Q(S, 1, 'the rest is argued in the theory volumes') * fade, 14);
    lbl('RECOMPUTED · κ₀ = x/2 · xⁿ law · R∞ = 1/√2 · 5 rounds · N* = 26 , 353 states · Γ(x⁴) · 156 rules · √2 r^L · tanh(D/4) · 11/13820', W / 2, 720, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V33–V34 · CLOCKS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V33–V34 · 信息钟与稳健有限观察者 · TRURETURING FILM 097', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('An overlap clock, stopping certificates, a golden nesting, and finite tables for the whole future.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V33–V34', calib: 'ODDS AND SUCCESSORS', clock: 'INFORMATION CLOCK', weak: 'SQUARE-SUM TEST', cert: 'STOPPING CERTIFICATES', table: 'FINITE TABLE', nest: 'GOLDEN NESTING', window: 'START-BLIND WINDOWS', limits: 'TWO CONDITIONS', risk: 'OVERLAP AND DECISION', clocks: 'COSTS AND CLOCKS', finale: 'LEDGER' });

function poster097() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('E U(qₙ) = U(q₀) xⁿ ,  Tₙ = n log φ', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('‖g − id‖ ≤ φ³ (η + c)', 1320, 480, { size: 46, fam: FG, w: 700, align: 'center', c: C.white });
  txt('|S| ≤ N(N + 1)/2 + 2', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC V33–V34', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V33–V34 · CLOCKS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('信 息 钟 · 稳 健 有 限 观 察 者', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 097', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster097;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
