const fs = require('fs');

// HopStormHero.tsx
let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');
hero = hero.replace(/const \{ intro, reduced \} = useIntro\(\);/, "const { step, reduced } = useIntro();");

hero = hero.replace(/introStyle\(intro, 28, 120, 8, reduced\)/, "introStyle(step < 1, 28, 0, 8, reduced)");
hero = hero.replace(/introStyle\(intro, 20, 260, 0, reduced\)/, "introStyle(step < 2, 20, 0, 0, reduced)");
hero = hero.replace(/introStyle\(intro, 16, 380, 0, reduced\)/, "introStyle(step < 3, 16, 0, 0, reduced)");
hero = hero.replace(/introStyle\(intro, 16, 460, 0, reduced\)/, "introStyle(step < 3, 16, 80, 0, reduced)");
hero = hero.replace(/introStyle\(intro, 16, 540, 0, reduced\)/, "introStyle(step < 3, 16, 160, 0, reduced)");

hero = hero.replace(/opacity: intro \? 0 : 1/, "opacity: step < 3 ? 0 : 1");
hero = hero.replace(/opacity: intro \? 0\.5 : 0/, "opacity: step < 3 ? 0.5 : 0");

fs.writeFileSync('src/components/HopStormHero.tsx', hero);

// Navbar.tsx
let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
nav = nav.replace(/const \{ intro, reduced \} = useIntro\(\);/, "const { step, reduced } = useIntro();");
nav = nav.replace(/intro \? 'bg-transparent py-6'/g, "step < 3 ? 'bg-transparent py-6'");
nav = nav.replace(/introStyle\(intro, -16, 0, 0, reduced\)/g, "introStyle(step < 3, -16, 0, 0, reduced)");
fs.writeFileSync('src/components/Navbar.tsx', nav);
