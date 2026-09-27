# 017 · CONTEXT GEOMETRY · 可执行上下文几何

A film of about 6 minutes on trureturing's theory volume
`docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_CONTEXT_GEOMETRY.md`
("递归关系观察：可执行上下文几何", 27,551 lines, §1–83).

The volume fixes which contexts are actually allowed to run. It defines the distance between two
configurations as the largest readout difference any allowed context can reveal, divided by that
context's gain. Space gluing, time continuation and memory update are then measured in one geometry.

The film follows the idea from its foundations (failures, fixed point, joint laws, access order)
through recursive arrays to the finite-controller capacity line of §55–83.

一部约 6 分钟的"可执行上下文几何"专题：相同，不是关于事物的事实，而是关于你被允许做哪些实验的事实。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-017-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does and does not claim · 主张边界

- **Paper mathematics.** Every scene is an ordinary proof in the theory volume. The volume adds no
  Lean declarations of its own. It cites existing Lean or Mathlib results only for side steps, for
  example Hausdorff-measure lemmas, p-adic kernel lemmas and Kraft's inequality. None of them
  proves the dial capacity numbers.
- **Ledger.** 16 of the volume's 1,478 ledger atoms are `absorbed-closed`, 4 are
  `nonpropositional-inapplicable`, and 1,458 are `residual-open`.
- **Known results are credited.** Bell-pair access and no-cloning are standard; the volume credits
  Choi–Kraus via Watrous. The badge for that scene reads KNOWN PHYSICS. Other credits:
  - the Parry measure construction (golden subshift);
  - Gouvêa (p-adic numbers);
  - OEIS A392095 by Mikhail Kurkov (the top-row-ones array) and A088713 by Paul D. Hanna (its
    source equation);
  - Swamy 1966 and DLMF 18.5.3 (Morgan–Voyce / Chebyshev family).
- **Open result.** For the 27-position dial the volume proves 96 ≤ C_B(3,2) ≤ 105. It proves 105
  optimal for every controller with at most one collision of waiting chains (J ≤ 1). Anything at
  or below 104 would need J ≥ 2, and that case is open. The film badges it OPEN.
- **Schematic visuals.** The distance-growth bars in scene 03, the defect tree in scene 04 and the
  binary tree in scene 06 are illustrative. The numbers shown are either the volume's or were
  recomputed from its recurrences (the triangle rows and the dimension 0.694).

## Contents and evidence status · 章节与证据状态

Line numbers refer to the volume. Paths are in trureturing at `6feef9f6df`.

| # | Scene | Claim | Source |
| --- | --- | --- | --- |
| 00 | Sameness | D(x,y) = sup ρ(f(Cx), f(Cy)) / ℓ(C) over allowed contexts | Def 2.1 |
| 02 | Failure | Comparing only jointly successful experiments gives d(a,b)=d(b,c)=0 and d(a,c)=1 | Prop 1.3 (l.28) |
| 03 | Fixed point | D^[N+1] = T D^[N], D = sup_N D^[N] is the least fixed point; demanding L<1 for the identity forces D=∞ | Thm 2.2, Prop 2.3, Prop 2.5 |
| 04 | Next step | (0,0),(0,1) under read-first-bit and h(a,b)=(b,0): distance 0 now, 1 after one step; defect budget E = δ + Σ L E | Prop 7.2, Thm 6.2 |
| 05 | Joint law | Law(U,U) vs Law(U,1−U): same marginals, XOR distance 1; U⊕U vs U⊕V | Prop 5.3, 5.5 |
| 06 | No 11 | dim_H of sequences with no k consecutive 1s = log λ_k / log 2, where Σ_{j=1}^k λ_k^{−j} = 1; k=2 gives λ=φ, 0.694 | Thm 9.18 (l.754) |
| 07 | Access order | Φ± have identical local states; decoupling first distinguishes them, measuring first does not; no-cloning | Prop 11.14 (l.1289), Thm 11.15 |
| 08 | Order | A(x)=1−x, B(x)=0: same cost 2, results 0 vs 1; endpoint clock exists ⟺ cost squares commute | Prop 13.15, Thm 13.13 |
| 09 | Odometer | Watching digit k (P=p^k): first change at τ gives remainder r = P − τ; P readings are necessary and sufficient | Thm 24.8, 24.9 (l.3845) |
| 10 | Triangle | T(n,k+1) = T(n+1,k) − Σ_j T(n,j)a_{k−j}; boundary 1,2,6,24,… gives top row 1s; all −1 gives −F_{2k+1} | Thm 43.2 (l.8731); (46.12) l.11083 |
| 11 | Sparse | A=1/20, ρ=4/5: shortest contiguous prefix 8; support {0,1,2,3,11} (5 entries) reaches distance 1/36; no 4 suffice | §48 (48.19), §50.6–50.7 (l.15368) |
| 12 | Dial 25 | Adaptive reads 1+⌈log₂P⌉ = 4; C_B(5,1) = 51 (11 read, 15 wait, 25 halt); trace x=13: S→G₂→G₄→G₁→H₁₃, waits 0,2,4,6 | Thm 55.4; Def 60.3, Thm 60.4 (l.18738) |
| 13 | Dial 27 | 96 ≤ C_B(3,2) ≤ 105; J ≤ 1 ⇒ C ≥ 105; J ≥ 2 open | Thm 62.15, 64.20, 70.13, Cor 83.17 (l.27383) |

Scenes 01 and 14 are the title and the recap.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
