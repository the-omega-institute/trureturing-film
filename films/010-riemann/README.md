# 010 · CRITICAL LINE · 临界线

A 5 min 7 s film on trureturing's **Riemann Hypothesis** work: what the proof machine has built
around the conjecture, and exactly where it stops. **The project does not prove RH**, and there is
no unconditional `RiemannHypothesis` theorem in the library. Sources: the RH passages of
`PZG_BEDC.md` (账目 26.4, the two hearts O-5 / O-6 and 评注 on 两心同脸),
`GOLDEN_OBSERVER_RH_ROUTE.md`, `GOLDEN_OBSERVER_LAYER_PRIME_BRIDGE.md`,
`RH_OFFLINE_ZERO_LEE_YANG_INSTANTANEOUS_PHASE_TRANSITION_THEORY.md`, `D-ZCOCT.md`,
`OBSERVER_ADELIC_COMPLETION_CONSTANT_THEORY.md`, `D5/X_Frontier/Hearts.lean`, and the frozen
Lean theorems under `D5/S3/{Weil,Zeros,Analytic,Arith}`.

一部 5 分 7 秒的黎曼猜想专题：证明机器围绕它建了什么，又精确地停在哪里。项目没有证明黎曼猜想。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-010-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## What the film does not claim · 不主张

- RH is **not proved**. The two hearts are open: `theorem o5_independence` still ends in `sorry`,
  and `o6WeilPositivityStatement` is only stated (`D5/X_Frontier/Hearts.lean` l.66, l.101).
- The criteria (Weil, Li, Robin, Cayley form) are **classical mathematics**; what is new here is
  their kernel formalization. Robin's theorem (RH ⟺ σ(n) < e^γ n log log n for n > 5040) itself is
  **not** formalized; the film badges it "classical theorem · not formalized here".
- The volumes say so themselves: "本文不证明黎曼猜想，也不假定离线零点存在" (Lee–Yang l.7);
  the golden route "不构成 RH 的证明路径" (GOLDEN_OBSERVER_RH_ROUTE l.2100, l.2154);
  "通道已知,正性未知" (PZG l.2311); "两颗心脏本是一堵墙的两面" (PZG l.1561).

## Contents and evidence status · 章节与证据状态

Badges: **LEAN KERNEL · VERIFIED · FROZEN**, **THEORY VOLUME · ARGUED, NOT KERNEL-CHECKED**,
**CLASSICAL THEOREM · NOT FORMALIZED HERE**, **OPEN · NOT PROVED · STATED ONLY**. Paths are in
trureturing at `460435f5d1`; every Lean theorem below was grep-verified and has a
`Golden/Frozen/state` pin.

| # | Scene | Claim | Status / source |
| --- | --- | --- | --- |
| 01 | Title | `D5/S3/Zeros` holds 114 `.lean` files; none states RH | count at `460435f5d1` |
| 02 | Unconditional | Exhaustive unique zero list; infinite; reflection-invariant; a zero near every large height; Weil explicit formula with no hypothesis | Lean: `Weil/ZeroData/UnconditionalCanonicalZeroData.lean` (`zetaZeroData_exhaustiveUnique`, `zetaZeroData_reflection`), `Weil/ZetaBridge/ZeroDataNonemptyIffInfinite.lean`, `Weil/ZeroInfinitude/WindowZero.lean`, `Weil/ZetaExplicit/Main.lean` (`EF_lit_zetaZeroConfig`) |
| 03 | No-go | A quartic with every symmetry of ζ has all zeros off the line; at s = −2 every local factor and finite product is nonzero, yet ζ(−2) = 0 | Lean: `Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.lean`, `Zeros/PrimeRefinement/LocalNonzeroContinuationZero.lean` |
| 04 | Two hearts | O-5 golden Euler germ and O-6 Weil positivity; owner note (Hearts.lean l.93) | open (`sorry` / stated only) |
| 05 | Weil | RH ⟺ prime-side positivity on convolution squares; any off-line zero gives a negative square | Lean: `Weil/Separator/WeilSquarePositivityCriterion.lean`, `Weil/Separator/ArchimedeanConvergence.lean`, `Weil/Separator/OffLineZeroNegativeWeilSquare.lean` |
| 06 | Li | λ₁ = 1 + γ/2 − log 2√π ≈ 0.0231 > 0; ∀n λₙ ≥ 0 ⇒ RH; toy zeros 0.3±5i, 0.7±5i give λ₃₁ < 0 (bars recomputed on screen; negatives magnified ×12) | Lean: `Zeros/Endpoints/FirstLiCoefficientPositivity.lean`, `Weil/Probability/CanonicalLiNonnegativeConverse.lean`, `Zeros/ToySpectrum/OffLineToySpectrum.lean` |
| 07 | Cayley | RH ⟺ \|1 − 1/ρ\| = 1 for every nontrivial zero (points on screen illustrative); RH = even ∧ one, the even half holds | Lean: `Zeros/ActualZeroGeometry.lean`, `Zeros/Symmetry/RiemannGlobalRelativeSplit.lean` |
| 08 | Robin | Robin's criterion (classical, not formalized); 7-smooth n > 5040 pass; liminf margin 0 | Lean: `Arith/Robin/SevenSmooth.lean`, `Weil/GronwallLowerEnvelope.lean`; plot computed from σ(n), n ≤ 12000 |
| 09 | First break | If RH fails there is a first off-line height with a mirror twin; Mahler measure jumps 0 → > 0; first-order ledger cancels | Lean: `Zeros/FirstOffLineHeight.lean`, `Zeros/FirstOffLineMahlerJump.lean`; cancellation: theory (Lee–Yang volume) |
| 10 | Golden route | φ² rescaling factorization; certified off-line zero of the p = 2 local factor within 10⁻⁸; p ≥ 5 factors do not vanish on the line; curvature-ledger bridge conjecture refuted | Lean: `Analytic/EulerGerm/GoldenGermSecondOrderFactorization.lean`, `Analytic/GermWindow/GermZeroCertificate.lean`, `Analytic/EulerGerm/LocalFactorCriticalLineNonvanishing.lean`, `Weil/CurvatureLedgerBridgeRefutation.lean` |
| 11 | Atlas | Herglotz, scattering on Re s = ¼, squared shadow, quantum chain as RH-equivalent pictures (theory); Dimitrov–Shapiro Q6.2 and Vishnyakova 6.5 refuted | theory; Lean: `Zeros/Jensen/WeakQlpDifferentiation.lean` (`question62_refuted`), `Zeros/PochhammerDeformation/QuadraticInterval.lean` |
| 12 | Missing bridge | Every route ends at primes → positivity; the two hearts are two faces of one wall; the door stays marked open | theory (PZG l.2311, l.1561) |

(Lean paths are relative to `D5/S3/`.)

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
