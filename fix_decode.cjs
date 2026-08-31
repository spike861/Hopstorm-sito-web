const fs = require('fs');
let content = fs.readFileSync('src/components/EnjoyRotator.tsx', 'utf8');

content = content.replace(
  `        img.onload = () => { frames[i] = img; loadedCount++; res(); };\n        img.onerror = () => res();\n        img.src = rotUrl(i, loadWidth);`,
  `        img.src = rotUrl(i, loadWidth);\n        img.decode().then(() => {\n          frames[i] = img;\n          loadedCount++;\n          res();\n        }).catch(() => res());`
);

fs.writeFileSync('src/components/EnjoyRotator.tsx', content);
