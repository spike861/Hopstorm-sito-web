const fs = require('fs');
let content = fs.readFileSync('src/components/EnjoyRotator.tsx', 'utf8');

content = content.replace(
  `        img.src = rotUrl(i, loadWidth);\n        img.decode().then(() => {\n          frames[i] = img;\n          loadedCount++;\n          res();\n        }).catch(() => res());`,
  `        img.onload = () => {\n          frames[i] = img;\n          loadedCount++;\n          res();\n        };\n        img.onerror = () => res();\n        img.src = rotUrl(i, loadWidth);`
);

fs.writeFileSync('src/components/EnjoyRotator.tsx', content);
