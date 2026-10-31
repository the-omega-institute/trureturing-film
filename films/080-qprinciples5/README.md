# 080 · AURIC QUANTUM PRINCIPLES V · STATIC SLICES, RETURN RECORDS AND PHASE READOUTS · AURIC 量子原理 第五部 · 静态切面、返回记录与相位读口

This is part five of the AURIC QUANTUM PRINCIPLES series and runs about 7¼ minutes (7:16). It covers
`AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION.md`, §14–§36, at trureturing subject commit
`e159083f61`. Part one (film 076) drew on §1–§12 of the same volume, and parts two to four followed its three
continuations. This part returns to the second half of the main volume: static slices without a global clock,
observers that keep their records, a balanced five-mode channel with a return instrument, and phases that the native
menu cannot read.

## The film, scene by scene

- **Static slices and loop phases (§14–§16).**
  - The finite downward-closed parts of one compatible configuration form a directed set: any two have their union as
    a common extension. Incompatible successors have no common upper bound, so directed limits stay inside one
    compatible sector (Proposition 14.3).
  - A positive kernel has a unique minimal Hilbert representation, and a finite set of expressions spans a space whose
    dimension is its Gram rank (Support derivation 15.2). A bare graph decides nothing: K ≡ 1 and K = δ give
    dimensions 1 and n.
  - Pairwise checks are not enough. The 3 × 3 matrix with unit diagonal and off-diagonals −3/4 has every 2 × 2 block
    with spectrum 1/4, 7/4, yet the whole matrix has eigenvalue −1/2 on (1, 1, 1).
  - For unit vectors around a loop with ⟨v_j, v_j+1⟩ = r_j u_j, 0 < r_j ≤ 1 and |u_j| = 1,
    |1 − ∏ u_j| ≤ Σ √(2(1 − r_j)) (Proposition 16.2). A four-loop with phases +1, +1, +1, −1 and every r_j ≥ 1 − ε
    therefore needs ε ≥ 1/8.
  - A connected transport graph has a common reference exactly when every closed loop multiplies to the identity. With
    coherent control the relative phase shows in p₊ = (1 + Re⟨U_pψ, U_qψ⟩)/2.
- **Balanced channel (§18).**
  - The code is B = (u, v, z) with u = (e₀ + e₃)/√2, v = (e₁ + e₄)/√2 and z = e₂. The Kraus operators are
    K₀ = |u⟩⟨e₀| + |v⟩⟨e₂|/√2 + |z⟩⟨e₄| and K₁ = |u⟩⟨e₁| + |v⟩⟨e₂|/√2 + |z⟩⟨e₃| (Definition 18.1). On the code the
    channel is T(X) = ½(UXU† + UWXW†U†), with U and W permutations.
  - spec T = {1 [2], −1/2 [3], 0 [4]}. On all of M₅ the characteristic polynomial is t²⁰(t − 1)²(t + 1/2)³, and
    G²(G − I)(G + I/2) = 0.
  - The fixed densities form a segment τ_p = pP + (1 − p)Q/2, not a single equilibrium. Every input converges to
    τ̂_Tr(Jρ), where J = |χ⟩⟨χ| + (2/3)|d⟩⟨d|, and ‖Gⁿ − E_G‖◇ ≤ (4/3)·2^(2−n) for n ≥ 2 (Definition 18.2).
  - Every τ̂_p has the five populations (1/6, 1/6, 1/3, 1/6, 1/6). Yet ‖τ̂₁ − τ̂₀‖₁ = 2, and the effect |χ⟩⟨χ| separates
    the endpoints.
- **Record tree (§19).**
  - Native labels: A_j τ̂_p A_j† = τ̂_p/2 for every θ and p. Every native word of length n has probability 2⁻ⁿ, for
    every code input and every reference (Theorem 19.2).
  - The supplied readout L± = (K₀ ± K₁)/√2 gives q± = (1 ± p)/2. For 0 < p < 1 both branches leave the fixed family
    and return to τ̂_2p/(1+p) and τ̂₀, while the average stays τ̂_p. At p = 1/3 this is 2/3 and 1/3, with return
    parameters 1/2 and 0.
  - With the return instrument J± = E_G ∘ Ad L±, Pr(+ⁿ) = p + (1 − p)2⁻ⁿ, and a word with a minus has probability
    (1 − p)2⁻ⁿ. After +ⁿ the protected weight is 2ⁿp/(1 − p + 2ⁿp). The unique infinite law is
    p δ(+∞) + (1 − p) Bernoulli(1/2)^ℕ.
- **Reset limits (§21).**
  - With G_ε = (1 − ε)G + εR₀ and R₀(X) = Tr(X) τ̂₀: G_εⁿ = (1 − ε)ⁿGⁿ + [1 − (1 − ε)ⁿ]R₀, and
    ‖G_εⁿ − Gⁿ‖◇ = 2[1 − (1 − ε)ⁿ] ≤ 2nε (Theorem 21.2).
  - The limits do not commute: depth first gives lim_ε lim_n G_εⁿ(τ̂₁) = τ̂₀, while ε first gives
    lim_n lim_ε G_εⁿ(τ̂₁) = τ̂₁. The mode τ̂₁ − τ̂₀ has eigenvalue 1 − ε, so there is no uniform gap.
- **Answer tables (§22, §25).**
  - ρ₀ = |0⟩⟨0| and ρ₊ = |+⟩⟨+| share the eigenvalues (1, 0) but give 1 and 1/2 on |0⟩⟨0| (Application 25.2).
  - Transposing every state and effect keeps every commuting slice and every Tr(ρA). Yet (XY)ᵀ = iZ while XᵀYᵀ = −iZ,
    so the word moments on ρ₀ are i and −i. On a Bell pair, partial transposition gives Swap/2 with eigenvalue −1/2.
  - In the Mermin–Peres square (25.2) every row and the first two columns multiply to I, and the last column to −I. So
    no context-free ±1 assignment exists.
  - For CHSH, deterministic answer tables give at most 2 and quantum theory gives 2√2. A PR box reaches 4 with uniform
    marginals, so no-signalling alone does not select quantum theory (Support derivation 22.1).
- **Stable concepts (§29).**
  - Fix(G†) = span{I, J}, and J has eigenvalues 1, 2/3, 0, 0, 0. So a stable effect aI + bJ reads a + b·p_ρ, with
    p_ρ = Tr(Jρ). Also 0 ≤ aI + bJ ≤ I exactly when 0 ≤ a and a + b ≤ 1 (Application 29.2).
  - J² − J = −(2/9)|d⟩⟨d| ≠ 0, so J is not a projection. The return product (aI + bJ) ∘ (cI + eJ) = acI + (ae + bc + be)J
    is the coordinatewise product on (a, a + b), a copy of ℂ² (29.6).
  - The input |d⟩⟨d|, which lies outside the code, has p = 2/3 and limit τ̂_2/3.
- **Sign worlds (§30).**
  - T±(X) = B P₊XP₊B† + (f†Xf) w± w±† with w± = √(1 − t²) c ± i t p₀, and S± = G T±. Then T₊†(F) = T₋†(F) for every
    real symmetric F, and every J_s is real (Application 30.2).
  - ‖S₊ − S₋‖◇ = 4t√(1 − t²), and the best reconstruction from the common data has worst error 2t√(1 − t²) (30.2).
  - E_y = B h h† B† with h = (g + ia)/√2 gives 1/2 ± t√(1 − t²), which is 1 and 0 at t = 1/√2 (30.3). E_y has imaginary
    cross terms and lies outside the original real menu.
- **Response rank (§32).**
  - If the effects and states come from one d-dimensional model, the response matrix has rank at most d². With entry
    errors ε, a singular value σ_k(H_obs) > ε√(mn) forces d ≥ ⌈√k⌉ (32.4).
  - On the three-level code, ρ_j = I/3 + H_j/8 and F_i = I/2 + H_i/4 give the 9 × 9 response (32.5)–(32.6) with
    det H = (1/16)⁸. Its smallest singular value is at least γ = β/((1 + √2)(1 + 2√2)) with β = 1/16, so entry errors
    below γ/18 rule out every two-level model.
- **Native readout (§35).**
  - The native menu has waits V(s) = e^(−isK), full rank-one reads, Stop, record feedback and input-free randomness.
    Every permitted record effect is real symmetric in the D frame, D = diag(1, i, i, i, 1).
  - The target has (D†E_yD)₀₁ = (√3 − √6)/24 − i√2/48. The inputs σ± = Dη±η±†D† with η± = (e₀ ± ie₁)/√2 have equal
    D-frame real parts, so every permitted record has one law on them, yet Tr[E_y(σ₊ − σ₋)] = √2/24. So no native
    protocol realises E_y on all inputs (Proposition 35.2, part 1).
  - Wait τ = 1/100, read all five labels, then Stop: p₀₊ − p₀₋ = t√(1 − t²)·d(τ) > (3/250) t√(1 − t²) for every
    0 < t < 1, with d′(0) = √3 + √6/3 (35.3, 35.9).
- **Polar ray (§36).**
  - ker A = ℝz with z = (e₂ − e₅)/√2. The polar factor J̃_p = A((5 + √2)I + A²)/(√2 n), with n = √(5 + 2√2), restricts
    to a complex structure J_p on E = z⊥ that commutes with every wait. The squared rotation frequencies are
    (5 ± √17)/2 (Proposition 36.2, part 1).
  - x = e_N and y = J_p x lie on one internal complex ray, but an immediate full read gives p_x = (1, 0, 0, 0, 0) and
    p_y = (0, 1, (1 + √2)², 1, 0)/(5 + 2√2), so TV = 1. Any model that gives the ray one record law is off by at
    least 1/2 (36.4–36.5).
  - A read effect descends to the ray exactly when w_N = w₃ = w₂₅ = (w₂ + w₅)/2, and then F_w = λ I_E (36.6). A full
    read moves (ρ₂₂ + ρ₅₅)/2 ≤ 1/2 onto the dark line, and f = (e₂ + e₅)/√2 reaches 1/2 (36.7–36.8).
  - Whether native readouts, phase comparisons and juxtaposition force a global complex structure is left open
    (§24, interface 3). The scene badges it as open.

第五部回到主卷 §14–§36 的后半部分，片长约七分钟：同一相容配置中的静态切面构成有向族，但逐对正的核不必整体正（非对角 −3/4 给出本征值 −1/2），闭路相位乘积受 Σ√(2(1 − r)) 限制；五模式平衡通道的码内谱为 1、−1/2、0，全输入特征多项式为 t²⁰(t − 1)²(t + 1/2)³，平衡态是一整段 τ_p 且人口全同；原生标签不含信息，另供读口在分支上打破平衡，返回仪器给出精确的无界记录树；小复位使深度与扰动两个极限不交换；Mermin–Peres 方阵与 CHSH 说明答案表失效；稳定概念只剩两个数，返回乘法是 ℂ²；两个只差一个符号的世界在所有实效果上同律，diamond 距离却是 4t√(1 − t²)；共同响应的奇异值证书排除二能级模型；原生菜单不能在全部输入上实现虚相位效果，却能以 (3/250)t√(1 − t²) 的间隙区分两个符号世界；最后，等待的极分解给出的内部复射线会被一次完整读取以总变差 1 拆开，原生操作能否强制全局复结构仍是开放问题。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-080-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the volume has 151 digestion atoms, all residual-open; none is absorbed-closed.
  - No Lean declaration covers any statement shown.
- **Classical tools and published results named in the volume.** The answer-table scene and the finale badge them as
  classical.
  - The Mermin–Peres square: Mermin, PRL 65, 3373; Cabello, arXiv:0808.2456.
  - CHSH and contextual gluing: Abramsky–Brandenburger, arXiv:1102.0264.
  - The Choi–Kraus criterion: Watrous, *Theory of Quantum Information*, Theorems 2.22 and 2.26.
  - GNS: Fewster–Rejzner, arXiv:1904.04051.
  - Polar decomposition with kernel: Moretti–Oppio, arXiv:1611.09029.
  - The Choi–Effros product (JFA 24, 156–209).
- **Project inputs from other volumes, not recomputed as theorems here.** These are badged as theory:
  - the fixed family, spectrum and diamond bound of five-window quantum memory §§17–19;
  - Fix(G†) and the return product of the Half-Gram classification, Corollary 6.1;
  - the native labels and the L instrument of the environment-record volume, Theorems 2.2 and 20.1;
  - the sign worlds of predictive waves §29;
  - the real-frame record closure of the static compatibility fiber, §9.3, and Proposition 11.7 of this volume;
  - the dark line and the rotation frequencies of the second-order relation volume, Theorem 63.2.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory. The open
  question about a global complex structure is badged as open.
- **Recomputed for this film.** An independent Python script (numpy, sympy, cvxpy with Clarabel) makes 121 checks.
  - **Kernels and loops.**
    - The −3/4 matrix has spectrum (−1/2, 7/4, 7/4), and each 2 × 2 block has (1/4, 7/4).
    - The loop bound holds on 3000 random loops.
    - For the four-loop (+, +, +, −) an SDP gives the exact largest common overlap 1/√2. So the exact limit is
      ε = 1 − 1/√2 ≈ 0.293, above the necessary 1/8. A complex version with random phases of product −1 gives the
      same value.
  - **Balanced channel.**
    - K₀†K₀ + K₁†K₁ = I, K_jB is as stated, and T is as stated.
    - spec T = {1 [2], −1/2 [3], 0 [4]}.
    - Exactly in sympy, the characteristic polynomial is t²⁰(t − 1)²(t + 1/2)³ and G²(G − I)(G + I/2) = 0, while
      G(G − I)(G + I/2) ≠ 0.
    - E_G = (G² + 2G³)/3 matches the closed formula with J.
    - The SDP diamond norm ‖G² − E_G‖◇ = 1.3333, so the bound (4/3)·2^(2−n) holds with equality.
    - The populations of τ̂_p are (1/6, 1/6, 1/3, 1/6, 1/6) for p = 0, 0.1, …, 1.
  - **Record tree.**
    - Every native word of length 4 has probability 2⁻⁴ on entangled code inputs.
    - q± = (1 ± p)/2, with return limits τ̂_2p/(1+p) and τ̂₀.
    - At p = 1/3 the return tree gives Pr(+ⁿ) = 1/3 + (2/3)2⁻ⁿ and the stated posteriors for n ≤ 6.
  - **Reset.**
    - The SDP diamond distances are 0.5420 at (ε, n) = (0.1, 3) and 0.1922 at (0.02, 5), both equal to 2[1 − (1 − ε)ⁿ].
    - TV(G_εⁿ τ̂₁, τ̂₁) = 1 − (1 − ε)ⁿ for n ≤ 300.
  - **Answer tables.**
    - The Mermin–Peres products are I, I, I by rows and I, I, −I by columns.
    - None of the 512 sign tables satisfies all six products.
    - CHSH gives 2, 2.8284 and 4.
  - **Stable concepts.**
    - Fix(G†) has dimension 2 and J has eigenvalues 1, 2/3, 0, 0, 0.
    - J² − J = −(2/9)|d⟩⟨d|.
    - The return product is (a, a + b)·(c, c + e) on 20 random complex samples.
    - Tr(J|d⟩⟨d|) = 2/3.
  - **Sign worlds.**
    - T₊†(F) = T₋†(F) on random real symmetric F.
    - The SDP gives ‖S₊ − S₋‖◇ = 4t√(1 − t²) at t = 0.25, 0.5, 0.707 and 0.9, and the midpoint is at 2t√(1 − t²).
    - Tr[E_y S±(ff†)] = 1/2 ± t√(1 − t²).
  - **Response rank.**
    - det H = 2.33 × 10⁻¹⁰ = (1/16)⁸.
    - σ₉ = 0.0119 ≥ γ = 0.0068.
    - With random entry errors below γ/18 = 3.8 × 10⁻⁴, σ₉ stays above 9ε on 300 samples.
  - **Native readout.**
    - (D†E_yD)₀₁ and |Tr[E_y(σ₊ − σ₋)]| = √2/24 = 0.0589.
    - Wait-then-read effects are real in the D frame.
    - d′(0) = 2.5486 and d(1/100) = 0.02548 > 3/250. The stated probability gap holds for six values of t.
  - **Polar ray.**
    - The polar-factor identities hold, and the squared frequencies are 0.4384 and 4.5616.
    - p_y = (0, 0.1277, 0.7445, 0.1277, 0), TV = 1.
    - The descending weights form exactly the stated two-dimensional family.
    - The dark-line mass formula holds on 100 random inputs.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The eigenvalue bars of the −3/4 matrix, the phase-budget curve with the 1/8 and 0.293 marks.
  - The spectrum dots of T, the population bars and the SDP diamond-norm dots.
  - The record-tree masses and the Pr(+ⁿ) and posterior curves.
  - The reset TV curves.
  - The CHSH bars.
  - The eigenvalue bars of J.
  - The sign-world distance and probability curves with the SDP dots.
  - The 9 × 9 response heat map and its singular values.
  - The native record probabilities and the d(s) curve with its lower bound.
  - The polar-ray distributions and the before/after dark-line masses.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the slice ellipses and event graph, and the four-loop square;
  - the mode and code diagram, the 25 tiles and the moving point on the τ_p segment;
  - the readout split arrows;
  - the weight bar and the limit boxes;
  - the qubit spheres and the Mermin–Peres grid;
  - the (a, a + b) square and the code box;
  - the world boxes, the factorisation blocks and the d² tile grids;
  - the protocol strip;
  - the rotation planes and dark line;
  - the open-question box.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
