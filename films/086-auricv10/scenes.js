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

/* ---- film 086: AURIC V10 · coherent relations and recursive observation ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN GENERAL THEOREM · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN · NOT RESOLVED IN THE VOLUME', C.vio, 'rgba(20,10,40,0.75)'],
    classical: ['CLASSICAL TOOL · NAMED IN THE VOLUME', '#8fbcff', 'rgba(10,20,45,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const _po086 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po086.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po086.set(key, off); }
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
/* data from verify086.py (vis086.json) */
const FIBN086 = [2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
const FIBRE086 = [[-0.0, 0.4, 0.2, 0.4, 0.0], [0.05, 0.35, 0.2, 0.35, 0.05], [0.1, 0.3, 0.2, 0.3, 0.1], [0.15, 0.25, 0.2, 0.25, 0.15], [0.2, 0.2, 0.2, 0.2, 0.2], [0.25, 0.15, 0.2, 0.15, 0.25], [0.3, 0.1, 0.2, 0.1, 0.3], [0.35, 0.05, 0.2, 0.05, 0.35], [0.4, 0.0, 0.2, 0.0, 0.4]];
const HID086 = [25, 4, 21, 1, 20];
const KEIG086 = [-1, 2, 2];
const MU3086 = [0.216, 0.24, 0.24, 0.144, 0.16];
const MU3b086 = [0.027, 0.21, 0.21, 0.063, 0.49];
const CHOI086 = [1, 2];
const NAND086 = [[0.0, 1.0, 4], [0.25, 0.75, 4], [0.5, 0.5, 4], [0.75, 0.25, 4], [0.9, 0.1, 4], [1.0, -0.0, 3], [1.1, -0.1, 4]];
const P13T086 = [0.0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, 0.64, 0.66, 0.68, 0.7, 0.72, 0.74, 0.76, 0.78, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 0.92, 0.94, 0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18, 1.2, 1.22, 1.24, 1.26, 1.28, 1.3, 1.32, 1.34, 1.36, 1.38, 1.4, 1.42, 1.44, 1.46, 1.48, 1.5, 1.52, 1.54, 1.56, 1.58, 1.6];
const P13086 = {"0": [0.0, 0.0, 0.0, 1e-05, 4e-05, 0.0001, 0.0002, 0.00038, 0.00064, 0.00102, 0.00155, 0.00225, 0.00316, 0.00432, 0.00576, 0.00751, 0.00962, 0.01213, 0.01506, 0.01847, 0.02238, 0.02682, 0.03184, 0.03746, 0.0437, 0.0506, 0.05816, 0.06642, 0.07537, 0.08504, 0.09542, 0.1065, 0.1183, 0.13078, 0.14394, 0.15775, 0.17219, 0.18722, 0.20281, 0.2189, 0.23545, 0.25242, 0.26973, 0.28732, 0.30514, 0.32311, 0.34115, 0.35919, 0.37715, 0.39495, 0.41251, 0.42974, 0.44655, 0.46288, 0.47862, 0.49369, 0.50803, 0.52154, 0.53416, 0.54581, 0.55642, 0.56592, 0.57426, 0.58139, 0.58725, 0.5918, 0.59501, 0.59685, 0.59729, 0.59632, 0.59393, 0.59012, 0.5849, 0.57829, 0.5703, 0.56097, 0.55034, 0.53845, 0.52535, 0.51112, 0.4958], "p3": [0.0, 0.0, 0.0, 1e-05, 3e-05, 7e-05, 0.00015, 0.00028, 0.00048, 0.00077, 0.00116, 0.00169, 0.00237, 0.00324, 0.00432, 0.00563, 0.00722, 0.0091, 0.0113, 0.01385, 0.01678, 0.02011, 0.02388, 0.02809, 0.03277, 0.03793, 0.0436, 0.04979, 0.0565, 0.06374, 0.07151, 0.07981, 0.08863, 0.09797, 0.10781, 0.11814, 0.12892, 0.14015, 0.15178, 0.16378, 0.17612, 0.18875, 0.20163, 0.2147, 0.22793, 0.24124, 0.2546, 0.26793, 0.28117, 0.29427, 0.30715, 0.31976, 0.33203, 0.34388, 0.35527, 0.36612, 0.37637, 0.38596, 0.39483, 0.40293, 0.4102, 0.41659, 0.42206, 0.42657, 0.43008, 0.43255, 0.43397, 0.43431, 0.43355, 0.43168, 0.42871, 0.42463, 0.41945, 0.4132, 0.40588, 0.39753, 0.38819, 0.37789, 0.36669, 0.35463, 0.34177], "m3": [0.0, 0.0, 0.0, 1e-05, 3e-05, 7e-05, 0.00015, 0.00028, 0.00048, 0.00077, 0.00116, 0.00169, 0.00237, 0.00324, 0.00432, 0.00563, 0.00722, 0.0091, 0.0113, 0.01385, 0.01678, 0.02011, 0.02388, 0.02809, 0.03277, 0.03793, 0.0436, 0.04979, 0.0565, 0.06374, 0.07151, 0.07981, 0.08863, 0.09797, 0.10781, 0.11814, 0.12892, 0.14015, 0.15178, 0.16378, 0.17612, 0.18875, 0.20163, 0.2147, 0.22793, 0.24124, 0.2546, 0.26793, 0.28117, 0.29427, 0.30715, 0.31976, 0.33203, 0.34388, 0.35527, 0.36612, 0.37637, 0.38596, 0.39483, 0.40293, 0.4102, 0.41659, 0.42206, 0.42657, 0.43008, 0.43255, 0.43397, 0.43431, 0.43355, 0.43168, 0.42871, 0.42463, 0.41945, 0.4132, 0.40588, 0.39753, 0.38819, 0.37789, 0.36669, 0.35463, 0.34177], "p2": [0.0, 0.0, 0.0, 1e-05, 2e-05, 5e-05, 0.0001, 0.00019, 0.00032, 0.00051, 0.00077, 0.00112, 0.00158, 0.00216, 0.00288, 0.00376, 0.00481, 0.00606, 0.00753, 0.00923, 0.01119, 0.01341, 0.01591, 0.01872, 0.02184, 0.02528, 0.02906, 0.03318, 0.03764, 0.04246, 0.04763, 0.05316, 0.05903, 0.06524, 0.07178, 0.07864, 0.0858, 0.09325, 0.10097, 0.10893, 0.1171, 0.12546, 0.13397, 0.14261, 0.15133, 0.16011, 0.16889, 0.17764, 0.18632, 0.19489, 0.20329, 0.21148, 0.21943, 0.22708, 0.2344, 0.24133, 0.24783, 0.25386, 0.25939, 0.26437, 0.26877, 0.27255, 0.27568, 0.27814, 0.2799, 0.28094, 0.28125, 0.2808, 0.27959, 0.27762, 0.27488, 0.27138, 0.26713, 0.26215, 0.25644, 0.25003, 0.24296, 0.23525, 0.22694, 0.21808, 0.2087], "pi": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]};
const P13LEAD086 = {"0": 1.0, "p2": 0.5, "pi": 0.0, "p3": 0.75};
const FRD086 = [0.0, 0.105, 0.209, 0.314, 0.419, 0.524, 0.628, 0.733, 0.838, 0.942, 1.047, 1.152, 1.257, 1.361, 1.466, 1.571, 1.676, 1.78, 1.885, 1.99, 2.094, 2.199, 2.304, 2.409, 2.513, 2.618, 2.723, 2.827, 2.932, 3.037, 3.142, 3.246, 3.351, 3.456, 3.56, 3.665, 3.77, 3.875, 3.979, 4.084, 4.189, 4.294, 4.398, 4.503, 4.608, 4.712, 4.817, 4.922, 5.027, 5.131, 5.236, 5.341, 5.445, 5.55, 5.655, 5.76, 5.864, 5.969, 6.074, 6.178, 6.283];
const FR086 = {"1.0": [0.8824, 0.914, 0.941, 0.9632, 0.9804, 0.9922, 0.9987, 0.9997, 0.9953, 0.9854, 0.9702, 0.9498, 0.9245, 0.8946, 0.8603, 0.8221, 0.7804, 0.7356, 0.6882, 0.6387, 0.5877, 0.5358, 0.4835, 0.4313, 0.3799, 0.3299, 0.2817, 0.2358, 0.1929, 0.1533, 0.1176, 0.086, 0.059, 0.0368, 0.0196, 0.0078, 0.0013, 0.0003, 0.0047, 0.0146, 0.0298, 0.0502, 0.0755, 0.1054, 0.1397, 0.1779, 0.2196, 0.2644, 0.3118, 0.3613, 0.4123, 0.4642, 0.5165, 0.5687, 0.6201, 0.6701, 0.7183, 0.7642, 0.8071, 0.8467, 0.8824], "0.6": [0.7295, 0.7484, 0.7646, 0.7779, 0.7882, 0.7953, 0.7992, 0.7998, 0.7972, 0.7912, 0.7821, 0.7699, 0.7547, 0.7367, 0.7162, 0.6933, 0.6682, 0.6413, 0.6129, 0.5832, 0.5526, 0.5215, 0.4901, 0.4588, 0.428, 0.3979, 0.369, 0.3415, 0.3157, 0.292, 0.2705, 0.2516, 0.2354, 0.2221, 0.2118, 0.2047, 0.2008, 0.2002, 0.2028, 0.2088, 0.2179, 0.2301, 0.2453, 0.2633, 0.2838, 0.3067, 0.3318, 0.3587, 0.3871, 0.4168, 0.4474, 0.4785, 0.5099, 0.5412, 0.572, 0.6021, 0.631, 0.6585, 0.6843, 0.708, 0.7295], "0.2": [0.5765, 0.5828, 0.5882, 0.5926, 0.5961, 0.5984, 0.5997, 0.5999, 0.5991, 0.5971, 0.594, 0.59, 0.5849, 0.5789, 0.5721, 0.5644, 0.5561, 0.5471, 0.5376, 0.5277, 0.5175, 0.5072, 0.4967, 0.4863, 0.476, 0.466, 0.4563, 0.4472, 0.4386, 0.4307, 0.4235, 0.4172, 0.4118, 0.4074, 0.4039, 0.4016, 0.4003, 0.4001, 0.4009, 0.4029, 0.406, 0.41, 0.4151, 0.4211, 0.4279, 0.4356, 0.4439, 0.4529, 0.4624, 0.4723, 0.4825, 0.4928, 0.5033, 0.5137, 0.524, 0.534, 0.5437, 0.5528, 0.5614, 0.5693, 0.5765], "0.0": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]};
const FUT4086 = [[4, 8, 9, 10, 10], [4, 10, 12, 14, 15, 16, 16]];
const FUTD086 = [[2, 3, 4], [4, 10, 16], [8, 36, 64]];
const MSE086 = [0.5, 0.41, 0.38882, 0.36556, 0.33663, 0.32438, 0.31288, 0.29882, 0.29206, 0.28583, 0.27828, 0.27444, 0.27092, 0.26667, 0.26444];
const CON086 = {"D": [0.77621, 0.56335, 0.41434, 0.31004, 0.23703, 0.18592, 0.15014, 0.1251, 0.10757, 0.0953, 0.08671, 0.0807, 0.07649, 0.07354, 0.07148, 0.07004, 0.06902, 0.06832, 0.06782, 0.06748, 0.06723, 0.06706, 0.06694, 0.06686, 0.0668], "B": [0.77621, 0.56335, 0.41434, 0.31004, 0.23703, 0.18592, 0.15014, 0.1251, 0.10757, 0.0953, 0.08671, 0.0807, 0.07649, 0.07354, 0.07148, 0.07004, 0.06902, 0.06832, 0.06782, 0.06748, 0.06723, 0.06706, 0.06694, 0.06686, 0.0668], "floor": 0.06667};
const ROT086 = [2.0, 4.0, 6.0, 1.7168, 3.7168, 5.7168, 1.4336, 3.4336, 5.4336, 1.1504, 3.1504, 5.1504, 0.8673, 2.8673, 4.8673, 0.5841, 2.5841, 4.5841, 0.3009, 2.3009, 4.3009, 0.0177, 2.0177, 4.0177, 6.0177, 1.7345, 3.7345, 5.7345, 1.4513, 3.4513, 5.4513, 1.1681, 3.1681, 5.1681, 0.885, 2.885, 4.885, 0.6018, 2.6018, 4.6018, 0.3186, 2.3186, 4.3186, 0.0354, 2.0354, 4.0354, 6.0354, 1.7522, 3.7522, 5.7522, 1.469, 3.469, 5.469, 1.1858, 3.1858, 5.1858, 0.9027, 2.9027, 4.9027, 0.6195];
const OVT086 = [0.0, 0.0524, 0.1047, 0.1571, 0.2094, 0.2618, 0.3142, 0.3665, 0.4189, 0.4712, 0.5236, 0.576, 0.6283, 0.6807, 0.733, 0.7854, 0.8378, 0.8901, 0.9425, 0.9948, 1.0472, 1.0996, 1.1519, 1.2043, 1.2566, 1.309, 1.3614, 1.4137, 1.4661, 1.5184, 1.5708, 1.6232, 1.6755, 1.7279, 1.7802, 1.8326, 1.885, 1.9373, 1.9897, 2.042, 2.0944, 2.1468, 2.1991, 2.2515, 2.3038, 2.3562, 2.4086, 2.4609, 2.5133, 2.5656, 2.618, 2.6704, 2.7227, 2.7751, 2.8274, 2.8798, 2.9322, 2.9845, 3.0369, 3.0892, 3.1416];
const OVX086 = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
const OVY086 = [0.5, 0.55226, 0.60396, 0.65451, 0.70337, 0.75, 0.79389, 0.83457, 0.87157, 0.90451, 0.93301, 0.95677, 0.97553, 0.98907, 0.99726, 1.0, 0.99726, 0.98907, 0.97553, 0.95677, 0.93301, 0.90451, 0.87157, 0.83457, 0.79389, 0.75, 0.70337, 0.65451, 0.60396, 0.55226, 0.5, 0.44774, 0.39604, 0.34549, 0.29663, 0.25, 0.20611, 0.16543, 0.12843, 0.09549, 0.06699, 0.04323, 0.02447, 0.01093, 0.00274, 0.0, 0.00274, 0.01093, 0.02447, 0.04323, 0.06699, 0.09549, 0.12843, 0.16543, 0.20611, 0.25, 0.29663, 0.34549, 0.39604, 0.44774, 0.5];
const LIE086 = [10, 24];
const COST086 = [141, 7];
const NOT086 = [-1, 1, 1, 1];
const RANK086 = [3, 1, 2];
/* ---- film 086 helpers ---- */
function cell086(x, y, w, h, s, col, a, size = 20, fillA = 0.3) { if (a <= 0) return; fillBox(x, y, w, h, col, a * fillA); rect63(x, y, w, h, col, a, 1.6); lbl(s, x + w / 2, y + h / 2 + size * 0.35, C.white, a, size); }
function interp086(arr, x) { if (x <= arr[0][0]) return arr[0][1]; for (let i = 1; i < arr.length; i++) if (x <= arr[i][0]) { const f = (x - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]); return arr[i - 1][1] * (1 - f) + arr[i][1] * f; } return arr[arr.length - 1][1]; }
/* five-mode coupling graph : square 3–13 / 0–1 plus the leaf 2 ; returns node positions */
const GPOS086 = { '0': [0, 1], '1': [1, 1], '13': [1, 0], '3': [0, 0], '2': [-0.85, 1] };
const GEDGE086 = [['0', '1', 'c'], ['3', '13', 'c'], ['0', '3', 'm'], ['1', '13', 'm'], ['0', '2', 'g']];
function graph086(x0, y0, s, a, o = {}) {
  if (a <= 0) return null;
  const P = {}; for (const k in GPOS086) P[k] = [x0 + GPOS086[k][0] * s, y0 + GPOS086[k][1] * s];
  const col = { c: C.cyan, m: C.mag, g: C.gold };
  GEDGE086.forEach(([u, v, c], i) => { const ea = o.edge ? o.edge[i] : 1; line(P[u][0], P[u][1], P[v][0], P[v][1], col[c], a * ea, 3.5); });
  const labs = o.labs || { '0': '0', '1': '1', '13': '13', '3': '3', '2': '2' };
  for (const k in P) { fillBox(P[k][0] - 30, P[k][1] - 22, 60, 44, 'rgba(0,0,0,0.85)', a); ring(P[k][0], P[k][1], 26, k === '2' ? C.gold : C.white, a, 2); lbl(labs[k], P[k][0], P[k][1] + 7, C.white, a, labs[k].length > 2 ? 15 : 19); }
  return P;
}
function bars086(x0, y0, vals, bw, gap, hs, a, col, labs, top) {
  if (a <= 0) return;
  vals.forEach((v, i) => { const x = x0 + i * (bw + gap), h = Math.abs(v) * hs, c = v < 0 ? C.red : (Array.isArray(col) ? col[i] : col); fillBox(x, v < 0 ? y0 : y0 - h, bw, h, c, a * 0.45); rect63(x, v < 0 ? y0 : y0 - h, bw, h, c, a, 1.6); if (labs) lbl(labs[i], x + bw / 2, y0 + (v < 0 ? h + 26 : 26), C.dim, a, 15); if (top) lbl(top[i], x + bw / 2, v < 0 ? y0 + h + 52 : y0 - h - 10, C.white, a, 16); });
  line(x0 - 8, y0, x0 + vals.length * (bw + gap), y0, C.dim, a, 1.2);
}
function mat086(x, y, M, cw, a, colf, size = 18) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((v, j) => { const c = colf ? colf(i, j, v) : C.cyan; box(x + j * cw, y + i * cw, cw - 6, cw - 6, c, a, 1.6, 'rgba(0,0,0,0.5)'); lbl(String(v), x + j * cw + (cw - 6) / 2, y + i * cw + (cw - 6) / 2 + size * 0.36, c, a, size); }));
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u / 1.2);
  omega63(470, 450, 150, s0, C.cyan, 7);
  pyrG64(470, 470, 190, 0.6 + t * 0.2, s0 * 0.9, [1, 1, 1], 0.7);
  const items = [['relations and coherent kernels', 'RELATIONS → KERNELS', 'L₃ = {000, 100, 010, 001, 101} ,  K ⪰ 0', C.gold], ['Hilbert spaces and probability', 'HILBERT SPACE → PROBABILITY', 'dim H_K = rank K ,  μ(E) = tr(ρE)', C.cyan], ['record networks', 'COMPLETE RECORD NETWORKS', 'Σₐ Φₐ trace preserving , any topological order', C.mag], ['the future quotient and computation by reflection', 'FUTURE QUOTIENT · REFLECTION', 'V∞ ,  R_u = I − 2|u⟩⟨u|', C.green]];
  items.forEach(([ph, h, s, col], i) => { const q = Q(S, 0, ph, 0.6); box(930, 215 + i * 150, 860, 125, col, q, 2, 'rgba(0,0,0,0.45)'); lbl(h, 1360, 255 + i * 150, col, q, 21); lblG(s, 1360, 305 + i * 150, C.white, q, 26); });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  omega63(W / 2, 390, 170, rp, C.cyan, 7);
  pyrG64(W / 2, 410, 210, 0.5 + t * 0.25, rp * 0.9, [1, 1, 1], 0.6);
  chip(330, 360, 340, 58, 'five modes', C.gold, rp, 22); chip(330, 445, 340, 58, 'one hidden coupling', C.mag, rp, 22); chip(330, 530, 340, 58, 'three mirrors', C.green, rp, 22);
  box(1420, 340, 380, 190, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('one phase address', 1610, 410, C.cyan, rp, 22); lblG('V∞ = Herm(ℂᵈ)', 1610, 470, C.white, rp, 30);
  txt(scramble('AURIC V10 · COHERENCE', rp, 486), W / 2, 760, { size: 62, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 5 });
  txt('AURIC V10 · 相 干 关 系 与 递 归 观 测', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 086 · AURIC_COHERENT_RELATIONS_AND_RECURSIVE_OBSERVATION_THEORY_V10 · §1–19', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FIBER (§1–2) ---- */
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A response is fixed', 0.6);
  if (f1 > 0) {
    const fq = Q(S, 0, 'counted by Fibonacci numbers', 0.6) * f1;
    lbl('|Lₙ| = F(n + 2) :  no two adjacent ones', 530, 250, C.gold, fq, 19);
    const by = 470;
    FIBN086.forEach((v, i) => { const qq = clamp(fq * 1.6 - i / 14), h = v * 1.45, x = 170 + i * 72; fillBox(x, by - h, 50, h, C.gold, qq * 0.4); rect63(x, by - h, 50, h, C.gold, qq, 1.4); lbl(String(v), x + 25, by - h - 10, C.white, qq, 16); lbl('n=' + (i + 1), x + 25, by + 24, C.dim, qq, 13); });
    line(160, by, 900, by, C.dim, fq, 1.2);
    const mq = Q(S, 0, 'at length three they are the five modes', 0.6) * f1;
    const tiles = [['000', '0', C.white], ['100', '1', C.cyan], ['010', '2', C.gold], ['001', '3', C.mag], ['101', '13', C.green]];
    tiles.forEach(([b, m, col], i) => { const x = 160 + i * 150; cell086(x, 560, 130, 70, b, col, mq, 24); lbl('mode ' + m, x + 65, 660, col, mq, 16); });
    lbl('x = first bit , z = middle bit , y = third bit', 530, 705, C.dim, mq, 15);
    const kq = Q(S, 0, 'Fixing three occupation means', 0.6) * f1;
    chip(1380, 255, 780, 54, 'E[x] = 2/5 ,  E[y] = 2/5 ,  E[z] = 1/5   fixed', C.cyan, kq, 22);
    const px = 1040, py = 770, ph = 300;
    plotAxes(px, py, 690, ph, kq, 'mode 0  1  2  3  13', 'probability');
    const sl = Q(S, 0, 'still leaves one sliding direction', 0.6) * f1;
    const kap = 0.2 + 0.2 * Math.sin((u - 2) * 1.3) * sl;
    const p = [kap, 0.4 - kap, 0.2, 0.4 - kap, kap], cols = [C.white, C.cyan, C.gold, C.mag, C.green];
    p.forEach((v, i) => { const x = px + 40 + i * 130, h = v / 0.45 * ph; fillBox(x, py - h, 80, h, cols[i], kq * 0.45); rect63(x, py - h, 80, h, cols[i], kq, 1.6); lbl(v.toFixed(2), x + 40, py - h - 10, C.white, kq, 16); });
    const dq = Q(S, 0, 'set by kappa', 0.6) * f1;
    chip(1380, 330, 780, 54, 'p = (κ , 2/5 − κ , 1/5 , 2/5 − κ , κ) ,  0 ≤ κ ≤ 2/5', C.gold, dq, 20);
    lbl('direction (1, −1, 0, −1, 1) ,  κ = p₁₃ = E[xy]', 1380, 395, C.white, dq, 18);
    lbl('κ = ' + kap.toFixed(2), px + 40 + 4 * 130 + 40, py - kap / 0.45 * ph - 40, C.green, dq, 18);
  }
  const q = Q(S, 1, 'A response is fixed', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 56, 'f = f₀ + (f₁ − f₀)x + (f₃ − f₀)y + (f₂ − f₀)z + J_f · xy', C.white, q, 20);
    const jq = Q(S, 1, 'exactly when its joint coefficient J vanishes', 0.6);
    chip(530, 345, 860, 60, 'J_f = f₁₃ − f₁ − f₃ + f₀', C.gold, jq, 26);
    lbl('E[f] = (terms in x̄, ȳ, z̄) + J_f κ  ⇒  fixed by the means ⇔ J_f = 0', 530, 410, C.dim, jq, 15);
    lbl('xy is the joint feature the three means leave open', 530, 440, C.dim, jq, 15);
    const hq = Q(S, 1, 'For five quantum modes near the uniform state', 0.6);
    const gx = 1060, gy = 300, cw = 74;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const dg = i === j, col = dg ? C.gold : C.cyan, qq = clamp(hq * 1.6 - (i * 5 + j) / 40); box(gx + j * cw, gy + i * cw, cw - 6, cw - 6, col, qq, 1.6, dg ? 'rgba(40,30,0,0.45)' : 'rgba(0,30,40,0.45)'); lbl(dg ? 'p' + ['₀', '₁', '₂', '₃', '₁₃'][i] : 'ρ', gx + j * cw + 34, gy + i * cw + 43, col, qq, 17); }
    lbl('Herm(ℂ⁵) : 25 real directions near I/5', gx + 185, gy - 22, C.white, hq, 17);
    const nq = Q(S, 1, 'twenty-one real directions stay invisible', 0.6);
    bars086(1480, 690, HID086, 50, 30, 9, nq, [C.white, C.red, C.green, C.gold, C.cyan], ['all', 'fixed', 'free', 'κ', 'coh.'], HID086.map(String));
    lbl('4 fixed : I , Mx , My , Mz', 1660, 760, C.dim, nq, 14);
    const sq = Q(S, 1, 'kappa and twenty coherences', 0.6);
    stamp('21 = 1 + 20 INVISIBLE', 530, 560, sq, C.green, 32, -0.04);
    lbl('Mx , My , Mz diagonal and commuting ; Mx My = |13⟩⟨13|', 530, 650, C.dim, sq, 15);
    lbl('recomputed : null space of the four trace constraints has dimension 21', 530, 680, C.dim, sq, 15);
  }
};

/* ---- 03 KERNEL (§3–4) ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [0, 'Pairwise consistency is not enough', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'A complex structure needs a metric', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Coherence enters as a positive kernel', 0.6) * f1;
    chip(530, 255, 860, 56, 'k(x, y) = conj k(y, x) ,  a†K a ≥ 0 for all a', C.cyan, q, 22);
    const vq = Q(S, 0, 'labels become vectors with the kernel as inner products', 0.6) * f1;
    const cx = 330, cy = 520, R = 150;
    ring(cx, cy, R, C.dim, vq * 0.6, 1.5); line(cx - R - 20, cy, cx + R + 20, cy, C.dim, vq * 0.4, 1); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, vq * 0.4, 1);
    [[0.3, 'φ(x₁)', C.gold], [1.35, 'φ(x₂)', C.mag], [2.5, 'φ(x₃)', C.green]].forEach(([an, s, col], i) => { const qq = clamp(vq * 1.6 - i / 4), x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); arrow(cx, cy, x, y, col, qq, 3); lbl(s, x + (i === 2 ? -50 : 40), y - 6, col, qq, 18); });
    lbl('three labels , rank 2', cx, cy + R + 50, C.dim, vq, 16);
    const dq = Q(S, 0, 'in dimension equal to its rank', 0.6) * f1;
    chip(800, 400, 340, 56, 'H_K = ℂ^X / ker K', C.white, dq, 20);
    chip(800, 480, 340, 56, 'dim H_K = rank K', C.gold, dq, 22);
    chip(800, 560, 340, 56, 'unique up to unitary W', C.cyan, Q(S, 0, 'unique up to unitary', 0.6) * f1, 20);
    const pq = Q(S, 0, 'Pairwise consistency is not enough', 0.6) * f1;
    mat086(1060, 260, [[1, -1, -1], [-1, 1, -1], [-1, -1, 1]], 86, pq, (i, j) => (i === j ? C.gold : C.cyan), 24);
    lbl('every 2 × 2 block : eigenvalues 0 , 2', 1450, 300, C.green, pq, 17, 'left');
    lbl('each two-point cut has a Gram vector picture', 1450, 330, C.dim, pq, 14, 'left');
    const hl = Math.floor(((u * 0.9) % 3)), blk = [[0, 1], [0, 2], [1, 2]][hl];
    blk.forEach(i => blk.forEach(j => rect63(1060 + j * 86 - 4, 260 + i * 86 - 4, 88, 88, C.green, pq * 0.9, 2.4)));
    const eq = Q(S, 0, 'this kernel has eigenvalue minus one', 0.6) * f1;
    bars086(1530, 620, KEIG086, 60, 30, 55, eq, C.cyan, ['−1', '2', '2'], null);
    lbl('spectrum of K', 1660, 750, C.dim, eq, 15);
    lbl('K (1, 1, 1)ᵀ = − (1, 1, 1)ᵀ', 1240, 560, C.red, eq, 19);
    stamp('NOT POSITIVE', 1200, 690, eq, C.red, 28, -0.05);
  }
  const q = Q(S, 1, 'A complex structure needs a metric', 0.6, 0.3);
  if (q > 0) {
    const cx = 330, cy = 540, R = 150, an = 0.5 + 0.4 * Math.sin(u);
    ring(cx, cy, R, C.dim, q * 0.6, 1.5);
    arrow(cx, cy, cx + R * Math.cos(an), cy - R * Math.sin(an), C.gold, q, 3.5); lbl('v', cx + R * Math.cos(an) + 18, cy - R * Math.sin(an), C.gold, q, 20);
    arrow(cx, cy, cx + R * Math.cos(an + Math.PI / 2), cy - R * Math.sin(an + Math.PI / 2), C.mag, q, 3.5); lbl('Jv', cx + R * Math.cos(an + Math.PI / 2) - 26, cy - R * Math.sin(an + Math.PI / 2) - 8, C.mag, q, 20);
    lbl('metric g + orientation ⇒ unique J', cx, cy + R + 44, C.white, q, 17);
    chip(760, 360, 480, 56, 'J² = −I ,  g(v, Jv) = 0', C.gold, q, 22);
    const oq = Q(S, 1, 'odd dimensions have none', 0.6);
    chip(760, 450, 480, 56, '(det J)² = det(−I) = (−1)ᵈ', C.red, oq, 22);
    lbl('d odd  ⇒  −1 : no complex structure', 760, 510, C.red, oq, 17);
    lbl('three orthogonal readouts pick a plane ,', 760, 540, C.dim, oq, 14);
    lbl('not a complex 3-space', 760, 562, C.dim, oq, 14);
    const lq = Q(S, 1, 'Kernel-preserving refinements glue into one Hilbert limit', 0.6);
    const bx = 1110;
    [['H_s', C.cyan], ['H_t', C.mag], ['H_∞', C.green]].forEach(([s, col], i) => { const qq = clamp(lq * 1.6 - i / 3), x = bx + i * 230; box(x, 330, 160, 110, col, qq, 2, 'rgba(0,0,0,0.5)'); lblG(s, x + 80, 398, C.white, qq, 30); if (i < 2) arrow(x + 162, 385, x + 226, 385, C.dim, qq, 2.5); });
    lbl('U_ts', bx + 194, 368, C.dim, lq, 15); lbl('j_t', bx + 424, 368, C.dim, lq, 15);
    chip(1420, 500, 680, 54, 'A_ts† K_t A_ts = K_s  ⇒  isometry U_ts', C.cyan, lq, 20);
    lbl('U_ut U_ts = U_us ;  j_t U_ts = j_s ;  the limit is unique', 1420, 555, C.dim, lq, 15);
    const xq = Q(S, 1, 'lifted readouts keep an outside outcome', 0.6);
    chip(1420, 650, 680, 56, '{ U Eₐ U† }ₐ  ∪  { I − U U† }', C.gold, xq, 23);
    lbl('outside outcome has probability 0 on U ρ U† ; old outcomes unchanged', 1420, 708, C.dim, xq, 15);
  }
};

/* ---- 04 BORN (§5–6) ---- */
SCENES.born = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Five modes alone do not select quantum theory', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'a normalised weight on effects', 0.6) * f1;
    const bx = 170, bw = 640;
    box(bx, 280, bw, 60, C.dim, q, 1.6, 'rgba(0,0,0,0.4)'); lbl('I', bx + bw + 24, 318, C.white, q, 20);
    const aq = Q(S, 0, 'additive whenever two effects fit under the identity', 0.6) * f1;
    fillBox(bx, 280, bw * 0.38, 60, C.cyan, aq * 0.45); rect63(bx, 280, bw * 0.38, 60, C.cyan, aq, 2); lbl('E', bx + bw * 0.19, 318, C.white, aq, 22);
    fillBox(bx + bw * 0.38, 280, bw * 0.34, 60, C.mag, aq * 0.45); rect63(bx + bw * 0.38, 280, bw * 0.34, 60, C.mag, aq, 2); lbl('F', bx + bw * 0.55, 318, C.white, aq, 22);
    lbl('E + F ⪯ I', bx + bw * 0.36, 375, C.white, aq, 18);
    chip(490, 440, 680, 56, 'μ(E + F) = μ(E) + μ(F) ,  μ(I) = 1', C.cyan, aq, 22);
    const tq = Q(S, 0, 'the trace against one unique density operator', 0.6) * f1;
    box(220, 500, 540, 90, C.gold, tq, 2.5, 'rgba(40,30,0,0.5)'); lblG('μ(E) = tr(ρE)', 490, 560, C.white, tq, 38);
    lbl('ρ ⪰ 0 , tr ρ = 1 , unique', 490, 625, C.gold, tq, 17);
    lbl('effect form of Gleason : Busch , PRL 91 (2003) 120403', 490, 660, C.cyan, tq, 15);
    lbl('recomputed : nine effect values reconstruct ρ exactly (d = 3)', 490, 690, C.dim, tq, 14);
    const pq = Q(S, 0, 'a pure preparation gives the squared modulus of the inner product', 0.6) * f1;
    const cx = 1390, cy = 470, R = 180, a1 = 1.1, a2 = 0.35;
    ring(cx, cy, R, C.dim, pq * 0.6, 1.5);
    arrow(cx, cy, cx + R * Math.cos(a1), cy - R * Math.sin(a1), C.gold, pq, 3.5); lbl('ψ', cx + R * Math.cos(a1) + 16, cy - R * Math.sin(a1) - 8, C.gold, pq, 22);
    arrow(cx, cy, cx + R * Math.cos(a2), cy - R * Math.sin(a2), C.cyan, pq, 3.5); lbl('v', cx + R * Math.cos(a2) + 20, cy - R * Math.sin(a2), C.cyan, pq, 22);
    const pr = Math.cos(a1 - a2);
    dashed(cx + R * Math.cos(a1), cy - R * Math.sin(a1), cx + R * pr * Math.cos(a2), cy - R * pr * Math.sin(a2), C.dim, pq, 1.5);
    chip(cx, 720, 640, 60, 'μ(|v⟩⟨v|) = |⟨v, ψ⟩|²', C.gold, pq, 26);
    lbl('Σⱼ |⟨eⱼ, ψ⟩|² = 1 for every orthonormal basis', cx, 780, C.dim, pq, 15);
  }
  const q = Q(S, 1, 'Five modes alone do not select quantum theory', 0.6, 0.3);
  if (q > 0) {
    const tq = Q(S, 1, 'a classical chain on the same Fibonacci tree', 0.6);
    const lv = [[[]], [[0], [1]], [[0, 0], [0, 1], [1, 0]], [[0, 0, 0], [0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 0, 1]]];
    const pos = {};
    lv.forEach((ws, d) => ws.forEach((w, i) => { const x = 160 + d * 230, y = 300 + (i + 0.5) * (420 / ws.length); pos[w.join('')] = [x, y]; }));
    lv.forEach((ws, d) => ws.forEach(w => { const k = w.join(''); if (d > 0) { const pk = w.slice(0, -1).join(''), qq = clamp(tq * 1.6 - d / 4); const pp = pos[pk], cc = pos[k], last = w[w.length - 1], prev = w.length > 1 ? w[w.length - 2] : 0; line(pp[0] + 30, pp[1], cc[0] - 30, cc[1], last ? C.mag : C.cyan, qq, 2.2); lbl(prev === 1 ? '1' : (last ? '1 − p' : 'p'), (pp[0] + cc[0]) / 2, (pp[1] + cc[1]) / 2 - 8, C.dim, qq, 13); } }));
    lv.forEach((ws, d) => ws.forEach(w => { const k = w.join(''), qq = clamp(tq * 1.6 - d / 4), pp = pos[k]; box(pp[0] - 32, pp[1] - 16, 64, 32, C.white, qq, 1.4, 'rgba(0,0,0,0.6)'); lbl(k || '∅', pp[0], pp[1] + 6, C.white, qq, 15); }));
    lbl('|Ωₙ| = 1 , 2 , 3 , 5   (F(n + 2))', 500, 760, C.gold, tq, 17);
    const mq = Q(S, 1, 'for any p between zero and one', 0.6);
    chip(1390, 255, 760, 54, 'T = [[p , 1 − p] , [1 , 0]] ,  b₀ = 0 ,  μₙ(w) = Π T(bⱼ₋₁, bⱼ)', C.white, mq, 18);
    const px = 1060, py = 560, ph = 220;
    plotAxes(px, py, 700, ph, mq, '000  100  010  001  101', 'μ₃');
    MU3086.forEach((v, i) => { const x = px + 30 + i * 135, h = v / 0.55 * ph; fillBox(x, py - h, 46, h, C.cyan, mq * 0.45); rect63(x, py - h, 46, h, C.cyan, mq, 1.5); lbl(v.toFixed(3), x + 23, py - h - 8, C.cyan, mq, 13); });
    MU3b086.forEach((v, i) => { const x = px + 82 + i * 135, h = v / 0.55 * ph; fillBox(x, py - h, 46, h, C.gold, mq * 0.45); rect63(x, py - h, 46, h, C.gold, mq, 1.5); lbl(v.toFixed(3), x + 23, py - h - 8, C.gold, mq, 13); });
    lbl('cyan p = 0.6 ,  gold p = 0.3 : both prefix-consistent', 1410, py + 60, C.dim, mq, 15);
    const kq = Q(S, 1, 'positive kernels, a Hilbert limit and a recursive predictor', 0.6);
    chip(1410, 680, 760, 50, 'Kₙ = diag μₙ ,  Aᵀ K(n+1) A = Kₙ  ⇒  Hilbert limit', C.green, kq, 19);
    lbl('memory m(n+1) = F(mₙ, b(n+1)) , prediction qₙ = G(mₙ)', 1410, 735, C.dim, kq, 15);
    stamp('CLASSICAL , COMMUTING READOUTS', 1410, 800, Q(S, 1, 'with commuting readouts', 0.6), C.red, 26, -0.03);
  }
};

/* ---- 05 INSTRUMENT (§7–8) ---- */
SCENES.instrument = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'published'], [0, 'Identity and reset share', 'theory'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Quantum lifts of a classical function', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'An observation atom is an instrument', 0.6) * f1;
    chip(530, 255, 860, 56, '{Φₐ} : each CP ,  Σₐ Φₐ trace preserving ,  p(a|ρ) = tr Φₐ(ρ)', C.cyan, q, 19);
    const cq = Q(S, 0, 'Complete positivity means a positive Choi matrix and a Kraus form', 0.6) * f1;
    chip(530, 335, 860, 56, 'id ⊗ Φ ⪰ 0  ⇔  J_Φ ⪰ 0  ⇔  Φ(X) = Σ K_α X K_α†', C.gold, cq, 20);
    lbl('Choi 1975 ; Stinespring 1955 :  Φ(X) = tr_E (V X V†)', 530, 395, C.dim, cq, 15);
    const rq = Q(S, 0, 'with smallest environment the Choi rank', 0.6) * f1;
    const Ji = [[1, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 1]], Jr = [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
    mat086(170, 440, Ji, 62, rq, (i, j, v) => (v ? C.gold : C.dim), 18); mat086(540, 440, Jr, 62, rq, (i, j, v) => (v ? C.mag : C.dim), 18);
    lbl('J of identity : rank 1', 290, 720, C.gold, rq, 16); lbl('J of reset : rank 2', 660, 720, C.mag, rq, 16);
    lbl('no universal cloning ; non-orthogonal states have no error-free one-shot identification', 530, 770, C.dim, rq, 14);
    const iq = Q(S, 0, 'Identity and reset share the effect identity', 0.6) * f1;
    [['identity', 'ρ  ↦  ρ', C.gold, 300], ['reset', 'ρ  ↦  |0⟩⟨0|', C.mag, 520]].forEach(([nm, s, col, y]) => { box(1050, y, 720, 150, col, iq, 2, 'rgba(0,0,0,0.5)'); lbl(nm, 1120, y + 45, col, iq, 20, 'left'); lblG(s, 1410, y + 95, C.white, iq, 30); lbl('effect E = I', 1700, y + 45, C.green, iq, 17, 'right'); });
    stamp('SAME EFFECT , DIFFERENT STATES', 1410, 740, Q(S, 0, 'yet leave different states', 0.6) * f1, C.red, 26, -0.04);
  }
  const q = Q(S, 1, 'Quantum lifts of a classical function', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 56, 'Φ_G(|x⟩⟨x′|) = G(x, x′) |f(x)⟩⟨f(x′)| ,  G ⪰ 0', C.cyan, q, 20);
    lbl('identity blocks on every fibre f⁻¹(y) ; min environment = rank G', 530, 312, C.dim, q, 15);
    const nq = Q(S, 1, 'For NAND, a vector z of norm at most one', 0.6);
    const G = [['1', '0', '0', 'z₁'], ['0', '1', '0', 'z₂'], ['0', '0', '1', 'z₃'], ['z̄₁', 'z̄₂', 'z̄₃', '1']];
    mat086(300, 360, G, 80, nq, (i, j) => (i < 3 && j < 3 ? C.gold : i === 3 && j === 3 ? C.mag : C.cyan), 20);
    lbl('fibre {00, 01, 10} → 1', 460, 700, C.gold, nq, 15); lbl('fibre {11} → 0', 460, 725, C.mag, nq, 15);
    lbl('Schur complement : G ⪰ 0 ⇔ ‖z‖ ≤ 1', 460, 760, C.white, nq, 15);
    const pq = Q(S, 1, 'four environment dimensions', 0.6);
    const px = 1060, py = 680, pw = 680, ph = 340, xS = x => px + x / 1.15 * pw, yS = v => py - (v + 0.2) / 1.45 * ph;
    plotAxes(px, py, pw, ph, pq, '‖z‖', 'smallest eigenvalue of G');
    line(px, yS(0), px + pw, yS(0), C.dim, pq * 0.6, 1);
    curve(p => [xS(p * 1.1), yS(1 - p * 1.1)], 40, C.cyan, pq * 0.6, 2);
    NAND086.forEach(r => { const ok = r[0] <= 1; dot(xS(r[0]), yS(r[1]), 9, r[2] === 3 ? 'g' : ok ? 'c' : 'r', pq); lbl(ok ? 'rank ' + r[2] : 'not PSD', xS(r[0]) + 12, yS(r[1]) - 14, r[2] === 3 ? C.gold : ok ? C.cyan : C.red, pq, 13); });
    lbl('‖z‖ < 1 : environment 4', px + pw - 10, py - ph + 40, C.cyan, pq, 16, 'right');
    const tq = Q(S, 1, 'or three when z has norm one', 0.6);
    lbl('‖z‖ = 1 : environment 3', px + pw - 10, py - ph + 68, C.gold, tq, 16, 'right');
    stamp('PERFECT LOGICAL QUBIT', 1400, 760, Q(S, 1, 'giving a perfect logical qubit', 0.6), C.green, 28, -0.04);
    lbl('bare relation Σ is closed under bitwise AND : NOR , NAND need an extra resource', 530, 800, C.dim, nq, 14);
  }
};

/* ---- 06 NETWORK (§9.1–9.2) ---- */
SCENES.network = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The five-mode graph', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'A static network needs no clock', 0.6) * f1;
    const wy = [330, 450, 570];
    wy.forEach((y, i) => { line(160, y, 900, y, C.dim, q, 2); lbl('wire ' + (i + 1), 150, y - 12, C.dim, q, 14, 'left'); });
    const oq = Q(S, 0, 'every topological order of a typed acyclic network gives the same channel', 0.6) * f1;
    const sw = 0.5 + 0.5 * Math.sin(u * 1.6), xa = 330 + 200 * sw, xb = 530 - 200 * sw;
    cell086(xa - 45, wy[0] - 32, 90, 64, 'Φ', C.gold, q, 24); cell086(xb - 45, wy[2] - 32, 90, 64, 'Ψ', C.mag, q, 24);
    cell086(700, wy[1] - 120 - 32 + 120, 120, 64, 'Γ', C.cyan, q, 24);
    lbl('Φ and Ψ incomparable : slide freely', 530, 650, C.white, oq, 17);
    chip(530, 710, 860, 54, '(Φ ⊗ id)(id ⊗ Ψ) = Φ ⊗ Ψ = (id ⊗ Ψ)(Φ ⊗ id)', C.gold, oq, 20);
    const kq = Q(S, 0, 'while operations on one wire keep their order', 0.6) * f1;
    lbl('one wire : [H₁, H₂] = E₁₂ − E₂₁ ≠ 0 , order kept', 530, 775, C.red, kq, 16);
    const gq = Q(S, 0, 'Edge phases up to gauge are fixed by loop holonomies', 0.6) * f1;
    const N = [[1150, 330], [1350, 280], [1550, 340], [1600, 540], [1380, 620], [1170, 540]];
    const E = [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 0, 0], [1, 4, 0], [2, 4, 0]];
    E.forEach(([i, j, tr]) => { if (tr) line(N[i][0], N[i][1], N[j][0], N[j][1], C.cyan, gq, 3.5); else dashed(N[i][0], N[i][1], N[j][0], N[j][1], C.mag, gq, 2.5); });
    N.forEach(p => dot(p[0], p[1], 11, 'w', gq));
    lbl('spanning tree (cyan) : all its phases gauge to 1', 1380, 700, C.cyan, gq, 15);
    lbl('each dashed edge closes one loop parameter', 1380, 728, C.mag, gq, 15);
    chip(1380, 230, 760, 52, 'a′(u→v) = g_v · a(u→v) · conj(g_u)', C.white, gq, 20);
    chip(1380, 790, 760, 52, 'gauge classes ↔ holonomies :  |E| − |V| + 1 loops', C.gold, gq, 20);
  }
  const q = Q(S, 1, 'The five-mode graph', 0.6, 0.3);
  if (q > 0) {
    const P = graph086(330, 330, 300, q);
    const lq = Q(S, 1, 'so one loop', 0.6);
    if (P && lq > 0) { const path = ['0', '1', '13', '3', '0'], k = ((u * 0.8) % 4), i0 = Math.floor(k), f = k - i0; const a = P[path[i0]], b = P[path[i0 + 1]]; dot(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 14, 'w', lq); }
    lbl('e^(iβ₁)', 480, 670, C.cyan, q, 18); lbl('e^(iβ₁)', 480, 312, C.cyan, q, 18);
    lbl('e^(iβ₃)', 300, 490, C.mag, q, 18, 'right'); lbl('e^(iβ₃)', 660, 490, C.mag, q, 18, 'left');
    lbl('e^(iβ₂)', 205, 670, C.gold, q, 18);
    chip(530, 760, 700, 50, '|E| − |V| + 1 = 5 − 5 + 1 = 1 loop', C.white, q, 20);
    const hq = Q(S, 1, 'its holonomy is always one', 0.6);
    chip(1380, 280, 820, 60, 'e^(iβ₁) e^(iβ₃) e^(−iβ₁) e^(−iβ₃) = 1', C.cyan, hq, 25);
    lbl('H_i(β_i) = D_β H_i(0) D_β† ,  D_β|w⟩ = e^(i Σ βⱼwⱼ)|w⟩', 1380, 345, C.dim, hq, 16);
    stamp('HOLONOMY = 1', 1380, 440, hq, C.green, 34, -0.05);
    const rq = Q(S, 1, 'a second phase direction at one site', 0.6);
    box(1010, 520, 760, 220, C.gold, rq, 2, 'rgba(40,30,0,0.35)');
    lbl('two control labels α , β at one site', 1390, 565, C.gold, rq, 19);
    lblG('ratio e^(i(β − α)) is gauge invariant', 1390, 625, C.white, rq, 24);
    lbl('β − α = π/2 : no gauge makes both real', 1390, 680, C.red, Q(S, 1, 'no gauge removes', 0.6), 18);
    lbl('a relative phase of parallel controls , not a new flux', 1390, 712, C.dim, rq, 14);
  }
};

/* ---- 07 RECORDS (§9.3–9.4) ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'A path record with overlap gamma', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'From mode zero, arrival at one-three', 0.6) * f1;
    const P = graph086(330, 320, 260, q, { edge: [1, 1, 1, 1, 0.3] });
    if (P) { lbl('route p : 0 → 1 → 13', 470, 640, C.cyan, q, 16); lbl('route q : 0 → 3 → 13', 470, 668, C.mag, q, 16); }
    chip(530, 720, 860, 50, 'A = r₀₁ r₁,₁₃ ,  B = r₀₃ r₃,₁₃ ,  e^(iΦ) = a_p · conj(a_q)', C.white, q, 18);
    const fq = Q(S, 0, 'starts as t to the fourth over four', 0.6) * f1;
    chip(1390, 245, 780, 56, 'p₁₃←₀(t) = t⁴/4 · (A² + B² + 2AB cos Φ) + O(t⁶)', C.gold, fq, 19);
    const px = 1040, py = 720, pw = 700, ph = 380, xS = x => px + x / 1.6 * pw, yS = v => py - v / 1.0 * ph;
    plotAxes(px, py, pw, ph, fq, 't', 'p₁₃←₀(t) , all r = 1');
    const set = [['0', C.cyan, 'Φ = 0'], ['p2', C.gold, 'Φ = π/2'], ['pi', C.red, 'Φ = π']];
    set.forEach(([k, col, nm], i) => { const arr = P13086[k]; curve(p => { const j = Math.round(p * (arr.length - 1)); return [xS(P13T086[j]), yS(arr[j])]; }, P13T086.length - 1, col, fq, 3); lbl(nm, px + pw - 10, py - ph + 30 + i * 26, col, fq, 15, 'right'); });
    const cq = Q(S, 0, 'phi and minus phi look alike', 0.6) * f1;
    const arr = P13086.p3, arr2 = P13086.m3;
    curve(p => { const j = Math.round(p * (arr.length - 1)); return [xS(P13T086[j]), yS(arr[j])]; }, arr.length - 1, C.mag, cq, 6);
    curve(p => { const j = Math.round(p * (arr2.length - 1)); return [xS(P13T086[j]), yS(arr2[j])]; }, arr2.length - 1, C.white, cq, 2);
    lbl('Φ = +π/3 (magenta) and −π/3 (white) : identical', px + 20, py - ph + 40, C.mag, cq, 15, 'left');
    stamp('Φ AND −Φ ALIKE', 1220, 560, cq, C.mag, 28, -0.05);
    lbl('e^(−it conj H) = Γ conj(e^(−itH)) Γ', 1390, 300, C.dim, Q(S, 0, 'Conjugating the Hamiltonian', 0.6) * f1, 15);
  }
  const q = Q(S, 1, 'A path record with overlap gamma', 0.6, 0.3);
  if (q > 0) {
    box(170, 300, 120, 70, C.white, q, 2, 'rgba(0,0,0,0.5)'); lbl('split', 230, 342, C.white, q, 17);
    curve(p => [290 + p * 380, 335 - Math.sin(p * Math.PI) * 90], 30, C.cyan, q, 3); curve(p => [290 + p * 380, 335 + Math.sin(p * Math.PI) * 90], 30, C.mag, q, 3);
    lbl('√s e^(iφ_p) |p⟩|η_p⟩', 480, 228, C.cyan, q, 16); lbl('e^(iδ) √(1 − s) e^(iφ_q) |q⟩|η_q⟩', 480, 455, C.mag, q, 16);
    box(670, 300, 150, 70, C.gold, q, 2, 'rgba(0,0,0,0.5)'); lbl('read |+⟩', 745, 342, C.gold, q, 17);
    const fq = Q(S, 1, 'scales the fringe', 0.6);
    chip(530, 530, 860, 56, 'p₊(δ) = ½ + √(s(1 − s)) · Re(e^(−iδ) h γ)', C.gold, fq, 22);
    lbl('h = e^(i(φ_p − φ_q)) ,  γ = ⟨η_q|η_p⟩', 530, 585, C.dim, fq, 16);
    const rq = Q(S, 1, 'two settings read the product h gamma', 0.6);
    chip(530, 640, 860, 52, '√(s(1 − s)) hγ = [p₊(0) − ½] + i [p₊(π/2) − ½]', C.cyan, rq, 19);
    const vq = Q(S, 1, 'with visibility proportional to its size', 0.6);
    lbl('visibility = 2√(s(1 − s)) |γ| ;  γ = 0 : every reading ½', 530, 698, C.white, vq, 16);
    const px = 1040, py = 600, pw = 700, ph = 320, xS = x => px + x / (2 * Math.PI) * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, fq, 'δ', 'p₊(δ) , s = ½');
    [['1.0', C.cyan], ['0.6', C.gold], ['0.2', C.mag], ['0.0', C.dim]].forEach(([k, col], i) => { const arr = FR086[k]; curve(p => { const j = Math.round(p * (arr.length - 1)); return [xS(FRD086[j]), yS(arr[j])]; }, arr.length - 1, col, fq, 3); lbl('|γ| = ' + k, px + pw + 12, yS(arr[0]) + (i === 3 ? 20 : 0), col, fq, 14, 'left'); });
    const gq = Q(S, 1, 'A hidden record gives the intended gate', 0.6);
    chip(1390, 690, 780, 54, 'record Gram G(x, y) = ⟨η_y|η_x⟩ ,  Choi rank = rank G', C.white, gq, 19);
    chip(1390, 760, 780, 54, 'intended gate ⇔ every G(x, y) = 1 ;  unitary ⇔ rank G = 1', C.green, Q(S, 1, 'exactly when every Gram entry is one', 0.6), 19);
  }
};

/* ---- 08 FUTURE (§10) ---- */
SCENES.future = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'The quotient updates linearly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'An observer holds only what future tests can tell apart', 0.6) * f1;
    chip(530, 255, 860, 56, 'V₀ = span(terminal effects) ,  V(n+1) = span( Vₙ ∪ Φₐ*(Vₙ) )', C.cyan, q, 21);
    const pq = Q(S, 0, 'Pull terminal effects back through every allowed word', 0.6) * f1;
    const px = 170, py = 690, pw = 720, ph = 340, yS = v => py - v / 17 * ph;
    plotAxes(px, py, pw, ph, pq, 'depth n', 'dim Vₙ  (d = 4 code)');
    dashed(px, yS(16), px + pw, yS(16), C.dim, pq, 1.5); lbl('d² = 16', px + pw - 6, yS(16) - 10, C.dim, pq, 14, 'right');
    const [z0, z1] = FUT4086;
    z1.forEach((v, i) => { const x = px + 40 + i * 90, qq = clamp(pq * 1.6 - i / 9); fillBox(x, yS(v), 32, py - yS(v), C.cyan, qq * 0.4); rect63(x, yS(v), 32, py - yS(v), C.cyan, qq, 1.4); lbl(String(v), x + 16, yS(v) - 8, C.cyan, qq, 14); lbl(String(i), x + 32, py + 24, C.dim, qq, 13); });
    z0.forEach((v, i) => { const x = px + 76 + i * 90, qq = clamp(pq * 1.6 - i / 9); fillBox(x, yS(v), 32, py - yS(v), C.gold, qq * 0.4); rect63(x, yS(v), 32, py - yS(v), C.gold, qq, 1.4); lbl(String(v), x + 16, yS(v) - 8, C.gold, qq, 14); });
    lbl('gold : zero-phase menu → 10 ;  cyan : with one Y address → 16', 530, 760, C.dim, pq, 15);
    const sq = Q(S, 0, 'the span stops within d squared minus r zero steps', 0.6) * f1;
    chip(1390, 300, 780, 60, 'V(d² − r₀) = V∞ ,  invariant under every Φₐ*', C.gold, sq, 22);
    lbl('recomputed depths 3 and 5 , bound 16 − 4 = 12', 1390, 360, C.dim, sq, 15);
    const eq = Q(S, 0, 'two states are equivalent exactly when they agree on it', 0.6) * f1;
    chip(1390, 450, 780, 60, 'ρ ∼ σ  ⇔  tr((ρ − σ) E) = 0 for all E ∈ V∞', C.cyan, eq, 22);
    lbl('a distinguishing test exists with word length ≤ d² − r₀', 1390, 510, C.dim, eq, 15);
    lbl('equivalent states keep equal branch probabilities and equivalent successors', 1390, 540, C.dim, eq, 15);
    stamp('OBSERVER = FUTURE CLASS', 1390, 650, eq, C.green, 28, -0.04);
  }
  const q = Q(S, 1, 'The quotient updates linearly', 0.6, 0.3);
  if (q > 0) {
    chip(530, 260, 860, 60, 'q(ρ) = (1 , tr ρE₁ , … , tr ρE(r−1)) ,  r = dim V∞', C.cyan, q, 21);
    lbl('unnormalised coordinates update linearly , then divide by the outcome probability', 530, 320, C.dim, q, 14);
    const kq = Q(S, 1, 'a k-dimensional quantum memory needs k squared at least r', 0.6);
    chip(530, 395, 860, 60, 'affine memory ≥ r − 1 coordinates ;  quantum memory : k² ≥ r', C.gold, kq, 21);
    const fq = Q(S, 1, 'Moving state, ruler and controls together changes nothing', 0.6);
    chip(530, 490, 860, 56, 'ρ′ = WρW† ,  E′ = WEW† ,  Φ′ = Ad(W_out) Φ Ad(W_in†)', C.white, fq, 20);
    lbl('every network probability unchanged : only frame-invariant relations are identifiable', 530, 545, C.dim, fq, 14);
    const jq = Q(S, 1, 'a joint unknown is not two averages', 0.6);
    const bx = 1150, by = 690;
    [[1, 'joint model', 'E_λ tr(ρ_λ E_λ)', C.green], [0.5, 'separate averages', 'tr(ρ̄ Ē)', C.red]].forEach(([v, h, s, col], i) => { const x = bx + i * 300, hh = v * 280; fillBox(x, by - hh, 160, hh, col, jq * 0.4); rect63(x, by - hh, 160, hh, col, jq, 2); lbl(v === 1 ? '1' : '½', x + 80, by - hh - 14, C.white, jq, 28); lbl(h, x + 80, by + 30, col, jq, 16); lbl(s, x + 80, by + 56, C.dim, jq, 15); });
    lbl('λ ∈ {0, 1} fair , ρ_λ = E_λ = |λ⟩⟨λ|', 1380, 300, C.white, jq, 17);
    lbl('uncertainty of the quantity and of the ruler needs one joint model', 1380, 330, C.dim, jq, 14);
  }
};

/* ---- 09 RECURSION (§11) ---- */
SCENES.recursion = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'classical'], [1, null, 'theory']]);
  const f1 = 1 - Q(S, 1, 'Flipping with X never settles', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Complete instruments make prefix probabilities consistent', 0.6) * f1;
    const nodes = [['∅', 160, 470, '1'], ['a', 380, 360, '0.6'], ['b', 380, 580, '0.4'], ['aa', 600, 300, '0.36'], ['ab', 600, 420, '0.24'], ['ba', 600, 530, '0.1'], ['bb', 600, 640, '0.3']];
    const par = { a: '∅', b: '∅', aa: 'a', ab: 'a', ba: 'b', bb: 'b' };
    nodes.forEach(([k, x, y]) => { if (par[k]) { const p = nodes.find(n => n[0] === par[k]); line(p[1] + 40, p[2], x - 40, y, C.cyan, q, 2); } });
    nodes.forEach(([k, x, y, v]) => { box(x - 40, y - 24, 80, 48, C.white, q, 1.5, 'rgba(0,0,0,0.6)'); lbl(v, x, y + 7, C.white, q, 17); });
    lbl('… infinite record histories', 760, 470, C.dim, q, 16, 'left');
    chip(530, 255, 860, 54, 'p(∅) = 1 ,  p(h) = Σₒ p(ho)  ⇒  one measure on infinite records', C.gold, q, 19);
    lbl('finite branching , complete instruments ; illustrative values', 530, 730, C.dim, q, 14);
    const mq = Q(S, 0, 'the prediction of a fixed question converges in mean square', 0.6) * f1;
    const px = 1040, py = 770, pw = 700, ph = 360, xS = n => px + n / 14 * pw, yS = v => py - v / 0.55 * ph;
    plotAxes(px, py, pw, ph, mq, 'record depth n', 'E|Z − Mₙ|²');
    dashed(px, yS(0.25), px + pw, yS(0.25), C.red, mq, 2); lbl('E Var(Z | F∞) = 0.25', px + pw - 6, yS(0.25) + 26, C.red, mq, 15, 'right');
    curve(p => { const j = Math.round(p * 14); return [xS(j), yS(MSE086[j])]; }, 14, C.cyan, mq, 2);
    MSE086.forEach((v, n) => dot(xS(n), yS(v), 7, 'c', clamp(mq * 1.6 - n / 20)));
    chip(1390, 255, 780, 54, 'Mₙ = E[Z | Fₙ] → E[Z | F∞]  in L²', C.cyan, mq, 22);
    lbl('Fibonacci chain , p ∈ {0.2, 0.8} unknown , Z = 1{p = 0.8} + unrecorded coin', 1390, 312, C.dim, mq, 14);
    lbl('error → 0 exactly when Z is measurable w.r.t. the records', 1390, 338, C.dim, Q(S, 0, 'to the best the records allow', 0.6) * f1, 14);
  }
  const q = Q(S, 1, 'Flipping with X never settles', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 54, 'ρ(n+1) = X ρₙ X :  |0⟩ , |1⟩ , |0⟩ , |1⟩ , …', C.red, q, 21);
    for (let n = 0; n < 12; n++) { const qq = clamp(q * 1.6 - n / 16), x = 200 + n * 60, y = n % 2 ? 330 : 420; dot(x, y, 10, n % 2 ? 'm' : 'c', qq); if (n) line(x - 60, (n - 1) % 2 ? 330 : 420, x, y, C.dim, qq * 0.6, 1.4); }
    lbl('consecutive trace distance = 1 : no limit', 530, 470, C.red, q, 16);
    const cq = Q(S, 1, 'A contraction by lambda below one settles', 0.6);
    chip(530, 540, 860, 54, 'D(Tρ, Tσ) ≤ λ D(ρ, σ) ,  λ < 1  ⇒  unique fixed ρ*', C.cyan, cq, 20);
    const eq = Q(S, 1, 'with step errors epsilon', 0.6);
    chip(530, 615, 860, 54, 'D(ρₙ, ρ*) ≤ λⁿ D₀ + Σⱼ λ^(n−1−j) εⱼ ;  limsup ≤ ε/(1 − λ)', C.gold, eq, 18);
    const px = 1040, py = 700, pw = 700, ph = 400, xS = n => px + n / 24 * pw, yS = v => py - v / 0.85 * ph;
    plotAxes(px, py, pw, ph, cq, 'step n', 'D(ρₙ , ρ*)');
    curve(p => { const j = Math.round(p * 24); return [xS(j), yS(CON086.B[j])]; }, 24, C.gold, eq, 2.5);
    CON086.D.forEach((v, n) => dot(xS(n), yS(v), 6, 'c', clamp(cq * 1.6 - n / 30)));
    dashed(px, yS(CON086.floor), px + pw, yS(CON086.floor), C.red, eq, 2);
    lbl('ε/(1 − λ) = 0.0667', px + pw - 6, yS(CON086.floor) - 12, C.red, eq, 15, 'right');
    lbl('λ = 0.7 , ε = 0.02 , errors pushed outward : the bound is met', px + pw - 10, py - ph * 0.45, C.dim, eq, 14, 'right');
    const sq = Q(S, 1, 'Postselection on probability at least eta', 0.6);
    chip(530, 700, 860, 54, '‖A/p − B/q‖₁ ≤ 2δ/η ,  p, q ≥ η', C.mag, sq, 22);
    lbl('rare branches normalised to a nice gate can amplify a small error', 530, 755, C.dim, sq, 14);
  }
};

/* ---- 10 MIRRORS (§12–13) ---- */
SCENES.mirrors = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'Natively, a pi pulse on the middle site', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Two reflections at angle theta rotate by two theta', 0.6) * f1;
    const cx = 330, cy = 470, R = 170, th = 0.45;
    ring(cx, cy, R, C.dim, q * 0.5, 1.5);
    line(cx - R * Math.cos(0), cy, cx + R, cy, C.gold, q, 2.5); lbl('mirror u⊥', cx + R + 10, cy + 6, C.gold, q, 14, 'left');
    line(cx - R * Math.cos(th), cy + R * Math.sin(th), cx + R * Math.cos(th), cy - R * Math.sin(th), C.mag, q, 2.5); lbl('mirror v⊥', cx + R * Math.cos(th) + 10, cy - R * Math.sin(th), C.mag, q, 14, 'left');
    const a0 = -0.35, a1 = -a0, a2 = 2 * th - a1, an = a0 + (a2 - a0) * clamp((u - 1) / 3) * q;
    arrow(cx, cy, cx + R * Math.cos(a0), cy - R * Math.sin(a0), C.dim, q, 2);
    arrow(cx, cy, cx + R * Math.cos(an), cy - R * Math.sin(an), C.cyan, q, 3.5);
    lbl('angle 2θ', cx, cy + R + 40, C.cyan, q, 17);
    chip(820, 300, 360, 52, 'R_v R_u = rotation 2θ', C.cyan, q, 19);
    const cq = Q(S, 0, 'but powers of one gate commute', 0.6) * f1;
    chip(820, 400, 360, 52, 'Gⁿ commute : not dense', C.red, cq, 19);
    const iq = Q(S, 0, 'two fixed involutions never fill the unitaries', 0.6) * f1;
    chip(820, 480, 360, 52, 'R² = S² = I : (RS)ⁿ , R(RS)ⁿ', C.red, iq, 17);
    lbl('closure K ∪ RK with K abelian ≠ PU(d)', 820, 530, C.dim, iq, 13);
    lbl('any SU(d) : ≤ 2(d − 1) rank-one reflections', 820, 590, C.dim, iq, 14);
    lbl('recomputed for d = 3 , 4 , 5', 820, 615, C.dim, iq, 14);
    const tq = Q(S, 0, 'Three reflections, Z and two tilted by an irrational alpha', 0.6) * f1;
    chip(1400, 255, 760, 52, 'R₀ = Z ,  R₁ = cos α Z + sin α X ,  R₂ = cos α Z + sin α Y', C.gold, tq, 18);
    chip(1400, 325, 760, 52, 'R₁R₀ = e^(−iαY) ,  R₂R₀ = e^(iαX) ,  α/π irrational', C.white, tq, 18);
    const dq = Q(S, 0, 'are dense', 0.6) * f1;
    const rx = 1400, ry = 565, rr = 140;
    ring(rx, ry, rr, C.cyan, dq * 0.6, 1.5);
    ROT086.forEach((an, i) => { const qq = clamp(dq * 3 - i / 30); dot(rx + rr * Math.cos(an), ry - rr * Math.sin(an), 6, i < 3 ? 'g' : 'c', qq); });
    lbl('angles 2nα mod 2π , n = 1 … 60 , α = 1', rx, ry + rr + 30, C.dim, dq, 14);
    lbl('dense in PU(2)', rx, ry + 6, C.cyan, dq, 18);
    stamp('THREE IS THE MINIMUM', 1400, 790, Q(S, 0, 'three is the minimum', 0.6) * f1, C.green, 26, -0.04);
  }
  const q = Q(S, 1, 'Natively, a pi pulse on the middle site', 0.6, 0.3);
  if (q > 0) {
    const P = graph086(400, 330, 280, q, { labs: { '0': '00', '1': '10', '13': '11', '3': '01', '2': '010' } });
    lbl('code J₂|ab⟩ = |a0b⟩ ; helper mode 010', 520, 700, C.dim, q, 15);
    const eq = Q(S, 1, 'sends zero zero zero to the helper and back with a minus sign', 0.6);
    if (P && eq > 0) { const ph = (u * 0.7) % 1, a = P['0'], b = P['2'], f = ph < 0.5 ? ph * 2 : 2 - ph * 2; dot(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 15, ph < 0.5 ? 'g' : 'r', eq); lbl(ph < 0.5 ? '−i|010⟩' : '−|000⟩', 250, 760, ph < 0.5 ? C.gold : C.red, eq, 20); }
    const dq = Q(S, 1, 'on the code, the gate minus one, one, one, one', 0.6);
    chip(1390, 260, 780, 60, 'D = R₂(π) :  D J₂ = J₂ D₀₀', C.gold, eq, 24);
    chip(1390, 345, 780, 60, 'D₀₀ = I − 2|00⟩⟨00| = diag(−1, 1, 1, 1)', C.white, dq, 22);
    lbl('other code states : a neighbour is 1 , so H₂ is off ; separator ends at 0', 1390, 400, C.dim, dq, 14);
    const cq = Q(S, 1, 'Two pulses on each side make it C Z', 0.6);
    const seq = [['R₃R₁(π/2)', C.cyan], ['R₂(π)', C.gold], ['(R₃R₁)†', C.cyan]];
    seq.forEach(([s, col], i) => { const x = 1050 + i * 245; box(x, 470, 210, 80, col, cq, 2, 'rgba(0,0,0,0.5)'); lbl(s, x + 105, 518, C.white, cq, 18); });
    lbl('2 + 1 + 2 = 5 pulses', 1390, 585, C.dim, cq, 15);
    chip(1390, 650, 780, 60, 'S† D S J₂ = J₂ CZ ,  CZ = I − 2|11⟩⟨11|', C.green, cq, 22);
    lbl('D₀₀|++⟩ = (−|00⟩ + |01⟩ + |10⟩ + |11⟩)/2 : determinant −½ , entangled', 1390, 715, C.dim, cq, 14);
    lbl('NAND phase gate = −CZ : the same channel as AND', 1390, 745, C.dim, cq, 14);
  }
};

/* ---- 11 COMPILE (§14–15) ---- */
SCENES.compile = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const f1 = 1 - Q(S, 1, 'On one atom, three zero-phase rotations', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'With every phase zero', 0.6) * f1;
    const cy = 300;
    for (let i = 0; i < 9; i++) { const dat = i % 2 === 0, x = 160 + i * 84; cell086(x, cy - 30, 64, 60, dat ? 'b' + (i / 2 + 1) : '0', dat ? C.cyan : C.dim, q, 18); }
    lbl('J_m|b₁ … b_m⟩ = |b₁ 0 b₂ 0 … 0 b_m⟩ :  odd sites data , even sites separators', 530, 375, C.dim, q, 14);
    const yq = Q(S, 0, 'controlled Y costs seven pulses', 0.6) * f1;
    chip(530, 440, 860, 52, 'CY = R_x(−π/4) · CZ · R_x(π/4) :  1 + 5 + 1 = 7 pulses', C.gold, yq, 19);
    const sq = Q(S, 0, 'three make a swap', 0.6) * f1;
    chip(530, 510, 860, 52, 'CY_ab · CY_ba · CY_ab = SWAP :  21 pulses , all phases zero', C.cyan, sq, 19);
    const aq = Q(S, 0, 'One Y address then compiles any known circuit', 0.6) * f1;
    rect63(160 + 4 * 84 - 6, cy - 36, 76, 72, C.mag, aq, 3);
    lbl('q* : the one Y address', 160 + 4 * 84 + 32, cy - 50, C.mag, aq, 15);
    chip(530, 590, 860, 56, 'L ≤ G_x + Σ (42|q − q*| + 1) + Σ (42(|a − b| − 1) + 5)', C.mag, aq, 19);
    lbl('V_C J_m = J_m C ;  separators restored after every block', 530, 645, C.dim, aq, 15);
    lbl('recomputed on m = 3 : a 7-gate circuit compiles to ' + COST086[0] + ' pulses = the formula', 530, 675, C.green, Q(S, 0, 'forty-two pulses per unit of distance', 0.6) * f1, 14);
    const wq = Q(S, 0, 'without it, the plus state stays at least one half away', 0.6) * f1;
    const px = 1040, py = 640, pw = 700, ph = 300, xS = x => px + x / Math.PI * pw, yS = v => py - v * ph;
    plotAxes(px, py, pw, ph, wq, 'rotation angle t', '|⟨+|R(t)|0⟩|²');
    curve(p => { const j = Math.round(p * (OVT086.length - 1)); return [xS(OVT086[j]), yS(OVY086[j])]; }, OVT086.length - 1, C.cyan, wq, 3);
    curve(p => { const j = Math.round(p * (OVT086.length - 1)); return [xS(OVT086[j]), yS(OVX086[j])]; }, OVT086.length - 1, C.gold, wq, 4);
    lbl('with Y : reaches 1', xS(1.6), yS(0.95), C.cyan, wq, 15, 'left');
    lbl('zero phase : stuck at ½', xS(2.2), yS(0.5) - 14, C.gold, wq, 15);
    chip(1390, 255, 780, 54, 'A = Z_par · K commutes with every zero-phase pulse', C.white, wq, 19);
    chip(1390, 720, 780, 54, 'D(σ, ρ₊) ≥ ½  for every zero-phase protocol', C.red, wq, 21);
    lbl('400 random protocols with readout and feedback : largest overlap 0.5', 1390, 775, C.dim, wq, 14);
  }
  const q = Q(S, 1, 'On one atom, three zero-phase rotations', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 54, '⟨R₁(t), R₂(t), R₃(t)⟩ = D₅ SO(5) D₅† ,  D₅ = diag(1, i, i, i, 1)', C.gold, q, 18);
    const bq = Q(S, 1, 'generate only a twisted copy of SO five', 0.6);
    bars086(300, 700, [LIE086[0], LIE086[1]], 140, 140, 15, bq, [C.gold, C.cyan], ['three rotations', '+ S*'], ['dim 10', 'dim 24']);
    lbl('Lie dimension : so(5) = 10 , su(5) = 24 (recomputed)', 530, 780, C.dim, bq, 14);
    const sq = Q(S, 1, 'A fourth-order phase on mode one-three', 0.6);
    chip(1390, 255, 780, 56, 'S* = exp(iπ|13⟩⟨13|/2) ,  S*⁴ = I ,  S*² = CZ on the code', C.mag, sq, 19);
    lbl('15 + 8 + 1 = 24 directions of su(5)', 1390, 312, C.dim, sq, 15);
    const dq = Q(S, 1, 'all unitaries with determinant a fourth root of unity', 0.6);
    const cx = 1390, cy = 520, R = 150;
    ring(cx, cy, R, C.dim, dq * 0.7, 1.5); line(cx - R - 20, cy, cx + R + 20, cy, C.dim, dq * 0.4, 1); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, dq * 0.4, 1);
    [[0, '1'], [Math.PI / 2, 'i'], [Math.PI, '−1'], [3 * Math.PI / 2, '−i']].forEach(([an, s], i) => { const x = cx + R * Math.cos(an), y = cy - R * Math.sin(an); dot(x, y, 12, 'm', dq); lbl(s, x + (i === 0 ? 30 : i === 2 ? -34 : 0), y + (i === 1 ? -22 : i === 3 ? 34 : 6), C.mag, dq, 18); });
    lbl('det V ∈ {1, i, −1, −i}', cx, cy + 6, C.white, dq, 18);
    const pq = Q(S, 1, 'so every unitary channel', 0.6);
    stamp('ALL OF PU(5)', 1390, 760, pq, C.green, 30, -0.04);
  }
};

/* ---- 12 OBSERVE (§16–18) ---- */
SCENES.observe = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, null, 'theory'], [1, null, 'theory'], [1, 'Full root identification remains open', 'open']]);
  const f1 = 1 - Q(S, 1, 'Reporting a rational parameter exactly', 0.6);
  if (f1 > 0) {
    const q = Q(S, 0, 'Order matters', 0.6) * f1;
    chip(530, 255, 860, 52, '[H₁, H₂] = E₁₂ − E₂₁ ≠ 0', C.red, q, 21);
    const oq = Q(S, 0, 'pulse two then pulse one sends mode zero to mode two', 0.6) * f1;
    const rq = Q(S, 0, 'the reverse to mode one', 0.6) * f1;
    [['R₁(π/2) R₂(π/2) |0⟩ = −i |2⟩', C.gold, oq, 330], ['R₂(π/2) R₁(π/2) |0⟩ = −i |1⟩', C.cyan, rq, 420]].forEach(([s, col, a, y]) => { box(170, y, 720, 66, col, a, 2, 'rgba(0,0,0,0.5)'); lblG(s, 530, y + 44, C.white, a, 26); });
    lbl('no global clock does not mean operations commute', 530, 520, C.dim, oq, 15);
    lbl('compiled words : ‖U − V‖ ≤ Σ εⱼ ,  ◇-distance ≤ 2ε ,  code leakage ≤ ε²', 530, 550, C.dim, rq, 14);
    chip(530, 640, 860, 50, 'universal NOT  X ↦ tr(X) I − X :  Choi spectrum (−1, 1, 1, 1) , not CP', C.mag, Q(S, 0, 'The address also changes what an observer sees', 0.6) * f1, 17);
    lbl('with selective record readout and discarding , any known finite instrument network compiles', 530, 700, C.dim, Q(S, 0, 'The address also changes what an observer sees', 0.6) * f1, 14);
    const vq = Q(S, 0, 'The address also changes what an observer sees', 0.6) * f1;
    const px = 1080, py = 720, ph = 380, sc = v => Math.sqrt(v) / 8 * ph;
    plotAxes(px, py, 650, ph, vq, '', 'dim V∞ (√ scale)');
    FUTD086.forEach(([d, z0, z1], i) => { const x = px + 60 + i * 200; const az = Q(S, 0, 'zero-phase menus reach at most', 0.6) * f1, ay = Q(S, 0, 'the address all d squared', 0.6) * f1; fillBox(x, py - sc(z0), 60, sc(z0), C.gold, az * 0.45); rect63(x, py - sc(z0), 60, sc(z0), C.gold, az, 1.6); lbl(String(z0), x + 30, py - sc(z0) - 10, C.gold, az, 16); fillBox(x + 70, py - sc(z1), 60, sc(z1), C.cyan, ay * 0.45); rect63(x + 70, py - sc(z1), 60, sc(z1), C.cyan, ay, 1.6); lbl(String(z1), x + 100, py - sc(z1) - 10, C.cyan, ay, 16); lbl('d = ' + d, x + 65, py + 26, C.dim, vq, 15); });
    lbl('gold : zero phase = d(d + 1)/2 ;  cyan : one Y address = d²', 1405, 776, C.dim, vq, 15);
    lbl('hidden directions d(d − 1)/2 = 1 , 6 , 28 ; carrier dimension ≥ d with the address', 1405, 804, C.dim, Q(S, 0, 'the address all d squared', 0.6) * f1, 14);
    chip(1405, 255, 760, 52, 'zero phase : future effects are real symmetric in the A-fixed basis', C.white, vq, 16);
  }
  const q = Q(S, 1, 'Reporting a rational parameter exactly', 0.6, 0.3);
  if (q > 0) {
    chip(530, 255, 860, 54, 'θ ∈ ℚᵏ ,  kept s₀ = Rθ (rank d) ,  exact or Gaussian queries', C.white, q, 19);
    const kq = Q(S, 1, 'needs at least k minus d exact queries', 0.6);
    const M = [['1', '2', '0'], ['0', '1', '1']];
    mat086(220, 330, M, 86, kq, (i) => (i ? C.mag : C.gold), 24);
    lbl('R', 200, 378, C.gold, kq, 20, 'right'); lbl('A_W', 200, 464, C.mag, kq, 20, 'right');
    lbl('k = 3 , d = 1 , one exact query : rank 2', 360, 545, C.white, kq, 16);
    lbl('η = (2, −1, 1) : θ and θ + η look the same', 360, 575, C.red, kq, 16);
    chip(760, 400, 300, 56, 'm₀(W) ≥ k − d', C.gold, kq, 26);
    lbl('a.s. , every exact protocol', 760, 455, C.dim, kq, 14);
    const nq = Q(S, 1, 'finitely many noisy ones never suffice', 0.6);
    const px = 1060, py = 520, pw = 680, ph = 220;
    plotAxes(px, py, pw, ph, nq, '', 'density of a noisy reply y');
    curve(p => { const x = -3 + p * 7, d1 = Math.exp(-((x - 0) ** 2) / 2), d2 = Math.exp(-((x - 1.2) ** 2) / 2); return [px + p * pw, py - d1 * ph * 0.9]; }, 80, C.cyan, nq, 3);
    curve(p => { const x = -3 + p * 7, d2 = Math.exp(-((x - 1.2) ** 2) / 2); return [px + p * pw, py - d2 * ph * 0.9]; }, 80, C.gold, nq, 3);
    lbl('under θ and θ + η : both densities > 0 everywhere , same null sets', 1400, 552, C.dim, nq, 14);
    const cq = Q(S, 1, 'a countable snapshot cannot restore a forgotten noise sample', 0.6);
    chip(1400, 620, 680, 52, 'S countable , Y atomless  ⇒  P{ g(S) = Y } = 0', C.mag, cq, 20);
    const oq = Q(S, 1, 'Full root identification remains open', 0.6);
    box(170, 640, 720, 140, C.vio, oq, 2, 'rgba(20,10,40,0.6)');
    lbl('OPEN in the volume', 530, 680, C.vio, oq, 19);
    lbl('full original-root identification', 530, 712, C.white, oq, 16);
    lbl('global eight-read strategy · nine-read lower bound', 530, 740, C.white, oq, 16);
    lbl('15 seven-action words JJJ… with M : path maps of full column rank 4', 1400, 690, C.dim, oq, 14);
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = [lineAt(S, 0), lineAt(S, 1)];
  badgeQ(S, [[0, null, 'theory'], [1, 'The effect form of Gleason', 'published'], [1, 'the rest is argued in the theory volume', 'theory']]);
  const fade = 1 - clamp((u - L[1].e - 0.6) / 0.8);
  if (fade > 0) {
    const items = [['FIBER', 'κ , 21 hidden', C.gold, 'A hidden kappa'], ['KERNEL', 'dim = rank', C.cyan, 'kernels as vectors'], ['BORN', 'μ = tr ρE', C.gold, 'effects as densities'], ['INSTRUMENT', 'rank J , NAND', C.mag, 'instruments with records'], ['NETWORK', 'any order', C.cyan, 'clockless networks'], ['PHASE', 'holonomy 1', C.green, 'loop phases'], ['FUTURE', 'V∞ , k² ≥ r', C.cyan, 'the future quotient'], ['RECURSION', 'ε/(1 − λ)', C.gold, 'settling predictions'], ['MIRRORS', '3 · D₀₀ · CZ', C.mag, 'three mirrors'], ['ADDRESS', '42 · ½ · PU(5)', C.green, 'one phase address'], ['EXACT', 'm₀ ≥ k − d', C.red, 'the price of exactness']];
    items.forEach(([a1, a2, col, ph], i) => { const r = i < 6 ? 0 : 1, c = r ? i - 6 : i, x = r ? 380 + c * 290 : 235 + c * 290, y = 230 + r * 120, q = Q(S, 0, ph) * fade; box(x - 130, y, 260, 100, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, y + 38, col, q, 18); lblG(a2, x, y + 76, C.white, q, 18); });
    lbl('PUBLISHED · effect Gleason (Busch 2003) · Choi 1975 · Stinespring 1955 · elementary gates (Barenco et al. 1995) · universal NOT (Bužek–Hillery–Werner)', W / 2, 520, C.cyan, Q(S, 1, 'The effect form of Gleason') * fade, 14);
    lbl('CLASSICAL · Gram and kernel representation · Cauchy–Schwarz · measure extension · L² martingale limit · contraction fixed point · uncertainty relation', W / 2, 560, '#8fbcff', Q(S, 1, 'are published inputs') * fade, 14);
    lbl('THEOREM 19.1 · minimal Hilbert representation · density operators · order-free networks · finite future quotient · compilation · Hilbert limits', W / 2, 600, C.orange, Q(S, 1, 'the rest is argued in the theory volume') * fade, 14);
    lbl('RECOMPUTED · fibre dims 21 · kernel −1 · NAND ranks · t⁴ law · fringes · V∞ = 3/10/36 vs 4/16/64 · 141 pulses · Lie 10/24 · rank bound', W / 2, 640, C.white, Q(S, 1, 'the finite computations were redone') * fade, 14);
    lbl('OPEN · full original-root identification , eight-read strategy , nine-read lower bound', W / 2, 680, C.vio, Q(S, 1, 'the finite computations were redone', 0.6, 0.6) * fade, 14);
    lbl('NO LEAN-FROZEN DECLARATION IS USED IN THIS FILM ; THE VOLUME IS NOT YET DIGESTED', W / 2, 740, C.gold, Q(S, 1, 'the finite computations were redone', 0.6, 1.2) * fade, 20);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    omega63(W / 2, 340, 150, a, C.cyan, 6);
    pyrG64(W / 2, 360, 180, 0.5 + t * 0.2, a * 0.9, [1, 1, 1], 0);
    txt('AURIC V10 · COHERENCE', W / 2, 680, { size: 56, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 5 });
    txt('AURIC V10 · 相干关系与递归观测 · TRURETURING FILM 086', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Five modes, one hidden coupling, three mirrors, and one phase address.', W / 2, 875, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'AURIC V10', fiber: 'STATIC FIBER', kernel: 'COHERENT KERNELS', born: 'PROBABILITY', instrument: 'INSTRUMENTS AND LIFTS', network: 'CLOCKLESS NETWORKS', records: 'PHASES AND RECORDS', future: 'FUTURE QUOTIENT', recursion: 'RECURSION', mirrors: 'MIRRORS', compile: 'ONE PHASE ADDRESS', observe: 'ORDER AND ACQUISITION', finale: 'LEDGER' });

function poster086() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  omega63(460, 470, 230, 1, C.cyan, 9);
  pyrG64(460, 500, 215, 2.2, 1, [1, 1, 1], 1);
  txt('μ(E) = tr(ρE)  ·  dim H_K = rank K', 1320, 370, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('ρ ∼ σ ⇔ tr((ρ − σ)E) = 0 on V∞', 1320, 480, { size: 44, fam: FG, w: 700, align: 'center', c: C.white });
  txt('R₂(π) J₂ = J₂ diag(−1, 1, 1, 1)', 1320, 590, { size: 42, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('AURIC 相干关系与递归观测', W / 2, 140, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC V10 · COHERENCE', W / 2, 890, { size: 64, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 5 });
  bloom(0.65);
  txt('核 · 概率 · 记录网络 · 未来商 · 反射计算', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 086', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster086;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
