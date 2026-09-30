# 025 · COUNTEREXAMPLE HUNTER · 反例猎人

A film of about 6 minutes. It covers eight printed conjectures, each refuted by a single witness. Every refutation is a
Lean theorem `result : ¬ claim` that is frozen in trureturing at subject commit `64b78db1ad`. The printed statement is
copied, with its quantifiers written out, into a definition `claim`. The theorem then proves `claim` false.

一部约 6 分钟的片子：八个白纸黑字发表过的猜想，八个见证，每一个反驳都是冻结的 Lean 定理。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-025-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## The eight cases · 八个案例

| # | Metaphor | Printed statement | Witness | Lean module | Dossier (`Problems/`) |
| --- | --- | --- | --- | --- | --- |
| 1 | eggs | Cao–Chen–Miller, arXiv:2511.18330, Conjecture 1: multidimensional egg-drop bound | d = 4, k = 5, sides (5,5,5,5): bound 9, but 625 points > 2⁹ = 512 transcripts | `D5/S3/Observer/Budget/CaoChenMillerEggDropRefutation` | `cao-chen-miller-egg-drop-conjecture-one` |
| 2 | light switches | Erdős 1989, recalling Mahler: 7³+7²+7+1 = 20² perhaps the only nontrivial 0/1-digit square for k > 4 | 521² = 111101₁₂; 11677² = 1010111111₈ | `D5/S1/Digit/ErdosMahlerBinaryDigitSquareRefutation` | `erdos-1989-mahler-binary-digit-square-refutation` |
| 3 | two bags | Erdős 1985, RMJM 15(2) p. 361: "I would not be surprised if 23 is the only counterexample" | x = 47: u(47,k) > v(47,k) for every k | `D5/S3/Factorization/ErdosConsecutiveProductSquarefreeFactorRefutation` | `erdos-1985-consecutive-product-squarefree-factor-refutation` |
| 4 | epidemic on a wheel | Espinosa-García et al., arXiv:2608.00340, Conjecture 1: 𝓔(W_n) = {3} ∪ {R ≥ n−1} for even n ≥ 12 | W₁₈, R = 4: all 2¹⁸ starts reach all-healthy by step 25 | `D5/S3/Combinatorics/WheelHivExtinctionRefutation` | `espinosa-garcia-2026-hiv-wheel-extinction-refutation` |
| 5 | fence | OEIS A134492 comment (F. Huber, 2023): Fibonacci perimeters are exactly F(6n), n ≥ 2 | F(45) = 2·61·85·109441 is a perimeter: (3145, 2928, 4297) × 109441 | `D5/S3/Arith/FibonacciPythagoreanPerimeterRefutation` | `fibonacci-pythagorean-perimeter-refutation` |
| 6 | rooks on a crossword | Lewis–Won, arXiv:2609.03081, Conjecture 3.10: no rook count ≡ 3 (mod 4) | permutation 27481635: 155 placements | `D5/S3/Combinatorics/CrosswordPermutationGridRefutation` | `lewis-won-permutation-grid-counts-refutation` |
| 7 | clock with zeros | Benfield–Lippard, arXiv:2407.20048v2, Conjecture 5.3(v): order ∈ {0,1,2} | a = 3, b = 2, m = 13: period 12, three zeros | `D5/S3/Arith/PisanoOrderRangeRefutation` | `pisano-order-range-refutation` |
| 8 | sliding puzzle | CayleyPy-4, arXiv:2603.22195, Conjecture 15 (k = 5): D = 8 at L = 4, N = 13 | inversions 0 → 36, ≤ 4 per move ⇒ ≥ 9 moves | `D5/S3/Combinatorics/ShrunkenGrassmannianConjectureFifteenRefutation` | `chervov-2026-cayleypy4-conjecture-fifteen-refutation` |

## What the film does and does not claim · 主张边界

- **Lean-frozen.** All eight modules have state files under `Golden/Frozen/state/` at the subject commit. Each module
  proves the negation of a `claim` definition.

  Whether each `claim` is faithful to the printed sentence is a matter of review, not something the kernel checks. The
  dossiers record the exact readings. For example:
  - the egg-drop claim weakens "the paper's strategy" to "any strategy";
  - the Mahler claim uses gcd(k, x) = 1 and excludes the trivial family x² = k + 1;
  - the Erdős 1985 claim refutes only the uniqueness sentence.
- **No priority claimed.** Every dossier records a bounded literature screen and makes no historical-priority claim.
  The film says so.
  - The number 11677 already appears in OEIS A342546, in the different framing "least square with exactly n ones in
    base n". For this reason the film leads with (12, 521).
- **Recomputed for this film** (independent Python/C):
  - the egg bound ⌈2√20⌉ = 9, against 625 > 512;
  - the base-7, base-12 and base-8 digit expansions, with coprimality;
  - u(x,k) < v(x,k) never holds for x = 23 or x = 47 with k ≤ 600, while it holds at x = 7, k = 7. Lean covers all k.
  - all 2¹⁸ starts of W₁₈ at R = 4 die out, and the slowest takes exactly 25 steps: a single infected rim vertex, which
    is the start animated in the film. For contrast, R = 5 leaves 85 starts alive.
  - the Pythagorean identity for F(45). Index 57 also fails the conjecture; this is our recomputation, not in the
    dossier.
  - 14 across and 14 down words, and 155 perfect matchings, which is 3 mod 4;
  - the Pisano sequence 0,1,3,11,0,9,1,8,0,3,9,7;
  - a BFS distance to the reversal of 9 moves with the rotation drawn and 12 with the other rotation, eccentricity 12
    in both. Lean proves only ≥ 9, which already exceeds 8.
- **Schematic visuals.** Some visuals are illustrative, not data:
  - the bet cards;
  - the ∀-domain dots;
  - the egg icons;
  - the proportions of the triangle (drawn to scale ×0.1 before the scaling factor).

  The rook placement shown is one of the 155, and the puzzle animates one shortest path.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
