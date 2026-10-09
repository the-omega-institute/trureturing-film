# 046 · AURIC FIB ATOM PYRAMID XVII · 金字塔 XVII：预报的方向

A film of about 6 minutes, the seventeenth part on the FIB atom pyramid. Its subjects are two companion volumes in
trureturing at subject commit `62276680d6`:

- `AURIC_FIB_ATOM_ACQUIRED_ALPHA_CALIBRATION_COMPATIBILITY.md`
- `AURIC_FIB_ATOM_DIRECTIONAL_ALPHA_CALIBRATION.md`

One hidden depth K drives a stream of paid reads. After an α, the true chance of another α always rises. A finite
predictor that is nearly optimal at both phases must still change its α forecast on actual α updates, and some of
that change must point down.

- **Source.**
  - K is drawn once and never reset.
  - Each read is α with chance r_k = F(k+1)/F(k+3): 1/3, 2/5, then always in [3/8, 5/13].
  - At the payload, α completes marker 0 and β suspends. From suspension, α returns and β completes marker 1.
- **Stopped word law.**
  - The p-phase word (βα)ʲα has mass r·aʲ, and (βα)ʲββ has mass (1 − r)²·aʲ, where a = r(1 − r).
  - Never completing has mass zero.
- **Endpoint boxes.**
  - Depths 1 and 2 are a total variation d_p = 1116529/11390625 ≈ 0.0980 apart at the payload and
    d_β = 239/3375 ≈ 0.0708 apart at suspension.
  - No forecast is within less than half of each distance of both endpoints.
  - The word (βα)³ββ has mass r³(1 − r)⁵, which is above both endpoints by at least
    η = 14219478376/318644812890625 ≈ 4.46 × 10⁻⁵ for every interior depth.
- **Two acquired flows.**
  - Private labels move by B on actual β and by A on actual α, with πB = τ and τA = π.
  - Each forecast is the complete law of the predictor's own generator.
- **Calibration energy.** The paired score satisfies D* ≥ E[Z(1 − Z)]/16 + h·E_C. The source polynomial factors exactly
  with a quartic that stays above 17,642,113.
- **α must change.**
  - 240e(M) + 30𝒜(M) > κ = η²/64.
  - Near both minima, 𝒜 > κ/30. When 𝒜 = 0 the excess is at least κ/240.
- **Separate demands.**
  - A persistent label has 𝒜 = 1/15 and no return motion.
  - A β-swap has 𝒜 = 0 and return motion 1/15.
- **The truth rises.** m_hα − m_h = Var_ν(r)/m_h > 0.
- **Some change points down.**
  - Increases cost c·J₋ with c ≈ 1.88, and only decreases J₊ can pay the score back.
  - 240e(M) + 30𝒟(M) > κ, where 𝒟 counts only decreases.
  - A two-label predictor with J₊ = 0 and J₋ = 1/30 is already excluded.
- **Open.** Whether the necessary decreases can coexist with every endpoint box and interior loss in one exact finite
  generator is open. No optimizer, vanishing family or positive gap is claimed.

一部约六分钟的片子：读到一个 alpha 之后，真实的下一个 alpha 概率总在上升；可一个同时接近两个最小风险的有限预测器，却必须在实际的 alpha 更新上改变预报，而且其中一部分必须向下。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-046-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Observer/ProbabilisticClosure/TrajectoryLaws/FourthSegmentStoppedLaw` has a state file at the subject
    commit.
  - `actual_fourth_segment_stopped_word_law` states that the first-completion read word under an iid Bernoulli read
    stream has exactly the explicit atomic law: r·aʲ and (1 − r)²·aʲ at p, and (1 − r), r²·aʲ, r(1 − r)²·aʲ at
    suspension.
  - `actual_noncompletion_mass_zero` states that infinite non-completion has mass zero.
  - The stopped-law scene is badged Lean while it states these.
- **Theory volumes, argued but not kernel-checked.** Badged as theory:
  - the endpoint distances and radii;
  - the interior excess η;
  - the two-flow observer model;
  - the calibration energy inequality;
  - both obstruction theorems and their constants;
  - the separation examples;
  - the posterior-increase identity;
  - the directional cost.
- **Open.** The remaining common-model frontier is badged as an open question, as the volumes state it.
- **Recomputed for this film.** An independent Python script recomputes the following in exact rational arithmetic.
  - **Source and endpoint boxes.**
    - The rates.
    - The normalization of the complete laws.
    - The endpoint event probabilities and the identity d = TV.
    - The word-ratio signs.
  - **Constants.**
    - η and κ.
    - h, K, c, k, A₀, A₊ and B₀².
    - The coefficients 63706776750/266850431 and 33253004250/266850431, both below 240.
  - **Inequalities and examples.**
    - The exact factorization of the source sign and the quartic minimum.
    - The posterior increase on 200 random priors and histories.
    - The examples: 1/15 for both the persistent label and the swap, and J₊ = 0, J₋ = 1/30 for the excluded
      predictor.
    - Lemma 5.1 and the paired energy inequality on 400 random stationary tables.
- **Illustrative visuals.** These are illustrations, not data:
  - the letter stream;
  - the label diagrams;
  - the arrows;
  - the excluded-region plots.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
