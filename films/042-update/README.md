# 042 · AURIC FIB ATOM PYRAMID XIII · 金字塔 XIII：观察更新如何暴露隐藏关系

A film of about 6 minutes, the thirteenth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_ATOM_OBSERVATION_UPDATE_AND_RETURN_PREDICTION.md` in trureturing at subject commit `aa5d1b3679`.

An observer reads one position, updates, and comes back. The film follows what each reading reveals and what must
be kept:

- **A summary, not a source.**
  - The pyramid means X, Y, Z leave κ = E[xy] free on max(0, X + Y + Z − 1) ≤ κ ≤ min(X, Y).
  - The film's example point is (2/5, 2/5, 1/5).
- **Conditional slices.**
  - Reading x gives (X₁, Y₁, Z₁) = (1, κ/X, 0) with probability X, and (0, (Y − κ)/(1 − X), Z/(1 − X)) with
    probability 1 − X.
  - μ_A = ½∅ + ½ joint and μ_B = ½ low + ½ high share (X, Y, Z) = (½, ½, 0) and the same odds.
  - After x = 1 they become joint and low; after x = 0, ∅ and high.
- **What survives an update.**
  - From the means on a function space V containing 1, every posterior V-mean is recoverable exactly when
    f ℓ_o ∈ V for all f ∈ V.
  - Reading z keeps span{1, x, y, z} closed.
  - Reading x and predicting y needs xy, and span{1, x, y, z, xy} is already every function on the five patterns.
- **The four-corner tilt.**
  - Δ = p∅p₁₃ − p₁p₃ stays 0 after a reading exactly when ℓ∅ℓ₁₃ = ℓ₁ℓ₃.
  - From the uniform law, the likelihood ℓ = (1 + x + y)/3 has acceptance 3/5 and posterior (1, 2, 1, 2, 3)/9, so
    Δ = −1/81.
- **Splitting the spread.**
  - C = Σ q_o C_o + Σ q_o (m_o − m)(m_o − m)ᵀ.
  - For reading x the between-outcome part is c_x c_xᵀ / (X(1 − X)), with c_x = (X(1 − X), κ − XY, −XZ). It has rank
    one.
- **Control versus knowledge.** ν^w = ν exactly when the history likelihood is constant on the support.
- **A shared depth.**
  - r_k = F(k + 1)/F(k + 3) gives 1/3, 2/5, 3/8, 5/13, … → 1/φ².
  - Every letter actually read enters the posterior over depth.
- **Each return teaches.**
  - A return word βα has likelihood r(1 − r). The prediction rises by Cov(r, r(1 − r))/E[r(1 − r)], between
    Var/(5E) and Var/(3E).
  - With depths one and two at even odds the weight ratio grows by 27/25 per return.
  - m₀ = 11/30 and m₁ − m₀ = 1/780, climbing toward 2/5.
- **The predictor must move.**
  - V_h ≥ TV(T_h, T_hw) − e(h) − e(hw).
  - TV(T_h, T_hw) ≥ m_hw − m_h.
- **No finite exact observer.** The predictions along h₀(βα)ⁿ are all different, so exact prediction after every
  history needs unboundedly many configurations. This bound concerns exact prediction only.
- **Backward closure.**
  - A summary is sufficient for kernel updates exactly when K_oᵀV ⊆ V.
  - Five patterns close in five dimensions, while a shared depth with unbounded histories does not close in any finite
    one.
- **The same discipline for a qubit.**
  - ρ± = (I ± Y)/2 have identical X and Z readings.
  - U = e^{−iπZ/4} sends Y to −X and separates them.

一部约六分钟的片子：读取低端位置后的后验需要联合参数 κ；保留的函数空间要对读口似然闭合；控制回到同一节点不等于知识回到原处——共享深度下每次返回都让预测严格上升，有限配置无法逐历史精确跟踪。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-042-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **No Lean badge.** No frozen Lean declaration was found that states these results for this model:
  - the five-pattern conditional slices;
  - the closure criteria;
  - the shared-depth return predictions.
  The film uses theory badges only.
- **Theory volume, argued but not kernel-checked.** The volume marks every theorem `Claim status: open`. Badged as
  theory:
  - the κ fiber and the slices;
  - the multiplicative and backward closure criteria;
  - the four-corner condition;
  - the covariance split, which is the classical law of total covariance applied to this readout;
  - the posterior-invariance criterion;
  - the return-word rise and its bounds;
  - the predictor triangle bound;
  - the finite-configuration impossibility;
  - the qubit example.
- **Recomputed for this film.** An independent Python/sympy script recomputes the following.
  - **The fiber and the slices.**
    - The fiber parametrisation and κ bounds on 200 laws.
    - Both slices on 200 laws.
    - The μ_A, μ_B posteriors.
  - **Closure.**
    - The closure of span{1, x, y, z} under z, the failure for xy, and the rank 5 of span{1, x, y, z, xy}.
    - A same-means pair with posterior high means 1/2 against 5/8.
  - **The four corners.**
    - The four-corner formula symbolically.
    - The uniform example: 3/5, (1, 2, 1, 2, 3)/9, −1/81.
    - The Θ shift.
  - **The covariance split.** The split and the rank-one between-outcome term on 50 laws.
  - **Returns.**
    - r_k for k ≤ 30, including the [3/8, 5/13] range for k ≥ 3.
    - The rise formula and both bounds on 100 random priors.
    - The two-depth example: 27/25, 11/30, 287/780, 1/780, strictly increasing.
  - **The qubit.** The readings and U Y U† = −X.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramids;
  - the outcome clouds in the covariance scene;
  - the four-parameter posterior bars;
  - the letter stream with its depth posterior;
  - the dimension-growth bars;
  - the oblique Bloch spheres.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters and digits whole when wrapping Chinese subtitles.
