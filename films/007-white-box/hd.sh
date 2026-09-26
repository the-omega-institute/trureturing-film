#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
VF="hqdn3d=2:1.5:4:3"
for p in 1 2; do
  out=/dev/null; [ $p = 2 ] && out=v1080.mp4
  "$FF" -y -loglevel error -i video_only.mp4 -vf "$VF" -c:v libx264 -preset slow -b:v 1600k -pass $p -passlogfile p1080 -pix_fmt yuv420p -threads 4 -an -f mp4 $out
done
"$FF" -y -loglevel error -i v1080.mp4 -i mix_voice.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 128k -shortest -movflags +faststart TRURETURING_1080p_narrated.mp4
"$FF" -y -loglevel error -i v1080.mp4 -i mix_music.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 128k -shortest -movflags +faststart TRURETURING_1080p_music_only.mp4
ls -la TRURETURING_1080p_*.mp4; echo HD_OK
