# 124 · AURIC TYPED BRIDGES II · QUANTUM NETWORKS, HIDDEN MEMORY AND THE RH INTERFACE · AURIC 类型化桥 第二部 · 量子网络、隐藏记忆与 RH 接口

This is part two of two in the AURIC TYPED BRIDGES series and runs about 7½ minutes (7:27). Part one covers the main
volume. This film covers the two continuations at trureturing subject commit `a42f32e9a2`:
- `AURIC_FIB_ATOM_TYPED_BRIDGES_AND_ARITHMETIC_TRIANGLE_RH_PIPELINE_CONTINUATION.md`, §28–31, §33, §37–38, §40, §44
  and §48;
- `AURIC_FIB_ATOM_TYPED_BRIDGES_AND_ARITHMETIC_TRIANGLE_RH_PIPELINE_CONTINUATION_II.md`, §49–50, §53–55, §60 and
  §62–65.

It uses the five-state carrier Σ = {0, 2, 3, 5, 25}, the readout (X, Y, Z), the seam d = (1, −1, 0, −1, 1) and the
Fisher fibre from the main volume (§1, §4, §5). The film keeps every bridge the volumes leave open marked as open. In
particular it does not claim the Riemann hypothesis. The volumes state one conditional theorem about it and no
construction of the map that theorem needs.

## The film, scene by scene

- **Quantum carrier (Continuation §28–30).**
  - Put a five-state law on the diagonal, ι(p) = Σ p_s |s⟩⟨s|. A stochastic kernel W lifts to the channel E_W with
    Kraus operators √W(a|s) |a⟩⟨s|, and E_W(ι(p)) = ι(Wp) (Theorem 29.3).
  - The seam becomes D = diag(1, −1, 0, −1, 1), Hermitian with trace 0, and ι(p_κ) − ι(p_κ′) = (κ − κ′)D
    (Corollary 29.4).
  - On a triangle network with independent edge sources ω_AB ⊗ ω_BC ⊗ ω_CA, local node channels and local POVMs,
    every output P(a, b, c) is a probability law (Theorem 30.3).
  - Classical triangle-local laws are exactly the outputs of diagonal sources read by classical node kernels
    (Theorem 30.4). Only this inclusion is proved. A triangle lift of an arbitrary five-state law is not claimed
    (§36.3).
- **Channels and loops (§31, §33).**
  - A channel applied at every node never raises the trace-norm Dirichlet energy Σ w_e ‖ρ_u − ρ_v‖₁² (Theorem 31.2).
  - Around a closed loop, ‖E_n⋯E_1 − id‖ ≤ Σ ‖E_k − id‖ in the Hermitian 1→1 norm (Theorem 33.3).
  - √R_w is a metric (Theorem 33.5), and raising edge weights never increases R_w (Corollary 33.6). No rule assigns a
    weight to a channel, so reading this as gravity remains a bridge.
- **Curvature and limits (§37–38; Continuation II §54).**
  - If Γ₂ ≥ KΓ at every vertex with K > 0, then λ₁ ≥ K, E(P_t f) ≤ e^(−2Kt) E(f) (Theorem 37.4) and
    R_μ(u, v) ≤ (1/μ_u + 1/μ_v)/K (Theorem 37.5).
  - Independent quantum edges keep QCD(min_e K_e) (Theorem 38.4).
  - A metric-measure limit needs four separately recorded layers: compactness and non-collapse (G), Mosco convergence
    (M), vanishing jumps (L) and stable gradient bounds (K) (Theorem 54.10).
  - A two-point space with Γ₂ = 2Γ keeps CD(2, ∞) while its distance 1/j collapses it to a point (Proposition 54.6).
  - Complete graphs with L_j f = f̄ − f keep spectrum {0, 1}, but their forms tend to the variance, which is nonlocal
    (Proposition 54.8).
- **Fisher budget (§40; Continuation II §53).**
  - On the diagonal, the SLD is diag(d_s/p_s), so F_Q(ρ_κ) = 1/p₀ + 1/p₂ + 1/p₅ + 1/p₂₅ = I(κ) and
    ds_B² = ¼ I(κ) dκ² (Theorem 40.2).
  - Independent nodes add (Theorem 40.3).
  - Every channel contracts the SLD Fisher information (Lemma 53.2, Theorem 53.3).
  - A triangle network's output obeys F_Q(ρ_θ; θ̇) ≤ Σ_e θ̇_e² F_Q(ω_e), and J_out ⪯ diag(J_AB, J_BC, J_CA)
    (Theorem 53.6, Corollaries 53.7 and 53.9).
- **Escape and prediction (§44, §48).**
  - A channel coarse-graining loses relative information, I_O = D(ρ‖π) − D(Oρ‖Oπ) ≥ 0 (44.3–44.4).
  - On the base z = 0, the loss is (1 − Z) D(p_xy|z=0 ‖ p_x|z=0 p_y|z=0). It vanishes exactly when (1 − Z)κ = XY.
  - The future-behaviour equivalence is the greatest fixed point of Φ_O. Its quotient is the coarsest exact predictive
    representation (Theorem 48.2).
  - Two laws in one fibre differ after a word w by (κ − κ′) O A_w d (Theorem 48.4). For one generator,
    O e^(tA) d ≡ 0 exactly when O A^k d = 0 for k = 0 … n − 1 (Corollary 48.5).
- **Hidden memory (Continuation II §55, §60).**
  - For a reversible chain and a readout q, ⟨f, (T_2t − T_t²) f⟩_π = ‖(I − P) S_t f‖²_π. The t² coefficient is
    ‖(I − P) L f‖²_π, and q is strongly lumpable exactly when (I − P)LP = 0 (Theorem 55.2).
  - An autonomous reduced law exists exactly when L(ker P) ⊆ ker P (Theorem 60.1).
  - On the 5040 divisor box (4, 2, 1, 1) with q(a, b, c, k) = (a + k, b, c + k), the sources 7 and 10 share position
    (1, 0, 1). Only 7 reaches the target (1, 0, 2), at rate 1/5. That fibre contributes
    1/(425Z) = 21/34255 with Z = 403/105 (Corollary 55.3).
- **Fisher levels (Continuation II §49).**
  - At a critical point the Hessian is self-adjoint for the Fisher inner product. Its eigenvalues are the local levels
    and the decay rates of the Fisher gradient flow (Theorem 49.2, Corollary 49.3).
  - The mirror 2 ↔ 5 splits ℝ⁵ as (4, 1) and the tangent space as 3 even + 1 odd. The seam d is even.
  - For E_odd = (κₒ/2)(p₂ − p₅)² at q₂ = q₅ = r, the only nonzero level is 2κₒr (Theorem 49.5).
  - The Fibonacci transfer matrix has spectrum φ and −1/φ, with no Euler factors.
- **Prime triplets (Continuation II §50, §62).**
  - For H = (0, 2, 6), the admissible projection has normalised trace 1 − ν_H(ℓ)/ℓ, with ν = 1, 2, 3, 3, …. The traces
    multiply over squarefree moduli (Theorem 50.3).
  - The local factors give 𝔖(H) = 9/2 ∏_ℓ≥5 ℓ²(ℓ − 3)/(ℓ − 1)³. The triplet asymptotic built on it is a conjecture.
  - The irreducible three-body potential has I⁽³⁾(2) = −log 2 and I⁽³⁾(3) = log 4/3. Its ℓ⁻² terms cancel, so the tail
    is O(ℓ⁻³) (62.3–62.5, Proposition 62.2).
- **Pyramids and the RH interface (Continuation II §63–64).**
  - Δ⁴ is a cone over a tetrahedron (64.1). The readout image is the square pyramid X, Y, Z ≥ 0, X + Z ≤ 1, Y + Z ≤ 1
    (64.2–64.4), with fibre κ ∈ [max(0, X + Y − r), min(X, Y)].
  - The fibre endpoints select the two triangulations of the base (64.10–64.11). The mirror fixes the tetrahedron
    conv(e₀, e₃, e₂₅, (e₂ + e₅)/2) (64.12).
  - Re ρ = ½ exactly when |1 − 1/ρ| = 1 (63.7).
  - The Balazard–Saias–Yor equivalence makes RH the vanishing of a Poisson-weighted defect (63.4–63.6).
  - Theorem 63.4 is conditional. If an equivariant map Φ from zeros to Δ⁴ with η(Φ(ρ)) = log|1 − 1/ρ| existed, then
    RH ⇔ Φ(zeros) ⊆ Fix τ. No such map is constructed.
- **Space and time (Continuation II §65).**
  - dR_s/ds = −Σ c_e′ (q_eᵀφ)² (Theorem 65.2). Capacities that drop through dissipation raise the response
    (Definition 65.3).
  - The entropy time τ(t) = D(ρ₀‖σ) − D(ρ_t‖σ) never decreases and adds over steps (Theorem 65.5, Corollary 65.6).
  - A coherent part with [H, σ] = 0 leaves it unchanged (Corollary 65.8).

Not covered: Continuation §27, §32, §34–36, §39, §41–43 and §45–47; Continuation II §51–52, §56–59 and §61.

一部约七分半钟的片子，AURIC 类型化桥系列的第二部（共两部），讲两卷续篇：五态律放进对角密度矩阵，随机读出提升为信道，接缝成为迹零的对角方向；三角网络输出总是概率律，经典 triangle-local 律只是其中的对角子类；信道只会降低迹范数 Dirichlet 能量，闭环缺陷不超过各边偏离之和，有效电阻给出度量但还不是引力；曲率证书给出谱隙、衰减和电阻界，而极限需要紧性、Mosco、跳跃消失和梯度界四层，缺一不可；量子 Fisher 信息在对角上等于经典 Fisher 信息，三角网络输出不超过三个源之和；粗粒化的信息损失与预测商；压缩的两步缺陷在 5040 因子盒上给出 21/34255 的隐藏记忆；Fisher 度量下的能级与镜像分解；素数三胞胎的局部场与 ℓ⁻³ 阶的三体尾项；方金字塔、镜像四面体与 RH 的条件性接口（所需映射尚未构造，RH 未被证明）；最后是静态响应与熵时间两只钟。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-124-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean and digestion status.**
  - None of the three volumes has a digestion record at the subject commit. There are 0 atoms under
    `Meta/Digestion/backfill/` for the main volume and for each continuation, so no atom links them to Lean.
  - Two frozen general theorems carry the `lean` badge, for the sentence that states exactly each theorem. Both state
    files exist at the subject commit.
    - `D5.S3.Quantum.Dynamics.CompressedPowerDefect.compressed_power_defect`
      (`Golden/Frozen/state/D5/S3/Quantum/Dynamics/CompressedPowerDefect.lean.json`). For a coisometry F and a
      self-adjoint S, F S² F* − (F S F*)² = F S Q S F*. The memory scene states this as "two compressed steps minus
      one compressed step squared is the part that leaves and returns".
    - `D5.S3.Arith.GoldenResource.DivisorAssociationFiber.image_card`
      (`Golden/Frozen/state/D5/S3/Arith/GoldenResource/DivisorAssociationFiber.lean.json`). The image of the box has
      (B+1)((A+1)(C+1) + D(A+C+1)) positions, which is 48 for the 5040 box (4, 2, 1, 1).
  - Continuation II §55.3 cites the DivisorAssociationFiber source. Its Blueprint applies CompressedPowerDefect for the
    stationary-path argument. The digestion ledger does not link either theorem to these volumes.
  - The volume's own Theorem 55.2, the generator responses and the value 21/34255 stay `theory`.
  - The continuations also cite the frozen modules NativeUniformResidualRealization (§58) and
    FiveModePredictiveLawGeometry (§61). The film does not use them.
- **Published results, used as external inputs.**
  - The Balazard–Saias–Yor equivalence (63.4–63.6), as cited in the volume via Bui–Lester–Milinovich,
    arXiv:1306.0856. The RH scene badges it as published.
- **Open.**
  - The Hardy–Littlewood triplet asymptotic built on 𝔖(H). The volume calls it a conjectural benchmark.
  - The map Φ of Theorem 63.4, and RH itself.
- **Classical tools named in the volumes.**
  - Kraus representation and the Choi criterion (Proposition 28.3) and the Kadison inequality (31.2, 53.3).
  - Quantum relative-entropy data processing (Theorem 31.5, used as an external finite-dimensional result; badged
    classical in the escape scene).
  - The Thomson principle (33.6), Gronwall (37.4, 38.3) and Cayley–Hamilton (48.5).
- **Project inputs.** The main volume supplies the five-state carrier, the reconstruction and fibre bounds
  (Theorems 1.2–1.3), the Fisher fibre (4.3–4.4) and the classical Fisher contraction (Theorem 5.2). They are badged as
  theory.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following. These are sampled and finite
  checks, not proofs.
  - **Quantum carrier.**
    - 200 random kernels: the Kraus sum is I, the Choi matrix is ⪰ 0 with partial trace I, and E_W(ι(p)) = ι(Wp).
    - 60 random qubit triangle networks, with random two-qubit edge sources, give probability laws with minimum entry
      0.042.
    - 40 classical diagonal networks reproduce the triangle-local formula exactly.
  - **Channels and loops.**
    - 300 random graph fields: the Dirichlet energy never rose.
    - 240 random near-identity qubit loops (norms maximised over the Bloch sphere): ‖Ω‖/Σ‖E_k − id‖ lies between 0.24
      and 0.90.
    - On the unit-weight five-state graph, R(0,2) = 3/4, R(0,25) = 1, R(2,5) = 1 and R(3,25) = 2. √R satisfies the
      triangle inequality.
    - 300 random weight increases never raised a resistance.
  - **Curvature.**
    - Bakry–Émery constants: two-point K = 2 (Γ₂ = 2Γ); complete graphs K₃, K₅, K₈ give K = 0.833, 0.700, 0.625 with
      λ₁ = 1; the cycle C₆ gives K = 0.
    - λ₁ ≥ K, the energy decay and the resistance bound hold in every case with K > 0.
    - QCD(min K) holds for tensor products of depolarising generators.
    - Var(x) → 1/12 on [0, 1].
  - **Fisher budget.**
    - The example law p = (0.5, 0.2, 0.1, 0.1, 0.1) has SLD (2, −5, 0, −10, 10) and F_Q = 27.
    - Additivity holds over three nodes.
    - 400 random channels contract the SLD Fisher information. Unitary channels keep it.
    - In 24 random triangle networks with FIB sources and qubit outputs, the outputs carry coherences and
      J_out ⪯ diag(J_e). The output Fisher information is at most 14 % of the source budget of about 74.
  - **Escape and prediction.**
    - The base defect is zero only at κ* = XY/(1 − Z).
    - Partial-trace data processing holds on 100 random pairs.
    - 40 random systems: partition refinement equals future-behaviour equivalence.
    - A generator A₁ gives O A₁ d = (0.3, −0.1, 0.5). A drain generator A₂ gives A₂ d = −0.5 d and O A₂ᵏ d = 0.
  - **Hidden memory**, in exact rational arithmetic on the 60-state box.
    - The box satisfies detailed balance, has Z = 403/105 and has 48 positions.
    - The responses are 1/5 and 0.
    - (1, 0, 1) is the only contributing fibre, and ‖(I − P)Lf‖²_π = 21/34255.
    - The identity of Theorem 55.2 holds to 10⁻¹².
    - The defect divided by t² tends to 21/34255.
    - The operator identity F S² F* − (F S F*)² = F S Q S F* holds numerically.
  - **Levels.**
    - The mirror is a Fisher isometry with dims (4, 1); o is odd and d is even.
    - g(o, o) = 2/r. At κₒ = 1.7 and r = 0.15 the levels are (0, 0, 0, 0.51).
    - A random mirror-invariant potential splits into a 3 × 3 even block and a 1 × 1 odd block.
    - The Fibonacci spectrum is (1.618, −0.618).
  - **Triplets.**
    - ν and the traces 1 − ν/ℓ match for the first 200 primes, with CRT multiplicativity mod 30, 210 and 2310.
    - 𝔖(H) = 2.858249, computed from primes below 10⁷ with a tail correction.
    - I⁽³⁾(2) = −log 2 and I⁽³⁾(3) = log 4/3. ℓ²κ_H(ℓ) → −3 and ℓ³I⁽³⁾(ℓ) → −2.
    - There are 8543 triplets (p, p + 2, p + 6) with p ≤ 10⁷. The starts mod 7 sit on {2, 3, 4, 6}, about ¼ each,
      apart from the single triplet 5, 7, 11. The conjectural benchmark gives 8591 (numerics only).
  - **Pyramids and RH.**
    - The vertex images, the inequalities, the fibre interval and the endpoint triangulations hold on 500 random laws.
      The circuit relation and the mirror slice also check out.
    - Φ″ equals the Fisher g_κκ.
    - The Poisson mass is 1, and the artanh identity (63.5) holds.
    - The first 12 zeros give |1 − 1/ρ| = 1 to 10⁻²⁵.
    - The truncated Poisson-weighted integral over |t| ≤ 100 is 3.5 × 10⁻⁶. This is numerical and not a proof.
  - **Space and time.**
    - Finite differences match Theorem 65.2 to 10⁻⁶.
    - On a three-qubit triangle network with σ-preserving edge generators, the edge entropy productions are ≥ 0,
      dD/dt = −Σ, and τ rises monotonically to D(ρ₀‖σ) = 0.834.
    - The coherent part alone keeps τ = 0.
    - Discrete steps add.
- **Data drawn on screen.**
  - The D bars.
  - The loop-ratio dots.
  - The resistance values.
  - The K and λ₁ bars.
  - The p and SLD bars.
  - The 24 budget bars.
  - The base-defect curve.
  - The O e^(tA) d curves.
  - The memory-defect curve.
  - The level decay curves.
  - The residue-7 bars.
  - The ℓ²κ_H and ℓ³I⁽³⁾ curves.
  - The angles of the 12 zeros on the unit circle.
  - The truncated Poisson integral.
  - The τ(t) curve.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramids;
  - the matrix grids;
  - the triangle-network glyphs;
  - the nested sets;
  - the loop diagram;
  - the four limit layers;
  - the two-point and complete-graph sketches;
  - the base square;
  - the 60 → 48 dot grids and the 7/10 fibre diagram;
  - the mirror and vector bars;
  - the residue wheels;
  - the off-circle point;
  - the capacity network.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
