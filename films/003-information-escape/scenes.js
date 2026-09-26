/* Film 003 — INFORMATION ESCAPE. Scenes injected into the shared engine (engine.js). */

function statusBadge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · NOT A LEAN THEOREM', C.orange, 'rgba(40,20,0,0.75)'],
    judge: ['JUDGE UNDER CONSTRUCTION · WARNINGS ONLY', C.mag, 'rgba(40,0,30,0.7)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function leak(cx, cy, R, t, a, n = 120, col = 'm') {
  for (let i = 0; i < n; i++) {
    const life = (t * 0.3 + rnd(i, 1)) % 1; const th = rnd(i, 2) * TAU;
    const r = R * (0.9 + life * 1.6);
    dot(cx + Math.cos(th) * r, cy + Math.sin(th) * r * 0.8, 6 * (1 - life) + 1.5, life > 0.3 ? col : 'c', a * (1 - life));
  }
}
function wireSphere(cx, cy, R, t, a, col = C.cyan) {
  ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 8; k++) { const lat = (k / 8 - 0.5) * Math.PI; ctx.globalAlpha = a * 0.35; ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(cx, cy + Math.sin(lat) * R, Math.cos(lat) * R, Math.cos(lat) * R * 0.25, 0, 0, TAU); ctx.stroke(); }
  for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI + t * 0.3; ctx.globalAlpha = a * 0.3; ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(Math.cos(an)) * R, R, 0, 0, TAU); ctx.stroke(); }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}

/* ---- 00 OPEN: same shadow, different things ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.2);
  const ry = t * 0.3;
  const pr = (p, cx) => proj(rotX(rotY(p, ry), 0.55), cx, 430, 900, 6);
  // cylinder (left) and sphere (right) with identical top-down shadows
  const L = 640, R_ = 1280;
  ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k <= 6; k++) { const y = -0.9 + k * 0.3; ctx.beginPath(); for (let s = 0; s <= 40; s++) { const an = s / 40 * TAU; const q = pr([Math.cos(an) * 0.9, y, Math.sin(an) * 0.9], L); s ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.globalAlpha = sp * 0.5; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5; ctx.stroke(); }
  for (let s = 0; s < 12; s++) { const an = s / 12 * TAU; const a1 = pr([Math.cos(an) * 0.9, -0.9, Math.sin(an) * 0.9], L), a2 = pr([Math.cos(an) * 0.9, 0.9, Math.sin(an) * 0.9], L); ctx.globalAlpha = sp * 0.4; ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(a2[0], a2[1]); ctx.stroke(); }
  for (let k = 1; k < 8; k++) { const lat = (k / 8 - 0.5) * Math.PI; ctx.beginPath(); for (let s = 0; s <= 40; s++) { const an = s / 40 * TAU; const q = pr([Math.cos(an) * 0.9 * Math.cos(lat), 0.9 * Math.sin(lat), Math.sin(an) * 0.9 * Math.cos(lat)], R_); s ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.globalAlpha = sp * 0.5; ctx.strokeStyle = C.mag; ctx.stroke(); }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  // shadows
  const shp = clamp((u - 2) / 1.5);
  [L, R_].forEach((cx, i) => {
    ctx.globalAlpha = shp * 0.35; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.ellipse(cx, 760, 190, 50, 0, 0, TAU); ctx.fill();
    ctx.globalAlpha = shp; ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.stroke(); ctx.globalAlpha = 1;
    for (let k = -2; k <= 2; k++) line(cx + k * 70, 600, cx + k * 76, 740, C.gold, shp * 0.2, 1);
  });
  txt('=', W / 2, 780, { size: 80, fam: F.orb, w: 900, align: 'center', c: C.gold, a: shp });
  txt('SAME SHADOW', W / 2, 860, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: shp, ls: 8 });
  const ep = at(S, 1, 0.8);
  if (ep > 0) {
    // the difference escaping
    for (let i = 0; i < 40; i++) { const life = (t * 0.35 + rnd(i, 3)) % 1; const x = lerp(W / 2, W / 2 + (rnd(i, 4) - 0.5) * 900, life), y = lerp(430, 60, life); dot(x, y, 8 * (1 - life) + 2, 'm', ep * (1 - life)); }
    txt('Δ  ESCAPES', W / 2, 240, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.mag, a: ep, ab: 3, ls: 6 });
  }
  const mp = at(S, 2, 0.6);
  txt('MEASURE THE LEAK', W / 2, 180, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: mp, ls: 10 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  wireSphere(W / 2, 420, 250, t, 0.8, C.vio);
  leak(W / 2, 420, 250, t, 0.9, 140);
  const rp = clamp(u / 1.4);
  txt(scramble('INFORMATION ESCAPE', rp, 31), W / 2, 450, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', ab: 6, ls: 10 });
  txt('信 息 逃 逸', W / 2, 545, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.mag, a: clamp((u - 0.7) / 0.7), ab: 3 });
  txt('TRURETURING · FILM 003', W / 2, 610, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - 1) / 0.7), ls: 8 });
  const qs = ['WHERE DID IT ESCAPE?', 'HOW WAS IT HANDLED?', 'WHAT NEW INFORMATION?', 'WHERE DOES IT CONTINUE?'];
  const L0 = lineAt(S, 0); const len = L0.e - L0.s; const bnd = [0, 0.24, 0.5, 0.74];
  qs.forEach((q, i) => {
    const p = clamp((u - L0.s - bnd[i] * len) / 0.4);
    txt(`0${i + 1}  ${q}`, i % 2 ? W - 120 : 120, i < 2 ? 220 : 800, { size: 26, fam: F.orb, w: 700, align: i % 2 ? 'right' : 'left', c: [C.cyan, C.gold, C.green, C.mag][i], a: p, ls: 3 });
  });
};

/* ---- 02 ARENA: 4 states, 12 pairs, exact rate ---- */
const AST = [['00', 0, 0], ['01', 0, 1], ['10', 1, 0], ['11', 1, 1]];
function arenaDraw(cx, cy, s, forgetB, merge, t, a) {
  const pos = AST.map(([lab, x, y]) => { const px = cx + (x - 0.5) * s, py = cy + (y - 0.5) * s * (1 - merge * 0.85); return [px, py]; });
  let escaped = 0;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    if (i === j) continue;
    const same = forgetB ? AST[i][1] === AST[j][1] : false;
    if (same) escaped++;
    if (j < i) continue;
    const [x1, y1] = pos[i], [x2, y2] = pos[j];
    const off = 10;
    line(x1 + off, y1 + off, x2 + off, y2 + off, same ? C.red : C.cyan, a * (same ? 0.95 : 0.45), same ? 4 : 2);
    line(x1 - off, y1 - off, x2 - off, y2 - off, same ? C.red : C.cyan, a * (same ? 0.95 : 0.45), same ? 4 : 2);
  }
  pos.forEach(([x, y], i) => { dot(x, y, 52, 'w', a); txt(AST[i][0], x, y + 12, { size: 30, fam: F.orb, w: 900, align: 'center', c: '#02030a', a }); });
  return escaped;
}
SCENES.arena = S => {
  const u = S.u, t = S.t;
  statusBadge(clamp(u / 0.8), 'lean');
  const L = S.L;
  const forget = u > L[2].s + 1.5;
  const merge = ease(clamp((u - L[2].s - 1.5) / 1.2));
  const ap = at(S, 0, 0.8);
  const esc = arenaDraw(620, 500, 460, forget, merge, t, ap);
  // readout switches
  const sw = (x, y, lab, on) => { box(x, y, 300, 70, on ? C.green : C.dim, ap, 2, on ? 'rgba(0,40,20,0.6)' : null); txt(lab + (on ? '  ON' : '  FORGOTTEN'), x + 150, y + 46, { size: 26, fam: F.orb, w: 700, align: 'center', c: on ? C.green : C.dim, a: ap }); };
  sw(1180, 300, 'READ SWITCH 1', true);
  sw(1180, 400, 'READ SWITCH 2', !forget);
  const n = forget ? Math.round(4 * merge) : 0;
  txt(`ε = ${n} / 12`, 1330, 620, { size: 90, fam: F.orb, w: 900, align: 'center', c: n ? C.red : C.cyan, a: at(S, 1, 0.6), ab: 3 });
  txt(n === 4 ? '= 1/3' : '= 0', 1330, 700, { size: 50, fam: F.orb, w: 900, align: 'center', c: n ? C.red : C.cyan, a: at(S, 1, 0.6) });
  txt('ε = |escape pairs| / n(n−1)', 1330, 780, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6, 3) });
  txt('ExactRate.lean · escapeRate', 1330, 820, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: at(S, 0, 0.6, 3) });
};

/* ---- 03 CAPTURE ---- */
SCENES.capture = S => {
  const u = S.u, t = S.t;
  statusBadge(clamp(u / 0.8), 'lean');
  const L = S.L;
  const cp = at(S, 0, 0.6) * (1 - at(S, 2, 0.5));
  if (cp > 0) {
    const pulled = clamp((u - L[0].s - 3) / 1);
    for (let i = 0; i < 5; i++) {
      const x = 180 + i * 190, y = 260 - (i === 2 ? pulled * 120 : 0);
      box(x, y, 150, 200, i === 2 ? C.gold : C.cyan, cp * (i === 2 ? 1 : 0.6), 2, 'rgba(4,10,24,0.7)');
      txt(`T${i + 1}`, x + 75, y + 70, { size: 44, fam: F.orb, w: 900, align: 'center', c: i === 2 ? C.gold : C.cyan, a: cp });
      txt('theorem', x + 75, y + 110, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: cp });
      wireSphere(x + 75, y + 160, 22, t + i, cp * 0.6);
    }
    // pair field: some pairs turn gold = unique captures of T3
    for (let k = 0; k < 60; k++) {
      const x = 200 + (k % 15) * 60, y = 560 + Math.floor(k / 15) * 60;
      const uc = rnd(k, 8) < 0.18 && pulled > 0.5;
      dot(x, y, uc ? 16 : 8, uc ? 'g' : 'c', cp * (uc ? 1 : 0.4));
    }
    txt('UNIQUE CAPTURES OF T3', 650, 850 - 30, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.gold, a: cp * pulled, ls: 3 });
    const ip = at(S, 1, 0.6);
    txt('lowers escape', 1520, 340, { size: 36, fam: F.orb, w: 700, align: 'center', c: C.white, a: ip });
    txt('⟺', 1520, 410, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.gold, a: ip });
    txt('unique capture > 0', 1520, 480, { size: 36, fam: F.orb, w: 700, align: 'center', c: C.white, a: ip });
    txt('⟺', 1520, 550, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.gold, a: at(S, 1, 0.6, 3) });
    txt('others cannot rebuild its view', 1520, 620, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: at(S, 1, 0.6, 3) });
    txt('StructuralNovelty.lean · IE-010, IE-011', 1520, 690, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: ip });
  }
  const zp = at(S, 2, 0.6);
  if (zp > 0) {
    panel(360, 220, 1200, 520, zp, C.mag, 'THREE READOUTS · x , y , identity · 4 states');
    const rows = [['nothing', 12], ['x', 4], ['y', 4], ['identity', 0]];
    rows.forEach(([r, v], i) => {
      const p = clamp((u - L[2].s - i * 0.8) / 0.4) * zp; const y = 330 + i * 90;
      txt(`read ${r}`, 440, y, { size: 36, fam: F.mono, w: 700, c: C.white, a: p });
      ctx.globalAlpha = p; ctx.fillStyle = v ? C.red : C.green; ctx.fillRect(800, y - 30, v * 50, 36); ctx.globalAlpha = 1;
      txt(`${v} escape`, 820 + v * 50, y, { size: 30, fam: F.orb, w: 700, c: v ? C.red : C.green, a: p });
    });
    txt('unique capture of each = 0', 960, 710, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: clamp((u - L[2].s - 4) / 0.5) * zp, ls: 2 });
  }
};

/* ---- 04 LADDER ---- */
SCENES.ladder = S => {
  const u = S.u, t = S.t;
  statusBadge(clamp(u / 0.8), 'lean');
  const L = S.L;
  const rungs = [['OBSERVE', 136, C.cyan], ['INTERVENE', 44, C.gold], ['COUNTERFACTUAL', 0, C.mag]];
  // ladder rails
  const lx = 520, top = 190, bot = 800;
  line(lx - 200, bot, lx - 130, top, C.dim, 0.8, 4); line(lx + 200, bot, lx + 130, top, C.dim, 0.8, 4);
  txt('2,256 pairs', lx, bot + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 0, 0.6) });
  rungs.forEach(([lab, v, col], i) => {
    const y = bot - 170 - i * 200; const p = clamp((u - L[1].s - [0, 3.5, 7][i]) / 0.6);
    line(lx - 185 + i * 22, y, lx + 185 - i * 22, y, col, p, 6);
    txt(lab, lx + 260, y + 10, { size: 32, fam: F.orb, w: 900, c: col, a: p, ls: 4 });
    txt(`${v} escape`, lx + 260, y + 56, { size: 28, fam: F.mono, w: 700, c: C.white, a: p });
    // particles falling through the rung = escape
    const n = Math.round(v / 6);
    for (let k = 0; k < n; k++) { const life = (t * 0.5 + rnd(k, i)) % 1; dot(lx - 150 + rnd(k, i + 9) * 300, y + 10 + life * 150, 5, 'r', p * (1 - life)); }
  });
  const big = [2256, 136, 44, 0];
  const idx = u < L[1].s + 0.5 ? 0 : u < L[1].s + 4 ? 1 : u < L[1].s + 7.5 ? 2 : 3;
  txt(big[idx].toLocaleString('en-US'), 1450, 480, { size: 160, fam: F.orb, w: 900, align: 'center', c: idx === 3 ? C.green : C.white, a: at(S, 0, 0.6), ab: 4 });
  txt('indistinguishable pairs left', 1450, 540, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: at(S, 0, 0.6) });
  const sp = at(S, 2, 0.6);
  txt('SEE · DO · IMAGINE', 1450, 700, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.gold, a: sp, ab: 2, ls: 6 });
  txt('UnifiedCausalMeasurements.lean', 1450, 760, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: at(S, 0, 0.6) });
};

/* ---- 05 BLIND CORE ---- */
SCENES.blind = S => {
  const u = S.u, t = S.t;
  statusBadge(clamp(u / 0.8), 'lean');
  const L = S.L;
  const cx = 720, cy = 520;
  // residual pairs: removable (outer) vs blind (core)
  const cuts = clamp((u - L[0].s - 1) / 6);
  for (let k = 0; k < 90; k++) {
    const blindP = k < 18;
    const an = rnd(k, 1) * TAU, r = blindP ? 40 + rnd(k, 2) * 80 : 150 + rnd(k, 3) * 230;
    const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r * 0.75;
    const removed = !blindP && rnd(k, 4) < cuts;
    dot(x, y, blindP ? 16 : 11, blindP ? 'r' : removed ? 'v' : 'o', removed ? 0.25 : 0.95);
  }
  // definition cuts (auxiliary lines)
  for (let c = 0; c < 6; c++) { const p = clamp(cuts * 6 - c); if (p <= 0) continue; const an = c * 0.52 + 0.3; const dx = Math.cos(an), dy = Math.sin(an); const off = 170 + (c % 3) * 60; const x0 = cx + dy * off, y0 = cy - dx * off; line(x0 - dx * 330 * p, y0 - dy * 330 * p, x0 + dx * 330 * p, y0 + dy * 330 * p, C.cyan, 0.8, 2); }
  txt('definition = auxiliary line', 150, 190, { size: 26, fam: F.orb, w: 700, c: C.cyan, a: at(S, 0, 0.6), ls: 2 });
  const bp = at(S, 1, 0.6);
  if (bp > 0) {
    ctx.globalAlpha = bp * (0.5 + 0.3 * Math.sin(t * 4)); ctx.strokeStyle = C.red; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, cy, 140, 110, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    txt('BLIND CORE', cx, cy - 130, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.red, a: bp, ls: 4 });
    txt('residual  =  blind core  +  removable confusion', 1450, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: bp });
    txt('blind_residual_charge_decomposition', 1450, 400, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: bp });
  }
  const np = at(S, 2, 0.6);
  if (np > 0) {
    txt('blind core ≠ ∅', 1450, 520, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.red, a: np, ab: 2 });
    txt('⟹ no family of definitions recovers the target', 1450, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: np });
    txt('blind_kernel_obstruction', 1450, 615, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: np });
    stamp('NEED A NEW LANGUAGE', 1450, 740, clamp((u - L[2].s - 7) / 0.4), C.gold, 40, -0.04);
  }
};

/* ---- 06 BUDGET ---- */
SCENES.budget = S => {
  const u = S.u, t = S.t;
  statusBadge(clamp(u / 0.8), 'lean');
  const L = S.L;
  const gx = 200, gy = 780, gw = 700, gh = 500;
  const p0 = at(S, 0, 0.6);
  line(gx, gy, gx + gw, gy, C.dim, p0, 2); line(gx, gy, gx, gy - gh, C.dim, p0, 2);
  txt('budget →', gx + gw - 100, gy + 36, { size: 20, fam: F.mono, c: C.dim, a: p0 });
  txt('residual leak', gx, gy - gh - 16, { size: 20, fam: F.mono, c: C.dim, a: p0 });
  const floor = 0.25;
  ctx.setLineDash([10, 8]); line(gx, gy - floor * gh, gx + gw, gy - floor * gh, C.red, p0, 2); ctx.setLineDash([]);
  txt('blind floor', gx + gw + 10, gy - floor * gh + 8, { size: 20, fam: F.orb, w: 700, c: C.red, a: p0 });
  const dr = clamp((u - L[0].s) / 3.5);
  ctx.globalAlpha = p0; ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath();
  for (let k = 0; k <= 60 * dr; k++) { const b = k / 60; const v = floor + (1 - floor) * Math.exp(-b * 4); k ? ctx.lineTo(gx + b * gw, gy - v * gh) : ctx.moveTo(gx + b * gw, gy - v * gh); } ctx.stroke(); ctx.globalAlpha = 1;
  txt('budget_envelope_infimum_and_limit', gx, gy + 70, { size: 18, fam: F.mono, c: C.dim, a: p0 });
  const cp = at(S, 1, 0.6);
  if (cp > 0) {
    const hx = 1060, hy = 780;
    line(hx, hy, hx + gw, hy, C.dim, cp, 2); line(hx, hy, hx, hy - gh, C.dim, cp, 2);
    const d2 = clamp((u - L[1].s - 1) / 5);
    ctx.globalAlpha = cp; ctx.strokeStyle = C.mag; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(hx, hy - gh * 0.95); ctx.lineTo(hx + gw * d2, hy - gh * 0.95); ctx.stroke(); ctx.globalAlpha = 1;
    txt('spectrum = 1  at every finite budget', hx + 20, hy - gh * 0.95 - 20, { size: 24, fam: F.mono, w: 700, c: C.mag, a: cp });
    txt('no pair is blind', hx + 20, hy - 120, { size: 32, fam: F.orb, w: 700, c: C.green, a: clamp((u - L[1].s - 3) / 0.5) });
    txt('the leak never closes', hx + 20, hy - 70, { size: 32, fam: F.orb, w: 700, c: C.red, a: clamp((u - L[1].s - 5.5) / 0.5) });
    txt('free_ultrafilter_charge_countermodel', hx, hy + 70, { size: 18, fam: F.mono, c: C.dim, a: cp });
  }
  const fp = at(S, 2, 0.5);
  if (fp > 0) { ctx.globalAlpha = fp * 0.8; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 380, W, 220); ctx.globalAlpha = 1; txt('STOP GRINDING.  CHANGE THE FRAME.', W / 2, 510, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.gold, a: fp, ab: 3, ls: 4 }); }
};

/* ---- 07 DIAGONAL ---- */
SCENES.diagonal = S => {
  const u = S.u, t = S.t;
  statusBadge(clamp(u / 0.8), 'lean');
  const L = S.L;
  const N = 11, cs = 50, x0 = 260, y0 = 190;
  const walk = clamp((u - L[0].s - 3) / 4) * N;
  const flip = at(S, 1, 0.5);
  for (let i = 0; i < N; i++) {
    txt(`row ${i}`, x0 - 20, y0 + i * cs + 34, { size: 16, fam: F.mono, align: 'right', c: C.dim, a: 0.9 });
    for (let j = 0; j < N; j++) {
      const b = rnd(i * 13 + j, 5) < 0.5 ? 0 : 1; const d = i === j;
      const lit = d && i < walk;
      box(x0 + j * cs, y0 + i * cs, cs - 6, cs - 6, lit ? C.gold : C.cyan, lit ? 1 : 0.25, lit ? 2.5 : 1, lit ? 'rgba(60,40,0,0.5)' : null);
      txt(String(b), x0 + j * cs + 22, y0 + i * cs + 33, { size: 24, fam: F.mono, w: 700, align: 'center', c: lit ? C.gold : C.white, a: lit ? 1 : 0.5 });
    }
  }
  if (flip > 0) {
    const yr = y0 + N * cs + 30;
    txt('new', x0 - 20, yr + 34, { size: 16, fam: F.mono, align: 'right', c: C.mag, a: flip });
    for (let j = 0; j < N; j++) {
      const b = rnd(j * 13 + j, 5) < 0.5 ? 1 : 0; const p = clamp((u - L[1].s - j * 0.15) / 0.3);
      box(x0 + j * cs, yr, cs - 6, cs - 6, C.mag, p, 2.5, 'rgba(60,0,40,0.5)');
      txt(String(b), x0 + j * cs + 22, yr + 33, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p });
      line(x0 + j * cs + 22, y0 + j * cs + 44, x0 + j * cs + 22, yr, C.mag, p * 0.3, 1);
    }
    txt('∉ CATALOG', x0 + N * cs + 40, yr + 38, { size: 44, fam: F.orb, w: 900, c: C.mag, a: clamp((u - L[1].s - 2.5) / 0.4), ab: 3 });
  }
  const tx = 1260;
  txt('diagonal(a) = twist( catalog a a )', tx, 300, { size: 30, fam: F.mono, w: 700, c: C.white, a: at(S, 0, 0.6, 2) });
  txt('twist has no fixed point', tx, 350, { size: 26, fam: F.mono, c: C.gold, a: at(S, 0, 0.6, 3) });
  txt('⟹  diagonal ∉ range(catalog)', tx, 420, { size: 34, fam: F.orb, w: 900, c: C.mag, a: flip });
  txt('constructive_diagonal_escape', tx, 470, { size: 20, fam: F.mono, c: C.dim, a: flip });
  const qp = at(S, 2, 0.6);
  txt('NO FIXED CATALOG', tx, 590, { size: 40, fam: F.orb, w: 900, c: C.white, a: qp, ls: 3 });
  txt('IS COMPLETE', tx, 640, { size: 40, fam: F.orb, w: 900, c: C.white, a: qp, ls: 3 });
  txt('diagonalization generates escape;', tx, 720, { size: 24, fam: F.raj, w: 600, c: C.cyan, a: at(S, 2, 0.6, 3) });
  txt('observation decides whether it stays visible', tx, 755, { size: 24, fam: F.raj, w: 600, c: C.cyan, a: at(S, 2, 0.6, 3) });
};

/* ---- 08 CREATE ---- */
SCENES.create = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  statusBadge(at(S, 1, 0.5) * (1 - at(S, 2, 0.5) * 0.0), 'theory');
  const cols = 8, rows = 6, x0 = 220, y0 = 230, dx = 100, dy = 80;
  const cut = ease(clamp((u - L[1].s - 1) / 3));
  for (let c = 0; c < cols; c++) {
    line(x0 + c * dx, y0 - 30, x0 + c * dx, y0 + rows * dy - 40, C.dim, 0.5, 1.2);
    for (let r = 0; r < rows; r++) {
      const target = (c + r) % 3 === 0; // target separates these
      const upper = r < 3;
      const off = cut * (upper ? -18 : 18);
      const surv = (c % 2 === 0) && target && upper;
      dot(x0 + c * dx + off, y0 + r * dy, surv ? 16 : 11, surv && cut > 0.5 ? 'r' : target ? 'g' : 'c', 0.9);
    }
  }
  if (cut > 0) { ctx.globalAlpha = cut; ctx.strokeStyle = C.mag; ctx.lineWidth = 4; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.moveTo(x0 - 60, y0 + 2.5 * dy); ctx.lineTo(x0 + cols * dx - 40, y0 + 2.5 * dy); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; txt('new definition d', x0 - 60, y0 + 2.5 * dy - 16, { size: 22, fam: F.orb, w: 700, c: C.mag, a: cut }); }
  txt('the object did not change —', x0, 140 + 30, { size: 26, fam: F.orb, w: 700, c: C.white, a: at(S, 0, 0.6), ls: 2 });
  txt('the fiber structure describing it did', x0, 700, { size: 26, fam: F.orb, w: 700, c: C.gold, a: at(S, 0, 0.6, 3), ls: 2 });
  txt('𝓔(q ∨ d ; T)  =  𝓔(q ; T) ∩ ker d', 1480, 420, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.white, a: at(S, 1, 0.6), ab: 1 });
  txt('surviving escape = old merges the new cut cannot split', 1480, 480, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: at(S, 1, 0.6, 1) });
  txt('Definition Escape Completion Theory · §3', 1480, 520, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: at(S, 1, 0.6, 1) });
  const cp = at(S, 2, 0.5);
  if (cp > 0) {
    ctx.globalAlpha = cp * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(0, 590, W, 230); ctx.globalAlpha = 1;
    txt('CREATION', W / 2, 680, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.white, a: cp, ab: 3, ls: 10 });
    txt('= STRUCTURAL ESCAPE + LOW-COST RECOVERY', W / 2, 770, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.gold, a: cp, ab: 2, ls: 2 });
  }
};

/* ---- 09 COPIER ---- */
SCENES.copier = S => {
  const u = S.u, t = S.t;
  statusBadge(clamp(u / 0.8), 'lean');
  const L = S.L;
  panel(240, 200, 760, 560, clamp(u / 0.6), C.cyan, 'PAST RECORDS  →  COPIED TABLE');
  for (let i = 0; i < 8; i++) {
    const p = clamp((u - L[0].s - i * 0.4) / 0.3);
    const y = 280 + i * 56;
    txt(`record ${i + 1}`, 280, y, { size: 24, fam: F.mono, c: C.white, a: p });
    txt(`answer ${String.fromCharCode(65 + (i * 7) % 26)}`, 520, y, { size: 24, fam: F.mono, c: C.cyan, a: p });
    txt('✓', 900, y, { size: 26, fam: F.orb, w: 900, c: C.green, a: p });
  }
  txt('retrospective loss  =  0.000', 1400, 330, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.green, a: at(S, 0, 0.5, 4) });
  const fp = at(S, 1, 0.5);
  if (fp > 0) {
    txt('next record  →  ?', 1400, 460, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: fp });
    // crossed eye
    const ex = 1400, ey = 560;
    ctx.globalAlpha = fp; ctx.strokeStyle = C.red; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex - 90, ey); ctx.quadraticCurveTo(ex, ey - 60, ex + 90, ey); ctx.quadraticCurveTo(ex, ey + 60, ex - 90, ey); ctx.stroke();
    ctx.beginPath(); ctx.arc(ex, ey, 22, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ex - 100, ey - 60); ctx.lineTo(ex + 100, ey + 60); ctx.stroke(); ctx.globalAlpha = 1;
    txt('fails NonAnticipating', 1400, 670, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: fp });
    stamp('HINDSIGHT ≠ FORESIGHT', 1400, 780, clamp((u - L[1].s - 2.5) / 0.4), C.gold, 40, -0.04);
    txt('lookup_copy_zero_loss_and_nonanticipating_failure', 620, 820, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: fp });
  }
};

/* ---- 10 JUDGE ---- */
SCENES.judge = S => {
  const u = S.u, t = S.t;
  statusBadge(clamp(u / 0.8), 'judge');
  const L = S.L;
  const fp = at(S, 0, 0.6) * (1 - at(S, 1, 0.6) * 0.3);
  panel(160, 190, 1000, 560, fp, C.cyan, 'Reg/D5/S3/StatisticalMechanics/HardCore/SquareGridCoordinates.lean');
  const lines_ = [['register_information_theorem', ' recenter_direction', C.mag], ['  escape from', ' (Fin 3)', C.cyan], ['  readout via', ' (homogeneousPointwiseEqRealization …)', C.gold], ['  realizes', ' …bridge…', C.green], ['  escape continues', ' (recenterResidual)', C.red]];
  const lab = ['', '① where did it escape?', '② how was it read?', '③ what does it realize?', '④ where does it continue?'];
  lines_.forEach(([k, v, col], i) => {
    const p = clamp((u - L[0].s - 0.5 - i * 1.6) / 0.5) * fp; const y = 280 + i * 92;
    txt(k, 200, y, { size: 26, fam: F.mono, w: 700, c: col, a: p });
    txt(v, 200 + tw(k, 26, F.mono, 700), y, { size: 26, fam: F.mono, c: C.white, a: p });
    if (lab[i]) txt(lab[i], 200, y + 34, { size: 20, fam: F.raj, w: 600, c: C.dim, a: p });
  });
  const cp = at(S, 1, 0.6) * (1 - at(S, 2, 0.4));
  if (cp > 0) {
    const v1 = Math.floor(95 * eo(clamp((u - L[1].s) / 2))), v2 = Math.floor(50 * eo(clamp((u - L[1].s - 3) / 2)));
    txt(String(v1), 1480, 360, { size: 130, fam: F.orb, w: 900, align: 'center', c: C.white, a: cp, ab: 4 });
    txt('registrations', 1480, 410, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: cp });
    txt(String(v2), 1480, 560, { size: 110, fam: F.orb, w: 900, align: 'center', c: C.gold, a: clamp((u - L[1].s - 3) / 0.4), ab: 3 });
    txt('say: escape continues (open)', 1480, 610, { size: 24, fam: F.mono, align: 'center', c: C.gold, a: clamp((u - L[1].s - 3) / 0.4) });
    txt('an honest unknown — not impossibility', 1480, 660, { size: 22, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].s - 6) / 0.4) });
  }
  const wp = at(S, 2, 0.6);
  if (wp > 0) {
    ctx.globalAlpha = wp * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(1200, 190, 560, 560); ctx.globalAlpha = 1;
    txt('WITNESS', 1480, 290, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.red, a: wp, ls: 6 });
    const pos = [[1340, 480], [1480, 380], [1620, 480]];
    pos.forEach(([x, y], i) => { dot(x, y, 40, i < 2 ? 'r' : 'c', wp); txt(String(i), x, y + 12, { size: 30, fam: F.orb, w: 900, align: 'center', c: '#02030a', a: wp }); });
    line(pos[0][0], pos[0][1], pos[1][0], pos[1][1], C.red, wp, 4);
    txt('0 and 1 still indistinguishable', 1480, 590, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: wp });
    txt('checked:  decide +kernel', 1480, 630, { size: 22, fam: F.mono, align: 'center', c: C.green, a: wp });
    stamp('WARNS · NEVER BLOCKS', 1480, 720, clamp((u - L[2].s - 6) / 0.4), C.mag, 32, -0.04);
  }
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t;
  const L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.5) / 1.5);
  if (fade > 0) {
    // refinement chain: bar splitting at most n-1 times
    const n = 8; const steps = Math.min(n - 1, Math.floor(clamp((u - L[0].s) / 4) * (n - 1)));
    for (let k = 0; k <= steps; k++) {
      const y = 200 + k * 50; const parts = k + 1;
      for (let q = 0; q < parts; q++) { const w = 700 / parts; box(160 + q * w, y, w - 6, 34, C.cyan, fade * 0.8, 1.5, 'rgba(0,40,60,0.4)'); }
    }
    txt(`strict refinements ≤ n − 1 = ${n - 1}`, 160, 620, { size: 28, fam: F.mono, w: 700, c: C.green, a: fade * at(S, 0, 0.5, 2) });
    txt('strict_chain_length_le_card_sub_one', 160, 660, { size: 18, fam: F.mono, c: C.dim, a: fade * at(S, 0, 0.5, 2) });
    wireSphere(1380, 440, 200, t, fade * 0.8, C.vio);
    leak(1380, 440, 200, t, fade * at(S, 0, 0.5, 5), 120);
    txt('but every fixed catalog leaks along its diagonal', 1380, 720, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.mag, a: fade * at(S, 0, 0.5, 5) });
    txt('WHERE DOES INFORMATION CONTINUE TO ESCAPE?', W / 2, 820, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: fade * at(S, 1, 0.5), ab: 3, ls: 3 });
  }
  const ep = clamp((u - L[1].e - 1.2) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    wireSphere(W / 2, 330, 210, t, ep * out * 0.8, C.vio); leak(W / 2, 330, 210, t, ep * out, 160);
    grid(t, 0.5 * ep * out, H * 0.66, C.mag);
    txt('INFORMATION ESCAPE', W / 2, 640, { size: 96, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', a: ep * out, ab: 5, ls: 10 });
    txt('信 息 逃 逸 · TRURETURING FILM 003', W / 2, 710, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.mag, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.2) / 0.8) * out });
    txt('The leak is the map.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'SHADOW', arena: 'ARENA', capture: 'UNIQUE-CAPTURE', ladder: 'CAUSAL-LADDER', blind: 'BLIND-CORE', budget: 'BUDGET', diagonal: 'DIAGONAL', create: 'CREATION', copier: 'LOOKUP-COPIER', judge: 'THE-JUDGE', finale: 'CONTINUES' });

function poster3() {
  const t = 22.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  wireSphere(W / 2, 470, 280, t, 0.9, C.vio); leak(W / 2, 470, 280, t, 1, 220);
  grid(t, 0.6, H * 0.68, C.mag);
  txt('每一种描述，都漏掉了什么', W / 2, 200, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('INFORMATION ESCAPE', W / 2, 520, { size: 130, fam: F.orb, w: 900, align: 'center', c: '#f4fdff', ab: 6, ls: 10 });
  bloom(0.65);
  txt('信 息 逃 逸  ·  测量漏洞，就是找到方向', W / 2, 640, { size: 44, fam: F.zh, w: 700, align: 'center', c: C.mag });
  panel(W / 2 - 560, 730, 1120, 110, 1, C.cyan, 'LEAN KERNEL · MACHINE-CHECKED');
  txt('ε = 4/12 · 2256 → 136 → 44 → 0 · diagonal ∉ catalog', W / 2, 805, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white });
  txt('TRURETURING · FILM 003', W / 2, 960, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 660, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster3;
