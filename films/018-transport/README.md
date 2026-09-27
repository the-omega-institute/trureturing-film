# 018 · TRANSPORT · MEMORY · COMPLETION · 运输·任务记忆·完备化

A film of about 5½ minutes on trureturing's theory volume
`docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_TRANSPORT_MEMORY_COMPLETION.md`
("递归关系观察：运输、任务记忆与完成化", 5,155 lines, §1–11).

The volume studies three verbs:

- **Transport.** Carry a phase along a path.
- **Remember.** Keep only what a named future task demands.
- **Complete.** Take finite readings to a limit, without pretending the limit was ever reached.

Its two warnings open the film. A mathematical inverse is not automatically an executable
operation. A geometric repair is not automatically a channel you may use again.

一部约 5 分半的专题：观察者应当带向未来的，不是见过的一切，而只是下一个合法步骤仍然需要的东西。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-018-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does and does not claim · 主张边界

- **Paper mathematics.** Every scene is an ordinary proof in the theory volume. The volume adds no
  Lean declarations of its own. It cites existing Lean declarations only for side steps, for
  example the gluing and finite-name counterexamples in §5.1.
- **Ledger.** All 346 of the volume's ledger atoms are `residual-open` at the subject commit.
- **Known results are credited:**
  - Hoffman error bounds, via Peña–Vera–Zuluaga (arXiv:1905.02894), for the star repair in §3.6;
  - Karp–Miller–Winograd 1967 and Austrin–Pitassi–Wu (arXiv:1109.4910) for recurrence schedules
    and layout / one-shot pebbling in §4.1;
  - Witsenhausen 1976 for zero-error side information and chromatic numbers in §8 and §11;
  - Campêlo–Corrêa–Moura–Santos 2013 for k-fold colorings of webs in §11.
- **Finite checks.** The volume states that the 35-down-set enumeration is a finite check, not a
  general proof. The film repeats only its result, a minimum peak of 3.
- **Recomputed for this film.** These values were recomputed from the volume's definitions and
  match it:
  - the grid corner 11;
  - peak memories 4 / 3 / 6 and the minimum of 3 over 35 down-sets;
  - the XOR count, 4 of 8 triples;
  - the two-bit sampling optimum 3/4;
  - W₃ = 17;
  - I(R;S,Y) = 11/4;
  - the m=5, j=7 label count 11, with at most 10 candidates per reading.
- **Schematic visuals.** Several visuals are illustrative, not data: the carried-forward dots in
  the opening, the title graph, the clock circle dots and the clash-graph wedge.

## Contents and evidence status · 章节与证据状态

Line numbers refer to the volume. Paths are in trureturing at `49a781c42e`.

| # | Scene | Claim | Source |
| --- | --- | --- | --- |
| 02 | Anchor | One edge, no loop: with both references fixed, \|1+e^{iφ}\|² reads 4 or 0; anchored invariants number m − n + k | Ex 1.7 (l.158), Thm 1.9, Cor 1.10 |
| 03 | Phase | h = (I₀−2)/2 − i(I_{π/2}−2)/2; h=±i agree at θ=0, split 0 / 4 at θ=π/2; h=1 vs e^{iπ/m} end at distance 2 after m repetitions | Prop 2.9 (l.1001), Counterexample 2.12 (l.1061) |
| 04 | Memory | Circle double cover: \|M\| = 2 if the task reads the branch, 1 if it reads position; S₃ with a=(12), b=(23): \|G\|=6, \|M\|=3, ab and ba separated by one more a | §2.4 (l.613), §2.5 (l.643) |
| 05 | Gluing | Keeping only pairwise XORs: all 8 triples pass locally, only the 4 with r₁₂⊕r₂₃⊕r₃₁=0 lift globally | §3.1 (l.1312) |
| 06 | Star repair | Star with n leaves, at most one on: edges off by 1/n, nearest consistent whole at distance 1, optimal constant H_n^opt = n; sum-of-edge-errors norm gives 1 | §3.6.5 (l.1601) |
| 07 | Grid | d_ij = c_ij + min(d_{i−1,j}, d_{i,j−1}) on a 3×4 grid gives corner 11; peaks: rows 4, columns 3, waves 6; minimum over all 35 down-sets 3 | §4.1 (l.1765) |
| 08 | Sampling | Target S={00,11}, r₁=r₂=3/4: step-by-step legal optimum 3/4 vs static capacity bound 1 | Prop 4.5 (l.2047), §4.6.4 |
| 09 | Carry | Two-digit counter, high digit visible: first change at τ gives low digit p−τ; fewest reads ⌈log₂P⌉ vs shortest wait P−1; W_j=(j−1)2^j+1, 17 at P=8 | (CE.30) l.3904, Thm 6.5 (l.4217) |
| 10 | Clock bit | Hidden schedule: N=7 and N=15 give the same phase and reading with different sources; one parity bit fixes it; I(R;S,Y) = 11/4 of 3 bits | Props 7.1–7.3 (l.4341–4390), Thm 10.2 (l.4726) |
| 11 | Labels | Label count = chromatic number of the clash graph; ε<1 → 2, 1≤ε<2 → 4, 3≤ε<4 (j≥5) → 8; m=5, j=5..8 gives 10, 10, 11, 10; at j=7 every reading has ≤10 candidates yet 11 labels are needed | Thm 11.3, 11.5, Prop 11.12 (l.5074), Thm 11.13 (l.5087) |

Scenes 00, 01 and 12 are the opening, the title and the recap.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
