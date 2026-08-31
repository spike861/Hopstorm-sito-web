const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

// Ingrandisci la bottiglia su mobile
content = content.replace(
    'height: clamp(220px, 34vh, 320px) !important;',
    'height: clamp(280px, 42vh, 400px) !important;'
);
content = content.replace(
    'margin: clamp(8px, 2vh, 20px) auto !important;',
    'margin: clamp(12px, 2.5vh, 24px) auto !important;'
);

// Aggiungi un bagliore (glow) ambientale diffuso per coprire anche le scritte, visibile SOLO su mobile
const targetJsx = `<div className="scene-stage sticky top-0 min-h-[100dvh] lg:h-[100dvh] h-auto w-full overflow-x-clip lg:overflow-hidden text-white" style={{ perspective: "1400px" }}>
            <MicroLabels counter={\`0\${i+1}/03\`} />`;

const replacementJsx = `<div className="scene-stage sticky top-0 min-h-[100dvh] lg:h-[100dvh] h-auto w-full overflow-x-clip lg:overflow-hidden text-white" style={{ perspective: "1400px" }}>
            
            {/* AMBIENT GLOW MOBILE ONLY - Colore diffuso sotto le scritte */}
            <div className="absolute inset-0 z-0 pointer-events-none block lg:hidden" style={{ background: \`radial-gradient(circle at center, \${b.color} 0%, transparent 85%)\`, opacity: 0.18 }} />

            <MicroLabels counter={\`0\${i+1}/03\`} />`;

content = content.replace(targetJsx, replacementJsx);

fs.writeFileSync('src/components/OurBeers.tsx', content);
console.log("Modifiche completate.");
