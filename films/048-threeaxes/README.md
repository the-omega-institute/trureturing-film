# 048 · AURIC FIB ATOM PYRAMID XIX · 金字塔 XIX：观察者的三根轴

A film of about 5 minutes, the nineteenth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_OBSERVER_INTERNAL_THREE_AXIS_GEOMETRY_AND_PREDICTIVE_INTERFACE.md` in trureturing at subject commit
`1c1f224301`.

Where do three dimensions come from when an observer has no outside coordinates at all? Distances build a space. A
lossless area with a cycle rule makes it exactly three-dimensional, and two FIB atoms produce the third axis.

- **Distances.**
  - An anchored Gram matrix is built from distances to one reference event. When it is positive semidefinite it
    builds a space, and its rank is the smallest dimension that fits.
  - Distances 1, 1 and 3 fail: one combination has squared length −5.
- **Residual.**
  - Three orthogonal unit axes keep a projection, and the leftover squared length is zero exactly on their span.
  - The points (1, 2, 3, ±1) have the same distances to the origin and to all three axis ends. They differ by 2 along a
    fourth direction, and the Gram determinant of the axes and the point equals the residual 1.
- **Probes.**
  - Exact inversion of three unit probes amplifies error by at most 1/√λ_min of their Gram matrix.
  - The trace is 3, so the amplification is 1 only for orthogonal probes. This explains efficiency, not the number
    three.
- **Area and Jacobi.**
  - A bilinear product with the area law, full alternation and the Jacobi rule forces exactly three dimensions.
  - The seven-dimensional octonion product keeps the area law but misses Jacobi by at least 1 on an outside direction.
- **Two atoms.**
  - With a and b orthonormal, c = B(b, a) closes the cycle B(c, b) = a and B(a, c) = b.
  - Substitution reads out as a rotation of order three, and every ordered tree reads out to one of seven values:
    0, ±a, ±b, ±c.
- **Periodic readout, aperiodic source.** Three substitutions return the readout to a, but ⟨⟨β, α⟩, β⟩ has composition
  one α and two β.
- **Predicting the future.**
  - Three current readings decide all future readings exactly when the adjoint of every operation keeps the probe span.
  - States 0 and e₄ both read (0, 0, 0), and one orthogonal update later they read 0 and 1.
- **A quantum block.**
  - The Pauli operators give XY = iZ = −YX, and the three variances sum to at least 2.
  - CNOT into the same environment twice returns |+⟩. With a fresh environment each time, the state stays I/2.

一部约五分钟的片子：当观察者没有任何外部坐标时，三个维度从何而来？距离搭出空间，无损面积加上循环律使它恰为三维，两个 FIB 原子生出第三根轴。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-048-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Arith/FibonacciAtomic/CliffordLeafOrbit` has a state file at the subject commit.
  - Its `result` takes the Clifford algebra with A² = 1, B² = −1 and AB + BA = 1. It states that the canonical
    substituted source reads out as A, B, BA, A + B, −B, AB with period exactly six. It also states that no rule on
    the readout alone predicts the substituted readout of every tree.
  - The period scene is badged Lean while it states this, and the finale's ledger names it.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the three-axis bridge from relations;
  - the residual and the twin points;
  - the two-atom product and the tree readout;
  - the closure criterion for prediction and the hidden return;
  - the quantum block.
- **Classical tools named in the volume.** Badged as classical where they carry the narration:
  - distance geometry and Gram matrices;
  - the probe error bound;
  - the area-and-Jacobi dimension theorem, the cross product and the octonion product;
  - the Pauli operators.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Distances and residual.**
    - The anchored Gram matrix and its rank on 30 random point sets.
    - The failing data 1, 1, 3, and the twin points with their Gram determinant.
  - **Probes and products.**
    - The amplification bound on 500 random probe sets.
    - The area law and Jacobi for the cross product.
    - The area law, alternation and Jacobi defect for the octonion product.
  - **Atoms and trees.**
    - The cycle table and the order-three rotation.
    - The readout of 42 trees, and its seven values.
    - The composition of ⟨⟨β, α⟩, β⟩.
    - The six Clifford phases in a faithful 2 × 2 representation, for j = 0 to 13.
  - **Prediction and quantum.**
    - The hidden return.
    - The Pauli relations and the variance sum on 100 random states.
    - Both CNOT histories.
- **Illustrative visuals.** These are illustrations, not data:
  - the drawn axes;
  - the rotating frames;
  - the tree diagrams;
  - the Bloch-style sphere.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
