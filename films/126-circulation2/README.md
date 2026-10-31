# 126 · AURIC CIRCULATION CONTROL II · INDEX CARRIERS, ODD RINGS AND SHARED ROOTS · AURIC 环流控制 第二部 · 指标载体、奇环与共享根

This is part two of three in the AURIC CIRCULATION CONTROL series and runs about 7½ minutes. It covers
`AURIC_FIB_ATOM_CIRCULATION_CONTROL_KL_ACTION_AND_TORIC_RELATIONS_CONTINUATION.md` at subject commit `85be02fafc`;
the scenes run from §25 to §39, across the beginning, the middle and the end of the volume. Part one covers the main
volume and part three covers CONTINUATION_2. The four-corner relation f = z₁z₃ − z₀z₁₃ of part one gets an elliptic
carrier on CP⁴, an exact Pfaffian resolution on four positions and a self-dual resolution on every open path. Closing
the seam into an odd ring adds one global inequality; the single locally feasible tuple without a common lift
reappears as the gap between the two canonical generators of the seven-ring, then as nilpotent layers, terminal
syzygies, a smooth index that forgets the action, synchronized generators at a shared root, and a separator criterion.

## The film, scene by scene

- **Elliptic carrier (§25.1–§25.4, Theorems 25.3–25.5, Proposition 25.6).**
  - On CP⁴ with modes (0, 1, 2, 3, 13), the complex O(m − 2) —f→ O(m) with f = z₁z₃ − z₀z₁₃ has an elliptic Dolbeault
    totalization D = √2(δ + δ†). Its kernels are ker D⁺ ≅ (R₃)ₘ ≅ ker Hₘ with Hₘ = Aₘ†Aₘ, Aₘ = ∂₁∂₃ − ∂₀∂₁₃ on the
    Bargmann carrier, and ker D⁻ = 0.
  - The index is Nₘ = C(m + 4, 4) − C(m + 2, 4) = (m + 1)(m + 2)(2m + 3)/6 = m³/3 + 3m²/2 + 13m/6 + 1: 1, 5, 14, 30, 55,
    91. Nₘ is also the number of lattice points (U, V, W) of mP for the nonsimple pyramid P, Σ (m − W + 1)².
  - For the family f_s = s f the index stays Nₘ, but at s = 0 the kernels are C(m + 4, 4) and C(m + 2, 4): 35 and 5 at
    m = 3. The finite heat supertrace Tr e^(−tA†A) − Tr e^(−tAA†) equals Nₘ for every t > 0.
  - The smooth quadric f + εz₂² = 0 has Td = 1 + 3/2 h + 13/12 h² + 1/2 h³ and ∫h³ = 2, so its twisted index is again
    Nₘ. Since z₂² has character c² and f has character ab, only the subgroup c² = ab preserves it.
- **Pfaffian syzygies (§26, Theorems 26.2, 26.3, 26.5, Propositions 26.4, 26.6).**
  - Four positions give eight modes ∅, 1, 2, 3, 4, 13, 14, 24 and five quadrics f₁ … f₅. They are the signed
    Pfaffians of one 5 × 5 skew matrix M of linear forms: fᵢ = (−1)^(i+1) Pf(M without row and column i), and
    det = fᵢ².
  - 0 → S(−5) → S(−3)⁵ → S(−2)⁵ → S → R₄ → 0 is exact over ℤ and over every field, characteristic two included.
  - Its strands give 31, 85, 190, 371 in degrees 2 … 5, the index of the sheafified complex on CP⁷, where
    1 − 5e^(−2h) + 5e^(−3h) − e^(−5h) = 5h³ + O(h⁴).
  - With every relation map set to zero at m = 3 the index is still 85, but the kernels are 125 and 40.
- **Self-dual paths (§27, Theorem 27.2, Proposition 27.3, Definition 27.4, Theorem 27.5).**
  - An open path of n positions has F(n + 2) modes (3, 5, 8, 13, 21, 34, 55, 89 for n = 2 … 9).
  - The interior lattice points of the cone are (3; 1, …, 1) + Sₙ, so the mode algebra is Gorenstein with
    ω ≅ R(−(3; 1, …, 1)), and the minimal resolution is self-dual with last module S(−Θₙ),
    Θₙ = (F(n + 2) − 3; Fᵢ F(n − i + 1) − 1). For n = 3, 4, 6: (2; 1, 0, 1), (5; 2, 1, 1, 2),
    (18; 7, 4, 5, 5, 4, 7), with lengths 1, 3, 14.
  - The h*-numerators are palindromic of degree n − 2: 1 + t, 1 + 3t + t², 1 + 7t + 7t² + t³,
    1 + 14t + 31t² + 14t³ + t⁴, and Nₙ(−m) = (−1)ⁿ Nₙ(m − 3).
- **Seam matrix and odd rings (§28.1, Theorem 28.2, Proposition 28.3).**
  - In a common array of m rows only the position totals c are observed. Open observations satisfy cᵢ + cᵢ₊₁ ≤ m and
    are counted by eᵀ T_m^(n−1) e with T_m(a, b) = 1 if a + b ≤ m. T_m has determinant (−1)^(m(m+1)/2), so any exact
    factorization of the seam pairing needs dimension m + 1.
  - Two three-position pieces sew to 21, 157, 707 observations at m = 1, 2, 3, against the products 25, 196, 900.
  - On an odd ring n = 2k + 1 the extra condition is Σ cᵢ ≤ km. On seven positions Tr T_m⁷ = 29, 289, 1640, 6604,
    21122 and the true counts are 29, 288, 1633, 6575, 21031; the excess is 0, 1, 7, 29, 91, with series
    t²/((1 − t²)(1 − t)ⁿ). At m = 2 the only extra tuple is (1, …, 1), which two rows cannot realize.
- **Seven-ring defect (§29–§30, Theorem 29.2, Theorem 30.2, Proposition 30.3, Theorem 30.5).**
  - The seven-ring has 29 modes (1 + 7 + 14 + 7). Its canonical module has the two minimal generators
    ν₃ = (3; 1, …, 1) and ν₅ = (5; 2, …, 2), and ν₅ − ν₃ = (2; 1, …, 1) is the tuple without a lift.
  - 0 → R(−3) → ω_R → (R/J)(−5) → 0 with R/J ≅ ℂ[y₀, …, y₆]. The face is the linear CP⁶ ⊂ CP²⁸ of the seven maximum
    modes, and the index difference ind D⁺(ω, m) − ind D⁺(R, m − 3) = C(m + 1, 6) = L°(m) − L(m − 3) =
    E(m − 3) − E(m − 5): 1, 7, 28, 84, 210 for m = 5 … 9.
  - H_R(t) = (1 + 21t + 84t² + 85t³ + 21t⁴ + t⁵)/(1 − t)⁸ is not palindromic, and −L(−x) = L(x − 3) + C(x + 1, 6).
- **Nilpotent layers (§31–§32, Theorem 31.3, Propositions 31.4–31.5, Theorem 32.2, Proposition 32.3).**
  - For n = 2k + 1 with k ≥ 3 the canonical generators are νⱼ = (2j + 1; j, …, j), j = 1 … k − 1. The quotient
    C_k = ω/X^ν₁R is free over the face algebra A_k with basis e₂, …, e_(k−1), and Xˢ acts by y^a(s) N^δ(s), where a is
    the edge slack, δ the deficit and N lowers eⱼ to eⱼ₋₁ with N^(k−2) = 0.
  - On nine positions the mode I = {0, 2, 4} has deficit one and acts by the matrix with single entry y₅y₆y₇ from e₃ to
    e₂, whose square is zero. The annihilator is spanned by the monomials of deficit at least k − 2.
  - C_k(m) = Σ C(m + 2k − 2j − 1, 2k) = E_k(m − 3) − E_k(m − (2k − 1)): 1, 7, 28, 84, 210 (n = 7), 1, 9, 46, 174, 540
    (n = 9), 1, 11, 67, 297, 1068 (n = 11) for m = 5 … 9.
- **Index without action (§33–§34, Theorems 33.2, 34.2, 34.4, Proposition 33.3).**
  - Dₙ = F(n − 1) + F(n + 1) modes, length pₙ = Dₙ − n − 1, and last module ⊕ S(−(Σ − νⱼ)) of rank k − 1: 29, 21,
    degrees 26 and 24 (n = 7); 76, 66, degrees 73, 71, 69 (n = 9); 199, 187, degrees 196, 194, 192, 190 (n = 11). The
    open path of seven positions has 34 modes, length 26 and one last summand of degree 31.
  - Restricting C_k to A_k gives ⊕ O(m − 2j − 1) on CP²ᵏ, whose Dolbeault index is C_k(m), with ker D⁻ = 0.
  - The split module with the same layers (positive deficit acting by zero) has the same bundle and every index equal,
    but for k ≥ 4 it is not isomorphic to C_k.
- **Shared root (§35–§36, Theorems 35.2, 35.4, 35.5, 36.2, Propositions 35.6, 36.3).**
  - Gluing b odd rings at one vertex, observations are exactly tuples of local observations with the same degree and
    root count, and R_k,b is the bigraded diagonal ⊕ (R_k)_(m,t) ⊗ … ⊗ (R_k)_(m,t).
  - A global interior exponent is a minimal canonical generator exactly when some cycle restriction is a local νⱼ.
  - For seven-cycles, (T₂⁷) middle entry = 101 local interiors at (5, 2), so type R₃,b = 1 + 101ᵇ − 100ᵇ: 2, 202,
    30302. The two-cycle quotient C₃,₂ has 201, 6157 and 80796 monomials in degrees 5, 6, 7. Five-cycle families have
    type 1.
- **Cyclewise deficit (§37–§38, Theorems 37.1, 37.3, 38.2, Propositions 37.4, 38.3).**
  - A class [X^p] is killed by Xˢ exactly when δ_a(p) + δ_a(s) ≥ k − 1 on every ring a. On two seven-cycles the
    root-zero modes x = ({1, 3}, {1, 3, 5}) and y = ({1, 3, 5}, {1, 3}) have deficits (1, 0) and (0, 1): x and y act
    nonzero, every power x^q acts nonzero, and xy annihilates C₃,₂.
  - Two seven-cycles at a root have 21² + 8² = 505 modes, projective dimension 491 and last module
    P(−502) ⊕ P(−500)²⁰¹ of rank 202; each cycle's Σ coordinates are (168, 129, 142, 142, 129, 168), root 64.
- **Separator criterion (§39, Theorem 39.2).**
  - For branches meeting exactly in an induced separator H, a global array exists exactly when the branches share one
    attainable separator histogram.
  - For b ≥ 2, matching one-point totals always suffices exactly when H is complete. Otherwise, with nonadjacent
    a₀, b₀, the branches a₀ − x − b₀ and a₀ − y − z − b₀ at m = 2 force a₀, b₀ into the same row and into opposite
    rows: the union is an odd five-cycle.

Not shown: the four-position counting bridge of §25.5 (its counts appear through §26.3), the subalgebra presentation
and forbidden-mode comparison of §28.2, the Gorenstein boundary list in §29.2, the scope statements of §38.2 and the
degenerate cases of Proposition 39.3.

一部约七分半钟的片子，AURIC 环流控制系列的第二部：第一部的四角关系 f = z₁z₃ − z₀z₁₃ 在 CP⁴ 上得到一个椭圆载体，核就是商空间、指标为 1、5、14、30、55，而把 f 缩放到零时核跳变、指标不变；四个位置的五个二次关系是一个 5×5 斜对称矩阵的 Pfaff 式，分解在整数和每个域上正合；开路径上的模式数是 F(n+2)，分解自对偶，分子回文。把接缝闭合成奇环要多加一个总数限制，全 1 元组是唯一无法提升的局部元组；它在七环上正是两个典范生成元之差，商在线性面 CP⁶ 上给出指标修正 C(m+1, 6)，Hilbert 分子 84 ≠ 85。一般奇环有 k − 1 个生成元和幂零的层作用，各层计数是两个次数处迹误差之差；分解末端由生成元决定；限制到面上的光滑指标忘掉了作用。最后，共享一个根的奇环同步粘合，型为 1 + 101ᵇ − 100ᵇ；亏量逐环计算；沿分隔子粘合当且仅当分隔子是完全图时只需单点总数。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-126-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean and digestion.**
  - At the subject commit the continuation volume has no digestion records (it is not ingested), and neither does the
    main volume; no atom of either is covered or closed.
  - One frozen general theorem is used for one sentence: `D5.S1.Words.AdmissibleWords.AdmissibleCount.admissibleWord_card_eq_fib`
    (state file `Golden/Frozen/state/D5/S1/Words/AdmissibleWords/AdmissibleCount.lean.json` present at the subject
    commit) states that binary words of length m with no two consecutive ones number F(m + 2). It matches the count of
    open-path modes |Bₙ| = F(n + 2) in §27.1. The digestion ledger does not link it to this volume; the volume's other
    uses of the count are badged as theory.
  - No other statement in the film is covered by a Lean declaration.
- **Published results, used as external inputs (badged as published).**
  - Path-polytope codegree, reciprocity and palindromy: Jiang–Yang–Zhong, *Transfer Matrices and Ehrhart Theory for
    Path and Cyclic Block Polytopes*, Theorem 1.6, Remark 1.7, §3 (arXiv:2607.22008).
  - Odd-cycle canonical generators and free face layers: Miyazaki, *Non-Gorenstein locus and almost Gorenstein property
    of the Ehrhart ring of the stable set polytope of a cycle graph*, §4 (arXiv:2205.01409).
  - Clique-sum toric fiber products: Matsuda–Ohsugi–Shibata, *Toric rings and ideals of stable set polytopes*,
    Proposition 1.3 (arXiv:1603.01850).
  - Multigraded canonical modules and Ext: Barile–Bruns, *ℤʳ-graded rings and their canonical modules*, Theorems 4.5(a)
    and 5.1 (arXiv:2505.11402); Brennan–Dupont–Villarreal (arXiv:0812.0823); Stanley, *Two Poset Polytopes*.
- **Classical tools named in the volume.** Atiyah–Singer and Hirzebruch–Riemann–Roch (as in Freed, arXiv:2107.03557),
  Hodge theory for elliptic complexes, Serre's GAGA, Stacks 01XT (cohomology of projective space), 00N1 and 090U,
  Buchsbaum–Eisenbud (*What makes a complex exact?* and the 1977 structure theorems), Hochster's theorem,
  Danilov–Stanley, Hibi rings, and the Ohsugi–Hibi and Hibi–Tsuchiya Gorenstein precedents.
- **Project inputs from other volumes, not recomputed except where listed below.** The main volume's chapter 23 (five
  modes, Toric Theorem 23.6, finite Bargmann quotient), Pyramid Correlation chapter 26 (Hibi history kernel and
  feasible sectors), and the hidden-relation, static-seam and pyramid-local-filling volumes for the distinction between
  common realizations and marginal completions.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (numpy, sympy) ran 7819 checks; these are sampled and
  finite checks, not proofs.
  - **Carrier.** On the Bargmann carrier the adjoint of Aₘ is multiplication by f, Aₘ is onto and dim ker Aₘ = Nₘ for
    m ≤ 6. At m = 3 the five positive eigenvalues of A†A and AA† agree and the heat supertrace is 30 at 61 values of
    t. The torus multiplicity is 1 exactly on the legal sectors for m ≤ 6. The Todd integrals on CP⁴, the quadric
    (Td and ∫h³ = 2) and the kernel jump 35, 5 were recomputed.
  - **Four positions.** The five Pfaffian and determinant identities, fᵀM = 0 = Mf and both syzygies of (25.15). The
    strands for m = 2 … 5 are exact modulo 2 and modulo 32003, and the quotient dimensions 31, 85, 190, 371 equal the
    number of distinct occupancy images (ker φ = I). 1 − 5e^(−2h) + 5e^(−3h) − e^(−5h) = 5h³ + …, the CP⁷ index equals
    N₄(m) for m ≤ 6, and the zero-map kernels are 125 and 40.
  - **Paths.** F(n + 2) modes for n ≤ 12; the h*-vectors for n = 3 … 6; reciprocity as a polynomial identity for
    n = 3 … 7; the interior translation for n = 2 … 6, m ≤ 7; the Θ tuples; the multigrading of M; both index forms
    (27.13).
  - **Seams.** det T_m for m ≤ 7; the transfer counts; 21, 157, 707 and the vectors (10, 9, 7, 4), (246, 216, 160, 85);
    common-copy realizability by brute force for open paths n = 3 … 5 and rings n = 4 … 9 at small m; the seven-ring
    table and excess 0, 1, 7, 29, 91; at m = 2 the only extra tuple is all ones.
  - **Seven-ring.** By enumeration, the minimal interior exponents up to degree 9 are exactly ν₃ and ν₅; the
    corrections 1, 7, 28, 84, 210; the numerator 1, 21, 84, 85, 21, 1 (zeros up to degree 13); the reciprocity identity;
    Σ = (29; 8, …, 8); the CP⁶ index C(m + 1, 6) for m = 3 … 11 and E(m − 3) − E(m − 5).
  - **Layers.** Minimal interior exponents ν₁, ν₂, ν₃ for n = 9 (degrees ≤ 8) and n = 11 (degrees ≤ 7); the action
    formula on 300 random semigroup points for each of n = 7, 9, 11, 13; the slack of I = {0, 2, 4}; the C_k table three
    ways (binomial sums, trace errors, interior counts).
  - **Terminal modules and index.** Dₙ = 29, 76, 199 by enumeration with Σ coordinates F(n − 1); the residue identity
    (34.8); the CP²ᵏ index equals C_k(m) for k = 3, 4, 5 and m ≤ 9.
  - **Shared roots.** Synchronized gluing counts by brute force for two five-cycles (m ≤ 3) and two seven-cycles
    (m = 2: 35610); 505 global modes and their Σ coordinates; the transfer vectors and 101; by brute force over 35811
    interior points and 505 modes, the basic exponents of R₃,₂ number 1, 0, 201 in degrees 3, 4, 5; I = B + E in every
    root sector for m = 5, 6, 7 with totals 201, 6157, 80796.
  - **Deficits.** The deficit vectors of x, y and p* = (5; 2, …, 2); survival of x, y and x^q (q ≤ 29) and death of xy.
  - **Separators.** The five-cycle counterexample by exhaustive search (no global array), and 60 random complete
    (K₂) separator gluings, all realizable.
- **Data drawn on screen.** The Nₘ bars and pyramid layers; the heat-trace curves; the kernel table; the
  four-position table and kernel bars; the F(n + 2) bars, the n = 2 lattice triangle, the Θ table and h* bars; the T₃
  matrix, sewing table and seven-ring table; the correction bars and h-vector bars; the C_k table; the terminal table
  and index bars; the transfer vectors and types; the Σ coordinates.
- **Illustrative visuals.** The rotating pyramid; ring and petal diagrams; the example array rows; the layer ladder and
  module boxes; the deficit lattice (its points are the exact deficit vectors); the separator diagram and its
  histogram (illustrative).

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
