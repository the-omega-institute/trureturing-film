const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('http://127.0.0.1:8765/index.html'); await p.evaluate(() => window.ready);
  await p.evaluate(() => window.poster());
  await p.locator('#c').screenshot({ path: 'cover.jpg', type: 'jpeg', quality: 92 });
  console.log('ok', errs); await b.close();
})();
