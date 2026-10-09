/* Film 044 — AURIC FIB ATOM PYRAMID XV · 金字塔 XV：关系三角形与反演精度 */

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


/* ---- film 044: relation triangles helpers ---- */
const FB44 = (() => { const f = [0, 1]; for (let i = 0; i < 60; i++) f.push(f[f.length - 1] + f[f.length - 2]); return f; })();
const R44 = k => FB44[k + 1] / FB44[k + 3];
/* map a box of data coordinates to screen */
function frame44(x0, y0, w, h, xa, xb, ya, yb) { return (x, y) => [x0 + (x - xa) / (xb - xa) * w, y0 - (y - ya) / (yb - ya) * h]; }
function tri44(pts, col, a, fill = 0.15) { if (a <= 0) return; fillPoly(pts, col, a * fill); strokePoly(pts, col, a, 2.5); }
/* orientation arrows around a triangle (draw small arrowheads along edges in given order) */
function orient44(pts, col, a) { if (a <= 0) return; for (let i = 0; i < 3; i++) { const p = pts[i], q = pts[(i + 1) % 3]; const m = [lerp(p[0], q[0], 0.45), lerp(p[1], q[1], 0.45)], n = [lerp(p[0], q[0], 0.62), lerp(p[1], q[1], 0.62)]; arrow(m[0], m[1], n[0], n[1], col, a, 3.5); } }
function pbars44(x0, yb, vals, bw, sc, col, a, labs) {
  if (a <= 0) return;
  vals.forEach((v, i) => { fillBox(x0 + i * bw + 5, yb - v * sc, bw - 10, v * sc, col, a * 0.8); if (labs) txt(labs[i], x0 + i * bw + bw / 2, yb + 24, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); });
  line(x0, yb, x0 + vals.length * bw, yb, C.dim, a, 1.5);
}
function post44(A, B, K = 8) { const w = []; for (let k = 1; k <= K; k++) w.push(Math.pow(0.5, k) * Math.pow(R44(k), A) * Math.pow(1 - R44(k), B)); const s = w.reduce((x, y) => x + y); return w.map(v => v / s); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  /* a triangle that keeps thinning */
  const th = 0.5 + 0.5 * Math.cos(t * 0.6), P0 = [560, 640], P1 = [1360, 640], P2 = [960, lerp(600, 260, th)];
  tri44([P0, P1, P2], C.cyan, s0, 0.12);
  [P0, P1, P2].forEach((p, i) => dot(p[0], p[1], 14, ['c', 'g', 'm'][i], s0));
  txt('area = ' + (0.5 * 800 * (640 - P2[1]) / 1000).toFixed(1), 960, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) });
  chip(700, 800, 420, 58, 'unique recovery', C.green, P(S, 0, 9.1), 24);
  chip(1220, 800, 420, 58, 'stable recovery ?', C.red, P(S, 0, 10), 24);
  chip(960, 210, 760, 56, 'thinner triangle → more precision needed', C.gold, P(S, 1, 6), 22);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const f = frame44(W / 2 - 320, 640, 640, 380, 0, 1, 0, 1);
  curve(s => f(s, s * s), 60, C.cyan, rp * 0.8, 2.5);
  const rs = [0.25 + 0.05 * Math.sin(t), 0.55, 0.85 - 0.05 * Math.cos(t * 0.8)], pts = rs.map(r => f(r, r * r));
  tri44(pts, C.gold, rp, 0.18); pts.forEach((p, i) => dot(p[0], p[1], 12, ['c', 'g', 'm'][i], rp));
  txt(scramble('AURIC FIB ATOM PYRAMID XV', rp, 445), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XV · 关 系 三 角 形 与 反 演 精 度', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 044 · AURIC_FIB_ATOM_MOMENT_TRIANGLES_AND_INVERSE_PRECISION', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 FREEDOM ---- */
SCENES.freedom = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const py = pyrTrue(460, 560, 320, 0.6 + t * 0.2, s0, { r: 14, fill: 0.06, lab: false });
  if (py.P) { const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'joint' }; Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 24, { size: 18, fam: F.mono, w: 700, align: 'center', c: NC[k], a: s0 })); }
  eqn('three means  →  κ still free', 1300, 260, P(S, 0, 2), C.white, 28);
  const K = 0.2 + 0.18 * Math.sin(t * 1.1), q = P(S, 0, 3.5);
  if (q > 0) { const x0 = 1000, x1 = 1600, ly = 340; line(x0, ly, x1, ly, C.dim, q, 3); dot(lerp(x0, x1, K / 0.4), ly, 14, 'g', q); txt('κ', lerp(x0, x1, K / 0.4), ly - 24, { size: 24, fam: FG, w: 700, align: 'center', c: C.gold, a: q }); }
  const l = P(S, 0, 9.4);
  eqn('p ∝ (1, a, b, c, ac)  ⟹  κ = XY / (1 − Z)', 1300, 470, l, C.green, 28);
  const l2 = P(S, 1, 0.3);
  chip(1300, 600, 640, 56, 'the rule excluded other sources', C.gold, P(S, 1, 2.6), 24);
  chip(1300, 690, 640, 56, 'a model constraint carries information', C.cyan, P(S, 1, 6.5), 22);
};

/* ---- 03 POSTERIOR ---- */
SCENES.posterior = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0);
  if (fade > 0) {
    eqn('r_k = F(k+1) / F(k+3)', 560, 240, s0 * fade, C.white, 28);
    eqn('ν_{A,B}(k) ∝ μ(k) r_k^A (1 − r_k)^B', 560, 300, P(S, 0, 9.8) * fade, C.gold, 26);
    const word = 'αββαβαββαα', n = Math.min(10, Math.max(0, Math.floor((u - lineAt(S, 0).s - 10) * 1.6)));
    let A = 0, B = 0; for (let i = 0; i < n; i++) { if (word[i] === 'α') A++; else B++; }
    for (let i = 0; i < 10; i++) txt(word[i], 1080 + i * 52, 260, { size: 32, fam: FG, w: 700, align: 'center', c: word[i] === 'α' ? C.cyan : C.gold, a: s0 * fade * (i < n ? 1 : 0.2) });
    txt('A = ' + A + '   B = ' + B, 1310, 320, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 10) * fade });
    pbars44(1040, 680, post44(A, B), 66, 600, C.green, P(S, 0, 10) * fade, ['1', '2', '3', '4', '5', '6', '7', '8']);
    txt('posterior over depth k', 1300, 730, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 10) * fade });
  }
  const l = P(S, 1, 0.3);
  if (l > 0) {
    txt('phase', 560, 280, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l }); txt('D(1)', 820, 280, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l }); txt('D(2)', 1120, 280, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l });
    [['p', 'm₁', '1 − 2m₁ + m₂', C.cyan], ['β', '1 − m₁', 'm₂', C.mag]].forEach(([a1, a2, a3, col], k) => { const y = 350 + k * 80, q = P(S, 1, 0.5 + k * 1.2); box(460, y - 40, 860, 64, col, q * 0.7, 1.5, 'rgba(0,0,0,0.4)'); txt(a1, 560, y + 4, { size: 28, fam: FG, w: 700, align: 'center', c: col, a: q }); txt(a2, 820, y + 4, { size: 28, fam: FG, w: 700, align: 'center', c: C.white, a: q }); txt(a3, 1120, y + 4, { size: 28, fam: FG, w: 700, align: 'center', c: C.white, a: q }); });
    const nl = P(S, 1, 6), x0 = 460, x1 = 1460, X = v => lerp(x0, x1, v), ly = 640;
    if (nl > 0) { line(x0, ly, x1, ly, C.dim, nl, 2); [0, 1 / 3, 2 / 5, 3 / 5, 2 / 3, 1].forEach(v => { line(X(v), ly - 8, X(v), ly + 8, C.dim, nl, 1.5); }); fillBox(X(1 / 3), ly - 14, X(2 / 5) - X(1 / 3), 28, C.cyan, nl * 0.6); fillBox(X(3 / 5), ly - 14, X(2 / 3) - X(3 / 5), 28, C.mag, nl * 0.6); txt('[1/3, 2/5]', X(0.367), ly + 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: nl }); txt('[3/5, 2/3]', X(0.633), ly + 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: nl }); txt('D(1) reveals the phase', 960, 760, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 9.6) }); }
  }
};

/* ---- 04 TWOMOMENTS ---- */
SCENES.twomoments = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('same prior,  E[r] = E′[r],  E[r²] = E′[r²]   ⟹   ν = ν′', 960, 230, s0, C.white, 26);
  const x0 = 420, y0 = 560, w = 1080, h = 200, f = frame44(x0, y0, w, h, 0.33, 0.40, -1, 1);
  const q = P(S, 0, 6.8);
  if (q > 0) {
    line(x0, y0 - h / 2, x0 + w, y0 - h / 2, C.dim, q, 1.5); txt('r', x0 + w + 16, y0 - h / 2 + 8, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.dim, a: q });
    const g = r => 30 * (r - 0.345) * (r - 0.39) * 40 - 0.0;
    curve(s => { const r = 0.33 + 0.07 * s; return f(r, Math.max(-1, Math.min(1, g(r) * 25))); }, 80, C.gold, q, 3);
    txt('g(r) = log ν/ν′ : changes sign at most twice', 960, y0 - h - 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
    const q2 = P(S, 0, 9.8);
    curve(s => { const r = 0.33 + 0.07 * s; return f(r, Math.max(-1, Math.min(1, g(r) * 12))); }, 80, C.cyan, q2, 2);
    txt('quadratic P(r) with the same sign', 960, y0 + 60, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q2 });
  }
  const l = P(S, 1, 0.3);
  chip(960, 720, 760, 58, 'two exact numbers pin the posterior', C.green, l, 24);
  chip(960, 800, 760, 52, 'on this family only · not two cheap registers', C.red, P(S, 1, 5.7), 20);
};

/* ---- 05 CURVE ---- */
SCENES.curve = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f = frame44(480, 780, 900, 520, 0, 1, 0, 1);
  line(480, 780, 1400, 780, C.dim, s0, 1.5); line(480, 780, 480, 240, C.dim, s0, 1.5);
  txt('r', 1410, 788, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.dim, a: s0 }); txt('r²', 480, 226, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  curve(s => f(s, s * s), 80, C.cyan, s0, 3); txt('γ(r) = (r, r²)', 1300, 300, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 });
  const rs = [0.2, 0.5, 0.8], ws = [0.3 + 0.2 * Math.sin(t * 0.8), 0.4, 0.3 - 0.2 * Math.sin(t * 0.8)], q = P(S, 0, 3.7);
  const pts = rs.map(r => f(r, r * r));
  pts.forEach((p, i) => { dot(p[0], p[1], 10 + 18 * ws[i], ['c', 'g', 'm'][i], q); });
  const m1 = rs.reduce((s, r, i) => s + ws[i] * r, 0), m2 = rs.reduce((s, r, i) => s + ws[i] * r * r, 0), mp_ = f(m1, m2);
  dot(mp_[0], mp_[1], 14, 'w', P(S, 0, 6)); txt('(m₁, m₂)', mp_[0] + 20, mp_[1] - 16, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.white, a: P(S, 0, 6) });
  tri44(pts, C.gold, P(S, 0, 8.3), 0.08);
  const l = P(S, 1, 0.3), on = f(m1, m1 * m1);
  if (l > 0) { line(mp_[0], mp_[1], on[0], on[1], C.red, l, 3); txt('Var = m₂ − m₁²', on[0] + 20, (mp_[1] + on[1]) / 2 + 8, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.red, a: l }); }
  eqn('shared depth: Pr(αα) = m₂      redrawn: m₁²', 960, 870, P(S, 1, 4.5), C.gold, 24);
};

/* ---- 06 TRIANGLE ---- */
SCENES.triangle = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f = frame44(380, 760, 760, 480, 0, 1, 0, 1);
  const squeeze = ease(P(S, 1, 8.3, 4)), a = 0.2, c = 0.8, b = lerp(0.5, 0.23, squeeze);
  curve(s => f(s, s * s), 60, C.cyan, s0 * 0.6, 2);
  const pts = [a, b, c].map(r => f(r, r * r));
  tri44(pts, C.gold, s0, 0.2); pts.forEach((p, i) => { dot(p[0], p[1], 12, ['c', 'g', 'm'][i], s0); txt(['a', 'b', 'c'][i], p[0] - 16, p[1] - 16, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 }); });
  eqn('𝒜(a,b,c) = ½ (b−a)(c−a)(c−b)', 1480, 260, P(S, 0, 2), C.gold, 28);
  txt('area = ' + (0.5 * (b - a) * (c - a) * (c - b)).toFixed(4), 1480, 330, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) });
  const l = P(S, 1, 0.3);
  eqn('p_i = (m₂ − (r_j + r_ℓ) m₁ + r_j r_ℓ) / ((r_i − r_j)(r_i − r_ℓ))', 1200, 470, l, C.cyan, 22);
  const den = [(a - b) * (a - c), (b - a) * (b - c), (c - a) * (c - b)];
  den.forEach((d, i) => { const q = P(S, 1, 4.5 + i * 0.5); txt('1 / |(r_' + (i + 1) + ' − ·)(r_' + (i + 1) + ' − ·)| = ' + (1 / Math.abs(d)).toFixed(1), 1480, 560 + i * 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: Math.abs(1 / d) > 10 ? C.red : C.white, a: q }); });
  chip(1480, 760, 480, 56, 'unique ≠ stable', C.red, P(S, 1, 11), 26);
};

/* ---- 07 GRAM ---- */
SCENES.gram = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  mgrid(330, 250, [['1', 'm₁', 'm₂'], ['m₁', 'm₂', 'm₃'], ['m₂', 'm₃', 'm₄']], 110, 76, s0, { colf: () => C.cyan, size: 26 });
  txt('H₂ =', 310, 375, { size: 28, fam: FG, w: 700, align: 'right', c: C.white, a: s0 });
  eqn('det H₂ = 4 Σ ν_i ν_j ν_k 𝒜_ijk²', 1300, 300, P(S, 0, 5.5), C.gold, 30);
  /* four sources: four triangles */
  const f = frame44(980, 760, 640, 360, 0, 1, 0, 1), rs = [0.15, 0.4, 0.62, 0.9], pts = rs.map(r => f(r, r * r));
  curve(s => f(s, s * s), 50, C.cyan, P(S, 0, 5) * 0.5, 2);
  const tr = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]], cur = Math.floor(t * 0.8) % 4;
  tr.forEach((T, k) => tri44(T.map(i => pts[i]), [C.gold, C.mag, C.green, C.cyan][k], P(S, 0, 6) * (k === cur ? 1 : 0.25), k === cur ? 0.2 : 0.04));
  pts.forEach(p => dot(p[0], p[1], 10, 'w', P(S, 0, 5)));
  const l = P(S, 1, 0.3);
  eqn('= det Cov(r, r²)', 560, 620, l, C.white, 28);
  chip(560, 720, 600, 56, 'det H₂ > 0  ⟺  ≥ 3 distinct rates', C.green, P(S, 1, 4), 22);
  txt('three relation directions, any number of sources', 560, 800, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 9) });
};

/* ---- 08 LIKELIHOOD ---- */
SCENES.likelihood = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), rs = [1 / 3, 3 / 8, 2 / 5];
  /* reading plane, local frame normalized to fit */
  const ra = rs.map(r => [r, r * r]), la = rs.map(r => [Math.log(r), Math.log(1 - r)]);
  const fit = (P_, x0, y0, w, h) => { const xs = P_.map(p => p[0]), ys = P_.map(p => p[1]), xa = Math.min(...xs), xb = Math.max(...xs), ya = Math.min(...ys), yb = Math.max(...ys); const sx = w / (xb - xa), sy = h / (yb - ya); return P_.map(p => [x0 + (p[0] - xa) * sx, y0 - (p[1] - ya) * sy]); };
  /* shear (determinant one) then positive rescaling: both keep the orientation */
  const shear = P_ => { const [p1, , p3] = P_, sl = (p3[1] - p1[1]) / (p3[0] - p1[0]); return P_.map(p => [p[0], p[1] - p1[1] - sl * (p[0] - p1[0])]); };
  box(260, 290, 600, 460, C.cyan, s0, 1.5, null); txt('reading plane  (r, r²)', 560, 270, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 });
  const rp = fit(shear(ra), 330, 700, 460, 360);
  tri44(rp, C.cyan, s0, 0.15); orient44(rp, C.cyan, P(S, 0, 3)); rp.forEach((p, i) => dot(p[0], p[1], 10, ['c', 'g', 'm'][i], s0));
  const q = P(S, 0, 6);
  box(1060, 290, 600, 460, C.mag, q, 1.5, null); txt('likelihood plane  (log r, log(1−r))', 1360, 270, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q });
  const lp = fit(shear(la), 1130, 700, 460, 360);
  tri44(lp, C.mag, q, 0.15); orient44(lp, C.mag, P(S, 1, 0.3)); lp.forEach((p, i) => dot(p[0], p[1], 10, ['c', 'g', 'm'][i], q));
  txt('rates 1/3, 3/8, 2/5 · each plane sheared and rescaled, orientation kept', 960, 800, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
  eqn('L(a,b,c) = −∫∫ (t − s) / (s(1−s) t(1−t)) ds dt < 0', 960, 860, P(S, 1, 5), C.gold, 24);
};

/* ---- 09 JACOBIAN ---- */
SCENES.jacobian = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('J = ∂(m₁, m₂) / ∂(A, B)', 560, 240, s0, C.white, 28);
  eqn('−det J = Σ ν_i ν_j ν_k Δ_ijk Λ_ijk', 1320, 240, P(S, 0, 4), C.gold, 28);
  const vals = [0.8, 0.5, 0.95, 0.35, 0.65, 0.4, 0.75, 0.55, 0.3, 0.6];
  vals.forEach((v, i) => { const q = P(S, 0, 9.7 + i * 0.2); fillBox(400 + i * 60, 560 - v * 220, 44, v * 220, C.green, q * 0.8); });
  line(390, 560, 1000, 560, C.dim, s0, 1.5); txt('every triple contributes with the same sign', 700, 610, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 12) });
  const l = P(S, 1, 0.3), x0 = 1100, x1 = 1700, lo = 8.5, hi = 10.3, X = v => lerp(x0, x1, (v - lo) / (hi - lo)), ly = 520;
  if (l > 0) {
    line(x0, ly, x1, ly, C.dim, l, 2);
    [[625 / 72, '625/72 ≈ 8.68', C.cyan], [81 / 8, '81/8 = 10.125', C.mag]].forEach(([v, s, col], k) => { line(X(v), ly - 30, X(v), ly + 30, col, l, 3); txt(s, X(v), ly + 60 + k * 0, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a: l }); });
    for (let i = 0; i < 24; i++) { const v = 8.87 + 0.5 * rnd(i, 4); dot(X(v), ly - 50 - (i % 4) * 14, 6, 'g', P(S, 1, 2 + i * 0.08)); }
    txt('−det J / det H₂  (random FIB mixtures)', 1400, 420, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 3) });
    eqn('(625/72) det H₂ ≤ −det J ≤ (81/8) det H₂', 1400, 680, P(S, 1, 5), C.gold, 24);
    txt('because 1/3 ≤ r_k ≤ 2/5', 1400, 730, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 5) });
  }
};

/* ---- 10 PYRAMID ---- */
SCENES.pyramid = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const py = pyrTrue(560, 560, 340, 0.6 + t * 0.2, s0, { r: 14, fill: 0.0, lab: false });
  if (py.P) {
    const PN = { O: '∅', L: 'low', T: 'mid', R: 'high', J: 'joint' }; Object.keys(py.P).forEach(k => txt(PN[k], py.P[k][0], py.P[k][1] - 24, { size: 18, fam: F.mono, w: 700, align: 'center', c: NC[k], a: s0 }));
    const base = ['O', 'L', 'J', 'R'], q = P(S, 1, 0.3);
    fillPoly(base.map(k => py.P[k]), C.red, P(S, 1, 0.3) * 0.15 * (1 - P(S, 1, 3.8)));
    const cur = Math.floor(t * 0.9) % 4, tri = base.filter((_, i) => i !== cur);
    if (P(S, 1, 3.8) > 0) { const cols = [C.gold, C.mag, C.green, C.cyan]; [[tri[0], tri[1], tri[2]], [tri[0], tri[1], 'T'], [tri[1], tri[2], 'T'], [tri[0], tri[2], 'T']].forEach(fc => fillPoly(fc.map(k => py.P[k]), cols[cur], P(S, 1, 3.8) * 0.12)); }
  }
  eqn('det Cov(x, y, z) = p₂ (p₀p₁p₃ + p₀p₁p₁₃ + p₀p₃p₁₃ + p₁p₃p₁₃)', 1260, 300, P(S, 0, 5.3), C.gold, 22);
  chip(1300, 520, 520, 56, 'four base corners: coplanar, no volume', C.red, P(S, 1, 0.3), 20);
  chip(1300, 610, 520, 56, 'apex + three base corners: a tetrahedron', C.green, P(S, 1, 3.8), 20);
  txt('the same simplex–determinant calculus', 1300, 700, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 8) });
};

/* ---- 11 FIBONACCI ---- */
SCENES.fibonacci = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('|r_{n+1} − r_n| = 1 / (F_{n+3} F_{n+4})', 560, 240, s0, C.white, 26);
  eqn('𝒜_n = 1 / (2 (F_{n+3} F_{n+4} F_{n+5})²)', 560, 310, P(S, 0, 9.5), C.gold, 28);
  const l = P(S, 1, 0.3);
  [['depths 1, 2, 3', '1 / 28,800'], ['depths 5, 6, 7', '1 / 3,084,265,800'], ['depths 10, 11, 12', '1 / 5,742,277,921,320,200']].forEach(([a1, a2], k) => { const q = P(S, 1, [0.9, 3.5, 5.7][k]); box(260, 400 + k * 80, 620, 62, C.gold, q * 0.6, 1.5, 'rgba(0,0,0,0.4)'); txt(a1, 400, 440 + k * 80, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(a2, 700, 440 + k * 80, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); });
  /* log10 area vs n */
  const x0 = 1080, y0 = 760, w = 600, h = 460, la = n => Math.log10(1 / (2 * Math.pow(FB44[n + 3] * FB44[n + 4] * FB44[n + 5], 2)));
  const q2 = P(S, 0, 2);
  if (q2 > 0) {
    plotAxes(x0, y0, w, h, q2, 'n', 'log₁₀ 𝒜_n');
    for (let n = 1; n <= 12; n++) { const x = x0 + (n - 0.5) / 12 * w, y = y0 + la(n) / 16 * h; dot(x, y, 8, n === 1 || n === 5 || n === 10 ? 'g' : 'c', P(S, 0, 3 + n * 0.3)); }
    [0, -5, -10, -15].forEach(v => txt(String(v), x0 - 12, y0 + v / 16 * h + 6, { size: 16, fam: F.mono, w: 700, align: 'right', c: C.dim, a: q2 }));
    txt('~ φ^(−6n)', x0 + w - 60, y0 - h + 40, { size: 24, fam: FG, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 10) });
  }
  chip(570, 680, 560, 52, 'never zero · rapidly thinner', C.red, P(S, 1, 10), 22);
};

/* ---- 12 LENGTHLAW ---- */
SCENES.lengthlaw = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'lean'], [1, 0, 'theory']]);
  const s0 = clamp(u);
  const lq = P(S, 0, 0.5);
  if (lq > 0) { box(300, 220, 1320, 150, C.green, lq * (1 - 0.5 * P(S, 1, 0)), 2, 'rgba(0,30,15,0.6)'); txt('LEAN · FourthSegmentLawRecovery.complete_original_recovery', 960, 260, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: lq }); txt('equal length laws  ⟺  same phase ∧ same depth posterior  ⟺  same transcript law', 960, 320, { size: 22, fam: FG, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) }); }
  const D = (r, l) => { const xi = r * (1 - r), j = Math.floor((l - 1) / 2); return l % 2 ? r * Math.pow(xi, j) : (1 - r) * (1 - r) * Math.pow(xi, j); };
  const ra = R44(3), rb = R44(4), q = P(S, 1, 0.3);
  if (q > 0) {
    for (let l = 1; l <= 10; l++) { const x = 340 + (l - 1) * 62; fillBox(x, 760 - D(ra, l) * 600, 24, D(ra, l) * 600, C.cyan, q * 0.8); fillBox(x + 26, 760 - D(rb, l) * 600, 24, D(rb, l) * 600, C.mag, q * 0.8); }
    line(330, 760, 970, 760, C.dim, q, 1.5); txt('D_r(ℓ): depth 3 (r = 3/8) vs depth 4 (r = 5/13)', 650, 800, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    eqn('TV(D_r, D_s) ≤ (12/7) |r − s|', 1360, 480, P(S, 1, 2.5), C.gold, 28);
    txt('TV(depth 3, depth 4) = 0.0141', 1360, 540, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 7) });
    txt('TV(δ₃, δ₄) = 1', 1360, 600, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 10.4) });
    chip(1360, 700, 520, 56, 'exact is not uniformly stable', C.red, P(S, 1, 12), 22);
  }
};

/* ---- 13 RECORDS ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), flat = ease(P(S, 0, 9.3, 2.5));
  const v = v3(560, 520, 240, 0.5 + t * 0.25, 0.4);
  const O = v(0, 0, 0), E = [[1, 0, 0.1], [0.2, 1, 0.1 + 0.0], [0.4, 0.5, lerp(1, 0.08, flat)]];
  E.forEach((e, i) => { const p = v(...e); arrow(O[0], O[1], p[0], p[1], [C.cyan, C.gold, C.mag][i], s0, 4); txt(['e₀', 'e₁', 'e₂'][i], p[0] + 14, p[1] - 10, { size: 24, fam: FG, w: 700, align: 'left', c: [C.cyan, C.gold, C.mag][i], a: s0 }); });
  eqn('⟨v_i, v_j⟩ = m_{i+j}   ·   Gram = H₂', 1300, 260, s0, C.white, 26);
  eqn('rank 3, volume → 0', 1300, 330, P(S, 0, 9.5), C.red, 28);
  const l = P(S, 1, 0.3);
  chip(1300, 470, 680, 56, 'independent ≠ distinguishable at finite precision', C.gold, l, 20);
  eqn('after α:  m₁ → m₂/m₁ ,  m₂ → m₃/m₁', 1300, 590, P(S, 1, 7), C.cyan, 26);
  txt('the next update already needs m₃', 1300, 650, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 9) });
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['UNIQUE', 'two moments · one prior', C.cyan], ['STABLE', 'triangle area · Gram volume', C.gold], ['ACQUIRABLE', 'actual reads · real cost', C.mag]];
    items.forEach(([a1, a2, col], i) => { const x = 420 + i * 540, q = P(S, 0, [4.5, 6, 7.2][i]) * fade; box(x - 240, 250, 480, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 315, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 365, { size: 22, fam: FG, w: 700, align: 'center', c: C.white, a: q }); });
    txt('LEAN · FourthSegmentLawRecovery.complete_original_recovery', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.3) * fade });
    txt('VOLUME · two moments · triangle and Gram identities · inverse bounds · Fibonacci areas', W / 2, 580, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 4.5) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 12.5) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, f = frame44(W / 2 - 300, 560, 600, 320, 0, 1, 0, 1);
    curve(s => f(s, s * s), 60, C.cyan, a * 0.8, 2.5);
    const pts = [0.3, 0.55, 0.82].map(r => f(r, r * r)); tri44(pts, C.gold, a, 0.2); pts.forEach((p, i) => dot(p[0], p[1], 10, ['c', 'g', 'm'][i], a));
    txt('AURIC FIB ATOM PYRAMID XV', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XV · 关系三角形与反演精度 · TRURETURING FILM 044', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Unique is not stable. Stable is not acquired.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'UNIQUE VS STABLE', freedom: 'CONSTRAINTS CARRY INFORMATION', posterior: 'A SHARED HIDDEN DEPTH', twomoments: 'TWO MOMENTS SUFFICE', curve: 'THE MOMENT CURVE', triangle: 'THE RELATION TRIANGLE', gram: 'GRAM VOLUME', likelihood: 'OPPOSITE ORIENTATIONS', jacobian: 'THE INVERSE AREA', pyramid: 'BACK TO THE PYRAMID', fibonacci: 'FIBONACCI THINNING', lengthlaw: 'EXACT, NOT UNIFORM', records: 'THREE RECORDS', finale: 'LEDGER' });

function poster44() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const f = frame44(220, 760, 760, 520, 0, 1, 0, 1);
  curve(s => f(s, s * s), 80, C.cyan, 0.9, 3);
  [[0.15, 0.5, 0.9, C.gold], [0.3, 0.42, 0.6, C.mag], [0.55, 0.6, 0.66, C.green]].forEach(([a, b, c, col]) => { const pts = [a, b, c].map(r => f(r, r * r)); tri44(pts, col, 0.9, 0.18); pts.forEach(p => dot(p[0], p[1], 9, 'w', 1)); });
  txt('𝒜 = ½ (b−a)(c−a)(c−b)', 1420, 320, { size: 38, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('det H₂ = 4 Σ ννν 𝒜²', 1420, 410, { size: 36, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('625/72 ≤ −det J / det H₂ ≤ 81/8', 1420, 500, { size: 32, fam: FG, w: 700, align: 'center', c: C.white });
  txt('𝒜_n = 1 / 2(F F F)²', 1420, 590, { size: 36, fam: FG, w: 700, align: 'center', c: C.green });
  txt('FIB 原子金字塔 XV', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XV', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('唯 一 不 等 于 稳 定 · 稳 定 不 等 于 已 取 得', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 044', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster44;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
