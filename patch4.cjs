const fs = require('fs');

let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');
hero = hero.replace(/if \(intro\) \{/g, "if (step < 3) {");
hero = hero.replace(/intro \? 0 : 1/g, "step < 3 ? 0 : 1");
hero = hero.replace(/\[intro\]\)/g, "[step]");
fs.writeFileSync('src/components/HopStormHero.tsx', hero);

let introStyle = fs.readFileSync('src/introStyle.ts', 'utf8');
introStyle = "import React from 'react';\n" + introStyle;
fs.writeFileSync('src/introStyle.ts', introStyle);
