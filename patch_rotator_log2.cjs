const fs = require('fs');
let content = fs.readFileSync('src/components/EnjoyRotator.tsx', 'utf8');

content = content.replace(
  'if (useFallback) {',
  'if (useFallback) {\n    console.log("ROTATOR USING FALLBACK", {loadedCount});'
);
fs.writeFileSync('src/components/EnjoyRotator.tsx', content);
