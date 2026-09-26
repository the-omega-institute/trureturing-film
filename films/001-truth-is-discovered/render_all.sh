#!/bin/bash
# Render every frame in 3 parallel headless-Chromium workers -> seg_{0,1,2}.mp4
set -euo pipefail
cd "$(dirname "$0")"
python3 build.py
export FFMPEG=${FFMPEG:-$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")}
python3 -m http.server 8765 --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV' EXIT
sleep 1
node render.js 0 3 > r0.log 2>&1 & node render.js 1 3 > r1.log 2>&1 & node render.js 2 3 > r2.log 2>&1 &
wait %2 %3 %4
grep done r0.log r1.log r2.log
