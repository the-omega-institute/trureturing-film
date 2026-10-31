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

/* ---- film 074: AURIC–E8 · compatible extensions and observation ---- */
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
const _po074 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po074.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po074.set(key, off); }
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
/* ---- film 074 data (generated from vis074.json by mkdata074.py) ---- */
const PET074 = [[0.7292,-0.23693,0],[0.15941,-0.74997,0],[-0.41038,-0.23693,0],[0.15941,0.17704,0],[0.56979,-0.41397,0],[-0.0,-0.92701,0],[-0.56979,-0.41397,0],[1.13957,-0.0,0],[0.56979,-0.51304,0],[0.56979,0.51304,0],[-0.664,-0.38336,0],[0.0,-0.76672,0],[-0.42577,-0.38336,0],[-0.19274,0.14003,0],[-0.47126,-0.52339,0],[0.19274,-0.90675,0],[-0.23303,-0.52339,0],[-0.23824,0.0,0],[0.42577,-0.38336,0],[-0.664,0.38336,0],[0.664,-0.38336,0],[-0.42577,0.38336,0],[0.23824,-0.0,0],[0.23303,0.52339,0],[-0.19274,0.90675,0],[0.47126,0.52339,0],[0.19274,-0.14003,0],[0.42577,0.38336,0],[-0.0,0.76672,0],[0.664,0.38336,0],[-0.56979,-0.51304,0],[-0.56979,0.51304,0],[-1.13957,0.0,0],[0.56979,0.41397,0],[0.0,0.92701,0],[-0.56979,0.41397,0],[-0.15941,-0.17704,0],[0.41038,0.23693,0],[-0.15941,0.74997,0],[-0.7292,0.23693,0],[0.45067,-0.62029,1],[0.0249,-0.23693,1],[0.6889,-0.62029,1],[0.25793,0.28646,1],[0.92193,-0.0969,1],[0.49617,0.28646,1],[0.45067,0.14643,1],[1.11467,-0.23693,1],[0.6889,0.14643,1],[0.92193,0.66982,1],[-0.11912,-1.13333,1],[-0.54488,-0.74997,1],[0.11912,-1.13333,1],[-0.31185,-0.22658,1],[0.35215,-0.60994,1],[-0.07362,-0.22658,1],[-0.11912,-0.36661,1],[0.54488,-0.74997,1],[0.11912,-0.36661,1],[0.35215,0.15679,1],[-0.6889,-0.62029,1],[-1.11467,-0.23693,1],[-0.45067,-0.62029,1],[-0.88164,0.28646,1],[-0.21764,-0.0969,1],[-0.6434,0.28646,1],[-0.6889,0.14643,1],[-0.0249,-0.23693,1],[-0.45067,0.14643,1],[-0.21764,0.66982,1],[-0.11912,-0.20632,1],[-0.54488,0.17704,1],[0.11912,-0.20632,1],[-0.31185,0.70044,1],[0.35215,0.31707,1],[-0.07362,0.70044,1],[-0.11912,0.5604,1],[0.54488,0.17704,1],[0.11912,0.5604,1],[0.35215,1.0838,1],[-0.27853,-0.38336,1],[-0.70429,0.0,1],[-0.04029,-0.38336,1],[-0.47126,0.52339,1],[0.19274,0.14003,1],[-0.23303,0.52339,1],[-0.27853,0.38336,1],[0.38547,-0.0,1],[-0.04029,0.38336,1],[0.19274,0.90675,1],[0.37705,-0.84687,2],[0.56979,-0.9869,2],[0.80282,-0.46351,2],[0.37705,-0.08014,2],[1.04105,-0.46351,2],[-0.19274,-0.33383,2],[-0.0,-0.47386,2],[0.23303,0.04953,2],[-0.19274,0.43289,2],[0.47126,0.04953,2],[-0.76252,-0.84687,2],[-0.56979,-0.9869,2],[-0.33676,-0.46351,2],[-0.76252,-0.08014,2],[-0.09852,-0.46351,2],[0.37705,0.08014,2],[0.56979,-0.05989,2],[0.80282,0.46351,2],[0.37705,0.84687,2],[1.04105,0.46351,2],[-0.19274,-0.43289,2],[-0.0,-0.57292,2],[0.23303,-0.04953,2],[-0.19274,0.33383,2],[0.47126,-0.04953,2],[-0.76252,0.08014,2],[-0.56979,-0.05989,2],[-0.33676,0.46351,2],[-0.76252,0.84687,2],[-0.09852,0.46351,2],[0.21764,-0.0969,2],[0.41038,-0.23693,2],[0.6434,0.28646,2],[0.21764,0.66982,2],[0.88164,0.28646,2],[-0.35215,-0.60994,2],[-0.15941,-0.74997,2],[0.07362,-0.22658,2],[-0.35215,0.15679,2],[0.31185,-0.22658,2],[-0.92193,-0.0969,2],[-0.7292,-0.23693,2],[-0.49617,0.28646,2],[-0.92193,0.66982,2],[-0.25793,0.28646,2],[-0.35215,0.31707,2],[-0.15941,0.17704,2],[0.07362,0.70044,2],[-0.35215,1.0838,2],[0.31185,0.70044,2],[-0.31185,-0.70044,3],[0.35215,-1.0838,3],[-0.07362,-0.70044,3],[0.15941,-0.17704,3],[0.35215,-0.31707,3],[0.25793,-0.28646,3],[0.92193,-0.66982,3],[0.49617,-0.28646,3],[0.7292,0.23693,3],[0.92193,0.0969,3],[-0.31185,0.22658,3],[0.35215,-0.15679,3],[-0.07362,0.22658,3],[0.15941,0.74997,3],[0.35215,0.60994,3],[-0.88164,-0.28646,3],[-0.21764,-0.66982,3],[-0.6434,-0.28646,3],[-0.41038,0.23693,3],[-0.21764,0.0969,3],[0.09852,-0.46351,3],[0.76252,-0.84687,3],[0.33676,-0.46351,3],[0.56979,0.05989,3],[0.76252,-0.08014,3],[-0.47126,0.04953,3],[0.19274,-0.33383,3],[-0.23303,0.04953,3],[0.0,0.57292,3],[0.19274,0.43289,3],[-1.04105,-0.46351,3],[-0.37705,-0.84687,3],[-0.80282,-0.46351,3],[-0.56979,0.05989,3],[-0.37705,-0.08014,3],[0.09852,0.46351,3],[0.76252,0.08014,3],[0.33676,0.46351,3],[0.56979,0.9869,3],[0.76252,0.84687,3],[-0.47126,-0.04953,3],[0.19274,-0.43289,3],[-0.23303,-0.04953,3],[0.0,0.47386,3],[0.19274,0.33383,3],[-1.04105,0.46351,3],[-0.37705,0.08014,3],[-0.80282,0.46351,3],[-0.56979,0.9869,3],[-0.37705,0.84687,3],[-0.19274,-0.90675,4],[0.04029,-0.38336,4],[-0.38547,0.0,4],[0.27853,-0.38336,4],[0.23303,-0.52339,4],[-0.19274,-0.14003,4],[0.47126,-0.52339,4],[0.04029,0.38336,4],[0.70429,-0.0,4],[0.27853,0.38336,4],[-0.35215,-1.0838,4],[-0.11912,-0.5604,4],[-0.54488,-0.17704,4],[0.11912,-0.5604,4],[0.07362,-0.70044,4],[-0.35215,-0.31707,4],[0.31185,-0.70044,4],[-0.11912,0.20632,4],[0.54488,-0.17704,4],[0.11912,0.20632,4],[0.21764,-0.66982,4],[0.45067,-0.14643,4],[0.0249,0.23693,4],[0.6889,-0.14643,4],[0.6434,-0.28646,4],[0.21764,0.0969,4],[0.88164,-0.28646,4],[0.45067,0.62029,4],[1.11467,0.23693,4],[0.6889,0.62029,4],[-0.35215,-0.15679,4],[-0.11912,0.36661,4],[-0.54488,0.74997,4],[0.11912,0.36661,4],[0.07362,0.22658,4],[-0.35215,0.60994,4],[0.31185,0.22658,4],[-0.11912,1.13333,4],[0.54488,0.74997,4],[0.11912,1.13333,4],[-0.92193,-0.66982,4],[-0.6889,-0.14643,4],[-1.11467,0.23693,4],[-0.45067,-0.14643,4],[-0.49617,-0.28646,4],[-0.92193,0.0969,4],[-0.25793,-0.28646,4],[-0.6889,0.62029,4],[-0.0249,0.23693,4],[-0.45067,0.62029,4]];
const MINN074 = [[1,0.8,5],[2,1.2,10],[3,1.2,10],[4,0.8,5]];
const QT074 = [[0,1,4,4,1],[1,2,0,0,2],[4,0,3,3,0],[4,0,3,3,0],[1,2,0,0,2]];
const CART074 = [[2,-1,0,0,0,0,0,0],[-1,2,-1,0,0,0,0,0],[0,-1,2,-1,0,0,0,-1],[0,0,-1,2,-1,0,0,0],[0,0,0,-1,2,-1,0,0],[0,0,0,0,-1,2,-1,0],[0,0,0,0,0,-1,2,0],[0,0,-1,0,0,0,0,2]];
const ROOTC074 = [40,50,50,50,50];
const ADE074 = [["A8",72],["D8",112],["E8",240]];
const COSP074 = [1.0,0.65451,0.09549,0.09549,0.65451];
const SDP074 = [[1,0.2,0.2],[2,0.37785,0.37785],[3,0.59173,0.59173],[4,0.66798,0.66798],[5,0.77106,0.77106],[1,0.2,0.2],[2,0.37557,0.37557],[3,0.53653,0.53653],[4,0.66394,0.66394],[5,0.83323,0.83323],[1,0.2,0.2],[2,0.4,0.4],[3,0.6,0.6],[4,0.8,0.8]];
const CELLS074 = {"paired":{"eta":[0,0,0,0,0,0,0,0,0],"sum":0,"solvable":true,"eta2":[3,4,2,0,1,3,1,1,0]},"trivial":{"eta":[1,1,1,1,1,1,1,1,1],"sum":4,"solvable":false,"eta2":[3,2,4,0,2,1,0,1,1]}};
const GE8074 = [49,59,86,98,110,136,148,160,186,198,210,237,247,248];
const G25074 = [49,97,624];
const COST074 = [48,97,146,195,244,293,342];
const FIB074 = [[1,-1,-0.61803],[2,-1,0.38197],[3,-2,-0.23607],[5,-3,0.1459],[8,-5,-0.09017],[13,-8,0.05573],[21,-13,-0.03444],[34,-21,0.02129],[55,-34,-0.01316],[89,-55,0.00813]];
const HD074 = [0.38197,0.47214,0.43769,0.36068,0.45085,0.54102,0.3901,0.44582,0.50155,0.55728,0.37886,0.4133,0.44774,0.48219,0.51663,0.55107,0.36187,0.38315,0.40444,0.42572,0.44701,0.4683,0.48958,0.51087,0.53216,0.55344,0.57473,0.36836,0.38151,0.39467,0.40782,0.42098,0.43414,0.44729,0.46045,0.4736,0.48676,0.49991,0.51307,0.52622,0.53938,0.55254,0.56569,0.57885,0.36588,0.37401,0.38214,0.39027,0.3984,0.40653,0.41466,0.42279,0.43092,0.43905,0.44718,0.45531,0.46345,0.47158,0.47971,0.48784,0.49597,0.5041,0.51223,0.52036,0.52849,0.53662,0.54475,0.55288,0.56101,0.56914,0.57727,0.3618,0.36682,0.37185,0.37687,0.3819,0.38692,0.39195,0.39697,0.402,0.40702,0.41205,0.41707,0.4221,0.42712,0.43215,0.43717,0.4422,0.44722,0.45225,0.45727,0.4623,0.46732,0.47235,0.47737,0.4824,0.48742,0.49245,0.49747,0.5025,0.50752,0.51255,0.51757,0.5226,0.52762,0.53265,0.53767,0.5427,0.54772,0.55275,0.55777,0.5628,0.56782,0.57285,0.57787,0.5829,0.36336,0.36646,0.36957,0.37267,0.37578,0.37889,0.38199,0.3851,0.3882,0.39131,0.39441,0.39752,0.40062,0.40373,0.40684,0.40994,0.41305,0.41615,0.41926,0.42236,0.42547,0.42858,0.43168,0.43479,0.43789,0.441,0.4441,0.44721,0.45031,0.45342,0.45653,0.45963,0.46274,0.46584];
const JOINT074 = [[-2.0,-2.0],[-2.61803,-0.38197],[-1.0,-1.0],[0.61803,-1.61803],[-1.61803,0.61803],[0.0,0.0],[1.61803,-0.61803],[-0.61803,1.61803],[1.0,1.0],[2.61803,0.38197],[2.0,2.0]];
const WLAT074 = [[0.61803,-1.61803],[2.23607,-2.23607],[0.0,0.0],[1.61803,-0.61803],[3.23607,-1.23607],[4.8541,-1.8541],[6.47214,-2.47214],[1.0,1.0],[2.61803,0.38197],[4.23607,-0.23607],[5.8541,-0.8541],[7.47214,-1.47214],[9.09017,-2.09017],[2.0,2.0],[3.61803,1.38197],[5.23607,0.76393],[6.8541,0.1459],[8.47214,-0.47214],[10.09017,-1.09017],[11.7082,-1.7082],[4.61803,2.38197],[6.23607,1.76393],[7.8541,1.1459],[9.47214,0.52786],[11.09017,-0.09017],[8.8541,2.1459],[10.47214,1.52786],[12.09017,0.90983],[11.47214,2.52786]];
const WPTS074 = [[0.0,0.0],[1.0,1.0],[1.61803,-0.61803],[2.61803,0.38197],[4.23607,-0.23607],[5.23607,0.76393],[5.8541,-0.8541],[6.8541,0.1459],[8.47214,-0.47214],[9.47214,0.52786],[11.09017,-0.09017],[12.09017,0.90983]];
const GAPV074 = [0.61803,1.0,1.61803];
const LIP074 = [1.61803,3.17082];
const WSM074 = [0.0,2.61803,4.23607,6.8541,11.09017];
const SEL074 = [[3,0,0,0,0],[0,0,1,2,0],[0,2,0,0,1],[0,1,0,0,2],[0,0,2,1,0]];
const READ074 = [[1.0,0.0,0.0,0.0,0.0],[0.0,1.0,0.0,0.0,0.0],[0.0,0.0,1.0,0.0,0.0],[0.0,0.0,0.0,1.0,0.0],[0.0,0.0,0.0,0.0,1.0]];
/* ---- film 074 helpers ---- */
const GC074 = [C.white, C.gold, C.mag, C.green, C.cyan], GD074 = ['w', 'g', 'm', 'n', 'c'];
const PETR074 = Math.max(...PET074.map(p => Math.hypot(p[0], p[1])));
function ell074(cx, cy, rx, ry, col, a, lw = 1.5, rot = 0, dash = 0) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([8, 7]); ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(rx, 0.1), Math.max(ry, 0.1), rot, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function cell074(x, y, w, h, s, col, a, size = 20, fillA = 0.35, tc = C.white) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lblG(s, x + w / 2, y + h / 2 + size * 0.35, tc, a, size); }
/* the 240 E8 roots in the Coxeter plane, coloured by glue class */
function pet074(cx, cy, R, a, rot = 0, o = {}) {
  if (a <= 0) return;
  const c = Math.cos(rot), s = Math.sin(rot);
  if (o.rings !== false) for (let k = 1; k <= 8; k++) ring(cx, cy, R * k / 8.6, C.dim, a * 0.12, 1);
  PET074.forEach((p, i) => {
    const x = p[0] / PETR074, y = p[1] / PETR074, X = cx + R * (x * c - y * s), Y = cy + R * (x * s + y * c);
    const q = o.prog == null ? 1 : clamp(o.prog * 1.5 - i / 480), hi = o.hi == null ? 1 : (o.hi === p[2] ? 1 : 0.15);
    dot(X, Y, o.r || 7, GD074[p[2]], a * q * hi);
  });
}
/* an F5 x F5 grid: cell (a, b) with a to the right, b upward */
function f5grid074(x0, y0, cw, a, cellf) {
  if (a <= 0) return;
  for (let p = 0; p < 5; p++) for (let q = 0; q < 5; q++) { const x = x0 + p * cw, y = y0 + (4 - q) * cw; cellf(p, q, x, y); }
  for (let p = 0; p < 5; p++) { lbl(String(p), x0 + p * cw + cw / 2, y0 + 5 * cw + 28, C.dim, a, 17); lbl(String(p), x0 - 22, y0 + (4 - p) * cw + cw / 2 + 6, C.dim, a, 17); }
}
function logy074(v, lo, hi, py, ph) { return py - (Math.log10(v) - lo) / (hi - lo) * ph; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  pet074(480, 500, 290, s0, t * 0.04, { prog: clamp(u / 3) });
  lbl('the 240 roots of E8 in the Coxeter plane , coloured by glue class', 480, 815, C.dim, s0, 15);
  const iq = Q(S, 0, 'Two five-mode interfaces', 0.6);
  lbl('two five-mode interfaces  V , W ≅ ℂ⁵ ,  charges A₄ ⊕ A₄', 480, 235, C.cyan, iq, 18);
  const items = [['Which integral extensions exist', 'INTEGRAL EXTENSIONS', 'A₄ ⊕ A₄ ⊂ Γ ⊂ (A₄ ⊕ A₄)*', C.gold], ['which phases can an observer see', 'CENTRAL PHASES', 'what the allowed effects can see', C.mag], ['when do local data glue', 'GLOBAL LIFTS', 'o₁ + 2o₂ ∈ H²( − ; F₅)', C.green], ['what can a golden readout recover', 'GOLDEN READOUT', 'a + φb under finite precision', C.cyan]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 27); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pet074(W / 2, 410, 220, rp, t * 0.04);
  chip(330, 340, 330, 58, 'integral glue', C.gold, rp, 22); chip(330, 425, 330, 58, 'central phase', C.mag, rp, 22); chip(330, 510, 330, 58, 'global lifts', C.green, rp, 22);
  box(1420, 330, 380, 200, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('golden readout', 1610, 395, C.cyan, rp, 22); lblG('a + φb , window W', 1610, 460, C.white, rp, 28);
  txt(scramble('AURIC–E8 · EXTENSIONS', rp, 474), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC–E8 · 相 容 扩 张 与 观 察 理 论', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 074 · AURIC_E8_COMPATIBLE_EXTENSIONS_AND_OBSERVATION_THEORY', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 GLUE ---- */
SCENES.glue = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A nonzero glue vector', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Take two A four root lattices', 0.6) * f1;
    chip(540, 260, 840, 58, 'Q = A₄ = {x ∈ ℤ⁵ : Σ xᵢ = 0} ,  L₀ = Q ⊕ Q', C.cyan, q, 22);
    lbl('orthogonal sum , equal scale , roots of norm 2', 540, 318, C.dim, q, 15);
    const dq = Q(S, 0, 'Each has discriminant group F five', 0.6) * f1;
    lbl('det Q = 5 ,  20 roots ,  Q*/Q ≅ F₅ generated by ω₁', 540, 360, C.white, dq, 18);
    MINN074.forEach(([k, mn, cnt], i) => { const x = 175 + i * 185, qq = clamp(dq * 1.6 - i / 5); box(x, 385, 170, 112, GC074[k], qq, 1.8, 'rgba(0,0,0,0.45)'); lbl('class ' + k, x + 85, 413, GC074[k], qq, 16); lblG('min ' + ['', '4/5', '6/5', '6/5', '4/5'][k], x + 85, 448, C.white, qq, 20); lbl('× ' + cnt + ' vectors', x + 85, 480, C.dim, qq, 15); });
    lbl('class k : min norm k(5 − k)/5 , attained C(5, k) times (recomputed)', 540, 525, C.dim, dq, 14);
    const pq = Q(S, 0, 'with pairing four a a prime over five', 0.6) * f1;
    chip(540, 580, 840, 58, 'B(a, a′) = 4aa′/5  mod ℤ', C.gold, pq, 24);
    const iq = Q(S, 0, 'lies between the lattice and its dual', 0.6) * f1;
    chip(540, 670, 840, 58, 'L₀ ⊂ L ⊂ L₀*  ⇒  C = L/L₀ ⊂ F₅² isotropic', C.green, iq, 22);
    lbl('integral pairings  ⇔  4(aa′ + bb′)/5 ∈ ℤ on all of C', 540, 728, C.dim, iq, 15);
  }
  const q1 = Q(S, 1, 'A nonzero glue vector', 0.6, 0.3);
  if (q1 > 0) {
    chip(540, 260, 840, 58, 'a² + b² ≡ 0 (mod 5) ,   a = 0  ⇒  b = 0', C.white, q1, 23);
    const rq = Q(S, 1, 'so b over a, squared, is minus one', 0.6);
    chip(540, 345, 840, 58, '(b/a)² = −1 = 4   ⇒   b/a = ±2', C.gold, rq, 25);
    const lq = Q(S, 1, 'Exactly two lines survive', 0.6);
    lbl('the six lines of F₅² :', 540, 410, C.dim, lq, 15);
    [['b = 0', 0], ['b = a', 0], ['b = 2a', 1], ['b = 3a', 2], ['b = 4a', 0], ['a = 0', 0]].forEach(([s, k], i) => { const col = k === 1 ? C.gold : k === 2 ? C.cyan : C.dim; cell074(150 + i * 135, 425, 122, 50, s, col, clamp(lq * 1.5 - i / 8), 17, k ? 0.35 : 0.12, k ? C.white : C.dim); });
    const sq = Q(S, 1, 'b equals plus or minus two a', 0.6);
    chip(540, 540, 840, 54, 'Γ₊ = L₀ + ℤ(ω₁, ω₂) ,  C₊ = {(a, 2a)}', C.gold, sq, 22);
    chip(540, 605, 840, 54, 'Γ₋ = L₀ + ℤ(ω₁, ω₃) ,  C₋ = {(a, −2a)}', C.cyan, sq, 22);
    const xq = Q(S, 1, 'two marked extensions of index five', 0.6);
    stamp('EXACTLY TWO', 540, 705, xq, C.gold, 34, -0.04);
    lbl('index 5 ; (x, y) ↦ (x, −y) swaps them , but not as marked extensions', 540, 790, C.dim, xq, 15);
  }
  const gq = Q(S, 0, 'Each has discriminant group F five', 0.6);
  if (gq > 0) {
    const x0 = 1180, y0 = 285, cw = 92;
    lbl('F₅² ,  q(a, b) = a² + b²  mod 5', 1410, 255, C.white, gq, 19);
    const vq = Q(S, 0, 'an isotropic subspace of F five squared', 0.6), zq = Q(S, 1, 'to vanish mod five', 0.6), lq = Q(S, 1, 'b equals plus or minus two a', 0.6);
    const onP = (p, qq) => (2 * p) % 5 === qq, onM = (p, qq) => (3 * p) % 5 === qq;
    f5grid074(x0, y0, cw, gq, (p, qq, x, y) => {
      const v = QT074[p][qq], z = v === 0;
      const col = lq > 0 && z ? (p === 0 ? C.green : onP(p, qq) ? C.gold : C.cyan) : C.dim;
      box(x + 4, y + 4, cw - 8, cw - 8, col, gq, 1.4, lq > 0 && z ? rgba(col, 0.28 * lq) : 'rgba(0,0,0,0.45)');
      lblG(String(v), x + cw / 2, y + cw / 2 + 9, z ? C.white : C.dim, vq, 26);
      if (z && zq > 0) ring(x + cw / 2, y + cw / 2, 30, C.white, zq * (1 - lq * 0.6), 2.5);
    });
    lbl('a →', x0 + 5 * cw + 40, y0 + 5 * cw + 28, C.dim, gq, 16); lbl('b ↑', x0 - 22, y0 - 14, C.dim, gq, 16);
    lbl('gold : b = 2a   cyan : b = −2a   green : 0', 1410, y0 + 5 * cw + 70, C.white, lq, 16);
    lbl('9 zeros = {0} ∪ two lines', 1410, y0 + 5 * cw + 100, C.dim, zq, 15);
  }
};

/* ---- 03 AUTOMATIC E8 ---- */
SCENES.eight = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'Rank-eight simply laced systems', 'classical'], [1, 'so this is E8', 'theory']]);
  const f1 = 1 - Q(S, 1, 'Count roots', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Five times any new vector lies in the even lattice', 0.6) * f1;
    chip(540, 270, 840, 58, 'x ∈ Γ±  ⇒  5x ∈ L₀  ⇒  25 x² ∈ 2ℤ', C.cyan, q, 24);
    const oq = Q(S, 0, 'twenty-five is odd', 0.6) * f1;
    chip(540, 355, 840, 58, 'x² ∈ ℤ  and  25 odd   ⇒   x² ∈ 2ℤ', C.green, oq, 24);
    const dq = Q(S, 0, 'the determinant is twenty-five over five squared', 0.6) * f1;
    chip(540, 450, 840, 58, 'det Γ± = det L₀ / [Γ± : L₀]² = 25 / 25 = 1', C.gold, dq, 23);
    const wq = Q(S, 0, 'which is one', 0.6) * f1;
    stamp('EVEN · UNIMODULAR', 540, 580, wq, C.green, 34, -0.04);
    lbl('neither evenness , unimodularity nor a new shortest root is assumed', 540, 670, C.dim, Q(S, 0, 'Evenness and unimodularity come for free', 0.6) * f1, 15);
    const mq = Q(S, 0, 'the determinant is twenty-five over five squared', 0.8) * f1;
    const gx = 1180, gy = 300, cw = 54;
    lbl('Gram matrix of 8 simple roots found in Γ₊ (recomputed)', 1396, 268, C.white, mq, 17);
    CART074.forEach((row, i) => row.forEach((v, j) => { const qq = clamp(mq * 1.6 - (i * 8 + j) / 90), col = v === 2 ? C.gold : v === -1 ? C.cyan : C.dim; box(gx + j * cw, gy + i * cw, cw - 5, cw - 5, col, qq, 1.3, v ? rgba(col, 0.18) : 'rgba(0,0,0,0.4)'); lbl(String(v), gx + j * cw + (cw - 5) / 2, gy + i * cw + 34, v ? C.white : C.dim, qq, 18); }));
    lbl('det = 1  ·  E8 Dynkin shape , arms 1 , 2 , 4', 1396, gy + 8 * cw + 34, C.green, wq, 18);
  }
  const q1 = Q(S, 1, 'Count roots', 0.6, 0.3);
  if (q1 > 0) {
    const px = 170, py = 600, bw = 120;
    const labs = ['(0, 0)', '(1, 2)', '(2, 4)', '(3, 1)', '(4, 3)'];
    ROOTC074.forEach((v, i) => { const qq = i === 0 ? Q(S, 1, 'forty from the two A fours', 0.6) : clamp(Q(S, 1, 'fifty in each of the four glue classes', 0.6) * 1.5 - (i - 1) / 5), h = v * 5.2, x = px + i * (bw + 18); fillBox(x, py - h, bw, h, GC074[i], qq * 0.4); rect63(x, py - h, bw, h, GC074[i], qq, 1.6); lbl(String(v), x + bw / 2, py - h - 12, C.white, qq, 22); lbl(labs[i], x + bw / 2, py + 26, C.dim, qq, 16); });
    lbl('glue class (j, 2j)', px + 340, py + 56, C.dim, q1, 15);
    const sq = Q(S, 1, 'two hundred forty in all', 0.6);
    chip(510, 700, 700, 56, '40 + 4 · 50 = 240 roots of norm 2', C.gold, sq, 23);
    lbl('class (j, 2j) : 4/5 + 6/5 = 2 , so 5 × 10 = 50 shortest vectors', 510, 760, C.dim, sq, 15);
    const aq = Q(S, 1, 'Rank-eight simply laced systems', 0.6), eq = Q(S, 1, 'so this is E8', 0.6);
    lbl('irreducible rank-8 simply laced root systems', 1400, 270, C.white, aq, 18);
    ADE074.forEach(([nm, v], i) => { const qq = clamp(aq * 1.6 - i / 4), y = 300 + i * 90, col = i === 2 ? (eq > 0 ? C.gold : C.cyan) : C.cyan; fillBox(1150, y, v * 2.3, 56, col, qq * 0.35); rect63(1150, y, v * 2.3, 56, col, qq, 1.6); lbl(nm, 1130, y + 37, C.white, qq, 22, 'right'); lbl(String(v), 1150 + v * 2.3 + 16, y + 37, col, qq, 22, 'left'); });
    stamp('E8', 1690, 395, eq, C.gold, 40, -0.06);
    lbl('recomputed : 2160 vectors of norm 4 , as for E8', 1400, 610, C.dim, eq, 15);
    chip(1400, 680, 760, 54, 'norm-2 recipe (ω₁, ω_k) on two A_(m−1) :  m = 5 only', C.green, eq, 19);
    lbl('(k − 1) m = k² + 1  ⇒  (m, k) = (5, 2) or (5, 3)', 1400, 740, C.dim, eq, 15);
  }
};

/* ---- 04 FIVE-GRADING ---- */
SCENES.grading = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The central pair', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'The glue class grades E8 into five pieces', 0.6) * f1;
    const rows = [['g₀', 'sl(V) ⊕ sl(W)', 48, 'the local part sl five plus sl five'], ['g₁', 'V ⊗ Λ²W', 50, 'four pieces of dimension fifty'], ['g₂', 'Λ²V ⊗ W*', 50, 'four pieces of dimension fifty'], ['g₃', '(Λ²V)* ⊗ W', 50, 'four pieces of dimension fifty'], ['g₄', 'V* ⊗ (Λ²W)*', 50, 'four pieces of dimension fifty']];
    rows.forEach(([g, m, d, ph], i) => { const qq = clamp(Q(S, 0, ph, 0.6) * 1.5 - (i > 0 ? (i - 1) / 6 : 0)) * f1, y = 255 + i * 88, col = GC074[i]; box(150, y, 780, 74, col, qq, 1.8, 'rgba(0,0,0,0.45)'); lblG(g, 195, y + 47, col, qq, 28); lblG(m, 420, y + 47, C.white, qq, 25); fillBox(640, y + 22, d * 4.4, 30, col, qq * 0.4); rect63(640, y + 22, d * 4.4, 30, col, qq, 1.3); lbl(String(d), 905, y + 46, col, qq, 21, 'right'); });
    const wq = Q(S, 0, 'such as V tensor wedge two W', 0.6) * f1;
    lbl('class j carries the weights of Λʲ V ⊗ Λ^(2j mod 5) W', 540, 715, C.dim, wq, 15);
    lbl('48 + 4 · 50 = 248  (recomputed from the 240 roots)', 540, 755, C.white, Q(S, 0, 'four pieces of dimension fifty', 0.6) * f1, 18);
    const bq = Q(S, 0, 'Brackets add grades mod five', 0.6) * f1;
    const tx = 1180, ty = 300, tc = 78, SUB = '₀₁₂₃₄';
    lbl('grade of [g_j , g_k] , j down , k across', 1375, 256, C.white, q, 17);
    for (let j = 0; j < 5; j++) { lblG('g' + SUB[j], tx - 34, ty + j * tc + tc / 2 + 8, GC074[j], q, 22); lblG('g' + SUB[j], tx + j * tc + tc / 2, ty - 6, GC074[j], q, 22); }
    for (let j = 0; j < 5; j++) for (let k = 0; k < 5; k++) { const m = (j + k) % 5, qq = clamp(bq * 1.6 - (j * 5 + k) / 30); box(tx + k * tc + 3, ty + j * tc + 3, tc - 6, tc - 6, GC074[m], q, 1.2, qq > 0 ? rgba(GC074[m], 0.3 * qq) : 'rgba(0,0,0,0.4)'); lblG('g' + SUB[m], tx + k * tc + tc / 2, ty + j * tc + tc / 2 + 8, C.white, qq, 22); }
    chip(1375, 752, 700, 50, '[g_j , g_k] ⊂ g_(j + k mod 5)', C.white, bq, 22);
    lbl('explicit grading also in Yokota , Exceptional Lie groups §5.12', 1375, 800, C.dim, bq, 14);
  }
  const q1 = Q(S, 1, 'The central pair', 0.6, 0.3);
  if (q1 > 0) {
    chip(540, 260, 860, 58, '(ζᵃ I , ζᵇ I) acts on g_j by ζ^(j(a + 2b))', C.white, q1, 23);
    const cq = Q(S, 1, 'acts on grade j by', 0.6);
    const cx = 420, cy = 490, R = 165;
    ring(cx, cy, R, C.dim, cq, 2);
    for (let j = 0; j < 5; j++) { const an = TAU * j / 5, x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); dot(x, y, 13, GD074[j], cq); lblG('ζ' + ['⁰', '¹', '²', '³', '⁴'][j], x + 34 * Math.cos(an), y - 34 * Math.sin(an) + 8, GC074[j], cq, 22); }
    lbl('ζ = e^(2πi/5)', cx, cy + 8, C.dim, cq, 17);
    const kq = Q(S, 1, 'trivial exactly when b is two a', 0.6), sq = Q(S, 1, 'the glue slope again', 0.6);
    const x0 = 1190, y0 = 290, cw = 76;
    lbl('(a, b) ∈ F₅² with a + 2b ≡ 0', 1380, 262, C.white, kq, 18);
    f5grid074(x0, y0, cw, kq, (p, qq, x, y) => { const on = (2 * p) % 5 === qq; box(x + 4, y + 4, cw - 8, cw - 8, on ? C.gold : C.dim, kq, 1.4, on ? rgba(C.gold, 0.3) : 'rgba(0,0,0,0.45)'); if (on) dot(x + cw / 2, y + cw / 2, 11, 'g', kq); });
    lbl('kernel C = {(a, 2a)}  =  the glue line C₊', 1380, y0 + 5 * cw + 66, C.gold, sq, 18);
    const lq = Q(S, 1, 'So each local projective pair has five lifts', 0.6);
    chip(540, 720, 860, 56, 'H = (SU(5) × SU(5)) / C ,  1 → μ₅ → H → PU(5)² → 1', C.gold, lq, 21);
    lbl('each fibre of H → PU(5)² : five lifts  ·  E8 → U(5) is trivial , 248 > 25', 540, 780, C.dim, lq, 15);
  }
};

/* ---- 05 PHASE OBSERVATION ---- */
SCENES.phase = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Telling apart is not reading in one shot', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'What can an observer see', 0.6) * f1;
    const gx = 200, gy = 290, cw = 88;
    lbl('blocks P_j E P_k of an allowed effect E', gx + 2.5 * cw, 262, C.white, q, 17);
    const dq = Q(S, 0, 'If every allowed effect is block diagonal', 0.6) * f1, oq = Q(S, 0, 'one cross-grade block', 0.6) * f1;
    for (let j = 0; j < 5; j++) { lbl('P' + '₀₁₂₃₄'[j], gx - 26, gy + j * cw + cw / 2 + 6, GC074[j], q, 17); for (let k = 0; k < 5; k++) { const d = j === k, cr = (j === 0 && k === 1) || (j === 1 && k === 0); const col = d ? C.gold : cr ? C.mag : C.dim; const fa = d ? dq : cr ? oq : 0; box(gx + k * cw + 3, gy + j * cw + 3, cw - 6, cw - 6, col, q, 1.3, fa > 0 ? rgba(col, 0.35 * fa) : 'rgba(0,0,0,0.4)'); } }
    lbl('gold : block diagonal   magenta : one cross-grade block', gx + 2.5 * cw, gy + 5 * cw + 34, C.dim, dq, 15);
    chip(1390, 270, 780, 56, 'a ∼ b  ⇔  (a − b) d = 0  for all d ∈ D(O)', C.white, q, 22);
    lbl('D(O) = { j − k : P_j A P_k ≠ 0 for some allowed A }', 1390, 325, C.dim, q, 15);
    const iq = Q(S, 0, 'all five look identical', 0.6) * f1;
    box(1010, 355, 760, 60, C.gold, iq, 1.8, 'rgba(40,30,0,0.4)'); lbl('block diagonal :  all five phases identical', 1390, 393, C.gold, iq, 20);
    const tq = Q(S, 0, 'tells all five apart, because five is prime', 0.6) * f1;
    box(1010, 430, 760, 60, C.mag, tq, 1.8, 'rgba(40,0,40,0.4)'); lbl('one cross block , all inputs :  five distinct', 1390, 468, C.mag, tq, 20);
    const px = 1080, py = 770, pw = 640, ph = 245;
    plotAxes(px, py, pw, ph, tq, 'phase a', 'one fixed effect : P(a) = (1 + cos 2πa/5)/2');
    COSP074.forEach((v, a) => { const x = px + 30 + a * 105, h = v * ph * 0.8; fillBox(x, py - h, 70, h, a === 0 ? C.white : a === 1 || a === 4 ? C.cyan : C.vio, tq * 0.45); rect63(x, py - h, 70, h, C.cyan, tq, 1.3); lbl(v.toFixed(4), x + 35, py - h - 10, C.white, tq, 15); lbl(String(a), x + 35, py + 24, C.dim, tq, 15); });
    lbl('ψ = (e₀ + e₁)/√2 : a and −a coincide in this one experiment', px + pw / 2, py + 52, C.dim, tq, 14);
  }
  const q1 = Q(S, 1, 'Telling apart is not reading in one shot', 0.6, 0.3);
  if (q1 > 0) {
    chip(540, 265, 860, 56, 'ψ = Σⱼ √wⱼ eⱼ  (eⱼ ∈ gⱼ) ,  ψ_a = Zᵃ ψ ,  a uniform', C.white, q1, 21);
    const fq = Q(S, 1, 'succeeds at best one fifth', 0.6);
    chip(540, 350, 860, 64, 'P_opt(w) = (Σⱼ √wⱼ)² / 5', C.gold, fq, 30);
    lbl('attained by the Fourier POVM  f_a = Σⱼ ζ^(aj) eⱼ / √5', 540, 412, C.dim, fq, 15);
    const eq = Q(S, 1, 'one only for equal weights', 0.6);
    chip(540, 480, 860, 56, '= 1   ⇔   every wⱼ = 1/5', C.green, eq, 24);
    const rq = Q(S, 1, 'at most two fifths on two grades', 0.6);
    chip(540, 565, 860, 56, 'r nonzero weights :  P_opt ≤ r/5 ;  two grades ≤ 2/5', C.cyan, rq, 21);
    lbl('equal-weight mixture over the grades : 1/5 only', 540, 625, C.dim, rq, 15);
    lbl('assumed resources : the probes can be prepared , the five-outcome POVM is allowed', 540, 665, C.dim, rq, 14);
    const pq = Q(S, 1, 'A probe with weights w j', 0.8);
    const px = 1080, py = 760, pw = 640, ph = 440, xS = v => px + v * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, pq, '', 'SDP optimum (cvxpy , Clarabel)');
    lblG('formula (Σ √wⱼ)² / 5', px + pw / 2, py + 58, C.dim, pq, 17);
    dashed(xS(0), yS(0), xS(1), yS(1), C.dim, pq, 1.5);
    [1, 2, 3, 4, 5].forEach(r => { dashed(xS(r / 5), py, xS(r / 5), py - ph, C.dim, pq * 0.35, 1); lbl(r + '/5', xS(r / 5), py + 26, C.dim, pq, 14); });
    SDP074.forEach((p, i) => { const qq = clamp(pq * 1.6 - i / 18); dot(xS(p[1]), yS(p[2]), 9, ['', 'r', 'o', 'g', 'n', 'c'][p[0]], qq); });
    lbl('14 probes , support r = 1 … 5 : every optimum on the diagonal', px + 20, py - ph + 30, C.white, pq, 15, 'left');
  }
};

/* ---- 06 LIFT OBSTRUCTION ---- */
SCENES.lift = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On the torus', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Lifting projective data in PU five squared', 0.6) * f1;
    box(150, 470, 170, 90, C.white, q, 2, 'rgba(0,0,0,0.45)'); lblG('Π', 235, 528, C.white, q, 34);
    box(620, 470, 320, 90, C.cyan, q, 2, 'rgba(0,30,40,0.45)'); lblG('PU(5) × PU(5)', 780, 527, C.cyan, q, 26);
    box(690, 270, 180, 90, C.gold, q, 2, 'rgba(40,30,0,0.45)'); lblG('H', 780, 330, C.gold, q, 34);
    arrow(325, 515, 612, 515, C.cyan, q, 2.5); lblG('ρ = (ρ₁, ρ₂)', 468, 500, C.cyan, q, 20);
    arrow(780, 365, 780, 462, C.gold, q, 2.5); lbl('p , kernel μ₅', 800, 420, C.dim, q, 16, 'left');
    const oq = Q(S, 0, 'has obstruction o one plus two o two', 0.6) * f1;
    ctx.save(); ctx.setLineDash([9, 8]); arrow(325, 480, 682, 330, C.gold, oq, 2.5); ctx.restore(); lbl('lift ρ̃ ?', 470, 380, C.gold, oq, 18);
    lbl('s(γ) s(δ) = z^(c(γ, δ)) s(γδ) ,  o_H = [c] ∈ H²(Π; F₅)', 545, 640, C.dim, oq, 16);
    chip(1390, 290, 780, 56, 'o₁ , o₂ ∈ H²(Π; F₅) : obstructions to SU(5)', C.white, q, 20);
    chip(1390, 380, 780, 64, 'o_H(ρ) = o₁ + 2o₂', C.gold, oq, 32);
    const lq = Q(S, 0, 'a lift exists exactly when o two is two o one', 0.6) * f1;
    chip(1390, 475, 780, 60, 'lift to H exists   ⇔   o₂ = 2o₁', C.green, lq, 26);
    lbl('[(ζᵃ I, ζᵇ I)] = z^(a + 2b) : the same quotient C as the glue', 1390, 540, C.dim, lq, 15);
    lbl('lifts , when they exist , form an H¹(Π; F₅)-torsor', 1390, 580, C.dim, lq, 15);
  }
  const q1 = Q(S, 1, 'On the torus', 0.6, 0.3);
  if (q1 > 0) {
    const mq = Q(S, 1, 'clock and shift matrices D and S', 0.6), cw = 50;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const qq = clamp(mq * 1.6 - (i * 5 + j) / 40); box(160 + j * cw, 300 + i * cw, cw - 4, cw - 4, i === j ? GC074[i] : C.dim, qq, 1.2, 'rgba(0,0,0,0.4)'); if (i === j) dot(160 + j * cw + 23, 300 + i * cw + 23, 9, GD074[i], qq); box(500 + j * cw, 300 + i * cw, cw - 4, cw - 4, i === (j + 1) % 5 ? C.cyan : C.dim, qq, 1.2, 'rgba(0,0,0,0.4)'); if (i === (j + 1) % 5) dot(500 + j * cw + 23, 300 + i * cw + 23, 9, 'c', qq); }
    lblG('D = diag(ζʲ)', 283, 580, C.white, mq, 22); lblG('S : eⱼ ↦ e_(j+1)', 623, 580, C.white, mq, 22);
    const cq = Q(S, 1, 'commute up to zeta', 0.6);
    chip(470, 655, 700, 56, 'D S = ζ S D ,   D² S = ζ² S D² ,   det = 1', C.gold, cq, 22);
    lbl('Π = ℤ² = ⟨u, v⟩ :  ρ₁ = ([D], [S]) ,  ρ₂ = ([D²], [S])', 470, 715, C.dim, cq, 15);
    const nq = Q(S, 1, 'Neither lifts to SU five alone', 0.6);
    box(1010, 260, 370, 110, C.gold, nq, 1.8, 'rgba(40,30,0,0.4)'); lblG('(D, S) : ζ I', 1195, 305, C.gold, nq, 24); lbl('o₁ = 1 · no SU(5) lift', 1195, 345, C.red, nq, 17);
    box(1410, 260, 370, 110, C.mag, nq, 1.8, 'rgba(40,0,40,0.4)'); lblG('(D², S) : ζ² I', 1595, 305, C.mag, nq, 24); lbl('o₂ = 2 · no SU(5) lift', 1595, 345, C.red, nq, 17);
    const pq = Q(S, 1, 'yet the pair lifts', 0.6);
    chip(1395, 430, 770, 58, 'ρ̃(u) = [(D, D²)] ,  ρ̃(v) = [(S, S)]', C.green, pq, 22);
    lbl('commutator [(ζ I , ζ² I)] = 1 in H ;  o₁ + 2o₂ = 5 ≡ 0', 1395, 490, C.white, pq, 17);
    stamp('PAIR LIFTS', 1395, 580, Q(S, 1, 'lies in the kernel', 0.6), C.green, 34, -0.04);
    const bq = Q(S, 1, 'a trivial second factor blocks it', 0.6);
    chip(1395, 680, 770, 56, 'second factor trivial :  [(ζ I , I)] = z ≠ 1', C.red, bq, 21);
    lbl('joint class 1 ≠ 0 : no lift to H', 1395, 735, C.red, bq, 17);
  }
};

/* ---- 07 FACE DEFECTS ---- */
SCENES.cells = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The lifts then form an H one torsor', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'On a finite two-complex with flat edge labels', 0.6) * f1;
    const x0 = 210, y0 = 300, cs = 140;
    lbl('3 × 3 torus , opposite sides identified', x0 + 1.5 * cs, 270, C.white, q, 17);
    const sh = Q(S, 0, 'Shifting edge phases by b', 0.6) * f1, eq = Q(S, 0, 'each face product is z to the eta f', 0.6) * f1;
    for (let i = 0; i <= 3; i++) { line(x0, y0 + i * cs, x0 + 3 * cs, y0 + i * cs, C.gold, q, 2.4); line(x0 + i * cs, y0, x0 + i * cs, y0 + 3 * cs, C.cyan, q, 2.4); }
    for (let i = 0; i < 3; i++) { arrow(x0 + i * cs + cs * 0.4, y0 + 3 * cs, x0 + i * cs + cs * 0.6, y0 + 3 * cs, C.gold, q, 2.4); arrow(x0, y0 + i * cs + cs * 0.6, x0, y0 + i * cs + cs * 0.4, C.cyan, q, 2.4); }
    const E1 = CELLS074.trivial.eta, E2 = CELLS074.trivial.eta2;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const f = i * 3 + j, x = x0 + i * cs + cs / 2, y = y0 + (2 - j) * cs + cs / 2;
      const v1 = E1[f], v2 = E2[f], useNew = sh > 0.5;
      const col = useNew && v2 !== v1 ? C.mag : C.white;
      fillBox(x - cs / 2 + 6, y - cs / 2 + 6, cs - 12, cs - 12, col, eq * 0.12);
      if (useNew) { lblG(v1 + ' → ' + v2, x, y + 10, col, eq, 26); lbl('η → η′', x, y + 40, C.dim, eq, 13); } else lblG('η = ' + v1, x, y + 10, col, eq, 26);
    }
    lbl('gold : D-edges   cyan : S-edges   (second factor trivial)', x0 + 1.5 * cs, y0 + 3 * cs + 40, C.dim, q, 14);
    const s1 = E1.reduce((s, v) => s + v, 0), s2 = E2.reduce((s, v) => s + v, 0);
    lbl(sh > 0.5 ? 'Σ η′_f = ' + s2 + ' ≡ ' + (s2 % 5) + '  (mod 5) : unchanged' : 'Σ η_f = ' + s1 + ' ≡ ' + (s1 % 5) + '  (mod 5)', x0 + 1.5 * cs, y0 + 3 * cs + 78, C.gold, eq, 19);
    chip(1390, 270, 780, 54, 'flat edge labels g_e ∈ PU(5)² ,  lifts h_e ∈ H', C.white, q, 20);
    chip(1390, 350, 780, 58, 'ordered ∏_(e ∈ ∂f) h_e = z^(η_f)', C.gold, eq, 24);
    chip(1390, 430, 780, 58, 'h′_e = z^(b_e) h_e   ⇒   η′ = η + δb', C.mag, sh, 24);
    const cq = Q(S, 0, 'a closing lift exists exactly when', 0.6) * f1;
    chip(1390, 510, 780, 58, 'closing lift   ⇔   [η] = 0 ∈ H²(B; F₅)', C.green, cq, 24);
    const vq = Q(S, 0, 'vanishes in H two', 0.6) * f1;
    lbl('computed with clock and shift labels on this torus :', 1390, 580, C.dim, vq, 15);
    lbl('(D, S) , (I, I) :  every η_f = 1 ,  Σ = 9 ≡ 4 ≠ 0  →  no lift', 1390, 618, C.red, vq, 17);
    lbl('(D, D²) , (S, S) :  every η_f = 0  →  lift exists', 1390, 653, C.green, vq, 17);
    lbl('random edge phases b : η′ = η + δb checked on the matrices', 1390, 690, C.dim, sh, 15);
  }
  const q1 = Q(S, 1, 'The lifts then form an H one torsor', 0.6, 0.3);
  if (q1 > 0) {
    chip(540, 270, 860, 56, 'two closing lifts differ by δb = 0 ;  mod vertex gauge : H¹(B; F₅)-torsor', C.white, q1, 17);
    const gq = Q(S, 1, 'five to the b one on a connected graph', 0.6);
    chip(540, 350, 860, 56, 'connected graph :  5^(b₁) lift classes', C.gold, gq, 23);
    const tx = 540, ty = 500;
    dot(tx - 160, ty, 13, 'g', gq); dot(tx + 160, ty, 13, 'g', gq);
    line(tx - 160, ty, tx + 160, ty, C.gold, gq, 2.5); curve(p => [tx - 160 + 320 * p, ty - 90 * Math.sin(Math.PI * p)], 30, C.gold, gq, 2.5); curve(p => [tx - 160 + 320 * p, ty + 90 * Math.sin(Math.PI * p)], 30, C.gold, gq, 2.5);
    lbl('theta graph : b₁ = 2 , 25 lift classes', tx, ty + 135, C.white, gq, 17);
    const rq = Q(S, 1, 'And defects can be read', 0.6);
    chip(1390, 270, 780, 56, 'ψ = 5^(−1/2) Σⱼ eⱼ ,  one turn around ∂f acts as Z^(η_f)', C.white, rq, 18);
    const cx = 1180, cy = 470;
    rect63(cx - 80, cy - 80, 160, 160, C.cyan, rq, 2);
    const ang = (u * 1.6) % TAU; dot(cx + 80 * Math.max(-1, Math.min(1, 1.41 * Math.cos(ang))), cy + 80 * Math.max(-1, Math.min(1, 1.41 * Math.sin(ang))), 11, 'g', rq);
    lbl('ψ', cx, cy + 8, C.gold, rq, 22);
    const mq = Q(S, 1, 'measured in the Fourier basis', 0.6);
    const px = 1340, py = 600, pw = 400, ph = 220;
    plotAxes(px, py, pw, ph, mq, '', 'P(a) for η_f = 1');
    lbl('Fourier outcome a', px + pw / 2, py + 52, C.dim, mq, 15);
    READ074[1].forEach((v, a) => { const x = px + 25 + a * 75, h = v * ph * 0.9; fillBox(x, py - h, 50, Math.max(h, 2), a === 1 ? C.green : C.dim, mq * 0.5); rect63(x, py - h, 50, Math.max(h, 2), a === 1 ? C.green : C.dim, mq, 1.3); lbl(String(a), x + 25, py + 24, C.dim, mq, 15); });
    stamp('PROBABILITY ONE', 1390, 700, Q(S, 1, 'returns eta f with probability one', 0.6), C.green, 30, -0.04);
    lbl('block-diagonal effects alone would never see these defects', 1390, 790, C.dim, Q(S, 1, 'returns eta f with probability one', 0.6), 15);
  }
};

/* ---- 08 CONTROL AND COST ---- */
SCENES.control = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, 'A fixed generating menu has some uniform finite word length', 'classical'], [1, 'Yet almost every target', 'theory']]);
  const f1 = 1 - Q(S, 1, 'A fixed generating menu', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Full local control plus one non-local continuous direction', 0.6) * f1;
    chip(W / 2, 258, 1500, 56, 'h = su(5) ⊕ su(5) ,  X ∈ e₈ \\ h ,  all e^(tX) :   Lie(h, X) = compact e₈ ,  dim 248', C.white, q, 21);
    const wq = Q(S, 0, 'as brackets walk the grades one, two, four, three', 0.6) * f1;
    const cx = 470, cy = 520, R = 175, ord = [1, 2, 4, 3], ang = [-90, 0, 90, 180];
    const P = ord.map((g, i) => [cx + R * Math.cos(ang[i] * Math.PI / 180), cy + R * Math.sin(ang[i] * Math.PI / 180)]);
    ring(cx, cy, 44, C.white, q, 2); lblG('g₀', cx, cy + 9, C.white, q, 26);
    P.forEach((p, i) => { ring(p[0], p[1], 44, GC074[ord[i]], q, 2.5); lblG('g' + '₀₁₂₃₄'[ord[i]], p[0], p[1] + 9, GC074[ord[i]], q, 26); });
    for (let i = 0; i < 4; i++) { const A = P[i], B = P[(i + 1) % 4], qq = clamp(wq * 2 - i / 2.5); const mx = (A[0] + B[0]) / 2 + (A[0] + B[0] - 2 * cx) * 0.25, my = (A[1] + B[1]) / 2 + (A[1] + B[1] - 2 * cy) * 0.25; const bz = p => { const s = 1 - p; return [s * s * A[0] + 2 * s * p * mx + p * p * B[0], s * s * A[1] + 2 * s * p * my + p * p * B[1]]; }; curve(p => bz(0.22 + 0.56 * p), 30, GC074[ord[(i + 1) % 4]], qq, 3); const e0 = bz(0.74), e1 = bz(0.78); arrow(e0[0], e0[1], e1[0], e1[1], GC074[ord[(i + 1) % 4]], qq, 3); lblG('[g' + '₀₁₂₃₄'[ord[i]] + ', g' + '₀₁₂₃₄'[ord[i]] + ']', mx + (mx - cx) * 0.35, my + (my - cy) * 0.35 + 6, C.white, qq, 17); }
    lbl('[g_j , g_j] ≠ 0 in g_2j : the doubling map visits every nonzero grade', cx, 790, C.dim, wq, 14);
    const gq = Q(S, 0, 'generates all of compact E8', 0.6) * f1, sq = Q(S, 0, 'the same recipe gives su twenty-five', 0.6) * f1;
    const px = 1080, py = 740, pw = 660, ph = 400, n = Math.max(GE8074.length, G25074.length) - 1, xS = i => px + 20 + i / n * (pw - 40), yS = v => py - v / 660 * ph;
    plotAxes(px, py, pw, ph, gq, 'bracket rounds', 'dimension of the generated algebra');
    dashed(px, yS(248), px + pw, yS(248), C.gold, gq * 0.7, 1.5); lbl('248', px - 10, yS(248) + 6, C.gold, gq, 16, 'right');
    curve(p => { const k = p * (GE8074.length - 1), i = Math.floor(k), f = k - i; const v = GE8074[Math.min(i, GE8074.length - 1)] * (1 - f) + GE8074[Math.min(i + 1, GE8074.length - 1)] * f; return [xS(k), yS(v)]; }, 60, C.gold, gq, 3);
    GE8074.forEach((v, i) => dot(xS(i), yS(v), 7, 'g', gq));
    lbl('E8 : g₀ + one root vector X  →  248', px + 30, yS(248) - 12, C.gold, gq, 15, 'left');
    dashed(px, yS(624), px + pw, yS(624), C.mag, sq * 0.7, 1.5); lbl('624', px - 10, yS(624) + 6, C.mag, sq, 16, 'right');
    curve(p => { const k = p * (G25074.length - 1), i = Math.floor(k), f = k - i; const v = G25074[Math.min(i, G25074.length - 1)] * (1 - f) + G25074[Math.min(i + 1, G25074.length - 1)] * f; return [xS(k), yS(v)]; }, 60, C.mag, sq, 3);
    G25074.forEach((v, i) => dot(xS(i), yS(v), 7, 'm', sq));
    lbl('ℂ⁵ ⊗ ℂ⁵ : local + one X  →  su(25)', px + pw - 10, yS(624) - 14, C.mag, sq, 15, 'right');
    lbl('recomputed : E8 built from Γ₊ , Jacobi checked , both closures iterated', px + pw / 2, py + 52, C.dim, gq, 14);
  }
  const q1 = Q(S, 1, 'A fixed generating menu', 0.6, 0.3);
  if (q1 > 0) {
    const px = 170, py = 730, pw = 760, ph = 400, yS = v => py - v / 360 * ph, bw = 80;
    const rq = Q(S, 1, 'with local gates free, five relation pulses', 0.6), lq = Q(S, 1, 'as four reach only two hundred forty-four dimensions', 0.6), bq = Q(S, 1, 'Yet almost every target', 0.6);
    lbl('free local gates : words with r relation pulses fill ≤ 49r + 48 dimensions', px + pw / 2, 265, C.white, bq, 16);
    plotAxes(px, py, pw, ph, bq, '', '');
    lbl('relation pulses r', px + pw / 2, py + 56, C.dim, bq, 15);
    COST074.forEach((v, r) => { const qq = clamp(bq * 1.6 - r / 9), x = px + 30 + r * 105, h = py - yS(v), col = rq > 0 ? (v < 248 ? C.red : C.green) : C.cyan; fillBox(x, py - h, bw, h, col, qq * 0.4); rect63(x, py - h, bw, h, col, qq, 1.5); lbl(String(v), x + bw / 2, py - h - 10, C.white, qq, 17); lbl(String(r), x + bw / 2, py + 26, C.dim, qq, 16); });
    line(px, yS(248), px + pw, yS(248), C.gold, rq, 3); lbl('dim E8 = 248', px + 10, yS(248) - 12, C.gold, rq, 17, 'left');
    const mq = Q(S, 1, 'A fixed generating menu has some uniform finite word length', 0.6);
    chip(1390, 280, 780, 56, 'Lie(S) = e₈  ⇒  every g has an exact word of length ≤ N(S)', C.cyan, mq, 19);
    lbl('N(S) finite ; its value is not computed (uniform finite generation)', 1390, 335, C.dim, mq, 15);
    const aq = Q(S, 1, 'almost every target needs at least two hundred forty-eight tunable pulses', 0.6);
    chip(1390, 420, 780, 58, 'Haar-a.e. g :  ≥ 248 tunable pulses', C.gold, aq, 24);
    lbl('words with r < 248 tunable calls have measure-zero image', 1390, 475, C.dim, aq, 15);
    chip(1390, 550, 780, 58, 'local gates free :  ≥ 5 relation pulses e^(tX)', C.green, rq, 23);
    lbl('five is not shown to be sufficient or optimal', 1390, 605, C.dim, lq, 15);
    stamp('248 ≤ ℓ(g) ≤ N(S)', 1390, 700, lq, C.gold, 30, -0.04);
    lbl('compact E8 control is not SU(248) control : 248 versus 61503', 1390, 790, C.dim, lq, 14);
  }
};

/* ---- 09 GOLDEN READOUT ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Bounded height H restores it', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Now the golden readout, a plus phi b', 0.6) * f1;
    chip(540, 262, 860, 58, 'P₊(a, b) = a + φb ,  P₋(a, b) = a + σb ,  σ = 1 − φ', C.white, q, 22);
    const iq = Q(S, 0, 'It is injective', 0.6) * f1;
    chip(540, 345, 860, 54, 'a + φb = 0 , a, b ∈ ℤ  ⇒  a = b = 0 : injective', C.green, iq, 21);
    const gq = Q(S, 0, 'grow without bound', 0.6) * f1, sq = Q(S, 0, 'shrinks to zero', 0.6) * f1;
    const px = 180, py = 760, pw = 720, ph = 330, lo = -2.2, hi = 2.2, xS = n => px + 30 + (n - 1) / 9 * (pw - 60);
    plotAxes(px, py, pw, ph, gq, 'n', 'log scale');
    [0.01, 0.1, 1, 10, 100].forEach(v => { lbl(String(v), px - 10, logy074(v, lo, hi, py, ph) + 5, C.dim, gq, 13, 'right'); dashed(px, logy074(v, lo, hi, py, ph), px + pw, logy074(v, lo, hi, py, ph), C.dim, gq * 0.25, 1); });
    curve(p => { const n = 1 + p * 9, i = Math.min(8, Math.floor(n - 1)), f = n - 1 - i; const v = Math.log10(FIB074[i][0]) * (1 - f) + Math.log10(FIB074[i + 1][0]) * f; return [xS(n), py - (v - lo) / (hi - lo) * ph]; }, 60, C.red, gq, 3);
    FIB074.forEach((r, i) => dot(xS(i + 1), logy074(r[0], lo, hi, py, ph), 7, 'r', gq));
    curve(p => { const n = 1 + p * 9; return [xS(n), logy074(Math.pow(PHI_, -n), lo, hi, py, ph)]; }, 60, C.cyan, sq, 3);
    FIB074.forEach((r, i) => dot(xS(i + 1), logy074(Math.abs(r[2]), lo, hi, py, ph), 7, 'c', sq));
    lbl('‖vₙ‖∞ = F_(n+1)', xS(4), logy074(40, lo, hi, py, ph), C.red, gq, 16, 'center');
    lbl('|P₊ vₙ| = |σ|ⁿ', xS(6.5), logy074(0.011, lo, hi, py, ph), C.cyan, sq, 16, 'center');
    const tq = Q(S, 0, 'the Fibonacci pairs F n plus one, minus F n', 0.6) * f1;
    lbl('vₙ = (F_(n+1), −Fₙ)    P₊ vₙ = σⁿ', 1400, 268, C.white, tq, 19);
    FIB074.slice(0, 8).forEach((r, i) => { const qq = clamp(tq * 1.6 - i / 10), y = 300 + i * 54; box(1050, y, 700, 44, C.gold, qq, 1.2, 'rgba(0,0,0,0.45)'); lbl('n = ' + (i + 1), 1075, y + 29, C.dim, qq, 16, 'left'); lblG('(' + r[0] + ', ' + r[1] + ')', 1330, y + 30, C.gold, qq, 20); lblG('σⁿ = ' + r[2].toFixed(5), 1600, y + 30, C.cyan, qq, 19); });
    stamp('INVERSE DISCONTINUOUS EVERYWHERE', 1400, 770, sq, C.red, 24, -0.03);
  }
  const q1 = Q(S, 1, 'Bounded height H restores it', 0.6, 0.3);
  if (q1 > 0) {
    const bq = Q(S, 1, 'the smallest gap lies between', 0.6);
    chip(540, 262, 860, 58, '1/(2φH)  ≤  δ_H  <  φ/(2H)', C.gold, bq, 28);
    const nq = Q(S, 1, 'noise must stay under half of it', 0.6);
    lbl('|a|, |b| ≤ H ; closed noise ε : a decoder exists  ⇔  2ε < δ_H', 540, 322, C.white, nq, 16);
    const px = 180, py = 760, pw = 740, ph = 380, xS = h => px + (h - 1) / 149 * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, bq, 'height H = 1 … 150', 'H · δ_H  (recomputed)');
    dashed(px, yS(1 / (2 * PHI_)), px + pw, yS(1 / (2 * PHI_)), C.green, bq, 2); lbl('1/(2φ) = 0.309', px + pw, yS(1 / (2 * PHI_)) + 24, C.green, bq, 15, 'right');
    dashed(px, yS(PHI_ / 2), px + pw, yS(PHI_ / 2), C.red, bq, 2); lbl('φ/2 = 0.809', px + pw, yS(PHI_ / 2) - 10, C.red, bq, 15, 'right');
    HD074.forEach((v, i) => { const qq = clamp(bq * 1.8 - i / 200); dot(xS(i + 1), yS(v), 4, 'g', qq); });
    const jq = Q(S, 1, 'Reading both conjugates', 0.6);
    chip(1400, 262, 760, 56, 'S(a, b) = (a + φb , a + σb) :  sup-gap = 1', C.cyan, jq, 21);
    const cx = 1400, cy = 500, sc = 80;
    line(cx - 300, cy, cx + 300, cy, C.dim, jq * 0.5, 1); line(cx, cy - 200, cx, cy + 200, C.dim, jq * 0.5, 1);
    lbl('x = P₊', cx + 300, cy + 24, C.dim, jq, 14, 'right'); lbl('y = P₋', cx + 10, cy - 196, C.dim, jq, 14, 'left');
    const dq = Q(S, 1, 'the whole lattice decodes below one half', 0.6);
    JOINT074.forEach((p, i) => { const qq = clamp(jq * 1.6 - i / 60), x = cx + p[0] * sc, y = cy - p[1] * sc; if (dq > 0) { fillBox(x - 0.45 * sc, y - 0.45 * sc, 0.9 * sc, 0.9 * sc, C.green, dq * 0.12); rect63(x - 0.45 * sc, y - 0.45 * sc, 0.9 * sc, 0.9 * sc, C.green, dq * 0.7, 1); } dot(x, y, 7, 'c', qq); });
    chip(1400, 745, 760, 56, 'decode all of ℤ^(2d)   ⇔   ε < 1/2', C.green, dq, 23);
    lbl('boxes : ε = 0.45 around each joint readout , pairwise disjoint', 1400, 795, C.dim, dq, 14);
  }
};

/* ---- 10 WINDOWS ---- */
SCENES.window = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const xS = x => 170 + (x + 0.5) * 124, yS = y => 470 - y * 66;
  const f1 = 1 - Q(S, 1, 'Golden refinement T', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Or bound the hidden conjugate', 0.6) * f1;
    chip(540, 262, 840, 54, 'Γ(W) = {v : P₋v ∈ W} ,  Λ(W) = P₊ Γ(W)', C.white, q, 21);
    const wq = Q(S, 0, 'by a window with interior, of diameter D', 0.6) * f1;
    fillBox(xS(-0.5), yS(1), xS(12.5) - xS(-0.5), yS(-1) - yS(1), C.gold, wq * 0.1); dashed(xS(-0.5), yS(1), xS(12.5), yS(1), C.gold, wq, 1.5); dashed(xS(-0.5), yS(-1), xS(12.5), yS(-1), C.gold, wq, 1.5);
    lbl('W = [−1, 1] , D = 2', xS(12.5), yS(1) - 10, C.gold, wq, 15, 'right');
    line(xS(-0.5), yS(0), xS(12.5), yS(0), C.dim, q * 0.4, 1);
    lbl('y = P₋ (hidden)', xS(-0.5) + 4, yS(1) - 10, C.dim, q, 14, 'left');
    WLAT074.forEach((p, i) => { const inW = Math.abs(p[1]) <= 1 + 1e-9; dot(xS(p[0]), yS(p[1]), inW ? 8 : 6, inW && wq > 0 ? 'g' : 'c', (inW ? 1 : 0.55) * clamp(q * 1.6 - i / 160)); });
    const pq = Q(S, 0, 'Then distinct readouts differ by at least one over D', 0.6) * f1;
    const ly = 690;
    line(xS(-0.5), ly, xS(12.5), ly, C.dim, pq, 1.5); lbl('x = P₊ (seen)', xS(-0.5) + 4, ly + 30, C.dim, pq, 14, 'left');
    const xs = WPTS074.map(p => p[0]).sort((a, b) => a - b);
    WPTS074.forEach((p, i) => { const qq = clamp(pq * 1.6 - i / 30); ctx.save(); ctx.setLineDash([3, 6]); line(xS(p[0]), yS(p[1]), xS(p[0]), ly, C.gold, qq * 0.35, 1); ctx.restore(); dot(xS(p[0]), ly, 9, 'g', qq); });
    for (let i = 0; i + 1 < xs.length; i++) { const g = xs[i + 1] - xs[i]; if (xs[i] < 0 || xs[i + 1] > 12.5) continue; const gl = g > 1.3 ? 'φ' : g > 0.8 ? '1' : '1/φ'; lbl(gl, (xS(xs[i]) + xS(xs[i + 1])) / 2, ly - 12, g > 1.3 ? C.cyan : g > 0.8 ? C.white : C.mag, pq, 14); }
    chip(1400, 262, 760, 54, 'gap ≥ 1/D ,  ‖v − w‖ ≤ C_D |P₊v − P₊w|', C.green, pq, 21);
    const lq = Q(S, 0, 'the inverse is Lipschitz', 0.6) * f1;
    lbl('recomputed : gaps {' + GAPV074.map(g => g.toFixed(3)).join(' , ') + '} ≥ 1/2 ;  Lipschitz ratio ' + LIP074[0].toFixed(2) + ' ≤ C_D = ' + LIP074[1].toFixed(2), W / 2, 760, C.dim, lq, 15);
    chip(W / 2, 805, 1100, 46, 'aperiodic Delone set · finite local complexity · no nonzero period', C.gold, Q(S, 0, 'aperiodic Delone set', 0.6) * f1, 19);
  }
  const q1 = Q(S, 1, 'Golden refinement T', 0.6, 0.3);
  if (q1 > 0) {
    chip(W / 2, 262, 1200, 56, 'T(a, b) = (b, a + b) :   P₊ T = φ P₊ ,   P₋ T = σ P₋', C.white, q1, 23);
    const sq = Q(S, 1, 'the window times sigma squared gives the set times phi squared', 0.6);
    chip(W / 2, 340, 1200, 56, 'Λ(σⁿ W) = φⁿ Λ(W) ;  star-shaped W :  φ² Λ(W) ⊊ Λ(W)', C.gold, sq, 22);
    const ya = 450, yb = 570;
    line(xS(-0.5), ya, xS(12.5), ya, C.dim, q1, 1.2); line(xS(-0.5), yb, xS(12.5), yb, C.dim, sq, 1.2);
    lbl('Λ(W)', xS(-0.5) - 10, ya + 6, C.cyan, q1, 18, 'right'); lbl('Λ(σ²W)', xS(-0.5) - 10, yb + 6, C.gold, sq, 18, 'right');
    lbl('= φ² Λ(W)', xS(-0.5) - 10, yb + 30, C.gold, sq, 15, 'right');
    WPTS074.forEach(p => { dot(xS(p[0]), ya, 8, 'c', q1); const y2 = p[0] * PHI_ * PHI_; if (y2 >= -0.5 && y2 <= 12.5 && p[0] >= 0) { ctx.save(); ctx.setLineDash([4, 6]); line(xS(p[0]), ya + 8, xS(y2), yb - 8, C.gold, sq * 0.45, 1.2); ctx.restore(); } });
    WSM074.forEach(x => dot(xS(x), yb, 10, 'g', sq));
    lbl('recomputed on [−60, 60] : equal as sets , and every gold point is also a cyan point', W / 2, 625, C.dim, sq, 15);
    const nq = Q(S, 1, 'T flips the sign of a squared plus a b minus b squared', 0.6);
    chip(W / 2, 690, 1300, 56, 'N(a, b) = a² + ab − b² = P₊ · P₋ :   N(Tv) = −N(v) ,  N(T²v) = N(v)', C.mag, nq, 21);
    lbl('form [[1, ½], [½, −1]] , det −5/4 : signature (d, d) ; T² preserves no positive inner product', W / 2, 750, C.dim, nq, 15);
  }
};

/* ---- 11 SIGN SELECTION ---- */
SCENES.select = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const q = Q(S, 0, 'Now restore both marked gluings', 0.6);
  chip(540, 270, 860, 56, 'C_s = {(ζᵃ I , ζ^(2sa) I)} ,  H_s = SU(5)² / C_s ,  s = ±1', C.white, q, 20);
  const oq = Q(S, 0, 'the joint obstruction is', 0.6);
  chip(540, 355, 860, 62, 'o_s = o₁ + 2s · o₂', C.gold, oq, 30);
  const lq = Q(S, 0, 'a flat lift exists for some sign', 0.6);
  chip(540, 440, 860, 58, 'flat H_s lift for some s   ⇔   o₂ = ±2o₁', C.green, lq, 24);
  lbl('both signs at once  ⇒  4o₁ = 0  ⇒  o₁ = o₂ = 0  (4 is invertible mod 5)', 540, 500, C.dim, lq, 15);
  const bq = Q(S, 1, 'If both vanish, both signs work', 0.6), eq = Q(S, 1, 'exactly one sign works', 0.6), nq = Q(S, 1, 'sixteen allow neither', 0.6), xq = Q(S, 1, 'the clock and shift example selects plus', 0.6);
  const leg = [['both obstructions 0 : both signs', '1', C.green, bq], ['o₂ = 2o₁ ≠ 0 : only s = +', '4', C.gold, eq], ['o₂ = −2o₁ ≠ 0 : only s = −', '4', C.cyan, eq], ['otherwise : neither sign', '16', C.dim, nq]];
  leg.forEach(([s, n, col, qq], i) => { const y = 545 + i * 56; box(150, y, 780, 46, col, qq, 1.6, 'rgba(0,0,0,0.45)'); lblG(s, 175, y + 31, col === C.dim ? C.white : col, qq, 19, 'left'); lbl(n, 905, y + 31, col === C.dim ? C.white : col, qq, 22, 'right'); });
  const gq = Q(S, 0, 'a flat lift exists for some sign', 0.6);
  const x0 = 1200, y0 = 300, cw = 88;
  lbl('H²(T²; F₅) = F₅ :  all 25 pairs (o₁, o₂)', 1420, 262, C.white, gq, 18);
  for (let o1 = 0; o1 < 5; o1++) for (let o2 = 0; o2 < 5; o2++) {
    const k = SEL074[o1][o2], col = [C.dim, C.gold, C.cyan, C.green][k], qq = k === 3 ? bq : k === 0 ? nq : eq;
    const x = x0 + o2 * cw, y = y0 + o1 * cw;
    box(x + 4, y + 4, cw - 8, cw - 8, C.dim, gq, 1.2, 'rgba(0,0,0,0.45)');
    if (qq > 0) { fillBox(x + 4, y + 4, cw - 8, cw - 8, col, qq * (k ? 0.45 : 0.15)); lblG(['∅', '+', '−', '±'][k], x + cw / 2, y + cw / 2 + 10, k ? C.white : C.dim, qq, 26); }
  }
  for (let i = 0; i < 5; i++) { lbl(String(i), x0 + i * cw + cw / 2, y0 - 14, C.dim, gq, 16); lbl(String(i), x0 - 20, y0 + i * cw + cw / 2 + 6, C.dim, gq, 16); }
  lbl('o₂ →', x0 + 5 * cw + 10, y0 - 14, C.dim, gq, 16, 'left'); lbl('o₁ ↓', x0 - 20, y0 + 5 * cw + 26, C.dim, gq, 16);
  ring(x0 + 2 * cw + cw / 2, y0 + 1 * cw + cw / 2, 46, C.mag, xq, 3.5);
  lbl('clock and shift : (o₁, o₂) = (1, 2)  →  s = +', 1420, y0 + 5 * cw + 66, C.mag, xq, 18);
  lbl('in general H² may be larger ; the 25-pair count is for the torus', 1420, y0 + 5 * cw + 100, C.dim, xq, 14);
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The A D E classification', 'classical'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['GLUE', 'b = ±2a', C.gold, 'Integrality picks two marked E8 lattices'], ['E8', '240 = 40 + 4·50', C.green, 'Integrality picks two marked E8 lattices'], ['PHASE', 'ζ^(j(a+2b))', C.mag, 'one mod-five slope sets the phase'], ['OBSERVE', '(Σ√wⱼ)²/5', C.cyan, 'what an observer sees'], ['LIFT', 'o₁ + 2o₂', C.gold, 'when local data lift'], ['FACES', '[η] ∈ H²', C.green, 'when local data lift'], ['CONTROL', '248 · ≥ 5', C.mag, 'one direction completes control'], ['HEIGHT', 'δ_H = Θ(1/H)', C.cyan, 'a window steadies the golden readout'], ['WINDOW', 'gap ≥ 1/D', C.gold, 'a window steadies the golden readout'], ['SIGN', 'o₂ = ±2o₁', C.vio, 'one mod-five slope sets the phase']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 280 + (i % 5) * 340, y = 240 + Math.floor(i / 5) * 140, q = Q(S, 0, ph) * fade; box(x - 150, y, 300, 120, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 45, col, q, 20); lblG(a2, x, y + 92, C.white, q, 22); });
    lbl('CLASSICAL · ADE classification · Chevalley–Serre construction · uniform finite generation · complete reducibility · inverse function theorem', W / 2, 560, '#8fbcff', Q(S, 1, 'The A D E classification') * fade, 15);
    lbl("REFERENCES · Yokota (E8 five-grading) · Eldar–Forney (detection) · Neeb–Wagemann–Wockel (lifting) · D'Alessandro (generation) · Dechant–Boehm–Twarock (H₄ projection)", W / 2, 600, C.cyan, Q(S, 1, 'are classical inputs named in the volume') * fade, 14);
    lbl('VOLUME · E8 selection · five-grading · phase kernel · probe optimum · o₁ + 2o₂ · face criterion · e₈ closure · 248 and 5 · height , joint and window bounds · sign selection', W / 2, 645, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · 240 roots , 2160 , det 1 · E8 algebra and closures 248 / 624 · SDP optima · torus faces · δ_H for H ≤ 150 · window gaps · 25-pair grid', W / 2, 690, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED · 85 DIGESTION ATOMS , ALL RESIDUAL-OPEN', W / 2, 765, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pet074(W / 2, 350, 190, a, t * 0.04);
    txt('AURIC–E8 · EXTENSIONS', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC–E8 · 相容扩张与观察理论 · TRURETURING FILM 074', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Integrality picks E8 ; one mod-five slope sets phases and lifts ; a window steadies the readout.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC–E8', glue: 'INTEGRAL GLUE', eight: 'AUTOMATIC E8', grading: 'FIVE-GRADING', phase: 'PHASE OBSERVATION', lift: 'LIFT OBSTRUCTION', cells: 'FACE DEFECTS', control: 'CONTROL AND COST', golden: 'GOLDEN READOUT', window: 'WINDOWS', select: 'SIGN SELECTION', finale: 'LEDGER' });

function poster074() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pet074(470, 500, 300, 1, 0.2, { r: 8 });
  txt('a² + b² ≡ 0 (5)  ⇒  b = ±2a  ⇒  E8', 1330, 360, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('o_H = o₁ + 2o₂ ∈ H²( − ; F₅)', 1330, 470, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('P_opt = (Σ √wⱼ)² / 5 · gap ≥ 1/D', 1330, 580, { size: 42, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('AURIC–E8 相容扩张与观察', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC–E8 · EXTENSIONS', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('积 分 扩 张 · 中 心 相 位 · 全 局 提 升 · 黄 金 读 出', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 074', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster074;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
