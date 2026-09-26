# 003 · INFORMATION ESCAPE · 信息逃逸

A 4 min 38 s film on trureturing's theory of **information escape**: every description merges
some distinct states, and the project measures exactly which distinctions slip away, which can be
recovered, which never can within a given language, and where the escape continues.

关于“信息逃逸”的 4 分 38 秒专题：每种描述都会把一些不同的状态看成相同；项目精确测量哪些区分溜走了、哪些能回收、哪些在当前语言里永远无法回收，以及逃逸在哪里继续。

## Outputs · 产物

Rendered films are **not** stored here; they are published as GitHub [Releases](../../../../releases)
(tag `film-003-<version>`) by `.github/workflows/release-film.yml`.

## Contents and evidence status · 章节与证据状态

Each scene shows a badge: **LEAN KERNEL · VERIFIED**, **THEORY VOLUME · NOT A LEAN THEOREM**, or
**JUDGE UNDER CONSTRUCTION · WARNINGS ONLY**. Paths are in trureturing at `cf8f55854`
(`CD` = `D5/S3/ConceptDynamics`).

| # | Scene | Claim | Status | Source |
| --- | --- | --- | --- | --- |
| 00 | Shadow | Different objects, same readout: the difference escapes | illustration | — |
| 02 | Arena | 4 states, 12 ordered pairs; both switches → ε = 0; forget one → 4/12 = 1/3; ε = \|E\|/(n(n−1)) | Lean | `CD/InformationEscape/EscapePairs.lean`, `ExactRate.lean` |
| 03 | Unique capture | Lowers escape ⟺ unique capture > 0 ⟺ kernel not recoverable from the others; x, y, identity: escapes 12/4/4/0, each unique capture 0 | Lean | `CD/InformationEscape/StructuralNovelty.lean` (IE-010, IE-011); `CD/InformationEscapeHierarchy/HierarchyLaws.lean` (`e1_four_node_escape_counts`) |
| 04 | Causal ladder | 48 states, 2256 pairs: observation leaves 136, intervention 44, counterfactual 0 | Lean | `CD/InformationEscapeRealizations/UnifiedCausalMeasurements.lean` |
| 05 | Blind core | residual = blind core + removable confusion; nonempty blind core ⇒ no definition family recovers the target | Lean | `CD/EscapeSpectrum/BlindResidualChargeDecomposition.lean`, `CD/DefinitionEscape/BlindKernelObstruction.lean` |
| 06 | Budget | Envelope decreases to its infimum; free-ultrafilter countermodel: no pair blind, spectrum 1 at every finite budget | Lean | `CD/EscapeSpectrum/BudgetEnvelopeCompletion.lean`, `FreeUltrafilterChargeCountermodel.lean` |
| 07 | Diagonal | twist without fixed point ⇒ diagonal ∉ range(catalog) (Cantor/Lawvere style, for one fixed catalog) | Lean | `CD/DefinitionEscape/ConstructiveDiagonalEscape.lean` |
| 08 | Creation | 𝓔(q∨d;T) = 𝓔(q;T) ∩ ker d; "creation = structural escape + low-cost recovery" | theory | `docs/develop/theory/DEFINITION_ESCAPE_COMPLETION_THEORY.md` §3, §7.3 |
| 09 | Lookup copier | Copying past records: zero retrospective loss, fails non-anticipation | Lean | `CD/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lean` |
| 10 | Judge | Four-slot registrations; 95 in 70 `Reg/D5` files, 50 with `escape continues (open)`; witness `recenterResidual` = pair (0,1) of `Fin 3`; warnings only | machinery | `Reg/D5/S3/StatisticalMechanics/HardCore/SquareGridCoordinates.lean`, `CLAUDE.md` §3.9, spec A5.5 |
| 11 | Continues | Strict refinement chains have ≤ n−1 steps on a finite arena | Lean | `CD/InformationEscapeHierarchy/HierarchyLaws.lean` (`strict_chain_length_le_card_sub_one`) |

`open` records an honest unknown; it does not assert undecidability or an infinite residual.
The unique-capture dots (scene 03), blind-core cloud (05), budget curve shape (06) and fiber
diagram (08) are illustrations; the numbers on screen are the proved values above.

## Engine

Shared `engine.js` from film 001; this film's scenes live in `scenes.js`, injected by `build.py`.
