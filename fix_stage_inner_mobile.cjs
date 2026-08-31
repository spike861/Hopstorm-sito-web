const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

content = content.replace(
  `style={{ paddingTop: 'calc(var(--header-h, 72px) + 20px)', paddingBottom: '32px' }}>`,
  `style={{ paddingTop: 'calc(var(--header-h, 72px) + 20px)', paddingBottom: '32px', zIndex: 0 }}>`
);

content = content.replace(
  `className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-16 lg:items-stretch lg:justify-center min-h-[100dvh] lg:h-full w-full s-card-gap pb-12 lg:pb-0"`,
  `className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-16 lg:items-stretch lg:justify-center min-h-[100dvh] lg:h-full w-full gap-[clamp(10px,1.6vh,18px)] lg:gap-0 pb-12 lg:pb-0 relative z-0"`
);

// We need to keep the s-card-gap on mobile? The user said "full width, gap clamp(10px, 1.6vh, 18px)".
// Actually, s-card-gap already has `gap: clamp(10px, 1.6vh, 20px);`. Let's just change it in the CSS.
const oldGap = `.s-card-gap { gap: clamp(10px, 1.6vh, 20px); }`;
const newGap = `.s-card-gap { gap: clamp(10px, 1.6vh, 18px); }`;
content = content.replace(oldGap, newGap);

fs.writeFileSync('src/components/OurBeers.tsx', content);
