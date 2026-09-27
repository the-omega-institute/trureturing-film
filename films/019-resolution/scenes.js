/* Film 019 — EFFECTIVE RESOLUTION · 算术编码与有效分辨率. */

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


/* ---- film 019 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    theory: ['THEORY VOLUME · PAPER PROOF', C.orange, 'rgba(40,20,0,0.75)'],
    known: ['THEORY VOLUME · PAPER PROOF · CITES PRIOR RESULT', C.orange, 'rgba(40,20,0,0.75)'],
    open: ['THEORY VOLUME · PAPER ARGUMENT · CLAIM STATUS OPEN', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cross(x, y, s, col, a) { if (a <= 0) return; line(x - s, y - s, x + s, y + s, col, a, 4); line(x - s, y + s, x + s, y - s, col, a, 4); }
function zeck(n) { const w = [1, 2, 3, 5, 8, 13, 21]; let d = ''; let started = false; for (let i = w.length - 1; i >= 0; i--) { if (w[i] <= n) { n -= w[i]; d += '1'; started = true; } else if (started) d += '0'; } return d || '0'; }
function tern(x, y, w, depth, a, alive, col = C.cyan) {
  /* ternary/binary tree: alive(path) returns 0 dead, 1 alive */
  const rec = (px, py, lvl, path, span) => {
    if (lvl > depth) return;
    const k = alive.k || 3;
    for (let i = 0; i < k; i++) {
      const cx = px + (i - (k - 1) / 2) * span, cy = py + 95;
      const p = path + i, al = alive(p);
      line(px, py, cx, cy, al ? col : C.red, a * (al ? 0.8 : 0.25), al ? 2 : 1);
      dot(cx, cy, lvl < 3 ? 9 : 6, al ? 'c' : 'r', a * (al ? 1 : 0.4));
      if (al) rec(cx, cy, lvl + 1, p, span / k);
    }
  };
  dot(x, y, 12, 'g', a); rec(x, y, 1, '', w / 3);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  const cx = W / 2, cy = 420;
  ring(cx, cy, 90 + 6 * Math.sin(t * 2), C.gold, sp, 3);
  txt('13', cx, cy + 30, { size: 90, fam: F.orb, w: 900, align: 'center', c: C.gold, a: sp, ab: 3 });
  const reps = [['binary', '1101', C.cyan, -1], ['Zeckendorf', '100000', C.mag, 0], ['remainders', '(1, 1, 3) mod (2, 3, 5)', C.green, 1]];
  reps.forEach(([l, v, col, i], k) => {
    const q = P(S, 0, 1 + k * 1.6);
    const x = cx + i * 560, y = i === 0 ? 200 : 300;
    const yy = i === 0 ? 220 : 330;
    line(cx + i * 100, cy - (i === 0 ? 90 : 20), x, yy + 40, col, q * 0.6, 2);
    txt(l, x, yy, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
    txt(v, x, yy + 55 + (i === 0 ? -150 : 0) * 0, { size: 40, fam: F.mono, w: 700, align: 'center', c: col, a: q, ab: 1 });
  });
  const chain = ['congruence', 'digits', 'blocks', 'prefixes', 'probability'];
  chain.forEach((c, i) => {
    const q = P(S, 1, 0.5 + i * 0.9), x = 330 + i * 315;
    box(x - 130, 640, 260, 70, [C.cyan, C.mag, C.gold, C.vio, C.green][i], q, 2, 'rgba(0,0,0,0.5)');
    txt(c, x, 685, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    if (i < 4) arrow(x + 135, 675, x + 180, 675, C.dim, P(S, 1, 0.9 + i * 0.9), 2);
  });
  txt('what does each move cost?', W / 2, 800, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 5.5), ab: 2 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cx = W / 2, cy = 330;
  for (let k = 0; k < 27; k++) { const an = k / 27 * TAU + t * 0.2, r = 70 + 50 * ((k % 3)) + 20 * Math.sin(t + k); dot(cx + Math.cos(an) * r * 1.8, cy + Math.sin(an) * r * 0.7, 7, ['c', 'm', 'g'][k % 3], rp * 0.9); }
  ring(cx, cy, 40, C.gold, rp, 2);
  txt(scramble('EFFECTIVE RESOLUTION', rp, 191), W / 2, 620, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 8 });
  txt('算 术 编 码 · 有 效 分 辨 率', W / 2, 700, { size: 46, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 019 · RECURSIVE_RELATIONAL_OBSERVATION_EFFECTIVE_RESOLUTION', W / 2, 170, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  ['EXPRESSIBLE', 'IDENTIFIABLE', 'OBTAINABLE', 'CERTIFIABLE'].forEach((l, i) => {
    const q = P(S, 1, 0.3 + i * 1.0), x = W / 2 + (i - 1.5) * 400, col = [C.cyan, C.mag, C.gold, C.green][i];
    box(x - 175, 760, 350, 64, col, q, 2, 'rgba(0,0,0,0.5)');
    txt(l, x, 802, { size: 26, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 });
  });
};

/* ---- 02 SUMMARY ---- */
SCENES.summary = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [['remove 0 mod 9', 0, C.cyan], ['remove 1 mod 9', 1, C.mag]].forEach(([lab, rm, col], r) => {
    const y = 220 + r * 210;
    txt(lab, 240, y - 20, { size: 26, fam: F.mono, w: 700, c: col, a: p0 });
    let n = 0;
    for (let i = 0; i < 9; i++) {
      const x = 240 + i * 105;
      const dead0 = i === rm && P(S, 0, 2 + r * 2) > 0, dead1 = i % 3 === 0 && p1 > 0 && i !== rm;
      const dead = dead0 || dead1;
      if (!dead) n++;
      cellv(x, y, 88, i, dead ? C.red : col, p0 * (dead ? 0.45 : 1));
      if (dead0) cross(x + 44, y + 44, 30, C.red, P(S, 0, 2 + r * 2));
      if (dead1) cross(x + 44, y + 44, 30, C.orange, P(S, 1, 2.5 + r * 1.5));
    }
    const pre = p1 > 0 ? P(S, 1, 2.5 + r * 1.5) : 0;
    txt(pre > 0.5 ? String(n) : '8', 1300, y + 72, { size: 84, fam: F.orb, w: 900, align: 'center', c: pre > 0.5 ? C.gold : col, a: p0 * P(S, 0, 3 + r * 2), ab: 2 });
    txt('survivors', 1300, y + 110, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 * P(S, 0, 3 + r * 2) });
    txt('L = 9 · |H| = 8 · moduli {9}', 1580, y + 55, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 5) * (1 - p1 * 0.6) });
  });
  txt('identical summaries', W / 2, 660, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 0, 6) * (1 - p1) });
  txt('then remove 0 mod 3 :  6  vs  5', W / 2, 660, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5), ab: 2 });
  txt('one count is not enough memory to continue', W / 2, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 6.5) });
  thm('§1.1 · (TM.364) · |H′| = k|H| − R', W / 2, 790, P(S, 1, 7), 'center');
};

/* ---- 03 DIGITS ---- */
SCENES.digits = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const x0 = 280;
  txt('n', x0, 200, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: p0 });
  txt('Zeckendorf', x0 + 230, 200, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p0 });
  txt('binary', x0 + 470, 200, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
  for (let n = 0; n <= 8; n++) {
    const y = 250 + n * 56, q = p0 * P(S, 0, 0.3 + n * 0.25);
    const hi = (n === 0 || n === 3) ? P(S, 0, 5) : 0;
    if (hi > 0) fillBox(x0 - 60, y - 36, 620, 48, n === 3 ? C.mag : C.cyan, 0.12 * hi);
    txt(String(n), x0, y, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    const z = zeck(n).padStart(5, ' '), b = n.toString(2).padStart(4, ' ');
    txt(z.slice(0, 3), x0 + 230 - 18, y, { size: 30, fam: F.mono, w: 700, align: 'right', c: C.dim, a: q });
    txt(z.slice(3), x0 + 230 - 18, y, { size: 30, fam: F.mono, w: 700, align: 'left', c: C.mag, a: q });
    txt(b.slice(0, 2), x0 + 470 - 18, y, { size: 30, fam: F.mono, w: 700, align: 'right', c: C.dim, a: q });
    txt(b.slice(2), x0 + 470 - 18, y, { size: 30, fam: F.mono, w: 700, align: 'left', c: C.cyan, a: q });
  }
  txt('weights  1 2 3 5 8', x0 + 230, 780, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  txt('last two digits', x0 + 350, 820, { size: 20, fam: F.mono, align: 'center', c: C.white, a: P(S, 0, 3) });
  txt('3 → 00 = 0 → 00   (Zeckendorf)', 1330, 330, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 5) });
  txt('3 → 11 ≠ 0 → 00   (binary)', 1330, 380, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 7) });
  if (p1 > 0) {
    const ws = [1, 2, 3, 5, 8, 13, 21, 34, 55];
    txt('weights mod 2', 1330, 480, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: p1 });
    ws.forEach((w, i) => { const q = P(S, 1, 0.3 + i * 0.25), x = 1330 + (i - 4) * 82; const col = [C.gold, C.vio, C.green][i % 3]; cellv(x - 34, 505, 68, w % 2, col, q); txt(String(w), x, 610, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); });
    txt('period 3  →  parity never readable from low digits', 1330, 690, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 1 });
    txt('same integers · different readable resolution', 1330, 750, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 7) });
  }
  thm('§1.2 · (TM.387) · (TM.390)', 1330, 820, P(S, 1, 7), 'center');
};

/* ---- 04 MACHINE ---- */
SCENES.machine = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'known');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const fa = p0 * (1 - p1);
  /* binary mod 3 */
  const bx = 520, by = 430;
  for (let i = 0; i < 3; i++) { const an = i / 3 * TAU - Math.PI / 2, x = bx + Math.cos(an) * 110, y = by + Math.sin(an) * 110; ring(x, y, 34, C.cyan, fa, 3); txt(String(i), x, y + 11, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: fa }); }
  txt('binary · mod 3', bx, 270, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: fa });
  txt('3 states', bx, 640, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: fa * P(S, 0, 4) });
  /* fibonacci mod 3: 18 */
  const fx = 1350, fy = 430;
  for (let i = 0; i < 18; i++) {
    const q = fa * P(S, 0, 1 + i * 0.12);
    const an = i / 18 * TAU + t * 0.1, x = fx + Math.cos(an) * 190, y = fy + Math.sin(an) * 140;
    ring(x, y, 20, C.mag, q, 2);
    const an2 = (i + 5) / 18 * TAU + t * 0.1; line(x, y, fx + Math.cos(an2) * 190, fy + Math.sin(an2) * 140, C.mag, q * 0.25, 1);
  }
  txt('Fibonacci digits · mod 3', fx, 270, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: fa });
  txt('k·L^k = 2·3² = 18 states', fx, 640, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, a: fa * P(S, 0, 4), ab: 2 });
  if (p1 > 0) {
    const Ls = [3, 5, 7, 9];
    Ls.forEach((L, i) => {
      const q = P(S, 1, 0.5 + i * 0.6), x = 560 + i * 280, fib = 2 * L * L;
      fillBox(x - 60, 640 - fib * 2.6 * q, 50, fib * 2.6 * q, C.mag, 0.7 * p1);
      fillBox(x + 10, 640 - L * 2.6 * q, 50, L * 2.6 * q, C.cyan, 0.7 * p1);
      txt(String(fib), x - 35, 630 - fib * 2.6 * q, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q });
      txt(String(L), x + 35, 630 - L * 2.6 * q, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
      txt('L = ' + L, x, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    });
    txt('no finite converter', W / 2, 760, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
    txt('a bijection of words does not preserve prefix cost', W / 2, 810, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 6) });
  }
  thm('Thm 1.2 (state complexity: Charlier–Rampersad–Rigo–Waxweiler) · Cor 1.7 · Cobham-type: Durand–Rigo', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 05 COVER ---- */
SCENES.cover = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const zs = [0, 1, -1, 2, -2, 3, -3, 4, -4];
  line(260, 300, 1660, 300, C.dim, p0, 2);
  for (let k = -5; k <= 5; k++) { const x = 960 + k * 120; txt(String(k), x, 350, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p0 }); line(x, 290, x, 310, C.dim, p0, 2); }
  zs.forEach((z, i) => {
    const q = P(S, 0, 1 + i * 0.5), x = 960 + z * 120;
    dot(x, 300, 14, q > 0.5 ? 'r' : 'c', p0);
    txt('mod 3^' + (i + 1), x, 250 - (i % 2) * 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.orange, a: q });
  });
  txt('every integer is hit', W / 2, 430, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 0, 6) });
  if (p1 > 0) {
    const bx = 360, bw = 1200, by = 500;
    box(bx, by, bw, 60, C.cyan, p1, 2, 'rgba(0,0,0,0.4)');
    let acc = 0;
    for (let n = 1; n <= 8; n++) { const w = bw * Math.pow(3, -n), q = P(S, 1, 0.3 + n * 0.3); fillBox(bx + acc, by, w * q, 60, C.red, 0.75 * p1); acc += w; }
    txt('removed ≤ Σ 3^(−n) = 1/2', bx + bw / 4, by + 100, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 2) });
    txt('3-adic survivors ≥ 1/2', bx + 3 * bw / 4, by + 100, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3), ab: 1 });
    const hs = [2, 5, 14, 41, 122, 365];
    txt('|H_N| ≥ (3^N + 1)/2 :', 560, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
    hs.forEach((h, i) => txt(String(h), 850 + i * 130, 720, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5.5 + i * 0.4) }));
  }
  thm('§1.1 (TM.366–370) · §2.2 Prop 2.4 · Erdős-type covering problems are not claimed', W / 2, 820, P(S, 1, 7), 'center');
};

/* ---- 06 GHOST ---- */
SCENES.ghost = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const kill = {};
  const killed = ['2', '01', '100', '0021', '11110', '1202'];
  killed.forEach((k, i) => { if (P(S, 0, 1.5 + i * 0.8) > 0.5) kill[k] = 1; });
  const alive = p => { for (const k in kill) if (p.startsWith(k)) return 0; return 1; };
  alive.k = 3;
  tern(560, 200, 900, 4, p0, alive);
  killed.forEach((k, i) => txt('φ_' + i + ' halts → forbid', 1180, 250 + i * 40, { size: 20, fam: F.mono, w: 700, c: C.red, a: P(S, 0, 1.5 + i * 0.8) }));
  txt('μ(K) ≥ 1/2', 1400, 560, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 0, 6), ab: 2 });
  txt('no integer · no computable point', 1400, 610, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 8) });
  if (p1 > 0) {
    for (let i = 0; i < 12; i++) { const q = P(S, 1, 0.5 + i * 0.25); const x = 300 + rnd(i, 3) * 540, y = 600 + rnd(i, 7) * 120; dot(x, y, 10, i % 2 ? 'g' : 'w', q * (0.6 + 0.4 * Math.sin(t * 4 + i))); }
    txt('random hit: P ≥ 1/2   ✓', 1400, 680, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2) });
    txt('certify the hit: never   ✗', 1400, 725, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3.5) });
    txt('exclusion: finite witness   ✓', 1400, 770, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 6) });
  }
  thm('§2.2 Prop 2.2 · §2.4 · computable-point lemma: Bienvenu–Porter; König / Kleene tree: Bauer 2006', W / 2, 840, P(S, 1, 7), 'center');
};

/* ---- 07 BINARY ---- */
SCENES.binary = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const bx = 360, bw = 1200, y0 = 260;
  box(bx, y0, bw, 70, C.cyan, p0, 2, 'rgba(0,0,0,0.4)');
  line(bx + bw / 2, y0, bx + bw / 2, y0 + 70, C.white, p0, 2);
  txt('[0]', bx + bw / 4, y0 - 15, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('[1]', bx + 3 * bw / 4, y0 - 15, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  /* forbid 0^n 1: [01] = [0.25,0.5), [001]=[0.125,0.25) ... in [0] half measured from left: 0^n1 occupies [2^-(n+1), 2^-n) */
  for (let n = 1; n <= 9; n++) {
    const q = P(S, 0, 1.5 + n * 0.3), a0 = Math.pow(2, -(n + 1)), a1 = Math.pow(2, -n);
    fillBox(bx + bw * a0, y0, bw * (a1 - a0) * q, 70, C.red, 0.7 * p0);
    if (n <= 3) txt('0'.repeat(n) + '1', bx + bw * (a0 + a1) / 2, y0 + 110, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: q });
  }
  dot(bx + 4, y0 + 35, 12 + 3 * Math.sin(t * 5), 'g', p0 * P(S, 0, 4));
  txt('000… survives', bx + 40, y0 + 170, { size: 22, fam: F.mono, w: 700, c: C.gold, a: p0 * P(S, 0, 4) });
  const halts = Math.sin(t * 0.9) > 0;
  const q1 = P(S, 0, 6);
  box(760, 470, 400, 64, halts ? C.red : C.green, q1, 2, 'rgba(0,0,0,0.5)');
  txt(halts ? 'machine halts: forbid [0]' : 'machine runs: keep [0]', 960, 512, { size: 24, fam: F.mono, w: 700, align: 'center', c: halts ? C.red : C.green, a: q1 });
  if (halts) fillBox(bx, y0, 8, 70, C.red, q1);
  txt('surviving mass = 1/2', 960, 610, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 1, 0.5), ab: 2 });
  txt('1/2 = 2^(−1) = Σ_{h≥2} 2^(−h)', 960, 680, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
  txt('same number, two expansions: mass cannot see [0]', 960, 740, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 6) });
  thm('§2.8 · Thm 2.40 · (TM.672), (TM.675)', W / 2, 820, P(S, 1, 7), 'center');
};

/* ---- 08 COMB ---- */
SCENES.comb = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const depthOn = n => P(S, 1, 0.5 + n * 0.7) > 0.5;
  const aliveB = p => { for (let i = 0; i < p.length; i++) { if (p[i] === '1' && depthOn(i + 1)) return 0; } return 1; };
  aliveB.k = 2;
  const aliveT = p => { for (let i = 0; i < p.length; i++) { if (p[i] === '2' && p.slice(0, i) === '0'.repeat(i) && depthOn(i + 1)) return 0; } return 1; };
  aliveT.k = 3;
  tern(520, 230, 700, 4, p0, aliveB);
  tern(1400, 230, 820, 4, p0, aliveT);
  txt('2 letters · forbid 1 word per level', 520, 200, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
  txt('3 letters · forbid 1 word per level', 1400, 200, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
  txt('comb: 1, 01, 001, 0001, …', 520, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 1) });
  txt('only 000… left · probability 0', 520, 740, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4) });
  txt('mass always survives', 1400, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
  txt('positive gap  ⟺  alphabet ≥ c + 2', W / 2, 810, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 2.5), ab: 2 });
  thm('§5.7 · Prop 5.7.2 · Thm 5.7.3', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 09 ENVELOPE ---- */
SCENES.envelope = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const leaves = ['000', '001', '010', '011', '100', '101', '110', '111'];
  const mass = w => [...w].reduce((m, c) => m * (c === '0' ? 0.9 : 0.1), 1);
  const lx = i => 380 + i * 165, ly = 560;
  const pos = (p) => { const d = p.length; if (d === 0) return [1000, 200]; const idx = parseInt(p, 2), span = 8 / Math.pow(2, d); return [lx(idx * span + (span - 1) / 2), 200 + d * 120]; };
  const sel0 = w => w[0] === '0', sel1 = w => ['000', '001', '010', '100'].includes(w);
  const pick = p1 > 0 ? sel1 : sel0, hp = p1 > 0 ? P(S, 1, 2) : P(S, 0, 5);
  const nodes = ['', '0', '1', '00', '01', '10', '11', ...leaves];
  nodes.forEach(p => { if (p.length) { const [x, y] = pos(p), [px, py] = pos(p.slice(0, -1)); line(px, py, x, y, C.dim, p0 * 0.7, 2); txt(p[p.length - 1] === '0' ? '.9' : '.1', (x + px) / 2 + 14, (y + py) / 2, { size: 16, fam: F.mono, c: C.dim, a: p0 }); } });
  nodes.forEach(p => { const [x, y] = pos(p); dot(x, y, p.length === 3 ? 10 : 12, p === '0' && p1 <= 0 && P(S, 0, 2) > 0 ? 'g' : 'c', p0); });
  leaves.forEach((w, i) => {
    const on = pick(w);
    box(lx(i) - 70, ly + 30, 140, 90, on ? (p1 > 0 ? C.mag : C.gold) : C.dim, p0 * (on ? 0.5 + 0.5 * hp : 0.5), on ? 3 : 1.5, on ? 'rgba(40,20,40,0.5)' : 'rgba(0,0,0,0.4)');
    txt(w, lx(i), ly + 65, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
    txt(mass(w).toFixed(3).slice(1), lx(i), ly + 102, { size: 20, fam: F.mono, align: 'center', c: on ? C.gold : C.dim, a: p0 });
  });
  txt('stop on [0] : 9/10', 1600, 240, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 2) });
  txt('true image at depth 3 : 9/10', 1600, 290, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 5) });
  txt('count only (4 words) : 243/250', 1600, 360, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 2), ab: 1 });
  txt('a count forgets ancestors', W / 2, 800, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 1, 5), ab: 2 });
  thm('§7.3 · Counterexample 7.1 · Kraft: 1·2^−1 = 4·2^−3', W / 2, 850, P(S, 1, 6), 'center');
};

/* ---- 10 WAIT ---- */
SCENES.wait = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  for (let i = 0; i < 10; i++) { const q = P(S, 0, 0.2 + i * 0.2); const b = i === 3 ? 0 : 1; cellv(300 + i * 90, 210, 70, b, b ? C.cyan : C.gold, q); }
  txt('E τ = 2', 1450, 260, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 0, 2), ab: 2 });
  const ns = [0, 1, 2, 4, 16, 65536];
  const X = n => 300 + (n === 65536 ? 1300 : Math.log2(n + 1) / Math.log2(17) * 1000);
  line(280, 420, 1650, 420, C.dim, P(S, 0, 4), 2);
  ns.forEach((n, i) => { const q = P(S, 0, 4 + i * 0.6), x = X(n); line(x, 395, x, 445, C.gold, q, 3); txt(String(n), x, 480, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); });
  txt('⋯', 1450, 430, { size: 30, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 7) });
  txt('n_j = 2^(n_{j−1})', 1450, 370, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 7.5) });
  if (p1 > 0) {
    txt('same stopping event   ✓', 560, 580, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 0.5) });
    txt('E stages ≤ 2   ✓', 560, 630, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2) });
    const terms = ['1/2', '1/2', '3/4', '4095/4096', '…'];
    terms.forEach((s, i) => txt(s + (i < 4 ? ' +' : ''), 1080 + i * 150 + (i > 3 ? 60 : 0), 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 3 + i * 0.5) }));
    txt('E τ′ = ∞', 1380, 680, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 5), ab: 3 });
    txt('lossless for truth · not for time', W / 2, 790, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7), ab: 2 });
  }
  thm('§7.11 · Counterexample 7.5 · Prop 7.7: finite for all laws ⟺ sup n_j/(n_{j−1}+1) < ∞', W / 2, 850, P(S, 1, 7), 'center');
};

/* ---- 11 SHAPES ---- */
SCENES.shapes = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const fa = p0 * (1 - p1);
  if (fa > 0) {
    [[[0, 1], C.cyan, 'A = {0, 1}'], [[6, 10], C.mag, 'B = {6, 10}']].forEach(([set, col, lab], g) => {
      const gx = 330 + g * 760, gy = 260, s = 80;
      txt(lab, gx + 200, 220, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: fa });
      const delC = P(S, 0, 4), delR = P(S, 0, 6);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
        const x = gx + c * s, y = gy + r * s;
        const off = (c === 0 && delC > 0.5) || (r === 0 && delR > 0.5);
        box(x, y, s - 6, s - 6, off ? C.red : C.dim, fa * (off ? 0.5 : 0.7), 1.5, off ? 'rgba(60,0,10,0.4)' : 'rgba(0,0,0,0.4)');
      }
      set.forEach(n => { const r = n % 3, c = n % 5, x = gx + c * s + (s - 6) / 2, y = gy + r * s + (s - 6) / 2; const dead = (c === 0 && delC > 0.5) || (r === 0 && delR > 0.5); dot(x, y, 22, dead ? 'r' : (g ? 'm' : 'c'), fa * (dead ? 0.35 : 1)); txt(String(n), x, y + 48, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: fa }); });
      txt('rows mod 3 : (1,1,0)   cols mod 5 : (1,1,0,0,0)', gx + 200, 540, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: fa * P(S, 0, 2) });
      const alive = set.filter(n => n % 5 !== 0 && n % 3 !== 0).length;
      txt(alive + ' left', gx + 200, 620, { size: 40, fam: F.orb, w: 900, align: 'center', c: alive ? C.green : C.red, a: fa * P(S, 0, 7), ab: 2 });
    });
    txt('delete 0 mod 5, then 0 mod 3', W / 2, 700, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: fa * P(S, 0, 4) });
  }
  if (p1 > 0) {
    const shapes = [['empty', []], ['point', [[1, 1]]], ['row', [[1, 0], [1, 1], [1, 2]]], ['column', [[0, 1], [1, 1], [2, 1]]], ['cross', [[1, 0], [1, 1], [1, 2], [0, 1], [2, 1]]], ['matching', [[0, 0], [1, 1]]], ['full', [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]]];
    shapes.forEach(([n, cells], i) => {
      const q = P(S, 1, 0.5 + i * 0.5), x0 = 240 + i * 215, y0 = 250;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) box(x0 + c * 50, y0 + r * 50, 44, 44, C.dim, q * 0.6, 1, 'rgba(0,0,0,0.4)');
      cells.forEach(([r, c]) => fillBox(x0 + c * 50 + 4, y0 + r * 50 + 4, 36, 36, [C.cyan, C.mag, C.gold, C.green, C.vio, C.orange, C.blue][i], q * 0.8));
      txt(n, x0 + 72, y0 + 190, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    });
    txt('question: "is anything left?"  →  7 shapes', W / 2, 560, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
    txt('moduli 3 × 5 :  100 classes  among  32,768 sets', W / 2, 640, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 1, 6), ab: 2 });
  }
  thm('§8.2.3 · §8.4 · classification ER8.FB.14 · N = 2 + 2mn + m + n + 2·C(m,2)·C(n,2)', W / 2, 800, P(S, 1, 7), 'center');
};

/* ---- 12 NOISE ---- */
SCENES.noise = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const gx = 330, gy = 250, s = 120;
  const M = p1 > 0 ? [[3, 0, 0], [0, 1, 1], [0, 1, 1]].map(r => r.map(v => v / 7)) : [[0.2, 0.05, 0.1], [0.08, 0.15, 0.07], [0.1, 0.12, 0.13]];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    const v = M[r][c];
    fillBox(gx + c * s, gy + r * s, s - 8, s - 8, C.cyan, p0 * (0.1 + v * 1.8));
    box(gx + c * s, gy + r * s, s - 8, s - 8, C.cyan, p0, 1.5);
    txt(p1 > 0 ? ([[3, 0, 0], [0, 1, 1], [0, 1, 1]][r][c] + '/7') : v.toFixed(2), gx + c * s + (s - 8) / 2, gy + r * s + s / 2 + 8, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  }
  const chips = ['∅', 'r0', 'r1', 'r2', 'c0', 'c1', 'c2'];
  for (let i = 0; i < 16; i++) {
    const q = P(S, 0, 1 + i * 0.15), x = 1000 + (i % 4) * 150, y = 250 + Math.floor(i / 4) * 70;
    const lab = i === 0 ? 'none' : i <= 6 ? 'del ' + chips[i] : 'del r' + ((i - 7) / 3 | 0) + 'c' + ((i - 7) % 3);
    box(x, y, 135, 52, i === 0 ? C.gold : i <= 6 ? C.mag : C.vio, q, 1.5, 'rgba(0,0,0,0.45)');
    txt(lab, x + 67, y + 34, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  }
  txt('16 readings · each ± ε', 1300, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  txt('real-valued recovery :  2 ε', 1300, 630, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5), ab: 1 });
  if (p1 > 0) {
    txt('probability output :  20/9 ε', 1300, 690, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 1), ab: 2 });
    txt('(sharp for ε ≤ 1/7)', 1300, 730, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 2) });
    txt('9 real sources · 1 shared observation', 490, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 4) });
    txt('some cell ≤ 1/9', 490, 700, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 6), ab: 1 });
  }
  thm('§9 · Thm ER9.SH.1 · 25 orbits under the 72-element symmetry group', W / 2, 820, P(S, 1, 7), 'center');
};

/* ---- 13 MEMORY ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'open');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const cx = 500, cy = 460, R = 210;
  const P12 = i => [cx + Math.cos(i / 12 * TAU - Math.PI / 2) * R, cy + Math.sin(i / 12 * TAU - Math.PI / 2) * R];
  const port4 = P(S, 0, 4) > 0.5;
  for (let i = 0; i < 12; i++) {
    const [x, y] = P12(i), col = port4 ? ['c', 'm', 'g', 'n'][i % 4] : ['c', 'm'][i % 2];
    dot(x, y, 14, col, p0); txt(String(i), x + (x - cx) * 0.16, y + (y - cy) * 0.16 + 8, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  }
  const ph = (t * 0.6) % 1, hl = port4 && p1 <= 0;
  [0, 6].forEach(i => { const [x, y] = P12(i), [x2, y2] = P12((2 * i) % 12); if (hl) { ring(x, y, 26, C.red, P(S, 0, 5), 3); } });
  for (let i = 0; i < 12; i++) { const [x, y] = P12(i), [x2, y2] = P12((2 * i) % 12); if (i !== 0) curveArrow(x, y, x2, y2, C.dim, p0 * 0.35); }
  txt('t ↦ 2t  (mod 12)', cx, 180, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 });
  txt('old port reads mod 2 : k = 1', 1350, 280, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) });
  txt('old port reads mod 4 : k = 2', 1350, 340, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 4) });
  txt('0 and 6 → same new phase, different old reading', 1350, 395, { size: 22, fam: F.mono, align: 'center', c: C.red, a: P(S, 0, 6) });
  if (p1 > 0) {
    const rows = [['steps', '1', '2', '3'], ['one bit per step', '2', '4', '8'], ['actually needed', '2', '4', '4']];
    rows.forEach((r, i) => r.forEach((c, j) => txt(c, j === 0 ? 1180 : 1330 + j * 110, 500 + i * 60, { size: 26, fam: F.mono, w: 700, align: j === 0 ? 'right' : 'center', c: i === 0 ? C.dim : i === 1 ? C.orange : C.green, a: P(S, 1, 0.8 + i * 1.2 + (i ? j * 0.3 : 0)) })));
    txt('k_n = gcd(12, 2ⁿ)  →  memory saturates', 1350, 720, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6), ab: 2 });
  }
  thm('§11.4 Thm 11.5 · §11.5 Thm 11.7 (11.14)', W / 2, 840, P(S, 1, 7), 'center');
};
function curveArrow(x1, y1, x2, y2, col, a) { if (a <= 0) return; const mx = (x1 + x2) / 2 * 0.8 + 500 * 0.2, my = (y1 + y2) / 2 * 0.8 + 460 * 0.2; ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); ctx.globalAlpha = 1; }

/* ---- 14 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const rec = [['same count · different future (6 vs 5)', C.cyan], ['positive mass · no computable point', C.mag], ['same truth · infinite wait', C.gold], ['a probability costs 20/9, not 2', C.vio], ['memory saturates: 4, not 8', C.green]];
    rec.forEach(([r, col], i) => txt('▸ ' + r, 520, 260 + i * 70, { size: 30, fam: F.mono, w: 700, c: col, a: P(S, 0, 0.5 + i * 1.1) * fade }));
    txt('Resolution is what you can still legally do.', W / 2, 720, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), cx = W / 2, cy = 350;
    for (let k = 0; k < 27; k++) { const an = k / 27 * TAU + t * 0.2, r = 70 + 50 * (k % 3); dot(cx + Math.cos(an) * r * 1.8, cy + Math.sin(an) * r * 0.7, 7, ['c', 'm', 'g'][k % 3], ep * out); }
    txt('EFFECTIVE RESOLUTION', W / 2, 640, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 8 });
    txt('算 术 编 码 · 有 效 分 辨 率 · TRURETURING FILM 019', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Keep what the next legal move can use.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'ONE OBJECT', summary: 'SAME SUMMARY', digits: 'DIGITS', machine: 'STATE COST', cover: 'COVER', ghost: 'GHOST SET', binary: 'BINARY EDGE', comb: 'COMB', envelope: 'ENVELOPE', wait: 'WAITING', shapes: 'SEVEN SHAPES', noise: 'NOISE', memory: 'PHASE MEMORY', finale: 'RESOLUTION' });

function poster19() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const alive = p => (p.startsWith('2') || p.startsWith('01') || p.startsWith('100') || p.startsWith('0021')) ? 0 : 1; alive.k = 3;
  tern(W / 2, 250, 1100, 4, 1, alive);
  txt('测度为正，却没有一个可计算的点', W / 2, 170, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('EFFECTIVE RESOLUTION', W / 2, 850, { size: 88, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 8 });
  bloom(0.65);
  txt('算 术 编 码 · 有 效 分 辨 率', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 019', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster19;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
