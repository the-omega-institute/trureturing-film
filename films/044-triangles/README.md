# 044 · AURIC FIB ATOM PYRAMID XV · 金字塔 XV：关系三角形与反演精度

A film of about 6.75 minutes, the fifteenth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_MOMENT_TRIANGLES_AND_INVERSE_PRECISION.md` in trureturing at subject commit `7adc9b1326`.

When a boundary recovers the interior uniquely, it does not follow that it recovers it stably. The gap between the
two is measured by triangles: the thinner the triangle that three sources make, the more precision it takes to tell
them apart. The film follows that thread:

- **Free parameter.**
  - Three pyramid means leave the joint chance κ free.
  - A product-of-activities source forces κ = XY/(1 − Z). The model constraint carries information of its own.
- **Posterior.**
  - One hidden depth k governs a run, and the next letter is α with chance r_k = F(k+1)/F(k+3).
  - After A alphas and B betas the posterior weighs depth k by r^A (1 − r)^B.
  - The first two entries of the remaining length law give the first two moments. Their ranges [1/3, 2/5] and
    [3/5, 2/3] reveal the active phase.
- **Two moments.**
  - Within one installed prior, equal first and second moments force equal posteriors.
  - The log ratio changes sign at most twice, so a quadratic can match its sign.
  - Two exact numbers fix the posterior only on this restricted family.
- **The moment curve.**
  - A depth mixture reads as a weighted center of points (r, r²) on a parabola.
  - The height above the curve is the variance m₂ − m₁², which is what a shared source leaves behind.
- **Triangles.**
  - Three rates a, b, c give area 𝒜 = ½(b − a)(c − a)(c − b).
  - The weights are recovered exactly from the two moments, but each is divided by rate differences, so a thin
    triangle magnifies every error.
- **Gram determinant.** det H₂ = 4 Σ ν_a ν_b ν_c 𝒜² = det Cov(r, r²), which is positive exactly when at least three
  rates carry weight.
- **Likelihood triangles.**
  - In the (log r, log(1 − r)) plane the same rates make a triangle of opposite orientation.
  - The local inverse area −det J is a sum of reading area times likelihood area with no cancellation.
  - On [1/3, 2/5] it is pinned between 625/72 and 81/8 of det H₂.
- **Pyramid.** The covariance determinant of low, high and middle equals p₂ times a sum of four triple products: the
  four tetrahedra of the apex with three base corners.
- **Fibonacci areas.**
  - Three consecutive depths make a triangle of area 1/(2(F(n+3) F(n+4) F(n+5))²).
  - That is 1/28800 for depths 1, 2, 3, and below 10⁻¹⁵ for depths 10, 11, 12. It is never zero but decays like
    φ^(−6n).
- **Exact is not uniform.**
  - The complete remaining length law recovers phase and posterior exactly.
  - Across the rate interval the law moves by at most 12/7 of the rate change, so neighbouring depths give nearly
    identical futures.
- **Records.**
  - Three record vectors built from 1, r and r² have exactly the moment Gram matrix.
  - Their volume can approach zero while staying positive.
  - The next update after an α already needs the third moment.

一部约六分四十秒的片子：边界能唯一恢复内部，不等于能稳定恢复；三个来源组成的三角形越薄，分辨它们就需要越高的精度——唯一、稳定、可取得，是三道不同的门。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-044-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Observer/ProbabilisticClosure/TrajectoryLaws/FourthSegmentLawRecovery` has a state file at the subject
    commit.
  - Its `complete_original_recovery` states that equal remaining length laws are equivalent to the same phase with
    the same depth posterior, and to the same transcript law.
  - The length-law scene is badged Lean while it states this.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the activity-product constraint;
  - the phase ranges;
  - the two-moment theorem;
  - the moment curve and variance;
  - the triangle weight recovery;
  - the Gram identity;
  - likelihood orientation and the inverse-area bounds;
  - the pyramid covariance determinant;
  - the Fibonacci areas;
  - the total-variation bound;
  - the record vectors and the update rule.
- **Classical background.** The moment problem, Vandermonde and Gram determinants, and exponential-family
  likelihoods are named as background.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Constraint and posterior.**
    - κ = XY/(1 − Z).
    - The rate ranges.
    - The 196 posteriors under one prior have no (m₁, m₂) collision.
    - Positive variance.
  - **Triangles and Gram.**
    - Exact three-point weight recovery in 30 cases.
    - det H₂ = Σ ννν Δ² = det Cov in 20 cases.
  - **Likelihood and inverse area.**
    - Negative likelihood orientation.
    - The −det J sum.
    - The ratio range: observed 8.870 to 9.369 inside [8.681, 10.125].
  - **Pyramid and Fibonacci.**
    - The pyramid determinant formula.
    - The three Fibonacci areas.
    - The φ^(−6n) ratio.
  - **Total variation.**
    - The 12/7 bound on 40 pairs.
    - The adjacent-depth values 0.0980, 0.0366 and 0.0141.
  - **Moments.**
    - A signed four-rate measure with zero 0th–2nd moments.
    - The α-update m₁ → m₂/m₁, m₂ → m₃/m₁.
- **Illustrative visuals.** These are illustrations, not data:
  - the animated sample triangles;
  - the sheared display of the likelihood plane, which preserves orientation;
  - the rotating pyramid.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters and digits whole when wrapping Chinese subtitles.
