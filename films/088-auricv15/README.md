# 088 · AURIC V15–V16 · GOLDEN GATE ARITHMETIC AND VARIATIONAL PREDICTION · AURIC V15–V16 · 黄金门的算术与变分预测

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:27). It covers two volumes at subject
commit `e168d4bbef`:
- `AURIC_GOLDEN_GATE_NAND_UNIVERSALITY_AND_ARITHMETIC_LIMITS_V15.md`, §2–§11;
- `AURIC_PREDICTION_RECURSION_OPTIMIZATION_AND_VARIATION_V16.md`, §3–§14.

Version fifteen asks whether one fixed golden gate can play the role of NAND. It approximates every gate on a stated
encoding, but its finite words obey arithmetic: their probabilities are algebraic integers and a parity rule holds.
Version sixteen asks when prediction, recursion, optimization and variation have the same solution, and returns to the
gate to bound how long a word must be.

## The film, scene by scene

- **NAND and the gate (V15 §2–§3).**
  - With f(a, b) = 1 ⊕ ab, the map V_f|a, b, t⟩ = |a, b, t ⊕ f⟩ is a permutation with V_f = X_t · Toffoli and V_f² =
    I. Compressing two input bits into the one NAND bit by an isometry W|ab⟩ = |f⟩|e_ab⟩ needs an environment of
    dimension at least 3, and 3 is enough (Proposition 2.2).
  - The gate is K = ζ[I + (ζ − 1)P] on three neighbouring sites, ζ = e^(3πi/5), where P = n_L n_R + (1 − n_L)(1 −
    n_R)Q_C is a real projection. K is unitary, keeps the five legal modes 000, 100, 010, 001, 101, and satisfies K¹⁰
    = I, K⁵ = 2P − I and K⁻¹ = K⁹ (Theorem 3.1).
  - For projections with PQP = φ⁻²P and QPQ = φ⁻²Q, B_P B_Q B_P − B_Q B_P B_Q = s³(z − 1)[z + φ⁻²(z − 1)²](P − Q). So
    the braid relation holds exactly when z = e^(±3πi/5) (Proposition 3.2). This holds on the legal path space, not on
    the whole 2^N space.
- **Two addresses (V15 §4–§5).**
  - Encode one qubit as |1 0 q 0 1 0⟩ and call K at centres b₀ and b₁. Both keep the code, and act through P = |1⟩⟨1|
    and Q = [[φ⁻¹, φ^(−3/2)], [φ^(−3/2), φ⁻²]] with Tr PQ = φ⁻² (4.2).
  - Tr(R_P R_Q) = 4 − 2√5 for the reflections R = K⁵. Its conjugate 4 + 2√5 > 2, so the rotation has infinite order.
    With a second axis, the closure of ⟨K_P, K_Q⟩ is {U ∈ U(2) : det U ∈ μ₁₀} (Lemma 4.1, Theorem 4.3).
  - Squares also give all of PU(2), with closure det U ∈ μ₅ and Tr(K_P² K_Q⁻²) = 2 − √5 (Theorem 5.1). The ten powers
    split into the classes 0, 5, {1, 3, 7, 9} and {2, 4, 6, 8} (Corollary 5.2).
  - Reflections alone give only O(2). Every real orthogonal O misses S₀ = diag(1, i) by at least √(2 − √2), for any
    real encoding (Theorem 5.3).
- **Encoding bridge and defects (V15 §6–§7).**
  - For n qubits, 4n + 2 sites in vacuum blocks match the Fibonacci prefix-path basis one to one. Each braid generator
    B_i, 1 ≤ i ≤ 4n − 1, is then exactly K at centre b_(i−1), boundaries included (Theorem 6.1).
  - The published Fibonacci density theorem then gives encoded universality. A braid word with L letters becomes at
    most 9L forward calls of K (Theorem 6.2). A NAND word within ε has error plus leakage at most ε² on each basis
    input, and half-diamond error at most ε (Corollary 6.3).
  - Without the encoding, [K_j, n_i n_(i+1)] = 0 for all i, j. Every adjacent pair of ones is conserved, and a single
    X_i is at half-diamond distance 1 from every word (Theorem 7.1).
- **Integer probabilities and the fair coin (V15 §8, §11).**
  - Every event probability of a finite complete golden protocol is a real algebraic integer. A rational one is 0 or
    1, so there is no exact fair coin, Bell state or Hadamard from the computational basis (Theorem 8.2).
  - For a unitary word of length L, |p − 1/2| ≥ 1/(2 · 3⁷ · κ^(14L)) with κ = 1 + 2φ³ (Proposition 8.3).
  - Postselection changes this. Run K on two fresh |000⟩ blocks and keep 01 or 10. Each readout is 1 with probability
    1/φ, success is s = 2/φ³ and the kept bit is exactly fair (Proposition 11.1). Repeating until success takes φ³/2
    rounds on average; stopping after M rounds leaves abort probability (1 − s)^M (Theorem 11.2).
- **Parity selection (V15 §9–§10).**
  - Same-parity amplitudes of every finite word lie in ℤ[ζ], opposite-parity ones in βℤ[ζ], with β = φ^(−1/2) (Lemma
    9.1). The Galois map ζ ↦ ζ³ sends β² = 1/φ to −φ, so σ(p) ≤ 0 for an opposite-parity event, and a rational such
    probability is 0 (Theorem 9.2).
  - In the word encoding with ancillas restored, exact NOT, CNOT, Toffoli and V_f are therefore impossible (Corollary
    9.3). A discarded fixed environment does not help V_f, CNOT or Toffoli, since the parity change δ(x) = π(ω(x)) ⊕
    π(x) must be constant (Lemma 9.4, Theorem 9.5). All of them remain approximable.
  - Every finite word has invertible same-parity blocks C_ee and C_oo, so no state of definite parity is flipped
    completely (Theorem 10.1).
- **Two optima on one fiber (V16 §3, §12).**
  - Three readings X = p₁ + p₁₃, Y = p₃ + p₁₃ and Z = p₂ leave the hidden coupling κ = p₁₃ in [max(0, X + Y − R),
    min(X, Y)], R = 1 − Z. Maximum entropy picks κ* = XY/R and minimax picks the midpoint. For X = Y = 1/5, Z = 0
    these are 1/25 and 1/10 (Theorem 3.1).
  - D(p ‖ p*) = H(p*) − H(p) = R · I(x₁ : x₃ | x₂ = 0) (Proposition 3.2).
  - The mass-action flow κ̇ = −M D′(κ) = −γR(κ − κ*), with logarithmic-mean mobility M, is the unique solution of the
    local velocity problem and turns the energy-dissipation identity into equality (Theorem 12.1). Its quadratic
    action is (αT/2) coth(αT/2) > 1 times that of the straight path with the same ends (Proposition 12.2).
- **Recursion and Bellman (V16 §4–§5).**
  - A contraction with constant q has E_res(Tx) ≤ q² E_res(x) and ‖x − x*‖ ≤ ‖x − Tx‖/(1 − q) (Theorem 4.1).
  - F(x) = x³ − 3x + 3 has ½F² with a strict local minimum 1/2 at x = 1, where F = 1 ≠ 0 (Proposition 4.3).
  - On a finite DAG, the cheapest complete path, the Bellman value, the cheapest unit flow and the best potential
    lower bound are equal and attained. A path with all reduced costs zero certifies itself (Theorem 5.2).
- **Gibbs and records (V16 §6, §8).**
  - With reference law Q and temperature τ, F_τ(P) = E_P C + τD(P ‖ Q) is minimized by the Gibbs path law. The soft
    Bellman recursion gives −τ log Z(s), F_τ(P) = −τ log Z(s) + τD(P ‖ P*), and m ≤ −τ log Z(s) ≤ m − τ log Q(h*)
    (Theorem 6.2, Proposition 6.3).
  - Under one joint law, refining the records lowers the squared risk by exactly E(m_G − m_F)² (Theorem 8.1). If a
    finite random choice tree has E B < 1, following conditional expectations reaches a leaf with B = 0 (Proposition
    8.2).
- **Golden spectrum (V16 §7).**
  - Strings with no two adjacent ones satisfy Z_n = Z_(n−1) + Z_(n−2), grow at the Perron root φ, and every stationary
    process on them has entropy rate at most log φ (Theorems 7.2–7.3).
  - Equality picks the Parry chain P₀₀ = 1/φ, P₀₁ = 1/φ², P₁₀ = 1 (Theorem 7.3).
  - Its three-site slice on (000, 100, 010, 001, 101) is (1, 1/φ, 1, 1/φ, 1/φ²)/(φ√5), so p₀₀₀p₁₀₁ = p₁₀₀p₀₀₁
    (Corollary 7.4).
- **Histories without descent (V16 §9–§11, §13).**
  - On a finite linear coherent network, x* = (I + A + … + A^(m−1))b is the unique zero of a strictly convex residual
    (Theorem 9.2). The parallel update x ↦ Ax + b need not lower it.
  - A golden circuit is the zero-energy history state of a propagation Hamiltonian (Theorem 10.1). Eliminating the
    interior of ten equal-weight K gates leaves ‖y − x‖²/10 (Theorem 10.2).
  - Because K¹⁰ = I, an energy that never rises under K is constant (Theorem 11.1).
  - Real-time Schrödinger evolution is a stationary point of the action and in general a saddle (Theorem 13.1).
    Normalized imaginary time lowers energy at rate 2 Var_ψ(H) (Proposition 13.2).
- **Finite words (V16 §14).**
  - Let e_L be the best error of a positive word of length at most L in K_P, K_Q for the logical X on the one-qubit
    code. Then e_L > 0, e_(L+1) ≤ e_L and e_L → 0 (Theorem 14.1).
  - With Γ = φ³ + √(φ⁶ − 1) < 9, the same-parity residue of any ℓ-gate word is at least 2/(1 + Γ^ℓ), so e_L ≥ √(2/(1 +
    Γ^L)), and e_L ≤ ε needs L ≥ log(2ε⁻² − 1)/log Γ (Theorem 14.2).
  - How close this lower bound comes to constructive compilation is left open in §15.

一部约七分半钟的片子，延续 AURIC 版本系列，讲第十五、十六两卷。第十五卷：可逆 NAND 的相干压缩至少需要三维环境；固定黄金门 K = ζ[I + (ζ − 1)P] 满足 K¹⁰ = I、K⁵ = 2P − I，编织关系只在
e^(±3πi/5) 处成立；在 |1 0 q 0 1 0⟩ 编码中两个地址生成行列式属于 μ₁₀ 的全部酉矩阵，平方门同样普适，而纯反射与相位门的误差至少为 √(2 − √2)；真空块编码使每个 Fibonacci
编织生成元恰为某地址上的 K，再借已发表的稠密定理得到多比特普适性，而无编码的裸链守恒每一对相邻的 1；有限完整协议的概率都是代数整数，所以有理概率只能是 0 或 1，后选择则以成功率 2/φ³ 给出精确公平的比特；奇偶分级与
Galois 映射 ζ → ζ³ 排除精确的干净 NOT、CNOT、Toffoli 与可逆 NAND，且同奇偶块永远可逆。第十六卷：同一个五模式纤维上最大熵与 minimax 给出 1/25 与
1/10，质量作用流使能量耗散恒等式取等；收缩递归会自证误差，而 x³ − 3x + 3 的平方残差有不是解的局部极小；有限 DAG 上 Bellman、最短路、最小流与势对偶相等；Gibbs 律由软 Bellman 递归求出；禁止相邻
1 的语言以 φ 增长、熵率至多 log φ，由 Parry 链取等；黄金电路是零能历史态，但 K¹⁰ = I 排除逐步严格下降；最后，逻辑 NOT 的最佳误差 e_L 总为正并趋于零，且 e_L ≥ √(2/(1 + Γ^L))，Γ
= φ³ + √(φ⁶ − 1) < 9。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-088-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit neither volume has digestion records: there is no
    `Meta/Digestion/backfill/auric-golden-gate-nand-universality-and-arithmetic-limits-v15/` and no
    `Meta/Digestion/backfill/auric-prediction-recursion-optimization-and-variation-v16/` directory.
  - No Lean declaration covers any statement shown, so every volume result carries the theory badge.
- **Published results, used as external inputs.** The bridge, golden-spectrum and history scenes and the finale badge
  them as published; they are not recomputed here.
  - Density of the Fibonacci braid representation: Freedman–Larsen–Wang, arXiv:quant-ph/0001108 and arXiv:math/0103200
    (§6, Theorem 6.2); Delaney–Rowell–Wang, *Local unitary representations of the braid group*.
  - The maximal-entropy chain on a subshift: W. Parry, *Intrinsic Markov Chains*, Trans. AMS 112 (1964), DOI
    10.1090/S0002-9947-1964-0161372-1.
  - History states and the propagation Hamiltonian: Aharonov et al., arXiv:quant-ph/0405098.
  - Background cited by V16: Bellman (DOI 10.1090/S0002-9904-1954-09848-8), Todorov (NIPS 2006), Gneiting–Raftery
    (JASA 2007), Mielke–Peletier–Renger (arXiv:1510.06219), Yuan et al. (arXiv:1812.08767).
- **Classical tools, proved in V16 and badged as classical.** The Bellman recursion with flow decomposition and LP
  duality, the Gibbs variational identity, conditional expectation and the method of conditional expectations, the
  Fibonacci count with its Perron growth and entropy-rate bound, real-time stationary action and normalized imaginary
  time.
- **Other classical tools named in the volumes.** The trace criterion for finite order in SU(2), generation of SU(2)
  by two circles, the field norm and the Galois automorphism ζ ↦ ζ³, Cauchy–Schwarz, the contraction fixed-point
  theorem, the logarithmic-mean gradient-flow (Onsager) structure.
- **Project inputs from other volumes, not recomputed except where listed below.**
  - The fusion-path adjacency and the F, R data of `FUSION_SPIN_CHAIN_QCA_CUT_OBSTRUCTIONS.md` (V15 §3.1, §6.1).
  - The five-mode fiber, its two optima and the mass-action flow, which V16 §1 restates from the pyramid formulas and
    information-escape volumes.
  - V16 §14 takes the single-qubit density from V15 §4–§5.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following.
  - **Gate.** P is a real projection, K is unitary, K¹⁰ = I, K⁵ = 2P − I, K^r = ζ^r(I − P) + ζ^(2r)P, and only 000 ↔
    010 mixes. V_f = X_t · Toffoli, V_f² = I, and a three-dimensional environment gives an isometry. The braid
    identity of Proposition 3.2 holds symbolically, and its zeros are e^(±3πi/5).
  - **Two addresses.** Both addresses keep |1 0 q 0 1 0⟩ exactly, with the stated P and Q and Tr PQ = φ⁻².
    - Tr(R_P R_Q) = 4 − 2√5 ≈ −0.472, with minimal polynomial x² − 8x − 4. (R_P R_Q)^n ≠ I for n ≤ 2000.
    - det K_P = det K_Q = ζ³. Tr(K_P² K_Q⁻²) = 2 − √5. The determinant orders for k = 0…9 are 1, 10, 5, 10, 5, 2, 5,
      10, 5, 10.
    - An exhaustive search over words of up to 16 letters gives best errors to S₀ = diag(1, i) of 0.0473 (K) and
      0.0514 (K²). Reflection words stay at exactly √(2 − √2) = 0.7654.
    - 300 random real encodings and orthogonal maps give errors of at least 0.7667.
  - **Bridge.** For n = 1 (6 sites, 3 generators) and n = 2 (10 sites, 7 generators, dim V₈ = 13), every braid
    generator equals K at the stated centre, entry by entry. The braid relations hold on the legal path space and fail
    on the whole 2⁴-dimensional space.
  - **Defects.** On a 7-site chain all 30 commutators [K_j, n_i n_(i+1)] vanish.
  - **Exact arithmetic.** Amplitudes were computed exactly in ℤ[ζ][β] for 400 random words of length 1–14 on 5 sites.
    - The parity grading holds and p + q = 1 exactly.
    - Every probability has the form m + n(1 − φ) with integers m, n.
    - Every opposite-parity probability has σ(p) ≤ 0.
    - q · σ(q) = m² + mn − n² is an integer ≥ 1, q ≥ 2/(1 + Γ^ℓ), and ‖σ̃(C)|x⟩‖² = 2σ(q) − 1 ≤ Γ^ℓ.
    - ‖σ̃(K)‖² = Γ = 8.3524. All eight embeddings of K have norm 2.890 ≤ κ = 9.472.
    - β = φ^(−1/2) has minimal polynomial x⁴ + x² − 1.
    - On 500 random words over 4 sites, C_ee and C_oo are invertible (smallest singular value 0.053).
  - **Coin.** Pr(B = 1) = 1/φ, s = 2/φ³ = 0.4721 and E T = φ³/2 = 2.118. A Monte Carlo run of 400 000 rounds gives
    success 0.4722 and Pr(1 | kept) = 0.5011. The abort probabilities for M = 1…5 are 0.528, 0.279, 0.147, 0.078 and
    0.041.
  - **Fiber.** For X = Y = 1/5, Z = 0, numeric maximization gives κ* = 0.04000 and minimax gives 0.1. The KL identity
    holds at 21 points on three fibers. The energy-dissipation defect is 0 on the flow and 0.072 on the straight path.
    The action ratio at αT = 3 is 1.657 = (αT/2) coth(αT/2).
  - **Recursion.** A q = 1/2 contraction obeys both inequalities. F = x³ − 3x + 3 has its only real zero at −2.1038.
  - **Bellman and Gibbs.** On a 6-node DAG with 8 complete paths, the path minimum, the Bellman value, the flow LP and
    the potential LP are all 7, and the optimal path has zero reduced costs. The Gibbs identity holds for 150 random
    path laws at τ = 0.3, 1 and 2.5. Q(h*) = 1/16, and m ≤ −τ log Z(s) ≤ m + τ log 16.
  - **Golden spectrum.** Brute-force Z_n matches the closed form for n ≤ 12 and λ = 1, 2, 0.7.
    - The Parry chain has π = (0.7236, 0.2764) and entropy rate log φ = 0.481212.
    - The variational identity holds on 57 chains, with the maximum at Q₀₁ = 1/φ² = 0.382.
    - The five-mode slice is (0.2764, 0.1708, 0.2764, 0.1708, 0.1056).
  - **Records.** Both identities of Theorem 8.1 hold on a random 64-point law. Seven 3-clauses on 4 bits have E B =
    7/8, and the conditional-expectation walk 0.875 → 0.75 → 0.5 → 0 → 0 ends at a leaf with B = 0.
  - **Histories.** The coherent-DAG solution, its zero residual and the lower bound hold on 200 samples. The parallel
    update goes 1/2 → 9/2 → 0 for M = 3.
    - A 4-gate golden circuit has a 16-dimensional zero-energy space, which shrinks to the single history state under
      the input penalty.
    - Elimination matches (Σ 1/w_j)⁻¹ ‖y − U_L … U_1 x‖²; ten K gates give ‖y − x‖²/10.
    - The action difference is ∓0.025 for ω = ±5, so the stationary point is a saddle. Imaginary time keeps the norm,
      has dE/dτ = −2 Var(H) and reaches the lowest level.
  - **Finite words.** An exhaustive search gives e_L = 0.654 at L = 1, then 0.389 from L = 2, 0.238 from L = 5, 0.113
    from L = 11 and 0.068 at L = 20. Every value lies above √(2/(1 + Γ^L)). Over all 2^L words with L ≤ 12, computed
    exactly, q · σ(q) is an integer ≥ 1 and q ≥ 2/(1 + Γ^L). For ε = 0.1, 0.01 and 0.001 the bound needs L ≥ 3, 5 and
    7.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The roots-of-unity dial and the dense circle of multiples of θ.
  - The best-error curves for K, K² and K⁵.
  - The geometric success bars and the abort curve.
  - The p and σ(p) bars.
  - The entropy curve on the fiber, the flow and straight paths, and the action-ratio curve.
  - The ½F² curve.
  - The DAG costs and Bellman values.
  - The −τ log Z(s) curve.
  - The conditional-expectation tree values.
  - The Fibonacci ratio dots, the entropy-rate curve and the five-mode slice bars.
  - The 1/2, 9/2, 0 bars and the imaginary-time energy curve.
  - The e_L steps and the lower-bound curve.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the NAND table and circuit, and the three environment arrows;
  - the three-site gate box and the mode cells;
  - the code cells, the address brackets and the two mirror lines;
  - the fusion-path and bit cells;
  - the chain with its defect pairs;
  - the crossed-out targets and the coin outcome cells;
  - the C_ee and C_oo block grid;
  - the legal-string cells and the two-state chain diagram;
  - the history chain and the ring of ten K gates.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese subtitles.
It also keeps brackets and leading operators from being stranded at a line break.
