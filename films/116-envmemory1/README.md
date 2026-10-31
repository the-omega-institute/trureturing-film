# 116 · AURIC ENVIRONMENT MEMORY I · SAME CHANNEL, SIX VALUES OR N BITS, AND THE ERASED HISTORY · AURIC 环境记录记忆 第一部 · 同一信道、六个值或 n 比特与被擦除的历史

This is part one of two films on AURIC environment record memory and runs about 7¼ minutes (7:12). It covers the
whole of `AURIC_FIB_ENVIRONMENT_RECORD_MEMORY.md`, §1–§28, at trureturing subject commit `4547b75a56`. Part two
covers `AURIC_FIB_ENVIRONMENT_RECORD_MEMORY_II`.

A five-level system meets a fresh qubit environment at every step, and the environment is measured. Two
measurement bases give the same averaged channel but different label records. The film follows how much of that
record must be kept to undo the channel exactly, how this depends on the measurement angle, what five levels alone
cannot simulate, what six states achieve approximately, and what survives when the history is erased.

## The film, scene by scene

- **One channel, two instruments (§1–§2, Theorem 2.2).**
  - The isometry sends e₀ ↦ u⊗f₀, e₁ ↦ u⊗f₁, e₂ ↦ v⊗(f₀ + f₁)/√2, e₃ ↦ z⊗f₁, e₄ ↦ z⊗f₀, with
    u = (e₀ + e₃)/√2, v = (e₁ + e₄)/√2 and z = e₂.
  - Measuring in the f basis gives K₀, K₁. Measuring in g₀ = c f₀ − i s f₁, g₁ = −i s f₀ + c f₁ gives
    A₀ = cK₀ + isK₁ and A₁ = isK₀ + cK₁. The cross terms cancel, so both instruments have the same channel Φ∘ on
    every complex M₅ input, with any untouched reference.
  - On the embedded qutrit R = span{u, v, z}, K_j B = B U_j/√2 and A_j B = B V_j/√2. Here U₀, U₁ are permutation
    matrices, W = U₀†U₁ is a reflection and V_j = U_j e^(iθW). Each outcome has probability ½ on R. On all of H the
    effects are diag(1, 0, ½, 0, 1) and diag(0, 1, ½, 1, 0), so fairness is asserted only on R.
- **Record criterion and six values (§3–§5, Theorems 3.3, 4.1, 5.1).**
  - Exact recovery from a classical record works if and only if every positive record value receives weight only
    from histories in one projective word class. This holds even with random compression, arbitrary CPTP decoders on
    all of H and success required only on average. The proof uses rank-one Choi extremality of the identity channel
    and the Knill–Laflamme cross terms.
  - The minimum terminal alphabet is the class count m_n, attained online with at most m_n values at every prefix.
  - In the native basis the words lie in S₃: m₀, m₁, m₂ = 1, 2, 4 and m_n = 6 for every n ≥ 3. One six-value
    register with twelve fixed transitions decodes every horizon, and six values are necessary.
- **Parity at π/6 (§6, §8–§9, Theorems 6.1, 8.2, 9.2–9.4).**
  - In the basis b₁ = (1, 0, −1), b₂ = (0, 1, −1) of ξ⊥, the scaled letters P_j = −2i V̂_j are integral over ℤ[τ],
    τ = i√3: P₀ = [[−τ, 1], [τ − 1, τ − 1]] with det 4 and P₁ = P₀Ŵ with det −4.
  - The ring map a + bτ ↦ a + b mod 2 sends both letters to E = [[1, 1], [0, 0]], with E² = E and φ(Ŵ)E ≠ E.
    Cancelling the leftmost unequal letter over ℚ(τ) and then reducing the tails rules out every collision, including
    across lengths, since φ(1 − τ) = 0. So m_n = 2ⁿ.
  - Exact recovery then needs 2ⁿ values, n fixed bits and Shannon entropy n. This holds even with random summaries
    and an independent free shared seed. The shift register r_k = 2r_(k−1) + h_k attains it.
  - Same averaged channel, different records: 1, 2, 4, 6 at θ = 0 against 1, 2, 4, 2ⁿ at θ = π/6.
- **Bounded angles (§10–§12, Theorems 10.1, 11.2, 12.1, 12.2).**
  - V_j(θ + π/2) = iV_(1−j)(θ) and V_j(−θ) is the complex conjugate. So m_n is even and π/2-periodic.
  - sup m_n < ∞ exactly when θ ∈ (π/2)ℤ, and there the counts are 1, 2, 4, 6, 6, … A finite projective group would
    make tr(rt) = −cos θ an algebraic integer whose conjugates all lie in [−1, 1]. That forces cos θ ∈ {0, ±1}.
  - At every other angle m_(n+1) > m_n and m_n ≥ n + 1. The projective closure is SO(3), and the group is not
    virtually solvable.
  - For θ/π = p/q with q > 2 the restricted group is Radin–Sadun's G(L, 3) ≅ C_L ∗ D₃ over C₂, with
    L = lcm(q, 2); at π/6 this is G(6, 3).
  - V₀⁻¹V₁ = W with W² = I, so the group is not free on its two letters even where positive words never collide.
- **Growth and the collision (§13–§16, Theorems 13.1, 14.1, 14.2, 15.1, 15.3, 16.1, 16.2).**
  - One β > 1 gives max{n + 1, βⁿ} ≤ m_n ≤ 2ⁿ at every unbounded angle. Here β = 1 + 1/(2N(2)), with N(2) from
    Breuillard's strong Tits alternative; its value is not specified.
  - m_n = 2ⁿ whenever z = i tan θ is transcendental or its primitive polynomial is even at 1. This covers every
    rational unbounded angle, for example X² + 3 at π/3, X² + 1 at π/4, X⁴ + 10X² + 5 at π/5 and 3X² + 1 at π/6.
  - At θ* = arcsin((√5 − 1)/2), whose ratio to π is irrational, a⁵b = ba⁵. The histories 100000 and 000001 collide,
    m₆ ≤ 63 and the support exponent satisfies h₀(θ*) ≤ log₂63/6 < 1.
  - The fixed-bit minimum is ⌈log₂ m_n⌉ at every angle. A uniformly finite record exists exactly at θ ∈ (π/2)ℤ,
    with bits 0, 1, 2, 3.
- **Five-level simulation (§17–§19, §22, Theorems 18.1, 18.2, 19.1).**
  - Simulating the full flagged instrument J_θ on all of M₅ with only unitaries, Lüders PVMs, coins and classical
    feedback misses by at least 4/25 in the unhalved diamond norm. This holds at every angle, for finite depth,
    almost-sure stopping and the diamond closure.
  - The witness is the normalised Choi input. The earliest nontrivial PVM has a block of rank 1 or 2, and the Schmidt
    weights (2/5, 2/5, 1/5) cap the overlap at 23/25.
  - An explicit coin-and-PVM simulator misses by exactly 1 − 1/√2, attained by ψ* = (e₀ + e₁)/2 + e₂/√2 without a
    reference. So 4/25 ≤ d* ≤ 1 − 1/√2, the same at every angle; the exact value of d* is open.
- **Smaller tasks and extra room (§20–§21, Theorems 20.1, 21.2).**
  - The outcome statistics, the averaged channel (via the PVM {H₊, H₋}, H± = (I ± F)/2, of ranks 3 and 2) and the
    encoded instrument on R are exact in the five-level menu. Φ∘(I₅) = 2|u⟩⟨u| + |v⟩⟨v| + 2|z⟩⟨z| ≠ I₅, so the
    channel is no mixture of unitaries.
  - The full task needs a pure qubit ancilla, total dimension ten, as the tensor minimum, or one extra level, total
    dimension six, as the direct-sum minimum. The six-level construction R_j Γ_j Z_θ J = J A_j returns every output
    to the embedded qutrit.
- **Six states, approximately (§23–§25, Theorem 23.2, Propositions 24.1–24.2, Corollary 25.1).**
  - Keep only the permutation state P_t ∈ S₃ (six values, twelve transitions) and apply one signed terminal unitary.
    The averaged diamond error is at most min{2, 2nδ²/3}, δ = dist(θ, (π/2)ℤ), for every reference.
  - Decoding with +d at angle −d gives error 4d + O(d²). For this fixed gauge the coefficient 2/3 is sharp.
  - At θ = π/26 with n = 10, exact recovery needs 2¹⁰ = 1024 values while six states stay within 0.1.
- **Erased history (§26, Theorem 26.2, Corollary 26.3, Proposition 26.4).**
  - After averaging the words with any full-support law, the largest commonly correctable algebra is M₃ at n = 0,
    {W}′ ≅ M₂ ⊕ ℂ at n = 1 and ℂP ⊕ ℂ(I − P), P = |ξ⟩⟨ξ|, for n ≥ 2. The decoders are id, Ad(a†) and id.
  - For n ≥ 2 the only sharp tasks with zero error are 0, I, P and I − P.
  - Without full support the answer changes: a law on two histories with relative W restores all of {W}′.
- **Task optima and scalar observations (§27–§28, Theorems 27.3–27.5, 27.7, Corollary 27.6, Theorem 28.2).**
  - With the fair law, a rank-one task E = |v⟩⟨v| has one-step error √(r(1 − r)), and this floor persists.
  - On p = 0, η_n = ½√(4qr + (|q − r| − τ)₊²) with τ = 2^(1−n). So v = e and v = (e + f)/√2 have errors (1 − τ)/2 and
    ½: 3/8 against ½ at n = 3.
  - A separable entanglement-breaking partner Ψ_n has the same marginals I/3, the same SIC norm (5 + 3τ)/36 and the
    same MUB norm 5/3 + τ as the actual Choi state. Yet the spectator task has error 0 for Fⁿ and
    2(1 − 3τ)/(7 − 3τ) for Ψ_n: 2/25 at n = 3 and 2/7 in the limit.

一部约七分钟的片子，AURIC 环境记录记忆的第一部：同一扩张在两组基里测量，平均信道完全相同，但精确恢复所需的记录不同——原生基下永远只需六个值，转过 π/6 时由 ℤ[i√3] 上的模二奇偶性区分所有词，需要 2ⁿ 个值、n 比特；类数有界恰在 π/2 的整数倍，其余角度严格增长，有理角处恰为 2ⁿ，而在无理角 θ* 处出现碰撞；只用五个能级模拟完整的带标记仪器至少差 4/25，显式模拟器差 1 − 1/√2，最优值未定，多一个能级或一个量子比特即可精确；六个状态的近似恢复误差至多 2nδ²/3；擦除历史后两步起只剩旁观者任务，任务最优值依赖方向，相同的标量观测也不能决定任务最优值。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-116-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the volume has no digestion records: there is no
    `Meta/Digestion/backfill/auric-fib-environment-record-memory/` directory, so it has not been ingested.
  - No Lean declaration covers any statement shown, and every result of the volume is badged as theory.
- **Published results, used as external inputs.** The angle, growth and finale scenes badge them as published.
  - Radin–Sadun, *Subgroups of SO(3) Associated with Tilings*, J. Algebra 202 (1998) 611–633,
    DOI 10.1006/jabr.1997.7320, Theorem 1(ii) and Corollary 2.
  - Breuillard, *A Strong Tits Alternative*, arXiv:0804.1395v1, Theorem 1.1.
  - Error-correction criteria: Knill–Laflamme (quant-ph/9604034), Gregoratti–Werner (quant-ph/0209025,
    quant-ph/0403092) and Bény–Kempf–Kribs (arXiv:0705.1574).
  - Cited as precedent or context in the volume: Khandelwal–Tavakoli (arXiv:2503.00956), Leppäjärvi–Sedlák
    (arXiv:2010.15816), Terhal–Horodecki (quant-ph/9911117), Wang–Ying (quant-ph/0608235), Oszmaniec–Guerini–Wittek–
    Acín (arXiv:1609.06139), Sau–Sedlák (arXiv:2512.14588), Glynn–Meyn (Poisson equation), Campbell
    (arXiv:1612.02689), Horodecki–Shor–Ruskai (DOI 10.1142/S0129055X03001709), Scott (DOI
    10.1088/0305-4470/39/43/009), Shang et al. (DOI 10.1103/PhysRevA.98.022309) and Tavakoli–Morelli (DOI
    10.1103/PhysRevA.110.062417).
- **Classical tools named in the volume.**
  - Rank-one Choi extremality of the identity channel.
  - Singular-value and Schmidt truncation.
  - Algebraic integers, Gauss's lemma and Bézout's identity.
  - The inverse function theorem on SO(3).
  - The Duhamel and symmetric Taylor formulas.
  - Tonelli's theorem.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the five-window matrices and channel of *AURIC FIB five-window quantum memory* §17–§21, and its restricted
    polynomial F(F − I)(F + I/2) = 0 used in §27;
  - the one-step measured-flag inverse of *Minimal record dilations*, Theorem 2.2;
  - the permutation commutant of *Half-Gram classification* §6;
  - the task-effect interface, SIC/MUB frame norms and separable partners of *Actual word purity arithmetic* §86,
    §89 and §92;
  - the conditional CP bookkeeping of *Approximate online recovery memory*, Theorem 8.4.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script runs 240 checks. Diamond norms and task optima are
  solved as semidefinite programs with cvxpy and Clarabel; word counts at small or irrational angles use 60-digit
  arithmetic.
  - **Two instruments.**
    - The isometry and the displayed K₀, K₁ are recomputed.
    - Full-channel equality holds on random complex inputs with a three-dimensional reference at θ = π/6, 0.37
      and 2.1.
    - V_j = U_j e^(iθW), B†A_j†A_j B = I/2, the population law and Φ∘(I₅) all hold.
  - **Native basis.**
    - The counts are 1, 2, 4, 6, 6, … for n ≤ 12, and the length-three table matches.
    - The six-value register decodes 20 random histories of lengths 3–59 exactly.
  - **Parity at π/6.**
    - The eigenvalues of iV₀ on ξ⊥ are (1 ± i√15)/4, with ρ + 1/ρ = −7/4, and [W, V₀ᵈ] ≠ 0 for d ≤ 39.
    - Exact ℤ[i√3] arithmetic gives P₀, P₁, determinants ±4, the residue E, and 2ⁿ distinct integral products for
      every n ≤ 12.
    - There are no cross-length collisions up to length 7, and all 2047 qutrit words of length ≤ 10 are pairwise
      projectively distinct.
  - **Angles.**
    - d = R_z(π/3) and r = R_y(2π/3), of orders 6 and 3, satisfy the forward and reverse relations.
    - V₀⁻¹V₁ = W and W² = I.
    - The symmetries hold, m_n is even, the counts are 1, 2, 4, 6, 6, … at kπ/2 for k = −2 … 4, and
      tr(rt) = −cos θ.
  - **Growth.**
    - For q = 3 … 30 the primitive part of F_q is irreducible, vanishes at i tan(π/q) and is even at 1.
    - The counts are 2ⁿ for n ≤ 11 at π/3, π/4, π/5, π/7, π/8 and π/12, and (60 digits) for n ≤ 10 at θ = 0.05
      and θ = 1.
    - a⁵b = ba⁵ holds symbolically at θ*.
    - The 60-digit counts at θ* are 1, 2, 4, 8, 16, 32, 62, 118, 224, 424, 798 for n = 0 … 10. The class entropy at
      n = 6 is 5.9375 < 6.
  - **Simulation.**
    - The spectra (1, 1, ½, 0, 0), Schmidt weights (2/5, 2/5, 1/5) and constants η_r = 2/5, 4/5, 1 hold.
    - 1500 random adaptive PVM trees give witness overlaps at most 0.231, and the explicit simulator gives 0.9063;
      both are below 23/25.
    - The explicit simulator has SDP diamond distance 0.292893 = 1 − 1/√2 at θ = 0 and θ = π/6, and ψ* attains it.
  - **Extra room.**
    - The PVM {H₊, H₋} realization of Φ∘ is exact on complex inputs.
    - Z₀ is unitary, and R_j Γ_j Z_θ J = J A_j holds at three angles.
  - **Six states.**
    - The enumeration over histories equals the six-state recursion.
    - The SDP errors lie below 2nδ²/3: for η = 0.15 they run from 0.0150 at n = 1 to 0.3159 at n = 24.
    - Recovery is exact at the bounded angles.
    - The Proposition 24.2 identity and bounds hold, and the wrong-sign error divided by d tends to 4.0000.
    - For n = 10 and ε = 0.1 the corollary gives q = 26. The count m₁₀(π/26) = 1024 (60 digits), and the six-state
      error is 0.0939, below the bound 0.0973.
  - **Erased history.**
    - The commutant dimensions are 9, 5, 2, 2, 2, 2 for n = 0 … 5 at four angles.
    - The support examples give 9, 5 and 2.
    - The (26.16) entries at π/6 are −√3/4 ∓ 3i/4.
  - **Tasks.**
    - The SDP optima match the one-step value and floor, the p = 0 and q = 0 formulas (n ≤ 6) and the n = 2 curve
      with the value 2/5 at r = 4/5.
    - They also match 3/8 against ½ at n = 3, the large-n limits, the complement symmetry and the value ½ at r = ½.
  - **Scalar observations.**
    - The actual channel has spectator error 0 and the partner has 2(1 − 3τ)/(7 − 3τ) for n = 3 … 10 and ∞.
    - The marginals, SIC norms and MUB norms agree for random local Hesse-SIC and MUB frames at n = 3, 4, 6 and ∞.
    - The actual Choi states are NPT.
  - These are sampled and finite checks, not proofs of the general statements. No claim of the volume failed a check.
    The computed m₆(θ*) = 62 is consistent with the stated bound m₆ ≤ 63.
- **Data drawn on screen.**
  - The native count bars.
  - The log₂ count curves at θ = 0 and π/6.
  - The rate dots at θ*.
  - The random-tree and explicit-simulator overlap dots.
  - The diamond-error dots with their bound line.
  - The orientation curves.
  - The partner error bars.
- **Illustrative visuals.** These are illustrations, not data:
  - the level ladder, dials and label tape;
  - the qutrit triangle with permutation arrows;
  - the history-to-record arrows (the actual length-three classes);
  - the unit circle and the SO(3) sphere;
  - the protocol and simulator diagrams;
  - the tensor and direct-sum cells;
  - the 1024-cell grid and six state cells;
  - the algebra grids;
  - the ξ circle.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
