# 121 · AURIC ERASED-HISTORY RECOVERY I · SHARP TERMINAL DECODERS AND THE EXACT SECOND HORIZON · AURIC 擦除历史的终端恢复 第一部 · 锐利终端解码器与精确的二步时域

This is part one of the two-part series AURIC ERASED-HISTORY RECOVERY and runs about 7¼ minutes (7:22). It covers
`AURIC_FIB_ACTUAL_ERASED_HISTORY_TERMINAL_RECOVERY.md`, §93–§134, at trureturing subject commit `b9087e5194`. Part two
will cover `AURIC_FIB_ACTUAL_ERASED_HISTORY_TERMINAL_RECOVERY_II.md`.

A qutrit passes through the actual fair chronological channel and the history is erased. One terminal CPTP decoder per
horizon tries to return the unknown input. The film follows the volume from the exact diamond-norm values with an
untouched reference, through restricted and task-wise versions, to the problem without a reference, which is solved
exactly at horizon two and to first order near the limit.

## The film, scene by scene

- **The channel (§93).**
  - In the basis ξ, e, f, W = diag(1, 1, −1) and U₀ = 1 ⊕ [[−1/2, √3/2], [√3/2, 1/2]]. The n-step channel is
    Fⁿ = Ad(U₀) ∘ Φ_s with s = (−1/2)ⁿ⁻¹ (93.5).
  - Φ_s keeps x₀₀, multiplies x₀₁ and x₁₀ by s, erases the other coherences and mixes the two lower populations with
    a = (1 + s)/2, b = (1 − s)/2. Φ_s is CPTP exactly for −1/2 ≤ s ≤ 1 (Lemma 105.2). The limit Φ₀ is
    measure-and-prepare and invariant under U₀ (93.7).
  - The error of a decoder is δ_n = min_D ½‖D ∘ Fⁿ − id‖◇, with every finite untouched reference (93.8).
  - That a Kraus list with Σ K†K = I defines a channel is the frozen general Lean theorem
    `finite_kraus_quantum_channel`. The decoders are written as such lists, for example the family R(r, z, σ) of
    Definition 94.1.
- **Sharp values (Theorem 94.2).**
  - η_n = 1 − δ_n is 1 at n = 0, (1 + s)(1 + 2s)/(5 + 7s) at odd n, 3/H(r*) at n = 2, h²(h² + 3)/K(h) at even n ≥ 4
    and 1/5 in the limit. So δ₁ = 1/2, δ₃ = 13/18 and δ_n → 4/5 (94.9).
  - δ_n is nondecreasing in n (Lemma 110.1). At odd horizons the optimal decoder is Ad(U₀†); the decoders for the
    other horizons are listed in (94.6).
- **Certificates (§95–§96, §99–§100).**
  - A weighted entangled probe |ψ_p⟩ = Σ √p_i |i⟩|i⟩ gives ½‖RΦ_s − id‖◇ ≥ 1 − η for every decoder (95.3–95.4).
  - For the proposed decoder, M p = η1 on the recovered Choi block gives C = η id + (1 − η)E with E CPTP (95.7–95.10).
  - The probes are (1, 2, 3)/6 at n = 1 and (1, 2, 2)/5 in the limit. At n = 1 the unweighted maximally entangled
    probe gives only √2/3 < 1/2 (Proposition 100.1).
- **Horizon two and later even horizons (§97–§98).**
  - r* is the unique root in (3/10, 1/3) of (2 − r)(1 − r²)² = 4r, the quintic r⁵ − 2r⁴ − 2r³ + 4r² + 5r − 2 = 0, with
    g(3/10) = 20777/100000 and g(1/3) = −4/243. δ₂ = 1 − 3/H(r*) = 0.708107 with H(r) = 7 + r² − 4r + 4/(1 − r²).
    The square certificate is L_s(p; u, v) − η = A(u − r*)² + Bv with A, B < 0 (97.7).
  - For even n ≥ 4, h = √((1 + t)/(1 − t)) with t = 2¹⁻ⁿ. The Kraus parameters r and z of (94.6) are legal because
    S(h) = h(1 + h²)² − (h² − 1)(h² + 3)² ≥ 17/49 (98.4–98.6). In the limit r → 1/4 and z → 1/16.
- **Unital decoders (Theorem 102.2).**
  - With D(I) = I imposed, the value is unchanged at n = 0, at odd n and in the limit.
  - At every finite even horizon it is strictly larger, so every optimal decoder there is nonunital. At n = 2
    saturation forces z = 0 while unitality needs z = r*²; for n ≥ 4 a positive matrix would have to annihilate the
    probe (102.10–102.12).
- **Rank-one tasks (§103–§104).**
  - e_E(R; s) = ‖Φ_s†(R†(E)) − E‖_op. For P₀, P₂ and Q = ½(|0⟩ + |2⟩)(⟨0| + ⟨2|) the individual optima are 0,
    (1 − |s|)/2 and 1/2 (Proposition 103.1).
  - A common decoder attains every rank-one optimum exactly at n = 0 and n = 1 (Proposition 103.2, Theorem 104.2).
  - From n = 2 on and in the limit the triple regret is Γ_T ≥ 1/250 (Theorem 104.1), while every pair has a common
    attainer.
- **No reference (§105–§107, §110).**
  - μ_n = min_D max_ρ ½‖DFⁿ(ρ) − ρ‖₁ over all complex qutrit densities (105.1).
  - Fourier guessing G(s) = 1/3 + 2|s|/9 (Theorem 106.1) and the orthogonal pair (|0⟩ ± |2⟩)/√2 with one output give
    μ(s) ≥ max{1/2, 2/3 − 2|s|/9} (Theorem 106.2).
  - μ₀ = 0, μ₁ = 1/2 and μ_∞ = 2/3 (Proposition 107.2). The identity decoder has error 2/3 − s/6 for 0 ≤ s ≤ 1.
  - δ_n − μ_n ≥ δ₂ − 2/3 > 2/87 for n ≥ 2, and the gap tends to 2/15 (Theorem 110.2).
- **Phase orbit (§112–§114).**
  - On the whole orbit of uniform-modulus states the minimax is ν(s) = F(q) = (1 − q + √((1 − q)² + 8))/6 with q = |s|,
    attained by A_ε with Kraus operators E₀₀ + εE₁₁ and E₂₂ (Theorem 113.1).
  - Hence μ(s) ≥ max{1/2, F(q)}, strictly above the Fourier bound for s ≠ 0 (Corollary 114.1). This gives
    μ₂ ∈ [(1 + √33)/12, 2/3] and μ₃ ∈ [(3 + √137)/24, 5/8] (114.4).
  - A₋₁ has error 3/4 on E₁₁ at s = −1/2, so the orbit optimum does not solve the full problem (Proposition 114.3).
- **Zero optimizers (§115–§117).**
  - In the limit the optimal decoders, without any covariance assumption, are exactly the unital R with
    R(E₀₀) = diag(v, (1 − v)/2, (1 − v)/2), 1/3 ≤ v ≤ 1 (Theorem 115.1). For v > 1/3 the worst pure inputs are exactly
    those with |z₀|² = 1/3.
  - The set is convex but not a face of the channel set: the replacers with τ₊ = diag(1/2, 1/6, 1/3) and
    τ₋ = diag(1/6, 1/2, 1/3) are outside it, and their average is the I/3 replacer (Proposition 116.3).
  - Every accumulation point of optimal finite-horizon decoders lies in this set (Theorem 117.1, Corollary 117.2).
- **Exact second horizon (§118–§125).**
  - μ₂ = μ(−1/2) = L* = 0.606446991399069890053…, the L-coordinate of the unique zero of eleven rational polynomials in
    the box of radius 10⁻²⁰ around an explicit rational centre (Theorem 118.2, Lemma 120.1).
  - The five-Kraus decoder R* has error at most L* on every density input and reaches it on two contact orbits
    (Proposition 122.2).
  - Twelve physical test states, weighted λ_e = 0.340584 on three edge states and λ_i = 0.659416 on nine interior
    states, bound every CPTP decoder from below by b_test − Tr Y = L* (Theorem 125.1).
- **Fixed decoder and first-order slope (§127–§129, §133–§134).**
  - R_fam = Φ_(−1/2) satisfies Φ_(−1/2) ∘ Φ_(−q) = Φ_(q/2), so its error is exactly 2/3 − q/12 for 0 ≤ q ≤ 1/2
    (Lemma 127.1, Theorem 128.1). Hence F(q_n) ≤ μ_n ≤ 2/3 − q_n/12 at every even horizon (Corollary 129.1).
  - No decoder in the zero-optimal set does better at any q (Theorem 134.1).
  - Moving nonunital decoders give μ(−q) = 2/3 − (√2/9)q + o(q), and this coefficient is matched by a lower bound for
    every decoder (Theorem 133.6). The fixed limiting map has coefficient 0, the best fixed map in the zero-optimal set
    has 1/12, and the phase-orbit bound caps the coefficient at 2/9 (Corollary 134.2).

Not narrated: the scope and correspondence sections §101, §111 and §126; the explicit tail coefficient
(√33 − 1)/72 of §109; the no-reference monotonicity μ_n ≤ μ_(n+1) of §130; and the fixed-family coefficient
optimisation and coefficient interval of §131–§132, where the film states the §133–§134 results instead.

一部约七分钟的片子，AURIC 擦除历史的终端恢复系列第一部：擦除历史的公平按时序信道在固定基下是约化映射 Φ_s 接旋转 U₀，s = (−1/2)ⁿ⁻¹；每个时域一个终端 CPTP 解码器，以带参考系的半钻石距离计分，定理 94.2 给出全部精确值（δ₁ = 1/2，δ₃ = 13/18，时域二由五次方程的根 r* 给出 0.7081，极限 4/5），并由带权纠缠探针与 Choi 块 M p = η1 两份证书夹住；偶数时域的最优解码器必不保持单位；三个秩一任务从时域二起无法共同达到最优（差距 ≥ 1/250）；去掉参考系后，傅里叶猜测、相位轨道的精确值 F(q) 与极限处零最优集 Z₀ 给出界与结构，时域二的精确值 L* = 0.606446991399… 由十一元多项式系统的唯一根和十二个检验态证书确定；最后，Φ_(−1/2) 本身作为固定解码器给出 2/3 − q/12，而不受限的一阶系数为 √2/9。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-121-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean and digestion status.** At the subject commit the volume has 101 atoms in the digestion ledger: 7
  absorbed-closed, 4 nonpropositional-inapplicable and 90 residual-open.
  - The 7 closed atoms are covered by three frozen general declarations whose state files exist at the subject
    commit: `D5.S3.Quantum.Foundation.FiniteKrausChannel.finite_kraus_quantum_channel` (Definition 94.1 and
    Lemmas 108.1, 127.1 and 133.4), `D5.S3.Quantum.Foundation.FiniteTraceDistance.traceNorm_sub_orthogonal` (the
    trace-norm steps of Propositions 100.1 and 114.3) and `D5.S3.Quantum.Subentropy.GuessingProbability.pGuess_bounds`
    (Theorem 106.1).
  - These are general statements: a Kraus list with Σ K†K = I defines a channel; the trace norm of a difference of
    orthogonal positive matrices; general guessing-probability bounds. None of them states a value of this volume.
  - The film badges as Lean only the sentence that states the general Kraus theorem (channel scene and finale). Every
    value and certificate of the volume is badged as theory.
- **Published results, used as external inputs.** The finale names the main group and badges it as published.
  - Watrous, *The Theory of Quantum Information*, Theorems 2.22, 2.26, 3.46 and 3.51; Watrous, arXiv:1207.5726
    (Theorem 6).
  - Singh–Nechita, Quantum 5, 519 (2021) (diagonal covariance, CDUC); Assalini–Cariolaro–Pierobon, arXiv:1001.1385
    (geometrically uniform discrimination); Matsumoto, arXiv:1012.2650, and Jenčová, arXiv:1512.07016 (comparison of
    experiments and channels); Coutts–Girard–Watrous, arXiv:1810.13295 (optimality certificates); Greenbaum–Li–Overton,
    arXiv:1903.00785 (eigenvalue perturbation).
  - Also cited in the volume: Horodecki–Shor–Ruskai (quant-ph/0302031), Bény–Kempf–Kribs (arXiv:0705.1574), Janssens
    (quant-ph/0606093), Choi–Johnston–Kribs (arXiv:0811.0947), Chen–Grogan–Johnston–Li–Plosker (arXiv:1601.06269) and
    Shahbeigi et al. (arXiv:2104.06062).
- **Classical tools named in the volume.** Haar averaging, Cauchy–Schwarz for positive forms, Choi–Kraus
  factorisation, Jordan decomposition, the contraction-mapping theorem and rational interval arithmetic.
- **Project inputs from other volumes.** The channel identity and basis come from the Purity arithmetic volume
  (Definition 87.1, (87.7)) and the Environment record memory volume (Definition 27.1, (27.3)); the limit channel from
  the Five-window quantum memory volume (Theorem 19.2); the one-step value from Purity arithmetic, Theorem 59.2; the
  effect interface from Environment (27.4). They are badged as theory, and the channel identity is recomputed below.
- **Theory volume, argued but not kernel-checked.** Everything else in the film.
- **Recomputed for this film.** An independent Python script runs 133 checks with numpy, sympy (exact algebra),
  mpmath (60-digit Newton) and cvxpy with Clarabel (semidefinite programs). These are sampled and finite checks, not
  proofs.
  - **Channel.** Fⁿ = Ad(U₀) ∘ Φ_s on all matrix units for n = 1…10 (error 2 × 10⁻¹⁶); the average over all 2ⁿ
    chronological words at random angles equals Fⁿ for n ≤ 5; Φ_s is completely positive at s = −1/2 and 1 and not just
    outside.
  - **Sharp values.** SDP minima of the half diamond error for n = 1…8: 0.500000, 0.708107, 0.722222, 0.777271,
    0.780172, 0.794363, 0.795011 and 0.798593, matching (94.2); the limit gives 0.800000. The row identities M p = η1
    for odd s and even h, (96.3), (98.3)–(98.6), the quintic, g(3/10) and g(1/3) are checked symbolically;
    r* = 0.330899327615, H(r*) = 10.277727, δ₂ = 0.708107. The attaining decoders give exactly δ_n on their probes for
    n = 2, 3, 4, and the maximally entangled probe gives √2/3 = 0.4714 at n = 1.
  - **Unital.** SDP values 0.712373 > 0.708107 (n = 2), 0.777659 > 0.777271 (n = 4) and 0.794385 > 0.794363 (n = 6);
    equal within solver accuracy at n = 1, 3, 5 and in the limit.
  - **Tasks.** SDP individual optima 0, (1 − |s|)/2 and 1/2 at s = 1, −1/2, 1/4, 0. Triple regret Γ_T = 0 at n = 1 and
    0.00443, 0.01040, 0.01421, 0.01621, 0.01721, 0.01771 for n = 2…7 and 0.01820 in the limit, all above 1/250.
    At n = 1 three random complex tasks have SDP optimum ‖u‖‖z‖, attained by the identity.
  - **No reference.** Fourier guessing SDP equals 1/3 + 2|s|/9 at s = −1/2, 0, 1/4, 1; the identity decoder's maximal
    error 2/3 − s/6 at s = 0, 1/4, 1/2, 1 is attained at (1/3, 1/6, 1/2); H(r*) > 29/3 and δ₂ − 2/3 = 0.041440 > 2/87.
  - **Orbit.** A_ε has error F(q) on a 13 × 13 phase grid for s = −1/2, 1/4, 1, 0. An SDP over the nine phase points
    with cube-root-of-unity phases gives 0.562047 = F(1/2) and 0.612696 = F(1/4). (114.2) is checked symbolically.
    A₋₁Φ_(−1/2)(E₁₁) = diag(0, 1/4, 3/4) with error 3/4.
  - **Zero set.** For R_v of (116.1), the maximal error is 0.8000 at v = 0.2 and exactly 2/3 at v = 1/3, 0.6 and 1,
    with maximizers only at |z₀|² = 1/3 for v > 1/3; (115.13) is checked symbolically; the replacers τ± have error 5/6.
  - **Horizon two.** All ten coefficients (119.6) and the second-derivative sums (120.8),
    (4, 2992, 2192, 8470, 4624, 2150, 2646, 10454, 10609, 4785, 1632), are recomputed exactly.
    ‖A‖∞ = 22.57240592045399630511 and ‖AF(centre)‖∞ = 4.4 × 10⁻³¹. Newton at 60 digits lands 4.4 × 10⁻³¹ from the
    centre, with L* = 0.60644699139906989005381725224…. The cubic certificate constants are k = −0.268015,
    δ = −0.023053, γ = 0.000436, Q(0, 0) = 0.944715, Q(1, 0) = 0.590314, Q(0, 1) = 0.720186. The maximum of R*'s
    error over the population simplex is L*, reached at (p_e, 0) = (0.388582, 0) and (p_i, x_i) = (0.284461, 0.388490).
    λ_e = 0.340584, λ_i = 0.659416, b_test = 0.998778, Tr Y = 0.392331; S ⪰ 0 and SJ* = 0; all 81 entries of the
    twirled functional W match (124.4). An SDP minimizing the largest error over the twelve inputs gives 0.6064470, and
    200 random decoders satisfy the lower bound.
  - **Slope.** Φ_(−1/2)Φ_(−q) = Φ_(q/2) on all matrix units; R_fam has maximal error 2/3 − q/12 at q = 0.05, 0.25,
    0.5. The fixed-family coefficient peaks at 0.08333 at (u, η) = (1/2, 1/2). Along the moving decoder of
    Lemma 133.4, (2/3 − error)/q = 0.1561 at q = 0.004 (√2/9 = 0.15713); the fixed limiting map gives 0. Sampled
    zero-set parameters satisfy L ≤ √2 and g(1/6) ≤ 1/12.
- **Data drawn on screen.**
  - The s_n stems.
  - The δ_n dots with the SDP rings.
  - The probe-weight bars and the √2/3 versus 1/2 bars.
  - The g(r) curve, the square-certificate map, the r, z table and the S(h) curve.
  - The unital-minus-unrestricted SDP bars.
  - The Γ_T bars.
  - The no-reference bound curves and the per-horizon δ_n and μ_n intervals.
  - The R_v error curves.
  - The error map of R* over the population simplex with its contacts.
  - The slope curves and the coefficient bars.
- **Illustrative visuals.** These are illustrations, not data:
  - the population triangle with its moving dot;
  - the crossed-out letter tiles;
  - the 3 × 3 matrix tiles and the circuit sketch with the reference wire;
  - the probe wiring;
  - the three-task triangle;
  - the phase-grid tiles;
  - the convex-set sketch with its converging dots;
  - the ring of twelve test states.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
