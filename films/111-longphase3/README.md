# 111 · FIB-NATIVE LONG-TIME PHASE III · QUANTITATIVE RATES AND THE PRICE OF CONFINEMENT · FIB 原生长时相位 第三部 · 定量速率与约束的代价

This is the third film in the FIB-native long-time phase series and runs about 7 minutes (7:09). It covers the whole of
`FIB_NATIVE_LONG_TIME_PHASE_QUANTITATIVE_BOUNDS.md`, §41–§74, at trureturing subject commit `3d4c9c5015`.

Parts one and two found the native phase tensor M and let a state bind to its Green field. This film returns to the
moving native process. It first gives explicit rates at which the phase paths and terminal heights reach their
Brownian limits. It then prices confinement: the probability that a whole history stays in a slab, the least relative
entropy that makes that likely, and what persistent feedback can and cannot do to the three transport directions. It
ends with growing and critical tubes and with finite numerical records that reach the same transport limit.

The numbers on screen use one sample of the native data (the same as film 110): G Definition 25.1 with Z = 0.2
(H = 0.4), I = (0.05, 0.35), ε = 1, κ = 0.01 and k₀ = 0.2. Then λ = π²/0.09 = 109.66 and γ = 3λ = 328.99.

## The film, scene by scene

- **Rates (§41–§42).**
  - The native process: the height K diffuses with dK = √2 ε dW¹ in I = (l, u) and is killed at both ends; the phases
    follow dq = √2 c_κ(K) dW² (41.1). Two exact laws are used: the ground-state law Q, and survival to exactly the
    horizon τ (41.7), with terminal height targets ν₁ = φ² and ν_(1/φ) = φ/J (41.9).
  - For fixed b and τ = Tb, uniformly in κ, initial phase and initial height, the joint path W₁ distance of
    (X_T, K_τ) from W_κ,b ⊗ ν_g is at most C_b[log(e+T)²/√T + e^(−γTb)] (42.3), and the joint endpoint weighted
    variation is at most C_b[1/T + e^(−γTb)] (42.4), with γ = 3λ (Theorem 42.2).
- **Coupling (§43–§46).**
  - A bounded corrector u_f = ∫ Q_t f dt gives P(|∫_a^(a+L₁) f(K_r) dr| > C√(L₁x)) ≤ Ce^(−x) under both laws
    (Lemma 43.1, Corollary 43.2).
  - A dyadic tree of Gaussian bridges couples the actual path to Brownian motion with exact marginals (45.4); the
    bridge split uses R = A − AS⁻¹A = S/4 − FS⁻¹F (45.7). Each node error is controlled by
    ‖A^½ − B^½‖_F ≤ ‖A − B‖_F/√λ_min(B) (Lemma 44.2), and the level sum gives the log loss (45.9).
  - A signed cancellation with the terminal height, ‖m_ij‖_var ≤ C/T (Lemma 46.1), and a weighted Gaussian Taylor
    bound (Lemma 46.2) give the 1/T endpoint rate (Proposition 46.3).
- **Signed coordinates (§47–§48).**
  - In y = (θ, v, D) = J_κ q the tensor is M̂ = J_κ M J_κᵀ with det M̂ = κ² det M (Corollary 47.1). The collapsed
    zero-parameter target is within C_b(|κ| + ‖M_κ − M₀‖_F) in transport but at total variation distance one
    (Corollary 47.2).
  - Without conditioning, e^(λτ) times the live endpoint measure is within C_bφ(k)[1/T + e^(−γτ)] of
    φ(k)φ(y)Γ_κ,b(z), a measure of mass φ(k)J (Proposition 47.4). Stopped phases satisfy W₁ ≤ C/√T, using
    E_kζ = (k − l)(u − k)/(2ε²) ≤ L²/(8ε²) (Proposition 47.5).
- **Confinement band (§49–§50).**
  - For A(T, R, e) = {sup_(t≤T) |e·(y_t − y₀)| < R} given survival, p(T, R, e) = (4/π + o(1))
    exp{−T[Λ_κ(πh/2R) − λ]} with h = J_κᵀe, uniformly on the nonzero collar (Theorem 49.2). The proof writes the
    projection as B(U_t) and uses the interval series H_R(u) (49.8) with its two-term bounds (49.9).
  - Hence −log p ~ (π²/4) eᵀM̂e T/R² (Theorem 50.1), with the quartic term (50.2). Along the primitive normal
    e* = (2, −2, 1)/3 the coefficient is a ≡ 1/3 and the band is exactly λ + ω²/9.
- **Entropy frontier (§51–§53).**
  - Among laws that survive and confine with probability at least r, the least relative entropy is
    −log S_k₀(T) + d_bin(r‖p), attained by r C_T(·|A) + (1 − r) C_T(·|A^c) (Theorem 51.1); the excess over survival
    is asymptotic to (1 − α)(π²/4) eᵀM̂e/δ² (51.4).
  - A bounded excess B forces V(A) ≤ (B + log 2)/log(1/p) → 0 (Corollary 52.1). Conversely the horizon laws
    C_T(·|A) with R = T^(1/4) keep every prefix within T^(−1/4) of a plane, with (1/T)D → λ (52.2). The entropy rate
    alone does not select three transport directions (Proposition 53.2).
- **Height feedback (§54–§56).**
  - A persistent controller ψ = φf, w (54.1)–(54.2) has the exact path density (55.2) and rate
    R(ψ, w) = λ + ε²∫φ²|f′|² + ¼∫w²ψ² ≥ λ, with equality only for the ground-state law Q (Theorem 55.1).
  - Centred by its own current j, the path tends to Brownian motion with D_eff = ∫ĉĉᵀρ + ε²∫χ′χ′ᵀρ; the current's
    corrector only adds a positive semidefinite tensor (Theorem 56.1).
- **Weakest direction (§57–§59).**
  - The least transport a budget B can leave in direction e is F_e(B) = sup_s [Λ_κ(√s h) − λ − B]/s, attained by the
    positive eigenfunction z_(s_B) with w = 0; the constant directions ±(2, −2, 1)/3 keep 1/9 at every budget
    (Theorem 57.1).
  - c*(1+B)⁻² ≤ min_e F_e(B) ≤ C*(1+B)⁻² (Theorem 58.1). The upper family concentrates the amplitude where the
    coefficient curve has double contact with its normal, using det(ĉ, ĉ′, ĉ″) = κ det(c, c′, c″) ≠ 0 (58.7). Every
    finite budget keeps three positive transport directions (Proposition 59.1).
- **Character feedback (§60–§64).**
  - Feedback through the wrapped primitive character α = [2θ − 2v + D], with n·ĉ = 1 (60.1), costs λ + J(f)
    (Theorem 61.1). The tensor satisfies d_f M̂ ≤ D_κ,f ≤ M̂ with d_f = ⟨f⁻²⟩⁻¹ and e*ᵀDe* = d_f/9 (Theorem 62.1).
  - The sharp boundary is one quarter: inf eᵀDe/eᵀM̂e = max(1 − 4B, 0), attained for 0 < B < 1/4 exactly by
    f² = 1 + r_B cos(α − α_c), r_B = √(1 − (1 − 4B)²), and never attained for B ≥ 1/4 (Theorem 63.1,
    Proposition 64.1). At B = 1/10, r_B = 0.8 and the ratio is 3/5.
- **Growing and critical tubes (§65–§68, §74).**
  - For R(t) = r(1+t)^α, 0 < α < 1/2, one consistent cosine law V* stays inside forever (Proposition 66.1), and both
    (D(V*_T‖P_T) − λT)/T^(1−2α) and the class infimum tend to π² m̂/(4r²(1 − 2α)) (Theorem 68.1).
  - For the square-root tube r√(1 + s), −log Q(A_T)/log(1 + T) → ν(m̂, r), the principal Dirichlet eigenvalue of
    −(d∂ₓ² − (x/2)∂ₓ) on (−r, r) at d = m̂ (Theorem 74.1); in the killed law −log P(E_T) − λT ~ ν log T, a lower bound
    for every consistent law kept in the tube (Corollary 74.2).
- **Finite records (§69–§73).**
  - A lazy killed walk table (69.3), rounded to B bits (69.4), drives height steps, and one fair sign per cell moves the
    phases along ĉ_κ (70.1)–(70.2); every prefix is lawful and stays inside I (Theorem 70.1).
  - With h = 1/n, m = n⁴ and B = ⌈8 log₂(n + 1)⌉ (70.7), the paths tend to Brownian motion with M̂_κ, using the
    stationary law (2/N) sin²(jπ/N), the gap 1 − β_a ≥ (a² − 1)/N² and the coupling bound 4m2^(−B)
    (Lemma 71.1, Proposition 71.2, Theorem 72.1). The finite law is singular, with infinite relative entropy
    (Proposition 73.1).

本片是 FIB 原生长时相位系列的第三部，约七分钟，覆盖整卷 §41–§74：原生过程的相位路径和终点高度以 (log T)²/√T（路径输运）与
1/T（联合终点）的速率趋于 Brownian 极限，证明用到有界校正子、Gauss 桥二进耦合、矩阵平方根比较与带号抵消；原始带号坐标中张量为 M̂，
行列式为 κ²det M，坍缩目标在输运意义下接近而全变差为 1；把一整段历史约束在平板中的概率为 (4/π)e^(−T[Λ−λ])，最小相对熵由二元散度
给出，而仅凭熵率无法选出三个方向；持续高度反馈的速率为 λ 加能量，最弱方向按 (1+B)⁻² 衰减；读取本原特征的反馈有精确的四分之一阈值
max(1 − 4B, 0)；增长包络的代价按 T^(1−2α) 增长，平方根临界管道的指数是 Ornstein–Uhlenbeck 主本征值 ν；最后，有限的合法数值记录
也能逼近同一输运极限，但其相对熵为无穷。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-111-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit `FIB_NATIVE_LONG_TIME_PHASE_QUANTITATIVE_BOUNDS.md` has no digestion records (no
    `Meta/Digestion/backfill/` directory for it). It is cited as the source "Q" in atoms of two other ledgers:
    `fib-native-long-time-phase-diffusion` (9 residual-open, 1 nonpropositional-inapplicable) and
    `fib-native-long-time-phase-critical-entropy` (13 residual-open).
  - No Lean declaration covers any statement shown. The volume itself says its proofs are ordinary mathematical
    proofs with no Lean/kernel certification.
- **Published results, used as external inputs.** The finale badges them as published.
  - Martingale functional limit theorem: Whitt, *Proofs of the martingale FCLT*, arXiv:0712.1929v2, Theorem 2.1(ii)
    (used in Theorems 56.1, 62.1 and 72.1).
  - Measure-level relative-entropy and Rayleigh principles: Chetrite–Touchette, *Variational and optimal control
    representations of conditioned and driven processes*, arXiv:1506.05291v3, §III.4 (52)–(56) and Appendix A.2;
    time-dependent Doob density and the discrete transform: Chetrite–Touchette, *Nonequilibrium Markov processes
    conditioned on large deviations*, arXiv:1405.5157 (§IV.1 and Appendix E).
  - Circle spectral tools: Dolbeault–Esteban–Laptev–Loss, *Magnetic rings*, arXiv:1801.03810v2, §II–§III; the related
    precedent Exner–Harrell–Loss, math-ph/9901022v1, §IV.
  - The Lifson–Jackson coefficient: Kalnin–Berezhkovskii, J. Chem. Phys. 139, 196101, DOI 10.1063/1.4832035
    (equations (5)–(7)); on screen in the character scene.
  - Oçafrain, *Quasi-stationarity for one-dimensional renormalized Brownian motion*, arXiv:1809.07547v2 (scalar
    power-envelope mechanism); Mazzolo, *Sweetest taboo processes*, arXiv:1805.07215v2, §2.2 (interval taboo
    normalization).
- **Classical tools named in the volume.** The interval sine series and the killed Feynman–Kac identity (the band
  scene badges the series as classical), Girsanov's theorem and the Brownian characterization, the relative-entropy
  chain rule and Gibbs inequality, Rayleigh duality and analytic perturbation of a simple eigenvalue, the
  bounded-increment exponential martingale bound, Gaussian maxima and bridges, Doob's inequality, Poincaré and Sobolev
  inequalities, the Hahn decomposition and the finite-chain Doob transform.
- **Project inputs, not recomputed here.** From part one (`FIB_NATIVE_LONG_TIME_PHASE_DIFFUSION.md`): Definition 35.1,
  (36.1), (36.4)–(36.8), (37.2), (37.4)–(37.9), (38.5), §39, Theorem 50.1 and the quartic coefficient of Definition 51.1
  and Theorem 51.3. From `FIB_NATIVE_TWO_CONTROL_GREEN_STABILITY.md`: Definition 25.1, (25.2)–(25.5), (26.7)–(26.8)
  and (32.2). The command action of N Theorem 9.2 and Proposition 10.2 is used in Theorem 70.1.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, scipy, sympy) runs 55 checks. These are sampled
  and finite checks, not proofs.
  - **Sample tensor.** M_κ has eigenvalues 0.001364, 0.0401, 15.53; det M = 8.4925 × 10⁻⁴ and
    det M̂ = κ² det M = 8.4925 × 10⁻⁸, λ_min(M̂) = 8.57 × 10⁻⁵; J = ∫φ = 2√(2L)/π = 0.49312.
  - **Height.** λ₂ − λ₁ = 3λ and λ₃ − λ₁ = 8λ (symbolic); sup|R_t − 1| e^(3λt) settles at 4.01 (eigen-series);
    e^(λτ)S_k(τ) = φ(k)J[1 + O(e^(−8λτ))] at three heights; φ(k_c)J = 4/π.
  - **Coupling.** ‖A^½ − B^½‖_F ≤ ‖A − B‖_F/√λ_min(B) on 3000 random pairs (30% singular A; max ratio 0.948); the
    bridge identities R = A − AS⁻¹A = S/4 − FS⁻¹F with child covariance A and zero cross covariance on 200 cases;
    Σ_(r<n) √(r+1) ≤ (n+1)^(3/2); the weighted Gaussian Taylor terms scale with slopes 1.000 and 1.994.
  - **Stopped phases.** E_kζ = (k − l)(u − k)/(2ε²) (symbolic); Monte Carlo mean exit time from the centre 0.01123
    against L²/(8ε²) = 0.01125.
  - **Band.** n·ĉ = 2A − 2B + κb = 1 identically (symbolic); the interval series equals the reflection formula and lies
    between its two-term bounds; along e*, −log p = (π²/36)T/R² − log(4/π) for five (T, R) pairs; along
    e = (1, 0, 0), m̂ = 0.06411 and the band gives −(Λ − λ − m̂r²)/r⁴ = 2.4383 × 10⁻⁶, equal to the quartic coefficient
    of D (51.2).
  - **Frontier.** d_bin(q‖p) increases on [r, 1]; d_bin(q‖p) ≥ q log(1/p) − log 2 on 2000 random pairs; along e* with
    R = T^(1/4), the excess is 27.17 nats at T = 10⁴ and 273.91 at T = 10⁶, equal to (π²/36)√T − log(4/π).
  - **Height feedback.** For a sample controller ε²∫|ψ′|² = λ + ε²∫φ²|f′|² = 145.89 and R = 146.70 ≥ λ; the corrector
    tensor ε²∫χ′χ′ᵀρ from the explicit formula (56.2) and from a finite-difference generator inverse agree and are
    positive semidefinite.
  - **Frontier in a direction.** Primal μ′(s_B) equals the dual value at 11 budgets along e = (1, 0, 0); the dual has no
    larger sampled value; along e* the band is exactly λ + s/9; det(ĉ, ĉ′, ĉ″) = −κ(H² − κ²)/(2H³(k − α_κ)³)
    (symbolic); along the double-contact normal at k* = 0.2, F_e(B) has log-log slope −1.977; over 24 double-contact
    normals, min F_e(B)·(1+B)² stays between 0.014 and 0.042 for B = 10² … 10⁵; the sublevel ratio
    |{|a_e| ≤ r}|/√r stays bounded over 440 normals.
  - **Character feedback.** d = √(1 − r²) and J = (1 − √(1 − r²))/4 for f_r; d_f ≥ 1 − 4J(f) for 60 random positive
    policies; ⟨g, (−L_f)⁻¹g⟩ = (1 − d_f)/4; for f² = 1 + 0.8 cos the full tensor (spectral computation) satisfies
    d_f M̂ ≤ D ≤ M̂ with e*ᵀDe* = 0.06667 = 0.6/9 and lower-side kernel ℝ(2, −2, 1); Monte Carlo of the character
    diffusion gives d_f ≈ 0.603 (4000 paths).
  - **Tubes.** The integral (66.11) (symbolic); along e* with α = 1/4, r = 1, an implicit PDE for the tube survival
    gives −log P/(cT^(1/2)) = 0.768, 0.966, 0.995 at T = 10², 10⁴, 10⁶ (c = 0.5483); ν(d, √(2d)) = 1 and
    ν(d, √(d(6 − 2√6))) = 2 from the Hermite eigenfunctions x² − 2d and x⁴ − 12dx² + 12d² (symbolic and numeric);
    Monte Carlo of the killed Ornstein–Uhlenbeck process (2 × 10⁵ paths) gives exponent 1.001 at r = √2/3.
  - **Finite records.** Row sums, exact outward zeros, the stationary law (2/N) sin²(jπ/N), the spectrum
    β_a = (1 + cos(aπ/N))/(1 + cos(π/N)) and 1 − β_a ≥ (a² − 1)/N²; B-bit rows with total variation ≤ 4·2^(−B); the
    generator expansion (72.6); the Riemann error of (71.3) with slope 0.982 in h; the bounded corrector from a
    deterministic start; B = 28, 36, 54 and 4m2^(−B) = 1.49 × 10⁻⁴, 9.31 × 10⁻⁶, 2.22 × 10⁻⁸ for n = 10, 20, 100.
- **Data drawn on screen.**
  - The two terminal height targets, and the two rate curves.
  - The square-root comparison histogram.
  - The sample matrix M̂ and the mean exit-time curve with its Monte Carlo point.
  - The interval series with its bounds and the −log p points.
  - The binary divergence curve.
  - The controller density ψ², φ² and w, and the sample eigenvalues.
  - The three directional frontiers on log-log axes.
  - The random-policy dots, the f_r family and the line 1 − 4J.
  - The tube PDE ratio and the curve ν(1/9, r).
  - The N = 8 table, one generated finite history, the resource table and the Riemann error dots.
- **Illustrative visuals.** These are illustrations, not data:
  - the confined paths in slabs and tubes, and the flattened path on a plane;
  - the dyadic tree;
  - the two Gaussian ellipses;
  - the double-contact sketch;
  - the circle with the radial policy curve.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
