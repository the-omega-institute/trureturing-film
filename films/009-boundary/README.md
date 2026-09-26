# 009 · BOUNDARY / BULK · 边界与体

A 5 min 8 s film on trureturing's **boundary/bulk and holographic spacetime geometry** — the
popular idea that "the inside is written on the boundary", stripped to what the project actually
proves, with an exact list of what it does not claim. Sources:
`RECURSIVE_RELATIONAL_OBSERVATION_BOUNDARY_DYNAMICS.md` (16k lines, read in full),
`RECURSIVE_RELATIONAL_OBSERVATION_WAVE_PARTICLE_EVENTS.md` (read in full), the holography
passages of `PZG_BEDC.md` (评注 27.44, 27.102, 29.4, 29.5), `GICT.md` VII.5 / E.170,
`INTERFACE_PHILOSOPHY.md` Appendix E, the horizon / black-hole / spacetime-readout sections of
`QUANTUM-REALITY.md` (§31–60, §91–93), `CONTEXTUAL_SPACETIME_ARITHMETIC.md`, and the related
frozen Lean theorems.

一部 5 分 8 秒的边界/体与全息时空几何专题：把"内部写在边界上"剥到项目真正证明的部分，并列出它不主张的一切。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-009-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## Contents and evidence status · 章节与证据状态

In these volumes a **boundary is not a spatial surface**; it is a relational summary sufficient
for a declared family of future experiments (RRO-BD l.5), and "holographic" means the boundary
keeps the interior's effect on allowed continuations (l.153). Physics (gravity, real entanglement
entropy, strings, AdS/CFT) is explicitly **not claimed** (PZG l.6584). Badges:
**LEAN KERNEL · VERIFIED · FROZEN**, **THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED**,
**PHYSICS ANALOGY · NOT CLAIMED**. Paths are in trureturing at `ba92ad2672`; every Lean theorem
below was grep-verified and has a `Golden/Frozen/state` pin.

| # | Scene | Claim | Status / source |
| --- | --- | --- | --- |
| 01 | Boundary | Boundary = summary sufficient for declared future experiments; keeps the effect on continuations, not micro-detail | theory (RRO-BD l.5, l.153; Wave-Particle Def 1.3) |
| 02 | Minimal boundary | Future-equivalence is the minimal exact boundary; every exact boundary factors through it | Lean: `D5/S3/ObserverMemory/Prediction/ControlledBehaviorUniversality.lean` |
| 03 | Not a number | Totals (3,5) vs (4,4) → 3 vs 4 after a b=0 block; amplitudes (1,1) vs (1,−1) → 4 vs 0 | theory (RRO-BD Prop 3.2; Wave-Particle Prop 2.2) |
| 04 | Gluing | Boundary does not identify the internal build (identity vs V·V†); gluing = kernel composition only if correlations pass through the boundary | theory (Wave-Particle Prop 7.3; RRO-BD Thm 3.1) |
| 05 | Error code | Three-qutrit threshold code: one share I/3, any two recover; entropy 0,1,2,1 vs recoverable 0,0,2,2 (×log 3) | Lean: `D5/S3/Quantum/Entanglement/QutritThresholdSharing.lean`; table theory (Quantum-Reality §56) |
| 06 | p-adic tree | ℤ_p is the boundary of a Bruhat–Tits tree (frontier citation, Gubser et al. 2017); meeting depth = v_p(x−y); gravity version not claimed | analogy + Lean: `D5/S3/Arith/Congruence/PadicObservationDistance.lean` |
| 07 | Holonomy | Every edge legal, loop product −1 ⇒ no global frame | Lean: `D5/S3/ConceptDynamics/Gluing/GlobalFrameCoboundaryCriterion.lean` |
| 08 | No whole | Compatible layers (1,…,1,0,…) with norm √n: no realizing vector | Lean: `D5/S3/Quantum/Completion/CompatibleUnboundedCoordinates.lean` |
| 09 | Light cone | A quadratic form vanishing on the light cone is a multiple of Minkowski; clock rates → Lorentzian metric, 10 readings in 4D (theory); quantum Fisher metric never Lorentzian (theory) | Lean: `D5/S0/Certificates/MinkowskiNullConeRigidity.lean`; theory (Quantum-Reality §91–93) |
| 10 | Horizon | Hovering clock rate² = escape = f; time does not stop; hovering acceleration → ∞ — standard relativity reorganized | theory (Quantum-Reality §32–35) |
| 11 | Radiation | Thermal-looking pieces can jointly carry everything; recoverable = conditional mutual information; finite energy cannot radiate constant power forever | theory (§46, §53); Lean: `D5/S3/Quantum/Dynamics/FiniteEnergyRadiationBudget.lean` |
| 12 | Time price | Causal repair can cost strictly more than the defect; sharp ratio 9/8 for one explicit family (curve on screen is schematic); hidden archived events still change allowed futures | theory (RRO-BD Thm 55.3, 58.4); Lean: `D5/S3/ConceptDynamics/Spacetime/HiddenArchiveTemporalDomain.lean` |
| 13 | Projections | Space, time, boundary, memory = projections of one relational process; coordinates are information about how to read a point | theory (RRO-BD l.1847; PZG l.4459) |

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
