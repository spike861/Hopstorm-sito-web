const fs = require('fs');
let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');

hero = hero.replace(
  /const isMobileRef = useRef<boolean>\(false\);\n[\s]*useEffect\(\(\) => \{\n[\s]*isMobileRef\.current = window\.matchMedia\("\(max-width: 768px\)"\)\.matches \|\| window\.matchMedia\("\(hover: none\) and \(pointer: coarse\)"\)\.matches;\n[\s]*\}, \[\]\);/,
  `const isMobileRef = useRef<boolean>(typeof window !== 'undefined' ? window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(hover: none) and (pointer: coarse)").matches : false);`
);

fs.writeFileSync('src/components/HopStormHero.tsx', hero);
