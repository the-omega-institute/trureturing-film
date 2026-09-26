/* Film 004 — FIXED POINT · 不动点. Philosophy in theorems. Scenes injected into the shared engine. */

function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['PHILOSOPHY VOLUME · ARGUED, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    reading: ['STRUCTURAL READING · NOT A CLAIM ABOUT ORIGINAL MEANING', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function thm(name, x, y, a, align = 'left') { txt(name, x, y, { size: 18, fam: F.mono, c: C.dim, a, align }); }
function goldFrame(cx, cy, s, a, t) {
  const L = [[s, 0, 'x'], [0, -s, 'y']];
  ctx.globalCompositeOperation = 'lighter';
  for (const [dx, dy] of L) { line(cx - dx, cy - dy, cx + dx, cy + dy, C.gold, a, 4); }
  ctx.globalCompositeOperation = 'source-over';
  dot(cx, cy, 30 + 6 * Math.sin(t * 4), 'g', a);
  ctx.globalAlpha = a * 0.7; ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, s * 0.45, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.2);
  const planes = [[0, 4, t * 0.6], [1, 3, t * 0.45], [2, 4, t * 0.33], [3, 4, t * 0.5], [0, 1, t * 0.2]];
  for (let k = 3; k >= 1; k--) { const tt = t - k * 0.12; drawHyper(CUBE5, [[0, 4, tt * 0.6], [1, 3, tt * 0.45], [2, 4, tt * 0.33], [3, 4, tt * 0.5]], { scale: 1.9, rx: 0.3, ry: tt * 0.2, a: 0.1 * sp, dots: false, lw: 2, camZ: 7 }); }
  drawHyper(CUBE5, planes, { scale: 1.9, rx: 0.3, ry: t * 0.2, a: 0.6 * sp, lw: 1.5, camZ: 7 });
  const fp = clamp((u - 2) / 1.2);
  goldFrame(W / 2, H / 2, 260, fp, t);
  txt('EVERYTHING TRANSFORMS', W / 2, 200, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: sp * (1 - at(S, 0, 0.5)), ls: 8 });
  txt(scramble('WHAT STAYS THE SAME?', at(S, 0, 1.2), 7), W / 2, 200, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 0, 0.5) * (1 - at(S, 1, 0.5)), ab: 3, ls: 4 });
  const yp = at(S, 1, 0.6);
  txt('2,500 years of the question', W / 2, 200, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.gold, a: yp * (1 - at(S, 1, 0.5, 5)), ls: 4 });
  txt('THEOREMS  ·  AND WHERE THEY STOP', W / 2, 200, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 1, 0.5, 5), ab: 2, ls: 4 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const planes = [[0, 5, t * 0.19], [1, 4, t * 0.15], [2, 5, t * 0.12], [3, 4, t * 0.17]];
  drawHyper(CUBE6, planes, { scale: 1.7, rx: 0.3, ry: t * 0.06, a: 0.25, dots: false, lw: 1, camZ: 7.5 });
  goldFrame(W / 2, 330, 150, clamp(u / 1), t);
  grid(t, 0.5, H * 0.68, C.gold, 0.3);
  const rp = clamp(u / 1.4);
  txt(scramble('FIXED POINT', rp, 41), W / 2, 580, { size: 130, fam: F.orb, w: 900, align: 'center', c: '#fff8e8', ab: 6, ls: 16 });
  txt('不 动 点', W / 2, 670, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 3 });
  txt('TRURETURING · FILM 004 · A PHILOSOPHY IN THEOREMS', W / 2, 730, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - 1.2) / 0.8), ls: 6 });
  const cp = at(S, 1, 0.6);
  ['GEOMETRY', 'TRUTH', 'JUSTICE', 'BEAUTY'].forEach((s, i) => {
    const p = clamp((u - lineAt(S, 1).s - 1 - i * 0.9) / 0.4) * cp; const x = 330 + i * 420;
    txt(s, x, 820, { size: 34, fam: F.orb, w: 900, align: 'center', c: [C.cyan, C.white, C.mag, C.gold][i], a: p, ls: 4 });
    if (i < 3) txt('→', x + 210, 820, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.dim, a: p });
  });
  txt('GICT · Theorem 7.3', W / 2, 200, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: at(S, 0, 0.6) });
};

/* ---- 02 CONCEPT ---- */
SCENES.concept = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8), 'lean');
  const sort = ease(clamp((u - L[0].s - 2) / 4));
  const bins = 6;
  for (let k = 0; k < 72; k++) {
    const b = k % bins; const j = Math.floor(k / bins);
    const x0 = 200 + rnd(k, 1) * 900, y0 = 200 + rnd(k, 2) * 520;
    const x1 = 260 + b * 150, y1 = 690 - j * 42;
    const x = lerp(x0, x1, sort), y = lerp(y0, y1, sort);
    dot(x, y, 12, ['c', 'm', 'g', 'n', 'v', 'o'][b], at(S, 0, 0.6));
  }
  const fp = at(S, 1, 0.6) * (1 - at(S, 2, 0.6));
  for (let b = 0; b < bins; b++) { line(260 + b * 150, 720, 260 + b * 150, 180, C.dim, fp * 0.6, 1.2); txt(`fiber ${b + 1}`, 260 + b * 150, 760, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: fp }); }
  txt('concept  =  q : X → B', 1500, 300, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6, 1.5) });
  txt('a map that sorts, not a word', 1500, 350, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.cyan, a: at(S, 0, 0.6, 2.5) });
  txt('X  ≃  Σ fibers', 1500, 470, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.gold, a: fp, ab: 2 });
  thm('concept_fiber_decomposition', 1500, 520, fp, 'center');
  const ep = at(S, 2, 0.6);
  if (ep > 0) {
    ctx.globalAlpha = ep * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 160, W, 700); ctx.globalAlpha = 1;
    ['DEFINABLE', 'CONSTRUCTED', 'HAS A MODEL', 'REALIZED'].forEach((s, i) => {
      const p = clamp((u - L[2].s - 3 - i * 1.2) / 0.5) * ep; const x = 260 + i * 470;
      box(x - 180, 360, 360, 160, [C.cyan, C.gold, C.mag, C.green][i], p, 2.5, 'rgba(4,10,24,0.7)');
      txt(s, x, 455, { size: 30, fam: F.orb, w: 900, align: 'center', c: [C.cyan, C.gold, C.mag, C.green][i], a: p, ls: 2 });
      if (i < 3) { line(x + 235, 330, x + 235, 550, C.red, p, 4); }
    });
    txt('defining a concept does not make its object exist', W / 2, 640, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: ep });
    thm('mathematical_existence_notions_separate', W / 2, 690, ep, 'center');
  }
};

/* ---- 03 DIALECTIC ---- */
SCENES.dialectic = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8), 'lean');
  // two states merged now, futures diverge
  const x0 = 360, y0 = 500;
  const div = ease(clamp((u - L[0].s - 2) / 3));
  dot(x0, y0 - 14 * div, 30, 'c', 1); dot(x0, y0 + 14 * div, 30, 'm', 1);
  txt('NOW: same reading', x0, y0 - 90, { size: 22, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: 1 });
  ctx.globalCompositeOperation = 'lighter';
  for (const [sg, col] of [[-1, C.cyan], [1, C.mag]]) { ctx.globalAlpha = div; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0 + 200, y0, x0 + 300, y0 + sg * 200, x0 + 520, y0 + sg * 240); ctx.stroke(); }
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  dot(x0 + 520, y0 - 240, 26, 'c', div); dot(x0 + 520, y0 + 240, 26, 'm', div);
  txt('FUTURES DIFFER', x0 + 120, y0 + 330, { size: 26, fam: F.orb, w: 700, c: C.red, a: div, ls: 3 });
  const np = at(S, 1, 0.5);
  if (np > 0) {
    txt('¬  is not  P ∧ ¬P', 1450, 300, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.white, a: np });
    txt('it is a claim of closure, broken by a witness', 1450, 360, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.red, a: np });
  }
  const rp = at(S, 2, 0.6);
  if (rp > 0) {
    const st = [['AFFIRMATION', 'concept C', C.cyan], ['NEGATION', 'carry witness', C.red], ['SUBLATION', 'C ∨ (target ∘ future)', C.gold]];
    st.forEach(([a, b, col], i) => {
      const p = clamp((u - L[2].s - 5 - i * 1.4) / 0.5) * rp; const y = 520 + i * 110;
      box(1100, y - 50, 700, 90, col, p, 2, 'rgba(4,10,24,0.7)');
      txt(a, 1130, y + 2, { size: 28, fam: F.orb, w: 900, c: col, a: p, ls: 3 });
      txt(b, 1770, y + 2, { size: 22, fam: F.mono, align: 'right', c: C.white, a: p });
    });
    txt('least repair keeping every old distinction', 1450, 870 - 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: rp });
    thm('minimal_dialectical_repair', 1450, 870, rp, 'center');
  }
};

/* ---- 04 IDENTITY ---- */
SCENES.identity = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8), 'lean');
  const mp = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (mp > 0) {
    const x = 480, y = 520;
    dot(x, y, 50, 'w', mp); txt('YOU', x, y - 70, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: mp, ls: 4 });
    const br = ease(clamp((u - L[0].s - 2) / 2.5));
    for (const sg of [-1, 1]) {
      const ex = x + 520 * br, ey = y + sg * 220 * br;
      ctx.globalAlpha = mp; ctx.strokeStyle = sg < 0 ? C.cyan : C.mag; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 260 * br, y, ex, ey); ctx.stroke(); ctx.globalAlpha = 1;
      dot(ex, ey, 40, sg < 0 ? 'c' : 'm', mp * br);
      for (let k = 0; k < 6; k++) { const ph = (t * 0.8 + k / 6) % 1; dot(lerp(x, ex, ph), lerp(y, ey, ph * ph), 6, 'g', mp * br); }
    }
    txt('memory copied to both', x + 520, y + 10, { size: 22, fam: F.mono, c: C.gold, a: mp * br });
    stamp('INHERITANCE ≠ IDENTITY', 1450, 780, clamp((u - L[0].s - 5.5) / 0.4) * mp, C.red, 30, -0.04);
    thm('branching_memory_is_not_equality', 1450, 860, mp, 'center');
  }
  const ip = at(S, 1, 0.6);
  if (ip > 0) {
    box(760, 200, 400, 160, C.white, ip, 2, 'rgba(10,14,30,0.8)');
    txt('same text', 960, 265, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: ip });
    txt('same rule', 960, 315, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: ip });
    const rd = [['reader A', C.cyan, 420], ['reader B', C.mag, 960], ['reader C', C.gold, 1500]];
    rd.forEach(([n, col, x], i) => {
      const p = clamp((u - L[1].s - 2 - i * 1.5) / 0.6) * ip;
      ctx.globalAlpha = p * 0.8; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let s = 0; s <= 80; s++) { const r = 120 * (1 - s / 80); const an = s / 80 * TAU * 3 + i; const px = x + Math.cos(an) * r, py = 640 + Math.sin(an) * r * 0.6; s ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke(); ctx.globalAlpha = 1;
      dot(x, 640, 24, ['c', 'm', 'g'][i], p);
      txt(n, x, 480, { size: 24, fam: F.orb, w: 700, align: 'center', c: col, a: p });
      txt(`meaning ${String.fromCharCode(945 + i)}`, x, 790, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: p });
    });
    thm('context_parameters_can_select_distinct_fixed_points', W / 2, 860, ip, 'center');
  }
};

/* ---- 05 DIALOGUE ---- */
SCENES.dialogue = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8) * (1 - at(S, 2, 0.4)), 'lean');
  badge(at(S, 2, 0.4), 'theory');
  const dp = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (dp > 0) {
    box(W / 2 - 200, 200, 400, 110, C.white, dp, 2, 'rgba(10,14,30,0.8)');
    txt('THE SAME FACTS', W / 2, 270, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.white, a: dp, ls: 3 });
    [[-1, 'rule A', C.cyan, 'YES'], [1, 'rule B', C.mag, 'NO']].forEach(([sg, r, col, d]) => {
      const x = W / 2 + sg * 460;
      line(W / 2, 310, x, 420, C.white, dp * 0.6, 2);
      box(x - 150, 420, 300, 90, col, dp, 2);
      txt(r, x, 478, { size: 30, fam: F.orb, w: 700, align: 'center', c: col, a: dp });
      const q = clamp((u - L[0].s - 6) / 0.5) * dp;
      txt(d, x, 640, { size: 90, fam: F.orb, w: 900, align: 'center', c: col, a: q, ab: 3 });
    });
    txt('complete information · norms still divided', W / 2, 780, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.gold, a: clamp((u - L[0].s - 8) / 0.5) * dp });
    thm('complete_information_permits_normative_divergence · common_rule_information_convergence', W / 2, 830, dp, 'center');
  }
  const ep = at(S, 1, 0.5) * (1 - at(S, 2, 0.5));
  if (ep > 0) {
    const cx = 760, cy = 520;
    dot(cx, cy, 36, 'o', ep);
    for (let k = 0; k < 7; k++) { const r = ((t * 120 + k * 60) % 420); ctx.globalAlpha = ep * (1 - r / 420) * 0.7; ctx.strokeStyle = C.orange; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, -1.2, 1.2); ctx.stroke(); }
    ctx.globalAlpha = 1;
    for (let k = 0; k < 10; k++) { const an = -1 + k * 0.22; dot(cx + Math.cos(an) * 360, cy + Math.sin(an) * 360, 14, 'o', ep); }
    // blind region
    ctx.globalAlpha = ep * 0.8; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, 460, 2.2, 4.1); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    txt('what the source cannot see', cx - 330, cy + 10, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: ep });
    txt('ECHO CHAMBER', 1450, 400, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.orange, a: ep, ab: 2, ls: 4 });
    txt('repetition never resolves', 1450, 470, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: ep });
    txt("a single source's blind spot", 1450, 510, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: ep });
    thm('common_source_repetition_cannot_resolve_blind_target', 1450, 570, ep, 'center');
  }
  const ap = at(S, 2, 0.5);
  if (ap > 0) {
    box(460, 300, 1000, 380, C.cyan, ap, 2, 'rgba(4,10,24,0.7)');
    txt('INSIDE THE CLASSIFICATION', 960, 350, { size: 22, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: ap, ls: 4 });
    for (let k = 0; k < 5; k++) { const x = 600 + k * 180; dot(x, 500, 34, 'c', ap); dot(x + 20 + 10 * Math.sin(t * 2 + k), 500, 34, 'c', ap * 0.0); }
    txt('audit: all consistent ✓', 960, 620, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: ap });
    for (let k = 0; k < 5; k++) dot(1600 + (k % 2) * 60, 360 + k * 70, 14, 'r', ap * (0.5 + 0.5 * Math.sin(t * 3 + k)));
    txt('deleted differences', 1630, 740, { size: 20, fam: F.mono, align: 'center', c: C.red, a: ap });
    txt('the audit cannot find what the classification deleted', 960, 800, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: ap });
  }
};

/* ---- 06 JUSTICE ---- */
SCENES.justice = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8), 'lean');
  const jp = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (jp > 0) {
    const cx = 700, cy = 500, n = 6;
    for (let i = 0; i < n; i++) {
      const an = i / n * TAU - Math.PI / 2 + t * 0.1;
      const x = cx + Math.cos(an) * 260, y = cy + Math.sin(an) * 260;
      line(cx, cy, x, y, C.dim, jp * 0.6, 2); dot(x, y, 30, 'w', jp);
    }
    dot(cx, cy, 44, 'r', jp); txt('EVENT', cx, cy + 90, { size: 20, fam: F.orb, w: 700, align: 'center', c: C.red, a: jp });
    // pie shares
    const px = 1400, py = 500, R = 170;
    const fill = clamp((u - L[0].s - 5) / 1.5);
    for (let i = 0; i < n; i++) { ctx.globalAlpha = jp * fill * 0.85; ctx.fillStyle = [C.cyan, C.mag, C.gold, C.green, C.vio, C.orange][i]; ctx.beginPath(); ctx.moveTo(px, py); ctx.arc(px, py, R, i / n * TAU, (i + 1) / n * TAU - 0.04); ctx.closePath(); ctx.fill(); }
    ctx.globalAlpha = 1;
    txt('each share = 1/n', px, py + R + 60, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: jp * fill });
    txt('no fair single culprit', px, py - R - 40, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.red, a: jp });
    thm('symmetric_event_admits_no_equivariant_culprit · symmetric_responsibility_is_uniform', W / 2, 860, jp, 'center');
  }
  const pp = at(S, 1, 0.5) * (1 - at(S, 2, 0.5));
  if (pp > 0) {
    const steps = ['NOTICE', 'HEARING', 'EVIDENCE', 'RULING'];
    steps.forEach((s, i) => { const x = 250 + i * 330; box(x, 300, 260, 90, C.green, pp, 2); txt(s + ' ✓', x + 130, 356, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.green, a: pp }); if (i < 3) txt('→', x + 295, 356, { size: 30, fam: F.orb, align: 'center', c: C.dim, a: pp }); });
    txt('OUTCOME ✗', 1600, 356, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.red, a: clamp((u - L[1].s - 2) / 0.5) * pp });
    thm('procedural_completeness_permits_wrong_outcome', 960, 440, pp, 'center');
    txt('explainable', 700, 620, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: clamp((u - L[1].s - 4.5) / 0.5) * pp });
    txt('≠', 960, 620, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.white, a: clamp((u - L[1].s - 5.5) / 0.5) * pp });
    txt('contestable', 1220, 620, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.mag, a: clamp((u - L[1].s - 5.5) / 0.5) * pp });
    thm('explainable_not_contestable', 960, 680, pp, 'center');
  }
  const vp = at(S, 2, 0.5);
  if (vp > 0) {
    const sw = ease(((u - L[2].s) / 3) % 1);
    const roles = ['A', 'B', 'C'];
    roles.forEach((r, i) => { const an = (i + sw) / 3 * TAU - Math.PI / 2; const x = 620 + Math.cos(an) * 170, y = 500 + Math.sin(an) * 170; dot(x, y, 38, ['c', 'm', 'g'][i], vp); txt(r, x, y + 12, { size: 30, fam: F.orb, w: 900, align: 'center', c: '#02030a', a: vp }); });
    txt('UNIVERSAL VALUE', 620, 760, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.green, a: vp, ls: 3 });
    txt('survives any role swap ✓', 620, 800, { size: 24, fam: F.mono, align: 'center', c: C.green, a: vp });
    dot(1320, 500, 60, 'g', vp); txt('★ privilege: "only A"', 1320, 620, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: vp });
    stamp('NOT UNIVERSAL', 1320, 740, clamp((u - L[2].s - 5) / 0.4), C.red, 38, -0.04);
    thm('named_privilege_is_not_universal', 960, 870, vp, 'center');
  }
};

/* ---- 07 FREEDOM ---- */
SCENES.freedom = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8) * (1 - at(S, 2, 0.4)), 'lean');
  badge(at(S, 2, 0.4), 'theory');
  const dp = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (dp > 0) {
    // determined line vs branching tree
    line(200, 360, 900, 360, C.cyan, dp, 4); dot(200, 360, 22, 'c', dp); dot(900, 360, 22, 'c', dp);
    txt('total function of the present', 550, 320, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: dp });
    const tree = (x, y, d, an, len) => { if (d === 0) return; const ex = x + Math.cos(an) * len, ey = y + Math.sin(an) * len; line(x, y, ex, ey, C.mag, dp * 0.8, 2.5); tree(ex, ey, d - 1, an - 0.4, len * 0.72); tree(ex, ey, d - 1, an + 0.4, len * 0.72); };
    tree(200, 640, 6, 0, 170);
    txt('⟺  never branches', 1300, 360, { size: 44, fam: F.orb, w: 900, c: C.white, a: dp });
    txt('branching future', 1300, 640, { size: 34, fam: F.orb, w: 700, c: C.mag, a: dp });
    thm('total_future_functional_iff_not_branching', 1300, 720, dp);
  }
  const ip = at(S, 1, 0.5) * (1 - at(S, 2, 0.5));
  if (ip > 0) {
    [[560, true], [1360, false]].forEach(([x, vis]) => {
      box(x - 280, 280, 560, 400, vis ? C.green : C.dim, ip, 2, 'rgba(4,10,24,0.7)');
      dot(x, 440, 50, vis ? 'g' : 'v', ip * (vis ? 1 : 0.3));
      if (!vis) { ctx.globalAlpha = ip * 0.85; ctx.fillStyle = '#000'; ctx.fillRect(x - 200, 380, 400, 120); ctx.globalAlpha = 1; txt('hidden by the interface', x, 450, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: ip }); }
      txt(vis ? 'decision visible' : 'decision hidden', x, 580, { size: 26, fam: F.orb, w: 700, align: 'center', c: vis ? C.green : C.dim, a: ip });
      txt(vis ? 'CONTROL: INTERNAL' : 'CONTROL: LOOKS EXTERNAL', x, 640, { size: 28, fam: F.orb, w: 900, align: 'center', c: vis ? C.green : C.orange, a: ip, ls: 2 });
    });
    thm('boundary_relative_agency', 960, 760, ip, 'center');
  }
  const fp = at(S, 2, 0.6);
  if (fp > 0) {
    ctx.globalAlpha = fp * 0.9; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 150, W, 780); ctx.globalAlpha = 1;
    const cx = W / 2, cy = 500;
    for (let k = 0; k < 60; k++) { const an = rnd(k, 1) * TAU, r = rnd(k, 2) * 200; dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.7, 10, 'w', fp * 0.9); }
    ctx.globalAlpha = fp; ctx.strokeStyle = C.gold; ctx.lineWidth = 4; ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.ellipse(cx, cy, 300 + 10 * Math.sin(t * 2), 220, 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    for (let k = 0; k < 24; k++) { const an = k / 24 * TAU + t * 0.2; dot(cx + Math.cos(an) * 360, cy + Math.sin(an) * 270, 6, 'v', fp * 0.6); }
    txt('FROZEN', cx, cy + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: fp, ls: 4 });
    txt('FREEDOM = THE FRONTIER', cx, 180 + 30, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.gold, a: fp, ab: 3, ls: 4 });
    txt('the part logic has not decided for us', cx, 830, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: fp });
    txt('Fixed Point Philosophy · Def 6.1', cx, 870, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: fp });
  }
};

/* ---- 08 TRIAD ---- */
SCENES.triad = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8), 'theory');
  const pos = [[W / 2, 290, 'TRUTH', 'the frozen fixed set', C.cyan, 'c'], [620, 640, 'GOODNESS', 'transformations that preserve it', C.green, 'n'], [1300, 640, 'BEAUTY', 'the order for choosing at the frontier', C.gold, 'g']];
  const ep = at(S, 2, 0.5);
  pos.forEach(([x, y, n, d, col, nm], i) => {
    const p = clamp((u - L[0].s - 0.5 - i * 3) / 0.6) * (1 - ep * 0.7);
    dot(x, y, 60 + 6 * Math.sin(t * 3 + i), nm, p);
    txt(n, x, y - 90, { size: 44, fam: F.orb, w: 900, align: 'center', c: col, a: p, ab: 2, ls: 6 });
    txt(d, x, y + 110, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.white, a: p });
  });
  const fp = at(S, 1, 0.5) * (1 - ep);
  if (fp > 0) {
    const flow = [[1300, 640, 620, 640, 'proposes'], [620, 640, W / 2, 290, 'checks honestly'], [W / 2, 290, W / 2, 190, 'freezes']];
    flow.forEach(([x1, y1, x2, y2, s], i) => {
      const p = clamp((u - L[1].s - i * 1.2) / 0.5) * fp;
      line(x1, y1, x2, y2, C.white, p * 0.6, 3);
      const ph = (t * 0.6 + i * 0.3) % 1; dot(lerp(x1, x2, ph), lerp(y1, y2, ph), 12, 'w', p);
      txt(s, (x1 + x2) / 2 + (i === 2 ? 60 : 0), (y1 + y2) / 2 - 20, { size: 22, fam: F.mono, align: 'center', c: C.white, a: p });
    });
    txt('beauty is not a function of truth', W / 2, 870 - 20, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.gold, a: clamp((u - L[1].s - 5) / 0.5) * fp });
  }
  if (ep > 0) {
    ctx.globalAlpha = ep * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 170, W, 700); ctx.globalAlpha = 1;
    [['诚', 'THE ACCOUNT MUST BALANCE', C.cyan], ['恕', 'ADMISSION IGNORES WHO ASKS', C.mag]].forEach(([z, s, col], i) => {
      const p = clamp((u - L[2].s - 1 - i * 2) / 0.5) * ep; const x = 560 + i * 800;
      txt(z, x, 470, { size: 180, fam: F.zh, w: 900, align: 'center', c: col, a: p, ab: 4 });
      txt(s, x, 560, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.white, a: p, ls: 3 });
    });
    txt('adopted, not derived  ·  is  ⇏  ought', W / 2, 720, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: clamp((u - L[2].s - 6) / 0.5) * ep, ls: 2 });
    txt('Fixed Point Philosophy · §§1–5', W / 2, 780, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: ep });
  }
};

/* ---- 09 UNMOVED ---- */
SCENES.unmoved = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8), 'theory');
  const cx = W / 2, cy = 500;
  const tp = at(S, 0, 0.6) * (1 - at(S, 1, 0.5) * 0.6);
  // frozen crystals (center), frontier ring, unprovable dark stars (outside)
  for (let k = 0; k < 40; k++) { const an = rnd(k, 1) * TAU, r = rnd(k, 2) * 150; dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.7, 12, 'c', tp); }
  for (let k = 0; k < 30; k++) { const an = k / 30 * TAU + t * 0.4; dot(cx + Math.cos(an) * 280, cy + Math.sin(an) * 200, 8, 'o', tp * (0.5 + 0.5 * Math.sin(t * 4 + k))); }
  for (let k = 0; k < 30; k++) { const an = rnd(k, 5) * TAU, r = 420 + rnd(k, 6) * 200; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r * 0.6; ctx.globalAlpha = tp * 0.8; ctx.strokeStyle = C.vio; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 9, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
  txt('FROZEN', cx, cy + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: tp, ls: 4 });
  txt('FRONTIER', cx + 300, cy - 210, { size: 24, fam: F.orb, w: 700, c: C.orange, a: tp, ls: 3 });
  txt('NEVER FREEZABLE', cx - 700, cy - 230, { size: 24, fam: F.orb, w: 700, c: C.vio, a: tp, ls: 3 });
  txt('only two things no transformation can move', cx, 200, { size: 34, fam: F.raj, w: 600, align: 'center', c: C.white, a: tp });
  const lp = at(S, 1, 0.6);
  if (lp > 0) {
    ctx.globalAlpha = lp * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 160, W, 700); ctx.globalAlpha = 1;
    // ladder climbing in a gap
    const gx = W / 2;
    ctx.globalAlpha = lp * 0.3; ctx.fillStyle = C.vio; ctx.fillRect(gx - 260, 180, 520, 620); ctx.globalAlpha = 1;
    line(gx - 90, 800, gx - 90, 180, C.gold, lp, 4); line(gx + 90, 800, gx + 90, 180, C.gold, lp, 4);
    const off = (t * 40) % 70;
    for (let y = 800 + off; y > 180; y -= 70) line(gx - 90, y, gx + 90, y, C.gold, lp * clamp((y - 180) / 200), 3);
    txt('μ', gx - 400, 780, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: lp });
    txt('ν  (unreachable)', gx + 470, 240, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, a: lp });
    txt('THE WIDTH OF THE GAP', gx - 560, 480, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: clamp((u - L[1].s - 7) / 0.5), ls: 3 });
    txt('IS CALLED INCOMPLETENESS', gx - 560, 530, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: clamp((u - L[1].s - 8) / 0.5), ls: 3 });
    txt('GICT · Theorem 7.2', gx + 470, 780, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: lp });
  }
};

/* ---- 10 THINKERS ---- */
SCENES.thinkers = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  badge(clamp(u / 0.8), 'reading');
  const cards = [
    ['LEIBNIZ', 'no readout tells them apart', 'identity of indiscernibles · joint_faithfulness_tfae (Lean)', C.cyan],
    ['KANT', 'same evidence, hidden coordinate left undetermined', 'Math Myth Match §21', C.gold],
    ['WITTGENSTEIN', 'same sentence, different use in context', 'Math Myth Match §22', C.mag],
    ['SPINOZA', 'a shared source does not make contents the same', 'Math Myth Match §20', C.green]
  ];
  const len = L[0].e - L[0].s; const bnd = [0.1, 0.32, 0.55, 0.76];
  cards.forEach(([n, d, src, col], i) => {
    const p = clamp((u - L[0].s - bnd[i] * len) / 0.6); const x = 120 + (i % 2) * 860, y = 190 + Math.floor(i / 2) * 290;
    box(x, y, 820, 250, col, p, 2, 'rgba(4,10,24,0.75)');
    txt(n, x + 30, y + 70, { size: 46, fam: F.orb, w: 900, c: col, a: p, ls: 4 });
    txt(d, x + 30, y + 140, { size: 30, fam: F.raj, w: 600, c: C.white, a: p });
    txt(src, x + 30, y + 210, { size: 18, fam: F.mono, c: C.dim, a: p });
    // small icon
    const ix = x + 720, iy = y + 70;
    if (i === 0) { dot(ix - 20, iy, 16, 'c', p); dot(ix + 20, iy, 16, 'c', p); }
    if (i === 1) { dot(ix, iy, 16, 'g', p); ctx.globalAlpha = p; ctx.strokeStyle = C.gold; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(ix, iy, 30, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }
    if (i === 2) { txt('“…”', ix, iy + 14, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, a: p }); }
    if (i === 3) { dot(ix, iy - 20, 12, 'n', p); dot(ix - 26, iy + 20, 12, 'c', p); dot(ix + 26, iy + 20, 12, 'm', p); line(ix, iy - 20, ix - 26, iy + 20, C.green, p, 2); line(ix, iy - 20, ix + 26, iy + 20, C.green, p, 2); }
  });
  const qp = at(S, 1, 0.5);
  if (qp > 0) { ctx.globalAlpha = qp * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 380, W, 200); ctx.globalAlpha = 1; txt('INCOMPLETE  ≠  FALSE', W / 2, 500, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.white, a: clamp((u - L[1].s - 4) / 0.5), ab: 3, ls: 6 }); }
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    drawHyper(CUBE5, [[0, 4, t * 0.3], [1, 3, t * 0.2], [2, 4, t * 0.15]], { scale: 1.6, rx: 0.3, ry: t * 0.1, a: 0.25 * fade, lw: 1, dots: false, camZ: 7 });
    goldFrame(W / 2, 560, 90, 0.5 * fade, t);
    const mp = at(S, 0, 0.6);
    txt('what can be proved will emigrate into mathematics.', W / 2, 250, { size: 38, fam: F.raj, w: 600, align: 'center', c: C.white, a: mp * fade });
    txt('philosophy keeps watch over what cannot.', W / 2, 310, { size: 38, fam: F.raj, w: 600, align: 'center', c: C.gold, a: at(S, 0, 0.6, 3) * fade });
    txt('Interface Philosophy', W / 2, 350, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: mp * fade });
    const cp = at(S, 1, 0.5);
    // compass
    const cx = 620, cy = 620;
    ctx.globalAlpha = cp * fade; ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 120, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    const an = Math.sin(t * 1.5) * 0.3 - Math.PI / 2;
    line(cx, cy, cx + Math.cos(an) * 110, cy + Math.sin(an) * 110, C.gold, cp * fade, 5); dot(cx, cy, 14, 'g', cp * fade);
    txt('BEAUTY · COMPASS', cx, cy + 180, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.gold, a: cp * fade, ls: 3 });
    // ratchet gear
    const gx = 1300, gy = 620, step = Math.floor(t * 2) * (TAU / 16);
    ctx.globalAlpha = cp * fade; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
    for (let k = 0; k <= 16; k++) { const a0 = k / 16 * TAU + step; ctx.lineTo(gx + Math.cos(a0) * 120, gy + Math.sin(a0) * 120); ctx.lineTo(gx + Math.cos(a0 + TAU / 32) * 90, gy + Math.sin(a0 + TAU / 32) * 90); }
    ctx.stroke(); ctx.globalAlpha = 1;
    txt('LOGIC · RATCHET', gx, gy + 180, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: cp * fade, ls: 3 });
    txt('AND THE ACCOUNT MUST BALANCE.', W / 2, 460, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 1, 0.5, 3.2) * fade, ab: 2, ls: 3 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    const planes = [[0, 4, t * 0.3], [1, 3, t * 0.2], [2, 4, t * 0.15]];
    drawHyper(CUBE5, planes, { scale: 1.1, rx: 0.3, ry: t * 0.2, a: ep * out * 0.5, cy: 330, lw: 1.2, dots: false, camZ: 7 });
    goldFrame(W / 2, 330, 130, ep * out, t);
    grid(t, 0.5 * ep * out, H * 0.66, C.gold, 0.3);
    txt('FIXED POINT', W / 2, 640, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#fff8e8', a: ep * out, ab: 5, ls: 14 });
    txt('不 动 点 · TRURETURING FILM 004', W / 2, 710, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Freedom lives at the frontier.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'TRANSFORM', concept: 'CONCEPT', dialectic: 'DIALECTIC', identity: 'IDENTITY', dialogue: 'DIALOGUE', justice: 'JUSTICE', freedom: 'FREEDOM', triad: 'TRUE-GOOD-BEAUTIFUL', unmoved: 'THE-UNMOVED', thinkers: 'THINKERS', finale: 'WATCH' });

function poster4() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawHyper(CUBE5, [[0, 4, t * 0.6], [1, 3, t * 0.45], [2, 4, t * 0.33], [3, 4, t * 0.5]], { scale: 2.1, rx: 0.3, ry: t * 0.2, a: 0.55, lw: 1.5, camZ: 7, cy: 470 });
  goldFrame(W / 2, 470, 240, 1, t);
  grid(t, 0.6, H * 0.7, C.gold, 0.3);
  txt('当一切都在变化，什么保持不变？', W / 2, 190, { size: 66, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FIXED POINT', W / 2, 800, { size: 140, fam: F.orb, w: 900, align: 'center', c: '#fff8e8', ab: 6, ls: 16 });
  bloom(0.65);
  txt('不 动 点  ·  一部用定理写成的哲学', W / 2, 900, { size: 44, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 004', W / 2, 965, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster4;
