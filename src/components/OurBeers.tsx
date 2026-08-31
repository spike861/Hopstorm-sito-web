import EnjoyRotator from './EnjoyRotator';
import React, { useEffect, useRef, useState } from 'react';

const BlurEdgeText = ({ text, color, delayOffset = 0, charDelay = 90, className = "" }: { text: string, color?: string, delayOffset?: number, charDelay?: number, className?: string }) => {
  let charCount = 0;
  return (
    <span aria-label={text} className={`blur-edge-wrapper ${className}`}>
      {text.split(' ').map((word, wIdx, arr) => (
        <span key={wIdx} className="inline-block whitespace-nowrap" style={{ color }}>
          {word.split('').map((char, cIdx) => (
            <span 
              key={cIdx} 
              aria-hidden="true" 
              className="blur-edge-char inline-block"
              style={{ '--char-idx': charCount++, '--delay-offset': `${delayOffset}ms`, '--char-delay': `${charDelay}ms` } as any}
            >
              {char}
            </span>
          ))}
          {wIdx < arr.length - 1 && (() => { charCount++; return <span className="inline-block">&nbsp;</span>; })()}
        </span>
      ))}
    </span>
  );
};

const BEERS = [
  { name: "Fresh Wave", style: "Helles",  abv: "5.0%", ibu: "18-22",
    ml: "330", tag: "Fresca e pulita", color: "#D4A24E",
    img: "https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025652/Progetto_senza_titolo_157_e0kgio.png",
    details: {
      stile: "Helles moderna: lager chiara, dorata e scorrevole. Profilo pulito, equilibrio delicato, grande bevibilità.",
      sensoriale: ["Pane fresco", "Cereale", "Miele leggero", "Erbaceo", "Agrumi", "Amaro gentile"],
      luppoli: [
        { name: "MAGNUM", desc: "amaro pulito e lineare, sfumature erbacee e speziate." },
        { name: "SAPHIR", desc: "aroma elegante, note floreali, agrumate e speziate." }
      ],
      tecnico: {
        aspetto: "Dorato brillante, limpido, schiuma bianca fine e persistente.",
        aroma: "Note erbacee e floreali leggere, cereale e miele.",
        gusto: "Attacco morbido e maltato, finale pulito e rinfrescante."
      },
      abbinamenti: ["Pizza", "Fritti", "Pesce leggero", "Aperitivi"]
    }
  },
  { name: "Red Moon",   style: "Red Ale", abv: "5.6%", ibu: "20-28",
    ml: "330", tag: "Maltata e intensa", color: "#C0392B",
    img: "https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025638/Progetto_senza_titolo_160_o8evpd.png",
    details: {
      stile: "Birra rossa ad alta fermentazione, un equilibrio perfetto tra malto e luppolo. Morbida e avvolgente, con un profilo maltato elegante e una chiusura equilibrata.",
      sensoriale: ["Caramello leggero", "Biscotto tostato", "Crosta di pane", "Malto tostato", "Erbaceo delicato", "Amaro equilibrato"],
      luppoli: [
        { name: "MAGNUM", desc: "amaro pulito e intenso, utile a bilanciare la componente maltata." },
        { name: "MALTO TOSTATO", desc: "regala il profilo aromatico della birra, con note di caramello, crosta di pane e lieve tostatura." }
      ],
      tecnico: {
        aspetto: "Rossa ramata intensa, limpida, schiuma beige fine e persistente.",
        aroma: "Prevalenza di malto tostato, caramello e crosta di pane, con una lieve nota erbacea.",
        gusto: "Equilibrio perfetto tra malto e luppolo, ingresso morbido e avvolgente, finale pulito ma persistente."
      },
      abbinamenti: ["Hamburger", "Carne alla griglia", "Salumi", "Formaggi stagionati", "Pizza saporita"]
    }
  },
  { name: "Enjoy",      style: "IPA",     abv: "7.2%", ibu: "45-60",
    ml: "330", tag: "Luppolata e agrumata", color: "#F08A24",
    img: "https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025646/Progetto_senza_titolo_159_phajgt.png",
    details: {
      stile: "Birra IPA ad alta fermentazione, colore dorato brillante. Un'esplosione di luppoli Citra e Mosaic che si chiude con un amaro pulito e persistente.",
      sensoriale: ["Agrumi (pompelmo, lime)", "Frutta tropicale", "Resinoso leggero", "Erbaceo", "Amaro deciso", "Finale persistente"],
      luppoli: [
        { name: "CITRA", desc: "note intense di agrumi e frutta tropicale (pompelmo, lime, mango)" },
        { name: "MOSAIC", desc: "profilo complesso con sentori tropicali, resinosi e leggermente erbacei" }
      ],
      tecnico: {
        aspetto: "Dorato brillante, leggermente velata, schiuma bianca persistente.",
        aroma: "Intenso e fresco, dominato da agrumi e frutta tropicale.",
        gusto: "Ingresso morbido, forte componente luppolata, finale amaro pulito e persistente."
      },
      abbinamenti: ["Hamburger", "Carne alla griglia", "Piatti speziati", "Street food", "Cucina etnica"]
    }
  },
];

const CornerBrackets = () => (
  <>
    <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 is-anim anim-bracket origin-top-left" />
    <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20 is-anim anim-bracket origin-top-right" />
    <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20 is-anim anim-bracket origin-bottom-left" />
    <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20 is-anim anim-bracket origin-bottom-right" />
  </>
);

const MicroLabels = ({ counter, color = "currentColor", invert = false, isScene1 = false }: any) => (
  <>
    <div className={`absolute top-8 left-12 text-[10px] font-mono tracking-[0.2em] uppercase rotate-90 origin-left hidden md:block is-anim anim-microlabel ${invert ? 'text-current' : 'text-white'}`}>HOP STORM</div>
    
    {isScene1 ? (
      <div className="absolute top-8 right-8 text-[10px] font-mono tracking-[0.2em] hidden md:block">
        <span className="absolute right-0 s1-c1 is-anim" style={{color: BEERS[0].color}}>01</span>
        <span className="absolute right-0 s1-c2 is-anim" style={{color: BEERS[1].color}}>02</span>
        <span className="absolute right-0 s1-c3 is-anim" style={{color: BEERS[2].color}}>03</span>
      </div>
    ) : (
      <div className={`absolute top-8 right-8 text-[10px] font-mono tracking-[0.2em] hidden md:block is-anim anim-microlabel ${invert ? 'text-current' : 'text-white'}`} style={{ color }}>{counter}</div>
    )}

    <div className={`absolute bottom-8 left-12 text-[10px] font-mono tracking-[0.2em] uppercase -rotate-90 origin-left hidden md:block is-anim anim-microlabel ${invert ? 'text-current' : 'text-white'}`}>BIRRIFICIO ARTIGIANALE</div>
  </>
);

export default function OurBeers() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const section = containerRef.current;
    
    // ENGINE A - ENTRANCE
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-in', 'true');
            const idx = parseInt(entry.target.getAttribute('data-scene') || '0', 10);
            setActiveScene(idx);
          } else {
            entry.target.removeAttribute('data-in');
          }
        });
      },
      { threshold: 0, rootMargin: "-25% 0px -25% 0px" }
    );
    
    const scenes = section.querySelectorAll('.beer-scene');
    scenes.forEach(s => observer.observe(s));
    
    // ENGINE B - SCROLL-LINKED
    let rafId: number;
    let isSectionInView = false;
    
    const sectionObs = new IntersectionObserver(([entry]) => {
      isSectionInView = entry.isIntersecting;
      if (isSectionInView) tick();
      else cancelAnimationFrame(rafId);
    }, { threshold: 0 });
    sectionObs.observe(section);
    

    
    const tick = () => {
      if (!isSectionInView) return;
      const scenesList = section.querySelectorAll('.beer-scene') as NodeListOf<HTMLElement>;
      if (scenesList.length > 0) {
        const wh = window.innerHeight;
        for (let i = 0; i < scenesList.length; i++) {
          const el = scenesList[i];
          const r = el.getBoundingClientRect();
          let targetP = 0;
          if (el.classList.contains('rot-wrap') || el.getAttribute('data-scene') === '0') {
            const scrollableDistance = r.height - wh;
            targetP = scrollableDistance > 0 ? Math.max(0, Math.min(1, -r.top / scrollableDistance)) : 0;
          } else {
            targetP = 1 - (r.top + r.height) / (wh + r.height);
            targetP = Math.max(0, Math.min(1, targetP));
          }
          
          let smooth = parseFloat(el.getAttribute('data-smooth-p') ?? targetP.toString());
          smooth += (targetP - smooth) * 0.12;
          el.setAttribute('data-smooth-p', smooth.toString());
          
          el.style.setProperty('--p', smooth.toFixed(4));
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    
    return () => {
      observer.disconnect();
      sectionObs.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  let bgColor = '#0A0A0A'; // Scene 0
  if (activeScene === 1) bgColor = '#0E0E0E'; // Scene 1
  else if (activeScene >= 2 && activeScene <= 4) bgColor = `color-mix(in srgb, ${BEERS[activeScene - 2].color} 15%, #0A0A0A)`;
  else if (activeScene === 5) bgColor = '#000000'; // Scene 5
  else if (activeScene === 6) bgColor = '#F2F2F0'; // Scene 6

  const styles = `
    :root {
      --anim-speed: 1.5;
      --header-h: 84px;
      --ease-out: cubic-bezier(.22, 1, .36, 1);
      --parallax-mult: 1;
      --translate-mult: 1;
    }
    
    .s-card-pad { padding: clamp(12px, 1.8vh, 22px); }
    .s-card-gap { gap: clamp(10px, 1.6vh, 18px); }
    .s-vert-style { font-size: clamp(24px, 5vh, 56px); }
    .s-card-text { font-size: clamp(12px, 1.5vh, 15px); }
    .s-card-text-sm { font-size: clamp(10px, 1.2vh, 13px); }
    
    @media (max-height: 899px) {
      .s-card-tall-only { display: none !important; }
    }
    @media (max-width: 767px) {
      :root {
        --parallax-mult: 0;
        --translate-mult: 0.5;
      }
    }

    /* BLUR EDGE REVEAL */
    .blur-edge-char {
      opacity: 0.35;
      filter: blur(9px);
      transition: opacity calc(90ms * var(--anim-speed)) linear, filter calc(90ms * var(--anim-speed)) linear;
      transition-delay: calc((var(--delay-offset, 0ms) + var(--char-idx) * var(--char-delay, 90ms)) * var(--anim-speed));
    }
    [data-in="true"] .blur-edge-char,
    .beer-scene[data-in="true"] .blur-edge-char {
      opacity: 1;
      filter: blur(0);
    }

    /* Common Micro elements */
    .anim-microlabel { opacity: 0; transform: translateY(calc(8px * var(--translate-mult))); transition: opacity calc(500ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1), transform calc(500ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1); }
    [data-in="true"] .anim-microlabel { opacity: 0.5; transform: translateY(0); }
    
    .anim-bracket { transform: scaleX(0) scaleY(0); transition: transform calc(400ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1); }
    [data-in="true"] .anim-bracket { transform: scaleX(1) scaleY(1); }

    /* Scene 0 - Apertura */
    .rot-wrap {
      position: relative;
      height: 260vh;
    }
    @media (max-width: 768px) {
      .rot-wrap {
        height: 200vh;
      }
    }
    .rot-stage {
      position: sticky;
      top: 0;
      height: 100dvh;
      overflow: hidden;
    }

    .s0-wave-char {
      --start: calc(0.50 + var(--line-delay, 0) + var(--i) * 0.012);
      --local: clamp(0, (var(--p) - var(--start)) / 0.10, 1);
      --inv-local: calc(1 - var(--local));
      --ripple: calc(sin(calc(var(--p) * 1080deg + var(--i) * 45deg)) * 3px);

      transform: translateY(calc(var(--inv-local) * -54px + var(--local) * var(--ripple)));
      opacity: var(--local);
      filter: blur(calc(var(--inv-local) * 10px));
      will-change: transform, opacity, filter;
    }

    .s0-accent {
      -webkit-text-fill-color: #D4A24E;
      color: #D4A24E;
      text-shadow: 0 0 26px #D4A24E;
    }

    /* Scene 1 - Lineup */
    [data-scene="1"] .s1-title { opacity: 1; filter: none; clip-path: none; transition: opacity calc(400ms * var(--anim-speed)); }
    [data-scene="1"] .s1-title-delay { transition-delay: calc(140ms * var(--anim-speed)); }

    [data-scene="1"] .s1-bottle { opacity: 1; filter: blur(0); transform: scale(1); transition: transform calc(300ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1); }
    [data-scene="1"][data-in="true"] .s1-bottle { opacity: 1; filter: blur(0); transform: scale(1); }
    
    [data-scene="1"] .s1-glow { opacity: 0; transform: scale(0.6); }
    @keyframes s1-bloom {
      0% { opacity: 0; transform: scale(0.7); }
      55% { opacity: 0.55; transform: scale(1.1); }
      100% { opacity: 0.35; transform: scale(1); }
    }
    [data-scene="1"][data-in="true"] .s1-glow { animation: s1-bloom calc(450ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1) forwards; }
    
    [data-scene="1"] .s1-c1, [data-scene="1"] .s1-c2, [data-scene="1"] .s1-c3 { opacity: 0; filter: blur(8px); transition: opacity calc(130ms * var(--anim-speed)), filter calc(130ms * var(--anim-speed)); }
    @keyframes cSwap1 { 0%, 17% { opacity: 1; filter: blur(0); } 25%, 100% { opacity: 0; filter: blur(8px); } }
    @keyframes cSwap2 { 0%, 8% { opacity: 0; filter: blur(8px); } 17%, 34% { opacity: 1; filter: blur(0); } 42%, 100% { opacity: 0; filter: blur(8px); } }
    @keyframes cSwap3 { 0%, 25% { opacity: 0; filter: blur(8px); } 34%, 100% { opacity: 1; filter: blur(0); } }
    [data-scene="1"][data-in="true"] .s1-c1 { animation: cSwap1 calc(1.6s * var(--anim-speed)) forwards; }
    [data-scene="1"][data-in="true"] .s1-c2 { animation: cSwap2 calc(1.6s * var(--anim-speed)) forwards; }
    [data-scene="1"][data-in="true"] .s1-c3 { animation: cSwap3 calc(1.6s * var(--anim-speed)) forwards; }

    [data-scene="1"] .s1-pill { transform: scaleX(0); transform-origin: left; transition: transform calc(380ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1); }
    [data-scene="1"][data-in="true"] .s1-pill { transform: scaleX(1); }

    [data-scene="1"] .delay-0 { transition-delay: 0ms; animation-delay: 0ms; }
    [data-scene="1"] .delay-1 { transition-delay: calc(280ms * var(--anim-speed)); animation-delay: calc(280ms * var(--anim-speed)); }
    [data-scene="1"] .delay-2 { transition-delay: calc(560ms * var(--anim-speed)); animation-delay: calc(560ms * var(--anim-speed)); }

    /* Scenes 2, 3, 4 - Scheda Singola */
    [data-scene="2"], [data-scene="3"], [data-scene="4"] {
      --p-haze: clamp(0, var(--p) / 0.08, 1);
      --p-mat: clamp(0, (var(--p) - 0.08) / 0.30, 1);
      --p-name-in: clamp(0, (var(--p) - 0.38) / 0.06, 1);
      --p-style-in: clamp(0, (var(--p) - 0.40) / 0.06, 1);
      --p-spec-in: clamp(0, (var(--p) - 0.42) / 0.06, 1);
      --p-name-dis: clamp(0, (var(--p) - 0.72) / 0.10, 1);
      --p-dis: clamp(0, (var(--p) - 0.82) / 0.12, 1);
    }
    
    @media (max-width: 767px) {
      [data-scene="2"], [data-scene="3"], [data-scene="4"] {
        --p-haze: clamp(0, var(--p) / 0.05, 1);
        --p-mat: clamp(0, (var(--p) - 0.05) / 0.15, 1);
        --p-name-in: clamp(0, (var(--p) - 0.15) / 0.06, 1);
        --p-style-in: clamp(0, (var(--p) - 0.18) / 0.06, 1);
        --p-spec-in: clamp(0, (var(--p) - 0.20) / 0.06, 1);
        --p-name-dis: clamp(0, (var(--p) - 0.85) / 0.06, 1);
        --p-dis: clamp(0, (var(--p) - 0.90) / 0.06, 1);
      }
    }
    

    .beer-scene {
      --p-entry: clamp(0, var(--p) / 0.38, 1);
      --p-entry-eased: calc(var(--p-entry) * (2 - var(--p-entry)));
      
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
      
      /* Part A - Lineup */
      .s1-title-block { margin-bottom: clamp(16px, 3vh, 32px) !important; }
      .s1-lineup-row {
        height: clamp(320px, 48vh, 460px) !important;
        align-items: flex-end !important;
        gap: clamp(4px, 1.5vw, 14px) !important;
      }
      .s1-bottle-wrap { height: 100% !important; }
      .s1-bottle-wrap img {
        height: 100% !important;
        width: auto !important;
        object-fit: contain !important;
      }
      .s1-bottle-wrap:nth-child(2) img { transform: scale(1.08) translateY(12px); }
      .s1-bottle-wrap:nth-child(1) img, .s1-bottle-wrap:nth-child(3) img { transform: translateY(-8px); }
      .s1-glow { filter: blur(40px) !important; }

      /* Part B - Single Beer Band */
      .s-center-col {
        position: relative !important;
        inset: auto !important;
        z-index: 2 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding-top: 0 !important;
        pointer-events: auto !important;
        height: clamp(340px, 50vh, 480px) !important;
        width: 100% !important;
        margin: clamp(4px, 1vh, 12px) 0 !important;
        flex: none !important;
        overflow: hidden !important;
        background: none !important;
      }
      .s-center-col .s-bottle-outer,
      .s-center-col .s-bottle-inner {
        position: relative !important;
        height: 100% !important;
        width: 100% !important;
        inset: auto !important;
      }
      .s-center-col img.s-single-bottle {
        height: 100% !important;
        width: auto !important;
        max-height: none !important;
        object-fit: contain !important;
      }
      .s-center-col .s-contact-shadow {
        display: none !important;
      }
      .s-center-col .s-single-glow {
        display: block !important;
        opacity: 0.45 !important;
        filter: blur(60px) !important;
      }
      .s-single-bottle {
        filter: none !important;
        transform-style: flat !important;
        will-change: auto !important;
        opacity: 1 !important;
      }
      .s-bottle-outer,
      .s-bottle-inner {
        transform-style: flat !important;
      }
      .s-bottle-outer {
        opacity: var(--b-opacity);
      }
      .s-center-col {
        perspective: none !important;
      }
      
      /* Card backgrounds on mobile */
      .s-single-spec-enter {
        background: rgba(10, 10, 10, 0.72) !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border: 1px solid rgba(255, 255, 255, 0.07) !important;
      }
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
    }
    
    .s-single-name {
      opacity: calc(0.25 + var(--p-name-in) * 0.75 - var(--p-name-dis));
    }
    
    .s-single-style-enter { opacity: calc(var(--p-style-in) - var(--p-name-dis)); }
    
    .s-single-spec-enter { 
      opacity: calc(var(--p-spec-in) - var(--p-name-dis)); 
      transform: translateX(calc((1 - var(--p-spec-in)) * -14px * var(--translate-mult))); 
    }
    
    .s-single-hairline-enter { transform: scaleX(var(--p-spec-in)); transform-origin: left; }

    .s-single-glow {
      filter: blur(90px);
      opacity: calc((var(--p-haze) * 0.35 - var(--p-mat) * 0.1) * (1 - var(--p-dis)));
    }
    [data-scene][data-in="true"] .s-single-glow {
      animation: breathe-glow 7s ease-in-out infinite alternate;
    }
    @keyframes breathe-glow {
      0% { transform: translate(-50%, -50%) scale(1); filter: blur(90px) brightness(1); }
      100% { transform: translate(-50%, -50%) scale(1.06); filter: blur(90px) brightness(1.6); }
    }

    /* Scene 5 - Scegli */
    [data-scene="5"] .s5-headline { clip-path: inset(0 0 100% 0); filter: blur(8px); opacity: 0; transition: clip-path calc(800ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1), filter calc(800ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1), opacity calc(800ms * var(--anim-speed)); }
    [data-scene="5"][data-in="true"] .s5-headline { clip-path: inset(0); filter: blur(0); opacity: 1; }

    [data-scene="5"] .s5-watermark { opacity: 0; transform: translateY(calc((var(--p) - 0.5) * -80px * var(--parallax-mult))); transition: opacity calc(800ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1); }
    [data-scene="5"][data-in="true"] .s5-watermark { opacity: 0.06; }

    [data-scene="5"] .s5-col { transform: scaleY(0); transform-origin: bottom; transition: transform calc(600ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1); opacity: 1; }
    [data-scene="5"][data-in="true"] .s5-col { transform: scaleY(1); }

    [data-scene="5"] .s5-bottle { filter: blur(30px); opacity: 0; transform: scale(1.08); transition: filter calc(300ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1), opacity calc(300ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1), transform calc(300ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1); }
    [data-scene="5"][data-in="true"] .s5-bottle { filter: blur(0); opacity: 1; transform: scale(1); }
    
    [data-scene="5"] .s5-glow { opacity: 0; transition: opacity calc(600ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1); }
    [data-scene="5"][data-in="true"] .s5-glow { opacity: 0.35; }

    @media (hover: hover) {
      [data-scene="5"][data-in="true"] .group:hover .s5-bottle-wrap { transform: translateY(-10px); }
      [data-scene="5"][data-in="true"] .group:hover .s5-glow { opacity: 0.6 !important; }
      [data-scene="5"][data-in="true"] .group:hover .s5-col { filter: brightness(1.5); }
    }

    /* Scene 6 - Chiusura */
    .s6-grid { opacity: 0; transition: opacity calc(600ms * var(--anim-speed)) linear; }
    [data-scene="6"][data-in="true"] .s6-grid { opacity: 0.18; }
    
    .s6-wash {
      position: absolute; inset: 0; background: #F2F2F0; z-index: -1;
      opacity: 0; transition: opacity calc(800ms * var(--anim-speed)) linear;
    }
    [data-scene="6"][data-in="true"] .s6-wash { opacity: 1; }
    
    .s6-light-bar { opacity: 0; }
    [data-scene="6"][data-in="true"] .s6-light-bar { animation: bar-appear calc(10ms * var(--anim-speed)) linear forwards, pulse-bar calc(3s * var(--anim-speed)) alternate infinite; }
    @keyframes bar-appear { to { opacity: 0.5; } }
    @keyframes pulse-bar { 0% { opacity: 0.5; box-shadow: 0 0 10px #D4A24E; } 100% { opacity: 1; box-shadow: 0 0 30px #D4A24E; } }
    
    .s6-bloom-flash { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.6); width: 200px; height: 200px; background: radial-gradient(circle, #D4A24E 0%, transparent 70%); filter: blur(60px); opacity: 0; pointer-events: none; }
    [data-scene="6"][data-in="true"] .s6-bloom-flash { animation: bloom-flash calc(500ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1) calc(1005ms * var(--anim-speed)) forwards; }
    @keyframes bloom-flash { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); } 20% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.0); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.4); } }
    
    .s6-rings { opacity: 0; }
    [data-scene="6"][data-in="true"] .s6-rings { animation: rings-appear calc(10ms * var(--anim-speed)) linear calc(1005ms * var(--anim-speed)) forwards; }
    @keyframes rings-appear { to { opacity: 1; } }
    
    .s6-ring-radar { transform: scale(0.3); opacity: 0; border: 2px solid #D4A24E; border-radius: 50%; position: absolute; inset: 0; }
    [data-scene="6"][data-in="true"] .s6-ring-radar { animation: radar-ring calc(700ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1) calc(1005ms * var(--anim-speed)) forwards; }
    @keyframes radar-ring { 0% { transform: scale(0.3); opacity: 0.9; } 100% { transform: scale(2.2); opacity: 0; } }
    
    .s6-ring-sweep { animation: spin calc(6s * var(--anim-speed)) linear infinite; border-top-color: transparent !important; border-right-color: transparent !important; border-bottom-color: transparent !important; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    
    .s6-claim-line { transform: scaleX(0); transform-origin: left; box-shadow: 0 0 12px currentColor; transition: transform calc(400ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1) calc(1005ms * var(--anim-speed)); }
    [data-scene="6"][data-in="true"] .s6-claim-line { transform: scaleX(1); }
    
    .s6-dot { display: inline-block; transform: scale(0); color: #D4A24E; transition: transform calc(200ms * var(--anim-speed)) cubic-bezier(.16,1,.3,1) calc(1005ms * var(--anim-speed)); }
    [data-scene="6"][data-in="true"] .s6-dot { transform: scale(1); }
    
    .s6-cta { opacity: 0; filter: blur(12px); transform: scale(0.96); transition: opacity calc(400ms * var(--anim-speed)), filter calc(400ms * var(--anim-speed)), transform calc(400ms * var(--anim-speed)); transition-delay: calc(1400ms * var(--anim-speed)); }
    [data-scene="6"][data-in="true"] .s6-cta { opacity: 1; filter: blur(0); transform: scale(1); }

    /* Will-Change Optimizations */
    [data-in="true"] .s0-bottle, [data-in="true"] .s0-line1, [data-in="true"] .s1-bottle,
    [data-in="true"] .s-single-bottle, [data-in="true"] .s-single-name,
    [data-in="true"] .s5-bottle, [data-in="true"] .s5-headline,
    [data-in="true"] .s6-claim, [data-in="true"] .s6-wordmark {
       will-change: filter, transform, opacity, clip-path;
    }

    /* Pause infinite loops offscreen */
    .beer-scene:not([data-in="true"]) * {
      animation-play-state: paused !important;
    }
  `;

  return (
    <section 
      ref={containerRef} 
      id="le-nostre-birre"
      className="relative w-full snap-y snap-proximity"
    >
      <style>{styles}</style>

      {/* Background layer */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div 
          className="sticky top-0 w-full h-[100dvh] transition-colors ease-out"
          style={{ backgroundColor: bgColor, transitionDuration: 'calc(800ms * var(--anim-speed))' }}
        />
      </div>

      {/* SCENE 0: APERTURA */}
      <section className="rot-wrap beer-scene relative w-full snap-start" data-scene="0">
        <div className="rot-stage sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col md:flex-row items-center justify-center">
          <CornerBrackets />
          <MicroLabels counter="01/07" />
          <div 
            className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center h-full px-6"
            style={{ paddingTop: 'calc(var(--header-h, 72px) + 16px)', paddingBottom: '24px' }}
          >
            {/* Bottle (Order 1 on mobile, Order 1 on desktop) */}
            <div className="flex-1 flex justify-center md:justify-end order-1 md:order-1 mb-4 md:mb-0 md:pr-12 lg:pr-20">
              <div className="relative h-[54vh] md:h-[74vh] max-h-[700px]">
                <div className="absolute inset-0 rounded-full s0-glow opacity-50 scale-100" style={{ backgroundColor: BEERS[2].color, filter: 'blur(40px)' }} />
                <EnjoyRotator fallbackSrc={BEERS[2].img} alt={BEERS[2].name} className="relative h-full w-auto object-contain s0-bottle" />
              </div>
            </div>

            {/* Text (Order 2 on mobile, Order 2 on desktop) */}
            <div className="flex-1 flex justify-center md:justify-start order-2 md:order-2 text-center md:text-left">
              <h2 className="text-[clamp(2.4rem,7vw,7.5rem)] font-bold tracking-tighter leading-[0.85] text-white">
                <span className="block s0-line1 whitespace-nowrap">
                  {"BIRRA".split('').map((char, i) => (
                    <span
                      key={i}
                      className="s0-wave-char inline-block"
                      style={{ '--i': i, '--line-delay': '0' } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="block s0-line2 font-light italic s0-accent whitespace-nowrap">
                  {"ARTIGIANALE".split('').map((char, i) => (
                    <span
                      key={i}
                      className="s0-wave-char inline-block"
                      style={{ '--i': i, '--line-delay': '0.06' } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 1: LINEUP */}
      <section className="beer-scene relative min-h-[100dvh] h-[100dvh] w-full snap-start flex flex-col items-center justify-between overflow-hidden text-white" data-scene="1">
        <MicroLabels counter="03" color="#D4A24E" isScene1 />
        <div 
          className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-between h-full px-6 pt-[160px] md:pt-[210px] pb-6"
        >
          {/* TITLE BLOCK ABOVE */}
          <div className="text-center flex flex-col items-center s1-title-block shrink-0 z-30 mb-4">
            <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase mb-2 text-amber-400 font-semibold drop-shadow-md">
              Tre anime, un solo spirito
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white drop-shadow-lg uppercase">
              ESPLORA LA GAMMA
            </h2>
            <div className="flex gap-2 justify-center mt-3 h-[3px] w-32">
               {BEERS.map((b,i) => <div key={i} className={`flex-1 is-anim s1-pill delay-${i}`} style={{backgroundColor: b.color}}/>)}
            </div>
          </div>

          {/* BOTTLES LOWERED TO THE BOTTOM LIMIT */}
          <div className="flex flex-row justify-center gap-4 md:gap-14 lg:gap-20 w-full max-w-4xl md:max-w-6xl relative flex-1 min-h-0 items-end pb-2 s1-lineup-row z-10">
            {BEERS.map((b, i) => (
              <div key={b.name} className="flex-1 flex flex-col items-center h-full max-h-[48vh] md:max-h-[52vh] relative s1-bottle-wrap justify-end" style={{ background: 'none' }}>
                <div className="relative flex-1 flex items-end justify-center mb-2 md:mb-3 w-full min-h-0" style={{ background: 'none' }}>
                  <div className={`absolute inset-0 rounded-full is-anim s1-glow delay-${i}`} style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`, filter: 'blur(35px)', opacity: 0.35 }} />
                  <img src={b.img} alt={b.name} decoding="async" className={`relative h-full max-h-[38vh] md:max-h-[44vh] w-auto object-contain is-anim s1-bottle delay-${i}`} style={{ background: 'none' }} />
                </div>
                <div className={`text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] font-semibold text-center shrink-0`} style={{ color: b.color }}>{b.style}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENES 2, 3, 4: SINGOLE BIRRE (Force Sync) */}
      {BEERS.map((b, i) => {
        const sceneIdx = i + 2;
        return (
          <section key={b.name} className="beer-scene scene-wrap relative h-[200vh] w-full snap-start z-10" data-scene={sceneIdx.toString()}>
            <div className="scene-stage sticky top-0 min-h-[100dvh] lg:h-[100dvh] h-auto w-full overflow-hidden text-white" style={{ perspective: "1400px" }}>
            
            {/* AMBIENT GLOW MOBILE ONLY - Colore diffuso sotto le scritte */}
            <div className="absolute inset-0 z-0 pointer-events-none block lg:hidden" style={{ background: `radial-gradient(130% 70% at 50% 38%, color-mix(in srgb, ${b.color} 26%, transparent) 0%, color-mix(in srgb, ${b.color} 11%, transparent) 40%, transparent 74%)` }} />

            <MicroLabels counter={`0${i+1}/03`} />
            
            <div className="relative w-full max-w-7xl mx-auto h-full px-4 lg:px-6"
                 style={{ paddingTop: 'calc(var(--header-h, 72px) + 20px)', paddingBottom: '32px', zIndex: 0 }}>
              
              <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-16 lg:items-stretch lg:justify-center min-h-[100dvh] lg:h-full w-full gap-[clamp(10px,1.6vh,18px)] lg:gap-0 pb-12 lg:pb-0 relative z-0">
                
                {/* Left Column */}
                <div className="contents lg:flex lg:flex-col lg:justify-center s-card-gap z-10 min-h-0 w-full lg:w-auto">
                  <div className="s-single-name shrink-0 order-1 lg:order-none relative z-20">
                                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-[0.9] mb-1 lg:mb-2">
                      {b.name}
                    </h2>
                    <div className="text-lg lg:text-xl xl:text-3xl font-bold tracking-widest uppercase mb-2 lg:mb-4 s-single-style-enter" style={{ color: b.color }}>{b.style}</div>
                  </div>
                  
                  {b.details && (
                    <div className="flex flex-col s-card-gap shrink-0 min-h-0 order-3 lg:order-none w-full relative z-20">
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
                <div className="s-center-col order-2 lg:order-none flex flex-1 justify-center relative z-20 w-full min-h-0 h-full items-center overflow-visible" style={{ '--bottle-color': b.color, background: 'none' } as any}>
                  
                  {/* Keep the background haze */}
                  <div className="s-single-glow absolute inset-0 rounded-full blur-[50px] lg:blur-[80px] w-[60%] left-[20%] top-[20%] aspect-square opacity-30" style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)` }} />

                  {/* Contact Shadow */}
                  <div className="s-contact-shadow" />

                  {/* OUTER scroll-driven wrapper */}
                  <div className="s-bottle-outer flex justify-center items-center relative w-full h-full" style={{ background: 'none' }}>
                    
                    {/* INNER keyframe wrapper */}
                    <div className="s-bottle-inner flex justify-center items-center relative w-full h-full" style={{ background: 'none' }}>
                      <img src={b.img} alt={b.name} decoding="async" className="s-single-bottle relative z-10" style={{ maxHeight: 'calc(100dvh - var(--header-h, 84px) - 140px)', width: 'auto', objectFit: 'contain', pointerEvents: 'auto', background: 'none' }} />
                    </div>

                  </div>
                  
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 -rotate-90 origin-center font-black tracking-tighter opacity-20 pointer-events-none hidden lg:block s-vert-style whitespace-nowrap" style={{ color: b.color }}>
                    {b.style}
                  </div>

                </div>

                {/* Right Column */}
                <div className="contents lg:flex lg:flex-col lg:justify-center z-10 w-full lg:w-auto s-card-gap min-h-0">
                  {b.details && (
                    <div className="flex flex-col s-card-gap shrink-0 min-h-0 order-4 lg:order-none w-full relative z-20">
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          </section>
        );
      })}

      {/* SCENE 5: SCEGLI */}
      <section className="beer-scene relative min-h-[100dvh] w-full snap-start overflow-hidden text-white" data-scene="5">
        <CornerBrackets />
        <MicroLabels counter="06/07" />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-[clamp(15rem,40vw,30rem)] text-white pointer-events-none is-anim s5-watermark">
          03
        </div>
        
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4 pt-12 md:pt-20">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] md:text-7xl font-bold tracking-tighter mb-8 md:mb-16 z-20 is-anim s5-headline">
            SCEGLI LA TUA
          </h2>
          <div className="flex flex-row justify-center items-end gap-2 md:gap-16 h-[50vh] md:h-[60vh] w-full max-w-5xl z-20">
            {BEERS.map((b, i) => (
              <div key={b.name} className="group flex-1 flex flex-col items-center h-full relative cursor-pointer">
                <div className={`absolute bottom-[20%] w-[30%] h-full bg-gradient-to-t from-current to-transparent is-anim s5-col`} style={{ color: b.color, transitionDelay: `calc(${i * 160}ms * var(--anim-speed))` }} />
                
                <div className="relative flex-1 flex items-end justify-center mb-4 md:mb-6 w-full min-h-0 transition-transform md:group-hover:-translate-y-2" style={{ transitionDuration: 'calc(300ms * var(--anim-speed))', background: 'none' }}>
                  <div className={`absolute inset-0 rounded-full transition-all is-anim s5-glow s5-bottle`} style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`, filter: 'blur(35px)', transitionDelay: `calc(${800 + i * 160}ms * var(--anim-speed))`, transitionDuration: 'calc(300ms * var(--anim-speed))' }} />
                  <img src={b.img} alt={b.name} decoding="async" className={`relative h-full w-auto object-contain is-anim s5-bottle`} style={{ transitionDelay: `calc(${800 + i * 160}ms * var(--anim-speed))`, background: 'none' }} />
                </div>
                
                <div className={`text-center is-anim s5-headline`} style={{ transitionDelay: `calc(${800 + i * 160}ms * var(--anim-speed))` }}>
                  <div className="text-sm md:text-xl font-bold tracking-tight">{b.name}</div>
                  <div className="text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] mt-1 md:mt-2 opacity-60" style={{ color: b.color }}>{b.style}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 6: CHIUSURA */}
      <section className="beer-scene relative min-h-[100dvh] w-full snap-start overflow-hidden flex flex-col items-center justify-center text-[#0E0E0E] z-10" data-scene="6">
        <div className="s6-wash" />
        {/* We keep s6-grid here if needed, prompt says diagonal grid lines fade in */}
        <div className="absolute inset-0 s6-grid pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05)), linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05))', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 s6-rings">
           <div className="absolute w-[80vmin] h-[80vmin] border border-[#D4A24E]/30 rounded-full s6-ring-out" />
           <div className="absolute w-[60vmin] h-[60vmin] border border-[#D4A24E]/30 rounded-full s6-ring-in" />
           <div className="absolute w-[60vmin] h-[60vmin] border border-[#D4A24E]/30 rounded-full s6-ring-sweep" />
           <div className="s6-ring-radar" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#D4A24E] s6-light-bar shadow-[0_0_15px_#D4A24E] hidden lg:block" />

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="text-sm md:text-lg font-mono uppercase tracking-[0.3em] mb-4 text-[#D4A24E]">
            <BlurEdgeText text="ASSAGGIALE" delayOffset={0} />
          </div>
          
          <div className="relative inline-block">
            <div className="s6-bloom-flash" />
            <h2 className="text-[clamp(4rem,10vw,9rem)] font-bold tracking-tighter leading-none mb-2 text-black relative z-10 flex items-baseline justify-center">
              <BlurEdgeText text="TUTTE" delayOffset={670} color="#000000" />
              <span className="s6-dot leading-none">.</span>
            </h2>
            <div className="h-[2px] bg-[#D4A24E] w-full mb-8 s6-claim-line" />
          </div>
          
          <div className="s6-cta">
            <a href="#dove-trovarci" className="inline-flex bg-[#D4A24E] text-black hover:bg-[#C2903C] transition-colors px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider">
              Dove Trovarci
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
