const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

// Replace items-center with items-stretch on the grid
content = content.replace(/lg:grid-cols-\[1fr_auto_1fr\] lg:gap-8 xl:gap-16 items-center/g, "lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-16 items-stretch");

// Take the text out of s-parallax so it doesn't move and get clipped
// s-parallax becomes a wrapper just around the image and glow
content = content.replace(
  /<div className="s-parallax flex flex-1 justify-center relative z-20 w-full min-h-0 h-full lg:h-auto items-center overflow-visible">/g,
  `<div className="flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible">
                  <div className="s-parallax absolute inset-0 flex justify-center items-center pointer-events-none">`
);

content = content.replace(
  /style={{ maxHeight: 'calc\\(100dvh - var\\(--header-h, 84px\\) - 140px\\)', width: 'auto', objectFit: 'contain' }} \/>\n\s*<div className="absolute left-0/g,
  `style={{ maxHeight: 'calc(100dvh - var(--header-h, 84px) - 140px)', width: 'auto', objectFit: 'contain', pointerEvents: 'auto' }} />
                  </div>
                  
                  <div className="absolute left-0`
);

fs.writeFileSync('src/components/OurBeers.tsx', content);
console.log("Fixed grid and text");
