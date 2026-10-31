# 075 · AURIC–LANGLANDS V · CUBIC SHALLOW TWIST COLLISION · AURIC–Langlands 第五部 · 三次浅扭碰撞

This is part five of the AURIC–Langlands series, a short addendum that runs about 4¾ minutes. It covers the whole of
`AURIC_LANGLANDS_CUBIC_SHALLOW_TWIST_COLLISION.md` in trureturing (Definition 1, Proposition 2 and Corollary 3), at
subject commit `f15ddb4c42`.

Part four went where readings collide while their sources stay apart. This volume finds the same thing in a local
Langlands test. Two non-isomorphic supercuspidal representations of GL₃ over F₇((t)), built from two characters that
differ by one sign, have equal complete Rankin–Selberg factors against every character twist of depth at most 2/3.

## The film, scene by scene

- **Fields and characters (Definition 1, proof of Proposition 2).**
  - F = F₇((t)) and E = F₇((u)) with t = u³. Since 7 ∤ 3 and X³ − t is Eisenstein, E/F is cyclic and totally tamely
    ramified, with σ_j(u) = ζʲu for the primitive cube root ζ = 2.
  - Principal units multiply as (a, b)(a′, b′) = (a + a′, b + b′ + aa′) modulo u³, so a and b − a²/2 are additive
    coordinates.
  - θ_ε(uᵐ r v) = e(εa + b − a²/2) for ε = ±1. It has θ_ε(u) = 1, is trivial on residue units and on U³, and has
    θ_ε(1 + bu²) = e(b), so its conductor exponent is 3.
- **Two parameters (Proposition 2).**
  - R_ε = Ind θ_ε from W_E to W_F. The conjugates of θ_ε have coefficient pairs (ε·2ʲ, 4ʲ). On wild inertia they give
    the three distinct nontrivial characters e(b), e(4b), e(2b), permuted transitively, so R_ε is irreducible with
    multiplicity-free wild restriction.
  - If R₊ ≅ R₋, then θ₋ = θ₊ ∘ σ_j for some j. The second coefficient forces j = 0, and the first would give 1 = −1 in
    F₇. So π₊ ≄ π₋, and both are supercuspidal.
- **Conductor and depth (Proposition 2).**
  - The different is (3u²), of exponent 2, so a_F(R_ε) = 1 · (3 + 2) = 5, the Swan conductor is 2 and
    d(π_ε) = (5 − 3)/3 = 2/3.
  - θ_ε is trivial on F^×, the transfer is trivial and the cyclic permutation has determinant 1. So det R_ε = 1 and
    both central characters are trivial.
- **Shallow twists (Proposition 2).**
  - For GL₁, a character of conductor a ≥ 2 has depth a − 1, so d(χ) ≤ 2/3 exactly when χ is trivial on U_F¹.
    These characters are the pairs (η, z) with η any of the six characters of F₇^× and z = χ(t) any nonzero complex
    number.
  - The twisted character ξ_ε = θ_ε · (χ ∘ N) has ξ_ε(u) = z, ξ_ε(r) = η(r³) and the same principal-unit part, so its
    conductor exponent is still 3. No unitarity or finite-order condition on z is needed.
- **The unit sum (Proposition 2, formulas 2–4).**
  - ψ_E(Σ yⱼuʲ) = e(3y₀), vol(O_K) = 7^(1/2) and vol(u³O_E) = 7^(−5/2). The Fourier transform of ξ_ε⁻¹ on the units is
    supported on u⁻²O_E^×.
  - Tate's functional equation gives γ_E(s, ξ_ε, ψ_E) = z² · 7^(−2(s − 1/2)) · 7^(−3/2) · S_ε(η), with the complete unit
    sum S_ε(η) = Σ η(r³)⁻¹ e(a²/2 − εa + (3r − 1)b) over r ∈ F₇^× and a, b ∈ F₇ (formulas 2 and 3).
  - Summing over b leaves only r = 1/3, which contributes 7, and (1/3)³ = −1. So
    S_ε(η) = 7 η(−1) Σₐ e(a²/2 − εa) (formula 4), and a ↦ −a identifies the two signs.
- **Complete collision (Proposition 2, formula 1; Corollary 3).**
  - Induction gives ε_F(s, R_ε ⊗ χ, ψ_F) = λ_E/F(ψ_F) ε_E(s, ξ_ε, ψ_E) with the same λ for both signs. All rank-one and
    pair L-factors are 1, and local Langlands preserves the pair factors.
  - So γ(s, π₊ × χ) = γ(s, π₋ × χ) = λ_E/F(ψ_F) η(−1) z² 7^(−2(s − 1/2)) 7^(−1/2) Σₐ e(a²/2 − a) for every η, every
    nonzero complex z and every complex s (formula 1).
  - At n = 3 the only twisting rank in Luo–Stevens Conjecture 1.3 is 1, and the depth bound is 2/3. The conjecture is
    stated for all nonarchimedean local fields, the central characters agree and π₊ ≄ π₋, so it is false as literally
    stated (Corollary 3).
- **Rank versus depth (Corollary 3).**
  - The converse theorems of Jacquet–Liu (Theorem 1.3), Adrian–Liu–Stevens–Xu (Proposition 7.2, Corollary 7.3) and
    Jiang–Nien–Stevens (Theorem 1.5) use twists of every depth and are not contradicted.
  - One admissible pair refutes the universal implication; no positive statement for a restricted family is made.
  - The film adds one recomputed illustration: every twist of conductor two (depth one) separates the pair, with
    factor ratio a nontrivial seventh root of unity.

一部约四分四十五秒的短片，AURIC–Langlands 系列的第五部，作为附篇：在 F₇((t)) 上取立方根扩张 F₇((u))，用只差一个符号的两个导子为三的特征 θ₊、θ₋ 诱导出两个不同构的 GL₃ 超尖表示，二者深度为 2/3、中心特征平凡；对所有深度不超过 2/3 的特征扭转，Tate 函数方程把因子化为一个完整单位和，对 b 求和只留下 r = 1/3，a ↦ −a 使两个符号的和相等，于是完整 Rankin–Selberg 因子对每个 η、每个非零复数 z 和每个复数 s 都相同。在秩三这正是 Luo–Stevens 猜想 1.3 的全部扭转范围，所以该猜想按字面陈述不成立；使用所有深度扭转的逆定理不受影响，本片的重新计算显示深度一的扭转已经把这一对分开。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-075-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen declarations.** None are used. At the subject commit this volume has no digestion records and no
  Lean declaration covers its statements.
- **Published results, used as external inputs.** The collision, rank-versus-depth and finale scenes badge them as
  published.
  - The conjecture and the complete Rankin–Selberg factors: Luo–Stevens, arXiv:2505.22357v1 (§2.1, Theorem 2.7,
    Definition 2.8, Conjecture 1.3).
  - The inducing-character construction, the ramified local-constant formula and the induction of local constants:
    Adrian–Liu–Stevens–Tam (UEA eprint 65335, §3, equation 2.1, Theorem 2.3, Lemma 2.4, Theorem 3.2).
  - Conductor induction, reciprocity and wild inertia: Bushnell–Henniart, arXiv:1302.4304v1 (§1.3, §§4.1 and 6.2).
  - Conductor–depth formula and depth preservation: Aubert–Baum–Plymen–Solleveld, arXiv:1311.1606v2 (Proposition 2.5,
    Theorems 2.7 and 2.9).
  - Positive-characteristic factor normalisation: Henniart–Lomelí, arXiv:1305.5452v1 (Theorem 2.2, §§2.6–2.9).
  - All-depth converse theorems: Jacquet–Liu, arXiv:1601.03656v2; Adrian–Liu–Stevens–Xu, arXiv:1409.4790v1;
    Jiang–Nien–Stevens, arXiv:1504.02819v1.
- **Classical tools named in the volume.** Tate's local functional equation (the unit-sum scene badges it as
  classical) and the norm and transfer diagrams of local class field theory (Milne, *Class Field Theory*, Chapters I
  and III).
- **Theory volume, argued but not kernel-checked.** Proposition 2 and Corollary 3, and everything else in the film,
  are badged as theory.
- **Recomputed for this film.** An independent Python script checks the following by brute force over truncated
  power series in u with coefficients in F₇.
  - **Fields.** The cube roots of unity in F₇ are 1, 2 and 4, so ζ = 2, and 3³ = (1/3)³ = −1.
  - **Characters.** The unit law modulo u³ holds on all 7⁴ pairs, θ₊ and θ₋ are characters of U¹/U³, and the
    conjugate pairs are (1, 1), (2, 4), (4, 2) for θ₊ and (6, 1), (5, 4), (3, 2) for θ₋.
  - **Parameters.** The second coefficients are 1, 4 and 2, all distinct. No conjugate of θ₊ equals θ₋.
  - **Trace and norm.** Tr(uʲ) = 3t^(j/3) or 0 for j = 0…9 from the multiplication matrix, N(u) = t, N(r) = r³, and
    N(U_E¹) ⊂ U_F¹.
  - **Conductor.** a_F = 1 · (3 + 2) = 5, Swan 2, depth 2/3.
  - **Fourier support.** For both signs and all six η, |φ̂_ε(y)| is 0 at valuations 0, −1, −3 and −4 and 1/7 at
    −2, and φ̂_ε(v/u²) = ξ_ε(v) φ̂_ε(1/u²) on random units.
  - **Unit sum.** φ̂_ε(1/u²) = 7^(−5/2) S_ε(η), and formula 4 holds for all six η and both signs, so S₊ = S₋. The
    inner sum over b is 7 at r = 5 and 0 elsewhere. The Gauss-type sum has absolute value √7; it equals i√7 · e(3/7).
  - **Factors.** The brute-force E-side factor z² 7^(2(1−s)) φ̂_ε(1/u²) agrees for both signs and with formula 1
    (without the common λ) on 12 samples with Re s = 1/2 and |z| = 1, where |γ_E| = 1, and on 8 samples with random
    complex z and s.
  - **Depth one.** For the 36 characters of conductor two (six η, six values of α in χ(1 + ct) = e(αc)), the
    conductor-four transforms are supported at valuation −3 only, and the ratio of the two E-side factors is
    e(c/7) with c = 1/(2α) in F₇, that is c = 4, 2, 6, 1, 5, 3 for α = 1, …, 6, independent of η, z and s. The induction constant is common, so
    the complete factors differ.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.**
  - The cube roots of unity in F₇.
  - The two 7 × 7 grids of θ₊ and θ₋ on U¹/U³.
  - The coefficient-pair orbits.
  - The table of cubes r³.
  - The Fourier-support bars and the inner b-sum bars.
  - The seven terms of the unit sum on the circle of seventh roots of unity, and the sum vector.
  - The twelve sampled factor values.
  - The depth-one ratios.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and Ω ring;
  - the field tower;
  - the wild-inertia triangle;
  - the unit filtration ladder and the conductor bars;
  - the permutation matrix;
  - the GL₁ depth ladder, the η hexagon and the z-plane;
  - the rank-versus-depth chart.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
