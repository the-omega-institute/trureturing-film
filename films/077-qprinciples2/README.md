# 077 · AURIC QUANTUM PRINCIPLES II · GATE CONTRACTS, LOOP PHASES AND THE SQUARE LAW · AURIC 量子原理 第二部 · 门合同、闭路相位与平方律

This is the second film in the AURIC QUANTUM PRINCIPLES series and runs about 7¼ minutes. It covers
`AURIC_FIB_ATOM_QUANTUM_PRINCIPLES_AND_COHERENT_RECONSTRUCTION_CONTINUATION.md`, §37–§76, at trureturing subject
commit `6d9f2191c3`. The volume continues the coherent-reconstruction volume of part one. The film follows three of
its threads: what a truth table, fixed reflections and a supplied bus give as gates (§37–§39); kernels on the actual
source trees, from exact zero-one rigidity to a loop phase that survives every small defect (§42–§50); and the
conversion costs and probability responses of §51–§73, ending with no-signalling selecting the square law.

## The film, scene by scene

- **NAND channel ball (§37).**
  - N|a, b, c⟩ = |a, b, c ⊕ (1 ⊕ ab)⟩ = X_c·CCX is a permutation unitary with N² = I. With c = 0 it writes NAND and
    keeps the inputs. Bare NAND, ℂ⁴ → ℂ², cannot be unitary (Proposition 37.1).
  - The CPTP maps M₄ → M₂ with the NAND truth table are exactly the Φ_z of (37.1), one for each z in the closed unit
    ball of ℂ³, with unique parameter (Theorem 37.2).
  - On the code span{u, b}, Φ_z is a logical bit flip followed by dephasing with factor r = ‖z‖. It is entanglement
    breaking iff z = 0. Its Choi rank, minimal Kraus number and minimal pure-environment dimension are 4 for r < 1 and
    3 for r = 1 (Corollary 37.3).
- **Fixed reflections (§38).**
  - Powers of one fixed U never give all of PU(d); neither do two fixed involutions, whose closure is K ∪ RK with K
    abelian (Theorem 38.1).
  - R₀ = Z, R₁ = cos α Z + sin α X, R₂ = cos α Z + sin α Y with α/π irrational generate a dense subgroup of PU(2), via
    R₁R₀ = e^(−iαY) and R₂R₀ = e^(iαX) (Proposition 38.2).
  - Every U ∈ SU(d) is an exact product of at most 2(d − 1) rank-one reflections I − 2|w⟩⟨w|, with target-dependent
    directions (Theorem 38.3).
- **Shared bus (§39).**
  - With conditional gates A = (I − Q_A) ⊗ I + Q_A ⊗ X and B = (I − R_B) ⊗ I + R_B ⊗ Z on one explicitly supplied
    bus qubit, ABAB = (I_AB − 2 Q_A ⊗ R_B) ⊗ I_bus on the whole space, for an unknown or entangled bus. With the bus
    prepared in |0⟩, ABA already gives the same data gate. For nontrivial projections the gate entangles
    (Theorem 39.1).
- **Zero-one rigidity (§42).**
  - T is the full free ordered binary tree algebra on α, β, with ρα = β, ρβ = ⟨β, α⟩ and ρ⟨s, t⟩ = ⟨ρs, ρt⟩. On the α
    orbit, ρ²uₙ = ⟨ρuₙ, uₙ⟩ (Lemma 42.1).
  - A Hermitian kernel K on T × T that is transport invariant and exactly multiplicative on all constructor
    quadruples takes only the values 0 and 1 (Theorem 42.2, frozen in Lean).
  - With positivity and normalisation, a faithful such kernel is δ (Corollary 42.3).
  - Without exact multiplication, K_c = c + (1 − c)δ is a valid transport-invariant kernel for every c ∈ [0, 1],
    faithful for 0 < c < 1, with K_c(⟨s,t⟩, ⟨u,v⟩) = c ≠ c² (Proposition 42.4).
- **No uniform modulus (§43–§44).**
  - Let q(t) count the nodes with equal children, and Kₙ = aₙ conj(zₙ(s)) zₙ(t) + rₙδ with zₙ = e^(iπq/5n),
    rₙ = 1/5n, aₙ = 1 − rₙ. Every Kₙ satisfies all exact side conditions, and its multiplication defect is at most
    (1 − 1/5n)(π + 1)/5n < 1/n. Yet on the comb w₅ₙ, Kₙ(α, w₅ₙ) = −aₙ, at distance at least 4/5 from {0, 1}. So no
    uniform modulus exists (Theorem 43.2).
  - With S(t) the address set of equal-child nodes and Lₙ = aₙ e^(−|S(s) △ S(u)|/5n) + rₙδ, the defect is at most
    2aₙ/5n < 1/n, yet Lₙ(α, w₅ₙ) = aₙ/e ∈ (1/4, 1/2). So moduli and squared moduli have no uniform modulus either.
    All closed loops of Lₙ are positive real (Theorems 44.3–44.4).
- **Bargmann loop (§45).**
  - Colour each equal-child node ⟨u, u⟩ by the parity of q(u), use z₀ = e₀, z₁ = √b e₀ + √h e₁,
    z₂ = √b e₀ + i√h e₁, and set Kₙᶜ = aₙPᶜ + rₙδ. The defect is at most 3aₙ/5n < 1/n (Theorem 45.3).
  - For the moving combs W_j,5n with teeth C₀ = ⟨α, β⟩, C₁ = ⟨α, α⟩, C₂ = ⟨C₁, C₁⟩,
    Bₙ = a³[b³(b + ih)]^(5n). Its phase θₙ = 5n arctan(1/(5n − 1)) lies in (1, 5/4), |Bₙ| ≥ (4/5)²³, and the loop is
    invariant under every vertex rephasing (Theorem 45.4). Bₙ → e^(−4+i), while fixed loops tend to 1
    (Proposition 45.5).
- **Records and rejection (§46–§48).**
  - Rₙ = |Kₙᶜ| is itself a real Gram kernel with defect below 1/n (Theorem 46.2).
  - For destructive query menus that reset on failure, the complex and real models have identical complete record
    laws for every adaptive strategy, because each branch mass is m|K|² (Theorem 47.2).
  - With a Lüders instrument that keeps the rejection branch, the (−, +) record differs by
    2|Bₙ|(1 − cos θₙ) ≥ 2(4/5)²³(1 − cos 1) > 0 (Theorem 48.1).
- **Five-mode menu (§49).**
  - Native protocols with waiting exp(−itK), full rank-one readout, Stop, finite feedback and input-free
    randomisation have entanglement-breaking read branches. Against the flag channel that keeps a rank-r rejection
    coherent, ½‖Γ − Λ‖_◇ ≥ max{w, (1 − w)(r − 1)/r} ≥ (r − 1)/(2r − 1), where w is the weight of negative paths that
    stop before any readout. On the actual five-mode register with P of rank one, r = 4, so the half-diamond distance
    is at least 3/7 (Theorem 49.1).
- **Graft and split (§51, §57–§59).**
  - With state-only inputs, exact flagged grafting on the two inputs (α, α), (β, α) has optimal equal success
    (1 − a)/(1 − a√b) → 2/3, and splitting on ⟨α, β⟩, ⟨β, α⟩ has 1/(1 + a) → 1/2 (Theorem 51.2).
  - One common normal channel per direction serves all source trees, with error Θ(n^(−1/2)). At n = 1,
    (√305 − 15)/50 ≤ E_con ≤ 93/125 and (√369 − 15)/50 ≤ E_dec ≤ 17/25 (Theorems 58.1 and 59.1). Exact and
    approximate costs coexist (Proposition 59.2).
- **Power law test (§68).**
  - Keep the golden gate K = ζ[I + (ζ − 1)𝒫], ζ = e^(3πi/5), and replace Born's rule by |ψ_w|^p / Σ|ψ_y|^p over all
    32 five-site words. The source K₁K₂|00000⟩ = u²|00000⟩ + uv|01000⟩ + ζv|00100⟩ is entangled across Alice (site 1)
    and Bob (sites 2–4).
  - When Bob calls K₃, Alice's marginal changes by Δ_p = XY²(X + Y − 1)/[(X² + XY + Y)(X³ + 2X²Y + XY² + Y)],
    with X = |u|^p, Y = |v|^p and |u|² + |v|² = 1. So Δ_p > 0 for p < 2, Δ₂ = 0 and Δ_p < 0 for p > 2
    (Theorem 68.2).
- **Radial rigidity (§69–§73).**
  - The log-periodic response f_ε(r) = r²[1 + ε sin²(π log r / log y)], y = φ^(−1/2), reproduces all word
    probabilities of both §68 tables, because every modulus there is a power of y (Proposition 69.2). Calling K₃ twice
    separates it, with Alice gap x²y⁴z²(H_ε − 1)/Z₂ of the sign of ε (Proposition 69.3).
  - On the ten-site Fibonacci code J|a, b⟩ = |1 0 a 0 1 0 b 0 1 0⟩, for a common continuous radial response f: no
    signalling for every finite preparation word in K₀ … K₆ ⟺ f(a) + f(b) = f(√(a² + b²)) ⟺ f(r) = r²
    (Theorem 71.1). No finite suite fixed in advance certifies this (Proposition 71.3).
  - With an active S₄ calibration on the code, no-signalling gives p_i(ξ) = |ξ_i|² on J(ℂ⁴) (Theorem 73.2).

一部约七分钟的片子，AURIC 量子原理系列的第二部：先看门合同——NAND 真值表的全部信道构成 ℂ³ 的闭单位球，球内 Kraus 秩为四、球面上为三，只有 z = 0 才破坏纠缠；三枚固定的单比特反射在 PU(2) 中稠密，而 SU(d) 的每个元素都是至多 2(d − 1) 个依赖目标的秩一反射之积；另供的共享总线给出 ABAB = (I − 2Q⊗R) ⊗ I。再看来源树上的核：精确可乘、运输不变的 Hermitian 核只取零和一（Lean 冻结定理），而只要允许小于 1/n 的乘法缺陷，复核值、模长与模平方都没有一致模，奇偶着色的三棵移动梳状树给出相位在 1 与 5/4 之间、模长大于 (4/5)²³ 的 Bargmann 环积；破坏性记录看不见它，保留拒绝支的 Lüders 仪器能看见，而原生五模菜单的半 diamond 误差至少为 3/7。最后是树的嫁接与拆分：精确成功率趋于 2/3 与 1/2，近似误差为 1/√n 阶；把 Born 的平方换成幂 p 时，黄金门上的无信号恰好选出 p = 2，并在十站点码上推广为对全部有限制备字的平方律刚性。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-077-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declaration.** One is used, for the zero-one rigidity scene.
  - At the subject commit the volume's digestion record has 121 atoms: 120 residual-open and 1 absorbed-closed.
  - The absorbed-closed atom is Theorem 42.2. It is covered by
    `D5/S3/Arith/FibonacciAtomic/Kernels/NativeKernelRigidity.kernel_zero_or_one`, whose frozen state file
    `Golden/Frozen/state/D5/S3/Arith/FibonacciAtomic/Kernels/NativeKernelRigidity.lean.json` exists at the commit. The
    Lean statement has the same hypotheses: Hermitian, transport invariant under the native substitution, and
    multiplicative on all constructor quadruples, with conclusion K s t = 0 ∨ K s t = 1.
  - Corollary 42.3, Proposition 42.4 and every other statement in the film are badged as theory.
- **Published results, used as inputs or tools.** They are cited in the volume and named on screen or in the finale.
  - Fibonacci braid density for the ten-site code: Freedman–Larsen–Wang, arXiv:math/0103200, §6, Theorem 6.2.
  - Two-input flagged Gram condition: Chefles–Jozsa–Winter, quant-ph/0307227, Theorems 2–3.
  - Rank-one Kraus and entanglement breaking: Horodecki–Shor–Ruskai, quant-ph/0302031, Theorem 4. Schmidt overlap
    bound: Terhal–Horodecki, quant-ph/9911117, Lemma 1.
  - The normalised power family studied by Aaronson, quant-ph/0401062, §2; its limits as a measurement modification,
    Galley–Masanes, arXiv:1801.06414.
  - Trace-distance contraction: Watrous, *The Theory of Quantum Information*, Chapter 3.
  - Background named in the volume: Barenco et al., quant-ph/9503016 (gate decompositions); Oszmaniec–Brod–Galvão,
    arXiv:2109.10006 (Bargmann invariants); Sornette, cond-mat/9707012 (log-periodic responses).
- **Project inputs from other volumes, not recomputed here except where noted.**
  - The golden gate K and its spectral relations (V15 volume, (3.1)–(3.2)); K^10 = I and K^5 = 2𝒫 − I are recomputed
    below.
  - The ten-site code construction (V15, Theorems 6.1–6.2) and two-dimensional density (V15, Theorem 4.3).
  - The free source trees and the injectivity of the substitution (GenealogicalFiberTransport and
    SourceTransportCentralizer in D5/Blueprint).
  - The five-mode generator K of the main volume (Definitions 20.1, 35.1).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script checks the following (56 checks).
  - **NAND.** N = X_c·CCX is a permutation with N² = I and the NAND truth table. For 40 random z in the ball the
    Stinespring isometry reproduces (37.1) and the truth table; the Choi rank is 4 inside and 3 on the sphere. The
    code action is Φ(|u⟩⟨b|) = r|1⟩⟨0|, and the spectrum of the output's partial transpose is {±r/2, 1/2, 1/2}.
  - **Reflections.** R₁R₀ = e^(−iαY) and R₂R₀ = e^(iαX) for α = 1. Euler words with integer powers up to N
    approximate 12 Haar targets with mean error 0.434 at N = 2 and 3.1 × 10⁻³ at N = 512. All 2¹² words in two fixed
    reflections stay at projective distance ≥ 0.479 from e^(0.5iX). Exact 2(d − 1)-reflection products for d = 2…7
    have residual ≤ 1.1 × 10⁻¹⁴.
  - **Bus.** ABAB = (I − 2Q⊗R) ⊗ I on 30 random cases (residual 2.2 × 10⁻¹⁵); ABA on bus |0⟩ gives the same data
    gate; the coefficient matrix ½[[1, 1], [1, −1]] has rank 2.
  - **Trees.** All 550 trees with at most five leaves: ρ is injective, q, S and the parity colouring are transport
    invariant, and |S| = q. The orbit identity holds for n = 0…6. K_c is positive semidefinite on random lists with
    repeats; its node defect c − c² peaks at 1/4.
  - **Drift.** Kₙ(α, w₅ₙ) = −aₙ and Lₙ(α, w₅ₙ) = aₙ/e for n = 1…20. Sampled defects over 3000 quadruples stay below
    aₙ(hₙ + rₙ) and 2aₙ/5n; the kernels are positive semidefinite and transport invariant.
  - **Loop.** Bₙ = a³[b³(b + ih)]^(5n) from the colour fields for n = 1…40, with θₙ = 5n arctan(1/(5n − 1)) ∈ (1, 5/4)
    and |Bₙ| ≥ (4/5)²³. Explicit finite-support vectors realise the kernel for n = 1. Bₙ → e^(−4+i) ≈ 0.0099 + 0.0154i.
    Sampled parity-kernel defects stay below a(2h + r), and the defect at (α, β, β, α) is ra > 0.
  - **Records.** The four-record Lüders law (48.2) holds in both models for n = 1, 2, 5, 10; the gap 2|B|(1 − cos θ)
    is at least 2(4/5)²³(1 − cos 1) = 0.00543 (0.00908 at n = 1). For 200 random adaptive destructive strategies over
    five sources the complete record laws agree to 1.8 × 10⁻¹⁵.
  - **Five modes.** min_w max{w, 3(1 − w)/4} = 3/7. On 300 random separable operators ⟨Φ_Q|σ|Φ_Q⟩ ≤ Tr σ/4 (largest
    ratio 0.463). For 20 sampled native-type protocols the proof's two witnesses and random inputs give lower bounds
    on the half-diamond distance at or above max{w, 3(1 − w)/4}.
  - **Conversion.** A two-input Gram SDP (cvxpy with Clarabel) gives (1 − a)/(1 − a√b) and 1/(1 + a) for n = 1, 3, 10.
    At n = 60 these are 0.6672 and 0.5008. The n = 1 bounds are 0.04928, 93/125, 0.08419 and 17/25. The limits of
    √n·L_con and √n·U_con are 0.0711 and 0.6325. The address split U w_⟨s,t⟩ = z_ℓ ⊗ w_s ⊗ w_t holds on 200 random
    pairs.
  - **Power law.** 𝒫 is an orthogonal projection, K is unitary with K^10 = I and K^5 = 2𝒫 − I, u = −φ⁻¹,
    |u|² = φ⁻² and |v|² = φ⁻¹. The tables (68.4)–(68.5) hold, the marginal gap equals (68.7) for 118 values of p
    with the stated signs, and (68.7) holds symbolically (sympy).
  - **Radial.** |u₂| = x² and |v₂| = √(1 − x⁴). f_ε reproduces all 32 Born word probabilities in both settings for
    seven values of ε, and setting 2 gives (69.9) with the sign of ε. K₄ and K₅ act on the code as K_P and K_Q, and
    tr(K_Q⁵X)² = 16√5 − 34. On 60 random words in K₀ … K₆ the Born marginal gap is 2.2 × 10⁻¹⁶, while r³ and f₁
    responses reach gaps 0.076 and 0.169.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The partial-transpose curve and the Kraus-rank bars.
  - The circle of rotation powers, the Euler-word error curve and the reflection table.
  - The K_c defect parabola.
  - The −aₙ, aₙ/e and defect-bound points.
  - The Bₙ points in the complex plane with the limit e^(−4+i).
  - The four-record bars and the (−, +) zoom.
  - The five-mode witness points.
  - The exact success curves and the error-bound curves.
  - The Δ_p curve.
  - The f_ε curve with the lattice points and the setting-2 gap bars.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the NAND circuit, the truth-table cells and the 4 → 2 map;
  - the channel ball;
  - the 5 × 5 reflection-plane grid;
  - the bus circuit and the sector cells;
  - the tree and comb drawings;
  - the destructive-query and Lüders flow diagrams;
  - the five-site and ten-site registers.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
