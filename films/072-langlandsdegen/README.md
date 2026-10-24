# 072 · AURIC–LANGLANDS IV · DEGENERATION, RAMIFICATION AND STABLE RECOVERY · AURIC–Langlands 第四部：退化、分歧与稳定恢复

This is the fourth and last film in the AURIC–Langlands series and runs about 6½ minutes. It covers
`AURIC_LANGLANDS_DEGENERATION_RAMIFICATION_AND_STABLE_RECOVERY_THEORY.md` in trureturing (§1–§9), at subject
commit `cad23afa4b`.

Part three acquired sources and selected one sheet. This volume goes where things degenerate:
- where the quadratic data stop separating sources;
- where readings collide while the sources stay apart;
- where the sources themselves ramify, and what their sign does to a given spectral lift;
- where a radial observation of the Green field turns critical.

## The film, scene by scene

- **Differential fibre (§1).**
  - For an antisymmetric source A in five dimensions, q(A) = (σ, γ, β) with σ = −½ tr A², γ = −A² + ⅕ tr(A²) I and
    β = *(ω_A ∧ ω_A) (Definition 1.1).
  - dim ker Dq_A is 10 at A = 0, 2 on the equal-weight rank-four layer and 0 elsewhere. The two-dimensional kernel
    is the tangent plane of the sphere of sources sharing the same data (Theorem 1.2).
  - On compact sets away from that layer the inverse is Lipschitz. The pair A_δ = (s+δ)J₁₂ + (s−δ)J₃₄,
    B_δ = (s+δ)J₁₃ − (s−δ)J₂₄ is strictly legal and has d±/‖Δq‖ = √(s² + δ²)/(2sδ) ~ 1/(2δ) (Theorem 1.3).
- **Three depths (§2).**
  - With the filter F = diag(1, …, 5)/6 read at depths 0, 1 and 2, the panel 𝒯_F of 50 numbers has rank 45 and a
    ten-dimensional kernel with no nonzero element of rank at most two (Proposition 2.2).
  - With only depth one, a whole ℝP¹ of strictly legal sources A_θ = s(cos θ L₂ + sin θ L₃) on n⊥, with
    n = (√30, 0, √35, 0, √63)/√128, gives the same original, success and failure readings (Theorem 2.4).
  - Any two fixed depths fail in the same way, so three depths are the minimum for a fixed panel (Corollary 2.5).
    Near zero no Hölder inverse with exponent above ½ exists (Proposition 2.6).
- **Hecke types (§3).**
  - The quadratic data are the 20-dimensional quotient 𝟏 ⊕ V₁₄ ⊕ V₅ of Sym²(𝔰𝔬₅) (dimension 55), with kernel W of
    dimension 35 (Definition 3.1).
  - The panel separates the tensors of sL₁ and sL₂, whose difference lies in W, but its fixed filter is not
    SO₅-equivariant, so it is no substitute for the Hecke functors (Proposition 3.2).
  - The non-vanishing of 𝖧(p_W)_x(𝓕) needs the full eigen-structure with its naturality (3.1), supplied under the
    stated de Rham, half-twisted and unramified conditions (Assumption 3.3).
- **Collision and ramification (§4).**
  - disc Q_m = I_m² Δ_{𝒜,b} and v_s(disc Q_m) = v_s(Δ) + 2 length_R(𝒜/R[m]). Over an étale source a reading
    collision vanishes to even order, but even order does not prove the source unramified: R[t]/(t³ − s) has
    Δ = −27s² (Theorem 4.2).
  - Where readings collide but sources stay apart, m + λj changes the chart, avoiding at most C(n, 2) values of λ
    (Theorem 4.2).
  - For two sources, Δ = 4s^η, disc Q_m = 4s^(2k+η)u², the residue is k + η/2 and the monodromy is (−1)^η
    (Proposition 4.3).
  - The old power basis degrades like the gap: σ_min(V_m) ≍ |d| and λ_min(G_m) ≍ d² (Proposition 4.4).
- **Orientation and lifts (§5).**
  - The sign ε = sgn ∘ ν of the source permutation twists a given dense Sp₄ lift. The SO₅ system and all its
    eigenvalues are kept, while V₄ becomes V₄ ⊗ L_ε (Theorem 5.2, Proposition 5.4).
  - Selecting one source and trivialising the sign together needs a cover of degree
    [F₀ : H ∩ ker sgn] ∈ {m, 2m}; for the natural S_n this is 2n when n ≥ 3 (Theorem 5.2, Proposition 5.4).
  - The twisted lift extends without ramification exactly when ε(δ_x)^(e_y) = 1 at every branch point, that is when
    div(g) is even, with ε(δ_x) = (−1)^(ord_x Δ_m). The leftover class 𝒪(D_g) ∈ Pic⁰(Y₀)[2] is trivial exactly
    when g is a square (Theorem 5.3).
- **Seven readings (§6).**
  - The word J J J J M J with seven readings has a full-rank Jacobian generically. At r = 1/3, b = 2/3, g ≡ 1, d = 0
    the determinant is 48, so the source is recovered locally (Theorem 6.3).
  - This is a local inverse, not a decoder. The common-history bound still requires max(k + d + 4, k + 5) = 8
    readings for (k, d) = (3, 0) (Definition 6.1, Proposition 6.4).
  - On a fixed degenerate ℝP² fibre at least two extra readings are needed (Corollary 6.2).
- **Switching Ω₆ / Ω₇ (§7).**
  - When couplings may be switched mid-word, d_min = 5 + dim span{b_{g_a}}: 6 if every g_a/g₀ is real, 7 if one
    ratio is not (Theorem 7.2).
  - Endpoint corrections and unmixed single pulses do not force seven dimensions (Proposition 7.3).
  - The unlock is weak: the old dark vector leaks with probability η₁² sin²τ₁ sin²α, and the smallest two-channel
    Gram eigenvalue behaves like 4r₀²r₁² sin²α / (ħ²(r₀² + r₁²)) (Proposition 7.4).
- **Radial occupation (§8).**
  - For the random command with δ_n = n⁻², e_n = n⁻¹ and m_n = n³, and any caps M_n → ∞,
    ν_n(W ∧ M_n) → ν(W) exactly when e_n H_w(M_n) → 0, where H_w(M) = ∫₀^r₀ min(M, w(r)) dr (Theorem 8.3).
  - The deciding term is the first cell, a straight chord leaving the source:
    (e_n/3) ∫₀^e_n v ≤ I_n ≤ e_n H_w(M_n).
  - For W = Γ^p this recovers the known thresholds (Corollary 8.4).
- **Log-critical cap (§9).**
  - For w_β(t) = κ t⁻² (log 1/t)^(−β) with β > 1, the target is finite, every uncapped mean is infinite, and the
    capped mean converges exactly when M_n/(log M_n)^β = o(n²) (Theorem 9.1).
  - At M_n ~ C n²(log n)^β the first cell alone contributes √(κC), so the limit inferior exceeds the target by at
    least √(κC) (Theorem 9.1).
  - The same profile is |u_β|² for a normalised state u_β in the original form domain (Theorem 9.3). Because path
    restriction is not closable, no general path readout follows (Definition 9.4).

一部约六分半钟的片子，AURIC–Langlands 系列的第四部，也是最后一部：五维反对称来源的二次协变量在等重秩四层上的二维微分核及其条件数发散；三深度面板的秩四十五、十维核与深度一的严格合法盲圈；二次数据与 Hecke 函子的类型区别；读数碰撞与来源分歧的判别式分解、留数与换图；来源取向符号对稠密 Sp₄ 提升的扭曲、选层覆盖次数 m 或 2m 及 Picard 群二阶类；JJJJMJ 七读数的局部逆与八读数统一下界；允许切换时的 Ω₆/Ω₇ 分界及其弱解锁；径向期望占用的一般充要条件与首单元；以及对数临界截断的精确速度与超额。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-072-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used. At the subject commit this volume has no digestion records and no
  Lean declaration covers its statements.
- **Published results, used as external inputs.** The Hecke scene and the finale badge them as published.
  - Geometric Satake: Mirković–Vilonen, arXiv:math/0401222.
  - Unramified Hecke eigen-objects: Gaitsgory–Raskin I (arXiv:2405.03599) and V (arXiv:2409.09856).
- **Classical tools named in the volume.**
  - The discriminant change of basis and the étale trace criterion (Stacks 0BVH); the collision scene badges it as
    classical.
  - Finite covers and finite fundamental-group sets (Stacks 0BND).
  - The Kummer sequence (Stacks 03PK); the orientation scene badges the Picard class as classical.
  - The volume also cites Salamon–Viaclovsky on four-dimensional self-dual structures, and Wang–Xu and Zhuang on
    phase retrieval.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the complete real fibre classification and the three-depth recovery certificate c_F = 1/40310784000 from the
    quantum boundary volume;
  - the structure-acquisition and context results on Ψ, W and Hecke naturality;
  - the selection input and the Ω Fock model from part three;
  - the common-history lower bound from the self-calibrating relation volume;
  - the Green-field convergence, the singular-occupation bound (8.3) and the power-profile thresholds;
  - the non-closable path restriction from the original-control stability volume.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following.
  - **Differential kernel.**
    - dim ker Dq_A is 10, 0, 0 and 2 on the four types of A.
    - It is 0 and 2 again after 200 random rotations of each rank-four type.
  - **Condition family.**
    - For s ∈ {0.05, 0.1, 0.15} and δ ∈ {s/10, s/100, s/1000}, σ and β coincide and γ differs by
      diag(0, 4sδ, −4sδ, 0, 0).
    - The ratio equals √(s² + δ²)/(2sδ), and both sources are strictly legal.
  - **Panel.**
    - Exact rational arithmetic gives rank 𝓛_F = 45 and a ten-dimensional kernel.
    - Every kernel tensor is traceless.
  - **Blind circle.**
    - The three weights n_i² are 30/128, 35/128 and 63/128.
    - PGP on n⊥ has spectrum (g₂, g₂, g₄, g₄).
    - At 12 points of ℝP¹, q of the original, success and failure branches stays constant, and every source is
      strictly legal.
    - The pulled-back family keeps the depth-(1, 2) readings constant at 8 points.
  - **Coefficients.**
    - The quadratic map Sym²(ℝ¹⁰) → ℝ²⁰ has rank 20 and kernel 35.
    - sL₁ and sL₂ share q, but the panel separates their tensors.
  - **Discriminants.**
    - disc Q_m = I_m² Δ holds exactly in ℂ[s][t]/(t³ − s) for four readings, with Δ = −27s².
    - For the two-source algebras (η ∈ {0, 1}, k = 0…3), Δ = 4s^η, disc = 4s^(2k+η)(1 + s)² and the monodromy
      exp(−2πi(k + η/2)) = (−1)^η.
    - σ_min(V)/|d| tends to 0.522 and λ_min(G)/d² to 0.273.
    - On 105 separated fibres of six sources, at most 15 values of λ fail.
  - **Orientation.**
    - On 80 random transitive permutation groups of degree 2 to 7, the degree [F₀ : H ∩ ker sgn] is m for 44 of
      them and 2m for 36.
    - For the natural S_n it is 2, 6, 8, 10 and 12 for n = 2…6.
    - −I₄ acts as +1 on Λ²V₄.
    - The square root of s^a(1 + s) has monodromy (−1)^a for a = −3…3.
  - **Seven readings.**
    - The symbolic Jacobian of J J J J M J at (1/3, 2/3, g ≡ 1, d = 0) has determinant 48.
    - The traces at times 5 and 6 are 5/3 and 4/3.
    - The denominator is a power of b, and the Jacobian has full rank at 300 of 300 random points.
  - **Switching.**
    - In the three-mode Fock space, H e₄ = J e₄ + 2|g| b, H b = 2|g| e₄ and H z = 0.
    - The Krylov closure of V has dimension 6 for one coupling and for three real-ratio couplings, and 7 for a
      complex ratio.
    - Formulas (7.2) and (7.3) hold on 200 random cases, and the small-α asymptotic is checked.
  - **Power profiles.** H_w is bounded for p < ½, about log M at p = ½, and of order M^(1−1/(2p)) above.
  - **Log-critical cap (β = 2, κ = 1).**
    - H(M) divided by 2^(1+β/2)√κ √M/(log M)^(β/2) is 0.888, 0.930, 0.968 and 0.986 at M = 10¹⁰, 10³⁰, 10¹⁰⁰ and
      10³⁰⁰.
    - Under the cap M_n = n²(log n)², e_n H(M_n) is 1.51, 1.74, 1.90 and 1.97 at n = 10⁶, 10²⁰, 10⁸⁰ and 10³⁰⁰.
      The limit is 2√(κC) = 2.
    - The first-cell integral (8.7) is 0.75, 0.87, 0.95 and 0.98 at the same n. The limit is √(κC) = 1.
  - **Domain.** The energy tail ∫₀^ε t⁻¹(log 1/t)^(−β) dt equals (log 1/ε)^(1−β)/(β − 1) for β = 1.5, 2 and 3.
- **Data drawn on screen.**
  - The kernel-dimension table.
  - The condition-ratio curve for s = 0.1.
  - The panel cells and the 40 + 5 + 10 rank bar.
  - The vector n.
  - The Ψ split 20 + 35.
  - The two-source residue table.
  - The orientation-degree counts.
  - The traces and the determinant of the seven-reading word.
  - The Ω₆/Ω₇ dimensions.
  - The λ₋(α) curve for r₀ = r₁ = 1.
  - The power-profile table.
  - The H(M) ratios.
  - The cap and first-cell bars.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the fibre sphere and its tangent plane;
  - the reading bars of the blind circle;
  - the crossing reading lines and the merging cube roots;
  - the (m, j) scatter;
  - the three-source permutation;
  - the genus surface with branch orders;
  - the Jacobian grid;
  - the bright-vector dials;
  - the random walk between the walls;
  - the shaded capped profile.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
