# 107 · FIB-NATIVE GREEN STABILITY II · SHARP COUPLING, CRITICAL CAPS AND COMMAND LAWS · FIB 原生 Green 稳定性 第二部 · 锐耦合、临界截断与指令律

This is the second of three films in the FIB-NATIVE GREEN STABILITY series and runs about 7½ minutes (7:25). It covers
`FIB_NATIVE_VARIABLE_COEFFICIENT_GREEN_STABILITY.md`, §1–§30, at subject commit `66f6190119`.

Part one treated the two-control Green form: off the double wall every positive coupling collapses, and a
constant-density family has a stable regime. This part keeps the same source, killed cylinder, phase torus and full
unit-source Green field, and lets the density and the horizontal covariance be any smooth positive choice. One angular
eigenvalue then fixes the sharp coupling, a spatial cap resolves the critical point on logarithmic scales, and finite
fair-sign commands generate the whole Green field.

## The film, scene by scene

- **Both walls (§1–§2, §7).**
  - Fix the killed cylinder Ω = I × T², one interior source o, any smooth ρ > 0 and any smooth SPD covariance A. The
    form is q_A,g = T_A − g ∫ Γ_A,o |f|² dμ with the full killed Green field Γ_A,o (1.1–1.2).
  - On the double wall, [P, Q] = −(1/r) ∂_β: a step-two contact system with weights (1, 1, 2) and volume exponent 4
    (2.1–2.2).
  - Theorem 7.1: a nonempty weak-coupling interval (closed and semibounded on exactly F_A, equivalent shifted norm,
    compact resolvent, attained minimum) exists if and only if both walls hold. On one wall Q_vol = 7, off both
    Q_vol = 11, and dilated tests with V ≥ c s^(2 − Q_vol) beat T ≤ C s⁻² at every g > 0.
- **Weak coupling (§3–§6).**
  - Freezing at o and the graded automorphism F_B (3.3a) turn the frozen operator into −(U² + V²) on the Heisenberg
    group. The full field obeys 0 ≤ Γ_A,o ≤ C N_o⁻² + B near o (Proposition 3.1).
  - The unweighted Hardy inequality (Ciatti–Cowling–Ricci, Cor. 3.2) gives V ≤ K_o T_A + B_o ‖f‖² (Proposition 4.2).
  - KLMN gives stability for g < g₋ = 1/(2K_o) (Theorem 5.1). Normalized annular dilations collapse the energy for
    g > g₊ = R_o(v) (Theorem 6.1).
- **Angular eigenvalue (§10).**
  - S b = −4(cos a · b′)′ + cos a · b on (−π/2, π/2), with natural endpoint conditions. Its ground state φ is positive
    and smooth on the closed interval, with simple eigenvalue λ₀, 1/4 ≤ λ₀ < 2/π.
  - The frozen unit-source kernel is R⁻²/(2π m₀), m₀ = ρ(o) det A(o)/2r (10.7). The sharp Hardy inequality
    ∫ |∇_H u|² ≥ λ₀ ∫ R⁻² |u|² holds for every complex u, all modes (10.8), and the critical coupling is
    g_c = 2π m₀ λ₀ (Theorem 10.2).
- **Sharp coupling (§11–§13).**
  - Γ_A,o − R⁻²/(2π m₀) = O(R⁻¹) (Theorem 11.1).
  - Below g_c the form is closed on F_A with an attained minimum; above it normalized core states collapse; at g_c it
    is semibounded and closable but not closed (Theorems 12.2 and 13.1).
  - The completion H · W_H strictly contains F_A. The critical minimum is attained only there, by states comparable
    to h = φ(a)/R near o (13.1).
  - The boundary depends on the source only through ρ(o) det A(o) (Corollary 13.2).
- **Spatial cap (§14–§17).**
  - Γ_ε = min{Γ, c_G ε⁻²} changes only the gauge ball R < ε(1 + O(ε)) (Proposition 14.2). The capped operators converge
    in norm resolvent sense, and E_ε ↓ E_* strictly (Theorem 15.1).
  - The ground state has a positive source trace a_* (Theorem 16.1).
  - L(E_ε − E_*) → a_*² π m₀ C/2 with L = log(b/ε), and the quotient ramps as a_* s across the logarithmic annulus
    (Theorem 17.2). V_raw/L and V_cap/L → a_*² M/12, T_A/L → g_c a_*² M/12 (Theorem 17.3).
- **Cap core Z (§18–§19).**
  - The rescaled state converges to the unique positive, source-regular profile Z with
    (−Δ_H − λ₀ min{R⁻², 1}) Z = 0 and Z/h = log R + κ_cap + o(1) (Theorem 18.1). The flux normalization is (18.5).
  - L²(V_raw − V_cap) → a_*² I_cap/2π (Theorem 18.2).
  - Under ρ → cρ, energies are invariant and attraction costs scale by 1/c (Corollary 19.1).
- **Angular pencil (§20–§21).**
  - Coupling g_c(1 + λ/L²) with the same cap. Λ(z), the lowest eigenvalue of S + z cos a, has Λ′(0) = C/M. Every
    nonzero θ-sector has level at least 2(√(n² + 1) − 1) > λ₀ (Lemma 20.2, (20.6)–(20.7)).
  - Only the double root s = 0 (solutions φ, tφ) lies in |Re s| ≤ 1.
  - The source boundary has defect numbers (1, 1): D(S_max) = D(S_min) ∔ span{p, ζ}, with a constant trace and a
    logarithmic coefficient. The self-adjoint realizations are A = κB, κ ∈ ℝ, and B = 0 (Theorem 21.1).
- **Collapse threshold (§22–§24).**
  - λ_D = π²/α with α = λ₀ M/C. For λ ≤ λ_D the ground energies stay bounded (Proposition 24.2).
  - For λ > λ_D, −E_ε ≍ ε^(−(2 − 2π/μ)) with μ = √(αλ) (24.1). The state concentrates onto W_∞, the unique positive
    decaying solution of (−Δ_H − λ₀R⁻²) W_∞ = −W_∞ with ∫ W_∞² = k/2 (Theorem 23.1). It joins the cap core Z by a
    half sine wave, log(s/ε) = π/q − κ_Σ + o(1) (Theorem 24.1).
  - The cap phase δ(q) = q κ_cap + O(q³) (Theorem 22.1) and the interior response estimate (Theorem 22.3) are shown
    as formulas only.
- **Quarter threshold (§25).**
  - At λ_Z = λ_D/4: E − E_* = −λ_Z S_b/L² − B₃/L³ + o(L⁻³), with S_b′ = S_b − D log(b′/b) (Theorem 25.2).
  - At the balance radius b_bal = b e^(S_b/D) the L⁻² term vanishes. B₃ = a_*² m₀ k ν⁴ Q_ang/2C > 0 because
    Λ″(0) = −2Q_ang/M < 0 (25.11). The separate costs still grow like D L/2.
- **Finite commands (§29).**
  - Cells of mesh δ_n = 1/n² use two fair signs, v_i = d δ + √(2δ) Σ ξ_i, with exact chord area; n³ cells
    (Definition 29.2). Every realization is a lawful command with 0 < ζ_n ≤ n + 1/n² (Lemma 29.3).
  - The laws converge to the diffusion with generator −L_A, including the area drift a¹² (Lemma 29.4).
  - The lifetimes have a mesh-uniform geometric tail (Lemma 29.5), so the expected occupation converges to the full
    unit-source Green field (Theorem 29.6).

一部约七分半钟的片子，FIB 原生 Green 稳定性系列第二部：保留同一个源、杀死边界的柱体和完整的单位源 Green 场，让密度和水平协方差取任意光滑正定的选择。弱耦合稳定区间存在当且仅当两道原生壁都成立；规范球面上的一个角向本征值 λ₀ ≈ 0.6257 给出锐临界耦合 g_c = 2π m₀ λ₀，临界处形式可闭而不闭，最小值只在完备化中取到；把 Green 场截断在 ε 尺度后，能隙按 1/log(b/ε) 闭合，截断核收敛到唯一剖面 Z；按 g_c(1 + λ/L²) 调耦合，角向束与源边界的 (1,1) 亏指数决定结构，λ_D = π²/α 以上能量按 ε 的幂趋于 −∞，λ_D/4 处主项可抵消而 B₃ 仍为正；最后，有限公平符号指令的寿命具有网格一致的几何尾（已在 Lean 中冻结），其期望占据时间收敛到完整的 Green 场。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-107-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One is used.
  - At the subject commit the volume's digestion ledger has 56 atoms: 1 absorbed-closed, 50 residual-open and 5
    nonpropositional-inapplicable.
  - The absorbed-closed atom is Lemma 29.5 (mesh-uniform full-lifetime tail). Its coverage GID is
    `D5/S3/Analytic/Probability/NativeCommandLifetime.actual_lifetime_estimates`, and the state file
    `Golden/Frozen/state/D5/S3/Analytic/Probability/NativeCommandLifetime.lean.json` exists at the subject commit. The
    commands scene badges the tail sentence as lean.
  - The same frozen theorem also states 0 < ζ_n ≤ (n³ + 1)/n², command lawfulness and the area identity of Lemma 29.3.
    The ledger links it only to Lemma 29.5, and the film badges those parts as theory.
- **Published results, used as external inputs.** The weak-coupling scene and the finale badge them as published.
  - Positive-time nilpotentization and local heat comparison: Colin de Verdière–Hillairet–Trélat, Theorem B, (2.8),
    Theorem 3.2.
  - Gaussian heat bounds with horizontal drift: Jerison–Sánchez-Calle, §6.
  - Unweighted Hardy inequality on the Heisenberg group: Ciatti–Cowling–Ricci, Corollary 3.2.
  - The lower bound λ₀ ≥ 1/4: D'Arca–Fanelli–Franceschi–Prandi, arXiv:2603.04086, Theorem 1.2(1).
- **Classical tools named in the volume.**
  - KLMN (Teschl, Theorem 6.24), the Heisenberg fundamental solution, Rellich compactness, Hörmander Harnack and
    Poincaré inequalities, min-max.
  - Boundary triplets: Derkach–Hassi–Malamud–de Snoo, arXiv:math/0610299.
  - Martingale FCLT tools: Whitt, arXiv:0712.1929.
  - Comparison literature cited in §19 and §26 (Abatangelo–Felli–Hillairet–Léna, arXiv:1611.06750; Vázquez–
    Zographopoulos, arXiv:1102.5661; Felli–Ferrero, arXiv:1209.4852; and others) is context only.
- **Project inputs, not recomputed here.**
  - Part one, `FIB_NATIVE_TWO_CONTROL_GREEN_STABILITY.md`: Propositions 2.1–2.2 and Theorem 3.1.
  - `AURIC_FIB_ATOM_PROBABILITY_PHASE_TRANSPORT_AND_HOLONOMY.md`: native means, wall table, Theorems 9.2–9.3, 10.7.
  - `FIB_NATIVE_GUARDED_LIFT_LIMITS_AND_DIFFUSION_SELECTION.md` and `FIB_NATIVE_FREE_DIFFUSION_QUOTIENT_RIGIDITY.md`
    for path contracts and the absorbing identification in §29.
  - §26–§28 and §30 point to the companion volumes `FIB_NATIVE_SPATIAL_CAP_RETAINED_AND_RESONANT_LIMITS.md` (the
    equality case λ = λ_D and the full operator classification) and
    `FIB_NATIVE_SINGULAR_OCCUPATION_AND_COMMAND_CAP_LIMITS.md` (point-source occupation). The film does not narrate
    these pointers.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script runs 61 checks. These are sampled and finite checks,
  not proofs.
  - **Structure.**
    - Q_vol = 11, 7, 4 from the growth vectors.
    - [P, Q] = −(1/r) ∂_β; the chart (2.3) sends P, Q to ∂x, ∂y + x∂z, with Jacobian −2r.
    - F_B pushes the frozen fields to U, V with Jacobian det(B)² (symbolic B).
    - Δ_H R⁻² = 0, |∇_H R|² = cos a, and the polar volume element is R³/4.
    - The polar energy identity (10.10) holds at 25 random points (relative error 8 × 10⁻¹⁶).
    - ∫ R⁻² (−Δ_H ψ) dq = 2π ψ(0) for a Gaussian ψ (to 10⁻⁹).
  - **Angular problem.**
    - λ₀ = 0.6256558 by Legendre Galerkin (14 and 24 modes) and by shooting (10.5a). This gives 1/4 < λ₀ < 2/π =
      0.6366198, the constant-trial value.
    - With φ(0) = 1: φ(±π/2) = 1.12641, φ′/φ = λ₀/4 at the endpoint, M = ∫ φ² = 3.40635, C = ∫ cos a φ² = 2.09311,
      k = πC/2 = 3.28785.
    - α = λ₀M/C = 1.01820, λ_D = 9.6932, λ_Z = 2.4233 = λ_D/4.
    - The Hardy quotient of u_L equals λ₀ + (C/M)/(2L²) for Gaussian χ.
  - **Pencil.**
    - Λ′(0) = C/M = 0.61447 and Q_ang = 0.038812, with Λ″(0) = −2Q_ang/M = −0.02279 (finite differences agree).
    - The roots of Λ(q²) = λ₀(1 + λ/L²) match (20.5) and (25.12).
    - q cot(q(L + κ_cap)) matches the expansion used in (25.17) at L = 30 and 60.
    - Nonzero sectors have Pöschl–Teller minima 0.8284, 2.4721 and 4.3245, equal to 2(√(n² + 1) − 1) at y = 0 and
      larger at y = 0.7, 2 and 5. The factorization (20.7) checks numerically.
    - The next generalized eigenvalue is 7.4997 > 1 + 16/π² − λ₀.
  - **Frozen profiles.** Both are solved as Galerkin × multi-domain Chebyshev boundary value problems.
    - κ_cap = 1.349814 and Z(0) = 1.566427, constant over angles.
    - Flux (18.5): 3.2878478 = k. Cap dilation (23.8): 1.6439239 = k/2. I_cap = 2.82700.
    - κ_∞ = −0.122519, κ_Σ = 1.227295.
    - ∫ W_∞² dq = 1.6439239 = k/2 and ∫ h W_∞ dq = 3.2878478 = k (23.2).
    - Z and W_∞ are positive on the grid.
  - **Constants.** 1/12 = (1/8π)(1/3)(2π); D = Kα = g_c a_*² M/4; πM/(8m₀N) = M/(2m₀C); the sign of the collapse
    trial (24.5).
  - **Commands.** The test model is r = 1, I = (0.05, 0.45), k_o = 0.25, ρ = 1 and A = [[0.010, 0.004], [0.004, 0.008]].
    - Exact fair-sign moments (29.8), the chord-area mean (29.10) and the chord identity j′ = a b′ are checked
      symbolically.
    - Simulated E ζ_n = 2.142, 2.140, 2.075 and 2.036 for n = 6, 10, 16 and 24, approaching E τ = 2.
    - Exact chord occupation is within 5.5 %, 4.1 %, 2.3 % and 1.4 % of the exact Green height profile.
    - Survival at n = 24 is within 0.01 of the killed-diffusion series and below 2^(−⌊(t − 1)₊/1.5⌋).
    - The area drift is E J₂ = 0.00804 against 2a¹² = 0.008.
    - All sampled lifetimes satisfy 0 < ζ_n ≤ n + 1/n².
- **Data drawn on screen.**
  - The wall table.
  - The φ(a) curve and the λ₀, 2/π and 1/4 marks.
  - The Λ(z) curve, its curvature dots and the sector-gap bars.
  - The Z/h and W_∞/h profiles with κ_cap and κ_∞.
  - The identity table.
  - The sampled command paths, the survival dots, the occupation histogram and the E ζ_n sequence.
- **Formula curves and illustrative visuals.** These are illustrations, not data:
  - the cylinder and the gauge-sphere wireframes;
  - the exponent lines in the wall plot;
  - the coupling axes and region boxes;
  - the h band near the source and the two density blobs;
  - the capped multiplier curve and the energy dots;
  - the limit ramp a_* s;
  - the s-plane and (A, B)-plane diagrams;
  - the exponent curve 2 − 2π/μ;
  - the S_b line;
  - the Green tent and geometric step bound (both exact formulas).

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
