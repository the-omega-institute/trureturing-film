# 097 · AURIC V33–V34 · INFORMATION CLOCKS AND ROBUST FINITE OBSERVERS · AURIC V33–V34 · 信息钟与稳健有限观察者

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:24). It covers two volumes of
trureturing at subject commit `1a81b54996`:
- `AURIC_ENDOGENOUS_INFORMATION_CLOCKS_AND_CERTIFIABLE_FINITE_OBSERVERS_V33.md`, §2–§8;
- `AURIC_GOLDEN_NESTED_CLOSURE_AND_ROBUST_FINITE_OBSERVERS_V34.md`, §1.1–§7.

Version thirty-three turns the information gained by a two-sector readout into an internal clock. It also builds finite
stopping certificates and finite prediction tables that hold with high probability for the whole future. Version
thirty-four adds a golden nesting relation that pins the scalar record rule. It then builds finite observers that work
without knowing the initial weight.

## The film, scene by scene

- **Odds and successors (V33 §2).**
  - Set x = (√5 − 1)/2, φ = 1/x, σ = x², ζ = e^(3πi/5) and κ₀ = |1 − ζ³|/2 = x/2 ≈ 0.309.
  - For every continuous ray function f on the rays of ℂ¹³: |f(A) − f(B)| ≤ φρ(f) + (2‖f‖∞/κ₀) d(A, B)
    (Corollary 2.1). Here ρ(f) is the four-point residual of the source stability bound.
  - The proof picks the largest m with d ≤ κ₀σ^(m−1) in the source bound and uses 1/(1 − σ) = φ.
  - A fixed positive residual leaves the additive floor φρ, so there is no common modulus for the whole class. The
    source sandwich 1 ≤ liminf M(ε)/√ε ≤ limsup M(ε)/√ε ≤ √φ is quoted as an asymptotic statement only.
  - The golden instrument M₀ = √x E, M₁ = xE + ζ⁻³P and a measure-and-prepare instrument share the effects xE and
    x²E + P. Every input therefore sees the same single-round probabilities.
  - Yet the golden record polarizes, while the measure-and-prepare record visits 0 and 1 infinitely often, almost
    surely (Proposition 2.2).
- **Information clock (V33 §3).**
  - Take a two-sector QND readout M_n,y = √a E + e^(iθ)√b P with overlap rₙ = Σ_y √(ab), and set U(q) = √(q(1 − q)).
  - Then E[U(qₙ₊₁) | Fₙ] = rₙU(qₙ) and E qₙ₊₁ = qₙ (Lemma 3.2).
  - Hence E U(qₙ) = U(q₀)Rₙ with Rₙ = r₀ ⋯ rₙ₋₁. Almost-sure polarization holds exactly when Rₙ → 0, that is, when
    the clock Tₙ = −log Rₙ runs to infinity, and then P(q∞ = 1) = q₀ (Theorem 3.4).
  - For the golden readout r = x, so Tₙ = n log φ and E U(qₙ) = U(q₀)xⁿ (Corollary 3.5).
  - Every continuous additive scale on overlaps is c(−log r) (Proposition 3.6).
  - The mean cross-sector block is multiplied by c with |c| ≤ r; for the golden readout c = xζ³ (Proposition 3.7).
    The converse fails: M₀ = I/√2, M₁ = (E − P)/√2 has r = 1 and c = 0.
- **Square-sum test (V33 §4).**
  - If outcome 0 has probability (1 − gₙ)/2 in E and (1 + gₙ)/2 in P, then rₙ = √(1 − gₙ²). The record polarizes
    almost surely exactly when Σ gₙ² = ∞ (Theorem 4.1).
  - gₙ = 1/(n + 2) leaves finite information; gₙ = 1/√(n + 2) does not.
  - Suppose the mean drift is at most dₙ with D* = Σ dₙ < ∞, the reference information κₙ has Σ κₙ = ∞, and the
    instrument error satisfies eₙ/κₙ → 0. Then qₙ still polarizes and |P(q∞ = 1) − q₀| ≤ D* (Theorem 4.4).
- **Stopping certificates (V33 §5).**
  - qₙ + Dₙ and 1 − qₙ + Dₙ are nonnegative supermartingales, and |P(B = 1 | F_τ) − q_τ| ≤ D_τ (Lemma 5.2).
  - A certificate is issued at the first round where q̂ₙ + νₙ + D̄ₙ ≤ α (choose 0) or 1 − q̂ₙ + νₙ + D̄ₙ ≤ α (choose 1).
    The final branch is then wrong with conditional probability at most α. The posterior crosses the other half with
    probability at most 2α, and an opposite certificate appears later with probability at most α/(1 − α)
    (Theorem 5.3, Corollary 5.4).
  - For a positive-support readout every history has mass in both sectors, so no almost-surely finite certifier has
    zero error. Every 0 < α < 1/2 still has a threshold certificate (Proposition 5.5).
  - The golden readout has a deterministic wait τ_α ≤ ⌈log((1 − q₀)(1 − α)/(αq₀))/(2 log φ)⌉. For q₀ = 1/2 and
    α = 1/100 this is ⌈4.77⌉ = 5 rounds (Corollary 5.6).
- **Finite table (V33 §6–§7).**
  - For the positive-support readout (0 < s < x) and 0 < ε < g/2 with g = x − s, a finite table keeps every future
    prediction within ε with probability at least 1 − δ. It counts rounds and zeros to depth N, then freezes into one
    of two absorbing states, and has |S| ≤ N(N + 1)/2 + 2 states (Theorem 6.4).
  - Example: s = 1/10, q₀ = 1/2, ε = δ = 0.05 gives r = 0.835, b = 0.0483, N* = 26 and 353 states.
  - This is consistent with version thirty-two, which asks for accuracy on every history; here bad paths of total mass
    δ are allowed.
  - Any freeze-at-depth-N scheme needs N ≥ [log(C₀²/δ)]₊ / (2 log(1/r)), here 4.46, because the Bayes error of the
    freeze is at least C₀²r^(2N) (Proposition 7.1). The bound covers the freeze architecture only.
- **Golden nesting (V34 §1.1–§2).**
  - The source family g_λ(t) = t + λh(t), with h(t) = t(1 − t)(2t − 1)R(t)², keeps the anchors
    {x, x², x³, 1 − x³, ρ*, 1 − ρ*} with ρ* = 1/(1 + x²). It also keeps the pure successors and the current supply
    contracts.
  - Yet two members differ on an allowed event by |λ − μ|Γ(x⁴), with Γ(t) = t(1 − t)(1 − 2t)R(t)² and
    Γ(x⁴) ≈ 1.93 × 10⁻⁸ > 0.
  - With the complementarity defect c and the golden nesting defect η = sup |g(xt) − g(x)g(t)|, every g satisfies
    |g(x) − x| ≤ x(η + c) and ‖g − id‖∞ ≤ φ³(η + c). If g(x) = x, the bound improves to φ²(η + c). No continuity is
    assumed (Theorem 2.3).
  - On the family, g(x⁴) − g(x)g(x³) = −λΓ(x⁴), so exact nesting forces λ = 0 (Corollary 2.4).
  - A finite orbit certifies one target: |g(t₀) − t₀| ≤ x^N + Σ x^j |Δ(t_(j+1))| (Proposition 2.5).
- **Start-blind windows (V34 §3–§4).**
  - Assume the complete error contract ½‖I_n,h(ρ_h) − J(ρ_h)‖₁ ≤ eₙ against the reference
    M₀ = √x E + √s P, M₁ = xE + √(1 − s)e^(iθ)P. Then the drift is at most eₙ, |pₙ − (x − g*qₙ)| ≤ eₙ, and
    E U(qₙ₊₁) ≤ rU(qₙ) + √(2eₙ) (Lemma 3.3).
  - Over a window the complete-record errors add (Lemma 3.4).
  - Counting zeros over L rounds with a rational test misreads either pure sector with probability at most √2 r^L
    (Lemma 4.1).
  - Wait m rounds, read L rounds and choose C. For every initial state,
    P(|qₙ − C| ≥ b for some n ≥ m + L) ≤ (√2 r^L + D_m)/b with D_m = Σ_(j≥m) e_j (Theorem 4.2).
  - With a computable tail bound this is a finite program with at most m + L(L + 1)/2 + 2 logical states
    (Corollary 4.3).
- **Two conditions (V34 §4–§5).**
  - A computable summable sequence that pays 2^(−k−2) when machine k is seen to halt has no computable tail bound
    tending to 0 (Proposition 4.4).
  - Swapping the sectors with probability 1/(n + 2) → 0 keeps U(qₙ) = 0, yet the swaps happen infinitely often,
    almost surely (Proposition 4.5).
  - If only q₀ ∈ [ℓ, u] is known, a deterministic predictor that must work from time zero needs ε ≥ g*(u − ℓ)/2
    (Theorem 5.1).
  - An exact prior interval keeps its logit width D, and its width never exceeds tanh(D/4) (Proposition 5.2).
- **Overlap and decision (V34 §6).**
  - With prior overlap C, (1 − √(1 − 4C²))/2 ≤ e_Bayes ≤ min{C, q, 1 − q}. At equal priors both ends,
    (1 − √(1 − R²))/2 and R/2, are attained for every R, by explicit two- and three-outcome examples (Theorem 6.1).
  - So one clock value allows different best-decision errors.
  - The frozen Lean theorem `FidelityMeasurementROCRefutation.result : ¬ claim` (§6.1) uses
    ρ = (1/20)[2 1 1; 1 10 1; 1 1 8] and σ = (1/40)[16 4 2; 4 20 1; 2 1 4], with σ = DρD and D = diag(2, 1, 1/2).
  - The first-coordinate projection has false-positive rate 1/10 and true-positive rate 2/5. The projection F* = vvᵀ/1382,
    v = (37, 2, −3), keeps 1/10 and reaches 5539/13820, a gain of 11/13820.
- **Costs and clocks (V33 §8, V34 §7).**
  - The typed cocycle family has C_stat(X_N) = 2, F(X_N) = N and C_on(X_N) ≤ 2N for N ≥ 3.
  - At the actual-cut entry the answer needs two kept values, yet every deterministic total-correct run has
    M(s, n) > n/2 and W(s, n) > n/2.
  - The golden information clock reads n log φ, and an execution clock adds native word lengths. With a fixed length L
    per round their ratio is log φ / L.
  - The V34 reference clock is T_L = L log(1/r). Neither clock is identified with physical proper time.

一部约七分半钟的片子，延续 AURIC 版本系列：第三十三版说明单轮概率不决定后继；把两扇区读口的重叠乘积变成一只内部的钟，黄金读口每轮恰走 log φ，几乎必然极化当且仅当这只钟趋于无穷；弱读口的判据是 Σg² 发散；带漂移尾的停时证书控制选支错误与未来反转；有限表以至少 1 − δ 的概率让所有未来预测落在 ε 之内（例：二十六层、三百五十三个状态），固定深度冻结至少需要 4.46 层。第三十四版从记录律族 g_λ 的非识别出发，用黄金嵌套与互补关系给出 ‖g − id‖ ≤ φ³(η + c)；在完整误差合同下，先等 m 轮再读 L 轮的观察器不需要初值就能控制全部未来的偏离；可求和误差未必有可计算的尾，趋零误差也不能冻结；先验区间宽度不超过 tanh(D/4)；同一重叠可对应不同的 Bayes 错误率，Lean 冻结的 ROC 反驳给出一个三阶例子；最后，小答案不退还取得成本，信息钟与执行钟是不同的内部合同。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-097-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One is used.
  - `D5/S3/Quantum/Measurement/FidelityMeasurementROCRefutation`, theorem `result : ¬ claim`, has a frozen state file
    at the subject commit (`Golden/Frozen/state/D5/S3/Quantum/Measurement/FidelityMeasurementROCRefutation.lean.json`).
  - Its claim says that every cumulative ROC point of an ordered fidelity eigenbasis is optimal. The explicit
    three-dimensional witness is the one shown in the film. The ROC sentence of the overlap scene carries the lean badge.
  - V34 §6.1 cites this file. Neither volume is in the digestion ledger, so the ledger does not link them.
  - At the subject commit neither volume has digestion records (no directory under `Meta/Digestion/backfill/`). No
    Lean declaration covers any statement of the two volumes.
- **Classical tools named in the volumes.** The overlap scene and the finale badge them as classical.
  - The affinity bounds on the Bayes error (V34 §6 calls them classical) and Cauchy–Schwarz.
  - Doob's martingale convergence and the maximal inequality for nonnegative supermartingales.
  - Markov's inequality.
  - The logistic form of Bayes updating.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the source stability bound (Proposition 115.2) and the asymptotic sandwich (Theorem 116.1) of the AURIC quantum
    continuation II;
  - the non-identification family g_λ and the event gap |λ − μ|Γ(x⁴) of the same continuation, §117–§120. Γ(x⁴) > 0
    and the anchor identities are recomputed below;
  - the typed cocycle family (Definition 25.2, Theorem 25.5);
  - the actual-cut acquisition bounds (§37–§39).
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy, mpmath) runs 77 checks:
  - **Odds.**
    - κ₀ = |1 − ζ³|/2 = x/2 = 0.309017, and 1/(1 − σ) = φ.
    - On 20 000 sampled (d, ρ, ‖f‖), the source bound with the largest admissible m is at most the bound of
      Corollary 2.1.
    - The golden and measure-and-prepare instruments give equal outcome probabilities on 200 random inputs.
    - On 20 000 golden paths from q₀ = 0.45, all polarize by round 60, and the fraction ending at 1 is 0.451.
    - The measure-and-prepare record flips at least 277 times in 400 rounds on every one of 2000 paths.
  - **Clock.**
    - E U(qₙ) = U(q₀)Rₙ and E qₙ = q₀ hold exactly on 30 random four-layer QND instruments, by full enumeration.
    - Golden closed form: E U(qₙ) = U(q₀)xⁿ. On 40 000 sampled paths from q₀ = 0.3 the Monte Carlo curve tracks xⁿ for
      n ≤ 14.
    - The golden coherence factor is xζ³ with |c| = x. The counterexample has r = 1 and c = 0.
  - **Square sum.**
    - For gₙ = 1/(n + 2): Rₙ = √((n + 2)/(2(n + 1))) → 1/√2, so T∞ = log √2 = 0.347, and Σ gₙ² = π²/6 − 1.
    - For gₙ = 1/√(n + 2): Rₙ = 1/√(n + 1).
    - With gₙ = 1/(n + 2), 83.6 % of 3000 sampled posteriors are still in (0.05, 0.95) at n = 3000.
    - With drift dₙ = 0.03 · 2^(−n) toward 1 and gₙ = 1/√(n + 2), the sampled P(q∞ = 1) = 0.442 from q₀ = 0.4
      (6000 paths). That is within D* = 0.06.
  - **Certificates.**
    - s = 1/10 gives r = √(xs) + x√(1 − s) = 0.83492.
    - With q₀ = 1/2, α = 0.05 and exact QND, 20 000 sampled paths give: wrong branch 0.027 ≤ 0.05; crossing the other
      half 0.043 ≤ 0.10; later opposite certificate 0.028 ≤ 0.0526.
    - The waiting tail stays below C₀rⁿ/√(α(1 − α)).
    - The golden bound equals the exact all-ones stopping round for 12 (q₀, α) pairs. For q₀ = 1/2 and α = 1/100 the
      all-ones posterior is 0.979 after four rounds and 0.992 after five.
  - **Table.**
    - With s = 1/10, q₀ = 1/2 and ε = δ = 0.05, N* = 26 is the least N satisfying (25), and the table has 353 states.
    - The installed table costs about 8834 bits plus lower-order terms.
    - Over 8000 sampled paths and 1500 rounds the table fails with frequency 0.0049 ≤ 0.05.
    - The exact Bayes error e_N stays above C₀²r^(2N) for N ≤ 40. The freeze bound is N ≥ 4.46, and the least N with
      e_N ≤ δ is 8.
    - On 400 random cq pairs, p_h e_h ≤ ε and Σ p_h e_h ≤ 2ε. With equal record marginals, Σ p_h e_h = ε.
  - **Nesting.**
    - Γ(x⁴) = 1.935 × 10⁻⁸ > 0, computed at 50 digits. h vanishes at all six anchors.
    - g_λ(x⁴) − g_λ(x)g_λ(x³) = −λΓ(x⁴) exactly, and h(1 − t) = −h(t), so c = 0 on the family.
    - g_λ is increasing with values in [0, 1] for |λ| ≤ 1, and max |h| = 7.8 × 10⁻⁷.
    - ‖g − id‖∞ ≤ φ³(η + c) and |g(x) − x| ≤ x(η + c) hold on 156 sampled rules (the g_λ family, powers tᵖ, smooth random
      rules, random anchor families and discontinuous step rules), with sup norms taken on a grid.
    - t² nests exactly (η = 0) but has c = 1/2.
    - The orbit certificate holds on 300 samples.
  - **Windows.**
    - E U(qₙ₊₁) ≤ rU(qₙ) + √(2e) holds on 4000 random actual readouts.
    - Worst-case window misreads stay below √2 r^L for L = 1…40.
    - Theorem 4.2 with m = 2, L = 20, b = 1/4 and flagged sector swaps with eₙ = 0.02 · 2^(−n), from the starts
      q₀ ∈ {0, 0.2, 0.5, 0.9, 1}: the largest sampled frequency is 0.0063, below the bound 0.193.
    - m + L(L + 1)/2 + 2 = 214.
  - **Conditions.**
    - ∏(1 − 1/(n + 2)) = (n₀ + 1)/(M + 2).
    - The mean swap count over 400 runs tracks the harmonic sum: 1.98, 4.21, 6.48, 8.70 and 9.40 at
      n = 10, 100, 1000, 10 000 and 20 000.
    - The interval [0.2, 0.4] with s = 1/10 gives ε ≥ 0.0518.
    - D = 0.981 and sup width = tanh(D/4) = 0.240. The logistic identity holds on 500 samples.
  - **Overlap.**
    - Both Bayes bounds hold on 5000 random pairs, and both equality examples attain them for R = 0, 0.1, …, 1.
    - The ROC numbers are exact in sympy: σ = DρD, both matrices positive definite with trace 1, F* a projection,
      false-positive rates 1/10 and 1/10, true-positive rates 2/5 and 5539/13820, gain 11/13820.
    - The fidelity observable is numerically diag(2, 1, 1/2).
  - **Clocks.** log φ = 0.48121 and log(1/r) = 0.18042 for s = 1/10.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The source staircase and the Corollary 2.1 line.
  - The golden and measure-and-prepare sample paths.
  - The Monte Carlo and exact xⁿ curves.
  - The two information clocks for gₙ = 1/(n + 2) and 1/√(n + 2).
  - The drift bars and the certificate bars.
  - The all-ones 1 − qₙ stems.
  - The e_N dots with the C₀²r^(2N) line.
  - The normalised h curve with its anchors.
  - The nesting scatter.
  - The window misread curves.
  - The window and swap Monte Carlo values.
  - The interval-width curve.
  - The Bayes bound curves with their attaining points.
  - The two clock staircases. Their word lengths 3, 3, 3, 4, … are an illustrative schedule.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the instrument boxes;
  - the state lattice of the table, its moving token and the 0/1 window cells (a fixed illustrative record);
  - the ruler of the golden clock;
  - the matrix grids and the ROC table layout.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
