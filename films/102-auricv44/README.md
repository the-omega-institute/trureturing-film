# 102 · AURIC V44–V46 · BOUNDARY ATLASES, SQUARED PROBABILITIES AND ERROR GEOMETRY · AURIC V44–V46 · 边界图册、平方概率与误差几何

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:29). It covers two volumes of
trureturing at subject commit `a2e0a6bcc0`:
- `AURIC_BOUNDARY_EXTENSION_AND_HIGHER_DIMENSIONAL_RELATIONAL_ATLAS_V44.md`, §1–§13 (with the unified Theorem 14.1 in
  the finale);
- `AURIC_LOG_RECURSION_SQUARED_PROBABILITIES_AND_ENDOGENOUS_ERROR_GEOMETRY_V46.md`, §1–§11 (with the synthesis of §12
  in the finale).

Version forty-four rebuilds the inside of a body or a state from its boundary: a cone over a sphere, a Poisson average
of boundary states, an effective boundary metric and iterated Cauchy integrals. Higher-dimensional states then become
an atlas of complex ratios and two-by-two blocks that must agree around cycles and pass a singular Schur test.
Version forty-six asks what selects squared probabilities. Normalisation alone does not, multiplication gives powers,
and orthogonal refinement with a retained readout fixes the exponent two. Errors then follow the same geometry:
square residual series, unitary conservation and the limits of descent.

## The film, scene by scene

- **Star bodies (V44 §2–§3).**
  - S(x) = (2x, 1 − ‖x‖²)/(1 + ‖x‖²) is a real-analytic bijection from ℝⁿ⁻¹ onto the sphere minus the south pole,
    with inverse x = (u₁, …, uₙ₋₁)/(1 + uₙ), for every n ≥ 2. At n = 3 it is the Bloch lift (Theorem 2.1).
  - A continuous positive radius R on Sⁿ⁻¹ fills K_R = {tR(θ)θ}, homeomorphic to the cone (Sⁿ⁻¹ × [0, 1])/(Sⁿ⁻¹ × {0}),
    with boundary {R(θ)θ} (Theorem 2.2). If ‖R − R′‖∞ ≤ ε, both the bodies and their boundaries are within Hausdorff
    distance ε; concentric spheres attain it (Corollary 2.3). The ray map is differentiable at the centre only for
    constant R.
  - The density body D_d has dimension d² − 1, and its boundary is exactly the rank-deficient states. Every ρ ≠ I/d is
    uniquely (1 − t)I/d + tB with t = 1 − dλ_min(ρ) and B on the boundary (Theorem 3.2). The radius along a traceless
    unit direction U is −1/(dλ_min(U)), so D_d is a topological ball. Purity is Tr ρ² = 1/d + t²(Tr B² − 1/d).
  - Pure states make up the whole boundary exactly when d = 2; diag(½, ½, 0) is a rank-two boundary state (Corollary
    3.3). The film's example: spectrum (0.5, 0.3, 0.2) gives t = 2/5 and B = (3/4, 1/4, 0).
- **Poisson filling (V44 §4).**
  - P_n(x, ξ) = (1 − ‖x‖²)/‖x − ξ‖ⁿ is positive and harmonic with total mass one (Proposition 4.2).
  - For a continuous boundary field g of density matrices, ρ_g(x) = ∫P_n(x, ξ)g(ξ)dσ(ξ) is a state, harmonic entry by
    entry, with boundary value g. It is the unique such extension, and sup‖ρ_g − ρ_h‖ ≤ sup‖g − h‖ in any fixed matrix
    norm (Theorem 4.3).
  - ker ρ_g(x) = ∩_ξ ker g(ξ) at every interior point (Proposition 4.4).
  - Pure qubit boundary states g(ξ) = ½(I + ξ·σ) fill the Bloch ball exactly: ρ_g(x) = ½(I + x·σ), or
    ρ(t, w) = ½(I + tS₂(w)·σ) (Corollary 4.5).
  - The radial maps satisfy P_rP_s = P_rs and ‖P_r‖ ≤ 1, so fresh errors add: e_m ≤ e₀ + Σηₖ (Proposition 4.6).
  - Boundary values alone are no rule: 0 and 1 − ‖x‖² agree on the sphere.
- **Inward, not outward (V44 §5–§6).**
  - For a finite Hermitian L split into boundary and interior blocks and λ ∉ spec L_II, the eigen-equation is
    equivalent to K_eff(λ)g = λg with x = −R_λL_IB g. The interior norm is pulled back:
    ‖g‖² + ‖x‖² = g†Gg with G = I − K_eff′(λ) ⪰ I (Theorem 5.1, restating V24 Theorem 8.3). The reconstruction has
    gain at most √(1 + ‖L_IB‖²/γ²); L = λI₃ hides e₂ and e₃ from the boundary.
  - On the polydisc, iterated Cauchy integrals over the torus Tᵐ reconstruct F, and sup over the closed polydisc of
    |F − H| is at most its sup over Tᵐ (Theorem 6.1).
  - One slice does not decide a new variable: f(z₁) + z₂H(z₁, z₂) all agree on z₂ = 0 (Proposition 6.2). The boundary
    function ζ̄ has a harmonic but no holomorphic extension.
  - Outward continuation is unstable: f_N = (z/b)ᴺ has sup (a/b)ᴺ → 0 on |z| ≤ a but f_N(b) = 1 (Proposition 6.3).
- **Ratio and block atlas (V44 §7–§8).**
  - Dividing by a common reference amplitude gives d − 1 complex ratios w_j. Each conditional two-level state has
    Bloch point S₂(w_j), and these labelled points determine the ray in CPᵈ⁻¹ (2d − 2 real dimensions). Charts change
    by w_j(ℓ) = w_j(k)/w_ℓ(k) (Theorem 7.2).
  - With a maximal-modulus reference, ½‖ρ − ρ′‖₁ ≤ 2(Σ‖n_j − n′_j‖²)^½ (Proposition 7.3).
  - Ratios on a connected graph come from one state exactly when every directed cycle multiplies to 1; the ray is
    then unique (Theorem 7.4).
  - All labelled two-by-two principal blocks determine ρ: ρ = Σ ι_ij B_ij ι_ij† − (d − 2)diag(p), with
    Σ N_ij = d − 1 (Theorem 8.1). Σ‖ΔB_ij‖² = ‖Δ‖² + (d − 2)Σ|Δ_ii|², so the block errors bound the global error from
    both sides, and ‖ΔB‖² = ((ΔN)² + ‖Δv‖²)/2 (Theorem 8.2). The blocks are amplitude channels, not two-body
    reductions: the GHZ states with ± signs share all two-body reductions but differ on the 000/111 block.
- **Local versus global (V44 §9, §11).**
  - M = ⅓[[1, −1, −1], [−1, 1, −1], [−1, −1, 1]] has trace one and positive two-by-two blocks, each with conditional
    Bloch point (−1, 0, 0), but Mv = −v/3 for v = (1, 1, 1). Its ratio cycle multiplies to −1. With off-diagonal −a,
    ½ < a < 1, the blocks are strictly positive and the eigenvalue is (1 − 2a)/3 < 0 (Proposition 9.1).
  - M = [A b; b† c] ⪰ 0 exactly when A ⪰ 0, b ∈ Ran A and s = c − b†A⁺b ≥ 0, with rank M = rank A + 1[s > 0]
    (Theorem 9.2). For the example, Ran A = span(1, −1) and b = −(1, 1)/3 is not in it.
  - With a context, ρ = ½(I⊗S + σx⊗X + σy⊗Y + σz⊗Z) (V37 §6). The scalar ball rule does not carry over: for the Bell
    state Φ⁺, X² + Y² + Z² = ¾I while S² = ¼I. An m-qubit carrier keeps 4ᵐ − 1 real parameters.
- **Codes and margins (V44 §10, §12–§13).**
  - V_d = Σ|ij⟩⊗K_ij with K_ij = (|0⟩⟨i| + |1⟩⟨j|)/√(d − 1) is an isometry. Decohering the labels gives the instrument
    E_d(ρ) = ⊕B_ij/(d − 1), with label probability N_ij/(d − 1), whose output still determines ρ (Theorem 10.1).
  - For d > 2 there is no CPTP left inverse: (e₁ ± e₂)/√2 are at trace distance 2 but their outputs are at 2/(d − 1)
    (Theorem 10.2).
  - With the V37 five-mode code J, W_d = (I⊗J)V_d is an isometry and the conditional axes are u_ij = u₀ + νr_ij,
    ν = 1/(1 + 2√3 + √11) (Corollary 10.3).
  - A map from an open set of ℝᵏ into ℝ³ with two-sided Lipschitz bounds forces k ≤ 3 (Theorem 12.1). Mixed states
    need d² − 1 parameters and pure charts 2d − 2.
  - Recursive steps keep their margins: e_m ≤ (∏C_j)e₀ + Σηₖ∏_(j>k)C_j (§13). The project's RRO source face has
    δ_u T ≤ N_u ≤ T with optimal constant 1/δ_u (shown on screen as a project input).
- **Why squares (V46 §2–§3).**
  - Normalisation alone does not select |α|²: every power p normalises (Proposition 2.2). Three linear readouts cannot
    recover a d > 2 density matrix.
  - The logarithm turns products into sums and sums into log-sum-exp. A continuous multiplicative weight is a power
    r^p, and p > 0 if it vanishes at zero (Theorem 3.1). ℂ^× has no continuous logarithm.
  - If splitting a branch into two orthogonal records must keep every untouched readout probability, then w(r) = cr²,
    with no continuity assumed (Theorem 3.3). One equal split alone gives 2^(1 − p/2) = 1, so p = 2.
  - Example: a = (1/√2, 0, 1/√2) and a′ = (½, ½, 1/√2) differ by a unitary on the first two coordinates. Under the
    p-power rule the third probability moves from ½ to 1/(1 + 2^(1 − p/2)); the two are equal only at p = 2
    (Proposition 3.4). With two branches only, f(s) = s²/(s² + (1 − s)²) also normalises.
- **Native Born selection (V46 §4).**
  - The native carrier has the 89 subsets of {1, …, 9} with no two neighbours. In the full continuous density class
    C_nat (nonnegative, normalised, ray-invariant, nodal, every support component of the eleven address Hamiltonians
    conserved), the retained-read relation R holds exactly for the Born density |z_q|²/‖z‖² (Theorem 4.1, which is
    continuation III Theorem 173.2).
  - R alone allows every power p. On an equal-amplitude block with one blocked bystander the active mass moves from ½
    to 2^(1 − p/2)/(1 + 2^(1 − p/2)), so only p = 2 conserves components (Proposition 4.2).
  - For the older non-Born families b + εcH, the ninth-bit record I and the terminal W keep both marginals, but the
    joint law differs from the projected one by TV = 16εH (Proposition 4.3).
- **Log–Bloch (V46 §5–§6).**
  - Writing z = β/α = e^(u + iθ), the Bloch vector is (sech u cos θ, sech u sin θ, −tanh u) and log(p₁/p₀) = 2u
    (Theorem 5.1). For a mixed relation the first two axes carry an extra γ and 1 − |r|² = (1 − γ²)sech²u
    (Proposition 5.2). A general gate acts by the Möbius map z′ = (u₁₀ + u₁₁z)/(u₀₀ + u₀₁z).
  - On a binary tree, leaf weights sum to one and log|A_ℓ|² = 2Σ log|c_e|, so depth never turns the exponent into 2ⁿ
    (Theorem 6.1).
  - With records, the weight is Σ A_hA_k*⟨r_k, r_h⟩: identical records give |ΣA_h|², orthogonal
    records Σ|A_h|² (Proposition 6.2).
- **Residual series (V46 §7–§8).**
  - The residual of a reading q for a target f is the set of pairs with equal reading and different target. A real new
    reading r cuts it to E(q; f) ∩ ker r; a post-processed reading cuts nothing (Theorem 7.2). In the film's example,
    16 ordered pairs drop to none.
  - Projection gives ψ = m + e with ‖ψ‖² = ‖m‖² + ‖e‖², and U = P⊗I + Q⊗X is a unitary that keeps both result and
    remainder in internal records (Theorems 7.3–7.4).
  - For nested closed subspaces, ‖e_n‖² − ‖e_(n+1)‖² = ‖d_n‖², and ‖ψ‖² = ‖P₀ψ‖² + Σ‖d_n‖² + ‖(I − P_∞)ψ‖²
    (Theorem 7.5). The film's data: ψ = |x| on [−1, 1] with polynomial spaces gives 2/3, 1/6, 1/96, …
  - Conditional expectations obey the same law: E|Y − m_n|² − E|Y − m_(n+1)|² = E|m_(n+1) − m_n|² (Theorem 8.3).
  - On screen: a static recursion x = b + Ax with nilpotent A is the unique minimiser of a strictly convex residual,
    yet J(x) = ½ while J(Ax) = M²/2 (Theorem 8.1); and the Gibbs identity
    E_P C + τD(P‖Q) = −τ log Z + τD(P‖P*) (Theorem 8.2).
- **Error geometry (V46 §9–§11).**
  - A common unitary keeps an error's norm, and faulty gates add at most Σ‖U′_n − U_n‖ (Theorem 9.1). Repeated X gives
    a two-cycle.
  - Conditioning is not uniformly stable: ‖M/s − N/t‖₁ ≤ (ε + |s − t|)/max(s, t) ≤ 2ε/max(s, t), and η|0⟩⟨0| versus
    η|1⟩⟨1| differ by 2η before normalising and by 2 after (Proposition 9.2).
  - A strictly shrinking error e_(n+1) = λ_n e_n gives a clock τ_n = −log(e_n/e₀), but a reversible cycle orders events
    with no error decrease (Proposition 10.2).
  - The geodesic ψ(s) = cos s|0⟩ + sin s|1⟩ = e^(−isσy)|0⟩ raises the loss sin²s (Theorem 11.1). Imaginary-time flow
    lowers ⟨H⟩ at rate −2Var(H) but is nonlinear (Proposition 11.2). The golden gate has K¹⁰ = I, so no function
    decreases strictly at every gate.

一部约七分半的片子，AURIC 版本系列的第四十四、四十六版：先在任意维数用逆立体投影和锥填充得到星形体，态体的边界恰是全部降秩态；Poisson 核把边界态场向内延拓为唯一、正、迹一且不放大误差的态场，纯量子比特边界恰好填满 Bloch 球；向内的 Schur 消元把内部范数变成边界度量 G ⪰ I，多复变量的 Cauchy 积分向内稳定、向外不稳定；高维纯态用复比值图册、混态用全部二阶主块重建，局部合法还须通过闭环与奇异 Schur 检验；相干标签给出等距编码，去相干后 d > 2 没有 CPTP 逆，三维中的一个点也承载不了更多自由度。第四十六版说明归一化选不出平方，乘法给出幂，正交细化与保留读出才确定指数二；项目原生 89 路径载体上 R 关系恰好选出 Born 规则；对数比给出 Bloch 三轴，递归沿树传递平方；残差构成平方级数；共同的酉演化保持误差，条件化不一致稳定，测地线和黄金门都不提供普遍的下降方向。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-102-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit neither volume has a directory under `Meta/Digestion/backfill/`, so neither is ingested and
    no atom is covered.
  - No Lean declaration covers any statement shown.
- **Published results.** None is used as an input. V46 cites Goyal–Knuth–Skilling (Phys. Rev. A 81, 022109,
  arXiv:0907.0909) and Busch (Phys. Rev. Lett. 91, 120403, arXiv:quant-ph/9909073) only to place its argument; the film
  does not rely on them.
- **Classical tools named in the volumes.** The star-body, Poisson, Cauchy and Schur sentences and the finale badge
  them as classical.
  - Stereographic projection and the standard density-operator model (Watrous, *The Theory of Quantum Information*,
    §2.1.2).
  - The scalar Poisson kernel and Dirichlet uniqueness (UC Berkeley complex-analysis Lecture 7). V44 proves the
    ball and matrix-valued versions itself; those stay badged as theory.
  - The iterated Cauchy formula on the polydisc (Chakrabarti, MSRI 2018 Lecture 2, Theorem 2.2).
  - Projective charts of CPᵈ⁻¹ (Ilmanen, ETH Differential Geometry I, Sheet 10), the Moore–Penrose Schur complement
    criterion and the additive Cauchy functional equation.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - V24 Theorem 8.3 and Corollary 8.4 (Schur boundary reconstruction and effective metric);
  - V37 §3 and §6–§7 (the five-mode code, operator-valued axes, the unnormalised Proposition 6.5 example and the golden
    gate K¹⁰ = I);
  - the quantum-principles volume §27.1 (cross contraction C = A^½TB^½);
  - RRO native terminal §§18–21 (δ_u T ≤ N_u ≤ T, C_opt = 1/δ_u, and the prefix family with δ_u → 0);
  - continuation III §§173–176 (Theorem 173.2, the native Born selection, using its §144 group supply, and the
    16εH witness);
  - V16, V17, V24, V35 and V41 for the log semiring, Gibbs identity, conditional expectation, static recursion, the
    error budget and normalisation stability; and the self-calibrating synthesis §25 (Proposition 25.2).
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, scipy, sympy) runs 22 877 checks. These are
  sampled and finite checks, not proofs:
  - **Star bodies.**
    - The inverse stereographic map has unit norm and the stated inverse for n = 2 … 6, and equals the Bloch lift at
      n = 3.
    - For a three-lobed radius and a perturbation with sup difference ε = 0.12, the sampled Hausdorff distance is
      0.108 for both the bodies and the boundaries; concentric circles attain ε.
    - The radial decomposition, the purity formula and R(U) hold on 400 random states with d = 2 … 5. The example
      (0.5, 0.3, 0.2) gives exactly t = 2/5, B = (3/4, 1/4, 0) and Tr ρ² = 0.38.
  - **Poisson.**
    - On S² (Gauss–Legendre quadrature) the kernel mass is 1 to 8 × 10⁻¹⁵ and ∫Pξ dσ = x to 1 × 10⁻¹⁴, so the Bloch
      fill is exact. The kernel is harmonic for n = 2, 3, 4.
    - On the disc, matrix-valued extensions of random boundary fields are states. The interior operator-norm error is
      0.066 against a boundary error of 0.106 (d = 2) and 0.066 against 0.115 (d = 3).
    - The common-kernel example has kernel e₃, and P_rP_s = P_rs holds on 10 random trigonometric fields.
  - **Inward.**
    - On 196 random 5 × 5 cases: K_eff g = λg, ‖g‖² + ‖x‖² = g†Gg, G = I − K_eff′ (finite differences), G ⪰ I and the
      gain bound. In the screen example λ = 1.6936, ‖g‖² = 0.327, ‖x‖² = 0.673 and G has eigenvalues 1.254 and 3.082.
    - The bidisc Cauchy formula holds to 10⁻⁹. The torus error 0.0500 bounds the interior error 0.0485.
    - (a/b)³⁰ = 7.5 × 10⁻⁷ for a = 0.5 and b = 0.8, while f_N(b) = 1.
  - **Atlas.**
    - Chart reconstruction, block Bloch points and chart changes hold for d = 3, 4, 5. Cycle products are 1 and tree
      propagation recovers the ray.
    - Proposition 7.3 holds on 3000 sampled pairs, with largest ratio 0.27.
    - Block reconstruction, Σ N_ij = d − 1 and the stability identity hold on 200 random states with d = 3 … 6. The
      screen state has N_ij = 0.506, 0.581, 0.465, 0.535, 0.419 and 0.494, summing to 3.0000.
    - The GHZ± two-body reductions coincide and their 000/111 blocks differ.
  - **Local versus global.**
    - M has eigenvalues −1/3, 2/3, 2/3 (exact), v†Mv = −1 and every block Bloch point is (−1, 0, 0). The all-ones
      eigenvalue is (1 − 2a)/3, with strictly positive blocks at a = 0.55, 0.7, 0.9 and 0.99.
    - The singular Schur criterion agrees with the eigenvalue test on 1833 random matrices, singular leading blocks
      included, together with the rank formula.
    - The Bell axes are S = I/2, X = σx/2, Y = −σy/2, Z = σz/2, so X² + Y² + Z² = ¾I against S² = ¼I. The operator
      three-axis expansion holds on 50 random two-qubit states.
  - **Codes and margins.**
    - V_d and W_d are isometries and E_d preserves trace. The output trace distances are 1, 2/3, 1/2, 2/5, 1/3 and 2/7
      for d = 3 … 8.
    - ν = 0.12852 and a_ν = 0.32443. The five effects are rank one, sum to I, and give u = u₀ + νr and κ.
    - With c = R = 1 the count (N + 1)⁴ first exceeds (1 + 3N)³ at N = 24. The recursive error budget is reproduced on
      500 random recursions.
  - **Why squares.**
    - Three random linear readouts have a common traceless kernel for d = 3 and 4, giving two distinct states with
      equal readings.
    - 2^(1 − p/2) = 1 only at p = 2, and the refinement equation holds for r^p only at p = 2.
    - The third probability 1/(1 + 2^(1 − p/2)) is 0.4142 at p = 1 and 0.5858 at p = 3. The two-branch counterexample
      satisfies f(s) + f(1 − s) = 1 symbolically.
  - **Native selection.**
    - |E| = 89 = 34 + 21 + 21 + 13 and 34 + 34 + 21 at address nine, with 32 legal subsets of the odd positions.
    - p-power densities satisfy R for p = 0.7, 1.3, 2 and 3.1. The active-mass formula is conserved only at p = 2.
    - Symbolically, the ±εH correction has zero I- and W-marginals and TV = 16εH.
  - **Log–Bloch.**
    - The log–Bloch formulas, log odds 2u, the mixed purity defect and the Möbius update hold on 200 samples.
    - Tree weights sum to one with log|A|² = 2Σ log|c|, on 50 random trees. The operator dynamic programme gives a
      complete path family and an effect.
  - **Residuals.**
    - The finite residual example drops from 16 ordered pairs to 0, and post-processing keeps all 16.
    - Projection, least squares, the unitary U = P⊗I + Q⊗X, the non-orthogonal basis budget and the state/effect
      error bound hold on random cases.
    - The Legendre residuals of |x| are 2/3, 1/6, 1/96, … down to 5.7 × 10⁻⁵ at degree 20. Each decrement equals the
      increment.
    - J(x) = ½ and J(Ax) = 4.5 at M = 3. The Gibbs identity holds on 200 random laws and the DAG recursion equals the
      path sum. The MSE identity holds on 50 nested partitions.
  - **Error geometry.**
    - Unitary error conservation and the gate budget hold on 100 random cases. Repeated X is a two-cycle.
    - The normalisation bound holds on 300 samples, and the η example gives 2η before and 2 after normalising.
    - The clock τ_n reaches 4.29 after 12 random contractions.
    - d_FS = |s − t| along the geodesic, sin²s increases and d⟨H⟩/dτ = −2Var(H).
    - On the five-mode space, K = ζ[I + (ζ − 1)P_A] gives K¹⁰ = I and K⁵ = 2P_A − I.
- **Data drawn on screen.**
  - The star-body radius and its perturbation.
  - The spectral bars (1/3, 1/3, 1/3), (3/4, 1/4, 0) and (0.5, 0.3, 0.2).
  - The Poisson kernel profiles.
  - The ‖g‖²/‖x‖² split and the G eigenvalues.
  - The (a/b)ᴺ dots.
  - The two Bloch points of the d = 3 example and the N_ij bars.
  - The spectrum of M and the (1 − 2a)/3 curve.
  - The 2/(d − 1) bars and the packing curves.
  - The power-normalisation bars, the third-probability curve and the active-mass curve.
  - The ±εH grid.
  - The sech u and −tanh u curves, the tree weights and the record-overlap lines.
  - The Legendre residual bars.
  - The 2η and 2 lines, the error-clock bars and curve, and the sin²s curve.
- **Illustrative visuals.** These are illustrations, not data:
  - the filling spheres and the rotating Bloch spheres;
  - the stereographic sketch;
  - the boundary/interior block diagram and the two unit circles;
  - the ratio graph and the 4 × 4 block grid;
  - the 3 × 3 matrix, the ratio triangle and the range sketch;
  - the label register;
  - the parameter-count bars;
  - the nine-position chain and the 89-path treemap;
  - the residual diamonds and the projection triangle;
  - the rotating error chord and the ten-step gate ring.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
