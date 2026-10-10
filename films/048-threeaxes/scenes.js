/* Film 048 — the observer's three axes */

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


/* ---- film 048: the observer's three axes ---- */
const _po48 = new Map();
function Q(S, k, ph, dur = 0.5, d = 0) {
  const L = lineAt(S, k); if (!L.en) return 0;
  const key = k + '|' + ph + '|' + L.s; let off = _po48.get(key);
  if (off == null) { const i = L.en.indexOf(ph); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); _po48.set(key, off); }
  return clamp((S.u - L.s - off - d) / dur);
}
function badgeQ(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const L = lineAt(S, e[0]); let off = 0; if (e[1] && L.en) { const i = L.en.indexOf(e[1]); off = i < 0 ? 0 : i / L.en.length * (L.e - L.s); } const s0 = L.s + off; if (S.u >= s0) { cur = e; st = s0; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
function lbl(s, x, y, col, a, size = 22, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function lblG(s, x, y, col, a, size = 24, align = 'center') { txt(s, x, y, { size, fam: FG, w: 700, align, c: col, a }); }
function vec3(v, p, col, a, w = 4, lab, dx = 12) { const O = v(0, 0, 0), q = v(...p); arrow(O[0], O[1], q[0], q[1], col, a, w); if (lab) lblG(lab, q[0] + dx, q[1] - 8, col, a, 24, 'left'); return q; }
function axes48(v, a, labs = ['a', 'b', 'c']) { vec3(v, [1.4, 0, 0], C.cyan, a, 4, labs[0]); vec3(v, [0, 1.4, 0], C.gold, a, 4, labs[1]); vec3(v, [0, 0, 1.4], C.mag, a, 4, labs[2]); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  const pts = [[560, 360], [820, 260], [980, 520], [700, 640], [460, 560], [1060, 330]];
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const q = s0 * (0.4 + 0.4 * Math.sin(t + i + j)); line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.cyan, q * (1 - Q(S, 1, 'exactly three', 0.8)), 1.2); }
  pts.forEach(p => dot(p[0], p[1], 10, 'w', s0));
  lbl('no outside coordinates · only relations', 760, 760, C.dim, s0, 20);
  const q = Q(S, 1, 'Distances make a space', 0.8);
  if (q > 0) { const v = v3(1400, 520, 170, 0.6 + t * 0.25, 0.4); axes48(v, Q(S, 1, 'exactly three', 0.8)); }
  chip(1400, 240, 480, 52, 'distances → a space', C.cyan, Q(S, 1, 'Distances make'), 20);
  chip(1400, 820, 480, 52, 'area + cycle → exactly three', C.gold, Q(S, 1, 'exactly three'), 20);
  chip(760, 840, 480, 52, 'two atoms → the third axis', C.mag, Q(S, 1, 'two FIB atoms'), 20);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const v = v3(W / 2, 400, 170, 0.5 + t * 0.3, 0.42);
  axes48(v, rp);
  txt(scramble('AURIC FIB ATOM PYRAMID XIX', rp, 449), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 XIX · 观 察 者 的 三 根 轴', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 048 · AURIC_FIB_OBSERVER_INTERNAL_THREE_AXIS_GEOMETRY_AND_PREDICTIVE_INTERFACE', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 DISTANCES ---- */
SCENES.distances = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Distances one, one', 0.6);
  if (fade > 0) {
    const O = [440, 640], X1 = [760, 330], X2 = [900, 600];
    line(O[0], O[1], X1[0], X1[1], C.cyan, s0 * fade, 3); line(O[0], O[1], X2[0], X2[1], C.gold, s0 * fade, 3); dashed(X1[0], X1[1], X2[0], X2[1], C.mag, s0 * fade, 3);
    dot(O[0], O[1], 14, 'w', s0 * fade); dot(X1[0], X1[1], 12, 'c', s0 * fade); dot(X2[0], X2[1], 12, 'g', s0 * fade);
    lbl('O', O[0] - 24, O[1] + 8, C.white, s0 * fade, 22); lbl('x_i', X1[0] + 14, X1[1] - 10, C.cyan, s0 * fade, 22, 'left'); lbl('x_j', X2[0] + 14, X2[1] + 8, C.gold, s0 * fade, 22, 'left');
    eqn('G_ij = ( d(O,x_i)² + d(O,x_j)² − d(x_i,x_j)² ) / 2', 1350, 280, Q(S, 0, 'give a Gram matrix') * fade, C.white, 24);
    chip(1350, 380, 420, 54, 'G ⪰ 0  ⟹  a space', C.green, Q(S, 0, 'positive semidefinite') * fade, 22);
    chip(1350, 460, 420, 54, 'rank G = smallest dimension', C.gold, Q(S, 0, 'its rank') * fade, 20);
  }
  const q = Q(S, 1, 'Distances one, one', 0.6, 0.3);
  if (q > 0) {
    const O = [600, 600], th = 0.25 * Math.sin(t * 1.5);
    const X1 = [O[0] + 150 * Math.cos(Math.PI - 0.4 + th), O[1] - 150 * Math.sin(Math.PI - 0.4 + th)], X2 = [O[0] + 150 * Math.cos(0.4 - th), O[1] - 150 * Math.sin(0.4 - th)];
    line(O[0], O[1], X1[0], X1[1], C.cyan, q, 3); line(O[0], O[1], X2[0], X2[1], C.cyan, q, 3);
    dashed(X1[0], X1[1], X1[0] + 450, X1[1], C.red, q, 3); lbl('needs length 3', X1[0] + 225, X1[1] - 20, C.red, q, 20);
    lbl('1', (O[0] + X1[0]) / 2 - 16, (O[1] + X1[1]) / 2, C.cyan, q, 22); lbl('1', (O[0] + X2[0]) / 2 + 16, (O[1] + X2[1]) / 2, C.cyan, q, 22);
    mgrid(1150, 300, [['1', '−7/2'], ['−7/2', '1']], 110, 70, q, { colf: () => C.white, size: 24 });
    eqn('(1,1) G (1,1)ᵀ = −5 < 0', 1260, 500, Q(S, 1, 'minus five'), C.red, 30);
    chip(1260, 620, 520, 54, 'the model is rejected, not the world', C.gold, Q(S, 1, 'What is rejected'), 20);
  }
};

/* ---- 03 RESIDUAL ---- */
SCENES.residual = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'The points one, two', 0.6);
  const v = v3(620, 560, 150, 0.55 + t * 0.15, 0.42);
  if (fade > 0) {
    axes48(v, s0 * fade, ['e₁', 'e₂', 'e₃']);
    const x = [1.1, 0.9, 1.2], P_ = v(...x), base = v(1.1, 0.9, 0);
    const O = v(0, 0, 0); arrow(O[0], O[1], P_[0], P_[1], C.green, s0 * fade, 4); dot(P_[0], P_[1], 12, 'n', s0 * fade);
    const ext = [P_[0] + 110, P_[1] - 120]; dashed(P_[0], P_[1], ext[0], ext[1], C.red, Q(S, 0, 'left over') * fade, 3); dot(ext[0], ext[1], 12, 'r', Q(S, 0, 'left over') * fade);
    lbl('x outside the span', ext[0] + 14, ext[1] - 10, C.red, Q(S, 0, 'left over') * fade, 18, 'left');
    eqn('δ₃(x) = ‖x‖² − r₁² − r₂² − r₃²  ≥ 0', 1400, 300, Q(S, 0, 'the residual') * fade, C.gold, 26);
    chip(1400, 400, 480, 54, 'δ₃ = 0 ⟺ x ∈ span', C.green, Q(S, 0, 'exactly when') * fade, 22);
  }
  const q = Q(S, 1, 'The points one, two', 0.6, 0.3);
  if (q > 0) {
    lblG('x₊ = (1, 2, 3, +1)', 560, 300, C.cyan, q, 30); lblG('x₋ = (1, 2, 3, −1)', 560, 360, C.mag, q, 30);
    const rows = [['to O', '15'], ['to e₁', '14'], ['to e₂', '12'], ['to e₃', '10']];
    rows.forEach(([a1, a2], k) => { const qq = Q(S, 1, 'identical distances', 0.5, k * 0.3); lbl('d² ' + a1, 440, 460 + k * 50, C.white, qq, 22, 'left'); lbl(a2, 660, 460 + k * 50, C.cyan, qq, 24); lbl(a2, 760, 460 + k * 50, C.mag, qq, 24); });
    chip(1350, 330, 520, 54, 'x₊ − x₋ = 2 e₄ ≠ 0', C.red, Q(S, 1, 'differ by two'), 22);
    mgrid(1150, 430, [['1', '0', '0', 'r₁'], ['0', '1', '0', 'r₂'], ['0', '0', '1', 'r₃'], ['r₁', 'r₂', 'r₃', '‖x‖²']], 90, 54, Q(S, 1, 'Gram determinant'), { colf: () => C.white, size: 20 });
    eqn('det G₄ = δ₃(x) = 1', 1330, 690, Q(S, 1, 'equals that residual'), C.gold, 28);
  }
};

/* ---- 04 PROBES ---- */
SCENES.probes = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), skew = 0.55 * (0.5 + 0.5 * Math.cos(t * 0.8)) * (1 - Q(S, 1, 'orthogonal probes', 1.2));
  const v = v3(620, 560, 170, 0.6 + t * 0.12, 0.42);
  const f1 = [1, 0, 0], f2 = [Math.sin(skew), Math.cos(skew), 0], f3 = [Math.sin(skew) * 0.6, Math.sin(skew) * 0.5, Math.sqrt(Math.max(0.05, 1 - 0.61 * Math.sin(skew) ** 2))];
  const nrm = p => { const l = Math.hypot(...p); return p.map(x => x / l); };
  const F_ = [f1, nrm(f2), nrm(f3)];
  F_.forEach((p, i) => vec3(v, p.map(x => x * 1.4), [C.cyan, C.gold, C.mag][i], s0, 4, 'f' + (i + 1)));
  /* Gram and smallest eigenvalue via power iteration on (3I - H) */
  const H = F_.map(a => F_.map(b => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  let x = [1, -0.7, 0.4]; for (let k = 0; k < 60; k++) { const y = [0, 1, 2].map(i => 3 * x[i] - H[i].reduce((s, h, j) => s + h * x[j], 0)); const l = Math.hypot(...y); x = y.map(z => z / l); }
  const lmin = x.reduce((s, xi, i) => s + xi * H[i].reduce((ss, h, j) => ss + h * x[j], 0), 0);
  eqn('sup ‖x̂ − x‖ / ‖ε‖ = 1 / √λ_min(H)', 1400, 280, Q(S, 0, 'worst error'), C.white, 26);
  lbl('λ_min = ' + lmin.toFixed(3) + '   amplification = ' + (1 / Math.sqrt(Math.max(lmin, 1e-6))).toFixed(3), 1400, 350, lmin > 0.999 ? C.green : C.gold, Q(S, 0, 'smallest eigenvalue'), 22);
  eqn('tr H = 3  ⟹  λ_min ≤ 1', 1400, 470, Q(S, 1, 'The trace is three'), C.gold, 28);
  chip(1400, 570, 520, 54, 'amplification 1 ⟺ orthogonal', C.green, Q(S, 1, 'orthogonal probes'), 22);
  lbl('efficiency, not the number three', 1400, 650, C.red, Q(S, 1, 'not the number three'), 20);
};

/* ---- 05 CROSS ---- */
SCENES.cross = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'classical']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'In seven dimensions', 0.6);
  if (fade > 0) {
    const v = v3(620, 600, 170, 0.6 + t * 0.2, 0.42);
    const U = [1.2, 0, 0], V = [0.5 * Math.cos(t * 0.6) + 0.3, 1.0, 0], Cr = [U[1] * V[2] - U[2] * V[1], U[2] * V[0] - U[0] * V[2], U[0] * V[1] - U[1] * V[0]];
    const O = v(0, 0, 0), pu = v(...U), pv = v(...V), puv = v(U[0] + V[0], U[1] + V[1], 0);
    fillPoly([O, pu, puv, pv], C.cyan, s0 * fade * 0.2); vec3(v, U, C.cyan, s0 * fade, 4, 'u'); vec3(v, V, C.gold, s0 * fade, 4, 'v');
    vec3(v, Cr.map(x => x * 0.9), C.mag, Q(S, 0, 'whose length is the area') * fade, 4, 'B(u,v)');
    eqn('‖B(u,v)‖² = ‖u‖²‖v‖² − ⟨u,v⟩²', 1400, 270, Q(S, 0, 'whose length is the area') * fade, C.white, 26);
    eqn('B(u,B(v,w)) + B(v,B(w,u)) + B(w,B(u,v)) = 0', 1400, 350, Q(S, 0, 'Jacobi cycle rule') * fade, C.gold, 22);
    chip(1400, 470, 440, 60, 'dim K = 3', C.green, Q(S, 0, 'exactly three dimensions') * fade, 30);
  }
  const q = Q(S, 1, 'In seven dimensions', 0.6, 0.3);
  if (q > 0) {
    /* Fano plane */
    const cx = 620, cy = 520, R = 230, P7 = [0, 1, 2].map(i => [cx + R * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / 3), cy + R * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / 3)]);
    const mid = [[0, 1], [1, 2], [2, 0]].map(([i, j]) => [(P7[i][0] + P7[j][0]) / 2, (P7[i][1] + P7[j][1]) / 2]);
    strokePoly(P7, C.cyan, q, 2.5); ring(cx, cy, R / 2, C.cyan, q, 2.5);
    for (let i = 0; i < 3; i++) line(P7[i][0], P7[i][1], mid[(i + 1) % 3][0], mid[(i + 1) % 3][1], C.cyan, q, 2);
    [...P7, ...mid, [cx, cy]].forEach((p, i) => { dot(p[0], p[1], 12, 'g', q); lbl('e' + (i + 1), p[0] + 16, p[1] - 10, C.gold, q, 16, 'left'); });
    lbl('7D: octonion product (Fano plane)', cx, cy + R + 60, C.white, q, 20);
    chip(1400, 300, 480, 54, 'area law ✓   alternating ✓', C.green, Q(S, 1, 'keeps the area law'), 20);
    chip(1400, 380, 480, 54, 'Jacobi ✗ : defect ≥ 1', C.red, Q(S, 1, 'misses by at least one'), 22);
    eqn('3D:  B = κ · (cross product),  κ = ±1', 1400, 500, Q(S, 1, 'In three, the product'), C.gold, 24);
    lbl('dim Λ²K = 3, 6, 21 for dim K = 3, 4, 7', 1400, 570, C.dim, Q(S, 1, 'up to a sign'), 18);
  }
};

/* ---- 06 ATOMS ---- */
SCENES.atoms = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Read every tree', 0.6);
  const v = v3(600, 560, 170, 0.6 + t * 0.2, 0.42);
  if (fade > 0) {
    vec3(v, [1.4, 0, 0], C.cyan, s0 * fade, 4, 'a = α'); vec3(v, [0, 1.4, 0], C.gold, s0 * fade, 4, 'b = β');
    vec3(v, [0, 0, -1.4], C.mag, Q(S, 0, 'is the third axis') * fade, 4, 'c = B(b,a)');
    const tb = [['B', 'a', 'b', 'c'], ['a', '0', '−c', 'b'], ['b', 'c', '0', '−a'], ['c', '−b', 'a', '0']];
    mgrid(1180, 260, tb, 100, 64, Q(S, 0, 'the cycle table') * fade, { colf: (v_, i, j) => (i === 0 || j === 0) ? C.gold : C.white, size: 24 });
    eqn('B(b,a) = c ,  B(c,b) = a ,  B(a,c) = b', 1380, 590, Q(S, 0, 'c times b') * fade, C.green, 24);
  }
  const q = Q(S, 1, 'Read every tree', 0.6, 0.3);
  if (q > 0) {
    const pts = [[0, 0, 0], [1.3, 0, 0], [-1.3, 0, 0], [0, 1.3, 0], [0, -1.3, 0], [0, 0, 1.3], [0, 0, -1.3]];
    const cols = ['w', 'c', 'c', 'g', 'g', 'm', 'm'];
    const ed = [[1, 3], [1, 4], [1, 5], [1, 6], [2, 3], [2, 4], [2, 5], [2, 6], [3, 5], [3, 6], [4, 5], [4, 6]];
    ed.forEach(([i, j]) => { const A_ = v(...pts[i]), B_ = v(...pts[j]); line(A_[0], A_[1], B_[0], B_[1], C.dim, q * 0.5, 1.2); });
    pts.forEach((p, i) => { const P_ = v(...p); dot(P_[0], P_[1], 13, cols[i], Q(S, 1, 'just seven values', 0.5, i * 0.15)); });
    lbl('readout image: {0, ±a, ±b, ±c}', 600, 840, C.white, Q(S, 1, 'just seven values'), 20);
    /* rotation R cycling a -> b -> c */
    const cyc = ['a', 'b', 'c'], k = Math.floor(t * 0.9) % 3;
    lblG('ρ :  ' + cyc.map((s, i) => i === k ? '[' + s + ']' : s).join(' → ') + ' → a', 1380, 330, C.gold, Q(S, 1, 'true rotation'), 30);
    eqn('q_B(ρ t) = R q_B(t) ,  R³ = I ,  det R = 1', 1380, 420, Q(S, 1, 'true rotation'), C.green, 24);
  }
};

/* ---- 07 PERIOD ---- */
SCENES.period = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'theory'], [1, '', 'lean']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'Lean has frozen', 0.6);
  if (fade > 0) {
    /* tree <<b,a>,b> */
    const R0 = [560, 300], L1 = [440, 420], R1 = [700, 420], L2 = [360, 540], R2 = [520, 540];
    [[R0, L1], [R0, R1], [L1, L2], [L1, R2]].forEach(([p, q]) => line(p[0], p[1], q[0], q[1], C.white, s0 * fade, 2.5));
    [[L2, 'β', C.gold], [R2, 'α', C.cyan], [R1, 'β', C.gold]].forEach(([p, s, col]) => { dot(p[0], p[1], 14, col === C.cyan ? 'c' : 'g', s0 * fade); lblG(s, p[0], p[1] + 44, col, s0 * fade, 28); });
    lbl('ρ³ α = ⟨⟨β, α⟩, β⟩', 560, 650, C.white, s0 * fade, 24);
    lbl('readout q_B = a', 1360, 300, C.green, Q(S, 0, 'back to a') * fade, 28);
    lbl('composition (1, 2) ≠ (1, 0)', 1360, 370, C.red, Q(S, 0, 'its composition') * fade, 26);
    chip(1360, 480, 520, 56, 'readout periodic · source not', C.gold, Q(S, 0, 'The readout is periodic') * fade, 22);
  }
  const q = Q(S, 1, 'Lean has frozen', 0.6, 0.3);
  if (q > 0) {
    box(300, 200, 1320, 120, C.green, q, 2, 'rgba(0,30,15,0.6)');
    lbl('LEAN · FibonacciAtomic.CliffordLeafOrbit.result', 960, 245, C.green, q, 22);
    lblG('A² = 1 ,  B² = −1 ,  AB + BA = 1   ·   X_j = X_k ⟺ j ≡ k (mod 6)', 960, 292, C.white, Q(S, 1, 'A squared one'), 22);
    const ph = ['A', 'B', 'BA', 'A + B', '−B', 'AB'], cx = 760, cy = 600, R = 180, k = Math.floor(t * 1.2) % 6;
    const P6 = ph.map((_, i) => [cx + R * Math.cos(-Math.PI / 2 + i * Math.PI / 3), cy + R * Math.sin(-Math.PI / 2 + i * Math.PI / 3)]);
    strokePoly(P6, C.cyan, Q(S, 1, 'six phases'), 2);
    P6.forEach((p, i) => { dot(p[0], p[1], i === k ? 18 : 11, i === k ? 'n' : 'c', Q(S, 1, 'six phases', 0.5, i * 0.2)); lblG(ph[i], p[0] + (p[0] - cx) * 0.32, p[1] + (p[1] - cy) * 0.32 + 8, i === k ? C.green : C.white, Q(S, 1, 'six phases', 0.5, i * 0.2), 24); });
    lbl('X_j = E(ρʲ α)', cx, cy + 8, C.dim, Q(S, 1, 'six phases'), 18);
    chip(1380, 520, 520, 56, 'no rule on readouts predicts ρ', C.red, Q(S, 1, 'no rule on the readout'), 20);
    lbl('E(αα) = 1 but E(ρ(αα)) = −1', 1380, 600, C.dim, Q(S, 1, 'every tree'), 18);
  }
};

/* ---- 08 FUTURE ---- */
SCENES.future = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('Cx = Cy ⟹ C U_w x = C U_w y ∀w   ⟺   U_a* E₀ ⊆ E₀ ∀a', 960, 250, Q(S, 0, 'Exactly when'), C.white, 24);
  lbl('E₀ = span of the three probes', 960, 300, C.dim, Q(S, 0, 'span of the probes'), 18);
  const f0 = 1 - Q(S, 1, 'States zero', 0.6);
  if (f0 > 0) {
    const v = v3(760, 600, 150, 0.55 + t * 0.12, 0.42), pl = [v(-1.5, -1.5, 0), v(1.5, -1.5, 0), v(1.5, 1.5, 0), v(-1.5, 1.5, 0)];
    const pq = Q(S, 0, 'keeps the span', 0.8) * f0;
    fillPoly(pl, C.cyan, pq * 0.12); strokePoly(pl, C.cyan, pq, 1.5); lbl('E₀ : what the probes see', 760, 870, C.cyan, pq, 18);
    const hq = Q(S, 0, 'Otherwise a hidden direction', 0.6) * f0, ang = Math.PI / 2 * (1 - ease(Q(S, 0, 'Otherwise a hidden', 1.2, 0.3)));
    vec3(v, [0, 0, 1.5], C.dim, pq, 3, 'hidden');
    vec3(v, [1.4 * Math.cos(ang), 0, 1.4 * Math.sin(ang)], C.red, hq, 4, ang < 0.2 ? 'returns' : '');
    chip(1450, 520, 520, 54, 'closed: U* E₀ ⊆ E₀  →  readings predict', C.green, Q(S, 0, 'Exactly when', 0.6, 0.8) * f0, 19);
    chip(1450, 610, 520, 54, 'not closed: a hidden direction returns', C.red, hq, 19);
  }
  const st = Q(S, 1, 'One orthogonal update', 0.8);
  const bars = (x0, vals, col, lab, a) => { vals.forEach((vv, i) => { const h = vv * 160; fillBox(x0 + i * 70, 640 - Math.max(h, 2), 50, Math.max(h, 2), col, a * 0.8); lbl(['r₁', 'r₂', 'r₃'][i], x0 + i * 70 + 25, 670, C.dim, a, 16); }); lbl(lab, x0 + 95, 720, col, a, 20); };
  const q = Q(S, 1, 'States zero');
  bars(480, [0, 0, 0], C.cyan, 'state 0', q);
  bars(880, [st, 0, 0], C.mag, 'state e₄', q);
  lbl(st > 0.5 ? 'after U: (0,0,0)  vs  (1,0,0)' : 'now: (0,0,0)  vs  (0,0,0)', 760, 400, st > 0.5 ? C.red : C.green, q, 24);
  eqn('U e₄ = e₁ ,  U e₁ = −e₄', 1450, 500, Q(S, 1, 'orthogonal update'), C.gold, 26);
  chip(1450, 600, 480, 54, 'the next reading cuts the fibre', C.red, Q(S, 1, 'cuts the current fibre'), 20);
};

/* ---- 09 QUANTUM ---- */
SCENES.quantum = S => {
  const u = S.u, t = S.t;
  badgeQ(S, [[0, '', 'classical'], [1, '', 'theory']]);
  const s0 = clamp(u), fade = 1 - Q(S, 1, 'A CNOT into', 0.6);
  if (fade > 0) {
    const v = v3(560, 540, 150, 0.6 + t * 0.2, 0.4);
    const sph = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 2; sph.push(v(1.3 * Math.cos(a), 1.3 * Math.sin(a), 0)); } strokePoly(sph, C.dim, s0 * fade, 1.2);
    const sph2 = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 2; sph2.push(v(1.3 * Math.cos(a), 0, 1.3 * Math.sin(a))); } strokePoly(sph2, C.dim, s0 * fade, 1.2);
    vec3(v, [1.5, 0, 0], C.cyan, s0 * fade, 4, 'X'); vec3(v, [0, 1.5, 0], C.gold, s0 * fade, 4, 'Y'); vec3(v, [0, 0, 1.5], C.mag, s0 * fade, 4, 'Z');
    eqn('XY = iZ ,   YX = −iZ ,   tr(XY) = 0', 1400, 290, Q(S, 0, 'X Y is i Z') * fade, C.white, 26);
    chip(1400, 390, 520, 54, 'orthogonal ≠ commuting', C.gold, Q(S, 0, 'do not commute') * fade, 22);
    eqn('Var X + Var Y + Var Z = 3 − |r|² ≥ 2', 1400, 490, Q(S, 0, 'three variances') * fade, C.green, 26);
  }
  const q = Q(S, 1, 'A CNOT into', 0.6, 0.3);
  if (q > 0) {
    const lane = (y, col, lab, out, a) => { lbl(lab, 360, y - 50, col, a, 20, 'left'); dot(400, y, 14, 'c', a); lbl('|+⟩', 400, y + 40, C.cyan, a, 20); arrow(430, y, 640, y, col, a, 3); box(650, y - 30, 120, 60, col, a, 2, 'rgba(0,0,0,0.4)'); lbl('CNOT', 710, y + 8, col, a, 20); arrow(780, y, 990, y, col, a, 3); box(1000, y - 30, 120, 60, col, a, 2, 'rgba(0,0,0,0.4)'); lbl('CNOT', 1060, y + 8, col, a, 20); arrow(1130, y, 1330, y, col, a, 3); lblG(out, 1420, y + 10, col, a, 30); };
    lane(380, C.green, 'same environment (kept)', '|+⟩', Q(S, 1, 'applied twice'));
    lane(620, C.red, 'fresh environment each time', 'I / 2', Q(S, 1, 'fresh environment'));
    chip(960, 800, 680, 54, 'three parameters ≠ history or environment', C.gold, Q(S, 1, 'Three parameters'), 20);
  }
};

/* ---- 10 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['SPACE', 'distances · Gram ⪰ 0', C.cyan, 'Distances build'], ['THREE', 'area + Jacobi', C.gold, 'area and Jacobi'], ['AXIS', 'c = B(b, a)', C.mag, 'two atoms'], ['FUTURE', 'U_a* E₀ ⊆ E₀', C.green, 'closure under']];
    items.forEach(([a1, a2, col, ph], i) => { const x = 375 + i * 390, q = Q(S, 0, ph) * fade; box(x - 175, 240, 350, 140, col, q, 2, 'rgba(0,0,0,0.5)'); lbl(a1, x, 300, col, q, 28); lblG(a2, x, 350, C.white, q, 22); });
    lbl('LEAN · CliffordLeafOrbit · six phases of the canonical source', W / 2, 520, C.green, Q(S, 1, 'Lean has frozen') * fade, 24);
    lbl('VOLUME · three-axis bridge · dimension · tree readout   CLASSICAL · distance geometry · vector products', W / 2, 580, C.orange, Q(S, 1, 'argued in the theory') * fade, 19);
    lbl('RECOMPUTED · every number in this film', W / 2, 640, C.white, Q(S, 1, 'every number') * fade, 24);
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out, v = v3(W / 2, 420, 140, 0.5 + t * 0.3, 0.42);
    axes48(v, a);
    txt('AURIC FIB ATOM PYRAMID XIX', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 XIX · 观察者的三根轴 · TRURETURING FILM 048', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Relations first, then space.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'NO OUTSIDE FRAME', distances: 'DISTANCES TO SPACE', residual: 'THE RESIDUAL', probes: 'WHY ORTHOGONAL', cross: 'WHY THREE', atoms: 'THE THIRD AXIS', period: 'PERIODIC READOUT', future: 'THE HIDDEN RETURN', quantum: 'QUANTUM AXES', finale: 'LEDGER' });

function poster48() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const v = v3(560, 520, 230, 0.75, 0.42);
  axes48(v, 1);
  const pts = [[1.3, 0, 0], [-1.3, 0, 0], [0, 1.3, 0], [0, -1.3, 0], [0, 0, 1.3], [0, 0, -1.3]];
  pts.forEach(p => { const P_ = v(...p); dot(P_[0], P_[1], 12, 'w', 0.9); });
  txt('c = B(b, a)', 1360, 300, { size: 40, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('‖B(u,v)‖² = ‖u‖²‖v‖² − ⟨u,v⟩²', 1360, 390, { size: 30, fam: FG, w: 700, align: 'center', c: C.white });
  txt('area + Jacobi ⟹ dim = 3', 1360, 480, { size: 36, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('A, B, BA, A+B, −B, AB', 1360, 570, { size: 34, fam: FG, w: 700, align: 'center', c: C.green });
  txt('FIB 原子金字塔 XIX', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID XIX', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('先 有 关 系 · 再 有 空 间', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 048', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster48;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
