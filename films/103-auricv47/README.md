# 103 · AURIC V47–V48 · SQUARE WEIGHTS, PROMPT RISK AND CHIRAL THREE AXES · AURIC V47–V48 · 平方权重、提示风险与手性三轴

This film continues the versioned AURIC volumes and runs 7:29. It covers two volumes of trureturing at subject
commit `013307094a`:
- `AURIC_EXISTENTIAL_QUANTIFIERS_SQUARE_WEIGHTS_AND_PROMPT_ERROR_RELATIONS_V47.md`, §2–§11;
- `AURIC_ISOTROPY_CHIRALITY_AND_CONDITIONAL_QUANTUM_RECONSTRUCTION_V48.md`, §2–§12.

Version forty-seven asks which relations actually select the square: sums of products only carry the meaning their
scalars give them, normalisation keeps every power, and the square appears once a phase-blind weight must add over
all orthogonal pieces. It then turns to machine learning: summaries have error floors, softmax is a quotient, a
prompt's effect on log risk splits into information and mismatch, and log loss meets the square root through Fisher
geometry. Version forty-eight asks what isotropy and orientation select: a rotation-invariant three-slot response
forces three dimensions, a Clifford product of three axes gives a central complex unit and half-angle spinors, convex
readouts give the half-angle square, loops carry chirality, and a Bell pair inside the whole rules out reflections
as operations.

## The film, scene by scene

- **Scalars and support (V47 §2–§4).**
  - One calculus, (B ∘ A)(x, z) = ⊕_y A(x, y) ⊗ B(y, z) with push-forwards (g ∘ f)_! = g_! f_! (Theorem 3.2), runs on
    the Boolean semiring (existence), ℕ (witness counts), ℝ≥0 (mass) and ℂ (amplitudes).
  - The support map s(t) = [t > 0] keeps 0, 1, + and ×, so Pr(A) > 0 ⇔ ∃x ∈ A : μ(x) > 0 (Theorem 3.3);
    (½, ½) and (9/10, 1/10) have the same support.
  - No map h : ℂ → ℝ≥0 keeps 0, 1, + and ×, since 0 = h(1 + (−1)) = 1 + h(−1) ≥ 1 (Theorem 3.4);
    |a + b|² = |a|² + |b|² + 2 Re(a b*).
  - For every r > 0, Π^(r)_i = |a_i|^r / Σ_j |a_j|^r is normalised, phase-blind and factors over tensor products
    (Proposition 4.1). On a = (√3/2, ½), r = 2 gives (3/4, 1/4) and r = 4 gives (9/10, 1/10). A continuous positive
    multiplicative weight on ℂ^× is |z|^r (Theorem 4.2); det M_z = |z|², but every power of it also multiplies.
- **The square theorem (V47 §5, V48 §2).**
  - On a complex inner-product space with dim ≥ 2, a weight W ≥ 0 on all vectors with W(e^(iθ)x) = W(x),
    W(x + y) = W(x) + W(y) for x ⊥ y and W(e) = 1 for one unit vector is W(x) = ‖x‖² (Theorem 5.2), with no
    continuity, homogeneity or radial assumption. The proof picture: equal norms and a real inner product make
    u = (x + z)/2 and v = (x − z)/2 orthogonal. Born weights p_i = ‖ψ_i‖²/‖ψ‖² follow (Corollary 5.3).
  - If W = ‖x‖^r, two orthogonal unit vectors give 2^(r/2) = 2, so r = 2. In complex dimension one every |z|^r
    survives (Remark 5.4).
  - V48: rotation invariance alone allows every radial weight ‖x‖^r (Proposition 2.2); adding orthogonal additivity
    forces ‖x‖² (Theorem 2.3). Averaging a metric over a compact group gives an invariant one (Theorem 2.1).
- **Five modes and fibres (V47 §6–§7).**
  - For the windows 000, 100, 010, 001, 101 with x = E b₁, y = E b₃, z = E b₂, κ = E(b₁b₃):
    p₁₃ = κ, p₁ = x − κ, p₃ = y − κ, p₂ = z, p₀ = 1 − x − y − z + κ, with nonnegativity exactly
    z ≥ 0, max(0, x + y + z − 1) ≤ κ ≤ min(x, y) (Theorem 6.1). At x = y = ½, z = 0, κ ranges over [0, ½]: the
    endpoints are anti-correlated and correlated laws with identical axes.
  - A summary m recovers a target K exactly when K is constant on every fibre of m; otherwise
    max(TV(K̂, K(h)), TV(K̂, K(h′))) ≥ ½ TV(K(h), K(h′)) (Theorem 7.2).
  - P_η(x, y, z) = [1 + η(−1)^(x+y+z)]/8 has every pair margin ¼ while E(−1)^(X+Y+Z) = η (Proposition 7.3).
- **Softmax quotient (V47 §8).**
  - In standard attention A = softmax_row(QKᵀ/√d_k), replacing W_Q by cW_Q and W_K by W_K/c changes no output,
    while the parameter norm grows without bound (Theorem 8.2).
  - softmax(s) = softmax(t) ⇔ s − t = c𝟏, a bijection from ℝ^d/span{𝟏} onto the open simplex (Theorem 8.3).
  - A ≥ 0 with unit row sums and AAᵀ = I is a permutation (Proposition 8.4).
  - In the white-box model φ(b) = (1, b₁, b₂, b₃, b₁b₃), training on 000, 100, 010, 001 leaves θ and θ + te₁₃
    with the same training loss, while the output at 101 moves by t (§8.1).
- **Prompt risk (V47 §9).**
  - R₀ = H(Y | X) + D₀, R₁ = H(Y | X, Z) + D₁ and R₁ − R₀ = −I(Y; Z | X) + (D₁ − D₀); the risk does not rise exactly
    when D₁ − D₀ ≤ I(Y; Z | X) (Theorem 9.2). A recomputed random example has I = 0.180 nats and D₁ − D₀ = 0.304, so
    the risk rises by 0.124.
  - With X constant, Y a fair bit, Z = Y, q₀ = (½, ½) and a model giving the true answer only ε < ½:
    R₀ = log 2, H(Y | Z) = 0, R₁ = −log ε > log 2 (Proposition 9.3).
  - Z = h(X) gives I(Y; Z | X) = 0, and so does self-generated text with S ⊥ Y | X (Corollary 9.4); a summary
    M = h(X) loses I(Y; X | M) ≥ 0 (Proposition 9.5).
- **Fisher and the square root (V47 §10–§11).**
  - D_KL(p ‖ p + εv) = (ε²/2) Σ v_i²/p_i + O(ε³), and Φ(p) = 2√p maps into the radius-two sphere with
    ‖DΦ v‖² = g_F(v, v) (Theorem 10.3). The five-mode case is a frozen Lean theorem (see evidence notes).
  - Among the power lifts F_r(p) = p^(1/r), a fixed ratio ‖DF_r v‖²/g_F = c holds on the whole simplex only for
    r = 2, c = ¼ (Theorem 10.4); the film plots the binary-simplex ratio for r = 1, 1.5, 2, 3.
  - ds²_FS = ¼ Σ dp_i²/p_i + Σ p_i dθ_i² − (Σ p_i dθ_i)² (Theorem 10.5); for a qubit with p = cos²(ϑ/2),
    ds² = (dϑ² + sin²ϑ dφ²)/4. U_f|x, y⟩ = |x, y ⊕ f(x)⟩ is a permutation, hence unitary (Proposition 11.1).
- **Three axes (V48 §3–§4).**
  - On a real space of dimension at least two, a nonzero trilinear T with T(Ru, Rv, Rw) = T(u, v, w) for all
    R ∈ SO(d) exists only for d = 3, where T = c vol and B(u, v) = c(u × v) (Theorem 3.2);
    (Qu) × (Qv) = det Q · Q(u × v) (Proposition 3.3).
  - An oriented Euclidean plane has a unique orthogonal J with J² = −I and (u, Ju) positive (Theorem 4.1); the
    family g_λ = diag(λ², λ⁻²) keeps the area form but moves J_λ. J_n v = n × v satisfies J_n² = nnᵀ − I
    (Proposition 4.2), and no odd-dimensional real space has J² = −I. The commutant of SO(n), n ≥ 3, is scalars
    (Proposition 4.3).
- **Clifford and spin (V48 §5–§6).**
  - A rotation-respecting unital product on ℝ1 ⊕ ℝ³ is (s, x)(t, y) = (st − a x·y, sy + tx + b x × y); it is
    associative exactly when a = b², and for b ≠ 0 it is the quaternions (Theorem 5.1). The associator is
    (b² − a)[(x·y)z − (y·z)x].
  - In Cl₃,₀, ι = e₁e₂e₃ satisfies ι² = −1, ιx = xι and xy = (x·y)1 + ι(x × y); Cl₃,₀ ≅ M₂(ℂ) through the Pauli
    matrices (Theorem 5.3). The film shows the Pauli multiplication table.
  - U_n(θ) = cos(θ/2)I − i sin(θ/2) n·σ realises the rotation by θ, SU(2) → SO(3) is onto with kernel {±I}, and
    U_n(2π) = −I (Theorem 6.3). ℂ⁵ carries no invertible anticommuting pair (Proposition 6.2).
- **Half-angle readout and uncertainty (V48 §7–§8).**
  - A rotation-invariant compact convex state set is a ball (Proposition 7.1). An affine yes-no readout with
    f_n(n) = 1, f_n(−n) = 0 and values in [0, 1] is f_n(r) = (1 + n·r)/2, which is cos²(θ/2) on pure states
    (Theorem 7.3).
  - (1 + (r·n)³)/2 is legal, complementary and covariant but gives 9/16 at r = n/2 instead of 3/4
    (Proposition 7.4).
  - V_A V_B − C² − D² = (1 − |r|²)|a × b|² ≥ 0 for A = a·σ, B = b·σ (Theorem 8.1), and
    Σ_j Var σ_j = 3 − |r|² ≥ 2.
- **Loops and gluing (V48 §9–§10).**
  - Tr(P_a P_b P_c) = [1 + a·b + b·c + c·a + i a·(b × c)]/4 (Theorem 9.2). The triples |0⟩, |+⟩, |+i⟩ and their
    conjugates have every pair probability ½, yet loops (1 + i)/4 and (1 − i)/4, so no unitary with phases maps
    one triple to the other.
  - Local quarter turns glue along a connected graph exactly when every closed walk has Π ε_e = +1, with exactly
    two global choices (Theorem 10.1); U(1) holonomies remain. The pyramid skeleton (5 vertices, 8 edges) has cycle
    rank 4; the native coupling graph 01, 02, 03, 1–13, 3–13 has rank 1, with the single loop 0 → 1 → 13 → 3 → 0.
- **Bell pairs and composites (V48 §11–§12).**
  - Conjugation acts on the Bloch ball as (r_x, r_y, r_z) ↦ (r_x, −r_y, r_z), but
    (id ⊗ T)(|Φ⁺⟩⟨Φ⁺|) = F/2 has eigenvalue −½ (Theorem 11.1); a trace-preserving Bloch map r ↦ Or is completely
    positive exactly when O ∈ SO(3) (Corollary 11.2).
  - Keeping all single-qubit states, effects and rotations but only Ω_min = conv{ρ_A ⊗ ρ_B} gives no entanglement
    and local-hidden-variable statistics (Proposition 12.1). The Müller–Masanes reconstruction needs further
    postulates on composites, as the volume records.

一部约七分半钟的片子，延续 AURIC 版本系列。第四十七版追问到底是什么选出了平方：同一套“乘积之和”在布尔、计数、非负质量与复振幅上含义不同，支撑只记存在，不存在从复数到非负实数的半环同态；归一化保留每一个幂，(√3/2, ½) 的平方给 3/4、四次方给 9/10；只有当对相位不敏感的权重在全部正交分解上可加时，才逼出 W(x) = ‖x‖²，且 2^(r/2) = 2 迫使 r = 2。五模式由三个轴均值与 κ 精确恢复，κ 的纤维使轴相同而关系相反；摘要的误差下界是 ½ TV，奇偶分布说明两两边缘会漏掉高阶关系。softmax 恰好是模去常数的商，注意力的参数可以无界缩放而输出不变；提示带来的风险变化等于负的条件互信息加失配变化，完全准确的提示也可能把风险从 log 2 抬到 −log ε。KL 在局部等于 ε²/2 乘以 Fisher 型，2√p 是半径为二的球面坐标（五模式情形已在 Lean 中冻结），幂提升中只有平方根给出固定比例 1/4。第四十八版从各向同性出发：非零的旋转不变三线性响应只在三维存在，定向平面恰有一个正向四分之一转；与旋转相容的结合乘法给出四元数，三轴 Clifford 代数的体积元 ι 是居于中心的 −1 平方根，转满一周得到 −1；凸读出必为 (1 + n·r)/2，三次方反例给出 9/16 而非 3/4，不确定性恒等式含有向叉积；三态闭环 (1 ± i)/4 携带手性，拼接复结构需要定向偶性，金字塔骨架与原生耦合图的回路秩为 4 与 1；Bell 对排除局部转置，而单个量子比特并不决定复合系统。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-103-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Digestion status.** At the subject commit neither volume has digestion records: there is no
  `Meta/Digestion/backfill/` directory for either, so no atom of these volumes is covered by a Lean declaration.
- **Lean-frozen project theorem that matches one sentence.**
  `FiveModeFisherImmersion.five_mode_fisher_chart_immersion` (D5/S1/Words/AdmissibleWords) has its state file
  `Golden/Frozen/state/D5/S1/Words/AdmissibleWords/FiveModeFisherImmersion.lean.json` at the subject commit. On the
  open five-mode simplex chart, the map 2√p has Σ (2√p_s)² = 4, its derivative is injective, and the Euclidean
  pairing of its derivative equals the Fisher form Σ u_s v_s / p_s. The sentence "For the five modes, the chart two
  root p lands on the radius-two sphere and pulls back exactly the Fisher form; that is frozen in Lean" in the Fisher
  scene and the opening clause of the finale's evidence line carry the `lean` badge. The digestion ledger does not link
  this theorem to V47; V47 cites the five-mode Fisher square-root geometry from V17 Theorem 6.5. V47's own general
  Theorem 10.3 (all d, with the KL expansion) and Theorem 10.4 are theory.
- **Published results.** V48 §12 cites M. P. Müller and Ll. Masanes, *Three-dimensionality of space and the quantum
  bit*, New J. Phys. 15 (2013) 053040, arXiv:1206.0630v4; the film shows its four postulates as summarised in the
  volume's source note and does not re-derive them. V47 §8 takes the attention formula from Vaswani et al.,
  *Attention Is All You Need*, arXiv:1706.03762v7, §§3.1–3.4 (the softmax scene opens with the `published` badge).
  V47 also cites RMSNorm (arXiv:1910.07467v1) and GPT-3 (arXiv:2005.14165v4); they are named in the ledger only.
- **Classical tools named in the volumes.** Semirings and push-forwards, the Cauchy additive equation, Haar
  averaging and Schur's lemma, the KL–Fisher expansion, the Fubini–Study metric, the Clifford algebra
  Cl₃,₀ ≅ M₂(ℂ) with the Pauli matrices, the double cover SU(2) → SO(3) and the Robertson bound. The second line of
  the Clifford scene carries the `classical` badge.
- **Project inputs from other volumes, badged as theory.** V14 (semiring semantics and the square theorem with full
  unitary invariance); V17 (five-mode probabilities and the Fisher square root); the FIB-atom machine-learning
  white-box volume §5 (the unidentified joint coefficient); the stable relation boundary volume, Proposition 3.1 (the
  three-dimensional closure behind V48 Theorem 3.2); the unordered compatible atom volume §§4–6 (Clifford rule,
  gluing Theorem 5.1, square Theorem 6.1, counter-model Proposition 6.5); V27 (Bargmann loop Proposition 8.5 and
  the Bell obstruction Theorem 9.2). The RRO error floor of V47 §7.1 is not shown in the film.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy) runs 49,093 checks:
  - **Scalars.** Push-forward composition and associativity of relation composition in the Boolean semiring, ℕ, ℝ
    and ℂ on random finite maps; the support homomorphism and s(f_!μ) = ∃_f s(μ); the cross-term identity; the F₂
    representation of all 256 Boolean functions of three bits; Π^(2) = (3/4, 1/4) and Π^(4) = (9/10, 1/10) in exact
    arithmetic; phase, scale and tensor behaviour of Π^(r); det M_z = |z|² and the log semiring.
  - **Square theorem.** The u ⊥ v construction on 300 random equal-norm pairs; Born sums on random orthogonal
    decompositions; 2^(r/2) = 2 only at r = 2 (sympy); the Gram quotient of Proposition 5.5 on 100 random kernels;
    rotation invariance of ‖x‖^r; the average of a random metric over the 24 rotations of the cube is c·I.
  - **Five modes and fibres.** The recovery formula on 2000 random laws and the nonnegativity region on 4000 random
    points; the κ endpoints (0, ½, 0, ½, 0) and (½, 0, 0, 0, ½); Bloch coordinates on 300 states; the ½ TV bound on
    3000 random triples, attained at the midpoint; P_η margins and parity mean in exact arithmetic.
  - **Softmax.** Attention outputs unchanged for c = 1, 2, 4, 8, 16, 32 with parameter norms 3.27, 4.03, 7.64,
    15.2, 30.4, 60.9; shift invariance and the inverse log map on 500 cases; Σa² ≤ 1 on the simplex with equality
    only at vertices; exactly six 0/1 orthogonal row-stochastic 3 × 3 matrices; LayerNorm and RMSNorm invariances;
    the white-box example.
  - **Prompt risk.** The risk decomposition, the decision criterion, the restatement and self-generation corollaries
    and the summary loss on 1500 random joint laws; Proposition 9.3 for five values of ε; the descent inequality of
    §9.1 on 200 random quadratics.
  - **Fisher.** The softmax square lift and the Hadamard example; the KL / quadratic ratio 1.194, 1.039, 1.012,
    1.003, 1.001 for ε = 0.1 … 0.001; the radius-two sphere and Φ pullback on 300 random laws, including the five-mode
    chart on 200 laws; the power-lift ratio ¼ for r = 2 and its failure for r = 1, 1.5, 2.5, 3; the Fubini–Study
    decomposition by finite differences on 200 random states and the qubit form; U_f unitary for 50 random f.
  - **Three axes.** Dimensions of SO(d)-invariant trilinear forms 0, 1, 0, 0, 0 for d = 2…6 and SO(n) commutant
    dimensions 2, 1, 1, 1, 1 for n = 2…6, both from the Lie-algebra null space; volume invariance and the reflection
    rule for random proper and improper O(3) elements; J, the g_λ family, J_n² = nnᵀ − I and the anticommuting
    four-dimensional pair J₀, J₁.
  - **Clifford and spin.** The associator over a = −1…3 with b = 1 (zero only at a = 1), the associator formula, the
    quaternion product and the isomorphism (s, x) ↦ (s, bx); ι = iI, xy = (x·y)I + ι(x × y) on 200 pairs, the eight
    images spanning M₂(ℂ), the Pauli table, the spinor idempotent; Rodrigues' formula, U(2π) = −I and U(4π) = I on 200
    rotations; antiunitary real determinants (−1)^d.
  - **Readout and uncertainty.** Tr(ρ(r)P_n) = (1 + n·r)/2 and the half-angle square on random states; ρ ≥ 0 exactly
    inside the ball; 9/16 versus 3/4; the variance formulas, the identity V_A V_B − C² − D² = (1 − |r|²)|a × b|² and the
    normalised Gram state of Corollary 8.2 on 3000 random cases; Σ Var σ_j = 3 − |r|² on 300 states.
  - **Loops and Bell.** The triple-trace formula on 300 random triples; pair probabilities ½ and loops (1 ± i)/4; loop
    invariance under unitaries and phases; the gluing criterion against direct sign propagation on 400 random signed
    graphs, with exactly two solutions; cycle ranks 4 and 1; holonomy gauge invariance; (id ⊗ T)(Φ⁺) = F/2 with
    spectrum (−½, ½, ½, ½); Choi matrices of random Bloch maps r ↦ Or: minimum eigenvalue 0 when det O = 1 and −1
    when det O = −1 (200 samples); positive partial transposes for 100 random product mixtures.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The support bars; the Π^(r)₁ curve with the r = 2 and r = 4 points.
  - The 2^(r/2) curve; the five κ laws; the parity weights on the cube.
  - The 5 × 5 attention matrix and the parameter-norm bars; the logit and softmax bars.
  - The two stacked risk bars; the −log ε curve.
  - The KL and quadratic curves for p = (0.30, 0.20, 0.15, 0.20, 0.15); the power-lift ratio curves.
  - The invariant-dimension bars; the associator dots; the Pauli table; the cos(θ/2) curve.
  - The two readout curves; 160 sampled uncertainty points.
  - The loop values (1 ± i)/4; the cycle ranks; the F/2 matrix, its spectrum and the Choi sample counts.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the u, v construction and the radial rings;
  - the fibre diagram with h, h′ and the predictor;
  - the X, Z, Y boxes and the binary-slice quarter circle;
  - the parallelepiped, the quarter-turn circle and the normal-plane disc;
  - the Bloch spheres, their arrows and the state triangles;
  - the signed pentagon;
  - the product-state spheres and the Müller–Masanes postulate panel.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
