const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

const regex = /\{\/\* Center Column - Bottle \*\/\}\s*<div className="flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible">\s*<div className="s-parallax absolute inset-0 flex justify-center items-center pointer-events-none">\s*<div className="absolute inset-0 s-single-glow[^>]+><\/div>\s*<img[^>]+>\s*<div className="absolute left-0 top-1\/2 -translate-y-1\/2 -translate-x-8 -rotate-90 origin-center font-black tracking-tighter opacity-20 pointer-events-none mix-blend-overlay hidden lg:block s-vert-style whitespace-nowrap"[^>]*>\s*\{b\.style\}\s*<\/div>\s*<\/div>/;

// Let's just do a string replacement to be safe.
