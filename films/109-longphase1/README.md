# 109 · FIB-NATIVE LONG-TIME PHASE I · ONE DIRECTION, RANK THREE AND THE HEIGHT IN THE PHASE · FIB 原生长时相位 第一部 · 一个方向、秩三与相位中的高度

This is part one of the four-part FIB-NATIVE LONG-TIME PHASE series and runs 7 minutes 22 seconds. It covers the whole of
`FIB_NATIVE_LONG_TIME_PHASE_DIFFUSION.md` (§35–§69) at trureturing subject commit `d3e7a2a339`. The volume builds on
the native two-control Green stability volume (films 106–108): a height diffuses between two absorbing walls, and
three winding phases are driven by one noise along a height-dependent vector c_κ(k). The film follows them for a long
time on the complete winding cover. Parts two to four (weak binding, quantitative bounds, steering action and critical
entropy) are separate films.

## The film, scene by scene

- **Native tensor (§35–§36, Theorem 36.1, Proposition 36.2).**
  - The cover is I × ℝ³ with generator ε²∂²_k + (c_κ(k)·∂_q)², killed at both height faces. The phases move along one
    direction c_κ(k) at each instant.
  - M_κ = ∫ c_κ c_κᵀ φ² dk satisfies m·Id ≤ M_κ ≤ M·Id uniformly on the closed parameter interval, κ = 0 included,
    because det(c, c′, c″) ≠ 0 (at κ = 0 it is −1/(2Hk³)).
  - At the wall M₀ has the explicit entries (36.11); its cross term ⟨A₀B₀⟩ is negative, so the tensor is not diagonal.
  - T^(3/2) e^(λTs) g_κ(Ts; k, k′; √T z) → φ(k)φ(k′) Γ_κ,s(z), where Γ_κ,s is the centred Gaussian of covariance
    2sM_κ. The limit is uniform with no relation between T and κ. The lowest band has Hessian 2M_κ (36.4).
- **Two height laws (§37–§38, Theorems 37.2 and 38.1, Proposition 38.2).**
  - Survival is the sine series S_k(t) = Σ_(n odd) e^(−n²λt) φₙ(k) Jₙ with Jₙ = 2√(2d)/(nπ), and
    S_k(t) = e^(−λt) φ(k) J_φ [1 + O(e^(−8λt))].
  - The ground-state (Doob) process has height law φ² dk. Survivors to a fixed horizon end in the Yaglom law
    φ dk/J_φ. The real cover has no invariant probability.
  - Under either law the whole scaled phase path X_T(s) = (q_Ts − q)/√T converges to Brownian motion of covariance
    2 min(s, r) M_κ, independent of the terminal height, on the full moving horizon.
  - Unconditioned, the killed law goes to the cemetery; the mean lifetime is E_k ζ = (k − l)(u − k)/(2ε²).
- **Ranks (§39–§40, Theorems 39.1 and 39.2, Proposition 40.1).**
  - The instantaneous phase covariance has rank one and the full symbol rank two; only the time average over heights
    gives rank three.
  - In the lifted coordinates y = J_κ q, J_κ = diag(1, 1, κ), the tensor is J_κ M_κ J_κᵀ with determinant κ² det M_κ.
  - On the actual zero leaf D is frozen. Two phases move with the rank-two tensor N₀ (det(a₀, a₀′) = −1/(4H)), and on
    the wrapped leaf e^(λt) p → φ(k)φ(k′)/(2π)².
  - Topological dimension, number of real phases, long-time rank, instantaneous rank and local heat dimension are
    different counts. None is a physical dimension.
- **Threshold Green function (§41–§42, Lemma 41.2, Theorem 42.1, Proposition 42.2).**
  - Native bounds hold at all times and both walls. The threshold Green function satisfies
    |G_κ,m − p Y_κ,m| ≤ C p |r|⁻³ for |r| ≥ 1, uniformly in m ≥ 0, with
    Y_κ,m(r) = e^(−√m d)/(4π √det M_κ · d), d = √(rᵀM_κ⁻¹r) and p = φ(k)φ(k′).
  - At distinct heights and coincident phases G is finite and positive, while Y has its pole there: the projected
    pole is not a value.
- **Hidden circle (§43–§44, Theorems 43.2, 44.2 and 44.3, Propositions 43.3 and 44.4).**
  - With the hidden circle of length L = 2π/|κ| the response crosses over from the three-dimensional law to the
    two-dimensional K₀ law (43.8).
  - The joint-point mixing coefficient is the Schur complement S_κ = d* − hᵀN⁻¹h, strictly below d* = ⟨b_κ²⟩, and the
    lowest hidden block has gap S_κ κ² (1 + O(κ²)).
  - The compensated kernel is A_κ/t + O(t⁻²) with A_κ = p/(4πL √det N_κ), so G^L_m diverges like A_κ log(1/m), with a
    normalised finite part.
  - When L → ∞ and m → 0 together, the extra tail T_κ(L, m) = −log(1 − e^(−L√(m/S)))/(2πL √det N) can vanish
    (m = L⁻⁴), tend to a constant (m = L⁻²e^(−cL)) or grow (m = L⁻²e^(−L²)).
- **Infrared ledger (§45–§47, Theorems 45.1 and 45.2, Proposition 46.1).**
  - Without the threshold shift the killed Green function has total mass E_k ζ and a far field ≤ Cp e^(−c|r|).
  - The ground-state process is transient on the real cover, recurrent with infinite invariant measure on the
    cylinder and on the zero leaf (logarithmic divergence), and positive recurrent on the fully wrapped torus with pole
    p/((2π)³ m).
  - None of this selects a physical dimension.
- **Return memory (§48–§50, Theorems 48.2, 49.1 and 50.1, Proposition 49.2).**
  - The ground-height response u(t, η) obeys ∂_t u = −a u + ∫₀ᵗ K_κ(t − s, η) u(s) ds with a = ηᵀM_κη, and
    ũ(z, η) = 1/(z + a − Σ_κ(z, η)).
  - The only directions without memory are the line A_κ = ℝ(2, −2, κ), from 2A_κ − 2B_κ + κb_κ = 1. There
    u = e^(−t²s); every other direction has u(2s) > u(s)².
  - The torus characters on that line are j(2, −2, 1); on the zero leaf the autonomous circle is θ − v.
- **Quartic coefficient (§51–§54, Theorems 51.2, 51.3, 52.1 and 53.1, Proposition 51.4).**
  - B₄(e) = ⟨f_e, ℛ f_e⟩_π ≥ 0, with equality exactly on A_κ.
  - For e* = (−2k_c, 2k_c − 2H, 0) at κ = 0, m = d²(1/12 − 1/(2π²)) and
    B₄ = (d⁶/ε²)(−1/(720π²) + 5/(48π⁴) − 7/(8π⁶)).
  - In the band B₄ enters with a minus sign, Λ(re) = λ + m_e r² − B₄ r⁴ + …, while the fourth cumulant is
    24[t B₄ − ⟨f, ℛ²(1 − e^(−tℒ)) f⟩] > 0.
  - The stationary law differs from its Gaussian by exactly order 1/T, c/T ≤ ‖L(X_T) − Γ_κ‖ ≤ C/T, uniformly in κ,
    with a signed correction whose Fourier transform is B₄(ξ) e^(−ξᵀMξ).
- **Height from phase (§55–§57 and §60, Theorems 55.2, 56.1, 57.1 and 57.2, Proposition 60.1).**
  - The variance rate of v is a_κ = 2B_κ², strictly increasing in height, so the continuous wrapped v record
    recovers K_t at every positive time; at time zero the law of K₀ is still φ² dk.
  - Every real projection and integer character follows one rule: a nonzero residue C_η identifies height; with zero
    residue the coefficient is affine and fails exactly when its zero lies inside I.
  - On the zero leaf the character e^(i(θ+v)) folds at H/2.
- **Finite samples (§58–§59, Theorems 58.2, 58.3 and 59.1).**
  - For every n the posterior of K_τ from n wrapped samples keeps full support.
  - The best squared risk satisfies c_τ n^(−1/2) ≤ R_n,κ ≤ C_τ n^(−1/2), uniformly in κ. The upper bound uses the last
    ⌈√n⌉ increments; the lower bound is a Bayesian information argument inside the same source.
- **Unknown calibration (§62–§68, Theorems 63.1, 64.1, 65.1, 66.1 and 67.1).**
  - Three nested variations of the v record recover |κ| and the shifted height U = K − α_κ.
  - The change (κ, K) ↦ (−κ, K − 2κ) leaves the v coefficient unchanged, so at every fixed horizon the sign stays
    ambiguous with positive probability. Every estimator has paired-prior risk at least r² m_r,t, with
    m_r,t ≥ (2/π²) e^(−15λt).
  - The infinite history resolves the sign, and adding either the θ record or the D record is sufficient and
    minimal. §69 hands the full-state attractive problem to part two.

一部约七分钟的片子，FIB 原生长时相位系列第一部：一个噪声方向在长时间里被高度平均成秩三的张量 M_κ，并给出一致的点核极限；存活与 Yaglom 律给出两种终点高度律，整条相位路径趋于协方差 2M_κ 的 Brownian 运动；各种秩与维数彼此分开；阈值 Green 函数是各向异性 Yukawa 律，投影极点不是取值；隐藏圆带来二维 K₀ 交叉、Schur 补混合系数与对数红外尾；各种几何各有红外律；回返记忆只在一条直线上消失；原生四次系数给出恰为 1/T 阶的偏差；连续的 v 记录恢复高度，有限样本的风险恰为 n^(−1/2) 阶；κ 未知时符号在有限时限内无法分辨。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-109-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the volume's digestion ledger has 10 atoms, all from §35–§40: 9 residual-open and
    1 nonpropositional-inapplicable.
  - The nonpropositional-inapplicable atom is Proposition 36.2. Its settlement receipt says the statement closes from
    pinned Mathlib with no project GID and no new frozen module, so it carries no Lean badge.
  - §41–§69 have no digestion records. No Lean declaration covers any statement shown.
- **Classical tools named in the volume.** The finale badges them as classical:
  - the martingale functional central limit theorem (Whitt, arXiv:0712.1929);
  - the ground-state Doob transform (compare Champagnat–Villemonais, arXiv:1404.1349);
  - the recurrence criterion for symmetric Dirichlet forms (Fukushima–Oshima–Takeda, Theorem 1.6.3);
  - the van Trees Bayesian information inequality (Gill–Levit, Bernoulli 1995).
  - The volume also uses Föllmer's quadratic variation, bounded-perturbation and Fourier arguments, and compares
    with Geng–Iyer, Kha, Ballu, Dusson–Sigal–Stamm, Alexandre et al., Chechkin et al., Mancino–Mariotti–Toscano and
    Reiß; it states that none of these comparisons is imported as a proof.
- **Project inputs, not recomputed here.** The coefficients, the all-frequency coercivity and the bracket independence
  of the native Green stability volume (G Definition 25.1, (26.5)–(26.12), (32.2)), the one-direction perturbation
  method of the critical cutoff volume, the same-clock obstruction of the Auric transport volume and the compression
  defect of the free-diffusion volume. They are badged as theory.
- **Theory volume, argued but not kernel-checked.** Every content scene is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following, with the illustration data
  Z = 0.2 (H = 0.4), I = (0.1, 0.3), ε = 0.1, λ = ε²π²/d² = 2.467 and parameter interval [−0.04, 0.04].
  - **Algebra (sympy, exact).** 2A − 2B + κb = 1; c₀ = ((H − k)/2H, −k/2H, 1/k − 1/H);
    det(c, c′, c″) = −(H² − κ²)/(2H³(k − α)³); det(a₀, a₀′) = −1/(4H); the rational identity (50.4); the residue
    (56.2) and the character form (57.3); the partial fraction (55.5); −2HB_κ(K) = F_r(K − α_κ) for both signs and its
    invariance under (κ, K) ↦ (−κ, K − 2κ); the nested-variation inverses (63.3)–(63.5); and (66.2), (66.4).
  - **Tensor.** M₀ = [[0.0645, −0.0605, 0.714], [−0.0605, 0.0645, −0.625], [0.714, −0.625, 8.19]], equal to (36.11);
    eigenvalues 1.7·10⁻⁴, 1.9·10⁻² and 8.30; the smallest eigenvalue over κ ∈ [−0.04, 0.04] is 1.0·10⁻⁴. The lowest
    Dirichlet eigenvalue at |η| = 0.02 (sine Galerkin) gives (Λ − λ)/|η|² = 0.06454, 0.06454, 8.18959 and 2.79225
    against ηᵀM₀η = 0.06454, 0.06454, 8.19151 and 2.79250.
  - **Survival.** The sine series agrees with a Crank–Nicolson heat solution (0.541198 vs 0.541065 at t = 0.3,
    k = 0.17); the relative error at λt = 1 is 3.35·10⁻⁴, inside the stated bound; E_k ζ = 0.50 at k = 0.2;
    J_φ = 0.4026; height variances 0.001307 = d²(1/12 − 1/(2π²)) under φ² and 0.001894 under the Yaglom law.
  - **Paths (Monte Carlo).** 6000 exact-transition Q chains from k = 0.2 to T = 4 give cov(X_T)/2M₀ between 1.002 and
    1.008 (the exact finite-T mean is within 0.4 % of 2M₀) and corr(K_T, X₃²) = −0.022. 4373 of 40000 killed paths
    survive to t = 1 (S = 0.1080); their heights follow φ/J_φ.
  - **Green and circle.** Numerical Laplace integrals of Γ_t equal the anisotropic Yukawa law to 8·10⁻⁸. At κ = 0.03
    (L = 209.4) the image sum equals the K₀ mode expansion to 3·10⁻¹⁴; S = 0.342 and d* = 16.26; the lowest hidden
    gap is 0.9999 S κ². The image sum matches the 3-D law plus the circle tail near the source and the 2-D K₀ law
    far away to 10⁻⁷. The tail formula equals the summed noncentral images to 10⁻⁶; the three examples give
    normalised tails 0.047 → 0.0008, → 0.99985 and T/L → 1.000000. P(½) = 4 log 2 and the expansion (44.8) hold.
  - **Memory.** The memory equation, solved directly, reproduces the spectral response to 3.9·10⁻⁷; ũ(0) = 0.544277
    = 1/(a − Σ(0)); B ≥ 3λ; (49.6) agrees to 3·10⁻⁷; the autonomous direction has zero defect and
    u = e^(−t²s); 30 random directions all have positive defect.
  - **Quartic.** m = 1.3069·10⁻³; the closed value B₄ = 1.184512·10⁻⁷ (bracket 1.8508·10⁻⁵) equals the spectral sum
    to 10⁻⁸ and the quadrature form to 10⁻⁴; a fit of the computed band gives quartic coefficient −1.184511·10⁻⁷;
    the fourth-cumulant formula matches the r⁴ coefficient of log u; T·(E cos(z₃/2) − Gaussian) rises from 0.03565
    at T = 2 to 0.03864 at T = 256, against the limit B₄(ξ) e^(−ξᵀM₀ξ) = 0.03866.
  - **Observation.** a_κ = 2B_κ² is strictly increasing for κ = −0.04, 0, 0.04; on the zero leaf θ and v identify,
    θ + v folds at 0.2 and θ − v is autonomous; at κ = 0.03 the character (1, 1, 0) has E ≠ 0.
  - **Samples (Monte Carlo).** The Theorem 58.3 estimator on 8000 stationary paths per n, n = 64 … 65536, has fitted
    risk slope −0.479 and √n·risk between 0.020 and 0.024.
  - **Calibration.** m_r,t ≥ (2/π²)e^(−15λt) for r = 0.005, 0.02 and t = 0.05, 0.4, 2; one simulated path with
    κ = +0.02 excludes the minus candidate at t = 1.19.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The ray directions ±M₀^(−1/2)c₀(k), the M₀ grid and the Hessian table.
  - The φ² and φ/J_φ curves with both Monte Carlo histograms, the simulated x-phase paths and the covariance grid.
  - The eigenvalue bars.
  - The Yukawa curves with the Laplace dots.
  - The crossover dots and the three tail curves.
  - The memory and defect curves.
  - The band-ratio dots and the 1/T correction curve.
  - The a₀(k) curve and the three f² curves.
  - The wrapped sample points, the risk dots and the calibration path.
- **Illustrative visuals.** These are illustrations, not data:
  - the height interval with walls, the phase dials and the hidden-circle cylinder;
  - the native-versus-effective pole sketch in the Green scene;
  - the rank boxes, the infrared ledger table and the nested-variation boxes.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
