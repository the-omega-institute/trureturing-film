# 120 · AURIC FIVE-WINDOW MEMORY III · THE FOUR-PHASE CLASS AND THE HIDDEN PHASE · AURIC 五窗口记忆 第三部 · 四相位类与隐藏相位

This is part three, the last of three, of the AURIC FIVE-WINDOW MEMORY series and runs about 7¼ minutes. It covers
two volumes at trureturing subject commit `b74659b715`:
- `AURIC_FIB_FIVE_WINDOW_HALF_GRAM_CLASSIFICATION.md`, §1–§9 (Lemma 3.1, Lemma 4.1, Theorem 5.1, Corollaries 6.1
  and 7.1, Propositions 8.1 and 8.2);
- `AURIC_FIB_FIVE_WINDOW_HIDDEN_PHASE_READOUT.md`, §1–§11 (Theorem 1.3, Lemmas 3.1–4.2, Corollary 3.3,
  Theorems 5.1, 6.1, 7.2 and 8.3, Propositions 7.1 and 8.2, Corollaries 5.2 and 8.4, Convention 9.1).

Parts one and two showed that at η = 1/2, and only there, five-window channels can refuse to forget. The Gram
volume names every actual complex Gram at one half whose channel remembers. The readout volume takes the alternating
schedule A, B, A, B of part two, hides its terminal parity, and finds the exact error of one readout.

## The film, scene by scene

- **Actual complex Gram (Gram §1–§2).**
  - An allowed half lift satisfies diag Φ(X) = Qᵀ diag X for every complex X (2.1). Its isometry uses eight unit
    vectors α₀, α₁, β₀, β₁, γ₀, γ₁, δ₀, δ₁ in one common environment, with weights 1/√2 on the α, β, γ edges and 1 on
    the δ edges (2.2).
  - Only α₀ ⊥ α₁, β₀ ⊥ β₁ and δ₀ ⊥ δ₁ are forced (2.3). Every other overlap, complex phases included, is free
    inside one PSD Gram. The active Choi block is diag(w) Ḡ diag(w) (2.5).
  - The canonical list is (f₀, f₁, f₀, f₁, c, c, f₁, f₀) with c = (f₀ + f₁)/√2 (2.7). The template condition is
    equality of the whole Gram, G_ab = χ̄_a χ_b G°_ab, with χ built from four free phases A, B₁, C, D₁ (2.8)–(2.10).
    It is not a list of modulus tests.
- **Planes and a pure line (Gram §3–§4).**
  - Lemma 3.1: two orthogonal planes cannot carry faithful densities with diagonal (1, 1, 2, 1, 1)/6 that are
    stationary or swapped. In the U gauge, (P_L ⊗ I)V h_a = A_a V u with A_a ≠ 0 for both planes. Then V u lies in
    (L₀ ⊗ ℰ) ∩ (L₁ ⊗ ℰ) = {0}, although ‖V u‖ = 1. The V gauge is excluded by the supplied FW Lemma 35.1.
  - Lemma 4.1: a pure stationary density with an orthogonally supported stationary density fixes all eight
    vectors. V s = s ⊗ c gives γ₀ = γ₁ = c and the three pair sums. The remaining freedom is one phase β with
    0 = L_t K w_β = ½(1 − β)(1 + β/2) (4.9). On the unit circle this forces β = 1, so the list is the canonical one
    (4.10). Here det(λI − K) = λ³(λ + ½)(λ − 1) and ker(K − I) = ℂs (4.5).
- **The four-phase class (Gram §5, Theorem 5.1).**
  - For every allowed actual complex Gram, five statements are equivalent: (1) nonmixing on M₅; (2) two stationary
    densities; (3) a pure stationary density and an orthogonally supported one; (4) Φ = Ad_D ∘ Φ∘ ∘ Ad_D† for a
    diagonal unitary D; (5) the template (2.9).
  - D is unique up to a scalar, so the class is exactly the four-phase orbit (2.10). Every member has Gram and Choi
    rank 2 and a three-dimensional joint stationary support.
  - Every Gram outside (2.9) mixes, at every rank and phase. Rank above two implies mixing; rank two alone is not
    enough.
- **Limit, label and codes (Gram §6–§7, Corollaries 6.1 and 7.1).**
  - In the canonical gauge, T(X) = P Tr(EX) + M Tr((I − E)X) with E = P + ⅔|d⟩⟨d| and
    d = (e₀ − e₁ − e₃ + e₄)/2. T = (Φ∘² + 2Φ∘³)/3, Φ∘ⁿ − T = (−½)ⁿ⁻²(Φ∘² − T) and
    ‖Φ∘ⁿ − T‖◇ ≤ (4/3)2^(2 − n) (6.2).
  - On all of H the fixed observables span{I, E} are not an algebra, because E² = aI + bE would need 4/9 = 2/3
    along d. Under the Choi–Effros product they are ℂ ⊕ ℂ.
  - Every member keeps a permanent classical label (P versus R₃ ∩ s⊥). Every finite power is non-entanglement
    breaking: the partial transpose has eigenvalue −2^(−n−1) (7.4). The largest exactly correctable code dimensions
    are (k₀, k₁, k₂, k₃, …) = (5, 3, 2, 1, …) (7.1).
- **Rank and phases (Gram §8, Propositions 8.1 and 8.2).**
  - With α₀ = β₀ = γ₀ = δ₀ = f₀ and α₁ = β₁ = γ₁ = δ₁ = f₁ the Gram is legal with rank 2. But
    det(tI − Φ) = t²¹(t − 1)(t + ½)(t² − ½), so it mixes (8.2). It lies outside the orbit since ⟨γ₀, γ₁⟩ = 0.
  - t = (1, i, 1, 1, 1) gives χ = (1, −i, 1, −i, i, 1, 1, 1), ⟨α₀, γ₀⟩ = i/√2 and ⟨γ₀, γ₁⟩ = −i: a nonmixing complex
    Gram. G = I₈ gives the classical mixing channel Ψ(X) = Σ Q_ij X_ii E_j. Both keep the same population law.
- **Hidden terminal phase (Readout §1–§3).**
  - With A = U ∘ C, B = C ∘ U and S = diag(1, −1, 1, 1, 1), the schedule starting with A gives T₂ₘ = C²ᵐ and
    T₂ₘ₊₁ = U ∘ C²ᵐ⁺¹ (2.5). The two limits are Λ₀ = T and Λ₁ = U ∘ T.
  - Theorem 1.3: e_pub = 0, e_mm = (3 − √5)/8 and e_θ = (3 − √(5 + 4(2θ − 1)²))/8.
  - Lemma 3.1: t = Tr(Eρ) is the only surviving number, with Λ_j(ρ) = M_j + t D_j. t = 1 only for P, and t = 0
    exactly on ker E. Corollary 3.3: the optimal codes are ρ₀ = P against any density on the three-dimensional
    ker E, up to swapping labels.
- **Known phase law (Readout §4–§5).**
  - Lemma 4.1: D_θ = θD₀ + (1 − θ)D₁ has spectrum (1 ± δ)/4, −½, 0, 0 with δ = √(5 + 4(2θ − 1)²), and
    ‖D_θ‖₁ = (1 + δ)/2 (4.4)–(4.5).
  - Lemma 4.2 (Helstrom) and Theorem 5.1: e_θ = (3 − δ)/8. The optimal effects are Π_θ + K with 0 ≤ K ≤ P_Zθ. The
    error is zero at θ = 0, 1 and has its unique maximum (3 − √5)/8 at θ = ½ (Corollary 5.2).
- **Worst-case saddle (Readout §6, Theorem 6.1).**
  - For any effect, min_j Tr(F D_j) ≤ Tr(F D_½) ≤ λ* = (1 + √5)/4 (6.2).
  - F* = |f*⟩⟨f*| satisfies S F* S = F* and Tr(F* D₀) = Tr(F* D₁) = λ*, indeed Tr(F* D_π) = λ* for every law π. So
    e_mm = (1 − λ*)/2. The fair law is the unique least favourable one, and the optimal effects are F* + K with
    0 ≤ K ≤ P_Z*.
- **No zero error (Readout §7, Proposition 7.1 and Theorem 7.2).**
  - ⟨s, Ss⟩ = 2/3, Tr(P · SPS) = 4/9 and Tr(P · SMS) = 1/9. For a random phase, Tr(σ₀σ₁) = 2θ(1 − θ)/9 > 0, so no
    readout has zero error. The fixed readout F = P has errors 0 and 1/3.
  - With F*, Pr(F* | ρ, j) = (1 − 2/√5)/6 + ((1 + √5)/4) Tr(Eρ) in both phases (7.5). The endpoint code succeeds with
    probability (5 + √5)/8.
- **Finite stopping times (Readout §8–§9).**
  - T_n(P) = P_j and T_n(M) = M_j for every n ≥ 0, so F* gives exactly e_mm at every pair of stopping times
    (Proposition 8.2).
  - Theorem 8.3: max{0, e_mm − max_j ε_nj/2} ≤ e_mm^fin(n₀, n₁) ≤ e_mm with ε_n = (4/3)2^(2 − n). The lower bound is
    positive once both stopping times are at least 5. Exact finite optima for small times are not determined in the
    volume; the film badges that line as open.
  - Convention 9.1: the public contract pays a terminal parity label. The hidden contracts pay one fixed POVM, either
    {F*, I − F*} or one programmed with θ.

一部约七分钟的片子，AURIC 五窗口记忆系列的第三部：在二分之一处，八个环境向量的整个实际复 Gram 矩阵若要记住信息，就必须逐项符合由四个自由相位构成的模板；两个正交平面不能承载平稳态，一条纯平稳直线迫使 ½(1 − β)(1 + β/2) = 0 从而 β = 1；于是“不混合”恰好等价于“是典范通道的对角共轭”，记得住的类就是一条秩二的四相位轨道，秩二本身并不够；这一类有完整的全输入极限、永久的经典标签、每个有限步都存在的纠缠以及码维数 5、3、2、1。再把第二部交替调度的终端奇偶藏起来：极限上只剩一个数 t = Tr(Eρ)，已知相位律时错误为 (3 − δ)/8，最坏相位时一个对称投影 F* 给出鞍点与精确错误 (3 − √5)/8，零错误不可能，但 t 仍可读出；有限停止时刻的最优值落在一条随 n 收窄的区间里。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-120-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit neither volume has digestion records (0 atoms in
    `Meta/Digestion/backfill/auric-fib-five-window-half-gram-classification/` and
    `…/auric-fib-five-window-hidden-phase-readout/`).
  - No Lean declaration covers any statement shown. The Gram volume itself states that it makes no Lean-kernel
    assertion.
- **Published results, used as external inputs.** The finale badges them as published; the classify and limit
  scenes cite them on screen.
  - Burgarth, Chiribella, Giovannetti, Perinotti and Yuasa, *Ergodic and Mixing Quantum Channels in Finite
    Dimensions*, arXiv:1210.5625v3 (Lemmas 1–2, Corollaries 1–2, Theorem 5, Remark 4).
  - Carbone and Jenčová, *On period, cycles and fixed points of a quantum channel*, arXiv:1905.00857v1
    (Propositions 5–6, Corollary 2).
  - Blume-Kohout, Ng, Poulin and Viola, *Information-preserving structures*, arXiv:1006.1358v1 (Theorem 5).
  - Knill and Laflamme, *A Theory of Quantum Error-Correcting Codes*, arXiv:quant-ph/9604034v1 (Theorem 3.2).
- **Classical tools named in the volumes.** The Helstrom rule for equal-prior binary discrimination (the spectrum
  scene and the finale badge it as classical), Cauchy–Schwarz, Jordan decomposition, Cesàro averages and the
  finite-dimensional saddle-point method.
- **Project inputs, not re-derived here.** These come from the earlier five-window volumes and are badged as theory:
  - `AURIC_FIB_FIVE_WINDOW_QUANTUM_MEMORY.md`: Definition 2.2, Theorems 4.1–4.2, §§32–35 (support and peripheral
    reductions, rank-four compression, the 2 + 3 and V-type exclusions), Definition 17.2, Theorems 18.1, 18.3,
    19.1–19.2, 20.2 and 21.2 (canonical channel, P, M, E, limit, NPT witness, restricted codes);
  - `AURIC_FIB_FIVE_WINDOW_SWITCHED_MEMORY.md`: Definition 2.1, Theorem 4.1 (the schedule identity starting with A),
    Proposition 4.2, Theorem 5.1, Corollary 5.2 and Proposition 5.3 (E, T, the recurrence and the diamond bound).
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory. The exact
  finite optima for small stopping times are not determined in the readout volume and carry the open badge.
- **Recomputed for this film.** An independent Python script (`verify120.py`, 75 checks) recomputes the following
  with numpy, exact sympy arithmetic and cvxpy with Clarabel.
  - **Gram model.** The canonical list (2.7) gives K₀, K₁ of (2.6); the channel is CPTP and obeys (2.1) on all 25
    matrix units; the canonical Gram has rank 2; on a random Gram the active Choi block is diag(w) Ḡ diag(w) and all
    other Choi rows vanish; p = (1, 1, 2, 1, 1)/6 is stationary and Q⁴ > 0.
  - **Template orbit.** 20 random four-phase members have Gram conj(χ_a) χ_b G°_ab, channel Ad_D Φ∘ Ad_D†, rank 2
    and eigenvalue 1 twice. χ(1, i, 1, 1, 1) = (1, −i, 1, −i, i, 1, 1, 1), with ⟨α₀, γ₀⟩ = i/√2 and
    ⟨γ₀, γ₁⟩ = −i. 200 sampled nonscalar diagonal unitaries all change Φ∘.
  - **Classification, sampled.** 280 random allowed Grams of ranks 2–8 (40 per rank) all have a simple eigenvalue 1,
    with second modulus between 0.50 and 0.81. So all mix. Perturbed template Grams mix, with mean |λ₂| rising from
    0.617 (perturbation 0.3) to 0.99994 (perturbation 0.003).
  - **Lemma 4.1, exact.** det(λI − K) = λ³(λ + ½)(λ − 1); ker(K − I) = ℂs; L_t K w_β = ½(1 − β)(1 + β/2) with
    t = −β. On the unit circle the factor vanishes only at β = 1 (minimum 0.026 elsewhere on a 2° grid).
  - **Limit.** E has eigenvalues 1, 2/3, 0, 0, 0; Φ∘†(P) = Φ∘†(E) = E; T = (Φ∘² + 2Φ∘³)/3; the recurrence holds for
    n = 2…11; exact det(tI − Φ∘) = t²⁰(t − 1)²(t + ½)³ and Φ∘²(Φ∘ − id)(Φ∘ + ½ id) = 0; |d⟩⟨d| feeds P with weight
    2/3; E² is not in span{I, E}; E ∘ E = E under the Choi–Effros product.
  - **Diamond norm.** The Watrous SDP gives ‖Φ∘² − T‖◇ = 1.3333 = 4/3, so the bound (6.2) is attained. The input
    |e₃⟩⟨e₃| already shows it: Φ∘² and Φ∘³ send it to orthogonal supports.
  - **Memory.** The partial-transpose minimum is exactly −2^(−n−1) for n = 0…8. H₊ is a three-dimensional one-step
    Knill–Laflamme code. A two-dimensional full-input two-step code exists. R₃ is not one-step correctable.
    Identities (7.5)–(7.6) hold, and P_a and |c₀⟩⟨c₀| lie in the two-step error-product span. The upper bounds
    k₂ ≤ 2 and k₃ ≤ 1 are argued in the volume and were not searched numerically.
  - **Proposition 8.1, exact.** det(tI − Φ) = t²¹(t − 1)(t + ½)(t² − ½), one unit-circle eigenvalue. G = I₈ gives
    Ψ(X) = Σ Q_ij X_ii E_j, which mixes.
  - **Readout model.** T₂ₘ = C²ᵐ and T₂ₘ₊₁ = U C²ᵐ⁺¹ on random complex inputs (n ≤ 8);
    Λ_j(X) = M_j Tr X + D_j Tr(EX); 200 random densities have t ∈ [0, 1] and Λ_j(ρ) = M_j + t D_j; ker E has
    dimension 3.
  - **Spectra and optima.** D_θ has spectrum (1 ± δ)/4, −½, 0, 0 and trace norm (1 + δ)/2 at 51 values of θ, and
    matrix (4.3) matches. An SDP over all effects gives the minimax error 0.095492 = (3 − √5)/8. 25 random codes give
    (1 − |ξ|λ*)/2 ≥ e_mm. 100 random codes and laws give the Helstrom error ½ − |ξ|(1 + δ)/8 ≥ e_θ.
  - **Saddle.** S F* S = F*; both signals equal λ* = 0.8090, and Tr(F* D_π) = λ* for every π; P_Z* D_j P_Z* = 0. All
    2541 sampled effects satisfy min(s₀, s₁) ≤ (s₀ + s₁)/2 ≤ λ*.
  - **Zero error and readout.** ⟨s, Ss⟩ = 2/3, Tr(P · SPS) = 4/9, Tr(P · SMS) = 1/9 and Tr(σ₀σ₁) = 2θ(1 − θ)/9.
    F = P has errors 0 and 1/3. p_P = (5 + 11/√5)/12 = 0.8266 and p_M = (1 − 2/√5)/6 = 0.0176. The affine law (7.5)
    holds for 300 random densities in both phases. Success is (5 + √5)/8 = 0.9045.
  - **Finite times.** T_n(P) = P_j and T_n(M) = M_j for n = 0…11. The lower bound e_mm − ε_n/2 is positive exactly
    from n = 5 (ε₅/2 = 0.0833 < 0.0955). |w₀⟩⟨w₀| is not fixed and Cⁿ(|w₀⟩⟨w₀|) → M.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The canonical Gram grid and the Q matrix.
  - The |½(1 − β)(1 + β/2)| curve around the unit circle.
  - The |λ₂| dots for the 280 random Grams and the template members.
  - The spectrum bars of E, the diamond-norm curve with its SDP dots, the partial-transpose bars and the code bars.
  - The eigenvalues of (8.1) and of the canonical channel, and the edge phases of the (1, i, 1, 1, 1) example.
  - The sampled values of t.
  - The D_θ eigenvalue curves and the e_θ curve.
  - The (s₀, s₁) scatter of 847 of the 2541 sampled effects, with F* and F = P.
  - The Tr(σ₀σ₁) curve and the affine readout with 60 random densities per phase.
  - The finite-time interval band.
- **Illustrative visuals.** These are illustrations, not data:
  - the pentagon of the five legal windows;
  - the four phase dials;
  - the orthogonal target lines with the moving V u arrow;
  - the A, B schedule strip with the hidden-parity curtain;
  - the two overlapping support ellipses.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
