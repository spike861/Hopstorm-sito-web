const fs = require('fs');

let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');

hero = hero.replace(
  /className="relative w-full max-h-\[100vh\] aspect-\[16\/9\] bg-black overflow-hidden mx-auto"/,
  "className={`relative w-full bg-black overflow-hidden mx-auto ${isMobileRef.current ? 'h-[100dvh]' : 'max-h-[100vh] aspect-[16/9]'}`}"
);

fs.writeFileSync('src/components/HopStormHero.tsx', hero);
