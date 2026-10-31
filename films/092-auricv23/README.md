# 092 · AURIC V23–V24 · MONOTILES, TRIANGLE CENTRES AND THE SQUARE LAW · AURIC V23–V24 · 单原型瓦片、三角心与平方律

This film continues the versioned AURIC volumes and runs about 7¼ minutes. It covers two volumes of trureturing at
subject commit `1bccf3c8c5`:
- `AURIC_APERIODIC_MONOTILES_UNITARY_PROJECTIONS_TRIANGLE_CENTRES_AND_RECURSIVE_VARIATION_V23.md`, §1–§10;
- `AURIC_TWO_BASIS_STATES_THREE_CHANNELS_PHASE_CHIRALITY_AND_RECURSIVE_SQUARE_LAW_V24.md`, §1–§8, §10–§11 and §14.

Version twenty-three takes the published four-dimensional reprojection of the hat tile, completes it to a unitary,
measures the hat's corners, triangles and centres, and relaxes golden gate relations on a triangle complex. Version
twenty-four asks when two numbers and normalisation determine a third: on the five AURIC modes, on the Bloch sphere,
through anticommuting operators, through a three-output Fourier reader, and through consistency conditions that pick
squared amplitudes. Complex Hilbert spaces, the stated encodings and readout interfaces, and the Born rule where a
statement says so, are inputs throughout.

## The film, scene by scene

- **Hat reprojection (V23 §1–§2).**
  - Hat control points are x + Dx* with D = (1/16)(−11, 3√15; 3√15, 11), a reflection: Dᵀ = D, D² = I,
    det D = −1 (published input, equation (1)).
  - U_D = (1/√2)(I, D; I, −D) = (H₂ ⊗ I₂) diag(I₂, D) is orthogonal, sends (x, x*) to (x + Dx*, x − Dx*)/√2, has
    spectrum {1, −1, e^(±iπ/4)} and order exactly eight (Theorem 2.2). Since det_R U_D = −1 and DJ = −JD, it is not a
    complex-linear gate on the native ℂ² (Remark 2.3).
  - With z = x + ix*, the gate M_D = (I − iD)/√2 = e^(−iπD/4) ∈ SU(2) gives Re(M_D z) = (x + Dx*)/√2, and
    M_D⁴ = −I (Theorem 2.4).
  - A finite patch has the normalised encoding Ψ_R(q) = (q/R, √(1 − |q|²/R²)), transported by U_D ⊕ 1
    (Theorem 2.6), and a reference mode recovers the coordinates from expectations (Proposition 2.7). Encoded states
    that are not orthogonal cannot be split into accept and reject by one effect; for R > √2 M all patch overlaps are
    positive (Proposition 2.8).
- **Thirteen corners (V23 §3, §4.3, §9).**
  - The hat (Smith–Myers–Kaplan–Goodman-Strauss) has thirteen corners on the triangular lattice, perimeter 8 + 6√3
    and area 8√3; eleven triangles tile it with doubled lattice areas 2, 4, 2, 3, 3, 1, 3, 6, 2, 4, 2, summing to 32
    (Proposition 3.2). The area centroid is (3/2, 0)_h and the corner mean (20/13, 0)_h (Proposition 4.3).
  - Dirichlet energy on a triangle is ¼ Σ cot θᵢ |z_j − z_k|² (Theorem 9.1). For a convex quadrilateral,
    E_BD − E_AC = t² q Q / (4 s J L), where Q/q is the power of D with respect to circle ABC, so the locally Delaunay
    diagonal never has more energy (Theorem 9.2).
- **Triangle centres (V23 §4–§5).**
  - The centroid minimises squared distances, the incentre maximises the smallest side distance, and circumcentre
    and orthocentre make two residual sums vanish (Theorem 4.2).
  - In hat triangle 0, 4, 6: O = (1, 4)_h = 5A − 7B + 3C, H = (5, −10)_h = −9A + 15B − 5C, G = (7/3, −2/3)_h; O and
    H lie outside the hat, and the thirteen corners are not concyclic (squared distances 21 and 39 from O)
    (Proposition 4.4).
  - Orthogonal projection need not commute with circumcentre, incentre or orthocentre: for (0,0), (2,0), (1,1) the
    projected circumcentre is (1, 0) while the projected triangle's circumcentre is (1, −3/4) (Theorem 4.5).
  - A diagonal three-mode readout reaches exactly conv{A, B, C}, so centroid and incentre are realisable and O, H are
    not (Theorem 5.2).
- **Two turns (V23 §5, §5.1, §10).**
  - The native golden gate K = ω[I + (ω − 1)P], ω = e^(3πi/5), has K¹⁰ = I and K⁵ = 2P − I; every Kⁿ has at most two
    distinct eigenvalues, so U_D ⊕ 1 (four) is no power of K up to phase and conjugation (Proposition 5.4).
  - With D₁ = R₆₀ D R₆₀ᵀ: tr(D₀D₁) = −1 and tr(M₀M₁) = 3/2. Since 3/2 is not an algebraic integer, M₀M₁ has infinite
    order, and if both turns can be called their positive words are dense in SU(2) (Theorem 5.5).
  - A lifted orbit over base period p whose loop increment has order q returns after p·q steps (Theorem 10.4; this
    period statement is the frozen Lean theorem named below). With fibre increment K^q the return period is
    p · 10/gcd(10, q).
- **Golden relaxation (V23 §6–§8).**
  - On a triangle complex with five modes per vertex and a unitary per edge, the mismatch energy is gauge invariant
    and its zero set is the common fixed space of the loop matrices (Theorem 6.2); a flat diagonal exists exactly when
    the boundary holonomy is I (Proposition 6.3).
  - Eliminating the hidden interior gives one Schur complement S = L_BB − L_BI L_II⁻¹ L_IB ≥ 0, the same in any order
    (Theorem 7.2); subdivided edges add weights harmonically and parallel paths contract with
    I − M†M = (1/2W²) Σ w_j w_k (V_j − V_k)†(V_j − V_k) (Proposition 7.4, Theorem 7.5).
  - Paths I and K⁵ average to P: |b − a|² + |b − K⁵a|² = 2|b − Pa|² + 2|(I − P)a|², minimum 2/φ at a = |2⟩
    (Theorem 8.1). The unit-weight triangle with transports I, I, K has least normalised energy 2 − φ = φ⁻², on the
    three-dimensional space ψ_j = e^(−ijπ/5) u/√3, u ∈ ker P (Theorem 8.2). With only the channel ω⁻¹K the least
    energy would be 0 (Remark 8.3).
- **Two make three? (V24 §1–§3).**
  - On the five modes, X + Y + Z = 1 − p₀ + p₁₃ and the third mean ranges over 0 ≤ Z ≤ 1 − max(X, Y); the laws
    (½, ¼, 0, ¼, 0) and (0, ¼, ½, ¼, 0) share X = Y = ¼ (Theorem 2.2). A third linear readout is fixed by two others
    on all states only inside span{I, A₁, A₂} (Theorem 2.3).
  - Two amplitudes give r = (2 Re α*β, 2 Im α*β, |α|² − |β|²) on the Bloch sphere, S³/U(1) ≅ S² (Theorem 3.1); two
    fixed coordinates leave r₃ = ±√(1 − r₁² − r₂²) (Theorem 3.2), and the hemisphere inverse is not Lipschitz at the
    rim (Proposition 3.3). For a reduced qubit 1 − |r|² = 4(ab − |c|²) (Proposition 3.4).
- **The third operator (V24 §4).**
  - For anticommuting reflections A, B, the operator C = −iAB closes AB = iC, BC = iA, CA = iB (Theorem 4.1); the
    Gram matrix of the centred readouts has det G = 1 − x² − y² − z², and P_a B P_a = 0, so measuring A then B
    never reads z (Theorem 4.2).
  - Three real anticommuting reflections give J = A₁A₂A₃ with J² = −I, Jᵀ = −J, a compatible complex structure on
    real dimension 4m (Theorem 4.3). ℂ⁵ is odd, so a qubit placed on a two-dimensional block obeys |r|² ≤ w²
    (Proposition 4.4).
- **Trine triangle (V24 §5).**
  - a_j = (α + ω⁻ʲβ)/√3 is an isometry into three outputs with a₀ + ω²a₁ + ωa₂ = 0 and effects (I + n_j·σ)/3
    (Theorem 5.2); q_j = (1 + n_j·r)/3 and the allowed set is Σ q_j² ≤ ½ (Theorem 5.3).
  - The phased outputs close a triangle with squared sides q_j, 16Δ² = 1 − 2Σ q_j², and r₃ = −4√3 × signed area
    (Theorem 5.4); ψ = (1, 0) and (0, 1) give the same q and areas ∓1/(4√3). Every three-outcome qubit POVM has two
    orthogonal pure states with equal statistics (Proposition 5.5).
- **Square law (V24 §6–§7).**
  - If f(s) + f(t) + f(u) = 1 for every three-way split, then f(s) = s and p = |a|² (Theorem 6.2); two-way
    normalisation alone allows f(s) = s²/(s² + (1 − s)²) with f(3/4) = 9/10 (Proposition 6.3). The golden block has
    Bloch vector n = (2x√x, 0, x − x²), x = 1/φ (Proposition 6.1); trine frame functions give F = (1 + r·n)/3
    (Theorem 6.4, Caves–Fuchs–Manne–Renes).
  - For U = ζ[(I − Q) + ζQ], every quadratic readout satisfies a₃ + x²a₁ = a₀ + x²a₂, since
    R(s) = s³ − x²s² + x²s − 1 = (s − 1)(s − ζ)(s − ζ*) (Lemma 7.2). Held in every context of the project's
    ten-site, seven-gate, thirteen-dimensional source it forces P_w(ψ) = ⟨ψ, E_w ψ⟩ (Theorem 7.3, project §86.1).
    The quartic rule P_u = q_u + λ q_u q_v breaks it by −λ(1 + 2x)x⁸ in the context p = 31, f = 1, with
    d_t = (x⁴, x², 1, x²) (Proposition 7.4).
- **Scale and stability (V24 §8, §10–§14).**
  - Normalised merging u * v = (u + v)/|u + v| is not associative (first coordinates −0.383 and +0.383 for e₁, e₂,
    −e₁) (Proposition 8.2). After eliminating the interior, the boundary normalisation is ⟨g, G(λ)g⟩ = 1 with
    G = I + L_BI R_λ² L_IB = I − K′_eff(λ) > 0 (Theorem 8.3).
  - With λ_l = 3 + 6P_l(−½) (9, 0, 9/4, 45/8, …, at least 15/64 for l ≠ 1), a response with trine residual ε lies within
    C₀ ε^(2/3) of the Bloch family, C₀ ≈ 2.58 (Theorem 10.2), and the exponent 2/3 is optimal in the stated L² class
    (Theorem 10.3). On screen only: the same seven-address 13-dimensional carrier compiles the trine target (§11), and
    an exact relation for every rotation forces pointwise equality (Theorem 14.1).

一部约七分钟的片子，延续 AURIC 版本系列，覆盖第二十三、二十四两版：帽子瓦片的四维重投影 x + Dx* 可完成为八阶正交矩阵，并给出单量子比特门 (I − iD)/√2；十三个角点、周长 8 + 6√3、面积 8√3、十一个三角形的两倍格面积之和为 32；各种心解不同的变分问题，三角形 0、4、6 的外心 5A − 7B + 3C 与垂心落在帽子之外，对角读出只能实现凸包内的重心与内心；帽子门与其 60° 朝向的乘积迹为 3/2，因而在 SU(2) 中稠密；三角复形上的 Schur 消元把递归、变分与最优化统一起来，黄金三角的最小能量为 1/φ²。第二十四版说明五模式三均值满足 X + Y + Z = 1 − p₀ + p₁₃，两个复振幅经 Hopf 映射给出 Bloch 坐标但留下符号；反对易算符闭合出第三个读口与复结构；三元 Fourier 读口的振幅三角形以有向面积携带法向 r₃ = −4√3 × 面积；三分细分相容性选出平方律，黄金门的四时律在全上下文中迫使二次规则；归一化递归需要有效度量，trine 残差以指数 2/3 控制到 Bloch 族的距离。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-092-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** One is used, in the two-turns scene and the finale.
  - `D5.S1.Dynamics.PeriodicOrbits.SkewAdditiveReturn.skew_minimalPeriod` (state file
    `Golden/Frozen/state/D5/S1/Dynamics/PeriodicOrbits/SkewAdditiveReturn.lean.json` exists at the subject commit)
    states that the minimal period of the lifted point is p · ord(h), with order zero meaning no return. This is the
    period part of V23 Theorem 10.4, which the volume cites as reference [17]. The coordinate bijection of that
    theorem (`SkewOrbitCoordinates`) has no frozen state at this commit and is not shown.
  - Digestion: V23 has 71 atoms and V24 has 55 atoms, all residual-open; the ledger does not link the frozen theorem
    above to a V23 atom.
- **Published results, used as external inputs.** The reprojection, hat, trine and finale scenes badge them as
  published.
  - Hat and Spectre: Smith–Myers–Kaplan–Goodman-Strauss, *An aperiodic monotile*, Combinatorial Theory 4(1) #6 (2024),
    arXiv:2303.10798; *A chiral aperiodic monotile*, Combinatorial Theory 4(2) #13 (2024), arXiv:2305.17743. Corner
    labels from the authors' `hatviz` geometry at commit 4bb9d01999.
  - The reprojection matrix D: Baake–Gähler–Mazáč–Mitchell, J. Math. Phys. 66, 092707 (2025), doi:10.1063/5.0264955,
    arXiv:2502.03268; Baake–Gähler–Klick–Mañibo–Mazáč, Acta Cryst. A82, 294–304 (2026), Theorem 3.1,
    doi:10.1107/S2053273326003918.
  - Trine frame functions (V24 Theorem 6.4): Caves–Fuchs–Manne–Renes, arXiv:quant-ph/0306179.
  - Behind the project's Theorem 7.3 (not recomputed here): Freedman–Larsen–Wang density, arXiv:math/0103200, and
    the representation theory of Galley–Masanes (arXiv:1610.04859) and Masanes–Galley–Müller (arXiv:1811.11060).
- **Classical tools named in the volumes.** Bloch sphere and Hopf map (badged classical in the Two-make-three scene),
  Pauli and Clifford algebra, the cotangent Dirichlet energy (Pinkall–Polthier 1993; badged classical in the corners
  scene), Delaunay minimal roughness (Rippa 1990, doi:10.1016/0167-8396(90)90011-F), vector-bundle Laplacians
  (Kenyon, arXiv:1001.4028), Schur complements, Legendre polynomials and spherical harmonics (DLMF 14.30, 18.10).
- **Project inputs.** The five AURIC modes and their occupation means (pyramid foundational volume), the native
  golden gate K (V20), the ten-site native source, its four-time characterization §86.1 and quartic witness §87.1
  (quantum reconstruction continuation II), and the seven-address 13-dimensional carrier with SU(13) density (V37).
  The film cites them by their V23 and V24 numbers.
- **Theory volumes, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (143 checks) recomputes the following with sympy exact
  arithmetic, numpy sampling and quadrature.
  - **Reprojection.** D² = I and det D = −1 exactly; U_D orthogonal and equal to (H₂ ⊗ I₂) diag(I₂, D) exactly;
    spectrum {1, −1, e^(±iπ/4)}, order exactly 8, det_R U_D = −1, DJ = −JD; the norm identity and
    Re(M_D(x + ix*)) = (x + Dx*)/√2 on 50 samples each; M_D = e^(−iπD/4), M_D⁴ = −I; W_D ∈ SO(4); the lattice kernel of
    Proposition 2.5 has generators (1, −3, 0, 1), (0, −1, 1, −2); the five-mode encoding and reference readout on a
    40-point patch; patch overlaps have minimum 0.544 above the bound 0.219.
  - **Corners.** Perimeter 8 + 6√3 and area 8√3 exactly; shoelace terms 0, 2, 4, 2, 0, 6, 4, 0, 6, 6, 0, 2, 0; the
    thirteen interior angles; the eleven doubled areas; the triangles cover the hat exactly once at 40 000 sample
    points; centroid (3/2, 0)_h and corner mean (20/13, 0)_h exactly; the cotangent formula on 50 triangles; the flip
    formula on 200 convex quadrilaterals, with the sign change exactly at the circle (s = 0.309 for B = (0.4, 0.8)).
  - **Centres.** O = (1, 4)_h with squared radius 21 and p₁ at 39; the barycentric forms of O and H; G; sides 3, √21,
    √3; numerical minimisation of all four variational problems; O and H outside the hat; the projection
    counterexample (1, 0) vs (1, −3/4), orthocentres (1, 1) vs (1, 2), incentre heights; pyramid centroid
    (3/8, 3/8, 1/4).
  - **Two turns.** Kⁿ = ωⁿ(I − P) + ω²ⁿP for n ≤ 20, K¹⁰ = I, K⁵ = 2P − I; at most two distinct eigenvalues for Kⁿ
    and four for U_D ⊕ 1; tr(D₀D₁) = −1, tr(M₀M₁) = 3/2 with minimal polynomial 2z − 3, eigen-angle
    arccos(3/4) = 41.41°, no power of M₀M₁ up to 399 equals I; positive words of length ≤ 16 come within 0.223 rad
    (mean 0.117) of 300 random SU(2) targets; lifted periods p · ord(h) on 30 random cyclic skew products and
    p · 10/gcd(10, q) for K^q fibres.
  - **Golden relaxation.** Gauge invariance on random connections; kernel dimensions 0, 1, 2 equal to the common
    fixed spaces; three Schur elimination orders agree to 10⁻⁹; star-centre, series and parallel identities on 20
    random cases each; |Pa|² = φ⁻² and minimum 2/φ = 1.236; the 15 × 15 triangle Laplacian has least eigenvalue
    0.381966 = 2 − φ with multiplicity 3 and the full spectrum 2 − 2cos((θ + 2πm)/3); with ω⁻¹K the least
    eigenvalue is 0.
  - **Two make three, third operator.** X + Y + Z = 1 − p₀ + p₁₃ on 300 laws; the two example laws; rank of
    I, X, Y, Z is 4; Hopf coordinates on 200 states; |r|² = 2 Tr ρ² − 1 on 100 mixed states; the rim ratio is 1414 at
    ε = 10⁻⁶; 1 − |r|² = 4(ab − |c|²) on 100 cases; Pauli relations; det G = 1 − x² − y² − z² and variance sum ≥ 2 on
    200 states; the sequential A-then-B mean is 0 for 12 states; J² = −I for the realified Paulis; |r|² ≤ w² for 400
    five-mode states.
  - **Trine.** Isometry and effects with eigenvalues 0, 2/3; closure, q_j formula, Σ q² ≤ ½, the Heron identity and
    r₃ = −4√3 × area on 300 states; areas ∓1/(4√3) for (1, 0) and (0, 1); a blind orthogonal pair for 30 random
    three-outcome POVMs.
  - **Square law.** Golden block n = (0.9717, 0, 0.2361) with |n| = 1; f(3/4) = 9/10 and f(½) + 2f(¼) = 0.70; the
    cubic rule passes two-outcome normalisation; the in-plane rule 1/3 + ε cos 2θ passes planar trines and fails tilted
    ones; the four-time identity on 30 random two-spectrum gates; the native carrier built explicitly: dimension 13,
    seven gates unitary with tenth power I, rank Π = 5, K₃v weights x and x², d_t = (x⁴, x², 1, x²), Born defect 0,
    quartic defect −λ(1 + 2x)x⁸ = −0.0238 at λ = ½ and forbidden frequency λx⁹ζ⁶.
  - **Scale and stability.** Sphere and ray centres on 20 cases each; the non-associative merge; F_eff(0) = 1.172 vs 2;
    the Schur metric on 10 random pencils; λ₀…λ₃ = 9, 0, 9/4, 45/8 and λ_l ≥ 15/64 for 2 ≤ l ≤ 200; a Monte Carlo
    check λ₂ ≈ 2.252; C₀ = 2.580; for the sharpness family F_t = max(0, 1/3 + (1/3 + t)z): |e_t|² = t³/(6a),
    ε_t ≤ (3/√2)t^(3/2), t/(2√3) ≤ dist ≤ C₀ ε^(2/3), log–log slope 0.666; §11 label counts 1021 = 10 + 1011 and
    V₃*Q_jV₃ = E_j in the 13-dimensional carrier; the η = 0.1 net bound 190³; the two-layer trine expansion of §14.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The 4 × 4 matrix U_D and its spectrum; the 780 sorted patch overlaps.
  - The exact hat with its eleven triangles and the doubled-area bars; the flip-energy curve.
  - The hat, triangle 0, 4, 6 and its four centres at exact coordinates; the barycentric weight table.
  - The spectra of K and U_D ⊕ 1; the angles nθ of (M₀M₁)ⁿ; the word-covering curves.
  - The Schur eigenvalues for two elimination orders; the 15 eigenvalues of the golden triangle Laplacian.
  - The two example laws; the curve r₃ = √(1 − r₁²); the sequential-readout bars; the cone scatter of 400 states.
  - The animated amplitude triangle and its q bars (computed in the page from the trine formula); the ±1/(4√3)
    triangle pair; the scatter of r₃ against −4√3 × area.
  - f(s) = s against s²/(s² + (1 − s)²); the native readouts a_t for Born and the quartic rule.
  - The non-associative merge vectors; F_eff(t); the λ_l bars; the log–log sharpness points with C₀ε^(2/3).
- **Illustrative visuals.** These are illustrations, not data:
  - the D cells and the reflection lines at 60°;
  - the triangle-complex mesh with five-mode fibres;
  - the golden triangle with its I, I, K edges;
  - the pyramid and the Bloch sphere with two states;
  - the Pauli and 4 × 4 sign grids;
  - the Fourier map diagram;
  - the three-way split bars;
  - the skew-product ring of dots.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
