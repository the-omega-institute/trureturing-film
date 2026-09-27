# 016 · RECOVERY GEOMETRY · 边界恢复几何

A film of about 5 minutes on trureturing's theory volume
`docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_RECOVERY_GEOMETRY.md`
("递归关系观察：边界恢复与原子代价几何", 7,574 lines, §1–34).

The volume asks what a state's readings can recover, how accurately and at what cost. It answers
with exact constants, sharp sample counts and machine-checkable certificates.

This film shows only results whose ledger atoms are `absorbed-closed`, meaning they are covered
by frozen Lean declarations. That is 57 of the volume's 532 atoms.

一部约 5 分钟的"边界恢复几何"专题：只讲已由冻结 Lean 证明闭合的正确结果——读数迫使了什么。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-016-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence rules for this film · 证据口径

- **Selection.** Every scene's source atom sits in
  `Meta/Digestion/backfill/recursive-relational-observation-recovery-geometry/absorbed-closed/`.
  Each covering GID below was checked for a `Golden/Frozen/state` pin.
- **Covered is not "entirely in Lean".** A closed atom means the ledger judges it covered by the
  listed frozen declarations. Those declarations are the load-bearing steps, such as Prony
  identification, the product estimate and the Volterra uniqueness lemma. For some theorems
  (Thm 20.2, 25.3 and 29.6), the surrounding assembly is ordinary mathematics in the volume.
  Line 5 of the volume says it adds no new Lean verification of its own. In the film these scenes
  carry an orange SETUP / PAPER STEP badge on the setup line and a green badge on the Lean line.
- **Recomputed curves.** Scene 05 plots two detectors that agree at n = 0…3:
  - (x, q) = (0.680429, 20)
  - (0.777327, 4.751341)

  They give r ≈ 0.105 and r ≈ 0.533, and differ at n = 4 (0.5822 vs 0.5782). I found them by
  bisection on the volume's residual R(ξ) over ξ ∈ [17/25, 1361/2000]. The volume proves their
  existence with a rational interval certificate and does not print these decimals.
- **Schematic visuals.** These are the convex "realizable readings" shape, the tracking-error
  curve in scene 10 and the staircase in scene 11. The formulas and constants are exact.

## Contents and evidence status · 章节与证据状态

Line numbers refer to the volume. Paths are in trureturing at `1aaf064a57`.

| # | Scene | Claim | Source · covering frozen Lean |
| --- | --- | --- | --- |
| 02 | Zero sum | x₁+x₂+x₃=0, readings ±ε: each coordinate costs 1; any legal estimator, even nonlinear, has sharp worst error 4ε/3, attained by mean projection | Thm 3.5 (l.486) · `ZeroSumBoxRecovery.zero_sum_box_recovery_sharp` |
| 03 | Pruning | Deleting queries constant on the candidate set keeps every output, never raises cost, depth ≤ \|C\|−1 | Prop 8.9 (l.1146) · `PassivePolicyNormalization.result` |
| 04 | Five readings | F_n = a·k_r(cnh): F₀…F₄ determine (a,c,r) | Thm 20.2 (l.3846) · `FinitePronyHankelReconstruction.{prony_hankel_factorization, prony_moment_linear_recurrence, first_prony_moments_injective}`, `FinitePronyNodeIdentification.recurrence_window_identifies_node_roots`, `FinitePronyAnnihilatorUniqueness.recurrence_window_identifies_annihilator` |
| 05 | Four fail | Four samples cannot identify all positive parameters; minimum is five | Thm 20.3 (l.3914) · `RationalIntervalExpression.checked_expression_encloses` + Prony modules |
| 06 | Witness | Distance to a compact convex realizable image = max violation by a witness of dual norm ≤ 1; outside signatures are separated by finitely many protocols | Thm 17.2, 18.1 (l.3316, 3486; Sion's minimax credited) · `ClosedConvexDistanceWitnessDuality.closed_convex_distance_witness_duality`, `FiniteRealizationCertificate.finite_realization_certificate`, `RealizedImageKernelFactorization` |
| 07 | Descent | Visible descent exists ⟺ hidden→visible block is 0 ⟺ PTx depends only on Px | Prop 30.2 (l.5929) · `LinearDescentCriterion.linear_descent_criterion` |
| 08 | Fluid | 2D periodic Navier–Stokes, u₀ = (β cos(X₂−X₁), α cos X₁ + β cos(X₂−X₁)); Fourier synthesis exact; ‖v⊗w‖_{H²} ≤ 16‖v‖‖w‖; untruncated solution | Def 25.1, Lemma 25.2, Thm 25.3 (l.4888–4988) · `ReversalWaveSynthesis.synthesis_eq_realVelocity`, `WeightedTensorConvolution.weighted_tensor_convolution` |
| 09 | Uniqueness | d ≤ C∫(t−s)^{−1/2}d ⇒ d ≡ 0; sup‖u_β−u_β′‖_{H²} ≤ 6\|β−β′\| | Thm 25.3 (l.4956) · `SingularKernelUniqueness.eq_zero_of_le_sqrt_kernel_integral` |
| 10 | Spectral floor | c·I ≤ A ⇒ ‖A⁻¹‖ ≤ 1/c, feeding an all-time tracking certificate | Thm 29.6 (l.5718) · `UniformResolventRemainder.inverse_control_of_lower_bound`, `ExactStickyReduction.exact_sticky_reduction` |
| 11 | Limit | Finite minimal TV distances are attained and nondecreasing; their sup equals the completed minimum, attained by one Q∞ | Thm 33.11 (l.7412) · `InverseLimitFeasibleMinimum.exists_feasible_minimum_eq_iSup` |

Scenes 00, 01 and 12 are the opening, title and recap.

Also covered and not animated: Thm 15.4, the parametrization of common positive realizations
(`FiniteMoorePenroseInverse`, `FiniteSynthesisGramDistance`, `MinimalSymmetricRealizationUniqueness`),
and the §27 H¹² parameter smoothness (`LowModeReversalWitness`).

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
