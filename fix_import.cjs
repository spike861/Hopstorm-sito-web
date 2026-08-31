const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

if (!content.includes('import EnjoyRotator')) {
  content = "import EnjoyRotator from './EnjoyRotator';\n" + content;
}

fs.writeFileSync('src/components/OurBeers.tsx', content);
