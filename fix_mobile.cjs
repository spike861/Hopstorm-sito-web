const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

// 1. CSS Updates
const oldCss = `    @media (max-width: 767px) {
      .beer-scene {
        --b-z-val: calc(-450px * (1 - var(--p-entry-eased)) + 260px * var(--p-exit));
        --b-ry-val: 0deg;
        --b-blur-val: calc(35px * (1 - var(--p-entry-eased)) + 40px * var(--p-exit));
      }
      .bottle-sheen { display: none !important; }
    }`;

const newCss = `    @media (max-width: 767px) {
      .beer-scene {
        --b-z-val: calc(-450px * (1 - var(--p-entry-eased)) + 260px * var(--p-exit));
        --b-ry-val: 0deg;
        --b-blur-val: calc(35px * (1 - var(--p-entry-eased)) + 40px * var(--p-exit));
      }
      .bottle-sheen { display: none !important; }
      
      /* Part A - Lineup */
      .s1-title-block { margin-bottom: clamp(16px, 3vh, 32px) !important; }
      .s1-lineup-row {
        height: clamp(320px, 48vh, 460px) !important;
        align-items: flex-end !important;
        gap: clamp(4px, 1.5vw, 14px) !important;
      }
      .s1-bottle-wrap { height: 100% !important; }
      .s1-bottle-wrap img {
        height: 100% !important;
        width: auto !important;
        object-fit: contain !important;
      }
      .s1-bottle-wrap:nth-child(2) img { transform: scale(1.08) translateY(12px); }
      .s1-bottle-wrap:nth-child(1) img, .s1-bottle-wrap:nth-child(3) img { transform: translateY(-8px); }
      .s1-glow { filter: blur(40px) !important; }

      /* Part B - Single Beer Band */
      .s-center-col {
        position: relative !important;
        height: clamp(220px, 34vh, 320px) !important;
        margin: clamp(8px, 2vh, 20px) auto !important;
        width: 100% !important;
        flex: none !important;
        overflow: hidden !important;
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
        top: auto !important;
        bottom: 0 !important;
        transform: translate(-50%, 0) !important;
      }
      .s-center-col .s-single-glow {
        inset: 0 !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
      }
    }`;

content = content.replace(oldCss, newCss);

// 2. JSX Part A Updates
content = content.replace(
  `<div className="mb-6 md:mb-8 text-center flex flex-col items-center">`,
  `<div className="mb-6 md:mb-8 text-center flex flex-col items-center s1-title-block">`
);

content = content.replace(
  `<div className="flex flex-row items-end justify-center gap-2 md:gap-12 h-[50vh] md:h-[60vh] w-full max-w-4xl relative">`,
  `<div className="flex flex-row justify-center gap-2 md:gap-12 w-full max-w-4xl relative h-[50vh] md:h-[60vh] items-end s1-lineup-row">`
);

content = content.replace(
  /className="flex-1 flex flex-col items-center h-full relative"/g,
  `className="flex-1 flex flex-col items-center h-full relative s1-bottle-wrap"`
);

// 3. JSX Part B Updates
content = content.replace(
  /className="scene-stage sticky top-0 h-\[100dvh\] w-full overflow-hidden text-white"/g,
  `className="scene-stage sticky top-0 min-h-[100dvh] lg:h-[100dvh] h-auto w-full overflow-x-clip lg:overflow-hidden text-white"`
);

content = content.replace(
  /className="flex flex-col lg:grid lg:grid-cols-\[1fr_auto_1fr\] lg:gap-8 xl:gap-16 items-stretch justify-center h-full w-full s-card-gap"/g,
  `className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-16 lg:items-stretch lg:justify-center min-h-[100dvh] lg:h-full w-full s-card-gap pb-12 lg:pb-0"`
);

content = content.replace(
  /className="flex flex-col justify-center s-card-gap z-10 min-h-0 w-full lg:w-auto"/g,
  `className="contents lg:flex lg:flex-col lg:justify-center s-card-gap z-10 min-h-0 w-full lg:w-auto"`
);

content = content.replace(
  /className="s-single-name shrink-0"/g,
  `className="s-single-name shrink-0 order-1 lg:order-none"`
);

content = content.replace(
  /className="flex flex-col s-card-gap shrink-0 min-h-0"/g,
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-3 lg:order-none w-full"`
);

content = content.replace(
  /className="flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible"/g,
  `className="s-center-col order-2 lg:order-none flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible"`
);

content = content.replace(
  /className="absolute inset-0 rounded-full blur-\[50px\] lg:blur-\[80px\] w-\[60%\] left-\[20%\] top-\[20%\] aspect-square opacity-30"/g,
  `className="s-single-glow absolute inset-0 rounded-full blur-[50px] lg:blur-[80px] w-[60%] left-[20%] top-[20%] aspect-square opacity-30"`
);

// Right Column wrapper
content = content.replace(
  /className="flex flex-col justify-center z-10 w-full lg:w-auto s-card-gap min-h-0"/g,
  `className="contents lg:flex lg:flex-col lg:justify-center z-10 w-full lg:w-auto s-card-gap min-h-0"`
);

const rightColSearch = `                {/* Right Column */}
                <div className="contents lg:flex lg:flex-col lg:justify-center z-10 w-full lg:w-auto s-card-gap min-h-0">
                  {b.details && (
                    <>`;

const rightColReplace = `                {/* Right Column */}
                <div className="contents lg:flex lg:flex-col lg:justify-center z-10 w-full lg:w-auto s-card-gap min-h-0">
                  {b.details && (
                    <div className="flex flex-col s-card-gap shrink-0 min-h-0 order-4 lg:order-none w-full">`;

content = content.replace(rightColSearch, rightColReplace);

const rightColEndSearch = `                        </div>
                      </div>
                    </>
                  )}`;

const rightColEndReplace = `                        </div>
                      </div>
                    </div>
                  )}`;

content = content.replace(rightColEndSearch, rightColEndReplace);

fs.writeFileSync('src/components/OurBeers.tsx', content);
