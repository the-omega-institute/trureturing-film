/* Film 005 — INDRA'S NET · 因陀罗网. Religious ideas read as structure. Scenes injected into the shared engine. */

function badge(a, kind) {
  if (a <= 0.01) return;
  const M = {
    lean: ['LEAN KERNEL · VERIFIED', C.green, 'rgba(0,30,15,0.7)'],
    theory: ['THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED', C.orange, 'rgba(40,20,0,0.75)'],
    reading: ['STRUCTURAL PARALLEL · NOT A DOCTRINAL CLAIM', C.vio, 'rgba(20,10,40,0.75)']
  }[kind];
  const w = tw(M[0], 15, F.mono, 700, 2) + 40;
  box(W / 2 - w / 2, 112, w, 30, M[1], a, 1.2, M[2]);
  txt(M[0], W / 2, 133, { size: 15, fam: F.mono, w: 700, align: 'center', c: M[1], a, ls: 2 });
}
/* badge that switches kind per narration line: kinds[k] for line k */
function badges(S, kinds) {
  let k = 0;
  for (let i = 0; i < kinds.length; i++) if (S.u >= lineAt(S, i).s - 0.3) k = i;
  const since = S.u - (k === 0 ? 0 : lineAt(S, k).s - 0.3);
  badge(clamp(since / 0.5) * clamp(S.u / 0.8), kinds[k]);
}
function thm(name, x, y, a, align = 'left') { txt(name, x, y, { size: 18, fam: F.mono, c: C.dim, a, align }); }
function hashStr(seed, n = 10) { const H = '0123456789abcdef'; let s = ''; for (let i = 0; i < n; i++) s += H[Math.floor(rnd(seed, i) * 16)]; return s; }
function ring(x, y, r, col, a, lw = 2) { if (a <= 0) return; ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
function arrow(x1, y1, x2, y2, col, a, w = 2.5) {
  if (a <= 0) return;
  line(x1, y1, x2, y2, col, a, w);
  const an = Math.atan2(y2 - y1, x2 - x1), L = 14;
  line(x2, y2, x2 - L * Math.cos(an - 0.4), y2 - L * Math.sin(an - 0.4), col, a, w);
  line(x2, y2, x2 - L * Math.cos(an + 0.4), y2 - L * Math.sin(an + 0.4), col, a, w);
}
/* a pearl with a small reflected image of the net inside */
function jewel(x, y, r, name, a, t, seed = 0) {
  if (a <= 0) return;
  dot(x, y, r * 1.7, name, a * 0.9);
  ctx.save(); ctx.globalAlpha = a * 0.55; ctx.beginPath(); ctx.arc(x, y, r * 0.8, 0, TAU); ctx.clip();
  ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 9; k++) {
    const an = k / 9 * TAU + t * 0.4 + seed; const rr = r * 0.55;
    ctx.fillStyle = k % 2 ? C.mag : C.cyan; ctx.fillRect(x + Math.cos(an) * rr - 1.5, y + Math.sin(an) * rr * 0.6 - 1.5, 3, 3);
  }
  ctx.restore(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  dot(x - r * 0.3, y - r * 0.35, r * 0.35, 'w', a * 0.8);
}

/* ---- 00 OPEN ---- */
SCENES.open = S => {
  const u = S.u, t = S.t;
  const sp = clamp(u / 1.5);
  drawNet(t, 0.75 * sp, t * 0.08, 0.35 + 0.05 * Math.sin(t * 0.2), null, 0.78, W / 2, 560);
  txt('言 语 装 不 下', W / 2, 190, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: sp * (1 - at(S, 0, 0.5)), ls: 6 });
  txt(scramble('WHAT WORDS CANNOT HOLD', at(S, 0, 1.2), 5), W / 2, 200, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 0, 0.5) * (1 - at(S, 1, 0.5)), ab: 3, ls: 4 });
  const p1 = at(S, 1, 0.5);
  txt('NOT PREACHING  ·  NOT DEBUNKING', W / 2, 200, { size: 36, fam: F.orb, w: 700, align: 'center', c: C.gold, a: p1 * (1 - at(S, 1, 0.5, 4.2)), ls: 4 });
  txt('WHICH OLD SHAPES SURVIVE PROOF?', W / 2, 200, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 1, 0.5, 4.2), ab: 2, ls: 4 });
};

/* ---- 01 TITLE ---- */
SCENES.title = S => {
  const u = S.u, t = S.t;
  const ry = t * 0.12;
  const obs = { o: [0, 0, -6], d: [Math.sin(t * 0.3) * 0.3, Math.cos(t * 0.25) * 0.2, 1], cos: 0.93 };
  const n = Math.hypot(...obs.d); obs.d = obs.d.map(x => x / n);
  drawNet(t, 0.9, ry, 0.35, u > 3 ? obs : null, 0.72, W / 2, 380);
  const rp = clamp(u / 1.4);
  txt(scramble("INDRA'S NET", rp, 51), W / 2, 640, { size: 124, fam: F.orb, w: 900, align: 'center', c: '#fff8e8', ab: 6, ls: 14 });
  txt('因 陀 罗 网', W / 2, 720, { size: 58, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - 0.8) / 0.8), ab: 3 });
  txt('TRURETURING · FILM 005 · RELIGION, READ AS STRUCTURE', W / 2, 780, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - 1.2) / 0.8), ls: 5 });
  txt('Huayan · Indrajāla — every pearl reflects every other', W / 2, 200, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.dim, a: at(S, 0, 0.6) * (1 - at(S, 1, 0.4)) });
  txt('PEARLS  =  PROOFS', W / 2, 200, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: at(S, 1, 0.5), ab: 2, ls: 6 });
};

/* ---- 02 NET (Merkle DAG, corrected) ---- */
const NETG = (function () {
  const N = [
    { x: 330, y: 330, p: [] }, { x: 330, y: 620, p: [] },
    { x: 620, y: 260, p: [0] }, { x: 620, y: 470, p: [0, 1] }, { x: 620, y: 680, p: [1] },
    { x: 910, y: 350, p: [2, 3] }, { x: 910, y: 600, p: [3, 4] },
    { x: 1200, y: 470, p: [5, 6] }, { x: 1200, y: 720, p: [] }
  ];
  const depth = []; N.forEach((n, i) => { depth[i] = n.p.length ? 1 + Math.max(...n.p.map(j => depth[j])) : 0; });
  const desc = i => { const out = new Set(); let grow = true; out.add(i); while (grow) { grow = false; N.forEach((n, k) => { if (!out.has(k) && n.p.some(j => out.has(j))) { out.add(k); grow = true; } }); } return out; };
  return { N, depth, desc };
})();
SCENES.net = S => {
  const u = S.u, t = S.t, L = S.L;
  badge(clamp(u / 0.8), 'theory');
  const { N, depth, desc } = NETG;
  const ap = clamp(u / 1.0);
  // phase A: change pearl 0, propagate by depth
  const tA = L[0].s + 4.0;
  const D0 = desc(0);
  const phB = at(S, 1, 0.6);
  const tB = L[1].s + 5.5;
  const showW = clamp((u - L[1].s - 1) / 0.8);
  for (let i = 0; i < N.length; i++) for (const j of N[i].p) {
    const lit = D0.has(i) && u > tA + depth[i] * 0.55 && phB < 0.5;
    arrow(N[j].x + 34, N[j].y + (N[i].y - N[j].y) * 0.1, N[i].x - 36, N[i].y, lit ? C.mag : C.cyan, ap * (lit ? 0.95 : 0.45), lit ? 3.5 : 2);
  }
  N.forEach((n, i) => {
    if (i === 8 && showW <= 0) return;
    const a = i === 8 ? showW : ap;
    const changedA = D0.has(i) && u > tA + depth[i] * 0.55 && phB < 0.5;
    const changedB = i === 8 && u > tB;
    const name = changedA ? 'm' : changedB ? 'o' : (i === 7 ? 'g' : 'c');
    jewel(n.x, n.y, 30, name, a, t, i);
    const hs = hashStr(i * 7 + (changedA ? 101 : 0) + (changedB ? 55 : 0), 8);
    const flick = changedA ? clamp((u - tA - depth[i] * 0.55) / 0.5) : changedB ? clamp((u - tB) / 0.5) : 1;
    txt(scramble(hs, flick, i), n.x, n.y + 62, { size: 17, fam: F.mono, align: 'center', c: changedA ? C.mag : changedB ? C.orange : C.dim, a });
  });
  txt('address = hash( content ‖', 1560, 230, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6, 1.2) * (1 - phB) });
  txt('hashes of everything it rests on )', 1560, 265, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.6, 1.2) * (1 - phB) });
  txt('change one pearl →', 1560, 330, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.mag, a: at(S, 0, 0.6, 4) * (1 - phB) });
  txt('every image downstream changes', 1560, 372, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.mag, a: at(S, 0, 0.6, 5) * (1 - phB) });
  // phase B: correction
  if (phB > 0) {
    ring(N[7].x, N[7].y, 70 + 6 * Math.sin(t * 3), C.gold, phB, 2.5);
    txt('a pearl holds its ANCESTORS', 1560, 290, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.gold, a: phB, ls: 1 });
    txt('— not the whole net', 1560, 334, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: phB });
    const pw = clamp((u - tB - 0.6) / 0.6) * (1 - at(S, 2, 0.5));
    txt('w changed  ⇒  record(v) unchanged', 1560, 420, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.orange, a: pw });
    txt('v', N[7].x, N[7].y - 50, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.gold, a: phB });
    txt('w', N[8].x, N[8].y - 50, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.orange, a: phB });
    thm('Math·Myth·Match 83.3 · DOLT 7.4', 1560, 470, pw, 'center');
  }
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    txt('depth(v)  ≤  |N| − 1', 1560, 560, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: p2, ab: 2 });
    txt('within one ledger, the reflections are finite', 1560, 615, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: p2 });
    txt('单本账本 · 重重有尽', 1560, 670, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: at(S, 2, 0.6, 1.5) });
  }
};

/* ---- 03 DEPENDENT ORIGINATION ---- */
SCENES.origination = S => {
  const u = S.u, t = S.t, L = S.L;
  badges(S, ['theory', 'theory', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    txt('此 有 故 彼 有', W / 2, 250, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p0, ab: 3 });
    txt('this exists, because that exists', W / 2, 305, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: p0 });
    const cx = W / 2, cy = 560;
    jewel(cx, cy, 44, 'g', p0, t, 3);
    txt('PROOF', cx, cy + 90, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p0, ls: 3 });
    for (let k = 0; k < 6; k++) {
      const an = -Math.PI / 2 + (k - 2.5) * 0.5; const q = clamp((u - L[0].s - 3 - k * 0.35) / 0.5) * p0;
      const x = cx + Math.cos(an + Math.PI) * 420 * 0 + (k - 2.5) * 190, y = cy - 170 + Math.abs(k - 2.5) * 40;
      arrow(cx + (x - cx) * 0.2, cy - 40, x, y + 24, C.cyan, q, 2);
      dot(x, y, 16, 'c', q);
    }
    txt('缘 = what a proof refers to', cx, 760, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[0].s - 4) / 0.6) * p0 });
  }
  const p1 = at(S, 1, 0.6) * (1 - at(S, 2, 0.5));
  if (p1 > 0) {
    const cards = ['p ∨ ¬p', 'r ∨ ¬r', '(p∧r) → (p∧r)'];
    cards.forEach((s, i) => {
      const q = clamp((u - L[1].s - 2 - i * 1.0) / 0.5) * p1; const x = 440 + i * 520;
      box(x - 210, 300, 420, 150, [C.cyan, C.mag, C.gold][i], q, 2.5, 'rgba(4,10,24,0.7)');
      txt(s, x, 390, { size: 40, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    });
    txt('support families need not be closed under intersection', W / 2, 540, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].s - 5) / 0.6) * p1 });
    stamp('缘无定法', W / 2, 690, clamp((u - L[1].s - 6.5) / 0.6) * p1, C.gold, 64, -0.05);
    txt('NO SINGLE FIXED GRAPH', W / 2, 790, { size: 24, fam: F.orb, w: 700, align: 'center', c: C.gold, a: clamp((u - L[1].s - 7) / 0.6) * p1, ls: 4 });
  }
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    const src = 7, sx = k => 420 + k * 180;
    const sup = [[0, 1], [1, 3], [2, 3, 5], [4, 6], [5, 6]];
    const cut = new Set([1, 3, 6]);
    const hl = clamp((u - L[2].s - 5) / 0.8);
    sup.forEach((g, i) => {
      const x = 480 + i * 240, y = 640;
      g.forEach(k => line(sx(k), 330, x, y - 30, cut.has(k) && hl > 0 ? C.red : C.dim, p2 * (cut.has(k) ? 0.4 + 0.5 * hl : 0.35), cut.has(k) && hl > 0 ? 2.5 : 1.2));
      box(x - 70, y - 30, 140, 60, C.vio, p2, 2, 'rgba(10,6,30,0.8)');
      txt('support ' + (i + 1), x, y + 8, { size: 18, fam: F.mono, align: 'center', c: C.white, a: p2 });
    });
    for (let k = 0; k < src; k++) { dot(sx(k), 300, 22, cut.has(k) && hl > 0 ? 'm' : 'c', p2); if (cut.has(k) && hl > 0) ring(sx(k), 300, 34, C.red, hl, 3); }
    txt('SOURCES', 260, 308, { size: 20, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: p2, ls: 2 });
    txt('min { sources whose removal kills every proof }  =  min { sources hitting every minimal support }', W / 2, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: clamp((u - L[2].s - 3) / 0.6) });
    thm('source_cutset_hitting_duality', W / 2, 810, clamp((u - L[2].s - 3.5) / 0.6), 'center');
  }
};

/* ---- 04 EMPTINESS ---- */
SCENES.empty = S => {
  const u = S.u, t = S.t, L = S.L;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6);
  txt('空 亦 复 空', W / 2, 230, { size: 64, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p0 * (1 - at(S, 1, 0.5, 6)), ab: 3 });
  const kx = [560, 1360];
  kx.forEach((x, i) => {
    const q = clamp((u - L[0].s - 2 - i * 0.8) / 0.6);
    drawHyper(CUBE4, [[0, 3, t * (0.5 + i * 0.15)], [1, 2, t * 0.3]], { scale: 0.95, rx: 0.4, ry: t * 0.3 * (i ? -1 : 1), a: 0.7 * q, cx: x, cy: 420, lw: 1.4, camZ: 6 });
    txt(i ? 'KERNEL  K₂' : 'KERNEL  K₁', x, 590, { size: 30, fam: F.orb, w: 900, align: 'center', c: i ? C.mag : C.cyan, a: q, ls: 3 });
    txt('sound · consistent', x, 630, { size: 22, fam: F.mono, align: 'center', c: C.dim, a: q });
  });
  txt('same theorems', W / 2, 420, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[0].s - 5) / 0.6) * (1 - at(S, 1, 0.5)) });
  txt('=', W / 2, 470, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.white, a: clamp((u - L[0].s - 5) / 0.6) * (1 - at(S, 1, 0.5)) });
  const p1 = at(S, 1, 0.6);
  if (p1 > 0) {
    const e1 = clamp((u - L[1].s - 2) / 0.6), e2 = clamp((u - L[1].s - 3.5) / 0.6);
    box(kx[0] - 220, 680, 440, 70, C.cyan, e1, 2, 'rgba(0,20,30,0.75)');
    txt('P : EMPTY  (依缘而空)', kx[0], 726, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: e1 });
    box(kx[1] - 220, 680, 440, 70, C.mag, e2, 2, 'rgba(30,0,25,0.75)');
    txt('P : NOT EMPTY', kx[1], 726, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.mag, a: e2 });
    txt('≠', W / 2, 730, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.red, a: e2 });
    const p2 = clamp((u - L[1].s - 6) / 0.6);
    txt('which proofs a kernel accepts', W / 2, 240, { size: 36, fam: F.raj, w: 600, align: 'center', c: C.white, a: p2 });
    txt('IS A PARAMETER THAT CANNOT BE DROPPED', W / 2, 290, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p2, ls: 2 });
    thm('Dependent Origination Ledger · Prop. 4.4', W / 2, 800, p2, 'center');
  }
};

/* ---- 05 DAO ---- */
SCENES.dao = S => {
  const u = S.u, t = S.t, L = S.L;
  badges(S, ['reading', 'lean', 'lean']);
  const cx = 700, cy = 480, R = 290;
  const p0 = clamp(u / 1.0);
  // horizon
  ctx.globalAlpha = p0 * 0.5; ctx.fillStyle = 'rgba(40,20,70,0.35)'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  ring(cx, cy, R, C.vio, p0, 3);
  ring(cx, cy, R + 8 + 4 * Math.sin(t * 2), C.vio, p0 * 0.3, 1);
  txt('HORIZON', cx, cy - R - 24, { size: 22, fam: F.orb, w: 700, align: 'center', c: C.vio, a: p0, ls: 4 });
  // big glyph
  txt('道', cx, cy + 70, { size: 220, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p0 * (0.35 + 0.1 * Math.sin(t)), ab: 4 });
  // expressions
  const pe = at(S, 1, 0.6);
  for (let k = 0; k < 7; k++) {
    const an = k / 7 * TAU + t * 0.1; const d = R * 0.55; const r = R * (0.22 + 0.05 * rnd(k, 3));
    const q = clamp((u - L[1].s - 1.5 - k * 0.3) / 0.5) * pe;
    ring(cx + Math.cos(an) * d, cy + Math.sin(an) * d, r, k === 3 ? C.gold : C.cyan, q * (k === 3 ? 1 : 0.6), k === 3 ? 3 : 1.5);
    if (k === 3) txt('"Dao"', cx + Math.cos(an) * d, cy + Math.sin(an) * d + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.gold, a: q });
  }
  // right side
  const x2 = 1420;
  txt('道 可 道 ， 非 常 道', x2, 260, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.white, a: at(S, 0, 0.6), ab: 2 });
  txt('Daodejing · 1', x2, 305, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: at(S, 0, 0.6) });
  if (pe > 0) {
    txt('∀e,  meaning(e) ⊆ horizon', x2, 400, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].s - 2) / 0.5) });
    txt('∀e,  horizon \\ meaning(e) ≠ ∅', x2, 450, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].s - 4) / 0.5) });
    txt('⊢  meaning(Dao)  ⊂  horizon', x2, 530, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.gold, a: clamp((u - L[1].s - 7) / 0.5), ab: 2 });
    thm('dao_name_is_a_proper_part_under_the_same_premises', x2, 575, clamp((u - L[1].s - 7.5) / 0.5), 'center');
  }
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    txt('a light theorem: the conclusion follows from the premises', x2, 640, { size: 22, fam: F.raj, w: 600, align: 'center', c: C.orange, a: p2 });
    txt('常 道 不 可 道', x2, 720, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.white, a: clamp((u - L[2].s - 4) / 0.6) });
    txt('而 常 道 之 律 可 证', x2, 780, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.gold, a: clamp((u - L[2].s - 6.5) / 0.6), ab: 2 });
  }
};

/* ---- 06 SUFFERING & STILLNESS ---- */
SCENES.still = S => {
  const u = S.u, t = S.t, L = S.L;
  badges(S, ['theory', 'theory', 'lean']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 2, 0.5));
  if (p0 > 0) {
    const rows = 8, fl = new Set([1, 4, 6]);
    const x0 = 360, y0 = 250;
    txt('CLAIMS', x0 + 150, y0 - 20, { size: 22, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: p0, ls: 3 });
    txt('LEDGER', x0 + 560, y0 - 20, { size: 22, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: p0, ls: 3 });
    const fix = k => clamp((u - L[0].s - 6 - [...fl].indexOf(k) * 0.8) / 0.4);
    for (let k = 0; k < rows; k++) {
      const y = y0 + 20 + k * 58; const f = fl.has(k);
      const fixed = f ? fix(k) : 1;
      box(x0, y, 300, 44, f && fixed < 1 ? C.red : C.dim, p0, 1.5, 'rgba(4,10,24,0.6)');
      txt('claim #' + (k + 1), x0 + 150, y + 30, { size: 18, fam: F.mono, align: 'center', c: C.white, a: p0 });
      if (!f || fixed > 0) { box(x0 + 410, y, 300, 44, C.dim, p0 * (f ? fixed : 1), 1.5, 'rgba(4,10,24,0.6)'); txt(hashStr(k * 3, 12), x0 + 560, y + 30, { size: 18, fam: F.mono, align: 'center', c: f ? C.green : C.dim, a: p0 * (f ? fixed : 1) }); }
      line(x0 + 300, y + 22, x0 + 410, y + 22, f && fixed < 1 ? C.red : C.cyan, p0 * 0.6, f ? 2.5 : 1);
      if (f && fixed < 1) txt('FLOAT', x0 + 355, y + 17, { size: 14, fam: F.mono, w: 700, align: 'center', c: C.red, a: p0 });
    }
    txt('苦 = an account that does not balance', 1450, 330, { size: 32, fam: F.raj, w: 600, align: 'center', c: C.white, a: p0 });
    txt('min repair  =  |Float|  =  3', 1450, 420, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.gold, a: clamp((u - L[0].s - 5) / 0.6) * p0, ab: 2 });
    const p1 = at(S, 1, 0.6);
    if (p1 > 0) {
      box(1250, 520, 400, 90, C.green, p1 * p0, 2, 'rgba(0,25,15,0.7)');
      txt('agent = id   (does no harm)', 1450, 575, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: p1 * p0 });
      stamp('善不保证修复', 1450, 720, clamp((u - L[1].s - 3) / 0.6) * p0, C.orange, 52, -0.05);
    }
  }
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    const cx = 640, cy = 480;
    // frontier drift
    for (let k = 0; k < 90; k++) {
      const an = rnd(k, 1) * TAU + t * (0.2 + rnd(k, 2) * 0.4) * (k % 2 ? 1 : -1); const r = 170 + 70 * rnd(k, 3) + 20 * Math.sin(t * 2 + k);
      dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.85, 8, 'o', p2 * 0.8);
    }
    for (let k = 0; k < 40; k++) { const an = rnd(k, 5) * TAU, r = 90 * Math.sqrt(rnd(k, 6)); dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r, 10, 'c', p2); }
    for (let k = 0; k < 36; k++) { const an = k / 36 * TAU; ring(cx + Math.cos(an) * 320, cy + Math.sin(an) * 300, 9, C.vio, p2 * 0.9, 2); }
    txt('FROZEN', cx, cy + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: p2, ls: 3 });
    txt('moving frontier', cx + 260, cy - 180, { size: 20, fam: F.mono, align: 'center', c: C.orange, a: p2 });
    txt('never provable', cx - 300, cy - 300, { size: 20, fam: F.mono, align: 'center', c: C.vio, a: p2 });
    txt('寂 静', 1450, 290, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p2, ab: 3 });
    txt('no permitted change can move it', 1450, 350, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: p2 });
    txt('Fix L  =  Frozen L  ∪  { p | ¬ Proved p }', 1450, 470, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[2].s - 3.5) / 0.6), ab: 1 });
    thm('fixed_eq_frozen_union_unprovable', 1450, 515, clamp((u - L[2].s - 4) / 0.6), 'center');
    txt('naming it stillness is a structural reading', 1450, 600, { size: 20, fam: F.mono, align: 'center', c: C.vio, a: clamp((u - L[2].s - 6) / 0.6) });
  }
};

/* ---- 07 KARMA & NOT-SELF ---- */
SCENES.karma = S => {
  const u = S.u, t = S.t, L = S.L;
  badges(S, ['theory', 'lean', 'reading']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const n = 4 + Math.min(8, Math.floor(Math.max(0, u - L[0].s - 1.5) / 0.8));
    for (let k = 0; k < n; k++) {
      const x = 180 + k * 130, y = 450; const fresh = k >= n - 1;
      box(x, y - 45, 110, 90, fresh ? C.gold : C.cyan, p0 * (fresh ? 0.9 + 0.1 * Math.sin(t * 6) : 0.8), 2, 'rgba(4,10,24,0.7)');
      txt(hashStr(k * 13, 6), x + 55, y + 8, { size: 16, fam: F.mono, align: 'center', c: fresh ? C.gold : C.white, a: p0 });
    }
    const pl = Math.max(0, n - 1);
    ctx.globalAlpha = p0; ctx.strokeStyle = C.green; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(180, 540); ctx.lineTo(180, 560); ctx.lineTo(180 + pl * 130 - 20, 560); ctx.lineTo(180 + pl * 130 - 20, 540); ctx.stroke(); ctx.globalAlpha = 1;
    txt('old record preserved as a prefix', 180 + pl * 65, 600, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.green, a: p0 });
    txt('业 不 失', W / 2, 280, { size: 68, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p0, ab: 3 });
    txt('karma = one permitted change + the claims it appends', W / 2, 740, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: p0 });
  }
  const p1 = at(S, 1, 0.6) * (1 - at(S, 2, 0.5));
  if (p1 > 0) {
    txt('无 我', 460, 260, { size: 64, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p1, ab: 3 });
    txt('the verdict ignores who is asking', 460, 320, { size: 26, fam: F.raj, w: 600, align: 'center', c: C.white, a: p1 });
    const roles = ['A', 'B', 'C', 'D'];
    const sw = Math.floor(Math.max(0, u - L[1].s) / 1.2);
    roles.forEach((r, i) => {
      const slot = (i + sw) % 4; const tx = 220 + slot * 160;
      const x = tx; const y = 520;
      dot(x, y, 34, ['c', 'm', 'g', 'v'][i], p1);
      txt(r, x, y + 9, { size: 26, fam: F.orb, w: 900, align: 'center', c: '#02040c', a: p1 });
    });
    txt('structural value: ✓ every swap', 460, 640, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.green, a: clamp((u - L[1].s - 4) / 0.5) * p1 });
    const q = clamp((u - L[1].s - 7) / 0.5) * p1;
    box(1100, 420, 620, 170, C.red, q, 2.5, 'rgba(30,0,10,0.7)');
    txt('"privilege for ALICE only"', 1410, 490, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt('✗  fails under role swap', 1410, 550, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.red, a: q });
    thm('named_privilege_is_not_universal', 1410, 630, q, 'center');
    thm('structural_universal_core_is_universal', 460, 690, clamp((u - L[1].s - 4.5) / 0.5) * p1, 'center');
  }
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    txt('有 业 报 而 无 作 者', W / 2, 300, { size: 62, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p2, ab: 3 });
    txt('Saṃyukta Āgama 335', W / 2, 350, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p2 });
    txt('≠', W / 2, 460, { size: 80, fam: F.orb, w: 900, align: 'center', c: C.red, a: clamp((u - L[2].s - 3) / 0.5) });
    txt('"the author has nothing to do with the hash"', W / 2, 560, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: clamp((u - L[2].s - 4) / 0.5) });
    txt('the model has no variable for 思 · intention', W / 2, 660, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.vio, a: clamp((u - L[2].s - 8) / 0.5) });
  }
};

/* ---- 08 GOD: THE CHECKLIST ---- */
SCENES.god = S => {
  const u = S.u, t = S.t, L = S.L;
  badge(clamp(u / 0.8), 'theory');
  const p0 = at(S, 0, 0.6) * (1 - at(S, 2, 0.5));
  // radiant object
  const cx = 470, cy = 470;
  if (p0 > 0) {
    drawHyper(CUBE6, [[0, 5, t * 0.2], [1, 4, t * 0.15], [2, 3, t * 0.11]], { scale: 1.0, rx: 0.3, ry: t * 0.1, a: 0.55 * p0, cx, cy, lw: 1, dots: false, camZ: 7 });
    dot(cx, cy, 60 + 8 * Math.sin(t * 2), 'g', p0);
    txt('ALL-KNOWING', cx, cy + 250, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.gold, a: p0, ls: 4 });
    txt('MATHEMATICAL OBJECT', cx, cy + 285, { size: 18, fam: F.mono, align: 'center', c: C.dim, a: p0 });
    const rows = [['OMNISCIENT', '✓', C.green, 3.0], ['OMNIPRESENT', '✓', C.green, 4.2], ['ETERNAL', '✓', C.green, 5.2], ['UNFATHOMABLE', '✓', C.green, 6.2], ['ONE', '✓', C.green, 7.4],
      ['OMNIPOTENT', 'n/a', C.dim, 99], ['SELF-KNOWING', '✗', C.red, 99]];
    rows.forEach(([name, mark, col, dt], i) => {
      const y = 250 + i * 72;
      let q = clamp((u - L[0].s - dt) / 0.4);
      if (i === 5) q = clamp((u - L[1].s - 0.2) / 0.4);
      if (i === 6) q = clamp((u - L[1].s - 0.8) / 0.4);
      box(900, y - 34, 820, 60, col, q * p0, i === 6 ? 3 : 1.5, i === 6 ? 'rgba(40,0,10,0.75)' : 'rgba(4,10,24,0.65)');
      txt(name, 930, y + 8, { size: 26, fam: F.orb, w: 700, c: C.white, a: q * p0, ls: 3 });
      txt(mark, 1690, y + 10, { size: 32, fam: F.orb, w: 900, align: 'right', c: col, a: q * p0 });
    });
    const tq = clamp((u - L[1].s - 2) / 0.5) * p0;
    txt('Tarski: truth of arithmetic is not definable inside it', 1310, 790, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.red, a: tq });
    const qq = clamp((u - L[1].s - 7) / 0.6) * p0;
    if (qq > 0) {
      ctx.globalAlpha = qq * 0.85; ctx.fillStyle = '#02040c'; ctx.fillRect(860, 190, 900, 560); ctx.globalAlpha = 1;
      txt('mathematics does not judge theology', 1310, 400, { size: 36, fam: F.raj, w: 600, align: 'center', c: C.white, a: qq });
      txt('IT MAKES THEOLOGY A TAXONOMY', 1310, 470, { size: 32, fam: F.orb, w: 900, align: 'center', c: C.gold, a: qq, ls: 2 });
      txt('of chosen axioms', 1310, 520, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.gold, a: qq });
      txt('数学不裁神学 · 数学将神学分类学化', 1310, 600, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: qq });
    }
  }
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    txt('G : Type', W / 2 - 300, 400, { size: 64, fam: F.mono, w: 700, align: 'center', c: C.white, a: p2 });
    txt('⊬', W / 2, 400, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.red, a: clamp((u - L[2].s - 2.5) / 0.5) });
    txt('g : G', W / 2 + 300, 400, { size: 64, fam: F.mono, w: 700, align: 'center', c: C.gold, a: clamp((u - L[2].s - 2.5) / 0.5) });
    txt('a type named God does not produce an inhabitant', W / 2, 500, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[2].s - 3.5) / 0.5) });
    const q = clamp((u - L[2].s - 6) / 0.5);
    txt('no writing existence into a definition', W / 2, 600, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.orange, a: q, ls: 1 });
    txt('and reporting the projection as a proof', W / 2, 645, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.orange, a: q, ls: 1 });
    thm('Formal Concept Dynamics §52 · non-circularity in philosophy of religion', W / 2, 720, q, 'center');
  }
};

/* ---- 09 FAITH ---- */
SCENES.faith = S => {
  const u = S.u, t = S.t, L = S.L;
  badge(clamp(u / 0.8), 'theory');
  const p0 = clamp(u / 1);
  const levels = 7, bx = 470;
  const climb = Math.min(levels - 1, Math.max(0, (u - L[0].s - 2) / 1.3));
  for (let k = 0; k < levels; k++) {
    const y = 780 - k * 88; const q = clamp(climb - k + 1) * p0;
    const w = 360 - k * 26;
    box(bx - w / 2, y - 34, w, 64, k <= climb ? C.cyan : C.dim, q, 2, 'rgba(4,10,24,0.7)');
    txt(k === 0 ? 'T₀' : `T${'₀₁₂₃₄₅₆'[k]} = T${'₀₁₂₃₄₅'[k - 1]} + Con(T${'₀₁₂₃₄₅'[k - 1]})`, bx, y + 8, { size: k === 0 ? 26 : 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    if (k > 0) { const sp = clamp(climb - k + 1.3) * clamp(k - climb + 1.2); dot(bx + w / 2 + 40, y + 30, 22 + 6 * Math.sin(t * 5), 'g', sp * p0); if (sp > 0.2) txt('trust', bx + w / 2 + 80, y + 36, { size: 18, fam: F.mono, c: C.gold, a: sp * p0 }); }
  }
  txt('信 仰', 1400, 250, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.gold, a: at(S, 0, 0.6), ab: 3 });
  txt('each climb trusts a consistency', 1400, 310, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: at(S, 0, 0.6, 3) });
  txt('that cannot be proved from inside', 1400, 350, { size: 28, fam: F.raj, w: 600, align: 'center', c: C.white, a: at(S, 0, 0.6, 4) });
  const p1 = at(S, 1, 0.6);
  txt('= adopting a REFLECTION PRINCIPLE', 1400, 430, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: p1, ls: 1 });
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    const gx = 1040, gy = 470, gw = 720, gh = 170;
    line(gx, gy + 20, gx + gw, gy + 20, C.gold, p2, 2);
    txt('TRUTH (never reached)', gx + gw, gy + 5, { size: 18, fam: F.mono, align: 'right', c: C.gold, a: p2 });
    ctx.globalAlpha = p2; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
    const draw = clamp((u - L[2].s - 1) / 5);
    for (let i = 0; i <= 200 * draw; i++) { const x = i / 200; const y = gy + 20 + gh * Math.pow(2, -8 * x); if (i === 0) ctx.moveTo(gx + x * gw, y); else ctx.lineTo(gx + x * gw, y); }
    ctx.stroke(); ctx.globalAlpha = 1;
    txt('"never fully confirmed"  — theorem', gx + 20, gy + gh + 60, { size: 22, fam: F.mono, w: 700, c: C.red, a: clamp((u - L[2].s - 1) / 0.5) });
    txt('"always getting closer"  — theorem', gx + 20, gy + gh + 95, { size: 22, fam: F.mono, w: 700, c: C.green, a: clamp((u - L[2].s - 3.2) / 0.5) });
    txt('the situation of a finite being', gx + gw / 2, gy + gh + 150, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[2].s - 6) / 0.6) });
  }
};

/* ---- 10 MATH · MYTH · MATCH ---- */
SCENES.myth = S => {
  const u = S.u, t = S.t, L = S.L;
  badges(S, ['reading', 'theory', 'theory']);
  const p0 = at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (p0 > 0) {
    const words = [['MATH', C.cyan], ['MYTH', C.mag], ['MATCH', C.gold]];
    words.forEach(([w, col], i) => {
      const an = -Math.PI / 2 + i * TAU / 3 + t * 0.15;
      const x = W / 2 + Math.cos(an) * 250, y = 470 + Math.sin(an) * 200;
      txt(w, x, y, { size: 56, fam: F.orb, w: 900, align: 'center', c: col, a: clamp((u - L[0].s - i * 0.5) / 0.5) * p0, ab: 2, ls: 4 });
    });
    ring(W / 2, 450, 150, C.vio, p0 * 0.5, 1.5);
    txt('myth is NOT defined as false', W / 2, 780, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: at(S, 0, 0.5, 3) * p0, ls: 1 });
  }
  const p1 = at(S, 1, 0.6) * (1 - at(S, 2, 0.5));
  if (p1 > 0) {
    const cx = 520, cy = 480;
    for (let i = 0; i < 3; i++) {
      const an = -Math.PI / 2 + i * TAU / 3; const x = cx + Math.cos(an) * 150, y = cy + Math.sin(an) * 150;
      for (let j = i + 1; j < 3; j++) { const bn = -Math.PI / 2 + j * TAU / 3; line(x, y, cx + Math.cos(bn) * 150, cy + Math.sin(bn) * 150, C.gold, p1 * 0.6, 2); }
      dot(x, y, 30, 'g', p1);
    }
    txt('3 = 1', cx, cy + 16, { size: 42, fam: F.mono, w: 700, align: 'center', c: C.red, a: clamp((u - L[1].s - 1.5) / 0.5) * p1 });
    line(cx - 70, cy + 25, cx + 70, cy - 20, C.red, clamp((u - L[1].s - 2.3) / 0.4) * p1, 4);
    txt('not reduced to a false equation', cx, cy + 250, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].s - 2.5) / 0.5) * p1 });
    // one source, two readings
    const sx = 1380, sy = 470; const q = clamp((u - L[1].s - 5) / 0.6) * p1;
    dot(sx, sy, 50, 'w', q);
    txt('∃! source', sx, sy - 80, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    const sw = 0.5 + 0.5 * Math.sin(t * 1.8);
    txt('PERSONAL GOD', sx - 230, sy + 140, { size: 24, fam: F.orb, w: 700, align: 'center', c: C.gold, a: q * (0.4 + 0.6 * sw), ls: 2 });
    txt('IMPERSONAL ORDER', sx + 220, sy + 140, { size: 24, fam: F.orb, w: 700, align: 'center', c: C.cyan, a: q * (0.4 + 0.6 * (1 - sw)), ls: 2 });
    txt('⟷', sx, sy + 140, { size: 30, fam: F.orb, align: 'center', c: C.white, a: q });
    txt('the language cannot tell them apart', sx, sy + 210, { size: 24, fam: F.raj, w: 600, align: 'center', c: C.white, a: q });
  }
  const p2 = at(S, 2, 0.6);
  if (p2 > 0) {
    const cx = 600, cy = 480; const spread = clamp((u - L[2].s) / 8);
    for (let k = 0; k < 220; k++) {
      const an = rnd(k, 1) * TAU; const r = (20 + 330 * Math.sqrt(rnd(k, 2))) * (0.1 + spread);
      dot(cx + Math.cos(an) * r + Math.sin(t + k) * 4, cy + Math.sin(an) * r * 0.8, 5, k % 5 ? 'c' : 'm', p2 * (1 - 0.4 * spread));
    }
    txt('凡 发 生 皆 留 痕', 1380, 300, { size: 56, fam: F.zh, w: 900, align: 'center', c: C.gold, a: p2, ab: 3 });
    txt('not superstition — thermodynamics', 1380, 370, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[2].s - 2.5) / 0.5) });
    const q = clamp((u - L[2].s - 5.5) / 0.5);
    box(1110, 470, 540, 130, C.red, q, 2.5, 'rgba(30,0,10,0.7)');
    txt('free reading of every trace', 1380, 525, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: q });
    txt('✗  second law', 1380, 570, { size: 28, fam: F.orb, w: 900, align: 'center', c: C.red, a: q, ls: 2 });
  }
};

/* ---- 11 FINALE ---- */
SCENES.finale = S => {
  const u = S.u, t = S.t, L = S.L;
  const fade = 1 - clamp((u - L[1].e - 0.8) / 1.5);
  if (fade > 0) {
    drawNet(t, 0.4 * fade, t * 0.1, 0.35, null, 0.6, W / 2, 600);
    const p0 = at(S, 0, 0.6);
    txt('ANALOGY MAY POSE THE QUESTION', W / 2, 250, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: p0 * fade, ls: 3 });
    txt('IT MAY NOT SUPPLY THE PROOF', W / 2, 310, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.gold, a: at(S, 0, 0.6, 2.5) * fade, ls: 3 });
    txt('类比可出题 · 不可出证', W / 2, 370, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: at(S, 0, 0.6, 4) * fade });
    const p1 = at(S, 1, 0.6);
    if (p1 > 0) {
      // film reel: frames run forward then backward
      const dir = Math.sin((u - L[1].s) * 0.6);
      for (let k = -6; k <= 6; k++) {
        const x = W / 2 + (k * 150 + ((dir * 300) % 150)); const a = p1 * fade * clamp(1 - Math.abs(x - W / 2) / 900);
        box(x - 60, 560, 120, 90, C.gold, a, 2, 'rgba(10,8,0,0.6)');
        for (let h = 0; h < 4; h++) { ctx.globalAlpha = a; ctx.fillStyle = C.gold; ctx.fillRect(x - 55 + h * 32, 545, 12, 8); ctx.fillRect(x - 55 + h * 32, 657, 12, 8); ctx.globalAlpha = 1; }
        dot(x, 605, 14 + 10 * rnd(k + 7, 1), k % 2 ? 'c' : 'm', a);
      }
      txt('FORWARD · CREATION', W / 2 - 420, 740, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: p1 * fade * (0.5 + 0.5 * Math.max(0, dir)), ls: 2 });
      txt('BACKWARD · FORGETTING', W / 2 + 420, 740, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.mag, a: p1 * fade * (0.5 + 0.5 * Math.max(0, -dir)), ls: 2 });
      txt('正放是创世 · 倒放是遗忘 · 胶片同一卷', W / 2, 800, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: at(S, 1, 0.6, 4) * fade });
    }
  }
  const ep = clamp((u - L[1].e - 1.5) / 1.2);
  if (ep > 0) {
    const out = clamp((S.d - u) / 1.5);
    drawNet(t, 0.8 * ep * out, t * 0.12, 0.35, null, 0.55, W / 2, 330);
    txt("INDRA'S NET", W / 2, 640, { size: 110, fam: F.orb, w: 900, align: 'center', c: '#fff8e8', a: ep * out, ab: 5, ls: 14 });
    txt('因 陀 罗 网 · TRURETURING FILM 005', W / 2, 710, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.gold, a: ep * out });
    txt('github.com/the-omega-institute/trureturing', W / 2, 800, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: clamp((u - L[1].e - 2.4) / 0.8) * out });
    txt('Structural parallel, never mutual proof of doctrines.', W / 2, 860, { size: 30, fam: F.raj, w: 600, align: 'center', c: C.white, a: clamp((u - L[1].e - 3.2) / 0.8) * out });
  }
};

Object.assign(NAMES, { open: 'BEYOND-WORDS', net: 'INDRA-NET', origination: 'ORIGINATION', empty: 'EMPTINESS', dao: 'DAO', still: 'STILLNESS', karma: 'KARMA', god: 'CHECKLIST', faith: 'FAITH', myth: 'MYTH', finale: 'REEL' });

function poster5() {
  const t = 24.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  background(t, TL.scenes[1], 1, 4);
  const obs = { o: [0, 0, -6], d: [0.12, 0.05, 1], cos: 0.93 }; const n = Math.hypot(...obs.d); obs.d = obs.d.map(x => x / n);
  drawNet(t, 1, t * 0.12, 0.35, obs, 1.1, W / 2, 470);
  txt('每一颗珠，都映照整张网', W / 2, 190, { size: 66, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt("INDRA'S NET", W / 2, 800, { size: 140, fam: F.orb, w: 900, align: 'center', c: '#fff8e8', ab: 6, ls: 16 });
  bloom(0.65);
  txt('因 陀 罗 网  ·  用证明读宗教的结构', W / 2, 900, { size: 44, fam: F.zh, w: 700, align: 'center', c: C.gold });
  txt('TRURETURING · FILM 005', W / 2, 965, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, 720, 1, TL.scenes[1]);
  post(3);
}
window.poster = poster5;
