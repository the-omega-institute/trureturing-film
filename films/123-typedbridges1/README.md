# 123 · AURIC TYPED BRIDGES I · THE HIDDEN SEAM AND THE BRIDGE LEDGER · AURIC 类型化桥 第一部 · 隐藏缝与桥接账本

This is part one of the two-part AURIC TYPED BRIDGES series and runs about 7½ minutes. It covers
`AURIC_FIB_ATOM_TYPED_BRIDGES_AND_ARITHMETIC_TRIANGLE_RH_PIPELINE.md`, §0–§26, at trureturing subject commit
`e1093b3b9f`. Part two will cover the volume's two continuations (§27–§65).

The volume puts five objects into one typed pipeline: a five-state probability law, its hidden κ fiber, Fisher
geometry, the boundaries and cycles of Fibonacci support graphs, and three bridges, to arithmetic, to triangle
networks and to the Riemann zeros. The finite mathematics is proved in the volume. The three bridges are stated only
as typed conditions with explicit inputs, hypotheses, outputs and failure boundaries. Nothing in the volume or in
the film proves the Riemann hypothesis.

## The film, scene by scene

- **Five states, one fiber (§1, §12, §25).**
  - Σ = {0, 2, 3, 5, 25} is read by x = 1{2, 25}, y = 1{5, 25} and z = 1{3}; 25 is the joint state [2, 5]. With
    X, Y, Z the means and κ = p₂₅ = E[xy], the law is p₀ = 1 − Z − X − Y + κ, p₂ = X − κ, p₃ = Z, p₅ = Y − κ,
    p₂₅ = κ (Theorem 1.2).
  - The visible image is the pyramid X, Y, Z ≥ 0, X + Z ≤ 1, Y + Z ≤ 1. Over each visible point the legal laws form
    the closed interval max(0, X + Y + Z − 1) ≤ κ ≤ min(X, Y), and p_κ − p_κ′ = (κ − κ′)d with
    d = (1, −1, 0, −1, 1) (Theorem 1.3, Propositions 12.3–12.4). Example: (X, Y, Z) = (0.4, 0.5, 0.2) gives
    κ ∈ [0.1, 0.4].
  - On the five-dimensional weight space, rank P = 3 and ker P = span(e₀, d), so 5 = 3 + 2. On mass-zero vectors
    the kernel is ℝd: one hidden seam (Theorem 25.4).
- **Second moment (§2, §3, §12, §24).**
  - Every f on Σ has E_p f = f₀ + (f₂ − f₀)X + (f₅ − f₀)Y + (f₃ − f₀)Z + J_f κ with the four-corner difference
    J_f = f₂₅ − f₂ − f₅ + f₀ (Theorem 2.2). The mean is fixed by (X, Y, Z) exactly when J_f = 0 (Corollary 2.3).
    Products of visible functions create it: J_(fg) = a_x b_y + a_y b_x (Theorem 2.4).
  - W = 2x + 3z + 5y takes the values 0, 2, 3, 5, 7. E W = 2X + 3Z + 5Y is blind to κ, but
    W² = 4x + 9z + 25y + 20xy, so κ = (Var W + (2X + 3Z + 5Y)² − 4X − 9Z − 25Y)/20 (Theorem 3.2,
    Proposition 12.8, Definition 24.4).
- **Entropy and Fisher curvature (§4, §12, §15, §16).**
  - With r = 1 − Z, the defect Δ = rκ − XY equals p₀p₂₅ − p₂p₅ (Definition 4.1, Proposition 12.10); for r > 0,
    Cov(x, y | z = 0) = Δ/r².
  - Along the fiber H′ = −ϑ with ϑ = log(p₀p₂₅/p₂p₅), so entropy is strictly concave with unique maximum at
    κ* = XY/r, exactly where Δ = 0 (Theorem 4.2).
  - Its curvature is the Fisher information I(κ) = 1/p₀ + 1/p₂ + 1/p₅ + 1/p₂₅, the Hessian of negative entropy
    along the seam (Theorems 4.4 and 16.4). With state energies, F_β = Σ Eₛpₛ − H/β has F_β″ = I/β > 0 and the
    minimum satisfies p₀p₂₅/(p₂p₅) = e^(−βΔE), ΔE = E₀ + E₂₅ − E₂ − E₅ (Theorem 15.4).
- **Readout contraction (§5, §20, §21).**
  - For any readout kernel W(a | s), I_out = Σ (q_a′)²/q_a ≤ I, and I − I_out = E[Var(S | a)] with score S = d/p
    (Theorem 5.2).
  - The same Cauchy–Schwarz step gives monotone Fisher curvature across layers: merging nodes with conditional
    weights (Theorem 20.4) or deleting the last Fibonacci position (Theorem 21.4) never raises it.
- **Seam and loop (§6, §22).**
  - On the five-edge graph 0→2, 2→25, 25→5, 5→0, 0→3, ker B = ℝc with c = (1, 1, 1, 1, 0), the edge flows with
    invisible boundary are {(s, t, s, t, 0)}, and B(s, t, s, t, 0) = (t − s)d. This gives
    0 → ℝc → ker(AB) → ℝd → 0 (Theorem 6.2).
  - On any finite connected graph, 0 → K → C → S → 0 with K = ker B, C = ker(AB), S = ker(A|_T) (Theorem 22.2). The
    lifts of one seam form f₀ + K (Corollary 22.3). The weighted minimal lift W Bᵀ L_W⁺ s removes only the cycle
    freedom, with cost g_W(s, s) + ‖k‖² (Theorem 22.4, Corollary 22.5).
  - For the seam d: the minimal signed lift (−½, ½, −½, ½, 0) has squared norm 1. Nonnegative lifts need γ ≥ ½, and
    the minimal one (0, 1, 0, 1, 0) has squared norm 2 (Corollary 22.13).
- **Fibonacci cycles (§7, §21, §22, §25).**
  - With n positions and no two neighbours occupied there are F_(n+2) supports, and N_(n,k) = C(n − k + 1, k) of
    size k: 2, 3 and 5 for n = 1, 2, 3 (Definition 7.1, Theorem 25.2). The boundary short exact sequence holds at
    every n. This line carries the Lean badge (see the evidence notes).
  - Seam dimension h_n = F_(n+2) − n − 1 and cycle dimension c_n = E_n − V_n + 1. Then
    c_n − h_n = Σ_(k≥3) (k − 2) N_(n,k), which is positive exactly from n = 5 (Theorem 7.2, Corollary 22.9).
  - H(z) = z³/((1 − z)²(1 − z − z²)), C(z) = z³/((1 − z)(1 − z − z²)²) and c_n/h_n ~ n/(φ² + 1)
    (Theorem 22.11, Corollary 22.12).
  - Each added position adds F_(n+1) − 1 directions invisible to the deletion projection (Theorem 21.2), shown on
    screen.
- **Inverse limits (§20, §23).**
  - Compatible layers that are nonempty, compact and convex, with continuous affine onto maps, have a nonempty
    compact convex inverse limit (Theorem 20.2).
  - Graph Dirichlet energy contracts when G_j R_j = S_j G_(j+1) and ‖S_j‖ ≤ 1 (Theorem 20.6). Restricted spectral
    gaps pass to finer layers (Corollary 20.7).
  - Energy convergence of a compatible family needs the Mosco liminf and recovery conditions (Theorem 20.8).
  - For affine fiber bondings, diam(F_n) · ∏ |a_k| → 0 forces at most one point (Theorem 23.2). With onto
    bondings there is exactly one point, and then the five-state law is fixed at every layer
    (Corollaries 23.3–23.5).
- **Three spectra and the flow (§15, §17.2.2, §18.3, §24).**
  - Spec K* is static curvature. Spec MK* is real and positive (gradient-flow decay). Spec JK* is ±iω, and that flow
    conserves H₂ = ½⟨u, K*u⟩. Only an added quantisation rule makes ħω(n + ½) an energy level (Theorem 15.2,
    Definition 15.5, Theorem 24.6).
  - The mass-action flow is a gradient flow of negative entropy for the rank-one Onsager operator
    γΛ(p₂p₅, p₀p₂₅) d dᵀ, with −M_p DV = γ(p₂p₅ − p₀p₂₅)d (§17.2.2).
  - With visible data fixed, κ(t) = κ* + e^(−γrt)(κ(0) − κ*) stays in the fiber. γ itself is added dynamical
    data (§18.3).
- **Typed bridges (§8, §12, §14, §16).**
  - Arithmetic enters only through an explicit encoding Φ : C → Δ(Σ_n), possibly with transfers T_χ.
  - A linear record satisfies R_χ(p_κ) − R_χ(p_κ′) = (κ − κ′)R_χ(d). On a nondegenerate fiber it identifies κ
    exactly when R_χ(d) ≠ 0 for some χ (Theorem 8.2). On d, the mean of W gives 0 and the mean of W² gives 20.
  - Objects are typed primitive, derived or bridge (Definition 16.1). A conclusion that uses bridge hypotheses H
    holds only in models of L₀ + H and stays conditional on H. If no model exists, it is vacuous (Theorem 16.5).
- **Triangle networks (§9, §14, §17.3, §18.4).**
  - The finite triangle output P_T is a probability law (Proposition 14.4), and any event pushforward to Σ is a
    five-state law (Proposition 14.6).
  - Without the pushforward condition the implication fails: one-point sources with all responses 0 give
    P_T(0, 0, 0) = 1, while q = 0 sums to 0.
  - A five-state law does not by itself give independent sources (Proposition 9.2).
  - Inflation gives finite certificates: an exact y with A_Nᵀy ≥ 0 and yᵀb_N(p) < 0 proves non-locality. Feasibility
    at one level proves no compatibility (§17.3.2–17.3.3, §18.4).
- **Cayley coefficients and RH (§10, §15, §17.4, §18.5, §26).**
  - For a zeta zero ρ, c(ρ) = (ρ − 1)/ρ has |c|² − 1 = (1 − 2 Re ρ)/|ρ|². With exhaustive zero data, RH is
    equivalent to every |c_v| = 1, that is, to unitarity of the diagonal Cayley operator (Definitions 10.1 and 15.9,
    §17.4.3). This line carries the Lean badge.
  - An equivalence is not a proof. A spectrum matched to imaginary parts, or unitarity on finitely many zeros, proves
    nothing.
  - What is needed is a self-adjoint H with H ψ_ρ = −i(ρ − ½)ψ_ρ for every nontrivial zero, or a full identity
    ξ(½ + iz) = C(z)D_H(z) (§18.5, Theorem 15.10).
  - No map from the five-state defect Δ to the zeros is given, so that link stays a structural analogy (§10.2). The
    film badges this as open.
  - The transfer matrix [[1, 1], [1, 0]] has eigenvalues φ and −1/φ; this is a field-side spectrum only (§26).

**Not narrated.** These sections are not narrated, though some appear in small on-screen lines:
- §0, §11 and §13: purpose, object list and dependency order;
- §15.6–15.8 and §15.11: tree-field product stability with the Whole-rho input, the block-Hessian Schur complement,
  the triangle static source field;
- §17.1: the Mosco, RCD and graph-spectrum literature;
- §17.2.3–17.2.5 and §17.3.4: Erbar–Maas, Li–Lu, Amari–Karakida–Oizumi, fully quantum inflation;
- §18.1–18.2: the GraphToDirichletLimit and DirichletToGeometry ledger entries;
- §19: the consistency checklist;
- §20.9–20.11: limit stability of convex static sections and the joint Fisher–Dirichlet stability quantity;
- §21.1: the Dirichlet interface;
- §22.6–22.8 and §22.10: edge readouts that factor through the seam, the future-observation Gramian;
- §24.1–24.3 and §24.7: field energy decomposition, visible manifold;
- §25.5: window trajectories.

一部约七分半钟的片子，AURIC 类型化桥系列的第一部：五个状态由三个可见数 X、Y、Z 和一个隐藏质量 κ 完全重构，每个可见点上的合法 κ 构成闭区间，丢失的方向恰是一条缝 d；函数的均值只差一个四角差 J_f 乘 κ，W 的均值看不见 κ，而二阶矩恢复它；缺陷 rκ − XY 等于 p₀p₂₅ − p₂p₅，熵在 κ* = XY/r 处取最大，曲率是 Fisher 信息，即负熵的 Hessian；任何读出和粗粒化都只会减少 Fisher 信息；五边图有一个回路，边界不可见的边流映满缝 d；Fibonacci 支持的计数与边界正合列是冻结的 Lean 定理，从 n = 5 起循环维数严格超过缝的维数，比值按 n/(φ² + 1) 增长；相容逆极限非空，仿射收缩时隐藏坐标唯一；静态曲率、耗散衰减与辛频率三种谱必须分开，质量作用流是负熵的秩一梯度流；算术、三角网络与黎曼零点之桥都只是类型化的条件：Cayley 系数的酉性与黎曼猜想等价（冻结的 Lean 定理），但等价不是证明，从五态缺陷到零点的映射并未给出。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-123-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Digestion status of the volume.** At the subject commit the volume has no digestion records. There is no
  `Meta/Digestion/backfill/auric-fib-atom-typed-bridges-and-arithmetic-triangle-rh-pipeline/` directory (0 atoms),
  so no statement is covered through this volume's own ledger.
- **Lean-frozen general theorems.** These carry the Lean badge, each only for the sentence that states it. Each has
  a state file under `Golden/Frozen/state/` at `e1093b3b9f`.
  - `D5/S1/Words/AdmissibleWords/AdmissibleCount.admissibleWord_card_eq_fib`: the number of length-m words with no
    two adjacent ones is F_(m+2).
  - `D5/S3/Combinatorics/Graph/LegalWords/SupportSizeCount.support_count_eq_choose`: N_(n,k) = C(n + 1 − k, k).
  - `D5/S3/Combinatorics/Graph/LegalWords/EdgeCount.edge_count`: E_n = Σ k N_(n,k).
  - `D5/S3/Combinatorics/Graph/LegalWords/SignedBoundary.native_boundary_image_short_exact`: on every Fibonacci
    cube, im B is the mass-zero space and 0 → ker B → ker(AB) → ker(A|_T) → 0 is exact for the singleton-occupation
    readout.

  The volume applies these four in Definition 7.1, Theorem 7.2, Theorem 22.2 and Theorem 25.2. The digestion ledger
  links them, as absorbed-closed coverage, to the volumes this one cites in §0
  (`AURIC_FIB_ATOM_STATIC_SEAMS_TRANSITION_CIRCULATION_AND_FIBONACCI_TOGGLE_CYCLES.md` and
  `AURIC_FIB_ATOM_PYRAMID_FOUNDATIONAL_FORMULAS_AND_RELATIONS.md`), not to this volume.
  - `D5/S3/Midline/Cayley/ZeroHilbertCayleyUnitarity.cayley_unitarity_defect_formula_on_zero_hilbert_space`: the
    Cayley defect formula and, for supplied exhaustive zero data, RH ⇔ every |c_v| = 1 ⇔ C_Z unitary.

  The volume cites this file by name in §17.4.3; there is no ledger link. The theorem is conditional on the supplied
  zero data and does not prove RH.

  The volume's own applications of these theorems, and the dimension formulas h_n and c_n, are badged as theory.
- **Published results, used as external inputs.** The inflation sentence of the triangle scene and the finale badge
  them as published.
  - Wolfe, Spekkens and Fritz, *The Inflation Technique for Causal Inference with Latent Variables*, arXiv:1609.00672.
  - Navascués and Wolfe, *The Inflation Technique Completely Solves the Causal Compatibility Problem*,
    arXiv:1707.06476.
  - Gitton and Renner, *The Elegant Joint Measurement is Non-Classical in the Triangle Network*, arXiv:2510.15143
    (exact certificates).
- **Classical tools named in the volume.** Cauchy–Schwarz and the conditional-variance decomposition, rank–nullity,
  the Moore–Penrose pseudoinverse, compactness and the finite intersection property, Farkas certificates, Mosco
  convergence, and the Cayley transform (H = H* ⇔ its Cayley transform is unitary).
- **Project inputs.** No result from another volume is needed for the narrated statements. The volume re-proves its
  five-state formulas, and the Whole-rho tree input of §15.6 is not used.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory. The RH scene
  ends with the open badge: no bridge is constructed and RH is not proved.
- **Recomputed for this film.** An independent Python script (`verify123.py`, 27 811 checks) uses numpy, exact
  sympy and Fraction arithmetic, scipy and mpmath.
  - **Fiber.** On 2000 random laws: reconstruction is exact, the pyramid inequalities hold, κ ∈ [κ₋, κ₊], and every
    fiber point is legal while points outside are not.
    - Example (0.4, 0.5, 0.2): fiber [0.1, 0.4], κ* = 0.25, maximum-entropy law (0.15, 0.15, 0.2, 0.25, 0.25).
    - ker DP|_T = ℝd, rank P = 3 and ker P = span(e₀, d).
  - **Moments.**
    - The expansion with J_f holds for 500 random f, and the fiber variation is J_f(κ − κ′). J_(fg) = a_x b_y + a_y b_x
      holds symbolically.
    - W² = 4x + 9z + 25y + 20xy, W · d = 0 and W² · d = 20. The κ recovery is exact to 10⁻¹² on 500 random laws.
    - On the example fiber, E W = 3.9 and E W² = 15.9 + 20κ.
  - **Entropy.**
    - Δ = p₀p₂₅ − p₂p₅ and Cov(x, y | z = 0) = Δ/r² hold symbolically, as do H′ = −ϑ and ϑ′ = I.
    - On 200 random fibers the entropy maximum sits at XY/r. On the example, I(κ*) = 64/3.
    - On 299 random energy and temperature samples, the root of F_β′ is the global minimiser with corner ratio
      e^(−βΔE) (to 10⁻⁶) and F_β″ = I/β.
  - **Contraction.**
    - On 3000 random readout kernels at κ*, each with 2–5 outputs and every seventh deterministic,
      I_out ≤ I and I − I_out = E[Var(S | a)] to 10⁻⁸. The largest ratio is 1.
    - On 500 random conditional-weight merges, Fisher curvature never increases.
    - On 360 random Fibonacci deletions (n = 1…9), the Fisher data-processing inequality holds.
  - **Fibonacci cubes, n = 1…10.**
    - V_n = F_(n+2), N_(n,k), E_n = Σ k N_(n,k) and rank B = V_n − 1 all check out.
    - h_n = 0, 0, 1, 3, 7, 14, 26, 46, 79, 133 and c_n = 0, 0, 1, 3, 8, 18, 38, 76, 147, 277, with
      dim ker(AB) = c_n + h_n. c_n = h_n for n ≤ 4 and c_n > h_n from n = 5.
    - Deletion projections satisfy A_n D_n = pr A_(n+1), are onto the hidden kernels, and have kernel dimensions
      0, 1, 2, 4, 7, 12, 20, 33, 54 = F_(n+1) − 1.
    - The generating functions match the counts to order 40.
    - At n = 3000, h_n matches φ³φⁿ/(φ² + 1) to 10⁻³⁰. c_n over its asymptotic is 0.99865, with relative error close
      to −4.06/n, and (c_n/h_n)/(n/(φ² + 1)) = 0.99898.
  - **Lifts.** For 30 random SPD weights on Γ₄, B L_W(s) = s, the lift is W⁻¹-orthogonal to the cycles,
    the cost splits as g_W(s, s) + ‖k‖², and g_W > 0.
    - The five-state graph is Γ₃.
    - ker B = ℝc and ker(AB) = {(s, t, s, t, 0)}.
    - The minimal signed lift has squared norm 1. A lift is nonnegative exactly for γ ≥ ½, and the minimal
      nonnegative lift has squared norm 2.
  - **Flows.**
    - On 50 random 4 × 4 cases, Spec MK* is real with every eigenvalue ≥ μ m_M and Spec JK* is imaginary, and
      H₂ is conserved.
    - Displayed example: K* 0.18, 0.45, 1.06, 1.88; MK* 0.21, 0.67, 0.70, 2.55; JK* ±0.48i, ±0.84i.
    - On 300 random laws, −M_p DV = γ(p₂p₅ − p₀p₂₅)d with M_p positive semidefinite.
    - κ(t) matches the ODE to 10⁻⁸ for four starting values (γ = 1, r = 0.8) and stays in [0.1, 0.4]. The full
      five-state flow keeps (X, Y, Z).
  - **Bridges.** R(p_κ) − R(p_κ′) = (κ − κ′)R(d) holds for 200 random records.
  - **Triangle.**
    - 200 random finite triangle models with random event maps all give five-state laws.
    - Counterexample: P_T(0, 0, 0) = 1 while Σ q = 0.
    - Worked example: the cut inflation of the GHZ law p(000) = p(111) = ½ is infeasible, with the exact rational
      y = (0, 1, 1, −1, −1, 1, 1, 0, 1, −1, 0, 1), min(A_Nᵀy) = 0 and yᵀb = −3/4. The uniform law passes this level.
  - **Cayley.** |c|² − 1 = (1 − 2 Re ρ)/|ρ|² holds symbolically.
    - At the ten lowest zeta zeros computed by mpmath (γ₁ = 14.1347…), the formula holds and |c|² − 1 = 0, a finite
      check only.
    - In finite diagonal models, H_Z is self-adjoint exactly when every Re ρ = ½, and the Cayley identity and
      unitarity match.
    - A_Fib has eigenvalues φ and −1/φ.
  - **Counts.** |W_n| = F_(n+2) for n ≤ 14 (2, 3, 5, …), reversal preserves legality, the mirror exchanges 2 and 5,
    and ℓ(W₃) = Σ.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The five-mass bars and the legal-κ slider on the example fiber.
  - The E W and E W² lines.
  - The H(κ), Δ(κ) and I(κ) curves.
  - The sorted I_out/I dots.
  - The 1 + 4γ² lift-cost curve.
  - The F_(n+2), h_n and c_n bars and the exact c_n/h_n dots.
  - The nested fiber images and the 0.3 · 2^(−m) bound.
  - The three displayed spectra and the κ(t) curves.
  - The values of three records on d.
  - The Farkas vector y.
  - The ten zeros on the critical line and their Cayley points. The two dashed curves for Re ρ = 0.4 and 0.6 are the
    defect formula at hypothetical values, labelled as not zeros.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the four-corner square;
  - the readout-kernel fan, whose line weights are decorative;
  - the coarse-graining fan;
  - the five-edge graph with its loop;
  - the Fibonacci cube Γ₄;
  - the stacked layers with a compatible thread;
  - the pipeline, layer and requirement boxes;
  - the triangle network diagram.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
