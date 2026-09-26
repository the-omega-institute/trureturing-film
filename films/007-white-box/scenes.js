/* Film 007 — WHITE BOX · 白盒. The project's machine-learning theory as exact small models. */

function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    theory: ['ML VOLUME · PAPER MATHEMATICS, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    lean: ['LEAN KERNEL · VERIFIED', C.green, 'rgba(0,30,15,0.7)'],
    open: ['OPEN · RESEARCH QUESTION', C.vio, 'rgba(20,10,40,0.75)']
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
function curve(fn, x0, x1, n, col, a, lw = 3) {
  if (a <= 0) return;
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i <= n; i++) { const t = i / n; const [x, y] = fn(t); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke(); ctx.globalAlpha = 1;
}
function axes(x, y, w, h, a, xl, yl) {
  line(x, y, x + w, y, C.dim, a, 2); line(x, y, x, y - h, C.dim, a, 2);
  if (xl) txt(xl, x + w + 12, y + 8, { size: 20, fam: F.mono, c: C.dim, a });
  if (yl) txt(yl, x - 10, y - h - 14, { size: 20, fam: F.mono, align: 'right', c: C.dim, a });
}
const P = (S, k, off = 0, dur = 0.5) => clamp((S.u - lineAt(S, k).s - off) / dur);

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  const glow = P(S, 1, 1, 3);
  drawHyper(CUBE4, [[0, 3, t * 0.3], [1, 2, t * 0.22], [0, 1, t * 0.1]], { scale: 2.1, rx: 0.35, ry: t * 0.15, a: (0.35 + 0.4 * glow) * sp, lw: 2, camZ: 6, cy: 560 });
  fillBox(W / 2 - 230, 330, 460, 460, '#000000', 0.7 * sp * (1 - glow));
  txt(scramble('BLACK BOX', at(S, 0, 1.0), 7), W / 2, 580, { size: 84, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp * (1 - glow), ab: 3, ls: 10 });
  txt('WHAT MUST YOU KNOW TO EXPLAIN IT EXACTLY?', W / 2, 220, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 1, 2), ls: 2 });
  txt('WHAT CAN NO COMPUTE EVER RECOVER?', W / 2, 280, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7), ls: 2 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const rp = clamp(u / 1.2);
  const p0 = 1 - P(S, 1, 0, 0.6);
  txt(scramble('WHITE BOX', rp, 71), W / 2, 330, { size: 120, fam: F.orb, w: 900, align: 'center', c: '#fbffff', ab: 5, ls: 16, a: 0.4 + 0.6 * p0 });
  txt('白  盒', W / 2, 410, { size: 54, fam: F.zh, w: 900, align: 'center', c: C.cyan, a: clamp((u - 0.8) / 0.8) * (0.4 + 0.6 * p0), ab: 2 });
  txt('TRURETURING · FILM 007 · MACHINE LEARNING, EXACTLY', W / 2, 210, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1) / 0.8), ls: 5 });
  const d0 = P(S, 0, 2) * p0;
  if (d0 > 0) {
    const y = 600;
    const nodes = [['MODEL STATE', 360, C.white], ['SUMMARY q', W / 2, C.cyan], ['EVERY TASK QUESTION', 1560, C.green]];
    nodes.forEach(([n, x, col], i) => { const q = P(S, 0, 2 + i * 1.5) * p0; box(x - 190, y - 40, 380, 80, col, q, 2, 'rgba(4,10,24,0.7)'); txt(n, x, y + 9, { size: 24, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 }); if (i < 2) arrow(x + 200, y, nodes[i + 1][1] - 200, y, C.dim, P(S, 0, 3 + i * 1.5) * p0, 3); });
    txt('explanation = every required question factors through q', W / 2, 720, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 0, 6) * p0 });
  }
  const p1 = P(S, 1, 0.3, 0.6);
  if (p1 > 0) {
    badge(p1, 'lean');
    const cx = W / 2, cy = 640;
    for (let k = 0; k < 24; k++) { const an = k / 24 * TAU + t * 0.2; const x = cx - 500 + Math.cos(an) * 160, y = cy + Math.sin(an) * 120; line(x, y, cx + 300, cy, C.cyan, p1 * 0.25, 1); dot(x, y, 10, ['c', 'm', 'g'][k % 3], p1); }
    dot(cx + 300, cy, 36, 'w', p1);
    txt('constant q', cx + 300, cy - 60, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('closed ✓', cx + 560, cy - 20, { size: 32, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 2) });
    txt('explains ✗', cx + 560, cy + 30, { size: 32, fam: F.mono, w: 700, c: C.red, a: P(S, 1, 3) });
    thm('constant_observer_closure_can_be_coarse', cx + 300, cy + 170, P(S, 1, 5), 'center');
  }
};

/* ---- 02 FUTURE ---- */
SCENES.future = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean', 'theory']);
  const p2 = at(S, 2, 0.5); const fade = 1 - p2;
  if (fade > 0) {
    const roots = [[360, 330, 'c', false], [360, 620, 'm', false], [360, 470, 'g', true]];
    const grow = P(S, 0, 1.5, 3);
    const merge = P(S, 0, 6, 1.2);
    roots.forEach(([x, y, nm, diff], r) => {
      if (r === 2) return;
      dot(x, y, 30, nm, fade);
      txt(r === 0 ? 'state A' : 'state B', x - 80, y + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: fade });
      // future tree
      for (let d = 1; d <= 3; d++) {
        const nn = 1 << d;
        for (let k = 0; k < nn; k++) {
          const px = x + d * 230, py = y + (k - (nn - 1) / 2) * (120 / d) * 0.9;
          const ppx = x + (d - 1) * 230, ppy = y + ((k >> 1) - ((nn >> 1) - 1) / 2) * (120 / (d - 1 || 1)) * 0.9 * (d > 1 ? 1 : 0);
          const q = clamp(grow * 3 - d + 1) * fade;
          line(d === 1 ? x : ppx, d === 1 ? y : ppy, px, py, C.dim, q * 0.6, 1.2);
          dot(px, py, 8, 'c', q);
        }
      }
    });
    txt('no future input separates A and B', 1450, 400, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 0, 5) * fade });
    txt('⇒  MERGE', 1450, 470, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: merge * fade, ls: 3 });
    const p1 = P(S, 1, 0, 0.6) * fade;
    if (p1 > 0) {
      txt('the smallest exact representation', 1450, 580, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: p1 });
      txt('every other exact one maps onto it', 1450, 625, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 2) * fade });
      thm('controlled_behavior_universal_property', 1450, 670, P(S, 1, 3) * fade, 'center');
    }
  }
  if (p2 > 0) {
    const rows = [[9, [9, 18, 36, 72, 144], true], [18, [18, 36, 72, 144, 288], false]];
    rows.forEach(([n, seq, ok], i) => {
      const y = 380 + i * 170;
      seq.forEach((v, k) => {
        const q = P(S, 2, 1 + k * 1.0); const x = 330 + k * 300;
        const over = !ok && k === 4;
        box(x - 100, y - 50, 200, 90, over ? C.red : k === 4 ? C.green : C.cyan, q, 2.5, 'rgba(4,10,24,0.7)');
        txt(over ? 'OVERFLOW' : String(v), x, y + 12, { size: over ? 26 : 40, fam: F.orb, w: 900, align: 'center', c: over ? C.red : C.white, a: q });
        if (k < 4) txt('×2', x + 150, y + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: q });
      });
    });
    [1, 2, 3].forEach(k => txt('same reading', 330 + k * 300, 740, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 2, 1 + k) }));
    txt('separated at depth 4', 330 + 4 * 300, 740, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 2, 5.5) });
    thm('ML volume ch. 6 · capacity box', W / 2, 790, P(S, 2, 6), 'center');
  }
};

/* ---- 03 WIDTH ---- */
SCENES.width = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const m = Math.min(40, 4 + Math.floor(Math.max(0, u - lineAt(S, 0).s - 1) * 6));
  const xin = 160, xh = 460, xout = 760, cy = 470;
  const p0 = at(S, 0, 0.6);
  const col = P(S, 1, 1, 2);
  dot(xin, cy, 24, 'c', p0); dot(xout, cy, 24, 'g', p0);
  for (let k = 0; k < m; k++) {
    const y = cy + (k - (m - 1) / 2) * Math.min(22, 560 / m);
    const yy = lerp(y, cy, ease(col));
    line(xin, cy, xh, yy, C.cyan, p0 * 0.25, 1); line(xh, yy, xout, cy, C.mag, p0 * 0.25, 1);
    dot(xh, yy, 8, k % 2 ? 'm' : 'c', p0 * (1 - 0.6 * col));
  }
  txt(`width m = ${m >= 40 ? '10,000,000' : m}`, xh, 180 + 0, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const gx = 1080, gy = 700, sc = 90;
    // wedge s >= 2|w|
    ctx.globalAlpha = p1 * 0.25; ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.moveTo(gx + 3 * sc, gy); ctx.lineTo(gx + 3 * sc - 2.2 * sc, gy - 4.4 * sc); ctx.lineTo(gx + 3 * sc + 2.2 * sc, gy - 4.4 * sc); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    line(gx, gy, gx + 6 * sc, gy, C.dim, p1, 2); line(gx + 3 * sc, gy, gx + 3 * sc, gy - 5 * sc, C.dim, p1, 2);
    txt('w', gx + 6 * sc + 14, gy + 8, { size: 24, fam: F.mono, w: 700, c: C.white, a: p1 });
    txt('s', gx + 3 * sc - 10, gy - 5 * sc - 12, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.white, a: p1 });
    txt('s ≥ 2|w|', gx + 3 * sc + 150, gy - 3.6 * sc, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: P(S, 1, 9) });
    // trajectory
    let w = -0.4, s = 3.2; const pts = [];
    for (let k = 0; k < 14; k++) { pts.push([w, s]); const a = 0.12 * (w - 1); const w2 = (1 + a * a) * w - a * s, s2 = (1 + a * a) * s - 4 * a * w; w = w2; s = s2; }
    const shown = Math.min(pts.length, Math.floor(P(S, 1, 2, 6) * pts.length));
    for (let k = 0; k < shown; k++) { const [a, b] = pts[k]; dot(gx + 3 * sc + a * sc, gy - b * sc, k === shown - 1 ? 18 : 9, k === shown - 1 ? 'g' : 'c', p1); if (k) line(gx + 3 * sc + pts[k - 1][0] * sc, gy - pts[k - 1][1] * sc, gx + 3 * sc + a * sc, gy - b * sc, C.gold, p1 * 0.6, 2); }
    box(1060, 170, 780, 110, C.gold, P(S, 1, 3), 2.5, 'rgba(30,20,0,0.8)');
    txt('w⁺ = (1+α²)w − αs     s⁺ = (1+α²)s − 4αw', 1450, 238, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
    txt('TWO NUMBERS · ANY WIDTH', xh, 800, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 1, 4), ls: 2 });
    thm('ML volume Thm 9.2', xh, 840, P(S, 1, 4), 'center');
  }
};

/* ---- 04 HIDDEN ---- */
SCENES.hidden = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p2 = at(S, 2, 0.5); const fade = 1 - p2;
  if (fade > 0) {
    const nets = [['(u, v) = (1, 1)', 2, 0.81, C.cyan, 'c'], ['(u, v) = (2, ½)', 17 / 4, 0.585, C.mag, 'm']];
    const gx = 700, gy = 690, sc = 360;
    axes(gx, gy, 900, 400, fade, 'step', 'prediction w');
    line(gx, gy - 1 * sc, gx + 900, gy - 1 * sc, C.dim, fade * 0.3, 1);
    nets.forEach(([lab, s, w1, col, nm], i) => {
      const q = P(S, 0, 1 + i * 1.5) * fade;
      txt(lab, 360, 360 + i * 110, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q });
      txt(`s = ${i ? '17/4' : '2'}`, 360, 400 + i * 110, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: q });
      const x0 = gx + 150, x1 = gx + 650; const d = P(S, 1, 0.5 + i * 1.2, 1);
      dot(x0, gy - sc, 20, nm, q);
      if (d > 0) { line(x0, gy - sc, lerp(x0, x1, d), gy - lerp(1, w1, d) * sc, col, fade, 3); dot(x1, gy - w1 * sc, 20, nm, d * fade); txt(String(w1), x1 + 40, gy - w1 * sc + 8, { size: 30, fam: F.mono, w: 700, c: col, a: d * fade }); }
    });
    txt('w = 1', gx + 150, gy - sc - 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) * fade });
    txt('SAME PREDICTION · DIFFERENT LEARNING', W / 2, 190, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 1, 4) * fade, ls: 2 });
    txt('any w-only predictor: error ≥ 0.1125', gx + 450, gy + 70, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 8) * fade });
  }
  if (p2 > 0) {
    txt('𝒞 = s² − 4w²', W / 2, 300, { size: 54, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p2 });
    txt('conserved by continuous gradient flow', W / 2, 360, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: p2 });
    const q = P(S, 2, 3, 0.8);
    txt('9', W / 2 - 300, 560, { size: 120, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: p2, ab: 3 });
    arrow(W / 2 - 180, 520, W / 2 + 120, 520, C.white, q, 4);
    txt('one real step, η = 1/10', W / 2 - 30, 480, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: q });
    txt('5184/625', W / 2 + 330, 545, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.red, a: q, ab: 2 });
    txt('≈ 8.29', W / 2 + 330, 610, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.red, a: q });
    thm('ML volume Prop. 9.3 · Prop. 11.3', W / 2, 720, q, 'center');
  }
};

/* ---- 05 STATE ---- */
SCENES.state = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p1 = at(S, 1, 0.5); const fade = 1 - p1;
  if (fade > 0) {
    const gx = 260, gy = 480, sx = 260, sy = 120;
    axes(gx, gy + 260, 900, 520, fade, 'θ', 'F(θ)');
    line(gx, gy, gx + 900, gy, C.dim, fade * 0.4, 1);
    curve(tt => { const th = -1.5 + 3.0 * tt; return [gx + 450 + th * sx, gy - (th * th * th - th) * sy]; }, 0, 1, 120, C.cyan, fade * P(S, 0, 1, 1), 3);
    for (const [th, col, nm, sgn] of [[-1, C.mag, 'm', '−48'], [1, C.gold, 'g', '+48']]) {
      const x = gx + 450 + th * sx; const q = P(S, 0, 3);
      dot(x, gy, 24, nm, q * fade);
      line(x - 80, gy + 80 * 2 * (th > 0 ? -1 : -1), x + 80, gy - 80 * 2 * (th > 0 ? -1 : -1), col, q * fade * 0.8, 2);
      txt(`θ = ${th}`, x, gy + 60, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: q * fade });
      txt(`K̇ = ${sgn}`, x, gy - 140, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: P(S, 0, 7) * fade });
    }
    txt('same output z = 0', 1500, 330, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) * fade });
    txt('same kernel K = 4', 1500, 380, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 5) * fade });
    txt('OUTPUT ≠ STATE', 1500, 480, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 8) * fade, ls: 3 });
    thm('ML volume Thm 15.2', 1500, 525, P(S, 0, 8) * fade, 'center');
  }
  if (p1 > 0) {
    const qv = P(S, 1, 4, 1);
    const sets = [['K = (0, 0)', 0, C.cyan], ['K′ = (0, 1)', 1, C.mag]];
    sets.forEach(([lab, k2, col], i) => {
      const y = 330 + i * 250; const q = P(S, 1, 1 + i);
      box(220, y - 60, 420, 120, col, q, 2.5, 'rgba(4,10,24,0.7)');
      txt(lab, 430, y + 10, { size: 32, fam: F.mono, w: 700, align: 'center', c: col, a: q });
      const out = qv > 0.5 ? (k2 ? Math.E / (1 + Math.E) : 0.5) : 0.5;
      arrow(660, y, 900, y, C.dim, q, 3);
      fillBox(930, y - 30, 600 * out, 60, col, 0.6 * q);
      box(930, y - 30, 600, 60, C.dim, q, 1.5);
      txt(out === 0.5 ? '½' : 'e/(1+e) ≈ 0.731', 1560, y + 10, { size: 30, fam: F.mono, w: 700, c: C.white, a: q });
    });
    txt(qv > 0.5 ? 'query = 1' : 'query = 0', 780, 220, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p1, ls: 2 });
    txt('an attention output is not a summary', W / 2, 740, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 6) });
    txt('no claim about any real Transformer cache', W / 2, 785, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 9) });
  }
};

/* ---- 06 MEMORY ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p1 = at(S, 1, 0.5); const fade = 1 - p1;
  if (fade > 0) {
    const rows = [['QUESTION ARRIVES AFTER', 'Z needs 2ⁿ values → n bits', C.red, true], ['QUESTION ARRIVES FIRST', 'Z = H_I → 1 bit', C.green, false]];
    rows.forEach(([a, b, col, after], i) => {
      const y = 330 + i * 240; const q = P(S, 0, 1 + i * 5) * fade;
      txt(a, 960, y - 115, { size: 26, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 });
      for (let k = 0; k < 8; k++) { box(200 + k * 70, y - 30, 56, 56, C.cyan, q, 1.5, 'rgba(0,20,30,0.6)'); txt(String((k * 5 + 3) % 2), 228 + k * 70, y + 8, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); }
      arrow(770, y, 880, y, C.dim, q, 3);
      box(900, y - 40, 200, 80, col, q, 2.5, 'rgba(4,10,24,0.7)'); txt('Z', 1000, y + 10, { size: 34, fam: F.orb, w: 900, align: 'center', c: col, a: q });
      const ix = after ? 1200 : 820; dot(ix, y - 50 + (after ? 0 : -10), 16, 'g', q); txt('index I', ix, y - 80, { size: 18, fam: F.mono, align: 'center', c: C.gold, a: q });
      txt(b, 1480, y + 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: P(S, 0, 3 + i * 5) * fade });
    });
    txt('the cost is set by timing, not by data size', W / 2, 800, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 0, 10) * fade });
  }
  if (p1 > 0) {
    const cols = [['NO RULE', '½', C.dim], ['STORED, IGNORED', '½', C.dim], ['STORED, USED', '1', C.green], ['STORED, BACKWARDS', '0', C.red]];
    cols.forEach(([a, b, col], i) => {
      const x = 330 + i * 420; const q = P(S, 1, 1 + i * 1.3);
      box(x - 180, 300, 360, 300, col, q, 2.5, 'rgba(4,10,24,0.7)');
      txt(a, x, 360, { size: 22, fam: F.orb, w: 900, align: 'center', c: col === C.dim ? C.white : col, a: q, ls: 1 });
      txt(b, x, 520, { size: 110, fam: F.orb, w: 900, align: 'center', c: col === C.dim ? C.white : col, a: q, ab: 2 });
    });
    txt('target = b XOR r · accuracy', W / 2, 230, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('MEMORY ≠ EXPLANATION ≠ CORRECT USE', W / 2, 690, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7), ls: 2 });
    thm('ML volume Prop. 28.1 · Prop. 18.7', W / 2, 740, P(S, 1, 7), 'center');
  }
};

/* ---- 07 SKILL ---- */
SCENES.skill = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const d = 8;
  const r = Math.min(d, Math.floor(Math.max(0, u - lineAt(S, 0).s - 3) / 1.6));
  const p0 = at(S, 0, 0.6);
  txt('HIDDEN RULE  s ∈ F₂⁸', 560, 230, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0, ls: 2 });
  for (let k = 0; k < d; k++) { const known = k < r; box(260 + k * 76, 280, 64, 64, known ? C.green : C.dim, p0, 2, known ? 'rgba(0,30,15,0.7)' : 'rgba(4,8,20,0.6)'); txt(known ? String((k * 3 + 1) % 2) : '?', 292 + k * 76, 322, { size: 30, fam: F.mono, w: 700, align: 'center', c: known ? C.green : C.dim, a: p0 }); }
  for (let k = 0; k < r; k++) { const y = 400 + k * 44; txt(`demo ${k + 1}:  (x${k + 1}, ⟨s, x${k + 1}⟩)`, 560, y, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p0 * clamp((u - lineAt(S, 0).s - 3 - k * 1.6) / 0.4) }); }
  const p1 = at(S, 1, 0.5);
  const gx = 1100, gy = 740, gw = 640, gh = 420;
  axes(gx, gy, gw, gh, p1, 'rank r', 'accuracy');
  if (p1 > 0) {
    for (let k = 0; k <= d; k++) { const acc = 0.5 + 0.5 * Math.pow(2, k - d); const h = (acc - 0.4) / 0.6 * gh; const on = k <= r; fillBox(gx + 20 + k * 68, gy - h, 48, h, on ? C.cyan : C.dim, (on ? 0.7 : 0.25) * p1); txt(String(k), gx + 44 + k * 68, gy + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p1 }); }
    txt('½ + ½ · 2^(r − d)', gx + gw / 2, gy - gh - 40, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    txt('each independent demonstration = one bit of rank', gx + gw / 2, gy - gh - 90, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 5) });
    thm('ML volume Prop. 28.6 · not a task-free intelligence score', gx + gw / 2, gy + 60, P(S, 1, 7), 'center');
  }
};

/* ---- 08 GROK ---- */
SCENES.grok = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p2 = at(S, 2, 0.5); const fade = 1 - 0.92 * p2;
  const gx = 200, gy = 720, gw = 1000, gh = 460, lam = 1;
  axes(gx, gy, gw, gh, fade, 'time t', 'error');
  const dr = P(S, 0, 0.5, 4);
  curve(tt => { const x = tt * dr; return [gx + x * gw, gy - (0.9 * Math.exp(-12 * x) + 0.02) * gh * 0.2]; }, 0, 1, 100, C.white, fade, 3);
  txt('training loss', gx + gw * 0.2, gy - 60, { size: 22, fam: F.mono, w: 700, c: C.white, a: dr * fade });
  const d1 = P(S, 1, 1, 5);
  const eps = 0.12;
  if (d1 > 0) {
    for (const [a0, col, nm] of [[1, C.cyan, 'init (0, 1)'], [2, C.mag, 'init (0, 2)']]) {
      curve(tt => { const x = tt * d1; return [gx + x * gw, gy - Math.min(1, 0.45 * a0 * Math.exp(-3.2 * x / lam)) * gh]; }, 0, 1, 120, col, fade, 3);
      const tc = Math.log(0.45 * a0 / eps) / 3.2;
      if (d1 > tc) { line(gx + tc * gw, gy, gx + tc * gw, gy - eps * gh, col, fade, 2); dot(gx + tc * gw, gy - eps * gh, 14, a0 === 1 ? 'c' : 'm', fade); txt(a0 === 1 ? 'λ⁻¹ log(1/ε)' : 'λ⁻¹ log(2/ε)', gx + tc * gw, gy + 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: col, a: fade }); }
      txt(nm, gx + 30, gy - 0.45 * a0 * gh - 10, { size: 22, fam: F.mono, w: 700, c: col, a: d1 * fade });
    }
    line(gx, gy - eps * gh, gx + gw, gy - eps * gh, C.gold, 0.6 * d1 * fade, 1.5);
    txt('ε', gx + gw + 12, gy - eps * gh + 6, { size: 22, fam: F.mono, c: C.gold, a: d1 * fade });
    txt('both training curves ≡ 0', 1560, 330, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) * (1 - p2) });
    txt('generalization time is', 1560, 420, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 1, 7) * (1 - p2) });
    txt('INVISIBLE TO THE CURVE', 1560, 470, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7) * (1 - p2), ls: 2 });
    thm('White-Box Fiber Law Thm 3.1', 1560, 515, P(S, 1, 7) * (1 - p2), 'center');
  }
  if (p2 > 0) {
    const cx = W / 2, cy = 470;
    ctx.globalAlpha = p2; ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - 500, cy + 60); ctx.bezierCurveTo(cx - 200, cy - 80, cx + 200, cy + 160, cx + 500, cy); ctx.stroke(); ctx.globalAlpha = 1;
    txt('a fiber of L: every point has the same loss', cx, cy + 170, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p2 });
    const sel = 0.62 + 0.02 * Math.sin(t * 2);
    const bx = (tt) => { const x0 = cx - 500, x3 = cx + 500; const x = (1 - tt) ** 3 * x0 + 3 * (1 - tt) ** 2 * tt * (cx - 200) + 3 * (1 - tt) * tt * tt * (cx + 200) + tt ** 3 * x3; const y = (1 - tt) ** 3 * (cy + 60) + 3 * (1 - tt) ** 2 * tt * (cy - 80) + 3 * (1 - tt) * tt * tt * (cy + 160) + tt ** 3 * cy; return [x, y]; };
    for (let k = 0; k < 9; k++) { const [x, y] = bx(k / 8); dot(x, y, 10, 'c', p2 * 0.6); }
    const [sx, sy] = bx(sel); dot(sx, sy, 30, 'g', P(S, 2, 2)); txt('R decides', sx, sy - 50, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 2, 2), ls: 2 });
    txt('WHITE BOX READS THE FIBER', cx, 250, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 2, 4), ls: 2 });
    txt('black box sees only the image', cx, 300, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.dim, a: P(S, 2, 5) });
  }
};

/* ---- 09 COPIER ---- */
SCENES.copier = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p2 = at(S, 2, 0.5); const fade = 1 - p2;
  if (fade > 0) {
    const rows = 7;
    for (let k = 0; k < rows; k++) {
      const y = 260 + k * 62; const q = P(S, 0, 1 + k * 0.4) * fade;
      box(240, y - 24, 280, 50, C.cyan, q, 1.5, 'rgba(0,20,30,0.6)'); txt(`past answer #${k + 1}`, 380, y + 8, { size: 20, fam: F.mono, align: 'center', c: C.white, a: q });
      arrow(530, y, 650, y, C.dim, q, 2);
      box(660, y - 24, 280, 50, C.cyan, q, 1.5, 'rgba(0,20,30,0.6)'); txt(`copy #${k + 1}`, 800, y + 8, { size: 20, fam: F.mono, align: 'center', c: C.white, a: q });
      const c = P(S, 1, 1 + k * 0.35);
      if (c > 0) txt('CONTAMINATED', 1090, y + 8, { size: 20, fam: F.orb, w: 900, align: 'center', c: C.red, a: c * fade, ls: 2 });
    }
    txt('training loss = 0', 1560, 330, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 4) * fade });
    txt('no fair test', 1560, 430, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 3) * fade });
    txt('zero loss ⇏ future gain', 1560, 500, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 6) * fade });
    thm('lookup_copy_zero_loss_and_nonanticipating_failure', W / 2, 740, P(S, 0, 4) * fade, 'center');
  }
  if (p2 > 0) {
    txt('SAME OBSERVED DATA', W / 2, 240, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.white, a: p2, ls: 3 });
    for (const [x, sgn, col, nm] of [[560, '−1', C.red, 'WORLD 1'], [1360, '+1', C.green, 'WORLD 2']]) {
      const q = P(S, 2, 2 + (x > W / 2 ? 1 : 0));
      box(x - 250, 330, 500, 300, col, q, 2.5, 'rgba(4,10,24,0.7)');
      txt(nm, x, 390, { size: 28, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 3 });
      txt('future gain of the same fix', x, 450, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q });
      txt(sgn, x, 580, { size: 100, fam: F.orb, w: 900, align: 'center', c: col, a: q, ab: 2 });
    }
    thm('scientific_gain_generalization_sign_reversal', W / 2, 700, P(S, 2, 4), 'center');
  }
};

/* ---- 10 BUDGET ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean', 'lean']);
  const gx = 220, gy = 720, gw = 900, gh = 460;
  const p0 = at(S, 0, 0.6);
  axes(gx, gy, gw, gh, p0, 'budget', 'best residual');
  const floor = 0.28;
  const dr = P(S, 0, 1, 5);
  ctx.globalAlpha = p0; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
  for (let k = 0; k <= 30 * dr; k++) { const x = gx + k / 30 * gw; const v = floor + (0.95 - floor) * Math.exp(-k / 6); const y = gy - v * gh; if (k === 0) ctx.moveTo(x, y); else { ctx.lineTo(x, ctx._py); ctx.lineTo(x, y); } ctx._py = y; }
  ctx.stroke(); ctx.globalAlpha = 1;
  line(gx, gy - floor * gh, gx + gw, gy - floor * gh, C.vio, P(S, 0, 4) * 0.8, 2);
  txt('infimum', gx + gw + 12, gy - floor * gh + 6, { size: 20, fam: F.mono, c: C.vio, a: P(S, 0, 4) });
  thm('budget_envelope_infimum_and_limit', gx + gw / 2, gy + 50, P(S, 0, 4), 'center');
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const bx = 1320, bw = 460;
    txt('REMAINING ERROR', bx + bw / 2, 250, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: p1, ls: 2 });
    fillBox(bx, 290, bw * 0.45, 90, C.vio, 0.7 * P(S, 1, 1)); fillBox(bx + bw * 0.45, 290, bw * 0.55, 90, C.cyan, 0.55 * P(S, 1, 3));
    txt('BLIND CORE', bx + bw * 0.225, 345, { size: 20, fam: F.orb, w: 900, align: 'center', c: '#fff', a: P(S, 1, 1) });
    txt('removable', bx + bw * 0.72, 345, { size: 20, fam: F.mono, w: 700, align: 'center', c: '#02040c', a: P(S, 1, 3) });
    thm('blind_residual_charge_decomposition', bx + bw / 2, 420, P(S, 1, 3), 'center');
    const c = P(S, 1, 9);
    box(bx - 20, 480, bw + 40, 170, C.red, c, 2, 'rgba(30,0,10,0.7)');
    txt('countermodel: blind core = ∅', bx + bw / 2, 530, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: c });
    txt('every finite budget leaves residual 1', bx + bw / 2, 575, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: c });
    thm('free_ultrafilter_charge_countermodel', bx + bw / 2, 625, c, 'center');
  }
  stamp('CHANGE THE LANGUAGE', W / 2, 810, P(S, 2, 0.5, 0.6), C.gold, 40, -0.03);
};

/* ---- 11 SWITCH ---- */
SCENES.switch = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p1 = at(S, 1, 0.5); const fade = 1 - p1;
  if (fade > 0) {
    const q0 = P(S, 0, 1);
    box(260, 300, 360, 150, C.cyan, q0 * fade, 2, 'rgba(0,20,30,0.7)'); txt('history 00', 440, 350, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q0 * fade }); txt('next: 7/12', 440, 410, { size: 26, fam: F.mono, align: 'center', c: C.white, a: q0 * fade });
    box(260, 520, 360, 150, C.mag, q0 * fade, 2, 'rgba(30,0,25,0.7)'); txt('history 0100', 440, 570, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q0 * fade }); txt('next: 11/19', 440, 630, { size: 26, fam: F.mono, align: 'center', c: C.white, a: q0 * fade });
    const m = P(S, 0, 3, 1);
    arrow(630, 375, 900, 480, C.cyan, m * fade, 3); arrow(630, 595, 900, 500, C.mag, m * fade, 3);
    dot(960, 490, 50, 'g', m * fade); txt('23', 960, 504, { size: 36, fam: F.orb, w: 900, align: 'center', c: '#02040c', a: m * fade });
    txt('old label', 960, 580, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: m * fade });
    txt('error ≥ 1/456', 1450, 450, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 0, 7) * fade, ab: 2 });
    txt('target 1/1024 · impossible at the switch', 1450, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 9) * fade });
  }
  if (p1 > 0) {
    const n = Math.min(8, Math.floor(Math.max(0, u - lineAt(S, 1).s - 0.5) / 0.5));
    for (let k = 0; k < 8; k++) { const on = k < n; box(240 + k * 80, 300, 64, 64, on ? C.green : C.dim, p1, 2, on ? 'rgba(0,30,15,0.7)' : 'rgba(4,8,20,0.6)'); txt(String(k + 1), 272 + k * 80, 342, { size: 26, fam: F.mono, w: 700, align: 'center', c: on ? C.green : C.dim, a: p1 }); }
    txt(n >= 8 ? '8 new reports → restored ✓' : 'new reports…', 560, 430, { size: 30, fam: F.mono, w: 700, align: 'center', c: n >= 8 ? C.green : C.white, a: p1 });
    const gx = 1080, gy = 720, gw = 700, gh = 360; const q = P(S, 1, 5);
    axes(gx, gy, gw, gh, q, 'log(1/ε)', 'reports');
    curve(tt => [gx + tt * gw, gy - (0.1 + 0.8 * tt) * gh], 0, 1, 2, C.cyan, q, 3);
    txt('Θ(log 1/ε) · adaptive stopping cannot beat it', gx + gw / 2, gy + 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt('INSTANT IMPOSSIBILITY', 560, 560, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 12), ls: 2 });
    txt('+ DELAYED AVAILABILITY', 560, 610, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 13), ls: 2 });
    thm('ML Observation §43 · §45', 560, 660, P(S, 1, 13), 'center');
  }
};

/* ---- 12 UNKNOWN ---- */
SCENES.unknown = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6);
  for (const [x, lab, col, nm] of [[560, 'p = 1/4', C.cyan, 'c'], [1360, 'p = 1/3', C.mag, 'm']]) {
    const spin = Math.cos(t * 3 + (x > W / 2 ? 1 : 0));
    ctx.save(); ctx.translate(x, 330); ctx.scale(Math.abs(spin) * 0.9 + 0.1, 1); dot(0, 0, 70, nm, p0); ctx.restore();
    txt(lab, x, 450, { size: 32, fam: F.mono, w: 700, align: 'center', c: col, a: p0 });
  }
  txt('?', W / 2, 350, { size: 90, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0 });
  txt('even with the full history: no predictor accurate on every history', W / 2, 550, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 0, 5) * (1 - 0.6 * at(S, 1, 0.5)) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const gx = 360, gy = 800, gw = 1200;
    const idT = 0.35;
    line(gx, gy, gx + gw, gy, C.dim, p1, 2);
    const run = P(S, 1, 1, 5);
    for (let k = 0; k < 40 * run; k++) { const x = gx + k / 40 * gw; dot(x, gy - 20, 6, rnd(k, 3) < 0.28 ? 'w' : 'c', p1 * 0.8); }
    if (run > idT) { line(gx + idT * gw, gy - 90, gx + idT * gw, gy + 20, C.gold, p1, 3); txt('identified (w.h.p.)', gx + idT * gw, gy - 105, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 }); }
    if (run > idT + 0.05) fillBox(gx + idT * gw, gy - 60, (run - idT) * gw, 24, C.green, 0.35 * p1);
    if (run > idT + 0.1) txt('accurate at every later time', gx + (idT + 0.3) * gw, gy - 70, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: p1 });
    txt('identification: sufficient, not necessary', W / 2, 610, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 1, 7), ls: 1 });
    thm('ML Observation §48 · §50', W / 2, 650, P(S, 1, 7), 'center');
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const four = [['LATENT STRUCTURE', C.cyan], ['STORAGE', C.mag], ['EXPLANATION', C.gold], ['CORRECT USE', C.green]];
    four.forEach(([w, col], i) => { const q = P(S, 0, 0.5 + i * 0.9) * fade; const x = 300 + i * 440; box(x - 190, 260, 380, 110, col, q, 2.5, 'rgba(4,10,24,0.7)'); txt(w, x, 325, { size: 26, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 }); });
    txt('four different conditions', W / 2, 430, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 0, 4) * fade });
    const q = P(S, 0, 7);
    box(W / 2 - 360, 480, 720, 70, C.vio, q * fade, 2, 'rgba(20,10,40,0.8)');
    txt('real attention models · OPEN', W / 2, 525, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.vio, a: q * fade, ls: 2 });
    txt('a white box is a question you can answer exactly', W / 2, 700, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.gold, a: at(S, 1, 0.6, 2) * fade, ls: 1 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    drawHyper(CUBE4, [[0, 3, t * 0.3], [1, 2, t * 0.22]], { scale: 1.3, rx: 0.35, ry: t * 0.15, a: 0.6 * ep * out, lw: 2, camZ: 6, cy: 330 });
    txt('WHITE BOX', W / 2, 640, { size: 120, fam: F.orb, w: 900, align: 'center', c: '#fbffff', a: ep * out, ab: 5, ls: 16 });
    txt('白 盒 · TRURETURING FILM 007', W / 2, 710, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('What the loss cannot see, the regularizer decides.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'BLACK-BOX', future: 'FUTURE-QUOTIENT', width: 'ANY-WIDTH', hidden: 'HIDDEN-COORD', state: 'OUTPUT≠STATE', memory: 'MEMORY', skill: 'IN-CONTEXT', grok: 'GROKKING', copier: 'COPIER', budget: 'BLIND-CORE', switch: 'PRECISION', unknown: 'UNKNOWN-MODEL', finale: 'WHITE-BOX' });

function poster7() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawHyper(CUBE4, [[0, 3, t * 0.3], [1, 2, t * 0.22], [0, 1, t * 0.1]], { scale: 2.2, rx: 0.35, ry: t * 0.15, a: 0.8, lw: 2.2, camZ: 6, cy: 470 });
  txt('黑盒里，最少要知道什么？', W / 2, 190, { size: 66, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('WHITE BOX', W / 2, 800, { size: 150, fam: F.orb, w: 900, align: 'center', c: '#fbffff', ab: 6, ls: 18 });
  bloom(0.65);
  txt('白 盒  ·  机器学习的精确理论', W / 2, 900, { size: 44, fam: F.zh, w: 700, align: 'center', c: C.cyan });
  txt('TRURETURING · FILM 007', W / 2, 965, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster7;
