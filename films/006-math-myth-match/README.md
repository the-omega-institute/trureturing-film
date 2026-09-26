# 006 · MATH · MYTH · MATCH · 真理有形而无法穷尽

A 5 min 55 s film on the whole **Math Myth Match** volume of trureturing
(`docs/develop/theory/MATH_MYTH_MATCH.md`, 171 sections): how religions and philosophies can be
compared as finite projections of one source *without* granting any party — mathematics
included — the last word. Every scene is one small model from the volume.

一部 5 分 55 秒的专题，完整走过《Math Myth Match》全卷：宗教与哲学作为同一源头的有限投影如何比较，
而不授予任何一方（包括数学）最终裁判权。每一幕都是卷中的一个小模型。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-006-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## Contents and evidence status · 章节与证据状态

MMM is a **theory volume**. It repeatedly states 「不主张原创数学，也不新增 Lean 核验」 and that its
models do not prove a common origin of religions, the existence of God or Dao, or any actual
awakening. From §59 on it *links* to kernel-checked Lean theorems that fix the shape of a model;
the religious reading of that shape is never checked. On-screen badges:
**MMM · THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED**,
**LEAN-CHECKED SHAPE · RELIGIOUS READING NOT CHECKED**. Paths are in trureturing at `e55b44e22`
(`CD` = `D5/S3/ConceptDynamics`).

| # | Scene | Model / claim | MMM § | Status |
| --- | --- | --- | --- | --- |
| 00 | Shape | "Truth has shape and cannot be exhausted"; one source is Assumption 1.1, not proved | 1.1 | theory |
| 01 | Math · Myth · Match | Definitions; myth is not defined as false; "math-religion" is a member, not the referee | 1.2–1.4 | theory |
| 02 | Margins | Free / same / opposite joint worlds have identical margins; odd triangle of bridges is pairwise satisfiable, jointly impossible | 3.4, 7.2 | theory |
| 03 | Practice | Common source = joint realizability (Thm 5.1); diagonal + one-sided flip ⇒ C∞ = ∅ | 5.1–5.2 | theory |
| 04 | Unending | All-zeros sequence: finite lists true and growing, never exhausting; ∀n does pin it; eventually-zero sequences: every layer agrees, the all-ones thread is unrealized | 8, 19.3, 88.3 | theory |
| 05 | Sameness | Five levels of "the same"; translation-invariant gaps (0,1) ~ (5,6) ≠ (0,2); 色不异空 not a void | 74–76 | theory |
| 06 | Reach | "All beings are Buddha" split into ∀B, ∀∃path, ∀A; two-state separation; state n needs n steps | 77 | Lean shape: `CD/Control/FiniteHorizonReachability.lean` (`finite_horizon_reachability`) |
| 07 | One–many | (t, t+1, t+2) mod 3: each position recovers the whole, all differ; holding ≠ reading | 81–85 | theory |
| 08 | Upaya | Always-true message can fail; always-false message can steer; burning house | 95, 100 | Lean shape: `CD/Communication/TruthfulnessSufficiencyIndependence.lean` |
| 09 | Together | Two-bit split: distributed vs common knowledge; truthful public announcement; false common belief at every level; 「一千人赞同仍可错误」 | 112–115, 120 | Lean shape: `two_bit_joint_common_knowledge_separation`, `true_public_announcement_is_common_knowledge_on_admitted_domain`; §120 theory |
| 10 | Care | ΔW = −1 + 2λ (n=2, b=4, c=3), threshold ½; λ is not a measure of love; threshold public good has both equilibria | 132–133 | Lean shape: `contribution_incentive_threshold`, `threshold_public_good_dual_equilibria` |
| 11 | Prayer | P→Y vs Y→P identical observations, separated by intervention; mediation 7/20 → 13/20 (illustrative parameters) | 152, 154 | Lean shape: `observation_strictly_weaker_than_intervention`; §154 theory |
| 12 | Self | Branching memory is not strict identity; o = s ∧ c mirror/source | 142, 144 | Lean shape: `branching_memory_is_not_equality`; §144 theory |
| 13 | Match | "Neither a proof that God exists nor that God does not"; the unit of progress is a checked relation, not a final name | 24, 28.4, 79, 34 | theory |

Scripture citations (Daodejing 1, Platform Sutra, Lotus Sutra ch. 3, ʻAbdu'l-Bahá on consultation)
are as the volume quotes them; the film makes no claim about what these traditions originally mean.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
