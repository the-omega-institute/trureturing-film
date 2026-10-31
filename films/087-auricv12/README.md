# 087 · AURIC V12–V14 · FINITE RESOLUTION, EXISTENTIAL QUANTIFIERS AND QUANTUM RECORDS · AURIC V12–V14 · 有限分辨率、存在量词与量子记录

This film continues the versioned AURIC series after V10 and runs about 7½ minutes. It covers two volumes of
trureturing at subject commit `8babc2ea85`:
- `AURIC_FINITE_RESOLUTION_AND_COMPLETE_RECURSIVE_OBSERVATION_THEORY_V12.md`, §1–§12;
- `AURIC_EXISTENTIAL_QUANTIFIERS_CIRCUIT_SEMIRINGS_AND_QUANTUM_RECORDS_V14.md`, §2–§12.

The V12 half asks what finite, noisy readings can certify about every later continuation. The V14 half asks
when a probability behaves like an existential quantifier, and what quantum records change.

## The film, scene by scene

- **Finite tables (V12 §1–§3).**
  - On a compact parameter space with α d* ≤ ‖P(ϑ) − P(ϑ′)‖∞, any fit within η of the best residual satisfies
    ‖P(ϑ̂) − P(ϑ*)‖∞ ≤ 2ε + η and d*(ϑ̂, ϑ*) ≤ (2ε + η)/α (Theorem 2.1).
  - From an approximate table, H is certified invertible when ‖Ĥ⁻¹‖ε_H < 1 (Theorem 3.1). Word products obey
    ‖B̂_w b̂ − B_w b‖ ≤ M̂ε_b + nM̂Mδ‖b‖, linear in the word length n (Theorem 3.2). Single-step norms cannot be
    powered: B′ = [[0, t], [1/t, 0]] has ‖B′‖ = t but B′² = I.
  - Example 3.5: process A always prints 0; process B prints L zeros, then 1. All words of length ≤ L agree, the table
    H = [1], H₀ = [1], H₁ = [0], b = c = [1] has condition number 1, and the word 0^(L+1) has probability 1 versus 0.
  - Proposition 1.1 is noted on screen: classical states on ℕ with n ↦ n + 1 satisfy every composition rule, so
    recursion alone does not force quantum semantics.
- **Complete instruments (V12 §4, §12).**
  - Example 4.2: Φ = (X/2, ZXZ/2) and Ψ = (ZXZ/2, X/2) have the same effects (I/2, I/2) and the same average
    channel, yet their complete instruments are at distance 1 (input |+⟩).
  - Theorem 4.3: testing P₁ or Q₁ = I − P₁ and then P₂ on v₀ gives the four records
    (xy, x(1 − y), z + xy − 2 Re B, 1 − x − z − xy + 2 Re B) with B = K₀₁K₁₂K₂₀ the ring product. Destructive
    rejection sees only the |K_ij|² (Proposition 4.2).
  - Theorem 4.4: on the five-mode menu (unitaries, rank-one readouts, classical feedback, Stop; no ancilla or
    reset), every implementation of the Lüders flag channel has half-diamond error at least (r − 1)/(2r − 1) = 3/7
    for r = rank Q = 4. Theorem 4.5: with exact effects the sharp value is 1 − 1/r = 3/4. The unconstrained optimum
    between 3/7 and 3/4 is open (§12.4, question 1).
  - Theorem 12.1: one ancilla bit with U = P ⊗ X_A + Q ⊗ I_A realises the Lüders instrument exactly; the Choi rank
    of PXP + QXQ is 2.
- **Error budgets (V12 §5–§6).**
  - Theorem 5.1: D(Ω_N^Φ, Ω_N^Ψ) ≤ min{1, d₀ + Σ ε_k} for N adaptive calls with memory in the common carrier.
  - Example 5.2: stopping with chance ε per call gives distance 1 − (1 − ε)^N, which equals ε·E min(T, N), so the
    visit-probability bound (Corollary 5.2) is attained. The coherent rotation e^(−iθZ) gives sin(Nθ), so the
    coefficient one in the sum bound cannot be lowered.
  - Theorem 6.1: D(A/p, B/q) ≤ min{1, δ/max(p, q)}. Example 6.1: a branch of probability r with total distance rt has
    conditional distance t, so a tiny total error can become distance 1.
  - Proposition 6.2: "within ε" is not transitive; steps of ε join 0 to 1. The screen also notes the contracting
    summary bound limsup e_N ≤ (ε + η)/(1 − κ) (6.3) and that complete records do not contract strictly
    (Proposition 6.3).
- **Rulers and repair (V12 §7–§8).**
  - Lemma 7.1: ‖J_Δ‖₁ ≤ ‖Δ‖◇ ≤ d‖J_Δ‖₁ for the normalised Choi matrix. Theorem 7.2:
    ½‖Δ‖◇ ≤ ½ Σ |δp_ij| ‖F_i‖₁ ‖D_j‖₁ with the dual bases of input and effect frames.
  - Example 7.3: the effects I/2, (I + εX)/2, (I + εY)/2, (I + εZ)/2 still span, but separate |0⟩ and |1⟩ (trace
    distance 1) by at most ε.
  - Example 8.1: the transpose is nonnegative on every product vector, but J_T = S/d has eigenvalue −1/d.
  - Theorem 8.2: if J ⪰ −νI, then Φ_cp = (Φ + tD)/(1 + t) with t = mdν is a channel and ½‖Φ_cp − Φ‖◇ ≤ md²ν.
- **Order, sources and specimens (V12 §9–§11).**
  - Theorem 9.3: K adjacent swaps of incomparable events cost at most Kκ, yet appended records AB and BA are at
    distance 1.
  - Theorem 10.1 and Example 10.1: with compactness and closed fibres every thread has a source; without it,
    q_n(x) = min(x, n) on the positive integers has the thread x_n = n with no common source.
  - Theorem 11.1: m copies of two pure states with overlap c give minimal error (1 − √(1 − c^(2m)))/2, so error ≤ ε
    exactly when m ≥ log(1/(4ε(1 − ε)))/(−2 log c). On the project's tree pairs c_n = 1 − δ/w_n with
    δ = (√φ − 1)² and w_n = 2(n + φ²), so the copies needed grow linearly in n (11.3).
- **Weighted quantifier (V14 §2, §3, §12).**
  - Theorem 2.2: Q_μR > 0 exactly when some w in the support has R(w) = 1, and Q_μR = 1 exactly when all do.
  - Proposition 12.1: F is satisfiable exactly when p_F = #SAT(F)/2^m > 0, but an estimate with error
    η ≥ 2^(−m−1) cannot separate 0 from 2^(−m).
  - Theorem 3.3: the support map a ↦ 1[a ≠ 0] is a semiring homomorphism exactly when a + b = 0 ⇒ a = b = 0 and
    ab = 0 ⇒ a = 0 or b = 0. Booleans, counts and nonnegative weights pass; ℂ has no such homomorphism, since
    h(0) = h(1 + (−1)) = h(1) ∨ h(−1) = 1. The screen also shows the A ∨ A caveat of §3.1.
- **Coarse records (V14 §4–§5).**
  - Proposition 4.1: p = (1, a, b, c, dac)/Z_d is a bijection onto the open five-state simplex, with
    d = p∅p₁₃/(p₁p₃); the three-weight model is d = 1. The scan matrix K_HL = B(c)B(b)B(a) is shown.
  - Theorem 5.2: ℓ_f(A) ≤ μ(A) ≤ u_f(A), δ_f(A) = μ(f⁻¹(f[A]) \ A), and δ_f(A) = 0 exactly when A is a union of
    whole fibres. Theorem 5.3: δ_(g∘f)(A) = δ_f(A) + δ_g(f[A]).
  - For surjective f, f[Ω \ A] = Y \ f[A] ⇔ A = f⁻¹(f[A]); this is the frozen Lean theorem
    `image_complement_iff_saturated`.
- **Support quantifier (V14 §6–§7).**
  - Example 6.1: two Hadamards send |0⟩ to |1⟩ along paths of amplitude 1/2 and −1/2, which cancel; measuring in
    between gives 1/2.
  - Theorem 7.2: supp Φ(ρ) = span_a K_a(supp ρ); F_(Φ+Ψ) = F_Φ ∨ F_Ψ and F_(Φ∘Ψ) = F_Φ ∘ F_Ψ. Theorem 7.3:
    Tr[EΦ(ρ)] > 0 exactly when F_Φ(supp ρ) is not orthogonal to supp E. Example 7.4: span|0⟩ and span|+⟩ meet only
    in 0 but are not orthogonal. Proposition 7.6: equal support images force U = e^(iθ)V. The right adjoint of
    Theorem 7.5 is shown on screen.
- **Golden gate (V14 §8).**
  - On span(|000⟩, |010⟩), K = ζ[I + (ζ − 1)P] with ζ = e^(3πi/5) and P the rank-one projection with entries φ⁻¹,
    φ^(−3/2), φ⁻². Its eigenvalues are ζ and ζ², so K¹⁰ = I.
  - Theorem 8.1: ten coherent steps give probability 0 of reading 010; recording the basis after every step gives
    T = [[φ⁻², φ⁻¹], [φ⁻¹, φ⁻²]] and probability (1 − φ⁻³⁰)/2.
- **Record Gram (V14 §9–§11).**
  - Theorem 9.1: probabilities add for every amplitude vector exactly when the record Gram matrix is I.
  - Theorem 9.2: one copy forces Re D_ij = 0; two independent copies force D_ij² real part 0, so D is diagonal
    (Diósi's condition).
  - Theorem 10.1: a positive kernel D gives the Hilbert space ℂ^M / ker D of dimension rank D, unique up to unitary.
    Theorem 10.2: a unitary-invariant, orthogonally additive, normalised weight is ‖v‖².
  - Example 10.4: D = (1/7)[[1, 2, 0], [2, 1, 0], [0, 0, 1]] gives every event a nonnegative value and total 1, but
    c = (1, −1, 0) gives −2/7. The screen also shows the Sorkin relation of Theorem 10.3 and Proposition 11.1.

一部约七分半钟的片子，接续 V10 之后的 AURIC 版本系列，前半覆盖 V12，后半覆盖 V14。V12 部分：紧模型族上的有噪拟合误差不超过 2ε + η，更新误差随字长线性增长，而条件数为一的完美有限表仍可能错过未来；效果与平均通道都相同的两个仪器，完整距离可以是一，相干拒绝读出三射线环积；五模菜单上 Lüders 旗标通道的误差至少为 3/7，效果精确时尖锐值为 3/4，二者之间的最优值仍未决，一个辅助比特即可精确实现；完整递归的误差相加，稀有分支会把极小的总误差放大为距离一，近邻关系不传递；尺子退化时对偶基范数不可省略，转置映射说明正性不等于完全正性，不低于 −ν 的 Choi 矩阵可修复为通道；交换记录 AB 与 BA 的距离为一，没有紧性时相容线程可能没有共同来源，有限标本区分所需份数随树对线性增长。V14 部分：概率为正当且仅当支撑中存在见证，可满足性的精度门槛，支撑映射何时是半环同态；五模权重中的优势比 d；粗记录的存在上值、全称下值与沿粗化相加的饱和缺陷，其集合形式是一条冻结的 Lean 定理；完全正映射的支撑量词；黄金门相干十步回到原态，而逐步记录时读出 010 的概率为 (1 − φ⁻³⁰)/2；最后是记录 Gram 矩阵、Diósi 条件、正核重构、平方律与 −2/7 反例。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-087-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One is used, for one clause.
  - `D5/S3/ConceptDynamics/Negation/DirectImageComplementSaturation.lean`, theorem
    `image_complement_iff_saturated`: for surjective f, f '' Aᶜ = (f '' A)ᶜ ↔ A = f ⁻¹' (f '' A). Its state file
    `Golden/Frozen/state/D5/S3/ConceptDynamics/Negation/DirectImageComplementSaturation.lean.json` exists at the subject
    commit, and V14 §1 and §5 cite this source file.
  - The coarse-records scene and the finale badge only this set equivalence as lean. It is not linked to a V14 atom by
    a coverage edge. The weighted statements (bracket, defect, cocycle) are badged as theory.
  - Digestion at the subject commit: V12 has 110 atoms and V14 has 84 atoms, all residual-open.
- **Published results, used as external inputs.**
  - Diósi's two-copy condition: L. Diósi, Phys. Rev. Lett. 92, 170401 (2004), arXiv:quant-ph/0310181. V14
    Theorem 9.2 is a finite Gram proof of it. The record-Gram scene and the finale badge it as published.
  - Semiring methods for circuits: Goodman, *Semiring Parsing*, Computational Linguistics 25(4) (1999); Kimmig, Van den
    Broeck and De Raedt, *Algebraic Model Counting*, arXiv:1211.4475; Darwiche, arXiv:cs/0003044.
  - The Sorkin relation of V14 Theorem 10.3: Sorkin, *Quantum Mechanics as Quantum Measure Theory*, arXiv:gr-qc/9401003.
- **Classical tools named in the volumes.**
  - Two-state discrimination (Watrous, *The Theory of Quantum Information*, Chapter 3, Theorem 3.4). The specimen
    formula of V12 Theorem 11.1 is badged classical.
  - The Choi criterion (Choi 1975, DOI 10.1016/0024-3795(75)90075-0), trace and diamond norms (Watrous, Chapter 3) and
    the strategy distance (Gutoski, arXiv:1008.4636).
- **Project inputs, not recomputed here.**
  - The tree-pair overlaps c_n = 1 − δ/w_n with δ = (√φ − 1)² and w_n = 2(n + φ²), from
    `FIB_ATOM_ORIGINAL_BOUNDARY_FINITE_SPECIMEN_READOUT.md` §§2–4. The copy counts and δ = φ² − 2√φ are recomputed.
  - The fixed golden gate K = ζ[I + (ζ − 1)P] from `AURIC_FIXED_GOLDEN_GATE_AND_BRAID_COMPATIBILITY_ZH.md`; its
    properties are recomputed below.
  - The CSA saturation criterion (Proposition 10), and Theorem 49.1 of the coherent-reconstruction continuation, of
    which V12 Theorem 4.4 is a self-contained proof.
- **Theory volumes, argued but not kernel-checked.** Everything else is badged as theory. The gap between 3/7 and 3/4
  is badged open (V12 §12.4, question 1).
- **Recomputed for this film.** An independent Python script makes 45,469 assertions. Diamond norms use the Watrous
  SDP with cvxpy and Clarabel.
  - **Tables (V12 §2–§3).**
    - 3000 noisy fits on a 41 × 41 compact grid all satisfy the 2ε + η bound; the largest ratio is 0.985.
    - Theorems 3.1, 3.2 and 3.4 hold on 400, 150 and 100 random cases. B′ with t = 3 has norm 3 and square I.
    - Example 3.5 with L = 6: the table reconstruction gives p(0ⁿ) = 1 for all n, while B gives 0 at n = 7.
  - **Instruments (V12 §4, §12).**
    - Example 4.2: the complete instruments are at half-diamond distance 1.
    - Theorem 4.3 holds on 300 random ray triples in dimensions 2–4, and B is invariant under rephasing. With
      x = y = z = 1/4 and |B| = 1/8, the −+ record moves from 0.0625 to 0.5625 as arg B goes from 0 to π.
    - Proposition 4.2: a destructive adaptive protocol gives identical record laws for two triples whose coherent
      records differ.
    - min over w of max{w, (1 − w)(r − 1)/r} equals (r − 1)/(2r − 1) for r = 2…8.
    - Exact distances of the mixtures w·(no readout) + (1 − w)·(full readout) to Λ for r = 4 are 0.75 at w = 0,
      0.517 at w = 3/7 and 1 at w = 1, all above the bound. They use a symmetry reduction that matches the full SDP
      at r = 2.
    - Identity versus complete dephasing gives 1 − 1/r for r = 2…5. U = P ⊗ X + Q ⊗ I reproduces Λ exactly, and
      PXP + QXQ has Choi rank 2.
  - **Budgets (V12 §5–§6).**
    - For ε = 0.1 and N ≤ 20, the stop example gives 1 − (1 − ε)^N = ε E min(T, N).
    - sin(Nθ) is confirmed by SDP at θ = π/40 for N = 1, 5, 12 and 20. Proposition 5.3 holds on 12 random qubit cases.
    - Theorem 6.1 holds on 500 random cases. Example 6.1 holds for r = 0.5 … 0.01.
    - The net bound is (1 + 2/0.1)³ = 9261. The recursion bound (6.2) holds on 50 random 8-step runs, and the
      geometric limit is 0.1 for κ = 0.8, ε + η = 0.02.
  - **Rulers (V12 §7–§8).**
    - Lemma 7.1 holds on 12 random channel differences. Theorem 7.2's reconstruction and bound hold on 8 cases.
    - In Example 7.3 the dual-basis norm sum is 9.46/ε (9.46 at ε = 1, 473 at ε = 0.02).
    - J_T = S/d has eigenvalues ±1/d for d = 2, 3, and is nonnegative on 2000 sampled product vectors. A finite-net
      counterexample was built.
    - 14 random repairs are channels, at distance 0.017–0.153 for ν = 0.009–0.085, below md²ν.
  - **Order, sources, specimens (V12 §9–§11).**
    - Theorems 9.1 and 9.2 hold on 50 random cases each. AB and BA records are at distance 1, and one swap costs at
      most κ on 6 cases. The min(x, n) thread is compatible at every level.
    - The specimen error formula holds for c = 0.3 … 0.97 and m ≤ 6, with a random ancilla.
    - δ = 0.0740. For error 0.01 the copies needed are 114 at n = 0, 550 at n = 10 and 1859 at n = 40, and (11.3)
      stays below the exact requirement for n ≤ 40.
  - **Quantifiers and circuits (V14 §2–§4, §12).**
    - Theorem 2.2 holds on 2000 random cases. The support map is a homomorphism for ℕ and ℝ≥0 and fails for ℂ.
    - A smooth deterministic decomposable circuit matches brute-force weighted model counts on 50 random weightings.
    - K_HL was multiplied out symbolically. Proposition 4.1's inversion holds on 500 random points, and d = 1 matches
      conditional independence.
    - For m = 10 and one witness, p = 2⁻¹⁰ and direct sampling misses the witness with probability 0.376 after 1000
      draws.
  - **Coarse records (V14 §5).**
    - Theorems 5.2–5.5 hold on 3000 random finite cases.
    - The display example gives ℓ = 0.35, μ(A) = 0.67, u = 0.80 and δ_f = 0.13. After coarsening, u = 1, ℓ = 0 and
      δ_(g∘f) = 0.33 = 0.13 + 0.20.
  - **Supports (V14 §6–§7).**
    - The Hadamard paths are ±1/2, and measuring in between gives 1/2.
    - Theorems 7.2, 7.3 and 7.5 hold on 200 random Kraus maps. Example 7.4 and Proposition 7.6 were checked.
  - **Golden gate (V14 §8).**
    - K is unitary with eigenvalues ζ and ζ², of order exactly 10. T has entries φ⁻² and φ⁻¹, and ν = −φ⁻³.
    - The T¹⁰ entry is (1 − φ⁻³⁰)/2 = 0.49999973 (also exact in sympy). The coherent probabilities are 0, 0.618,
      0.854, 0.090, 0.326, 0.944, …, 0.
  - **Record Gram (V14 §9–§11).**
    - Theorem 9.1 holds on 200 random record sets, with the Rayleigh and η(M − 1) bounds.
    - The Diósi example with t = 0.3 has one-copy cross term 0 and two-copy cross term −0.18.
    - The Sorkin sum vanishes. Example 10.4 gives event values 1, 1, 1, 6, 2, 2 and 7 sevenths, and −2/7 for
      c = (1, −1, 0). Proposition 11.1 holds on 50 cases.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - p(0ⁿ) for processes A and B, and the four-record bars.
  - The mixture distances with their bound curve, and the 3/7 and 3/4 bars.
  - The stop and rotation dots, and the rare-branch bars.
  - The dual-norm curve, the transpose eigenvalues and the repair dots.
  - The specimen copies with the (11.3) curve, and the miss-probability curve.
  - The saturation example, the golden-gate curves, the Diósi bars and the Example 10.4 bars.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the model-image blob with its fit points, and the telescoping cells;
  - the instrument boxes and the arg B dial;
  - the ε-chain on [0, 1] and the Bloch circle;
  - the event DAG and the min(x, n) staircase;
  - the world weights in the quantifier scene and the semiring table;
  - the five-mode pyramid, the Hadamard path diagram and the 45° rays;
  - the unit circle with tenth roots of unity, and the Gram grids.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
