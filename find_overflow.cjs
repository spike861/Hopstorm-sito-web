const fs = require('fs');

function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.match(/overflow-x-hidden/) || content.match(/overflow-hidden/)) {
    console.log(`Found in ${file}`);
  }
}

checkFile('index.html');
checkFile('src/index.css');
checkFile('src/App.tsx');
checkFile('src/components/OurBeers.tsx');
