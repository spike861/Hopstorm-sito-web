import re

with open('src/components/HopStormHero.tsx', 'r') as f:
    content = f.read()

old_h1 = """          <h1 
            className="absolute top-[14%] left-0 right-0 px-6 flex flex-col items-center text-center md:static md:px-0 md:block text-[clamp(2rem,11vw,3.25rem)] md:text-9xl leading-[0.95] md:leading-[1] tracking-[-0.02em] md:tracking-tighter font-bold text-white/90 mb-6 drop-shadow-2xl"
            style={{
              ...introStyle(step < 1, 28, 0, 8, reduced),
              WebkitMaskImage: isMobile ? "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 84%, rgba(0,0,0,0) 100%)" : undefined,
              maskImage: isMobile ? "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 84%, rgba(0,0,0,0) 100%)" : undefined,
              textShadow: isMobile ? "0 2px 18px rgba(0,0,0,0.55)" : undefined,
            }}
          >
            <span className="block md:inline">NON È PER</span>{" "}
            <span className="block md:inline">TUTTI.</span>
          </h1>"""

new_h1 = """          <h1 
            className="absolute top-[14%] left-0 right-0 px-6 flex flex-col items-center text-center md:static md:px-0 md:block text-[clamp(2rem,11vw,3.25rem)] md:text-9xl leading-[0.95] md:leading-[1] tracking-[-0.02em] md:tracking-tighter font-bold text-white/90 mb-6 drop-shadow-2xl"
            style={{
              ...introStyle(step < 1, 28, 0, 8, reduced),
              WebkitMaskImage: isMobile ? "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 84%, rgba(0,0,0,0) 100%)" : undefined,
              maskImage: isMobile ? "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 84%, rgba(0,0,0,0) 100%)" : undefined,
              textShadow: isMobile ? "0 2px 18px rgba(0,0,0,0.55)" : undefined,
            }}
          >
            <span className="sr-only">Hop Storm — Birrificio Artigianale a Roma. </span>
            <span className="block md:inline" aria-hidden="true">NON È PER</span>{" "}
            <span className="block md:inline" aria-hidden="true">TUTTI.</span>
          </h1>"""

if old_h1 in content:
    content = content.replace(old_h1, new_h1)
    with open('src/components/HopStormHero.tsx', 'w') as f:
        f.write(content)
        print("Patched!")
else:
    print("Could not find old_h1")

