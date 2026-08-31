const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

const debugCode = `
    setTimeout(() => {
      const stage = document.querySelector(".scene-stage");
      if (stage) {
        let el = stage.parentElement, out = [];
        while (el && el !== document.documentElement) {
          const cs = getComputedStyle(el);
          if (cs.overflow !== "visible" || cs.overflowX !== "visible" ||
              cs.overflowY !== "visible" || cs.contain !== "none" ||
              cs.transform !== "none" || cs.filter !== "none") {
            out.push({ el: el.className || el.tagName, overflow: cs.overflow,
                       overflowX: cs.overflowX, overflowY: cs.overflowY,
                       contain: cs.contain, transform: cs.transform,
                       filter: cs.filter });
          }
          el = el.parentElement;
        }
        console.log("STICKY BLOCKERS:", out);
        console.log("stage position:", getComputedStyle(stage).position);
      }
      
      let minTop = 9999, maxTop = -9999;
      window.addEventListener("scroll", () => {
        const stage = document.querySelector(".scene-stage");
        if (!stage) return;
        const t = stage.getBoundingClientRect().top;
        minTop = Math.min(minTop, t); maxTop = Math.max(maxTop, t);
        console.log("stage top:", Math.round(t), "range:", Math.round(minTop), Math.round(maxTop));
      }, { passive: true });
    }, 2000);
`;

content = content.replace("sectionObs.observe(section);", "sectionObs.observe(section);" + debugCode);

fs.writeFileSync('src/components/OurBeers.tsx', content);
console.log("Added debug code");
