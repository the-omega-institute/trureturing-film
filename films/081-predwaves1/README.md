# 081 · AURIC PREDICTIVE WAVES I · POSITIVE KERNELS, LOOP PHASES AND LOCKED FUTURES · AURIC 相容预测波 第一部 · 正核、环相位与锁定的未来

This is part one of the AURIC PREDICTIVE WAVES series and runs about 7½ minutes (7:25). It covers two volumes of
trureturing at subject commit `dd01fdf4f4`:
- `AURIC_COMPATIBLE_PREDICTIVE_WAVES_AND_RELATIONAL_SPECTRA.md`, §1–§38;
- `AURIC_COMPATIBLE_PREDICTIVE_WAVES_AND_RELATIONAL_SPECTRA_II.md`, §39–§43.

Its ten content scenes draw on §§1–5, 7, 9, 15–21, 25, 27, 29–31 and 35–38 of the first volume and §§39–42 of the
second. The film asks when compatible predictions on the five legal modes of one AURIC atom behave as a wave. It keeps the
whole kernel of cross relations, follows the single loop phase of the flip graph, and then asks which futures an
observer on the project's actual five-dimensional instrument can still tell apart. The last two scenes come from the
second volume, which keeps the branch labels of the same instrument.

## The film, scene by scene

- **Spectrum and kernel (§1–§2, §9, §27).**
  - Two Hamiltonians with the same eigenvalues ±1, H₁ = diag(1, −1) and H₂ = X, give return probabilities 1 and cos²t
    from |0⟩ (Proposition 1.3).
  - The Fourier vectors F = (1, 1) and G = (1, i) have the same power spectrum, but their signals f = (1, 0) and
    g = ((1 + i)/2, (1 − i)/2) are not cyclic shifts of each other (Proposition 9.2). If every Fourier coefficient is
    nonzero, the bispectrum B_f(k, l) = F_k F_l conj(F_(k+l)) fixes the signal up to a cyclic shift (Theorem 9.3).
  - Three unit predictions with pairwise overlaps −3/4 pass every 2 × 2 test, but their Gram matrix has eigenvalue
    −1/2 on (1, 1, 1), so they have no common realisation (Theorem 2.5, Example 2.6).
  - One quarter-phase reference z = (1, i)/√2, composed m times, tests strong positivity:
    D ⪰ 0 ⇔ 1_E†(D ⊗ R^⊗m)1_E ≥ 0 for all m and E. At m = 3 the four phases occur (1, 3, 3, 1) times, and every class
    has at least 2^(m−3) members (Theorem 2.10).
  - If ‖D‖ ≤ M and λ_min(D) ≤ −α for a k × k kernel D, a coherent test with t_D(E) ≤ −α/(288k) exists at depth
    m ≤ 4 + log₂(27kM/α) (Theorem 27.2).
- **Complex phases (§3–§4).**
  - On a real two-dimensional amplitude plane, rotation invariance and additivity on orthogonal parts force
    W(a) = ‖a‖² (Theorem 3.2).
  - If chaining is bilinear with a two-sided unit and weights multiply, write u² = a + bu. Then
    W((t + u)u) = a² + (t + b)² = t² + 1 for all t gives b = 0 and a = ±1, and a = +1 is excluded because
    (1 + u)(1 − u) = 0 while W(1 + u)W(1 − u) = 4. So u² = −1 and the plane is ℂ (Theorem 3.3).
  - A continuation that conserves every cross relation, K(rp, rq) = K(p, q), induces an isometry, unitary in finite
    dimension, and the amplitudes are a_s(n) = Σ_j e^(−inθ_j) ⟨e_s, P_j ψ⟩ (Theorem 4.2).
  - Conserving each norm is not enough: two orthonormal vectors sent to one vector keep their norms while
    ‖v₁ − v₂‖² goes from 2 to 0 (Proposition 4.3). A matrix T preserves a positive metric exactly when it is
    diagonalisable with all eigenvalues of modulus one (Theorem 4.4).
- **Five-mode wave (§5, Theorems 5.1–5.2, Corollary 5.3).**
  - The legal modes (0, 1, 2, 3, 13) = (000, 100, 010, 001, 101) are coupled by single flips: the four-cycle
    0 – 1 – 13 – 3 – 0 and the leaf 0 – 2.
  - det(λI − K) = λ(λ⁴ − 5λ² + 2), with frequencies 0, ±ω₊, ±ω₋, ω±² = (5 ± √17)/2, and the dark mode
    (|1⟩ − |3⟩)/√2.
  - From |0⟩, c₀(τ) = w₊ cos ω₊τ + w₋ cos ω₋τ with w± = (1 ± 1/√17)/2, and the cyclic space has dimension 4.
  - ω₊²/ω₋² = (21 + 5√17)/4 is irrational, so the state never returns exactly for τ > 0 but returns arbitrarily
    closely.
- **One loop phase (§5, Theorems 5.5–5.6, Proposition 5.7).**
  - Allow complex edge couplings. Vertex rephasing removes every phase on a spanning tree; |E| − |V| + 1 = 1 loop
    phase φ remains.
  - det(λI − K_φ) = λ[λ⁴ − 5λ² + 4 − 2cos φ] and
    p₁₃(τ | 0) = (2 + 2cos φ)/(9 + 8cos φ) · [cos ν₊τ − cos ν₋τ]², with ν±² = (5 ± √(9 + 8cos φ))/2.
  - At φ = π the transfer amplitude from 0 to 13 is zero at every time. For short times p₁₃ = τ⁴cos²(φ/2) + O(τ⁶).
  - Basis preparations, waits, complete readouts and classical stopping give the same record laws for φ and −φ. The
    prepared state (|13⟩ + |3⟩)/√2 has dp₁₃/dτ(0) = sin φ.
- **Records (§7, §20–§21).**
  - For two equal-amplitude paths with pure records of overlap κ, the visibility is V = |κ| and the distinguishability
    is D = √(1 − |κ|²), so V² + D² = 1 (Theorem 7.4). Probabilities add for every phase exactly when the records are
    orthogonal (Theorem 7.3).
  - With a fresh, conditionally independent record each step, the coherence ρ_ab is multiplied by the record overlap
    each time (Theorem 20.2).
  - With no zero factor, |ρ_ab(n)| → 0 exactly when Σ_k −log|c_ab(k)| = ∞ (Theorem 21.1). With
    r₁(k) = e^(−2^(−k))|0⟩ + √(1 − e^(−2^(1−k)))|1⟩ every record differs, yet the product is e^(−(1 − 2^(−n))) → 1/e
    (Example 21.2).
- **Disk and square (§15–§16).**
  - Given full complex projections u, v ∈ ℂ³ of two hidden unit endpoints on three orthonormal readouts, the overlap
    κ can be exactly any point of the closed disk centred at u†v with radius √((1 − ‖u‖²)(1 − ‖v‖²))
    (Theorem 15.2).
  - On the square, a unit-diagonal completion exists exactly when |ab − conj(cd)| ≤ √((1 − |a|²)(1 − |b|²)) +
    √((1 − |c|²)(1 − |d|²)) (Theorem 16.2).
  - With four overlaps of modulus r and loop phase Φ, this reads r²|sin(Φ/2)| ≤ 1 − r²: r = 1 forces Φ = 0 and Φ = π
    gives r ≤ 1/√2, attained in ℂ² (Corollary 16.3).
- **Locked future (§17–§19, §25).**
  - On the project's five-dimensional instrument (B, K₀, K₁, erasure G), the channel T* is at diamond distance 2 from
    every embedded dephasing Ad_B D_ζ, yet G T* = G Ad_B and T*†(J_t) = B†J_tB for all t (Theorem 17.1).
  - If T†(J_t) = B†J_tB for t = 0, 1, 2, then G T = G Ad_B on every complex input and finite reference
    (Theorem 17.3).
  - With effect error δ, ‖G T − G Ad_B‖◇ ≤ min{2, 185√δ}. The nine matrix-unit bounds have row sums 66, 185, 146
    (Theorem 18.3, §25). Every later protocol changes any event probability by at most min{1, (185/2)√δ}
    (Corollary 18.4).
  - Future effect spaces stabilise within d² − r₀ steps (Theorem 19.2), and the predictive identity of an observer is
    defined as its class of realisable futures.
- **Sign fiber (§29–§31, §35–§38).**
  - Flipping the sign of one phase gives two channels T_t,± that agree on every real symmetric effect, so on every
    original effect J_s at every depth, with δ = t². Their successors satisfy ‖S± − S_B‖◇ = 2t and
    ‖S₊ − S₋‖◇ = 4t√(1 − t²) (Theorem 29.2).
  - The best common reconstruction has risk 2t√(1 − t²) = 2√(δ(1 − δ)); at t = 3/5 it is 24/25, while a new phase
    effect E_y reads 49/50 against 1/50 (Theorem 29.3, Proposition 31.2).
  - The full fiber reduces to a set K_d of 3 × 3 density matrices, and r_t = min_σ max_(ρ ∈ K_d) ‖ρ − σ‖₁
    (Theorems 35.2–35.6).
  - At d = 5/61 the pure successors have the unique centre σ̄ = (25/61)ww† + (36/61)gg† with radius 60/61
    (Theorem 37.2). A mixed compatible world lies farther from σ̄, so r_t > 60/61 (Theorems 37.3–37.4).
  - The fixed centres gg† and aa† have risks 2√min{5d, 1} and 2√(1 − d) (Theorem 38.1), and an explicit centre gives
    r_t ≤ 4/3 − 2/(1405√1405) (Theorem 38.2). The exact centre for each d is open (Definition 38.3).
- **Time words (II, §39–§40).**
  - Keeping the labels of A₀ = cos θ K₀ + i sin θ K₁ and A₁ = i sin θ K₀ + cos θ K₁ gives A_h B = 2^(−n/2) B V_h, with
    V₀ = U e^(iθW) and V₁ = V₀W. Each history of length n has probability 2^(−n) for every input, and its yes-event
    is Z_h = 2^(−n) V_h† E V_h (Theorem 39.3).
  - The identity and the eight words ∅, 0, 1, 00, 10, 000, 010, 100 span all nine real dimensions of Herm₃ exactly
    when sin 2θ ≠ 0: their coordinate determinant is 6561/2²¹ · sin⁷(2θ) (Theorem 40.1).
  - At θ ∈ (π/2)ℤ the span is span{I, E, C, aa†}, of dimension 4.
- **Reconstruction (II, §41–§42).**
  - For sin 2θ ≠ 0 the nine responses b_i = tr(ρF_i) determine ρ = Σ F_i (G⁻¹)_ij b_j, and with it the whole complex
    successor channel S_ρ, for every compatible channel (Theorem 41.1).
  - At θ ∈ (π/2)ℤ the labels add only ρ_aa = d + s; the one-step yes-probabilities are ((d + s)/2, (e_d − s)/2) with
    e_d = (6 − 5d)/16 (Theorem 42.1).
  - The sign-flipped worlds still agree on all data and are 4√(d(1 − d)) apart (Theorem 42.3). At fixed s = ε =
    d(1 − d)/100 an open five-dimensional family shares all the data (Theorem 42.4).

一部约七分钟的片子，AURIC 相容预测波系列第一部：先说明谱本身不是波、相容需要一个共同正核，一个四分之一相位参考的递归复合就能检验强正性；再由二维校准平面的正交可加与权重乘性推出 u² = −1，由保持全部交叉关系的接续得到酉相位波；随后在五模式原子上给出 λ(λ⁴ − 5λ² + 2) 的谱、暗模与准周期波形，唯一的环相位 φ = π 时 0 永远到不了 13；记录重叠决定可见度 V² + D² = 1，无限增长的记录仍可留下 1/e 的相干；三个读出给出端点重叠的精确圆盘，方环补全要求两圆盘相交；在项目实际的五维仪器上，当前最远的两个通道可以有相同的后继，三个效果锁定后继并有 185√δ 稳定界；符号翻转的两个世界给出 24/25 与 60/61 的风险读数，精确中心仍未确定；第二卷保留分支标签，八个时间词在 sin2θ ≠ 0 时张成全部九维并精确重建后继，例外角度只多给出一个人口数。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-081-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One general theorem is used.
  - `continuationSpace_closure` in `D5/S3/Quantum/Measurement/ContinuationEffectClosure.lean` has a frozen state file
    at the subject commit. It states that the continuation effect spaces of finitely many Kraus branches stabilise
    from step d² − r on at the least invariant space. Volume II cites it in the proof of Theorem 39.4. The lock scene
    badges only the sentence on this closure as Lean.
  - Neither volume has digestion records at the subject commit; they have not been ingested. Everything else shown is
    argued in the volumes, not kernel-checked.
- **Published results cited by the volumes.** None of them carries a statement shown on screen.
  - Hilbert spaces from strongly positive decoherence functionals: Dowker–Johnston–Sorkin, arXiv:1002.0589.
  - Composition and strong positivity: Dowker–Wilkes, arXiv:2011.06120.
  - Complex amplitudes from operational pairs: Goyal–Knuth–Skilling, arXiv:0907.0909.
  - Fringe visibility and which-way information in general: Englert, DOI:10.1103/PhysRevLett.77.2154. The film shows
    only the equal-amplitude pure-record identity proved in the volume.
  - Triple correlation and shifts: Keleti–Kolountzakis, arXiv:math/0603415.
  - Positive definite completions: Grone–Johnson–Sá–Wolkowicz, DOI:10.1016/0024-3795(84)90207-6 (background only).
- **Classical tools named in the volumes.** The finale badges them as classical.
  - Kraus and Stinespring forms, trace and diamond norms and contraction under channels (Watrous, *The Theory of
    Quantum Information*, chapters 2–3).
  - The spectral theorem, Cauchy–Schwarz, Schur complements, the Vandermonde determinant, the pigeonhole principle and
    compactness.
- **Project inputs, not recomputed here.** These come from other trureturing volumes and are badged as theory:
  - the five-mode flip dynamics and the dark line of the second-order relation completion and the measurement-relative
    boundary volumes;
  - the instrument, the far counterexample and the successor rigidity of the sharp-task volumes I and II;
  - the record correlation matrices, calibrated blocks and the e^(−1) survivor of the second-order, hidden-relation and
    phase-gain volumes.
- **Recomputed for this film.** An independent Python script (numpy, sympy, scipy, cvxpy with Clarabel and SCS)
  checks 104 statements. Channel questions are solved as semidefinite programs.
  - **Spectrum and kernel.**
    - The two return probabilities are 1 and cos²t on 61 times.
    - f = (1, 0) and g = ((1 + i)/2, (1 − i)/2); shifts keep the bispectrum and 40 random phase changes break it.
    - The −3/4 Gram matrix has eigenvalues (−1/2, 7/4, 7/4).
    - The phase counts at m = 3 are (1, 3, 3, 1), and every class has at least 2^(m−3) members for m = 3 … 20.
    - For 14 random negative kernels (k = 1 … 3) the witness of Theorem 27.2 was built on the actual tensor product.
      Every value lies below −α/(288k), at depths m = 7 … 10.
  - **Complex phases.**
    - sympy solves W((t + u)u) = t² + 1 to b = 0, a = ±1.
    - A Jordan block admits only singular invariant forms; the 3-cycle has spectrum 1, e^(±2πi/3).
  - **Five-mode wave.**
    - det(λI − K) = λ(λ⁴ − 5λ² + 2) exactly; ω₊ = 2.13578, ω₋ = 0.66215; w₊ = 0.62127, w₋ = 0.37873.
    - c₀(τ) and a₁₃(τ) match the matrix exponential at 801 times, and the cyclic space of |0⟩ has dimension 4.
    - The best near return for n ≤ 4000 is n = 3317, with p₀ = 0.999999.
  - **One loop phase.**
    - det(λI − K_φ) = λ[λ⁴ − 5λ² + 4 − 2cos φ] exactly.
    - The transfer amplitude formula holds for 7 phases at 401 times each; p₁₃ ≡ 0 at φ = π.
    - p₁₃/τ⁴ → cos²(φ/2); |U_φ|² = |U_−φ|² entrywise; the slope of (|13⟩ + |3⟩)/√2 is sin φ.
  - **Records.**
    - V = |κ|, D = √(1 − |κ|²) and V² + D² = 1 hold for 200 random pure record pairs.
    - The changing records are unit vectors, and their product after 40 steps is 0.367879 = 1/e to six places.
  - **Disk and square.**
    - 300 random endpoint pairs stay in the disk, and 100 explicit constructions reach chosen points of it.
    - On 159 random squares with equal moduli an SDP completion test agrees with the two-disk criterion.
    - The ℂ² example has loop product −1/4 at equality, and (1, 1, 1, −1) has no completion.
  - **Locked future.**
    - T* is CPTP, G T* = G Ad_B as channels, T*†(J_t) = B†J_tB for t = 0 … 12, and its output on ff† is orthogonal to
      bb†.
    - The matrices E and F of (17.2) and the targets of (17.3) are reproduced.
    - Over all CPTP T with effect error at most η, the largest spread of a random functional of G T is 0.331, 0.026
      and 0.0036 for η = 10⁻², 10⁻⁴ and 10⁻⁶. The spread of T itself stays 0.665.
    - The row sums of the bound matrix are 66, 185 and 146, and ‖M‖₂ = 152.2.
    - On 4000 sampled channels of the form B P₊XP₊B† + (f†Xf)ω the largest ratio of successor distance to √δ is
      4.78. The SDP diamond norm agrees with the closed form on three of them.
    - For effects {I, P} on ℂ⁵ the future closure has dimensions 2, 3, 4, 4, … and is stable at depth 2.
  - **Sign fiber.**
    - At t = 3/5 the twin worlds agree on 30 random real symmetric effects and on J₀ … J₁₂, with δ = 0.36.
    - The SDP diamond norms are 1.2 = 2t and 1.92 = 4t√(1 − t²); the midpoint reconstruction has risk 0.96 = 24/25.
    - E_y reads 0.98 and 0.02.
    - At d = 5/61 the pure states ψ± lie in K_d at distance 120/61, and σ̄ is their midpoint.
    - Pure successors sampled from (36.2) along a grid of 721 angles stay within 60/61 of σ̄. A search over mixed compatible states found one at
      distance at least 1.00298 from σ̄, which is 0.019 beyond 60/61.
    - SDPs give max Tr((I − gg†)ρ) = min{5d, 1} and min ρ_aa = d over K_d for six values of d.
    - min h_d/M_d = 0.1260 ≥ 4/√1405 = 0.1067. For four values of d, 40 extreme points each stay within U_H(d) of σ_H.
  - **Time words.**
    - A_h B = 2^(−n/2) B V_h and the yes and no effects hold for 40 random words, and every history of length 3 has
      probability 1/8.
    - The determinant equals 6561/2²¹ · sin⁷(2θ) at 181 angles, and 6561/2³⁶ · sin⁷(2θ) for the joint effects.
    - The span has dimension 4 at 0, ±π/2 and π, and 9 at four generic angles.
  - **Reconstruction.**
    - Gram inversion recovers 8 random compatible successor states to 10⁻⁷.
    - At θ = 0, π/2 and π every word up to length 4 reads e_d, d + s or e_d − s.
    - The twin successors are 4√(d(1 − d)) apart for d = 0.1, 0.5 and 0.8.
    - ρ_ε and random five-parameter moves around it stay compatible for 50 values of d.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The two return curves and the f and g bars.
  - The −3/4 eigenvalue bars, the phase-share bars and the witness depth range.
  - The spectral weight bars, the p₀ and p₁₃ curves and the near-return reading.
  - The p₁₃ curves for φ = 0, π/2, 5π/6 and π.
  - The V–D quarter circle and the two coherence series.
  - The disk sample points and the square points with the boundary curve.
  - The spread bars, the closure dimensions, the distance/δ scatter and its largest ratio.
  - The two-world risk curve, the radius bounds and the excess reading.
  - The sin⁷(2θ) curve, the Gram heat map and the b values.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the five-mode graph with its paths and loop arrow;
  - the complex plane with 1, u and u²;
  - the orthogonal and collapsed vectors and the eigenphase circle;
  - the two-path record diagram and its fringe strips;
  - the three readout axes and endpoint arrows;
  - the two intersecting disks;
  - the instrument flow diagram;
  - the ± phase dials;
  - the word tree;
  - the matrix template and the five sliders.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
