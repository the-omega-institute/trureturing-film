# 011 · FIXED FRAME · 黄金不动坐标

A 5 min 19 s film on **GICT**, the Golden Invariant Coordinate Theory
(`docs/develop/theory/GICT.md`, v3.x, 1411 lines, read in full). Its one-line programme (l.9–11):
from the single equation x² = x + 1, walk six domains (combinatorics, arithmetic, geometry,
spectrum, analysis, phase) and mark honestly the two points the walk encircles but cannot reach.
Its central claim is Theorem 7.3: **a good coordinate system is the fixed frame of a
transformation** (l.309).

一部 5 分 19 秒的黄金不动坐标理论（GICT）专题：从 x² = x + 1 出发走遍六个疆域，诚实标出到不了的两个点；核心主张是"好坐标系是变换下的不动标架"。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-011-<version>`)
by `.github/workflows/release-film.yml`; nothing rendered is committed.

## What the film does not claim · 不主张

Appendix C (l.520), quoted on screen: the theory does not prove the Riemann Hypothesis, does not
claim the universe runs on φ, does not endorse golden-ratio mysticism; in physics φ is
"selected" (fixed/critical points), not "written in". Most of GICT is a theory volume with
numerical certificates, **not** Lean-checked; the film badges each scene accordingly. Where a Lean
module defines a GICT constant by its closed form (e.g. `D5/S3/Constants/COneExactValue.lean`),
only the algebra is kernel-checked, not the analytic series identity, so the constants scene is
badged as theory.

## Contents and evidence status · 章节与证据状态

Badges: **LEAN KERNEL · VERIFIED · FROZEN**, **THEORY VOLUME · ARGUED / CERTIFIED, NOT
KERNEL-CHECKED**, **CLASSICAL THEOREM · KNOWN MATHEMATICS**, **WALL · WHAT THE THEORY DOES NOT
CLAIM**. Line numbers refer to `GICT.md` and paths to trureturing at `2e0848126f`; every Lean
theorem below was grep-verified and has a `Golden/Frozen/state` pin.

| # | Scene | Claim | Status / source |
| --- | --- | --- | --- |
| 01 | x² = x + 1 | Six domains, two unreached points | theory (l.9–11) |
| 02 | Three axes | Γ = (A, Z, G): scale ⌊log_φ⌋, Zeckendorf digits, phase {nφ} | theory (Def 1.4, l.29) |
| 03 | Three gaps | 13 points {nα}, n = 0…12: φ gives 2 gap lengths, √2, e, π give 3 (recomputed for the film) | classical three-distance theorem; certificate l.35 |
| 04 | Hardest number | φ = [1; 1, 1, …], Hurwitz bound; "最连续的数与最离散的尺是同一极值之两面" | classical; theory (Thm 1.6, l.38) |
| 05 | Surname 5 | p ≠ 5 stays prime in ℤ[φ] ⟺ p ≡ 2, 3 (mod 5); "五是长子非父本；φ 是冠军非国王" | Lean: `D5/S3/PrimeForms/GoldenPrimeClassification.lean` (`golden_prime_iff_mod_five_eq_two_or_three`); theory (Thm 2.1–2.4, l.53–65) |
| 06 | Decompression | Golden word has cubes but no 4th power; s_n = 1 ⟺ {nα} ∈ [1−α, 1) (certificate 100,000 letters); "维度是非局域信息的解压格式" | Lean: `D5/S1/Words/Powers/GoldenCriticalExponent.lean` (`golden_critical_exponent_isLeast`); theory (Thm 7.7, l.322) |
| 07 | Fixed frame | M = [[1,1],[1,0]] has eigenvalues φ, −1/φ; Theorem 7.3 | classical; theory (Thm 4.2 l.99, Thm 7.3 l.309) |
| 08 | Four fates | Over {0,1}, x = (ax+b)/(cx+d) has exactly four fates; only the φ-family is alive (discriminant 5) | theory, finite exhaustion + certificate (Thm 7.11, l.339) |
| 09 | Constants | C_φ = (57 − 25√5)/24 read by five instruments; W(φ) = −π/(6φ²) sits 3.06×10⁻⁶ from −1/5, logged as a trap | theory (Thm 5.3′, l.121; l.141; l.409) |
| 10 | Numerology wall | α⁻¹ in φ-powers to 1.3×10⁻¹¹, a random number 2.7×10⁻¹¹, √2-costume 2.1×10⁻¹¹; "字母表能给任何数穿衣,衣非证据" | theory (Appendix D.1, l.526); Appendix C (l.520) |
| 11 | Refuted | Avoidance conjecture: ~10⁴ classes with no counterexample, then m = 468 (γ = [[1981,−768],[276,−107]]); "近万类零反例 = 采样偏倚"; golden transformer fix gain ×1.00 | theory, computational certificate (E.19, l.598–606; Obs. 7.16, l.351) |
| 12 | Kernel | Any 14 speeds from {1..20}: a time with every runner ≥ 1/15 from start; every q ≤ 1024 has a/q with continued-fraction digits ≤ 5; odd 17×17 checkerboard no-three-in-line optimum 26 | Lean: `D5/S1/Phase/LonelyRunnerFourteenOfTwenty.lean`, `D5/S1/Depth/ContinuedFractions/ZarembaFiveFiniteFront.lean`, `D5/S3/Arith/Lattices/ThinCheckerboardNoThreeInLineSeventeen.lean` |
| 13 | Survey | "数学是从 μ 向不可达之 ν 攀登的无限阶梯…沟的宽度叫不完备性"; "这不是失败的记录,是测绘的进度" | theory (Thm 7.2, l.296; l.388) |

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
