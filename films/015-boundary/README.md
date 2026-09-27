# 015 · BOUNDARY DYNAMICS · 动态充分边界

A film of about 5 minutes on trureturing's theory volume
`docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_BOUNDARY_DYNAMICS.md`
("递归关系观察：动态充分边界与内部观察者", 15,985 lines, §1–78).

In this volume a *boundary* is not a surface in space. It is a relational summary that is exactly
sufficient for a declared family of future experiments, and an observer inside the process must be
able to hold it, update it and act on it. The film follows that idea through gluing, delayed
decoding, coarse-graining, stable depth, four representations of one quotient, holonomy, ghost
points of completion, shared control bits and quantum causal repair.

一部约 5 分钟的"动态充分边界"专题：边界不是空间终止的地方，而是未来仍然需要的东西。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-015-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does not claim · 不主张

- **The volume is a paper argument.** Line 5 states that its new combinations are ordinary
  mathematics and "未因此取得新的 Lean 核验". Many theorems carry "Claim status: open". §8
  (l.283–296) lists which frozen Lean modules can carry which local bridge. It also says they have
  not been combined into one new Lean proposition.
- **Frozen is not digested.** The film shows ten frozen Lean modules that the volume cites (§1–8),
  plus `AdaptiveResidueIdentification` (§44.2). All eleven have `Golden/Frozen/state` pins. All 711
  ledger atoms of this volume are `residual-open` in
  `Meta/Digestion/backfill/recursive-relational-observation-boundary-dynamics/`.
- **No novelty claim.** The volume marks nothing as suspected-novel. §45–51 say "不主张原创性",
  and §55 says "不声称新增 Lean 核验或原创优先权". Credited work includes:
  - the quantum tester/comb framework (Chiribella–D'Ariano–Perinotti, arXiv:0904.4483);
  - SDP duality (Gutoski, arXiv:1008.4636);
  - the qubit-channel normal form (Ruskai–Szarek–Werner, arXiv:quant-ph/0101003).

  §10–39 cite no outside automata literature. Any resemblance to Myhill–Nerode or bisimulation
  quotients is an analogy, not something the volume claims.
- **Errata are part of the volume.** §23, §28, §33 and §41 (plus appended errata in §25) retract
  or narrow earlier claims. The film states each result in its corrected form.
- **The 9/8 curve is plotted from the expansion.** Scene 11 draws
  e_ε/ε = 9/8 − (9/16)ε^{1/2} + (255/256)ε from Cor 62.2 over 0 < ε ≤ 1/16, dropping the O(ε^{3/2}) remainder.
  It is not the exact optimum curve. The 9/8 limit belongs to the volume's specific family, which
  has a coherent last output (§55–62).
- The instrument-style diagrams (boundary ring, triangle, comb boxes) are schematic.

## Contents and evidence status · 章节与证据状态

Line numbers refer to the volume. Paths are in trureturing at `9cad5849b2`.

| # | Scene | Claim | Status / source |
| --- | --- | --- | --- |
| 00 | Boundary? | A boundary is a summary sufficient for declared future experiments | theory (Def 1.3, §3) |
| 01 | Title | Hold it, update it, act on it | theory (Def 1.2, Thm 4.1) |
| 02 | State criterion | η is a state ⟺ each fiber has the same legality, readout and next label (+ policy, 2.2); the minimal exact boundary is future equivalence | theory (Thm 2.1, Cor 2.2); bridges: `InterfaceKernelCriterion.interface_refinement_iff_kernel_inclusion`, `PredictionCompletionUniversality.prediction_completion_universality` (frozen) |
| 03 | Gluing | K_{f∘e} = K_f K_e; response totals (3,5) vs (4,4) → 3 vs 4 | theory (Thm 3.1, Prop 3.2) |
| 04 | Delayed key | Y = X⊕K: I(X;Y)=0, I(X;Y∣K)=1 | theory (Prop 4.2; §12.4) |
| 05 | False joint | A={0}, C={1}, q(0)=q(1)=*: q(A∩C) ≠ q(A)∩q(C) | theory (§5, (5.3)) |
| 06 | Stable depth | a:000…, b:0111…; m ≤ \|C∞\|−\|C₀\| = 1, tight; \|W\| ≥ 3 | theory (Thm 24.1, 24.2, §24.3) |
| 07 | Four views | space u, time v, boundary u⊕v, memory u∧v; ⋂ker = id; {space, time} minimal | theory (§26.3, §27.2) |
| 08 | Holonomy | g₁₂g₂₃g₃₁ = −1 ≠ +1: no global frame; "失败发生在三边关系上，不能由逐边合法性发现" | theory (§40.3; cf. Counterexample 10.4) |
| 09 | Ghost point | F(0)=F(1)=0: 2 forward threads, 1 backward; countdown completion adds 1^∞ with no source | theory (§34.2, (34.3); §37.3) |
| 10 | Shared bit | Pareto front (8,1), (4,4), (1,8); 4+4 via u=(b,c), v=(a,c); adaptive 2 questions vs 3 static sensors | theory (Prop 46.1); Lean: `D5/S3/ConceptDynamics/Coding/AdaptiveResidueIdentification.lean` (`two_step_adaptive_residue_identification`) |
| 11 | Causal repair | min_σ D(R, σ⊗I_A) = Δ(R); coherent last output: e_ε = (9/8)ε − (9/16)ε^{3/2} + (255/256)ε² + O(ε^{5/2}) | theory (Thm 54.2, 55.3, 58.1, 61.1, Cor 62.2) |
| 12 | Errata | §23, §28, §33, §41 appended corrections; ten frozen Lean bridges | theory; Lean modules below |

Frozen modules shown in the finale, all under `D5/S3/`:
- `ObserverMemory/PredictionFactors/`: `CausalStateFactorization`, `CanonicalPredictiveStateSufficiency`,
  `PredictionCompletionUniversality`, `ReachableBehaviorMinimality`;
- `ObserverMemory/Refinement/`: `InterfaceKernelCriterion`, `PredictionCompletionIdempotence`;
- `ObserverMemory/Knowledge/`: `ReadoutCoarseningKnowledge`, `FiniteCapacity`;
- `ObserverMemory/Prediction/`: `ControlledBehaviorUniversality`;
- `ConceptDynamics/RefinementGeometry/`: `InverseLimitCompletion`.

Each named theorem was grep-verified in its module.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
