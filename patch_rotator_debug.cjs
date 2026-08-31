const fs = require('fs');
let content = fs.readFileSync('src/components/EnjoyRotator.tsx', 'utf8');

if (!content.includes('ctx!.fillText')) {
  content = content.replace(
    'ctx!.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);',
    'ctx!.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);\n          /* DEBUG */ ctx!.fillStyle="red"; ctx!.font="30px Arial"; ctx!.fillText(`p:${p.toFixed(3)} tar:${target.toFixed(1)} sm:${smooth.toFixed(1)} idx:${drawIdx}`, 50, 50);'
  );
  fs.writeFileSync('src/components/EnjoyRotator.tsx', content);
}
