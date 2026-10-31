# 100 · AURIC V39–V40 · SHARP SETTINGS, FUTURE CLOSURE AND HIDDEN MEMORY · AURIC V39–V40 · 锐利设置、未来闭合与隐藏记忆

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:28). It covers two volumes of trureturing
at subject commit `c7e66ea174`:
- `AURIC_SHARP_NATIVE_THREE_SETTING_STABILITY_FUTURE_CLOSURE_AND_RECURSIVE_ERROR_ENERGY_V39.md`, §2–§9;
- `AURIC_APPROXIMATE_CLOSURE_HIDDEN_MEMORY_AND_NATIVE_RECURSION_V40.md`, §2–§8.

Version thirty-nine finds exactly how far unknown record masses can amplify a residual: order 1/κ with two settings,
order 1/√κ with a third native setting, a square-root rate across the rank-one boundary, a finite-depth closure of the
future, and an energy criterion for when errors decay. Version forty follows what a compression leaves out: a common
channel with an internal record, an exact memory kernel, two error budgets for near-closed words, a positive leak gap
for the fixed golden menu, period rigidity for channels, and the full cycle of ten record settings.

## The film, scene by scene

- **Error plane (V39 §2–§3.1).**
  - One coherent input χ = J(z₀ ⊗ |0⟩ + z₁ ⊗ |1⟩) goes through record settings with unknown masses
    m_i0 = t_i0 + δ_i, fixed before any later choice (Definition 2.1). With G = X*X and κ = λ_min G, the system part is
    A_i = XX* + δ_i H_i, where H_i is the difference of the two given successors.
  - In the support of X, h_i = a C_g n_i / q_i and ‖h_i‖² = det G / p_i, with an exact formula for the angle between
    h₀ and h₁ (Theorem 2.2).
  - ‖A₁ − A₀‖²_op = δᵀΓδ for the response Gram matrix Γ, so the residual set is an exact ellipse, and the optimal
    single-weight constants are C_i = 1/(‖h_i‖ sin ϑ₀₁) (Theorem 3.1).
  - The projection F₀ = Q(I + e₀·σ)/2 Q* with e₀ ⊥ h₁ reads Tr(F₀Δ) = −δ₀/C₀, so two events identify both weights;
    with native word approximations |δ_i| ≤ C_i(r_i + 4τ_i) (Corollary 3.2).
- **One over root kappa (V39 §3.2–§4).**
  - For S₀ = I and S₁ = B, n₀·n₁ = −x³ and |n₀ × n₁| = 2x^(3/2), where x = 1/φ.
  - The family G_κ = (I + (1 − 2κ) n·σ)/2 with n = (n₀ + n₁)/2x and δ₀ = −δ₁ = δ ≤ x²/2 has
    ‖A₁ − A₀‖ = 8δκ(1 − κ)/(1 + 4xκ(1 − κ)). The mass error stays fixed while the residual shrinks like κ, so the
    worst order 1/κ is sharp (Theorem 3.3).
  - The third setting S₂ = B², with its own full record contract, gives three independent axes and
    c₀ ≥ x²(1 − x⁴)/(1 + x(1 − x⁴)) (Lemma 4.2). Then |δ₀| ≤ √(η₁² + η₂²)/(2√(d_G c₀)), order 1/√κ (Theorem 4.3);
    two cancelling witness events suffice (Corollary 4.4).
  - A balanced family with δ₀ = 1/2 and η₁ = η₂ = √d_G shows that no order κ^(−α) with α < 1/2 holds (Theorem 4.5).
- **Rank-one bridge (V39 §5).**
  - Approaching a rank-one target along inputs at trace distance τ, with the same record rule moving by at most Lτ and
    aggregate budget E_τ ≤ ε, the choice τ = √ε gives
    |m₀₀ − t₀₀|(χ₀) ≤ (L + 1/√(2c₀))√ε + ε (Theorem 5.1).
  - With δ₀(τ) = (b − Lτ)₊ and b = √(√2 L ε), every input meets the budget, E_τ = 2√2 τ√(1 − τ²)(b − Lτ)₊ ≤ ε, yet
    the target error is 2^(1/4)√L √ε. The exponent 1/2 is sharp (Theorem 5.2).
- **Finite future (V39 §6).**
  - V₀ = span{I, E_s} and V_(n+1) = V_n + Σ_j K_j* V_n K_j. Once a step adds nothing the chain stops for good, after at
    most dim V∞ − dim V₀ ≤ D² − dim V₀ steps (Theorem 6.2).
  - Thirteen terminal effects on H₁₃ give L ≤ 156, and the five-prefix readout gives L ≤ 164. On H₈₉ the 55 Fibonacci
    prefixes (34 of rank two, 21 of rank one, 2·34 + 21 = 89) give L ≤ 7866.
  - For a dense native menu V∞ is all Hermitian matrices, so a fixed linear summary needs D² − 1 numbers, that is
    168 or 7920 (Theorem 6.3).
  - On the closure, unitary words act as isometries: ‖P_V(K_w(ρ − σ)K_w*)‖_HS = ‖P_V(ρ − σ)‖_HS (Theorem 6.4).
- **Gram metric (V39 §7).**
  - For basis effects chosen among future words, ‖P_V(ρ − σ)‖²_HS = δxᵀ Gram⁻¹ δx, and every future word of any length
    has TV ≤ √D/(2√α)·‖δx‖₂ (Theorem 7.1).
  - Finite depth is not good conditioning: R_y(θ) with E = (I + Z)/2 closes in one step, but α = (1 − |cos θ|)/2 (§7.1).
  - On the golden seed, K₃v and K₃⁻¹v = K₃⁹v agree on every current terminal (p_u = x, p_v = x²), yet one more K₃
    gives p_v = x⁴ versus 1. A four-cycle example shows why the recursion must run on the full carrier (§7.2).
- **Error energy (V39 §8–§9).**
  - Datko: a strongly continuous contraction semigroup on a real Banach space has square-integrable orbits for every
    vector exactly when ‖S(t)‖ ≤ M e^(−ωt) with M ≥ 1, ω > 0 (frozen in Lean, see below).
  - For a three-axis error map T, finite energy for every error ⇔ TᵀPT = P − I with P ≻ 0 ⇔ ρ(T) < 1, and
    ‖Te‖²_P = ‖e‖²_P − ‖e‖² ≤ q²‖e‖²_P (Theorem 8.1). Forced errors satisfy limsup ‖e_m‖_P ≤ δ/(1 − q) (Corollary 8.2).
  - The channel ⟨0|ρ|0⟩|+⟩⟨+| + ⟨1|ρ|1⟩|−⟩⟨−| sends (r_x, r_y, r_z) to (r_z, 0, 0): ‖T‖ = 1 but T² = 0, and
    P = diag(1, 1, 2) (§8.1).
  - With θ_j = 1/j, Σ sin²(1/j) < ∞, V_N = U₁⋯U_N and V_N* converge strongly to a unitary, but
    ‖V_N − V_M‖ ≥ √2 for suitable N > M, so there is no operator-norm convergence (Theorem 9.1).
- **Common channel (V40 §2).**
  - For v_y = √(a − y)|2⟩ + √y|5⟩ + √(1 − a)|3⟩, each single state can be rotated to v_βy, but no common unitary works
    for all y, since |⟨v₀, v_y⟩| < |⟨v₀, v_βy⟩| (Theorem 2.2). On density matrices I₃/3 would have to move.
  - A₀ = diag(1, √β, 1) and A₁ = √(1 − β)|2⟩⟨5| give (X, Y, Z) ↦ (X + (1 − β)Y, βY, Z) on every density matrix,
    with internal isometry V_β and output purity 1 − 2(1 − β)y((1 − a) + βy) (Theorem 2.3).
  - The final channel needs a two-dimensional record, while keeping every first-transfer time needs at least n + 1
    record dimensions; one unreset record returns cos²(nθ) with cos θ = √β instead of βⁿ (Proposition 2.4).
- **Memory kernel (V40 §3–§4).**
  - v_(n+1) = A v_n + B D₀ⁿ z₀ + Σ_(k<n) B D₀ᵏ C v_(n−1−k) exactly (Theorem 3.2).
  - In finite dimensions all kernels vanish exactly when C = 0, that is when V is invariant; checking k ≤ h − 1, or
    n ≤ h + 1 steps, suffices. The two-sided shift on ℓ²(Z) shows the finite-dimension condition is needed
    (Theorem 3.3).
  - For a word of length L, ‖P U_L⋯U₁x − A_L⋯A₁Px‖ ≤ min(1, s_L)‖Qx‖ + min(2, t_L)‖Px‖ (Theorem 4.3). A rotation
    attains both orders: ratios tend to L(L − 1)/2 and L (Proposition 4.4).
  - At θ = π/2N the true coefficient is 0 while (cos θ)ᴺ ≥ 1 − π²/8N; the kernel −sin²θ cosᵏθ has absolute sum
    1 + cos θ.
- **Golden gap (V40 §5).**
  - For a native menu dense in PU(D), the symmetric gap γ = λ_min(I − T) on Sym₀ is positive (Lemma 5.2), and every
    proper visible subspace of rank r satisfies (1/m)Σ_j ‖Q R_j P‖²_F ≥ γ r(d − r)/d and
    max_j ‖Q R_j P‖²_op ≥ c_r ≥ γ/2 (Theorem 5.3).
  - For a period q, 1 − √(1 − ℓ²) ≤ ‖I − A^q‖ ≤ min(2, q(q − 1)ℓ²/2) (Theorem 5.4). Since every primitive gate has
    K¹⁰ = I, some address gives ‖P R_j¹⁰ P − (P R_j P)¹⁰‖ ≥ 1 − √(1 − c_r) ≥ γ/4 (Corollary 5.5).
  - If the native seed's pure orbit is dense, some finite preparation word shows a readout gap of at least
    b_r √(α/(rD)); for D = 13, r = 3 this is c_r = 55γ/56 and factor √(α/39) (Theorem 5.6).
- **Periods and evidence (V40 §6–§7).**
  - If a global unitary has U^q = I and a same-dimension channel satisfies Φ^q = Λ_q, then Φ is unitary
    (Theorem 6.1). With ‖Φ^q − id‖_◇ ≤ ε < 1, distances shrink by at most (1 − ε) and the contraction factor obeys
    q₀ ≥ (1 − ε)^(1/q) (Theorem 6.2).
  - With reports off by up to ε, a protocol that stops after lengths up to H on the all-ones record is fooled by any
    angle with H²θ²/4 ≤ ε, so finite noisy reports cannot certify exact closure (Theorem 7.2).
- **Ten settings (V40 §8).**
  - For S_k = B^k, k = 0…9: Σ n_k n_kᵀ = 5s²P_⊥ + 10c²P_∥ with c = x³ and s² = 4x³, and
    M₁₀ = Σ_(k=1..9)(n₀ × n_k)(n₀ × n_k)ᵀ has eigenvalues μ = 60x⁹ and ν = 20x³ on n₀⊥ (Theorem 8.2).
  - For E_q² = Σ_(k=1..9) q_k‖A_k − A₀‖², the best full-input constant is
    |δ₀| ≤ E_q/(2√(d_G(60x⁹ + 80d_G x³))), attained by an explicit input, so the order stays 1/√κ (Theorem 8.3).

一部约七分半钟的片子，延续 AURIC 版本系列：第三十九版先证明未知记录质量的误差落在两个后继差张成的平面里，Gram 矩阵给出精确误差椭圆与最优常数，每个权重只需一个消干扰投影；黄金两设置的最坏放大率 1/κ 是锐利的，加入第三个原生设置 B² 后降为 1/√κ，且不可改进；跨秩一边界得到平方根速率并证明指数锐利；未来效果升链在 D² − dim V₀ 步内闭合（十三维 156，八十九维 7866），闭合后酉门字等距；Gram 度量控制任意长度的未来，黄金种子上两个当前不可区分的历史在下一步给出 x⁴ 对 1；Datko 定理与离散 Lyapunov 判据决定误差何时衰减，按 1/j 旋转的无限乘积强收敛却不一致收敛。第四十版证明聚合余量没有共同的酉实现，但有带内部记录的二 Kraus 通道；被丢掉的关系经精确记忆核返回，近闭合门字有 Lℓ 与 L(L − 1)ℓ²/2 两种误差；固定黄金菜单有正的对称间隙，十步复原给出至少 γ/4 的见证；周期过程迫使通道为酉，有限带噪报告无法认证精确闭合；最后黄金块十个记录设置给出精确的 60x⁹ 与 20x³ 与最优常数。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-100-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One frozen general theorem is used, and only for the sentence that states it.
  - `D5/S3/Quantum/Analysis/DatkoStability`, theorem `integrable_sq_orbit_iff_exponential_stability`: for a strongly
    continuous contraction semigroup on a real Banach space, every orbit has integrable squared norm on (0, ∞) exactly
    when ‖S(t)‖ ≤ M e^(−ωt) for some M ≥ 1 and ω > 0. Its frozen state file exists at the subject commit and the
    statement matches the narrated sentence. The energy scene's first sentence and the finale carry the lean badge for
    it.
  - V39 cites this module (its reference [4]), but the digestion ledger does not link it to the volume: at the subject
    commit neither volume has digestion records (both backfill directories are empty). The volume's discrete
    Lyapunov theorem and its applications are not frozen.
  - The frozen modules `FiniteSequentialWordCertificate` and `ControlledObservableCompletion` are cited by V39 §6 as
    related supplies; the film does not badge them, since the volume's own menu and terminals are different.
- **Classical tools named in the volumes.** The discrete Lyapunov criterion (Stephen Boyd, EE363 lecture notes,
  cited in V39) carries the classical badge in the energy scene and the finale. Also used: Kraus, Choi and internal
  isometry representations and the diamond norm (John Watrous, *Theory of Quantum Information*, lectures 5 and 20,
  cited in V40), Cayley–Hamilton, the Bernoulli inequality, the divergence of the harmonic series and Fibonacci
  counting.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the K₉ and K₃ record-address actions, the golden block B and the unknown-mass contract of the coherent
    reconstruction Continuation II (§105, §111, §128–§130);
  - the projective density of the native thirteen-dimensional menu in PU(13) (Continuation II §77), used by V39
    Theorem 6.3 and V40 §5; the film recomputes γ only for a sampled golden-type menu in D = 3;
  - the archive future rank of Continuation II §83, the V22 future quotient, the rooted history volume, the fixed
    golden gate K = ζ(I − Π) + ζ²Π with K¹⁰ = I, and the three-budget remainder of the Robin budget volume (§4).
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (86 checks) recomputes the following. These are sampled
  and finite checks, not proofs.
  - **Plane.** On 300 random inputs and setting pairs: h_i = a C_g n_i / q_i, ‖h_i‖² = d_G/p_i, the angle formula,
    ‖Δ‖² = δᵀΓδ, the optimal C₀ and the witness identity Tr(F₀Δ) = −δ₀/C₀. For the sample input (κ = 0.123,
    settings I and B) C₀ = 1.305 and C₁ = 1.579.
  - **Golden settings.** n₀·n₁ = −x³, |n₀ × n₁| = 2x^(3/2) = 0.9717, the golden closed forms for C₀ and C₁ on 200
    inputs, and the Theorem 3.3 residual and λ_min Γ = 32d²/(1 + 4xd)² for 40 values of κ in [10⁻⁴, 1/2].
  - **Three settings.** The determinant formula, n₀·n₂ = 2x⁴ − 1, the trace and determinant of the cross-product
    Gram matrix, c₀ = 0.2606 ≥ 0.2135 = x²(1 − x⁴)/(1 + x(1 − x⁴)); Theorem 4.3 on 3000 random cases (largest ratio
    0.649); the witness values of Corollary 4.4; the balanced family η₁ = η₂ = √d_G.
  - **Bridge.** The lower family stays within E_τ ≤ ε on the whole curve and E_τ matches the matrix computation; for
    L = 1 the constants are 2.385 (upper) and 2^(1/4) = 1.189 (lower).
  - **Closure.** 89 Fibonacci words of length nine, 55 prefixes (34 of rank two, 21 of rank one); 156, 164, 7866,
    168, 7920. Chains: shift plus golden block in D = 6 has dimensions 2, 4, 7, 11, 16, 21, 27, 34, 36 (depth 8 ≤ 34);
    one golden-times-shift word in D = 4 climbs 2, 3, …, 14 and stops below 16 after 12 = dim V∞ − dim V₀ steps; a
    block menu closes on a proper five-dimensional space, on which the projected distance stays constant along a
    24-letter word.
  - **Gram metric.** The identity ‖P_V(ρ − σ)‖² = δxᵀGram⁻¹δx and TV ≤ √D/(2√α)‖δx‖ for words up to length 11 (largest
    ratio 0.27); α = (1 − |cos θ|)/2; the X-eigenstate gaps 0, sin θ, …, 1; the golden seed probabilities x = 0.618,
    x² = 0.382 for both histories and x⁴ = 0.146 versus 1 after one more call; the four-cycle example.
  - **Energy.** The Lyapunov identities on 200 random T and the forced bound; the example channel is trace
    preserving with ‖T‖ = 1, T² = 0 and P = diag(1, 1, 2); a sample contraction semigroup with energy 1.000.
  - **Infinite limit.** Σ sin²(1/j) = 1.3263; for M = 5, 10, 30, 100, 300, 1000 the minimal N is 26, 51, 147, 483,
    1446, 4813, with π/2 ≤ Θ < π/2 + 1/(M + 1) and |e^(iΘ) − 1| ≥ √2, while the vacuum tail distance falls from 0.417
    to 0.031.
  - **Common channel.** The overlap inequality (a = 0.8, β = 0.5), the occupancy map and the purity formula on 300
    random cases, the move of I₃/3, the n-step Kraus pair and history probabilities, and cos²(nθ) at β = 0.6.
  - **Memory kernel.** The memory equation for a random orthogonal map on R⁸ with a rank-three V (15 steps); zero
    and nonzero kernels; Theorem 4.3 on 400 random words (largest ratio 0.929); the limits L(L − 1)/2 and L for
    L = 2…6; (cos(π/2N))ᴺ ≥ 1 − π²/8N for N = 2…2000; the kernel sum 1 + cos θ; at N = 20 the prediction stays
    above 0.938.
  - **Golden gap.** For a random three-gate golden-type menu in D = 3: K¹⁰ = I, γ = 0.110 > 0, the leak bounds of
    Theorem 5.3 on 7 ranks × 40 subspaces, the bounds of Theorem 5.4 and the ten-step witness of Corollary 5.5, and a
    sampled readout gap 0.297 ≥ 0.0047 for Theorem 5.6; 165/168 = 55/56 and rD = 39.
  - **Periods and evidence.** SWAP with a record erases at step one and restores at step two. By SDP (cvxpy with
    Clarabel) ‖Dep − id‖_◇ = 3/2 on a qubit; for the depolarised period-five unitary with p = 0.04,
    ‖Φ⁵ − id‖_◇ = 0.2769 and (1 − ε)^(1/5) = 0.9372 ≤ q₀ = 0.96, and the reference bound holds on 200 random Hermitian
    inputs (smallest ratio 0.959). For H = 10 and ε = 10⁻³, θ = 0.00632 fits every report.
  - **Ten settings.** s² = 1 − x⁶ = 4x³, the second-moment identity, μ = 60x⁹ = 0.7893 and ν = 20x³ = 4.7214, the
    exact decomposition of E_q² on 200 random inputs with the bound, and the attaining input for 30 values of κ.
- **Data drawn on screen.**
  - The error ellipse and its C₀, C₁ box; the plane vectors h₀, h₁ and e₀ for the sample input.
  - The amplification curves (two-setting family, three-setting bound and balanced family).
  - The bridge upper and lower curves.
  - The two chain staircases, the 55 prefix tiles and the isometry trace.
  - The α(θ) curve and the golden seed probability bars.
  - The orbit norms, the infinite-product bars and gaps.
  - The overlap curves and the βⁿ versus cos²(nθ) points.
  - The truth and prediction curves at N = 20.
  - The leak bars and the ten-step gap bars for the sampled menu.
  - The noisy-report curve and the ten-axis star and its amplification curve.
- **Illustrative visuals.** These are illustrations, not data: the rotating pyramid and Ω ring; the plane sheet; the
  rank-one circle and approaching points; the three-axis sphere; the visible and hidden boxes with the travelling
  dot; the ten-step dial; the SWAP cells; the continuous cos² guide curve.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
