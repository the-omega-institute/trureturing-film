/* Film 031 — AURIC FIB ATOM PYRAMID II · 金字塔 II：镜像与展开. Polar duality, vertex figures and directional blow-up of the FIB pyramid. */

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

/* ---- film 031 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN · RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    classic: ['CLASSICAL GEOMETRY · TEXTBOOK RESULT · RECOMPUTED', C.cyan, 'rgba(0,25,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
const PC = { '0': C.white, '2': C.cyan, '3': C.gold, '5': C.mag, '25': C.green };
const PN = { '0': 'c', '2': 'c', '3': 'g', '5': 'm', '25': 'n' };
const PL = { '0': '∅', '2': '2', '3': '3', '5': '5', '25': '2+5' };
const OCC = { '0': [0, 0, 0], '2': [1, 0, 0], '5': [0, 1, 0], '25': [1, 1, 0], '3': [0, 0, 1] };
function view(cx, cy, s, ang, tilt = 0.42) {
  return (X, Y, Z) => { let p = [(X - 0.5) * s, -(Z - 0.35) * s, (Y - 0.5) * s]; p = rotY(p, ang); p = rotX(p, tilt); return proj(p, cx, cy, 1400, 1400); };
}
function pyramid(v, a, o = {}) {
  if (a <= 0) return;
  const P = {}; Object.keys(OCC).forEach(k => P[k] = v(...OCC[k]));
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
function fillPoly(pts, col, a) { if (a <= 0 || !pts.length) return; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); pts.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
function strokePoly(pts, col, a, lw = 2.5, close = true) { if (a <= 0 || !pts.length) return; ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); if (close) ctx.closePath(); ctx.stroke(); ctx.globalAlpha = 1; }
function wedge(x, y, r, a0, a1, col, a, fa = 0.22, lw = 2) { if (a <= 0) return; ctx.globalAlpha = a * fa; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, a0, a1); ctx.closePath(); ctx.fill(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke(); ctx.globalAlpha = 1; }
function dashed(x1, y1, x2, y2, col, a, w = 2) { if (a <= 0) return; ctx.save(); ctx.setLineDash([8, 8]); line(x1, y1, x2, y2, col, a, w); ctx.restore(); }
/* calibrated coordinates (a, b, w) with w up */
function kview(cx, cy, s, ang, tilt = 0.42) { return (a, b, w) => { let p = [a * s, -w * s, b * s]; p = rotY(p, ang); p = rotX(p, tilt); return proj(p, cx, cy, 1400, 1400); }; }
const KV = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [0, 0, 1]];
const KK = ['0', '2', '25', '5', '3'];
const KF = [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];
const QV = [[0, 0, -1], [2, 0, 1], [0, 2, 1], [-2, 0, 1], [0, -2, 1]];
const QF = [[1, 2, 3, 4], [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1]];
const VERT2FACE = [3, 4, 1, 2, 0];       /* K vertex i  <->  polar face */
const LKV = KV.map(([a, b, w]) => [a + b, a - b, -w]);
function poly(v, V, Fc, a, o = {}) {
  if (a <= 0) return V.map(p => v(...p));
  const Pp = V.map(p => v(...p));
  Fc.forEach((f, i) => { const hi = o.hi && o.hi[i]; const fa = hi ? hi[1] : (o.fa == null ? 0.07 : o.fa); if (fa <= 0) return; fillPoly(f.map(k => Pp[k]), hi ? hi[0] : (o.fc || C.vio), a * fa); });
  const seen = {};
  Fc.forEach(f => f.forEach((k, j) => { const l = f[(j + 1) % f.length], key = Math.min(k, l) + '-' + Math.max(k, l); if (seen[key]) return; seen[key] = 1; line(Pp[k][0], Pp[k][1], Pp[l][0], Pp[l][1], o.ec || C.cyan, a * (o.ea || 1), o.lw || 2.5); }));
  if (o.dots) Pp.forEach((p, i) => dot(p[0], p[1], o.r || 14, o.dots[i] || 'c', a));
  return Pp;
}
/* Platonic solids */
function signs(p) { let out = [[]]; p.forEach(x => { out = out.flatMap(o => x === 0 ? [o.concat([0])] : [o.concat([x]), o.concat([-x])]); }); return out; }
function cyc(list) { const out = []; list.forEach(p => out.push(p, [p[1], p[2], p[0]], [p[2], p[0], p[1]])); return out; }
function mkSolid(V0) {
  const m = {}; let V = V0.filter(v => { const k = v.map(x => x.toFixed(4)).join(','); if (m[k]) return false; m[k] = 1; return true; });
  const n = Math.hypot(...V[0]); V = V.map(v => v.map(x => x / n));
  const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
  let md = 1e9; for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) md = Math.min(md, d(V[i], V[j]));
  const E = []; for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) if (d(V[i], V[j]) < md * 1.01) E.push([i, j]);
  return { V, E };
}
const SOLIDS = [
  ['tetrahedron', '{3,3}', mkSolid([[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]), C.gold],
  ['cube', '{4,3}', mkSolid(signs([1, 1, 1])), C.cyan],
  ['octahedron', '{3,4}', mkSolid(cyc(signs([1, 0, 0]))), C.cyan],
  ['dodecahedron', '{5,3}', mkSolid(signs([1, 1, 1]).concat(cyc(signs([0, 1 / PHI, PHI])))), C.mag],
  ['icosahedron', '{3,5}', mkSolid(cyc(signs([0, 1, PHI]))), C.mag]
];
function drawSolid(sol, cx, cy, R, ang, a, col) {
  if (a <= 0) return;
  const Q = sol.V.map(v => rotX(rotY(v, ang), 0.45));
  const Pp = Q.map(p => proj([p[0] * R, -p[1] * R, p[2] * R], cx, cy, 1400, 1400));
  sol.E.forEach(([i, j]) => { const z = (Q[i][2] + Q[j][2]) / 2; line(Pp[i][0], Pp[i][1], Pp[j][0], Pp[j][1], col, a * (0.3 + 0.7 * (1 - (z + 1) / 2)), 2.2); });
}
function regpts(cx, cy, R, n) { const pts = []; for (let k = 0; k < n; k++) { const an = -Math.PI / 2 + TAU * k / n; pts.push([cx + R * Math.cos(an), cy + R * Math.sin(an)]); } return pts; }
/* direction sphere: unit vector (X, Y, Z) of occupancy space */
function sphereAt(cx, cy, R, ang, tilt = 0.42) { return (X, Y, Z) => { let p = [X, -Z, Y]; p = rotY(p, ang); p = rotX(p, tilt); return [cx + p[0] * R, cy + p[1] * R, p[2]]; }; }
function sphereFrame(cx, cy, R, a) { ring(cx, cy, R, C.dim, a * 0.8, 1.5); ctx.globalAlpha = a * 0.35; ctx.strokeStyle = C.dim; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.4, 0, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.4, R, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
const nUV = (u, v) => { const L = Math.hypot(u, v, 1); return [u / L, v / L, -1 / L]; };
function squareLoop(n = 24) { const pts = []; for (let i = 0; i < n; i++) pts.push([i / n, 0]); for (let i = 0; i < n; i++) pts.push([1, i / n]); for (let i = 0; i < n; i++) pts.push([1 - i / n, 1]); for (let i = 0; i < n; i++) pts.push([0, 1 - i / n]); return pts; }
const FIBS = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const m = ease(P(S, 1, 0, 1.6));
  const cx = W / 2 - m * 330;
  const v = view(cx, 540, 340 - m * 40, -0.6 + t * 0.25);
  const Pp = pyramid(v, clamp(u), { grow: P(S, 0, 0.5, 4), r: 24, ls: 24 });
  thm('PathStableSetPolytope.convexHull_three_pyramid  ·  X, Y, Z ≥ 0 · X + Z ≤ 1 · Y + Z ≤ 1', W / 2, 880, P(S, 0, 3) * (1 - m), 'center');
  stamp('FROZEN', 1500, 760, P(S, 0, 6) * (1 - m), C.green, 44, -0.04);
  if (m > 0) {
    const g = P(S, 1, 0.8, 1.2);
    for (let i = 0; i < 6; i++) line(960, 220, 960, 780, i % 2 ? C.cyan : C.white, g * (0.15 + 0.1 * i), 9 - i * 1.5);
    txt('MIRROR', 960, 205, { size: 22, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: g, ls: 6 });
    poly(kview(1330, 500, 85, 0.6 - t * 0.25), QV, QF, P(S, 1, 2, 1.2) * 0.55, { ec: C.gold, fc: C.gold, fa: 0.05 });
    txt('?', 1330, 300, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 2.5) });
    const q = P(S, 1, 4.5, 1);
    if (q > 0 && Pp) { const ap = Pp['3']; ring(ap[0], ap[1], 70, C.mag, q, 5); line(ap[0] + 50, ap[1] + 50, ap[0] + 130, ap[1] + 130, C.mag, q, 9); txt('blow-up', ap[0] + 150, ap[1] + 160, { size: 24, fam: F.mono, w: 700, c: C.mag, a: q }); }
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  poly(kview(660, 370, 110, -0.5 + t * 0.35), KV, KF, rp, { ec: C.cyan, dots: ['c', 'c', 'n', 'm', 'g'], r: 14 });
  poly(kview(1260, 370, 80, 0.5 - t * 0.35), QV, QF, rp, { ec: C.gold, fc: C.gold, dots: ['g', 'm', 'm', 'm', 'm'], r: 12 });
  txt('↔', 960, 390, { size: 60, fam: F.mono, w: 700, align: 'center', c: C.white, a: rp });
  txt(scramble('AURIC FIB ATOM PYRAMID II', rp, 311), W / 2, 690, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('金 字 塔 II · 镜 像 与 展 开', W / 2, 765, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 031 · AURIC_FIB_ATOM_DUALITY_AND_DIRECTIONAL_EXPANSION', W / 2, 115, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['duality: point ↔ face', C.gold], ['blow-up: point → directions', C.mag], ['numbers recomputed', C.cyan]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 520, 860, 480, 60, s, col, P(S, 1, 0.3 + i * 1.2), 24));
};

/* ---- 02 ANGLES ---- */
SCENES.angles = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'classic');
  txt('α = (n − 2)π / n', 640, 230, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 0.5) });
  txt('β = 2π / n', 1280, 230, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 4) });
  const cls = n => n === 3 ? C.cyan : n === 4 ? C.green : C.mag;
  const hl = P(S, 1, 0.3);
  for (let n = 3; n <= 8; n++) {
    const i = n - 3, cx = 260 + i * 280, cy = 420, R = 95, q = P(S, 0, 1 + i * 0.4);
    if (q <= 0) continue;
    const pts = regpts(cx, cy, R, n);
    fillPoly(pts, cls(n), q * (0.05 + 0.12 * hl));
    strokePoly(pts, hl > 0 ? cls(n) : C.white, q, 2.5);
    const v0 = pts[0], v1 = pts[1], vn = pts[n - 1];
    const a1 = Math.atan2(v1[1] - v0[1], v1[0] - v0[0]), a2 = Math.atan2(vn[1] - v0[1], vn[0] - v0[0]);
    wedge(v0[0], v0[1], 34, a1, a2, C.gold, q * P(S, 0, 2), 0.35);
    const e = Math.atan2(v0[1] - vn[1], v0[0] - vn[0]);
    const qb = P(S, 0, 4.5);
    dashed(v0[0], v0[1], v0[0] + 75 * Math.cos(e), v0[1] + 75 * Math.sin(e), C.cyan, q * qb, 2);
    wedge(v0[0], v0[1], 52, e, a1, C.cyan, q * qb, 0.25);
    const al = Math.round(180 * (n - 2) / n * 10) / 10, be = Math.round(360 / n * 10) / 10;
    txt('n = ' + n, cx, cy + 150, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt(al + '°', cx - 45, cy + 190, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q * P(S, 0, 2) });
    txt(be + '°', cx + 50, cy + 190, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q * qb });
  }
  /* walker on a pentagon-sized path below */
  {
    chip(W / 2, 700, 640, 64, 'α + β = π      n · β = 2π', C.white, P(S, 0, 10) * (1 - hl), 32);
  }
  if (hl > 0) {
    chip(W / 2 - 520, 720, 420, 64, 'n = 3 · acute', C.cyan, P(S, 1, 0.5), 30);
    chip(W / 2, 720, 420, 64, 'n = 4 · right', C.green, P(S, 1, 1.5), 30);
    chip(W / 2 + 520, 720, 420, 64, 'n ≥ 5 · obtuse', C.mag, P(S, 1, 2.5), 30);
    txt('α − π/2 = π(n − 4) / 2n', W / 2, 840, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
  }
};

/* ---- 03 WIDTH ---- */
SCENES.width = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'classic');
  const th1 = 90 + 55 * Math.sin(t * 0.8);
  let th = th1;
  const k2 = lineAt(S, 1).s;
  if (u > k2) { const g = ease(P(S, 1, 2.5, 2)); th = lerp(th1, 90, g); const g2 = ease(P(S, 1, 6.5, 1.5)); th = lerp(th, 108, g2); }
  const T = th * Math.PI / 180, cx = 720, cy = 500, s0 = clamp(u);
  wedge(cx, cy, 300, -T / 2, T / 2, C.gold, s0, 0.25, 3);
  [[-T / 2], [T / 2]].forEach(([an]) => line(cx, cy, cx + 300 * Math.cos(an), cy + 300 * Math.sin(an), C.gold, s0, 3));
  const N0 = Math.PI / 2 + T / 2, N1 = 3 * Math.PI / 2 - T / 2;
  const qn = P(S, 0, 5);
  wedge(cx, cy, 240, N0, N1, C.cyan, qn, 0.25, 3);
  [N0, N1].forEach(an => line(cx, cy, cx + 240 * Math.cos(an), cy + 240 * Math.sin(an), C.cyan, qn, 3));
  /* right-angle marks between the boundary rays */
  [[T / 2, N0], [-T / 2, N1 - TAU]].forEach(([a0, a1]) => { const r = 34; const p1 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p2 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)], pc = [cx + r * (Math.cos(a0) + Math.cos(a1)), cy + r * (Math.sin(a0) + Math.sin(a1))]; strokePoly([p1, pc, p2], C.white, qn * 0.8, 1.5, false); });
  dot(cx, cy, 16, 'w', s0);
  txt('enter', cx + 330, cy + 10, { size: 26, fam: F.mono, w: 700, c: C.gold, a: s0 });
  txt('press', cx - 330, cy + 10, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: qn });
  /* readouts */
  txt('θ = ' + th.toFixed(1) + '°', 1450, 330, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.gold, a: s0 });
  txt('π − θ = ' + (180 - th).toFixed(1) + '°', 1450, 400, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: qn });
  /* fold diagram 0..180 */
  const x0 = 1180, x1 = 1720, y = 500, X = d => x0 + (x1 - x0) * d / 180;
  line(x0, y, x1, y, C.dim, s0, 2);
  [0, 90, 180].forEach(d => { line(X(d), y - 10, X(d), y + 10, d === 90 ? C.green : C.dim, s0, 2); txt(d + '°', X(d), y + 40, { size: 20, fam: F.mono, align: 'center', c: d === 90 ? C.green : C.dim, a: s0 }); });
  dot(X(th), y, 14, 'g', s0); dot(X(180 - th), y, 14, 'c', qn);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(1450, 600, 520, 60, '𝒟(θ) = π − θ ,  𝒟² = id', C.white, q, 26);
    chip(1450, 680, 520, 60, 'fixed:  θ = π/2 only', C.green, P(S, 1, 3), 26);
    chip(1450, 760, 520, 60, 'pentagon:  108° ↔ 72°', C.mag, P(S, 1, 7), 26);
  }
  const q2 = P(S, 1, 9);
  if (q2 > 0) {
    txt('(m − 2)(n − 2) = 4', 720, 820, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q2 });
    const mini = (x, n, col) => strokePoly(regpts(x, 870, 26, n), col, q2, 2);
    mini(470, 3, C.cyan); txt('+', 520, 880, { size: 30, fam: F.mono, align: 'center', c: C.white, a: q2 }); mini(570, 6, C.cyan);
    mini(870, 4, C.green); txt('+', 920, 880, { size: 30, fam: F.mono, align: 'center', c: C.white, a: q2 }); mini(970, 4, C.green);
  }
};

/* ---- 04 SCHLAFLI ---- */
SCENES.schlafli = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'classic');
  const fade = 1 - 0.45 * P(S, 1, 0, 1.5);
  SOLIDS.forEach(([nm, pq, sol, col], i) => {
    const q = P(S, 0, 4 + i * 1.6) * fade, cx = 300 + i * 330;
    drawSolid(sol, cx, 300, 100, t * 0.5 + i, q, col);
    txt(nm, cx, 440, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q });
    txt(pq, cx, 475, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q });
  });
  txt('{p, q}* = {q, p}', W / 2, 200, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) * fade });
  txt('↻ self', 300, 510, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) * fade });
  txt('↔', 795, 475, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 8) * fade });
  txt('↔', 1455, 475, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 10) * fade });
  const q = P(S, 1, 0.5);
  if (q > 0) {
    const cs = 52, x0 = 470, y0 = 560;
    for (let p = 3; p <= 8; p++) {
      txt('p=' + p, x0 - 12, y0 + (p - 3) * cs + cs * 0.62, { size: 18, fam: F.mono, align: 'right', c: C.dim, a: q });
      for (let qq = 3; qq <= 8; qq++) {
        const k = (p - 2) * (qq - 2), col = k < 4 ? C.green : k === 4 ? C.gold : C.vio;
        const qa = q * P(S, 1, k < 4 ? 2.5 : k === 4 ? 8 : 11, 0.8);
        if (p === 3) txt('q=' + qq, x0 + (qq - 3) * cs + cs / 2, y0 - 8, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q });
        box(x0 + (qq - 3) * cs + 2, y0 + (p - 3) * cs + 2, cs - 4, cs - 4, col, qa * 0.9, 1.5, rgba(col, 0.18 * qa));
        txt(String(k), x0 + (qq - 3) * cs + cs / 2, y0 + (p - 3) * cs + cs * 0.64, { size: 18, fam: F.mono, w: 700, align: 'center', c: col, a: qa });
      }
    }
    chip(1270, 600, 640, 58, '(p−2)(q−2) < 4 → sphere · 5 solids', C.green, P(S, 1, 2.5), 22);
    chip(1270, 680, 640, 58, '(p−2)(q−2) = 4 → flat plane', C.gold, P(S, 1, 8), 22);
    chip(1270, 760, 640, 58, '(p−2)(q−2) > 4 → hyperbolic plane', C.vio, P(S, 1, 11), 22);
    txt('{3, 7}: corner angle 2π/7 ≈ 51.4°', 1270, 840, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 1, 13) });
  }
};

/* ---- 05 MIRROR ---- */
SCENES.mirror = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), ang = -0.5 + t * 0.2;
  const v = view(300, 500, 250, ang);
  const Pp = pyramid(v, s0, { r: 16, ls: 20 });
  const qc = P(S, 0, 3);
  if (qc > 0) { const c = v(0.25, 0.25, 0.5); dot(c[0], c[1], 16, 'w', qc); txt('c₀ = (¼, ¼, ½)', 300, 830, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: qc }); }
  const qa = P(S, 0, 5);
  arrow(470, 500, 600, 500, C.white, qa, 3);
  txt('B(P − c₀)', 535, 480, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: qa });
  const kv = kview(840, 500, 120, ang);
  const Kp = poly(kv, KV, KF, qa, { ec: C.cyan, dots: ['c', 'c', 'n', 'm', 'g'], r: 13 });
  if (qa > 0) { const o = kv(0, 0, 0); dot(o[0], o[1], 12, 'w', qa); txt('0', o[0] + 18, o[1] + 6, { size: 20, fam: F.mono, c: C.white, a: qa }); }
  txt('(±1, ±1, −1)', 840, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 8) });
  txt('(0, 0, 1)', 840, 290, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 9.5) });
  const q = P(S, 1, 0.3, 1);
  if (q > 0) {
    const qv = kview(1440, 500, 105, ang);
    poly(qv, QV, QF, q, { ec: C.gold, fc: C.gold, fa: 0.06, dots: ['g', 'm', 'm', 'm', 'm'], r: 12 });
    txt('K° = { y : ⟨y, x⟩ ≤ 1 for every x in K }', 1440, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
    txt('(0, 0, −1)', 1440, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
    txt('(±2, 0, 1) · (0, ±2, 1)', 1440, 290, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 4) });
    txt('|ξ| + |η| ≤ 1 + ζ ,  −1 ≤ ζ ≤ 1', 1440, 810, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 5.5) });
    chip(1140, 830, 360, 54, '(K°)° = K', C.green, P(S, 1, 10.5), 28);
  }
};

/* ---- 06 SELFDUAL ---- */
SCENES.selfdual = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), ang = -0.5 + t * 0.2;
  const ph = u < lineAt(S, 0).s + 4.2 ? 0 : u < lineAt(S, 0).s + 7.6 ? 1 : 2;
  const fade = 1 - P(S, 1, 0, 1);
  const cornerCol = [C.white, C.cyan, C.green, C.mag];
  const hiK = [], hiQ = [], dK = ['c', 'c', 'n', 'm', 'g'], dQ = ['g', 'm', 'm', 'm', 'm'];
  if (ph === 0) { hiQ[0] = [C.gold, 0.45 * fade]; }
  if (ph === 1) { for (let i = 0; i < 4; i++) hiQ[VERT2FACE[i]] = [cornerCol[i], 0.4 * fade]; }
  if (ph === 2) { hiK[0] = [C.cyan, 0.4 * fade]; }
  const Kp = poly(kview(560, 480, 125, ang), KV, KF, s0, { ec: C.cyan, hi: hiK, dots: dK, r: ph === 0 ? 12 : 14 });
  const Qp = poly(kview(1360, 480, 100, ang), QV, QF, s0, { ec: C.gold, fc: C.gold, hi: hiQ, dots: dQ, r: 12 });
  if (ph === 0) { dot(Kp[4][0], Kp[4][1], 30, 'g', fade); }
  if (ph === 1) { for (let i = 0; i < 4; i++) ring(Kp[i][0], Kp[i][1], 24, cornerCol[i], fade, 4); }
  if (ph === 2) { dot(Qp[0][0], Qp[0][1], 30, 'c', fade); }
  const lab = ['apex  ↔  diamond face', 'floor corner  ↔  triangle face', 'floor  ↔  bottom point'][ph];
  txt(lab, W / 2, 760, { size: 32, fam: F.mono, w: 700, align: 'center', c: [C.gold, C.white, C.cyan][ph], a: P(S, 0, 0.5) * fade });
  txt('K', 560, 230, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: s0 });
  txt('K°', 1360, 230, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: s0 });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const m = ease(P(S, 1, 1, 3.5));
    const cx = lerp(560, 1360, m), sc = lerp(125, 100, m);
    const V = KV.map((p, i) => [lerp(p[0], LKV[i][0], m), lerp(p[1], LKV[i][1], m), lerp(p[2], LKV[i][2], m)]);
    poly(kview(cx, 480, sc, ang), V, KF, q * (1 - 0.6 * P(S, 1, 5, 1)), { ec: C.green, fa: 0, lw: 3.5 });
    txt('L(a, b, w) = (a + b, a − b, −w)', W / 2, 760, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.green, a: q });
    chip(500, 850, 420, 56, 'L(K) = K°', C.green, P(S, 1, 4.5), 26);
    chip(W / 2, 850, 460, 56, 'LᵀL = diag(2, 2, 1) ≠ I', C.red, P(S, 1, 7), 24);
    chip(1460, 850, 460, 56, 'vol 8/3  vs  16/3', C.gold, P(S, 1, 9), 26);
    stamp('SELF-DUAL', W / 2, 330, P(S, 1, 5.5), C.green, 40, -0.05);
  }
};

/* ---- 07 BLOWUP ---- */
SCENES.blowup = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'classic');
  const f1 = 1 - P(S, 1, 0, 1);
  if (f1 > 0) {
    dot(W / 2, 300, 18, 'w', P(S, 0, 0.3) * f1);
    txt('a bare point', W / 2, 250, { size: 24, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 0.3) * f1 });
    const q1 = P(S, 0, 6.5) * f1, q2 = P(S, 0, 8.3) * f1, q3 = P(S, 0, 10) * f1;
    line(150, 560, 550, 560, C.dim, q1, 2); dot(350, 560, 14, 'w', q1); arrow(350, 560, 470, 560, C.cyan, q1, 3); arrow(350, 560, 230, 560, C.mag, q1, 3);
    txt('line:  S⁰ = {−1, +1}', 350, 760, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q1 });
    for (let i = 0; i < 16; i++) { const an = TAU * i / 16; arrow(960, 560, 960 + 120 * Math.cos(an), 560 + 120 * Math.sin(an), `hsl(${i * 22.5},100%,65%)`, q2, 2.5); }
    ring(960, 560, 120, C.white, q2 * 0.6, 1.5); dot(960, 560, 14, 'w', q2);
    txt('plane:  S¹', 960, 760, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q2 });
    sphereFrame(1570, 560, 130, q3);
    for (let i = 0; i < 14; i++) { const z = 1 - 2 * (i + 0.5) / 14, r = Math.sqrt(1 - z * z), an = i * 2.4 + t * 0.4; const p = rotX([r * Math.cos(an), -z, r * Math.sin(an)], 0.4); arrow(1570, 560, 1570 + 125 * p[0], 560 + 125 * p[1], `hsl(${i * 25},100%,65%)`, q3 * (p[2] < 0 ? 1 : 0.35), 2.5); }
    dot(1570, 560, 14, 'w', q3);
    txt('space:  S²', 1570, 760, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q3 });
  }
  const q = P(S, 1, 0.5, 1);
  if (q > 0) {
    const cx = W / 2, cy = 470, Ro = 280;
    const open = 0.5 - 0.5 * Math.cos(Math.max(0, u - lineAt(S, 1).s - 1) * 0.9);
    const ri = 120 * (u < lineAt(S, 1).s + 7 ? clamp((u - lineAt(S, 1).s - 1) / 1.5) : open);
    for (let i = 0; i < 36; i++) {
      const an = TAU * i / 36, col = `hsl(${i * 10},100%,65%)`;
      line(cx + ri * Math.cos(an), cy + ri * Math.sin(an), cx + Ro * Math.cos(an), cy + Ro * Math.sin(an), col, q * 0.8, 2);
      for (let k = 1; k <= 3; k++) { const R = ri + (Ro - ri) * k / 4; dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 4, 'w', q * 0.6); }
    }
    ring(cx, cy, Math.max(ri, 1), C.gold, q, 4); if (ri < 4) dot(cx, cy, 14, 'g', q);
    txt('β(n, R) = p + R·n', cx, 820, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) });
    chip(330, 470, 460, 60, 'R > 0 : unchanged', C.cyan, P(S, 1, 3), 26);
    chip(1590, 470, 520, 60, 'R = 0 : all directions', C.gold, P(S, 1, 4), 26);
    txt('collapse → the point returns', cx, 880, { size: 24, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 7) });
  }
};

/* ---- 08 APEX ---- */
SCENES.apex = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const s0 = clamp(u), ang = -0.6 + 0.25 * Math.sin(t * 0.25);
  const v = view(560, 500, 400, ang);
  const Pp = pyramid(v, s0, { r: 18, ls: 22 });
  const eps = 0.28, h = 1 - eps;
  const sq = [[0, 0], [eps, 0], [eps, eps], [0, eps]].map(([X, Y]) => v(X, Y, h));
  const qs = P(S, 0, 4, 1);
  fillPoly(sq, C.gold, qs * 0.5); strokePoly(sq, C.gold, qs, 3);
  txt('slice: a square', 860, 330, { size: 24, fam: F.mono, w: 700, c: C.gold, a: qs });
  const sp = sphereAt(1400, 480, 240, ang, -1.1);
  const qp = P(S, 0, 7, 1);
  sphereFrame(1400, 480, 240, qp);
  const walls = P(S, 1, 9, 1);
  const loop = squareLoop(20).map(([a, b]) => sp(...nUV(a, b)));
  fillPoly(loop, C.gold, qp * 0.45 * (1 - walls));
  for (let i = 1; i < 4; i++) { const g1 = [], g2 = []; for (let j = 0; j <= 10; j++) { g1.push(sp(...nUV(i / 4, j / 10))); g2.push(sp(...nUV(j / 10, i / 4))); } strokePoly(g1, C.gold, qp * 0.5 * (1 - walls), 1.2, false); strokePoly(g2, C.gold, qp * 0.5 * (1 - walls), 1.2, false); }
  strokePoly(loop, walls > 0 ? C.mag : C.gold, qp, 2 + 4 * walls);
  const c0 = sp(0, 0, 0); dot(c0[0], c0[1], 10, 'w', qp);
  txt('arrival directions at the apex', 1400, 790, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: qp });
  txt('n(u, v) = (u, v, −1) / √(1 + u² + v²)', 1400, 840, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 0, 9) * (1 - walls) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const ap = v(0, 0, 1);
    for (let i = 0; i <= 4; i++) for (let j = 0; j <= 4; j++) { const qq = P(S, 1, 0.5 + (i * 5 + j) * 0.12, 0.4); const e = v(i / 4, j / 4, 0); line(ap[0], ap[1], e[0], e[1], C.green, q * qq * 0.55, 1.5); dot(e[0], e[1], 6, 'n', q * qq); }
    thm('convexHull_three_pyramid:  x = (1 − t)·(u, 0, v) + t·apex ,  t, u, v ∈ [0, 1]', 560, 880, P(S, 1, 2), 'center');
    stamp('FROZEN', 930, 240, P(S, 1, 4), C.green, 38, -0.04);
    txt('walls only → a loop ≅ S¹, with four corners', 1400, 840, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: walls });
  }
};

/* ---- 09 CORNERS ---- */
SCENES.corners = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), ang = -0.6 + t * 0.15;
  const v = view(520, 500, 400, ang);
  pyramid(v, s0, { r: 14, ls: 20 });
  const e = 0.28;
  const corners = [['0', [0, 0], [1, 0, 0], [0, 1, 0]], ['2', [1, 0], [-1, 0, 0], [0, 1, 0]], ['5', [0, 1], [1, 0, 0], [0, -1, 0]], ['25', [1, 1], [-1, 0, 0], [0, -1, 0]]];
  corners.forEach(([k, [a, b], e1, e2], i) => {
    const q = P(S, 0, 1 + i * 0.8, 0.8); const B0 = [a, b, 0], e3 = [-a, -b, 1];
    const tri = [e1, e2, e3].map(d => v(B0[0] + e * d[0], B0[1] + e * d[1], B0[2] + e * d[2]));
    fillPoly(tri, PC[k], q * 0.5); strokePoly(tri, PC[k], q, 3);
  });
  const sq = [[0, 0], [e, 0], [e, e], [0, e]].map(([X, Y]) => v(X, Y, 1 - e));
  fillPoly(sq, C.gold, s0 * 0.5); strokePoly(sq, C.gold, s0, 3);
  const f2 = 1 - P(S, 1, 0, 1);
  if (f2 > 0) {
    const draw = (x, y, sides, col, lab, q) => {
      const [p, qq, r] = sides; /* draw triangle with given side lengths */
      const L = 120; const A = [x - p * L / 2, y + 40], B = [x + p * L / 2, y + 40];
      const cx = (p * p + r * r - qq * qq) / (2 * p) * L, cy = Math.sqrt(Math.max(0, r * r * L * L - cx * cx));
      const Cc = [A[0] + cx, A[1] - cy];
      fillPoly([A, B, Cc], col, q * 0.25); strokePoly([A, B, Cc], col, q, 3);
      txt(lab, x, y + 90, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    };
    const R2 = Math.SQRT2, R3 = Math.sqrt(3);
    draw(1160, 330, [R2, R2, R2], PC['0'], '∅ : √2ε, √2ε, √2ε', P(S, 0, 3) * f2);
    draw(1560, 330, [R2, R2, R2], PC['25'], '2+5 : √2ε, √2ε, √2ε', P(S, 0, 4) * f2);
    draw(1160, 600, [R3, 1, R2], PC['2'], '2 : ε, √2ε, √3ε', P(S, 0, 6) * f2);
    draw(1560, 600, [R3, R2, 1], PC['5'], '5 : ε, √2ε, √3ε', P(S, 0, 7) * f2);
    chip(1360, 820, 560, 58, '2 equilateral · 2 right', C.white, P(S, 0, 8) * f2, 26);
  }
  const q = P(S, 1, 0.5, 1);
  if (q > 0) {
    const cornerCol = [PC['0'], PC['2'], PC['25'], PC['5']];
    const hi = []; hi[0] = [C.gold, 0.45]; for (let i = 0; i < 4; i++) hi[VERT2FACE[i]] = [cornerCol[i], 0.35];
    poly(kview(1400, 470, 100, -0.5 + t * 0.2), QV, QF, q, { ec: C.gold, hi });
    txt('polar faces: 1 quadrilateral + 4 triangles', 1400, 250, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 1) });
    const items = ['tangent cone', 'normal cone', 'face at height 1'];
    items.forEach((s, i) => { const x = 1000 + i * 330, qq = P(S, 1, 5 + i * 1.2); chip(x, 800, 300, 56, s, [C.gold, C.cyan, C.green][i], qq, 22); if (i < 2) arrow(x + 152, 800, x + 178, 800, C.white, P(S, 1, 6 + i * 1.2), 2.5); });
    txt('N(v) = T(v)⁻ ,  N(v) = cone(v◇)', 1330, 880, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 8.5) });
  }
};

/* ---- 10 FIBRE ---- */
SCENES.fibre = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), f1 = 1 - P(S, 1, 8, 1);
  const table = (x, vals, lab, k, col, q) => {
    const keys = [['0', '5'], ['2', '25']];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const kk = keys[i][j], val = vals[i][j]; box(x + j * 130, 300 + i * 130, 120, 120, PC[kk], q, 2, val ? rgba(PC[kk], 0.25) : 'rgba(0,0,0,0.5)'); txt(PL[kk], x + j * 130 + 60, 300 + i * 130 + 40, { size: 20, fam: F.mono, align: 'center', c: PC[kk], a: q }); txt(val ? '½' : '0', x + j * 130 + 60, 300 + i * 130 + 92, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); }
    txt(lab, x + 125, 280, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    txt(k, x + 125, 600, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q * P(S, 0, 8) });
  };
  table(170, [[1, 0], [0, 1]], 'q⁺', 'k = ½', C.green, P(S, 0, 1) * f1);
  table(520, [[0, 1], [1, 0]], 'q⁻', 'k = 0', C.red, P(S, 0, 3) * f1);
  txt('same u = v = ½', 520, 680, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 5) * f1 });
  /* pyramid with the ray to the floor centre */
  const v = view(1360, 515, 355, -0.6 + t * 0.12);
  pyramid(v, s0, { r: 16, ls: 20 });
  const ap = v(0, 0, 1), fc = v(0.5, 0.5, 0);
  line(ap[0], ap[1], fc[0], fc[1], C.gold, s0, 3);
  const k2 = lineAt(S, 1).s;
  const r = u < k2 ? 1 : 1 - 0.93 * (0.5 - 0.5 * Math.cos((u - k2) * 0.8));
  const pr = v(0.5 * r, 0.5 * r, 1 - r); dot(pr[0], pr[1], 18, 'w', s0);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('r = ' + r.toFixed(2), 880, 840, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    chip(1180, 830, 400, 54, 'Δ = ± r²/4 = ±' + (r * r / 4).toFixed(3), C.gold, P(S, 1, 1), 22);
    chip(1590, 830, 380, 54, 'k − uv = ± 1/4', C.green, P(S, 1, 2.5), 22);
    /* oscillating path drawn on the face Y = 0 */
    const qo = P(S, 1, 8.5, 1);
    if (qo > 0) {
      const pts = []; for (let i = 0; i <= 300; i++) { const rr = Math.pow(10, -7 * i / 300); const uu = (1 + Math.sin(Math.log(rr))) / 2; pts.push(v(rr * uu, 0, 1 - rr)); }
      strokePoly(pts, C.mag, qo, 2.5, false);
      const x0 = 160, x1 = 920, y0 = 560, y1 = 300;
      line(x0, y0, x1, y0, C.dim, qo, 1.5); line(x0, y0, x0, y1, C.dim, qo, 1.5);
      txt('log₁₀(1/r) →', x1, y0 + 40, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: qo });
      txt('u', x0 - 20, y1 + 10, { size: 22, fam: F.mono, align: 'right', c: C.dim, a: qo });
      const pr2 = P(S, 1, 9, 3);
      curve(s => { const L = 7 * s * pr2; const uu = (1 + Math.sin(-L * Math.LN10)) / 2; return [x0 + (x1 - x0) * L / 7, y0 + (y1 - y0) * uu]; }, 300, C.mag, qo, 3);
      txt('u(r) = (1 + sin log r) / 2  —  no limit as r → 0', 540, 640, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: qo });
    }
  }
};

/* ---- 11 SLACK ---- */
SCENES.slack = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), ang = -0.5 + t * 0.15;
  const settle = ease(P(S, 1, 0, 2));
  let X = 0.4 + 0.18 * Math.sin(t * 0.7), Y = 0.4 + 0.18 * Math.cos(t * 0.9), Z = 0.2 + 0.1 * Math.sin(t * 0.5);
  X = lerp(X, 0.4, settle); Y = lerp(Y, 0.4, settle); Z = lerp(Z, 0.2, settle);
  const kv = kview(470, 480, 150, ang);
  const hi = [[C.cyan, 0.04], [C.cyan, 0.12], [C.mag, 0.12], [C.green, 0.12], [C.gold, 0.12]];
  poly(kv, KV, KF, s0, { ec: C.cyan, hi });
  const z = [2 * X + Z - 1, 2 * Y + Z - 1, 2 * Z - 1], zp = kv(...z);
  dot(zp[0], zp[1], 18, 'w', s0); txt('z', zp[0] + 20, zp[1] - 14, { size: 24, fam: F.mono, w: 700, c: C.white, a: s0 });
  const sl = [4 * X, 4 * Y, 4 * (1 - X - Z), 4 * (1 - Y - Z)], mn = Math.min(...sl);
  const labs = ['s₁ = 4X', 's₂ = 4Y', 's₃ = 4(1−X−Z)', 's₄ = 4(1−Y−Z)'], cols = [C.cyan, C.gold, C.mag, C.green];
  sl.forEach((s, i) => { const x = 800 + i * 150, h = 90 * s * P(S, 0, 1 + i * 0.6), base = 620, isMin = Math.abs(s - mn) < 1e-9; fillBox(x - 50, base - h, 100, h, isMin ? C.red : cols[i], 0.75 * s0); txt(s.toFixed(2), x, base - h - 14, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1 + i * 0.6) }); txt(labs[i], x, base + 34, { size: 17, fam: F.mono, w: 700, align: 'center', c: cols[i], a: P(S, 0, 1 + i * 0.6) }); });
  chip(1610, 330, 440, 58, 'P(⊥) = s₁ / 4 = ' + X.toFixed(2), C.cyan, P(S, 0, 4), 22);
  chip(1610, 420, 440, 58, 'fibre width = min sᵢ / 4 = ' + (mn / 4).toFixed(2), C.red, P(S, 0, 10), 20);
  txt('[5] after one window: rejected iff the low position was set', 1230, 230, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 1) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('P = (2/5, 2/5, 1/5),  m = P(odd) = 3/5', 1230, 705, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    const x0 = 860, x1 = 1640, y = 825, Xs = f => x0 + (x1 - x0) * f;
    line(x0, y, x1, y, C.dim, q, 2);
    fillBox(Xs(0), y - 12, Xs(2 / 3) - Xs(0), 24, C.gold, 0.3 * P(S, 1, 2));
    [[0, '0'], [1 / 3, '1/3'], [2 / 3, '2/3'], [1, '1']].forEach(([f, s]) => { line(Xs(f), y - 16, Xs(f), y + 16, C.dim, q, 2); txt(s, Xs(f), y + 44, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q }); });
    dot(Xs(1 / 6), y, 14, 'c', P(S, 1, 3)); txt('1/6', Xs(1 / 6), y - 22, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3) });
    dot(Xs(1 / 2), y, 14, 'm', P(S, 1, 3.5)); txt('1/2', Xs(1 / 2), y - 22, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 3.5) });
    const qg = P(S, 1, 7.5);
    if (qg > 0) { line(Xs(1 / 3), y - 46, Xs(1 / 3), y - 14, C.gold, qg, 4); arrow(Xs(1 / 3), y - 60, Xs(0) + 4, y - 60, C.gold, qg, 2.5); arrow(Xs(1 / 3), y - 60, Xs(2 / 3) - 4, y - 60, C.gold, qg, 2.5); txt('best guess 1/3 · worst error 1/3 = min sᵢ / 8m', Xs(1 / 3) + 40, y - 76, { size: 20, fam: F.mono, w: 700, c: C.gold, a: qg }); }
    txt('P(⊥ | odd)', 760, y + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: q });
  }
};

/* ---- 12 BLANK ---- */
const BLANK = [['0', [0, 0, 0, 0]], ['2', [2, 8, 34, 144]], ['3', [3, 13, 55, 233]], ['5', [5, 21, 89, 377]], ['25', [7, 29, 123, 521]]];
SCENES.blank = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  const xs = [250, 410, 560, 720, 890, 1110];
  ['first', 'count', '+1 blank', '+2', '+3', 'probe (0,1)'].forEach((h, j) => txt(h, xs[j], 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: j === 5 ? C.green : C.dim, a: j < 3 ? s0 : j === 5 ? P(S, 1, 0.3) : P(S, 1, 6.5 + (j - 3) * 1.2) }));
  BLANK.forEach(([k, vals], i) => {
    const y = 320 + i * 82;
    txt(PL[k], xs[0], y, { size: 30, fam: F.mono, w: 700, align: 'center', c: PC[k], a: s0 });
    vals.forEach((val, j) => { const qa = j === 0 ? P(S, 0, 0.5) : j === 1 ? P(S, 0, 3 + i * 1.1) : P(S, 1, 6.5 + (j - 2) * 1.2); txt(String(val), xs[j + 1], y, { size: 30, fam: F.mono, w: 700, align: 'center', c: j === 0 ? C.white : (k === '25' ? C.orange : C.gold), a: qa }); });
    txt(String(vals[0]), xs[5], y, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 1.5 + i * 0.4) });
  });
  for (let j = 2; j <= 4; j++) arrow(xs[j - 1] + 40, 700, xs[j] - 40, 700, C.dim, j === 2 ? P(S, 0, 2) : P(S, 1, 6.5 + (j - 3) * 1.2), 2);
  txt('Fibonacci, three steps at a time', 560, 750, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 8) });
  txt('7, 29, 123, 521: Lucas numbers', 890, 790, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 10.5) });
  chip(1560, 330, 480, 62, 'S = M³ = [1 2; 2 3]', C.white, P(S, 0, 1), 26);
  chip(1560, 420, 480, 62, 'native row ℓ₀ = (2, 3)', C.gold, P(S, 0, 2), 26);
  chip(1560, 540, 480, 62, 'ℓ₁ = ℓ₀ S⁻¹ = (0, 1)', C.green, P(S, 1, 0.5), 26);
  chip(1560, 660, 480, 62, "c′ = A c ,  ℓ′ = ℓ A⁻¹", C.cyan, P(S, 1, 12.5), 26);
  chip(1560, 750, 480, 62, "ℓ′ c′ = ℓ c", C.cyan, P(S, 1, 13.5), 28);
};

/* ---- 13 BUDGET ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u);
  txt('E[Q] = 3 + r(2u + 5v − 3)', 560, 230, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 0.5) });
  const x0 = 200, x1 = 760, y0 = 760, y1 = 300, X = r => x0 + (x1 - x0) * r, Y = q => y0 + (y1 - y0) * q / 7;
  line(x0, y0, x1, y0, C.dim, s0, 1.5); line(x0, y0, x0, y1 - 20, C.dim, s0, 1.5);
  [0, 3, 7].forEach(q => txt(String(q), x0 - 16, Y(q) + 8, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: s0 }));
  txt('r = 0 (apex)', x0, y0 + 36, { size: 20, fam: F.mono, align: 'center', c: C.gold, a: s0 });
  txt('r = 1 (floor)', x1, y0 + 36, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: s0 });
  [['0', 0, '−3'], ['2', 2, '−1'], ['5', 5, '+2'], ['25', 7, '+4']].forEach(([k, q, sl], i) => { const qa = P(S, 0, 4 + i * 1.2, 1); if (qa <= 0) return; line(X(0), Y(3), X(qa), Y(3 + (q - 3) * qa), PC[k], 1, 3); dot(X(qa), Y(3 + (q - 3) * qa), 12, PN[k], 1); txt(PL[k] + ' : ' + q + '   slope ' + sl, X(1) + 24, Y(q) + 8, { size: 20, fam: F.mono, w: 700, c: PC[k], a: P(S, 0, 5 + i * 1.2) }); });
  dot(X(0), Y(3), 14, 'g', s0);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('E[Q] ≤ t for every law  ⟺  b_Q / (t − 13/4) ∈ K°', 1450, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
    txt('b_Q = (1, 5/2, −1/4)', 1450, 270, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q });
    const diamond = (cx, cy, rho, pt, pass, title, qa) => {
      if (qa <= 0) return; const s = 170;
      txt(title, cx, cy - 215, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: qa });
      line(cx - 200, cy, cx + 200, cy, C.dim, qa * 0.5, 1); line(cx, cy - 190, cx, cy + 190, C.dim, qa * 0.5, 1);
      const d = [[rho, 0], [0, rho], [-rho, 0], [0, -rho]].map(([a, b]) => [cx + a * s, cy - b * s]);
      fillPoly(d, C.gold, qa * 0.2); strokePoly(d, C.gold, qa, 3);
      const p = [cx + pt[0] * s, cy - pt[1] * s]; dot(p[0], p[1], 16, pass ? 'n' : 'r', qa); ring(p[0], p[1], 26, pass ? C.green : C.red, qa, 3);
      txt(pass ? 'PASS' : 'FAIL', cx, cy + 245, { size: 34, fam: F.orb, w: 900, align: 'center', c: pass ? C.green : C.red, a: qa });
    };
    diamond(1270, 560, 14 / 15, [4 / 15, 2 / 3], true, 't = 7 · ζ = −1/15', P(S, 1, 5.5));
    diamond(1690, 560, 10 / 11, [4 / 11, 10 / 11], false, 't = 6 · ζ = −1/11', P(S, 1, 8.5));
    txt('2+5 alone counts 7', 1690, 850, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 10.5) });
  }
};

/* ---- 14 WINDOWS ---- */
SCENES.windows = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const s0 = clamp(u), th = 0.5, L0 = 110, a0 = -0.4;
  /* the turning hand */
  const hx = 330, hy = 470;
  ring(hx, hy, L0, C.dim, s0 * 0.6, 1.5);
  const nh = Math.min(8, Math.floor(P(S, 0, 1, 6) * 8.99));
  for (let j = 0; j < nh; j++) { const an = a0 + j * th; arrow(hx, hy, hx + L0 * Math.cos(an), hy + L0 * Math.sin(an), j < 5 ? C.cyan : C.mag, s0 * (j === nh - 1 ? 1 : 0.55), 2.5); txt(j === 0 ? 'v' : 'T' + (j === 1 ? '' : supN(j)) + 'v', hx + (L0 + 26) * Math.cos(an), hy + (L0 + 26) * Math.sin(an) + 7, { size: 18, fam: F.mono, w: 700, align: 'center', c: j < 5 ? C.cyan : C.mag, a: s0 }); }
  txt('‖Tv‖ = ‖v‖', hx, 700, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) });
  /* window chains */
  const ox = 760, oy = 290, cl = 95;
  let p = [ox, oy];
  const nc = Math.min(8, Math.floor(P(S, 0, 5, 6) * 8.99));
  const pts = [[ox, oy]];
  for (let j = 0; j < 8; j++) { const an = a0 + j * th; const q = [p[0] + cl * Math.cos(an), p[1] + cl * Math.sin(an)]; if (j < nc) arrow(p[0], p[1], q[0], q[1], j < 5 ? C.cyan : C.mag, s0, 2.5); pts.push(q); p = q; }
  if (nc >= 5) { arrow(ox, oy, pts[5][0], pts[5][1], C.cyan, P(S, 0, 8), 5); txt('S₅v', (ox + pts[5][0]) / 2 - 40, (oy + pts[5][1]) / 2 + 30, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: P(S, 0, 8) }); }
  if (nc >= 8) { arrow(ox, oy, pts[8][0], pts[8][1], C.gold, P(S, 0, 10), 5); txt('S₈v', (ox + pts[8][0]) / 2 + 16, (oy + pts[8][1]) / 2 + 30, { size: 22, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 10) }); }
  dot(ox, oy, 10, 'w', s0);
  const q = P(S, 1, 0.3);
  if (q > 0) {
    arrow(pts[5][0], pts[5][1], pts[8][0], pts[8][1], C.mag, P(S, 1, 7.5), 5);
    txt('T⁵S₃v', (pts[5][0] + pts[8][0]) / 2 + 20, (pts[5][1] + pts[8][1]) / 2 - 10, { size: 22, fam: F.mono, w: 700, c: C.mag, a: P(S, 1, 7.5) });
    chip(1520, 260, 600, 58, 'S(A+B) = S(A) + T^A · S(B)', C.mag, P(S, 1, 7.5), 24);
    chip(1520, 350, 600, 58, '‖v‖ ≤ 3‖S₅v‖ + 2‖S₈v‖', C.white, P(S, 1, 0.5), 26);
    chip(1520, 440, 600, 58, '‖v‖² ≤ 13 (‖S₅v‖² + ‖S₈v‖²)', C.gold, P(S, 1, 2), 26);
    txt('F(k−1)² + F(k−2)² = F(2k−3)', 1520, 540, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
    [[1, 1, 2], [2, 1, 5], [3, 2, 13], [5, 3, 34], [8, 5, 89]].forEach(([a, b, c], i) => txt(a + '² + ' + b + '² = ' + c, 1520, 590 + i * 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 3.5 + i * 0.4) }));
    ['no inverse', 'no period', 'no Fourier'].forEach((s, i) => chip(1290 + i * 230, 815, 210, 52, s, C.green, P(S, 1, 12 + i * 0.7), 20));
  }
};
function supN(j) { return String(j).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join(''); }

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['θ ↔ π − θ', C.cyan], ['{p,q} ↔ {q,p}', C.vio], ['K ≅ K°', C.gold], ['point ⇝ directions', C.mag]];
    items.forEach(([s0, col], i) => { const x = 330 + i * 420, q = P(S, 0, 0.5 + i * 1.6) * fade; box(x - 190, 300, 380, 110, col, q, 2, 'rgba(0,0,0,0.5)'); txt(s0, x, 365, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
    txt('what the average forgets is still a fibre', W / 2, 540, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 0, 8) * fade });
    txt('pyramid + cone shape frozen in Lean · duality and expansion argued and recomputed', W / 2, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 1) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    poly(kview(700, 400, 100, t * 0.35), KV, KF, ep * out, { ec: C.cyan, dots: ['c', 'c', 'n', 'm', 'g'], r: 12 });
    poly(kview(1220, 400, 72, -t * 0.35), QV, QF, ep * out, { ec: C.gold, fc: C.gold, dots: ['g', 'm', 'm', 'm', 'm'], r: 10 });
    txt('AURIC FIB ATOM PYRAMID II', W / 2, 660, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('金字塔 II · 镜像与展开 · TRURETURING FILM 031', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A pyramid, its mirror, and every way of arriving.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'FROZEN SHAPE', angles: 'RIGHT-ANGLE BORDER', width: 'ANGLE MIRROR', schlafli: '{p, q}', mirror: 'POLAR BODY', selfdual: 'SELF-DUAL', blowup: 'BLOW-UP', apex: 'APEX DIRECTIONS', corners: 'VERTEX FIGURES', fibre: 'HIDDEN FIBRE', slack: 'SUPPORT SLACK', blank: 'BLANK WINDOW', budget: 'POLAR BUDGET', windows: 'FIBONACCI WINDOWS', finale: 'LEDGER' });

function poster31() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  poly(kview(640, 520, 150, -0.5), KV, KF, 1, { ec: C.cyan, fa: 0.1, dots: ['c', 'c', 'n', 'm', 'g'], r: 18 });
  poly(kview(1290, 520, 115, 0.5), QV, QF, 1, { ec: C.gold, fc: C.gold, fa: 0.08, dots: ['g', 'm', 'm', 'm', 'm'], r: 16 });
  for (let i = 0; i < 6; i++) line(960, 330, 960, 720, i % 2 ? C.cyan : C.white, 0.15 + 0.1 * i, 9 - i * 1.5);
  txt('FIB 原子金字塔 II', W / 2, 190, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AURIC FIB ATOM PYRAMID II', W / 2, 870, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('镜 像 · 对 偶 · 展 开 · 点 变 成 方 向', W / 2, 945, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 031', W / 2, 1000, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster31;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
