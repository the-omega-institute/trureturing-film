/* Film 062 */

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

/* ---- film 062: occlusion, second projection, local recovery ---- */
const _po62 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po62.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po62.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: s.includes('½') ? FG : F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function rect62(x, y, w, h, col, a, lw = 1.5) { strokePoly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a, lw); }
const MODES62 = [['∅', [0, 0, 0], 'n', '000'], ['[2]', [1, 0, 0], 'c', '100'], ['[3]', [0, 0, 1], 'g', '010'], ['[5]', [0, 1, 0], 'o', '001'], ['[2,5]', [1, 1, 0], 'm', '101']];
const PEDGE62 = [[0, 1], [1, 4], [4, 3], [3, 0], [0, 2], [1, 2], [3, 2], [4, 2]];
function pyr62(cx, cy, s, ang, a, opt = {}) {
  if (a <= 0) return null;
  const v = v3(cx, cy, s, ang, 0.38), W3 = p => v(p[0] - 0.5, p[1] - 0.5, p[2] - 0.35);
  const P = MODES62.map(m => W3(m[1]));
  if (opt.fillBase) fillPoly([P[0], P[1], P[4], P[3]], C.cyan, a * 0.12);
  PEDGE62.forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], C.cyan, a * 0.8, 1.8));
  if (opt.labels !== false) MODES62.forEach((m, k) => { dot(P[k][0], P[k][1], 11, m[2], a); lbl(opt.bits ? m[3] : m[0], P[k][0] + (k === 2 ? 0 : 28), P[k][1] + (k === 2 ? -20 : 8), C.white, a * (opt.lab == null ? 1 : opt.lab), 18, k === 2 ? 'center' : 'left'); });
  return W3;
}
/* a soft node: ring plus a pearl whose size and glow follow the value */
function soft62(x, y, v, a, col = C.cyan, nm = 'c', lab = null, r = 24) {
  if (a <= 0) return;
  ring(x, y, r, col, a * 0.8, 2);
  if (v > 0.001) dot(x, y, r * (0.35 + 0.6 * Math.sqrt(v)), nm, a * (0.35 + 0.65 * v));
  if (lab != null) lbl(lab, x, y + r + 26, C.white, a, 18);
}
/* three atoms carrying 2, 3, 5 */
function atoms62(x, y, bits, a, sp = 90, r = 24, vals = true) {
  const nm = ['c', 'g', 'o'], v = ['2', '3', '5'];
  for (let i = 0; i < 3; i++) { const xx = x + i * sp; if (i) line(xx - sp + r, y, xx - r, y, C.dim, a * 0.7, 2); ring(xx, y, r, C.dim, a * 0.8, 2); if (bits[i]) dot(xx, y, r * 0.95, nm[i], a); if (vals) lbl(v[i], xx, y + 7, bits[i] ? '#06121c' : C.dim, a, Math.round(r * 0.8)); }
}
/* a regular k-gon blended with its inscribed disk: (1 - tau) P_k (+) tau rho D, circumradius R px */
function blend62(cx, cy, R, k, tau, col, a, lw = 2.5, fill = 0, dash = false, rot = -Math.PI / 2) {
  if (a <= 0) return;
  const rho = R * Math.cos(Math.PI / k), r = tau * rho, Rv = (1 - tau) * R;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([10, 8]);
  ctx.beginPath();
  for (let i = 0; i < k; i++) { const th = rot + TAU * i / k, vx = cx + Rv * Math.cos(th), vy = cy + Rv * Math.sin(th); ctx.arc(vx, vy, Math.max(r, 0.01), th - Math.PI / k, th + Math.PI / k); }
  ctx.closePath();
  if (fill) { ctx.fillStyle = col; ctx.globalAlpha = a * fill; ctx.fill(); ctx.globalAlpha = a; }
  ctx.stroke(); ctx.restore();
}

function eqnG(s, x, y, a, col = C.white, size = 28) { txt(s, x, y, { size, fam: FG, w: 700, align: 'center', c: col, a }); }
const NM62 = ['∅', '[2]', '[3]', '[5]', '[2,5]'], DOT62 = ['n', 'c', 'g', 'o', 'm'];
/* five state nodes in a row */
function row62(x0, y, sp, a, opt = {}) {
  const P = NM62.map((s, i) => [x0 + i * sp, y]);
  P.forEach((p, i) => { ring(p[0], p[1], 26, C.cyan, a * 0.8, 2); dot(p[0], p[1], 14, DOT62[i], a * (opt.dim ? 0.4 : 1)); lbl(s62n(i), p[0], p[1] + 54, C.white, a, 20); });
  return P;
}
function s62n(i) { return NM62[i]; }
/* signed bars above a row of nodes */
function sbars62(P, v, y0, hs, a, col, labels = false) {
  v.forEach((x, i) => { if (Math.abs(x) < 1e-9) { line(P[i][0] - 22, y0, P[i][0] + 22, y0, C.dim, a, 2); return; } const h = x * hs; fillBox(P[i][0] - 22, h > 0 ? y0 - h : y0, 44, Math.abs(h), x > 0 ? col : C.red, a * 0.5); rect62(P[i][0] - 22, h > 0 ? y0 - h : y0, 44, Math.abs(h), x > 0 ? col : C.red, a, 2); if (labels) lbl((x > 0 ? '+' : '') + x, P[i][0], h > 0 ? y0 - h - 12 : y0 - h + 26, C.white, a, 18); });
}
/* curved arrow between two row nodes */
function arc62(p, q, col, a, up = 1, hgt = 60) {
  if (a <= 0) return;
  if (Math.abs(p[0] - q[0]) < 1) { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(p[0], p[1] - up * 44, 16, 0, TAU * 0.85); ctx.stroke(); ctx.restore(); return; }
  const mx = (p[0] + q[0]) / 2, my = p[1] - up * (hgt + Math.abs(q[0] - p[0]) * 0.18);
  curve(z => [(1 - z) * (1 - z) * p[0] + 2 * z * (1 - z) * mx + z * z * q[0], (1 - z) * (1 - z) * (p[1] - up * 28) + 2 * z * (1 - z) * my + z * z * (q[1] - up * 28)], 30, col, a, 2.5);
  const tx = q[0] - (q[0] - mx) * 0.12, ty = (q[1] - up * 28) - ((q[1] - up * 28) - my) * 0.12; arrow(tx, ty, q[0], q[1] - up * 28, col, a, 2.5);
}

/* five signed bars over the five states, labelled */
function vec62(x0, y0, v, bw, gap, hs, a, col, title, labels = true) {
  if (a <= 0) return;
  v.forEach((x, i) => { const xx = x0 + i * (bw + gap); line(xx - 4, y0, xx + bw + 4, y0, C.dim, a, 1.2); if (Math.abs(x) > 1e-9) { const h = x * hs; fillBox(xx, h > 0 ? y0 - h : y0, bw, Math.abs(h), x > 0 ? col : C.red, a * 0.5); rect62(xx, h > 0 ? y0 - h : y0, bw, Math.abs(h), x > 0 ? col : C.red, a, 1.8); } if (labels) lbl(NM62[i], xx + bw / 2, y0 + (x < 0 ? Math.abs(x) * hs + 26 : 26), C.dim, a, 15); });
  if (title) lblG(title, x0 + 2.5 * (bw + gap) - gap / 2, y0 - Math.max(...v.map(x => Math.max(x, 0))) * hs - 22, col, a, 22);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  pyr62(480, 440, 270, 0.6 + t * 0.2, s0, { fillBase: true });
  const rq = Q(S, 0, 'when a blocked ray becomes a second projection', 0.6), ph = (t * 0.7) % 1;
  dot(1000, 420, 18, 'o', s0); line(1018, 420, 1018 + 300 * Math.min(1, ph * 1.4), 420, C.gold, s0, 4); fillBox(1330, 330, 22, 180, C.dim, s0 * 0.6);
  box(1400, 360, 200, 120, C.green, rq, 2.5, 'rgba(0,0,0,0.5)'); lbl('W = Z + κ', 1500, 428, C.green, rq, 22);
  chip(1190, 620, 460, 62, 'second projection', C.green, rq, 24);
  chip(1690, 620, 400, 62, 'recover the law', C.cyan, Q(S, 0, 'when two projections recover the whole law'), 24);
  chip(1440, 710, 520, 62, 'change = seen + hidden', C.mag, Q(S, 0, 'how a local change splits'), 24);
  lblG('recovery  =  the reading becomes injective', 1440, 840, C.gold, Q(S, 1, 'the reading becomes injective', 0.6), 28);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr62(W / 2, 400, 260, 0.5 + t * 0.25, rp, { fillBase: true, lab: 0.6 });
  const ph = (t * 0.6) % 1; dot(260, 420, 16, 'o', rp); line(276, 420, 276 + 220 * Math.min(1, ph * 1.4), 420, C.gold, rp, 4); fillBox(510, 320, 20, 200, C.dim, rp * 0.6);
  box(1420, 330, 240, 90, C.cyan, rp, 2, 'rgba(0,0,0,0.4)'); lbl('P = (X, Y, Z)', 1540, 385, C.cyan, rp, 20);
  box(1420, 450, 240, 90, C.green, rp, 2, 'rgba(0,0,0,0.4)'); lbl('Q = (X, Y, W)', 1540, 505, C.green, rp, 20);
  txt(scramble('AURIC FIB ATOM PYRAMID XXXIII', rp, 462), W / 2, 760, { size: 74, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XXXIII · 遮 挡 、 第 二 投 影 与 局 部 恢 复', W / 2, 835, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 062 · OCCLUSION_SECOND_PROJECTION_AND_LOCAL_RECOVERY + LOCAL_SOURCE_SPLITTING', W / 2, 115, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 SQUARE ---- */
SCENES.square = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory']);
  const s0 = clamp(u), sq = Q(S, 0, 'The base of the pyramid closes a square loop', 0.6);
  const B = { 0: [320, 720], 2: [620, 720], 25: [620, 420], 5: [320, 420] }, nm = { 0: '∅', 2: '[2]', 25: '[2,5]', 5: '[5]' }, dn = { 0: 'n', 2: 'c', 25: 'm', 5: 'o' };
  [[0, 2], [2, 25], [25, 5], [5, 0]].forEach(([a, b]) => line(B[a][0], B[a][1], B[b][0], B[b][1], C.cyan, sq, 2.5));
  const lq = Q(S, 0, 'null plus the joint mode equals two plus five', 0.6);
  line(B[0][0], B[0][1], B[25][0], B[25][1], C.mag, lq, 3); line(B[2][0], B[2][1], B[5][0], B[5][1], C.gold, lq, 3); dot(470, 570, 12, 'w', lq);
  Object.keys(B).forEach(k => { dot(B[k][0], B[k][1], 16, dn[k], sq); lbl(nm[k], B[k][0] + (k === '0' || k === '5' ? -44 : 50), B[k][1] + 8, C.white, sq, 22); });
  lblG('v∅ + v[2,5] = v[2] + v[5]', 470, 330, C.white, lq, 26);
  const dq = Q(S, 0, 'That loop generates the hidden direction d', 0.6);
  vec62(820, 560, [1, -1, 0, -1, 1], 44, 14, 70, dq, C.mag, 'd');
  lbl('P d = 0', 960, 700, C.green, Q(S, 0, 'X, Y and Z stay fixed', 0.6), 22);
  const fq = Q(S, 0, 'each fibre is a segment', 0.6), lo = 0.1, hi = 0.4, k = 0.25 + 0.15 * Math.sin(t * 1.2);
  line(1240, 600, 1700, 600, C.dim, fq, 2); line(1240 + lo / 0.5 * 460, 600, 1240 + hi / 0.5 * 460, 600, C.mag, fq, 8);
  dot(1240 + k / 0.5 * 460, 600, 14, 'w', fq); lbl('κ', 1240 + k / 0.5 * 460, 570, C.white, fq, 22);
  lbl('κ− = max(0, X+Y+Z−1)', 1240 + lo / 0.5 * 460, 650, C.mag, fq, 18); lbl('κ+ = min(X, Y)', 1240 + hi / 0.5 * 460, 690, C.mag, fq, 18);
  lbl('X = 0.5, Y = 0.4, Z = 0.2', 1470, 520, C.dim, fq, 18);
  const aq = Q(S, 0, 'The apex three lifts the base', 0.6);
  pyr62(1470, 360, 150, 0.6 + t * 0.2, aq, { fillBase: true, lab: 0.8 });
};

/* ---- 03 SECOND ---- */
SCENES.second = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'So X, Y, Z and W together invert exactly', 0.6);
  if (f1 > 0) {
    const pq = Q(S, 0, 'adds a second projection', 0.6) * f1;
    box(260, 290, 360, 80, C.cyan, s0 * f1, 2, 'rgba(0,0,0,0.4)'); lblG('P = (X, Y, Z)', 440, 342, C.cyan, s0 * f1, 26);
    box(260, 400, 360, 80, C.green, pq, 2, 'rgba(0,0,0,0.4)'); lblG('Q = (X, Y, W)', 440, 452, C.green, pq, 26);
    lblG('W = Z + κ', 440, 530, C.green, pq, 24);
    vec62(760, 470, [1, -1, 0, -1, 1], 44, 12, 70, s0 * f1, C.cyan, 'ker P : d');
    vec62(1150, 470, [2, -1, -1, -1, 1], 44, 12, 70, Q(S, 0, 'Its blind direction is e', 0.6) * f1, C.green, 'ker Q : e');
    lblG('Q d = (0, 0, 1)', 960, 700, C.gold, Q(S, 0, 'while it reads d as zero, zero, one', 0.6) * f1, 30);
    lblG('ker P ∩ ker Q = {0}  on normalized differences', 960, 780, C.white, Q(S, 0, 'the two blind directions meet only at zero', 0.6) * f1, 26);
  }
  const q = Q(S, 1, 'So X, Y, Z and W together invert exactly', 0.6, 0.3);
  if (q > 0) {
    lblG('Φ = (X, Y, Z, W)  is injective', 960, 300, C.white, q, 30);
    [['p[2,5] = W − Z', C.mag], ['p[3] = Z', C.green], ['p[2] = X − W + Z', C.cyan], ['p[5] = Y − W + Z', C.gold], ['p∅ = 1 − X − Y − 2Z + W', C.dim]].forEach(([s, col], i) => lblG(s, 700, 380 + i * 56, col, Q(S, 1, i === 0 ? 'kappa is W minus Z' : 'the other four probabilities follow', 0.5, i * 0.25), 26));
    const sq = Q(S, 1, 'Both readings must come from the same law', 0.6);
    chip(1420, 420, 480, 64, 'same law · same period', C.green, sq, 24);
    box(1220, 520, 180, 70, C.cyan, Q(S, 1, 'a reading taken before an interaction', 0.6), 2, 'rgba(0,0,0,0.4)'); lbl('P before', 1310, 562, C.cyan, Q(S, 1, 'a reading taken before an interaction', 0.6), 20);
    box(1440, 520, 180, 70, C.gold, Q(S, 1, 'with one taken after', 0.6), 2, 'rgba(0,0,0,0.4)'); lbl('W after', 1530, 562, C.gold, Q(S, 1, 'with one taken after', 0.6), 20);
    stamp('NO SPLICING', 1420, 680, Q(S, 1, 'cannot simply be spliced', 0.6), C.red, 44, -0.05);
  }
  void t;
};

/* ---- 04 RECOVER ---- */
SCENES.recover = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Samples and laws differ', 0.6);
  if (f1 > 0) {
    const a = s0 * f1, Cs = [0, 1, 2, 3, 4].map(i => [420, 330 + i * 100]), Os = [0, 1, 2, 3].map(i => [900, 360 + i * 110]), map = [0, 1, 2, 2, 3];
    lbl('target histories C', 420, 290, C.white, a, 20); lbl('observations', 900, 300, C.white, a, 20);
    Cs.forEach((p, i) => { const bad = map[i] === 2; dot(p[0], p[1], 14, bad ? 'r' : 'c', a); arrow(p[0] + 18, p[1], Os[map[i]][0] - 20, Os[map[i]][1], bad ? C.red : C.green, a, 2.5); });
    Os.forEach(p => dot(p[0], p[1], 14, 'w', a));
    lbl('one fibre, two histories', 1060, 580, C.red, Q(S, 0, 'Different histories in one observation fibre', 0.6) * f1, 22, 'left');
    lblG('R ∘ O|_C = id_C   ⇔   O injective on C', 1400, 380, C.gold, Q(S, 0, 'exists exactly when the readout is injective', 0.6) * f1, 28);
  }
  const q = Q(S, 1, 'Samples and laws differ', 0.6, 0.3);
  if (q > 0) {
    const sym = [0, 2, 3, 5, 7], seq = [2, 0, 7, 3, 0, 5, 2, 7, 0, 3], nm = { 0: '∅', 2: '[2]', 3: '[3]', 5: '[5]', 7: '[2,5]' };
    const sq = Q(S, 1, 'Each sample of the weight q', 0.6);
    seq.forEach((v, i) => { const x = 300 + i * 100, qq = sq * clamp((S.u - lineAt(S, 1).s - 1 - i * 0.2) / 0.3); box(x, 330, 80, 60, C.cyan, qq, 2, 'rgba(0,0,0,0.4)'); lbl(String(v), x + 40, 370, C.white, qq, 26); lbl(nm[v], x + 40, 420, C.cyan, Q(S, 1, 'names every symbol', 0.6), 18); });
    lbl('average q̄ : loses the joint part', 760, 480, C.gold, Q(S, 1, 'only the average loses the joint part', 0.6), 22);
    void sym;
    const bq = Q(S, 1, 'Yet one sample of x y', 0.6), b1 = Math.sin(t * 5) > 0.2 ? 1 : 0, b2 = Math.sin(t * 4 + 1) > 0.2 ? 1 : 0;
    [['κ = 1/8', b1, C.cyan, 1400], ['κ = 1/4', b2, C.mag, 1700]].forEach(([s, b, col, x]) => { box(x - 110, 560, 220, 160, col, bq, 2, 'rgba(0,0,0,0.4)'); lblG(s, x, 600, col, bq, 24); lbl('xy sample : ' + b, x, 680, C.white, bq, 22); });
    lbl('both laws can give 0 and 1', 1550, 780, C.red, Q(S, 1, 'cannot tell kappa one eighth from one quarter', 0.6), 22);
  }
};

/* ---- 05 OUTCOMES ---- */
SCENES.outcomes = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const items = [
    ['FREE ESCAPE', 'same fibre', C.red, 0, 'A ray that escapes freely'],
    ['EARLY DETECTOR', 'second projection', C.green, 0, 'A detector placed in advance'],
    ['COHERENT REFLECTOR', 'readable record', C.cyan, 0, 'A coherent reflector'],
    ['THERMALIZING ABSORBER', 'coarse temperature', C.orange, 1, 'An absorber that thermalizes'],
    ['INACCESSIBLE ENVIRONMENT', 'equal local outputs', C.vio, 1, 'inaccessible environment']];
  items.forEach(([a1, a2, col, ln, ph], i) => {
    const x = 240 + i * 360, q = Q(S, ln, ph, 0.6), ph2 = (t * 0.7 + i * 0.2) % 1;
    box(x - 160, 300, 320, 380, col, q, 2.5, 'rgba(0,0,0,0.45)');
    dot(x - 110, 440, 12, 'o', q); line(x - 98, 440, x - 98 + 120 * Math.min(1, ph2 * 1.5), 440, C.gold, q, 3);
    if (i === 0) { arrow(x + 30, 440, x + 140, 440, C.red, q, 2.5); }
    if (i === 1) { box(x + 30, 400, 90, 80, C.green, q, 2, 'rgba(77,255,166,0.15)'); lbl('W', x + 75, 448, C.green, q, 22); }
    if (i === 2) { fillBox(x + 30, 380, 16, 120, C.cyan, q * 0.7); arrow(x + 24, 470, x - 60, 520, C.cyan, q, 2); box(x - 120, 510, 100, 50, C.cyan, q, 1.5); }
    if (i === 3) { for (let k = 0; k < 14; k++) dot(x + 40 + (k % 5) * 20, 400 + Math.floor(k / 5) * 26 + 6 * Math.sin(t * 3 + k), 5, 'o', q); lbl('Θ', x + 80, 520, C.orange, q, 26); }
    if (i === 4) { ell62(x + 70, 440, 70, 50, C.vio, q, 2, true); lbl('E', x + 70, 448, C.vio, q, 22); }
    lbl(a1, x, 600, col, q, 17); lbl(a2, x, 640, C.white, q, 20);
  });
  void s0;
};
function ell62(x, y, rx, ry, col, a, lw = 2, dash = false) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }

/* ---- 06 ARROW ---- */
SCENES.arrow = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'A new record from an obstacle', 0.6) * 0.5;
  const parts = [[[0, 1], [2], [3, 4], [5], [6, 7], [8], [9, 10], [11]], [[0, 1, 2], [3, 4], [5, 6, 7], [8, 9, 10, 11]], [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]]];
  const cols = [C.cyan, C.gold, C.mag];
  parts.forEach((pt, r) => { const y = 340 + r * 150, q = (r === 0 ? s0 : Q(S, 0, r === 1 ? 'So if each record is a function of the previous one' : 'indistinguishability only grows', 0.6)) * f1; lblG('M' + ['₀', '₁', '₂'][r], 240, y + 8, cols[r], q, 26, 'right'); for (let i = 0; i < 12; i++) dot(300 + i * 60, y, 10, 'w', q); pt.forEach(g => { const x0 = 300 + g[0] * 60 - 22, x1 = 300 + g[g.length - 1] * 60 + 22; strokePoly([[x0, y - 22], [x1, y - 22], [x1, y + 22], [x0, y + 22]], cols[r], q, 2); }); if (r) arrow(1030, y - 120, 1030, y - 30, C.dim, q, 2); if (r) lbl('G' + ['', '₀', '₁'][r], 1060, y - 70, C.dim, q, 20, 'left'); });
  lblG('∼₀ ⊆ ∼₁ ⊆ ∼₂', 520, 800, C.white, Q(S, 0, 'indistinguishability only grows', 0.6) * f1, 30);
  const lq = Q(S, 0, 'Lean has frozen that one readout factors through another', 0.6);
  lblG('q factors through r  ⇔  r x = r y ⇒ q x = q y', 1450, 330, C.white, lq * f1, 22);
  lbl('LEAN · InterfaceKernelCriterion.interface_refinement_iff_kernel_inclusion', 1450, 380, C.green, lq * f1, 13);
  const kq = Q(S, 0, 'whatever is known from a later readout', 0.6);
  lbl('later factors through earlier : knows later ⇒ knew earlier', 1450, 450, C.white, kq * f1, 17);
  lbl('LEAN · TwoTimeKnowledge.knows_of_later_readout_factors_through_earlier', 1450, 490, C.green, kq * f1, 13);
  const q = Q(S, 1, 'A new record from an obstacle', 0.6, 0.3);
  if (q > 0) {
    const y = 640, b = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0];
    lbl('(G(M), b)', 1240, y - 50, C.green, q, 22);
    for (let i = 0; i < 12; i++) { const x = 1240 + (i - 5.5) * 50; dot(x, y, 9, b[i] ? 'g' : 'w', q); lbl(String(b[i]), x, y + 34, C.green, q, 16); }
    lbl('splits a merged pair · may lose others · equality allowed', 1240, y + 80, C.gold, Q(S, 1, 'though it can still lose other distinctions', 0.6), 18);
    chip(1240, 790, 560, 60, 'effective arrow · not a law of physics', C.mag, Q(S, 1, "an observer's effective arrow of time", 0.6), 20);
  }
  void t;
};

/* ---- 07 SPLIT ---- */
SCENES.split = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'And a feasible change can split', 0.6);
  if (f1 > 0) {
    const v = [-0.6, 0.3, 0.2, 0.4, -0.3], b = [0.3 - 0.3, 0.4 - 0.3, 0.2];
    const Xd = v[1] + v[4], Yd = v[3] + v[4], Zd = v[2], hor = [-Xd - Yd - Zd, Xd, Zd, Yd, 0], hid = [v[4], -v[4], 0, -v[4], v[4]];
    void b;
    const gq = Q(S, 0, 'Now split a local change v', 0.6) * f1;
    vec62(260, 470, v, 40, 12, 160, gq, C.white, 'v');
    lblG('=', 590, 470, C.white, Q(S, 0, 'v is its seen part', 0.6) * f1, 40);
    vec62(640, 470, hor, 40, 12, 160, Q(S, 0, 'v is its seen part', 0.6) * f1, C.cyan, 'L(P v)');
    lblG('+', 970, 470, C.white, Q(S, 0, 'plus its kappa derivative times d', 0.6) * f1, 40);
    vec62(1020, 470, hid, 40, 12, 160, Q(S, 0, 'plus its kappa derivative times d', 0.6) * f1, C.mag, 'κ′ d');
    const cq = Q(S, 0, 'Change the section', 0.6) * f1;
    lblG("a′ = κ′ − ℓ₀(P v)", 1600, 360, C.gold, cq, 28);
    const eq = Q(S, 0, 'moving mass from null to two', 0.6) * f1;
    vec62(1460, 700, [-1, 1, 0, 0, 0], 40, 10, 70, eq, C.cyan, 'e[2] − e∅');
    lbl("κ′ = 0", 1600, 790, C.green, eq, 22); lbl("section L + d·Ẋ : a′ = −1", 1600, 830, C.red, Q(S, 0, 'yet another section reports minus one', 0.6) * f1, 20);
  }
  const q = Q(S, 1, 'And a feasible change can split', 0.6, 0.3);
  if (q > 0) {
    lblG('at the joint mode  p = e[2,5]', 960, 300, C.white, q, 28);
    vec62(260, 520, [0, 1, 0, 0, -1], 50, 14, 110, q, C.green, 'v = e[2] − e[2,5] : feasible');
    vec62(760, 520, [1, 0, 0, -1, 0], 50, 14, 110, Q(S, 1, 'its seen part takes mass from five', 0.6), C.cyan, 'seen : e∅ − e[5]');
    vec62(1260, 520, [-1, 1, 0, 1, -1], 50, 14, 110, Q(S, 1, 'its hidden part takes mass from null', 0.6), C.mag, 'hidden : −d');
    ring(760 + 3 * 64 + 25, 600, 34, C.red, Q(S, 1, 'its seen part takes mass from five', 0.6), 3); lbl('[5] empty', 760 + 3 * 64 + 25, 690, C.red, Q(S, 1, 'its seen part takes mass from five', 0.6), 18);
    ring(1260 + 25, 600, 34, C.red, Q(S, 1, 'its hidden part takes mass from null', 0.6), 3); lbl('∅ empty', 1260 + 25, 690, C.red, Q(S, 1, 'its hidden part takes mass from null', 0.6), 18);
    lbl('both parts infeasible alone', 960, 780, C.gold, Q(S, 1, 'both empty', 0.6), 24);
  }
  void t;
};

/* ---- 08 TIME ---- */
SCENES.time = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'Hidden and seen responses can also cancel', 0.6);
  if (f1 > 0) {
    const px = 360, py = 560, pw = 900, ph = 200, gq = Q(S, 0, 'Along the loop', 0.6) * f1;
    plotAxes(px, py + ph / 2, pw, ph * 1.1, gq, 'λ  (0 → 2π)', 'E[xy]');
    line(px, py, px + pw, py, C.dim, gq, 1.5); lbl('0.2', px - 30, py + 6, C.dim, gq, 16, 'right');
    const prog = clamp((S.u - lineAt(S, 0).s - (lineAt(S, 0).e - lineAt(S, 0).s) * 0.4) / 3);
    curve(z => [px + z * prog * pw, py - ph * 0.45 * Math.sin(z * prog * TAU)], 80, C.mag, gq, 3);
    const iq = Q(S, 0, 'its integral around the loop is zero', 0.6) * f1;
    for (let k = 0; k < 60; k++) { const z = (k + 0.5) / 60, s = Math.sin(z * TAU); fillBox(px + z * pw - 7, s > 0 ? py - ph * 0.45 * s : py, 14, Math.abs(ph * 0.45 * s), s > 0 ? C.cyan : C.red, iq * 0.35); }
    lblG('∮ d E[xy] = 0', 1500, 460, C.gold, iq, 32);
    lbl('rises and falls', 1500, 540, C.white, Q(S, 0, 'rises and falls', 0.6) * f1, 22);
    lblG('p̄ + ε sin λ · d', 1500, 360, C.white, gq, 28);
  }
  const q = Q(S, 1, 'Hidden and seen responses can also cancel', 0.6, 0.3);
  if (q > 0) {
    lblG('v = e[2,5] − e∅ ,   K = x − xy', 960, 320, C.white, q, 28);
    [['seen', 1, C.cyan, 'gains one through the seen part'], ['hidden', -1, C.mag, 'loses one through the hidden part'], ['total', 0, C.gold, 'so its total change is zero']].forEach(([s, v, col, ph], i) => { const x = 600 + i * 360, qq = Q(S, 1, ph, 0.6), y0 = 600; line(x - 80, y0, x + 80, y0, C.dim, qq, 2); if (v) { fillBox(x - 50, v > 0 ? y0 - 160 : y0, 100, 160, v > 0 ? col : C.red, qq * 0.5); rect62(x - 50, v > 0 ? y0 - 160 : y0, 100, 160, v > 0 ? col : C.red, qq, 2); } lbl(s, x, y0 + (v < 0 ? 200 : 40), col, qq, 24); lblG((v > 0 ? '+' : '') + v, x, v > 0 ? y0 - 180 : (v < 0 ? y0 + 240 : y0 - 20), C.white, qq, 30); });
  }
  void t;
};

/* ---- 09 PORT ---- */
SCENES.port = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), f1 = 1 - Q(S, 1, 'But a response alone', 0.6);
  if (f1 > 0) {
    const px = 360, py = 780, pw = 700, ph = 440, gq = Q(S, 0, 'one exact reading K', 0.6) * f1;
    plotAxes(px, py, pw, ph, gq, 'κ', 'τ_K');
    line(px, py - 80, px + pw, py - 380, C.cyan, gq, 3); lbl('slope = Δ₁₃K', px + pw - 40, py - 400, C.cyan, gq, 20, 'right');
    const eq = Q(S, 0, 'an error epsilon in the expectation', 0.6) * f1, k = 0.55, ty = py - 80 - 300 * k;
    fillBox(px, ty - 30, pw, 60, C.gold, eq * 0.15); line(px + k * pw - 70, py, px + k * pw - 70, ty - 30, C.gold, eq, 1.5); line(px + k * pw + 70, py, px + k * pw + 70, ty + 30, C.gold, eq, 1.5);
    lbl('ε', px - 20, ty + 6, C.gold, eq, 22, 'right'); lbl('ε / |Δ₁₃K|', px + k * pw, py + 34, C.gold, eq, 20);
    lblG('separates κ  ⇔  Δ₁₃K ≠ 0', 1450, 420, C.white, Q(S, 0, 'separates kappa exactly when', 0.6) * f1, 28);
    lblG('|κ̂ − κ| ≤ ε / |Δ₁₃K|', 1450, 520, C.gold, eq, 28);
  }
  const q = Q(S, 1, 'But a response alone', 0.6, 0.3);
  if (q > 0) {
    lblG('response pair  a · (u, c)', 960, 330, C.white, q, 30);
    const r = 1.6 + 0.6 * Math.sin(t * 1.3);
    [['source a', 0.4, 0.4 * r, C.mag], ['sensitivity u', 1.0, 1.0 / r, C.cyan], ['sensitivity c', 0.7, 0.7 / r, C.green]].forEach(([s, v0, v1, col], i) => { const x = 520 + i * 170, y0 = 700, cq = Q(S, 1, 'scaling the source by r', 0.6); fillBox(x - 30, y0 - v0 * 200, 60, v0 * 200, col, q * 0.45); rect62(x - 30, y0 - v0 * 200, 60, v0 * 200, col, q, 2); fillBox(x + 680 - 30, y0 - v1 * 200, 60, v1 * 200, col, cq * 0.45); rect62(x + 680 - 30, y0 - v1 * 200, 60, v1 * 200, col, cq, 2); lbl(s, x, y0 + 30, C.white, q, 16); lbl(s, x + 680, y0 + 30, C.white, cq, 16); });
    lblG('(a, u, c)', 690, 420, C.white, q, 26); lblG('(r a, u / r, c / r)', 1370, 420, C.white, Q(S, 1, 'scaling the source by r', 0.6), 26);
    lblG('=  same response', 1030, 560, C.gold, Q(S, 1, 'gives the same response', 0.6), 26);
    chip(960, 820, 600, 60, 'needs a known, calibrated reading', C.green, Q(S, 1, 'A known, calibrated reading', 0.6), 22);
  }
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['SQUARE', 'v∅ + v₂₅ = v₂ + v₅', C.mag, 'The hidden fibre comes from a square loop'], ['SECOND', 'ker P ∩ ker Q = 0', C.green, 'a second projection'], ['RECOVER', 'injective', C.cyan, 'recovery is injectivity'], ['OCCLUDE', 'hide · record · spread', C.orange, 'occlusion can hide'], ['ARROW', '∼ₜ ⊆ ∼ₜ₊₁', C.gold, 'factorized records only merge'], ['SPLIT', 'seen + hidden', C.vio, 'a local change splits']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 225 + i * 294, q = Q(S, 0, ph) * fade; box(x - 135, 240, 270, 130, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 292, col, q, 24); lblG(a2, x, 340, C.white, q, 19); });
    lbl('LEAN · interface_refinement_iff_kernel_inclusion · knows_of_later_readout_factors_through_earlier', W / 2, 480, C.green, Q(S, 1, 'Lean has frozen') * fade, 18);
    lbl('VOLUMES · second projection · five outcomes · time reading · source splitting', W / 2, 540, C.orange, Q(S, 1, 'argued in the theory volumes') * fade, 18);
    lbl('CLASSICAL · recovery by injectivity      RECOMPUTED · every number', W / 2, 600, C.white, Q(S, 1, 'recovery by injectivity is classical') * fade, 19);
    lbl('PARTS XXXI – XXXIII', W / 2, 690, C.gold, Q(S, 1, 'This closes parts') * fade, 34);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    pyr62(W / 2, 360, 200, 0.5 + t * 0.2, a, { fillBase: true, lab: 0 });
    txt('AURIC FIB ATOM PYRAMID XXXIII', W / 2, 680, { size: 68, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XXXIII · 遮挡、第二投影与局部恢复 · TRURETURING FILM 062', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two views recover one law.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WHAT AN OBSTACLE DOES', square: 'THE SQUARE LOOP', second: 'SECOND PROJECTION', recover: 'RECOVERY IS INJECTIVITY', outcomes: 'FIVE OUTCOMES', arrow: 'FACTORIZED RECORDS', split: 'SOURCE SPLITTING', time: 'NOT ELAPSED TIME', port: 'ONE PORT', finale: 'LEDGER' });

function poster62() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr62(460, 520, 320, 0.6, 1, { fillBase: true });
  dot(900, 420, 20, 'o', 1); line(920, 420, 1120, 420, C.gold, 1, 5); fillBox(1140, 320, 26, 200, C.dim, 0.7);
  box(1220, 360, 240, 120, C.green, 1, 3, 'rgba(0,0,0,0.5)'); txt('W = Z + κ', 1340, 432, { size: 34, fam: FG, w: 700, align: 'center', c: C.green });
  txt('ker P ∩ ker Q = 0', 1340, 620, { size: 44, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('recovery = injective', 1340, 700, { size: 36, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('FIB 原子金字塔 XXXIII', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XXXIII', W / 2, 890, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('两 个 视 角 恢 复 一 条 律', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 062', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster62;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
