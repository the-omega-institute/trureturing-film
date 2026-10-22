# 066 · AURIC Ω IV · RECOVERY CERTIFICATES · AURIC Ω 第四部：全输入恢复证书

This is the fourth film in the AURIC Ω series and runs about 4 minutes. It covers the three volumes
`AURIC_OMEGA_FULL_INPUT_RECOVERY_CERTIFICATES.md`, `…_II.md` and `…_III.md` in trureturing, at subject commit
`2d7d995ea5`.

Part three left a band. Every encoder in the phase-gain class has full-input recovery error at least
L(β) = 2β/(3 + 2√(2(1 − β))), and an explicit encoder reaches U(β) = 1 − √(1 − β). This film shows how the volumes
close that band for the original real class.

- **The whole class.**
  - A real encoder is described by its complementary block data in phase coordinates: the environment state τ of a
    phase input, a coherence block C and the third-level state σ. The Schur residual
    S = σ − C†τ⁺C − conj(C†τ⁺C) is positive with rank S ≤ 1 for β > 0.
  - Every such block datum is realized by an actual encoder, so the domain is exact, not a relaxation (Theorem 1.2).
  - Every member has a real Kraus list K_α = (x_α, J x_α, t_α) of length at most nine (Theorem 1.3).
- **One residual weight.**
  - w = Tr[(I − Π)σ2] is the weight the third level sends outside the four-dimensional phase support Π. It equals
    Tr S (Theorem 2.1).
  - Three inputs and one recovery measurement give δ ≥ 2e_β(w), with e_β(w) = β(1 − w)/(β + 2 + √(8βw))
    (Theorem 3.1). At β = 1/2 and w = 0 this is 2/5.
- **The exact threshold.**
  - Setting 2e_β(w) = 1 − √(1 − β) gives w_c(β) = ½[(1 − β)^{1/4} − √β/(1 + √(1 − β))]². Every encoder with w ≤ w_c
    has error at least 1 − √(1 − β) (Theorem 3.2). At β = 1/2, w_c ≈ 0.091.
  - The volumes build certificates for w > w_c across sections §1–154 (159 sections, since volumes I and II both
    number §52–56).
- **The closure.**
  - For every input ψ in the phase plane, the environment marginal satisfies τ_ψ ⪯ (1 − β)I, for the same isometry and
    every third column.
  - A common-projection exclusion (volume II, Theorem 76.2) rules out every phase direction and the third input all
    exceeding √((1 + u)/2), with u = √(1 − β).
  - A minimax over inputs and contractions turns this into a fidelity cap. Recovery duality converts it into
    δ ≥ 1 − √(1 − β) (volume III, Theorem 153.2).
- **The class optimum and its scope.**
  - The bound holds for every original real encoder, every third column, every Kraus rank up to nine, every complex
    recovery and every reference. Together with the explicit encoder of part three, the infimum over the real class
    is exactly 1 − √(1 − β) (Corollary 153.3).
  - This is a statement about the class. It does not give each encoder its own optimum. For the broader complex class,
    the band between L(β) and the curve stays open.

一部约四分钟的片子，AURIC Ω 系列的第四部：先把整个实编码器类写成互补块数据（Schur 残差秩至多为一，Kraus 表长度不超过九），再用残差权重 w 给出三输入误差界与精确阈值 w_c；阈值之外由三卷证书覆盖，最后以环境态上限、公共投影排除、极小极大与恢复对偶收尾。结论是：实类上的最优全输入恢复误差精确等于 1 − √(1 − β)；复类仍是开放的。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-066-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **No Lean-frozen declaration is used.** The volumes do not assert Lean/kernel verification of their statements, and
  the film carries no Lean badge.
- **Published results.** These are cited in the volumes and used as inputs:
  - the recovery interface of Bény–Oreshkov, arXiv:1103.0649. The closure scene badges "recovery duality" as a
    published result.
  - Watrous's semidefinite programs for completely bounded norms, arXiv:1207.5726, and the eigenvalue-pairing
    comparison of Miszczak, Puchała, Horodecki, Uhlmann and Życzkowski, arXiv:0805.2037. The film does not show them
    separately.
- **Classical tools.** The minimax over inputs and contractions (with Uhlmann fidelity) is badged as a classical tool.
- **Open.** The optimal full-input recovery error over the complex class is not determined. The scope scene badges
  it open.
- **Theory volumes, argued but not kernel-checked.** The film badges the following as theory:
  - the domain theorem and real Kraus compression;
  - the identity w = Tr S;
  - the three-input bound and the threshold w_c;
  - the cap, the common-projection exclusion and the closing lower bound;
  - the real-class optimum.
- **Recomputed for this film.** An independent Python script recomputes the following. Optimal recoveries are solved
  as semidefinite programs with cvxpy and Clarabel.
  - **Threshold algebra.** 2e_β(w_c) = 1 − √(1 − β) on 25 values of β in (0, 1/2]; e_β is decreasing in w;
    2e_{1/2}(0) = 2/5 and w_c(1/2) = 0.09103.
  - **Random real encoders.** Sixteen encoders were drawn from the Theorem 1.3 parametrization, eight each at
    β = 0.2 and 0.5 with 2–5 Kraus terms. Each one was checked to be trace preserving and real, with the spectrum
    (a, β, 0, −β, −a) for the phase-output difference. Every optimal recovery error lies above both 1 − √(1 − β) and
    2e_β(w). The values range from 0.50 to 1.04 at β = 0.2 and from 0.41 to 1.18 at β = 0.5.
  - **Attainment.** The explicit encoder of part three has optimal error 0.1056 at β = 0.2 and 0.2929 at β = 1/2,
    equal to 1 − √(1 − β).
  - **The cap.** On 20 random real encoders and random phase-plane inputs, the environment marginal has largest
    eigenvalue at most 1 − β.
  - These are sampled consistency checks, not a proof of the class statement.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and the Ω ring;
  - the block-matrix grid and the nine Kraus cards;
  - the support boxes and the weight bar;
  - the moving point on the phase plane and the environment-eigenvalue bars;
  - the chain of steps in the closure.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
