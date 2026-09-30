/* Film 025 — COUNTEREXAMPLE HUNTER. */

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

/* ---- film 025 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    ref: ['LEAN KERNEL · FROZEN · result : ¬ claim · WITNESS RECOMPUTED', C.green, 'rgba(0,40,20,0.75)'],
    meta: ['HOW EVERY REFUTATION HERE IS BUILT', C.cyan, 'rgba(0,25,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
/* source card at the top-left of each case */
function source(S, n, title, src) {
  const a = at(S, 0, 0.6);
  txt('CASE ' + n, 150, 210, { size: 22, fam: F.mono, w: 700, c: C.mag, a, ls: 4 });
  txt(title, 150, 262, { size: 44, fam: F.orb, w: 900, c: C.white, a, ab: 1 });
  txt(src, 150, 300, { size: 20, fam: F.mono, c: C.orange, a });
}
function lost(S, x, y, k = 1, off = 4) { stamp('BET LOST', x, y, P(S, k, off), C.red, 44, -0.06); }

const CASES = [['eggs', '9 drops', C.gold], ['base 12', '521²', C.cyan], ['two bags', '47', C.orange], ['wheel', 'W₁₈, R = 4', C.green], ['fence', 'F₄₅', C.gold], ['rooks', '155', C.mag], ['clock', '3 zeros', C.cyan], ['puzzle', '9 moves', C.vio]];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  CASES.forEach(([name, wit, col], i) => {
    const a0 = i / 8 * TAU + t * 0.05, x = W / 2 + Math.cos(a0) * 560, y = 470 + Math.sin(a0) * 260, q = sp * P(S, 0, 1 + i * 0.5);
    box(x - 140, y - 60, 280, 120, col, q, 2, 'rgba(0,0,0,0.5)');
    txt('BET #' + (i + 1), x, y - 18, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    txt(name, x, y + 22, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.white, a: q });
    const s = P(S, 1, 1 + i * 0.6);
    if (s > 0) stamp('✗', x + 100, y - 40, s, C.red, 40, -0.1);
  });
  txt('∀ n …', W / 2, 460, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 0, 2) * (1 - P(S, 1, 0)), ab: 2 });
  txt('∃ one witness', W / 2, 460, { size: 56, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 0.5), ab: 2 });
  txt('result : ¬ claim  ·  kernel-checked  ·  frozen', W / 2, 520, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 4) });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  for (let i = 0; i < 40; i++) { const x = W / 2 + Math.cos(i * 2.4 + t * 0.2) * (120 + i * 9), y = 330 + Math.sin(i * 2.4 + t * 0.2) * (60 + i * 4); dot(x, y, 6, i === 17 ? 'r' : 'c', rp * (i === 17 ? 1 : 0.5)); }
  ring(W / 2 + Math.cos(17 * 2.4 + t * 0.2) * (120 + 153), 330 + Math.sin(17 * 2.4 + t * 0.2) * (60 + 68), 26 + 4 * Math.sin(t * 4), C.red, rp, 3);
  txt(scramble('COUNTEREXAMPLE HUNTER', rp, 251), W / 2, 640, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('反 例 猎 人 · 八 个 猜 想 · 八 个 见 证', W / 2, 715, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 025 · 8 FROZEN LEAN REFUTATIONS', W / 2, 115, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['8 printed guesses', C.cyan], ['8 witnesses', C.red], ['1 case settles it', C.green]].forEach(([s, col], i) => chip(W / 2 + (i - 1) * 420, 810, 380, 64, s, col, P(S, 1, 0.5 + i * 1.2), 24));
};

/* ---- 02 METHOD ---- */
SCENES.method = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'meta');
  const p0 = at(S, 0, 0.6);
  box(180, 220, 900, 380, C.cyan, p0, 2, 'rgba(0,10,20,0.7)');
  const code = [['-- 1. the printed statement, quantifiers written out', C.dim, 0.5], ['def claim : Prop :=', C.cyan, 1.5], ['  ∀ n, hypotheses n → conclusion n', C.white, 2.5], ['', C.dim, 99], ['-- 2. the refutation', C.dim, 99], ['theorem result : ¬ claim := by', C.green, 99], ['  intro h', C.white, 99], ['  exact (h witness facts).contradiction', C.white, 99]];
  code.forEach(([s, col, off], i) => { const q = i < 4 ? P(S, 0, off) : P(S, 1, 0.3 + (i - 4) * 0.8); txt(s, 220, 280 + i * 42, { size: 26, fam: F.mono, w: 700, c: col, a: q }); });
  /* the ∀ domain with one red witness */
  const q = P(S, 0, 3);
  for (let i = 0; i < 60; i++) { const x = 1200 + (i % 10) * 50, y = 260 + Math.floor(i / 10) * 55; const w = i === 37; dot(x, y, w ? 16 : 10, w ? 'r' : 'c', q * (w ? P(S, 1, 2) : 0.7)); if (w) ring(x, y, 26 + 3 * Math.sin(t * 5), C.red, P(S, 1, 2), 3); }
  txt('∀ … (every case)', 1425, 620, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
  txt('one witness breaks it', 1425, 665, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 2) });
  chip(W / 2, 760, 700, 64, 'kernel checks the witness → frozen', C.green, P(S, 1, 5), 26);
};

/* ---- 03 EGGS ---- */
SCENES.eggs = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'ref');
  source(S, 1, 'EGGS', 'Cao · Chen · Miller · arXiv:2511.18330 · Conjecture 1');
  const p0 = at(S, 0, 0.6);
  for (let k = 0; k < 5; k++) { const x = 180 + k * 80, y = 400 + Math.sin(t * 2 + k) * 6; ctx.globalAlpha = p0; ctx.fillStyle = 'rgba(255,240,210,0.9)'; ctx.beginPath(); ctx.ellipse(x, y, 24, 32, 0, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }
  txt('k = 5 eggs · d = 4 · sides (5,5,5,5)', 150, 480, { size: 24, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 3) });
  txt('bound: ⌈(k−d+1)·(ΣNᵢ)^(1/(k−d+1))⌉ = ⌈2·√20⌉ = 9', 150, 530, { size: 24, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 0.5) });
  /* pigeonholes: 625 points vs 512 transcripts */
  const q = P(S, 1, 2), gx = 1000, gy = 200;
  for (let i = 0; i < 625; i++) { const x = gx + (i % 25) * 13, y = gy + Math.floor(i / 25) * 13; fillBox(x, y, 9, 9, i < 512 ? C.cyan : C.red, q * (i < 512 ? 0.6 : clamp(P(S, 1, 5) * 1.5) * 0.9)); }
  txt('625 hidden points', gx + 162, gy + 360, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  txt('9 drops → at most 2⁹ = 512 answers', gx + 162, gy + 400, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3) });
  txt('625 > 512 : two points share an answer', gx + 162, gy + 440, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 5) });
  lost(S, 520, 700, 1, 7);
  thm('D5/S3/Observer/Budget/CaoChenMillerEggDropRefutation · card_le_of_injective', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 04 DIGITS ---- */
SCENES.digits = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'ref');
  source(S, 2, 'LIGHT SWITCHES', 'Erdős 1989, recalling Mahler · 0/1-digit squares, base k > 4');
  const sw = (x, y, bits, base, a, col) => {
    bits.forEach((b, i) => { const X = x + i * 70; box(X, y, 56, 90, col, a, 2, 'rgba(0,0,0,0.5)'); fillBox(X + 12, y + (b ? 12 : 48), 32, 30, b ? col : C.dim, a * (b ? 0.9 : 0.5)); txt(String(b), X + 28, y + 118, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a }); });
    txt('base ' + base, x - 20, y + 55, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  };
  const p0 = P(S, 0, 2);
  sw(420, 360, [1, 1, 1, 1], 7, p0, C.gold);
  txt('7³ + 7² + 7 + 1 = 400 = 20²', 750, 420, { size: 28, fam: F.mono, w: 700, c: C.gold, a: p0 });
  txt('"perhaps there are no others"', 420, 540, { size: 26, fam: F.mono, w: 700, c: C.dim, a: P(S, 0, 7) });
  const q = P(S, 1, 0.5);
  sw(420, 590, [1, 1, 1, 1, 0, 1], 12, q, C.cyan);
  txt('= 271441 = 521²', 880, 650, { size: 30, fam: F.mono, w: 700, c: C.cyan, a: P(S, 1, 2) });
  const q2 = P(S, 1, 5);
  txt('11677² = 1010111111 (base 8)', 1320, 650, { size: 24, fam: F.mono, w: 700, c: C.mag, a: q2 });
  txt('gcd(k, x) = 1 · not the trivial x² = k + 1', 420, 790, { size: 22, fam: F.mono, c: C.dim, a: P(S, 1, 3) });
  lost(S, 1500, 380, 1, 3);
  thm('D5/S1/Digit/ErdosMahlerBinaryDigitSquareRefutation', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 05 BAGS ---- */
const EUV = {"x47": [[1.2, 2.89, 4.59, 5.55, 6.15, 6.15, 7.88, 8.58, 10.33, 10.81, 11.11, 11.11, 12.89, 12.89, 13.19, 14.99, 16.79, 19.72, 22.58, 22.58, 25.64, 26.12, 27.96, 27.96, 29.82, 29.82, 30.12, 32.0, 35.16, 37.04, 38.94, 38.94, 40.84, 42.75, 43.05, 43.05, 44.97, 46.9, 47.2, 50.61, 52.55, 52.55, 54.5, 56.46, 59.79, 63.25, 63.55, 65.53, 67.51, 67.51, 69.5, 71.5, 73.5, 73.5, 75.51, 75.51, 77.52, 79.54, 83.29, 83.29, 85.33, 85.33, 87.37, 90.98, 93.03, 93.03, 95.09, 97.15, 99.21, 101.28, 105.12, 107.2, 109.28, 111.36, 115.23, 118.94, 121.03, 123.13], [0.48, 0.48, 0.48, 1.23, 2.34, 4.07, 4.07, 5.11, 5.11, 6.39, 7.85, 9.62, 9.62, 11.41, 12.9, 12.9, 12.9, 11.78, 10.74, 12.57, 11.34, 12.7, 12.7, 14.55, 14.55, 16.42, 17.98, 17.98, 16.7, 16.7, 16.7, 18.6, 18.6, 18.6, 20.22, 22.13, 22.13, 22.13, 23.77, 22.31, 22.31, 24.25, 24.25, 24.25, 22.89, 21.4, 23.07, 23.07, 23.07, 25.06, 25.06, 25.06, 25.06, 27.06, 27.06, 29.08, 29.08, 29.08, 27.35, 29.38, 29.38, 31.42, 31.42, 29.85, 29.85, 31.91, 31.91, 31.91, 31.91, 31.91, 30.13, 30.13, 30.13, 30.13, 28.35, 26.74, 26.74, 26.74]], "x7": [[0.9, 1.86, 2.16, 2.16, 3.24, 3.24, 3.54, 5.41, 6.62, 6.62, 7.87, 7.87, 9.17, 11.34, 13.73, 13.73, 15.11, 16.5, 19.03, 20.46], [0, 0, 0.7, 1.74, 1.74, 2.85, 3.7, 3.0, 3.0, 4.23, 4.23, 5.51, 5.51, 4.66, 3.62, 4.98, 4.98, 4.98, 3.87, 3.87]]};
SCENES.bags = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'ref');
  source(S, 3, 'TWO BAGS', 'Erdős 1985 · Rocky Mountain J. Math. 15(2), p. 361');
  const p0 = at(S, 0, 0.6);
  /* bags */
  const bag = (x, y, lab, col, a) => { box(x - 110, y - 70, 220, 150, col, a, 2.5, 'rgba(0,0,0,0.5)'); txt(lab, x, y + 110, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a }); };
  bag(260, 480, 'v : primes seen once', C.cyan, p0);
  bag(560, 480, 'u : repeated prime powers', C.gold, P(S, 0, 1));
  ['5', '7', '11', '13'].forEach((s, i) => txt(s, 200 + i * 40, 490, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) }));
  ['2⁷', '3³'].forEach((s, i) => txt(s, 520 + i * 80, 490, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 2) }));
  txt('x = 7, k = 7:  v > u', 410, 360, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 2) });
  /* chart log10 u vs v for x = 47 */
  const gx = 900, gy = 720, gw = 820, gh = 440, q = P(S, 1, 0.3);
  line(gx, gy, gx + gw, gy, C.dim, q, 2); line(gx, gy, gx, gy - gh, C.dim, q, 2);
  const [U, V] = EUV.x47, N = U.length, sh = Math.max(q, P(S, 0, 4)) > 0 ? clamp((u - lineAt(S, 0).s - 4) / 8) : 0;
  const pl = (arr, col) => { ctx.globalAlpha = Math.max(q, P(S, 0, 4)); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); const m = Math.max(2, Math.floor(N * sh)); for (let k = 0; k < m; k++) { const x = gx + k / (N - 1) * gw, y = gy - arr[k] / 125 * gh; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.globalAlpha = 1; };
  pl(U, C.gold); pl(V, C.cyan);
  txt('x = 47 · log₁₀ of each bag, k = 1 … 78', gx + gw / 2, gy - gh - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) });
  txt('u', gx + gw + 10, gy - U[N - 1] / 125 * gh, { size: 26, fam: F.mono, w: 700, c: C.gold, a: sh });
  txt('v', gx + gw + 10, gy - V[N - 1] / 125 * gh + 10, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: sh });
  txt('Erdős: "I would not be surprised if 23 is the only counterexample"', W / 2, 820, { size: 22, fam: F.mono, c: C.dim, a: P(S, 1, 0.2) });
  txt('k ≤ 78: kernel factor check · k ≥ 79: v ≤ primorial(47+k) ≤ 4^(47+k)', gx + gw / 2, gy + 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 4) });
  lost(S, 410, 740, 1, 2);
  thm('D5/S3/Factorization/ErdosConsecutiveProductSquarefreeFactorRefutation', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 06 WHEEL ---- */
const WN = 18;
function wheelAdj() { const A = [...Array(WN)].map(() => []); for (let v = 1; v < WN; v++) { A[0].push(v); A[v].push(0); const w = v % (WN - 1) + 1; A[v].push(w); A[w].push(v); } return A; }
const WA = wheelAdj();
const WSIM = (() => { let s = Array(WN).fill(0); s[1] = 1; const hist = [s]; for (let k = 0; k < 60; k++) { const n = s.map((x, v) => { const ni = WA[v].filter(w => s[w] === 1).length; return x === 0 ? (ni >= 1 ? 1 : 0) : x === 1 ? 2 : (ni >= 4 ? 1 : 0); }); hist.push(n); s = n; if (n.every(x => x === 0)) break; } return hist; })();
SCENES.wheel = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'ref');
  source(S, 4, 'EPIDEMIC ON A WHEEL', 'Espinosa-García et al. · arXiv:2608.00340 · Conjecture 1');
  const p0 = at(S, 0, 0.6), cx = 1300, cy = 500, R = 280;
  const step = Math.min(WSIM.length - 1, Math.floor(Math.max(0, u - lineAt(S, 0).s - 2) * 0.9));
  const st = WSIM[step], pos = v => v === 0 ? [cx, cy] : [cx + Math.cos((v - 1) / (WN - 1) * TAU - Math.PI / 2) * R, cy + Math.sin((v - 1) / (WN - 1) * TAU - Math.PI / 2) * R];
  for (let v = 0; v < WN; v++) WA[v].forEach(w => { if (w > v) { const [a, b] = pos(v), [c, d] = pos(w); line(a, b, c, d, C.dim, p0 * 0.8, 1.5); } });
  for (let v = 0; v < WN; v++) { const [x, y] = pos(v), s = st[v]; ring(x, y, 16, C.dim, p0, 1.5); dot(x, y, 30, s === 0 ? 'n' : s === 1 ? 'r' : 'w', p0 * (s === 2 ? 0.25 : 0.95)); }
  txt('slowest start (one infected cell) · step ' + step, cx, cy + R + 60, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  [['healthy', 'n', C.green], ['infected', 'r', C.red], ['dead', 'w', C.dim]].forEach(([s, d, col], i) => { dot(170, 400 + i * 50, 18, d, p0 * (d === 'w' ? 0.4 : 1)); txt(s, 200, 408 + i * 50, { size: 24, fam: F.mono, w: 700, c: col, a: p0 }); });
  txt('dead → infected only if ≥ R infected neighbours', 150, 580, { size: 22, fam: F.mono, c: C.white, a: P(S, 0, 5) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    txt('conjecture for W₁₈:  𝓔 = {3} ∪ {R ≥ 17}', 150, 650, { size: 24, fam: F.mono, w: 700, c: C.orange, a: q });
    txt('Lean: all 2¹⁸ = 262,144 starts, R = 4', 150, 700, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: P(S, 1, 3) });
    txt('→ all healthy by step 25  ⇒  4 ∈ 𝓔(W₁₈)', 150, 745, { size: 24, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 6) });
  }
  lost(S, 1700, 260, 1, 7);
  thm('D5/S3/Combinatorics/WheelHivExtinctionRefutation · bitmask simulation, 25 steps · worst case recounted: 25', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 07 FENCE ---- */
SCENES.fence = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'ref');
  source(S, 5, 'A FENCE AROUND A GARDEN', 'OEIS A134492 · comment by F. Huber, 2023');
  const p0 = at(S, 0, 0.6);
  /* Fibonacci index strip */
  for (let k = 3; k <= 60; k++) {
    const x = 150 + (k - 3) * 28, y = 400, on = k % 6 === 0 && k >= 12, bad = k === 45;
    const q = P(S, 0, 2 + (k - 3) * 0.05);
    fillBox(x, y, 22, 40, bad ? C.red : on ? C.green : 'rgba(90,122,154,0.35)', q * (bad ? P(S, 1, 0.3) : 1) + (bad ? 0 : 0));
    if (bad) { fillBox(x, y, 22, 40, 'rgba(90,122,154,0.35)', q * (1 - P(S, 1, 0.3))); }
    if (k % 6 === 0 || bad) txt(String(k), x + 11, y + 70, { size: 18, fam: F.mono, w: 700, align: 'center', c: bad ? C.red : C.dim, a: q });
  }
  txt('Fibonacci index k:  green = F(6n), n ≥ 2 (the conjectured list)', 150, 370, { size: 22, fam: F.mono, w: 700, c: C.green, a: P(S, 0, 3) });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    const ox = 1160, oy = 780, sx = 0.1;
    const A = [ox, oy], B = [ox + 3145 * sx, oy], Cc = [ox, oy - 2928 * sx];
    line(A[0], A[1], B[0], B[1], C.gold, q, 4); line(A[0], A[1], Cc[0], Cc[1], C.gold, q, 4); line(B[0], B[1], Cc[0], Cc[1], C.gold, q, 4);
    box(A[0], A[1] - 20, 20, 20, C.gold, q, 2);
    txt('3145', ox + 157, oy + 35, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt('2928', ox - 20, oy - 146, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: q });
    txt('4297', ox + 190, oy - 170, { size: 22, fam: F.mono, w: 700, c: C.white, a: q });
    txt('× 109,441', ox + 330, oy - 60, { size: 30, fam: F.orb, w: 900, c: C.cyan, a: P(S, 1, 4), ab: 1 });
    txt('perimeter = 1,134,903,170 = F₄₅', 150, 560, { size: 30, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 5) });
    txt('344191945² + 320443248² = 470267977²', 150, 610, { size: 24, fam: F.mono, c: C.white, a: P(S, 1, 6) });
    txt('(recomputed: k = 57 fails too)', 150, 655, { size: 20, fam: F.mono, c: C.dim, a: P(S, 1, 7) });
  }
  lost(S, 520, 760, 1, 7.5);
  thm('D5/S3/Arith/FibonacciPythagoreanPerimeterRefutation', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 08 ROOKS ---- */
const RPI = [2, 7, 4, 8, 1, 6, 3, 5];
const RSOL = (() => { const n = 8, black = new Set(RPI.map((p, i) => i * 8 + p - 1));
  const run = (cells) => { const W = []; let cur = []; for (const c of cells.concat([null])) { if (c === null || black.has(c)) { if (cur.length) W.push(cur); cur = []; } else cur.push(c); } return W; };
  const across = [], down = []; for (let i = 0; i < n; i++) across.push(...run([...Array(n)].map((_, j) => i * 8 + j))); for (let j = 0; j < n; j++) down.push(...run([...Array(n)].map((_, i) => i * 8 + j)));
  const dw = {}; down.forEach((w, k) => w.forEach(c => { dw[c] = k; }));
  const pick = []; const used = new Set(); const go = i => { if (i === across.length) return true; for (const c of across[i]) { if (!used.has(dw[c])) { used.add(dw[c]); pick.push(c); if (go(i + 1)) return true; pick.pop(); used.delete(dw[c]); } } return false; }; go(0);
  return { black, pick }; })();
SCENES.rooks = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'ref');
  source(S, 6, 'ROOKS ON A CROSSWORD', 'Lewis · Won · arXiv:2609.03081 · Conjecture 3.10');
  const p0 = at(S, 0, 0.6), gx = 1100, gy = 200, s = 70;
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { const c = i * 8 + j, b = RSOL.black.has(c); box(gx + j * s, gy + i * s, s - 4, s - 4, b ? C.dim : C.cyan, p0, 1.5, b ? 'rgba(10,20,30,0.95)' : 'rgba(0,30,40,0.35)'); }
  const q = P(S, 0, 5, 6);
  RSOL.pick.forEach((c, k) => { if (q * 14 > k) { const i = Math.floor(c / 8), j = c % 8; txt('♜', gx + j * s + (s - 4) / 2, gy + i * s + 50, { size: 44, align: 'center', c: C.gold, a: 1 }); } });
  txt('black squares: permutation 2 7 4 8 1 6 3 5', 150, 400, { size: 24, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 2) });
  txt('rooks attack only along white words', 150, 445, { size: 24, fam: F.mono, c: C.white, a: P(S, 0, 3) });
  txt('conjecture: counts ≡ 3 (mod 4) never occur', 150, 510, { size: 24, fam: F.mono, w: 700, c: C.orange, a: P(S, 0, 7) });
  const q1 = P(S, 1, 0.3);
  if (q1 > 0) {
    txt('14 across · 14 down words', 150, 590, { size: 24, fam: F.mono, c: C.cyan, a: q1 });
    txt('placements = 155', 150, 650, { size: 40, fam: F.orb, w: 900, c: C.gold, a: P(S, 1, 2.5), ab: 1 });
    txt('155 = 4 · 38 + 3', 150, 705, { size: 30, fam: F.mono, w: 700, c: C.red, a: P(S, 1, 4) });
  }
  lost(S, 480, 790, 1, 5.5);
  thm('D5/S3/Combinatorics/CrosswordPermutationGridRefutation · one of the 155 shown · count recomputed', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 09 CLOCK ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'ref');
  source(S, 7, 'A CLOCK WITH ZEROS', 'Benfield · Lippard · arXiv:2407.20048v2 · Conjecture 5.3(v)');
  const p0 = at(S, 0, 0.6), seq = [0, 1, 3, 11, 0, 9, 1, 8, 0, 3, 9, 7], cx = 1300, cy = 500, R = 260;
  ring(cx, cy, R, C.dim, p0, 2);
  const q = P(S, 1, 0.3), shown = q > 0 ? Math.min(12, Math.floor((u - lineAt(S, 1).s - 0.3) * 1.4)) : 0;
  seq.forEach((v, i) => { const a = i / 12 * TAU - Math.PI / 2, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; const on = i < shown; dot(x, y, on && v === 0 ? 34 : 22, on && v === 0 ? 'r' : 'c', p0 * (on ? 1 : 0.3)); if (on) txt(String(v), cx + Math.cos(a) * (R + 50), cy + Math.sin(a) * (R + 50) + 9, { size: 28, fam: F.mono, w: 700, align: 'center', c: v === 0 ? C.red : C.white, a: 1 }); });
  if (shown > 0) { const a = (shown - 1) / 12 * TAU - Math.PI / 2; arrow(cx, cy, cx + Math.cos(a) * R * 0.8, cy + Math.sin(a) * R * 0.8, C.gold, 1, 4); }
  txt('F₀ = 0, F₁ = 1, Fₙ = a·Fₙ₋₁ + b·Fₙ₋₂  (mod m)', 150, 400, { size: 24, fam: F.mono, w: 700, c: C.white, a: P(S, 0, 2) });
  txt('conjecture: b ≠ ±1, |a| − |b| = 1', 150, 460, { size: 24, fam: F.mono, c: C.orange, a: P(S, 0, 5) });
  txt('⇒ zeros per period ∈ {0, 1, 2}', 150, 505, { size: 24, fam: F.mono, w: 700, c: C.orange, a: P(S, 0, 6) });
  if (q > 0) {
    txt('a = 3, b = 2, m = 13', 150, 590, { size: 30, fam: F.mono, w: 700, c: C.cyan, a: q });
    txt('period 12 · zeros: ' + seq.slice(0, Math.max(0, shown)).filter(v => v === 0).length, 150, 645, { size: 30, fam: F.mono, w: 700, c: C.red, a: P(S, 1, 1) });
  }
  lost(S, 480, 760, 1, 7);
  thm('D5/S3/Arith/PisanoOrderRangeRefutation · reuses LucasEvenDescent, LucasCompanion', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 10 PUZZLE ---- */
const PZ = (() => { const s = '0000111111111', goal = '1111111110000'; const prev = { [s]: null }, q = [s];
  while (q.length) { const w = q.shift(); if (w === goal) break; for (let i = 0; i + 5 <= 13; i++) { const seg = w.slice(i, i + 5), r = seg[4] + seg.slice(0, 4), nw = w.slice(0, i) + r + w.slice(i + 5); if (!(nw in prev)) { prev[nw] = w; q.push(nw); } } }
  const path = []; let w = goal; while (w) { path.unshift(w); w = prev[w]; } return path; })();
function inv(w) { let c = 0; for (let p = 0; p < w.length; p++) for (let q = p + 1; q < w.length; q++) if (w[p] === '1' && w[q] === '0') c++; return c; }
SCENES.puzzle = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'ref');
  source(S, 8, 'A SLIDING PUZZLE', 'Chervov et al. · CayleyPy-4 · arXiv:2603.22195 · Conjecture 15, k = 5');
  const p0 = at(S, 0, 0.6);
  const st = Math.min(PZ.length - 1, Math.max(0, Math.floor((u - lineAt(S, 0).s - 3) * 0.55)));
  const w = PZ[st];
  for (let i = 0; i < 13; i++) { const x = 330 + i * 100, y = 420; box(x, y, 84, 84, w[i] === '0' ? C.vio : C.gold, p0, 2, w[i] === '0' ? 'rgba(40,20,80,0.8)' : 'rgba(80,60,0,0.6)'); }
  txt('move ' + st + ' / ' + (PZ.length - 1), 330, 390, { size: 24, fam: F.mono, w: 700, c: C.white, a: p0 });
  txt('a move rotates 5 neighbouring tiles by one place', 330, 560, { size: 24, fam: F.mono, c: C.white, a: P(S, 0, 2) });
  txt('formula at 4 dark + 9 light:  D = 8', 330, 610, { size: 26, fam: F.mono, w: 700, c: C.orange, a: P(S, 0, 6) });
  const q = P(S, 1, 0.3);
  txt('disorder (light before dark): ' + inv(w), 1100, 390, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: Math.max(q, P(S, 0, 4)) });
  if (q > 0) {
    txt('start 0 → reverse 36', 1100, 610, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: q });
    txt('one move changes it by ≤ 4', 1100, 655, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: P(S, 1, 2) });
    txt('⌈36 / 4⌉ = 9 > 8', 1100, 715, { size: 36, fam: F.orb, w: 900, c: C.red, a: P(S, 1, 4), ab: 1 });
  }
  lost(S, 560, 760, 1, 6);
  thm('D5/S3/Combinatorics/ShrunkenGrassmannianConjectureFifteenRefutation · uses frozen ListInversions.inv_window · path shown: BFS, 9 moves', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    CASES.forEach(([name, wit, col], i) => { const x = 330 + (i % 4) * 420, y = 300 + Math.floor(i / 4) * 200, q = P(S, 0, 0.5 + i * 0.9) * fade; box(x - 180, y - 70, 360, 140, col, q, 2, 'rgba(0,0,0,0.5)'); txt(name, x, y - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(wit, x, y + 30, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.white, a: q, ab: 1 }); if (q > 0.5) txt('✓ frozen', x + 120, y + 55, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.green, a: q }); });
    txt('every guess was clear enough to be tested', W / 2, 640, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.5) * fade });
    txt('literature screens bounded · no priority claimed', W / 2, 690, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 3) * fade });
    txt('each bet, as printed, is lost', W / 2, 750, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 5) * fade, ab: 1 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    for (let i = 0; i < 40; i++) { const x = W / 2 + Math.cos(i * 2.4 + t * 0.2) * (120 + i * 9), y = 300 + Math.sin(i * 2.4 + t * 0.2) * (60 + i * 4); dot(x, y, 6, i === 17 ? 'r' : 'c', ep * out * (i === 17 ? 1 : 0.5)); }
    txt('COUNTEREXAMPLE HUNTER', W / 2, 640, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('反例猎人 · TRURETURING FILM 025', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('For all is a promise. There exists is a proof.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'EIGHT BETS', method: 'METHOD', eggs: 'CASE 1 · EGGS', digits: 'CASE 2 · SWITCHES', bags: 'CASE 3 · BAGS', wheel: 'CASE 4 · WHEEL', fence: 'CASE 5 · FENCE', rooks: 'CASE 6 · ROOKS', clock: 'CASE 7 · CLOCK', puzzle: 'CASE 8 · PUZZLE', finale: 'LEDGER' });

function poster25() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  CASES.forEach(([name, wit, col], i) => { const x = 300 + (i % 4) * 440, y = 330 + Math.floor(i / 4) * 210; box(x - 180, y - 70, 360, 140, col, 1, 2, 'rgba(0,0,0,0.5)'); txt(name, x, y - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: col }); txt(wit, x, y + 30, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 1 }); stamp('✗', x + 140, y - 50, 1, C.red, 36, -0.1); });
  txt('八个猜想，八个反例', W / 2, 160, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('COUNTEREXAMPLE HUNTER', W / 2, 850, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('反 例 猎 人 · 每 一 个 都 由 Lean 内 核 核 验', W / 2, 930, { size: 36, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 025', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster25;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
