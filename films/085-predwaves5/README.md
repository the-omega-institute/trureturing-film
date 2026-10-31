# 085 · AURIC PREDICTIVE WAVES V · REFLECTED THRESHOLDS AND CERTIFIED GAPS · AURIC 相容预测波 第五部 · 反射阈值与认证间隙

This is the fifth and last film in the AURIC PREDICTIVE WAVES series and runs about 7½ minutes (7:30). It covers
`AURIC_COMPATIBLE_PREDICTIVE_WAVES_AND_RELATIONAL_SPECTRA_VII.md`, §122–§151, at subject commit `24d79207e4`.

Volume VI showed that one allowed source, with its single mixing control, recovers the retention γ and the hidden
return vector h from its raw laws, except for one reflected pair at zero retention. This volume keeps that source and
measures the recovery for every anchor in the closed ball: how far h can move at a given raw-law error, exactly when
the mirror image of the anchor enters, and whether the punctured (nonzero-retention) endpoint is reached there.

## The film, scene by scene

- **Reflected profile (§122).**
  - Write the anchor as h₀ = (a + iβ)e + v₀ with v₀ ⊥ e, A = |a| and η = ‖v₀‖. The scalar profile is
    q(r) = r(η + |r − 2A|) on [0, 2], and R(δ) is the largest r ∈ [0, 2] with q(r) ≤ δ.
  - R has three exact branches (Proposition 122.2): (η + 2A − √((η + 2A)² − 4δ))/2 for δ < 2Aη,
    (2A − η + √((η − 2A)² + 4δ))/2 for 2Aη ≤ δ < d_c, and 2 for δ ≥ d_c = 2(η + 2 − 2A).
  - At δ = 2Aη the value is 2A and the left limit is min{η, 2A}, so R jumps exactly when 0 < η < 2A. The example
    A = 1/2, η = 1/5 jumps from 0.2 to 1 at δ = 0.2 and reaches the cap 2 at δ = 2.4.
- **Two rescalings (§123).**
  - Both original moduli satisfy (1/√5) R(kε) ≤ ω_all(ε) ≤ ω(ε) ≤ R(Kε) for 0 < ε ≤ E, with source constants k, K,
    E that are uniform over every anchor in the closed ball, the sphere included (Theorem 123.1).
  - Below 2Aη/K the moduli grow linearly, between ℓkε/(η + 2A) and 2Kε/(η + 2A); above 2Aη/k they are comparable to
    T = min{2, A + ε/(η + √ε)} (Proposition 123.2). Only the window [2Aη/K, 2Aη/k] is left to the exact profile.
  - Axial anchors (η = 0, A > 0) have limit 2A as ε → 0 (Proposition 123.3). The on-screen band uses illustrative
    k = 1/2 and K = 2.
- **Actual threshold (§124).**
  - On the reflection side, μ_j is the smallest raw-law error with nonzero retention, for the finite decoder (j = f)
    and for all histories (j = a). It satisfies αAη ≤ μ_j ≤ βAη with α = c/(1 + 2/τ) and β = 2√2 C
    (Theorem 124.2). The reflected vector h♯ = −Ae + v₀ has Q(h♯; h₀) = 2√2 Aη.
  - Below μ_j the modulus is at most J₁ε/(cA) ≤ Lη; above μ_j it is at least A.
  - No family f_h₀(ε), continuous in ε, satisfies m f ≤ ω ≤ M f for all anchors at once, for either norm
    (Theorem 124.3). The anchors e/2 + ηₙ f with ηₙ → 0 have thresholds tending to zero while the jump stays ≥ 1/2.
- **Tangent norms (§125–§128).**
  - With alternatives −Ae + ηz and retention ηg, both raw errors equal η F_j(z, g) up to E η², where F_j is a convex,
    coercive supremum of affine rows in eight real variables (Lemma 125.2, Theorem 126.1).
  - m_j allows retention and n_j forbids it; both are attained, and |μ_j − η m_j|, |ν_j − η n_j| ≤ Eη² for small η
    (Theorem 126.3).
  - If δ_j = n_j − m_j ≥ Δ > 0, every compact minimiser has Δη/2L ≤ |γ| ≤ Gη, so the punctured endpoint is attained
    (Theorem 127.1).
  - A certificate suffices: signed rows with weights that cancel all six completion columns bound n_j from below, and
    one trial bounds m_j from above (Proposition 128.1, Chebyshev approximation and weak LP duality).
- **Label cutoff, torus and trichotomy (§129–§133).**
  - Each native label halves a row's weight, so the full-history error equals its restriction to histories with at most
    K_s = max{L_s, ⌈log₂(C/c)⌉} labels (Theorem 129.2). Runs of N are never damped (Lemma 129.3).
  - The closure of the powers of N is the torus cut out by their integer relations, so the full error is a finite
    maximum of polynomial maximisations and is semialgebraic (Theorem 130.2). The closure criterion is the frozen Lean
    theorem `D5.S3.Fourier.TorusOrbitClosure.result`; the torus picture shows powers of N_t at t = 1, whose closure is
    {z₁³ = 1} × S¹.
  - For small η exactly one endpoint type holds: I (no minimiser keeps retention), II (both kinds coexist) or III
    (every minimiser is punctured), with no infinite switching (Theorems 131.2, 132.1).
  - Positive retention radii grow like c η^q with rational q ≥ 1; in a tangent tie a positive nonlinear gap grows like
    d η^q with q ≥ 2 (Theorem 133.1).
- **Source reflection (§135–§138).**
  - With ε_N = dist_op(W, closure{ωNⁿ}), the full tangent gap satisfies 0 ≤ δ_a ≤ C_ref ε_N (Lemma 135.2,
    Theorem 136.1). If ε_N = 0, averaging (z, g) with (Wz, −g) gives m_a = n_a = min over z ⊥ e of F_a(z, 0), a
    four-variable problem (Reynolds averaging).
  - The family N = Π − 2uu† + σi ee†, u = cos χ ξ + e^(iφ) sin χ v₊, has N² = W, N⁴ = I and mixes, so its full
    tangent gap is zero (Proposition 137.1). The nonlinear gap is then only bounded by 2Eη² (Corollary 138.2).
- **Unreachable disk (§139–§141).**
  - (1 − λ)R_x + λJR_x is an actual residual exactly when γ = 0 and h = ±Ae + ηζf with |ζ| = 1, for every
    0 < λ ≤ 1 (Theorem 139.2).
  - Inside the disk the averages Y_ζ are mixtures of two actual laws but lie in no single-completion image. The decoded
    matrix M_ζ has determinant A²η²(1 − |ζ|²), so rank two, and δ_ζ/2B_H ≤ dist(Y_ζ, image) ≤ (b/2)δ_ζ with
    δ_ζ = η²(1 − |ζ|²) (Theorems 140.1, 140.2).
  - A concrete member: d = 1/2, θ = π/4, N = −(ξv₊† + v₊ξ†) + i ee†, f = (ξ + iv₊)/√2. Its nine prefix columns have
    determinant (11421 + 12960√6)/2⁴¹, and Tr P_ξ ρ₀ = 1/4 while Tr P_ξ Nρ₀N† = 7/16 (Proposition 141.1).
- **Order-three source (§142–§143).**
  - At d = 1/2, θ = π/4, N has eigenvalues e^(±2πi/3) and 1 (on e). The nine columns have determinant
    (34263 + 45684√2 + 103680√3 + 38880√6)/2⁴³, and the 117 rows of length at most two have rank 34 with kernel
    {(xI, −xI, iyI)}, so the decoder length is 2 (Theorem 142.2).
  - Seven signed rows give n_f ≥ 163/4000; a rational complex trial keeps all 117 residuals below 813/20000; so
    δ_f ≥ 1/10000 (Theorems 143.2, 143.3).
- **Type III (§134, §144–§146).**
  - All constants are explicit (Theorem 144.2). On 0 < η ≤ η₀, ν_f − μ_f ≥ η/20000 and every compact minimiser has
    a₋η ≤ |γ| ≤ a₊η: the finite endpoint is type III, and ω(μ_f) ≥ 1/2 (Theorem 145.1).
  - Since N³ = I, every history reduces to 777 histories with at most three labels (the finite-order reduction of
    Corollary 134.1), with a tail damped by 2^(−k). Then n_a > 189/4096, m_a < 23/512 and δ_a > 5/4096, so
    ν_a − μ_a ≥ 3η/8192 and the full-history endpoint is type III as well (Theorems 146.2–146.4).
- **Phase jump (§147–§151).**
  - N_t = N₀Π + e^(it)P is an allowed source for |t| ≤ ρ (Theorem 147.2), with uniform constants (Theorem 148.2).
  - The finite gap stays δ_f,t ≥ 1/20000 for |t| ≤ ρ_f (Theorem 149.1), but the full gap is at most (3/2)C_ref,*|t|,
    and it vanishes at t = ±π/3q, where 3q calls of N_t equal W exactly; at t = 0 it exceeds 3/4096 (Theorem 150.1).
  - So the optimised full threshold jumps: μ_a,t(η) − μ_a,0(η) ≥ 3η/8192 for small nonzero t, and one fixed pair of
    hypotheses already shows the same jump (Theorems 151.1, 151.2).

本片是 AURIC 相容预测波系列的第五部，也是最后一部。第七卷固定第六卷的许可源，对闭球内每个锚点度量返回补全的恢复：标量轮廓
q(r) = r(η + |r − 2A|) 的最大反函数 R(δ) 在 δ = 2Aη 处从 η 跳到 2A；两个原始模被 (1/√5)R(kε) 与 R(Kε) 一致夹住；反射一侧的实际阈值
满足 αAη ≤ μ ≤ βAη，且没有关于误差连续的函数族能同时刻画所有锚点。在 η 尺度上，两个阈值由八变量凸范数的最小值 m、n 给出，
严格间隙迫使极小点被打孔；带符号行与试探点构成可检验证书。全历史误差截断到至多 K 个标签，幂的闭包是环面，端点类型最终只有三种。
源自身的反射 W 在幂闭包内时间隙闭合（四阶族 N² = W）；镜像平均在圆盘内部不可由任何单一补全实现。三阶源给出有限间隙 ≥ 1/10000
与全历史间隙 > 5/4096，两者都是第三类；在相位 N_t 下有限间隙稳健，全间隙在 t = ±π/3q 处为零，优化后的全阈值发生跳跃。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-085-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.**
  - At the subject commit this volume has 63 digestion atoms, all residual-open. No statement of volume VII is covered
    by a frozen declaration.
  - One input is: the torus orbit-closure criterion used in §130 and §135 is `D5.S3.Fourier.TorusOrbitClosure.result`,
    whose state file `Golden/Frozen/state/D5/S3/Fourier/TorusOrbitClosure.lean.json` exists at `24d79207e4`. The
    film gives the lean badge only while that closure is spoken (label-cutoff scene and finale).
- **Published results, used as external inputs.** The finale badges them as published.
  - Observability pairing: D'Alessandro, arXiv:quant-ph/0307127, §2, Theorem 1.
  - Rank-one lifting for phase retrieval: Balan–Zou, arXiv:1506.02092, §2.2; Candès–Strohmer–Voroninski (PhaseLift),
    arXiv:1109.4499, §§1.1–1.3.
  - Chebyshev approximation and weak LP duality: Boyd–Vandenberghe, *Convex Optimization*, §6.1.1 and Exercise 5.6;
    Sukhorukova–Ugon–Yost, arXiv:1510.06076.
  - Kronecker closure of powers: Ouaknine–Worrell, arXiv:1309.1914, Proposition 2, Theorems 3.2 and 3.4.
  - Real algebraic geometry: Basu, arXiv:1409.1534, Theorem 2.1; Guo–Kim–Jiao–Pham, arXiv:2004.12315, §2.1; the
    growth dichotomy of Duan–Jiao–Wu–Zhou, arXiv:2109.07304, Lemma 2.2.
  - Symmetry (Reynolds) averaging: Gatermann–Parrilo, arXiv:math/0211450, Theorem 3.3.
  - The volume also compares with Abbott et al. (arXiv:1810.09826), Gao–Sun–Wang–Xu (arXiv:1608.06117) and Zhuang
    (doi:10.1186/s13660-019-1968-z), but does not use them as inputs.
- **Project inputs from other volumes, not recomputed as theorems.**
  - Volume VI: the allowed source (Definition 114.1), the full-completion realisation (Theorem 106.3), the finite
    decoder (Proposition 118.2) and comparison constants c, C (Theorem 118.3), the zero-law alternatives
    (Proposition 120.2), the off-axis inversion (120.15) and the restricted-family modulus (Theorem 121.2).
  - Volume V §§91–93: the sole preparation, the eight native prefix columns and the mixing ninth column.
- **Theory volume, argued but not kernel-checked.** Every scene is badged as theory, apart from the classical
  certificate tool, the averaging step and the Lean-frozen closure criterion noted above.
- **Recomputed for this film.** An independent Python script (numpy, scipy/HiGHS, mpmath) runs 43 checks.
  - **Profile.** Formula (122.6) against brute force on 300 random (A, η, δ); entry value, left limit and cap on 2000
    cases; the bounds (123.8), (123.10), (123.11) on 20000 samples. For A = 1/2, η = 1/5: d_b = 0.2, d_c = 2.4,
    left limit 0.2.
  - **Ball geometry.** Lemma 122.3, the witness of Lemma 122.4, the inversion (124.6) and Q(h♯; h₀) = 2√2 Aη, on
    20000 random pairs.
  - **Order-four family.** N² = W, N⁴ = I, the formula for Nξ and mixing for 200 random (χ, φ, σ). On the §141
    member, the row symmetry ℓ_w(Wz, −g) = −ℓ_(wN²)(z, g) holds exactly, and the LP over 292 histories closed under
    appending N² gives m = n = 0.051422, also equal to the minimum over z ⊥ e.
  - **Disk.** On actual rows of the §141 member: boundary residuals are J-fixed, the mixture identity (140.5) holds to
    10⁻¹⁷, and the virtual-minus-physical rows lie in [0, bδ_ζ/2]. M_ζ: determinant, λ₋ and λ₋ ≥ δ_ζ/2 on 3000
    samples. The §141 determinant (11421 + 12960√6)/2⁴¹ ≈ 1.963 × 10⁻⁸ and the traces 1/4, 7/16.
  - **Order-three source.** The determinant ≈ 4.248 × 10⁻⁸; Tr P_ξ r₉ = (25 + 12√2)/64; ‖D‖ = √34/8; the 117 × 36
    row matrix has rank 34 with the stated kernel; the exact mod-97 elimination reproduces all 34 pivot residues of
    (142.8), with product 3.
  - **Finite certificate.** The eight determinants lie in the stated enclosures; the weights are 0.0281, 0.2452,
    0.0604, 0.2707, 0.1417, 0.1673, 0.0866 and give Σλc = 0.0407536 > 163/4000. All 117 residual quadruples of
    (143.10) are reproduced (maximum deviation 3.5 × 10⁻¹⁷), with max |ℓ| = 0.0406479. The LP optima are
    n_f = 0.0407536 and m_f = 0.0406479, a gap of 1.057 × 10⁻⁴.
  - **Constants.** From (144.1): Λ ≈ 1.896 × 10⁴, c ≈ 2.53 × 10⁻⁹, C ≈ 1.034 and η₀ = 1/(40000E) ≈ 2.84 × 10⁻³³.
  - **Full-history certificate.** 3 + 18 + 108 + 648 = 777 reduced histories; the eight determinants lie in the stated
    intervals; Σλc = 0.0462121 > 189/4096; trial maxima 0.044849, 0.044849, 0.038786 and 0.023268 for k = 0…3;
    T* = 0.3604 < 3/8; a sample of k = 4 rows stays below T*/16. LP over the 777 histories: n = 0.0462121,
    m = 0.0448491.
  - **Phase.** N_t is unitary with N_t P = e^(it)P; |e^(3iq(t)t) + 1| ≤ 1.5|t| on 10000 phases; N_t^(3q) = W at
    t = ±π/3q for q = 1…6; χ(0) = (9 + 12√2)/64. The finite tangent gap δ_f,t, solved as an LP at 13 phases with
    |t| ≤ 0.06, lies between 1.06 × 10⁻⁴ (at t = 0) and 1.38 × 10⁻³.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The curves q(r) and R(δ) for A = 1/2, η = 1/5, and the enclosure band built from the exact R.
  - The torus points of powers of N_t at t = 1.
  - The m = n bars of the order-four member, and the λ₋ and δ_ζ curves for A = 1/2, η = 0.3.
  - The seven certificate weights and the 117 trial residuals.
  - The per-label maxima at the full-history trial and the tail bars 2^(−k)T*.
  - The δ_f,t curve and the curve |e^(3iq(t)t) + 1| with its zeros at π/3q.
- **Illustrative visuals.** These are illustrations, not data:
  - the emblem ring with its mirror and reflected pair;
  - the ball diagrams with the anchor, the reflected vector and the shaded reflection side;
  - the schematic modulus steps and the family of steps with shrinking thresholds;
  - the zoom diagram and the retention disk;
  - the schematic parabola for m and n;
  - the label-weight bars and the run of N cells;
  - the three type cards;
  - the mirror diagram with level sets;
  - the eigenvalue circles;
  - the ζ-disk shading;
  - the threshold and retention wedges in the type III scene;
  - the phase diagram with its dial.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
