# 032 · AURIC FIB ATOM PYRAMID III · 金字塔 III：黄金五环

A film of about 6¾ minutes, the third part on the FIB atom pyramid. Its subject is §§26–27 of
`AURIC_FIB_ATOM_HIDDEN_RELATIONS_STATISTICS_PHASE_AND_SEAMS.md` in trureturing at subject commit `38b9953a1e`.

The five legal three-position patterns are bent into a ring. The film then follows what changes when the last position
must also respect the first:

- **Counting the ring.**
  - The triangle keeps four configurations and the pentagon eleven.
  - Empty seams number N − 2K, so an odd ring can never alternate.
  - The fullest pentagon patterns each leave exactly one gap.
- **Local versus global.**
  - Probability ½ everywhere makes every edge table legal, but no common source exists.
  - The locally legal but globally impossible region is a simplex of volume 1/(2·N!), which is 1/240 for the pentagon.
- **The weighted ring.** It is a two-by-two trace with value 1 + 5λ + 5λ², and at λ = 1 it gives the Lucas numbers.
- **Three ceilings for the five probabilities.**
  - One shared classical configuration gives 2.
  - Neighbour-orthogonal projectors give √5, with an explicit positive semidefinite certificate.
  - Edge checks alone give 5/2.
- **Records instead of events.**
  - The determinant of a four-record overlap path reproduces the five patterns.
  - The unknown closing overlap lies in a disc that excludes zero.
  - Plus and minus closures have identical parts but only one whole; the smallest repair is 1/10 per edge.
  - The loop phase has a shrinking window, which locks at the golden overlap 1/φ in three dimensions.

一部约六分四十五秒的片子：把五模式的链闭成一个环——每一块都合法，整体却可能不存在，而黄金比例标出锁死的位置。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-032-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen** (state files under `Golden/Frozen/state/` at the subject commit):
  - `D5/S3/Constants/PentagonCosines.pentagon_golden_cosines` states 2cos(π/5) = φ, 2cos(2π/5) = φ⁻¹, their sum is √5,
    and 2cos(2π/5) is irrational. The golden critical overlap is 1/(2cos(π/5)) = 1/φ.
  - `D5/S1/Words/AdmissibleWords/PathStableSetPolytope.convexHull_three_pyramid` and
    `AdmissibleCount.admissibleWord_card_eq_fib` are the recap of the five patterns.
- **Published results cited by the volume** (badged as published):
  - the Klyachko–Can–Binicioğlu–Shumovsky pentagon (arXiv:0706.0126) with five neighbour-orthogonal projectors and sum
    √5;
  - the Cabello–Severini–Winter graph bound;
  - the Cabello–Danielsen–López-Tarrida–Portillo odd-cycle results.
- **Theory volume, argued but not kernel-checked.** Everything else comes from §§26–27 of the hidden-relations volume,
  and the film badges it accordingly:
  - ring counts and parity;
  - the local/global counterexample and the gap simplex;
  - the Lucas trace;
  - the record Gram determinants;
  - the completion disc;
  - the plus/minus templates and repair budget;
  - the phase window and the golden lock.
- **Recomputed for this film** by an independent Python/sympy/numpy/scipy script:
  - **Ring counts.**
    - Three open positions give 5 configurations, the triangle 4 and the pentagon 11.
    - Ring counts for N = 3…8 are 4, 7, 11, 18, 29, 47, which are Lucas numbers.
    - Gaps = N − 2K; K_max = ⌊N/2⌋; the number of maximal configurations is 2 (even N) or N (odd N), for N = 3…9.
  - **Local versus global.**
    - u = ½ has no common source on C₃, C₅ and C₇ (linear-programming infeasibility).
    - det(I + T_N) = 2.
    - A Monte Carlo estimate of the pentagon gap volume is 0.004174, against 1/240 = 0.004167.
  - **Weighted ring.** Z₅ = 1 + 5λ + 5λ², and E[K] → 2.
  - **The √5 bound.**
    - The projector vectors are adjacent-orthogonal.
    - The probability sum is √5, and the leftover is 5 − 2√5.
    - The spectrum of H₅ is {0, 0, 0, (5/2)(√5 − 1) twice}.
    - Random neighbour-orthogonal projector families in ℂ³ never exceed √5.
  - **Record determinants.**
    - det G₄ = 1 − r₁² − r₂² − r₃² + r₁²r₃².
    - Path determinants at r² = −1 are Fibonacci numbers.
    - The positive semidefinite thresholds are 1/(2cos(π/(m+1))).
  - **Completion disc (r = 3/5).**
    - The disc has μ = 81/175, α = 31/175 and min |c| = 2/7.
    - With c set to 0, det = −32/625.
  - **Plus and minus templates (r = 3/5).**
    - det G₊ = 11/3125 and det G₋ = −961/3125.
    - wᵀG₋w = −1 for w = (1, −1, 1, −1, 1).
    - All proper principal blocks of G₊ and G₋ are positive definite with identical spectra.
    - The repair at ±1/2 has minimum eigenvalue 0.
  - **Loop phase.**
    - det G₅ = 1 − 5r² + 5r⁴ + 2r⁵cos Φ, checked on random complex instances.
    - At r = 3/5 the window is θ* = arccos(475/486) = π − 5 arccos(5/6) ≈ 0.21316 rad.
  - **Golden lock.**
    - r_max(N) = 1/(2cos(π/N)) with rank N − 2 for N = 3…6.
    - The golden records have adjacent overlap 1/φ, two-step overlap 0 and rank 3.
    - j ↦ 2j maps C₅ onto its complement.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating cone views;
  - the configuration cycling;
  - the sliding repair and phase animations;
  - the bar heights, which are drawn to scale only where labelled.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
