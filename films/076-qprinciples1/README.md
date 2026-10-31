# 076 · AURIC QUANTUM PRINCIPLES I · FIVE MODES, COMPLEX STRUCTURE AND COHERENT RECORDS · AURIC 量子原理 第一部 · 五模式、复结构与相干记录

This is part one of the four-part AURIC QUANTUM PRINCIPLES series and runs about 7½ minutes (7:27). It covers
`AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION.md` at subject commit `f15ddb4c42`, drawing its ten
content scenes from §§1–12 of the volume. Parts II–IV cover the volume's three continuations.

The film starts from the five legal modes of three sites on a path. It asks which added principles turn this atom
into a complex quantum system, and which quantum rule each principle buys. The title card refers to the six
conditions A1–A6 of Definition 12.1 and the common model of Theorem 12.2.

## The film, scene by scene

- **Five-mode atom (§1).**
  - The independent sets of the path 1 — 2 — 3 are ∅, {1}, {2}, {3} and {1, 3}. The project labels are N, [2], [3],
    [5] and [2,5] (Definition 1.1). A label fixes no length, probability or gate angle.
  - Five modes, recursion, nonnegative record weights, a static history graph and an internal observer do not choose
    complex quantum theory. A classical simplex and real quantum theory both keep these structures (Theorem 1.3).
  - Normalised classical, real and complex states have 4, 14 and 24 real parameters. A pure complex ray has 8
    (Proposition 1.4).
- **Four-corner relation (§2, §12).**
  - Every readout f on the five modes expands uniquely as
    f = f₀ + (f₁ − f₀)x + (f₃ − f₀)y + (f₂ − f₀)z + J_f·xy, with J_f = f₁₃ − f₁ − f₃ + f₀ (Theorem 2.1).
  - With f₀ = 0, f₁ = 2, f₂ = 3, f₃ = 5 the coefficient is J_f = f₁₃ − 7. The joint value 7 gives J_f = 0, and the
    product 10 gives J_f = 3 (Example 2.2).
  - The means X = p₁ + p₁₃, Y = p₃ + p₁₃ and Z = p₂ leave exactly one free number, κ = p₁₃, with
    max(0, X + Y + Z − 1) ≤ κ ≤ min(X, Y). The blind direction is (1, −1, 0, −1, 1). An expectation is fixed by the
    means exactly when J_f = 0 (Theorem 2.3).
  - Three sites is the shortest path window in which single-site means miss a joint relation (Theorem 12.3).
- **Clifford composition and transport (§4).**
  - If directions compose by ab + ba = 2⟨a, b⟩1, then ω = uvn satisfies ω² = −1 and ω† = −ω, ω is central, and
    Cl₃,₀ ≅ M₂(ℂ) as real *-algebras (Definition 4.1, Theorem 4.2). The corner p = (1 + n)/2 carries j = ωp with
    j² = −p (Proposition 4.3).
  - Five matrix units E_st together with F_st = E_s0 j E_0t give 50 independent real elements. They generate exactly
    M₅(ℂ), and J = Σ F_ss satisfies J² = −1 and is central (Definition 4.4, Theorem 4.5).
  - In odd dimension no real L has L² = −I, and no two invertible complex matrices anticommute (Proposition 4.7).
- **Born rule from all effects (§5).**
  - A valuation that is nonnegative, normalised and additive on the full effect set 0 ≤ E ≤ I is μ(E) = tr(ρE) for a
    unique density matrix ρ. It satisfies |μ(E) − μ(F)| ≤ ‖E − F‖_op. On pure states it gives the squared overlap
    (Theorem 5.3, Busch's full-effect theorem in finite dimension).
  - Frame consistency alone is not enough. On a qubit, μ(P_n) = (1 + n_z³)/2 has a fitting Bloch vector
    r = Σ n_iz³ n_i with ‖r‖ ≤ 1 for every orthonormal frame. At n_z = 1/2 it gives 9/16, while the state forced by
    the standard axes gives 3/4 (Example 5.4).
- **Records and references (§6, §7).**
  - If a positive kernel is conserved across all branches, cross terms included, then the continuations descend to
    linear maps M_o with Σ M_o†M_o = I. Keeping the outcome, V ψ = Σ M_o ψ ⊗ |o⟩, is an isometry (Definition 6.1,
    Theorem 6.2).
  - Equal ordinary branches do not fix the coherent lift. The records V₊z = z|+⟩ and V₋z = z|−⟩ give the same branch
    weights, but the later effect |+⟩⟨+| gives 1 and 0 (Proposition 6.5).
  - Transposition is positive and trace-preserving. On half of a maximally entangled pair it gives Swap/2, which has
    eigenvalue −1/2 (Theorem 7.4).
  - A CPTP map with a CPTP inverse is a unitary channel (Theorem 7.5).
- **Native witness (§8).**
  - The native wait is U(t) = e^(−itK). K couples ∅ to 1, 2 and 3, and couples 13 to 1 and 3. Each PXP flip keeps the
    legal space (Proposition 8.1).
  - Protocol A waits twice. Protocol B waits, reads all five modes, forgets the result and waits again. The midpoint
    states have the same five populations.
  - Yet p_A(∅) = 1 − 12t² + O(t⁴) and p_B(∅) = 1 − 6t² + O(t⁴), so p_B > p_A for small t > 0 (Theorem 8.2). This
    refutes the population summary, not every classical model with extra hidden state.
- **Control and phase (§3, §8).**
  - Three independent flips R₁, R₂ and R₃ generate exactly D·SO(5)·D† with D = diag(1, i, i, i, 1) (Theorem 8.3).
  - The Hodge compression T = Q_S ⋆ has T†T = P₂ + P₁₃, and U_rel = T + P₀ + |3⟩⟨1| + |1⟩⟨3| is a unitary
    involution with determinant 1 (Theorem 3.3).
  - U_rel lies outside that group even up to a global phase. Every deterministic protocol from the native wait, full
    read and stop, without quantum bypass or extra quantum storage, stays at trace distance at least 1/2 from it
    (Theorem 8.4).
  - The fixed gate S* = e^(iπP₁₃/2) has determinant i. R₃(−π/2) S* R₃(π/2) S* = diag(1, 1, i, i) on the base. With
    R₁ and R₃ it gives every SU(4) on the base, and adding R₂ gives all of SU(5). The finite words are exactly the
    unitaries whose determinant is 1, i, −1 or −i (Theorem 8.6). A continuous phase e^(itP₀) instead gives all of
    U(5) (Theorem 8.5).
- **Relation phase (§9).**
  - Under U_f(t) = e^(−it diag f) the relation phase Φ = θ₀ + θ₁₃ − θ₁ − θ₃ advances by tJ_f, and no population
    changes. Single-site phase shifts leave Φ fixed. On the base the gate is a product of local gates exactly when
    tJ_f ∈ 2πℤ, and otherwise it entangles |++⟩ (Theorem 9.1).
  - The base state (|00⟩ + |01⟩ + |10⟩ − |11⟩)/2 is maximally entangled, with every mode at 1/4 (Corollary 9.2).
  - For ψ_θ = (|0⟩ + |1⟩ + |2⟩ + |3⟩ + e^(−iθ)|13⟩)/√5 a fixed pulse R₁(α) gives
    ⟨N_x⟩ = 2/5 + sin 2α · sin θ / 5, while N_y and N_z stay at 2/5 and 1/5 (Proposition 9.3).
- **Seams and composition (§9).**
  - Two adjacent three-site windows allow 21 of the 25 mode pairs, so they cannot hold ℂ⁵ ⊗ ℂ⁵ isometrically. A zero
    separator site gives the isometric code ι(|s⟩ ⊗ |t⟩) = |s 0 t⟩ (Theorem 9.5).
  - Products of local effects determine every joint state in the complex tensor model but not in the real one. The
    states ρ± = (I ± εT)/4 with T = J₀ ⊗ J₀ agree on every real local product, yet tr(Tρ±) = ±ε (Theorem 9.6).
- **What settles (§11).**
  - Wait, read all five modes and repeat. With M_ij = |U_ij|² and η = ‖M − J₅‖, the state averaged over all past
    results satisfies D_tr(ρ_n, I/5) ≤ η^(n−1). For the native wait, η(2/3) < 2/3 and η(1) < 23/50.
  - The full record keeps the total variation of the first reads exactly, and with probability one the reading never
    becomes constant (Theorem 11.10).

一部约七分半钟的片子，AURIC 量子原理系列的第一部：从路径上三个位置的五个合法模式出发，说明裸结构不选定复量子论（经典、实、复三种态分别需 4、14、24 个实参数）；四角系数 J_f = f₁₃ − f₁ − f₃ + f₀ 正是三均值遗漏的唯一关系 κ；Clifford 复合给出平方为 −1 的中心元，经矩阵单位运输得到 M₅(ℂ) 与同一个 i；全效果可加迫出 Born 规则，而只在标架上相容的赋值在 n_z = 1/2 处给出 9/16 而非 3/4；正核守恒给出记录等距，参考系统迫出完全正性（转置给出本征值 −1/2），合法可逆过程必为酉；原生等待中人口相同的两态给出 1 − 12t² 与 1 − 6t²；三个独立翻转只到达 D·SO(5)·D†，金字塔的 Hodge 对偶交换与原生协议距离至少 1/2，一个固定相位门 S* 便到达全部 SU(5)；四角驱动关系相位并产生纠缠；两个相邻窗口只允许 21 个模式对，需要分隔位；最后，反复读出时边缘趋稳，完整历史保持首读差别，读数永不定格。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-076-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the volume's digestion directory holds 151 atoms, all residual-open.
  - No Lean declaration covers any statement shown.
- **Published results, used as external inputs.** The Born scene and the finale badge them as published.
  - Busch's full-effect theorem: P. Busch, Phys. Rev. Lett. 91, 120403 (2003), arXiv:quant-ph/9909073.
  - Invertible quantum operations: A. Nayak and P. Sen, arXiv:quant-ph/0605041. The volume proves the
    same-dimension unitary case.
- **Classical tools named in the volume.** The Clifford scene's first line and the references line are badged as
  classical.
  - The Clifford–Pauli correspondence Cl₃,₀ ≅ M₂(ℂ) and matrix units.
  - The Choi–Kraus representation and the transpose example (Watrous, *The Theory of Quantum Information*, ch. 2).
  - The Hodge star in three dimensions (Bouchard, MATH 215, §4.8).
  - The exact finite-word method for compact Lie groups (D'Alessandro, arXiv:quant-ph/0111133).
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the static compatibility fiber volume, Proposition 45 and Theorem 64.1 (control group and fixed-phase words);
  - the static seams volume, Theorems 31.3 and 32.2 (Hodge compression and the real-frame obstruction);
  - the predictive memory volume, Proposition 16.2 (native witness);
  - the relational bundle volume, §§3, 16–18 (function algebra and relation phase);
  - the measurement-boundary continuation I, WR1.1–WR1.3 (read stability). Its spectral certificates are
    recomputed below.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, scipy, sympy) runs 59 checks.
  - **Atom.**
    - The path 1 — 2 — 3 has exactly five independent sets.
    - The state dimensions are 4, 14 and 24, and a pure ray has 8.
    - Path windows of length 1, 2 and 3 have 2, 3 and 5 modes against 2, 3 and 4 mean terms.
  - **Corner.**
    - The four-corner expansion is checked symbolically.
    - Example 2.2 gives J_f = c − 7.
    - 4000 random distributions satisfy the fibre interval and the expectation formula.
    - For X = 0.45, Y = 0.40 and Z = 0.25 the interval is [0.10, 0.40], and the expectation slope is 3.
  - **Clifford.**
    - In the Pauli frame, ω² = −1 and ω is central.
    - The eight words have real rank 8.
    - The 50 elements E_st and F_st have real rank 50, and J² = −1 is central.
  - **Born.**
    - 500 random samples satisfy the trace and continuity identities.
    - 5000 random frames have fitting vectors with maximum norm 0.9993.
    - The values 9/16 and 3/4 are exact.
  - **Records and references.**
    - 200 random kernels confirm Σ M†M = I and the record isometry.
    - The partially transposed Bell projector is Swap/2, with eigenvalues (−1/2, 1/2, 1/2, 1/2).
    - The linear inverse of the depolarising channel with λ = 0.6 has Choi eigenvalue −1/3.
  - **Witness.**
    - The PXP restrictions equal H₁, H₂ and H₃, and (K²)₀₀ = 3.
    - At t = 10⁻³ the short-time coefficients are 11.99995 and 5.99998.
    - p_B > p_A on the grid over (0, 0.8].
    - At t = 0.3 the midpoint populations are 0.756, 0.077, 0.082, 0.077 and 0.008 in both protocols.
  - **Control.**
    - The reachable Lie algebras have dimensions 10, 15 and 24.
    - The S* words give diag(1, 1, i, i) and diag(1, i, 1, i), and det S* = i.
    - The ⋆-closure of the five-mode image is 8-dimensional, T†T = P₂ + P₁₃, and U_rel is an involution with
      determinant 1.
    - No phase among 721 makes D†U_rel D real.
    - Over 3000 random real states, max ⟨y, σy⟩ = 0.430 ≤ 1/2.
    - 200 random native protocols stay real and at trace distance at least 1/2.
    - The two orders R₁R₂ and R₂R₁ send |0⟩ to −i|2⟩ and −i|1⟩.
  - **Relation phase.**
    - 500 random samples confirm the phase law.
    - The concurrence equals |sin(tJ_f/2)|.
    - 300 random samples confirm Proposition 9.3.
  - **Seams.**
    - 21 of 25 pairs are legal, and 25 of 25 with the separator.
    - Real local products span 9 of 10 joint directions, and complex ones span 16 of 16.
    - T is invisible to 500 random real local products.
  - **Read stability.**
    - η(2/3) = 0.66303 and η(1) = 0.45001.
    - The marginal distance stays below η^(n−1) for n = 1…12.
    - The history total variation equals the first-read total variation, by exact enumeration for 20 pairs at
      depth 4.
    - A sampled path of 60 reads changes value at least 20 times.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The 4, 14 and 24 bars.
  - The fibre bars and the expectation lines.
  - The μ(P_n) and Born curves.
  - The partial-transpose eigenvalue bars.
  - The witness curves and midpoint populations.
  - The Lie-dimension bars and the fidelity bar.
  - The concurrence and readout curves.
  - The seam grid and the local-tomography bars.
  - The η curve, the decay dots and the sampled label strip.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and its ring;
  - the path graph and bit cells;
  - the logical square;
  - the three axes;
  - the E/F matrix-unit grid;
  - the diagonal grid;
  - the Bloch sphere with its rotating frame;
  - the branching diagram and record bars;
  - the protocol strips;
  - the roots-of-unity circle;
  - the phase dials;
  - the amplitude grid;
  - the bit strings.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
