const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

if (!content.includes('import EnjoyRotator')) {
  content = content.replace(
    "import React, { useEffect, useState, useRef } from 'react';",
    "import React, { useEffect, useState, useRef } from 'react';\nimport EnjoyRotator from './EnjoyRotator';"
  );
}

content = content.replace(
  `<img src={BEERS[2].img} alt={BEERS[2].name} className="relative h-full w-auto object-contain drop-shadow-2xl is-anim s0-bottle" />`,
  `<EnjoyRotator fallbackSrc={BEERS[2].img} alt={BEERS[2].name} className="relative h-full w-auto object-contain drop-shadow-2xl is-anim s0-bottle" />`
);

fs.writeFileSync('src/components/OurBeers.tsx', content);
