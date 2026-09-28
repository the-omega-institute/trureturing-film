# 021 · JOINT RELATIONS · FINITE CLOCKS · 联合来源·量子关系·有限时钟

A film of about 6 minutes on trureturing's theory volume
`docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_JOINT_RELATIONS_CLOCKS.md`
("递归关系观察：联合来源、量子关系与有限时钟", 8,250 lines). Like the effective-resolution
volume, it starts from the legal-representation interfaces of the transport / memory /
completion volume.

The volume treats a clock as a record the observer keeps, not as a number line. That record
can be:

- shared or independent;
- forgotten or retained.

It keeps three pairs apart:

- a shared phase copy vs an independent source;
- forgetting a time vs obtaining it;
- a formal inverse vs a permitted reversal.

一部约 6 分钟的专题：时钟不是时间本身，而是你仍被允许使用的那份记录。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-021-<version>`)
by `.github/workflows/release-film.yml`. Nothing rendered is committed.

## What the film does and does not claim · 主张边界

- **Paper mathematics.** Every scene except scene 02 is an ordinary proof in the theory volume.
  The volume says it adds no Lean declarations and claims no originality. Chapters 12 onward are
  marked "Claim status: open".
- **Ledger.** Of the volume's 304 ledger atoms:
  - 3 are `absorbed-closed`, covered by the frozen `FreeWindowRealizationCapacity` and
    `ExactSnapshotPeriodClassification` modules;
  - 1 is `partial-closed`;
  - 300 are `residual-open`.

  The scenes do not rely on those covered atoms.
- **Known physics.** Scene 02 (Bell states) is standard quantum mechanics and carries a separate
  badge.
- **Credits.**
  - Background for the error bounds: Carmeli–Heinosaari–Schultz–Toigo; Fuchs–van de Graaf;
    Sturm 2000; Sremac–Woerdeman–Wolkowicz 2019.
  - Background for phase references and orbit recovery: Bartlett–Rudolph–Spekkens 2007;
    Gour–Spekkens; Bandeira et al.
  - The 2m−1 copy count cites Sahs–Sissokho–Torf 2012 for the extremal zero-sum length.
  - The resonance-kernel error bound cites Hilbert's inequality (Montgomery–Vaughan); asymmetry
    modes cite Marvian–Spekkens; Short–Farrelly for finite-time equilibration.
  - Archive recovery cites Moore 1956.
  - Scene 12's modulo-4 multiparty messaging is related to Buhrman–Cleve–van Dam and
    Buhrman–van Dam–Høyer–Tapp.
  - Scene 13's windows relate to Chung–Diaconis–Graham (universal cycles).
- **Recomputed for this film:**
  - the golden-clock errors (F_N = 5, 21, 233 → after 100 uses 0.0137, 0.410, 0.4992);
  - the integer alias χ = 1;
  - ½|sinc(gT/2)| with its zeros at gT = 2π·k;
  - the Choi eigenvalue −½;
  - the exponential clock with the same mean (0.0295 after 10 uses at g = 1);
  - the 0.624 factor.

  The subagent reading pass separately brute-forced:
  - the mod-4 gluing (16 vs 8 states, 6 vs 5 bits);
  - 256 vs 128 for the three-party parity;
  - 2r−3 for r = 3, 4, 5;
  - the 6 / 7 / 8 window capacities;
  - the 2m−1 moments for m = 2, 3.
- **Schematic visuals.** Some visuals are illustrative, not data:
  - the random stop of the opening dial;
  - the synchronized-pair grid in scene 10;
  - the tuple labels of scene 11 (shown as (u, v, clock) with the real set t ≡ u + v mod 2);
  - the triangle of scene 12.

  The volume's errata sections are not used.

## Contents and evidence status · 章节与证据状态

Line numbers refer to the volume at trureturing `0a7b3b0cd3`.

| # | Scene | Claim | Source |
| --- | --- | --- | --- |
| 02 | Relation | Φ± have identical one-sided states I/2; ⟨X⊗X⟩ = ±1 | §1.1 (l.11); standard QM |
| 03 | Hidden coherence | ρ_c: energy 0, marginals I/2, basis statistics (0, ½, ½, 0); entangled ⟺ c ≠ 0; an energy-conserving gate gives ⟨Z₁⟩ = 2 Re c | Counterexamples 1.2/1.3 (l.59, 98), Prop 1.4 (l.133) |
| 04 | Repair | Distance to the p₀ fiber: linear with sharp C(p₀) = 1/(2√(p₀(1−p₀))) inside, √p at the poles; nearest-point map has Choi eigenvalue −½ | Props 1.10–1.12 (l.353–415), Prop 1.14 (l.493) |
| 05 | Copies | Two shared-phase copies: 1/2 vs 1/4; H = diag(0,1,m): hidden below m copies; exact orbit copy number 2m−1 | Counterexample 2.6 (l.825), Props 2.15–2.16 (l.1209, 1273), Props 2.28–2.29 (l.1775, 1814) |
| 06 | Kernel | Random-time averaging multiplies gap-g coherence by ν̂(g); uniform window error ½\|sinc(gT/2)\|, zero at gT = 2πk | §3.1 (TM.259), Prop 3.8 (l.2175) |
| 07 | Alias | Clock times 0, 2τ, 3τ: gap 2π/τ has χ = 1, never erased | Prop 3.16 (l.2619, TM.425) |
| 08 | Golden clock | Times 0, τ, φτ with Fibonacci gaps: φF_N − F_{N+1} = ±φ^{−N}, error stays near ½; an exponential clock with the same mean decays | Prop 3.21 (l.2772, TM.439–441), Counterexample 3.24 (l.2863) |
| 09 | Shared clock | Equal ½/½ marginals: P(T₁ = T₂) = 1 (shared) vs ½ (independent); shared clock keeps \|01⟩⟨10\| | §4.2 (l.2970, TM.452), Prop 3.23 (l.2847) |
| 10 | Archive | Clock readable from the record ⟺ all reachable synchronized pairs have equal cost; failure witness within n² steps; laps need memory | §12 (l.4000), §13 (l.4090–4175) |
| 11 | Glue | Mod-4 source with 8 states: cut u \| v glues 16 (8 ghosts, 6 bits); cut (u+v) \| v glues exactly 8 (5 bits) | Prop 14.15 (l.4456) |
| 12 | Higher parity | Three parties: all pairwise checks pass, 256 consistent vs 128 real; changing the task costs 2r−3 bits vs 1 with a central helper | Prop 18.30 (l.5871), Cor 19.4 (l.6065) |
| 13 | Windows | Outputs 0001 and 0011, windows of length 3: free 6, reversible 7 (cycle 0001101), commuting 8 | Prop 27.7 (l.7793) |

Scenes 00, 01 and 14 are the opening, the title and the recap.

## Engine

Shared `engine.js` from film 001; scenes in `scenes.js`, injected by `build.py`.
