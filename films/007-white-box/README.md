# 007 · WHITE BOX · 白盒

A 6 min 9 s film on trureturing's **machine-learning theory**: what is the smallest thing you
must know, relative to a task, to explain a trained model exactly — and what can no amount of
compute recover. Sources, read in full: `CONTEXTUAL_SPACETIME_ARITHMETIC_ML.md` (ch. 1–42a),
`CONTEXTUAL_SPACETIME_ARITHMETIC_ML_OBSERVATION.md` (§43–50), `WHITE_BOX_LOSS_FIBER_LAW.md`,
`COMPUTATIONAL_BEHAVIOR_REPRESENTATION_THEORY.md`, plus the related frozen Lean theorems.

一部 6 分 9 秒的机器学习专题：相对于任务，精确解释一个训练好的模型最少需要知道什么；又有什么，
是再多算力也找不回的。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-007-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## Contents and evidence status · 章节与证据状态

Most of the ML volumes are **paper mathematics** ("repo-derived"): they state 「没有新增 Lean
声明」, and their digestion ledgers are mostly `residual-open`. They make no claim about real
Transformers, general training convergence or a task-free intelligence score, and they leave the
hardest questions (width-independent gated ReLU reduction, finite attention state) explicitly
**open**. Separately, several general results are kernel-checked Lean theorems. Badges:
**ML VOLUME · PAPER MATHEMATICS, NOT KERNEL-CHECKED**, **LEAN KERNEL · VERIFIED**,
**OPEN · RESEARCH QUESTION**. Paths are in trureturing at `552f0c4b2f`
(`ML` = `CONTEXTUAL_SPACETIME_ARITHMETIC_ML.md`, `OBS` = its observation sequel, `CD` = `D5/S3/ConceptDynamics`).

| # | Scene | Model / claim | Source | Status |
| --- | --- | --- | --- | --- |
| 01 | White box | Explanation is task-relative; a constant summary is closed but explains nothing | ML Def 1.2, Prop 1.3 | Lean: `CD/Dialectics/ConstantObserverClosureContrast.lean` (`constant_observer_closure_can_be_coarse`) |
| 02 | Future quotient | Merge states no future input separates; minimal exact representation; 9 vs 18 separated at depth 4 | ML Thm 3.2, ch. 6 | Lean: `ObserverMemory/Prediction/ControlledBehaviorUniversality.lean` (`controlled_behavior_universal_property`); ch. 6 theory |
| 03 | Any width | Two-layer linear net: (w, s) closes exactly at any width; image s ≥ 2\|w\| | ML Thm 9.2 | theory |
| 04 | Hidden coordinate | (1,1) vs (2,½): same w = 1, next 0.81 vs 0.585, error ≥ 9/80; flow invariant 9 → 5184/625 | ML Prop 9.3, 11.3 | theory |
| 05 | Output ≠ state | F = θ³−θ: same output and NTK K = 4, K̇ = ±48; attention keys (0,0) vs (0,1): ½ vs e/(1+e) | ML Thm 15.2, Prop 16.5 | theory |
| 06 | Memory | Late query ⇒ 2ⁿ summary values; early query ⇒ 1 bit; XOR: store vs use | ML Prop 28.1, 18.7 | theory |
| 07 | In-context | Accuracy ½ + ½·2^(r−d); one demonstration = one bit of rank | ML Prop 28.6 | theory |
| 08 | Grokking | Same training curve (≡ 0), generalization at λ⁻¹log(1/ε) vs λ⁻¹log(2/ε); the regularizer decides the fiber | White-Box Fiber Law Thm 3.1 | theory |
| 09 | Copier | Lookup copy: zero loss, every record contaminated, no implied future gain; same data, opposite-sign generalization | — | Lean: `CD/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lean`, `CD/DefinitionEscapeLaws/ScientificGainGeneralizationReversal.lean` |
| 10 | Blind core | Budget envelope decreases to the infimum; residual = blind core + removable; countermodel with empty blind core and residual 1 | — | Lean: `CD/EscapeSpectrum/{BudgetEnvelopeCompletion,BlindResidualChargeDecomposition,FreeUltrafilterChargeCountermodel}.lean` |
| 11 | Precision switch | Old label 23 merges 00 / 0100 (7/12 vs 11/19): error ≥ 1/456 at the switch; 8 new reports suffice; Θ(log 1/ε) reports, adaptive or not | OBS §43, §45 | theory |
| 12 | Unknown model | p = 1/4 vs 1/3: no uniformly accurate predictor even with full history; finite identification w.h.p., then accurate forever | OBS §48, §50 | theory |
| 13 | White box | Latent structure, storage, explanation, correct use are four conditions; real attention models open | ML ch. 18, 26 | theory / open |

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
