# 019 · EFFECTIVE RESOLUTION · 算术编码与有效分辨率

A film of about 6½ minutes on trureturing's theory volume
`docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_EFFECTIVE_RESOLUTION.md`
("递归关系观察：算术编码与有效分辨率", 11,676 lines, §1–11).

The volume carries one object between different representations: congruences, digit systems,
return blocks, prefixes and probabilities. It asks what each move costs. It treats five
properties as separate conditions:

- expressible;
- identifiable;
- obtainable;
- certifiable;
- computably normalisable.

The film walks through twelve concrete cases from finite arithmetic to non-invertible phase
transport. It ends on one sentence: resolution is what you can still legally do with what you
kept.

一部约 6 分半的专题：分辨率不是看得多细，而是保留下来的东西还能让你合法地做什么。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-019-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does and does not claim · 主张边界

- **Paper mathematics.** Every scene is an ordinary proof in the theory volume, or a direct
  application of a result the volume cites. The volume adds no Lean declarations. It says so
  itself, and claims no originality for its syntheses.
- **Ledger.** All 1,109 of the volume's ledger atoms are `residual-open` at the subject commit.
- **Claim status.** §10 and §11 are labelled "Claim status: open" in the volume. Scene 13 uses the
  §11 worked example and carries a separate badge for it.
- **Known results are credited:**
  - Charlier–Rampersad–Rigo–Waxweiler for the k·L^k state count (Thm 1.2);
  - Durand–Rigo for the Cobham-type non-conversion;
  - Bienvenu–Porter (*Deep Π⁰₁ classes*) and Bauer 2006 (König's lemma and the Kleene tree) for
    the effective-lift background in §2;
  - Pudlák and Durand–Romashchenko–Shen for the §3 logic thresholds (not shown in the film).
- **Recomputed for this film.** These values were recomputed from the volume's definitions and
  match it:
  - mod-9 survivors 6 vs 5;
  - Zeckendorf and binary low digits;
  - automaton sizes 18, 50, 98, 162 for k = 2;
  - the lower bounds (3^N+1)/2;
  - the binary mass 1/2;
  - envelope mass 243/250;
  - partial sums 1/2, 1/2, 3/4, 4095/4096;
  - the mod-15 pair;
  - 100 shape classes for 3×5 out of 2^15 = 32,768 sets;
  - the p^(0,0) witness at ε = 1/7;
  - k_n = gcd(12, 2^n) = 2, 4, 4.
- **Schematic visuals.** Some visuals are illustrative, not data:
  - the 18-state ring is an arrangement, not the automaton's transition table;
  - the ternary trees show which branches die, not the actual diagonal classes;
  - the grid values before the witness in scene 12 are an arbitrary example law.

## Contents and evidence status · 章节与证据状态

Line numbers refer to the volume. Paths are in trureturing at `eb1fd461c1`.

| # | Scene | Claim | Source |
| --- | --- | --- | --- |
| 02 | Same summary | Remove 0 mod 9 or 1 mod 9: both leave 8 residues, L = 9. Then remove 0 mod 3: 6 vs 5 | §1.1 (TM.364), l.157–171 |
| 03 | Digits | Zeckendorf 3 = 100 has low digits 00, like 0; binary 3 = 11. Weights mod 2 have period 3, so parity is never readable from bounded low digits | §1.2 (TM.387), (TM.390), l.421–456 |
| 04 | State cost | Divisibility by L on k-bonacci words needs exactly k·L^k states (18 for k=2, L=3) vs L for binary; no finite converter | Thm 1.2 (l.784), Prop 1.4, Cor 1.7 |
| 05 | Cover | The n-th integer is covered mod 3^n: every integer is hit, yet 3-adic survivors have measure ≥ 1/2, and \|H_N\| ≥ (3^N+1)/2 | (TM.366–370), l.192–242; Prop 2.4 (l.1823) |
| 06 | Ghost set | Classes forbidden by halting programs: μ(K) ≥ 1/2, no integer and no computable point; every point is a boundary point; exclusion has a finite witness, membership does not | Prop 2.2 (l.1766), §2.4 |
| 07 | Binary edge | Forbid [0ⁿ1], and [0] iff a machine halts: mass 1/2 either way, since 1/2 = Σ_{h≥2} 2^−h; extension of [0] is the non-halting predicate | Thm 2.40 (l.3509), (TM.672), (TM.675) |
| 08 | Comb | c forbidden words per level always leave a positive gap ⟺ d ≥ c+2; the binary comb {0ⁿ1} sweeps everything but 0^∞ | Prop 5.7.1 (l.6149), Thm 5.7.3 (l.6178) |
| 09 | Envelope | p(0) = 9/10, b₁ = 1: optimum 9/10; the count-only envelope at depth 3 allows {000,001,010,100} = 243/250 | Counterexample 7.1 (l.8316) |
| 10 | Waiting | Fair coin, Eτ = 2; layers n_j = 2^{n_{j−1}} give delayed E τ′ = ∞ with the same stopping event; finite for all laws ⟺ sup n_j/(n_{j−1}+1) < ∞ | Counterexample 7.5 (l.8582), Prop 7.7 (l.8551) |
| 11 | Seven shapes | {0,1} vs {6,10} mod 15: equal mod-3 and mod-5 counts, 1 vs 0 survivors after deleting 0 mod 5 then 0 mod 3; seven support shapes; 100 classes for 3×5 | §8.2.3 (l.9001), ER8.FB.14 (l.9259), table l.9897 |
| 12 | Noise | 3×3 grid, 16 readings ± ε: real recovery 2ε; probability output 20/9·ε (sharp for ε ≤ 1/7) via nine sources sharing one observation | §9, Thm ER9.SH.1 (l.10300), §9.4 |
| 13 | Phase memory | t ↦ 2t mod 12: port mod 2 needs k = 1, port mod 4 needs k = 2; full recovery needs k_n = gcd(12, 2ⁿ) = 2, 4, 4 labels, not 8 | Thm 11.5, Thm 11.7 (11.14), l.11640–11662 (claim status open) |

Scenes 00, 01 and 14 are the opening, the title and the recap.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
