# 039 · AURIC FIB ATOM PYRAMID X · 金字塔 X：秩、体积与算术分辨率

A film of about 7 minutes, the tenth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_RESIDUAL_RANK_AND_ARITHMETIC_RESOLUTION.md` in trureturing at subject commit `d73782d7c2`.

The question is when a new readout really adds information. One four-corner coefficient answers it in several
settings:

- **Same rule, different dimension.**
  - On 𝔽₃², the maps f = (u² + v², 0) and g = (u², v²) both sum to nonzero values along every line.
  - Against 1, u, v they span dimensions 4 and 5, so their codes have dimensions 5 and 4.
- **Residual rank.** What a new readout removes is its rank modulo the old readouts. Repeating, re-coordinatising
  or recombining old readouts removes nothing.
- **The four-corner difference.**
  - On the five patterns, every function is f∅ + (f₁ − f∅)x + (f₃ − f∅)y + (f₂ − f∅)z + J_f·xy, with
    J_f = f∅ + f₁₃ − f₁ − f₃.
  - The kernel of [1, x, y, z] is (1, −1, 0, −1, 1).
- **Second order.**
  - x², y² and z² add nothing.
  - For ℓ = ax + by + cz and m = a′x + b′y + c′z, J(ℓm) = ab′ + a′b, and J(ℓ²) = 2ab.
  - In characteristic 2 every square has J = 0, while xy still has J = 1.
- **Lifted volume.** The lifted 5 × 5 determinant is −J_f, so Vol₄ = |J_f|/24. The rank added is still one for every
  J ≠ 0.
- **Lattices and clocks.**
  - Over the integers the reachable boundary lattice has index |J|.
  - Modulo m every reachable boundary has gcd(m, J) preimages.
  - At precision p^k the number of solutions is p^min(e, k), where e = v_p(J).
- **FIB readouts.**
  - N₀ = 2x + 5y + 3z, N₁ = 3x + 8y + 5z and N₃ = 8x + 21y + 13z.
  - J(N₀²) = 20, J(N₁²) = 48, J(N₃²) = 336, J(N₀N₁) = 31.
  - The samples ∅ + joint and low + high read 49 and 29: equal mod 2 and mod 5, different over ℤ.
- **Combining readouts.**
  - gcd(20, 336) = 4 and 4xy = 17N₀² − N₃² − 4x + 16y + 16z.
  - gcd(20, 31) = 1 and xy = 14N₀² − 9N₀N₁ − 2x + 10y + 9z.
  - The mixed product needs both readings on one source.
- **The parity blind spot.** N₃ⱼ = F₃ⱼ₊₃x + F₃ⱼ₊₅y + F₃ⱼ₊₄z ≡ y + z (mod 2) for every j.
- **The guard reply.**
  - Keep the current parity, then feed the high pattern [5]. The guard rejects exactly when the seam x is 1.
  - "Remainder 1, then reject" equals (y + z)·x = xy, and happens only for the joint pattern.
- **Pyramid against tetrahedron.**
  - span{1, x, y, z} and span{1, x, y + z, xy} both have rank 4, meet in rank 3, and together span all five
    patterns.
  - The behaviour tetrahedron (0,0,0), (1,0,0), (0,1,0), (1,1,1) has volume 1/6.
- **Quantum squares.** (sX + tY)² = (s² + t²)I is blind to the state, while [X, Y]/2i = Z.

一部约七分钟的片子：同一条合法性规则可以给出不同的维数；在金字塔上，一个四角差 J 同时决定新增秩、提升体积、整数格点与模素数盲区；原生守卫的回复能读出再多标量加工也读不到的联合项。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-039-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** `D5/S3/Arith/SumFreeCodeDimensionRefutation` has a state file under
  `Golden/Frozen/state/D5/S3/Arith/` at the subject commit.
  - Its `result : ¬ claim` refutes "first-order sum-free maps on V(n) have equal code dimensions".
  - The private witnesses f = (u² + v², 0) and g = (u², v²) on 𝔽₃² satisfy `SumFree 1`, and
    `codeDim 2 1 f = 5`, `codeDim 2 1 g = 4`.
  - The film badges the ternary and code scenes as Lean only where they state these facts.
- **Theory volume, argued but not kernel-checked.** The volume marks every statement `Claim status: open`. Badged as
  theory:
  - the residual-rank framing;
  - the four-corner decomposition;
  - the second-order and characteristic-2 statements;
  - the lifted volume;
  - the lattice index and modular and p-adic counts;
  - the FIB readout table, the recovery identities and the parity blind spot;
  - the guard reading, an application of the pyramid continuation volume's proposition 10.5;
  - the two boundaries.
- **Classical tools named in the volume.** Badged as classical:
  - rank–nullity;
  - the simplex determinant volume;
  - the determinant–image-index fact;
  - the kernel of multiplication on a cyclic group;
  - the standard Pauli relations.
- **Recomputed for this film.** An independent Python/sympy script recomputes the following.
  - **The ternary plane.**
    - Both sums on all 9 × 8 parametrised lines.
    - The spans 4 and 5 and the kernels 5 and 4.
  - **The four corners.**
    - The four-corner decomposition and the kernel vector.
    - J(ℓm) and J(ℓ²) symbolically.
    - The base determinant −1, and |det| = |J| on 50 random rational f.
  - **Arithmetic.**
    - gcd(m, J) preimages for m < 40.
    - p^min(e, k) for p ≤ 7, k ≤ 5.
  - **FIB.**
    - N₀, N₁, N₃ from qMᵏc.
    - The J table 20, 48, 336, 31, 1.
    - The 49/29 sample.
    - Both recovery identities on all five patterns.
    - The Fibonacci formula and its parity for j < 20.
  - **The guard.**
    - The reply table from S = M³ and the stated d-vectors.
    - "remainder 1 and reject" = xy.
  - **Boundaries and quantum.**
    - The ranks 4, 4, 5, 3.
    - The tetrahedron volume 1/6.
    - The Pauli identities.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramids;
  - the plane-and-arrow sketch of residual rank;
  - the cycling lines on 𝔽₃², which are a real enumeration shown one at a time;
  - the J = 4 lattice strip;
  - the modular clocks, which are actual J = 20 maps;
  - the qubit spheres.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters and digits whole when wrapping Chinese subtitles.
