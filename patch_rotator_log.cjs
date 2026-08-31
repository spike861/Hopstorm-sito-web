const fs = require('fs');
let content = fs.readFileSync('src/components/EnjoyRotator.tsx', 'utf8');

if (!content.includes('console.log("ROTATOR"')) {
  content = content.replace(
    'let drawIdx = Math.round(smooth) % ROT_N;',
    'let drawIdx = Math.round(smooth) % ROT_N;\n      if (Math.random() < 0.05) console.log("ROTATOR", {p, smooth, target, drawIdx, loadedCount});'
  );
  fs.writeFileSync('src/components/EnjoyRotator.tsx', content);
}
