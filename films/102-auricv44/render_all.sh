#!/bin/bash
# Render every frame in parallel headless-Chromium workers -> seg_{i}.mp4, plus cover.jpg
set -euo pipefail
cd "$(dirname "$0")"
python3 build.py
export FFMPEG=${FFMPEG:-$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")}
PORT=${PORT:-$(python3 -c "import socket;s=socket.socket();s.bind(('127.0.0.1',0));print(s.getsockname()[1]);s.close()")}
export PORT
python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV' EXIT
sleep 1
kill -0 "$SRV" 2>/dev/null || { echo "http server failed on port $PORT" >&2; exit 1; }
pids=()
for w in 0 1 2; do node render.js $w 3 > r$w.log 2>&1 & pids+=($!); done
for p in "${pids[@]}"; do wait "$p"; done
grep done r0.log r1.log r2.log
node poster.js
