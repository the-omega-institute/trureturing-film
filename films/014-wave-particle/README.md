# 014 · WAVE · PARTICLE · EVENT · 波粒整体

A film of about 5 minutes on trureturing's theory volume
`docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_WAVE_PARTICLE_EVENTS.md` ("波粒整体的关系全息表示",
18,518 lines).

The volume does not ask whether light is a wave or a particle. It treats transport, clock,
instrument and record as one relation, and treats a *particle event* as a record written at a
declared interface and a declared time. It then follows that idea through clicks, dark spaces, the
Zeno effect, certification, waiting times and recursive memory.

一部约 5 分钟的"波粒整体"专题：不问"它是波还是粒子"，而把粒子事件看作声明接口上的记录。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-014-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does not claim · 不主张

- **The volume is a paper argument and adds no Lean itself.** The eight frozen modules in the table
  below are separate Lean modules. They formalize results that match §5 and §13 (records, dark
  space, survival limit and general-instrument closure). They are shown because they are the
  kernel-checked counterpart, not because the volume produced them.
- **Frozen is not digested.** All 946 ledger atoms of this volume are `residual-open` in
  `Meta/Digestion/backfill/recursive-relational-observation-wave-particle-events/`. No atom is
  covered.
- **Known physics is credited.** Scenes badged KNOWN PHYSICS reproduce results that the volume
  itself attributes to others: complementarity (Englert 1996), the quantum eraser (Scully–Drühl
  1982), the quantum Zeno effect (Misra–Sudarshan 1977, cited in Def 16.1), and the qubit return
  example (Grünbaum–Velázquez–Werner–Werner, arXiv:1202.3903, §47–49).
- **Some visuals are schematic.** These are the instrument-space circle in scene 10, the
  survival curve in scene 05, the fringe buildups and the density curves. Formulas and constants
  are exact.

## Contents and evidence status · 章节与证据状态

Section and line numbers refer to the volume. Paths are in trureturing at `43b1e91209`.

| # | Scene | Claim | Status / source |
| --- | --- | --- | --- |
| 00 | Open | Transport, clock, instrument and record form one relation | theory (§0–1) |
| 01 | Title | A particle event is a record at a declared interface | theory |
| 02 | Clock ≠ click | Every clock-conditioned state keeps off-diagonal ½ | theory (Prop 3.3, l.105) |
| 03 | Aftermath | Same effect E_x, different Kraus aftermath (vacuum vs \|x⟩) | theory (Prop 4.3) |
| 04 | Records | D² + V² = 1 for pure records; reading the record in d± restores conditional fringes | Lean: `D5/S3/Quantum/PureState/RecordCoherenceComplementarity.lean` (`pure_record_distinguishability_coherence_complementarity`); theory Prop 5.2–5.4; known: Englert, Scully–Drühl |
| 05 | Dark space | B clicks at once, L w.p. ½, D never (Prop 13.5); 𝒟 = ker G_d; S_N → P_𝒟 | theory Prop 13.2–13.5; Lean: `FiniteDetectionDarkSpace.lean` (`dark_space_eq_survival_defect_kernel`), `FiniteDetectionSurvivalLimit.lean` (`finite_detection_survival_limit`) |
| 06 | Zeno | sin²(ωT) vs 1 − cos^{2N}(ωT/N) → 0 (bars plotted for ωT = π/2) | theory (Prop 16.2–16.3); known: Misra–Sudarshan |
| 07 | Certain click | Q = √(1−γ)I: every state clicks with law γ(1−γ)^{n−1}; 𝒱∞ = ℝI | theory (Prop 14.5) |
| 08 | Silence | Best error over all adaptive strategies with m calls = ½(1−γ)^m | theory (Thm 37.2, l.1745) |
| 09 | Late branch | 𝔼N = 1 + γ·(1/γ) = 2 for every γ > 0, but 1 at γ = 0 | theory (Prop 47.3, l.2589); example credited to Grünbaum et al. |
| 10 | Golden radius | R = √((11+5√5)/32) = φ^{5/2}/4 ≈ 0.83255; 𝒦(R−h) ~ (φ/16)h⁻², φ/16 ≈ 0.10113 | theory (Thm 102.1, l.7141; Thm 113.1, l.8206) |
| 11 | Recursive wait | μ₁ = e^{−t}dt for every ζ; μ₂ = ((1−r)+rt)e^{−t}dt, mean 1 + r | theory (Thm 137.1, l.10663) |
| 12 | Relation | Keeping only the realized path does not settle counterfactual interventions | theory (Thm 161.1, l.12222) |

The finale lists eight frozen modules. All eight were checked for a `Golden/Frozen/state` pin:
`PureState/RecordCoherenceComplementarity` and the `Measurement/` modules
`FiniteDetectionDarkSpace`, `FiniteDetectionSurvivalLimit`, `GeneralInstrumentDarkClosure`,
`GeneralInstrumentNoDarkDirection`, `GeneralInstrumentSurvivalLimit`,
`GeneralInstrumentDetectionCertificate` and `GeneralInstrumentEffectClosure`. All are under
`D5/S3/Quantum/`.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
