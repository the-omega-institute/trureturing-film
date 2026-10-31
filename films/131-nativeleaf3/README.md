# 131 · RRO NATIVE LEAF BOUNDARY III · HIDDEN MODES, REPAIRS AND A SERIAL CLOCK · RRO 原生叶边界获取 第三部 · 隐藏模态、修复与串行时钟

This is part three of four in the RRO NATIVE LEAF BOUNDARY series and runs about 7 minutes. It covers
`RECURSIVE_RELATIONAL_OBSERVATION_NATIVE_LEAF_BOUNDARY_ACQUISITION_III.md`, §§76–80, 82–84, 87–92, 94–96, 102 and
103–106, at trureturing subject commit `f22f98e34f`. Parts one and two built the native alpha/beta material tree and
counted the terminal Reads that recover its rational field. Part three lets the receiver grow the tree, leave
terminals unread, inherit masks, read fresh sensors only, or read through a serial clock, and ends with completions
that make Tick itself invertible.

Left out: §75 (common installation and reused forcing inverse, used implicitly), §81, §85–86 and §93 (image
bookkeeping, resource accounts and supplier correspondence), §97–101 (primer, feedback fragment, fixed-phase four
views and their accounts and boundaries), §107 apart from the call vector, and §§108–109 (supplier scope).

## The film, scene by scene

- **Depth parity (§76).**
  - With D e_p = (−1)^|p| e_p for material depth |p|, every native tree has DA = −AD, and zero-extension through
    any successful growth satisfies D_s′E = ED_s. Along a frozen path with T Ticks, D_s H = (−1)^T H D_u
    (Lemma 76.1).
  - So a Read at terminal f returns zero on the entry monomial A^k e_e unless k ≡ |f| − |e| − T (mod 2) (76.3).
  - A binary word stored by Tick; Add(e, d); Hold; Read needs, on every terminating transcript for a length-two word,
    Reads of both effective parities, even when the receiver may grow the tree adaptively (Theorem 76.2). Two Reads
    at the advanced field attain this (Corollary 76.3); the paid origin ⟨β, α⟩ has P 1, S 1, Read m + 2, Add m + 3,
    Tick m + 2, Hold m + 4 (76.6).
- **Marked slice (§77–78).**
  - Marking an arbitrary attachment t with L ≥ 3 leaves saves the overwritten terminal values z and leaves
    q = b − 1 unknown internal coordinates; here N = 3L + 2c − 1, b = L + c, I = N − b (77.1).
  - A geometry-only selection of exactly b − 1 terminal/epoch pairs, largest epoch 1 ≤ H ≤ I, recovers the entry,
    and forward control C(f − A^(I+1) d_ℓ) returns every old cell to its entry value with fresh cells zero, with no
    Reset or inverse Tick (Theorem 77.2). Fewer than b − 1 Reads never suffice, even with adaptive growth
    (Theorem 77.3).
  - Against the full window this omits b(I + 1) − q = bI + 1 complete Read transactions (78.5).
- **Two omitted leaves (§79–80).**
  - Fix the geometry and omit two terminals at path length d. With g = gcd(d + 2, j + 1 for each attachment
    position j), the hidden space has dimension g − 1 and spectrum {2cos(qπ/g) : 1 ≤ q < g}, and
    dim(W ∩ im A) = g − 1 − [g even] (Theorem 79.2).
  - The entry is recoverable exactly when g = 1; the advanced current field and a self-contained predictor exactly
    when g ≤ 2 (Theorem 79.3), with r = rank A Reads for the current field and N for the entry (Theorem 80.1).
  - ⟨β, ⟨β, α⟩⟩ realises g = 1 and g = 2 (zero mode (1, 0, −1, 0, 1)); ⟨β, ⟨β, β⟩⟩ realises g = 3 with hidden
    eigenvalue-one vector (1, 1, 0, −1, −1) (Proposition 79.4).
- **Four Reads (§82, §102).**
  - On the seven-cell tree, h = (27, 52, 75, 96, 66, 34, 49) has Ah ≤ (95/48)h, and (95/48)² < 4, so a single
    graded Read row merges two quaternary digit strings, also among monic words above any degree (Lemma 82.2).
  - Freezing rows one at a time, two admitted words share the whole transcript of any adaptive receiver with at most
    three Reads (Proposition 102.2), so four Reads are necessary in the worst case, even with growth and Adds; the
    assay Tick³; Hold; Read LL; Read RR; Tick; Hold; Read LL; Read RR; Hold attains four (Theorem 82.3).
- **One-birth repair (§83–84).**
  - On every native tree with b ≥ 3 terminals and two omitted inherited labels, g ∈ {1, 2, 3}. At g = 2 promote
    an omitted deep alpha; at g = 3 split the owner of an omitted deep beta; either birth gives divisor one.
  - The minimum successful births are 0, 1, 1 for the entry report and 0, 0, 1 for the current field/predictor
    (Theorem 83.2). Births confined to cones of readable terminals never repair entry at g > 1 or the current field
    at g = 3 (Theorem 83.3).
  - After repair, N Reads report the entry, optional allowed-port control restores Ex, and at g = 3 a separate
    current-only run uses r Reads (Constructions 84.1–84.3).
- **Inherited mask (§87–88).**
  - Replacing each chosen masked leaf by the native chain p − pL − pLL − pLLL, p − pR, pL − pLR gives
    M = N + 4q + a_Z and s = b − k + 2q allowed terminals that zero-force the grown tree (Theorem 87.3); leaving one
    mask unreplaced always works, so M ≤ N + 5(k − 1) (Corollary 87.4).
  - Exactly N Reads report the entry, which is the minimum for any exact reporter, and M allowed-terminal Adds return
    the old cells: (Read, Add, Tick, Hold) = (N, M, H + L, H + L + 2) (Theorem 88.1).
- **Fresh sensors (§89–90).**
  - Growing one designated fresh sensor beside each native leaf gives M = N + 3a + 4c, CE = 0 and CBE = Jᵀ; then
    rank(OE) = rank(B^h E) = rank(OB^h E) = N for every h ≥ 0 (Theorem 89.2), and N sensor Reads report the entry
    with no Add (Theorem 90.1).
  - The ambient extension fails: on ⟨⟨β, β⟩, ⟨β, β⟩⟩ a nonzero h* has Bh* = 0, Ch* = 0 and h* ∉ im E
    (Proposition 89.3).
- **Guarded cherries (§91–92).**
  - In the family U_k (N = 9k + 1, 3k + 1 terminals) with both cherry markers masked, repairing any subset J leaves
    the hidden space ⊕ over unrepaired i of span{v_i, w_i}, of dimension 2(k − |J|), with B swapping v_i and w_i and
    eigenvalues ±1 (Theorem 91.2).
  - Every exact receiver makes at least k splits and allocates 2k fresh cells on every transcript (Theorem 92.1);
    with all k split, M = 11k + 1 and Read 9k + 1, Add 11k + 1, Tick H + L, Hold H + L + 2 with H, L ≤ 9k
    (Theorem 92.2).
- **Serial clock (§94–96).**
  - Reading s_r at phase r of a period L for N cycles has kernel ⊕_μ (F_μ ∩ ker H), equal to that of the infinite
    record (Theorem 94.2). For odd L it is ker A ∩ ker e_(s₀)ᵀ, so the endpoint A^(LN) x is always determined
    (Theorem 94.3).
  - For even L, λ and −λ collide. On odd combs u_m with natural order and L = b, det A = (−1)^(N/2) and the blind
    sector is exactly the odd-depth half, of dimension N/2 (Theorem 95.2), though a later legal Read separates it
    (Theorem 95.3). One extra Tick per cycle, L = b + 1, recovers x and the endpoint at the cost of N extra Ticks and
    Holds (Theorem 96.1).
- **Perfect matchings (§103–104).**
  - A finite unit tree has det B = (−1)^(m/2) when it has a perfect matching and 0 otherwise (Lemma 103.2).
  - At one native leaf the exact undominated (promotions, splits) costs are α: F {(1, 0)}, R {(0, 0)};
    β: F {(0, 0)}, R {(1, 1)} (Lemma 103.3).
  - The min-plus recursion F⟨l,r⟩ = Min((R_l + F_r) ∪ (F_l + R_r)), R⟨l,r⟩ = Min(F_l + F_r) gives the exact
    Pareto frontier over all finite refinements of every term (Theorem 104.1). For balanced all-beta trees,
    P = S = k_h = (2^h − (−1)^h)/3 (the Jacobsthal numbers 0, 1, 1, 3, 5, 11, …) and M_h = 4·2^h − 1 − (−1)^h
    (Theorem 104.3).
- **Four views (§105–107).**
  - After an F completion, N geometry-selected Reads recover every entry x and install w = B^H Ex
    (Theorem 105.2); since B is invertible, D_h = Eᵀ B^(−h) recovers x at every epoch (Corollary 105.3).
  - Space, Time, Boundary and Memory recover one another on the realised image and commute with a fixed script of
    Ticks and shears G = I + e_ℓ e_aᵀ (Theorem 106.3). The example ⟨⟨β, β⟩, ⟨β, β⟩⟩ completed by S_RR; P_RRR has
    N = 11, M = 14, H = 3 and one-run calls P 5, S 4, Read 11, Add 32, Tick 10, Hold 5 (107.1).

一部约七分钟的片子，RRO 原生叶边界获取系列第三部：深度奇偶性在生长下依然成立，所以二进制词仍需两种有效奇偶的读取；标记入口恰需 b − 1 次读取并能用前向控制物理复原；固定几何下省略两个终端时，gcd 除数 g 给出 g − 1 维隐藏空间与谱 2cos(qπ/g)，入口恰在 g = 1、当前场恰在 g ≤ 2 时可恢复；七单元树上的四进制词在最坏情形恰需四次读取；在每棵原生树上 g 只取 1、2、3，一次出生即可把除数修复为一；继承掩码与新传感器各有修复与读取方案；带守卫的樱桃族给出精确的 k 次分裂代价；串行时钟在偶周期下会混叠，每周期多一次 Tick 即可消除；最后，完美匹配让 Tick 可逆，单叶修复代价表是冻结的 Lean 声明，全 β 平衡树的代价是 Jacobsthal 数。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-131-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.**
  - At the subject commit the volume's digestion ledger has 128 atoms: 127 residual-open and 1 absorbed-closed.
  - The absorbed-closed atom is Lemma 103.3. Its coverage edge points to
    `D5/S3/Arith/FibonacciAtomic/Geometry/NativeGuardedLeafRepair.result`, and the state file
    `Golden/Frozen/state/D5/S3/Arith/FibonacciAtomic/Geometry/NativeGuardedLeafRepair.lean.json` exists. Its
    `frontier` statements are exactly the four single-leaf cost sets. The film badges that table as Lean (matchings
    scene from "At a single leaf", and the finale).
  - The volume also names the frozen general suppliers
    `FiniteTimeTomographySaturation.all_future_kernel_eq_finrank_kernel`,
    `FiniteObservabilityEquivalence.finite_observability_equivalence` and
    `NativeMaterialRootRecognition.original_rigidity` / `effective_inverse` (state files exist). The volume calls
    these source correspondences, not compiled applications, and the ledger does not link them to its atoms, so the
    film does not badge them as Lean.
- **Published and classical tools named in the volume.** None carries a separate badge except the finale's
  classical line.
  - Zero forcing and controllability: Burgarth, D'Alessandro, Hogben, Severini and Young, arXiv:1111.1475.
  - Infection/forcing reference: Burgarth and Maruyama, arXiv:0903.0612.
  - PBH criterion and path spectra: Parlangeli and Notarstefano, arXiv:1109.3556.
  - Tree inverses: Godsil, *Inverses of trees*, Combinatorica 5 (1985), DOI 10.1007/BF02579440.
  - Sampling context: Mousavi, Sun and Motee, arXiv:1811.01303.
  - Cayley–Hamilton, the spectral theorem, Vandermonde determinants, Bézout, the tree determinant and mathlib's
    adjacency walk counts.
- **Project inputs from other volumes, not reproved here.** The two-Read Sample2 construction (NLBAII §§55–57), the
  rank-A current bound, arbitrary-field preparation, complete service and codec (NLBAII §§60–65), quaternary
  injectivity, the comparison vector and the four-Read assay (NLBAII §§71–73, 76), marking (§34), forward control
  (§58), all-but-one-leaf forcing (NLBA §28.1) and the causal birth order (AA Theorem 17.2).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (exact rationals for ranks, solves and identities;
  numpy for spectra) ran 104,586 checks. These are sampled and finite checks, not proofs.
  - **Parity.** DA = −AD on 25 trees; 142 forbidden-parity replies on random grown paths are all zero; the board
    e_fᵀ A^k e_LL on ⟨β, ⟨β, α⟩⟩ for k = 0…7; Sample2 replies on ⟨β, α⟩ are distinct for all 8191 binary words of
    length ≤ 12; the bill (76.6).
  - **Marked slice.** For t = ⟨β, ⟨β, α⟩⟩: L = 3, c = 2, b = 5, N = 12, I = 7, q = 4, selected rows (k, terminal) =
    (1, LR), (1, RLR), (2, LR), (2, RLR), H = 2; h recovered exactly and the old field restored exactly by forward
    control with fresh cells zero; same on three more trees; 40 − 4 = 36 = bI + 1.
  - **Divisor.** All 6960 (tree, omitted pair) instances with 3–6 leaves: dim W = g − 1, spectrum 2cos(qπ/g),
    dim(W ∩ im A) = g − 1 − [g even]; exact rational rank N − g + 1 for 3–4 leaves; counts g = 1, 2, 3:
    6414, 83, 463. The three examples give rank O_S 7/6/6 and rank on im A 6 of 6, 6 of 6, 6 of 8.
  - **Four Reads.** (Ah)_v/h_v has maximum 95/48 at R; λ_max = 1.9696; one even Read at LL already merges two-digit
    strings (7 values for 16); Y₄ is distinct on all 21,845 quaternary words of length ≤ 7; the bill (82.6).
  - **Repair.** All 44,886 pairs on 3–7 leaves have g ∈ {1, 2, 3} (42,229 / 331 / 2326), and every g = 2 and g = 3
    pair becomes g = 1 after the stated single birth; the ⟨β, ⟨β, β⟩⟩ repair gives rank O′E = 8.
  - **Mask.** 14 random masks: M = N + 4q + a_Z, s = b − k + 2q, zero forcing from the allowed set, full rank of O_F,
    M ≤ N + 5(k − 1).
  - **Fresh sensors.** M = N + 3a + 4c, CBE = Jᵀ and rank K_h = N for h = 0…3 on 9 trees; the vector h* of
    Proposition 89.3 on the 27-cell grown tree.
  - **Cherries.** k = 1, 2, 3 and all subsets J: N = 9k + 1, M_J = N + 2|J|, dim W_J = 2(k − |J|), eigenvalues ±1,
    exact ranks for k ≤ 2; full repair M = 11k + 1, s = 2k + 1.
  - **Clock.** Finite saturation and the odd-L kernel on 30 random trees and orders; combs m = 3, 5, 7, 9 have
    N = 10, 16, 22, 28, det A = (−1)^(N/2), blind dimension N/2 at L = b and 0 at L = b + 1, and
    e_(RLL)ᵀ A^(bR) e_L > 0 for R = 1, 2, 3; both cases of Example 94.4.
  - **Matchings.** det B = ±1 exactly with a perfect matching on 40 random trees; the single-leaf frontiers by brute
    force over all refinements with at most six calls; the DP frontier equals brute force on 14 small terms; k_h and
    j_h for h = 0…10 and M_h for h = 0…5.
  - **Four views.** The completion of ⟨⟨β, β⟩, ⟨β, β⟩⟩ has M = 14 and det B = ±1; OE has rank 11 with H = 3;
    D_H B^H E = Id; the shear inverse; the call vector (107.1).
- **Data drawn on screen.** The parity board; the candidate-row grid and the 40 versus 4 bars; the g-count bars
  (6960 and 44,886 pairs); the three rank examples; the (Ah)_v/h_v bars; the mask table and cell bars; the
  W_J dimension bars; the comb blind-dimension bars; the k_h bars; the four-view call vector.
- **Illustrative visuals.** The material trees are exact materializations of the named terms, but their layout,
  colours and highlighted paths or matchings are illustrations. Also illustrative: the growth-cone diagrams, the
  serial-clock timeline, the four-word rectangle, the four-view box diagram and the ledger cards.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
