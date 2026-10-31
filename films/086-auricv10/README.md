# 086 · AURIC V10 · COHERENT RELATIONS AND RECURSIVE OBSERVATION · AURIC V10 · 相干关系与递归观测

This is the first film on the versioned AURIC volumes and runs about 7½ minutes. It covers the whole of
`AURIC_COHERENT_RELATIONS_AND_RECURSIVE_OBSERVATION_THEORY_V10.md`, §1–§19, at subject commit `24d79207e4`.

The volume builds one typed theory in layers. Relations and coherent kernels come first, then Hilbert spaces and
probability, then complete record networks. It ends with the future-observable quotient and computation by
reflection. Complex scalars, global positivity, additive calibration and composition safety are stated as inputs.

## The film, scene by scene

- **Static fiber (§1–§2).**
  - Binary words with no two adjacent ones number F(n + 2) (Definition 1.1). At length three they are the five modes
    000, 100, 010, 001, 101.
  - Fixing the three occupation means x̄, ȳ, z̄ leaves exactly the family p = (1 − x̄ − ȳ − z̄ + κ, x̄ − κ, z̄,
    ȳ − κ, κ) with max{0, x̄ + ȳ + z̄ − 1} ≤ κ ≤ min{x̄, ȳ}. Its only direction is (1, −1, 0, −1, 1) (Theorem 2.2).
  - On a non-degenerate fiber, E[f] is fixed by the three means exactly when J_f = f₁₃ − f₁ − f₃ + f₀ = 0
    (Theorem 2.3).
  - On ℂ⁵ near I/5 with means (2/5, 2/5, 1/5), normalisation and the three expectations leave 21 real directions
    invisible: κ and 20 off-diagonal coherences (Proposition 2.4).
- **Coherent kernels (§3–§4).**
  - A positive semidefinite kernel on finite labels has a minimal Hilbert representation, ℂ^X / ker K, with
    ⟨φ(x), φ(y)⟩ = k(x, y) and dim H_K = rank K. It is unique up to a unitary (Theorem 3.3). Product kernels give
    tensor products, and invertible kernel-preserving maps give unitaries (Propositions 3.4–3.5).
  - Pairwise consistency is not enough. The kernel with 1 on the diagonal and −1 elsewhere has every 2 × 2 block with
    eigenvalues 0 and 2, but K(1, 1, 1)ᵀ = −(1, 1, 1)ᵀ (Example 3.6).
  - A metric and an orientation on a real plane give a unique complex structure J (Theorem 4.1). No odd-dimensional
    real space has one, because (det J)² = det(−I) = −1 (Proposition 4.2).
  - Kernel-preserving refinements glue into a unique Hilbert direct limit (Theorem 4.4). A lifted POVM must keep the
    outside outcome I − UU† (Proposition 4.5), and compatible effects extend uniquely to the limit (Proposition 4.6).
- **Probability (§5–§6).**
  - A normalised weight on all effects that adds whenever E + F ⪯ I is μ(E) = tr(ρE) for one unique density operator
    (Theorem 5.2, the effect form of Gleason's theorem). For a pure preparation, μ(|v⟩⟨v|) = |⟨v, ψ⟩|² (Corollary 5.3).
  - Five modes alone do not select quantum theory. The classical chain T = [[p, 1 − p], [1, 0]] on the same Fibonacci
    tree works for every p ∈ (0, 1). It is prefix-consistent, has diagonal positive kernels with Aᵀ K(n+1) A = Kₙ and a
    Hilbert limit, and supports a recursive predictor, while every readout commutes (Theorem 6.1).
- **Instruments and lifts (§7–§8).**
  - Complete positivity is a positive Choi matrix and a Kraus form. The smallest pure environment has dimension
    rank J_Φ (Theorem 7.2).
  - Identity and reset share the effect I but leave different states (Proposition 7.3). Unknown states cannot be
    cloned or identified without error in one shot (Proposition 7.4, shown on screen only).
  - The quantum lifts of f : X → Y correspond exactly to positive G with identity blocks on the fibres, with
    Φ_G(|x⟩⟨x′|) = G(x, x′) |f(x)⟩⟨f(x′)| and minimal environment rank G (Theorem 8.2). Over all lifts the minimum
    is the largest fibre size (Corollary 8.3).
  - For NAND, G = [[I₃, z], [z†, 1]] with ‖z‖ ≤ 1. The environment is four-dimensional when ‖z‖ < 1 and
    three-dimensional when ‖z‖ = 1, and the latter leaves a perfect logical qubit (Example 8.5). The bare relation is
    closed under bitwise AND, so NOR and NAND need an extra resource (Proposition 8.6, shown on screen).
- **Clockless networks (§9.1–§9.2).**
  - Every topological order of a typed finite DAG gives the same complete channel and the same unnormalised branches,
    also against entangled references (Theorem 9.2). Operations on one wire keep their order.
  - Edge phases up to gauge are classified by holonomies, with |E| − |V| + 1 loop parameters (Theorem 9.4).
  - The five-mode graph has five edges on five vertices, so one loop 0 → 1 → 13 → 3 → 0. With one fixed phase per site
    its holonomy is e^(iβ₁) e^(iβ₃) e^(−iβ₁) e^(−iβ₃) = 1 (Theorem 9.5).
  - Two control labels at one site have a gauge-invariant ratio e^(i(β − α)). At β − α = π/2 no gauge makes both real
    (Proposition 9.6).
- **Phases and records (§9.3–§9.4).**
  - From mode 0, p₁₃←₀(t) = t⁴/4 · (A² + B² + 2AB cos Φ) + O(t⁶). All basis transition probabilities agree for H and
    its conjugate, so Φ and −Φ are not distinguished (Theorem 9.7).
  - With a path record of overlap γ, p₊(δ) = ½ + √(s(1 − s)) Re(e^(−iδ) hγ). The settings δ = 0 and π/2 read
    √(s(1 − s)) hγ, and the visibility is 2√(s(1 − s)) |γ| (Theorem 9.8).
  - A hidden record gives a channel of Choi rank rank G. It is unitary exactly when rank G = 1, and it is the intended
    gate exactly when every Gram entry is 1 (Theorem 9.9). The native return block satisfies this, so it can replace
    its logical gate in any network (Corollary 9.10).
- **Future quotient (§10).**
  - Pulling terminal effects back through every allowed word, the span stabilises within d² − r₀ steps. Two states
    are future-equivalent exactly when tr((ρ − σ)E) = 0 on V∞ (Theorem 10.2).
  - The quotient updates linearly with r − 1 affine coordinates, and a k-dimensional quantum memory needs k² ≥ r
    (Theorem 10.4). Tomographic completeness holds exactly when V∞ = Herm(H) (Corollary 10.5).
  - Moving state, ruler and controls together changes no probability (Proposition 10.6). A joint unknown is not two
    separate averages: E_λ tr(ρ_λ E_λ) = 1, while tr(ρ̄ Ē) = ½ (Example 10.7).
- **Recursion (§11).**
  - Complete instruments give consistent prefix probabilities and one measure on infinite record histories
    (Theorem 11.2). The prediction of a fixed question converges in L² to E[Z | F∞], with limiting error
    E Var(Z | F∞) (Theorem 11.3).
  - ρ(n+1) = XρₙX never settles (Example 11.4). A contraction with λ < 1 does, and with step errors ε the distance
    ends at most ε/(1 − λ) (Theorem 11.5). Postselection on probability at least η gives ‖A/p − B/q‖₁ ≤ 2δ/η
    (Proposition 11.6).
- **Mirrors (§12–§13).**
  - Two reflections at angle θ rotate by 2θ (Proposition 12.2). Powers of one gate commute (Proposition 12.1), and two
    fixed involutions are never dense in PU(d) (Theorem 12.3).
  - R₀ = Z, R₁ = cos α Z + sin α X and R₂ = cos α Z + sin α Y with α/π irrational generate a dense subgroup of PU(2),
    and three is the minimum among fixed involutions on one qubit (Theorem 12.4). Every SU(d) element is a product of
    at most 2(d − 1) rank-one reflections (Proposition 12.5, shown on screen).
  - The middle π pulse D = R₂(π) satisfies D J₂ = J₂ D₀₀ with D₀₀ = diag(−1, 1, 1, 1) (Theorem 13.2). With
    S = R₃(π/2) R₁(π/2), S† D S J₂ = J₂ CZ, five pulses in all (Corollary 13.3).
- **One phase address (§14–§15).**
  - With every phase zero, CY = R_x(−π/4) CZ R_x(π/4) takes seven pulses, and CY_ab CY_ba CY_ab = SWAP takes 21
    (Lemma 14.1).
  - One Y address at q* compiles every source circuit of R_x, R_y and CZ, with
    L ≤ G_x + Σ(42|q − q*| + 1) + Σ(42(|a − b| − 1) + 5) (Theorem 14.2).
  - Without it, every conditional state of a zero-phase protocol stays at trace distance at least ½ from the encoded
    plus state (Theorem 14.3).
  - On one atom, R₁, R₂, R₃ generate D₅ SO(5) D₅† (Proposition 15.1). Adding S* = exp(iπ|13⟩⟨13|/2) gives every V ∈ U(5)
    with det V ∈ {1, i, −1, −i}, hence every five-dimensional unitary channel (Theorem 15.2).
- **Order and acquisition (§16–§18).**
  - [H₁, H₂] = E₁₂ − E₂₁ ≠ 0, and R₁(π/2) R₂(π/2)|0⟩ = −i|2⟩ while R₂(π/2) R₁(π/2)|0⟩ = −i|1⟩
    (Proposition 16.1). Compiled-word errors add and code leakage is at most ε² (Proposition 16.2, shown on screen).
  - In the standard code, the zero-phase menu has dim V∞ ≤ d(d + 1)/2. With one Y address V∞ = Herm(ℂᵈ), and an exact
    quantum memory then needs dimension at least d (Theorem 17.1). Instrument compilation needs selective record
    readout in addition (Theorem 17.2, shown on screen). A universal NOT is not completely positive, because its Choi
    matrix has eigenvalue −1 (Proposition 17.3, shown on screen).
  - Reporting θ ∈ ℚᵏ exactly needs at least k − d exact queries almost surely, and finitely many noisy queries never
    suffice when d < k (Theorem 18.2). A countable snapshot recovers an atomless noise sample with probability 0
    (Proposition 18.3).
  - Full original-root identification, a global eight-read strategy and a nine-read lower bound remain open (§18.3,
    §19.2). The finale also lists the six parts of Theorem 19.1.

一部约 七分半钟 的片子，是 AURIC 版本系列的第一部，覆盖 V10 全卷：固定三个占据均值后仍留下 κ 方向，量子态还有二十一个不可见方向；正定核给出最小 Hilbert 表征，而两两相容不足以保证整体正定；效果可加给出唯一密度算子，但同一 Fibonacci 树上的经典链说明五个模式不足以选出量子理论；仪器由 Choi 秩与 Kraus 形式刻画，NAND 的量子延拓是一个范数不超过一的向量；无环网络的拓扑排序不改变通道，五模式图唯一闭环的 holonomy 恒为一；短时读出无法区分 Φ 与 −Φ，路径记录按 |γ| 缩放干涉条纹；观察者是未来测试的等价类；递归预测在均方意义下收敛，收缩映射才使物理态稳定；三个反射生成稠密群，中位 π 脉冲给出 diag(−1, 1, 1, 1) 与五脉冲 CZ；一个 Y 地址编译任何已知电路并使未来可观察空间成为全部 Hermitian 矩阵；最后，精确知识至少需要 k − d 次精确查询，完整的原根识别仍未解决。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-086-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the volume has no digestion records: there is no
    `Meta/Digestion/backfill/auric-coherent-relations-and-recursive-observation-theory-v10/` directory.
  - No Lean declaration covers any statement shown.
- **Published results, used as external inputs.** The probability and instrument scenes and the finale badge them as
  published.
  - The effect form of Gleason's theorem: Busch, PRL 91 (2003) 120403, arXiv:quant-ph/9909073.
  - Completely positive maps and dilations: Choi, Linear Algebra Appl. 10 (1975) 285–290,
    DOI:10.1016/0024-3795(75)90075-0; Stinespring, Proc. AMS 6 (1955) 211–216, DOI:10.1090/S0002-9939-1955-0069403-4.
  - Elementary gates: Barenco et al., PRA 52 (1995) 3457, arXiv:quant-ph/9503016; Barenco, arXiv:quant-ph/9505016;
    Brylinski–Brylinski, arXiv:quant-ph/0108062.
  - Universal NOT: Bužek–Hillery–Werner, arXiv:quant-ph/9901053.
  - Operational reconstruction, cited for comparison: Chiribella–D'Ariano–Perinotti, PRA 84 (2011) 012311,
    arXiv:1011.6451. Rebit simulation: Rudolph–Grover, arXiv:quant-ph/0210187.
- **Classical tools named in the volume.** These are the Gram and kernel representation (badged classical in the
  kernel scene), Cauchy–Schwarz, the Riesz representation, measure extension, L² martingale convergence (badged
  classical in the recursion scene), the contraction fixed-point theorem, the covariance uncertainty relation and
  no-cloning.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the native couplings H₁, H₂, H₃, the code and the single-reference construction (coherent reconstruction, legal
    gates and single-reference volumes);
  - the statements of §18.3 on the original-root guards (Root-J, positive-trace and self-calibration volumes). The
    count of 15 seven-action words was recomputed. Their full column rank 4 was not.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following.
  - **Fiber.**
    - |Lₙ| = F(n + 2) for n = 1 … 12.
    - The fiber direction is (1, −1, 0, −1, 1), and κ ∈ [0, 2/5] at (2/5, 2/5, 1/5).
    - E[f] moves by J_f Δκ (200 random f).
    - The four trace constraints leave a null space of dimension 21, one of it diagonal.
  - **Kernel.**
    - The spectrum of the 3 × 3 example is (−1, 2, 2), with 2 × 2 blocks (0, 2).
    - A rank-2 Gram representation is unique up to unitary.
    - Product-kernel ranks multiply.
  - **Limits and probability.**
    - A lifted POVM keeps the old probabilities and gives the outside outcome probability 0.
    - Nine effect values reconstruct a random 3 × 3 density operator exactly.
    - The classical chain is positive and prefix-consistent with Aᵀ K(n+1) A = Kₙ for p = 0.3, 0.6 and 0.85 and n ≤ 9.
    - At p = 0.6 the three-bit masses are 0.216, 0.24, 0.24, 0.144 and 0.16.
  - **Instruments.**
    - The Choi ranks are 1 for the identity and 2 for the reset, and both are trace preserving.
    - For NAND, the smallest eigenvalue of G is 1 − ‖z‖, the rank is 4 for ‖z‖ < 1 and 3 at ‖z‖ = 1, and G is not PSD
      for ‖z‖ > 1. The lifted channels are CPTP.
    - Σ is closed under AND, NOR and NAND are not, and the nonempty slice of Σ is NOR.
  - **Networks.**
    - Two incomparable channels give the same output on an entangled 3-qubit input in both orders.
    - H_i(β) = D_β H_i(0) D_β† and the holonomy is 1 for 50 random β.
  - **Records.**
    - p₁₃←₀(t) divided by its leading term lies in [0.99985, 0.99994] at t = 0.01 (40 random strengths and phases).
    - H and its conjugate give equal transition probabilities, and the remainder bound holds.
    - p₊(δ) matches the formula (100 random cases), and the visibility equals |γ| at s = ½.
    - The Choi rank equals rank G for ranks 1, 2 and 3.
    - e^(−iπH₂) J₂ = J₂ D₀₀.
  - **Future quotient.**
    - On the code with d = 2, 4 and 8, the zero-phase menu with readout gives dim V∞ = 3, 10 and 36, which equals
      d(d + 1)/2.
    - One Y address gives 4, 16 and 64.
    - For d = 4 the stabilisation depths are 3 and 5, against the bound 12.
    - The joint-unknown example gives 1 against ½.
    - The uncertainty relation holds on 200 random cases.
  - **Recursion.**
    - On the Fibonacci chain with p ∈ {0.2, 0.8} unknown and a hidden coin, the error E|Z − Mₙ|² falls from 0.5 to
      0.264 at n = 14. The floor is 0.25.
    - X flips stay at trace distance 1.
    - The contraction trajectory meets the bound and reaches 0.0668, against ε/(1 − λ) = 0.0667.
    - The postselection bound holds on 300 random cases.
  - **Reflections and gates.**
    - R_v R_u is a rotation by 2θ on 50 random cases.
    - R₁R₀ = e^(−iαY) and R₂R₀ = e^(iαX).
    - Random SU(3), SU(4) and SU(5) elements are products of 4, 6 and 8 reflections.
    - S† D S J₂ = J₂ CZ, and D₀₀|++⟩ has coefficient determinant −½.
  - **Compilation.**
    - On the m = 3 chain (dimension 13), the physical pulse words give CY in 7 pulses and SWAP in 21.
    - A 7-gate circuit compiles to 141 pulses, equal to formula (14.1), with V_C J_m = J_m C.
    - Zero-phase pulses commute with A = Z_par K.
    - Over 400 random zero-phase protocols with readout and feedback, the largest overlap with the encoded plus state
      is 0.5.
  - **Single atom.**
    - The Lie algebra generated by the three rotations has dimension 10.
    - With S* it has dimension 24.
    - det S* = i.
    - R₃(−π/2) S* R₃(π/2) S* = diag(1, 1, i, i) on the code.
  - **Order and acquisition.**
    - [H₁, H₂] = E₁₂ − E₂₁.
    - Word errors add (100 random 6-gate words).
    - The universal-NOT Choi spectrum is (−1, 1, 1, 1).
    - With k = 3 and d = 1, one exact query leaves the hidden direction η = (2, −1, 1).
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The Fibonacci bars and the κ-fiber probabilities.
  - The 25 / 4 / 21 / 1 / 20 bars.
  - The kernel spectrum.
  - The three-bit masses.
  - The NAND eigenvalue dots.
  - The arrival curves for Φ = 0, π/2, π and ±π/3.
  - The fringes.
  - The V∞ growth bars and the final dimensions.
  - The prediction-error and contraction curves.
  - The 2nα points on the circle.
  - The overlap curves.
  - The Lie-dimension bars.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the Gram vectors and the plane with v and Jv;
  - the scale boxes;
  - the effect bars;
  - the record trees, whose values are illustrative;
  - the Choi grids;
  - the network wires and the spanning-tree graph;
  - the five-mode graph and its moving markers;
  - the interferometer sketch;
  - the mirror diagram;
  - the site chain;
  - the roots-of-unity circle;
  - the Gaussian bumps.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
