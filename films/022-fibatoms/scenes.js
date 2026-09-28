/* Film 022 — FIBONACCI ATOMS. */

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


/* ---- film 022 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    theory: ['THEORY VOLUME · PAPER PROOF · NOT YET IN LEAN', C.orange, 'rgba(40,20,0,0.75)'],
    cond: ['THEORY VOLUME · PAPER PROOF · STATED STATE & CUT', C.gold, 'rgba(40,30,0,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function bar(x, y, w, h, col, a) { fillBox(x, y - h, w, h, col, a); }
function brick(x, y, s, kind, a) {
  if (a <= 0) return;
  const col = kind === 'a' ? C.cyan : C.gold;
  ctx.globalAlpha = a * 0.35; ctx.fillStyle = col; ctx.fillRect(x - s / 2, y - s * 0.35, s, s * 0.7); ctx.globalAlpha = 1;
  box(x - s / 2, y - s * 0.35, s, s * 0.7, col, a, 2);
  for (let k = 0; k < 2; k++) { ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(x - s * 0.3 + k * s * 0.4, y - s * 0.5, s * 0.2, s * 0.15); ctx.globalAlpha = 1; }
  txt(kind === 'a' ? 'α' : 'β', x, y + s * 0.15, { size: s * 0.42, fam: F.mono, w: 700, align: 'center', c: C.white, a });
}
const rho = t => t === 'a' ? 'b' : t === 'b' ? ['b', 'a'] : [rho(t[0]), rho(t[1])];
const Tj = j => { let t = 'a'; for (let i = 0; i < j; i++) t = rho(t); return t; };
const leaves = t => typeof t === 'string' ? 1 : leaves(t[0]) + leaves(t[1]);
const cnt = t => typeof t === 'string' ? (t === 'a' ? [1, 0] : [0, 1]) : [cnt(t[0])[0] + cnt(t[1])[0], cnt(t[0])[1] + cnt(t[1])[1]];
function drawTree(t, x, y, w, dy, s, a) {
  if (a <= 0) return;
  if (typeof t === 'string') { brick(x, y, s, t, a); return; }
  const nl = leaves(t[0]), nr = leaves(t[1]), tot = nl + nr;
  const xl = x - w / 2 + w * nl / tot / 2, xr = x + w / 2 - w * nr / tot / 2;
  dot(x, y, 6, 'w', a);
  line(x, y, xl, y + dy, C.dim, a, 2); line(x, y, xr, y + dy, C.dim, a, 2);
  drawTree(t[0], xl, y + dy, w * nl / tot, dy, s, a);
  drawTree(t[1], xr, y + dy, w * nr / tot, dy, s, a);
}
function coin(x, y, r, v, a) { if (a <= 0) return; const col = v === 2 ? C.cyan : C.gold; dot(x, y, r, v === 2 ? 'c' : 'g', a * 0.35); ring(x, y, r, col, a, 3); txt(v + '¢', x, y + r * 0.3, { size: r * 0.8, fam: F.mono, w: 700, align: 'center', c: C.white, a }); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  brick(700, 360, 150, 'a', sp); brick(1220, 360, 150, 'b', P(S, 0, 1));
  txt('young rabbit · brick one', 700, 470, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: sp });
  txt('adult rabbit · brick two', 1220, 470, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: P(S, 0, 1) });
  const q = P(S, 0, 3);
  txt('⟨ s , t ⟩', 960, 380, { size: 50, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
  txt('one ordered snap', 960, 430, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: q });
  ['1', '+', '×', '='].forEach((s, i) => { const x = 660 + i * 200, qq = P(S, 0, 5 + i * 0.4); txt(s, x, 640, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.dim, a: qq }); line(x - 40, 610, x + 40, 580 + 30, C.red, qq, 5); line(x - 40, 590, x + 40, 630, C.red, qq, 0); });
  txt('not yet', 960, 710, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 6.5) });
  txt('arithmetic must be grown from stated relations', W / 2, 810, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  drawTree(Tj(5), W / 2, 230, 620, 50, 34, rp);
  txt(scramble('FIBONACCI ATOMS', rp, 221), W / 2, 620, { size: 88, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 8 });
  txt('Fibonacci 原 子 关 系 生 成', W / 2, 700, { size: 46, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 022 · FIBONACCI_ATOMIC_RELATION_GENERATION', W / 2, 170, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  txt('nothing assumed · every number earned', W / 2, 790, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 1) });
};

/* ---- 02 RABBITS ---- */
SCENES.rabbits = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  brick(360, 260, 80, 'a', p0); arrow(420, 260, 520, 260, C.white, P(S, 0, 1), 3); brick(580, 260, 80, 'b', P(S, 0, 1));
  brick(820, 260, 80, 'b', P(S, 0, 3)); arrow(880, 260, 980, 260, C.white, P(S, 0, 4), 3); txt('⟨', 1010, 275, { size: 50, fam: F.mono, align: 'center', c: C.white, a: P(S, 0, 4) }); brick(1070, 260, 80, 'b', P(S, 0, 4)); brick(1170, 260, 80, 'a', P(S, 0, 4)); txt('⟩', 1230, 275, { size: 50, fam: F.mono, align: 'center', c: C.white, a: P(S, 0, 4) });
  txt('young → adult', 470, 340, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: P(S, 0, 1) });
  txt('adult → (adult, newborn)', 1030, 340, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: P(S, 0, 4) });
  if (p1 > 0) {
    const xs = [300, 470, 680, 990, 1440], ws = [0, 0, 150, 260, 460];
    for (let j = 0; j < 5; j++) {
      const q = P(S, 1, 0.3 + j * 0.8);
      drawTree(Tj(j), xs[j], 420, ws[j], 55, 36, q);
      const c = cnt(Tj(j));
      txt('T' + j + ' : (' + c[0] + ',' + c[1] + ')', xs[j], 720, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    }
    txt('T(j+2) = ⟨ T(j+1) , T(j) ⟩', 700, 790, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
    txt('growth rate → φ = 1.618…', 1350, 790, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 7), ab: 1 });
  }
  thm('§3 · Def 3.1 · Thm 3.2 · Thm 3.4 (M² = M + I)', W / 2, 850, P(S, 1, 8), 'center');
};

/* ---- 03 RECIPE ---- */
SCENES.recipe = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [[['a', 'b'], 520, C.cyan], [['b', 'a'], 1400, C.mag]].forEach(([tr, x, col], i) => {
    box(x - 220, 200, 440, 300, col, p0, 2, 'rgba(0,0,0,0.45)');
    txt('RECIPE ' + (i + 1), x, 240, { size: 24, fam: F.orb, w: 900, align: 'center', c: col, a: p0 });
    drawTree(tr, x, 290, 200, 80, 70, p0);
    arrow(x, 520, x, 590, C.white, P(S, 0, 3), 3);
    box(x - 180, 600, 360, 110, C.green, P(S, 0, 3), 2, 'rgba(0,30,20,0.5)');
    txt('α × 1   β × 1', x, 668, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 3) });
  });
  txt('≠', W / 2, 370, { size: 80, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 0.5) });
  txt('=', W / 2, 680, { size: 80, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 1.5) });
  txt('every observation keeps something and forgets something', W / 2, 810, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
  thm('§3 · Def 3.3 composition observation', W / 2, 860, P(S, 1, 5), 'center');
};

/* ---- 04 COINS ---- */
SCENES.coins = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const cx = 700, cy = 420, tilt = 0.12 * Math.sin(t * 2) * (1 - P(S, 0, 4));
  line(cx, cy + 40, cx, cy + 220, C.dim, p0, 4);
  const lx = cx - 280, rx = cx + 280, ly = cy + Math.sin(tilt) * 280, ry = cy - Math.sin(tilt) * 280;
  line(lx, ly, rx, ry, C.white, p0, 4);
  [0, 1, 2].forEach(k => coin(lx - 90 + k * 90, ly - 60, 38, 2, P(S, 0, 1 + k * 0.3)));
  [0, 1].forEach(k => coin(rx - 45 + k * 90, ry - 60, 38, 3, P(S, 0, 2 + k * 0.3)));
  txt('3 α  ~  2 β', cx, cy + 290, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3), ab: 1 });
  txt('declared, not assumed', cx, cy + 335, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 4) });
  if (p1 > 0) {
    txt('β − α = e  =  1¢', 1450, 330, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.mag, a: P(S, 1, 0.5), ab: 2 });
    txt('α = 2e     β = 3e', 1450, 400, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) });
    for (let n = 0; n <= 6; n++) { const q = P(S, 1, 3 + n * 0.2), x = 1180 + n * 90; line(x, 510, x, 530, C.white, q, 2); txt(String(n), x, 565, { size: 24, fam: F.mono, w: 700, align: 'center', c: n === 1 ? C.mag : n === 2 ? C.cyan : n === 3 ? C.gold : C.white, a: q }); }
    line(1180, 520, 1720, 520, C.dim, P(S, 1, 3), 2);
    txt('(ℕ, 0, e, +, ⊗)  ≅  (ℕ, 0, 1, +, ×)', 1450, 650, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 6) });
  }
  thm('§4 · Thm 4.2 (the unit from an atom difference) · Thm 4.4', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 05 BALANCE ---- */
SCENES.balance = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [[[2, 2, 2], 520, C.cyan, 9, '3α → 3β'], [[3, 3], 1400, C.gold, 10, '2β → 2α + 2β']].forEach(([cs, x, col, nx, lab], i) => {
    box(x - 250, 210, 500, 230, col, p0, 2, 'rgba(0,0,0,0.45)');
    txt('PURSE ' + 'AB'[i], x, 250, { size: 24, fam: F.orb, w: 900, align: 'center', c: col, a: p0 });
    cs.forEach((v, k) => coin(x - (cs.length - 1) * 55 + k * 110, 340, 44, v, P(S, 0, 1 + k * 0.3 + i)));
    txt('6', x, 510, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 0, 4), ab: 2 });
    if (p1 > 0) {
      arrow(x, 540, x, 610, C.white, P(S, 1, 0.5), 3);
      txt(lab, x, 650, { size: 24, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 1) });
      txt(String(nx), x, 740, { size: 80, fam: F.orb, w: 900, align: 'center', c: i ? C.mag : C.cyan, a: P(S, 1, 2 + i), ab: 3 });
    }
  });
  txt('=', W / 2, 510, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 5) });
  txt('≠', W / 2, 740, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 4) });
  txt('same balance today · different balance tomorrow', W / 2, 830, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) });
  thm('§5 · Thm 5.1', W / 2, 870, P(S, 1, 6), 'center');
};

/* ---- 06 PHOTOS ---- */
SCENES.photos = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [['NOW', 400, C.cyan, '2a + 3b', '26'], ['NEXT STEP', 900, C.mag, '3a + 5b', '41']].forEach(([n, x, col, f, v], i) => {
    const q = P(S, 0, 0.5 + i * 1.5);
    box(x - 190, 210, 380, 280, col, q, 3, 'rgba(0,0,0,0.5)');
    ring(x, 330, 60, col, q, 3); ring(x, 330, 25, col, q, 2);
    txt('photo ' + (i + 1) + ' · ' + n, x, 250, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    txt(f, x, 440, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt(v, x, 560, { size: 64, fam: F.orb, w: 900, align: 'center', c: col, a: p1 > 0 ? P(S, 1, 0.5 + i) : 0, ab: 2 });
  });
  if (p1 > 0) {
    txt('(a, b) = (7, 4)', 650, 650, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.3) });
    txt('a = 5·26 − 3·41 = 7', 1400, 300, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
    txt('b = 2·41 − 3·26 = 4', 1400, 360, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4) });
    txt('det [[2,3],[3,5]] = 1', 1400, 460, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5.5), ab: 1 });
    txt('nothing lost · all future readings follow', 1400, 520, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 6.5) });
    txt('mod m: exactly m² states needed', 1400, 580, { size: 24, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 7) });
  }
  thm('§5 · Thm 5.4 · Cor 5.5', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 07 LOCK ---- */
SCENES.lock = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const lx = 420, ly = 420;
  box(lx - 120, ly - 60, 240, 200, C.gold, p0, 3, 'rgba(30,20,0,0.5)');
  ctx.globalAlpha = p0; ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(lx, ly - 60, 80, Math.PI, 0); ctx.stroke(); ctx.globalAlpha = 1;
  txt('|u² + uv − v²| = 1', lx, ly + 60, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  const keys = [[1, 1], [1, 2], [2, 3], [3, 5], [5, 8], [8, 13]];
  keys.forEach(([a, b], i) => { const q = P(S, 0, 2 + i * 0.5), prime = (a === 2 && b === 3) || (a === 3 && b === 5); chip(820 + (i % 3) * 230, 280 + Math.floor(i / 3) * 100, 190, 64, '(' + a + ', ' + b + ')', p1 > 0 && prime ? C.mag : C.green, q, 28); });
  txt('only neighbouring Fibonacci keys open it', 1050, 500, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 5) });
  if (p1 > 0) {
    txt('both prime: (2,3) or (3,5)', 1050, 560, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 1) });
    for (let k = 0; k < 6; k++) { const x = 300 + k * 110, y = 780 - k * 40, skip = k === 4; box(x, y, 100, 30, skip ? C.red : C.dim, P(S, 1, 3) * (skip ? 0.35 : 1), 2, skip ? null : 'rgba(0,0,0,0.4)'); txt(['1', '2', '3', '5', '8', '13'][k], x + 50, y + 22, { size: 18, fam: F.mono, w: 700, align: 'center', c: skip ? C.red : C.white, a: P(S, 1, 3) }); }
    txt('skip a stair: (5, 13)', 1200, 660, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4) });
    txt('Δ = −79 → blind spot mod 79', 1200, 720, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 5), ab: 1 });
  }
  thm('§6 · Thm 6.2 · Thm 6.3 · Cor 6.4 · Prop 6.5', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 08 ZIP ---- */
SCENES.zip = S => {
  const u = S.u;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  [2, 3, 5, 8, 13].forEach((v, i) => { const q = P(S, 0, 0.5 + i * 0.5), x = 300 + i * 190, pr = v !== 8; cellv(x - 55, 220, 110, v, pr ? C.gold : C.dim, q); txt('T' + i, x, 370, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q }); if (pr) txt('✓ prime proof', x, 405, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: q * P(S, 0, 4) }); });
  const zq = P(S, 0, 6);
  box(1300, 200, 340, 220, C.mag, zq, 3, 'rgba(40,0,30,0.5)');
  txt('ATOM "13"', 1470, 270, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.mag, a: zq });
  for (let k = 0; k < 8; k++) fillBox(1460, 290 + k * 14, 20, 8, C.mag, zq * (k % 2 ? 0.3 : 0.8));
  txt('zip ⇄ unzip exactly', 1470, 400, { size: 20, fam: F.mono, align: 'center', c: C.white, a: zq });
  if (p1 > 0) {
    txt('α → αα     β → αβ     ⟨s,t⟩ → β·s·t', W / 2, 520, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 0.5) });
    txt('⟨β, α⟩  →  β  αβ  αα', W / 2, 590, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 1 });
    txt('prefix-free · no ambiguous pauses · every path read → whole tree back', W / 2, 660, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 4) });
    txt('— · · — — ·', W / 2, 730, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 1, 5) });
  }
  thm('§8 · Thm 8.4 · §9 · Thms 9.2–9.3', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 09 SHADOWS ---- */
SCENES.shadows = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const phi = (1 + Math.sqrt(5)) / 2, psi = 1 - phi;
  const k = Math.floor(P(S, 0, 3, 5) * 4);
  let a = 1, b = 1; for (let i = 0; i < k; i++) { const na = b, nb = a + b; a = na; b = nb; }
  const xp = a + b * phi, xm = a + b * psi;
  const ox = 380, oy = 560;
  dot(ox + 60, 220, 14, 'g', p0); txt('lamp +', ox + 60, 200, { size: 18, fam: F.mono, align: 'center', c: C.gold, a: p0 });
  line(ox, oy, ox + 900, oy, C.cyan, p0, 2); txt('shadow + (×φ)', ox + 900, oy + 35, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: p0 });
  fillBox(ox, oy - 14, Math.min(880, xp * 38), 28, C.cyan, 0.6 * p0);
  line(ox + 450, oy + 120, ox + 450, oy + 280, C.dim, p0, 1);
  fillBox(ox + 450 + Math.min(0, xm * 300), oy + 185, Math.abs(xm) * 300, 28, C.mag, 0.7 * p0);
  txt('shadow − (×ψ, shrinks & flips)', ox + 450, oy + 260, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p0 });
  txt('x = ' + a + ' + ' + b + 'θ', ox + 450, 300, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('θ² = θ + 1', ox + 450, 360, { size: 24, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  if (p1 > 0) {
    txt('swap = conjugation · product = norm', 1480, 260, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 0.5) });
    txt('perfect photos ⟺ norm ±1 (units)', 1480, 310, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2) });
    [['θ⁴', 13, true], ['θ⁵', 21, false], ['θ⁸', 89, true], ['θ¹⁶', 4181, false]].forEach(([n, v, pr], i) => { const q = P(S, 1, 4 + i * 0.6), y = 390 + i * 60; txt(n + ' → ' + v, 1400, y, { size: 30, fam: F.mono, w: 700, c: C.white, a: q }); txt(pr ? 'prime' : v === 21 ? '3·7' : '37·113', 1640, y, { size: 26, fam: F.mono, w: 700, c: pr ? C.green : C.red, a: q }); });
    txt('unit ≠ prime', 1480, 660, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7), ab: 2 });
  }
  thm('§15 · Thm 15.2 ℤ[φ] · Thm 15.6 · Prop 15.10 · §18 two real embeddings', W / 2, 870, P(S, 1, 7), 'center');
};

/* ---- 10 TOOLS ---- */
SCENES.tools = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const fa = p0 * (1 - p1);
  if (fa > 0) {
    [['M', 'step the rule', C.cyan], ['J', 'swap shadows', C.mag], ['∂', 'read 2nd dial', C.gold]].forEach(([n, l, col], i) => { const x = 400 + i * 300, q = fa * P(S, 0, 0.5 + i * 0.7); box(x - 110, 220, 220, 150, col, q, 3, 'rgba(0,0,0,0.5)'); txt(n, x, 310, { size: 64, fam: F.orb, w: 900, align: 'center', c: col, a: q }); txt(l, x, 400, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) { const reach = (i + 2 * j) % 5 === 0; dot(1250 + i * 45, 220 + j * 45, reach ? 8 : 5, reach ? 'c' : 'w', fa * (reach ? 1 : 0.25) * P(S, 0, 3)); }
    txt('M, J reach 1 in 5', 1450, 690, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: fa * P(S, 0, 4) });
    txt('adapter δ = 2θ − 1,  δ² = 5', 700, 560, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: fa * P(S, 0, 6), ab: 1 });
    txt('5∂ = (2M − I)(I − J)', 700, 620, { size: 28, fam: F.mono, align: 'center', c: C.white, a: fa * P(S, 0, 7) });
    txt('(lattice picture schematic)', 1450, 730, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: fa * P(S, 0, 4) });
  }
  if (p1 > 0) {
    const bars = [[13, 1, 13, C.cyan, 'mod 13'], [21, 3, 7, C.mag, 'mod 21']];
    bars.forEach(([n, r, c, col, lab], i) => {
      const q = P(S, 1, 0.5 + i * 1.5), x0 = i ? 1050 : 300, y0 = 320, s = i ? 60 : 44;
      const rows = i ? 3 : 1, cols = i ? 7 : 13;
      for (let a = 0; a < rows; a++) for (let b = 0; b < cols; b++) { fillBox(x0 + b * s, y0 + a * s, s - 4, s - 4, '#6b3a1f', q * 0.9); box(x0 + b * s, y0 + a * s, s - 4, s - 4, col, q * 0.5, 1); }
      txt(lab, x0 + cols * s / 2, y0 - 30, { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a: q });
      txt(i ? 'breaks along 3 and 7' : 'no score lines · atomic', x0 + cols * s / 2, y0 + rows * s + 50, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    });
    txt('prime  ⟺  no proper closed piece', W / 2, 700, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 5), ab: 2 });
    txt('closed pieces: mod 13 → {1, 169} · mod 21 → {1, 9, 49, 441}', W / 2, 760, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 6) });
  }
  thm('§19 Thms 19.2–19.4 · §20 Thm 20.2, Cor 20.3, Thm 20.5', W / 2, 860, P(S, 1, 7), 'center');
};

/* ---- 11 SAFE ---- */
SCENES.safe = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'cond');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const sx = 520, sy = 420;
  box(sx - 220, sy - 200, 440, 400, C.gold, p0, 4, 'rgba(30,20,0,0.5)');
  ring(sx, sy, 70, C.gold, p0, 3);
  const labs = ['u', 'v', 'u+v', 'u+2v'], pos = [[-150, -140], [150, -140], [-150, 140], [150, 140]];
  const pair = Math.floor(t * 0.8) % 6, pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]][pair];
  labs.forEach((l, i) => { const on = pairs.includes(i); ring(sx + pos[i][0], sy + pos[i][1], 34, on ? C.green : C.dim, p0, 3); txt(l, sx + pos[i][0], sy + pos[i][1] + 60, { size: 20, fam: F.mono, w: 700, align: 'center', c: on ? C.green : C.white, a: p0 }); });
  txt('any 2 keys open it', sx, sy + 260, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 3) });
  txt('perfect tensor ⟺ n odd', 1300, 280, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 5), ab: 1 });
  txt('n = 3, 5, 7, 9 ✓     n = 2, 4, 6, 8 ✗', 1300, 340, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) });
  if (p1 > 0) {
    const rx = 1300, ry = 560, R = 130;
    ring(rx, ry, R, C.cyan, P(S, 1, 0.5), 18); ring(rx, ry, R, 'rgba(0,0,0,0.6)', P(S, 1, 0.5), 2);
    for (let k = 0; k < 5; k++) { const an = t * 0.6 + k / 5 * TAU; dot(rx + Math.cos(an) * R, ry + Math.sin(an) * R, 10, k ? 'c' : 'r', P(S, 1, 1)); }
    txt('odd ring, length L', rx, ry + 6, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 1) });
    txt('hidden: gcd(n, 2^L + 1)', rx, ry + R + 60, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4), ab: 1 });
    txt('n = 3, L = 3 → gcd(3, 9) = 3', rx, ry + R + 105, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 5) });
  }
  thm('§23 · Thm 23.2 · Prop 23.3 · Thm 23.4 · quantum statements hold for the stated state and cut', W / 2, 870, P(S, 1, 7), 'center');
};

/* ---- 12 ODOMETER ---- */
SCENES.odometer = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'cond');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const n = Math.floor(t * 1.2) % 9;
  cellv(360, 220, 140, Math.floor(n / 3), C.mag, p0, 'rgba(0,0,0,0.6)', 0.5);
  cellv(510, 220, 140, n % 3, C.cyan, p0, 'rgba(0,0,0,0.6)', 0.5);
  txt('high', 430, 400, { size: 22, fam: F.mono, align: 'center', c: C.mag, a: p0 }); txt('low', 580, 400, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p0 });
  txt('= ' + n + ' (mod 9)', 505, 470, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('addition couples digits via carries', 505, 530, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: P(S, 0, 4) });
  if (p1 > 0) {
    const sp = [4, 2, 2, 1], base = 720;
    txt('drop the high digit:', 1150, 230, { size: 26, fam: F.mono, w: 700, c: C.white, a: P(S, 1, 0.3) });
    const fix = P(S, 1, 5);
    sp.forEach((v, i) => { const q = P(S, 1, 1 + i * 0.4), x = 1100 + i * 140; bar(x, base, 90, lerp(v, i < 3 ? 3 : 0, fix) * 45 * q, fix > 0.5 ? C.green : C.orange, 0.7); txt(fix > 0.5 ? (i < 3 ? '1/3' : '0') : v + '/9', x + 45, base + 35, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
    txt(fix > 0.5 ? 'carries subtracted → T₃ ⊗ T₃' : 'looks noisy', 1380, 800, { size: 30, fam: F.orb, w: 900, align: 'center', c: fix > 0.5 ? C.green : C.orange, a: P(S, 1, 2), ab: 1 });
    txt('the blur was bookkeeping', 505, 700, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7), ab: 2 });
  }
  thm('§25 carries · §28 Thm 28.2, Prop 28.3 · right panel after subtraction is schematic', W / 2, 870, P(S, 1, 7), 'center');
};

/* ---- 13 WHISPER ---- */
SCENES.whisper = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const pts = [[480, 250], [300, 560], [660, 560]];
  pts.forEach(([x, y], i) => { dot(x, y, 40, ['c', 'm', 'g'][i], p0 * 0.8); txt('x' + (i + 1), x, y + 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 }); });
  [[0, 1], [1, 2], [2, 0]].forEach(([a, b], i) => { const [x1, y1] = pts[a], [x2, y2] = pts[b]; arrow(x1 + (x2 - x1) * 0.2, y1 + (y2 - y1) * 0.2, x1 + (x2 - x1) * 0.8, y1 + (y2 - y1) * 0.8, C.white, P(S, 0, 1 + i * 0.4), 3); });
  txt('yᵢ = xᵢ + 2·xᵢ₊₁', 480, 680, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 2) });
  txt('hidden differences at precision 3, 9, 27:', 1300, 250, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) });
  [3, 9, 9].forEach((v, i) => cellv(1130 + i * 130, 290, 100, v, C.mag, P(S, 0, 5 + i * 0.6)));
  if (p1 > 0) {
    for (let r = 0; r < 4; r++) { const x = 1050 + r * 150, q = P(S, 1, 0.5 + r * 0.5); box(x, 470, 120, 110, C.dim, q, 2, 'rgba(0,0,0,0.5)'); txt('room ' + (r + 1), x + 60, 600, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); }
    const wq = P(S, 1, 2.5); txt('psst', 1110, 530, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: wq }); txt('heard!', 1410, 530, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 3.5) });
    txt('lag = 2 levels · inverse limit = 0', 1300, 660, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4.5) });
    txt('what survives: a mod-9 checksum', 1300, 730, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 6), ab: 2 });
    txt('Smith form (1, 1, 9) · (1, −2, 4)·B = (9, 0, 0)', 1300, 780, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 6.5) });
  }
  thm('§29 · Thm 29.3 · Thm 30.1 · §33–34 defect group, Prop 34.3', W / 2, 870, P(S, 1, 7), 'center');
};

/* ---- 14 CLOCK ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  const cx = 480, cy = 450, R = 190;
  ring(cx, cy, R, C.cyan, p0, 3);
  for (let k = 0; k < 12; k++) { const an = k / 12 * TAU - Math.PI / 2; dot(cx + Math.cos(an) * R, cy + Math.sin(an) * R, 7, 'c', p0); }
  const an = t * 1.3; arrow(cx, cy, cx + Math.cos(an) * R * 0.8, cy + Math.sin(an) * R * 0.8, C.gold, p0, 4);
  txt('run the rabbit rule t steps', cx, cy + R + 60, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt('mismatch = ℤ² / (Mᵗ − I)', cx, cy + R + 105, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 2) });
  const rows = [['4', '5'], ['5', '11'], ['6', '4 × 4'], ['7', '29'], ['8', '3 × 15'], ['10', '11 × 11']];
  txt('t', 1150, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 3) });
  txt('defect group', 1450, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: P(S, 0, 3) });
  rows.forEach(([a, b], i) => { const q = P(S, 0, 3.5 + i * 0.6); txt(a, 1150, 310 + i * 60, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(b, 1450, 310 + i * 60, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q }); });
  if (p1 > 0) {
    txt('every prime appears in some loop', 1300, 720, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
    txt('primes appear where the rhythm fails to close', 1300, 780, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 4) });
  }
  thm('§38 · Thm 38.1 · Smith forms recomputed', W / 2, 870, P(S, 1, 6), 'center');
};

/* ---- 15 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const rec = [['2¢ and 3¢ coins → the unit is β − α', C.cyan], ['one number forgets · two photos remember', C.mag], ['only Fibonacci keys open the lock', C.gold], ['primes = chocolate that will not snap', C.green], ['a whisper heard two rooms later', C.vio]];
    rec.forEach(([r, col], i) => txt('▸ ' + r, 470, 260 + i * 70, { size: 30, fam: F.mono, w: 700, c: col, a: P(S, 0, 0.5 + i * 1.1) * fade }));
    txt('paper theory · not yet in Lean · physics bridges open', W / 2, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 0.5) * fade });
    txt('Every number had to be earned.', W / 2, 790, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 3) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    drawTree(Tj(5), W / 2, 200, 620, 50, 34, ep * out);
    txt('FIBONACCI ATOMS', W / 2, 640, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 8 });
    txt('Fibonacci 原子关系生成 · TRURETURING FILM 022', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Two bricks, one snap, one rule.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'TWO BRICKS', rabbits: 'RABBIT RULE', recipe: 'RECIPE', coins: 'COINS', balance: 'PURSES', photos: 'TWO PHOTOS', lock: 'LOCK', zip: 'ZIP', shadows: 'SHADOWS', tools: 'TOOLBOX', safe: 'SAFE', odometer: 'ODOMETER', whisper: 'WHISPER', clock: 'LOOP CLOCK', finale: 'EARNED' });

function poster22() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawTree(Tj(6), W / 2, 260, 1300, 58, 36, 1);
  txt('两种积木，一条规则，长出整个算术', W / 2, 190, { size: 58, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FIBONACCI ATOMS', W / 2, 850, { size: 92, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 8 });
  bloom(0.65);
  txt('Fibonacci 原 子 关 系 生 成', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 022', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster22;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
