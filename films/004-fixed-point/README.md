# 004 · FIXED POINT · 不动点

A 5 min 13 s film on the **philosophy** of trureturing — a philosophy written in theorems, with
explicit marks where the theorems stop. Religion is intentionally out of scope for this film.

一部 5 分 13 秒的哲学专题：用定理写成的哲学，并标出定理止步之处。本片不涉及宗教比较。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-004-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## Contents and evidence status · 章节与证据状态

Badges on screen: **LEAN KERNEL · VERIFIED**, **PHILOSOPHY VOLUME · ARGUED, NOT KERNEL-CHECKED**,
**STRUCTURAL READING · NOT A CLAIM ABOUT ORIGINAL MEANING**. Paths are in trureturing at `9cd36f962`
(`CD` = `D5/S3/ConceptDynamics`, `T` = `docs/develop/theory`).

| # | Scene | Claim | Status | Source |
| --- | --- | --- | --- | --- |
| 01 | Fixed frame | A good coordinate system is a frame fixed under transformation | theory | `T/GICT.md` Thm 7.3 |
| 02 | Concept | A concept is a readout map; X ≃ Σ fibers; definable / constructed / has a model / realized are separate | Lean | `CD/ConceptFiberDecomposition.lean` (`concept_fiber_decomposition`), `CD/ExistenceNotionSeparation.lean` (`mathematical_existence_notions_separate`) |
| 03 | Dialectic | Negation = a carry witness breaking closure; repair = least refinement keeping old distinctions | Lean | `CD/Dialectics/MinimalDialecticalRepair.lean` (`minimal_dialectical_repair`); `T/FORMAL_CONCEPT_DYNAMICS.md` §53 |
| 04 | Identity & meaning | Branching memory inheritance is not identity; one text + one rule can have distinct stable meanings | Lean | `CD/Identity/MemoryInheritanceNotIdentity.lean`, `CD/Interpretation/InterpretationFixedPoint.lean` |
| 05 | Dialogue | Complete information permits normative divergence; shared facts align decisions under a shared rule; echo chamber limit | Lean | `CD/Deliberation/InformationCompleteNormativeDivergence.lean`, `CD/CommonRuleInformationConvergence.lean`, `CD/Discussion/CommonSourceEchoLimit.lean` |
| 05 | Audit | An inside audit cannot find differences its classification deleted | theory | `T/FORMAL_CONCEPT_DYNAMICS.md` §76 |
| 06 | Justice | Symmetric event: no equivariant culprit, shares 1/n; procedural completeness permits wrong outcomes; explainable ≠ contestable; named privilege is not universal | Lean | `CD/Attribution/*`, `CD/InstitutionalCapture/ProceduralJusticeNotOutcomeCorrect.lean`, `CD/Appeal/ExplainableNotContestable.lean`, `CD/NormativeStructure/UniversalValueRoleInvariance.lean` |
| 07 | Freedom | Total future function ⟺ no branching; control is internal/external relative to an interface | Lean | `CD/Agency/SelfFormationFreeWillBoundary.lean`, `CD/Agency/BoundaryRelativeAgency.lean` |
| 07 | Frontier | Freedom = the frontier, what logic has not decided | theory | `T/FIXED_POINT_PHILOSOPHY.md` Def 6.1 |
| 08 | True · good · beautiful | Truth = frozen set; goodness = preserving transformations; beauty = frontier order; beauty is not a function of truth; 诚 and 恕 adopted, not derived | theory | `T/FIXED_POINT_PHILOSOPHY.md` §§1–5 |
| 09 | The unmoved | Only the frozen and the never-freezable resist every transformation; mathematics lives in the gap called incompleteness | theory | `T/FIXED_POINT_PHILOSOPHY.md` Thm 1.15, `T/GICT.md` Thm 7.2 |
| 10 | Thinkers | Leibniz (identity of indiscernibles), Kant, Wittgenstein, Spinoza as structural readings; incomplete ≠ false | reading (Leibniz criterion in Lean) | `CD/Faithfulness/JointFaithfulnessLeibnizCriterion.lean`; `T/MATH_MYTH_MATCH.md` §§19–22 |
| 11 | Watch | "What can be proved will emigrate into mathematics; philosophy keeps watch over what cannot." | theory | `T/INTERFACE_PHILOSOPHY.md` |

Several Lean results are countermodels or existence results in small models (e.g. over `Bool`),
not universal laws of society; the diagrams (voter cards, pie shares, echo rings) are illustrations.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
