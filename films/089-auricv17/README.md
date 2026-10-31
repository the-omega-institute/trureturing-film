# 089 · AURIC V17–V18 · QUANTUM PYTHAGORAS AND RECURSIVE GOLDEN GATES · AURIC V17–V18 · 量子勾股与递归黄金门

This film continues the versioned AURIC volumes and runs about 7½ minutes. It covers two volumes of trureturing at
subject commit `494f471b70`:
- `AURIC_SUM_PRODUCT_LOGARITHMS_AND_QUANTUM_PYTHAGOREAN_GEOMETRY_V17.md`, §2–§13;
- `AURIC_TRIANGULATION_COLLAPSE_AND_RECURSIVE_UNITARY_GATES_V18.md`, §2–§10.

Version seventeen follows sums and products through logarithms, triangles and squared amplitudes on the five AURIC
modes, and ends at the golden gate. Version eighteen asks when a triangulation of the same five-mode fiber is the
branch of a measurement, and when a phase inside a gate can be lifted to a gate of its own. Complex Hilbert spaces,
tensor structure, the Born rule and the stated readout instruments are inputs throughout.

## The film, scene by scene

- **Sum and product (V17 §2, §8).**
  - log is a semiring isomorphism (ℝ≥0, +, ×) ≅ ([−∞, ∞), ⊕, ⊗) with a ⊕ b = log(eᵃ + eᵇ) and a ⊗ b = a + b
    (Theorem 2.3). For 3, 4, 5 this reads 2 log 5 = (2 log 3) ⊕ (2 log 4).
  - A continuous L with L(ab) = L(a) + L(b) is c · log (Proposition 2.4). The Gibbs identity
    E_P c + τ D(P‖q) = −τ log Z + τ D(P‖P*) links the partition sum to its minimiser (Remark 2.5).
  - Squared norm adds on direct sums and multiplies on tensor products (Theorem 8.1). ‖u + e^(iθ) v‖² =
    ‖u‖² + ‖v‖² for every θ exactly when ⟨u, v⟩ = 0 (Proposition 8.2).
  - On a Hilbert space of dimension at least two, a non-negative weight that is unitarily invariant, additive on
    orthogonal vectors and equal to one on unit vectors is ‖v‖² (Theorem 8.3). A finite classical channel has the
    isometric extension V|x⟩ = Σ_y √T(y|x) |y⟩|x, y⟩_E (Theorem 8.4).
- **Five modes, one relation (V17 §3–§4).**
  - The modes Σ = (0, 1, 2, 3, 13) = (000, 100, 010, 001, 101) sit at v₀ = 0, v₁ = eₓ, v₂ = e_z, v₃ = e_y,
    v₁₃ = eₓ + e_y. The augmented columns have rank four and kernel h = (1, −1, 0, −1, 1), so the only affine
    relation is v₀ + v₁₃ = v₁ + v₃ (Theorem 3.3).
  - Of the ten triangles nine are right triangles and (v₁, v₂, v₃) is equilateral with side √2 (Theorem 3.4).
  - Fixing X = p₁ + p₁₃, Y = p₃ + p₁₃, Z = p₂ leaves the segment p(κ) = (R − X − Y + κ, X − κ, Z, Y − κ, κ),
    max(0, X + Y − R) ≤ κ ≤ min(X, Y) (Theorem 4.1).
  - The log four-corner ratio η = log(p₀p₁₃ / p₁p₃) is the interaction coordinate, and p₀p₁₃ − p₁p₃ = Rκ − XY,
    so η = 0 exactly when the ends are independent given z = 0 (Theorem 4.3).
- **Information Pythagoras (V17 §5, §10).**
  - On the fiber, F(κ) = −H(p(κ)) has F′ = η and F″ = 1/p₀ + 1/p₁ + 1/p₃ + 1/p₁₃ > 0, so the unique maximum
    entropy completion is κ* = XY/R (Theorem 5.1).
  - For q with no interaction, D(p‖q) = D(p‖p*) + D(p*‖q); for a general positive q there is an extra term
    −η_q(κ − κ*) (Theorem 5.3).
  - D(p‖q) = R I₀(p) + d(Z‖Z′) + R d(u‖u′) + R d(v‖v′), and D(p‖p*) = R I₀(p) = H(p*) − H(p) (Theorem 5.4).
  - For any five-dimensional density matrix ρ and diagonal reference σ = diag q with q in that family,
    D_Q(ρ‖σ) = C_rel(ρ) + R I₀(p) + D(p*‖q): record-basis coherence, hidden correlation and visible mismatch,
    all non-negative (Theorem 10.2). The maximum von Neumann entropy state with the three readouts is diag p*
    (Corollary 10.3).
- **Directions and areas (V17 §6–§7).**
  - Under p*, {1, t_z, t_x, t_y, t_h} is an orthonormal basis, so every variance is a sum of four squares
    (Theorem 6.3). The hidden direction alone gives Σ (p_s − p*_s)²/p*_s = δ²/(R u(1 − u) v(1 − v))
    (Corollary 6.4), and at δ = 0 the Fisher metric is block diagonal in (Z, u, v, δ) (Theorem 6.5).
  - det Cov = (d!)² Σ (Π p) Vol_d² (Theorem 7.1). For the five modes,
    det Cov(x, y, z) = Z(p₀p₁p₃ + p₀p₁p₁₃ + p₀p₃p₁₃ + p₁p₃p₁₃) (Corollary 7.2).
  - With independent ends kept by every record, two posterior means that both move need three outcomes, and
    det Cov_q(u, v) = 4 q₀q₁q₂ A² (Theorem 7.3). The volume's example has points (1/4, 2/3), (1/2, 1/6),
    (3/4, 2/3), area 1/8, variances 1/24 and 1/18 and covariance 0.
- **Log ratio and phase (V17 §9, §11).**
  - For amplitudes α_s, Ω = α₀α₁₃/(α₁α₃) has log Ω = η/2 + iΦ (Definition 9.1). The conditional base state is
    separable exactly when κ = XY/R and Φ = 0 (Theorem 9.2).
  - |det M|² = 4st[sinh²(η/4) + sin²(Φ/2)] with s = √(p₀p₁₃), t = √(p₁p₃), so
    C² = 16√(p₀p₁p₃p₁₃)/R² · [sinh²(η/4) + sin²(Φ/2)] (Theorem 9.3), and C² + ‖r‖² = 1 (Theorem 9.4).
  - Ψ± = (|000⟩ + |100⟩ + |010⟩ + |001⟩ ± |101⟩)/√5 have the same five probabilities 1/5 and η = 0; with the
    middle empty Ψ₊ is a product (C = 0) and Ψ₋ is maximally entangled (C = 1) (Proposition 9.5).
  - Shown on screen: a Bayes update adds log(ℓ₀ℓ₁₃/ℓ₁ℓ₃) to η, and a diagonal Kraus branch multiplies Ω by
    m₀m₁₃/(m₁m₃) (Theorems 11.1–11.2).
- **Golden gate (V17 §12–§13).**
  - τ ⊗ τ = 1 ⊕ τ gives d² = 1 + d, d = φ, and 1/φ² + 1/φ = 1; with a = φ⁻¹ and b = φ^(−1/2), F = (a, b; b, −a)
    has F² = I and det F = −1 (Theorem 12.2).
  - For projections with PQP = λP and QPQ = λQ, the gates G = I + (z − 1)P braid exactly when z + λ(z − 1)² = 0,
    that is 4λ sin²(θ/2) = 1, which needs λ ≥ 1/4 (Theorem 12.4).
  - At λ = φ⁻² the relative phase is e^(±3πi/5) (Corollary 12.5) and the transfer weights are keep φ⁻², flip φ⁻¹
    (Theorem 12.6).
  - K¹⁰ = I, while the step-by-step recorded chain has Tᵐ = ½(1 + rᵐ, 1 − rᵐ; 1 − rᵐ, 1 + rᵐ) with
    r = 2 − √5 = −φ⁻³, which tends to uniform (Proposition 13.1).
- **Triangulation and collapse (V18 §2–§4).**
  - Triangulating the base along 0–13 and coning to v₂ gives the endpoint κ₊; the diagonal 1–3 gives κ₋
    (Theorem 2.2).
  - The endpoint rules are not affine: the upper rule fixes δ₁ and δ₃ but sends ½(δ₁ + δ₃) to ½(δ₀ + δ₁₃), so no
    fixed channel performs them (Proposition 2.3).
  - A CPTP channel keeps N_x, N_y, N_z for all inputs exactly when Λ(ρ) = C ⊙ ρ with C ≥ 0 and C_ss = 1; it keeps
    every p_s but may change coherences (Theorem 3.2). With errors, ‖Λ†(NₓN_y) − NₓN_y‖ ≤ √εₓ + √ε_y
    (Corollary 3.3). Diagonal phase gates change the phase of Ω only (Proposition 3.4).
  - Calibrated to a given source, a two-outcome diagonal instrument returns the two endpoints with weights
    w± (Theorem 4.2). At p_s = 1/5, M₊ = diag(1, 0, 1/√2, 0, 1) and M₋ = diag(0, 1, 1/√2, 1, 0), each outcome with
    probability 1/2.
  - On the balanced base Z = 0, X = Y = 1/2, the even/odd measurement E = |0⟩⟨0| + |13⟩⟨13| gives Pr(E) = 2κ
    and realises both completions (Theorem 4.3). On |+⟩|+⟩ it gives Bell states instead.
- **Phases become gates (V18 §5–§6).**
  - V(|i⟩ ⊗ ψ) = Σ_j √T_ji |j⟩ ⊗ U_ji ψ ⊗ e_ji is an isometry exactly when
    Σ_j √(T_ji T_jk) ⟨e_ji, e_jk⟩ U_ji† U_jk = δ_ik I (Theorem 5.2); column normalisation checks only i = k.
  - F_W = (aI, bW; bW†, −aI) is Hermitian with F_W² = I (Proposition 5.3). A contraction A has the Halmos unitary
    completion J(A).
  - C_P(W) = (I − P) ⊗ I + P ⊗ W and L_P(W) = (I − P) ⊗ W + P ⊗ W² are unitary with lifted powers; C_P is
    multiplicative, while L_P(UV) = L_P(U)L_P(V) exactly when UV = VU (Theorem 6.2).
  - A global phase of W becomes the controlled relative phase (I − P + e^(iχ)P) ⊗ I (Theorem 6.3).
- **Which gates braid (V18 §7).**
  - With one shared W and 0 < λ < 1, the two lifts braid exactly when (W − I)[W + λ(W − I)²] = 0; at λ = φ⁻²
    this means spec W ⊆ {1, ζ, ζ̄}, ζ = e^(3πi/5) (Theorem 7.2).
  - The golden gate K = ζ(I − R₀) + ζ²R₀ has eigenvalue ζ², so L_P(K) is unitary with tenth power I but breaks the
    braid as a parameter (Corollary 7.3).
  - The controlled recursion closes: Wₙ = I + (ζ − 1)Eₙ with Eₙ = Pₙ ⊗ ⋯ ⊗ P₁ (Theorem 7.4). Also
    ζ(I − R₀) + ζ̄R₀ = ζ³K⁸.
- **Spectral hull (V18 §8).**
  - Tracing out the inner system leaves a parent channel that multiplies the coherence by m = Tr(σW)
    (Theorem 8.1), and 1 = |m|² + Tr[σ(W − m)†(W − m)] (Proposition 8.3).
  - m = 0 is reachable exactly when 0 ∈ conv spec W (Theorem 8.4).
  - In the golden braid class a one-step record needs all of 1, ζ, ζ̄, with unique weights φ⁻³, φ⁻², φ⁻² and
    minimal dimension 3 (Theorem 8.5). In general this needs 1/4 ≤ λ ≤ 1/2, with weights (1 − 2λ, λ, λ)
    (Corollary 8.6). The native pair {ζ, ζ²} keeps |m| ≥ cos(3π/10) (Proposition 8.7).
- **Resolve and return (V18 §9–§10).**
  - With fresh, pre-chosen records the cross coefficient is Γₙ = Π mⱼ, and the state decoheres exactly when
    Σ −log|mⱼ| diverges (Theorem 9.1).
  - Reusing one record gives mₙ = (ζⁿ + ζ²ⁿ)/2: |m₁| = cos(3π/10), m₅ = 0 and m₁₀ = 1, so the fifth use resolves
    and the tenth returns to the identity (Theorem 9.2).
  - ‖W_(n+1) − I ⊗ Wₙ‖ = |ζ − 1|, so the recursive gates have no norm limit, while
    Tr(ρ⁽ⁿ⁾Wₙ) = 1 + (ζ − 1)Π rⱼ → 1 (Theorem 9.3). Consistent cut states extend to one state (Theorem 10.3).

一部约七分半钟的片子，延续 AURIC 版本系列，覆盖第十七、十八两版：对数把乘法变成加法、加法变成 log-sum-exp；五个模式只有一条仿射关系，十个三角形中九个直角、一个等边；固定三个读出后剩下一条线段，其坐标是四角比的对数 η；散度在最大熵完成处满足勾股分解，量子相对熵再分出记录基相干；协方差行列式是单纯形体积平方之和，两个不相关的后验变化需要三个记录；纠缠恰分解为 sinh²(η/4) 与 sin²(Φ/2) 之和；Fibonacci 融合给出黄金三角与相位 e^(±3πi/5)。第十八版说明两种剖分对应纤维两端，固定通道做不到、标定仪器与偶奇测量可以做到；相位可提升为受控门，黄金编织只允许谱 {1, ζ, ζ̄}，一次记录需要三点谱凸包，复用同一记录在第五次分辨、第十次复归。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-089-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit V17 has no digestion records.
  - V18 has 56 atoms, all residual-open.
  - No Lean declaration covers any statement shown.
- **Published results, used as external inputs.** The KL scene, the golden-fusion line and the finale badge them as
  published; elsewhere they appear as on-screen credits.
  - Information projection and the KL Pythagorean identity: Csiszár–Shields, *Information Theory and Statistics:
    A Tutorial*, Found. Trends Commun. Inf. Theory 1(4), 2004, §3.
  - Exponential families and conjugate duality: Wainwright–Jordan, Berkeley TR 649, 2003.
  - The coherence decomposition: Baumgratz–Cramer–Plenio, PRL 113, 140401 (2014), arXiv:1311.0275.
  - Pure-state concurrence: Wootters, PRL 80, 2245 (1998), arXiv:quant-ph/9709029.
  - Fibonacci fusion, F and R matrices: Hadjiivanov–Georgiev, arXiv:2404.01778.
  - Instruments, Kraus and isometric representations: Watrous, *The Theory of Quantum Information* (2018), ch. 2.
  - No control of unknown operations: Araújo–Feix–Costa–Brukner, NJP 16, 093026 (2014), arXiv:1309.7976.
  - Halmos dilations: Robinson, arXiv:1803.09329.
- **Classical tools named in the volumes.** The log semiring and the Cauchy functional equation (badged as
  classical in the first scene), Cauchy–Binet (badged in the areas scene), Bayes' rule, Lüders measurement, Schur
  products, the spectral theorem and the second-order product formula e^(sA)e^(sB) − e^(s(A+B)) = (s²/2)[A, B] + O(s³).
- **Project inputs.** V17 proves its five-mode results in place; the same objects also appear in earlier project
  volumes it cites (pyramid foundational formulas, readout closure and record triangle, moment triangles,
  probability-phase transport). The film cites them by their V17 and V18 numbers. V18 §10 quotes the return
  probabilities B² + 4pq and A² + r² + 2pq of the minimal record dilation volume; only the algebra of their
  difference 2Ar + 2pq was rechecked here, and it is not shown.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (97 checks) recomputes the following with sympy exact
  arithmetic, numpy sampling and finite differences.
  - **Sum and product.** log is a semiring map on 200 random triples; 2 log 5 = 3.219 = log(e^2.197 + e^2.773)
    (exact in sympy); the Gibbs identity on 50 random cases; the squared-norm rules on 100 random vectors; one-phase
    additivity without orthogonality; the classical-channel isometry and its partial trace on 20 random channels.
  - **Five modes.** The augmented matrix has rank 4 with kernel (1, −1, 0, −1, 1); {1, x, y, z, xy} is independent;
    of the ten triangles nine are right and (v₁, v₂, v₃) has side² 2, 2, 2; p₀p₁₃ − p₁p₃ = Rκ − XY symbolically;
    the four natural parameters recover 50 random positive laws; at X = Y = 0.4, Z = 0.2 the endpoints are 0 and 0.4
    and κ* = 0.2.
  - **Information Pythagoras.** On 400 random laws: the KL split, the extra term −η_q(κ − κ*), the four-term
    split and D(p‖p*) = R I₀ = H(p*) − H(p), largest deviation 2.7 × 10⁻¹⁵. F′ = η by finite differences, the
    maximum at κ* = 0.2 with H = log 5, F″ = Σ 1/p and the fiber Bregman identity. For p = (.3, .1, .2, .1, .3)
    and q with Z′ = .3, u′ = .45, v′ = .55, the four terms are 0.1047, 0.0257, 0.0040, 0.0040, total 0.1384.
    The quantum three-term split on 200 random 5 × 5 density matrices, largest deviation 2.2 × 10⁻¹⁵.
  - **Directions and areas.** The orthonormal basis, the four-square variance identity and the Pearson formula on
    100 random laws; the Fisher metric at δ = 0 by finite differences; det Cov = (d!)² Σ (Π p) Vol² for d = 2, 3 on
    80 random point sets; the five-mode determinant symbolically; the record example gives mixture means
    (1/2, 1/2), joint occupation 1/4, area 1/8, variances 1/24 and 1/18, covariance 0 and det = 1/432, and the
    Bayes readout is valid; the two-outcome covariance formula on 50 cases.
  - **Log ratio and phase.** On 500 random amplitude vectors: both forms of |det M|², the C² formula,
    C² + ‖r‖² = 1 and |sinh(½ log Ω)|² = sinh²(η/4) + sin²(Φ/2), largest deviation 2.8 × 10⁻¹⁴; separable
    conditional states give Ω = 1; Ψ± give p_s = 1/5, η = 0 and C = 0, 1; C² = sin²(Φ/2) at uniform moduli;
    Ω is invariant under diagonal scaling; the Bayes and diagonal-Kraus updates of η and Ω on 100 cases each.
  - **Golden gate.** φ² = 1 + φ and 1/φ² + 1/φ = 1 exactly; F² = I, det F = −1; the braid relation holds at
    4λ sin²(θ/2) = 1 and fails for a shifted phase, for λ = 0.3, φ⁻², 0.6 and 0.9, with keep λ and flip 1 − λ;
    θ = 108° at λ = φ⁻²; no solution for λ < 1/4; K¹⁰ = I with K⁵ ≠ I; r = 2 − √5 = −φ⁻³ and the formula
    for Tᵐ for m = 0…12, T¹⁰ ≠ I; the three-state Gram inequality on 300 cases with equality in dimension two.
  - **Triangulation and collapse.** The non-affine images of ½(δ₁ + δ₃) and ½(δ₀ + δ₁₃); barycentric completions in
    the two split tetrahedra equal the two endpoints on 100 random laws; Schur channels keep N_x, N_y, N_z and all
    p_s on 50 cases; the near-stability bound on 300 random channels, largest ratio 0.40; the diagonal phase
    update of Ω; the endpoint instrument on 100 random laws and the p_s = 1/5 example; Pr(E) = 2κ on the balanced
    base; the Bell-state branches for |+⟩|+⟩; the record dilation is an isometry.
  - **Phases become gates.** The cross-column condition on 30 random kernels; F_W² = I and the Halmos completion on
    30 random cases; both lifts are unitary with lifted powers; C_P is multiplicative, L_P fails for random
    non-commuting pairs and ‖L_P(XZ) − L_P(X)L_P(Z)‖ = 2 for Pauli X, Z; the global-phase identities.
  - **Which gates braid.** With P, Q at overlap φ⁻²: spectra {1, ζ, ζ̄}, {ζ, ζ}, {1, 1, ζ̄}, {ζ, ζ̄} braid in both
    lifts, while {ζ, ζ²}, {1, −1}, {ζ, i} do not; the recursion Wₙ = I + (ζ − 1)Eₙ for n = 1…3 stays in the
    allowed spectrum and braids; ζ(I − R₀) + ζ̄R₀ = ζ³K⁸; L_P(K)¹⁰ = I.
  - **Spectral hull.** The parent channel depends only on m in both lifts and 1 = |m|² + Tr[σ(W − m)†(W − m)] on 30
    random cases; φ⁻³ + 2φ⁻² = 1 with zero moment; the three-level pointer is orthogonal to its image; no two of
    1, ζ, ζ̄ are antipodal; the weights (1 − 2λ, λ, λ) give m = 0 for λ ∈ [1/4, 1/2]; the endpoint cases; the
    bounds cos(3π/10) = 0.5878 and 1/(2φ) = 0.3090, also by sampling the chords.
  - **Resolve and return.** Γₙ = Π mⱼ for three fresh layers; mₙ = (ζⁿ + ζ²ⁿ)/2 with |m₁| = 0.5878, m₅ = 0 and
    m₁₀ = 1, also from the actual lifted unitary; C_P(W)¹⁰ = I; ‖W_(n+1) − I ⊗ Wₙ‖ = |ζ − 1| = 2 sin(3π/10) = φ at
    each of three steps; the product-state expectation; consistent partial traces.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The pyramid's ten-triangle table (side² and type).
  - The η(κ) curve and the entropy curve along the fiber X = Y = 0.4, Z = 0.2, and the moving p(κ) bars.
  - The four KL bars.
  - The 5 × 5 Gram table of the orthonormal basis.
  - The record triangle with its three points.
  - The C²(Φ) and ‖r‖² curves.
  - The braid-phase curve θ(λ) and the golden point.
  - The coherent keep probabilities |Kᵐ₀₀|² and the recorded chain Tᵐ₀₀.
  - The instrument bars for p_s = 1/5 and the Pr(E) = 2κ line.
  - The zero-moment weight curves (1 − 2λ, λ, λ).
  - The |mₙ| stems for n = 0…20 and the fresh-record decay 0.588ⁿ.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid with its two diagonals;
  - the semiring and channel chips;
  - the 3-4-5 squares and the direct-sum and tensor tiles;
  - the right-angle sketch of p, p* and q;
  - the coherence grid of a 5 × 5 state;
  - the phasor cells of M and the animated sinh–sin right triangle;
  - the golden right triangle (drawn to scale) and the F and T grids;
  - the unit circles with spectral points and hulls;
  - the two triangulated base squares;
  - the kernel edge diagram and the block and sector boxes;
  - the parent block matrix with an animated |m|;
  - the chain of fresh record boxes.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
