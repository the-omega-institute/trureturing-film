# 023 · FIBONACCI ATOMS II · Fibonacci 原子·第二部

A film of about 7 minutes. It is the second part on trureturing's theory volume
`docs/develop/theory/FIBONACCI_ATOMIC_RELATION_GENERATION.md`. At subject commit `91ab0e0852`
the volume has 12,695 lines, §1–129; film 022 covered §1–40. This part covers the new material
of §41–128: memory, time and the price of knowing. It highlights which parts are now
kernel-checked and frozen in Lean.

The metaphors, in order:

- nested vs separate drawers;
- a self-updating diary;
- a strobe light;
- dinner guests;
- photo albums;
- a recipe (7 cooked together vs 10 served apart);
- sculptures and their shadows;
- a coin window;
- Robin's tip jar;
- a toolbox that decides the notebook;
- a wine taster's sips;
- a witness with amnesia;
- watching vs booking appointments.

一部约 7 分钟、以比喻为主线的续集：同样的积木，更难的问题——必须记住多少，必须多常看一次，必须问多少个问题。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-023-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does and does not claim · 主张边界

- **Lean-frozen results.** A result is "Lean frozen" when its module has a state file under
  `Golden/Frozen/state/` at the subject commit. Six such modules appear, each with a green
  "LEAN KERNEL · FROZEN" badge. Frozen is not the same as digested. The volume's ledger
  (`Meta/Digestion/backfill/fibonacci-atomic-relation-generation`) has:
  - 657 atoms residual-open;
  - 48 absorbed-closed;
  - 25 nonpropositional-inapplicable.
- **The Riemann Hypothesis is not proved.** Nothing here proves it, and the volume says so
  repeatedly.
  - **Mertens window.** Lean proves only that the window bound is equivalent to the Mertens
    power bound. The link to RH is the classical Mertens criterion, used on paper.
  - **Robin.** Robin's criterion is a classical result (Robin 1984). Lean proves the
    inequality only for 7-smooth numbers 2^a·3^b·5^c·7^d > 5040. For all n the volume gives
    equivalent forms and finite certificates, and marks the rest open.
- **Paper results.** The drawers, recipe, sculptures, toolbox, witness and watch scenes are
  paper proofs in the volume and carry the "THEORY VOLUME · PAPER PROOF" badge. The sips
  scene rests on the volume's finite certificates (Assumption 107.5).
- **Metaphors are guides, not claims.**
  - The "diary" is the volume's autonomous record under coarsening.
  - The "strobe" is sampling at chosen times.
  - The "albums" are the Schmidt blocks of the stated finite additive-readout state.
- **Recomputed for this film:**
  - σ(5040)/5040 = 403/105 ≈ 3.838, against e^γ log log 5040 ≈ 3.817;
  - gcd(F_m, 5) for m = 4, 6, 8, 10;
  - the mod-255 pair blind spots 3, 17, 5 for times {0, 4, 9};
  - z(2), z(3), z(5), z(7) = 3, 4, 5, 8;
  - the sixty divisors of 5040 falling into 48 lists;
  - the toolbox state counts;
  - the sips ladder 61 → 48,459 → 535,501 → 604,801.
- **Not a volume claim.** A subagent brute force suggested that all 80 witness phases
  achieve 6 questions. This computation is unverified. The volume constructs strategies for
  60 phases and leaves 20 open, and the film says only that.
- **Schematic visuals.** Some visuals are illustrative, not data:
  - the lattice drawers;
  - the coin dots of the window scene;
  - the jar fill;
  - the colliding-pair dots of the recipe scene;
  - the sculpture shapes.

## Contents and evidence status · 章节与证据状态

Section numbers refer to the volume at trureturing `91ab0e0852`.

| # | Scene · metaphor | Claim | Evidence | Source |
| --- | --- | --- | --- | --- |
| 1 | open | volume grew to 12,695 lines; part is now in Lean | — | — |
| 2 | title | memory, time, questions | — | — |
| 3 | drawers | 25 defect classes: split iff gcd(F_m, 5) = 1; m = 4, 6, 8 split, m = 10 nests | paper | §41 |
| 4 | diary | self-updating record needs 3, 9, 27, 81 vs per-level 3, 9, 9, 9; canonical record attains it | **Lean frozen** | §42 · `D5/S3/Arith/FibonacciAtomic/RecordCapacity` |
| 5 | strobe | loss depends on F(gcd of gaps); Smith form diag(1, F_g); mod 255 blind spots 3, 17, 5 | **Lean frozen** | §44 · `D5/S1/Recurrence/FiniteSamplingSmithDefect` |
| 6 | guests | max pairwise-recovering times = min z(p); 5040 → 3, 315 → 4 | **Lean frozen** | §47 · `D5/S3/Arith/FibonacciAtomic/TimeSampling` (`pairwise_recovery_maximum`) |
| 7 | albums | flat Schmidt spectrum, cosets; S = log N − log k_A − log k_B | **Lean frozen** | Appendix FAR · `D5/S3/Quantum/Entanglement/FiniteAdditiveReadoutSpectrum` |
| 8 | recipe | 7 vs 10; 60 divisors → 48 lists, +1 bit separates | paper | §58–60 |
| 9 | sculpture | Möbius on 60 divisor states is a pure 4th-order relation, ±2/15 | paper | §63–64 |
| 10 | window | window bound ⟺ Mertens bound; RH only via classical criterion | **Lean frozen** + paper bridge | §66 · `D5/S3/Arith/FibonacciAtomic/MertensBoundary` |
| 11 | tip jar | Robin's criterion; 5040 exceeds; Robin for 7-smooth n > 5040 | classical + **Lean frozen** | §74–98 · `D5/S3/Arith/Robin/SevenSmooth` (`robin_seven_smooth`) |
| 12 | toolbox | memory 60, 1440, 3780, 5040, 60 by toolbox | paper | §100 |
| 13 | sips | h(5040) = 3; ladder 61 → 48,459 → 535,501 → 604,801 | paper + finite certificates | §104–108 |
| 14 | witness | cost = max(4, 4, 4, 6) = 6; 60 of 80 phases built, 20 open | paper | §113–125 |
| 15 | watch | 8/7 continuous, 7/6 chosen times, 8 non-adaptive | paper | §121–128 |
| 16 | finale | ledger of Lean vs paper; RH not proved | — | — |

## Build · 构建

The pipeline is the same as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
