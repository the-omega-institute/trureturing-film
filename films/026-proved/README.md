# 026 · FROM GUESS TO THEOREM · 猜想被证明

A film of about 6 minutes. It is the companion to film 025: eight conjectures from papers and the OEIS, each now
**proved** for every case by a Lean theorem that is frozen in trureturing at subject commit `75a2eeb8ea`. Each theorem
proves the published statement, with its quantifiers written out as a definition `claim`, as `result : claim`.

一部约 6 分钟的片子，《反例猎人》的姊妹篇：八个猜想，八个对所有情形成立的 Lean 证明。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-026-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## The eight cases · 八个案例

| # | Metaphor | Statement proved | Key idea of the proof | Lean module | Dossier (`Problems/`) |
| --- | --- | --- | --- | --- | --- |
| 1 | pixels | Rule 201 rows: Hasler's closed formula (OEIS A267681), plus Barker's recurrences and generating functions for A267681/A267680 | for n ≥ 1, cell x is ON ⟺ \|x\| ≥ 2, or x = 0 and n even | `D5/S3/StatisticalMechanics/CellularAutomata/Rule201Rows` | `oeis-a267681-rule201-barker-hasler` |
| 2 | rope and river | OEIS A400429: D₂(n) = (n² + 2n + [n odd] − 20)/2 for n ≥ 4 | cut at the midpoint and match the half-configurations | `D5/S3/Combinatorics/SemiMeanderSecondDiagonal` | `oeis-a400429-semi-meander-second-diagonal` |
| 3 | quantum game | Torpedo Game (Emeriau–Howard–Mansfield 2020): classical value 1 for every d ≥ 5 | pair rows and colour them in two patterns; the last three rows for odd d; d = 5 from the paper's colouring | `D5/S3/Quantum/Information/TorpedoGamePerfectClassical` | `emeriau-2020-torpedo-perfect-classical` |
| 4 | exact inverse | orthocross MIC (DeBrota–Fuchs–Stacey): every entry of G⁻¹ is an integer or a half, in every dimension and basis | explicit dual basis gives G⁻¹ exactly; Gaussian-integer bookkeeping | `D5/S3/Quantum/Measurement/OrthocrossGramHalfInteger` | `debrota-2020-orthocross-gram-inverse-half-integer` |
| 5 | arrows | (32; 1→3) arrow-pattern enumeration (Zhou–Yu 2026 open problem): 1 + (3x−2)F + (1−x)(1−2x)F² + x³F³ = 0 | split at the largest value; final-cycle bijection; uniqueness of the branch with F = 1 + x + … | `D5/S3/Combinatorics/ArrowThirtyTwoOneThree` | `zhou-yu-arrow-32-13-enumeration` |
| 6 | round table | cyclic permutations avoiding 4132 with 1324-avoiding cycle forms are counted by every third Padovan number (Archer et al. 2024) | block decomposition gives b_n = 3b_{n−1} − 2b_{n−2} + b_{n−3} | `D5/S3/Combinatorics/ArcherCyclicPadovan` | `archer-cyclic-4132-1324-padovan` |
| 7 | cubes in a corner | OEIS A381265: 3(2·A000219 − A000990 − 2·A000041 + 1) | the top layer is one of six shapes: three rods and three corners | `D5/S3/Combinatorics/TwoLayerSolidPartitions` | `meeussen-2025-a381265-two-layer-solid` |
| 8 | ledger | Nishioka–Sato eq. (C.12), JHEP 05 (2021) 074, for every k | Bernoulli polynomial at ½, then telescoping cancellation | `D5/S3/Quantum/FockSpace/HyperbolicScalarZetaIdentity` | `nishioka-sato-2021-bernoulli-harmonic-zeta-identity` |

## Evidence notes · 证据说明

- **Lean-frozen.** All eight modules have state files under `Golden/Frozen/state/` at the subject commit. Whether each
  `claim` is faithful to the printed sentence is a matter of review; each dossier records the exact reading.
- **Recomputed for this film** (independent Python):
  - Rule 201 rows for n ≤ 12 against Hasler's formula;
  - semi-meander counts 2, 8, 14, 22, 30, 40 for n = 4…9;
  - the even-d Torpedo construction is perfect for d = 6…40, and the d = 6 grid is the one shown;
  - orthocross 2G⁻¹ integral for d = 2…5 in random bases. The qubit G⁻¹ shown is in the standard basis.
  - the arrow series 1, 1, 2, 5, 15, 51, 190, 757, 3171, 13798, 61833, re-derived from the cubic;
  - Archer counts 1, 1, 2, 5, 12, 28, 65, 151 for n ≤ 8;
  - two-layer counts 6, 21, 57, 138, 294, 606 for n = 3…8;
  - (C.12) exactly zero for k ≤ 24.
- **Illustrative visuals.** These are illustrative, not data:
  - the ∀-domain dots;
  - the arrow drawn on the permutation 3142;
  - the round-table seating;
  - the triangle strip, which is drawn to Padovan side lengths but is not the geometric spiral;
  - the sample plane partition.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
