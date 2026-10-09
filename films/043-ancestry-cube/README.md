# 043 · AURIC FIB ATOM PYRAMID XIV · 金字塔 XIV：祖先立方体与取得代价

A film of about 6.5 minutes, the fourteenth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_ANCESTRY_CUBE_AND_ACQUISITION_COST.md` in trureturing at subject commit `29340cdaad`.

One Fibonacci leaf word of 89 leaves contains an explicit family of 2,097,152 different source trees. Confirming that
the true one is the canonical tree costs at least 21 separate reads. The film follows how that happens:

- **Same word, other brackets.**
  - B = ⟨⟨β, α⟩, β⟩ = T₃ and D = ⟨β, ⟨α, β⟩⟩ share the leaf word βαβ.
  - Their intrinsic depths are 3 and 0.
- **The left alpha.**
  - After one substitution, α only appears as the right leaf of a ⟨β, α⟩ pair.
  - A node whose left child is the leaf α proves a tree is not an image, and D has one.
- **Independent positions.**
  - In T_n the copies of B sit at K_n = F(n − 2) non-overlapping positions. Each can be flipped to D independently,
    and the leaf word never changes.
  - At n = 10 that is 89 leaves, 21 positions and 2²¹ trees.
  - K_n / M_n → φ⁻³.
- **The joint condition.**
  - ν(V_A) = n·∏(1 − ε_p): depth n with no defect, 0 with any defect.
  - The top coefficient of the expansion is (−1)^K ≠ 0.
- **The ancestor cube.**
  - The gap areas ℓ_i r_i sum to C(M, 2).
  - A defect turns the local (1, 2) into (2, 1), so ‖𝒜(V_A) − 𝒜(V_A′)‖² = 2|A △ A′| and the family is an orthogonal
    cube with edge √2.
  - Every leaf-word quantity is identical across the cube.
- **Close is not equal.** The normalized cube has diameter √(2K)/C(M, 2) → 0, yet it still holds depth n and depth 0.
- **All low orders agree.**
  - The even- and odd-size defect laws agree on every marginal below K.
  - E_even[ν] = n/2^(K−1) and E_odd[ν] = 0.
- **Six addresses.**
  - B and D differ on exactly six addresses below their position: L, R, LL, LR, RL and RR.
  - The supports are disjoint, so each hit fixes one bit and the consistent set has 2^(K − |H|) sources.
- **Twenty-one reads.**
  - Confirming the canonical tree needs all K supports; finding one defect proves depth 0.
  - Over the full same-word fiber, 21 ≤ C_word(T₁₀) ≤ 34, and the endpoints are not shown equal.
- **No free shortcut.**
  - With at most q supports checked, the best success is 1/2 + q/2K, so error ≤ δ needs q ≥ (1 − 2δ)K.
  - The area summary D(t) = |A| decides depth but is not a free input.
- **Same operator.**
  - The leaf-word product encoding is associative, so every tree compiles to the same operator.
  - Only a stronger coherent address oracle allows Grover search, which takes 3 iterations at K = 21 for
    probability 0.999.
- **The set shrinks.**
  - Reading never moves the source; it shrinks the consistent set.
  - Under the uniform prior, Pr(A = ∅ | clean so far) = 2^(−r).

一部约六分半钟的片子：同一个 89 片叶子的叶词里藏着 2,097,152 棵不同的树；每个局部括号缺陷都有自己的六个证据地址，确认规范来源需要读遍全部 21 个支持——一个比特的答案，二十一份证据。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-043-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Arith/FibonacciAtomic/ActualTreeReadoutAcquisition` has a state file at the subject commit.
  - Its `source_foundation` includes `∀ t, alphaValid (ρ t) = true`: in every one-step image each α leaf is the right
    leaf of a ⟨β, α⟩ pair, so no node has the leaf α as its left child.
  - The obstruction scene is badged Lean while it states this.
- **Theory volume, argued but not kernel-checked.** The volume marks every statement `Claim status: open`. Badged as
  theory:
  - the defect family and its count;
  - the depth product;
  - the ancestor cube;
  - the normalized diameter;
  - the parity laws;
  - the address supports and face theorem;
  - the query lower bound and the certificate range;
  - the randomized success formula;
  - the area summary;
  - the operator collapse;
  - the record posterior.
- **Classical tools named in the volume.** Grover search, cited by the volume, is badged as classical in the quantum
  scene. Loday's ancestor-area coordinates and the certificate–query distinction are cited as background.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Trees and depth.**
    - The orbit, T_{n+2} = ⟨T_{n+1}, T_n⟩, the depths of B and D.
    - The image law on all 3,238 images of trees with up to 6 leaves.
    - |P_n| = F(n − 2) for n ≤ 15.
    - All 2^K variants for n ≤ 8: distinct, same word, depth n or 0.
    - 60 random variants at n = 10.
    - The table rows and K/M → φ⁻³.
  - **The ancestor cube.**
    - Gap-area sums C(M, 2).
    - ‖Δ𝒜‖² = 2|A △ A′| on all 256 subsets at n = 8.
    - The normalized diameters.
  - **Parity and addresses.**
    - Parity marginals for K = 4.
    - The local reply table.
    - A single defect changing replies exactly on its six addresses, for every address up to length 9 at n = 8.
  - **Bounds.**
    - The success values.
    - The δ bound.
    - The Grover probabilities, including the n = 5 value 1/2.
- **Illustrative visuals.** These are illustrations, not data:
  - the animated defect subsets;
  - the rotating cubes;
  - the cube-face cutting, drawn for three positions;
  - the read counter.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters and digits whole when wrapping Chinese subtitles.
