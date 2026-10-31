# 122 · AURIC ERASED-HISTORY RECOVERY II · ONE ROOT, ONE DISK AND FINITE CERTIFICATES · AURIC 擦除历史的终端恢复 第二部 · 一个根、一个圆盘与有限证书

This is part two of two in the AURIC ERASED-HISTORY RECOVERY series and runs about 7⅓ minutes. It covers
`AURIC_FIB_ACTUAL_ERASED_HISTORY_TERMINAL_RECOVERY_II.md` (§127–§169) at subject commit `b9087e5194`; the scenes
run from §127 to §168. Part one (film 121) covers the first volume. One terminal qutrit decoder is fixed before the unknown
input, sees only the terminal qutrit and must return every complex density within half trace distance. This film
gives the exact third-horizon value, every optimal decoder, the continuation of both down to the parameter zero, the
complete second-horizon decoder fiber and finite certificates for budgeted tasks.

## The film, scene by scene

- **The third horizon (§127).**
  - In the ordered basis (127.1) the actual erased-history channel after n steps is N_n = F^n = Ad_U₀ ∘ Φ_s with
    s_n = (−1/2)^(n−1). At n = 3, Φ_1/4 keeps X₀₀, multiplies the 01 coherence by 1/4, mixes the populations 1 and 2
    as (5X₁₁ + 3X₂₂)/8 and (3X₁₁ + 5X₂₂)/8, and erases the 02 and 12 coherences (127.4).
  - The objective is μ₃ = min over CPTP D of max over all complex densities of ½‖ρ − D N₃(ρ)‖₁ (127.5). The bijection
    R = D ∘ Ad_U₀ does not rotate the identity target, so μ₃ = μ(1/4) (127.6).
  - The number line shows part one's interval 11/18 ≤ μ₃ ≤ 5/8 and the replacer value 2/3.
- **One isolated root (§128–§129, Theorem 128.2, Lemma 129.2).**
  - The value is the L-coordinate of the zero of four rational polynomials F = (N, N_p, N_x, N_r) in z = (r, L, p, x),
    where N(r, L; p, x) = L³ − L(d² + k²px + py + xy) − p[d(k²x − y) + 2kxy], k = 1 − r/4, v₁ = (5x + 3y)/8,
    d = x − r²v₁ (128.1). The table (129.1) lists all nine coefficients h_ij of 128N.
  - A 40-digit rational centre and the box of radius 10⁻²⁰ contain exactly one zero, by the contraction
    G(z) = z − M F(z) with ‖M‖∞ < 2 and Hessian coefficient bound H = 3499/16 (129.6–129.8).
  - μ₃ = L* with 0.61798892483200656999 < L* < 0.61798892483200657002 (128.3).
- **The cubic chord (§130–§132, Lemma 131.1, Lemma 132.1, Proposition 132.2).**
  - The attaining decoder has Kraus operators K₀ = diag(1, r*, 0), K₁ = √(1 − r*²)|2⟩⟨1|, K₂ = |2⟩⟨2| (128.4,
    130.1), and det(LI − A) = N for the signed error A of a nonnegative-amplitude pure input (130.4).
  - For 9/10 < r < 93/100 the largest error eigenvalue on each closed edge of the population triangle is at most 3/5:
    exactly 1/(2 − b) on x = 0, at most 32/55 on y = 0, at most √(8/23) on p = 0 (131.1–131.6).
  - Since N is a cubic with a stationary zero at the interior contact and positive on the boundary, it is
    t²(α + βt) > 0 on every chord (132.1). Diagonal covariance and convexity extend the bound L* to every complex pure and
    mixed input, and e(R*) = L* (132.2–132.3).
- **Nine phases (§133–§135, Lemma 133.1, Lemma 135.1, Proposition 135.2).**
  - T = adj(L*I − A)/τ is a rank-one projector with AT = L*T, and N_r = 0 is the stationarity identity
    r v₁(T₂₂ − T₁₁) = w (133.1–133.5).
  - The nine phases U_jℓ = diag(1, ζ^j, ζ^ℓ), ζ = e^(2πi/3), give W = (1/9) Σ T_jℓ ⊗ Φ(P_jℓ)ᵀ with nine diagonal
    entries and one coupling w at (00, 11) (134.3).
  - S = I ⊗ Y − W is positive semidefinite, with smallest positive entry g/τ ≈ 1.3054 · 10⁻⁴ (135.1–135.2), and every
    complex CPTP decoder has e(R) ≥ L* + Tr(S J_R) ≥ L* (135.7).
- **Worst inputs and support (§136–§137, Theorem 136.1, Theorem 137.1).**
  - For R*, the maximizing densities are exactly the pure states √p*|0⟩ + e^(iα)√x*|1⟩ + e^(iβ)√y*|2⟩ for real α, β.
    No density of rank two or more and no pure edge or vertex input attains L* (136.1).
  - Every optimal decoder satisfies S J_R = 0, so ran J_R ⊆ span(|00⟩ + r*|11⟩, |21⟩, |22⟩) (137.1).
- **The optimal disk (§139–§140, Theorem 139.1, Corollaries 140.1–140.2, Proposition 140.3).**
  - On the support, the trace-preserving family is H(h, z) with |h|²/η + |z|² ≤ 1, η = 1 − r*² (139.6–139.7). The
    individual scores are L* − 2Γ Re(h ζ^(ℓ−j)) with Γ > 0 (139.9–139.11), so Re h, Re hζ, Re hζ² ≥ 0 with sum zero,
    and h = 0 (139.12).
  - The optimal decoders are exactly R_z, |z| ≤ 1 (139.3–139.4). All have the same composite C_1/4 (140.1); the disk has
    real dimension two, Choi rank three inside and two on the circle, no rank-one member; all are covariant and nonunital,
    R_z(I) = diag(1, r², 2 − r²) (140.5).
  - The exposed face selected by S has real dimension four, and the disk is not a face (140.6).
- **Down to zero (§141–§150, Lemma 141.2, Theorem 141.3, Theorem 146.1).**
  - det D_uF(1/4; u*) lies in [1.6294931870268401569, 1.6294931870268401607] (141.5), so analytic implicit-function
    continuation gives a local branch, and the value and full disk persist near 1/4 (141.3, §§142–143).
  - Sixteen rational slabs with quartic predictors and tubes of radius 2⁻³⁰ cover [1/16, 1/4] (148.1–148.3); one
    scaled chart u = P(q) + q⁹e with a degree-eight predictor and ‖e‖∞ ≤ 1024 covers [0, 1/16] (149.1–149.6); the
    joints have exact positive gaps (150.1–150.3).
  - Under the base premises of §§128–145, for every 0 < q ≤ 1/4 the value is μ(q) = L(q) and the optimal set is one
    closed disk (146.1).
- **Limits at zero (§152).**
  - r(q) → 1 and the positive-side cluster set of optimal decoders is R_(1,z), |z| ≤ 1 (152.1).
  - r(q) = 1 − q/2 + (25/24)q² + O(q³) and μ(q) = 2/3 − (2/9)q + (4/27)q² + O(q³) (152.3).
  - d_I = 1 − r² = q − (7/3)q² + O(q³); G/d_I → 2/9 and G/δ_u → 2/3, where G = 2/3 − μ(q) and δ_u = d_I/3 (152.4–152.5).
- **The second-horizon fiber (§153–§160, Theorem 153.1).**
  - At s = −1/2, with part one's value μ₂ ≈ 0.6064470, each of the twelve contacts saturates individually (154.2), and
    the phase sums force t = a, d = c, U = V = Q = 0 (156.3–156.4). Every optimizer has R Φ = C* on all of M₃ (156.5).
  - The optimizers are J = B H(z) B†, z ∈ ℂ⁴, H(z) ⪰ 0 (153.6), with the joint domain A ≥ 0, B₀ ≥ 0, AB₀ ≥ |C₀|²
    (157.3). The family has real dimension eight inside a sixteen-dimensional exposed face and is not a face
    (158, 160).
  - The covariant optimizers are z₁ = z₃ = z₄ = 0, |z₂|² ≤ a(1 − c) (159.5), and every optimizer has
    R(I) = diag(a, b + c, 3 − a − b − c) ≠ I (159.6).
- **Finite certificates (§162–§168, Theorems 163.1, 165.1, 166.1, 167.1).**
  - Tasks (E, ε) with error ‖(RΦ_s)†(E) − E‖_op ≤ ε and legal decoders form a polarity (163.1).
  - The recovered channels fill an affine set of dimension 8r_s: 40 at every finite horizon and 16 at the limit (165.1).
    Every infeasible task family has an infeasible subfamily of at most 41 tasks, or 17 at the limit (166.1).
  - At most 41 pure inputs give the exact full value (167.1). At the third horizon the nine phase inputs of §134 already
    do, by Propositions 132.2 and 135.2.
  - Eighteen symmetries give a fixed carrier of dimension seven and eight representatives. These certify only the
    symmetric problem; an arbitrary decoder needs their orbit of at most 144 states, since a representative can miss an
    error of √3/2 (§168).

Not covered on screen: the literature and scope sections §138, §145, §151, §161 and §169, the continued input-equality
corollary §144, and the budget-slack theorem §164.

一部约七分二十秒的片子，AURIC 擦除历史的终端恢复系列的第二部（共两部）：第三个时间步上，同一个固定解码器对所有复密度矩阵的最优半迹距离误差是四个有理多项式公共根的 L 坐标 L* ≈ 0.6179889，由一个半径 10⁻²⁰ 的压缩盒孤立；上界来自三角形边界上的 3/5 估计和过接触点的三次弦，下界来自九个对角相位上的 Choi 松弛矩阵；最坏输入是纯态的二维环面，最优解码器恰好构成闭圆盘 |z| ≤ 1，它不是 CPTP 集合的面；参数 q 从 1/4 一直延拓到零，值的展开为 2/3 − (2/9)q + (4/27)q²；第二个时间步的最优解构成实八维族；最后，带预算任务的不可行性至多需要 41 个任务作见证，完整值至多需要 41 个纯态输入，对称约化后需用至多 144 个态的整个轨道。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-122-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One frozen general theorem is used, and only for the sentence that states it.
  - The digestion directory of volume II at the subject commit has 74 residual-open, 6 absorbed-closed,
    7 nonpropositional-inapplicable and 0 partial-closed atoms.
  - Five absorbed-closed atoms are covered by `D5/S3/Quantum/Foundation/FiniteKrausChannel.finite_kraus_quantum_channel`
    (one also by `FiniteStateChannel.nonnegative` and `FiniteStateChannel.trace_eq_one`): a finite Kraus family with
    Σ K†K = I gives a quantum channel acting as the Kraus sum. They are the Kraus lists (130.2) and (141.2),
    Lemma 130.1, the legality of R* and the positivity of the recovered densities. The state files of both modules
    exist under `Golden/Frozen/state/D5/` at the subject commit. The sentence "any finite Kraus list whose adjoint
    products sum to the identity is a legal channel" in the cubic-chord scene and the first clause of the finale's
    evidence line carry the `lean` badge. The particular Kraus sums of the volume are recomputed below, not frozen.
  - The sixth absorbed-closed atom, Theorem 163.1, is covered by
    `D5/S3/ConceptDynamics/Closure/SourceClosureLaws.source_closure_extensive_and_monotone` (a closure operator is
    extensive and monotone), whose state file also exists. The film badges the polarity sentence as theory.
- **Published results cited in the volume.** None is badged as a published input; the volume's own proofs do not
  depend on them.
  - Coutts, Girard and Watrous, arXiv:1810.13295v4, Theorem 3 (complementary Choi slack); Matsumoto, arXiv:1012.2650v7,
    §5; Jenčová, arXiv:1512.07016v2, §4 and arXiv:1105.1899v2, §4 (state-experiment and generalized-channel
    correspondences); Bellon, Henrion, Kungurtsev and Mareček, arXiv:2104.05445v3 (stated in the volume as not invoked).
- **Classical tools named in the volume.** Choi's theorem (Linear Algebra Appl. 10 (1975) 285–290,
  doi:10.1016/0024-3795(75)90075-0), the analytic implicit function theorem (Krantz and Parks,
  doi:10.1007/978-0-8176-8134-0, §2.3), Banach contraction, rational interval arithmetic, the trace-distance
  variational formula, Schur complements and the finite convex-intersection (Helly-type) argument, which the volume
  proves. The finale and the analytic-continuation sentence of the branch scene badge them as classical.
- **Project inputs from part one, badged as theory.** The transport identity (93.5, 93.10), attainment and pure-input
  reduction (Lemmas 105.2–105.3), the diagonal twirl (Lemma 112.2), the rational interval convention (§120), the
  pure-target determinant and inertia criterion (122.7–122.8), the output-first Choi convention (124.1), the interval
  11/18 ≤ μ₃ ≤ 5/8 (107.8), and the second-horizon root, value, contacts and slack (§§118–125).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (sympy exact arithmetic, mpmath Newton at 60–80 digits,
  numpy sampling, cvxpy with Clarabel for semidefinite programs) checks the following.
  - **Channel.** F^n = Ad_U₀ ∘ Φ_s(n) for n = 1…6 on random complex matrices; the one-step erased channel is angle
    independent; the identity decoder has error exactly 5/8 at s = 1/4.
  - **Root.** The coefficient table (129.1) equals 128N exactly. Newton's root lies 4.6 · 10⁻⁴¹ from the rational centre:
    r* = 0.92156817296960274731, L* = 0.61798892483200657001, p* = 0.31376955129083439181,
    x* = 0.28532031422430807499. In exact rationals 10⁻⁴⁰ < ‖F(c)‖∞ < 2 · 10⁻⁴⁰, ‖M‖∞ = 1.92317 and
    4 · 10⁻⁴¹ < ‖MF(c)‖∞ < 5 · 10⁻⁴¹; the four Hessian sums are 345/2, 3441/32, 5311/64 and 3499/16. All 15 enclosures
    of (129.9) hold at the root, with g = 1.1128 · 10⁻⁴ and g/τ = 1.3054 · 10⁻⁴.
  - **Upper bound.** det(LI − A) = N symbolically for general q. At r*, the edge maxima are 0.59470 (= 1/(2 − b)),
    0.55354 (= k²/(2k − a)) and 0.51474 (< √(8/23) = 0.58977); the rational bounds of (131.2) hold at both ends of
    [9/10, 93/100]. N has vanishing constant and linear coefficients on four lines through the contact and is positive on
    three full chords. On a simplex grid the largest error is 0.6179822 ≤ L*; 6000 random complex pure and mixed inputs
    give at most 0.617969; phase-rotated contacts attain L*.
  - **Lower bound.** T is a rank-one projector with AT = L*T; all 81 entries of W match (134.3); S ⪰ 0 has rank six and
    the stated kernel; S J_R* = 0 and b − Tr Y = L*. For 300 random complex channels the nine-input error is at least
    0.6424 and the average score equals L* + Tr(SJ). An SDP over the nine inputs alone returns 0.6179889.
  - **Equality set and disk.** Mixtures of two distinct phase contacts stay at or below 0.49647. For z = 0, 0.5,
    0.3 + 0.6i, e^(1.3i) and −1, R_z is CPTP with Choi matrix B H(0, z) B†, the same composite and Choi rank 3 or 2; the
    coefficient eigenvalues are η, 1 ± |z|. Γ = 0.129153 (Γ/√(xy) = 0.38187019889); the individual scores follow
    (139.11); h = 0.05 e^(0.4i) has worst witness error 0.62839 > L*; H(±t, 0) give 0.64544 and 0.66870 > L*.
  - **Continuation.** det D_uF = 1.62949318702684015883 inside (141.5). J₀, det J₀ = 32/9 and M₀ match (149.1); the
    recurrence reproduces all 36 predictor coefficients exactly; F(q, P(q)) vanishes through degree eight and g(q, P(q))
    starts with q²/216. A Newton continuation from 1/4 down to q = 5 · 10⁻⁴ keeps the Jacobian determinant in
    [1.6295, 3.5505], stays inside the scaled tube on (0, 1/16], and satisfies all 31 bounds B_h on [1/16, 1/4] and all
    31 scaled bounds T_h on (0, 1/16]. The 80 interpolation nodes of (148) lie within 3.4 · 10⁻⁴⁹ of the true roots
    (ρ = 2⁻³⁰); the slabs, endpoint identities and anchor inclusion check; the four gaps G_i of (150.3) are reproduced
    exactly (1.18 · 10⁻⁸ to 1.40 · 10⁻⁸). Nine-input SDPs at q = 1/16, 1/8, 3/16 and 0.02 return 0.6533103, 0.6408621,
    0.6291355 and 0.6622799, equal to L(q).
  - **Limits.** At q = 5 · 10⁻⁴ the cubic remainders are −1.790 q³ for r and −0.207 q³ for L (the next predictor
    coefficients are −43/24 and −67/324); G/d_I = 0.22241 and G/δ_u = 0.66722.
  - **Second horizon.** From part one's rational centre, ab = η² to 10⁻¹⁹; the five-Kraus decoder attains
    L₂ = 0.606446991399 on all twelve contacts and stays below it on 5000 random pure inputs; an SDP over the twelve
    contacts returns 0.6064470. The TP equations have real rank 9 (face dimension 16) and the observable map rank 8
    (fibre dimension 8); the joint domain agrees with H(z) ⪰ 0 on 4000 samples; the slices are |z₁| ≤ 0.64458 and
    |z₂| ≤ 0.72259; only z₂ is covariant; R(I) = diag(0.938, 0.781, 1.282); H± give 0.608123 and 0.607312 > L₂.
  - **Tasks.** r_s = 5 for s ≠ 0 and 2 for s = 0; the carrier dimensions are 40, 16 and 72 (identity horizon); the
    fixed carrier under the 18 actions has dimension 7 at s = 1/4 and −1/2; the swap example has error √3/2 with
    eigenvalues 0, ±√3/2; a finite toy confirms the polarity laws.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The error heat map on the population triangle and its three chords.
  - The three edge curves with the 3/5 and L* lines.
  - The chord curves N(t)/max N.
  - The 9 × 9 functional W and the diagonal of S.
  - The error bars for the contact orbit, the edge maxima and the sampled mixtures.
  - The continued branch L(q), r(q), p(q), x(q) with the SDP dots; the ratio curves G/d_I and G/δ_u.
  - The second-horizon slice boundary in (|z₁|, |z₂|).
  - The dimension bars 40, 16, 72 and 25, 16, 8, 2; the slab layout of (148.1).
- **Illustrative visuals.** These are illustrations, not data:
  - the eight chronological words and the flow diagram;
  - the nested boxes;
  - the unit circle with cube roots of unity and the nine phase cells;
  - the torus of worst inputs;
  - the 3 × 3 grid of Choi basis cells;
  - the ellipse cross-section, the half-planes and the closed disk;
  - the shrinking-radius disk icons;
  - the contact rings, the polarity ovals and the dot grids of 41 and 144.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
