# 068 · AURIC Ω VI · FINITE-ROOT FRONTIER · AURIC Ω 第六部：全人口消去与有限根前沿

This is the sixth film in the AURIC Ω series and runs about 4.7 minutes. It covers §61–65 of
`AURIC_OMEGA_STATIC_COMPATIBILITY_FIBER_FINITE_ROOT_CONTINUATION.md` in trureturing, at subject commit `9f20f4efdb`.

Two density matrices with the same five populations z and the same real part differ only in a phase part, whose
spectrum is (a, b, 0, −b, −a). With the installed phase, one call reads a and two calls read s = a + b. The original
volume decided which pairs (a, b) occur through a three-dimensional search over the spectrum of the shared real part.
This continuation removes the search.

- **The question.** Fix z and its sorted values ζ₁ ≥ … ≥ ζ₅. Put P = ζ₁, Q = ζ₁ + ζ₂, V = ζ₄ + ζ₅ and
  d = min{V, (1 − Q)/2}. The domain S_z and the frontier H_z(s), the largest second weight at total distance s, are
  those of the original volume (Definition 81.1).
  - The original Theorem 76.1 says (a, b) ∈ S_z exactly when one common spectrum (x, y, ξ, w) satisfies x ≥ P,
    x + y ≥ Q, w ≤ V and xy ≥ A, xw ≥ B, yξ ≥ B, xyξw ≥ AB. Here A = a²/4 and B = b²/4.
- **One candidate, two tests.** From z, a and b alone, define the following (Definition 82.1):
  - X = max{P, h(a), B/d}, where h(a) = (1 + √(1 − 3a²))/6 for a ≤ 1/2 and a/2 otherwise;
  - u = A/X, q = Q − X and v = (1 − X − u)/2;
  - W = min{d, u, v}, Y = max{u, q, (1 − X − W)/2} and Z = 1 − X − Y − W.

  For b > 0, (a, b) ∈ S_z exactly when 0 < b ≤ a, a + b ≤ 1, d > 0, X(1 − X) ≥ A + 2B and XYZW ≥ AB. This holds for every
  population vector (Theorem 82.2). The zero axis is 0 ≤ a ≤ 2√(m(1 − m)) with m = max{P, 1/2}.
  - The proof shows that the best product F(x) never increases along the first coordinate. So the smallest admissible
    first coordinate is always the best choice.
  - For P ≥ 1/2 the first coordinate reduces to X = max{P, B/V, 2B/(1 − Q)} (Corollary 82.3).
- **Explicit states.** Every admissible pair has explicit density matrices (Theorem 83.1).
  - A real 2×2 matrix M with singular values a/2 and b/2 is chosen in one of three branches: anti-diagonal, diagonal,
    or a scaled rotation τ·diag(√x, √ξ)·U_θ·diag(√y, √w).
  - Then ρ, σ = O(R* ± iC*)Oᵀ with R* = diag(x, ξ, y, w, 0) and C* = [0 M; −Mᵀ 0] ⊕ 0. The real orthogonal O comes from
    the real Schur–Horn theorem and sets the populations to z.
- **Finite-root frontier.** Fix s with 0 < s ≤ s_max = 2√(m(1 − m)) (Definition 84.1, Theorem 84.2).
  - Nineteen polynomials f₁, …, f₁₉ in (x, t) record every switch of the maxima and minima and both tests.
  - Four eliminations of x produce 76 univariate polynomials of degree at most 8. The eliminations are x = P,
    x = a/2, x = B/d, and reduction modulo 3x² − x + A.
  - Their real roots in (0, s/2), together with 0 and s/2, form at most 610 candidates. H_z(s) is the largest
    positive candidate that passes the two tests.
  - For P ≤ 1/2, H_z(1) = min{1/2, 1 − 2P, 2V}.
- **Interface and scope.**
  - Under the original fixed menu, the two-call readout frontier is {(s − b, s) : 0 ≤ b ≤ H_z(s)} (Proposition 85.2).
  - For rational inputs every step is exact real algebra. For arbitrary real inputs, certified root isolation and
    sign decisions are an extra resource (Convention 85.1).
  - The results are existence statements about matrices (Convention 85.3). They do not supply preparation
    procedures, pulse counts, execution times or costs, and they add no controls or readouts to the original menu.

一部约四分四十秒的片子，AURIC Ω 系列的第六部：两个人口相同、实部相同的态只在相位部分 (a, b, 0, −b, −a) 上不同。原卷要在共同实部的谱上作三维搜索才能判断哪些 (a, b) 可行；本卷由人口和两个权重直接算出一个候选谱，只用 X(1 − X) ≥ A + 2B 与 XYZW ≥ AB 两个不等式判定，给出三分支的显式矩阵，并把固定距离下的最大第二权重写成七十六个次数不超过八的单变量多项式的有限根之一。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-068-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **No Lean-frozen declaration is used.** No D5 module or digestion record covers this volume, and the film carries no
  Lean badge.
- **Classical tools.** These are named in the volumes:
  - the real Schur–Horn theorem, cited through Carlen–Lieb, arXiv:0904.0734. The construction scene badges the
    population-setting rotation as a classical tool.
  - the singular-value product and exterior-power bounds and the same-spectrum sufficiency of the original volume
    (Propositions 73.2 and 75.1, Theorem 76.1). They are reused, not re-proved.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following.
  - **Necessity of the two tests.** 12 000 pairs (a, b) are built from a random common spectrum in the original
    polytope, half of them on its boundary. All pass X(1 − X) ≥ A + 2B and XYZW ≥ AB.
  - **Sufficiency.** For 17 900 random (z, a, b) passing the tests, the determined (X, Y, Z, W) satisfies all eleven
    constraints of the original interface.
  - **Necessity by search.** For 150 rejected pairs, an 8-start Nelder–Mead search over common spectra never finds a
    feasible one. The largest smallest-slack found is −8.0 × 10⁻⁷.
  - **Heavy populations.** Corollary 82.3 checked on random populations with P ≥ 1/2.
  - **Construction.**
    - 73 density pairs are built from the three-branch matrix M, with branch counts 51, 19 and 3.
    - Each pair is positive semidefinite with trace one, has equal real parts and has difference spectrum
      (a, b, 0, −b, −a). This also holds after the passive frame D₃.
    - The populations match z to 9 × 10⁻⁸. In this check the real orthogonal rotation is found numerically by least
      squares, not by Horn's induction.
  - **Frontier.**
    - On six rational population vectors and 28 distances, all 76 eliminants are built in exact rational arithmetic.
      Up to 71 are nonconstant, and the maximal degree observed is 8. The roots are isolated exactly and filtered.
    - In every case the resulting H_z(s) agrees, to 10⁻⁶, with a direct SLSQP maximization of b over common spectra
      (the original formulation).
    - H_z(1) = min{1/2, 1 − 2P, 2V} holds for each of these vectors with P ≤ 1/2.
  - **The example.** For z = (3/5, 1/5, 1/10, 3/50, 1/25) at s = 9/10:
    - The table has 29 distinct candidates, counting 0 and s/2, and five positive candidates pass.
    - The frontier is (2√6 − 3)/10 ≈ 0.1899, where the product test is tight. It is a root of 20t² + 12t − 3, a
      factor of E_P[f₁₈]; this was confirmed symbolically.
    - The independent search gives 0.189898.
  - **Monotone product.** For z = (0.3, 0.25, 0.2, 0.15, 0.1), a = 0.5 and b = 0.3, F(x) is nonincreasing on [X, x₊]:
    from 0.00378 at X = P = 0.3 down to 0.00004, against AB = 0.00141.
- **Data drawn on screen.**
  - The F(x) curve.
  - The candidate ticks of the example.
  - The two domain boundaries. They are computed from the two tests by bisection: the frontier for the light
    population stays on the diagonal b = s/2 almost to s = 1 and ends at H = 0.4, and the heavy population leaves the
    diagonal near s ≈ 0.69 and ends at s_max ≈ 0.98.
  - The two-call readout region for the heavy population.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and the Ω ring;
  - the phase-spectrum bars, drawn with a = 0.5 and b = 0.3;
  - the four-bar spectrum;
  - the search cloud and simplex;
  - the polynomial cards and elimination arrows.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
