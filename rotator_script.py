import re

content = """import React, { useEffect, useRef, useState } from 'react';

const ROT_BASE = "https://res.cloudinary.com/dcbomk6i8/image/upload";
const ROT_IDS = [
  "sry3zw","b7j7zw","hkzy1n","qyoehw","kgwtjg","vr2qra","rx7uqx","ywo4n3",
  "lw3xlt","od6xr0","ocuchp","pne35o","yjpx7k","vn6peu","yaegv5","bdvff9",
  "jg2hxa","ryiyuh","wr6ncl","x6rdgd","dcvaw4","nbkvfo","q8qlyw","zzqk2s",
  "tnxc2i","rxrnsc","dnwlga","dwj3me","ilsg6l","op8nmd","w819pv","nygx5r",
  "t7dsbk","uh4mzt","qhrknd","huwwsf"
];
const ROT_N = ROT_IDS.length;

const CONFIG = {
  TURNS: 1,
  OFFSET: 0
};

export default function EnjoyRotator({ className, style, fallbackSrc, alt }: { className?: string, style?: React.CSSProperties, fallbackSrc: string, alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches || (/iP(hone|ad|od)/.test(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document));
    
    // Instead of filtering ROT_IDS directly, we'll map to indices
    const indices = isMobile ? Array.from({length: Math.ceil(ROT_N/3)}, (_, i) => i * 3) : Array.from({length: ROT_N}, (_, i) => i);
    const N = indices.length;
    
    const rotUrl = (i: number, w: number) => {
        const originalIndex = indices[i];
        return `${ROT_BASE}/f_webp,q_auto:good,c_scale,w_${w}/rot_${String(originalIndex).padStart(3, "0")}_${ROT_IDS[originalIndex]}.png`;
    };

    const container = canvasRef.current?.parentElement;
    if (!container) return;

    let canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    
    let ctx: CanvasRenderingContext2D | null = null;
    let frames: (HTMLImageElement | null)[] = new Array(N).fill(null);
    let isFallback = false;
    let rAF = 0;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    
    const w = window.innerWidth;
    const loadWidth = isMobile ? 480 : (w <= 720 ? 720 : w <= 900 ? 900 : 1200);

    function setupFallback() {
        if (isFallback) return;
        isFallback = true;
        setUseFallback(true);
        destroyCanvas();
    }

    function initCanvas() {
        if (!canvasRef.current) return false;
        canvas = canvasRef.current;
        canvas.addEventListener("contextlost", (e) => {
            e.preventDefault();
            setupFallback();
        });
        try {
            ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("No ctx");
        } catch(e) {
            setupFallback();
            return false;
        }
        return true;
    }

    function destroyCanvas() {
        cancelAnimationFrame(rAF);
        if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
            // don't remove canvas completely as React controls it, but it's zeroed out
        }
        frames.forEach(img => {
            if (img) img.src = "";
        });
        frames.fill(null);
    }

    function loadFrameAsync(i: number) {
        if (i < 0 || i >= N || frames[i] || isFallback) return;
        const img = new Image();
        img.decoding = "async";
        img.crossOrigin = "anonymous";
        img.onload = () => {
            if (!isFallback) {
                frames[i] = img;
                if (canvas && (!canvas.style.aspectRatio || canvas.width === 0)) resize();
            }
        };
        img.src = rotUrl(i, loadWidth);
        frames[i] = img;
    }

    let smooth = CONFIG.OFFSET;
    let lastTime = performance.now();
    let lastDrawn = -1;

    function resize() {
      if (isFallback || !canvas || !ctx) return;
      
      const img = nearestLoaded(Math.round(smooth) % N);
      if (img && img.complete && img.naturalWidth > 0) {
        canvas.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
        const dpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1);
        const cw = canvas.clientWidth || (canvas.clientHeight ? canvas.clientHeight * (img.naturalWidth / img.naturalHeight) : 300);
        const ch = canvas.clientHeight || (cw ? cw * (img.naturalHeight / img.naturalWidth) : 600);
        
        if (cw > 0 && ch > 0) {
          canvas.width = Math.round(cw * dpr);
          canvas.height = Math.round(ch * dpr);
          ctx.imageSmoothingQuality = "high";
          lastDrawn = -1;
        }
      }
    }

    function nearestLoaded(i: number) {
      if (i < 0) i += N;
      if (frames[i] && frames[i]!.complete) return frames[i];
      for (let d = 1; d < N; d++) {
        const prev = (i - d + N) % N;
        if (frames[prev] && frames[prev]!.complete) return frames[prev];
        const next = (i + d) % N;
        if (frames[next] && frames[next]!.complete) return frames[next];
      }
      return null;
    }

    function tick(now: number) {
      if (isFallback || !canvas || !ctx) return;
      const dt = Math.min(64, now - lastTime);
      lastTime = now;
      
      const sceneEl = canvas.closest('.beer-scene') as HTMLElement;
      let p = 0;
      if (sceneEl) {
        const pStr = sceneEl.style.getPropertyValue('--p');
        if (pStr) {
          p = parseFloat(pStr);
        } else {
          const r = sceneEl.getBoundingClientRect();
          const wh = window.innerHeight;
          p = 1 - (r.top + r.height) / (wh + r.height);
          p = Math.max(0, Math.min(1, p));
        }
      }
      
      let target = ((p * CONFIG.TURNS * N) + CONFIG.OFFSET) % N;
      smooth = smooth % N;
      if (smooth < 0) smooth += N;
      let diff = target - smooth;
      if (diff > N / 2) smooth += N;
      else if (diff < -N / 2) smooth -= N;
      smooth += (target - smooth) * (1 - Math.pow(1 - 0.14, dt * 60 / 1000));
      
      let drawIdx = Math.round(smooth) % N;
      if (drawIdx < 0) drawIdx += N;
      
      // Sliding window logic
      if (isMobile) {
          const windowSize = 2;
          for (let d = -windowSize; d <= windowSize; d++) {
              let i = (drawIdx + d + N) % N;
              if (!frames[i]) loadFrameAsync(i);
          }
          // Unload outside
          for (let i = 0; i < N; i++) {
              let dist = Math.abs(i - drawIdx);
              dist = Math.min(dist, N - dist); // wrap around distance
              if (dist > windowSize && frames[i]) {
                  frames[i]!.src = "";
                  frames[i] = null;
              }
          }
      } else {
          if (!frames[drawIdx]) loadFrameAsync(drawIdx);
      }

      if (drawIdx !== lastDrawn || canvas.width === 0 || canvas.height === 0) {
        const img = nearestLoaded(drawIdx);
        if (img) {
          if (!canvas.style.aspectRatio || canvas.width === 0 || canvas.height === 0) {
            resize(); 
          }
          if (canvas.width > 0 && canvas.height > 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.min(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
            lastDrawn = drawIdx;
          }
        }
      }
      rAF = requestAnimationFrame(tick);
    }

    io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (canvas && canvas.width === 0 && !isFallback) {
                if (initCanvas()) {
                    resize();
                    lastTime = performance.now();
                    rAF = requestAnimationFrame(tick);
                    if (!isMobile) {
                        for (let i = 0; i < N; i++) loadFrameAsync(i);
                    } else {
                        // start with center-ish
                        loadFrameAsync(0);
                    }
                }
            } else if (!canvas && !isFallback) {
                if (initCanvas()) {
                    resize();
                    lastTime = performance.now();
                    rAF = requestAnimationFrame(tick);
                    if (!isMobile) {
                        for (let i = 0; i < N; i++) loadFrameAsync(i);
                    } else {
                        loadFrameAsync(0);
                    }
                }
            }
        } else {
            destroyCanvas();
        }
    }, { rootMargin: "30%" });

    io.observe(canvas);
    ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      destroyCanvas();
    };
  }, [useFallback]);

  if (useFallback) {
    return <img src={fallbackSrc} alt={alt} crossOrigin="anonymous" decoding="async" className={className} style={{ ...style, background: 'none' }} />;
  }

  return <canvas ref={canvasRef} className={className} style={{ ...style, background: 'none' }} />;
}
"""

with open('src/components/EnjoyRotator.tsx', 'w') as f:
    f.write(content)
