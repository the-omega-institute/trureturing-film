# 031 · AURIC FIB ATOM PYRAMID II · 金字塔 II：镜像与展开

A film of about 7½ minutes, the second part on the FIB atom pyramid. Its subject is the new volume
`AURIC_FIB_ATOM_DUALITY_AND_DIRECTIONAL_EXPANSION.md` in trureturing at subject commit `3655cb5f3e`, plus §22 of
`AURIC_FIB_ATOM_PYRAMID_FOUNDATIONAL_FORMULAS_AND_RELATIONS.md`.

The film does two things to the pyramid.

**It holds the pyramid up to a mirror (duality).**

- Regular-polygon angles: the right angle is the border between sharp and blunt corners.
- Angle-width duality θ ↔ π − θ, whose only fixed width is the right angle.
- Point–face duality {p, q} ↔ {q, p}, with the sphere / plane / hyperbolic split.
- The FIB pyramid's polar body is an upside-down pyramid with a diamond top. An explicit linear map L carries one onto
  the other, so the pyramid is self-dual, but L is not a rigid motion: the volumes are 8/3 and 16/3.

**It puts a magnifying glass on the pyramid's corners (directional blow-up).**

- A point is replaced by its sphere of arrival directions.
- At the apex, the arrival directions form a filled square patch, and the pyramid is a cone over that square.
- The four floor corners have triangular slices.
- A direction still leaves a hidden joint fibre, and a path can reach the apex without a limiting direction.

The geometry is then read through the native reader:

- the rejection probability equals one side test's slack divided by four;
- the minimum slack gives the fibre width and the best worst-case error;
- a blank window moves the source while an inversely moved probe reads back the old count;
- a count budget becomes one membership test in the polar body.

The film closes with the Fibonacci window norm recursion for isometries.

一部约七分半的片子，是 FIB 原子金字塔的第二部：把金字塔举到镜子前（对偶），再用放大镜看它的角（方向展开）。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-031-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen** (state file under `Golden/Frozen/state/` at the subject commit). The film badges this content as Lean-frozen:
  - `D5/S1/Words/AdmissibleWords/PathStableSetPolytope.convexHull_three_pyramid`. The convex hull of the five legal
    patterns is the square pyramid. Every point of it is (1 − t)·(u, 0, v) + t·apex with t, u, v ∈ [0, 1], which makes
    it the cone over the square used in the apex scene.
- **Classical geometry** (textbook results the volume cites; badged as classical):
  - interior and turning angles of regular polygons;
  - polar and normal cones;
  - the {p, q} classification and the Platonic duals;
  - the real oriented blow-up.
- **Theory volume, argued but not kernel-checked.** The rest comes from the duality volume and from §22 of the
  foundational volume. The film badges it accordingly. It covers:
  - the calibration and the polar body;
  - the self-duality map L;
  - the cone quotient and the vertex figures;
  - the fibre and the oscillating path;
  - the slack formulas;
  - blank-window transport;
  - the polar budget;
  - the Fibonacci window bound.
- **Recomputed for this film** by an independent Python/sympy/numpy script:
  - **Polygons and tilings.**
    - Regular-polygon angles for n = 3 … 8; acute iff n = 3.
    - The only complementary regular pairs are (3,6), (4,4), (6,3).
    - (p − 2)(q − 2) < 4 gives exactly the five Platonic {p, q}, and = 4 gives {3,6}, {4,4}, {6,3}.
  - **Calibration and polar body.**
    - The calibrated corners are (±1, ±1, −1) and (0, 0, 1).
    - The polar vertices are (0, 0, −1), (±2, 0, 1), (0, ±2, 1). The inequality description |ξ| + |η| ≤ 1 + ζ,
      −1 ≤ ζ ≤ 1 was checked on 20,000 random tests.
    - L maps the corners of K exactly onto the polar vertices, with det L = 2 and LᵀL = diag(2, 2, 1).
    - The volumes are 8/3 and 16/3.
    - Apex ↔ diamond face and floor corner ↔ triangle face.
  - **Vertex figures (ε = 1/4).** Two equilateral triangles with sides √2ε, two right triangles with sides ε, √2ε, √3ε,
    and a square at the apex.
  - **Fibre.**
    - The fibre width is min(u, v, 1 − u, 1 − v).
    - With k = 1/2 vs 0, Δ = ±r²/4 while k − uv = ±1/4.
  - **Slack.**
    - P(⊥) = s₁/4 and fibre width = min sᵢ/4 hold on 3,000 random rational laws.
    - At P = (2/5, 2/5, 1/5): m = 3/5, the conditional rejection lies in [0, 2/3], examples give 1/6 and 1/2, and the
      best worst-case error is 1/3.
  - **Blank windows.**
    - Native counts after j blanks are 2, 8, 34, 144; 3, 13, 55, 233; 5, 21, 89, 377; and 7, 29, 123, 521. The last row
      is Lucas numbers, an observation of this recomputation.
    - The probe (0, 1) = ℓ₀S⁻¹ reads back 2, 3, 5, 7.
  - **Budget.**
    - E[Q] = 3 + r(2u + 5v − 3) and Q = 13/4 + ⟨b_Q, z⟩ on all five patterns.
    - The budget 7 test lies on the polar boundary; the budget 6 test fails.
  - **Windows.**
    - F(k−1)² + F(k−2)² = F(2k−3).
    - Both window bounds hold on 400 random cyclic-shift instances, and on rotations of ℂ for k = 2 … 8. These checks
      do not show that the bound is tight.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating solids;
  - the blow-up starburst;
  - the sliding point;
  - the clock-hand rotation angle;
  - the animated slack path.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
