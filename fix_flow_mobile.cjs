const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

const oldCss = `      .s-center-col {
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

const newCss = `      .s-center-col {
        position: relative !important;
        inset: auto !important;
        z-index: 2 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding-top: 0 !important;
        pointer-events: auto !important;
        height: clamp(340px, 50vh, 480px) !important;
        width: 100% !important;
        margin: clamp(4px, 1vh, 12px) 0 !important;
        flex: none !important;
        overflow: hidden !important;
        background: none !important;
      }
      .s-center-col .s-bottle-outer,
      .s-center-col .s-bottle-inner {
        position: relative !important;
        height: 100% !important;
        width: 100% !important;
        inset: auto !important;
      }
      .s-center-col img.s-single-bottle {
        height: 100% !important;
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
        background: rgba(10, 10, 10, 0.72) !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border: 1px solid rgba(255, 255, 255, 0.07) !important;
      }`;

content = content.replace(oldCss, newCss);
fs.writeFileSync('src/components/OurBeers.tsx', content);
