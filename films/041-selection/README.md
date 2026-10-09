# 041 · AURIC FIB ATOM PYRAMID XII · 金字塔 XII：选择项演算

A film of about 7 minutes, the twelfth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_SELECTION_CALCULUS.md` in trureturing at subject commit `04f58afe56`.

The five patterns are read as choices of positions on a growing chain, not as numbers. Generating a tree and occupying
positions together are different operations, and the film follows what each summary of a law keeps and loses:

- **The generating chain.**
  - The rules are ρ(α) = β, ρ(β) = ⟨β, α⟩, and ρ⟨s, t⟩ = ⟨ρs, ρt⟩. They give T_{n+2} = ⟨T_{n+1}, T_n⟩, with counts
    2, 3, 5, 8, 13, 21.
  - Windows (A_j, B_j, C_j) = (T_{3j}, T_{3j+1}, T_{3j+2}) satisfy C_j = ⟨B_j, A_j⟩.
  - The legal selections are exactly ∅, {1}, {2}, {3}, {1, 3}.
- **Order and merge.**
  - E[1,3] = ⟨C, A⟩ is worth 7, while T₃ = ⟨C, B⟩ is worth 8.
  - ⟨C, A⟩ ≠ ⟨A, C⟩ although both have composition (2, 1).
  - F[1] ⊞ F[3] = F[1,3], but F[1] ⊞ F[2] is undefined, even though val F[3] = 2 + 3.
- **One window up.**
  - ρ³ moves every selected tree one window up and keeps the selection.
  - The values are 0, 2, 3, 5, 7, then 0, 8, 13, 21, 29, then 0, 34, 55, 89, 123, with
    val F_j[I] = Σ_{i∈I} Fib(3j + i + 2).
  - A single replacement walks A_j → B_j → C_j → A_{j+1}.
- **Two relations.**
  - In occupation space v∅ + v₁₃ = v₁ + v₃, the square base.
  - In composition space d∅ + d₃ = d₁ + d₂, the generation.
  - The pyramid is {X, Y, Z ≥ 0, X + Z ≤ 1, Y + Z ≤ 1}. Its composition image is the trapezoid
    0 ≤ V ≤ 1, 0 ≤ U ≤ 1 + V.
- **What each mean hides.**
  - A law has 4 free numbers, the pyramid means keep 3, and the trapezoid means keep 2.
  - The hidden directions are g□ = (1, −1, 0, −1, 1) and g_fib = (1, −1, −1, 1, 0).
  - The fiber is 2-dimensional inside the trapezoid, a segment on the top edge, and a point on the other edges.
- **Which targets survive.**
  - E[f] = f∅ + (f₁ − f∅)U + (f₂ − f∅)V + Γ_f·Y + Λ_f·κ.
  - (U, V) suffices for every law exactly when Γ_f = Λ_f = 0.
- **Four moments.**
  - With S = E[ξ(ξ − 1)] and T = E[ξη]: p₁₃ = S/2, p₃ = T − S, p₂ = V − T + S/2, p₁ = U − T, and
    p∅ = 1 − U − V + T.
  - μ_A = ½∅ + ½ joint and μ_B = ½ low + ½ high share (U, V) = (1, ½), with (S, T) = (1, 1) against (0, ½).
- **Infinite means.** m_n = Fib(n + 3)U + Fib(n + 4)V satisfies m_{n+2} = m_{n+1} + m_n, so the whole sequence
  knows only (U, V).
- **One seam bit.**
  - The only cross-window rule is that the old low and the new high are not both occupied.
  - 25 − 4 = 21 window pairs survive, and the open-end counts are 1, 5, 21, 89, 377 = Fib(3L + 2).
- **The native reply.**
  - Feeding F[3] at once gives 5, ⊥, 18, 26, ⊥ for the five first patterns.
  - μ_A gives ½·5 + ½·⊥, while μ_B gives ½·⊥ + ½·26.
  - ν(5) = 1 − U − V + T, ν(18) = V − T + S/2, ν(26) = T − S, ν(⊥) = U − T + S/2, and P(⊥ | Q odd) = S/2V.
- **A second path.**
  - An empty window then F[3] gives the replies 5, 39, 60, 94, 128.
  - The counts Q⁽⁰⁾ = 2ξ + 3η and Q⁽³⁾ = 8ξ + 13η, with their squares, return U, V, S, T.
  - E[(Q⁽⁰⁾)²] is 49/2 for μ_A and 29/2 for μ_B.
- **Not a history.**
  - Two windows each holding ∅ or F[2] with probability ½ have the same single-window moments and final mean 8.
  - Tied together they end at {0, 16}; tied apart, at {3, 13}.

一部约七分钟的片子：五种模式选的是生长链上的位置而不是数；生成等式不等于同时占位的许可；金字塔与梯形各藏起一个方向，四个一、二阶矩恢复全部单窗概率，并接到原生读者的完整回复。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-041-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** Both modules have state files under `Golden/Frozen/state/D5/S1/Words/AdmissibleWords/` at the
  subject commit.
  - `PathStableSetPolytope.convexHull_three_pyramid`: the convex hull of the legal three-position words is
    {x ≥ 0, x₀ + x₁ ≤ 1, x₁ + x₂ ≤ 1}, with a square base and the middle position as apex. The relations scene is
    badged Lean while it states this.
  - `AdmissibleCount.admissibleWord_card_eq_fib`: binary words of length m with no two adjacent ones number F(m + 2).
    At m = 3L this is the open-end window count. The seam scene is badged Lean from the point where it states this.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the selection and compilation conventions;
  - the partial merge;
  - the scale transport;
  - the two relations and the trapezoid;
  - the fibers;
  - the target decomposition;
  - the moment inversion;
  - the infinite mean sequence;
  - the seam reduction;
  - the native replies and the two acquisition paths;
  - the cross-window example.
- **Recomputed for this film.** An independent Python/sympy script recomputes the following.
  - **Trees.**
    - The tree orbit and T_{n+2} = ⟨T_{n+1}, T_n⟩.
    - The legal selections.
    - The compiled trees and the values 7 against 8.
    - The order inequality.
    - The three value rows and ρ³E_j = E_{j+1}.
  - **Relations and fibers.**
    - Both relations.
    - The kernels: one-dimensional for occupation, two-dimensional for composition.
    - The trapezoid bounds on 500 laws.
  - **Targets and moments.**
    - The target decomposition symbolically.
    - The moment inversion, the evaluation determinant −2 and the generating-polynomial derivatives.
    - The moments of μ_A and μ_B.
  - **Means and the seam.**
    - The mean sequence and its recursion.
    - The word counts 1, 5, 21, 89, 377 by enumeration, and 21 = 25 − 4.
  - **The native reader.**
    - Both reply tables.
    - The reply-law and parity formulas.
    - The moment bridge from Q⁽⁰⁾, Q⁽³⁾ on several laws.
  - **The cross-window example.** The supports and means.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the tree drawings, which are exact shapes with schematic spacing;
  - the window strip with an illegal first seam drawn on purpose to show the rule;
  - the log-scale mean plot.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters and digits whole when wrapping Chinese subtitles.
