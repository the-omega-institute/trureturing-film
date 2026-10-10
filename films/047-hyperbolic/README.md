# 047 · AURIC FIB ATOM PYRAMID XVIII · 金字塔 XVIII：双曲几何与相位边界

A film of about 5.5 minutes, the eighteenth part on the FIB atom pyramid. Its subject is
`AURIC_FIB_HYPERBOLIC_GEOMETRY_AND_PHASE_BOUNDARY.md` in trureturing at subject commit `1c1f224301`.

Can the Fibonacci step be cut into a smooth flow? It can, but only by paying a phase. The integers fix every step but
not the path between them, and a real flow needs a third dimension.

- **A complex curve.**
  - On one fixed logarithm branch, F(t) = (φᵗ − φ⁻ᵗ e^(−iπt))/√5 hits F_n at every integer, including the negative
    ones.
  - F(½) ≈ 0.569 + 0.352i.
  - F(−t) = −e^(iπt) F(t), not ±F(t).
- **Mirror and stretch.**
  - M = [[0,1],[1,1]] = S·e^(aS), where S = (2M − I)/√5 is a reflection with determinant −1, e^(aS) keeps area and
    a = log φ.
  - sinh a = ½ and cosh a = √5/2, the sides of a 1, 2, √5 right triangle.
- **No real half step.**
  - A real square root of M is impossible because det M = −1.
  - In ℂ², U(t) = [[F(t−1), F(t)], [F(t), F(t+1)]] is a one-parameter group with det U(t) = e^(−iπt), a complex
    Cassini identity.
- **The third dimension.** The real flow X = e^(at)X₀, (Y, Z) = e^(−at)·rotate(πt)(Y₀, Z₀) lands on Mⁿ at every
  integer. Three is the minimum dimension for a real linear flow of the whole plane.
- **The real shadow.**
  - A(t) = Re U(t) misses the group law by −e^(−a(s+t)) sin πs sin πt P₋.
  - A(½) kills v₋, but A(1)v₋ = ψv₋.
- **Many interpolations.**
  - Every odd frequency gives a branch through all F_n that obeys the recurrence.
  - Even F + λe^(at) sin 2πt keeps every integer value and the recurrence.
- **Five modes.**
  - The mean curve u·F(t+3) + v·F(t+4) leaves a two-dimensional fibre of laws invisible.
  - ½[null] + ½[5] and ½[2] + ½[3] trace the same curve forever.
- **The native reply.**
  - Continuing with window [5] gives 5, ⊥, 26, ⊥, 18, which recovers all five probabilities together with the curve.
  - A null window separates two positive laws with the same half-time shadow by εψ³(2 + 3ψ).

一部约五分半钟的片子：Fibonacci 的一步可以切成一条光滑的流，但必须付出一个相位；整数点确定每一步，却不确定步与步之间的路径，而实的流需要第三个维度。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-047-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Arith/FibonacciAtomic/NativeContinuation/JointLaw` has a state file at the subject commit.
  - Its `native_reply_injective` states that, at every fixed length, the native reply after one appended null window
    separates all legal five-mode sources.
  - The reply scene is badged Lean while it states this deterministic version.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the branch reversal;
  - the decomposition used for the bridge;
  - the complex group;
  - the three-dimensional embedding and its minimality;
  - the projection defect;
  - the branch family and modulation;
  - the five-mode lift;
  - the fibre;
  - the continuation replies.
- **Classical tools named in the volume.** Badged as classical where they carry the narration:
  - the Binet formula and negative indices;
  - the Cassini identity;
  - the real-square-root determinant obstruction;
  - the matrix exponential.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **The continuous curve.**
    - F(n) = F_n for |n| ≤ 15.
    - The sinh form, the real and imaginary parts, the reversal and the recurrence on a grid.
    - The complex Cassini identity.
    - F(±½).
  - **Mirror, stretch and group.**
    - The properties of S.
    - M = S·e^(aS) and Mⁿ for |n| ≤ 6.
    - The even and odd sinh/cosh forms.
    - The group law, the matrix form and the determinant of U.
  - **Embedding and projection.**
    - T₃(n)J = JMⁿ for |n| ≤ 4.
    - LT₃ = UL, and the scalar readout.
    - The projection defect, and the half-time kernel.
  - **Branches.** The branch family, and the modulation, which shifts F(¼) by 0.79.
  - **Five-mode lift.**
    - f₂ = F(t+3) and f₃ = F(t+4).
    - The quantities 0, 2, 5, 7, 3.
    - The strictly positive pair and the null-window difference −0.00172.
  - **Fibre and replies.**
    - The fibre pair.
    - Recovery of p from the curve and the reply law on 200 random laws.
- **Illustrative visuals.** These are illustrations, not data:
  - the drawn spirals;
  - the growing curve;
  - the rotating axes;
  - the moving phase dot.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
