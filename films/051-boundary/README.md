# 051 · AURIC FIB ATOM PYRAMID XXII · 金字塔 XXII：原子边界演算

A film of about 7½ minutes, the twenty-second part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOMIC_BOUNDARY_CALCULUS.md` in trureturing at subject commit `eefbcdeb40`.

A boundary rebuilds what lies inside only when it keeps four things: a local law, a starting value, its seams and a tail
that has not vanished. The film follows that rule from a list of numbers to the divisors of 5040, and on to the
seven-smooth case of Robin's inequality.

- **Differences.**
  - Increments plus a first value rebuild every term. Without the first value the list is fixed only up to a constant.
  - Layered sums give N(N+1)/2 and N(N+1)(2N+1)/6.
- **Corners.**
  - One atom is four accumulated corners in two dimensions, eight in three and 2ʳ in r.
  - One set of corners returns one atom, not the whole box.
- **Cones.**
  - Area is ½ Σ h·edge and volume is ⅓ Σ h·face. A moment of degree r divides by d + r.
  - The triangle (−1,−1), (3,−1), (−1,2) has area 6 and first moment 2. Its mirror has moment −2.
- **Windows.**
  - With seams, n FIB windows carry F₃ₙ₊₂ words: 1, 5, 21.
  - The finite generating sum has two end terms. They vanish only for |z| < φ⁻³, where the sum is (1+z)/(1−4z−z²).
  - Σ F_k² = F_N·F_{N+1}.
- **Divisors.**
  - The 60 divisors of 5040 = 2⁴·3²·5·7 form a 5×3×2×2 box. Accumulating 1/d gives σ(n)/n.
  - Sixteen Möbius-signed readings return the top atom 1/5040.
- **Outer endpoints and phases.**
  - Sixteen outer endpoints of Π(1 − x^m) rebuild all 60 support terms.
  - Per-prime phase grids of 5, 3, 2 and 2 angles average to σ(n)/n = 403/105. One shared phase keeps 548 pairs.
- **Strips.**
  - Each prime is a labeled strip under 1/(1 − t). For 5040 the four strips add to log(403/105).
  - Finite cuts give strict lower bounds. A computable tail budget gives the upper bound.
- **Dirichlet.** Σ σ(n)/n · n⁻ˢ = ζ(s)ζ(s+1) for Re s > 1. It diverges at s = 1.
- **Robin.**
  - The margin is γ + log log log n − log(σ(n)/n), bounded with rational intervals.
  - 5040 has margin ≈ −0.0055 and 10080 has margin ≈ +0.014.
  - For seven-smooth n, σ(n)/n < 35/8, which is safe from 120000 on. Below that, three segments of 72, 121 and 270
    numbers are checked exactly.
- **The gap.**
  - For all n the question is the Riemann hypothesis.
  - 720720 has σ(n)/n = 3224/715 > 35/8. This marks the edge of the method, not a counterexample.

一部约七分半钟的片子：边界要重建内部，必须带着局部规律、起点、接缝和尾项；从一列数到 5040 的约数，再到七光滑数的 Robin 不等式。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-051-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Arith/Robin/SevenSmooth` has a state file at the subject commit.
  - Its `robin_seven_smooth` states that every n = 2ᵃ3ᵇ5ᶜ7ᵈ > 5040 satisfies σ(n)/n < e^γ log log n.
  - The robin scene's second line is badged Lean, and the finale names it.
- **Published.** Robin's criterion (1984), that the Riemann hypothesis is equivalent to the inequality for every
  n > 5040, is a published result. That line is badged as published.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the difference and corner reconstructions;
  - the cone moments;
  - the window identity and its disc;
  - the divisor bridges, outer endpoints and phase grids;
  - the strips and tail budget;
  - the volume's own 35/8 certificate and its segments;
  - the 720720 boundary.
- **Classical tools.** Möbius inversion and the product ζ(s)ζ(s+1) are classical. They are badged as classical where
  they carry the narration.
- **Open.** Robin's inequality for every n > 5040 is the Riemann hypothesis, which is open. The gap scene is badged
  open.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Sums.** The layered sums, F₃ₙ₊₂, the generating identity and the Fibonacci-square rectangle.
  - **Geometry.** The corner inclusion–exclusion, and the triangle area and moments with their mirror.
  - **Divisors of 5040.** The divisor box, the Möbius readings, the outer-endpoint rebuild, the phase average and the
    548 shared-phase pairs.
  - **Strips.** The strip sum, with lower and upper bounds.
  - **Robin.**
    - The Robin margins of 5040 and 10080 in exact rational intervals.
    - The seven-smooth bound 35/8 and its 120000 threshold.
    - The segment counts 72, 121 and 270.
    - σ(720720)/720720 = 3224/715.
- **Illustrative visuals.** The rotating boxes, cone fans, strip shading and phase dials are illustrations, not data.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
