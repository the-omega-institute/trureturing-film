/* Film 024 — EIGHT LIGHTS. */

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

/* ---- film 024 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · FROZEN', C.green, 'rgba(0,40,20,0.75)'],
    leanc: ['LEAN KERNEL · FROZEN · KERNEL-CHECKED CERTIFICATES', C.green, 'rgba(0,40,20,0.75)'],
    lit: ['LITERATURE · KRISHNAN 2026 · arXiv:2607.19412 · RECOMPUTED', C.orange, 'rgba(40,20,0,0.75)'],
    sat: ['EXTERNAL SAT EVIDENCE (NOT A PROOF) · FENCES RECOUNTED n = 14–16', C.gold, 'rgba(40,30,0,0.75)'],
    known: ['LEAN FROZEN · FORMALIZES A KNOWN PUBLIC REFUTATION', C.blue, 'rgba(0,15,40,0.75)'],
    classic: ['CLASSICAL BACKGROUND · NOT PART OF THIS PROOF', C.blue, 'rgba(0,15,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }

/* ---- generalized Petersen graph P(n,k): outer u_i = i, inner v_i = n+i ---- */
const GPC = {};
function gpAdj(n, k = 3) {
  const A = [...Array(2 * n)].map(() => []);
  const add = (a, b) => { A[a].push(b); A[b].push(a); };
  for (let i = 0; i < n; i++) { add(i, (i + 1) % n); add(i, n + i); add(n + i, n + (i + k) % n); }
  return A;
}
/* sequential-in-round forcing; returns lit round per vertex, forcer list, final lit set */
function gpForce(n, S, k = 3) {
  const key = n + ':' + k + ':' + S.join(',');
  if (GPC[key]) return GPC[key];
  const A = gpAdj(n, k), lit = new Set(S), round = Array(2 * n).fill(Infinity), by = Array(2 * n).fill(-1);
  S.forEach(v => { round[v] = 0; });
  const forcers = []; let r = 0;
  for (;;) {
    const nw = [];
    for (const v of [...lit].sort((a, b) => a - b)) {
      const d = A[v].filter(w => !lit.has(w));
      if (d.length === 1) { lit.add(d[0]); nw.push(d[0]); forcers.push([v, d[0], r + 1]); by[d[0]] = v; }
    }
    if (!nw.length) break;
    r++; nw.forEach(w => { round[w] = r; });
  }
  return (GPC[key] = { A, round, by, forcers, rounds: r, lit });
}
function gpPos(n, cx, cy, R, r, rot = 0) {
  const P = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + TAU * i / n + rot;
    P[i] = [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
    P[n + i] = [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  }
  return P;
}
/* o: {S, T (round progress), fort:Set, show:{outer,spoke,inner}, rot, vr, labels, mark:{v:col}} */
function drawGP(n, cx, cy, R, r, a, o = {}) {
  if (a <= 0) return;
  const k = o.k || 3, P = gpPos(n, cx, cy, R, r, o.rot || 0), vr = o.vr || 12;
  const f = o.S ? gpForce(n, o.S, k) : null, T = o.T === undefined ? 1e9 : o.T;
  const lv = v => (o.allLit ? o.allLit : !f ? 0 : clamp(T - f.round[v] + 1));
  const sh = o.show || { outer: 1, spoke: 1, inner: 1 };
  const E = (x, y, part, s) => {
    if (s <= 0) return;
    const both = Math.min(lv(x), lv(y));
    const [x1, y1] = P[x], [x2, y2] = P[y];
    const xm = x1 + (x2 - x1) * s, ym = y1 + (y2 - y1) * s;
    line(x1, y1, xm, ym, both > 0.5 ? C.cyan : part === 'inner' ? C.vio : C.dim, a * (0.45 + 0.45 * both), both > 0.5 ? 2.6 : 1.8);
  };
  for (let i = 0; i < n; i++) {
    E(i, (i + 1) % n, 'outer', sh.outer);
    E(i, n + i, 'spoke', sh.spoke);
    E(n + i, n + (i + k) % n, 'inner', sh.inner);
  }
  if (f && o.arrows !== false) for (const [u, w, rr] of f.forcers) {
    const q = clamp(T - rr + 1) * clamp(rr - T + 0.6);
    if (q > 0) arrow(P[u][0], P[u][1], P[u][0] + (P[w][0] - P[u][0]) * 0.8, P[u][1] + (P[w][1] - P[u][1]) * 0.8, C.gold, a * q, 3);
  }
  const vis = Math.max(sh.outer, sh.spoke);
  for (let v = 0; v < 2 * n; v++) {
    const va = v < n ? a * clamp(vis * 3) : a * clamp(Math.max(sh.spoke, sh.inner) * 3);
    if (va <= 0) continue;
    const [x, y] = P[v], L = lv(v), start = f && f.round[v] === 0;
    ring(x, y, vr, C.dim, va * 0.7, 1.5);
    fillBox(x - vr * 0.5, y - vr * 0.5, vr, vr, 'rgba(0,0,0,0)', 0);
    if (L > 0) dot(x, y, vr * (start ? 2.3 : 1.9), start ? 'g' : 'c', va * L);
    if (o.fort && o.fort.has(v)) { const pz = o.fortA === undefined ? 1 : o.fortA; if (pz > 0) { ring(x, y, vr * 1.7 + Math.sin(S_T * 4) * 2, C.red, va * pz, 3); dot(x, y, vr * 1.4, 'r', va * pz * 0.6); } }
    if (o.mark && o.mark[v]) { const [col, s] = o.mark[v]; ring(x, y, vr * 1.8, col, va, 3); if (s) txt(s, x + (x - cx) * 0.16, y + (y - cy) * 0.16 + 7, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a: va }); }
    if (o.labels) txt((v < n ? 'u' : 'v') + (v % n), x + (x - cx) * (v < n ? 0.14 : -0.2), y + (y - cy) * (v < n ? 0.14 : -0.2) + 6, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: va * o.labels });
  }
}
let S_T = 0;
const range = (a, b) => [...Array(b - a)].map((_, i) => a + i);
function litCount(n, S, T) { const f = gpForce(n, S); return f.round.filter(r => r <= T).length; }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u; S_T = S.t;
  const sp = clamp(u / 1.5);
  const Sx = range(0, 8), T = 4.4 * P(S, 0, 4, 6);
  drawGP(13, W / 2, 470, 300, 170, sp, { S: Sx, T: sp < 1 ? -1 : T, rot: S.t * 0.02 });
  txt('how few lamps light everything?', W / 2, 870, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) * (1 - P(S, 1, 0)) });
  const q = P(S, 1, 0.5);
  if (q > 0) {
    chip(W / 2 - 520, 860, 300, 60, '2026 · OPEN', C.orange, q, 24);
    arrow(W / 2 - 360, 860, W / 2 - 180, 860, C.white, P(S, 1, 2), 3);
    chip(W / 2, 860, 330, 60, 'SETTLED · ∀ n ≥ 13', C.gold, P(S, 1, 2.5), 24);
    arrow(W / 2 + 175, 860, W / 2 + 350, 860, C.white, P(S, 1, 4), 3);
    chip(W / 2 + 520, 860, 300, 60, 'LEAN KERNEL ✓', C.green, P(S, 1, 4.5), 24);
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u; S_T = S.t;
  const rp = clamp(u / 1.2);
  drawGP(13, W / 2, 330, 190, 105, rp, { allLit: 1, rot: S.t * 0.05, vr: 9 });
  txt(scramble('EIGHT LIGHTS', rp, 241), W / 2, 640, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 10 });
  txt('八 个 点 点 亮 全 图 · P(n,3) 的 零 强 迫 数', W / 2, 715, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 024 · D5/S3/Combinatorics/GeneralizedPetersen/ZeroForcingThree', W / 2, 115, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  [['ring road', C.cyan], ['skip-3 subway', C.vio], ['last one in the dark', C.gold]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 420, 810, 380, 64, s, col, P(S, 1, 0.5 + i * 1.3), 24));
};

/* ---- 02 GRAPH ---- */
SCENES.graph = S => {
  const u = S.u; S_T = S.t;
  badge(clamp(u / 0.8), 'lean');
  const sh = { outer: P(S, 0, 0.3, 3), spoke: P(S, 0, 3.5, 2.5), inner: P(S, 0, 6.5, 3.5) };
  drawGP(13, 620, 500, 310, 175, 1, { show: sh, labels: P(S, 0, 1, 1), vr: 11 });
  const rows = [['outer ring', 'u_i — u_(i+1)', C.cyan, 0.3], ['spoke', 'u_i — v_i', C.white, 3.5], ['inner star', 'v_i — v_(i+3)', C.vio, 6.5]];
  rows.forEach(([a, b, col, off], i) => { const q = P(S, 0, off); txt(a, 1120, 330 + i * 90, { size: 30, fam: F.orb, w: 900, c: col, a: q }); txt(b, 1420, 330 + i * 90, { size: 28, fam: F.mono, w: 700, c: C.white, a: q }); });
  const q1 = P(S, 1, 0.3);
  if (q1 > 0) {
    txt('P(n,3) · generalized Petersen graph', 1120, 640, { size: 28, fam: F.mono, w: 700, c: C.gold, a: q1 });
    txt('every vertex has exactly 3 neighbours', 1120, 690, { size: 26, fam: F.mono, c: C.white, a: P(S, 1, 2) });
    txt('2n vertices · 3n edges', 1120, 735, { size: 24, fam: F.mono, c: C.dim, a: P(S, 1, 3) });
    const Pp = gpPos(13, 620, 500, 310, 175), hv = Math.floor(S.t * 0.8) % 2 ? 2 : 15, A = gpAdj(13);
    const hp = P(S, 1, 1.5);
    ring(Pp[hv][0], Pp[hv][1], 24, C.gold, hp, 3);
    A[hv].forEach(w => ring(Pp[w][0], Pp[w][1], 20, C.mag, hp * (0.6 + 0.4 * Math.sin(S.t * 5)), 2.5));
  }
  thm('ZeroForcingThree · gp n 3 · vertices Bool × Fin n', 620, 880, P(S, 0, 2), 'center');
};

/* ---- 03 RULE ---- */
SCENES.rule = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6);
  const cx = 460, cy = 430, nb = [[280, 280], [640, 280], [460, 630]];
  const fire = P(S, 0, 4, 1);
  nb.forEach(([x, y], i) => { line(cx, cy, x, y, i < 2 ? C.cyan : C.dim, p0, 3); });
  dot(cx, cy, 34, 'g', p0);
  nb.forEach(([x, y], i) => { ring(x, y, 22, C.dim, p0, 2); if (i < 2) dot(x, y, 30, 'c', p0); else dot(x, y, 30, 'c', p0 * fire); });
  txt('knows', 280, 235, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
  txt('knows', 640, 235, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
  txt(fire > 0.5 ? 'told!' : 'the only one in the dark', 460, 690, { size: 22, fam: F.mono, w: 700, align: 'center', c: fire > 0.5 ? C.gold : C.dim, a: p0 });
  if (fire > 0 && fire < 1) arrow(cx, cy, cx, cy + 150 * fire, C.gold, 1, 4);
  txt('lit, with exactly ONE dark neighbour  ⟹  light it', 460, 780, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1.5) });
  /* minesweeper on the right */
  const q = P(S, 1, 0.3), gx = 1180, gy = 250, s = 90;
  const grid = [['1', '1', '1'], ['·', '2', '·'], ['?', '1', '·']];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const v = grid[i][j], unk = v === '?';
    const dec = P(S, 1, 3.5);
    box(gx + j * s, gy + i * s, s - 8, s - 8, unk ? C.gold : C.dim, q, 2, 'rgba(0,0,0,0.45)');
    txt(unk && dec > 0.5 ? '✹' : v, gx + j * s + (s - 8) / 2, gy + i * s + s / 2 + 10, { size: 36, fam: F.mono, w: 700, align: 'center', c: unk ? C.gold : C.white, a: q });
  }
  txt('Minesweeper: one unknown left ⟹ decided', gx + 130, gy + 320, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
  const q2 = P(S, 1, 5);
  if (q2 > 0) {
    chip(1140, 740, 170, 56, 'start', C.gold, q2, 22);
    arrow(1230, 740, 1290, 740, C.white, q2, 3);
    chip(1420, 740, 230, 56, 'repeat rule', C.cyan, P(S, 1, 6), 22);
    arrow(1540, 740, 1600, 740, C.white, P(S, 1, 7), 3);
    chip(1720, 740, 200, 56, 'all lit?', C.green, P(S, 1, 7.5), 22);
  }
  thm('Black G S · least set ⊇ S closed under the colour-change rule', 460, 880, P(S, 0, 2), 'center');
};

/* ---- 04 EIGHT ---- */
SCENES.eight = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'lean');
  const Sx = range(0, 8), f = gpForce(13, Sx), T = (f.rounds + 0.5) * P(S, 0, 2.5, 8);
  drawGP(13, 600, 480, 320, 185, at(S, 0, 0.6), { S: Sx, T, labels: 0.6 });
  txt('lit: ' + litCount(13, Sx, T) + ' / 26', 1100, 300, { size: 34, fam: F.mono, w: 700, c: C.cyan, a: at(S, 0, 0.6) });
  txt('8 consecutive outer lamps u0 … u7', 1100, 360, { size: 26, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 1) });
  txt('1. light the stations below', 1100, 420, { size: 24, fam: F.mono, c: C.white, a: P(S, 0, 3) });
  txt('2. the light walks around the ring', 1100, 465, { size: 24, fam: F.mono, c: C.white, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    [9, 16, 21].forEach((n, i) => { const g = gpForce(n, Sx), TT = (g.rounds + 0.5) * P(S, 1, 1 + i * 1.2, 5); drawGP(n, 1170 + i * 200, 640, 80, 46, q, { S: Sx, T: TT, vr: 5, arrows: false }); txt('n = ' + n, 1170 + i * 200, 755, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q }); });
    box(1040, 790, 660, 60, C.green, P(S, 1, 4), 2, 'rgba(0,40,20,0.5)');
    txt('∀ n ≥ 9 : {u0,…,u7} is zero forcing', 1370, 830, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 4) });
  }
  thm('outerBlock8_zeroForcing · upper bound Z(P(n,3)) ≤ 8', 600, 880, P(S, 0, 2), 'center');
};

/* ---- 05 TABLE ---- */
SCENES.table = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'lit');
  const Sx = range(0, 7), f = gpForce(12, Sx), T = (f.rounds + 0.5) * P(S, 0, 2, 6);
  drawGP(12, 480, 460, 270, 155, at(S, 0, 0.6), { S: Sx, T });
  txt('n = 12 · 7 lamps · ' + litCount(12, Sx, T) + ' / 24 lit', 480, 790, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: at(S, 0, 0.6) });
  const Z = { 11: 7, 12: 7, 13: 8, 14: 8, 15: 8, 16: 8, 17: 8, 18: 8, 19: 8, 20: 8 };
  const q = P(S, 1, 0);
  txt('n', 960, 250, { size: 24, fam: F.mono, w: 700, c: C.dim, a: P(S, 0, 1) });
  txt('Z(P(n,3))', 960, 300, { size: 24, fam: F.mono, w: 700, c: C.dim, a: P(S, 0, 1) });
  Object.entries(Z).forEach(([n, z], i) => {
    const x = 1110 + i * 72, a = P(S, 0, 1 + i * 0.25);
    txt(n, x, 250, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a });
    cellv(x - 28, 262, 56, z, z === 7 ? C.cyan : C.gold, a, 'rgba(0,0,0,0.5)', 0.5);
  });
  txt('n = 21, 22, … ?', 1110 - 28, 360, { size: 24, fam: F.mono, w: 700, c: C.red, a: q * (0.6 + 0.4 * Math.sin(t * 4)) });
  txt('earlier claim: 8 from n = 12 on  ✗', 960, 420, { size: 24, fam: F.mono, w: 700, c: C.dim, a: P(S, 0, 6) });
  if (q > 0) {
    box(940, 460, 820, 170, C.orange, P(S, 1, 0.5), 2, 'rgba(40,20,0,0.45)');
    txt('Krishnan 2026 · arXiv:2607.19412', 1350, 510, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 0.5) });
    txt('Conjecture 5:  Z(P(n,3)) = 8  for every n ≥ 13', 1350, 560, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2.5) });
    txt('checked n ≤ 20 · all n: OPEN', 1350, 605, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 5) });
  }
  thm('table recomputed for this film by exhaustive search, n = 9…20', 1350, 880, P(S, 0, 3), 'center');
};
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }

/* ---- 06 FORT ---- */
SCENES.fort = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'lean');
  const Sx = range(0, 7), f = gpForce(13, Sx), T = (f.rounds + 0.5) * P(S, 0, 1.5, 4);
  const fort = new Set(range(0, 26).filter(v => !f.lit.has(v)));
  const fa = P(S, 0, 6, 1.2);
  const mark = {};
  if (P(S, 1, 1) > 0) {
    for (let v = 0; v < 26; v++) if (!fort.has(v)) { const c = f.A[v].filter(w => fort.has(w)).length; if (c > 0) mark[v] = [C.orange, String(c)]; }
  }
  drawGP(13, 620, 480, 320, 185, at(S, 0, 0.6), { S: Sx, T, fort, fortA: fa, mark: P(S, 1, 1) > 0 ? mark : null });
  txt('lit: ' + litCount(13, Sx, T) + ' / 26 · stuck', 1110, 300, { size: 32, fam: F.mono, w: 700, c: C.cyan, a: at(S, 0, 0.6) });
  txt('8 dark vertices = a FORTRESS', 1110, 360, { size: 30, fam: F.orb, w: 900, c: C.red, a: fa, ab: 1 });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('every outsider touches it 0 or ≥ 2 times', 1110, 450, { size: 26, fam: F.mono, w: 700, c: C.orange, a: q });
    txt('(orange numbers: never 1)', 1110, 495, { size: 22, fam: F.mono, c: C.dim, a: P(S, 1, 1) });
    txt('no outsider has exactly one', 1110, 560, { size: 26, fam: F.mono, c: C.white, a: P(S, 1, 3) });
    txt('dark neighbour inside ⟹ no way in', 1110, 600, { size: 26, fam: F.mono, c: C.white, a: P(S, 1, 3) });
    box(1090, 650, 620, 64, C.green, P(S, 1, 6), 2, 'rgba(0,40,20,0.5)');
    txt('a lamp must sit inside every fortress', 1400, 692, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 6) });
  }
  thm('IsFort.not_black_of_disjoint · S ∩ F = ∅ ⇒ F stays dark', 620, 880, P(S, 0, 2), 'center');
};

/* ---- 07 THIRTEEN ---- */
SCENES.thirteen = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'leanc');
  const p0 = at(S, 0, 0.6);
  txt('n = 13 · every 7-lamp start with a first move · up to rotation (×13)', W / 2, 200, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  for (let i = 0; i < 6; i++) {
    const x = 380 + (i % 3) * 580, y = 360 + Math.floor(i / 3) * 280, q = P(S, 0, 2 + i * 0.6);
    box(x - 240, y - 110, 480, 230, C.cyan, q, 2, 'rgba(0,0,0,0.45)');
    drawGP(13, x - 110, y + 5, 80, 46, q, { allLit: 0, vr: 5, rot: (i * TAU) / 13 });
    txt('anchor family A' + (i + 1), x + 90, y - 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
    const ok = P(S, 1, 0.5 + i * 0.6);
    txt('fort certificates', x + 90, y + 20, { size: 20, fam: F.mono, align: 'center', c: C.red, a: ok });
    txt('✓ kernel-checked', x + 90, y + 60, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: ok });
    ring(x - 110, y + 5, 95, C.red, ok * (0.5 + 0.3 * Math.sin(t * 3 + i)), 2);
  }
  stamp('Z(P(13,3)) = 8', W / 2, 860, P(S, 1, 5), C.green, 48, -0.04);
  thm('zeroForcingNumber13 · FortData1…6 · FiniteCore · FiniteRotation · cards schematic', W / 2, 920, P(S, 0, 3), 'center');
};

/* ---- 08 MESSENGERS ---- */
SCENES.messengers = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'lean');
  const n = 16, Sx = range(0, 8), f = gpForce(n, Sx);
  const X = f.forcers.slice(0, 10).map(e => e[0]);
  const Tstop = f.forcers[9][2];
  const T = (Tstop + 0.4) * P(S, 0, 2.5, 8);
  const mark = {};
  f.forcers.slice(0, 10).forEach(([v, w, r], i) => { if (T >= r) mark[v] = [C.mag, String(i + 1)]; });
  const Xs = new Set(X), NX = new Set();
  X.forEach(v => f.A[v].forEach(w => { if (!Xs.has(w)) NX.add(w); }));
  const q1 = P(S, 1, 2);
  if (q1 > 0) NX.forEach(v => { mark[v] = [C.orange, '']; });
  drawGP(n, 600, 480, 320, 190, at(S, 0, 0.6), { S: Sx, T, mark, vr: 10 });
  txt('messengers = the first 10 vertices', 1100, 300, { size: 28, fam: F.mono, w: 700, c: C.mag, a: P(S, 0, 1) });
  txt('that pass the light on', 1100, 340, { size: 28, fam: F.mono, w: 700, c: C.mag, a: P(S, 0, 1) });
  txt('messengers so far: ' + Object.values(mark).filter(m => m[0] === C.mag).length, 1100, 400, { size: 26, fam: F.mono, c: C.white, a: P(S, 0, 2.5) });
  if (P(S, 1, 0) > 0) {
    txt('lemma (every finite graph):', 1100, 480, { size: 24, fam: F.mono, c: C.dim, a: P(S, 1, 0.3) });
    txt('|outside neighbours of X|  ≤  |S|', 1100, 530, { size: 30, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 0.3) });
    txt('here: ' + NX.size + '  ≤  ' + Sx.length, 1100, 590, { size: 30, fam: F.mono, w: 700, c: C.orange, a: q1 });
    txt('(orange rings = outside neighbours)', 1100, 635, { size: 20, fam: F.mono, c: C.dim, a: q1 });
  }
  thm('firstForcers_boundary · p forcing sources X with |N(X)| ≤ |S|', 600, 880, P(S, 0, 2), 'center');
};

/* ---- 09 FENCE ---- */
SCENES.fence = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'leanc');
  const p0 = at(S, 0, 0.6), cx = 600, cy = 470;
  const sheep = [[-80, -40], [-20, -70], [40, -50], [90, -10], [-60, 20], [0, 0], [60, 40], [-30, 70], [30, 90], [-100, 60]];
  sheep.forEach(([dx, dy], i) => { const q = P(S, 0, 0.5 + i * 0.25); dot(cx + dx * 1.4, cy + dy * 1.4, 22, 'w', q); });
  const posts = 8, pp = P(S, 0, 4, 3);
  for (let i = 0; i < posts; i++) {
    const a = i / posts * TAU + 0.3, x = cx + Math.cos(a) * 250, y = cy + Math.sin(a) * 210, q = clamp(pp * posts - i);
    fillBox(x - 8, y - 30, 16, 60, C.orange, q * 0.9);
    const b = (i + 1) / posts * TAU + 0.3;
    if (q >= 1) line(x, y - 10, cx + Math.cos(b) * 250, cy + Math.sin(b) * 210 - 10, C.orange, 0.6 * p0, 2);
  }
  txt('10 sheep', cx, cy - 290, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('fence posts: ' + Math.min(posts, Math.floor(pp * posts)), cx, cy + 300, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.orange, a: p0 });
  txt('P(n,3), n ≥ 14:', 1120, 300, { size: 28, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 3) });
  txt('every 10-vertex set has', 1120, 350, { size: 28, fam: F.mono, c: C.white, a: P(S, 0, 3) });
  txt('≥ 8 outside neighbours', 1120, 400, { size: 32, fam: F.mono, w: 700, c: C.orange, a: P(S, 0, 5) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('7 lamps ⟹ 10 messengers', 1120, 500, { size: 28, fam: F.mono, w: 700, c: C.mag, a: q });
    txt('fenced by ≤ 7 posts', 1120, 545, { size: 28, fam: F.mono, w: 700, c: C.mag, a: q });
    stamp('IMPOSSIBLE', 1350, 640, P(S, 1, 3.5), C.red, 48, -0.06);
    txt('⟹  Z(P(n,3)) ≥ 8', 1120, 760, { size: 36, fam: F.orb, w: 900, c: C.green, a: P(S, 1, 5.5), ab: 1 });
  }
  thm('TenBoundary · Requests · pen and posts schematic', 600, 880, P(S, 0, 2), 'center');
};

/* ---- 10 ACCORDION ---- */
SCENES.accordion = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'leanc');
  const p0 = at(S, 0, 0.6);
  const cols = 20, occ = new Set([0, 1, 2, 3, 4, 13, 14, 15, 16, 17]);
  const inner = new Set([2, 15]);
  const gapStart = 5, gapLen = 8; /* columns 5..12 empty */
  const fold = P(S, 0, 5, 2.5), fold2 = P(S, 1, 2, 2.5);
  const w0 = 70, y0 = 330;
  let x = 960 - (cols * w0) / 2;
  for (let c = 0; c < cols; c++) {
    let w = w0;
    if (c === 8) w = w0 * (1 - fold);
    if (c === 9) w = w0 * (1 - fold2);
    if (w < 1) { continue; }
    const inGap = c >= gapStart && c < gapStart + gapLen;
    const sq = w * 0.8;
    box(x + (w - sq) / 2, y0, sq, 60, inGap ? C.vio : C.dim, p0, 1.5, 'rgba(0,0,0,0.4)');
    box(x + (w - sq) / 2, y0 + 90, sq, 60, inGap ? C.vio : C.dim, p0, 1.5, 'rgba(0,0,0,0.4)');
    if (occ.has(c) && !inner.has(c)) dot(x + w / 2, y0 + 30, 18, 'w', p0);
    if (occ.has(c) && inner.has(c)) dot(x + w / 2, y0 + 120, 18, 'w', p0);
    if (c === 8 && fold > 0 && fold < 1) { for (let k = 0; k < 5; k++) line(x + (k % 2) * w, y0 - 20 + k * 50, x + ((k + 1) % 2) * w, y0 + 30 + k * 50, C.gold, 1, 2); }
    x += w;
  }
  txt('outer', 200, y0 + 38, { size: 20, fam: F.mono, c: C.dim, a: p0 });
  txt('inner', 200, y0 + 128, { size: 20, fam: F.mono, c: C.dim, a: p0 });
  txt('long empty gap: 7+ columns without sheep', W / 2, 270, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 0, 2) });
  txt('fold one column away', W / 2, 560, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 5), ab: 1 });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    chip(700, 660, 380, 60, 'sheep: 10 → 10', C.white, q, 24);
    chip(1220, 660, 460, 60, 'fence posts: same', C.orange, P(S, 1, 1), 24);
    txt('fold until no gap of 7 is left  ⟹  finitely many patterns', W / 2, 770, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
  }
  thm('GapLong · GapExact · ShiftCore · strip schematic', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 11 TILES ---- */
SCENES.tiles = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'leanc');
  const p0 = at(S, 0, 0.6), gx = 260, gy = 220, s = 44, cols = 16, rows = 9;
  const pr = P(S, 0, 1.5, 9);
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const k = (i * cols + j) * 37 % (rows * cols), q = clamp(pr * rows * cols - k);
    box(gx + j * s, gy + i * s, s - 6, s - 6, q >= 1 ? C.green : C.dim, p0, 1.5, q >= 1 ? 'rgba(0,60,30,0.5)' : 'rgba(0,0,0,0.4)');
    if (q >= 1) txt('✓', gx + j * s + (s - 6) / 2, gy + i * s + 29, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: p0 });
  }
  txt('layer codes → interval covers', gx + cols * s / 2, gy - 30, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const L = [['40', 'frozen Lean modules'], ['16,693', 'lines'], ['14', 'GapCover modules'], ['6', 'FortData modules']];
    L.forEach(([a, b], i) => { const qq = P(S, 1, 0.5 + i * 0.8); txt(a, 1240, 300 + i * 90, { size: 44, fam: F.orb, w: 900, align: 'right', c: C.gold, a: qq, ab: 1 }); txt(b, 1270, 300 + i * 90, { size: 24, fam: F.mono, c: C.white, a: qq }); });
    txt('rule · fortresses · messengers · fence · tiles', W / 2, 740, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 4) });
  }
  thm('GapCover6G0 … GapCover8G6 · GapMaskBridge · GapRootSupport · tile grid schematic', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 12 SAT ---- */
SCENES.sat = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'sat');
  const p0 = at(S, 0, 0.6), x0 = 240, y0 = 520, bw = 44;
  for (let n = 13; n <= 40; n++) {
    const i = n - 13, q = P(S, 0, 1 + i * 0.12), sat = n === 13;
    fillBox(x0 + i * 52, y0 - (sat ? 200 : 120), bw, sat ? 200 : 120, sat ? C.red : C.green, q * 0.7);
    if (i % 3 === 0 || sat) txt(String(n), x0 + i * 52 + bw / 2, y0 + 32, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q });
  }
  txt('SAT: a 10-set with ≤ 7 posts exists', x0, y0 - 240, { size: 22, fam: F.mono, w: 700, c: C.red, a: P(S, 0, 1) });
  txt('UNSAT for every n = 14 … 40', x0 + 520, y0 - 160, { size: 26, fam: F.mono, w: 700, c: C.green, a: P(S, 0, 4) });
  txt('n', x0 + 28 * 52 + 20, y0 + 32, { size: 18, fam: F.mono, c: C.dim, a: p0 });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const rows = [['9 messengers', 'min posts 7', C.red], ['10 messengers', 'min posts 8', C.green]];
    rows.forEach(([a, b, col], i) => { chip(560 + i * 520, 660, 440, 60, a + ' → ' + b, col, P(S, 1, 0.5 + i * 1.5), 24); });
    txt('recounted here: n = 14, 15, 16 → 8   (13.1 M · 30.0 M · 64.5 M sets);   n = 13 → 7', W / 2, 770, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) });
  }
  thm('CaDiCaL runs reported in the problem dossier · evidence, not the proof', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 13 PRISM ---- */
SCENES.prism = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'known');
  const p0 = at(S, 0, 0.6);
  txt('Pandey 2026 · Conjecture 4.1', 1300, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.orange, a: p0 });
  txt('I(GP(n,k), x) real-rooted  ⟺  k even', 1300, 310, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) });
  const q = P(S, 1, 0);
  drawGP(3, 520, 430, 220, 100, Math.max(p0 * 0.6, q), { k: 1, allLit: q, vr: 14, rot: t * 0.1 });
  txt('GP(3,1) · triangular prism · k = 1 (odd)', 520, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
  if (q > 0) {
    txt('I(x) = 1 + 6x + 6x²', 1300, 420, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 1), ab: 1 });
    txt('1 empty · 6 singles · 6 cross pairs', 1300, 470, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 1.5) });
    const lx = 960, rx = 1640, ly = 590, mp = v => lx + (v + 1) / 1.2 * (rx - lx);
    line(lx, ly, rx, ly, C.white, P(S, 1, 2), 2);
    [-1, -0.5, 0].forEach(v => { line(mp(v), ly - 8, mp(v), ly + 8, C.white, P(S, 1, 2), 2); txt(String(v), mp(v), ly + 36, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 2) }); });
    [(-3 - Math.sqrt(3)) / 6, (-3 + Math.sqrt(3)) / 6].forEach(r => dot(mp(r), ly, 16, 'r', P(S, 1, 3)));
    txt('both roots real: (−3 ± √3)/6', 1300, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3) });
    stamp('CONJECTURE FALSE', 1300, 760, P(S, 1, 4.5), C.red, 40, -0.05);
  }
  thm('ParityRefutation · result : ¬ claim · refutation was public before (Library note)', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 14 WHY ---- */
SCENES.why = S => {
  const u = S.u, t = S.t; S_T = t;
  badge(clamp(u / 0.8), 'classic');
  const p0 = at(S, 0, 0.6);
  const Sx = range(0, 8), f = gpForce(13, Sx), T = (f.rounds + 0.5) * P(S, 0, 2, 5);
  drawGP(13, 480, 420, 230, 130, p0, { S: Sx, T, vr: 9, arrows: false });
  txt('touch a few qubits → steer the whole network', 480, 710, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 1.5) });
  /* matrix pattern shaped like the graph */
  const n = 9, A = gpAdj(n), mx = 1080, my = 230, cs = 26, q = P(S, 0, 5);
  for (let i = 0; i < 2 * n; i++) for (let j = 0; j < 2 * n; j++) {
    const nz = i === j || A[i].includes(j);
    fillBox(mx + j * cs, my + i * cs, cs - 3, cs - 3, nz ? (i === j ? C.gold : C.mag) : 'rgba(90,122,154,0.25)', q * (nz ? 0.8 : 1));
  }
  txt('matrices shaped like the graph', mx + n * cs, my - 25, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q });
  txt('nullity ≤ Z(G)  ⟹  rank ≥ |V| − Z(G)', mx + n * cs, my + 2 * n * cs + 45, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 7) });
  const q1 = P(S, 1, 0.3);
  if (q1 > 0) {
    for (let k = 0; k < 7; k++) { const sc = Math.pow(0.72, k), x = 360 + k * 210 * Math.pow(0.9, k); drawGP(13 + k, x, 820, 60 * sc, 34 * sc, q1 * (1 - k * 0.1), { allLit: 1, vr: 4 * sc + 1 }); }
    txt('every ring n ≥ 13', 1560, 830, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 3), ab: 1 });
  }
};

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L; S_T = t;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const lean = ['8 lamps light P(n,3) for n ≥ 9', 'fortresses settle n = 13', 'messengers + fence settle n ≥ 14', 'accordion + tiles: every n, finitely many checks'];
    txt('LEAN · FROZEN', W / 2, 230, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 0.3) * fade });
    lean.forEach((s, i) => txt('✓ ' + s, 560, 300 + i * 52, { size: 28, fam: F.mono, w: 700, c: C.green, a: P(S, 0, 0.8 + i * 1.2) * fade }));
    txt('Z(P(n,3)) = 8  for every n ≥ 13', W / 2, 560, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 6) * fade, ab: 2 });
    txt('literature screen: bounded · no worldwide priority claimed', W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 0.5) * fade });
    txt('the proof itself: checked by the kernel', W / 2, 710, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 4) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    const f = gpForce(13, range(0, 8));
    drawGP(13, W / 2, 330, 190, 108, ep * out, { S: range(0, 8), T: (f.rounds + 0.5) * clamp((u - L[1].e - 1.5) / 3), vr: 9, rot: t * 0.04 });
    txt('EIGHT LIGHTS', W / 2, 640, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 10 });
    txt('八个点点亮全图 · TRURETURING FILM 024', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Light the right eight — and the whole ring follows.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'LAMPS', graph: 'P(n,3)', rule: 'THE RULE', eight: 'EIGHT', table: 'n ≤ 20', fort: 'FORTRESS', thirteen: 'THIRTEEN', messengers: 'MESSENGERS', fence: 'FENCE', accordion: 'ACCORDION', tiles: 'TILES', sat: 'SECOND WITNESS', prism: 'PRISM', why: 'WHY', finale: 'LEDGER' });

function poster24() {
  const t = 24.0; S_T = t;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawGP(13, W / 2, 470, 260, 150, 1, { S: range(0, 8), T: 99, vr: 12, arrows: false });
  txt('最少几盏灯，能点亮整张图？', W / 2, 150, { size: 58, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('EIGHT LIGHTS', W / 2, 850, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 10 });
  bloom(0.65);
  txt('八 个 点 点 亮 全 图 · Z(P(n,3)) = 8', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 024 · LEAN KERNEL', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster24;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
