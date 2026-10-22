#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
printf "file 'seg_0.mp4'\nfile 'seg_1.mp4'\nfile 'seg_2.mp4'\n" > segs.txt
"$FF" -y -loglevel error -f concat -safe 0 -i segs.txt -c copy video_only.mp4
"$FF" -y -loglevel error -i video_only.mp4 -i mix_voice.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart TRURETURING_narrated_EN_subs_ZH-EN.mp4
"$FF" -y -loglevel error -i video_only.mp4 -i mix_music.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart TRURETURING_music_only_subs_ZH-EN.mp4
ls -la TRURETURING_*.mp4
echo MUX_OK
