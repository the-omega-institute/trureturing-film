"""Final mixes from music_bed.wav + narration.wav with measured ducking."""
import numpy as np, soundfile as sf
SR = 48000
bed, _ = sf.read('music_bed.wav', dtype='float64')
voice, _ = sf.read('narration.wav', dtype='float64')
N = len(bed); voice = np.pad(voice, (0, max(0, N - len(voice))))[:N]

def movavg(x, w):
    c = np.cumsum(np.concatenate([[0.0], x])); h = w // 2; i = np.arange(len(x))
    lo = np.clip(i - h, 0, len(x)); hi = np.clip(i + h, 0, len(x))
    return (c[hi] - c[lo]) / np.maximum(1, hi - lo)

def db(x): return 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)
rms = np.sqrt(movavg(voice ** 2, int(0.05 * SR)))
speech = rms > 0.02 * rms.max()
v_db = db(voice[speech]); b_db = db(bed.mean(1)[speech])
act = movavg(speech.astype(float), int(0.5 * SR))
duck = 1 - 0.6 * np.clip(act * 1.6, 0, 1)            # up to -8 dB while speaking
# choose bed gain so ducked bed sits 12 dB under speech
g = 10 ** ((v_db - 12 - (b_db + 20 * np.log10(0.4))) / 20)
mix = bed * (g * duck)[:, None] + voice[:, None]
target = -17.0
mix *= 10 ** ((target - db(mix.mean(1))) / 20)
mix = np.tanh(mix / 0.95) * 0.95
sf.write('mix_voice.wav', mix.astype(np.float32), SR)
mo = bed * 10 ** ((target + 1 - db(bed.mean(1))) / 20)
mo = np.tanh(mo / 0.95) * 0.95
sf.write('mix_music.wav', mo.astype(np.float32), SR)
m2 = mix.mean(1)
print('voice(speech) dB', round(v_db, 1), 'bed dB', round(b_db, 1), 'bed gain', round(20*np.log10(g), 1),
      '| in mix: speech-region bed', round(db((bed * (g*duck)[:, None]).mean(1)[speech]), 1), 'voice', round(db(voice[speech]),1),
      '| mix rms', round(db(m2), 1), 'peak', round(float(np.abs(mix).max()), 3), '| music-only rms', round(db(mo.mean(1)), 1))
