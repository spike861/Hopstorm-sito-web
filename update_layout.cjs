const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

// We need to fix the grid layout and the bottle scale
content = content.replace(/lg:grid-cols-\[1fr_auto_1fr\]/g, "lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-16");
content = content.replace(/maxHeight: 'calc\(100dvh - var\(--header-h, 84px\) - 96px\)'/g, "maxHeight: 'calc(100dvh - var(--header-h, 84px) - 140px)'");

// Reduce the max font size for the title
content = content.replace(/xl:text-7xl/g, "xl:text-6xl");

// Fix the vertical text so it doesn't overlap to the left too much
content = content.replace(/-translate-x-12 -rotate-90 origin-center/g, "-translate-x-8 -rotate-90 origin-center");

// Also reduce the s-vert-style font size a bit
content = content.replace(/font-size: clamp\(28px, 6vh, 64px\);/g, "font-size: clamp(24px, 5vh, 56px);");

fs.writeFileSync('src/components/OurBeers.tsx', content);
console.log("Replaced grid and sizes");
