/* Film 047 — hyperbolic geometry and phase boundary */

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


/* ---- film 047: hyperbolic geometry and the phase boundary ---- */
const _po47 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po47.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po47.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function frame47(x0, y0, w, h, xa, xb, ya, yb) { return (x, y) => [x0 + (x - xa) / (xb - xa) * w, y0 - (y - ya) / (yb - ya) * h]; }
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
const PHI47 = (1 + Math.sqrt(5)) / 2, A47 = Math.log(PHI47), PSI47 = -1 / PHI47, R5 = Math.sqrt(5);
/* F(t) = (e^{at} - e^{-at} e^{-i pi t}) / sqrt5 ; returns [re, im] */
function F47(t, k = -1) { const w = (2 * k + 1) * Math.PI; const g = Math.exp(-A47 * t); return [(Math.exp(A47 * t) - g * Math.cos(w * t)) / R5, -g * Math.sin(w * t) / R5]; }
const FIB47 = n => { if (n < 0) return (n % 2 ? 1 : -1) * FIB47(-n); let a = 0, b = 1; for (let i = 0; i < n; i++) [a, b] = [b, a + b]; return a; };
/* the 3D lift of (X0,Y0,Z0) */
function T3(t, X0, Y0, Z0) { const e = Math.exp(A47 * t), g = Math.exp(-A47 * t), c = Math.cos(Math.PI * t), s = Math.sin(Math.PI * t); return [e * X0, g * (Y0 * c - Z0 * s), g * (Y0 * s + Z0 * c)]; }
function axes3(v, L, a, labs = ['X (φ)', 'Y', 'Z']) { const O = v(0, 0, 0); [[L, 0, 0], [0, L, 0], [0, 0, L]].forEach((p, i) => { const q = v(...p); line(O[0], O[1], q[0], q[1], [C.gold, C.cyan, C.mag][i], a * 0.7, 1.5); lbl(labs[i], q[0] + 10, q[1] - 6, [C.gold, C.cyan, C.mag][i], a, 18, 'left'); }); }
function upA(x, y, h, col, a) { arrow(x, y, x, y - h, col, a, 4); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  const f = frame47(260, 640, 1400, 380, -2, 6, -3, 8);
  line(260, f(0, 0)[1], 1660, f(0, 0)[1], C.dim, s0, 1.5);
  for (let n = -2; n <= 6; n++) { const p = f(n, FIB47(n)); dot(p[0], p[1], 12, 'g', s0); lbl('F' + (n < 0 ? '₋' + (-n) : n), p[0], p[1] + (FIB47(n) < 0 ? 36 : -20), C.gold, s0, 18); }
  const q = Q(S, 0, 'can the Fibonacci step', 1.5);
  if (q > 0) curve(s => { const tt = -2 + 8 * s * ease(q); return f(tt, F47(tt)[0]); }, 160, C.cyan, q, 3);
  chip(960, 220, 560, 54, 'between the integer steps?', C.white, Q(S, 0, 'between the integer'), 22);
  chip(560, 790, 420, 54, 'pay a phase', C.mag, Q(S, 1, 'paying a phase'), 22);
  chip(960, 790, 420, 54, 'path not fixed', C.gold, Q(S, 1, 'not the path'), 22);
  chip(1360, 790, 420, 54, 'a third dimension', C.cyan, Q(S, 1, 'third dimension'), 22);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const v = v3(W / 2, 400, 90, 0.5 + t * 0.2, 0.35, [0.6, 0, 0]);
  curve(s => { const tt = -1.6 + 3.3 * s; const p = T3(tt, 0.8, 1.3, 0); return v(p[0], p[1], p[2]); }, 200, C.cyan, rp * 0.9, 3);
  for (let n = -1; n <= 1; n++) { const p = T3(n, 0.8, 1.3, 0), q = v(...p); dot(q[0], q[1], 12, 'g', rp); }
  txt(scramble('AURIC FIB ATOM PYRAMID XVIII', rp, 448), W / 2, 760, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XVIII · 双 曲 几 何 与 相 位 边 界', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 047 · AURIC_FIB_HYPERBOLIC_GEOMETRY_AND_PHASE_BOUNDARY', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 BINET ---- */
SCENES.binet = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u);
  const f = frame47(260, 620, 760, 400, -6, 9, -1.6, 1.6);
  line(260, f(0, 0)[1], 1020, f(0, 0)[1], C.dim, s0, 1.5); line(f(0, 0)[0], 220, f(0, 0)[0], 620, C.dim, s0, 1.5);
  lbl('Re', 1030, f(0, 0)[1] + 6, C.dim, s0, 18, 'left'); lbl('Im', f(0, 0)[0], 205, C.dim, s0, 18);
  const tq = Q(S, 0, 'becomes a complex curve', 2.5), tmax = -5 + 10.5 * ease(tq);
  const disp = z => f(Math.max(-6, Math.min(9, z[0])), Math.sign(z[1]) * 1.5 * Math.log(1 + 3 * Math.abs(z[1])) / Math.log(16));
  if (tq > 0) curve(s => { const tt = -5 + (tmax + 5) * s; return disp(F47(tt)); }, 400, C.cyan, s0, 2.5);
  for (let n = -5; n <= 5; n++) { const x = FIB47(n); if (x > 9 || x < -6) continue; const p = f(x, 0), qq = Q(S, 0, 'lands exactly', 0.5, (n + 5) * 0.08); dot(p[0], p[1], 9, 'g', qq); }
  lbl('imaginary axis on a logarithmic scale', 640, 660, C.dim, s0, 16);
  eqn('F(t) = (φᵗ − φ⁻ᵗ e^(−iπt)) / √5', 1400, 260, Q(S, 0, 'equals phi to the t'), C.white, 28);
  eqn('F(n) = F_n ,   F₋ₙ = (−1)ⁿ⁺¹ F_n', 1400, 330, Q(S, 0, 'negative ones'), C.gold, 26);
  eqn('Re F = (φᵗ − φ⁻ᵗ cos πt)/√5 ,  Im F = φ⁻ᵗ sin πt /√5', 1400, 430, Q(S, 1, 'Its real part'), C.cyan, 20);
  const hp = F47(0.5); const hq = Q(S, 1, 'At one half'); const hpp = disp(hp); dot(hpp[0], hpp[1], 13, 'm', hq);
  lbl('F(½) = 0.569 + 0.352 i', 1400, 500, C.mag, hq, 24);
  eqn('F(−t) = −e^(iπt) F(t)', 1400, 580, Q(S, 1, 'reversing time'), C.red, 28);
  lbl('F(−½) = −i F(½) : not ±1', 1400, 630, C.red, Q(S, 1, 'not by plus'), 20);
};

/* ---- 03 STEP ---- */
SCENES.step = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), O = [600, 560], sc = 120;
  const P = (x, y) => [O[0] + x * sc, O[1] - y * sc];
  line(P(-3, 0)[0], O[1], P(3, 0)[0], O[1], C.dim, s0, 1.2); line(O[0], P(0, -2.6)[1], O[0], P(0, 2.6)[1], C.dim, s0, 1.2);
  /* eigen-directions */
  const vp = [1, PHI47], vm = [1, PSI47], nrm = v => Math.hypot(...v);
  const mq = Q(S, 0, 'is a mirror');
  [[vp, C.green, 'v₊ : S = +1'], [vm, C.red, 'v₋ : S = −1']].forEach(([v, col, s]) => { const k = 2.4 / nrm(v), a_ = P(-v[0] * k, -v[1] * k), b_ = P(v[0] * k, v[1] * k); dashed(a_[0], a_[1], b_[0], b_[1], col, mq, 2); lbl(s, b_[0] + 10, b_[1], col, mq, 18, 'left'); });
  /* unit square and its image under M, morphing */
  const sq = [[0, 0], [1, 0], [1, 1], [0, 1]], k = ease(Q(S, 0, 'splits exactly', 2));
  const Mx = p => [p[1], p[0] + p[1]];
  const img = sq.map(p => { const m = Mx(p); return P(lerp(p[0], m[0], k), lerp(p[1], m[1], k)); });
  fillPoly(img, C.cyan, s0 * 0.18); strokePoly(img, C.cyan, s0, 2.5);
  eqn('M = [[0,1],[1,1]] = S · e^(aS)', 1400, 250, Q(S, 0, 'splits exactly'), C.white, 30);
  eqn('S = (2M − I)/√5 ,  Sᵀ = S ,  S² = I ,  det S = −1', 1400, 320, Q(S, 0, 'two M minus'), C.green, 22);
  eqn('det e^(aS) = 1  (keeps area)', 1400, 400, Q(S, 1, 'keeps area'), C.cyan, 24);
  /* 1, 2, sqrt5 triangle */
  const tq = Q(S, 1, 'right triangle', 0.8);
  if (tq > 0) { const T0 = [1250, 720], s2 = 110; const A_ = T0, B_ = [T0[0] + 2 * s2, T0[1]], C_ = [T0[0] + 2 * s2, T0[1] - 1 * s2]; fillPoly([A_, B_, C_], C.gold, tq * 0.2); strokePoly([A_, B_, C_], C.gold, tq, 2.5); lbl('2', (A_[0] + B_[0]) / 2, B_[1] + 32, C.white, tq, 22); lbl('1', B_[0] + 22, (B_[1] + C_[1]) / 2 + 6, C.white, tq, 22, 'left'); lbl('√5', (A_[0] + C_[0]) / 2 - 20, (A_[1] + C_[1]) / 2 - 14, C.white, tq, 22); }
  eqn('2 sinh a = 1 ,  2 cosh a = √5 ,  a = log φ', 1400, 500, Q(S, 1, 'Since sinh a'), C.gold, 24);
  lbl('F_2k = (2/√5) sinh 2ka ,  F_2k+1 = (2/√5) cosh (2k+1)a', 1400, 560, C.dim, Q(S, 1, 'holds the whole step'), 18);
};

/* ---- 04 OBSTRUCTION ---- */
SCENES.obstruction = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'In the complex plane', 0.6);
  if (fade > 0) {
    eqn('T(½)² = M', 960, 300, Q(S, 0, 'half step squared') * fade, C.white, 34);
    eqn('det M = −1 = (det T(½))² ≥ 0', 960, 400, Q(S, 0, 'nonnegative determinant') * fade, C.red, 34);
    stamp('IMPOSSIBLE', 960, 560, Q(S, 0, 'determinant of M is minus', 0.6) * fade, C.red, 64);
    lbl('no real half step on the plane', 960, 680, C.dim, Q(S, 0, 'Can the real plane') * fade, 20);
  }
  const q = Q(S, 1, 'In the complex plane', 0.6, 0.3);
  if (q > 0) {
    mgrid(300, 260, [['F(t−1)', 'F(t)'], ['F(t)', 'F(t+1)']], 170, 80, q, { colf: () => C.cyan, size: 24 });
    lbl('U(t) =', 280, 350, C.white, q, 26, 'right');
    eqn('U(s+t) = U(s) U(t) ,  U(1) = M', 470, 500, Q(S, 1, 'group law'), C.green, 24);
    eqn('det U(t) = F(t+1)F(t−1) − F(t)² = e^(−iπt)', 470, 580, Q(S, 1, 'determinant e to the'), C.gold, 22);
    /* phase on the unit circle */
    const cx = 1350, cy = 470, R = 200, tt = (t * 0.35) % 4 - 1;
    ring(cx, cy, R, C.dim, q, 1.5); line(cx - R - 30, cy, cx + R + 30, cy, C.dim, q, 1); line(cx, cy - R - 30, cx, cy + R + 30, C.dim, q, 1);
    const pq = Q(S, 1, 'into a phase');
    dot(cx + R * Math.cos(-Math.PI * tt), cy - R * Math.sin(-Math.PI * tt), 16, 'g', Math.max(pq, Q(S, 1, 'determinant e to the')));
    dot(cx + R, cy, 10, 'n', q); dot(cx - R, cy, 10, 'r', q); lbl('+1 (n even)', cx + R + 20, cy - 16, C.green, q, 18, 'left'); lbl('−1 (n odd)', cx - R - 20, cy - 16, C.red, q, 18, 'right');
    lbl('t = ' + tt.toFixed(2), cx, cy + R + 50, C.white, Math.max(pq, Q(S, 1, 'determinant e to the')), 20);
    lbl('(−1)ⁿ becomes a phase', cx, cy - R - 50, C.gold, pq, 22);
  }
};

/* ---- 05 LIFT ---- */
SCENES.lift = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const v = v3(720, 570, 105, 0.7 + t * 0.12, 0.42, [1.4, 0, 0]);
  axes3(v, 3.2, s0, ['X : e^(at)', 'Y', 'Z']);
  const pr = Q(S, 0, 'Or stay real', 4);
  curve(s => { const tt = -1.5 + 4 * s * pr; const p = T3(tt, 0.5, 1.4, 0); return v(...p); }, 260, C.cyan, s0, 3);
  for (let n = -1; n <= 2; n++) { const p = T3(n, 0.5, 1.4, 0), q = v(...p), qq = Q(S, 1, 'At every integer', 0.5, (n + 1) * 0.3); dot(q[0], q[1], 12, 'g', qq); lbl('n = ' + n, q[0] + 16, q[1] - 12, C.gold, qq, 16, 'left'); }
  eqn('X(t) = e^(at) X₀', 1450, 260, Q(S, 0, 'stretches by'), C.gold, 24);
  eqn('(Y,Z)(t) = e^(−at) · rotate(πt) (Y₀,Z₀)', 1450, 320, Q(S, 0, 'spirals inside'), C.cyan, 22);
  eqn('T₃(n) J = J Mⁿ   (all n ∈ ℤ)', 1450, 420, Q(S, 1, 'lands exactly'), C.green, 26);
  chip(1450, 520, 440, 54, 'dimension 2: impossible', C.red, Q(S, 1, 'Two dimensions'), 20);
  chip(1450, 600, 440, 54, 'minimum real dimension = 3', C.green, Q(S, 1, 'three is the minimum'), 20);
  lbl('a linear flow of the whole plane', 1450, 670, C.dim, Q(S, 1, 'whole plane'), 18);
};

/* ---- 06 SHADOW ---- */
SCENES.shadow = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const f = frame47(300, 740, 640, 480, -1.5, 1.5, -1.2, 1.2), O = f(0, 0);
  line(f(-1.5, 0)[0], O[1], f(1.5, 0)[0], O[1], C.dim, s0, 1.2); line(O[0], f(0, -1.2)[1], O[0], f(0, 1.2)[1], C.dim, s0, 1.2);
  const vm = [1 / Math.hypot(1, PSI47), PSI47 / Math.hypot(1, PSI47)], vp = [1 / Math.hypot(1, PHI47), PHI47 / Math.hypot(1, PHI47)];
  dashed(...f(-vp[0] * 1.6, -vp[1] * 1.6), ...f(vp[0] * 1.6, vp[1] * 1.6), C.green, s0 * 0.6, 1.5); dashed(...f(-vm[0] * 1.6, -vm[1] * 1.6), ...f(vm[0] * 1.6, vm[1] * 1.6), C.red, s0 * 0.6, 1.5);
  /* animate input v_- under A(t) = Re U(t): component along v_- scales by e^{-at} cos(pi t) */
  const T = Math.min(1, Math.max(0, (S.u - lineAt(S, 0).s - 1) / 6)) + Math.min(0.5, Math.max(0, (S.u - lineAt(S, 1).s) / 4));
  const coef = Math.exp(-A47 * T) * Math.cos(Math.PI * T);
  const p1 = f(vm[0] * coef, vm[1] * coef);
  arrow(O[0], O[1], p1[0], p1[1], C.red, s0, 4); dot(O[0], O[1], 12, 'w', s0);
  lbl('input c₁ = v₋', p1[0] + 14, p1[1] - 10, C.red, s0, 18, 'left'); lbl('input c₀ = 0', O[0] - 14, O[1] + 34, C.white, s0, 18, 'right');
  lbl('t = ' + T.toFixed(2), 620, 790, C.white, s0, 22);
  const hq = Q(S, 0, 'same shadow');
  chip(1400, 300, 520, 56, 'A(½) v₋ = 0 : same shadow', C.red, hq, 22);
  eqn('A(t) = Re U(t) = e^(at)P₊ + e^(−at) cos(πt) P₋', 1400, 400, Q(S, 0, 'real shadow'), C.white, 20);
  chip(1400, 520, 520, 56, 'A(1) v₋ = ψ v₋ ≠ 0', C.gold, Q(S, 1, 'multiplied by psi'), 22);
  eqn('A(s+t) − A(s)A(t) = −e^(−a(s+t)) sin πs sin πt P₋', 1400, 610, Q(S, 1, 'unread coordinate'), C.mag, 18);
  lbl('the shadow is not a sufficient state', 1400, 680, C.red, Q(S, 1, 'not a sufficient'), 20);
};

/* ---- 07 BRANCHES ---- */
SCENES.branches = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f = frame47(300, 760, 1000, 500, 0, 4.2, -2.5, 4.5);
  plotAxes(300, 760 - 500 * 2.5 / 7, 1000, 0, s0, 't', '');
  line(300, 760, 300, 260, C.dim, s0, 1.2);
  const fade = 1 - Q(S, 1, 'Even one fixed', 0.6);
  [[-1, C.cyan], [0, C.gold], [1, C.mag], [-2, C.green]].forEach(([k, col], i) => { const q = Q(S, 0, 'Every odd frequency', 0.5, i * 0.5) * (k === -1 ? 1 : fade); curve(s => { const tt = 4.2 * s; return f(tt, Math.max(-2.5, Math.min(4.5, F47(tt, k)[0]))); }, 260, col, q, 2.5); lbl('k = ' + k, 1330, 300 + i * 36, col, q, 18, 'left'); });
  for (let n = 0; n <= 4; n++) { const p = f(n, FIB47(n)); dot(p[0], p[1], 11, 'w', s0); }
  lbl('Re F_k(t) : all through F_n', 800, 230, C.white, Q(S, 0, 'Every odd frequency'), 20);
  const mq = Q(S, 1, 'Even one fixed', 0.6, 0.3);
  if (mq > 0) { const lam = 0.12; curve(s => { const tt = 4.2 * s; return f(tt, Math.max(-2.5, Math.min(4.5, F47(tt)[0] + lam * Math.exp(A47 * tt) * Math.sin(2 * Math.PI * tt)))); }, 300, C.red, mq, 3); lbl('F + λ e^(at) sin 2πt', 1330, 450, C.red, mq, 18, 'left'); }
  eqn('F_k(t+2) = F_k(t+1) + F_k(t)  for all real t', 1450, 600, Q(S, 0, 'obeys the recurrence'), C.gold, 20);
  chip(1450, 700, 520, 54, 'interpolation is a choice', C.red, Q(S, 1, 'is a choice'), 22);
};

/* ---- 08 MODES ---- */
SCENES.modes = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Half on empty', 0.6);
  const rows = [['[null]', '(0,0)', '0', C.white], ['[2]', '(1,0)', '2', C.cyan], ['[5]', '(1,1)', '5', C.mag], ['[25]', '(2,1)', '7', C.green], ['[3]', '(0,1)', '3', C.gold]];
  lbl('mode   composition   quantity', 600, 240, C.dim, s0, 20);
  rows.forEach(([m, c, qn, col], k) => { const q = Q(S, 0, 'quantities zero', 0.5, k * 0.3), y = 290 + k * 56; box(380, y - 30, 440, 50, col, q * 0.6, 1.2, 'rgba(0,0,0,0.35)'); lbl(m, 450, y + 6, col, q, 22); lbl(c, 600, y + 6, C.white, q, 22); lbl(qn, 760, y + 6, C.gold, q, 24); });
  eqn('f̄_p(t) = u F(t+3) + v F(t+4)', 1350, 260, Q(S, 0, 'the whole mean curve'), C.cyan, 28);
  lbl('u = X + Y ,  v = Y + Z', 1350, 315, C.dim, Q(S, 0, 'the whole mean curve'), 20);
  chip(1350, 420, 520, 54, 'two numbers decide the curve', C.gold, Q(S, 1, 'Two numbers'), 22);
  lbl('invisible 2D fibre: g_y , g_κ', 1350, 490, C.red, Q(S, 1, 'two-dimensional fibre'), 20);
  const cq = Q(S, 1, 'Half on empty', 0.6, 0.3);
  if (cq > 0) {
    const f = frame47(380, 840, 700, 300, 0, 3, 0, 10);
    curve(s => { const tt = 3 * s; return f(tt, 0.5 * F47(tt + 3)[0] + 0.5 * F47(tt + 4)[0]); }, 200, C.cyan, cq, 5);
    curve(s => { const tt = 3 * s; return f(tt, 0.5 * F47(tt + 3)[0] + 0.5 * F47(tt + 4)[0]); }, 200, C.mag, Q(S, 1, 'against half on two'), 2);
    lbl('μ_A = ½[null] + ½[5]', 1350, 620, C.cyan, cq, 22); lbl('μ_B = ½[2] + ½[3]', 1350, 670, C.mag, Q(S, 1, 'against half on two'), 22);
    lbl('(u, v) = (½, ½) for both', 1350, 730, C.gold, Q(S, 1, 'same curve forever'), 22);
  }
};

/* ---- 09 REPLY ---- */
SCENES.reply = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, 'Lean has frozen', 'lean']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'A native null window', 0.6);
  if (fade > 0) {
    const rows = [['[null]', '5', C.white], ['[2]', '⊥', C.cyan], ['[5]', '26', C.mag], ['[25]', '⊥', C.green], ['[3]', '18', C.gold]];
    rows.forEach(([m, r, col], k) => { const q = Q(S, 0, 'the replies are', 0.5, k * 0.4) * fade, y = 280 + k * 62; box(420, y - 32, 420, 54, col, q * 0.6, 1.2, 'rgba(0,0,0,0.35)'); lbl(m, 520, y + 6, col, q, 22); lbl('→ ' + r, 720, y + 6, r === '⊥' ? C.red : C.cyan, q, 24); });
    lbl('continue with window [5]', 630, 230, C.dim, Q(S, 0, 'Continuing with') * fade, 20);
    lbl('μ_A → ½·5 + ½·26', 1350, 330, C.cyan, Q(S, 0, 'separates them') * fade, 24); lbl('μ_B → ½·⊥ + ½·18', 1350, 390, C.mag, Q(S, 0, 'separates them') * fade, 24);
    chip(1350, 500, 560, 54, 'curve + reply law → all five p', C.green, Q(S, 0, 'recovers all five') * fade, 22);
  }
  const q = Q(S, 1, 'A native null window', 0.6, 0.3);
  if (q > 0) {
    eqn('Δ mean after [null] = ε q M³ (1, ψ)ᵀ = ε ψ³ (2 + 3ψ)', 960, 300, q, C.gold, 26);
    lbl('ε = 1/20 :  Δ ≈ −0.00172 ≠ 0', 960, 360, C.white, Q(S, 1, 'differ by'), 22);
    const lq = Q(S, 1, 'Lean has frozen', 0.6);
    box(300, 470, 1320, 150, C.green, lq, 2, 'rgba(0,30,15,0.65)');
    lbl('LEAN · NativeContinuation.JointLaw.native_reply_injective', 960, 515, C.green, lq, 20);
    lblG('∀ n,  Function.Injective (reply : Source n → ℕ)', 960, 565, C.white, Q(S, 1, 'at each length'), 24);
    lbl('reply = quantity after one appended null window', 960, 600, C.dim, Q(S, 1, 'separates every legal'), 18);
  }
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['STRETCH', 'φ , φ⁻¹', C.gold, 'pair of stretches'], ['REFLECT', '(−1)ⁿ', C.cyan, 'is a reflection'], ['PHASE', 'e^(−iπt)', C.mag, 'the phase in between'], ['SHADOW', 'Re of a 3D flow', C.green, 'one projection']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 28); lblG(a2, x, 350, C.white, q, 24); });
    lbl('LEAN · NativeContinuation.JointLaw.native_reply_injective', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 24);
    lbl('VOLUME · continuous lift · obstruction · fibres · replies   CLASSICAL · Binet · Cassini', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 20);
    lbl('RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'every number') * fade, 24);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, v = v3(W / 2, 420, 80, 0.5 + t * 0.2, 0.35, [0.6, 0, 0]);
    curve(s => { const tt = -1.6 + 3.3 * s; const p = T3(tt, 0.8, 1.3, 0); return v(...p); }, 200, C.cyan, a * 0.9, 3);
    txt('AURIC FIB ATOM PYRAMID XVIII', W / 2, 680, { size: 66, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XVIII · 双曲几何与相位边界 · TRURETURING FILM 047', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Continuity fills the path, not the source.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'BETWEEN THE STEPS', binet: 'A COMPLEX CURVE', step: 'MIRROR AND STRETCH', obstruction: 'NO REAL HALF STEP', lift: 'THE THIRD DIMENSION', shadow: 'THE REAL SHADOW', branches: 'MANY INTERPOLATIONS', modes: 'THE MEAN CURVE', reply: 'THE NATIVE REPLY', finale: 'LEDGER' });

function poster47() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const v = v3(560, 520, 130, 0.9, 0.4, [0.6, 0, 0]);
  axes3(v, 2.6, 0.8, ['X', 'Y', 'Z']);
  curve(s => { const tt = -1.6 + 3.6 * s; const p = T3(tt, 0.8, 1.3, 0); return v(...p); }, 260, C.cyan, 1, 4);
  for (let n = -1; n <= 1; n++) { const q = v(...T3(n, 0.8, 1.3, 0)); dot(q[0], q[1], 14, 'g', 1); }
  txt('M = S · e^(aS)', 1360, 300, { size: 40, fam: FG, w: 700, align: 'center', c: C.white });
  txt('sinh a = ½ ,  cosh a = √5/2', 1360, 390, { size: 34, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('det U(t) = e^(−iπt)', 1360, 480, { size: 36, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('real flow: dimension 3', 1360, 570, { size: 34, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('FIB 原子金字塔 XVIII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XVIII', W / 2, 890, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('伸 缩 · 反 射 · 相 位 · 影 子', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 047', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster47;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
