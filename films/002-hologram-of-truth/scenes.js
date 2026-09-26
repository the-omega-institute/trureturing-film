/* Film 002 — HOLOGRAM OF TRUTH. Scenes injected into the shared engine (engine.js). */

/* honesty badge for results that are theory prose only */
function frontierBadge(a) {
  if (a <= 0.01) return;
  const s = 'FRONTIER · DERIVED ON PAPER · NOT YET KERNEL-CHECKED';
  const w = tw(s, 15, F.mono, 700, 2) + 40;
  ctx.globalAlpha = a * 0.85; ctx.fillStyle = 'rgba(40,20,0,0.75)'; ctx.fillRect(W / 2 - w / 2, 112, w, 30); ctx.globalAlpha = 1;
  box(W / 2 - w / 2, 112, w, 30, C.orange, a, 1.2);
  txt(s, W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.orange, a, ls: 2 });
}
function kernelBadge(a) {
  if (a <= 0.01) return;
  const s = 'LEAN KERNEL · VERIFIED';
  const w = tw(s, 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, C.green, a, 1.2, 'rgba(0,30,15,0.7)');
  txt(s, W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.green, a, ls: 2 });
}
/* holographic interference plate: concentric fringes seen in perspective */
function fringePlate(cx, cy, w, h, t, a, col = C.cyan) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const N = 26;
  for (let k = 1; k <= N; k++) {
    const r = Math.sqrt(k + (t * 1.5) % 1) / Math.sqrt(N + 1);
    ctx.globalAlpha = a * (0.55 - 0.4 * r) * (0.6 + 0.4 * Math.sin(k * 1.7 + t * 2));
    ctx.strokeStyle = k % 2 ? col : C.mag; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, w * r, h * r, 0, 0, TAU); ctx.stroke();
  }
  ctx.restore(); ctx.globalAlpha = 1;
  box(cx - w - 20, cy - h - 20, 2 * w + 40, 2 * h + 40, col, a * 0.5, 1);
}

/* ---- 00 OPEN: Indra's net, recursive pearl ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const zoom = ease(clamp((u - 5.5) / 6));
  const netA = clamp(u / 1.5) * (1 - at(S, 2, 0.8));
  if (netA > 0) {
    const sc = lerp(1.0, 2.6, zoom);
    drawNet(t, netA, t * 0.08, 0.3, null, sc, W / 2, H / 2);
    // the pearl that holds the net
    const pr = lerp(20, 250, zoom);
    const inner = clamp((u - 7.5) / 1.5);
    if (inner > 0) {
      ctx.save(); ctx.beginPath(); ctx.arc(W / 2, H / 2, pr, 0, TAU); ctx.clip();
      ctx.globalAlpha = 1; ctx.fillStyle = '#030615'; ctx.fillRect(W / 2 - pr, H / 2 - pr, pr * 2, pr * 2);
      drawNet(t, inner, -t * 0.12, 0.5, null, 0.33 * pr / 250 * 2.2, W / 2, H / 2);
      ctx.restore();
      ctx.globalAlpha = inner; ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(W / 2, H / 2, pr, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
      txt('ONE PEARL  ⊃  THE WHOLE NET ?', W / 2, H / 2 + pr + 60, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.gold, a: inner, ls: 4 });
    }
  }
  const q = at(S, 0, 1.2);
  txt(scramble('CAN A PART HOLD THE WHOLE?', q, 3), W / 2, 200, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.white, a: q * (1 - at(S, 1, 0.6)), ab: 4, ls: 4 });
  const hp = at(S, 2, 0.8);
  if (hp > 0) {
    fringePlate(W / 2, 760, 520, 110, t, hp);
    const planes = [[0, 3, t * 0.4], [1, 3, t * 0.27], [2, 3, t * 0.19]];
    const P = drawHyper(CUBE4, planes, { scale: 0.9, rx: 0.3, ry: t * 0.2, a: hp, cy: 400, lw: 2.2 });
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < P.length; i += 2) line(P[i][0], P[i][1], lerp(W / 2 - 480, W / 2 + 480, (P[i][0] - W / 2 + 500) / 1000), 760 + (rnd(i, 3) - 0.5) * 120, C.cyan, hp * 0.18, 1);
    ctx.globalCompositeOperation = 'source-over';
    txt('BOUNDARY  ⟶  VOLUME', W / 2, 950 - 70, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: hp, ls: 6 });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const planes = [[0, 5, t * 0.19], [1, 4, t * 0.15], [2, 5, t * 0.12], [3, 4, t * 0.17], [0, 3, t * 0.08]];
  drawHyper(CUBE6, planes, { scale: 1.7, rx: 0.3, ry: t * 0.05, a: 0.28, dots: false, lw: 1, camZ: 7.5 });
  grid(t, 0.55, H * 0.66, C.cyan);
  const rp = clamp(u / 1.6);
  txt(scramble('HOLOGRAM OF TRUTH', rp, 21), W / 2, 420, { size: 118, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', ab: 6, ls: 12 });
  txt('真 理 全 息', W / 2, 520, { size: 64, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 3 });
  txt('TRURETURING · FILM 002', W / 2, 590, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - 1.2) / 0.8), ls: 8 });
  const q = at(S, 0, 0.6, 2.5);
  txt('which parts hold which wholes — and where does the reflection break?', W / 2, 700, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: q });
};

/* ---- 02 FIBER: observation folds the world ---- */
const PTS = [];
for (let i = 0; i < 9; i++) for (let j = 0; j < 7; j++) PTS.push({ i, j, z: (rnd(i * 7 + j, 5) - 0.5) * 1.2 });
const FIBCOL = ['c', 'm', 'g', 'n', 'v', 'c', 'g', 'm', 'n'];
SCENES.fiber = S => {
  const u = S.u, t = S.t;
  kernelBadge(at(S, 0, 0.6) * (1 - at(S, 2, 0.6)));
  const ry = -0.6 + Math.sin(t * 0.15) * 0.35, rx = 0.42;
  const pr = p => proj(rotX(rotY(p, ry), rx), W / 2 - 180, H / 2 + 30, 1000, 6);
  const fold = ease(at(S, 0, 3, 3.5));
  const colorP = at(S, 1, 1);
  const defect = at(S, 2, 0.6, 3.0);
  // observation plane
  const corners = [[-2.2, 1.3, -1.2], [2.2, 1.3, -1.2], [2.2, 1.3, 1.2], [-2.2, 1.3, 1.2]].map(pr);
  ctx.globalAlpha = 0.12; ctx.fillStyle = C.cyan; ctx.beginPath(); corners.forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill();
  ctx.globalAlpha = 0.6; ctx.strokeStyle = C.cyan; ctx.stroke(); ctx.globalAlpha = 1;
  const pl = pr([2.3, 1.3, 1.2]); txt('OBSERVATION', pl[0] + 10, pl[1] + 30, { size: 18, fam: F.orb, w: 700, c: C.cyan, a: 0.9, ls: 3 });
  for (let i = 0; i < 9; i++) {
    const x = (i - 4) * 0.5;
    const a1 = pr([x, -1.3, 0]), a2 = pr([x, 1.3, 0]);
    line(a1[0], a1[1], a2[0], a2[1], C.dim, 0.35 + 0.4 * fold, 1.2);
    const b = pr([x, 1.3, 0]); dot(b[0], b[1], 14, 'w', 0.4 + 0.6 * fold);
  }
  for (const p of PTS) {
    const x = (p.i - 4) * 0.5, y = (p.j - 3) * 0.36;
    const z = p.z * (1 - fold);
    const xx = x + (rnd(p.i, p.j) - 0.5) * 0.5 * (1 - fold);
    const q = pr([xx, y, z]);
    let nm = colorP > 0 ? FIBCOL[p.i] : 'w';
    if (defect > 0 && p.i === 6 && p.j === 2) nm = 'r';
    dot(q[0], q[1], (nm === 'r' ? 26 : 16) * q[2] / 170, nm, 0.9);
  }
  const tx = 1330;
  txt('recover exists', tx, 330, { size: 34, fam: F.mono, w: 700, c: C.white, a: colorP });
  txt('⟺', tx + 120, 400, { size: 52, fam: F.orb, w: 900, c: C.gold, a: colorP });
  txt('target is constant', tx, 470, { size: 34, fam: F.mono, w: 700, c: C.white, a: colorP });
  txt('on every fiber', tx, 515, { size: 34, fam: F.mono, w: 700, c: C.white, a: colorP });
  txt('target_recovery_criterion', tx, 570, { size: 20, fam: F.mono, c: C.cyan, a: colorP * 0.9 });
  if (defect > 0) stamp('LINE CROSSED', tx + 190, 690, defect, C.red, 40, -0.05);
  else stamp('RECOVERABLE', tx + 190, 690, at(S, 1, 0.4, 3.5), C.green, 40, -0.05);
  txt('FIBERS: states that look the same', 150, 200, { size: 26, fam: F.orb, w: 700, c: C.white, a: fold, ls: 2 });
};

/* ---- 03 GLUE: local records on a tree ---- */
const TREE = [[960, 300, -1], [640, 460, 0], [1280, 460, 0], [440, 640, 1], [840, 640, 1], [1480, 640, 2]];
SCENES.glue = S => {
  const u = S.u, t = S.t;
  kernelBadge(at(S, 0, 0.6) * (1 - at(S, 1, 0.6)));
  const L0 = lineAt(S, 0);
  const assemble = ease(clamp((u - L0.s - 10.5) / 3));
  // edges
  TREE.forEach(([x, y, p], i) => {
    if (p < 0) return;
    const [px, py] = TREE[p];
    const e = clamp((u - L0.s - 2.5 - i * 0.5) / 0.6);
    const X1 = lerp(x, W / 2, assemble * 0.35), Y1 = lerp(y, 500, assemble * 0.35), X2 = lerp(px, W / 2, assemble * 0.35), Y2 = lerp(py, 500, assemble * 0.35);
    line(X1, Y1, X2, Y2, C.gold, e, 3);
    // overlap agreement marker
    const mx = (X1 + X2) / 2, my = (Y1 + Y2) / 2;
    if (e > 0) { dot(mx, my, 14, 'g', e); txt('=', mx + 14, my - 10, { size: 22, fam: F.orb, w: 900, c: C.gold, a: e }); }
  });
  TREE.forEach(([x, y], i) => {
    const p = clamp((u - L0.s - i * 0.35) / 0.5);
    if (p <= 0) return;
    const X = lerp(x, W / 2, assemble * 0.35), Y = lerp(y, 500, assemble * 0.35);
    const r = 80;
    ctx.globalAlpha = p * 0.18; ctx.fillStyle = [C.cyan, C.mag, C.vio, C.green, C.cyan, C.mag][i];
    ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k * TAU / 6 + Math.PI / 6; k ? ctx.lineTo(X + Math.cos(an) * r, Y + Math.sin(an) * r) : ctx.moveTo(X + Math.cos(an) * r, Y + Math.sin(an) * r); } ctx.closePath(); ctx.fill();
    ctx.globalAlpha = p; ctx.strokeStyle = [C.cyan, C.mag, C.vio, C.green, C.cyan, C.mag][i]; ctx.lineWidth = 2; ctx.stroke(); ctx.globalAlpha = 1;
    for (let k = 0; k < 4; k++) dot(X - 30 + (k % 2) * 60, Y - 22 + Math.floor(k / 2) * 44, 10, ['c', 'm', 'g', 'n'][(i + k) % 4], p);
    txt(`R${i + 1}`, X, Y + 8, { size: 20, fam: F.orb, w: 900, align: 'center', c: C.white, a: p });
  });
  if (assemble > 0) {
    ctx.globalAlpha = assemble * 0.7; ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.ellipse(W / 2, 500, 620 * (1 - assemble * 0.3), 280 * (1 - assemble * 0.3), 0, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    txt('∃ GLOBAL RECORD', W / 2, 215, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.green, a: assemble, ab: 2, ls: 4 });
  }
  txt('connected branches · exact agreement on overlaps', W / 2, 820, { size: 24, fam: F.mono, align: 'center', c: C.gold, a: clamp((u - L0.s - 4) / 0.6) * (1 - at(S, 1, 0.5)) });
  const bp = at(S, 1, 0.6);
  if (bp > 0) {
    ['existence  ✓', 'uniqueness  ?', 'original history  ?', 'cost  ?'].forEach((s, i) => {
      const p = clamp((u - lineAt(S, 1).s - i * 0.9) / 0.4);
      txt(s, 360 + i * 400, 830, { size: 32, fam: F.orb, w: 700, align: 'center', c: i ? C.orange : C.green, a: p * bp, ls: 2 });
    });
  }
};

/* ---- 04 BLIND: parts lie by omission ---- */
SCENES.blind = S => {
  const u = S.u, t = S.t;
  kernelBadge(clamp(u / 0.8));
  const lp = at(S, 0, 0.8), dp = at(S, 1, 0.8);
  const lx = 560, rx = 1360, y = 330;
  panel(lx - 340, 170, 680, 380, lp * (1 - dp * 0.6), C.mag, 'BELL PAIR · ENTANGLED');
  panel(rx - 340, 170, 680, 380, lp * (1 - dp * 0.6), C.gold, 'COIN FLIP · 00 or 11');
  const lq = lp * (1 - dp * 0.75);
  bloch(lx - 130, y, 64, t, lq, 'm', 0); bloch(lx + 130, y, 64, t, lq, 'm', 1);
  bloch(rx - 130, y, 64, t, lq, 'g', 2); bloch(rx + 130, y, 64, t, lq, 'g', 3);
  ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = C.mag; ctx.lineWidth = 3; ctx.globalAlpha = lp * 0.8; ctx.beginPath();
  for (let s = 0; s <= 50; s++) { const x = lx - 66 + 132 * s / 50; const yy = y + Math.sin(s / 50 * TAU * 2 + t * 6) * 14 * Math.sin(s / 50 * Math.PI); s ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
  ctx.stroke(); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  txt('ρ_A = ρ_B = I/2', lx, 480, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: lq });
  txt('ρ_A = ρ_B = I/2', rx, 480, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: lq });
  txt('≡', W / 2, 400, { size: 110, fam: F.orb, w: 900, align: 'center', c: C.green, a: lp * (1 - dp) });
  if (dp > 0) {
    // 9 hidden correlation axes, orthogonal to local planes
    const cx = W / 2 - 200, cy = 640;
    const pr = p => proj(rotX(rotY(p, t * 0.35), 0.35), cx, cy, 800, 4.5);
    const o = pr([0, 0, 0]);
    for (let k = 0; k < 2; k++) { const e = pr(k ? [0, 0, 1.5] : [1.5, 0, 0]); line(o[0], o[1], e[0], e[1], C.cyan, dp, 3); txt(k ? 'local B' : 'local A', e[0] + 10, e[1], { size: 18, fam: F.mono, c: C.cyan, a: dp }); }
    for (let k = 0; k < 9; k++) {
      const an = k / 9 * TAU;
      const e = pr([0.35 * Math.cos(an), -1.6, 0.35 * Math.sin(an)]);
      const p = clamp((u - lineAt(S, 1).s - 1 - k * 0.3) / 0.3) * dp;
      line(o[0], o[1], e[0], e[1], C.mag, p, 2.5); dot(e[0], e[1], 9, 'm', p);
    }
    txt('9', cx + 330, cy - 60, { size: 140, fam: F.orb, w: 900, c: C.mag, a: dp, ab: 4 });
    txt('hidden correlation dimensions', cx + 330, cy - 10, { size: 22, fam: F.mono, c: C.mag, a: dp });
    txt('(m² − 1)(n² − 1)', cx + 330, cy + 30, { size: 28, fam: F.mono, w: 700, c: C.white, a: dp });
  }
};

/* ---- 05 RECORDS: one fails, two succeed ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  frontierBadge(clamp(u / 0.8));
  const ip = at(S, 1, 0.8);
  const gate = clamp(u / 0.8) * (1 - ip);
  if (gate > 0) {
    grid(t, 0.8 * gate, H * 0.62, C.orange, 1.2);
    const sh = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = gate * 0.6; ctx.fillStyle = C.orange; ctx.fillRect(0, H * 0.62 - 2, W, 4); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    txt(scramble('THE FRONTIER', clamp(u / 1.5), 44), W / 2, 450, { size: 130, fam: F.orb, w: 900, align: 'center', c: '#fff4e0', a: gate, ab: 6, ls: 16 });
    txt('open nodes · where no proof exists yet', W / 2, 530, { size: 30, fam: F.mono, align: 'center', c: C.orange, a: gate * (0.7 + 0.3 * sh) });
  }
  // four-path interferometer
  const x0 = 360, y0 = 500;
  const paths = [-150, -50, 50, 150];
  paths.forEach((dy, k) => {
    ctx.globalAlpha = ip * 0.8; ctx.strokeStyle = [C.cyan, C.mag, C.gold, C.green][k]; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0 + 200, y0 + dy * 1.4, x0 + 520, y0 + dy * 1.4, x0 + 720, y0); ctx.stroke();
    const ph = (t * 0.4 + k * 0.25) % 1;
    const bx = (1 - ph) ** 3 * x0 + 3 * (1 - ph) ** 2 * ph * (x0 + 200) + 3 * (1 - ph) * ph * ph * (x0 + 520) + ph ** 3 * (x0 + 720);
    const by = (1 - ph) ** 3 * y0 + 3 * (1 - ph) ** 2 * ph * (y0 + dy * 1.4) + 3 * (1 - ph) * ph * ph * (y0 + dy * 1.4) + ph ** 3 * y0;
    dot(bx, by, 14, ['c', 'm', 'g', 'n'][k], ip);
  });
  ctx.globalAlpha = 1;
  dot(x0, y0, 26, 'w', ip); dot(x0 + 720, y0, 26, 'w', ip);
  txt('4 PATHS', x0 + 360, y0 - 250, { size: 24, fam: F.orb, w: 700, align: 'center', c: C.white, a: ip, ls: 4 });
  // record plates
  const one = ip, two = at(S, 2, 0.8);
  const plate = (x, y, lab, p) => { box(x, y, 120, 180, C.vio, p, 1.5, 'rgba(20,10,40,0.6)'); for (let k = 0; k < 6; k++) line(x + 12, y + 20 + k * 26, x + 108, y + 20 + k * 26 + Math.sin(t * 3 + k) * 6, C.vio, p * 0.8, 2); txt(lab, x + 60, y + 210, { size: 18, fam: F.mono, align: 'center', c: C.vio, a: p }); };
  plate(560, 700 - 380, 'record 1', one);
  plate(760, 700 - 380, 'record 2', two);
  const gauge = (x, y, val, lab, p, col) => {
    if (p <= 0) return;
    box(x, y, 420, 50, col, p, 1.5);
    ctx.globalAlpha = p; ctx.fillStyle = col; ctx.fillRect(x + 4, y + 4, 412 * val, 42); ctx.globalAlpha = 1;
    txt(lab, x, y - 16, { size: 22, fam: F.orb, w: 700, c: col, a: p, ls: 2 });
    txt(`${Math.round(val * 100)}%`, x + 440, y + 38, { size: 40, fam: F.orb, w: 900, c: col, a: p });
  };
  gauge(1250, 380, 0, 'ONE RECORD · exact recovery', clamp((u - lineAt(S, 1).s - 6) / 0.6), C.red);
  gauge(1250, 540, eo(clamp((u - lineAt(S, 2).s - 2) / 1.2)), 'TWO RECORDS · exact recovery', two, C.green);
  const tp = at(S, 2, 0.5, 5);
  txt('threshold  =  2', 1250, 700, { size: 54, fam: F.orb, w: 900, c: C.gold, a: tp, ab: 3 });
  if (tp > 0) {
    // ten-phase cube certificate
    const cx = 1560, cy = 830 - 20;
    const pr = p => proj(rotX(rotY(p, t * 0.5), 0.5), cx, cy, 500, 4);
    const V = CUBE4.V.slice(0, 8).map(v => pr(v.slice(0, 3).map(x => x * 0.6)));
    CUBE4.E.filter(([a, b]) => a < 8 && b < 8).forEach(([a, b]) => line(V[a][0], V[a][1], V[b][0], V[b][1], C.gold, tp * 0.8, 1.5));
    for (let j = 0; j < 10; j++) { const an = j * TAU / 10 + t * 0.3; line(cx, cy, cx + Math.cos(an) * 90, cy + Math.sin(an) * 90, C.cyan, tp * 0.5, 1.2); dot(cx + Math.cos(an) * 90, cy + Math.sin(an) * 90, 7, 'c', tp); }
    txt('10 phase vectors · weights A_j/112', 1250, 760, { size: 20, fam: F.mono, c: C.cyan, a: tp });
  }
  txt('QUANTUM-REALITY · Thm 404.1', 360, 900 - 60, { size: 18, fam: F.mono, c: C.dim, a: ip });
};

/* ---- 06 REAL: the price of reality ---- */
SCENES.real = S => {
  const u = S.u, t = S.t;
  frontierBadge(clamp(u / 0.8));
  const L = S.L;
  const cx = 560, cy = 520, R = 230;
  const sp = clamp(u / 1);
  const tri = at(S, 2, 0.8), sq = at(S, 3, 0.8);
  // axis radii
  let ax = [1, 1, 1];
  if (tri > 0) { const k = clamp((u - L[2].s - 3) / 5); ax = [1, lerp(1, 0.45, ease(k)), lerp(1, 0.35, ease(k))]; }
  let eps = 1;
  if (sq > 0) { eps = lerp(1, 0.0, ease(clamp((u - L[3].s) / 7.5))); ax = [1, eps, 1]; }
  const ry = t * 0.25, rx = 0.35;
  const pr = p => proj(rotX(rotY(p, ry), rx), cx, cy, 900, 4.5);
  // sphere wire
  ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 3; k++) {
    ctx.beginPath();
    for (let s = 0; s <= 60; s++) { const an = s / 60 * TAU; const p = k === 0 ? [Math.cos(an) * ax[0], Math.sin(an) * ax[1], 0] : k === 1 ? [Math.cos(an) * ax[0], 0, Math.sin(an) * ax[2]] : [0, Math.cos(an) * ax[1], Math.sin(an) * ax[2]]; const q = pr(p.map(x => x * 1.3)); s ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
    ctx.globalAlpha = sp * 0.35; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5; ctx.stroke();
  }
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  const labs = ['X', 'Y (imaginary)', 'Z'];
  for (let a = 0; a < 3; a++) for (const sgn of [-1, 1]) {
    const v = [0, 0, 0]; v[a] = sgn * ax[a] * 1.3; const q = pr(v); const o = pr([0, 0, 0]);
    line(o[0], o[1], q[0], q[1], a === 1 ? C.mag : C.cyan, sp * 0.7, 2);
    dot(q[0], q[1], 18 * q[2] / 180, a === 1 ? 'm' : 'c', sp);
    if (sgn > 0) txt(labs[a], q[0] + 14, q[1] - 12, { size: 18, fam: F.mono, c: a === 1 ? C.mag : C.cyan, a: sp });
  }
  // conjugation mirror (flips Y)
  const mp = at(S, 1, 0.6) * (1 - tri);
  if (mp > 0) {
    const cs = [[-1.5, 0, -1.5], [1.5, 0, -1.5], [1.5, 0, 1.5], [-1.5, 0, 1.5]].map(pr);
    ctx.globalAlpha = mp * 0.18; ctx.fillStyle = C.gold; ctx.beginPath(); cs.forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    txt('complex conjugation = mirror in Y', cx, 860 - 40, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: mp });
    txt('e + r  ≥  δ', 1360, 380, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.white, a: mp, ab: 3 });
    txt('recovery error + non-real residual ≥ gap', 1360, 440, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: mp });
    txt('six states, radius a:   δ = a / 3', 1360, 560, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.gold, a: at(S, 1, 0.5, 6), ab: 1 });
  }
  if (tri > 0 && sq < 1) {
    const A = ax.map(x => 1 / x); const ok = A.every((v, k) => v <= A[(k + 1) % 3] + A[(k + 2) % 3] + 1e-9);
    const a1 = A[0], a2 = A[1], a3 = A[2];
    const s = 90; const bx = 1180, by = 650;
    const col = ok ? C.green : C.red;
    // draw triangle with sides a1,a2,a3 if possible, else broken segments
    ctx.globalAlpha = tri * (1 - sq); ctx.strokeStyle = col; ctx.lineWidth = 4;
    if (ok) {
      const cosC = clamp((a1 * a1 + a2 * a2 - a3 * a3) / (2 * a1 * a2), -1, 1); const C_ = Math.acos(cosC);
      const P0 = [bx, by], P1 = [bx + a1 * s, by], P2 = [bx + a2 * s * Math.cos(C_), by - a2 * s * Math.sin(C_)];
      ctx.beginPath(); ctx.moveTo(...P0); ctx.lineTo(...P1); ctx.lineTo(...P2); ctx.closePath(); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + a1 * s, by); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + a2 * s * 0.2, by - a2 * s * 0.98); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + a1 * s, by); ctx.lineTo(bx + a1 * s - a3 * s * 0.25, by - a3 * s * 0.97); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const ta = tri * (1 - sq);
    txt('1/a₁ , 1/a₂ , 1/a₃', 1180, 330, { size: 40, fam: F.orb, w: 700, c: C.white, a: ta });
    txt('form a triangle  ⟺  reality is free', 1180, 390, { size: 30, fam: F.mono, w: 700, c: C.gold, a: ta });
    txt(ok ? 'TRIANGLE ✓  e_ℝ = δ' : 'TRIANGLE BROKEN ✗  extra cost', 1180, 480, { size: 30, fam: F.orb, w: 700, c: col, a: ta, ls: 2 });
  }
  if (sq > 0) {
    // plot e_R(eps) with the jump
    const gx = 1120, gy = 700, gw = 600, gh = 380;
    line(gx, gy, gx + gw, gy, C.dim, sq, 2); line(gx, gy, gx, gy - gh, C.dim, sq, 2);
    txt('ε (Y radius)', gx + gw - 120, gy + 34, { size: 18, fam: F.mono, c: C.dim, a: sq });
    txt('best real error', gx - 10, gy - gh - 14, { size: 18, fam: F.mono, c: C.dim, a: sq });
    const X = e => gx + e / 1.5 * gw, Y = v => gy - v / 0.4 * gh;
    line(X(0), Y(0.25), X(0.5), Y(0.25), C.orange, sq, 3);
    ctx.globalAlpha = sq; ctx.strokeStyle = C.orange; ctx.lineWidth = 3; ctx.beginPath();
    for (let k = 0; k <= 40; k++) { const e = 0.5 + k / 40; const v = e / (1 + 2 * e); k ? ctx.lineTo(X(e), Y(v)) : ctx.moveTo(X(e), Y(v)); } ctx.stroke(); ctx.globalAlpha = 1;
    ctx.globalAlpha = sq; ctx.strokeStyle = C.orange; ctx.beginPath(); ctx.arc(X(0), Y(0.25), 7, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    dot(X(0), Y(0), 16, 'g', sq);
    txt('1/4', gx - 60, Y(0.25) + 8, { size: 24, fam: F.orb, w: 700, c: C.orange, a: sq });
    const cur = eps; const v = cur === 0 ? 0 : cur <= 0.5 ? 0.25 : cur / (1 + 2 * cur);
    if (cur > 0.001) dot(X(cur), Y(v), 20, 'w', sq);
    txt(cur < 0.001 ? 'JUMP → 0' : `ε = ${cur.toFixed(2)}`, gx + 40, gy - gh + 30, { size: 34, fam: F.orb, w: 900, c: cur < 0.001 ? C.green : C.white, a: sq, ab: 2 });
    stamp('DISCONTINUITY', gx + gw / 2, 230, clamp((u - L[3].s - 8) / 0.4), C.mag, 42, -0.04);
  }
  txt('CSA §§272–276', 150, 900 - 60, { size: 18, fam: F.mono, c: C.dim, a: sp });
};

/* ---- 07 PHASE: recovery boundary ---- */
SCENES.phase = S => {
  const u = S.u, t = S.t;
  frontierBadge(clamp(u / 0.8));
  const L = S.L;
  const gp = at(S, 0, 0.8) * (1 - at(S, 1, 0.6) * 0.5);
  // error curve crossing 3/4
  const gx = 180, gy = 760, gw = 720, gh = 460;
  line(gx, gy, gx + gw, gy, C.dim, gp, 2); line(gx, gy, gx, gy - gh, C.dim, gp, 2);
  const Y = v => gy - (v - 0.55) / 0.4 * gh;
  ctx.setLineDash([12, 8]); line(gx, Y(0.75), gx + gw, Y(0.75), C.gold, gp, 2); ctx.setLineDash([]);
  txt('3/4', gx - 60, Y(0.75) + 8, { size: 26, fam: F.orb, w: 700, c: C.gold, a: gp });
  const drawn = clamp((u - L[0].s - 1) / 5);
  ctx.globalAlpha = gp; ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath();
  for (let k = 0; k <= 80 * drawn; k++) { const h = k / 80; const v = 0.75 + 0.18 * Math.tanh((h - 0.55) * 4) + 0.03 * Math.sin(h * 6); k ? ctx.lineTo(gx + h * gw, Y(v)) : ctx.moveTo(gx + h * gw, Y(v)); }
  ctx.stroke(); ctx.globalAlpha = 1;
  const hc = at(S, 0, 0.5, 6.5);
  if (hc > 0) { dot(gx + 0.55 * gw - 5, Y(0.75), 26, 'r', gp * hc); txt('h_c  (unique)', gx + 0.55 * gw + 20, Y(0.75) + 50, { size: 26, fam: F.orb, w: 700, c: C.red, a: gp * hc }); }
  txt('best error  vs  source slope h', gx, gy + 50, { size: 20, fam: F.mono, c: C.dim, a: gp });
  txt('schematic', gx + gw - 110, gy + 50, { size: 16, fam: F.mono, c: C.dim, a: gp });
  // quarter disc contact
  const qp = at(S, 1, 0.8);
  if (qp > 0) {
    const cx = 1100, cy = 760, R = 420;
    ctx.globalAlpha = qp * 0.15; ctx.fillStyle = C.vio; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, -Math.PI / 2, 0); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = qp; ctx.strokeStyle = C.vio; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, -Math.PI / 2, 0); ctx.closePath(); ctx.stroke(); ctx.globalAlpha = 1;
    txt('x, y ≥ 0 ,  x² + y² ≤ 1', cx + 20, cy + 44, { size: 22, fam: F.mono, c: C.vio, a: qp });
    const k = ease(clamp((u - L[1].s - 1) / 5));
    const an = lerp(-0.35, -0.9, k); const rr = lerp(0.25, 1, k) * R;
    const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr;
    const touched = k >= 0.999;
    dot(px, py, touched ? 34 : 22, touched ? 'g' : 'w', qp);
    if (touched) { ctx.globalAlpha = qp * (0.5 + 0.5 * Math.sin(t * 8)); ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(px, py, 50, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; txt('CONTACT', px + 40, py - 40, { size: 28, fam: F.orb, w: 900, c: C.gold, a: qp, ls: 4 }); }
    // decoder operators
    const ops = touched ? 2 : 3;
    txt('optimal decoder', 1560, 320, { size: 22, fam: F.mono, c: C.white, a: qp });
    for (let i = 0; i < 3; i++) {
      const on = i < ops; const y = 350 + i * 90;
      box(1560, y, 200, 70, on ? C.cyan : C.dim, qp * (on ? 1 : 0.25), 2, on ? 'rgba(0,40,60,0.6)' : null);
      txt(`K${i + 1}`, 1660, y + 46, { size: 30, fam: F.orb, w: 900, align: 'center', c: on ? C.cyan : C.dim, a: qp * (on ? 1 : 0.3) });
    }
    txt(`${ops} operators`, 1660, 650, { size: 30, fam: F.orb, w: 700, align: 'center', c: touched ? C.gold : C.cyan, a: qp });
  }
  const tp = at(S, 2, 0.6);
  if (tp > 0) {
    ctx.globalAlpha = tp * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 150, W, 700); ctx.globalAlpha = 1;
    ['CAPACITY', 'SMOOTHNESS', 'VISIBLE ERROR'].forEach((s, i) => {
      const p = clamp((u - L[2].s - i * 0.7) / 0.4) * tp;
      txt(s, 380 + i * 580, 470, { size: 50, fam: F.orb, w: 900, align: 'center', c: [C.cyan, C.mag, C.gold][i], a: p, ab: 2, ls: 3 });
      if (i < 2) txt('≠', 670 + i * 580, 470, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.white, a: p });
    });
    txt('three different quantities', W / 2, 580, { size: 28, fam: F.mono, align: 'center', c: C.white, a: tp });
  }
  txt('RRO §§190–216', 180, 900 - 60, { size: 18, fam: F.mono, c: C.dim, a: gp });
};

/* ---- 08 RH: a phase transition ---- */
const RZ = [14.13, 21.02, 25.01, 30.42, 32.94, 37.59, 40.92, 43.33, 48.01, 49.77, 52.97, 56.45, 59.35, 60.83, 65.11];
SCENES.rh = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  const cond = at(S, 1, 0.6);
  // conditional badge
  if (cond > 0) { const s = 'CONDITIONAL · IF RH WERE FALSE · PROVES NOTHING ABOUT RH'; const w = tw(s, 15, F.mono, 700, 2) + 40; box(W / 2 - w / 2, 112, w, 30, C.mag, cond, 1.2, 'rgba(40,0,30,0.7)'); txt(s, W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.mag, a: cond, ls: 2 }); }
  const x0 = 380, y0 = 840, sc = 9.5, lineX = x0;
  const sp = clamp(u / 1);
  // critical strip
  ctx.globalAlpha = sp * 0.1; ctx.fillStyle = C.vio; ctx.fillRect(x0 - 150, 150, 300, y0 - 150); ctx.globalAlpha = 1;
  line(lineX, y0, lineX, 150, C.gold, sp, 2);
  txt('Re(s) = ½', lineX + 12, 172, { size: 20, fam: F.mono, c: C.gold, a: sp });
  const Toff = 6; // index of first off-line zero in this illustration
  const split = at(S, 1, 1.2, 6.5);
  RZ.forEach((z, i) => {
    const p = clamp((u - 0.5 - i * 0.25) / 0.3);
    const y = y0 - z * sc;
    if (i === Toff && split > 0) {
      const d = 70 * ease(split);
      dot(lineX + d, y, 16, 'r', p); dot(lineX - d, y, 16, 'r', p);
      line(lineX - d, y, lineX + d, y, C.red, p * 0.6, 1.5);
      txt('½+δ+it', lineX + d + 16, y + 6, { size: 18, fam: F.mono, c: C.red, a: p * split });
      txt('mirror ½−δ+it', lineX - d - 150, y - 16, { size: 18, fam: F.mono, c: C.red, a: p * split });
      line(x0 - 180, y, x0 + 180, y, C.red, split * 0.5, 1);
      txt('T_off', x0 + 190, y + 6, { size: 20, fam: F.orb, w: 700, c: C.red, a: split });
    } else dot(lineX, y, 12, 'c', p);
  });
  // order parameter M(T)
  const op = at(S, 2, 0.8);
  if (op > 0) {
    const gx = 820, gy = 520, gw = 460, gh = 240;
    line(gx, gy, gx + gw, gy, C.dim, op, 2); line(gx, gy, gx, gy - gh, C.dim, op, 2);
    txt('M(T)  order parameter', gx, gy - gh - 16, { size: 20, fam: F.mono, c: C.white, a: op });
    txt('T', gx + gw + 10, gy + 6, { size: 20, fam: F.mono, c: C.dim, a: op });
    const jx = gx + gw * 0.55;
    line(gx, gy - 2, jx, gy - 2, C.cyan, op, 4); line(jx, gy - gh * 0.7, gx + gw, gy - gh * 0.7, C.red, op, 4);
    ctx.setLineDash([6, 6]); line(jx, gy, jx, gy - gh * 0.7, C.red, op * 0.7, 2); ctx.setLineDash([]);
    txt('JUMP', jx + 10, gy - gh * 0.7 - 16, { size: 26, fam: F.orb, w: 900, c: C.red, a: op, ab: 2 });
    // Lee-Yang circle
    const cx = 1600, cy = 400, R = 170;
    ctx.globalAlpha = op; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    txt('Lee–Yang circle', cx, cy + R + 40, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: op });
    const sp2 = ease(clamp((u - L[2].s - 5) / 2));
    for (let k = 0; k < 10; k++) {
      const an = k / 10 * TAU + t * 0.1;
      if (k === 0) {
        const r1 = R * (1 + 0.35 * sp2), r2 = R / (1 + 0.35 * sp2);
        dot(cx + Math.cos(an) * r1, cy + Math.sin(an) * r1, 16, 'r', op); dot(cx + Math.cos(an) * r2, cy + Math.sin(an) * r2, 16, 'r', op);
        if (sp2 > 0.3) { txt('r', cx + Math.cos(an) * r1 + 20, cy + Math.sin(an) * r1, { size: 24, fam: F.orb, w: 700, c: C.red, a: op }); txt('1/r', cx + Math.cos(an) * r2 - 70, cy + Math.sin(an) * r2 + 30, { size: 24, fam: F.orb, w: 700, c: C.red, a: op }); }
      } else dot(cx + Math.cos(an) * R, cy + Math.sin(an) * R, 11, 'c', op);
    }
    txt('INSTANTANEOUS PHASE TRANSITION', 1050, 760 - 60, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 2, 0.5, 9) * (1 - at(S, 3, 0.4)), ab: 2, ls: 3 });
  }
  const bp = at(S, 3, 0.6);
  if (bp > 0) {
    ctx.globalAlpha = bp * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(700, 580, 1140, 250); ctx.globalAlpha = 1;
    panel(760, 600, 1040, 200, bp, C.orange, 'OPEN · THE SINGLE LOAD-BEARING BRIDGE');
    txt('faithful transport:  zero-side energy  ≤  C · prime-side energy + ε', 1280, 690, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: bp });
    txt('“whether RH is true or false, the work produces truth”', 1280, 760, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.gold, a: at(S, 3, 0.6, 5) });
  }
  txt('RH offline-zero Lee–Yang theory · §§2–18', 150, 900 - 60, { size: 18, fam: F.mono, c: C.dim, a: sp });
};

/* ---- 09 SETTLED: external problems closed by the kernel ---- */
function wordRot(x, y, t, a) {
  const bits = [1, 0, 1, 1, 0, 0, 1, 0, 1, 0];
  const k = Math.floor(t * 1.2) % 8; const ph = (t * 1.2) % 1;
  for (let i = 0; i < bits.length; i++) {
    let b = bits[i]; const inW = i >= k && i < k + 3;
    box(x + i * 58, y, 50, 60, inW ? C.gold : C.cyan, a * (inW ? 1 : 0.5), inW ? 2.5 : 1.2, inW ? 'rgba(60,40,0,0.5)' : null);
    txt(String(b), x + i * 58 + 25, y + 44, { size: 36, fam: F.mono, w: 700, align: 'center', c: inW ? C.gold : C.white, a: a * (inW ? 0.6 + 0.4 * Math.cos(ph * Math.PI) : 1) });
  }
  ctx.globalAlpha = a; ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + (k + 1) * 58 + 25, y - 6, 60, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.globalAlpha = 1;
}
function petersen(cx, cy, n, t, a, spread) {
  const R1 = 190, R2 = 110; const P = [];
  for (let i = 0; i < n; i++) { const an = i / n * TAU - Math.PI / 2; P.push([cx + Math.cos(an) * R1, cy + Math.sin(an) * R1, cx + Math.cos(an) * R2, cy + Math.sin(an) * R2]); }
  ctx.globalAlpha = a * 0.6; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5;
  for (let i = 0; i < n; i++) { const j = (i + 1) % n, k = (i + 3) % n; ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[i][2], P[i][3]); ctx.moveTo(P[i][2], P[i][3]); ctx.lineTo(P[k][2], P[k][3]); ctx.stroke(); }
  ctx.globalAlpha = 1;
  for (let i = 0; i < n; i++) { const lit = (i / n) < spread; dot(P[i][0], P[i][1], 9, lit ? 'g' : 'w', a); dot(P[i][2], P[i][3], 9, ((i + 5) % n) / n < spread ? 'g' : 'w', a); }
}
function circulant(cx, cy, t, a) {
  const n = 30, R = 200, S_ = [5, 6, 9, 20];
  const P = []; for (let i = 0; i < n; i++) { const an = i / n * TAU - Math.PI / 2; P.push([cx + Math.cos(an) * R, cy + Math.sin(an) * R]); }
  ctx.globalAlpha = a * 0.22; ctx.strokeStyle = C.vio; ctx.lineWidth = 1;
  for (let i = 0; i < n; i++) for (const s of S_) { const j = (i + s) % n; ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); }
  ctx.globalAlpha = 1;
  P.forEach(([x, y], i) => dot(x, y, i === 0 || i === 2 ? 20 : 9, i === 0 ? 'c' : i === 2 ? 'r' : 'w', a));
  txt('0', P[0][0] - 8, P[0][1] - 26, { size: 22, fam: F.orb, w: 900, c: C.cyan, a });
  txt('2', P[2][0] + 14, P[2][1] - 14, { size: 22, fam: F.orb, w: 900, c: C.red, a });
}
SCENES.settled = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  kernelBadge(clamp(u / 0.8));
  const card = (k, fn) => { const a = at(S, k, 0.6) * (1 - at(S, k + 1, 0.5)); if (a > 0) fn(a); };
  const a0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (a0 > 0) {
    for (let i = 0; i < 40; i++) { const x = 160 + (i % 10) * 160, y = 250 + Math.floor(i / 10) * 140; const on = rnd(i, 9) < clamp((u - L[0].s) / 5); box(x, y, 130, 100, on ? C.green : C.dim, a0 * (on ? 0.9 : 0.3), 1.2, on ? 'rgba(0,40,20,0.5)' : null); if (on) txt('✓', x + 65, y + 66, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.green, a: a0 }); }
  }
  card(1, a => {
    txt('CayleyPy-4 · Conjecture 16 · arXiv 2603.22195 (Mar 2026)', W / 2, 230, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
    wordRot(W / 2 - 290, 330, t, a);
    txt('diameter  =  ⌈ L(N − L) / 2 ⌉', W / 2, 560, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.white, a, ab: 3 });
    stamp('PROVED · ALL SIZES', W / 2, 720, clamp((u - L[1].s - 5) / 0.4), C.green, 44, -0.04);
  });
  card(2, a => {
    txt('Generalized Petersen P(n,3) · Krishnan, Conjecture 5', W / 2, 230, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
    petersen(620, 520, 16, t, a, clamp((u - L[2].s - 1) / 5));
    txt('Z( P(n,3) ) = 8', 1320, 480, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.white, a, ab: 3 });
    txt('for every n ≥ 13', 1320, 560, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a });
    txt('paper checked 13 ≤ n ≤ 20', 1320, 620, { size: 24, fam: F.mono, align: 'center', c: C.dim, a });
    stamp('PROVED', 1320, 740, clamp((u - L[2].s - 4) / 0.4), C.green, 48, -0.04);
  });
  card(3, a => {
    circulant(520, 540, t, a);
    txt('G(ℤ₃₀, {5, 6, 9, 20})', 520, 800 - 20, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.vio, a });
    txt('quantum walk: zero transfer 0 → 2 (even)', 1340, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a });
    stamp('REFUTED', 1340, 420, clamp((u - L[3].s - 2) / 0.4), C.red, 50, -0.05);
    txt('A362534 · n = 19', 1340, 560, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[3].s - 4.5) / 0.5) });
    txt('215955 = 5 · 43191', 1340, 630, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: clamp((u - L[3].s - 5) / 0.5) });
    stamp('REFUTED', 1340, 740, clamp((u - L[3].s - 7.5) / 0.4), C.red, 50, -0.05);
  });
  const fp = at(S, 4, 0.6);
  if (fp > 0) {
    txt('411', W / 2, 480, { size: 200, fam: F.orb, w: 900, align: 'center', c: C.white, a: fp, ab: 5 });
    txt('PROBLEM DOSSIERS · NO PRIORITY CLAIMED · ONLY KERNEL-CHECKED', W / 2, 580, { size: 26, fam: F.raj, w: 700, align: 'center', c: C.cyan, a: fp, ls: 4 });
  }
};

/* ---- 10 RETURNS: torus ---- */
SCENES.returns = S => {
  const u = S.u, t = S.t;
  kernelBadge(clamp(u / 0.8));
  const cx = 720, cy = 500;
  const ry = 0.5, rx = 0.62 + 0.05 * Math.sin(t * 0.2);
  const T = (a, b) => { const R = 1.5, r = 0.6; return [(R + r * Math.cos(b)) * Math.cos(a), r * Math.sin(b), (R + r * Math.cos(b)) * Math.sin(a)]; };
  const pr = p => proj(rotX(rotY(p, ry + t * 0.05), rx), cx, cy, 900, 5.5);
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 24; i++) { ctx.beginPath(); for (let j = 0; j <= 40; j++) { const q = pr(T(i / 24 * TAU, j / 40 * TAU)); j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.globalAlpha = 0.14; ctx.strokeStyle = C.vio; ctx.lineWidth = 1; ctx.stroke(); }
  for (let j = 0; j < 12; j++) { ctx.beginPath(); for (let i = 0; i <= 60; i++) { const q = pr(T(i / 60 * TAU, j / 12 * TAU)); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.globalAlpha = 0.14; ctx.stroke(); }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  // window patch
  const wa = [0.7, 1.5], wb = [0.2, 1.4];
  ctx.globalAlpha = 0.25; ctx.fillStyle = C.gold; ctx.beginPath();
  const edge = []; for (let k = 0; k <= 10; k++) edge.push(T(lerp(wa[0], wa[1], k / 10), wb[0])); for (let k = 0; k <= 10; k++) edge.push(T(wa[1], lerp(wb[0], wb[1], k / 10))); for (let k = 10; k >= 0; k--) edge.push(T(lerp(wa[0], wa[1], k / 10), wb[1])); for (let k = 10; k >= 0; k--) edge.push(T(wa[0], lerp(wb[0], wb[1], k / 10)));
  edge.map(pr).forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
  // orbit n*alpha
  const al = [0.6180339887 * TAU, 0.41421356 * TAU];
  const NM = 1400; const nMax = Math.floor(clamp((u - 0.5) / 13) * NM);
  const hits = [];
  for (let n = 0; n < nMax; n++) {
    const a = (n * al[0]) % TAU, b = (n * al[1]) % TAU;
    const inside = a > wa[0] && a < wa[1] && b > wb[0] && b < wb[1];
    const q = pr(T(a, b));
    const fresh = n > nMax - 12;
    dot(q[0], q[1], (inside ? 9 : fresh ? 9 : 3) * q[2] / 160, inside ? 'g' : fresh ? 'w' : 'c', inside ? 1 : fresh ? 1 : 0.55);
    if (inside) hits.push(n);
  }
  // timeline of returns
  const tx = 1220, ty = 330, tw_ = 560;
  txt('visits to the window', tx, ty - 30, { size: 22, fam: F.mono, c: C.gold, a: 1 });
  line(tx, ty, tx + tw_, ty, C.dim, 1, 2);
  hits.forEach(n => line(tx + n / NM * tw_, ty - 16, tx + n / NM * tw_, ty + 16, C.gold, 1, 2));
  txt(`returns: ${hits.length}`, tx, ty + 60, { size: 40, fam: F.orb, w: 900, c: C.white, a: 1 });
  const sp = at(S, 0, 0.6, 8);
  txt('bounded gaps', tx, ty + 130, { size: 34, fam: F.orb, w: 700, c: C.cyan, a: sp });
  txt('lower density ≥ 1 / (M + 1)', tx, ty + 180, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: sp });
  txt('even when the reading has an error → 0', tx, ty + 230, { size: 22, fam: F.mono, c: C.dim, a: sp });
  stamp('PROVED · FROZEN', tx + 280, ty + 360, at(S, 1, 0.4), C.green, 40, -0.04);
  txt('TorusObservationWindowReturns.lean', tx, ty + 460, { size: 18, fam: F.mono, c: C.dim, a: at(S, 1, 0.4) });
};

/* ---- 11 MIRROR: is the library a hologram? ---- */
SCENES.mirror = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  const ry = t * 0.1, rx = -0.15;
  const P = DAG.nodes.map(n => proj(rotX(rotY(n.p, ry), rx), W / 2 - 150, H / 2 - 40, 860, 6));
  // choose a mid-level node and compute its ancestors
  const ancOf = id => { const A = new Set(); const st = [id]; while (st.length) { const a = st.pop(); for (const b of DAG.nodes[a].par) if (!A.has(b)) { A.add(b); st.push(b); } } return A; };
  const pick = DAG.nodes.filter(n => n.L >= 5 && n.L <= 6).reduce((m, n) => ancOf(n.id).size > ancOf(m.id).size ? n : m);
  const anc = ancOf(pick.id);
  const ap = at(S, 0, 1, 3), np = at(S, 1, 0.8);
  ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 1.5;
  for (const [a, b] of DAG.edges) {
    const onA = (anc.has(a) || a === pick.id) && (anc.has(b) || b === pick.id);
    ctx.globalAlpha = onA ? 0.25 + 0.6 * ap : 0.25 * (1 - np * 0.6); ctx.strokeStyle = onA ? C.gold : C.cyan;
    ctx.beginPath(); ctx.moveTo(P[a][0], P[a][1]); ctx.lineTo(P[b][0], P[b][1]); ctx.stroke();
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  for (const n of DAG.nodes) {
    const p = P[n.id]; const isA = anc.has(n.id), isP = n.id === pick.id;
    let nm = 'w', a = 0.8;
    if (isP) { nm = 'm'; } else if (isA) { nm = ap > 0.2 ? 'g' : 'w'; } else if (np > 0) { nm = 'v'; a = 0.8 - 0.55 * np; }
    dot(p[0], p[1], p[2] * (isP ? 0.07 : 0.028) * 2, nm, a);
  }
  const pp = P[pick.id];
  txt('this node', pp[0] + 30, pp[1] - 20, { size: 22, fam: F.orb, w: 700, c: C.mag, a: 1 });
  txt('addressed by the hashes of all its ancestors', 1110, 300, { size: 22, fam: F.mono, w: 700, c: C.gold, a: ap });
  txt('✓ carries its whole past', 1110, 350, { size: 32, fam: F.orb, w: 700, c: C.gold, a: ap });
  txt('✗ not its future', 1110, 450, { size: 32, fam: F.orb, w: 700, c: C.vio, a: np });
  txt('✗ not its siblings', 1110, 500, { size: 32, fam: F.orb, w: 700, c: C.vio, a: clamp((u - L[1].s - 1.5) / 0.4) });
  txt('ancestor dependence  ≠  containing the whole net', 1110, 580, { size: 22, fam: F.mono, w: 700, c: C.white, a: clamp((u - L[1].s - 4) / 0.5) });
  txt('Math Myth Match §83', 1110, 620, { size: 18, fam: F.mono, c: C.dim, a: clamp((u - L[1].s - 4) / 0.5) });
  const hp = at(S, 2, 0.8);
  if (hp > 0) {
    ctx.globalAlpha = hp * 0.8; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 660, W, 190); ctx.globalAlpha = 1;
    txt('NOT EVERY PART HOLDS THE WHOLE.', W / 2, 740, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: hp, ab: 2, ls: 3 });
    txt('FINDING WHICH PARTS DO IS THE FRONTIER.', W / 2, 810, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: clamp((u - L[2].s - 3) / 0.6), ab: 2, ls: 3 });
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.5) / 1.5);
  if (fade > 0) {
    drawNet(t, fade, t * 0.1, 0.3, null, lerp(1.4, 0.8, clamp(u / 10)), W / 2, H / 2);
    const cnt = [[5075, 'LEAN FILES'], [29643, 'THEOREMS + LEMMAS'], [4977, 'FROZEN']];
    cnt.forEach(([v, lab], i) => {
      const p = eo(clamp((u - L[0].s - i * 1.5) / 1.5)) * fade;
      txt(Math.floor(v * p).toLocaleString('en-US'), 400 + i * 560, 300, { size: 80, fam: F.orb, w: 900, align: 'center', c: [C.cyan, C.gold, C.white][i], a: clamp(p * 3), ab: 3 });
      txt(lab, 400 + i * 560, 350, { size: 22, fam: F.raj, w: 700, align: 'center', c: C.white, a: clamp(p * 3), ls: 6 });
    });
    txt('WHERE DOES INFORMATION STILL ESCAPE?', W / 2, 760, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 1, 0.6) * fade, ab: 3, ls: 4 });
  }
  const ep = clamp((u - L[1].e - 1.2) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    const planes = [[0, 5, t * 0.2], [1, 4, t * 0.15], [2, 5, t * 0.12], [3, 4, t * 0.17]];
    drawHyper(CUBE6, planes, { scale: 0.9, rx: 0.4, ry: t * 0.15, a: ep * out * 0.6, cy: 330, lw: 1.2, dots: false, camZ: 7 });
    grid(t, 0.5 * ep * out, H * 0.66, C.cyan);
    txt('HOLOGRAM OF TRUTH', W / 2, 630, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', a: ep * out, ab: 5, ls: 10 });
    txt('真 理 全 息 · TRURETURING FILM 002', W / 2, 700, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.2) / 0.8) * out });
    txt('Follow the escaping information.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'INDRA-NET', fiber: 'FIBERS', glue: 'GLUING', blind: 'BLIND-SPOT', records: 'RECORDS', real: 'REALITY-PRICE', phase: 'PHASE-BOUNDARY', rh: 'ZETA-TRANSITION', settled: 'SETTLED', returns: 'RETURNS', mirror: 'MIRROR', finale: 'FRONTIER' });

function poster2() {
  const t = 26.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  drawNet(t, 0.8, 0.6, 0.3, null, 1.5, W / 2, H / 2);
  const pr = 170;
  ctx.save(); ctx.beginPath(); ctx.arc(W / 2, 500, pr, 0, TAU); ctx.clip(); ctx.fillStyle = '#030615'; ctx.fillRect(W / 2 - pr, 500 - pr, 2 * pr, 2 * pr);
  drawNet(t, 1, -0.4, 0.5, null, 0.5, W / 2, 500); ctx.restore();
  ctx.globalAlpha = 1; ctx.strokeStyle = C.gold; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(W / 2, 500, pr, 0, TAU); ctx.stroke();
  txt('部分，能承载整体吗？', W / 2, 220, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('HOLOGRAM OF TRUTH', W / 2, 800, { size: 120, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', ab: 6, ls: 10 });
  bloom(0.65);
  txt('真 理 全 息  ·  数学全息几何的前沿', W / 2, 900, { size: 44, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 002', W / 2, 960, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 780, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster2;
