# 058 · AURIC FIB ATOM PYRAMID XXIX · 金字塔 XXIX：输出分辨闭包与接缝曲率

A film of about 7 minutes, the twenty-ninth part on the FIB atom pyramid. Its subjects are
`AURIC_FIB_ATOM_OUTPUT_RESOLVED_INSTRUMENT_CLOSURE.md` and
`AURIC_FIB_ATOM_SEAM_BILINEAR_CURVATURE_AND_OUTPUT_FUTURE_QUOTIENT.md` in trureturing at subject commit `0a1bb0a4f1`.

The film asks where a hidden relation shows itself: in a product, in an action, or only in the labels of what an
instrument reports.

- **The hidden reaction.**
  - The hidden direction d = (1, −1, 0, −1, 1) is the exchange ∅ + [2,5] ⇌ [2] + [5]. It keeps X, Y and Z and changes
    only κ.
  - Every function splits as f = f_edge + J(f)·xy.
- **Seam curvature.**
  - The visible span {1, x, y, z} is not closed under multiplication. Its product defect is Ω(f, g) = J(fg) = a₁b₂ + a₂b₁.
  - On the two ends Ω has matrix [[0, 1], [1, 0]], with eigenvalues ±1.
  - One product closes the span: (x + z)(y + z) = xy + z, so κ = E[UV] − Z.
- **Actions reveal.**
  - An action reveals κ exactly when a pulled-back visible function has a nonzero four-corner difference.
  - In the volume's example, x after the move reads (1, 0, 0, 0, 1) with J = 2. Two laws with equal means give E[x′] = 0.3
    and 0.7.
- **How long it hides.** For one linear update and readout, what no reading up to step m sees is the orthogonal
  complement of the observable Krylov space. The tower grows strictly at most n − rank C times.
- **Output labels.**
  - The two-step instrument reports x, jumps to [2] if y = 1 and to ∅ otherwise, then reports x again.
  - Its four records have probabilities 1 − X − Y + κ, X − κ, Y − κ and κ.
- **The average hides.**
  - The averaged kernel keeps the visible span closed (K1 = 1, Kx = y, Ky = Kz = 0).
  - The branches leak and cancel: M₁x = xy and M₀x = y − xy.
  - Two steps expose κ, and the record-only closure grows 1 → 2 → 4.
- **Bayes form.** E[κ | E] − E[κ] = c_E·Var(κ)/E[Q_E]. With κ equally likely 0.1 or 0.3, the record (1, 1) moves the mean
  from 0.2 to 0.25.
- **Three layers.** Sensitivity needs one of three things, and none replaces another:
  - a nonzero four-corner difference;
  - a nonzero cross coupling;
  - a record word that the hidden direction does not annihilate.
- **Predict is not maintain.**
  - [2] and [2,5] report the same x. Action L keeps the first safe and action R keeps the second.
  - The merged belief has no common safe action, so the greatest safe fixed point is {∅, {A}, {D}}.
- **Time and 5040.**
  - A strict time order exists exactly on acyclic transition graphs.
  - The reading u = a₂ + a₇, v = a₃, w = a₅ + a₇ hides a₇: 7 and 10 both read (1, 0, 1), and 7200, 5040 and 3528 all read
    (5, 2, 2).

一部约七分钟的片子：追问隐藏关系在哪里显形——在一个乘积里，在一个动作里，还是只在仪器报告的输出标签里；以及为什么平均闭合时，各分支仍可能泄漏 κ。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-058-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen general results.** Each module below has a state file at the subject commit and generality G.
  - `D5/S3/ObserverMemory/Dynamics/FiniteObservabilityOrthogonalDuality`.
    - `finite_unobservable_eq_observable_orthogonal` states that, for a linear map T and readout C on finite-dimensional
      inner-product spaces, the intersection of ker(C Tᵏ) over k ≤ m is the orthogonal complement of the observable
      Krylov space.
  - `D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound`.
    - `observable_krylov_strict_growth_bound` states that the number of strict growth steps of that space is at most
      dim V − rank C.
  - `D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability`.
    - `observable_krylov_once_stable_permanently` states that once two consecutive stages agree, all later stages agree.
  - Both lines of the horizon scene are badged Lean.
  - These are single-operator results. The volumes' output-labelled instruments use several sub-kernels and are
    argued in theory.
- **Theory volumes, argued but not kernel-checked.** Both volumes mark their statements as open reference input. Badged
  as theory:
  - the reaction picture and the edge decomposition;
  - the seam form and the one-product closure;
  - the action criterion and its example;
  - the instrument and its record law;
  - the cancellation between output branches;
  - the three layers;
  - the safety example;
  - the 5040 exponent analogue.
  - The volumes call the control model and the instrument abstract constructions, not native FIB dynamics.
- **Classical tools.** Badged as classical where they carry the narration: Bayes' rule, and strict time orders on
  acyclic graphs (topological order).
- **Open.** The volume's candidate definition of life (a selective future quotient, an executable memory update and safe
  feasible control) is an open model, not a law. That line is badged theory and stamped OPEN MODEL.
- **Not shown.** The volumes' proposed Lean files (`SeamBilinear.lean`, `InstrumentClosure.lean`,
  `FIBNativeBridge.lean`) do not exist at the subject commit.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Seam and action.**
    - The reaction direction and the edge decomposition on 300 random functions.
    - The seam form symbolically, its Gram matrix and eigenvalues, the product closure, and κ from E[q²] for general
      weights on 300 random laws.
    - The action example and its two laws.
  - **Horizon and instrument.**
    - The Krylov growth bound and permanent stability on 3000 random linear systems.
    - The instrument's sub-kernels, averaged kernel and record law on 500 random laws, and its closure dimensions.
  - **Bayes, safety, time and 5040.**
    - The Bayes example, exactly.
    - The greatest safe fixed point of the safety example.
    - Strict time orders on 300 random graphs.
    - The 5040 exponent fibres, including 7200, 5040 and 3528.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the blinking output lamps;
  - the cancelling blocks;
  - the bar heights in the reaction and record scenes, which use example laws.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
