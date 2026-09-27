/* Film 017 — CONTEXT GEOMETRY · 可执行上下文几何. Sameness depends on the experiments you may run. */

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


/* ---- film 017 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    theory: ['THEORY VOLUME · PAPER PROOF', C.orange, 'rgba(40,20,0,0.75)'],
    classic: ['KNOWN PHYSICS · CREDITED IN THE VOLUME', C.vio, 'rgba(20,10,40,0.75)'],
    open: ['OPEN · NOT YET DECIDED', C.mag, 'rgba(40,0,30,0.75)']
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
function cell(x, y, s, v, col, a) { box(x, y, s, s, col, a, 2, 'rgba(0,0,0,0.5)'); txt(String(v), x + s / 2, y + s * 0.66, { size: s * 0.45, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function plotAxes(gx, gy, gw, gh, a, xl, yl) {
  line(gx, gy, gx + gw, gy, C.dim, a, 1.5); line(gx, gy, gx, gy - gh, C.dim, a, 1.5);
  if (xl) txt(xl, gx + gw / 2, gy + 42, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a });
  if (yl) txt(yl, gx, gy - gh - 16, { size: 20, fam: F.mono, align: 'left', c: C.mag, a });
}
/* triangle builder T(n,0)=a_n, T(n,k+1)=T(n+1,k)-sum_j T(n,j) a_{k-j} */
function tri17(a, K) {
  const T = []; const N = a.length;
  for (let n = 0; n < N; n++) { T[n] = [a[n]]; }
  for (let k = 0; k < K; k++) for (let n = 0; n < N - k - 1; n++) { let s = T[n + 1][k]; for (let j = 0; j <= k; j++) s -= T[n][j] * a[k - j]; T[n][k + 1] = s; }
  return T;
}
const TRI_A = tri17([1, 2, 6, 24, 118, 674, 4308], 6), TRI_M = tri17([-1, -1, -1, -1, -1, -1, -1], 6);
/* no-k-ones sequences: lambda_k solves sum_{j=1..k} x^-j = 1 */
function lamk(k) { let lo = 1, hi = 2; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; let s = 0; for (let j = 1; j <= k; j++) s += Math.pow(m, -j); if (s > 1) lo = m; else hi = m; } return (lo + hi) / 2; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  const cx = [640, 1280];
  cx.forEach((x, i) => { ring(x, 420, 110, i ? C.mag : C.cyan, sp, 3); for (let k = 0; k < 18; k++) { const an = k / 18 * TAU + t * 0.3 * (i ? -1 : 1); dot(x + Math.cos(an) * 70, 420 + Math.sin(an) * 70, 6, i ? 'm' : 'c', sp * 0.8); } txt(i ? 'y' : 'x', x, 432, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: sp }); });
  const n = Math.min(8, Math.floor(u * 1.2));
  for (let k = 0; k < n; k++) { const y = 260 + k * 40, ph = (t * 0.5 + k * 0.12) % 1; line(cx[0] + 120, 420, W / 2, y, C.dim, sp * 0.4, 1); line(cx[1] - 120, 420, W / 2, y, C.dim, sp * 0.4, 1); dot(W / 2, y, 8, k === 5 ? 'g' : 'v', sp); }
  txt('allowed experiments', W / 2, 230, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.vio, a: sp });
  txt('same  ⟺  no allowed experiment tells them apart', W / 2, 650, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  txt('D(x, y) = sup over contexts C, readouts f   ρ(f(Cx), f(Cy)) / gain(C)', W / 2, 740, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const labs = [['SPACE', C.cyan], ['TIME', C.mag], ['MEMORY', C.gold]];
  labs.forEach(([l, col], i) => { const x = W / 2 + (i - 1) * 300, y = 330 + Math.sin(t + i) * 10; box(x - 110, y - 50, 220, 100, col, rp, 2, 'rgba(0,0,0,0.5)'); txt(l, x, y + 12, { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a: rp, ls: 2 }); if (i < 2) arrow(x + 115, y, x + 185, y, C.dim, rp, 2); });
  txt(scramble('CONTEXT GEOMETRY', rp, 171), W / 2, 620, { size: 104, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 10 });
  txt('可 执 行 上 下 文 几 何', W / 2, 700, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 017 · RECURSIVE_RELATIONAL_OBSERVATION_CONTEXT_GEOMETRY', W / 2, 170, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  txt('fix the allowed contexts first · then one geometry for all', W / 2, 780, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 1) });
};

/* ---- 02 FAILURE ---- */
SCENES.failure = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  const pts = [['a', 360, '0', C.cyan], ['b', 960, 'FAIL', C.red], ['c', 1560, '1', C.gold]];
  pts.forEach(([n, x, r, col], i) => { node(x, 330, n, C.white, p, 44); arrow(x, 380, x, 460, C.dim, P(S, 0, 1 + i * 0.6), 2); box(x - 70, 470, 140, 60, col, P(S, 0, 1 + i * 0.6), 2, 'rgba(0,0,0,0.5)'); txt(r, x, 512, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: P(S, 0, 1 + i * 0.6) }); });
  txt('experiment e', 960, 250, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p });
  const p1 = at(S, 1, 0.6), heal = P(S, 1, 6, 1);
  if (p1 > 0) {
    const ds = heal < 0.5 ? ['0', '0', '1'] : ['1', '1', '1'];
    line(360, 620, 960, 620, heal < 0.5 ? C.green : C.gold, p1, 3); txt('d(a,b) = ' + ds[0], 660, 605, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    line(960, 620, 1560, 620, heal < 0.5 ? C.green : C.gold, p1, 3); txt('d(b,c) = ' + ds[1], 1260, 605, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    curve(q => [lerp(360, 1560, q), 660 + Math.sin(q * Math.PI) * 60], 40, C.red, p1 * (1 - heal), 3); curve(q => [lerp(360, 1560, q), 660 + Math.sin(q * Math.PI) * 60], 40, C.gold, heal, 3);
    txt('d(a,c) = 1', 960, 750, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('1 > 0 + 0 : triangle inequality breaks', W / 2, 810, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 2) * (1 - heal) });
    txt('keep FAIL as an outcome → a genuine distance', W / 2, 810, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: heal });
    thm('Prop 1.3', W / 2, 850, P(S, 1, 3), 'center');
  }
};

/* ---- 03 FIXED POINT ---- */
SCENES.fixedpoint = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  txt('D^[N+1] = max{ current readout gap ,  sup_h D^[N](hx, hy) / L_h }', W / 2, 230, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  const gx = 360, gy = 640, gw = 700, gh = 330;
  plotAxes(gx, gy, gw, gh, p, 'depth N', 'D^[N]');
  const n = Math.min(10, Math.floor((u - 1.5) * 1.5));
  for (let N = 0; N < n; N++) { const v = 0.85 * (1 - Math.pow(0.6, N + 1)); fillBox(gx + 20 + N * 66, gy - gh * v, 46, gh * v, C.cyan, 0.6 * p); }
  line(gx, gy - gh * 0.85, gx + gw, gy - gh * 0.85, C.gold, P(S, 0, 5), 2); txt('D = least fixed point', gx + gw - 10, gy - gh * 0.85 - 14, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.gold, a: P(S, 0, 5) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const hx = 1250, hy = 640;
    txt('demand  L_id = 1/2  for "do nothing"', 1450, 300, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: p1 });
    const m = Math.min(7, Math.floor((u - lineAt(S, 1).s) * 1.2));
    for (let j = 0; j < m; j++) { const v = Math.pow(2, j) * 12; fillBox(hx + j * 60, hy - Math.min(300, v), 40, Math.min(300, v), C.red, 0.7); txt('×2', hx + j * 60 + 20, hy + 30, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: p1 }); }
    txt('c · L^{−n} → ∞', 1450, 380, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3), ab: 2 });
    txt('finiteness cannot be bought', 1450, 720, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) });
  }
  thm('Thm 2.2 · Prop 2.3 · Prop 2.5', W / 2, 820, P(S, 1, 6), 'center');
};

/* ---- 04 NEXT STEP ---- */
SCENES.nextstep = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), up = P(S, 0, 5, 1.2);
  [[0, 0], [0, 1]].forEach((xy, i) => {
    const x0 = 420 + i * 520, y = 300;
    const v = up > 0.5 ? [xy[1], 0] : xy;
    v.forEach((b, j) => { cell(x0 + j * 110, y, 96, b, j === 0 ? C.gold : C.dim, p); });
    box(x0 - 8, y - 8, 112, 112, C.gold, p, 3);
    txt(up > 0.5 ? 'after h(a,b) = (b,0)' : 'read first bit', x0 + 100, y + 150, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p });
  });
  txt(up > 0.5 ? 'distance 1' : 'distance 0', 1500, 360, { size: 40, fam: F.mono, w: 700, align: 'center', c: up > 0.5 ? C.red : C.cyan, a: p, ab: 2 });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const nodes = [[960, 520, 'g'], [760, 640, 'h'], [1160, 640, 'k'], [660, 760, 'leaf'], [860, 760, 'leaf'], [1160, 760, 'leaf']];
    [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]].forEach(([a, b]) => line(nodes[a][0], nodes[a][1], nodes[b][0], nodes[b][1], C.dim, p1, 2));
    nodes.forEach(([x, y, l], i) => node(x, y, l === 'leaf' ? 'ε' : 'δ', i < 3 ? C.mag : C.cyan, P(S, 1, 0.5 + i * 0.2), 26));
    txt('E(g(T₁…T_m)) = δ_g + Σ L_{g,i} · E(T_i)', W / 2, 830, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
    thm('Prop 7.2 · Thm 6.2 (defect budget over a composition tree)', W / 2, 870, P(S, 1, 5), 'center');
  }
};

/* ---- 05 XOR ---- */
SCENES.xor = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), flip = Math.floor(t * 1.2) % 2;
  [['WORLD P : (U, U)', [flip, flip], C.cyan], ['WORLD Q : (U, 1−U)', [flip, 1 - flip], C.mag]].forEach(([l, v, col], i) => {
    const x = 380 + i * 760, y = 300;
    txt(l, x + 160, y - 30, { size: 26, fam: F.orb, w: 700, align: 'center', c: col, a: p });
    v.forEach((b, j) => cell(x + 60 + j * 130, y, 100, b, col, p));
    txt('each slot: fair coin', x + 160, y + 150, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) });
    const q = P(S, 1, 0.5);
    txt('XOR → ' + (v[0] ^ v[1]), x + 160, y + 230, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
    txt(i ? 'always 1' : 'always 0', x + 160, y + 280, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: q });
  });
  txt('same marginals · output distance 1', W / 2, 700, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2), ab: 2 });
  txt('U ⊕ U = 0   but   U ⊕ V (fresh draw) = fair coin', W / 2, 770, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
  thm('Prop 5.3 · Prop 5.5', W / 2, 820, P(S, 1, 6), 'center');
};

/* ---- 06 GOLDEN ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  /* binary tree of words without "11", depth 7 */
  const depth = Math.min(8, Math.floor(u * 0.9) + 1);
  const x0 = 240, y0 = 250, w = 760, h = 460;
  let level = [['', x0 + w / 2]];
  for (let d = 0; d < depth; d++) {
    const nxt = [];
    level.forEach(([s, x]) => {
      const span = w / Math.pow(2, d + 2);
      ['0', '1'].forEach((c, j) => { if (c === '1' && s.endsWith('1')) return; const nx = x + (j ? span : -span); line(x, y0 + d * h / 8, nx, y0 + (d + 1) * h / 8, j ? C.gold : C.cyan, p * 0.7, 1.5); nxt.push([s + c, nx]); });
    });
    level = nxt;
  }
  txt('no "11" : words counted by Fibonacci', x0 + w / 2, y0 - 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  txt('Σ_{j=1..k} λ_k^{−j} = 1', 1450, 300, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  txt('dim_H = log λ_k / log 2', 1450, 370, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 5), ab: 2 });
  const p1 = at(S, 1, 0.6);
  for (let k = 2; k <= 7; k++) { const D = Math.log(lamk(k)) / Math.log(2), q = P(S, 1, 0.5 + (k - 2) * 0.5); fillBox(1200 + (k - 2) * 80, 700 - D * 250, 56, D * 250, k === 2 ? C.gold : C.cyan, 0.7 * q); txt('k=' + k, 1228 + (k - 2) * 80, 730, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); if (k === 2) txt('0.694', 1228, 700 - D * 250 - 12, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); }
  line(1190, 450, 1690, 450, C.dim, p1, 1); txt('1', 1180, 456, { size: 18, fam: F.mono, align: 'right', c: C.dim, a: p1 });
  txt('k = 2 : λ = φ (golden ratio)', 1450, 790, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 1) });
  thm('Thm 9.18 · Parry construction credited', W / 2, 840, P(S, 1, 4), 'center');
};

/* ---- 07 BELL ---- */
SCENES.bell = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'classic');
  const p = at(S, 0, 0.6);
  [['|Φ₊⟩ = (|00⟩ + |11⟩)/√2', C.cyan], ['|Φ₋⟩ = (|00⟩ − |11⟩)/√2', C.mag]].forEach(([l, col], i) => {
    const y = 270 + i * 200;
    txt(l, 560, y, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: p });
    qubit(420, y + 80, 44, 0, 0, 0, col, t); ring(420, y + 80, 44, col, p * 0.6, 2);
    qubit(700, y + 80, 44, 0, 0, 0, col, t); ring(700, y + 80, 44, col, p * 0.6, 2);
    for (let k = 0; k < 4; k++) curve(q => [lerp(470, 650, q), y + 80 + Math.sin(q * TAU * 2 + t * 3 + k) * 10], 30, col, p * 0.4, 1.5);
    txt('I/2', 420, y + 140, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) }); txt('I/2', 700, y + 140, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) });
  });
  txt('local states identical', 560, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    [['undo coupling, then read X', '± told apart perfectly', C.green], ['measure first', 'both give ½|00⟩⟨00| + ½|11⟩⟨11|', C.red]].forEach(([a, b, col], i) => { const y = 330 + i * 200, q = P(S, 1, 0.5 + i * 2); box(1080, y - 50, 640, 140, col, q, 2, 'rgba(0,0,0,0.5)'); txt(a, 1400, y, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(b, 1400, y + 50, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q }); });
    txt('recovery depends on the order of access', W / 2, 760, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5), ab: 2 });
    thm('Prop 11.14 · no-cloning Thm 11.15 · Choi–Kraus via Watrous', W / 2, 810, P(S, 1, 6), 'center');
  }
};

/* ---- 08 ORDER ---- */
SCENES.order = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  txt('A(x) = 1 − x      B(x) = 0', W / 2, 230, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  [['A then B', ['A', 'B'], 0], ['B then A', ['B', 'A'], 1]].forEach(([l, ops, res], i) => {
    const y = 360 + i * 190, q = P(S, 0, 1.5 + i * 1.5);
    txt(l, 380, y + 12, { size: 28, fam: F.orb, w: 700, align: 'center', c: i ? C.mag : C.cyan, a: q });
    cell(560, y - 45, 90, 'x', C.white, q);
    ops.forEach((o, j) => { arrow(660 + j * 220, y, 780 + j * 220, y, C.dim, q, 2.5); box(790 + j * 220, y - 40, 80, 80, C.gold, q, 2, 'rgba(40,30,0,0.5)'); txt(o, 830 + j * 220, y + 12, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); });
    arrow(1100, y, 1200, y, C.dim, q, 2.5);
    cell(1210, y - 45, 90, res, i ? C.mag : C.cyan, P(S, 1, 0.5 + i));
    txt('cost 2', 1420, y + 12, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
  });
  txt('same cost · different result', W / 2, 720, { size: 32, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
  txt('endpoint clock exists ⟺ c(I,e) + c(I+e,f) = c(I,f) + c(I+f,e)', W / 2, 780, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4) });
  thm('Prop 13.15 · Thm 13.13', W / 2, 830, P(S, 1, 5), 'center');
};

/* ---- 09 ODOMETER ---- */
SCENES.odometer = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  const base = 4, x0 = 11, k = 2, PP = Math.pow(base, k);
  const tick = Math.max(0, Math.min(20, Math.floor((u - 1) * 1.1)));
  const v = x0 + tick;
  const dig = n => { const d = []; for (let i = 0; i < 5; i++) { d.push(n % base); n = Math.floor(n / base); } return d.reverse(); };
  const ds = dig(v);
  ds.forEach((d, i) => { const watched = i === 4 - k; cell(560 + i * 120, 280, 100, watched ? d : (i > 4 - k ? '?' : d), watched ? C.gold : (i > 4 - k ? C.dim : C.cyan), p); });
  txt('base 4 odometer · +1 per tick · watch digit k = 2 only', W / 2, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  txt('tick ' + tick, W / 2, 440, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p });
  const tau = PP - (x0 % PP);
  const hit = tick >= tau;
  txt(hit ? `digit changed at τ = ${tau}` : 'waiting… hidden low digits unseen', W / 2, 500, { size: 26, fam: F.mono, w: 700, align: 'center', c: hit ? C.gold : C.dim, a: P(S, 0, 2) });
  const p1 = at(S, 1, 0.6);
  txt('hidden remainder  r = P − τ', W / 2, 600, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1, ab: 2 });
  txt(`here P = ${PP}, τ = ${tau}  ⇒  r = ${PP - tau}  (x = 11 ≡ 11 mod 16)`, W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) });
  txt('P readings suffice · fewer never do', W / 2, 730, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.green, a: P(S, 1, 4) });
  thm('Thm 24.8 · Thm 24.9 · p-adic kernel/metric: Gouvêa', W / 2, 800, P(S, 1, 5), 'center');
};

/* ---- 10 TRIANGLE ---- */
SCENES.triangle = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const l1 = at(S, 1, 0.6) > 0.5;
  const T = l1 ? TRI_M : TRI_A;
  const p = at(S, 0, 0.6), cs = 84, gx = 300, gy = 220;
  const shown = Math.min(28, Math.floor(((l1 ? u - lineAt(S, 1).s : u) - 0.5) * 3));
  let c = 0;
  for (let k = 0; k <= 6; k++) for (let n = 0; n + k <= 6; n++) {
    if (c++ >= shown) continue;
    const v = T[n][k];
    const col = k === 0 ? C.cyan : (n === 0 ? C.gold : C.white);
    box(gx + k * cs, gy + n * 70, cs - 8, 60, col, p, 1.5, 'rgba(0,0,0,0.5)');
    txt(String(v), gx + k * cs + (cs - 8) / 2, gy + n * 70 + 40, { size: Math.abs(v) > 999 ? 18 : 22, fam: F.mono, w: 700, align: 'center', c: col, a: p });
  }
  txt('boundary column', gx + 40, gy - 20, { size: 18, fam: F.mono, align: 'center', c: C.cyan, a: p });
  txt('T(n,k+1) = T(n+1,k) − Σ_j T(n,j) · a_{k−j}', 1400, 290, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  txt('integers only · no division', 1400, 340, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 3) });
  if (!l1) txt('top row: 1 1 1 1 1 1 1', 1400, 440, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6), ab: 2 });
  else {
    txt('all −1 boundary', 1400, 440, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 1) });
    txt('rows: −1, −2, −5, −13, −34, …', 1400, 500, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
    txt('= −F₁, −F₃, −F₅, −F₇, −F₉  (every other Fibonacci)', 1400, 555, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 3) });
    txt('max |T(n,k)| over boundaries in [−A,A] = u_k(A)', 1400, 630, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 5) });
  }
  thm('Thm 43.2 · §46.2–46.3 · array: Kurkov OEIS A392095 · source eq.: Hanna OEIS A088713 · Morgan–Voyce: Swamy 1966', W / 2, 820, P(S, 0, 4), 'center');
};

/* ---- 11 SPARSE ---- */
SCENES.sparse = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const gx = 320, cw = 88;
  txt('A = 1/20 · weight ρ = 4/5 · target distance 1/36', W / 2, 240, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  [['contiguous prefix', [0, 1, 2, 3, 4, 5, 6, 7], C.cyan, 330, p], ['scattered support', [0, 1, 2, 3, 11], C.gold, 520, p1]].forEach(([l, S0, col, y, q]) => {
    txt(l, gx - 20, y + 45, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: q });
    for (let i = 0; i < 14; i++) { const on = S0.indexOf(i) >= 0; box(gx + i * cw, y, cw - 8, 70, on ? col : C.dim, q * (on ? 1 : 0.4), 2, on ? 'rgba(40,30,0,0.4)' : 'rgba(0,0,0,0.3)'); txt(String(i), gx + i * cw + (cw - 8) / 2, y + 45, { size: 20, fam: F.mono, align: 'center', c: on ? col : C.dim, a: q }); }
    txt(S0.length + ' read', gx + 14 * cw + 20, y + 45, { size: 26, fam: F.mono, w: 700, c: col, a: q });
  });
  txt('shortest contiguous: 8 · fewest entries: 5 · four never suffice', W / 2, 690, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
  txt('how many you read ≠ how far you read', W / 2, 760, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
  thm('§48 (N_min = 8) · §50.6–50.7 (support {0,1,2,3,11}, m_sp = 5)', W / 2, 815, P(S, 1, 6), 'center');
};

/* ---- 12 DIAL ---- */
SCENES.dial = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), cx = 520, cy = 480, R = 230;
  const path = [[0, 'S', 'read'], [2, 'G₂', 'read'], [4, 'G₄', 'read'], [6, 'G₁', 'read'], [6, 'H₁₃', 'halt']];
  const p1 = at(S, 1, 0.6);
  const prog = p1 > 0 ? Math.min(4, Math.floor((u - lineAt(S, 1).s - 3) * 0.8)) : -1;
  const E = prog >= 0 ? path[Math.max(0, prog)][0] : 0;
  const pos = (13 + E) % 25;
  for (let i = 0; i < 25; i++) { const an = -Math.PI / 2 + (i - (p1 > 0 ? pos : 0)) / 25 * TAU; const x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R; const top = Math.floor(i / 5); dot(x, y, i === (p1 > 0 ? pos : 0) ? 16 : 8, ['c', 'm', 'g', 'v', 'c'][top], p); txt(String(top), cx + Math.cos(an) * (R + 34), cy + Math.sin(an) * (R + 34) + 7, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: p * 0.8 }); }
  arrow(cx, cy - R - 70, cx, cy - R - 20, C.gold, p, 3);
  txt('read top digit', cx, cy - R - 80, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p });
  txt(p1 > 0 ? String(Math.floor(pos / 5)) : '?', cx, cy + 20, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p });
  txt('W : wait (+1)   R : read top digit   H : halt naming x', 1330, 260, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  txt('reads: 1 + ⌈log₂ 5⌉ = 4 (optimal)', 1330, 320, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 4) });
  txt('C_B(5,1) = 51 = 11 read + 15 wait + 25 halt', 1330, 380, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6), ab: 2 });
  if (p1 > 0) {
    path.forEach(([e, st, kind], i) => { const q = i <= prog ? 1 : 0.2; const y = 460 + i * 58; node(1060, y, '', kind === 'halt' ? C.green : C.gold, p1 * q, 18); txt(`${st}   waits ${e}${kind === 'read' ? '   reads ' + Math.floor(((13 + e) % 25) / 5) : ''}`, 1100, y + 8, { size: 24, fam: F.mono, w: 700, c: kind === 'halt' ? C.green : C.white, a: p1 * q }); });
    thm('Def 60.3 · Thm 60.4 · Thm 55.4 · x = 13', W / 2, 840, P(S, 1, 8), 'center');
  }
};

/* ---- 13 NINE ---- */
SCENES.nine = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'open']);
  const p = at(S, 0, 0.6);
  const gx = 260, gw = 1400, y = 430, lo = 90, hi = 110;
  const X = v => gx + (v - lo) / (hi - lo) * gw;
  line(gx, y, gx + gw, y, C.dim, p, 2);
  for (let v = lo; v <= hi; v += 2) { line(X(v), y - 10, X(v), y + 10, C.dim, p, 1.5); txt(String(v), X(v), y + 40, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p }); }
  fillBox(X(96), y - 40, X(105) - X(96), 80, C.gold, 0.18 * P(S, 0, 2));
  line(X(96), y - 60, X(96), y + 60, C.cyan, P(S, 0, 2), 4); txt('96 lower bound', X(96), y - 75, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) });
  line(X(105), y - 60, X(105), y + 60, C.gold, P(S, 0, 3), 4); txt('105 explicit table', X(105), y - 75, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) });
  txt('27-position dial · ternary digit · 5 reads optimal', W / 2, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    fillBox(X(96), y - 40, X(104.5) - X(96), 80, C.mag, 0.15 * p1);
    txt('≤ 1 collision of waiting chains ⇒ C ≥ 105', W / 2, 600, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1, ab: 2 });
    txt('≤ 104 needs ≥ 2 collisions : OPEN', W / 2, 670, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 3) });
  }
  thm('Thm 62.15 (105) · Thm 64.20 (96) · Thm 70.13 (tail E ≥ 20) · Cor 83.17 (J ≤ 1)', W / 2, 780, P(S, 0, 4), 'center');
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const rec = [['failure is an outcome', C.red], ['distance = least fixed point', C.cyan], ['same marginals ≠ same joint', C.mag], ['order of access decides recovery', C.vio], ['51 states, exactly', C.gold]];
    rec.forEach(([r, col], i) => txt('▸ ' + r, 600, 260 + i * 70, { size: 32, fam: F.mono, w: 700, c: col, a: P(S, 0, 0.5 + i * 1.2) * fade }));
    txt('Sameness depends on the experiments you are allowed to run.', W / 2, 720, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    for (let i = 0; i < 25; i++) { const an = -Math.PI / 2 + i / 25 * TAU + t * 0.2; dot(W / 2 + Math.cos(an) * 190, 340 + Math.sin(an) * 120, 10, ['c', 'm', 'g', 'v', 'c'][Math.floor(i / 5)], ep * out); }
    txt('CONTEXT GEOMETRY', W / 2, 640, { size: 100, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 10 });
    txt('可 执 行 上 下 文 几 何 · TRURETURING FILM 017', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Same is relative to what you may do.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'SAMENESS', failure: 'FAILURE', fixedpoint: 'FIXED POINT', nextstep: 'NEXT STEP', xor: 'JOINT LAW', golden: 'NO 11', bell: 'ACCESS ORDER', order: 'ORDER', odometer: 'ODOMETER', triangle: 'TRIANGLE', sparse: 'SPARSE', dial: 'DIAL 25', nine: 'DIAL 27', finale: 'RELATIVE' });

function poster17() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const cx = W / 2, cy = 470, R = 270;
  for (let i = 0; i < 25; i++) { const an = -Math.PI / 2 + i / 25 * TAU; dot(cx + Math.cos(an) * R, cy + Math.sin(an) * R, i === 13 ? 30 : 14, ['c', 'm', 'g', 'v', 'c'][Math.floor(i / 5)], 1); }
  txt('51', cx, cy + 50, { size: 150, fam: F.orb, w: 900, align: 'center', c: C.gold, ab: 4 });
  txt('相同，取决于你被允许做哪些实验', W / 2, 150, { size: 56, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('CONTEXT GEOMETRY', W / 2, 870, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 10 });
  bloom(0.65);
  txt('可 执 行 上 下 文 几 何', W / 2, 945, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 017', W / 2, 1000, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster17;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
