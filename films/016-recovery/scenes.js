/* Film 016 — RECOVERY GEOMETRY · 边界恢复几何. What do the readings force? */

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


/* ---- film 016 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · SETUP / PAPER STEP', C.orange, 'rgba(40,20,0,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function node(x, y, lab, col, a, r = 34) {
  if (a <= 0) return;
  ring(x, y, r, col, a, 3);
  ctx.globalAlpha = a * 0.25; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  txt(lab, x, y + r * 0.35, { size: r * 0.9, fam: F.mono, w: 700, align: 'center', c: C.white, a });
}
function plotAxes(gx, gy, gw, gh, a, xl, yl) {
  line(gx, gy, gx + gw, gy, C.dim, a, 1.5); line(gx, gy, gx, gy - gh, C.dim, a, 1.5);
  if (xl) txt(xl, gx + gw / 2, gy + 42, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a });
  if (yl) txt(yl, gx, gy - gh - 16, { size: 20, fam: F.mono, align: 'left', c: C.mag, a });
}
const Fk = (n, x, q) => (q - 1) / (2 * q) + Math.pow(x, n) / 2 + Math.pow(x, q * n) / (2 * q);
const CX1 = [0.68042929813694, 20], CX2 = [0.7773266189294558, 4.751340640338129];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  const cx = 480, cy = 450;
  for (let i = 0; i < 12; i++) { const an = t * 0.4 + i * TAU / 12; const r = 120 + 20 * Math.sin(t + i); line(cx, cy, cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.7, C.vio, sp * 0.3, 1); }
  ctx.save(); ctx.globalAlpha = sp * (0.4 + 0.2 * Math.sin(t * 2)); ctx.fillStyle = C.vio; ctx.beginPath(); ctx.arc(cx, cy, 70, 0, TAU); ctx.fill(); ctx.restore();
  txt('STATE', cx, cy + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp });
  txt('hidden', cx, cy + 120, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: sp });
  box(1150, 250, 520, 400, C.cyan, sp, 2, 'rgba(0,20,30,0.5)');
  txt('READINGS', 1410, 235, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: sp });
  for (let k = 0; k < 16; k++) { const ph = (t * 0.5 + k / 16) % 1; dot(lerp(cx + 80, 1150, ph), cy + Math.sin(k * 7) * 120 * ph, 8, 'c', sp * (1 - ph)); }
  const n = Math.min(40, Math.floor(u * 4));
  for (let i = 0; i < n; i++) { const x = 1180 + i * 12, y = 450 - 150 * Math.exp(-i / 14) + (rnd(i, 3) - 0.5) * 40; dot(x, y, 7, 'g', sp); }
  txt('noisy · finite · late', 1410, 620, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) });
  txt('what can be rebuilt? how well? at what price?', W / 2, 740, { size: 32, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 0, 5), ab: 2 });
  txt('exact constants · sharp sample counts · machine-checkable certificates', W / 2, 800, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2) });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cx = W / 2, cy = 330;
  for (let i = 0; i < 70; i++) { const an = rnd(i, 3) * TAU, r0 = 60 + rnd(i, 5) * 160; const pull = 0.5 + 0.5 * Math.sin(t * 0.8 + i * 0.3); dot(cx + Math.cos(an) * r0 * pull, cy + Math.sin(an) * r0 * pull * 0.6, 6, ['c', 'g', 'm'][i % 3], rp * 0.8); }
  ring(cx, cy, 30, C.gold, rp, 3);
  txt(scramble('RECOVERY GEOMETRY', rp, 161), W / 2, 620, { size: 104, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 10 });
  txt('边 界 恢 复 几 何', W / 2, 700, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 016 · RECURSIVE_RELATIONAL_OBSERVATION_RECOVERY_GEOMETRY', W / 2, 170, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  txt('every result exact · every result backed by frozen Lean proofs', W / 2, 770, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 3) });
  txt('what do the readings force?', W / 2, 830, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 1) });
};

/* ---- 02 ZERO SUM ---- */
SCENES.zerosum = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const eps = 0.3, x = [0.5, -0.2, -0.3], e = [eps, eps, -eps], y = x.map((v, i) => v + e[i]);
  const m = (y[0] + y[1] + y[2]) / 3, o = y.map(v => v - m);
  const zy = 470, sc = 280, p = at(S, 0, 0.6);
  line(260, zy, 1100, zy, C.dim, p, 1.5); txt('0', 240, zy + 8, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: p });
  txt('x₁ + x₂ + x₃ = 0', 680, 230, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  const p1 = at(S, 1, 0.6);
  for (let i = 0; i < 3; i++) {
    const bx = 340 + i * 260;
    fillBox(bx, Math.min(zy, zy - x[i] * sc), 60, Math.abs(x[i]) * sc, C.cyan, 0.6 * p);
    box(bx - 10, zy - (x[i] + eps) * sc, 80, 2 * eps * sc, C.gold, P(S, 0, 2), 1.5);
    dot(bx + 30, zy - y[i] * sc, 14, 'g', P(S, 0, 3));
    if (p1 > 0) { dot(bx + 110, zy - o[i] * sc, 16, 'm', P(S, 1, 2)); txt('err ' + Math.abs(o[i] - x[i]).toFixed(2), bx + 110, zy - o[i] * sc - 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 2.5) }); }
    txt('x' + '₁₂₃'[i], bx + 30, 770, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p });
  }
  txt('reading box ± ε', 1180, 360, { size: 22, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 2) });
  txt('one coordinate alone: error ε', 1180, 410, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: P(S, 0, 4) });
  if (p1 > 0) {
    txt('legal output (sum 0): subtract the mean', 1180, 480, { size: 24, fam: F.mono, w: 700, c: C.mag, a: P(S, 1, 1) });
    txt('min over all R : ℝ³ → V of worst error', 1180, 560, { size: 22, fam: F.mono, c: C.white, a: P(S, 1, 3) });
    txt('= 4ε/3', 1180, 630, { size: 60, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 4), ab: 2 });
    txt('ε = 0.3 example: 0.40 = 4/3 · 0.3', 1180, 690, { size: 20, fam: F.mono, c: C.dim, a: P(S, 1, 5) });
    thm('Thm 3.5 · zero_sum_box_recovery_sharp · …/Observer/MetricGeometry/ZeroSumBoxRecovery', W / 2, 830, P(S, 1, 6), 'center');
  }
};

/* ---- 03 PRUNE ---- */
SCENES.prune = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p = at(S, 0, 0.6), cut = P(S, 1, 0.5, 1.5);
  const cands = ['ω₁', 'ω₂', 'ω₃', 'ω₄'];
  txt('candidates C', 360, 230, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p });
  cands.forEach((c, i) => node(270 + (i % 2) * 180, 320 + Math.floor(i / 2) * 110, c, C.cyan, p, 36));
  const R = [1100, 250];
  const dq = P(S, 0, 3);
  box(R[0] - 110, R[1] - 35, 220, 60, C.orange, dq * (1 - cut), 2); txt('q₀ : all answer "0"', R[0], R[1] + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.orange, a: dq * (1 - cut) });
  if (cut > 0.05) { line(R[0] - 110, R[1] - 35, R[0] + 110, R[1] + 25, C.red, cut, 4); }
  const top = lerp(R[1] + 110, R[1], cut);
  arrow(R[0], R[1] + 30, R[0], top - 35, C.dim, dq * (1 - cut), 2);
  box(R[0] - 90, top - 35, 180, 60, C.white, dq, 2); txt('q₁ ?', R[0], top + 8, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: dq });
  [[-240, 'q₂ ?', ['ω₁', 'ω₂']], [240, 'q₃ ?', ['ω₃', 'ω₄']]].forEach(([dx, qq, lv]) => {
    const x = R[0] + dx, y = top + 140;
    arrow(R[0], top + 25, x, y - 35, C.dim, dq, 2); box(x - 70, y - 35, 140, 60, C.white, dq, 2); txt(qq, x, y + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: dq });
    lv.forEach((l, j) => { const lx = x + (j ? 80 : -80); arrow(x, y + 25, lx, y + 105, C.dim, dq, 2); node(lx, y + 140, l, C.gold, dq, 32); });
  });
  txt('same outputs · cost never rises · depth ≤ |C| − 1 = 3', W / 2, 760, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
  thm('Prop 8.9 · PassivePolicyNormalization.result (frozen)', W / 2, 815, P(S, 1, 5), 'center');
};

/* ---- 04 FIVE ---- */
SCENES.five = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p = at(S, 0, 0.6);
  txt('k_r(t) = 1/(r+2) + e^{−t}/2 + r/(2(r+2)) · e^{−(1+2/r)t}', W / 2, 225, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  txt('F_n = a · k_r(c n h)     unknown  a, c, r > 0', W / 2, 275, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) });
  const gx = 260, gy = 700, gw = 760, gh = 360;
  plotAxes(gx, gy, gw, gh, p, '', 'F_n'); txt('sample n →', gx + gw, gy + 60, { size: 20, fam: F.mono, align: 'right', c: C.cyan, a: p });
  curve(s => { const n = s * 6; return [gx + s * gw, gy - gh * Fk(n, CX1[0], CX1[1])]; }, 120, C.cyan, P(S, 0, 3), 3);
  for (let n = 0; n < 5; n++) { const q = P(S, 0, 4 + n * 0.5); dot(gx + n / 6 * gw, gy - gh * Fk(n, CX1[0], CX1[1]), 18, 'g', q); txt('F' + '₀₁₂₃₄'[n], gx + n / 6 * gw, gy + 30 - 0, { size: 18, fam: F.mono, align: 'center', c: C.gold, a: q }); }
  const p1 = at(S, 1, 0.6);
  txt('5 readings → (a, c, r) exactly', 1400, 380, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1, ab: 2 });
  const hx = 1230, hy = 450, cs = 60;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { box(hx + j * cs, hy + i * cs, cs - 6, cs - 6, C.mag, P(S, 1, 2), 1.5); txt('m' + (i + j), hx + j * cs + 27, hy + i * cs + 36, { size: 18, fam: F.mono, align: 'center', c: C.mag, a: P(S, 1, 2) }); }
  txt('Hankel window → recurrence → nodes → weights', 1400, 680, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 3) });
  thm('Thm 20.2 · prony_hankel_factorization · recurrence_window_identifies_node_roots · first_prony_moments_injective', W / 2, 800, P(S, 1, 5), 'center');
};

/* ---- 05 FOUR ---- */
SCENES.four = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p = at(S, 0, 0.6);
  const gx = 260, gy = 700, gw = 900, gh = 950, base = 0.5;
  const Y = v => gy - (v - base) * gh;
  plotAxes(gx, gy, gw, gy - Y(1.02), p, 'sample n', 'F_n');
  const L1 = P(S, 0, 1.5, 3), L2 = P(S, 0, 3, 3);
  curve(s => { const n = s * 6 * L1; return [gx + n / 6 * gw, Y(Fk(n, CX1[0], CX1[1]))]; }, 120, C.cyan, p, 3);
  curve(s => { const n = s * 6 * L2; return [gx + n / 6 * gw, Y(Fk(n, CX2[0], CX2[1]))]; }, 120, C.mag, p, 3);
  for (let n = 0; n <= 4; n++) { const q = P(S, 0, 5 + n * 0.4); dot(gx + n / 6 * gw, Y(Fk(n, CX1[0], CX1[1])), n < 4 ? 20 : 14, n < 4 ? 'g' : 'c', q); if (n === 4) dot(gx + n / 6 * gw, Y(Fk(n, CX2[0], CX2[1])), 14, 'm', q); }
  txt('agree at n = 0, 1, 2, 3', gx + 2 / 6 * gw, Y(0.9), { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) });
  txt('split at n = 4:  0.5822 vs 0.5782', gx + 4 / 6 * gw + 20, Y(0.61), { size: 22, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 7) });
  txt('r = 0.105', gx + gw - 40, Y(Fk(6, CX1[0], CX1[1])) - 14, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: L1 });
  txt('r ≈ 0.533', gx + gw - 40, Y(Fk(6, CX2[0], CX2[1])) + 30, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.mag, a: L2 });
  const p1 = at(S, 1, 0.6);
  txt('ξ ∈ [17/25, 1361/2000]', 1480, 300, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
  const bx = 1300, bw = 360;
  for (let k = 0; k < 8; k++) { const q = P(S, 1, 1 + k * 0.3); const v = 0.14 - k * 0.0235; box(bx + k * bw / 8, 380, bw / 8 - 4, 80, v > 0 ? C.cyan : C.mag, q, 2, v > 0 ? 'rgba(0,40,50,0.5)' : 'rgba(50,0,40,0.5)'); txt(v > 0 ? '+' : '−', bx + k * bw / 8 + bw / 16 - 2, 432, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); }
  txt('residual changes sign → a second detector exists', 1480, 510, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
  txt('rational intervals · accepted ⇒ enclosed', 1480, 570, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
  txt('minimum samples = 5', 1480, 650, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7), ab: 2 });
  thm('Thm 20.3 · checked_expression_encloses · curves recomputed for this film (the volume proves existence)', W / 2, 800, P(S, 1, 8), 'center');
};

/* ---- 06 DUALITY ---- */
SCENES.duality = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p = at(S, 0, 0.6), cx = 700, cy = 480;
  const hull = []; for (let k = 0; k < 60; k++) { const an = k / 60 * TAU; const r = 190 + 30 * Math.cos(an * 2) ; hull.push([cx + Math.cos(an) * r * 1.2, cy + Math.sin(an) * r * 0.9]); }
  ctx.save(); ctx.globalAlpha = p * 0.18; ctx.fillStyle = C.cyan; ctx.beginPath(); hull.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill(); ctx.restore();
  curve(s => hull[Math.min(59, Math.floor(s * 60))], 60, C.cyan, p, 3); line(hull[59][0], hull[59][1], hull[0][0], hull[0][1], C.cyan, p, 3);
  for (let i = 0; i < 90; i++) { const an = rnd(i, 3) * TAU, r = Math.sqrt(rnd(i, 5)) * 170; dot(cx + Math.cos(an) * r * 1.2, cy + Math.sin(an) * r * 0.9, 5, 'c', p * 0.7); }
  txt('realizable readings', cx, cy + 10, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  const sx = 1250, sy = 300;
  dot(sx, sy, 20, 'm', P(S, 0, 3)); txt('signature', sx + 30, sy - 20, { size: 22, fam: F.mono, w: 700, c: C.mag, a: P(S, 0, 3) });
  txt('impossible', sx + 30, sy + 10, { size: 20, fam: F.mono, c: C.red, a: P(S, 0, 4) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const an = -0.55 + 0.25 * Math.sin(t * 0.8);
    const nx = Math.cos(an), ny = Math.sin(an);
    let best = -1e9; hull.forEach(([x, y]) => { best = Math.max(best, x * nx + y * ny); });
    const px = sx - nx * (sx * nx + sy * ny - best), py = sy - ny * (sx * nx + sy * ny - best);
    line(px - ny * 400, py + nx * 400, px + ny * 400, py - nx * 400, C.gold, p1, 2.5);
    line(sx, sy, px, py, C.mag, p1, 3);
    txt('witness ‖ℓ‖ ≤ 1', 1450, 560, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    txt('distance = max violation', 1450, 620, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
    txt('finitely many protocols certify impossibility', 1450, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
    thm('closed_convex_distance_witness_duality · finite_realization_certificate · Thm 17.2, 18.1', W / 2, 800, P(S, 1, 7), 'center');
  }
};

/* ---- 07 DESCENT ---- */
SCENES.descent = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p = at(S, 0, 0.6);
  const mx = 400, my = 280, cs = 170;
  const labs = [['T_VV', 'visible → visible'], ['T_VH', 'hidden → visible'], ['T_HV', 'visible → hidden'], ['T_HH', 'hidden → hidden']];
  labs.forEach(([l, d], k) => { const i = Math.floor(k / 2), j = k % 2; const z = k === 1; const q = z ? P(S, 1, 2) : 0; box(mx + j * cs, my + i * cs, cs - 10, cs - 10, z ? C.gold : C.cyan, p, 2.5, z ? `rgba(60,45,0,${0.5 * q})` : 'rgba(0,20,30,0.5)'); txt(z && q > 0.5 ? '0' : l, mx + j * cs + (cs - 10) / 2, my + i * cs + 80, { size: z && q > 0.5 ? 60 : 30, fam: F.mono, w: 700, align: 'center', c: z ? C.gold : C.white, a: p }); txt(d, mx + j * cs + (cs - 10) / 2, my + i * cs + 130, { size: 15, fam: F.mono, align: 'center', c: C.dim, a: p }); });
  txt('V', mx - 30, my + 90, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: p }); txt('H', mx - 30, my + cs + 90, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.vio, a: p });
  const conds = ['a visible law  T̄  with  P T = T̄ P  exists', 'hidden → visible block  P T P⊥ = 0', 'P T x depends only on P x'];
  conds.forEach((c, i) => txt((i + 1) + '.  ' + c, 900, 330 + i * 90, { size: 28, fam: F.mono, w: 700, c: [C.cyan, C.gold, C.mag][i], a: P(S, 1, 1 + i * 1.5) }));
  txt('⟺  ⟺', 1200, 620, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5.5) });
  thm('linear_descent_criterion (TFAE) · …/Observer/VisibleDescent/LinearDescentCriterion · Prop 30.2', W / 2, 780, P(S, 1, 6.5), 'center');
};

/* ---- 08 FLUID ---- */
SCENES.fluid = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p = at(S, 0, 0.6), al = 1.0, be = 0.7, decay = Math.exp(-0.05 * u);
  const gx = 240, gy = 220, gs = 540, N = 14;
  box(gx, gy, gs, gs, C.dim, p, 1.5);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const X1 = (i + 0.5) / N * TAU, X2 = (j + 0.5) / N * TAU;
    const vx = be * Math.cos(X2 - X1 + t * 0.3) * decay, vy = (al * Math.cos(X1 + t * 0.2) + be * Math.cos(X2 - X1 + t * 0.3)) * decay;
    const x = gx + (i + 0.5) / N * gs, y = gy + gs - (j + 0.5) / N * gs, L = 16;
    const mag = Math.hypot(vx, vy);
    arrow(x, y, x + vx * L, y - vy * L, mag > 1.1 ? C.mag : mag > 0.6 ? C.cyan : C.vio, p * 0.9, 2);
  }
  txt('𝕋² = (ℝ/2πℤ)²', gx + gs / 2, gy - 20, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p });
  txt('u_t + (u·∇)u = ν Δu − ∇p ,  ∇·u = 0', 1300, 280, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  txt('u₀ = ( β cos(X₂−X₁) ,  α cos X₁ + β cos(X₂−X₁) )', 1300, 340, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  const p1 = at(S, 1, 0.6);
  txt('Fourier synthesis = this exact field', 1300, 440, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: p1 });
  txt('‖v ⊗ w‖_{H²} ≤ 16 ‖v‖_{H²} ‖w‖_{H²}', 1300, 530, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
  txt('every frequency kept · no truncation', 1300, 610, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4) });
  thm('synthesis_eq_realVelocity · weighted_tensor_convolution · §25, Thm 25.3', W / 2, 820, P(S, 1, 5), 'center');
};

/* ---- 09 UNIQUE ---- */
SCENES.unique = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p = at(S, 0, 0.6);
  const gx = 260, gy = 650, gw = 700, gh = 360;
  plotAxes(gx, gy, gw, gh, p, 's  (t fixed at right edge)', 'kernel (t − s)^{−1/2}');
  curve(q => { const s = q * 0.985; const k = 1 / Math.sqrt(1 - s); return [gx + s * gw, gy - Math.min(gh, k * 45)]; }, 160, C.mag, p, 3);
  txt('d(t) ≤ C ∫₀ᵗ (t − s)^{−1/2} d(s) ds', 1400, 320, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) });
  const p1 = at(S, 1, 0.6);
  const sq = Math.exp(-2 * Math.max(0, u - lineAt(S, 1).s - 1));
  const hx = 1100, hy = 600, hw = 600;
  line(hx, hy, hx + hw, hy, C.dim, p1, 1.5);
  curve(q => [hx + q * hw, hy - 120 * sq * Math.sin(q * Math.PI) * (0.6 + 0.4 * Math.sin(q * 9))], 80, C.cyan, p1, 3);
  txt('⇒  d ≡ 0', 1400, 430, { size: 48, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 1.5), ab: 2 });
  txt('sup_t ‖u_β − u_β′‖_{H²} ≤ 6 |β − β′|', 1400, 700, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
  thm('eq_zero_of_le_sqrt_kernel_integral · …/FluidDynamics/Volterra/SingularKernelUniqueness · Thm 25.3', W / 2, 800, P(S, 1, 6), 'center');
};

/* ---- 10 FLOOR ---- */
SCENES.floor = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p = at(S, 0, 0.6);
  const gx = 260, gy = 640, gw = 700, gh = 280;
  plotAxes(gx, gy, gw, gh, p, 'time t  (all t ≥ 0)', 'tracking error');
  const bound = 0.75;
  curve(q => [gx + q * gw, gy - gh * bound * (1 - Math.exp(-q * 5)) * (0.9 + 0.1 * Math.sin(q * 20 + t))], 120, C.cyan, P(S, 0, 2), 3);
  line(gx, gy - gh * bound * 1.05, gx + gw, gy - gh * bound * 1.05, C.gold, P(S, 1, 5), 2);
  txt('uniform bound, every t', gx + gw, gy - gh * bound * 1.05 - 14, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.gold, a: P(S, 1, 5) });
  txt('hidden initial layer → static effective law', 610, 250, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  const p1 = at(S, 1, 0.6), lx = 1150, lw = 560, ly = 400, c = 0.3;
  line(lx, ly, lx + lw, ly, C.dim, p1, 1.5); line(lx + c * lw, ly - 40, lx + c * lw, ly + 40, C.gold, p1, 3); txt('c', lx + c * lw, ly + 70, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
  [0.36, 0.5, 0.72, 0.9].forEach((v, i) => dot(lx + v * lw, ly, 16, 'c', P(S, 1, 1 + i * 0.3)));
  txt('spectrum of A', lx + lw / 2, ly - 50, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p1 });
  txt('c · I ≤ A   ⇒   ‖A⁻¹‖ ≤ 1/c', lx + lw / 2, 560, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
  thm('inverse_control_of_lower_bound · …/Observer/BlockStructure/UniformResolventRemainder · Thm 29.6', W / 2, 800, P(S, 1, 6), 'center');
};

/* ---- 11 LIMIT ---- */
SCENES.limit = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p = at(S, 0, 0.6);
  const gx = 360, gy = 680, gw = 1200, gh = 400, ds = 0.72;
  plotAxes(gx, gy, gw, gh, p, 'resolution level l', 'min_Q TV(P_l, Q_l)');
  const n = Math.min(14, Math.floor((u - 1) * 1.6));
  let prev = null;
  for (let l = 0; l < n; l++) { const d = ds * (1 - Math.pow(0.72, l + 1)); const x = gx + (l + 0.5) / 14 * gw, y = gy - gh * d; fillBox(x - 30, y, 60, gy - y, C.cyan, 0.45 * p); dot(x, y, 12, 'g', p); prev = [x, y]; }
  line(gx, gy - gh * ds, gx + gw, gy - gh * ds, C.gold, at(S, 1, 0.6), 2.5);
  txt('d* = sup_l d_l', gx + gw - 10, gy - gh * ds - 16, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.gold, a: at(S, 1, 0.6) });
  txt('each finite minimum attained · d_l ≤ d_{l+1}', W / 2, 230, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  txt('min over completed laws = sup of finite minima, attained by one Q∞', W / 2, 760, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
  thm('Thm 33.11 · exists_feasible_minimum_eq_iSup · …/Estimation/DataProcessing/InverseLimitFeasibleMinimum', W / 2, 815, P(S, 1, 4), 'center');
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    badge(fade * clamp(u / 0.8), 'lean');
    const rec = [['legal output costs 4ε/3, not ε', C.cyan], ['five readings, not four', C.gold], ['distance = the best witness', C.mag], ['visible law ⟺ hidden block = 0', C.green], ['limits reached one finite step at a time', C.vio]];
    rec.forEach(([r, col], i) => txt('▸ ' + r, 560, 260 + i * 70, { size: 32, fam: F.mono, w: 700, c: col, a: P(S, 0, 0.5 + i * 1.6) * fade }));
    txt('Recovery = knowing exactly what the readings force.', W / 2, 720, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), cx = W / 2, cy = 360;
    for (let i = 0; i < 70; i++) { const an = rnd(i, 3) * TAU, r0 = 40 + rnd(i, 5) * 160; const pull = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.5 + i * 0.1)); dot(cx + Math.cos(an) * r0 * pull, cy + Math.sin(an) * r0 * pull * 0.6, 6, ['c', 'g', 'm'][i % 3], ep * out); }
    txt('RECOVERY GEOMETRY', W / 2, 640, { size: 100, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 10 });
    txt('边 界 恢 复 几 何 · TRURETURING FILM 016', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('What do the readings force?', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'READINGS', zerosum: 'ZERO SUM', prune: 'PRUNING', five: 'FIVE READINGS', four: 'FOUR FAIL', duality: 'WITNESS', descent: 'DESCENT', fluid: 'FLUID', unique: 'UNIQUENESS', floor: 'SPECTRAL FLOOR', limit: 'LIMIT', finale: 'FORCED' });

function poster16() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const gx = 360, gy = 720, gw = 1200, base = 0.5, gh = 1500, Y = v => gy - (v - base) * gh;
  curve(s => { const n = s * 6; return [gx + n / 6 * gw, Y(Fk(n, CX1[0], CX1[1]))]; }, 160, C.cyan, 1, 5);
  curve(s => { const n = s * 6; return [gx + n / 6 * gw, Y(Fk(n, CX2[0], CX2[1]))]; }, 160, C.mag, 1, 5);
  for (let n = 0; n < 4; n++) dot(gx + n / 6 * gw, Y(Fk(n, CX1[0], CX1[1])), 26, 'g', 1);
  txt('四个读数不够，五个恰好', W / 2, 170, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('RECOVERY GEOMETRY', W / 2, 850, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 10 });
  bloom(0.65);
  txt('边 界 恢 复 几 何  ·  读数迫使了什么', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 016', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster16;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
