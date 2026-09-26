# 002 · HOLOGRAM OF TRUTH · 真理全息

A 6 min 03 s film on the frontier of [trureturing](https://github.com/the-omega-institute/trureturing),
organised around one question — **can a part hold the whole?** — and the project's precise
answers: which observations recover a target, when local records glue into a global one,
where the reflection breaks, and where new thresholds and phase transitions appear.

以“部分能否承载整体”为主线的 6 分 03 秒前沿短片：观察何时能恢复目标、局部记录何时能拼成全局、映照在哪里破碎，以及最新推导出的阈值与相变。

## Outputs · 产物

Rendered films are **not** stored in this repository. They are published as GitHub
[Releases](../../../../releases) (tag `film-002-<version>`) by `.github/workflows/release-film.yml`,
or built locally with the same steps as [film 001](../001-truth-is-discovered/README.md#rebuild--复现).
成片不入库，经 CI 构建后发布到 Releases。

## Contents and evidence status · 章节与证据状态

Each scene carries an on-screen badge: **LEAN KERNEL · VERIFIED**, **FRONTIER · DERIVED ON PAPER ·
NOT YET KERNEL-CHECKED**, or **CONDITIONAL**. The film keeps those distinctions in narration too.

| # | Scene | Claim | Status | Source (trureturing `6fe6cb58a`) |
| --- | --- | --- | --- | --- |
| 00 | Indra's net | Parts that reflect wholes — an image, not a proof | metaphor | `docs/develop/theory/MATH_MYTH_MATCH.md` |
| 02 | Fibers | A target is recoverable from an observation ⟺ it is constant on every fiber | Lean | `D5/S3/ConceptDynamics/Restoration/TargetRecoveryCriterion.lean` |
| 03 | Gluing | On a finite tree, connected occurrence + exact overlap agreement ⇒ every local record extends globally; uniqueness/history/cost not claimed | Lean | `D5/S3/ConceptDynamics/Gluing/RunningIntersectionRecords.lean` |
| 04 | Blind spot | Bell pair vs 00/11 coin flip share local marginals; correlation sector dimension (m²−1)(n²−1) = 9 for two qubits | Lean | `D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.lean` |
| 05 | Records | Four-path model: one record gives zero exact recovery, two records (full joint access) give certain recovery; ten-phase certificate | paper | `QUANTUM-REALITY.md` Thm 404.1 |
| 06 | Price of reality | e + r ≥ δ; six axis states δ = a/3; real storage free ⟺ reciprocals of axis radii form a triangle; jump 1/4 → 0 | paper | `CONTEXTUAL_SPACETIME_ARITHMETIC_QUANTUM.md` §§272–276 |
| 07 | Phase boundary | Error crosses 3/4 at a unique threshold; quarter-disc contact switches decoder from 3 to 2 Kraus operators (curve drawn schematically) | paper | `RECURSIVE_RELATIONAL_OBSERVATION_PHASE_BOUNDARY.md` §§190–216 |
| 08 | Zeta transition | *If* RH were false: first off-line height, mirror zero, order-parameter jump, Lee–Yang roots r and 1/r; one open bridge; RH not claimed | conditional, paper | `RH_OFFLINE_ZERO_LEE_YANG_INSTANTANEOUS_PHASE_TRANSITION_THEORY.md` §§2–18 |
| 09 | Settled | CayleyPy-4 Conj. 16 (k=3) diameter ⌈L(N−L)/2⌉; P(n,3) zero forcing = 8 for n ≥ 13; Song–Lin Conj. 4.1 refuted on G(ℤ₃₀,{5,6,9,20}); OEIS A362534 fails at n = 19; 411 dossiers | Lean | `D5/S3/Combinatorics/ShrunkenGrassmannianThreeCycleDiameter.lean`, `…/GeneralizedPetersen/ZeroForcingThree.lean`, `D5/S3/Quantum/Dynamics/OrientedCirculantZeroTransfer.lean`, `D5/S0/Certificates/SabbaPolarizationTransferRefutation.lean` |
| 10 | Returns | Continuous torus readings (even with vanishing error) return to every reachable open window with bounded gaps | Lean, frozen | `D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.lean` |
| 11 | Mirror | A frozen node carries its ancestors, not the whole net | architecture + MMM §83 | `CLAUDE.md` §1.4, `MATH_MYTH_MATCH.md` §83 |

Dossiers disclaim priority ("not found in searched scope"). The Petersen forcing animation and the
error curve in scene 07 are illustrations, not computed data; the returns scene plots an actual
irrational rotation orbit. Counts (5,075 files, 29,643 theorems/lemmas, 4,977 frozen, 411 dossiers)
were read at the pinned commit.

## Engine

`engine.js` is the shared engine from film 001; `scenes.js` holds this film's scenes and is
injected by `build.py`. Narration lives in `script.json`; `tts.py` re-times every scene from it.
