# 110 · FIB-NATIVE LONG-TIME PHASE II · WEAK BINDING, ENGEL THRESHOLD AND CRITICAL MODE · FIB 原生长时相位 第二部 · 弱束缚、Engel 阈值与临界模

This is the second film in the FIB-native long-time phase series and runs about 7¼ minutes (7:12). It covers the whole
of `FIB_NATIVE_LONG_TIME_PHASE_WEAK_BINDING.md`, §70–§108, at trureturing subject commit `7c69b2ea21`.

Part one found the native phase tensor M and a threshold Green field that falls off like one over distance. This film
lets a state be attracted by that field. A fixed positive time cutoff gives a Coulomb ground state. Shrinking the cutoff
either keeps that law or breaks it, and in between the problem blows up to a fixed operator on the Engel group, with a
finite threshold and one positive critical mode. The rest of the film looks at what an observation that forgets the
hidden phase can see, and at the scales where the critical question is still open.

## The film, scene by scene

- **Cutoff field (§70–§71).**
  - Fix the source (k₀, 0) and cut the threshold Green field at a positive time τ:
    W_τ = ∫_τ^∞ e^(λt) g(t; k₀, k; q) dt. It is bounded, 0 ≤ W_τ ≤ C_τ φ₀ φ(k)/(1 + |q|), and far away
    W_τ = φ₀ φ(k) / (4π √det M · d(q)) + O(|q|⁻³), with d(q) = √(qᵀ M⁻¹ q) (Proposition 70.2).
  - Its source has two different charges: the raw mass e^(λτ) P_k₀(ζ > τ), which tends to one as τ → 0, and the
    height-weighted charge ∫ φ ρ_τ = φ(k₀) (70.4, 75.4).
  - The multiplier is compact on the full native form domain, so σ_ess(H_g) = σ_ess(S) = [0, ∞) (Proposition 70.2).
    Low-band extraction controls the potential by the kinetic energy without any phase H¹ assumption (Propositions
    71.1–71.2).
- **Coulomb limit (§72–§74).**
  - For every g > 0 the energy E_τ(g) is negative and attained in D(S), and
    E_τ(g)/g² → e* = −β²/4a with β = φ(k₀) ∫φ³ / (4π √det M), that is
    e* = −φ(k₀)² (∫φ³)² / (64π² a det M) (Theorem 72.1).
  - The limit is the Coulomb operator −a ∇·M∇ − β/d(z). A completed square gives its minimum, attained only by
    h*(z) ∝ e^(−ρ d(z)) with ρ = β/2a, up to a constant phase (72.3–72.4).
  - Every near-minimizer, rescaled by g, converges to e^(iθ_g) φ(k) h*(z); the excited height part is O(g²) and the
    states are tight about the fixed source, with no translations (Theorem 73.1).
  - In the lifted coordinates D = κx the coupling is g_orig = |κ| g and the tensor is J_κ M J_κᵀ (Proposition 74.1).
- **Shrinking cutoff (§75–§80).**
  - Let τ(g) → 0 and put χ = g τ^(−3/2). If χ → 0, the same Coulomb energy and every near-minimizer profile survive
    (Theorem 77.1); τ = g^p works for every 0 < p < 2/3, and so does τ = g^(2/3) (log 1/g)^r (Proposition 77.2).
  - If χ → ∞, admissible states squeezed into the privileged chart at the source win:
    −C g τ^(−5/2) ≤ E ≤ −c g τ^(−5/2), so E → −∞ and E/g² → −∞ (Theorem 79.1); this covers τ = g^p for every
    p > 2/3 (Proposition 79.2).
- **Engel blow-up (§78, §81–§83).**
  - Rescale by s = √τ in the chart Ξ_s(ξ) = (k₀ + εsr, s c₀y + εs²c₁z + ε²s³c₂w), with weights (1, 1, 2, 3) and
    Jacobian j₀ s⁷ (Definition 78.1). The native fields become X = ∂_r and Y = ∂_y + r∂_z + ½r²∂_w on the Engel
    group, of homogeneous dimension 7 (Lemma 82.1).
  - The whole integrated field, including its infinite-time tail, converges uniformly to
    V = (1/j₀) ∫₁^∞ p_E(t; 0, ·) dt (Theorem 82.3), using the published local heat-kernel theorem and Gaussian bounds
    listed below.
  - Native states of bounded energy have compact local limits, with lost mass allowed and no tightness assumed
    (Lemma 83.1, Proposition 83.2).
- **Engel threshold (§84–§86).**
  - The threshold is χ_c = a/C*, with C* = sup ∫V|f|²/b[f] ≤ 4c_E/(15 j₀), where c_E = p_E(1; 0, 0)
    (Theorem 84.1).
  - For χ ≤ χ_c the energy is zero; for χ > χ_c the bottom is a simple isolated eigenvalue with a unique positive
    ground state Φ_χ, and χ‖K_b‖ = a gives e(χ) = −ab (Theorem 84.1).
  - Along every path with χ_n → χ₀ ∈ (0, ∞), τ_n E_τn(g_n) → e(χ₀) (Theorem 85.1); above threshold every
    near-minimizer converges to e^(iθ_n) Φ_χ₀ in the privileged chart (Theorem 85.2); below it the local mass
    vanishes (Theorem 85.3).
- **Critical mode and disk (§87–§91).**
  - At χ_c the zero-energy inverse T = ∫₀^∞ e^(−tE) V^½ dt is compact (Theorem 87.2), so the critical mode Φ_c is
    attained, strictly positive and simple: ker H_c = ℂΦ_c (Theorem 88.1).
  - Just above threshold, e(χ_c + δ) = −μ_c δ + o(δ) with μ_c = ∫V|Φ_c|² > 0, and every o(δ) near-minimizer converges
    to the phase orbit of Φ_c (Theorem 89.1).
  - At criticality the weak limits of native near-minimizers are exactly the disk {cΦ_c : |c| ≤ 1}; every point is
    attained on every critical path, and ‖f_n − cΦ_c‖² → 1 − |c|² (Theorem 90.1). Selecting |c| = 1 needs extra
    quantitative rates (Proposition 91.1).
- **Hidden fibre (§92–§96).**
  - Forgetting the hidden real phase x, free killed transport factorizes exactly at every start (Theorem 92.2).
  - Yet ∫_−R^R W_τ dx = φ(k₀)φ(k)/(2π √det N) · log R + O(1), so the threshold marginal is infinite
    (Theorem 94.1), while the tangent marginal is finite; the two iterated limits differ (Theorem 94.2).
  - The transport fields and their brackets span four dimensions, so no three-dimensional slice is invariant
    (Theorem 95.1). Two states with the same observed marginal, partial trace and kinetic energy differ in energy by a
    fixed positive gap on the microscopic scale (Theorem 95.2), and one partial trace allows different quantum futures
    even at g = 0 (Theorem 96.1).
- **Critical window (§97–§101).**
  - The rational coefficients satisfy c(k₀ + h) = c₀ + hc₁ + h²c₂/(2(1 + h/d₀)) exactly, which gives a shear and the
    field bound ‖Ũ_s − V‖_∞ ≤ C s^(5/6) (Lemma 97.2), and the critical energy error |ε_s^c| ≤ C s^(2/3)
    (Theorem 98.1).
  - If s^(2/3) = o(δ), then τE = −μ_c δ + o(δ) and every ground state selects Φ_c (Theorem 99.1).
  - Without a window the uncentred law fails: s² E ≤ −c (χ_c + δ)² s⁸, so δ = s⁹ is a counter-path
    (Proposition 100.1). Detunings between s^(2/3) and s⁸ are left open (§101).
- **No-loss scale (§102–§105).**
  - At g = χ_c s³, a compact microscopic charge forces native mass onto a shell of size 1/√m_s (Theorem 102.2). If
    r_s = −s²E_s/s⁸ stays bounded, the ground states stay a fixed distance from the critical orbit, with
    |c|² ≤ 1/(1 + γ_K/√B) (Theorem 103.1).
  - A global resolvent reconstruction (Theorem 104.2) gives the converse: r_s → ∞ exactly when the ground states
    converge to the critical orbit (Theorem 105.1). Whether r_s → ∞ for the fixed data is left undecided.
- **Rayleigh coefficient (§106–§108).**
  - rΦ_c is in the form domain with h_c[rΦ_c] = a, and the reflection σ(r, y, z, w) = (−r, y, −z, w) fixes V and Φ_c
    (Theorem 106.1).
  - The complete field has the second-order expansion ‖Ũ_s − V − β_sV₁ − β_s²V₂ − λs²V_t‖_∞ ≤ C s^(5/2)
    (Theorem 107.2).
  - The affine-amplitude trial has q_s^c[Z_s]/s² → ν²{a(1 − A₂) − χ_c J₂} − λ{a + χ_c J_t} (Theorem 108.1). The
    sign of this coefficient is left undecided.

本片是 FIB 原生长时相位系列的第二部，约七分钟，覆盖整卷 §70–§108：在正时间截断下，吸引的阈值 Green 场给出
Coulomb 基态，能量除以 g² 趋于 −β²/(4a)，近似极小元收敛到 e^(−ρd) 轮廓；截断随 g 收缩时，χ = gτ^(−3/2) 趋于零则这条律保留，
趋于无穷则失效；χ 有限时问题放大为 Engel 群上的固定算子，阈值 χ_c = a/C* 有限且为正，阈值处的临界模 Φ_c 可取到、为正且简单，
临界处的弱极限恰好填满圆盘 cΦ_c；忘掉隐藏实相位的观测保持自由输运，却看不到对数发散与微观能量间隙；最后是 s^(2/3) 的临界窗口、
δ = s⁹ 的反例路径、r_s → ∞ 与无质量损失的等价，以及符号未定的 Rayleigh 系数。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-110-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit `FIB_NATIVE_LONG_TIME_PHASE_WEAK_BINDING.md` has no digestion records (no
    `Meta/Digestion/backfill/` directory). The ledger of part one (`fib-native-long-time-phase-diffusion`) has 9
    residual-open and 1 nonpropositional-inapplicable record; its Definition 69.1, which points to this volume, is
    kept there only as a context atom.
  - No Lean declaration covers any statement shown. The volume names
    `FiniteRectangleTransport.finite_rectangles_realize` only to say that it does not prepare these states.
- **Published results, used as external inputs.** The Engel scene and the finale badge them as published.
  - Local heat-kernel convergence and localization: Colin de Verdière–Hillairet–Trélat, *Small-time asymptotics of
    hypoelliptic heat kernels near the diagonal, nilpotentization and related results*, Annales Henri Lebesgue 4,
    897–971, DOI 10.5802/ahl.93 (Theorems A and B, Theorem 3.2, Appendix B Theorem B.1).
  - Gaussian upper bounds: Coulhon–Sikora, arXiv:math/0609429, Theorem 4.1.
  - Young's inequality on graded groups: Fischer–Ruzhansky, arXiv:1311.0192v1, §2.1 (2.2).
- **Classical tools named in the volume.** Hardy's inequality and the Coulomb square identity (the Coulomb scene badges
  the square as classical), Fréchet–Kolmogorov and local Rellich compactness, Weyl's theorem, the weighted Schur test,
  the form representation theorem, positivity of the Dyson expansion, the reflection principle, Plancherel and
  spectral calculus.
- **Project inputs, not recomputed here.** From part one (`FIB_NATIVE_LONG_TIME_PHASE_DIFFUSION.md`): Definition 35.1,
  the tensor M of §36, Lemma 41.2, Theorem 42.1 and §48. From `FIB_NATIVE_TWO_CONTROL_GREEN_STABILITY.md`:
  Definition 25.1, (26.6), Theorem 3.1, (31.2) and §32. The Coulomb square identity is taken in the form of
  `FIB_ATOM_RECURSIVE_HOLOGRAPHIC_BOUNDARY_GEOMETRY_CONTINUATION_III.md` (82.4).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory. The window
  between s^(2/3) and s⁸, the limit of r_s and the sign of the Rayleigh coefficient are badged open, as the volume
  leaves them undecided.
- **Recomputed for this film.** An independent Python script (sympy, scipy, numpy) runs 78 checks. These are sampled
  and finite checks, not proofs.
  - **Sample data.** G Definition 25.1 with Z = 0.2 (H = 0.4), I = (0.05, 0.35), k₀ = 0.2, ε = 1, κ = 0.01, a = 1:
    λ = 109.662, φ(k₀) = 2.5820, ∫φ³ = 2.1917 = 8√2/(3π√0.3), det M = 8.4925 × 10⁻⁴, β = 15.4526,
    e* = −59.6954, ρ = 7.7263.
  - **Field.** ∫₀^∞ of the Gaussian of covariance 2tM equals 1/(4π √det M d(q)). The survival probability agrees
    between the eigen-series and the image series. The raw charge rises from 1.0000011 at τ = 10⁻⁸ to 4/π for the
    centred source; the φ-weighted charge is φ(k₀) at every τ.
  - **Coulomb.** The square identity and Hardy's inequality hold on 12 random radial functions; the trial e^(−α|y|)
    has energy aα² − βα with minimum e* at α = ρ; h* has unit norm; the |κ| transport factor checks by Monte Carlo.
  - **Exponents.** χ = g^(1 − 3p/2) and the energy order g^(1 − 5p/2) for τ = g^p; ∫_τ^1 t^(−7/2) dt ≤ (2/5)τ^(−5/2).
  - **Rational coefficients (symbolic).** det(c, c′, c″) = −(H² − κ²)/(2H³(k − α_κ)³); det(d, d′) =
    −s_κ((k − 2κ)/(2H(k − α_κ)))²; the exact Taylor identity (97.3) for all three components; |det DΞ_s| = j₀ s⁷;
    v_s(r) = (1, r, r²/(2(1 + β_s r))). Sample: det(c₀, c₁, c₂) = −182.849, j₀ = 182.849, d₀ = 0.18975.
  - **Engel group (symbolic).** Associativity, the dilation automorphism, the left-invariant fields and their brackets,
    determinant one, Q = 7, box volume 16R⁷, and σ as an automorphism that sends X to −X and fixes Y.
  - **Engel heat kernel (Monte Carlo over Brownian bridges).** c_E = p_E(1; 0, 0) = 0.3020 ± 0.0011 (60 000 bridges;
    0.3002 ± 0.0015 and 0.3003 ± 0.0015 with 300 and 3000 steps). The diagonal at t = 0.5, 1, 2, 4 is 3.400, 0.2990,
    0.02639, 0.002353, matching c_E t^(−7/2). ∫₁^∞∫₀^∞ (t + u)^(−7/2) du dt = 4/15 exactly, so
    χ_c/(a j₀) ≥ 15/(4c_E) ≈ 12.42 (sample: χ_c ≥ 2271).
  - **Critical.** Young exponents 5/6 + 2/3 = 1 + 1/2, the dyadic sum, ∫_R^∞ t^(−7/6) dt = 6R^(−1/6), and the
    disjoint-support bookkeeping of the disk construction.
  - **Hidden fibre.** c₂ − βc₀ − γc₁ = (0, 0, h*) and j₀ = ε⁴D₀|h*|; J_s|ℓ_s| = j₀s⁷; the cofactor identity
    det M (M⁻¹)₃₃ = det N; the log R slope of the 1/d tail is 5.197845 against 1/(2π√det N) = 5.197837; the fibre
    integral scales like t⁻²; b_κ A_κ > 0 on I; the quantum derivative (96.3) on one height slice is 4.29708 by direct
    quadrature and 4.29708 by the formula; the commutator identity (96.2).
  - **Window and no-loss.** The exponents 5/6 and 2/3 from optimizing R = s^(−e); δ = s⁹ gives s²E/δ → −∞; the shell
    volume (28π/3)√det M m^(−3/2) (Monte Carlo ratio 0.9998); min of e^(−x)/x on [1/2, 3] is e^(−3)/3; the shell
    geometry (102.10) on 60 000 random pairs; dist² = 2 − 2|⟨F, Φ⟩| on 50 random cases; the resolvent integrals
    (104.10), (104.11), (104.13).
  - **Rayleigh.** On one bridge, M′(0) = −2M₁ and M″(0) = 6M₂, and the second-order Gaussian expansion leaves a
    residual of slope 2.997 in log β; ν = ε/d₀ = 5.2701 for the sample.
- **Data drawn on screen.**
  - The raw-charge curve, the trial-energy parabola, the profile e^(−ρd) and the height curve φ(k).
  - The exponent diagram for τ = g^p.
  - The Monte Carlo heat-kernel diagonal with the c_E t^(−7/2) line.
  - The log R line integral.
  - The two Theorem 103.1 bound curves.
  - The Taylor residual dots.
  - The weight bars 1, 1, 2, 3 and the exponent ladders 2/3, 5/6, 8, 9.
- **Illustrative visuals.** These are illustrations, not data:
  - the anisotropic level-set ellipses around the source, and the ground-band field model;
  - the shape of e(χ) and of the onset near χ_c;
  - the positive-mode heat map and the parity contours;
  - the disk dots and the moving mass bar;
  - the fibre picture, the four bracket arrows and the two translated states;
  - the shell picture with its resolvent arrows.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
