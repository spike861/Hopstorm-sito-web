const fs = require('fs');
let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');

hero = hero.replace(
  /const isMobileRef = useRef<boolean>\(typeof window !== 'undefined' \? window\.matchMedia\("\(max-width: 768px\)"\)\.matches \|\| window\.matchMedia\("\(hover: none\) and \(pointer: coarse\)"\)\.matches : false\);/,
  `const [isMobile] = React.useState<boolean>(() => typeof window !== 'undefined' ? window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(hover: none) and (pointer: coarse)").matches : false);`
);

hero = hero.replace(
  /className=\{`relative w-full bg-black overflow-hidden mx-auto \$\{isMobileRef\.current \? 'h-\[100dvh\]' : 'max-h-\[100vh\] aspect-\[16\/9\]'\}`\}/,
  "className={`relative w-full bg-black overflow-hidden mx-auto ${isMobile ? 'h-[100dvh]' : 'max-h-[100vh] aspect-[16/9]'}`}"
);

hero = hero.replace(
  /const isMobile = isMobileRef\.current;\n[\s]*const IDS = isMobile \? FRAME_IDS_MOBILE : FRAME_IDS_DESKTOP;/,
  `const IDS = isMobile ? FRAME_IDS_MOBILE : FRAME_IDS_DESKTOP;`
);

hero = hero.replace(
  /fit: isMobileRef\.current \? 0\.35 : 0\.15,\n[\s]*focal: isMobileRef\.current \? \{ x: 0\.5, y: 0\.40 \} : \{ x: 0\.5, y: 0\.45 \},/,
  `fit: isMobile ? 0.35 : 0.15,
      focal: isMobile ? { x: 0.5, y: 0.40 } : { x: 0.5, y: 0.45 },`
);

fs.writeFileSync('src/components/HopStormHero.tsx', hero);
