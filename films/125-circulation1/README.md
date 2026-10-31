# 125 · AURIC CIRCULATION CONTROL I · ONE LOOP, A KL ACTION AND THE FOUR-CORNER SWAP · AURIC 环流控制 第一部 · 一个环、KL 作用量与四角交换

This is part one of three in the AURIC CIRCULATION CONTROL series and runs about 7½ minutes. It covers
`AURIC_FIB_ATOM_CIRCULATION_CONTROL_KL_ACTION_AND_TORIC_RELATIONS.md` at subject commit `6cbf648c08`; the scenes run
from §1 to §24.10, at the beginning, the middle and the end of the volume. Parts two and three will cover the
CONTINUATION and CONTINUATION_2 volumes. Three sites in a row with no two neighbours lit give five states; fixing the
three site frequencies leaves one free number κ = p₁₃, the probability that both ends are lit. The film follows the
single relation h = (1, −1, 0, −1, 1) behind κ through a transport loop, readouts, a KL action, integer and golden-ring
fibers, a toric binomial, window seams and long chains, a finite Robin target, a Fock-space spectrum, two clocks, a
two-copy swap and minimal trades.

## The film, scene by scene

- **One loop (§1, Theorem 1.1; §2, Theorem 2.1; §14, Theorem 14.1; §17, Theorem 17.1).**
  - Each state is an edge from its first two sites to its last two, with left and right pairs kept apart. The four
    states without the middle site, 000, 100, 101 and 001, close a square; 010 lies in a second component.
  - For a finite bipartite support graph, dim ker ∂ = E − V + c. Here 5 − 6 + 2 = 1.
  - With the boundary fixed, κ moves only along the circulation h = δ₀₀₀ − δ₁₀₀ − δ₀₀₁ + δ₁₀₁.
  - A linear readout that factors through (1, X, Y, Z) has ℓ(h) = 0. The weighted mean S = 2x + 3z + 5y pairs with h
    to 0, its second moment to 20 (E[S²] = 4X + 9Z + 25Y + 20κ), and χ = z + xy to 1. If R(h) ≠ 0, the base
    projection together with R recovers κ on the fiber.
- **KL action and base obstruction (§3, Theorems 3.1–3.2; §5, Theorem 5.1).**
  - With X, Y, Z fixed and Z < 1, the action A(κ) = D_KL(p(κ) ‖ p(κ₀)) is measured from the conditionally independent
    point κ₀ = XY/(1 − Z). In the interior of the fiber A′(κ) = log(p₀p₁₃/(p₁p₃)) = log(1 + Δ/(p₁p₃)) and
    A″(κ) = 1/p₀ + 1/p₁ + 1/p₃ + 1/p₁₃ > 0, so κ₀ is the unique minimum and A(κ₀) = 0.
  - A is a dimensionless relative entropy, equal to (1 − Z) times the conditional mutual information of the two ends
    given that the middle site is off. The plot uses X = 0.5, Y = 0.3, Z = 0.1, so κ₀ = 1/6.
  - If the base coordinates lie outside the global base polytope, no κ makes the system globally legal. On the
    five-cycle every window can be ½ δ₁₀₁ + ½ δ₀₁₀ with consistent overlaps, but the total occupancy 5/2 exceeds 2,
    the largest independent set of C₅.
- **The 5040 fiber (§6, Theorem 6.1; §15, Theorem 15.1; §16).**
  - With leaf counts u = a₂ + a₇, v = a₃, w = a₅ + a₇ fixed, n(κ) = 2^(u − κ) 3^v 5^(w − κ) 7^κ and
    n(κ + 1)/n(κ) = 7/10. For 5040 = 2⁴ · 3² · 5 · 7, (u, v, w) = (5, 2, 2) and the fiber is 7200, 5040, 3528.
  - The leaf relation b₂ + b₅ = b₇ has rank one, the same structural type as the five-state relation.
  - In ℤ[θ]/(θ² − θ − 1) with N(a + bθ) = a² + ab − b², the atoms 1, θ, θ², 2 + θ have norms 1, −1, 1, 5. For
    U(a) = 1^a₂ θ^a₃ (θ²)^a₅ (2 + θ)^a₇, N(U) = (−1)^a₃ 5^a₇, so v₅(|N(U)|) = a₇: 0, 1, 2 along the fiber. The film
    calls this the same relation shape on a different carrier; the equality holds for this U.
- **Toric relation (§11, Theorem 11.1; §12, Theorem 12.1).**
  - The pattern columns (mass, X, Y, Z) satisfy c∅ + c₁₃ = c₁ + c₃ = (2, 1, 1, 0), and every integer relation is a
    multiple of (1, −1, 0, −1, 1).
  - For φ(p₀, p₁, p₂, p₃, p₁₃) = (s, sx, sz, sy, sxy), ker φ = ⟨p₀p₁₃ − p₁p₃⟩.
  - On the fiber Δ = p₀p₁₃ − p₁p₃ = (1 − Z)κ − XY. For Z < 1 it vanishes exactly at κ₀, the conditionally independent
    point. It cuts out the independence model, not an identity of every five-state law.
- **Seam minimum (§21, Definition 21.1, Theorem 21.3, Proposition 21.4).**
  - Across a seam the last site of one window and the first site of the next may not both be lit: 21 of 25 pairs are
    legal, the forbidden cells being (R, L), (R, J), (J, L), (J, J).
  - With marginals p, q, r = p_R + p_J, s = q_L + q_J and c = 1 − r − s, legal couplings exist exactly when r + s ≤ 1.
    The grouped coupling P* is the unique minimiser of the mutual information, with
    I_seam = c log c − (1 − r) log(1 − r) − (1 − s) log(1 − s).
  - For uniform marginals, r = s = 2/5, P* = (1/45)·[rows (1, 3, 1, 1, 3) ×3, (3, 0, 3, 3, 0) ×2] and
    I_seam = log 5 − (6/5) log 3 ≈ 0.2911031660.
  - P₋ and P₊ have the same marginals, entropy log 5 and D(P± ‖ P*) = (6/5) log 3, yet the five-cycle target
    Q(P) = Σ A_ik A_jl P_ij P_kl with A = (11/10)11ᵀ − 2C₅ gives Q(P*) = 473/8100, Q(P₋) = −11/20, Q(P₊) = 21/20.
- **Long history (§21, Theorem 21.6, Proposition 21.7).**
  - D(P ‖ Q*_N) = Σ D(Pᵢ ‖ Pᵢ*) + Σ I(Sᵢ₊₁ ; S₁ … Sᵢ₋₁ | Sᵢ): pairing structure beyond the seam reference plus
    long-history structure beyond the Markov completion.
  - For N ≥ 3, words of empty and middle windows with even or odd parity agree on every proper subset of windows, yet
    D(P_e ‖ Q*) = D(P_o ‖ Q*) = log 2 and E(−1)^#T = +1 versus −1.
  - Legal words of N windows number F(3N + 2): 5, 21, 89, 377. With a fully positive realisation, fixing every
    window's marginal leaves F(3N + 2) − 1 − 4N free directions: 0, 12, 76, 360.
- **Finite Robin target (§22, Definition 22.1, Theorem 22.2).**
  - A backward recursion over all primes up to B, keeping every prefix and exponent, has root value
    W₁(1) = max over 5040 < n ≤ B of (σ(n)/n)/(e^γ log log n). The root is below one exactly when every integer of that
    range satisfies Robin's inequality.
  - The frozen Lean theorem `FewDistinctPrimes.robin_lt_223092870` gives Robin's inequality for 5040 < n < 223092870.
  - For n with all prime factors at most 37, σ(n)/n < ∏ p/(p − 1) = 3212440751/477757440 ≈ 6.72398. With
    e^γ > 89/50 and the stated premise log log 2⁶⁴ > 379/100, 89/50 · 379/100 = 33731/5000 exceeds it, so every such
    n ≥ 2⁶⁴ satisfies Robin. The range between 223092870 and 2⁶⁴ still needs a finite box certificate, which the volume
    does not supply.
- **Fock spectrum (§23.4–§23.7, Theorems 23.5–23.6).**
  - With Â = a₁a₃ − a₀a₁₃ and Ĥ = Â†Â on five boson modes, each fixed-charge sector (m; U, V, W), R = m − W, is
    similar to a birth–death chain: Ĥ = −S_π L S_π⁻¹ with rates βₖ = (U − k)(V − k), δₖ = k(R − U − V + k), the
    hypergeometric balance πₖ = C(U, k) C(R − U, V − k)/C(R, V) and eigenvalues λⱼ = j(R − j + 1),
    j = 0 … min(U, V, R − U, R − V). The screen shows U = 6, V = 5, R = 12: 0, 12, 22, 30, 36, 40.
  - Each sector has one zero-energy ray and, when it has more than one state, gap R. Summing over sectors,
    dim ker Ĥ_m = (m + 1)(m + 2)(2m + 3)/6 = C(m + 4, 4) − C(m + 2, 4) = |mP ∩ ℤ³|: 1, 5, 14, 30, 55. The whole
    degree-m space has positive gap 2 for m ≥ 2.
- **Two clocks (§23.11, Proposition 23.10).**
  - In the sector m = 2, U = V = 1, W = 0 with |L⟩ = |0,1,0,1,0⟩ and |R⟩ = |1,0,0,0,1⟩, Ĥ = (1 −1; −1 1) has
    spectrum {0, 2}. From |L⟩ the unitary evolution gives P_R(t) = sin² t; the Markov chain with L = −Ĥ gives
    (1 − e^(−2t))/2.
  - Ψ± = (|L⟩ ± i|R⟩)/√2 have the same five mean occupations, yet d⟨n₁₃⟩/dt = ±1 at t = 0 and
    ⟨n₁₃⟩(t) = (1 ± sin 2t)/2.
- **Two-copy swap (§24.3–§24.6, Theorems 24.3, 24.5, 24.8, Proposition 24.6).**
  - With A = |0,13⟩⟨1,3| + |13,0⟩⟨3,1| and V = A + A†, [Q_a, V] = 0 for the total mass and the three occupations.
    Among exchanges that keep them, none is one-for-one and the unique two-for-two collision is {0, 13} ↔ {1, 3}.
  - From two independent preparations |ψ⟩ ⊗ |ψ⟩ with ψₛ = √pₛ e^(−iθₛ), each copy's law becomes p + δκ h with
    δκ = −Δ sin² u + R sin χ sin 2u, R = √(p₀p₁p₃p₁₃), χ = θ₀ − θ₁ − θ₃ + θ₁₃ (four base corners positive).
  - For uniform p, χ = 0 gives κ′ = 1/5 for all u; χ = π/2 gives κ′ = 1/5 + sin(2u)/25, which is 6/25 at u = π/4.
  - Re-pairing fresh independent copies of the diagonal law each round with u = π/2 gives κ′ = Zκ + XY and
    Δ′ = ZΔ (shown for X = 0.3, Y = 0.25, Z = 0.4, κ* = 0.125). The same pair swapped again returns its joint law.
- **Minimal trades (§24.8–§24.10, Theorems 24.12–24.13, Propositions 24.14–24.15).**
  - On a path of n sites, a nonzero integer change of legal histograms that keeps every moment up to order r has volume
    m(c) = ‖c‖₁/2 ≥ 2^r, and exists exactly when r < ⌈n/2⌉.
  - Changing only one moment μ_T of order k ≥ 2 forces c = a D_T and m(c) = |a| 2^(k − 1); for T = {1, 3, 5} the
    exchange is {∅, 13, 15, 35} ↔ {1, 3, 5, 135}.
  - On nine sites there are 89 legal sets (orders 1, 9, 28, 35, 15, 1); fixing the 38 moments of order at most two
    leaves 51 directions; isolating one moment of order 3, 4 or 5 costs 4, 8 or 16 copies per side.

Not covered on screen: the editor qualifications Q1–Q15 (their conditions are kept in the statements above); the
closed-loop holonomy rank condition of §4; the visibility–control–action triad of §7; the dynamic future quotient of
§8; the four-fold structure theorem of §9; the evidence-type sections and §§13, 18–20, which restate the results above;
in §21 the Fisher decomposition (Proposition 21.5), the Pinsker and finite Bellman applications, the three-window count
52 and the endpoint moments (Proposition 21.10); in §22 the log-sum-exp bounds, the Fibonacci digit coding, the
block-composition hulls and the twelve-prime compression lemma; in §23 the integer transport weights (§23.1), the
complex defect and the singular quadric with its moment image (§23.2–§23.3), the minimal operator degree
(Proposition 23.4), coherent states (Theorem 23.7), the ground-state fluctuation and local frequency
(Propositions 23.8–23.9) and the four-wave spectral complement (Proposition 23.11); in §24 the phase quotient and
Schur rigidity (§24.1–§24.2), the charge table of Sym² (Proposition 24.4), the phase readouts and the Hamiltonian link
(Propositions 24.6–24.7, beyond the uniform example), the phase drift (Theorem 24.9), the reparametrisation clock
(Theorem 24.10) and the phase monomial of Proposition 24.14.

一部约七分半钟的片子，AURIC 环流控制系列的第一部（共三部）：一排三个格位、相邻不能同时点亮，共五种状态；固定三个格位频率后只剩一个自由数 κ = p₁₃。运输图上不含中位的四个状态围成唯一的环（5 − 6 + 2 = 1），κ 沿 h = (1, −1, 0, −1, 1) 变化，任何只经过格位频率的读出都看不见它，而一个非零配对（如 S² 的 20）就能恢复它；相对条件独立点 κ₀ = XY/(1 − Z) 的 KL 作用量严格凸、极小点唯一，而基础层的障碍（五环上 5/2 > 2）任何 κ 都修不好；整数 7200、5040、3528 构成每步乘 7/10 的纤维，黄金环范数中 5 的幂次读出 κ；toric 映射的核由唯一的二项式 p₀p₁₃ − p₁p₃ 生成，在纤维上等于 (1 − Z)κ − XY；两窗口接缝上 25 个配对中 21 个合法，均匀边缘的最小互信息为 log 5 − (6/5) log 3，而同边缘、同熵、同散度的两个耦合在五环目标上给出 −11/20 与 21/20；长链散度分解为配对项与长历史项，奇偶校验律只在长历史中相差 log 2；有限 Robin 目标的根值小于一等价于区间内每个整数满足 Robin 不等式，Lean 冻结定理覆盖 5040 < n < 223092870；五个玻色模上的 Â†Â 在每个固定荷扇区相似于超几何平衡的生灭链，特征值为 j(R − j + 1)，零能空间维数 1、5、14、30、55 正是金字塔格点数；最小扇区上同谱的酉演化与 Markov 链给出 sin² t 与 (1 − e^(−2t))/2，平均占位相同的两个态未来却相反；两份副本的唯一最小交换是 {0, 13} ↔ {1, 3}，κ 的变化由 Δ 与关系相位 χ 决定，重新配对时缺陷按 ZΔ 收缩；最后，保持 r 阶以下全部矩的整数交换至少需要 2ʳ 份副本，九个格位上孤立三、四、五阶矩分别需要 4、8、16 份。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-125-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** Two frozen theorems are cited, and the `lean` badge is used only for the sentence that
  states the first one.
  - The volume has no digestion directory at the subject commit (it was added as a pure theory volume and has not been
    ingested), so it has no atoms and the digestion ledger does not link any declaration to it.
  - §22 of the volume cites `D5.S3.Arith.Robin.FewDistinctPrimes.robin_lt_223092870`: for 5040 < n < 223092870,
    σ(n)/n < e^γ log log n. The state file `Golden/Frozen/state/D5/S3/Arith/Robin/FewDistinctPrimes.lean.json` exists
    at the subject commit and lists the declaration. The sentence "A frozen Lean theorem covers every n from five
    thousand forty to two hundred twenty-three million" in the Robin scene and the matching clause of the finale's
    evidence line carry the `lean` badge.
  - §22 also cites `D5.S3.Arith.Robin.ElevenSmooth.exp_gamma_lower` (89/50 < e^γ), whose state file
    `Golden/Frozen/state/D5/S3/Arith/Robin/ElevenSmooth.lean.json` exists. It is labelled "(Lean)" on screen inside a
    theory-badged sentence. The second premise log log 2⁶⁴ > 379/100 is a stated condition of the volume.
  - The volume also cites the frozen `RoughPrimeSuffixBellman.rough_prime_suffix_complete` and
    `RealL2FirstReturnMoments.endpoint_moments`; neither is used in the film.
- **Published results used as inputs.** The trade-bound sentence of the last scene and the finale badge them as
  published.
  - Robin's criterion: G. Robin, *Grandes valeurs de la fonction somme des diviseurs et hypothèse de Riemann*,
    J. Math. Pures Appl. 63 (1984) 187–213, Theorem 1 (attribution also via Washington–Yang, arXiv:2008.04787v1).
  - The Bernoulli–Laplace exchange chain: Lim–Pickering, arXiv:1812.01143v1, §2 and (3.25); the volume proves its
    own parameter instance, and the film badges the sector scene as theory.
  - The Boolean-cube trade volume bound: Ghorbani–Kamali–Khosrovshahi–Krotov, arXiv:1810.02296v2, §2.1 and §3
    Lemmas 3–4.
  - Cited in the volume but not used in the film: Canonne, arXiv:2202.07198v2 (Pinsker); Bellman, *Dynamic
    Programming*; Odzijewicz–Wawreniuk, arXiv:2003.03060v1; Sullivant, arXiv:math/0602052v1; Bargmann,
    doi:10.1002/cpa.3160140303; Ashtekar–Schilling, arXiv:gr-qc/9706069.
- **Classical tools named in the volume.** Rank–nullity and the cycle space of a graph, KL nonnegativity, monomial
  (toric) ideals, multiplicativity of the golden-ring norm, Möbius inversion on Boolean intervals.
- **Project inputs from other volumes, badged as theory.** The same-margin seam kernel of the hidden-relations volume
  (C-17.1–C-17.4) and its entropy Hessian (C-4.6); the integer kernel and lattice count
  (m + 1)(m + 2)(2m + 3)/6 = |mP ∩ ℤ³| of the foundational-formulas volume (Propositions 12.3–12.4, §12.1–§12.4); the
  five-cycle target A = (11/10)11ᵀ − 2C₅ of the common-source positivity volume (C-30.6).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy exact arithmetic and Gröbner bases, scipy
  integer programming, cvxpy with Clarabel) checks the following.
  - **Loop.** The transport graph has E = 5, V = 6, c = 2, boundary rank 4 and a one-dimensional cycle space spanned by
    h; Ah = 0; S takes the values 0, 2, 3, 5, 7 with S(h) = 0, S²(h) = 20, χ(h) = 1; E[S²] = 4X + 9Z + 25Y + 20κ and
    blindness of base readouts on 50 random laws.
  - **Action.** A′ and A″ by finite differences on 200 random interior laws, and A = (1 − Z)·CMI; the plotted curve
    (X = 0.5, Y = 0.3, Z = 0.1) has its unique minimum at κ₀ = 1/6. C₅ has independence number 2; the window laws are
    consistent; 5/2 > 2.
  - **5040 fiber.** (u, v, w) = (5, 2, 2); 7200, 5040, 3528 with ratios exactly 7/10; atom norms 1, −1, 1, 5;
    N(U) = 1, 5, 25 and v₅ = 0, 1, 2; norm multiplicativity on 200 random pairs.
  - **Toric.** The integer kernel is spanned by (1, −1, 0, −1, 1); lex Gröbner elimination of s, x, y, z returns
    exactly p₀p₁₃ − p₁p₃; Δ = (1 − Z)κ − XY symbolically.
  - **Seam.** 21 legal pairs and the four forbidden cells; P* = table/45; I_seam = 0.2911031660; convex max-entropy
    solves reproduce I_seam(r, s) on uniform and six random marginal pairs; P± are legal with entropy log 5 and
    D(P± ‖ P*) = (6/5) log 3; exact rationals Q(P*) = 473/8100, Q(P₋) = −11/20, Q(P₊) = 21/20.
  - **Long history.** Enumeration gives |Ω_N| = 5, 21, 89, 377 = F(3N + 2), window-marginal rank 1 + 4N and fiber
    dimensions 0, 12, 76, 360; at N = 3 the adjacent-pair fiber has dimension 52; the parity laws agree on all proper
    subsets for N = 3, 4, 5 and have divergence log 2.
  - **Robin.** e^γ = 1.7810724 > 89/50; log log 2⁶⁴ = 3.79247 > 379/100; the product over p ≤ 37 equals
    3212440751/477757440 < 33731/5000; Robin's inequality holds on 5041…10000 with W₁(1) = 0.976893 at n = 7560 for
    B = 10000; F₂₃ = 28657; the prime-compression inequality R(n) ≤ R(n₀) on 300 random cases.
  - **Fock spectrum.** For every sector with m ≤ 12 (3184 sectors): Ĥ = −S_π L S_π⁻¹, hypergeometric balance, the
    spectrum j(R − j + 1), mean UV/R and the variance formula. Building Ĥ_m on Sym^m ℂ⁵ directly gives
    dim ker Ĥ_m = 1, 5, 14, 30, 55, 91 for m = 0…5 and full-space gap 2 for m ≥ 2.
  - **Clocks.** spec Ĥ = {0, 2}; sin² t and (1 − e^(−2t))/2 from matrix exponentials; Ψ± have equal means,
    derivatives ±1 and futures (1 ± sin 2t)/2.
  - **Swap.** [Q_a, A] = 0; a search over histograms finds no one-for-one exchange and the unique two-for-two exchange
    {0, 13} ↔ {1, 3}; Sym² has 15 basis pairs and 14 charges; the exact two-copy evolution reproduces
    p′ = p + δκ h on 100 random preparations; the uniform curves and κ′ = 6/25 at u = π/4; the re-pairing recursion
    κ′ = Zκ + XY and Δ′ = ZΔ for eight rounds; a second swap of the same pair returns the joint law.
  - **Trades.** Integer programming gives the minimal volume 2^r exactly when r < ⌈n/2⌉ for n = 2…7, r = 0…3; on nine
    sites 89 sets with orders 1, 9, 28, 35, 15, 1 and 89 − 38 = 51; D_T changes only μ_T, with volumes 4, 8, 16 for
    orders 3, 4, 5; the 4-for-4 example changes only μ₁₃₅; isolating μ₁₃₅ on five sites needs volume 4.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The bars of h and the readout table; the A(κ) curve with κ₀.
  - The exponent bars of 7200, 5040, 3528 and the norm cells.
  - The Δ line on the fiber.
  - The legal seam grid, the tables P*, P₋, P₊ and the Q values.
  - The bars 5, 21, 89, 377 and 0, 12, 76, 360.
  - The Robin ratio bars on 5041…10000 (maximum per 100) and the maximum at 7560.
  - The sector chain, the hypergeometric bars and eigenvalues; the bars 1, 5, 14, 30, 55 and the 14 lattice points of 2P.
  - The clock curves sin² t, (1 − e^(−2t))/2 and (1 ± sin 2t)/2.
  - The swap curves κ′(u), the re-pairing dots, the minimal-volume table and the order counts on nine sites.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid of the five states and the three-site rows;
  - the square transport loop with its moving dot;
  - the five-cycle with half-filled sites and window rings;
  - the chain of windows and the parity word grids;
  - the prime path circles and the log-scale number line;
  - the two-state diagram, the two-copy pair grid with its arrows and the path of sites.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
