# 071 · AURIC–LANGLANDS III · ACQUISITION, COVER AND CRITICAL DOMAIN · AURIC–Langlands 第三部：取得、覆盖与临界域

This is the third film in the AURIC–Langlands series and runs about 6 minutes. It covers
`AURIC_LANGLANDS_ACQUISITION_COVER_AND_CRITICAL_DOMAIN_THEORY.md` in trureturing (§1–§11), at subject commit
`c2579220ab`.

Parts one and two built spectral data from structure and boundaries. This volume asks four further questions:
- what it costs to acquire a source from a literal clock;
- which labels survive reading noise;
- how one candidate is selected on a cover, and what the cover keeps of the spectral data;
- how the critical Green domain is classified.

## The film, scene by scene

- **Literal clock (§2).**
  - Each gate J or M advances the clock by one and records y_t = d + g(t) tr(Q_t P), with
    P = [[r, b], [r(1−r)/b, 1−r]] (Definition 2.1).
  - For a gain of degree k with N = 4k + δ + 5 readings, det C(k, δ) = 5^(k(k+1)) (∏h!)⁴ (∏h!), never zero.
    For a cubic gain the word M⁸ J M⁷ gives 16 new gates and 17 readings.
  - The readings decode the drift d, the shifted gain and P = B_a / tr B_a (Definition 2.3).
  - In the enlarged affine environment an adaptive strategy needs N − 1 new queries; with fewer, some direction h in
    the common kernel gives the same record for θ and θ + th (Proposition 2.2).
  - Normalising by the trace is stable only with a lower bound a on the gain:
    ‖P̂ − P‖ ≤ (2η/a)(1 + √2‖P‖). Scaling the gain by ε shrinks every report difference by ε while P₁ − P₂ stays
    fixed (Proposition 2.4).
- **Three worlds (§3).**
  - On the rectangle around p_c = 7.27697979572462, v_c = 61.48668743716016 (half-width 10⁻¹⁰), every actual
    subdomain holds exactly three worlds. Their terminal J readings lie in (220.965, 220.971), (315.408, 315.725) and
    (311.432, 311.632) (Definition 3.1).
  - The thresholds 266.2015 and 313.52 sort the worlds whenever the reading error is below 1.888, so a fixed
    parameter needs exactly three predictive states (Proposition 3.2).
  - Inside the rectangle no pair of different worlds collides on J (Corollary 3.3).
- **Candidates and selection (§4).**
  - Over the good base the 18 candidates form a finite étale algebra (Definition 4.1). Its connection
    ∇z = −Q_i(z)/Q′(z) transports the trace Gram matrix, ∂G = CᵀG + GC (Proposition 4.2).
  - A horizontal primitive reading forces the cover to split completely (Proposition 4.3).
  - One root t selects one candidate: the Lagrange idempotent e_t = q_t(z)/Q′(t) has e_t² = e_t, Tr e_t = 1 and
    χ(a) = Tr((a ⊗ 1) e_t) (Proposition 4.4).
  - On a curve, a horizontal selection exists only after a cover whose degree is a multiple of the orbit size m
    (Proposition 4.5). If the orbit can be executed, exactly m memory states are needed, and words of length at most
    m − 1 separate them (Proposition 4.6).
  - A connected group cannot preserve the finite function algebra (Proposition 4.7).
- **Information budget (§5).**
  - If each report carries at most κ nats per unit cost, then I(U; H_N | H₀) ≤ κ 𝔼C. For a binary task
    𝔼C ≥ 2(Δe)²/κ (Proposition 5.2).
  - Fano's inequality gives 𝔼C ≥ [H(S | H₀) − b(p_e) − p_e log(m − 1)]₊ / κ for identifying one of m candidates
    (Proposition 5.3).
  - A seed independent at the start can still leak: with H₀ = S ⊕ Z, I(S; Z) = 0 but I(S; Z | H₀) = log 2
    (Proposition 5.4).
- **Cover and lifts (§6).**
  - The candidates are pulled back to an open part U of the genus-four curve. Every branch of degree d compactifies
    to a curve of genus g(Y_i) ≥ 3d_i + 1, and the SO₅ system stays dense and unramified there (Proposition 6.2).
  - With geometric Satake and unramified geometric Langlands, each Y_i carries a nonzero Sp₄ Hecke eigen-object
    (Assumption 6.4, Corollary 6.5).
  - The inherited lifts number 256/|V|, where |V| is a power of two dividing d. All 256 survive for odd d, and at
    least 128 for d = 18 (Proposition 6.3).
- **Minimal realisation (§7).**
  - For a self-adjoint compression the full future is fixed by the Krylov closure, and
    d_min = sup_s rank Γ_s (Proposition 7.2).
  - Finite noisy moments certify N′ ≥ #{λ_k(Γ_s) > (s + 1)ε} (Proposition 7.3).
  - The Ω Fock model has d_min = 6: five visible states plus the bright vector b. The leakage D is rank one, and the
    dark vector is never visible (Definition 7.4, Proposition 7.5).
- **Critical Green domain (§8–§9).**
  - g_c = π ρ(o) det A(o) λ₀ / r, where λ₀ ≈ 0.6257 is the lowest eigenvalue of the angular profile
    −4(cos a φ′)′ + cos a φ = λφ (Assumption 8.3).
  - Two critical completions coincide exactly when A₂(o) = c A₁(o) (Theorem 9.2), and the threshold ratio is
    c²ρ₂/ρ₁ (Corollary 9.3).
  - A = I and diag(σ, 1/σ) share det A = 1 and the threshold, but not the domain (Proposition 9.4).
  - Under a trace budget the threshold is largest at A(o) = τG/2, with deficit proportional to (κ₁ − κ₂)²
    (Proposition 9.5).
- **Anchored composition (§10).**
  - A recovered source fixes one point on one candidate sheet. The branch through it has degree m equal to the
    anchor's orbit, a horizontal idempotent evaluates the actual reading, and the compactified branch carries the
    dense local system and its Hecke eigen-object (Theorem 10.3, Corollary 10.4).
  - The volume lists the open bridges explicitly (Definition 10.5):
    - a common implementation of the four two-channel blocks;
    - all candidate layers and double collisions outside the rectangle;
    - the actual monodromy of a chosen parameter curve;
    - condition numbers and the cost of minimal states;
    - a base-change functor on the automorphic side.

一部约六分钟的片子，AURIC–Langlands 系列的第三部：字面时钟上 M⁸ J M⁷ 的十七个读数解出增益、漂移与来源矩阵，观测行列式恒非零，十七在扩大仿射环境里最优；一个极小读数矩形上的三世界与两个阈值；有限 étale 候选代数的联络、Lagrange 幂等元与按轨道大小的选层次数及记忆下界；信息预算、Fano 成本与种子泄漏；属四曲线开集上的分支覆盖、亏格下界、继承的提升类与 Hecke 本征对象；Krylov 闭包与 Hankel 秩给出的最小实现维数，Ω 模型为六；临界 Green 耦合、由源点协方差分类的完成域与迹预算下的最大阈值；以及围绕实际锚点的组合与明确列出的开放桥。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-071-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used. At the subject commit this volume has no digestion records and no
  Lean declaration covers its statements.
- **Published results, used as external inputs.** The cover scene and the finale badge them as published.
  - Geometric Satake: Mirković–Vilonen, arXiv:math/0401222.
  - Existence of unramified Hecke eigen-objects: Gaitsgory–Raskin, arXiv:2405.03599 and arXiv:2409.09856.
- **Classical tools named in the volume.**
  - Finite étale algebras and covers (Stacks 00UP, 0BND, 04L0, 0BXX).
  - Riemann–Hurwitz (Stacks 0C1B).
  - Tannakian categories (Deligne–Milne).
  - Fano's and Pinsker's inequalities; the budget scene badges Fano as classical.
  - Weyl's eigenvalue perturbation bound, Lagrange interpolation and Hankel–Gram matrices.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the literal clock and its gates;
  - the three-world certificate, its rectangle and the terminal J intervals;
  - the eighteen-dimensional terminal algebra and the context results;
  - the Krylov and Ω Fock model;
  - the Bayes budget conventions;
  - the Green critical theorems used as assumptions.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following.
  - **Clock.**
    - det C(k, δ) = 5^(k(k+1)) (∏h!)⁴ (∏h!) holds exactly for k = 0…3 and δ = 0…2. For k = 3, δ = 0: N = 17 and
      det = 5 062 500 000 000.
    - The 16 new gates of M⁸ J M⁷ produce exactly the accumulated products A_i.
  - **Decoding.**
    - On 30 random worlds (P, cubic g, drift d), after the prefix J M J M M M, the 17 readings recover d,
      P = B_a / tr B_a and the shifted gain exactly. Every B_h is a multiple of P.
    - The normalisation bound holds on 2000 random cases (largest ratio 0.59). Scaling the gain by ε shrinks every
      report difference by ε while P₁ − P₂ stays fixed.
  - **Labels.** The thresholds 266.2015 and 313.52 separate W₁ < W₃ < W₂ with half-gap 1.888.
  - **Selection.**
    - For Q = x⁴ − px² − x + 2 the derivation ∇z = −Q_p(z)/Q′(z) transports the trace Gram matrix exactly.
    - The Lagrange idempotent at a real root has e² = e, Tr e = 1 and Tr(a e) = a(t).
    - On 110 random transitive permutation actions, the stabiliser index equals the orbit size m, there are exactly m
      future classes, and every pair is separated by a word of length at most m − 1.
  - **Budget.**
    - Pinsker 2(p − q)² ≤ KL on 3000 pairs.
    - Fano H(S | Ŝ) ≤ b(p_e) + p_e log(m − 1) on 2000 random joint laws.
    - The seed with H₀ = S ⊕ Z has I(S; Z | H₀) = log 2.
    - Repeated noisy binary reports satisfy 𝔼C ≥ 2(Δe)²/κ on 200 runs.
  - **Cover.** With g(X) = 4, Riemann–Hurwitz gives g(Y) ≥ 3d + 1. The inherited lift counts are at least 256 for
    d = 1, 3, 5, 9, 128 for d = 2 and 18, and 64 for d = 4.
  - **Ω model.**
    - In the three-mode Fock space with H = g a₁†a₃ + ḡ a₃†a₁ + J n₁n₃, the Krylov closure of V has dimension 6
      for three couplings.
    - D = (I − P)HU has rank 1, Γ₁ and Γ₂ have rank 6, H e₄ = J e₄ + 2|g| b, and the dark vector is annihilated.
    - Perturbing the moments by ε moves Γ₂ by at most 3ε, and counting eigenvalues above 3ε never exceeds 6.
  - **Profile.** The lowest eigenvalue of the angular problem is λ₀ ≈ 0.62566, below 2/π ≈ 0.63662. The ground
    state is positive with φ(0) = 1 and φ(±π/2) ≈ 1.1264.
  - **Threshold.**
    - Under A ↦ cA the threshold ratio is c²ρ₂/ρ₁.
    - The trace-budget deficit equals (κ₁ − κ₂)² times the prefactor on 500 random cases.
    - On t = 0 the frozen ratio h₁/h₂ is constant only for proportional A(o).
  - **Anchor.** From e² = e, (2e − 1) de = 0 and (2e − 1)² = 1, so the selecting idempotent is horizontal.
- **Data drawn on screen.**
  - The 23 log readings of one sample world: r = 0.4, b = 1.2, g(t) = 1 + 0.3t − 0.05t² + 0.002t³, d = 0.5. This
    world is illustrative, not one from the volume.
  - The three J intervals and the two thresholds.
  - The 256 lift dots.
  - The Γ₂ eigenvalues for g = 1.1, J = −0.5.
  - The angular profile φ.
  - The trace-budget parabola.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the environment ellipse and query lines;
  - the candidate sheets and the orbit circle;
  - the cost bars;
  - the genus-four surface and branch curves;
  - the level-set ellipses of the two covariances;
  - the anchor sheet.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
