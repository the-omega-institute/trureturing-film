// usage: node render.js <worker> <nworkers>  -> seg_<worker>.mp4
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const FF = process.env.FFMPEG;
(async () => {
  const w = +process.argv[2], nw = +process.argv[3];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  await p.goto('http://127.0.0.1:8765/index.html');
  await p.evaluate(() => window.ready);
  const dur = await p.evaluate(() => window.DATA.timeline.duration);
  const total = Math.ceil(dur * 30);
  const per = Math.ceil(total / nw);
  const f0 = w * per, f1 = Math.min(total, f0 + per);
  const ff = spawn(FF, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-threads', '2', `seg_${w}.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = f0; f < f1; f++) {
    const b64 = await p.evaluate(t => { window.renderAt(t); return document.getElementById('c').toDataURL('image/jpeg', 0.95).slice(23); }, f / 30);
    const buf = Buffer.from(b64, 'base64');
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 300 === 0) console.log(`w${w} frame ${f - f0}/${f1 - f0} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  console.log(`w${w} done ${f1 - f0} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s errors=${errs.length}`, errs.slice(0, 3));
  await b.close();
})();
