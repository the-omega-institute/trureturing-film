# 106 · FIB-NATIVE GREEN STABILITY I · THE DOUBLE WALL, PERIODIC BINDING AND THE HIDDEN CIRCLE · FIB 原生 Green 稳定性 第一部 · 双壁、周期束缚与隐藏圆

This is part one of the three-part FIB-NATIVE GREEN STABILITY series and runs about 7 minutes. It covers the
whole of `FIB_NATIVE_TWO_CONTROL_GREEN_STABILITY.md` (§1–§35) at trureturing subject commit `66f6190119`. The
volume takes the five-mode source of the Auric FIB atom transport volume, adds one killed analytic operator, and asks
when attraction through that operator's own Green field stays bounded below. Part two (the variable-coefficient
companion of §35) and part three (central noise) are separate films.

## The film, scene by scene

- **Four regimes (§1–§2).**
  - Mode order (0, 1, 2, 3, 13), probabilities p_k = (r − X − Y + k, X − k, Z, Y − k, k), r = 1 − Z. Two controls:
    a height move ṗ = d k̇ with d = (1, −1, 0, −1, 1), and a phase move θ̇ = w(k) χ̇.
  - The fixed means pick one row (Definition 1.2): off both walls the current-ray leaf is 5-dimensional with growth
    (2, 3, 4, 5) and Q_vol = 11; on E₋ = {X + Y = r} or on E₊ = {X = Y} alone, 4 and Q_vol = 7; on both walls, 3 and
    Q_vol = 4. The direct rank is 2 in every row.
  - On I × 𝕋ᵐ with Dirichlet faces at k = l, u, periodic phases and the clock e^(−tL_A), the closed form has the gap
    L_A ≥ (ρ₋a₋/ρ₊) π²/(u − l)², a compact form embedding, and a positive, finite, integrable unit-source Green field
    Γ_A,o that is infinite at the source, because p_t(o, o) ~ c t^(−Q/2) with Q ≥ 4 (Propositions 2.1–2.2).
- **Collapse off the walls (§3, Theorem 3.1).**
  - In the privileged chart, normalized tests f_s have T_A[f_s] ≤ C s⁻² while V_A,o[f_s] ≥ c s^(2−Q).
  - 2 − Q is −5 on a single wall and −9 off both, so q_A,g[f_s] → −∞ for every g > 0: no semibounded closed form
    agrees with these energies.
- **The critical double wall (§4–§5, §7; Propositions 4.2–4.3, Theorem 5.1, Proposition 7.1, Definition 7.3).**
  - At X = Y = r/2 both energies scale like s⁻². In the chart (4.2), εP = ∂_ξ, Q = ∂_η + ξ∂_ζ and
    dμ = (ε²/2r) dξ dη dζ, so near the source Γ_ε,o = (2r/ε²) G_H + R_ε with R_ε bounded (G_H is the Heisenberg
    unit-source kernel, degree −2, homogeneous dimension 4).
  - With the Hardy inequality ∫ G_H |v|² ≤ C_H ∫ (|Uv|² + |Vv|²): V_ε,o ≤ (2rC_H/ε²) T_ε + B_ε. For g = γε² and
    0 < γ < (2rC_H)⁻¹ the form is closed on the same domain, q ≥ (1 − 2rC_Hγ) T_ε − γε²B_ε, the resolvent is compact
    and the minimum is attained.
  - Large γ still collapses: one test with 2rγ 𝒱(v) > 𝒯(v) suffices. The sharp threshold, its equality case, the
    exact global sign boundary and identity-covariance questions are left open (Definition 7.3).
- **Attained negative family (§6, Proposition 6.1, Theorem 6.2).**
  - ∫∫ Γ_ε,o dα dβ = ε⁻² G_I(k_o, k) with the tent G_I = (min − l)(u − max)/(u − l), and
    ∫ Γ_ε,o dμ = (k_o − l)(u − k_o)/(2ε²).
  - For f₁ = φ₁/(2π): q[f₁] = ε²π²/L² − γM_o/(4π²), negative when ε² < γ M_o L²/(4π⁴).
- **Binding on the unwrapped cover (§9–§11, Theorem 10.1, Proposition 11.1).**
  - On I × ℝ² with the same fields, killing and clock, the torus field is the lattice sum of the cover field, and the
    single-source cover field tends to zero at phase infinity.
  - g* = ε²/(2rC_H); for 0 < g < g*, (1 − g/g*) T̃ ≤ q̃_g ≤ T̃ on the same domain, and inf σ_ess = λ_D = ε²π²/d²
    for both the free and the attractive operator.
  - The logarithmic cutoff (∫|∇v_R|² = 2π/log(R/a)) gives a test below λ_D, so (1 − g/g*)λ_D ≤ E_g < λ_D, E_g is
    attained, isolated and of finite multiplicity, and minimizing sequences do not lose mass.
- **Exposing the hidden phase (§12–§15, Calculation 12.2, Theorem 13.1, Proposition 14.1, Interpretation 14.2).**
  - At X = Y = H + κ the hidden lift δ = h₀ − h₁₃ obeys dδ = κ g_κ(k) db with g_κ = (H + κ − k)/(H(k − α_κ)),
    α_κ = κ + κ²/H, and M_κ = g_κ(l).
  - Every lawful history reaching hidden angle χ has TV(b) ≥ χ/(|κ|M_κ); one explicit nine-leg polygon gives every
    upper bound up to one constant K, so |κ|V*, |κ|L* → c = χHl/(H − l) and κ²E* → c²/T, for both signs.
  - With a budget, sup d(D, 0) ≤ min{π, |κ|M_κ TV(b)}; the exposed endpoint differs from the constant history by
    4√((k₀ − 2κ)Z) sin(χ/2) in the doubled 02 coherence pair.
- **Rare excursions (§16–§19, Proposition 16.2, Theorem 17.1, Proposition 18.1).**
  - Under the killed law dK = √2ε dB¹, dh_s = √2 w_s(K) dB², the hidden lift is √2κ W(∫ b_κ(K)² ds).
  - c₀/cosh(χ√λ₁(κ)/|κ|) ≤ P_κ(χ) ≤ C₀/cosh(χ√λ₁(κ)/|κ|), with λ₁(κ) the Dirichlet eigenvalue of
    −ε²φ″ = λ b_κ² φ, and |κ| log P_κ(χ) → −χ√λ₁(0) through both signs.
  - The event is exactly the departure of the normalized 02 coherence from the three-coordinate section by sin(χ/2).
- **Heat smoothing (§20–§24, Theorems 20.2, 21.2, 22.1, 23.1, 23.3).**
  - V_κ,τ = ∫_τ^∞ p_κ(t, o, ·) dt is bounded, L_κ V_κ,τ = p_κ(τ, o, ·) with charge S(τ) ∈ (0, 1) and mass
    E(ζ − τ)₊ < (k₀ − l)(u − k₀)/(2ε²); at each κ the minimum is finite and attained.
  - λ_D − gC_τ/|κ| ≤ E_κ,τ(g) ≤ C_F − gc_τ/|κ|, so for every fixed g > 0 the minimum tends to −∞. Unit-charge
    normalization gives E#(g) = E(g/S(τ)); the D-independent sector stays uniformly bounded.
- **Moving clock (§25–§30, Theorems 26.1, 27.1, 28.1, Propositions 28.2, 29.1).**
  - The hidden gap satisfies cκ² ≤ δ_κ ≤ Cκ², and p_κ(t, o, y) ≤ C e^(−λt)(1 + 1/(|κ|√t)).
  - Raw charge is stable iff liminf |κ|√τ e^(λτ) > 0, i.e. τ ≥ (L − ½ log L)/λ − O(1) with L = log(1/|κ|); unit charge
    iff liminf κ²τ > 0. At τ = L/λ, E_raw → λ while E_unit → −∞.
  - S(t) = (4/π) Σ sin((2j + 1)ξ₀)/(2j + 1) e^(−(2j+1)²λt); at the raw boundary S(τ) = C_o |κ| √L e^(−λs)(1 + o(1)).
- **Heat traces (§31–§35, Theorems 31.2, 32.1, 33.1, 33.2, 34.1).**
  - |κ| Z_κ(t) → F(t); |κ| t^(7/2) Z_κ(t) → C₇ = (2π)³ ε⁻⁴ H(u⁴ − l⁴)/2 · c_E for every joint limit, with
    D_κ(s) = −(H² − κ²)/(2H³(s − α_κ)³).
  - e^(λz/κ²) Z_κ(z/κ²) → Θ_β(z) = Σ e^(−βzj²), β = ∫ b₀² φ² dk; on intermediate paths Z_κ ~ e^(−λt)√(π/β)/(|κ|√t).
  - The zero leaf (Q = 4, finite trace), the resolved cover (Q = 7, density F/(2π)) and the frozen four-coordinate
    operator (infinite multiplicity) are distinct; the controls keep rank two in all of them. §35 points to part two.

一部约七分钟的片子，FIB 原生 Green 稳定性三部曲的第一部：五个模式、两个控制，以同一自由算子的完整 Green 场作吸引。离开两壁或只在一壁上，齐次维数 11 或 7，集中试验态让能量对每个正耦合都无下界；在双壁上齐次维数为 4，平衡是临界的，局部模型是 Heisenberg 群，Hardy 不等式给出 γ < 1/(2rC_H) 的严格稳定窗口，并有可取到的负能量族；把相位展开到平面上，g* 以下存在严格低于 λ_D 的束缚态。均值移离双壁 κ 后，隐藏相位的露出代价按 1/κ 增长，κ 乘以代价趋于 χHl/(H − l)；布朗驱动下罕见偏离的概率满足 |κ| log P → −χ√λ₁(0)；热抹平后的场在每个 κ 上有界，却以 −g/|κ| 失去一致性；随 κ 移动的抹平时间给出原始电荷与单位电荷两种不同的稳定尺度；最后是热迹的 7/2 次短时律与 θ 函数混合律。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-106-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used for a badge.
  - At the subject commit the digestion ledger for this volume (`fib-native-two-control-green-stability`) has 70
    atoms: 66 residual-open and 4 nonpropositional-inapplicable; none is absorbed-closed or partial-closed.
  - The volume cites the frozen module `D5/S3/Quantum/Fibers/FiniteRectangleTransport` (`finite_rectangles_realize`
    and its legs; state file present at the subject commit) only as the model for affine probability and phase legs.
    The digestion ledger does not link it to this volume, and the film does not badge it.
  - Every statement shown is badged theory, except the cited inputs below.
- **Published results, used as external inputs.** The critical scene and the finale badge them as published.
  - Hardy inequality on stratified groups and the unit-source kernel I₂: Ciatti–Cowling–Ricci, arXiv:1308.2373
    (DOI 10.1016/j.aim.2014.12.040), §2 and Corollary 3.2; an alternative supplier is Bahouri–Chemin–Gallagher,
    Ann. Sc. Norm. Super. Pisa (5) V (2006), Theorem 1.2.
  - KLMN, min-max and Trotter domination: Teschl, *Mathematical Methods in Quantum Mechanics*, GSM 99, Theorems 6.24,
    4.10 and 5.11.
  - Hypoelliptic heat kernels, localization and parameter continuity: Colin de Verdière–Hillairet–Trélat, Annales
    Henri Lebesgue 4 (2021), DOI 10.5802/ahl.93.
  - Local compactness of Schrödinger semigroups: Lenz–Stollmann–Wingert, arXiv:0903.0280.
  - Context only, with hypotheses not imported: Hoang–Hundertmark–Richter–Vugalter, arXiv:1610.09891 (weak binding);
    de Castro–Gamboa, Jean, Antonelli–Le Donne–Nicolussi Golo, Cannarsa–Martinez–Vancostenoble and
    Zeier–Schulte-Herbrüggen (§15.2).
- **Classical tools named in the volume.** Brownian interval exit and Gaussian time change (Mörters–Peres), regular
  Sturm–Liouville theory (Teschl, ODE), Dirichlet Poincaré, the logarithmic two-dimensional cutoff, Poisson summation.
- **Project inputs, not recomputed here.** Badged theory: the native source, its regime table and local heat
  hypotheses from *Auric FIB atom probability, phase transport and holonomy* (Theorems 8.2, 8.4, 10.3, 10.7);
  Continuation III §§81–83; the observation-quotient and free-diffusion-quotient volumes; the guarded-lift volume;
  the critical-cutoff volume for β and (32.4); §35 points to the variable-coefficient companion (part two).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory. The optimal local
  coupling, its equality case, the exact global sign boundary, identity-covariance negativity and uniform limits in ε
  are open in the volume (Definition 7.3), and the film says so.
- **Recomputed for this film.** An independent Python script (sympy, numpy/scipy, Monte Carlo) checks the following.
  - **Regimes.** The grouped-pole Wronskian (w⁽ʲ⁾/j!) is invertible with m = 4, 3, 3, 2 at six heights per regime,
    giving Q_vol = 1 + m(m + 1)/2 = 11, 7, 7, 4.
  - **Heisenberg chart.** Symbolically: εP = ∂_ξ, Q = ∂_η + ξ∂_ζ, measure ε²/(2r), [U, V] = ∂_ζ, periods
    (4π, 4πr c_o) and (0, −2πr); the map (ξ, η, ξη − 2ζ) sends U, V to ∂_a + b∂_c, ∂_b − a∂_c with Jacobian 2.
  - **Tent and negative family** (I = (0.1, 0.3), k_o = 0.2). Finite-difference Green of −∂² equals G_I to
    6 × 10⁻¹⁴; ∫ G_I = 0.005; M_o = L(1/8 + 1/(2π²)) = 0.035132; critical ε²/γ = M_o L²/(4π⁴) = 3.607 × 10⁻⁶;
    Monte Carlo mean exit time 0.00498 against (k₀ − l)(u − k₀)/(2ε²) = 0.005.
  - **Cover.** ∫|∇v_R|² = 2π/log(R/a) for R/a = 10 … 10⁶; λ_D = 246.74 (ε = 1, d = 0.2); M = 0.31454.
  - **Exposure** (Z = 0.2, H = 0.4, k₀ = 0.2, χ = 1, T = 1). Calculation 12.2 symbolically from the five weights
    (I_κ, A_κ, B_κ, g_κ, dᵀw = 1, (w₀ − w₁₃)/w₁₃ = 2κ/(k − 2κ)); M₀ = 7.5 and c = 0.13333. The nine-leg polygon
    for 24 values κ = ±2 × 10⁻² … ±5 × 10⁻⁶ ends with hidden lift exactly χ and visible lifts exact multiples of 2π;
    B_κ ≤ L_fam ≤ B_κ + K with L_fam − B_κ in [0.73, 135.7]; at κ = ±5 × 10⁻⁶, |κ|L_fam = 0.13361 and 0.13352 and
    κ²E_fam = 0.01785 and 0.01783 (c² = 0.01778). On 400 random guarded histories |δ(T)|/(|κ|M_κ TV(b)) ≤ 0.688. The
    02 separation equals 4√((k₀ − 2κ)Z) sin(χ/2) for random preparations (limit 0.38354).
  - **Excursions.** Test case ε = 0.1, I = (0.2, 0.3), k₀ = 0.25, κ = 0.04, χ = 0.05: Sturm–Liouville series 0.46710,
    2D elliptic solve 0.46721, Monte Carlo of the two-driver law 0.4664 (60 000 paths). Main data: λ₁(0) = 25.6217
    (finite differences and shooting agree to 2 × 10⁻⁷), √λ₁(0) = 5.0618; c₀/cosh ≤ P_κ ≤ C₀/cosh holds at 16
    parameters (c₀ = ½, log C₀ = 711.1); |κ| log P_κ = −4.952 and −5.169 at κ = ±0.002.
  - **Survival.** The sine series S(t) matches 40 000 Monte Carlo exit times within 0.0034; C_o = 4/π = 1.2732;
    M(t)/S(t) → 1/λ; at the raw boundary S = C_o|κ|√L e^(−λs).
  - **Hidden gap and traces.** β = ∫ b₀² φ² dk = 8.1915; gap/κ² = 21.19, 12.75, 10.16, 9.11, 8.64, 8.36, 8.29 for
    κ = 0.04 … 0.0005, within 2% of β_κ = ∫ b_κ² φ², Richardson limit 8.225. Visible-mode gaps stay positive (0.0082 to
    0.25); the next height level is 4λ. Poisson summation for Θ_β holds to 10⁻¹²; at κ = 0.001 the compensated trace
    from exact scalar eigenvalues is within 1.1% of Θ_β(z) for z = 0.005 … 1; 1 − 1/Θ_β = 0.8385, 0.4894, 0.0006 at
    z = 0.01, 0.1, 1.
  - **Moving clock.** t_a = (L − ½ log L)/λ + O(1) for L = 5 … 160; R → √λ e^(−λs); at τ = L/λ, R → 0 and U → ∞.
  - **Determinants.** det(a₀, a₀′, a₀″) = −1/(2Hk³), det((A₀, A₀′), (B₀, B₀′)) = −1/(4H),
    D_κ(s) = −(H² − κ²)/(2H³(s − α_κ)³), coefficient map determinant −2H², ∫ 2Hs³ = H(u⁴ − l⁴)/2 (C₇/c_E = 0.39688).
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.** The regime table; the power laws s⁻², s⁻⁵, s⁻⁹; the tent G_I and φ₁²; the cutoff excess
  2πM/log(R/a); the κ = 0.002 polygon; the |κ|L_fam dots and lower bound; the sample paths of the killed law; the
  |κ| log P_κ dots; S(t) with its Monte Carlo dots; the gap/κ² dots and β_κ; the stability boundaries (plotted with
  λ = 1); the curve 2Hs³; Θ_β with the eigenvalue dots.
- **Illustrative visuals.** These are illustrations, not data: the orbit emblem; the animated probability bars; the
  nested dilation boxes; the killed cylinder; the γ window bar; the unwrapped lattice and halo; the spectrum ladder;
  the q[f₁] line on normalized axes; the smoothed-field bumps; the four object boxes.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
