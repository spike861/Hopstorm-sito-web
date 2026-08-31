import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => {
    if (msg.text().includes('STICKY BLOCKERS') || msg.text().includes('stage top')) {
      console.log(msg.text());
    }
  });

  await page.goto('http://localhost:3000');
  
  // wait for intro and react
  await page.waitForSelector('.scene-stage', {timeout: 5000}).catch(() => {});
  
  await page.evaluate(() => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
  });
  
  await new Promise(r => setTimeout(r, 2500)); // wait for debug code timeout
  
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => window.scrollBy(0, 200));
    await new Promise(r => setTimeout(r, 100));
  }
  
  await browser.close();
})();
