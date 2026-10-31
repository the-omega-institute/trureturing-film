# 095 · AURIC V30–V31 · STATIC RECORDS, GOLDEN CLOCKS AND METRIC RECOVERY · AURIC V30–V31 · 静态记录、黄金时钟与度规恢复

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:28). It covers two volumes of
trureturing at subject commit `e42edf53c9`:
- `AURIC_UNIQUE_STATIC_ONTOLOGY_ENDOGENOUS_OBSERVERS_AND_GOLDEN_RECURSIVE_CLOCKS_V30.md`, §2–§12;
- `AURIC_INTERNAL_RECORDS_LONG_TERM_STABILITY_AND_CLOCK_GEOMETRY_RECONSTRUCTION_V31.md`, §2–§11.

Version thirty keeps observers, programs, records and clocks inside one fixed algebraic state. Version thirty-one asks
when internal records stay stable under imperfect instruments, and when clock readings rebuild a metric.

## The film, scene by scene

- **One state (V30 §2, §4).**
  - Compatible internal states on an increasing family of C* subalgebras extend uniquely to one state ω. The GNS
    construction gives a cyclic vector Ω with ω(a) = ⟨Ω, π(a)Ω⟩ (Theorem 2.2).
  - If all internal unitaries are allowed, a unitary built inside span(Ω, ψ) takes Ω to every unit ψ (Theorem 2.4).
  - A finite gate menu has countably many words, while the rays are uncountable. For the diagonal algebra ℂ ⊕ ℂ,
    Ω = (1, 1)/√2 is cyclic, yet no diagonal unitary takes it to (1, 0).
  - Isometric growth has a direct limit in which every ψₙ₊₁ = Tₙψₙ is the same vector Ω (Theorem 4.1). rⁿ lasting,
    distinguishable histories need dimension at least rⁿ (Proposition 4.4). Conditioned fair-coin vectors satisfy
    ‖ψₙ₊₁ − ψₙ‖² = 2 − √2, so readings settle while vectors need not (Proposition 4.5).
- **Settling records (V30 §3).**
  - For nested commuting record partitions and a target projection Z that commutes with them, the posterior
    qₙ = ω(PₕZ)/ω(Pₕ) is a bounded martingale on the one fixed law, and ω((Z − qₙ)²) = ω(qₙ(1 − qₙ))
    (Theorem 3.2, eq. 2).
  - The limit is 0 or 1 almost everywhere exactly when the full record determines Z (four equivalent conditions).
    The binary entropy of qₙ is a supermartingale, and independent records leave qₙ = ω(Z) (Corollary 3.3).
  - Commuting cannot be dropped: for Ω = |+⟩ and A = |+⟩⟨+|, refining from the trivial record to P₀, P₁ moves the
    Lüders value from 1 to 1/2 on each branch (Proposition 3.4).
- **Relations and readings (V30 §5).**
  - A *-automorphism keeps every polynomial relation, while ω(θA) may differ from ω(A): A_θ = cos θ Z + sin θ X
    satisfies A_θ² = I and ω(A_θ) = cos θ in |0⟩ (Theorem 5.1).
  - The Peres–Mermin square has commuting rows and columns, row products I and column products I, I, −I, so no
    context-free ±1 table exists (Theorem 5.3).
  - In |+y⟩, ΔX·ΔZ = 1 = |ω([X, Z])|/2 (Theorem 5.4).
  - For K_η = η|0⟩⟨0| and L_η = η|1⟩⟨0|, ‖K_η − L_η‖ = √2η → 0 and both masses are η², yet the conditional
    states are orthogonal. With masses at least ε, |ω_K(A) − ω_L(A)| ≤ 4‖K − L‖/ε (Proposition 5.5).
- **Golden programs and the Cantor spectrum (V30 §6–§7).**
  - G = Σ|j⟩⟨j| ⊗ Uⱼ is unitary. An exact deterministic processor for all data inputs needs orthogonal programs, so
    d_P program dimensions hold at most d_P projectively different unitaries (Theorem 6.2).
  - With r = φ⁻² and weights c_k = (1 − r)r^(k−1) = φ^(1−2k), ‖Θ − Θₙ‖ ≤ φ^(−2n) and ‖U − Uₙ‖ ≤ ‖A‖φ^(−2n)
    (Theorem 6.3, eq. 4); readout errors are at most 2‖A‖φ^(−2n) (Corollary 7.4).
  - The spectrum K = θ({0, 1}^ℕ) satisfies K = rK ∪ (1 − r + rK) with gap 1 − 2r = φ⁻³. σ(Θ) = K, but Θ has no
    normalisable eigenvector (Theorem 7.2). dim_H K = log 2/(2 log φ) ≈ 0.7202 (Theorem 7.3).
- **Ticks and static histories (V30 §8–§9).**
  - With a counter S, (S ⊗ U⁻¹)(S ⊗ U) = S² ⊗ I, and K¹⁰ = I does not give (S ⊗ K)¹⁰ = I: it equals
    S¹⁰ ⊗ I (Proposition 8.2).
  - Edge increments come from a vertex clock potential exactly when every signed closed walk sums to zero
    (Theorem 8.4).
  - For weights αₙ > 0 with Σαₙ² = 1 over all of ℤ, J v = Σ αₙ|n⟩ ⊗ Wₙv is isometric, K = Σ Lₙ*Lₙ converges with
    Σ‖Lₙ*Lₙ‖ = 2, and ker K = ran J. The labels have no first or last element (Theorem 9.1, Corollary 9.2).
- **Loops and curvature (V30 §10–§11).**
  - With D_eψ = ψ_v − U_eψ_u and H_G = Σ D_e*D_e, ker H_G is the common fixed space of all loop transports
    (Theorem 10.2). Pure reference differences V_vV_u* are flat, but a triangle with edges I, I, diag(1, e^(iθ))
    has a consistent state |0⟩ everywhere and a nontrivial loop (Proposition 10.3).
  - On ℝ × T³, g₀ = −dt² + dx² + dy² + dz² and g₁ = −dt² + dx² + a(x)²dy² + dz², a = 2 + cos x, give every resting
    clock dτ = dt, but R^x_yxy = −aa″ = a cos x, which is 3 at x = 0 (Theorem 11.1).
  - Given a static metric −c²N²dt² + δᵢⱼdxⁱdxʲ, d²xⁱ/dt² = −c²N∂ᵢN + 2vⁱvʲ∂ⱼ log N and Rⁱ_tjt = c²N∂ᵢ∂ⱼN. At rest
    with N = 1 + Φ/c², the acceleration is −∇Φ − (Φ/c²)∇Φ (Theorem 11.2). Einstein's equations need an action and
    matter as further inputs (Proposition 11.3).
- **Native port and the odd-phase wall (V30 §12).**
  - With a = (5 + √5)/10 and b = (5 − √5)/10: ab = 1/5, |⟨u, z⟩|² = b and Q² = aI, giving the golden likelihoods
    ((1 ± √a)/2) = (0.9253, 0.0747) (eq. 12).
  - In the 89-dimensional carrier V₁₂ (code 26 = 13 × 2, leak 63), finite native words approximate the port with
    branch error δ = ε_A + ε_R, total variation at most δ and leakage at most δ² (Theorem 12.1). Complete-channel
    errors add over a fixed depth (Theorem 12.2).
  - For odd m, no finite native word implements the controlled phase U_m exactly: under ζ ↦ −1, φ⁻¹ ↦ 2 into F₅
    the pattern ε[[1, 1], [1, −1]] has determinant −2ε² ≠ 0, while every code-stabiliser product A ⊗ B gives an
    outer product with determinant 0 (source Theorem 103.2, as presented in §12).
- **Branch calibration (V31 §2–§5).**
  - The consumed classification (project Theorem 104.3, V31 Theorem 3.1): the old branch reads F = q (Born), the
    second G = cq + d with c = ax/(1 − a) ∈ (0, 1], a ∈ (0, x], d ≥ 0, Σd = 1 − c, and G = F iff a = x, where
    x = (√5 − 1)/2. All 1024 labels are kept, 13 of them legal.
  - Δ = sup TV(G(ψ), F(ψ)) = max over the 13 basis inputs = t − min legal dⱼ, with (12/13)t ≤ Δ ≤ t, t = 1 − c
    (Theorem 4.2), and x − a = x³t/(1 − xt) (Corollary 4.3). The finite masses converge along the whole sequence
    (Theorem 4.4).
  - On screen: coherent programs keep phases (Proposition 2.3), and equal Born odds can give different updates
    (Proposition 5.1).
- **Polarization (V31 §6).**
  - If complete instrument errors have Σεₙ = E* < ∞, then qₙ → q∞ ∈ {0, 1} almost surely and in L¹, with
    |P(q∞ = 1) − q₀| ≤ E* and an explicit bound on visits to η ≤ qₙ ≤ 1 − η (Theorem 6.4).
  - The proof uses the impurity q(1 − q), which is 1-Lipschitz in output trace distance (Lemma 6.3) and drops by at
    least c*V² in an ideal step (Lemma 6.2). Golden likelihoods give c* = 4γ² = 4a (Corollary 6.6). Exact mean
    conservation gives P(q∞ = 1) = q₀ (Theorem 6.5); D(ρₙ, PρₙP/qₙ) ≤ √(1 − qₙ) (Corollary 6.7).
- **Errors and schedules (V31 §7–§8).**
  - A fixed noise fraction λ keeps λr/d ≤ qₙ ≤ 1 − λ(1 − r/d) (Proposition 7.1). Rotations with
    sin²θₙ = 1/(n + 2) have εₙ → 0, yet the label flips forever (Proposition 7.2).
  - mₙ = ⌈log(Cn(n + 1)/δ)/(2 log φ)⌉ gives εₙ ≤ δ/(n(n + 1)) and Σεₙ ≤ δ (Corollary 8.1).
  - A constant one-symbol readout can still need 2ᵏ online states: (C_stat, C_on) = (2, 2ᵏ) (Proposition 8.3 with
    the typed-cocycle construction).
- **Ten probes and the metric (V31 §9–§11).**
  - If directions form a four-space and squared clock readings are m(v) = −g(v, v), the ten timelike probes e₀,
    e₀ ± εeᵢ, e₀ + ε(eᵢ + eⱼ) recover G = −g by eq. (15); fewer than ten fixed readings generally cannot, since
    Sym²(V*) has dimension 10 (Theorem 9.2).
  - ‖G̃ − G‖_F ≤ δ√(1 + 3/(2ε²) + 36/ε⁴), and errors below min |λ(G)| keep the signature (Theorem 9.3). Ten readings
    cannot prove the quadratic law itself (Proposition 9.4).
  - Finite ticks: |(τ̃/h)² + g(v, v)| ≤ LV³h + 2Bζ/h + (ζ/h)² (Theorem 10.1).
  - Equal null cones and time sides give h = cg with c > 0, and equal volume forces c = 1 (Theorem 11.1). A frame
    e: TM → E gives the spacetime metric up to O(1, 3) (Theorem 11.2).

一部约七分半钟的片子，延续 AURIC 版本系列，讲第三十版与第三十一版：同一个固定态通过 GNS 给出一个循环向量；对易记录上的后验是鞅，误差恒等于 q(1 − q) 的均值，极限只取零或一当且仅当完整记录能辨认目标；自同构保持代数关系而读数移动，Peres–Mermin 方阵没有全局 ±1 值表；黄金权重使递归门以 φ^(−2n) 收敛，二进制程序给出间隙 φ⁻³、维数 log2/(2logφ) ≈ 0.72 的 Cantor 谱；被记录的 tick 不能相消，双无限静态历史恰是正约束算子的核；一个相容态不迫使平坦，静止钟速也不决定曲率；原生黄金读口可有限精度取得，奇次受控相位却在模五约化下被行列式排除；第三十一版用十三个基输入锐利地控制分支误差，证明可求和仪器误差下的几乎必然极化并给出反例与黄金调度，最后用十个类时钟读数恢复点态度规，并以光锥加体积确定它。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-095-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the V30 volume has 58 digestion atoms and the V31 volume has 48; all 106 are
    residual-open.
  - No Lean declaration covers any statement shown, and no frozen general theorem is cited for a badge.
- **Published results, used as external inputs.** The square, golden and finale scenes badge them as published.
  - Peres–Mermin square: N. D. Mermin, Rev. Mod. Phys. 65, 803 (1993), doi:10.1103/RevModPhys.65.803.
  - No-programming theorem: Nielsen–Chuang, Phys. Rev. Lett. 79, 321 (1997), arXiv:quant-ph/9703032.
  - Convergence of repeated non-demolition measurements: Bauer–Bernard, Phys. Rev. A 84, 044103 (2011),
    arXiv:1106.4953.
- **Classical tools named in the volumes.** The GNS construction (Fewster–Rejzner, arXiv:1904.04051, §2.3), the
  Robertson–Cauchy–Schwarz bound, Doob's maximal inequality and Borel–Cantelli, the Hausdorff mass-distribution
  argument, Christoffel and Riemann calculus, and the Einstein–Hilbert variation. The one-state scene and the
  uncertainty half of the readings scene badge them as classical.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the native acquisition of quantum continuation II §100 (finite words, ε_A and ε_R) and its §103 odd-phase
    theorem 103.2;
  - the response classification 104.3 consumed as V31 Theorem 3.1, and the finite-acquisition residuals of
    §§106–107;
  - the typed-cocycle separation (C_stat, C_on) = (2, 2ᵏ).
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy) runs 101 checks:
  - **One state.** 50 random pairs (Ω, ψ) with U Ω = ψ; the diagonal ℂ ⊕ ℂ example keeps |(UΩ)₀| = 1/√2 for
    500 random diagonal unitaries and is cyclic; ⟨ψₙ, ψₙ₊₁⟩ = 1/√2 and ‖ψₙ₊₁ − ψₙ‖² = 2 − √2 = 0.5858.
  - **Records.** For noisy-copy records (flip 1/4) E(Z − qₙ)² = E qₙ(1 − qₙ) exactly for n = 0…40, falling from
    0.25 to 2.6 × 10⁻⁴; the martingale and entropy-supermartingale properties hold on every history with n < 25;
    the identity also holds on a random joint law with six records; the |+⟩ example gives 1/2 and 1/2.
  - **Readings.** A_θ² = I with ω(A_θ) = cos θ; Peres–Mermin products I, I, I and I, I, −I with commuting rows and
    columns; none of the 512 ±1 tables satisfies all six relations; ΔX·ΔZ = 1 in |+y⟩; the Robertson bound and both
    bounds of Proposition 5.5 on 300 random cases each; ‖K − L‖ = √2η with orthogonal conditional states.
  - **Golden.** r = φ⁻² = 0.381966, c_k = φ^(1−2k), errors below φ^(−2n) (and 2‖A‖φ^(−2n) for readouts) for
    n = 1…15 on a 60-bit commuting example; gap 1 − 2r = φ⁻³ = 0.236068; self-similarity on all 2¹⁴ level-14 points;
    box-counting slope 0.7202 against log 2/(2 log φ) = 0.720210; μ(I) ≤ (2 + φ³)|I|^s on 3000 random intervals.
  - **Ticks and histories.** (S ⊗ K)¹⁰ = S¹⁰ ⊗ I ≠ I and (S ⊗ U⁻¹)(S ⊗ U) = S² ⊗ I; the diamond with 1 + 2 = 2 + 1
    has a potential and the one with loop sum −1 has none; on an 81-label window LₙLₙ* = (αₙ² + αₙ₊₁²)I, J is
    isometric and dim ker K = dim H = 2; the modular flow keeps Tr(ρA) while a two-time correlation moves.
  - **Loops and curvature.** The triangle has dim ker H_G = 1 for θ = 0.9 and 2 for θ = 0; flat reference
    differences give full kernel; for a random triangle ker H_G equals the fixed space of the loop. Sympy gives
    R^x_yxy = a cos x (3 at x = 0) with g₀ flat, the geodesic acceleration (11), Rⁱ_tjt = c²N∂ᵢ∂ⱼN, the Newtonian
    form −∇Φ − (Φ/c²)∇Φ, and zero curvature for an affine lapse.
  - **Native port.** ab = 1/5, |⟨u, z⟩|² = b, Q² = aI to 20 digits; likelihoods (0.9253, 0.0747); Fibonacci path
    counts 13 and 89 with 89 − 26 = 63 and 1024 − 13 = 1011; Φ₁₀(−1) = 5, φ⁻¹ = −(ζ + ζ⁻¹) ↦ 2 in F₅; the odd-m
    pattern has nonzero determinant for every ε ∈ F₅* and every outer product A_iB_j has determinant 0.
  - **Branch calibration.** c = ax/(1 − a) ∈ (0, 1] exactly for a ∈ (0, x]; x − a = x³t/(1 − xt) exactly; on 400
    random d over 1024 labels and 16000 random states, Δ = t − min legal dⱼ with the vertex value attained and
    both ends of (12/13)t ≤ Δ ≤ t attained; Δ ≤ 0.1 gives x − a ≤ 0.0274.
  - **Polarization.** Σ(ℓ₁ − ℓ₀)² = 2γ² and c* = 4γ² = 4a = 2.894; the gain identity and v ≥ c*V² on 999 grid
    points; the impurity Lipschitz bound and its variational form on 300 random cases. With golden likelihoods,
    rank 5 of 13 and noise λₙ = 0.1/n² (E* = 0.164), the exact mean recursion gives P(q∞ = 1) = 0.482 from q₀ = 0.5;
    4000 simulated paths polarize (99.8 % within 0.01 by n = 60) with selection frequency 0.482 and mean
    middle-region visits 2.54 against the bound 17.68 (η = 0.1).
  - **Errors and schedules.** Fixed λ = 0.05 keeps q in [0.0192, 0.9692] for 400 steps; with sin²θₙ = 1/(n + 2)
    the mean number of flips in 20000 steps is 8.83 against Σ1/(n + 2) = 8.98; for C = 1, δ = 0.01 the schedule
    gives m₁ = 6, m₁₀ = 10, m₁₀₀₀ = 20 and a partial sum of 0.0065 over the first 2 × 10⁵ steps.
  - **Ten probes.** Random Lorentz forms are recovered exactly by eq. (15) for ε = 0.3, 0.1, 0.03; perturbed
    readings stay within δ√(1 + 3/(2ε²) + 36/ε⁴), and the worst of all 1024 sign patterns meets that bound; the
    ten evaluations have rank 10 on Sym² and any nine rank 9; the tick bound (17) on 300 random lapse fields; the
    nine null probes force h = cg (sympy), and det(cg) = c⁴ det g.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The six posterior paths and the error identity curve.
  - The φ^(−2n) bound with the sampled gate errors, and the Cantor levels 0–6.
  - The αₙ² bars, the diamond increments and the curvature curve a cos x.
  - The golden likelihood bars.
  - The Δ samples and the x − a curve.
  - The ten polarization paths and the visit bars.
  - The fixed-noise path with its band, the flip barcode and the schedule staircase.
  - The amplification curve with the worst-sign dots.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the nested subalgebra ellipses, the reachable-state disc and the record tree;
  - the record-equivalence box, the qubit spheres and the A_θ dial;
  - the Peres–Mermin grid and the amplification arrows;
  - the program register;
  - the tick dial and counter;
  - the transport triangle with its loop arrow;
  - the carrier and code boxes and the F₅ matrix cells;
  - the branch tree and the 1024-label grid (its 13 gold cells mark positions only);
  - the impurity parabola;
  - the memory tree;
  - the ten probe arrows and null cone (ε exaggerated, three spatial axes drawn in two).

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
