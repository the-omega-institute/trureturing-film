# 093 · AURIC V25–V27 · GOLDEN TILINGS AND RIGID MIRRORS · AURIC V25–V27 · 黄金铺砌与刚性镜像

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:24). It covers two volumes of
trureturing at subject commit `d1876cfbbe` (the repository has no V26):
- `AURIC_QUANTUM_TILINGS_PENTAGON_COHERENCE_GOLDEN_GATES_AND_GLOBAL_OBSERVATION_V25.md`, §1–§11;
- `AURIC_RIGID_MIRRORS_COMPLEX_PHASE_AND_NATIVE_GOLDEN_GATES_V27.md`, §2 and §4–§9.

Version twenty-five asks whether one kind of quantum gate can tile a whole. It separates geometric covering, coherent
gluing, complete observation and generation, and proves each piece under stated inputs. Version twenty-seven asks what
a rigid mirror does to quantum amplitudes. It separates the tile plane, the amplitudes and the Bloch ball, and builds
the mirror of the native thirteen-dimensional golden-gate sector from native calls. Complex Hilbert spaces, the
Fibonacci fusion rule, the gauge and the native gate menu are inputs throughout.

## The film, scene by scene

- **Golden pentagon (V25 §1–§2).**
  - Powers of one unitary commute, so their closure is abelian and never PU(d) for d ≥ 2. With K¹⁰ = I there are at
    most ten powers, and finite words over a finite alphabet are countable (Proposition 1.2).
  - Types 1 and τ with τ ⊗ τ = 1 ⊕ τ, and the one two-dimensional block F = [[r, s], [s, −r]] with r, s > 0 in the
    order (1, τ).
  - The typed pentagon component with a = b = c = d = z = τ, e = h = 1, f = g = τ gives r(r − s²) = 0, so r = s².
    Unitarity gives r² + s² = 1. Together with the full pentagon check ABA = CB, unitarity and all typed pentagons are
    equivalent to r = 1/φ and s = 1/√φ (Theorem 2.2).
- **Braid phases (V25 §3, §11).**
  - For a symmetric type graph with positive weights and Σ_(b~a) d_b = δ d_a, the path projections P_i are Hermitian
    idempotents with P_i P_(i±1) P_i = δ⁻² P_i, and distant ones commute (Theorem 3.1). For the Fibonacci weights
    (1, φ) and δ = φ this gives δ⁻² = φ⁻².
  - For projections with PQP = φ⁻² P, QPQ = φ⁻² Q and P ≠ Q,
    T_P T_Q T_P − T_Q T_P T_Q = (z − 1)[z + φ⁻²(z − 1)²](P − Q). Apart from z = 1 the braid relation holds exactly
    at z = e^(±3πi/5) (Theorem 3.2). This gives the native gate K = ζ[I + (ζ − 1)P] with K¹⁰ = I and the braid
    relations (10)–(11).
  - Replacing the phase by an inner unitary W, U_P = I + P ⊗ (W − I) is always unitary, but the braid holds exactly
    when spec W ⊂ {1, ζ, ζ̄}. The whole gate K as W fails, because ζ² is in its spectrum (Theorem 11.2).
- **Dense control (V25 §4).**
  - On the four-bit string 0 b₁ b₂ 0, the two addresses give g₁ = √x|00⟩ + x|10⟩ and g₂ = √x|00⟩ + x|01⟩ with
    x = φ⁻¹ and ⟨g₁, g₂⟩ = x. On W = span{g₁, g₂} the normalised gates A, B ∈ SU(2) have Tr(AB) = 1 and
    Tr(AB⁻¹) = φ⁻². The Galois conjugate φ² > 2 excludes finite order, and the closed-subgroup argument gives the
    projective closure PU(2) from positive words (Theorem 4.1).
  - h = (√x|00⟩ − |01⟩ − |10⟩)/√(x + 2) satisfies P₁h = P₂h = 0, so every word multiplies it by ζ. From a basis
    state the weight on h is fixed (φ⁻³ from |00⟩, φ⁻² from |01⟩ or |10⟩), so the sector cannot be reached by these
    two addresses alone (Proposition 4.2).
- **Cuts and loops (V25 §5–§6).**
  - The identity is unitary but its sideways reshuffle has rank one; the swap is unitary on both cuts
    (Proposition 5.4).
  - The native three-qubit gate K = ζ[I + (ζ − 1)P], P = n_L n_R + (1 − n_L)(1 − n_R)Q_C, has a three-legs-to-three-legs
    cut of rank at most four, so it is not unitary on every cut (Theorem 5.5).
  - B_ζ|a, b⟩ = ζ^(ab)|b, a⟩ is dual unitary, entangling (amplitude determinant (ζ − 1)/4) and satisfies the braid
    relation, but with a fixed number of qubits it only gives finitely many monomial matrices (Proposition 5.6).
  - A section exists for a root vector exactly when every root loop fixes it; all root vectors transport
    path-independently exactly when every root loop is the identity (Theorem 6.2). A ring with one nontrivial edge keeps
    a nontrivial loop.
  - V = e^(iθ)U gives the same ray, yet the balanced port probability is (1 + cos θ)/2, assuming the two paths keep no
    orthogonal record (Proposition 6.3).
- **Trines and seams (V25 §7–§8).**
  - One trine readout q_j = (1 + n_j · r)/3 only sees the projection of r onto its plane (Lemma 7.1).
  - Three trines on orthogonal axes give r = Σ q_aj n_aj, Σ q_aj² = 1 + |r|²/3 and
    Σ (q_aj(r) − q_aj(s))² = |r − s|²/3 (Theorem 7.3).
  - No continuous amplitude choice s: S² → S³ exists; on the equator s_S = e^(−iφ)s_N, a transition of winding −1
    (Theorem 8.1).
  - The cyclic product ⟨a|b⟩⟨b|c⟩⟨c|a⟩ is (1 + a·b + b·c + c·a + i a·(b × c))/4. For e_x, e_y, e_z it is
    (1 + i)/4, and its mirror image is (1 − i)/4, with all pair probabilities 1/2 (Theorem 8.2). On screen also
    Σ(6 − d_v) = 12 for a spherical triangulation (Proposition 8.3).
- **Global states (V25 §9–§10).**
  - Compatible finite-region density matrices define one quasi-local state (Theorem 9.2), with a GNS Hilbert space
    (Proposition 9.3). If every finite set of closed conditions is satisfiable on a common region, all of them are
    (Theorem 9.7).
  - Bell pairs on AB and on BC both have marginal I/2 on B, yet no three-qubit state has both marginals
    (Theorem 9.6).
  - If c_B determines the configuration and p_A(a) does not depend on the logical class, then erasing A is exactly
    correctable from B, including correlations with a reference (Theorem 10.2).
  - With C₀ = {00, 11} and C₁ = {01, 10}, Φ⁺ and Ψ⁺ have the same single-bit marginals, but
    Tr_B |Φ⁺⟩⟨Ψ⁺| = X/2 ≠ 0, so neither bit can be erased (Proposition 10.3).
- **Reflections (V27 §2, §4).**
  - Three carriers: the plane E = ℝ² with q ↦ Rq + t, the amplitude space H with complex-linear unitaries, and the
    Bloch ball (Definition 2.1).
  - For a qubit projection, 2P − I = n·σ acts on the Bloch ball as r ↦ (2nnᵀ − I)r, a half turn of determinant +1.
    Conjugation in a fixed basis gives (r_x, r_y, r_z) ↦ (r_x, −r_y, r_z), determinant −1 (Theorem 2.4).
  - K_P⁵ = 2P − I, K¹⁰ = I and K⁻¹ = K⁹. On the five legal modes (000, 100, 010, 001, 101) the reflection has
    multiplicities 2 and 3 (Proposition 4.1).
  - Tr(R_P R_Q) = 4 − 2√5 with conjugate 4 + 2√5 > 2, so the two reflections are dense only in O(2), which stays at
    distance √(2 − √2) from the phase gate diag(1, i). With the complex phase ζ the full gates give PU(2)
    (Theorem 4.2, carried over from v15).
- **Twenty-eight calls (V27 §5–§6).**
  - The native sector has sites b₋₁ … b₈ with fixed 1 0 · 0 1 0 around five middle sites without adjacent ones, so
    dim H = a₅ = 13 (Definition 5.1).
  - Reversing the middle sites gives S = S† = S⁻¹ with Sv = v and S K_j S† = K_(6−j) (Theorem 5.2).
  - The Garside half twist Δ_K = (K₀⋯K₆)(K₀⋯K₅)⋯(K₀K₁)K₀, twenty-eight forward calls, equals e^(iχ)S
    (Lemma 5.3, Theorem 5.4). The volume leaves χ unspecified; the film's computation gives χ = 4π/5.
  - Replacing each call by nine calls of the same gate, in the same order, gives K_m(p) = conj(K_p) with 9ℓ calls;
    the inverse program reverses the order and is a different matrix. Common mirrors keep the relative readout
    P(q | p) = |⟨v, K_q† K_p v⟩|² (Theorem 6.2, Proposition 6.3).
- **Eight against five (V27 §7).**
  - On H the boundary gate K₀ has eigenvalue ζ with multiplicity 8 and ζ² with multiplicity 5, so no U ∈ U(13) and
    phase c give U K U† = c K⁻¹ (Proposition 7.1).
  - The exact gap is inf over U and c of ‖U K U† − c K⁻¹‖ = 2 sin(3π/20) ≈ 0.908, attained when the two projections
    are orthogonal and c = −i (Theorem 7.2).
  - In two dimensions Y K_P Y = ζ³ K_P⁻¹ for every real rank-one P. On the doubled 26-dimensional carrier,
    J(K ⊕ K̄)J = (K ⊕ K̄)⁻¹ (Proposition 7.3).
- **Gram loops (V27 §8).**
  - Two finite families are related by one unitary exactly when their Gram matrices are equal (Lemma 8.2).
  - Allowing a phase per state, the condition is equal overlap moduli and equal products around every nonzero-overlap
    loop (Theorem 8.3). On screen, a four-cycle with no triangles and different loop phase (1.0 against 1.2) has no
    such unitary.
  - |0⟩, |+⟩, |+i⟩ and their conjugates have all pair probabilities 1/2, but loop products (1 + i)/4 and (1 − i)/4,
    so no unitary maps one triple to the other, even with phases (Proposition 8.5).
- **Noisy transpose (V27 §9).**
  - (id ⊗ T)(|Ω⟩⟨Ω|) = F/d has eigenvalue −1/d on antisymmetric vectors, so no channel conjugates every unknown
    state (Theorem 9.2).
  - Φ*(X) = (Xᵀ + Tr(X) I)/(d + 1) is a channel with fidelity 2/(d + 1) on every pure state, and no channel does
    better on average or in the worst case (Lemma 9.3, Theorem 9.4).
  - The noisy mirror ηXᵀ + (1 − η)Tr(X)I/d is completely positive exactly for −1/(d − 1) ≤ η ≤ 1/(d + 1). For a qubit
    the Bloch mirror shrinks to η ≤ 1/3, with fidelity 2/3 (Corollary 9.5).

一部约七分半钟的片子，延续 AURIC 版本系列，讲第二十五版与第二十七版。第二十五版：一枚门的幂彼此交换，铺不满整体；Fibonacci 融合加上五边形与酉性，唯一确定 r = 1/φ、s = 1/√φ；带权路径投影满足 Temperley–Lieb 关系，编织关系只在 e^(±3πi/5) 成立，替换子门时谱须落在 1、ζ、ζ* 之中；两个重叠地址给出 Tr(AB⁻¹) = φ⁻² 而在 PU(2) 中稠密，但暗向量 h 让制备与控制分开；静态张量只在酉切面上是演化，原生三比特门有秩四的切面，相位交换门在三比特上只生成 750 个门；三个正交 trine 恢复整个 Bloch 向量，Hopf 接缝与闭环值 (1 + i)/4 仍然留存；相容有限区域给出整体态，而 Bell 对的重叠一致却没有整体；外部唯一延拓与局部同统计给出擦除纠错。第二十七版：反射 2P − I 在 Bloch 球上是半周旋转，共轭才是镜像；K⁵ = 2P − I；十三维扇区的左右反序 S 由二十八次正向调用的 Garside 半扭转精确实现，相位为 4π/5；每次调用换成九次给出复共轭程序；八对五的重数使边界门不能换框成逆门，精确间隙为 2sin(3π/20)；非正交读口的镜像由 Gram 矩阵和闭环乘积判定；普遍共轭不是信道，最优转置的保真度为 2/(d + 1)。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-093-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Digestion ledger.** At the subject commit V25 has 67 atoms and V27 has 72 atoms, all residual-open. No atom of
  either volume is covered by a Lean declaration.
- **Lean-frozen general theorems.** Two sentences carry the Lean badge. Each states a frozen general theorem that the
  volume applies; its state file exists at the subject commit and its statement was checked against the volume. The
  digestion ledger does not link either declaration to these volumes, and the volumes' own applications stay theory.
  - `D5.S3.Quantum.Algebra.WeightedLegalPathTemperleyLieb.weighted_legal_path_temperley_lieb`
    (`Golden/Frozen/state/D5/S3/Quantum/Algebra/WeightedLegalPathTemperleyLieb.lean.json`). Symmetric relation,
    positive weights, Σ_(b~a) d_b = δ d_a; the path projections are Hermitian idempotents, P_i P_(i+1) P_i = δ⁻² P_i,
    and distant ones commute. This is V25 Theorem 3.1. The golden specialisation and Theorem 3.2 are theory.
  - `D5.S3.Quantum.Algebra.GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq`
    (`Golden/Frozen/state/D5/S3/Quantum/Algebra/GramUnitaryExtension.lean.json`). Bᴴ B = Aᴴ A implies B = U A for a
    unitary U. This is the sufficiency direction of V27 Lemma 8.2. Theorem 8.3 (phases and loops) and Proposition 8.5
    are theory.
- **Published results, used as external inputs.**
  - Density of the Jones representation: Freedman, Larsen and Wang, arXiv:math/0103200, Theorem 0.1. Through the
    project's §77.2 it supplies the density (11) that V27 Theorem 5.4 uses to identify the commutant.
  - Optimal transposition: Buscemi, D'Ariano, Perinotti and Sacchi, Phys. Lett. A 314 (2003),
    arXiv:quant-ph/0304175. V27 §9 gives a self-contained proof; the transpose scene badges it as published.
  - Background cited by the volumes: Fibonacci anyons (Trebst, Troyer, Wang and Ludwig, arXiv:0902.3275), dual-unitary
    circuits (Bertini, Kos and Prosen, arXiv:1904.02140), trine measurements (Caves, Fuchs, Manne and Renes,
    arXiv:quant-ph/0306179), quantum error correction (Knill and Laflamme, arXiv:quant-ph/9604034).
- **Classical tools named in the volumes.** The Hopf fibration (Urbantke 2003), the Garside half twist (Dehornoy et
  al., *Foundations of Garside Theory*), Euler's formula, the closed-subgroup theorem, compactness, the GNS
  construction, the Choi criterion and the transpose's failure of complete positivity.
- **Project inputs from other volumes, not re-derived here.** The native thirteen-dimensional sector and its density
  (continuation II §77); the two-reflection result of v15 §§4–5 (V27 Theorem 4.2 carries it over); the v18 §7.2
  spectral condition, which V25 Theorem 11.2 restates for tile boundaries.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Not covered.** V25 §12 (the project's latest stability bound, a conditional result of another volume) and §13
  (the summary framework); V27 §1 (snapshot), §3 (configuration lifts of the Hat mirror), §10 (observer models and
  clock results of other project volumes) and §11 (controlled mirror and summary table).
- **Recomputed for this film.** An independent Python script checks the following. Exact arithmetic uses sympy;
  semidefinite programs use cvxpy with Clarabel.
  - **Pentagon.** All 512 label choices of the typed pentagon equation with the given F; solving them with r² + s² = 1 has the single
    positive solution r = 0.618034 and s = 0.786151. The stated ABA and CB matrices and their equality at the golden
    values are confirmed.
  - **Path projections.** The Temperley–Lieb relations hold with δ⁻² = 0.381966 on 88 fixed-endpoint Fibonacci path
    spaces of lengths 5 to 8. The braid defect identity (9) holds on 20 random phases. Its nontrivial roots are
    e^(±3πi/5), and K¹⁰ = I.
  - **Inner gates.** For W = diag(1, ζ, ζ̄) the replacement braid defect is 0; for W = K it is 0.571 in operator norm.
  - **Control.** ⟨g₁, g₂⟩ = x, det A = det B = 1, Tr(AB) = 1 and Tr(AB⁻¹) = 0.381966. The minimal polynomial of
    φ⁻² is t² − 3t + 1, and the Lie algebra of log A and log B has dimension 3. The eigen-angle of AB⁻¹ is
    1.378633 rad, and no power up to 2000 returns. h has weights 0.236068 = φ⁻³ on |00⟩ and 0.381966 = φ⁻² on |01⟩
    and |10⟩, unchanged by random words.
  - **Cuts.** The identity reshuffle has rank 1. The native K cut has singular values 1.782, 1.618, 1.176, 0.908 and
    four zeros, so rank 4 of 8. B_ζ is dual unitary, its |++⟩ amplitude determinant is (ζ − 1)/4, and on three qubits
    B₁₂ and B₂₃ generate a monomial group of 750 elements.
  - **Loops.** The ring with one nontrivial edge has a one-dimensional section space. The port probability equals
    (1 + cos θ)/2 on 13 sampled phases.
  - **Trines.** On 400 random states: r = Σ q n, Σ q² = 1 + |r|²/3, the single-trine identity, the joint-POVM purity
    formula and the distance identity. The two-trine bounds and their eigenvalues 2, 1 ± |u·v| hold on 300 random
    pairs.
  - **Seams.** The equator transition has winding −1. The cyclic products are (1 + i)/4 and (1 − i)/4 with pair
    probabilities 1/2. Formula (17) and its gauge invariance hold on 50 random triples. Σ(6 − d_v) = 12 holds for the
    icosahedron, octahedron and tetrahedron.
  - **Global states.** The SDP over all three-qubit states gives min of the larger trace-norm error of the two
    marginals = 0.50. Tr_B |Φ⁺⟩⟨Ψ⁺| = X/2. For a toy code c = (a | a, a ⊕ i) with random fixed phases, erasing A and
    decoding on B returns a maximally entangled logical qubit and reference exactly.
  - **Reflections.** On 20 random axes, 2P − I acts on the Bloch ball as 2nnᵀ − I with determinant +1. Conjugation
    gives diag(1, −1, 1). det_ℝ of the realified unitary is 1, and antiunitary realifications have (−1)^d.
    K⁵ = 2P − I with multiplicities 2 and 3. Tr(R_P R_Q) = −0.4721, with conjugate 8.4721. A grid search gives the
    O(2) gap to diag(1, i) as 0.7654 = √(2 − √2), attained at O = I.
  - **Twenty-eight calls.** dim H = 13. All seven P_j are projections, adjacent pairs satisfy P_j P_(j+1) P_j = φ⁻² P_j,
    the braid relations hold and S K_j S† = K_(6−j). The 28-call word equals e^(iχ)S with χ = 4π/5 to 5 × 10⁻¹⁶. On
    25 random words, K_m(p) = conj(K_p), the inverse program matches K_p⁻¹ and differs from K_m(p), and both common
    mirrors keep P(q | p).
  - **Chirality.** K₀ has ζ × 8 and ζ² × 5. The orthogonal configuration with c = −i attains 2 sin(3π/20) = 0.90798.
    400 random principal-angle configurations, a common-angle curve and 60 random unitaries in U(13) all stay above it
    (minimum of the random unitaries 1.46). Y K_P Y = ζ³ K_P⁻¹ on 10 random real projections, and the doubled
    involution holds for all seven gates.
  - **Gram.** Equal Gram matrices are confirmed on random families. The three-state example gives loop products
    (1 ± i)/4, and the best Gram fit over per-state phases misses by 0.897. For the four-cycle, equal loop phase admits
    explicit gauge phases and unequal loop phase does not.
  - **Transpose.** (id ⊗ T)(Ω) = F/d with eigenvalue −1/d for d = 2, 3, 4. Φ* is a channel with fidelity 2/(d + 1)
    on random pure states. The SDP over all channels gives 0.666667, 0.500000 and 0.400000 for d = 2, 3, 4. The η
    range is confirmed at its endpoints. A 40,000-sample Monte Carlo matches the moment (I + F)/(d(d + 1)) for
    d = 3 within 0.01.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The golden intersection point.
  - The braid-defect curve and its zeros.
  - The replacement-defect bars (0 and 0.571).
  - The orbit of the AB⁻¹ eigen-angle and the h-weight bars.
  - The singular-value bars of the three cuts.
  - The trine scatter.
  - The port-probability curve.
  - The |Δ_K| permutation heatmap.
  - The chiral common-angle curve and the random U(13) samples.
  - The SDP transposition fidelities.
- **Illustrative visuals.** These are illustrations, not data:
  - the pentagon of bracketings;
  - the ring of ten powers;
  - the fusion tree and the 2 × 2 F cells;
  - the zigzag Fibonacci path;
  - the unit circles with roots of unity;
  - the address cells;
  - the gate tile with its two cuts;
  - the ring with a hole;
  - the Bloch spheres, charts, trine circles and mirror plane;
  - the nested regions and the A–B–C Bell arcs;
  - the configuration cells;
  - the three carrier boxes and five mode cells;
  - the site row, the 28-call staircase and the program blocks;
  - the eigenvalue stacks;
  - the five-ray graph and the four-cycle;
  - the shrinking Bloch ball.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
