# 049 · AURIC FIB ATOM PYRAMID XX · 金字塔 XX：单支系分割几何

A film of about 7 minutes, the twentieth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_SINGLE_LINEAGE_PARTITION_GEOMETRY.md` in trureturing at subject commit `342424dde6`.

The film follows one leaf through the substitution and asks what a unit interval can see of it. One line, cut again and
again, carries five modes, the golden ratio, an entropy rate and an honest frontier of what has actually been read.

- **The lineage code.**
  - Alpha has one child, beta. Beta has a left beta and a right alpha.
  - With β = 0 and α = 1, every lineage is a code with no two adjacent ones.
  - Three steps from β give exactly the five canonical modes. The start-by-end counts form A = N³ = [[3,2],[2,1]].
- **Legal codes.** One flip keeps a code legal exactly when it removes a one or turns on a zero between zeros. A code of
  length n with k ones has at most n + 1 − k such flips, with equality only for 1010…1.
- **Intervals keep brackets.**
  - Cutting every pair at a fixed ratio s turns a tree into labeled intervals, and the endpoints recover the tree.
  - ⟨⟨α,β⟩,α⟩ and ⟨α,⟨β,α⟩⟩ share the word αβα but have lengths (¼, ¼, ½) and (½, ¼, ¼) at s = ½.
  - On a circle the root mark must stay.
- **Five lengths.**
  - Substitution relabels α in place and splits β at ratio s.
  - The three-step windows have lengths s³, s²(1 − s), s(1 − s), s(1 − s) and (1 − s)², which tile the start interval.
  - The all-zero infinite code has no reading point.
- **The golden cut.**
  - Windows with the same end type have equal lengths exactly when s² = 1 − s, that is s = 1/φ.
  - Then 3φ⁻³ + 2φ⁻⁴ = 1, and the partition is the Kakutani refinement.
- **Scale is not history.**
  - With ℓ_α = 1 and ℓ_β = φ, every lineage telescopes to ℓ_end/(φⁿ ℓ_start).
  - The codes 001 and 101 both have length φ⁻⁴, at the disjoint addresses LLR and RR.
- **Entropy rate.**
  - b′ = 1 − (1 − s)b, and H′ − H = b·h₂(s).
  - The rate h₂(s)/(2 − s) never exceeds log₂φ ≈ 0.694, with equality only at s = 1/φ.
- **Halves.**
  - From α the leaf counts are 1, 1, 2, 3, 5, 8, 13. The entropies are 0, 0, 1, 3/2, 9/4, 23/8, 57/16, at rate 2/3.
  - At the golden ratio, log₂N − H stays below log₂φ.
- **What was read.**
  - With read weight μ, the β mass lies in [b_read, b_read + 1 − μ], and both ends are reached.
  - The midpoint has worst error (1 − μ)/2. μ = 1 exactly when the tree is recovered.
  - A small 1 − μ is not recovery.

一部约七分钟的片子：只跟踪一片叶在替换中的后代，追问一条单位区间能看见它的什么。一条线被一次次切开，承载着五种模式、黄金比例、一个熵率，以及一条如实标出“到底读到了什么”的前沿。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-049-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Arith/FibonacciAtomic/GenealogicalFiberTransport` has a state file at the subject commit. Its `result` states
    that n substitutions act injectively on every composition fibre of ordered trees, and that compositions follow the
    Fibonacci step.
  - `D5/S3/Combinatorics/Graph/LegalWordDegree` has a state file at the subject commit.
    - `degree_eq_flippable_add_occupation` states that a legal word's neighbours are its flippable zeros plus its ones.
    - `flippable_bound_and_equality` states that flippable zeros plus twice the ones is at most n + 1, with equality
      exactly for odd n and the alternating word starting with one.
  - The refine scene is badged Lean while it states the first. The third line of the lineage scene is badged Lean while
    it states the second. The finale's ledger names both.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the lineage correspondence and the five-mode windows;
  - the interval encoding and bracket recovery;
  - the five lengths and the boundary example;
  - the golden equivalences and the square picture;
  - the telescoping scale;
  - the entropy recursion and rate;
  - the halves table and the uniform-leaf gap;
  - the weighted frontier envelope, the minimax and the recovery bridge.
- **Classical tools named in the volume.** Badged as classical where they carry the narration: the Kakutani refinement.
  Entropy identities and the Gibbs inequality are used inside the volume's arguments.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Codes and trees.**
    - Legal code counts for n ≤ 13, the five windows and A = N³.
    - The flip count, its bound and its equality case for every legal word with n ≤ 14.
    - Bracket recovery from labeled endpoints on 300 random trees.
    - The T₁, T₂ example.
  - **Lengths and scale.**
    - The five products and their tiling, symbolically.
    - The golden equivalences and 3φ⁻³ + 2φ⁻⁴ = 1.
    - The Kakutani identity for 15 levels.
    - The telescoping formula on 200 lineages.
  - **Entropy.**
    - Both recursions and their closed forms at five ratios.
    - The rate maximum on a fine grid.
    - The halves table and the golden gap bound for n ≤ 22.
  - **Frontier.**
    - The envelope endpoints and the minimax on 300 trees.
    - The deep-leaf example.
- **Illustrative visuals.** These are illustrations, not data:
  - the reading points;
  - the scattered uniform points;
  - the circle;
  - the example trees and words.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
