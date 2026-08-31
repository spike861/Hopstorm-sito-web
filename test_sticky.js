import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  
  // wait a bit for React to mount
  await page.waitForSelector('.sticky', {timeout: 5000}).catch(() => {});
  
  const result = await page.evaluate(() => {
    // try to force remove intro overrides if they are still there
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    
    const stage = document.querySelector(".sticky");
    if (!stage) return { error: "No .sticky found" };
    
    let el = stage.parentElement, out = [];
    while (el && el !== document.documentElement) {
      const cs = getComputedStyle(el);
      if (cs.overflow !== "visible" || cs.overflowX !== "visible" ||
          cs.overflowY !== "visible" || cs.contain !== "none" ||
          cs.transform !== "none" || cs.filter !== "none") {
        out.push({ el: el.className || el.tagName || el.id, overflow: cs.overflow,
                   overflowX: cs.overflowX, overflowY: cs.overflowY,
                   contain: cs.contain, transform: cs.transform,
                   filter: cs.filter });
      }
      el = el.parentElement;
    }
    
    const htmlCs = getComputedStyle(document.documentElement);
    if (htmlCs.overflow !== "visible" || htmlCs.overflowX !== "visible" || htmlCs.overflowY !== "visible") {
      out.push({ el: "HTML", overflow: htmlCs.overflow, overflowX: htmlCs.overflowX, overflowY: htmlCs.overflowY });
    }
    
    const bodyCs = getComputedStyle(document.body);
    if (bodyCs.overflow !== "visible" || bodyCs.overflowX !== "visible" || bodyCs.overflowY !== "visible") {
      out.push({ el: "BODY", overflow: bodyCs.overflow, overflowX: bodyCs.overflowX, overflowY: bodyCs.overflowY });
    }
    
    return { blockers: out };
  });
  
  console.log("STICKY BLOCKERS:", JSON.stringify(result.blockers, null, 2));
  
  await browser.close();
})();
