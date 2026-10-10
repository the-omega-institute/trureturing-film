// usage: node shot.js t1 t2 ...  -> shots/t_<t>.jpg
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const b = await chromium.launch({ args: ['--disable-web-security'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('http://127.0.0.1:8765/index.html');
  await p.evaluate(() => window.ready);
  require('fs').mkdirSync('shots', { recursive: true });
  for (const a of process.argv.slice(2)) {
    const t = parseFloat(a);
    const t0 = Date.now();
    await p.evaluate(t => window.renderAt(t), t);
    const ms = Date.now() - t0;
    await p.locator('#c').screenshot({ path: `shots/t_${a}.jpg`, type: 'jpeg', quality: 80 });
    console.log(a, 'render ms', ms);
  }
  if (errs.length) console.log('ERRORS', errs.slice(0, 10));
  await b.close();
})();
