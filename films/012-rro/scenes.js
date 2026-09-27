/* Film 012 — OBSERVATION QUOTIENT · 递归关系观察. What survives the looking. */

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


/* ---- film 012 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · PAPER PROOF, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const PAL = ['c', 'm', 'g', 'v', 'o', 'n', 'w', 'r'];
const COL = { c: C.cyan, m: C.mag, g: C.gold, v: C.vio, o: C.orange, n: C.green, w: C.white, r: C.red };
/* cloud of n points collapsing into k classes; returns positions */
function collapse(cx, cy, n, k, amt, a, t, seed = 1) {
  for (let i = 0; i < n; i++) {
    const cl = i % k;
    const x0 = cx + (rnd(i, seed) - 0.5) * 560, y0 = cy + (rnd(i, seed + 1) - 0.5) * 460;
    const an = cl / k * TAU + t * 0.1, x1 = cx + Math.cos(an) * 150 + (rnd(i, 3) - 0.5) * 18, y1 = cy + Math.sin(an) * 150 + (rnd(i, 4) - 0.5) * 18;
    dot(lerp(x0, x1, amt), lerp(y0, y1, amt), 9, PAL[cl % 8], a);
  }
}
function zeckStr(n) { const F = [1, 2, 3, 5, 8, 13, 21]; let s = ''; for (let i = F.length - 1; i >= 0; i--) { if (F[i] <= n) { s += '1'; n -= F[i]; } else s += '0'; } return s.replace(/^0+(?=.)/, ''); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  const amt = ease(P(S, 0, 1.5, 3));
  collapse(W / 2, 520, 90, 6, amt, sp * (1 - P(S, 1, 0, 1)), t);
  txt(scramble('TO OBSERVE IS TO FORGET', at(S, 0, 1.2), 3), W / 2, 210, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp * (1 - P(S, 1, 0, 1)), ab: 2, ls: 4 });
  const p1 = at(S, 1, 0.8);
  if (p1 > 0) {
    const V = ['OBSERVATION', 'BOUNDARY DYNAMICS', 'CONTEXT GEOMETRY', 'EFFECTIVE RESOLUTION', 'JOINT RELATIONS · CLOCKS', 'PHASE BOUNDARY', 'PROCESS GEOMETRY', 'RECOVERY GEOMETRY', 'SFT', 'TRANSPORT · MEMORY', 'WAVE · PARTICLE · EVENTS'];
    V.forEach((v, i) => { const q = P(S, 1, 0.2 + i * 0.35); const col = i % 2 ? 0 : 1; box(W / 2 - 560 + col * 580, 200 + Math.floor(i / 2) * 82, 540, 62, C.cyan, q * 0.8, 1.2, 'rgba(0,15,25,0.7)'); txt(v, W / 2 - 290 + col * 580, 240 + Math.floor(i / 2) * 82, { size: 22, fam: F.orb, w: 900, align: 'center', c: i === 0 ? C.gold : C.cyan, a: q, ls: 2 }); });
    txt('"本卷是理论参考输入，不是 Lean 验证收据"', W / 2, 740, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.orange, a: P(S, 1, 6) });
    txt('11 volumes · ≈ 12 MB · RECURSIVE_RELATIONAL_OBSERVATION*.md', W / 2, 790, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 6) });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const rp = clamp(u / 1.2);
  const cx = W / 2, cy = 390;
  for (let lv = 0; lv < 3; lv++) {
    const R = 90 + lv * 80, n = 5 + lv * 3;
    ring(cx, cy, R, [C.cyan, C.mag, C.gold][lv], 0.25 * rp, 1);
    for (let i = 0; i < n; i++) {
      const an = i / n * TAU + t * (0.15 - lv * 0.05), an2 = (i + 1) / n * TAU + t * (0.15 - lv * 0.05);
      line(cx + R * Math.cos(an), cy + R * Math.sin(an), cx + R * Math.cos(an2), cy + R * Math.sin(an2), [C.cyan, C.mag, C.gold][lv], 0.5 * rp, 1.5);
      if (lv > 0) { const r0 = R - 80, an0 = Math.round(i / n * (n - 3)) / (n - 3) * TAU + t * (0.15 - (lv - 1) * 0.05); line(cx + R * Math.cos(an), cy + R * Math.sin(an), cx + r0 * Math.cos(an0), cy + r0 * Math.sin(an0), C.dim, 0.35 * rp, 1); }
      dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 7, ['c', 'm', 'g'][lv], rp);
    }
  }
  txt(scramble('OBSERVATION QUOTIENT', rp, 121), W / 2, 720, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 8 });
  txt('递 归 关 系 观 察', W / 2, 790, { size: 48, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 012 · RECURSIVE RELATIONAL OBSERVATION', W / 2, 180, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  txt('what survives the looking?  ·  which ghosts appear in the limit?', W / 2, 850, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 1) });
};

/* ---- 02 KERNEL ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const cls = [[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]];
    const m = P(S, 0, 1, 2);
    cls.forEach((g, k) => g.forEach((i, j) => {
      const x0 = 300 + (i % 5) * 110, y0 = 330 + Math.floor(i / 5) * 160;
      const x1 = 1100 + k * 190, y1 = 460 + (j - (g.length - 1) / 2) * 34;
      dot(lerp(x0, x1, ease(m)), lerp(y0, y1, ease(m)), 12, PAL[k], p0);
    }));
    txt('states', 520, 280, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 * (1 - m) });
    txt('reading q merges what it cannot tell apart', 1380, 300, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: m * p0 });
    const e = P(S, 0, 5, 0.6);
    if (e > 0) {
      const x = 1100 + 2 * 190, y1 = 460 - 34, y2 = 460 + 34;
      ctx.globalAlpha = e * p0; ctx.strokeStyle = C.red; ctx.setLineDash([8, 6]); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, 460, 60, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      txt('T(x) ≠ T(y), q(x) = q(y)', x, 580, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: e * p0 });
      stamp('ESCAPE', x, 680, P(S, 0, 6, 0.6) * p0, C.red, 40, -0.05);
      txt('𝓔(q;T) = ∅  ⟺  T descends to the quotient', 700, 760, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 7) * p0 });
    }
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const bx = [360, 860, 1360];
    ['x', 'q(x)', 'φ(q(x))'].forEach((s, i) => { box(bx[i] - 150, 330, 300, 110, [C.white, C.cyan, C.mag][i], P(S, 1, i * 0.8), 2, 'rgba(0,0,0,0.6)'); txt(s, bx[i], 398, { size: 34, fam: F.mono, w: 700, align: 'center', c: [C.white, C.cyan, C.mag][i], a: P(S, 1, i * 0.8) }); if (i < 2) arrow(bx[i] + 160, 385, bx[i + 1] - 160, 385, C.dim, P(S, 1, i * 0.8 + 0.4), 2.5); });
    txt('ker(φ ∘ q)  ⊇  ker q', W / 2, 560, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) });
    txt('「后处理不能细化旧核」', W / 2, 680, { size: 46, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 3, 1), ab: 2 });
    txt('Cor. 2.3', W / 2, 730, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 3) });
  }
};

/* ---- 03 HISTORY ---- */
SCENES.history = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const A = [460, 480], B = [1460, 480];
  const p = at(S, 0, 0.6), col = P(S, 0, 6, 1.5);
  dot(A[0], A[1], 22, 'w', p); dot(B[0], B[1], 22, 'w', p);
  txt('A', A[0], A[1] + 60, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: p }); txt('B', B[0], B[1] + 60, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: p });
  [[-260, C.cyan, 'w₁ : path through the north'], [260, C.mag, 'w₂ : path through the south']].forEach(([dy, c, lab], i) => {
    const q = P(S, 0, 1 + i * 1.2) * (1 - col);
    curve(s => { const x = lerp(A[0], B[0], s), y = A[1] + dy * Math.sin(Math.PI * s) + 30 * Math.sin(s * 12 + i) * Math.sin(Math.PI * s); return [x, y]; }, 120, c, q, 4);
    txt(lab, W / 2, A[1] + dy * 1.08 + (dy < 0 ? -10 : 30), { size: 22, fam: F.mono, w: 700, align: 'center', c, a: q });
  });
  if (col > 0) { arrow(A[0] + 30, A[1], B[0] - 30, B[1], C.gold, col, 4); txt('R(A, B) : "some path exists"', W / 2, A[1] - 30, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: col }); txt('w₁ ≠ w₂ is lost', W / 2, A[1] + 60, { size: 22, fam: F.mono, align: 'center', c: C.red, a: col }); }
  const p1 = at(S, 1, 0.6);
  txt('「历史必须位于数据类型中，', W / 2, 770, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5, 1), ab: 2 });
  txt('合法性证明只承担约束作用」', W / 2, 830, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 2, 1) * p1, ab: 2 });
};

/* ---- 04 CRT ---- */
SCENES.crt = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const grids = [[2, 3, 380, 'mod 2 × mod 3'], [2, 4, 1150, 'mod 2 × mod 4']];
  grids.forEach(([m, n, gx, lab], gi) => {
    const q = P(S, 0, gi * 4), c = 110, gy = 300;
    txt(lab, gx + n * c / 2, gy - 30, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: q, ls: 2 });
    for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) box(gx + j * c, gy + i * c, c - 8, c - 8, C.dim, q * 0.7, 1.2, null);
    const N = m * n, k = Math.floor(clamp((u - lineAt(S, 0).s - gi * 4 - 0.5) / 3) * N);
    const hit = new Set();
    for (let x = 0; x < k; x++) { const i = x % m, j = x % n; hit.add(i + ',' + j); }
    hit.forEach(h => { const [i, j] = h.split(',').map(Number); fillBox(gx + j * c + 4, gy + i * c + 4, c - 16, c - 16, gi ? C.mag : C.cyan, 0.55 * q); });
    for (let x = 0; x < k; x++) { const i = x % m, j = x % n; txt(String(x), gx + j * c + (c - 8) / 2 + (x >= N / 2 && gi ? 22 : 0), gy + i * c + 62, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); }
    const full = hit.size;
    txt(`${full} / ${m * n} pairs occur`, gx + n * c / 2, gy + m * c + 50, { size: 26, fam: F.mono, w: 700, align: 'center', c: gi ? C.red : C.green, a: q * clamp(k / N * 1.5) });
  });
  const p1 = at(S, 1, 0.6);
  txt('each reading legal alone · the pair has no common witness', W / 2, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
  txt('jointly free  ⟺  gcd(m, n) = 1', W / 2, 770, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
  thm('residue_realization_independent_iff_coprime · D5/S3/Factorization/PrimePowers/CompatibleResidueJointImage', W / 2, 815, P(S, 1, 6), 'center');
};

/* ---- 05 PARITY ---- */
SCENES.parity = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const st1 = P(S, 1, 0.5, 0.8), st2 = P(S, 1, 6, 0.8);
  for (let n = 0; n < 12; n++) {
    const x = 330 + n * 115, y = 440;
    let c = n % 2 ? 'm' : 'c';
    if (st1 > 0.5 && n === 0) c = 'g';
    if (st2 > 0.5) c = PAL[n % 8];
    ring(x, y, 44, COL[c], at(S, 0, 0.6), 2.5);
    txt(String(n), x, y + 12, { size: 34, fam: F.orb, w: 900, align: 'center', c: COL[c], a: at(S, 0, 0.6) });
    if (st2 > 0.5) txt('≠', x + 57, y + 10, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: st2 * (n < 11 ? 1 : 0) });
  }
  const rows = [['{ +, × }', '2 classes : even · odd', P(S, 0, 2), C.cyan], ['+ power a^b', '3 classes : {0} · evens · odds    0⁰ = 1, 0² = 0', st1, C.gold], ['+ subtraction', 'ℵ₀ classes : every number distinct', st2, C.red]];
  rows.forEach(([op, res, q, col], i) => { txt(op, 360, 620 + i * 60, { size: 26, fam: F.mono, w: 700, c: col, a: q }); txt(res, 700, 620 + i * 60, { size: 24, fam: F.mono, c: C.white, a: q }); });
  txt('Thm 11.3 · "类数依次为 2、3 和 ℵ₀"', W / 2, 820, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: st2 });
  txt('identity is relative to the operations you allow', W / 2, 280, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 0, 1), ls: 1 });
};

/* ---- 06 GHOST ---- */
SCENES.ghost = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6);
  const L = 10;
  for (let k = 0; k < 9; k++) {
    const q = P(S, 0, 0.5 + k * 0.5), y = 250 + k * 52;
    let s = ''; for (let i = 0; i < L; i++) s += i === k ? '1' : '0';
    txt(s + '…', 560, y, { size: 30, fam: F.mono, w: 700, align: 'center', c: k % 2 ? C.mag : C.cyan, a: q * p0 });
    txt(k % 2 ? 'S' : 'R', 330, y, { size: 22, fam: F.orb, w: 900, align: 'center', c: k % 2 ? C.mag : C.cyan, a: q * p0 });
  }
  txt('Y = { eₖ : a single 1 at position k }', 560, 210, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  const g = P(S, 1, 0.5, 1.5);
  if (g > 0) {
    const gx = 1330, gy = 470;
    ctx.globalAlpha = g; ctx.strokeStyle = C.gold; ctx.setLineDash([10, 8]); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(gx, gy, 95 + 6 * Math.sin(t * 3), 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    txt('0000000000…', gx, gy + 10, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: g * (0.7 + 0.3 * Math.sin(t * 4)) });
    txt('the only common middle witness', gx, gy - 130, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: g });
    txt('∉ Y  ·  a ghost', gx, gy + 150, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.gold, a: g, ls: 2 });
    for (let k = 0; k < 9; k++) arrow(760, 250 + k * 52, gx - 110, gy + (k - 4) * 10, k % 2 ? C.mag : C.cyan, g * 0.25, 1.2);
    txt('「完成复合的唯一共同中间见证不是原 Y 点」', W / 2, 780, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4, 1), ab: 2 });
    txt('finite stages recover the closure of a relation, not the relation', W / 2, 830, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: P(S, 1, 8) });
  }
};

/* ---- 07 ZECK ---- */
SCENES.zeck = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    txt('Fibonacci place values  13  8  5  3  2  1', W / 2, 230, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: p0 });
    for (let n = 0; n <= 13; n++) { const q = P(S, 0, 0.5 + n * 0.25) * p0, col = n < 7 ? 0 : 1, row = n % 7; txt(String(n).padStart(2, ' ') + '  =  ' + zeckStr(n).padStart(6, ' '), 700 + col * 520, 300 + row * 58, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); }
    txt('no two adjacent 1s', W / 2, 740, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 5) * p0 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('closed addition graph Γ', W / 2, 250, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: p1, ls: 2 });
    txt('0  +  u   →   { u , v }', W / 2, 370, { size: 54, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 1), ab: 2 });
    txt('u = …101010      v = …010101', W / 2, 440, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 2) });
    stamp('UNIT LAW FAILS', W / 2, 560, P(S, 1, 3, 0.6), C.red, 34, -0.03);
    txt('no separately continuous addition on infinite digit streams extends ℕ-addition', W / 2, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 6) });
    thm('D5/S1/Digit/Infinite/NoContinuousAdditionExtension · result', W / 2, 745, P(S, 1, 6), 'center');
  }
};

/* ---- 08 ARROW ---- */
SCENES.arrow = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const cx = 560, cy = 500, R = 200, lab = [0, 0, 1, 0, 1, 1];
  const p = at(S, 0, 0.6);
  ring(cx, cy, R, C.dim, p * 0.6, 2);
  for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + i * TAU / 6; box(cx + R * Math.cos(an) - 32, cy + R * Math.sin(an) - 32, 64, 64, lab[i] ? C.mag : C.cyan, p, 2, 'rgba(0,0,0,0.8)'); txt(String(lab[i]), cx + R * Math.cos(an), cy + R * Math.sin(an) + 12, { size: 32, fam: F.orb, w: 900, align: 'center', c: lab[i] ? C.mag : C.cyan, a: p }); }
  let pos = 0, word = ''; const steps = Math.floor((u - 0.5) * 2.5);
  for (let k = 0; k < steps; k++) { pos = (pos + (rnd(k, 9) < 0.7 ? 1 : 5)) % 6; word += lab[pos]; }
  const an = -Math.PI / 2 + pos * TAU / 6;
  dot(cx + (R - 70) * Math.cos(an), cy + (R - 70) * Math.sin(an), 18, 'g', p);
  txt('+1 w.p. p   ·   −1 w.p. q', cx, cy + 8, { size: 20, fam: F.mono, align: 'center', c: C.white, a: p });
  txt(word.slice(-28), cx, cy + R + 80, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  const gx = 1100, gy = 700, bw = 120;
  line(gx - 20, gy, gx + 4 * 170, gy, C.dim, p, 1.5);
  txt('forward vs reversed word law, window m', gx + 330, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  [1, 2, 3, 4].forEach((m, i) => { const q = P(S, 0, 1.5 + i * 1.2); const h = m === 4 ? 300 * P(S, 1, 4, 1.5) : 3; fillBox(gx + i * 170, gy - h, bw, h, m === 4 ? C.gold : C.cyan, 0.8 * q); txt('m = ' + m, gx + i * 170 + bw / 2, gy + 36, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(m < 4 ? 'D = 0' : '', gx + i * 170 + bw / 2, gy - 20, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: q }); });
  txt('J = L₀₀₁₀ − L₀₁₀₀ = (p³ − q³) / 6', gx + 330, 330, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) });
  txt('the arrow of time first appears at 4 letters', gx + 330, 380, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 6) });
  txt('Thm 98.4 · checked numerically for this film', gx + 330, 790, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 6) });
};

/* ---- 09 JOINT ---- */
SCENES.joint = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const n = Math.floor(clamp((u - 1) / 12) * 24);
  [['SHARED SOURCE', 0, 420], ['INDEPENDENT', 1, 1500]].forEach(([nm, w, cx]) => {
    const q = P(S, 0, 0.5 + w * 1.5);
    txt(nm, cx, 250, { size: 30, fam: F.orb, w: 900, align: 'center', c: w ? C.mag : C.cyan, a: q, ls: 3 });
    let agree = 0;
    for (let k = 0; k < n; k++) { const a = rnd(k, 5) < 0.5 ? 1 : 0; const b = w ? (rnd(k, 18) < 0.5 ? 1 : 0) : a; if (a === b) agree++; const x = cx - 280 + (k % 12) * 48, y = 330 + Math.floor(k / 12) * 110; txt(String(a), x, y, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); txt(String(b), x, y + 40, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q }); if (P(S, 1, 0.5) > 0) fillBox(x - 16, y + 50, 32, 6, a === b ? C.green : C.red, P(S, 1, 0.5) * q); }
    txt('each clock alone: fair 0 / 1', cx, 600, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q });
    txt(`agree: ${n ? Math.round(agree / n * 100) : 0}%`, cx, 680, { size: 40, fam: F.orb, w: 900, align: 'center', c: w ? C.gold : C.green, a: P(S, 1, 1) * q });
    txt(w ? '(→ 1/2)' : '(always 1)', cx, 720, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 1) * q });
  });
  txt('相同的边缘时钟律  ⇏  相同的联合时钟协议', W / 2, 810, { size: 38, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 5, 1), ab: 2 });
};

/* ---- 10 CAPACITY ---- */
SCENES.capacity = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    txt('receiver memory dimension · five read-out terminals', W / 2, 260, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
    for (let d = 1; d <= 8; d++) {
      const x = 340 + (d - 1) * 180, q = P(S, 0, 1 + d * 0.5) * p0;
      const ok = d === 7, bad = d <= 6;
      box(x - 70, 360, 140, 140, ok ? C.green : bad ? C.red : C.dim, q, ok ? 3 : 1.5, 'rgba(0,0,0,0.7)');
      txt(String(d), x, 450, { size: 56, fam: F.orb, w: 900, align: 'center', c: ok ? C.green : bad ? C.red : C.dim, a: q });
      if (bad) { line(x - 50, 380, x + 50, 480, C.red, q * 0.8, 3); }
    }
    txt('d_CPTP,5 = 7', W / 2, 620, { size: 50, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 7) * p0, ab: 2 });
    txt('PHASE_BOUNDARY Thm 26.1 (≥ 6) + Thm 36.1 (= 7)', W / 2, 670, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 7) * p0 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const gx = 360, gy = 740, bw = 50;
    line(gx - 20, gy, gx + 1250, gy, C.dim, p1, 1.5);
    const b = 1 - P(S, 1, 2, 5), deg = b < 0.02;
    for (let N = 2; N <= 9; N++) {
      const x = gx + (N - 2) * 150, h1 = (2 * N - 1) * 26, h2 = (N + 1) * 26, h = deg ? h2 : h1;
      fillBox(x, gy - h, bw, h, deg ? C.mag : C.cyan, 0.75 * p1);
      txt('N=' + N, x + bw / 2, gy + 30, { size: 18, fam: F.mono, align: 'center', c: C.white, a: p1 });
      txt(String(deg ? N + 1 : 2 * N - 1), x + bw / 2, gy - h - 12, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    }
    txt(`amplitude b = ${b.toFixed(2)}`, 1500, 280, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    txt(deg ? 'd_N = N + 1  (ab = 0)' : 'd_N = 2N − 1  (ab ≠ 0)', 1500, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: deg ? C.mag : C.cyan, a: p1 });
    txt('「精确容量在端点下降 N−2」', 1500, 400, { size: 32, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7, 1), ab: 2 });
    txt('Thm 9.2', 1500, 440, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 7) });
  }
};

/* ---- 11 LEAN ---- */
SCENES.lean = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const cards = [
    ['joint residues are free ⟺ coprime', 'residue_realization_independent_iff_coprime', 0, 0.5],
    ['no continuous digit addition extends ℕ', 'NoContinuousAdditionExtension.result', 0, 3],
    ['longest zero run needs ≥ (q+1)^(q−1) states', 'source_family_separates', 0, 6],
    ['lag-m certificate ⇒ exchange chain ≤ 2m − 1', 'compatible_exchange_chain_bound', 1, 0.5],
    ['golden lattice completion of index 2', 'golden_maximal_order_completion', 1, 3],
    ['discounted distance = γ^(first difference)', 'first_difference_power_law', 1, 6]];
  cards.forEach(([a, b, ln, off], i) => {
    const q = P(S, ln, off), x = 180 + (i % 3) * 540, y = 250 + Math.floor(i / 3) * 260;
    box(x, y, 500, 200, C.green, q, 2, 'rgba(0,30,15,0.7)');
    txt(a, x + 250, y + 80, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt(b, x + 250, y + 130, { size: 15, fam: F.mono, align: 'center', c: C.green, a: q });
  });
  txt('most of RRO is paper mathematics · these few are frozen in the kernel', W / 2, 820, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 7) });
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const x0 = 260, x1 = 1660, y0 = 300, h = 300;
    const depth = Math.floor(1 + P(S, 0, 0.3, 7) * 5);
    for (let d = 0; d < depth; d++) {
      const n = 2 ** d, y = y0 + d * (h / 5);
      for (let i = 0; i < n; i++) { const w = (x1 - x0) / n; const rem = d === depth - 1 && i === n - 1; fillBox(x0 + i * w + 2, y, w - 4, h / 5 - 8, rem ? C.dim : PAL[i % 6] === 'c' ? C.cyan : [C.cyan, C.mag, C.gold, C.vio, C.orange, C.green][i % 6], (rem ? 0.3 : 0.35) * fade); }
    }
    txt('distinctions refine with every kept record · a remainder stays unsplit', W / 2, 260, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) * fade });
    txt('「保留原始事件并修正解释」', W / 2, 720, { size: 44, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 0, 5, 1) * fade, ab: 2 });
    txt('观察就是遗忘 · 纪律是精确知道忘了什么', W / 2, 800, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 0.3, 1) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    collapse(W / 2, 360, 60, 5, 0.85, ep * out * 0.9, t, 7);
    txt('OBSERVATION QUOTIENT', W / 2, 650, { size: 90, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 8 });
    txt('递 归 关 系 观 察 · TRURETURING FILM 012', W / 2, 720, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('To observe is to forget. Know exactly what you forgot.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'FORGETTING', kernel: 'ESCAPE', history: 'WITNESS', crt: 'JOINT IMAGE', parity: 'IDENTITY', ghost: 'GHOST POINT', zeck: 'DIGIT ADDITION', arrow: 'ARROW OF TIME', joint: 'TWO CLOCKS', capacity: 'CAPACITY', lean: 'KERNEL', finale: 'REMAINDER' });

function poster12() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  collapse(W / 2, 470, 120, 6, 0.55, 1, t, 3);
  txt('观察就是遗忘', W / 2, 160, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('OBSERVATION QUOTIENT', W / 2, 850, { size: 104, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 8 });
  bloom(0.65);
  txt('递 归 关 系 观 察  ·  看过之后，什么留了下来？', W / 2, 930, { size: 40, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 012', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster12;
