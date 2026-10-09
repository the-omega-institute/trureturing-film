/* Film 032 — AURIC FIB ATOM PYRAMID III · 金字塔 III：黄金五环. Closing the five-mode chain into a ring: local legality, global existence and the golden lock. */

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

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const f1 = 1 - P(S, 1, 0, 0.8);
  if (f1 > 0) {
    const xs = [640, 960, 1280], labs = [['2', C.cyan], ['3', C.gold], ['5', C.mag]];
    labs.forEach(([v, col], i) => cellv(xs[i] - 70, 260, 140, v, col, clamp(u) * f1, 'rgba(0,0,0,0.55)', 0.5));
    const qr = P(S, 0, 2) * f1;
    [[0, 1], [1, 2]].forEach(([i, j]) => { const xm = (xs[i] + xs[j]) / 2; txt('✗', xm, 250, { size: 40, fam: F.mono, w: 900, align: 'center', c: C.red, a: qr }); });
    [['000', '∅', '0'], ['100', '2', '2'], ['010', '3', '3'], ['001', '5', '5'], ['101', '2+5', '25']].forEach(([bstr, n, k], i) => chip(360 + i * 300, 520, 240, 70, bstr + '  ' + n, PC[k], P(S, 0, 3 + i * 0.6) * f1, 26));
    thm('PathStableSetPolytope.convexHull_three_pyramid · AdmissibleCount.admissibleWord_card_eq_fib', W / 2, 640, P(S, 0, 4) * f1, 'center');
  }
  const q = P(S, 1, 0.3, 0.8);
  if (q > 0) {
    const m = ease(P(S, 1, 1.2, 3.2)), rp = ringPts(960, 480, 240, 5);
    const pts = [0, 1, 2, 3, 4].map(i => [lerp(560 + i * 200, rp[i][0], m), lerp(520, rp[i][1], m)]);
    for (let i = 0; i < 4; i++) line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.cyan, q, 3);
    const cl = P(S, 1, 4.4, 0.6);
    if (cl > 0) { line(pts[4][0], pts[4][1], pts[0][0], pts[0][1], C.gold, cl, 5); txt('the ends meet', 960, 840, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: cl }); }
    pts.forEach((p, i) => { dot(p[0], p[1], 18, 'c', q); txt(String(i + 1), p[0], p[1] - 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const k = Math.floor(t * 0.7) % 11;
  drawRing(620, 380, 150, C5[k], rp, { gaps: true, r: 18 });
  cone5(1300, 430, 230, t * 0.4, rp, { star: 0.8, psi: 1 });
  txt(scramble('AURIC FIB ATOM PYRAMID III', rp, 321), W / 2, 690, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 III · 黄 金 五 环', W / 2, 765, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 032 · AURIC_FIB_ATOM_HIDDEN_RELATIONS_STATISTICS_PHASE_AND_SEAMS §§26–27', W / 2, 115, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['local ✓  ·  global ✗', C.red], ['classical 2 < quantum √5', C.cyan], ['golden lock at 1/φ', C.gold]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 520, 860, 480, 60, s, col, P(S, 1, 0.3 + i * 1.2), 24));
};

/* ---- 02 RING ---- */
SCENES.ring = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  const tri = ringPts(420, 330, 110, 3);
  for (let i = 0; i < 3; i++) { const j = (i + 1) % 3; line(tri[i][0], tri[i][1], tri[j][0], tri[j][1], i === 2 ? C.gold : C.cyan, s0 * (i === 2 ? P(S, 0, 1.5) : 1), i === 2 ? 4 : 2.5); }
  tri.forEach(p => ring(p[0], p[1], 12, C.white, s0, 2));
  txt('closing edge', 420, 490, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: P(S, 0, 1.5) });
  [['000', 0], ['100', 0], ['010', 0], ['001', 0], ['101', 1]].forEach(([b, dead], i) => { const x = 160 + i * 130, q = P(S, 0, 2.5 + i * 0.4); txt(b, x, 590, { size: 34, fam: F.mono, w: 700, align: 'center', c: dead ? C.red : C.white, a: q, ls: 4 }); if (dead) { const d = P(S, 0, 5.5); line(x - 50, 580, x + 50, 580, C.red, d, 4); txt('ends touch', x, 640, { size: 20, fam: F.mono, align: 'center', c: C.red, a: d }); } });
  chip(420, 720, 300, 60, '|C₃| = 4', C.cyan, P(S, 0, 7), 30);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const rows = [[C5[0]], C5.slice(1, 6), C5.slice(6, 11)];
    rows.forEach((row, ri) => row.forEach((b, i) => { const x = 1350 + (i - (row.length - 1) / 2) * 150, y = 290 + ri * 190, qq = P(S, 1, 1 + ri * 2 + i * 0.25); drawRing(x, y, 52, b, qq, { r: 9, lw: 2 }); }));
    txt('1', 905, 300, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1) });
    txt('5', 905, 490, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 3) });
    txt('5', 905, 680, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
    chip(1350, 820, 420, 60, '1 + 5 + 5 = 11', C.gold, P(S, 1, 6.5), 30);
    const q3 = P(S, 1, 9);
    if (q3 > 0) { drawRing(760, 720, 60, [1, 0, 1, 0, 1], q3, { r: 10 }); txt('3 chosen → 6 seats ✗', 760, 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: q3 }); }
  }
};

/* ---- 03 PARITY ---- */
SCENES.parity = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), k2 = lineAt(S, 1).s;
  const idx = u < k2 ? Math.floor(Math.max(0, u - 2) * 0.9) % 11 : 9;
  const b = C5[idx], K = b.reduce((s, v) => s + v, 0);
  drawRing(560, 480, 230, b, s0, { gaps: true, r: 22, gw: 7 });
  txt('chosen K = ' + K, 1150, 330, { size: 40, fam: F.mono, w: 700, c: C.gold, a: s0 });
  txt('empty seams = 5 − 2·' + K + ' = ' + (5 - 2 * K), 1150, 400, { size: 40, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 4) });
  chip(1400, 500, 560, 64, 'Σ gaps = N − 2K', C.gold, P(S, 0, 7), 32);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(1400, 590, 560, 60, 'odd N  ⇒  gaps ≥ 1', C.red, P(S, 1, 0.8), 28);
    MAX5.forEach((bb, i) => drawRing(1030 + i * 150, 740, 52, bb, P(S, 1, 5 + i * 0.4), { gaps: true, r: 9, gw: 5 }));
    txt('the five fullest patterns: one gap each', 1330, 850, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) });
  }
};

/* ---- 04 LOCAL ---- */
SCENES.local = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), cx = 620, cy = 490, R = 230, p = ringPts(cx, cy, R, 5);
  for (let i = 0; i < 5; i++) { const j = (i + 1) % 5; line(p[i][0], p[i][1], p[j][0], p[j][1], C.cyan, s0, 3); }
  p.forEach(pt => { dot(pt[0], pt[1], 26, 'c', s0); const dx = pt[0] - cx, dy = pt[1] - cy, L = Math.hypot(dx, dy); txt('½', pt[0] - dx / L * 52, pt[1] - dy / L * 52 + 12, { size: 34, fam: F.mono, w: 900, align: 'center', c: C.white, a: s0 }); });
  for (let i = 0; i < 5; i++) {
    const j = (i + 1) % 5, q = P(S, 0, 3 + i * 0.7); if (q <= 0) continue;
    const mx = (p[i][0] + p[j][0]) / 2, my = (p[i][1] + p[j][1]) / 2, dx = mx - cx, dy = my - cy, L = Math.hypot(dx, dy);
    const tx = mx + dx / L * 85 - 36, ty = my + dy / L * 85 - 36;
    [[0, '½'], ['½', 0]].forEach((row, r) => row.forEach((v, c) => cellv(tx + c * 36, ty + r * 36, 34, v, v ? C.green : C.dim, q, 'rgba(0,0,0,0.6)', 0.5)));
  }
  txt('every edge table is legal ✓', 1380, 300, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const base = 720, sc = 150;
    [['needed  Σuᵢ = 5/2', 2.5, C.red], ['any source  ≤ 2', 2, C.cyan]].forEach(([l, v, col], i) => { const x = 1240 + i * 280, h = sc * v * P(S, 1, 1.5 + i * 1.5, 1); fillBox(x - 70, base - h, 140, h, col, 0.8); txt(l, x, base + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
    stamp('NO COMMON SOURCE', 1380, 840, P(S, 1, 7), C.red, 36, -0.04);
  }
};

/* ---- 05 GAP ---- */
SCENES.gap = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), v = v3(560, 520, 420, -0.75 + 0.25 * Math.sin(t * 0.3), 0.45, [0.3, 0.3, 0.3]);
  const O = v(0, 0, 0), E = [v(1, 0, 0), v(0, 1, 0), v(0, 0, 1)], Hh = v(0.5, 0.5, 0.5);
  [[1, 0, 0, 'u₁'], [0, 1, 0, 'u₂'], [0, 0, 1, 'u₃']].forEach(([x, y, z, l]) => { const e = v(x * 1.25, y * 1.25, z * 1.25); line(O[0], O[1], e[0], e[1], C.dim, s0 * 0.6, 1.5); txt(l, e[0], e[1] - 8, { size: 22, fam: F.mono, c: C.dim, a: s0, align: 'center' }); });
  /* classical simplex */
  [[O, E[0], E[1]], [O, E[1], E[2]], [O, E[0], E[2]], [E[0], E[1], E[2]]].forEach(f => fillPoly(f, C.cyan, s0 * 0.07));
  [[O, E[0]], [O, E[1]], [O, E[2]], [E[0], E[1]], [E[1], E[2]], [E[0], E[2]]].forEach(([a, b]) => line(a[0], a[1], b[0], b[1], C.cyan, s0, 2.5));
  /* gap tetrahedron */
  const qg = P(S, 0, 4, 1) * (0.75 + 0.25 * Math.sin(t * 3));
  [[E[0], E[1], Hh], [E[1], E[2], Hh], [E[0], E[2], Hh]].forEach(f => fillPoly(f, C.red, qg * 0.3));
  [[E[0], Hh], [E[1], Hh], [E[2], Hh]].forEach(([a, b]) => line(a[0], a[1], b[0], b[1], C.red, qg, 3));
  dot(Hh[0], Hh[1], 16, 'r', P(S, 0, 4)); txt('(½, ½, ½)', Hh[0] + 22, Hh[1] - 16, { size: 22, fam: F.mono, w: 700, c: C.red, a: P(S, 0, 4) });
  txt('triangle: locally legal, globally impossible', 560, 840, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 4) });
  txt('gap = { rᵢ ≥ 0 ,  Σ rᵢ < 1 }', 1380, 300, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(1380, 380, 560, 62, 'Vol = 1 / (2·N!)', C.gold, q, 32);
    chip(1230, 470, 270, 56, 'N=3 : 1/12', C.red, P(S, 1, 2.5), 24);
    chip(1530, 470, 270, 56, 'N=5 : 1/240', C.red, P(S, 1, 4), 24);
    MAX5.forEach((bb, i) => { const x = 1080 + i * 150, qq = P(S, 1, 7 + i * 0.3); drawRing(x, 640, 50, bb, qq, { gaps: true, r: 8, gw: 5 }); txt('r' + '₁₂₃₄₅'[i], x, 725, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: qq }); });
    txt('outer face Σ rᵢ = 1: unique mix, weights rᵢ', 1380, 790, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 7) });
  }
};

/* ---- 06 LUCAS ---- */
SCENES.lucas = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), p = ringPts(470, 470, 210, 5);
  for (let i = 0; i < 5; i++) {
    const j = (i + 1) % 5, q = P(S, 0, 1 + i * 0.6);
    arrow(lerp(p[i][0], p[j][0], 0.25), lerp(p[i][1], p[j][1], 0.25), lerp(p[i][0], p[j][0], 0.75), lerp(p[i][1], p[j][1], 0.75), C.dim, q, 2);
    box(p[i][0] - 58, p[i][1] - 34, 116, 68, C.cyan, q, 2, 'rgba(0,0,0,0.6)');
    txt('1  λ', p[i][0], p[i][1] - 6, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
    txt('1  0', p[i][0], p[i][1] + 22, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
  }
  txt('tr', 470, 480, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 0, 4) });
  chip(470, 800, 560, 64, 'Z₅(λ) = 1 + 5λ + 5λ²', C.gold, P(S, 0, 8), 30);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const L = [4, 7, 11, 18, 29, 47], base = 640, sc = 7;
    L.forEach((v, i) => { const x = 1000 + i * 120, qq = P(S, 1, 0.8 + i * 0.4), h = v * sc * qq; fillBox(x - 40, base - h, 80, h, i === 2 ? C.gold : C.cyan, 0.8); txt(String(v), x, base - h - 12, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: qq }); txt('N=' + (i + 3), x, base + 32, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q }); });
    txt('Lucas:  L_N = φᴺ + (−1/φ)ᴺ', 1300, 250, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
    chip(1150, 760, 400, 56, 'keep φ₊⁵ only → λ^(5/2) ✗', C.red, P(S, 1, 8), 22);
    chip(1590, 760, 400, 56, 'true degree: λ² ✓', C.green, P(S, 1, 10), 22);
  }
};

/* ---- 07 CEILINGS ---- */
SCENES.ceilings = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'published']);
  const s0 = clamp(u);
  const x0 = 900, x1 = 1780, y = 520, X = v => x0 + (x1 - x0) * (v - 1.5) / 1.2;
  line(x0, y, x1, y, C.dim, s0, 2);
  [1.5, 2, 2.5].forEach(v => { line(X(v), y - 10, X(v), y + 10, C.dim, s0, 2); txt(String(v), X(v), y + 40, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: s0 }); });
  const mk = (v, lab, col, q, up) => { if (q <= 0) return; line(X(v), y, X(v), y + (up ? -120 : 120), col, q, 4); dot(X(v), y, 16, col === C.cyan ? 'c' : col === C.gold ? 'g' : 'm', q); txt(lab, X(v), y + (up ? -140 : 160), { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: q }); };
  mk(2, 'classical 2', C.cyan, P(S, 0, 6), true);
  mk(Math.sqrt(5), 'quantum √5 ≈ 2.236', C.gold, P(S, 1, 0.8), false);
  mk(2.5, 'edges only 5/2', C.mag, P(S, 1, 12), true);
  txt('max  Σ P(position j chosen)', 1340, 260, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) });
  const q = P(S, 1, 0.3, 1);
  if (q > 0) {
    cone5(470, 520, 300, 0.3 + t * 0.25, q, { star: 0.9, psi: 1 });
    txt('each arrow: probability 1/√5', 470, 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 6) });
    thm('Klyachko–Can–Binicioğlu–Shumovsky pentagon (arXiv:0706.0126)', 470, 875, P(S, 1, 6), 'center');
  } else {
    const k = Math.floor(t * 0.9) % 5; drawRing(470, 480, 200, MAX5[k], s0, { r: 20 });
    txt('one hidden configuration: at most 2 chosen', 470, 760, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5) });
  }
};

/* ---- 08 CERTIFICATE ---- */
SCENES.certificate = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'published');
  const s0 = clamp(u);
  txt('H₅ = √5·I + ((5 − √5)/2)·A − J', 520, 230, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  const cs = 92, x0 = 290, y0 = 270;
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
    const d = Math.min((i - j + 5) % 5, (j - i + 5) % 5), val = d === 0 ? '1.24' : d === 1 ? '0.38' : '−1', col = d === 0 ? C.gold : d === 1 ? C.cyan : C.red;
    cellv(x0 + j * cs, y0 + i * cs, cs - 6, val, col, P(S, 0, 1 + (i + j) * 0.15), 'rgba(0,0,0,0.55)', 0.28);
  }
  const ev = [0, 0, 0, 3.09, 3.09], base = 640;
  txt('eigenvalues', 1340, 250, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) });
  ev.forEach((e, i) => { const x = 1100 + i * 120, q = P(S, 0, 6.5 + i * 0.4), h = 90 * e * q; fillBox(x - 40, base - h - 3, 80, h + 3, e ? C.green : C.gold, 0.85); txt(e ? '3.09' : '0', x, base - h - 14, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
  chip(1340, 700, 420, 56, 'H₅ ⪰ 0  ⇒  Σ Pⱼ ≤ √5 · I', C.green, P(S, 0, 9.5), 24);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const rows = [['ring', 'classical', 'quantum', 'edges'], ['C₃', '1', '1', '3/2'], ['C₄', '2', '2', '2'], ['C₅', '2', '√5', '5/2']];
    const cols = [1050, 1230, 1410, 1590];
    rows.forEach((r, i) => { const qq = i === 0 ? q : P(S, 1, 2 + (i - 1) * 2.2); const yy = 755 + i * 34; r.forEach((c, j) => txt(c, cols[j], yy, { size: 24, fam: F.mono, w: 700, align: 'center', c: i === 0 ? C.dim : (i === 3 ? C.gold : C.white), a: qq })); });
    if (P(S, 1, 7) > 0) box(cols[0] - 70, 755 + 3 * 34 - 26, 680, 34, C.gold, P(S, 1, 7), 2);
  }
};

/* ---- 09 RECORDS ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), xs = [260, 460, 660, 860], y = 300;
  const ec = [C.cyan, C.gold, C.mag];
  for (let i = 0; i < 3; i++) { line(xs[i], y, xs[i + 1], y, ec[i], s0, 4); txt('r' + '₁₂₃'[i], (xs[i] + xs[i + 1]) / 2, y - 22, { size: 26, fam: F.mono, w: 700, align: 'center', c: ec[i], a: s0 }); }
  xs.forEach((x, i) => { dot(x, y, 20, 'w', s0); txt('e' + '₁₂₃₄'[i], x, y + 50, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 }); });
  const M = [['1', 'r₁', '0', '0'], ['r₁', '1', 'r₂', '0'], ['0', 'r₂', '1', 'r₃'], ['0', '0', 'r₃', '1']];
  M.forEach((row, i) => row.forEach((v, j) => cellv(1150 + j * 74, 200 + i * 74, 68, v, v === '0' ? C.dim : v === '1' ? C.white : ec[['r₁', 'r₂', 'r₃'].indexOf(v)], P(S, 0, 2), 'rgba(0,0,0,0.5)', 0.34)));
  txt('det G₄ = 1 − r₁² − r₂² − r₃² + r₁²r₃²', 960, 530, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    [['1', '∅', '0'], ['−r₁²', '2', '2'], ['−r₂²', '3', '3'], ['−r₃²', '5', '5'], ['+r₁²r₃²', '2+5', '25']].forEach(([term, pat, k], i) => chip(320 + i * 320, 600, 280, 62, term + '  ↔  ' + pat, PC[k], P(S, 1, 0.5 + i * 0.7), 24));
    txt('at r² = −1 :  1, 2, 3, 5, 8, 13, 21 …', 520, 760, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 7) });
    const th = [2, 3, 4, 5, 6, 7, 8, 9].map(m => 1 / (2 * Math.cos(Math.PI / (m + 1))));
    const bx = 1100, base = 860, sc = 170;
    line(bx - 20, base - sc * 0.5, bx + th.length * 80, base - sc * 0.5, C.green, P(S, 1, 10), 2);
    txt('1/2', bx + th.length * 80 + 10, base - sc * 0.5 + 8, { size: 20, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 10) });
    th.forEach((v, i) => { const qq = P(S, 1, 8 + i * 0.25), h = sc * v * qq; fillBox(bx + i * 80, base - h, 56, h, C.cyan, 0.7); txt('m=' + (i + 2), bx + i * 80 + 28, base + 24, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: qq }); });
    txt('max overlap for m records', bx + 300, base - sc - 20, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 8) });
  }
};

/* ---- 10 DISC ---- */
SCENES.disc = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), p = ringPts(470, 480, 200, 5);
  for (let i = 0; i < 4; i++) { line(p[i][0], p[i][1], p[i + 1][0], p[i + 1][1], C.cyan, s0, 3); const mx = (p[i][0] + p[i + 1][0]) / 2, my = (p[i][1] + p[i + 1][1]) / 2; txt('3/5', mx + (mx - 470) * 0.25, my + (my - 480) * 0.25 + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s0 }); }
  dashed(p[4][0], p[4][1], p[0][0], p[0][1], C.gold, s0, 3);
  txt('c ?', (p[4][0] + p[0][0]) / 2 - 40, (p[4][1] + p[0][1]) / 2, { size: 30, fam: F.mono, w: 900, align: 'center', c: C.gold, a: s0 });
  p.forEach((pt, i) => { dot(pt[0], pt[1], 18, 'w', s0); });
  /* complex plane */
  const ox = 1080, oy = 500, sc = 760, mu = 81 / 175, al = 31 / 175;
  const qd = P(S, 0, 4, 1);
  line(ox - 80, oy, ox + 0.75 * sc, oy, C.dim, qd, 1.5); line(ox, oy - 260, ox, oy + 260, C.dim, qd, 1.5);
  txt('Re c', ox + 0.75 * sc, oy + 30, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: qd }); txt('Im c', ox + 10, oy - 240, { size: 20, fam: F.mono, c: C.dim, a: qd });
  ctx.globalAlpha = qd * 0.25; ctx.fillStyle = C.green; ctx.beginPath(); ctx.arc(ox + mu * sc, oy, al * sc, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  ring(ox + mu * sc, oy, al * sc, C.green, qd, 3);
  dot(ox + mu * sc, oy, 8, 'n', qd); txt('μ = 81/175', ox + mu * sc, oy - al * sc - 18, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: qd });
  txt('α = 31/175', ox + mu * sc, oy + al * sc + 34, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 7) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    dot(ox, oy, 14, 'r', q); txt('c = 0 ✗', ox - 20, oy - 24, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.red, a: q });
    ctx.save(); ctx.setLineDash([6, 6]); ring(ox, oy, (2 / 7) * sc, C.red, q * 0.6, 1.5); ctx.restore();
    arrow(ox, oy + 2, ox + (2 / 7) * sc, oy + 2, C.gold, P(S, 1, 1), 3); txt('|c| ≥ 2/7', ox + (1 / 7) * sc, oy + 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 1) });
    chip(1300, 820, 640, 60, 'zero-fill: det = −32/625 < 0', C.red, P(S, 1, 4), 26);
    txt('not yet measured ≠ zero', 470, 820, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 7) });
  }
};

/* ---- 11 TEMPLATES ---- */
SCENES.templates = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), k2 = lineAt(S, 1).s;
  const del = u < k2 && u > lineAt(S, 0).s + 6 ? Math.floor((u - lineAt(S, 0).s - 6) * 0.8) % 5 : -1;
  const drawT = (cx, sign, title, col) => {
    const p = ringPts(cx, 430, 170, 5);
    for (let i = 0; i < 5; i++) { const j = (i + 1) % 5, neg = sign < 0 && i === 4, gone = del === i || del === j; line(p[i][0], p[i][1], p[j][0], p[j][1], neg ? C.red : C.green, s0 * (gone ? 0.12 : 1), neg ? 5 : 3); const mx = (p[i][0] + p[j][0]) / 2, my = (p[i][1] + p[j][1]) / 2; txt(neg ? '−3/5' : '+3/5', mx + (mx - cx) * 0.3, my + (my - 430) * 0.3 + 7, { size: 20, fam: F.mono, w: 700, align: 'center', c: neg ? C.red : C.green, a: s0 * (gone ? 0.15 : 1) }); }
    p.forEach((pt, i) => dot(pt[0], pt[1], 16, 'w', s0 * (del === i ? 0.12 : 1)));
    txt(title, cx, 220, { size: 32, fam: F.orb, w: 900, align: 'center', c: col, a: s0 });
    return p;
  };
  drawT(520, 1, 'G₊', C.green);
  const pm = drawT(1400, -1, 'G₋', C.red);
  if (del >= 0) txt('delete e' + '₁₂₃₄₅'[del] + ' : same spectra, all positive ✓', W / 2, 700, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 6) * (1 - P(S, 1, 0)) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(520, 690, 420, 58, 'det = 11/3125  ✓', C.green, q, 26);
    chip(1400, 690, 420, 58, 'det = −961/3125  ✗', C.red, P(S, 1, 1), 26);
    const qw = P(S, 1, 3);
    pm.forEach((pt, i) => txt(i % 2 ? '−' : '+', pt[0] + 26, pt[1] - 18, { size: 34, fam: F.mono, w: 900, c: C.gold, a: qw }));
    txt('‖e₁ − e₂ + e₃ − e₄ + e₅‖² = −1', 1400, 790, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4) });
    chip(520, 800, 560, 58, 'repair: every edge ±1/10 → ±1/2', C.gold, P(S, 1, 9), 22);
  }
};

/* ---- 12 PHASE ---- */
SCENES.phase = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  txt('det G₅ = 1 − 5r² + 5r⁴  +  2r⁵ cos Φ', W / 2, 220, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  txt('pattern polynomial', 760, 260, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  txt('two loop walks', 1250, 260, { size: 20, fam: F.mono, align: 'center', c: C.gold, a: P(S, 0, 6) });
  const f1 = 1 - P(S, 1, 0, 0.8);
  if (f1 > 0) {
    const M2 = [[1, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 1], [1, 0, 0, 1, 0], [0, 1, 0, 0, 1]];
    const mk = (cx, cy, R, sel, q) => { const pp = ringPts(cx, cy, R, 5); for (let i = 0; i < 5; i++) { const j = (i + 1) % 5, on = sel.includes(i); line(pp[i][0], pp[i][1], pp[j][0], pp[j][1], on ? C.cyan : C.dim, q * (on ? 1 : 0.5), on ? 5 : 1.5); } pp.forEach(pt => dot(pt[0], pt[1], 7, 'w', q)); };
    mk(300, 470, 60, [], P(S, 0, 1.5) * f1); txt('1', 300, 570, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 1.5) * f1 });
    for (let i = 0; i < 5; i++) mk(470 + i * 130, 400, 46, [i], P(S, 0, 2 + i * 0.2) * f1);
    txt('−5r²', 730, 480, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) * f1 });
    [[0, 2], [0, 3], [1, 3], [1, 4], [2, 4]].forEach((sel, i) => mk(470 + i * 130, 560, 46, sel, P(S, 0, 3.2 + i * 0.2) * f1));
    txt('+5r⁴', 730, 640, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3.2) * f1 });
    const qa = P(S, 0, 6) * f1, pp = ringPts(1400, 520, 170, 5);
    for (let i = 0; i < 5; i++) { const j = (i + 1) % 5; line(pp[i][0], pp[i][1], pp[j][0], pp[j][1], C.gold, qa, 3); }
    pp.forEach(pt => dot(pt[0], pt[1], 12, 'w', qa));
    ctx.save(); ctx.globalAlpha = qa; ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1400, 520, 230, -1.2 + t, -1.2 + t + 4.6); ctx.stroke(); ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.arc(1400, 520, 110, 1.2 - t, 1.2 - t + 4.6); ctx.stroke(); ctx.restore();
    txt('Ω = g₁g₂g₃g₄g₅', 1400, 800, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: qa });
    txt('forward Ω + backward Ω̄ = 2r⁵ cos Φ', 1400, 845, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 8) * f1 });
  }
  /* left plot: det*3125 vs Phi at r = 3/5 */
  const x0 = 160, x1 = 860, yc = 560, sc = 0.32, X = ph => x0 + (x1 - x0) * (ph + Math.PI) / TAU, Y = d => yc - d * sc;
  const qp = P(S, 1, 0.3, 1);
  if (qp > 0) {
    line(x0, yc, x1, yc, C.dim, qp, 1.5);
    const th = Math.acos(475 / 486);
    fillBox(X(-th), yc - 180, X(th) - X(-th), 360, C.green, 0.18 * qp);
    curve(s => { const ph = -Math.PI + TAU * s; return [X(ph), Y(486 * Math.cos(ph) - 475)]; }, 300, C.gold, qp, 3);
    [[-Math.PI, '−π'], [0, '0'], [Math.PI, 'π']].forEach(([ph, l]) => txt(l, X(ph), yc + 30, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: qp }));
    txt('r = 3/5 :  3125·det = 486 cos Φ − 475', 510, 340, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: qp });
    txt('|Φ| ≤ 0.2132', X(0), yc + 210, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2) });
    /* right plot: allowed |Phi| vs r */
    const a0 = 1040, a1 = 1760, b0 = 760, b1 = 380, R = r => a0 + (a1 - a0) * r / 0.7, PH = ph => b0 + (b1 - b0) * ph / Math.PI;
    const q2 = P(S, 1, 5, 1);
    line(a0, b0, a1, b0, C.dim, q2, 1.5); line(a0, b0, a0, b1 - 20, C.dim, q2, 1.5);
    const pts = []; for (let i = 0; i <= 200; i++) { const r = 0.6180339 * i / 200; const ph = r <= 0.5 ? Math.PI : Math.PI - 5 * Math.acos(1 / (2 * r)); pts.push([R(r), PH(Math.max(0, ph))]); }
    fillPoly(pts.concat([[R(0.6180339), b0], [a0, b0]]), C.green, 0.18 * q2); strokePoly(pts, C.green, q2, 3, false);
    [[0.5, '1/2'], [0.6180339, '1/φ']].forEach(([r, l]) => { line(R(r), b0, R(r), b0 + 10, C.dim, q2, 2); txt(l, R(r), b0 + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: l === '1/φ' ? C.gold : C.dim, a: q2 }); });
    txt('π', a0 - 16, PH(Math.PI) + 8, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: q2 }); txt('allowed |Φ|', a0 + 10, b1 - 30, { size: 20, fam: F.mono, c: C.green, a: q2 }); txt('overlap r', a1, b0 + 70, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: q2 });
    const m3 = P(S, 1, 2); dot(R(0.6), PH(Math.acos(475 / 486)), 12, 'g', m3 * q2);
  }
};

/* ---- 13 GOLDEN ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const s0 = clamp(u), k2 = lineAt(S, 1).s, l2 = u - k2;
  const pent = u < k2 ? P(S, 0, 6) : (l2 < 6 ? 1 : clamp(1 - (l2 - 6) / 0.6) * 0.25);
  const star = u < k2 ? 0 : clamp((l2 - 6) / 0.6);
  cone5(560, 520, 330, -0.3 + t * 0.2, s0, { pent, star, tilt: 0.55 });
  txt('neighbours overlap 1/φ', 560, 820, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: pent * s0 });
  txt('star neighbours ⟂', 560, 860, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: star });
  chip(1380, 260, 640, 62, 'r_max = 1/φ ≈ 0.618 · Φ = 0 · dim 3', C.gold, P(S, 0, 1.5), 22);
  thm('PentagonCosines.pentagon_golden_cosines : 2cos(π/5) = φ , 2cos(2π/5) = φ⁻¹', 1380, 340, P(S, 0, 4) * (1 - P(S, 1, 0)), 'center');
  stamp('FROZEN', 1380, 420, P(S, 0, 5) * (1 - P(S, 1, 0)), C.green, 38, -0.04);
  const rows = [['N', 'r_max', 'Φ', 'dim'], ['3', '1', '0', '1'], ['4', '1/√2', 'π', '2'], ['5', '1/φ', '0', '3'], ['6', '1/√3', 'π', '4']];
  const cols = [1150, 1300, 1450, 1600];
  rows.forEach((r, i) => { const qq = P(S, 0, 8 + i * 0.5); r.forEach((c, j) => txt(c, cols[j], 520 + i * 52, { size: 26, fam: F.mono, w: 700, align: 'center', c: i === 0 ? C.dim : (i === 3 ? C.gold : C.white), a: qq })); });
  txt('r_max(N) = 1 / (2 cos(π/N)) · rank N − 2', 1380, 820, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 9) });
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['unknown · completable', 'a disc of allowed c', C.green], ['phase · never supplied', 'a window, then a lock', C.gold], ['cannot exist', 'squared length −1', C.red]];
    items.forEach(([a1, a2, col], i) => { const x = 420 + i * 540, q = P(S, 0, 0.5 + i * 2) * fade; box(x - 240, 290, 480, 140, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a1, x, 350, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(a2, x, 395, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q }); });
    txt('five patterns build the ring · the golden ratio marks where it locks', W / 2, 560, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade });
    txt('pentagon cosines frozen in Lean · ring theory argued and recomputed', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 3) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    drawRing(720, 400, 130, MAX5[Math.floor(t * 0.8) % 5], ep * out, { gaps: true, r: 16 });
    cone5(1220, 430, 200, t * 0.4, ep * out, { pent: 0.8, star: 0.5, psi: 1 });
    txt('AURIC FIB ATOM PYRAMID III', W / 2, 660, { size: 70, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('金字塔 III · 黄金五环 · TRURETURING FILM 032', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Every piece fits. The whole still has to exist.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'BEND THE CHAIN', ring: 'CLOSE THE RING', parity: 'ODD SEAMS', local: 'LOCAL VS GLOBAL', gap: 'THE GAP SIMPLEX', lucas: 'LUCAS TRACE', ceilings: 'THREE CEILINGS', certificate: 'ROOT FIVE CERTIFICATE', records: 'RECORDS', disc: 'COMPLETION DISC', templates: 'PLUS AND MINUS', phase: 'LOOP PHASE', golden: 'GOLDEN LOCK', finale: 'LEDGER' });

function poster32() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawRing(600, 520, 190, [1, 0, 1, 0, 0], 1, { gaps: true, r: 24, gw: 8 });
  cone5(1300, 560, 300, 0.4, 1, { pent: 0.9, star: 0.7, psi: 1 });
  txt('FIB 原子金字塔 III', W / 2, 190, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID III', W / 2, 870, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('五 环 · 局 部 全 对 · 整 体 不 存 在 · 黄 金 锁 定', W / 2, 945, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 032', W / 2, 1000, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster32;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
