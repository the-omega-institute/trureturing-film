# 064 · AURIC Ω II · GOLDEN READOUT · AURIC Ω 第二部：控制、读口与黄金比例

This is the second film in the AURIC Ω series and runs about 5 minutes. It covers §19–21 and §35–42 of
`AURIC_OMEGA_STATIC_COMPATIBILITY_FIBER_THEORY.md` in trureturing, at subject commit `d0c0a8cd10`.

The film asks two questions about the five-mode pyramid walk and its legal chains. What does extra control buy? What
can a single readout bit still see?

- **Constrained flips.**
  - The pyramid generator splits as K = H1 + H2 + H3. Each H_j flips one position only when its neighbours are zero.
    This is the open-chain PXP rule (§19, Proposition 43).
  - A bare flip can leave the legal space: X1|010⟩ = |110⟩.
  - Knowing only that the state is "not empty" leaves no common legal bare flip. The constrained exponentials
    e^{−iθH_j} are legal on every input.
- **No exact inverse from waiting.**
  - det(λI − K) = λ(λ⁴ − 5λ² + 2), so ω±² = (5 ± √17)/2 and the frequency ratio is irrational.
  - Reads lose rank.
  - So no exact, deterministic, finite protocol on the fixed nonnegative-wait menu inverts a nonzero wait on all
    inputs (§20, Proposition 44).
  - Approximate recovery, postselection and restricted inputs are not excluded.
- **Independent control.**
  - Three independent flip controls generate so(5), of dimension 10, in the real frame. Adding an adjustable phase on
    null gives u(5), of dimension 25 (§21, Proposition 45).
  - Legal gates still depend on order: V2V1|000⟩ = −i|100⟩, while V1V2|000⟩ = −i|010⟩ (Proposition 45.2).
- **The whole legal chain.**
  - A legal chain of length n has F(n+2) basis words.
  - For every n, the flips generate so(F(n+2)) (§38, Theorem 58.1). The proof is an induction on the last-bit split
    K_n = A ⊕ B.
  - Adding the single fixed phase S⋆ = exp(iπ/2 · n1n3) gives every special unitary.
    - The determinant is restricted to ⟨i^{F(n−2)}⟩.
    - Projectively, every gate is reached.
- **One phase install.**
  - On the alternating code |b1 0 b2 0 … bk⟩, flip words alone stay at operator-norm distance exactly √(2 − √2) from
    the gate that multiplies one logical basis word by i (§37, Theorem 57.1).
  - One install at positions (1, 3) gives every logical unitary approximately (§36, Theorem 56.1).
  - So the minimum number of non-real phase installs is one (Corollary 57.2).
- **One readout bit.**
  - Reading only position 1 gives a rank-F(n) projector.
  - The bit probabilities over all finite words determine the input state exactly (§39, Proposition 59.1).
  - This is identification of the probability function. It is not naming the state from one copy.
- **The golden contrast.**
  - The best single-bit gap satisfies c_n·D ≤ B_n ≤ D, with c_n = F(n+1)/(F(n+2) − 1). Both constants are sharp
    (§40, Theorem 60.2).
  - c_n = 3/4, 5/7, 2/3, 13/20, … decreases to 1/φ and stays above it.
- **Copies and settings.**
  - With one bit per copy, the extremal orthogonal pair keeps error ½·β^M with β = (q − 1)/(d − 1) (§41,
    Theorem 61.2). At n = 3, an error ≤ 10⁻⁶ needs 10 copies.
  - A fixed menu with uniform contrast χ < c_n exists. It needs m ≥ ½·exp(2χ²(d − 1)³/d²) settings (§42,
    Theorem 62.2), which is exponential in d = F(n+2).

一部约五分钟的片子，AURIC Ω 系列的第二部：受约束翻转之和就是金字塔，固定等待无法精确撤销自身，翻转在每个长度上生成 so(F(n+2))，一处固定相位补全控制、零处做不到（距离恰为 √(2−√2)）；只读第一个位置的一个比特仍能确定输入态，它保留的迹距离比例 c_n = F(n+1)/(F(n+2)−1) 降向黄金比例的倒数。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-064-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen general result.** `D5/S3/ObserverMemory/RevivalSpectrum.fibonacci_return_ratio_tendsto` states that
  F(n+1)/F(n) → φ. It has a state file at the subject commit and generality G.
  - It backs the limit step of c_n → 1/φ. The golden scene's limit phrase is badged Lean.
  - The inequality c_n > 1/φ and the contrast theorem itself are not separate frozen declarations.
- **Published result.** The PXP form of constrained flips is badged as a published result cited in the volume:
  Turner et al., *Quantum Scarred Eigenstates in a Rydberg Atom Chain*, arXiv:1806.10933.
- **Classical tools.** The film badges these as classical tools named in the volume:
  - the Lie-bracket and product-formula closure argument;
  - the Ky Fan variational step (best rank-q projection = top q eigenvalues);
  - Hoeffding's binomial tail bound.
- **Theory volume, argued but not kernel-checked.** The volume marks its statements as open reference input. The film
  badges the following as theory:
  - the constrained-flip split and the selection obstruction;
  - the exact-inverse obstruction;
  - the so(5), u(5) and so(F(n+2)) algebras and the determinant class with one phase;
  - the distance √(2 − √2) and the one-install minimum;
  - the readout identification;
  - the contrast constants c_n;
  - the copy error ½·β^M;
  - the settings lower bound.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Flips and the waiting menu.**
    - H1 + H2 + H3 = K, the illegal bare flip and the empty common action set.
    - The characteristic polynomial of K by exact symbolic determinant, and the irrational frequency-ratio square.
  - **Control algebras.**
    - The Lie-closure dimensions 10 (so(5)) and 25 (u(5)), and the two gate orders.
    - The flip Lie dimensions 1, 3, 10, 28, 78, 210 for n = 1…6, which equal dim so(F(n+2)).
    - With the fixed phase, the algebra is su(d) (dimensions 24, 63, 168 for n = 3, 4, 5), and det S⋆ = i^{F(n−2)}.
  - **The distance.**
    - √(2 − √2) = 0.76537 as the minimum of the two column bounds over the global phase.
    - 4000 random SO(5) frames × 73 phases never get below it.
  - **Readout and contrast.**
    - rank n1 = F(n) for n = 3…6.
    - Conjugates of the rank-3 readout span all 64 real Hermitian directions at n = 4.
    - c_n against F(n+1)/(F(n+2) − 1) by exact fractions for n = 3…24, and its strict decrease to 1/φ.
    - c_n·D ≤ B_n ≤ D on 9000 random state pairs, and the witness pair attaining c_n.
  - **Copies and settings.**
    - β_n = 1/4, 2/7, 1/3 for n = 3, 4, 5, and the randomized kernel that simulates every one-bit experiment.
    - M = 10 at n = 3 and error ≤ 10⁻⁶.
    - The settings bound values m ≥ 1.8, 4.4 × 10³, 2.1 × 10³⁰ and 2.4 × 10²¹³ at χ = 1/2 for d = 5, 21, 144, 987.
    - The Beta law of ⟨v|Q|v⟩ on 200 000 Haar samples.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and the Ω ring;
  - the two frequency dials;
  - the pentagon of rotation generators;
  - the block-matrix sketch of the induction;
  - the unit-circle distance picture;
  - the probability bars in the readout scene.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
