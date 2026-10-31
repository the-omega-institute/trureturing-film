# 083 · AURIC PREDICTIVE WAVES III · POSITIVE REALIZATIONS AND REAL MEMORY · AURIC 相容预测波 第三部 · 正实现与实记忆

This is the third film in the AURIC PREDICTIVE WAVES series and runs about 7½ minutes (7:25). It covers
`AURIC_COMPATIBLE_PREDICTIVE_WAVES_AND_RELATIONAL_SPECTRA_V.md`, §54–§115, at subject commit `c292ab048b`.

Parts one and two built the five-dimensional instrument, the compatible set K_d of qutrit states and the joint records
of its labelled time words. This volume keeps that one native history fixed and asks which machines can reproduce it:
finite classical models, real quantum models, complex qutrit models, a single preparation with one extra control, and
general ordered cones. It also asks what changes under finite records and small errors.

## The film, scene by scene

- **Classical criterion (§54–§56).**
  - A classical comparator has finitely many hidden states, nonnegative branches T₀, T₁ with 1ᵀ(T₀ + T₁) = 1ᵀ, an
    arbitrary preparation and a fixed effect f_cl. For every 0 < d < 1 and every fixed angle θ, an exact finite model
    exists exactly when θ ∈ (π/2)ℤ (Theorem 55.2).
  - Otherwise two strictly compatible worlds ρ± = ρ* ± tΔ differ by 2t Im(B_ζⁿ)₁₁ in the weighted all-zero records,
    with B_ζ = [[−1/2, √3ζ/2], [√3/2, ζ/2]] and ζ = e^(−2iθ). This contains a frequency that is not a root of unity,
    also at rational non-exceptional angles such as π/4, since B_ζ has finite order only for ζ = ±1 (Lemma 55.1).
    A finite positive model only sustains roots of unity.
  - Matching depth H only: k_H → ∞, with k_H ≤ 2(2^(H+1) − 1) on the witness segment (Theorem 56.1).
- **Exceptional triangle (§57).**
  - At θ ∈ (π/2)ℤ the labels permute three responses b(s) = (e_d, d + s, e_d − s), which sum to Σ = (6 + 3d)/8.
  - k_min = 3 for 0 < d ≤ 2/3. For 2/3 < d < 1 a six-state model on the hexagonal cube section (vertices: the
    permutations of (1, Σ − 1, 0)) works, and an explicit strictly mixed world with δ = (1 − d)(3d − 2)/100 rules out
    three. So 4 ≤ k_min ≤ 6, and which of 4, 5, 6 is minimal is left open (Theorem 57.1).
- **Real disc (§58–§59).**
  - At the exceptional angles a real two-dimensional model (any real Kraus branches, effects and hidden fibres) exists
    exactly when every response point satisfies ‖v(s)‖ ≤ μ = (2 + d)/8 (Theorem 58.1).
  - The real minimum is 2 for d ≤ d* and 3 for d > d*, where d* = 6(11 + 2√2)/(169 + 66√2) ≈ 0.31627. Above d*,
    explicit compatible witnesses ρ_t leave the disc (Theorem 59.1).
- **Real dimension six (§60–§71).**
  - At every non-exceptional angle (sin 2θ ≠ 0) the minimal real dimension is exactly 6 (Theorem 62.1).
  - I₃ and eight weighted word effects have determinant (6561/2³⁶) sin⁷(2θ) ≠ 0, so any affine encoding is injective.
    K_d has affine dimension 6, so m(m+1)/2 − 1 ≥ 6 and m ≥ 4. The standard realification gives m = 6 (Theorem 60.1).
  - Four and five are excluded: the native word closure contains a real SU(2) (Lemma 63.1); any model with m ≤ 5 is
    forced to an orthogonal 1 ⊕ ℝ⁴ representation (Lemmas 64.1–67.1); and a pure compatible curve ρ_t would make a
    degree-five polynomial equal one of degree at most three (Theorem 70.3). A specified covariant five-dimensional
    encoding already fails because it forces an effect entry 1/√2 > 1/2 (Proposition 60.3).
- **Finite records (§72–§78).**
  - Exact matching of all histories up to depth H needs k ≥ max{1, H − 2} states (Theorem 74.2).
  - The 4 × 4 Hankel matrix J of the weighted contrasts has det J = 81t⁴ sin⁴(2θ)/65536. So
    Δ_H ≤ ε < d(1 − d)|sin 2θ|/1638400 with H ≥ 6 still forces four states. At θ = π/4, d = 1/2 the condition is
    ε < 3/11468800 (Theorem 75.1).
  - For rational source data, the polynomial-minimum bound of Jeronimo–Perrucci–Tsigaridas gives an explicit
    threshold ε_k for every state count k (Theorem 78.1), with log log(1/ε_k) = Θ(k² log k) (Theorem 78.2). At
    d = 2/7, θ = π/4: ε₁ ≈ 10^(−1.44 × 10⁷).
- **Upper bounds (§79–§81).**
  - Near an exceptional angle θ* the exceptional model is within Δ_H ≤ min{1, 2H|sin(δ/2)|} on all of K_d
    (Theorem 79.1). At d = 1/2, θ = 10⁻⁶, H = 10000 three states reach error 0.01, while exact matching needs at least
    9998 states (Theorem 79.2).
  - One constant state with yes-probability U_d/2, U_d = 1/2 + √((d/2)(1 − d/2)), has error at most U_d/2 < 1/2 at
    every depth (Theorem 80.1).
  - Whether a fixed small error forces unbounded memory is left open (Definition 81.1).
- **Complex filters (§82–§87).**
  - Every complex three-dimensional model of the same records is σ = Rκ(G_p ρ G_p)R†, F = Rκ(G_p⁻¹ E G_p⁻¹)R†,
    Φ_j = ½ Ad(Rκ(V_j)R†), with G_p = √(p/c) P_ξ + √((1 − p)/(1 − c))(I − P_ξ), c = d/2, a unique p ∈ [c, 1/2], one
    fixed unitary R and one common choice κ of identity or complex conjugation (Theorem 82.2).
  - The effect is always rank one. Its efficiency λ(p) = c/2p + (1 − c)/2(1 − p) fills
    [1/2 + √(c(1 − c)), 1] (Theorem 87.2). At p = 2c/(1 + c), c ≤ 1/3, the effects span only eight dimensions
    (Theorem 87.1), and positivity on the whole set still removes the hidden offset (Theorem 86.1).
- **Same records, different states (§88–§90).**
  - At d = 1/2 the compatible state (aa† + gg†)/2 has spectrum (1/2, 1/2, 0), (7/12, 5/12, 0) and (2/3, 1/3, 0)
    at p = 1/4, 3/8, 1/2, with purities 1/2, 37/72 and 5/9 (Theorem 88.2).
  - The pure worlds (a ± ig)/√2 are orthogonal at p = 1/4 and overlap 1/3 at p = 1/2 (trace distance 2 versus 4√2/3),
    so no CPTP map turns the second pair into the first (Theorem 88.3).
  - Inside one calibration every history acts unitarily, but erasing the label sends the pure state ψ₊ to spectrum
    (11/16, 5/16, 0) (Theorem 89.1).
- **One mixing control (§91–§99).**
  - With only the pure preparation ψ = √d a + i√(1 − d) g, the native words span the eight-dimensional S_c within
    depth seven (Theorem 92.1). Any control N with [N, P_ξ] ≠ 0 adds a ninth column (Theorem 92.2) and makes the
    closure of forward words Ad PU(3) (Theorem 95.1).
  - Four 9 × 9 tables, 324 = 36 + 288 indexed numbers at depth at most 12 with N used at most twice, then force any
    complex competitor to equal the source up to one unitary or one common conjugation (Theorems 93.2, 94.1, 96.1,
    98.1).
  - If N does not mix, a filtered rival survives; at d = 2/3, p = 5/12 its efficiency is 34/35 (Proposition 97.1).
- **Ordered cones (§100–§110).**
  - Any real ordered model of dimension at most 9 (closed cone with compact base, positive effect, three positive maps)
    that matches the same four tables is a linear ordered copy: S(K) = PSD₃, Ss₀ = ρ₀, u = Tr∘S and SB_a = A_aS on
    all of V (Theorem 102.1).
  - The proof squeezes S(K) between the closed cone of the state orbit and the dual of the effect orbit, both equal
    to PSD₃ (§105–§106).
  - The bounds matter: a tenth unreachable direction (Proposition 109.1) or an unclosed countable cone without
    compact base (Proposition 109.2) reproduces every record.
- **Finite noise (§111–§115).**
  - For a fixed source, small table errors give one observation transport S. The competitor's normalised base tends
    to the qutrit density matrices in Hausdorff distance, with constants from a finite orbit net (Theorems 111.2,
    112.2).
  - Exactness is lost: depolarised polyhedral cones match every table within 13t but are never PSD₃ (Theorem 113.1).
    Controls N_h → I give table errors tending to zero while the base stays at distance (1 − c)/2, so no modulus is
    uniform over all mixing N (Theorem 114.1).

一部约七分半钟的片子，AURIC 相容预测波系列第三部，对应理论卷 V 的 §54–§115：同一个原生历史下，有限经典模型只在 θ ∈ (π/2)ℤ 时存在，例外角处经典最小状态数为 3（d ≤ 2/3），或介于 4 与 6 之间（未定）；实模型的最小维数在例外角为 2 或 3（阈值 d* ≈ 0.31627），在其余角度恰为 6；有限记录下精确匹配至少需要 H − 2 个状态，Hankel 证书给出四状态的误差阈值，有理数据下的阈值是双重指数的；所有复三维模型都是单参数 p ∈ [d/2, 1/2] 的滤波，同样的记录允许不同的谱与区分度；只用一个纯制备加一个混合控制，324 个带索引的数便在一个酉变换或共轭下钉住源，即使竞争者是任意不超过九维的实有序锥模型；有限噪声下固定源是稳定的，但不再强制精确的半正定锥。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-083-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit this volume has 105 digestion atoms, all residual-open.
  - No Lean declaration covers any statement shown.
  - The volume names four frozen general modules in `D5/S3/Observer/Hankel/` (WordHankelRealization,
    HoKalmanPerturbation, NoisyHoKalmanRecovery, HoKalmanPredictionBudget) as method background. It states that they
    are not direct Lean applications here. Their state files exist at `c292ab048b`, but the film gives them no badge.
- **Published results, used as external inputs.** The film badges these as published:
  - realification of complex quantum theory: McKague–Mosca–Gisin, arXiv:0810.1923;
  - the Choi–Effros multiplication: Choi–Effros, J. Funct. Anal. 24 (1977) 156–209, Theorem 3.1, in the form of
    Prunaru, arXiv:1304.6664, Theorem 1;
  - Wigner's theorem, in the form of Simon–Mukunda–Chaturvedi–Srinivasan, arXiv:0808.0779;
  - lower bounds for polynomial minima: Jeronimo–Perrucci–Tsigaridas, arXiv:1112.0544, Theorem 1;
  - invertible channels: Nayak–Sen, arXiv:quant-ph/0605041, Theorem 2.1.
  - The volume also uses positive-realization and invariant-cone methods from Monras–Winter (arXiv:1412.3634) and
    Fanizza–Lumbreras–Winter (arXiv:2209.11225), and real C*-algebra and Lie-group tools from Rosenberg
    (arXiv:1505.04091) and Hall (arXiv:math-ph/0005032).
  - It compares with further robustness, PSD-rank and real-versus-complex results, but does not use them as inputs.
- **Classical tools named in the volume.** Perron–Frobenius for reducible nonnegative matrices, Cayley–Hamilton,
  Hankel factorisation, Haar averaging, closed subgroups and Lie integration, Schur's lemma, trace-distance contraction
  and the implicit-function theorem.
- **Project inputs from other volumes, not recomputed as theorems.**
  - Volume I §17.1 and Theorems 35.2, 35.4 and 35.6: the instrument, the full compatible set K_d, its six-parameter
    form and the original-domain lifts.
  - Volume II Theorems 39.3–39.4: time words, the two terminal outcomes and the 2^(−n) weights.
  - Volume II Theorem 40.1: the word-effect span and its determinant.
  - Volume II Theorem 42.4: the strict feasible point.
  - Several of these were nonetheless checked numerically below.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory. The open
  questions are badged as open.
- **Recomputed for this film.** An independent Python script (numpy, sympy, mpmath, cvxpy with Clarabel) runs 198
  checks.
  - **Membership.** Membership in K_d (ρ = A + D, A, D ⪰ 0, Dℓ = 0, a†Aa = d and the three moments) is tested as an
    SDP. It holds for ρ*, ρ±, the mixed witnesses at d = 0.7, 0.8 and 0.95, the contact state at d*, the upper-interval
    witnesses, ρ_st, ρ_mix, ψ± and ρ₀.
  - **Classical criterion.**
    - The contrast identity holds against raw records to depth 8 at d = 0.3, 0.5, 0.8.
    - For a primitive N-th root ζ with N ≤ 40, (ζ − 1)/2 is an algebraic integer only for N = 1, 2.
    - B₁² = I and B₋₁³ = I.
    - At θ = π/4 the spectral weights of e are 0.689 and 0.311.
  - **Triangle.**
    - The label permutations hold, and the three-state model matches every record to depth 7 at d = 1/2.
    - The rational forms (57.11) and the coefficients A₃ … A₀ are exact.
    - 2b² − a² equals 3035115360000, 19703614140191, 12803513240000 and 734300000000.
    - b₃ against (Σ − 1)/2: 0.00595 < 0.00625, 0.02420 < 0.02500, 0.05270 < 0.05312.
  - **Disc.**
    - d* = 0.316273, and d_cap − d* = 396(407774√2 − 511233)/1514895529.
    - The contact state has R = μ, det B_d(ρ_t) = t(1 − t)d* c_ℓ², and the two orthogonal branches permute the
      effects.
    - Witness radii R/μ = 1.031, 1.130, 1.284 and 1.483 at d = 0.35, 0.45, 0.6 and 0.8.
  - **Six.**
    - |det| = 6561/2³⁶ |sin⁷ 2θ| at five angles.
    - The affine dimension of K_d is 6: the parameter Jacobian has rank 6, and all twelve small moves stay in K_d.
    - The realification trace identity holds on 20 random samples.
    - The generator identities (63.1) hold, and R moves the third axis to (−√3/2, 0, −1/2).
    - 27 points of the pure curve lie in K_d.
    - The polynomial degrees are 5 against at most 3.
  - **Records.**
    - Q_θ annihilates u_n, and the closed forms u₀ … u₆ hold.
    - a_n = 2t 2^(−n) u_n against raw records.
    - J·M(c) = t sin 2θ · I₄ and det J are exact (sympy), and the row bounds (75.8) and (75.10) hold.
    - log₁₀ log₁₀(1/ε_k) = 7.16, 16.71, 29.74, 46.55, 67.33, 92.23, 121.38 and 154.89 for k = 1 … 8.
    - ρ_st has spectrum (1/7, 3/7, 3/7) and conditional yes-probability 2/7.
  - **Upper bounds.**
    - ‖e^(iδW) − I‖ = 2|sin(δ/2)|.
    - The sampled full-record TV at δ = 0.05 stays below 2H sin(δ/2) for H ≤ 12: 0.148 at H = 12, against a bound of
      0.600.
    - Tr(ρ_h E) ≤ U_d on samples, and its supremum equals U_d.
  - **Filters.**
    - Records are identical to depth 4 for p = c, (c + 1/2)/2 and 1/2.
    - λ(p) and its legality range check out, with minimum 0.93301 at p_eff = 0.36603 for d = 1/2.
    - The efficiencies are 14/15 and 15/16.
    - The effect span is 8 at p = 2/5 and 9 at other legal p. For c = 1/3 the special value coincides with p = 1/2.
  - **Spectra.**
    - The spectra and purities are as listed. The entropies are 0.6931 and 0.6365.
    - Records are identical to depth 6.
    - The overlap is (4p − 1)/3, and the trace distance goes from 2 to 1.8856.
    - After erasure the spectrum is (11/16, 5/16, 0), with entropy 0.6211 nats.
    - The commutant of the two branches has dimension 2.
  - **Control.**
    - The native span reaches 8 by depth ≤ 7 and never 9, for 12 parameter pairs. At d = 0.2, θ = π/4 the span grows
      1, 3, 7, 8.
    - Two Haar-random mixing controls and one with Nξ ⊥ ξ, at d = 0.3 and 2/3, lift the span to 9.
    - The cross-block sum equals 3s − s².
    - An example table has rank 9, and H⁻¹Hᵃ recovers each map.
    - A common unitary, with or without conjugation, reproduces all four tables.
    - The 34/35 rival matches every word to depth 5.
  - **Cones.**
    - (6 − 5d)/16 lies in (1/16, 3/8), and Tr∘(A₀ + A₁ + A_N) = 2Tr.
    - The ten-dimensional extension keeps every record.
    - Random forward words reach fidelity 0.9926 with a random pure target.
  - **Noise.**
    - λ_min(Y) ≥ −√(2/3)‖Y‖₂ on 2000 random traceless samples.
    - The depolarised model has per-word error at most (k + 1)t.
    - For N_h with h = 0.2 … 0.002 the table error falls 0.165 → 0.011, while the base gap stays 0.375.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The u_n stems and the eigenvalues of B_ζ at θ = π/4.
  - The hexagon vertices, and the δ(d) curve and points.
  - The disc segment, the witness points, the R(ηd)/μ and R(0)/μ curves, and d*.
  - The affine-dimension bars.
  - The exact H − 2 points and the log log ε_k bars.
  - The sampled TV dots and the U_d/2 curve.
  - The λ(p) curve.
  - The spectrum bars, the trace-distance curve and the erasure bars.
  - The native-span bars and the four example 9 × 9 tables (d = 0.4, θ = 0.8, one random mixing N).
  - The table-error points against h.
- **Illustrative visuals.** These are illustrations, not data:
  - the wave emblem;
  - the hidden-state ring and the angle dial;
  - the response triangle and the permutation matrices;
  - the disc axes;
  - the dimension ladder and the Hankel index grid;
  - the singlet and doublet sketch with its moving p;
  - the cones, the wobbling base and the polygon P_t;
  - the PU(3) dot cloud;
  - the 3-versus-9998 bars on a log scale.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
