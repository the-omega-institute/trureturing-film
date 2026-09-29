# 024 · EIGHT LIGHTS · 八个点点亮全图

A film of about 6½ minutes on a result frozen in trureturing's Lean library at subject commit `f8f4e0a741`:

> **Z(P(n,3)) = 8 for every n ≥ 13.**

This is Conjecture 5 of Arnav Krishnan, *A correction to the Zero Forcing Number of the Generalized Petersen Graphs
P(n,3)*, arXiv:2607.19412v1 (2026). The paper proves the upper bound and checks n ≤ 20 by exhaustive search; the case
of all n was left open there. The Lean theorem is `D5/S3/Combinatorics/GeneralizedPetersen/ZeroForcingThree.result`.

The film tells the proof through metaphors, in order:

- a ring road with a skip-3 subway (the graph P(n,3));
- gossip and Minesweeper (the colour-change rule);
- eight lamps walking around the ring (upper bound);
- a fortress the rule cannot enter (forts, n = 13);
- messengers (the first ten forcing vertices);
- sheep and fence posts (vertex isoperimetry);
- an accordion that folds empty columns (reduction from arbitrary n to bounded patterns);
- floor tiles (interval covers with kernel-checked certificates).

It closes with a side story on the triangular prism and with why zero forcing matters.

一部约 6 分半的片子：环路、隔三站的地铁、"最后一个还在黑暗中的人"——八盏灯点亮每一个 P(n,3)。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-024-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does and does not claim · 主张边界

- **Lean-frozen.** All 40 `ZeroForcingThree*` modules have state files under `Golden/Frozen/state/` at the subject
  commit (16,693 lines). The theorem carries `OpenProblemResolutionClaim(Proved)` with the problem dossier
  `Problems/krishnan-zero-forcing-generalized-petersen-three.md`.
- **Literature screen is bounded.** The dossier records the screen before the work: the arXiv record (v1 only), the
  formal-conjectures catalogues, `conjectures.io` and `mathdb` returned no match. It is explicitly bounded and claims no
  worldwide priority. The film says so.
- **SAT evidence is not the proof.** The CaDiCaL results in scene 13 are quoted from the dossier:
  - UNSAT for p = 10 and 14 ≤ n ≤ 40;
  - SAT at n = 13;
  - SAT for p ≤ 9.

  They are external evidence, badged as such.
- **The prism scene formalizes a known refutation.** The Pandey parity conjecture (arXiv:2601.03293, Conjecture 4.1)
  was refuted publicly before trureturing's formalization; the dossier
  `Problems/pandey-parity-conjecture-refutation.md` records this. The film says "that refutation was already public".
- **Classical background.** Scene 15 is classical background, not part of this proof, and is badged so:
  - zero forcing arose in quantum control (Burgarth–Giovannetti 2007);
  - it bounds maximum nullity, M(G) ≤ Z(G), and hence minimum rank (AIM Minimum Rank Group 2008).
- **Recomputed for this film** (independent C/Python brute force):
  - Z(P(n,3)) for 9 ≤ n ≤ 20: 6, 8, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8. This matches the paper's values for n = 11…20.
  - u0…u7 zero-force P(9,3) and P(13,3); for P(12,3), u0…u6 already suffice.
  - For u0…u6 on P(13,3), closure stalls at 18 of 26 vertices. The 8 dark vertices {u7, u9, u10, u12, v0, v6, v9, v10}
    form a fort, which is the fortress drawn in scene 7.
  - Minimum external boundary over all 10-vertex sets:

    | n | 10-vertex sets | min \|N(X)\| |
    | --- | --- | --- |
    | 13 | 5.3 M | 7 |
    | 14 | 13.1 M | 8 |
    | 15 | 30.0 M | 8 |
    | 16 | 64.5 M | 8 |

    For 9-vertex sets at n = 14 the minimum is 7.
- **Schematic visuals.** Some visuals are illustrative, not data:
  - the six anchor-family cards (the actual families live in `ZeroForcingThreeFiniteCore` and `FortData1…6`);
  - the sheep pen;
  - the accordion strip;
  - the tile grid;
  - the matrix pattern (drawn for P(9,3)).

## Contents and evidence status · 章节与证据状态

| # | Scene · metaphor | Claim | Evidence | Lean |
| --- | --- | --- | --- | --- |
| 1 | lamps | how few lamps light everything? | — | — |
| 2 | title | — | — | — |
| 3 | ring road + subway | P(n,3): u_i–u_{i+1}, u_i–v_i, v_i–v_{i+3}; 3-regular | Lean frozen | `gp` |
| 4 | gossip / Minesweeper | colour-change rule; closure `Black` | Lean frozen | `Black`, `IsZeroForcing` |
| 5 | eight lamps | u0…u7 zero-force P(n,3) for n ≥ 9 | Lean frozen | `outerBlock8_zeroForcing` |
| 6 | table | Z = 7 at n = 11, 12; 8 for 13…20; conjecture for all n | literature + recomputed | — |
| 7 | fortress | a fort disjoint from S stays dark | Lean frozen | `IsFort.not_black_of_disjoint` |
| 8 | thirteen | Z(P(13,3)) = 8 via six anchor families and fort certificates | Lean frozen, kernel-checked certificates | `zeroForcingNumber13` |
| 9 | messengers | first p forcers X satisfy \|N(X)\| ≤ \|S\| (any finite graph) | Lean frozen | `firstForcers_boundary` |
| 10 | fence | n ≥ 14: every 10-set has \|N(X)\| ≥ 8 ⇒ Z ≥ 8 | Lean frozen, certificates | `ZeroForcingThreeTenBoundary` |
| 11 | accordion | 7 empty columns shortened by one, \|X\| and \|N(X)\| unchanged | Lean frozen | `ZeroForcingThreeGapLong` et al. |
| 12 | tiles | bounded gap patterns covered by interval covers | Lean frozen, certificates | `GapCover*`, `GapMaskBridge` |
| 13 | second witness | SAT results; recount n = 14–16 | external evidence + recomputed | — |
| 14 | prism | GP(3,1): 1 + 6x + 6x², real roots ⇒ parity conjecture false | Lean frozen (known refutation) | `ParityRefutation.result` |
| 15 | why | quantum control; M(G) ≤ Z(G) | classical background | — |
| 16 | ledger | Z(P(n,3)) = 8 for all n ≥ 13 | Lean frozen | `ZeroForcingThree.result` |

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
