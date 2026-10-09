# 037 · AURIC FIB ATOM PYRAMID VIII · 金字塔 VIII：从共同出现到共同祖先

A film of about 7¼ minutes, the eighth part on the FIB atom pyramid. Its subject is two volumes in trureturing at
subject commit `1609ebb010`:

- `AURIC_FIB_ATOM_COMMON_ANCESTRY_AND_OBSERVATION_BOUNDARY.md`, all sections;
- `RECURSIVE_RELATIONAL_OBSERVATION_JOINT_MOMENT_FIBERS.md`, §§49–51, which supply the depth law, the task quotient
  and the one-rotation twins T_n, U_n.

Part seven asked which records keep a simple source simple. This film asks about a relation that no record of
co-occurring patterns can hold: which parts of the source were joined first.

- **Three relations on the same atoms.**
  - Co-occurrence is F[1,3].
  - Order is αβ against βα.
  - Ancestry is ((a,b),c) against (a,(b,c)).
  - The joint probability κ restores co-occurrence, not ancestry.
- **Intrinsic depth.**
  - The source is an ordered binary tree under ρ: α ↦ β, β ↦ ⟨β,α⟩, ⟨s,t⟩ ↦ ⟨ρs, ρt⟩.
  - ν(t) counts how many times ρ can be undone.
  - The ray T_n = ρⁿα has 1, 1, 2, 3, 5, 8 leaves.
- **The pairing law.**
  - Q(⟨s,t⟩) = (min(a,b), 0), except when both children lie on the α ray and the left is one deeper. Then
    Q = (b+2, 1).
  - Example: ⟨T3, T2⟩ = T4 has Q = (4, 1), while ⟨T2, T3⟩ has Q = (2, 0).
- **The joint corner.**
  - In each window, low, middle, high and the joint corner ⟨T₃ⱼ₊₂, T₃ⱼ⟩ have Q = (3j, 1), (3j+1, 1), (3j+2, 1)
    and (3j, 0).
  - In the context ⟨T₃ⱼ₊₁, z⟩, low climbs to depth 3j+2 and the joint corner stays at 3j.
  - The film draws window j = 0.
- **Leaf words.**
  - Any associative product of the leaves merges trees with the same word.
  - (((βα)β)α) and ((βα)(βα)) have the same word, the same path and G = (2, 2, −2, 2, −2).
  - Under U_α = −iX and U_β = −iY, both have the Pauli product −I.
  - Their depths are 0 and 2.
- **Ancestor rectangles.**
  - Each leaf gap belongs to one internal node, which has area ℓ·r.
  - Every leaf pair is counted once at its nearest common ancestor, so Σ A_i = C(m, 2).
  - On screen, each node's pairs form one rectangle of the leaf-pair staircase.
  - Example: T4 has areas (1, 2, 6, 1), which sum to 10.
- **Recovery.**
  - Over a run of k consecutive leaves, the areas sum to at least C(k, 2). Equality holds exactly for full subtrees.
  - So (w, A) rebuilds the whole tree.
- **The pentagon.**
  - The five bracketings of βαβα have areas (1,2,3), (2,1,3), (1,4,1), (3,1,2) and (3,2,1), each summing to 6.
  - Their hull is a pentagon. Only (1,4,1) has depth 2.
  - The Catalan count of bracketings is not the 1 + 3 + 1 count of legal patterns.
- **Local rotation.**
  - ((s,t),u) → (s,(t,u)) changes the area vector by ac(e_i − e_j).
  - Example: with a = 2, b = 1, c = 2, the areas go from (1, 2, 6, 1) to (1, 6, 2, 1).
- **Exact is not stable.**
  - T_n and its twin U_n have the same word and differ by one rotation. Their depths are n and 0.
  - Their areas differ by e₁ − e₂.
  - The normalised gap is 1/C(F_{n+1}, 2). At n = 13 this is 377 leaves and 1/70876.
- **Adaptive blindness.**
  - Under the volume's leaf-word interface hypotheses, every adaptive experiment has the same record law on T_n and
    U_n.
  - So some depth estimate misses by at least n/2 in expectation.
  - Holding the full bracketing needs ⌈log₂ C_m⌉ bits:
    - 3 bits for 4 leaves;
    - 9 bits for 8 leaves;
    - 18 bits for 13 leaves;
    - 33 bits for 21 leaves.
- **Characters.**
  - The parity set {000, 011, 101, 110} is uniform on every bit and every pair of bits. Only the three-bit
    character sees it.
  - A law is uniform iff every nonconstant character vanishes.
- **The task boundary.**
  - (w, ν) closes under ρ and pairing, because e = 1 iff M^(−ν) c = (1, 0). For T5, (3, 5) returns to (1, 0) in five
    steps.
  - ((α,α),α) and (α,(α,α)) still differ in their left-child address.

一部约七分十四秒的片子：同一组原子上的三种关系——共同出现、出现次序、共同祖先。叶词保留次序却忘掉括号，祖先矩形面积能精确找回括号，但精确不等于稳定；有些关系只是还没读，有些已被投影合并，必须换读口。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-037-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** These have state files under `Golden/Frozen/state/D5/S3/Arith/FibonacciAtomic/` at the subject
  commit:
  - `GenealogicalFiberTransport.result`. For every composition (a, b) with a + b ≥ 1:
    - the actual trees with a α-leaves and b β-leaves number Catalan(a+b−1) · C(a+b, a), for example
      (2,2): 5 · 6 = 30;
    - iterated ρ is injective on each composition class.
    The film's "ρ never merges two trees of the same composition" is this injectivity.
  - `CliffordLeafOrbit.result`. Among its clauses, two different trees p ≠ q of composition (3, 0) have the same leaf
    labels and the same image E(p) = E(q). Here E is the multiplicative map into the Clifford algebra of
    Q(x, y) = x² + xy − y². The film shows this as the frozen instance that an associative readout merges same-word
    trees.
- **Theory volumes, argued but not kernel-checked.** The ancestry volume marks every theorem `Claim status: open`.
  The joint-moment theorems used are 候签 (pending signature). The film badges as theory:
  - the depth composition law;
  - the window table and context separation;
  - the associative-merging theorem;
  - the area sum, the interval criterion and recovery;
  - the rotation transfer;
  - the one-rotation depth gap and its normalised bound;
  - the adaptive indistinguishability bound;
  - the composition test for the ray flag;
  - the address counterexample.
- **Classical tools named in the volume.** These are badged as classical:
  - the ancestor rectangle coordinates ℓ_i · r_i (Loday's construction of the associahedron);
  - the associahedron pentagon and Catalan numbers;
  - character orthogonality and Fourier inversion on finite abelian groups.
- **Recomputed for this film** by an independent Python script:
  - **Composition law.** Exhaustive over all trees with up to 5 leaves on each side, plus deep ray trees, with ρ
    injective on all 20134 trees up to 7 leaves.
  - **Window and context.** The window table and the context separation for j = 0…3.
  - **Leaf words.** w, G(βαβα) = (2,2,−2,2,−2) and the Pauli product −I for both trees.
  - **Areas.** On every tree up to 8 leaves:
    - Σ A_i = C(m, 2);
    - the interval criterion;
    - the area vector separates every shape.
  - **Pentagon.** The table and its depths.
  - **Counts.** Catalan numbers, and the fiber count Catalan · binomial.
  - **Rotation.** The transfer ac(e_i − e_j) on every rotation of every tree with 3–7 leaves.
  - **T_n / U_n.** For n = 3…13:
    - the same word;
    - F_{n+1} leaves;
    - Q = (n,1) against (0,0);
    - an area difference of ±1 in two places;
    - forward ρ^j depths n + j against j.
  - **Bits and characters.** ⌈log₂ C_m⌉, and the parity-set character means.
  - **Five patterns.** No nonzero XOR mask preserves them.
  - **Task boundary.** The composition test e = 1 ⟺ M^(−ν) c = (1, 0), and the address example.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid;
  - the record tapes in the adaptive scene;
  - the regular pentagons of trees in the title and the end card. The pentagon scene itself uses the true area
    coordinates.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
