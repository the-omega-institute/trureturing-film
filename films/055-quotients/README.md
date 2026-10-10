# 055 · AURIC FIB ATOM PYRAMID XXVI · 金字塔 XXVI：关系商与递归恢复

A film of about 7½ minutes, the twenty-sixth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_RELATIONAL_QUOTIENTS_AND_PHYSICAL_CANDIDATES.md` in trureturing at subject commit `6692c32325`.

The film asks what each view of the pyramid forgets: a sum, a mean or a single window. It follows the hidden joint coordinate κ through the occupancy pyramid and its three certificates. It then covers a transitive-closure change of coordinates, a spectral moment, future replies, seams and brackets.

- **Fixed index.**
  - F[1], F[2], F[3] and F[1,3] carry [2], [3], [5] and [2,5].
  - In standard windows they count Fₙ₋₁, Fₙ, Fₙ₊₁ and Lₙ (2, 3, 5 and 7 at n = 4).
  - The legal choices are the five independent sets of the path 2–3–5.
- **Two loops.**
  - 0 + 5 = 2 + 3 (g = (1,−1,−1,1,0)) is invisible to the composition means.
  - 0 + 7 = 2 + 5 (d = (1,−1,0,−1,1)) is invisible even to the three occupancy means.
- **The occupancy pyramid.**
  - The pyramid has 5 vertices, 8 edges and 5 faces, and volume 1/3.
  - Over each point, κ ranges over [max(0, X+Y−r), min(X,Y)], with width min{X, Y, r−X, r−Y}.
- **Three faces of κ.**
  - κ = E(xy).
  - Δ = rκ − XY = r²·Cov(x,y | z=0).
  - Continuing every mode with [5] replies 5, rejected, 18, 26, rejected. Only the joint mode is rejected among the odd
    modes, so P(odd, rejected) = κ.
- **Same point, different future.**
  - ½·0 + ½·[2,5] and ½·[2] + ½·[5] share the point (1/2, 1/2, 0).
  - The first replies 5 or rejected; the second replies rejected or 26.
- **Transitive closure.**
  - c = z + xy turns the five modes into the five partitions of three points.
  - The relation matrices have ranks 3, 2, 2, 2, 1 with spectra {1,1,1}, {2,1,0} and {3,0,0}.
- **One moment.** tr C(p)² = 3 + 2(X² + Y² + (Z+κ)²) returns κ, so three means and this moment fix all five
  probabilities.
- **Quantity is blind.**
  - 2x + 5y + 3z = 2u + 3v never sees κ.
  - Two future quantities (0,0), (2,8), (3,13), (5,21), (7,29) separate the modes, but not the leaf order, brackets or
    history.
- **Seams and dimensions.**
  - Native histories number 1, 5, 21, 89, 377 = F₃L₊₂, with a(L+2) = 4a(L+1) + a(L).
  - First-order readings miss Fₙ₊₂ − (n+1) dimensions: 1, 3 and 7 at n = 3, 4 and 5.
- **Brackets.** βαβ comes from ⟨⟨β,α⟩,β⟩ and ⟨β,⟨α,β⟩⟩. An explicit independent family gives 2²¹ bracketings at length
  10.
- **Candidate readings.** The volume offers physical candidate readings (states, the direction of time, hidden
  relations, light). The film presents them as candidates, not laws.

一部约七分半钟的片子：追问金字塔的每一种看法会忘掉什么——一个和、一个均值、一个窗口；沿着隐藏的联合坐标 κ，经过占位金字塔、三种证书、传递闭包、谱矩、未来回复、接缝与括号。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-055-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S1/Words/AdmissibleWords/PathStableSetPolytope` has a state file at the subject commit.
    - Its `convexHull_three_pyramid` states that the convex hull of the five legal three-bit words is exactly
      {x ≥ 0, x₀+x₁ ≤ 1, x₁+x₂ ≤ 1}: a pyramid with a square base and one apex.
    - The pyramid scene's second line is badged Lean.
  - `D5/S3/Arith/FibonacciAtomic/NativeContinuation/JointLaw` has a state file at the subject commit.
    - Its `native_probability_separation` states that for every n ≥ 3 and 0 < mix < 1, two full-support native laws
      agree on every proper joint table and conditional table.
    - Yet their actual null replies differ in total variation by exactly mix.
    - The future scene's second line is badged Lean.
- **Theory volume, argued but not kernel-checked.** The volume marks its source statements as open reference input.
  Badged as theory:
  - the loops;
  - the κ fibre;
  - the three certificates;
  - the closure algebra and relation spectra;
  - the spectral moment;
  - the quantity identities;
  - the history and dimension counts;
  - the physical candidate readings.
- **Classical tools.** Badged as classical where they carry the narration:
  - independent sets of a path;
  - Fibonacci and Lucas numbers;
  - the path (fence) occupancy polytope (Stanley, *Two Poset Polytopes*, 1986, cited in the volume).
- **Open.** How far the bracket address cubes reach is open. That line is badged open.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Index and loops.**
    - The window counts for j ≤ 5.
    - The independent sets.
    - Both loops as kernels of the composition and occupancy maps.
  - **Pyramid and κ.**
    - The pyramid's volume and face, edge and vertex counts.
    - The κ fibre bounds and width, Δ = rκ − XY and the conditional covariance, on 2000 random laws.
  - **Future and closure.**
    - The native continuation table and the parity archive.
    - The same-point counterexample.
    - The closure coordinates, relation ranks and spectra.
  - **Moment and quantity.**
    - The spectral moment on 2000 random laws.
    - The quantity identities and the two future readings, with det M³ = −1.
  - **Seams and brackets.**
    - The native history counts by direct seam simulation up to L = 5.
    - The stable-set dimensions up to n = 10.
    - The two bracketings of βαβ and 2²¹.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the moving fibre point;
  - the loop arrows;
  - the partition triangles;
  - the trees.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
