# 033 · AURIC FIB ATOM PYRAMID IV · 金字塔 IV：五千零四十之轮

A film of about 6¾ minutes, the fourth part on the FIB atom pyramid. Its subject is §§27 and 31–34 of
`AURIC_FIB_ATOM_PYRAMID_FOUNDATIONAL_FORMULAS_AND_RELATIONS.md` in trureturing at subject commit `54dc9a9bd3`.

A sieve is placed on a clock of 5040 = 7! hours: an hour r is legal when r, r + 2 and r + 6 (or the mirror shape
0, 4, 6) are all coprime to 5040. The film follows where each prime factor shows up in that sieve:

- **The wheel and its quotient.**
  - 192 of the 5040 hours are legal, for either shape.
  - Coprimality sees only the primes 2, 3, 5, 7, so the wheel is the wheel of 210 copied 24 times.
  - Correlation sums scale by exactly 24, and every Fourier frequency not divisible by 24 is exactly zero.
- **Mirror twins.** The two shapes have equal pair statistics at every modulus. Modulo 30 they are one rotation apart.
  Modulo 210 no rotation matches them and a three-point statistic separates them, because 7 is the first prime where
  the forbidden patterns stop being shifts of each other.
- **Five gives the golden ratio.** The legal hours mod 5 are {1, 2}, and the Fourier amplitudes are 2, φ, φ, 1/φ, 1/φ.
- **Seven gives a flat spectrum.**
  - D = {0, 1, 3} is a perfect difference set mod 7, so every nonzero amplitude is √2.
  - Its translates are the lines of the Fano plane, and the point–line incidence graph is the Heawood graph, with
    eigenvalues ±3 and ±√2 (six times each).
  - The sieve's own mod-7 convolution is the complement J − B, relabelled by x ↦ 5x.
- **The 5040 spectrum.**
  - The Chinese remainder theorem multiplies the local spectra.
  - The full singular-value table is 192 (×6), 96φ (×12), 48√2 (×36), 96/φ (×12), 24√2φ (×72), 24√2/φ (×72) and
    0 (×4830).
  - The rank is 210, and the condition number on fibre-constant directions is 4√2φ.
- **A Fibonacci engine.**
  - At five hours, A = G − I satisfies A² − A − I = J, so A² = A + I on zero-sum vectors.
  - An explicit integer change of coordinates makes A equal to F ⊕ F on the whole zero-sum lattice.
  - Lifted to 5040, the Gram matrix acts on these copies as 9216 = 96² times the five-hour Gram, and its powers carry
    the Fibonacci numbers F₂ₙ₊₁ and F₂ₙ₊₂.

The opening and closing state the boundary of this material. Robin's inequality fails at 5040, and Robin showed that
the Riemann hypothesis is equivalent to it holding for every n > 5040. The wheel forgets prime exponents and that
inequality needs them, so nothing here is a step toward the Riemann hypothesis.

一部约六分四十五秒的片子：在五千零四十个钟点的钟面上放一个三胞胎筛子——五给出黄金比例，七给出 Fano 平面与希伍德图的平坦谱，二者在 5040 的轮中合成一台 Fibonacci 引擎。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-033-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen** (the state file `Golden/Frozen/state/D5/S3/Constants/PentagonCosines.lean.json` at the subject
  commit): `D5/S3/Constants/PentagonCosines.pentagon_golden_cosines` states 2cos(π/5) = φ and 2cos(2π/5) = φ⁻¹. With
  |1 + e^{iθ}| = 2|cos(θ/2)|, these are the mod-5 amplitudes φ and 1/φ.
- **Published results cited by the volume** (badged as published):
  - Robin's 1984 criterion, which says the Riemann hypothesis is equivalent to σ(n) < e^γ n log log n for all n > 5040;
  - the Fano plane, the smallest projective plane, as the cyclic model D + t with D = {0, 1, 3};
  - the Heawood graph as its point–line incidence graph, with spectrum ±3 and ±√2 (×6).
- **Theory volume, argued but not kernel-checked.** Everything else comes from §§27 and 31–34 of the foundational
  volume, and the film badges it accordingly:
  - the quotient pullback, the scaling by 24 and the Fourier zeros;
  - the twin classification modulo 30 and 210;
  - the local spectra and the full 5040 singular-value table with its condition number;
  - the matrix identities BBᵀ = 2I + J and (J − B)(J − B)ᵀ = 2I + 2J, and the relabelling by 5;
  - the operator identity A² − A − I = J and the Fibonacci powers;
  - the integer conjugacy enc · A · dec = F ⊕ F;
  - the lift coefficient 96 and the Gram factor 9216.
- **Recomputed for this film** by an independent Python/numpy script:
  - **The wheel.**
    - 5040 = 2⁴·3²·5·7, rad = 210 and q = 24.
    - The 5040 wheel is the 210 wheel composed with reduction, for both shapes, with 192 = 24 × 8 legal hours.
    - Nonzero Fourier coefficients occur exactly at the 210 frequencies divisible by 24.
  - **Twins.**
    - Pair correlations are equal at moduli 30, 210 and 5040.
    - Modulo 30, w_B(r) = w_A(r + 4). Modulo 210 there is no shift, and T_A(6, 30) = 1 while T_B(6, 30) = 0.
    - {a, a+2, a+6} = {0, 4, 6} has a solution mod p for p = 2, 3, 5 and none for p = 7, 11, 13.
  - **Local spectra.**
    - The legal hours for H_A are {1, 2} mod 5 and {2, 3, 4, 6} mod 7; the mod-5 singular values are {2, φ, φ, 1/φ, 1/φ}
      and the mod-7 values are {4, √2 ×6}.
    - {0, 1, 3} is a perfect difference set mod 7. BBᵀ = BᵀB = 2I + J and CCᵀ = 2I + 2J.
    - sv(B) = {3, √2 ×6} and sv(C) = {4, √2 ×6}.
    - The Heawood spectrum is {±3, ±√2 ×6} and its girth is 6.
    - Two points share exactly one line, and {0, 1, 2, 5} has no three collinear points.
    - The H_A forbidden set mod 7 is 5·D.
  - **The 5040 table.** The singular-value multiset for both shapes matches the table, and so does the 210-level
    table 8, 4φ, 2√2, 4/φ, √2φ, √2/φ with multiplicities 6, 12, 36, 12, 72, 72. κ = 4√2φ ≈ 9.153, and the Gram
    condition number is 32φ² ≈ 83.78.
  - **The Fibonacci engine.**
    - G = 2I + U + Uᵀ for both shapes, G² − 3G + I = J and A² − A − I = J.
    - Aᵐ = F_m A + F_{m−1} I on zero-sum vectors for m ≤ 11, A⁻¹ = A − I, and spec A = {3, φ ×2, −1/φ ×2}.
    - enc · A · dec = F ⊕ F, enc · G · dec = F² ⊕ F², and dec ∘ enc = id.
  - **The lift to 5040.**
    - The legal-hour counts per class mod 5 are 96·w₅, and each class has 1008 copies.
    - G₅₀₄₀ applied to a lifted vector equals 9216 times the lift of G₅ applied to it.
    - (G₅₀₄₀)ⁿ⁺¹ applied to a lifted y equals 9216ⁿ⁺¹ times the lift of F₂ₙ₊₁y + F₂ₙ₊₂Ay, for n = 0…3.
  - **Robin.** σ(5040)/5040 = 3.838, which exceeds e^γ log log 5040 = 3.817.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating dials and the 24-turn helix;
  - the phasor animation;
  - the lattice orbit drawing;
  - the colour coding of the product grid;
  - the bar heights, which are drawn to scale only where labelled.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
