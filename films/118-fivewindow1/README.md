# 118 · AURIC FIVE-WINDOW MEMORY I · THREE STEPS, ONE HALF AND SIX STATES · AURIC 五窗口记忆 第一部 · 三步、二分之一与六个状态

This is part one of the three-part AURIC FIVE-WINDOW MEMORY series and runs about 7½ minutes (7:28). It covers the
whole of `AURIC_FIB_FIVE_WINDOW_QUANTUM_MEMORY.md` (§1–§41) at trureturing subject commit `327221574c`. A no-11 bit
source is read through a sliding three-bit window; the five legal windows label a five-dimensional system, and one
fixed channel that reproduces the window populations on every complex input is repeated. The film asks how much
exact memory, entanglement and stationary structure such a channel can keep. Parts two and three continue with the
switched-memory and uniform switching-erasure volumes, and with the half-Gram classification and hidden-phase readout
volumes.

## The film, scene by scene

- **Five windows (§2–§3).**
  - The windows are ordered 000, 100, 010, 001, 101. One step slides abc to bcd. After a 0 the next bit is 1 with
    probability η, after a 1 it is 0; this gives the kernel Q_η of (2.1), with r = 1 − η.
  - The stationary window law is p = (r², ηr, η, ηr, η²)/(1 + η), with Qᵀp = p, and Q⁴ > 0 entrywise
    (Theorem 3.2). The source is the fixed-activity Perron chain with λ = η/r²; λ = 1 gives η = φ⁻².
  - An allowed lift is a CPTP map with diag Φ(X) = Qᵀ diag X for every complex X (Definition 2.2).
- **Eight edges (§4–§6).**
  - Every allowed lift has its Choi matrix on the eight edges (4.3). Its Stinespring isometry (4.4) uses eight unit
    environment vectors, and only ⟨α₀, α₁⟩ = ⟨β₀, β₁⟩ = ⟨δ₀, δ₁⟩ = 0 are prescribed (Theorem 4.1).
  - Inputs on span{001, 101} reset to |010⟩⟨010|, and the dual effects (4.8) are the same for every lift
    (Theorem 4.2).
  - One step keeps at most three exact dimensions, with codes span{a₀, |010⟩, d₀}, and two steps at most two
    (Theorems 6.1 and 6.2).
- **The third step (§7–§9, §13).**
  - A qubit exact after three steps would need syndrome ranks (1, 1, 2), and after one diagonal phase change its
    second-step image would be the plane T = span{h, w} of (8.2), which would have to be one-step correctable
    (Theorems 7.1 and 8.1).
  - Correcting T would give a three-Kraus auxiliary channel a 4 × 4 Choi matrix with determinant
    [r + η²t(1 − t)]²/(1 + r)⁴ ≥ (r/(1 + r))⁴ > 0, while three Kraus operators force determinant zero (Theorem 9.1).
  - Hence k_n(Φ) = 1 for every n ≥ 3, every allowed lift and every 0 < η < 1 (Theorem 9.2). In particular no passive
    logical qubit exists (Theorem 13.2).
- **One law, three indices (§10–§12).**
  - The oldest-bit lift hands the erased first bit to a fresh environment (10.4). It has codes C₁ = span{000, 010, 001}
    and C₂ = span{000, 001}, attains the optima 5, 3, 2, 1, 1, … and has entanglement-breaking index exactly 3
    (Theorems 10.2 and 10.3).
  - Rotating within the equal-row pairs gives Ξ = Φ_can ∘ Ad_W, with the same law, the same basis outputs and the
    same codes. Its reference witness has determinant −η²ⁿ/4 < 0 at every n, so its index is ∞, although its powers
    converge to a pure reset (Theorems 11.2, 12.1 and 12.2).
  - The classical measure-and-prepare channel Ψ has index 1. So one law carries indices 1, 3 and ∞ (Theorem 12.3).
- **Mixtures and endpoints (§14–§16, §25).**
  - Every mixture (1 − ε)Θ + εΨ with ε > 0 has Φ_ε⁴ ≥_CP 5ε⁴m·R_I/5 (m = min Q⁴), a unique faithful stationary state
    and a finite index (Theorems 14.1 and 14.2).
  - At each fixed η, mixtures with Ξ have finite indices larger than any given N (Theorem 14.3).
  - At η = 0 every lift satisfies Φ³(X) = Tr(X)|000⟩⟨000| (Theorem 15.2). At η = 1 a swap qubit on
    span{010, 101} survives every step and the optima are 5, 3, 2, 2, 2, … (Theorem 15.3); every endpoint lift swaps
    the two populations (Theorem 25.2).
- **A hidden label at one half (§17–§20).**
  - At η = 1/2 the lift Φ∘ of (17.3) is legal, with Choi eigenvalues 3 and 2 (Theorem 17.3).
  - P = |s⟩⟨s| and M = (P_R − P)/2 are orthogonal stationary states with the same populations (1, 1, 2, 1, 1)/6, and
    the effect E = Φ∘†(P), with spectrum 1, 2/3, 0, 0, 0, is conserved (Theorems 18.1 and 18.3, Proposition 18.2).
  - χ(t) = t²⁰(t − 1)²(t + 1/2)³ (Theorem 19.1). The powers converge to T(X) = P Tr(EX) + M Tr((I − E)X), with
    ‖Φ∘ⁿ − T‖_◇ ≤ (4/3)2^−(n−2) (Theorem 19.2).
  - Every reset stays at diamond distance at least 1 from every power (Theorem 20.1), and a reference witness has
    negative eigenvalue −2^−(n+1) at every n (Theorem 20.2).
- **No common rate (§21–§23).**
  - Codes inside the image R have dimensions 3, 2, 1, 1, …; the two-step error system is ℂP ⊕ B(T)
    (Theorem 21.2).
  - Φ_ε = (1 − ε)Φ∘ + εD is quantum primitive with ρ_ε ≥ (ε⁴/8)I and ‖Φ_εⁿ − R_ρε‖_◇ ≤ 2(1 − ε³/2)^⌊n/3⌋
    (Theorem 23.2), but Φ_ε(P − M) = (1 − ε)(P − M) gives ‖Φ_εⁿ − R_σ‖_◇ ≥ (1 − ε)ⁿ, so no vanishing rate is common to
    the family (Theorem 23.3). The Hermitian Doeblin coefficient of every Φ∘ⁿ is 0 (Theorem 23.4).
- **The selected family (§24–§25).**
  - B_η of (24.2) equals Φ∘ at η = 1/2 (Theorem 24.2) and has χ(t) = t²⁰(t − 1)(t + η)(t + c)(t² − ct − 2rc),
    c = √(η/2) (Theorem 24.3).
  - Away from 1/2 its unique stationary state ρ_η = (rP_u + ηP_v + ηP_z)/(1 + η) has rank 3 and diagonal p
    (Theorem 24.4). The gap 1 − μ₊ behaves like (η − 1/2)² (Theorem 24.5); all nonzero modes are semisimple
    (Theorem 24.6).
  - At unit activity, η = (3 − √5)/2 and μ₊ = r(1 + √(1 + 8√2))/(2√2) ≈ 0.98527216428273156 (Corollary 24.7).
  - Every lift obeys ‖Φⁿ − R_σ‖_◇ ≥ ηⁿ (Proposition 25.1).
- **Heavy population (§27–§31).**
  - A rank-one cap with population at least a > 1/2 has trace-norm diameter 4√(a(1 − a)) (Theorem 27.3). If every
    state has that population after N steps, the channel contracts with κ = 2√(a(1 − a)) and has a unique stationary
    density, with a 2d prefactor against complex references (Theorems 28.1 and 28.2).
  - Qⁿ = Π + (−η)ⁿ⁻²(Q² − Π) (Theorem 29.1), with odd-column minimum p₀(1 − η²ᵏ) (Corollary 29.2).
  - For 0 < η < α = (5 − √17)/4 ≈ 0.2192, every lift mixes with the common bound min{2, 10κ^⌊n/(2k+1)⌋}
    (Theorem 30.1).
- **Only one half (§32–§39).**
  - For interior η, a nonrelaxing allowed lift exists exactly when η = 1/2 (Theorem 36.1).
  - The key step: a pure stationary line with an orthogonal stationary support forces
    0 = r√η(1 − β)(1 + ηβ), hence β = 1 and r = η = 1/2 (Lemma 33.1). Rank-four supports and mixed 2 + 2, 2 + 3
    sectors are handled by Lemmas 34.1 and 35.1.
  - On compact parameter sets avoiding 1/2, δ(Φ²⁴) ≤ q_K < 1 and the bound is uniform, with horizon 24 = 5² − 1
    (Theorem 37.1); near 1/2 no common vanishing bound exists (Proposition 36.2). §39 points to the half-Gram
    classification of part three.
- **Six-state recovery (§40–§41).**
  - With the measured unrotated instrument (40.1), a six-state controller over S₃ followed by one terminal unitary
    attains the corrected channel ι_η E_n (Theorem 40.3). The error is a Schur multiplier with
    Aₙ₊₁ = aBₙ, Bₙ₊₁ = αAₙ + γBₙ (Theorem 40.4).
  - Its error ε_η(n) = x if x ≥ 2y, else 4y²/(4y − x), with x = 1 − Aₙ, y = 1 − Bₙ, is optimal against every
    history-dependent terminal CPTP recovery (Theorem 40.5). It is 0 at η = 1/2 and tends to 4/3 elsewhere
    (Proposition 40.7).
  - Attaining the optimum requires the seed and record to determine the accumulated permutation (Theorem 41.2), so the
    smallest alphabets are 1, 2, 4 and then 6 from step three on (Theorem 41.3).

一部约七分半钟的片子，AURIC 五窗口记忆系列第一部：用三比特滑动窗口读无 11 比特源，五个合法窗口给出五维系统；在每个复输入上重现窗口布居律的信道全部落在八条边上。对内部的 η，每个提升一步至多保留三维、两步至多两维精确记忆，第三步起只剩一维；最老比特提升达到全部最优值，纠缠破坏指数为三，旋转后的同律信道指数为无穷，经典信道指数为一。端点是各自独立的模型。η = 1/2 处有一个藏着经典标签的提升：两个正交平稳态布居相同，一个守恒效应永远区分它们；它的扰动族量子本原却没有共同速率。选定族的相干根只在 1/2 处达到一，单位活度时 μ₊ ≈ 0.98527。重布居判据在 η < (5 − √17)/4 时给出所有提升的共同混合速率，完整分类表明存在不弛豫提升当且仅当 η = 1/2。最后，保留测量标签时，六状态控制器加一次终端幺正达到最优恢复误差，最小记录字母表依次为 1、2、4、6。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-118-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used. At the subject commit the volume has no digestion records (no
  `Meta/Digestion/backfill/` directory for it), and no Lean declaration covers any statement shown. The volume itself
  states that it makes no kernel-verification claim.
- **Published results, used as external inputs.** The canon scene, the classify scene and the finale badge these as
  published:
  - Stinespring dilation (Proc. AMS 6, 1955, DOI 10.1090/S0002-9939-1955-0069403-4) and the Choi criterion (Linear
    Algebra Appl. 10, 1975, DOI 10.1016/0024-3795(75)90075-0);
  - the Knill–Laflamme condition (quant-ph/9604034, Theorems 3.2 and 3.5);
  - the entanglement-breaking criterion of Horodecki–Shor–Ruskai (quant-ph/0302031, Theorem 4);
  - the d² − 1 horizon of Gaubert–Qu (arXiv:1307.4649, Theorem 7.8), which the volume also proves independently;
  - further cited frameworks: Theurer et al. (1806.07332), Korzekwa et al. (1710.04228), Lami–Giovannetti
    (1411.2517), Hanson–Rouzé–Stilck França (1902.08173), Kribs et al. (quant-ph/0504189), Bhat–Dey–Saha
    (2609.24168), Burgarth et al. (1210.5625), Sanz et al. (0909.5347), George et al. (2503.22823), Raginsky
    (quant-ph/0105141), Szehr–Wolf (1210.1171), Fuchs–van de Graaf (quant-ph/9712042), Carbone–Jenčová (1905.00857),
    Blume-Kohout et al. (1006.1358), Gregoratti–Werner (quant-ph/0209025, quant-ph/0403092), Yu–Duan–Xu
    (1201.1172), Watrous (1207.5726 and *The Theory of Quantum Information*), Kretschmann–Schlingemann–Werner
    (quant-ph/0605009).
- **Project inputs from other trureturing volumes, not recomputed as theorems here.** The fixed-activity source law
  (LocalClock, Definition 15.1, Propositions 15.6 and 15.8), the general-source distinctions (Pyramid, §§17–18), the
  permutation accumulator and reached sets (Environment Record Memory, Theorem 5.1), the Gram-norm method (Arithmetic
  Holographic RT, §36.1) and the compact decoder method (Approximate Online Recovery Memory, Theorem 18.2). They are
  badged as theory.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy, mpmath, cvxpy with Clarabel for every
  diamond-norm and recovery SDP) checks the following:
  - **Windows.** The kernel built from the chronological slide equals (2.1); the triple law equals (3.2); Qᵀp = p,
    Q⁴ > 0 and (3.3) at η = 0.1, φ⁻², 0.5, 0.77. At η = φ⁻²: p = (0.276, 0.171, 0.276, 0.171, 0.106), min Q⁴ = 0.090.
  - **Eight edges.** Sixteen random lifts (environment dimensions 2–8) satisfy the full complex law, have Choi
    matrices on exactly the eight edges, reset span{001, 101} to |010⟩⟨010|, have the dual effects (4.8),
    F₃ = η(rP_L + P_D) and diag Φ(I) = (2r, r, 2, 2η, η).
  - **Third step.** h, w are orthonormal; the determinant identity (9.12) and its lower bound hold on a grid of t;
    T fails the Knill–Laflamme condition for 160 sampled lifts; a three-Kraus Choi matrix has determinant 0.
  - **Canonical and rotated lifts.** C₁ and C₂ satisfy Knill–Laflamme, the decoder (10.6) restores every logical
    matrix unit, Φ_can³ is the measure-and-prepare map (10.8); the witness determinant is −1/4 at steps 1 and 2 and the
    state is PPT at step 3. For Ξ: (11.4), (12.1), (12.2) and populations p of ψ, and the witness determinant equals
    −η²ⁿ/4 for n = 1…30 at four values of η.
  - **Mixtures.** Φ_ε⁴ − 5ε⁴m R_I/5 has a positive Choi matrix for sampled lifts. For (1 − ε)Ξ + εΨ at η = φ⁻² the
    largest ε keeping step N NPT is 0.575, 0.049, 3.7 × 10⁻³, 4.5 × 10⁻⁴, 6.1 × 10⁻⁵, 8.7 × 10⁻⁶, 1.3 × 10⁻⁶ and
    1.8 × 10⁻⁷ for N = 1…8.
  - **Endpoints.** Sampled lifts at η = 0 satisfy Φ³ = Tr(·)|000⟩⟨000|; at η = 1 the swap code is exact for n ≤ 8,
    the two-step outputs lie in span{010, 101} and Φ(P₀₁₀) = P₁₀₁, Φ(P₁₀₁) = P₀₁₀.
  - **Half.** Φ∘ has Choi eigenvalues 3, 2 and the Gram matrix (17.8); P, M are fixed with diagonal (1, 1, 2, 1, 1)/6;
    E has spectrum 1, 2/3, 0, 0, 0 and is conserved; Φ∘²(Φ∘ − 1)(Φ∘ + ½) = 0. The SDP values of ‖Φ∘ⁿ − T‖_◇ for
    n = 2…10 are 1.3333, 0.6667, …, 0.0052, equal to (4/3)2^−(n−2); ‖T − R_ρt‖_◇ = 2 max{t, 1 − t} at t = 0.5, 0.3;
    the witness eigenvalue is −2^−(n+1) for n = 0…25.
  - **Restricted codes and slow mode.** The two-step error span inside R has dimension 5 and equals ℂP ⊕ B(T); 300
    random two-dimensional codes in R fail. For ε = 0.05, 0.15, 0.4 the SDP distances ‖Φ_εⁿ − R_ρε‖_◇ lie between
    (1 − ε)ⁿ and min{2, 2(1 − ε³/2)^⌊n/3⌋} (at ε = 0.05: 1.726 at n = 1, 0.258 at n = 32); ρ_ε ≥ (ε⁴/8)I; the
    Hermitian Doeblin SDP gives 0 for n = 1, 2, 3.
  - **Selected family.** The 25 × 25 spectrum matches (24.7) at seven values of η; ranks 9, 5, 5; ρ_η is stationary
    with diagonal p; the spectral radius of B_η − R equals max{η, μ₊}; (24.11) and (24.14) hold symbolically;
    (1 − μ₊)/(η − 1/2)² = 0.9993 and 1.0007 at η = 1/2 ∓ 0.002; μ₊ at unit activity is 0.98527216428273156 to 40
    digits. The bound ‖Φⁿ − R_σ‖_◇ ≥ ηⁿ holds on sampled lifts.
  - **Heavy population.** The cap diameter is attained and never exceeded on 3000 sampled pairs; (29.2) and (29.6)
    hold; α = 0.219224. At η = 0.1: k = 1, N = 3, a = 0.7290, κ = 0.8890; three random lifts have SDP distances
    1.89, 0.48, 0.048, 0.0026, 0.00013 at n = 1, 3, 6, 9, 12, below min{2, 10κ^⌊n/3⌋}.
  - **Classification.** The factorization (33.11) and det(λ − K) = λ³(λ + η)(λ − 1) hold symbolically; 1800 random
    lifts at twelve values of η ≠ 1/2 have a simple eigenvalue 1 and all other eigenvalues of modulus below 1 (worst
    0.96 at η = 0.95), each at least η; the family (36.4) has ‖Φ²⁰(P) − Φ²⁰(M)‖₁ → 2 as η → 1/2; the operator-space
    chain reaches 25 dimensions by n = 3 for a random and the canonical lift and stops at 19 for Φ∘.
  - **Recovery.** The brute-force history sums equal the recurrence (40.6) for n ≤ 8; every polar modulus is positive
    diagonal; SDP diamond norms of the Schur error equal (40.9); an SDP over all history-dependent terminal CPTP
    recoveries gives the same optimum (0.083485 at η = 0.3, n = 1; 0.116836 at η = 0.3, n = 2; 0.281447 at η = 0.2,
    n = 2; 0.249143 at η = 0.8, n = 2; 0.088765 at η = 0.65, n = 3); the limit 4/3; the reached sets have sizes 1, 2,
    4, 6, 6, … and the transition table of Theorem 40.3 matches.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The stationary bars and the Q⁴ heat map.
  - The determinant curves of the third-step scene.
  - The witness-determinant lines for Ξ.
  - The ε*(N) curve for the mixtures.
  - The heat maps of P and M, their diagonals, the spectrum of E and the SDP distances to T.
  - The slow-mode SDP distances.
  - The μ₊ curve, the gap curve and the unit-activity point.
  - The p₀ curve and the random-lift SDP distances at η = 0.1.
  - The worst sampled |λ₂| and the operator-space chain dimensions.
  - The recovery error curves and the alphabet bars.
- **Illustrative visuals.** These are illustrations, not data: the scrolling bit stream (a sampled no-11 sequence),
  the pyramid of five windows, the kernel graph, the eight-edge diagram, the plane T, the bit cells handed to the
  environment, the endpoint diagrams, the triangle R with the line and plane, the Bloch-slice cap, the η axis and the
  S₃ hexagon.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
