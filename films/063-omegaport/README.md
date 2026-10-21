# 063 · AURIC Ω I · TWO-SETTING PORT · AURIC Ω 第一部：静态相融与两设置端口

This is the first film in the AURIC Ω series and runs about 6 minutes. It covers §1–16 of
`AURIC_OMEGA_STATIC_COMPATIBILITY_FIBER_THEORY.md` in trureturing, at subject commit `86d732f4bb`.

The film asks one question. A fixed menu of readings sits over the five-mode pyramid walk. Which quantum block, of which
dimension, can carry every input while keeping both readings? The answer is five.

- **One static object.**
  - Events carry a partial order.
  - A configuration is a down-closed set of events. Two configurations are compatible when their union is again a
    configuration. Compatibility need not hold for every pair, and it need not be transitive.
  - History length, an observer's weighted clock and the waiting parameter are three different quantities.
- **The five-mode walk and its menu.**
  - The modes are the legal three-bit words 000, 100, 010, 001, 101, that is ∅, [2], [3], [5], [2,5].
  - The generator K is the pyramid graph: the square ∅–[2]–[2,5]–[5] with the apex [3] attached to ∅.
  - The menu has nonnegative waits under K, a complete five-outcome read, Stop, finite feedback and input-independent
    randomness. It has no extra phases or gates.
  - With D = diag(1, i, i, i, 1), every wait becomes the real rotation O(t) = e^{tA}, where A = −iD†KD is antisymmetric.
- **A blind real frame.**
  - Every effect of the whole menu is a real symmetric matrix. They span 15 dimensions, so a state shows 14 numbers,
    its real part, and 10 directions stay blind.
  - The orthogonal states (e∅ ± i e[2])/√2 give identical statistics on every reading.
  - The map (X + Xᵀ)/2 is positive and trace preserving, but its Choi matrix has eigenvalue −1/2 (−1/10 normalized). It
    is not completely positive, so readings factor through Re ρ while no legal operation compresses the state that way.
- **The port.**
  - Each input goes through a q-dimensional quantum block with any finite number of classical flags. It is decoded by a
    fixed map before the later setting is chosen.
  - The error is the worst total variation over all complex inputs at the settings t = 0 and t = 2/3. Here 2/3 is a
    mathematical waiting parameter, not seconds.
- **Rigidity: an exact port needs q ≥ 5.**
  - The two settings preserve five probes: e[2], e[3], e[5], e[2,5] and v = O(2/3)ᵀe∅.
  - The rational Taylor polynomial S₁₂ of M = (2/3)A has a tail below (7/6)·2¹³/13! = 4/2606175. It shows every
    |v_j| > 9/25.
  - The probes therefore span ℂ⁵ and overlap in a connected star, which forces T = id.
  - The two settings span only 9 of 25 real directions, so this is not tomography.
- **Error floor below five dimensions.**
  - Six survival tests and the rank–trace bound give ε ≥ μ(d−q)/((2+μ)(d+1)). With μ > 1/8 this is (5−q)/102.
  - The spectral gap between the two bases gives ε ≥ γ(d−q)/(2d) with γ = 1 − κ.
    - κ(2/3) < 2/3 gives (5−q)/30.
    - The settings 0 and 1, with κ(1) < 23/50, give 27(5−q)/500.
  - The exact optimum for q < 5 is not determined.
- **"There exists" and "for all".**
  - The two settings see 8 independent probabilities and leave a 16-dimensional blind kernel, so some distinct states
    read the same.
  - Still, no single channel keeps every reading for every input while merging such states.
- **Causal graphs.**
  - Once its input-independent randomness is fixed, a finite protocol is a fixed causal graph of local instruments that
    keeps the joint law of the actual records.
  - Independent nodes on different ports commute, since (Φ⊗id)(id⊗Ψ) = Φ⊗Ψ.
  - Infinite runs use compatible local states and the GNS construction. An infinite history with equal weights has
    infinite norm and is not a state.

一部约六分钟的片子，AURIC Ω 系列的第一部：在五模式金字塔行走上放一张固定的读出菜单，问什么维数的量子块能在保留两个读数的同时承载所有输入——答案是五；低于五维，误差在两个设置下至少是 (5−q)/30。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-063-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen general results.** Each module below has a state file at the subject commit and generality G. They are
  general theorems. The five-mode constants are not separate frozen declarations.
  - `D5/S3/Quantum/AURICOmega/ExponentialTail.exp_remainder_le`.
    - The statement: if ‖x‖ ≤ r and r < n + 1 in a complete normed algebra, then ‖exp x − Σ_{k<n} x^k/k!‖ is at most
      (rⁿ/n!)/(1 − r/(n+1)).
    - With r = 2 and n = 13, this is the film's tail (7/6)·2¹³/13!. The rigidity scene's Taylor-tail phrase is badged
      Lean.
  - `D5/S3/Quantum/Reduction/ProbeComponentRigidity.connected_probability_preserving_identity`.
    - The statement: a trace-preserving Kraus family that preserves every probe probability of a spanning, connected
      family of unit probes acts as the identity.
    - It backs the rigidity scene's T = id.
  - `D5/S3/Quantum/Reduction/CanonicalFlagCompression.canonical_flag_port_lower_bound`.
    - The statement: for a flagged port that preserves probe probabilities, each probe component has dimension at most
      the quantum block size q.
    - It backs exact port ⇒ q ≥ 5.
  - `D5/S3/Quantum/QuantumChannels/SparseProbePortBound.sparse_probe_port_bound`.
    - The statement: μ(d−q)/((2+μ)(d+1)) is at most the infimal two-setting port error, and the error is 0 when q = d.
    - It backs the first floor formula.
- **Published results.** The port scene's first line is badged as a published result cited in the volume: the port
  contract of Bluhm–Rauber–Wolf, *Quantum Compression Relative to a Set of Measurements* (Definition 4.1). The volume
  cites Mayer–Knill, arXiv:1805.04491, for the connected-probe rigidity mechanism.
- **Classical tools.** The film badges these as classical tools named in the volume:
  - the partial-order and down-closed-set language of the object scene;
  - the Choi–Kraus–Stinespring representation;
  - the GNS construction.
- **Theory volume, argued but not kernel-checked.** The volume marks its statements as open reference input. The film
  badges the following as theory:
  - the five-mode constants;
  - the effect-span count 15;
  - the ψ± example;
  - the non-CP map;
  - the application of the general theorems to the two settings;
  - the spectral-gap bounds (5−q)/30 and 27(5−q)/500;
  - the 9-dimensional span and 16-dimensional blind kernel;
  - the causal-graph and GNS remarks.
- **Open.** The exact optimal error for q < 5 is not determined. The film badges it open.
- **Recomputed for this film.** An independent Python script recomputes the following.
  - **Walk and blind frame.**
    - The legal-word counts Fib(n+2) for n < 12, and the pyramid graph K.
    - The real antisymmetric A and the orthogonal O(t). The norm ‖A‖ = √((5+√17)/2) < 9/4.
    - The 15-dimensional effect span over 61 waits, and the ψ± equal statistics.
    - The Choi eigenvalues −1/2 and −1/10, and positivity of (X + Xᵀ)/2 on 200 random states.
  - **Rigidity.**
    - The five exact rational entries of S₁₂, by exact fractions.
    - The tail 4/2606175 < 64/6081075, and min |v_j| = 0.36755 > 9/25.
    - The rank 5 and connected star of the probes, and the two-setting span 9.
  - **Bounds.**
    - (5−q)/102 at μ = 1/8.
    - κ(2/3) = 0.66303 and κ(1) = 0.45001, giving (5−q)/30 and 27(5−q)/500.
    - κ < 1/2 on |t − 1| ≤ 1/200.
    - A measure-and-drop q = 4 port with sampled error 0.945 ≥ 1/30.
  - **Coexistence and graphs.**
    - The readout rank and the 16-dimensional blind kernel.
    - The commutation (Φ⊗id)(id⊗Ψ) = Φ⊗Ψ = (id⊗Ψ)(Φ⊗id).
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramid and the Ω ring;
  - the event Hasse diagram;
  - the effect grids;
  - the ψ± bars;
  - the port block diagram;
  - the causal-graph sketch.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`

This film's `engine.js` keeps runs of Latin letters, digits and formula symbols whole when wrapping Chinese
subtitles. It also keeps brackets and leading operators from being stranded at a line break.
