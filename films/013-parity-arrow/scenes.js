/* Film 013 — HIDDEN ARROW · 奇偶隐藏时间箭头. White noise in the parts is not reversibility of the whole. */

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


/* ---- film 013 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · PAPER PROOF, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
const frac = x => x - Math.floor(x);
function ncdf(x) { const t = 1 / (1 + 0.3275911 * Math.abs(x) / Math.SQRT2), y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x / 2); return x >= 0 ? (1 + y) / 2 : (1 - y) / 2; }
function poi(l, k) { let p = Math.exp(-l); for (let i = 1; i <= k; i++) p *= l / i; return p; }
function pairErr(tau) { let lt = 0, eq = 0; for (let a = 0; a < 40; a++) { const pa = poi(tau, a); eq += pa * poi(tau / 2, a); for (let b = a + 1; b < 40; b++) lt += pa * poi(tau / 2, b); } return Math.exp(-tau / 2) * (lt + eq / 2); }
/* simulate the d=4 parity chain deterministically */
const PC = (() => {
  const d = 4, n = 16, X = [];
  for (let i = 0; i < n; i++) X.push([0, 1, 2, 3].map(j => (i >> j) & 1 ? 1 : -1));
  const chi = x => x.reduce((p, v) => p * v, 1);
  const bvals = [0.9, -0.3, -0.3, -0.3, 0, 0, 0, 0, 0.6, -0.6, 0.6, -0.6, 0.3, -0.3, 0.3, -0.3];
  const plus = [], minus = []; X.forEach((x, i) => (chi(x) > 0 ? plus : minus).push(i));
  const b = new Array(n); plus.forEach((i, k) => b[i] = bvals[k]); minus.forEach((i, k) => b[i] = bvals[8 + k]);
  const a = X.map((x, i) => chi(x) * b[i]);
  const seq = [0]; let s = 0;
  for (let t = 1; t < 60; t++) { const u = rnd(t, 41); let acc = 0; for (let y = 0; y < n; y++) { acc += (1 + a[s] * chi(X[y])) / n; if (u < acc) { s = y; break; } } seq.push(s); }
  return { X, chi, seq };
})();
function switches(x, cx, y, a, sz = 60) {
  x.forEach((v, j) => { const px = cx + (j - (x.length - 1) / 2) * (sz + 24); box(px - sz / 2, y - sz / 2, sz, sz, v > 0 ? C.cyan : C.mag, a, 2, v > 0 ? 'rgba(0,30,40,0.7)' : 'rgba(40,0,30,0.7)'); txt(v > 0 ? '+' : '−', px, y + sz * 0.22, { size: sz * 0.6, fam: F.orb, w: 900, align: 'center', c: v > 0 ? C.cyan : C.mag, a }); });
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  const dir = Math.sin(t * 0.8) > 0 ? 1 : -1;
  for (let k = 0; k < 9; k++) {
    const x = ((k * 200 + dir * t * 90) % 1800 + 1800) % 1800 + 60, y = 470;
    box(x - 80, y - 110, 160, 220, C.dim, sp * 0.6, 1.5, 'rgba(0,0,0,0.5)');
    for (let j = 0; j < 12; j++) dot(x - 60 + rnd(k * 12 + j, Math.floor(t * 2)) * 120, y - 90 + rnd(k * 12 + j, 3) * 180, 5, ['c', 'm', 'g'][j % 3], sp * 0.8);
  }
  txt(dir > 0 ? '▶ FORWARD ?' : '◀ BACKWARD ?', W / 2, 250, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp * (1 - P(S, 1, 0, 1)), ls: 4 });
  const p1 = at(S, 1, 0.8);
  txt('every partial view: pure noise', W / 2, 700, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
  txt('the whole: runs one way in time', W / 2, 760, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
  txt('PARITY_HIDDEN_ARROW · 6 volumes', W / 2, 820, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 6) });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const rp = clamp(u / 1.2);
  const k = Math.floor(t * 1.5) % PC.seq.length, x = PC.X[PC.seq[k]], par = PC.chi(x);
  switches(x, W / 2, 330, rp, 90);
  txt('χ = ' + (par > 0 ? '+1' : '−1'), W / 2, 460, { size: 40, fam: F.mono, w: 700, align: 'center', c: par > 0 ? C.gold : C.vio, a: rp });
  txt(scramble('HIDDEN ARROW', rp, 131), W / 2, 700, { size: 120, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 12 });
  txt('奇 偶 隐 藏 时 间 箭 头', W / 2, 772, { size: 48, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 013 · PARITY_HIDDEN_ARROW', W / 2, 190, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 2 });
  txt('「“边缘白噪声”不等于“联合过程可逆”」', W / 2, 850, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 1) });
};

/* ---- 02 KERNEL ---- */
SCENES.kernel = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    txt('P(x, y) = (1 + a(x) · χ(y)) / 2ᵈ', W / 2, 220, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.white, a: p0 });
    const cols = Math.min(30, Math.floor((u - 0.5) * 3));
    const gx = 330, gy = 300, cw = 42, rh = 62;
    ['s₁', 's₂', 's₃', 's₄', 'χ'].forEach((lab, r) => txt(lab, gx - 40, gy + r * rh + 36, { size: 24, fam: F.mono, w: 700, align: 'right', c: r === 4 ? C.gold : C.white, a: p0 }));
    for (let c = 0; c < cols; c++) {
      const x = PC.X[PC.seq[c]];
      for (let r = 0; r < 5; r++) { const v = r < 4 ? x[r] : PC.chi(x); fillBox(gx + c * cw, gy + r * rh + (r === 4 ? 14 : 0), cw - 6, rh - 12, v > 0 ? (r === 4 ? C.gold : C.cyan) : (r === 4 ? C.vio : C.mag), 0.6 * p0); }
    }
    box(gx - 14, gy - 10, 30 * cw + 14, 3 * rh + 6, C.cyan, P(S, 0, 5) * p0, 2);
    txt('any 3 of the 4 switches: independent fair coins, forever', 1000, gy + 5 * rh + 70, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5) * p0 });
    thm('subcoordinateLaw_eq · D5/S3/Estimation/TimeArrow/ParityKernelSubcoordinates', 1000, gy + 5 * rh + 110, P(S, 0, 7) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('mean tilt 0 in each parity class', W / 2, 320, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('P² = Π', W / 2, 480, { size: 110, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 1.5), ab: 3 });
    txt('two steps later: a complete uniform reset', W / 2, 580, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3) });
    txt('characteristic polynomial (z − 1) zⁿ⁻¹', W / 2, 640, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 4) });
  }
};

/* ---- 03 THRESHOLD ---- */
SCENES.threshold = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const gx = 300, gy = 800, gw = 900, gh = 540, Imax = 0.16, Smax = 0.8;
  const X = I => gx + I / Imax * gw, Y = s => gy - s / Smax * gh;
  const p = at(S, 0, 0.6);
  line(gx, gy, gx + gw, gy, C.dim, p, 1.5); line(gx, gy, gx, gy - gh, C.dim, p, 1.5);
  txt('information I (one step)', gx + gw / 2, gy + 45, { size: 22, fam: F.mono, align: 'center', c: C.cyan, a: p });
  txt('irreversibility σ', gx - 10, gy - gh - 15, { size: 22, fam: F.mono, align: 'left', c: C.mag, a: p });
  /* lower bound H(I): parametric in u */
  const ph = v => ((1 + v) * Math.log(1 + v) + (1 - v) * Math.log(1 - v)) / 2;
  curve(q => { const v = q * 0.53; return [X(ph(v)), Y(v * Math.atanh(v))]; }, 120, C.cyan, P(S, 0, 2) * 0.8, 2.5);
  txt('min σ = H(I)', X(0.05), Y(0.1) - 40, { size: 20, fam: F.mono, c: C.cyan, a: P(S, 0, 2) });
  const cd = 0.10788;
  line(X(cd), gy, X(cd), gy - gh, C.gold, at(S, 1, 0.6), 2.5);
  txt('c₃ ≈ 0.1079', X(cd), gy + 80, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: at(S, 1, 0.6) });
  const pts = [[0.9, 0.2595], [0.99, 0.3787], [0.999, 0.5189], [0.9999, 0.6624]];
  pts.forEach(([r, s], i) => { const q = P(S, 1, 4 + i * 1.2); dot(X(cd), Y(s), 14, 'm', q); txt(`r = ${r}   σ = ${s}`, X(cd) + 30, Y(s) + 8, { size: 20, fam: F.mono, c: C.white, a: q }); });
  arrow(X(cd), Y(0.68), X(cd), gy - gh - 10, C.mag, P(S, 1, 9), 3);
  txt('σ → ∞ at fixed I = c₃', 1500, 300, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.mag, a: P(S, 1, 9), ls: 1 });
  txt('Σ_d(c) < ∞  ⟺  c < c_d', 1500, 380, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2) });
  txt('Thm 2.1 · values recomputed for this film (d = 3)', 1500, 430, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 9) });
};

/* ---- 04 INVISIBLE ---- */
SCENES.invisible = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const cx = W / 2, cy = 500, R = 260;
    for (let i = 0; i < 14; i++) { const an = i / 14 * TAU; dot(cx + R * Math.cos(an), cy + R * Math.sin(an), 10, i % 2 ? 'm' : 'c', p0 * 0.8); }
    dot(cx, cy, 28, 'g', p0 * (0.7 + 0.3 * Math.sin(t * 4)));
    txt('PEAK', cx, cy + 60, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p0 });
    const e = P(S, 0, 3, 0.5), an = 1 / 14 * TAU;
    const k = frac(t * 0.4);
    if (e > 0) { arrow(cx + R * Math.cos(an), cy + R * Math.sin(an), cx + 30 * Math.cos(an), cy + 30 * Math.sin(an), C.red, e * p0, 3); dot(lerp(cx + R * Math.cos(an), cx, k), lerp(cy + R * Math.sin(an), cy, k), 9, 'r', e * p0); txt('rare jump · opposite parity → peak', cx + R + 40, cy + 80, { size: 22, fam: F.mono, w: 700, c: C.red, a: e * p0 }); }
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const gx = 300, gy = 760, gw = 1000, gh = 460;
    const X = l => gx + l / 8 * gw, Y = e => gy - e / 0.5 * gh;
    line(gx, gy, gx + gw, gy, C.dim, p1, 1.5); line(gx, gy, gx, gy - gh, C.dim, p1, 1.5);
    txt('observed steps  T / n', gx + gw / 2, gy + 45, { size: 22, fam: F.mono, align: 'center', c: C.white, a: p1 });
    txt('½', gx - 16, Y(0.5) + 8, { size: 22, fam: F.mono, align: 'right', c: C.white, a: p1 });
    const dr = P(S, 1, 1, 4);
    curve(q => { const l = q * 8 * dr; return [X(l), Y(0.5 * Math.exp(-l / 2))]; }, 120, C.gold, p1, 3.5);
    const l5 = 4.605;
    line(X(l5), gy, X(l5), Y(0.05), C.green, P(S, 1, 7), 2); dot(X(l5), Y(0.05), 12, 'n', P(S, 1, 7));
    txt('5% error at T ≈ 4.6 n', X(l5) + 20, Y(0.05) - 30, { size: 24, fam: F.mono, w: 700, c: C.green, a: P(S, 1, 7) });
    txt('error → ½ · e^(−λ/2),  λ = T/n', 1500, 300, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 2) });
    txt('σ per step → ∞ does not help when T ≪ n', 1500, 360, { size: 22, fam: F.mono, align: 'center', c: C.red, a: P(S, 1, 4) });
    txt('Thm 6.3, (6.8)–(6.9)', 1500, 400, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 4) });
  }
};

/* ---- 05 CURRENT ---- */
SCENES.current = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const reg = [0, 1, 1, 2, 0, 0, 1, 2, 1, 0, 1, 2, 0, 1, 1, 0, 2, 1, 0, 1, 2, 0, 0, 1];
    const n = Math.min(reg.length, Math.floor((u - 0.5) * 3));
    let J = 0; const gx = 260, gy = 420, cw = 58;
    for (let i = 0; i < n; i++) {
      const r = reg[i]; const y = gy - (r - 1) * 90;
      dot(gx + i * cw, y, 12, ['c', 'g', 'm'][r], p0);
      if (i > 0) { const pr = reg[i - 1]; line(gx + (i - 1) * cw, gy - (pr - 1) * 90, gx + i * cw, y, C.dim, p0 * 0.6, 1.5); if (pr === 2 && r === 1) { J++; txt('+1', gx + i * cw, y - 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.green, a: p0 }); } if (pr === 1 && r === 2) { J--; txt('−1', gx + i * cw, y + 110, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.red, a: p0 }); } }
    }
    txt('opposite', gx - 30, gy - 90 + 8, { size: 18, fam: F.mono, align: 'right', c: C.mag, a: p0 }); txt('peak', gx - 30, gy + 8, { size: 18, fam: F.mono, align: 'right', c: C.gold, a: p0 }); txt('rest', gx - 30, gy + 98, { size: 18, fam: F.mono, align: 'right', c: C.cyan, a: p0 });
    txt(`net current  J = ${J}`, W / 2, 660, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0, ls: 2 });
    txt('log(forward / reverse) = 𝒜 · J + endpoint terms', W / 2, 730, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 5) * p0 });
    thm('log_forward_div_reverse_eq_current · SinglePeakPathCurrent', W / 2, 775, P(S, 0, 5) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('E[ wait for the first telltale jump ]', W / 2, 300, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('= 2n − 1 − r', W / 2, 440, { size: 100, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 1.5), ab: 3 });
    txt('with an exact rational generating function', W / 2, 540, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: P(S, 1, 4) });
    thm('survival_waiting_mean · survival_recurrence · SinglePeakRareEdge*', W / 2, 590, P(S, 1, 4), 'center');
  }
};

/* ---- 06 SNAPSHOTS ---- */
SCENES.snapshots = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6);
  for (let i = 0; i < 16; i++) { const q = P(S, 0, 1 + i * 0.1); box(260 + i * 52, 240, 46, 60, C.gold, q * p0, 1.5, 'rgba(40,30,0,0.5)'); }
  txt('one continuous movie', 680, 340, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0 });
  for (let i = 0; i < 8; i++) { const q = P(S, 0, 3 + i * 0.15); const x = 1100 + (i % 4) * 150 + rnd(i, 3) * 40, y = 220 + Math.floor(i / 4) * 80; box(x, y, 46, 60, C.cyan, q, 1.5, 'rgba(0,30,40,0.5)'); box(x + 50, y, 46, 60, C.cyan, q, 1.5, 'rgba(0,30,40,0.5)'); }
  txt('scattered independent pairs', 1400, 400, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 3) });
  const p1 = at(S, 1, 0.5);
  if (p1 > 0) {
    const gx = 360, gy = 820, gw = 1000, gh = 330;
    const X = tau => gx + tau / 5 * gw, Y = e => gy - e / 0.5 * gh;
    line(gx, gy, gx + gw, gy, C.dim, p1, 1.5); line(gx, gy, gx, gy - gh, C.dim, p1, 1.5);
    txt('budget τ', gx + gw + 20, gy + 8, { size: 20, fam: F.mono, c: C.white, a: p1 });
    curve(q => [X(q * 5), Y(0.5 * Math.exp(-q * 5 / 2))], 80, C.gold, p1, 3);
    curve(q => [X(q * 5), Y(pairErr(q * 5 + 1e-6))], 80, C.cyan, P(S, 1, 1), 3);
    const q2 = P(S, 1, 3);
    dot(X(2), Y(0.1839), 12, 'g', q2); dot(X(2), Y(0.1061), 12, 'c', q2);
    txt('movie 18.4%', X(2) + 20, Y(0.1839) - 12, { size: 22, fam: F.mono, w: 700, c: C.gold, a: q2 });
    txt('pairs 10.6%', X(2) + 20, Y(0.1061) + 28, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: q2 });
    txt('Thm 9.2 · strictly smaller for every τ > 0', 1500, 560, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: q2 });
  }
};

/* ---- 07 ORTHOGONAL ---- */
SCENES.orthogonal = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const gx = 360, gy = 760, gw = 900, gh = 420;
  const p = at(S, 0, 0.6);
  line(gx, gy, gx + gw, gy, C.dim, p, 1.5); line(gx, gy, gx, gy - gh, C.dim, p, 1.5);
  txt('steps s', gx + gw + 20, gy + 8, { size: 20, fam: F.mono, c: C.white, a: p });
  const X = s => gx + s / 12 * gw, Y = v => gy - (v - 0) / 8 * gh;
  curve(q => [X(q * 12), Y(Math.pow(1.18, q * 12))], 80, C.gold, P(S, 0, 2), 3.5);
  curve(q => [X(q * 12), Y(1)], 10, C.cyan, P(S, 0, 4), 3.5);
  txt('same direction: (1 + E[ab])ˢ', X(9), Y(Math.pow(1.18, 9)) - 30, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 2) });
  txt('forward × backward: exactly 1', X(8), Y(1) - 24, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 4) });
  txt('⟨ L_forward , L_backward ⟩ = 1', 1560, 360, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.5) });
  txt('P_b P_c = Π for every pair', 1560, 420, { size: 24, fam: F.mono, align: 'center', c: C.cyan, a: P(S, 1, 2) });
  thm('forward_inner_product · backward_inner_product', 1560, 480, P(S, 1, 3), 'center');
  thm('forward_backward_inner_product · ParityPathLikelihoodProducts', 1560, 510, P(S, 1, 3), 'center');
};

/* ---- 08 SEARCH ---- */
SCENES.search = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6);
  txt('s*  =  log M / F_M(r)', W / 2, 250, { size: 46, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p0, ab: 2 });
  txt('unknown peak location costs a logarithm', W / 2, 310, { size: 24, fam: F.mono, align: 'center', c: C.white, a: P(S, 0, 2) });
  const p1 = at(S, 1, 0.5);
  const gx = 360, gy = 800, gw = 1200, gh = 380;
  const X = tt => gx + (tt + 4) / 8 * gw, Y = v => gy - v * gh;
  line(gx, gy, gx + gw, gy, C.dim, p1, 1.5); line(X(0), gy, X(0), gy - gh, C.dim, p1 * 0.6, 1.5);
  txt('window coordinate t', gx + gw / 2, gy + 45, { size: 22, fam: F.mono, align: 'center', c: C.white, a: p1 });
  curve(q => { const tt = -4 + q * 8; return [X(tt), Y(ncdf(-tt) / 2)]; }, 120, C.mag, P(S, 1, 1), 3.5);
  curve(q => { const tt = -4 + q * 8; return [X(tt), Y(ncdf(tt))]; }, 120, C.cyan, P(S, 1, 3), 3.5);
  txt('direction risk  Φ(−t) / 2', X(-3.5), Y(0.56), { size: 22, fam: F.mono, w: 700, c: C.mag, a: P(S, 1, 1) });
  txt('peak recovered  Φ(t)', X(1.2), Y(0.9), { size: 22, fam: F.mono, w: 700, c: C.cyan, a: P(S, 1, 3) });
  txt('below: coin flip', X(-3), gy - 20, { size: 18, fam: F.mono, c: C.dim, a: P(S, 1, 5) }); txt('above: both found', X(2), gy - 20, { size: 18, fam: F.mono, c: C.dim, a: P(S, 1, 5) });
  txt('Thm 11.3 · Thm 13.3', gx + gw, gy - gh - 10, { size: 18, fam: F.mono, align: 'right', c: C.dim, a: p1 });
};

/* ---- 09 SPARSE ---- */
SCENES.sparse = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const gx = 220, gw = 1480, y = 520;
  const marks = [['α_D', 0.2], ['α_A = β/φ(r)', 0.48], ['α_E', 0.78]];
  const regs = [['direction ✗', C.dim, 0, 0.2], ['ARROW LEARNED · sources lost', C.gold, 0.2, 0.48], ['almost all sources', C.cyan, 0.48, 0.78], ['every source exact', C.green, 0.78, 1]];
  regs.forEach(([lab, col, a0, a1], i) => { const q = P(i < 2 ? S : S, i < 2 ? 0 : 1, i < 2 ? 1 + i * 2 : (i - 2) * 2.5 + 0.5); fillBox(gx + a0 * gw, y - 70, (a1 - a0) * gw - 6, 140, col, 0.35 * q); txt(lab, gx + (a0 + a1) / 2 * gw, y + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: q }); });
  marks.forEach(([lab, a], i) => { const q = P(i < 2 ? S : S, i === 0 ? 0 : 1, i === 0 ? 3 : (i - 1) * 2.5 + 0.5); line(gx + a * gw, y - 110, gx + a * gw, y + 110, C.white, q, 2); txt(lab, gx + a * gw, y + 150, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q }); });
  txt('sample intensity α  →', gx + gw / 2, y - 150, { size: 24, fam: F.mono, align: 'center', c: C.white, a: at(S, 0, 0.6) });
  txt('0 < α_D < α_A < 1/φ(r) < α_E', W / 2, 800, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 5) });
  txt('Thm 18.3 (18.28)', W / 2, 840, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 5) });
};

/* ---- 10 GOLDEN ---- */
SCENES.golden = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const h = Math.log((1 + Math.sqrt(5)) / 2);
  const cx = 560, cy = 500, R = 220;
  const p = at(S, 0, 0.6);
  ring(cx, cy, R, C.gold, p, 2.5);
  txt('phase  δ_d = (3/4)(d−1) log 2  mod log φ', cx, cy - R - 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p });
  const nd = Math.floor(clamp((u - 1) / 12) * 60);
  for (let d = 1; d <= nd; d++) { const del = ((0.75 * (d - 1) * Math.log(2)) % h) / h; const an = -Math.PI / 2 + del * TAU; dot(cx + R * Math.cos(an), cy + R * Math.sin(an), d === nd ? 14 : 7, d === nd ? 'm' : 'c', p); if (d === nd) line(cx, cy, cx + R * Math.cos(an), cy + R * Math.sin(an), C.mag, p * 0.6, 1.5); }
  txt('r = 1/φ ,  β = 3/4', cx, cy + 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p });
  const gx = 1000, gy = 760, gw = 760, gh = 400;
  const p1 = at(S, 1, 0.5);
  line(gx, gy, gx + gw, gy, C.dim, p1, 1.5); line(gx, gy, gx, gy - gh, C.dim, p1, 1.5);
  txt('dimension d', gx + gw / 2, gy + 40, { size: 20, fam: F.mono, align: 'center', c: C.white, a: p1 });
  txt('exact recovery risk (schematic)', gx + gw / 2, gy - gh - 20, { size: 20, fam: F.mono, align: 'center', c: C.white, a: p1 });
  for (let d = 1; d <= nd; d++) { const del = ((0.75 * (d - 1) * Math.log(2)) % h) / h; const risk = 0.5 + 0.28 * Math.cos(TAU * del); dot(gx + d / 60 * gw, gy - risk * gh, 7, 'm', p1); }
  txt('never converges', gx + gw / 2, gy - gh + 30, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 3) });
  txt('log 2 / log φ ∉ ℚ  ·  RECOVERY Thm 20.4', gx + gw / 2, gy + 80, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 3) });
};

/* ---- 11 LADDER ---- */
SCENES.ladder = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (p0 > 0) {
    const panels = [['single Gaussian jump', 0], ['finite random staircase', 1], ['continuous Brownian path', 2]];
    panels.forEach(([lab, k], i) => {
      const q = P(S, 0, 0.5 + i * 3) * p0, x0 = 200 + i * 540, y0 = 560, w = 460;
      box(x0, 320, w, 400, C.dim, q, 1.2, 'rgba(0,0,0,0.5)');
      txt(lab, x0 + w / 2, 300, { size: 22, fam: F.mono, w: 700, align: 'center', c: [C.gold, C.cyan, C.mag][i], a: q });
      curve(s => { let v = 0; if (k === 0) v = s > 0.05 ? 1.1 : 0; else if (k === 1) { for (let j = 1; j <= 5; j++) if (s > j / 6) v += (rnd(j, 7) - 0.5) * 1.6; } else { const N = Math.floor(s * 200); for (let j = 0; j < N; j++) v += (rnd(j, 11) - 0.5) * 0.18; } return [x0 + 20 + s * (w - 40), y0 - v * 100]; }, 200, [C.gold, C.cyan, C.mag][i], q, 3);
    });
    txt('POSTERIOR_FIELD Thm 38.2 · WINDOW_PHASES Thm 46.2, 47.2', W / 2, 790, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 7) * p0 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const gx = 300, gy = 620, gw = 1300;
    const th = 180 * (1 - 0.6 * P(S, 1, 0.5, 4));
    line(gx, gy, gx + gw, gy - 260, C.cyan, p1, 3);
    curve(q => { const x = q * th; return [gx + x, gy - x * 0.2 + Math.sin(q * 30 + t * 3) * 40 * (1 - q)]; }, 100, C.mag, p1, 3);
    fillBox(gx, gy - 300, th, 340, C.mag, 0.12 * p1);
    txt('boundary layer · width Q^(−1/4)', gx + th / 2, gy + 80, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p1 });
    txt('「外部仿射律可逼近端点，但不能包含端点」', W / 2, 300, { size: 38, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 2, 1), ab: 2 });
    txt('SPECTRAL_BOUNDARY Thm 54.2', W / 2, 345, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 1, 2) });
  }
};

/* ---- 12 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const k = Math.floor(t * 1.2) % PC.seq.length, x = PC.X[PC.seq[k]];
    switches(x, W / 2, 360, fade * P(S, 0, 0.2), 90);
    for (let j = 0; j < 3; j++) { const x0 = W / 2 + (j - 1.5) * 114, x1 = x0 + 114; curve(q => [lerp(x0, x1, q), 290 - Math.sin(q * Math.PI) * 60], 30, C.gold, fade * P(S, 0, 2) * (0.6 + 0.4 * Math.sin(t * 3 + j)), 2.5); }
    txt('the arrow lives in the relation, not in any part', W / 2, 520, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 0, 2) * fade, ls: 1 });
    txt('a large arrow ≠ a visible arrow', W / 2, 580, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 5) * fade });
    txt('6 volumes · paper proofs    |    6 Lean modules · frozen', W / 2, 680, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 0.3) * fade });
    txt('「“边缘白噪声”不等于“联合过程可逆”」', W / 2, 760, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.gold, a: P(S, 1, 4, 1) * fade, ab: 2 });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    const k = Math.floor(t * 1.5) % PC.seq.length;
    switches(PC.X[PC.seq[k]], W / 2, 380, ep * out, 80);
    txt('HIDDEN ARROW', W / 2, 650, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 12 });
    txt('奇 偶 隐 藏 时 间 箭 头 · TRURETURING FILM 013', W / 2, 720, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('White noise in the parts is not reversibility of the whole.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'FORWARD?', kernel: 'PARITY KERNEL', threshold: 'CRITICAL c_d', invisible: 'INVISIBLE', current: 'NET CURRENT', snapshots: 'SNAPSHOTS', orthogonal: 'ORTHOGONAL', search: 'LOG PRICE', sparse: 'THREE THRESHOLDS', golden: 'GOLDEN PHASE', ladder: 'WINDOW PHASES', finale: 'RELATION' });

function poster13() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  switches([1, -1, -1, 1], W / 2, 450, 1, 130);
  for (let j = 0; j < 3; j++) { const x0 = W / 2 + (j - 1.5) * 154, x1 = x0 + 154; curve(q => [lerp(x0, x1, q), 350 - Math.sin(q * Math.PI) * 80], 30, C.gold, 0.9, 4); }
  txt('每一部分都是噪声，整体却有方向', W / 2, 170, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('HIDDEN ARROW', W / 2, 850, { size: 130, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 12 });
  bloom(0.65);
  txt('奇 偶 隐 藏 时 间 箭 头  ·  边缘白噪声不等于联合过程可逆', W / 2, 930, { size: 38, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 013', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster13;
