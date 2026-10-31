# 112 · FIB-NATIVE LONG-TIME PHASE IV · STEERING ACTION AND CRITICAL TUBE ENTROPY · FIB 原生长时相位 第四部 · 操控作用量与临界管熵

This is part four, the last film of the four-part FIB-NATIVE LONG-TIME PHASE series, and runs 6 minutes 40 seconds. It
covers two volumes at trureturing subject commit `3d4c9c5015`:
- `FIB_NATIVE_LONG_TIME_PHASE_STEERING_ACTION.md`, §74–§78 (the whole volume);
- `FIB_NATIVE_LONG_TIME_PHASE_CRITICAL_ENTROPY.md`, §75–§80 (the whole volume).

Both volumes build on the quantitative-bounds volume of part three. The first asks what it costs to steer the three
winding phases of the signed source at a chosen average velocity. The second asks what relative entropy keeps one phase
reading inside a square-root tube forever, and shows that one law, chosen before any horizon, pays the sharp critical
coefficient.

## The film, scene by scene

- **Signed source (steering §74, Definitions 74.1–74.3).**
  - The source is c(k) = ĉ_κ(k) = (A_κ, B_κ, κ b_κ)(k) on I = (l, u), with μ(dk) = φ(k)² dk, μ(I) = 1, and
    M = ∫ c cᵀ dμ > 0. The covector n = (2, −2, 1) satisfies nᵀc(k) = 1 for every k.
  - A command (a, b) executes as K_t = k₀ + a(t), Y_t − y₀ = ∫₀ᵗ c(K_s) ḃ(s) ds. Its action is
    E(a, b) = ∫₀ᵀ {ȧ²/ε² + ḃ²} ds, with no factor ½, on the original clock with every hold, latency and installation
    interval kept.
  - Service quotas are separate: ι ≥ t₀ + U/r_cpu + L/r_write + N/r_load and
    E* ≥ E + E₀ + e_cpu U + e_write L + e_load N + (p₀ + p_mem L)T (74.3). The finite infima A_T(w, η) are taken over
    finite rational tapes that return the height to k₀ (74.4).
- **Steering gauge (Theorem 75.1).**
  - B = conv{±c(k) : k ∈ [l, u]} is a full-dimensional compact symmetric body and its gauge γ_B is a norm.
  - For every history, Cauchy–Schwarz over the whole clock gives |pᵀW_T| ≤ h_B(p)(T⁻¹∫ḃ²)^½, so
    E/T ≥ γ_B(W_T)² (75.4). Both limits of the finite infima equal γ_B(w)² (75.2).
  - Attainment: write w = Σ βᵢ c(sᵢ) with at most four atoms and Σ|βᵢ| = γ_B(w), dwell a fraction λᵢ = |βᵢ|/r at
    sᵢ with phase speed r sgn βᵢ (75.5); the rate is r².
- **Rational tape (Theorem 75.1, execution).**
  - Only rational data are issued: heights k₀ + qᵢ approached from inside, rational weights and speeds (75.6), heights
    visited in increasing order and a final return to k₀. Travel costs at most 4(u − l)²/ε².
  - The tape has O_j(1 + log T) bits; installation and holds grow like a power of log T, so D_j(T)/T → 0 and
    W_T = (S/T)ν_j, E/T = (S/T)e_j + E_P/T (75.7). A diagonal family attains γ_B(w)². No exact endpoint W_T = w is
    claimed.
- **Face and contacts (Theorem 76.1).**
  - The covariance ellipsoid E_M = {w : wᵀM⁻¹w ≤ 1} lies in B, and B ∩ {nᵀw = 1} = conv c([l, u]) is a flat face of
    affine dimension two; nᵀMn = 1 (76.1).
  - ∂E_M ∩ ∂B = {Mn, −Mn}; γ_B(w)² ≤ wᵀM⁻¹w with equality exactly for w ∈ ℝMn (76.2). The equality case uses the
    exhaustive classification of D Theorem 50.1. So the unrestricted action is not a positive definite quadratic form.
- **Occupation action (Theorem 77.2, Definition 78.1, Proposition 78.2).**
  - Requiring the empirical Gram matrix G_T = T⁻¹∫ c(K_t)c(K_t)ᵀ dt → M over the whole clock raises the action to
    exactly wᵀM⁻¹w (77.3), from E/T ≥ 2pᵀW_T − pᵀG_T p (77.4). Rational quadrature tapes with dᵢ = c(kᵢ)ᵀM_N⁻¹w
    attain it (77.5)–(77.7).
  - The convex-design step is classical Elfving geometry (Elfving 1952). The covariance gives the quadratic action only
    on ℝMn. Neither action supplies the distance law, field and guard descent of the observer geometry, and raising p₀
    changes the service cost but not c, M or either action formula.
- **Critical tube (critical entropy §75, Definitions 75.1–75.2).**
  - For a unit vector e, a(k) = e·ĉ_κ(k), m = ∫ a² φ² dk > 0, A = ‖a‖²_∞, X_t = e·(y_t − y₀) and
    V(t) = 2∫₀ᵗ a(K_s)² ds. The class C_crit,r contains consistent infinite laws with ζ = ∞,
    |X_t| < r√(1 + t) at every real t, and finite divergence from P_T on every full prefix.
  - Part three (quantitative bounds, Corollary 74.2) gives lim inf (D(V_T‖P_T) − λT)/log(1 + T) ≥ ν(m, r), where
    λ = ε²π²/(u − l)² and ν is the principal Dirichlet eigenvalue of −(m∂²_z − (z/2)∂_z) on (−r, r).
- **One law attains (Theorem 76.1).**
  - A bounded corrector and Azuma's inequality give V(t) ≤ v(t) = 2mt + C((1 + t)^p − 1), p ∈ (1/2, 1), on a height
    event G with q_G > 0 (76.2), (76.6)–(76.7); the height is conditioned on G.
  - With τ = v⁻¹, ρ = √(1 + τ) and s(v(t)) = log(1 + t) + Cp(1 − (1 + t)^(p−1))/(2m(1 − p)) (76.8), the stretched
    conditioned OU path B*_u = ρ(u) Y_s(u) stays strictly inside the moving tube (76.10)–(76.11).
  - d(V*)_T/dP_T ≤ C₁ exp{λT + ν s(2AT)} (76.4), so D((V*)_T‖P_T) ≤ λT + ν log(1 + T) + O(1) (76.5), and the
    normalized limit is ν(m, r) (76.1).
- **Full vector and squeeze (§76, Corollary 77.1).**
  - The full three-phase vector is rebuilt from K, B* and an independent Brownian H that fills the times where a = 0
    (76.16); X_t = B*_V(t) (76.18), so |X_t| < r√(1 + τ(V(t))) ≤ r√(1 + t) at every real time, plateaus included
    (76.20).
  - −log P(E_T) ≤ I_r(T) ≤ D((V*)_T‖P_T) (77.5), so (I_r(T) − λT)/log(1 + T) → ν(m, r), and both inf lim inf and
    inf lim sup over the class equal ν (77.2)–(77.3).
- **Full height path (Theorem 78.2, Corollary 79.1, §80).**
  - The random envelope constant C(K) = max(1, ⌈R(K)⌉) has E C < ∞, because S = sup_n |N_n|/n^p is integrable
    (78.5) and R ≤ c₀ + c₁S (78.8).
  - The log-likelihood bound is linear in c: |J_S| ≤ j₀ + j₁c (78.12), so only the first moment of C enters (78.17).
    The mixture Ṽ = Q_K(dK) μ_C(K)(dB) W(dH) keeps the entire height-path law, K#V = Q_K, with the same sharp
    coefficient ν (78.2), (79.2)–(79.3). D(V‖P) ≤ D(V‖Q) + log M (78.23) transports the bound.
  - C(K) may read the future height path, so this is one probability law, not an adapted executable control.

FIB 原生长时相位系列第四部、也是最后一部，约六分四十秒。前半讲操控作用量：带符号源的系数曲线 c(k) 生成对称凸体 B，长时单位时间作用量的精确值是规范的平方 γ_B(w)²，只用有理磁带、按递增顺序访问高度并回到 k₀ 即可渐近达到；输运协方差椭球位于 B 内，B 在 nᵀw = 1 上有二维平坦面，两者只在 ±Mn 接触，因此 γ_B² ≤ wᵀM⁻¹w，等号恰在 ℝMn 上；若再要求经验 Gram 矩阵趋于 M，作用量恰为 wᵀM⁻¹w。后半讲临界管熵：一条与时域无关的律，在随机时钟的包络事件上条件化高度，用拉伸的条件化 Ornstein–Uhlenbeck 路径重建完整三相位向量，散度至多 λT + ν log(1+T) + O(1)，与第三部的下界合成精确系数 ν；用随机而均值有限的包络常数 C(K)，还能保留整条高度路径的律而系数不变。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-112-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the steering-action volume has no digestion records.
  - The critical-entropy volume has 13 atoms, all residual-open.
  - No Lean declaration covers any statement shown.
- **Published and classical results, used as inputs.** The occupation scene and the finale badge them as classical.
  - Elfving geometry: G. Elfving, *Optimum Allocation in Linear Regression Theory*, Ann. Math. Stat. 23, 255–262,
    DOI 10.1214/aoms/1177729442; exposition in G. Sagnol, arXiv:0912.5467v1, §2, Theorem 2.1.
  - The generalized Doob reference behind the quantitative-bounds construction: Chetrite–Touchette, arXiv:1405.5157v2
    (named in §80; its path-density formulas are suppliers only).
  - Classical tools named in the volumes: the support/gauge correspondence, Cauchy–Schwarz, OU ground-state (Doob)
    conditioning, stopped Girsanov with Novikov's condition, Azuma's inequality and Borel–Cantelli for the bounded
    corrector, the variational entropy formula and data processing.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the quantitative-bounds volume (part three): Definitions 69.1–69.2 and the native critical tube exponent and
    entropy lower bound, Theorem 74.1 and Corollary 74.2;
  - D Theorem 50.1 (the constant readings pᵀc(k) are exactly p ∈ ℝn);
  - the Observer §16 distance law and the Recovery geometry Theorem 5.2 and Corollary 5.3 (finite-atom gauge and
    support), which the steering volume cites as already present.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script recomputes the numbers on screen for one concrete data set,
  the same as film 109: Z = 0.2 (H = 0.4), I = (0.1, 0.3), ε = 0.1, κ = 0.03, k₀ = 0.2. All five probabilities are
  positive on [l, u].
  - **Source.** nᵀc(k) = 2A_κ − 2B_κ + κb_κ = 1 symbolically. λ = ε²π²/d² = 2.4674. M has eigenvalues
    1.55·10⁻⁴, 4.74·10⁻³ and 0.1115, nᵀMn = 1 and Mn = ∫ c dμ = (0.2356, −0.2083, 0.1122).
  - **Gauge.** For w = (1, 0, 0): atoms at k = 0.1, 0.16694 and 0.3 with β = (−3.178, 8.835, −3.657), so
    r = γ_B(w) = 15.671 and γ_B(w)² = 245.576. A dual covector with |pᵀc(k)| ≤ 1 on 200 001 heights and pᵀw = r
    certifies the value. A linear program on 4001 heights agrees and uses three atoms. Dwell fractions are 0.203,
    0.564 and 0.233 at phase speed ∓15.67.
  - **Lower bounds.** 400 random dwell/hold histories satisfy E/T ≥ γ_B(W_T)². 2000 random p satisfy
    h_B(p)² ≥ pᵀMp, with equality at p = n. 400 random histories satisfy (77.4) and E/T ≥ W_TᵀG_T⁻¹W_T.
  - **Tape.** Rational designs with outer heights 1/100, 1/1000, 1/10⁴ and 1/10⁵ from the walls have rates 403.81,
    257.41, 246.74 and 245.71, and velocity error below 4·10⁻⁵. The 1/1000 design visits 0.101, 0.166935 and 0.299 with
    weights 205711/10⁶, 56233/10⁵, 231959/10⁶ and speeds ∓4011/250. Its travel action is 4.14 ≤ 16 and its height
    variation 0.396 ≤ 0.4. With the illustrative overhead D(T) = (1 + ⌈log₂(T + 1)⌉)² + 11, E/T reaches
    e_j(1 − 4.5·10⁻⁴) at T = 10⁶. The tape length grows from 302 to 394 bits for T = 10² … 10⁶.
  - **Face and contacts.** The face c([l, u]) has two nonzero singular values (the third below 10⁻¹²), and Mn lies
    inside its hull. In a plane through Mn and the direction where B extends least (coordinates where E_M is round),
    the B section contains the unit circle and touches it only at ±Mn; its radius ranges from 1 to 2.84. Over 300 random
    directions γ_B²/wᵀM⁻¹w lies between 0.0135 and 0.353.
  - **Occupation.** wᵀM⁻¹w = 2592.34, 838.35 and 3248.89 for unit θ, v and D, against γ_B² = 245.58, 72.66 and
    131.39; both equal 1 at w = Mn. Midpoint quadrature has ‖M_N − M‖ falling from 4.7·10⁻³ (N = 2) to 1.2·10⁻⁶
    (N = 128). At N = 64 the design velocity is exact and its rate is 2586.35, within 0.5 % of 2592.34.
  - **Critical tube.** With e = (1, 0, 0): m = 0.056177, A = 0.072482 (A/m = 1.290), a ∈ [0.146, 0.269]. At
    r = √(2m) = 0.33519 the eigenfunction is ψ = 1 − z²/r² and ν = 1 exactly (symbolic and finite differences). At
    r = √(3 − √6)·√(2m) = 0.742·√(2m), ν = 2 (root of He₄). ν decreases in r.
  - **Corrector.** Solving the ground-state Poisson equation gives ‖u‖ = 0.00345, ‖a² − m‖ = 0.0350, b = 0.0419.
    With p = 3/4, d_p = 0.6307, c₀ = 0.133, c₁ = 3.17, and the bound gives E S ≤ 1 + 4b²Σ… ≈ 1 and E C ≤ 4.30.
  - **Clock and envelope.** 300 simulated ground-state height paths (θ = arccos X, Euler steps of 10⁻³, to t = 300)
    have occupation within 0.006 of sin² in L¹, V(300)/(2m·300) = 1.0004 on average, and sup ratio
    (V − 2mt)/((1 + t)^(3/4) − 1) at most 0.039, so C(K) = 1 on every sampled path.
  - **Time change.** (76.8) holds to 10⁻⁶ at t = 0.5, 3 and 40 (C = 1, p = 3/4); ∫|η|dS = Cp/(4m(1 − p)) = 13.35;
    (76.24) holds at T = 10 and 1000; s(2AT) − log(1 + T) increases to Cp/(2m(1 − p)) + log(A/m) = 26.96.
  - **One sample of V*.** One simulated path X_t = ρ(V(t)) Y_s(V(t)) on 0 ≤ t ≤ 100 stays inside
    r√(1 + τ(V(t))) ≤ r√(1 + t), at most 0.73 of the outer tube.
  - **Squeeze, scalar case.** For the deterministic clock 2mt at r = √(2m), an exact killed-OU eigen-expansion gives
    −log P(tube) = log(1 + T) − 0.197 + o(1) and the divergence of the one law log(1 + T) − 0.161 + o(1). The support
    inequality holds at every sampled T.
  - **Full-height constants.** j₀ = r²/(4m) = 1/2, j₁ = 16.69, B₀ = 1/2, B₁ = 43.39, L_c = 13.35c; (78.11) checked for
    c = 1, 2 and 5. 500 random discrete laws satisfy (78.23), and 500 satisfy the support inequality (77.4).
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The three components of c(k) and the φ² profile.
  - The steering body B (hull of 82 sampled points of ±c) with the covariance ellipsoid's principal ellipses, the three
    signed atoms and w/γ_B(w).
  - The dwell bars, the rational-design rates, the E/T curve.
  - The face polygon with Mn, and the whitened slice.
  - The ‖M_N − M‖ curve and the grouped action bars.
  - The ν(m, r) curve, the simulated clock deviations with the envelope, the V* sample path with both tubes, and the
    scalar squeeze curves.
- **Illustrative visuals.** These are illustrations, not data:
  - the timeline bar of install, move, hold and dwell segments;
  - the schematic height schedule (heights are the design values, time is not to scale);
  - the tube band in the critical-tube scene;
  - the reconstruction and kernel diagrams, and the μ_c cells.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
