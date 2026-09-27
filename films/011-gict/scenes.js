/* Film 011 — FIXED FRAME · 黄金不动坐标. GICT: a good coordinate system is a fixed frame. */

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


/* ---- film 011 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · ARGUED / CERTIFIED, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    classic: ['CLASSICAL THEOREM · KNOWN MATHEMATICS', C.blue, 'rgba(0,15,40,0.75)'],
    wall: ['WALL · WHAT THE THEORY DOES NOT CLAIM', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const frac = x => x - Math.floor(x);
const gword = n => Math.floor((n + 1) / PHI) - Math.floor(n / PHI);
/* golden spiral made of quarter arcs */
function spiral(cx, cy, s, rot, a, col = C.gold, n = 9) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath();
  for (let i = 0; i <= 400; i++) { const th = i / 400 * n * Math.PI / 2; const r = s * Math.pow(PHI, -th / (Math.PI / 2)); const x = r * Math.cos(-th), y = r * Math.sin(-th); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke(); ctx.restore(); ctx.globalAlpha = 1;
}
/* N points {n a} on a circle, gaps coloured by length class */
function gapCircle(cx, cy, R, alpha, N, a, label) {
  if (a <= 0) return;
  const p = []; for (let n = 0; n < N; n++) p.push(frac(n * alpha)); p.sort((x, y) => x - y);
  const gaps = p.map((v, i) => (i + 1 < p.length ? p[i + 1] : p[0] + 1) - v);
  const cls = [...new Set(gaps.map(g => g.toFixed(7)))].sort();
  const cols = [C.cyan, C.mag, C.gold];
  p.forEach((v, i) => {
    const k = cls.indexOf(gaps[i].toFixed(7));
    ctx.globalAlpha = a; ctx.strokeStyle = cols[k % 3]; ctx.lineWidth = 7; ctx.beginPath();
    ctx.arc(cx, cy, R, -Math.PI / 2 + v * TAU + 0.02, -Math.PI / 2 + (v + gaps[i]) * TAU - 0.02); ctx.stroke(); ctx.globalAlpha = 1;
    dot(cx + R * Math.cos(-Math.PI / 2 + v * TAU), cy + R * Math.sin(-Math.PI / 2 + v * TAU), 9, 'w', a);
  });
  txt(label, cx, cy + 8, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a });
  txt(`${cls.length} lengths`, cx, cy + R + 50, { size: 24, fam: F.mono, w: 700, align: 'center', c: cls.length === 2 ? C.green : C.red, a });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  spiral(W / 2 + 40, 520, 330 * sp, t * 0.15, 0.55 * sp);
  txt(scramble('x² = x + 1', at(S, 0, 1.2), 7), W / 2, 330, { size: 110, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp * (1 - P(S, 1, 0, 1)), ab: 4, ls: 6 });
  txt('φ = 1.6180339887…', W / 2, 430, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) * (1 - P(S, 1, 0, 1)) });
  const p1 = at(S, 1, 0.8);
  if (p1 > 0) {
    const doms = ['COMBINATORICS', 'ARITHMETIC', 'GEOMETRY', 'SPECTRUM', 'ANALYSIS', 'PHASE'];
    const cx = W / 2, cy = 600, R = 250;
    ring(cx, cy, R, C.cyan, p1 * 0.7, 2);
    doms.forEach((d, i) => { const an = -Math.PI / 2 + i * TAU / 6; const q = P(S, 1, 0.5 + i * 0.5); dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 12, 'c', q); txt(d, cx + (R + 120) * Math.cos(an), cy + (R + 40) * Math.sin(an) + 8, { size: 22, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: q, ls: 2 }); });
    [[-45, 20], [55, -30]].forEach(([dx, dy], i) => { const q = P(S, 1, 5 + i * 0.6); dot(cx + dx, cy + dy, 16, 'm', q * (0.6 + 0.4 * Math.sin(t * 4 + i))); });
    txt('two points it cannot reach', cx, cy + 90, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 6) });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const rp = clamp(u / 1.2);
  spiral(W / 2, 400, 260, t * 0.2, 0.5 * rp, C.gold);
  spiral(W / 2, 400, 260, t * 0.2 + Math.PI, 0.35 * rp, C.cyan);
  txt(scramble('FIXED FRAME', rp, 111), W / 2, 700, { size: 120, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 14 });
  txt('黄 金 不 动 坐 标', W / 2, 772, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 011 · GOLDEN INVARIANT COORDINATE THEORY (GICT)', W / 2, 190, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  txt('a good coordinate system = the frame that stays fixed', W / 2, 835, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) * (1 - P(S, 1, 0)) });
  txt('not "the universe runs on φ"  ·  but: how to read', W / 2, 835, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2) });
};

/* ---- 02 AXES ---- */
SCENES.axes = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'classic']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    /* A: log-phi ruler */
    const qa = P(S, 0, 0.5) * p0, x0 = 180, x1 = 800;
    txt('A · SCALE', 490, 250, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: qa, ls: 2 });
    line(x0, 330, x1, 330, C.cyan, qa, 2);
    for (let k = 0; k <= 10; k++) { const x = x0 + k * 62; line(x, 318, x, 342, C.cyan, qa, 2); txt(`φ${k}`.replace(/\d+$/, m => m.split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('')), x, 372, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: qa }); }
    const v = Math.log(100) / Math.log(PHI); dot(x0 + v * 62, 330, 14, 'g', qa); txt('100', x0 + v * 62, 300, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: qa });
    txt('φ⁹ < 100 < φ¹⁰', 490, 410, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: qa });
    /* Z: Zeckendorf */
    const qz = P(S, 0, 4) * p0;
    txt('Z · DIGITS', 490, 520, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.mag, a: qz, ls: 2 });
    const fib = [89, 55, 34, 21, 13, 8, 5, 3, 2, 1], dig = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0];
    fib.forEach((f, i) => { const x = 220 + i * 60; box(x - 25, 560, 50, 50, dig[i] ? C.mag : C.dim, qz, 1.5, dig[i] ? 'rgba(40,0,30,0.7)' : null); txt(String(dig[i]), x, 595, { size: 26, fam: F.mono, w: 700, align: 'center', c: dig[i] ? C.mag : C.dim, a: qz }); txt(String(f), x, 640, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: qz }); });
    txt('100 = 89 + 8 + 3  (no two neighbours)', 490, 690, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: qz });
    /* G: phase */
    const qg = P(S, 0, 8) * p0, cx = 1420, cy = 480, R = 200;
    txt('G · PHASE', cx, 250, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: qg, ls: 2 });
    ring(cx, cy, R, C.gold, qg * 0.7, 2);
    const nn = Math.floor(clamp((u - lineAt(S, 0).s - 8) / 4) * 20);
    for (let n = 0; n <= nn; n++) { const an = -Math.PI / 2 + frac(n * PHI) * TAU; dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 10, n === nn ? 'g' : 'c', qg); }
    txt('{ n · φ }', cx, cy + 10, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: qg });
    txt('Γ = (A, Z, G)', cx, 780, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: qg, ls: 2 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const L = [['φ', PHI], ['√2', Math.SQRT2], ['e', Math.E], ['π', Math.PI]];
    L.forEach(([n, al], i) => gapCircle(330 + i * 420, 460, 150, al, 13, P(S, 1, 0.3 + i * 0.8), n));
    txt('13 points · step α around a circle', W / 2, 250, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('three-distance theorem: never more than 3', W / 2, 760, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 4) });
  }
};

/* ---- 03 EVEN ---- */
SCENES.even = S => {
  const u = S.u, t = S.t;
  badges(S, ['classic', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const cf = ['φ = 1 +        1', '         1 +      1', '              1 +    1', '                  1 + …'];
    cf.forEach((s, i) => txt(s, 560, 300 + i * 62, { size: 40, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 0.4 + i * 0.5) * p0 }));
    txt('|φ − p/q| > 1 / (√5 q²)', 1450, 380, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) * p0 });
    txt('hardest number to approximate by fractions (Hurwitz)', 1450, 430, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) * p0 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const N = Math.floor(10 + 110 * P(S, 1, 0.3, 5));
    [['φ', PHI, C.gold, 'g'], ['π  (≈ 22/7)', Math.PI, C.red, 'm']].forEach(([n, al, col, dn], i) => {
      const y = 620 + i * 110; line(260, y, 1660, y, col, p1 * 0.5, 1.5);
      txt(n, 230, y + 8, { size: 26, fam: F.orb, w: 900, align: 'right', c: col, a: p1 });
      for (let k = 0; k < N; k++) dot(260 + frac(k * al) * 1400, y, 7, dn, p1 * 0.9);
    });
    txt('φ: spread evenly', 1700, 628, { size: 20, fam: F.mono, c: C.gold, a: P(S, 1, 3) });
    txt('π: clumps into 7', 1700, 738, { size: 20, fam: F.mono, c: C.red, a: P(S, 1, 3) });
  }
};

/* ---- 04 FIVE ---- */
SCENES.five = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const pr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89];
    pr.forEach((p, i) => {
      const r = p % 5, x = 300 + (i % 8) * 190, y = 290 + Math.floor(i / 8) * 150, q = P(S, 0, 0.3 + i * 0.12) * p0;
      const col = p === 5 ? C.mag : (r === 2 || r === 3) ? C.gold : C.cyan;
      box(x - 70, y - 50, 140, 100, col, q, 2, 'rgba(0,0,0,0.6)');
      txt(String(p), x, y + 4, { size: 38, fam: F.orb, w: 900, align: 'center', c: col, a: q });
      txt(`mod 5 = ${r}`, x, y + 36, { size: 15, fam: F.mono, align: 'center', c: C.dim, a: q });
    });
    txt('■ 2, 3 : stays prime (inert)', 380, 760, { size: 22, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 4) * p0 });
    txt('■ 1, 4 : splits', 880, 760, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: P(S, 0, 4) * p0 });
    txt('■ 5 : ramifies', 1240, 760, { size: 22, fam: F.mono, w: 700, c: C.mag, a: P(S, 0, 4) * p0 });
    thm('golden_prime_iff_mod_five_eq_two_or_three · D5/S3/PrimeForms/GoldenPrimeClassification', W / 2, 810, P(S, 0, 6) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('discriminant 5 = 1² + 4', W / 2, 300, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    txt('smallest of any real quadratic field', W / 2, 350, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p1 });
    txt('「五是长子，不是父亲；', W / 2, 520, { size: 52, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4, 1), ab: 2 });
    txt('φ 是冠军，不是国王。」', W / 2, 600, { size: 52, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6, 1), ab: 2 });
    txt('GICT Thm 2.4 · Markov tree 1, 2, 5, 13, 29 …', W / 2, 680, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 6) });
  }
};

/* ---- 05 WORD ---- */
SCENES.word = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const ox = 260, oy = 760, g = 46;
    for (let i = 0; i < 16; i++) for (let j = 0; j < 12; j++) { const x = ox + i * g, y = oy - j * g; const d = j - i / PHI; const inStrip = d > -0.5 && d <= 0.5; dot(x, y, inStrip ? 8 : 4, inStrip ? 'g' : 'c', p0 * (inStrip ? P(S, 0, 2) : 0.4)); }
    const sl = P(S, 0, 1, 1.5);
    line(ox, oy, ox + 15 * g * sl, oy - 15 * g / PHI * sl, C.mag, p0, 3);
    txt('golden slope', ox + 15 * g * 0.8, oy - 15 * g / PHI * 0.8 - 30, { size: 20, fam: F.mono, c: C.mag, a: p0 * sl });
    let w = ''; const nw = Math.floor(34 * P(S, 0, 3, 5)); for (let n = 0; n < nw; n++) w += gword(n);
    txt(w, 1500, 330, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
    txt('golden word', 1500, 280, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p0, ls: 2 });
    txt('contains cubes  u u u', 1500, 470, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 7) * p0 });
    txt('never a 4th power  u u u u', 1500, 520, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 8.5) * p0 });
    thm('golden_critical_exponent_isLeast', 1500, 560, P(S, 0, 8.5) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const cx = 560, cy = 500, R = 220, al = 1 / PHI;
    ctx.globalAlpha = p1 * 0.9; ctx.strokeStyle = C.gold; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2 + (1 - al) * TAU, -Math.PI / 2 + TAU); ctx.stroke(); ctx.globalAlpha = 1;
    ring(cx, cy, R, C.cyan, p1 * 0.6, 2);
    txt('window [1−α, 1)', cx, cy + R + 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    const n = Math.floor((u - lineAt(S, 1).s) * 2.2) % 30, an = -Math.PI / 2 + frac(n * al) * TAU;
    line(cx, cy, cx + R * Math.cos(an), cy + R * Math.sin(an), C.white, p1 * 0.6, 1.5);
    dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 14, frac(n * al) >= 1 - al ? 'g' : 'c', p1);
    txt(`n = ${n}  →  s = ${gword(n)}`, cx, cy + 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('s_n = 1  ⟺  { n α } ∈ [1 − α, 1)', 1370, 350, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 1) });
    txt('certificate: 100,000 letters identical', 1370, 400, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 1) });
    txt('「维度是非局域信息的解压格式」', 1370, 560, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6, 1), ab: 2 });
    txt('GICT Thm 7.7 · decompression theorem', 1370, 610, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 6) });
  }
};

/* ---- 06 FRAME ---- */
SCENES.frame = S => {
  const u = S.u, t = S.t;
  badges(S, ['classic', 'theory']);
  const cx = 620, cy = 500, sc = 110;
  const p = at(S, 0, 0.6);
  line(cx - 400, cy, cx + 400, cy, C.dim, p * 0.4, 1); line(cx, cy - 330, cx, cy + 330, C.dim, p * 0.4, 1);
  const e1 = [PHI, 1], e2 = [-1 / PHI, 1];
  [[e1, C.gold, 'λ = φ  · stretches'], [e2, C.cyan, 'λ = −1/φ · flips sign']].forEach(([v, col, lab], i) => {
    const n = Math.hypot(v[0], v[1]), dx = v[0] / n, dy = v[1] / n, q = P(S, 0, 2 + i * 1.5);
    line(cx - dx * 420, cy + dy * 420, cx + dx * 420, cy - dy * 420, col, q, 3.5);
    txt(lab, cx + dx * 300 + 20, cy - dy * 300 - 14, { size: 20, fam: F.mono, w: 700, c: col, a: q });
  });
  /* point cloud under M, cycling */
  const ph = frac((u - lineAt(S, 0).s) / 3), k = ease(clamp(ph * 1.6));
  for (let i = 0; i < 40; i++) {
    const an = i / 40 * TAU, x = Math.cos(an) * 1.2, y = Math.sin(an) * 1.2;
    const mx = x + y, my = x;
    const X = lerp(x, mx, k), Y = lerp(y, my, k);
    dot(cx + X * sc, cy - Y * sc, 6, 'm', p * 0.8 * (1 - 0.5 * clamp((ph - 0.7) / 0.3)));
  }
  txt('M = [[1, 1], [1, 0]]', 1420, 300, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 0.5) });
  txt('the rule that grows the golden word', 1420, 345, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 0.5) });
  txt('F_n φ − F_{n+1} = −(−1/φ)ⁿ', 1420, 430, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5) });
  const p1 = at(S, 1, 0.6);
  txt('eigen-directions do not move', 1420, 540, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2) });
  txt('「好坐标系是变换下的不动标架」', 1420, 650, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6, 1), ab: 2 });
  txt('GICT Thm 7.3 · a good coordinate system is a fixed frame', 1420, 700, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 6) * p1 });
};

/* ---- 07 FATES ---- */
SCENES.fates = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const cards = [['EMPTY', 'x = x', 'nothing happens', C.dim], ['DEAD', 'x = x + 1', 'no solution', C.red], ['COLLAPSE', 'x = 1 / x', 'back in two steps · ±1', C.vio], ['ALIVE', 'x = 1 + 1/x', 'never reaches the bottom', C.gold]];
  txt('x = (a x + b) / (c x + d),   a, b, c, d ∈ {0, 1}', W / 2, 230, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6) });
  cards.forEach(([n, eq, d, col], i) => {
    const x = 170 + i * 405, y = 310, q = P(S, 1, 0.2 + i * 1.8);
    box(x, y, 370, 250, col, q, i === 3 ? 3 : 1.5, 'rgba(0,0,0,0.75)');
    txt(n, x + 185, y + 70, { size: 36, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 3 });
    txt(eq, x + 185, y + 135, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt(d, x + 185, y + 195, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q });
  });
  const q = P(S, 1, 6);
  if (q > 0) {
    let v = 1; const vals = []; for (let k = 0; k < 9; k++) { vals.push(v); v = 1 + 1 / v; }
    vals.forEach((z, k) => txt(z.toFixed(4), 360 + k * 150, 640, { size: 22, fam: F.mono, w: 700, align: 'center', c: k === 8 ? C.gold : C.cyan, a: q * P(S, 1, 6 + k * 0.25) }));
    txt('→ φ', 1720, 640, { size: 30, fam: F.orb, w: 900, c: C.gold, a: P(S, 1, 8.5) });
    txt('「非被挑中，乃被剩下」', W / 2, 760, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 9, 1), ab: 2 });
    txt('GICT Thm 7.11 · exhaustive over 16 rules · discriminant of the φ-family = 5', W / 2, 810, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 9) });
  }
};

/* ---- 08 CONSTANTS ---- */
SCENES.constants = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  const Cphi = (57 - 25 * Math.sqrt(5)) / 24;
  if (p0 > 0) {
    txt('C_φ = (57 − 25√5) / 24', W / 2, 290, { size: 50, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0, ab: 2 });
    txt('= ' + Cphi.toFixed(10) + '…', W / 2, 350, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) * p0 });
    for (let i = 0; i < 5; i++) {
      const y = 450 + i * 70, conv = P(S, 0, 3 + i * 0.8, 2), off = (rnd(i, 7) - 0.5) * 0.6 * (1 - conv);
      txt(`instrument ${i + 1}`, 520, y + 8, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: p0 });
      line(560, y, 1360, y, C.dim, p0 * 0.4, 1);
      line(960, y - 20, 960, y + 20, C.gold, p0 * 0.7, 2);
      dot(960 + off * 800, y, 11, conv > 0.95 ? 'g' : 'c', p0 * P(S, 0, 3 + i * 0.8));
    }
    txt('"the name came from the ledger; the digits were read by five instruments"', W / 2, 830, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 8) * p0 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const Wv = -Math.PI / (6 * PHI * PHI);
    txt('W(φ) = Σ cot(π k φ) / k', W / 2, 280, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    txt('= −π / (6φ²) = ' + Wv.toFixed(10), W / 2, 350, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1) });
    txt('−1/5  = −0.2000000000', W / 2, 440, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3) });
    txt('gap ' + (Wv + 0.2).toExponential(2), W / 2, 500, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4) });
    stamp('NEAR MISS · LOGGED AS A TRAP', W / 2, 640, P(S, 1, 5.5, 0.6), C.vio, 36, -0.03);
    txt('closed form given instead · reciprocity V(x)+V(1/x) = (π/6)(x+1/x) − π/2', W / 2, 760, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 7) });
  }
};

/* ---- 09 COSTUME ---- */
SCENES.costume = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'wall');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const rows = [['α⁻¹ (CODATA 2018)', '137 + ⅖φ⁻⁵ − ⅖φ⁻¹⁸ + ⅝φ⁻³⁰ − ⅘φ⁻⁴²', '1.3 × 10⁻¹¹', C.gold], ['a random number', 'φ-costume', '2.7 × 10⁻¹¹', C.cyan], ['α⁻¹ (CODATA 2022)', '√2-costume', '2.1 × 10⁻¹¹', C.mag]];
    rows.forEach(([a, b, c, col], i) => { const y = 290 + i * 130, q = P(S, 0, 1 + i * 2.2) * p0; txt(a, 250, y, { size: 26, fam: F.orb, w: 900, c: col, a: q }); txt(b, 250, y + 44, { size: 26, fam: F.mono, w: 700, c: C.white, a: q }); txt('residual ' + c, 1660, y + 44, { size: 24, fam: F.mono, w: 700, align: 'right', c: col, a: q }); });
    txt('「字母表能给任何数穿衣，衣非证据」', W / 2, 760, { size: 42, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 0, 8, 1) * p0, ab: 2 });
    txt('GICT Appendix D.1 · the numerology capacity lemma', W / 2, 810, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 8) * p0 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const W4 = ['does NOT prove the Riemann Hypothesis', 'does NOT claim the universe runs on φ', 'does NOT endorse golden-ratio mysticism', 'φ is SELECTED (fixed / critical points), not WRITTEN IN'];
    W4.forEach((s, i) => { const q = P(S, 1, 0.5 + i * 1.4); box(460, 250 + i * 110, 1000, 80, C.vio, q, 1.5, 'rgba(20,10,40,0.75)'); txt(s, W / 2, 300 + i * 110, { size: 26, fam: F.mono, w: 700, align: 'center', c: i === 3 ? C.gold : C.white, a: q }); });
    txt('GICT Appendix C · 防命理总墙', W / 2, 740, { size: 22, fam: F.mono, align: 'center', c: C.vio, a: P(S, 1, 6) });
  }
};

/* ---- 10 ASSASSIN ---- */
SCENES.assassin = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const gx = 200, gy = 780, gw = 1100, mx = 600;
    line(gx, gy, gx + gw, gy, C.dim, p0, 1.5); txt('m', gx + gw + 20, gy + 8, { size: 20, fam: F.mono, c: C.dim, a: p0 });
    const bx = gx + gw * 300 / mx;
    fillBox(gx, 260, bx - gx, gy - 260, C.cyan, 0.06 * p0); box(gx, 260, bx - gx, gy - 260, C.cyan, p0 * 0.8, 1.5);
    txt('old search box  m ≤ 300', (gx + bx) / 2, 245, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
    const nn = Math.floor(400 * P(S, 0, 0.5, 4));
    for (let i = 0; i < nn; i++) dot(gx + rnd(i, 1) * (bx - gx - 10) + 5, gy - 20 - rnd(i, 2) * 480, 4, 'n', p0 * 0.8);
    txt('~10,000 classes · 0 counterexamples', (gx + bx) / 2, gy + 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 3) * p0 });
    const hit = P(S, 0, 6, 0.4);
    const x468 = gx + gw * 468 / mx;
    dot(x468, 430, 20, 'm', hit * p0 * (0.7 + 0.3 * Math.sin(t * 6))); line(x468, gy, x468, 430, C.red, hit * p0, 1.5);
    txt('m = 468', x468, gy + 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: hit * p0 });
    txt('γ = [[1981, −768], [276, −107]]', 1560, 330, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 7) * p0 });
    txt('word (5,1,1,1,2,1,1,1,1,6)', 1560, 370, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 7) * p0 });
    stamp('CONJECTURE REFUTED', 1560, 500, P(S, 0, 8, 0.6) * p0, C.red, 34, -0.04);
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('「近万类零反例 = 采样偏倚」', W / 2, 280, { size: 44, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p1, ab: 2 });
    txt('SURVIVED: lemmas · reductions · sub-family theorems', W / 2, 400, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 3) });
    txt('DIED: the universal quantifier ∀', W / 2, 450, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4.5) });
    box(560, 560, 800, 170, C.vio, P(S, 1, 7), 2, 'rgba(20,10,40,0.8)');
    txt('golden frequency fix for transformers', W / 2, 610, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 7) });
    txt('gain × 1.00', W / 2, 680, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.vio, a: P(S, 1, 9), ab: 2 });
    txt('"GICT does not explain intelligence" · Obs. 7.16', W / 2, 780, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 10) });
  }
};

/* ---- 11 KERNEL ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const cx = 620, cy = 500, R = 260;
    ring(cx, cy, R, C.cyan, p0 * 0.6, 2);
    ctx.globalAlpha = p0 * 0.8; ctx.strokeStyle = C.red; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2 - TAU / 15, -Math.PI / 2 + TAU / 15); ctx.stroke(); ctx.globalAlpha = 1;
    txt('start ± 1/15', cx, cy - R - 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: p0 });
    const tt = lerp(0, 1 / 15, ease(P(S, 0, 2, 5)));
    for (let s = 1; s <= 14; s++) { const an = -Math.PI / 2 + frac(s * tt) * TAU; dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 12, ['c', 'm', 'g'][s % 3], p0); }
    txt(`t = ${(tt).toFixed(4)}`, cx, cy + 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
    txt('any 14 speeds from {1, …, 20}', 1400, 330, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) * p0 });
    txt('all C(20,14) = 38,760 choices', 1400, 380, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 1) * p0 });
    txt('∃ t : every runner ≥ 1/15 from start', 1400, 470, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 6) * p0 });
    txt('(shown: speeds 1–14, t = 1/15)', 1400, 510, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 6) * p0 });
    thm('lonely_runner_fourteen_of_twenty', 1400, 560, P(S, 0, 6) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('q ≤ 1024 : a/q with continued-fraction digits ≤ 5', 520, 280, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    txt('17/54 = [0; 3, 5, 1, 2]', 520, 340, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1) });
    thm('zaremba_five_upto_certified', 520, 380, P(S, 1, 1), 'center');
    const Wt = [[0, 5], [0, 9], [1, 4], [2, 1], [2, 13], [3, 12], [3, 16], [4, 5], [5, 2], [5, 16], [6, 1], [6, 13], [7, 14], [9, 2], [10, 3], [10, 15], [11, 0], [11, 14], [12, 11], [13, 0], [13, 4], [14, 3], [14, 15], [15, 12], [16, 7], [16, 11]];
    const bx = 1110, by = 230, c = 30, q = P(S, 1, 5);
    for (let i = 0; i < 17; i++) for (let j = 0; j < 17; j++) if ((i + j) % 2 === 1) fillBox(bx + i * c + 4, by + (16 - j) * c + 4, c - 8, c - 8, C.dim, 0.35 * q);
    const nshow = Math.floor(26 * P(S, 1, 5.5, 4));
    Wt.slice(0, nshow).forEach(([i, j]) => dot(bx + i * c + c / 2, by + (16 - j) * c + c / 2, 10, 'g', q));
    txt(`${nshow} / 26 points · no three in a line`, bx + 8.5 * c, by + 17 * c + 36, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
    thm('ThinCheckerboardNoThreeInLineSeventeen · upper_bound ≤ 26', bx + 8.5 * c, by + 17 * c + 70, q, 'center');
    stamp('ALL FROZEN', 520, 620, P(S, 1, 10, 0.6), C.green, 40, -0.04);
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const bx = 700, top = 190, bot = 720;
    const q = P(S, 0, 0.3) * fade;
    line(bx, bot, bx, top, C.cyan, q, 3); line(bx + 160, bot, bx + 160, top, C.cyan, q, 3);
    for (let k = 0; k < 12; k++) { const y = bot - k * 44; line(bx, y, bx + 160, y, C.cyan, q * (1 - k / 16), 2); }
    const climb = P(S, 0, 1, 7);
    dot(bx + 80, bot - climb * 480, 16, 'g', q);
    txt('μ', bx + 80, bot + 50, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: q });
    txt('ν', bx + 80, top - 30, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.mag, a: q * (0.5 + 0.5 * Math.sin(t * 2)) });
    fillBox(bx - 20, top - 10, 200, 60, C.mag, 0.12 * q);
    txt('the gap = incompleteness', bx + 380, top + 30, { size: 26, fam: F.mono, w: 700, c: C.mag, a: P(S, 0, 6) * fade });
    txt('「数学是从 μ 向不可达之 ν 攀登的无限阶梯」', 1300, 470, { size: 34, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 0, 2, 1) * fade, ab: 2 });
    txt('GICT Thm 7.2', 1300, 515, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 2) * fade });
    const q1 = P(S, 1, 0.3, 1) * fade;
    if (q1 > 0) {
      txt('「这不是失败的记录，是测绘的进度。」', 1300, 690, { size: 38, fam: F.zh, w: 900, align: 'center', c: C.gold, a: q1, ab: 2 });
      [[1180, 620], [1420, 610]].forEach(([x, y], i) => dot(x, y, 14, 'm', q1 * (0.6 + 0.4 * Math.sin(t * 4 + i))));
    }
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    spiral(W / 2, 360, 200, t * 0.2, ep * out * 0.8);
    txt('FIXED FRAME', W / 2, 650, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 14 });
    txt('黄 金 不 动 坐 标 · TRURETURING FILM 011', W / 2, 720, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A good coordinate system is a fixed frame under transformation.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'x² = x + 1', axes: 'THREE AXES', even: 'HARDEST NUMBER', five: 'SURNAME 5', word: 'DECOMPRESSION', frame: 'FIXED FRAME', fates: 'FOUR FATES', constants: 'CONSTANTS', costume: 'NUMEROLOGY WALL', assassin: 'REFUTED', kernel: 'KERNEL', finale: 'SURVEY' });

function poster11() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  spiral(W / 2, 470, 330, 0.6, 0.9, C.gold);
  spiral(W / 2, 470, 330, 0.6 + Math.PI, 0.6, C.cyan);
  txt('x² = x + 1', W / 2, 160, { size: 80, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4, ls: 4 });
  txt('FIXED FRAME', W / 2, 850, { size: 130, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 14 });
  bloom(0.65);
  txt('黄 金 不 动 坐 标  ·  好坐标系是变换下的不动标架', W / 2, 930, { size: 40, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 011', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster11;
