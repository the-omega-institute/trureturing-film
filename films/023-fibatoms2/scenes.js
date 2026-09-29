/* Film 023 — FIBONACCI ATOMS II. */

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


/* ---- film 023 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    theory: ['THEORY VOLUME · PAPER PROOF', C.orange, 'rgba(40,20,0,0.75)'],
    lean: ['LEAN KERNEL · FROZEN', C.green, 'rgba(0,40,20,0.75)'],
    leanp: ['LEAN KERNEL · FROZEN  +  PAPER BRIDGE', C.green, 'rgba(0,40,20,0.75)'],
    cert: ['PAPER PROOF + FINITE CERTIFICATES · RECHECKED', C.gold, 'rgba(40,30,0,0.75)'],
    known: ['CLASSICAL RESULT · ROBIN 1984', C.blue, 'rgba(0,15,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function bar(x, y, w, h, col, a) { fillBox(x, y - h, w, h, col, a); }
function brick(x, y, s, kind, a) {
  if (a <= 0) return;
  const col = kind === 'a' ? C.cyan : C.gold;
  ctx.globalAlpha = a * 0.35; ctx.fillStyle = col; ctx.fillRect(x - s / 2, y - s * 0.35, s, s * 0.7); ctx.globalAlpha = 1;
  box(x - s / 2, y - s * 0.35, s, s * 0.7, col, a, 2);
  for (let k = 0; k < 2; k++) { ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(x - s * 0.3 + k * s * 0.4, y - s * 0.5, s * 0.2, s * 0.15); ctx.globalAlpha = 1; }
  txt(kind === 'a' ? 'α' : 'β', x, y + s * 0.15, { size: s * 0.42, fam: F.mono, w: 700, align: 'center', c: C.white, a });
}
const rho = t => t === 'a' ? 'b' : t === 'b' ? ['b', 'a'] : [rho(t[0]), rho(t[1])];
const Tj = j => { let t = 'a'; for (let i = 0; i < j; i++) t = rho(t); return t; };
const leaves = t => typeof t === 'string' ? 1 : leaves(t[0]) + leaves(t[1]);
function drawTree(t, x, y, w, dy, s, a) {
  if (a <= 0) return;
  if (typeof t === 'string') { brick(x, y, s, t, a); return; }
  const nl = leaves(t[0]), nr = leaves(t[1]), tot = nl + nr;
  const xl = x - w / 2 + w * nl / tot / 2, xr = x + w / 2 - w * nr / tot / 2;
  dot(x, y, 6, 'w', a);
  line(x, y, xl, y + dy, C.dim, a, 2); line(x, y, xr, y + dy, C.dim, a, 2);
  drawTree(t[0], xl, y + dy, w * nl / tot, dy, s, a);
  drawTree(t[1], xr, y + dy, w * nr / tot, dy, s, a);
}
function drawer(x, y, w, h, col, a, label) { if (a <= 0) return; box(x, y, w, h, col, a, 2.5, 'rgba(0,0,0,0.45)'); fillBox(x + w / 2 - 25, y + h / 2 - 4, 50, 8, col, a * 0.8); if (label) txt(label, x + w / 2, y + h - 12, { size: 18, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function dial(x, y, r, an, col, a) { if (a <= 0) return; ring(x, y, r, col, a, 2); for (let k = 0; k < 12; k++) { const b = k / 12 * TAU; line(x + Math.cos(b) * r * 0.85, y + Math.sin(b) * r * 0.85, x + Math.cos(b) * r, y + Math.sin(b) * r, col, a * 0.6, 2); } arrow(x, y, x + Math.cos(an) * r * 0.8, y + Math.sin(an) * r * 0.8, col, a, 3); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  drawTree(Tj(4), 560, 250, 420, 60, 40, sp);
  txt('film 022: 2,555 lines', 560, 560, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sp });
  const g = P(S, 0, 4, 2);
  bar(1150, 620, 90, 90 * 1, C.dim, 0.7 * sp);
  bar(1300, 620, 90, 90 * 4.97 * g, C.cyan, 0.8 * sp);
  txt('2,555', 1195, 650, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sp });
  txt('12,695', 1345, 650, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5) });
  txt('×5', 1450, 400, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 6), ab: 2 });
  const q = P(S, 1, 2);
  box(360, 700, 380, 80, C.orange, q, 2.5, 'rgba(40,20,0,0.5)'); txt('PAPER', 550, 752, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.orange, a: q });
  arrow(760, 740, 1060, 740, C.white, P(S, 1, 3), 3);
  box(1080, 700, 460, 80, C.green, P(S, 1, 3.5), 2.5, 'rgba(0,40,20,0.5)'); txt('LEAN · FROZEN', 1310, 752, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 3.5), ab: 1 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  drawTree(Tj(5), W / 2, 220, 620, 50, 34, rp);
  txt(scramble('FIBONACCI ATOMS II', rp, 231), W / 2, 620, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 8 });
  txt('Fibonacci 原 子 · 第 二 部 · 记 忆 时 间 与 知 道 的 代 价', W / 2, 700, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 023 · FIBONACCI_ATOMIC_RELATION_GENERATION §41–128', W / 2, 170, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  [['remember?', C.cyan], ['look?', C.mag], ['ask?', C.gold]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 360, 790, 300, 64, 'how much to ' + s, col, P(S, 1, 0.5 + i * 1.2), 24));
};

/* ---- 02 DRAWERS ---- */
SCENES.drawers = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  txt('25 defect classes', W / 2, 200, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0 });
  drawer(300, 250, 420, 300, C.mag, P(S, 0, 1), 'ℤ/25');
  drawer(360, 300, 300, 180, C.mag, P(S, 0, 2), 'nested');
  txt('one tall drawer, a drawer inside', 510, 610, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 2) });
  drawer(1100, 280, 250, 240, C.cyan, P(S, 0, 4), 'ℤ/5');
  drawer(1400, 280, 250, 240, C.cyan, P(S, 0, 4.3), 'ℤ/5');
  txt('two separate drawers', 1375, 610, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 4.5) });
  if (p1 > 0) {
    txt('closure after 2m steps: split  ⟺  gcd(F_m, 5) = 1', W / 2, 690, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 0.5) });
    [[4, 3, 1], [6, 8, 1], [8, 21, 1], [10, 55, 5]].forEach(([m, f, g], i) => chip(420 + i * 360, 770, 320, 60, 'm=' + m + ': F=' + f + (g === 1 ? ' → split' : ' → nested'), g === 1 ? C.cyan : C.mag, P(S, 1, 2 + i * 0.8), 22));
  }
  thm('§41 · Thm 41.2, Cor 41.3, Thm 41.4 · Smith factors (F_m, 5F_m)', W / 2, 860, P(S, 1, 6), 'center');
};

/* ---- 03 DIARY ---- */
SCENES.diary = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const pts = [[330, 240], [220, 440], [440, 440]];
  pts.forEach(([x, y], i) => dot(x, y, 26, ['c', 'm', 'g'][i], p0));
  [[0, 1], [1, 2], [2, 0]].forEach(([a, b]) => line(pts[a][0], pts[a][1], pts[b][0], pts[b][1], C.dim, p0, 2));
  txt('three-node loop', 330, 520, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  const lv = [3, 9, 9, 9], au = [3, 9, 27, 81];
  txt('each level alone', 900, 220, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) });
  lv.forEach((v, i) => { const q = P(S, 0, 3 + i * 0.5); bar(740 + i * 90, 560, 60, v * 3.5, C.cyan, 0.7 * q); txt(String(v), 770 + i * 90, 545 - v * 3.5, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); txt('r=' + (i + 1), 770 + i * 90, 590, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); });
  if (p1 > 0) {
    txt('self-updating diary', 1450, 220, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 0.3) });
    au.forEach((v, i) => { const q = P(S, 1, 0.8 + i * 0.6); bar(1290 + i * 90, 560, 60, v * 3.5, C.mag, 0.7 * q); txt(String(v), 1320 + i * 90, 545 - v * 3.5, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q }); txt('r=' + (i + 1), 1320 + i * 90, 590, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); });
    txt('≥ p^((r+1)·b_p) · canonical record attains it', W / 2, 680, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
    txt('no peeking at the fine details', W / 2, 740, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 5) });
  }
  thm('§42 · D5/S3/Arith/FibonacciAtomic/RecordCapacity · autonomous_record_capacity', W / 2, 850, P(S, 1, 6), 'center');
};

/* ---- 04 STROBE ---- */
SCENES.strobe = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  line(260, 360, 1660, 360, C.dim, p0, 2);
  for (let k = 0; k <= 12; k++) { const x = 260 + k * 110; line(x, 350, x, 370, C.dim, p0, 2); txt(String(k), x, 400, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 }); }
  const flash = (Math.floor(t * 3) % 2) === 0;
  [0, 4, 9].forEach((k, i) => { const x = 260 + k * 110, q = P(S, 0, 1 + i * 0.5); if (flash) { ctx.globalAlpha = q * 0.25; ctx.fillStyle = C.gold; ctx.fillRect(x - 30, 200, 60, 150); ctx.globalAlpha = 1; } dot(x, 360, 16, 'g', q); });
  txt('loss depends only on F(gcd of the gaps)', W / 2, 250, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) });
  txt('Smith form diag(1, F_g)', W / 2, 470, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 5) });
  if (p1 > 0) {
    txt('mod 255, times 0, 4, 9:', W / 2, 560, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.3) });
    [['{0,4}', 3], ['{0,9}', 17], ['{4,9}', 5]].forEach(([s, v], i) => chip(560 + i * 400, 640, 340, 64, s + ' → blind ' + v, C.red, P(S, 1, 1 + i * 0.8), 24));
    chip(W / 2, 740, 460, 64, '{0,4,9} → sees all', C.green, P(S, 1, 4), 26);
  }
  thm('§44 · D5/S1/Recurrence/FiniteSamplingSmithDefect · Prop 44.3 example', W / 2, 850, P(S, 1, 6), 'center');
};

/* ---- 05 GUESTS ---- */
SCENES.guests = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const cx = 560, cy = 440, R = 170;
  ctx.globalAlpha = p0 * 0.3; ctx.fillStyle = '#6b3a1f'; ctx.beginPath(); ctx.arc(cx, cy, 110, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  ring(cx, cy, 110, C.gold, p0, 3);
  const n = 3, pr = Math.floor(t) % 3;
  for (let i = 0; i < n; i++) { const an = i / n * TAU - Math.PI / 2, x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R, on = i === pr || i === (pr + 1) % 3; dot(x, y, 30, on ? 'n' : 'w', p0); txt('t' + i, x, y + 8, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 }); }
  txt('any two guests tell the whole story', cx, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 3) });
  if (p1 > 0) {
    txt('max guests = min over primes of the', 1350, 260, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.3) });
    txt('Fibonacci entry rank z(p)', 1350, 300, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.3) });
    [[2, 3], [3, 4], [5, 5], [7, 8]].forEach(([p, z], i) => { const q = P(S, 1, 1 + i * 0.4); txt('z(' + p + ') = ' + z, 1350, 380 + i * 50, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); });
    txt('5040 → 3      315 → 4', 1350, 640, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
  }
  thm('§47 · D5/S3/Arith/FibonacciAtomic/TimeSampling · pairwise_recovery_maximum', W / 2, 850, P(S, 1, 6), 'center');
};

/* ---- 06 ALBUMS ---- */
SCENES.albums = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [['team A', 460, C.cyan], ['team B', 1460, C.mag]].forEach(([n, x, col], i) => { txt(n, x, 220, { size: 28, fam: F.orb, w: 900, align: 'center', c: col, a: p0 }); for (let k = 0; k < 4; k++) box(x - 180 + k * 95, 260, 80, 110, col, P(S, 0, 1 + k * 0.3), 2, 'rgba(0,0,0,0.5)'); });
  line(700, 320, 1220, 320, C.gold, P(S, 0, 3), 2);
  txt('cut', W / 2, 300, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: P(S, 0, 3) });
  for (let k = 0; k < 9; k++) { const q = P(S, 0, 4 + k * 0.15); bar(620 + k * 80, 620, 56, 150, C.green, 0.7 * q); }
  txt('every Schmidt weight equal: flat albums', W / 2, 680, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 6) });
  if (p1 > 0) {
    txt('blocks = cosets of K_A + K_B', W / 2, 740, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.5) });
    txt('S = log N − log k_A − log k_B', W / 2, 800, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 1 });
  }
  thm('Appendix FAR · D5/S3/Quantum/Entanglement/FiniteAdditiveReadoutSpectrum · actual_flat_reductions', W / 2, 860, P(S, 1, 5), 'center');
};

/* ---- 07 RECIPE ---- */
SCENES.recipe = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  txt('5040 = 2⁴ · 3² · 5 · 7', W / 2, 210, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  [['7', '[2 + 5] cooked together', C.mag], ['10', '[2] [5] served apart', C.cyan]].forEach(([n, d, col], i) => { const x = 560 + i * 800, q = P(S, 0, 2 + i * 1.5); box(x - 260, 270, 520, 220, col, q, 2.5, 'rgba(0,0,0,0.5)'); txt(n, x, 370, { size: 70, fam: F.orb, w: 900, align: 'center', c: col, a: q, ab: 2 }); txt(d, x, 450, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
  txt('same ingredients (2, 5) · different relation', W / 2, 550, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 5) });
  if (p1 > 0) {
    for (let i = 0; i < 60; i++) { const coll = i < 24, x = 360 + (i % 20) * 60, y = 620 + Math.floor(i / 20) * 50, q = P(S, 1, 0.5 + i * 0.03); dot(x, y, coll ? 11 : 9, coll ? 'm' : 'c', q); }
    txt('60 divisors → 48 lists (12 shared by two) → +1 bit κ separates all', W / 2, 800, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 4) });
  }
  thm('§58–60 · Thm 60.1 · C(5040) = (5,2,2;1) · pink = colliding pairs (schematic)', W / 2, 860, P(S, 1, 6), 'center');
};

/* ---- 08 SCULPTURE ---- */
SCENES.sculpture = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [[480, C.cyan, 1], [1440, C.mag, -1]].forEach(([x, col, s], i) => {
    const q = P(S, 0, 0.5 + i);
    for (let k = 0; k < 5; k++) { const w = 80 + 40 * Math.sin(k + s * t * 0.4 + i), y = 230 + k * 50; box(x - w / 2, y, w, 44, col, q, 2, 'rgba(0,0,0,0.4)'); }
    [[-1, 0], [0, 1], [1, 0]].forEach(([dx, dy], j) => { const qq = P(S, 0, 3 + j * 0.6); fillBox(x - 60 + dx * 170, 520 + dy * 20, 120, 16, col, qq * 0.5); });
    txt('shadows 1, 2, 3 ✓', x, 600, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 5) });
  });
  txt('=', W / 2, 540, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 5) });
  if (p1 > 0) {
    txt('Möbius μ on the 60 divisor states = a pure 4th-order relation', W / 2, 690, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.5) });
    txt('E[μ] = +2/15', 480, 770, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 1, 3), ab: 1 });
    txt('E[μ] = −2/15', 1440, 770, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, a: P(S, 1, 3.5), ab: 1 });
  }
  thm('§63–64 · ranks 51 → 12 → 8 → 0 · recomputed', W / 2, 860, P(S, 1, 6), 'center');
};

/* ---- 09 WINDOW ---- */
SCENES.window = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'leanp');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  for (let r = 1; r <= 14; r++) { const q = P(S, 0, 0.5 + r * 0.15), x1 = 200 + 7 * r * 11, x2 = 200 + 10 * r * 11; dot(x1, 280, 7, 'c', q); dot(x2, 360, 7, 'm', q); line(x1, 290, x2, 350, C.dim, q * 0.4, 1); }
  txt('μ(7r)', 160, 285, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: p0 }); txt('μ(10r)', 160, 365, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.mag, a: p0 });
  const X = 200 + 1100 * (0.5 + 0.3 * Math.sin(t * 0.3));
  line(X, 240, X, 400, C.gold, P(S, 0, 3), 3);
  fillBox(X - 1100 * 0.3 / 1, 250, 0, 0, C.gold, 0);
  txt('coins cancel except in the window 7r ≤ X < 10r', W / 2, 470, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 4) });
  if (p1 > 0) {
    box(360, 540, 520, 110, C.green, P(S, 1, 0.5), 3, 'rgba(0,40,20,0.5)'); txt('window bound', 620, 590, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 0.5) }); txt('O(X^a)', 620, 630, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 0.5) });
    txt('⟺', W / 2, 610, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 1.5) });
    box(1040, 540, 520, 110, C.green, P(S, 1, 1.5), 3, 'rgba(0,40,20,0.5)'); txt('Mertens bound', 1300, 590, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 1.5) }); txt('O(X^a)', 1300, 630, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 1.5) });
    txt('Lean: ⟺ proved     classical criterion (paper): a = ½ + ε ⟺ RH', W / 2, 720, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 3) });
    txt('neither side is proved', W / 2, 780, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 5), ab: 1 });
  }
  thm('§66 · D5/S3/Arith/FibonacciAtomic/MertensBoundary · power_bounds_iff (coprime-to-70 window)', W / 2, 860, P(S, 1, 6), 'center');
};

/* ---- 10 TIPJAR ---- */
SCENES.tipjar = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'known');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const jx = 400, jy = 250, jw = 260, jh = 420;
  const fill = 3.838 / 4.2 * P(S, 0, 2, 4);
  fillBox(jx, jy + jh * (1 - fill), jw, jh * fill, C.gold, 0.45 * p0);
  box(jx, jy, jw, jh, C.white, p0, 3);
  const lineY = jy + jh * (1 - 3.817 / 4.2);
  line(jx - 60, lineY, jx + jw + 60, lineY, C.red, P(S, 0, 4), 3);
  txt('e^γ log log n', jx - 70, lineY + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.red, a: P(S, 0, 4) });
  for (let k = 0; k < 8; k++) { const y = jy - 30 + ((t * 80 + k * 60) % 200); dot(jx + 40 + k * 26, y, 7, 'g', p0 * 0.8 * (y < jy + 10 ? 1 : 0)); }
  txt('each divisor d drops 1/d', jx + jw / 2, jy + jh + 45, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  txt('RH  ⟺  σ(n)/n < e^γ log log n  for all n > 5040', 1340, 280, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  txt('(Robin 1984)', 1340, 320, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) });
  if (p1 > 0) {
    txt('5040: 403/105 = 3.838 > 3.817', 1340, 400, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 0.3), ab: 1 });
    box(960, 450, 760, 90, C.green, P(S, 1, 2), 2.5, 'rgba(0,40,20,0.5)');
    txt('LEAN · FROZEN: Robin for all 2^a 3^b 5^c 7^d > 5040', 1340, 505, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2) });
    txt('all n: equivalent forms + finite certificates', 1340, 590, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 4) });
    txt('rest: OPEN', 1340, 650, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 5), ab: 2 });
  }
  thm('§74–98 · D5/S3/Arith/Robin/SevenSmooth · robin_seven_smooth', W / 2, 860, P(S, 1, 6), 'center');
};

/* ---- 11 TOOLBOX ---- */
SCENES.toolbox = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  txt('question: 5040 / gcd(C, 5040)', W / 2, 210, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('memory needed depends on the tools handed later', W / 2, 260, { size: 24, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) });
  const rows = [['× only', 60, C.green], ['+ 7', 1440, C.cyan], ['+ 2', 3780, C.mag], ['+ 13', 5040, C.red], ['+ 2520', 60, C.gold]];
  rows.forEach(([n, v, col], i) => { const q = p1 > 0 ? P(S, 1, 0.3 + i * 0.9) : 0, y = 340 + i * 90; chip(420, y, 220, 64, n, col, q, 28); fillBox(560, y - 24, 1100 * v / 5040 * q, 48, col, 0.6); txt(v.toLocaleString('en-US') + ' states', 580 + 1100 * v / 5040 * q, y + 10, { size: 24, fam: F.mono, w: 700, c: C.white, a: q }); });
  txt('the toolbox decides the notebook', W / 2, 820, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6), ab: 2 });
  thm('§100 · Prop 100.8 · κ_H(d) recomputed', W / 2, 870, P(S, 1, 6), 'center');
};

/* ---- 12 SIPS ---- */
SCENES.sips = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'cert');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  ['000', '100', '010', '101', '001'].forEach((w, i) => chip(300 + i * 150, 240, 120, 56, w, C.cyan, P(S, 0, 0.5 + i * 0.3), 24));
  txt('3-bit Fibonacci windows', 600, 310, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  [0, 1, 2].forEach(k => { const q = P(S, 0, 3 + k * 1.2), x = 1250 + k * 170; ctx.globalAlpha = q; ctx.strokeStyle = k < 2 ? C.dim : C.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 40, 200); ctx.lineTo(x + 40, 200); ctx.lineTo(x + 10, 280); ctx.lineTo(x + 10, 330); ctx.moveTo(x - 10, 330); ctx.lineTo(x - 10, 280); ctx.lineTo(x - 40, 200); ctx.stroke(); ctx.globalAlpha = 1; txt('sip ' + (k + 1), x, 370, { size: 22, fam: F.mono, w: 700, align: 'center', c: k < 2 ? C.dim : C.gold, a: q }); });
  txt('2 sips: not enough · 3: always', 1420, 420, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) });
  if (p1 > 0) {
    const vals = [61, 48459, 535501, 604801, 604801], lg = v => Math.log10(v);
    vals.forEach((v, i) => { const q = P(S, 1, 0.5 + i * 0.8), x = 360 + i * 270; bar(x, 780, 150, (lg(v) - 1) * 60 * q, i < 3 ? C.mag : C.green, 0.7); txt(v.toLocaleString('en-US'), x + 75, 770 - (lg(v) - 1) * 60 * q, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt('t = ' + i, x + 75, 810, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); });
    txt('(log scale)', 1650, 810, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 1) });
  }
  thm('§104–108 · h(5040) = 3 · Assumption 107.5 certificates · refinement recomputed', W / 2, 870, P(S, 1, 6), 'center');
};

/* ---- 13 WITNESS ---- */
SCENES.witness = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  dot(420, 360, 70, 'w', p0 * 0.25); ring(420, 360, 70, C.white, p0, 3);
  txt('?', 420, 385, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p0 * (0.6 + 0.4 * Math.sin(t * 3)) });
  txt('witness with amnesia', 420, 480, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('each answer = gcd(·, 5040)', 420, 520, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) });
  const dials = [['16', 4, C.cyan], ['9', 4, C.mag], ['5', 4, C.gold], ['7', 6, C.green]];
  dials.forEach(([m, c, col], i) => { const q = P(S, 0, 4 + i * 0.3), x = 900 + i * 220; dial(x, 330, 70, t * 1.5, col, q); txt('mod ' + m, x, 440, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(c + ' q', x, 480, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
  if (p1 > 0) {
    txt('one synchronized word turns all four dials', 1230, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.3) });
    txt('cost = max(4, 4, 4, 6) = 6 questions', 1230, 620, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 1.5), ab: 2 });
    for (let i = 0; i < 80; i++) { const q = P(S, 1, 3 + i * 0.02), x = 360 + (i % 40) * 30, y = 700 + Math.floor(i / 40) * 40; const open = [6, 11, 15, 16, 19, 23, 26, 27, 31, 35].includes(i % 40); dot(x, y, 9, open ? 'w' : 'n', q * (open ? 0.4 : 1)); }
    txt('60 phases built · 20 open in the volume', 960, 800, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
  }
  thm('§113–125 · Cor 113.7 · Cor 125.7', W / 2, 870, P(S, 1, 6), 'center');
};

/* ---- 14 WATCH ---- */
SCENES.watch = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const rows = [['watch every frame', 8, 7], ['peek at chosen times', 7, 6], ['book all in advance', 8, 7]];
  txt('global', 1150, 230, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
  txt('count known', 1450, 230, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p0 });
  rows.forEach(([n, g, k], i) => { const q = i < 2 ? P(S, 0, 1 + i * 2) : P(S, 1, 3), y = 310 + i * 110; txt(n, 900, y + 10, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.white, a: q }); cellv(1110, y - 35, 80, g, C.cyan, q); cellv(1410, y - 35, 80, k, C.mag, q); });
  for (let k = 0; k < 8; k++) { const q = P(S, 0, 0.5), x = 220 + k * 70; box(x, 620, 60, 44, C.dim, q, 1.5, 'rgba(0,0,0,0.4)'); if (Math.floor(t * 2) % 8 === k) fillBox(x, 620, 60, 44, C.gold, q * 0.6); }
  txt('frames', 470, 700, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  if (p1 > 0) {
    txt('one adaptive plan: fewest questions AND shortest wait', W / 2, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.5) });
    txt('ask 1…6, then 7 or 8 (by the mod-9 reading)', W / 2, 770, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 1.5) });
    txt('each quantifier order has its own price', W / 2, 830, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6), ab: 1 });
  }
  thm('§121–128 · Thms 121.3–121.4, 127.4, 128.4, 128.8 · witnesses recomputed', W / 2, 875, P(S, 1, 7), 'center');
};

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const lean = ['self-updating diary', 'strobe blind spots', 'pairwise guests', 'flat albums', 'Mertens window ⟺', 'Robin on 2·3·5·7'];
    const paper = ['recipes & sculptures', 'toolboxes', 'tastings (certificates)', 'questions & watches'];
    txt('LEAN · FROZEN', 560, 240, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 0.3) * fade });
    lean.forEach((s, i) => txt('✓ ' + s, 380, 300 + i * 50, { size: 26, fam: F.mono, w: 700, c: C.green, a: P(S, 0, 0.8 + i * 0.5) * fade }));
    txt('PAPER', 1360, 240, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.orange, a: P(S, 0, 4) * fade });
    paper.forEach((s, i) => txt('· ' + s, 1180, 300 + i * 50, { size: 26, fam: F.mono, w: 700, c: C.orange, a: P(S, 0, 4.5 + i * 0.5) * fade }));
    txt('RH: not proved here', W / 2, 700, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 0.5) * fade, ab: 2 });
    txt('a sharper map of what memory, time and questions cost', W / 2, 760, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    drawTree(Tj(5), W / 2, 200, 620, 50, 34, ep * out);
    txt('FIBONACCI ATOMS II', W / 2, 640, { size: 78, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 8 });
    txt('Fibonacci 原子 · 第二部 · TRURETURING FILM 023', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Remember, look, ask — and count the cost.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'PART TWO', drawers: 'DRAWERS', diary: 'DIARY', strobe: 'STROBE', guests: 'GUESTS', albums: 'ALBUMS', recipe: 'RECIPE 7/10', sculpture: 'SHADOWS', window: 'MERTENS WINDOW', tipjar: 'ROBIN JAR', toolbox: 'TOOLBOX', sips: 'THREE SIPS', witness: 'WITNESS', watch: 'WATCH', finale: 'LEDGER' });

function poster23() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawTree(Tj(6), W / 2, 260, 1300, 58, 36, 1);
  txt('记住多少？看几次？问几个问题？', W / 2, 190, { size: 58, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FIBONACCI ATOMS II', W / 2, 850, { size: 88, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 8 });
  bloom(0.65);
  txt('Fibonacci 原 子 · 第 二 部', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 023', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster23;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
