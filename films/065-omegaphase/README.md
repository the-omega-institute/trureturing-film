# 065 · AURIC Ω III · PHASE GAIN · AURIC Ω 第三部：相位增益与恢复

This is the third film in the AURIC Ω series and runs about 5 minutes. It covers §1–13 of
`AURIC_OMEGA_PHASE_GAIN_AND_QUTRIT_RECOVERY.md` in trureturing, at subject commit `b0d22ef018`.

The film puts the one installed phase of part two to work on a qutrit. It asks how much phase can be read from an
encoder, and how well the whole input can still be recovered.

- **The encoder.**
  - A qutrit with basis |0⟩, |1⟩, |2⟩ is encoded into the five-mode chain.
  - The two candidate inputs θ± = (|0⟩ ± |1⟩)/√2 give outputs whose difference is purely imaginary,
    Δ = i·A0 with A0 real antisymmetric. Its spectrum is (a, β, 0, −β, −a), with a = 1 − β and β ≤ 1/2 (Definition 1.3).
  - The two outputs share their whole real part, so every real effect pairs to zero with Δ.
- **Phase gain.**
  - Count calls of the installed phase S13 = diag(1, 1, 1, 1, i) before the one-bit readout. The best contrast is
    B0 = 0, B1 = 1 − β and Bk = 1 for k ≥ 2 (Theorem 2.1).
  - The second call adds the gain γ = B2 − B1 = β.
- **Gain against recovery.**
  - For every encoder in the class and every complex CPTP recovery, the full-input diamond error is at least
    L(β) = 2β/(3 + 2√(2(1 − β))) (Theorem 3.1).
  - An explicit encoder has exact optimum U(β) = 1 − √(1 − β) (Theorem 4.1).
  - At β = 1/2, the best value over the class lies in [1/5, 1 − 1/√2 ≈ 0.293]. The sharp curve is open
    (Definition 6.2).
- **The phase outputs do not decide recovery.**
  - Erasing the coherence between {|0⟩, |1⟩} and |2⟩ leaves both candidate outputs and the gain unchanged. The best
    recovery error becomes 1 (Theorem 5.1).
  - At zero gain, an isometric embedding recovers exactly, while its erased twin has error 1 (Theorem 5.2).
- **The fixed fiber.**
  - Fixing the whole action on the {|0⟩, |1⟩} block and on |2⟩ leaves a ball of coherence vectors w.
  - The channel distance is ‖N_w − N_w′‖◇ = |w − w′| (Theorem 7.2), and the best recovery error is 1 − |w|
    (Theorem 8.2).
  - One decoder is individually optimal for a set of channels exactly when their nonzero vectors share one direction
    (Theorem 9.1).
  - Two orthogonal vectors each allow 1 − √β, but one shared decoder reaches only 1 − √(β/2) (Theorem 9.2).
- **The phase circle.**
  - Rotating w by a phase gives channels at chord distance 2r|sin((φ − ψ)/2)|. Each channel alone is recoverable to
    1 − r (Theorem 11.2).
  - One decoder for a whole arc of half-width α has exact error √(1 + r² − 2r cos α) while r ≤ cos α. Beyond that it is
    sin α, and it is 1 once cos α ≤ 0 (Theorem 12.2).
- **Records.**
  - Keeping the phase record keeps error 1 − r. Discarding it gives 1 − r|μ|, where μ is the mean phase factor
    (Theorem 13.2).
  - For a Gaussian diffusing phase, |μ| = e^{−Dt} (Definition 13.3). Populations are unchanged, so this is dephasing,
    not loss.

一部约五分钟的片子，AURIC Ω 系列的第三部：同一个三能级编码器上，零次相位调用什么也看不见，一次看见 1−β，两次看见全部；第二次调用的增益 β 迫使全输入恢复误差至少为 2β/(3+2√(2(1−β)))。相同的相位输出并不决定恢复；在固定纤维上，恢复误差是 1 减去相干向量的长度，共享解码器需要方向一致，丢失相位记录的代价由平均相位因子给出。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-065-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **No Lean-frozen declaration is used.** The volume states that its source proofs do not assert Lean/kernel
  verification, and the film carries no Lean badge.
- **Published results.** These are cited in the volume and used as inputs:
  - the gluing ball of completely positive maps, from Åberg, arXiv:quant-ph/0302182 (Proposition 3). The fiber scene's
    "ball" phrase is badged as a published result.
  - the recovery/complement duality of Bény–Oreshkov, arXiv:0907.5391 and arXiv:1103.0649. The obstruction proof uses
    it; the tradeoff scene labels it.
- **Classical tools.** The Gaussian characteristic-function identity in the record scene is badged as a classical tool.
- **Open.** The exact value of the class-optimal recovery error for β > 0 is not determined. The film badges it open.
- **Theory volume, argued but not kernel-checked.** The volume marks its statements as open reference input. The film
  badges the following as theory:
  - the gain law;
  - the recovery floor L(β);
  - the explicit optimum U(β);
  - the same-output counterexamples;
  - the fiber metric and recovery optimum;
  - the common-direction criterion and shared value;
  - the arc formula;
  - the record cost.
- **Recomputed for this film.** An independent Python script recomputes the following. The diamond norms and optimal
  recoveries are solved as semidefinite programs with cvxpy and Clarabel. The solver flagged possible inaccuracy on
  some instances, but every value agreed with its formula to within 2 × 10⁻⁴.
  - **Encoder and gain** (β = 0.1, 0.25, 0.4, 0.5).
    - The spectrum and purely imaginary form of Δ.
    - B0 = 0 on 200 random real rotations.
    - The explicit one-call and two-call words reaching 1 − β and 1.
    - Twelve optimized one-call words never exceeding 1 − β.
  - **Recovery optima.**
    - The optimal recovery error of the explicit encoder equals U(β) and exceeds L(β), with 1/5 and 0.2929 at β = 1/2.
    - The decoder identity T∘N = ((1+u)/2)·id + ((1−u)/2)·Ad_Z.
  - **Counterexamples.**
    - The erasing family has the same θ± outputs and optimal error 1 (β = 0, 0.2, 0.5).
    - The embedding E has errors 0 and 1.
  - **Fiber.**
    - The fiber metric and the optimum 1 − |w| on four random complex pairs.
    - Shared values 1 − √(β/2) against 1 − √β at β = 0.2 and 0.5.
    - The common-direction case.
  - **Circle and records.**
    - The chord distance.
    - The arc formula at four (r, α) points, covering all three regimes.
    - The record cost 0.300 → 0.505 for two phases 0 and π/2 at r = 0.7.
    - E[e^{iφ}] = e^{iωt − Dt} on 400 000 Gaussian samples.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and the Ω ring;
  - the balance beam;
  - the qutrit ladder;
  - the two "planes";
  - the coherence-block grids;
  - the ellipse slice of the coherence ball;
  - the arc wedge;
  - the population bars.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
