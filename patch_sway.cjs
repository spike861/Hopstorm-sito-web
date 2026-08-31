const fs = require('fs');

let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');

const swayReplacement = `const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    function targetFrame() {
      if (isTouchOnly && !moved) {
        const now = performance.now();
        targetX = 0.5 + 0.32 * Math.sin(now / 4200 * Math.PI * 2);
      }`;

hero = hero.replace(
  /const isTouchOnly = window\.matchMedia\("\(hover: none\) and \(pointer: coarse\)"\)\.matches;\n\n[\s]*function targetFrame\(\) \{\n[\s]*if \(isMobile && !moved\) \{\n[\s]*const now = performance\.now\(\);\n[\s]*targetX = 0\.5 \+ 0\.32 \* Math\.sin\(now \/ 4200 \* Math\.PI \* 2\);\n[\s]*\} else if \(isTouchOnly && !isMobile && !moved\) \{\n[\s]*\/\/ Fallback for tablet if not considered mobile\n[\s]*const phase = \(performance\.now\(\) \/ 8000\) \* Math\.PI \* 2;\n[\s]*const s = Math\.sin\(phase\) \* 0\.6;\n[\s]*const e = Math\.sign\(s\) \* Math\.pow\(Math\.abs\(s\), CONFIG\.easing\);\n[\s]*const a = CONFIG\.anchors;\n[\s]*return e < 0\n[\s]*\? a\.center \+ \(a\.left - a\.center\) \* -e\n[\s]*: a\.center \+ \(a\.right - a\.center\) \* e;\n[\s]*\}/,
  swayReplacement
);

fs.writeFileSync('src/components/HopStormHero.tsx', hero);
