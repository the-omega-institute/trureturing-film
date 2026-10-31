# 099 · AURIC V37–V38 · BINARY RELATIONS, GOLDEN GATES AND COMPLETE PROCESSES · AURIC V37–V38 · 二元关系、黄金门与完整过程

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:27). It covers two volumes of
trureturing at subject commit `c7e66ea174`:
- `AURIC_BINARY_RELATIONS_UNITARY_REPRESENTATION_AND_GOLDEN_GATE_UNIVERSALITY_V37.md`, §2–§10 and §12–§14;
- `AURIC_COMPLETE_QUANTUM_PROCESSES_INTERNAL_MEMORY_AND_RANK_BOUNDARY_STABILITY_V38.md`, §2–§10.

Version thirty-seven represents every binary positive relation by a fixed five-mode code. The three native occupation
means of that code form a ball inside the five-mode pyramid, and all two-by-two unitaries act on it as rigid rotations.
The project's golden gate then approximates these gates to any precision, and the native seven-address carrier
compiles the code itself.
Version thirty-eight lifts the same code to complete quantum processes, coherent and classical records, internal
memory and a rank-conditioned bound on unknown record weights.

## The film, scene by scene

- **Binary relations (V37 §2, §6).**
  - A binary relation is G = (a, c*; c, b) with a = ‖u‖², b = ‖v‖², c = ⟨v, u⟩. Every nonzero positive G is
    (N/2)(I + r·σ) with N = Tr G > 0 and |r| ≤ 1, with r = (2 Re c, 2 Im c, a − b)/N; pure states give |r| = 1
    (Theorem 2.2). For example a = b = 1, c = 2 is not a relation: det G = −3.
  - Two pairs of vectors in one space are related by a common unitary exactly when all four inner products agree
    (Theorem 2.3). Normalising each state separately is not enough: T = diag(2, 1) followed by normalisation moves the
    overlap |⟨e₀, +⟩| from 1/√2 to 2/√5 (Proposition 2.4).
  - With a context, ρ = ½(I⊗S + σx⊗X + σy⊗Y + σz⊗Z) with operator axes (Theorem 6.2). The scalar ball rule does not
    carry over: for the Bell state, X² + Y² + Z² = ¾ I while S² = ¼ I.
  - Pairwise positivity is not global: three unit vectors with all overlaps −1 give 2 × 2 sub-tables that are all
    positive, but 1ᵀG1 = −3 (Proposition 6.5).
- **The fixed code (V37 §3).**
  - Five rank-one effects E₂₅ = (ν/2)(√3 I − σx − σy − σz), E₀ = 3E₂₅, E₂ = (ν/2)(√11 I + 3σx + σy + σz),
    E₅ = (ν/2)(√11 I + σx + 3σy + σz) and E₃ = ν(I + σz) sum to I, with ν = 1/(1 + 2√3 + √11) ≈ 0.12852
    (Definition 3.1).
  - A fixed isometry J into the five modes gives the three native occupation means u(ρ) = u₀ + νr, with
    u₀ = (a_ν, a_ν, ν) ≈ (0.3244, 0.3244, 0.1285). The Bloch ball becomes a ball inside the pyramid (Theorem 3.2).
  - Trace distance is D(ρ, σ) = ‖u(ρ) − u(σ)‖/2ν (Corollary 3.3).
  - Since E₀ = 3E₂₅, the five moments satisfy N − X − Y − Z − 2κ = 0. Any four determine the fifth, with
    |Δμᵢ| ≤ 2 Σ_(j≠i) |Δμⱼ| (constant ½ for κ), and two reconstructions differ by a vector obeying the same relation
    (Theorem 3.4).
- **Lifts and readout (V37 §4–§5).**
  - ι(U) = JUJ* + (I₅ − JJ*) is a faithful five-mode unitary representation of U(2), with ι(U)J = JU
    (Theorem 4.1). On the means, u(UρU*) = u₀ + R_U(u(ρ) − u₀) with R_U ∈ SO(3), a rigid rotation of the ball
    (Corollary 4.2).
  - The five-outcome measurement channel has no CPTP left inverse. The states (I ± σz)/2 are at distance 1, but
    their outcome laws differ by ν(−3, 1, 2, 1, −1), total variation 4ν ≈ 0.514 (Proposition 4.3).
  - A two-outcome instrument has the internal isometric record Vψ = |0⟩⊗M₀ψ + |1⟩⊗M₁ψ, and complete finite history
    trees satisfy Σ K_h*K_h = I (Theorem 5.1).
- **The golden gate (V37 §7.1–§7.2).**
  - K = ζ[I + (ζ − 1)P] with ζ = e^(3πi/5), P = n_L n_R + (1 − n_L)(1 − n_R)Q_C, Q = qq* and
    q = (φ^(−1/2), φ⁻¹). K is unitary, K⁵ = 2P − I, K¹⁰ = I, and K keeps the no-11 five-mode space (Theorem 7.1).
  - For projections with PQP = λP and QPQ = λQ, B_P B_Q B_P − B_Q B_P B_Q = s³t(1 + t + λt²)(P − Q). With λ = φ⁻²
    and t = z − 1 this gives z² + φ⁻¹z + 1 = 0, whose roots are e^(±3πi/5).
  - On the code |1 0 q 0 1 0⟩ the same gate at addresses b₀ and b₁ gives logical projections |1⟩⟨1| and Q.
    Tr(R_P R_Q) = 4 − 2√5, whose conjugate 4 + 2√5 exceeds 2, so the rotation has infinite order. The closure is
    {U ∈ U(2) : det U ∈ μ₁₀} (Theorem 7.2, restating project volume v15 §4).
- **Encoded universality (V37 §7.3, §8).**
  - With 4n + 2 sites, the legal carrier H_n has dimension F(4n − 1): 2, 13, 89, 610. Through the Jones–Wenzl
    correspondence and the Freedman–Larsen–Wang density theorem, native positive words approximate every encoded
    n-qubit unitary up to phase (Theorem 7.4).
  - On the thirteen-dimensional carrier with seven addresses, finite determinants and PU(13) density give
    SU(13) ⊆ closure (Lemma 8.1). Native words then compile the three-axis code: ‖K_w R − LJU‖ < ε with the code
    phase kept exactly (Theorem 8.2). The phase-balanced map G_U is a faithful homomorphism into SU(13)
    (Theorem 8.3).
  - Leakage outside the five modes is at most ε², the terminal total variation is at most ε, and
    |p₀ − 3p₂₅| ≤ 4ε (Corollaries 8.4–8.5).
- **Error series and probability (V37 §9–§10).**
  - If ‖V_j − U_j‖ ≤ ε_j and Σ ε_j < ∞, the relative gate C_n = A_n*B_n converges to a unitary, with
    ‖C_∞ − C_n‖ ≤ Σ_(j>n) ε_j, even when A_n and B_n do not converge. The increments obey
    C*Δ + Δ*C + Δ*Δ = 0 (Theorem 9.1).
  - In the 89-dimensional carrier three fixed old-terminal events have ranks 34, 21 and 34, and one native word covers
    any three effects at once (Theorem 10.1).
  - With cross-program matching, probability becomes a normalised additive function on effects (Proposition 10.2).
    The frozen Lean theorem `effect_density_representation` states that such a function is Tr(ρE) for exactly one
    density matrix ρ.
- **No stochastic update (V37 §12–§14).**
  - A fixed column-stochastic T with T p(ρ) = p(UρU*) for every qubit state exists exactly when U is a scalar phase.
    The feasible T then form the family T(t), mixing outcomes 0 and 25, with 0 ≤ t ≤ 1/3 (Theorem 12.2).
  - For the golden phase gate U⋆ = diag(ζ, ζ²) and the three pure targets ρ₀, ρ₁, ρ_d, every such T has
    e₀ + e₁ + 4e_d ≥ ν√11 ≈ 0.4263 and max_j e_j ≥ δ = ν√11/6 ≈ 0.07104 (Theorem 13.2).
  - On the full 1024-label terminal, max_j r_j(K) ≥ δ − max_j d_j (Theorem 14.2). With compilation errors α < δ/8
    and β < δ/4 the margin exceeds δ/2 (Corollary 14.3).
- **Complete processes (V38 §2–§5).**
  - A Hermitian-preserving, trace-preserving Φ acts on the Bloch ball as r ↦ Tr + t, and on the moments
    (N, X, Y, Z, κ) as a real 5 × 5 matrix. That matrix keeps ℓ = N − X − Y − Z − 2κ, sends the identity to I₅ and
    composes exactly (Theorem 3.2).
  - Φ is CPTP exactly when its Choi matrix is positive, and the Kraus rank is rank C_Φ ≤ 4 (Theorem 3.4, the
    standard Choi–Kraus form). Unitary processes are the rank-one case, t = 0 and T ∈ SO(3) (Corollary 3.5).
  - Shrinking the ball is not enough: Φ_λ(X) = λXᵀ + (1 − λ)Tr(X)I/2 is a strict contraction for 1/3 < λ < 1, but
    its Choi matrix has eigenvalue (1 − 3λ)/4 < 0.
  - Four tetrahedral inputs give twelve means, and t = ¼ Σ s_a, T = ¾ Σ s_a r_aᵀ recover the process. Three fixed
    inputs never suffice for general CPTP maps (Theorem 4.1).
  - The parameter error satisfies ‖δt‖² + ⅓‖δT‖²_F = Σ‖e_a‖²/4ν². After projecting the whole table onto CPTP
    tables, sup_ρ D ≤ E/2ν and the reference-stable distance is at most √3E/2ν (Theorem 4.2).
- **Record codes (V38 §6–§7).**
  - A code with F*Π_sF = E_s ⊗ I_r exists exactly when every readout sector has rank at least r, so 5r dimensions
    are needed and suffice (Theorem 6.2).
  - In thirteen dimensions the sectors have ranks (3, 3, 3, 2, 2), so two records fit. In eighty-nine dimensions they
    have ranks (21, 21, 21, 13, 13). There a twenty-path code F = L₈₉(J ⊗ I₄) keeps four records on the old ten-bit
    terminal, with F*N_wF = E_s ⊗ |a⟩⟨a| (Theorem 6.3). Final five-probability laws alone already fit in thirteen
    dimensions (Proposition 6.4).
  - A coherent record has a CPTP left inverse (Theorem 7.1). With a classical label, every input can be recovered
    exactly when K_a*K_a = p_a I, that is, every nonzero branch is a scaled unitary (Theorem 7.2).
- **Autonomy and memory (V38 §8–§9).**
  - If a global unitary updates the system through its marginal alone, for all joint states, then U = W ⊗ V
    (Theorem 8.1). A controlled-not fails: |+⟩|0⟩ leaves the system mixed and |+⟩|+⟩ leaves it pure, from the same
    marginal.
  - A fixed finite unitary with a fixed memory state cannot represent a strictly contracting semigroup Φᵐ for all m,
    because powers U^(m_k) return to I (Theorem 8.3).
  - The contraction coefficient is η = ‖T‖_op, and errors obey e_m ≤ ηᵐe₀ + δ(1 − ηᵐ)/(1 − η)
    (Proposition 9.1).
- **Rank boundary (V38 §10).**
  - In the two-setting contract with golden mixing B and β = |B₀₀B₁₀| = φ^(−3/2) ≈ 0.4859,
    ‖A_B − A_I‖ ≤ η gives |m_Si − t_Si| ≤ min{1, η/4βκ}, where κ = λ_min(X*X) (Theorem 10.2).
  - κ = (1 − |r_G|)/2 = (ν − ‖u_G − c‖)/2ν, the radial margin to the surface of the AURIC ball (Corollary 10.3).
  - No uniform bound exists without κ. Near rank one the isolation error is ε√(1 − ε²) → 0, while |m_I0 − t_I0| = ½
    for every ε (Theorem 10.5).
  - With a modulus ω(τ) ≤ Lτ, |m₀ − t₀| ≤ (L + 1/4β)η^(1/3) + η^(2/3) for 0 < η ≤ 2^(−3/2) (Theorem 10.6).

一部约七分半钟的片子，延续 AURIC 版本系列：第三十七版把每个非零二元正关系写成尺度加 Bloch 球中的一点，并用一个固定的五模式编码让三个原生占据均值构成金字塔内的一个球（ν = 1/(1 + 2√3 + √11) ≈ 0.129）；五个矩满足 N − X − Y − Z − 2κ = 0，任意四个确定第五个；每个 2×2 酉都忠实提升为五模式酉，在球上是刚性旋转，而五个经典结果的分布只相差 4ν ≈ 0.51，无法逆转；黄金门 K = ζ[I + (ζ − 1)P] 在两个地址上生成全部行列式为十次单位根的逻辑酉，依 Freedman–Larsen–Wang 稠密性定理推广到 F₄ₙ₋₁ 维的编码载体，并在十三维七地址载体上以精确相位编译三轴编码；可求和的误差使相对门收敛，冻结的 Lean 定理把可加的效果概率写成唯一密度矩阵的迹；固定的随机矩阵只能承载标量相位，对黄金相位门至少偏差 δ ≈ 0.071。第三十八版把编码提升到完整过程：5×5 矩阵、Choi 判据、四面体四输入与精确误差恒等式；读口扇区的秩决定能保留多少记录，八十九维中的二十路径码在旧十位终端上保留四个；经典分支可恢复当且仅当每个分支是标量乘酉；对所有联合态自治的酉必是乘积，固定有限记忆不能永远严格收缩；最后，记录权重的偏差至多 η/(4βκ)，κ 是到 AURIC 球面的径向余量，没有它就没有一致界。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-099-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One is used.
  - `D5/S3/Quantum/Foundation/EffectProbabilityExtension`, theorem `effect_density_representation`, has a frozen
    state file at the subject commit (`Golden/Frozen/state/D5/S3/Quantum/Foundation/EffectProbabilityExtension.lean.json`).
  - Its statement is that a probability on effects that is nonnegative, additive whenever E + F ≤ I, and equal to 1
    on I is Tr(ρE) for exactly one density matrix ρ. The Lean sentence of the series scene states this and carries the
    lean badge.
  - V37 §10 cites this theorem and says its formal application was not executed. The volume's own use of it (with
    cross-program matching and ready calibration) stays badged as theory.
  - V38 §4–§5 cite the frozen `FinitePreparationChannel` theorems (state file present at the subject commit). The film
    does not show them.
  - Neither volume is in the digestion ledger: at the subject commit there is no directory under
    `Meta/Digestion/backfill/` for either volume, so the ledger does not link these theorems to the volumes. No Lean
    declaration covers any other statement shown.
- **Published results, used as external inputs.** The encoded-universality scene and the finale badge it as published.
  - Freedman–Larsen–Wang, *The two-eigenvalue problem and density of Jones representation of braid groups*,
    arXiv:math/0103200, Theorem 0.1 and the explicit Jones–Wenzl representation of §2.
- **Classical tools named in the volumes.** The Choi sentence of the process scene and the finale badge them as
  classical.
  - The Choi–Kraus representation (Watrous, *The Theory of Quantum Information*, §2.2.2, Theorems 2.22 and 2.26).
  - The positivity step of rank-one smearing (Haapasalo–Pellonpää, arXiv:1705.03636, §2).
  - The volumes also cite, without the film relying on them: Nielsen–Chuang programmable gate arrays
    (arXiv:quant-ph/9703032), Theurer–Egloff–Zhang–Plenio (arXiv:1806.07332) and Yashin et al. (arXiv:2006.13727).
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the golden gate and two-address universality of v15 §4 (Theorem 7.2 restates them; the finite parts are
    recomputed below);
  - the thirteen-dimensional Jones–Wenzl correspondence and density of continuation II §77, and the 89-dimensional
    coverage and matching of continuation II §§121–125;
  - the future-quotient condition of v22 §8, behind V38 §8.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, scipy, sympy, cvxpy with Clarabel) runs 34 928
  checks:
  - **Relations.**
    - G = (N/2)(I + r·σ) is positive exactly when |r| ≤ 1, on 400 random cases.
    - a = b = 1, c = 2 has det −3.
    - Equal Gram tables give a common unitary on 100 random pairs.
    - The overlap moves from 0.7071 to 0.8944 = 2/√5.
    - Bell-state axes give ¾ I versus ¼ I.
    - The all-(−1) table has quadratic form −3 with every 2 × 2 minor positive.
  - **Code.**
    - ν = 0.128523, a_ν = 0.324435. The five effects are rank one and sum to I, and J*J = I.
    - u = u₀ + νr holds on 600 random states, and the distance rule on 300 pairs.
    - N − X − Y − Z − 2κ = 0 and w₀ = 3w₂₅ hold on 400 random relations, with the four-of-five constants 2 and ½.
  - **Lifts.**
    - ι(U) is unitary and multiplicative and R_U ∈ SO(3), with the rigid-rotation formula on 200 random gates.
    - Δp = ν(−3, 1, 2, 1, −1), so TV = 4ν = 0.51409.
  - **Golden gate.**
    - On three sites: K¹⁰ = I, K⁵ = 2P − I, and K keeps the five legal strings. The braid identity holds and its roots
      are e^(±3πi/5).
    - On the six-site code: K_P = diag(ζ, ζ²), Tr(R_P R_Q) = 4 − 2√5, and 4 − 2√5 has minimal polynomial x² − 8x − 4.
      The rotation angle is θ/π = 0.575859.
    - Positive words in K_P and K_Q reach projective distance 0.0519 to the Hadamard gate by length 18.
  - **Carriers.**
    - The dimensions are 2, 13, 89 and 610, equal to F(4n − 1).
    - The 13- and 89-dimensional carriers are closed under 7 and 11 addresses, with braid and far-commutation
      relations.
    - The Lie algebra of the 13-dimensional projectors has dimension 169 = dim u(13), and the 89-dimensional carrier
      is irreducible.
    - The Jones–Wenzl entries are 1, 0, φ⁻¹, φ⁻² with off-diagonal φ^(−3/2), and [K_j, D_i] = 0 on the full ten-site
      register.
  - **Compilation.**
    - L*n L = N_x, N_y, N_z and the five labels match (14.1).
    - S_U ∈ SU(13) with S_U R = LJU, while the naive extension is not unitary.
    - G_U is a homomorphism into SU(13).
    - Leakage ≤ ε², |p₀ − 3p₂₅| ≤ 4ε and TV ≤ ε hold on 200 perturbed implementations.
  - **Series.**
    - With five dimensions, 60 random gates and ε_j = 0.3 · 0.7^(j−1), the tail stays below the bound and the exact
      relation C*Δ + Δ*C + Δ*Δ = 0 holds. ‖A_n − A_(n−1)‖ stays above 0.3 from step 20 on.
    - The projected readout bound holds on 500 cases.
    - The 89-dimensional ranks are 34, 21 and 34.
  - **No stochastic update.**
    - T(t) fixes p for t = 0, 1/6 and 1/3, and t = 0.34 is infeasible.
    - For z-rotations the best stochastic residual is zero only at θ = 0 and 2π (41 conic programs), and it is
      positive for random gates.
    - |m| = 1, and every nₜ·m < ½.
    - The LP optimum of max_j e_j is 0.2345 ≥ δ = 0.07104, and of e₀ + e₁ + 4e_d it is 0.6415 ≥ ν√11 = 0.4263.
    - The bound holds on 2000 random stochastic matrices and on six random 1024-label kernels.
  - **Processes.**
    - On 200 random channels: the moment matrix keeps ℓ on all of ℝ⁵, composition is the matrix product, the Choi
      formula holds, and rank C ≤ Kraus number.
    - Unitaries have Choi rank 1, t = 0 and T ∈ SO(3).
    - The Φ_λ Choi minimum is (1 − 3λ)/4 for λ ≥ 0, and its Bloch action is λ·diag(1, −1, 1).
    - The tetrahedral recovery and the exact error identity hold on 100 channels.
    - An explicit pair Φ_dep ± 0.05Δ is CPTP and agrees on three inputs.
    - On 24 noisy tables projected onto CPTP tables by SDP, the single-system distance is at most 0.88 E/2ν, and the
      half-diamond distance (Watrous SDP) is at most 0.51 √3E/2ν.
  - **Records.**
    - The sector ranks are (3, 3, 3, 2, 2) and (21, 21, 21, 13, 13).
    - All twenty paths are legal and their ten-bit prefixes are distinct.
    - F*Π_sF = E_s ⊗ I₄ and F*N_wF = E_s ⊗ |a⟩⟨a|, and the 13-dimensional A of Proposition 6.4 works on 30 random
      channels.
    - The coherent left inverse holds.
    - Under amplitude damping with classical labels, the best recovery fidelities are 1, 0.933, 0.854, 0.750 and
      0.500 for γ = 0, ¼, ½, ¾ and 1 (SDP). Random-unitary branches give 1.
  - **Memory.**
    - Controlled-not: I/2 versus |+⟩⟨+|.
    - For a random U on 2 × 2 the one-step contraction is 0.831, yet D_m returns to 0.996 between m = 200 and 400.
    - The geometric error series holds on 50 sampled runs.
  - **Rank.**
    - B is unitary and β = 0.48587.
    - On 3000 sampled contracts, Theorem 10.2 and the finer initial bound hold (largest observed ratio to the bound
      0.974), as do κ = (1 − |r_G|)/2 and the three-witness identity.
    - The counterexample has κ = ε², isolation error ε√(1 − ε²) and deviation ½ on 40 values of ε.
    - The bridge bound is 0.161 at L = 1, η = 10⁻³.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The 140 state means inside the ball.
  - The Δp bars.
  - The golden rotation powers and the word-length curve.
  - The carrier dimensions.
  - The tail, bound and step dots.
  - The 34/21/34 bars.
  - The stochastic-residual curve and the LP bars.
  - The Choi-eigenvalue curve and the 24 fit points.
  - The sector-rank bars and the twenty prefixes.
  - The recovery fidelities.
  - The recurrence dots with the ηᵐ curve.
  - The sampled bound ratios and the rank-one counterexample curves.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the two vectors and the Bloch sphere;
  - the bar heights of the Bell example;
  - the triangle of overlaps;
  - the history tree;
  - the unit circle with the eigenvalues of K;
  - the Jones–Wenzl cells and the thirteen string cells;
  - the moment-matrix grid;
  - the tetrahedron;
  - the controlled-not circuits;
  - the ball cross-section with its margin arrow.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
