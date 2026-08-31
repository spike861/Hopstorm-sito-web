import React, { useEffect, useRef } from 'react';
import { useIntro } from '../introContext';
import { introStyle } from '../introStyle';

export default function HopStormHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = React.useState<boolean>(() => { if (typeof window === 'undefined') return false; const isIOS = /iP(hone|ad|od)/.test(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document); return window.matchMedia('(max-width: 768px)').matches || isIOS; });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = () => { const isIOS = /iP(hone|ad|od)/.test(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document); setIsMobile(mql.matches || isIOS); };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  const { step, reduced } = useIntro();

  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;
    const canvas = hero.querySelector('canvas');
    
    if (step < 3) {
      hero.style.touchAction = "none";
    } else {
      const timer = setTimeout(() => {
        hero.style.touchAction = "auto";
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    /* ============================ CONFIG ============================ */
    const CONFIG = {
      cloudBase: "https://res.cloudinary.com/dcbomk6i8/image/upload",
      anchors: { left: 144, center: 72, right: 0 },
      smoothing: 0.14,
      easing: 0.85,
      fit: isMobile ? 0.35 : 0.15,
      focal: isMobile ? { x: 0.5, y: 0.40 } : { x: 0.5, y: 0.45 },
      maxUpscale: 1.0
    };
    const FRAME_IDS_DESKTOP = [
      "vwo695","bjgoht","tioru0","t87brs","kafm2d","shdyql","ivecs6","fgy7sb",
      "krouiq","odzlxv","korz1d","esgidb","vekphl","g7pvgo","qdxjiv","ljsh3q",
      "mdbgji","oxyphu","npskvt","l6smc9","jsghn9","qokrip","z2ukzf","m14snw",
      "y6bifz","w0939a","hdkr0n","nmtgla","vn4dk7","yrvibw","wtmbcc","c7o6q7",
      "upleba","lj1wmb","brjt6u","zvvboi","txb7ft","tlodla","s0vsca","dohzwj",
      "mtfvih","jvobjp","rmpxju","yjcrl6","l5r3p6","slamwe","nugx6a","aongcy",
      "p9zi1o","uiyalr","x30o6t","vqncnk","fbbe0n","pw4lpw","dbwwyx","r9zcgq",
      "bqwucw","psqool","genljt","q9dq0e","vvjfjt","k5fyyn","fwbbp5","rm3vrl",
      "jkpqv8","nngybo","x8bqq3","akt2nh","s4qm1i","aelmbq","qmcnhc","cu3dzw",
      "sxijow","clj7xy","gbvaoc","rt5wrb","wdicpv","kuky3w","di1sa2","wtzoif",
      "i5y26i","isazpi","qalj5p","fh5iuz","tybllj","gjrd5f","jyo3uy","gfg2di",
      "ssvx2t","cwe6v1","xlnnvj","tjpnuw","yufbvx","iaoyo7","riijsl","mobvl0",
      "tz7uen","l5txdk","wlvjsn","riv2cy","shvmnz","cqp4nq","qf1tni","ozhjxr",
      "gdbzmf","hkebvy","ue8zyf","zxdgao","di4fgx","c6zpvu","wannrf","ak9b7h",
      "xqdszv","aauvjb","aomib9","ve6sq5","cns7lk","yi8sr0","h8jmjs","b5i1q2",
      "rvvgnz","pfqou8","dugkkj","lmxqdi","curolz","memqtp","cxardh","vcg3kq",
      "en9wzh","fldcwp","dpe38e","w7qhpz","vwg5uy","wqzh42","k6nwca","lbsze5",
      "xvuq7y","b38gpt","zhliky","ly1zpw","ojhe9t","d9wzeb","eb6rby","eogrkl",
      "t1qv4z"
    ];

    const FRAME_IDS_MOBILE = [
      "ryu8ra","f4x9c8","rd71cf","ghg6y9","zlx2td","wavlcl","aiyfgg","br7vgb",
      "nh8vqb","p5lbuc","garf8r","qzjgbn","d2ymcm","ljs0kj","cnhnnf","mn6z5y",
      "bqfluh","t58cbf","uoleb1","rq2e2a","rbvtn3","bctwmp","skuakp","srneyy",
      "ya9ipn","jauvfl","jmrcj9","b0q7mg","oryb8c","sghxqj","oehimx","rtbm41",
      "j6xyxn","f0icwe","v1ewxz","fajtrr","o51k8l","kqpkhu","wdnteg","aihmre",
      "t3ix5m","jhkpsv","gkrtyr","h7vphn","oryy45","rmtwlz","olxhpv","axpsfx",
      "r6ffsq","tjlxg9","petotu","terzka","rupxmn","uto5jn","nedpqr","rdm0i1",
      "nb4kdq","g1od4h","uflpl7","dv0yf3","sjlmpy","ipcvos","x2c0mn","buafgu",
      "cxykz5","mxczpi","up3aly","kklpx8","nri19g","plcagt","k8zt6b","wfxzib",
      "abvcim","wv89gb","rkpx8r","fukocb","kz5ujf","rxdc6y","yqcpju","jjawnr",
      "blokmg","cl3xrs","topdtl","owxenj","xfpxcq","madqxa","e4rim6","rbeujg",
      "ej7tph","nmc8l6","qzhhyj","qacqhw","thuunm","m4dkmg","a1bxwx","togx7n",
      "ivipdf","z0zr28","xqiwp0","aqhuht","h7u8u7","eab4xu","nshp5c","asqhuz",
      "awju5a","sqa8cf","wk0qd5","kgj02y","v9ub69","rotja2","mtxyut","gyftll",
      "imdabc","lyacou","bghcjj","w1dyy7","wlbgrs","ralayb","nckgkp","e3hq1z",
      "wh7rub","fuq3q0","e6rrmm","ssianz","zbxacb","h8vmop","iy691f","zulfec",
      "cvccve","yid2re","wloqn0","gm0lnp","yhw3yk","wzetpw","aptc30","bphowz",
      "uyolzx","nmxev6","r1vgjm","am9gny","ioyqc3","lteeur","q3otrz","x1bduk",
      "nfuj5j"
    ];

    const IDS = isMobile ? FRAME_IDS_MOBILE.filter((_, i) => i % 6 === 0) : FRAME_IDS_DESKTOP;
    const N = IDS.length;
    // Remap anchors for mobile (length is ~25 instead of 145)
    if (isMobile) {
      CONFIG.anchors.left = Math.floor(CONFIG.anchors.left / 6);
      CONFIG.anchors.center = Math.floor(CONFIG.anchors.center / 6);
      CONFIG.anchors.right = Math.floor(CONFIG.anchors.right / 6);
    }

    const frameUrl = (i: number, w: number) => {
      const transform = isMobile ? "f_auto,q_auto:good,e_sharpen:40" : "f_auto,q_100,e_sharpen:60";
      return `${CONFIG.cloudBase}/${transform},c_scale,w_${w}/hf_${String(isMobile ? (i * 6) + 1 : i + 1).padStart(4, "0")}_${IDS[i]}.jpg`;
    };

    const hero = containerRef.current;
    if (!hero) return;

    let canvas: HTMLCanvasElement | null = null;
    let fallbackImg: HTMLImageElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let rAF: number = 0;
    
    let currentFrame = CONFIG.anchors.center;
    let lastDrawn = -1;
    let lastTime = performance.now();
    let frames: (HTMLImageElement | null)[] = new Array(N).fill(null);
    let targetX = 0.5;
    let moved = false;
    let isFallback = false;

    // Load width calc
    const dpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1);
    const initialCw = Math.round(hero.clientWidth * dpr);
    const LADDER = isMobile ? [540] : [960, 1280, 1600, 1920];
    const needed = Math.ceil(initialCw);
    const maxNative = isMobile ? 540 : 1920;
    const loadWidth = Math.min(maxNative, LADDER.find(w => w >= needed) ?? maxNative);

    function setupFallback() {
        if (isFallback) return;
        isFallback = true;
        if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
            canvas.remove();
            canvas = null;
        }
        fallbackImg = document.createElement("img");
        fallbackImg.setAttribute("aria-hidden", "true");
        fallbackImg.className = "hero-canvas"; // Keep class for styling
        fallbackImg.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;display:block;object-fit:cover;object-position:50% 40%;";
        hero!.prepend(fallbackImg);
        // Load center frame as fallback
        fallbackImg.src = frameUrl(CONFIG.anchors.center, loadWidth);
        cancelAnimationFrame(rAF);
    }

    function initCanvas() {
      if (getComputedStyle(hero!).position === "static") hero!.style.position = "relative";
      const existingCanvas = hero!.querySelector('canvas');
      if (existingCanvas) existingCanvas.remove();
      const existingImg = hero!.querySelector('img.hero-canvas');
      if (existingImg) existingImg.remove();
      
      canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.className = "hero-canvas";
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;display:block;background:none;";
      hero!.prepend(canvas);
      
      canvas.addEventListener("contextlost", (e) => {
          e.preventDefault();
          setupFallback();
      });

      try {
        ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("No context");
      } catch (e) {
        setupFallback();
        return false;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      return true;
    }

    function destroyCanvas() {
        cancelAnimationFrame(rAF);
        if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
            canvas.remove();
            canvas = null;
        }
        frames.forEach(img => {
            if (img) {
                img.src = "";
            }
        });
        frames.fill(null);
    }

    /* ======================= POINTER ====================== */
    function onMove(e: PointerEvent | MouseEvent) {
      targetX = Math.min(1, Math.max(0, e.clientX / innerWidth));
      moved = true;
    }
    
    let startX = 0, startXValue = 0, axis: "x" | "y" | null = null;
    let lastTouchX = 0, lastTouchY = 0;
    function onTouchStart(e: TouchEvent) {
      if (!isMobile) return;
      moved = true;
      startX = e.touches[0].clientX;
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
      startXValue = targetX;
      axis = null;
    }
    function onTouchMove(e: TouchEvent) {
      if (!isMobile) return;
      const touch = e.touches[0];
      const dx = touch.clientX - lastTouchX;
      const dy = touch.clientY - lastTouchY;
      if (!axis) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        }
      }
      if (axis === "x") {
        if (hero) hero.style.touchAction = "pan-y";
        const newTarget = startXValue + ((touch.clientX - startX) / innerWidth) * 1.6;
        targetX = Math.min(1, Math.max(0, newTarget));
      }
    }
    function onTouchEnd() {
      if (!isMobile) return;
      axis = null;
    }

    function targetFrame() {
      const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      if (isTouchOnly && !moved) {
        const now = performance.now();
        targetX = 0.5 + 0.32 * Math.sin(now / 4200 * Math.PI * 2);
      }
      const s = (targetX - 0.5) * 2;
      const e = Math.sign(s) * Math.pow(Math.abs(s), CONFIG.easing);
      const a = CONFIG.anchors;
      return e < 0
        ? a.center + (a.left - a.center) * -e
        : a.center + (a.right - a.center) * e;
    }

    function loadFrameAsync(i: number) {
        if (i < 0 || i >= N || frames[i] || isFallback) return;
        const img = new Image();
        img.decoding = "async";
        img.crossOrigin = "anonymous";
        img.onload = () => { if (!isFallback) frames[i] = img; };
        img.src = frameUrl(i, loadWidth);
        frames[i] = img; // store reference even while loading
    }

    function tick(now: number) {
      if (isFallback) return;
      const dt = Math.min(64, now - lastTime);
      lastTime = now;
      const k = 1 - Math.pow(1 - CONFIG.smoothing, (dt * 60) / 1000);
      currentFrame += (targetFrame() - currentFrame) * k;
      
      const idx = Math.max(0, Math.min(N - 1, Math.round(currentFrame)));
      
      // Sliding window loading
      if (isMobile) {
          const windowSize = 4;
          for (let i = idx - windowSize; i <= idx + windowSize; i++) {
              if (i >= 0 && i < N && !frames[i]) {
                  loadFrameAsync(i);
              }
          }
          // Unload outside window
          for (let i = 0; i < N; i++) {
              if (Math.abs(i - idx) > windowSize && frames[i]) {
                  frames[i]!.src = "";
                  frames[i] = null;
              }
          }
      } else {
          if (!frames[idx]) loadFrameAsync(idx);
      }

      if (idx !== lastDrawn) { draw(idx); lastDrawn = idx; }
      rAF = requestAnimationFrame(tick);
    }

    function nearestLoaded(i: number) {
      if (frames[i] && frames[i]!.complete) return frames[i];
      for (let d = 1; d < N; d++) {
        if (i - d >= 0 && frames[i - d] && frames[i - d]!.complete) return frames[i - d];
        if (i + d < N && frames[i + d] && frames[i + d]!.complete) return frames[i + d];
      }
      return null;
    }

    function draw(i: number) {
      if (isFallback || !canvas || !ctx) return;
      const img = nearestLoaded(i);
      if (!img) return;
      
      const cw = canvas.width, ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const coverScale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const containScale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      let scale = containScale + (coverScale - containScale) * CONFIG.fit;
      scale = Math.min(scale, CONFIG.maxUpscale);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      
      try {
          ctx.clearRect(0, 0, cw, ch);
          ctx.drawImage(img, (cw - dw) * CONFIG.focal.x, (ch - dh) * CONFIG.focal.y, dw, dh);
      } catch(e) {
          setupFallback();
      }
    }

    function resize() {
      if (isFallback || !canvas || !ctx) return;
      const curDpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(hero!.clientWidth * curDpr);
      canvas.height = Math.round(hero!.clientHeight * curDpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      lastDrawn = -1;
      draw(Math.round(currentFrame));
    }

    /* =========================== INTERSECTION & INIT =========================== */
    io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Re-init if needed
            if (!canvas && !isFallback) {
                if (initCanvas()) {
                    resize();
                    lastTime = performance.now();
                    rAF = requestAnimationFrame(tick);
                    if (!isMobile) {
                        // Desktop load all
                        for (let i = 0; i < N; i++) loadFrameAsync(i);
                    }
                }
            }
        } else {
            // Tear down to save memory
            destroyCanvas();
        }
    }, { rootMargin: '30%' });
    
    io.observe(hero);
    ro = new ResizeObserver(resize);
    ro.observe(hero);
    
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      destroyCanvas();
    };
  }, [isMobile]);
  return (
    <section 
      ref={containerRef} 
      id="hero-root"
      className={`relative w-full bg-black overflow-hidden mx-auto ${isMobile ? 'h-[100dvh]' : 'max-h-[100vh] aspect-[16/9]'}`}
    >
      <style>{`
        @keyframes float-scroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>


      {/* Radial Vignette */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-10 pointer-events-none"
        style={{ opacity: step < 3 ? 0 : 1, transition: "opacity 900ms cubic-bezier(.22,1,.36,1)" }}
      ></div>
      
      {/* Bottom Gradient for contrast */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none"
        style={{ opacity: step < 3 ? 0 : 1, transition: "opacity 900ms cubic-bezier(.22,1,.36,1)" }}
      ></div>

      {/* Scroll affordance */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: step < 3 ? 0.5 : 0, transition: "opacity 300ms" }}
      >
        <span className="text-white/50 text-[11px] tracking-[0.3em] font-medium uppercase">SCORRI</span>
        <div className="w-[1px] h-[40px] bg-white/50" style={{ animation: "float-scroll 2s infinite ease-in-out" }}></div>
      </div>

      {/* Content Overlays */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-4 z-20">
        <div className="flex flex-col items-center justify-center mt-16">
          <h1 
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
          </h1>
          <p 
            className="text-base md:text-xl lg:text-2xl text-white/95 max-w-3xl mb-8 md:mb-10 leading-relaxed font-normal bg-black/50 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4 md:px-8 md:py-5 shadow-2xl mx-auto"
            style={introStyle(step < 2, 20, 0, 0, reduced)}
          >
            Hop Storm è un birrificio artigianale indipendente a Roma: produciamo <strong className="font-semibold text-[#FFC857]">Fresh Wave</strong>, <strong className="font-semibold text-[#FF5252]">Red Moon</strong> e <strong className="font-semibold text-[#FFA726]">Enjoy</strong>, birre di carattere servite senza compromessi a privati e locali.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
            <a 
              href="#per-i-privati" 
              className="bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg"
              style={introStyle(step < 3, 16, 0, 0, reduced)}
            >
              Ordina Online
            </a>
            <a 
              href="#per-i-locali" 
              className="bg-black/50 border border-white/20 text-white hover:bg-white/10 transition-colors px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider backdrop-blur-md"
              style={introStyle(step < 3, 16, 80, 0, reduced)}
            >
              Diventa Partner
            </a>
            <a 
              href="#dove-trovarci" 
              className="bg-black/50 border border-white/20 text-white hover:bg-white/10 transition-colors px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider backdrop-blur-md"
              style={introStyle(step < 3, 16, 160, 0, reduced)}
            >
              Dove Trovarci
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
