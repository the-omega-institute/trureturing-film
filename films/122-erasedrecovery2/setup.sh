#!/bin/bash
# Fetch build-time dependencies (fonts from npm, Kokoro TTS model from GitHub releases, Python packages).
set -euo pipefail
cd "$(dirname "$0")"
pip install kokoro-onnx soundfile scipy numpy pillow imageio-ffmpeg
mkdir -p models fonts
[ -f models/kokoro-v1.0.onnx ] || curl -L -o models/kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
[ -f models/voices-v1.0.bin ] || curl -L -o models/voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
cd fonts
for p in @fontsource/orbitron@5.3.0 @fontsource/jetbrains-mono@5.3.0 @fontsource/noto-sans-sc@5.3.0 @fontsource/rajdhani@5.3.0; do npm pack "$p" >/dev/null; done
for f in *.tgz; do d=${f%.tgz}; [ -d "$d" ] || { tar xzf "$f"; mv package "$d"; }; done
echo SETUP_OK
