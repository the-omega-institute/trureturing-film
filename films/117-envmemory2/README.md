# 117 · AURIC ENVIRONMENT MEMORY II · EXACT TASK ERRORS AND MATCHING CERTIFICATES · AURIC 环境记录记忆 第二部 · 精确任务误差与匹配证书

This is part two, the last of two, of the AURIC ENVIRONMENT RECORD MEMORY series and runs about 7 minutes. It
covers `AURIC_FIB_ENVIRONMENT_RECORD_MEMORY_II.md`, §29–§44 (theorem numbers 29.2–44.2), at trureturing subject
commit `327221574c`.

A qutrit passes through the fixed channel F = Ad_U₀ ∘ Δ_W, with its fair chronological record erased, and one
terminal decoder must answer one binary task E = |v⟩⟨v|. Part one found the floor k = √(r(1 − r)) and the two faces
p = 0 and q = 0. This volume determines the exact error η_n(E) for every complex unit v and every finite horizon n,
each time with an attaining effect, a matching lower witness and one same-qutrit decoder.

## The film, scene by scene

- **Horizon six (§29, Theorem 29.2).**
  - In the ordered basis (ξ, e, f), W = diag(1, 1, −1), U₀ = 1 ⊕ a rotation of the (e, f) plane, and n uses of the
    channel give Fⁿ.
  - For n = 6 and v* = (ξ + e)/√2, the constant effect I/2 has residual I/2 − E* with spectrum (−1/2, 1/2, 1/2),
    so η₆(E*) ≤ 1/2 (29.7).
  - Every orthogonal projection P on the qutrit, of any rank and with no commutation assumption, has
    ‖(F⁶)†(P) − E*‖ > 1/2. Five steps after the first multiply the coherence by s = −1/32, and an error of at most 1/2
    would force Tr C ∈ [35/32, 61/32] ⊂ (1, 2). But Tr C = Tr P is the integer rank (29.12–29.15).
  - So the assertion that some projection is always optimal is false.
- **Balanced task (§30, Theorem 30.3).**
  - With τ = 2^(1 − n), for every n ≥ 4 the error is the unique root in ((1 − τ)/2, 1/2) of
    τ⁴t⁴ + 2τ²(1 − τ²)t³ + (1 − τ²)²t² − t + 1/4 = 0 (30.6).
  - At n = 2 and n = 3 the value comes from the degree-eight polynomials p₂ and p₃ of (30.9), through
    t = P(u)/(2(√Q(u) + 3)).
  - In every branch an effect K_n attains t, a witness Y_n of trace norm one meets it, and the decoder (30.13) is one
    CPTP map on the same qutrit. For n ≥ 4 the effect is a rank-one projection plus the eigenvalue t, so it is not a
    projection.
- **Conditional quartic (§31, Theorem 31.3).**
  - On the spectator plane r = 0 the task vector is v_p = √p ξ + √q e.
  - Stationarity of g(y) = (y − q)² + (c − τ√(y(1 − y)))² gives the quartic C(y) = 0 of (31.5). With its sign
    filter it has exactly one root y₀, and t₀ = √((y₀ − q)² + ℓ₀²) < 1/2.
  - If y₀ ≤ t₀, the pair (31.7) is optimal and η_n(E_p) = t₀ against every complex effect.
- **Four families (§32–§33, Definitions 32.2–32.7, Theorem 33.1).**
  - The families are P (a quartic in t), M (degree eight in u), D± (quartics, with d = 0 or d = 1) and R (degree eight
    for s < 0, a quadratic for s > 0).
  - After the conditional quartic there are at most 4 + 8 + 4 + 8 = 24 roots when s < 0 and 4 + 8 + 4 + 2 = 18 when
    s > 0.
  - Every retained root is a full complex optimum, with a feasible effect, a witness of trace norm one and equal
    primal and dual values. So all retained candidates have the same value, and the fixed order only selects a pair.
- **Exact value and decoder (§34–§35, Theorems 34.1 and 35.1).**
  - An optimum and a supporting witness always exist. The spectral case analysis (34.8)–(34.17) places every optimum
    in the conditional pair or a retained root of P, M, D or R, including endpoints and transitions.
  - For every 0 < p < 1 and every finite n ≥ 2, the measure-and-prepare decoder
    D_B(X) = Tr(BX)E_p + Tr((I − B)X)(I − E_p)/2, with B = U₀KU₀†, attains η_n(E_p) for all complex inputs (35.1–35.2).
  - The complementary task I − E_p has the same value with the same channel.
- **Interior residuals (§36, Theorem 36.2).**
  - For p, q, r > 0 outside the floor region of part one, every optimal residual has spectrum (−t, h, t) with
    k < t < 1/2 and 0 ≤ h ≤ t.
  - A real witness of trace norm one supports the optimum, with its positive part on the −t eigenspace and its
    negative part on the +t eigenspace.
- **Repeated contact (§37–§38, Theorem 37.3, Theorem 38.1, Proposition 38.2).**
  - When h = t, four root equations of degrees 2, 2, 4, 4 with two signs each, and at most two normal generators,
    give a finite list. Every accepted entry is a global optimum, and the list is nonempty whenever a repeated-contact
    optimum exists.
  - For n = 3, p = q = 1/32, r = 15/16, the error is t = (√1569841 − 249)/2560, the root of
    2560t² + 498t − 589 = 0, with K₂ = (1/13)[[5t + 3, 12 − 32t], [12 − 32t, 8t − 3]], d = 1, and residual spectrum
    (−t, t, t). The same quadratic rule holds on an open neighbourhood of these populations.
- **Simple contact (§38–§42, Proposition 38.3, Theorems 40.3, 41.5 and 42.1).**
  - At n = 3, let q* be the root in (1/16, 1/12) of 123904q*² − 43264q* + 2527 = 0. For every small ρ > 0 the task
    p = (1 − ρ)p*, q = (1 − ρ)q*, r = ρ has only optima with h < t.
  - For such tasks the volume enumerates projector faces and two reciprocal charts of a dual conic, rebuilds the
    effect from each dual point, and accepts an entry only after exact filters. Every support type of table (42.3)
    is covered, so the simple-contact list is never empty.
- **Degree bounds (§43, Theorem 43.2).**
  - The construction factors polynomials of total degree at most 11, solves univariate equations of degree at most
    104, and has fewer than 100 000 candidates.
  - The selected value has algebraic degree at most 16 · 792 · 11! over ℚ(p, q, r, s). The fixed order of
    Definition 43.1 selects one entry, and all choices give the same value.
- **Assembly (§44, Theorem 44.2).**
  - Horizons 0 and 1, the faces p = 0 and q = 0, the r = 0 family, the floor region, repeated contact and simple
    contact cover every complex unit v, every finite n and every instrument angle.
  - Each case gives the value, an attaining effect, a matching lower certificate and one same-qutrit decoder fixed
    for all inputs. Complements give the rank-two tasks; the tasks 0 and I have error zero.

一部约七分钟的片子，AURIC 环境记录记忆系列的第二部，也是最后一部：在时程六，平衡任务没有任何投影能达到常数效应 I/2 的误差 1/2，因为迹会被夹在 35/32 与 61/32 之间而不是整数秩；平衡任务的精确误差从时程四起是一个四次方程的唯一根，时程二、三由八次多项式给出；ξ–e 平面先由一个条件四次方程给出最优对，条件不成立时由 P、M、D、R 四个有限族接手，每个保留的根都带有原始与对偶相等的证书；内部任务的最优残差谱为 (−t, h, t)，分为重复接触与简单接触两类，各有有限的代数构造和次数界；最后把所有情形合起来，对每个复单位向量和每个有限时程给出值、达到它的效应、相合的下界证书以及一个测量再制备的解码器。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-117-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the volume has no digestion records (no `Meta/Digestion/backfill/` directory for it), and
    its part-one volume has none either.
  - No Lean declaration covers any statement shown, so every content scene is badged as theory.
- **Published results, used as external inputs.** The finale badges this one as published.
  - Bény–Kempf–Kribs, *Quantum Error Correction of Observables*, DOI:10.1103/PhysRevA.76.042303, Definition 8 and
    equation (7): the Heisenberg observable framework behind the task/effect interface. The volume states that this
    paper does not assert any of the finite optima here.
  - The volume also names Bény–Oreshkov (arXiv:0907.5391) and Bény (arXiv:0907.4207) only to say that their
    objectives differ from η_n(E); the film does not use them.
- **Classical tools named in the volume.** Spectral theorem and trace/operator-norm duality, finite-dimensional
  separation, Sylvester resultants, real closed fields and function-field differentials. They are not badged
  separately.
- **Project inputs, not recomputed as theorems here.** From part one (`AURIC_FIB_ENVIRONMENT_RECORD_MEMORY.md`, §27):
  the channel and chronological law (27.1)–(27.3), the task/effect interface (27.4)–(27.5), the effect image (27.6)–(27.7),
  Theorems 27.3–27.5 and 27.7 and Proposition 27.8. The qutrit iteration is from the five-window quantum memory
  volume, §§18–20. These are badged as theory.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy, scipy, and cvxpy with Clarabel for the
  semidefinite programs) checks the following. The task error is solved as an SDP over all complex qutrit effects,
  using the actual channel F, not the volume's block formulas.
  - **Horizon six.**
    - One adjoint step on a block matrix is (x, z, y, d) ↦ (x, −z/2, (y + 3d)/4, (3y + d)/4), and s = −1/32 with
      coefficients 31/64 and 33/64.
    - I/2 − E* has spectrum (−1/2, 1/2, 1/2). The arithmetic 1/4 − (31/64)² = 63/4096 and the interval
      [35/32, 61/32] are exact.
    - 3000 random projections of ranks 0–3 have errors at least 0.6282. Local search over rank-one and rank-two
      projections finds at best 0.62765 and 0.65686. Ranks 0 and 3 have error 1. Tr (F⁶)†(P) equals the rank.
  - **Balanced task.**
    - η_n(E*) = 0.314425, 0.389279, 0.441778, 0.469780, 0.484626, 0.492249, 0.496109, 0.498051, 0.499024,
      0.499512, 0.499756, 0.499878, 0.499939 for n = 2 … 14. The quartic has one root in its interval, and the
      SDP agrees to 2 × 10⁻⁷.
    - p₂ and p₃ equal (H² − 36(k − 4u)²Q)/64 symbolically, H(1/2) = −96 and H(1) = −960, and (30.22), (30.25),
      (30.28), (30.31) and (30.35) hold.
    - At every n the effect is feasible and nonprojective, Y_n has trace norm 1, and the primal value, the dual value
      and the decoder error all equal t.
  - **Spectator plane.**
    - The coefficient lists (31.8), (32.6), (32.12), (32.18), (32.22) and the identities (33.3), (33.7), (33.14),
      (33.15), (33.17) were checked symbolically.
    - For n = 2 … 7 and 82 values of p each, the prescription of Definition 32.7 matches the SDP to 3 × 10⁻⁷. Every
      retained root in every family was certified (effect, trace-norm-one witness, support equality, primal = dual).
      The selected branches were conditional 188, P 75, M 216, D 10 and R 3.
    - The conditional root is unique and t₀ < 1/2 with t₀² ≤ (1 − τ)²pq. At n = 3 the filter y₀ ≤ t₀ holds exactly
      for p > 0.67863.
    - The decoder's nine Kraus operators sum to I, it equals the measure-and-prepare map, D_B†(E_p) = B, sampled
      errors stay ≤ t and an eigenstate attains t. Complement values agree.
  - **Interior.**
    - 240 random interior tasks at n = 2 … 5: 58 floor, 84 repeated contact, 98 simple contact. The floor test of
      part one agrees with η = k. Every SDP optimum outside the floor has spectrum (−t, h, t) with k < t < 1/2.
    - Every repeated-contact optimum has a certified accepted entry of Definitions 37.1–37.2. No simple-contact task
      has one. The witness test of Definition 40.2 passes on every simple-contact optimum, and the family Y(a) reaches
      the value t to within 5 × 10⁻⁵.
    - Support types of the simple-contact optima: P 23, L 4, dual conic with M < 0 32, dual conic with M > 0 39.
      Endpoint projectors and U did not occur in this sample.
    - Proposition 38.2: t = 0.392161. The closed form, K₂, the bracket 3/8 < t < 2/5 and the spectrum (−t, t, t) were
      checked, and the SDP agrees. 15 nearby populations follow the same rule.
    - Proposition 38.3: q* = 0.074159 and t* = 0.186417. The boundary optimum has y₀ = 1/8. For ρ = 0.03 … 0.001 the
      SDP optima have h = 0.1306 … 0.1245 < t = 0.2385 … 0.1885.
    - The identities of Theorem 41.2 hold at 300 random chart points, and (40.8) holds at face points with F = 0.
    - The arithmetic of Theorem 43.2 holds, with 16 · 792 · 11! = 505 825 689 600.
  - **Assembly.** On 90 random complex unit vectors with n = 0 … 6, the value is phase-free and equals the
    complement's value. It matches the branch formula in every implemented case (n = 0: 17, n = 1: 13, r = 0: 8,
    p = 0: 6, floor: 10, repeated: 15). The 21 simple-contact cases pass the witness test.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The B = I/2 spectrum bars and the projection-error histogram.
  - The η_n(E*) curve.
  - The y₀ and t₀ curves with the SDP dots and the threshold p = 0.6786.
  - The branch strips and the coloured η_n(E_p) curves for n = 2 and n = 3.
  - The horizon-three simplex of 210 tasks.
  - The interior example spectrum (n = 3, r = 0.02) and the bars of Proposition 38.2.
  - The t and h curve in ρ.
  - The support-type bars.
  - The degree bars.
  - The sample counts in the assembly scene.
- **Illustrative visuals.** These are illustrations, not data:
  - the three-node qutrit with its pinched links and rotation arc;
  - the erased record tape;
  - the matrix grids;
  - the flow boxes and the decoder diagram;
  - the conic sketch with its chart lines;
  - the generic (−t, t, t) axis in the repeated-contact scene.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
