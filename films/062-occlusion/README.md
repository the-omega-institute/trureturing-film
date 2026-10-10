# 062 · AURIC FIB ATOM PYRAMID XXXIII · 金字塔 XXXIII：遮挡、第二投影与局部恢复

A film of about 6 minutes, the thirty-third part on the FIB atom pyramid. Its subjects are
`AURIC_FIB_ATOM_OCCLUSION_SECOND_PROJECTION_AND_LOCAL_RECOVERY.md` and
`AURIC_FIB_ATOM_LOCAL_SOURCE_SPLITTING_AND_READOUT_GEOMETRY.md` in trureturing at subject commit `579e742cdd`.

The film asks what an obstacle does: when a blocked ray becomes a second projection, when two projections recover the
whole law, and how a local change splits into a seen part and a hidden part.

- **The square loop.**
  - The base closes the affine loop v∅ + v[2,5] = v[2] + v[5]. It generates the hidden direction d.
  - Each fibre is the segment of κ from max(0, X+Y+Z−1) to min(X, Y).
- **Second projection.**
  - Recording the joint mode adds Q = (X, Y, W) with W = Z + κ.
  - Q is blind to e = (2,−1,−1,−1,1) and reads d as (0, 0, 1). On normalized differences the two blind directions meet
    only at zero.
  - (X, Y, Z, W) inverts exactly: p[2,5] = W − Z, p[3] = Z, p[2] = X − W + Z, p[5] = Y − W + Z,
    p∅ = 1 − X − Y − 2Z + W.
  - Both readings must come from the same law and period.
- **Recovery is injectivity.**
  - A left inverse on a target set exists exactly when the readout is injective there.
  - Each sample of q is one of 0, 2, 3, 5, 7, so a full sample record names every symbol; only the average loses the
    joint part.
  - One sample of xy cannot separate κ = 1/8 from 1/4.
- **Five outcomes of occlusion:**
  - free escape (same fibre);
  - an early detector (second projection);
  - a coherent reflector (readable record);
  - a thermalizing absorber (coarse temperature);
  - an inaccessible environment (equal local outputs).
- **Factorized records.**
  - One readout factors through another exactly when it merges every pair the other merges.
  - If each record is a function of the previous one, indistinguishability only grows.
  - A new record can split a merged pair and still lose others. The volume reads this as an observer's effective arrow,
    not a law of physics.
- **Source splitting.**
  - With the section that keeps κ fixed, v = L(Pv) + κ′d.
  - Changing the section shifts the hidden coefficient by a linear function of the seen change. e[2] − e∅ has κ′ = 0
    but coefficient −1 in another section.
  - At the joint mode, e[2] − e[2,5] is feasible while its seen part e∅ − e[5] and hidden part −d are not.
- **Not elapsed time.**
  - Along p̄ + ε sin λ·d, E[xy] rises and falls and integrates to zero around the loop.
  - For v = e[2,5] − e∅ and K = x − xy, the seen and hidden responses are +1 and −1.
- **One port.**
  - One exact reading separates κ exactly when Δ₁₃K ≠ 0, with error at most ε/|Δ₁₃K|.
  - Scaling the source by r and the sensitivities by 1/r gives the same response.

一部约六分钟的片子：追问遮挡做了什么——被挡住的射线何时变成第二个投影，两个投影何时能恢复整条律，以及一个局部变化怎样分裂成看得见与隐藏的部分。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-062-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen general results.** Each module below has a state file at the subject commit and generality G.
  - `D5/S3/ObserverMemory/Refinement/InterfaceKernelCriterion`.
    - `interface_refinement_iff_kernel_inclusion` states that a coarse readout q factors uniquely through r on effective
      images exactly when r x = r y implies q x = q y.
  - `D5/S3/ObserverMemory/TwoTimeKnowledge`.
    - `knows_of_later_readout_factors_through_earlier` states that if the later readout factors through the earlier
      one, any value known from the later readout was known from the earlier one.
  - The first line of the factorized-records scene is badged Lean.
- **Theory volumes, argued but not kernel-checked.** Both volumes mark their statements as open reference input. Badged
  as theory:
  - the square loop and fibre;
  - the second projection and its inverse;
  - the sample-versus-law remarks;
  - the five outcomes;
  - the effective arrow reading;
  - the source splitting and section change;
  - the non-time and cancellation examples;
  - the one-port bound and the confounding example.
  - The volumes' editor notes keep the ray, absorber and environment readings as modelling proposals. They do not
    certify a physical detector, quantum recovery or a physical arrow of time.
- **Classical tools.** Recovery as a left inverse that exists exactly on injective readouts is badged classical.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Fibre and projections.**
    - The loop and the fibre segment on 200 laws.
    - The second projection's kernel e, Q d, the kernel intersection on mass-zero differences, and the explicit inverse
      on 300 laws.
  - **Recovery and records.**
    - Recovery against injectivity on 100 random maps.
    - Factorized records on 200 random record chains, with new records that split and lose pairs.
  - **Splitting, time and one port.**
    - The splitting on 300 random changes, the section change and the infeasible-parts example.
    - The loop integral and the cancellation example.
    - The one-port inversion and error bound on 200 random readings.
    - The confounding scaling.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the ray and occluder sketches;
  - the five outcome icons;
  - the example change v in the splitting scene;
  - the response bars in the one-port scene.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
