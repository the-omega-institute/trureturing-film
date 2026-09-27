# 012 · OBSERVATION QUOTIENT · 递归关系观察

A 5 min 7 s film on trureturing's **Recursive Relational Observation** (RRO) family: eleven
theory volumes, `docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION*.md` (about 12 MB). The
main volume (`RECURSIVE_RELATIONAL_OBSERVATION.md`, 54,476 lines) was read by section statements
across its whole length. The sister volumes were read at their scope statements and main theorems:
CONTEXT_GEOMETRY, EFFECTIVE_RESOLUTION, JOINT_RELATIONS_CLOCKS, PROCESS_GEOMETRY, PHASE_BOUNDARY,
RECOVERY_GEOMETRY, SFT and TRANSPORT_MEMORY_COMPLETION. BOUNDARY_DYNAMICS and WAVE_PARTICLE_EVENTS
were the subject of film 009. One question runs through all of them: after you look, what
survives, and which "ghost" points appear when finite readings are completed into a limit?

一部 5 分 7 秒的"递归关系观察"专题：观察就是遗忘；十一卷反复追问，看过之后什么留了下来，完备化时又冒出哪些幽灵。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-012-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## What the film does not claim · 不主张

The main volume opens with "本卷是理论参考输入，不是 Lean 验证收据" (l.3). Almost every result
in the RRO family is a paper proof and is **not** kernel-checked, and the film badges those scenes
"THEORY VOLUME · PAPER PROOF". Only the scenes marked LEAN cite frozen Lean modules. No D5 Lean file
names an RRO volume; the link runs one way, from the volumes to the Lean modules they reuse.

## Contents and evidence status · 章节与证据状态

Line numbers refer to the named volume (main volume unless stated). Paths are in trureturing at
`0f7786da60`. Every Lean theorem below was grep-verified and has a `Golden/Frozen/state` pin.

| # | Scene | Claim | Status / source |
| --- | --- | --- | --- |
| 01 | Forgetting | An observation keeps some differences and forgets others; 11 volumes | theory (l.3) |
| 02 | Escape | An operation descends to the quotient iff its escape set is empty; "后处理不能细化旧核" | theory (Def 2.1, Thm 2.2, Cor 2.3, l.31–50) |
| 03 | Witness | Witnessed vs support relation; "历史必须位于数据类型中，合法性证明只承担约束作用" | theory (Def 1.2, Prop 1.5, l.13–27) |
| 04 | Joint image | (x mod m, x mod n) is jointly surjective iff gcd(m,n)=1; mod 2 × mod 4 hits 4 of 8 cells | Lean: `D5/S3/Factorization/PrimePowers/CompatibleResidueJointImage.lean` (`residue_realization_independent_iff_coprime`); theory Prop 5.3 |
| 05 | Identity | Parity observation: {+,×} → 2 classes, + power → 3 (0⁰=1), + subtraction → ℵ₀ | theory (Thm 11.3, l.2018) |
| 06 | Ghost point | Y = {e_k}, R even, S odd: the only common completed witness is 000… ∉ Y; finite stages recover the closure | theory (Prop 7.4, l.899–935; l.1212) |
| 07 | Digit addition | Closed Zeckendorf addition graph: 0 + u → {u, v}, unit law fails; no separately continuous addition on legal infinite digit streams extends ℕ-addition | theory (Thm 16.4, l.3775–3799); Lean: `D5/S1/Digit/Infinite/NoContinuousAdditionExtension.lean` (`result`) |
| 08 | Arrow of time | Stationary binary words are reversal-symmetric up to length 3; six-cycle walk: J = (p³−q³)/6 at length 4 (recomputed numerically for the film, p + q = 1) | theory (Thm 98.2, 98.4, l.39986, l.40120) |
| 09 | Two clocks | Same fair marginals, agreement 1 vs 1/2: "相同的边缘时钟律 ⇏ 相同的联合时钟协议" (the independent world is shown with a 24-sample stream at exactly 50%) | theory (JOINT_RELATIONS_CLOCKS §4.2, TM.452, l.2995–3006) |
| 10 | Capacity | Five-terminal fixed CPTP receiver: exactly 7 dimensions; exact capacity 2N−1 vs N+1, a drop of N−2 at the endpoint | theory (PHASE_BOUNDARY Thm 26.1, Thm 36.1 l.8536–8552, Thm 9.2 l.918–932) |
| 11 | Kernel | Frozen: joint residues ⟺ coprime; no continuous digit addition; longest-zero-run memory lower bound; lag-m certificate ⇒ exchange chain ≤ 2m−1; golden lattice completion of index 2; discounted distance = γ^(first difference) | Lean: modules above, plus `D5/S3/ObserverMemory/Trajectories/LongestZeroResponseSeparation.lean` (`source_family_separates`), `D5/S3/ConceptDynamics/Coding/CompatibleResponseForgettingBound.lean` (`compatible_exchange_chain_bound`), `D5/S3/Arith/Lattices/GoldenMaximalOrderCompletion.lean` (`golden_maximal_order_completion`), `D5/S3/Observer/MetricGeometryLaws/FirstDifferencePowerLaw.lean` (`first_difference_power_law`) |
| 12 | Remainder | Kept records refine distinctions and leave a remainder; "保留原始事件并修正解释" | theory (l.45571, l.52230) |

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
