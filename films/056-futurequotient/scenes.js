/* Film 056 */

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

/* ---- film 056: dynamic future quotient and future-closed memory ---- */
const _po56 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po56.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po56.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect56(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
function mat56(M, x, y, cw, ch, a, col, size = 22) { mgrid(x, y, M, cw, ch, a, { colf: () => col, size }); }
function ell56(x, y, rx, ry, col, a, lw = 2) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
function let56(i) { const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return (x - Math.floor(x)) < 0.4 ? 'a' : 'b'; }
function glyph56(ch, x, y, a, size = 30) { lblG(ch === 'a' ? 'α' : 'β', x, y, ch === 'a' ? C.cyan : C.gold, a, size); }
function word56(w, x, y, sp, a, size = 30) { [...w].forEach((ch, i) => glyph56(ch, x + (i - (w.length - 1) / 2) * sp, y, a, size)); }
function fan56(x, y, d, sp, a) { if (d === 0 || a <= 0) return; [['a', -1], ['b', 1]].forEach(([ch, s]) => { const nx = x + s * sp, ny = y + 62; line(x, y, nx, ny, ch === 'a' ? C.cyan : C.gold, a, 2); dot(nx, ny, 5, ch === 'a' ? 'c' : 'o', a); fan56(nx, ny, d - 1, sp * 0.5, a); }); }
function post56(A, B) { const w1 = Math.pow(1 / 3, A) * Math.pow(2 / 3, B), w2 = Math.pow(2 / 5, A) * Math.pow(3 / 5, B); return w1 / (w1 + w2); }
const FIB56 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
/* occupancy coordinates (X, Y, Z): X = position 1 ([2]), Y = position 3 ([5]), Z = position 2 ([3], apex) */
const MODES56 = [['0', [0, 0, 0], 'n'], ['[2]', [1, 0, 0], 'c'], ['[3]', [0, 0, 1], 'g'], ['[5]', [0, 1, 0], 'o'], ['[25]', [1, 1, 0], 'm']];
const PEDGE56 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
function pyr56(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES56.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE56.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.8, 1.8));
  if (opt.labels !== false) MODES56.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(m[0], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -20 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return W3;
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2), rate = 1.6, nf = t * rate, n = Math.floor(nf), fr = nf - n, x0 = 300, y0 = 420;
  box(x0 - 40, y0 - 62, 920, 112, C.cyan, s0 * 0.8, 1.5, 'rgba(0,0,0,0.45)');
  lbl('paid reads →', x0 - 30, y0 - 80, C.dim, s0, 18, 'left');
  for (let j = 0; j < 12; j++) { const i = n - 11 + j; if (i < 0) continue; const x = x0 + 30 + (j - fr) * 74; if (x < x0 - 10) continue; glyph56(let56(i), x, y0 + 12, s0 * (j === 11 ? fr : 1) * clamp((x - x0 + 10) / 60), 40); }
  let A = 0, B = 0; for (let i = 0; i < n; i++) { if (let56(i) === 'a') A++; else B++; }
  chip(540, 580, 260, 64, 'A = ' + A, C.cyan, s0, 28); chip(860, 580, 260, 64, 'B = ' + B, C.gold, s0, 28);
  [['history of reads', 'a history of reads', C.white], ['its future law', 'its future law', C.cyan], ['smallest exact memory', 'the smallest memory', C.mag]].forEach(([s, ph, col], i) => chip(1480, 340 + i * 90, 470, 62, s, col, Q(S, 0, ph), 24));
  lblG('forget the order  ·  keep the counts', 960, 760, C.gold, Q(S, 1, 'Forget the order', 0.6), 44);
  chip(760, 850, 300, 58, 'safe', C.green, Q(S, 1, 'which memories are safe'), 24); chip(1160, 850, 300, 58, 'not safe', C.red, Q(S, 1, 'which are not'), 24);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr56(W / 2, 400, 250, 0.5 + t * 0.25, rp, { fillBase: true, lab: 0.6 });
  for (let i = 0; i < 10; i++) { const an = t * 0.6 + i * Math.PI / 5; glyph56(i % 2 ? 'b' : 'a', W / 2 + 380 * Math.cos(an), 420 + 110 * Math.sin(an), rp * (0.55 + 0.45 * Math.sin(an)), 30); }
  txt(scramble('AURIC FIB ATOM PYRAMID XXVII', rp, 456), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXVII · 动 态 未 来 商 与 未 来 闭 合 记 忆', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 056 · AURIC_FIB_ATOM_DYNAMIC_FUTURE_QUOTIENT_AND_FUTURE_CLOSED_MEMORY', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 READS ---- */
SCENES.reads = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), bx = 480, bw = 640, fr = ['1/3', '2/5', '3/8', '5/13', '8/21', '13/34'], sf = ['2/3', '3/5', '5/8', '8/13', '13/21', '21/34'];
  const hk = Q(S, 0, 'is drawn once', 0.6);
  for (let k = 1; k <= 6; k++) {
    const y = 330 + (k - 1) * 78, r = FIB56[k + 1] / FIB56[k + 3], q = Q(S, 0, 'every paid read', 0.5, (k - 1) * 0.25), hot = k === 2;
    chip(340, y, 130, 52, 'k = ' + k, hot ? C.mag : C.dim, s0, 22);
    fillBox(bx, y - 24, bw * r, 48, C.cyan, q * 0.35); fillBox(bx + bw * r, y - 24, bw * (1 - r), 48, C.gold, q * 0.25);
    rect56(bx, y - 24, bw, 48, C.dim, q, 1.2);
    lblG('α ' + fr[k - 1], bx + bw * r / 2, y + 8, C.white, q, 20); lblG('β ' + sf[k - 1], bx + bw * r + bw * (1 - r) / 2, y + 8, C.white, q, 20);
  }
  if (hk > 0) { arrow(230, 408, 268, 408, C.mag, hk, 3); lbl('hidden', 200, 414, C.mag, hk, 18, 'right'); }
  eqn('r_k = F_(k+1) / F_(k+3)', 1540, 360, Q(S, 0, 'with probability r k'), C.cyan, 28);
  eqn('s_k = F_(k+2) / F_(k+3)', 1540, 440, Q(S, 0, 'beta with probability'), C.gold, 28);
  eqn('r_k + s_k = 1', 1540, 520, Q(S, 0, 'beta with probability', 0.6, 0.8), C.white, 26);
  const lq = Q(S, 1, 'tends to phi', 0.6);
  if (lq > 0) { const x = bx + bw * 0.381966; dashed(x, 290, x, 790, C.mag, lq, 2.5); lbl('φ⁻²', x, 280, C.mag, lq, 22); chip(1540, 620, 420, 58, 'r_k → φ⁻² ≈ 0.382', C.mag, lq, 26); }
  const hq = Q(S, 1, 'A history is a word', 0.6);
  word56('βαββααβ'.replace(/α/g, 'a').replace(/β/g, 'b'), 760, 870, 62, hq, 36);
  chip(1300, 860, 220, 54, 'phase', C.green, Q(S, 1, 'with a phase'), 22); chip(1600, 860, 320, 54, 'terminal label', C.orange, Q(S, 1, 'a terminal label'), 22);
};

/* ---- 03 QUOTIENT ---- */
SCENES.quotient = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The order of the letters', 0.6);
  if (f1 > 0) {
    [['abbab', 560], ['bbaab', 1360]].forEach(([w, x], i) => { const q = (i ? Q(S, 0, 'Call two histories', 0.6) : s0) * f1; word56(w, x, 330, 64, q, 38); chip(x, 400, 340, 52, 'a ,  A = 2 ,  B = 3', C.white, q, 22); fan56(x, 470, 3, 150, Q(S, 0, 'complete future laws agree', 0.8) * f1); });
    lbl('later letters · pending stop · delivered end', 960, 760, C.dim, Q(S, 0, 'down to every later letter', 0.6) * f1, 20);
    eqn('L_h = L_h′   ⟺   (a, A, B) = (a′, A′, B′)', 960, 850, Q(S, 0, 'exactly when they share') * f1, C.gold, 32);
  }
  const q = Q(S, 1, 'The order of the letters', 0.6, 0.3);
  if (q > 0) {
    const perms = [[0, 1, 2, 3, 4], [3, 0, 4, 1, 2], [4, 2, 0, 3, 1], [1, 4, 3, 2, 0]], ph = t / 1.4, k0 = Math.floor(ph) % 4, k1 = (k0 + 1) % 4, e = clamp((ph - Math.floor(ph)) * 2.2), sm = e * e * (3 - 2 * e);
    lbl('order forgotten', 560, 320, C.dim, q, 22);
    'aabbb'.split('').forEach((ch, i) => { const p0 = perms[k0][i], p1 = perms[k1][i], p = p0 + (p1 - p0) * sm, x = 560 + (p - 2) * 80, yy = 420 - Math.sin(Math.PI * sm) * 40 * (p1 > p0 ? 1 : -1) * (p0 === p1 ? 0 : 1); glyph56(ch, x, yy, q, 44); });
    chip(450, 540, 200, 58, 'A = 2', C.cyan, Q(S, 1, 'the counts are not'), 26); chip(670, 540, 200, 58, 'B = 3', C.gold, Q(S, 1, 'the counts are not'), 26);
    lbl('counts kept', 560, 620, C.green, Q(S, 1, 'the counts are not'), 22);
    eqn('(r_i / r_j)^u · (s_i / s_j)^v = 1   ⟺   u = v = 0', 1380, 320, Q(S, 1, 'The reason is arithmetic'), C.white, 24);
    const gq = Q(S, 1, 'We checked every pair', 2.4), nlit = Math.floor(gq * 780), gx = 1200, gy = 380, cs = 9;
    let c = 0;
    for (let j = 2; j <= 40; j++) for (let i = 1; i < j; i++) { const lit = c < nlit; fillBox(gx + (j - 1) * cs, gy + (i - 1) * cs, cs - 1.5, cs - 1.5, lit ? C.green : C.dim, (lit ? 0.85 : 0.15) * q); c++; }
    lbl('1 ≤ i < j ≤ 40', gx + 180, gy + 400, C.dim, q, 20);
    chip(gx + 180, gy + 460, 460, 56, nlit + ' / 780 pairs independent', C.green, gq > 0 ? q : 0, 22);
  }
};

/* ---- 04 MINIMAL ---- */
SCENES.minimal = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'lean'], [1, '', 'lean'], [2, '', 'theory']]);
  const s0 = clamp(u), f0 = 1 - Q(S, 1, 'Lean has also frozen', 0.6);
  if (f0 > 0) {
    const a = s0 * f0, P = [500, 360], Fl = [1420, 360], T = [960, 610];
    box(P[0] - 150, P[1] - 50, 300, 100, C.white, a, 2, 'rgba(0,0,0,0.5)'); lbl('past  h', P[0], P[1] + 8, C.white, a, 26);
    box(Fl[0] - 170, Fl[1] - 50, 340, 100, C.gold, a, 2, 'rgba(0,0,0,0.5)'); lbl('future law  L_h', Fl[0], Fl[1] + 8, C.gold, a, 26);
    const tq = Q(S, 0, 'any statistic of the past', 0.6) * f0;
    box(T[0] - 170, T[1] - 50, 340, 100, C.cyan, tq, 2, 'rgba(0,0,0,0.5)'); lbl('statistic  T(h)', T[0], T[1] + 8, C.cyan, tq, 26);
    arrow(P[0] + 155, P[1], Fl[0] - 175, Fl[1], C.gold, a, 3); lbl('futureLaw', 960, P[1] - 18, C.gold, a, 18);
    arrow(P[0] + 80, P[1] + 55, T[0] - 175, T[1] - 10, C.cyan, tq, 3);
    const fq = Q(S, 0, 'factors uniquely onto', 0.6) * f0;
    arrow(T[0] + 175, T[1] - 10, Fl[0] - 80, Fl[1] + 55, C.green, fq * (0.7 + 0.3 * Math.sin(t * 4)), 4); lbl('∃! factor', 1300, 560, C.green, fq, 24);
    eqn('L_h ≠ L_h′   ⟹   T(h) ≠ T(h′)', 960, 730, Q(S, 0, 'different future laws need') * f0, C.mag, 28);
    lbl('LEAN · PredictiveStateUniversalMinimality · CausalStateFactorization', 960, 820, C.green, Q(S, 0, 'Lean has frozen', 0.6) * f0, 18);
  }
  const g1 = Q(S, 1, 'Lean has also frozen', 0.6, 0.3) * (1 - Q(S, 2, 'Here the update is concrete', 0.6));
  if (g1 > 0) {
    ell56(620, 520, 170, 120, C.cyan, g1, 2.5); ell56(1300, 520, 170, 120, C.cyan, g1, 2.5);
    lbl('class of h', 620, 380, C.cyan, g1, 20); lbl('class of hx', 1300, 380, C.cyan, g1, 20);
    [[570, 480, 'h'], [670, 560, 'h′']].forEach(([x, y, s], i) => { dot(x, y, 10, 'w', g1); lbl(s, x - 26, y + 6, C.white, g1, 20, 'right'); const tx = x + 680, ty = y; const eq = Q(S, 1, 'extending one by a symbol', 0.6, i * 0.3); arrow(x + 14, y, tx - 14, ty, C.gold, eq, 2.5); dot(tx, ty, 10, 'o', eq); lbl(s + 'x', tx + 26, ty + 6, C.gold, eq, 20, 'left'); });
    lbl('x : positive probability', 960, 470, C.gold, Q(S, 1, 'positive probability'), 20);
    box(410, 700, 1100, 150, C.green, g1, 2, 'rgba(0,0,0,0.6)');
    lbl('LEAN · ContextUpdates.unifilar_predictive_update', 960, 745, C.green, g1, 20);
    lbl('histories identified by complete future law', 960, 785, C.white, Q(S, 1, 'identified by their complete future law', 0.5), 20);
    lbl('extension descends to a single-valued update', 960, 825, C.white, Q(S, 1, 'single-valued update', 0.5), 20);
  }
  const g2 = Q(S, 2, 'Here the update is concrete', 0.6, 0.3);
  if (g2 > 0) {
    eqn('σ(h · x) = U_x( σ(h) )', 960, 300, g2, C.white, 30);
    const Pn = [600, 430], Bn = [1320, 430], P0 = [600, 680], P1 = [1320, 680], D = [960, 840];
    chip(Pn[0], Pn[1], 300, 64, 'phase p  (A, B)', C.green, g2, 24); chip(Bn[0], Bn[1], 300, 64, 'phase β  (A, B)', C.green, g2, 24);
    const aq = Q(S, 2, 'Alpha adds one to A', 0.5), bq = Q(S, 2, 'beta adds one to B', 0.5), pq = Q(S, 2, 'or into a pending stop', 0.5);
    arrow(Pn[0] + 155, Pn[1] - 16, Bn[0] - 155, Bn[1] - 16, C.gold, bq, 3); lblG('β :  B + 1', 960, Pn[1] - 34, C.gold, bq, 22);
    arrow(Bn[0] - 155, Bn[1] + 16, Pn[0] + 155, Pn[1] + 16, C.cyan, aq, 3); lblG('α :  A + 1', 960, Pn[1] + 54, C.cyan, aq, 22);
    chip(P0[0], P0[1], 240, 58, 'pending₀', C.orange, pq, 24); chip(P1[0], P1[1], 240, 58, 'pending₁', C.orange, pq, 24);
    arrow(Pn[0], Pn[1] + 36, P0[0], P0[1] - 32, C.cyan, pq, 3); lblG('α :  A + 1', Pn[0] - 24, 560, C.cyan, pq, 20, 'right');
    arrow(Bn[0], Bn[1] + 36, P1[0], P1[1] - 32, C.gold, pq, 3); lblG('β :  B + 1', Bn[0] + 24, 560, C.gold, pq, 20, 'left');
    const dq = Q(S, 2, 'or into a pending stop', 0.6, 0.8);
    chip(D[0], D[1], 260, 58, 'delivered', C.red, dq, 24);
    arrow(P0[0] + 80, P0[1] + 32, D[0] - 130, D[1] - 12, C.orange, dq, 2.5); lbl('Stop₀', 700, 790, C.orange, dq, 20);
    arrow(P1[0] - 80, P1[1] + 32, D[0] + 130, D[1] - 12, C.orange, dq, 2.5); lbl('Stop₁', 1220, 790, C.orange, dq, 20);
    lbl('no Read after delivered', 1400, 846, C.dim, dq, 18, 'left');
  }
};

/* ---- 05 COLLISION ---- */
SCENES.collision = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  chip(960, 290, 560, 56, 'memory = length only', C.red, Q(S, 0, 'Remember only the length'), 24);
  const w1 = Q(S, 0, 'Five alphas and three betas', 0.6), w2 = Q(S, 0, 'three alphas and five betas', 0.6);
  word56('aaaaabbb', 700, 390, 60, w1, 36); lbl('(5, 3)', 240, 396, C.white, w1, 24, 'left');
  word56('aaabbbbb', 700, 470, 60, w2, 36); lbl('(3, 5)', 240, 476, C.white, w2, 24, 'left');
  const lq = Q(S, 0, 'both have length eight', 0.6);
  if (lq > 0) { line(1180, 380, 1180, 480, C.white, lq, 2); chip(1420, 430, 300, 58, 'A + B = 8', C.white, lq, 26); }
  const pq = Q(S, 1, 'With a uniform prior', 0.6);
  lbl('uniform prior on depths {1, 2}  →  posterior', 960, 570, C.dim, pq, 20);
  [[(5), 3, 640, w1], [3, 5, 740, w2]].forEach(([A, B, y], i) => {
    const v = post56(A, B), q = Q(S, 1, i ? 'the second' : 'the first leaves', 0.6), bx = 520, bw = 800;
    lbl('(' + A + ', ' + B + ')', bx - 40, y + 8, C.white, q, 22, 'right');
    fillBox(bx, y - 26, bw * v, 52, C.cyan, q * 0.4); fillBox(bx + bw * v, y - 26, bw * (1 - v), 52, C.mag, q * 0.3); rect56(bx, y - 26, bw, 52, C.dim, q, 1.2);
    lbl('k = 1 : ' + v.toFixed(3), bx + bw * v / 2, y + 8, C.white, q, 20); lbl('k = 2 : ' + (1 - v).toFixed(3), bx + bw * v + bw * (1 - v) / 2, y + 8, C.white, q, 20);
  });
  chip(1600, 640, 380, 56, 'different beliefs', C.cyan, Q(S, 1, 'different beliefs'), 24);
  chip(1600, 740, 380, 56, 'different futures', C.mag, Q(S, 1, 'different futures'), 24);
  lbl('same length, different future', 960, 850, C.gold, Q(S, 1, 'Same length'), 24);
};

/* ---- 06 INFINITE ---- */
SCENES.infinite = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), X0 = 300, Y0 = 790, sx = 60, sy = 62;
  plotAxes(X0, Y0, 12.5 * sx, 7.5 * sy, s0, 'A', 'B');
  for (let A = 0; A <= 12; A++) for (let B = 0; B <= 7; B++) dot(X0 + A * sx, Y0 - B * sy, 2.5, 'n', s0 * 0.7);
  for (let j = 0; j <= 4; j++) {
    const A = 2 * j + 3, q = j === 0 ? Q(S, 0, 'Put two more alphas', 0.5) : Q(S, 0, ['', 'counts five three', 'seven three', 'nine three', 'and on'][j], 0.5), x = X0 + A * sx, y = Y0 - 3 * sy;
    if (j > 0) arrow(x - 2 * sx + 14, y, x - 12, y, C.cyan, q, 2.5);
    dot(x, y, 11, j ? 'c' : 'w', q); lbl('(' + A + ', 3)', x, y + 40, C.white, q, 18); lbl(post56(A, 3).toFixed(3), x, y - 28, C.mag, Q(S, 0, 'a different posterior', 0.5, j * 0.15), 18);
  }
  lbl('posterior on depth 1 (uniform prior on {1, 2})', X0 + 380, Y0 - 7.5 * sy - 26, C.mag, Q(S, 0, 'a different posterior', 0.6), 18);
  const cq = Q(S, 1, 'With two or more possible depths', 0.6);
  chip(1520, 320, 560, 58, 'quotient infinite', C.white, cq, 24);
  chip(1520, 400, 560, 58, 'pigeonhole : no finite memory', C.red, Q(S, 1, 'by the pigeonhole principle'), 22);
  chip(1520, 480, 560, 58, 'finite-dimensional : (a, A, B)', C.green, Q(S, 1, 'finite-dimensional'), 22);
  chip(1520, 560, 560, 58, 'not finite-state', C.red, Q(S, 1, 'but not finite-state'), 24);
  const sq = Q(S, 1, 'A static escape is a segment', 0.6), dq = Q(S, 1, 'a dynamic escape', 0.6);
  if (sq > 0) { line(1300, 680, 1500, 680, C.mag, sq, 5); dot(1300 + 100 + 90 * Math.sin(t * 1.5), 680, 9, 'm', sq); lbl('static : κ segment', 1400, 730, C.mag, sq, 20); }
  if (dq > 0) { for (let a = 0; a < 5; a++) for (let b = 0; b < 3; b++) dot(1600 + a * 36, 650 + b * 30, 4, 'c', dq); lbl('· · ·', 1800, 690, C.cyan, dq, 22, 'left'); lbl('dynamic : ℕ² × {p, β}', 1690, 760, C.cyan, dq, 20); }
};

/* ---- 07 SINGLETON ---- */
SCENES.singleton = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u), bx = 360, by = 700;
  chip(620, 300, 440, 58, 'depth known :  μ = δ₃', C.mag, Q(S, 0, 'If the depth is known'), 24);
  const pq = Q(S, 0, 'the posterior never moves', 0.6);
  plotAxes(bx, by, 560, 300, s0, 'k', 'posterior');
  for (let k = 1; k <= 5; k++) { const h = k === 3 ? 260 : 0, x = bx + 30 + (k - 1) * 105; fillBox(x, by - h, 70, h, C.mag, pq * 0.45); rect56(x, by - Math.max(h, 2), 70, Math.max(h, 2), C.mag, pq, 2); lbl(String(k), x + 35, by + 30, C.dim, s0, 18); }
  const A = Math.floor(t * 1.3) % 9 + 1, B = Math.floor(t * 0.9) % 7 + 1, cq = Q(S, 0, 'different counts give the same law', 0.6);
  chip(500, 820, 220, 54, 'A = ' + A, C.cyan, cq, 24); chip(760, 820, 220, 54, 'B = ' + B, C.gold, cq, 24);
  lbl('any counts → same law', 630, 885, C.white, cq, 20);
  lbl('what remains', 1440, 300, C.dim, Q(S, 0, 'Only phase and the terminal labels'), 20);
  chip(1440, 380, 440, 58, 'phase', C.green, Q(S, 0, 'Only phase'), 24);
  chip(1440, 470, 440, 58, 'pending₀ → Stop₀', C.orange, Q(S, 0, 'pending zero and pending one'), 24);
  chip(1440, 560, 440, 58, 'pending₁ → Stop₁', C.orange, Q(S, 0, 'pending zero and pending one', 0.5, 0.4), 24);
  chip(1440, 650, 440, 58, 'delivered → ε', C.red, Q(S, 0, 'delivered has nothing left'), 24);
};

/* ---- 08 FORGETTING ---- */
SCENES.forgetting = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'In this model the volume defines', 0.6);
  if (f1 > 0) {
    eqn('T(h) = T(h′)   ⟹   L_h = L_h′', 960, 310, s0 * f1, C.white, 32);
    lbl('future-safe memory', 960, 360, C.dim, s0 * f1, 20);
    lbl('MAY FORGET', 560, 440, C.green, Q(S, 0, 'It may forget') * f1, 26);
    chip(560, 520, 420, 58, 'order of letters', C.green, Q(S, 0, 'the order of letters') * f1, 24);
    lbl('MAY NOT MERGE', 1340, 440, C.red, Q(S, 0, 'It may not merge') * f1, 26);
    [['different (A, B)', 'different counts'], ['pending₀  |  pending₁', 'pending zero with pending one'], ['active  |  delivered', 'active with delivered'], ['different κ  when  J_L ≠ 0', 'different kappa']].forEach(([s, ph], i) => chip(1340, 520 + i * 80, 520, 58, s, C.red, Q(S, 0, ph) * f1, 22));
    const sw = Q(S, 0, 'the order of letters', 0.6) * f1;
    if (sw > 0) { const e = 0.5 + 0.5 * Math.sin(t * 2.2); ['a', 'b', 'b', 'a'].forEach((ch, i) => { const p = i === 1 ? 1 + e : i === 2 ? 2 - e : i; glyph56(ch, 470 + p * 60, 640, sw, 34); }); }
  }
  const q = Q(S, 1, 'In this model the volume defines', 0.6, 0.3);
  if (q > 0) {
    lbl('direction of time  :=', 960, 330, C.gold, q, 30);
    chip(560, 480, 460, 70, 'forgettable details', C.green, Q(S, 1, 'forgettable details'), 26);
    chip(1360, 480, 460, 70, 'distinctions kept', C.red, Q(S, 1, 'distinctions that must be kept'), 26);
    const aq = Q(S, 1, 'the order between', 0.6); arrow(800, 480, 1120, 480, C.gold, aq, 4); lbl('≼', 960, 460, C.gold, aq, 30);
    for (let i = 0; i < 6; i++) { const x = 420 + i * 55, y = 600 + 20 * Math.sin(t * 2 + i); glyph56(let56(i + 7), x, y, q * (0.4 + 0.6 * (1 - i / 6)), 30); }
    chip(1250, 600, 200, 52, 'A = 4', C.cyan, q, 22); chip(1470, 600, 200, 52, 'B = 2', C.gold, q, 22);
    lbl('a definition inside the model', 960, 760, C.white, Q(S, 1, 'a definition inside the model'), 26);
    lbl('not a theorem about physical time', 960, 820, C.dim, Q(S, 1, 'not a theorem about physical time'), 24);
  }
};

/* ---- 09 ALGEBRA ---- */
SCENES.algebra = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'The means X, Y and Z', 0.6);
  if (f1 > 0) {
    eqn('𝒜 = ℝ[x, y, z] / ( x² − x , y² − y , z² − z , xz , yz )', 960, 320, Q(S, 0, 'The five states form an algebra') * f1, C.white, 28);
    ['1', 'x', 'y', 'z', 'xy'].forEach((b, i) => chip(640 + i * 160, 410, 120, 56, b, i === 4 ? C.mag : C.cyan, Q(S, 0, 'Its basis is one', 0.4, i * 0.15) * f1, 26));
    const tq = Q(S, 0, 'Its basis is one', 0.6, 1.0) * f1;
    [['e_null = 1 − x − y − z + xy', C.dim], ['e₁ = x − xy', C.cyan], ['e₂ = z', C.green], ['e₃ = y − xy', C.gold], ['e₁₃ = xy', C.mag]].forEach(([s, col], i) => lbl(s, 360, 540 + i * 64, col, tq, 22, 'left'));
    ['∅', '[2]', '[3]', '[5]', '[2,5]'].forEach((h, j) => lbl(h, 1110 + j * 110, 495, C.dim, tq, 18));
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) lbl(i === j ? '1' : '0', 1110 + j * 110, 540 + i * 64, i === j ? C.green : C.dim, tq, 24);
  }
  const q = Q(S, 1, 'The means X, Y and Z', 0.6, 0.3);
  if (q > 0) {
    const X = 0.4, Y = 0.35, Z = 0.15, k = 0.175 + 0.165 * Math.sin(t * 0.9), p = [1 - X - Y - Z + k, X - k, Z, Y - k, k], nm = ['∅', '[2]', '[3]', '[5]', '[2,5]'], cols = [C.dim, C.cyan, C.green, C.gold, C.mag], dv = ['+1', '−1', '0', '−1', '+1'];
    p.forEach((v, i) => { const x = 360 + i * 140, h = v * 700; fillBox(x, 700 - h, 90, h, cols[i], q * 0.45); rect56(x, 700 - h, 90, Math.max(h, 1), cols[i], q, 2); lbl(nm[i], x + 45, 735, C.white, q, 20); lbl(dv[i], x + 45, 780, i === 2 ? C.dim : C.mag, Q(S, 1, 'in the direction one'), 22); });
    eqn('Π(p) = (X, Y, Z) = (0.40, 0.35, 0.15)', 1450, 340, q, C.white, 22);
    const sq = Q(S, 1, 'changes only kappa', 0.6);
    line(1180, 460, 1720, 460, C.dim, sq, 2); const xx = 1180 + k / 0.35 * 540; rect56(1180, 444, 540, 32, C.mag, sq, 2); dot(xx, 460, 12, 'm', sq);
    lbl('κ ∈ [0, 0.35]', 1450, 425, C.mag, sq, 22); lbl('κ = ' + k.toFixed(3), 1450, 520, C.mag, sq, 24);
    eqn('Cov(x, y) = κ − XY = ' + (k - X * Y).toFixed(3), 1450, 620, Q(S, 1, 'the covariance of the two ends'), C.gold, 26);
  }
};

/* ---- 10 READOUT ---- */
SCENES.readout = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory', 'theory']);
  const s0 = clamp(u), f0 = 1 - Q(S, 1, 'The quantity q equals', 0.6), f1 = 1 - Q(S, 2, 'Arithmetic still matters', 0.6);
  const corners = (cx, cy, s, vals, a, J) => { const P = [[cx - s, cy + s], [cx + s, cy + s], [cx - s, cy - s], [cx + s, cy - s]], nm = ['∅', '[2]', '[5]', '[2,5]'], sg = ['+', '−', '−', '+']; strokePoly([P[0], P[1], P[3], P[2]], C.cyan, a, 2); P.forEach((p, i) => { dot(p[0], p[1], 10, ['n', 'c', 'o', 'm'][i], a); lbl(nm[i] + (vals ? ' : ' + vals[i] : ''), p[0], p[1] + (i < 2 ? 44 : -24), C.white, a, 20); lbl(sg[i], p[0] + (i % 2 ? 28 : -28), p[1] + 8, sg[i] === '+' ? C.green : C.red, a, 26); }); if (J != null) lbl('J = ' + J, cx, cy + 10, J ? C.green : C.red, a, 30); };
  if (f0 > 0) {
    eqn('f = f₀ + (f₁ − f₀)x + (f₃ − f₀)y + (f₂ − f₀)z + J_f · xy', 960, 320, s0 * f0, C.white, 26);
    eqn('J_f = f_null + f₁₃ − f₁ − f₃', 960, 400, Q(S, 0, 'Its x y coefficient is J f') * f0, C.mag, 30);
    corners(700, 640, 130, null, Q(S, 0, 'Its x y coefficient is J f', 0.6, 0.6) * f0, null);
    chip(1380, 600, 520, 62, 'E f recovers κ  ⟺  J_f ≠ 0', C.green, Q(S, 0, 'recovers kappa exactly when') * f0, 26);
    lbl('given X, Y, Z', 1380, 680, C.dim, Q(S, 0, 'given the three means') * f0, 20);
  }
  const g1 = Q(S, 1, 'The quantity q equals', 0.6, 0.3) * f1;
  if (g1 > 0) {
    eqn('q = 2x + 5y + 3z', 560, 320, g1, C.white, 28);
    corners(560, 590, 130, [0, 2, 5, 7], Q(S, 1, 'has J equal to zero', 0.6) * f1, 0);
    chip(560, 840, 260, 54, 'blind', C.red, Q(S, 1, 'it is blind') * f1, 24);
    eqn('q² = 4x + 25y + 9z + 20xy', 1360, 320, Q(S, 1, 'Its square has') * f1, C.white, 28);
    corners(1360, 590, 130, [0, 4, 25, 49], Q(S, 1, 'Its square has', 0.6) * f1, 20);
    eqn('κ = ( E q² − 4X − 25Y − 9Z ) / 20', 1360, 840, Q(S, 1, 'so kappa equals') * f1, C.mag, 26);
  }
  const g2 = Q(S, 2, 'Arithmetic still matters', 0.6, 0.3);
  if (g2 > 0) {
    const cx = 620, cy = 590, R = 210;
    ring(cx, cy, R, C.dim, g2, 2);
    for (let i = 0; i < 72; i++) { const an = -Math.PI / 2 + i * Math.PI / 36, r2 = i % 6 ? R - 8 : R - 18; line(cx + R * Math.cos(an), cy + R * Math.sin(an), cx + r2 * Math.cos(an), cy + r2 * Math.sin(an), C.dim, g2, 1.5); }
    lbl('ℤ / 5040', cx, cy + 8, C.dim, g2, 24);
    const n = 37, v = (20 * n) % 5040, an = -Math.PI / 2 + v / 5040 * 2 * Math.PI, iq = Q(S, 2, 'look identical', 0.6);
    dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 14, 'm', iq);
    lbl('20n ≡ 20(n + 252)', cx + R * Math.cos(an) + 24, cy + R * Math.sin(an) - 14, C.mag, iq, 20, 'left');
    eqn('gcd(5040, 20) = 20', 1380, 360, Q(S, 2, 'twenty is not invertible'), C.red, 30);
    eqn('20 · 252 = 5040', 1380, 440, Q(S, 2, 'twenty is not invertible', 0.6, 0.6), C.white, 28);
    chip(1380, 540, 560, 58, 'n  and  n + 252  look identical', C.mag, iq, 22);
    chip(1380, 660, 560, 58, 'mod m :  need gcd(J_f, m) = 1', C.green, Q(S, 2, 'coprime to m'), 22);
  }
};

/* ---- 11 MEMORY ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'For one window', 0.6);
  if (f1 > 0) {
    const cx = 620, cy = 590, cq = Q(S, 0, 'Close the recorded functions', 0.8) * f1;
    ell56(cx, cy, 300 * (0.7 + 0.3 * cq), 220 * (0.7 + 0.3 * cq), C.mag, cq, 3);
    fillPoly(ringPts(cx, cy, 140, 40), C.cyan, s0 * f1 * 0.15); ring(cx, cy, 140, C.cyan, s0 * f1, 3);
    lbl('V', cx, cy + 10, C.cyan, s0 * f1, 34); lbl('C(V)', cx + 230, cy - 170, C.mag, cq, 26);
    for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3 + t * 0.3; arrow(cx + 150 * Math.cos(an), cy + 150 * Math.sin(an), cx + (150 + 90 * cq) * Math.cos(an), cy + (150 + 70 * cq) * Math.sin(an), C.gold, cq, 2.5); }
    lbl('U_a', cx + 250, cy + 10, C.gold, cq, 22, 'left');
    eqn('C(V) = V + Σ_a U_a V', 1420, 380, cq, C.white, 30);
    eqn('extra memory  ≥  dim C(V) / V', 1420, 500, Q(S, 0, 'The minimal extra memory') * f1, C.mag, 28);
    lbl('equality at W = C(V)', 1420, 560, C.dim, Q(S, 0, 'The minimal extra memory', 0.6, 0.6) * f1, 20);
  }
  const q = Q(S, 1, 'For one window', 0.6, 0.3);
  if (q > 0) {
    ['system', 'record', 'hidden', 'extra'].forEach((h, j) => lbl(h, [430, 830, 1220, 1590][j], 320, C.dim, q, 20));
    const r1 = Q(S, 1, 'For one window', 0.5, 0.4), r2 = Q(S, 1, 'For six positions', 0.5);
    [['one window', '1, x, y, z', 'xy', '1 scalar : κ', r1], ['six positions', 'moments ≤ 2', '135 · 136 · 146 · 246', '4 directions', r2]].forEach(([a1, b1, c1, d1, qq], i) => { const y = 390 + i * 80; lbl(a1, 430, y, C.white, qq, 24); lbl(b1, 830, y, C.cyan, qq, 24); lbl(c1, 1220, y, C.mag, qq, 24); lbl(d1, 1590, y, C.green, qq, 24); });
    const tq = Q(S, 1, 'the triples with no two neighbours', 0.6), trip = [[1, 3, 5], [1, 3, 6], [1, 4, 6], [2, 4, 6]], cur = trip[Math.floor(t / 0.9) % 4];
    if (tq > 0) {
      for (let i = 1; i <= 6; i++) { const x = 560 + (i - 1) * 160, on = cur.includes(i); dot(x, 700, on ? 18 : 10, on ? 'm' : 'n', tq); lbl(String(i), x, 760, on ? C.mag : C.dim, tq, 24); if (i < 6) line(x + 20, 700, x + 140, 700, C.dim, tq * 0.5, 1.5); }
      lbl(cur.join(''), 960, 830, C.mag, tq, 32);
      lbl('3-subsets of {1, …, 6} with no two adjacent', 960, 880, C.dim, tq, 20);
    }
  }
};

/* ---- 12 CONTRACTION ---- */
SCENES.contraction = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), X0 = 300, Y0 = 820, pw = 840, ph = 480, T = 30, ym = 6, px = tt => X0 + tt / T * pw, py = e => Y0 - Math.min(e, ym) / ym * ph;
  plotAxes(X0, Y0, pw, ph, s0, 't', 'E e_t');
  const cq = Q(S, 0, 'then it stays below', 2.0);
  curve(f => { const tt = f * T * cq; return [px(tt), py(Math.pow(0.8, tt) * 5 + 0.1 * (1 - Math.pow(0.8, tt)) / 0.2)]; }, 120, C.green, cq > 0 ? s0 : 0, 3.5);
  const lq = Q(S, 0, 'the limit is 0.5', 0.6);
  dashed(X0, py(0.5), X0 + pw, py(0.5), C.green, lq, 2); lbl('0.5', X0 - 14, py(0.5) + 6, C.green, lq, 18, 'right');
  lbl('5', X0 - 14, py(5) + 6, C.dim, s0, 18, 'right');
  eqn('E[ e_(t+1) | S_t ]  ≤  λ e_t + ε ,   λ < 1', 1500, 340, Q(S, 0, 'contracts by a factor lambda'), C.white, 24);
  eqn('E e_t  ≤  λᵗ e₀ + ε (1 − λᵗ) / (1 − λ)', 1500, 420, Q(S, 0, 'then it stays below'), C.gold, 24);
  chip(1500, 510, 520, 58, 'λ = 0.8 , ε = 0.1  →  0.5', C.green, lq, 24);
  const oq = Q(S, 1, 'The volume proposes', 0.6);
  if (oq > 0) {
    curve(f => { const tt = f * T; return [px(tt), py(5 + 0.1 * tt * 0)]; }, 40, C.white, oq * 0.7, 2.5);
    curve(f => { const tt = f * T; let e = 5; for (let i = 0; i < Math.floor(tt); i++) e = 1.05 * e + 0.1; return [px(tt), py(e)]; }, 60, C.red, oq * 0.7, 2.5);
    lbl('λ ≥ 1 : passive', px(9), py(5.5) + 8, C.red, oq, 18, 'left'); lbl('λ = 1 : critical', px(22), py(5) - 14, C.white, oq, 18, 'left'); lbl('λ < 1 : life ?', px(20), py(0.5) - 18, C.green, oq, 20, 'left');
  }
  chip(1500, 620, 560, 58, 'restore only what the future needs', C.cyan, Q(S, 1, 'only what the future still needs'), 22);
  chip(1500, 700, 560, 58, 'move against drift in relation space', C.cyan, Q(S, 1, 'against drift'), 22);
  stamp('OPEN MODEL', 1500, 820, Q(S, 1, 'These are model proposals', 0.6), C.vio, 50, -0.05);
};

/* ---- 13 GRAM ---- */
SCENES.gram = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), cx = 600, cy = 580, R = 200, P = ringPts(cx, cy, R, 5), r = 1 / 1.6180339887;
  const Phi = Math.PI * Math.sin(t * 0.45), eq = Q(S, 0, 'neighbour overlaps', 0.6);
  P.forEach((p, i) => { const q = P[(i + 1) % 5]; line(p[0], p[1], q[0], q[1], C.cyan, eq, 3); const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = mx - cx, dy = my - cy, dl = Math.hypot(dx, dy); lbl('r', mx + dx / dl * 26, my + dy / dl * 26 + 6, C.cyan, eq, 20); });
  P.forEach((p, i) => { dot(p[0], p[1], 14, 'w', s0); lbl('v' + (i + 1), p[0] + (p[0] - cx) * 0.22, p[1] + (p[1] - cy) * 0.22 + 6, C.white, s0, 20); });
  const hq = Q(S, 0, 'total phase Phi', 0.6);
  if (hq > 0) { const n = 40, a0 = -Math.PI / 2, a1 = a0 + 1.6 * Math.PI; curve(f => [cx + 80 * Math.cos(a0 + (a1 - a0) * f), cy + 80 * Math.sin(a0 + (a1 - a0) * f)], n, C.mag, hq, 3); const ae = a1; arrow(cx + 80 * Math.cos(ae - 0.15), cy + 80 * Math.sin(ae - 0.15), cx + 80 * Math.cos(ae), cy + 80 * Math.sin(ae), C.mag, hq, 3); lblG('Φ', cx, cy + 12, C.mag, hq, 40); }
  eqn('det G₅ = 1 − 5r² + 5r⁴ + 2r⁵ cos Φ', 1380, 330, Q(S, 0, 'the Gram determinant is'), C.gold, 28);
  const g1 = Q(S, 1, 'No single overlap sees Phi', 0.6);
  if (g1 > 0) {
    const bx = 1080, bw = 600, by = 560, sc = 500, dfun = ph_ => 1 - 5 * r * r + 5 * Math.pow(r, 4) + 2 * Math.pow(r, 5) * Math.cos(ph_);
    line(bx, by, bx + bw, by, C.dim, g1, 1.5); lbl('−π', bx, by + 30, C.dim, g1, 18); lbl('0', bx + bw / 2, by + 30, C.dim, g1, 18); lbl('π', bx + bw, by + 30, C.dim, g1, 18);
    lbl('det at r = 1/φ', bx + bw / 2, 440, C.white, g1, 20);
    curve(f => { const ph_ = -Math.PI + 2 * Math.PI * f; return [bx + bw * f, by - dfun(ph_) * sc]; }, 80, C.gold, g1, 3);
    const mx = bx + bw * (Phi + Math.PI) / (2 * Math.PI), d = dfun(Phi); dot(mx, by - d * sc, 10, 'm', g1);
    let lm = 9; for (let k = 0; k < 5; k++) lm = Math.min(lm, 1 + 2 * r * Math.cos(Phi / 5 + 2 * Math.PI * k / 5));
    const ok = lm > -1e-9;
    lbl('Φ = ' + Phi.toFixed(2) + '   λ_min = ' + lm.toFixed(3), bx + bw / 2, 740, ok ? C.green : C.red, g1, 22);
    lbl(ok ? 'realizable' : 'no five vectors', bx + bw / 2, 776, ok ? C.green : C.red, g1, 22);
    chip(960, 832, 720, 52, 'Φ = 0 : det 0, rank 3   ·   Φ = π : λ_min = 1 − 2/φ < 0', C.white, Q(S, 1, 'phase pi gives a negative'), 20);
    lbl('same local data · only the loop decides', 1380, 400, C.mag, Q(S, 1, 'Same local data'), 22);
  }
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['COUNTS', 'keep counts, not order', C.gold, 'Histories keep their counts'], ['QUOTIENT', 'infinite unless k known', C.mag, 'the quotient is infinite'], ['SAFE MEMORY', 'forget what no future sees', C.green, 'safe memory forgets'], ['CLOSURE', 'C(V) / V = needed memory', C.cyan, 'closure counts']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 26); lblG(a2, x, 350, C.white, q, 19); });
    lbl('LEAN · predictive_state_universal_minimality · causal_state_factorization · unifilar_predictive_update', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 17);
    lbl('VOLUME · count summary · infinite quotient · readout rule · memory closure · Gram cycle', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 18);
    lbl('OPEN MODEL · life reading      RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'the life reading is an open model') * fade, 21);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr56(W / 2, 360, 200, 0.5 + t * 0.2, a, { fillBase: true, lab: 0 });
    for (let i = 0; i < 8; i++) { const an = t * 0.6 + i * Math.PI / 4; glyph56(i % 2 ? 'b' : 'a', W / 2 + 300 * Math.cos(an), 380 + 90 * Math.sin(an), a * (0.5 + 0.5 * Math.sin(an)), 26); }
    txt('AURIC FIB ATOM PYRAMID XXVII', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXVII · 动态未来商与未来闭合记忆 · TRURETURING FILM 056', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('What the future still needs.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WHAT THE FUTURE NEEDS', reads: 'HIDDEN DEPTH, PAID READS', quotient: 'FUTURE EQUIVALENCE', minimal: 'MINIMAL AND RECURSIVE', collision: 'LENGTH COLLIDES', infinite: 'NO FINITE MEMORY', singleton: 'THE SHARP EXCEPTION', forgetting: 'SAFE FORGETTING', algebra: 'FIVE-STATE ALGEBRA', readout: 'THE INTERACTION COEFFICIENT', memory: 'FUTURE-CLOSED MEMORY', contraction: 'CONTRACTING ERROR', gram: 'THE GRAM CYCLE', finale: 'LEDGER' });

function poster56() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr56(560, 520, 340, 0.6, 1, { fillBase: true });
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6 + 0.3; glyph56(i % 3 === 1 ? 'a' : 'b', 560 + 400 * Math.cos(an), 540 + 140 * Math.sin(an), 0.55 + 0.45 * Math.sin(an), 34); }
  txt('same future ⟺ same counts', 1370, 300, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('(5, 3)  ≠  (3, 5)', 1370, 390, { size: 44, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('J_f ≠ 0  ⟹  κ', 1370, 480, { size: 42, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('memory = dim C(V)/V', 1370, 570, { size: 38, fam: FG, w: 700, align: 'center', c: C.green });
  txt('FIB 原子金字塔 XXVII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXVII', W / 2, 890, { size: 78, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('未 来 仍 然 需 要 什 么', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 056', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster56;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
