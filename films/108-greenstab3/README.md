# 108 · FIB-NATIVE GREEN STABILITY III · CENTRAL NOISE AND THE NEGATIVE LADDER · FIB 原生 Green 稳定性 第三部 · 中心噪声与负谱阶梯

This is part three, the last part, of the three-part FIB-NATIVE GREEN STABILITY series and runs about 7½ minutes. It
covers `FIB_NATIVE_CENTRAL_NOISE_GREEN_STABILITY.md` (§1–§35) and its continuation
`FIB_NATIVE_CENTRAL_NOISE_GREEN_STABILITY_CONTINUATION_I.md` (§1–§6) at trureturing subject commit `d3e7a2a339`.
The volumes keep the double-wall source of part one, add an independent central Brownian noise of size ε = |ν| to the
area, and follow the attractive form q = T − gV built from the operator's own full unit-source Green field as ε → 0.

## The film, scene by scene

- **Central noise and the Green crossover (§1–§3; Definitions 1.1–1.2, Theorem 1.3, Definition 2.1, Theorem 3.1).**
  - Source: X = Y = H = r/2, probabilities (k, H − k, Z, H − k, k), cylinder Ω = (l, u) × T² with raw measure
    dk dα dβ, killing at both height faces. The law has J_t = ∫ W¹ dW² + ν C_t with three covariance-2 Brownian motions;
    the generator is L_ε = −(P² + Q² + ε² Z_c²), elliptic for ε > 0, with the same clock e^(−tL_ε).
  - The unit-source field Γ_ε,o = ∫₀^∞ p_ε(t, o, ·) dt has total mass (kₒ − l)(u − kₒ)/2 and an exponential tail with
    rate λ_I = π²/(u − l)².
  - In the exact chart x = k − kₒ, y = 2(α − αₒ), θ = z − xy/2 the fields are U, V, Z_H and dμ = m₀ dξ, m₀ = 1/(2r).
    Near the pole Γ_ε,o ≍ 1/(m₀ d(ε + d)): a Coulomb law 1/(m₀εd) below the noise scale and an inverse-square law
    1/(m₀d²) above it; the on-diagonal heat law moves from (m₀εt^(3/2))⁻¹ to (m₀t²)⁻¹.
- **Stable at each noise, not uniformly (§4–§5; Theorems 4.1, 5.1).**
  - For every fixed ε > 0 and every g > 0 the form is closed on the free domain, with compact resolvent and an attained
    minimum E_ε(g); the key bound is ‖(L_ε + a)⁻¹Γ_ε,o‖∞ ≤ C/(ε√a) for a ≥ ε⁻².
  - For every fixed g > g_c = 2πm₀λ₀ = πλ₀/r: −C_g/ε² ≤ E_ε(g) ≤ −c_g/ε² < 0 for small ε, either sign of ν.
- **No flat readout (§9–§11; Theorem 9.2, Corollary 9.3, Theorem 10.2, Definition 11.2).**
  - A constant-diffusion match (a G_ε + B)(f∘F) = (A_D,b f)∘F, even with a positive retiming factor and arbitrary
    drifts, forces F*(D⁻¹) = a⁻¹ g_ε, i.e. a conformally flat kinetic metric.
  - The metric g_ε = dx² + dy² + ε⁻²(dθ + y dx/2 − x dy/2)² has Ric = diag(−h²/2, −h²/2, h²/2), Scal = −h²/2,
    Schouten diag(−3, −3, 5)h²/8 and Cotton C(E₁, E₂, E₃) = −h³ = −ε⁻³ ≠ 0 (h = 1/ε). So there is no exact Euclidean
    kinetic-distance readout, and an all-start killed response on the same clock would force the excluded identity.
- **Occupation bridge and the capped Feynman–Kac response (§6–§7, §12–§14; Theorem 6.2, Proposition 7.1,
  Theorem 12.2, Corollary 13.1).**
  - Command tracking transfers bounded continuous occupation, and in the iterated limit the full Green occupation.
    The field is square integrable (E∫Γ(q_t) dt = ∫Γ² dμ < ∞), yet a lawful hold at the pole makes the uncapped
    occupation of every held path infinite.
  - With the cap V_B = min(Γ, B), the paid execution's weight approaches R(f) = E_o[e^(gA) f(q†(T))] = (e^(−TH) f)(o),
    with error C[1/B + B²η + B e_η + √δ + δ e^(gBT)]. The schedule η = cB⁻³, δ = e^(−(gT+1)B) gives error O(1/B), with
    M = O(B⁷) reads, variations O(B³ + ε²B⁶) and energy O(B⁶ + ε⁴B¹²).
- **Coefficient and threshold (§15–§16; Proposition 15.2, Theorems 16.1, 16.3, Corollary 16.4, Corollary 17.2).**
  - ε²E_ε(g) → e(g/m₀) = e(2rg), the bottom of the unit-noise whole-group problem Q_γ = T₁ − γ∫G₁|u|², with the lower
    bound E_ε(g) ≥ ε⁻²e(2rg) − C_g.
  - The native energy is uniformly bounded below exactly when g ≤ g* = Λ*/(2r); Λ* ≤ 2πλ₀ via the annular witnesses,
    and the boundary-response volume (Theorem 9.3) gives Λ* = 2πλ₀, so g* = g_c. Above it near-minimizers concentrate at
    the pole.
- **Self-field occupation (§17; Theorem 17.1, Corollary 17.2).**
  - J_ε = E_o∫₀^τ Γ(q_t) dt = ∫Γ² dμ is finite, and J_ε/log(1/ε) → 1/(8m₀) = r/4 (remainder only o(log(1/ε))).
  - |B₁| = π²/8, ∫ over A < R < L of R⁻⁴ dξ = (π²/2) log(L/A), and (1/(2π))² · π²/2 = 1/8.
- **Universal profile (§18–§20; Theorems 18.2, 19.1, 20.1).**
  - Above g_c the unit problem has a unique, strictly positive, simple and isolated ground state h_g with a coercive gap,
    and |E_ε(g) − e_g/ε²| ≤ C.
  - Every near-minimizer, rescaled at the pole, converges to h_g up to one constant phase:
    ‖ζ⁻¹B_ε f − h_g‖² + ‖ψf‖² + ε²T_ε[ψf] ≤ C(D_ε + ε²). No mass is lost and both energy coefficients converge.
- **Chord floor (§21–§25; Proposition 21.2, Theorem 22.1, Corollary 23.1, Theorem 23.2, Theorem 24.1).**
  - On fixed cores the global kinetic distance is exactly ε times the unit distance. Four points Exp(±tU), Exp(±tZ_H)
    give the signed sum Σ sᵢsⱼ d² = (2/3)t⁴ + O(t⁵) > 0, while every Hilbert space gives −2‖Σ sᵢvᵢ‖² ≤ 0.
  - Hence every Borel Hilbert chord readout has truncated pair error at least c₀ and RMS error between √c₀ ε and 2Rε;
    deleting vanishing mass keeps the floor; a window of radius s_ε ≪ ε holds vanishing mass.
- **Seam and face rank law (§26–§35; Proposition 26.3, Theorems 27.1, 28.1, Definition 29.1, Theorems 32.1, 33.1,
  34.1–34.2).**
  - For every Fourier mode, turning points included, the seam flux a_mn obeys c*M ≤ a_mn ≤ C*M with
    M = 1 + √s + |m/2 + c(h)n| + √(|n|/r) + ε|n|/r, c* = (19 + A₀⁻¹)⁻¹, C* = 4 + 2/d; for n = 0,
    a = ω[coth(ωℓ₋) + coth(ωℓ₊)].
  - The best rank within η is of order 1/(η²(η + ε)): η⁻³ without noise, 1/(εη²) below it. One lower face obeys the
    same law with c_l = 1/37, C_l = 2, also at ε = 0, with ‖C(s)‖ = [√s coth(h_I√s)]⁻¹ ≤ h_I and exit masses
    (u − kₒ)/h_I, (kₒ − l)/h_I. The resolvent satisfies R_ε = R_ε,D + P C_ε P*.
- **Coupling onset (continuation §1–§2; Theorem 2.1).**
  - Above γ_c = 2πλ₀, e is C¹, strictly concave, with e′(γ) = −V[h_γ] < 0.
  - At onset e(γ) = o(γ − γ_c) and ‖Z_H h_γ‖² = o(γ − γ_c); the joined curve is C¹ and the ground states escape:
    h_γ ⇀ 0 and leave every compact set while keeping unit norm.
- **Negative ladder (continuation §3–§5; Theorem 3.1, Corollary 3.2, Lemmas 4.1–4.2, Theorems 5.1–5.2, Corollary 5.3).**
  - For each γ > γ_c there are infinitely many negative eigenvalues λₙ ↑ 0, and N_γ(t) ≥ c_γ log(1/t) − C_γ with
    c_γ = 1/(2 log L), from dilations of one annular witness by powers of L.
  - Every fixed level transfers: |E_ε,n(g) − ε⁻²λₙ(g/m₀)| ≤ C_g,n; the native negative count is at least
    c_g log(1/ε) − C_g; the ground gap is ε⁻²Δ_γ + O(1) with Δ_γ → 0 as γ ↓ γ_c.

一部约七分半钟的片子，FIB 原生 Green 稳定性三部曲的第三部，也是最后一部：在第一部的双壁源上加入一个大小为 ε 的独立中心噪声。每个固定噪声下算子都是椭圆的，吸引形式闭、预解式紧、最小值可取到；但耦合超过水平阈值 g_c = πλ₀/r 时，最小值夹在 1/ε² 的两个负倍数之间，无法一致稳定。度量是 Nil 几何，其 Cotton 张量为 −ε⁻³，因此不存在平坦的精确读出。截断后的付费执行逼近极点处的 Feynman–Kac 响应，误差为 O(1/B)。放大极点后，ε²E 收敛到 Heisenberg 群上单位问题的底，一致下有界当且仅当 g ≤ g_c；自场占用按 (r/4) log(1/ε) 增长；近极小态普适地收敛到唯一正基态；Hilbert 弦读出的误差下界为 √c₀·ε；缝与单面的最优秩为 1/(η²(η + ε)) 量级。续卷证明了起始处 C¹ 的平缓拼接，以及向零攀升的无穷负谱阶梯。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-108-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used for a badge.
  - At the subject commit neither volume has a digestion ledger (no directories
    `fib-native-central-noise-green-stability` or `fib-native-central-noise-green-stability-continuation-i` under
    `Meta/Digestion/backfill/`): 0 atoms, nothing ingested, nothing covered or frozen.
  - The volumes state that their proofs carry no Lean certification. Every statement shown is badged theory, except
    the cited inputs below (one line of the chord scene is badged classical for the Hilbert negative-type identity).
- **Published results, used as external inputs (as cited in the volumes).** The finale badges them as published.
  - Uniform Gaussian heat bounds and positive-time convergence: Capogna–Citti–Manfredini, arXiv:1212.6665v2,
    §2, Propositions 2.1–2.2; regularized gauge: Capogna–Citti, arXiv:1504.04762v1, Lemma 2.13.
  - KLMN, IMS and min–max: Teschl, *Mathematical Methods in Quantum Mechanics*, Theorem 6.24, Lemma 11.3,
    Theorems 4.10–4.12.
  - Cotton criterion for conformal flatness: García–Hehl–Heinicke–Macías, arXiv:gr-qc/0309008v2, §§IV–V; convention:
    Kişisel–Sarıoğlu–Tekin, arXiv:0803.1603v2, Appendix B.
  - Khas'minskii moments and Feynman–Kac: Güneysu, arXiv:1109.0151v3, Proposition 2.5 and Theorem 2.9.
  - Form-domain compactness: Lenz–Stollmann–Wingert, arXiv:0903.0280v2, Theorem 1.3.
  - Normal-coordinate distance expansion: Pennec, arXiv:1906.07418v1, §3.3; negative type: Schoenberg,
    Trans. Amer. Math. Soc. 44 (1938) 522–536, DOI 10.1090/S0002-9947-1938-1501980-0.
  - Boundary pairs: Post, arXiv:1210.4707v2, Theorem 4.3; sign correspondence: Alpay–Behrndt, arXiv:0807.0095v1;
    DtN framework: Arendt–ter Elst, arXiv:1005.0875, and Girouard–Polterovich, arXiv:1411.6567.
- **Classical tools named in the volumes.** Itô's formula, Schur's test, the three-dimensional Hardy inequality,
  Rellich compactness, the spectral theorem, spectral truncation and rank–nullity, Laplace-transform uniqueness.
- **Project inputs, not recomputed here.** Badged theory: the native source and chronology (*Auric FIB atom probability,
  phase transport and holonomy*), the central-noise law and paid interfaces (*Guarded lift limits*, *Paid-point
  observation tracking*), λ₀ and the annular witnesses (*Variable-coefficient Green stability*, Definition 10.1 and
  Theorem 10.2, which give 1/4 ≤ λ₀ < 2/π), the threshold identity Λ* = 2πλ₀ (*Native attractive boundary response*,
  Theorem 9.3, Corollary 11.2), part one (*Two-control Green stability*).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory. The volumes assert
  no exact asymptotic constant for the ε⁻² rate, no critical exponent, no exact logarithmic counting coefficient and no
  uniformity as n → ∞ or g ↓ g_c; the film does not claim them.
- **Recomputed for this film.** An independent Python script (sympy, numpy/scipy, Monte Carlo; 75 checks) checks the
  following at the datum Z = 0.2, r = 0.8, I = (0.05, 0.35), kₒ = 0.15.
  - **Chart.** P, Q, Z_c push forward to U = ∂ₓ − (y/2)∂_θ, V = ∂_y + (x/2)∂_θ, Z_H = ∂_θ; Jacobian 2r, so m₀ = 1/(2r);
    deck action (x, y, z) ↦ (x, y + 4πn, z + 4πr c(kₒ)n − 2πr m); [U, V] = Z_H; Δ_H R⁻² = 0; the polar chart has
    |∇_H R|² = cos a, |∇_H a|² = 4cos a/R², volume R³/4, and G₀ = R⁻²/(2π) has unit flux.
  - **Green mass and exits.** Monte Carlo mean exit time 0.00998 vs (kₒ − l)(u − kₒ)/2 = 0.01 (40 000 paths);
    P(exit at l) 0.662 vs 0.667; E[e^(−20τ); exit at l] 0.567 vs 0.572; survival rate 109.4 vs λ_I = 109.7.
  - **Crossover.** ∫e^(−d²/t) dt/(t^(3/2)(ε + √t)) · d(ε + d) stays in [1.000, 1.771] for d/ε from 10⁻⁴ to 10⁴; the model
    resolvent bound K(a)ε√a stays in [1.73, 3.45] for a ≥ ε⁻².
  - **λ₀.** Finite elements and zero-flux shooting give λ₀ = 0.625656 (agreeing to 10⁻⁶), inside [1/4, 2/π); so
    g_c = πλ₀/r = 2.457 at r = 0.8 and γ_c = 2πλ₀ = 3.931. The annular quotient (16.16) is reproduced by quadrature for
    L = 0.5, 1, 3 (8.19010, 2.51677, 0.83578), with ∫cos a φ²/∫φ² = 0.6145. The volumes give no numerical λ₀; this value
    is a recomputation.
  - **Cotton.** Symbolically: orthonormal frame (P, Q, εZ_c), Scal = −1/(2ε²), Ric = diag(−1, −1, 1)/(2ε²),
    Schouten diag(−3, −3, 5)/(8ε²), C(E₁, E₂, E₃) = −ε⁻³, ⟨R(E₁,E₃)E₃,E₁⟩ = 1/(4ε²), ⟨R(E₁,E₂)E₂,E₁⟩ = −3/(4ε²).
  - **Caps.** sup over x of ∫ over |y| < b of dy/(|x − y||y|) = 4πb; the schedule exponents B²η = c/B, δe^(gBT) = e^(−B),
    M ~ (gT + 1)B⁷/c², variations ~ B³ + ε²B⁶, energy ~ B⁶ + ε⁴B¹².
  - **Occupation.** |B₁| = π²/8 exactly and 1.2338 by Monte Carlo; shell ∫ over 1/2 < R < 1 of R⁻⁴ = 3.418 vs
    (π²/2) log 2 = 3.421; coefficient 1/8 and r/4 = 0.2.
  - **Chord.** Riemannian Heisenberg geodesics by shooting (checked shortest among 300 starts): cross distance² =
    2t² − t⁴/12 + O(t⁵) for t = 0.025 … 0.4, and S/t⁴ = 0.6666 at t = 0.025; the Hilbert identity on 2000 random tuples.
  - **Seam and face.** On 4000 random modes (s up to 400, ε up to 3, turning modes included) a/M ∈ [0.854, 3.761] inside
    [c*, C*] = [0.0524, 24] and λ/M_l ∈ [0.258, 0.944] inside [1/37, 2]; the n = 0 formula to 10⁻⁶; tent integrals;
    ‖P₀‖² = ℓ/3; λ_mn ≥ √s coth(h_I√s).
  - **Rank counts (one face, h_I = 0.3, s = 0).** At η = 0.0375 the rank is 328 845 (ε = 0), 69 083 (ε = 0.05) and
    17 841 (ε = 0.2), inside the explicit bounds of (33.3); d·η²(η + ε) stays in [16.5, 17.3], [8.4, 13.7] and
    [5.9, 7.9] for 1/η ∈ [6, 28]; log-log slopes 3.02 (ε = 0) and 2.01 (ε = 0.2).
  - **Continuation.** On 50 random finite-dimensional pencils T − γV: concavity, slope −⟨h, Vh⟩ and the bracket (2.4);
    the counting inequalities (3.7) and (5.14) on parameter grids.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.** The curves 1/(d(ε + d)) with the heat-integral dots; the angular ground state φ; the cap
  error-budget curves (unit constants, c = 0.5, gT = 1); the gauge-ball cross-section R⁴ = ρ⁴ + 16θ² < 1; S/t⁴ from
  geodesic shooting; the seam scatter a_mn against M; the one-face rank counts.
- **Illustrative visuals.** These are illustrations, not data: the cylinder and ladder emblem (rungs at −0.62ʲ); the
  E_ε(g) envelope; the J_ε line and its band; the e(γ) and λ₁, λ₂ shapes; the bumps, phase dial, rings and annuli; the
  tracking paths; the relative-bound gauge; the zoom box.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
