/* Film 027 — NO NESTING. */

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

/* ---- film 027 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    proof: ['LEAN KERNEL · FROZEN · 25 MODULES · COUNTS RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    lit: ['ELIZALDE–LUO 2024 · arXiv:2412.00336 · TABLE 4 · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
const LC = [C.cyan, C.mag, C.gold, C.green, C.vio, C.orange, C.blue, C.white];
/* draw a doubled word as letters on a line with arches between the two copies */
function arches(word, x0, y0, dx, a, o = {}) {
  if (a <= 0) return;
  const first = {}, pos = {};
  word.forEach((v, i) => { (pos[v] = pos[v] || []).push(i); });
  const prog = o.prog === undefined ? 1 : o.prog;
  Object.entries(pos).forEach(([v, [i, j]]) => {
    if (j === undefined) return;
    const xa = x0 + i * dx, xb = x0 + j * dx, r = (xb - xa) / 2, col = o.col ? o.col(+v) : LC[(+v - 1) % LC.length];
    const q = clamp(prog * word.length - j);
    if (q <= 0) return;
    ctx.globalAlpha = a * q; ctx.strokeStyle = col; ctx.lineWidth = o.lw || 3;
    ctx.beginPath(); ctx.ellipse(xa + r, y0 - 26, r, r * (o.hk || 0.7), 0, Math.PI, TAU); ctx.stroke(); ctx.globalAlpha = 1;
  });
  word.forEach((v, i) => { const q = clamp(prog * word.length - i); const col = o.col ? o.col(v) : LC[(v - 1) % LC.length]; cellv(x0 + i * dx - (o.s || 44) / 2, y0 - 20, o.s || 44, v, col, a * q, 'rgba(0,0,0,0.55)', 0.5); });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  const w = [1, 2, 1, 3, 2, 3, 4, 4];
  const k = Math.min(w.length, Math.floor(Math.max(0, u - 3) * 0.7));
  /* bus: boarding and leaving */
  box(560, 250, 800, 150, C.cyan, sp, 2.5, 'rgba(0,20,30,0.5)');
  txt('BUS', 600, 290, { size: 22, fam: F.orb, w: 900, c: C.cyan, a: sp });
  const inside = []; for (let i = 0; i < k; i++) { const v = w[i]; const at = inside.indexOf(v); if (at >= 0) inside.splice(at, 1); else inside.push(v); }
  inside.forEach((v, i) => dot(1260 - i * 110, 325, 34, ['c', 'm', 'g', 'n'][v - 1], sp));
  inside.forEach((v, i) => txt(String(v), 1260 - i * 110, 334, { size: 24, fam: F.mono, w: 700, align: 'center', c: '#111', a: sp }));
  arrow(1370, 325, 1460, 325, C.white, sp, 3); txt('exit', 1470, 332, { size: 20, fam: F.mono, c: C.dim, a: sp });
  arrow(460, 325, 550, 325, C.white, sp, 3); txt('board', 380, 332, { size: 20, fam: F.mono, c: C.dim, a: sp });
  txt('log:', 560, 470, { size: 24, fam: F.mono, w: 700, c: C.dim, a: sp });
  arches(w, 700, 560, 90, sp, { prog: k / w.length });
  txt('first in, first out · nobody overtakes', W / 2, 700, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 6) });
  const q = P(S, 1, 0.5);
  if (q > 0) { chip(W / 2 - 360, 790, 420, 60, '2024 · conjecture', C.orange, q, 24); arrow(W / 2 - 140, 790, W / 2 + 120, 790, C.white, P(S, 1, 2), 3); chip(W / 2 + 360, 790, 420, 60, 'theorem ∀ n · Lean', C.green, P(S, 1, 2.5), 24); }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  arches([1, 2, 1, 3, 2, 4, 3, 5, 4, 5], W / 2 - 405, 420, 90, rp, { prog: clamp(u / 2.5) });
  txt(scramble('NO NESTING', rp, 271), W / 2, 640, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 10 });
  txt('不 嵌 套 的 排 列 · 四 个 禁 止 模 式 · 一 个 有 理 函 数', W / 2, 715, { size: 38, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 027 · D5/S3/Combinatorics/Nonnesting', W / 2, 115, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['25 frozen modules', C.green], ['1 conjecture', C.orange], ['every n', C.cyan]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 420, 810, 380, 64, s, col, P(S, 1, 0.5 + i * 1.2), 24));
};

/* ---- 02 ARCHES ---- */
SCENES.arches = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const p0 = at(S, 0, 0.6);
  arches([1, 2, 1, 2], 260, 380, 90, p0);
  txt('crossing ✓', 395, 450, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: p0 });
  arches([1, 1, 2, 2], 760, 380, 90, P(S, 0, 1.5));
  txt('side by side ✓', 895, 450, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 1.5) });
  const qn = P(S, 0, 5);
  arches([1, 2, 2, 1], 1260, 380, 90, qn, { col: () => C.red });
  arches([2, 1, 1, 2], 1260, 600, 90, P(S, 0, 7), { col: () => C.red });
  txt('nest 1221 ✗', 1395, 450, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: qn });
  txt('nest 2112 ✗', 1395, 670, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 7) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('no nests ⟺ first-in first-out', 150, 560, { size: 28, fam: F.orb, w: 900, c: C.gold, a: q, ab: 1 });
    txt('count = Catalan(n) · n!', 150, 620, { size: 26, fam: F.mono, w: 700, c: C.white, a: P(S, 1, 2) });
    [[1, 1], [2, 4], [3, 30], [4, 336], [5, 5040]].forEach(([n, v], i) => { cellv(150 + i * 150, 660, 120, v, C.cyan, P(S, 1, 3 + i * 0.5), 'rgba(0,0,0,0.5)', 0.3); txt('n=' + n, 210 + i * 150, 805, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 3 + i * 0.5) }); });
  }
  thm('NonnestingBasicOrders · "the two occurrences of each letter govern nonnesting" · counts recomputed n ≤ 6', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 03 PATTERNS ---- */
SCENES.patterns = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lit');
  const pats = [[1, 2, 3, 1], [1, 3, 1, 2], [2, 2, 3, 1], [3, 2, 2, 1]];
  pats.forEach((p, i) => { const x = 180 + i * 420, q = P(S, 0, 0.5 + i * 1.2); box(x - 20, 210, 360, 150, C.red, q, 2, 'rgba(40,0,10,0.4)'); p.forEach((v, j) => cellv(x + j * 80, 250, 64, v, LC[v - 1], q, 'rgba(0,0,0,0.5)', 0.5)); txt('✗ forbidden', x + 150, 345, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.red, a: q }); });
  txt('equal letters stay equal', W / 2, 410, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('C(x) =  (1 − 3x + 2x²) / ((1 − 3x)(1 − x − x²))', W / 2, 500, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q, ab: 1 });
    txt('"All the conjectures have been checked for n up to 8."', W / 2, 555, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 3) });
    const A = [1, 1, 4, 11, 33, 98, 293, 877, 2628];
    A.forEach((v, i) => { const h = Math.log10(v + 1) * 70, qq = P(S, 1, 4 + i * 0.5), x = 560 + i * 90; fillBox(x, 830 - h, 60, h, i <= 8 ? C.orange : C.dim, qq * 0.8); txt(String(v), x + 30, 820 - h, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: qq }); });
  }
  thm('Elizalde & Luo, Pattern avoidance in nonnesting permutations · Table 4, row {1231, 1312, 2231, 3221}', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 04 CUTS ---- */
SCENES.cuts = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const p0 = at(S, 0, 0.6), w = [1, 1, 3, 3, 2, 2, 4, 5, 4, 5];
  const sep = P(S, 0, 5, 2) * 70;
  const gx = [0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
  const x0 = 520;
  const xs = w.map((_, i) => x0 + i * 90 + gx[i] * sep);
  /* cars */
  [[0, 1], [2, 5], [6, 9]].forEach(([a, b], k) => { const q = P(S, 0, 5); box(xs[a] - 40, 330, xs[b] - xs[a] + 80, 110, [C.cyan, C.gold, C.green][k], q, 2.5, 'rgba(0,0,0,0.3)'); dot(xs[a] - 10, 455, 12, 'w', q); dot(xs[b] + 10, 455, 12, 'w', q); });
  const pos = {}; w.forEach((v, i) => (pos[v] = pos[v] || []).push(i));
  Object.entries(pos).forEach(([v, [i, j]]) => { const xa = xs[i], xb = xs[j], r = (xb - xa) / 2; ctx.globalAlpha = p0; ctx.strokeStyle = LC[v - 1]; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(xa + r, 360, r, r * 0.7, 0, Math.PI, TAU); ctx.stroke(); ctx.globalAlpha = 1; });
  w.forEach((v, i) => cellv(xs[i] - 22, 366, 44, v, LC[v - 1], p0, 'rgba(0,0,0,0.55)', 0.5));
  [[1, 2], [5, 6]].forEach(([a, b]) => { const x = (xs[a] + xs[b]) / 2; line(x, 300, x, 480, C.red, P(S, 0, 4), 3); });
  txt('cut: everything before is smaller than everything after', W / 2, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 4) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('primitive car = no cut inside', W / 2, 630, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt('C = 1 / (1 − D)', W / 2, 720, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
    txt('D = generating function of primitive cars', W / 2, 780, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 4) });
  }
  thm('NonnestingBasicCuts · NonnestingBasicSum · "value cuts decompose doubled permutations into primitive direct-sum factors"', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 05 BLOCKS ---- */
SCENES.blocks = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const p0 = at(S, 0, 0.6), w = [5, 5, 1, 2, 1, 3, 2, 4, 3, 4];
  const seen = new Set(), firsts = w.map(v => { const f = !seen.has(v); seen.add(v); return f; });
  arches(w, 530, 380, 95, p0);
  w.forEach((v, i) => { if (firsts[i]) { const q = P(S, 0, 2 + i * 0.3); ring(530 + i * 95, 382, 34, C.gold, q, 3); } });
  txt('first boardings:', 530, 520, { size: 22, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 2) });
  [5, 1, 2, 3, 4].forEach((v, i) => cellv(760 + i * 80, 480, 60, v, i === 0 ? C.mag : C.gold, P(S, 0, 3 + i * 0.4), 'rgba(0,0,0,0.5)', 0.5));
  txt('block:  k, then 1, 2, …, k − 1', 760, 600, { size: 26, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    ring(530 + 47, 382, 70, C.mag, q * (0.6 + 0.4 * Math.sin(t * 4)), 3);
    txt('largest first (n ≥ 3)  ⇒  it leaves at once: "5 5 …"', 530, 680, { size: 26, fam: F.mono, w: 700, c: C.mag, a: q });
    txt('the patterns leave very little room', 530, 740, { size: 24, fam: F.mono, c: C.white, a: P(S, 1, 3) });
  }
  thm('NonnestingFourBlocks · NonnestingFourLargeFirst · checked: first = largest ⇒ repeats, n = 3…5', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 06 FAMILIES ---- */
SCENES.families = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const p0 = at(S, 0, 0.6);
  const fam1 = [[5, 5, 1, 2, 1, 3, 2, 4, 3, 4], [5, 5, 1, 1, 2, 2, 3, 3, 4, 4], [5, 5, 1, 2, 1, 2, 3, 4, 3, 4]];
  const k = Math.floor(t * 0.5) % fam1.length;
  txt('family 1 · largest boards and leaves at once + increasing tail', 180, 195, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: p0 });
  arches(fam1[k], 300, 330, 70, p0, { s: 36 });
  txt('2ⁿ⁻² of them', 1100, 330, { size: 30, fam: F.orb, w: 900, c: C.cyan, a: P(S, 0, 6), ab: 1 });
  const q2 = P(S, 1, 0.3), q3 = P(S, 1, 5);
  txt('family 2 · the staircase (unique)', 180, 460, { size: 22, fam: F.mono, w: 700, c: C.gold, a: q2 });
  arches([1, 2, 1, 3, 2, 4, 3, 5, 4, 5], 300, 560, 70, q2, { s: 36, col: () => C.gold });
  txt('family 3 · the chain 2 1 3 2 1 … (unique)', 180, 640, { size: 22, fam: F.mono, w: 700, c: C.mag, a: q3 });
  arches([2, 1, 3, 2, 1, 4, 3, 5, 4, 5], 300, 790, 70, q3, { s: 36, col: () => C.mag });
  if (P(S, 1, 7) > 0) {
    box(1080, 520, 640, 150, C.green, P(S, 1, 7), 2.5, 'rgba(0,40,20,0.5)');
    txt('primitive cars of size n:', 1400, 575, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 7) });
    txt('2ⁿ⁻² + 2', 1400, 640, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 7.5), ab: 2 });
    txt('n = 2…6: 3, 4, 6, 10, 18 (recounted)', 1400, 720, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 8) });
  }
  thm('NonnestingFourPrimitiveClassify · PrimitiveLarge · PrimitiveIncUnique · PrimitiveTwo*', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 07 DOUBLING ---- */
SCENES.doubling = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const p0 = at(S, 0, 0.6), levels = 6, gx = 1100, gy = 230, lh = 100;
  const grow = P(S, 0, 1, 10) * levels;
  for (let L = 0; L < levels; L++) {
    const n = 1 << L, q = clamp(grow - L);
    for (let i = 0; i < n; i++) {
      const x = gx + (i + 0.5) / n * 660, y = gy + L * lh;
      if (L > 0) { const px = gx + (Math.floor(i / 2) + 0.5) / (n / 2) * 660; line(px, y - lh, x, y, C.cyan, q * 0.6, 1.5); }
      dot(x, y, Math.max(4, 14 - L * 2), 'c', q);
    }
    txt(String(n), gx - 30, gy + L * lh + 8, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.gold, a: q });
  }
  txt('increasing tails of size m: 2ᵐ⁻¹', 150, 420, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: P(S, 0, 4) });
  txt('each new passenger: exactly two ways in', 150, 470, { size: 24, fam: F.mono, c: C.white, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    ['two-way extension  (IncCount)', 'staircase is the only increasing primitive  (PrimitiveIncUnique)', '2 1 3 2 1-chain is unique  (PrimitiveTwo…)'].forEach((s, i) => txt('✓ ' + s, 150, 570 + i * 50, { size: 22, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 0.5 + i * 2) }));
  }
  thm('NonnestingFourIncCount · NonnestingFourRecursive · tree schematic', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 08 ALGEBRA ---- */
SCENES.algebra = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const lines = [['D = x', C.cyan, 0.5], ['  + x² / (1 − 2x)      family 1', C.cyan, 2], ['  + 2x² / (1 − x)      families 2 and 3', C.cyan, 4], ['1 / (1 − D) = (1 − 3x + 2x²) / ((1 − 3x)(1 − x − x²))', C.gold, 7]];
  lines.forEach(([s, col, off], i) => txt(s, 200, 260 + i * 70, { size: i === 3 ? 34 : 32, fam: F.mono, w: 700, c: col, a: P(S, 0, off), ab: i === 3 ? 1 : 0 }));
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('1 − 3x  →  growth like 3ⁿ', 200, 600, { size: 28, fam: F.mono, w: 700, c: C.orange, a: q });
    txt('1 − x − x²  →  Fibonacci · golden ratio φ', 200, 660, { size: 28, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 3) });
    txt('cₙ = 4cₙ₋₁ − 2cₙ₋₂ − 3cₙ₋₃  (n ≥ 3)', 200, 740, { size: 24, fam: F.mono, c: C.white, a: P(S, 1, 6) });
    /* golden spiral */
    const cx = 1500, cy = 650, ph = 1.618034; ctx.globalAlpha = P(S, 1, 3); ctx.strokeStyle = C.green; ctx.lineWidth = 3; ctx.beginPath(); for (let a = 0; a < 4 * Math.PI; a += 0.05) { const r = 4 * Math.pow(ph, a / (Math.PI / 2)); const x = cx + Math.cos(a + t * 0.3) * r * 0.9, y = cy + Math.sin(a + t * 0.3) * r * 0.9; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.globalAlpha = 1;
  }
  thm('NonnestingDefs · generating-function identity · algebra rechecked with sympy', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 09 MODULES (DAG) ---- */
const NDEPS = { BasicCuts: ['BasicSum'], BasicDeletion: ['BasicSum'], BasicOrders: ['Defs'], BasicSum: ['BasicOrders'], Defs: [], Four: ['PrimitiveClassify'], Blocks: ['PrimitiveThree'], IncCount: ['Recursive'], Increasing: ['PrimitiveThree', 'BasicDeletion', 'BasicCuts'], Insert: ['BasicSum'], LargeFirst: ['Blocks', 'BasicCuts'], PrimitiveBlocks: ['PrimitiveLargeConverse', 'BasicCuts'], PrimitiveClassify: ['PrimitiveTwoConstruct', 'PrimitiveLarge'], PrimitiveInc: ['IncCount'], PrimitiveIncUnique: ['PrimitiveInc'], PrimitiveLarge: ['LargeFirst', 'PrimitiveIncUnique'], PrimitiveLargeConverse: ['PrimitivePrefix'], PrimitivePrefix: ['PrimitiveLarge'], PrimitiveThree: ['BasicOrders'], PrimitiveTwo: ['PrimitiveBlocks'], PrimitiveTwoConstruct: ['PrimitiveTwoInsert'], PrimitiveTwoInsert: ['PrimitiveTwoTail'], PrimitiveTwoPrefix: ['PrimitiveTwo'], PrimitiveTwoTail: ['PrimitiveTwoPrefix', 'BasicDeletion'], Recursive: ['Increasing', 'Insert'] };
const NDEPTH = (() => { const d = {}; const f = m => d[m] !== undefined ? d[m] : (d[m] = NDEPS[m].length ? 1 + Math.max(...NDEPS[m].map(f)) : 0); Object.keys(NDEPS).forEach(f); return d; })();
const NPOS = (() => { const byL = {}; Object.keys(NDEPS).forEach(m => (byL[NDEPTH[m]] = byL[NDEPTH[m]] || []).push(m)); const P2 = {}; const maxL = Math.max(...Object.values(NDEPTH)); Object.entries(byL).forEach(([L, ms]) => ms.forEach((m, i) => { P2[m] = [180 + (+L) / maxL * 1560, ms.length === 1 ? 300 + ((+L) % 4) * 140 : 260 + (i + 0.5) / ms.length * 520]; })); return P2; })();
SCENES.modules = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const maxL = Math.max(...Object.values(NDEPTH)), grow = P(S, 0, 0.5, 12) * (maxL + 1);
  Object.entries(NDEPS).forEach(([m, ds]) => ds.forEach(d => { const q = clamp(grow - NDEPTH[m]); const [x1, y1] = NPOS[d], [x2, y2] = NPOS[m]; line(x1, y1, x2, y2, C.dim, q * 0.7, 1.5); }));
  Object.keys(NDEPS).forEach(m => { const q = clamp(grow - NDEPTH[m]); const [x, y] = NPOS[m]; const fin = m === 'Four'; dot(x, y, fin ? 26 : 14, fin ? 'g' : m.startsWith('Basic') || m === 'Defs' ? 'c' : m.startsWith('Primitive') ? 'm' : 'n', q); txt(m.replace('Primitive', 'P·'), x, y - 20, { size: fin ? 22 : 15, fam: F.mono, w: 700, align: 'center', c: fin ? C.gold : C.white, a: q * 0.9 }); });
  const q = P(S, 1, 0.3);
  if (q > 0) { chip(W / 2, 830, 1100, 64, 'result :  C(x)·(1 − 3x)·(1 − x − x²) = 1 − 3x + 2x²', C.gold, q, 26); }
  txt('25 modules · 6,760 lines · all frozen', 180, 220, { size: 24, fam: F.mono, w: 700, c: C.green, a: P(S, 0, 1) });
  thm('import graph of D5/S3/Combinatorics/Nonnesting (read from the Lean sources)', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 10 CHECK ---- */
SCENES.check = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const A = [1, 1, 4, 11, 33, 98, 293, 877, 2628, 7879, 23629, 70874];
  A.forEach((v, i) => { const h = Math.log10(v + 1) * 80, x = 260 + i * 120, q = P(S, 0, 0.5 + i * 0.4); const col = i <= 6 ? C.green : i <= 8 ? C.orange : C.cyan; fillBox(x, 640 - h, 80, h, col, q * 0.8); txt(String(v), x + 40, 625 - h, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt('n=' + i, x + 40, 670, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: q }); });
  [['recounted here: n ≤ 6', C.green], ['paper: n ≤ 8', C.orange], ['dossier search: n ≤ 11', C.cyan]].forEach(([s, col], i) => chip(420 + i * 540, 740, 480, 56, s, col, P(S, 0, 4 + i * 1.5), 22));
  const q = P(S, 1, 0.3);
  if (q > 0) { txt('… n = 12, 13, 14, …, ∞', W / 2, 250, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: q }); stamp('THEOREM ∀ n', W / 2, 330, P(S, 1, 3), C.green, 48, -0.04); }
  thm('exhaustive searches bound n; the structure proof does not', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const steps = [['queue', 'no overtaking', C.cyan], ['patterns', '4 forbidden', C.red], ['cuts', 'C = 1/(1 − D)', C.gold], ['families', '2ⁿ⁻² + 2', C.mag], ['doubling', '2ᵐ⁻¹', C.green]];
    steps.forEach(([a, b, col], i) => { const x = 250 + i * 355, q = P(S, 0, 0.5 + i * 1.3) * fade; box(x - 150, 260, 300, 150, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a, x, 315, { size: 24, fam: F.orb, w: 900, align: 'center', c: col, a: q }); txt(b, x, 370, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); if (i < 4) arrow(x + 155, 335, x + 200, 335, C.white, q, 2.5); });
    txt('(1 − 3x + 2x²) / ((1 − 3x)(1 − x − x²))', W / 2, 520, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 7) * fade, ab: 1 });
    txt('the structure is the reason · the reason works for every n', W / 2, 640, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 1) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    arches([1, 2, 1, 3, 2, 4, 3, 5, 4, 5], W / 2 - 405, 420, 90, ep * out);
    txt('NO NESTING', W / 2, 640, { size: 92, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 10 });
    txt('不嵌套的排列 · TRURETURING FILM 027', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('First in, first out — and every n.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'THE BUS', arches: 'ARCHES', patterns: 'FOUR PATTERNS', cuts: 'CUTS', blocks: 'BOARDING ORDER', families: 'THREE FAMILIES', doubling: 'DOUBLING', algebra: 'ALGEBRA', modules: 'MODULE CITY', check: 'EVERY n', finale: 'LEDGER' });

function poster27() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  arches([1, 2, 1, 3, 2, 4, 3, 5, 4, 5], W / 2 - 450, 560, 100, 1, { s: 56, lw: 5 });
  txt('先上车的先下车', W / 2, 180, { size: 64, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('NO NESTING', W / 2, 850, { size: 100, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 10 });
  bloom(0.65);
  txt('不 嵌 套 的 排 列 · 25 个 冻 结 模 块 · 对 每 个 n', W / 2, 930, { size: 36, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 027', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster27;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
