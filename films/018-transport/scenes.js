/* Film 018 — TRANSPORT · MEMORY · COMPLETION · 运输·任务记忆·完备化. */

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


/* ---- film 018 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = { theory: ['THEORY VOLUME · PAPER PROOF', C.orange, 'rgba(40,20,0,0.75)'] }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
function node(x, y, lab, col, a, r = 34) {
  if (a <= 0) return;
  ring(x, y, r, col, a, 3);
  ctx.globalAlpha = a * 0.25; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  txt(lab, x, y + r * 0.35, { size: r * 0.9, fam: F.mono, w: 700, align: 'center', c: C.white, a });
}
function cell(x, y, s, v, col, a) { box(x, y, s, s, col, a, 2, 'rgba(0,0,0,0.5)'); txt(String(v), x + s / 2, y + s * 0.66, { size: s * 0.42, fam: F.mono, w: 700, align: 'center', c: col, a }); }
function phasor(x, y, r, an, col, a) { ring(x, y, r, C.dim, a * 0.6, 1.5); arrow(x, y, x + Math.cos(an) * r, y - Math.sin(an) * r, col, a, 3); }

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t, sp = clamp(u / 1.5);
  for (let i = 0; i < 40; i++) { const x = 200 + i * 38, y = 420 + Math.sin(i * 0.5 + t) * 60; dot(x, y, 6, i < 28 ? 'v' : 'g', sp * (i < 28 ? 0.35 : 1)); }
  box(1260, 330, 360, 180, C.gold, sp, 2.5, 'rgba(40,30,0,0.4)'); txt('carried forward', 1440, 315, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: sp });
  txt('seen', 700, 300, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.vio, a: sp });
  const p1 = at(S, 1, 0.8);
  [['TRANSPORT', C.cyan], ['MEMORY', C.gold], ['COMPLETION', C.mag]].forEach(([l, col], i) => { const q = P(S, 1, 1 + i * 1.5); const x = W / 2 + (i - 1) * 420; box(x - 170, 620, 340, 90, col, q, 2.5, 'rgba(0,0,0,0.5)'); txt(l, x, 677, { size: 30, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 }); });
  txt('only what the next legal step still needs', W / 2, 800, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t, rp = clamp(u / 1.2);
  const cx = W / 2, cy = 330;
  for (let k = 0; k < 6; k++) { const an = k / 6 * TAU + t * 0.3; const x = cx + Math.cos(an) * 180, y = cy + Math.sin(an) * 90; dot(x, y, 12, ['c', 'g', 'm'][k % 3], rp); const an2 = (k + 1) / 6 * TAU + t * 0.3; line(x, y, cx + Math.cos(an2) * 180, cy + Math.sin(an2) * 90, C.dim, rp * 0.6, 1.5); }
  phasor(cx, cy, 50, t * 1.3, C.gold, rp);
  txt(scramble('TRANSPORT · MEMORY · COMPLETION', rp, 181), W / 2, 620, { size: 76, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 6 });
  txt('运 输 · 任 务 记 忆 · 完 备 化', W / 2, 700, { size: 46, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 018 · RECURSIVE_RELATIONAL_OBSERVATION_TRANSPORT_MEMORY_COMPLETION', W / 2, 170, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 1 });
  txt('inverse ≠ executable operation', W / 2, 775, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  txt('repair ≠ reusable legal channel', W / 2, 820, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 1) });
};

/* ---- 02 ANCHOR ---- */
SCENES.anchor = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), phi = Math.PI * (0.5 + 0.5 * Math.sin(t * 0.5));
  node(420, 400, 's', C.cyan, p, 44); node(900, 400, 't', C.cyan, p, 44);
  arrow(470, 400, 850, 400, C.gold, p, 3);
  txt('e^{iφ}', 660, 380, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p });
  phasor(660, 510, 50, phi, C.gold, p);
  txt('no loop', 660, 610, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    ['s', 't'].forEach((n, i) => { const x = 420 + i * 480; line(x - 30, 330, x + 30, 330, C.green, p1, 4); txt('ref fixed', x, 315, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.green, a: p1 }); });
    const I = Math.pow(Math.abs(2 * Math.cos(phi / 2)), 2);
    txt('|1 + e^{iφ}|² = ' + I.toFixed(2), 1400, 340, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1, ab: 2 });
    txt('φ = 0 → 4      φ = π → 0', 1400, 400, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) });
    fillBox(1200, 620 - I * 45, 400, I * 45, C.cyan, 0.6 * p1);
    txt('invariants = m − n + k', 1400, 700, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5), ab: 2 });
    txt('(edges − vertices + reference count)', 1400, 740, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 5) });
    thm('Example 1.7 · Thm 1.9 · Cor 1.10', W / 2, 820, P(S, 1, 6), 'center');
  }
};

/* ---- 03 PHASE ---- */
SCENES.phase = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    [['h = i', Math.PI / 2, C.cyan], ['h = −i', -Math.PI / 2, C.mag]].forEach(([l, an, col], i) => {
      const x = 560 + i * 800;
      txt(l, x, 250, { size: 32, fam: F.mono, w: 700, align: 'center', c: col, a: p0 });
      phasor(x, 380, 80, an, col, p0);
      const q = P(S, 0, 4);
      txt('θ = 0 : I = 2', x, 540, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
      txt('θ = π/2 : I = ' + (i ? 4 : 0), x, 600, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q * p0 });
    });
    txt('I(θ) = |1 + e^{iθ} h|² = 2 + 2 Re(e^{iθ} h)', W / 2, 720, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 * P(S, 0, 2) });
    txt('h = (I₀ − 2)/2 − i (I_{π/2} − 2)/2', W / 2, 790, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 * P(S, 0, 6), ab: 2 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const m = 6, k = Math.min(m, Math.floor((u - lineAt(S, 1).s - 2) * 0.8));
    phasor(620, 440, 150, 0, C.cyan, p1); phasor(1300, 440, 150, Math.PI * Math.max(0, k) / m, C.mag, p1);
    txt('h = 1', 620, 250, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    txt('h_m = e^{iπ/m}', 1300, 250, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p1 });
    txt(`after ${Math.max(0, k)} of m = ${m} repetitions`, W / 2, 660, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('hᵐ = 1   vs   h_mᵐ = −1   : distance 2', W / 2, 720, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 7), ab: 2 });
    thm('Prop 2.9 · Counterexample 2.12', W / 2, 800, P(S, 1, 8), 'center');
  }
};

/* ---- 04 MEMORY ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const cx = 700, cy = 450, R = 180, an = t * 0.8, turns = Math.floor(an / TAU);
    ring(cx, cy, R, C.dim, p0, 2);
    const sgn = turns % 2 === 0 ? 1 : -1;
    dot(cx + Math.cos(an) * R, cy + Math.sin(an) * R * 0.6, 20, sgn > 0 ? 'c' : 'm', p0);
    txt(sgn > 0 ? '+1' : '−1', cx, cy + 12, { size: 60, fam: F.orb, w: 900, align: 'center', c: sgn > 0 ? C.cyan : C.mag, a: p0 });
    txt('fiber flips once per turn', cx, cy + R + 60, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p0 });
    txt('task reads branch → |M| = 2', 1400, 400, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 3) * p0 });
    txt('task reads position → |M| = 1', 1400, 470, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5) * p0 });
    thm('§2.4 · circle_double_cover_history_lift', W / 2, 800, p0 * P(S, 0, 6), 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('F = {1,2,3} · a = (12) · b = (23) · read "am I at 1?"', W / 2, 230, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    const rows = [['ab', '0', 'then a → 0', C.cyan], ['ba', '0', 'then a → 1', C.mag]];
    rows.forEach(([w, r, n, col], i) => { const y = 340 + i * 140, q = P(S, 1, 1.5 + i); txt(w, 520, y + 12, { size: 44, fam: F.orb, w: 900, align: 'center', c: col, a: q }); txt('reading ' + r, 820, y + 12, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); txt(n, 1200, y + 12, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: P(S, 1, 4 + i) }); });
    txt('|G| = 6 operations   ·   |M| = 3 memory states', W / 2, 650, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 6), ab: 2 });
    txt('counting windings is not enough', W / 2, 720, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 1, 7) });
    thm('§2.5 · stabiliser {id,(23)} not normal: memory = cosets', W / 2, 800, P(S, 1, 8), 'center');
  }
};

/* ---- 05 GLUING ---- */
SCENES.gluing = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), p1 = at(S, 1, 0.6);
  txt('keep only r₁₂, r₂₃, r₃₁ (pairwise XOR)', W / 2, 230, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  for (let i = 0; i < 8; i++) {
    const r = [(i >> 2) & 1, (i >> 1) & 1, i & 1], ok = (r[0] ^ r[1] ^ r[2]) === 0;
    const x = 300 + (i % 4) * 340, y = 300 + Math.floor(i / 4) * 200, q = P(S, 0, 1 + i * 0.3);
    const col = p1 > 0.5 ? (ok ? C.green : C.red) : C.cyan;
    box(x, y, 280, 140, col, q, 2, 'rgba(0,0,0,0.5)');
    r.forEach((b, k) => txt(String(b), x + 60 + k * 80, y + 80, { size: 40, fam: F.mono, w: 700, align: 'center', c: col, a: q }));
    txt(p1 > 0.5 ? (ok ? 'global ✓' : 'no global lift') : 'pairwise ✓', x + 140, y + 125, { size: 18, fam: F.mono, w: 700, align: 'center', c: col, a: q });
  }
  txt('r₁₂ ⊕ r₂₃ ⊕ r₃₁ = 0  :  4 of 8 are real', W / 2, 740, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
  txt('compression can break gluing', W / 2, 800, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
};

/* ---- 06 STAR ---- */
SCENES.star = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), n = 8, cx = 620, cy = 470, R = 230;
  const on = Math.floor(t * 1.2) % n;
  node(cx, cy, '0', C.cyan, p, 36);
  for (let i = 0; i < n; i++) { const an = i / n * TAU - Math.PI / 2, x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R; line(cx, cy, x, y, C.dim, p, 2); node(x, y, i === on ? '1' : '0', i === on ? C.gold : C.dim, p, 28); }
  txt('at most one leaf on', cx, cy + R + 70, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  txt('each edge off by only 1/n', 1380, 330, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  const p1 = at(S, 1, 0.6);
  txt('nearest consistent whole: distance 1', 1380, 410, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.red, a: p1 });
  txt('H_n^opt = n', 1380, 510, { size: 56, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2), ab: 2 });
  txt('no cycles needed', 1380, 580, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 3) });
  txt('sum-of-edge-errors norm → constant 1', 1380, 650, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
  thm('§3.6.5 (TM.75–TM.77) · Hoffman error bound credited', W / 2, 800, P(S, 1, 6), 'center');
};

/* ---- 07 GRID ---- */
SCENES.grid = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const c = [[1, 4, 2, 7], [3, 1, 5, 2], [6, 2, 1, 3]], d = [[1, 5, 7, 14], [4, 5, 10, 12], [10, 7, 8, 11]];
  const p = at(S, 0, 0.6), cs = 110, gx = 260, gy = 260;
  const shown = Math.min(12, Math.floor((u - 1) * 2));
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) {
    const k = i * 4 + j, done = k < shown;
    cell(gx + j * cs, gy + i * cs, cs - 10, done ? d[i][j] : c[i][j], done ? (k === 11 ? C.gold : C.cyan) : C.dim, p);
  }
  txt('d_ij = c_ij + min(d_{i−1,j}, d_{i,j−1})', gx + 2 * cs, gy - 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  txt('corner = 11', gx + 2 * cs, gy + 3 * cs + 50, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 6) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const bars = [['rows', 4, C.cyan], ['columns', 3, C.mag], ['waves (keep old)', 6, C.orange], ['best of 35 frontiers', 3, C.gold]];
    bars.forEach(([l, v, col], i) => { const y = 280 + i * 100, q = P(S, 1, 0.5 + i * 1); fillBox(1120, y, v * 90, 60, col, 0.7 * q); txt(l, 1100, y + 40, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: q }); txt(String(v), 1130 + v * 90, y + 42, { size: 26, fam: F.mono, w: 700, c: C.white, a: q }); });
    txt('peak memory', 1350, 250, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p1 });
    thm('§4.1 (TM.31–32) · uniform recurrences: Karp–Miller–Winograd 1967 · Austrin–Pitassi–Wu', W / 2, 800, P(S, 1, 5), 'center');
  }
};

/* ---- 08 SAMPLING ---- */
SCENES.sampling = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6);
  cell(460, 320, 110, 'X₁', C.cyan, p); arrow(580, 375, 700, 375, C.dim, p, 3); cell(710, 320, 110, 'X₂', C.mag, P(S, 0, 1.5));
  txt('each step legal on its own', 640, 490, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p });
  txt('target S = {00, 11}', 640, 260, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    [['legal step by step', 0.75, '3/4', C.cyan], ['static capacity table', 1.0, '1', C.orange]].forEach(([l, v, lab, col], i) => { const x = 1180 + i * 260, q = P(S, 1, 0.5 + i * 1.5); fillBox(x, 650 - v * 350, 150, v * 350, col, 0.7 * q); txt(lab, x + 75, 630 - v * 350, { size: 36, fam: F.mono, w: 700, align: 'center', c: col, a: q }); txt(l, x + 75, 690, { size: 18, fam: F.mono, w: 700, align: 'center', c: col, a: q }); });
    txt('optimum (3,1,1,3)/8  vs  (½,0,0,½)', 640, 620, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 3) });
    txt('order is a real constraint', W / 2, 770, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5), ab: 2 });
    thm('Prop 4.5 (TM.223–TM.225) · Counterexample 4.4', W / 2, 820, P(S, 1, 6), 'center');
  }
};

/* ---- 09 CARRY ---- */
SCENES.carry = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), pp = 8, a0 = 3, k0 = 5;
  const n = Math.max(0, Math.min(8, Math.floor((u - 1.5) * 0.9)));
  const v = a0 + n, hi = (k0 + Math.floor(v / pp)) % pp, lo = v % pp;
  cell(620, 300, 130, hi, C.gold, p); cell(760, 300, 130, '?', C.dim, p);
  txt('high', 685, 470, { size: 22, fam: F.mono, align: 'center', c: C.gold, a: p }); txt('low (hidden)', 825, 470, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p });
  txt('step +' + n, 755, 270, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p });
  const tau = pp - a0;
  txt(n >= tau ? `carry at τ = ${tau}  ⇒  low digit = p − τ = ${pp - tau}` : 'waiting for the carry…', 755, 540, { size: 26, fam: F.mono, w: 700, align: 'center', c: n >= tau ? C.gold : C.dim, a: P(S, 0, 2) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('fewest reads: ⌈log₂ P⌉', 1450, 300, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    txt('shortest wait: P − 1', 1450, 360, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 1) });
    txt('not both at once', 1450, 420, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.red, a: P(S, 1, 2) });
    txt('W_j = (j − 1)·2^j + 1', 1450, 520, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
    txt('P = 8 (j = 3): W = 17', 1450, 580, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
    thm('§6.6.3 (CE.30) · §6.8 · Thm 6.5', W / 2, 800, P(S, 1, 6), 'center');
  }
};

/* ---- 10 CLOCK ---- */
SCENES.clock = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), cx = 520, cy = 460, R = 190;
  for (let i = 0; i < 8; i++) { const an = -Math.PI / 2 + i / 8 * TAU; dot(cx + Math.cos(an) * R, cy + Math.sin(an) * R, i === 7 ? 18 : 9, i === 7 ? 'g' : 'v', p); txt(String(i), cx + Math.cos(an) * (R + 36), cy + Math.sin(an) * (R + 36) + 8, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p }); }
  txt('phase S = N mod 8', cx, cy + 10, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  [['run A: source 0', 'N = 7'], ['run B: source 1', 'N = 15']].forEach(([l, n], i) => { const y = 330 + i * 110, q = P(S, 0, 2 + i); txt(l, 1100, y, { size: 26, fam: F.mono, w: 700, c: i ? C.mag : C.cyan, a: q }); txt(n + '  →  S = 7, Y = 0', 1100, y + 40, { size: 24, fam: F.mono, c: C.white, a: q }); });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('+1 bit: parity of full periods (N mod 16)', 1300, 580, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    txt('I(R; S, Y) = 11/4  of  H(R) = 3 bits', 1300, 660, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3), ab: 2 });
    txt('a quarter bit lost to clock randomness', 1300, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
    thm('Props 7.1–7.3 · Thm 10.2 (j = 3, fair-coin schedule)', W / 2, 810, P(S, 1, 6), 'center');
  }
};

/* ---- 11 LABELS ---- */
SCENES.labels = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p = at(S, 0, 0.6), cx = 500, cy = 470, R = 200;
  const nd = 22;
  for (let i = 0; i < nd; i++) { const an = i / nd * TAU; dot(cx + Math.cos(an) * R, cy + Math.sin(an) * R, 10, ['c', 'm', 'g', 'v'][i % 4], p); }
  const e = 0.5 + 0.3 * Math.sin(t);
  ctx.globalAlpha = 0.2 * p; ctx.fillStyle = C.red; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R + 30, -e, e); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
  txt('clock error ±ε', cx + R + 60, cy + 8, { size: 20, fam: F.mono, w: 700, c: C.red, a: p });
  txt('labels = chromatic number of the clash graph', 1350, 320, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  txt('ε < 1 : 2    1 ≤ ε < 2 : 4    3 ≤ ε < 4 : 8', 1350, 380, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('m = 5, j = 7 : 121 types', 1350, 470, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('any reading: ≤ 10 candidates', 1350, 530, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 1) });
    txt('10 colors cover ≤ 120 types', 1350, 590, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 2.5) });
    txt('11 labels required', 1350, 670, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
    thm('Thm 11.3 · Thm 11.5 · Prop 11.12 · coloring idea: Witsenhausen 1976 · k-fold webs: Campêlo et al. 2013', W / 2, 810, P(S, 1, 6), 'center');
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const rec = [['anchors add invariants: m − n + k', C.cyan], ['memory is set by the task: 2 or 1, 3 not 6', C.gold], ['local checks ≠ global lift', C.mag], ['order is real: 3/4, not 1', C.vio], ['a hidden schedule costs one bit', C.green]];
    rec.forEach(([r, col], i) => txt('▸ ' + r, 520, 260 + i * 70, { size: 30, fam: F.mono, w: 700, c: col, a: P(S, 0, 0.5 + i * 1.2) * fade }));
    txt('Carry forward what the next legal step needs.', W / 2, 720, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 0.5) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5), cx = W / 2, cy = 350;
    for (let k = 0; k < 6; k++) { const an = k / 6 * TAU + t * 0.3; dot(cx + Math.cos(an) * 180, cy + Math.sin(an) * 90, 12, ['c', 'g', 'm'][k % 3], ep * out); }
    phasor(cx, cy, 50, t * 1.3, C.gold, ep * out);
    txt('TRANSPORT · MEMORY · COMPLETION', W / 2, 640, { size: 72, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 6 });
    txt('运 输 · 任 务 记 忆 · 完 备 化 · TRURETURING FILM 018', W / 2, 712, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Not one bit more.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'CARRY FORWARD', anchor: 'ANCHOR', phase: 'PHASE', memory: 'TASK MEMORY', gluing: 'GLUING', star: 'STAR REPAIR', grid: 'DP ORDER', sampling: 'LEGAL ORDER', carry: 'CARRY', clock: 'CLOCK BIT', labels: 'LABELS', finale: 'NOT ONE BIT MORE' });

function poster18() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  for (let i = 0; i < 8; i++) { const r = [(i >> 2) & 1, (i >> 1) & 1, i & 1], ok = (r[0] ^ r[1] ^ r[2]) === 0; const x = 330 + (i % 4) * 330, y = 290 + Math.floor(i / 4) * 190; box(x, y, 270, 140, ok ? C.green : C.red, 1, 3, 'rgba(0,0,0,0.5)'); r.forEach((b, k) => txt(String(b), x + 60 + k * 75, y + 85, { size: 44, fam: F.mono, w: 700, align: 'center', c: ok ? C.green : C.red })); }
  txt('局部都对，整体却不存在', W / 2, 170, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('TRANSPORT · MEMORY · COMPLETION', W / 2, 850, { size: 80, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 6 });
  bloom(0.65);
  txt('运 输 · 任 务 记 忆 · 完 备 化', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 018', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster18;
/* keep scene content above the two-language subtitle block */
Object.keys(NAMES).concat(['title']).forEach(id => { const f = SCENES[id]; if (!f || f.__c) return; const g = S => { ctx.save(); ctx.translate(W / 2 * (1 - 0.86), 140 * (1 - 0.86)); ctx.scale(0.86, 0.86); f(S); ctx.restore(); }; g.__c = 1; SCENES[id] = g; });
