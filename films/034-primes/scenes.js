/* Film 034 — AURIC FIB ATOM PYRAMID V · 二三五七只出现一次 */

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

/* ---- film 034 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    published: ['PUBLISHED RESULT · CITED IN THE VOLUME · RECOMPUTED', C.cyan, 'rgba(0,25,40,0.75)'],
    open: ['OPEN CONJECTURE · CITED · NOT PROVED HERE', C.vio, 'rgba(20,10,40,0.75)']
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

/* ---- film 034: prime helpers ---- */
const FI = [0, 1]; for (let i = 0; i < 90; i++) FI.push(FI[FI.length - 1] + FI[FI.length - 2]);
const LU = [2, 1]; for (let i = 0; i < 90; i++) LU.push(LU[LU.length - 1] + LU[LU.length - 2]);
const WV = j => { const n = 3 * j + 4; return [0, FI[n - 1], FI[n], FI[n + 1], LU[n]]; };
/* certified primality of (low, middle, high, joint) for windows j = 0..31 (sympy, recomputed) */
const MASK = '1111 0101 0010 0101 0011 0001 0010 0000 0010 0001 0000 0001 0000 0100 0010 0000 0000 0000 0000 0001 0000 0000 0000 0000 0000 0001 0010 0000 0000 0000 0000 0000'.split(' ');
const MLAB = ['0', '1', '2', '3', '13'];
const MC = [C.white, C.cyan, C.gold, C.mag, C.green];
const MD = ['w', 'c', 'g', 'm', 'n'];
const PV = [[-0.5, -0.5, 0], [0.5, -0.5, 0], [0, 0, 0.95], [-0.5, 0.5, 0], [0.5, 0.5, 0]];
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
const isPr = n => { if (n < 2) return false; if (n % 2 === 0) return n === 2; for (let d = 3; d * d <= n; d += 2) if (n % d === 0) return false; return true; };
function eqn(s, x, y, a, col = C.white, size = 28, align = 'center') { txt(s, x, y, { size, fam: F.mono, w: 700, align, c: col, a }); }
/* badge timeline: entries [lineIndex, offset, kind]; the latest started entry wins */
function badgeSeq(S, seq) {
  let cur = seq[0], st = 0;
  seq.forEach(e => { const s = lineAt(S, e[0]).s + e[1]; if (S.u >= s) { cur = e; st = s; } });
  badge(clamp((S.u - st) / 0.5) * clamp(S.u / 0.8), cur[2]);
}
/* the five-pattern pyramid; vals[i] is shown at mode i; o.mark colours primes gold and composites red */
function pyr(cx, cy, s, ang, a, vals, o = {}) {
  if (a <= 0) return [];
  const v = v3(cx, cy, s, ang, o.tilt == null ? 0.42 : o.tilt);
  const P3 = PV.map(p => v(...p));
  [[0, 1], [1, 4], [4, 3], [3, 0], [2, 0], [2, 1], [2, 3], [2, 4]].forEach(([i, k]) => line(P3[i][0], P3[i][1], P3[k][0], P3[k][1], o.ec || C.cyan, a * 0.5, 2));
  const ord = [0, 1, 2, 3, 4].sort((i, k) => P3[k][3] - P3[i][3]);
  ord.forEach(i => {
    const p = P3[i], sc = p[2], val = vals ? vals[i] : null;
    const w = o.w ? o.w[i] : 1;
    let dn = MD[i];
    if (o.mark && val != null) dn = (typeof val === 'number' && isPr(val)) ? 'g' : (i === 0 ? 'w' : 'r');
    dot(p[0], p[1], (o.r || 20) * sc * (0.55 + 0.75 * w), dn, a * (o.w ? 0.35 + 0.65 * Math.min(1, w * 2) : 1));
    if (val != null && o.lab !== false) txt(String(val), p[0] + (o.lx || 0), p[1] - (o.r || 20) * sc * 1.3 - 6, { size: (o.ls || 30) * Math.min(1.2, sc), fam: F.mono, w: 700, align: 'center', c: o.mark ? ((typeof val === 'number' && isPr(val)) ? C.gold : (i === 0 ? C.white : C.red)) : MC[i], a });
  });
  return P3;
}
/* one row of window cells: low, middle, high, joint */
function wcell(x, y, s, val, prime, col, a, o = {}) {
  if (a <= 0) return;
  box(x, y, s.w, s.h, prime ? C.gold : (o.dead ? C.red : C.dim), a, prime ? 2.5 : 1.2, prime ? 'rgba(60,45,0,0.55)' : 'rgba(0,0,0,0.45)');
  txt(String(val), x + s.w / 2, y + s.h * 0.66, { size: o.size || 26, fam: F.mono, w: 700, align: 'center', c: prime ? C.gold : (o.dead ? C.red : col), a: a * (prime ? 1 : 0.8) });
}
function fmtN(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
/* first index a with p | F_a */
const rankOf = p => { let a = 1, x = 0, y = 1; while (true) { [x, y] = [y, (x + y) % p]; if (x === 0) return a; a++; } };
const v2 = n => { let c = 0; while (n % 2 === 0) { n /= 2; c++; } return c; };
const HP = [0, 2, 6];
const CAND = []; for (let N = 0; N < 10946; N++) if (HP.every(h => gcd(N + h, 210) === 1)) CAND.push(N);
function zeckBits(N, m) { const b = new Array(m).fill(0); for (let i = m - 1; i >= 0; i--) if (FI[i + 2] <= N) { b[i] = 1; N -= FI[i + 2]; } return b; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u / 1.2);
  pyr(600, 560, 330, t * 0.25, s0, [0, 2, 3, 5, 7], { r: 34, ls: 40 });
  txt('one ordered atom · five patterns', 600, 870, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 });
  MLAB.forEach((m, i) => { const q = P(S, 0, 2 + i * 0.7); chip(1250, 260 + i * 78, 210, 56, 'mode ' + m, MC[i], q, 24); txt('→  ' + [0, 2, 3, 5, 7][i], 1390, 270 + i * 78, { size: 34, fam: F.mono, w: 700, c: MC[i], a: q }); });
  const q1 = P(S, 1, 0.3);
  eqn('2 · 3 · 5 · 7 = 210', 1330, 700, q1, C.gold, 40);
  txt('the first four primes', 1330, 750, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q1 });
  chip(1330, 830, 380, 60, 'only once?', C.red, P(S, 1, 3), 30);
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyr(W / 2, 470, 260, t * 0.3, rp, [0, 2, 3, 5, 7], { r: 30, ls: 36, mark: true });
  [2, 3, 5, 7].forEach((p, i) => { const x = i < 2 ? 470 : 1450, y = (i % 2 ? 560 : 360) + Math.sin(t * 0.8 + i) * 14; txt(String(p), x, y, { size: 72, fam: F.mono, w: 700, align: 'center', c: C.gold, a: rp * 0.55, ab: 2 }); });
  txt(scramble('AURIC FIB ATOM PYRAMID V', rp, 341), W / 2, 690, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 V · 二 三 五 七 只 出 现 一 次', W / 2, 765, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 034 · AURIC_FIB_ATOM_OBSERVER_AND_ARITHMETIC_RELATIONS §§6–16', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['rank → where', C.cyan], ['2-adic beat → together', C.mag], ['7! clock → sieve only', C.gold]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 520, 860, 480, 60, s, col, P(S, 1, 0.3 + i * 1.4), 24));
};

/* ---- 02 WINDOWS ---- */
SCENES.windows = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('M = [0 1; 1 1]', 330, 220, s0, C.white, 28);
  eqn('S = M³ = [1 2; 2 3]', 330, 265, P(S, 0, 1.5), C.gold, 30);
  eqn('n = 3j + 4', 330, 315, P(S, 0, 4), C.cyan, 30);
  eqn('V_j = ( 0 , F_{n−1} , F_n , F_{n+1} , L_n )', 330, 365, P(S, 0, 6), C.white, 22);
  const pq = P(S, 0, 1);
  const RV = [0.2, 3.0, 5.2, 5.8, 6.2, 11.0];
  let j = 0; RV.forEach((o, r) => { if (u >= lineAt(S, 1).s + o) j = r; });
  pyr(330, 720, 200, t * 0.3, pq, WV(j), { r: 26, ls: 26, mark: u > lineAt(S, 1).s });
  /* table */
  const x0 = 760, y0 = 220, cw = 230, ch = 62, hd = ['j', 'low F_{n−1}', 'middle F_n', 'high F_{n+1}', 'joint L_n'];
  const tq = P(S, 0, 2);
  txt(hd[0], x0 + 40, y0 + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: tq });
  for (let c = 1; c < 5; c++) txt(hd[c], x0 + 80 + (c - 1) * cw + (cw - 14) / 2, y0 + 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: MC[c], a: tq });
  for (let r = 0; r < 6; r++) {
    const q = P(S, 1, RV[r], 0.6), y = y0 + 64 + r * (ch + 10), v = WV(r);
    txt(String(r), x0 + 40, y + ch * 0.66, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    for (let c = 1; c < 5; c++) wcell(x0 + 80 + (c - 1) * cw, y, { w: cw - 14, h: ch }, v[c], MASK[r][c - 1] === '1', MC[c], q);
    if (r === 0) box(x0 - 6, y - 6, 80 + 4 * cw, ch + 12, C.gold, q * (0.6 + 0.4 * Math.sin(t * 4)), 2.5);
  }
  txt('gold = certified prime', x0 + 80 + 2 * cw, 760, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2) });
};

/* ---- 03 ONCE ---- */
SCENES.once = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const s0 = clamp(u), NJ = 32, x0 = 300, cw = 44, y0 = 300, rh = 70;
  const rows = ['low', 'middle', 'high', 'joint'];
  rows.forEach((r, k) => txt(r, x0 - 20, y0 + k * rh + 42, { size: 22, fam: F.mono, w: 700, align: 'right', c: MC[k + 1], a: s0 }));
  for (let j = 0; j < NJ; j++) txt(String(j), x0 + j * cw + cw / 2, y0 - 16, { size: 15, fam: F.mono, align: 'center', c: j === 0 ? C.gold : C.dim, a: s0 });
  const k1 = P(S, 0, 4, 1.5), k2 = P(S, 1, 3, 1.2), k3 = P(S, 1, 5.5, 1.2), real = P(S, 1, 8, 1.5);
  for (let j = 0; j < NJ; j++) for (let k = 0; k < 4; k++) {
    let dead = 0;
    if (k === 0 && j >= 1) dead = clamp(k1 * NJ - j);
    if (k === 2 && j % 2 === 1) dead = clamp(k2 * NJ - j);
    if (k === 1 && j % 2 === 0 && j >= 2) dead = clamp(k3 * NJ - j);
    const pr = MASK[j][k] === '1', x = x0 + j * cw, y = y0 + k * rh;
    box(x + 3, y + 8, cw - 6, rh - 16, dead > 0.5 ? C.red : C.dim, s0 * (dead > 0.5 ? 0.9 : 0.5), 1.2, dead > 0.5 ? 'rgba(60,0,10,0.55)' : 'rgba(0,0,0,0.4)');
    if (pr) fillBox(x + 7, y + 12, cw - 14, rh - 24, C.gold, s0 * real * 0.85);
  }
  chip(560, 640, 640, 56, 'F₃ = 2 divides F_{3j+3}  ⇒  low even', C.red, P(S, 0, 1.5), 22);
  chip(1250, 640, 560, 56, 'odd j: F_{n+1} = F_m · L_m', C.mag, P(S, 1, 1.5), 22);
  chip(1250, 710, 560, 56, 'even j ≥ 2: F_n = F_m · L_m', C.gold, P(S, 1, 5), 22);
  txt('gold = certified primes in windows 0–31', 560, 720, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: real });
  stamp('ALL FOUR PRIME: j = 0 ONLY', W / 2, 830, P(S, 1, 8.5, 0.6), C.gold, 44, -0.03);
};

/* ---- 04 COPRIME ---- */
SCENES.coprime = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'published']);
  const s0 = clamp(u);
  const jj = Math.floor((u * 0.25)) % 4, v = WV(jj).slice(1);
  const cx = 470, cy = 520, R = 210, pts = ringPts(cx, cy, R, 4, -Math.PI / 4 * 3);
  for (let i = 0; i < 4; i++) for (let k = i + 1; k < 4; k++) { const g = gcd(v[i], v[k]); line(pts[i][0], pts[i][1], pts[k][0], pts[k][1], g === 1 ? C.cyan : C.red, s0 * 0.7, 2.5); const mx = (pts[i][0] + pts[k][0]) / 2, my = (pts[i][1] + pts[k][1]) / 2; const dg = k - i === 2, lx = dg ? lerp(pts[i][0], pts[k][0], 0.28) : mx, ly = dg ? lerp(pts[i][1], pts[k][1], 0.28) : my; txt('gcd ' + g, lx, ly + 7, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 * P(S, 0, 1) }); }
  pts.forEach((p, i) => { dot(p[0], p[1], 26, MD[i + 1], s0); txt(fmtN(v[i]), p[0], p[1] + (p[1] < cy ? -38 : 56), { size: 28, fam: F.mono, w: 700, align: 'center', c: MC[i + 1], a: s0 }); });
  txt('window j = ' + jj, cx, 220, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  chip(cx, 860, 560, 52, 'gcd(F_n, L_n) = gcd(F_n, 2) = 1', C.gold, P(S, 0, 4), 22);
  /* hyperbola panel */
  const ox = 1000, oy = 760, sx = 22, sy = 6.2;
  const X = (f, l) => [ox + f * sx, oy - l * sy];
  const q = P(S, 1, 0.3);
  line(ox, oy, ox + 36 * sx, oy, C.dim, q, 1.5); line(ox, oy, ox, oy - 86 * sy, C.dim, q, 1.5);
  txt('F', ox + 36 * sx + 12, oy + 6, { size: 22, fam: F.mono, w: 700, c: C.dim, a: q }); txt('L', ox - 8, oy - 86 * sy - 10, { size: 22, fam: F.mono, w: 700, c: C.dim, a: q });
  curve(s => X(s * 35, Math.sqrt(5 * (s * 35) ** 2 + 4)), 80, C.gold, q * 0.75, 2.5);
  curve(s => { const f = 2 / Math.sqrt(5) + s * (35 - 2 / Math.sqrt(5)); return X(f, Math.sqrt(Math.max(0, 5 * f * f - 4))); }, 80, C.mag, q * 0.75, 2.5);
  for (let n = 0; n <= 9; n++) { const p = X(FI[n], LU[n]), qq = P(S, 1, 2 + n * 0.5), win = n === 4 || n === 7; dot(p[0], p[1], win ? 14 : 9, n % 2 ? 'm' : 'g', qq); if (n >= 3) txt('(' + FI[n] + ',' + LU[n] + ')', p[0] + 14, p[1] + 6, { size: 15, fam: F.mono, w: 700, c: win ? C.white : C.dim, a: qq }); }
  eqn('F₂ₙ = Fₙ · Lₙ', 1400, 250, q, C.cyan, 30);
  eqn('L² − 5F² = 4(−1)ⁿ', 1400, 305, P(S, 1, 4), C.gold, 30);
  txt('+4  n even', 1640, 420, { size: 20, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 5) });
  txt('−4  n odd', 1640, 455, { size: 20, fam: F.mono, w: 700, c: C.mag, a: P(S, 1, 5) });
};

/* ---- 05 FERMAT ---- */
SCENES.fermat = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'published'], [0, 7, 'theory'], [1, 0, 'theory']]);
  const s0 = clamp(u);
  chip(560, 240, 640, 56, 'F_m prime ⇒ m prime or m = 4', C.cyan, P(S, 0, 0.5), 24);
  chip(1360, 240, 700, 56, 'L_m prime ⇒ m prime or m = 2ᵏ', C.green, P(S, 0, 3.5), 24);
  eqn('even window, F_{n+1} and L_n prime  ⇒  n = 2^(2^t) , n + 1 Fermat prime', W / 2, 330, P(S, 0, 8.5), C.gold, 24);
  const items = [['n = 4', 'j = 0', 'F₅ = 5', 'L₄ = 7', '5', true, true], ['n = 16', 'j = 4', 'F₁₇ = 1597', 'L₁₆ = 2207', '17', true, true], ['n = 256', 'j = 84', '5653 | F₂₅₇', '34303 | L₂₅₆', '257', false, false], ['n = 65536', 'j = 21844', '?', '?', '65537', null, null]];
  items.forEach((it, i) => {
    const x = 330 + i * 420, q = P(S, i < 2 ? 0 : 1, i < 2 ? 11 + i * 2 : (i === 2 ? 6 : 10)), y = 400;
    const col = it[5] === true ? C.gold : it[5] === false ? C.red : C.dim;
    box(x - 190, y, 380, 330, col, q, 2, 'rgba(0,0,0,0.5)');
    txt(it[0], x, y + 52, { size: 34, fam: F.orb, w: 900, align: 'center', c: col, a: q });
    txt(it[1], x, y + 90, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
    txt(it[2], x, y + 160, { size: 28, fam: F.mono, w: 700, align: 'center', c: it[5] ? C.gold : (it[5] === false ? C.red : C.dim), a: q });
    txt(it[3], x, y + 210, { size: 28, fam: F.mono, w: 700, align: 'center', c: it[6] ? C.gold : (it[6] === false ? C.red : C.dim), a: q });
    txt('n + 1 = ' + it[4], x, y + 280, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
  });
  txt('index 16 → window 4 · both prime', 700, 790, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 1) });
  txt('257 is prime; both values are not', 1230, 790, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 9) });
  txt('whether infinitely many Fibonacci primes exist is an open question', W / 2, 860, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 1, 11) });
};

/* ---- 06 MERSENNE ---- */
SCENES.mersenne = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const s0 = clamp(u);
  eqn('q = 2ˢ − 1 prime ,  s ≡ 3 (mod 4)   ⇒   q | L_{2^(s−1)}', W / 2, 240, P(S, 0, 1), C.green, 28);
  txt('Somer–Křížek, Fibonacci Quarterly 53 (2015)', W / 2, 282, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 1) });
  const rows = [['s = 3', 'q = 7', '7 | L₄ = 7', 'window 0'], ['s = 7', 'q = 127', '127 | L₆₄', 'window 20'], ['s = 19', 'q = 524 287', 'q | L₂₆₂₁₄₄', 'window 87 380'], ['s = 31', 'q = 2 147 483 647', 'q | L_{2³⁰}', 'window 357 913 940']];
  rows.forEach((r, i) => { const q = P(S, 0, 5 + i * 1.4), y = 350 + i * 62; txt(r[0], 300, y, { size: 26, fam: F.mono, w: 700, c: C.white, a: q }); txt(r[1], 470, y, { size: 26, fam: F.mono, w: 700, c: C.green, a: q }); txt(r[2], 930, y, { size: 26, fam: F.mono, w: 700, c: C.gold, a: q }); txt(r[3], 1640, y, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a: q }); });
  const l = P(S, 1, 0.3);
  box(300, 610, 1340, 170, C.green, l, 2, 'rgba(0,30,15,0.5)');
  eqn('L₆₄ = 23 725 150 497 407', W / 2, 670, l, C.white, 34);
  eqn('= 127 × 186 812 208 641', W / 2, 730, P(S, 1, 3), C.gold, 34);
  chip(1440, 760, 230, 44, 'prime', C.gold, P(S, 1, 7.5), 22);
  txt('64 = 3 · 20 + 4', W / 2, 840, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 2) });
};

/* ---- 07 COLLIDE ---- */
const VAL0 = [0, 2, 3, 5, 7];
SCENES.collide = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [1, 6.5, 'lean']]);
  const s0 = clamp(u), cx = 520, cy = 530, R = 250, pts = ringPts(cx, cy, R, 5);
  const pairs = []; for (let i = 0; i < 5; i++) for (let k = i + 1; k < 5; k++) pairs.push([i, k, VAL0[k] - VAL0[i]]);
  const l1 = u >= lineAt(S, 1).s;
  const lu = u - lineAt(S, 1).s, pr = !l1 || lu < 0.5 ? 0 : lu < 2 ? 2 : lu < 3.5 ? 3 : lu < 5 ? 5 : lu < 6.5 ? 7 : 2;
  const ep = P(S, 0, 4, 4);
  pairs.forEach(([i, k, d], e) => {
    const q = clamp(ep * 10 - e), hit = pr && d % pr === 0, deep = pr === 2 && d === 4;
    const A = pts[i], B = pts[k];
    line(A[0], A[1], lerp(A[0], B[0], q), lerp(A[1], B[1], q), hit ? (deep ? C.red : C.gold) : C.cyan, s0 * (pr && !hit ? 0.2 : 0.7), hit ? (deep ? 6 : 4) : 2);
    if (q >= 1) { const mx = lerp(A[0], B[0], 0.5), my = lerp(A[1], B[1], 0.5); txt(String(d), mx, my + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: hit ? C.gold : C.white, a: s0 * (pr && !hit ? 0.3 : 1) }); }
  });
  pts.forEach((p, i) => { dot(p[0], p[1], 28, MD[i], s0); txt(String(VAL0[i]), p[0] + (p[0] - cx) / R * 50, p[1] + (p[1] - cy) / R * 50 + 10, { size: 32, fam: F.mono, w: 700, align: 'center', c: MC[i], a: s0 }); });
  /* product */
  const np = Math.floor(clamp(P(S, 0, 4, 6)) * 10); let prod = 1; for (let e = 0; e < np; e++) prod *= pairs[e][2];
  const q0 = P(S, 0, 4);
  eqn('∏ (differences) = ' + fmtN(prod), 1360, 260, q0, C.white, 30);
  eqn('= 10 · 7!  = 2⁵ · 3² · 5² · 7', 1360, 320, P(S, 0, 11), C.gold, 30);
  txt('det V = 2 F_{n−1}⁴ F_n² F_{n+1}² L_n F_{n−2}', 1360, 375, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 12) });
  if (pr) { chip(1360, 460, 360, 56, 'p = ' + pr, C.gold, P(S, 1, 0.3), 28); }
  const d1 = P(S, 1, 11);
  eqn('3 ≡ 7 (mod 4)', 1220, 580, d1, C.gold, 28); eqn('3 ≢ 7 (mod 8)', 1520, 580, d1, C.red, 28);
  eqn('depth = v_p(a − b) :  v₂(4) = 2', 1360, 650, P(S, 1, 7), C.green, 28);
  txt('ObserverCollisionOrder · observer_collision_order_eq_padic_valuation_and_exists', 1360, 710, { size: 15, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 7) });
};

/* ---- 08 RANKS ---- */
const RK = [[2, 3], [3, 4], [5, 5], [7, 8], [11, 10], [13, 7], [17, 9], [19, 18], [23, 24], [29, 14], [31, 30], [41, 20], [47, 16]];
SCENES.ranks = S => {
  const u = S.u, t = S.t;
  badges(S, ['published', 'theory']);
  const s0 = clamp(u);
  /* Fibonacci and Lucas mod 7 */
  const x0 = 250, cw = 70;
  const fm = [0, 1]; for (let i = 0; i < 20; i++) fm.push((fm[fm.length - 1] + fm[fm.length - 2]) % 7);
  const lm = [2, 1]; for (let i = 0; i < 20; i++) lm.push((lm[lm.length - 1] + lm[lm.length - 2]) % 7);
  txt('mod 7', x0 - 30, 205, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: s0 });
  for (let a = 0; a <= 17; a++) {
    const q = P(S, 0, 0.5 + a * 0.25, 0.4);
    txt(String(a), x0 + a * cw + cw / 2, 205, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: q });
    cellv(x0 + a * cw + 6, 225, 58, fm[a], fm[a] === 0 ? C.gold : C.cyan, q, fm[a] === 0 ? 'rgba(60,45,0,0.6)' : 'rgba(0,0,0,0.45)', 0.42);
    const ql = P(S, 0, 9 + a * 0.15, 0.4);
    cellv(x0 + a * cw + 6, 295, 58, lm[a], lm[a] === 0 ? C.green : C.dim, ql, lm[a] === 0 ? 'rgba(0,50,25,0.6)' : 'rgba(0,0,0,0.45)', 0.42);
  }
  txt('F_a', x0 - 30, 262, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: s0 });
  txt('L_a', x0 - 30, 332, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.green, a: P(S, 0, 9) });
  txt('rank r₇ = 8 :  7 | F_a ⇔ 8 | a        7 | L_a ⇔ a ≡ 4 (mod 8)', W / 2, 400, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 5) });
  /* three role classes */
  const cls = [['3 | r : low only', C.cyan, [[2, 3], [17, 9], [19, 18], [23, 24], [31, 30]]], ['odd r, r ≢ 0 mod 3 : no joint', C.orange, [[5, 5], [13, 7]]], ['even r, r ≢ 0 mod 3 : all four', C.green, [[3, 4], [7, 8], [11, 10], [29, 14], [41, 20], [47, 16]]]];
  cls.forEach(([h, col, ps], i) => {
    const x = 380 + i * 580, q = P(S, 1, [1.5, 7, 10.7][i]);
    box(x - 260, 450, 520, 330, col, q, 2, 'rgba(0,0,0,0.5)');
    txt(h, x, 495, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    ps.forEach(([p, r], k) => { const xx = x - 170 + (k % 3) * 170, yy = 570 + Math.floor(k / 3) * 70; txt(String(p), xx, yy, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt('r = ' + r, xx, yy + 28, { size: 17, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
  });
  txt('19 | L₉ = 76, but never a window\'s L_{3j+4} · 13 divides no Lucas number', W / 2, 840, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 13) });
};

/* ---- 09 CLOSURE ---- */
SCENES.closure = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const s0 = clamp(u);
  const yOf = p => 820 - Math.log(p) / Math.log(60) * 560;
  const chain = [[59, 58, '2 · 29'], [29, 14, '2 · 7'], [7, 8, '2³'], [2, 3, '3'], [3, 4, '2²'], [5, 5, '5']];
  const xs = { 59: 360, 29: 660, 7: 960, 2: 1260, 3: 1500, 5: 1700 };
  /* ceiling */
  const cq = P(S, 1, 6);
  dashed(220, yOf(59) - 40, 1800, yOf(59) - 40, C.red, cq, 2);
  txt('ceiling: max(5, max S) = 59', 1790, yOf(59) - 52, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.red, a: cq });
  chain.forEach(([p, r, f], i) => {
    const q = P(S, 0, [0.5, 3.6, 6.6, 9.5, 13, 13.5][i], 0.8);
    const x = xs[p], y = yOf(p);
    dot(x, y, 26, p > 5 ? 'n' : 'g', q);
    txt(String(p), x, y - 36, { size: 30, fam: F.mono, w: 700, align: 'center', c: p > 5 ? C.green : C.gold, a: q });
    txt('r = ' + r + ' = ' + f, x, y + 58, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
  });
  const ar = [[59, 29, 2.2], [29, 7, 5.2], [7, 2, 8.3], [2, 3, 12], [3, 2, 12.5]];
  ar.forEach(([a, b, o]) => { const q = P(S, 0, o, 1); if (q <= 0) return; const dir = Math.sign(xs[b] - xs[a]), dy = a === 2 ? -14 : a === 3 ? 14 : 0, A = [xs[a] + 30 * dir, yOf(a) + dy], B = [xs[b] - 30 * dir, yOf(b) + dy]; arrow(A[0], A[1], lerp(A[0], B[0], q), lerp(A[1], B[1], q), C.gold, s0, 3); });
  const l = P(S, 1, 0.3);
  chip(W / 2, 830, 720, 56, 'H = {2, 3, 5, 7, 29, 59}', C.green, P(S, 1, 9), 28);
  const others = [['{97}', '49 = 7²', '{2,3,5,7,97}'], ['{89}', '11', '{2,3,5,11,89}'], ['{1597}', '17', '{2,3,5,17,1597}']];
  others.forEach((o, i) => { const q = P(S, 1, 11 + i * 0.8); txt(o[0] + '  r = ' + o[1] + '  →  ' + o[2], 1180, 300 + i * 40, { size: 20, fam: F.mono, w: 700, c: C.dim, a: q }); });
  txt('finite_fibonacci_rank_closure : seed ⊆ H · H prime · p ≤ max(5, max S) · step H = H · least', W / 2, 180, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: l });
};

/* ---- 10 BEATS ---- */
SCENES.beats = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  /* 2-adic levels */
  const lev = [[1, [[11, 10], [29, 14]]], [2, [[3, 4], [41, 20]]], [3, [[7, 8]]], [4, [[47, 16]]]];
  eqn('p | L_a  ⇒  v₂(r_p) = v₂(a) + 1', 520, 230, P(S, 0, 0.5), C.gold, 28);
  lev.forEach(([v, ps], i) => {
    const y = 300 + i * 70, q = P(S, 0, 6 + i * 0.8);
    txt('v₂(r) = ' + v, 200, y + 8, { size: 22, fam: F.mono, w: 700, c: C.dim, a: q });
    ps.forEach(([p, r], k) => { const hl = (p === 3 || p === 41) ? P(S, 1, 4) : (p === 7 ? P(S, 1, 0.3) : 0); chip(470 + k * 200, y, 170, 50, p + ' (r ' + r + ')', hl > 0 ? (p === 7 ? C.red : C.green) : C.white, q, 20); });
  });
  chip(1360, 300, 560, 54, '3 (r 4) and 7 (r 8): never together', C.red, P(S, 1, 0.5), 22);
  chip(1360, 370, 560, 54, '41 | L_a  ⇒  3 | L_a', C.green, P(S, 1, 4), 24);
  eqn('L₁₀ = 123 = 3 · 41', 1360, 445, P(S, 1, 5.5), C.white, 26);
  /* stripes over 40 windows */
  const x0 = 300, cw = 31, y0 = 560, ev = [[3, j => j % 4 === 2, C.gold], [7, j => j % 8 === 0, C.red], [41, j => j % 20 === 2, C.green]];
  const sq = P(S, 1, 8, 4);
  ev.forEach(([p, f, col], r) => {
    txt(p + ' | L', x0 - 16, y0 + r * 56 + 32, { size: 20, fam: F.mono, w: 700, align: 'right', c: col, a: sq });
    for (let j = 0; j < 40; j++) { const q = clamp(sq * 40 - j); const on = f(j); box(x0 + j * cw + 2, y0 + r * 56 + 8, cw - 4, 40, on ? col : C.dim, q * (on ? 1 : 0.35), 1.2, on ? rgba(col, 0.6) : 'rgba(0,0,0,0.35)'); }
  });
  for (let j = 0; j < 40; j += 5) txt(String(j), x0 + j * cw + cw / 2, y0 - 6, { size: 14, fam: F.mono, align: 'center', c: C.dim, a: sq });
  const pq = P(S, 1, 12);
  txt('windows: 1/4 · 1/8 · 1/20      3 & 7: 0 (independent: 1/32)      3 & 41: 1/20 (independent: 1/80)', W / 2, 760, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: pq });
};

/* ---- 11 CLOCK ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badgeSeq(S, [[0, 0, 'theory'], [0, 10.5, 'lean'], [1, 0, 'theory']]);
  const s0 = clamp(u);
  const cl = [[16, 24], [9, 24], [5, 20], [7, 16]];
  cl.forEach(([m, o], i) => {
    const cx = 260 + i * 270, cy = 330, R = 95, q = P(S, 0, 0.5 + i * 0.6);
    const pts = ringPts(cx, cy, R, o);
    pts.forEach(p => dot(p[0], p[1], 5, 'c', q * 0.7));
    const k = Math.floor(t * 6) % o; dot(pts[k][0], pts[k][1], 14, 'g', q);
    txt(String(o), cx, cy + 12, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: q });
    txt('mod ' + m, cx, cy + R + 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  });
  eqn('lcm = 240  →  S = M³ : 80 windows', 680, 530, P(S, 0, 4), C.gold, 28);
  const lq = P(S, 0, 10.5);
  box(1260, 230, 520, 230, C.green, lq, 2, 'rgba(0,30,15,0.55)');
  txt('ord(M mod pᵃ) = τ_p · p^(a − h_p) ,  p > 5', 1520, 280, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: lq });
  ['mod 7 : 16', 'mod 49 : 112', 'mod 343 : 784'].forEach((s, i) => txt(s, 1520, 330 + i * 36, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 11 + i * 0.6) }));
  txt('golden_matrix_prime_power_period', 1520, 440, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: lq });
  /* 80-window ring and the sieve */
  const l = P(S, 1, 0.3), cx = 480, cy = 720, R = 110;
  const pts = ringPts(cx, cy, R, 80);
  pts.forEach((p, j) => dot(p[0], p[1], j === 0 ? 12 : 4, j === 0 ? 'g' : 'c', l * (j === 0 ? 1 : 0.6)));
  txt('j = 0 ≡ j = 80', cx, cy + 10, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: l });
  txt('j = 0 :  2 · 3 · 5 · 7', 820, 680, { size: 24, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 2) });
  txt('j = 80 : F₂₄₃ even, 51 digits', 820, 725, { size: 24, fam: F.mono, w: 700, c: C.red, a: P(S, 1, 4.5) });
  const sv = P(S, 1, 9.5);
  for (let a = 0; a < 30; a++) { const ok = a % 2 && a % 3 && a % 5, x = 1240 + (a % 15) * 36, y = 640 + Math.floor(a / 15) * 46; cellv(x, y, 32, a, ok ? C.gold : C.dim, sv * clamp(P(S, 1, 9.5, 2) * 30 - a), ok ? 'rgba(60,45,0,0.6)' : 'rgba(0,0,0,0.4)', 0.42); }
  txt('index mod 30 : 8 of 30 = 4/15', 1500, 790, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 14) });
  txt('windows j ≡ 1, 3, 5, 9 (mod 10)', 1500, 830, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 15) });
};

/* ---- 12 CHANCE ---- */
SCENES.chance = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  eqn('X = p₁ + p₁₃    Y = p₃ + p₁₃    Z = p₂    κ = p₁₃', W / 2, 240, P(S, 0, 4.5), C.white, 26);
  eqn('Pr(V_j prime) = ε₁X + ε₂Z + ε₃Y + (ε₁₃ − ε₁ − ε₃) κ', W / 2, 300, P(S, 1, 0.3), C.gold, 26);
  const rw = [0, 1, 2, 3, 4].map(i => 0.2 + 0.16 * Math.sin(t * 1.3 + i * 1.9)), q0 = P(S, 0, 1, 1) * (1 - P(S, 1, 0, 1));
  pyr(W / 2, 680, 280, t * 0.3, q0, [0, 2, 3, 5, 7], { r: 32, ls: 30, w: rw });
  txt('κ = Pr(joint pattern)', W / 2 + 330, 760, { size: 24, fam: F.mono, w: 700, c: C.green, a: q0 * P(S, 0, 8) });
  const lawA = [0.5, 0, 0, 0, 0.5], lawB = [0, 0.5, 0, 0.5, 0];
  const q = P(S, 1, 4);
  pyr(560, 660, 250, t * 0.3, q, [0, 2, 3, 5, 7], { r: 30, ls: 28, w: lawA, mark: true });
  pyr(1360, 660, 250, -t * 0.3, q, [0, 2, 3, 5, 7], { r: 30, ls: 28, w: lawB, mark: true });
  txt('½ · 0  +  ½ · 7', 560, 775, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  txt('½ · 2  +  ½ · 5', 1360, 775, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  eqn('X = Y = ½ ,  Z = 0', W / 2, 640, P(S, 1, 7), C.cyan, 26);
  chip(560, 838, 340, 56, 'Pr(prime) = ½', C.orange, P(S, 1, 10.5), 26);
  chip(1360, 838, 340, 56, 'Pr(prime) = 1', C.gold, P(S, 1, 12), 26);
  const tq = P(S, 0, 7);
  [['j=0', 'X+Y+Z−κ'], ['j=1', 'Z+κ'], ['j=2', 'Y−κ'], ['j=3', 'Z+κ'], ['j=4', 'Y']].forEach(([a, b], i) => { txt(a + ' : ' + b, 300 + i * 330, 360, { size: 20, fam: F.mono, w: 700, c: C.white, a: 0.75 * tq * (1 - P(S, 1, 0.3)) }); });
};

/* ---- 13 SEVEN ---- */
SCENES.seven = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const s0 = clamp(u);
  VAL0.forEach((v, i) => { const x = 330 + i * 150, hit = v % 7 === 0, q = P(S, 0, 6, 0.8); cellv(x - 50, 220, 100, v, hit ? C.gold : C.dim, s0, hit ? rgba(C.gold, 0.25 * q) : 'rgba(0,0,0,0.45)', 0.45); txt(hit ? '7 | Q' : 'no', x, 360, { size: 20, fam: F.mono, w: 700, align: 'center', c: hit ? C.gold : C.dim, a: q }); });
  eqn('d₇ = p₀ + p₁₃ = 1 − X − Y − Z + 2κ', 630, 440, P(S, 0, 10), C.gold, 26);
  eqn('κ = (d₇ − 1 + X + Y + Z) / 2', 630, 490, P(S, 0, 13.5), C.green, 26);
  /* two laws */
  const pm = [[0.1, 0.3, 0.2, 0.3, 0.1], [0.3, 0.1, 0.2, 0.1, 0.3]], names = ['p⁻', 'p⁺'];
  const l = P(S, 1, 0.3);
  pm.forEach((law, k) => { const x0 = 1180 + k * 330; txt(names[k], x0 + 140, 220, { size: 26, fam: F.mono, w: 700, align: 'center', c: k ? C.mag : C.cyan, a: l }); law.forEach((v, i) => { const h = v * 400 * l; fillBox(x0 + i * 56, 440 - h, 44, h, MC[i], 0.75 * l); txt(MLAB[i], x0 + i * 56 + 22, 468, { size: 15, fam: F.mono, align: 'center', c: C.dim, a: l }); }); });
  txt('X = Y = 2/5 ,  Z = 1/5  (both)', 1510, 510, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1.5) });
  txt('d₇ = 1/5  vs  3/5', 1510, 545, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2.5) });
  /* replies after an odd archive */
  const rep = [['18', 1 / 3, 1 / 3], ['26', 1 / 2, 1 / 6], ['⊥ reject', 1 / 6, 1 / 2]];
  const rq = P(S, 1, 3.5, 1.5);
  rep.forEach(([lab, a, b], i) => { const y = 640 + i * 66; txt(lab, 380, y + 30, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.white, a: rq }); fillBox(400, y, a * 1200 * rq, 24, C.cyan, 0.75 * rq); fillBox(400, y + 28, b * 1200 * rq, 24, C.mag, 0.75 * rq); txt(['1/3', '1/2', '1/6'][i], 410 + a * 1200, y + 20, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: rq }); txt(['1/3', '1/6', '1/2'][i], 410 + b * 1200, y + 48, { size: 18, fam: F.mono, w: 700, c: C.mag, a: rq }); });
  const iq = P(S, 1, 10.5);
  dashed(400 + 1200 / 3, 620, 400 + 1200 / 3, 850, C.orange, iq, 3);
  txt('independence: κ* = XY/(1−Z) = 1/5 → reject 1/3', 400 + 1200 / 3 + 16, 885, { size: 20, fam: F.mono, w: 700, c: C.orange, a: iq });
};

/* ---- 14 EVERY ---- */
SCENES.every = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory', 'open']);
  const s0 = clamp(u);
  const x0 = 220, x1 = 1700, y = 300;
  line(x0, y, x1, y, C.dim, s0, 2);
  txt('0', x0, y + 34, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: s0 }); txt('10 946 = F₂₁', x1, y + 34, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: s0 });
  /* a moving sample with its 19-bit Zeckendorf word */
  const N = Math.floor((rnd(Math.floor(u / 1.6), 34) * 10946)) % 10946, b = zeckBits(N, 19);
  const zq = P(S, 0, 1) * (1 - P(S, 1, 0.3));
  dot(x0 + (x1 - x0) * N / 10946, y, 14, 'g', zq);
  txt('N = ' + N, x0 + (x1 - x0) * N / 10946, y - 26, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: zq });
  for (let k = 0; k < 19; k++) { const i = 18 - k, x = 330 + k * 66 + Math.floor(k / 3) * 18; cellv(x, 400, 56, b[i], b[i] ? C.gold : C.dim, zq, b[i] ? 'rgba(60,45,0,0.6)' : 'rgba(0,0,0,0.4)', 0.5); if (i >= 1 && i % 3 === 2) txt('window ' + (Math.floor((i - 1) / 3) + 1), x + 28, 490, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: zq }); if (i === 0) txt('unit', x + 28, 490, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: zq }); }
  txt('6 windows × 3 bits + 1 unit bit · no two adjacent 1s · each N exactly once', W / 2, 540, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: zq });
  /* candidates */
  const cq = P(S, 1, 4, 3);
  ctx.globalAlpha = s0 * 0.9; ctx.strokeStyle = C.gold; ctx.lineWidth = 1.2; ctx.beginPath();
  CAND.forEach((n, i) => { if (cq <= 0 || i / CAND.length > cq) return; const x = x0 + (x1 - x0) * n / 10946; ctx.moveTo(x, y - 18); ctx.lineTo(x, y + 18); }); ctx.stroke(); ctx.globalAlpha = 1;
  chip(W / 2, 400, 820, 56, 'N, N+2, N+6 coprime to 210 : 418 candidates', C.gold, P(S, 1, 9.5), 24);
  chip(W / 2, 480, 640, 52, '3, 5, 7 : the only prime triple N, N+2, N+4', C.cyan, P(S, 1, 1), 22);
  const l2 = P(S, 2, 0.3);
  txt('41 · 43 · 47  ✓ prime', 640, 620, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 11) });
  txt('137 · 139 · 143 = 11·13  ✗', 1280, 620, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.red, a: l2 });
  eqn('#{N ≤ T : triplet} ~ 𝔖 · T / (log T)³', W / 2, 720, P(S, 2, 5), C.vio, 28);
  txt('Hardy–Littlewood · conjecture, not proved', W / 2, 770, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 2, 5) });
};

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['2 · 3 · 5 · 7', 'together once · j = 0', C.gold], ['rank', 'where a prime lands', C.cyan], ['v₂(rank)', 'who lands together', C.mag], ['7! clock', 'can only sieve', C.green]];
    items.forEach(([a1, a2, col], i) => { const x = 330 + i * 420, q = P(S, 0, [0.3, 4, 7, 10][i]) * fade; box(x - 190, 260, 380, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 325, { size: 36, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 375, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    txt('LEAN · rank closure · prime-power period · collision depth', W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.5) * fade });
    txt('CITED · Fibonacci/Lucas index rules · rank of apparition · Mersenne Lucas factor', W / 2, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3.5) * fade });
    txt('VOLUME · window table · collision primes · 2-adic beats · κ readings', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 6) * fade });
    txt('OPEN · prime triplets forever (Hardy–Littlewood)', W / 2, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 1, 8) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    pyr(W / 2, 400, 260, t * 0.3, ep * out, [0, 2, 3, 5, 7], { r: 28, ls: 32, mark: true });
    txt('AURIC FIB ATOM PYRAMID V', W / 2, 660, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('金字塔 V · 二三五七只出现一次 · TRURETURING FILM 034', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Four primes, once. Then rank decides the rest.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'FOUR PRIMES', windows: 'WINDOWS', once: 'ONLY ONCE', coprime: 'COPRIME', fermat: 'FERMAT INDEX', mersenne: 'MERSENNE FACTOR', collide: 'COLLISIONS', ranks: 'RANK ROLES', closure: 'RANK CLOSURE', beats: '2-ADIC BEATS', clock: 'THE 7! CLOCK', chance: 'HIDDEN KAPPA', seven: 'TEST BY SEVEN', every: 'EVERY NUMBER', finale: 'LEDGER' });

function poster34() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyr(W / 2, 540, 360, 0.6, 1, [0, 2, 3, 5, 7], { r: 40, ls: 48, mark: true });
  [2, 3, 5, 7].forEach((p, i) => txt(String(p), i < 2 ? 260 : 1660, i % 2 ? 720 : 440, { size: 120, fam: F.mono, w: 700, align: 'center', c: C.gold, a: 0.35, ab: 3 }));
  txt('FIB 原子金字塔 V', W / 2, 190, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID V', W / 2, 890, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('二 三 五 七 只 出 现 一 次 · 秩 决 定 去 处 · 二 进 节 拍 决 定 同 行', W / 2, 955, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 034', W / 2, 1010, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster34;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
