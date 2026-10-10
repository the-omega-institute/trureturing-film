# 057 · AURIC FIB ATOM PYRAMID XXVIII · 金字塔 XXVIII：联合投影、多窗口次序与响应纤维

A film of about 7 minutes, the twenty-eighth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_JOINT_PROJECTION_MULTIWINDOW_ORDER_AND_RESPONSE_FIBERS.md` in trureturing at subject commit
`bd242f7d67`.

The film asks what one more reading buys:
- which single observation completes the pyramid;
- what two windows hide between them;
- when a response can see the hidden joint mass κ.

- **Completing the means.**
  - W = E[z + xy] = Z + κ.
  - (X, Y, Z, W) fixes all five probabilities through an affine map with determinant −1, and κ = W − Z.
  - The blind directions (1, −1, 0, −1, 1) of (X, Y, Z) and (2, −1, −1, −1, 1) of (X, Y, W) meet only at 0.
- **Integer counts.** The inverse map is an integer matrix. An error δ in W moves the law by δ along the hidden
  direction, with total variation 2|δ|.
- **Additive is blind.**
  - A readout sees κ only when its four-corner contrast J = f∅ + f₁₃ − f₁ − f₃ is nonzero.
  - q = (0, 2, 3, 5, 7) has J = 0, and z + xy has J = 1.
  - Every additive quantity has J = 0.
- **No new interaction.** A main-effect update λ·u^x·v^y·t^z multiplies the four-corner determinant by λ²uv and leaves
  the odds ratio unchanged. Only a joint factor η^(xy) multiplies it, by η.
- **Same means, other future.**
  - (0.1, 0.3, 0.2, 0.3, 0.1) and (0.3, 0.1, 0.2, 0.1, 0.3) share X = Y = 0.4, Z = 0.2 and P(A) = 0.6.
  - Continuing with [5], they are rejected with probability 1/6 and 1/2. The independence guess κ* = XY/r predicts 1/3.
- **Two windows.**
  - The seam guard leaves 25 − 4 = 21 legal cells.
  - A joint law with given window laws exists exactly when a + b ≤ 1.
  - With both window laws fixed, 12 four-corner cycles remain.
- **The coherent phase.**
  - With coherent amplitudes, r²|det A|² = (√(p∅p₁₃) − √(p₁p₃))² + 4√(p∅p₁p₃p₁₃) sin²(Φ/2).
  - Five probabilities cannot recover Φ.
  - Twice |det A| is Wootters' concurrence, so Δ = 0 is not the same as no entanglement.
- **Response fibres.**
  - A vector response sees κ through J_L.
  - Together with the means, the kernel has dimension 0 when J_L ≠ 0 and 1 when J_L = 0.
  - Recovering read counts is a different task from recovering κ.
- **Mode and depth.**
  - The cross-ratio is Ξ = (r_i/r_j)^(A_I−A_J)·(s_i/s_j)^(B_I−B_J).
  - Ξ = 1 for every pair exactly when all modes carry the same read counts.
- **Three sufficiencies.**
  - (P, W) recovers the static law, the future recovers read counts, and neither recovers history or ancestry.
  - The readout chain and the physical bridges are open.

一部约七分钟的片子：追问多一个读数能换来什么——哪一个观测能补全金字塔，两个窗口之间藏着什么，以及一个响应什么时候能看见隐藏的联合质量 κ。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-057-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Observer/ProbabilisticClosure/TrajectoryLaws/NativeConditionalControl` has a state file at the subject
    commit. Its generality is G.
  - Its `sameK_conditional_tail` states that conditioning the joint depth-and-stream law on a native history gives
    the same joint law, with the depth prior replaced by the posterior.
  - The depth scene's first line is badged Lean.
  - The volume's mode–depth cross-ratio is a separate argument and is badged theory.
- **Theory volume, argued but not kernel-checked.** The volume marks its statements as open reference input. Badged
  as theory:
  - the completion by W and the transversal kernels;
  - integer counts;
  - the four-corner criterion and the additive-quantity theorem;
  - the same-means example;
  - the two-window existence condition;
  - the coherent-phase decomposition;
  - the response-fibre rule;
  - the cross-ratio;
  - the three sufficiencies.
- **Classical tools.** Badged as classical where they carry the narration:
  - odds-ratio invariance under main effects (the volume cites Drton and Sullivant, *Algebraic Statistical Models*);
  - the cycle space of a transportation table (the volume cites De Loera and Kim).
- **Published.** Wootters, *Entanglement of Formation of an Arbitrary State of Two Qubits* (1998) gives the concurrence
  of a pure two-qubit state as twice the absolute determinant of its amplitude matrix. The phase scene's second line is
  badged published.
- **Open.** The conjectured readout chain and the physical bridges (clocks, decay, light) are open. The sufficiency
  scene's second line is badged open, with CONJECTURE and CANDIDATE stamps.
- **Not shown.** The volume's proposed Lean files (`JointProjection.lean`, `ResponseContrast.lean`,
  `ModeDepthCrossRatio.lean`) do not exist at the subject commit.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Completion, counts and blindness.**
    - The completion matrix, its determinant, the inverse formulas and the two kernels.
    - The integer inverse and the W-error rule.
    - J for q and for z + xy, and J = 0 for 1000 random additive quantities.
  - **Interaction and the same-means example.**
    - The main-effect and joint-factor rules for the odds ratio, symbolically.
    - Both laws of the same-means example, their Δ values and rejection probabilities, and κ*.
  - **Two windows.**
    - The 21 legal cells, the marginal rank 9 and the 12 independent cycles.
    - The existence condition, checked by 400 random linear programs.
    - The explicit block construction.
  - **Phase, responses and the cross-ratio.**
    - The phase decomposition and the concurrence identity on 500 random states.
    - The response kernel dimensions on 200 random responses.
    - The cross-ratio on 300 random cases, including the example Ξ = 5/8.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the oscillating weights and phases;
  - the readout ladder;
  - the response bars, which use example vectors.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
