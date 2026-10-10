# 060 · AURIC FIB ATOM PYRAMID XXXI · 金字塔 XXXI：对称混合、路径缺陷与 Fibonacci 层级

A film of about 6 minutes, the thirty-first part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_SYMMETRIC_SEAM_PATH_DEFECT_AND_FIBONACCI_HIERARCHY.md` in trureturing at subject commit `df1b914c1e`.

The film asks what kind of change the hidden relation is, a symmetric mixing of two changes or a defect in their
order, and how the hidden part grows when the window grows.

- **Symmetric and antisymmetric.**
  - Write each action as a change D = U − I.
  - Under swapping the two actions, D_aD_b splits uniquely into a symmetric part S and an antisymmetric part H.
    H = ½[U_a, U_b] is the order defect.
- **The static seam is symmetric.** Multiplication by x and by y commute, so [M_x, M_y] = 0. Their symmetric product is
  M_xy, and κ = E[xy] = ⟨p, M_xM_y1⟩.
- **Two orders.**
  - An actual two-step response expands as R d + R D_a d + R D_b d + s + h.
  - The two orders have slopes s + h and s − h along the hidden direction, so their contrast is 2h.
  - In the volume's five-state example (U_a = (2,2,3,5,5), U_b = (0,2,3,2,25), reading the mass on [5]), s = −½ and
    h = ½. One order cancels to 0, the other reads −1, and the actual composite reads 1.
- **Delay without non-commutation.** The single map U = (3,3,3,5,0), read on [3], shows the hidden direction as 0, 0
  and then 1. Every word is a power of U.
- **Horizon.** For one linear update and readout, the visible tower grows strictly at most n − rank C times. With five
  states and the three means that is one step.
- **Lossless labels.**
  - With weights 2, 3, 5, 8, … (the Fibonacci numbers), different legal sets have different sums.
  - The largest legal sum on the first r positions is F(r+3) − 1 or 2, which is below the next weight.
- **Monomial basis.**
  - The monomials x_A over legal sets A form a basis: the evaluation matrix 1[A ⊆ I] is unitriangular.
  - Möbius inversion turns joint moments back into probabilities.
- **Fibonacci hierarchy.**
  - Legal sets of size k number C(n − k + 1, k).
  - First-order readings span n + 1 directions, so F(n+2) − n − 1 stay hidden: 1, 3, 7, 14 at n = 3, 4, 5, 6.
  - Readings of order r first fail at n = 2r + 1, with exactly one hidden direction. At n = 5 that direction is the
    third-order seam x₁x₃x₅.
- **Clock readout.**
  - With known waiting laws the mixture is A + κB, and κ = (C(E) − A(E))/B(E) whenever B(E) ≠ 0.
  - With several hidden directions coefficients can cancel. At n = 4 the clock 1/4 + (x₁₃ + x₁₄ + x₂₄)/8 cannot see
    q = e₄ − e₃ + e₁₃ − e₁₄.
- **No potential.**
  - A waiting law is not an additive step.
  - Additive increments have a potential exactly when every signed cycle sums to zero.
  - A diamond with path sums 2 and 3 has no directed cycle and a layered time, yet no potential.

一部约六分钟的片子：追问隐藏关系是哪一种变化——两个变化的对称混合，还是它们次序上的缺陷；以及窗口变长时，隐藏方向怎样沿 Fibonacci 层级增长。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-060-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen general results.** Each module below has a state file at the subject commit and generality G.
  - `D5/S1/Words/AdmissibleWords/AdmissibleRelationSpaceGrowth`.
    - `admissible_relation_space_finrank` states that the complex linear endomorphisms of functions on admissible words
      of length n form a space of dimension (Nat.fib (n + 2))².
    - `admissible_relation_space_growth` states that the ratio of consecutive dimensions tends to φ².
  - `D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound`.
    - `observable_krylov_strict_growth_bound` states that, for one linear map T and readout C, the observable Krylov
      space grows strictly at most dim V − rank C times.
  - The relation-space line and the first half of the horizon line are badged Lean.
  - The volume's extension to several sub-kernels on one carrier is argued in theory and badged as theory.
- **Theory volume, argued but not kernel-checked.** The volume marks its statements as open reference input. Badged as
  theory:
  - the reading of the static seam as symmetric mixing;
  - the order expansion, the two slopes and the five-state example;
  - the delay example;
  - the hierarchy reading;
  - the clock readout and its cancellation example.
  - The volume's editor notes keep these as abstract five-state kernels, not native FIB operations, and keep the
    clock statements to exact laws, not single samples.
- **Classical tools.** Badged as classical where they carry the narration:
  - the symmetric/antisymmetric split under swapping;
  - Fibonacci weights and Zeckendorf-type uniqueness;
  - the monomial basis and Möbius inversion;
  - counting non-adjacent sets;
  - potentials on graphs.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Order and delay.**
    - The split and the expansion identity on 300 random kernels.
    - The five-state example (s = −½, h = ½, slopes 0 and −1, composite 1).
    - The delay example (0, 0, 1).
    - The commuting multiplication operators and κ.
  - **Horizon.** The growth bound on 1200 random two-kernel instruments, including m = 5, r = 4.
  - **Labels, basis and hierarchy.**
    - Injective Fibonacci sums and M_r = F(r+3) − c_r for n ≤ 15.
    - Unitriangular evaluation matrices for n ≤ 10, and Möbius inversion.
    - N(n,k) = C(n − k + 1, k) for n ≤ 13.
    - The hidden-dimension table, and first failure of order r at 2r + 1 for r ≤ 6.
  - **Clock and potentials.**
    - Scalar κ recovery on 200 random laws.
    - The n = 4 cancellation example.
    - The diamond, and potentials on 300 random graphs.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the commuting-square sketch;
  - the slope plot, which uses example s and h;
  - the waiting-law bars;
  - the bar heights in the opening and hierarchy charts, which are drawn to the stated counts.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
