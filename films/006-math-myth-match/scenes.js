/* Film 006 — MATH · MYTH · MATCH. The whole Math Myth Match volume as a sequence of small models. */

function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    theory: ['MMM · THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    bridge: ['LEAN-CHECKED SHAPE · RELIGIOUS READING NOT CHECKED', C.green, 'rgba(0,30,15,0.7)'],
    bound: ['BOUNDARY · STATED BY THE TEXT ITSELF', C.vio, 'rgba(20,10,40,0.75)']
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
const P = (S, k, off = 0, dur = 0.5) => clamp((S.u - lineAt(S, k).s - off) / dur);
/* 2x2 joint-state grid: cells[(a,b)] lit */
function grid22(x, y, s, lit, a, col = C.cyan, labels = true) {
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const on = lit.some(([p, q]) => p === i && q === j);
    const cx = x + i * s, cy = y + (1 - j) * s;
    box(cx, cy, s - 8, s - 8, on ? col : C.dim, a * (on ? 1 : 0.5), on ? 2.5 : 1.2, on ? 'rgba(0,40,50,0.55)' : 'rgba(4,8,20,0.5)');
    if (on) dot(cx + (s - 8) / 2, cy + (s - 8) / 2, s * 0.18, col === C.cyan ? 'c' : col === C.mag ? 'm' : 'g', a);
    if (labels) txt(`(${i},${j})`, cx + (s - 8) / 2, cy + s - 16, { size: 14, fam: F.mono, align: 'center', c: C.dim, a });
  }
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  drawHyper(CUBE6, [[0, 5, t * 0.21], [1, 4, t * 0.16], [2, 5, t * 0.12], [3, 4, t * 0.18]], { scale: 1.7, rx: 0.3, ry: t * 0.08, a: 0.5 * sp, lw: 1.2, camZ: 7.5, cy: 560 });
  txt(scramble('TRUTH HAS SHAPE', at(S, 0, 1.0), 3), W / 2, 210, { size: 58, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp * (1 - at(S, 1, 0.5)), ab: 3, ls: 6 });
  txt('AND CANNOT BE EXHAUSTED', W / 2, 280, { size: 36, fam: F.orb, w: 700, align: 'center', c: C.gold, a: at(S, 0, 0.6, 1.6) * (1 - at(S, 1, 0.5)), ls: 6 });
  txt('真 理 有 形 而 无 法 穷 尽', W / 2, 340, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: at(S, 0, 0.6, 2.4) * (1 - at(S, 1, 0.5)) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const cx = W / 2, cy = 520;
    const names = ['RELIGIONS', 'PHILOSOPHIES', 'SCIENCES', 'THIS THEORY'];
    names.forEach((n, i) => {
      const an = Math.PI + (i + 0.5) * Math.PI / 4 - Math.PI / 2 + 0.0; const x = cx + Math.cos(-Math.PI / 2 + (i - 1.5) * 0.7) * 520, y = cy - 40 + Math.abs(i - 1.5) * 90 + 200;
      const q = clamp((u - lineAt(S, 1).s - 0.5 - i * 0.6) / 0.5);
      arrow(x, y - 30, cx + (x - cx) * 0.12, cy + 30, [C.cyan, C.mag, C.green, C.gold][i], q * 0.9, 2);
      txt(n, x, y + 10, { size: 22, fam: F.orb, w: 700, align: 'center', c: [C.cyan, C.mag, C.green, C.gold][i], a: q, ls: 2 });
    });
    dot(cx, cy, 44 + 6 * Math.sin(t * 2), 'w', p1);
    txt('ONE SOURCE?', cx, cy - 80, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: p1, ls: 3 });
    stamp('ASSUMPTION · NOT PROVED', cx, 250, clamp((u - lineAt(S, 1).s - 5.5) / 0.6), C.orange, 40, -0.04);
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const W3 = [['MATH', C.cyan, 'objects · relations · transformations'], ['MYTH', C.mag, 'tradition that carries meaning — not "false"'], ['MATCH', C.gold, 'what it keeps · where it distorts']];
  const rp = clamp(u / 1.2);
  W3.forEach(([w, col, def], i) => {
    const x = 380 + i * 580, y = 430;
    txt(scramble(w, clamp(rp * 1.3 - i * 0.2), 61 + i), x, y, { size: 84, fam: F.orb, w: 900, align: 'center', c: col, ab: 4, ls: 6 });
    const dq = i < 2 ? P(S, 0, 1.5 + i * 4) : P(S, 1, 0.5);
    txt(def, x, y + 70, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: dq });
    if (i < 2) txt('·', x + 290, y - 20, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.dim, a: rp });
  });
  txt('TRURETURING · FILM 006 · THE MATH MYTH MATCH VOLUME', W / 2, 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 0.8) / 0.8), ls: 5 });
  const r = P(S, 1, 5, 0.6);
  if (r > 0) {
    box(W / 2 - 520, 610, 1040, 110, C.vio, r, 2, 'rgba(15,8,35,0.8)');
    txt('mathematics enters the comparison as one more member', W / 2, 655, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: r });
    txt('IT IS NOT THE REFEREE', W / 2, 700, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.gold, a: r, ls: 4 });
  }
  grid(t, 0.35, H * 0.8, C.vio, 0.25);
};

/* ---- 02 MARGINS ---- */
SCENES.margins = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const worlds = [['FREE', [[0, 0], [0, 1], [1, 0], [1, 1]], C.cyan], ['SAME', [[0, 0], [1, 1]], C.green], ['OPPOSITE', [[0, 1], [1, 0]], C.mag]];
  const p2 = at(S, 2, 0.5);
  const fade = 1 - p2;
  if (fade > 0) worlds.forEach(([nm, lit, col], i) => {
    const q = P(S, 0, 2.5 + i * 1.2) * fade; const x = 300 + i * 500, y = 260;
    grid22(x, y, 150, lit, q, col === C.green ? C.gold : col);
    txt(nm, x + 146, y + 340, { size: 30, fam: F.orb, w: 900, align: 'center', c: col === C.green ? C.gold : col, a: q, ls: 3 });
    const m = P(S, 1, 1.5 + i * 0.4) * fade;
    txt('tradition 1 sees {0,1}', x + 146, y + 390, { size: 20, fam: F.mono, align: 'center', c: C.white, a: m });
    txt('tradition 2 sees {0,1}', x + 146, y + 420, { size: 20, fam: F.mono, align: 'center', c: C.white, a: m });
  });
  txt('SAME MARGINS  ·  DIFFERENT RELATIONS', W / 2, 220, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 4) * fade, ls: 3 });
  thm('MMM Prop. 3.4', W / 2, 800, P(S, 1, 4) * fade, 'center');
  if (p2 > 0) {
    const cx = W / 2, cy = 480, R = 230;
    const nodes = [[cx, cy - R], [cx + R * 0.87, cy + R * 0.5], [cx - R * 0.87, cy + R * 0.5]];
    const eq = ['x₂ = 1 − x₁', 'x₃ = 1 − x₂', 'x₁ = 1 − x₃'];
    const all = P(S, 2, 7, 0.6);
    for (let k = 0; k < 3; k++) {
      const A = nodes[k], B = nodes[(k + 1) % 3]; const q = P(S, 2, 1.5 + k * 1.3);
      const col = all > 0 ? C.red : C.green;
      line(A[0], A[1], B[0], B[1], col, q * p2, 4);
      const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2; const ox = (mx - cx) * 0.45, oy = (my - cy) * 0.45;
      txt(eq[k], mx + ox, my + oy + 8, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: q * p2 });
    }
    nodes.forEach(([x, y], i) => { dot(x, y, 34, ['c', 'm', 'g'][i], p2); txt('x' + '₁₂₃'[i], x, y + 9, { size: 24, fam: F.mono, w: 700, align: 'center', c: '#02040c', a: p2 }); });
    txt('each ✓   any two ✓', 1560, 420, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 2, 4.5) });
    txt('all three  ✗  (no solution)', 1560, 480, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: all });
    thm('MMM Prop. 7.2', 1560, 530, all, 'center');
  }
};

/* ---- 03 PRACTICE ---- */
SCENES.practice = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6);
  txt('A COMMON SOURCE IS NOT A NAME', W / 2, 220, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0, ls: 3 });
  txt('every stated reading and practice must be realizable together', W / 2, 272, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.gold, a: P(S, 0, 4) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const x = 560, y = 360, s = 170;
    grid22(x, y, s, [], p1, C.cyan);
    const steps = Math.max(0, Math.min(3, (u - lineAt(S, 1).s - 5) / 1.8));
    const k = Math.floor(steps), fr = ease(steps - k);
    const pts = [[0, 0], [1, 1]];
    pts.forEach(([a0, b0], i) => {
      const flip = k % 2 === 0 ? 0 : 1; const aFrom = a0 ^ flip, aTo = a0 ^ (1 - flip);
      const aa = steps <= 0 ? a0 : lerp(aFrom, aTo, k >= 3 ? 1 : fr);
      const inC = (Math.round(aa) === b0);
      const px = x + aa * s + (s - 8) / 2, py = y + (1 - b0) * s + (s - 8) / 2;
      const alive = steps < 1 ? 1 : clamp(1 - (steps - 1) / 0.8);
      dot(px, py, 30, inC ? 'g' : 'm', p1 * (steps < 1 ? 1 : Math.max(alive, 0)));
    });
    // diagonal C
    ctx.globalAlpha = p1 * 0.7; ctx.strokeStyle = C.gold; ctx.setLineDash([10, 8]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x + s * 0.3, y + s * 1.7); ctx.lineTo(x + s * 1.7, y + s * 0.3); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    txt('C = {(0,0),(1,1)}', x + s, y + 2 * s + 50, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    txt('on paper: always agree', 1380, 400, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 1) });
    txt('practice a: flips side 1 only', 1380, 470, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 3.5) });
    txt('C∞  =  ∅', 1380, 580, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 9), ab: 2 });
    txt('static agreement, broken by practice', 1380, 640, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 10) });
    thm('MMM Thm 5.1 · Prop. 5.2', 1380, 690, P(S, 1, 10), 'center');
  }
};

/* ---- 04 UNENDING ---- */
SCENES.unending = S => {
  const u = S.u, t = S.t, L = S.L;
  badge(clamp(u / 0.8), 'theory');
  const p2 = at(S, 2, 0.6);
  const fade = 1 - p2;
  txt('道 可 道 ， 非 常 道', W / 2, 220, { size: 48, fam: F.zh, w: 900, align: 'center', c: C.gold, a: at(S, 0, 0.6) * fade, ab: 2 });
  if (fade > 0) {
    const n = Math.min(26, Math.floor(Math.max(0, u - L[0].s - 4) * 2.2));
    const x0 = 140, y = 420, dx = 64;
    for (let k = 0; k < 27; k++) {
      const x = x0 + k * dx; const inB = k < n;
      txt('0', x, y, { size: 40, fam: F.mono, w: 700, align: 'center', c: inB ? C.green : C.white, a: 0.9 * fade * clamp(1 - (k - 22) / 5) });
    }
    if (n > 0) { ctx.globalAlpha = fade; ctx.strokeStyle = C.green; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 - 24, y + 24); ctx.lineTo(x0 - 24, y + 40); ctx.lineTo(x0 + (n - 1) * dx + 24, y + 40); ctx.lineTo(x0 + (n - 1) * dx + 24, y + 24); ctx.stroke(); ctx.globalAlpha = 1; }
    txt(`x₀ … x${n > 0 ? n - 1 : 0} = 0   ✓ true`, x0, y + 90, { size: 26, fam: F.mono, w: 700, c: C.green, a: fade * clamp(n) });
    const p1 = at(S, 1, 0.6);
    if (p1 > 0) {
      const m = Math.min(26, n);
      for (let k = 0; k < 27; k++) { const x = x0 + k * dx; txt(k === m ? '1' : '0', x, y + 190, { size: 40, fam: F.mono, w: 700, align: 'center', c: k === m ? C.mag : C.dim, a: p1 * fade * clamp(1 - (k - 22) / 5) }); }
      txt('another sequence satisfies every finite list', x0, y + 260, { size: 26, fam: F.raj, w: 600, c: C.mag, a: p1 * fade });
      const q = P(S, 1, 9, 0.6);
      box(1180, 610, 560, 90, C.gold, q * fade, 2.5, 'rgba(30,20,0,0.75)');
      txt('∀n,  xₙ = 0   pins it down', 1460, 668, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q * fade });
      txt('true · accumulating · not exhausting', W / 2, 300, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 1, 4) * fade, ls: 2 });
    }
  }
  if (p2 > 0) {
    // prefix tree, 5 levels; the all-ones thread glows and ends in '?'
    const cx = W / 2, y0 = 230, lv = 5;
    for (let d = 0; d < lv; d++) {
      const nn = 1 << d;
      for (let k = 0; k < nn; k++) {
        const x = cx + (k - (nn - 1) / 2) * (1400 / (1 << lv)) * (1 << (lv - 1 - d)) * 0.9, y = y0 + d * 110;
        const ones = k === nn - 1;
        if (d > 0) { const pk = k >> 1, pn = nn >> 1; const px = cx + (pk - (pn - 1) / 2) * (1400 / (1 << lv)) * (1 << (lv - d)) * 0.9; line(px, y - 110, x, y, ones ? C.gold : C.cyan, p2 * (ones ? 1 : 0.35), ones ? 3 : 1); }
        dot(x, y, ones ? 16 : 10, ones ? 'g' : 'c', p2 * (ones ? 1 : 0.7));
      }
    }
    txt('1 1 1 1 …  consistent at every depth', 1500, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 2, 2) });
    txt('realized by NO eventually-zero sequence', 1500, 740, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 2, 4) });
    txt('every layer agrees · the whole is missing', 520, 740, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 2, 5) });
    thm('MMM §19.3 · §88.3', 520, 780, P(S, 2, 5), 'center');
  }
};

/* ---- 05 SAME ---- */
SCENES.same = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    txt('"ALL SAYING THE SAME THING"?', W / 2, 220, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0, ls: 2 });
    const lv = ['SHARED QUESTION', 'SHARED PRACTICE', 'LOCAL IDENTITY', 'STRUCTURAL MATCH', 'ONE ULTIMATE SOURCE'];
    lv.forEach((s, i) => {
      const q = P(S, 0, 4 + i * 1.3) * p0; const y = 320 + i * 95; const w = 560 + i * 110;
      box(W / 2 - w / 2, y - 38, w, 68, [C.cyan, C.green, C.gold, C.mag, C.vio][i], q, 2, 'rgba(4,10,24,0.7)');
      txt(`${i + 1}  ·  ${s}`, W / 2, y + 8, { size: 26, fam: F.orb, w: 700, align: 'center', c: [C.cyan, C.green, C.gold, C.mag, C.vio][i], a: q, ls: 3 });
    });
    txt('five different claims', 1650, 790, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 11) * p0 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const x0 = 260, y = 520, sc = 170;
    line(x0 - 40, y, x0 + 8 * sc + 40, y, C.dim, p1, 2);
    for (let k = 0; k <= 8; k++) { line(x0 + k * sc, y - 10, x0 + k * sc, y + 10, C.dim, p1, 2); txt(String(k), x0 + k * sc, y + 45, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p1 }); }
    const og = clamp(1 - P(S, 1, 1.5, 1.2));
    txt('ORIGIN?', x0, y - 90, { size: 22, fam: F.orb, w: 900, align: 'center', c: C.red, a: p1 * (0.3 + 0.7 * og) });
    ring(x0, y, 26, C.red, p1 * og, 2);
    const arc = (a, b, col, q, h) => { if (q <= 0) return; ctx.globalAlpha = q; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 + a * sc, y); ctx.quadraticCurveTo(x0 + (a + b) / 2 * sc, y - h, x0 + b * sc, y); ctx.stroke(); ctx.globalAlpha = 1; dot(x0 + a * sc, y, 16, col === C.cyan ? 'c' : col === C.green ? 'g' : 'm', q); dot(x0 + b * sc, y, 16, col === C.cyan ? 'c' : col === C.green ? 'g' : 'm', q); };
    arc(0, 1, C.cyan, P(S, 1, 3), 140); arc(5, 6, C.cyan, P(S, 1, 4), 140); arc(0, 2, C.mag, P(S, 1, 6), 230);
    txt('gap 1', x0 + 0.5 * sc, y - 150, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3) });
    txt('gap 1  =  same', x0 + 5.5 * sc, y - 150, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 4) });
    txt('gap 2  ≠', x0 + 1 * sc, y - 250, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 6) });
    txt('no absolute origin · relations stay exact', W / 2, 250, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.white, a: p1, ls: 1 });
    txt('色 不 异 空  ≠  a void', W / 2, 700, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold, a: P(S, 1, 9) });
    thm('MMM §74 · §75 · §76', W / 2, 750, P(S, 1, 9), 'center');
  }
};

/* ---- 06 BUDDHA ---- */
SCENES.buddha = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'bridge']);
  txt('众 生 皆 佛', W / 2, 220, { size: 56, fam: F.zh, w: 900, align: 'center', c: C.gold, a: at(S, 0, 0.6), ab: 3 });
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  const cards = [['∀x  B(x)', 'all share a nature', C.cyan], ['∀x  ∃ path → goal', 'all can arrive', C.green], ['∀x  A(x)', 'all have arrived', C.mag]];
  cards.forEach(([f, s, col], i) => {
    const q = P(S, 0, 4 + i * 1.5) * p0; const x = 360 + i * 600;
    box(x - 250, 330, 500, 170, col, q, 2.5, 'rgba(4,10,24,0.7)');
    txt(f, x, 405, { size: 36, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    txt(s, x, 460, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.white, a: q });
    if (i < 2) txt('⇏', x + 300, 425, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 0, 9) * p0 });
  });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    // two-state model
    const ax = 380, ay = 520;
    dot(ax, ay, 40, 'c', p1); dot(ax + 280, ay, 40, 'g', p1);
    txt('0', ax, ay + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: '#02040c', a: p1 }); txt('1', ax + 280, ay + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: '#02040c', a: p1 });
    arrow(ax + 50, ay, ax + 225, ay, C.green, p1, 3);
    ring(ax + 280, ay - 60, 26, C.green, p1, 2);
    txt('goal = {1}', ax + 140, ay + 100, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: p1 });
    txt('0 can arrive · 0 has not arrived', ax + 140, ay + 140, { size: 22, fam: F.mono, align: 'center', c: C.white, a: p1 });
    // chain n -> 0
    const cx0 = 900, cy = 520, n = 8;
    const step = Math.floor(Math.max(0, u - lineAt(S, 1).s - 5) / 0.8) % (n + 3);
    for (let k = 0; k <= n; k++) {
      const x = cx0 + (n - k) * 105; const cur = n - step === k;
      dot(x, cy, cur ? 26 : 16, k === 0 ? 'g' : cur ? 'm' : 'c', P(S, 1, 3));
      txt(String(k), x, cy + 55, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 3) });
      if (k > 0) arrow(x + 20, cy, x + 85, cy, C.cyan, P(S, 1, 3) * 0.6, 2);
    }
    txt('state n needs exactly n steps', cx0 + n * 52, cy - 80, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 4) });
    txt('NO SINGLE BOUND FOR ALL', cx0 + n * 52, cy + 130, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7), ls: 2 });
    thm('finite_horizon_reachability', cx0 + n * 52, cy + 175, P(S, 1, 7), 'center');
  }
};

/* ---- 07 NET (mod-3) ---- */
SCENES.net = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p1 = at(S, 1, 0.5);
  const fade = 1 - P(S, 1, 6, 0.6);
  txt('一 即 一 切 ， 一 切 即 一', W / 2, 220, { size: 44, fam: F.zh, w: 900, align: 'center', c: C.gold, a: at(S, 0, 0.6) * fade, ab: 2 });
  if (fade > 0) {
    const cx = W / 2 - 260, cy = 520, R = 200;
    const tt = Math.floor(Math.max(0, u - lineAt(S, 0).s - 3) / 1.6) % 3;
    const pos = [0, 1, 2].map(i => [cx + Math.cos(-Math.PI / 2 + i * TAU / 3) * R, cy + Math.sin(-Math.PI / 2 + i * TAU / 3) * R]);
    const q = P(S, 0, 2);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (i !== j) line(pos[i][0], pos[i][1], pos[j][0], pos[j][1], C.vio, q * fade * 0.5, 1.5);
    pos.forEach(([x, y], i) => {
      dot(x, y, 58, ['c', 'm', 'g'][i], q * fade);
      txt(String((tt + i) % 3), x, y + 16, { size: 46, fam: F.orb, w: 900, align: 'center', c: '#02040c', a: q * fade });
      txt(`position ${i + 1}`, x, y + (i === 0 ? -80 : 100), { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q * fade });
    });
    txt('C = { (t, t+1, t+2) mod 3 }', 1400, 380, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) * fade });
    txt('any ONE position → the whole triple', 1400, 450, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.cyan, a: P(S, 0, 6) * fade });
    txt('all three positions still differ', 1400, 510, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.mag, a: p1 * fade });
    txt('ONE AND MANY · NO COLLAPSE', 1400, 590, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 2) * fade, ls: 2 });
    thm('MMM §81 · §84 Fazang · §85 Leibniz', 1400, 640, P(S, 1, 2) * fade, 'center');
  }
  const p2 = P(S, 1, 6.5, 0.6);
  if (p2 > 0) {
    const bx = W / 2 - 300, by = 360;
    box(bx, by, 600, 200, C.cyan, p2, 2.5, 'rgba(0,20,30,0.7)');
    txt('1', bx + 150, by + 130, { size: 110, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: p2 });
    txt('0', bx + 450, by + 130, { size: 110, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: p2 * (1 - 0.85 * P(S, 1, 9, 0.6)) });
    fillBox(bx + 300, by + 2, 298, 196, '#03050c', 0.85 * P(S, 1, 9, 0.6));
    txt('HOLDING THE WHOLE  ≠  READING IT', W / 2, 660, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 9.5), ls: 2 });
    txt('full state inside · one bit readable', W / 2, 710, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 10) });
    thm('MMM §82', W / 2, 750, P(S, 1, 10), 'center');
  }
};

/* ---- 08 UPAYA ---- */
SCENES.upaya = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'bridge');
  txt('方 便', W / 2, 215, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.gold, a: at(S, 0, 0.6), ab: 2 });
  const row = (y, label, msg, act, col, ok, q) => {
    if (q <= 0) return;
    txt(label, 170, y + 8, { size: 22, fam: F.orb, w: 900, c: col, a: q, ls: 2 });
    const stg = [['STATE x', 520], [msg, 900], ['ACTION', 1280]];
    stg.forEach(([s, x], i) => { box(x - 140, y - 36, 280, 70, i === 1 ? col : C.dim, q, 2, 'rgba(4,10,24,0.7)'); txt(s, x, y + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: i === 1 ? col : C.white, a: q }); if (i < 2) arrow(x + 145, y, x + 235, y, C.dim, q, 2); });
    txt(act, 1560, y + 8, { size: 26, fam: F.mono, w: 700, c: ok ? C.green : C.red, a: q });
  };
  row(360, 'CASE A', 'always TRUE', '✗ misses x=1', C.cyan, false, P(S, 0, 1.5));
  row(500, 'CASE B', 'always FALSE', '✓ right every time', C.mag, true, P(S, 1, 0.5));
  txt('(receiver inverts)', 900, 570, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 2) });
  const q = P(S, 1, 5);
  txt('TRUTHFULNESS  ⟂  SUFFICIENCY', W / 2, 650, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: q, ls: 3 });
  thm('truthfulness_sufficiency_independence', W / 2, 690, q, 'center');
  const h = P(S, 1, 8, 0.8);
  if (h > 0) {
    for (let k = 0; k < 40; k++) { const x = 1650 + (rnd(k, 1) - 0.5) * 200, y = 300 - ((t * 60 + rnd(k, 2) * 200) % 200); dot(x, y + 60, 8, k % 3 ? 'o' : 'm', h * 0.8); }
    txt('火宅喻', 1650, 240, { size: 30, fam: F.zh, w: 900, align: 'center', c: C.orange, a: h });
    txt('乃至不与最小一车，犹不虚妄', W / 2, 760, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.white, a: P(S, 1, 12) });
    thm('Lotus Sutra ch. 3 · MMM §100', W / 2, 800, P(S, 1, 12), 'center');
  }
};

/* ---- 09 TOGETHER ---- */
SCENES.together = S => {
  const u = S.u, t = S.t;
  badges(S, ['bridge', 'bridge', 'theory']);
  const p2 = at(S, 2, 0.5); const fade = 1 - p2;
  if (fade > 0) {
    const x = 640, y = 280, s = 190;
    const ann = P(S, 1, 2.5, 0.8);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const actual = i === 1 && j === 0; const cx = x + i * s, cy = y + j * s;
      const on = ann > 0 ? (actual ? 1 : 1 - ann) : 1;
      box(cx, cy, s - 10, s - 10, actual && ann > 0 ? C.gold : C.dim, fade * (0.4 + 0.6 * on), 2, 'rgba(4,10,24,0.6)');
      txt(`${i}${j}`, cx + (s - 10) / 2, cy + (s - 10) / 2 + 12, { size: 34, fam: F.mono, w: 700, align: 'center', c: actual && ann > 0 ? C.gold : C.white, a: fade * on });
    }
    const al = P(S, 0, 1.5), bo = P(S, 0, 3);
    for (let i = 0; i < 2; i++) { ctx.globalAlpha = al * fade * (1 - ann); ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.strokeRect(x + i * s - 8, y - 8, s + 6, 2 * s + 6); }
    for (let j = 0; j < 2; j++) { ctx.globalAlpha = bo * fade * (1 - ann); ctx.strokeStyle = C.mag; ctx.lineWidth = 4; ctx.strokeRect(x - 16, y + j * s - 16, 2 * s + 22, s + 22); }
    ctx.globalAlpha = 1;
    txt('ALICE sees bit 1', 360, 380, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: al * fade });
    txt('BOB sees bit 2', 360, 460, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.mag, a: bo * fade });
    const k1 = P(S, 0, 5);
    txt('pooled: knows everything', 1420, 380, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.green, a: k1 * fade * (1 - ann) });
    txt('common knowledge: nothing', 1420, 440, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 7) * fade * (1 - ann) });
    thm('two_bit_joint_common_knowledge_separation', 1420, 490, P(S, 0, 7) * fade * (1 - ann), 'center');
    txt('public, truthful announcement', 1420, 380, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: ann * fade });
    txt('→ the whole state is common knowledge', 1420, 440, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) * fade });
    txt('and they are still two people', 1420, 500, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 7) * fade });
    txt('UNITY NEED NOT GROW EMPTIER', W / 2, 740, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 9) * fade, ls: 3 });
    thm('true_public_announcement_is_common_knowledge_on_admitted_domain', W / 2, 785, P(S, 1, 9) * fade, 'center');
  }
  if (p2 > 0) {
    const lv = 7;
    for (let k = 0; k < lv; k++) {
      const q = P(S, 2, 1 + k * 0.7); const y = 700 - k * 70; const w = 700 - k * 40;
      box(W / 2 - 450 - w / 2 + 350, y - 30, w, 56, C.cyan, q, 1.8, 'rgba(0,15,25,0.7)');
      txt(k === 0 ? 'everyone believes P' : 'everyone believes ' + '(…) '.repeat(Math.min(k, 3)).trim(), W / 2 - 100, y + 6, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    }
    txt('P is FALSE', 1500, 420, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 2, 6), ab: 2 });
    txt('一千人赞同仍可错误', 1500, 520, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 2, 9) });
    thm('ʻAbdu\'l-Bahá on consultation · MMM §115, §120', 1500, 565, P(S, 2, 9), 'center');
  }
};

/* ---- 10 CARE ---- */
SCENES.care = S => {
  const u = S.u, t = S.t;
  badges(S, ['bridge', 'bridge']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const gx = 260, gy = 620, gw = 760, gh = 360;
    line(gx, gy, gx + gw, gy, C.dim, p0, 2); line(gx, gy - gh, gx, gy + 120, C.dim, p0, 2);
    txt('λ', gx + gw + 30, gy + 8, { size: 30, fam: F.mono, w: 700, c: C.white, a: p0 });
    txt('ΔW', gx - 20, gy - gh - 15, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: p0 });
    const dr = P(S, 0, 3, 3);
    ctx.globalAlpha = p0; ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath();
    for (let i = 0; i <= 100 * dr; i++) { const l = i / 100; const v = -1 + 2 * l; const x = gx + l * gw, y = gy - v * 110; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.stroke(); ctx.globalAlpha = 1;
    const hx = gx + gw / 2; const hq = P(S, 0, 6);
    ring(hx, gy, 16, C.gold, hq * p0, 3);
    txt('λ = ½', hx, gy + 50, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: hq * p0 });
    txt('0', gx, gy + 40, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 }); txt('1', gx + gw, gy + 40, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 });
    txt('ΔW = −1 + 2λ', 1420, 360, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) * p0 });
    txt('n = 2 · b = 4 · c = 3', 1420, 410, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 2) * p0 });
    thm('contribution_incentive_threshold', 1420, 450, P(S, 0, 3) * p0, 'center');
    const nq = P(S, 0, 9);
    box(1120, 520, 600, 90, C.vio, nq * p0, 2, 'rgba(15,8,35,0.8)');
    txt('λ is NOT a measure of love', 1420, 577, { size: 32, fam: F.orb, w: 700, align: 'center', c: C.vio, a: nq * p0, ls: 1 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const st = [['ALL GIVE', 'each gets b − c > 0', C.green, 'stable'], ['NONE GIVE', 'each gets 0', C.dim, 'stable']];
    st.forEach(([a, b, col, s], i) => {
      const x = 520 + i * 880, y = 380; const q = P(S, 1, 2 + i * 1.5);
      box(x - 280, y - 80, 560, 190, col, q, 2.5, 'rgba(4,10,24,0.7)');
      txt(a, x, y - 10, { size: 40, fam: F.orb, w: 900, align: 'center', c: col === C.dim ? C.white : col, a: q, ls: 3 });
      txt(b, x, y + 40, { size: 24, fam: F.mono, align: 'center', c: C.white, a: q });
      txt(s, x, y + 85, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
    });
    const lq = P(S, 1, 6);
    dot(W / 2, 640, 30, 'm', lq);
    txt('lone first giver:  −c', W / 2, 720, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: lq });
    txt('good will still needs coordination', W / 2, 770, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 9) });
    thm('threshold_public_good_dual_equilibria', W / 2, 805, P(S, 1, 9), 'center');
  }
};

/* ---- 11 PRAYER ---- */
SCENES.prayer = S => {
  const u = S.u, t = S.t;
  badges(S, ['bridge', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const d = (x, y, rev, q) => {
      dot(x - 160, y, 44, 'g', q); dot(x + 160, y, 44, 'c', q);
      txt('PRAYER', x - 160, y + 85, { size: 22, fam: F.orb, w: 900, align: 'center', c: C.gold, a: q, ls: 2 });
      txt('OUTCOME', x + 160, y + 85, { size: 22, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: q, ls: 2 });
      if (!rev) arrow(x - 105, y, x + 105, y, C.white, q, 4); else arrow(x + 105, y, x - 105, y, C.white, q, 4);
    };
    d(520, 420, false, P(S, 0, 1)); d(1400, 420, true, P(S, 0, 3));
    txt('P → Y', 520, 320, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) });
    txt('Y → P', 1400, 320, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
    txt('=', W / 2, 440, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 0, 5) });
    txt('identical observations', W / 2, 600, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 5) });
    txt('do(P := 0)  tells them apart', W / 2, 660, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 8) });
    thm('observation_strictly_weaker_than_intervention', W / 2, 705, P(S, 0, 8), 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const nodes = [['PRACTICE', 380, C.gold], ['ACTION', W / 2, C.mag], ['SUCCESS', 1540, C.cyan]];
    nodes.forEach(([n, x, col], i) => { box(x - 150, 300, 300, 80, col, p1, 2, 'rgba(4,10,24,0.7)'); txt(n, x, 350, { size: 26, fam: F.orb, w: 900, align: 'center', c: col, a: p1, ls: 2 }); if (i < 2) arrow(x + 160, 340, nodes[i + 1][1] - 160, 340, C.white, p1, 3); });
    const g = P(S, 1, 3, 2.5);
    const bar = (x, v, lab, col, q) => { fillBox(x - 60, 720 - v * 500, 120, v * 500, col, 0.8 * q); box(x - 60, 720 - v * 500, 120, v * 500, col, q, 2); txt(lab, x, 720 - v * 500 - 20, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); };
    bar(760, 7 / 20, '7/20', C.dim, P(S, 1, 2));
    bar(1160, 7 / 20 + (6 / 20) * ease(g), g > 0.95 ? '13/20' : '…', C.cyan, P(S, 1, 3));
    txt('without', 760, 760, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 2) });
    txt('with practice', 1160, 760, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 3) });
    txt('all of it through action', 1600, 520, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 6) });
    txt('model parameters,', 1600, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 9) });
    txt('not a measurement of prayer', 1600, 635, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 9) });
    thm('MMM §154', 1600, 680, P(S, 1, 9), 'center');
  }
};

/* ---- 12 SELF ---- */
SCENES.self = S => {
  const u = S.u, t = S.t;
  badges(S, ['bridge', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const x = 520, y = 500; const br = ease(P(S, 0, 2.5, 2));
    dot(x, y, 50, 'w', p0); txt('x', x, y - 70, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
    for (const sg of [-1, 1]) {
      const ex = x + 540 * br, ey = y + sg * 200 * br;
      ctx.globalAlpha = p0; ctx.strokeStyle = sg < 0 ? C.cyan : C.mag; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 270 * br, y, ex, ey); ctx.stroke(); ctx.globalAlpha = 1;
      dot(ex, ey, 34, sg < 0 ? 'c' : 'm', p0 * br);
      txt(sg < 0 ? 'y' : 'z', ex + 60, ey + 10, { size: 30, fam: F.mono, w: 700, c: sg < 0 ? C.cyan : C.mag, a: p0 * br });
    }
    txt('M(x,y) ∧ M(x,z) ∧ y ≠ z', 1450, 420, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) * p0 });
    txt('⇒  memory ≠ strict identity', 1450, 490, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) * p0 });
    thm('branching_memory_is_not_equality', 1450, 535, P(S, 0, 6) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const sx = 360, sy = 470;
    const sOn = (Math.floor(t * 0.5) % 2) === 0;
    const cOn = P(S, 1, 6) < 0.5;
    dot(sx, sy, 80 + 6 * Math.sin(t * 2), sOn ? 'g' : 'v', p1 * (sOn ? 1 : 0.35));
    txt('SOURCE  s = ' + (sOn ? 1 : 0), sx, sy + 140, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    const gx = 900;
    box(gx - 40, sy - 110, 80, 220, cOn ? C.green : C.red, p1, 3, cOn ? 'rgba(0,30,15,0.5)' : 'rgba(40,0,10,0.8)');
    txt('CHANNEL c = ' + (cOn ? 1 : 0), gx, sy + 170, { size: 24, fam: F.mono, w: 700, align: 'center', c: cOn ? C.green : C.red, a: p1 });
    if (cOn && sOn) for (let k = 0; k < 7; k++) line(sx + 90, sy - 60 + k * 20, gx - 45, sy - 60 + k * 20, C.gold, p1 * 0.5, 2);
    if (cOn && sOn) for (let k = 0; k < 7; k++) line(gx + 45, sy - 60 + k * 20, 1300, sy - 60 + k * 20, C.gold, p1 * 0.5, 2);
    ctx.globalAlpha = p1; ctx.strokeStyle = C.cyan; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1320, sy - 140); ctx.lineTo(1360, sy + 140); ctx.stroke(); ctx.globalAlpha = 1;
    const o = sOn && cOn;
    dot(1340, sy, 40, o ? 'g' : 'v', p1 * (o ? 1 : 0.2));
    txt('MIRROR  o = s ∧ c = ' + (o ? 1 : 0), 1450, sy + 200, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    txt('镜 与 日', W / 2, 220, { size: 44, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p1, ab: 2 });
    const q = P(S, 1, 9);
    txt('vanishing proves neither ending', W / 2, 740, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: q, ls: 1 });
    txt('nor living on', W / 2, 785, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: q, ls: 1 });
    thm('MMM Prop. 144.3 · Bahá\'í mirror & sun · Gita', 1600, 290, q, 'center');
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  const cx = W / 2, cy = 545;
  const tri = [0, 1, 2].map(i => [cx + Math.cos(-Math.PI / 2 + i * TAU / 3 + t * 0.05) * 230, cy + Math.sin(-Math.PI / 2 + i * TAU / 3 + t * 0.05) * 170]);
  const nrel = Math.floor(clamp((u - 1) / 16) * 40);
  if (fade > 0) {
    for (let k = 0; k < nrel; k++) {
      const a = tri[k % 3], b = tri[(k + 1) % 3]; const f1 = rnd(k, 1), f2 = rnd(k, 2);
      const p = [lerp(a[0], b[0], f1), lerp(a[1], b[1], f1)], q = [lerp(tri[(k + 2) % 3][0], a[0], f2), lerp(tri[(k + 2) % 3][1], a[1], f2)];
      line(p[0], p[1], q[0], q[1], k % 4 === 3 ? C.mag : C.cyan, 0.35 * fade, 1.2);
    }
    [['MATH', C.cyan], ['MYTH', C.mag], ['MATCH', C.gold]].forEach(([w, col], i) => { dot(tri[i][0], tri[i][1], 36, ['c', 'm', 'g'][i], fade); txt(w, tri[i][0] + (tri[i][0] < cx - 20 ? -110 : tri[i][0] > cx + 20 ? 110 : 0), tri[i][1] + 10 + (tri[i][1] < cy - 60 ? -45 : 0), { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a: fade, ls: 3 }); });
    txt('neither a proof that God exists · nor that God does not', W / 2, 220, { size: 32, fam: F.raj, w: 600, align: 'center', c: C.white, a: at(S, 0, 0.6) * fade });
    txt('the unit of progress: a relation that passed its checks', W / 2, 800, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: at(S, 0, 0.6, 5) * fade, ls: 1 });
    txt('可积累的关系 · 不能被诚实抹去的分歧', W / 2, 280, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: at(S, 1, 0.6) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    drawHyper(CUBE5, [[0, 4, t * 0.3], [1, 3, t * 0.2], [2, 4, t * 0.15]], { scale: 1.0, rx: 0.3, ry: t * 0.2, a: ep * out * 0.5, cy: 320, lw: 1.2, dots: false, camZ: 7 });
    txt('MATH · MYTH · MATCH', W / 2, 620, { size: 92, fam: F.orb, w: 900, align: 'center', c: '#fff8e8', a: ep * out, ab: 5, ls: 8 });
    txt('真理有形而无法穷尽 · TRURETURING FILM 006', W / 2, 700, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('No referee. Every match states what it keeps.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'SHAPE', margins: 'MARGINS', practice: 'PRACTICE', unending: 'UNENDING', same: 'SAMENESS', buddha: 'REACH', net: 'ONE-MANY', upaya: 'UPAYA', together: 'TOGETHER', care: 'CARE', prayer: 'PRAYER', self: 'SELF', finale: 'MATCH' });

function poster6() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawHyper(CUBE6, [[0, 5, t * 0.21], [1, 4, t * 0.16], [2, 5, t * 0.12], [3, 4, t * 0.18]], { scale: 1.9, rx: 0.3, ry: t * 0.08, a: 0.55, lw: 1.3, camZ: 7.5, cy: 470 });
  txt('真理有形，而无法穷尽', W / 2, 190, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('MATH · MYTH · MATCH', W / 2, 790, { size: 120, fam: F.orb, w: 900, align: 'center', c: '#fff8e8', ab: 6, ls: 8 });
  bloom(0.65);
  txt('宗教、哲学与数学：没有裁判的会通', W / 2, 900, { size: 44, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 006', W / 2, 965, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster6;
