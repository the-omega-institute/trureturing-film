# 020 · ODD COVERING SYSTEMS · Erdős 第七问题 · 奇数覆盖系统

A film of about 6½ minutes on trureturing's attack on
[Erdős problem #7](https://www.erdosproblems.com/7): *is there a distinct covering system all of
whose moduli are odd?*

The project lives in:

- `Problems/erdos-7-odd-covering-systems.md` (index);
- `docs/reports/erdos7-odd-covering/` (79 problem write-ups, 702 working notes, 145 verifier
  scripts, 14,140 certificate files);
- `Library/Arith/lettlsun2008cosets.md`;
- the frozen Lean module `D5/S3/Arith/Congruence/TwoOddPrimeUncoveredDensity.lean`.

**The problem is open.** The film shows what the project has certified, which premises it
borrows, what it refuted, and where it stopped.

一部约 6 分半的专题：这不是解答，而是一张地图——每一道墙都经过认证，每一个前提都写明出处，每一条声称的捷径都被检查过。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-020-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does and does not claim · 主张边界

- **Status.** Erdős #7 remains open. The problem page was still open when the project read it on
  28 September 2026. No scene claims a solution.
- **Evidence tiers.** Each scene carries a badge:
  - **LEAN KERNEL · FROZEN.** Only one result: `two_odd_prime_uncovered_density`. If every modulus
    divides p^A·q^B for two distinct odd primes, at least 1/8 of the residues stay uncovered.
    Frozen state: `Golden/Frozen/state/D5/S3/Arith/Congruence/TwoOddPrimeUncoveredDensity.lean.json`.
  - **PAPER PROOF + EXACT CERTIFICATES.** Ordinary proofs with exact rational arithmetic
    checked by the project's Python verifiers. The project states these are "not an end-to-end
    Lean theorem".
  - **USES A STATED EXTERNAL PREMISE.** Results that rest on cited theorems the project did not
    re-prove:
    - the 7-vertex blocks use Schroeder's nine-prime geometry (v1.0.1);
    - the cutoff 19 uses Theorem 6.1 of Balister–Bollobás–Morris–Sahasrabudhe–Tiba;
    - the seven-small-primes result uses Rosser–Schoenfeld via Schroeder Lemma 8.2;
    - the eight-prime cores need the chapter 23/31 interfaces.
  - **PRIOR LITERATURE:**
    - Balister–Bollobás–Morris–Sahasrabudhe–Tiba (distinct squarefree moduli ⇒ an even modulus);
    - Hough–Nielsen, Duke Math. J. 168 (2019) (every covering system has a modulus divisible by
      2 or 3);
    - Schroeder 2026 preprints (at most three prime factors per modulus; ≥ 9 primes);
    - Mian–Siddique 2026 (Lean, lcm > 10000);
    - Öztürk's preprint advertises the same 11,486,474 threshold; the project could not obtain
      its full text.
  - **PROJECT AUDIT.** The audits of two external claimed proofs are the project's own
    findings (problem-details 71 and 75). The film names the failing steps, not the authors.
- **Recomputed for this film:**
  - the even covering {0 mod 2, 0 mod 3, 1 mod 4, 5 mod 6, 7 mod 12};
  - the divisor reciprocal sums 103/105 (315), 65/63 (945) and 73/55 (45045);
  - 11486475 = 3³·5²·7·11·13·17 and 6891885 = 3⁴·5·7·11·13·17;
  - the 15/8 bound behind the Lean theorem.

  Four project verifiers were re-run, all with exit code 0:
  - `verify_star_cycle_obstruction.py`;
  - `elementary-checks/verify_prefix_obstruction.py`;
  - `verify_srct_exact_two_e7_implication.py`;
  - `elementary-checks/verify_masked_square.py`.
- **Schematic visuals.** Some visuals are illustrative, not data:
  - the positions of the 191 escaping residues;
  - the dots standing for 23,758 candidate periods;
  - the 463 dots of the hole scene;
  - the example tree, cycle and cactus graphs;
  - the moving tail primes.

## Contents and evidence status · 章节与证据状态

Paths are in trureturing at `12fe986f5e`; `pd/` = `docs/reports/erdos7-odd-covering/problem-details/`.

| # | Scene | Claim | Source |
| --- | --- | --- | --- |
| 00 | Covering | {0 mod 2, 0 mod 3, 1 mod 4, 5 mod 6, 7 mod 12} covers ℤ | classical; recomputed |
| 02 | Density | Σ_{d\|315,d>1} 1/d = 103/105 < 1; 945 gives 65/63 > 1, yet ≥ 191 of 945 residues always survive (sharp; 74 for 315) | pd/02, pd/03 |
| 03 | Prior art | BBMST squarefree; Hough–Nielsen 2 or 3; Schroeder ≤ 3 prime factors and ≥ 9 primes; Mian–Siddique lcm > 10000 | as cited in the project |
| 04 | Sprint | 915 commits over 2026-09-16…28; 79 write-ups, 702 notes, 145 verifiers, 14,140 certificates ≈ 387 MB | `git log` / `git ls-files` at `12fe986f5e` |
| 05 | Lean | Two odd primes ⇒ ≥ 1/8 uncovered; Σ 1/d ≤ (3/2)(5/4) − 1 = 7/8 | frozen `TwoOddPrimeUncoveredDensity` |
| 06 | LCM wall | Any odd cover has lcm > 11,486,474; 23,758 candidates, 23,757 fail directly, 6,891,885 closed by a two-block split (1877957/1889280); first unexcluded 11,486,475 | pd/02 |
| 07 | Cutoff 19 | Head 3^a5^b7^c at any heights with all other primes ≥ 19 is noncovering (1388 steps to 11593, C ≤ 0.956616… < 1) ⇒ a cover uses 11, 13 or 17 | pd/03 (BBMST Thm 6.1 premise) |
| 08 | Prime graph | Forests, pseudoforests and cacti never cover (follows from Schroeder Thm 1.1); blocks ≤ 4 (pd/06c), ≤ 6 (pd/30) and ≤ 7 (pd/31, 1,058,304 residuals) are noncovering | pd/06, 06b, 06c, 30, 31; pd/70 for eight-prime cores with 3 and 5 |
| 09 | Seven primes | ≤ 7 prime divisors below 100,000 ⇒ no cover, any number of larger primes; seed mass > 2/125, tail < 29/4000 | pd/33 (Rosser–Schoenfeld premise) |
| 10 | Marginals | ≤ 5 support primes always fail a complete prime marginal (1/2, 1/2, 7/9, 74/75, 553/580); with six primes only 17 sets pass | `Library/Arith/lettlsun2008cosets.md` (MF1) |
| 11 | The hole | 463 classes, distinct odd moduli, divisor-closed, irredundant, primes 3–19; 170,272,916,129 uncovered; tails push uncovered density below any ε | report 450 §13 |
| 12 | Audit | "Global nonexistence" claim: renormalization inequality has the wrong sign (plus unproved localization, omitted reuse). "Exact-two-9" claim: gain bound requires 79,712 vs true 59,402 | pd/71, pd/75 |
| 13 | Frontier | Wanted-poster conditions above; the local-to-whole-cover bridge is open | index; report 450 |

Scenes 01 and 14 are the title and the recap.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
