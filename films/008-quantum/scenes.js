/* Film 008 — QUANTUM LEDGER · 量子账本. The project's quantum theory: what a proof checker will sign. */

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

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  for (let k = 0; k < 7; k++) qubit(260 + k * 233, 560 + 40 * Math.sin(t + k), 70, 1.2 + 0.8 * Math.sin(t * 0.5 + k), t * 0.7 + k, sp * 0.9, [C.cyan, C.mag, C.gold][k % 3], t);
  txt(scramble('A MYSTERY?', at(S, 0, 1.0), 9), W / 2, 230, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp * (1 - at(S, 1, 0.5)), ab: 3, ls: 8 });
  const p1 = at(S, 1, 0.6);
  ['WHAT GETS RECORDED', 'WHAT CAN BE READ', 'WHAT CAN NEVER BE READ'].forEach((s, i) => txt(s, W / 2, 210 + i * 56, { size: 34, fam: F.orb, w: 900, align: 'center', c: [C.cyan, C.gold, C.mag][i], a: P(S, 1, 1 + i * 1.3), ls: 3 }));
  txt('quantum rules: ASSUMED, not derived', W / 2, 800, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 9) });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const rp = clamp(u / 1.2);
  // ledger lines
  for (let k = 0; k < 18; k++) { const y = 180 + k * 40; line(160, y, 1760, y, C.cyan, 0.06 + 0.04 * Math.sin(t + k), 1); txt(Array.from({ length: 30 }, (_, j) => '0123456789abcdef'[Math.floor(rnd(k, j + Math.floor(t * 3)) * 16)]).join(''), 170, y - 8, { size: 14, fam: F.mono, c: C.dim, a: 0.3 }); }
  txt(scramble('QUANTUM LEDGER', rp, 81), W / 2, 460, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f0fbff', ab: 6, ls: 12 });
  txt('量 子 账 本', W / 2, 545, { size: 56, fam: F.zh, w: 900, align: 'center', c: C.cyan, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 008 · WHAT A PROOF CHECKER WILL SIGN', W / 2, 610, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 4 });
  const q = P(S, 0, 1);
  txt('294', W / 2 - 220, 740, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.green, a: q, ab: 2 });
  txt('Lean files · D5/S3/Quantum', W / 2 - 220, 790, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q });
  txt('SIGN', W / 2 + 220, 740, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 1), ls: 4 });
  txt('/ REFUSE', W / 2 + 220, 790, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 3), ls: 3 });
};

/* ---- 02 CHSH ---- */
SCENES.chsh = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p2 = at(S, 2, 0.5); const fade = 1 - p2;
  if (fade > 0) {
    const gx = 260, gy = 650, gw = 900, sc = 150;
    line(gx, gy, gx + gw, gy, C.dim, fade, 2);
    for (let v = 0; v <= 3; v++) { const y = gy - v * sc; line(gx - 10, y, gx, y, C.dim, fade, 2); txt(String(v), gx - 20, y + 7, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: fade }); }
    const q0 = P(S, 0, 2, 1.2);
    fillBox(gx + 150, gy - 2 * sc * q0, 220, 2 * sc * q0, C.cyan, 0.55 * fade);
    txt('CLASSICAL', gx + 260, gy + 40, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: fade, ls: 2 });
    txt('≤ 2', gx + 260, gy - 2 * sc * q0 - 20, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: q0 * fade });
    const q1 = P(S, 1, 0.5, 1.5);
    fillBox(gx + 530, gy - 2 * Math.SQRT2 * sc * q1, 220, 2 * Math.SQRT2 * sc * q1, C.mag, 0.6 * fade);
    txt('BELL STATE', gx + 640, gy + 40, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.mag, a: fade, ls: 2 });
    txt('2√2', gx + 640, gy - 2 * Math.SQRT2 * sc * q1 - 20, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, a: q1 * fade, ab: 2 });
    line(gx, gy - 2 * sc, gx + gw, gy - 2 * sc, C.cyan, 0.4 * q0 * fade, 1.5);
    txt('⟨A₀B₀⟩ + ⟨A₀B₁⟩ + ⟨A₁B₀⟩ − ⟨A₁B₁⟩', 1500, 300, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6) * fade });
    thm('classical_chsh_abs_le_two', 1500, 360, P(S, 0, 4) * fade, 'center');
    thm('bell_chsh_value', 1500, 400, P(S, 1, 2) * fade, 'center');
    thm('bell_chsh_state_expectation_is_greatest', 1500, 440, P(S, 1, 5) * fade, 'center');
    txt('max over ALL two-qubit states, this game', 1500, 490, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 5) * fade });
  }
  if (p2 > 0) {
    txt('[A₀, A₁] = 0   or   [B₀, B₁] = 0', W / 2, 330, { size: 44, fam: F.mono, w: 700, align: 'center', c: C.white, a: p2 });
    txt('⇒   CHSH²  =  4 · I', W / 2, 440, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 2, 3), ab: 2 });
    txt('NO INCOMPATIBILITY · NO QUANTUM ADVANTAGE', W / 2, 560, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 2, 6), ls: 2 });
    thm('chsh_square_eq_four_of_local_pair_commutes · landau_identity', W / 2, 610, P(S, 2, 6), 'center');
  }
};

/* ---- 03 KOCHEN–SPECKER PARITY ---- */
SCENES.ks = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  // 9 contexts as rows of 4 cells; 18 rays each appears twice
  const pairs = []; // build a 3x... simple incidence: rays 0..17, contexts 0..8 each 4 rays, each ray in 2 contexts
  const ctxs = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], [16, 17, 0, 4], [1, 8, 12, 16], [2, 5, 9, 17], [3, 6, 13, 10], [7, 11, 14, 15]];
  const p0 = at(S, 0, 0.6);
  const colOf = r => [C.cyan, C.mag, C.gold, C.green, C.vio, C.orange][r % 6];
  const hi = Math.floor(Math.max(0, u - lineAt(S, 0).s - 6) * 1.2) % 18;
  const drop = P(S, 1, 12, 0.6);
  ctxs.forEach((c, i) => {
    const y = 210 + i * 64; const q = clamp((u - lineAt(S, 0).s - 1 - i * 0.35) / 0.4) * p0;
    const gone = i === 8 ? drop : 0;
    txt(`context ${i + 1}`, 250, y + 34, { size: 18, fam: F.mono, align: 'right', c: C.dim, a: q * (1 - gone) });
    c.forEach((r, j) => {
      const x = 290 + j * 90; const on = r === hi && P(S, 0, 6) > 0 && P(S, 1, 0) === 0;
      box(x, y, 76, 50, on ? C.gold : colOf(r), q * (1 - gone), on ? 3 : 1.5, 'rgba(4,10,24,0.7)');
      txt(`r${r + 1}`, x + 38, y + 33, { size: 20, fam: F.mono, w: 700, align: 'center', c: on ? C.gold : C.white, a: q * (1 - gone) });
    });
  });
  txt('18 rays in ℂ⁴ · 9 contexts of 4 · each ray in exactly 2', 1300, 260, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) });
  txt('(schematic incidence)', 1300, 295, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 3) });
  const p1 = at(S, 1, 0.5);
  if (p1 > 0) {
    txt('each context: exactly one "yes"', 1300, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 0.5) });
    txt('count by contexts:  9  (odd)', 1300, 430, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 3) });
    txt('count by rays:  2 × (yes rays)  (even)', 1300, 480, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
    stamp('NO ANSWER SHEET', 1300, 590, P(S, 1, 7.5, 0.6), C.red, 46, -0.04);
    txt('remove any one context → an answer sheet exists', 1300, 690, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: drop });
    thm('projection_valuation_obstruction · eight_contexts_satisfiable', 1300, 730, drop, 'center');
    txt('one explicit configuration, not the general theorem', 1300, 770, { size: 18, fam: F.mono, align: 'center', c: C.orange, a: drop });
  }
};

/* ---- 04 NO CLONING ---- */
SCENES.clone = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p1 = at(S, 1, 0.5); const fade = 1 - p1;
  if (fade > 0) {
    const q = P(S, 0, 1);
    qubit(360, 480, 110, 1.0, t * 0.6, q * fade, C.cyan, t);
    txt('ψ', 360, 640, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q * fade });
    box(600, 400, 300, 160, C.gold, q * fade, 2.5, 'rgba(30,20,0,0.7)');
    txt('U', 750, 500, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.gold, a: q * fade });
    arrow(480, 480, 590, 480, C.dim, q * fade, 3);
    arrow(910, 450, 1030, 400, C.dim, P(S, 0, 3) * fade, 3); arrow(910, 510, 1030, 560, C.dim, P(S, 0, 3) * fade, 3);
    qubit(1110, 380, 70, 1.0, t * 0.6, P(S, 0, 3) * fade, C.cyan, t); qubit(1110, 580, 70, 1.0, t * 0.6, P(S, 0, 3) * fade, C.cyan, t);
    txt('⟨φ, ψ⟩  =  ⟨φ, ψ⟩²', 1540, 420, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 5) * fade });
    txt('⇒  φ = ψ   or   φ ⟂ ψ', 1540, 490, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 8) * fade });
    txt('NOTHING IN BETWEEN', 1540, 560, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 0, 10) * fade, ls: 2 });
    thm('no_cloning_inner_product_criterion', 1540, 610, P(S, 0, 8) * fade, 'center');
  }
  if (p1 > 0) {
    qubit(560, 480, 150, 1.0, t * 0.5, p1, C.cyan, t);
    ring(560, 480, 150 / 3, C.mag, P(S, 1, 2) * 0.9, 3);
    txt('ideal copy', 560, 680, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p1 });
    const gx = 1100, gy = 640;
    fillBox(gx, gy - 300 / 3, 140, 300 / 3, C.mag, 0.6 * P(S, 1, 2)); fillBox(gx + 200, gy - 600 / 3, 140, 600 / 3, C.cyan, 0.6 * P(S, 1, 2));
    txt('1/3', gx + 70, gy - 120, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.mag, a: P(S, 1, 2) });
    txt('2/3', gx + 270, gy - 220, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 1, 2) });
    txt('spectrum of each copy · best universal cloner', gx + 170, gy + 40, { size: 20, fam: F.mono, align: 'center', c: C.white, a: P(S, 1, 2) });
    txt('A COPY IS ALWAYS A BLURRED COPY', W / 2, 250, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 5), ls: 2 });
    thm('machine_reduced_spectrum', gx + 170, gy + 80, P(S, 1, 5), 'center');
  }
};

/* ---- 05 UNCERTAINTY ---- */
SCENES.uncert = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    box(W / 2 - 520, 280, 1040, 150, C.gold, p0, 2.5, 'rgba(30,20,0,0.75)');
    txt('σ_A · σ_B  ≥  ½ · | Tr ρ [A, B] |', W / 2, 375, { size: 54, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0, ab: 2 });
    // spreads: two gaussians trading width
    const k = 0.6 + 0.4 * Math.sin(t * 1.2);
    curve(tt => { const x = -3 + 6 * tt; return [360 + tt * 520, 720 - 180 * Math.exp(-x * x / (2 * k * k))]; }, 120, C.cyan, p0, 3);
    curve(tt => { const x = -3 + 6 * tt; return [1040 + tt * 520, 720 - 180 * Math.exp(-x * x * k * k / 2)]; }, 120, C.mag, p0, 3);
    txt('A', 620, 760, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: p0 }); txt('B', 1300, 760, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.mag, a: p0 });
    thm('robertson_schrodinger · mixed_state_robertson_uncertainty', W / 2, 470, P(S, 0, 4) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    qubit(560, 500, 170, 0, 0, p1, C.cyan, t); txt('Z eigenstates', 560, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    qubit(1360, 500, 170, Math.PI / 2, 0, p1, C.mag, t); txt('X eigenstates', 1360, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p1 });
    txt('∩  =  ∅', W / 2, 520, { size: 56, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 4), ab: 2 });
    txt('no state is sharp in both', W / 2, 260, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 1, 5), ls: 2 });
    thm('pauli_observables_have_no_common_eigenvector', W / 2, 780, P(S, 1, 5), 'center');
  }
};

/* ---- 06 COIN ---- */
SCENES.coin = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    qubit(500, 480, 170, Math.PI / 2, 0, p0, C.gold, t);
    txt('|+⟩ known exactly', 500, 700, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 });
    arrow(720, 480, 900, 480, C.dim, P(S, 0, 2) * p0, 3); txt('measure Z', 810, 450, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 2) * p0 });
    const flip = Math.floor(t * 3) % 2;
    const q = P(S, 0, 3);
    fillBox(1000, 600 - 150, 160, 150, C.cyan, 0.55 * q * p0); fillBox(1240, 600 - 150, 160, 150, C.mag, 0.55 * q * p0);
    txt('½', 1080, 430, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: q * p0 }); txt('½', 1320, 430, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, a: q * p0 });
    txt('0', 1080, 640, { size: 26, fam: F.mono, align: 'center', c: C.white, a: q * p0 }); txt('1', 1320, 640, { size: 26, fam: F.mono, align: 'center', c: C.white, a: q * p0 });
    dot(1560, 520, 50, flip ? 'm' : 'c', q * p0); txt(flip ? '1' : '0', 1560, 534, { size: 40, fam: F.orb, w: 900, align: 'center', c: '#02040c', a: q * p0 });
    txt('this shot?', 1560, 610, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q * p0 });
    txt('predicting the distribution  ≠  predicting the outcome', W / 2, 260, { size: 32, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) * p0, ls: 1 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const cols = [['|B⟩ = (|10⟩ + |01⟩)/√2', C.cyan], ['|D⟩ = (|10⟩ − |01⟩)/√2', C.mag]];
    cols.forEach(([lab, col], i) => {
      const x = 560 + i * 800, q = P(S, 1, 1 + i);
      txt(lab, x, 300, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a: q });
      [0, 0.5, 0.5].forEach((v, k) => { fillBox(x - 200 + k * 140, 600 - v * 400, 110, v * 400, col, 0.5 * q); txt(['00', '10', '01'][k], x - 145 + k * 140, 640, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q }); txt(v ? '½' : '0', x - 145 + k * 140, 580 - v * 400, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: q }); });
    });
    txt('identical odds', W / 2, 460, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 3) });
    txt('⟨B|D⟩ = 0', W / 2, 520, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 4), ab: 2 });
    txt('THE ODDS ARE A READOUT, NOT THE REALITY', W / 2, 740, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 7), ls: 2 });
  }
};

/* ---- 07 RECORDS ---- */
SCENES.records = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    txt('V = P ⊗ I + (I − P) ⊗ X', W / 2, 300, { size: 48, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
    txt('V† = V ,   V² = I   →   reversible', W / 2, 370, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) * p0 });
    qubit(640, 540, 100, 1.2, t * 0.5, p0, C.cyan, t); txt('system', 640, 665, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p0 });
    box(1180, 470, 240, 140, C.gold, P(S, 0, 2) * p0, 2.5, 'rgba(30,20,0,0.7)'); txt('RECORD', 1300, 550, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 2) * p0, ls: 3 });
    arrow(750, 540, 1170, 540, C.gold, P(S, 0, 2) * p0, 3);
    stamp('NO COLLAPSE BUTTON', W / 2, 760, P(S, 0, 7, 0.6) * p0, C.mag, 36, -0.03);
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const D = 0.5 + 0.5 * Math.sin(t * 0.8); const V = Math.sqrt(Math.max(0, 1 - D * D));
    fringes(300, 330, 700, 180, V, p1, C.cyan);
    txt(`visibility V = ${V.toFixed(2)}`, 650, 560, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
    // D-V quarter circle
    const cx = 1260, cy = 700, R = 360;
    curve(tt => [cx + R * Math.sin(tt * Math.PI / 2), cy - R * Math.cos(tt * Math.PI / 2)], 80, C.gold, p1, 3);
    line(cx, cy, cx + R + 30, cy, C.dim, p1, 2); line(cx, cy, cx, cy - R - 30, C.dim, p1, 2);
    txt('D', cx + R + 45, cy + 8, { size: 26, fam: F.mono, w: 700, c: C.white, a: p1 }); txt('V', cx - 12, cy - R - 40, { size: 26, fam: F.mono, w: 700, c: C.white, a: p1 });
    dot(cx + D * R, cy - V * R, 20, 'g', p1);
    txt('D² + V² = 1', 650, 680, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4), ab: 2 });
    thm('pure_record_distinguishability_coherence_complementarity', 650, 740, P(S, 1, 4), 'center');
  }
};

/* ---- 08 DECOHERENCE ---- */
SCENES.decohere = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const undo = P(S, 0, 10, 1.5);
    const V = undo > 0 ? undo : 1 - P(S, 0, 3, 1.5);
    txt('local view', 520, 280, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0, ls: 2 });
    fringes(220, 320, 600, 140, V, p0, C.cyan);
    txt(undo > 0 ? 'U† applied → coherence returns' : (V < 0.05 ? 'two different states look identical' : 'copying onto a second qubit…'), 520, 510, { size: 22, fam: F.mono, w: 700, align: 'center', c: undo > 0 ? C.green : C.white, a: p0 });
    txt('whole system', 1400, 280, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0, ls: 2 });
    qubit(1260, 440, 90, 1.1, t * 0.6, p0, C.cyan, t); qubit(1540, 440, 90, 1.1, t * 0.6 + 1, p0, C.mag, t);
    line(1350, 440, 1450, 440, C.gold, p0 * 0.8, 3);
    txt('still reversible', 1400, 600, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 0, 6) * p0 });
    txt('IRREVERSIBILITY = LIMITED ACCESS', W / 2, 720, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 0, 12) * p0, ls: 2 });
    thm('reduced_irreversibility_is_access_defect', W / 2, 770, P(S, 0, 12) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const cx = W / 2 - 300, cy = 500, R = 200;
    const nodes = [0, 1, 2].map(i => [cx + Math.cos(-Math.PI / 2 + i * TAU / 3) * R, cy + Math.sin(-Math.PI / 2 + i * TAU / 3) * R]);
    const lap = clamp((u - lineAt(S, 1).s - 2) / 5);
    for (let i = 0; i < 3; i++) { const A = nodes[i], B = nodes[(i + 1) % 3]; const on = lap * 3 > i; line(A[0], A[1], B[0], B[1], on ? C.gold : C.red, p1, 4); txt(['Z₁Z₀', 'Z₂Z₁', 'Z₀Z₂'][i], (A[0] + B[0]) / 2 + ((A[0] + B[0]) / 2 - cx) * 0.3, (A[1] + B[1]) / 2 + ((A[1] + B[1]) / 2 - cy) * 0.3 + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 }); }
    nodes.forEach(([x, y]) => dot(x, y, 26, 'c', p1));
    const ang = -Math.PI / 2 + lap * TAU; dot(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R, 18, 'g', p1 * (lap > 0 && lap < 1 ? 1 : 0));
    txt('each link alone: full dephasing', 1320, 400, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 1) });
    fringes(1060, 450, 520, 90, lap >= 1 ? 1 : 0.02, p1, C.cyan);
    txt(lap >= 1 ? 'full loop = identity · coherence returns' : 'going around…', 1320, 600, { size: 26, fam: F.mono, w: 700, align: 'center', c: lap >= 1 ? C.green : C.white, a: p1 });
  }
};

/* ---- 09 SECRET ---- */
SCENES.secret = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const cx = W / 2, cy = 500;
    dot(cx, cy - 170, 44, 'g', p0); txt('SECRET |s⟩', cx, cy - 240, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p0, ls: 2 });
    const xs = [cx - 420, cx, cx + 420];
    xs.forEach((x, i) => {
      const q = P(S, 0, 1.5 + i * 0.5) * p0;
      line(cx, cy - 130, x, cy + 20, C.gold, q * 0.5, 2);
      box(x - 130, cy + 30, 260, 150, [C.cyan, C.mag, C.green][i], q, 2.5, 'rgba(4,10,24,0.7)');
      txt(`share ${i + 1}`, x, cy + 80, { size: 22, fam: F.orb, w: 900, align: 'center', c: [C.cyan, C.mag, C.green][i], a: q, ls: 2 });
      for (let k = 0; k < 16; k++) dot(x - 100 + rnd(k, i + Math.floor(t * 8)) * 200, cy + 110 + rnd(k + 5, i + Math.floor(t * 8)) * 55, 4, 'w', q * 0.5);
    });
    txt('one share = I/3 · nothing', W / 2, cy + 250, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) * p0 });
    const two = P(S, 0, 6.5, 0.6);
    if (two > 0) { ring(xs[0], cy + 105, 150, C.gold, two * p0, 3); ring(xs[1], cy + 105, 150, C.gold, two * p0, 3); txt('any two → the whole secret', W / 2, cy + 300, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: two * p0 }); }
    thm('qutrit_single_share_maximally_mixed · qutrit_two_share_reconstruction', W / 2, 185, P(S, 0, 7) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const cx = W / 2, cy = 480, R = 200;
    const pts = [0, 1, 2].map(i => [cx + Math.cos(-Math.PI / 2 + i * TAU / 3) * R, cy + Math.sin(-Math.PI / 2 + i * TAU / 3) * R]);
    for (let i = 0; i < 3; i++) line(pts[i][0], pts[i][1], pts[(i + 1) % 3][0], pts[(i + 1) % 3][1], C.mag, p1 * 0.6, 3);
    pts.forEach(([x, y], i) => { dot(x, y, 40, ['c', 'm', 'g'][i], p1); txt('ABC'[i], x, y + 12, { size: 30, fam: F.orb, w: 900, align: 'center', c: '#02040c', a: p1 }); });
    const cut = Math.floor(Math.max(0, u - lineAt(S, 1).s - 1) / 1.6) % 3;
    const [ax, ay] = pts[cut]; line(ax - 120, ay + 90, ax + 120, ay - 90, C.gold, P(S, 1, 1), 3);
    txt('GHZ = (|000⟩ + |111⟩)/√2', W / 2, 250, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('every cut: rank 2 · reduced state I/2 · entropy log 2', W / 2, 770, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
    thm('ghz_entangled_across_every_nontrivial_cut', W / 2, 810, P(S, 1, 3), 'center');
  }
};

/* ---- 10 MEMORY / TOMOGRAPHY ---- */
SCENES.memory = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const d = 4;
    box(760, 330, 400, 400, C.cyan, p0, 2.5, 'rgba(0,20,30,0.6)');
    txt('MEMORY · d = 4', 960, 310, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: p0, ls: 2 });
    for (let k = 0; k < 7; k++) {
      const x = 200 + (k % 2) * 120, y = 330 + k * 60; const q = P(S, 0, 1 + k * 0.5) * p0;
      box(x, y, 100, 44, C.white, q, 1.5); txt(`h${k + 1}`, x + 50, y + 30, { size: 20, fam: F.mono, align: 'center', c: C.white, a: q });
      const slot = k < d ? k : -1;
      if (slot >= 0) { arrow(x + 110, y + 22, 780, 380 + slot * 90, C.green, q, 2); dot(900, 380 + slot * 90, 20, 'n', q); }
      else { line(x + 110, y + 22, 700, y + 22, C.red, q * 0.7, 2); txt('✗', 720, y + 32, { size: 28, fam: F.orb, w: 900, c: C.red, a: q }); }
    }
    txt('at most d histories', 1500, 480, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 0, 5) * p0 });
    txt('perfectly distinguishable', 1500, 530, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 0, 5) * p0 });
    thm('finite_memory_history_capacity', 1500, 580, P(S, 0, 5) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    // d^2 outcome grid (d=3 -> 9)
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const q = P(S, 1, 1 + (i * 3 + j) * 0.25); box(300 + j * 100, 330 + i * 100, 84, 84, C.gold, q, 2, 'rgba(30,20,0,0.6)'); }
    txt('≥ d² outcomes', 450, 680, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 3), ls: 1 });
    thm('povm_outcome_lower_bound', 450, 720, P(S, 1, 3), 'center');
    // d+1 MUB spheres for qubit: X,Y,Z axes
    const q2 = P(S, 1, 6);
    qubit(1350, 500, 170, Math.PI / 2, 0, q2, C.cyan, t); qubit(1350, 500, 170, Math.PI / 2, Math.PI / 2, q2, C.mag, t); qubit(1350, 500, 170, 0, 0, q2, C.gold, t);
    txt('d + 1 unbiased bases → every state determined', 1350, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: q2 });
    thm('complete_context_tomography', 1350, 760, q2, 'center');
  }
};

/* ---- 11 MUB(6) ---- */
SCENES.mub6 = S => {
  const u = S.u, t = S.t;
  badges(S, ['open', 'lean', 'open']);
  const p0 = at(S, 0, 0.6);
  const cx = W / 2 - 340, cy = 500;
  for (let b = 0; b < 4; b++) {
    const known = b < 3; const q = clamp((u - lineAt(S, 0).s - 1 - b * 0.8) / 0.6) * p0;
    const R = 220, an0 = b * Math.PI / 4 + t * 0.1 * (b + 1);
    for (let k = 0; k < 6; k++) { const an = an0 + k * TAU / 6; const x = cx + Math.cos(an) * R * (0.5 + b * 0.17), y = cy + Math.sin(an) * R * (0.5 + b * 0.17) * 0.8; if (known) dot(x, y, 12, ['c', 'm', 'g'][b], q); else ring(x, y, 12, C.vio, q * (0.5 + 0.5 * Math.sin(t * 3 + k)), 2); }
  }
  txt('dimension 6', cx, cy - 250, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0, ls: 3 });
  txt('3 bases known · a 4th?', cx, cy + 260, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 0, 4) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    box(1100, 260, 680, 110, C.green, p1, 2, 'rgba(0,30,15,0.7)');
    txt('order-three unitary: no split', 1440, 305, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.green, a: p1 });
    thm('orderThree_complementary_contexts_no_split', 1440, 345, p1, 'center');
    const q = P(S, 1, 5);
    box(1100, 400, 680, 150, C.red, q, 2, 'rgba(30,0,10,0.7)');
    txt('own proof route refuted', 1440, 445, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.red, a: q });
    txt('exact counterexample in ℚ(i, √21)', 1440, 485, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    thm('conjugate_block_common_unbiased_orthogonal_partner', 1440, 525, q, 'center');
  }
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    box(1100, 590, 680, 150, C.vio, p2, 2.5, 'rgba(20,10,40,0.85)');
    txt('局部分支证书不得被表述为', 1440, 645, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a: p2 });
    txt('六维四 MUB 已经解决', 1440, 695, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.vio, a: p2 });
    stamp('STILL OPEN', cx, cy + 330, P(S, 2, 2, 0.6), C.vio, 40, -0.04);
  }
};

/* ---- 12 RH ---- */
SCENES.rh = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'open']);
  const p0 = at(S, 0, 0.6);
  // Fibonacci chain of sites, no two adjacent excited
  const n = 11;
  const conf = [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1];
  for (let k = 0; k < n; k++) { const x = 300 + k * 120, y = 300; const on = conf[(k + Math.floor(t * 1.5)) % n] && ((k === 0) || !conf[(k - 1 + Math.floor(t * 1.5)) % n]); dot(x, y, on ? 28 : 12, on ? 'm' : 'c', p0); if (k < n - 1) line(x + 20, y, x + 100, y, C.dim, p0 * 0.6, 2); }
  txt('no two neighbours excited · Fibonacci-many configurations', W / 2, 380, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  // zeros on a line
  const zl = 560;
  line(300, zl, 1620, zl, C.dim, p0, 2);
  txt('zeros of det(I + vK)', 300, zl - 30, { size: 20, fam: F.mono, c: C.dim, a: p0 });
  const settle = P(S, 0, 6, 2);
  for (let k = 0; k < 9; k++) { const x = 380 + k * 140; const y = zl + lerp((rnd(k, 3) - 0.5) * 200, 0, ease(settle)); dot(x, y, 14, 'g', P(S, 0, 4)); }
  txt('forced onto a line', 1620, zl + 50, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.gold, a: settle });
  thm('forbidden_neighbour_determinant', W / 2, 640, settle, 'center');
  txt('RH  ⟺  a positive quantum model at EVERY order', W / 2, 220, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 0, 2), ls: 1 });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('chains cannot simply grow · proved', 700, 690, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: p1 });
    thm('source_jensen_principal_block_obstruction', 700, 728, p1, 'center');
    txt('every order · NOT PROVED', 1300, 690, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.vio, a: P(S, 1, 3), ls: 2 });
    txt('「命题 H 没有在本轮被证明」', 1300, 735, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.vio, a: P(S, 1, 5) });
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    badge(at(S, 0, 0.5) * fade * (1 - at(S, 1, 0.5)), 'open');
    txt('Born rule from escape structure?', W / 2, 250, { size: 36, fam: F.orb, w: 700, align: 'center', c: C.vio, a: at(S, 0, 0.6) * fade, ls: 1 });
    txt('「量子概率是否能够由逃逸结构推出」 · open', W / 2, 305, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.dim, a: at(S, 0, 0.6, 2) * fade });
    for (let k = 0; k < 5; k++) qubit(360 + k * 300, 560, 90, 0.9 + 0.5 * Math.sin(t * 0.6 + k), t * 0.5 + k, at(S, 1, 0.6) * fade * (0.5 + 0.1 * k), [C.cyan, C.mag, C.gold, C.green, C.vio][k], t);
    txt('NOTHING IS ERASED · A RECORD IS ONLY OUT OF REACH', W / 2, 770, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: at(S, 1, 0.6, 1) * fade, ls: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    qubit(W / 2, 320, 150, 1.0 + 0.3 * Math.sin(t), t * 0.6, ep * out, C.cyan, t);
    txt('QUANTUM LEDGER', W / 2, 640, { size: 100, fam: F.orb, w: 900, align: 'center', c: '#f0fbff', a: ep * out, ab: 5, ls: 12 });
    txt('量 子 账 本 · TRURETURING FILM 008', W / 2, 710, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('The checker signs exactly as far as the proofs go.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'LEDGER', chsh: 'CHSH', ks: 'CONTEXTUALITY', clone: 'NO-CLONING', uncert: 'UNCERTAINTY', coin: 'BORN-COIN', records: 'RECORDS', decohere: 'ACCESS', secret: 'SHARES', memory: 'TOMOGRAPHY', mub6: 'MUB-6', rh: 'SPECTRAL-RH', finale: 'SIGNATURE' });

function poster8() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  qubit(W / 2, 450, 250, 1.0, 0.8, 1, C.cyan, t);
  qubit(W / 2 - 520, 470, 130, 0.4, 2.0, 0.8, C.mag, t); qubit(W / 2 + 520, 470, 130, 2.2, 1.0, 0.8, C.gold, t);
  txt('2√2 > 2', W / 2, 190, { size: 90, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('QUANTUM LEDGER', W / 2, 800, { size: 130, fam: F.orb, w: 900, align: 'center', c: '#f0fbff', ab: 6, ls: 12 });
  bloom(0.65);
  txt('量 子 账 本  ·  证明核验机签字到哪里', W / 2, 900, { size: 44, fam: F.zh, w: 700, align: 'center', c: C.cyan });
  txt('TRURETURING · FILM 008', W / 2, 965, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster8;
