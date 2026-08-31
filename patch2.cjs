const fs = require('fs');

// introContext.ts
let ctx = fs.readFileSync('src/introContext.ts', 'utf8');
ctx = ctx.replace(/intro: true/, "step: 0");
fs.writeFileSync('src/introContext.ts', ctx);

// introStyle.ts
let style = fs.readFileSync('src/introStyle.ts', 'utf8');
style = style.replace(/intro: boolean/, "intro: boolean"); // the prompt says: introStyle's first argument becomes "is this element still hidden". So boolean is fine.
// But we need to use it with true/false, which is boolean.
// Wait, introStyle is already: export const introStyle = ( intro: boolean, y: number, delay = 0, blur = 0, reduced = false ) => ...
// Does introStyle need changing? No.
