/* Film 033 — AURIC FIB ATOM PYRAMID IV · 金字塔 IV：五千零四十之轮. The 5040 wheel sieve: the golden ratio from five, the Fano plane and Heawood graph from seven, and a Fibonacci engine inside. */

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

/* ---- film 032 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME · RECOMPUTED', C.cyan, 'rgba(0,25,40,0.75)']
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

/* ---- film 033: wheel helpers ---- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
function wheelArr(Hs, N) { const w = new Uint8Array(N); for (let r = 0; r < N; r++) w[r] = Hs.every(h => gcd(r + h, N) === 1) ? 1 : 0; return w; }
const HA = [0, 2, 6], HB = [0, 4, 6];
const WA = wheelArr(HA, 5040), WB = wheelArr(HB, 5040), WA210 = wheelArr(HA, 210), WB210 = wheelArr(HB, 210), WA30 = wheelArr(HA, 30), WB30 = wheelArr(HB, 30);
const AMP210 = (() => { const out = new Float64Array(210); for (let k = 0; k < 210; k++) { let re = 0, im = 0; for (let r = 0; r < 210; r++) if (WA210[r]) { re += Math.cos(TAU * k * r / 210); im -= Math.sin(TAU * k * r / 210); } out[k] = Math.hypot(re, im); } return out; })();
const LCOL = [C.cyan, C.gold, C.mag, C.green, C.vio, C.orange, C.blue];
const DSET = [0, 1, 3];
const FIBN = [0, 1]; for (let i = 0; i < 30; i++) FIBN.push(FIBN[FIBN.length - 1] + FIBN[FIBN.length - 2]);
/* a clock of N hours drawn as ticks; w = legal array (lit outward); lp sweeps the lighting */
function dial(cx, cy, R, N, w, a, o = {}) {
  if (a <= 0) return 0;
  const rot = (o.rot || 0) - Math.PI / 2;
  ring(cx, cy, R, o.rc || C.dim, a * 0.55, 1.2);
  if (o.all) {
    ctx.globalAlpha = a * o.all; ctx.strokeStyle = o.allc || C.cyan; ctx.lineWidth = 1; ctx.beginPath();
    const st = o.step || 1;
    for (let r = 0; r < N; r += st) { const an = rot + TAU * r / N, c = Math.cos(an), s = Math.sin(an); ctx.moveTo(cx + c * (R - 7), cy + s * (R - 7)); ctx.lineTo(cx + c * (R + 7), cy + s * (R + 7)); }
    ctx.stroke(); ctx.globalAlpha = 1;
  }
  let cnt = 0;
  if (w) {
    const lim = Math.floor((o.lp == null ? 1 : o.lp) * N), len = o.len || 30;
    const r1 = o.inner ? R - len : R + 2, r2 = o.inner ? R - 2 : R + len;
    ctx.globalAlpha = a; ctx.strokeStyle = o.col || C.gold; ctx.lineWidth = o.lw || 2.5; ctx.beginPath();
    for (let r = 0; r < lim; r++) if (w[r]) { cnt++; const an = rot + TAU * r / N, c = Math.cos(an), s = Math.sin(an); ctx.moveTo(cx + c * r1, cy + s * r1); ctx.lineTo(cx + c * r2, cy + s * r2); }
    ctx.stroke(); ctx.globalAlpha = 1;
  }
  return cnt;
}
/* a small clock with labelled hours; legal = set of lit hours */
function clockN(cx, cy, R, N, legal, a, o = {}) {
  if (a <= 0) return [];
  const p = ringPts(cx, cy, R, N, (o.rot || 0) - Math.PI / 2);
  strokePoly(p, C.dim, a * 0.45, 1.5);
  p.forEach((q, i) => {
    const on = legal.includes(i), bad = o.bad && o.bad.includes(i);
    if (on) dot(q[0], q[1], o.r || 20, o.dn || 'g', a); else ring(q[0], q[1], (o.r || 20) * 0.55, bad ? C.red : C.dim, a, 2);
    if (o.lab !== false) { const dx = q[0] - cx, dy = q[1] - cy, d = Math.hypot(dx, dy) || 1; txt(String(i), q[0] + dx / d * (o.lo || 38), q[1] + dy / d * (o.lo || 38) + 8, { size: o.ls || 22, fam: F.mono, w: 700, align: 'center', c: on ? (o.lc || C.gold) : C.dim, a }); }
  });
  return p;
}
/* 3D helix: 5040 hours wound 24 times around a cylinder of 210 */
function helix(cx, cy, s, ang, a, o = {}) {
  if (a <= 0) return;
  const hgt = o.h == null ? 1.6 : o.h, tilt = o.tilt == null ? 0.38 : o.tilt;
  const P3 = (r) => { const th = TAU * (r % 210) / 210, z = (r / 5040 - 0.5) * hgt; let p = [Math.cos(th) * s, -z * s, Math.sin(th) * s]; p = rotY(p, ang); p = rotX(p, tilt); return proj(p, cx, cy, 1500, 1500); };
  ctx.globalAlpha = a * 0.35; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1; ctx.beginPath();
  for (let r = 0; r < 5040; r += 3) { const q = P3(r); if (r === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]); }
  ctx.stroke(); ctx.globalAlpha = 1;
  const fib = o.fib || 0;
  if (fib > 0) for (let c = 0; c < 210; c++) if (WA210[c]) { const q1 = P3(c), q2 = P3(c + 210 * 23); line(q1[0], q1[1], q2[0], q2[1], C.gold, a * fib * 0.8, 2); }
  for (let r = 0; r < 5040; r++) if (WA[r]) { const q = P3(r); dot(q[0], q[1], 5 + 3 * (q[2] / 1500), 'g', a * (o.lit == null ? 1 : o.lit)); }
}
function eqn(s, x, y, a, col = C.white, size = 28, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
function mgrid(x, y, M, cs, a, o = {}) {
  if (a <= 0) return;
  M.forEach((row, i) => row.forEach((v, j) => { const q = o.prog == null ? 1 : clamp(o.prog * (M.length * row.length) - (i * row.length + j)); const col = v === 0 ? C.dim : (o.colf ? o.colf(v, i, j) : C.gold); cellv(x + j * cs, y + i * cs, cs, v, col, a * q, v === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(40,30,0,0.45)', o.size || 0.45); }));
}
const circ5 = (d) => [0, 1, 2, 3, 4].map(i => [0, 1, 2, 3, 4].map(j => d[((j - i) % 5 + 5) % 5]));
const GM = circ5([2, 1, 0, 0, 1]), AM = circ5([1, 1, 0, 0, 1]), JM = circ5([1, 1, 1, 1, 1]);
const BM = [0, 1, 2, 3, 4, 5, 6].map(x => [0, 1, 2, 3, 4, 5, 6].map(t => DSET.includes(((x - t) % 7 + 7) % 7) ? 1 : 0));
/* Heawood graph on a 14-gon: even = point x, odd = line t; edge when x - t in D */
function heawood(cx, cy, R, a, o = {}) {
  if (a <= 0) return [];
  const p = ringPts(cx, cy, R, 14, (o.rot || 0) - Math.PI / 2);
  const ep = o.ep == null ? 1 : o.ep; let k = 0;
  for (let x = 0; x < 7; x++) for (const d of DSET) { const t = ((x - d) % 7 + 7) % 7; const q = clamp(ep * 21 - k); k++; const A = p[2 * x], B = p[2 * t + 1]; line(A[0], A[1], lerp(A[0], B[0], q), lerp(A[1], B[1], q), C.cyan, a * 0.7 * (q > 0 ? 1 : 0), 2); }
  if (o.cyc) { const cy6 = [0, 1, 2, 11, 12, 13]; for (let i = 0; i < 6; i++) { const A = p[cy6[i]], B = p[cy6[(i + 1) % 6]]; line(A[0], A[1], B[0], B[1], C.red, a * o.cyc, 6); } }
  p.forEach((q, i) => { dot(q[0], q[1], o.r || 15, i % 2 ? 'g' : 'c', a); if (o.lab) txt(i % 2 ? 'L' + ((i - 1) / 2) : String(i / 2), q[0] + (q[0] - cx) / R * 34, q[1] + (q[1] - cy) / R * 34 + 7, { size: 19, fam: F.mono, w: 700, align: 'center', c: i % 2 ? C.gold : C.cyan, a: a * o.lab }); });
  return p;
}
/* classic Fano drawing; cyclic point x sits at FANO_POS[x] */
function fanoPos(cx, cy, r) {
  const V0 = [cx, cy - 2 * r], V1 = [cx - Math.sqrt(3) * r, cy + r], V2 = [cx + Math.sqrt(3) * r, cy + r];
  const mid = (A, B) => [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  return [V0, V1, V2, mid(V0, V1), mid(V1, V2), [cx, cy], mid(V2, V0)];
}
function fanoLine(t, P, cx, cy, r, col, a, w = 4) {
  if (a <= 0) return;
  const pts = DSET.map(d => (d + t) % 7);
  if (pts.every(x => x === 3 || x === 4 || x === 6)) { ring(cx, cy, r, col, a, w); return; }
  let best = null, bd = -1;
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) { const A = P[pts[i]], B = P[pts[j]], d = Math.hypot(A[0] - B[0], A[1] - B[1]); if (d > bd) { bd = d; best = [A, B]; } }
  line(best[0][0], best[0][1], best[1][0], best[1][1], col, a, w);
}
function bars(x0, y0, vals, bw, sc, a, o = {}) {
  vals.forEach((v, i) => { const q = o.prog == null ? 1 : clamp(o.prog * vals.length - i); const h = v * sc * ease(q); const col = o.colf ? o.colf(v, i) : C.gold; fillBox(x0 + i * bw + 4, y0 - h, bw - 8, h, col, a * 0.75); if (o.lab) txt(o.lab[i], x0 + i * bw + bw / 2, y0 - h - 12, { size: o.ls || 22, fam: F.mono, w: 700, align: 'center', c: col, a: a * q }); if (o.xl) txt(o.xl[i], x0 + i * bw + bw / 2, y0 + 30, { size: 20, fam: F.mono, align: 'center', c: C.dim, a }); });
  line(x0, y0, x0 + vals.length * bw, y0, C.dim, a, 1.5);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const s0 = clamp(u / 1.2);
  const lp = P(S, 1, 3, 6);
  dial(600, 520, 290, 5040, WA, s0, { all: 0.35, rot: t * 0.04, lp, len: 34, lw: 2 });
  txt('5040', 600, 545, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: s0, ab: 3 });
  txt('hours', 600, 595, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  chip(1360, 250, 420, 62, '7! = 5040', C.cyan, P(S, 0, 0.5), 30);
  chip(1360, 330, 560, 62, '= 2⁴ · 3² · 5 · 7', C.gold, P(S, 0, 2.5), 30);
  const r1 = P(S, 0, 5);
  eqn('σ(5040) / 5040 = 3.838', 1360, 440, r1, C.white, 28);
  eqn('e^γ · log log 5040 = 3.817', 1360, 485, r1, C.white, 28);
  chip(1360, 545, 300, 50, 'inequality fails', C.red, P(S, 0, 6.5), 22);
  txt('Robin 1984: RH ⟺ σ(n) < e^γ n log log n  for all n > 5040', 1360, 625, { size: 21, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 8.5) });
  const q = P(S, 1, 0.3);
  chip(1360, 730, 560, 56, 'not touched in this film', C.dim, q, 24);
  chip(1360, 810, 620, 56, 'where does φ hide in the sieve?', C.gold, P(S, 1, 3), 24);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  dial(560, 400, 190, 5040, WA, rp, { all: 0.25, step: 2, rot: t * 0.05, len: 26, lw: 2 });
  clockN(560, 400, 90, 5, [1, 2], rp, { r: 13, lab: false });
  heawood(1360, 400, 190, rp, { rot: -t * 0.05, r: 12 });
  txt(scramble('AURIC FIB ATOM PYRAMID IV', rp, 331), W / 2, 690, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 IV · 五 千 零 四 十 之 轮', W / 2, 765, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 033 · AURIC_FIB_ATOM_PYRAMID_FOUNDATIONAL_FORMULAS_AND_RELATIONS §§27, 31–34', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['5 → φ', C.gold], ['7 → flat √2', C.cyan], ['5 × 7 → Fibonacci engine', C.mag]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 520, 860, 480, 60, s, col, P(S, 1, 0.3 + i * 1.4), 24));
};

/* ---- 02 WHEEL ---- */
SCENES.wheel = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  /* ruler */
  const x0 = 160, dx = 46, y = 290;
  for (let i = 0; i <= 13; i++) { line(x0 + i * dx, y - 10, x0 + i * dx, y + 10, C.dim, s0, 2); txt(String(i), x0 + i * dx, y + 40, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: s0 }); }
  line(x0, y, x0 + 13 * dx, y, C.dim, s0, 2);
  const sh = P(S, 0, 6, 0.8), r0 = 5;
  HA.forEach((h, i) => { const xx = x0 + (r0 + h) * dx; dot(xx, y, 16, 'g', sh); });
  txt('r, r+2, r+6  :  5, 7, 11', x0 + 6.5 * dx, y - 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: sh });
  chip(x0 + 6.5 * dx, 410, 420, 54, 'H_A = {0, 2, 6}', C.gold, P(S, 0, 7.5), 26);
  const y2 = 520, sm = P(S, 0, 10.5, 0.8);
  for (let i = 0; i <= 13; i++) line(x0 + i * dx, y2 - 10, x0 + i * dx, y2 + 10, C.dim, sm, 2);
  line(x0, y2, x0 + 13 * dx, y2, C.dim, sm, 2);
  HB.forEach(h => dot(x0 + (7 + h) * dx, y2, 16, 'm', sm));
  txt('7, 11, 13', x0 + 10 * dx, y2 - 34, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: sm });
  chip(x0 + 6.5 * dx, 610, 420, 54, 'H_B = {0, 4, 6}  (mirror)', C.mag, sm, 24);
  txt('legal r : gcd(r + h, 5040) = 1 for every h ∈ H', x0 + 6.5 * dx, 720, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 1) });
  txt('r = 11 → 11, 13, 17 ✓     r = 1 → 1, 3, 7 ✗ (3 | 5040)', x0 + 6.5 * dx, 765, { size: 20, fam: F.mono, align: 'center', c: C.white, a: P(S, 0, 3) });
  /* dial */
  const q = P(S, 1, 0, 0.6), lp = clamp((u - 5) / (lineAt(S, 1).e - 5.5));
  const nA = dial(1380, 500, 260, 5040, WA, Math.max(q, 0.75 * s0), { all: 0.3, step: 2, lp, len: 34, rot: t * 0.03 });
  const nB = dial(1380, 500, 252, 5040, WB, Math.max(q, 0.75 * s0), { lp, len: 30, inner: true, col: C.mag, rot: t * 0.03 });
  eqn(String(nA), 1380, 495, clamp(lp * 8), C.gold, 54);
  eqn('legal of 5040', 1380, 535, clamp(lp * 8), C.dim, 20);
  chip(1250, 830, 220, 52, 'H_A: ' + nA, C.gold, q, 24);
  chip(1510, 830, 220, 52, 'H_B: ' + nB, C.mag, q, 24);
};

/* ---- 03 QUOTIENT ---- */
SCENES.quotient = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), k2 = lineAt(S, 1).s;
  const f1 = 1 - P(S, 1, 0, 0.8);
  if (f1 > 0) {
    const h = lerp(1.7, 0.08, ease(P(S, 0, 10.5, 2.5)));
    helix(700, 520, 300, 0.3 + t * 0.12, s0 * f1, { h, fib: P(S, 0, 9, 1.2), tilt: 0.42 });
    chip(1430, 260, 620, 58, 'ρ : ℤ/5040 → ℤ/210', C.cyan, P(S, 0, 4) * f1, 26);
    chip(1430, 340, 620, 58, '210 = 2 · 3 · 5 · 7 = rad(5040)', C.white, P(S, 0, 6) * f1, 24);
    chip(1430, 420, 620, 58, 'each fibre: 24 hours', C.gold, P(S, 0, 9.5) * f1, 26);
    eqn('w₅₀₄₀ = w₂₁₀ ∘ ρ', 1430, 530, P(S, 0, 11) * f1, C.gold, 30);
    eqn('8 legal × 24 = 192', 1430, 590, P(S, 0, 12) * f1, C.white, 26);
    txt('24 turns of the 210-wheel', 700, 880, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 * f1 * (1 - P(S, 0, 10.5)) });
    txt('pressed flat: every legal hour stacks 24 deep', 700, 880, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 11.5) * f1 });
  }
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const x0 = 180, x1 = 1740, yb = 640, sw = P(S, 1, 4, 4);
    line(x0, yb, x1, yb, C.dim, q, 1.5);
    ctx.globalAlpha = q * 0.85; ctx.strokeStyle = C.gold; ctx.lineWidth = 2.2; ctx.beginPath();
    for (let k = 0; k < 5040 * sw; k += 24) { const v = 24 * AMP210[k / 24], xx = x0 + (x1 - x0) * k / 5040; ctx.moveTo(xx, yb); ctx.lineTo(xx, yb - v * 1.8); }
    ctx.stroke(); ctx.globalAlpha = 1;
    txt('|ŵ₅₀₄₀(k)| ,  k = 0 … 5039', x0, 240, { size: 24, fam: F.mono, w: 700, c: C.white, a: q });
    txt('0', x0, yb + 34, { size: 20, fam: F.mono, c: C.dim, a: q }); txt('5039', x1, yb + 34, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: q });
    chip(560, 760, 600, 56, 'C₅₀₄₀(s) = 24 · C₂₁₀(ρ s)', C.cyan, P(S, 1, 0.8), 24);
    chip(560, 850, 600, 56, 'k ≡ 0 (mod 24) → 24 · ŵ₂₁₀(k/24)', C.gold, P(S, 1, 5), 22);
    chip(1220, 760, 520, 56, 'otherwise exactly 0', C.red, P(S, 1, 6.5), 24);
    chip(1220, 850, 520, 56, '210 alive of 5040', C.green, P(S, 1, 10), 24);
  }
};

/* ---- 04 TWINS ---- */
SCENES.twins = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), f1 = 1 - P(S, 1, 0, 0.8) * 0.0;
  const lA = [...WA30].map((v, i) => v ? i : -1).filter(i => i >= 0), lB = [...WB30].map((v, i) => v ? i : -1).filter(i => i >= 0);
  const spin = ease(P(S, 0, 4.5, 2));
  txt('mod 30', 560, 225, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  clockN(400, 430, 140, 30, lA, s0, { r: 11, lab: false, rot: -TAU * 4 / 30 * spin });
  clockN(730, 430, 140, 30, lB, s0, { r: 11, lab: false, dn: 'm' });
  txt('H_A', 400, 620, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  txt('H_B', 730, 620, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: s0 });
  chip(565, 690, 460, 54, 'pair statistics equal ✓', C.cyan, P(S, 0, 1.5), 24);
  chip(565, 770, 460, 54, 'rotate by 4 → same wheel ✓', C.green, P(S, 0, 6.6), 24);
  const q = P(S, 1, 0.2);
  if (q > 0) {
    txt('mod 210', 1330, 225, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    const rr = Math.floor(t * 6) % 210;
    dial(1330, 450, 175, 210, WA210, q, { all: 0.3, len: 30, rot: TAU * rr / 210 });
    dial(1330, 450, 168, 210, WB210, q, { len: 28, inner: true, col: C.mag });
    txt('no rotation matches', 1330, 425, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 1.5) });
    chip(1330, 690, 560, 54, 'T_A(6, 30) = 1  ≠  T_B(6, 30) = 0', C.red, P(S, 1, 3.5), 22);
    const ps = [2, 3, 5, 7, 11, 13], okp = [1, 1, 1, 0, 0, 0];
    txt('{a, a+2, a+6} = {0, 4, 6} mod p ?', 1330, 775, { size: 21, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 6) });
    ps.forEach((p, i) => { const x = 1330 + (i - 2.5) * 110, qq = P(S, 1, 6.5 + i * 0.35); chip(x, 830, 96, 50, p + (okp[i] ? ' ✓' : ' ✗'), p === 7 ? C.red : (okp[i] ? C.green : C.dim), qq, 22); });
    stamp('SEVEN', 1330, 500, P(S, 1, 9.5), C.red, 34, -0.05);
  }
};

/* ---- 05 FIVE ---- */
SCENES.five = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const s0 = clamp(u);
  clockN(420, 470, 170, 5, [1, 2], s0, { r: 22, bad: [0, 3, 4] });
  txt('legal mod 5 : {1, 2}', 420, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  /* phasor */
  const kk = Math.floor(clamp((u - 3) / 9) * 5) % 5, pq = P(S, 0, 3);
  const k = u < lineAt(S, 1).s ? kk : 1;
  const ox = 960, oy = 470, sc = 120;
  ring(ox, oy, sc, C.dim, pq * 0.4, 1);
  const e1 = [Math.cos(-TAU * k / 5), Math.sin(-TAU * k / 5)], e2 = [Math.cos(-TAU * 2 * k / 5), Math.sin(-TAU * 2 * k / 5)];
  const A1 = [ox + e1[0] * sc, oy - e1[1] * sc], A2 = [A1[0] + e2[0] * sc, A1[1] - e2[1] * sc];
  arrow(ox, oy, A1[0], A1[1], C.cyan, pq, 3); arrow(A1[0], A1[1], A2[0], A2[1], C.cyan, pq, 3); arrow(ox, oy, A2[0], A2[1], C.gold, pq, 5);
  txt('k = ' + k, ox, 230, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: pq });
  const amp = Math.hypot(e1[0] + e2[0], e1[1] + e2[1]);
  txt('|ŵ₅(' + k + ')| = ' + amp.toFixed(3), ox, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: pq });
  const vals = [2, PHI_, 1 / PHI_, 1 / PHI_, PHI_];
  bars(1260, 640, vals, 92, 150, P(S, 0, 4), { prog: P(S, 0, 4, 6), lab: ['2', 'φ', '1/φ', '1/φ', 'φ'], xl: ['0', '1', '2', '3', '4'], colf: (v) => v > 1.9 ? C.white : (v > 1 ? C.gold : C.cyan) });
  txt('k', 1260 + 5 * 92 + 20, 670, { size: 20, fam: F.mono, c: C.dim, a: P(S, 0, 4) });
  const l = P(S, 1, 0.3);
  thm('|1 + e^{iθ}| = 2|cos(θ/2)|', 1490, 770, l, 'center');
  thm('PentagonCosines.pentagon_golden_cosines : 2cos(π/5) = φ , 2cos(2π/5) = φ⁻¹', 960, 830, P(S, 1, 2), 'center');
  stamp('FROZEN', 960, 300, P(S, 1, 4), C.green, 34, -0.04);
};

/* ---- 06 SEVEN ---- */
SCENES.seven = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), k2 = lineAt(S, 1).s;
  const cx = 500, cy = 480, R = 230;
  const p = clockN(cx, cy, R, 7, DSET, s0, { r: 20, lo: 42, ls: 26 });
  const diffs = []; DSET.forEach(a => DSET.forEach(b => { if (a !== b) diffs.push([b, a, ((a - b) % 7 + 7) % 7]); }));
  diffs.sort((x, y) => x[2] - y[2]);
  diffs.forEach(([from, to, d], i) => { const q = P(S, 0, 3 + i * 0.9, 0.6) * (1 - P(S, 1, 0, 0.6) * 0.7); const ddx = p[to][0] - p[from][0], ddy = p[to][1] - p[from][1], dl = Math.hypot(ddx, ddy), nx = -ddy / dl * 8, ny = ddx / dl * 8; const sx = p[from][0] + nx, sy = p[from][1] + ny; arrow(lerp(sx, sx + ddx, 0.08), lerp(sy, sy + ddy, 0.08), lerp(sx, sx + ddx, 0.9), lerp(sy, sy + ddy, 0.9), LCOL[i], q, 3); txt(String(d), sx + ddx * 0.5 + nx * 2.4, sy + ddy * 0.5 + ny * 2.4 + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: LCOL[i], a: q }); });
  txt('D = {0, 1, 3}', cx, 820, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  /* tally */
  for (let d = 1; d <= 6; d++) { const x = 960 + (d - 1) * 96, q = P(S, 0, 3 + (d - 1) * 0.9); box(x - 38, 250, 76, 76, q > 0 ? LCOL[d - 1] : C.dim, Math.max(0.5 * s0, q), 2, 'rgba(0,0,0,0.5)'); txt(String(d), x, 300, { size: 32, fam: F.mono, w: 700, align: 'center', c: LCOL[d - 1], a: s0 }); txt('×1', x, 360, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); }
  txt('every nonzero difference exactly once', 1200, 410, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 9) });
  const q = P(S, 1, 0.3);
  bars(980, 660, [3, 2 ** .5, 2 ** .5, 2 ** .5, 2 ** .5, 2 ** .5, 2 ** .5], 62, 50, q, { prog: P(S, 1, 0.3, 2), lab: ['3', '√2', '√2', '√2', '√2', '√2', '√2'], ls: 18, colf: (v) => v > 2 ? C.white : C.cyan });
  txt('|D̂(k)|', 980 + 7 * 31, 470, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
  eqn('|D̂(k)|² = 3 + Σ_{r≠0} χ(r) = 2', 1200, 740, P(S, 1, 2.5), C.cyan, 24);
  eqn('forbidden mod 7 (H_A) = {0, 5, 1} = 5 · D', 1200, 820, P(S, 1, 6), C.mag, 24);
};

/* ---- 07 FANO ---- */
SCENES.fano = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'published');
  const s0 = clamp(u), k2 = lineAt(S, 1).s;
  const cx = 480, cy = 470, R = 220;
  const pc = ringPts(cx, cy, R, 7);
  const fx = 1370, fy = 520, fr = 150, FP = fanoPos(fx, fy, fr);
  const nl = u < k2 ? Math.min(7, Math.floor(clamp((u - 1.5) / 8) * 8)) : 7;
  const live = u < k2 ? nl - 1 : -1;
  let hi = -1, hp = [];
  if (u >= k2) { const l2 = u - k2, ph = Math.floor(l2 / 2.5); if (ph === 0) { hp = [2, 6]; hi = 6; } else if (ph === 1) { hi = -2; } else { hi = -3; } }
  for (let tt = 0; tt < nl; tt++) {
    const tri = DSET.map(d => pc[(d + tt) % 7]);
    let a = s0 * (tt === live ? 1 : 0.45);
    if (hi >= 0) a = s0 * (tt === hi ? 1 : 0.12);
    if (hi === -2) a = s0 * ((tt === 0 || tt === 1) ? 1 : 0.12);
    if (hi === -3) a = s0 * ([0, 4, 6].includes(tt) ? 1 : 0.12);
    strokePoly(tri, LCOL[tt], a, tt === live || hi >= -3 && a > 0.5 ? 5 : 3);
    fanoLine(tt, FP, fx, fy, fr, LCOL[tt], a, tt === live ? 6 : 4);
  }
  pc.forEach((q, i) => { const hl = (hi >= 0 && hp.includes(i)) || (hi === -2 && i === 1) || (hi === -3 && i === 0); dot(q[0], q[1], hl ? 26 : 18, hl ? 'w' : 'c', s0); txt(String(i), q[0] + (q[0] - cx) / R * 40, q[1] + (q[1] - cy) / R * 40 + 8, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 }); });
  FP.forEach((q, i) => { const hl = (hi >= 0 && hp.includes(i)) || (hi === -2 && i === 1) || (hi === -3 && i === 0); dot(q[0], q[1], hl ? 24 : 16, hl ? 'w' : 'c', s0); txt(String(i), q[0] + 26, q[1] - 14, { size: 22, fam: F.mono, w: 700, c: C.white, a: s0 }); });
  txt('D + t ,  t = 0 … 6', cx, 790, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  txt('the Fano plane', fx, 790, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 6) });
  const msgs = ['two points → one line', 'two lines → one point', 'each point on three lines'];
  msgs.forEach((m, i) => { const q = u >= k2 ? clamp((u - k2 - i * 2.5) / 0.5) : 0; chip(960, 850, 560, 54, m, C.white, q * (i === Math.min(2, Math.floor((u - k2) / 2.5)) ? 1 : 0), 24); });
};

/* ---- 08 HEAWOOD ---- */
SCENES.heawood = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const s0 = clamp(u), k2 = lineAt(S, 1).s;
  heawood(520, 480, 270, s0, { ep: P(S, 0, 0.5, 3.5), cyc: P(S, 0, 4.5) * (1 - P(S, 1, 0.3)), lab: 1 });
  txt('points', 360, 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 });
  txt('lines', 680, 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  chip(520, 890, 520, 50, '14 vertices · degree 3 · girth 6', C.white, P(S, 0, 3), 22);
  const fz = s0 * P(S, 0, 1) * (1 - P(S, 1, 0, 0.5));
  if (fz > 0) { const FP = fanoPos(1350, 500, 120); for (let tt = 0; tt < 7; tt++) fanoLine(tt, FP, 1350, 500, 120, LCOL[tt], fz * 0.85, 3); FP.forEach((q, i) => dot(q[0], q[1], 14, 'c', fz)); txt('incidence graph of the Fano plane', 1350, 780, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: fz }); txt('7 points + 7 lines = 14 vertices', 1350, 822, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: fz }); }
  const f1 = 1 - P(S, 1, 5, 0.6);
  if (f1 > 0) {
    const ax = 1350, ay0 = 260, ay1 = 760, ys = v => lerp(ay1, ay0, (v + 3.4) / 6.8);
    const q = P(S, 1, 0.2) * f1;
    line(ax - 260, ys(0), ax + 260, ys(0), C.dim, q, 1.5);
    [[3, 1], [Math.SQRT2, 6], [-Math.SQRT2, 6], [-3, 1]].forEach(([v, m], i) => { const qq = P(S, 1, 0.4 + i * 0.4) * f1; line(ax - 200, ys(v), ax + 200, ys(v), v > 0 ? C.gold : C.cyan, qq, 3); for (let j = 0; j < m; j++) dot(ax - 150 + j * 52, ys(v), 11, v > 0 ? 'g' : 'c', qq); txt((v > 0 ? '+' : '−') + (Math.abs(v) > 2 ? '3' : '√2') + '   ×' + m, ax + 230, ys(v) + 8, { size: 26, fam: F.mono, w: 700, c: v > 0 ? C.gold : C.cyan, a: qq }); });
    txt('spectrum of the Heawood graph', ax, 225, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  }
  const q = P(S, 1, 5.6);
  if (q > 0) {
    txt('B  (point × line)', 1180, 225, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    mgrid(1020, 245, BM, 46, q, { prog: P(S, 1, 5.6, 1.5), size: 0.5 });
    eqn('B Bᵀ = Bᵀ B = 2I + J', 1340, 640, P(S, 1, 7), C.gold, 26);
    eqn('sv(B) = {3, √2 ×6}', 1340, 690, P(S, 1, 8.5), C.gold, 24);
    eqn('C = J − B :  C Cᵀ = 2I + 2J', 1340, 760, P(S, 1, 11), C.cyan, 26);
    eqn('sv(C) = {4, √2 ×6} = the sieve mod 7', 1340, 810, P(S, 1, 12.5), C.cyan, 24);
    eqn('B_{5D} = P₅ B P₅⁻¹', 1340, 870, P(S, 1, 15), C.mag, 24);
  }
};

/* ---- 09 PRODUCT ---- */
const V5 = [2, PHI_, PHI_, 1 / PHI_, 1 / PHI_], V7 = [4, 1, 1, 1, 1, 1, 1].map((v, i) => i ? Math.SQRT2 : 4);
const PROD_COL = (v) => { const r = Math.round(v * 1000); return r === 8000 ? C.white : r === Math.round(4 * PHI_ * 1000) ? C.gold : r === Math.round(2 * Math.SQRT2 * 1000) ? C.green : r === Math.round(4 / PHI_ * 1000) ? C.orange : r === Math.round(Math.SQRT2 * PHI_ * 1000) ? C.mag : C.cyan; };
SCENES.product = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  const loc = [['mod 2', '1, 1', C.dim], ['mod 3', '1, 1, 1', C.dim], ['mod 5', '2, φ, φ, 1/φ, 1/φ', C.gold], ['mod 7', '4, √2 ×6', C.cyan]];
  const ly = [290, 370, 500, 580]; loc.forEach(([m, v, col], i) => { const q = i < 2 ? P(S, 0, 1 + i * 1.2) : P(S, 1, 0.5 + (i - 2) * 3.5); txt(m, 150, ly[i], { size: 26, fam: F.mono, w: 700, c: col, a: q }); txt(v, 280, ly[i], { size: 26, fam: F.mono, w: 700, c: C.white, a: q }); });
  const cf = s0 * (1 - P(S, 1, 6, 0.6));
  [[2, [1]], [3, [2]], [5, [1, 2]], [7, [2, 3, 4, 6]]].forEach(([n, lg], i) => { const x = 860 + i * 250, q = cf * (i < 2 ? P(S, 0, 1 + i * 1.2) : P(S, 1, 0.5 + (i - 2) * 3.5)); clockN(x, 400, 70, n, lg, q, { r: 12, lab: false }); txt('mod ' + n, x, 520, { size: 22, fam: F.mono, w: 700, align: 'center', c: i < 2 ? C.dim : (i === 2 ? C.gold : C.cyan), a: q }); });
  chip(960, 790, 760, 56, 'ℤ/210 ≅ ℤ/2 × ℤ/3 × ℤ/5 × ℤ/7', C.white, P(S, 0, 0.5), 24);
  txt('permutations · amplitude 1', 280, 425, { size: 20, fam: F.mono, c: C.dim, a: P(S, 0, 3.5) });
  const gq = P(S, 1, 6.5), cs = 66, gx = 760, gy = 300;
  if (gq > 0) {
    V7.forEach((v, j) => txt(j ? '√2' : '4', gx + j * cs + cs / 2, gy - 14, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: gq }));
    V5.forEach((v, i) => txt(['2', 'φ', 'φ', '1/φ', '1/φ'][i], gx - 14, gy + i * cs + cs / 2 + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.gold, a: gq }));
    V5.forEach((a5, i) => V7.forEach((a7, j) => { const q = clamp(P(S, 1, 6.5, 2.5) * 35 - (i * 7 + j)), v = a5 * a7, col = PROD_COL(v); box(gx + j * cs + 3, gy + i * cs + 3, cs - 6, cs - 6, col, q, 2, rgba(col, 0.22)); }));
    txt('× 6  (2 · 3 copies)', gx + 7 * cs / 2, gy + 5 * cs + 44, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 9) });
  }
  const rows = [['8', 6, C.white], ['4φ', 12, C.gold], ['2√2', 36, C.green], ['4/φ', 12, C.orange], ['√2 φ', 72, C.mag], ['√2/φ', 72, C.cyan]];
  rows.forEach(([v, m, col], i) => { const q = P(S, 1, 9 + i * 0.5); txt(v, 1420, 300 + i * 66, { size: 30, fam: F.mono, w: 700, align: 'right', c: col, a: q }); txt('×' + m, 1460, 300 + i * 66, { size: 28, fam: F.mono, w: 700, c: C.white, a: q }); });
  chip(1460, 730, 380, 56, 'Σ = 210', C.gold, P(S, 1, 12.5), 28);
};

/* ---- 10 TABLE ---- */
SCENES.table = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  const rows = [['192', 6, C.white, 192], ['96 φ', 12, C.gold, 96 * PHI_], ['48 √2', 36, C.green, 48 * Math.SQRT2], ['96 / φ', 12, C.orange, 96 / PHI_], ['24 √2 φ', 72, C.mag, 24 * Math.SQRT2 * PHI_], ['24 √2 / φ', 72, C.cyan, 24 * Math.SQRT2 / PHI_], ['0', 4830, C.red, 0]];
  rows.forEach(([v, m, col], i) => { const q = P(S, 0, 3.8 + i * 1.5); txt(v, 420, 280 + i * 54, { size: 30, fam: F.mono, w: 700, align: 'right', c: col, a: q }); txt('×' + m, 460, 280 + i * 54, { size: 28, fam: F.mono, w: 700, c: C.white, a: q }); });
  /* zoom: first 210 sorted singular values */
  const x0 = 820, x1 = 1720, yb = 600, hs = 1.75;
  let idx = 0; const zq = P(S, 0, 3.8, 9);
  rows.slice(0, 6).forEach(([v, m, col, val], i) => { const xa = x0 + (x1 - x0) * idx / 210, xb = x0 + (x1 - x0) * (idx + m) / 210, q = clamp(zq * 7 - i); fillBox(xa, yb - val * hs * ease(q), xb - xa - 1, val * hs * ease(q), col, s0 * 0.7 * (q > 0 ? 1 : 0)); idx += m; });
  line(x0, yb, x1, yb, C.dim, s0, 1.5);
  txt('the 210 nonzero singular values', (x0 + x1) / 2, 232, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  /* full strip */
  const fy = 700, fq = P(S, 0, 13);
  const xs = x0 + (x1 - x0) * 210 / 5040;
  fillBox(x0, fy - 30, xs - x0, 30, C.gold, fq * 0.8);
  dashed(xs, fy, x1, fy, C.red, fq, 3);
  txt('210', x0, fy + 34, { size: 20, fam: F.mono, w: 700, c: C.gold, a: fq });
  txt('4830 blind directions', (xs + x1) / 2, fy - 16, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: fq });
  txt('all 5040', x1, fy + 34, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: fq });
  const l = P(S, 1, 0.3);
  chip(360, 740, 420, 56, 'rank = 210', C.gold, l, 26);
  chip(560, 820, 820, 56, 'κ = 192 / (24√2/φ) = 4√2 φ ≈ 9.153', C.cyan, P(S, 1, 6), 24);
  chip(1270, 820, 520, 56, 'κ(Gram) = 32 φ² ≈ 83.78', C.mag, P(S, 1, 9), 24);
};

/* ---- 11 ENGINE ---- */
SCENES.engine = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), cs = 52;
  const colf = v => v === 2 ? C.white : C.gold;
  eqn('G = CᵀC = 2I + U + Uᵀ', 290, 240, s0, C.white, 22);
  mgrid(160, 262, GM, cs, s0, { prog: P(S, 0, 0.5, 1.5), colf });
  eqn('A = G − I', 690, 240, P(S, 0, 3), C.gold, 24);
  mgrid(560, 262, AM, cs, P(S, 0, 3), { prog: P(S, 0, 3, 1.5) });
  eqn('A² − A − I = J', 1090, 240, P(S, 0, 6), C.cyan, 24);
  mgrid(960, 262, JM, cs, P(S, 0, 6), { prog: P(S, 0, 6, 1.5), colf: () => C.cyan });
  const l = P(S, 1, 0.3);
  chip(560, 620, 640, 56, 'Σ v = 0  ⇒  J v = 0', C.dim, l, 24);
  chip(560, 700, 640, 62, 'A² = A + I', C.gold, P(S, 1, 3), 32);
  txt('x² = x + 1  →  φ ,  −1/φ', 560, 790, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) });
  txt('spec A on Σv = 0 : φ ×2 , −1/φ ×2', 560, 840, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 6) });
  eqn('Aᵐ = F_m · A + F_{m−1} · I', 1560, 240, P(S, 1, 7), C.green, 24);
  for (let m = 1; m <= 9; m++) { const q = P(S, 1, 7.3 + m * 0.5); txt('A' + ['¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][m - 1] + ' =', 1410, 270 + m * 56, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: q }); txt(FIBN[m] + ' A + ' + FIBN[m - 1] + ' I', 1430, 270 + m * 56, { size: 26, fam: F.mono, w: 700, c: C.gold, a: q }); }
};

/* ---- 12 LATTICE ---- */
SCENES.lattice = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), ox = 460, oy = 560, sc = 44;
  const X = (x, y) => [ox + x * sc, oy - y * sc];
  for (let x = -5; x <= 9; x++) for (let y = -4; y <= 7; y++) { const p = X(x, y); dot(p[0], p[1], 4, 'w', s0 * 0.55); }
  line(ox - 5.5 * sc, oy, ox + 9.5 * sc, oy, C.dim, s0 * 0.6, 1); line(ox, oy + 4.5 * sc, ox, oy - 7.5 * sc, C.dim, s0 * 0.6, 1);
  const e1 = P(S, 0, 2), sl1 = 1 / PHI_, sl2 = -PHI_;
  line(...X(-5.5, -5.5 * sl1), ...X(9.5, 9.5 * sl1), C.gold, e1 * 0.7, 2); txt('slope 1/φ', X(9.3, 5)[0], X(9.3, 6.4)[1], { size: 20, fam: F.mono, w: 700, align: 'right', c: C.gold, a: e1 });
  const e2 = P(S, 1, 2);
  line(...X(-4.3, -4.3 * sl2), ...X(2.75, 2.75 * sl2), C.cyan, e2 * 0.7, 2); txt('slope −φ', X(-4.1, 0)[0], X(0, 7.2)[1], { size: 20, fam: F.mono, w: 700, c: C.cyan, a: e2 });
  const fw = [[1, 0]]; for (let i = 0; i < 5; i++) { const [a, b] = fw[fw.length - 1]; fw.push([a + b, a]); }
  const bw = [[1, 0]]; for (let i = 0; i < 5; i++) { const [a, b] = bw[bw.length - 1]; bw.push([b, a - b]); }
  const nf = P(S, 0, 3, 7) * 5, nb = P(S, 1, 1.5, 4.5) * 5;
  for (let i = 0; i < 5; i++) { const q = clamp(nf - i); if (q > 0) { const A = X(...fw[i]), B = X(...fw[i + 1]); arrow(A[0], A[1], lerp(A[0], B[0], q), lerp(A[1], B[1], q), C.gold, s0, 3); } }
  fw.forEach((p, i) => { if (nf >= i - 0.01) { if (i === 1) { const q = X(...p); dot(q[0], q[1], 11, 'g', s0); return; } const q = X(...p); dot(q[0], q[1], 11, 'g', s0); txt('(' + p + ')', q[0] - 14, q[1] - 14, { align: 'right', size: 18, fam: F.mono, w: 700, c: C.gold, a: s0 }); } });
  for (let i = 0; i < 5; i++) { const q = clamp(nb - i); if (q > 0) { const A = X(...bw[i]), B = X(...bw[i + 1]); arrow(A[0], A[1], lerp(A[0], B[0], q), lerp(A[1], B[1], q), C.cyan, s0, 3); } }
  bw.forEach((p, i) => { if (i > 0 && nb >= i - 0.01) { const q = X(...p); dot(q[0], q[1], 11, 'c', s0); if (i < 3) return; txt('(' + p + ')', q[0] + (p[0] < 0 ? -14 : 14), q[1] + 26, { align: p[0] < 0 ? 'right' : 'left', size: 18, fam: F.mono, w: 700, c: C.cyan, a: s0 }); } });
  /* right panel */
  const r = P(S, 0, 0.5);
  txt('enc(y) = (−y₂−y₃, y₀, y₂, y₁+y₃)', 1020, 250, { size: 22, fam: F.mono, w: 700, c: C.white, a: r });
  txt('dec(c) = (c₁, c₀+c₂+c₃, c₂, −c₀−c₂, −c₁−c₂−c₃)', 1020, 295, { size: 22, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 1.5) });
  eqn('enc · A · dec  =  F ⊕ F', 1290, 370, P(S, 0, 4), C.gold, 28);
  const FF = [[1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 1, 1], [0, 0, 1, 0]];
  mgrid(1180, 395, FF, 54, P(S, 0, 4.5), { prog: P(S, 0, 4.5, 1.5) });
  txt('on the whole lattice  Σ y = 0 ,  y ∈ ℤ⁵', 1290, 660, { size: 21, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 8) });
  const l = P(S, 1, 0.3);
  chip(1130, 740, 260, 54, 'det = 1', C.gold, l, 26);
  chip(1460, 740, 340, 54, 'A⁻¹ = A − I', C.cyan, P(S, 1, 1.5), 26);
  txt('A^(−m) = (−1)ᵐ (F_{m+1} I − F_m A)', 1290, 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3.5) });
};

/* ---- 13 LIFT ---- */
SCENES.lift = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), f1 = 1;
  const cls = [C.dim, C.cyan, C.mag, C.dim, C.dim];
  const cx = 560, cy = 500, R = 270;
  ring(cx, cy, R, C.dim, s0 * 0.5, 1.2);
  const cp = P(S, 0, 1, 4);
  ctx.globalAlpha = s0 * 0.5; ctx.lineWidth = 1;
  for (let c = 0; c < 5; c++) { ctx.strokeStyle = [C.white, C.cyan, C.mag, C.green, C.orange][c]; ctx.beginPath(); for (let r = c; r < 5040 * cp; r += 5 * 3) { const an = -Math.PI / 2 + TAU * r / 5040; ctx.moveTo(cx + Math.cos(an) * (R - 8), cy + Math.sin(an) * (R - 8)); ctx.lineTo(cx + Math.cos(an) * (R + 8), cy + Math.sin(an) * (R + 8)); } ctx.stroke(); }
  ctx.globalAlpha = 1;
  const lq = P(S, 0, 7.5, 3);
  const w1 = new Uint8Array(5040), w2 = new Uint8Array(5040); for (let r = 0; r < 5040; r++) if (WA[r]) { if (r % 5 === 1) w1[r] = 1; else w2[r] = 1; }
  const n1 = dial(cx, cy, R + 12, 5040, w1, s0, { lp: lq, len: 34, col: C.cyan, lw: 2.5 }), n2 = dial(cx, cy, R - 12, 5040, w2, s0, { lp: lq, len: 34, inner: true, col: C.mag, lw: 2.5 });
  clockN(cx, cy, 90, 5, [1, 2], s0, { r: 14, lo: 30, ls: 20 });
  chip(1360, 260, 560, 56, '1008 copies of each hour mod 5', C.white, P(S, 0, 4.5), 22);
  chip(1250, 350, 330, 56, 'class 1 → ' + n1, C.cyan, P(S, 0, 8), 24);
  chip(1590, 350, 330, 56, 'class 2 → ' + n2, C.mag, P(S, 0, 8), 24);
  eqn('96 = 1 · 1 · 4 · 24', 1420, 450, P(S, 0, 10.5), C.gold, 28);
  txt('mod 2 · mod 3 · mod 7 · fibre', 1420, 490, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 10.5) });
  const l = P(S, 1, 0.3);
  eqn('G₅₀₄₀ ↑y = 9216 · ↑(G₅ y) ,  9216 = 96²', 1360, 580, l, C.gold, 24);
  eqn('(G₅₀₄₀)ⁿ⁺¹ ↑y = 9216ⁿ⁺¹ ↑(F₂ₙ₊₁ y + F₂ₙ₊₂ A y)', 1360, 640, P(S, 1, 7), C.green, 22);
  for (let n = 0; n < 5; n++) { const q = P(S, 1, 9.5 + n * 0.6), x = 1360 + (n - 2) * 150; box(x - 64, 690, 128, 96, C.green, q, 1.5, 'rgba(0,30,15,0.5)'); txt('n = ' + n, x, 722, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); txt(FIBN[2 * n + 1] + ' , ' + FIBN[2 * n + 2], x, 765, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: q }); }
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['2 · 3', 'permutations', C.dim], ['5', 'golden ratio φ', C.gold], ['7', 'Fano plane · flat √2', C.cyan], ['2⁴ · 3²', '24-fold fibres', C.mag]];
    items.forEach(([a1, a2, col], i) => { const x = 330 + i * 420, q = P(S, 0, [0.3, 2.2, 4.2, 8][i]) * fade; box(x - 190, 280, 380, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 345, { size: 40, fam: F.orb, w: 900, align: 'center', c: col, a: q }); txt(a2, x, 395, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    txt('the wheel forgets the exponents · Robin\'s inequality needs them · no RH claim', W / 2, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 0.5) * fade });
    txt('pentagon cosines frozen in Lean · wheel spectra argued and recomputed', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 7) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    dial(700, 390, 160, 5040, WA, ep * out, { all: 0.25, step: 2, rot: t * 0.05, len: 24, lw: 2 });
    clockN(700, 390, 70, 5, [1, 2], ep * out, { r: 11, lab: false });
    heawood(1220, 390, 160, ep * out, { rot: -t * 0.05, r: 10 });
    txt('AURIC FIB ATOM PYRAMID IV', W / 2, 660, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('金字塔 IV · 五千零四十之轮 · TRURETURING FILM 033', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Five hours hold the golden ratio. Seven hold a plane.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'SEVEN FACTORIAL', wheel: 'THE TRIPLET WHEEL', quotient: 'TWENTY-FOUR TURNS', twins: 'MIRROR TWINS', five: 'GOLDEN FIVE', seven: 'FLAT SEVEN', fano: 'FANO PLANE', heawood: 'HEAWOOD GRAPH', product: 'CRT PRODUCT', table: 'THE 5040 SPECTRUM', engine: 'FIBONACCI ENGINE', lattice: 'INTEGER LATTICE', lift: 'LIFT TO 5040', finale: 'LEDGER' });

function poster33() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  dial(620, 520, 230, 5040, WA, 1, { all: 0.3, step: 2, len: 34, lw: 2.5 });
  txt('5040', 620, 545, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 3 });
  heawood(1300, 520, 230, 1, { r: 16, cyc: 0.8 });
  txt('FIB 原子金字塔 IV', W / 2, 190, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID IV', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('五 千 零 四 十 之 轮 · 五 生 黄 金 比 · 七 生 Fano 平 面', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 033', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster33;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
