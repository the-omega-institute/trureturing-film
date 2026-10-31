# 130 · RRO NATIVE LEAF BOUNDARY II · SCRAMBLED LABELS, SINGLE READS AND HIDDEN LAWS · RRO 原生叶边界获取 第二部 · 乱序标签、单次读取与隐藏规律

This is part two of four in the RRO NATIVE LEAF BOUNDARY series and runs about 7 minutes. Part one (film 129) reads a
growing native tree through its ordered leaves. This part covers
`RECURSIVE_RELATIONAL_OBSERVATION_NATIVE_LEAF_BOUNDARY_ACQUISITION_II.md`, §17–§86, at subject commit `f22f98e34f`.
The terminal labels are scrambled, then the field is hidden, and at last the law itself. Each scene asks how few
actual calls on the same growing source recover the hidden part, and what that run costs.

## The film, scene by scene

- **Fresh-zero marking (§17–§18, §21).**
  - The source is a birth-typed native tree. Its terminals carry an arbitrary raw labelling λ₀, and the observer is
    not given the tree or λ₀. Growth keeps every old cell and gives every fresh cell the value 0. A promotion moves
    its label to the new marker. A split moves its label to the new left marker and appends label n + 1 on the right.
  - Arm every terminal to 1, make one enabled edit, Hold, and read all old labels. Exactly the acted label reads 0
    (Theorem 18.2).
  - A preorder traversal edits each entry leaf once. It returns the entry report (t, λ₀), the endpoint ρ(t) with
    zero field, and the exact current raw correspondence (Theorem 18.4).
  - For t = ⟨β, ⟨β, α⟩⟩ with λ₀(1) = RR, λ₀(2) = LL and λ₀(3) = RLL, the scans read (1, 0, 1), (1, 1, 0, 1) and
    (0, 1, 1, 1, 1). The canonical-to-raw permutation is (2, 4, 3, 5, 1). The run uses 7 addressed calls, 2 Resets,
    8 Adds, 12 Reads, 5 Holds and no Tick, with 46 request and 45 reply bits (Proposition 21.5).
- **Batch and age (§24–§27, §29).**
  - After an all-P normalisation, split selected cones by a fixed q × L binary table. The label of cone i reads
    1 − b_ri in round r. A decoder exists for every labelling exactly when the L columns are pairwise distinct
    (Theorem 25.1).
  - In this class the least split count is K_min(q, L) = Σ_(j<h) j·C(q, j) + h(L − C_<h) (Theorem 26.2), and the
    least Read count is L⌈log₂ L⌉. For L = 8 that is 24 Reads, against at least L² = 64 for the one-edit scan
    (Theorem 29.2).
  - The integer-age schedule splits cones 1 … L − 1 one at a time and adds 1 at every original label after each
    stage. One final scan reads L − i at cone i and L at the last cone: L Reads and L² unit Adds (Theorem 27.2).
- **No Reset (§34–§36, §58).**
  - Without Reset, and with an arbitrary unknown rational field, interior cells included, marking still earns
    (t, λ₀) and the current map. Arming reads each terminal and adds 1 − z_j, and no Tick occurs (Theorem 34.3).
  - A window of b(I + 1) terminal Reads gives x = Cᵀ Y through leaf forcing, K C = Id. Reversed controls
    g = −C A^(I+1) d then make every vertex exactly 0 (Theorem 35.3). With the saved old terminal values, the target
    f = x on old vertices, 0 on fresh ones, is reached instead (Theorem 58.2).
  - The run uses 2L − 1 P, c S, no Reset, L + R_mark + b(I + 1) Reads, 2L + c + b(I + 1) Adds and 2I + 1 Ticks
    (Theorem 36.2).
- **One packed Read (§39–§41, §43).**
  - Start from whole zero with the full menu. Chains of splits give each original label a distinct distance from a
    known appended anchor: 3 for cone 0 and D₀ + i + 4 for cone i (Lemma 39.3).
  - Inputs B^(H(j−1)+D−r), with B = 4^D, are added in D + 1 batches with one Tick between batches. Walk counts are at
    most 3^D < 4^D, so the single reply is a carry-free base-B word. The first positive digit in each block is a
    distance, and it names the cone (Theorem 40.2).
  - No exact reporter can finish with zero successful Reads, whatever growth and field calls it uses
    (Theorem 41.1). So one Read is the exact minimum (Corollary 41.2).
  - For t = ⟨β, ⟨β, α⟩⟩: D₀ = 5, k = (1, 5, 6), K = 12, D = 11, N = 32. The run uses 5 P, 12 S, 36 Adds, 11 Ticks,
    1 Read, 1 Reset and 13 Holds (Theorem 43.1).
- **Breaking the mirror (§45–§52).**
  - On T_k, signed amplitudes a_i(e_z − e_z′) on k twin cherries have zero root moments at every time
    (Lemma 46.1). One split inside each cherry makes the k root Reads at epochs i + 4 triangular, with diagonal 2
    (Theorem 46.3).
  - Every exact recovery needs at least k root Reads (Theorem 49.1) and at least k acquisition splits
    (Theorem 49.2). One run attains both (Corollary 49.3). For k = 3 the whole run uses P 7, S 9, Add 6, Tick 7,
    Read 3 and Hold 1 (Proposition 50.1).
  - On ⟨β, ⟨β, β⟩⟩ the field δ = e_RL − e_RR gives nine passive zeros at the first terminal. After S_RL and six
    Ticks the same terminal reads 1, and the field on (ε, L, LL, R, RL, RLL, RLLL, RLR, RR, RRL) is
    (8, 0, 1, 0, 22, 0, 9, 0, 7, 0). The zero-field comparison run reads 0 (Theorem 52.2).
- **Digits need branches (§55–§56, §67).**
  - Feed digits by Next(d) = Tick, Add(e, d), Hold, Read(e), so x_w = F_w(A)e with F_w monic. The binary map is
    injective exactly when the term is a branch. Four material vertices is the minimum. On α the empty word and 1
    collide; on β the empty word and 00 collide (Theorem 55.2).
  - Two late Reads, Y₁ = eᵀA x_w and Y₂ = eᵀA² x_w, decode the word by superincreasing greedy subtraction. A late
    observer with one Read cannot decode (Theorem 56.3).
  - The ternary map is injective exactly when N ≥ 5. On the four-vertex path, 1000001 and 0020200 give
    F = z⁷ + z⁶ + 1 and G = z⁷ + 2z⁴ + 2z², with F − G = (z² + 1)(z⁴ − 3z² + 1) and F(A)e = G(A)e. On the
    five-vertex path, reading the opposite terminal gives weights (3^(j+1) − 1)/2 = 1, 4, 13, 40 (Theorem 67.2).
- **Rank survives growth (§60–§62).**
  - Native edits keep the old block, EᵀBE = A, and symmetry makes BE injective on im A (Lemma 60.1). So after any
    Tick the entry-to-current map has rank at least rank A₀ (Theorem 60.2). For a forest, rank A = 2ν, and
    ν(C(t)) ≥ L (Lemma 60.3).
  - Reporting, predicting or nulling an arbitrary unknown field therefore needs at least rank A₀ ≥ 2L successful
    Reads, even with adaptive growth (Theorem 61.2).
  - A geometry-only selector attains rank-many Reads at the advanced field A^(H+1)x (Theorem 62.1). On the
    seven-vertex tree that is 6 Reads and 2 Ticks.
- **Four Reads (§71–§76).**
  - On u = ⟨β, ⟨β, α⟩⟩ the characteristic polynomial is z·q(z²) with q(y) = y³ − 6y² + 9y − 3, and
    det[e, Ae, …, A⁶e] = −1. No nonzero polynomial with coefficients in [−3, 3] is divisible by q, so every finite
    quaternary history has its own whole field (Theorem 72.1).
  - Every fixed passive schedule with at most three Reads merges two histories of length 100(K + 4) (Theorems 73.1
    and 74.1). One coefficient parity is seen at most once, and with h = (27, 52, 75, 96, 66, 34, 49),
    Ah = 2h − 2·𝟙 ≤ (95/48)h bounds the reply.
  - Four Reads at LL and RR after 4 and 5 Ticks (Theorem 75.2), or after 3 and 4 Ticks (Corollary 76.2), recover
    every word and the true endpoint service. The minimum is four (Corollary 75.3).
- **Hidden law (§77–§78).**
  - WLAB-ord hides the law T: positive weights on the actual edges and an arbitrary diagonal. One free scan and one
    pulse per terminal, with R = 3b − 1 and H = 2R − 1, earn u, T, x₀ and the endpoint. The cost is (b + 1)(2R − 1)
    Ticks, b Adds, 2Rb(b + 1) Reads and 2R(b + 1) Holds; for b = 3 that is 60, 3, 192 and 64 (Theorem 77.4).
  - U5: with the values Mx already acquired, ending at F x with F = (4I + A)/8 needs at least N − rank M fresh Reads
    (Theorem 78.3). A Krylov sample-and-control schedule attains it (Theorem 78.4). Its key step is Lemma 78.2:
    F − A^k is invertible for every k ≥ 0.
- **Protect the entry (§80–§85).**
  - At the U4 endpoint z = T^m x + r_T, the directions in ker T are already gone. With d = dim ker T ≤ b − 1, adding
    W⁻¹Vᵀx at d chosen terminals gives an invertible F = T^m + B_Z W⁻¹ Vᵀ. No fixed affine template with fewer than
    d Adds works (Theorem 81.1). One packed integer Add also works on a different image (Proposition 81.2).
  - A guard-only pass first gives every old terminal a fresh neighbour before any numerical call. Then
    ker(B^h E) = ker T ∩ ker K_newᵀ = 0 for every h (Theorem 83.2), and every counted passive phase keeps the entry
    (Theorem 84.1).

第二部把第一部的有序叶子换成任意乱序的原始标签，再逐步隐藏整个场和演化规律。新单元初始化为零，所以一次标记就能找出被移动的标签。批量掩码和年龄调度减少读取次数。没有 Reset 时，终端窗口与反向控制可以把任意未知场精确清零或复原。从全零出发，一次打包读取即可得到整个乱序绑定，零次读取则不可能。镜像对称会隐藏樱桃振幅，必须用 k 次读取和 k 次分裂打破。二进制需要分支，三进制需要五个顶点。秩在生长中保留下来，因此恢复任意场至少需要 2L 次读取。七顶点树上四次读取正好够用，三次不够。隐藏的正权规律可以用脉冲取得；已知整数规律的多项式变换恰好需要 N − rank M 次新读取，其关键引理已在 Lean 中冻结。最后，补加法或先行守卫生长可以保护入口信息。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-130-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean and digestion status.** At the subject commit the volume has 201 digestion atoms: 1 absorbed-closed and
  200 residual-open.
  - The absorbed-closed atom is Lemma 78.2. Its coverage edge points to
    `D5/S3/Arith/Lattices/ContractingIntegralSeparation.polynomial_sub_pow_isUnit`, and the frozen state file
    `Golden/Frozen/state/D5/S3/Arith/Lattices/ContractingIntegralSeparation.lean.json` exists at the subject commit.
  - The frozen theorem is more general than the lemma. For an integer matrix A and a rational polynomial f with f(A)
    invertible and real operator norm below 1, f(A) − A^k is invertible. It carries the `lean` badge only on the
    sentence of the law scene that states this step, and in the finale.
  - The lower bound and attainment of Theorems 78.3–78.4, and everything else, are badged as theory.
  - The volume also cites other frozen declarations as suppliers: `NativeMaterialRootRecognition`,
    `FiniteObservabilityEquivalence`, `FiniteTimeTomographySaturation`, `NativeFullSourceProducer` and
    `NativeUniformTree`. The film does not state or badge them.
- **Published results cited in the volume.**
  - Kronecker packing: Harvey, arXiv:0712.4046, §3.1.
  - The infection (zero-forcing) mechanism: Burgarth and Maruyama, arXiv:0903.0612, §II; Burgarth et al.,
    arXiv:1111.1475.
  - Bounded-digit zero recognition: Akiyama, Thuswaldner and Zaïmi, arXiv:1403.7480, Theorem 3.
  - Separating systems: Katona, *J. Combin. Theory* 1 (1966) 174–194, doi:10.1016/S0021-9800(66)80024-8.
  - Path spectra and Perron comparison: Brouwer and Haemers, *Spectra of Graphs*, §1.4.4 and Theorem 2.2.1.
  - Superincreasing decoding: Hellman, *An Overview of Public Key Cryptography*, §III.
  - Walk counts: mathlib `SimpleGraph.adjMatrix_pow_apply_eq_card_walk`.
- **Classical tools.** Cayley–Hamilton, Cauchy–Schwarz, rank–nullity, rational Gaussian elimination, Gram left
  inverses, Bernoulli's inequality and the pigeonhole principle.
- **Project inputs from other volumes, not recomputed here.**
  - The birth-typed source, its causal reconstruction and the all-P normalisation (Atomic Generation Acquisition
    and its continuation).
  - The leaf metric, the subdivision inverse and ordered-root rigidity (part one, NLBA §§2–3 and 11).
- **Theory volume, argued but not kernel-checked.** Everything else in the film is badged as theory.
- **Recomputed for this film.** An independent Python script uses exact rationals throughout (fractions and sympy).
  It makes 196 773 checks and ends with ALL CHECKS PASSED. These are sampled and finite checks, not proofs of the
  general statements.
  - **Marking.**
    - The §21.5 run reproduces the scans, the permutation (2, 4, 3, 5, 1), all seven operation counts, the 46 and
      45 bits, the sizes N₀ = 7 and N_f = 12, and the final zero field.
    - On 60 random trees with L = 3–7 and random labellings, the traversal returns (t, λ₀) and ρ(t). It meets the
      Read, Add, Hold, P and S formulas of Theorem 21.2 and the sizes 2L + c − 1 and 3L + 2c − 1.
  - **Batch and age.**
    - K_min(q, L) equals a brute-force minimum for every q ≤ 4 and L ≤ 2^q; K_min(3, 8) = 12.
    - On 40 random runs the lightest-word tables decode every labelling with Lq Reads, L + K Adds and q + 2 Holds.
      Duplicated columns give identical readings for two swapped labellings.
    - On 30 random age runs, label i reads L − i (the last reads L), with L² Adds, L Reads and 5L − 3 vertices.
    - L⌈log₂ L⌉ < L² for every L from 3 to 1999.
  - **No Reset.**
    - K C = Id holds on 15 random trees.
    - On 8 random entries with random rational fields, the marked field equals x on old internal cells and 1
      elsewhere. Nulling ends exactly at 0, restoring ends exactly at f, and the counts match Theorem 36.2.
    - On the drawn instance, the largest |field| per control round is 178, 331, 739, 41 956, 41 609, 78 205,
      38 803, 14 445 and then 0.
  - **One Read.**
    - For ⟨β, ⟨β, α⟩⟩, all six labellings give six distinct integer replies. They have 226–235 decimal digits
      (749–778 bits) and decode exactly.
    - The distances are 3, 10 and 11, and the counts match Theorem 43.1. y < 2^(2DM) holds. Ten further random trees
      also decode.
  - **Mirror.**
    - For k = 1–6, T_k has 6k + 2 vertices and the root moments of each w_i vanish.
    - After one split per cherry there are 8k + 2 vertices and 3k + 1 terminals. M is lower triangular with
      diagonal 2; for k = 4 its off-diagonal entries are 15 and 19.
    - The witness gives nine zeros and then 1, against 0 for the zero field. Its final field is
      (8, 0, 1, 0, 22, 0, 9, 0, 7, 0), with 2 Adds, 15 Ticks, 10 Reads and 10 Holds.
  - **Digits.**
    - The α and β collisions hold.
    - On four branching trees, all binary words of length ≤ 9 have distinct fields and distinct (Y₁, Y₂).
    - The weights on ⟨β, α⟩ are 1, 2, 5, 13 and 34.
    - For every terminal and every Tick count 0–7, one late Read merges 00 with 01 or with 10.
    - On the four-vertex path F(A)e = G(A)e and the characteristic polynomial is z⁴ − 3z² + 1.
    - On the five-vertex path s_n = (3^(n−1) − 1)/2, the weights are 1, 4, 13 and 40, and all ternary words of
      length ≤ 7 give distinct pairs. The words 100 and 002 defeat the seed schedule.
  - **Rank.**
    - On 25 random trees, rank A = 2ν ≥ 2L.
    - On 12 random growth and Tick schedules, EᵀBE = A at every growth and the rank never falls below rank A₀. On
      the drawn schedules nothing is lost after the first Tick.
    - The drawn tree has N₀ = 13, L = 5 and rank 12. The nilpotent [[0, 1], [0, 0]] loses its rank.
    - On the seven-vertex tree, rank A = 6. The geometry-only selector picks six rows at Tick levels 0 and 1, and
      installs A²x exactly.
  - **Four Reads.**
    - Checked: the matrix (71.1), det(zI − A) = z·q(z²), the Krylov determinant −1, the root intervals with their
      endpoint values, and the irreducibility of q.
    - No polynomial with coefficients in [−3, 3] and degree ≤ 5 is divisible by q (exhaustive), nor are 20 000
      random ones of degree 6–30.
    - Ah = 2h − 2·𝟙 ≤ (95/48)h and (96/95)^100 ≥ 39/19 > 2.
    - The L₂ and L₃ matrices have kernels (30, −27, 5) and (63, −55, 10). q(B)e = (−1, 0, 1, 0, 0, 0, −1) and
      Bq(B) = 0.
    - Both four-Read schedules are injective on all 21 845 quaternary words of length ≤ 7.
  - **Hidden law.**
    - On the seven-vertex tree with random positive rational weights, a random diagonal and a random x₀: R = 8,
      H = 15 and 60 Ticks. The fitted recurrences continue the free and pulse sequences, the subtracted pulse
      columns equal CT^k e_j, and their first nonzero index is the tree distance. The counts are 60, 3, 192 and 64.
    - The infection step that rebuilds T and x₀ was not re-implemented.
    - Aη = 0 for η = e_ε − e_LL − e_RR, whose terminal values are (−1, 0, −1).
  - **U5.**
    - F − A^k is invertible for k = 0–24 on four trees.
    - On the seven-vertex tree with M = terminal values, 4 fresh Krylov rows and 7 control columns (H = L = 2) end
      exactly at F x.
  - **Protection.**
    - On the seven-vertex unit law, dim ker A = 1 and its restriction to any two terminals is injective.
    - On 12 random weighted laws, d ≤ b − 1, a valid Z exists among b − 1 terminals, and the completed F is
      invertible.
    - On 10 random laws, ρ(t) has M = 3b + 2c − 1 vertices and s = b + c terminals, compression holds, and B^h E
      has full column rank for h = 0–4.
    - On the seven-vertex tree, rank A^h = 6 against rank B^h E = 7 for h = 1–6. The protective acquisition vector
      is (720, 5, 138, 144).
- **Data drawn on screen.**
  - The scan cells and the permutation row.
  - The mask table, the Read curves L², L⌈log₂ L⌉ and L, and the age bars.
  - The control-round bars and the restored field.
  - The digit blocks of the packed reply.
  - The matrix M for k = 4 and the witness field.
  - The weight bars 1, 2, 5, 13, 34 and 1, 4, 13, 40.
  - The rank trajectories, the roots of q, the eigenvalues of A with (4 + λ)/8 and λ^k, and the protection rank bars.
  - The tree drawings use the actual terms and addresses. Only their layout is illustrative.
- **Illustrative visuals.** These are illustrations, not data: the question-mark and w edge labels, the pulse
  timeline, the schedule boxes and the open, title and finale cards.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
