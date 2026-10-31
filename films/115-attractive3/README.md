# 115 · FIB-NATIVE ATTRACTIVE BOUNDARY III · PHASE-ALIGNED GLUING, ZERO MODES AND COMPATIBILITY · FIB 原生吸引边界响应 第三部 · 相位对齐粘合、零模与相容校正

This is the third and last film of the FIB-NATIVE ATTRACTIVE BOUNDARY series (films 113 and 114 cover the main
volume and its Green-tail continuation). It runs about 6½ minutes and covers
`FIB_NATIVE_ATTRACTIVE_BOUNDARY_RESPONSE_GLUING.md`, §31–§35 (Definitions 31.1–35.3, Theorems 31.4 and 33.3–34.4,
Corollary 32.1, Propositions 35.2–35.5, Problems 32.2 and 33.4, Remark 35.6), at subject commit `17f005fa59`.
The volume has no numerical examples, so the film fixes one sample, n = 2 and g = 8, and every sample number on
screen is recomputed for that choice.

## The film, scene by scene

- **Native setup (§31, Definition 31.1).**
  - Everything stays native: ε = 1, the fields U = ∂x − (y/2)∂z, V = ∂y + (x/2)∂z, Z = ∂z, the full source P,
    raw Lebesgue measure, and the complete complex Friedrichs operator A of
    q(u, v) = Σ ⟨Xu, Xv⟩ − g ∫ P u v̄ dξ on the free closure H₁, pole included.
  - In gauge coordinates R = ((x² + y²)² + 16z²)^(1/4), ℓ = log R, the exact mass identity is
    4‖f‖² = ∫ e^(2ℓ) ‖w_f(ℓ)‖²_(L²(da)) dℓ (31.6).
  - Far out, P = e^(−2ℓ)(q_n(a)/2π + B_n) with ‖B_n‖_∞ ≤ C e^(−2ℓ) (31.7).
  - Sample: n = 2, where q₂(a) = (2/π) a / sin a, μ₂ = 0.833117 and λ₂ = 2πμ₂ = 5.23463. For g = 8,
    δ = g/2π − μ₂ = 0.44012 lies below min(1, η/2, γ/2) = 0.87137, so g is inside the isolation window that the
    proof of part two's Lemma 24.2 builds.
- **Two waves and one phase (Definitions 31.2–31.3).**
  - Part two supplies the core solution f₀, through the pole, with slices tending to 2 Re(b e^(isℓ)) ψ, and the
    exterior family F_E, tending to 2 Re(β e^(is(ℓ − T_E))) ψ with T_E = ½ log(1/E) and |β| = 1 (31.8)–(31.10).
  - With T_j = (θ_β − θ_b + πj)/s and c_j = (−1)^j |b|, one has c_j β e^(−isT_j) = b exactly (31.17), and
    E_j = e^(−2T_j) = D_align e^(−j/L) (31.11). D_align aligns the leading waves only.
  - Sample: s = 0.744263 and L = s/2π = 0.118453, so one rung of the ladder is e^(−1/L) = 2.156 × 10⁻⁴.
- **Gluing (Theorem 31.4).**
  - h_j = χ_j f₀ + (1 − χ_j) c_j F_(E_j) is nonzero and lies in the native D(A) for every large j, with
    ‖h_j‖₂ ≥ c_* E_j^(−1/2) (31.14).
  - The residual is exact: (A + E_j) h_j = E_j χ_j f₀ − 2 Σ (Xχ_j)(X d_j) − Σ (X²χ_j) d_j, with both commutator sums
    on M_j ≤ ℓ ≤ M_j + 1 (31.15).
  - ‖(A + E_j) h_j‖ / (E_j ‖h_j‖) ≤ C_*(e^(M_j − T_j) + e^(T_j − M_j) Δ_j), with the slice mismatch Δ_j → 0 (31.16).
- **All-level rate (§32).**
  - With M_j = θT_j, 0 < θ < 1, the residual over the norm is o(E_j^((1+θ)/2)) at every large level, without a
    subsequence; θ = ½ gives o(E_j^(3/4)) (Corollary 32.1).
  - The exponent is below 1, so this is not a relative o(E_j) error and locates no eigenvalue. Δ_j = o(e^(M_j − T_j))
    would suffice but is not established. Whether ½ log(1/ε_j) − j/2L has a limit is open (Problem 32.2, (32.4)).
- **Fixed cutoff and the cokernel pairing (§33, Theorem 33.3).**
  - U_E = η F_E ∈ D(A) ∩ H_d, (A + E) U_E = C_E on a fixed annulus, E‖U_E‖² ≤ C, and the Agmon bound
    E ∫_(R ≥ 2r_E) e^(2α√E (R − 2r_E)) |F_E|² dξ ≤ C (33.7)–(33.8).
  - The sector cokernel is Z = K ⊕ ℂ f₀ with dim Z = dim K + 1 (33.3). ⟨C_E, z⟩ = E⟨U_E, z⟩ on Z (33.10);
    |⟨C_E, v⟩| ≤ C e^(−dT)‖v‖_(H_d) on K; ⟨C_E, f₀⟩ = −s Im(β̄ b e^(isT)) + O(e^(−d′T)) (33.11), whose sine
    vanishes on the aligned ladder, giving O(E_j^(d′/2)) (33.12).
- **Slow tails and zero modes (Theorem 34.2).**
  - Each v in K has w_v = Σ_(ν ∈ Σ) e^(−νℓ) A_ν(v) + r_v with Σ = {ν ∈ (0, 1] : ν² in the spectrum of K_g} and a
    remainder with full weighted graph control (34.4)–(34.5).
  - The true zero modes are N = K ∩ L² = ker(A_ν)_ν (34.7). A slow tail with ν < 1 has ball mass
    ~ e^((2−2ν)T)/(4(2−2ν)); at ν = 1 it grows like T/4 (34.8). The IMS identity
    Γ(R) = cos a + 4 sin²a / R² (34.11) is shown.
  - Sample: the even spectrum of K_g is −0.5539, 22.07, 77.61, 165.3, 285.1, so the lowest positive exponent is
    ν₁ = 4.698 > 1, Σ is empty and K = N.
- **Gram blocks and the wall mass (Theorems 34.3–34.4).**
  - Truncated at radius e^T and rescaled by 1, e^((1−ν_i)T) or √T, the mass matrix converges to
    diag(G_N, G_pow, G_log), each nonempty block positive definite, with
    G_pow,ij = ¼ ⟨a_i, a_j⟩ ∫₀² χ² r^(1−ν_i−ν_j) dr (34.16).
  - ‖Π_N U_E‖ = o(E^(−1/2)), and E‖U_E^⊥‖² → m_W = ¼ ∫ e^(2x) ‖W(x)‖² dx > 0 (34.17)–(34.18).
- **Finite corrector (§35, Propositions 35.2–35.5).**
  - E^(−ν/2)⟨C_E, v⟩ → J_ν(A_ν(v)) with the wall moment J_ν(α) = ¼ ∫ e^((2−ν)x) ⟨W(x), α⟩ dx (35.6)–(35.7).
  - Inverting the finite mass matrix gives a compactly supported h_E ∈ D(A) with ‖h_E‖ = O(E^(−1/2)) and
    E⟨h_E, v⟩ = −⟨C_E, v⟩ for every v in K (35.15); the residual R_E = (A + E)(U_E + h_E) is orthogonal to K (35.16).
  - E‖U_E + h_E‖² → m_corr > m_W/2, ⟨R_E, f₀⟩ = Re(bΛ e^(isT)) + o(1) with Λ = isβ̄ + J_H, and on the ladder
    D_comp e^(−j/L) every pairing with Z tends to zero (35.20)–(35.22).
  - Sample: Σ = ∅ gives H = 0 and J_H = 0, so Λ = isβ̄ and, for matching argument choices, D_comp = D_align.
- **The open target (Problem 33.4, Remark 35.6).**
  - Still missing: ‖R_E‖₂ = o(√E), control of C_E on the fixed inner annulus, and an effective Schur complement of
    A + E with its inverse.
  - Open: on one fixed ladder E_j = D e^(−j/L), nonzero u_j ∈ D(A) with ‖(A + E_j)u_j‖ / (E_j‖u_j‖) → 0 at every large
    level, for every n ≥ 2 and every g in the isolation interval, with no interval shrunk, no subsequence and no
    resonance excluded.

一部约六分半钟的片子，FIB 原生吸引边界响应系列的第三部，也是最后一部：在原生算子域内，把第二部给出的核心解 f₀ 与外部解族 F_E 按相位对齐后粘合；对齐使 c_j β e^(−isT_j) 恰好等于 b，能量构成阶梯 D_align e^(−j/L)；粘合向量非零、属于原生域，残差与范数之比为 o(E_j^(3/4))，但还不是相对 o(E_j)；固定内截断后，残差与扇区余核 Z = K ⊕ ℂ f₀ 的配对在阶梯上趋于零；K 的元素按慢尾 e^(−νℓ) 分类，真零模恰是没有慢尾的那些；截断质量矩阵收敛到三个正定块，外部向量投影掉真零模后保留严格为正的壁质量 m_W；有限相容校正项精确消去与 K 的全部配对；最后，范数估计 ‖R_E‖ = o(√E) 与原目标仍未解决。片中取样例 n = 2、g = 8，λ₂ = 5.2346、s = 0.74426、L = 0.11845，最小正角指数 4.698 大于 1，所以慢集合为空。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-115-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the gluing volume has 21 digestion atoms, all residual-open.
  - No Lean declaration covers any statement shown.
  - The volume names mathlib's FredholmAlternative and the frozen repository module
    `D5/S3/Analytic/Isolation/PositiveFredholmLimitZeros.lean` (its state file exists at the subject commit) only to
    say that neither supplies the missing low-energy inverse; the film does not use them.
- **Classical tools named in the volume.** The finale badges them as classical.
  - The first representation theorem for closed forms (Kato, *Perturbation Theory for Linear Operators*, VI.2).
  - The product rule, compact energy test and Caccioppoli absorption (Evans, *Partial Differential Equations*,
    Chapters 5–6).
  - Agmon truncated weights (Agmon, *Lectures on Exponential Decay of Solutions of Second-Order Elliptic Equations*,
    DOI 10.1515/9781400853076).
  - Riesz representation and adjoint coercive forms (Folland, *Real Analysis*, Chapter 5); finite positive-definite
    inversion, Cauchy–Schwarz and the AM–GM step.
  - Guillarmou–Hassell (Ann. Inst. Fourier 59(4), 1553–1610, DOI 10.5802/aif.2471) is named in the volume as a related
    method only; its hypotheses are not matched and it is not used.
- **Project inputs, not recomputed here.** These come from the earlier parts and are badged as theory:
  - part one, Definition 18.1 and its analytic suppliers;
  - part two, Lemma 24.2, Proposition 24.3, Theorem 26.2 (f₀ and b), the coupled wall W of §28 and Theorem 30.6 (F_E,
    β and the double-limit traces).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory; the last step
  is badged as open.
- **Recomputed for this film.** An independent Python script checks the following for the sample n = 2, g = 8.
  - **Angular data.**
    - q₂(a) = (2/π) a / sin a agrees with the integral definition of q_n at five points; it runs from 2/π to 1.
    - μ₂ = 0.833117 (Legendre-in-a Galerkin; P1 finite elements with natural endpoints agree to 3 × 10⁻⁶), so
      λ₂ = 5.23463.
    - The second eigenvalue of B = A − μ₂Q₂ in L²(da) is γ = 2.72794. The bottom over all nonzero modes and real σ is
      η = 1.74275, attained at m = ±1, σ = 0 (finite elements 1.7430).
    - g = 8 gives δ = 0.44012 < 0.87137 = min(1, η/2, γ/2), so the lemma's construction allows λ₂ < g < 10.7096.
    - s = 0.744263 and L = 0.118453. The m = 0 pencil bottom is negative exactly for |σ| < s on an 81-point grid,
      the odd sector has no negative eigenvalue, and the nonzero modes stay above 1.4346 at g = 8.
    - ψ is positive and even with C[ψ] = 1, ψ(0) = 0.6749, ψ(±π/2) = 0.8570 and m_ψ = ‖ψ‖²_(L²(da)) = 1.6908.
    - The even spectrum of K_g is −0.5539, 22.07, 77.61, 165.3, 285.1, so ν₁ = 4.698 and Σ is empty.
  - **Gauge coordinates.** R(δ_(e^ℓ) ω) = e^ℓ and the Jacobian ¼ e^(4ℓ) (sympy); Γ(R) = cos a + 4 sin²a / R² at six
    random points; U, V lower the dilation degree by 1 and Z by 2; the mass identity on a Gaussian gives 4.54652 on
    both sides.
  - **Alignment.** c_j β e^(−isT_j) = b, E_j = D_align e^(−j/L) and equality of the two leading waves, for five random
    (b, β) and j = −3…11. One rung is e^(−1/L) = 2.156 × 10⁻⁴ ≈ 1/4639 and T_(j+1) − T_j = π/s = 4.2211.
  - **Gluing estimates.** One period of the squared leading wave carries 2 m_ψ p = 14.274; ‖u + v‖² ≥ ½‖u‖² − ‖v‖²
    and 2√Δ ≤ e^(M−T) + e^(T−M)Δ on 20,000 random samples each, with the minimum at M − T = ½ log Δ.
  - **Rate.** E·(31.16)/E^((1+θ)/2) = C(e^(−2(1−θ)T) + Δ) with M = θT (sympy). On the sample ladder with D = 1,
    E_j^(−1/4) = 8.3, 68.1, 562 and 4639 for j = 1…4.
  - **Pairing.** The flux C(G_β, G_ζ′) − C(G_β′, G_ζ) = −4s Im(β̄ζ) with the sample ψ; the sine
    −s Im(β̄ b e^(isT)) vanishes at every T_j; with J_H = 0, T_* = (θ_β − θ_b)/s, so D_comp = D_align; for random
    Λ, Re(bΛ e^(isT_j)) = 0 on T_* + πj/s.
  - **Tails and Gram.** The ball-mass asymptotics for ν = 0.3, 0.5, 0.8 and ν = 1; the sample tail mass tends to
    1/(4(2ν₁ − 2)) = 0.0338. For illustrative exponents ν = ¼, ½, ¾ with equal angular vectors the power block has
    eigenvalues 0.0010, 0.0581 and 1.1632, the normalized truncated mass matches it at T = 12 and 20, and the critical
    block tends to ¼.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The q₂ curve and the ψ profile.
  - The ladder rungs log₁₀ E_j (sample L, illustrative D_align = 0.0398).
  - The AM–GM curves for Δ = 10⁻² and 10⁻⁴.
  - The E_j^(−1/4) bars.
  - The pairing sine with its zeros (sample s, illustrative phases b = 0.8 e^(0.9i), β = e^(2.1i)).
  - The ball-mass curves for ν = ½, 1 and 4.698, and the ν number line.
  - The illustrative Gram matrix and its eigenvalues.
- **Illustrative visuals.** These are illustrations, not data:
  - the glued-wave icon;
  - the nested gauge spheres;
  - the core and exterior wave plot (sample s, illustrative phases);
  - the gluing profile with its cutoff, strip and wall;
  - the fixed-cutoff profile with its annulus and Agmon weight;
  - the Z = K ⊕ ℂ f₀ boxes;
  - the slow-tail curves for illustrative ν;
  - the block matrix and the M d = −B cells;
  - the projection picture;
  - the established and missing ledger.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
