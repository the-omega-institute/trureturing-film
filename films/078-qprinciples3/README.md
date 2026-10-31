# 078 · AURIC QUANTUM PRINCIPLES III · NATIVE PREDICTIVE RANK AND TERMINAL RESPONSE · AURIC 量子原理 第三部 · 原生预测秩与终端响应

This is part three of the four-part AURIC QUANTUM PRINCIPLES series and runs about 7½ minutes (7:27). It covers
`AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION_CONTINUATION_II.md` at subject commit `6d9f2191c3`,
drawing its eleven content scenes from across §§77–137.

The volume keeps the ten sites, seven golden gates and single starting string on which the previous volume closes (its §§70–76). It takes the
whole thirteen-dimensional sector those gates preserve and asks which added relation forces the terminal readout to
be the Born rule: a bound on the native predictive rank, a four-time relation, or a record built from the same gates.

## The film, scene by scene

- **Thirteen paths (§77).**
  - The seven gates K₀ … K₆ preserve exactly the thirteen strings 10β010, where β has five sites and no two adjacent
    ones. They start from v = |1000100010⟩ (Definition 77.1).
  - These are the vacuum paths of eight Fibonacci anyons, with dim V₈^𝟏 = (φ⁷ − (−1/φ)⁷)/√5 = 13.
  - Each gate is one common phase times a braid generator of the Jones representation in the sector [4,4] at
    q = e^(2πi/5): K₍ᵢ₋₁₎|_H = e^(iπ/5)(qI − (1 + q)Eᵢ) for i = 1 … 7 (77.9–77.10).
  - By the density theorem of Freedman, Larsen and Wang, the gate words are dense in PU(13) and the prepared rays
    are dense in ℂP¹² (Theorem 77.2).
- **Predictive rank (§78–§79).**
  - The native matrix H_P(p; (f, w)) = P_w(K_f K_p v) runs over all finite preparation words p, continuations f and
    the 1024 labels w. Its rank equals the dimension of a space of continuous ray functions (Theorem 78.3).
  - When that rank is finite, the space is a sum of distinct irreducible blocks of dimension
    D_j = C(12 + j, j)² − C(11 + j, j − 1)², that is 1, 168, 8112, … (78.5).
  - For a continuous, phase-invariant, ray-sufficient response whose thirteen basis rays read deterministically,
    rank below 8113 forces P_w(ψ) = |ψ_w|² for every unit ψ and every label (Theorem 79.2). The Born matrix has
    rank exactly 169.
  - Calibration is a separate premise: P_w ≡ 1/1024 has rank 1 and is not Born (Proposition 79.3).
- **No rank bound (§80–§82).**
  - The quartic response P_u = q_u + λ q_u q_v, P_v = q_v − λ q_u q_v has native rank 8281 = 91² for every
    0 < λ < 1 (Theorem 80.2).
  - The family h_m = λ q_u^(m−1) q_v keeps every old calibration and has 169 + D_m ≤ r ≤ C(12 + m, m)², so the
    carrier, the reversible gates and the old calibrations supply no uniform rank bound (Theorem 81.1,
    Corollary 81.2). On K₃v the deviation is λx^(m+1).
  - The total variation to Born is λ q_u q_v ≤ λ/4. Its supremum over native words is λ/4, but no finite word
    attains it, because squared amplitudes are algebraic integers and so never equal 1/2 (Theorem 82.1).
- **Four-time relation (§85–§86).**
  - K₀ = ζ[(I − Π) + ζΠ] with rank Π = 5 and ζ = e^(3πi/5). Quadratic readouts see only the phases 1, ζ and ζ⁻¹,
    while every block H_j with j ≥ 2 contains a ζ² eigenvector (Proposition 85.2).
  - Over all finite contexts and labels, three conditions are equivalent: the ten-step average
    (1/10) Σ ζ^(−2t) a_t vanishes; a₃ + x²a₁ = a₀ + x²a₂; and P_w(ψ) = ⟨ψ, E_w ψ⟩ with E_w ≥ 0 and Σ E_w = I. With
    basis calibration this is the Born rule. No finite rank is assumed (Theorem 86.1).
- **Finite witness (§87).**
  - For the program K₃, K₁, then K₀ t times, then K₁, read at u, the return factor is
    d_t = x⁴, x², 1, x² for t = 0 … 3.
  - Born passes both relations. Every quartic model with λ > 0 leaves the ten-step residual λx⁹ζ⁶ and the four-time
    residual −λ(1 + 2x)x⁸, using at most 12 and 6 forward calls (Proposition 87.1).
- **Stability and the square root (§90, §96, §116).**
  - If the four-time residual is at most ε on every context, a calibrated continuous response satisfies
    sup |P_w(ψ) − |ψ_w|²| ≤ ω(ε) = min{1, 2C₀ε + 12√(6C₀ε)}, with a finite source constant C₀ that is not
    evaluated (Theorem 90.2).
  - The square root is sharp. A thresholded detector rotated by t = θ/16 has residual at most (52/243)θ² and
    deviation at least θ/16 (Theorem 96.2, Corollary 96.3).
  - The optimal deviation M(ε) satisfies 1 ≤ lim inf M(ε)/√ε ≤ lim sup M(ε)/√ε ≤ √φ (Theorem 116.1). The exact
    limit is open.
- **Two records (§91–§94).**
  - One fixed isometry V and one record unitary T give both time averages from a single preparation, with weights
    a = (5 + √5)/10 and b = (5 − √5)/10, ab = 1/5 (Theorem 91.2).
  - In finite circuits of golden gates with computational-basis initialisation and readout, event probabilities are
    algebraic integers. Since a satisfies 5a² − 5a + 1 = 0, no event has probability exactly a or b
    (Proposition 93.2).
  - Two copies of K₃v give masses x², x³, x³, x⁴. Conditioning on agreement gives a and b, but only by a division
    (Proposition 93.3).
  - Copying the time labels to an inaccessible archive changes the second reader's masses on v to 3/5 and 2/5
    (Proposition 94.1).
- **Finite checks (§97).**
  - For every finite set of queried rays and contexts there is a non-Born response that agrees exactly at every
    query. It is a polynomial of finite degree, so it has finite rank, and it keeps the basis, code and Alice
    calibrations.
  - On the program K₁, then K₀ t times, then a fixed word f*, its deviation, four-time residual and total variation
    all exceed 1/32 (Theorem 97.2).
- **Vacuum record (§100, §103).**
  - Four more anyons give the carrier V₁₂^𝟏 of dimension 89: a 26-dimensional code J(e_β ⊗ |i⟩) = |10β010i010⟩
    and 63 leakage paths (Definition 100.1). Fixed finite words approximate the common preparation and both readers
    uniformly over all programs (Theorem 100.2).
  - Reduced at the prime over 5 (ζ ↦ −1, x ↦ 2), each gauged gate becomes the image of a transposition, so every
    finite word reduces to a permutation in S₁₂. Hence no finite word on the eleven addresses gives the odd
    controlled phase U_m = (I − Π) ⊗ I + Π ⊗ diag(1, ζ^m) on the whole code (Theorem 103.2).
- **Unknown record weights (§104, §111–§112).**
  - With unknown record weights, a ready anchor, pure successors, causal masses, setting isolation and calibration
    still force F = q, a₀ = a₁ = a ∈ (0, x] and G = cq + d with c = ax/(1 − a) (Theorem 104.3).
  - One more call of K₉ gives a third reader. Five fixed continuations then force c = 1, d = 0 and F = G = q. The
    record masses at p* = 1 are (x, x²), (x, x²) and (x³, 1 − x³) (Theorem 112.1).
- **Record rule and effects (§117–§128).**
  - The rule g_λ(t) = t + λ t(1 − t)(2t − 1)R(t)², where R vanishes at x, x², x³, 1 − x³, ρ and 1 − ρ, keeps every
    contract so far (Theorem 117.2).
  - The programs K₉² then read b₉ = 0, and K₇² then read b₇ = 1, have the same signature x⁴I_H. Their probabilities
    still differ by |λ|Γ(x⁴) (Theorem 127.1).
  - Three label groups of 512, 256 and 256 labels, of ranks 34, 21 and 34 on the carrier, let one terminal program
    approximate any three-outcome effect (Theorem 121.2).
  - If events whose signatures converge together have converging probabilities (Assumption 122.2, an added
    premise), the effect assignment is a trace against the density matrix |v⟩⟨v| (Theorem 123.1).

一部约七分半钟的片子，AURIC 量子原理系列的第三部：七个黄金门恰好保持十三条路径，即八个 Fibonacci 任意子的真空路径，门字在 PU(13) 中稠密；原生预测秩小于 8113 并加上基态标定即迫出 Born 规则，Born 的秩恰为 169；四次响应的秩为 8281 = 91²，幂族的秩无界，而与 Born 的总变差不超过 λ/4 且不可达；四时关系 a₃ + x²a₁ = a₀ + x²a₂ 在全部上下文上等价于二次型，无需假设秩；一个短程序以 λx⁹ 与 −λ(1 + 2x)x⁸ 的残差反驳每个四次模型；稳定性界的平方根是锐的，最优常数介于 1 与 √φ 之间；两个记录以权重 (5 ± √5)/10 共享一个制备，但有限黄金线路无法精确给出这两个概率；任意有限查询都可被一个固定差距超过 1/32 的非 Born 多项式读出通过；四个附加任意子给出 89 维载体，模 5 约化把每个有限字变成一个置换，奇次受控相位永远够不到；记录权重未知时仍迫出 Born，第三个读者把记录质量定为 (x, x²) 与 (x³, 1 − x³)；最后，记录规则仍有自由，相同签名的两个程序概率可以不同，只有加上签名匹配前提，全效果赋值才给出密度矩阵 |v⟩⟨v|。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-078-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.**
  - At the subject commit the volume's digestion directory holds 84 atoms, all residual-open, so no statement of
    this volume is covered by a frozen declaration.
  - One frozen general theorem is named in the effects scene and the finale:
    `D5.S3.Quantum.Foundation.EffectProbabilityExtension.effect_density_representation`. It says that a nonnegative,
    finitely additive, normalised function on the effects of a finite-dimensional matrix algebra is the trace
    against a unique density matrix. Its frozen state file is
    `Golden/Frozen/state/D5/S3/Quantum/Foundation/EffectProbabilityExtension.lean.json`. Theorem 123.1 applies it on
    paper; that application is not compiled in Lean.
- **Published results, used as external inputs.** The sector scene and the finale badge them as published.
  - Density of the Jones representation: M. Freedman, M. Larsen and Z. Wang, arXiv:math/0103200, Theorem 0.1
    (DOI 10.1007/s002200200636).
  - Classification of ray-function representations: T. Galley and L. Masanes, arXiv:1610.04859, Result 2 and
    Appendix A.12; L. Masanes, T. Galley and M. Müller, arXiv:1811.11060, Appendix A, Lemmas 5 and 7.
- **Classical tools named in the volume.** They are listed in the finale:
  - Stone–Weierstrass density and the L² decomposition of ray functions;
  - Arzelà–Ascoli compactness, Haar measure and the Beta(5, 8) law;
  - algebraic integers and the reduction ℤ[ζ] → 𝔽₅;
  - the Coxeter presentation of S₁₂;
  - Kraus purification (Watrous, *The Theory of Quantum Information*, §2.2).
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the gate matrix K, its finite order K¹⁰ = I and the event-integrality theorem 8.2 of the golden-gate NAND
    volume v15;
  - the ten-site register and the quartic response of the previous continuation, §§70–73.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy) runs 357 checks. These are sampled
  and finite checks, not proofs.
  - **Thirteen paths.**
    - Exactly 13 strings are legal. On 2¹⁰ = 1024 basis states, H is invariant under all seven gates.
    - The gates are unitary, satisfy K¹⁰ = I, the braid relations and far commutation, and have a one-dimensional
      commutant on H.
    - The Young-tableau formula for the [4,4] Jones–Wenzl projections reproduces the native projections exactly, and
      K₍ᵢ₋₁₎ = e^(iπ/5)(qI − (1 + q)Eᵢ) for all seven i.
  - **Rank.**
    - The two formulas for D_j agree for j ≤ 8, with D₁ = 168 and D₂ = 8112.
    - The Born native matrix on 520 random preparation words and 45 continuations (585 columns) has rank 169:
      σ₁₆₉ = 0.865, σ₁₇₀ = 1.2 × 10⁻¹⁴.
  - **Quartic.**
    - K₃v = αu + βv with |α|² = x and |β|² = x².
    - With λ = 1/2, 8600 random continuations give 8281 independent coefficient vectors on Sym²H:
      all 8281 singular values lie between 5.7 × 10⁻³ and 71.6, so the coefficient matrix has full rank 91² on F₂.
    - The word 333444333333 reaches q_u q_v = 0.24210. No sampled word has q_u or q_v equal to 1/2.
  - **Four-time relation.**
    - K₀ has eigenvalue ζ eight times and ζ² five times, R(s) factors as stated, and |R(ζ²)| = 1.9021.
    - Born passes both relations on 300 random contexts (residuals below 10⁻¹⁵).
    - The witness gives d_t = 0.1459, 0.3820, 1, 0.3820. The residuals are λ·0.013156 in modulus and −λ·0.047597.
  - **Square root.**
    - For θ = 0.25, 0.5, 0.75 and 1, the response P^θ is calibrated on all 13 basis rays.
    - The sampled residual sup over 1500 contexts is 0.0007, 0.0033, 0.0079 and 0.0108, below (52/243)θ² = 0.0134, 0.0535, 0.1204 and 0.2140.
    - The deviation at ψ₊ is t/(1 − t²) ≥ θ/16. √φ = 1.27202.
  - **Two records.**
    - T is unitary.
    - (I ⊗ ⟨i|T)V = √rᵢ D^(t₁ᵢ) holds as matrices, and the two channels agree on a random matrix.
    - |T_ij|² = a, b, a² + b² = 3/5, 2ab = 2/5, x² + 2x³ + x⁴ = 1 and x²/(x² + x⁴) = a.
    - The minimal polynomial of a is 5a² − 5a + 1.
  - **Finite checks.** One instance queries 80 rays: 40 random rays and the four time rays of 10 random contexts.
    A word f* of length 3 gives q_u q_v(z₃) = 0.1954 > 1/8. With the 83 rays of S (the queries and z₀, z₁, z₂) and
    m = 8, h(z₃) = 0.0518 > 1/32, while h = 0 on every queried ray.
  - **Vacuum record.**
    - The carrier has 89 legal paths, the code 26 and the complement 63 = 21 × 3.
    - K₀ … K₆ act as K_j|_H ⊗ I on the code, K₉ as I ⊗ B_R and K₈ as I ⊗ diag(ζ, ζ²).
    - Modulo 5 the gauged gates are involutions with the braid and far-commutation relations, and they preserve
      G = diag(2^wt).
    - E_C = I + 3Z_R holds, tr r((123)) = 2 and tr r((12)(34)) = 0.
  - **Records.**
    - c(x) = 1, and B_R u = ζ²u.
    - The settings I, K₉² and K₉ give masses (x, x²), (x, x²) and (x³, 1 − x³) at p* = 1, and √(1 − x³) = √2 x.
  - **Rule and effects.**
    - g_λ fixes the six nodes, satisfies g(1 − t) = 1 − g(t) and stays in (0, 1) for |λ| ≤ 1.
    - Γ(x⁴) = 1.935 × 10⁻⁸ and Γ(x⁵) = 2.145 × 10⁻⁷.
    - Both programs have signature x⁴I_H on the 89-dimensional carrier.
    - The label groups have 512, 256 and 256 labels and carrier ranks 34, 21 and 34.
- **Data drawn on screen.**
  - The thirteen strings.
  - The D_j bars and the Born singular values.
  - The quartic singular values and the rank bars of the power family.
  - The q_u q_v values of K₃v and of the word 333444333333.
  - The d_t bars and the witness sequences a_t.
  - The P^θ residual and deviation points.
  - The weights a, b, the postselection masses and the archive masses.
  - The h(z_t) bars of the finite instance.
  - The c(a) curve and the record-mass bars.
  - The h(t) curve and the label-group bars.
- **Illustrative visuals.** These are illustrations, not data:
  - the ten-site register and the gate windows;
  - the 13 × 13 grid;
  - the path picture of v;
  - the braid crossing;
  - the native-matrix texture;
  - the unit circles of tenth roots;
  - the program strips;
  - the shape of ω(ε), drawn with an arbitrary constant because C₀ is not evaluated;
  - the schematic query disk;
  - the 89 carrier tiles;
  - the permutation lines.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
