const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

// 1. Remove the "01/03" from above the title
content = content.replace(/<div className="font-mono text-\[10px\] lg:text-xs tracking-widest opacity-50 mb-1 lg:mb-2">0\{i\+1\}\/03<\/div>\n/g, "");

// 2. Change the section to scene-wrap and add scene-stage
const oldSection = /<section key=\{b\.name\} className="beer-scene relative h-\[100dvh\] w-full snap-start overflow-hidden text-white z-10" data-scene=\{sceneIdx\.toString\(\)\}>\n\s*<MicroLabels counter=\{`0\$\{i\+1\}\/03`\} \/>\n\s*<div className="relative w-full max-w-7xl mx-auto h-full px-4 lg:px-6"/g;

const newSection = `<section key={b.name} className="beer-scene scene-wrap relative h-[200vh] w-full snap-start z-10" data-scene={sceneIdx.toString()}>
            <div className="scene-stage sticky top-0 h-[100dvh] w-full overflow-hidden text-white">
            <MicroLabels counter={\`0\${i+1}/03\`} />
            
            <div className="relative w-full max-w-7xl mx-auto h-full px-4 lg:px-6"`;

content = content.replace(oldSection, newSection);

// 3. Close the scene-stage div
const oldSectionEnd = /<\/section>\n\s*\);\n\s*\}\)}/g;
const newSectionEnd = `</div>\n          </section>\n        );\n      })}`;
content = content.replace(oldSectionEnd, newSectionEnd);

fs.writeFileSync('src/components/OurBeers.tsx', content);
console.log("Fixed scenes");
