/* Film 020 — ODD COVERING SYSTEMS · Erdős #7. */

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


/* ---- film 020 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    project: ['PROJECT RESULT · PAPER PROOF + EXACT CERTIFICATES', C.orange, 'rgba(40,20,0,0.75)'],
    premise: ['PROJECT RESULT · USES A STATED EXTERNAL PREMISE', C.gold, 'rgba(40,30,0,0.75)'],
    lean: ['LEAN KERNEL · FROZEN', C.green, 'rgba(0,40,20,0.75)'],
    known: ['PRIOR LITERATURE', C.blue, 'rgba(0,15,40,0.75)'],
    open: ['OPEN PROBLEM · erdosproblems.com/7', C.red, 'rgba(40,0,10,0.75)'],
    counter: ['PROJECT COUNTEREXAMPLE · EXACT CHECK', C.mag, 'rgba(40,0,30,0.75)'],
    audit: ['PROJECT AUDIT OF EXTERNAL CLAIMS', C.vio, 'rgba(20,10,40,0.75)'],
    stats: ['REPOSITORY MEASUREMENT · 2026-09-28', C.cyan, 'rgba(0,30,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cross(x, y, s, col, a) { if (a <= 0) return; line(x - s, y - s, x + s, y + s, col, a, 4); line(x - s, y + s, x + s, y - s, col, a, 4); }
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function bar(x, y, w, h, col, a) { fillBox(x, y - h, w, h, col, a); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const cx = 560, cy = 460, R = 230;
  const prog = [[0, 2, C.cyan], [0, 3, C.mag], [1, 4, C.gold], [5, 6, C.green], [7, 12, C.vio]];
  const even = P(S, 1, 2);
  const cov = Array(12).fill(null);
  prog.forEach(([a, m, col], k) => { const q = P(S, 0, 1.5 + k * 1.6); if (q > 0.5) for (let n = 0; n < 12; n++) if (n % m === a && !cov[n]) cov[n] = col; });
  for (let n = 0; n < 12; n++) {
    const an = n / 12 * TAU - Math.PI / 2, x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R;
    const col = cov[n];
    ring(x, y, 36, col || C.dim, clamp(u / 1.5), 3);
    if (col) { ctx.globalAlpha = 0.35 * (1 - even * 0.8); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 34, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }
    txt(String(n), x, y + 11, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: clamp(u / 1.5) });
  }
  txt('mod 12', cx, cy + 12, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp(u / 1.5) });
  prog.forEach(([a, m, col], k) => {
    const q = P(S, 0, 1.5 + k * 1.6);
    const isEven = m % 2 === 0;
    txt(a + ' mod ' + m, 1180, 260 + k * 75, { size: 40, fam: F.mono, w: 700, c: col, a: q * (isEven ? 1 - even * 0.85 : 1) });
    if (isEven && even > 0) line(1170, 247 + k * 75, 1480, 247 + k * 75, C.red, even, 4);
  });
  txt('every integer caught', 1340, 680, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 9) * (1 - even) });
  txt('odd, distinct moduli only ?', 1340, 680, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
  txt('?', cx, cy + 30, { size: 160, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4) * (0.6 + 0.4 * Math.sin(t * 3)), ab: 4 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cx = W / 2, cy = 330;
  const odds = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
  odds.forEach((m, k) => { const r = 60 + k * 14, an = t * (0.8 - k * 0.05) + k; ring(cx, cy, r, [C.cyan, C.mag, C.gold][k % 3], rp * 0.35, 1.2); dot(cx + Math.cos(an) * r * 1.0, cy + Math.sin(an) * r, 7, ['c', 'm', 'g'][k % 3], rp); });
  txt('?', cx, cy + 36, { size: 100, fam: F.orb, w: 900, align: 'center', c: C.gold, a: rp, ab: 3 });
  txt(scramble('ODD COVERING SYSTEMS', rp, 201), W / 2, 620, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 8 });
  txt('Erdős 第七问题 · 奇 数 覆 盖 系 统', W / 2, 700, { size: 46, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 020 · ERDŐS PROBLEM #7 · docs/reports/erdos7-odd-covering', W / 2, 170, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  chip(W / 2, 790, 520, 64, 'STATUS: OPEN', C.red, P(S, 1, 1.5), 30);
};

/* ---- 02 DENSITY ---- */
SCENES.density = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'project');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const base = 620, sc = 330, one = base - sc;
  line(300, one, 1000, one, C.white, p0, 2); txt('1', 280, one + 8, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: p0 });
  const v1 = 103 / 105, v2 = 65 / 63;
  bar(380, base, 200, sc * v1 * P(S, 0, 1, 1.5), C.cyan, 0.7 * p0);
  txt('315 = 3²·5·7', 480, base + 45, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
  txt('Σ 1/d = 103/105', 480, one - 60, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  txt('< 1 : never covers', 480, one - 25, { size: 22, fam: F.mono, align: 'center', c: C.red, a: P(S, 0, 5) });
  bar(720, base, 200, sc * v2 * P(S, 1, 0.3, 1.5), C.mag, 0.7 * p1);
  txt('945 = 3³·5·7', 820, base + 45, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p1 });
  txt('Σ 1/d = 65/63 > 1', 820, one - 60, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 2) });
  if (p1 > 0) {
    const q = P(S, 1, 5, 1);
    for (let i = 0; i < 945; i++) {
      const x = 1150 + (i % 35) * 17, y = 230 + Math.floor(i / 35) * 17;
      const surv = rnd(i, 11) < 191 / 945;
      fillBox(x, y, 13, 13, surv ? C.gold : C.mag, p1 * (surv ? (0.3 + 0.7 * q) : 0.25));
    }
    txt('≥ 191 of 945 residues always escape', 1450, 740, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q, ab: 1 });
    txt('(sharp · and 74 of 315)', 1450, 780, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q });
  }
  thm('problem-details/02–03 · sharp finite minima 74 (mod 315), 191 (mod 945) · schematic survivor positions', W / 2, 850, P(S, 1, 7), 'center');
};

/* ---- 03 KNOWN ---- */
SCENES.known = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'known');
  const cards = [
    ['Balister–Bollobás–Morris–', 'Sahasrabudhe–Tiba', 'distinct squarefree moduli', '⇒ an even modulus', C.cyan, 0, 0.5],
    ['Hough–Nielsen', 'Duke Math. J. 2019', 'every covering system has a', 'modulus divisible by 2 or 3', C.mag, 0, 5],
    ['Schroeder 2026', '(preprints)', 'moduli with ≤ 3 prime factors', 'cannot cover · ≥ 9 primes needed', C.gold, 1, 0.5],
    ['Mian–Siddique 2026', '(Lean)', 'kernel-checked', 'lcm > 10000', C.green, 1, 4]
  ];
  cards.forEach(([a, b, c1, c2, col, k, off], i) => {
    const q = P(S, k, off), x = 280 + (i % 2) * 700 + (i > 1 ? 0 : 0), y = 210 + Math.floor(i / 2) * 290;
    const X = i % 2 === 0 ? 260 : 1000;
    box(X, y, 660, 240, col, q, 2, 'rgba(0,0,0,0.5)');
    txt(a, X + 30, y + 55, { size: 28, fam: F.orb, w: 900, c: col, a: q });
    txt(b, X + 30, y + 95, { size: 22, fam: F.mono, w: 700, c: C.dim, a: q });
    txt(c1, X + 30, y + 160, { size: 24, fam: F.mono, w: 700, c: C.white, a: q });
    txt(c2, X + 30, y + 200, { size: 26, fam: F.mono, w: 700, c: col, a: q });
  });
  txt('the project builds on these and names every borrowed premise', W / 2, 830, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 7) });
};

/* ---- 04 SPRINT ---- */
SCENES.sprint = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'stats');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const days = [59, 55, 104, 94, 62, 93, 62, 53, 76, 70, 56, 91, 40];
  const base = 560;
  days.forEach((c, i) => {
    const q = P(S, 0, 0.5 + i * 0.25), x = 250 + i * 70;
    bar(x, base, 50, c * 2.6 * q, i === 12 ? C.dim : C.cyan, 0.75 * p0);
    txt(String(c), x + 25, base - c * 2.6 * q - 10, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt(String(16 + i), x + 25, base + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q });
  });
  txt('commits per day · Sept 16–28, 2026', 700, base + 70, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  const stats = [['915', 'commits', C.cyan, 0, 1], ['79', 'problem write-ups', C.mag, 0, 3], ['702', 'working notes', C.gold, 0, 5], ['145', 'verifier scripts', C.green, 0, 7], ['14,140', 'certificate files', C.orange, 1, 0.5], ['≈ 387 MB', 'exact rational arithmetic', C.vio, 1, 3]];
  stats.forEach(([n, l, col, k, off], i) => {
    const q = P(S, k, off), y = 220 + i * 90;
    txt(n, 1470, y + 20, { size: 46, fam: F.orb, w: 900, align: 'right', c: col, a: q, ab: 1 });
    txt(l, 1500, y + 14, { size: 24, fam: F.mono, w: 700, c: C.white, a: q });
  });
  thm('git log -- docs/reports/erdos7-odd-covering Problems/erdos-7-odd-covering-systems.md · HEAD 12fe986f5e', W / 2, 850, P(S, 1, 5), 'center');
};

/* ---- 05 LEAN ---- */
SCENES.lean = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const x0 = 260, y0 = 220, cw = 150, ch = 110;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
    const q = P(S, 0, 0.5 + (i + j) * 0.3) * p0, triv = i === 0 && j === 0;
    const w = cw * Math.pow(3, -i) * 2.2, h = ch * Math.pow(5, -j) * 1.8;
    const X = x0 + i * cw, Y = y0 + j * ch;
    box(X, Y, cw - 10, ch - 10, triv ? C.red : C.green, q * 0.6, 1.5, 'rgba(0,0,0,0.4)');
    fillBox(X + 5, Y + 5, Math.min(w, cw - 20), Math.min(h, ch - 20), triv ? C.red : C.green, q * 0.35);
    const lab = (i ? (i > 1 ? 'p' + '²³'[i - 2] : 'p') : '') + (j ? (j > 1 ? 'q²' : 'q') : '') || '1';
    txt(lab, X + (cw - 10) / 2, Y + ch / 2 + 6, { size: 24, fam: F.mono, w: 700, align: 'center', c: triv ? C.red : C.white, a: q });
  }
  txt('divisors of p^A · q^B', x0 + 2 * cw - 5, y0 - 25, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: p0 });
  txt('two odd primes only', 1380, 250, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 1) });
  txt('≥ 1/8 of residues uncovered', 1380, 320, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 4), ab: 2 });
  if (p1 > 0) {
    txt('Σ 1/d ≤ (3/2)·(5/4) = 15/8', 1380, 440, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1) });
    txt('− 1 (the divisor 1)  ⇒  covered ≤ 7/8', 1380, 500, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4) });
    txt('p ≥ 3 : Σ p^−i ≤ 3/2      q ≥ 5 : Σ q^−j ≤ 5/4', 1380, 560, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 2) });
  }
  txt('D5/S3/Arith/Congruence/TwoOddPrimeUncoveredDensity · two_odd_prime_uncovered_density', W / 2, 760, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 6) });
  txt('the only frozen Lean theorem of this project · a special case, not Erdős #7', W / 2, 800, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 7) });
};

/* ---- 06 LCM ---- */
SCENES.lcm = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'project');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const X = v => 240 + v / 11486474 * 1300;
  line(240, 420, 1640, 420, C.dim, p0, 2);
  [0, 2e6, 4e6, 6e6, 8e6, 10e6].forEach(v => { txt((v / 1e6) + 'M', X(v), 460, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p0 }); line(X(v), 412, X(v), 428, C.dim, p0, 1.5); });
  const wallA = P(S, 0, 2);
  line(X(11486474), 250, X(11486474), 560, C.gold, wallA, 6);
  txt('lcm > 11,486,474', X(11486474), 230, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: wallA, ab: 2 });
  const sweep = P(S, 1, 0.5, 5);
  for (let i = 0; i < 240; i++) {
    const v = Math.pow(rnd(i, 5), 1.6) * 11400000 + 945, x = X(v), y = 380 - rnd(i, 9) * 120;
    const hit = v / 11486474 < sweep;
    dot(x, y, 5, hit ? 'r' : 'o', p1 * (hit ? 0.55 : 0.8));
  }
  txt('23,758 odd abundant / perfect periods ≤ 11,486,474', 820, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 1) });
  txt('23,757 fail the density criterion · 1 holdout', 820, 600, { size: 22, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 3) });
  const hx = X(6891885), hq = P(S, 1, 5);
  ring(hx, 300, 26, C.mag, hq, 3);
  txt('6,891,885 = 3⁴·5·7·11·13·17', hx, 290 - 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: hq });
  txt('two-block split: 1877957/1889280 < 1', hx, 290 - 70, { size: 18, fam: F.mono, align: 'center', c: C.mag, a: P(S, 1, 6) });
  txt('first not excluded: 11,486,475 = 3³·5²·7·11·13·17', 960, 680, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 8), ab: 1 });
  thm('problem-details/02 · no external premise · same threshold advertised in Öztürk\'s preprint (full text not obtained)', W / 2, 800, P(S, 1, 8), 'center');
};

/* ---- 07 CUTOFF ---- */
SCENES.cutoff = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'premise');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  box(220, 250, 380, 200, C.cyan, p0, 2.5, 'rgba(0,20,30,0.5)');
  txt('HEAD', 410, 290, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: p0 });
  txt('3^a · 5^b · 7^c', 410, 360, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
  txt('any heights', 410, 410, { size: 22, fam: F.mono, align: 'center', c: C.white, a: p0 });
  const tail = [19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83];
  tail.forEach((p, i) => { const x = 680 + i * 70 - ((t * 40) % 70), q = P(S, 0, 1 + i * 0.12); chip(x, 350, 60, 50, String(p), C.mag, q * clamp((1650 - x) / 100) * clamp((x - 640) / 40), 20); });
  txt('every other prime ≥ 19 · any tail', 1150, 440, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 2) });
  txt('still leaves a hole', 1150, 500, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 5) });
  if (p1 > 0) {
    const s = clamp((u - lineAt(S, 1).s) / 5);
    const step = Math.floor(s * 1388), prm = Math.round(19 + (11593 - 19) * Math.pow(s, 1.4));
    txt('step ' + step + ' / 1388', 480, 600, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('prime ' + (s >= 1 ? 11593 : prm), 480, 650, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p1 });
    fillBox(260, 690, 440 * s, 20, C.cyan, 0.7 * p1); box(260, 690, 440, 20, C.cyan, p1, 1.5);
    txt('C ≤ 0.95662 < 1', 480, 760, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
    txt('any odd cover must use', 1250, 610, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 6) });
    [11, 13, 17].forEach((p, i) => chip(1130 + i * 120, 690, 100, 70, String(p), C.gold, P(S, 1, 6.5 + i * 0.3), 36));
  }
  thm('problem-details/03 · continuation uses BBMST distortion Theorem 6.1 as cited', W / 2, 840, P(S, 1, 7), 'center');
};

/* ---- 08 GRAPH ---- */
SCENES.graph = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'premise');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const fa = p0 * (1 - p1);
  if (fa > 0) {
    const ex = [
      ['tree', [[0, 0], [1, 0.8], [-1, 0.8], [1.6, 1.8], [0.4, 1.8]], [[0, 1], [0, 2], [1, 3], [1, 4]], C.cyan, 0.5],
      ['cycle', [[0, 0], [1, 0.6], [0.7, 1.7], [-0.7, 1.7], [-1, 0.6]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]], C.mag, 2],
      ['cactus', [[0, 0.9], [-1.1, 0.2], [-1.1, 1.6], [1.1, 0.2], [1.1, 1.6], [0, -0.4]], [[0, 1], [1, 2], [2, 0], [0, 3], [3, 4], [4, 0], [0, 5]], C.gold, 3.5]
    ];
    const lab = [3, 5, 7, 11, 13, 17];
    ex.forEach(([n, pts, eds, col, off], k) => {
      const q = fa * P(S, 0, off), cx = 400 + k * 560, cy = 300, sc = 110;
      eds.forEach(([a, b]) => line(cx + pts[a][0] * sc, cy + pts[a][1] * sc, cx + pts[b][0] * sc, cy + pts[b][1] * sc, col, q, 3));
      pts.forEach(([x, y], i) => { dot(cx + x * sc, cy + y * sc, 22, 'w', q * 0.3); ring(cx + x * sc, cy + y * sc, 22, col, q, 2.5); txt(String(lab[i]), cx + x * sc, cy + y * sc + 8, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
      txt(n, cx, 580, { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a: q });
      txt('never covers', cx, 625, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: q * P(S, 0, 6) });
    });
    txt('vertex = prime · edge = two primes dividing one modulus', W / 2, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: fa * P(S, 0, 1) });
    txt('(follows from Schroeder, Theorem 1.1)', W / 2, 760, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: fa * P(S, 0, 6) });
  }
  if (p1 > 0) {
    const blocks = [[430, 380, 4, C.cyan], [760, 420, 6, C.mag], [1090, 380, 7, C.gold]];
    blocks.forEach(([cx, cy, n, col], k) => {
      const q = P(S, 1, 0.5 + k * 0.8);
      const pts = []; for (let i = 0; i < n; i++) { const an = i / n * TAU + t * 0.2; pts.push([cx + Math.cos(an) * 95, cy + Math.sin(an) * 95]); }
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], col, q * 0.45, 1.5);
      pts.forEach(([x, y]) => dot(x, y, 10, 'w', q));
      txt('≤ ' + n + ' primes', cx, cy + 150, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q });
      txt('noncovering', cx, cy + 185, { size: 20, fam: F.mono, align: 'center', c: C.green, a: q });
    });
    const q8 = P(S, 1, 5), cx = 1470, cy = 400, n = 8;
    const pts = []; for (let i = 0; i < n; i++) { const an = i / n * TAU - t * 0.3; pts.push([cx + Math.cos(an) * 120, cy + Math.sin(an) * 120]); }
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.red, q8 * 0.5, 1.5);
    pts.forEach(([x, y]) => dot(x, y, 12, 'r', q8));
    txt('a cover needs a block', cx, cy + 175, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: q8 });
    txt('of ≥ 8 primes', cx, cy + 208, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.red, a: q8, ab: 1 });
    txt('blocks ≤ 7: uses Schroeder\'s nine-prime geometry as a stated premise · 1,058,304 residuals checked', W / 2, 760, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 7) });
  }
  thm('problem-details/06, 06b, 06c, 30, 31 · eight-prime cores containing 3 and 5: chapter 70 (conditional)', W / 2, 820, P(S, 1, 8), 'center');
};

/* ---- 09 SEVEN ---- */
SCENES.seven = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'premise');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const X = v => 220 + Math.log10(v) / 7 * 1450;
  line(220, 380, 1680, 380, C.dim, p0, 2);
  [10, 100, 1000, 1e4, 1e5, 1e6, 1e7].forEach(v => { txt(v >= 1e4 ? (v === 1e4 ? '10⁴' : v === 1e5 ? '10⁵' : v === 1e6 ? '10⁶' : '10⁷') : String(v), X(v), 420, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p0 }); });
  const wall = X(1e5);
  fillBox(220, 300, wall - 220, 160, C.cyan, 0.06 * p0);
  line(wall, 280, wall, 480, C.gold, p0, 4);
  txt('100,000', wall, 270, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 });
  [3, 5, 7, 11, 13, 17, 19].forEach((p, i) => { const q = P(S, 0, 1 + i * 0.3); dot(X(p) + (i % 2) * 6, 380, 14, 'c', q); txt(String(p), X(p) + (i % 2) * 6, 350 - (i % 2) * 26, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); });
  txt('≤ 7 prime divisors below 100,000', 600, 520, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  for (let i = 0; i < 40; i++) { const v = Math.pow(10, 5.05 + ((rnd(i, 2) + t * 0.05) % 1) * 1.9); dot(X(v), 380 + (rnd(i, 4) - 0.5) * 60, 6, 'm', P(S, 0, 5) * 0.8); }
  txt('any number of larger primes', 1400, 520, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 5) });
  txt('no cover', W / 2, 600, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 7), ab: 2 });
  if (p1 > 0) {
    const bx = 460, bw = 1000, m = 2 / 125;
    box(bx, 660, bw, 50, C.cyan, p1, 2, 'rgba(0,0,0,0.4)');
    fillBox(bx, 660, bw * P(S, 1, 0.5, 1.5), 50, C.cyan, 0.5 * p1);
    fillBox(bx + bw * (1 - (29 / 4000) / m), 660, bw * (29 / 4000) / m * P(S, 1, 3), 50, C.red, 0.7 * p1);
    txt('seed mass > 2/125', bx + 200, 745, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 1) });
    txt('tail < 29/4000', bx + bw - 150, 745, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3) });
  }
  thm('problem-details/33 · premise: Rosser–Schoenfeld prime-product bound · 8 primes ≤ 10⁸ with Schroeder\'s attributed density', W / 2, 820, P(S, 1, 6), 'center');
};

/* ---- 10 MARGINAL ---- */
SCENES.marginal = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'project');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const fa = p0 * (1 - p1);
  if (fa > 0) {
    const gx = 260, gy = 220;
    for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) { const hi = j === Math.floor((t * 0.8) % 5); fillBox(gx + i * 58, gy + j * 58, 50, 50, hi ? C.gold : C.cyan, fa * (hi ? 0.5 : 0.15 + 0.2 * rnd(i, j))); }
    txt('fix p · average its whole line', gx + 200, gy + 330, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: fa });
    txt('M_p(y) ≥ 1 for every y', gx + 200, gy + 375, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: fa * P(S, 0, 2) });
    const vals = [[1, 1 / 2, '1/2'], [2, 1 / 2, '1/2'], [3, 7 / 9, '7/9'], [4, 74 / 75, '74/75'], [5, 553 / 580, '553/580']];
    const base = 600, sc = 380, one = base - sc;
    line(900, one, 1650, one, C.white, fa, 2); txt('1', 880, one + 8, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.white, a: fa });
    vals.forEach(([k, v, l], i) => { const q = P(S, 0, 3 + i * 0.5) * fa, x = 940 + i * 140; bar(x, base, 90, sc * v * q, C.mag, 0.7 * fa); txt(l, x + 45, base - sc * v * q - 12, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(k + (k > 1 ? ' primes' : ' prime'), x + 45, base + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); });
    txt('≤ 5 primes: some average < 1', 1270, 700, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: fa * P(S, 0, 6) });
  }
  if (p1 > 0) {
    txt('six primes: only 17 sets pass', W / 2, 220, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5), ab: 2 });
    const rs = [17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
    rs.forEach((r, i) => { const q = P(S, 1, 1 + i * 0.15), x = 290 + (i % 7) * 225, y = 300 + Math.floor(i / 7) * 80; chip(x, y, 205, 58, '3,5,7,11,13,' + r, C.cyan, q, 19); });
    ['3,5,7,11,17,19', '3,5,7,11,17,23', '3,5,7,13,17,19'].forEach((s, i) => chip(510 + i * 450, 500, 300, 58, s, C.mag, P(S, 1, 4 + i * 0.3), 22));
    txt('necessary condition · not a construction', W / 2, 620, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 6) });
    thm('Library/Arith/lettlsun2008cosets.md · complete prime marginals (MF1)', W / 2, 700, P(S, 1, 6.5), 'center');
  }
};

/* ---- 11 HOLE ---- */
SCENES.hole = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'counter');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const cx = 560, cy = 440;
  for (let i = 0; i < 463; i++) {
    const r = 120 + 180 * Math.sqrt(rnd(i, 1)), an = rnd(i, 2) * TAU + t * 0.05 * (i % 3 - 1);
    const q = clamp((u - lineAt(S, 0).s - 1 - i / 463 * 4) / 0.4);
    dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.75, 4, ['c', 'm', 'g', 'v'][i % 4], q * 0.8);
  }
  const hq = P(S, 1, 0.5);
  ctx.globalAlpha = hq; const g = ctx.createRadialGradient(cx, cy, 5, cx, cy, 110); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.7, 'rgba(0,0,0,0.8)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 110, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  ring(cx, cy, 100 + 4 * Math.sin(t * 3), C.red, hq, 3);
  txt('463 classes', cx, 160, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0 });
  const props = [['distinct odd moduli', 1.5], ['closed under divisors', 3], ['each class owns a private integer', 4.5], ['primes 3, 5, 7, 11, 13, 17, 19', 6]];
  props.forEach(([s, off], i) => txt('✓ ' + s, 1000, 260 + i * 60, { size: 28, fam: F.mono, w: 700, c: C.green, a: P(S, 0, off) }));
  txt('uncovered:', 1000, 560, { size: 26, fam: F.mono, w: 700, c: C.red, a: P(S, 1, 1) });
  txt('170,272,916,129', 1000, 630, { size: 56, fam: F.orb, w: 900, c: C.red, a: P(S, 1, 1.5), ab: 3 });
  txt('add tails: uncovered density < ε, never 0', 1000, 700, { size: 24, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 8) });
  thm('profile-notes/arithmetic/450-499/450 §13 · 214,369 incidence checks · refutes a supplier, not Erdős #7 itself', W / 2, 820, P(S, 1, 8), 'center');
};

/* ---- 12 AUDIT ---- */
SCENES.audit = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'audit');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  box(220, 200, 640, 520, C.vio, p0, 2, 'rgba(0,0,0,0.5)');
  txt('CLAIM A · "global nonexistence"', 250, 245, { size: 22, fam: F.mono, w: 700, c: C.vio, a: p0 });
  txt('renormalization step', 540, 330, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) });
  const fl = P(S, 0, 3);
  txt(fl > 0.5 ? 'β(e+1) ≥ β(e)' : 'β(e+1) < β(e)', 540, 430, { size: 44, fam: F.mono, w: 700, align: 'center', c: fl > 0.5 ? C.red : C.gold, a: P(S, 0, 1.5), ab: fl > 0.5 ? 2 : 0 });
  txt(fl > 0.5 ? 'the inequality points the wrong way' : 'claimed: strict decrease', 540, 500, { size: 22, fam: F.mono, align: 'center', c: fl > 0.5 ? C.red : C.dim, a: P(S, 0, 1.5) });
  txt('+ unproved localization · omitted prime-power reuse', 540, 600, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 5) });
  box(1060, 200, 640, 520, C.vio, p1, 2, 'rgba(0,0,0,0.5)');
  txt('CLAIM B · "exact-two-9"', 1090, 245, { size: 22, fam: F.mono, w: 700, c: C.vio, a: p1 });
  if (p1 > 0) {
    const base = 620, sc = 0.0036;
    bar(1170, base, 150, 79712 * sc * P(S, 1, 0.5, 1), C.gold, 0.7);
    bar(1420, base, 150, 59402 * sc * P(S, 1, 2.5, 1), C.red, 0.7);
    txt('required 79,712', 1245, base - 79712 * sc - 15, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 1) });
    txt('true 59,402', 1495, base - 59402 * sc - 15, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3) });
    txt('gain bound fails by 20,310', 1380, 680, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4.5) });
  }
  txt('neither closes the problem', W / 2, 800, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 1, 6), ab: 2 });
  thm('problem-details/71 · problem-details/75', W / 2, 850, P(S, 1, 6), 'center');
};

/* ---- 13 FRONTIER ---- */
SCENES.frontier = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'open');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  box(560, 180, 800, 470, C.gold, p0, 3, 'rgba(30,20,0,0.5)');
  txt('WANTED · AN ODD COVER', W / 2, 240, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p0, ab: 2, ls: 3 });
  const rows = [['lcm > 11,486,474', 1.5], ['uses 11, 13 or 17', 3.5], ['> 7 prime divisors below 100,000', 5.5], ['a prime-graph block of ≥ 8 primes', 8]];
  rows.forEach(([s, off], i) => txt('▸ ' + s, 620, 330 + i * 75, { size: 30, fam: F.mono, w: 700, c: C.white, a: P(S, 0, off) }));
  if (p1 > 0) {
    const q = P(S, 1, 0.5);
    box(300, 700, 480, 90, C.cyan, q, 2, 'rgba(0,0,0,0.5)'); txt('local tests', 540, 757, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: q });
    box(1140, 700, 480, 90, C.mag, q, 2, 'rgba(0,0,0,0.5)'); txt('whole cover', 1380, 757, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.mag, a: q });
    for (let i = 0; i < 12; i++) { const x = 800 + i * 27; const ok = i < 3 || i > 8; if (ok) fillBox(x, 740, 20, 10, C.dim, q); }
    txt('?', W / 2, 760, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 2) * (0.6 + 0.4 * Math.sin(t * 4)), ab: 3 });
    txt('bridge: OPEN', W / 2, 830, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3) });
  }
};

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const rec = [['every wall certified', C.cyan], ['every premise named', C.gold], ['every claimed shortcut checked', C.vio], ['one theorem frozen in Lean', C.green], ['Erdős #7: still open', C.red]];
    rec.forEach(([r, col], i) => txt('▸ ' + r, 620, 260 + i * 70, { size: 32, fam: F.mono, w: 700, c: col, a: P(S, 0, 0.5 + i * 1.0) * fade }));
    txt('Now we know where the answer has to live.', W / 2, 720, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), cx = W / 2, cy = 350;
    for (let k = 0; k < 12; k++) { const r = 60 + k * 14, an = t * (0.8 - k * 0.05) + k; ring(cx, cy, r, [C.cyan, C.mag, C.gold][k % 3], ep * out * 0.35, 1.2); dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r, 7, ['c', 'm', 'g'][k % 3], ep * out); }
    txt('ODD COVERING SYSTEMS', W / 2, 640, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 8 });
    txt('Erdős 第七问题 · 奇数覆盖系统 · TRURETURING FILM 020', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Not a solution. A map.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'COVERING', density: 'DENSITY', known: 'PRIOR ART', sprint: 'SPRINT', lean: 'LEAN', lcm: 'LCM WALL', cutoff: 'CUTOFF 19', graph: 'PRIME GRAPH', seven: 'SEVEN PRIMES', marginal: 'MARGINALS', hole: 'THE HOLE', audit: 'AUDIT', frontier: 'FRONTIER', finale: 'OPEN' });

function poster20() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const cx = W / 2, cy = 470;
  for (let i = 0; i < 463; i++) { const r = 130 + 220 * Math.sqrt(rnd(i, 1)), an = rnd(i, 2) * TAU; dot(cx + Math.cos(an) * r * 1.5, cy + Math.sin(an) * r * 0.7, 5, ['c', 'm', 'g', 'v'][i % 4], 0.9); }
  const g = ctx.createRadialGradient(cx, cy, 5, cx, cy, 120); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 120, 0, TAU); ctx.fill();
  ring(cx, cy, 105, C.red, 1, 3);
  txt('?', cx, cy + 40, { size: 120, fam: F.orb, w: 900, align: 'center', c: C.gold, ab: 3 });
  txt('只用奇数模，能盖住所有整数吗？', W / 2, 170, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ODD COVERING SYSTEMS', W / 2, 850, { size: 88, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 8 });
  bloom(0.65);
  txt('Erdős 第七问题 · 奇 数 覆 盖 系 统', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 020', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster20;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
