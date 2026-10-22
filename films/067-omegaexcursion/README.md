# 067 · AURIC Ω V · BOSONIC EXCURSION · AURIC Ω 第五部：玻色游程与相位校正

This is the fifth film in the AURIC Ω series and runs about 4.5 minutes. It covers §1–6 of
`AURIC_OMEGA_BOSONIC_EXCURSION_RETURN_AND_PHASE_CORRECTION.md` in trureturing, at subject commit `07ddb9c097`.

Part two installed one phase, S = diag(1, 1, 1, 1, i), which multiplies the two-particle state |101⟩ by i. This film
asks whether one fixed bosonic exchange Hamiltonian can produce that phase. It finds that the answer runs through an
excursion out of the five-state space.

- **The carrier.**
  - The five states |000⟩, |100⟩, |010⟩, |001⟩, |101⟩ are embedded in the Fock space of three bosonic modes. Two
    further states |200⟩, |002⟩ complete a seven-state reducing space W (Definition 1.1).
  - One Hamiltonian is fixed: H = g a₁†a₃ + ḡ a₃†a₁ + J n₁n₃ (Assumption 1.2).
  - Exchange sends |101⟩ outside with amplitude √2. The outside pair splits into a bright state b, which couples back
    with strength 2r (r = |g|), and a dark state z with Hz = 0. The spectrum on W is 0, 0, 0, ±r, (J ± Δ)/2 with
    Δ = √(J² + 16r²) (Proposition 2.1).
- **Leak and return.**
  - For every complex density on the five states, the leaked weight is L_ρ(t) = κ η² sin²(Δt/2ħ). Here κ is the weight
    on |101⟩ and η = 4r/Δ (Theorem 2.2).
  - Every input returns exactly at t_m = 2πħm/Δ. There |101⟩ carries the phase λ_m = (−1)^m e^{−iπmd}, with d = J/Δ.
    The projected Hamiltonian P H P would give λ_m² instead, and the two agree only when λ_m = 1 (Theorem 2.3).
- **Exact correction.**
  - Suppose one real rotation from the fixed group D₃·SO(5)·D₃† is allowed before or after the pulse. Then S is reached
    exactly at a return if and only if λ_m = i and Re(g)·sin θ_m = 0 (Theorem 3.1).
  - λ_m = i for some return exactly when d is rational with an even reduced denominator. The pulse alone never gives S
    at positive time. That would need 4m² = L² + 16k² with L odd, which is impossible modulo 4 (Proposition 3.2).
- **A design.**
  - Take g = ir, J = 4r/√3 and t* = π√3ħ/(4r). Then d = 1/2 and λ₁ = i, and a real rotation of the one-particle block
    gives S exactly (Proposition 3.3).
  - Halfway through, 3/4 of the |101⟩ weight is outside the five states. The projected Hamiltonian would give −1.
  - An ordinary inverse beam splitter cannot replace the selective rotation, because it sends |101⟩ outside with
    probability sin²(π√3/2) ≈ 0.167.
- **Long waits.**
  - For fixed parameters, later returns approach S exactly when every integer relation (h, k) between α = (1 − d)/2 and
    the exchange frequency has 4 | h (Theorem 4.2). The test uses x = 2r/Δ for real-corrected approximation and x/2
    for pulse-only approximation; aligned g = ±ir needs only the phase test.
  - J/r = 4/√3 converges for every phase of g (Proposition 5.1).
  - J/r = 4 has a dense phase. It still fails for every g with Re g ≠ 0 and for the pulse alone, since
    4|sin(πmx)| + 2|λ_m ∓ i| ≥ 2. Aligned g = ±ir converges without an exact hit (Proposition 5.2).
  - J/r = 1 needs a real sign correction, because the exchange block approaches −I whenever λ_m approaches i
    (Proposition 5.3).
- **Boundary.**
  - Near returns are stable: |t − t_m| ≤ (πħ/4r)√ε, and the unitary on W moves by at most π(Δ + |J|)/(8r)·√ε
    (Theorem 6.1).
  - The original five-state rule allows no excursion at any intermediate time, so every positive-duration pulse of H is
    inadmissible there.
  - Hard-core and fermion models keep the five states invariant and reproduce P H P, but they are different algebras
    (Proposition 6.2).
  - S is invisible to number-preserving readouts. The parity-preserving pair ψ = (|000⟩ + |101⟩)/√2 and Y sees it
    (⟨Y⟩ = 0 before S and 1 after), but H cannot prepare ψ (Proposition 6.3).

一部约四分半钟的片子，AURIC Ω 系列的第五部：把五个态嵌进三个玻色模式后，交换哈密顿量会把双粒子态 101 推出五态空间，再在精确的回归格点上把它送回来；回归时它带的相位是 λ，而不是投影哈密顿量预言的 λ²。允许一个固定实帧中的实旋转时，精确得到 S 当且仅当 λ = i 且单粒子块为实；g = ir、J = 4r/√3 给出一个这样的设计。长时间等待能否逼近 S，由一个关于整数关系的整除判据决定。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-067-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **No Lean-frozen declaration is used.** No D5 module covers this volume, and the film carries no Lean badge.
- **Classical inputs.** These are named in the volume and badged as classical:
  - the exchange and number-interaction family, compared in the volume with the two-site Bose–Hubbard model of Links,
    Foerster, Tonel and Santos, arXiv:cond-mat/0605486. The carrier scene badges it as classical.
  - Kronecker's theorem on closures of torus orbits, through the repository's Library note
    `Library/Fourier/onishchik2020kronecker.md`. The approximation scene badges it as classical.
- **No published-result input and no open conjecture.** The volume makes no claim about the recovery error of the
  original encoder problem, no hitting-time bound and no time-cost optimum. It states that physical supply and recovery
  bridges remain separate obligations.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script builds the three-mode Fock space up to two bosons
  explicitly. This is exact, since H conserves particle number. It checks the following.
  - **Carrier.** The actions of H and the bright and dark states. That W is reducing and V is not invariant. The
    spectrum on W, on six random (g, J). That H commutes with N, n₂ and parity.
  - **Leak.** The formula for L_ρ(t) and ε(t) = ‖QUP‖², on 40 random complex densities and parameters, to 6 × 10⁻¹⁵.
  - **Returns.** QUP = 0 at t_m. The blocks of U_m. λ_m and its two forms. det U_m = λ_m and the seven-state
    determinant λ_m². The projected exponential giving λ_m² at |101⟩. K†K = I − ε|101⟩⟨101|. The singular values of
    Im U_m.
  - **Quarter phases.** λ_m = i at d = 1 − (4k + 1)/(2m) for m ≤ 12. The orbit reaching ±i exactly for even reduced
    denominators, on all reduced p/q with q ≤ 40, in exact rational arithmetic. No solution of 4m² = L² + 16k² with L
    odd for m ≤ 2000.
  - **Design.** All stated values, R₀U(t*) = S, the 3/4 halfway leak, the projected value −1, and the determinants i
    and −1. The inverse beam splitter is built as an actual Fock-space unitary, and its leak sin²(π√3/2) = 0.1669 is
    computed.
  - **Long waits.**
    - For real g, the best errors ‖U_m − S‖ over the first 2 × 10⁶ returns, pulse-only and sign-corrected, together
      with the aligned case. The error formulas were also checked against the actual matrices.
    - At J/r = 4/√3, both errors fall below 2 × 10⁻⁶.
    - At J/r = 4, both stay at 0.518. The inequality 4|sin(πmx)| + 2|λ_m ∓ i| ≥ 2 holds for every m ≤ 2 × 10⁶.
    - At J/r = 1, the pulse-only error stays at 1.000 and the sign-corrected error falls below 10⁻⁶. Every return with
      |λ_m − i| < 0.01 has its exchange block within 10⁻³ of −I.
    - The value 0.518 is a numerical reading. The volume proves only that the error does not tend to zero. The
      narration's "about one half" refers to this reading.
  - **Near returns.** Both stability bounds, on 400 random cases.
  - **Algebras and readouts.**
    - The rephasing witness that moves the real correction group.
    - Hard-core and Jordan–Wigner fermion models reproduce P H P on the five states with no leak.
    - S fixes number-block-diagonal densities and number-preserving observables.
    - ⟨Y⟩ goes from 0 to 1 under S.
- **Data drawn on screen.**
  - The leak curve uses the exact formula with η² = 3/4, the design value.
  - The design dial traces the exact |101⟩ amplitude e^{−iτ/2}(cos τ − (i/2) sin τ) and the projected phase.
  - The orbit dials show the exact return phases for d = 1/2 and d = 1/3.
  - The approximation chart plots the recomputed best errors at m = 10, …, 2 × 10⁶.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and the Ω ring;
  - the mode wells;
  - the excursion and return arcs;
  - the coupling diagram;
  - the near-t = 0 leak curve in the boundary scene, whose shape is schematic.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
