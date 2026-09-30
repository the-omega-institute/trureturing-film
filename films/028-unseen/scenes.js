/* Film 028 — FOUR WAYS TO BE UNSEEN · 一个观察者的四种看不见. */

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

/* ---- film 028 badge + helpers ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    proof: ['LEAN KERNEL · FROZEN · COUNTERMODELS RECHECKED', C.green, 'rgba(0,40,20,0.75)'],
    repo: ['REPOSITORY COUNT · SUBJECT 9e6bcf3fbe', C.cyan, 'rgba(0,25,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function chip(x, y, w, h, s, col, a, size = 24) { if (a <= 0) return; box(x - w / 2, y - h / 2, w, h, col, a, 2, 'rgba(0,0,0,0.5)'); txt(s, x, y + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function cellv(x, y, s, v, col, a, fill = 'rgba(0,0,0,0.5)', size = 0.42) { if (a <= 0) return; box(x, y, s, s, col, a, 2, fill); txt(String(v), x + s / 2, y + s * 0.5 + s * size * 0.36, { size: s * size, fam: F.mono, w: 700, align: 'center', c: col, a }); }
/* a small Lean card: title + code lines */
function card(x, y, w, lines, a, col = C.green, title = 'LEAN MODEL') {
  if (a <= 0) return;
  const h = 56 + lines.length * 40;
  box(x, y, w, h, col, a, 2, 'rgba(0,10,8,0.72)');
  txt(title, x + 20, y + 34, { size: 18, fam: F.orb, w: 900, c: col, a, ls: 3 });
  lines.forEach((s, i) => txt(s, x + 24, y + 78 + i * 40, { size: 24, fam: F.mono, w: 700, c: C.white, a: a * clamp(a * 3 - i * 0.4) }));
}
function coin(x, y, r, face, a) {
  if (a <= 0) return;
  dot(x, y, r * 1.25, face === 'H' ? 'g' : 'o', a * 0.8);
  ring(x, y, r, C.gold, a, 3);
  txt(face, x, y + r * 0.35, { size: r, fam: F.orb, w: 900, align: 'center', c: '#1a1200', a });
}
function cup(x, y, a) {
  if (a <= 0) return;
  ctx.globalAlpha = a; ctx.fillStyle = 'rgba(40,60,90,0.92)'; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x - 150, y); ctx.lineTo(x - 110, y - 210); ctx.lineTo(x + 110, y - 210); ctx.lineTo(x + 150, y); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, 150, 22, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
}
/* six-position clock partition by future-lamp word */
const CLK_N = 6;
function clkWord(x, n) { const w = []; let y = x; for (let i = 0; i <= n; i++) { w.push(y === 0 ? 1 : 0); y = (y + 1) % CLK_N; } return w.join(''); }
function clkClasses(n) { const m = {}; for (let x = 0; x < CLK_N; x++) (m[clkWord(x, n)] = m[clkWord(x, n)] || []).push(x); return Object.values(m).sort((a, b) => a[0] - b[0]); }
const CLK_COL = ['g', 'c', 'm', 'v', 'o', 'n'];

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  const reads = [['A', C.cyan], ['B', C.mag], ['C', C.gold]];
  const states = [];
  for (let i = 0; i < 12; i++) states.push({ k: i % 3, x: 360 + 140 * Math.cos(i * 2.1 + t * 0.4) + (i % 4) * 30, y: 480 + 200 * Math.sin(i * 1.3 + t * 0.3) });
  const flow = P(S, 0, 4, 3);
  const fib = P(S, 0, 9, 1);
  states.forEach((s, i) => {
    const [ , col] = reads[s.k]; const ry = 330 + s.k * 150;
    line(s.x, s.y, 1420, ry, col, flow * (fib > 0 && s.k === 1 ? 0.9 : 0.35), fib > 0 && s.k === 1 ? 2.5 : 1.2);
    dot(s.x, s.y, 22, ['c', 'm', 'g', 'v', 'o', 'n'][i % 6], sp);
  });
  box(880, 380, 200, 200, C.white, sp, 2, 'rgba(0,0,0,0.55)');
  txt('q', 980, 510, { size: 96, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp, ab: 2 });
  txt('readout', 980, 610, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: sp });
  txt('full state X', 360, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sp });
  reads.forEach(([s, col], i) => { cellv(1420, 330 + i * 150 - 45, 90, s, col, sp, 'rgba(0,0,0,0.6)', 0.5); });
  txt('what you see B', 1465, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sp });
  if (fib > 0) txt('fiber of B  = everything read as B', 1560, 505, { size: 22, fam: F.mono, w: 700, c: C.mag, a: fib });
  const q = P(S, 1, 0.3);
  if (q > 0) ['NOW', 'LATER', 'RECORD', 'WITHIN'].forEach((s, i) => chip(W / 2 + (i - 1.5) * 330, 820, 290, 60, s, [C.cyan, C.orange, C.vio, C.red][i], P(S, 1, 0.5 + i * 0.8), 26));
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  for (let i = 0; i < 4; i++) { const a = rp * (0.5 + 0.5 * Math.sin(t * 1.5 + i)); ring(W / 2, 430, 90 + i * 60, [C.cyan, C.orange, C.vio, C.red][i], a * 0.6, 2); }
  dot(W / 2, 430, 60, 'w', rp);
  txt(scramble('FOUR WAYS TO BE UNSEEN', rp, 281), W / 2, 680, { size: 84, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 8 });
  txt('一 个 观 察 者 的 四 种 看 不 见', W / 2, 755, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 028 · D5/S3/Observer', W / 2, 115, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  [['now', C.cyan], ['later', C.orange], ['on the record', C.vio], ['from within', C.red]].forEach(([s, col], i) => chip(W / 2 + (i - 1.5) * 380, 850, 340, 60, s, col, P(S, 1, 0.3 + i * 0.5), 24));
};

/* ---- 02 NOW ---- */
SCENES.now = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const sp = clamp(u / 1);
  coin(560, 560, 60, 'H', sp); coin(760, 560, 60, 'T', sp);
  txt('heads ≠ tails', 660, 700, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: sp });
  const drop = P(S, 0, 5, 1.5);
  cup(560, 620 - (1 - drop) * 380, clamp(drop * 3) * 0.95);
  cup(760, 620 - (1 - drop) * 380, clamp(drop * 3) * 0.95);
  const rq = P(S, 0, 8);
  arrow(900, 480, 1080, 480, C.white, rq, 3);
  cellv(1110, 400, 160, 'cup', C.cyan, rq, 'rgba(0,0,0,0.6)', 0.26);
  txt('same reading', 1190, 610, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: rq });
  card(1330, 300, 480, ['X = Bool', 'q := fun _ ↦ ()', 'false ≠ true', 'q false = q true'], P(S, 1, 0.5, 0.8));
  const q2 = P(S, 1, 4);
  if (q2 > 0) stamp('TYPE ⊬ SEEN', 1570, 700, q2, C.cyan, 44, -0.05);
  thm('type_existence_does_not_imply_distinguishable_existence', W / 2, 880, P(S, 1, 1), 'center');
};

/* ---- 03 LATER ---- */
SCENES.later = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const sp = clamp(u / 1);
  /* beach */
  fillBox(160, 330, 1000, 360, C.gold, sp * 0.12);
  const tide = P(S, 0, 7, 4);
  const front = 160 + tide * 1100;
  const fp = (x, y, a) => { if (a <= 0) return; ctx.globalAlpha = a; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.ellipse(x, y, 26, 44, -0.2, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 50, y - 60, 26, 44, -0.2, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; };
  fp(420, 560, sp * (front > 460 ? 0.15 : 0.9)); fp(820, 470, sp * (front > 860 ? 0.15 : 0.9));
  txt('A', 440, 640, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp }); txt('B', 840, 550, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp });
  if (tide > 0) { ctx.globalAlpha = 0.45 * sp; ctx.fillStyle = C.blue; ctx.beginPath(); ctx.moveTo(160, 330); for (let y = 330; y <= 690; y += 10) ctx.lineTo(Math.min(1160, front + 30 * Math.sin(y * 0.03 + t * 3)), y); ctx.lineTo(160, 690); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
  /* reading strip */
  const q1 = P(S, 0, 2);
  txt('readings', 1240, 330, { size: 22, fam: F.mono, w: 700, c: C.dim, a: q1 });
  for (let k = 0; k < 5; k++) {
    const a = q1 * clamp(tide * 5 - k + 1 + (k === 0 ? 1 : 0));
    cellv(1240 + k * 110, 360, 90, k === 0 ? 'A' : '·', C.cyan, a, 'rgba(0,0,0,0.6)', 0.45);
    cellv(1240 + k * 110, 470, 90, k === 0 ? 'B' : '·', C.mag, a, 'rgba(0,0,0,0.6)', 0.45);
    txt('t=' + k, 1285 + k * 110, 590, { size: 18, fam: F.mono, align: 'center', c: C.dim, a });
  }
  card(1240, 640, 560, ['q := id', 'T := fun _ ↦ false', '∀ k, q(Tᵏ⁺¹ A) = q(Tᵏ⁺¹ B)'], P(S, 1, 0.5, 0.8));
  const q2 = P(S, 1, 5);
  if (q2 > 0) stamp('SEEN ⊬ CAUSAL', 660, 800, q2, C.orange, 44, -0.05);
  thm('distinguishable_existence_does_not_imply_causal_existence', W / 2, 880, P(S, 1, 1), 'center');
};

/* ---- 04 MEMORY (clock with one lamp) ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const sp = clamp(u / 1);
  const cx = 480, cy = 500, R = 220;
  const steps = Math.min(4, Math.floor(P(S, 1, 0.5, 9) * 4.999));
  const cls = clkClasses(steps);
  const colOf = x => CLK_COL[cls.findIndex(c => c.includes(x))];
  ring(cx, cy, R, C.dim, sp, 2);
  const hand = (t * 0.6) % CLK_N;
  for (let x = 0; x < CLK_N; x++) {
    const ang = -Math.PI / 2 + x * TAU / CLK_N, px = cx + R * Math.cos(ang), py = cy + R * Math.sin(ang);
    dot(px, py, 34, u < lineAt(S, 1).s ? (x === 0 ? 'g' : 'w') : colOf(x), sp);
    txt(x === 0 ? '12' : String(x * 2), px, py + 9, { size: 24, fam: F.mono, w: 700, align: 'center', c: '#111', a: sp });
  }
  const ha = -Math.PI / 2 + hand * TAU / CLK_N; line(cx, cy, cx + (R - 60) * Math.cos(ha), cy + (R - 60) * Math.sin(ha), C.white, sp, 4);
  dot(cx, cy - R - 80, 28, Math.floor(hand) === 0 ? 'g' : 'w', sp * (Math.floor(hand) === 0 ? 1 : 0.3));
  txt('lamp', cx + 50, cy - R - 72, { size: 20, fam: F.mono, c: C.dim, a: sp });
  txt('lamp on / lamp off', cx, cy + R + 70, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 7) * (1 - at(S, 1, 0.6)) });
  /* refinement tower */
  const q = P(S, 1, 0.3);
  if (q > 0) {
    for (let n = 0; n <= steps; n++) {
      const cs = clkClasses(n), y = 200 + n * 92;
      txt('K' + n, 900, y + 45, { size: 26, fam: F.mono, w: 700, c: C.white, a: q });
      let x0 = 970;
      cs.forEach(c => { box(x0, y, c.length * 78 + 10, 72, C.cyan, q, 1.5, 'rgba(0,0,0,0.4)'); c.forEach((s, j) => { dot(x0 + 44 + j * 78, y + 36, 26, CLK_COL[cs.indexOf(c)], q); txt(s === 0 ? '12' : String(s * 2), x0 + 44 + j * 78, y + 44, { size: 18, fam: F.mono, w: 700, align: 'center', c: '#111', a: q }); }); x0 += c.length * 78 + 24; });
      txt(cs.length + ' classes', 1790, y + 45, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: q });
    }
    const q3 = P(S, 1, 10);
    if (q3 > 0) { chip(1360, 690, 640, 56, '4 splits = 6 states − 2 readings', C.gold, q3, 24); }
  }
  thm('finite_state_has_stable_depth · one_step_stability_is_permanent · behavior_completion_is_least_stable_refinement', W / 2, 880, P(S, 1, 12), 'center');
};

/* ---- 05 RECORD ---- */
SCENES.record = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const sp = clamp(u / 1);
  /* two streams */
  [[C.cyan, 420, 'c'], [C.mag, 600, 'm']].forEach(([col, y0, pn], k) => {
    ctx.globalAlpha = sp * 0.7; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath();
    for (let x = 160; x <= 1150; x += 8) { const y = y0 + 40 * Math.sin(x * 0.012 + k * 1.7 - t * 1.2); x === 160 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.globalAlpha = 1;
    for (let i = 0; i < 9; i++) { const x = 160 + ((i * 110 + t * 90) % 990); dot(x, y0 + 40 * Math.sin(x * 0.012 + k * 1.7 - t * 1.2), 12, pn, sp); }
  });
  txt('state A keeps flowing one way', 160, 350, { size: 22, fam: F.mono, c: C.cyan, a: sp });
  txt('state B keeps flowing another', 160, 690, { size: 22, fam: F.mono, c: C.mag, a: sp });
  /* logbook */
  const lb = P(S, 0, 6);
  box(1250, 280, 460, 420, C.white, lb, 2, 'rgba(230,240,255,0.06)');
  txt('LOGBOOK', 1480, 330, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: lb, ls: 4 });
  for (let i = 0; i < 7; i++) line(1290, 380 + i * 42, 1670, 380 + i * 42, C.dim, lb * 0.5, 1);
  txt('record(x) = ·', 1480, 670, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: lb });
  card(160, 740, 820, ['T := id   q := id   record := fun _ ↦ ()'], P(S, 1, 0.5, 0.8));
  const q2 = P(S, 1, 5);
  if (q2 > 0) stamp('CAUSAL ⊬ RECORDED', 1480, 800, q2, C.vio, 40, -0.05);
  thm('causal_existence_does_not_imply_record_existence', W / 2, 880, P(S, 1, 1), 'center');
};

/* ---- 06 LADDER ---- */
SCENES.ladder = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const rungs = [['TYPE', 'x ≠ y', C.white], ['DISTINGUISHABLE', 'q x ≠ q y', C.cyan], ['CAUSAL', '∃ k, q(Tᵏ⁺¹x) ≠ q(Tᵏ⁺¹y)', C.orange], ['RECORDED', 'r x ≠ r y ∧ r ∘ T = r', C.vio]];
  const x0 = 520, x1 = 1400;
  line(x0, 230, x0, 800, C.dim, clamp(u), 4); line(x1, 230, x1, 800, C.dim, clamp(u), 4);
  rungs.forEach(([a, b, col], i) => {
    const y = 760 - i * 170, q = P(S, 0, 1 + i * 2.2, 0.8);
    line(x0, y, x1, y, col, q, 6);
    txt(a, (x0 + x1) / 2, y - 22, { size: 32, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 4 });
    txt(b, (x0 + x1) / 2, y + 40, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q * 0.85 });
  });
  const gaps = [['cup over two coins', C.cyan], ['footprints under the tide', C.orange], ['a blank logbook', C.vio]];
  gaps.forEach(([s, col], i) => { const y = 760 - i * 170 - 85, q = P(S, 1, 0.5 + i * 1.5); if (q <= 0) return; txt('✗', 440, y + 14, { size: 44, fam: F.mono, w: 900, align: 'center', c: C.red, a: q }); txt(s, 1440, y + 8, { size: 22, fam: F.mono, w: 700, c: col, a: q }); txt('two-state counterexample', 1440, y + 38, { size: 17, fam: F.mono, c: C.dim, a: q }); });
  thm('ExistenceLayersDoNotImply · three frozen non-implications', W / 2, 880, P(S, 1, 1), 'center');
};

/* ---- 07 CLASSICAL ---- */
SCENES.classical = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const q0 = P(S, 0, 4, 0.8);
  const mat = (x, y, vals, name, col, a) => { if (a <= 0) return; box(x, y, 220, 220, col, a, 2, 'rgba(0,0,0,0.5)'); vals.forEach((r, i) => r.forEach((v, j) => txt(v, x + 55 + j * 110, y + 72 + i * 110, { size: 44, fam: F.mono, w: 700, align: 'center', c: v === '0' ? C.dim : col, a }))); txt(name, x + 110, y - 18, { size: 26, fam: F.orb, w: 900, align: 'center', c: col, a }); };
  mat(220, 280, [['1', '0'], ['0', '−1']], 'CLOCK Z', C.cyan, q0);
  mat(560, 280, [['0', '1'], ['1', '0']], 'SHIFT X', C.mag, P(S, 0, 5, 0.8));
  const q1 = P(S, 0, 9);
  txt('Z·X = − X·Z', 505, 600, { size: 46, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q1, ab: 1 });
  txt('numbers:  z·x = x·z', 505, 670, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.3) });
  txt('⇒ no character  M₂(ℂ) → ℂ', 505, 725, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 1.5) });
  /* CHSH bars */
  const qb = P(S, 1, 4, 1.5);
  if (qb > 0) {
    const base = 760, sc = 150;
    fillBox(1150, base - 2 * sc * qb, 160, 2 * sc * qb, C.orange, 0.8); txt('any table', 1230, base + 40, { size: 22, fam: F.mono, align: 'center', c: C.orange, a: qb }); txt('2', 1230, base - 2 * sc * qb - 16, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: qb });
    fillBox(1450, base - 2.828 * sc * qb, 160, 2.828 * sc * qb, C.cyan, 0.8); txt('Bell state', 1530, base + 40, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: qb }); txt('2√2 ≈ 2.83', 1530, base - 2.828 * sc * qb - 16, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: qb });
    line(1120, base - 2 * sc, 1650, base - 2 * sc, C.orange, qb * 0.8, 2);
    txt('CHSH', 1390, 280, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.white, a: qb });
  }
  const q3 = P(S, 1, 9);
  if (q3 > 0) stamp('NO ANSWER TABLE', 505, 815, q3, C.red, 40, -0.04);
  thm('window_algebra_has_no_character · noncontextual_and_local_double_exclusion', W / 2, 880, P(S, 1, 2), 'center');
};

/* ---- 08 SELF ---- */
const SELF_N = 6;
const SELF_T = (() => { const m = []; for (let i = 0; i < SELF_N; i++) { m.push([]); for (let j = 0; j < SELF_N; j++) m[i].push(rnd(i + 3, j + 11) > 0.5 ? 1 : 0); } return m; })();
SCENES.self = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const q0 = clamp(u / 1) * (1 - P(S, 1, 0, 1) * 0.55);
  const bx = 500, by = 480, R = 200;
  bloch(bx, by, R, t, q0, 'w');
  [['Z', 0, -1, C.cyan], ['X', 1, 0, C.mag], ['Y', 0.55, 0.45, C.gold]].forEach(([s, dx, dy, col], i) => {
    const a = q0 * P(S, 0, 2 + i * 1.2);
    arrow(bx - dx * R * 1.15, by - dy * R * 1.15, bx + dx * R * 1.15, by + dy * R * 1.15, col, a, 3);
    txt(s, bx + dx * R * 1.3, by + dy * R * 1.3 + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a });
  });
  const inj = P(S, 0, 7);
  if (inj > 0) chip(bx, 780, 560, 60, 'readings → state : injective ✓', C.green, inj * (0.45 + 0.55 * q0), 24);
  /* self-evaluation table */
  const q = P(S, 1, 0.5, 0.8);
  if (q > 0) {
    const cs = 64, x0 = 1000, y0 = 250;
    txt('evaluation(a, b)', x0 + cs * 3, y0 - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
    for (let i = 0; i < SELF_N; i++) for (let j = 0; j < SELF_N; j++) {
      const diag = i === j && P(S, 1, 3) > 0;
      cellv(x0 + j * cs, y0 + i * cs, cs - 6, SELF_T[i][j], diag ? C.red : C.cyan, q * clamp(q * 3 - (i + j) * 0.1), 'rgba(0,0,0,0.55)', 0.5);
    }
    const qd = P(S, 1, 5, 0.8);
    txt('flip diagonal', x0 - 20, y0 + SELF_N * cs + 60, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.red, a: qd });
    for (let j = 0; j < SELF_N; j++) cellv(x0 + j * cs, y0 + SELF_N * cs + 25, cs - 6, 1 - SELF_T[j][j], C.gold, qd, 'rgba(40,20,0,0.7)', 0.5);
    /* compare with each row: mismatch marker */
    const scan = P(S, 1, 7, 4) * SELF_N;
    for (let i = 0; i < SELF_N; i++) { const a = clamp(scan - i); if (a <= 0) continue; txt('✗ at ' + (i + 1), x0 + SELF_N * cs + 20, y0 + i * cs + 40, { size: 20, fam: F.mono, w: 700, c: C.red, a }); }
    if (scan >= SELF_N) stamp('NOT A ROW', x0 + cs * 3, y0 + SELF_N * cs + 150, clamp(scan - SELF_N), C.red, 38, -0.04);
  }
  thm('empirical_complete_reflexive_incomplete · qubit_empirical_image_reflexive_gap', W / 2, 880, P(S, 1, 1), 'center');
};

/* ---- 09 FOUR ---- */
SCENES.four = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'proof');
  const items = [['NOW', 'the reading merges it', C.cyan], ['LATER', 'the dynamics erases it', C.orange], ['RECORD', 'nothing stable writes it', C.vio], ['WITHIN', 'no self-description is complete', C.red]];
  items.forEach(([a, b, col], i) => {
    const x = 270 + i * 460, q = P(S, 0, 0.8 + i * 2.2, 0.8);
    box(x - 200, 250, 400, 320, col, q, 2, 'rgba(0,0,0,0.5)');
    txt(a, x, 310, { size: 36, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 4 });
    txt(b, x, 530, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    if (i === 0) { coin(x - 50, 430, 34, 'H', q * 0.6); coin(x + 50, 430, 34, 'T', q * 0.6); }
    if (i === 1) { ctx.globalAlpha = q; ctx.strokeStyle = C.blue; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const xx = x - 150 + k * 5, yy = 430 + 30 * Math.sin(k * 0.3 - t * 3); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.globalAlpha = 1; }
    if (i === 2) { box(x - 70, 360, 140, 150, C.white, q * 0.8, 2); for (let k = 0; k < 4; k++) line(x - 55, 390 + k * 28, x + 55, 390 + k * 28, C.dim, q * 0.5, 1); }
    if (i === 3) { for (let a2 = 0; a2 < 4; a2++) for (let b2 = 0; b2 < 4; b2++) fillBox(x - 80 + b2 * 40, 350 + a2 * 40, 34, 34, a2 === b2 ? C.red : C.cyan, q * (a2 === b2 ? 0.9 : 0.3)); }
  });
  const q = P(S, 1, 0.3);
  if (q > 0) {
    arrow(730, 680, 730, 600, C.green, q, 3);
    chip(730, 720, 620, 56, 'hidden memory → least memory repairs it', C.green, q, 21);
    chip(1650, 720, 420, 56, 'within: no repair, ∀ table', C.red, P(S, 1, 5), 21);
  }
  thm('four separations, each a frozen Lean theorem', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 10 LIBRARY ---- */
SCENES.library = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'repo');
  const cols = 48, s = 17, x0 = W / 2 - cols * s / 2 - 330, y0 = 230;
  const grow = P(S, 0, 0.5, 6) * 632;
  for (let i = 0; i < 632; i++) { if (i > grow) break; const r = Math.floor(i / cols), c = i % cols; fillBox(x0 + c * s, y0 + r * s, s - 3, s - 3, i < 628 ? C.green : C.dim, i < 628 ? 0.75 : 0.9); }
  const q = P(S, 0, 3);
  [['632', 'Lean files', C.white], ['101,018', 'lines', C.cyan], ['628', 'frozen', C.green]].forEach(([a, b, col], i) => { txt(a, 1500, 300 + i * 120, { size: 60, fam: F.orb, w: 900, align: 'center', c: col, a: P(S, 0, 3 + i) }); txt(b, 1500, 340 + i * 120, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3 + i) }); });
  const q1 = P(S, 1, 0.3);
  if (q1 > 0) [['control theory', 'observability'], ['automata', 'minimization'], ['quantum foundations', 'Bell · Kochen–Specker'], ['logic', 'the diagonal']].forEach(([a, b], i) => { const x = 270 + i * 460, qq = P(S, 1, 0.5 + i * 0.8); box(x - 200, 690, 400, 110, C.gold, qq, 1.5, 'rgba(0,0,0,0.5)'); txt(a, x, 735, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.gold, a: qq }); txt(b, x, 775, { size: 20, fam: F.mono, align: 'center', c: C.white, a: qq }); });
  thm('D5/S3/Observer + D5/S3/ObserverMemory · state files under Golden/Frozen/state', W / 2, 880, P(S, 0, 2), 'center');
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const items = [['cup', C.cyan], ['tide', C.orange], ['logbook', C.vio], ['diagonal', C.red]];
    items.forEach(([s, col], i) => { const x = 360 + i * 400, q = P(S, 0, 0.5 + i * 1.3) * fade; ring(x, 420, 110, col, q, 3); dot(x, 420, 40, ['c', 'o', 'v', 'r'][i], q); txt(s, x, 580, { size: 28, fam: F.orb, w: 900, align: 'center', c: col, a: q }); });
    txt('to observe is to choose what to merge', W / 2, 700, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    for (let i = 0; i < 4; i++) ring(W / 2, 420, 90 + i * 60, [C.cyan, C.orange, C.vio, C.red][i], ep * out * 0.6, 2);
    dot(W / 2, 420, 60, 'w', ep * out);
    txt('FOUR WAYS TO BE UNSEEN', W / 2, 660, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 8 });
    txt('一个观察者的四种看不见 · TRURETURING FILM 028', W / 2, 730, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Now, later, on the record, from within.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'READOUT', now: 'NOW', later: 'LATER', memory: 'HIDDEN MEMORY', record: 'RECORD', ladder: 'LADDER', classical: 'ANSWER TABLE', self: 'WITHIN', four: 'FOUR', library: 'LIBRARY', finale: 'LEDGER' });

function poster28() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  for (let i = 0; i < 4; i++) ring(W / 2, 520, 110 + i * 70, [C.cyan, C.orange, C.vio, C.red][i], 0.8, 3);
  dot(W / 2, 520, 80, 'w', 1);
  txt('一个观察者的四种看不见', W / 2, 190, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FOUR WAYS TO BE UNSEEN', W / 2, 870, { size: 86, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 8 });
  bloom(0.65);
  txt('此 刻 · 以 后 · 记 录 · 内 部 · 冻 结 的 Lean 定 理', W / 2, 945, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 028', W / 2, 1000, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster28;
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
