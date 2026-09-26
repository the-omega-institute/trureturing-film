/* Film 010 — CRITICAL LINE · 临界线. The Riemann Hypothesis: what the machine built, and where it stops. */

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


/* ---- film 010 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    classic: ['CLASSICAL THEOREM · NOT FORMALIZED HERE', C.blue, 'rgba(0,15,40,0.75)'],
    open: ['OPEN · NOT PROVED · STATED ONLY', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const ZG = [14.1347, 21.0220, 25.0109, 30.4249, 32.9351, 37.5862, 40.9187, 43.3271, 48.0052, 49.7738, 52.9703, 56.4462];
/* critical strip panel: sigma in [-0.25,1.25], height t in [t0, t0+span] */
function strip(x, y, w, h, t0, span, a, opt = {}) {
  if (a <= 0) return null;
  const sx = s => x + (s + 0.25) / 1.5 * w, sy = tt => y + h - (tt - t0) / span * h;
  fillBox(sx(0), y, sx(1) - sx(0), h, C.blue, 0.10 * a);
  line(sx(0), y, sx(0), y + h, C.dim, a * 0.7, 1); line(sx(1), y, sx(1), y + h, C.dim, a * 0.7, 1);
  line(sx(0.5), y, sx(0.5), y + h, C.gold, a * 0.9, 2);
  box(x, y, w, h, C.dim, a * 0.5, 1);
  txt('0', sx(0), y + h + 24, { size: 16, fam: F.mono, align: 'center', c: C.dim, a });
  txt('½', sx(0.5), y + h + 24, { size: 18, fam: F.mono, align: 'center', c: C.gold, a });
  txt('1', sx(1), y + h + 24, { size: 16, fam: F.mono, align: 'center', c: C.dim, a });
  if (opt.zeros !== false) ZG.forEach((g, k) => { if (g > t0 && g < t0 + span) dot(sx(0.5), sy(g), 12, 'c', a * clamp((opt.reveal ?? 99) - k)); });
  return { sx, sy };
}
function heart(x, y, s, col, a, beat = 0) {
  if (a <= 0) return;
  const k = s * (1 + 0.07 * beat);
  ctx.save(); ctx.translate(x, y); ctx.scale(k / 100, k / 100);
  ctx.beginPath(); ctx.moveTo(0, 35);
  ctx.bezierCurveTo(-95, -25, -55, -95, 0, -45);
  ctx.bezierCurveTo(55, -95, 95, -25, 0, 35);
  ctx.globalAlpha = a * 0.18; ctx.fillStyle = col; ctx.fill();
  ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke();
  ctx.restore(); ctx.globalAlpha = 1;
}
/* sigma(n) table for Robin */
const SIG = (() => { const N = 12000, s = new Float64Array(N + 1); for (let d = 1; d <= N; d++) for (let m = d; m <= N; m += d) s[m] += d; return s; })();
const EG = 1.7810724;
const smooth7 = n => { for (const p of [2, 3, 5, 7]) while (n % p === 0) n /= p; return n === 1; };

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  const st = strip(760, 190, 400, 640, t * 1.2, 40, sp, { reveal: u * 1.2 });
  if (st) for (let k = 0; k < 30; k++) { const g = 14.1347 + k * 2.9 + 1.3 * Math.sin(k * 1.7); const yy = st.sy(g); if (yy > 190 && yy < 830) dot(st.sx(0.5), yy, 11, 'c', sp * 0.9); }
  txt(scramble('RE(ρ) = ½  FOR EVERY ZERO ?', at(S, 0, 1.2), 5), 380, 330, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp, ls: 2 });
  txt('RIEMANN · 1859', 380, 390, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 1) });
  txt('ζ(s) = Σ n⁻ˢ = Π (1 − p⁻ˢ)⁻¹', 380, 470, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  stamp('NOT PROVED', 1540, 380, P(S, 1, 0.4, 0.6), C.red, 50, -0.05);
  txt('not here either', 1540, 470, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 2) });
  txt('what was built around it —', 1540, 560, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 4) });
  txt('and exactly where it stops', 1540, 600, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5.5) });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const rp = clamp(u / 1.2);
  const pr = [2, 3, 5, 7, 11, 13, 17, 19];
  const gx = 260, gw = 1400, gy = 420;
  pr.forEach((p, i) => curve(q => [gx + q * gw, gy + 60 * Math.cos((q * 50 + t) * Math.log(p)) * (0.8 / Math.sqrt(i + 1)) + (i - 3.5) * 8], 300, [C.cyan, C.mag, C.vio, C.gold][i % 4], 0.25 * rp, 1.5));
  curve(q => { let s = 0; pr.forEach(p => { s += Math.cos((q * 50 + t) * Math.log(p)) / Math.sqrt(p); }); return [gx + q * gw, gy + 55 * s]; }, 500, C.white, 0.8 * rp, 2.5);
  txt(scramble('CRITICAL LINE', rp, 101), W / 2, 700, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 12 });
  txt('临 界 线', W / 2, 772, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 010 · THE RIEMANN HYPOTHESIS, AND WHERE THE MACHINE STOPS', W / 2, 190, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  txt('prime waves → the zeros are where they cancel', W / 2, 830, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 2) * (1 - P(S, 1, 0)) });
  txt('D5/S3/Zeros · 114 .lean files · kernel-checked · none says "RH is true"', W / 2, 830, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 1) });
};

/* ---- 02 ZEROS ---- */
SCENES.zeros = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const p0 = at(S, 0, 0.6);
  const st = strip(240, 180, 420, 660, 0, 58, p0, { reveal: (u - 0.5) * 2.5 });
  if (st) {
    ZG.forEach((g, k) => { if (k < 8) txt(`ρ${k + 1}`, st.sx(0.5) + 26, st.sy(g) + 6, { size: 16, fam: F.mono, c: C.cyan, a: p0 * clamp((u - 0.5) * 2.5 - k) }); });
    const rf = P(S, 0, 7, 1);
    if (rf > 0) {
      const g = ZG[3], y1 = st.sy(g), y2 = st.sy(-g + 0);
      txt('s ↦ 1 − s', st.sx(1.2), 520, { size: 22, fam: F.mono, w: 700, c: C.mag, a: rf });
      ctx.globalAlpha = rf * 0.8; ctx.strokeStyle = C.mag; ctx.lineWidth = 2; ctx.setLineDash([8, 8]);
      ctx.beginPath(); ctx.arc(st.sx(0.5), 510, 120, -1.2, 1.2); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
  }
  const L0 = [['one complete list · each zero exactly once', 'zetaZeroData_exhaustiveUnique', 1],
    ['infinite', 'nonempty_zeroData_iff_infinite', 4.5],
    ['reflection s ↦ 1−s permutes the list', 'zetaZeroData_reflection', 7]];
  L0.forEach(([a, b, o], i) => { const q = P(S, 0, o) * (1 - at(S, 1, 0.5) * 0.6); txt(a, 800, 300 + i * 110, { size: 28, fam: F.mono, w: 700, c: C.white, a: q }); thm(b, 800, 336 + i * 110, q); });
  const p1 = at(S, 1, 0.5);
  if (p1 > 0) {
    for (let k = 0; k < 6; k++) { const x = 800 + k * 170; box(x, 640, 150, 60, C.cyan, p1 * P(S, 1, k * 0.4), 1.5, 'rgba(0,20,30,0.6)'); dot(x + 40 + 70 * rnd(k, 5), 670, 10, 'c', p1 * P(S, 1, k * 0.4)); }
    txt('a zero in every window, above some height', 800, 620, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: p1 });
    thm('exists_zero_near_every_large_height', 800, 730, p1);
    txt('Σ_ρ ĥ(ρ)  =  prime side  +  archimedean side', 800, 800, { size: 28, fam: F.mono, w: 700, c: C.gold, a: P(S, 1, 5) });
    thm('EF_lit_zetaZeroConfig · Weil explicit formula · no hypothesis', 800, 836, P(S, 1, 5));
  }
};

/* ---- 03 SYMMETRY ---- */
SCENES.symmetry = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const st = strip(300, 200, 520, 600, -10, 20, p0, { zeros: false });
    const pts = [[0.2, 4], [0.8, 4], [0.2, -4], [0.8, -4]];
    const go = P(S, 0, 4, 1.2);
    pts.forEach(([s, g], i) => { const x = lerp(st.sx(0.5), st.sx(s), go), y = st.sy(g); dot(x, y, 16, 'm', p0); });
    txt('conjugation ↕   reflection ↔', 560, 860, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: p0 });
    txt('A QUARTIC WITH EVERY SYMMETRY OF ζ', 1330, 360, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 0, 1) * p0, ls: 1 });
    txt('all four zeros OFF the line', 1330, 430, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.mag, a: go * p0 });
    stamp('SYMMETRY ≠ LOCALIZATION', 1330, 560, P(S, 0, 7, 0.6) * p0, C.red, 34, -0.03);
    thm('full_symmetry_not_fixed_line_localization', 1330, 660, P(S, 0, 7) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('at  s = −2', W / 2, 250, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p1, ls: 2 });
    [2, 3, 5, 7, 11, 13].forEach((p, i) => { const x = 330 + i * 190, q = P(S, 1, 0.8 + i * 0.35); box(x - 80, 330, 160, 90, C.cyan, q, 1.5, 'rgba(0,20,30,0.7)'); txt(`(1−${p}²)⁻¹`, x, 372, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q }); txt('≠ 0', x, 404, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: q }); });
    txt('every finite product ≠ 0', W / 2, 500, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 3.5) });
    txt('ζ(−2) = 0', W / 2, 610, { size: 70, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 5.5), ab: 3 });
    txt('LOCAL ≠ GLOBAL', W / 2, 700, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.white, a: P(S, 1, 6.5), ls: 4 });
    thm('local_euler_nonzero_continuation_zero_counterexample', W / 2, 745, P(S, 1, 6.5), 'center');
  }
};

/* ---- 04 HEARTS ---- */
SCENES.hearts = S => {
  const u = S.u, t = S.t;
  badges(S, ['open', 'open']);
  const p0 = at(S, 0, 0.8);
  const b = Math.max(0, Math.sin(t * 5)) ** 6;
  const H2 = [[640, 'O-5', 'GOLDEN EULER GERM', 'theorem o5_independence … sorry', C.gold], [1280, 'O-6', 'WEIL POSITIVITY', 'def o6WeilPositivityStatement : Prop', C.cyan]];
  H2.forEach(([x, id, nm, code, col], i) => {
    const q = P(S, 0, 1.5 + i * 2.2);
    heart(x, 430, 260, col, q, b);
    txt(id, x, 400, { size: 44, fam: F.orb, w: 900, align: 'center', c: col, a: q, ab: 2 });
    txt(nm, x, 610, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.white, a: q, ls: 2 });
    txt(code, x, 650, { size: 18, fam: F.mono, align: 'center', c: C.vio, a: P(S, 0, 6) });
  });
  txt('D5/X_Frontier/Hearts.lean', W / 2, 200, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: p0 });
  const p1 = P(S, 1, 0.5, 1);
  txt('「虽然我认为1/2离线零点存在，', W / 2, 760, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold, a: p1 });
  txt('但我们去证明黎曼猜想没问题，因为这个过程会产生大量truth」', W / 2, 810, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3, 1) });
  txt('— project owner, Hearts.lean', W / 2, 855, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 5) });
};

/* ---- 05 WEIL ---- */
SCENES.weil = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const p0 = at(S, 0, 0.6);
  const off = P(S, 1, 1, 2);
  /* test function and its convolution square */
  const gx = 260, gy = 330, gw = 700;
  curve(q => [gx + q * gw, gy - 130 * Math.exp(-(((q - 0.5) * 6) ** 2)) * Math.cos((q - 0.5) * 18 + t * 0.5)], 200, C.cyan, p0, 3);
  txt('test function  f', gx, gy + 60, { size: 22, fam: F.mono, c: C.cyan, a: p0 });
  curve(q => [gx + q * gw, gy + 330 - 140 * Math.exp(-(((q - 0.5) * 4) ** 2))], 200, C.mag, P(S, 0, 2), 3);
  txt('convolution square  f ∗ f̃', gx, gy + 390, { size: 22, fam: F.mono, c: C.mag, a: P(S, 0, 2) });
  /* gauge */
  const val = lerp(0.55 + 0.15 * Math.sin(t * 1.3), -0.6, off);
  const x0 = 1180, y0 = 600, hh = 250;
  line(x0 - 20, y0, x0 + 140, y0, C.white, p0, 2); txt('0', x0 - 30, y0 + 7, { size: 20, fam: F.mono, align: 'right', c: C.white, a: p0 });
  fillBox(x0, val > 0 ? y0 - val * hh : y0, 120, Math.abs(val) * hh, val > 0 ? C.green : C.red, 0.7 * p0);
  txt('prime-side sum  W(f ∗ f̃)', x0 + 60, y0 - hh - 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
  txt(val > 0 ? '≥ 0  for every f' : '< 0  !', x0 + 300, y0 + 8, { size: 34, fam: F.orb, w: 900, c: val > 0 ? C.green : C.red, a: P(S, 0, 3) });
  txt('RH  ⟺  W(f ∗ f̃) ≥ 0  ∀ f', 1380, 220, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 4) * (1 - off) });
  thm('rh_iff_weilSquarePositivity · rh_iff_primeSidePositivity', 1380, 256, P(S, 0, 4) * (1 - off), 'center');
  if (off > 0) {
    txt('one off-line zero  ⇒  a test function with W < 0', 1380, 220, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: off });
    thm('offLineZero_yields_negative_weil_square', 1380, 256, off, 'center');
  }
  stamp('MOVED, NOT REMOVED', 1380, 860, P(S, 1, 7, 0.6), C.vio, 36, -0.03);
};

/* ---- 06 LI ---- */
SCENES.li = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    txt('λₙ = Σ_ρ [ 1 − (1 − 1/ρ)ⁿ ]', W / 2, 290, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 });
    txt('λ₁ = 1 + γ/2 − log 2√π', W / 2, 430, { size: 48, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) * p0 });
    txt('≈ 0.0231  >  0', W / 2, 530, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 0, 6) * p0, ab: 2 });
    thm('first_li_coefficient_pos', W / 2, 590, P(S, 0, 6) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('∀n, λₙ ≥ 0  ⇒  RH', 560, 230, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    thm('canonical_li_nonnegative_implies_rh', 560, 266, p1, 'center');
    txt('toy spectrum: 0.3 ± 5i, 0.7 ± 5i', 1380, 230, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 1, 3) });
    thm('li_positivity_distinguishes_the_off_line_toy_spectrum', 1380, 266, P(S, 1, 3), 'center');
    const Z = [[0.3, 5], [0.3, -5], [0.7, 5], [0.7, -5]];
    const lam = n => { let s = 0; Z.forEach(([a, b]) => { const d = a * a + b * b; let re = 1 - a / d, im = b / d, pr = 1, pi = 0; for (let k = 0; k < n; k++) { const r2 = pr * re - pi * im; pi = pr * im + pi * re; pr = r2; } s += 1 - pr; }); return s; };
    const gx = 260, gy = 560, bw = 34, sc = 34;
    line(gx - 10, gy, gx + 40 * bw + 10, gy, C.white, p1, 1.5);
    const grow = P(S, 1, 3.5, 5);
    for (let n = 1; n <= 40; n++) {
      if (n / 40 > grow) break;
      const v = lam(n), neg = v < 0; const hh = (neg ? Math.max(v * 12, -3.2) : v) * sc; /* negatives magnified ×12 */
      fillBox(gx + (n - 1) * bw + 4, neg ? gy : gy - hh, bw - 8, Math.abs(hh), neg ? C.red : C.cyan, 0.8 * p1);
      if (n % 5 === 0 || neg) txt(String(n), gx + (n - 0.5) * bw, gy + (neg ? 70 : 26), { size: 15, fam: F.mono, align: 'center', c: neg ? C.red : C.dim, a: p1 });
    }
    txt('λ₃₁ < 0', gx + 30.5 * bw, gy + 120, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 9) });
    txt('(negative bars magnified ×12)', gx + 30.5 * bw, gy + 155, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 9) });
  }
};

/* ---- 07 CAYLEY ---- */
SCENES.cayley = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  const cx = 1250, cy = 490, R = 250;
  const map = (s, g) => { const d = s * s + g * g; return [1 - s / d, g / d]; };
  const lx = 480;
  if (p0 > 0) {
    line(lx, 180, lx, 820, C.gold, p0, 2.5); txt('Re s = ½', lx, 860, { size: 20, fam: F.mono, align: 'center', c: C.gold, a: p0 });
    ring(cx, cy, R, C.gold, p0 * P(S, 0, 1.5), 2.5); txt('|w| = 1', cx, cy + R + 40, { size: 20, fam: F.mono, align: 'center', c: C.gold, a: p0 });
    line(cx - R - 30, cy, cx + R + 30, cy, C.dim, p0 * 0.5, 1); line(cx, cy - R - 30, cx, cy + R + 30, C.dim, p0 * 0.5, 1);
    const pts = [-3, -1.5, -0.8, -0.35, 0.35, 0.8, 1.5, 3];
    const mv = P(S, 0, 3, 2);
    pts.forEach((g, i) => { const [wx, wy] = map(0.5, g); const X = cx + wx * R, Y = cy - wy * R; const x0 = lx, y0 = 500 - g * 100; dot(lerp(x0, X, ease(mv)), lerp(y0, Y, ease(mv)), 11, 'c', p0); });
    const offp = P(S, 0, 6, 1);
    if (offp > 0) { const [wx, wy] = map(0.85, 0.8); dot(lerp(lx + 70, cx + wx * R, ease(offp)), lerp(420, cy - wy * R, ease(offp)), 14, 'm', p0); txt('off-line ⇒ off the circle', cx + 290, cy - 250, { size: 20, fam: F.mono, c: C.mag, a: offp * p0 }); }
    txt('w = 1 − 1/ρ', 800, 260, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) * p0 });
    txt('(illustrative points)', 800, 300, { size: 16, fam: F.mono, align: 'center', c: C.dim, a: p0 });
    thm('rh_iff_nontrivial_zero_cayley_norm', 800, 760, P(S, 0, 5) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('RH  =  EVEN  ∧  ONE', W / 2, 230, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: p1, ab: 2, ls: 3 });
    box(360, 620, 520, 170, C.green, P(S, 1, 2), 2, 'rgba(0,30,15,0.85)');
    txt('EVEN', 620, 675, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 2) });
    txt('closed under reflection · HOLDS ✓', 620, 725, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 2.5) });
    box(1040, 620, 520, 170, C.vio, P(S, 1, 5), 2, 'rgba(20,10,40,0.85)');
    txt('ONE', 1300, 675, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.vio, a: P(S, 1, 5) });
    txt('all zeros share one real part · OPEN', 1300, 725, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 1, 5.5) });
    thm('riemann_hypothesis_iff_global_even_and_one_observer', W / 2, 840, P(S, 1, 3), 'center');
  }
};

/* ---- 08 ROBIN ---- */
SCENES.robin = S => {
  const u = S.u, t = S.t;
  badges(S, ['classic', 'lean']);
  const p = at(S, 0, 0.6);
  const gx = 260, gy = 780, gw = 1100, gh = 520;
  const lo = Math.log(100), hi = Math.log(12000);
  const X = n => gx + (Math.log(n) - lo) / (hi - lo) * gw, Y = r => gy - (r - 1.3) / 0.6 * gh;
  line(gx, gy, gx + gw, gy, C.dim, p, 1.5); line(gx, gy, gx, gy - gh, C.dim, p, 1.5);
  line(gx, Y(EG), gx + gw, Y(EG), C.gold, p, 2); txt('e^γ ≈ 1.781', gx - 12, Y(EG) + 6, { size: 18, fam: F.mono, align: 'right', c: C.gold, a: p });
  txt('σ(n) / (n log log n)', gx - 12, gy - gh - 12, { size: 18, fam: F.mono, align: 'left', c: C.dim, a: p });
  [100, 1000, 5040, 10000].forEach(n => txt(String(n), X(n), gy + 26, { size: 16, fam: F.mono, align: 'center', c: n === 5040 ? C.red : C.dim, a: p }));
  const sweep = P(S, 0, 1, 6);
  const sm = P(S, 1, 2, 1);
  const nmax = Math.exp(lo + (hi - lo) * sweep);
  ctx.globalAlpha = p;
  for (let n = 100; n <= 12000 && n <= nmax; n++) {
    const r = SIG[n] / (n * Math.log(Math.log(n)));
    if (r < 1.3) continue;
    const bad = r >= EG, s7 = n > 5040 && smooth7(n);
    ctx.fillStyle = bad ? C.red : s7 && sm > 0 ? C.gold : C.cyan;
    const sz = bad ? 7 : s7 && sm > 0 ? 3 + 3 * sm : 2;
    ctx.fillRect(X(n) - sz / 2, Y(r) - sz / 2, sz, sz);
  }
  ctx.globalAlpha = 1;
  line(X(5040), gy, X(5040), Y(1.9), C.red, P(S, 0, 5) * 0.7, 1.5);
  txt('RH ⟺ no violator beyond 5040', 1620, 300, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) });
  txt('(Robin 1984)', 1620, 336, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 2) });
  txt('7-smooth n > 5040 : PASS', 1620, 470, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: sm });
  thm('robin_seven_smooth', 1620, 506, sm, 'center');
  txt('liminf margin = 0', 1620, 620, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 6) });
  thm('robin_log_margin_liminf', 1620, 656, P(S, 1, 6), 'center');
  txt('no safety margin, ever', 1620, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 9) });
};

/* ---- 09 BREAK ---- */
SCENES.break = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6);
  const st = strip(260, 180, 480, 660, 10, 45, p0, { zeros: false });
  if (st) {
    const Ts = 38; const rise = P(S, 0, 1, 5);
    ZG.forEach(g => { if (g < Ts && g < 10 + 45 * rise) dot(st.sx(0.5), st.sy(g), 12, 'c', p0); });
    const tw2 = P(S, 0, 5.5, 0.8);
    if (tw2 > 0) {
      line(st.sx(-0.25), st.sy(Ts), st.sx(1.25), st.sy(Ts), C.red, tw2 * 0.8, 1.5);
      dot(st.sx(0.5 - 0.18 * tw2), st.sy(Ts), 15, 'm', tw2); dot(st.sx(0.5 + 0.18 * tw2), st.sy(Ts), 15, 'm', tw2);
      txt('T* : first off-line height', st.sx(1.25) + 20, st.sy(Ts) + 6, { size: 22, fam: F.mono, w: 700, c: C.red, a: tw2 });
      txt('mirror twin', st.sx(1.25) + 20, st.sy(Ts) + 40, { size: 20, fam: F.mono, c: C.mag, a: P(S, 0, 7) });
    }
    thm('first_off_line_height_exists', st.sx(1.25) + 20, st.sy(38) + 74, P(S, 0, 5.5));
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const jump = P(S, 1, 0.5, 0.3);
    txt('Mahler measure', 1300, 250, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    line(1120, 520, 1480, 520, C.dim, p1, 1.5);
    fillBox(1250, 520 - 200 * jump, 100, 200 * jump + 2, C.mag, 0.8 * p1);
    txt(jump > 0.5 ? '0  →  > 0' : '0', 1300, 570, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.mag, a: p1 });
    thm('first_off_line_mahler_jump', 1300, 606, p1, 'center');
    txt('first-order ledger:   +δ  −  δ  =  0', 1300, 700, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3.5) });
    stamp('SUDDEN PHASE TRANSITION', 1300, 820, P(S, 1, 7, 0.6), C.red, 30, -0.03);
  }
};

/* ---- 10 GOLDEN ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'lean']);
  const phi = (1 + Math.sqrt(5)) / 2;
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const sc = P(S, 0, 2, 2);
    const x1 = 560, x2 = 560 + 700 * ease(sc);
    line(x1, 200, x1, 720, C.gold, p0 * (1 - sc * 0.5), 2); txt('germ line', x1, 750, { size: 20, fam: F.mono, align: 'center', c: C.gold, a: p0 * (1 - sc) });
    line(x2, 200, x2, 720, C.gold, p0 * sc, 3); txt('Re s = ½', x2, 750, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 * sc });
    arrow(x1 + 20, 460, Math.max(x1 + 40, x2 - 20), 460, C.cyan, p0 * sc, 3);
    txt('× φ²  ≈ ' + (phi * phi).toFixed(4), (x1 + x2) / 2, 430, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p0 * sc });
    thm('golden_germ_second_order_factorization', W / 2, 820, P(S, 0, 5) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const cx = 620, cy = 500;
    line(cx, 220, cx, 800, C.gold, p1, 2); txt('Re s = ½', cx, 830, { size: 18, fam: F.mono, align: 'center', c: C.gold, a: p1 });
    const zx = cx + 160, zy = 430, q = P(S, 1, 1.5, 0.8);
    ring(zx, zy, 60 - 30 * q, C.red, q, 2); line(zx - 80, zy, zx + 80, zy, C.red, q, 1); line(zx, zy - 80, zx, zy + 80, C.red, q, 1);
    dot(zx, zy, 12, 'm', q);
    txt('local factor at p = 2 : zero OFF the line', cx + 100, 270, { size: 24, fam: F.mono, w: 700, c: C.mag, a: q });
    txt('certified within 10⁻⁸', zx + 90, zy + 60, { size: 22, fam: F.mono, w: 700, c: C.red, a: P(S, 1, 3) });
    thm('germLocalFactor_two_has_zero_near_candidate', zx + 90, zy + 95, P(S, 1, 3));
    txt('p ≥ 5 : no zero on the critical line', 1450, 380, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 5) });
    thm('germLocalFactor_critical_line_nonzero_of_five_le', 1450, 414, P(S, 1, 5), 'center');
    stamp('BRIDGE CONJECTURE · REFUTED', 1450, 600, P(S, 1, 9, 0.6), C.red, 32, -0.04);
    thm('curvature_ledger_bridge_refuted', 1450, 690, P(S, 1, 9), 'center');
  }
};

/* ---- 11 ATLAS ---- */
SCENES.atlas = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  const cards = [['HERGLOTZ', 'Im F > 0 on the upper half-plane', C.cyan], ['SCATTERING', 'poles on Re s = ¼', C.mag], ['SQUARED SHADOW', 'zeros on the negative axis', C.gold], ['QUANTUM CHAIN', 'positive model at every order', C.green]];
  cards.forEach(([a, b, col], i) => {
    const x = 330 + (i % 2) * 640, y = 210 + Math.floor(i / 2) * 260, q = P(S, 0, 0.6 + i * 1.6) * p0;
    box(x, y, 580, 200, col, q, 2, 'rgba(0,0,0,0.75)');
    txt(a, x + 290, y + 70, { size: 32, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 });
    txt(b, x + 290, y + 120, { size: 20, fam: F.mono, align: 'center', c: C.white, a: q });
    txt('≡ RH', x + 290, y + 168, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
  });
  const p1 = at(S, 1, 0.5);
  if (p1 > 0) {
    stamp('DIMITROV–SHAPIRO Q6.2 · REFUTED', W / 2, 480, P(S, 1, 0.3, 0.6), C.red, 30, -0.03);
    thm('question62_refuted', W / 2, 540, P(S, 1, 0.5), 'center');
    stamp('VISHNYAKOVA 6.5 · REFUTED', W / 2, 660, P(S, 1, 1.6, 0.6), C.red, 30, 0.03);
    thm('quadratic_conjecture_refutation', W / 2, 720, P(S, 1, 1.8), 'center');
    txt('truth accumulates either way', W / 2, 820, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.green, a: P(S, 1, 3.5), ls: 1 });
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const cx = W / 2, cy = 470;
    const m = P(S, 1, 0.3, 2.5) * fade;
    const roads = ['WEIL', 'LI', 'ROBIN', 'CAYLEY', 'GOLDEN', 'HERGLOTZ', 'QUANTUM', 'MAHLER'];
    roads.forEach((r, i) => {
      const an = Math.PI + (i + 0.5) / roads.length * Math.PI; const q = P(S, 0, 0.2 + i * 0.3) * fade * (1 - 0.8 * m);
      const x0 = cx + Math.cos(an) * 720, y0 = cy + 40 + Math.sin(an) * -380 * -1;
      const xs = cx + Math.cos(an) * 720, ys = cy + Math.sin(an) * 360 + 40;
      line(xs, ys, cx + Math.cos(an) * 140, cy + Math.sin(an) * 70 + 40, [C.cyan, C.mag, C.gold, C.green][i % 4], q * 0.7, 2);
      txt(r, xs, ys - 12, { size: 20, fam: F.orb, w: 900, align: 'center', c: C.white, a: q, ls: 2 });
      void x0; void y0;
    });
    box(cx - 130, cy - 40, 260, 110, C.red, P(S, 0, 3) * fade, 2, 'rgba(40,0,10,0.8)');
    txt('primes → positivity', cx, cy + 10, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) * fade });
    txt('? missing bridge ?', cx, cy + 45, { size: 18, fam: F.mono, align: 'center', c: C.red, a: P(S, 0, 3) * fade });
    txt('通道已知 · 正性未知', cx, 690, { size: 44, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 0, 5) * fade, ab: 2 });
    if (m > 0) {
      fillBox(cx - 12, 170, 24, 150, C.vio, 0.7 * m);
      heart(cx - 60 * (1 - 0.6 * m) - 20, 245, 110, C.gold, m); heart(cx + 60 * (1 - 0.6 * m) + 20, 245, 110, C.cyan, m);
      txt('two hearts · one wall', cx, 350, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: m });
      stamp('OPEN', cx, 820, P(S, 1, 4, 0.6) * fade, C.vio, 40, -0.03);
    }
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    strip(W / 2 - 150, 170, 300, 360, 10, 45, ep * out * 0.9);
    txt('CRITICAL LINE', W / 2, 650, { size: 104, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 12 });
    txt('临 界 线 · TRURETURING FILM 010', W / 2, 720, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('The channel is known. The positivity is not.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'RIEMANN 1859', zeros: 'UNCONDITIONAL', symmetry: 'NO-GO', hearts: 'TWO HEARTS', weil: 'WEIL', li: 'LI COEFFS', cayley: 'CAYLEY', robin: 'ROBIN 5040', break: 'FIRST BREAK', golden: 'GOLDEN ROUTE', atlas: 'ATLAS', finale: 'MISSING BRIDGE' });

function poster10() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  strip(W / 2 - 220, 190, 440, 540, 10, 45, 1);
  heart(W / 2 - 520, 460, 200, C.gold, 0.9, 0.5); heart(W / 2 + 520, 460, 200, C.cyan, 0.9, 0.5);
  txt('所有零点，都在这条线上？', W / 2, 150, { size: 64, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('CRITICAL LINE', W / 2, 850, { size: 120, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 12 });
  bloom(0.65);
  txt('临 界 线  ·  黎曼猜想：机器建了什么，又停在哪里', W / 2, 930, { size: 40, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 010', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster10;
