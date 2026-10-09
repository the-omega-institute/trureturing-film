/* Film 046 — AURIC FIB ATOM PYRAMID XVII: the direction of a forecast */

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


/* ---- film 046: the direction of a forecast ---- */
const _po46 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po46.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po46.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function frame46(x0, y0, w, h, xa, xb, ya, yb) { return (x, y) => [x0 + (x - xa) / (xb - xa) * w, y0 - (y - ya) / (yb - ya) * h]; }
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
const FB46 = (() => { const f = [0, 1]; for (let i = 0; i < 40; i++) f.push(f[f.length - 1] + f[f.length - 2]); return f; })();
const RK46 = k => FB46[k + 1] / FB46[k + 3];
const DP46 = 1116529 / 11390625, DB46 = 239 / 3375;
/* deterministic letter stream: alpha with probability 0.38 */
const STREAM46 = (() => { const s = []; for (let i = 0; i < 400; i++) s.push(rnd(i, 46) < 0.38 ? 'α' : 'β'); return s; })();
function letter46(ch, x, y, a, size = 30) { txt(ch, x, y, { size, fam: FG, w: 700, align: 'center', c: ch === 'α' ? C.cyan : C.gold, a }); }
function upArrow(x, y, h, col, a) { arrow(x, y, x, y - h, col, a, 4); }
function downArrow(x, y, h, col, a) { arrow(x, y - h, x, y, col, a, 4); }
function node46(x, y, r, col, a, s) { if (a <= 0) return; ring(x, y, r, col, a, 3); fillBox(x - r * 0.7, y - r * 0.7, r * 1.4, r * 1.4, col, 0); if (s) lbl(s, x, y + 8, col, a, 22); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2), off = Math.floor(t * 2.2);
  for (let i = 0; i < 22; i++) { const ch = STREAM46[(off + i) % 400], x = 300 + i * 62 - (t * 2.2 % 1) * 62; letter46(ch, x, 300, s0 * clamp(1 - Math.abs(i - 11) / 12) * 0.95, 34); }
  lbl('one hidden depth K · a stream of paid reads', 960, 220, C.dim, s0, 20);
  const q = Q(S, 0, 'finite predictor');
  if (q > 0) { for (let i = 0; i < 5; i++) node46(720 + i * 120, 470, 26, [C.cyan, C.mag, C.gold, C.green, C.vio][i], q * (0.5 + 0.5 * (Math.floor(t * 1.5) % 5 === i))); lbl('finite private labels', 960, 540, C.white, q, 20); }
  const l = Q(S, 1, 'the true chance');
  if (l > 0) { upArrow(760, 790, 150 * ease(clamp(l * 1.5)), C.green, l); lbl('truth', 760, 820, C.green, l, 24); }
  const m = Q(S, 1, 'must sometimes');
  if (m > 0) { downArrow(1160, 790, 150 * ease(clamp(m * 1.5)), C.red, m); lbl('forecast', 1160, 820, C.red, m, 24); }
  chip(960, 640, 640, 54, 'the same alpha edge · opposite directions', C.gold, Q(S, 1, 'let its own forecast'), 20);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const b = Math.sin(t * 1.2) * 18;
  upArrow(880, 520 - b, 220, C.green, rp); downArrow(1040, 300 + 220 + b, 220, C.red, rp);
  lbl('truth', 880, 560, C.green, rp, 22); lbl('forecast', 1040, 560, C.red, rp, 22);
  txt(scramble('AURIC FIB ATOM PYRAMID XVII', rp, 447), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XVII · 预 报 的 方 向', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 046 · AURIC_FIB_ATOM_ACQUIRED_ALPHA_CALIBRATION · DIRECTIONAL_ALPHA_CALIBRATION', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 SOURCE ---- */
SCENES.source = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'In the last segment', 0.6);
  if (fade > 0) {
    const x0 = 360, x1 = 1560, lo = 0.32, hi = 0.41, X = v => lerp(x0, x1, (v - lo) / (hi - lo)), ly = 520;
    line(x0, ly, x1, ly, C.dim, s0 * fade, 2);
    [[1 / 3, '1/3'], [3 / 8, '3/8'], [5 / 13, '5/13'], [2 / 5, '2/5']].forEach(([v, s]) => { line(X(v), ly - 10, X(v), ly + 10, C.dim, s0 * fade, 2); lbl(s, X(v), ly + 44, C.dim, s0 * fade, 20); });
    fillBox(X(3 / 8), ly - 16, X(5 / 13) - X(3 / 8), 32, C.green, Q(S, 0, 'always between') * fade * 0.35);
    for (let k = 1; k <= 9; k++) { const q = Q(S, 0, 'one third', 0.4, (k - 1) * 0.35) * fade, x = X(RK46(k)), yy = ly - 50 - (k % 2) * 40; dot(x, yy, 12, k <= 2 ? 'm' : 'c', q); if (k <= 4) lbl('k=' + k, x + (k === 3 ? -30 : k === 4 ? 30 : 0), yy - 26, k <= 2 ? C.mag : C.cyan, q, 16); }
    lbl('k ≥ 5 → 1/φ² ≈ 0.382', X(0.382), ly - 170, C.cyan, Q(S, 0, 'always between') * fade, 18);
    eqn('r_k = F(k+1) / F(k+3)', 960, 300, Q(S, 0, 'alpha with chance') * fade, C.white, 30);
    const kk = 1 + Math.floor(t * 0.7) % 9;
    lbl('K drawn once · never reset', 960, 690, C.gold, Q(S, 0, 'drawn once') * fade, 22);
  }
  const q = Q(S, 1, 'In the last segment', 0.6, 0.3);
  if (q > 0) {
    const P_ = [700, 470], Sx = [1220, 470];
    node46(P_[0], P_[1], 60, C.cyan, q, 'p'); node46(Sx[0], Sx[1], 60, C.gold, q, 'susp');
    arrow(P_[0] + 62, P_[1] - 20, Sx[0] - 62, Sx[1] - 20, C.gold, Q(S, 1, 'a beta suspends'), 3); lblG('β', 960, 430, C.gold, Q(S, 1, 'a beta suspends'), 26);
    arrow(Sx[0] - 62, Sx[1] + 20, P_[0] + 62, P_[1] + 20, C.cyan, Q(S, 1, 'an alpha returns'), 3); lblG('α  return', 960, 530, C.cyan, Q(S, 1, 'an alpha returns'), 24);
    arrow(P_[0] - 40, P_[1] + 50, P_[0] - 160, P_[1] + 190, C.cyan, Q(S, 1, 'completes marker zero'), 3); lbl('α → marker 0 → Stop', P_[0] - 170, P_[1] + 230, C.cyan, Q(S, 1, 'completes marker zero'), 20);
    arrow(Sx[0] + 40, Sx[1] + 50, Sx[0] + 160, Sx[1] + 190, C.gold, Q(S, 1, 'completes marker one'), 3); lbl('β → marker 1 → Stop', Sx[0] + 170, Sx[1] + 230, C.gold, Q(S, 1, 'completes marker one'), 20);
    lbl('one completion · one Stop', 960, 300, C.white, Q(S, 1, 'single Stop'), 22);
  }
};

/* ---- 03 STOPPEDLAW ---- */
SCENES.stoppedlaw = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const s0 = clamp(u);
  const lq = Q(S, 0, 'Lean has frozen', 0.6);
  box(300, 190, 1320, 120, C.green, lq, 2, 'rgba(0,30,15,0.6)');
  lbl('LEAN · FourthSegmentStoppedLaw.actual_fourth_segment_stopped_word_law', 960, 235, C.green, lq, 20);
  lblG('stopped Read word  ~  explicit atomic law  ( a = r(1 − r) )', 960, 282, C.white, Q(S, 0, 'stopped words'), 22);
  const rows = [['(βα)ʲ α', 'r · aʲ', C.cyan, 'repeated j times'], ['(βα)ʲ ββ', '(1 − r)² · aʲ', C.gold, 'the beta beta ending']];
  rows.forEach(([w, m, col, ph], k) => { const q = Q(S, 0, ph), y = 380 + k * 60; lblG(w, 520, y, col, q, 28); lblG(m, 820, y, C.white, q, 28); });
  /* bars: masses for j = 0..4 at r = 1/3 (cyan) and 2/5 (mag) */
  const bq = Q(S, 0, 'where a is');
  if (bq > 0) {
    const mass = (r, j, b) => (b ? (1 - r) * (1 - r) : r) * Math.pow(r * (1 - r), j);
    for (let j = 0; j < 5; j++) for (let b = 0; b < 2; b++) { const x = 1060 + (j * 2 + b) * 56, h1 = mass(1 / 3, j, b) * 420, h2 = mass(2 / 5, j, b) * 420; fillBox(x, 640 - h1, 22, h1, C.cyan, bq * 0.75); fillBox(x + 24, 640 - h2, 22, h2, C.mag, bq * 0.75); lbl((b ? 'ββ' : 'α') + j, x + 23, 670, C.dim, bq, 14); }
    line(1050, 640, 1630, 640, C.dim, bq, 1.5); lbl('r = 1/3', 1180, 720, C.cyan, bq, 18); lbl('r = 2/5', 1480, 720, C.mag, bq, 18);
  }
  const l = Q(S, 1, 'never completing', 0.6);
  if (l > 0) {
    box(300, 760, 700, 90, C.green, l, 2, 'rgba(0,30,15,0.6)');
    lbl('LEAN · actual_noncompletion_mass_zero', 650, 795, C.green, l, 18);
    lblG('P( never complete ) = 0', 650, 832, C.white, l, 24);
    lbl('(βα)^∞ : in the carrier, mass 0', 520, 470 + 120, C.red, Q(S, 1, 'stays in the carrier'), 20);
  }
};

/* ---- 04 ENDPOINTS ---- */
SCENES.endpoints = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'And a middle depth', 0.6);
  if (fade > 0) {
    [['payload p', DP46, '1116529 / 11390625 ≈ 0.0980', 330, C.cyan], ['suspension', DB46, '239 / 3375 ≈ 0.0708', 560, C.gold]].forEach(([nm, d, s, y, col], k) => {
      const q = Q(S, 0, k ? 'zero point zero seven' : 'zero point zero nine', 0.6) * fade, x0 = 620, L = 680 * d / DP46;
      lbl(nm, 380, y + 8, col, q, 22, 'left');
      dot(x0, y, 14, 'c', q); dot(x0 + L, y, 14, 'm', q); line(x0, y, x0 + L, y, col, q, 3);
      lbl('depth 1', x0, y - 30, C.cyan, q, 18); lbl('depth 2', x0 + L, y - 30, C.mag, q, 18);
      lbl('TV = ' + s, x0 + L / 2, y + 50, C.white, q, 20);
      const hq = Q(S, 0, 'No forecast can', 0.6) * fade; dot(x0 + L / 2, y, 12, 'g', hq); lbl('best: d/2 to each', x0 + L + 40, y + 8, C.gold, hq, 20, 'left');
    });
    chip(960, 760, 720, 56, 'ρ_p = d_p / 2 ,  ρ_β = d_β / 2', C.gold, Q(S, 0, 'No forecast can', 0.6) * fade, 22);
  }
  const q = Q(S, 1, 'And a middle depth', 0.6, 0.3);
  if (q > 0) {
    const f = frame46(380, 760, 900, 480, 0.33, 0.405, 0.00485, 0.00505), m = r => r ** 3 * (1 - r) ** 5;
    line(380, 760, 1280, 760, C.dim, q, 1.5); line(380, 760, 380, 280, C.dim, q, 1.5);
    curve(s => { const r = 0.33 + 0.075 * s; return f(r, m(r)); }, 90, C.cyan, q, 3);
    const e1 = f(1 / 3, m(1 / 3)), e2 = f(2 / 5, m(2 / 5));
    dot(e1[0], e1[1], 12, 'c', q); dot(e2[0], e2[1], 12, 'm', q); lbl('1/3', e1[0], 795, C.cyan, q, 18); lbl('2/5', e2[0], 795, C.mag, q, 18);
    dashed(380, e2[1], 1280, e2[1], C.mag, Q(S, 1, 'above both'), 2);
    const a = f(3 / 8, m(3 / 8)), b = f(5 / 13, m(5 / 13));
    fillBox(a[0], 280, b[0] - a[0], 480, C.green, Q(S, 1, 'above both') * 0.12); lbl('interior depths', (a[0] + b[0]) / 2, 300, C.green, Q(S, 1, 'above both'), 18);
    line(b[0], b[1], b[0], e2[1], C.red, Q(S, 1, 'at least eta'), 4); lblG('η', b[0] + 24, (b[1] + e2[1]) / 2 + 8, C.red, Q(S, 1, 'at least eta'), 28, 'left');
    eqn('mass of (βα)³ββ = r³(1 − r)⁵', 1500, 330, Q(S, 1, 'has mass'), C.white, 26);
    eqn('η = 14219478376 / 318644812890625', 1500, 420, Q(S, 1, 'at least eta'), C.red, 22);
    lbl('≈ 4.46 × 10⁻⁵', 1500, 470, C.red, Q(S, 1, 'about four'), 22);
    chip(1500, 580, 440, 54, 'not between the endpoints', C.gold, Q(S, 1, 'about four', 0.5, 1), 20);
  }
};

/* ---- 05 OBSERVER ---- */
SCENES.observer = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const X = [[460, 330], [460, 500], [460, 670]], Y = [[1160, 380], [1160, 620]];
  const uu = ['1/3', '0.37', '2/5'], vv = ['0.35', '0.39'];
  X.forEach((p, i) => { node46(p[0], p[1], 40, C.cyan, s0, 'x' + (i + 1)); lbl('u = ' + uu[i], p[0] - 70, p[1] + 8, C.cyan, Q(S, 1, 'forecasts are u'), 20, 'right'); });
  Y.forEach((p, i) => { node46(p[0], p[1], 40, C.gold, s0, 'y' + (i + 1)); lbl('v = ' + vv[i], p[0] + 70, p[1] + 8, C.gold, Q(S, 1, 'v at suspension'), 20, 'left'); });
  lbl('payload labels X', 460, 250, C.cyan, s0, 20); lbl('suspended labels Y', 1160, 300, C.gold, s0, 20);
  const bq = Q(S, 0, 'kernel B'), aq = Q(S, 0, 'kernel A');
  [[0, 0], [1, 0], [1, 1], [2, 1]].forEach(([i, j], k) => { const a = X[i], b = Y[j]; arrow(a[0] + 42, a[1] - 6, b[0] - 42, b[1] - 6, C.gold, bq * 0.9, 2.5); });
  [[0, 0], [0, 1], [1, 2], [1, 1]].forEach(([j, i], k) => { const a = Y[j], b = X[i]; dashed(a[0] - 42, a[1] + 8, b[0] + 42, b[1] + 8, C.cyan, aq * 0.9, 2.5); });
  lbl('B : on actual β at the payload', 810, 220, C.gold, bq, 20); lbl('A : on actual α at suspension', 810, 780, C.cyan, aq, 20);
  chip(810, 850, 760, 52, 'forecast = own generator law, same kernels', C.green, Q(S, 0, 'Its forecast is'), 20);
  eqn('π B = τ ,   τ A = π', 1580, 470, Q(S, 1, 'stationary rows'), C.white, 30);
  lbl('two flows · one circulation', 1580, 520, C.dim, Q(S, 1, 'two flows'), 20);
};

/* ---- 06 ENERGY ---- */
SCENES.energy = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('D* = (412/729 − a*)/d_p − (22/27 − b*)/d_β', 960, 230, Q(S, 0, 'endpoint score'), C.white, 26);
  eqn('D*  ≥  E[Z(1 − Z)] / 16  +  h · E_C', 960, 310, Q(S, 0, 'calibration inequality'), C.gold, 32);
  lbl('Z = 15u − 5 ∈ [0, 1]', 700, 370, C.cyan, Q(S, 0, 'source polynomial'), 20); lbl('E_C = ½ Σ π C (u_x − u_z)²', 1240, 370, C.mag, Q(S, 0, 'the energy'), 20);
  lbl('h = 1586793150 / 266850431 ≈ 5.95', 960, 410, C.dim, Q(S, 0, 'plus h times'), 18);
  /* loop with moving forecast */
  const ring6 = ringPts(560, 640, 150, 6);
  ring6.forEach((p, i) => { const v = 0.5 + 0.5 * Math.sin(i * 1.7 + t); dot(p[0], p[1], 10 + 10 * v, 'm', Q(S, 0, 'around the loop')); });
  for (let i = 0; i < 6; i++) { const p = ring6[i], q = ring6[(i + 1) % 6]; arrow(p[0], p[1], lerp(p[0], q[0], 0.85), lerp(p[1], q[1], 0.85), C.dim, Q(S, 0, 'around the loop'), 2); }
  lbl('forecast changes around the loop', 560, 820, C.mag, Q(S, 0, 'around the loop'), 18);
  /* bracket quartic plot */
  const l = Q(S, 1, 'factors as');
  if (l > 0) {
    const f = frame46(1000, 820, 600, 300, 0, 1, 17.6e6, 18.15e6), qz = z => 17655975 + 459915 * z - 6931 * z * z - 6931 * z ** 3 + 239 * z ** 4;
    plotAxes(1000, 820, 600, 300, l, 'z', 'quartic');
    curve(s => f(s, qz(s)), 80, C.green, l, 3);
    const yl = f(0, 17642113)[1]; dashed(1000, yl, 1600, yl, C.red, Q(S, 1, 'never drops'), 2); lbl('17,642,113', 1610, yl + 6, C.red, Q(S, 1, 'never drops'), 18, 'left');
    lblG('= z(1−z)(17655975 + 459915z − 6931z² − 6931z³ + 239z⁴) / (239·1116529)', 960, 470, C.white, l, 20);
  }
  chip(560, 885, 460, 50, 'interior forecasts cost', C.cyan, Q(S, 1, 'Interior forecasts'), 20);
  chip(1300, 885, 460, 50, 'moving forecasts cost', C.mag, Q(S, 1, 'moving forecasts'), 20);
};

/* ---- 07 CHANGE ---- */
SCENES.change = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('𝒜(M) = sup_h  Σ ρ_h(y) A_h(y,x) |v_y − u_x|', 960, 230, Q(S, 0, 'Let A measure'), C.white, 26);
  eqn('240 e(M) + 30 𝒜(M)  >  κ = η² / 64', 960, 310, Q(S, 0, 'two hundred forty'), C.gold, 32);
  const f = frame46(460, 800, 760, 400, 0, 1.25, 0, 1.25), q = Q(S, 0, 'two hundred forty');
  if (q > 0) {
    plotAxes(460, 800, 760, 400, q, 'excess e', 'alpha change 𝒜');
    fillPoly([f(0, 0), f(1, 0), f(0, 1)], C.red, q * 0.25); line(...f(1, 0), ...f(0, 1), C.red, q, 3);
    lbl('forbidden', ...f(0.28, 0.25), C.red, q, 20);
    lbl('κ/240', f(1, 0)[0], 840, C.red, q, 18); lbl('κ/30', 420, f(0, 1)[1] + 6, C.red, q, 18, 'right');
    const nq = Q(S, 1, 'So to sit near');
    if (nq > 0) { fillBox(f(0, 0)[0], f(0, 1.25)[1], f(0.12, 0)[0] - f(0, 0)[0], f(0, 0)[1] - f(0, 1.25)[1], C.green, nq * 0.12); dot(...f(0.04, 1.1), 14, 'n', nq); lbl('near both minima: 𝒜 > κ/30', f(0.15, 1.1)[0], f(0.15, 1.1)[1] + 6, C.green, nq, 20, 'left'); }
    const zq = Q(S, 1, 'never changes it'); if (zq > 0) { dot(...f(1.1, 0), 14, 'r', zq); lbl('𝒜 = 0 ⟹ e ≥ κ/240', f(1.1, 0)[0], f(1.1, 0)[1] - 30, C.red, zq, 20); }
  }
  lbl('prior: both endpoints + a middle depth', 1500, 420, C.dim, Q(S, 0, 'On every prior'), 18);
  lbl('κ ≈ 3.1 × 10⁻¹¹', 1500, 470, C.dim, Q(S, 0, 'exceeds kappa'), 20);
};

/* ---- 08 INDEPENDENCE ---- */
SCENES.independence = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const q1 = Q(S, 0, 'One persistent label');
  if (q1 > 0) {
    node46(420, 400, 50, C.cyan, q1, 'p'); node46(700, 400, 50, C.gold, q1, 's');
    arrow(470, 385, 650, 385, C.gold, q1, 2.5); arrow(650, 415, 470, 415, C.cyan, q1, 2.5);
    lbl('u = 1/3', 420, 490, C.cyan, q1, 20); lbl('v = 2/5', 700, 490, C.gold, q1, 20);
    chip(560, 580, 380, 50, '𝒜 = 1/15', C.green, Q(S, 0, 'one fifteenth'), 22);
    chip(560, 650, 380, 50, 'return motion = 0', C.red, Q(S, 0, 'never moves'), 22);
    lbl('one persistent label', 560, 290, C.white, q1, 20);
  }
  const q2 = Q(S, 1, 'Two labels swapped');
  if (q2 > 0) {
    const sw = (Math.floor(t * 0.8) % 2);
    node46(1220, 340, 44, C.cyan, q2, 'x₁'); node46(1220, 480, 44, C.mag, q2, 'x₂');
    node46(1500, 340, 44, C.gold, q2, 'y₁'); node46(1500, 480, 44, C.gold, q2, 'y₂');
    arrow(1264, 350, 1456, 470, C.gold, q2, 2.5); arrow(1264, 470, 1456, 350, C.gold, q2, 2.5);
    dashed(1456, 345, 1264, 345, C.cyan, q2, 2); dashed(1456, 485, 1264, 485, C.cyan, q2, 2);
    lbl('u = 1/3', 1120, 348, C.cyan, q2, 18, 'right'); lbl('u = 2/5', 1120, 488, C.mag, q2, 18, 'right');
    lbl('β swaps · α keeps', 1360, 280, C.white, q2, 20);
    chip(1360, 580, 380, 50, '𝒜 = 0', C.red, Q(S, 1, 'equal to zero'), 22);
    chip(1360, 650, 380, 50, 'return motion ≥ 1/15', C.green, Q(S, 1, 'differ by one fifteenth'), 22);
  }
  chip(960, 780, 640, 54, 'each condition can hold without the other', C.gold, Q(S, 1, 'Each condition'), 22);
};

/* ---- 09 TRUTH ---- */
SCENES.truth = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), K = 8, mu = Array.from({ length: K }, (_, i) => 1 / K);
  const post = A => { const w = mu.map((m, i) => m * Math.pow(RK46(i + 1), A) * Math.pow(1 - RK46(i + 1), 6)); const s = w.reduce((a, b) => a + b); return w.map(x => x / s); };
  const step = Q(S, 0, 'reweights each depth', 1.5), p0 = post(2), p1 = post(3), pc = p0.map((x, i) => lerp(x, p1[i], ease(step)));
  const mean = p => p.reduce((s, x, i) => s + x * RK46(i + 1), 0);
  pc.forEach((v, i) => { const x = 420 + i * 90; fillBox(x, 700 - v * 900, 60, v * 900, C.cyan, s0 * 0.8); lbl('k=' + (i + 1), x + 30, 735, C.dim, s0, 16); lbl(RK46(i + 1).toFixed(3), x + 30, 760, C.dim, s0, 14); });
  line(410, 700, 1140, 700, C.dim, s0, 1.5);
  lbl('posterior over depth', 780, 270, C.white, s0, 20);
  const m0 = mean(p0), m1 = mean(p0.map((x, i) => lerp(x, p1[i], ease(step)))), f = frame46(1300, 760, 300, 460, 0.36, 0.40, 0, 1);
  line(1450, 760, 1450, 300, C.dim, s0, 1.5);
  const y0 = 760 - (m0 - 0.37) / 0.02 * 460, y1 = 760 - (m1 - 0.37) / 0.02 * 460;
  dot(1450, y0, 12, 'w', Q(S, 0, 'the true next-alpha')); dot(1450, y1, 16, 'n', Q(S, 0, 'the true next-alpha')); if (y1 < y0 - 4) arrow(1450, y0, 1450, y1 + 14, C.green, Q(S, 0, 'the true next-alpha'), 4);
  lbl('m_h = ' + m0.toFixed(4), 1490, y0 + 6, C.white, Q(S, 0, 'the true next-alpha'), 18, 'left'); lbl('m_hα = ' + m1.toFixed(4), 1490, y1 + 6, C.green, Q(S, 0, 'the true next-alpha'), 18, 'left');
  eqn('m_hα − m_h = Var_ν(r) / m_h  > 0', 1300, 230, Q(S, 0, 'posterior variance'), C.gold, 28);
  lbl('both endpoints possible ⟹ strictly positive', 1300, 290, C.green, Q(S, 0, 'strictly positive'), 18);
  chip(960, 850, 640, 52, 'copy the motion? increases are not free', C.red, Q(S, 1, 'not free'), 20);
};

/* ---- 10 DIRECTION ---- */
SCENES.direction = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('J₊ = Σ τ A (v_y − u_z)₊        J₋ = Σ τ A (u_z − v_y)₊', 960, 230, Q(S, 0, 'Split the change'), C.white, 24);
  for (let i = 0; i < 8; i++) { const x = 440 + i * 140, dn = i === 2 || i === 5, q = Q(S, 0, dn ? 'decreases' : 'increases', 0.5, i * 0.1); (dn ? downArrow : upArrow)(x, 545, 110, dn ? C.red : C.green, q); }
  lbl('J₊ : decreases', 700, 590, C.red, Q(S, 0, 'decreases'), 20); lbl('J₋ : increases', 1220, 590, C.green, Q(S, 0, 'increases'), 20);
  eqn('E[Z(1−Z)]/16 + h E_C + c J₋  ≤  ε_p/d_p + ε_β/d_β + K J₊', 960, 330, Q(S, 0, 'charges increases'), C.gold, 26);
  lbl('c = 502947375 / 266850431 ≈ 1.88 > 0', 960, 380, C.green, Q(S, 0, 'positive constant'), 18);
  const l = Q(S, 1, 'So two hundred');
  eqn('240 e(M) + 30 𝒟(M)  >  κ ,   𝒟 = sup Σ ρ A (v − u)₊', 960, 670, l, C.red, 26);
  const m = Q(S, 1, 'Some actual alpha edge');
  if (m > 0) { upArrow(820, 840, 120, C.green, m); lbl('truth on this edge', 820, 870, C.green, m, 18); downArrow(1100, 840, 120, C.red, m); lbl('forecast on this edge', 1100, 870, C.red, m, 18); }
};

/* ---- 11 PRIVATE ---- */
SCENES.private = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'open']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Whether these', 0.6);
  if (fade > 0) {
    const arr = [0.02, 0.03, -0.015, 0.025, 0.01];
    arr.forEach((d, i) => { const x = 420 + i * 120, q = s0 * fade; (d > 0 ? upArrow : downArrow)(x, 520, Math.abs(d) * 3000, d > 0 ? C.green : C.red, q); lbl('label ' + (i + 1), x, 560, C.dim, q, 14); });
    lbl('private configurations', 660, 260, C.white, s0 * fade, 20);
    const mq = Q(S, 0, 'keep the mean climbing') * fade; upArrow(1060, 520, 80, C.gold, mq); lbl('mean still rises', 1060, 560, C.gold, mq, 18);
    const eq = Q(S, 0, 'A lawful predictor') * fade;
    if (eq > 0) {
      box(1220, 280, 440, 330, C.red, eq, 2, 'rgba(40,0,10,0.4)');
      lbl('u = (1/3, 2/5) ,  v = (1/3, 1/3)', 1440, 330, C.white, eq, 18); lbl('A = identity ,  B = swap', 1440, 370, C.white, eq, 18);
      upArrow(1360, 520, 0.01, C.green, eq); lbl('1/3 → 1/3', 1360, 560, C.dim, eq, 16); upArrow(1520, 520, 100, C.green, eq); lbl('1/3 → 2/5', 1520, 560, C.green, eq, 16);
      lbl('J₊ = 0 ,  J₋ = 1/30', 1440, 595, C.gold, Q(S, 0, 'one thirtieth') * fade, 20);
      chip(1440, 680, 360, 50, 'excluded class', C.red, Q(S, 0, 'excluded class') * fade, 22);
    }
  }
  const q = Q(S, 1, 'Whether these', 0.6, 0.3);
  if (q > 0) {
    ['endpoint boxes', 'interior loss', 'both acquired flows', 'necessary decreases'].forEach((s, i) => chip(560, 300 + i * 80, 460, 54, s, [C.cyan, C.gold, C.mag, C.red][i], Q(S, 1, 'coexist', 0.5, i * 0.3), 20));
    lblG('?', 1000, 470, C.vio, Q(S, 1, 'remains open'), 120);
    lbl('one exact finite generator', 1350, 400, C.vio, Q(S, 1, 'one exact finite'), 22);
    ['no optimizer claimed', 'no vanishing family claimed', 'no positive gap claimed'].forEach((s, i) => lbl(s, 1350, 500 + i * 46, C.dim, Q(S, 1, 'No optimizer', 0.5, i * 0.3), 20));
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['DEPTH', 'one hidden K', C.cyan, 'One hidden depth'], ['FLOWS', 'π B = τ , τ A = π', C.gold, 'two acquired flows'], ['BOXES', 'd_p / 2 , d_β / 2', C.mag, 'two endpoint boxes'], ['WORD', '(βα)³ββ · η', C.green, 'one interior word']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 230, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 290, col, q, 28); lblG(a2, x, 340, C.white, q, 22); });
    const dq = Q(S, 0, 'must change on alpha') * fade; upArrow(880, 520, 90, C.green, dq); downArrow(1040, 520, 90, C.red, Q(S, 0, 'point down') * fade);
    lbl('LEAN · FourthSegmentStoppedLaw · stopped word law · zero noncompletion mass', W / 2, 600, C.green, Q(S, 1, 'Lean has frozen') * fade, 22);
    lbl('VOLUMES · calibration inequalities · alpha-change and direction obstructions', W / 2, 655, C.orange, Q(S, 1, 'The calibration') * fade, 22);
    lbl('RECOMPUTED · every number in this film', W / 2, 710, C.white, Q(S, 1, 'every number') * fade, 24);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, b = Math.sin(t * 1.2) * 14;
    upArrow(880, 540 - b, 200, C.green, a); downArrow(1040, 340 + 200 + b, 200, C.red, a);
    txt('AURIC FIB ATOM PYRAMID XVII', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XVII · 预报的方向 · TRURETURING FILM 046', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('The truth rises. The forecast must sometimes fall.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'TWO DIRECTIONS', source: 'ONE HIDDEN DEPTH', stoppedlaw: 'THE STOPPED WORD LAW', endpoints: 'ENDPOINT BOXES', observer: 'TWO ACQUIRED FLOWS', energy: 'CALIBRATION ENERGY', change: 'ALPHA MUST CHANGE', independence: 'TWO SEPARATE DEMANDS', truth: 'THE TRUTH RISES', direction: 'SOME CHANGE POINTS DOWN', private: 'PRIVATE, NOT AVERAGE', finale: 'LEDGER' });

function poster46() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  upArrow(420, 760, 480, C.green, 1); downArrow(700, 760, 480, C.red, 1);
  txt('truth', 420, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.green }); txt('forecast', 700, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.red });
  txt('m_hα − m_h = Var / m > 0', 1320, 300, { size: 36, fam: FG, w: 700, align: 'center', c: C.green });
  txt('240 e + 30 𝒟 > κ', 1320, 390, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('𝒟 = Σ ρ A (v − u)₊', 1320, 480, { size: 36, fam: FG, w: 700, align: 'center', c: C.red });
  txt('P(βα)ʲα = r aʲ', 1320, 570, { size: 34, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('FIB 原子金字塔 XVII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XVII', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('真 相 在 上 升 · 预 报 必 须 有 时 下 降', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 046', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster46;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
