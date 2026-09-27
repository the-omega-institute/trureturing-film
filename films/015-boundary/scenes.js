/* Film 015 — BOUNDARY DYNAMICS · 动态充分边界. A boundary is what the future still needs. */

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


/* ---- film 015 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · PAPER ARGUMENT, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function node(x, y, lab, col, a, r = 34) {
  if (a <= 0) return;
  ring(x, y, r, col, a, 3);
  ctx.globalAlpha = a * 0.25; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  txt(lab, x, y + r * 0.35, { size: r, fam: F.mono, w: 700, align: 'center', c: C.white, a });
}
function cell(x, y, s, v, col, a) { box(x, y, s, s, col, a, 2, 'rgba(0,0,0,0.5)'); txt(String(v), x + s / 2, y + s * 0.68, { size: s * 0.5, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function plotAxes(gx, gy, gw, gh, a, xl, yl) {
  line(gx, gy, gx + gw, gy, C.dim, a, 1.5); line(gx, gy, gx, gy - gh, C.dim, a, 1.5);
  if (xl) txt(xl, gx + gw / 2, gy + 42, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a });
  if (yl) txt(yl, gx, gy - gh - 16, { size: 20, fam: F.mono, align: 'left', c: C.mag, a });
}
function loopArrow(x, y, r, col, a) { curve(q => [x + Math.cos(q * 5 + 1.2) * r, y - r * 1.6 + Math.sin(q * 5 + 1.2) * r], 30, col, a, 2.5); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5), f0 = 1 - at(S, 1, 0.8);
  if (f0 > 0) {
    fillBox(900, 250, 40, 420, C.dim, 0.5 * sp * f0);
    for (let j = 0; j < 8; j++) line(900, 270 + j * 52, 940, 290 + j * 52, C.white, 0.3 * sp * f0, 1);
    const q = P(S, 0, 1.5) * f0;
    line(820, 380, 1020, 540, C.red, q, 6); line(1020, 380, 820, 540, C.red, q, 6);
    txt('not a wall in space', W / 2, 760, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  }
  const p1 = at(S, 1, 0.8);
  if (p1 > 0) {
    const cx = W / 2, cy = 470, R = 210;
    for (let i = 0; i < 160; i++) { const r = Math.sqrt(rnd(i, 3)) * (R - 20), an = rnd(i, 5) * TAU + t * 0.3 * (rnd(i, 9) - 0.5); dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r, 5, ['c', 'm', 'v'][i % 3], p1 * 0.7); }
    ring(cx, cy, R, C.gold, p1, 4 + Math.sin(t * 3));
    for (let k = 0; k < 8; k++) { const an = k / 8 * TAU + t * 0.2, q = P(S, 1, 1 + k * 0.4), ph = (t * 0.7 + k * 0.13) % 1; const x0 = cx + Math.cos(an) * (R + 190), y0 = cy + Math.sin(an) * (R + 150), x1 = cx + Math.cos(an) * (R + 12), y1 = cy + Math.sin(an) * (R + 12); arrow(x0, y0, x1, y1, C.cyan, q * 0.8, 2); dot(lerp(x0, x1, ph), lerp(y0, y1, ph), 8, 'g', q); }
    txt('boundary = summary sufficient for declared futures', W / 2, 790, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cx = W / 2, cy = 330;
  for (let k = 0; k < 36; k++) { const an = k / 36 * TAU + t * 0.15; const r = 150 + 12 * Math.sin(t * 2 + k); dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.6, 9, k % 2 ? 'g' : 'c', rp); }
  for (let k = 0; k < 20; k++) { const an = rnd(k, 3) * TAU + t * (rnd(k, 5) - 0.5); const r = rnd(k, 7) * 110; dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.6, 5, 'm', rp * 0.7); }
  txt(scramble('BOUNDARY DYNAMICS', rp, 151), W / 2, 620, { size: 104, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 10 });
  txt('动 态 充 分 边 界', W / 2, 700, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 015 · RECURSIVE_RELATIONAL_OBSERVATION_BOUNDARY_DYNAMICS', W / 2, 170, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  txt('hold it · update it · act on it', W / 2, 770, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  txt('15,985 lines · paper argument · open claims · public errata', W / 2, 830, { size: 24, fam: F.mono, align: 'center', c: C.orange, a: P(S, 1, 1) });
};

/* ---- 02 CRITERION ---- */
SCENES.criterion = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p = at(S, 0, 0.6);
  const groups = [[C.cyan, 'c', 300], [C.mag, 'm', 480], [C.gold, 'g', 660]];
  groups.forEach(([col, nm, y], g) => {
    for (let i = 0; i < 6; i++) dot(260 + (i % 3) * 60 + rnd(g * 6 + i, 3) * 20, y - 30 + Math.floor(i / 3) * 60 + Math.sin(t * 2 + i) * 4, 12, nm, p);
    box(220, y - 70, 240, 140, col, p * 0.5, 1.5);
    arrow(480, y, 640, y, C.dim, P(S, 0, 1 + g * 0.4), 2.5);
    node(700, y, 'B' + (g + 1), col, P(S, 0, 1 + g * 0.4), 42);
  });
  txt('η', 560, 250, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) });
  const rules = [['legal ⇔ legal', C.cyan], ['same readout', C.mag], ['same next label', C.gold], ['same chosen action π', C.green]];
  rules.forEach(([r, col], i) => { const q = i < 3 ? P(S, 0, 4 + i * 1.6) : P(S, 1, 0.5); txt('✓ ' + r, 900, 320 + i * 90, { size: 36, fam: F.mono, w: 700, c: col, a: q }); });
  txt('within every label', 900, 260, { size: 22, fam: F.mono, c: C.dim, a: P(S, 0, 4) });
  txt('smallest exact boundary = future equivalence  s ≡_𝒯 t', W / 2, 760, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
  thm('Thm 2.1 · Cor 2.2 · InterfaceKernelCriterion · PredictionCompletionUniversality (frozen)', W / 2, 805, P(S, 1, 6), 'center');
};

/* ---- 03 TOTALS ---- */
SCENES.totals = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    ['Σ', "Σ'", "Σ''"].forEach((l, i) => { const x = 420 + i * 540; ring(x, 420, 110, [C.cyan, C.mag, C.gold][i], p0 * P(S, 0, i * 0.8), 3); txt(l, x, 435, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 * P(S, 0, i * 0.8) }); if (i < 2) { arrow(x + 120, 420, x + 420, 420, C.dim, p0 * P(S, 0, 1 + i), 3); txt(i ? 'K_f' : 'K_e', x + 270, 400, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.green, a: p0 * P(S, 0, 1 + i) }); } });
    txt('K_{f∘e} = K_f · K_e', W / 2, 650, { size: 50, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 * P(S, 0, 3), ab: 2 });
    thm('Thm 3.1 · gluing along a boundary = kernel composition', W / 2, 710, p0 * P(S, 0, 4), 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const H = [[3, 5], [4, 4]], cut = P(S, 1, 4.5, 1);
    H.forEach((h, i) => {
      const x0 = 380 + i * 760, q = P(S, 1, 0.5 + i);
      txt('history ' + 'AB'[i], x0 + 170, 230, { size: 30, fam: F.orb, w: 700, align: 'center', c: i ? C.mag : C.cyan, a: q });
      h.forEach((v, b) => { const hh = v * 50, off = b === 1 ? cut : 0; fillBox(x0 + 60 + b * 170, 560 - hh, 110, hh, i ? C.mag : C.cyan, q * 0.75 * (1 - 0.8 * off)); txt(String(v), x0 + 115 + b * 170, 545 - hh, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: q * (1 - 0.8 * off) }); txt('b=' + b, x0 + 115 + b * 170, 600, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: q }); if (b === 1 && off > 0) { line(x0 + 60 + 170, 560 - hh, x0 + 170 + 170, 560, C.red, off, 4); } });
      txt('total 8', x0 + 170, 660, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: q * (1 - cut) });
      txt('→ ' + h[0], x0 + 170, 660, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: cut });
    });
    txt('attach a block that accepts only b = 0', W / 2, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4) });
    txt('same total  ≠  same future', W / 2, 780, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6.5), ab: 2 });
    thm('Prop 3.2', W / 2, 820, P(S, 1, 7), 'center');
  }
};

/* ---- 04 XOR ---- */
SCENES.xor = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const bits = [[0, 0], [0, 1], [1, 0], [1, 1]];
  txt('X', 560, 250, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p });
  txt('K', 700, 250, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.vio, a: p * (0.3 + 0.7 * p1) });
  txt('Y = X ⊕ K', 900, 250, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p });
  txt('Y ⊕ K', 1150, 250, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.green, a: p1 });
  const hl = Math.floor(t * 0.8) % 4;
  bits.forEach(([x, k], i) => {
    const y = 300 + i * 100, q = P(S, 0, 1 + i * 0.4);
    if (i === hl) fillBox(480, y - 5, 780, 90, C.white, 0.06 * q);
    cell(520, y, 80, x, C.gold, q); cell(660, y, 80, p1 > 0.5 ? k : '?', C.vio, q); cell(860, y, 80, x ^ k, C.cyan, q);
    cell(1110, y, 80, (x ^ k) ^ k, C.green, q * p1);
  });
  txt('I(X ; Y) = 0', 1500, 400, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 4) });
  txt('I(X ; Y | K) = 1', 1500, 500, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 1.5) });
  txt('zero information now  ≠  zero future use', W / 2, 760, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
  thm('Prop 4.2 · also §12.4 (joint boundary (C,P) needed)', W / 2, 810, P(S, 1, 5), 'center');
};

/* ---- 05 COARSEN ---- */
SCENES.coarsen = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), m = P(S, 1, 1, 2);
  const lx = 420, rx = 1500, y0 = 400, y1 = 560;
  box(lx - 170, 270, 260, 400, C.cyan, p, 2, 'rgba(0,20,30,0.5)'); txt('LEFT  A = {0}', lx - 40, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p });
  box(rx - 90, 270, 260, 400, C.mag, p, 2, 'rgba(30,0,20,0.5)'); txt('RIGHT  C = {1}', rx + 40, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p });
  const bx = W / 2;
  const ya = lerp(y0, 480, m), yb = lerp(y1, 480, m);
  node(bx, ya, m > 0.9 ? '★' : '0', C.gold, p, 38); if (m < 0.95) node(bx, yb, '1', C.gold, p * (1 - m), 38);
  line(lx + 90, 400, bx - 40, ya, C.cyan, p * (1 - m * 0.2), 3);
  line(rx - 90, 560, bx + 40, yb, C.mag, p * P(S, 0, 1), 3);
  const fx = P(S, 0, 3) * (1 - m);
  txt('fine gluing: A ∩ C = ∅', W / 2, 720, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: fx });
  if (m > 0.95) { const g = P(S, 1, 3.5); txt('a joint history that never existed', W / 2, 330, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: g }); }
  txt('q(A ∩ C) ≠ q(A) ∩ q(C)', W / 2, 740, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
  txt('P_{r′} K_e = K̄_e P_r   (coarsening must commute with gluing)', W / 2, 800, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 6) });
  thm('§5 · Thm 5.1 and counterexample (5.3)', W / 2, 840, P(S, 1, 7), 'center');
};

/* ---- 06 DEPTH ---- */
SCENES.depth = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  const nx = 330, ns = { a: [nx, 300], b: [nx, 470], c: [nx + 230, 470] };
  node(ns.a[0], ns.a[1], 'a', C.cyan, p); node(ns.b[0], ns.b[1], 'b', C.cyan, p); node(ns.c[0], ns.c[1], 'c', C.gold, p);
  loopArrow(ns.a[0], ns.a[1], 26, C.dim, p); loopArrow(ns.c[0], ns.c[1], 26, C.dim, p);
  arrow(ns.b[0] + 38, ns.b[1], ns.c[0] - 40, ns.c[1], C.dim, p, 2.5);
  txt('q = 0', nx, 580, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p }); txt('q = 1', nx + 230, 580, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: p });
  const seqs = { a: [0, 0, 0, 0, 0, 0, 0], b: [0, 1, 1, 1, 1, 1, 1], c: [1, 1, 1, 1, 1, 1, 1] };
  const n = Math.min(7, Math.floor((u - 1.5) * 1.3));
  ['a', 'b', 'c'].forEach((k, i) => {
    const y = 280 + i * 120;
    txt(k, 780, y + 50, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
    for (let j = 0; j < n; j++) cell(830 + j * 90, y, 76, seqs[k][j], seqs[k][j] ? C.gold : C.cyan, p);
  });
  const d1 = P(S, 0, 6);
  box(824, 270, 88, 350, C.white, P(S, 0, 4) * (1 - d1 * 0.6), 2);
  box(914, 270, 88, 350, C.mag, d1, 3);
  txt('depth 0: {a, b} {c}', 1150, 680, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) });
  txt('depth 1: {a} {b} {c}', 1150, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: d1 });
  const p1 = at(S, 1, 0.6);
  txt('stable depth  m ≤ |C∞| − |C₀| = 3 − 2 = 1', W / 2, 785, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1, ab: 2 });
  txt('every exact memory:  |W| ≥ |C∞| = 3', W / 2, 835, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 3) });
  thm('Thm 24.1 · Thm 24.2 · example §24.3', W / 2, 870, P(S, 1, 4), 'center');
};

/* ---- 07 FOUR VIEWS ---- */
SCENES.fourviews = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const views = [['SPACE', 'u', (a, b) => a, C.cyan], ['TIME', 'v', (a, b) => b, C.mag], ['BOUNDARY', 'u⊕v', (a, b) => a ^ b, C.gold], ['MEMORY', 'u∧v', (a, b) => a & b, C.green]];
  views.forEach(([nm, f, fn, col], i) => {
    const x0 = 180 + i * 420, y0 = 330, q = P(S, 0, 1 + i * 1.5), s = 110;
    txt(nm, x0 + s, 250, { size: 28, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 });
    txt('reads ' + f, x0 + s, 290, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q });
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) {
      const v = fn(a, b);
      box(x0 + b * s, y0 + a * s, s - 8, s - 8, col, q, 2, v ? 'rgba(255,207,90,0.25)' : 'rgba(0,0,0,0.5)');
      txt(`${a}${b}`, x0 + b * s + (s - 8) / 2, y0 + a * s + 50, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
      txt('→' + v, x0 + b * s + (s - 8) / 2, y0 + a * s + 85, { size: 20, fam: F.mono, align: 'center', c: col, a: q });
    }
    txt('merges 2 + 2', x0 + s, 590, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q * (i < 3 ? 1 : 0) });
    if (i === 3) txt('merges 3 + 1', x0 + s, 590, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q });
  });
  const p1 = at(S, 1, 0.6);
  txt('ker J = ⋂ ker qᵢ = identity : all four separated', W / 2, 690, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1, ab: 2 });
  txt('{space, time} is already a minimal family', W / 2, 750, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3) });
  txt('one quotient · seen from different sides', W / 2, 810, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
  thm('§26.3 · §27.2', W / 2, 850, P(S, 1, 6), 'center');
};

/* ---- 08 HOLONOMY ---- */
SCENES.holonomy = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  const cx = 700, cy = 530, R = 210;
  const V = [0, 1, 2].map(k => [cx + Math.cos(-Math.PI / 2 + k * TAU / 3) * R, cy + Math.sin(-Math.PI / 2 + k * TAU / 3) * R]);
  V.forEach(([x, y], k) => { ring(x, y, 90, [C.cyan, C.mag, C.gold][k], p * 0.8, 2.5); txt(String(k + 1), x, y - 50, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: p }); });
  for (let k = 0; k < 3; k++) { const [x0, y0] = V[k], [x1, y1] = V[(k + 1) % 3]; line(x0, y0, x1, y1, C.dim, p, 2); txt('−1', (x0 + x1) / 2 + (k === 2 ? -40 : 30), (y0 + y1) / 2, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 1 + k * 0.6) }); }
  txt('each overlap: locally legal ✓', 1400, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 3) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const s = ((u - lineAt(S, 1).s) * 0.35) % 1, seg = Math.floor(s * 3), f = s * 3 - seg;
    const [x0, y0] = V[seg], [x1, y1] = V[(seg + 1) % 3];
    const x = lerp(x0, x1, f), y = lerp(y0, y1, f);
    const sign = seg % 2 === 0 ? 1 : -1;
    arrow(x, y, x, y - 70 * sign, sign > 0 ? C.cyan : C.mag, p1, 4); dot(x, y, 16, 'g', p1);
    txt('g₁₂ g₂₃ g₃₁ = −1  ≠  +1', 1400, 450, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 1), ab: 2 });
    txt('no global frame', 1400, 530, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 2.5), ls: 2 });
    txt('「失败发生在三边关系上，不能由逐边合法性发现」', W / 2, 790, { size: 32, fam: F.zh, w: 900, align: 'center', c: C.white, a: P(S, 1, 4), ab: 2 });
    thm('§40.3 · see also parity triple, Counterexample 10.4', W / 2, 840, P(S, 1, 5), 'center');
  }
};

/* ---- 09 GHOST ---- */
SCENES.ghost = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    txt('F(0) = F(1) = 0', W / 2, 230, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
    txt('FUTURE · forward threads', 520, 310, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: p0 });
    [[0, 0, 0, 0, 0], [1, 0, 0, 0, 0]].forEach((r, i) => r.forEach((v, j) => cell(300 + j * 90, 350 + i * 100, 76, v, j === 0 && v ? C.gold : C.cyan, p0 * P(S, 0, 1 + i))));
    txt('2 threads · initial state recovered', 520, 590, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p0 * P(S, 0, 2) });
    txt('PAST · backward threads', 1400, 310, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.mag, a: p0 * P(S, 0, 3) });
    [0, 0, 0, 0, 0].forEach((v, j) => cell(1180 + j * 90, 350, 76, v, C.mag, p0 * P(S, 0, 3.5)));
    txt('… only 1 thread', 1400, 490, { size: 22, fam: F.mono, align: 'center', c: C.mag, a: p0 * P(S, 0, 4) });
    txt('the future remembers · the past forgets', W / 2, 720, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p0 * P(S, 0, 4.5), ab: 2 });
    thm('§34.2 · I_F⁻ ≅ Per(F)', W / 2, 770, p0 * P(S, 0, 5), 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('countdown  F(k) = max(k − 1, 0),  q(k) = [k > 0]', W / 2, 220, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    [1, 3, 5].forEach((k, i) => { const y = 280 + i * 80, q = P(S, 1, 1 + i * 0.5); txt('k=' + k, 330, y + 45, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.white, a: q }); for (let j = 0; j < 12; j++) { const v = j < k ? 1 : 0; fillBox(360 + j * 60, y, 52, 60, v ? C.gold : C.cyan, q * (v ? 0.7 : 0.25)); } });
    const g = P(S, 1, 5), y = 520;
    txt('k=∞ ?', 330, y + 45, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.mag, a: g });
    for (let j = 0; j < 12; j++) { ctx.setLineDash([6, 6]); box(360 + j * 60, y, 52, 60, C.mag, g * (0.5 + 0.5 * Math.sin(t * 4 + j)), 2); ctx.setLineDash([]); }
    txt('every finite window allows 1ⁿ … but no real k produces 1^∞', W / 2, 650, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 6) });
    txt('completion adds a ghost point with no source', W / 2, 720, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.mag, a: P(S, 1, 8), ab: 2 });
    thm('§37.3 · ⋂ C_n = ∅ · I_B ⊊ L_W', W / 2, 770, P(S, 1, 9), 'center');
  }
};

/* ---- 10 SHARED BIT ---- */
SCENES.sharedbit = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    ['a', 'b', 'c'].forEach((b, i) => cell(820 + i * 100, 220, 80, b, i === 2 ? C.gold : C.cyan, p0));
    txt('shared 3-bit state', W / 2, 330, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p0 });
    const gx = 300, gy = 760, gw = 380, gh = 380, L2 = v => Math.log2(v) / 3;
    plotAxes(gx, gy, gw, gh, p0 * P(S, 0, 1), '|U| (left memory, log scale)', ''); txt('|W| (right)', gx - 20, gy - gh / 2, { size: 20, fam: F.mono, align: 'right', c: C.mag, a: p0 * P(S, 0, 1) });
    [[8, 1], [4, 4], [1, 8]].forEach(([a, b], i) => { const q = p0 * P(S, 0, 2 + i * 0.6); dot(gx + L2(a) * gw, gy - L2(b) * gh, 22, 'g', q); txt(`(${a},${b})`, gx + L2(a) * gw + 26, gy - L2(b) * gh - 16, { size: 24, fam: F.mono, w: 700, c: C.gold, a: q }); });
    curve(s => [gx + s * gw, gy - (1 - s) * gh], 20, C.gold, p0 * P(S, 0, 4) * 0.5, 2);
    const q1 = P(S, 1, -3) * p0;
    txt('4 + 4 code', 1300, 420, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0 * P(S, 0, 5) });
    txt('left  u = (b, c)', 1300, 490, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 * P(S, 0, 5.5) });
    txt('right v = (a, c)', 1300, 550, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p0 * P(S, 0, 6) });
    txt('c duplicated: one control bit', 1300, 630, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 * P(S, 0, 7) });
    thm('Prop 46.1 · Pareto front (8,1), (4,4), (1,8)', 1300, 690, p0 * P(S, 0, 7), 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const R = [960, 240];
    const q = k => P(S, 1, 3 + k * 0.8);
    box(R[0] - 90, R[1] - 35, 180, 60, C.white, q(0), 2); txt('mod 2 ?', R[0], R[1] + 8, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q(0) });
    [[700, 'even', 'mod 3 ?', [['0', 0], ['10', 1]]], [1220, 'odd', 'mod 5 ?', [['15', 0], ['21', 1]]]].forEach(([x, lab, qq, leaves], i) => {
      arrow(R[0] + (i ? 60 : -60), R[1] + 25, x, 360, C.dim, q(1), 2);
      txt(lab, (R[0] + x) / 2 + (i ? 40 : -40), 320, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q(1) });
      box(x - 90, 365, 180, 60, i ? C.mag : C.cyan, q(1), 2); txt(qq, x, 405, { size: 26, fam: F.mono, w: 700, align: 'center', c: i ? C.mag : C.cyan, a: q(1) });
      leaves.forEach(([s, r], j) => { const lx = x + (j ? 110 : -110); arrow(x, 425, lx, 510, C.dim, q(2), 2); node(lx, 550, s, C.gold, q(2), 36); });
    });
    txt('adaptive: 2 questions', W / 2, 660, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.green, a: q(3) });
    txt('fixed suite: needs all 3 sensors (mod 2, 3, 5)', W / 2, 710, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.orange, a: q(3.5) });
    thm('two_step_adaptive_residue_identification · D5/S3/ConceptDynamics/Coding/AdaptiveResidueIdentification (§44.2)', W / 2, 770, q(4.5), 'center');
  }
};

/* ---- 11 QUANTUM ---- */
SCENES.quantum = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    line(260, 520, 1660, 520, C.dim, p0, 2); txt('time →', 1660, 560, { size: 22, fam: F.mono, align: 'right', c: C.dim, a: p0 });
    box(420, 300, 220, 150, C.cyan, p0, 2.5, 'rgba(0,20,30,0.6)'); txt('output B', 530, 385, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 }); txt('early', 530, 560, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p0 });
    box(1180, 300, 220, 150, C.mag, p0, 2.5, 'rgba(30,0,20,0.6)'); txt('input A', 1290, 385, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p0 }); txt('late', 1290, 560, { size: 22, fam: F.mono, align: 'center', c: C.mag, a: p0 });
    const fx = P(S, 0, 5, 1);
    curve(q => [lerp(1180, 640, q), 300 - Math.sin(q * Math.PI) * 110], 40, C.red, p0 * P(S, 0, 1.5) * (1 - fx), 4);
    txt('static table: B depends on A', W / 2, 200, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: p0 * P(S, 0, 1.5) * (1 - fx) });
    txt('causal repair:  S_σ = σ ⊗ I_A', W / 2, 200, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.green, a: p0 * fx });
    txt('min_σ D(R, σ ⊗ I_A) = Δ(R)', W / 2, 680, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 * P(S, 0, 7), ab: 2 });
    thm('Thm 54.2 · tester framework: Chiribella–D’Ariano–Perinotti (arXiv:0904.4483)', W / 2, 740, p0 * P(S, 0, 8), 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const gx = 360, gy = 690, gw = 1200, gh = 420, lo = 0.95, hi = 1.15;
    const Y = r => gy - (r - lo) / (hi - lo) * gh, E = 1 / 16;
    plotAxes(gx, gy, gw, gh, p1, 'defect ε  (0 … 1/16)', 'best repair error / ε');
    line(gx, Y(1), gx + gw, Y(1), C.cyan, P(S, 1, 1), 2); txt('decohered last output: exactly 1', gx + gw - 10, Y(1) + 30, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: P(S, 1, 1) });
    line(gx, Y(9 / 8), gx + gw, Y(9 / 8), C.gold, P(S, 1, 2) * 0.5, 1.5);
    txt('9/8', gx - 14, Y(9 / 8) + 8, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.gold, a: P(S, 1, 2) });
    curve(s => { const e = 0.001 + s * (E - 0.001); const r = 9 / 8 - (9 / 16) * Math.sqrt(e) + (255 / 256) * e; return [gx + e / E * gw, Y(r)]; }, 100, C.mag, P(S, 1, 2.5) * clamp((u - lineAt(S, 1).s - 2.5) / 2), 4);
    txt('coherent last output', gx + gw * 0.7, Y(1.06) - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 3) });
    txt('e_ε = (9/8) ε − (9/16) ε^{3/2} + (255/256) ε² + O(ε^{5/2})', W / 2, 770, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5), ab: 2 });
    thm('Thm 58.1 · Thm 61.1 · Cor 62.2 (exact for 0 < ε ≤ 1/16) · curve plotted from the expansion', W / 2, 815, P(S, 1, 6), 'center');
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const errs = [['§23', 'retracts the unconditional kernel descent of (19.3)'], ['§28', 'narrows §26–27: static ≠ dynamic boundary'], ['§33', 'two-way correspondence → one-way map'], ['§41', 'fixes §39: domains and two-sided factorization']];
    txt('PUBLIC ERRATA · appended, never erased', W / 2, 220, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.orange, a: P(S, 0, 0.3) * fade, ls: 2 });
    errs.forEach(([s, d], i) => { const q = P(S, 0, 1.5 + i * 0.8) * fade; txt(s, 470, 290 + i * 48, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.orange, a: q }); txt(d, 500, 290 + i * 48, { size: 24, fam: F.mono, c: C.white, a: q }); });
    const mods = ['CausalStateFactorization', 'CanonicalPredictiveStateSufficiency', 'InterfaceKernelCriterion', 'PredictionCompletionUniversality', 'PredictionCompletionIdempotence', 'ReachableBehaviorMinimality', 'ReadoutCoarseningKnowledge', 'FiniteCapacity', 'ControlledBehaviorUniversality', 'InverseLimitCompletion'];
    mods.forEach((m, i) => { const q = P(S, 0, 6 + i * 0.3) * fade; txt('✓ ' + m, 420 + (i % 2) * 560, 520 + Math.floor(i / 2) * 40, { size: 22, fam: F.mono, w: 700, c: C.green, a: q }); });
    txt('10 frozen Lean modules · the volume’s own combinations: paper math', W / 2, 740, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 9) * fade });
    txt('A boundary is what the future still needs.', W / 2, 800, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), cx = W / 2, cy = 360;
    for (let k = 0; k < 48; k++) { const an = k / 48 * TAU + t * 0.15; dot(cx + Math.cos(an) * 180, cy + Math.sin(an) * 110, 9, k % 2 ? 'g' : 'c', ep * out); }
    txt('BOUNDARY DYNAMICS', W / 2, 640, { size: 100, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 10 });
    txt('动 态 充 分 边 界 · TRURETURING FILM 015', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A boundary is not where space ends.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'BOUNDARY?', criterion: 'STATE CRITERION', totals: 'GLUING', xor: 'DELAYED KEY', coarsen: 'FALSE JOINT', depth: 'STABLE DEPTH', fourviews: 'FOUR VIEWS', holonomy: 'HOLONOMY', ghost: 'GHOST POINT', sharedbit: 'SHARED BIT', quantum: 'CAUSAL REPAIR', finale: 'ERRATA' });

function poster15() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const cx = W / 2, cy = 470;
  for (let i = 0; i < 260; i++) { const r = Math.sqrt(rnd(i, 3)) * 240, an = rnd(i, 5) * TAU; dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.8, 6, ['c', 'm', 'v'][i % 3], 0.7); }
  for (let k = 0; k < 60; k++) { const an = k / 60 * TAU; dot(cx + Math.cos(an) * 270, cy + Math.sin(an) * 216, 10, k % 2 ? 'g' : 'c', 1); }
  txt('边界，是未来仍然需要的东西', W / 2, 170, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('BOUNDARY DYNAMICS', W / 2, 840, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 10 });
  bloom(0.65);
  txt('动 态 充 分 边 界  ·  递归关系观察', W / 2, 920, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 015', W / 2, 975, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster15;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
