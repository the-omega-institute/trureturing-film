# 059 · AURIC FIB ATOM PYRAMID XXX · 金字塔 XXX：局部填充、软到刚与奇环障碍

A film of about 6½ minutes, the thirtieth part on the FIB atom pyramid. Its subjects are
`AURIC_FIB_ATOM_PYRAMID_LOCAL_FILLINGS_SOFT_TO_RIGID_AND_ODD_CYCLE_OBSTRUCTIONS.md` and
`AURIC_FIB_ATOM_RELATIONAL_ORDER_AND_FILLING_CLOSURE.md` in trureturing at subject commit `7779a6fa15`.

The film asks when local pieces fill into one whole: when a soft filling is a mixture of rigid ones, when local windows
stitch into a global law, and when a cycle forbids it.

- **Legal fillings.**
  - Three adjacent atoms carry 2, 3 and 5, and neighbours may not both be filled.
  - The five legal fillings weigh 0, 2, 3, 5 and 7, so Z(q) = 1 + q² + q³ + q⁵ + q⁷.
  - Legal words of length m number F(m + 2).
- **Soft to rigid.**
  - A soft filling puts a value in [0, 1] on each position, with every neighbouring pair summing to at most 1.
  - On a path these soft fillings are exactly the convex hull of the legal words. For three atoms that hull is the
    pyramid itself.
  - On a bipartite conflict graph the fractional polytope equals the stable-set polytope. Soft becomes rigid in law; a
    single sample is rigid only if it is already 0 or 1.
- **Odd cycles.**
  - On C(2k+1) the all-½ point satisfies every edge, yet its total is k + ½ while no independent set holds more than k.
  - The odd-cycle inequality Σ x ≤ k cuts it away. On a triangle the bound is 1.
- **Stitching.**
  - Along a path, three-atom windows come from one global law exactly when neighbouring windows agree on their shared
    pair. The glued law is a Markov chain built window by window.
  - In pyramid coordinates Zᵢ = Xᵢ₊₁ and Yᵢ = Zᵢ₊₁. The hidden κ of a window is never shared.
- **The five-cycle.**
  - Every window ½[101] + ½[010] agrees with its neighbours and fills each atom with probability ½.
  - The expected total is 5/2, but C₅ holds at most 2. The 101/010 phase flips after five steps and closes only after
    ten.
- **Transfer matrix.** Chains of L windows number F(L + 4). Closed cycles are counted by tr Mᴸ, the Lucas numbers
  1, 3, 4, 7, 11, 18, which count independent sets of the L-cycle for L ≥ 3.
- **Soft shapes.**
  - A regular k-gon is blended with its inscribed disk: γ[(1 − τ)P_k ⊕ τρ_k D]. Softer shapes nest inside harder ones.
  - The area is γ²[A + (πρ² − A)τ²], so the linear term cancels. The relative loss at full softness is 0.395, 0.215
    and 0.093 for k = 3, 4 and 6.
- **Hardening.**
  - In a fixed finite universe of candidate poses, harder shapes lose poses and gain overlaps. The independent sets
    only shrink, so STAB(G_hard) ⊆ STAB(G_soft).
  - Which local optimum a numerical search finds has no such monotonicity.
  - On a bipartite graph, a soft filling with compatible 0/1 boundary values is a mixture of rigid fillings with the
    same boundary.
- **Two windows.** The five-state algebra splits into the visible span {1, x, y, z} and the joint direction xy. The pair
  algebra splits as 16 + 4 + 4 + 1, so first-order pair readings see 16 of 25 directions and miss 9.
- **Time and quotients.**
  - Under (a, b) → (b, a + b), the reading 2a + 3b gives 6 on (3, 0) and (0, 2), and then 9 and 10.
  - The volume defines the direction of time, in this model, as the direction in which legal updates break the current
    equivalence.
  - Static, future and maintenance quotients differ. A death map that sends every state to null is perfectly
    predictable, yet it cannot keep a target set alive.

一部约六分半钟的片子：追问局部什么时候能填成一个整体——软填充什么时候是刚性填充的混合，局部窗口什么时候能缝成全局律，而奇环又为什么禁止这一切。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-059-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen general results.** Each module below has a state file at the subject commit and generality G.
  - `D5/S1/Words/AdmissibleWords/AdmissibleCount`.
    - `admissibleWord_card_eq_fib` states that the number of Boolean words of length m with no two adjacent trues is
      Nat.fib (m + 2).
  - `D5/S1/Words/AdmissibleWords/PathStableSetPolytope`.
    - `convexHull_vertices` states that, for every n, the convex hull of the occupancy vectors of those words equals
      the polytope {x | 0 ≤ xᵢ ≤ 1 and xᵢ + xⱼ ≤ 1 for each path edge}.
  - The count line and the path-polytope line are badged Lean.
  - These are path results. The bipartite and odd-cycle statements are not part of these modules.
- **Theory volumes, argued but not kernel-checked.** Both volumes mark their statements as open reference input. Badged
  as theory:
  - the stitching rule and its pyramid-coordinate form;
  - the five-cycle example and its phase;
  - the soft-shape model's place in the volume's argument;
  - the hardening nesting in a fixed pose universe and the boundary-preserving decomposition;
  - the two-window count;
  - the time reading and the three quotients.
  - The volume calls the shape-to-conflict-graph map an abstract adapter on a fixed finite pose universe, not a proved
    bridge. Search behaviour and the nesting of feasible sets are kept apart.
- **Classical tools.** Badged as classical where they carry the narration:
  - total unimodularity of bipartite incidence matrices (Q(G) = STAB(G) on bipartite graphs);
  - the odd-cycle inequality;
  - transfer matrices and Lucas traces;
  - the mixed-area expansion behind the quadratic area formula.
- **Model reading.** The direction of time is a definition inside the volume's model, not a law. That line is badged
  theory.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Fillings and polytopes.**
    - The five fillings, their weights, Z(q), and the F(m + 2) count for m ≤ 15.
    - Integral LP vertices on 2400 random bipartite instances, and on 1580 more with compatible 0/1 boundary values
      fixed.
    - The all-½ point on C(2k+1) for k = 1 to 5: it satisfies every edge and is no mixture of independent sets.
  - **Stitching and cycles.**
    - Window agreement and the Markov gluing for a random law on legal words of length 7, with Zᵢ = Xᵢ₊₁ and
      Yᵢ = Zᵢ₊₁.
    - The C₅ example: 11 independent sets, maximum 2, and the phase flip after 5 steps that closes after 10.
    - The transfer-matrix counts F(L + 4) for L ≤ 19, and the Lucas traces checked against independent-set counts of
      the L-cycle.
  - **Shapes, hardening, windows and time.**
    - The area formula for k = 3, 4, 5, 6 and 8, by convex hulls, and the η values.
    - The fixed-pose nesting on 75 random comparisons, using exact polygon overlap and container tests.
    - The ranks 16, 4, 4 and 1 of the two-window blocks.
    - The readings 6, 6 → 9, 10.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the soft-point mixture lines, which use the midpoint of the hidden fibre;
  - the flickering rigid samples;
  - the pose configuration in the hardening scene, which was chosen by search. Its overlap and container thresholds were
    computed exactly for that configuration.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
