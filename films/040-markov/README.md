# 040 · AURIC FIB ATOM PYRAMID XI · 金字塔 XI：局部规则的反演与闭环修正

A film of about 6 minutes, the eleventh part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_LOCAL_RECONSTRUCTION_AND_LOOP_CORRECTION.md` in trureturing at subject commit `4667a4469d`.

The question runs from averages back to a local rule: if only the occupation mean of each position is known,
which source should be rebuilt, and what does that choice miss?

- **The κ fiber.**
  - On the pyramid the means X, Y, Z of low, high and middle leave the joint probability κ free on
    max(0, X + Y + Z − 1) ≤ κ ≤ min(X, Y), and both ends are reached by legal laws.
  - For five equally likely patterns κ ranges over [0, 2/5]. The product of activities picks κ = XY/(1 − Z) = 1/5.
- **The FIB chain.**
  - On N positions with no two neighbours both occupied, the means fix every neighbouring pair table: empty then
    occupied has uᵢ₊₁, occupied then empty has uᵢ, and empty-empty has rᵢ = 1 − uᵢ − uᵢ₊₁.
  - Gluing the tables and dividing by the doubly counted interior positions gives a legal source with every mean
    right. It is the only first-order Markov source with these means.
- **Activities from means.**
  - The same source is a product of position activities, with wᵢ = uᵢ(1 − uᵢ)/(rᵢ₋₁rᵢ) and
    𝒵 = ∏(1 − uᵢ)/∏rᵢ.
  - For five equally likely patterns every activity is 1 and 𝒵 = 5.
- **Fluctuation response.** With one activity λ at every vertex of a finite graph:
  - Pr(v occupied) = 1 − 𝒵(V∖v)/𝒵(V);
  - λ · d⟨n⟩/dλ = Var n.
  - With separate activities, every mean and covariance is a derivative of log 𝒵.
- **What the completion misses.**
  - Among sources with the same means the Markov completion has the largest entropy. The gap is
    D(P ‖ P*) = Σᵢ I(bᵢ₊₁ ; b₁ … bᵢ₋₁ | bᵢ), zero only for a true Markov source.
  - Example: on five positions with the second and fourth empty, even parity on the first, third and fifth gives
    4 sources and independence gives 8. Single positions, neighbour pairs and runs of three agree; the entropies differ
    by log 2.
- **The tridiagonal inverse.**
  - For five equally likely patterns, low and high have covariance +1/25.
  - In C⁻¹ the low–high entry is 0. The inverse is tridiagonal, with neighbour weight 1/r.
- **Orthogonal residuals.**
  - Subtracting the left neighbour's prediction leaves pairwise orthogonal residuals with
    Var(Eᵢ₊₁) = uᵢ₊₁rᵢ/(1 − uᵢ).
  - det C = ∏Var(Eᵢ) = ∏uᵢ/𝒵. In the uniform case: 6/25 · 2/15 · 1/5 = 4/625.
- **Response volume.**
  - With every activity 1, 𝒵 = F(N + 2) and uᵢ = F(i)F(N − i + 1)/F(N + 2).
  - det C = (F₁ ⋯ F_N)²/F(N + 2)^(N + 1): 1/4, 1/27, 4/625, 9/8192, 900/4826809 for N = 1 … 5.
- **Squeezing a seam.** As a remainder r goes to 0, det C goes to 0 while the inverse link 1/r blows up.

一部约六分钟的片子：只知道每个位置的占据均值时，最自然的局部规则是马尔可夫补全——唯一、显式、可读成活动权；它遗漏的恰好是一组条件互信息之和，而协方差的逆把隐藏的三对角骨架显露出来。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-040-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** `D5/S3/StatisticalMechanics/HardCore/GibbsOccupation` has a state file under
  `Golden/Frozen/state/D5/S3/StatisticalMechanics/HardCore/` at the subject commit.
  - `gibbs_vertex_occupied` states Pr(v occupied) = 1 − 𝒵(V∖v)/𝒵(V) for the independent-set Gibbs law with one
    activity λ ≥ 0 on a finite simple graph.
  - `mean_occupation_fluctuation_response` states λ · d⟨n⟩/dλ = Var n for the total occupation n.
  - The film badges the response scene as Lean only for these single-activity statements. The separate-activity
    calculus is badged as theory.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the κ fiber (theorem 1.1);
  - the Markov completion and its uniqueness (theorem 2.2);
  - the activity–mean correspondence (theorem 3.2);
  - the entropy gap (theorem 4.1) and the parity example;
  - the tridiagonal inverse (theorem 5.1);
  - the orthogonal residuals and the determinant (theorems 6.1, 6.2);
  - the Fibonacci response volume and the seam limit.
- **Recomputed for this film.** An independent Python/sympy script recomputes the following.
  - **The fiber.** The κ bounds and their attainment; the uniform range [0, 2/5]; the product point 1/5.
  - **Completion and activities.**
    - The Markov completion equals the product-activity law.
    - The wᵢ and 𝒵 formulas, exactly, with a = b = c = 1 and 𝒵 = 5 in the uniform case.
  - **The gap.**
    - D(P ‖ P*) = H(P*) − H(P) = Σ conditional mutual information.
    - The parity example: 4 against 8 sources, equal marginals on positions, pairs and runs of three,
      ΔH = log 2.
  - **Inverse and residuals.**
    - 25C = [[6, −2, 1], [−2, 4, −2], [1, −2, 6]] and C⁻¹ = [[5, 5/2, 0], [5/2, 35/4, 5/2], [0, 5/2, 5]],
      det = 4/625.
    - Residuals pairwise orthogonal, with the stated variances.
  - **Volume.** det C = 1/4, 1/27, 4/625, 9/8192, 900/4826809 for all-ones activities and N = 1 … 5.
  - **Lean statements.** The single-activity identities checked numerically on paths.
  - **The seam.** r = 0.2, 0.1, 0.05, 0.01 gives det ≈ 0.0048, 0.00276, 0.00145, 0.0003 and 1/r = 5, 10, 20,
    100.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the cycling legal chains;
  - the residual box;
  - the response curves, which are exact path-of-five values drawn on an unlabelled scale;
  - the animated κ marker and seam squeeze.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters and digits whole when wrapping Chinese subtitles.
