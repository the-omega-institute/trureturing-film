# 082 · AURIC PREDICTIVE WAVES II · EXACT RADII AND RECORD DEPTH · AURIC 相容预测波 第二部 · 精确半径与记录深度

This is part two of five in the AURIC PREDICTIVE WAVES series and runs about 7½ minutes. It covers two volumes of
trureturing at subject commit `6984386a60`:
- `AURIC_COMPATIBLE_PREDICTIVE_WAVES_AND_RELATIONAL_SPECTRA_III.md`, §1–§30;
- `AURIC_COMPATIBLE_PREDICTIVE_WAVES_AND_RELATIONAL_SPECTRA_IV.md`, §44–§53.

Volume III takes the complete fiber K_d of compatible qutrit successor states from the first volume and computes the
exact worst-case risk of a common reconstruction: the radius of the smallest trace-norm ball around K_d. It finds
three exact branches and one open window. Volume IV keeps the history labels and asks how deep a complete labelled
record must be before it pins a compatible state.

## The film, scene by scene

- **The smallest ball (III §1, §8).**
  - Every CPTP channel T with T†(J_j) = Y_j for all depths has successor S_ρ with ρ in K_d. Every common
    reconstruction gives a density center σ. ‖S_ρ − R_σ‖_◇ = ‖ρ − σ‖₁ for every finite untouched reference, so
    r(d) = min over σ of max over ρ ∈ K_d of ‖ρ − σ‖₁ (Definitions 1.1–1.2, (III.1.6)).
  - K_d is the set of ρ = A + D ⪰ 0 with ran D in the fixed plane N, a†Aa = d, Tr Cρ = d and Tr Eρ = (6 − 5d)/16.
    In six real coordinates it is cut out by nine polynomial inequalities (Proposition 8.2).
  - A traceless qutrit difference has ‖H‖₁ = 2‖H‖_op, so radius 2c means σ − cI ⪯ ρ ⪯ σ + cI for all ρ ∈ K_d.
    For c > 0 the two cubic determinants q± = det J(σ + cI − ρ)J and det J(ρ − σ + cI)J decide this exactly,
    with q±/6 = c³ − (c/2) Tr Δ² ∓ det Δ. At c = 0 the pair diag(1, 0, 0), diag(0, 1, 0) has both determinants
    zero while the inclusion fails (Proposition 8.3).
- **Two pure worlds (III §2, §18–§19, §25–§27).**
  - ψ± = √q w ± i√(1 − q) g with q = 5d and w = (a − 2h)/√5 lie in K_d. Their midpoint is
    σ = q ww† + (1 − q) gg†, and ‖ρ₊ − ρ₋‖₁ = 4c with c = √(q(1 − q)). So no center does better than 2c
    (Theorem 2.1, (III.19.14), (III.27.8)).
  - Every ρ in K_d has ρ_gg ≥ 1 − 5d (Proposition 18.2), which gives the lower side for d ≤ 1/10. On the
    normalised cap the matrix L_x is positive semidefinite for x ≤ x*, which gives the upper side
    (Proposition 25.2, Theorem 27.1).
  - Hence r(d) = 2√(5d(1 − 5d)) for 0 < d ≤ d*, with σ(d) the unique optimal center among all complex densities
    (Theorem 27.1).
- **Departure at d\* (III §26, §28–§30).**
  - On the cap, P_x(S_max(u), u) = (4 − u)F_x(u)/(2560(1 + x)) with a cubic F_x. There is exactly one
    (x*, u*) in (4/5, 5/6) × (0, 4) with F = ∂_uF = 0: x* ≈ 0.80659, u* ≈ 0.70232, and
    d* = x*²/(5(1 + x*²)) ≈ 0.0788305745. It is real algebraic (Theorem 26.1).
  - At d* the upper contacts are exactly ρ₊, ρ₋ and two mixed R₊ worlds ρ_R±, which are rank two with
    det B_d = 0 and nonzero imaginary ag and hg coherences. The lower contacts are exactly ρ₊, ρ₋
    (Proposition 28.2, Theorem 29.1).
  - For every d* < d ≤ 1/10 the mixed worlds break the upper side, so r(d) > 2√(5d(1 − 5d)) (Theorem 29.2). The
    exact result transfers to all common CPTP reconstructions and finite references (Corollary 30.1).
- **Three branches (III §3–§6, §20, §24, §30).**
  - On d_high ≤ d ≤ d_b one algebraic center σ_x = κT_x − cI, with four pure contact worlds averaging to M_d(u),
    gives r = 2(L² − Q)/(3Q). Here d_high = d(x†) ≈ 0.28122 with F₄(x†) = 0 and d_b = d(x₀) ≈ 0.87412 with
    F₆(x₀) = 0 (Theorems 3.2 and 20.2).
  - r(2/7) = 4/7 + 8√3/21. At d = 49/92 the parameter is x = 1/5, σ = [[14/23, −7/46, 0], [−7/46, 7/46, 0],
    [0, 0, 11/46]], c = 14/23, r = 28/23 and Z M Z = (23/65) I (Proposition 5.1).
  - For d_b < d < 1 the minus mode of M_d(u) sits at the floor c, strict concavity leaves one admissible root of
    F_d(u) = 0, and the center σ = (A − c)Π₊ + (B − c)Π_g has rank two (Theorem 4.2).
  - Together with the pure-pair branch this leaves only d* < d < d_high open (Definitions 6.1 and 24.2,
    Proposition 30.2).
- **The open window (III §6–§7, §11–§13, §17).**
  - At d = 5/61 the pure family alone has radius 60/61 (Definition 6.2).
  - An explicit mixed R₊ family with Im(ρ_R)_ah = −t_H d ≠ 0 exists for every 0 < d < 2/7, with an original
    CPTP lift (Theorem 11.2, Proposition 11.3; a single mixed world at 5/61 is Proposition 7.2).
  - Four worlds ρ_P, conj ρ_P, ρ_R, conj ρ_R with two test vectors and the rational matrix κI − M ≻ 0 give
    r(5/61) > 0.9840437 > 60/61 + 1/2300 (Theorem 12.2).
  - On [163/2000, 33/400], r(d) > 2√(5d(1 − 5d)) + 1/5000 (Theorem 12.4).
  - A five-direction center outside K_d with ten positive rational matrices gives r(5/61) ≤ 30783/31250 = 0.985056
    (Theorem 13.4). So 0.9840437 < r(5/61) ≤ 0.985056 and the exact value is open (Corollary 13.5,
    Definition 17.1).
- **Exact tests (III §9–§10, §14–§16, §21–§23).**
  - det(D + i cross(t)) = det D − tᵀDt, so for S ≻ 0 the imaginary fiber is the ellipsoid tᵀSt ≤ det S. Rank two
    gives a segment and rank one gives t = 0 (Theorem 14.2).
  - The inner maximum is a lossless SDP when S ≻ 0 and b > 0, and is found among finitely many quartic, cubic and
    quadratic candidates (Theorems 15.1, 16.3).
  - On each real face a single multiplier gives a four-by-four real LMI, by the single-constraint S-lemma
    (Theorems 21.4 and 22.2).
  - An optimal lower certificate needs at most six conjugate pairs of extreme contacts (Proposition 9.3).
    Positivstellensatz certificates exist with degree at most 2^(2^(2^(3^4096) + 11^64 · 3^(2·16⁶)))
    (Proposition 9.2).
  - CP plus co-CP identities are sufficient upper certificates only. A matrix-level example shows that a scalar
    inclusion need not have CP coefficients (Proposition 10.1).
  - A truncated cofactor test loses the positive term Tr(H₂ adj ρ) at a mixed upper contact (Propositions 23.1,
    23.2).
- **Complete records (IV §44–§45).**
  - With V₀ = U e^(iθW), V₁ = V₀W and M_h = V_h† E V_h, the complete tables of two states differ in total
    variation by δ_θ,n(ρ − σ) = 2⁻ⁿ Σ_h |Tr((ρ − σ)M_h)|. The record channel distance in diamond norm is twice
    that (Theorem 44.3).
  - Compatible differences fill the six-dimensional space L cut out by Tr H = Tr CH = Tr EH = 0, and every direction is
    realised by two strictly positive compatible states (Theorem 45.2). So Λ_N(θ) = sup ‖H‖₁/Δ_θ,N(H) does
    not depend on d (Theorem 45.3).
- **Depth three (IV §46–§47).**
  - H_T vanishes on every history of length at most two, and f_j1j2j3(H_T) = (−1)^(j2 + j3)(9/16) sin²(2θ). So
    Λ₀ = Λ₁ = Λ₂ = ∞ (Theorem 47.1).
  - A weighted parity inversion recovers all six coordinates at depth three, with det B = (81/512)s⁴ and an
    explicit Laurent inverse (Theorem 46.1).
  - 16(1 + √2)/(9s²) ≤ Λ₃ ≤ C₃/s² with C₃ < 557 (Theorems 46.2, 47.3). For θ ∈ (π/2)ℤ the direction H_Y is blind
    at every depth (Theorem 47.2). Each fixed depth also has Λ_N ≥ 1/(2N²a_θ²) (Theorem 47.4).
- **Symmetric square (IV §48–§51).**
  - Λ_∞ = inf over N of Λ_N (Theorem 48.1).
  - On Sym²ℂ³ the averaged conjugation T_θ acts on 36-dimensional operator space. The principal-angle cosines
    between the two rank-14 pinchings are 1 (three times), 5/8 (twice), 1/2 (six times), 1/4 (twice) and 1/8, so
    (I − Q) + (I − Q_U) ⪰ 3/8 off the fixed space (Theorem 49.2).
  - For s ≠ 0, Fix T_θ = span(Π₀, Π₁, Π₂) (Theorem 50.1), and κ_θ ≤ 1600/(3s²) (Theorem 50.2).
  - P_F A₀ = Π₀/4 + Π₁/4 + Π₂/12, the limiting second moment is ‖w‖²/4 + Tr B₂²/24 ≥ ‖H‖₂²/24, and
    Δ_θ,N(H) ≥ [1/32 − 800/((N + 1)s²)] ‖H‖₁ (Theorems 51.1–51.3).
- **Depth order (IV §52–§53).**
  - 4 ≤ Λ_∞ ≤ 32 for s ≠ 0. The Bloch recursion for H_Y gives q_(n+1) − q_n ≤ 3s², so Λ_N ≤ L forces
    N ≥ 16/(3L²s²); and N + 1 ≥ 51200/s² gives Λ_N ≤ 64 (Theorems 52.1, 52.2).
  - If two compatible candidates fit given tables within a combined error ε, then
    ‖S_ρ − S_σ‖_◇ ≤ Λ_N(θ) ε (Theorem 53.1).

一部约七分半钟的片子，AURIC 相容预测波系列的第二部：第三卷求出共同重建的最坏 diamond 风险，也就是包住相容 qutrit 后继态纤维 K_d 的最小迹范数球的半径。d 较小时两个纯世界决定一切，半径 2√(5d(1 − 5d)) 一直精确到 d* ≈ 0.07883，那里归一化源帽上的一个三次式出现唯一的二重根，两个带虚相干的混合接触随即打破这一支；从 d_high ≈ 0.281 到 d_b ≈ 0.874 是四纯接触的代数分支（d = 49/92 处半径恰为 28/23），d_b 以上是单下限模分支；只剩 d* 到 d_high 的窗口未决，其中 5/61 处的半径被夹在 0.9840437 与 0.985056 之间。随后是精确检验：虚纤维是椭球，每个实面上一个乘子给出四阶 LMI，最优下证书至多需要六对共轭接触，正性证书的次数有限却高得惊人。第四卷保留标签：完整记录的条件数 Λ_N 与 d 无关，深度二以内为无穷，深度三介于 4.29/s² 与 557/s² 之间，例外角度上永远看不见；对称平方给出 3/8 的主角间隙和 1600/(3s²) 的预解界，全历史条件数介于 4 与 32，而要达到它需要 1/s² 量级的深度。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-082-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit neither volume has digestion records (no atoms under
    `Meta/Digestion/backfill/auric-compatible-predictive-waves-and-relational-spectra-iii/` or `-iv/`).
  - Volume IV cites the frozen general theorem `continuationSpace_closure`
    (`D5/S3/Quantum/Measurement/ContinuationEffectClosure`) as a supply for the minimal invariant effect space of
    volume II. No statement shown in this film is covered by a frozen declaration.
- **Published results, used as external inputs.** The tests scene badges the Positivstellensatz bound and the
  matrix-level example as published and the S-lemma as classical; the finale lists all of them.
  - Channel representations and diamond-norm background: Watrous, *The Theory of Quantum Information*, chapters 2–3.
  - Convex duality, Slater, the single-constraint S-lemma: Boyd–Vandenberghe, *Convex Optimization*, §5 and
    Appendix B.2; subgradient rules: Boyd–Duchi–Pilanci–Vandenberghe, *Subgradients*.
  - Effective Positivstellensatz degree bound: Lombardi–Perrucci–Roy, arXiv:1404.2338.
  - Matrix-level inclusion and CP coefficients: Helton–Klep–McCullough, arXiv:1003.0908; Kellner–Theobald–Trabandt,
    arXiv:1308.5076; positive maps in low dimension: Horodecki–Horodecki–Horodecki, quant-ph/9605038.
  - Volume IV: D’Alessandro, quant-ph/0307127 (observability); Scott, quant-ph/0604049 (frames and second
    moments); Novotný–Alber–Jex, arXiv:0908.4534 (random-unitary fixed points).
- **Classical tools named in the volumes.** Spectral decomposition, Schur complements and Moore–Penrose ranges,
  Sturm and Descartes root counting, Carathéodory reduction, principal angles of two projections,
  Cauchy–Schwarz, trace-norm duality.
- **Project inputs, not recomputed here.** The complete fiber, its three extreme layers, the original-domain lifts
  and the channel-to-state reduction of the first volume (§§35–38); the gates, effects and exceptional
  classification of volume II (§§39–43).
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy, mpmath, scipy, cvxpy with
  Clarabel) runs 103 checks. Maxima over K_d are found by alternating ascent between a top eigenvector and an SDP
  over the fiber, from many starting points.
  - **Fiber and cubics.**
    - 300 random fiber points have explicit faithful lifts A + D with ran D in N and a†Aa = d.
    - The four pure contacts lie in K_d and average to M_d(u) (200 random d, u).
    - ‖H‖₁ = 2‖H‖_op on 2000 random traceless matrices.
    - The determinant test agrees with the inclusion on 4000 random pairs.
  - **Pure-pair branch and d\*.**
    - The cap identities (III.25.2) and (III.25.5) hold symbolically.
    - The double root is x* = 0.806586263604942, u* = 0.702320190733726, d* = 0.0788305745339707, inside the
      stated boxes. min over u of F_x(u) decreases in x with one sign change, and the factorisation (III.26.2)
      holds.
    - At d = 0.01, 0.03, 0.05, 0.065, 0.075 and d*, the maximum of λ_max(±(ρ − σ)) over K_d equals c to within
      2 × 10⁻⁷, the exact minimax over the pure pair is 2c, and min ρ_gg over K_d is 1 − 5d.
  - **Departure.**
    - ρ_R±(d) lies in R₊ for 40 values of d ≤ 1/10.
    - λ_max(ρ_R − σ) − c is negative below d*, zero at d* (−2 × 10⁻¹⁶) and positive above it.
    - The maximum over K_d exceeds c by 0.0194 at d = 0.085 and by 0.0746 at d = 0.1.
    - A 60-start search at d* finds only the four upper and two lower contacts.
  - **Branches.**
    - F₆ has one root in [0, 67/250] (Sturm count). d(2 − √3) = 2/7 exactly and r(2/7) = 1.231257.
    - x₀ = 0.1056882899 gives d_b = 0.8741249310. x† = 0.2694282698 gives d_high = 0.2812238606.
    - The 49/92 example holds in exact rational arithmetic: σ, c = 14/23, Z and Z M Z = (23/65) I.
    - At 7 middle and 4 large-branch values of d, the maximum over K_d equals c and the minimax over the four
      contacts is 2c. For example r(0.9) = 0.630417 and r(0.99) = 0.199992.
    - The admissible large-branch root is unique at 25 sampled d. The branches meet at d_b (0.35300685 against
      0.35300671 for c).
    - The largest radius on the solved range is 1.2630.
  - **Window.**
    - The mixed family (III.11.2) lies in R₊ for 60 values of d in (0, 2/7).
    - N₁, N₂ and all seven principal minors of κI − M are exact and positive. The first three equal (III.12.3).
    - L(5/61) = 0.9840437320731.
    - L(d) − 2√(5d(1 − 5d)) ≥ 3.07 × 10⁻⁴ > 1/5000 on a 401-point grid of [163/2000, 33/400].
    - The ten certificate matrices, parsed from the volume, are positive definite (smallest eigenvalue
      9.8 × 10⁻⁸). The residual coefficient norms fit the (III.13.7) table, and the total residuals are
      2.89 × 10⁻⁶ and 2.87 × 10⁻⁶, below 3 × 10⁻⁶.
    - The sampled maximum for that center is 0.4925206 against c = 0.4925280.
    - A cutting-plane minimax estimate gives r(5/61) ≈ 0.984044, inside the bracket.
  - **Tests.**
    - det(D + i cross(t)) = det D − tᵀDt holds symbolically, and the ellipsoid test agrees with positivity on
      3000 random (S, t).
    - 3^4096 has 1955 digits.
    - The matrix-level example has target eigenvalue 1 − √2. The (III.22.7) matrices are as stated.
    - Tr(H⁻¹ρ) > 1 at 2000 random rank-two upper contacts.
  - **Records and depth three.**
    - The H_T pattern holds at 40 random angles, ‖H_T‖₁ = 1 + √2, and H_Y is blind to depth 10 at θ ∈ (π/2)ℤ.
    - Δ has period π/2.
    - The depth-three relations and B hold on 30 random (θ, H), det B = 81s⁴/512, and the Laurent inverse gives
      B B⁻¹ = I. C₃ = 556.9747.
    - Optimised ratios give Λ₃ ≈ 800.6 at θ = π/48 falling to 11.3 at π/4, always between 4.29/s² and 557/s².
    - Δ_N(H_T) ≤ 2N²a²‖H_T‖₁ for N ≤ 10.
    - 200 random (d, H) are realised by strictly positive pairs.
  - **Symmetric square and depth.**
    - Sym²U matches (49.5). The cosines and characteristic roots are as stated, and the gap is 3/8 on the
      33-dimensional complement.
    - Fix T_θ has dimension 3 at 9 angles and 8 at θ = 0.
    - κ_θ runs from 1251.9 at θ = 0.02 to 2.73 at π/4, always below 1600/(3s²).
    - P_F A₀ has the stated coefficients. Q_n = Tr(H⁽²⁾T_θⁿ(A₀)) for n ≤ 8, and the Cesàro limit matches at
      N = 4000.
    - The Bloch recursion equals brute force over all histories for n ≤ 12, with q_n ≤ min(1, 3ns²) and
      Δ_N(H_Y) ≤ ½ min(1, √(3N)|s|).
    - Optimised ratios at θ = π/8 give Λ_N ≈ 30.6, 19.4, 16.7, 13.0, 10.6, 9.49, 8.60, 8.46, 8.32 and 8.29 for
      N = 3…12.
  - These are sampled and finite checks, not proofs of the general statements. The Λ and minimax estimates are
    numerical lower approximations, not values claimed by the volumes.
- **Data drawn on screen.**
  - the spectrum (0.4887, −0.0861, −0.4025) of a mixed contact minus the center at d*;
  - the Bloch positions of ψ± at d = 0.05;
  - the pure-pair radius curve with its six sampled maxima;
  - the F_x(u) curves for x = 0.795, x* and 0.818;
  - the excess curve of the mixed worlds on [0.06, 0.1];
  - the r(d) curve on the three solved ranges, with d*, d_high, d_b, 28/23, r(2/7) and the open window;
  - the 49/92 center matrix;
  - the 5/61 number line and both L(d) − 2√(5d(1 − 5d)) plots;
  - the f_h(H_T) bars at θ = π/8;
  - the Λ₃ estimates with both bounds;
  - the principal-angle cosines;
  - κ_θ with its bound;
  - q_n at θ = 0.05;
  - the Λ_N estimates at θ = π/8.
- **Illustrative visuals.** These are illustrations, not data:
  - the fiber-in-a-ball figure;
  - the contact diagram at d*;
  - the ellipsoid;
  - the six conjugate pairs;
  - the history tree;
  - the layout of the matrix H(x, y, b, t, u, v).

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
