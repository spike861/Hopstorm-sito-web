const fs = require('fs');

let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');

// 1. Replace the state initialization with one that adds an event listener.
const stateReplacement = `const [isMobile, setIsMobile] = React.useState<boolean>(() => typeof window !== 'undefined' ? window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(hover: none) and (pointer: coarse)").matches : false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia("(max-width: 768px)");
    const pointerMql = window.matchMedia("(hover: none) and (pointer: coarse)");
    const handler = () => {
      setIsMobile(mql.matches || pointerMql.matches);
    };
    mql.addEventListener("change", handler);
    pointerMql.addEventListener("change", handler);
    return () => {
      mql.removeEventListener("change", handler);
      pointerMql.removeEventListener("change", handler);
    };
  }, []);`;

hero = hero.replace(
  /const \[isMobile\] = React\.useState<boolean>\(\(\) => typeof window !== 'undefined' \? window\.matchMedia\("\(max-width: 768px\)"\)\.matches \|\| window\.matchMedia\("\(hover: none\) and \(pointer: coarse\)"\)\.matches : false\);/,
  stateReplacement
);

// 2. Change the massive useEffect dependency from [] to [isMobile]
// We can use a regex that matches the end of the useEffect block.
hero = hero.replace(
  /window\.removeEventListener\("touchend", onTouchEnd\);\n[\s]*ro\.disconnect\(\);\n[\s]*cancelAnimationFrame\(rAF\);\n[\s]*\};\n[\s]*\}, \[\]\);/,
  `window.removeEventListener("touchend", onTouchEnd);
      ro.disconnect();
      cancelAnimationFrame(rAF);
    };
  }, [isMobile]);`
);

fs.writeFileSync('src/components/HopStormHero.tsx', hero);
