# 091 · AURIC V21–V22 · STATIC HISTORIES AND OBSERVATION QUOTIENTS · AURIC V21–V22 · 静态历史与观察商

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:28). It covers two volumes of
trureturing at subject commit `1bccf3c8c5`:
- `AURIC_STATIC_QUANTUM_HISTORIES_ENDOGENOUS_OBSERVERS_AND_RELATIONAL_CLOCKS_V21.md`, §2–§10;
- `AURIC_RELATIVE_GATE_HISTORIES_OBSERVATION_QUOTIENTS_AND_RECURSIVE_CLOSURE_V22.md`, §2–§10.

Version twenty-one places the observer inside one fixed quantum history: three compatible readouts, a basis that is
itself a program, records that grow by isometries, weighted history states and clocks that are relations between
records. Version twenty-two describes readouts by relative gates between histories and asks which quotients of that
description still support recursive prediction. Complex Hilbert spaces, the Born rule, the stated instruments and
the stated gate menus are inputs throughout.

## The film, scene by scene

- **Five atoms (V21 §2).**
  - On H₅ = ℂ⁵ with modes 0, 1, 2, 3, 13 (000, 100, 010, 001, 101): N₁ = Π₁ + Π₁₃, N₂ = Π₂, N₃ = Π₃ + Π₁₃
    (Definition 2.1).
  - Commuting projections x, y, z with xy = yz = 0 generate the algebra spanned by I, x, y, z, xz. Its atoms are
    E₀ = I − x − y − z + xz, E₁ = x − xz, E₂ = y, E₃ = z − xz and E₁₃ = xz, here the rank-one Π_s (Theorem 2.2).
    The five response vectors are distinct, so a complete record identifies the mode, and their convex hull is a
    square pyramid.
  - With X = Tr ρN₁, Y = Tr ρN₃, Z = Tr ρN₂ and R = 1 − Z, the compatible populations are
    p_κ = (R − X − Y + κ, X − κ, Z, Y − κ, κ) with max(0, X + Y − R) ≤ κ ≤ min(X, Y) and κ = Tr(ρN₁N₃). No diagonal
    reading sees the mode coherences (Proposition 2.3). On screen X = Y = 0.3, Z = 0.2, so κ ∈ [0, 0.3].
- **Order and the golden gate (V21 §3).**
  - For orthogonal projections, order-independent affirmative probabilities for every input ⇔ PQP = QPQ ⇔
    [P, Q] = 0 ⇔ all labelled Lüders branch maps are order-free (Theorem 3.2).
  - Averages hide order: both compositions of Z and X dephasing give I/2, while from |0⟩ the labelled records give
    1/2 for Z+ then X+ and 1/4 for X+ then Z+.
  - With K = ω[I + (ω − 1)𝒫], ω = e^(3πi/5), P = N₂ and Q = K†PK: Tr PQ = φ⁻², ‖[P, Q]‖ = φ^(−3/2). From |010⟩,
    p(P → Q) = φ⁻² and p(Q → P) = φ⁻⁴, a difference of φ⁻³ (Proposition 3.4). Q is realised by K, a reading of P,
    then K† = K⁹ on both branches.
- **Basis as a program (V21 §4).**
  - With W = Σ_b |b⟩⟨b| ⊗ U_b, the readouts Ñᵢ = W(I ⊗ Nᵢ)W† commute for every program state, coherent or entangled
    with the data, and the full record map is an isometry (Theorem 4.2).
  - Independently approximated bases only give ‖[VᵢNᵢVᵢ†, VⱼNⱼVⱼ†]‖ ≤ 4‖Vᵢ − Vⱼ‖ (Corollary 4.3).
  - A maximally mixed bit read twice in a Z or X basis chosen with probability 1/2: reusing the choice gives two
    affirmatives with probability 1/2, redrawing gives (1/2)(1/2) + (1/2)(1/4) = 3/8 (§4, after Proposition 4.4).
  - With a fixed processor, pointer and labels and no program-dependent post-processing, distinct exact sharp
    programs are orthogonal (Theorem 4.6).
- **Static histories and clocks (V21 §5–§7).**
  - T_t(|h⟩ ⊗ ψ) = Σₐ |ha⟩ ⊗ M_(a|h)ψ is an isometry (Theorem 5.2). A direct limit holds the recursion as one vector Ψ
    (Theorem 5.5), and compatible effects E_n = T_n†E_(n+1)T_n have constant expectation, so change has to come from
    different slice effects (Proposition 5.6).
  - With weights π_t > 0, J_π is an isometry, H_π = Σ a_t D_t†D_t ≥ 0 and ker H_π = im J_π; the clock probabilities
    of J_πψ are π_t (Theorem 6.1).
  - A coarse clock leaves a mixture that is pure only for collinear fibres (Theorem 7.2). A global clock potential
    exists iff the increments around every closed walk sum to zero, and a diamond DAG can fail this
    (Proposition 7.4). K¹⁰ = I, but on a counting clock (S ⊗ K)¹⁰ = S¹⁰ ⊗ I ≠ I (Proposition 7.3).
- **Residual and interference (V21 §8).**
  - For unitary paths A, B: min_z (‖z − Aψ‖² + ‖z − Bψ‖²) = ½‖(A − B)ψ‖² = 1 − Re⟨ψ, A†Bψ⟩ = 2p₋, attained at
    (A + B)ψ/2, where p₋ is the dark-port probability of the path interferometer. With ‖z‖ = 1 the minimum is
    4(1 − √(1 − p₋)) (Theorem 8.2).
  - A = e^(iθ)B gives the same data ray but p₋ = sin²(θ/2).
  - For two disjoint weighted paths the residual is k_A k_B/(k_A + k_B) · ‖(A − B)ψ‖²; a diamond of unit edges gives
    p₋ (Proposition 8.4).
- **Six numbers (V21 §9–§10).**
  - For the native K at one address, its powers and the five-mode Lüders reading with feedback, the future-effect
    closure is W_∞ = Herm(H₀,₂) ⊕ ℝΠ₁ ⊕ ℝΠ₃ ⊕ ℝΠ₁₃, of dimension 7, so the minimal affine predictive summary over all
    states is six numbers, for example (X, Y, Z, κ, Re ρ₀₂, Im ρ₀₂) (Theorems 9.2 and 9.3).
  - Allowing every basis change on H₅ gives W_∞ = Herm₅ and a summary of 24 (Corollary 9.4).
  - Since K¹⁰ = I, no real function decreases strictly under K (Proposition 10.2). A unitary that keeps all three
    readings for every input is diagonal, so such gates are never dense in SU(5) (Proposition 10.3).
- **Relative gates (V22 §2–§3).**
  - p_s = Tr[P_s(V)ρ_U] = Tr[Π_s Rρ₀R†] with R = V†U (Theorem 2.2). |⟨Ω, RΩ⟩|² is the same for every unit Ω iff
    R = e^(iθ)I (Theorem 2.3).
  - (WV)†(WU) = V†U, and [(U, V)] ↦ V†U gives G\(G × G) ≅ G (Theorem 3.2).
  - A common past gives R′ = W†RW: with U = Z, V = I and Ω = |0⟩, a shared Hadamard turns overlap 1 into 0
    (Proposition 3.3).
  - A fixed next step (A, B) descends to the quotient iff B†A ∈ Z(G). With A = Z, B = I, the representatives (I, I)
    and (H, H) of R = I go to Z and X (Theorem 3.4).
- **Quotients (V22 §4–§5).**
  - H/ker P ≅ ran P isometrically (Theorem 4.2), but conditioning loses the rate: Π₀ sends |0⟩ and |+⟩ to the same
    post-state with probabilities 1 and 1/2.
  - Dephasing kills |0⟩⟨1| and |1⟩⟨0| but not their product Π₀, so its kernel is not an ideal (Proposition 4.4). A
    common isometry cancels, and a linear L keeps all transition probabilities iff L†L = cI (Theorem 4.1).
  - For G = U(d), T\G/H_ψ₀ is the probability simplex via R ↦ (|⟨s|R|ψ₀⟩|²) (Theorem 5.2), and
    min_D ‖z′ − Dz‖² = Σ(√q − √p)² = 2 − 2Σ√(pq), while one global phase leaves 2 − 2|⟨z, z′⟩| (Theorem 5.3).
- **Kernels and Bargmann phases (V22 §6–§7).**
  - K_ρ(v, w) = Tr(ρU_v†U_w) is a normalised positive kernel (Theorem 6.2); its completion is the minimal Hilbert
    realisation, unique up to label-preserving unitaries (Theorem 6.3). A branching recursion descends to isometric
    branches when K(v, w) = Σ_o K₊(r_o v, r_o w) for all pairs; conserving each total alone does not suffice
    (Theorem 6.4).
  - For seeds |0⟩ and |2⟩ under the powers Kʲ, every pairwise probability |k_t(n)|² = 1 − t(1 − t)|1 − ωⁿ|²
    coincides, yet the three-history invariants are B = φ⁻⁴ω for seed |2⟩ and φ⁻⁴ω̄ for seed |0⟩ (Theorem 7.4).
    A controlled cycle on three copies reads ⟨X⟩ = Re B and ⟨Y⟩ = Im B (Theorem 7.6).
- **Future closure (V22 §8–§9).**
  - ψ₊ = K|2⟩ and ψ₋ = K⁹|2⟩ have the same populations (a, 0, δ, 0, 0), but after one more K the middle
    probability is φ⁻⁴ for ψ₊ and 1 for ψ₋ (Theorem 8.3).
  - For a finite-dimensional, everywhere-legal unitary menu, the future-effect closure defines the coarsest
    equivalence that keeps current readings and is stable under every legal successor (Theorem 8.4).
  - A swap test on σ ⊗ ρ passes with p₊ = (1 + Tr σρ)/2, so its effect on the data is (I + σ)/2, not a sharp
    projector (Proposition 9.3).
- **MPS witness (V22 §10).**
  - A₀ = c(E₀₁ + E₁₂), A₁ = e(E₁₀ + E₂₁), A₂ = eE₀₂, A₃ = cE₂₀ with c = 3/5, e = 4/5 satisfy Σ A_kA_k† = I, and
    V(θ)A_kV(θ)⁻¹ = e^(iθλ_k)A_k with V(θ) = diag(1, e^(iθ), e^(2iθ)) and charges (−1, 1, −2, 2) (Proposition 10.2).
    Γ₂: X ↦ (Tr(XA_iA_j))_(i,j) is injective on M₃(ℂ) (Theorem 10.3).
  - Conjugating every tensor and the boundary by one S ∈ GL₃(ℂ) leaves all sixteen amplitudes unchanged, while with
    the A_i fixed Γ₂ still determines X; squared moduli cannot separate X from e^(iα)X (Theorem 10.4).

一部约七分半钟的片子，延续 AURIC 版本系列，涵盖第二十一版与第二十二版。第二十一版：三个对易读出生成五原子代数，三个均值只剩隐藏耦合 κ 与看不见的相干；投影顺序无关当且仅当对易，原生黄金门给出 φ⁻³ 的精确顺序差；共用程序的基底保持精确对易，共享与重抽给出 1/2 与 3/8；记录增长是等距，带权历史态是传播残差的零点，钟势需要闭走增量为零；两条路径的最小残差恰为暗端口概率的两倍；固定原生菜单下恰需六个实数。第二十二版：读出只依赖相对门 V†U 而种子保留；共同末端参考框可消去而共同过去不可；投影商、条件化、去相干与双商各不相同；重叠核重建最小 Hilbert 空间，黄金反例中两两概率相同而 Bargmann 相位为 φ⁻⁴ω 与其共轭；当前人口相同的历史在下一步分岔；矩阵乘积见证中虚参考被消去而边界保留。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-091-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.**
  - At the subject commit V21 has 56 digestion atoms and V22 has 62, all residual-open.
  - The MPS witness of V22 §10 is the module `D5/S3/Quantum/SpinChains/FourLevelU1SymmetricInjectiveMPS`, whose state
    file `Golden/Frozen/state/D5/S3/Quantum/SpinChains/FourLevelU1SymmetricInjectiveMPS.lean.json` exists at
    `1bccf3c8c5`. Its frozen declarations include `result : ¬ claim` and the theorems `kraus_normalized`
    (Σ A_kA_k† = I for the same four matrices), `charge_conjugation` (the charges −1, 1, −2, 2 under
    diag(1, e^(iφ), e^(2iφ))) and `kraus_injective` (injectivity of X ↦ Tr(XA_iA_j) at length two). The opening line of
    the MPS scene and the finale badge these statements as Lean. The second normalisation Σ A_k†A_k = I and the GL₃
    gauge statement of Theorem 10.4 are not in that module and are badged as theory.
  - No other statement shown is covered by a frozen declaration.
- **Published results, used as external inputs.** The program scene, the Bargmann scene, the swap-test line and the
  finale badge them as published.
  - Program orthogonality: Heinosaari–Tukiainen, Quantum Inf. Process. 14, 3097 (2015), arXiv:1412.0419,
    Proposition 4 (V21 Theorem 4.6 is a finite-dimensional proof of it).
  - History states and propagation constraints: Aharonov–van Dam–Kempe–Landau–Lloyd–Regev, SIAM J. Comput. 37, 166
    (2007), arXiv:quant-ph/0405098; internal clocks: Page–Wootters, Phys. Rev. D 27, 2885 (1983),
    doi:10.1103/PhysRevD.27.2885. V21 proves the weighted version itself.
  - Sharp joint measurability: Heinosaari–Reitzner–Stano, Found. Phys. 38, 1133 (2008), arXiv:0811.0783.
  - Bargmann invariants and geometric phases: Rabei–Arvind–Mukunda–Simon, Phys. Rev. A 60, 3397 (1999),
    arXiv:quant-ph/9907080.
  - Swap and cyclic interference tests: Ekert et al., Phys. Rev. Lett. 88, 217901 (2002), arXiv:quant-ph/0203016.
  - MPS boundary maps and symmetries: Sanz–Wolf–Pérez-García–Cirac, Phys. Rev. A 79, 042308 (2009),
    arXiv:0901.2223.
  - The volumes also cite Kretschmann–Schlingemann–Werner (arXiv:quant-ph/0605009), Giacomini–Castro-Ruiz–Brukner
    (arXiv:1712.07207) and Nielsen (arXiv:quant-ph/0205035); the film does not use them.
- **Classical tools named in the volumes.** Order-independence of commuting projections (badged classical in the
  order scene), direct limits of Hilbert spaces, Gram/GNS reconstruction from a positive kernel (badged classical in
  the kernel line), the Hellinger form and MPS gauge freedom.
- **Project inputs from other volumes, not recomputed as theorems.**
  - V21: the quantum-principles volume (Proposition 3.4, Theorems 11.2 and 11.4), the pyramid-formula volume (the κ
    fibre), the local-model and local-clock volumes (calibration and the clock-potential qualification Q2), and the
    v16, v18 and v20 interfaces.
  - V22: the joint-kernel volume §15–§23, the AURIC Ω static compatibility fibre theory, the coherent-reconstruction
    volume §6.1–§6.2 and its continuation §64–§68 (the golden block), and contextual spacetime arithmetic §42.4.
- **Theory volumes, argued but not kernel-checked.** Every other scene line is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, scipy, sympy) runs 1716 checks; all pass.
  - **Atoms.** The algebra of N₁, N₂, N₃ has dimension 5 and the atom formulas give the five Π_s; the response hull is
    a square pyramid of volume 1/3; fibre points at κ = 0, 0.15, 0.3 keep X, Y, Z; diagonal readings agree for a
    random state and its dephasing.
  - **Order.** 200 random projection pairs: PQP = QPQ exactly for the commuting ones and not for the others;
    dephasing compositions give I/2 on random inputs; labelled records 1/2 and 1/4. Golden gate: K¹⁰ = I,
    K⁹ = K†, the Kⁿ formula for n = −10 … 10, Tr PQ = 0.381966, ‖[P, Q]‖ = 0.485868, p(P → Q) = 0.381966,
    p(Q → P) = 0.145898, gap 0.236068, with the golden identities checked exactly in sympy.
  - **Programs.** A coherent three-label program with an entangled input: the three readouts commute and all six
    reading orders give the same record law; the record map is an isometry. 300 random approximate pairs satisfy the
    4‖Vᵢ − Vⱼ‖ bound (largest ratio 0.665). Reuse 1/2, redraw 3/8. Two complete bases commute when U†V is a phase
    permutation and not for a random V.
  - **Histories.** Depth-three random instruments keep ‖Φ_t‖ = 1; compatible effects give equal expectations at
    four depths; for d = 3, T = 4 and π = (0.10, 0.20, 0.30, 0.25, 0.15): J_π†J_π = I, H_π ≥ 0, dim ker H_π = 3,
    H_πJ_π = 0, the residual formula (7) on random Ξ, and a unique zero state once the boundary term is added.
  - **Clocks.** Coarse-clock fibres are mixed; on a 12-step clock (S ⊗ K)ⁿ ≠ I for n = 1 … 20 while Kⁿ = I at
    n = 10, 20; the diamond with increments 1, 1, 1, 2 has no potential (closed walk −1), the one with 1, 1, 1, 1 has.
  - **Interference.** 100 random unitary pairs: minimum = ½‖(A − B)ψ‖² = 1 − Re⟨ψ, A†Bψ⟩ = 2p₋; 25 unit-norm
    optimisations match 4(1 − √(1 − p₋)); global phases give p₋ = sin²(θ/2); 20 unit diamonds give p₋ and 20 weighted
    path pairs match k_A k_B/(k_A + k_B).
  - **Six numbers.** The native closure grows 5 → 6 → 7 and stops; the unitary-only menu also stops at 7; three
    random basis changes with the mode reading grow 5 → 17 → 25. The Q± entries and the inversion formulas for
    Re ρ₀₂, Im ρ₀₂ hold on random states; the commutant of N₁, N₂, N₃ has dimension 5.
  - **Relative gates and quotients.** The relative-gate formula on random U, V, ρ₀; the Hadamard example 1 → 0;
    HZH = X; a central step descends; K^(m + 9n) = (Kⁿ)†Kᵐ. Isometric cancellation, L = 2J versus a generic L, the
    projection quotient norm, the rates 1 and 1/2, the dephasing counterexample, same probabilities on a double coset.
    For p = (0.5, 0.3, 0.2), q = (0.2, 0.3, 0.5) with fixed sample phases: Σ(√q − √p)² = 0.1351, never beaten by
    20 000 random phase choices, against 1.4222 for one global phase. The Choi overlap and its phase minimum.
  - **Kernels and Bargmann.** Kernels over 15 gate words are Hermitian, positive and normalised, invariant under a
    common continuation and shifted to the source under a common past; the pure-source kernel has rank ≤ 3 and its
    reconstruction matches the source vectors up to an isometry; Lüders branches conserve cross terms; cyclic
    dimensions d·r. Golden: all 10 × 10 pairwise probabilities agree for seeds |0⟩ and |2⟩ (1, 0.381966, 0.145898,
    0.909830, 0.673762, 0.055728, …); B = −0.045085 ± 0.138757 i, i.e. φ⁻⁴ω and φ⁻⁴ω̄; |B|² = p₀₁p₁₂p₂₀; the Gram
    determinant is 0; the three-copy circuit gives ⟨X⟩ = Re B, ⟨Y⟩ = Im B. The four-point kernel with r = 0.4 stays
    positive for every phase (minimum eigenvalue 0.2).
  - **Future and swap.** Populations (0.618034, 0, 0.381966, 0, 0) for both histories; after K the middle
    probabilities are 0.145898 and 1; the future closure separates the two histories while current effects do not;
    a correlated program–data source does not factor into marginals; 10 random swap tests match (1 + Tr σρ)/2 and
    (I + σ)/2 has eigenvalues 1/2, 1/2, 1.
  - **MPS.** Exact sympy arithmetic: both normalisations, the four charges, the nine two-letter products, rank Γ₂ = 9,
    invariance under a fixed invertible S, and squared moduli blind to a boundary phase.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.** The κ-fibre bars, the order bars (1/2, 1/4; φ⁻², φ⁻⁴), the approximation scatter, the
  reuse and redraw bars, the clock weights and residual curve, the Kⁿ and (S ⊗ K)ⁿ stems, the residual-versus-phase
  curves, the closure-dimension bars, the Hellinger bars, the pairwise-probability bars, the Bargmann points, the
  population bars and the nonzero two-letter products.
- **Illustrative visuals.** These are illustrations, not data: the rotating pyramid, the program and W block diagram,
  the record tree and limit chain, the diamond graphs, the path and interferometer sketches, the K ring, the qubit
  circles, the simplex, the kernel ring grid and the swap-test circuit.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
