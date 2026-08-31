import re

with open('src/components/HopStormHero.tsx', 'r') as f:
    content = f.read()

# We need to replace the large useEffect that handles canvas.
# It starts around: useEffect(() => { /* ============================ CONFIG ============================ */
# and ends right before return ( <section

def replace_hero_effect():
    start_marker = "    /* ============================ CONFIG ============================ */"
    end_marker = "  return (\n    <section"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("Markers not found!")
        return

    # find the enclosing useEffect
    search_start = content.rfind("useEffect(() => {", 0, start_idx)
    
    new_effect = """useEffect(() => {
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

    const IDS = isMobile ? FRAME_IDS_DESKTOP.filter((_, i) => i % 6 === 0) : FRAME_IDS_DESKTOP;
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
  }, [isMobile]);"""

    new_content = content[:search_start] + new_effect + "\n" + content[end_idx:]
    with open('src/components/HopStormHero.tsx', 'w') as f:
        f.write(new_content)

replace_hero_effect()
