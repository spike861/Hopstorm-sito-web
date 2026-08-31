const fs = require('fs');
let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');

// Replace the media query in useState
hero = hero.replace(
  /window\.matchMedia\("\(max-width: 768px\)"\)/g,
  'window.matchMedia("(max-aspect-ratio: 1/1)")'
);

fs.writeFileSync('src/components/HopStormHero.tsx', hero);
