# 056 · AURIC FIB ATOM PYRAMID XXVII · 金字塔 XXVII：动态未来商与未来闭合记忆

A film of about 8 minutes, the twenty-seventh part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_DYNAMIC_FUTURE_QUOTIENT_AND_FUTURE_CLOSED_MEMORY.md` in trureturing at subject commit `ab19bd7155`.

The film sets the pyramid in motion. A hidden Fibonacci depth fixes the odds of each paid read. The film asks which
summary of a history predicts its whole future law, and how much memory that future needs.

- **Reads.**
  - A hidden depth k is drawn once.
  - Each paid read returns α with probability r_k = F_(k+1)/F_(k+3), or β with probability s_k = F_(k+2)/F_(k+3).
  - The values are 1/3 and 2/3 at k = 1, and 2/5 and 3/5 at k = 2. r_k tends to φ⁻² ≈ 0.382.
- **Future equivalence.** Two histories are equivalent when their complete future laws agree. The volume argues that
  this holds exactly when they share the phase and both letter counts (a, A, B).
  - The order of the letters is forgotten.
  - The counts are kept, because (r_i/r_j)^u (s_i/s_j)^v = 1 only for u = v = 0.
- **Minimal and recursive.**
  - Any exact predictor factors uniquely onto the future-law quotient.
  - The quotient updates letter by letter: α adds one to A, β adds one to B, and the phase moves or enters a pending
    stop.
- **Length collides.**
  - (5, 3) and (3, 5) both have length 8.
  - Under a uniform prior on depths {1, 2}, their posteriors are (0.355, 0.645) and (0.495, 0.505).
- **No finite memory.**
  - The witnesses (2j+3, 3) all have different posteriors, so with two or more depths the quotient is infinite.
  - The summary is finite-dimensional but not finite-state.
- **The singleton exception.** With a known depth the posterior never moves. Only the phase and the terminal labels
  remain.
- **Safe forgetting.**
  - A future-safe memory may forget letter order.
  - It may not merge different counts, pending₀ with pending₁, active with delivered, or different κ when the
    four-corner contrast is nonzero.
  - Within this model, the volume defines the direction of time as the order between forgettable details and kept
    distinctions. This is a definition, not a theorem about physical time.
- **Five-state algebra.**
  - ℝ[x, y, z]/(x² − x, y² − y, z² − z, xz, yz) has basis 1, x, y, z, xy and five state idempotents.
  - The means fix a segment in the direction (1, −1, 0, −1, 1), and Cov(x, y) = κ − XY.
- **Interaction coefficient.**
  - Given the three means, the mean of a readout f recovers κ exactly when J_f = f_null + f₁₃ − f₁ − f₃ ≠ 0.
  - q = 2x + 5y + 3z has J = 0.
  - q² = 4x + 25y + 9z + 20xy has J = 20, so κ = (E q² − 4X − 25Y − 9Z)/20.
  - Modulo 5040, 20 is not invertible, so joint counts n and n + 252 agree.
- **Future-closed memory.**
  - The extra memory is at least dim C(V)/V, where C(V) = V + Σ U_a V.
  - One window needs one scalar, κ.
  - Six positions with a second-order report leave four third-order relations: 135, 136, 146 and 246.
- **Contracting error.**
  - If E[e_(t+1) | S_t] ≤ λe_t + ε with λ < 1, then E e_t ≤ λᵗe₀ + ε(1 − λᵗ)/(1 − λ). With λ = 0.8 and ε = 0.1 the
    limit is 0.5.
  - The volume proposes, as an open model, to read λ < 1 as life.
- **Gram cycle.**
  - For five unit vectors with neighbour overlaps r and total phase Φ, det G₅ = 1 − 5r² + 5r⁴ + 2r⁵ cos Φ.
  - At r = 1/φ, phase 0 gives rank 3. Phase π gives the negative eigenvalue 1 − 2/φ, so no five vectors realize it.

一部约八分钟的片子：让金字塔动起来——隐藏的 Fibonacci 深度决定每次付费读取的概率；追问哪一种历史摘要能精确预测完整未来律，以及未来究竟需要多少记忆。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-056-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen general results.** Each module below has a state file at the subject commit and generality G.
  - `D5/S3/ObserverMemory/PredictionFactors/PredictiveStateUniversalMinimality` and `.../CausalStateFactorization`.
    - `predictive_state_universal_minimality` states that every sufficient past statistic maps its realized image
      uniquely onto the realized image of the future law.
    - `causal_state_factorization` adds that distinct future laws require distinct statistic values.
    - The minimality scene's first line is badged Lean.
  - `D5/S3/ObserverMemory/ContextUpdates/PredictiveStateUnifilarUpdate`.
    - `unifilar_predictive_update` states that when histories are identified by their complete future law, extension
      by a positive-probability symbol descends to a single-valued update on the quotient.
    - The minimality scene's second line is badged Lean.
  - These are general theorems. The volume's specific identification of the quotient with (a, A, B) is not
    formalized.
- **Theory volume, argued but not kernel-checked.** The volume marks its statements as open reference input. Badged as
  theory:
  - the read model and the count summary;
  - the update rule;
  - the length collision and the infinite quotient;
  - the singleton exception and future-safe forgetting;
  - the readout rule and the modular condition;
  - the future-closure memory bound and its table;
  - the Gram cycle.
- **Classical tools.** Badged as classical where they carry the narration:
  - the Boolean quotient algebra of the five states;
  - the geometric-series bound for a contracting error.
- **Open model.** The reading of λ < 1 as life, and of this as moving against drift, is a model proposal, not a physical
  or biological law. That line is badged theory and stamped OPEN MODEL.
- **Not shown.** The volume's own formalization targets (`FutureQuotientMinimal`, `FutureSummaryClosed`,
  `NoFiniteExactFutureQuotient`) are not formalized at the subject commit. Numbers that depend on definitions outside
  the volume are left out.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Reads and counts.**
    - r_k and s_k, and the limit φ⁻².
    - Multiplicative independence of r_i/r_j and s_i/s_j for every 1 ≤ i < j ≤ 40, by prime-exponent rank.
    - Posteriors under a uniform prior on {1, 2}: (5, 3) against (3, 5), all 625 counts up to 24 distinct, and the 40
      witnesses (2j+3, 3) distinct.
    - The constant posterior under a singleton prior.
  - **Algebra and readout.**
    - The idempotent basis.
    - The κ fibre and its direction, and Cov(x, y) = κ − XY, on 2000 random laws.
    - J_q = 0, q² = 4x + 25y + 9z + 20xy and the recovery of κ, on 2000 random laws.
    - gcd(5040, 20) = 20 and 20 · 252 = 5040.
  - **Memory, contraction and the Gram cycle.**
    - The four 3-subsets of {1, …, 6} with no two adjacent.
    - The contraction bound, exact for λ = 0.8 and ε = 0.1, and a stochastic check.
    - The Gram determinant on 500 random (r, Φ), its spectrum at r = 1/φ for Φ = 0, and its least eigenvalue at Φ = π.
    - The pyramid height map.
- **Illustrative visuals.** These are illustrations, not data:
  - the scrolling read tape;
  - the future fans;
  - the shuffling letters;
  - the closure ellipse;
  - the passive and critical comparison curves (λ = 1.05 and λ = 1).

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
