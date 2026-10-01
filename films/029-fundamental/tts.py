"""Synthesize narration line by line with Kokoro and emit timeline.json.

Usage: python3 tts.py [--only N]
"""
import json
import os
import sys

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

HERE = os.path.dirname(os.path.abspath(__file__))
SR_OUT = 48000
GAP = 0.6  # silence between lines inside a scene
SAY = {"qutrits": "cue-trits", "qubit": "cue-bit", "GHZ": "G H Z", "eigenvector": "eigen-vector", "trureturing": "True Re-Turing", "Gödel": "Gurdel", "Elizalde": "Eli-zal-deh", "Catalan": "Catalan",  "Hasler": "Hass-ler", "Padovan": "Pad-oh-van", "Bernoulli": "Ber-noo-lee", "orthocross": "ortho-cross",  "OEIS": "O E I S", "P n three": "P, n, three", "Krishnan": "Krish-nun", "Petersen": "Peter-sen", "Möbius": "Mer-bius", "Mertens": "Mer-tens", "Schmidt": "Shmit", "Choi": "Choy", "sinc": "sink", "Erdős": "Air-dish", "Bollobás": "Bollo-bash", "Sahasrabudhe": "Saha-sra-boo-day", "Schoenfeld": "Shern-feld", "Weil's": "Vay's", "the Dao": "the Dow", "The Dao": "The Dow", "name Dao": "name Dow", "constant Dao": "constant Dow", "Huayan": "Hwa-yen", "Indra's": "Indra's", "Riemann": "Reeman", "Mahler": "Mah-ler", "Herglotz": "Hair-glots", "rho": "row", "5040": "five thousand forty", "0.023": "zero point zero two three", "Li coefficient": "Lee coefficient", "Li sum": "Lee sum", "The Li": "The Lee", "every Li": "every Lee", "Euler": "Oiler", "Bernhard": "Bern-hard", "phi": "fye", "Zeckendorf": "Zeckendorf", "cotangent": "co-tangent", "transformers": "transformers", "Laudone": "Law-doan"}


def spoken(text):
    for a, b in SAY.items():
        text = text.replace(a, b)
    return text


def resample(x, sr_in, sr_out):
    if sr_in == sr_out:
        return x
    n_out = int(round(len(x) * sr_out / sr_in))
    t_in = np.arange(len(x)) / sr_in
    t_out = np.arange(n_out) / sr_out
    return np.interp(t_out, t_in, x).astype(np.float32)


def trim(x, thr=0.004):
    idx = np.where(np.abs(x) > thr)[0]
    if len(idx) == 0:
        return x
    a = max(0, idx[0] - 240)
    b = min(len(x), idx[-1] + 2400)
    return x[a:b]


def main():
    script = json.load(open(os.path.join(HERE, "script.json")))
    only = None
    if "--only" in sys.argv:
        only = int(sys.argv[sys.argv.index("--only") + 1])
    k = Kokoro(os.path.join(HERE, "models/kokoro-v1.0.onnx"),
               os.path.join(HERE, "models/voices-v1.0.bin"))
    os.makedirs(os.path.join(HERE, "tts"), exist_ok=True)
    timeline = {"scenes": [], "lines": []}
    t = 0.0
    chunks = []
    li = 0
    for sc in script["scenes"]:
        s0 = t
        t += sc["lead"]
        for j, (en, zh) in enumerate(sc["lines"]):
            path = os.path.join(HERE, "tts", f"line{li:02d}.wav")
            if only is None or only == li:
                samples, sr = k.create(spoken(en), voice=script["voice"], speed=script["speed"], lang="en-us")
                x = trim(np.asarray(samples, dtype=np.float32))
                x = resample(x, sr, SR_OUT)
                sf.write(path, x, SR_OUT)
            x, _ = sf.read(path, dtype="float32")
            dur = len(x) / SR_OUT
            timeline["lines"].append({"i": li, "scene": sc["id"], "start": round(t, 3),
                                      "end": round(t + dur, 3), "en": en, "zh": zh})
            chunks.append((t, x))
            t += dur
            if j < len(sc["lines"]) - 1:
                t += GAP
            li += 1
        t += sc["tail"]
        timeline["scenes"].append({"id": sc["id"], "start": round(s0, 3), "end": round(t, 3)})
    timeline["duration"] = round(t, 3)
    total = np.zeros(int(np.ceil(t * SR_OUT)) + SR_OUT, dtype=np.float32)
    for st, x in chunks:
        a = int(round(st * SR_OUT))
        total[a:a + len(x)] += x
    sf.write(os.path.join(HERE, "narration.wav"), total, SR_OUT)
    json.dump(timeline, open(os.path.join(HERE, "timeline.json"), "w"), ensure_ascii=False, indent=1)
    print("duration", t, "lines", li)
    for s in timeline["scenes"]:
        print(f'{s["id"]:10s} {s["start"]:7.2f} {s["end"]:7.2f} {s["end"]-s["start"]:6.2f}')


if __name__ == "__main__":
    main()
