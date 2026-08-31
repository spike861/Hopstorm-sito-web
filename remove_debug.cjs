const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');
content = content.replace(/setTimeout\(\(\) => \{[\s\S]*?\}, 2000\);/g, "");
fs.writeFileSync('src/components/OurBeers.tsx', content);
