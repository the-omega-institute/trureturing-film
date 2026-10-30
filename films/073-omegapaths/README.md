# 073 · AURIC Ω VII · SO5 PATHS, FOURTEEN-DIMENSIONAL RECOVERY AND HECKE · AURIC Ω 第七部：SO₅ 路径、十四维恢复与 Hecke

This is the seventh film in the AURIC Ω series and runs about 7¼ minutes. It covers three pieces of trureturing at
subject commit `d013e5a679`:
- `AURIC_OMEGA_PHASE_GAIN_AND_QUTRIT_RECOVERY.md`, §18;
- `AURIC_OMEGA_BOSONIC_EXCURSION_RETURN_AND_PHASE_CORRECTION.md`, §7–§8;
- `AURIC_OMEGA_SO5_PATH_RECONSTRUCTION_CONTINUATION.md`, §66–§84 (theorem numbers 86.1–104.2).

The first two scenes finish threads from parts four and five. The rest of the film takes the same five modes onto a
genus-three curve. Loops become rotations in SO(5), a fourteen-dimensional system records them, and Sp₄ Hecke
eigen-objects consume them.

## The film, scene by scene

- **Complex class (phase-gain §18).**
  - The two phase inputs θ± give outputs at trace distance 2. Their supports are therefore orthogonal, and each output
    has spectrum (1 − β, β).
  - For every complex encoder in the class and every ψ in the phase plane, this gives the environment cap
    τ_ψ ⪯ (1 − β)I (P.78).
  - With that cap, the common-projection exclusion and the minimax of the recovery-certificate volumes apply
    unchanged.
  - Every complex recovery R on the whole output then has F(RN, id₃) ≤ √((1 + √(1 − β))/2) and
    ‖RN − id₃‖_◇ ≥ 1 − √(1 − β) (Theorem 18.2). This is the same optimum as the real class.
- **Leak and return (bosonic §7–§8).**
  - Let K = PUP be the compression to the five kept states and L = QUP the part sent out. Then
    I − K†K = L†L = η² sin²τ |e₄⟩⟨e₄| (7.1–7.2).
  - The retained trace drops by η² sin²τ ⟨e₄, ρe₄⟩ (7.3), and the short-time coefficient is 4r²/ħ² (7.4).
  - Two steps are not the square of one: PU(2t)P = K(t)² + PU(t)QU(t)P. The extra term is
    −η² e^(−2iχ) sin²τ |e₄⟩⟨e₄|, the amplitude that leaves through the bright state and comes back. It vanishes
    only at the return times 2πk/Δ (Proposition 7.2).
  - §8 restricts the mode reading to positive frequency. It changes none of the seven-state identities.
- **Infinite path family (§66, Theorem 86.2).**
  - Fix three gates U_j = exp(π√2 A_j) with A₁ = J₀₁ − J₃₄, A₂ = J₀₂ and A₃ = J₀₃ − J₁₄. Their Lie algebra is
    𝔰𝔬(5), so they generate a dense subgroup of SO(5).
  - On a genus-three surface, ρₙ sends a_j to U_j, b₁ to U₁ⁿ, and b₂, b₃ to I.
  - The traces tr ρₙ(b₁) = 1 + 4 cos(nθ) are pairwise distinct, so the Eₙ are pairwise non-isomorphic. Yet every
    abstract triple (𝒞_ρₙ, ω_x, L_ρₙ) is equivalent to (Rep SO₅, forget, W). What is lost is the path embedding.
- **Two tensors (§67–§69).**
  - W = Sym²₀ ℂ⁵ has dimension 14. For Zariski-dense ρ and σ, every intertwiner of the fourteen-dimensional systems is
    cR(h) with h unique. So E_ρ(W) ≅ E_σ(W) exactly when E_ρ ≅ E_σ, but Aut(E_ρ(W)) = ℂ^× (Theorem 87.1).
  - Preserving b(S, T) = tr(ST) forces c² = 1, and preserving d(S, T, U) = tr(STU) forces c³ = 1. So c = 1, and
    Stab_GL(W)(b, d) = R(SO₅(ℂ)) (Theorem 88.2).
  - Density cannot be dropped. For the trivial system, GL₁₄ has dimension 196, against 11 for ℂ^× R(SO₅)
    (Proposition 89.1).
- **Sp₄ eigen-objects (§70, Theorem 90.2; §77).**
  - The automorphic dual of SO₅ is Sp₄. For each dense Eₙ, the geometric Langlands equivalence gives the eigen-object
    matching ℂ[−40] in genus three.
  - −40 = −dim Bun_Sp₄ + dim Bun_N = −20 + (−20). The Euler sums are 2 + 2 + 6 + 10. In genus g the shift is
    −20(g − 1) (Corollary 97.4).
  - Since S_Eₙ = 1, the forgotten object is one nonzero simple, regular holonomic object in the heart. Because
    Z(Sp₄) = μ₂ is not connected, no CC = [Nilp] claim is made.
- **Two references (§73).**
  - The reference states S₀ and T₀ have spectra (.16, .18, .20, .22, .24) and (.28, .18, .18, .18, .18). Together
    they give ‖U − V‖_F ≤ 1600 ε(U, V) on SO(5) (Theorem 93.2).
  - One reference is not enough: a flip of two of its eigen-coordinates fixes it.
  - With N preparations for each of 30 settings, ‖Û − U‖_F ≤ 1600(2ζ + τ), where ζ = √(85 log(60/δ)/2N), with
    probability at least 1 − δ. The cost is 30N preparations and transports (Corollary 93.3).
- **Explicit correction (§74, §79).**
  - If the commutator map has a gap s ≤ σ₁₀(z) and r = d_K(I, ℛ(z)) < s²/(64g), there is an exact flat z♯ with
    d₂(z, z♯) ≤ 16g r/s and σ₁₀(z♯) > s/2 (Theorem 99.4).
  - Without a gap this fails. Near the trivial representation, tuples that keep both tensors exactly have relation
    defect Θ(t²) but distance Θ(t) to the exact set (Proposition 94.3).
- **Spin lifts (§75).**
  - κ(ρ) = ∏[Ã_i, B̃_i] ∈ μ₂. A lift to Spin₅ ≅ Sp₄ exists exactly when κ = 1. The lifts then form an H¹(X; μ₂)
    torsor with 2^(2g) classes, so 64 for the genus-three family (Theorem 95.2, Proposition 95.3).
  - Adding two half-turn gates P₀ and Q₀, which lift to anticommuting Clifford elements, gives a dense representation
    with κ = −1 and no lift (Proposition 95.3).
  - Selecting a source, trivialising the orientation and lifting together needs a cover of degree m if ε₀ = 1 and
    (κ = 1 or m is even), and 2m otherwise (Theorem 95.2).
- **Sixteen to one (§80–§82, §84).**
  - For the explicit family z(t), σ₁₀ ≥ 2 − 2√14 t > 1 throughout (Theorem 101.1).
  - At t = 0 the complex commutant has dimension q = 4, the centraliser is μ₂⁴ and the forgotten object has 16 simple
    summands. For t > 0, q = 0 and the object is simple, while σ₂₄(t) = Θ(t) (Theorems 100.1 and 101.1).
  - The characteristic cycle is the same along the whole family (Theorem 102.1). No projection onto a nonempty proper
    set of the sixteen summands lifts to the full Hecke object (Theorem 102.2).
- **Finite budgets (§83–§84).**
  - Δ_{D,L} ≤ min{2, DLδ}, and the weighted sum d_fin is a complete metric with ¼ min{1, δ} ≤ d_fin ≤ 4δ
    (Theorems 103.2 and 103.3).
  - Without a budget there is no uniform bound. With σₙ(a₁) = R₁₂(π/n), the gate distance δₙ = 2 sin(π/2n) → 0,
    while the word of length n and the n-th tensor power both stay at distance 2 (Proposition 104.1).

一部约七分钟的片子，AURIC Ω 系列的第七部：先把复编码器类的最优恢复误差定为 1 − √(1 − β)，并给出玻色游程中压缩损失与二步回返项的恒等式；再把五个模式放到亏格三曲线上：同一三门菜单给出无限多个两两不同构、抽象张量数据却相同的路径实现；两个平行张量 tr(ST)、tr(STU) 消去十四维恢复中剩下的标量；Sp₄ 侧的 Hecke 本征对象对应 ℂ[−40]；两个参考态以 1600 倍常数读出旋转；谱隙给出到精确平坦元组的显式修正；Spin 提升由一个符号 κ 决定；同一显式族中简单直和项从十六跳到一而特征循环不变；最后是有限预算下的稳定性与无预算时的反例。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-073-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used.
  - At the subject commit the phase-gain volume and the SO5 continuation have no digestion records.
  - The bosonic volume has 25 atoms, all residual-open.
  - No Lean declaration covers any statement shown.
- **Published results, used as external inputs.** The Hecke scene and the finale badge them as published.
  - Geometric Langlands and the Hecke eigen-objects: Gaitsgory–Raskin I (arXiv:2405.03599) and V
    (arXiv:2409.09856).
  - Tannakian reconstruction: Deligne–Milne, *Tannakian Categories*, 2.11 and 2.20–2.21.
  - Recovery duality: Bény–Oreshkov, arXiv:1103.0649.
- **Classical tools named in the volumes.** The finale lists all of them except the defect identity.
  - Schur's lemma, and the root data and automorphisms of B₂ and C₂ (Conrad; Milne, *Algebraic Groups*).
  - Riemann–Hilbert and GAGA (Deligne, LNM 163).
  - Hoeffding's inequality; the reference scene badges it as classical.
  - The Spin obstruction class (Perutz).
  - The defect identity I − K†K = L†L (Robinson, arXiv:1803.09329).
  - Jordan-algebra automorphisms.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the common-projection exclusion and the minimax closure of the recovery-certificate volumes II and III;
  - Lie(A₁, A₂, A₃) = 𝔰𝔬(5) from the main Ω volume, Proposition 45 (it is recomputed below);
  - the source-selection and orientation supply of the Langlands degeneration volume.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following. Optimal recoveries are solved as
  semidefinite programs with cvxpy and Clarabel.
  - **Complex class.**
    - Twelve random complex encoders were checked, with environment dimension 3–5 and N(X̄) ≠ conj N(X).
    - Each one has output supports at trace distance 2.
    - The largest environment eigenvalue over random phase-plane inputs is at most 1 − β.
    - Optimal diamond errors are 0.67–1.12 at β = 0.2 and 0.75–1.10 at β = 0.5, all above 1 − √(1 − β).
    - The attaining encoder gives 0.1056 and 0.2929, equal to 1 − √(1 − β).
  - **Leak and return.** On 300 random cases:
    - I − K†K = L†L = η² sin²τ |e₄⟩⟨e₄|;
    - PU(2t)P = K² − η² e^(−2iχ) sin²τ |e₄⟩⟨e₄|.
    - The short-time coefficient is 4r² (2.12 for g = 0.7 + 0.2i, J = −0.5).
  - **Path family.**
    - Lie(A₁, A₂, A₃) has dimension 10.
    - tr ρₙ(b₁) = 1 + 4 cos(nθ) is pairwise distinct for n = 0…200 (minimum gap 4.2 × 10⁻⁴).
    - The genus-three relation holds.
  - **Tensors.**
    - W has dimension 14 and the gates act irreducibly (commutant dimension 1).
    - The infinitesimal stabiliser of (b, d) in 𝔤𝔩(14) has dimension 10.
    - b(S₀, S₀) = 6 and d(S₀, S₀, S₀) = −6.
  - **Hecke shift.** dim Bun_Sp₄ = 20 and the Euler sum 2 + 2 + 6 + 10 = 20 in genus three, so the shift is −40.
    In general it is −20(g − 1).
  - **References.**
    - On 6000 pairs in SO(5), half of them nearby, ‖U − V‖_F/ε ≤ 63.0, below 1600.
    - A single reference has the stabiliser diag(−1, −1, 1, 1, 1).
  - **Correction.**
    - The derivative formula (99.8) matches finite differences.
    - ‖𝒞_z Z‖ ≤ 8g ‖D_z* Z‖ on 900 cases.
    - Eight perturbed exact tuples were corrected by Newton steps to exact flat tuples. Their distance divided by
      16g r/s is 0.013–0.017.
    - Near the trivial tuple, defect/t² tends to ‖[X, Y]‖_F = 1.4142.
  - **Spin.**
    - The lifts of P₀ and Q₀ have commutator −1.
    - ρₙ has κ = +1, with 64 lift classes in genus three.
    - The D_min examples (ε₀, κ, m) → D are (1, 1, 3) → 3, (1, −1, 3) → 6, (1, −1, 4) → 4 and (−1, 1, 3) → 6.
  - **Jump.**
    - q(z(0)) = 4, giving 16 summands; q(z(t)) = 0 for t ∈ (0, 0.1], giving one.
    - σ₁₀ ≥ 2 − 2√14 t, and σ₂₄(t)/t ≈ 0.915.
    - d₂ = √14 |t − u|.
    - The diagonal centraliser has 16 elements.
  - **Budgets.**
    - δₙ = 1.414, 0.765, 0.390, 0.196 and 0.049 for n = 2, 4, 8, 16 and 64.
    - The length-n word and the n-th tensor power stay at distance 2.
    - Σ 2^(−(D+L)) DL = 4.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The environment-eigenvalue bars and the SDP error dots.
  - The leak curve and its return times.
  - The trace stems.
  - The 196 and 11 bars.
  - The Euler bars 2, 2, 6 and 10.
  - The reference spectra and the sampled ratio curve.
  - The D_min examples.
  - The σ₂₄ curve.
  - The δₙ curve with the distance-2 points.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the support boxes;
  - the five-state and bright-state diagram with its two-interval arrows;
  - the genus-three surface;
  - the 5 × 5 matrix grid;
  - the unit circle with roots of unity;
  - the spectral and automorphic boxes;
  - the rotation box;
  - the correction sketch with its ball and arrow;
  - the t and t² curves;
  - the 64 lift tiles and the 16 summand tiles;
  - the budget weight grid.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
