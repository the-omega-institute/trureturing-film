# 104 · AURIC V49–V50 · THE SQUARE LAW, RECURSIVE THREE AXES AND K-BONACCI LIMITS · AURIC V49–V50 · 平方律、递归三轴与 K-bonacci 极限

This film continues the versioned AURIC volumes and runs 7:16. It covers two volumes of trureturing at subject commit
`da10294714`:
- `AURIC_SUM_PRODUCT_POWERS_QUADRATIC_RELATION_CLOSURE_AND_NORMALIZED_LIFTING_V49.md`, §2–§11;
- `AURIC_RECURSIVE_THREE_AXIS_ATLAS_POWER_LIMITS_AND_KBONACCI_V50.md`, §2–§10 and Appendix A.

V49 asks which joint conditions force the exponent two: multiplicative weights, orthogonal merging, positive relation
matrices with reciprocals, bilinear closure, and a conserved single site in the project's native source. V50 reuses
one binary normalisation interface again and again, as a binary atlas of Bloch points, and asks which constraints
really vanish as a K-bonacci order, a window length or a number of averaged spins grows.

## The film, scene by scene

- **Two routes to the square (V49 §3, §5).**
  - Log turns products into sums. A continuous weight with w(rs) = w(r)w(s) and w(1) = 1 is a power r^β
    (Theorem 3.2), and every β > 0 gives a legal two-outcome law with log(p/(1 − p)) = β log(a/b).
  - Asking w(√(r² + s²)) = w(r) + w(s) gives 2^(β/2) = 2, so β = 2 (Corollary 3.3).
  - Without continuity: if the 2 × 2 matrix with w(|z₁|), w(|z₂|) on the diagonal and z₁* z₂ off it is positive for all
    nonzero z₁, z₂, then (r, 1) gives w(r) ≥ r², 1/r gives w(1/r) ≥ r^(−2), and w(r)w(1/r) = 1 gives w(r) = r²
    (Theorem 5.1). With mixed degrees, det at z₁ = z₂ = t is t^(2β) − t⁴, negative somewhere unless β = 2
    (Proposition 5.2).
- **Bilinear closure (V49 §4, §8).**
  - For Q ≥ 0 with Q(0) = 0, if the merging correction C_Q(u, v) = [Q(u + v) − Q(u) − Q(v)]/2 is real bilinear, then
    Q(v) = C_Q(v, v) and C_Q is a symmetric positive semidefinite form. No continuity, evenness or homogeneity is assumed
    (Theorem 4.2). For Q = ‖v‖^β this forces 2^β = 4 (Proposition 4.3).
  - A quadratic weight on three fixed branches has I₃ = 0 (Proposition 8.1). The weight |x|³ on three equal unit inputs
    gives 27 − 3·8 + 3 = 6. I₃ = 0 with nonnegative weights still does not give a positive Gram kernel (V14 §10).
- **Power features (V49 §6, V50 §3).**
  - Φ_m(a, b) has m + 1 coordinates √C(m,k) a^(m−k) b^k, with ⟨Φ_m(z), Φ_m(w)⟩ = ⟨z, w⟩^m and linear span exactly
    ℂ^(m+1) (Theorem 6.2). For m = 2 the cross feature √2 ab carries the missing 2|a|²|b|² (Corollary 6.3).
  - The projective image keeps complex dimension one, so its codimension in ℂP^m is m − 1 (V50 Theorem 3.2).
  - Squaring again is ambiguous. From ρ₁ = ½[[1, ½], [½, 1]], normalised matrix powers have Bloch length
    tanh(m artanh ½) = (3^m − 1)/(3^m + 1) → 1, while tensor Gram powers have length 2^(−m) → 0
    (V50 Propositions 3.4–3.5).
- **The Bloch ball (V49 §7, V50 §2).**
  - A positive 2 × 2 matrix M with trace N > 0 gives M/N = (I + r·σ)/2 with r = (2 Re C, −2 Im C, A − B)/N and
    1 − ‖r‖² = 4(AB − |C|²)/N² (V49 Theorem 7.1, V50 Theorem 2.2). With δ = ½ log(A/B), (A − B)/(A + B) = tanh δ and
    2√(AB)/(A + B) = sech δ (V49 Theorem 7.2).
  - Limits of positive trace-one matrices stay positive with trace one, and limits of pure states stay pure
    (V50 Theorem 2.3). Normalisation and limits need not commute: 2^(−j) I → 0 while its normalised form is I/2.
- **Native square law (V49 §9).**
  - The native source has |E| = 89 configurations of nine sites with no two adjacent, the active block
    Q = [[x, c], [c, x²]] with x + x² = 1 and c = x√x, and drive α = 3π/5, so ten calls return: U_j(10) = I
    (Proposition 9.2).
  - Under source conditions A and B, returns give a common odds function (Theorem 9.3), and the four corners ∅, {1},
    {1,3}, {3} force Π_q ∝ k^|q| |z_q|^β with k, β > 0 (Theorem 9.4).
  - The blocked single site {2} keeps its probability, so |a|^β + k|b|^β must stay constant along the block motion; this
    gives k = 1 and β = 2, and Π_q(z) = |z_q|²/‖z‖² (Theorem 9.5).
- **Squared residuals (V49 §10, §11).**
  - For 0 ⪯ T ⪯ qI with q < 1, U = [[√(I − T), −√T], [√T, √(I − T)]] is unitary, ‖h_j‖² = ‖d_j‖² + ‖h_(j+1)‖², and
    ‖h_(n+1)‖² ≤ q^(n+1)‖h₀‖² (Theorem 10.1). Two is the weight degree; n + 1 is the recursion depth.
  - With χ_a = Σ n^(−a)|n⟩/√ζ(2a) and W_t|n⟩ = n^(−it)|n⟩ (a > ½), ⟨χ_a, W_t χ_a⟩ = ζ(2a + it)/ζ(2a) in the same
    space ℓ²(ℕ) (§11). No measurement on the critical strip is claimed.
- **Binary atlas (V50 §4).**
  - On a full binary tree with k leaves, strictly positive probabilities correspond one to one with k − 1 split ratios,
    each a point (2√(ϑ(1 − ϑ)), 0, 2ϑ − 1) on a half meridian; leaves are products of ratios along paths, and the root
    mass restores the scale (Theorem 4.2).
  - Leaf amplitudes satisfy |A_i|² = Π|c_e|² and log|A_i|² = 2 Σ log|c_e|: the exponent stays two at every depth
    (Corollary 4.3). For general quantum relations M = ½(I⊗S + σx⊗X + σy⊗Y + σz⊗Z) with operator-valued axes
    (Theorem 4.4).
- **K-bonacci memory (V50 §5, §6).**
  - Words of length n without k consecutive ones number 2^n for n < k and then the sum of the previous k (Definition 5.1).
    This count is a Lean-frozen project theorem (see the evidence notes).
  - The legality Hankel rank is exactly k over every field (Theorem 5.2).
  - The normalised history updates by F_k(p) = (1, p₁, …, p_(k−1))/(2 − p_k) and S_(t+1) = S_t(2 − p_k)
    (Proposition 6.2). TV(F_k p, F_k q) ≤ TV(p, q)/(2 − min(p_k, q_k)) on the closed simplex (Theorem 6.4), so every start
    contracts by λ_k per step (Corollary 6.6); with noise ε per step, limsup TV ≤ ε/(1 − 1/λ_k) ≤ φ²ε (Corollary 6.7).
- **Growth roots (V50 §7).**
  - λ₂ = φ, λ_k strictly increases, 2 − λ_k = λ_k^(−k), and λ_k → 2 (Theorem 7.1); this sentence is Lean-frozen.
  - The fixed point is p*_j = λ_k^(−j) (Theorem 6.5). Its total-variation distance to the halving law 2^(−j) is exactly
    2^(−k), and TV(F_k^t p₀, 2^(−j)) ≤ φ^(−t) + 2^(−k) for every start (Theorem 7.2).
- **Windows and limits (V50 §8, Appendix A).**
  - For a fixed window length n, k > n makes all 2^n words legal; at k = n the all-ones word is still excluded
    (Theorem 8.1). The two limits do not commute: fixed n gives 1, fixed k gives 0 (Theorem 8.2).
  - With n 2^(−k) → τ, a fair word is legal with probability → e^(−τ/2) (Theorem A.1).
  - The Lean-frozen Poisson bound: for n ≥ k ≥ 2, |P_n,k − e^(−μ)| ≤ min(1, μ)(k + 1)2^(−k) with
    μ = (n − k + 2)/2^(k+1); also 1 − P ≤ μ and P ≤ 1/μ.
- **Averaged spins (V50 §9).**
  - On Sym^m(ℂ²), X_i = (1/m) Σ_a σ_i^(a) satisfy [X_i, X_j] = (2i/m) ε_ijk X_k and Σ X_i² = (1 + 2/m) I, so the total
    variance 1 + 2/m − ‖r‖² is at least 2/m, attained by coherent product states, while ‖r‖ ≤ 1 for every m
    (Theorem 9.2).
  - Over a point with ‖r‖ < 1 the fibre has real dimension D² − 4 = m² + 2m − 3 (Theorem 9.3). At m = 2, |Ψ⁺⟩ and |Φ⁺⟩
    are orthogonal, both read r = 0, and have ⟨X_z²⟩ = 0 and 1.

一部约七分钟的片子，接续带版本号的 AURIC 系列，讲第四十九、五十版：先用两条路线选出平方（乘法权重加正交合并，以及正关系矩阵加倒数），再看非负权重的双线性闭合与三阶容斥项；随后把两个振幅提升为 m 次幂特征，说明交叉特征补全归一化，而“再平方”可以走向相反的极限；二乘二正关系经迹归一化成为 Bloch 球，极限留在球内；在项目原生来源中，回返与四角一致性先给出幂族，阻塞单点的守恒再选出 Π_q = |z_q|²/‖z‖²；酉余量递归里二是权重次数、n + 1 是深度；V50 用二叉图册反复使用同一个二元接口，K-bonacci 计数、Hankel 秩与归一化递推的总变差收缩给出稳定性，增长根趋于二、定态到二分律的距离恰为 2^(−k)；固定窗口与两种极限的次序决定约束是否消失，Poisson 界给出临界标度；最后平均自旋的交换子与最小方差按 2/m 缩小，而三轴之后的纤维维数为 m² + 2m − 3。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-104-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Digestion status.** At the subject commit neither volume has digestion records: there is no
  `Meta/Digestion/backfill/` directory for V49 or V50 (0 atoms in every state), so no atom of these volumes is covered by
  a Lean declaration.
- **Lean-frozen project theorems that match sentences.** Their state files exist under `Golden/Frozen/state/D5/` at the
  subject commit, and the statements match the narrated sentences:
  - `D5/S0/Tower/DBonacci/Names`: `dbonacci_name_card` (words of length Q with no d consecutive ones number
    `dbonacci d (Q + 2)`), `dbonacci_name_card_of_lt` (2^Q when Q < d) and `dbonacci_name_card_recurrence` (the d-term
    sum). The first sentence of the K-bonacci scene carries the lean badge.
  - `D5/S0/Tower/DBonacci/PerronRoot`: `dbonacciPerronRoot_two_eq_goldenRatio`, `dbonacciPerronRoot_strictMonoOn`,
    `two_sub_dbonacciPerronRoot_eq_inv_pow` and `dbonacciPerronRoot_tendsto_two`. The first sentence of the growth-root
    scene carries the lean badge; the fixed point and the 2^(−k) distance are theory.
  - `D5/S1/Words/ClosedRunPoisson`: `closed_word_poisson_bounds`. The second sentence of the window scene's second
    line carries the lean badge; the e^(−τ/2) limit as stated in V50 Appendix A is theory.
  - The digestion ledger links these theorems to other volumes, not to V49 or V50: PerronRoot and Names to absorbed-closed
    atoms of the Recursive Relational Observation effective-resolution volume (§1.2, which V50 cites for the root limit
    and the fixed-window statement), and ClosedRunPoisson to Proposition 10.2 of the K-bonacci self-calibrating
    boundaries volume (which V50 Appendix A cites).
- **Published results.** V50 cites Lieb, *The classical limit of quantum spin systems*, Comm. Math. Phys. 31 (1973),
  DOI 10.1007/BF01646493, only as topic attribution for high-spin classical limits; the film uses only the finite
  operator identities that V50 proves itself, so no scene carries the published badge.
- **Classical tools named in the volumes.** The Bloch representation and Pauli algebra (the first line of the Bloch scene
  is badged classical), polarisation and the parallelogram law, Cauchy's additive functional equation, the binomial
  theorem, Cauchy–Schwarz and Bonferroni bounds. V49 states that polarisation, positive matrices and symmetric powers
  are standard tools.
- **Project inputs from other volumes, badged as theory.** The quantum-principles continuation III §§177–182 (the native
  source, conditions A, B and C, Theorems 178.1–179.1) and §§183–189 (entropy-rate and truncation results, mentioned in
  V50 §10 but not shown); V14 §10 (indefinite example); V17 §2 (log semiring); V19 §7.3 (zeta overlap); V41 §§3–4
  (Gram forms); the K-bonacci boundaries volume (Hankel rank, Proposition 4.4; fair-bit limits, §10); the RRO
  effective-resolution volume (§§1.2.13–1.2.14).
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, scipy, sympy, mpmath) runs 252 checks:
  - **Select.** log(p/(1 − p)) = β log(a/b) on 2000 random samples; 2^(β/2) = 2 has the single solution β = 2;
    β = 1, 1.5, 2.5, 3 violate orthogonal merging. For w = r^β with β ∈ {−1, 0, 0.5, 1, 1.5, 2.5, 3}, det = r^β − r² is
    negative somewhere, while w = r² gives rank-one positive Gram matrices on 1000 random pairs. t^(2β) − t⁴ < 0 at
    seven listed (β, t) pairs; F_β is multiplicative with |F_β|² = |z|^β and additive only for β = 2.
  - **Closure.** C_Q equals the bilinear form for random PSD forms in dimensions 2, 3 and 5; C(e, −e) = −1 and
    C(e, e) = (2^β − 2)/2 equals 1 only at β = 2; I₃ = 0 for a random quadratic weight; |x|³ gives 6 (and |x|⁴ gives
    36); Pauli vectors satisfy uv + vu = 2g(u, v)1.
  - **Powers.** ⟨Φ_m(z), Φ_m(w)⟩ = ⟨z, w⟩^m and span dimension m + 1 for m = 1…7; (a, b) = (√0.7, √0.3) gives feature
    weights 0.49, 0.42, 0.09; s_m < 1 for m > 1; Veronese relations and a real-dimension-two image for m = 2, 3, 4, 6;
    coordinate powers with θ = 2π/3 alternate between two equator points; R_m = (3^m − 1)/(3^m + 1) and Gram length
    2^(−m) for m = 1…12; 1 − ‖r_m‖² = (1 − q^(2m)) sech²(mδ) on 300 samples.
  - **Bloch.** M/N = (I + r·σ)/2 and 1 − ‖r‖² = 4(AB − |C|²)/N² on 1000 random matrices; X² + Y² + Z² = N²; tanh and sech
    identities; 2^(−j) I → 0 with normalised form I/2.
  - **Native.** |E| = 89; x = 0.6180, Q² = Q, Tr Q = 1, n = (2c, 0, x − x²) a unit vector; 10α = 6π and U(10) = I;
    U_j(t) = exp(−iH_j t); J = 2αc Im(a* b) = 0.8792 > 0; along the block motion |a|^β + k|b|^β is constant only for
    (β, k) = (2, 1) (spread 1.0 × 10⁻¹⁴, against 0.28–0.97 for (1, 1), (3, 1), (2, ½), (2, 2)).
  - **Residual.** The block matrix is unitary; the layer identity and the bound q^(j+1) hold for ten layers at q = 0.7;
    the zeta overlap matches truncated sums for (a, t) = (1, 1) and (0.8, 2.5); |ζ(2 + it)/ζ(2)| ≤ 1.
  - **Atlas.** p = (0.40, 0.25, 0.20, 0.10, 0.05) with ratios 0.65, 0.615, 0.571, 0.667 is rebuilt from four ratios and a
    root mass; random edge amplitudes give Σ|A_i|² = 1; the operator-valued decomposition and its traces hold on a random
    6 × 6 state.
  - **K-bonacci.** Counts match brute force for n ≤ 14, k = 2…6, and G_n^(2) = F_(n+2); legality Hankel ranks are
    2, 3, 4, 5 for k = 2, 3, 4, 5 over ℚ and GF(2) (words up to length 5); the witness matrices have det ±1 for k = 2…6;
    TV contraction on 100,000 random pairs including boundary points; Corollary 6.6 from a vertex for t ≤ 15;
    ε/(1 − 1/λ_k) ≤ φ²ε with equality at k = 2; the scale bound of Proposition 6.8 for t ≤ 24; M_k has spectral
    radius λ_k > 1.
  - **Roots and limits.** λ₂ = 1.618034, λ₃ = 1.839287, λ₄ = 1.927562, λ₅ = 1.965948, 2 − λ₂₀ = 9.5 × 10⁻⁷, and
    2 − λ_k = λ_k^(−k) for k = 2…20; TV(p*(k), 2^(−j)) = 2^(−k) for k = 2…15 in 50-digit arithmetic (k = 4:
    p* = 0.5188, 0.2691, 0.1396, 0.0724); the joint bound φ^(−t) + 2^(−k) on 200 random starts; Proposition 7.4.
  - **Windows.** k > n makes all 2^n words legal and k = n gives 2^n − 1; the bounds of Theorem 8.2 for n < 40, k < 16;
    P_(12,k) → 1 and P_(n,4) → 0; P_(2^k,k) = 0.60654 at k = 18 against e^(−1/2) = 0.60653; τ = 0.25 and 4 give 0.8826
    and 0.1353 against 0.8825 and 0.1353; the Lean Poisson bound holds for k < 14, n < 3000 (every seventh n); Perron
    blocks give Pr([1101001]) = 2^(−7) at k = 30.
  - **Spin.** For m = 1…6 the commutator and Casimir identities hold on Sym^m, coherent states reach total variance 2/m,
    200 random states per m satisfy total variance = 1 + 2/m − ‖r‖² ≥ 2/m, and the fibre dimensions are 0, 5, 12, 21, 32,
    45; |Ψ⁺⟩ and |Φ⁺⟩ are symmetric, orthogonal, have r = 0 and ⟨X_z²⟩ = 0 and 1.
  - These are sampled and finite checks, not proofs.
- **Data drawn on screen.** The odds curves; the det curves; the I₃ bars; the feature-weight bars; the matrix-power and
  Gram-power curves; the (sech δ, tanh δ) points; the native block-motion curves; the residual bars; the zeta curve;
  the tree probabilities and ratios; the K-bonacci count table and Hankel ranks; the TV contraction curves; the λ_k
  points; the p* and 2^(−j) bars and the TV = 2^(−k) points; the window curves P_(12,k), P_(n,4) and P_(2^k,k); the
  variance and commutator points; the fibre-dimension bars.
- **Illustrative visuals.** These are illustrations, not data: the rotating Bloch spheres and their points; the 2^(β/2)
  and C(e, e) closed-form curves; the branch arrows; the feature-count cells; the Bloch-ball limit dots; the 2^(−j) and
  I/2 cells; the nine-site row, the ten-call dial and the four-corner square; the residual cascade; the node spheres of the
  tree; the Hankel witness matrix; the window words.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
