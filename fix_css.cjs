const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');
content = content.replace(/body \{/, "html, body {\n  overflow-x: clip;\n}\n\nbody {");
fs.writeFileSync('src/index.css', content);
