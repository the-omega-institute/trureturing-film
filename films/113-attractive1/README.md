# 113 · FIB-NATIVE ATTRACTIVE BOUNDARY I · POLE RECOVERY, EXACT THRESHOLDS AND THE LOGARITHMIC COUNT · FIB 原生吸引边界响应 第一部 · 极点恢复、精确阈值与对数计数

This is part one of the three-part FIB-NATIVE ATTRACTIVE BOUNDARY RESPONSE series and runs about 7 minutes (7:11). It
covers the whole of `FIB_NATIVE_ATTRACTIVE_BOUNDARY_RESPONSE.md` (§1–§19) at trureturing subject commit `ed0ed20f30`.
The volume builds on the Green stability volumes of films 106–108: it keeps their source pole, killed Green field,
clock and angular constant λ₀, and studies what the attraction does at the lower face of the cylinder. Parts two and
three continue with `FIB_NATIVE_ATTRACTIVE_BOUNDARY_RESPONSE_GREEN_TAIL.md` and
`FIB_NATIVE_ATTRACTIVE_BOUNDARY_RESPONSE_GLUING.md`. The volume has no numerical example; the film fixes
Z = 0.2, r = 0.8, l = 0.05, u = 0.35, h = 0.3 and σ = 25 for §6–§8, and n = 2, g = 8 for the counting coefficient.

## The film, scene by scene

- **Positive response (§1–§2).**
  - The slab is Ω = (l, u) × T² with P = ∂_k, Q = ½∂_α + (½ − k/r)∂_β, central field Z_c and covariance-2 clock. The
    attractive form is q = T_ε − g ∫ Γ_ε,o |v|² dμ, with Γ_ε,o the killed free Green field of the given pole.
  - A_s = q^M + s‖·‖² ≥ ‖·‖² for every s ≥ B + 1, uniformly over 0 ≤ ε ≤ ε₀ and 0 ≤ g ≤ g*. The lower trace space is
    exactly the free trace space, with kernel the killed domain (Theorem 1.2, (1.3)–(1.4)).
  - The least energy with a given trace is attained and a_S ℓ_free ≤ b ≤ ℓ_free with a_S = 1/max(1, S); the inverse C
    is compact with ‖C‖ ≤ h_I/a_S (Theorem 2.2).
  - The best rank within η is the number of eigenvalues μ_j(C) > η, and K⁻/(η²(η + ε)) ≤ d(η) ≤ K⁺a_S⁻³/(η²(η + ε)): order η⁻³ at zero
    noise and ε⁻¹η⁻² below the crossover η = ε (Theorem 2.3).
- **One seam (§3–§4).**
  - R^M(s) = R^D(s) + P C P* with the attractive Poisson lift bounded on L², ‖P‖ ≤ p + K_A, p = √(h_I/3); replacing C by
    B costs at most p_A²‖C − B‖ (Theorem 3.1).
  - One cut at a height away from the pole, with the parent potential on both slabs, gives
    (H^J + s)⁻¹ = (H^cut + s)⁻¹ + P_h C_h P_h*, and keeping seam eigenvalues above η leaves error ≤ p_A,h² η (Theorem 4.2).
  - Above g*, no fixed shift stays positive down to small noise (Theorem 5.1); this appears in the threshold scene.
- **Moving pole (§6).**
  - Five unknowns p = (y, α_o, β_o, a, v). For κ ≤ κ₀ the boundary form is coercive (0 ≤ W_p ≤ M T), also at v = 0 and
    s = 0.
  - B_d(s) = a/(4π²) · e^(i(d₁α_o + d₂β_o)) · F_d,s(y, v) with F_d,s > 0, and B_0(s) = a H_s(y)/(4π²) (Theorem 6.2).
- **Five-number inverse (§7–§8).**
  - Triangular inverse: v = c⁻¹(Φ₁) with c′(v) = r⁻² ∫ψ² > 0; y from the strictly decreasing ratio
    R(y) = H_σ(y)/H_0(y), with R′(y) = h L U (q_U − q_L)/(y(h − y)) < 0; then a = 4π² B_0(0)/H_0(y); then both phases
    (Theorem 7.1, (7.5)–(7.10)). H_0(y) = hy/4 − y²/2 + y³/(3h) − y⁴/(12h²).
  - The inverse is two-sided Lipschitz on compact sets, including v = 0, and it fixes the coherences
    z_o = √(k_o(r/2 − k_o)) e^(iα_o), w_o = √(Z k_o) e^(iβ_o) (7.1)–(7.2).
  - With supplied secants at coupling κ and coefficient error η, a nearest-image decoder satisfies
    d_K(p̂, p) ≤ C(κ + η/κ + η) (Theorem 8.1). The coefficients are supplied, not acquired (Definition 8.2).
- **Exact threshold (§5, §9).**
  - T₁[u] ≥ 2πλ₀ ∫ G₁|u|² for every complex u in the unit-noise free domain, with the complete Green field and all
    angular modes (Theorem 9.2). The proof orders the exact Mehler heat columns, 0 ≤ q₁ ≤ q₀.
  - Hence Λ* = 2πλ₀ and g* = g_c = 2π m₀ λ₀ = πλ₀/r. The response theory of §§1–3 holds up to and including g_c; above
    it Theorem 5.1 excludes a common fixed shift (Theorem 9.3).
- **Retained contact field (§10).**
  - On Hⁿ = ℝ²ⁿ × ℝ, keeping (X₁, z), the kept heat densities have central transform q_ε · sech(|k|t)ⁿ⁻¹ (10.3). They
    form no semigroup, and the retained field is not a multiple of the native one.
  - M₂,₀(ρ, z) = arctan(4|z|/ρ²)/(4π²|z|); against G₁,₀ the axis ratios are 1 on the central axis and 2/π on the
    horizontal axis; 2πA_n = Γ(n/2)/(√π Γ((n+1)/2)) < 1 (10.11)–(10.12).
  - The full own field collapses: for n ≥ 2 the normalized infimum is −∞ for every g > 0 (10.7), while the retained
    bound E_H ≥ K ∫ M_n,ε |f|² holds (10.6).
- **Central remainder (§11).**
  - T₁[u] − K W[u] ≥ ‖Z_H u‖² for every complex u (11.2); the coefficient 1 is optimal by dilation (11.3), and K is not
    attained (11.4) (Corollary 11.2).
- **Retained gap (§12–§13).**
  - M_n,0 = R⁻² q_n(a)/(2π) with q_n(±π/2) = 1 and q_n(0) = 1/((n − 1)I_n) (Theorem 12.2); μ_n > λ₀ and
    E_H ≥ 2πμ_n W_n (12.7).
  - Λ_n = 2πμ_n exactly, with remainder ≥ B_n/4 and no extremizer (Theorem 13.2); the retained form is nonnegative
    exactly for 0 ≤ g ≤ 2πμ_n (Corollary 13.3).
- **Every noise (§14–§15).**
  - Λ_n,ε = 2πμ_n for every ε > 0, with remainder ≥ ε²‖Zf‖² and no extremizer (Theorem 14.2, Corollary 14.3).
  - For g > 2πμ_n the form is closed and bounded below, σ_ess = [0, ∞), and there are infinitely many negative
    eigenvalues accumulating only at 0 (Theorem 15.2).
- **Logarithmic count (§16–§19).**
  - Lower: N(E) ≥ ⌊log(γ/(2a*²E))/(2 log B)⌋ and liminf N/log(1/E) ≥ (1/2π)√(D_b/C_b) (Theorem 16.2).
  - Upper: N(E) ≤ e²(c₀ + c₁ log(1/E)) from the CLR bound with h_H(t, 0) = 1/(16t²) (Theorem 17.2, Corollary 17.3).
  - Under Definition 18.1's analytic hypotheses, N(E) = L_n,g log(1/E) + o(log(1/E)) with
    L_n,g = (1/4π) Σ_m ∫ ν_n,g(σ, m) dσ (Theorem 18.2). A bounded remainder (18.22) remains open in the volume.
  - §19 defines the sphere error e_n(ε) and points to part two for its estimate.

一部约七分钟的片子，FIB 原生吸引边界响应系列第一部：在 Green 稳定性诸卷的源极点、杀死 Green 场与时钟之上，研究吸引在柱体下边界上的作用。平移后的吸引形式一致正定，下迹空间恰为自由迹空间，最小能量响应夹在自由响应的固定倍数之间，逆响应的最优秩按 η⁻³ 或 ε⁻¹η⁻² 增长；混合预解式等于杀死预解式加一个边界项，一道接缝也只多出一个有限的接缝项；移动极点时，五个耦合导数系数按三角次序恢复高度、两个相位、增益与方差，并且在紧集上双边 Lipschitz；完整 Green 场的精确不等式给出 g* = g_c = 2π m₀ λ₀；高阶接触群的保留场不是原生场的倍数，完整自身场塌缩；中心余项系数 1 最优且锐常数取不到；保留常数恰为 2πμₙ > K，并在任意噪声下保持精确；越过它，负本征值无穷多且按 log(1/E) 计数。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-113-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit this volume has no digestion records: `Meta/Digestion/backfill/` has no directory for it.
    (The gluing continuation, part three, has 21 residual-open atoms.)
  - No Lean declaration covers any statement shown; every scene is badged as theory, with the exceptions below.
- **Published results, used as external inputs.**
  - The Cwikel–Lieb–Rozenblum bound: R. L. Frank, *Cwikel's theorem and the CLR inequality*, arXiv:1206.3325,
    Theorem 3.2 and Lemma 3.4. The count scene badges it as published.
  - Heisenberg heat columns: Krötz–Thangavelu–Xu, arXiv:math/0401243. Hypoelliptic heat tangents: Colin de
    Verdière–Hillairet–Trélat, doi:10.5802/ahl.93, Theorem B. Both are listed in the finale.
  - Trace-form and boundary-pair methods: Arendt–ter Elst, arXiv:1005.0875; Post, arXiv:1210.4707, Theorem 4.3(ii).
  - The Folland gauge solution as recalled by Kombe, arXiv:math/0501522; analytic Fredholm theory, Dyatlov–Zworski,
    Theorem C.8.
  - Works cited by the volume for comparison only (not used as inputs): Alberti–Santacesaria (doi:10.1017/fms.2019.31),
    Dos Santos Ferreira–Kurylev–Lassas–Liimatainen–Salo (arXiv:1712.04716), arXiv:2104.14991, Lenzmann–Sok
    (arXiv:1805.06294), Hassell–Marshall (arXiv:math/0510617), D'Arca–Fanelli–Franceschi–Prandi (arXiv:2603.04086).
- **Classical tools named in the volume.** The Mehler formula (badged classical in the threshold scene), IMS
  localization, KLMN, the closed-form representation theorem, min–max, the Weyl criterion and form-compact essential
  spectrum (Teschl), Sobolev and Rellich embeddings, Fourier inversion and Plancherel, Fatou, beta and gamma integrals.
- **Project inputs, not recomputed here.** From the central-noise Green stability volume (film 108): Λ*, g*, the
  ε²E_ε limit of Theorems 16.1 and 16.3, the free trace weights and the free rank law with constants K_l^± (Theorems
  32.1–33.1). From the variable-coefficient volume (film 107): the definition of λ₀, the horizontal sharp inequality and
  ground transform (Theorems 10.2 and 12.2). From the free-diffusion quotient and guarded-lift volumes: the coherence
  formulas and the chronological guard (7.2)–(7.3).
- **Theory volume, argued but not kernel-checked.** Everything else in the film.
- **Recomputed for this film.** `verify113.py` (183 checks) recomputes the following; these are sampled and finite
  checks, not proofs.
  - **Angular constants.** λ₀ = 0.6256558 by Legendre–Galerkin in the angle (converged to 10⁻¹¹ between 24 and 36
    modes) and by 6000 linear finite elements (agreement 2 × 10⁻⁶); 1/4 ≤ λ₀ < 2/π; K = 2πλ₀ = 3.93111.
  - **Retained gap.** μ₂ … μ₆ = 0.833117, 0.964219, 1.063486, 1.145021, 1.215102, so 2πμ_n = 5.23463, 6.05837,
    6.68208, 7.19438, 7.63471, all above K. q_n by two formulas; q₂(a) = (2/π)|a|/sin|a|, q₃(a) = 1/(1 + cos a);
    q_n(±π/2) = 1, q_n(0) = 1/((n − 1)I_n) = 0.6366, 0.5, 0.4244, 0.375, 0.3395 for n = 2 … 6.
  - **Contact marginal.** The fibre integral (10.5) equals R⁻²q_n(a)/(2π) for n = 2, 3, 4 and the arctan formula for
    n = 2 at random points (relative error < 10⁻⁸); A_n and 2πA_n < 1 for n = 2 … 6; M_n,0(0, z) = 1/(8π|z|); unit flux
    fixes c_n for n = 1 … 5; each omitted pair integrates to sech(κt); sech(1)² = 0.4200 ≠ sech(2) = 0.2658; the two
    starts with the same projection have time-zero derivatives of E[z²] that differ by 1/2 (sympy).
  - **Heat columns.** Mehler A′/A = −4B, B′ = κ²/4 − 4B² by finite differences; 0 ≤ q₁ ≤ q₀ on grids; the heat
    integral gives G₀(ρ, 0) = 1/(2πρ²); ∫₀^∞ s/sinh s ds = π²/4 and h_H(t, 0) = 1/(16t²); CLR constants B′ = e²/16,
    A = e²/8, C₄ = 8; |B₂| = 2π²; ∫ t^(−3/2) e^(−ρ²/4t) dt = 2√π/ρ.
  - **Central remainder.** For φ = e^(−|X|² − z²), E_H/‖Zφ‖² = 17/8 (sympy).
  - **Five-number inverse** (Z = 0.2, r = 0.8, l = 0.05, u = 0.35, h = 0.3, σ = 25; Chebyshev collocation with 49 nodes).
    - The zero-mode profiles are 1 − x/h and the sinh profile; F₀,₀ equals the H₀ polynomial; every free Poisson
      profile tested satisfies 0 ≤ ψ ≤ 1 − x/h and ‖ψ‖ ≤ √(h/3) = 0.3162.
    - c′(v) = r⁻²∫ψ² against finite differences; c(0) = 3.34567; (7.9) against finite differences at four heights;
      R(y) decreases from 0.7956 to 0.6716 on [0.01, 0.29].
    - The pole (y, α, β, a, v) = (0.12, 1.0, 2.5, 1.5, 0.4) gives c(v) = 3.4079 and R = 0.7043, and the triangular
      inverse returns it with error at most 1.3 × 10⁻¹¹; k_o = 0.17, |z_o| = 0.1977, |w_o| = 0.1844.
    - On 400 sampled pairs in [0.05, 0.25] × T² × [1, 2] × [0, 1], ‖ΔΦ‖/d_K lies in [1.28 × 10⁻⁴, 0.114]; data errors
      10⁻¹⁰ … 10⁻⁷ move the decoded point linearly (8 × 10⁴ … 1.4 × 10⁵ per unit).
  - **Modal lower bound (§1).** Normalized modes with v(h_I) = 0 have energy at least |b|/25 for |b| = 5, 40 and 300
    (finite differences, worst case over a grid of a).
  - **Annular trials.** With the computed angular minimizer, the trial quotient (13.11) decreases to 2πμ₂ from above.
  - **Counting coefficient.** For n = 2 and g = 8, channels m = 1, 2, 3 have no negative eigenvalue (minimum ground
    energies 1.43, 3.35, 5.30), channel m = 0 has exactly one negative branch, for |σ| < 0.744263, and
    L₂,₈ = 0.118453. With one branch, L equals the single-trial supremum S of Corollary 17.3. L₂,g increases
    continuously from 0 at g = 2πμ₂ up to g = 20.
  - **Native threshold for r = 0.8.** g_c = πλ₀/r = 2.4569.
- **Data drawn on screen.** The rank-order curves; the free Poisson profiles; H₀ and H_σ; R(y); the recovered values;
  the secant-bound curve κ + η/κ + η (η = 10⁻⁴, C = 1, shape only); the heat columns q₀ and q₁; the q₂ ratio curve and
  the q_n curves; the bars of 2πμ_n; the dilation bound 1 + (17/8)s²; the trial quotients; the L₂,g curve.
- **Illustrative visuals.** These are illustrations, not data: the slab drawings with pole halo and seam; the
  contact-group boxes; the coupling number line; the energy bars of the central remainder; the essential-spectrum line
  with trial levels −γ/(2a*²B²ʲ) for γ = 1, a* = 1, B = 3; the separated annuli; the lower staircase and the upper line
  of the count scene (illustrative constants).

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
