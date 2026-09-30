# 027 · NO NESTING · 不嵌套的排列

A film of about 5½ minutes on a result frozen in trureturing's Lean library at subject commit `a715ac5e31`. The result
is the generating function of nonnesting permutations avoiding {1231, 1312, 2231, 3221}:

> C(x) · (1 − 3x) · (1 − x − x²) = 1 − 3x + 2x², i.e. C(x) = (1 − 3x + 2x²) / ((1 − 3x)(1 − x − x²)).

Sergi Elizalde and Amya Luo, *Pattern avoidance in nonnesting permutations*, arXiv:2412.00336v6, Table 4, stated this
as a conjecture checked for n ≤ 8. The Lean theorem is `D5/S3/Combinatorics/Nonnesting/NonnestingFour.result`, and
the proof spans 25 frozen modules (6,760 lines).

The film tells the proof through metaphors, in order:

- a bus that nobody overtakes (nonnesting = first-in first-out);
- arches (1221 and 2112 are nests);
- train cars uncoupled at value cuts, giving C = 1/(1 − D);
- the boarding order squeezed into blocks k, 1, 2, …, k − 1;
- the three families of primitive cars (2ⁿ⁻² + 2 of size n);
- a path that forks at every step (increasing tails double);
- the algebra: a growth rate of 3 and the Fibonacci polynomial;
- the import graph of the 25 modules.

一部约 5 分半的片子：先上车的先下车，四个被禁止的模式，一个对每个 n 成立的有理生成函数。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-027-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** All 25 `D5/S3/Combinatorics/Nonnesting/*` modules have state files under `Golden/Frozen/state/`
  at the subject commit. The dossier is `Problems/elizalde-luo-nonnesting-1231-1312-2231-3221.md`.
- **Recomputed for this film** by an independent Python brute force:
  - nonnesting totals 1, 1, 4, 30, 336, 5040, 95040 = Catalan(n)·n!;
  - avoiders 1, 1, 4, 11, 33, 98, 293 for n ≤ 6;
  - primitive (cut-free) avoiders 1, 3, 4, 6, 10, 18 = 2ⁿ⁻² + 2 for n = 1…6 (n = 1 gives 1);
  - the three families at n = 3, 4, 5, listed in full;
  - with n ≥ 3, a first letter equal to n is followed by n (checked n = 3…5; at n = 2, 2121 is the exception, and
    the narration says "three or more passengers");
  - 1/(1 − D) = C checked symbolically, and the series 1, 1, 4, 11, 33, 98, 293, 877, 2628, 7879, 23629, 70874.

  The values for n = 10 and 11 are quoted from the dossier's exhaustive search.
- **Illustrative visuals.** These are illustrations, not data:
  - the bus;
  - the binary tree;
  - the golden spiral.

  The sample words shown (121323…, 1133224545, 5512132434, 1213243545, 2132143545) were all checked to lie in the
  class. The module graph is read from the Lean `import` lines.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
