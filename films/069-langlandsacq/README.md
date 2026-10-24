# 069 · AURIC–LANGLANDS I · STRUCTURE ACQUISITION · AURIC–Langlands 第一部：结构取得与谱延拓

This is the first film in the AURIC–Langlands series and runs about 5.8 minutes. It covers
`AURIC_LANGLANDS_STRUCTURE_ACQUISITION_AND_SPECTRAL_EXTENSION_THEORY.md` in trureturing (§2–§15), at subject commit
`0448ce2ba2`.

The AURIC Ω films asked what a fixed menu of controls and readouts can recover. This volume asks two further
questions: when acquiring structure really adds predictive power, and how the five-mode relation bundle meets a
spectral interface of Langlands type.

- **Residual growth (§2).**
  - A protocol that only recomputes from the old summary has output law K(q(x), ·), so it never refines an old fiber
    (Theorem 2.2).
  - A new readout A adds exactly the observable system on the old blind space N. The new blind space is
    K_A = N ∩ ⋂_w ker(A T_w), the largest common invariant subspace inside N ∩ ker A. The gain is
    Δ_A = dim N − dim K_A = dim M_∞ = dim M_{m−r}, so it stabilises after at most m − r layers (Theorem 2.4).
  - The exact sequence 0 → N/K_A → V/K_A → V/N → 0 need not split along the dynamics. A column-stochastic channel on
    three states, T = [[1, ½, 0], [0, ½, ½], [0, 0, ½]], is a counterexample (Theorem 2.5).
- **Capture and cost (§3).**
  - For a fixed readout catalog, the number of separated ordered pairs is monotone and submodular (Theorem 3.2).
    Equal-cost greedy selection therefore reaches [1 − (1 − 1/k)^k] OPT ≥ (1 − 1/e) OPT (Corollary 3.3).
  - Controls can be complementary. On four states with readout 1{3}, a = (0 2) and b = (2 3), the menus ∅, {a}, {b}
    and {a, b} capture 6, 6, 10 and 12 ordered pairs (Theorem 3.4).
  - Exact separation does not bound sample cost. Telling Bernoulli(½) from Bernoulli(½ + 2^−L) with error at most ⅓
    needs n ≥ log(13/9)/log(1 + 4ε²), which is Ω(4^L) samples (Theorem 3.5).
- **Two copies and a reference (§4–§5).**
  - With a designated real structure, real two-copy statistics record Re(ρ ⊗ ρ) = S⊗S − A⊗A. They determine any
    mixed state up to complex conjugation, and no number k ≥ 2 of copies does better (Theorem 4.2).
  - In five modes, the single-copy real summary has dimension 14 and the two-copy orbit quotient has dimension 24.
  - Independent preparation is necessary: the correlated source ½ρ⊗ρ + ½ρ̄⊗ρ̄ has the same real joint statistics, and
    with local real operations alone every probability depends on S (Proposition 4.3).
  - A calibrated reference σ = T + iB with B ≠ 0 recovers S = C_T(R)/‖T‖² and A = −C_B(R)/‖B‖² linearly
    (Theorem 5.1). Real sources and real instruments cannot produce such a reference (Theorem 5.2).
  - One phase qubit suffices: R(U) = X ⊗ I₂ + Y ⊗ J lies in SO(2d) and acts as U on ψ ⊗ r (Theorem 5.3). For
    ρ_a = I/5 + iaJ₁₂, two copies read 1/25 − a² and the reference reads 1/25 − ab (Example 5.4).
- **Quadratic splitting (§6, §15).**
  - The covariants σ = −½tr(AB), γ = −½(AB + BA) + tr(AB)I/5 and β = *(a_A ∧ a_B) give an SO(5)-equivariant surjection
    Sym²(so₅) ↠ 1 ⊕ W₁₄ ⊕ V₅ with a 35-dimensional kernel, 55 = 1 + 14 + 5 + 35 (Theorem 6.2).
  - The 55 real effects E = ½(I₂₅ + Y_ij ⊗ Y_kl) read tr(E ρ⊗ρ) = ½ + 2A_ij A_kl, so they give all of A⊙A
    (Proposition 6.3).
  - The three covariants do not replace the full tensor (Proposition 15.1). A = (J₁₂ + J₃₄)/10 and
    B = (J₁₃ − J₂₄)/10 give strictly positive states with spectrum {1/10, 1/10, 1/5, 3/10, 3/10} and identical
    q = (1/50, diag(1,1,1,1,−4)/500, e₅/50). Yet B ∉ {A, −A}, and the full tensor A⊙A separates them.
- **Hecke compatibility (§7).**
  - Glued over a curve, the splitting becomes a parallel splitting Sym²(ad E) ≅ 1 ⊕ W_E ⊕ V_E ⊕ K_E, with a rank-35
    kernel (Theorem 7.2).
  - With geometric Satake for Sp₄ (dual group SO₅) and unramified Hecke eigen-objects as external inputs
    (External Theorem 7.3), each covariant commutes with the eigen-isomorphisms (Theorem 7.4).
  - The chain is: real two-copy statistics → A⊙A → (1, 14, 5) → parallel local system → Hecke naturality. It is a
    conditional statement about morphisms. No functor from instruments to sheaves is constructed (§12.1).
- **Sphere and punctures (§8–§10).**
  - Each relation sphere has ∫ω = 2πw. The four parameter regions carry the primitive Chern vectors (−1, 0, 0),
    (0, −1, 0), (0, 1, 1) and (1, 0, 1).
  - The maximal flattenable torus quotient is T/λ_c(G_m), with character lattice c^⊥ (Theorem 8.1). A positive
    prequantum degree cannot be flat, and every flat SO₅ local system on the sphere is trivial (Theorem 8.3).
  - The controls A₁ = J₁₂ − J₄₅, A₂ = J₁₃ and A₃ = J₁₄ − J₂₅ generate so(5) (Lemma 9.2). With U_j = exp(π√2 A_j)
    they give a dense subgroup. The film draws them on the pyramid edges with the same index pairs as the three
    coloured flips of the earlier AURIC films; the volume states them only as matrices.
  - Setting ρ(γ₄) = (U₁U₂U₃)⁻¹ yields a Zariski-dense SO₅ local system on a four-punctured sphere (Theorem 9.3). No
    finite cover removes the irrational ramification (Theorem 9.4).
  - On a genus-three curve, ρ(a_j) = U_j and ρ(b_j) = I give a dense unramified system (Proposition 10.1).

一部约五分四十五秒的片子，AURIC–Langlands 系列的第一部：新读口增加的预测维数恰好由旧盲空间上的残余可观测系统给出，且一般不按动力学分裂；固定读口目录的捕获函数次模，控制菜单却可以互补；两份独立副本把任意混态确定到复共轭，一个校准的非实参考消除这一歧义；五模式的隐藏二次张量按 1 + 14 + 5 分裂，在外部 Satake 与几何朗兰兹输入下满足 Hecke 自然性；关系球面上的 Chern 向量排除无分歧的平坦稠密单值，四穿孔与属三曲线则给出稠密的 SO₅ 局部系统。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-069-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** These are frozen D5 declarations, and the digestion ledger records them as covering
  the corresponding sections. The scenes that state these results carry the Lean badge.
  - Theorem 4.2 and the five-mode dimensions:
    - `D5/S3/Quantum/Fibers/RealCopyConjugation.real_copy_classification`;
    - `RealCopyConjugation.five_mode_physical_image_dimension` (14);
    - `DensityConjugationGeometry.five_mode_nonreal_quotient_dimension` (24).
  - Theorem 3.2: `D5/S3/ConceptDynamics/DefinitionCapture/MeasureCapture.capture_weight_submodular`. This is a
    general form with an arbitrary capture weight.
  - Corollary 3.3: `D5/S3/Resource/SubmodularGreedyApproximation.greedy_gap_le_geometric`. This is the general greedy
    gap bound for normalized monotone submodular values.
- **Published results, used as external inputs.** The volume states their conditions and does not re-prove them. The
  Hecke scene badges them as published.
  - Geometric Satake: Mirković–Vilonen, arXiv:math/0401222.
  - Existence of unramified Hecke eigen-objects: Gaitsgory–Raskin, arXiv:2405.03599 and arXiv:2409.09856.
- **Classical tools.** These are named in the volume:
  - clutching and Chern–Weil (Hatcher, *Vector Bundles and K-Theory*);
  - regular-singular Riemann–Hilbert (Deligne, LNM 163);
  - Tannaka reconstruction (Deligne–Milne).
  - The volume also cites Hickey–Gour (arXiv:1801.05123) and Wu et al. (arXiv:2007.14847) on imaginarity.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following.
  - **Residual growth.**
    - On 300 random linear systems, Δ_A = dim M_∞ = dim M_{m−r}.
    - K_A, computed by brute force over all words, has dimension m − Δ_A and equals the largest common invariant
      subspace of N ∩ ker A.
    - The ladder drawn on screen is one of these systems (m = 6, r = 1, dims 1, 2, 3, 4, 5, 6, 6, 6).
  - **Non-split example.** For the three-state channel, the linear system for a dynamics-compatible section is
    inconsistent (least-squares residual 0.557).
  - **Capture.**
    - On 400 random catalogs, C is monotone and submodular.
    - Greedy selection always reaches [1 − (1 − 1/k)^k] OPT. The worst observed ratio is 0.889.
    - The control table gives 6, 6, 10, 12 by enumerating all words of length up to 6.
  - **Samples.** For L = 1, …, 8, the exact smallest n with total variation at least ⅓ (1, 3, 12, 48, 191, 796, 3091,
    12 694) always meets the bound (0.5, 1.6, 6.1, 23.7, 94.3, 376.7, 1506.4, 6025.0).
  - **Two copies.**
    - On 200 random density matrices of dimensions 2–5 and all ranks, Re(ρ⊗ρ) = S⊗S − A⊗A agrees for ρ and ρ̄.
    - The partial trace recovers S, and the statistics separate states outside the orbit.
    - The correlated source is a valid state with identical real statistics.
    - The stability bounds δ ≤ 2^{1/4} D^{1/2} and δ ≤ D/a₀ hold on 2000 random pairs.
  - **Reference.**
    - Contraction recovers S and A on 100 random pairs, and ‖B‖² ≤ ½ with equality at (1, i)/√2.
    - Real Kraus maps keep real states real.
    - R(U) ∈ SO(2d) and R(U)(ψ ⊗ r) = Uψ ⊗ r.
    - Example 5.4 gives 1/25 − a² and 1/25 − ab.
  - **Splitting.**
    - The map Ψ on the 55-dimensional Sym²(so₅) has rank 20 = 1 + 14 + 5 and a 35-dimensional kernel, and it is
      SO(5)-equivariant on 30 random rotations.
    - Θ ↦ (10, 0, 0), and *(a ∧ a) = 2λ₁λ₂e₅.
    - The 55 effects give ½ + 2A_ij A_kl.
  - **Collision.** The two states of Proposition 15.1 have the stated spectrum and the same q, and they have different
    full two-copy statistics.
  - **Sphere.**
    - The width w = κ₊ − κ₋ has gradient −c equal to the four tabulated Chern vectors.
    - Each c has a rank-2 orthogonal lattice.
  - **Punctures.**
    - A₁, A₂, A₃ generate all ten dimensions of so(5), with [A₂, [A₂, A₁]] = −J₁₂ and [A₂, [A₂, A₃]] = −J₁₄.
    - No power U_j^m with m ≤ 1000 is the identity or a scalar.
    - The generated group has trivial commutant in so(5) and only scalars in gl(5).
    - B = J₁₂ + 2J₃₄ has a 2-dimensional centralizer, and I/5 + iεB is positive exactly for |ε| < 1/10.
- **Data drawn on screen.**
  - The pair grid and its count.
  - The greedy bound curve.
  - The control capture bars.
  - The sample-bound plot.
  - The matrices S, A, B and Re(ρ⊗ρ).
  - The Example 5.4 curves.
  - The q bars of the collision.
  - The angles e^{imπ√2}.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid, the Ω ring and the spheres;
  - the fiber columns;
  - the 55-cell regrouping;
  - the stacked fibers over the curve;
  - the commutative square;
  - the puncture loops.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
