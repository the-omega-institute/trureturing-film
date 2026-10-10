# 053 · AURIC FIB ATOM PYRAMID XXIV · 金字塔 XXIV：约数尺度与多边形关联

A film of about 8 minutes, the twenty-fourth part on the FIB atom pyramid. Its subjects are
`AURIC_FIB_ROBIN_DIVISOR_SCALE_GEOMETRY.md` and `AURIC_FIB_DIVISOR_POLYGON_ASSOCIATION_BOUNDARY_GEOMETRY.md` in
trureturing at subject commit `e7f05678df`.

Every divisor gets a shape: a sublattice, a shrunken polygon, a box, a phase and a point in a hexagonal prism. All of
them read σ(n)/n. Labels, directions, independence and one association bit decide which questions each shape can
answer.

- **Sublattices.**
  - The subgroups of (ℤ/n)² closed under both M(u,v) = (v, u+v) and ∂(u,v) = (v, 0) are exactly dVₙ, with scale 1/d.
  - Modulo 5, the line t(1,3) is M-closed but not ∂-closed.
- **Similar shapes.**
  - Each length ratio, square-rooted area ratio and cube-rooted volume ratio reads 1/d, and the labeled sum is σ(n)/n.
  - For 6 the sum is 2, but the union has area 1.
- **Prime boxes.**
  - The box with side 1 + 1/p + … + p^(−a) in each prime direction has volume σ(n)/n.
  - Examples: 7/4 · 4/3 = 7/3 for 12, and 12/5 for 30.
  - Telescoping gives saturation times truncation, for example 3 · 7/9. The perimeter 37/6 plays no part.
- **Phases.**
  - Independent per-prime phase circles average |A|² to σ(n)/n.
  - One shared phase for 2 and 3 gives 2 + 2/√6.
  - Five unit steps close a pentagon with diagonal/side = φ, but that does not supply e^γ.
- **The window prism.**
  - Window positions send the 60 divisors of 5040 onto all 48 lattice points of a hexagonal prism of area 9 and
    volume 18.
  - Twelve points carry two divisors. At (1,0,1) sit {7, 10}, with weight 17/70.
- **The association bit.**
  - Multiplying by 5 keeps 7 inside (35 | 5040) but not 10 (50 ∤ 5040).
  - κ restores the block configuration, and the complement becomes (5−u, 2−v, 2−w; 1−κ).
  - Under the uniform law the positions leave 2/5 bit unknown.
- **The Robin ratio.**
  - R(5040) ≈ 1.0056, R(10080) ≈ 0.986 and R(55440) ≈ 0.983.
  - Layer gains are 1 + (p−1)/(p(p^(a+1)−1)).
  - With primes 2, 3, 5 and 7, σ(n)/n < 35/8, so the danger ends by about 116143.
- **Price lines.**
  - Z(n)/n^(1/25) is uniquely maximal at 5040.
  - So is τ(n)/n^(3/10), with 60 divisors, of which window positions see 48.
- **The prefix ledger.**
  - log R(5040) = 0.233 − 0.131 − 0.096 = +0.0055.
  - The scale term is negative for 11 and positive for 2²⁰.
  - Since limsup R = 1, no fixed gap holds.
- **Concavity.**
  - The boundary γ + log log x is concave.
  - Safe endpoints alone do not make the points between them safe.
- **The open target.** One joint gap for every n > 5040, with all terms taken from the same integer.

一部约八分钟的片子：每个约数都得到一个形状——子格、缩小的多边形、盒子、相位，以及六棱柱里的一个点；它们读出的都是 σ(n)/n，而标签、方向、独立性和一个关联比特，决定了每种形状能回答哪些问题。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-053-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Arith/Robin/SevenSmooth` has a state file at the subject commit. Its `robin_seven_smooth` covers every
    2ᵃ3ᵇ5ᶜ7ᵈ > 5040. The samples scene's third line is badged Lean.
  - `D5/S3/Arith/GoldenResourceOptimalInteger` has a state file at the subject commit. Its
    `golden_resource_unique_optimum` states that log Z(n) − (1/25) log n is maximal exactly at n = 5040 among all
    positive integers. The prices scene's first line is badged Lean.
- **Published.** These lines are badged as published:
  - Robin's criterion (1984);
  - Ramanujan's highly composite thresholds (1915) for τ(n)/n^(3/10);
  - Gronwall's limsup R(n) = 1 (1913).
- **Theory volumes, argued but not kernel-checked.** Badged as theory:
  - the lattice-to-scale bridge;
  - the template and box identities;
  - the phase realization;
  - the window prism and its fibre weights;
  - the association bit and complement;
  - the layer gains and saturation threshold;
  - the prefix ledger;
  - the concavity comparison;
  - the joint target.
- **Classical tools.** Similarity scaling, finite geometric sums, Fourier orthogonality and the pentagon ratio are
  classical. They are badged as classical where they carry the narration.
- **Open.** The joint gap for all n > 5040 is equivalent to the Riemann hypothesis, which is open. The gap scene is
  badged open.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Lattices and shapes.**
    - The closed subgroups by brute force for n = 2 to 8, and the V₅ line.
    - The label and box identities.
    - The phase averages on exact grids for 6, 12, 5040, 10080 and 55440, and the shared-phase value.
    - The pentagon ratio.
  - **Robin ratio.**
    - R at three samples.
    - The layer factor at four cases, and the 116143.04 threshold.
    - The three-term ledger of 5040 and the signs of L(11) and L(2²⁰).
  - **Price lines.** Both price optima, by sieving every n up to 400000.
  - **The prism.**
    - The 48-point prism with area and volume, and the 12 two-point fibres.
    - The general capacity formula for every box up to (3,2,3,3).
    - The continuation, the 2/5-bit entropy and the complement map.
    - The rank polynomial.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating box and prism;
  - the phase arrows;
  - the gain bars, which use real values for p = 2 at an arbitrary scale;
  - the concave-plane sketch, whose example points are schematic.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
