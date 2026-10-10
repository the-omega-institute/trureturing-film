# 052 · AURIC FIB ATOM PYRAMID XXIII · 金字塔 XXIII：接缝、闭路与算术边界

A film of about 8 minutes, the twenty-third part on the FIB atom pyramid. Its subject is
`AURIC_FIB_SEAMS_CYCLES_ARITHMETIC_BOUNDARY_RECONSTRUCTION.md` in trureturing at subject commit `360d995316`.

The film glues boxes along seams, closes them into cycles and carries the same corners to Robin's inequality. At each
step it keeps the guards, the cut, the direction and the shared scale.

- **Corners.**
  - An affine-in-each-direction response is fixed by 2, 4 or 8 corners, and its box average is the corner average.
  - On a simplex the weight is Vol/(d+1).
  - The bubble x(1−x)y(1−y)z(1−z) vanishes on the boundary but integrates to 1/216.
- **The five-mode kernel.**
  - The modes are [null], [2], [3], [5] and [25], with weights 1, x, y, z and xz, and B(t) = [[1, t], [1, 0]].
  - K = B(x)B(y)B(z) = [[1+x+y, z+xz], [1+y, z]] and det K = −xyz.
  - Cube averages give 11/4 for the open readout and 5/2 for the trace.
- **Independent signs.**
  - B(t)³ contains t + t², so a parameter must not be reused.
  - The eight-point sign grid recovers every coefficient.
  - 1 + U and 1 + V agree on every common phase but read 0 against 2 at (−1, 1, 1).
- **Seam coupling.**
  - A = Q³ = [[3, 2], [2, 1]] and det A^L = (−1)^L.
  - φ^(−3L)A^L = P₊ + (−φ^(−6))^L P₋, which tends to a rank-one projector.
- **Cut and glue.**
  - The open chain reads 1+x+y+z+xz and the triangle reads 1+x+y+z, because 101 is excluded across the seam.
  - The volume tabulates twelve sequences. The last, with weights 2 1 3 0 2, reads 39 open and 23 closed.
- **Cycles.**
  - C_N = tr Qᴺ = F_{N−1} + F_{N+1} gives the Lucas numbers 1, 3, 4, 7, 11, 18.
  - exp(Σ C_N tᴺ/N) = 1/(1 − t − t²) for |t| < 1/φ.
- **Necklaces.**
  - P_N = Σ μ(d) C_{N/d} and a_N = P_N/N give 1, 1, 1, 1, 2, 2, 4, 5, 8, 11, 18.
  - Π(1 − tᵈ)^(−a_d) returns the Fibonacci numbers.
- **5040.** The sixteen Möbius signs over the divisors of 210 have two uses.
  - On cycle counts they give P₅₀₄₀, a positive 1054-digit multiple of 5040.
  - On σ(n)/n they give exactly 1/5040.
- **Robin corners.**
  - G(n) = log(σ(n)/n) − γ − log log log n.
  - The four-corner gap G(npq) + G(n) − G(np) − G(nq) is a positive rectangle integral of h = −(log log)″.
  - With eight corners the gap is negative, and with sixteen it is positive.
- **The 60480 certificate.**
  - From 10080, 20160 and 30240 alone, σ(n)/n at 60480 is 254/63.
  - The budget U ≈ −0.0568, so G(60480) ≈ −0.0580 < 0.
- **Limits.**
  - The certificate is a sufficient bound for one integer, with no global sign.
  - Two quantum states with the same diagonal read 1/2 and 1 on |+⟩.

一部约八分钟的片子：把盒子沿接缝粘起来、闭合成环，再把同样的角点一路带到 Robin 不等式；每一步都保留守卫、切口、方向和共享尺度。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-052-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Arith/Robin/SevenSmooth` has a state file at the subject commit.
  - Its `robin_seven_smooth` covers every n = 2ᵃ3ᵇ5ᶜ7ᵈ > 5040, including 60480 = 2⁶·3³·5·7.
  - The certificate scene's second line is badged Lean, and the finale names it.
  - The volume's corner certificate for 60480 is a separate argument and is badged theory.
- **Published.** Robin's criterion (1984) is published. The certificate scene's third line is badged as published.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the five-mode kernel and its averages;
  - the reuse obstruction;
  - the seam coupling and its normalized limit;
  - the cut-and-glue rule and its table;
  - the two 5040 inversions;
  - the Robin corner identity and its alternating signs;
  - the 60480 certificate;
  - the coherence example.
- **Classical tools named in the volume.** Badged as classical where they carry the narration:
  - multi-affine interpolation;
  - the Parseval sign grid;
  - the trace formula and zeta function of the golden-mean shift;
  - Möbius inversion and the necklace product.
- **Open.** Robin's inequality for every n > 5040 is the Riemann hypothesis, which is open. The limits scene is badged
  open.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Corners and kernel.**
    - Corner recovery and averages in dimensions 1 to 3, the simplex weight and the bubble integral.
    - The kernel, its determinant and its averages.
    - The reuse obstruction, the sign-grid recovery and the common-phase pair.
  - **Seams.**
    - The projector decomposition and det A^L for L ≤ 7.
    - The open and closed readouts, and all twelve tabulated sequences.
  - **Cycles and necklaces.**
    - The cycle counts by enumeration up to N = 14, and the zeta identity as a power series.
    - The P_N and a_N table to N = 16, and the necklace product.
  - **5040.** Both 5040 inversions, including the 1054-digit P₅₀₄₀.
  - **Robin.**
    - The four-corner rectangle identity at four base points, to 10⁻²⁰.
    - The eight- and sixteen-corner signs.
    - The 60480 certificate with its exact divisor ratios.
  - **Coherence.** The two-state example.
- **Illustrative visuals.**
  - The rotating cubes, the glowing bubble and the rotating necklace are illustrations.
  - The rectangle shading shows the decreasing h only qualitatively.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
