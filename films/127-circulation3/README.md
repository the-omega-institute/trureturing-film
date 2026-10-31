# 127 · AURIC CIRCULATION CONTROL III · THE MISSING COORDINATE, ONE SHARED EDGE AND THE FINAL MODULE · AURIC 环流控制 第三部 · 缺失坐标、一条共享边与末端模

This is part three of three in the AURIC CIRCULATION CONTROL series and runs about 7¼ minutes. It covers
`AURIC_FIB_ATOM_CIRCULATION_CONTROL_KL_ACTION_AND_TORIC_RELATIONS_CONTINUATION_2.md` at subject commit `85be02fafc`;
the scenes run through every section of the volume, §40 to §47. Parts one and two (films 125 and 126) cover the main
volume and the CONTINUATION volume. A separator of three sites in a row needs one joint coordinate beyond its site means,
κ = μ₁₃. The film then glues labelled odd cycles along one retained edge ab. It shows how one common row comes off every
branch, counts every canonical generator and the final free module, and extends the count to mixed and unequal cycle
lengths, with a short-branch subtraction and a growth rate.

## The film, scene by scene

- **The missing coordinate (§40, Definition 40.1, Theorem 40.2).**
  - For H = P₃ with patterns ∅, {1}, {2}, {3}, {1,3}, the data (m, X, Z, Y) fix exactly the histograms
    h = (m − X − Y − Z + K, X − K, Z, Y − K, K) with integer K in max(0, X + Y + Z − m) ≤ K ≤ min(X, Y).
  - Example: m = 2, (X, Z, Y) = (1, 0, 1). K = 0 gives the rows {1}, {3} and K = 1 gives ∅, {1,3}: the same means and
    different histograms.
  - For a separator with q vertices and D_H legal patterns, normalisation and the q means have rank q + 1. Exactly
    D_H − q − 1 further linear statistics are necessary and sufficient to recover every real law. The joint moments
    μ_T, |T| ≥ 2, suffice, by Möbius inversion (40.5). For P₃ the only extra coordinate is μ₁₃ = κ. On screen:
    K₃ 0, P₃ 1, P₄ 3, C₅ 5.
- **Least disagreement (§40, (40.4)–(40.7); Proposition 40.3; obstruction from Theorem 39.2).**
  - Over couplings of two fixed full branch laws, the least probability that the separator patterns disagree is
    TV(p, q′) = ½ Σ |p_J − q′_J|, attained by the finite maximal coupling with a conditional extension.
  - With equal site means on P₃, p − q′ = (κ_P − κ_Q)(1, −1, 0, −1, 1), so TV = 2|κ_P − κ_Q|. For two arrays with the
    same positive degree and totals, the least number of mismatched rows is 2|K_P − K_Q|.
  - A positive mismatch is a relaxation, not a gluing. Equal one-point totals are not enough: at m = 2 with all totals
    one, a path a–x–b puts a and b in the same row (h_ab = 1) and a path a–y–z–b in opposite rows (h_ab = 0). The
    attainable sets {1} and {0} do not meet.
- **One retained edge (§41, Definition 41.1, Theorem 41.2).**
  - G^e_(k,b) has b labelled cycles C_(2k+1) sharing the vertices a, b₀ and the retained edge; |V| = 2 + b(2k − 1).
  - The edge allows only three states, with forced counts m − t − u (empty), t (a alone) and u (b alone). Local arrays
    sort into these blocks and their rowwise union is a global array, so every point of (41.1) is realised by m global
    independent sets.
  - Single-cycle step: if every coordinate is positive, some edge has slack, since saturating all would give
    2Σc = (2k + 1)m > 2km. The independent set {i + 2, …, i + 2k} is removed. On screen: (3; 1, 2, 1, 1, 2, 1, 1) loses
    {4, 6, 1} and becomes (2; 1, 1, 1, 1, 1, 1, 0).
  - The ring is a normal, standard graded Cohen–Macaulay domain of dimension 3 + b(2k − 1), and its canonical module is
    the strict interior (41.3).
- **Synchronized descent (§42, Definition 42.1, Theorem 42.2).**
  - An interior exponent is basic if no nonzero semigroup point can be subtracted while staying interior. On one cycle
    the basic exponents are ν_j = (2j + 1; j·1), 1 ≤ j ≤ k − 1.
  - A global interior exponent is basic exactly when at least one branch restriction equals some ν_j.
  - Otherwise every branch has the same number h = m − t − u − 1 of empty-edge rows in its residual realisation. Rule
    (42.4) removes an empty row if h > 0, else a row with a alone if t ≥ u, else b alone. On screen:
    (6; t = 3, u = 2, all private coordinates 1) has h = 0. Removing the row {a} gives (5; 2, 2, 1, …, 1), still
    interior.
- **Canonical type (§42, Theorem 42.3, Proposition 42.4).**
  - Degree 2j + 1 carries μ = A^b − (A − 1)^b minimal generators with A_(k,j) = (T_(2j−2)^(2k))_(j−1,j−1), and no other
    degree occurs.
  - The row vectors e₁T₂^p are (0,1,0), (1,1,0), (2,2,1), (5,4,2), (11,9,5), (25,20,11), (56,45,25), (126,101,56). The
    edge case uses power six (middle entry 45) and the common-vertex case power seven (101).
  - For seven-cycles, type R^e_(3,b) = 1 + 45^b − 44^b: 2, 90, 5942 for b = 1, 2, 3. Glued at one common vertex the
    types are 2, 202, 30302. The graphs differ (5b + 2 against 6b + 1 vertices), so the comparison proves no general
    trend.
- **Endpoint quotient (§43, Definition 43.1, Theorem 43.2, Proposition 43.3).**
  - I_k = B_k + E_k with B_k(m, t, u) = L_k(m − 3, t − 1, u − 1), and
    E_k = Σ over 2 ≤ j ≤ k − 1 of C(t − j + k − 1, k − 1) C(u − j + k − 1, k − 1) when m ≥ t + u + 1.
  - For two seven-cycles in degree five the nonzero sectors are (1,1) 70, (1,2) 56, (1,3) 31, (2,1) 56, (2,2) 44 + 1 and
    (3,1) 31.
  - Squares are taken sector by sector: Σ I² = 15119, Σ B² = 15030, and the whole degree-five quotient has dimension
    89. In degree six the quotient has dimension (2·189 + 1) + 2(2·138·3 + 9) = 2053. These are multiples, not new
    generators.
- **The last free module (§44, Definition 44.1, Theorem 44.2, Propositions 44.3–44.4).**
  - One variable per independent set. A path on n vertices has F(n + 2) independent sets, so
    D^e_(k,b) = F(2k + 1)^b + 2F(2k)^b. For two seven-cycles, 13² + 2·8² = 169 + 64 + 64 = 297.
  - Auslander–Buchsbaum gives pd = 297 − 13 = 284. The canonical module fixes the last module:
    F₂₈₄ = S(−294) ⊕ S(−292)⁸⁹. Σ has ordinary coordinate 297, shared coordinates 64, 64 and private coordinates
    (89, 79, 84, 79, 89).
  - The common-vertex comparator has 505 = 21² + 8² modes, pd 491 and F₄₉₁ = S(−502) ⊕ S(−500)²⁰¹. Types 202 and 90
    count final summands; they are not dimensions of a physical state space, zero-mode counts or indices.
- **Five and seven (§45, Definition 45.1, Theorem 45.2; §46, Theorem 46.1, Proposition 46.2).**
  - For r five-cycles and s seven-cycles on one edge, residual degrees m − 2j_C − 1 may differ. The empty-edge count
    O_C = m − t − u − 1 is the same on every branch. When it is zero, t + u = m − 1 > 2J with J = max j_C, so t > J or
    u > J, and one common A-row or B-row comes off.
  - The basic set is (3; 1) in degree three, plus the degree-five tuples at (5, 2, 2) with some seven-cycle all twos:
    type = 1 + 8^r(45^s − 44^s). A five-cycle has 4 + 3 + 1 = 8 private triples there; (2, 2, 2) is cut by the total
    10 > 9.
  - D = 5^r 13^s + 2·3^r 8^s and d = 3 + 3r + 5s. For r = s = 1: D = 113, d = 11, type 9, pd 102 and
    F₁₀₂ = P(−110) ⊕ P(−108)⁸.
- **Short-branch subtraction (§47, Definition 47.1, Theorems 47.2–47.3, Propositions 47.6–47.7).**
  - For any finite mixture, layer j (degree 2j + 1) has
    M_j = Π A_(k_i,j) − Π (A_(k_i,j) − ε_(k_i,j)) basic exponents, where
    A_(k,j) = uᵀ H_j^(2k−2) u − Σ over q = 0…j − k of C(q + k − 1, k − 1)². The subtraction is needed exactly when
    j ≥ k: then the all-j vector breaks the total cap.
  - For a five-cycle A_(2,j) = j³.
  - C₇ + C₉: A₃,₂ = 45, A₄,₂ = 227, A₃,₃ = 391 − 1 = 390; (M₁, M₂, M₃) = (1, 271, 390), type 662, D = 778, d = 15,
    c = 763 and F₇₆₃ = P(−775) ⊕ P(−773)²⁷¹ ⊕ P(−771)³⁹⁰.
- **Spectrum and growth (§47, Corollary 47.4).**
  - H_j has eigenvalues λ_ℓ = (−1)^(ℓ+1)/(2 sin(θ_ℓ/2)), θ_ℓ = (2ℓ − 1)π/(2N + 1), N = 2j − 1, with positive weights
    w_ℓ summing to j.
  - The denominator is Q_N(w) = det(I − wH_j²) = Σ (−1)^r C(N + r, 2r) w^r. No pole cancels, so the least recurrence
    for the tail k > j has order 2j − 1.
  - A_(k+1,j)/A_(k,j) → ρ₁ = 1/(4 sin²(π/(8j − 2))): 5.0489 for j = 2 and 12.3435 for j = 3. With other branches
    fixed, M_j(k) = (C_j − E_j)A_(k,j) + E_j: constant in k if no other branch is eligible, ratio limit ρ₁ otherwise.

Not covered on screen: the boundary-diagonal presentation (41.5) and the real-cone and convex-hull argument of Theorem
41.2; the local minimality proof of the ν_j in §42 beyond its statement; the slack coordinates (43.6)–(43.8), which are
only named in a screen label; the path recurrence (43.10)–(43.11); the full exponent-grading form of the terminal
modules (44.4) and (47.23) and the Σ formula (44.7); the row-correlation example and attribution paragraphs of
Proposition 44.4; the graded-Nakayama minimality step of Theorem 45.2; and, in §47, the rational length series (47.15),
the positivity M_j > 0 with M₁ = 1 and the error bound (47.19), which is shown only as a screen label.

一部约七分钟的片子，AURIC 环流控制系列的第三部（共三部）：一排三个位点的分隔子，在行数与三个位点总数之外还缺一个联合坐标 K（即 κ = μ₁₃），一般分隔子恰好还需要 D − q − 1 个线性统计量，由 Möbius 反演给出；两支分布不一致的最小概率是全变差距离，均值相同时等于 2|Δκ|，而正的不一致只是松弛而非粘合，长度二与长度三的路径给出互不相交的 {1} 与 {0}；沿一条保留边粘合奇圈时，边只有三种状态，局部阵列逐行对齐，环是正规 Cohen–Macaulay 整环，典范模是严格内部；一个内部指数是基本的当且仅当某个分支等于 ν_j，否则按空边行数 m − t − u − 1 的规则从所有分支同时取下一行；七圈的型数为 1 + 45ᵇ − 44ᵇ（2、90、5942），在一个顶点粘合则为 2、202、30302；按两个端点细分后，两七圈次数五的商为 15119 − 15030 = 89，次数六为 2053；297 个模式给出长度 284 与末端模 S(−294) ⊕ S(−292)⁸⁹；五圈与七圈混合时型数为 1 + 8ʳ(45ˢ − 44ˢ)，C₅ + C₇ 的末端模为 P(−110) ⊕ P(−108)⁸；任意混合中短分支需减去一组二项式平方，五圈计数为 j³，C₇ + C₉ 得 45、227、390 与型数 662；最后，计数随分支长度按余弦矩阵的谱增长，比值趋于 ρ₁ = 1/(4 sin²(π/(8j − 2)))。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-127-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean and digestion status.**
  - At the subject commit the volume has a digestion directory with 28 atoms, one for each labelled item from
    Convention 40.0 to Proposition 47.7. All 28 are residual-open, and none has a coverage GID.
  - One frozen general theorem is used: `D5.S1.Words.AdmissibleWords.AdmissibleCount.admissibleWord_card_eq_fib`. It
    says that binary words of length m with no two consecutive ones number F(m + 2), which is the count of independent
    sets of a path on m vertices. Its state file `Golden/Frozen/state/D5/S1/Words/AdmissibleWords/AdmissibleCount.lean.json`
    exists at the subject commit and lists the declaration.
  - The volume applies this count in Theorems 44.2, 46.1 and Proposition 47.5 but does not cite the declaration, and
    the digestion ledger does not link it to the volume. Only the sentence "A path on n vertices has F of n plus two
    independent sets" and the clause "the path count is frozen in Lean" carry the `lean` badge. The mode counts built
    from it remain theory.
- **Published results used as inputs.** The finale badges them as published.
  - Matsuda–Ohsugi–Shibata, *Toric rings and ideals of stable set polytopes*, arXiv:1603.01850v1, Proposition 1.3:
    clique-sum toric fibre products and normality, applied to the retained K₂.
  - Miyazaki, *Non-Gorenstein locus and almost Gorenstein property of the Ehrhart ring of the stable set polytope of a
    cycle graph*, arXiv:2205.01409v1, §4, Lemmas 4.1–4.4: the single-cycle canonical generators for length ≥ 7. The
    volume proves the five-cycle case directly.
  - Barile–Bruns, *ℤ^r-graded rings and their canonical modules*, arXiv:2505.11402v1, Theorems 3.7, 4.5 and 5.1: the
    graded Danilov–Stanley interior and the canonical-Ext interface.
  - Transfer-matrix framework: Bóna–Ju–Yoshida, arXiv:math/0606163, and Jiang–Yang–Zhong, arXiv:2607.22008v1.
- **Classical tools named in the volume.** The finale badges them as classical.
  - Möbius inversion on Boolean intervals (Rota, doi:10.1007/BF00531932).
  - The finite maximal coupling (Griffeath, doi:10.1007/BF00539434); the least-disagreement sentence is badged
    classical.
  - Hochster's theorem; Hilbert syzygy; Auslander–Buchsbaum (Stacks Project, tag 090U), whose sentence is badged
    classical; graded Nakayama.
- **Project inputs from other volumes, badged as theory.**
  - From the CONTINUATION volume: the integral cycle decomposition (Theorem 28.2), the single-cycle semigroup and
    ν_j layers (§31–§32), and the common-vertex comparator (§35–§38: types 202 and 30302, 505 modes, F₄₉₁). Also from
    §39, the separator criterion and the odd-path obstruction (Theorem 39.2).
  - The legal-pattern moment coordinates of *Hidden Relations*, C-28.3 and C-28.5.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, exact fractions, sympy, scipy linear programming
  and assignment) checks the following.
  - **Separator.** The P₃ histogram family against exhaustive enumeration for m ≤ 6, and the m = 2 example. Rank q + 1
    and Möbius inversion on 40 random separators; D − q − 1 = 0, 1, 3, 5 for K₃, P₃, P₄, C₅.
  - **Mismatch.** Linear programs on 60 random P₃ pairs with equal means give least disagreement = TV = 2|Δκ| (largest
    gap 6 × 10⁻¹⁷). Assignment on 300 random array pairs gives 2|ΔK| mismatched rows. The on-screen pair
    p = (.30, .15, .20, .10, .25), q′ = (.22, .23, .20, .18, .17) has equal means and TV = 0.16 exactly. Enumeration of
    the two odd paths gives attainable joint counts {1} and {0}.
  - **Decomposition.** For C₅ (m ≤ 5), C₇ (m ≤ 4), C₅ + C₅ and C₅ + C₇ (m ≤ 3) and C₇ + C₇ (m ≤ 2) on one edge, the
    integer points of the inequalities equal the sums of exactly m independent-set indicators. The C₇ slack-edge
    example is checked as well.
  - **Basic exponents, brute force.** On two seven-cycles at one edge, all interior exponents of degrees 3 to 7 (1,
    297, 15119, 295340 and 3210093 points) are tested against every row. The basic counts are 1, 0, 89, 0, 0, and
    "basic ⟺ some branch equals ν_j" holds on every point.
  - **Descent and comparison.** The mixed tuple (ν₂, (5; 2, 2, 1, 1, 1, 1, 1)) is basic while its partner is locally
    reducible. Rule σ finds a removable row on 1500 sampled degree-6 points, and the on-screen point loses {a}. Two
    seven-cycles at one vertex have 1 + 201 = 202 generators.
  - **Types and tables.** T₂ row vectors, A₃,₂ = 45, the types 2, 90, 5942 and 2, 202, 30302. The E_k formula against
    brute force for k = 2, 3 (m ≤ 8 and m ≤ 7) and against direct counts for k = 4 (m ≤ 10). The degree-five table
    (sums 288, 1, 289; squares 15119, 15030; quotient 89), T₂⁶ and L₃(2, ·, ·), and the degree-six entries with
    quotient 2053, also by direct brute force.
  - **Presentation.** 297 = 169 + 64 + 64 modes and Σ = (297; 64, 64; 89, 79, 84, 79, 89). D^e for k = 2, 3, 4 and
    b = 1, 2, path counts F(n + 2), and 505 modes for the common-vertex graph.
  - **Mixtures.** Eight five-cycle triples, the nine edge-feasible triples, and 45 seven-cycle choices. Brute force for
    C₅ + C₇ gives 1 + 8 generators (degrees 3–7), C₅ + C₅ + C₇ gives 1 + 64 and C₅ + C₅ gives 1. D = 113, 469 and 43
    by enumeration.
  - **Short branches and growth.** A_(k,j) from (47.7) equals a direct capped count for k = 2…7, j = 1…6, and
    A_(2,j) = j³. For C₇ + C₉: 778 modes; 271 basic among 76355 degree-five interiors by brute force; the 390 tuples
    at (7, 3, 3) are basic, and 400 sampled other interiors there are not. The eigenvalues, weights, spectral formula,
    bound (47.19) and det(I − wH²) are checked for j = 2…5, the ratio limits 5.0489 and 12.3435, and (47.20).
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The two P₃ example arrays and the D − q − 1 table.
  - The p, q′ bars, the linear-programming scatter and the 0/1 path rows.
  - The C₇ slack example and the brute-force degree table.
  - The before/after synchronized-removal example.
  - The T₂ row vectors, the type bars, the degree-five sector grid and the degree-six numbers.
  - The path-count bars, the mode split and Σ.
  - The eight triples, the A_(k,j) table, the C₇ + C₉ counts, the eigenvalue dots with weights and the ratio dots with
    their limits.
- **Illustrative visuals.** These are illustrations, not data:
  - the glued-cycle drawings in the opening, title, edge, mixed, short-branch and finale scenes;
  - the three-site pattern glyphs;
  - the row-block alignment sketch;
  - the resolution chain boxes and the incidence-matrix grid.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
