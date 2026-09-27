# 013 · HIDDEN ARROW · 奇偶隐藏时间箭头

A 4 min 44 s film on trureturing's **PARITY_HIDDEN_ARROW** family, six theory volumes in
`docs/develop/theory/`:
- `PARITY_HIDDEN_ARROW.md` (main, §1–19; §1–4 read in full);
- `_RECOVERY` (§20–26), `_FLUCTUATIONS` (§27–35), `_POSTERIOR_FIELD` (§36–44) and
  `_WINDOW_PHASES` (§45–53);
- `_SPECTRAL_BOUNDARY` (§54–88).

The system: d switches x ∈ {−1,+1}^d with parity χ(x) = ∏ x_j and Markov kernel
P(x,y) = (1 + a(x)χ(y)) / 2^d. Every proper subset of switches is pure white noise, yet the whole
chain has a time arrow; the volumes study where that arrow lives and how long one must watch to
see it.

一部 4 分 44 秒的"奇偶隐藏时间箭头"专题：每个局部都是白噪声，整体却有时间方向——"边缘白噪声不等于联合过程可逆"。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-013-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## What the film does not claim · 不主张

- The main volume states (l.297) that its proofs are ordinary analysis and linear algebra,
  "尚未由 Lean kernel 验证", and that σ is a path relative-entropy rate, **not** physical heat.
- Its literature table (l.285–295) marks the core results `suspected-novel`, a working flag and
  not a proof of originality. Several later curves are explicitly known results; for example, the
  vanishing-amplitude detection boundary (16.4) is attributed to Mukherjee–Pillai–Lin.
- Only the six `D5/S3/Estimation/TimeArrow/*` modules below are kernel-checked. Everything else
  in the film is a paper proof and is badged THEORY VOLUME.

## Contents and evidence status · 章节与证据状态

Line numbers refer to the named volume (main volume unless stated). Paths are in trureturing at
`a7731f1ea5`. Every Lean theorem below was grep-verified and has a `Golden/Frozen/state` pin.

| # | Scene | Claim | Status / source |
| --- | --- | --- | --- |
| 01 | Title | "“边缘白噪声”不等于“联合过程可逆”" | theory (l.297) |
| 02 | Parity kernel | Every proper coordinate subset is i.i.d. uniform; with m=0, P² = Π | Lean: `ParityKernelSubcoordinates.lean` (`subcoordinateLaw_eq`); P² = Π theory (Thm 2.1(i)) |
| 03 | Critical c_d | Σ_d(c) < ∞ ⟺ c < c_d; at I = c_d, σ → ∞. The film shows d = 3: c₃ = 0.10788, σ = 0.26 / 0.38 / 0.52 / 0.66 at r = 0.9 … 0.9999, recomputed for the film | theory (Thm 2.1, 3.2) |
| 04 | Invisible | Single peak: error → ½e^(−λ/2), λ = T/n; 5% needs T ≈ 4.6n; σ per step → ∞ does not help when T ≪ n | theory (Thm 6.3, (6.7)–(6.9), l.483–520) |
| 05 | Net current | log(forward/reverse) = 𝒜·J + endpoint terms; E[wait for rare edge] = 2n − 1 − r, with exact generating function | Lean: `SinglePeakPathCurrent.lean` (`log_forward_div_reverse_eq_current`), `SinglePeakRareEdgeWaitingMean.lean` (`survival_waiting_mean`), `SinglePeakRareEdgeSurvival.lean` (`survival_recurrence`) |
| 06 | Snapshots | Independent pairs beat a continuous trajectory for every τ > 0; at τ = 2, 10.6% vs 18.4% (recomputed) | theory (Thm 9.2, l.916–970) |
| 07 | Orthogonal | Same-direction inner products (1 + E[ab])^s; forward × backward = 1; P_b P_c = Π | Lean: `ParityPathLikelihoodProducts.lean` (`forward_inner_product`, `backward_inner_product`, `forward_backward_inner_product`); theory Thm 10.2 |
| 08 | Log price | Unknown peak: sharp threshold s·F_M(r) = log M; critical window direction risk Φ(−t)/2, recovery Φ(t) | theory (Thm 11.3, 13.3) |
| 09 | Three thresholds | 0 < α_D < α_A = β/φ(r) < 1/φ(r) < α_E: direction learnable while support unrecoverable | theory (Thm 18.3, (18.28), l.4271–4316) |
| 10 | Golden phase | r = 1/φ, β = 3/4: exact recovery risk does not converge along d → ∞ (the plotted risk curve is schematic) | theory (RECOVERY Thm 20.4, l.331–361) |
| 11 | Window phases | Single Gaussian jump → finite staircase → Brownian path; boundary layer of width Q^(−1/4); "外部仿射律可逼近端点，但不能包含端点" | theory (POSTERIOR_FIELD Thm 38.2; WINDOW_PHASES Thm 46.2, 47.2; SPECTRAL_BOUNDARY Thm 54.2, l.37) |
| 12 | Relation | The arrow lives in the relation among all parts; a large arrow is not a visible one | theory |

Also frozen and in the same folder: `SinglePeakLogLikelihoodCovariance.lean`
(`exact_single_peak_log_likelihood_covariances`). All six modules are under
`D5/S3/Estimation/TimeArrow/`.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
