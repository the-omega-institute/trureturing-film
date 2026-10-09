/* Film 043 — AURIC FIB ATOM PYRAMID XIV · 金字塔 XIV：祖先立方体与取得代价 */

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


/* ---- film 043: ancestry cube helpers ---- */
function rho43(t) { if (t === 'a') return 'b'; if (t === 'b') return ['b', 'a']; return [rho43(t[0]), rho43(t[1])]; }
const T43 = (() => { const T = ['a']; for (let i = 0; i < 11; i++) T.push(rho43(T[T.length - 1])); return T; })();
const B43 = T43[3], D43 = ['b', ['a', 'b']];
const eq43 = (x, y) => (typeof x === 'string' || typeof y === 'string') ? x === y : eq43(x[0], y[0]) && eq43(x[1], y[1]);
function addrs43(t, p = '', out = []) { out.push([p, t]); if (typeof t !== 'string') { addrs43(t[0], p + 'L', out); addrs43(t[1], p + 'R', out); } return out; }
const POS43 = n => addrs43(T43[n]).filter(([p, s]) => eq43(s, B43)).map(x => x[0]);
function repl43(t, p, v) { if (p === '') return v; return p[0] === 'L' ? [repl43(t[0], p.slice(1), v), t[1]] : [t[0], repl43(t[1], p.slice(1), v)]; }
function V43(n, A) { let t = T43[n]; A.forEach(p => { t = repl43(t, p, D43); }); return t; }
const nl43 = t => typeof t === 'string' ? 1 : nl43(t[0]) + nl43(t[1]);
const hd43 = t => typeof t === 'string' ? 0 : 1 + Math.max(hd43(t[0]), hd43(t[1]));
/* layout: leaves evenly spaced; returns map address -> [x, y, isLeaf, label] */
function lay43(t, cx, top, w, h, maxSp = 60, maxLh = 60) {
  const n = nl43(t), dp = Math.max(1, hd43(t)), sp = n > 1 ? Math.min(maxSp, w / (n - 1)) : 0, x0 = cx - sp * (n - 1) / 2, lh = Math.min(maxLh, h / dp);
  let k = 0; const M = {};
  const rec = (u, p, d) => { if (typeof u === 'string') { M[p] = [x0 + sp * k++, top + dp * lh, true, u]; return M[p]; } const L = rec(u[0], p + 'L', d + 1), R = rec(u[1], p + 'R', d + 1); M[p] = [(L[0] + R[0]) / 2, top + d * lh, false, null]; return M[p]; };
  rec(t, '', 0); return { M, sp, lh };
}
function draw43(t, cx, top, w, h, a, o = {}) {
  if (a <= 0) return null;
  const L = lay43(t, cx, top, w, h, o.maxSp || 60, o.maxLh || 60), M = L.M;
  Object.keys(M).forEach(p => { if (!M[p][2]) { [p + 'L', p + 'R'].forEach(c => { if (M[c]) line(M[p][0], M[p][1], M[c][0], M[c][1], o.ec || C.white, a * (o.ea || 0.5), o.lw || 1.5); }); } });
  Object.keys(M).forEach(p => { const m = M[p]; if (m[2]) dot(m[0], m[1], o.r || 8, m[3] === 'a' ? 'c' : 'g', a); else if (!o.noInner) ring(m[0], m[1], (o.r || 8) * 0.45, o.ec || C.white, a * 0.8, 1.2); });
  return L;
}
/* highlight a subtree at address p with a box */
function hl43(L, p, col, a, pad = 10) {
  if (a <= 0 || !L) return;
  const ks = Object.keys(L.M).filter(q => q.startsWith(p)); let x1 = 1e9, x2 = -1e9, y1 = 1e9, y2 = -1e9;
  ks.forEach(q => { const m = L.M[q]; x1 = Math.min(x1, m[0]); x2 = Math.max(x2, m[0]); y1 = Math.min(y1, m[1]); y2 = Math.max(y2, m[1]); });
  box(x1 - pad, y1 - pad, x2 - x1 + 2 * pad, y2 - y1 + 2 * pad, col, a, 2, rgba(col, 0.12));
}
const FB43 = (() => { const f = [0, 1]; for (let i = 0; i < 60; i++) f.push(f[f.length - 1] + f[f.length - 2]); return f; })();
function cross43(x, y, s, a) { if (a <= 0) return; line(x - s, y - s, x + s, y + s, C.red, a, 3); line(x - s, y + s, x + s, y - s, C.red, a, 3); }
/* deterministic subset that changes over time */
function subset43(P, t, rate = 0.8) { const k = Math.floor(t * rate); return P.filter((p, i) => rnd(i, k) < 0.35); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.5), P10 = POS43(10);
  const L = draw43(T43[10], 960, 230, 1560, 330, s0, { r: 5, maxLh: 38, noInner: true, ea: 0.35, lw: 1 });
  const q = P(S, 0, 6.5);
  P10.forEach((p, i) => hl43(L, p, C.mag, q * (0.6 + 0.4 * Math.sin(t * 3 + i)), 7));
  txt('T₁₀ · 89 leaves · 21 independent positions', 960, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q });
  const l = P(S, 1, 0.3);
  chip(700, 740, 560, 60, '2,097,152 trees · same leaf word', C.gold, P(S, 1, 2), 24);
  chip(1260, 740, 460, 60, '21 reads for one bit', C.cyan, P(S, 1, 6), 24);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const v = v3(W / 2, 430, 230, 0.6 + t * 0.35, 0.42, [0.5, 0.5, 0.5]);
  const pts = []; for (let m = 0; m < 8; m++) pts.push(v(m & 1, (m >> 1) & 1, (m >> 2) & 1));
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = i ^ j; if (d === 1 || d === 2 || d === 4) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.cyan, rp * 0.7, 2); }
  pts.forEach((p, m) => dot(p[0], p[1], m === 0 ? 16 : 10, m === 0 ? 'g' : 'm', rp));
  txt(scramble('AURIC FIB ATOM PYRAMID XIV', rp, 434), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XIV · 祖 先 立 方 体 与 取 得 代 价', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 043 · AURIC_FIB_ATOM_ANCESTRY_CUBE_AND_ACQUISITION_COST', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 BRACKET ---- */
SCENES.bracket = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), q2 = P(S, 0, 7.2);
  box(300, 220, 560, 480, C.cyan, s0, 2, 'rgba(0,25,40,0.4)'); txt('B = ⟨⟨β, α⟩, β⟩ = T₃', 580, 265, { size: 26, fam: FG, w: 700, align: 'center', c: C.cyan, a: s0 });
  draw43(B43, 580, 320, 240, 220, s0, { r: 16, maxSp: 120, maxLh: 110 });
  box(1060, 220, 560, 480, C.mag, q2, 2, 'rgba(30,0,30,0.4)'); txt('D = ⟨β, ⟨α, β⟩⟩', 1340, 265, { size: 26, fam: FG, w: 700, align: 'center', c: C.mag, a: q2 });
  draw43(D43, 1340, 320, 240, 220, q2, { r: 16, maxSp: 120, maxLh: 110 });
  const l = P(S, 1, 0.3);
  [[580, s0], [1340, q2]].forEach(([x, a]) => txt('β  α  β', x, 610, { size: 34, fam: FG, w: 700, align: 'center', c: C.white, a: a * l }));
  txt('same leaf word', 960, 610, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: l });
  chip(580, 790, 300, 60, 'depth ν = 3', C.green, P(S, 1, 4), 28);
  chip(1340, 790, 300, 60, 'depth ν = 0', C.red, P(S, 1, 7), 28);
};

/* ---- 03 OBSTRUCTION ---- */
SCENES.obstruction = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 0, 'lean'], [1, 6, 'theory']]);
  const s0 = clamp(u);
  eqn('ρ(α) = β      ρ(β) = ⟨β, α⟩', 560, 240, s0, C.white, 30);
  const q1 = P(S, 0, 2.5);
  draw43(['b', 'a'], 560, 330, 160, 140, q1, { r: 16, maxSp: 160, maxLh: 120 });
  txt('α only as the right leaf of ⟨β, α⟩', 560, 520, { size: 22, fam: FG, w: 700, align: 'center', c: C.cyan, a: q1 });
  const q2 = P(S, 0, 8);
  const L = draw43(D43, 1340, 300, 240, 220, q2, { r: 16, maxSp: 120, maxLh: 100 });
  if (L && q2 > 0) { const m = L.M['RL']; ring(m[0], m[1], 30 + 3 * Math.sin(t * 5), C.red, q2, 3); txt('left child = α', m[0] - 40, m[1] + 60, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: q2 }); }
  txt('D ∉ ρ[𝕋]', 1340, 270, { size: 26, fam: FG, w: 700, align: 'center', c: C.mag, a: q2 });
  const lq = P(S, 1, 0.3) * (1 - P(S, 1, 6));
  if (lq > 0) { box(400, 620, 1120, 120, C.green, lq, 2, 'rgba(0,30,15,0.6)'); txt('LEAN · ActualTreeReadoutAcquisition.source_foundation', 960, 660, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: lq }); txt('∀ t, alphaValid (ρ t) = true', 960, 708, { size: 26, fam: FG, w: 700, align: 'center', c: C.white, a: lq }); }
  chip(960, 830, 820, 56, 'the difference lives in which two parts merged first', C.gold, P(S, 1, 6.5), 22);
};

/* ---- 04 FAMILY ---- */
SCENES.family = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0);
  if (fade > 0) {
    const P8 = POS43(8), A = P(S, 0, 7) > 0 ? subset43(P8, t, 0.9) : [];
    const tr = V43(8, A);
    const L = draw43(tr, 960, 240, 1500, 380, s0 * fade, { r: 7, maxLh: 52, noInner: true, ea: 0.4 });
    P8.forEach(p => hl43(L, p, A.includes(p) ? C.red : C.mag, P(S, 0, 2.5) * fade, 9));
    txt('T₈ · 34 leaves · K = F₆ = 8 positions', 960, 690, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 2.5) * fade });
    txt('flipped to D: ' + A.length + ' · leaf word unchanged', 960, 740, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 7) * fade });
  }
  const l = P(S, 1, 0.3);
  if (l > 0) {
    const hd = ['n', 'leaves M', 'positions K', 'trees 2^K'], rows = [['5', '8', '2', '4'], ['8', '34', '8', '256'], ['10', '89', '21', '2,097,152'], ['15', '987', '233', '2^233']];
    hd.forEach((h, j) => txt(h, 520 + j * 280, 270, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: l }));
    rows.forEach((r, k) => { const q = P(S, 1, 0.5 + k * 1.2), hi = k === 2; box(380, 300 + k * 80, 1120, 64, hi ? C.gold : C.dim, q * (hi ? 1 : 0.5), hi ? 2.5 : 1.2, 'rgba(0,0,0,0.4)'); r.forEach((v, j) => txt(v, 520 + j * 280, 342 + k * 80, { size: 28, fam: F.mono, w: 700, align: 'center', c: hi ? C.gold : C.white, a: q })); });
    eqn('K_n / M_n  →  φ⁻³ ≈ 0.236', 960, 690, P(S, 1, 9.5), C.cyan, 28);
  }
};

/* ---- 05 DEPTH ---- */
SCENES.depth = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), K = 8, k = Math.floor(t * 0.7), defect = Math.floor(rnd(k, 9) * (K + 4));
  for (let i = 0; i < K; i++) { const bad = i === defect && P(S, 0, 3) > 0, x = 520 + i * 110; box(x - 40, 260, 80, 80, bad ? C.red : C.green, s0, 2, bad ? 'rgba(80,0,10,0.5)' : 'rgba(0,40,20,0.4)'); txt(bad ? '1' : '0', x, 312, { size: 32, fam: F.mono, w: 700, align: 'center', c: bad ? C.red : C.green, a: s0 }); txt('ε' + String.fromCharCode(0x2081 + i), x, 370, { size: 20, fam: FG, w: 700, align: 'center', c: C.dim, a: s0 }); }
  const dv = defect < K && P(S, 0, 3) > 0 ? 0 : 10;
  chip(960, 450, 360, 66, 'ν = ' + dv, dv ? C.green : C.red, P(S, 0, 3), 34);
  eqn('ν(V_A) = n · ∏_p (1 − ε_p)', 960, 560, P(S, 0, 5), C.white, 32);
  const l = P(S, 1, 0.3);
  eqn('ν / n = Σ_B (−1)^|B| ∏_{p∈B} ε_p      top coefficient (−1)^K ≠ 0', 960, 640, l, C.gold, 24);
  chip(640, 760, 520, 60, 'confirm: every position clean', C.green, P(S, 1, 5), 22);
  chip(1280, 760, 520, 60, 'deny: one counterexample', C.red, P(S, 1, 10), 22);
};

/* ---- 06 CUBE ---- */
SCENES.cube = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0.3) * 0.0;
  /* gap areas on B and D */
  const pairs = [[B43, ['1 · 2 = 2', '2 · 1 = 2'], [1, 2], 420, C.cyan], [D43, ['2 · 1 = 2', '1 · 2 = 2'], [2, 1], 900, C.mag]];
  pairs.forEach(([tr, _, ar, x, col], k) => { const q = k ? P(S, 1, 0.3) : s0; const L = draw43(tr, x, 280, 200, 170, q, { r: 13, maxSp: 100, maxLh: 85 }); if (L) { const lv = Object.keys(L.M).filter(p => L.M[p][2]).sort((a1, b1) => L.M[a1][0] - L.M[b1][0]); for (let g = 0; g < 2; g++) { const xm = (L.M[lv[g]][0] + L.M[lv[g + 1]][0]) / 2; txt(String(ar[g]), xm, 510, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); } txt('gap areas', x, 550, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); } });
  arrow(560, 420, 760, 420, C.white, P(S, 1, 0.3), 3);
  eqn('Σ_i ℓ_i r_i = C(M, 2)', 660, 650, P(S, 0, 8), C.gold, 28);
  txt('each defect moves one unit of area', 660, 710, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4.5) });
  /* orthogonal cube */
  const l = P(S, 1, 7.5);
  if (l > 0) {
    const v = v3(1450, 470, 200, 0.5 + t * 0.3, 0.4, [0.5, 0.5, 0.5]); const pts = []; for (let m = 0; m < 8; m++) pts.push(v(m & 1, (m >> 1) & 1, (m >> 2) & 1));
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = i ^ j; if (d === 1 || d === 2 || d === 4) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], [C.cyan, C.gold, null, C.mag][d === 4 ? 3 : d === 2 ? 1 : 0], l * 0.8, 2.5); }
    pts.forEach((p, m) => dot(p[0], p[1], m === 0 ? 14 : 9, m === 0 ? 'g' : 'w', l));
    txt('edge √2 · orthogonal', 1450, 760, { size: 22, fam: FG, w: 700, align: 'center', c: C.cyan, a: l });
    eqn('‖𝒜(V_A) − 𝒜(V_A′)‖² = 2 |A △ A′|', 1450, 820, P(S, 1, 11), C.gold, 24);
  }
};

/* ---- 07 SHRINK ---- */
SCENES.shrink = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  ['leaf word', 'path areas', 'word moments', 'ordered products'].forEach((s, k) => { const q = P(S, 0, 1 + k * 1.2); chip(560, 270 + k * 80, 380, 56, s + ' : identical', C.white, q, 22); });
  chip(560, 600, 380, 56, 'ancestor areas : differ', C.gold, P(S, 0, 7.5), 22);
  const l = P(S, 1, 0.3), sc = lerp(1, 0.12, ease(P(S, 1, 1.5, 4)));
  if (l > 0) {
    const v = v3(1350, 420, 200 * sc, 0.5 + t * 0.3, 0.4, [0.5, 0.5, 0.5]); const pts = []; for (let m = 0; m < 8; m++) pts.push(v(m & 1, (m >> 1) & 1, (m >> 2) & 1));
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = i ^ j; if (d === 1 || d === 2 || d === 4) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.cyan, l * 0.8, 2); }
    pts.forEach((p, m) => dot(p[0], p[1], 6 + 6 * sc, m === 0 ? 'g' : 'r', l));
    txt('normalized diameter √(2K) / C(M,2)', 1350, 640, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
    [['n = 8', '0.0071'], ['n = 10', '0.0017'], ['n = 15', '4.4e−5'], ['n = 20', '1.2e−6']].forEach(([a1, a2], k) => { const q = P(S, 1, 4 + k * 0.8); txt(a1 + '   ' + a2, 1350, 690 + k * 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); });
    chip(1350, 870, 600, 52, 'still holds depth n and depth 0', C.red, P(S, 1, 9.5), 22);
  }
};

/* ---- 08 PARITY ---- */
SCENES.parity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), K = 4;
  const sets = []; for (let m = 0; m < 16; m++) sets.push([0, 1, 2, 3].map(i => (m >> i) & 1));
  const ev = sets.filter(b => b.reduce((a, c) => a + c) % 2 === 0), od = sets.filter(b => b.reduce((a, c) => a + c) % 2 === 1);
  [[ev, 'even number of defects', C.cyan, 520], [od, 'odd number of defects', C.mag, 1400]].forEach(([L, nm, col, x], k) => {
    const q = P(S, 0, k ? 7 : 3.5);
    txt(nm, x, 240, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    L.forEach((b, r) => b.forEach((v, i) => { const xx = x - 90 + i * 60, yy = 290 + r * 46; box(xx - 18, yy - 18, 36, 36, v ? C.red : col, q * (v ? 1 : 0.4), 1.5, v ? 'rgba(80,0,10,0.5)' : null); }));
  });
  const l = P(S, 1, 0.3);
  chip(960, 470, 440, 60, 'all marginals below K agree', C.white, l, 22);
  eqn('E_even[ν] = n / 2^(K−1)', 520, 720, P(S, 1, 6), C.cyan, 28);
  eqn('E_odd[ν] = 0', 1400, 720, P(S, 1, 8.5), C.mag, 28);
  txt('at n = 10, K = 21:  10 / 2²⁰ = 5 / 524288', 960, 800, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 10) });
};

/* ---- 09 QUERY ---- */
SCENES.query = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0);
  if (fade > 0) {
    chip(960, 230, 640, 56, 'reply ∈ { α, β, branch, absent }', C.white, s0 * fade, 24);
    const rows = [['L', 'branch', 'β'], ['R', 'β', 'branch'], ['LL', 'β', 'absent'], ['LR', 'α', 'absent'], ['RL', 'absent', 'α'], ['RR', 'absent', 'β']];
    txt('suffix', 640, 320, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 * fade }); txt('B', 860, 320, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 * fade }); txt('D', 1080, 320, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: s0 * fade });
    rows.forEach((r, k) => { const q = P(S, 0, 6 + k * 0.5) * fade, y = 370 + k * 56; txt(r[0], 640, y, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(r[1], 860, y, { size: 24, fam: FG, w: 700, align: 'center', c: C.cyan, a: q }); txt(r[2], 1080, y, { size: 24, fam: FG, w: 700, align: 'center', c: C.mag, a: q }); });
    chip(1450, 520, 360, 60, 'six addresses differ', C.gold, P(S, 0, 9.5) * fade, 22);
  }
  const l = P(S, 1, 0.3);
  if (l > 0) {
    const fix = Math.min(3, Math.floor((u - lineAt(S, 1).s - 2) / 2.5) + 1);
    const v = v3(700, 500, 220, 0.6 + t * 0.2, 0.4, [0.5, 0.5, 0.5]); const pts = []; for (let m = 0; m < 8; m++) pts.push(v(m & 1, (m >> 1) & 1, (m >> 2) & 1));
    const ok = m => (fix < 1 || (m & 1) === 0) && (fix < 2 || ((m >> 1) & 1) === 0) && (fix < 3 || ((m >> 2) & 1) === 0);
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = i ^ j; if (d === 1 || d === 2 || d === 4) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], ok(i) && ok(j) ? C.gold : C.dim, l * (ok(i) && ok(j) ? 1 : 0.35), ok(i) && ok(j) ? 3 : 1.5); }
    pts.forEach((p, m) => dot(p[0], p[1], ok(m) ? 12 : 7, ok(m) ? 'g' : 'w', l * (ok(m) ? 1 : 0.4)));
    const cnt = [8, 4, 2, 1][Math.max(0, fix)];
    txt('hit supports: ' + Math.max(0, fix) + '   consistent: ' + cnt, 700, 800, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: l });
    eqn('|𝓕(h)| = 2^(K − |H(h)|)', 1400, 450, P(S, 1, 6.5), C.gold, 32);
    txt('each hit fixes one bit and cuts a face', 1400, 520, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) });
  }
};

/* ---- 10 TWENTYONE ---- */
SCENES.twentyone = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), K = 21, read = Math.min(K, Math.max(0, Math.floor((u - lineAt(S, 0).s - 1) * 2.2)));
  for (let i = 0; i < K; i++) { const x = 300 + (i % 11) * 120, y = 300 + Math.floor(i / 11) * 130, done = i < read; box(x - 45, y - 45, 90, 90, done ? C.green : C.red, s0, 2, done ? 'rgba(0,40,20,0.5)' : 'rgba(60,0,10,0.35)'); txt(done ? '✓' : '?', x, y + 14, { size: 36, fam: FG, w: 700, align: 'center', c: done ? C.green : C.red, a: s0 }); }
  txt('reads: ' + read + ' / 21', 960, 520, { size: 30, fam: F.mono, w: 700, align: 'center', c: read === K ? C.green : C.white, a: s0 });
  txt('every unread position still hides a counterexample', 960, 570, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 4) * (read < K ? 1 : 0.25) });
  const l = P(S, 1, 0.3);
  chip(600, 680, 520, 60, 'one defect found → ν = 0', C.red, l, 24);
  chip(1320, 680, 520, 60, 'no defect → all 21 read', C.green, P(S, 1, 1.5), 24);
  eqn('21 ≤ C_word(T₁₀) ≤ 34', 960, 800, P(S, 1, 5), C.gold, 32);
  txt('endpoints not yet shown equal', 960, 850, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 9.5) });
};

/* ---- 11 RANDOM ---- */
SCENES.random = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), x0 = 340, y0 = 760, w = 700, h = 420;
  plotAxes(x0, y0, w, h, s0, 'q (supports checked)', 'success');
  const Y = p => y0 - (p - 0.4) / 0.6 * h;
  dashed(x0, Y(0.5), x0 + w, Y(0.5), C.dim, s0 * 0.6, 1.5); txt('1/2', x0 - 14, Y(0.5) + 8, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: s0 });
  txt('1', x0 - 14, Y(1) + 8, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: s0 });
  const q = P(S, 0, 7.5);
  curve(s => [x0 + s * w, Y(0.5 + s / 2)], 30, C.cyan, q, 3.5);
  txt('K = 21', x0 + w - 40, Y(1) - 20, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
  eqn('P*_succ(q) = 1/2 + q / 2K', 1400, 330, P(S, 0, 9.6), C.cyan, 30);
  eqn('error ≤ δ  ⟹  q ≥ (1 − 2δ) K', 1400, 410, P(S, 1, 0.3), C.gold, 28);
  const l = P(S, 1, 6.7);
  eqn('D(t) = Σ_p (𝒜_{i_p}(t) − 𝒜_{i_p}(T_n)) = |A|', 1400, 560, l, C.white, 24);
  eqn('ν = n · 1{D = 0}', 1400, 620, l, C.green, 28);
  chip(1400, 720, 560, 56, 'a short formula is not a free input', C.red, P(S, 1, 9.5), 22);
};

/* ---- 12 QUANTUM ---- */
SCENES.quantum = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 4, 'classical']]);
  const s0 = clamp(u), fade = 1 - P(S, 1, 0.3) * 0.0;
  eqn('U_⟨s,t⟩ = U_s U_t', 560, 250, s0, C.white, 30);
  eqn('(U_a U_b) U_c = U_a (U_b U_c)', 560, 320, P(S, 0, 4.5), C.cyan, 26);
  draw43(B43, 420, 400, 140, 120, P(S, 0, 6), { r: 10, maxSp: 70, maxLh: 60 }); draw43(D43, 700, 400, 140, 120, P(S, 0, 6), { r: 10, maxSp: 70, maxLh: 60 });
  txt('=  same operator', 560, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 8) });
  chip(560, 680, 600, 56, 'no experiment can tell them apart', C.red, P(S, 0, 9.8), 22);
  const l = P(S, 1, 0.3);
  if (l > 0) {
    eqn('O_A |p, b⟩ = |p, b ⊕ 1{p ∈ A}⟩', 1400, 250, l, C.gold, 26);
    const K = 21, th = Math.asin(1 / Math.sqrt(K)), x0 = 1110, yb = 700;
    for (let qq = 0; qq <= 6; qq++) { const pr = Math.sin((2 * qq + 1) * th) ** 2, q2 = P(S, 1, 4.5 + qq * 0.6); fillBox(x0 + qq * 90, yb - pr * 340, 60, pr * 340, qq === 3 ? C.green : C.cyan, q2 * 0.8); txt(String(qq), x0 + qq * 90 + 30, yb + 26, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q2 }); }
    txt('sin²((2q+1)θ),  sin θ = 1/√21', 1400, 330, { size: 22, fam: FG, w: 700, align: 'center', c: C.white, a: P(S, 1, 4) });
    txt('q = 3 → 0.999', 1400, 780, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 9.8) });
  }
};

/* ---- 13 RECORDS ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const v = v3(560, 470, 220, 0.6 + t * 0.15, 0.4, [0.5, 0.5, 0.5]); const pts = []; for (let m = 0; m < 8; m++) pts.push(v(m & 1, (m >> 1) & 1, (m >> 2) & 1));
  const shr = Math.min(3, Math.floor((u - lineAt(S, 0).s - 2) / 2));
  const ok = m => (shr < 1 || (m & 1) === 0) && (shr < 2 || ((m >> 1) & 1) === 0) && (shr < 3 || ((m >> 2) & 1) === 0);
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = i ^ j; if (d === 1 || d === 2 || d === 4) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], ok(i) && ok(j) ? C.cyan : C.dim, s0 * (ok(i) && ok(j) ? 0.9 : 0.3), 2); }
  pts.forEach((p, m) => dot(p[0], p[1], m === 0 ? 16 : 9, m === 0 ? 'g' : ok(m) ? 'c' : 'w', s0 * (ok(m) ? 1 : 0.3)));
  txt('the true source stays put', 560, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  txt('the consistent set shrinks', 560, 760, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  const l = P(S, 1, 0.3);
  if (l > 0) {
    for (let r = 0; r <= 5; r++) { const pr = Math.pow(2, -r), q = P(S, 1, 4.8 + r * 0.6); fillBox(1100 + r * 100, 680 - pr * 360, 70, pr * 360, C.green, q * 0.8); txt('r=' + r, 1135 + r * 100, 710, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); }
    eqn('Pr(A = ∅ | clean so far) = 2^(−r)', 1350, 260, l, C.green, 26);
    chip(1350, 800, 640, 56, 'probably right ≠ holding a certificate', C.red, P(S, 1, 9), 22);
  }
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['BRACKETS', 'K_n = F(n−2) positions', C.cyan], ['CUBE', 'orthogonal area moves', C.gold], ['COST', 'K reads for one bit', C.mag]];
    items.forEach(([a1, a2, col], i) => { const x = 420 + i * 540, q = P(S, 0, [0.3, 3.6, 6.5][i]) * fade; box(x - 240, 250, 480, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 315, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 365, { size: 22, fam: FG, w: 700, align: 'center', c: C.white, a: q }); });
    txt('LEAN · ActualTreeReadoutAcquisition.source_foundation · one-step image law', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.3) * fade });
    txt('VOLUME · defect family · ancestor cube · query bounds · success formula', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 3.5) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 10.8) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    const Lt = draw43(T43[7], W / 2, 250, 900, 260, a * 0.9, { r: 6, maxLh: 40, noInner: true, ea: 0.4 });
    POS43(7).forEach(p => hl43(Lt, p, C.mag, a * 0.8, 7));
    txt('AURIC FIB ATOM PYRAMID XIV', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XIV · 祖先立方体与取得代价 · TRURETURING FILM 043', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One bit of answer, twenty-one pieces of evidence.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'ONE BIT, MANY READS', bracket: 'SAME WORD, OTHER BRACKETS', obstruction: 'THE LEFT ALPHA', family: 'INDEPENDENT POSITIONS', depth: 'THE JOINT CONDITION', cube: 'THE ANCESTOR CUBE', shrink: 'CLOSE IS NOT EQUAL', parity: 'ALL LOW ORDERS AGREE', query: 'SIX ADDRESSES', twentyone: 'TWENTY-ONE READS', random: 'NO FREE SHORTCUT', quantum: 'SAME OPERATOR', records: 'THE SET SHRINKS', finale: 'LEDGER' });

function poster43() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const L = draw43(T43[9], 640, 250, 980, 440, 1, { r: 6, maxLh: 52, noInner: true, ea: 0.45 });
  const P9 = POS43(9); P9.forEach((p, i) => hl43(L, p, i % 4 === 1 ? C.red : C.mag, 0.95, 7));
  txt('55 leaves · 13 positions · 2¹³ trees', 640, 760, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag });
  txt('K_n = F(n − 2)', 1450, 330, { size: 40, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('ν = n · ∏ (1 − ε_p)', 1450, 420, { size: 38, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('‖Δ𝒜‖² = 2 |A △ A′|', 1450, 510, { size: 36, fam: FG, w: 700, align: 'center', c: C.white });
  txt('21 ≤ C(T₁₀) ≤ 34', 1450, 600, { size: 38, fam: FG, w: 700, align: 'center', c: C.green });
  txt('FIB 原子金字塔 XIV', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XIV', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('一 个 比 特 的 答 案 · 二 十 一 份 证 据', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 043', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster43;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
