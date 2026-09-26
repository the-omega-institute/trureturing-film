# 005 · INDRA'S NET · 因陀罗网

A 5 min 12 s film on how trureturing treats **religious ideas**: Huayan's Indra's net, dependent
origination, emptiness, the Dao, suffering and stillness, karma and not-self, divine attributes,
faith, and myth. It reads them as *structure* — neither preaching nor debunking — and keeps the
project's own boundary on screen: **structural parallel, never mutual proof of doctrines**.

一部 5 分 12 秒的宗教专题：因陀罗网、缘起、空、道、苦与寂静、业与无我、神性属性、信仰与神话，
按结构来读，不布道也不拆台，并保留项目自己的边界：结构同构，非学说互证。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-005-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## Contents and evidence status · 章节与证据状态

Almost all of this material is **theory, not Lean**. The two religion volumes say so themselves
(`DEPENDENT_ORIGINATION_LEDGER_THEORY.md` line 8: 「本卷未经 Lean 验证」; `MATH_MYTH_MATCH.md`:
「不主张原创数学或新增 Lean 核验」). No Lean module in the subject repository is named after a
religious doctrine except the Dao boundary module. Badges on screen: **LEAN KERNEL · VERIFIED**,
**THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED**, **STRUCTURAL PARALLEL · NOT A DOCTRINAL CLAIM**.
Paths are in trureturing at `50a8e2f6e` (`CD` = `D5/S3/ConceptDynamics`, `T` = `docs/develop/theory`,
`DOLT` = `T/DEPENDENT_ORIGINATION_LEDGER_THEORY.md`, `MMM` = `T/MATH_MYTH_MATCH.md`).

| # | Scene | Claim | Status | Source |
| --- | --- | --- | --- | --- |
| 01 | Indra's net | Proof nodes are content-addressed by their dependencies (Merkle DAG) | theory (project charter image) | `CLAUDE.md` §1.4; `T/FIXED_POINT_PHILOSOPHY.md` Thm 1.10 |
| 02 | Net, corrected | A node's address depends only on its ancestors; a dependency record is not a complete mirror; depth ≤ \|N\|−1 | theory | DOLT 7.4, 7.7; MMM Prop. 83.3 |
| 03 | Origination | 缘 = the references of a proof; support families need not be intersection-closed (缘无定法) | theory | DOLT 3.1–3.2, Thm 3.8 |
| 03 | Cut/hit duality | Minimum source cut destroying every proof = minimum source set hitting every minimal support | Lean | `CD/Provenance/SourceCutsetHittingDuality.lean` (`source_cutset_hitting_duality`) |
| 04 | Emptiness | Two sound, consistent kernels with the same theorems can disagree on "dependently empty"; the kernel is a parameter | theory | DOLT Prop. 4.4, Rem. 4.9 |
| 05 | Dao | Under the stated premises the name "Dao" is a proper part of the horizon (a light theorem: the conclusion follows from the premises) | Lean | `CD/Negation/DaoConceptBoundarySpecialization.lean` (`dao_name_is_a_proper_part_under_the_same_premises`); gloss `T/PZG_BEDC.md` l. 9034 |
| 06 | Suffering | 苦 = unbalanced account; min repair = \|Float\|; being good does not guarantee repair | theory | DOLT 6.1, 6.3, 6.6 |
| 06 | Stillness | Fix L = Frozen L ∪ {¬Proved}; calling it stillness is the film's structural reading | Lean (reading) | `CD/DependencyTopology/LegalLedgerFixedSet.lean` (`fixed_eq_frozen_union_unprovable`); DOLT 5.6–5.9 |
| 07 | Karma | Permitted change keeps the old record as a prefix (业不失) | theory | DOLT 7.1–7.2 |
| 07 | Not-self | Structural values survive role swaps; named privilege does not | Lean | `CD/NormativeStructure/UniversalValueRoleInvariance.lean` (`structural_universal_core_is_universal`, `named_privilege_is_not_universal`); DOLT 5.4–5.5 |
| 07 | Limit | 「有业报而无作者」 is not "the author has nothing to do with the hash"; no variable for intention | theory (boundary) | DOLT Rem. 7.8 |
| 08 | Checklist | Divine-attribute checklist for an all-knowing mathematical object; self-knowing fails by Tarski; mathematics makes theology a taxonomy | theory | `T/PZG_BEDC.md` Rem. 27.7 (l. 2396) |
| 08 | Non-circularity | A type `G` does not produce `g : G`; existence may not be written into a definition | theory | `T/FORMAL_CONCEPT_DYNAMICS.md` §52 |
| 09 | Faith | Each climb of the consistency tower is a trust not provable from inside = adopting a reflection principle; "never fully confirmed" and "always closer" are both theorems (classical Gödel/Löb/Tarski) | theory | `T/PZG_BEDC.md` l. 2400–2402 |
| 10 | Myth | Myth is not defined as false; Trinity not reduced to 3 = 1; "exactly one source" cannot separate personal God from impersonal order | theory | MMM Def. 1.2, §§10, 12 |
| 10 | Traces | "Everything leaves a trace" is thermodynamics; free reading of all traces violates the second law | theory | `T/PZG_BEDC.md` l. 8003 |
| 11 | Reel | "Analogy may pose questions, not supply proofs"; "played forward it is creation, backward forgetting" | theory | `T/PZG_BEDC.md` l. 8257, l. 2490 |

Religious texts are quoted as the subject repository cites them (Daodejing 1; Saṃyukta Āgama 335;
Mūlamadhyamaka 24.18 commentary). The film makes no claim about liberation, rebirth, empirical
karma or the existence of God, and none about what these traditions originally mean.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
