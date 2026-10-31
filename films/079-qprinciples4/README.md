# 079 · AURIC QUANTUM PRINCIPLES IV · CONSERVATION, READERS AND RECORD HISTORIES · AURIC 量子原理 第四部 · 统计守恒、读器与记录历史

This is part four of the AURIC QUANTUM PRINCIPLES series and runs about 7½ minutes (7:29). It covers
`AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION_CONTINUATION_III.md` at subject commit `9361ecaadd`,
drawing its ten content scenes from §§138–172 of the volume.

The volume keeps one complex Fibonacci source: 89 legal paths, one ready path, eleven pre-read addresses and seven
post-read addresses. The film asks which native statistical relations, readers and hidden histories make the record
probabilities of this source equal to squared amplitudes, and which further assumptions each answer still needs.

## The film, scene by scene

- **One source (§138–139).**
  - The full carrier V₁₂ has 89 legal paths with fixed boundary bits b₋₁b₀ = 10 and b₁₀b₁₁b₁₂ = 010. The ready block H
    has dimension 13, the code 13 × 2 = 26 and its complement 63 (Definition 138.1).
  - The record bit b₉ splits the carrier into sectors of dimension 55 and 34 (139.4). The pre-read gates K₀ … K₈ never
    change b₉, so they commute with the record projections Mᵢ.
  - The joint closure of the native words on the two sectors is PU(55) × PU(34) (139.7), from the joint density
    theorem of Freedman, Larsen and Wang with (k, r, n) = (2, 5, 10) and shapes [6,4] and [5,5]. Hence one finite word
    family 𝒢 separates every pair of conditional states: q_g(u₀) − q_g(u₁) > 1/2 for some g ∈ 𝒢 (Theorem 139.2).
- **Two duties (§140–142).**
  - Duty C: m₀(aj) = m₀(a) for every real prefix a and j = 0 … 8 (Assumption 140.1). Duty D: inserting the reader
    leaves the probability of the old event A = {b₁ = 1} unchanged (Assumption 140.2).
  - In the conditional model ℬ, C and D hold exactly when mᵢ(a) = ‖Mᵢ K_a R₀v‖² for every real prefix a, and then
    the record–terminal marginals are ‖N_w K_f Mᵢ K_a R₀v‖² on all 1024 labels (Theorem 140.3). The record weights may
    depend on the whole real history; no continuity is assumed.
  - The key step is (140.8): D is (m − t)(p₀ − p₁) = 0. A separating word makes p₀ − p₁ > 1/2, and C carries the
    weight back from ag to a.
  - Neither duty alone suffices (Proposition 141.1). Conservation restricted to the seven addresses 0 … 6 still leaves a
    rank-one blind spot (Proposition 141.2).
- **No finite alphabet (§143).**
  - A terminal-sufficient classical alphabet of size n writes H(a; f, w) = Σₛ αₐ(s) β_f,w(s) with arbitrary prefix
    encodings and arbitrary continuation responses (Definition 143.1).
  - For every n there are m = 2ⁿ + 1 native prefixes and continuations whose terminal table is within δₙ of
    Tᵢⱼ = sin²(π(i − j)/m). Every such model misses some entry by more than δₙ = γₙ²/(32n), with γₙ = sin²(π/m)
    (Theorem 143.2). The proof is a pigeonhole on the 2ⁿ threshold supports.
  - Archives may be kept as passive records. Infinite, continuous or context-reading models are not excluded
    (Propositions 143.3 and 143.5).
- **One event (§144).**
  - Drop the full terminal Born rule. Keep only one unknown continuous response q for A, with calibrations q([e₀]) = 0
    and q([e₁]) = 1, and add relation E: P_T(aj)(A) = P_T(a)(A) for j = 2 … 10 (Definition 144.1, (144.3)).
  - The bit reversal S satisfies S Kⱼ S⁻¹ = K₁₀₋ⱼ and S M₁ S⁻¹ = Q (144.10), so the event split gets the same
    SU(55) × SU(34) control as the record split. The four intersections have dimensions 34, 21, 21 and 13 (144.16).
  - C, E and D give F(t r₀ + (1 − t) r₁) = F(t)F(r₀) + (1 − F(t))F(r₁) (144.18). At t = 1/2 this is the midpoint
    equation, so F(s) = s. Hence q([ξ]) = ‖Qξ‖², mᵢ(a) = ‖Mᵢ χ_a‖² and P_R(a,f)(i, A) = ‖Q K_f Mᵢ χ_a‖²
    (Theorem 144.3). If any of these fails, some real finite prefix shows a nonzero defect.
- **Jumps (§145–149).**
  - The generative model uses Bell-type minimal jump rates on the 89 paths, with each gate the fixed pulse
    Hⱼ = −α(I + Pⱼ), α = 3π/5, so that Uⱼ(1) = Kⱼ (Definition 145.1, Assumption 145.2).
  - Each native gate makes at most two jumps (Theorem 146.1). From the ready, two calls of address 1 give
    p(t) = 4c² sin²(αt/2) with τ = 5/3. The second call makes exactly two jumps with probability
    (p(τ) − p(1))(p(τ) − p(2))/p(τ) = 0.0312 (Theorem 146.2).
  - Given the readable past, E[Z] ≤ y = φ^(−1/2) ≈ 0.786, and the constant is sharp on the mathematical input domain
    (Theorem 147.1). Given the hidden past it can be larger: on {Q₁ = q₀} the second call has expectation at least
    3x − 1 ≈ 0.854.
  - The same trajectory produces the records, the old terminal and the archives, and it supplies C and D pathwise
    (Theorem 148.1). Minimality is a modelling choice: symmetric extra traffic keeps the square marginals but adds
    jumps (Proposition 149.2).
- **Ready return (§150).**
  - Assume the event prediction rows x_a span a space of finite dimension r, and the statistical return law
    R₁₀: p(a j¹⁰ f) = p(a f) (Assumption 150.2).
  - Then ready return, meaning d([χ_aₙ], [e₀]) → 0 ⇒ ‖x_aₙ − x_ε‖_∞ → 0, holds exactly when one continuous q on rays gives
    p(a) = q([χ_a]). A fixed set of r − 1 futures controls all rows, and a failure shows up at one fixed future
    (Theorem 150.3).
  - The Born comparison law lies in the class, with sup_f |p(af) − p(f)| ≤ 2d([χ_a], [e₀]) (Proposition 150.5).
- **Effect span (§151).**
  - The post-read words act only inside the literal tail blocks (b₇, b₈, b₉) of sizes 21, 21, 13 (record 0) and
    21, 13 (record 1). The real span of all actual effects is Herm(𝒜₀) of dimension 1051 and Herm(𝒜₁) of
    dimension 610. The joint closure on a 21-block and a 13-block is PU(21) × PU(13) (Theorem 151.2).
  - For the prefixes ε, 7 and 77 the tail weights are (0, 1), (x, x²) and (1 − x⁴, x⁴). So
    r(χ₇) = α r(χ₇₇) + (1 − α) r(ready) exactly, with α = 1/(1 + x²) ≈ 0.724, although all three are pure states
    (Theorem 151.4).
  - In the positive linear class the whole posterior freedom is the central weights βₛ, and full conditional equality
    holds exactly when βₛ = tₛ (Theorem 151.6, Corollary 151.7).
- **Fifteen-call reader (§152–156).**
  - Four vacuum sites give V₁₆ with 610 = 55 × 8 + 34 × 5 paths. The interface Ξ has image 178 and complement 432
    (Definition 152.1).
  - The half twist d = (10, 11, 10, 12, 11, 10, 13, 12, 11, 10, 14, 13, 12, 11, 10) satisfies D K₁₀ = K₁₄ D and
    D K₁₄ = K₁₀ D. For all 89 source columns D Ξ₀|q⟩ = |q⟩ ⊗ η_b₉(q) with supp ηᵢ ⊆ {b₁₃ = i}. The garbage stays;
    η₁ is the tail 00010 (Theorem 152.2).
  - With Bell jumps on the whole carrier, the full path law factors as μ^proj(dh) · R_I(h)(dr) (Theorems 153.3 and
    154.2). The record weights, all old terminals and the projected pure successor follow while the global vector is
    never projected (Theorems 155.1 and 156.2).
- **Density question (§157, §164–166).**
  - Among coherent quartic densities that vanish at nodes, conservation on every native component forces
    F_q = p_q N, which is Born (Theorem 157.2). A node-respecting quartic deformation changes a component sum by
    −ε x³ sin²(3πt/10) (Proposition 157.3).
  - The full continuous class is not unique. Thirty-two odd-site sectors with eigenvectors wₛ of all even addresses give
    Π = b + ε c h, which is continuous, normalised, at least (1 − ε) times Born, zero exactly at nodes and conserved on
    every native component (Theorem 164.4). At z* = Σ wₛ/√32, h(z*) = x⁸/32. No finite polynomial degree contains it
    (Proposition 164.5), and a smooth version exists (Theorem 165.2).
  - Whether degree three or higher already admits a non-Born density stays open (Corollary 157.5,
    Proposition 166.1).
- **Zero-amplitude reader (§158–163, §167–172).**
  - The auxiliary start can be any fixed unknown u_B in the plane B = span{01000, 01010}, with any configuration law ν
    on its support. The whole old source history keeps the law μ^proj (Theorems 158.2, 160.3 and 161.2). With
    u = (1, 1)/√2, the starts ν = δ₀ and δ₁ share one global vector and one source law but have disjoint auxiliary
    histories (Theorem 162.2).
  - Within source-independent literal tails, B is exactly the common interface. The tail 00000 reports 0 on every
    b₉ = 1 column (Theorem 159.2).
  - A deterministic rule replaces the reader's random jumps: stay while the current amplitude is nonzero, and jump along
    the gate edge at its first exact zero. Each call makes at most one jump, all 89 columns report correctly and the old
    source law is unchanged (Lemma 167.2, Theorems 168.2 and 170.1).
  - The micro-history really changes. In the second call (address 11), Bell jumps with probability
    4c² sin²(α/2) = x and the zero rule never jumps (Theorem 171.1).

一部约七分半钟（7:29）的片子，AURIC 量子原理系列的第四部：同一个八十九条路径的来源中，记录位 b₉ 把载体分成 55 与 34 维两个扇区，原生字在两个扇区上联合稠密，因而一个有限字族能把任意两个条件态分开超过 1/2；两项原生统计职责 C（前读控制不改记录边缘）与 D（插入读器不改旧事件 b₁ = 1 的概率）合起来恰好迫使记录权重为 ‖Mᵢ K_a R₀v‖²，任一单独都不够；对每个 n，2ⁿ + 1 个原生前缀与接续排除全部 n 状态经典预测，误差下界为 γₙ²/(32n)；只保留一个事件的未知连续响应并加上关系 E，位反转与中点方程给出 F(s) = s；在 Bell 型最小速率跳跃中，每个门至多跳两次，可读历史下期望跳数至多 1/√φ ≈ 0.786，以隐藏历史为条件则可达 3x − 1；有限预测容量加十步统计回返时，ready 回返恰等价于射线上的连续共同响应；后读效果张成 1051 与 610 维的分块代数，前缀 7 的预测行是前缀 77 与 ready 的凸组合；四个真空位与十五次调用的半扭转在 610 维载体上写下记录，全局波函数无需塌缩；相干四次密度中原生守恒迫使 Born，而完整连续类中存在非 Born 密度；最后，辅助初态可以不是 Born 分布，零振幅触发的确定性读器给出同样的旧源律，但在第二次调用中 Bell 读器以概率 x 跳，而它从不跳。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-079-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the volume has no digestion records; it has not been ingested.
  - No Lean declaration covers any statement shown.
- **Published results, used as external inputs.** The source and jump scenes and the finale badge them as published.
  - Joint density of Jones representations: M. Freedman, M. Larsen and Z. Wang, arXiv:math/0103200, Theorem 0.1 and §2.
  - Bell-type minimal jump rates: D. Dürr, S. Goldstein, R. Tumulka and N. Zanghì, arXiv:quant-ph/0407116, §2.7.
  - Existence of the jump process: H.-O. Georgii and R. Tumulka, arXiv:math/0312294, Assumption A and Theorem 1.
- **Classical tools named in the volume.** Conditional probability, compactness and finite subcovers, the pigeonhole
  principle, midpoint convexity, finite-dimensional trace duality, change of measure and the monotone class argument.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the path model, ready, code and terminals of the coherent reconstruction continuation II (§§77, 100, 117, 121);
  - the two-model counterexamples of continuation II (§§117–119, 129, 134) used in Proposition 141.1;
  - the Garside half-twist relation of volume V27 (Lemma 5.3).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, scipy, sympy) builds the literal matrices
  (138.2a) on the 89-path and 610-path carriers and runs 92 checks.
  - **Source.**
    - The carrier has 89 legal paths, record sectors 55 and 34, code 26, complement 63 and ready block 13.
    - Kⱼ¹⁰ = I for all eleven addresses, [Kⱼ, Mᵢ] = 0 for j ≤ 8 and [Kⱼ, Q] = 0 for 2 ≤ j ≤ 10.
    - The admissible (2, 5) height paths of length 10 ending at 2 and 0 number 55 and 34.
    - At the prefix 99, t₀ = x⁴ = 0.1459 and both conditional states give ⟨Q⟩ = 0.
    - Simulated annealing found a word of length 73 over the addresses 0 … 8 with q_g(u₀) = 0.8705 and
      q_g(u₁) = 0.0681. The word leaves the record weights unchanged.
  - **Duties.** On 200 random prefixes, P_T(A) = t p₀ + (1 − t) p₁ and P_R(A) − P_T(A) = (m − t)(p₀ − p₁).
  - **Alphabet.**
    - For n = 1 … 8, Tᵢᵢ = 0, Tᵢⱼ ≥ γₙ, and the inequality chain of (143.10)–(143.11) holds. For n = 1, γ = 3/4 and
      δ = 9/512.
    - Alternating linear programs found classical fits with errors 0.375, 0.452 and 0.295 for n = 1, 2 and 3. These
      are far above δₙ = 0.0176, 0.00187 and 1.4 × 10⁻⁴.
  - **One event.**
    - The intersection dimensions are 34, 21, 21 and 13.
    - The bit reversal gives S Kⱼ S⁻¹ = K₁₀₋ⱼ for all j and S M₁ S⁻¹ = Q.
    - Midpoints fix F at all 65 points k/64.
  - **Jumps.**
    - τ = 5/3, p(1) = x, p(τ) = 4x³ = 0.9443 and p(2) = 0.8541. Pr(Z₂ = 2) = 0.03115.
    - A Monte Carlo of 200000 runs gives 0.0311, with at most two jumps in each pulse.
    - Over 4000 random block inputs the largest E[Z] is 0.78588 ≤ y = 0.78615, and the stated input gives 0.786151.
    - (p(τ) − p(1))/(1 − p(1)) = 3x − 1 = 0.8541 > √x.
  - **Ready return.** For 160 prefixes near the ready ray and 150 futures each, sup_f |p(af) − p(f)| ≤ 2d. Some prefixes
    return exactly.
  - **Effects.**
    - The tail blocks are 21, 21, 13 and 21, 13.
    - The real span of the actual effects reaches 1051 and 610 after 60 random words.
    - The tail weights are (0, 1), (x, x²) and (1 − x⁴, x⁴). r(7) = α r(77) + (1 − α) r(ready) holds on 300 random
      futures and all labels to below 10⁻¹³.
    - A found post-read word of length 69 gives q₂₁ = 0.9469 and q₁₃ = 0.0031. The event gaps are 0.5833 > 9/16 and
      0.8061 > 45/64.
  - **Reader.**
    - V₁₆ has 610 paths, with 8 and 5 reader tails. Ξ is an isometry with image 178.
    - D K₁₀ = K₁₄ D and D K₁₄ = K₁₀ D.
    - On all 89 columns D Ξ₀|q⟩ = |q⟩ ⊗ η_b₉(q), with η₁ the single tail 00010. The prefix and future pulses
      intertwine.
    - On b₉ = 1 columns the correctly reporting tails form exactly B, and 00000 reports 0 with probability one.
    - For 20 random u ∈ B the copy is still correct.
    - A Monte Carlo of the Bell reader (20000 runs per record) reports correctly every time, with at most two jumps per
      call. The final tails match |ηᵢ|². The second call jumps with frequency 0.618 in both records, against
      x = 0.618.
    - Started at 01010 with u = (1, 1)/√2, a non-Born start, every report is still correct.
  - **Density.**
    - The flip graph on 89 paths stays connected after deleting any vertex.
    - Born masses are conserved on every native component for 200 random cases.
    - The quartic deformation changes a component sum by exactly −ε x³ sin²(3πt/10).
    - The 32 vectors wₛ are orthonormal, with Σ 2^(mₛ) = 89, and Pⱼ wₛ = eⱼ(s) wₛ for even j.
    - h(z*) = x⁸/32. On 300 sampled rays near z* every component sum is conserved to 5.6 × 10⁻¹⁷, and h vanishes on an open
      set.
  - **Zero rule.**
    - For both records, u = (1, 0), (1, 1)/√2 and (0, 1), and 40 random u in B, the deterministic reader reports
      correctly with at most one jump per call.
    - From 01000 with u = (1, 0) it never jumps in the second call, while 4c² sin²(α/2) = x.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The 55 and 34 sector bars and the two curves of the found separating word.
  - The bridge bars (0 at the prefix 99, the gap after the word, t₀ = x⁴).
  - The 9 × 9 table sin²(π(i − j)/9), the δₙ curve and the fitted errors.
  - The 34, 21, 21, 13 blocks and the dyadic points.
  - The p(t) curve, the Monte Carlo jump frequencies and the E[Z] histogram.
  - The near-return scatter.
  - The effect-rank curves and the three tail-weight points.
  - The staircase of the fifteen calls and the |ηᵢ|² bars.
  - The violation curve and the 32 sector tiles.
  - The sampled Bell reader path, the zero-rule path and the call-2 jump bars.
- **Illustrative visuals.** These are illustrations, not data:
  - the ring of 89 dots and the path chain;
  - the program strips;
  - the support boxes of the pigeonhole;
  - the reversed chains;
  - the ray-space circle;
  - the plane B with its rotating vector.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
