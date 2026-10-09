# 036 · AURIC FIB ATOM PYRAMID VII · 金字塔 VII：读口与记录三角形

A film of about 6½ minutes, the seventh part on the FIB atom pyramid. Its subject is two volumes in trureturing at
subject commit `76054e9bc2`:

- `AURIC_FIB_ATOM_READOUT_CLOSURE_AND_RECORD_TRIANGLE.md`, all sections;
- `AURIC_FIB_ATOM_RECORD_SIMPLEX_AND_HIGHER_ORDER_COMPATIBILITY.md`, §§1–5 and 7.

Part five showed that the five-pattern law hides a fourth number κ. This film asks which observations keep a simple
source simple, and what the smallest record that reads two things at once looks like:

- **The simple source.**
  - The product model p = (1, a, b, c, ac)/(1 + a + b + c + ac) is exactly the set of laws with
    Δ = p∅p₁₃ − p₁p₃ = 0, where Δ = (1 − Z)κ − XY.
  - On the floor of the pyramid, low and high are then independent. This is a declared model, not a consequence of
    legality.
- **Bayes barycenter.**
  - The posteriors of any readout, weighted by their outcome probabilities, average back to the prior.
  - Conversely, any such family comes from a readout with L(o | s) = q_o p^o_s / p_s.
  - Matching the three averages is not enough; κ must average back too.
- **Two outcomes.**
  - Keeping both posteriors in the family forces λ∅ + λ₁₃ = λ₁ + λ₃ and (λ₁ − λ∅)(λ₃ − λ∅) = 0.
  - A two-outcome readout can therefore read low with middle, or high with middle, never both ends.
  - With four likelihood levels per pattern, 112 of the 1024 tables pass.
- **The independence saddle.**
  - On the floor, independence is the surface k = uv.
  - Mixing two independent sources adds the correlation t(1 − t)(u₁ − u₀)(v₁ − v₀), a signed rectangle.
- **Three outcomes.**
  - The volume's 5 × 3 table satisfies the four-corner rule in every column.
  - From a uniform prior, each record has probability 1/3 and Z_o = 1/5. The floor posteriors are (1/4, 2/3),
    (1/2, 1/6) and (3/4, 2/3), all independent.
  - Three is the minimum: with two outcomes, Cov_O(u_O, v_O) = q₀q₁(u₁ − u₀)(v₁ − v₀).
- **The record triangle.**
  - The three posteriors span area 1/8, with variances 1/24 and 1/18 and zero covariance.
  - The determinant is 1/432 = (4/27)A². In pyramid coordinates the area is 2/25.
- **Coarse records.**
  - Merging records 0 and 2 keeps independence and loses the low difference.
  - Merging records 0 and 1 creates the correlation −1/32, which equals the covariance of the fine record means.
- **Cliques.**
  - On any exclusion graph, a two-outcome readout keeps the product family exactly when it reads a clique.
  - On the FIB path the largest clique is one adjacent pair.
- **Record simplices.**
  - m outcomes carry at most m − 1 directions, so d independent bits kept independent need d + 1 outcomes.
  - The first-return protocol, with ℓ(0) = 1/4 and ℓ(1) = 3/4, reaches V_d = 1/(2^d d!): 1/2, 1/8, 1/48.
- **The five-pattern record tetrahedron.**
  - The records have probabilities 1/5, 2/5, 1/5, 1/5.
  - The posteriors are (0, 0, 1), (3/4, 1/2, 0), (1/4, 3/4, 0), (1/4, 1/4, 0), with κ = 0, 3/8, 3/16, 1/16 averaging
    back to 1/5.
  - The volume is 1/24 and det B = 1/5000.
- **Symmetry is not enough.**
  - A regular tetrahedron of product posteriors around three fair bits matches the first and second moments.
  - Its third moment is 1/8 + ε³. At ε = 1/4 it predicts 9/64 for 111 against 8/64.
- **Quantum successors.**
  - A joint "same" projection and read-each-then-report-same both give Pr(same) = 1/2 on |+⟩|+⟩, with the same
    occupations.
  - The first leaves |Φ⁺⟩ with ⟨X ⊗ X⟩ = 1, and the second a mixture with ⟨X ⊗ X⟩ = 0.

一部约六分四十秒的片子：哪些观察能让简单来源保持简单——两个结果只给一条记录方向，三个结果首次给出记录三角形，四个结果给出记录四面体；而忘掉一部分记录，会把差别变成关联。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-036-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** The state files under `Golden/Frozen/state/D5/S3/ConceptDynamics/ObservationOrder/` exist at the
  subject commit for both modules:
  - `BayesPlausibility.bayes_plausibility`: for a finite prior and signal kernel, Σ_signal q(signal) ·
    posterior(signal) = prior.
  - `PosteriorMixtureKernelRealization.posterior_mixture_kernel_realization`: a positive prior with a mixture of
    posteriors that averages back to it is realized by the kernel weight · posterior / prior. That kernel is
    nonnegative, sums to one, reproduces the weights, and reproduces each positive-weight posterior.
- **Theory volumes, argued but not kernel-checked.** Both volumes mark their theorems `Claim status: open`, and the
  film badges them as theory:
  - the product-model lemma and Δ = (1 − Z)κ − XY;
  - the two-outcome classification and the clique classification;
  - the saddle mixing formula;
  - the three-outcome table and its minimality;
  - the record-triangle area and determinant;
  - the coarsening covariance;
  - the m − 1 rank bound and the d + 1 lower bound;
  - the first-return simplices;
  - the five-pattern record tetrahedron;
  - the regular-tetrahedron counterexample;
  - the quantum-instrument comparison.
  The volume cites Wainwright–Jordan for conditional independence and IBM Quantum Learning for quantum instruments
  as background tools.
- **Supplied experiment counts.** The readout volume reports author-run counts that it does not re-verify: 1024
  likelihood tables with 112 preserving both posteriors, 87 graphs and 5982 readouts. The film uses only the
  1024/112 count, recomputed here on a four-level grid. By the classification, any four distinct levels give
  4³ + 4³ − 4² = 112.
- **Recomputed for this film** by an independent Python/sympy script:
  - **The source.** Δ = 0 on the product model, and Δ = (1 − Z)κ − XY, both symbolically.
  - **Two outcomes.**
    - Brute force gives 112 of 1024, and every survivor reads low + middle or high + middle.
    - Symbolically, e₁ − e₂ = λ∅ + λ₁₃ − λ₁ − λ₃.
  - **Saddle.** The saddle identity holds symbolically.
  - **Three outcomes.**
    - The rows sum to one and every column satisfies the four-corner rule.
    - The posteriors and q_o = 1/3, Z_o = 1/5 match.
    - 81 random product priors stay in the family.
  - **Record triangle.** The means are 1/2, the variances 1/24 and 1/18, the covariance 0, A = 1/8, det = 1/432 and
    the pyramid area 2/25.
  - **Coarse records.** Merging gives 0 and −1/32, and the two-outcome covariance identity holds symbolically.
  - **Cliques.** Brute force on the FIB path P₃ finds that preserving readouts depend only on {1, 2} or {2, 3}.
  - **Record simplices.** The first-return protocol gives probabilities summing to 1 and V_d = 1/(2^d d!) for d = 1…4.
  - **Five-pattern tetrahedron.**
    - The four records are rebuilt from the protocol: q, posterior means and κ.
    - The means average back to (2/5, 2/5, 1/5) and κ averages back to 1/5.
    - V = 1/24 and det B = 1/5000.
  - **Regular tetrahedron.** The moments are 1/2, 1/4 and 1/8 + ε³, and Pr(111) = 9/64.
  - **Quantum.**
    - Tr equality holds for an arbitrary 4 × 4 input.
    - Both probabilities are 1/2 with the same occupations, and ⟨XX⟩ = 1 versus 0.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramids;
  - the saddle wireframe and its endpoints, chosen for display;
  - the two-outcome example segment;
  - the general exclusion graph;
  - the dimension cartoon of a line and a plane.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
