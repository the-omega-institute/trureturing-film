# 035 · AURIC FIB ATOM PYRAMID VI · 金字塔 VI：星形、三角与记忆

A film of about 6½ minutes, the sixth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_RESPONSE_TRIANGLE_AND_INTERNAL_MEMORY.md` in trureturing at subject commit `8064a2b440`.

The five legal patterns of one ordered atom are wired together, and the film asks what an observer at the boundary
can learn about the inside:

- **The action graph.**
  - Single legal bit flips connect the empty pattern to the low, high and middle patterns. Low and high both connect
    to the joint pattern.
  - The result is a square with a stalk, five edges. The occupancy pyramid has eight edges.
  - Mixing edges, action edges and response edges are three different objects.
- **Edge energy.**
  - The energy is E(u) = ½ Σ c_ij (u_i − u_j)², and the response is j = Lu.
  - Responses sum to zero. Adding a constant changes nothing, and u ↦ −u reverses j.
- **Star to triangle (Kron elimination).**
  - A hidden centre with arms cᵢ settles at the weighted mean.
  - The boundary then sees couplings g_ij = cᵢcⱼ / C between every pair of ends.
- **Triangle to star.**
  - Every positive triangle comes from exactly one three-armed star, with c₁ = g₁₂ + g₁₃ + g₁₂g₁₃/g₂₃.
  - Weights 1, 2, 3 give arms 11/3, 11/2, 11.
  - A static boundary experiment cannot separate a real triangle from a hidden centre.
- **The four-end test.**
  - With four ends, a hidden centre forces g₁₂g₃₄ = g₁₃g₂₄ = g₁₄g₂₃. Arms 1, 2, 3, 6 give 1/4 three times.
  - m arms leave m(m − 3)/2 constraints.
- **Acute response triangles.**
  - For a star, the effective resistance is R_ij = rᵢ + rⱼ.
  - With side lengths √R, each corner's cosine numerator is rᵢ > 0, so the triangle is acute.
  - 4A² = r₁r₂ + r₁r₃ + r₂r₃, and the general simplex volume is V²_{m−1} = (Π rᵢ)(Σ 1/rᵢ)/((m − 1)!)².
- **Hiding the empty pattern.**
  - With unit action edges, the empty pattern settles at (u₁ + u₂ + u₃)/3.
  - Three edges of weight 1/3 appear between low, high and middle, and the boundary Laplacian is Λ = ⅓[[5, −1, −3, −1], [−1, 5, −3, −1], [−3, −3, 6, 0], [−1, −1, 0, 2]].
  - The loop count goes from 1 to 2 while the boundary response is unchanged.
- **The response tetrahedron.**
  - The effective resistances are 1, 3/4, 3/4, 7/4, 7/4 and 2.
  - With J as reference, the Gram determinant is 3/4 and the tetrahedron volume squared is 1/48.
  - The occupancy pyramid has volume 1/3. These are two readouts, not one space.
- **Schur complement.**
  - Eliminating interior nodes gives Λ = L_BB − L_BI L_II⁻¹ L_IB, and the order does not matter.
  - Hiding the empty and joint patterns gives the same three-node boundary [[7/6, −5/6, −1/3], [−5/6, 7/6, −1/3], [−1/3, −1/3, 2/3]] either way.
  - A shared seam variable or a relation that will be read later cannot be eliminated away.
- **Internal memory.**
  - With mass m, the centre relaxes with τ = m/C, and the boundary response is a convolution with e^(−t/τ).
  - For three unit arms and a step on the first end, the response starts at (1, 0, 0) and settles to
    (2/3, −1/3, −1/3).
  - In frequency, Λ(s) = diag(cᵢ) − ccᵀ/(C + ms): one pole and a rank-one correction.
  - The currents sum to mẏ during the transient.
- **The golden ladder.**
  - R₀ = 1 and R_{n+1} = 1 + R_n/(1 + R_n) give 1, 3/2, 8/5, 21/13, … = F₂ₙ₊₂/F₂ₙ₊₁ → φ.
  - The update matrix [[2, 1], [1, 1]] is the square of the Fibonacci matrix.
  - With series unit a and parallel unit b, the limit is (a + √(a² + 4ab))/2. So a = 1, b = 2 gives 2, and the golden ratio depends on the rule.

一部约六分四十秒的片子：把五种合法模式用导线连起来——隐藏的中心化成三角形，三角形里可以藏着星形，有质量的中心会记忆，而单位电阻梯的极限是黄金比例。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-035-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** The state file `Golden/Frozen/state/D5/S1/Words/AdmissibleWords/PathStableSetPolytope.lean.json`
  exists at the subject commit. `D5/S1/Words/AdmissibleWords/PathStableSetPolytope.convexHull_three_pyramid` states
  that the convex hull of the five legal occupancy vectors is {x ≥ 0, x₀ + x₁ ≤ 1, x₁ + x₂ ≤ 1}, the square pyramid
  with apex at the middle pattern. Its volume 1/3 is recomputed here; it is not itself a Lean statement.
- **Classical tools named in the volume** (badged as classical): Kron elimination of a star, used for the
  star-to-triangle formula, and the Schur complement as the complete static boundary.
- **Theory volume, argued but not kernel-checked.** Every theorem in the volume carries `Claim status: open`, and the
  film badges these as theory:
  - the action graph and the three edge semantics;
  - the triangle-to-star inversion (classically known as the Y–Δ transform);
  - the four-end product test and the m(m − 3)/2 count;
  - acute response triangles and the area and simplex-volume formulas;
  - the empty-pattern elimination, Λ, the resistance matrix and V² = 1/48;
  - the memory kernel, the one-pole rank-one formula and Σ j = mẏ;
  - the ladder recursion and its general fixed point.
- **Recomputed for this film** by an independent Python/sympy script:
  - **Graph and pyramid.** The legal occupancies with xz = yz = 0 are exactly five, the single-flip edges are exactly
    O–L, L–J, J–R, R–O and O–T, and ∫₀¹ (1 − t)² dt = 1/3.
  - **Elimination.**
    - Symbolically, the star minimizer is the weighted mean and the boundary energy is Σ cᵢcⱼ(uᵢ − uⱼ)²/(2C).
    - Symbolically, the inversion formulas give back g₁₂, g₁₃ and g₂₃.
    - g = (1, 2, 3) gives c = (11/3, 11/2, 11).
  - **Four-end test.** Arms (1, 2, 3, 6) give the couplings 1/6, 1/4, 1/2, 1/2, 1, 3/2, with all three opposite
    products equal to 1/4.
  - **Acute triangles.**
    - R_ij = rᵢ + rⱼ by grounded solves.
    - The cosine numerators equal rᵢ.
    - Heron's formula gives 4A² = Σ rᵢrⱼ, which is 7/8 for r = (1, 1/2, 1/4).
    - The Gram determinant equals (Π rᵢ)(Σ 1/rᵢ) symbolically for m = 3, 4, 5.
  - **Five patterns.**
    - The Schur complement equals Λ, and u_∅ = (u₁ + u₂ + u₃)/3.
    - The effective resistances match the table and are the same before and after elimination.
    - det G = 3/4 and V² = 1/48.
    - The cycle rank is 1 before elimination and 2 after.
    - Sequential and joint elimination of ∅ and 13 agree.
  - **Memory.**
    - y(t) = (1 − e^(−3t/m))/3, with currents (1, 0, 0) at t = 0 and (2/3, −1/3, −1/3) as t → ∞.
    - Σ j = mẏ.
    - Λ(s) − Λ(0) = ms/(C(C + ms)) · ccᵀ, and Λ(0) equals the static star elimination.
  - **Ladder.**
    - R_n = F₂ₙ₊₂/F₂ₙ₊₁ for n ≤ 11, and R₁₁ − φ ≈ −5.4 × 10⁻¹⁰.
    - [[2, 1], [1, 1]] = [[1, 1], [1, 0]]².
    - The positive fixed point of X = a + bX/(b + X) is (a + √(a² + 4ab))/2.
- **Illustrative visuals.** These are illustrations, not data:
  - the current pulses and node bars;
  - the hub's vertical motion;
  - the time axis of the memory plot, which uses m = C = 3;
  - the s-plane pole marker;
  - the ladder drawing and the rotating solids.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
