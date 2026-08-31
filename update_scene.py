import re

with open('src/components/OurBeers.tsx', 'r') as f:
    content = f.read()

# Define replacement
new_block = """      {/* SCENES 2, 3, 4: SINGOLE BIRRE */}
      {BEERS.map((b, i) => {
        const sceneIdx = i + 2;
        return (
          <section key={b.name} className="beer-scene relative h-[100dvh] w-full snap-start overflow-hidden text-white z-10" data-scene={sceneIdx.toString()}>
            <MicroLabels counter={`0${i+1}/03`} />
            
            <div className="relative w-full max-w-7xl mx-auto h-full px-4 lg:px-6"
                 style={{ paddingTop: 'calc(var(--header-h, 84px) + 24px)', paddingBottom: '32px' }}>
              
              <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-center h-full w-full s-card-gap">
                
                {/* Left Column */}
                <div className="flex flex-col justify-center s-card-gap z-10 min-h-0 w-full lg:w-auto">
                  <div className="s-single-name shrink-0">
                    <div className="font-mono text-[10px] lg:text-xs tracking-widest opacity-50 mb-1 lg:mb-2">0{i+1}/03</div>
                    <h2 className="text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tighter leading-[0.9] mb-1 lg:mb-2">
                      {b.name}
                    </h2>
                    <div className="text-lg lg:text-xl xl:text-3xl font-bold tracking-widest uppercase mb-2 lg:mb-4 s-single-style-enter" style={{ color: b.color }}>{b.style}</div>
                  </div>
                  
                  {b.details && (
                    <div className="flex flex-col s-card-gap shrink-0 min-h-0">
                      <div className="bg-white/5 s-card-pad rounded-2xl border border-white/10 backdrop-blur-md s-single-spec-enter">
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1 lg:mb-2 opacity-80" style={{ color: b.color }}>Stile</div>
                        <p className="font-medium leading-relaxed opacity-90 s-card-text">{b.details.stile}</p>
                      </div>
                      
                      <div className="bg-white/5 s-card-pad rounded-2xl border border-white/10 backdrop-blur-md s-single-spec-enter s-card-tall-only" style={{ transitionDelay: 'calc(90ms * var(--anim-speed))' }}>
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1 lg:mb-2 opacity-80" style={{ color: b.color }}>Luppoli</div>
                        <div className="flex flex-col gap-2 lg:gap-3">
                          {b.details.luppoli.map(l => (
                            <div key={l.name}>
                              <div className="font-bold mb-0.5 s-card-text text-white">{l.name}</div>
                              <div className="opacity-70 leading-relaxed s-card-text-sm">{l.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Center Column - Bottle */}
                <div className="s-parallax flex flex-1 justify-center relative z-20 w-full min-h-0 h-full lg:h-auto items-center overflow-visible">
                  <div className="absolute inset-0 s-single-glow rounded-full blur-[50px] lg:blur-[80px] w-[60%] left-[20%] top-[20%] aspect-square" style={{ backgroundColor: b.color }} />
                  <img src={b.img} alt={b.name} className="s-single-bottle drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10" style={{ maxHeight: 'calc(100dvh - var(--header-h, 84px) - 96px)', width: 'auto', objectFit: 'contain' }} />
                  
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 -rotate-90 origin-center font-black tracking-tighter opacity-20 pointer-events-none mix-blend-overlay hidden lg:block s-vert-style whitespace-nowrap" style={{ color: b.color }}>
                    {b.style}
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col justify-center z-10 w-full lg:w-auto s-card-gap min-h-0">
                  {b.details && (
                    <>
                      <div className="bg-white/5 s-card-pad rounded-2xl border border-white/10 backdrop-blur-md s-single-spec-enter shrink-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-2 lg:mb-3 opacity-80" style={{ color: b.color }}>Profilo Tecnico</div>
                        <div className="flex flex-col gap-2 lg:gap-3">
                          <div className="grid grid-cols-[1fr_2.5fr] gap-2 items-start">
                             <span className="text-[9px] lg:text-[10px] font-bold uppercase opacity-60 tracking-wider mt-0.5">Aspetto</span>
                             <span className="font-medium leading-relaxed opacity-90 s-card-text">{b.details.tecnico.aspetto}</span>
                          </div>
                          <div className="grid grid-cols-[1fr_2.5fr] gap-2 items-start">
                             <span className="text-[9px] lg:text-[10px] font-bold uppercase opacity-60 tracking-wider mt-0.5">Aroma</span>
                             <span className="font-medium leading-relaxed opacity-90 s-card-text">{b.details.tecnico.aroma}</span>
                          </div>
                          <div className="grid grid-cols-[1fr_2.5fr] gap-2 items-start">
                             <span className="text-[9px] lg:text-[10px] font-bold uppercase opacity-60 tracking-wider mt-0.5">Gusto</span>
                             <span className="font-medium leading-relaxed opacity-90 s-card-text">{b.details.tecnico.gusto}</span>
                          </div>
                          <div className="flex flex-wrap gap-4 lg:gap-6 mt-1 lg:mt-2 pt-3 lg:pt-4 relative">
                             <div className="absolute top-0 left-0 w-full h-px bg-white/10 s-single-hairline-enter" />
                             <div><span className="text-[8px] lg:text-[9px] uppercase opacity-60 block tracking-widest mb-0.5">ABV</span><span className="font-bold s-card-text text-white">{b.abv}</span></div>
                             <div><span className="text-[8px] lg:text-[9px] uppercase opacity-60 block tracking-widest mb-0.5">IBU</span><span className="font-bold s-card-text text-white">{b.ibu}</span></div>
                             <div><span className="text-[8px] lg:text-[9px] uppercase opacity-60 block tracking-widest mb-0.5">Temp</span><span className="font-bold s-card-text text-white">5-8°C</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 s-card-pad rounded-2xl border border-white/10 backdrop-blur-md s-single-spec-enter shrink-0" style={{ transitionDelay: 'calc(90ms * var(--anim-speed))' }}>
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1 lg:mb-2 opacity-80" style={{ color: b.color }}>Profilo Sensoriale</div>
                        <div className="flex flex-wrap gap-1.5 lg:gap-2">
                          {b.details.sensoriale.map(s => (
                            <span key={s} className="px-2 lg:px-3 py-1 lg:py-1.5 bg-white/10 rounded-full font-medium s-card-text-sm border border-white/5">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/5 text-white s-card-pad rounded-2xl border border-white/10 backdrop-blur-md s-single-spec-enter s-card-tall-only shrink-0" style={{ transitionDelay: 'calc(180ms * var(--anim-speed))' }}>
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1 lg:mb-2 opacity-80" style={{ color: b.color }}>Abbinamenti</div>
                        <div className="flex flex-wrap gap-1.5 lg:gap-2">
                          {b.details.abbinamenti.map(a => (
                            <span key={a} className="px-2 lg:px-3 py-1 bg-white/10 rounded-full font-bold uppercase tracking-wider s-card-text-sm">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })"""

# Find the start and end of the block to replace
start_idx = content.find("      {/* SCENES 2, 3, 4: SINGOLE BIRRE */}")
end_idx = content.find("      {/* SCENE 5: SCEGLI */}")

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_block + "\n\n" + content[end_idx:]
    with open('src/components/OurBeers.tsx', 'w') as f:
        f.write(new_content)
    print("Success")
else:
    print("Failed to find boundaries")
