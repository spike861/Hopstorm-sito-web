const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

// 1. Update the CSS for bottle band height, margin, and hide the .s-single-glow on mobile
content = content.replace(
  'height: clamp(280px, 42vh, 400px) !important;',
  'height: clamp(300px, 44vh, 420px) !important;'
);

content = content.replace(
  'margin: clamp(12px, 2.5vh, 24px) auto !important;',
  'margin: clamp(6px, 1.4vh, 14px) auto !important;'
);

content = content.replace(
  `.s-center-col .s-single-glow {
        inset: 0 !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
      }`,
  `.s-center-col .s-single-glow {
        display: none !important;
      }`
);

// 2. Update the Ambient Glow Layer
content = content.replace(
  /<div className="absolute inset-0 z-0 pointer-events-none block lg:hidden" style=\{\{ background: `radial-gradient\(circle at center, \$\{b\.color\} 0%, transparent 85%\)`, opacity: 0\.18 \}\} \/>/,
  `<div className="absolute inset-0 z-0 pointer-events-none block lg:hidden" style={{ background: \`radial-gradient(120% 65% at 50% 42%, color-mix(in srgb, \${b.color} 26%, transparent) 0%, color-mix(in srgb, \${b.color} 12%, transparent) 38%, transparent 72%)\` }} />`
);

// 3. Ensure cards and text are strictly above the background layer
content = content.replace(
  `className="s-single-name shrink-0 order-1 lg:order-none"`,
  `className="s-single-name shrink-0 order-1 lg:order-none relative z-10"`
);

content = content.replace(
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-3 lg:order-none w-full"`,
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-3 lg:order-none w-full relative z-10"`
);

content = content.replace(
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-4 lg:order-none w-full"`,
  `className="flex flex-col s-card-gap shrink-0 min-h-0 order-4 lg:order-none w-full relative z-10"`
);

fs.writeFileSync('src/components/OurBeers.tsx', content);
console.log("Fixes applied successfully.");
