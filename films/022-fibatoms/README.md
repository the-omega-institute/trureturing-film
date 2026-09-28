# 022 · FIBONACCI ATOMS · Fibonacci 原子关系生成

A film of about 6½ minutes on trureturing's theory volume
`docs/develop/theory/FIBONACCI_ATOMIC_RELATION_GENERATION.md`
("Fibonacci 原子关系生成理论", 2,555 lines, §1–40).

The volume starts with two atoms, α and β, one ordered snap ⟨s,t⟩ and one substitution rule
(α → β, β → ⟨β,α⟩). It asks how the unit, the natural numbers, golden integers, primes and
loop checksums can be earned from explicitly stated relations. The film tells it through
everyday metaphors:

- LEGO bricks;
- a rabbit family tree;
- recipe vs ingredient list;
- 2¢ and 3¢ coins;
- two purses;
- two photographs;
- a lock with Fibonacci keys;
- a zip file and Morse code;
- two shadows;
- a toolbox and a chocolate bar;
- a four-key safe and a ring road;
- an odometer;
- a whisper two rooms away;
- a loop clock.

一部约 6 分半、以比喻为主线的专题：两种积木，一种扣法，一条兔子规则——每一个数都是挣出来的。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-022-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does and does not claim · 主张边界

- **Paper mathematics.** The volume says its unified construction and proofs have not been
  compiled to Lean as a whole ("尚未整体编译为 Lean 证明"). Every scene carries the badge
  "PAPER PROOF · NOT YET IN LEAN".
- **Status of the volume.**
  - Added 2026-09-28.
  - Author type `mixed`: user-provided theory text, structured by Codex.
  - Not yet ingested into the digestion ledger, so it has no atoms at the subject commit.
- **Stated conditions.** The quantum statements in scenes 11 and 12 hold only for the stated
  equal-weight state and boundary cut (§23, §28), and the scenes carry a separate badge.
- **Physics disclaimed.** Every bridge to spacetime, entanglement entropy, RT/AdS/CFT or
  physical time is marked open by the volume (§14, §18.8, §22.2, §24, §40). The film says so.
- **Metaphors are guides, not claims.** Where each one breaks:
  - the coin "cent" is created by the declared relation, not assumed;
  - the photos recover counts but not order;
  - the chocolate bar is a picture of closed substructures, not a primality test;
  - the "whisper" lag is precision, not time.
- **Recomputed for this film:**
  - the readings 2, 3, 5, 8, 13 of T₀–T₄;
  - 3α and 2β both read 6, then 9 vs 10;
  - (7,4) → (26,41) and back;
  - Δ(5,13) = −79;
  - |det(Mᵗ − I)| = 5, 11, 16, 29, 45, 121 for t = 4, 5, 6, 7, 8, 10.

  The subagent reading pass separately brute-forced:
  - the lossless-weight classification up to 1000;
  - the prime pairs (2,3) and (3,5);
  - the index-5 gap and 5∂ = (2M − I)(I − J);
  - the closed pieces mod 13 and mod 21;
  - the odd-n perfect tensor;
  - the T₉ spectrum {4/9, 2/9, 2/9, 1/9};
  - the three-node loop's 3, 9, 9, its Smith form (1,1,9) and (1,−2,4)B = (9,0,0);
  - the Smith forms of Mᵗ − I;
  - the Frobenius bound for odd primes ≤ 97.
- **Schematic visuals.** Some visuals are illustrative, not data:
  - the lattice dots of scene 10;
  - the post-subtraction bars in scene 12 (drawn as three equal bars);
  - the rooms of scene 13;
  - the clock hand in scene 14.

## Contents and evidence status · 章节与证据状态

Line numbers refer to the volume at trureturing `afa2ec8eab`.

| # | Scene · metaphor | Claim | Source |
| --- | --- | --- | --- |
| 00 | Two bricks | Atoms α, β and an ordered, non-associative snap ⟨s,t⟩; no numbers yet | Def 2.1 (l.13) |
| 02 | Rabbit rule | ρ(α) = β, ρ(β) = ⟨β,α⟩; T_{j+2} = ⟨T_{j+1}, T_j⟩; counts evolve by M, M² = M + I, growth rate φ | Def 3.1, Thm 3.2, Thm 3.4 (l.39–89) |
| 03 | Recipe vs list | The composition count forgets order: ⟨α,β⟩ and ⟨β,α⟩ have the same list | Def 3.3 (l.67) |
| 04 | Coins | Declared relation 3α ~ 2β; e = β − α is the unit, α = 2e, β = 3e; internal (ℕ, +, ×) | Def 4.1, Thm 4.2, Thm 4.4 (l.93–137) |
| 05 | Two purses | 3α and 2β both read 6, next 9 vs 10: no rule on one reading predicts the next | Thm 5.1 (l.141) |
| 06 | Two photos | (n, n′) = [[2,3],[3,5]](a,b), det 1; (7,4) → (26,41); mod m needs m² states | Thm 5.4, Cor 5.5 (l.159–180) |
| 07 | Fibonacci lock | \|u² + uv − v²\| = 1 ⟺ consecutive Fibonacci; prime pairs (2,3), (3,5); (5,13) gives Δ = −79, blind spot mod 79 | Thm 6.2, 6.3, Cor 6.4, Prop 6.5 (l.195–230) |
| 08 | Zip / Morse | Readings F_{j+3}; certified Fib-prime atoms unzip exactly; prefix-free code α → αα, β → αβ, ⟨s,t⟩ → β·s·t recovers the tree | Thm 8.2, 8.4; Thms 9.2–9.3 (l.276–342) |
| 09 | Two shadows | Commuting operators = ℤ[φ]; two readings lossless ⟺ unit; θ⁴, θ⁵, θ⁸, θ¹⁶ read 13, 21, 89, 4181 (unit ≠ prime) | Thm 15.2, 15.6, Prop 15.10 (l.590–757); §18 |
| 10 | Toolbox · chocolate | ⟨M, J⟩ has index 5 in Mat₂(ℤ); δ = 2θ − 1, δ² = 5; 5∂ = (2M − I)(I − J); mod n closed pieces = divisor multiples, prime ⟺ atomic (mod 13 vs mod 21) | Thms 19.2–19.4 (l.1194–1320); Thm 20.2, Cor 20.3, Thm 20.5 (l.1343–1438) |
| 11 | Four-key safe · ring road | T_n(u,v) = (u, v, u+v, u+2v) is a perfect tensor ⟺ n odd; an odd loop hides gcd(n, 2^L + 1) | Thm 23.2, Prop 23.3, Thm 23.4 (l.1616–1704) |
| 12 | Odometer | Carries couple digits; dropping the high digit of T₉ gives {4/9, 2/9, 2/9, 1/9}; subtracting carries gives T₃ ⊗ T₃ | §25; Thm 28.2, Prop 28.3 (l.1968–2032) |
| 13 | Whisper | Loop B = [[1,2,0],[0,1,2],[2,0,1]]: hidden 3, 9, 9, recovery lag 2, inverse limit 0; defect group ℤ/9 is a boundary checksum | Thm 29.3, Thm 30.1 (l.2058–2094); Prop 34.3 (l.2302) |
| 14 | Loop clock | D_t = ℤ² / (Mᵗ − I): 5, 11, 4×4, 29, 3×15, 11×11 for t = 4, 5, 6, 7, 8, 10; every prime appears | §38, Thm 38.1 (l.2449–2501) |

Scenes 01 and 15 are the title and the recap.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
