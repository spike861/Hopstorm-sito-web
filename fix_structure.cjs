const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

const oldStructure = `                {/* Center Column - Bottle */}
                <div className="flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible">
                  <div className="s-parallax absolute inset-0 flex justify-center items-center pointer-events-none">
                  <div className="absolute inset-0 s-single-glow rounded-full blur-[50px] lg:blur-[80px] w-[60%] left-[20%] top-[20%] aspect-square" style={{ backgroundColor: b.color }} />
                  <img src={b.img} alt={b.name} className="s-single-bottle drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10" style={{ maxHeight: 'calc(100dvh - var(--header-h, 84px) - 140px)', width: 'auto', objectFit: 'contain' }} />
                  
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 -rotate-90 origin-center font-black tracking-tighter opacity-20 pointer-events-none mix-blend-overlay hidden lg:block s-vert-style whitespace-nowrap" style={{ color: b.color }}>
                    {b.style}
                  </div>
                </div>`;

const newStructure = `                {/* Center Column - Bottle */}
                <div className="flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible">
                  
                  <div className="s-parallax flex justify-center items-center relative w-full">
                    <div className="absolute inset-0 s-single-glow rounded-full blur-[50px] lg:blur-[80px] w-[60%] left-[20%] top-[20%] aspect-square" style={{ backgroundColor: b.color }} />
                    <img src={b.img} alt={b.name} className="s-single-bottle drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10" style={{ maxHeight: 'calc(100dvh - var(--header-h, 84px) - 140px)', width: 'auto', objectFit: 'contain', pointerEvents: 'auto' }} />
                  </div>
                  
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 -rotate-90 origin-center font-black tracking-tighter opacity-20 pointer-events-none mix-blend-overlay hidden lg:block s-vert-style whitespace-nowrap" style={{ color: b.color }}>
                    {b.style}
                  </div>

                </div>`;

content = content.replace(oldStructure, newStructure);
fs.writeFileSync('src/components/OurBeers.tsx', content);
