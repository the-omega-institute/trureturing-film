# 028 · FOUR WAYS TO BE UNSEEN · 一个观察者的四种看不见

A film of about 5½ minutes on the observer theory frozen in trureturing's Lean library at subject commit `9e6bcf3fbe`.
Here an observer is a readout q : X → B, and a fiber is everything q sends to the same reading. The film follows four
ways a real difference can stay unseen, each one separated by a frozen Lean theorem:

| Unseen | Metaphor | Lean model | Theorem |
|---|---|---|---|
| now | a cup over two coins | two Boolean states, constant readout | `type_existence_does_not_imply_distinguishable_existence` |
| later | footprints under the tide | identity readout, constant update | `distinguishable_existence_does_not_imply_causal_existence` |
| on the record | a river and a blank logbook | identity dynamics, constant stable record | `causal_existence_does_not_imply_record_existence` |
| from within | a table that misses its own flipped diagonal | complete three-axis qubit readout; every same-state evaluation table misses its twisted diagonal | `empirical_complete_reflexive_incomplete`, `qubit_empirical_image_reflexive_gap` |

Two further scenes cover:

- **Hidden memory.** A six-position clock with one lamp needs four refinement steps, which is six states minus two
  readings. The scene rests on `finite_state_has_stable_depth`, `one_step_stability_is_permanent` and
  `behavior_completion_is_least_stable_refinement`.
- **Hidden answer tables.** The scene rests on `window_algebra_has_no_character` and
  `noncontextual_and_local_double_exclusion`: the clock and shift matrices anticommute, so no character exists, and
  the CHSH value is 2 for any answer table against 2√2 for the Bell state.

一部约 5 分半的片子：观察者就是一次读数；一个真实的差别可以在此刻、以后、记录里和内部这四处看不见，每一种都由冻结的 Lean 定理分开。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-028-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** Every module named above has a state file under `Golden/Frozen/state/` at the subject commit:
  - `D5/S3/Observer/Existence/{ExistenceLayersDoNotImply, EmpiricalReflexiveSeparation, QubitEmpiricalImageReflexiveGap}`;
  - `D5/S3/ObserverMemory/PredictionCertificates/{FiniteStableDepth, OneStepPermanentStability}`;
  - `D5/S3/ObserverMemory/RefinementClosure/BehaviorCompletionMinimality`;
  - `D5/S3/Observer/{WindowCharacter, ClassicalAnswerTableExclusion}`.
- **Repository count.** `D5/S3/Observer` and `D5/S3/ObserverMemory` hold 632 `.lean` files and 101,018 lines. 628 of
  the files have state files; the other four are in `Observer/GoldenChronology`.
- **Recomputed for this film** by an independent Python/numpy script:
  - the clock tower K0…K4 has 2, 3, 4, 5, 6 classes and is stable from K4 on;
  - three Pauli-axis readings recover the Bloch vector of random qubit states;
  - CHSH is at most 2 over all ±1 answer tables, and 2.828… for the Bell state;
  - for all 512 tables on three states, the flipped diagonal is never a row.
- **Illustrative visuals.** These are illustrations, not data:
  - the cup, beach, river and logbook;
  - the 6 × 6 evaluation table, which is a fixed pseudo-random example.

  The closing remark that these ideas echo control theory, automata, quantum foundations and the diagonal argument is
  commentary.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
