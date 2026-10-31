# 098 · AURIC V35–V36 · THREE-AXIS ERRORS, FOUR-OF-FIVE RECOVERY AND ERROR SERIES · AURIC V35–V36 · 三轴误差、四推一恢复与误差级数

This film continues the versioned AURIC volumes and runs about 7¼ minutes (7:15). It covers two volumes of
trureturing at subject commit `13e2097ed4`:
- `AURIC_THREE_AXIS_ERROR_GEOMETRY_UNITARY_COMPATIBILITY_AND_ENDOGENOUS_STABILITY_V35.md`, §2–§8;
- `AURIC_FIVE_MODE_DUAL_BASES_FOUR_OF_FIVE_RECOVERY_AND_RECURSIVE_ERROR_SERIES_V36.md`, §2–§10.

Version thirty-five asks how an error can live on three stable axes, why unitarity alone does not keep relative errors
small, and how a five-mode output can park a whole error family in a syndrome. Version thirty-six reads the five modes
as functions, finds when four readings recover the fifth, and turns results and errors into convergent series.

## The film, scene by scene

- **Total and ball (V35 §2).**
  - A nonzero positive 2 × 2 matrix G = [[p, c̄], [c, q]] is the same as a total N = p + q > 0 and a point
    r = (2 Re c, 2 Im c, p − q)/N of the Bloch ball, with 1 − |r|² = 4 det G/N²; rank one is the sphere
    (Theorem 2.2).
  - The normalised shape of an amplitude error does not fix its size N_η, and a state difference has trace zero.
    On a qubit D(ρ, σ) = ½|r_ρ − r_σ| (Proposition 2.3).
  - Two anticommuting sharp readouts A, B give C = −iAB with AB = iC, BC = iA, CA = iB, and
    ω(A)² + ω(B)² + ω(C)² ≤ 1 for every state; in finite dimensions (A, B, C) ≅ (Z, X, Y) ⊗ I (Theorem 2.4).
- **Hidden error (V35 §3).**
  - The pyramid's occupancy readouts N₁, N₂, N₃ commute. The laws (0, ½, 0, ½, 0) and (½, 0, 0, 0, ½) both read
    (X, Y, Z) = (½, ½, 0) yet are at distance 1; mixing in ε of the uniform law keeps them strictly positive at
    distance 1 − ε (Proposition 3.1).
  - No anticommuting sharp pair exists on all of ℂ⁵, since B swaps the ±1 eigenspaces of A and forces even
    dimension (Proposition 3.2).
  - Three axes predict every future reading exactly when Φ*(span{I, A, B, C}) ⊆ span{I, A, B, C}; without closure
    |0⟩⟨0| ⊗ |0⟩⟨0| and |0⟩⟨0| ⊗ |1⟩⟨1| share the axes, and an internal SWAP sends Z to +1 versus −1 (Theorem 3.3).
- **Quaternion gates (V35 §4).**
  - A relative gate is E = aI − i b·σ with a² + |b|² = 1, D(EρE*, ρ)² = |b|² − (b·r)² for pure ρ, and the
    worst pure-state distance is |b| (Theorem 4.1).
  - e^(−iαA)e^(−iβB) = aI − i b·σ for some α, β exactly when a² + |b|² = 1 and a b_C = b_A b_B (Theorem 4.2).
  - Swapping the factors flips b_C, and the two products differ in norm by 2|sin α sin β|; the composition law is
    a₂₁ = a₂a₁ − b₂·b₁, b₂₁ = a₂b₁ + a₁b₂ + b₂ × b₁ (Corollary 4.3).
- **Drift and budget (V35 §5).**
  - With ideal gate I, actual gate e^(−iεZ) and start |+⟩, D_n = |sin nε|; ε = π/(2N) reaches distance 1 at step N
    (Proposition 5.1).
  - For E_n = G_n* H_n, ‖E_N − I‖ ≤ Σ_(j<N) ‖U_j − V_j‖, and summable step errors make E_n converge to a unitary
    (Theorem 5.2).
  - A channel with Φ*(A) = A and Φ*(B) = B has Kraus operators commuting with A, B, C, so it is the identity on a
    bare qubit and id₂ ⊗ Ψ with multiplicity (Theorem 5.4). On screen: the transpose keeps the ball but is not
    completely positive (Proposition 5.3).
- **Syndrome of at most two (V35 §6).**
  - One finite Kraus channel has a trace-preserving exact recovery exactly when every E_a*E_b is a scalar (the
    criterion the volume attributes to Knill–Laflamme and Nayak–Sen, frozen in the project as the pair below).
  - A family needs one common recovery, so cross products E_(t,a)*E_(u,b) must be scalars too; E_t = SU_t is a
    family of separately recoverable channels with no common recovery (Theorem 6.2).
  - Scalar products make the errors orthonormal isometric copies of the qubit, so 2r ≤ 5 and r ≤ 2, and
    E_t(X) = W(X ⊗ τ_t)W* with W fixed (Theorem 6.2, Corollary 6.3). Logical and syndrome axes commute; the syndrome
    varies while every logical reading stays (Theorem 6.4).
- **Stabilisation and the CZX rate (V35 §7–§8).**
  - T_κ = κ id + (1 − κ)Π with Π(Y) = W(R(Y) ⊗ τ*)W* keeps the logical state and gives
    s_n − s* = κⁿ(s₀ − s*) (Theorem 7.2).
  - With an exact projection and a contraction q on ker Π, kept content needs Σ d_n < ∞ and the correctable part only
    needs b_n → 0; then ρ_n → σ_∞ with D(σ_∞, Πρ₀) ≤ Σ d_n (Theorem 7.3).
  - For m commuting idempotent CPTP maps, d_ref(e^(tL), Π) ≤ 1 − (1 − e^(−t))^m ≤ m e^(−t) (Theorem 8.1).
  - On the CZX ring the source limit is T_t(2^(−N)(I + X^⊗N)) → 2^(−N)(I + 2^(1−N/2) U_CZX), with
    Π_N(a) = 2^(−N)[(Tr a)I + Tr(U*a)U] (§8.1).
- **Five functions and four of five (V36 §2–§3).**
  - {1, x, y, z, xy} is a basis of functions on the modes (∅, 2, 3, 5, 25), with e₀ = 1 − x − y − z + xy,
    e₂ = x − xy, e₃ = z, e₅ = y − xy, e₂₅ = xy (Theorem 2.2), and w = (N − X − Y − Z + K, X − K, Z, Y − K, K)
    (Theorem 2.4).
  - With the total known, any four masses give the fifth with error at most 4ε (Proposition 3.2), but a sum check
    cannot say which reading is wrong (Proposition 3.3).
  - Fixing the cross ratio w₀w₂₅/(w₂w₅) = ϑ gives (N − X − Y − Z + K)K = ϑ(X − K)(Y − K); at ϑ = 1 this is
    (N − Z)K = XY, and any four moments of one scale determine the fifth (Theorem 3.4). Normalised ratios contain
    no N. Stability: |Δμ_i| ≤ max(1, ϑ)M/η Σ_(j≠i)|Δμ_j|, and K is 1-Lipschitz (Theorem 3.5).
- **Sharp tanh bound (V36 §4).**
  - On a fibre with fixed (X, Y, Z), χ = log(w₀w₂₅/(w₂w₅)) is a bijection onto ℝ (the mixed-coordinate chart), and
    χ′ = 1/p₀ + 1/p₂₅ + 1/p₂ + 1/p₅ ≥ 16/w with w = 1 − Z (Theorem 4.1).
  - TV(p, p̃) ≤ w tanh(|χ − χ̃|/8), attained at X = Y = w/2 with opposite χ (Theorem 4.2).
  - The maximum-entropy law has χ = 0 and k* = XY/w, and TV(p, p*) ≤ (w/2) tanh(|χ|/4) (Proposition 4.3).
- **Closure and the result–error relation (V36 §5–§6).**
  - The next three means depend only on the current ones exactly when Φ₀ + Φ₂₅ = Φ₂ + Φ₅ (Theorem 5.2).
  - For ψ = x + e, ‖ψ‖² = S(1 + r_x) and ‖e‖²/‖ψ‖² = (1 − r_z)/(2(1 + r_x)) (Theorem 6.1).
  - x = Mu, e = (1 − M)u keep ψ = u while r → (−1, 0, 0) and ‖e‖ = M − 1 → ∞ (Proposition 6.2).
- **Error series and rates (V36 §7–§8).**
  - If x* = b + Ax* with ‖A‖ ≤ q < 1, the defect r = b + Ax − x gives e = Σ Aʲ r, ‖e‖ ≤ ‖r‖/(1 − q), and the tail
    after m terms is at most qᵐ‖r‖/(1 − q) (Theorem 7.2). On screen: the fibre series Tⁿp = p* + κⁿ(p − p*)
    (Corollary 7.3) and the orthogonal tail identity (Theorem 7.1).
  - For T_n = Π + κ_n Q, ∏κ_n = 0 exactly when Σ(1 − κ_n) = ∞; κ_n = (n + 1)/(n + 2) gives 1/(n + 1); injected
    errors η_n = c/(n + 2) give D_n = (D₀ + cn)/(n + 1) → c, while Σ(1 − κ_n) = ∞ and η_n/(1 − κ_n) → 0 suffice for
    D_n → 0 (Theorem 8.1).
- **Histories and finite readouts (V36 §9–§10).**
  - The project's guarded histories number a_L = F_(3L+2) = 1, 5, 21, 89, …, with a_(L+2) = 4a_(L+1) + a_L and
    Z(t) = (1 + t)/(1 − 4t − t²). Weights t^L normalise exactly when 0 ≤ t < √5 − 2, and the tail is
    P_t(|h| > m) = t^(m+1)(a_(m+1) + t a_m)/(1 + t) (Theorem 9.1).
  - For a norm-compact family of signed errors one finite joint readout keeps every total variation within ε
    (Theorem 10.1); for all point differences on an infinite space no fixed finite readout suffices
    (Proposition 10.2).

一部约七分钟的片子，延续 AURIC 版本系列，讲第三十五版与第三十六版：二阶正关系恰是总量加 Bloch 球中的一点，归一化会藏起误差大小；两个反对易锐读出生成第三轴；金字塔的占据读口对易，同读数的两个态可以相距为一，完整五模式上没有反对易锐轴对，三轴预测未来当且仅当代数闭合；相对门是单位四元数，两轴旋转恰满足 a·b_C = b_A·b_B，第三分量记录门序；单靠酉性不能让相对误差保持很小，可求和预算才给出界，精确保持两条锐轴的通道只能是恒等；整族误差需要共同恢复，在五模式输出里综合征维数至多为二，逻辑读数在综合征变化时保持不变；综合征重置以 κⁿ 收敛，CZX 窗口给出 1 − (1 − e⁻ᵗ)ᵐ 的速率；第三十六版把五个模式读作函数基，固定交叉比后同尺度的任意四个矩决定第五个；隐藏关系 χ 给出锐利的 w·tanh(|Δχ|/8) 界；递归需要四角闭合，稳定的归一方向可以藏住无界误差；关系缺陷给出未知误差的收敛级数，变化的收缩率需要发散的累计改进；项目历史数 F(3L+2) 在 t < √5 − 2 时可归一化，范数紧误差族可由同一个有限读出近似保留。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-098-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Digestion status.** At the subject commit neither volume has digestion records: there is no
  `Meta/Digestion/backfill/` directory for either, so no atom of these volumes is covered by a Lean declaration.
- **Lean-frozen project theorems that the volumes apply.** Each has its state file under `Golden/Frozen/state/D5/` at
  the subject commit, and its statement matches the sentence that carries the `lean` badge. The digestion ledger does
  not link them to these volumes; the volumes' own uses of them stay badged as theory.
  - The exact-recovery pair for one finite Kraus channel: `FiniteKrausReversibility.scalar_products_construct_left_inverse`
    and `KrausLeftInverseNecessity.left_inverse_error_products` (D5/S3/Quantum/Recovery). The family version, the
    five-mode bound r ≤ 2 and the fixed-syndrome form are theory.
  - The five-mode mixed-coordinate chart: `FiveModeMixedCoordinates.mixed_coordinates_global_chart`
    (D5/S1/Words/AdmissibleWords), for "χ is a bijection on every fibre". The slope bound 16/w and the tanh bounds
    are theory.
  - The CZX steady-state limit: `CZXParentLindbladianSteadyState.result` (D5/S3/Quantum/TensorNetworks), with the
    window commutation and idempotence of `CZXParentLindbladianWindowChannel`. The rate 1 − (1 − e^(−t))^m and its
    CPTP reading are theory.
  - The uniform finite readout: `FiniteObservationVariation.exists_uniform_finite_readout_variation`
    (D5/S3/Topology/Measures). Proposition 10.2 is theory.
- **Published results.** The volumes cite no external papers for the results shown.
- **Classical tools named in the volumes.** The Bloch representation and Pauli algebra; the exact-correction
  criterion of Knill–Laflamme and Nayak–Sen; the isometric (Stinespring-type) dilation of a finite channel;
  Cauchy–Schwarz, Jensen, AM–GM and Bernoulli inequalities; geometric and Neumann series. The opening line of the ball scene is
  badged as classical.
- **Project inputs from other volumes, badged as theory.** The binary-readout volume v28 (Bloch, full frames, complex
  structure); the foundation-formulas volume (five-function basis §2.2, maximum entropy §9.3, guarded history count
  §12.5, closure §14.5); the orthogonal-syndrome decoding and channel modules; the actual-recovery volume cited in
  V35 §6.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, scipy, sympy, cvxpy with Clarabel) runs 56 016
  checks:
  - **Total and ball.** 400 random positive matrices satisfy the reconstruction and 1 − |r|² = 4 det G/N²; rank one
    lies on the sphere; D = ½|Δr| on 300 random qubit pairs; the largest of ω(A)² + ω(B)² + ω(C)² over 2000 random
    states is 0.99913, and the bound also holds with multiplicity three.
  - **Hidden error.** The two laws read (½, ½, 0) at distance 1, and their ε-mixtures (ε = 0.2, 0.1, 0.01) are
    strictly positive at distance 1 − ε; the κ-parametrisation on 200 random laws; the SWAP example splits Z into +1
    and −1; |Δr|/2 ≤ D on 200 random two-qubit pairs.
  - **Gates.** D² = |b|² − (b·r)² and sup = |b| on 200 random quaternions; for α = 0.7, β = 0.5 the quaternion is
    (0.6712, 0.5654, 0.3667, 0.3089), the swapped order has b_C = −0.3089 and the products differ by
    2 sin α sin β = 0.6177; the converse holds on 203 points of the variety, including a = 0; the composition law on
    200 random pairs; at α = β = π/2 the two products differ by a sign.
  - **Drift and budget.** D_n = |sin nε| for n = 0…40 with ε = π/40 = 0.07854, D₂₀ = 1; the budget inequality and
    ‖W_n − I‖ = ‖U_n − V_n‖ on 30 random 3 × 3 gate sequences; the partial transpose of a Bell state equals SWAP/2
    with eigenvalue −1/2; the Theorem 5.4 identity on 100 random channels.
  - **Syndrome.** For a random isometry W: ℂ² ⊗ ℂ² → ℂ⁵ and five syndrome states, every cross product is a scalar,
    the recovery returns X exactly, and logical readings stay fixed; E_t = SU_t has a non-scalar product; a
    four-Kraus correctable channel has Gram eigenvalues (0.55, 0.45, 0, 0).
  - **Stabilisation.** With κ = 0.7: Π² = Π, RΠ = R, T_κⁿ = Π + κⁿ(id − Π), D(Tⁿρ, Πρ) = κⁿ D(ρ, Πρ), and
    s_n − s* = κⁿ(s₀ − s*) for n ≤ 12; the Theorem 7.3 bound along 30 noisy steps.
  - **CZX and rates.** The SDP returns ½‖id − dep‖◇ = 0.75 for a qubit. For two commuting qubit resets the exact
    d_ref is 0.633, 0.475, 0.338, 0.223, 0.142, 0.055 at t = 0.25, 0.5, 1, 1.5, 2, 3, below a(t) = 0.951, 0.845,
    0.600, 0.396, 0.252, 0.097. On the CZX ring N = 4 the two windows commute and are idempotent CPTP maps, the
    projection formula holds on random operators, e^(40L) sends 2^(−4)(I + X^⊗4) to 2^(−4)(I + U/2), and sampled
    distances stay below a(t) (0.373 against 0.845 at t = 0.5). Tr CZ = 2^(N/2+1) for N = 4, 6, 8, 10.
  - **Four of five.** The evaluation matrix of {1, x, y, z, xy} has rank 5 and the event formulas hold; the 4ε
    erasure bound; for ϑ = 0.3, 1, 2.5, 300 random positive laws satisfy F_ϑ = 0 and every coordinate is recovered
    from the other four; the example (N, X, Y, Z, K) = (1, 0.4, 0.3, 0.2, 0.15); the Theorem 3.5 bound and the
    1-Lipschitz K on 900 random pairs.
  - **Tanh bounds.** On 300 random fibres χ is increasing with slope ≥ 16/w and limits ±∞, and every pair satisfies
    TV ≤ w tanh(|Δχ|/8); 160 more pairs on the fibre (0.3, 0.25, 0.2); equality at X = Y = w/2 (Δχ = 1, 2, 4 give
    0.0995, 0.1959, 0.3697 for w = 0.8); k* = XY/w maximises entropy and TV(p, p*) ≤ (w/2) tanh(|χ|/4) with equality
    in the symmetric case; the completion averages 5w/16 against w/4.
  - **Closure and Gram errors.** The next-mean difference is h(Φ₀ − Φ₂ − Φ₅ + Φ₂₅) for 100 random updates; a
    non-closed update with corner sum (0.2, 0, −0.2) sends two laws with means (0.3, 0.25, 0.2) to (0.318, 0.305,
    0.207) and (0.350, 0.305, 0.175); Theorem 6.1 and its stability bound on 300 random pairs; the cancelling
    example for M up to 60; F₁(δ) = −h² and δK = h(X + Y + h)/W; the decoder geometric-series tails.
  - **Series and rates.** The orthogonal tail identity; Neumann sums and tails on 50 random 6 × 6 matrices with
    ‖A‖ = 0.6; the fibre series with κ = 0.6 (χ moves −1.96, −1.03, −0.59, … towards 0); ∏(n + 1)/(n + 2) = 1/(n + 1);
    D_n = (D₀ + cn)/(n + 1) with c = 0.3; η_n = 0.3/(n + 2)^1.5 drives D_n below 0.02; the Abel mixture with λ = 0.8
    and its truncation error ≤ λᵐ.
  - **Histories.** a_L = F_(3L+2) = 1, 5, 21, 89, 377, … with the recurrence; the series of (1 + t)/(1 − 4t − t²)
    to order 11; √5 − 2 = 0.23607 and boundary terms tending to (3 + √5)/(2√5) = 1.1708; the exact tail against
    direct sums at t = 0.2 for m = 0…12 (0.8667, 0.7333, 0.6213, 0.5264, …), with Z(0.2) = 7.5.
  - **Readouts.** On a truncated Cantor space of 2¹⁰ points every finite coordinate readout has a colliding pair, and
    a family depending on the first three coordinates keeps its variation under that readout.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The 60 sampled Bloch points.
  - The two hidden-error laws.
  - The gate distance profile with |b| = 0.5646, and the quaternion bars in both orders.
  - The drift stems and the budget curve.
  - The Gram eigenvalue bars, the syndrome points and the logical vector.
  - The syndrome trajectory with κ = 0.7.
  - The a(t) curve with the CZX samples and the reset SDP values.
  - The basis table and the four-of-five example.
  - The χ(k) curve, the TV samples with the equality points.
  - The closure example means.
  - The cancelling-error curves.
  - The Neumann tails, and the injected-error paths.
  - The history bars and the tail stems.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the Bloch-ball wireframe, the axis arrows and the two state points;
  - the matrix G and the eigenspace boxes;
  - the SWAP box;
  - the five-mode cells, the qubit arrow and the S₁, S₂ blocks;
  - the base-corner square;
  - the binary readout tree.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
