# 029 · THE FUNDAMENTAL BIJECTION · 基本双射的循环

A film of about 5½ minutes on two conjectures of Kassie Archer and Robert P. Laudone, *Pattern avoidance and the
fundamental bijection*, arXiv:2407.06338. Both are frozen in trureturing's Lean library at subject commit
`a0b27fa38d`.

The fundamental bijection θ takes a permutation, writes each cycle from its largest element, lists the cycles in
increasing order of those elements, and erases the brackets.

| Conjecture | Statement | Lean theorem |
|---|---|---|
| 5.6, k = 3 | for σ ∈ {231, 312}, the σ-avoiders fixed by θ³ have generating function 1/(1 − x − x² − 2x³) | `D5/S3/Combinatorics/FundamentalBijection/ThetaCube.result` |
| 4.5 | permutations whose first k iterates avoid 132: t₂ is the cubic quasipolynomial in n mod 3 (n ≥ 2); for n ≥ 3, t₃ = 3n − 4, t₄ = 2n − 1, t₅ = n + 2, and t_k = 5 for k ≥ 6 | `D5/S3/Combinatorics/FundamentalBijection/ThetaIterate.result` |

The film tells the proofs through these pictures:

- seats and arrows (3 1 5 2 4 ↦ 5 4 2 1 3);
- cutting before records to run θ backwards;
- the loop 231 → 312 → 321 → 231;
- direct-sum blocks, giving F = 1/(1 − I);
- the successor chase that leaves only the blocks 1, 21 and two of size three;
- the five eternal survivors 123, 213, 231, 312, 321 followed by 4…n.

一部约 5 分半的片子：循环变成一行，一行又变回循环；两个关于基本双射的猜想，对每个 n 都已证明。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-029-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - All 53 `D5/S3/Combinatorics/FundamentalBijection/*` modules (22,471 lines) have state files under
    `Golden/Frozen/state/` at the subject commit.
  - The dossiers are `Problems/archer-laudone-theta-cube-231-312.md` and `Problems/archer-laudone-theta-iterate-132.md`.
- **Open.** `ThetaFixedDefs.fourthClaim` (k = 4) and `ThetaFixedDefs.fifthClaim` (k = 5) of Conjecture 5.6 are only
  stated in Lean. No frozen module proves them, and the film says they remain open.
- **Recomputed for this film** by an independent Python brute force:
  - θ(31524) = 54213, θ(215463) = 214635, and the orbits of θ on three letters;
  - for both σ = 231 and σ = 312, the θ³-fixed avoiders number 1, 1, 2, 5, 9, 18, 37, 73, 146, 293 for n = 0…9. This
    equals the series of 1/(1 − x − x² − 2x³).
  - The indecomposable θ³-fixed avoiders are exactly:
    - 1, 21, 312 and 321 for σ = 231;
    - 1, 21, 231 and 321 for σ = 312.
  - t₂ … t₈ for n = 2…9. Every value for n ≥ 3 matches the formulas; at n = 2 all layers equal 2, and the
    quasipolynomial for t₂ holds from n = 2.
- **Illustrative visuals.** These are illustrations, not data:
  - the orbiting ring on the title card;
  - the "schematic" successor-chase grid. The Lean proof's chase is general.
  - the curved arrows among the five survivors.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
