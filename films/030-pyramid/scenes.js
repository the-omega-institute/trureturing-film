/* Film 030 — AURIC FIB ATOM PYRAMID · FIB 原子金字塔. */

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

/* ---- film 030 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
/* pattern colours and labels: order 0,2,3,5,25 */
const PC = { '0': C.white, '2': C.cyan, '3': C.gold, '5': C.mag, '25': C.green };
const PN = { '0': 'c', '2': 'c', '3': 'g', '5': 'm', '25': 'n' };
const PL = { '0': '∅', '2': '2', '3': '3', '5': '5', '25': '2+5' };
const OCC = { '0': [0, 0, 0], '2': [1, 0, 0], '5': [0, 1, 0], '25': [1, 1, 0], '3': [0, 0, 1] };
/* a 3D view of occupancy space: X right, Y depth, Z up */
function view(cx, cy, s, ang, tilt = 0.42) {
  return (X, Y, Z) => { let p = [(X - 0.5) * s, -(Z - 0.35) * s, (Y - 0.5) * s]; p = rotY(p, ang); p = rotX(p, tilt); return proj(p, cx, cy, 1400, 1400); };
}
function pyramid(v, a, o = {}) {
  if (a <= 0) return;
  const P = {}; Object.keys(OCC).forEach(k => P[k] = v(...OCC[k]));
  /* faces */
  if (o.fill !== false) {
    const faces = [['0', '2', '25', '5'], ['0', '2', '3'], ['2', '25', '3'], ['25', '5', '3'], ['5', '0', '3']];
    faces.forEach((f, i) => { ctx.globalAlpha = a * (i === 0 ? 0.10 : 0.07); ctx.fillStyle = i === 0 ? C.cyan : C.vio; ctx.beginPath(); f.forEach((k, j) => j ? ctx.lineTo(P[k][0], P[k][1]) : ctx.moveTo(P[k][0], P[k][1])); ctx.closePath(); ctx.fill(); });
    ctx.globalAlpha = 1;
  }
  const edges = [['0', '2'], ['2', '25'], ['25', '5'], ['5', '0'], ['0', '3'], ['2', '3'], ['5', '3'], ['25', '3']];
  edges.forEach(([p, q], i) => line(P[p][0], P[p][1], P[q][0], P[q][1], i < 4 ? C.cyan : C.vio, a * clamp((o.grow === undefined ? 1 : o.grow) * 8 - i), 2.5));
  if (o.dots !== false) Object.keys(OCC).forEach(k => { dot(P[k][0], P[k][1], o.r || 26, PN[k], a); if (o.labels !== false) txt(PL[k], P[k][0], P[k][1] - (o.r || 26) - 12, { size: o.ls || 26, fam: F.mono, w: 700, align: 'center', c: PC[k], a }); });
  return P;
}
/* Fibonacci word leaves of T_n (a = alpha, b = beta) */
function leavesT(n) { if (n === 0) return ['a']; if (n === 1) return ['b']; return leavesT(n - 1).concat(leavesT(n - 2)); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  txt('α → β        β → ⟨β, α⟩', W / 2, 230, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.gold, a: clamp(u / 1.2), ab: 1 });
  const rows = P(S, 0, 3, 9) * 7;
  for (let n = 0; n < 7; n++) {
    const q = clamp(rows - n); if (q <= 0) continue;
    const L = leavesT(n), y = 320 + n * 72, s = 34;
    txt('T' + n, 260, y + 10, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.dim, a: q });
    L.forEach((c, i) => dot(300 + i * (s + 8) + s / 2, y, 15, c === 'a' ? 'c' : 'm', q * clamp(q * L.length - i)));
    const na = L.filter(c => c === 'a').length, nb = L.length - na, w8 = 2 * na + 3 * nb;
    const qq = P(S, 1, 0.5 + n * 0.7);
    if (qq > 0) txt('2·' + na + ' + 3·' + nb + ' = ' + w8, 1540, y + 10, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.white, a: qq });
    if (qq > 0) txt(String(w8), 1680, y + 12, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: qq });
  }
  txt('α', 1760, 330, { size: 26, fam: F.mono, c: C.cyan, a: clamp(u) }); txt('β', 1760, 380, { size: 26, fam: F.mono, c: C.mag, a: clamp(u) });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  pyramid(view(W / 2, 360, 280, t * 0.4), rp, { grow: clamp(u / 1.5), r: 20, ls: 22 });
  txt(scramble('AURIC FIB ATOM PYRAMID', rp, 301), W / 2, 690, { size: 82, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('F I B 原 子 金 字 塔 · 三 个 邻 居 · 一 条 禁 令', W / 2, 765, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 030 · AURIC_FIB_ATOM_PYRAMID_*', W / 2, 115, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['pyramid frozen in Lean', C.green], ['4 theory volumes', C.orange], ['numbers recomputed', C.cyan]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 470, 860, 430, 60, s, col, P(S, 1, 0.5 + i * 1.2), 24));
};

/* ---- 02 POSITIONS ---- */
SCENES.positions = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const xs = [560, 960, 1360], labs = [['2', 'low', C.cyan], ['3', 'middle', C.gold], ['5', 'high', C.mag]];
  labs.forEach(([v, l, col], i) => { cellv(xs[i] - 80, 300, 160, v, col, clamp(u), 'rgba(0,0,0,0.55)', 0.5); txt(l, xs[i], 500, { size: 24, fam: F.mono, align: 'center', c: C.dim, a: clamp(u) }); });
  const qr = P(S, 0, 5);
  [[0, 1], [1, 2]].forEach(([i, j]) => { const xm = (xs[i] + xs[j]) / 2; ctx.globalAlpha = qr; ctx.strokeStyle = C.red; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(xm, 300, (xs[j] - xs[i]) / 2 - 10, 70, 0, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); ctx.globalAlpha = 1; txt('✗', xm, 262, { size: 40, fam: F.mono, w: 900, align: 'center', c: C.red, a: qr }); });
  const qg = P(S, 0, 10) * (1 - at(S, 1, 0.6));
  if (qg > 0) { ctx.globalAlpha = qg; ctx.strokeStyle = C.green; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(960, 470, 400, Math.PI * 0.15, Math.PI * 0.85); ctx.stroke(); ctx.globalAlpha = 1; txt('2 + 5 = 7 ✓', 960, 900 - 50, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.green, a: qg }); }
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const pats = [['000', '∅', 0], ['100', '2', 2], ['010', '3', 3], ['001', '5', 5], ['101', '2+5', 7]];
    pats.forEach(([b, n, v], i) => { const x = 330 + i * 315, qq = P(S, 1, 0.5 + i * 0.8); box(x - 130, 580, 260, 150, PC[['0', '2', '3', '5', '25'][i]], qq, 2, 'rgba(0,0,0,0.55)'); txt(b, x, 640, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: qq, ls: 6 }); txt(n + '  →  ' + v, x, 700, { size: 26, fam: F.mono, w: 700, align: 'center', c: PC[['0', '2', '3', '5', '25'][i]], a: qq }); });
  }
  thm('AdmissibleCount.admissibleWord_card_eq_fib · no two neighbouring positions chosen', W / 2, 880, P(S, 0, 2) * (1 - P(S, 1, 0)), 'center');
};

/* ---- 03 PYRAMID ---- */
SCENES.pyramid = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const v = view(700, 470, 380, -0.6 + t * 0.25);
  const g = P(S, 0, 6, 4);
  const Pp = pyramid(v, clamp(u), { grow: g, fill: g > 0.9 });
  const ax = P(S, 0, 1);
  if (ax > 0) { const o = v(0, 0, 0); [[1.25, 0, 0, '2'], [0, 1.25, 0, '5'], [0, 0, 1.25, '3']].forEach(([X, Y, Z, l]) => { const e = v(X, Y, Z); line(o[0], o[1], e[0], e[1], C.dim, ax * 0.6, 1.5); txt(l, e[0], e[1] - 8, { size: 22, fam: F.mono, c: C.dim, a: ax, align: 'center' }); }); }
  const q = P(S, 1, 0.3);
  if (q > 0) {
    [['volume = 1/3', C.cyan], ['surface = 2 + √2', C.mag], ['V − E + F = 5 − 8 + 5 = 2', C.gold], ['X, Y, Z ≥ 0 · X+Z ≤ 1 · Y+Z ≤ 1', C.white]].forEach(([s, col], i) => chip(1450, 300 + i * 100, 640, 64, s, col, P(S, 1, 2 + i * 1.3), 24));
    stamp('FROZEN', 1450, 760, P(S, 1, 3), C.green, 44, -0.04);
  }
  thm('PathStableSetPolytope.convexHull_three_pyramid', W / 2, 880, P(S, 1, 1), 'center');
};

/* ---- 04 LATTICE ---- */
const GEOM = [1, 5, 14, 30, 55, 91], FULL = [1, 5, 15, 35, 70, 126];
SCENES.lattice = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  /* cannonball stack: layers k = 1..5 squares of side k, apex on top */
  const m = Math.min(4, Math.floor(P(S, 0, 1, 8) * 4.99));
  const v = view(560, 520, 380, -0.65 + t * 0.15);
  for (let W0 = 0; W0 <= m; W0++) { const side = m - W0; for (let U = 0; U <= side; U++) for (let V = 0; V <= side; V++) { const p = v(m ? U / m : 0, m ? V / m : 0, m ? W0 / m : 0); dot(p[0], p[1], 14 - m, W0 === m ? 'g' : ['c', 'm', 'v', 'n'][W0 % 4], clamp(u)); } }
  txt('m = ' + m, 560, 850, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: clamp(u) });
  GEOM.forEach((g, i) => { const q = P(S, 0, 1 + i * 1.4); cellv(1080 + i * 130, 300, 110, g, C.cyan, q, 'rgba(0,0,0,0.55)', 0.36); });
  txt('visible points = 1² + 2² + … + (m+1)²', 1405, 270, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 1) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    FULL.forEach((g, i) => cellv(1080 + i * 130, 520, 110, g, C.orange, P(S, 1, 0.5 + i * 0.6), 'rgba(0,0,0,0.55)', 0.36));
    txt('full configurations C(m+4, 4)', 1405, 490, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: q });
    chip(1405, 740, 740, 70, 't∅ · t₂₅ = t₂ · t₅', C.gold, P(S, 1, 6), 34);
  }
};

/* ---- 05 BLIND ---- */
SCENES.blind = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  /* 4-simplex as K5 */
  const keys = ['0', '2', '3', '5', '25'], cx = 380, cy = 460, R = 210;
  const pos = keys.map((k, i) => [cx + R * Math.cos(-Math.PI / 2 + i * TAU / 5), cy + R * Math.sin(-Math.PI / 2 + i * TAU / 5)]);
  const s0 = clamp(u);
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) line(pos[i][0], pos[i][1], pos[j][0], pos[j][1], C.dim, s0 * 0.5, 1.5);
  keys.forEach((k, i) => { dot(pos[i][0], pos[i][1], 24, PN[k], s0); txt(PL[k], pos[i][0], pos[i][1] - 34, { size: 24, fam: F.mono, w: 700, align: 'center', c: PC[k], a: s0 }); });
  txt('full law · 4D', cx, 740, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  arrow(650, 460, 800, 460, C.white, s0, 3); txt('average', 725, 440, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: s0 });
  const v = view(1250, 470, 400, -0.55 + t * 0.12);
  const Pp = pyramid(v, s0, { r: 22, ls: 22 });
  const q1 = P(S, 0, 7);
  if (q1 > 0) {
    line(Pp['0'][0], Pp['0'][1], Pp['25'][0], Pp['25'][1], C.green, q1, 4);
    line(Pp['2'][0], Pp['2'][1], Pp['5'][0], Pp['5'][1], C.red, P(S, 0, 9), 4);
    const m = v(0.5, 0.5, 0); dot(m[0], m[1], 22, 'w', q1);
    chip(1250, 790, 820, 60, '½∅ + ½(2+5)  =  ½·2 + ½·5  ↦  (½, ½, 0)', C.gold, P(S, 0, 10), 22);
  }
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const kap = 0.5 + 0.5 * Math.sin(t * 1.4);
    box(220, 800, 420, 24, C.dim, q, 1.5); fillBox(220 + kap * 400, 800, 20, 24, C.gold, q);
    txt('κ = P(both ends) slides in [max(0, X+Y−r), min(X, Y)]', 430, 860, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
    txt('width = 0 only on the four triangular faces', 430, 780, { size: 20, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 4) });
  }
};

/* ---- 06 DETERMINANT ---- */
SCENES.determinant = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  const cells = [['p∅', '0'], ['p₅', '5'], ['p₂', '2'], ['p₂₊₅', '25']];
  cells.forEach(([l, k], i) => { const x = 260 + (i % 2) * 190, y = 280 + Math.floor(i / 2) * 190; box(x, y, 170, 170, PC[k], s0, 2.5, 'rgba(0,0,0,0.5)'); txt(l, x + 85, y + 100, { size: 34, fam: F.mono, w: 700, align: 'center', c: PC[k], a: s0 }); });
  txt('x = 0', 220, 375, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: s0 }); txt('x = 1', 220, 565, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: s0 });
  txt('y = 0', 345, 260, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: s0 }); txt('y = 1', 535, 260, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: s0 });
  const q0 = P(S, 0, 3);
  txt('Δ = p∅·p₂₊₅ − p₂·p₅', 450, 730, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q0 });
  txt('= r·κ − X·Y', 450, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) });
  /* slices of pyramid with budget squares */
  const q = P(S, 1, 0.3);
  const v = view(1330, 560, 360, -0.6 + t * 0.12, 0.5);
  pyramid(v, s0, { r: 18, ls: 20, fill: false });
  if (q > 0) {
    [0.15, 0.4, 0.65, 0.88].forEach((h, i) => { const r = 1 - h, qq = P(S, 1, 0.5 + i); const c = [v(0, 0, h), v(r, 0, h), v(r, r, h), v(0, r, h)]; ctx.globalAlpha = qq * 0.35; ctx.fillStyle = C.gold; ctx.beginPath(); c.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; txt('r²/4 = ' + (r * r / 4).toFixed(3), c[1][0] + 30, c[1][1] + 6, { size: 18, fam: F.mono, w: 700, c: C.gold, a: qq }); });
    chip(1330, 830, 560, 64, '|Δ| ≤ r² / 4', C.gold, P(S, 1, 2), 34);
  }
};

/* ---- 07 GLUING ---- */
SCENES.gluing = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), sl = P(S, 0, 4, 3);
  const tri = (pts, keys, col, lab, skip) => { ctx.globalAlpha = s0 * 0.15; ctx.fillStyle = col; ctx.beginPath(); pts.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; for (let i = 0; i < 3; i++) line(pts[i][0], pts[i][1], pts[(i + 1) % 3][0], pts[(i + 1) % 3][1], col, s0, 2.5); keys.forEach((k, i) => { if (skip && skip.includes(k)) return; dot(pts[i][0], pts[i][1], 22, PN[k], s0); txt(PL[k], pts[i][0], pts[i][1] + (k === '3' ? -34 : 50), { size: 24, fam: F.mono, w: 700, align: 'center', c: PC[k], a: s0 }); }); txt(lab, (pts[0][0] + pts[1][0]) / 2, 690, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: s0 }); };
  const cl = 960 - (1 - sl) * 220, cr = 960 + (1 - sl) * 220;
  tri([[cl - 330, 600], [cl, 600], [cl, 290]], ['2', '0', '3'], C.cyan, 'low + middle');
  tri([[cr, 600], [cr + 330, 600], [cr, 290]], ['0', '5', '3'], C.mag, 'high + middle', sl >= 1 ? ['0', '3'] : null);
  if (sl >= 1) txt('shared edge ∅ — 3', 1180, 330, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 7) });
  chip(960, 760, 900, 60, 'product completion = unique maximum entropy', C.green, P(S, 0, 9), 24);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(560, 850, 520, 60, 'uniform:  Δ = 0', C.cyan, q, 28);
    chip(1360, 850, 620, 60, 'but  Cov(x, y) = 1/25', C.red, P(S, 1, 3), 28);
  }
};

/* ---- 08 CONTINUATION ---- */
SCENES.continuation = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const rows = [['0', 0, 'even', '5'], ['2', 2, 'even', '⊥'], ['3', 3, 'odd', '18'], ['5', 5, 'odd', '26'], ['25', 7, 'odd', '⊥']];
  const heads = ['first window', 'total', 'archive', 'then [5]'], hx = [250, 470, 650, 860];
  const s0 = clamp(u) * (1 - P(S, 1, 0) * 0.3);
  heads.forEach((h, j) => txt(h, hx[j], 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 }));
  rows.forEach(([k, tot, par, rep], i) => { const y = 310 + i * 76, q = s0 * P(S, 0, 1 + i * 1.2); txt(PL[k], hx[0], y, { size: 30, fam: F.mono, w: 700, align: 'center', c: PC[k], a: q }); txt(String(tot), hx[1], y, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(par, hx[2], y, { size: 26, fam: F.mono, align: 'center', c: par === 'odd' ? C.gold : C.dim, a: q }); txt(rep, hx[3], y, { size: 30, fam: F.mono, w: 700, align: 'center', c: rep === '⊥' ? C.red : C.green, a: q }); });
  txt('⊥ = rejected: a 2 below the seam forbids the 5', 550, 720, { size: 20, fam: F.mono, align: 'center', c: C.red, a: P(S, 0, 9) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('same point (2/5, 2/5, 1/5) · same side views · P(odd) = 3/5', 1400, 270, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    [['p⁻', 1 / 6, '1/6', C.cyan], ['p⁺', 1 / 2, '1/2', C.mag], ['product', 1 / 3, '1/3', C.orange]].forEach(([l, val, s0, col], i) => { const x = 1180 + i * 220, h = 420 * val * P(S, 1, 2 + i * 1.5), base = 760; fillBox(x - 60, base - h, 120, h, col, 0.85); txt(s0, x, base - h - 16, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2 + i * 1.5) }); txt(l, x, base + 36, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
    txt('P(⊥ | odd)', 1400, 840, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
  }
};

/* ---- 09 COUNTS ---- */
SCENES.counts = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const seqs = [['full configurations', [1, 5, 15, 35, 70], C.orange], ['visible points', [1, 5, 14, 30, 55], C.cyan], ['window histories', [1, 5, 21, 89, 377], C.green]];
  seqs.forEach(([l, a, col], i) => { const y = 280 + i * 170; txt(l, 300, y + 60, { size: 26, fam: F.mono, w: 700, align: 'right', c: col, a: P(S, 0, 0.5 + i * 2) }); a.forEach((v0, j) => cellv(360 + j * 170, y, 140, v0, col, P(S, 0, 1 + i * 2 + j * 0.3), 'rgba(0,0,0,0.55)', 0.3)); });
  const q = P(S, 1, 0.3);
  if (q > 0) { chip(1500, 650, 520, 64, 'F₂, F₅, F₈, F₁₁, F₁₄', C.green, q, 28); chip(1500, 740, 520, 64, 'a_L = F(3L + 2)', C.gold, P(S, 1, 2), 28); }
  thm('AdmissibleCount.admissibleWord_card_eq_fib : no-11 words of length m number F(m+2)', W / 2, 880, P(S, 1, 1), 'center');
};

/* ---- 10 FRACTAL ---- */
SCENES.fractal = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const x0 = 260, L = 1400 / (3 / 8);
  const depth = Math.min(8, Math.floor(P(S, 0, 1, 10) * 8.99));
  let iv = [[0, 3 / 8]];
  for (let d = 0; d <= depth; d++) {
    const y = 270 + d * 52, q = clamp(u);
    iv.forEach(([a, b]) => fillBox(x0 + a * L, y, Math.max(1.5, (b - a) * L), 22, d % 2 ? C.gold : C.cyan, q * 0.9));
    iv = iv.flatMap(([a, b]) => [[a / 3, b / 3], [1 / 3 + a / 9, 1 / 3 + b / 9]]);
  }
  txt('C = C/3  ∪  (1/3 + C/9)', W / 2, 760, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(W / 2, 830, 760, 64, 'dim = ln φ / ln 3 ≈ 0.438', C.green, q, 30);
    [['pyramid 3', C.cyan], ['full law 4', C.orange], ['addresses 0.438', C.green]].forEach(([s0, col], i) => chip(W / 2 + (i - 1) * 520, 220, 460, 54, s0, col, P(S, 1, 3 + i), 24));
  }
};

/* ---- 11 PRIMES ---- */
SCENES.primes = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  txt('ends: q | n , q | n+6      middle: q | n+2', W / 2, 250, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: s0 });
  const grid = (cx, H0, title, col) => {
    txt(title, cx, 320, { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a: s0 });
    H0.forEach((h, j) => txt('n+' + h, cx - 120 + j * 120, 370, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s0 }));
    for (let n = 0; n < 3; n++) { txt('n ≡ ' + n, cx - 240, 430 + n * 80, { size: 22, fam: F.mono, align: 'right', c: C.dim, a: s0 }); const qq = P(S, 0, 2 + n * 1.2); let hit = false; H0.forEach((h, j) => { const div = (n + h) % 3 === 0; if (div) hit = true; cellv(cx - 150 + j * 120, 400 + n * 80, 60, div ? '3|' : '·', div ? C.red : C.dim, qq, 'rgba(0,0,0,0.5)', 0.36); }); txt(hit ? '✗' : 'survives', cx + 240, 437 + n * 80, { size: 22, fam: F.mono, w: 700, c: hit ? C.red : C.green, a: qq }); }
  };
  grid(520, [0, 2, 6], '{0, 2, 6}', C.cyan);
  grid(1400, [0, 2, 4], '{0, 2, 4}', C.mag);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(520, 720, 560, 60, 'X = Y = Z = 1/3', C.white, q, 26); chip(1400, 720, 560, 60, 'X = Y = Z = 1/3', C.white, q, 26);
    chip(520, 800, 560, 60, 'κ = 1/3 · survive 1/3', C.green, P(S, 1, 3), 26); chip(1400, 800, 560, 60, 'κ = 0 · survive 0', C.red, P(S, 1, 3.5), 26);
  }
  thm('local factor: surviving fraction = 1 − ν_H(q)/q = p∅', W / 2, 880, P(S, 1, 5), 'center');
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['α → β, β → ⟨β,α⟩', C.cyan], ['no two neighbours', C.red], ['five corners', C.gold], ['one square relation', C.green]];
    items.forEach(([s0, col], i) => { const x = 330 + i * 420, q = P(S, 0, 0.5 + i * 1.2) * fade; box(x - 190, 300, 380, 110, col, q, 2, 'rgba(0,0,0,0.5)'); txt(s0, x, 365, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q }); if (i < 3) arrow(x + 195, 355, x + 225, 355, C.white, q, 2.5); });
    txt('v∅ + v₂₊₅ = v₂ + v₅', W / 2, 540, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) * fade });
    txt('shape frozen in Lean · the rest argued and recomputed', W / 2, 640, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 1) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    pyramid(view(W / 2, 400, 300, t * 0.4), ep * out, { r: 18, ls: 20 });
    txt('AURIC FIB ATOM PYRAMID', W / 2, 660, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('FIB 原子金字塔 · TRURETURING FILM 030', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Five corners, and one relation the pyramid forgets.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'TWO ATOMS', positions: 'THREE NEIGHBOURS', pyramid: 'THE PYRAMID', lattice: 'CANNONBALLS', blind: 'BLIND DIRECTION', determinant: 'DETERMINANT', gluing: 'TWO SIDE VIEWS', continuation: 'NATIVE READER', counts: 'THREE COUNTS', fractal: 'ADDRESS FRACTAL', primes: 'PRIME TRIPLES', finale: 'LEDGER' });

function poster30() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  pyramid(view(W / 2, 470, 360, -0.5), 1, { r: 26, ls: 28 });
  txt('FIB 原子金字塔', W / 2, 190, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID', W / 2, 870, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('三 个 邻 居 · 一 条 禁 令 · 五 个 角 · 一 条 遗 忘 的 关 系', W / 2, 945, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 030', W / 2, 1000, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster30;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
