#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
VF="hqdn3d=3:2:6:5,scale=1280:720:flags=lanczos"
"$FF" -y -loglevel error -i video_only.mp4 -vf "$VF" -c:v libx264 -preset slow -b:v 440k -pass 1 -passlogfile p720 -pix_fmt yuv420p -threads 4 -an -f mp4 /dev/null
"$FF" -y -loglevel error -i video_only.mp4 -vf "$VF" -c:v libx264 -preset slow -b:v 440k -pass 2 -passlogfile p720 -pix_fmt yuv420p -threads 4 -an v720.mp4
"$FF" -y -loglevel error -i v720.mp4 -i mix_voice.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 96k -shortest -movflags +faststart TRURETURING_720p_narrated.mp4
"$FF" -y -loglevel error -i v720.mp4 -i mix_music.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 96k -shortest -movflags +faststart TRURETURING_720p_music_only.mp4
ls -la TRURETURING_720p_*.mp4
echo SMALL_OK
