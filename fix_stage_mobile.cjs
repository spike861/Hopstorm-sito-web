const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

// 1. Update scene-stage overflow
content = content.replace(
  `overflow-x-clip lg:overflow-hidden`,
  `overflow-hidden`
);

// 2. Update ambient glow
const oldGlow = `radial-gradient(120% 65% at 50% 42%, color-mix(in srgb, \${b.color} 26%, transparent) 0%, color-mix(in srgb, \${b.color} 12%, transparent) 38%, transparent 72%)`;
const newGlow = `radial-gradient(130% 70% at 50% 38%, color-mix(in srgb, \${b.color} 26%, transparent) 0%, color-mix(in srgb, \${b.color} 11%, transparent) 40%, transparent 74%)`;
content = content.replace(oldGlow, newGlow);

// 3. Update stage padding
content = content.replace(
  `paddingTop: 'calc(var(--header-h, 84px) + 24px)'`,
  `paddingTop: 'calc(var(--header-h, 72px) + 20px)'`
);

// 4. Update CSS block for Mobile
const oldMobileCssStart = `      /* Part B - Single Beer Band */`;
const oldMobileCssEnd = `      .s-center-col .s-single-glow {
        display: none !important;
      }`;
const oldMobileCss = content.substring(
  content.indexOf(oldMobileCssStart),
  content.indexOf(oldMobileCssEnd) + oldMobileCssEnd.length
);

const newMobileCss = `      /* Part B - Single Beer Band */
      .s-center-col {
        position: absolute !important;
        inset: 0 !important;
        z-index: 1 !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: center !important;
        padding-top: clamp(90px, 16vh, 150px) !important;
        pointer-events: none !important;
        height: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        flex: none !important;
        overflow: visible !important;
      }
      .s-center-col .s-bottle-outer,
      .s-center-col .s-bottle-inner {
        position: relative !important;
        height: auto !important;
        width: 100% !important;
        inset: auto !important;
      }
      .s-center-col img.s-single-bottle {
        height: clamp(380px, 56vh, 560px) !important;
        width: auto !important;
        max-height: none !important;
        object-fit: contain !important;
      }
      .s-center-col .s-contact-shadow {
        display: none !important;
      }
      .s-center-col .s-single-glow {
        display: none !important;
      }
      
      /* Card backgrounds on mobile */
      .s-single-spec-enter {
        background: rgba(10, 10, 10, 0.82) !important;
        backdrop-filter: blur(14px) saturate(1.1) !important;
        -webkit-backdrop-filter: blur(14px) saturate(1.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.07) !important;
      }`;

content = content.replace(oldMobileCss, newMobileCss);

// Remove title block relative z-10 on mobile so it becomes z-index: 2
content = content.replace(
  `className="s-single-name shrink-0 order-1 lg:order-none relative z-10"`,
  `className="s-single-name shrink-0 order-1 lg:order-none relative z-20"`
);

content = content.replace(
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-3 lg:order-none w-full relative z-10"`,
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-3 lg:order-none w-full relative z-20"`
);

content = content.replace(
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-4 lg:order-none w-full relative z-10"`,
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-4 lg:order-none w-full relative z-20"`
);

// Actually, wait, z-index 2 is z-20 in tailwind? z-10 is 10, z-20 is 20. z-10 is > 1. So it works.
// Let's replace the inner container of cards from bg-white/5 to just use the CSS class on mobile.
// Wait, the CSS class has !important, so it overrides bg-white/5! That's fine.

fs.writeFileSync('src/components/OurBeers.tsx', content);
