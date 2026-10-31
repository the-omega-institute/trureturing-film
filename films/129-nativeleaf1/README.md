# 129 · RRO NATIVE LEAF BOUNDARY I · FIRST ARRIVALS, ORDERED ROOTS AND THE HIDDEN LEAF · RRO 原生叶边界获取 第一部 · 首达、有序根与隐藏的叶

This is part one of the four-part series RRO NATIVE LEAF BOUNDARY and runs about 7 minutes (7:09). It covers
`RECURSIVE_RELATIONAL_OBSERVATION_NATIVE_LEAF_BOUNDARY_ACQUISITION.md` at trureturing subject commit `f22f98e34f`,
with scenes drawn from the beginning, middle and end of the volume: §1–§5, §7–§8, §10–§11, §14, §17–§22 and
§25–§28, §31. Parts two to four will cover the volume's `_II`, `_III` and `_IV` continuations.

A finite tree exposes only its leaves, through five commands: Reset, Add, Tick, Hold and Read. The film follows
what those commands recover: distances, the tree, the law and the current field on a weighted tree; the original
root of a birth-typed ordered tree; sparse onsets and a passive age; and a single hidden leaf on a unit tree.

Sections not shown: §6 (the four expressions on the weighted source), most of §7 (the resource accounts; only the
width example of Proposition 7.5 appears), §9 (suppliers and the synthesis Theorem 9.4), §12 (one-step action
correspondence and the ρ macro), §13 (four expressions at zero-field cuts), §15–§16 (resources and suppliers of the
ordered installation), §21 (four expressions on the sampled image), §23–§24 (the concatenated run and its
suppliers), §29–§30 (four views on the calibration image, codec and wire accounting).

## The film, scene by scene

- **First arrivals (§1–§2, Lemma 2.1, Theorem 2.2).**
  - The source is a finite tree whose leaves are exactly the roster ports; links are positive rationals and the
    diagonal is arbitrary. Pulse a leaf after a Reset: for k below the distance d, (Tᵏ)ᵤᵥ = 0, and (Tᵈ)ᵤᵥ is the
    product of the edge weights on the path, so it cannot cancel.
  - Stopping each trial once every other leaf has answered gives the whole leaf distance matrix with no size advice,
    using Σ Dₐ Ticks and b Σ (Dₐ + 1) Reads. On the nine-vertex example (four leaves): D = (6, 5, 5, 6), 22 Ticks,
    104 Reads.
- **Metric to tree (Lemma 2.3, Corollary 2.4).**
  - For each leaf pair and each position r on its path, q(a, c, r)ⱼ = hⱼ + |r − tⱼ| gives that vertex's distance
    vector. Distinct vectors joined at sup distance one give the whole unit tree, degree-two vertices included.
  - The example has 32 candidates, 9 distinct vectors, so N = 9 and I = 5, and D = 6 = I + 1 (in general D ≤ I + 1
    and Q ≤ C(b, 2)(D + 1)).
- **Infection (Lemma 3.2, Theorem 3.3).**
  - A marked vertex with exactly one unmarked neighbour marks it; from all leaves this marks the tree in exactly I
    steps. Each step isolates one link from the residual r = z·p_v − a·p_v − Σ c_u·p_u, whose norm is T_wv².
  - Moments M_k = Jᵀ Tᵏ J through H = 2I + 1 recover every coefficient exactly, with one rational square root per
    step and no spectral assumption. On the example H = 11, with 192 Reads and 44 Ticks for this stage; the unit
    star K₁,₃ (eigenvalue 0 twice) is recovered as well.
- **Passive window (Theorem 5.1, Proposition 7.5).**
  - With the law known, Read all leaves and Tick I times: the b(I + 1) readings recover any current field by
    x_v = Σ_r p_v,rᵀ y_r, and the predictor is installed at Tᴵ x. On the example: 24 Reads, 5 Ticks.
  - Exact widths grow: on the three-leaf star with T = ½ + A/16, e₁ − e₂ has eigenvalue ½ and Read(1) returns 2⁻ᵏ,
    although the spectrum ½, ½, ½ ± √3/16 lies in (0, 1).
- **Twin stars (Theorem 8.1).**
  - With one leaf omitted from the roster, a star with b visible leaves and one hidden leaf (all links
    a = 1/(8(b + 1)), diagonal ½) and a star whose hidden leaf is split into links 3a/5 and 4a/5 are intertwined by
    U e_h = 3/5 e_h₁ + 4/5 e_h₂. Every visible reply agrees for every adaptive policy, both are strict
    contractions, and the orders are b + 2 and b + 3.
- **Ordered root (§10–§11, Theorems 11.1–11.2).**
  - Birth-typed LAB trees: α is a terminal, β carries one left marker, and no α sits at an address ending in L.
    The unrooted material tree with its complete terminal order determines the original root and the ordered term.
  - On the unit-adjacency field, L pulse trials earn tree, size and law with no coefficient trials. For
    t₊ = ⟨β, ⟨β, α⟩⟩: 14 Ticks, 51 Reads, N = 2L + c − 1 = 7; of the three degree-two candidates only the true root
    parses.
- **Load-bearing hypotheses (Theorems 14.1–14.3).**
  - Without the terminal order, ⟨β, ⟨β, α⟩⟩ and ⟨⟨β, α⟩, β⟩ give the same field service, but S_L is enabled at
    one and refused at the other.
  - Without birth typing, one six-vertex tree with terminals (c, d, e) is both ⟨⟨β, α⟩, α⟩ (rooted at r) and
    ⟨α, ⟨α, β⟩⟩ (rooted at b). The growth words P_ε S_ε S_L P_R and P_ε S_ε P_R S_L both end at ⟨⟨β, α⟩, β⟩ and
    are not distinguished.
- **Sparse onsets (§17–§18, Theorems 17.3, 18.2, 18.4).**
  - 2L − 3 onsets suffice: aⱼ = d(ℓ₁, ℓⱼ) and cᵢ = d(ℓᵢ, ℓᵢ₊₁). The depth hᵢ = (aᵢ + aᵢ₊₁ − cᵢ)/2 is where
    neighbouring paths part, and gluing unit paths rebuilds the tree.
  - a₂ + Σ cᵢ + a_L = 2(N − 1). On the comb u_m: L = m + 1, N = 3m + 2, aⱼ = j + 2, cᵢ = 5, K_σ = 6m − 2 Ticks and
    R_σ = (m² + 17m − 10)/2 Reads, against Θ(m²) Ticks and Θ(m³) Reads for the full schedule.
- **Passive age (§19–§22, Theorems 19.3, 20.2–20.3, 22.1).**
  - After a pulse at terminal 1, m_k counts closed walks: zero at odd ages, and 1, 1, then strictly increasing at
    even ages. So the pair p_k = (m_k−1, m_k) fixes every age k ≥ 2, while p₁ = p₃ = (1, 0).
  - A late observer needs Read(1); Tick; Read(1); Hold to install the predictor at age k + 1. A single snapshot of
    all terminals fixes the age on the tail k ≥ D₁ exactly when the terminals meet both bipartition classes:
    t₋ = ⟨⟨β, β⟩, α⟩ (depths 3, 3, 1) fails, t₊ = ⟨β, ⟨β, α⟩⟩ (depths 2, 3, 2) succeeds.
- **Hidden leaf (§25–§27, Theorems 25.3, 26.2, 27.2).**
  - With exactly one leaf missing, the tree is the visible hull H plus one pendant path of length ℓ at a hull
    vertex v, and no visible distance depends on ℓ.
  - On the same last pulse, the first excess over the hull's walk counts at leaf j is at K_j = d* + d_j + 2 (which
    locates v), and the first deficit against a formal ray is at K∞ = 2(d* + ℓ + 1) (which gives ℓ). Example:
    K = 6, 8, 8, d* = 3, K∞ = 14, ℓ = 3, N = 10.
- **One versus two missing (§28, §31, Theorem 28.1, Proposition 31.1).**
  - With one leaf missing, the visible leaves still zero-force the whole tree, and integer polynomials
    p_w = z·p_u − Σ p_t read any later field from a passive window (24 Reads on the example).
  - With two hidden leaves on a unit star, z = e_h₁ − e_h₂ satisfies Jᵀz = 0 and Az = 0, so the fields x and
    x + z give identical complete service.

一部约七分钟的片子，RRO 原生叶边界获取系列的第一部：一棵有限树只露出它的叶，通过重置、加脉冲、走拍、保持和读数五条命令，首达时间给出叶距离，叶距离通过中位点向量重建整棵树，感染式强制在 2I + 1 拍内精确恢复全部系数，一个被动窗口读出任何当前场；在带出生类型的 LAB 树上，有序端点确定原始的根，端点顺序与出生类型都是承重假设；2L − 3 个稀疏起始时刻就能重建树，两次读取与一次走拍给出被动年龄；最后在单位树上，同一个脉冲的第一次超出与第一次不足找出唯一一片隐藏的叶，而两片隐藏叶能藏住一个场。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-129-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Digestion status.** At the subject commit this volume has no digestion records (there is no
  `Meta/Digestion/backfill/recursive-relational-observation-native-leaf-boundary-acquisition/` directory), so no atom
  of it is covered.
- **Lean-frozen declaration cited for one sentence.**
  - `D5/S3/Arith/FibonacciAtomic/Geometry/NativeMaterialRootRecognition`, declarations `original_rigidity` and
    `effective_inverse`. Its state file `Golden/Frozen/state/D5/S3/Arith/FibonacciAtomic/Geometry/NativeMaterialRootRecognition.lean.json`
    exists at the subject commit.
  - `original_rigidity` states that for birth-typed terms with at least three leaves, every unrooted isomorphism of
    the material trees that preserves the complete terminal list fixes the root and every material coordinate, and
    the terms are equal. `effective_inverse` gives a sound and complete unique recovery from a finite labelled input.
  - This is the uniqueness content of Theorem 11.1. The volume cites the module as a supplier in Theorem 31.2; the
    digestion ledger does not link it to the volume. Only the sentence "the unrooted material tree, with its
    terminals in order, fixes the original root and the whole ordered term" carries the Lean badge. The wave
    acquisition of Theorem 11.2 and everything else in that scene are badged as theory.
- **Published results, used as external inputs.**
  - Tree-metric reconstruction from a complete leaf set: Ilmavirta, Lassas, Lu, Oksanen and Ylinen,
    arXiv:2306.05253 (Theorem 1 and §5.1), which credits the classical tree-only theorem. The metric scene badges it
    as published.
  - The one-neighbour infection residual: Burgarth and Maruyama, arXiv:0903.0612, New J. Phys. 11, 103019,
    DOI 10.1088/1367-2630/11/10/103019. The infection scene badges it as published.
  - Interval encoding of planar genealogies: Lambert and Popovic, arXiv:1101.2241, DOI 10.1214/11-AAP820 (credited
    in Theorem 17.3; named on screen).
  - The volume also cites Blåsten, Isozaki, Lassas and Lu, arXiv:2107.00494; it is not used in the film.
- **Classical tools named in the volume.** The first-arrival travel-time observation (Lemma 2.1; the arrival scene
  badges it as classical), unique paths in trees, and walk counting by adjacency powers (mathlib
  `SimpleGraph.adjMatrix_pow_apply_eq_card_walk` at the pinned revision).
- **Project inputs, not recomputed as theorems here.** The reachable class of birth-typed terms and its growth
  semantics come from Atomic Generation Acquisition §§17–23 (Theorem 17.2); they are badged as theory.
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script (exact rational arithmetic) checks the following.
  - **Arrivals.** On the nine-vertex example, zeros before every distance and the positive edge product at it, for
    all 81 vertex pairs; distance matrix (0 3 5 6 / 3 0 4 5 / 5 4 0 3 / 6 5 3 0), 22 Ticks, 104 Reads. First
    arrivals at ℓ2, ℓ3, ℓ4 in trial 1: 3, 2/3, 2.
  - **Metric.** 32 candidates, 9 distinct vectors, 8 rebuilt edges equal to the true edges; D = 6 = I + 1;
    sup distance = graph distance for all pairs; 150 random tree draws.
  - **Infection.** All 9 diagonals and 8 links recovered exactly from M₀ … M₁₁ (largest degree used 11); roots
    2, 1/2, 1, 2/3, 3/2; E(p_v) = e_v with degree ≤ I; the unit star K₁,₃ (spectrum ±√3, 0, 0); 60 random draws of
    weighted trees with signed diagonals through the whole pipeline.
  - **Window.** A random rational field recovered exactly from 24 Reads; Read(1) = 2⁻ᵏ with k + 1 denominator bits
    for k ≤ 24 (231 retained bits by k = 20); eigenvalues ½ ± √3/16.
  - **Twins.** T′U = UT, UᵀU = 1, strict contraction, top eigenvalue ½ + a√(b + 1), and 40 random adaptive runs with
    identical Reads, for b = 3 … 7 (a = 1/32 at b = 3).
  - **Root.** Unique original root on all 2318 birth-typed terms with 3 to 7 leaves; t₊: N = 7, distances 5, 4, 3,
    14 Ticks, 51 Reads, degree-two candidates ε, L, RL.
  - **Load-bearing.** Conjugate adjacency for ⟨β, ⟨β, α⟩⟩ and ⟨⟨β, α⟩, β⟩ with different linear orders; exactly
    two parse roots (r and b) for the six-vertex tree without birth typing; both growth words end at ⟨⟨β, α⟩, β⟩
    with split word (ε, L).
  - **Sparse.** Gluing rebuilds and roots all 2318 terms; a₂ + Σ cᵢ + a_L = 2(N − 1), K_σ ≤ 3(N − 1) and
    K_σ ≤ K_full − D_L on all of them; comb formulas for m = 2 … 40 (m = 14: 82 vs 213 Ticks, 212 vs 3420 Reads).
  - **Age.** Odd moments zero, s_n strictly increasing for n ≥ 1, p_k injective for 2 ≤ k ≤ 70, p₁ = p₃, the
    Read–Tick–Read protocol returns age k + 1, the terminal-parity criterion on the tail, m₄ᵣ ≥ 2ʳ and
    ‖A²e‖² = deg v, on all birth-typed terms with 3 to 6 leaves. t₊: s = 1, 1, 2, 5, 15, 51, 186, 702, ….
  - **Hidden leaf.** K_j = d* + d_j + 2 with excess 1, K∞ = 2(d* + ℓ + 1) with deficit 1, R ≥ D_a* + 2,
    R ≤ 2|V(H)| and Z ≤ 2N on the example (6, 8, 8; 14; ray 1978 against 1977) and on 380 random trees.
  - **One versus two.** Forcing with one omitted leaf completes in I steps with integer polynomials and recovers a
    random field on 300 random tree draws; with two omitted leaves Jᵀz = 0, Az = 0, 50 adaptive runs with identical
    replies, and forcing stalls at the centre.
  - These are sampled and finite checks, not proofs of the general statements.
- **Data drawn on screen.** The trial-1 reading table and distance matrix; the δ-vector list; forcing roots and the
  recovered diagonal; the 2⁻ᵏ bit bars and cumulative curve; the t₊ distance table; the comb tick and read plots;
  the m_k stems and the t₋ / t₊ terminal frames; the hidden-leaf excess and ray tables; the two-omission field rows.
- **Illustrative visuals.** These are illustrations, not data: the tree, star and LAB drawings and their layouts,
  the pulse rings and forcing arrows, the command and protocol boxes, the stamps and the ledger boxes.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
