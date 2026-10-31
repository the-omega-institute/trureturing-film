# 119 · AURIC FIVE-WINDOW MEMORY II · SWITCHED CHANNELS, A SURVIVING BIT AND UNIFORM ERASURE · AURIC 五窗口记忆 第二部 · 切换通道、存活的一位与一致遗忘

This is the second film of the three-part AURIC FIVE-WINDOW MEMORY series and runs about 7 minutes. It covers two
trureturing theory volumes at subject commit `327221574c`:
- `AURIC_FIB_FIVE_WINDOW_SWITCHED_MEMORY.md`, §1–§11 (the bookkeeping tables of §12–§13 are used for the public-phase
  and evidence remarks);
- `AURIC_FIB_FIVE_WINDOW_UNIFORM_SWITCHING_ERASURE.md`, §1–§11 (the source and cost tables of §12 are used for the
  evidence notes).

Part one followed one five-window channel repeated in time. This part lets the channel change at every step, on a
schedule fixed before the input is chosen, and asks which memories survive.

## The film, scene by scene

- **Allowed channels (switched §1; erasure §1–§2).**
  - The kept system is ℂ⁵ with windows 000, 100, 010, 001, 101. A CPTP map is allowed at parameter η when
    diag Φ(X) = Q_ηᵀ diag X for every complex X, including the off-diagonal matrix units (Definition 1.1).
  - Each allowed channel is given by eight environment vectors in one common environment with α₀ ⊥ α₁, β₀ ⊥ β₁,
    δ₀ ⊥ δ₁; its Choi rank lies between 2 and 8 (erasure Lemma 2.1).
  - Every block of consecutive steps follows the product of its population matrices, and any three steps give
    (Φ₃Φ₂Φ₁)†(E₂) = η₂(r₁P_L + P_D) > 0 (switched Lemma 1.4, erasure Lemma 2.2).
- **Two mixers (switched §2–§3).**
  - At η = ½, with the canonical channel C and S = diag(1, −1, 1, 1, 1), set A = Ad_S ∘ C and B = C ∘ Ad_S. Both
    are allowed, with Gram rank and Choi rank 2 (Proposition 2.2).
  - On its output space A acts by qU₀ and qV₁ with U₀² = I and V₁³ = −I. The averaged conjugation has fixed space ℂI,
    so Aⁿ → R_(P_R₋/3) and Bⁿ → R_(P_R/3) in diamond norm (Theorem 3.1).
  - G_A and G_B are not in the four-phase orbit of G_C (Proposition 3.2).
- **Alternation keeps a bit (switched §4, §12).**
  - B_jA_i = K_jK_i, so B ∘ A = C² and the alternating word is T₂ₘ = C²ᵐ, T₂ₘ₊₁ = Ad_S ∘ C²ᵐ⁺¹; starting with B
    gives the conjugate formulas (Theorem 4.1).
  - P = |s⟩⟨s| and M = (P_R − P)/2 are orthogonal fixed densities of C with the same population (1, 1, 2, 1, 1)/6.
    The terminal readout {P, I − P} at even times and {SPS, I − SPS} at odd times has zero error at every time
    (Proposition 4.2). The phase is public control, independent of the label (Convention 12.1).
- **Phase limits (switched §5).**
  - With E = P + ⅔|d⟩⟨d| and T = (C² + 2C³)/3, T(X) = P Tr(EX) + M Tr((I − E)X),
    Cⁿ − T = (−½)^(n − 2)(C² − T) and ‖Cⁿ − T‖◇ ≤ (4/3)2^(2 − n) for n ≥ 2 (Theorem 5.1). The full superoperator has
    det(tI − C) = t²⁰(t − 1)²(t + ½)³ (the source theorem cited in (5.3)).
  - For every n and every density σ, ‖Tₙ − R_σ‖◇ ≥ 1; the limits are at distance exactly 1 from the resets
    (Theorem 5.4). The input |d⟩⟨d| ⊥ R injects ⅔ into the P sector (Proposition 5.3).
- **Finite entanglement (switched §6).**
  - For Ω = (|0⟩s + |1⟩w₀)/√2 the coherence is (−½)ⁿ and the partial transpose has eigenvalue −2^(−n−1) at every
    finite n; each phase limit is measure-and-prepare and so entanglement-breaking (Proposition 6.1).
- **No qubit after three steps (switched §7–§9).**
  - For every fixed η and every predefined switching sequence, the largest terminally correctable code at n ≥ 3 has
    dimension 1 (Theorem 8.1). The gauge ranks are forced to (1, 1, 2), and the last channel would have to correct
    the plane span{h, w}, h = r e₀ + √η e₂ + √(rη) e₃, w = √r e₁ + √η e₄, which no allowed channel does
    (Lemma 8.2: the auxiliary Choi matrix diag(S₀, S₁) has rank 4, against at most 3).
  - The best exact code dimensions over the class are (5, 3, 2, 1, 1, …), reached by the oldest-bit channel, and also
    by the alternating example (Theorem 9.1, Corollary 9.2).
- **Population cap and small η (switched §10–§11).**
  - For a > ½ the states with population at least a on e₀ have trace-norm diameter 4√(a(1 − a)); for a ≤ ½ it is 2
    (Theorem 10.2).
  - For 0 < η < α = (5 − √17)/4 ≈ 0.2192, every N-step block puts weight at least a > ½ on window 0, and every
    switching schedule satisfies ‖Tₙ − R_σₙ‖◇ ≤ min{2, 10κ^⌊n/N⌋} with κ = 2√(a(1 − a)) < 1 (Theorem 11.1). For
    η ≥ α this criterion cannot apply (Proposition 11.3).
- **Uniform erasure (erasure §1–§2, §9).**
  - Letting η_j vary in a compact K: if ½ ∉ K there are N_K and q_K < 1 with δ(Tₙ) ≤ q_K^⌊n/N_K⌋ and
    ‖Tₙ − R_Tₙ(τ)‖◇ ≤ min{2, 10q_K^⌊n/N_K⌋} for every word (Theorem 1.3, Lemma 9.1, Theorem 9.3). Uniform forgetting
    holds exactly when ½ ∉ K. The constants are given by existence only.
  - Four-step population products have every entry at least κ⁴ (a classical Doeblin merge, Lemma 2.3), and every
    word has δ(Tₙ) ≥ ∏ⱼ ηⱼ (9.4).
- **Why one half (erasure §3–§8).**
  - Without a strictly contracting block, compactness gives one actual schedule with two orthogonal trajectories of
    the same moving population (Lemma 3.2). Their tails are pure + pure, mixed + mixed (2 + 2), or a pure line with a
    mixed partner (Corollary 4.4).
  - Pure + pure contradicts the positive three-step effect (Lemma 4.2); mixed + mixed needs a U shape, which forces
    η = ½ (Lemma 5.2), or a V shape, whose trace identity is contradictory (Lemma 6.1); the pure line with partner forces
    η = ½ (Lemmas 8.2–8.3).
- **Periods and near one half (erasure §10–§11).**
  - Away from ½ every periodic schedule has a unique attracting orbit (Corollary 11.1); for periods a, b the phase-a
    population is (r²s, ars, br, ars, a²s)/(1 − ab) (Proposition 11.2).
  - The family C_η deforms C; for every fixed n, ‖C_ηⁿ(P) − C_ηⁿ(M)‖₁ → 2 as η → ½, so no common decay rate covers a
    parameter set whose closure contains ½ (Proposition 11.4).

一部约七分钟的片子，AURIC 五窗口记忆系列的第二部：通道在每一步按事先固定的切换表变化。在 η = 1/2，两个各自完全混合的通道 A、B 交替时恰好给出 Cⁿ 与一次公开的符号翻转，于是零误差地永久保住一位经典信息；相位极限显式给出，每个重置的菱形距离都至少为一，R 之外的输入 d 也把三分之二的权重送进 P 扇区；有限时刻的输出保持 NPT 纠缠，而极限是测量后制备。对每个固定 η 和每个切换表，三步之后没有二维精确码，整个切换类的最佳精确码维数为 5、3、2、1、1、…；η < (5 − √17)/4 时每个切换表都按显式速率遗忘。第二卷让 η 逐步在紧集 K 中变化：遗忘一致成立当且仅当 1/2 ∉ K，证明由紧致性得到一对正交轨迹，再逐一排除其支撑类型；最后给出二周期人口公式，以及靠近 1/2 时不存在统一速率。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-119-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit neither volume has digestion records: `Meta/Digestion/backfill/auric-fib-five-window-switched-memory/`
    and `Meta/Digestion/backfill/auric-fib-five-window-uniform-switching-erasure/` do not exist, so both volumes have
    0 atoms (not ingested).
  - No Lean declaration covers any statement shown. Every content scene carries the theory badge.
- **Published and classical inputs, as cited in the volumes.** The finale and one line of the erasure scene badge
  them as classical tools.
  - Choi–Stinespring representation: M.-D. Choi, Linear Algebra Appl. 10, 285–290 (doi:10.1016/0024-3795(75)90075-0);
    W. F. Stinespring, Proc. Amer. Math. Soc. 6, 211–216 (doi:10.1090/S0002-9939-1955-0069403-4).
  - Dobrushin coefficient and its composition bound: Gaubert–Qu, arXiv:1307.4649v3; Szehr–Wolf, arXiv:1210.1171v2.
  - Support positivity for mixing channels: Burgarth–Chiribella–Giovannetti–Perinotti–Yuasa, arXiv:1210.5625v3.
  - Knill–Laflamme conditions, the classical Doeblin merge, compactness and diagonal extraction, Cesàro averages and
    the SVD are standard finite-dimensional tools named in the volumes.
- **Project inputs from other volumes, not recomputed as theorems here.** These are badged as theory:
  - the canonical channel C, its effect E, the factorisation of its superoperator and the oldest-bit channel come from
    `AURIC_FIB_FIVE_WINDOW_QUANTUM_MEMORY.md` (part one's volume);
  - the half-parameter Gram classification comes from `AURIC_FIB_FIVE_WINDOW_HALF_GRAM_CLASSIFICATION.md` (part three).
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy, cvxpy with Clarabel for every diamond norm)
  runs 102 checks. These are sampled and finite checks, not proofs of the general statements.
  - **Model.** 300 random allowed channels (environment dimension 2–8, random η) satisfy the diagonal law on all 25
    complex matrix units and the effect formulas (1.8)/(2.8); 300 random variable-parameter triples give
    (Φ₃Φ₂Φ₁)†(E₂) = η₂(r₁P_L + P_D). Q³ has zero entries and Q⁴ is strictly positive.
  - **Mixers.** C, A and B are allowed, with Gram and Choi rank 2; the Gram matrices built from the actual Kraus
    coefficients equal (2.8)–(2.10). A search over the five phases leaves a Frobenius residual of at least 2.43
    between G_A and the orbit of G_C (a genuine orbit point is found to 10⁻¹⁴ by the same search). U₀² = I, V₁³ = −I;
    the second eigenvalue modulus of A is 0.8295; ‖Aⁿ − R‖◇ falls from 1.778 (n = 1) to 6.9 × 10⁻⁴ (n = 40), and
    equals ‖Bⁿ − R‖◇.
  - **Alternation.** The four identities (4.1) hold as 25 × 25 superoperators for n ≤ 20; P and M have population
    (1, 1, 2, 1, 1)/6; the phase readout has zero error for n = 0…20; the distance from the alternating word to the
    nearest reset is 1.92, 1.78, 1.60, 1.216 and then exactly 1 for n = 4…16 (SDP over σ).
  - **Limits.** det(tI − C) = t²⁰(t − 1)²(t + ½)³ and C²(C − id)(C + ½ id) = 0 exactly (sympy, full 25-dimensional
    superoperator). ‖Cⁿ − T‖◇ = 4/3, 2/3, 1/3, … for n = 2…8, equal to the bound (4/3)2^(2 − n). ‖T − R_ρ_t‖◇ = 1 at
    t = ½ and 2 at t = 1; min over σ of ‖Cⁿ − R_σ‖◇ = 1.600, 1.216, then 1 for n ≥ 4; Tr(E|d⟩⟨d|) = ⅔.
  - **Entanglement.** The smallest eigenvalue of the partial transpose equals −2^(−n−1) for n = 0…12 on the
    alternating word, and the coherence is (−½)ⁿ S^(n mod 2).
  - **Qubit bound.** h and w are orthonormal for five values of η; the complementary outputs (8.10) match on 200
    random channels; S₀, S₁ ≥ r/(1 + r) on 200 random cases. Optimising the Knill–Laflamme defect of the plane T over
    allowed channels with environment dimension 4 (12 starts) leaves at least 0.81, 0.62 and 0.73 for
    η = 0.3, 0.5, 0.7. The oldest-bit witnesses (dimension 3 after one step, 2 after two, with the CPTP recovery (9.4))
    and the alternating-example codes (C isometric on H₊, C² on a pulled-back plane) check exactly.
  - **Cap and small η.** The cap diameter 4√(a(1 − a)) is attained and not exceeded by 3000 random mixed pairs for each
    of a = 0.55, 0.7, 0.85, 0.95. α = (5 − √17)/4 = 0.219224. At η = 0.05: k = 1, N = 3, a = 0.85737, κ = 0.69938;
    300 random 3-step blocks contract traceless inputs by at most 0.154; on one random 36-step schedule
    ‖Tₙ − R_σₙ‖◇ = 0.334, 0.0177, 3.9 × 10⁻⁴, 2 × 10⁻⁵ at n = 3, 6, 9, 12, below min{2, 10κ^⌊n/3⌋}.
    For η = α, 0.25, 0.4, 0.6, min_i (Qⁿ)_i0 ≤ ½ for n ≤ 59.
  - **Erasure.** For K = {0.3, 0.7}, κ⁴ = 0.0081 and the smallest entry over all 16 four-step products is 0.0270;
    zero-sum rows contract as (2.11). Tr(P_D Tₙ(E₃ − E₀)) = (−1)ⁿ ∏ⱼ ηⱼ on 100 random words. Distance to the nearest
    reset (SDP): random letters from {0.3, 0.7} 1.69 → 10⁻⁴ by n = 16; C_0.3, C_0.7 alternated 1.78 → 0.378 at n = 24;
    C_0.45 repeated 1.78 → 0.944 at n = 24; A, B alternated at ½ stays at 1.
  - **Moving supports.** (8.8), (8.11), (8.13) and Re H > 0 for η_(t+1) ≤ ½ hold on 300 random parameter sets.
  - **Periods and near one half.** The two-period formula (11.3) holds on 200 random pairs; for a = 0.3, b = 0.7,
    π^a = (0.186, 0.080, 0.620, 0.080, 0.034) and π^b = (0.080, 0.186, 0.114, 0.186, 0.434), matching the diagonals of
    the computed periodic orbit of (C_0.3, C_0.7). C_η is allowed and equals C at ½; ‖C_ηⁿ(P) − C_ηⁿ(M)‖₁ is exactly 2 at
    η = ½ and tends to 2 as η → ½ for n = 40.
- **Data drawn on screen.**
  - The Gram matrix G_A.
  - The ‖Aⁿ − R‖◇ curve, the alternating-word reset distances and the population bars of P and M.
  - The spectrum multiplicities of C, the ‖Cⁿ − T‖◇ points and the min-over-σ points.
  - The partial-transpose eigenvalues.
  - The exact-code bars 5, 3, 2, 1, 1, 1, 1 and the optimised KL defects.
  - The cap-diameter curve, the p₀(η) curve with α, the η = 0.05 constants and the small-η diamond points.
  - The four erasure curves and the four-step constants.
  - The π^0.3 and π^0.7 bars and the near-½ curves for n = 10, 40 and 160.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating window pyramid;
  - the five-window population graph (its edges and weights are the exact entries of Q);
  - the schedule tapes and environment icons;
  - the reflection and three-cycle triangle;
  - the R ellipse with the P and M sectors and the d arrow;
  - the block matrix of the entangled output;
  - the gauge-rank bars 1, 1, 2;
  - the two cap vectors on the circle;
  - the number line for K;
  - the case boxes of the witness scene;
  - the two-phase orbit loop.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
