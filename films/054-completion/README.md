# 054 · AURIC FIB ATOM PYRAMID XXV · 金字塔 XXV：二阶关系的补全

A film of about 6½ minutes, the twenty-fifth and final part on the FIB atom pyramid. Its subject is
`AURIC_FIB_SECOND_ORDER_RELATION_COMPLETION.md` in trureturing at subject commit `2dda9bc022`.

Everything starts from two leaves, α and β, and the rule ρ(α) = β, ρ(β) = ⟨β, α⟩. Completing the relations between
two sources then takes the following, step by step:

- two numbers for the sources;
- three for their pair relations;
- a Lorentz cone for their shapes;
- a declared phase for the Bloch ball;
- for a frame-free completion, exactly three roles.

The topics:

- **Two readings.**
  - 2a + 3b and 3a + 5b have determinant 1 and recover (a, b) without denominators.
  - The third reading is the sum of the first two. 2, 3, 5, 8 needs exactly two states.
- **Three relations.**
  - (a², ab, b²) are independent, and the FIB step acts on them by T = [[0,0,1],[0,1,1],[1,2,1]].
  - The squares 4, 9, 25, 64, 169 obey z_{n+3} = 2z_{n+2} + 2z_{n+1} − z_n. Their Hankel determinant is 2, so exactly
    three dimensions are needed.
  - k-th powers need k + 1.
- **Moment geometry.**
  - The observation matrix [[4,12,9],[9,30,25],[25,80,64]] has determinant −2, and U = 40s₀ + 24s₁ − 15s₂.
  - Distance is U + W − 2V and area² is (UW − V²)/4. The triangle bound holds.
- **Lorentz cone.**
  - The FIB step keeps det S, flips oriented area and keeps no positive length, since φ² ≠ 1.
  - det S = τ² − x² − z², and shapes live on a hyperbolic plane where the steps keep distances exactly.
- **Phase and ball.**
  - A declared phase y gives det H = (s² − x² − y² − z²)/4. Positivity at trace one is the unit ball.
  - Closure under the bracket gives the identity and the three Pauli matrices.
- **Three roles.**
  - A permutation-equivariant completion x ⋆ y outside {x, y} exists only on three roles, and there it is unique.
  - Brute force over 2, 3 and 4 roles confirms this.
- **Fano plane.**
  - x + y on the seven nonzero vectors of 𝔽₂³ closes each pair into a line, kept by the 168 elements of GL(3,2).
  - Every operation-preserving map to three roles is constant.
- **The three-step ruler.** a³ − b³ = (a − b)(a − ωb)(a − ω²b), and a² + ab + b² is the one ruler a three-step
  rotation keeps.
- **The pyramid.**
  - Across twenty-five parts the pyramid grew from leaves into windows, seams, cycles, divisors and phases.
  - Lean has frozen all 107 modules of the FIB atomic arithmetic tree.

一部约六分半钟的片子，也是金字塔系列的最后一部：从两片叶子出发，补全两个来源之间的关系——来源要两个数，成对关系要三个，形状住在 Lorentz 锥里，声明的相位打开 Bloch 球，而无参照的补全恰好落在三个角色上。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-054-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - At the subject commit, all 107 Lean modules under `D5/S3/Arith/FibonacciAtomic` have state files.
  - The series scene's second line is badged Lean while it says so.
  - It also names the Robin results used in films 051 to 053: `Robin.SevenSmooth` and `GoldenResourceOptimalInteger`.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the two-reading recovery;
  - the three-dimensional completion and the square recurrence;
  - the moment recovery;
  - the Lorentz cone and the hyperbolic shape distance;
  - the phase contract;
  - the three-role uniqueness;
  - the Fano obstruction.
- **Classical tools.** Badged as classical where they carry the narration:
  - Sym²(ℝ²);
  - Gram and Cauchy–Schwarz;
  - Pauli matrices and the Bloch ball;
  - the Fano plane and GL(3,2);
  - the third cyclotomic polynomial.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Recovery and dimensions.**
    - The recovery on a 7×7 grid.
    - The T intertwining, the square recurrence and the Hankel determinant.
    - The minimal dimension k + 1 for k ≤ 7.
  - **Moments and the cone.**
    - The moment inversion and the triangle bound on 50 random sources.
    - Area and orientation on 50 samples, and the Lorentz form.
    - Shape-distance invariance under five FIB steps on 30 pairs.
  - **Phase.** The Bloch ball on 200 points, and the Pauli brackets.
  - **Roles and the Fano plane.**
    - The equivariant completions on 2, 3 and 4 roles by brute force.
    - The Fano lines, |GL(3,2)| = 168, and all 3⁷ maps to three roles.
  - **Cyclotomic.** The cyclotomic factorization.
  - **Lean.** The count of frozen state files.
- **Illustrative visuals.** These are illustrations, not data:
  - the tree;
  - the rotating cone and ball;
  - the drifting shape points;
  - the rotating triangle of roles;
  - the module grid.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
