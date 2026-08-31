const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

// 1. Add perspective to scene-stage
content = content.replace(
  /className="scene-stage sticky top-0 h-\[100dvh\] w-full overflow-hidden text-white"/g,
  'className="scene-stage sticky top-0 h-[100dvh] w-full overflow-hidden text-white" style={{ perspective: "1400px" }}'
);

// 2. Replace the old CSS rules
const oldCss = `    .s-parallax { transform: translateY(calc((0.5 - var(--p)) * 40px * var(--parallax-mult))); }
    
    .s-single-bottle {
      filter: blur(calc((1 - var(--p-mat)) * 34px + var(--p-dis) * 30px));
      opacity: calc(var(--p-mat) - var(--p-dis));
      transform: scale(calc(1.10 - (var(--p-mat) * 0.10)));
    }`;

const newCss = `
    .beer-scene {
      --p-entry: clamp(0, var(--p) / 0.38, 1);
      --p-entry-eased: pow(var(--p-entry), 0.4);
      
      --p-settled: clamp(0, (var(--p) - 0.38) / 0.34, 1);
      --p-exit: clamp(0, (var(--p) - 0.72) / 0.28, 1);
      
      --p-glow-in: clamp(0, (var(--p) - 0.10) / 0.28, 1);
      --p-glow-out: clamp(0, (var(--p) - 0.86) / 0.14, 1);
      --glow: calc(var(--p-glow-in) - var(--p-glow-out));
      
      --p-op-out: clamp(0, (var(--p) - 0.86) / 0.14, 1);
      --b-opacity: calc(var(--p-entry-eased) - var(--p-op-out));
      
      --b-s: calc(0.42 + 0.58 * var(--p-entry-eased) + 0.04 * var(--p-settled) + 0.86 * var(--p-exit));
      
      --b-z-val: calc(-900px * (1 - var(--p-entry-eased)) + 520px * var(--p-exit));
      --b-y: calc(140px * (1 - var(--p-entry-eased)) - 90px * var(--p-exit));
      
      --b-ry-val: calc(-48deg * (1 - var(--p-entry-eased)) - 7deg + 14deg * var(--p-settled));
      --b-rz: calc(-14deg * (1 - var(--p-entry-eased)) + 9deg * var(--p-exit));
      
      --b-blur-val: calc(70px * (1 - var(--p-entry-eased)) + 80px * var(--p-exit));
    }

    @media (max-width: 767px) {
      .beer-scene {
        --b-z-val: calc(-450px * (1 - var(--p-entry-eased)) + 260px * var(--p-exit));
        --b-ry-val: 0deg;
        --b-blur-val: calc(35px * (1 - var(--p-entry-eased)) + 40px * var(--p-exit));
      }
      .bottle-sheen { display: none !important; }
    }

    .s-bottle-outer {
      transform-style: preserve-3d;
      transform: translateY(var(--b-y)) translateZ(var(--b-z-val)) rotateY(var(--b-ry-val)) rotateZ(var(--b-rz)) scale(var(--b-s));
      opacity: var(--b-opacity);
      will-change: transform, filter, opacity;
    }

    .s-bottle-inner {
      transform-style: preserve-3d;
      transform-origin: 50% 60%;
      animation: float-bottle 4s ease-in-out infinite alternate;
    }

    .beer-scene:not([data-in="true"]) .s-bottle-inner {
      animation-play-state: paused !important;
    }

    @keyframes float-bottle {
      0% { transform: translateY(-10px); }
      100% { transform: translateY(10px); }
    }

    .s-single-bottle {
      transform-style: preserve-3d;
      transform-origin: 50% 60%;
      filter: blur(var(--b-blur-val)) 
              drop-shadow(0 0 calc(30px * var(--glow)) var(--bottle-color)) 
              drop-shadow(0 0 calc(90px * var(--glow)) var(--bottle-color));
      will-change: filter;
    }

    .bottle-sheen {
      position: absolute; 
      inset: 0; 
      pointer-events: none;
      background: linear-gradient(105deg,
        transparent 38%,
        rgba(255,255,255,.75) 48%,
        rgba(255,255,255,.95) 50%,
        rgba(255,255,255,.75) 52%,
        transparent 62%);
      mix-blend-mode: screen;
      -webkit-mask-image: var(--bottle-img);
      mask-image: var(--bottle-img);
      -webkit-mask-size: contain; 
      mask-size: contain;
      -webkit-mask-repeat: no-repeat; 
      mask-repeat: no-repeat;
      -webkit-mask-position: center; 
      mask-position: center;
      background-size: 260% 100%;
      background-position: calc((var(--p) - 0.1) * 420%) 0;
    }

    .s-contact-shadow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, calc((100dvh - var(--header-h, 84px) - 140px) / 2));
      width: calc(300px / max(0.42, var(--b-s, 1)));
      height: 20px;
      background: radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 70%);
      opacity: calc(0.6 * (1 - var(--p-exit, 0)));
      pointer-events: none;
    }`;

content = content.replace(oldCss, newCss);

// 3. Replace the bottle JSX structure
const oldJsx = `                {/* Center Column - Bottle */}
                <div className="flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible">
                  
                  <div className="s-parallax flex justify-center items-center relative w-full">
                    <div className="absolute inset-0 s-single-glow rounded-full blur-[50px] lg:blur-[80px] w-[60%] left-[20%] top-[20%] aspect-square" style={{ backgroundColor: b.color }} />
                    <img src={b.img} alt={b.name} className="s-single-bottle drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10" style={{ maxHeight: 'calc(100dvh - var(--header-h, 84px) - 140px)', width: 'auto', objectFit: 'contain', pointerEvents: 'auto' }} />
                  </div>
                  
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 -rotate-90 origin-center font-black tracking-tighter opacity-20 pointer-events-none mix-blend-overlay hidden lg:block s-vert-style whitespace-nowrap" style={{ color: b.color }}>
                    {b.style}
                  </div>

                </div>`;

const newJsx = `                {/* Center Column - Bottle */}
                <div className="flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible" style={{ '--bottle-color': b.color, '--bottle-img': \`url(\${b.img})\` } as any}>
                  
                  {/* Keep the background haze */}
                  <div className="absolute inset-0 rounded-full blur-[50px] lg:blur-[80px] w-[60%] left-[20%] top-[20%] aspect-square opacity-30" style={{ backgroundColor: b.color }} />

                  {/* Contact Shadow */}
                  <div className="s-contact-shadow" />

                  {/* OUTER scroll-driven wrapper */}
                  <div className="s-bottle-outer flex justify-center items-center relative w-full h-full">
                    
                    {/* INNER keyframe wrapper */}
                    <div className="s-bottle-inner flex justify-center items-center relative w-full h-full">
                      <img src={b.img} alt={b.name} className="s-single-bottle relative z-10" style={{ maxHeight: 'calc(100dvh - var(--header-h, 84px) - 140px)', width: 'auto', objectFit: 'contain', pointerEvents: 'auto' }} />
                      <div className="bottle-sheen" />
                    </div>

                  </div>
                  
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 -rotate-90 origin-center font-black tracking-tighter opacity-20 pointer-events-none mix-blend-overlay hidden lg:block s-vert-style whitespace-nowrap" style={{ color: b.color }}>
                    {b.style}
                  </div>

                </div>`;

content = content.replace(oldJsx, newJsx);

fs.writeFileSync('src/components/OurBeers.tsx', content);
console.log("Updated bottle animations.");
