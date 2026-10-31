# 090 · AURIC V19–V20 · ARITHMETIC SPECTRA AND GOLDEN SELECTOR GATES · AURIC V19–V20 · 算术谱与黄金选择门

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:28). It covers two volumes at subject
commit `a6ed97ef09`:
- `AURIC_SUM_PRODUCT_LOGARITHMS_AND_ARITHMETIC_SPECTRA_V19.md`, §2–§11;
- `AURIC_GOLDEN_SELECTOR_GATES_RECURSIVE_COMPILATION_AND_VARIATIONAL_PRINCIPLES_V20.md`, §2–§12.

Version nineteen asks how sums, products, logarithms and squares reach the Riemann hypothesis. It gives exact
restatements and two sufficient conditions, and it does not prove the hypothesis. Version twenty returns to the fixed
golden gate, builds phase-fixed blocks and a two-port selector gate, and compiles error-cancelling words with the same
alphabet.

## The film, scene by scene

- **Hidden log charge (V19 §2).**
  - Give the five modes (000, 100, 010, 001, 101) the values w = (1, 2, 3, 5, 7) and read L_w(p) = Σ p_s log w_s.
  - On the fiber p_κ = (R − X − Y + κ, X − κ, Z, Y − κ, κ), where the visible means X, Y, Z are fixed,
    L_w(p_κ) = const + κ log(w₀w₁₃/w₁w₃). The readout depends only on (X, Y, Z) exactly when w₀w₁₃ = w₁w₃
    (Theorem 2.2, eq. 1). Here the slope is log(7/10).
  - Adding the blocks gives [2 + 5] = 7 and multiplying gives [2][5] = 10. For integer counts,
    n = 2^(u−k) 3^v 5^(w−k) 7^k and log n = u log 2 + v log 3 + w log 5 − k log(10/7) (eq. 2). The two completions of
    (u, v, w) = (1, 0, 1) are 10 and 7.
- **Euler, Gibbs, Robin (V19 §3–§4).**
  - Dirichlet convolution multiplies series and adds log-lengths (Theorem 3.2). Euler's product and the von Mangoldt
    expansion hold for Re s > 1 (Theorem 3.3).
  - Under Pr_σ(N = n) = n^(−σ)/ζ(σ), σ > 1, the prime exponents are independent geometric variables. Their law is
    Pr(ν_p = k) = (1 − p^(−σ)) p^(−σk). Also Var_σ(log N) = Σ_p (log p)² p^σ/(p^σ − 1)² > 0 and
    D(q ‖ Pr_σ) = −H(q) + σ E_q log N + log ζ(σ) ≥ 0 (Theorem 3.4). None of this needs RH.
  - σ(n)/n = Σ_(d|n) 1/d is the Haar average of |A_n|² for independent prime phases (Theorem 4.2, eq. 6). For n = 6
    this is 2; with one shared phase it is 2 + 2/√6.
  - Robin's criterion (eq. 7) says RH holds exactly when σ(n)/n < e^γ log log n for all n > 5040. It is a cited
    published input.
- **Squares and one half (V19 §6–§7).**
  - Prime characters χ_n are orthonormal, so ‖Σ_(n≤N) n^(−a) χ_n‖² = Σ_(n≤N) n^(−2a). The L² limit exists exactly when
    a > 1/2, with ‖F_a‖² = ζ(2a) (Theorem 6.2, eq. 11).
  - A square average does not control a point value: g_N has norm 1 while g_N(z₀) = √N (Proposition 6.3).
  - With H|n⟩ = (log n)|n⟩, the pointer overlap is ⟨ψ_σ|W_t|ψ_σ⟩ = ζ(σ + it)/ζ(σ). Its modulus lies between
    ζ(2σ)/ζ(σ)² and 1, which is 2/5 at σ = 2 (Theorem 7.2, eq. 12).
  - Amplitudes n^(−a) give ζ(2a + it)/ζ(2a), not ζ(a + it). Legal states need a > 1/2, so this pointer reads Re s = 2a > 1
    (Theorem 7.3, eq. 13).
- **Cayley circle (V19 §8–§9).**
  - z_ρ = 1 − 1/ρ satisfies |z_ρ|² − 1 = (1 − 2 Re ρ)/|ρ|². So |z_ρ| = 1 exactly when Re ρ = 1/2 (Theorem 8.2, eq. 14).
  - Symmetry and positivity are not enough. Take F(s) = ((u − b)² + c²)((u + b)² + c²) with u = s − 1/2. It satisfies
    F(s) = F(1 − s) and is positive on ℝ, yet its zeros 1/2 ± b ± ic are off the line (Proposition 8.3).
  - Encode z on the joint mode: |Ψ_z⟩ ∝ |0⟩ + |1⟩ + √λ|2⟩ + |3⟩ + z|13⟩. Then η = log(p₀p₁₃/p₁p₃) = 2 log|z| and
    Rκ − XY = (1 − 2 Re ρ)/(|ρ|² D²). So Re ρ = 1/2 ⟺ η = 0 ⟺ κ = XY/R.
  - On the middle-bit-zero branch the concurrence is 2|z − 1|/(3 + |z|²), which equals 1/√(1 + 4t²) on the critical
    line (Theorem 9.2, eqs. 15–17).
  - ρ is an input, so off-line points encode equally well. The encoding restates the question; it does not locate the
    zeros.
- **Finite spectra (V19 §5, §10).**
  - Operator-weighted closed paths obey det(I − uT)⁻¹ = Π_[c] det(I − w_c u^ℓ(c) U_c)⁻¹ (Theorem 5.3, eqs. 9–10).
  - On the Fibonacci graph B = [[1, 1], [1, 0]], every primitive-loop factor has its poles on the unit circle. The
    product 1/(1 − u − u²) has its poles at φ⁻¹ and −φ (Corollary 5.4).
  - Recursive gates factor: det(I − uC_P(W)) = (1 − u)^(m(d−q)) D_W(u)^q and
    det(I − uL_P(W)) = D_W(u)^(d−q) D_(W²)(u)^q (Theorem 10.2, eqs. 18–19).
  - From ω = e^(3πi/5), the controlled lift keeps the spectrum {1, ω}. The squaring lift reaches
    {ω, ω², ω⁴, ω⁸, ω⁶} and stops. A finite phase set cannot hold the infinitely many distinct zeros (Corollary 10.3).
  - Finitely many fixed edge lengths cannot give every prime a loop of length log p (Proposition 10.4).
- **Two sufficient conditions (V19 §11).**
  - Let F_N(s) = g_N(s) det((s − 1/2)I − iH_N), with H_N self-adjoint and g_N nowhere zero. If F_N → ξ uniformly on
    compact sets, then RH holds (Theorem 11.1, via Hurwitz/Rouché).
  - Small gate errors are not enough: U_N = e^(i/N) I_N tends to I while det U_N = e^i (Proposition 11.2).
  - If |M(x)| ≤ C_ε x^(1/2 + ε) for every ε > 0, then RH holds (Theorem 11.4). Neither premise is proved.
- **Phase-fixed blocks (V20 §2–§3).**
  - On the code J|q⟩ = |1 0 q 0 1 0⟩, the native gate at two addresses gives A = ω[I + (ω − 1)P] and B = ω[I + (ω − 1)Q].
    Here Tr PQ = φ⁻², A¹⁰ = B¹⁰ = I and det A = det B = ω³.
  - D = A⁻¹B = A⁹B and E = BA⁻¹ = BA⁹ take ten native calls each and have determinant 1 (Definition 3.1).
  - Tr D = φ⁻², and its conjugate φ² exceeds 2, so D has infinite order. D and E do not commute. The closure of
    ⟨D, E⟩ is SU(2) (Theorem 3.2).
  - The closure of ⟨A, B⟩ is G₁₀ = {det ∈ μ₁₀}, with dist(U, G₁₀) = 2 sin(δ(U)/4). For T = diag(1, e^(iπ/4)) this
    distance is 2 sin(π/80) (Corollary 3.3).
- **Golden selector gate (V20 §4).**
  - G = |0⟩⟨0| ⊗ A + |1⟩⟨1| ⊗ B = ω[I + (ω − 1)Π], with G¹⁰ = I.
  - Assume calls on any ordered pair and computational-basis helper bits. Then finite G circuits are dense in
    PU(2ⁿ) for every n (Theorem 4.2).
  - G|+⟩|1⟩ has concurrence φ^(−1/2) (Proposition 4.3).
  - The table 00 → 100, 01 → 101, 10 → 000, 11 → 010 gives KJ₂ = J₂G, and mode 001 has eigenvalue ω. This encoding
    cannot be written as a product over physical wires, so global wiring is a separate task (Theorem 4.4).
- **Recursive compiler (V20 §5).**
  - Any Δ ∈ SU(2) with d = ‖Δ − I‖ is exactly a group commutator [V, W] with ‖V − I‖, ‖W − I‖ ≤ √d (Lemma 5.1).
  - ‖[V, W] − [Ṽ, W̃]‖ ≤ 4rε + 2ε² (Lemma 5.2).
  - U_n = V_(n−1) W_(n−1) V_(n−1)† W_(n−1)† U_(n−1) gives ε_n ≤ 6ε_(n−1)^(3/2) ≤ (36ε₀)^((3/2)ⁿ)/36 for ε₀ < 1/36. Also
    L_n ≤ 5ⁿ L₀ and C(ε) = O(log^c(1/ε)) with c = log 5/log(3/2) (Theorem 5.3, eqs. 4–5).
  - Real gate errors add Σ δ_j (Proposition 5.4).
- **Action and Bellman (V20 §6–§8).**
  - min_X S_w = ‖V − U_w‖_F²/(L + 1) (Theorem 6.2). Padding with K¹⁰ = I sends the raw action to zero, so the factor
    L + 1 is needed (Corollary 6.3).
  - With positive costs, F_η(R) = min{b(R), min_g [η c_g + F_η(g†R)]} has a unique solution in [0, 4], and the
    optimum is attained by a word with C(w) ≤ 4/η (Theorem 7.2).
  - Universality is the same as F_η → 0 (Theorem 7.3). With zero cost, F ≡ 0 solves the equation even for the menu {I}
    (Proposition 7.4).
  - As η ↓ 0, optimal cost grows without bound while η C_η → 0 (Theorem 8.1). For iX there is a lower bound with
    Γ = φ³ + √(φ⁶ − 1) < 9 (Theorem 8.2).
- **Programs and records (V20 §9–§12).**
  - An ε-close encoded NAND errs with probability at most ε² (Proposition 9.1).
  - Discarding the program register gives a unitary channel exactly when all weighted U_w agree up to phase
    (Proposition 10.2). A fixed finite processor cannot store every gate exactly (Theorem 10.3, Nielsen–Chuang).
  - R(π) = 1 − max_U ⟨u|M_π|u⟩ ≥ 1 − λ_max(M_π) (Theorem 11.2). For I or iX at equal odds the risk is 1/2. Records
    lower the average risk (Proposition 11.3).
  - Under an average cost budget, some optimal random compilation uses at most two words (Proposition 12.1).

一部约七分半钟的片子，延续 AURIC 版本系列。第十九版：五模式纤维上的平均对数读出带有隐藏荷 log(7/10)；Euler 积与 Dirichlet–Gibbs 律把素数指数变成独立几何变量；σ(n)/n 是素数相位平方的平均，Robin 判据把黎曼猜想写成这些平均的一个统一上界；平方可积的阈值恰为 1/2，但平方平均不控制点值，Born 平方还会把指数加倍；Cayley 变量把临界线变成单位圆，五模式编码把它变成经典关联为零而纠缠仍在；闭路积与递归门只给出有限谱；最后给出两个足以推出黎曼猜想的条件定理，前提均未证明。第二十版：同一黄金门的两个地址给出行列式为一、在 SU(2) 中稠密的组合块；两端口黄金选择门在明确的接线条件下近似普适并产生纠缠；交换子递归给出 εₙ₊₁ ≤ 6εₙ^(3/2) 的编译；作用量须按 L + 1 归一，正成本 Bellman 方程有唯一解；丢弃程序、目标不确定与预算限制分别给出可学内容的界限。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-090-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit, the V19 volume has 77 digestion atoms and the V20 volume has 49. All of them are
    residual-open.
  - No Lean declaration covers any statement shown, and every theory badge says so.
- **Published results, used as external inputs.**
  - Robin's criterion: G. Robin, J. Math. Pures Appl. 63 (1984), 187–213. The volume checks the statement in
    Choie–Lichiardopol–Moree–Solé, arXiv:math/0604314.
  - The Solovay–Kitaev recursion: Dawson–Nielsen, arXiv:quant-ph/0505030. The constants for the golden alphabet are
    argued in V20.
  - The no-programming theorem: Nielsen–Chuang, arXiv:quant-ph/9703032.
  - Background cited in the volumes but not used on screen:
    - the Dirichlet Hilbert space (Hedenmalm–Lindqvist–Seip, arXiv:math/9512211);
    - closed-orbit zeta functions (Bowen–Lanford, 1970);
    - zero counting (Hasanalizade–Shen–Wong, arXiv:2107.06506);
    - Fibonacci braid density (Freedman–Larsen–Wang, arXiv:math/0103200);
    - the universal two-bit gate (Barenco, arXiv:quant-ph/9505016).
- **Classical tools named in the volumes.**
  - Euler's product, the von Mangoldt expansion and Möbius inversion (DLMF §25.2, §27.4).
  - The completed function ξ (DLMF §25.4, §25.10).
  - Hurwitz's and Rouché's theorems.
  - The Riemann–von Mangoldt count, Parseval, Bellman recursion and Cauchy–Schwarz.
- **Project inputs, not recomputed here.**
  - The fixed golden gate K and its arithmetic barrier (V15).
  - The parity bound q ≥ 2/(1 + Γ^L) behind the iX lower bound (V16).
  - The controlled lifts C_P and L_P (V18).
  - The stopped-mean frontier volume that motivates Proposition 12.1.
- **Theory volumes, argued but not kernel-checked.** Every other statement in the film carries the theory badge.
  Both volumes state plainly that they do not prove the Riemann hypothesis.
- **Recomputed for this film.** An independent Python script runs 259 checks. These are sampled and finite checks,
  not proofs.
  - **Charge.** Eq. (1) was checked symbolically. The slope along the fiber X = 0.3, Y = 0.4, Z = 0.1 is
    log 0.7 = −0.35667, and it is flat when w₁₃ = 10. Eq. (2) holds, and (1, 0, 1) gives 10 and 7.
  - **Gibbs.** Pr₂(N = 1) = 6/π² = 0.6079 and E₂ log N = 0.5700. Var₂ log N = 0.8845 from both the derivative and the
    prime series. Independent geometric exponents were checked to 2 × 10⁻⁵, and the relative-entropy identity holds.
  - **Robin.** The Parseval identity was checked on a torus grid. n = 6 gives 2 and 2.8165. For 3 ≤ n ≤ 10⁶ there are
    26 exceptions to Robin's inequality, all at most 5040 (σ(5040)/5040 = 3.8381 > 3.8169). The largest ratio on
    5040 < n ≤ 10⁶ is 0.98582. The defect identity (Proposition 4.3) holds on five integers.
  - **Squares.** Partial sums tend to ζ(1.5) = 2.6124. g_N has norm 1 and value √12 = 3.4641 on primes up to 12.
  - **Pointer.** ζ(4)/ζ(2)² = 2/5 exactly, and the sampled minimum of |ζ(2 + it)|/ζ(2) on 0 ≤ t ≤ 60 is 0.4192. The
    Pythagorean identity holds, and the doubling overlap matches ζ(2a + it)/ζ(2a).
  - **Cayley.** The ten lowest zeta zeros map to |z| = 1 within 10⁻¹², with arg z = 2 arctan(1/2t) (4.05° for the
    lowest zero). The four off-line zeros of F, the roots −φ² and −φ⁻² of 1 + 3z + z², eqs. (15)–(17), and the concurrence
    0.03535 at t = 14.1347 were all checked.
  - **Spectra.**
    - The trace formula and the primitive-loop product match 1/(1 − u − u²) to order 20, with primitive counts
      1, 1, 1, 1, 2, 2, 4, 5, 8, 11.
    - Eqs. (18)–(19) hold for random gates.
    - Five levels of nested matrices give the spectra {1, ω} and {ω, ω², ω⁴, ω⁸, ω⁶}.
    - The artificial line count is 163 against dLT/2π = 162.3.
  - **Conditions.** det(e^(i/7) I₇) = e^i and ξ(−1) = ξ(2) were checked. For 2 ≤ x ≤ 10⁵, max |M(x)|/√x = 0.894
    (at x = 5).
  - **Gate.** K is unitary with K¹⁰ = I, and both addresses keep the code. The braid identity holds. Tr D = φ⁻² =
    0.381966, D has no finite order up to 2000, and Lie(D, E) = su(2).
  - **Density and phase.** The sampled covering radius of reduced words of length ≤ 10 (118,097 words, 3000 Haar
    targets) is 0.0775. The distance from T to G₁₀ is 2 sin(π/80) = 0.07852, also found by numerical minimisation.
  - **Selector.** G¹⁰ = I, and G|+⟩|1⟩ has concurrence 0.78615. Local su(2) plus G gives su(4) (dimension 15).
    KJ₂ = J₂G holds, and all six wire splits fail.
  - **Compiler.**
    - Lemma 5.1 was checked on 40 random targets and Lemma 5.2 on 300 cases (max ratio 0.714).
    - The closed form for ε_n holds, and c = 3.9694.
    - An actual run on 60 random targets used the length-≤ 10 net (sampled radius 0.078, above the 1/36 premise). Its
      maximum errors were 0.0582, 0.0280, 0.0057 and 0.00038 at levels 0–3, with words of at most 10·5ⁿ letters.
  - **Action and Bellman.**
    - min S = ‖V − U_w‖_F²/(L + 1) was checked by least squares. (L + 1) min S = 4.357 for 0–6 paddings.
    - The Bellman equation and the C ≤ 4/η bound were checked by exhaustive enumeration of words of length ≤ 8.
      Monotone cost and error and a concave F_η hold along the η path.
    - Γ = 8.3524.
  - **Records.**
    - NAND error/ε² ≤ 0.765 on 200 near gates.
    - Choi ranks are 1 and 2.
    - For I or iX at equal odds, the risk is 1/2.
    - Average posterior risk 0.383 ≤ prior risk 0.475.
    - Two-word LP optima were found at five budgets.
- **Data drawn on screen.**
  - The log-readout lines along the fiber.
  - The Pr₂(N = n) bars and the two n = 6 bars.
  - Robin record points with the e^γ log log n curve.
  - Partial sums of n^(−2a), and the |ζ(2 + it)|/ζ(2) curve.
  - The ten zeros on the critical line, the Cayley circle and the zoom.
  - The concurrence points and the primitive-loop counts.
  - The C and L spectra, the Mertens band, and the covering-radius curves.
  - The SK bound curves with the run points.
  - The padded-action bars, the Bellman path and the two-word frontier.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the off-line point ρ = 0.95 + 0.8i;
  - the Fibonacci graph and the gate-address diagram;
  - the circuit and register sketches;
  - the commutator square and the chain diagram;
  - the U_N and ±√x curves drawn from their formulas;
  - the Choi rank bars.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
