/* Film 039 — AURIC FIB ATOM PYRAMID X · 金字塔 X：秩、体积与算术分辨率 */

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


/* ---- film 039: rank, volume and arithmetic resolution ---- */
const F3P = []; for (let u = 0; u < 3; u++) for (let v = 0; v < 3; v++) F3P.push([u, v]);
const F3DIR = [[1, 0], [0, 1], [1, 1], [1, 2]];
const F3LINES = []; F3DIR.forEach(([a, b]) => { const seen = new Set(); F3P.forEach(([u, v]) => { const pts = [0, 1, 2].map(t => [(u + t * a) % 3, (v + t * b) % 3]); const key = pts.map(p => p[0] * 3 + p[1]).sort().join(','); if (!seen.has(key)) { seen.add(key); F3LINES.push({ a, b, pts }); } }); });
const fF3 = (u, v) => [(u * u + v * v) % 3, 0];
const gF3 = (u, v) => [(u * u) % 3, (v * v) % 3];
const md3 = x => ((x % 3) + 3) % 3;
/* five patterns in the order (empty, 1, 2, 3, 13) */
const PAT5 = [[0, 0, 0], [1, 0, 0], [0, 0, 1], [0, 1, 0], [1, 1, 0]];
const PK = ['O', 'L', 'T', 'R', 'J'];
function gridF3(ox, oy, s, a, o = {}) {
  if (a <= 0) return null;
  const pos = ([u, v]) => [ox + u * s, oy - v * s];
  for (let i = 0; i < 3; i++) { line(ox + i * s, oy + 30, ox + i * s, oy - 2 * s - 30, C.dim, a * 0.25, 1); line(ox - 30, oy - i * s, ox + 2 * s + 30, oy - i * s, C.dim, a * 0.25, 1); }
  F3P.forEach(p => { const [x, y] = pos(p); dot(x, y, o.r || 16, 'c', a); if (o.lab) o.lab(p, x, y); });
  txt('u', ox + 2 * s + 50, oy + 8, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.dim, a });
  txt('v', ox - 8, oy - 2 * s - 46, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  return pos;
}
function clockMod(cx, cy, R, m, J, a, t, col) {
  if (a <= 0) return;
  ring(cx, cy, R, C.dim, a * 0.6, 1.5);
  const g = (() => { let x = m, y = J; while (y) { [x, y] = [y, x % y]; } return x; })();
  for (let k = 0; k < m; k++) { const an = -Math.PI / 2 + TAU * k / m, x = cx + R * Math.cos(an), y = cy + R * Math.sin(an), hit = k % g === 0; dot(x, y, hit ? 12 : 6, hit ? 'g' : 'w', a * (hit ? 1 : 0.5)); }
  const k = Math.floor(t * 1.5) % m, an1 = -Math.PI / 2 + TAU * k / m, an2 = -Math.PI / 2 + TAU * ((J * k) % m) / m;
  arrow(cx + R * 0.45 * Math.cos(an1), cy + R * 0.45 * Math.sin(an1), cx + R * 0.88 * Math.cos(an2), cy + R * 0.88 * Math.sin(an2), col, a, 2.5);
  txt('m = ' + m, cx, cy - R - 26, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a });
  txt('gcd = ' + g, cx, cy + R + 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: g === 1 ? C.green : C.gold, a });
  txt(g === 1 ? 'unique' : g + ' preimages', cx, cy + R + 72, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  const R = pyrTrue(520, 560, 340, t * 0.25, s0, { r: 18, ls: 22, fill: 0.06 });
  const q = P(S, 0, 6);
  if (R.P && q > 0) { const sg = { O: '+', J: '+', L: '−', R: '−' }; Object.keys(sg).forEach(k => txt(sg[k], R.P[k][0] + 26, R.P[k][1] + 34, { size: 30, fam: F.mono, w: 700, align: 'center', c: sg[k] === '+' ? C.green : C.red, a: q })); }
  [['new readout?', C.white, 1.5], ['same rule', C.cyan, 0.3], ['different rank', C.gold, 2.5], ['can the arithmetic see it?', C.mag, 5.2]].forEach(([s, col, off], i) => chip(1360, 300 + i * 120, 600, 56, s, col, i === 0 ? P(S, 0, 6.2) : P(S, 1, off), 26));
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const R = pyrTrue(W / 2, 470, 320, t * 0.3, rp, { r: 18, lab: false, fill: 0.08 });
  if (R.P) { const ord = ['O', 'L', 'J', 'R']; ord.forEach((k, i) => { const pl = i % 2 === 0; txt(pl ? '+' : '−', R.P[k][0], R.P[k][1] - 30, { size: 34, fam: F.mono, w: 700, align: 'center', c: pl ? C.green : C.red, a: rp * (0.6 + 0.4 * Math.sin(t * 3 + i)) }); }); }
  txt(scramble('AURIC FIB ATOM PYRAMID X', rp, 391), W / 2, 760, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 X · 秩 、 体 积 与 算 术 分 辨 率', W / 2, 835, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 039 · AURIC_FIB_ATOM_RESIDUAL_RANK_AND_ARITHMETIC_RESOLUTION', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
};

/* ---- 02 TERNARY ---- */
SCENES.ternary = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 0, 'lean']]);
  const s0 = clamp(u), fq = P(S, 0, 4.2), gq = P(S, 0, 8.9);
  const pos = gridF3(300, 700, 190, s0, { r: 14, lab: (p, x, y) => { const fv = fF3(...p), gv = gF3(...p); txt('f ' + fv[0] + ',' + fv[1], x + 18, y - 22, { size: 17, fam: F.mono, w: 700, align: 'left', c: C.gold, a: fq }); txt('g ' + gv[0] + ',' + gv[1], x + 18, y + 28, { size: 17, fam: F.mono, w: 700, align: 'left', c: C.mag, a: gq }); } });
  txt('𝔽₃² · nine points', 490, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 });
  eqn('f(u,v) = (u² + v², 0)', 1380, 300, fq, C.gold, 30);
  eqn('g(u,v) = (u², v²)', 1380, 360, gq, C.mag, 30);
  const l = P(S, 1, 0.3);
  if (l > 0 && pos) {
    const k = Math.floor((u - lineAt(S, 1).s) / 0.8) % F3LINES.length, L = F3LINES[(k + F3LINES.length) % F3LINES.length];
    L.pts.forEach(p => { const [x, y] = pos(p); ring(x, y, 30, C.green, l, 3); });
    const sf = [0, 1].map(i => md3(L.pts.reduce((s, p) => s + fF3(...p)[i], 0))), sg = [0, 1].map(i => md3(L.pts.reduce((s, p) => s + gF3(...p)[i], 0)));
    txt('line direction (' + L.a + ',' + L.b + ')', 1380, 470, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: l });
    txt('Σ f = (' + sf.join(',') + ')   Σ g = (' + sg.join(',') + ')', 1380, 520, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: l });
    txt('≠ 0 on all 12 lines', 1380, 570, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 3.8) });
  }
  const lq = P(S, 1, 6.7);
  if (lq > 0) { box(1060, 640, 640, 110, C.green, lq, 2, 'rgba(0,30,15,0.6)'); txt('LEAN · SumFreeCodeDimensionRefutation', 1380, 680, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: lq }); txt('SumFree 1 f  ∧  SumFree 1 g', 1380, 725, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: lq }); }
};

/* ---- 03 CODES ---- */
SCENES.codes = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 0, 'lean']]);
  const s0 = clamp(u);
  const rows = [['1', p => 1, C.white], ['u', p => p[0], C.white], ['v', p => p[1], C.white], ['u²+v²', p => md3(p[0] * p[0] + p[1] * p[1]), C.gold], ['u²', p => md3(p[0] * p[0]), C.mag], ['v²', p => md3(p[1] * p[1]), C.mag]];
  const x0 = 320, y0 = 250, cw = 62, ch = 56;
  F3P.forEach((p, j) => txt('(' + p[0] + ',' + p[1] + ')', x0 + j * cw + cw / 2, y0 - 12, { size: 14, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 }));
  rows.forEach(([lab, fn, col], i) => {
    const q = i < 3 ? s0 : i === 3 ? P(S, 0, 2.5) : P(S, 0, 4.5); if (q <= 0) return;
    const y = y0 + i * ch + (i >= 3 ? 20 : 0);
    txt(lab, x0 - 16, y + ch / 2 + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: q });
    F3P.forEach((p, j) => { const v = fn(p); box(x0 + j * cw, y, cw, ch, col, q * 0.6, 1.2, 'rgba(0,0,0,0.45)'); txt(String(v), x0 + j * cw + cw / 2, y + ch / 2 + 9, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
  });
  const bq = P(S, 0, 5.8);
  chip(1440, 330, 560, 56, 'span{1,u,v,f} : dim 4', C.gold, bq, 26);
  chip(1440, 410, 560, 56, 'span{1,u,v,g} : dim 5', C.mag, bq, 26);
  const l = P(S, 1, 0.3);
  eqn('code dim f = 9 − 4 = 5', 1440, 520, l, C.gold, 30);
  eqn('code dim g = 9 − 5 = 4', 1440, 580, P(S, 1, 1.5), C.mag, 30);
  const lq = P(S, 1, 2.9);
  if (lq > 0) { box(1120, 640, 640, 150, C.green, lq, 2, 'rgba(0,30,15,0.6)'); txt('LEAN · codeDim 2 1 f = 5 ∧ codeDim 2 1 g = 4', 1440, 680, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: lq }); txt('result : ¬ claim', 1440, 725, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: lq }); txt('same legality ≠ same dimension', 1440, 768, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5.3) }); }
};

/* ---- 04 RANK ---- */
SCENES.rank = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'theory']);
  const s0 = clamp(u), v = v3(560, 560, 220, 0.6 + t * 0.15, 0.5);
  const pl = [[-1, -1, 0], [1, -1, 0], [1, 1, 0], [-1, 1, 0]].map(p => v(...p));
  fillPoly(pl, C.cyan, s0 * 0.12); strokePoly(pl, C.cyan, s0 * 0.7, 2);
  txt('old readouts ℛ', pl[2][0] + 20, pl[2][1], { size: 22, fam: F.mono, w: 700, align: 'left', c: C.cyan, a: s0 });
  const O = v(0, 0, 0), inP = v(0.8, 0.4, 0), out = v(0.3, -0.5, 1.1);
  const q1 = P(S, 1, 0.3), q2 = P(S, 0, 3.9);
  arrow(O[0], O[1], inP[0], inP[1], C.dim, q1, 3); txt('repeat / recombine', inP[0] + 14, inP[1] + 28, { size: 18, fam: F.mono, w: 700, align: 'left', c: C.dim, a: q1 });
  arrow(O[0], O[1], out[0], out[1], C.gold, q2, 4); txt('[f] ≠ 0', out[0] + 14, out[1] - 10, { size: 24, fam: F.mono, w: 700, align: 'left', c: C.gold, a: q2 });
  eqn('dim 𝒩(ℛ) − dim 𝒩(ℛ′) = rank{[f₁],…,[fₘ]}', 1380, 330, P(S, 0, 5), C.white, 26);
  txt('in K^Ω / ℛ', 1380, 380, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 6) });
  [['repeat an old readout', 0.5], ['change its coordinates', 1.7], ['add old combinations', 3.3]].forEach(([s, off], i) => chip(1380, 500 + i * 76, 560, 52, s + '  ✗', C.red, P(S, 1, off), 22));
  chip(1380, 760, 560, 52, '#formulas ≠ #relations', C.gold, P(S, 1, 6.5), 24);
};

/* ---- 05 CORNER ---- */
SCENES.corner = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), R = pyrTrue(500, 600, 380, 0.55 + 0.2 * Math.sin(t * 0.3), s0, { r: 20, ls: 24, fill: 0.05 });
  const q = P(S, 0, 9.6), sg = { O: '+1', J: '+1', L: '−1', R: '−1', T: '0' };
  if (R.P && q > 0) {
    Object.keys(sg).forEach(k => txt(sg[k], R.P[k][0] + 30, R.P[k][1] + 40, { size: 26, fam: F.mono, w: 700, align: 'left', c: sg[k][0] === '+' ? C.green : sg[k] === '0' ? C.dim : C.red, a: q }));
    const ph = (t * 0.6) % 1; [['O', 'L'], ['J', 'R'], ['O', 'R'], ['J', 'L']].forEach(([a, b]) => { const A = R.P[a], B = R.P[b]; dot(lerp(A[0], B[0], ph), lerp(A[1], B[1], ph), 9, 'g', q * 0.9); });
  }
  eqn('f = f∅ + (f₁−f∅)x + (f₃−f∅)y + (f₂−f∅)z + J_f · xy', 1300, 300, P(S, 0, 4.5), C.white, 24);
  eqn('J_f = f∅ + f₁₃ − f₁ − f₃', 1300, 380, P(S, 0, 9.6), C.gold, 32);
  const l = P(S, 1, 0.3);
  eqn('f ∈ span{1,x,y,z}  ⇔  J_f = 0', 1300, 480, l, C.green, 26);
  eqn('J_f ≠ 0  ⇒  span{1,x,y,z,f} = all of K^Σ', 1300, 530, P(S, 1, 2), C.green, 24);
  txt('kernel of [1,x,y,z]:  (1, −1, 0, −1, 1)', 1300, 620, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4.1) });
  const tq = P(S, 1, 8.2); if (tq > 0) { const tp = ringPts(1300, 760, 60, 3); strokePoly(tp, C.red, tq, 3); tp.forEach(p => dot(p[0], p[1], 10, 'r', tq)); txt('three patterns: no compensation', 1420, 768, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.red, a: tq }); }
};

/* ---- 06 SECOND ---- */
SCENES.second = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const rows = [['x², y², z²', '= x, y, z', '0', C.dim, 2.5], ['ℓ · m', 'ab′ + a′b', '', C.gold, 5.7], ['ℓ²', '2ab', '', C.cyan, 0], ['ℓ² in char 2', '0', '', C.red, 3.4], ['x y', '1', '', C.green, 7.3]];
  txt('readout', 380, 250, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 }); txt('J', 760, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  rows.forEach(([a1, a2, a3, col, off], i) => { const q = i < 2 ? P(S, 0, off) : P(S, 1, off); if (q <= 0) return; const y = 300 + i * 90; box(220, y, 700, 70, col, q, 2, 'rgba(0,0,0,0.45)'); txt(a1, 380, y + 45, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(i === 0 ? '0' : a2, 760, y + 45, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q }); if (i === 0) txt('x² = x', 560, y + 45, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); });
  /* cross terms */
  const cq = P(S, 0, 5.7);
  if (cq > 0) {
    eqn('ℓ = a x + b y + c z', 1380, 310, cq, C.white, 26); eqn('m = a′x + b′y + c′z', 1380, 360, cq, C.white, 26);
    const xs = { a: 1250, b: 1380, c: 1510 }, ya = 450, yb = 560;
    ['a', 'b', 'c'].forEach(k => { chip(xs[k], ya, 70, 46, k, k === 'c' ? C.dim : C.gold, cq, 24); chip(xs[k], yb, 70, 46, k + '′', k === 'c' ? C.dim : C.gold, cq, 24); });
    line(xs.a, ya + 23, xs.b, yb - 23, C.gold, cq, 3); line(xs.b, ya + 23, xs.a, yb - 23, C.gold, cq, 3);
    txt('only low × high crosses survive', 1380, 640, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: cq });
  }
  chip(1380, 760, 560, 52, 'the method fails, not the relation', C.green, P(S, 1, 10.5), 22);
};

/* ---- 07 VOLUME ---- */
SCENES.volume = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const M = [['1', '1', '1', '1', '1'], ['0', '1', '0', '0', '1'], ['0', '0', '0', '1', '1'], ['0', '0', '1', '0', '0'], ['f∅', 'f₁', 'f₂', 'f₃', 'f₁₃']];
  const red = P(S, 0, 5);
  const M2 = M.map((r, i) => (i === 4 && red > 0.5 ? ['0', '0', '0', '0', 'J'] : r));
  mgrid(260, 280, M2, 96, 64, s0, { prog: clamp(u / 2), colf: (v, i) => (i === 4 ? C.gold : C.white), size: 22 });
  ['1', 'x', 'y', 'z', 'f'].forEach((s, i) => txt(s, 240, 280 + i * 64 + 40, { size: 22, fam: F.mono, w: 700, align: 'right', c: i === 4 ? C.gold : C.cyan, a: s0 }));
  ['∅', '1', '2', '3', '13'].forEach((s, j) => txt(s, 260 + j * 96 + 48, 266, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 }));
  txt('det = −J', 500, 660, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 0.3) });
  eqn('Vol₄ = |J| / 24', 500, 730, P(S, 1, 1.5), C.gold, 36);
  /* volume vs rank */
  const pq = P(S, 1, 5.2), x0 = 1080, y0 = 760, w = 620, h = 400;
  if (pq > 0) {
    plotAxes(x0, y0, w, h, pq, '|J|', null);
    line(x0, y0, x0 + w, y0 - h, C.gold, pq, 3); txt('volume |J|/24', x0 + w - 20, y0 - h - 16, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.gold, a: pq });
    line(x0, y0, x0 + 4, y0, C.cyan, pq, 4); line(x0 + 4, y0 - 120, x0 + w, y0 - 120, C.cyan, pq, 4); dot(x0, y0, 8, 'c', pq); ring(x0 + 4, y0 - 120, 7, C.cyan, pq, 2);
    txt('new rank: 0 → 1', x0 + w - 20, y0 - 140, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: pq });
    txt('J = 1 and J = 1000: both one dimension', x0 + w / 2, y0 + 50, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 7.1) });
  }
};

/* ---- 08 LATTICE ---- */
SCENES.lattice = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('n′ − n = t · (1, −1, 0, −1, 1)', 960, 250, s0, C.white, 28);
  eqn('new readout sees  J · t', 960, 310, P(S, 0, 8.0), C.gold, 28);
  /* lattice of readings: multiples of J */
  const lq = P(S, 1, 0.3);
  if (lq > 0) { for (let k = -6; k <= 6; k++) { const x = 960 + k * 50; line(x, 400, x, 420, C.dim, lq, 1.5); if (k % 4 === 0) dot(x, 410, 10, 'g', lq); } line(650, 410, 1270, 410, C.dim, lq, 1.5); txt('reachable: multiples of J  (index |J|, here J = 4)', 960, 455, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: lq }); }
  const cq = P(S, 1, 2.6);
  [10, 8, 7].forEach((m, i) => { const q = cq * clamp((u - lineAt(S, 1).s - 2.6 - i * 0.8) / 0.5); clockMod(400 + i * 400, 650, 95, m, 20, q, t + i, C.cyan); txt('×20', 400 + i * 400, 658, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q * 0.8 }); });
  chip(1640, 650, 400, 100, '', C.mag, P(S, 1, 13.1), 22);
  txt('20 = 2² · 5', 1640, 638, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 13.1) });
  txt('lose v₂ = 2 binary, v₅ = 1 quinary digit', 1640, 672, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 13.1) });
};

/* ---- 09 FIB ---- */
SCENES.fib = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('N₀ = 2x + 5y + 3z', 520, 280, P(S, 0, 3.5), C.cyan, 30);
  eqn('N₁ = 3x + 8y + 5z', 520, 340, P(S, 0, 7.1), C.cyan, 30);
  eqn('N₃ = 8x + 21y + 13z', 520, 400, P(S, 0, 10.7), C.cyan, 30);
  txt('Nₖ = q Mᵏ c,  q = (2,3),  M = [[0,1],[1,1]]', 520, 220, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  const l = P(S, 1, 0.3);
  chip(520, 500, 520, 56, 'J(N₀²) = 20 = 2²·5 → blind mod 2, 5', C.gold, l, 22);
  /* the two samples */
  const sq = P(S, 1, 4.9);
  if (sq > 0) {
    [['A: ∅ + joint', [0, 4], C.white, 1260], ['B: low + high', [1, 3], C.white, 1600]].forEach(([s, ids, col, x], i) => {
      txt(s, x, 260, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: sq });
      ids.forEach((k, j) => { const p = PAT5[k]; const n0 = 2 * p[0] + 5 * p[1] + 3 * p[2]; chip(x, 320 + j * 60, 260, 46, (PK[k] === 'O' ? '∅' : NAME5[PK[k]]) + '  N₀=' + n0, NC[PK[k]], sq, 20); });
    });
    txt('same (N, A, B, C) = (2, 1, 1, 0)', 1430, 470, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sq });
    const r = P(S, 1, 8.7);
    [['Σ N₀²', '49', '29', C.white, 540], ['mod 2', '1', '1', C.red, 610], ['mod 5', '4', '4', C.red, 680]].forEach(([h, a1, a2, col, y], i) => { const q = i === 0 ? r : P(S, 1, 13.2); txt(h, 1100, y, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.dim, a: q }); txt(a1, 1260, y, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, 1600, y, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
  }
};

/* ---- 10 COMBINE ---- */
SCENES.combine = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  const rows = [['N₀²', '20', '2² · 5', '2, 5'], ['N₁²', '48', '2⁴ · 3', '2, 3'], ['N₃²', '336', '2⁴ · 3 · 7', '2, 3, 7'], ['N₀N₁', '31', '31', '31'], ['x y', '1', '1', 'none']];
  ['readout', 'J', 'factors', 'blind mod p'].forEach((h, j) => txt(h, [300, 480, 680, 900][j], 250, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 }));
  rows.forEach((r, i) => { const q = i < 3 ? P(S, 0, [0, 0.3, 2.0][i]) : P(S, 1, [0.3, 5.9][i - 3]); if (q <= 0) return; const y = 290 + i * 70, col = i === 3 ? C.green : i === 4 ? C.white : C.gold; box(200, y, 820, 56, col, q * 0.7, 1.5, 'rgba(0,0,0,0.45)'); r.forEach((s, j) => txt(s, [300, 480, 680, 900][j], y + 37, { size: 24, fam: F.mono, w: 700, align: 'center', c: j === 3 && i < 3 ? C.red : col, a: q })); });
  eqn('gcd(20, 336) = 4', 1440, 300, P(S, 0, 5.3), C.red, 28);
  eqn('4xy = 17N₀² − N₃² − 4x + 16y + 16z', 1440, 360, P(S, 0, 7.0), C.white, 22);
  eqn('gcd(20, 31) = 1', 1440, 470, P(S, 1, 4.5), C.green, 28);
  eqn('xy = 14N₀² − 9N₀N₁ − 2x + 10y + 9z', 1440, 530, P(S, 1, 5.9), C.green, 22);
  chip(1440, 650, 560, 52, 'needs both readings on one source', C.orange, P(S, 1, 8.3), 22);
  chip(1440, 720, 560, 52, 'large coefficients amplify noise', C.orange, P(S, 1, 11.6), 22);
};

/* ---- 11 PARITY ---- */
SCENES.parity = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u), Fb = [0, 1]; for (let i = 0; i < 30; i++) Fb.push(Fb[Fb.length - 1] + Fb[Fb.length - 2]);
  txt('Fₙ mod 2', 200, 300, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.dim, a: s0 });
  for (let n = 0; n < 21; n++) { const q = s0 * clamp((u - 0.3 - n * 0.08) / 0.3), v = Fb[n] % 2, x = 360 + n * 66; box(x, 270, 56, 56, n % 3 === 0 ? C.gold : C.cyan, q, 1.5, 'rgba(0,0,0,0.45)'); txt(String(v), x + 28, 308, { size: 26, fam: F.mono, w: 700, align: 'center', c: v ? C.cyan : C.gold, a: q }); txt(String(n), x + 28, 350, { size: 13, fam: F.mono, align: 'center', c: C.dim, a: q }); }
  txt('period 3', 1760, 308, { size: 22, fam: F.mono, w: 700, align: 'left', c: C.gold, a: P(S, 0, 3.8) });
  eqn('N₃ⱼ = F₃ⱼ₊₃ x + F₃ⱼ₊₅ y + F₃ⱼ₊₄ z', 960, 440, P(S, 0, 5.5), C.white, 28);
  eqn('N₃ⱼ mod 2 = y + z   for every j', 960, 510, P(S, 0, 7.7), C.gold, 32);
  const l = P(S, 1, 0.3);
  for (let j = 0; j < 8; j++) { const q = l * clamp((u - lineAt(S, 1).s - 0.3 - j * 0.3) / 0.3); chip(330 + j * 180, 640, 150, 52, 'y+z', C.cyan, q, 24); }
  chip(960, 760, 620, 52, 'x y never appears', C.red, P(S, 1, 3), 24);
};

/* ---- 12 GUARD ---- */
SCENES.guard = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  /* pipeline */
  chip(300, 300, 240, 56, 'window σ', C.white, s0, 22); arrow(425, 300, 520, 300, C.dim, s0, 2.5);
  chip(660, 300, 260, 56, 'seam η = x', C.gold, P(S, 0, 11.6), 22); arrow(795, 300, 890, 300, C.dim, s0, 2.5);
  chip(1040, 300, 280, 56, 'feed high [5]', C.mag, P(S, 0, 5.0), 22); arrow(1185, 300, 1280, 300, C.dim, s0, 2.5);
  chip(1460, 300, 320, 56, 'reject ⇔ η = 1', C.red, P(S, 0, 6.8), 22);
  const rows = [['∅', '0', '1', '0'], ['low', '0', 'reject', '0'], ['middle', '1', '0', '0'], ['high', '1', '0', '0'], ['joint', '1', 'reject', '1']];
  const hx = [520, 820, 1120, 1420];
  ['pattern', 'current mod 2', 'after [5]', 'product'].forEach((h, j) => txt(h, hx[j], 420, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 0) }));
  rows.forEach((r, i) => { const q = P(S, 1, 0.3 + i * 0.4), y = 450 + i * 64, hi = i === 4; if (q <= 0) return; box(380, y, 1180, 54, hi ? C.green : C.dim, q * (hi ? 1 : 0.5), hi ? 2.5 : 1.2, 'rgba(0,0,0,0.45)'); r.forEach((s, j) => txt(s, hx[j], y + 36, { size: 24, fam: F.mono, w: 700, align: 'center', c: j === 2 && s === 'reject' ? C.red : hi ? C.green : C.white, a: q })); });
  eqn('(y + z) · x = x y', 960, 800, P(S, 1, 5.1), C.green, 32);
};

/* ---- 13 TETRA ---- */
SCENES.tetra = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  pyrTrue(470, 590, 330, t * 0.25, s0, { r: 16, ls: 20, fill: 0.08 });
  txt('span{1, x, y, z}', 470, 260, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 });
  txt('occupancy pyramid', 470, 860, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 });
  const tq = P(S, 0, 8.1);
  if (tq > 0) {
    const v = v3(1450, 600, 300, t * 0.25 + 0.4, 0.45, [0.5, 0.5, 0.4]), Vt = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 1]].map(p => v(...p));
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) line(Vt[i][0], Vt[i][1], Vt[j][0], Vt[j][1], C.mag, tq, 2.5);
    [['∅', 'w'], ['low', 'c'], ['mid / high', 'm'], ['joint', 'n']].forEach(([s, d], i) => { dot(Vt[i][0], Vt[i][1], 16, d, tq); txt(s, Vt[i][0] + 18, Vt[i][1] - 18, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.white, a: tq }); });
    txt('span{1, x, y+z, xy}', 1450, 260, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: tq });
    txt('behavior tetrahedron · volume 1/6', 1450, 860, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: tq });
  }
  const l = P(S, 1, 0.3);
  chip(960, 380, 380, 52, 'shared: 1, x, y+z', C.white, l, 22);
  chip(960, 460, 380, 52, 'pyramid misses xy', C.cyan, P(S, 1, 2.4), 22);
  chip(960, 540, 380, 52, 'tetra merges mid, high', C.mag, P(S, 1, 6.2), 22);
  chip(960, 640, 380, 60, 'together: all five', C.green, P(S, 1, 10.0), 26);
};

/* ---- 14 QUANTUM ---- */
SCENES.quantum = S => {
  const u = S.u, t = S.t;
  badges(S, ['classical', 'classical']);
  const s0 = clamp(u), ph = t * 0.6;
  qubit(480, 520, 190, Math.PI / 2, ph, s0, C.gold, t);
  txt('direction s X + t Y', 480, 270, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  eqn('(sX + tY)² = (s² + t²) I', 1340, 300, P(S, 0, 2.6), C.gold, 30);
  txt('average: the same number for every state', 1340, 360, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 7.5) });
  const l = P(S, 1, 0.3);
  eqn('[X, Y] / 2i = Z', 1340, 470, l, C.green, 34);
  const zq = P(S, 1, 2.5);
  qubit(1180, 650, 80, 0.02, 0, zq, C.cyan, t); qubit(1500, 650, 80, Math.PI - 0.02, 0, zq, C.mag, t);
  txt('ρ₊: ⟨Z⟩ = +1', 1180, 770, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: zq }); txt('ρ₋: ⟨Z⟩ = −1', 1500, 770, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: zq });
  txt('same ⟨X⟩ = ⟨Y⟩ = 0', 1340, 820, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: zq });
  chip(480, 800, 600, 52, 'anticommutation, not 2 = 0', C.orange, P(S, 1, 5.0), 22);
};

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['ADDS RANK?', '[f] ≠ 0 · J ≠ 0', C.gold], ['PRECISION SEES IT?', 'gcd(m, J) = 1', C.cyan], ['FUTURE READS IT?', 'guard · same source', C.mag]];
    items.forEach(([a1, a2, col], i) => { const x = 420 + i * 540, q = P(S, 0, [0.3, 3.6, 5.7][i]) * fade; box(x - 240, 250, 480, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 315, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 365, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    txt('LEAN · SumFreeCodeDimensionRefutation.result · code dims 5 and 4', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.3) * fade });
    txt('VOLUME · four-corner rank · volumes · lattices · guard reading', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 2.9) * fade });
    txt('RECOMPUTED · every number in this film', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 9.6) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), a = ep * out;
    const R = pyrTrue(W / 2, 390, 260, t * 0.3, a, { r: 16, lab: false, fill: 0.08 });
    if (R.P) { const ord = ['O', 'L', 'J', 'R']; ord.forEach((k, i) => { const pl = i % 2 === 0; txt(pl ? '+' : '−', R.P[k][0], R.P[k][1] - 26, { size: 30, fam: F.mono, w: 700, align: 'center', c: pl ? C.green : C.red, a }); }); }
    txt('AURIC FIB ATOM PYRAMID X', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a, ab: 5, ls: 6 });
    txt('金字塔 X · 秩、体积与算术分辨率 · TRURETURING FILM 039', W / 2, 750, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a });
    txt('github.com/the-omega-institute/trureturing', W / 2, 815, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('One corner. One new dimension. Many arithmetic shadows.', W / 2, 875, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WHEN IS IT NEW?', ternary: 'THE TERNARY PLANE', codes: 'SAME RULE · DIFFERENT DIMENSION', rank: 'RESIDUAL RANK', corner: 'THE FOUR-CORNER DIFFERENCE', second: 'SECOND ORDER', volume: 'LIFTED VOLUME', lattice: 'LATTICES AND CLOCKS', fib: 'FIB READOUTS', combine: 'COMBINING READOUTS', parity: 'THE PARITY BLIND SPOT', guard: 'THE GUARD REPLY', tetra: 'PYRAMID AND TETRAHEDRON', quantum: 'QUANTUM SQUARES', finale: 'LEDGER' });

function poster39() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const R = pyrTrue(560, 500, 310, 0.6, 1, { r: 22, ls: 24, fill: 0.08 });
  const sg = { O: '+1', J: '+1', L: '−1', R: '−1' }; Object.keys(sg).forEach(k => txt(sg[k], R.P[k][0] + 34, R.P[k][1] + 44, { size: 34, fam: F.mono, w: 700, align: 'left', c: sg[k][0] === '+' ? C.green : C.red }));
  txt('J = f∅ + f₁₃ − f₁ − f₃', 1390, 300, { size: 40, fam: FG, w: 700, align: 'center', c: C.gold });
  txt('Vol₄ = |J| / 24', 1390, 400, { size: 36, fam: FG, w: 700, align: 'center', c: C.white });
  txt('#preimages mod m = gcd(m, J)', 1390, 480, { size: 30, fam: FG, w: 700, align: 'center', c: C.cyan });
  txt('J(N₀²) = 20 → blind mod 2, 5', 1390, 560, { size: 30, fam: FG, w: 700, align: 'center', c: C.mag });
  txt('FIB 原子金字塔 X', W / 2, 140, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID X', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('同 一 个 四 角 差 · 维 数 、 体 积 与 素 数 盲 区', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 039', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster39;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
