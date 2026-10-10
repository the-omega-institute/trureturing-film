# 050 · AURIC FIB ATOM PYRAMID XXI · 金字塔 XXI：稳定关系与三维闭合

A film of about 7 minutes, the twenty-first part on the FIB atom pyramid. Its subject is
`AURIC_FIB_STABLE_RELATION_BOUNDARY_THREE_DIMENSIONAL_CLOSURE.md` in trureturing at subject commit `94647efea2`.

Take a response with three slots: two inputs and one probe. If it treats every rotation fairly, it must be a volume, and
only in three dimensions. Calibrated, it carries areas, rotations and the whole tree readout. Loops and seams keep what
no single frame can erase.

- **Probes.**
  - A metric g and a three-slot response T fix a unique product B with g(B(u,v), w) = T(u,v,w).
  - Without the probe, the zero product and the cross product agree. The triple (e₁, e₂, e₃) reads 0 against 1.
- **Fairness.**
  - Sphere stability is not enough, since SO(d) is transitive on the sphere for every d ≥ 2.
  - A fixed seed reads 1 at e₁ and 0 at e₂.
- **Only volume survives.**
  - Under full rotation fairness, −I kills everything in two dimensions. A double sign flip kills every coefficient
    from four dimensions up.
  - In three dimensions T = c·vol and B = c·×. Antisymmetry is forced, not assumed.
  - A reflection flips the sign, and the seven-dimensional cross product is not SO(7)-fair.
- **Calibration.**
  - C = B/c is perpendicular to its inputs, and ‖C‖² is the Gram determinant. Triangles take ½ and tetrahedra take ⅙.
  - The area vector of a closed polygon is the same from any origin. A disc has A = rL/2 and a ball has V = rS/3.
  - Λ²V ≅ V only when d = 3. A linear squeeze loses at least 2 dimensions in four and at least 14 in seven.
- **Generators and rulers.**
  - tr(L_u L_v) = −2g(u, v) and [L_u, L_v] = L_{u×v}.
  - g = I and g = diag(4, ¼, 1) share one volume form but give e₁ and e₁/4, so a volume is not a ruler.
- **Quaternions.**
  - The bare cross product is not associative. Keeping the contracted term gives the quaternions, with N(xy) = N(x)N(y)
    and inverses.
  - Conjugation by a unit quaternion is the Rodrigues rotation, and q and −q give the same rotation.
- **Trees.**
  - With α = i and β = j, Q(ρt) = R·Q(t) for every tree, where R has order three. Every value lies in Q₈.
  - Different bracketings, and ⟨α,α⟩ against ⟨β,β⟩ (quantities 4 and 6), collide.
  - Chosen representatives give the five modes 1, a, b, c, −b. The null window still maps (2,1) to (4,7).
- **A finite check.**
  - The determinant-one signed permutations fix only the volume line, and only in three dimensions.
  - Averaging bounds the distance to that line by the full-group defect.
  - x⁴ + y⁴ + z⁴ passes the check but reads 1 against 1/3, so the check stops at third order.
- **The Monster.**
  - The moonshine first layer has dimension 196883, with a positive metric and a symmetric cubic whose stabilizer is
    the Monster.
  - A symmetric, rotation-fair cubic must vanish, so that system has a different type.
- **Seams and loops.**
  - Invariant pieces stay invariant along typed seams, and Σ ε_ijk ε_ljk = 2δ_il.
  - All closed walks are trivial exactly when one global frame makes every edge the identity.
  - Parallel edges I and R with a self-loop R carry the holonomy R⁻¹ ≠ I, which no frame change removes.

一部约七分钟的片子：一个有两个输入、一个探针的三槽响应，若对每次旋转都公平，就只能是三维的体积；校准之后，它承载面积、旋转和整棵树的读出，而回路与接缝保留着任何单一标架都抹不掉的东西。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-050-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.**
  - `D5/S3/Observer/AgencyHolonomy/ZeroLoopPotentialEquivalence` has a state file at the subject commit.
  - Its `closed_path_zero_iff_exists_potential` states that, on a connected path groupoid, an additive cost vanishes on
    every closed path exactly when it is a difference of vertex potentials. This is the additive version of the
    volume's loop criterion.
  - The loops scene is badged Lean while it states this, and the finale's ledger names it.
- **Theory volume, argued but not kernel-checked.** Badged as theory:
  - the probe fibre and the fairness gap;
  - the three-dimensional selection without assumed antisymmetry;
  - the fixed-volume example;
  - the tree readout and its collisions;
  - the finite-group fixed spaces and the Reynolds bound;
  - the type comparison with the Monster;
  - the seam and loop results.
- **Classical tools named in the volume.** Badged as classical where they carry the narration:
  - probe recovery;
  - the cross-product area and volume formulas;
  - the generator identities;
  - the quaternion product and the Rodrigues rotation.
- **Published.** The moonshine first layer and the identification of its stabilizer as the Monster come from the
  Griess and Höhn–Seysen sources cited by the volume. That scene line is badged as published.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Probes and fixed spaces.**
    - Probe recovery on 50 random (g, T).
    - The fixed seed.
    - The full fixed-space table for d = 2 to 10 by sign-graph elimination.
    - The Reynolds average over the 24-element group and its bound on 30 random tensors.
  - **Geometry and generators.**
    - The Lagrange identity on 200 samples.
    - The hexagon area vector from a shifted origin, and the cube volume from an interior point.
    - The radial factors, the Λ² count and kernels.
    - The generator identities on 100 pairs, and the fixed-volume example.
  - **Quaternions and trees.**
    - Associativity and the norm on 200 random elements and on all 1000 integer triples and 100 pairs of the volume's
      set.
    - Rodrigues on 50 axes.
    - The tree readout on 42 trees and all 511 words up to length 8.
    - The collisions, the five representatives and the null window.
  - **Seams and loops.**
    - The ε contraction.
    - The non-removable holonomy under 20 random frame changes.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating box and arrows;
  - the coefficient grids;
  - the polar x⁴ + y⁴ curve;
  - the network sketch.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
