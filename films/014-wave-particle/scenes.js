/* Film 014 — WAVE · PARTICLE · EVENT · 波粒整体. A particle event is a record at a declared interface. */

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


/* ---- film 014 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · PAPER PROOF, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    classic: ['KNOWN PHYSICS · CREDITED IN THE VOLUME, NOT NEW', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const PHI14 = (1 + Math.sqrt(5)) / 2;
const R14 = Math.sqrt((11 + 5 * Math.sqrt(5)) / 32);
/* inverse-CDF sample of a fringe pattern I(x) = 1 + V cos(2π·4x) on [0,1] */
function fringeSample(u, V, ph = 0) {
  let lo = 0, hi = 1;
  const cdf = x => x + V * (Math.sin(TAU * 4 * x + ph) - Math.sin(ph)) / (TAU * 4);
  for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2; if (cdf(m) < u) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
function packet(x0, y, w, amp, ph, col, a, lw = 3) {
  curve(q => { const s = q - 0.5; return [x0 + q * w, y - amp * Math.exp(-s * s * 18) * Math.sin(q * 40 + ph)]; }, 160, col, a, lw);
}
function lamp(x, y, on, a, col = 'g', r = 26) {
  ring(x, y, r, C.dim, a, 2);
  if (on > 0) dot(x, y, r * 1.4, col, a * on);
}
function plotAxes(gx, gy, gw, gh, a, xl, yl) {
  line(gx, gy, gx + gw, gy, C.dim, a, 1.5); line(gx, gy, gx, gy - gh, C.dim, a, 1.5);
  if (xl) txt(xl, gx + gw / 2, gy + 42, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a });
  if (yl) txt(yl, gx, gy - gh - 16, { size: 20, fam: F.mono, align: 'left', c: C.mag, a });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  const f0 = 1 - at(S, 1, 0.8);
  if (f0 > 0) {
    packet(180, 480, 620, 130, -t * 6, C.cyan, sp * f0, 3);
    packet(180, 480, 620, 90, -t * 6 + 1.2, C.vio, sp * f0 * 0.5, 2);
    txt('WAVE ?', 490, 300, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: sp * f0, ls: 4 });
    box(1180, 300, 12, 360, C.dim, sp * f0, 1.5);
    const n = Math.min(220, Math.floor(u * 40));
    for (let i = 0; i < n; i++) dot(1186, 300 + fringeSample(rnd(i, 3), 0.9) * 360, 7, i % 5 ? 'g' : 'm', sp * f0 * 0.9);
    for (let k = 0; k < 4; k++) { const q = ((t * 0.9 + k * 0.25) % 1); dot(1000 + q * 180, 480 + (rnd(k, Math.floor(t * 0.9 + k * 0.25)) - 0.5) * 200 * q, 12, 'g', sp * f0); }
    txt('PARTICLE ?', 1400, 300, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.gold, a: sp * f0, ls: 4 });
    txt('「这卷理论拒绝以这种方式提问」', W / 2, 800, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.white, a: P(S, 0, 2.5) * f0, ab: 2 });
  }
  const p1 = at(S, 1, 0.8);
  if (p1 > 0) {
    const labs = [['TRANSPORT', '传输', C.cyan], ['CLOCK', '时钟', C.vio], ['INSTRUMENT', '仪器', C.mag], ['RECORD', '记录', C.gold]];
    labs.forEach(([en, zh, col], i) => {
      const q = P(S, 1, 1 + i * 1.2), x = 330 + i * 420;
      box(x - 150, 380, 300, 150, col, q, 2, 'rgba(0,0,0,0.6)');
      txt(en, x, 450, { size: 32, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 });
      txt(zh, x, 500, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: q });
      if (i < 3) arrow(x + 155, 455, x + 265, 455, C.dim, P(S, 1, 1.6 + i * 1.2), 2.5);
    });
    txt('particle  =  how the relation reads out', W / 2, 660, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 7) * p1, ab: 2 });
    txt('RECURSIVE_RELATIONAL_OBSERVATION_WAVE_PARTICLE_EVENTS', W / 2, 740, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 8) * p1 });
  }
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const rp = clamp(u / 1.2);
  const sx = 460, sw = 1000, sy = 200, sh = 250;
  const n = Math.min(900, Math.floor(u * 70));
  for (let i = 0; i < n; i++) { const x = sx + fringeSample(rnd(i, 17), 0.95) * sw; dot(x, sy + rnd(i, 29) * sh, 5, ['c', 'g', 'm'][i % 3], rp * 0.85); }
  box(sx, sy, sw, sh, C.dim, rp * 0.6, 1);
  txt(scramble('WAVE · PARTICLE · EVENT', rp, 141), W / 2, 620, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 8 });
  txt('波 粒 整 体', W / 2, 700, { size: 52, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 014 · RECURSIVE_RELATIONAL_OBSERVATION_WAVE_PARTICLE_EVENTS', W / 2, 170, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  txt('particle event = a record at a declared interface, at a declared time', W / 2, 770, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  txt('18,518 lines · paper argument · detectors · darkness · waiting · memory', W / 2, 830, { size: 24, fam: F.mono, align: 'center', c: C.orange, a: P(S, 1, 1) });
};

/* ---- 02 CLOCK ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  /* clock dial */
  const cx = 420, cy = 450, r = 150, tick = Math.floor(t * 1.2) % 12;
  ring(cx, cy, r, C.vio, p, 3);
  for (let k = 0; k < 12; k++) { const an = k / 12 * TAU - Math.PI / 2; dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r, k === tick ? 18 : 8, k === tick ? 'g' : 'v', p); }
  const an = tick / 12 * TAU - Math.PI / 2;
  arrow(cx, cy, cx + Math.cos(an) * (r - 30), cy + Math.sin(an) * (r - 30), C.gold, p, 4);
  txt('n = ' + tick, cx, cy + r + 60, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p });
  /* two lanes L / R */
  const lx = 720, lw = 480;
  ['L', 'R'].forEach((lab, i) => {
    const y = 360 + i * 180;
    txt('|' + lab + '⟩', lx - 20, y + 10, { size: 34, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: p });
    packet(lx, y, lw, 60, -t * 5 + i * 0.0, C.cyan, p * 0.9, 2.5);
  });
  txt('ψ₀ = (|L⟩ + |R⟩)/√2', lx + lw / 2, 270, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  /* density matrix */
  const mx = 1450, my = 330, cs = 130;
  const q = P(S, 0, 3);
  txt('ρ_n  (conditioned on tick n)', mx + cs, my - 30, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q });
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const off = i !== j, hl = off ? at(S, 1, 0.6) : 0;
    box(mx + j * cs, my + i * cs, cs - 10, cs - 10, off ? C.gold : C.cyan, q, 2, off ? `rgba(60,45,0,${0.5 * hl})` : 'rgba(0,20,30,0.6)');
    txt('½', mx + j * cs + (cs - 10) / 2, my + i * cs + 80, { size: 50, fam: F.mono, w: 700, align: 'center', c: off ? C.gold : C.cyan, a: q });
  }
  txt('coherence survives every tick', mx + cs, my + 2 * cs + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: at(S, 1, 0.6) });
  txt('reading the clock  ≠  reading a click', W / 2, 820, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 1, 2), ab: 2, ls: 1 });
  thm('Prop 3.3 · clock conditioning selects no mode', W / 2, 870, P(S, 1, 3), 'center');
};

/* ---- 03 CLICK ---- */
SCENES.click = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const cyc = (t * 0.6) % 1;
  [[480, 'K = |vac⟩⟨x|', 'DESTRUCTIVE', C.mag], [1440, 'K = |x⟩⟨x|', 'MODE-PRESERVING', C.cyan]].forEach(([x, K, name, col], i) => {
    const q = P(S, 0, 0.5 + i * 1.5);
    txt(name, x, 230, { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 });
    txt(K, x, 280, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    box(x - 90, 330, 180, 150, col, q, 2.5, 'rgba(0,0,0,0.6)');
    txt('DETECTOR', x, 415, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: q });
    const ph = cyc < 0.45 ? cyc / 0.45 : 1;
    if (cyc < 0.45) dot(x - 300 + ph * 210, 405, 16, 'g', q);
    lamp(x, 300, cyc > 0.45 && cyc < 0.6 ? 1 : 0, q, 'g', 14);
    /* aftermath */
    const qa = P(S, 1, 0.5);
    if (cyc > 0.5) {
      if (i === 0) { ring(x + 180, 405, 22, C.dim, q * qa, 2); txt('vac', x + 180, 460, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q * qa }); }
      else { dot(x + 180 + Math.sin(t * 4) * 6, 405, 16, 'g', q * qa); txt('|x⟩', x + 180, 460, { size: 20, fam: F.mono, align: 'center', c: C.gold, a: q * qa }); }
    }
    /* identical statistics bars */
    const bars = [0.5, 0.3, 0.2];
    bars.forEach((b, k) => { fillBox(x - 120 + k * 90, 680 - b * 260, 60, b * 260, col, 0.7 * P(S, 0, 3)); txt('x' + (k + 1), x - 90 + k * 90, 710, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) }); });
    txt('E_x = K†K  identical', x, 750, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 4) });
    txt(i === 0 ? 'after: empty vacuum' : 'after: photon still |x⟩', x, 790, { size: 22, fam: F.mono, w: 700, align: 'center', c: col, a: qa });
  });
  txt('=', W / 2, 600, { size: 90, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 4) });
  txt('same click probability  ≠  same aftermath', W / 2, 860, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
  thm('Prop 4.3', W / 2, 330, P(S, 1, 3), 'center');
};

/* ---- 04 RECORDS ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'classic']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const D = clamp(0.5 - 0.5 * Math.cos(t * 0.7));
    const V = Math.sqrt(1 - D * D);
    fringes(240, 260, 900, 200, V, p0, C.cyan);
    txt('screen · fringe visibility', 690, 240, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p0 });
    /* record overlap bars */
    fillBox(240, 520, 900 * D, 34, C.mag, 0.75 * p0); box(240, 520, 900, 34, C.dim, p0, 1);
    txt('which-path distinguishability  D = ' + D.toFixed(2), 240, 510, { size: 22, fam: F.mono, w: 700, c: C.mag, a: p0 });
    fillBox(240, 610, 900 * V, 34, C.cyan, 0.75 * p0); box(240, 610, 900, 34, C.dim, p0, 1);
    txt('visibility  V = ' + V.toFixed(2), 240, 600, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: p0 });
    /* quarter circle */
    const ox = 1330, oy = 700, rr = 300;
    plotAxes(ox, oy, rr + 40, rr + 40, p0, 'D', 'V');
    curve(q => [ox + rr * Math.sin(q * Math.PI / 2), oy - rr * Math.cos(q * Math.PI / 2)], 60, C.gold, p0, 3);
    dot(ox + rr * D, oy - rr * V, 22, 'g', p0);
    txt('D² + V² = 1', ox + 190, oy - rr - 40, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) * p0, ab: 2 });
    thm('pure_record_distinguishability_coherence_complementarity', W / 2, 800, P(S, 0, 6) * p0, 'center');
    thm('D5/S3/Quantum/PureState/RecordCoherenceComplementarity · Englert 1996', W / 2, 830, P(S, 0, 6) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const pan = [[C.gold, '+ subset', 0], [C.vio, '− subset', Math.PI]];
    pan.forEach(([col, lab, ph], i) => {
      const y = 230 + i * 190, q = P(S, 1, 1 + i);
      for (let x = 0; x < 900; x += 3) { const I = 0.5 * (1 + Math.cos(x / 900 * TAU * 4 + ph)); fillBox(510 + x, y, 3, 140, col, q * (0.06 + 0.85 * I)); }
      box(510, y, 900, 140, C.dim, q * 0.6, 1);
      txt(lab, 490, y + 80, { size: 26, fam: F.mono, w: 700, align: 'right', c: col, a: q });
    });
    const q2 = P(S, 1, 4);
    fillBox(510, 610, 900, 140, C.white, q2 * 0.45); box(510, 610, 900, 140, C.dim, q2 * 0.6, 1);
    txt('unsorted', 490, 690, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: q2 });
    txt('flat', 1440, 690, { size: 26, fam: F.mono, w: 700, c: C.white, a: q2 });
    txt('read record in d± = (d_L ± d_R)/√2 · conditional fringes return', W / 2, 800, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2) });
    thm('Prop 5.4 · quantum eraser: Scully–Drühl 1982', W / 2, 840, P(S, 1, 3), 'center');
  }
};

/* ---- 05 DARK ---- */
SCENES.dark = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    txt('detector watches  B = (L + R)/√2', W / 2, 220, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
    const rows = [['B', '(L+R)/√2', 'clicks at once', 1, 'g'], ['L', '|L⟩', 'clicks ½', 0.5, 'c'], ['D', '(L−R)/√2', 'never clicks', 0, 'm']];
    const run = Math.floor(t * 0.8), cyc = (t * 0.8) % 1;
    rows.forEach(([nm, st, lab, pr, col], i) => {
      const y = 330 + i * 150, q = P(S, 0, 1 + i * 1.5);
      txt(nm, 300, y + 12, { size: 50, fam: F.orb, w: 900, align: 'center', c: C[{ g: 'gold', c: 'cyan', m: 'mag' }[col]], a: q });
      txt(st, 450, y + 10, { size: 26, fam: F.mono, w: 700, c: C.white, a: q });
      if (cyc < 0.5) dot(700 + cyc / 0.5 * 500, y, 14, col, q);
      const on = pr === 1 ? 1 : pr === 0 ? 0 : (rnd(run, 7) < 0.5 ? 1 : 0);
      lamp(1260, y, cyc >= 0.5 && cyc < 0.8 ? on : 0, q, 'g', 30);
      txt(lab, 1340, y + 10, { size: 28, fam: F.mono, w: 700, c: pr === 0 ? C.mag : C.gold, a: q });
      if (pr === 0) txt('∅', 1260, y + 16, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q * 0.8 });
    });
    thm('Prop 13.5 · coherent cancellation gives a protocol-dark direction', W / 2, 800, P(S, 0, 6) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('𝒟 = ⋂ ker(L_x Qⁿ) = ker G_d', W / 2, 260, { size: 50, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1, ab: 2 });
    txt('G_d = I − (Q†)ᵈ Qᵈ    · finite algebra, d steps', W / 2, 330, { size: 28, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 1) });
    /* survival decaying to dark weight */
    const gx = 460, gy = 700, gw = 1000, gh = 280, pd = 0.35;
    plotAxes(gx, gy, gw, gh, P(S, 1, 2), 'rounds N', 'survival S_N');
    curve(q => [gx + q * gw, gy - gh * (pd + (1 - pd) * Math.pow(0.8, q * 30))], 120, C.cyan, P(S, 1, 2.5) * clamp((u - lineAt(S, 1).s - 2.5) / 3), 3);
    line(gx, gy - gh * pd, gx + gw, gy - gh * pd, C.mag, P(S, 1, 4), 2);
    txt('→ Tr(ρ P_𝒟)  = never click', gx + gw - 10, gy - gh * pd - 16, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: P(S, 1, 4) });
    thm('dark_space_eq_survival_defect_kernel · …/Measurement/FiniteDetectionDarkSpace', W / 2, 790, P(S, 1, 5), 'center');
    thm('finite_detection_survival_limit · …/Measurement/FiniteDetectionSurvivalLimit', W / 2, 820, P(S, 1, 5.5), 'center');
  }
};

/* ---- 06 ZENO ---- */
SCENES.zeno = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'classic');
  const p0 = at(S, 0, 0.6);
  /* rotating state: free vs watched */
  const cy = 420, r = 150;
  [[420, 'watch only at T', 0], [1500, 'watch N times', 1]].forEach(([cx, lab, w], i) => {
    const q = i === 0 ? p0 : P(S, 1, 0.3);
    ring(cx, cy, r, C.cyan, q * 0.6, 2);
    txt('|0⟩', cx, cy - r - 20, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q });
    txt('|1⟩ click', cx, cy + r + 40, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: q });
    const cyc = (t * 0.35) % 1;
    let th = cyc * Math.PI;
    if (w) { const N = 8, k = Math.floor(cyc * N); th = (cyc * N - k) * Math.PI / N; }
    arrow(cx, cy, cx + Math.sin(th) * r, cy - Math.cos(th) * r, w ? C.mag : C.cyan, q, 4);
    if (w) for (let k = 0; k < 8; k++) dot(cx + 200, cy - 120 + k * 34, 10, k <= Math.floor(cyc * 8) ? 'm' : 'v', q * 0.8);
    txt(lab, cx, cy + r + 90, { size: 26, fam: F.mono, w: 700, align: 'center', c: w ? C.mag : C.cyan, a: q });
  });
  /* bar chart P(click by T) vs N, ωT = π/2 */
  const gx = 700, gy = 720, gw = 520, gh = 300, q = P(S, 1, 1.5);
  plotAxes(gx, gy, gw, gh, q, 'checks N', 'P(click by T)');
  for (let N = 1; N <= 20; N++) {
    const pc = 1 - Math.pow(Math.cos(Math.PI / 2 / N), 2 * N), qq = P(S, 1, 1.5 + N * 0.15);
    fillBox(gx + 8 + (N - 1) * 25.5, gy - pc * gh, 18, pc * gh, N === 1 ? C.cyan : C.mag, 0.8 * qq);
  }
  txt('sin²(ωT)', gx + 40, gy - gh + 20, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: q });
  txt('1 − cos²ᴺ(ωT/N) → 0', gx + gw, gy - 150, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: q });
  txt('finer looking = a different protocol, not a finer picture', W / 2, 820, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 1, 6), ab: 2 });
  thm('Prop 16.3 · ωT = π/2 · quantum Zeno: Misra–Sudarshan 1977', W / 2, 865, P(S, 1, 7), 'center');
};

/* ---- 07 CERTAIN CLICK ---- */
SCENES.certainclick = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const g = 0.3;
  txt('Q = √(1−γ) I ,   L = √γ I', W / 2, 230, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6) });
  const states = [[0.2, 0], [1.3, 1], [2.2, 3], [2.9, 5]];
  states.forEach(([th, ph], i) => {
    const x = 330 + i * 420, q = P(S, 0, 1 + i * 0.8);
    qubit(x, 400, 90, th, ph + t * 0.5, q, [C.cyan, C.mag, C.gold, C.vio][i]);
    for (let n = 1; n <= 8; n++) { const pn = g * Math.pow(1 - g, n - 1); fillBox(x - 130 + (n - 1) * 33, 700 - pn * 500, 24, pn * 500, C.green, 0.75 * P(S, 0, 3 + n * 0.12)); }
    line(x - 140, 700, x + 140, 700, C.dim, q, 1.5);
  });
  txt('γ(1−γ)ⁿ⁻¹  for every state · clicks with probability 1', W / 2, 760, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 4) });
  txt('detects everything · learns nothing', W / 2, 830, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5), ab: 2, ls: 1 });
  thm('Prop 14.5 · event-effect span 𝒱∞ = ℝ·I', W / 2, 875, P(S, 1, 2), 'center');
};

/* ---- 08 CERTIFY ---- */
SCENES.certify = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6);
  box(260, 250, 280, 170, C.dim, p0, 2, 'rgba(0,0,0,0.6)'); txt('𝔍₀', 400, 330, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 }); txt('exactly dark', 400, 390, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  box(260, 480, 280, 170, C.mag, p0, 2, 'rgba(0,0,0,0.6)'); txt('𝔍_γ', 400, 560, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p0 }); txt('clicks w.p. γ', 400, 620, { size: 22, fam: F.mono, align: 'center', c: C.mag, a: p0 });
  txt('any adaptive quantum strategy · m calls', 400, 710, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  const gx = 700, gy = 720, gw = 950, gh = 440, q = P(S, 1, 0.3);
  plotAxes(gx, gy, gw, gh, q, 'calls m  (0 … 200)', 'best error');
  line(gx, gy - gh, gx + gw, gy - gh, C.dim, q * 0.6, 1);
  txt('½ = coin flip', gx + gw, gy - gh - 12, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: q });
  [[0.1, C.cyan], [0.03, C.gold], [0.01, C.mag]].forEach(([g, col], i) => {
    const qq = P(S, 1, 1 + i * 0.7);
    curve(s => [gx + s * gw, gy - gh * Math.pow(1 - g, s * 200)], 120, col, qq, 3);
    txt('γ = ' + g, gx + gw + 10, gy - gh * Math.pow(1 - g, 200) + 6 - (2 - i) * 24, { size: 18, fam: F.mono, w: 700, c: col, a: qq });
  });
  txt('P_err = ½ (1 − γ)ᵐ', gx + gw * 0.6, gy - gh * 0.75, { size: 46, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 0.8), ab: 2 });
  txt('silence is never a certificate', W / 2, 820, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 1, 6), ab: 2, ls: 1 });
  thm('Thm 37.2 · exact optimum over all adaptive strategies', W / 2, 865, P(S, 1, 7), 'center');
};

/* ---- 09 LATE BRANCH ---- */
SCENES.latebranch = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'classic');
  const p0 = at(S, 0, 0.6);
  /* branch tree */
  const x0 = 260, y0 = 460;
  dot(x0, y0, 24, 'c', p0); txt('start', x0, y0 + 50, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: p0 });
  const qa = P(S, 0, 1.5), qb = P(S, 0, 3.5);
  arrow(x0 + 20, y0 - 10, 620, 300, C.green, qa, 6);
  txt('1 − γ : click in round 1', 640, 305, { size: 24, fam: F.mono, w: 700, c: C.green, a: qa });
  arrow(x0 + 20, y0 + 10, 620, 620, C.mag, qb, 1.5);
  txt('γ : miss', 470, 600, { size: 22, fam: F.mono, w: 700, c: C.mag, a: qb });
  fillBox(640, 600, 1000 * qb, 40, C.mag, 0.55 * qb);
  txt('then wait  1/γ  rounds', 1140, 690, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 5) });
  /* mean vs gamma */
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('𝔼N = 1 + γ · (1/γ) = 2', W / 2, 230, { size: 52, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1, ab: 2 });
    const gx = 1350, gy = 480, gw = 380, gh = 200;
    plotAxes(gx, gy, gw, gh, P(S, 1, 1.5), 'γ', '𝔼N');
    line(gx + 10, gy - gh * 0.9, gx + gw, gy - gh * 0.9, C.gold, P(S, 1, 2), 3);
    ring(gx + 10, gy - gh * 0.9, 9, C.gold, P(S, 1, 2), 2.5);
    dot(gx, gy - gh * 0.45, 16, 'c', P(S, 1, 3));
    txt('2', gx - 16, gy - gh * 0.9 + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.gold, a: P(S, 1, 2) });
    txt('1 at γ = 0', gx + 20, gy - gh * 0.45 + 8, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: P(S, 1, 3) });
    txt('「稀有的迟到分支可以携带一个完整单位的平均时间」', W / 2, 800, { size: 34, fam: F.zh, w: 900, align: 'center', c: C.white, a: P(S, 1, 5), ab: 2 });
    thm('Prop 47.3 · two-state return example: Grünbaum–Velázquez–Werner–Werner (arXiv:1202.3903)', W / 2, 850, P(S, 1, 6), 'center');
  }
};

/* ---- 10 RADIUS ---- */
SCENES.radius = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6);
  const cx = 520, cy = 500, rs = 300;
  for (let i = 0; i < 60; i++) dot(cx + (rnd(i, 3) - 0.5) * 700, cy + (rnd(i, 5) - 0.5) * 600, 4, 'v', p0 * 0.4);
  ring(cx, cy, rs, C.gold, p0, 3);
  dot(cx, cy, 20, 'c', p0); txt('Γ₀ design', cx, cy + 48, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: p0 });
  const dr = rs * (0.2 + 0.78 * (0.5 - 0.5 * Math.cos(t * 0.6)));
  const an = t * 0.25;
  dot(cx + Math.cos(an) * dr, cy + Math.sin(an) * dr, 16, dr > rs * 0.93 ? 'm' : 'g', p0);
  line(cx, cy, cx + Math.cos(an) * dr, cy + Math.sin(an) * dr, C.dim, p0 * 0.6, 1.5);
  txt('schematic · instrument space', cx, cy - rs - 20, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p0 });
  txt('R = √((11+5√5)/32) = φ^{5/2}/4', 1340, 280, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3), ab: 2 });
  txt('≈ ' + R14.toFixed(5), 1340, 340, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 4) });
  thm('Thm 102.1 · exact failure radius of the model instrument', 1340, 380, P(S, 0, 5), 'center');
  const gx = 980, gy = 720, gw = 700, gh = 300, q = P(S, 1, 0.3);
  plotAxes(gx, gy, gw, gh, q, 'distance to edge  h', 'worst mean wait');
  const c = PHI14 / 16;
  curve(s => { const h = 0.02 + s * 0.3; return [gx + (h - 0.02) / 0.3 * gw, gy - Math.min(gh, c / (h * h) * 12)]; }, 120, C.mag, q * clamp((u - lineAt(S, 1).s) / 2), 3);
  txt('𝒦(R − h) ~ (φ/16) · h⁻²', gx + gw / 2 + 120, gy - gh + 40, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 2) });
  txt('φ/16 ≈ ' + c.toFixed(5), gx + gw / 2 + 120, gy - gh + 85, { size: 24, fam: F.mono, align: 'center', c: C.mag, a: P(S, 1, 3) });
  txt('the golden ratio sets the price of getting close', W / 2, 830, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5), ab: 2 });
  thm('Thm 113.1', gx + gw / 2 + 120, gy - gh + 120, P(S, 1, 4), 'center');
};

/* ---- 11 RECURSIVE ---- */
SCENES.recursive = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const devs = [[0.15, C.cyan], [0.85, C.mag]];
  const gx = 260, gy = 620, gw = 600, gh = 360;
  const p0 = at(S, 0, 0.6);
  plotAxes(gx, gy, gw, gh, p0, 'first wait t', 'density');
  devs.forEach(([r, col], i) => curve(s => { const x = s * 6; return [gx + s * gw, gy - gh * Math.exp(-x)]; }, 100, col, P(S, 0, 1 + i), i ? 3 : 7));
  txt('μ₁ = e⁻ᵗ dt  for both', gx + gw / 2, gy - gh - 55, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2.5) });
  const hx = 1060, q = P(S, 1, 0.3);
  plotAxes(hx, gy, gw, gh, q, 'two-event total t', 'density');
  devs.forEach(([r, col], i) => {
    curve(s => { const x = s * 6; return [hx + s * gw, gy - gh * 1.2 * ((1 - r) + r * x) * Math.exp(-x)]; }, 100, col, P(S, 1, 1 + i), 3);
    txt(`r = ${r} → mean ${(1 + r).toFixed(2)}`, hx + gw - 20, gy - gh + 30 + i * 40, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: P(S, 1, 1.5 + i) });
  });
  txt('μ₂ = ((1 − r) + r t) e⁻ᵗ dt', hx + gw / 2, gy - gh - 55, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2) });
  txt('「相同的首个等待律，不保证相同的递归等待律」', W / 2, 760, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.white, a: P(S, 1, 4), ab: 2 });
  thm('Thm 137.1 · r = Tr(P_* ζ), the leftover re-enters the next round', W / 2, 815, P(S, 1, 5), 'center');
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    badge(fade * clamp(u / 0.8), 'lean');
    txt('one relation · two readings', W / 2, 230, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 0.3) * fade, ls: 2 });
    const mods = ['PureState/RecordCoherenceComplementarity', 'Measurement/FiniteDetectionDarkSpace', 'Measurement/FiniteDetectionSurvivalLimit', 'Measurement/GeneralInstrumentDarkClosure', 'Measurement/GeneralInstrumentNoDarkDirection', 'Measurement/GeneralInstrumentSurvivalLimit', 'Measurement/GeneralInstrumentDetectionCertificate', 'Measurement/GeneralInstrumentEffectClosure'];
    mods.forEach((m, i) => { const q = P(S, 1, 0.3 + i * 0.35) * fade; txt('✓ D5/S3/Quantum/' + m, 560, 320 + i * 42, { size: 22, fam: F.mono, w: 700, c: C.green, a: q }); });
    txt('「只保存已实现路径不能保证反事实干预完整」', W / 2, 720, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 5, 1) * fade, ab: 2 });
    thm('Thm 161.1 · the volume itself adds no Lean; these frozen modules formalize matching results', W / 2, 775, P(S, 1, 6) * fade, 'center');
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    const sx = 460, sw = 1000;
    for (let i = 0; i < 700; i++) dot(sx + fringeSample(rnd(i, 17), 0.95) * sw, 250 + rnd(i, 29) * 230, 5, ['c', 'g', 'm'][i % 3], ep * out * 0.85);
    txt('WAVE · PARTICLE · EVENT', W / 2, 640, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 8 });
    txt('波 粒 整 体 · TRURETURING FILM 014', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('A particle is a record, at a declared interface.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'WAVE?', clock: 'CLOCK ≠ CLICK', click: 'AFTERMATH', records: 'RECORDS', dark: 'DARK SPACE', zeno: 'ZENO', certainclick: 'CERTAIN CLICK', certify: 'SILENCE', latebranch: 'LATE BRANCH', radius: 'GOLDEN RADIUS', recursive: 'RECURSIVE WAIT', finale: 'RELATION' });

function poster14() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const sx = 360, sw = 1200;
  for (let i = 0; i < 1400; i++) dot(sx + fringeSample(rnd(i, 17), 0.95) * sw, 250 + rnd(i, 29) * 380, 6, ['c', 'g', 'm'][i % 3], 0.85);
  txt('波还是粒子？都只是记录的读法', W / 2, 170, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('WAVE · PARTICLE · EVENT', W / 2, 820, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 8 });
  bloom(0.65);
  txt('波 粒 整 体  ·  粒子事件是声明接口上的记录', W / 2, 910, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 014', W / 2, 970, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster14;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
