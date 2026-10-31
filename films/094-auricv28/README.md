# 094 · AURIC V28 · BINARY READOUT, FULL-FRAME COMPATIBILITY AND THE E8 GOLDEN BRIDGE · AURIC V28 · 二元读出、全框架相融与 E8 黄金门桥梁

This film continues the versioned AURIC volumes and runs about 7½ minutes. It covers the whole of
`AURIC_BINARY_READOUT_FULL_FRAME_COMPATIBILITY_AND_E8_GOLDEN_GATE_BRIDGE_V28.md` (§2–§12, statements 2.1–12.2) at
trureturing subject commit `d1876cfbbe`. §1 fixes sources and notation and has no results of its own.

The volume asks what a two-outcome readout really carries. It separates probabilities, two-state codes, Bloch
coordinates and post-measurement updates, and finds the square law only under consistency over every rotated frame.
It then takes the A₄ ⊕ A₄ glue of the AURIC–E8 volume (film 074) to an explicit root qubit inside E8, where the
five-grading phase squares the golden gate.

## The film, scene by scene

- **Relative gates and the sphere (§2–§3).**
  - With |ψ⟩ = A|0⟩ and |bᵢ⟩ = B|i⟩, every probability is |⟨i|B†A|0⟩|². A common left factor U cancels, and two
    pairs have the same relative gate exactly when they differ by one (Theorem 2.2).
  - A two-state readout leaks: p₀ + p₁ = Tr(ρΠ_W) and p⊥ = Tr(ρ(I − Π_W)). The complement has dimension 11 in the
    native 13-dimensional sector and 246 in the E8 adjoint carrier (Theorem 2.4).
  - Two amplitudes modulo normalisation and common phase give ℂP¹ = S³/U(1) ≃ S², with
    p = (1 + r·n)/2 = cos²(θ_B/2) = cos²θ_FS (Theorems 3.1 and 3.3).
  - Knowing r_x and r_z of a pure state leaves r_y = ±√(1 − r_x² − r_z²); (|0⟩ ± i|1⟩)/√2 is the example. The three
    Pauli variances sum to 3 − |r|² ≥ 2, and Δσx Δσy ≥ |r_z| (Corollary 3.4).
- **Full-frame law (§4.1–§4.4).**
  - Take a continuous, rotation-covariant, complementary response calibrated by f_m(m) = 1, and require
    Σⱼ f_m(nⱼ)² = 1 on every orthonormal frame (F). Then f_m(n) = m·n and p = (1 + m·n)/2 (Theorem 4.2).
  - The cubic response (1 + (m·n)³)/2 keeps every other condition, but its frame sum is 3(1/√3)⁶ = 1/9 at
    m = (1, 1, 1)/√3 (Proposition 4.3).
  - Balls Bᵈ of every dimension d ≥ 2 carry the binary responses (1 ± n·r)/2, so binarity, normalisation and isotropy
    do not select d = 3 (Proposition 4.4).
- **Selecting three, constructing i (§4.5–§4.6).**
  - In the Krumm–Müller ball-bit framework (composites, local tomography, a closed connected reversible group), a
    reversible gate that is not a product of local gates exists only for d = 3 (Theorem 4.5).
  - Three real self-adjoint involutions A, B, C that pairwise anticommute give J = ABC with J² = −I, Jᵀ = −J and
    [J, A] = [J, B] = [J, C] = 0. With i acting as J, V ≅ ℂ² ⊗ ℂᵐ, dim_ℝ V = 4m, and an irreducible piece is one
    qubit (Theorem 4.6).
- **Effects and updates (§5).**
  - A weight on all effects that is positive, normalised and additive is w(E) = Tr(ρE) for a density operator ρ, also
    in dimension two (Theorem 5.2, Busch's effect form of Gleason's theorem).
  - The same PVM admits the Lüders instrument PᵢρPᵢ and the reset instrument Tr(ρPᵢ)|0⟩⟨0| (Kraus |0⟩⟨i|). On
    |1⟩⟨1| both give outcome 1 with probability 1, with outputs |1⟩⟨1| and |0⟩⟨0| (Theorem 5.4).
  - Order matters: P_x P_z|0⟩ = |+⟩/√2 but P_z P_x|0⟩ = |0⟩/2. Recursive Kraus records satisfy
    Σᵢ p(hi) = p(h) without an external clock (Proposition 5.5, Theorem 5.6).
- **Five points, three ports (§6).**
  - A table q_ij comes from rays of one qubit exactly when G = 2q − 1 is positive semidefinite of rank at most 3
    (Theorem 6.1).
  - Four labels with all q_ij = ½ are pairwise feasible, but G = I₄ has rank 4 (Proposition 6.2).
  - The three occupation ports N₁ = diag(0,1,0,0,1), N₂ = diag(0,0,1,0,0), N₃ = diag(0,0,0,1,1) commute. Their means
    leave p = (1 − X − Y − Z + κ, X − κ, Z, Y − κ, κ) with max(0, X + Y + Z − 1) ≤ κ ≤ min(X, Y), and a
    21-dimensional fibre of density matrices (Proposition 6.4).
  - Compressed to any qubit, the ports stay jointly measurable, so they cannot be three sharp Pauli axes (Theorem 6.5).
  - Three unbiased orthogonal effects (I ± ηⱼσⱼ)/2 are jointly measurable exactly when η_x² + η_y² + η_z² ≤ 1; with
    equal strength, η ≤ 1/√3 (Theorem 6.6).
- **Binary witnesses (§7).**
  - Any relation R is ∃w ∈ W ∧ᵢ Eᵢ(w, xᵢ) with W = R; the witness carries the joint information (Theorem 7.1).
  - Three-bit even parity has full pairwise projections but keeps 4 of 8 triples (Proposition 7.2). It is not
    expressible by Boolean unary and binary constraints with Boolean helpers, because these are closed under majority
    and the majority of 110, 101, 011 is 111 (Theorem 7.3).
  - GHZ₊ and GHZ₋ are orthogonal with equal proper marginals (Proposition 7.4).
  - Any finite POVM compiles into a binary tree of two-outcome instruments of depth ⌈log₂N⌉, with leaf operation
    ρ ↦ √Eᵢ ρ √Eᵢ (Theorem 7.5). An isometry ℂᵈ → ℂ² needs d ≤ 2 (Proposition 7.6).
- **E8 root qubit (§8.1–§8.4).**
  - With L₀ = A₄ ⊕ A₄, the strict integral extensions are exactly Γ₊ = L₀ + ℤ(ω₁, ω₂) and Γ₋ = L₀ + ℤ(ω₁, ω₃),
    with glue lines b = ±2a in F₅²; both are E8 (Theorem 8.2, from the AURIC–E8 volume). The glue grading has
    dimensions 48, 50, 50, 50, 50.
  - α = (ω₁, ω₂) and β = (e₂ − e₁, 0) have α² = β² = 2 and (α, β) = −1; β − α and β + 2α have norm 6. So
    W = g_β ⊕ g_(β+α) is a root SU(2) qubit across grades 0 and 1 (Theorem 8.3).
  - On W, Z = diag(1, ω), K_P = diag(ζ, ζ²), and Z³|_W = ω² K_P². K_P has projective order 10 and every Zᵏ has
    order dividing 5, so no power of Z equals K_P projectively (Theorem 8.4).
- **Braid angle and sixteen gates (§8.5, §10.1–§10.2).**
  - K_P K_Q K_P = K_Q K_P K_Q exactly when Tr(PQ) = 1/φ² = x², with s = −ζ/(ζ − 1)² = 1/(2 + x)
    (Theorem 8.5).
  - K′ = e^(−9πi/10) K lies in SU(2) with order 20. The fifth powers multiply to −R_P R_Q with trace
    2 − 4x² = −4 + 2√5, whose conjugate −4 − 2√5 < −2, so the product has infinite order and the pair is dense in SU(2)
    (Lemma 10.1).
  - The pair placed on the eight simple roots gives sixteen fixed gates whose closure is compact E8; positive words
    suffice since K′⁻¹ = K′¹⁹ (Theorem 10.2).
- **Two fifths and the rank obstruction (§9, §10.3–§10.5).**
  - For the five phase states (|e₀⟩ + ωᵏ|e₁⟩)/√2, every measurement identifies k with probability at most
    dim W / 5 = 2/5, attained by M_k = (2/5)ρ_k (Theorem 9.1); any finite binary recursion is one effective POVM and
    obeys the same bound (Corollary 9.2).
  - Five orthonormal vectors from the five grades give the orthonormal states Φ_k and perfect discrimination with a
    depth-3 binary tree (Proposition 9.3).
  - A fixed finite menu has countably many words and cannot exactly cover E8; the E8 control group has dimension 248,
    not 61 503 (Proposition 10.3).
  - Every continuous homomorphism PU(13) → E8 or E8 → PU(13) is trivial (rank 12 > 8, dimension 248 > 168), and a fixed
    leak-free 13-dimensional code under E8 control cannot carry all of PU(13) (Theorem 10.4, Corollary 10.5).
- **Sharp stability and finite checks (§11.1).**
  - For each 0 < θ ≤ 1 there is a valid response with four-time residual at most (52/243)θ² and Born deviation at
    least θ/16 (at (u + v)/√2, P_u = ½ + t/(1 − t²) with t = θ/16). So no uniform o(√ε) modulus exists
    (Theorem 11.1).
  - For any finite set of queries and native four-time contexts, some continuous response equals the Born law there,
    keeps basis calibration, and misses by more than 1/32 on another actual context (Theorem 11.2).
- **Joint support and parity (§11.2–§11.3).**
  - Reading g = m + √2 n twice with noise ε(t, −t) recovers every source from (Y₁ + Y₂)/2; with noise ε(t, t) no label
    with finitely many values suffices, since (L + 1)² ≤ M(1 + (1 + √2)L/(2ε)) fails for large L (Theorem 11.3).
  - With an odd number of contexts and each mode in exactly two contexts, a context-independent occupation with sum n
    per context forces n even (Theorem 11.4). For Kurzyński's eighteen modes and nine contexts, an assignment exists
    exactly when n is even, using the nine-cycle 1→2→8→4→7→3→9→5→6→1 for even n.
- **Finale (§12).** The volume's conditional model (Definition 12.1, Theorem 12.2) holds Γ₊ and its E8 carrier, the
  root code with an anticommuting triple, effects satisfying (E) with an instrument, the golden pair and the sixteen-gate
  menu, and a static record network, with off-code branches kept by the completion L_i = ι√Eᵢι†, L⊥ = I − ιι†.

一部约七分半钟的片子，延续 AURIC 版本系列（第二十八版）：先把读出写成相对门 B†A，给出二态读出的泄漏项，两个复振幅去掉归一化与共同相位后得到球面；要求所有旋转框架上的平方和相容，就锁定 Born 角度律，而三次响应与任意维数的球说明更弱的条件不够；在 Krumm–Müller 框架中只有三维允许真正相互作用的可逆门，三个两两反对易的对合给出复结构 i；全效果上的可加权重给出密度算子，但同一测量允许不同的测后更新；一张转移表来自同一量子比特当且仅当 2q − 1 半正定且秩至多为三，AURIC 的三个占据读口不可能是三个尖锐 Pauli 轴，三个不尖锐正交轴联合可测当且仅当锐度平方和至多为一；见证域的二元化保留联合信息，偶奇偶关系无法用布尔二元约束表达；随后在 E8 中构造跨分级的根量子比特，五分级相位给出黄金门的平方，编织要求 tr(PQ) = 1/φ²，八个简单根上的十六个固定黄金门生成紧 E8；五个相位态的单份识别概率至多为 2/5，PU(13) 与 E8 之间只有平凡的连续同态；最后是平方根稳定性的锐性、有限核对的固定间隙、联合支撑的恢复能力，以及十八模式的奇偶定理（已在 Lean 中冻结）。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-094-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One is used, in the joint-support scene and the finale.
  - `D5.S3.Quantum.Contextuality.EighteenModeBosonicAssignmentParity.result : claim` (state file
    `Golden/Frozen/state/D5/S3/Quantum/Contextuality/EighteenModeBosonicAssignmentParity.lean.json` exists at the
    subject commit) states that for Kurzyński's eighteen modes and nine contexts a natural-valued, context-independent
    occupation assignment with n particles in every context exists exactly when n is even. The volume cites this file
    as reference [7]. Only the sentence stating that result carries the Lean badge; the general Theorem 11.4 (odd
    number of contexts, double incidence) is badged as theory.
  - Digestion: at the subject commit the V28 volume has no digestion records (not ingested), so the ledger does not
    link the frozen theorem to a V28 atom. The project volumes it builds on are ingested with every atom
    residual-open: AURIC–E8 compatible extensions 85, quantum reconstruction continuation II 84, fixed golden gate
    and braid compatibility 29, V27 72 and V24 55.
- **Published results, used as external inputs.** The clifford, effects, three-ports, binary and finale scenes badge
  them as published.
  - Effect form of Gleason's theorem (Theorem 5.2): P. Busch, arXiv:quant-ph/9909073.
  - Dimension three from reversible interaction (Theorem 4.5): M. Krumm and M. P. Müller, npj Quantum Information 5,
    7 (2019), arXiv:1804.05736, Theorem 1.
  - Joint measurability of three unsharp orthogonal spin effects (Theorem 6.6): T. Brougham and E. Andersson,
    Phys. Rev. A 76, 052313 (2007), arXiv:0708.3375, appendix (A4).
  - Binary search trees for generalized measurement (Theorem 7.5): E. Andersson and D. K. L. Oi, arXiv:0712.2665.
  - Hidden-variable encoding of non-binary constraints (Theorem 7.1): N. Samaras and K. Stergiou, JAIR 24 (2005).
  - E8 five-grading and the (SU(5) × SU(5))/ℤ₅ subgroup: I. Yokota, *Exceptional Lie groups*, arXiv:0902.0431, §5.12.
  - The eighteen-mode context table: P. Kurzyński, Phys. Rev. A 95, 012133 (2017), arXiv:1609.01250.
- **Classical tools named in the volume.** Bloch geometry and the Pauli algebra (badged classical in the sphere half
  of the relative-gates scene), the Clifford three-generator structure, the root SU(2) subgroups and maximal tori of
  compact Lie groups (Conrad's Math 210C notes), and the uniqueness of the even unimodular rank-8 lattice.
- **Project inputs, not recomputed as such.** The E8 selection theorem and five-grading of the AURIC–E8 volume (film 074;
  its finite core is recomputed below), the V15 golden gate with its braid expansion and SU(2) density, the V27
  Bargmann triple-product chirality, §77.2 native density and Theorems 96.2 and 97.2 of the quantum reconstruction
  continuation II, §14 of the typed residual cocycle volume, and the five AURIC modes of the FIB-ATOM pyramid volume.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (14 498 checks) recomputes the following with numpy
  sampling, sympy exact arithmetic, cvxpy/Clarabel semidefinite programs and a scipy integer program.
  - **Relative gates and the sphere.** (UB)†(UA) = B†A and invariant probabilities for random unitaries in dimensions
    2, 5, 13, with the converse U = B′B†; the leak identity on a random 13-dimensional state (p₀ = 0.0861,
    p₁ = 0.0726, p⊥ = 0.8413); |r| = 1, the inverse map, p = (1 + r·n)/2 = cos²(θ_B/2) = cos²θ_FS on 400 pure states;
    eigenvalues (1 ± |r|)/2, variance sum 3 − |r|² ≥ 2 and Δσx Δσy ≥ |r_z| on 400 mixed states; r = (0, ±1, 0) for
    (|0⟩ ± i|1⟩)/√2.
  - **Full-frame law.** The Born response satisfies (F) on 60 random frames; the cubic response has frame sums in
    [1/9, 1] (sampled 0.138 to 0.978) and exactly 1/9 at m = (1, 1, 1)/√3; binary responses on Bᵈ for d = 2…7.
  - **Selecting three.** The realified Pauli triple, after a random orthogonal change of basis, gives J² = −I, Jᵀ = −J
    and [J, A] = [J, B] = [J, C] = 0 for m = 1, 2, 3, with real dimension 4m.
  - **Effects and updates.** The reset instrument is trace preserving with effects Pᵢ; on |1⟩⟨1| both instruments give
    outcome 1 with probability 1 and outputs |1⟩⟨1|, |0⟩⟨0|; P_xP_z|0⟩ = |+⟩/√2 and P_zP_x|0⟩ = |0⟩/2; the record
    isometry; a random depth-3 Kraus tree with Σᵢ p(hi) = p(h) at every node.
  - **Five points, three ports.** For 90 random ray tables, 2q − 1 is positive semidefinite of rank ≤ 3 and the rays
    are rebuilt from a Gram factor (one sample has eigenvalues 3.121, 1.545, 0.334, 0, 0); the four-label table gives
    I₄ of rank 4; the Bargmann triple-product formula and its conjugation sign on 100 cases; the κ interval and its
    realisability on 300 random five-mode states; the fibre dimension 25 − 4 = 21; compressed ports as coarse
    grainings for 50 random isometries; the joint-measurability SDP gives the unit circle in the η_z = 0 slice and
    1/√3 = 0.57735 for equal strength, with (0.8, 0.6, 0) feasible and (0.8, 0.6, 0.1) infeasible.
  - **Binary witnesses.** Witness encoding on 20 random relations; full pairwise projections of even parity; all 16
    binary and 4 unary Boolean relations closed under majority; majority(110, 101, 011) = 111; an exhaustive search
    finds no expression of parity by binary constraints alone or with one Boolean helper; GHZ± marginals for N = 3, 4;
    the binary-tree construction for random POVMs with (N, d) = (5, 3), (8, 2), (6, 4), leaf operations √Eᵢρ√Eᵢ and
    depth ⌈log₂N⌉.
  - **E8 root qubit.** The isotropic lines b = ±2a in F₅²; class minimal norms 4/5, 6/5, 6/5, 4/5; root counts
    40 + 50 + 50 + 50 + 50 = 240 and grading 48, 50, 50, 50, 50; det L₀ = 25 and, from a Hermite normal form basis,
    Γ₊ even with det 1; |ω₁|² = 4/5, |ω₂|² = 6/5, α² = β² = 2, (α, β) = −1, |β − α|² = |β + 2α|² = 6;
    Z³|_W = ω²K_P², K_P² = diag(ω³, ω), projective orders 10 and 1 or 5.
  - **Braid angle and sixteen gates.** The braid difference formula ζ³(ζ − 1)(ζ + s(ζ − 1)²)(P − Q) on 101 values of s,
    zero exactly at s = 0.381966 = x² (and at s = 1, where Q = P); the explicit Q; K′ with determinant 1, eigenvalues
    e^(∓3πi/10), order exactly 20 and K′¹⁹ = K′⁻¹; K′_P⁵K′_Q⁵ = −R_PR_Q with trace −4 + 2√5 = 0.472 and minimal
    polynomial t² + 8t − 4; rotation angle 0.8483π, whose powers 1 to 240 leave no gap above 0.069 rad on the circle.
  - **Two fifths and the rank obstruction.** Σρ_k = (5/2)I, the SDP optimum 0.400000, 24 random POVMs between 0.075 and
    0.324, 10 random adaptive depth-3 binary recursions all ≤ 2/5, orthonormal Φ_k; 248² − 1 = 61 503, rank 12 > 8 and
    168 < 248.
  - **Sharp stability.** In 13 dimensions with random two-spectral gates K₀ = ζ[(I − Π) + ζΠ] and random Kf, Kp: the
    quadratic response satisfies the four-time law exactly, P^θ stays within 13θ²/243 of it, the residual stays below
    (52/243)θ² (largest sampled value 0.0038 at θ = 1, against 0.214), calibration holds on all basis points, and
    P_u = ½ + t/(1 − t²) ≥ ½ + θ/16; 1 − 13d ≥ 243/256; |A|² = x², |B|² = x; a toy bump in ℂ¹³ with six rays has
    g_m(z₃) = 0.751, 0.972, 0.999 for m = 1, 2, 4.
  - **Joint support and parity.** The perpendicular average on 500 samples; m + √2n injective on a 60 × 60 box; the
    per-label packing bound on actual source values; with M = 4 and ε = 0.25 the counting inequality fails from L = 18;
    the eighteen-mode table has four modes per context, the nine-cycle matches the Lean `even_assignment` set, and an
    integer program finds assignments for n = 0, 2, 4, 6 and none for n = 1, 3, 5, 7; double counting on random odd
    incidence graphs.
  - **Conditional model.** The off-code Kraus completion sums to the identity on carriers of dimension 6 and 12.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The leak bars p₀, p₁, p⊥.
  - The 60 sorted cubic frame sums against the Born line and 1/9.
  - The matrices A, B, C, J and J².
  - The depth-3 record-tree probabilities.
  - The five Gram eigenvalues; the κ interval and sample point.
  - The SDP boundary points in the η_z = 0 slice and the equal-strength optimum.
  - The grade bars 48, 50, 50, 50, 50 and the root counts.
  - The braid-defect curve with its zero at 0.381966.
  - Powers 1 to 120 of K′_P⁵K′_Q⁵ on the circle.
  - The random-POVM success dots and the SDP optimum 2/5.
  - The sampled residuals and deviations against (52/243)θ² and θ/16; the bump values g_m(z₃).
  - The crowding curves with the failure at L = 18; the integer-feasibility row for n = 0…7.
- **Illustrative visuals.** These are illustrations, not data:
  - the Ω ring and five-mode pyramid;
  - the gate boxes for A and B;
  - the Bloch spheres, the rotating frame with its stacked squares, and the h(v) curves;
  - the ball-bit diagram and dimension tiles;
  - the instrument boxes;
  - the port table;
  - the F₅² glue grid and the α-string diagram;
  - the unit circle of tenth roots;
  - the braid diagrams and the E8 Dynkin diagram with gate pairs;
  - the pentagon of phase states and the dimension and rank bars;
  - the ray-space sketch with query points and z₃;
  - the joint-support segments;
  - the nonagon of contexts with the highlighted nine-cycle.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
