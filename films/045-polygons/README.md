# 045 · AURIC FIB ATOM PYRAMID XVI · 金字塔 XVI：内生分类与多边形几何

A film of about 7.5 minutes, the sixteenth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_INTRINSIC_CLASSIFICATION_AND_POLYGON_GEOMETRY.md` in trureturing at subject commit `eb5cf631b3`.

The film asks where the five pyramid modes come from, and finds them in a recorded polygon boundary. It also shows
that every "opposite" (complement, reflection, sign flip) is a different operation on its own background.

- **Three distances.**
  - g = (a² + b² − c²)/2 is the inner product, and 4τ² = a²b² − g².
  - Three sides fix a triangle up to mirror image, and Heron's formula gives its area.
  - A rhombus of side 1 can have area 1 or 1/2.
- **Regular classes.**
  - The interior angle π − 2π/N is acute only for N = 3, right only for N = 4, and obtuse beyond, but always below π.
  - Reflection R_u flips the inner product and keeps the signed area, so 60° becomes 120°.
  - The complement of the triangle class still contains the square unless the background removes it first.
- **Flips.**
  - All triangulations of a convex polygon give the same total response exactly when every four-point flip keeps
    the sum. The shoelace kernel passes.
  - Squared area passes on squares but fails on (0,0), (3,0), (2,1), (0,2): 25/4 against 37/4.
- **Five modes from conflict.**
  - Five consecutive vertices give three ear cuts. C₁ and C₂ share an edge, C₂ and C₃ share an edge, and C₁ and C₃
    do not.
  - The legal selections ∅, 1, 2, 3 and 13 are exactly the five modes.
  - N open edges give F(N+1) schemes, and a closed four-ring gives 7.
- **Area moments.**
  - E D reads the three means, and E D² adds 2τ₁τ₃κ.
  - On the parabola points (i, i²), ½δ₀ + ½δ₁₃ and ½δ₁ + ½δ₃ share every mean but have second moments 2 and 1.
  - A notch beside an ear gives the cross term −1.
- **FIB tree area.**
  - The seam law is (q, A) ⋆ (r, B) = (q + r, A + B + ½det(q, r)).
  - The canonical FIB source has A_n = d/2 · (F_{n−2} + (−1)ⁿ).
- **Toward the circle.**
  - A_N = (NR²/2) sin(2π/N), with gap at most 2π³R²/(3N²).
  - At fixed perimeter the regular polygon has the most area, and 4πA/P² < 1.
- **Prime cycles.**
  - A step-k walk returns after N/gcd(N, k), and every step tours all vertices exactly when N is prime.
  - For prime p, rational weights centred at the origin are uniform. Composites have other choices.
- **Area spectrum.**
  - q_k = 4 sin²(2πk/p) has sum and product p.
  - For the pentagon, Q² − 5Q + 5 = 0 and q₊ − 2 = φ.
  - Each ear takes γ_N = 2(1 − cos 2π/N)/N of the area, which is (5 − √5)/10 for the pentagon.
  - The loss law is (1 − m + κ, m − 2κ, κ).
- **Area plus reply.**
  - Area alone merges the three single cuts.
  - The native reply to a mode-3 request is (5, ⊥, 18, 26, ⊥), so area and reply together give five distinct
    signatures.
- **Complement cube.**
  - Only the pair 2 ↔ 13 stays legal under position complement.
  - The unit cube is the pyramid (1/3), its mirror (1/3) and two mixed tetrahedra (1/6 each).
  - The set difference has volume 2/3.
- **Certificates.**
  - Support readouts recover only the convex hull: a notched pentagon (area 3) and a square (area 4) have the same
    support, and so do a circle and a disk.
  - In the plane, three convex constraints certify any finite conflict.
  - κ lies in [max(0, X + Y + Z − 1), min(X, Y)], and the lifted body has volume |J_f|/24.

一部约七分半钟的片子：三个点围出面积，五个顶点生成选择——从一条已记录的多边形边界上切耳，三刀对共享边的争用恰好生成金字塔的五种模式；而补集、反射、反号各属于自己的论域。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-045-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Arith/FibonacciAtomic/NativeContinuation/JointLaw` has a state file at the subject commit.
  - Its `native_reply_injective` states that, at every fixed length, the native reader's reply after one appended
    null window is injective on all legal five-mode sources.
  - The reply scene is badged Lean while it states this.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the regular classes and reflection;
  - the flip criterion and the squared-area counterexample;
  - the conflict selection language;
  - the area moments and their witnesses;
  - the FIB tree area;
  - the polygon areas;
  - the prime cycle;
  - the ear budget and loss law;
  - the area–reply table;
  - the complement cube;
  - the support blind spots;
  - the atomic κ certificates and the lift volume.
- **Classical tools named in the volume.** Badged as classical where they carry the narration:
  - Heron's formula;
  - Fibonacci counts of path independent sets;
  - the polygonal isoperimetric inequality;
  - Eisenstein's criterion and the cyclotomic area spectrum;
  - Helly's theorem in the plane.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Triangles, regular polygons and flips.**
    - The triangle identities on random vectors, and the rhombus areas.
    - The angle classes and the reflection identities.
    - The flip identity, and the 25/4 versus 37/4 counterexample.
  - **Modes and moments.**
    - The five selections, the F(N+1) counts and the four-ring 7.
    - The parabola, P_t and notch responses.
  - **FIB area and polygons.**
    - A_n for n = 2…15 on three calibrations, and the seam law.
    - The polygon areas and tail bound.
  - **Primes and the area spectrum.**
    - The prime-cycle test for N < 30, and the uniqueness of the rational centre for p ≤ 13.
    - The spectrum sums, products and minimal polynomials for p ≤ 17.
    - The golden-ratio isomorphism.
    - The ear fractions and the loss law.
  - **Replies.**
    - The reply table.
    - Injectivity of the native null reply for lengths 1 to 6, with 5, 21, 89, 377, 1597 and 6765 legal sources.
      This is a separate check of the Lean statement.
  - **Cube and certificates.**
    - The cube volumes.
    - The support equality in 360 directions, and the half-plane conflict.
    - The κ thickness r³/6 and the lift volume 1/24.
- **Illustrative visuals.** These are illustrations, not data:
  - the animated triangulation flips;
  - the growing inscribed polygons;
  - the rotating support line;
  - the loss bars;
  - the rotating cube.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters and digits whole when wrapping Chinese subtitles. It also keeps
closing brackets off the start of a line and opening brackets off the end of one.
