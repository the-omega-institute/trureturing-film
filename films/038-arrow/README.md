# 038 · AURIC FIB ATOM PYRAMID IX · 金字塔 IX：金字塔上的时间箭头

A film of about 7 minutes, the ninth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_HISTORY_RECORDS_TIME_ARROW.md` §§122–133 in trureturing at subject commit `0b2f4d2c85`.

The single-flip graph of the five patterns sits on the pyramid. The floor carries the square
∅ (000) – low (100) – joint (101) – high (001) – ∅, and middle (010) hangs from ∅ alone. On this graph the volume
declares a random walk:

- forward around the square with probability p;
- backward with probability q;
- along the branch either way with probability r.

The film follows the time arrow that walk carries:

- **Still moments.**
  - The transition matrix is doubly stochastic, so the uniform law stays uniform and H(Xₙ) = log 5 for every n.
  - The walk is a declared configuration model, not the native substitution ρ.
- **The arrow rate.**
  - The stationary path relative entropy is σ = (4/5)(p − q)·log(p/q), positive exactly when p ≠ q.
  - At p = 1/4 and q = r = 1/8, σ = log 2/10 ≈ 0.0693 per step.
  - It is a path relative entropy, not heat.
- **Winding count.**
  - log P(γ)/P(γ reversed) = W·log(p/q), where W is the forward minus backward square steps.
  - D(P_N ‖ P_N reversed) = N·σ.
- **Fluctuation symmetry.**
  - Pr(W = w) = (p/q)^w · Pr(W = −w), and E[(p/q)^(−W)] = 1.
  - Given W, the path law is the same in both directions.
  - At N = 12, the exact law gives ratios 2, 4, 8 for w = 1, 2, 3, and E[W] = 6/5.
- **Merged types.**
  - Merging middle and joint is not Markov.
  - Pr(∅ next | low, B) = 0, while Pr(∅ next | ∅, B) = r. The two conditioning events have probabilities 1/20 and
    1/40.
- **Loop phase.**
  - The edge rotations are −iX, iZ, their inverses, and −iY on the branch.
  - The square loop gives −I in both directions, while the loop probabilities are p⁴/5 = 1/1280 and
    q⁴/5 = 1/20480.
- **Coherent walk.**
  - S⁴ = −I makes W_p = √p S + √q S† unitary. With S⁴ = +I it is not.
  - The two-step return probability is 4pq coherently and 2pq when each step is measured, which is 1 against 1/2 at
    p = 1/2.
- **Orthogonal records.**
  - A common isometry needs the cross-input condition (126.1).
  - Low and middle meet only at ∅, and so do high and middle, so their records there must be orthogonal.
  - Identical records leave a defect ≥ √(qr) = 1/8.
- **One instrument.**
  - The channel has 15 positive edges, each with Kraus operator √P_ij |j⟩⟨i| ⊗ U_ji.
  - It is CPTP and unital, and its Choi rank is 15, so a pure environment needs at least 15 dimensions for this
    channel.
- **Signs and turns.**
  - U_h = (−1)^k G_end G_start†. On closed loops W = 4k and U = (−1)^k I.
  - The phase sees the parity of k, while the probability sees (p/q)^(4k).
- **Protected qubit.**
  - The moving block Ā = Σ|i⟩⟨i| ⊗ G_i A G_i† is fixed by the channel, and X̄Ȳ = iZ̄.
  - In the moving frame the channel is a Markov step on positions ⊗ id.
- **Still state, strict arrow.**
  - I₁₀/10 is fixed with von Neumann entropy log 10, while Σ_N = N·σ.
  - This is a comparison of path laws, not thermodynamic entropy production.

一部约七分钟的片子：金字塔上的翻转图配一个双随机游走——每一刻都均匀、熵恒为 log 5，路径却有严格的时间箭头；绕行数承载全部方向信息，闭路相位不分正反，记录在路径汇合处必须正交。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-038-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **No Lean badge.** No frozen Lean declaration was found that states these results for the five-pattern
  configuration walk:
  - The `D5/S3/Estimation/TimeArrow/*` modules are frozen, but they concern the parity-kernel model of film 013.
  - No module covers the five-pattern edge instrument, its Choi rank or the loop phases.
  - The film therefore uses theory and classical badges only.
- **Theory volume, argued but not kernel-checked.** The volume is an ordinary-mathematics reference input. Every
  result above is badged as theory:
  - the doubly stochastic walk;
  - σ, W and the fluctuation identity on this graph;
  - the four-type obstruction;
  - the loop phases;
  - the coherent walk;
  - the record conditions;
  - the edge instrument;
  - the endpoint factorisation;
  - the protected block;
  - §133.
- **Classical tools named in the volume.**
  - The stationary path relative-entropy principle, cited from `PARITY_HIDDEN_ARROW.md`.
  - The Lebowitz–Spohn fluctuation symmetry, as background. The finite path formula is proved by direct
    multiplication, not borrowed.
  - Kraus, Choi and Stinespring representations, including the Choi-rank and minimal-environment fact (Choi 1975;
    Watrous, Theory of Quantum Information, Ch. 2).
  - Szegedy quantized walks and operator quantum error correction (Kribs et al.) are cited as background only.
- **Recomputed for this film.** An independent Python/sympy script recomputes the following.
  - **The chain.**
    - The matrix is doubly stochastic, and σ = (4/5)(p − q)·log(p/q) holds symbolically.
    - log 2/10 at the example values.
  - **Paths.** Exhaustive enumeration for N ≤ 6 confirms:
    - the path log ratio W·log 2;
    - KL = N·σ;
    - the fluctuation relation;
    - E[2^(−W)] = 1.
  - **The W law at N = 12.** Computed exactly, including E[W] = 6/5.
  - **Types and loops.**
    - The four-type conditional probabilities.
    - The quaternion relations and loop products −I, in both directions and for the §124 assignment.
  - **The coherent walk.**
    - Unitarity of W_p for several p, W_p² = 2√(pq)I + (p − q)S², return 4pq coherent against 2pq measured.
    - Failure of unitarity with S⁴ = +I.
  - **Records and the instrument.**
    - Supports and unique common successors.
    - The identical-record defect block of norm 1/8.
    - The 15 Kraus operators: CPTP, unital, Choi rank 15.
  - **Signs and the protected block.**
    - U_ji = (−1)^ν G_j G_i† on all 15 edges, and U_h = (−1)^k G_end G_start† on 500 random paths.
    - The moving block fixed, the Pauli relations, and D K D† = ±√P |j⟩⟨i| ⊗ I.
    - I/10 fixed.
- **Illustrative visuals.** These are illustrations, not data:
  - the walker and its trail, from a deterministic pseudo-random run of the declared chain;
  - the sample path γ;
  - the travelling qubit;
  - the record-space arrows, whose angle between e(low→∅) and e(high→∅) is arbitrary;
  - the gauge timelines.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters and digits whole when wrapping Chinese subtitles.
