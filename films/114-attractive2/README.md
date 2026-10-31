# 114 · FIB-NATIVE ATTRACTIVE BOUNDARY II · GREEN TAIL, BOUNDED COUNT AND THE WALL PHASE · FIB 原生吸引边界响应 第二部 · 格林尾、有界计数与墙相位

This is the second of three films on the FIB-native attractive boundary response and runs about 7½ minutes (7:26). It
covers `FIB_NATIVE_ATTRACTIVE_BOUNDARY_RESPONSE_GREEN_TAIL.md`, §20–§30, at trureturing subject commit `ab29bb9a57`.
Part one (film 113) covers the parent volume `FIB_NATIVE_ATTRACTIVE_BOUNDARY_RESPONSE.md`; part three covers the
gluing volume.

The film follows the complete heat source into its tail, bounds the counting error of the attractive operator, isolates
one negative channel and builds the exterior waves that carry its phase. The volume has no numerical examples. For the
numbers on screen this film fixes n = 2, the contour height α = π/4 and the coupling g = 8. These are choices made for
the film, not values stated in the volume.

## The film, scene by scene

- **Complete marginal (§20, Theorem 20.2).**
  - With central noise ε, integrate the heat column over all heat time and the whole omitted fibre ℝ^(2n−2). This gives
    the complete marginal M_n,ε.
  - On the gauge sphere Σ = {ρ⁴ + 16z² = 1}, both axis points included, sup_Σ |M_n,ε − M_n,0| ≤ C_n ε² for
    0 ≤ ε ≤ ε_n. Here M_n,0(ω(a)) = q_n(a)/(2π).
  - The proof shifts the Fourier contour to u = v + iα inside the pole-free strip |Im u| < π/2. This gives explicit
    constants b_α, K_n,α, D_α, ε_n = min{1, √(D_α/(2α²))} and C_n = K_n,α/(2π² D_α²) (20.7).
  - For n = 2 and α = π/4: b_α = α cot α = π/4, D_α = π/16, ε₂ = 1/√(2π) ≈ 0.399, K = 5.4463 and
    C₂ = 128K/π⁴ ≈ 7.16. The recomputed supremum is about ε²/2, attained on the axis.
- **Exterior tail (§20, Corollaries 20.3–20.5; §25, Proposition 25.2).**
  - By complete-field scaling, |M_n,1(ξ) − M_n,0(ξ)| ≤ C_n R⁻⁴ beyond gauge radius R_n = 1/ε_n.
  - On the log cylinder, the multiplier B_n(ℓ, a, θ) = e^(2ℓ) M_n,1(δ_(e^ℓ) ω) − q_n(a)/(2π) satisfies
    |B_n| ≤ C_n e^(−2ℓ). It stays integrable against every polynomial weight in ℓ.
  - The potential correction is therefore bounded by g C_n ∫ e^(−2ℓ) |v|² in every Fourier mode, with no symmetry
    restriction.
  - Proposition 25.2 gives ‖∂_ℓ B_n‖_∞ ≤ 2 C_n e^(−2ℓ), uniformly through both axis points.
- **Counting boundary (§21).**
  - Part one gives N_n,g(E) = L_n,g log(1/E) + o(log(1/E)). The question is whether the remainder is bounded (21.3).
  - Potential decay alone does not decide it, because the central derivative, the interfaces and the soft wall
    E e^(2ℓ) remain.
  - Hassell–Marshall prove bounded remainders for Euclidean inverse-square potentials. That theorem is a comparison,
    not an input, because the kinetic operator, its degenerate endpoints and its angular pencil differ.
  - The task reduces to the periodic and Dirichlet cylinder counts P_g(T) and D_g(T).
- **Bounded seam (§22, Theorems 22.2–22.3).**
  - Negative periodic vectors are cut at the seam through a finite common range. The cut is controlled by their own
    negative energy, ‖(I − K_m(s))u‖ ≤ ε √(−h_m(s)[u]), so no spectral gap is assumed.
  - This gives 0 ≤ P_g(T) − D_g(T) ≤ r_n,g for T ≥ 3, so D_g(T) = d T + O(1).
  - The thresholds satisfy |τ_j − j/d| ≤ (C + 1)/d (22.22).
  - For n = 2 and g = 8, the two staircases differ by 0 or 1.
- **Bounded count (§23, Theorems 23.2–23.4, Application 23.5).**
  - Localized observations weighted by strict energy show that two exponential ends add only a bounded index (23.13).
  - The count of the actual operator then satisfies |N_n,g(E) − D_g(½ log(1/E))| ≤ B_n,g (23.17). Hence
    N_n,g(E) = L_n,g log(1/E) + O(1), which answers (21.3).
  - The depths obey log(1/ε_j) = j/L_n,g + O(1).
  - In the example, 1/L = 2π/s ≈ 8.442, so each new level is on average about 4640 times shallower.
- **One channel (§24, Lemma 24.2, Propositions 24.3–24.4).**
  - Just above λ_n = 2πμ_n, only angular mode m = 0 is negative, at frequencies |σ| < s. So d_n,g = s/π and
    L_n,g = s/(2π).
  - The profile ψ is positive and even, normalized by C[ψ] = ∫ cos a ψ² da = 1. It has finite positive limits at
    both endpoints and zero flux 4cψ′. These are derived, not imposed.
  - Outside the axisymmetric, z-even sector the operator has finite negative rank.
  - Application 24.6 (that o(a_j) quasimodes would give the phase limit) is stated as a conditional result.
  - For n = 2: μ₂ = 0.833117 and λ₂ = 5.2346. The isolation margins are γ = 2.728 and η = 1.743 (from m = ±1), so the
    margin in the proof of Lemma 24.2 allows couplings up to g ≈ 10.71.
  - At g = 8: s = 0.744263, d = 0.236906, L = 0.118453, ψ(0) = 0.675 and ψ(±π/2) = 0.857.
- **Outgoing wave (§25, Theorem 25.3).**
  - There is an exterior solution of the actual equation, with the complete source, the central derivative and the
    physical mass.
  - On the log cylinder, w₊(ℓ) → e^(isℓ) ψ in ℋ_c, with derivative convergence in L²(c da). The outgoing coefficient
    is exactly 1.
  - The proof uses a coercive complementary block in its central graph norm and the scalar Fourier multiplier
    m(ξ) = ξ² + 2iδξ − δ² − s². A Neumann series handles the cross blocks, and difference quotients give both strong
    slice limits.
- **Core standing wave (§26, Theorem 26.2).**
  - On oppositely weighted spaces the global form map P_δ is Fredholm with index −1. Its half-line scalar defect has
    adjoint null vector e^(−δx) cos(sx).
  - Both exterior residuals annihilate every decaying zero mode, so a nonzero combination of the outgoing and incoming
    waves is compatible.
  - The result is a real global solution through the pole with w_f₀ → 2 Re(b e^(isℓ)) ψ, b ≠ 0.
- **Coupled wall (§27, Theorem 27.2; §28, Theorem 28.2).**
  - For every E > 0 there is an exact exterior solution with every physical tail. A Fredholm alternative with two
    branches supplies it.
  - In x = ℓ − T_E with T_E = ½ log(1/E), the energy term becomes the wall e^(2x), with unweighted angular mass.
  - The coupled wall has one real standing solution, W(x) − 2 Re(β e^(isx)) ψ = O(e^(δx)) for x ≤ −2, with |β| = 1.
    The index of the mass homotopy is −1 throughout.
  - For n = 2 and g = 8: m = ‖ψ‖² = 1.6908, ‖cψ‖² = 0.7623 and r = √(1 − 1/(m‖cψ‖²)) = 0.4734 < 1.
  - A truncated angular computation gives arg β = 1.5429 (mod π) for the coupled wall. The decoupled scalar block
    gives 1.5493.
- **One phase family (§29, Theorem 29.2, Definition 29.3; §30, Theorem 30.6).**
  - Shifting W by T_E gives an approximate family for the actual equation with residual of order e^(−K) (29.7).
  - A uniform real right inverse on oppositely weighted spaces removes that residual. The correction is O(e^(−δT)) in
    the graph norm (30.11), (30.14).
  - The result is one exact family on one exterior Ω_R₀, for all 0 < E < E₀, with the same β at every energy.
    It satisfies lim_K limsup_E sup_[K, T_E − K] r_E(ℓ) = 0.
  - The eigenvalue phase limit ε_j e^(j/L) → C is not established in the volume. It needs a connection through the
    regular core (Remark 24.7, Definition 29.3).

一部约七分半钟的片子，FIB 原生吸引边界响应系列的第二部。先证明完整热源的格林边缘在整个规范球面上与无标度剖面
q_n/(2π) 只差 C_n ε²（取 n = 2、α = π/4 时 C₂ ≈ 7.16，实测上确界约为 ε²/2，在轴上取到），并由伸缩得到外区尾部
C_n e^(−2ℓ) 及其导数界；再把周期与 Dirichlet 柱面计数之差限制为固定整数，把原算子的计数推到
N(E) = L log(1/E) + O(1)，各深度满足 log(1/ε_j) = j/L + O(1)；刚越过临界耦合时只有角向模式零为负，于是 L = s/(2π)
（n = 2、g = 8 时 s ≈ 0.744）；随后构造出出射系数为一的外区波、穿过极点的核心驻波、带单位相位 β 的耦合墙驻波，
以及所有小能量共用同一个 β 的精确外区解族。本征值相位极限本身仍是开放的。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-114-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit this volume has no digestion records
    (`Meta/Digestion/backfill/fib-native-attractive-boundary-response-green-tail/` does not exist).
  - The parent volume has none either.
  - No frozen declaration covers any statement shown.
- **Published results, cited in the volume.** These are badged as published.
  - The oscillator heat formulas behind (20.8) have a literature counterpart in Krötz–Thangavelu–Xu, *The heat kernel
    transform for the Heisenberg group*, arXiv:math/0401243v2, §2.2 and §4.1.
  - Hassell–Marshall, *Eigenvalues of Schrödinger operators with potential asymptotically homogeneous of degree −2*,
    arXiv:math/0510617v1, Theorem 1. The volume uses it as a comparison only and does not apply it. Its Lemma 3 and §7
    supply the mature mechanism behind Application 24.6.
- **Classical tools named in the volume.** The finale lists them.
  - Analytic Fredholm theory (Dyatlov–Zworski, *Mathematical Theory of Scattering Resonances*, Theorem C.8).
  - The form min-max principle (Teschl, *Mathematical Methods in Quantum Mechanics*, Theorems 4.10 and 4.12(i)).
  - Riesz representation and whole-line Fourier analysis (Folland, *Real Analysis*, Chapters 5 and 8).
  - Fredholm compact perturbation (Kato, *Perturbation Theory for Linear Operators*, IV.5).
  - Rellich compactness and difference quotients (Evans, *Partial Differential Equations*, Chapter 5).
  - Cauchy's theorem for the contour shift.
- **Project inputs, not recomputed here.** They come from the parent volume and are badged as theory:
  - the analytic assumptions of its Definition 18.1, with the Green stability suppliers C and V at `5cec4fa83a`;
  - the leading count of its Theorem 18.2;
  - the periodic estimate (18.9);
  - the frequency confinement (18.6)–(18.7).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory. The volume itself
  calls these ordinary conditional analysis under Definition 18.1.
- **Recomputed for this film.** An independent Python script (59 checks) recomputes the following.
  - **Green marginal (n = 2).**
    - The 1D time-integrated form of (20.9) reproduces M_n,0(ω(a)) = q_n(a)/(2π) for n = 2, 3 and 4, to relative
      error 5 × 10⁻¹⁵. It also matches a direct double integral of (20.9) to about 10⁻⁶.
    - q₂(a) = (2/π) a/sin a and q₃(a) = 1/(1 + cos a).
    - b_α = α cot α, with the infimum at v = 0. At α = π/4: K₂,π/4 = 5.44633 and C₂ = 7.15673, with
      ε₂ = 1/√(2π).
    - sup_Σ |M₂,ε − M₂,₀| was evaluated for 14 values ε ∈ [0.01, ε₂] over 61 angles. It is at most 0.07 C₂ ε², it is
      attained at the axis, and the ratio to ε² tends to ½. The exact axis coefficient
      (2/π²)∫ u/(sinh u cosh u) du equals ½.
    - The scaling M₂,₁(δ_R ω) = R⁻² M₂,₁/R(ω) holds, and |M₂,₁ − M₂,₀| ≤ C₂R⁻⁴ for R = 3, 5 and 8.
    - sup|B₂(ℓ)| ≤ C₂e^(−2ℓ) and sup|∂_ℓB₂| ≤ 2C₂e^(−2ℓ) on [ℓ₂, 5], with ℓ₂ = ½ log 2π. The derivative formula
      matches finite differences.
    - The polar Jacobian is |det| = e^(4ℓ)/4.
  - **Angular channel (n = 2, Legendre-in-a Galerkin, converged to 10⁻¹⁰).**
    - μ₂ = 0.8331169706 and λ₂ = 5.2346283.
    - γ = 2.727936 and η = 1.742746, from m = ±1 at σ = 0.
    - At g = 8: s = 0.744263313, d = s/π = 0.236906 and L = 0.118453.
    - ν(σ, 0) = 1 exactly for |σ| < s on 81 sampled frequencies. The modes m = ±1 … ±4 stay positive, with minimum
      1.4346 ≥ η − δ.
    - ψ > 0 and even, ψ(±π/2) = 0.857 and ψ_a(π/2) = kψ(π/2)/4.
    - m = 1.690763, ‖cψ‖² = 0.762317 and r = 0.473438. Inequality (28.6) holds on 400 random vectors.
  - **Cylinder counts.**
    - The periodic and Dirichlet m = 0 counts computed from the angular operator equal #{|2πj/T| < s} and
      #{πj/T < s}.
    - 0 ≤ P − D ≤ 1 and |D − dT| ≤ 1 for T ∈ [3, 80], and the thresholds sit at πj/s.
  - **Half-line and multipliers.**
    - e^(−δx)cos(sx) is the adjoint null vector with the natural boundary condition (sympy).
    - inf |ξ² ± 2iδξ − δ² − s²|/(1 + ξ²) = 0.2918 at δ = 0.3.
    - (26.30) holds with O(1) ≤ 2|a₊||a₋|/s.
  - **Wall.**
    - The coupled wall equation was solved in 5, 7 and 9 even angular modes by orthonormalized shooting.
      arg β = 1.5429437 (mod π) is stable to 10⁻⁶.
    - At θ = 0 the same solver gives 1.5492876, which equals the Bessel prediction from K_is(√m eˣ).
    - The channel of W converges to 2 Re(β e^(isx)) to within 4 × 10⁻⁶ for x ≤ −6.
  - These are sampled and finite checks, not proofs of the general statements. The values of β, μ₂, s and the isolation
    margins are numerical computations for the chosen parameters. The volume asserts no explicit values.
- **Data drawn on screen.**
  - The q₂ curve with heat-column dots.
  - The error profile at ε = 0.2.
  - The log-log error dots against C₂ε² and ε²/2.
  - The B₂ and ∂_ℓB₂ dots against their bounds.
  - The lowest-eigenvalue curves for m = 0 … 3.
  - The ψ profile.
  - The P and D staircases.
  - The D(½ log(1/E)) staircase.
  - The coupled-wall channel curve and its scalar-block comparison.
  - The shifted wall profiles for E = 10⁻⁴, 10⁻⁷ and 10⁻¹⁰.
- **Illustrative visuals.** These are illustrations, not data:
  - the gauge sphere and its dilations (central direction exaggerated);
  - the complex u-plane;
  - the log cylinder, the seam wave and its lift;
  - the bounded band around the count;
  - the IMS partition;
  - the two-ended multiplier;
  - the outgoing-wave and standing-wave sketches;
  - the core-and-tube diagram;
  - the block diagram;
  - the Fredholm branches;
  - the scalar wall potential.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
