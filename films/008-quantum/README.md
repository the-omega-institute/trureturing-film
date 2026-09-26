# 008 · QUANTUM LEDGER · 量子账本

A 5 min 36 s film on trureturing's **quantum theory**, told as a ledger: what gets recorded,
what an observer can read, and what can never be read — and exactly how far a proof checker will
sign. Sources: `OBSERVER-QUANTUM.md` and `MUB_SIX_FOURTH_BASIS_THEORY.md` (read in full);
`QUANTUM-REALITY.md` (55k lines), `CONTEXTUAL_SPACETIME_ARITHMETIC_QUANTUM.md` (62k lines) and
`QUANTUM-RH.md` (70k lines), via full outlines and their central sections; and the Lean library
`D5/S3/Quantum/**` (294 files) plus `QuantumBounds/`, `QuantumContext/`.

一部 5 分 36 秒的量子专题：什么被记录、观察者能读出什么、什么永远读不出，以及证明核验机签字到哪里。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-008-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## Contents and evidence status · 章节与证据状态

The quantum rules (Born rule, Kraus operations, Hamiltonians) are **assumptions** in these
volumes, not derivations (CSA-Quantum Assumption 1.2). Most theory-volume text is marked as not
Lean-compiled; separately, the Lean library contains many frozen quantum theorems. Badges:
**LEAN KERNEL · VERIFIED · FROZEN**, **THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED**,
**OPEN PROBLEM · NOT SOLVED HERE**. Paths are in trureturing at `7f8bac4612`
(`Q` = `D5/S3/Quantum`, `QB` = `D5/S3/QuantumBounds`, `QC` = `D5/S3/QuantumContext`). All Lean
theorems below were grep-verified and have a `Golden/Frozen/state` pin.

| # | Scene | Claim | Status / source |
| --- | --- | --- | --- |
| 02 | CHSH | Classical ≤ 2 (attained); Bell state = 2√2, the maximum for this operator over all two-qubit states; commuting local pair ⇒ CHSH² = 4·I | Lean: `QB/ClassicalFiberBound` (`classical_chsh_abs_le_two`), `QB/CHSHWitness` (`bell_chsh_value`), `QB/TsirelsonTightness` (`bell_chsh_state_expectation_is_greatest`), `QB/LandauCommutingCollapse` |
| 03 | Contextuality | 18 rays in ℂ⁴, 9 contexts of 4, parity: no 0/1 assignment; any 8 contexts satisfiable (one configuration, not the general theorem; on-screen incidence is schematic) | Lean: `QC/ProjectionValuationObstruction` |
| 04 | No cloning | ⟨φ,ψ⟩ = ⟨φ,ψ⟩² ⇒ equal or orthogonal; universal cloner copy spectrum {1/3, 2/3} | Lean: `Q/PureState/NoCloningInnerProductCriterion`, `Q/CloningMachine` |
| 05 | Uncertainty | σ_Aσ_B ≥ ½\|Tr ρ[A,B]\|; X and Z share no eigenvector | Lean: `QB/RobertsonSchrodinger`, `QB/Designs/MixedStateRobertson`, `Q/QubitWitnesses` |
| 06 | Born coin | Known \|+⟩ in Z gives ½/½; \|B⟩,\|D⟩ same odds, orthogonal | theory (Quantum-Reality §208, §219; CSA-Quantum §1.6) |
| 07 | Records | Measurement as reversible coupling, no collapse button; D² + V² = 1 | theory (Quantum-Reality §241); Lean: `pure_record_distinguishability_coherence_complementarity` |
| 08 | Access | Decoherence is an access defect, reversible globally; three-edge loop restores coherence | Lean: `Q/Decoherence/ReducedRecordAccessDefect`; loop theory (Quantum-Reality §82) |
| 09 | Shares | Three-qutrit sharing: one share I/3, two recover; GHZ entangled across every cut | Lean: `Q/Entanglement/QutritThresholdSharing`, `Q/GhzBipartitionEntanglement` |
| 10 | Tomography | d-dim memory ≤ d histories; ≥ d² outcomes; d+1 MUBs determine every state | Lean: `Q/Measurements/FiniteMemoryHistoryCapacity`, `Q/Measurement/PovmOutcomeLowerBound`, `Q/Tomography/CompleteContextTomography` |
| 11 | MUB-6 | Four MUBs in dimension 6: open. Order-three no-split rigidity; own proof route refuted by exact counterexample in ℚ(i,√21); 「局部分支证书不得被表述为六维四 MUB 已经解决」 | open; Lean: `Q/Tomography/OrderThreeComplementaryContextRigidity`, `Q/Tomography/TwoCirculantExtraAntiunitary` |
| 12 | Spectral RH | RH ⟺ positive quantum model at every order (theory); forbidden-neighbour determinant (real-rooted) and "chains cannot simply grow" are Lean; the all-order step is not proved | open; Lean: `Q/FockSpace/ForbiddenNeighbourDeterminant`, `D5/S3/Zeros/Jensen/SourceJensenPrincipalBlockObstruction` |
| 13 | Signature | Whether quantum probability follows from escape structure is left open | open (Quantum-Reality) |

This film does not claim to derive quantum mechanics, resolve the measurement problem, settle
MUB-6, or prove the Riemann Hypothesis — and neither do its sources.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
