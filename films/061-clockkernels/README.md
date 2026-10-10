# 061 · AURIC FIB ATOM PYRAMID XXXII · 金字塔 XXXII：局部时钟核与接缝可见性

A film of about 5½ minutes, the thirty-second part on the FIB atom pyramid. Its subjects are
`AURIC_FIB_ATOM_LOCAL_CLOCK_KERNEL_AND_OUTPUT_RESOLVED_SEAM_VISIBILITY.md` and
`AURIC_FIB_ATOM_LOCAL_CLOCK_CAUSAL_FIELD_AND_FIBER_DYNAMICS.md` in trureturing at subject commit `32fb7448f8`.

The film asks what a local clock can see: when a rate, a mean, a waiting law or a whole history reveals the seam, and
whether a hidden seam has really been erased.

- **Clock kernels.** Each state carries a waiting law K_s. The mixed law is C₀ + κ·Curv_K with
  Curv_K = K∅ − K[2] − K[5] + K[2,5]. With known kernels the clock separates the fibre exactly when Curv_K ≠ 0. For means
  the test is Curv_m.
- **Rate, mean, law.**
  - With exponential waits at rate a + bx + cy + dz, the rates have zero four-corner difference, so the initial hazard
    rate is blind.
  - The survival curve carries κ·e^(−at)(1 − e^(−bt))(1 − e^(−ct)) > 0.
  - In this example the mean also sees κ: Curv_m = bc(2a + b + c)/(a(a+b)(a+c)(a+b+c)) > 0.
  - A mean can be blind while the law is not. If null waits 0 or 2 with equal chance and every other state waits exactly
    1, all means are 1 and Curv_K = ½δ₀ + ½δ₂ − δ₁ ≠ 0.
- **History order.**
  - The resolution order is the first history length with a nonzero kernel difference, or ∞.
  - A bounded prefix is not enough.
  - On one common path space, equal finite prefix laws give equal infinite laws.
- **Hidden or leaking.**
  - On five states under a mass-preserving linear generator L, PLd = 0 forces Ld = λd and the seam stays hidden
    forever.
  - PLd ≠ 0 makes it visible after any short time, at rate s·PLd.
  - A nonlinear leak (κ − 1/4)² varies with κ yet reads the same at 0 and ½.
- **Hidden is not erased.**
  - A linear readout has three cases: dT = 0 (erased in the carrier), dT ≠ 0 with R(dT) = 0 (kept, unobserved), and
    R(dT) ≠ 0 (visible).
  - If both output branches reset to null, then dT = 0, yet output one fires with probability exactly κ.
- **The occluded ray.**
  - Removing the ray from the accessible records does not make every other port blind.
  - All-zero responses do not prove the ray left: an identity process read by constant tests sees nothing.
- **Loops and paths.**
  - Swapping [2] and [5] is not the identity, yet it fixes the uniform law and [3].
  - Two paths, to null and to [3], give R d = 0 while P R p = (0, 0, −1) for every law.
- **Two windows.** On the 25-state pair carrier:
  - cross-window first-order moments see 16 directions and hide 9;
  - separate means see 7 and hide 18;
  - both full marginals see 9 and hide 16.

一部约五分半钟的片子：追问局部时钟能看见什么——速率、均值、等待律与整段历史分别何时揭示隐藏接缝，以及看不见是否等于已被消除。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-061-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen general results.** The module below has a state file at the subject commit and generality G.
  - `D5/S3/ObserverMemory/Dynamics/FiniteObservabilityOrthogonalDuality`.
    - `finite_unobservable_eq_observable_orthogonal` states that, for one linear map T and readout C on
      finite-dimensional inner-product spaces, the intersection of ker(C Tᵏ) over k ≤ m is the orthogonal complement of
      the observable Krylov space.
  - The first half of the dynamics scene's second line is badged Lean.
  - The five-state generator criterion is argued in theory.
- **Theory volumes, argued but not kernel-checked.** Both volumes mark their statements as open reference input. Badged
  as theory:
  - the clock-kernel criterion and the mean criterion;
  - the exponential and mean-blind examples;
  - the resolution order;
  - the generator criterion and the nonlinear example;
  - the erasure cases and the reset example;
  - the occluded ray;
  - the holonomy and path-difference examples;
  - the window counts.
  - The volumes' editor notes keep these to fixed known kernels, exact laws and declared carriers. Clock and curvature
    language is a modelling proposal, not a physical identification.
- **Classical tools.** The step from equal finite prefix laws to equal infinite laws (finite cylinders and measure
  uniqueness) is badged classical.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Kernels, rates and means.**
    - The kernel mixture and the mean formula on 300 random kernels.
    - The exponential example on 300 random rate sets, including the survival coefficient and Curv_m.
    - The mean-blind example.
  - **History and dynamics.**
    - A bounded-prefix counterexample.
    - The generator criterion: U_a − I has Ld = −d, and 300 random generators leak at rate s·PLd.
    - The nonlinear example.
  - **Erasure, loops and windows.**
    - The reset example.
    - The holonomy and path-difference examples.
    - The window ranks 16, 7 and 9.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and the clock dial;
  - the example kernels in the kernel scene;
  - the resolution-order dots;
  - the leak curve;
  - the ray sketch;
  - the cylinder tree.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
