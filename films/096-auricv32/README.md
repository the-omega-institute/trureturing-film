# 096 · AURIC V31–V32 · GOLDEN CANTOR GATES AND PREDICTIVE MEMORY · AURIC V31–V32 · 黄金康托门与预测记忆

This film continues the versioned AURIC volumes and runs about 7½ minutes (7:28). It covers two volumes of
trureturing at subject commit `1a81b54996` (the repository holds two V31 volumes; the other one is in film 095):
- `AURIC_ENDOGENOUS_PREDICTION_NONCOMMUTING_GOLDEN_RECURSION_AND_INFORMATION_GEOMETRY_V31.md`, §1–§10;
- `AURIC_NATIVE_GOLDEN_READOUT_INTERNAL_CONSERVATION_AND_PREDICTIVE_MEMORY_V32.md`, §1–§11.

Version thirty-one takes "prediction is recursion, variation and growth" apart into separate theorems: an unknown
readout scale, positive prediction, the state an observer must keep, a Fisher ledger for records, a noncommuting golden
gate family with an exact fractal dimension, and information geometry. Version thirty-two connects these to a native
one-sided golden readout, sharp conservation, two separate stability budgets and the exact memory a predictor needs.
Everything stays inside one fixed state of one algebra; the probability and instrument rules each section uses are
stated as inputs.

## The film, scene by scene

- **Unknown ruler (V31 §2; V32 §2–§3).**
  - The source contracts of the quantum continuation leave the second readout as G = cq + d, with d_w ≥ 0,
    Σ d_w = 1 − c, 0 < c ≤ 1, and record mass a = c/(x + c), where x = 1/φ (V31 Theorem 2.1, a project input).
  - With m ≥ 2 distinct basis calibrations, 1 − c ≤ Σ εⱼ/(m − 1). Two exact readings force c = 1; one is not
    enough, since d = (1 − c)δ at w₁ passes it (Theorem 2.2). TV(G(ψ), G(χ)) = c · TV(q(ψ), q(χ)) (Theorem 2.3).
  - A native third reader with five fixed continuations ε, 3, 13, 013, 0013 closes the family: F = G = q, c = 1,
    a = x, b = x³ (source Theorem 112.1, a project input).
  - With all five residuals at most ε and mass margin a ≥ h > 0, 1 − c ≤ 4ε/(hx²) and
    |b − x³| ≤ (1 + 2x²)(1 − c) + 4ε/x (Lemma 3.2, Theorem 3.3). Without a margin there is no uniform bound
    (Proposition 3.4).
- **State and ruler (V31 §3, §5.4–§5.5, Proposition 8.7).**
  - Chaining one affine channel contracts total variation by cⁿ (Proposition 3.1). Repeating the noisy readout on a
    persistent orthogonal label still identifies it with error at most min{1, 13/(nc²)} (Theorem 3.2).
  - Under full control, (5/12) c D_tr ≤ sup_U |R_U(ρ) − R_U(σ)| ≤ c D_tr in the thirteen-dimensional rank-five case
    (Theorem 5.4, (19)).
  - All control statistics depend only on X = c(ρ − I/D) and the averaged outputs β. Lowering the purity of ρ while
    raising c changes nothing (Theorem 5.5); this direction is Fisher-null (Proposition 8.7), and the remaining
    freedom is the interval −Dλ_min(X) ≤ c′ ≤ min(1, D min β) ((22)).
- **Positive prediction (V31 §4, §5.1–§5.3).**
  - The square-loss predictor from commuting records is Q(A) = Σ_h Re Tr(ρP_hA)/p_h · P_h, with a Pythagorean risk
    identity and a tower property (Theorem 4.2).
  - In the qubit example ρ = (I + sX)/2, P₀ = (I + Z)/2, the projection A has coefficient (1 − √(1 + s²))/2 < 0.
    Q is a positive map exactly when [ρ, P_h] = 0 for all h, and is then a completely positive conditional
    expectation (Theorems 4.3–4.4).
  - Allowing every future instrument, the observer must keep exactly the restriction of the state to the recursive
    closure S∞ of future effects; it updates on its own and dim S∞ ≤ D² (Theorem 5.2). When S∞ is all Hermitian
    matrices in dimension 13, a linear summary needs 13² − 1 = 168 coordinates (Proposition 5.3).
- **Fisher ledger (V31 §6).**
  - S_(n+1) = S_n + ξ_(n+1) with E[ξ_(n+1) | H_n] = 0, so I_(n+1) − I_n = E ξ²_(n+1), and a fixed coarse-graining
    loses exactly E Var(S_n | Y) (Theorem 6.2).
  - For a persistent binary target with λ-free record kernels,
    I_n = π′²/(π(1 − π)) − π′²/(π²(1 − π)²) · E[q_n(1 − q_n)] (Theorem 6.3). For the qubit angle with
    π = sin²(λ/2) the budget is exactly 1.
- **Golden Cantor gates (V31 §7).**
  - Layer k applies exp[−i c_k(2b_k − 1)H], with c_k = (1 − r)r^(k−1), r = φ⁻², and an axis that may depend on the
    prefix (Theorems 7.2 and 7.4).
  - Programs sharing n bits give gates with ((5 − 11r)/3) d_r ≤ ‖U(b) − U(b′)‖ ≤ 2d_r, d_r = rⁿ; (5 − 11r)/3 ≈ 0.266.
  - The gate image, the projective image and the Bell-reference readout image all have Hausdorff dimension
    log 2/(2 log φ) ≈ 0.7202 (Theorem 7.5, Proposition 7.6). Layers cancelling in pairs give only the identity,
    so first-bit separation is needed. A finite prefix of depth N has tail at most M r^N (Theorem 7.8).
- **Information geometry (V31 §8).**
  - The quantum geometric tensor χ is one Gram matrix for metric and phase curvature (Theorem 8.2). On the Bloch
    chart ds² = (dθ² + sin²θ dφ²)/4 and F_θφ = ½ sin θ, with equality in (38) (Proposition 8.3). A fixed readout has
    Fisher information at most 4g, attained locally (Theorem 8.4).
  - Two orthogonal directions cannot both be read in full: I_xx + I_yy ≤ 1 (Proposition 8.6).
  - With a Bell reference one four-outcome readout gives I_ij = δ_ij = 4g_ij on three gate axes (Proposition 8.8).
    For a known prefix it determines the golden gate, with m_δ‖U − U′‖ ≤ TV ≤ ‖U − U′‖, m_r ≈ 0.133 > 3/50, and the
    image keeps dimension 0.7202 (Theorem 8.9, Corollary 8.10).
- **Loops and carrier (V31 §9–§10).**
  - The loop C = e^(−itA)e^(−isB)e^(itA)e^(isB) equals I − ts[A, B] up to a remainder at most
    2|ts|(|t|‖A‖ + |s|‖B‖)‖[A, B]‖; adjacent golden layers from k = 2 on give strictly nontrivial loops
    (Theorem 9.1). Orthogonal clock labels keep ‖W_mΩ − W_nΩ‖ = √2 (Proposition 9.2).
  - In the native 89-dimensional carrier, program, data and reference fit while 2^(N+2) ≤ 64, so prefixes of up to
    four bits are realised to any accuracy by native words with one common phase (Theorem 10.1).
- **One-sided readout (V32 §4).**
  - M₀ = √x E, M₁ = xE + ζ⁻³P is complete and equals the native port (I ⊗ B_R)V up to ζ² ((2), Definition 4.1,
    Proposition 4.2). A zero outcome sets the protected weight to zero for good.
  - P(1ⁿ) = q₀ + (1 − q₀)x²ⁿ and qₙ = q₀/(q₀ + (1 − q₀)x²ⁿ) (Theorem 4.3). The first zero, given that it comes,
    waits a geometric time with mean 1/x = φ (Corollary 4.4).
- **Sharp conservation and two budgets (V32 §5–§7).**
  - Φ*(P) = P for all inputs exactly when every Kraus operator commutes with P (Theorem 5.2), so random mixing cannot
    hide leakage (Corollary 5.4).
  - With defect δ, an exactly conserving isometry W lies within √λ + 1 − √(1 − λ), δ² ≤ λ ≤ δ (Theorem 6.2); the
    rotated readout R_θP_i shows the square-root scale is sharp (Proposition 6.3).
  - Summable mean drift plus an information error that only tends to zero gives q_n → {0, 1} with
    |P(q∞ = 1) − q₀| ≤ D* (Theorem 7.2). With sin θ_n = 1/(n + 2) the error is not summable but the squares are, and
    the pointer settles (Proposition 7.6).
- **Predictive memory (V32 §8, §10–§11).**
  - To predict the next outcome within ε after every history, a deterministic predictor needs exactly N_ε + 2 states,
    N_ε = ⌈log((1 − q₀)(x − 2ε)/(2εq₀))/(2 log φ)⌉, for 0 < ε < x/2; one state suffices for ε ≥ x/2, and no finite
    predictor exists for ε = 0 (Theorem 8.2).
  - The depth-n coarse instrument is K₀,ₙ = √(1 − x²ⁿ)E, K₁,ₙ = xⁿE + ζ⁻³ⁿP (Theorem 10.1). Coherent records span two
    dimensions, an archive of all histories needs 2ⁿ, and saved labels cannot be reset for free (Propositions
    10.2–10.3). An exact clock only moves the counter (§8, §11).
- **Dark outcome (V32 §9).**
  - M₀⁽ˢ⁾ = √x E + √s P, M₁⁽ˢ⁾ = xE + √(1 − s)ζ⁻³P still conserves P; the n-round record laws differ by
    q₀[1 − (1 − s)ⁿ] ≤ q₀ns (Definition 9.1, Proposition 9.2).
  - Yet a finite-state predictor for all histories exists only when ε ≥ (x − s)/2 (Theorem 9.3), while the posterior
    still polarises almost surely (Corollary 9.4).

一部约七分半的片子，延续 AURIC 版本系列，覆盖第三十一与第三十二版：未知读尺 G = cq + d 由两次校准或一个原生第三读者确定，五个残差给出 1 − c ≤ 4ε/(hx²)；态与尺子只在 X = c(ρ − I/D) 中被看见；平方预测为正当且仅当态与记录对易，保留全部未来所需的是 S∞ 上的限制；记录信息以正交增量累加，持久二元目标的信息缺口有精确公式；非交换的黄金门族给出维数 log2/(2logφ) ≈ 0.72 的分形门像，Bell 参考的四结果读口在已知前缀下确定黄金门；单侧黄金读口 M₀ = √x E、M₁ = xE + ζ⁻³P 给出闭式历史律，全历史预测恰需 N_ε + 2 个状态；而任意微小的暗结果使有限记忆在 ε < (x − s)/2 时不可能。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-096-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** The first line of the one-sided readout scene, the first sentence of its second line,
  the first line of the memory scene and the finale's evidence line carry the Lean badge.
  - The V32 digestion directory has 2 absorbed-closed and 45 residual-open atoms (plus 47 context records). Both
    absorbed-closed atoms are Theorem 8.2 (the minimum N_ε + 2 and the ε = 0 clause). Their coverage GIDs are
    `D5/S3/Quantum/Measurement/OneSidedGoldenHistory.native_predictor_minimum` and
    `D5/S3/ObserverMemory/Prediction/OneSidedPredictorMinimum.exact_prediction_impossible`; both state files exist
    under `Golden/Frozen/state/` at the subject commit.
  - The frozen statement of `native_predictor_minimum` also contains Kraus completeness, the native port identity
    (nativePort = ζ² · kraus, equation (2)), the closed-form mass and posterior of 1ⁿ (Theorem 4.3) and the zero
    posterior after a zero outcome. The film badges those sentences as Lean as well. The ledger links this
    declaration to the volume only through the Theorem 8.2 atoms; the Theorem 4.3 atom itself is residual-open.
  - The mean wait φ (Corollary 4.4) is not in the frozen statement and is badged as theory.
  - The V31 digestion directory has 61 residual-open atoms (plus 61 context records); no Lean declaration covers
    any V31 statement shown.
- **Published results, used as external inputs.** The geometry scene and the finale badge them as published. The
  volume gives its own proofs of the qubit cases used.
  - Braunstein–Caves, Phys. Rev. Lett. 72, 3439 (1994), doi:10.1103/PhysRevLett.72.3439 (Fisher bound).
  - Anandan–Aharonov, Phys. Rev. Lett. 65, 1697 (1990), doi:10.1103/PhysRevLett.65.1697 (generator variance and
    path length).
  - Gill–Massar, Phys. Rev. A 61, 042312 (2000), arXiv:quant-ph/9902063 (multi-parameter trade-off).
  - Galley–Masanes (arXiv:1610.04859) and Masanes–Galley–Müller (arXiv:1811.11060) are cited by the source
    classification; the film does not draw on them.
- **Classical tools named in the volumes.** Chebyshev's inequality with a union bound, Haar averaging,
  Cauchy–Schwarz, the Duhamel formula, Bernoulli's inequality, bounded martingale convergence, the mass distribution
  bound for Hausdorff dimension, and eventual periodicity of finite automata.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the quantum continuation II: the classification G = cq + d (§104), the finite supply contract (§106), the third
    reader identity and closure c = 1, a = x, b = x³ (§§111–112, row restrictions §112.5), the residual budget
    (§113) and the full PU(89) native density (§100);
  - the single-copy five-phase bound 2/5 of v28, and the martingale stabilisation of v30;
  - Typed cocycle §24, cited in V32 §11 and not shown.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (96 checks) recomputes the following:
  - **Ruler.** Theorem 2.2 on 4000 random (c, d, m); the determinant identity
    |Im(ᾱ_c β_c)| = sin(3π/5)[1 + x(2c − c²)] on a grid; the 13 legal of 1024 Kraus completeness. Simulated QND
    misclassification at c = 0.1 is 0.082, 0.013, then 0 for n = 25, 50, ≥ 100, under 13/(nc²).
  - **Closure.** Equation (2) with B_R unitary on a random rank-five projection in dimension 13. The (1, x, 1)
    elimination of Lemma 3.2 on 300 random A. 1 − c ≤ 4ε/(ax²) and the bound on |b − x³| on 6000 random (c, b, d);
    c = 1, a = x, b = x³ ≈ 0.2361 makes all five residuals vanish. With b = a and c → 0, max |r| = 0.0005 while
    TV(G, F) = 0.999 at c = 0.001.
  - **State and ruler.** (5/12) D_tr ≤ d₅ ≤ D_tr on 400 random pairs in dimension 13; adversarial spectra give
    min d₅/D_tr = 0.667. Equal control readouts along ρ′ = (c/c′)ρ + (1 − c/c′)I/D, and the fibre [0.479, 1] for the
    D = 4, c = 0.6 example. Pure-state recovery c = √(D Tr X²/(D − 1)).
  - **Prediction.** Theorem 4.2 risk identity on 200 cases; B_h ≥ 0 exactly when [ρ, P_h] = 0 on 300 cases;
    q₀(A) = (1 − √(1 + s²))/2 down to −0.207 at s = 1; Proposition 4.6 on 500 cases; the three-axis sum 2;
    closure dimensions 1, 2, 3, 4, 5, 5 for a D = 3 menu.
  - **Fisher.** Exact sums for noisy QND records (flip 0.2, λ = 1.1) match (25); I₁₀ = 0.945, I₄₀ = 0.99996, I_Z = 1.
  - **Cantor gates.** On 1500 program pairs (odd layers X, even Z) the ratio ‖U(b) − U(b′)‖/d_r lies in
    1.003–1.543, inside [0.266, 2]; projective and Bell readout bounds hold; q* = 0.990, a* = 0.0196; paired layers
    cancel to I; log 2/(2 log φ) = 0.720210.
  - **Geometry.** The Bloch tensor and equality in (38); Fisher ≤ 4g on 300 random POVMs with attainment;
    I_xx + I_yy ≤ 1 on 400 qubit POVMs; the Bell readout gives I = I₃ = 4g at 0 and I = 4g nearby; m_r = 0.1327 and
    the TV sandwich in cylinders of depth 1–3.
  - **Loops.** Theorem 9.1 on 500 random cases; for golden X, Z layers k = 2–10 the loop norm follows 2ts
    (log₁₀ from −1.38 to −8.06). Clock labels stay √2 apart; ds/dτ = ΔH.
  - **One-sided readout.** Completeness, commutation and P-conservation; the closed form for n ≤ 24; zero posterior
    after a zero; P(T = n | T < ∞) = x(x²)^(n−1) with mean φ.
  - **Conservation.** Theorem 5.2 on 200 instruments; δ² ≤ λ ≤ δ and ‖V − W‖ ≤ √λ + 1 − √(1 − λ) on 300 random
    isometries; the rotated readout has defect sin²θ and distance sin θ. Σ sin²θ_n → π²/6 − 1 = 0.645 for
    sin θ_n = 1/(n + 2) (simulated mean flips 0.667); for 1/√(n + 2) the sum reaches 7.87 at n = 4000.
  - **Memory.** N_ε by the formula equals min{n : p_n ≤ 2ε}. An exhaustive search over all deterministic automata
    gives minimum state counts N_ε + 2 for (q₀, ε) = (0.5, 0.2), (0.5, 0.12), (0.5, 0.06), (0.3, 0.1), (0.8, 0.05)
    and (0.5, 0.035), with N_ε = 0, 1, 2, 2, 1, 3. The depth-4 coarse Kraus pair, the two-dimensional span of
    depth-5 coherent records, and E Φ(ρ)P = xζ³ EρP.
  - **Dark outcome.** ‖V_s − V₀‖ = √(2 − 2√(1 − s)); the n-round TV equals q₀[1 − (1 − s)ⁿ] by exact enumeration
    for n ≤ 8; next-zero probabilities over all histories of depth ≤ 14 fill [0.100, 0.618]; one constant state
    achieves (x − s)/2; a simulated conserving readout polarises with P(q∞ = 1) ≈ 0.397 at q₀ = 0.4.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The mass curve a = c/(x + c) and the residual-bound scatter.
  - The QND error dots under 13/(nc²), and the fibre interval.
  - The negative-coefficient curve and the closure-dimension bars.
  - The Fisher curve I_n.
  - The gate-ratio scatter and the Cantor dust of 512 prefix gates with their prefix centres.
  - The two-direction Fisher scatter.
  - The loop-norm dots and 2ts line.
  - The mass and posterior curves and the first-zero bars.
  - The near-conservation scatter with its bound and √δ curve, and the expected-flip curves.
  - The p_n stems with the 2ε line and the automaton-search results.
  - The dark TV curve and the next-zero traces for s = 0 and s = 0.1.
- **Illustrative visuals.** These are illustrations, not data:
  - the channel chain boxes, the state disk and ruler bar, and the program-bit tree;
  - the orthogonal-increment staircase and the Bloch sphere;
  - the loop square, the carrier bars and the archive bars (exact arithmetic);
  - the likelihood bars, the Bell sign cells and the automaton diagram.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
