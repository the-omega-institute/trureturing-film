# 030 · AURIC FIB ATOM PYRAMID · FIB 原子金字塔

A film of about six minutes on the four "Auric FIB atom pyramid" theory volumes in trureturing at subject commit
`ecc794bc78`:

- `AURIC_FIB_ATOM_PYRAMID_FOUNDATIONAL_FORMULAS_AND_RELATIONS.md`
- `AURIC_FIB_ATOM_PYRAMID_CORRELATION_AND_NATIVE_CONTINUATION.md`
- `AURIC_FIB_ATOM_PYRAMID_DETERMINANT_AND_NATIVE_GUARD_CONTINUATION.md`
- `AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md`

The story starts with two atoms and the rule α → β, β → ⟨β, α⟩. It then takes three neighbouring Fibonacci weights
2, 3, 5, where the middle one excludes both ends but the ends may coexist. That leaves five legal patterns, and in
occupancy coordinates their convex hull is a square pyramid. The film then covers what the pyramid remembers and what
it forgets:

- the single square relation v∅ + v₂₊₅ = v₂ + v₅;
- the hidden coordinate κ and the floor determinant Δ;
- the product (maximum-entropy) completion;
- a native continuation where the forgotten number changes the next reply;
- three counting sequences;
- the address fractal;
- prime-triplet divisibility events.

一部约六分钟的片子：两个原子、三个邻居、一条禁令、五个角的金字塔，以及它遗忘的那一条正方形关系。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-030-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen** (state files under `Golden/Frozen/state/` at the subject commit):
  - `D5/S1/Words/AdmissibleWords/PathStableSetPolytope.convexHull_three_pyramid` — the convex hull of the five legal
    three-position patterns is the square pyramid {X, Y, Z ≥ 0, X + Z ≤ 1, Y + Z ≤ 1};
  - `D5/S1/Words/AdmissibleWords/AdmissibleCount.admissibleWord_card_eq_fib` — no-11 words of length m number F(m+2).
- **Theory volume, argued but not kernel-checked.** Everything else comes from the four volumes above, whose atoms are
  `residual-open` in the digestion ledger:
  - the fiber interval of κ, Δ = rκ − XY and |Δ| ≤ r²/4;
  - the product completion and maximum entropy, and Cov = 1/25 for the uniform law;
  - the native continuation table and the two laws p⁻, p⁺;
  - the three counts;
  - the fractal dimension;
  - the prime-triplet local events.

  The film badges each scene accordingly.
- **Recomputed for this film** by an independent Python/sympy script:
  - **Tree.** The tree weights are 2, 3, 5, 8, 13, 21, 34.
  - **Patterns.** The five legal patterns.
  - **Pyramid geometry.** Volume 1/3, surface 2 + √2, centroid (3/8, 3/8, 1/4).
  - **Lattice counts.**
    - Visible lattice points are 1, 5, 14, 30, 55, 91, which equals C(m+4, 4) − C(m+2, 4).
    - Full configurations are 1, 5, 15, 35, 70, 126.
  - **Mixtures and correlations.**
    - The diagonal mixtures ½δ∅ + ½δ₂₊₅ and ½δ₂ + ½δ₅ have the same averages, with κ = 1/2 and κ = 0.
    - The uniform law has Δ = 0 and Cov(x, y) = 1/25.
  - **Native continuation.**
    - The continuation replies are 5, ⊥, 18, 26, ⊥.
    - p⁻ = (1/10, 3/10, 1/5, 3/10, 1/10) and p⁺ = (3/10, 1/10, 1/5, 1/10, 3/10) have the same point (2/5, 2/5, 1/5), the
      same two side views and P(odd) = 3/5.
    - P(⊥ | odd) is 1/6 for p⁻ and 1/2 for p⁺, against a product prediction of 1/3.
  - **Window histories.** Window histories number 1, 5, 21, 89, 377 = F(3L+2), counted by brute force.
  - **Integrals.** The interior-integral formula and the bubble integral 1/2016.
  - **Address fractal.** Its dimension is ln φ / ln 3 ≈ 0.438.
  - **Prime triplets.** Modulo 3, {0, 2, 6} has κ = 1/3 and survival 1/3, while {0, 2, 4} has κ = 0 and survival 0.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramids and cannonball stack;
  - the sliding κ marker;
  - the coloured slices labelled with r²/4.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
