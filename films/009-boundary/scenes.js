/* Film 009 — BOUNDARY / BULK · 边界与体. Holography stripped to what is proved. */

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



/* ---- film 009 badge override ---- */
function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED · FROZEN', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    analogy: ['PHYSICS ANALOGY · NOT CLAIMED', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
/* bulk ball of particles inside a boundary ring; returns nothing */
function bulk(cx, cy, R, t, a, proj = 0) {
  if (a <= 0) return;
  ring(cx, cy, R, C.cyan, a, 3);
  ring(cx, cy, R + 8 + 3 * Math.sin(t * 2), C.cyan, a * 0.3, 1);
  for (let k = 0; k < 90; k++) {
    const an = rnd(k, 1) * TAU + t * (0.1 + 0.2 * rnd(k, 2)) * (k % 2 ? 1 : -1);
    const r = R * 0.85 * Math.sqrt(rnd(k, 3));
    const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r;
    const bx = cx + Math.cos(an) * R, by = cy + Math.sin(an) * R;
    if (proj > 0 && k % 3 === 0) line(x, y, lerp(x, bx, proj), lerp(y, by, proj), C.mag, a * 0.25 * proj, 1);
    dot(x, y, 6, ['c', 'm', 'g'][k % 3], a * 0.8);
    if (proj > 0 && k % 3 === 0) dot(bx, by, 7, 'w', a * proj);
  }
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  bulk(W / 2, 540, 300, t, sp, P(S, 0, 2, 3));
  txt(scramble('THE INSIDE, WRITTEN ON THE BOUNDARY?', at(S, 0, 1.2), 3), W / 2, 190, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: sp * (1 - at(S, 1, 0.5)), ab: 2, ls: 3 });
  txt('WHAT CAN BE PROVED', W / 2, 180, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.green, a: P(S, 1, 1), ls: 4 });
  txt('— AND WHAT IS NOT CLAIMED', W / 2, 235, { size: 34, fam: F.orb, w: 700, align: 'center', c: C.vio, a: P(S, 1, 4), ls: 3 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const rp = clamp(u / 1.2);
  bulk(W / 2, 400, 200, t, 0.5, 0.6 + 0.4 * Math.sin(t * 0.5));
  txt(scramble('BOUNDARY / BULK', rp, 91), W / 2, 700, { size: 100, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 5, ls: 10 });
  txt('边 界 与 体', W / 2, 770, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.cyan, a: clamp((u - 0.8) / 0.8), ab: 2 });
  txt('TRURETURING · FILM 009 · HOLOGRAPHY, STRIPPED TO WHAT IS PROVED', W / 2, 180, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: clamp((u - 1.2) / 0.8), ls: 3 });
  txt('boundary = a summary sufficient for every declared future experiment', W / 2, 820, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 3) * (1 - P(S, 1, 0)) });
  txt('「边界保存的是内部对允许外部接续的作用」', W / 2, 820, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.gold, a: P(S, 1, 0.5) });
};

/* ---- 02 MINIMAL ---- */
SCENES.minimal = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const merge = ease(P(S, 0, 4, 3));
  const classes = 5, per = 5;
  for (let c = 0; c < classes; c++) for (let k = 0; k < per; k++) {
    const i = c * per + k;
    const x0 = 250 + rnd(i, 1) * 700, y0 = 240 + rnd(i, 2) * 520;
    const x1 = 400 + c * 120, y1 = 500;
    dot(lerp(x0, x1, merge), lerp(y0, y1, merge), 14, ['c', 'm', 'g', 'o', 'v'][c], at(S, 0, 0.6));
  }
  txt('interior states', 600, 220, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 0, 0.6) * (1 - merge), ls: 2 });
  txt('same answer to every allowed future test  ⇒  merge', 600, 640, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: merge });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    for (let k = 0; k < 3; k++) {
      const y = 320 + k * 130; box(1260, y - 40, 260, 80, C.cyan, p1, 2, 'rgba(0,20,30,0.7)'); txt(`boundary B${k + 1}`, 1390, y + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: p1 });
      arrow(1250, y, 1000, 500, C.cyan, p1 * 0.7, 2);
    }
    txt('MINIMAL EXACT BOUNDARY', 1400, 720, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 2), ls: 2 });
    thm('controlled_behavior_universal_property', 1400, 760, P(S, 1, 2), 'center');
  }
};

/* ---- 03 TOTALS ---- */
SCENES.totals = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p1 = at(S, 1, 0.5); const fade = 1 - p1;
  if (fade > 0) {
    const H = [[3, 5, C.cyan], [4, 4, C.mag]];
    const cut = P(S, 0, 9, 1);
    H.forEach(([a, b, col], i) => {
      const x = 420 + i * 560, gy = 700, sc = 50; const q = P(S, 0, 1 + i) * fade;
      fillBox(x, gy - a * sc, 120, a * sc, col, 0.6 * q); fillBox(x + 150, gy - b * sc, 120, b * sc, col, 0.6 * q * (1 - 0.85 * cut));
      txt(String(a), x + 60, gy - a * sc - 14, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: q }); txt(String(b), x + 210, gy - b * sc - 14, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: q * (1 - cut) });
      txt('b=0', x + 60, gy + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q }); txt('b=1', x + 210, gy + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: q });
      txt(cut > 0.5 ? `→ ${a}` : `total ${a + b}`, x + 135, 300, { size: 34, fam: F.orb, w: 900, align: 'center', c: cut > 0.5 ? C.gold : col, a: q });
    });
    txt('block allows only b = 0', 1500, 500, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: cut * fade });
    txt('A NUMBER IS NOT A BOUNDARY', 1500, 560, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.white, a: cut * fade, ls: 1 });
    thm('RRO Boundary Dynamics Prop. 3.2', 1500, 600, cut * fade, 'center');
  }
  if (p1 > 0) {
    const cases = [[1, 1, C.cyan, '4'], [1, -1, C.mag, '0']];
    cases.forEach(([a, b, col, tot], i) => {
      const x = 560 + i * 800, y = 480, s = 120; const q = P(S, 1, 1 + i);
      arrow(x - 200, y, x - 200 + s, y, col, q, 4);
      arrow(x - 200 + s, y, x - 200 + s + s * (b > 0 ? 1 : 0) - (b < 0 ? s : 0), y, col, q, 4);
      txt(`amplitudes (${a}, ${b})`, x, 330, { size: 28, fam: F.mono, w: 700, align: 'center', c: col, a: q });
      txt('each path: probability 1', x, 380, { size: 22, fam: F.mono, align: 'center', c: C.white, a: q });
      txt(`|sum|² = ${tot}`, x, 620, { size: 44, fam: F.orb, w: 900, align: 'center', c: col, a: P(S, 1, 3 + i), ab: 2 });
    });
    txt('PHASE IS PART OF THE BOUNDARY', W / 2, 740, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: P(S, 1, 5), ls: 2 });
  }
};

/* ---- 04 BUILD ---- */
SCENES.build = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'theory');
  const p1 = at(S, 1, 0.5); const fade = 1 - p1;
  if (fade > 0) {
    const rows = [['DO NOTHING', [], C.cyan], ['V  then  V†', ['V', 'V†'], C.mag]];
    const peek = P(S, 0, 8, 0.8);
    rows.forEach(([lab, gates, col], i) => {
      const y = 350 + i * 220; const q = P(S, 0, 1 + i) * fade;
      txt(lab, 300, y + 10, { size: 26, fam: F.orb, w: 900, align: 'center', c: col, a: q, ls: 2 });
      line(460, y, 1460, y, col, q, 3);
      box(560, y - 70, 800, 140, C.dim, q, 1.5, 'rgba(0,0,0,0.85)');
      gates.forEach((g, k) => { const x = 740 + k * 440; box(x - 50, y - 40, 100, 80, col, q * peek, 2, 'rgba(30,0,25,0.8)'); txt(g, x, y + 12, { size: 32, fam: F.orb, w: 900, align: 'center', c: col, a: q * peek }); });
      txt('in', 480, y - 20, { size: 18, fam: F.mono, c: C.dim, a: q }); txt('out', 1400, y - 20, { size: 18, fam: F.mono, c: C.dim, a: q });
    });
    txt('from outside: identical', 1650, 460, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) * fade });
    txt('a peek in the middle tells', 1650, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, a: peek * fade });
  }
  if (p1 > 0) {
    const A = [620, 480], B = [1300, 480];
    bulk(A[0], A[1], 170, t, p1, 0); bulk(B[0], B[1], 170, t + 3, p1, 0);
    fillBox(955, 300, 10, 360, C.gold, 0.8 * p1);
    txt('shared boundary', 960, 280, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: p1 });
    txt('K_{f∘e} = K_f · K_e', 960, 740, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: P(S, 1, 3) });
    const seed = P(S, 1, 9, 0.6);
    if (seed > 0) { ctx.globalAlpha = seed; ctx.strokeStyle = C.red; ctx.setLineDash([12, 10]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(A[0], A[1] + 180); ctx.quadraticCurveTo(960, 900, B[0], B[1] + 180); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; txt('hidden shared seed ✗', 960, 810, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.red, a: seed }); }
  }
};

/* ---- 05 CODE ---- */
SCENES.code = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const p1 = at(S, 1, 0.5); const fade = 1 - p1;
  if (fade > 0) {
    const cx = W / 2, cy = 470;
    dot(cx, cy - 170, 44, 'g', fade); txt('|s⟩', cx, cy - 158, { size: 30, fam: F.mono, w: 700, align: 'center', c: '#02040c', a: fade });
    const xs = [cx - 420, cx, cx + 420];
    xs.forEach((x, i) => {
      const q = P(S, 0, 2 + i * 0.5) * fade;
      line(cx, cy - 130, x, cy + 20, C.gold, q * 0.5, 2);
      box(x - 130, cy + 30, 260, 150, [C.cyan, C.mag, C.green][i], q, 2.5, 'rgba(4,10,24,0.7)');
      for (let k = 0; k < 18; k++) dot(x - 110 + rnd(k, i + Math.floor(t * 8)) * 220, cy + 55 + rnd(k + 5, i + Math.floor(t * 8)) * 110, 4, 'w', q * 0.5);
    });
    txt('one share = I/3', W / 2, cy + 240, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 6) * fade });
    const two = P(S, 0, 10, 0.6);
    if (two > 0) { ring(xs[0], cy + 105, 150, C.gold, two * fade, 3); ring(xs[2], cy + 105, 150, C.gold, two * fade, 3); txt('any two → everything', W / 2, cy + 290, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.gold, a: two * fade }); }
    thm('qutrit_single_share_maximally_mixed · qutrit_two_share_reconstruction', W / 2, 190, P(S, 0, 6) * fade, 'center');
  }
  if (p1 > 0) {
    const gx = 420, gy = 700, sc = 150, bw = 90;
    const S_ = [0, 1, 2, 1], I_ = [0, 0, 2, 2];
    const n = Math.min(4, 1 + Math.floor(Math.max(0, u - lineAt(S, 1).s - 1) / 1.6));
    for (let k = 0; k < 4; k++) {
      const x = gx + k * 290; const on = k < n;
      fillBox(x, gy - S_[k] * sc, bw, S_[k] * sc, C.cyan, 0.6 * p1 * (on ? 1 : 0.15));
      fillBox(x + bw + 20, gy - I_[k] * sc, bw, I_[k] * sc, C.gold, 0.7 * p1 * (on ? 1 : 0.15));
      txt(`${k} shares`, x + bw + 10, gy + 40, { size: 22, fam: F.mono, align: 'center', c: C.white, a: p1 });
    }
    line(gx - 20, gy, gx + 4 * 290, gy, C.dim, p1, 2);
    txt('entropy S / log 3', gx + 100, 240, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: p1 });
    txt('recoverable I / log 3', gx + 500, 240, { size: 24, fam: F.mono, w: 700, c: C.gold, a: p1 });
    txt('entropy rises then falls · information jumps at share two', W / 2, 800, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 6) });
  }
};

/* ---- 06 TREE (p-adic) ---- */
SCENES.tree = S => {
  const u = S.u, t = S.t;
  badges(S, ['analogy', 'lean']);
  const p0 = at(S, 0, 0.6);
  const depth = 6, top = 230, bottom = 690, xl = 260, xr = 1660;
  const nodeX = (d, k) => xl + (k + 0.5) * (xr - xl) / (1 << d);
  const nodeY = d => top + d * (bottom - top) / depth;
  const a = 0b010110, b = 0b010011; // two boundary points (as bit strings, low bit first split)
  const shared = 3;
  const grow = P(S, 0, 1, 3);
  for (let d = 1; d <= depth; d++) {
    const q = clamp(grow * depth - d + 1) * p0;
    for (let k = 0; k < (1 << d); k++) {
      const px = nodeX(d - 1, k >> 1), py = nodeY(d - 1), x = nodeX(d, k), y = nodeY(d);
      const onA = (a >> (depth - d)) === k, onB = (b >> (depth - d)) === k;
      const hl = P(S, 1, 1) > 0 && (onA || onB);
      line(px, py, x, y, hl ? (onA && onB ? C.gold : onA ? C.cyan : C.mag) : C.dim, q * (hl ? 1 : 0.45), hl ? 3 : 1.2);
      if (d === depth) dot(x, y, 6, 'w', q * 0.8);
    }
  }
  dot(nodeX(0, 0), nodeY(0), 14, 'g', p0);
  txt('BOUNDARY  =  ℤ₂ (the 2-adic integers)', W / 2, bottom + 60, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: P(S, 0, 4), ls: 1 });
  txt('depth ↔ scale', xr - 20, top + 10, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.gold, a: P(S, 0, 6) });
  const p1 = at(S, 1, 0.5);
  if (p1 > 0) {
    line(xl - 20, nodeY(shared), xr + 20, nodeY(shared), C.gold, 0.5 * P(S, 1, 3), 1.5);
    txt('meeting depth = shared digits = v_p(x − y)', W / 2, 190, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3) });
    thm('observation_distance_eq_padic_valuation', W / 2, bottom + 100, P(S, 1, 4), 'center');
    txt('gravity version: not claimed', W / 2, bottom + 135, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 1, 7) });
  }
};

/* ---- 07 HOLONOMY ---- */
SCENES.holonomy = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const cx = 700, cy = 500, R = 240;
  const pts = [0, 1, 2].map(i => [cx + Math.cos(-Math.PI / 2 + i * TAU / 3) * R, cy + Math.sin(-Math.PI / 2 + i * TAU / 3) * R]);
  const p0 = at(S, 0, 0.6);
  for (let i = 0; i < 3; i++) {
    const A = pts[i], B = pts[(i + 1) % 3]; const q = P(S, 0, 1 + i * 0.8);
    line(A[0], A[1], B[0], B[1], C.green, q, 4);
    const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
    txt('× (−1)  ✓', mx + (mx - cx) * 0.35, my + (my - cy) * 0.35 + 8, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: q });
  }
  pts.forEach(([x, y], i) => { dot(x, y, 40, ['c', 'm', 'g'][i], p0); txt(`patch ${i + 1}`, x, y + (i === 0 ? -60 : 75), { size: 20, fam: F.mono, align: 'center', c: C.white, a: p0 }); });
  // traveling arrow flipping
  const lap = (u * 0.35) % 1; const seg = Math.floor(lap * 3), fr = lap * 3 - seg;
  const A = pts[seg], B = pts[(seg + 1) % 3]; const px = lerp(A[0], B[0], fr), py = lerp(A[1], B[1], fr);
  const sign = seg % 2 === 0 ? 1 : -1;
  arrow(px, py, px, py - 50 * sign, C.gold, p0, 4);
  txt('loop product = −1', 1450, 400, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 0, 4), ab: 2 });
  const p1 = at(S, 1, 0.6);
  txt('NO GLOBAL FRAME', 1450, 500, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p1, ls: 3 });
  txt('the failure lives on the loop, not on any edge', 1450, 560, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 2) });
  thm('global_frame_iff_transition_coboundary', 1450, 610, P(S, 1, 2), 'center');
};

/* ---- 08 LIMIT ---- */
SCENES.limit = S => {
  const u = S.u, t = S.t;
  badge(clamp(u / 0.8), 'lean');
  const n = Math.min(9, 1 + Math.floor(Math.max(0, u - lineAt(S, 0).s - 2) / 1.2));
  for (let k = 0; k < n; k++) {
    const x = 240 + k * 95; const q = clamp((u - lineAt(S, 0).s - 2 - k * 1.2) / 0.4);
    for (let j = 0; j < 10; j++) { const on = j <= k; box(x, 250 + j * 46, 70, 40, on ? C.cyan : C.dim, q * (on ? 1 : 0.4), 1.5, on ? 'rgba(0,30,40,0.7)' : null); txt(on ? '1' : '0', x + 35, 278 + j * 46, { size: 20, fam: F.mono, w: 700, align: 'center', c: on ? C.cyan : C.dim, a: q }); }
    if (k > 0) arrow(x - 8, 230, x - 80, 230, C.dim, q * 0.6, 1.5);
  }
  txt('each is the projection of the next', 700, 210, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const gx = 1180, gy = 720, gw = 560, gh = 420;
    line(gx, gy, gx + gw, gy, C.dim, p1, 2); line(gx, gy, gx, gy - gh, C.dim, p1, 2);
    curve(tt => [gx + tt * gw, gy - Math.sqrt(tt * 9) / 3 * gh * 0.9], 80, C.gold, p1, 3);
    txt('‖vₙ‖ = √n', gx + gw - 20, gy - gh * 0.9 - 20, { size: 30, fam: F.mono, w: 700, align: 'right', c: C.gold, a: p1 });
    txt('n', gx + gw + 14, gy + 8, { size: 22, fam: F.mono, c: C.dim, a: p1 });
    stamp('NO WHOLE BEHIND THE LAYERS', 1460, 250, P(S, 1, 4, 0.6), C.red, 30, -0.03);
    txt('a consistent boundary does not guarantee an interior', W / 2, 800, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: P(S, 1, 7) });
    thm('compatible_unbounded_coordinates', gx + gw / 2, gy + 40, P(S, 1, 7), 'center');
  }
};

/* ---- 09 CONE ---- */
SCENES.cone = S => {
  const u = S.u, t = S.t;
  badges(S, ['lean', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  const cx = 560, cy = 500;
  if (p0 > 0) {
    // light cone
    for (const sg of [-1, 1]) { ctx.globalAlpha = p0 * 0.25; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - 260, cy + sg * 260); ctx.lineTo(cx + 260, cy + sg * 260); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; line(cx, cy, cx - 260, cy + sg * 260, C.gold, p0, 3); line(cx, cy, cx + 260, cy + sg * 260, C.gold, p0, 3); ctx.globalAlpha = p0; ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx, cy + sg * 260, 260, 50, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
    dot(cx, cy, 16, 'w', p0);
    for (let k = 0; k < 8; k++) { const f = ((t * 0.3 + k / 8) % 1); dot(cx + (k % 2 ? 1 : -1) * f * 250, cy - f * 250, 8, 'g', p0 * (1 - f)); }
    txt('Q = 0 on the whole light cone', 1400, 380, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 2) * p0 });
    txt('⇒  Q = λ · ( t² − x² − y² − z² )', 1400, 450, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 5) * p0 });
    txt('THE CONE FIXES THE METRIC, UP TO SCALE', 1400, 540, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: P(S, 0, 7) * p0, ls: 1 });
    thm('eq_smul_minkowski_of_null', 1400, 590, P(S, 0, 7) * p0, 'center');
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('clock rates → Lorentzian metric', 560, 250, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: p1, ls: 1 });
    for (let k = 0; k < 10; k++) { const q = P(S, 1, 2 + k * 0.4); const x = 260 + (k % 5) * 120, y = 330 + Math.floor(k / 5) * 120; box(x, y, 100, 100, C.cyan, q, 2, 'rgba(0,20,30,0.7)'); txt(String(k + 1), x + 50, y + 62, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: q }); }
    txt('1 + 2d + d(d−1)/2 = 10   (d = 3)', 560, 640, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 1, 6) });
    box(1100, 380, 640, 170, C.red, P(S, 1, 8), 2.5, 'rgba(30,0,10,0.75)');
    txt('quantum Fisher metric: aᵀJa ≥ 0', 1420, 445, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 1, 8) });
    txt('NEVER LORENTZIAN', 1420, 510, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.red, a: P(S, 1, 8), ls: 3 });
  }
};

/* ---- 10 HORIZON ---- */
SCENES.horizon = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'theory']);
  const cx = 620, cy = 500, rh = 150;
  const p0 = at(S, 0, 0.6);
  // black hole
  ctx.globalAlpha = p0; const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, rh); g.addColorStop(0, '#000'); g.addColorStop(1, '#05030c'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rh, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  ring(cx, cy, rh, C.orange, p0, 3); ring(cx, cy, rh + 12 + 4 * Math.sin(t * 2), C.orange, p0 * 0.35, 1.5);
  // light rays
  for (let k = 0; k < 12; k++) {
    const an = k / 12 * TAU; const r0 = rh + 40 + ((t * 60 + k * 20) % 260); const inside = false;
    dot(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0, 6, 'g', p0 * clamp(1 - (r0 - rh - 40) / 260));
  }
  // f(r) plot
  const gx = 1080, gy = 700, gw = 620, gh = 380;
  line(gx, gy - gh / 2, gx + gw, gy - gh / 2, C.dim, p0, 1.5); line(gx + 80, gy, gx + 80, gy - gh, C.dim, p0, 1.5);
  curve(tt => { const r = 0.72 + tt * 3.28; const f = 1 - 1 / r; return [gx + 80 + (r - 1) * gw / 3.5 * 1.0 + 0, gy - gh / 2 - f * gh / 2 * 0.95]; }, 100, C.cyan, P(S, 0, 2, 1), 3);
  txt('f(r)', gx + gw - 10, gy - gh + 30, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: p0 });
  txt('f > 0 hover possible', gx + gw - 10, gy - gh / 2 - 60, { size: 20, fam: F.mono, align: 'right', c: C.green, a: P(S, 0, 3) });
  txt('f < 0 trapped', gx + 90, gy - 30, { size: 20, fam: F.mono, c: C.red, a: P(S, 0, 3) });
  txt('clock rate²  =  escape  =  f', 1390, 230, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.gold, a: P(S, 0, 4) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const fall = ((u - lineAt(S, 1).s) * 0.18) % 1;
    const rr = lerp(rh + 250, rh * 0.3, fall);
    dot(cx + rr * 0.7, cy - rr * 0.7, 16, 'w', p1);
    txt('faller\'s clock: ticks normally', cx, cy + rh + 120, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('hovering acceleration → ∞', 1390, 800, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.red, a: P(S, 1, 4) });
    txt('standard relativity, reorganized · not a new discovery', W / 2, 180, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.orange, a: P(S, 1, 7) });
  }
};

/* ---- 11 RADIATION ---- */
SCENES.radiation = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p0 = at(S, 0, 0.6);
  const cx = 420, cy = 500;
  ctx.globalAlpha = p0; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, 110, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; ring(cx, cy, 110, C.orange, p0, 3);
  for (let k = 0; k < 60; k++) { const an = rnd(k, 1) * TAU; const r = 120 + ((t * 80 + rnd(k, 2) * 400) % 400); dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.9, 5, k % 3 ? 'o' : 'm', p0 * clamp(1 - (r - 120) / 400)); }
  for (let i = 0; i < 4; i++) { const x = 1000 + i * 190, y = 300; const q = P(S, 0, 2 + i * 0.4); box(x, y, 160, 110, C.orange, q, 2, 'rgba(30,15,0,0.6)'); for (let k = 0; k < 14; k++) dot(x + 12 + rnd(k, i + Math.floor(t * 6)) * 136, y + 12 + rnd(k + 9, i + Math.floor(t * 6)) * 86, 4, 'o', q * 0.6); txt('thermal', x + 80, y + 140, { size: 18, fam: F.mono, align: 'center', c: C.orange, a: q }); }
  const all = P(S, 0, 5);
  box(990, 470, 780, 110, C.gold, all, 3, 'rgba(30,20,0,0.5)');
  txt('together: everything', 1380, 538, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: all, ls: 2 });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    txt('recoverable = I(A : r_n | R^{n−1}), not S(radiation)', 1380, 650, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: p1 });
    txt('finite energy ⇏ constant power forever', 1380, 720, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: P(S, 1, 4) });
    thm('finite_energy_radiation_budget', 1380, 760, P(S, 1, 4), 'center');
  }
};

/* ---- 12 TIME ---- */
SCENES.time = S => {
  const u = S.u, t = S.t;
  badges(S, ['theory', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const gx = 300, gy = 700, gw = 900, gh = 420;
    line(gx, gy, gx + gw, gy, C.dim, p0, 2); line(gx, gy, gx, gy - gh, C.dim, p0, 2);
    txt('defect ε', gx + gw + 14, gy + 8, { size: 20, fam: F.mono, c: C.dim, a: p0 }); txt('repair cost / ε', gx - 10, gy - gh - 14, { size: 20, fam: F.mono, align: 'right', c: C.dim, a: p0 });
    const Y = r => gy - gh * (0.25 + (r - 1) / 0.125 * 0.55);
    const y1 = Y(1), y98 = Y(9 / 8);
    line(gx, y1, gx + gw, y1, C.cyan, p0 * 0.6, 1.5); txt('1', gx - 14, y1 + 6, { size: 20, fam: F.mono, align: 'right', c: C.cyan, a: p0 });
    line(gx, y98, gx + gw, y98, C.gold, p0 * 0.6, 1.5); txt('9/8', gx - 14, y98 + 6, { size: 20, fam: F.mono, align: 'right', c: C.gold, a: p0 });
    const dr = P(S, 0, 3, 3);
    curve(tt => { const e = 0.25 * (1 - tt * dr); const r = 1 + 0.125 * (1 - 2 * Math.sqrt(e)) + 0.004; return [gx + gw * (e / 0.25), Y(r)]; }, 100, C.mag, p0, 3);
    txt('→ 9/8 as ε → 0', gx + 40, y98 - 30, { size: 26, fam: F.mono, w: 700, c: C.gold, a: P(S, 0, 6) });
    txt('(schematic shape · exact limit 9/8)', gx + gw / 2, gy + 40, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: P(S, 0, 6) });
    txt('forcing time order has a price', 1560, 380, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: P(S, 0, 1) * p0, ls: 1 });
    txt('carried by late-output coherence', 1560, 430, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: P(S, 0, 8) * p0 });
  }
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    line(260, 480, 1660, 480, C.dim, p1, 2);
    for (let k = 0; k < 8; k++) { const x = 300 + k * 180; const hidden = k === 2; dot(x, 480, hidden ? 18 : 14, hidden ? 'v' : 'c', p1 * (hidden ? 0.5 + 0.5 * Math.sin(t * 3) : 1)); if (hidden) txt('archived · hidden', x, 440, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.vio, a: p1 }); }
    fillBox(1100, 470, 560, 20, C.cyan, 0.3 * p1); txt('current view', 1380, 530, { size: 20, fam: F.mono, align: 'center', c: C.cyan, a: p1 });
    txt('still changes which futures are allowed', W / 2, 640, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: P(S, 1, 3), ls: 1 });
    thm('hidden_archive_preserves_current_changes_temporal_domain', W / 2, 690, P(S, 1, 3), 'center');
  }
};

/* ---- 13 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    const cx = W / 2, cy = 500, R = 230;
    bulk(cx, cy, 150, t, 0.6 * fade, 0.5);
    ['SPACE', 'TIME', 'BOUNDARY', 'MEMORY'].forEach((w, i) => { const an = -Math.PI / 2 + i * TAU / 4 + t * 0.08; const q = P(S, 0, 0.5 + i * 0.8) * fade; txt(w, cx + Math.cos(an) * (R + 150), cy + Math.sin(an) * (R + 40) + 10, { size: 34, fam: F.orb, w: 900, align: 'center', c: [C.cyan, C.mag, C.gold, C.green][i], a: q, ls: 3 }); });
    txt('one relational process · four projections', W / 2, 180, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: P(S, 0, 4) * fade });
    txt('gravity · real entanglement entropy · strings : NOT CLAIMED', W / 2, 820, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.vio, a: P(S, 0, 7) * fade });
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    bulk(W / 2, 330, 150, t, ep * out, 0.8);
    txt('BOUNDARY / BULK', W / 2, 620, { size: 100, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', a: ep * out, ab: 5, ls: 10 });
    txt('边 界 与 体 · TRURETURING FILM 009', W / 2, 690, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 790, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Coordinates are information about how to read a point.', W / 2, 850, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'HOLOGRAPHY?', minimal: 'MIN-BOUNDARY', totals: 'NOT-A-NUMBER', build: 'GLUING', code: 'ERROR-CODE', tree: 'P-ADIC-TREE', holonomy: 'HOLONOMY', limit: 'NO-WHOLE', cone: 'LIGHT-CONE', horizon: 'HORIZON', radiation: 'RADIATION', time: 'TIME-PRICE', finale: 'PROJECTIONS' });

function poster9() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  bulk(W / 2, 470, 290, t, 1, 0.8);
  txt('内部，写在边界上？', W / 2, 150, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('BOUNDARY / BULK', W / 2, 850, { size: 120, fam: F.orb, w: 900, align: 'center', c: '#f4fbff', ab: 6, ls: 10 });
  bloom(0.65);
  txt('边 界 与 体  ·  全息，剥到可证明的部分', W / 2, 930, { size: 40, fam: F.zh, w: 700, align: 'center', c: C.cyan });
  txt('TRURETURING · FILM 009', W / 2, 985, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.gold, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster9;
