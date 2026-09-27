"""Procedural dark-synth score + SFX, synced to timeline.json.

Writes music_bed.wav (music + sfx), mix_voice.wav (ducked under narration)
and mix_music.wav (music only, no narration).
"""
import json
import os

import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 48000
TL = json.load(open(os.path.join(HERE, 'timeline.json')))
DUR = TL['duration'] + 0.5
N = int(DUR * SR)
rng = np.random.default_rng(7)
BPM = 80.0
BEAT = 60.0 / BPM
BAR = 4 * BEAT
SCN = {s['id']: s for s in TL['scenes']}


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, 'low', fs=SR, output='sos'), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, 'high', fs=SR, output='sos'), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x)


def saw(ph):
    return 2.0 * (ph - np.floor(ph + 0.5))


def env_adsr(n, a, d, s, r, sr=SR):
    t = np.arange(n) / sr
    e = np.ones(n) * s
    na = int(a * sr)
    nd = int(d * sr)
    nr = int(r * sr)
    if na:
        e[:na] = np.linspace(0, 1, na)
    if nd:
        e[na:na + nd] = np.linspace(1, s, len(e[na:na + nd]))
    if nr and nr < n:
        e[-nr:] *= np.linspace(1, 0, nr)
    return e


def add(buf, start, sig, gain=1.0):
    a = int(start * SR)
    if a >= len(buf) or a + len(sig) <= 0:
        return
    if a < 0:
        sig = sig[-a:]
        a = 0
    b = min(len(buf), a + len(sig))
    buf[a:b] += gain * sig[:b - a]


# ---------- intensity automation per scene ----------
LEVEL = {  # pad, bass, arp, kick, hat
    'open': (1.0, 0.4, 0.3, 0.0, 0.1),
    'title': (1.0, 1.0, 0.9, 0.9, 0.6),
    'kernel': (0.9, 0.8, 0.8, 0.6, 0.5),
    'threshold': (0.9, 0.7, 0.8, 0.5, 0.4),
    'invisible': (1.0, 0.6, 0.7, 0.4, 0.3),
    'current': (0.9, 0.8, 0.8, 0.6, 0.5),
    'snapshots': (0.9, 0.7, 0.8, 0.5, 0.4),
    'orthogonal': (1.0, 0.6, 0.7, 0.4, 0.3),
    'search': (0.9, 0.8, 0.8, 0.6, 0.5),
    'sparse': (0.9, 0.7, 0.8, 0.5, 0.4),
    'golden': (1.0, 0.6, 0.7, 0.4, 0.3),
    'ladder': (0.9, 0.8, 0.8, 0.6, 0.5),
    'finale': (1.0, 0.9, 0.8, 0.6, 0.4),
}


def automation(idx):
    """Per-sample curve for layer idx, crossfaded over 1 s at scene boundaries."""
    ctl_t = []
    ctl_v = []
    for s in TL['scenes']:
        v = LEVEL[s['id']][idx]
        ctl_t += [s['start'] + 0.6, s['end'] - 0.4]
        ctl_v += [v, v]
    tt = np.arange(N) / SR
    return np.interp(tt, ctl_t, ctl_v)


# chord progression (root midi, chord tones as offsets), 1 chord per bar
PROG = [(45, [0, 3, 7]), (41, [0, 4, 7]), (36, [0, 4, 7]), (43, [0, 4, 7]),
        (45, [0, 3, 7]), (41, [0, 4, 7]), (38, [0, 3, 7]), (40, [0, 4, 7])]


def chord_at(bar):
    return PROG[bar % len(PROG)]


nbars = int(np.ceil(DUR / BAR)) + 1
pad = np.zeros((N, 2))
bass = np.zeros(N)
arp = np.zeros((N, 2))
kick = np.zeros(N)
hat = np.zeros(N)

# ---------- pad ----------
for b in range(nbars):
    root, tones = chord_at(b)
    t0 = b * BAR
    n = int((BAR + 1.2) * SR)
    t = np.arange(n) / SR
    e = env_adsr(n, 0.9, 0.5, 0.85, 1.2)
    for ch, det in ((0, -1), (1, 1)):
        sig = np.zeros(n)
        for k, off in enumerate(tones + [12]):
            f = midi(root + 24 + off)
            for dv in (-0.08, 0.0, 0.08):
                fr = f * 2 ** ((dv * det + 0.03 * det) / 12)
                sig += saw(fr * t + rng.random())
        sig = lp(sig, 900 + 500 * np.sin(b * 0.7) ** 2)
        add(pad[:, ch], t0, sig * e, 0.035)

# ---------- bass (8th-note pulse with sidechain shape) ----------
for b in range(nbars):
    root, _ = chord_at(b)
    for q in range(8):
        t0 = b * BAR + q * BEAT / 2
        n = int(BEAT / 2 * SR)
        t = np.arange(n) / SR
        f = midi(root)
        sig = np.sin(2 * np.pi * f * t) + 0.35 * saw(f * t)
        sig = lp(sig, 380)
        e = np.minimum(1, t / 0.03) * np.exp(-t * 3.2)
        add(bass, t0, sig * e, 0.28)

# ---------- arpeggio (16ths) ----------
pattern = [0, 1, 2, 3, 2, 1, 0, 2, 3, 1, 2, 0, 3, 2, 1, 2]
for b in range(nbars):
    root, tones = chord_at(b)
    notes = [root + 36 + tones[0], root + 36 + tones[1], root + 36 + tones[2], root + 48 + tones[0]]
    for q in range(16):
        t0 = b * BAR + q * BEAT / 4
        n = int(0.24 * SR)
        t = np.arange(n) / SR
        f = midi(notes[pattern[q]])
        sig = 0.6 * np.sign(np.sin(2 * np.pi * f * t)) + 0.4 * saw(f * t * 1.003)
        cut = 1400 + 1800 * (0.5 + 0.5 * np.sin(b * 0.37 + q * 0.2))
        sig = lp(sig, cut) * np.exp(-t * 14)
        pan = 0.5 + 0.35 * np.sin(q * 0.9 + b)
        add(arp[:, 0], t0, sig * (1 - pan), 0.06)
        add(arp[:, 1], t0, sig * pan, 0.06)
# ping-pong delay on arp
dl = int(BEAT * 0.75 * SR)
for k in range(1, 4):
    arp[dl * k:, 0] += arp[:-dl * k, 1] * 0.35 ** k
    arp[dl * k:, 1] += arp[:-dl * k, 0] * 0.35 ** k

# ---------- drums ----------
kn = int(0.45 * SR)
kt = np.arange(kn) / SR
kick_s = np.sin(2 * np.pi * (45 * kt + (110 / 18) * (1 - np.exp(-kt * 18)))) * np.exp(-kt * 7.5)
kick_s += 0.25 * np.exp(-kt * 80) * rng.standard_normal(kn) * 0.3
hn = int(0.09 * SR)
hat_s = hp(rng.standard_normal(hn), 7000) * np.exp(-np.arange(hn) / SR * 55)
for b in range(nbars):
    for q in range(4):
        t0 = b * BAR + q * BEAT
        add(kick, t0, kick_s, 0.55)
        add(hat, t0 + BEAT / 2, hat_s, 0.10)
        add(hat, t0 + BEAT * 0.75, hat_s, 0.045)

# ---------- apply automation ----------
A = [automation(i) for i in range(5)]
music = pad * A[0][:, None] + (bass * A[1])[:, None] + arp * A[2][:, None] \
    + (kick * A[3])[:, None] + (hat * A[4])[:, None]

# sidechain pump from kick positions (only where kick active)
beat_ph = (np.arange(N) / SR) % BEAT
pump = 1 - 0.35 * A[3] * np.exp(-beat_ph * 9)
music[:, 0] *= pump
music[:, 1] *= pump

# ---------- SFX ----------
sfx = np.zeros((N, 2))


def riser(tend, dur=1.6, g=0.12):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = rng.standard_normal(n)
    # sweep a band-pass by chunks
    out = np.zeros(n)
    chunks = 32
    for c in range(chunks):
        a, b2 = c * n // chunks, (c + 1) * n // chunks
        fc = 300 * (20 ** (c / chunks))
        out[a:b2] = bp(x[max(0, a - 2000):b2], fc * 0.7, min(fc * 1.4, 20000))[-(b2 - a):]
    out *= (t / dur) ** 2
    add(sfx[:, 0], tend - dur, out, g)
    add(sfx[:, 1], tend - dur, out[::-1][::-1] * 0.9, g)


def impact(t0, g=0.5):
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * (38 * t + 60 / 6 * (1 - np.exp(-t * 6)))) * np.exp(-t * 2.4)
    noise = lp(rng.standard_normal(n), 2500) * np.exp(-t * 9) * 0.5
    s = boom + noise
    add(sfx[:, 0], t0, s, g)
    add(sfx[:, 1], t0, s, g)


def glitch(t0, dur=0.3, g=0.12):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    hold = 60 + int(rng.random() * 200)
    x = np.repeat(x[::hold], hold)[:n]
    x = np.round(x * 3) / 3
    gate = (np.sin(np.arange(n) / SR * 2 * np.pi * (18 + rng.random() * 30)) > 0).astype(float)
    s = bp(x * gate, 400, 6000)
    add(sfx[:, 0], t0, s, g)
    add(sfx[:, 1], t0 + 0.01, s, g * 0.8)


def click(t0, g=0.05):
    n = int(0.02 * SR)
    s = hp(rng.standard_normal(n), 2000) * np.exp(-np.arange(n) / SR * 400)
    add(sfx[:, 0], t0, s, g)
    add(sfx[:, 1], t0, s, g)


def thump(t0, g=0.5):
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * 52 * t) * np.exp(-t * 14) * np.minimum(1, t / 0.005)
    add(sfx[:, 0], t0, s, g)
    add(sfx[:, 1], t0, s, g)


def chime(t0, f=880, g=0.08):
    n = int(2.2 * SR)
    t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * m * t) * np.exp(-t * (2 + m)) / m for m in (1, 2.01, 3.03))
    add(sfx[:, 0], t0, s, g)
    add(sfx[:, 1], t0 + 0.012, s, g)


for i, s in enumerate(TL['scenes']):
    if i > 0:
        riser(s['start'], 1.5, 0.10)
        impact(s['start'], 0.42)
        glitch(s['start'] - 0.05, 0.35, 0.10)
# random micro glitches matching the visual rule
for slot in range(int(DUR / 0.2)):
    x = np.sin(slot * 127.1 + 77 * 311.7 + 17.13) * 43758.5453
    if x - np.floor(x) > 0.965:
        glitch(slot * 0.2, 0.18, 0.05)
# title drop
impact(SCN['title']['start'] + 0.05, 0.6)
# stamps & key hits (times from engine cues)
L = {}
for l in TL['lines']:
    L.setdefault(l['scene'], []).append(l['start'])
hits = [
    (L['open'][0] - 2.0, 'bell'),
    (L['open'][1] + 3.0, 'chime'),
    (L['title'][1] + 0.5, 'chime'),
    (L['kernel'][0] + 7.0, 'chime'),
    (L['kernel'][1] + 1.5, 'bell'),
    (L['threshold'][1] + 9.0, 'stamp'),
    (L['invisible'][1] + 7.0, 'chime'),
    (L['current'][1] + 1.5, 'bell'),
    (L['snapshots'][1] + 3.0, 'chime'),
    (L['orthogonal'][1] + 0.5, 'chime'),
    (L['search'][1] + 1.0, 'bell'),
    (L['sparse'][1] + 0.5, 'chime'),
    (L['golden'][1] + 3.0, 'stamp'),
    (L['ladder'][1] + 2.0, 'chime'),
    (L['finale'][1] + 0.3, 'bell'),
]


def bell(t0, f=196.0, g=0.16):
    n = int(6.0 * SR)
    tt = np.arange(n) / SR
    parts = [(0.5, 1.0, 0.9), (1.0, 0.8, 0.6), (1.183, 0.6, 0.9), (1.506, 0.45, 1.2), (2.0, 0.3, 1.6), (2.74, 0.2, 2.2)]
    s0 = sum(a * np.sin(2 * np.pi * f * m * tt + m) * np.exp(-tt * d * 0.7) for m, a, d in parts)
    s0 *= np.minimum(1, tt / 0.004)
    add(sfx[:, 0], t0, s0, g)
    add(sfx[:, 1], t0 + 0.015, s0, g * 0.9)


for t0, kind in hits:
    if kind == 'stamp':
        impact(t0, 0.28)
        glitch(t0, 0.2, 0.07)
    elif kind == 'bell':
        bell(t0)
    else:
        chime(t0, 660, 0.09)
# finale: long chord swell at end card
fin_end = TL['duration']
bell(L['finale'][1] + 6.5, 146.8, 0.2)

bed = music + sfx
# fades
fade_in = np.minimum(1, np.arange(N) / (1.5 * SR))
fade_out = np.minimum(1, (N - np.arange(N)) / (3.5 * SR))
bed *= (fade_in * fade_out)[:, None]
bed = np.tanh(bed * 1.1) / 1.1
sf.write(os.path.join(HERE, 'music_bed.wav'), bed.astype(np.float32), SR)

# ---------- ducking & final mixes ----------
voice, vsr = sf.read(os.path.join(HERE, 'narration.wav'), dtype='float32')
assert vsr == SR
voice = np.pad(voice, (0, max(0, N - len(voice))))[:N]
vpk = np.max(np.abs(voice)) + 1e-9
voice = voice / vpk * 0.8
def movavg(x, w):
    c = np.cumsum(np.concatenate([[0.0], x]))
    half = w // 2
    idx = np.arange(len(x))
    lo = np.clip(idx - half, 0, len(x))
    hi = np.clip(idx + half, 0, len(x))
    return (c[hi] - c[lo]) / np.maximum(1, hi - lo)


envw = int(0.05 * SR)
rms = np.sqrt(movavg(voice.astype(np.float64) ** 2, envw))
active = (rms > 0.01).astype(float)
# smooth attack/release
sm = movavg(active, int(0.35 * SR))
duck = 1 - 0.55 * np.clip(sm * 1.5, 0, 1)
voiced = bed * duck[:, None] * 0.9 + np.stack([voice, voice], 1)
voiced /= max(1.0, np.max(np.abs(voiced)) / 0.95)
sf.write(os.path.join(HERE, 'mix_voice.wav'), voiced.astype(np.float32), SR)
mo = bed * 1.25
mo /= max(1.0, np.max(np.abs(mo)) / 0.95)
sf.write(os.path.join(HERE, 'mix_music.wav'), mo.astype(np.float32), SR)


def db(x):
    return 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)


print('dur', DUR, 'bed rms dB', round(db(bed), 1), 'voice rms dB', round(db(voice[voice != 0]), 1),
      'mix peak', round(float(np.max(np.abs(voiced))), 3))
