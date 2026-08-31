import React, { useEffect, useRef, useState } from 'react';

const ROT_BASE = "https://res.cloudinary.com/dcbomk6i8/image/upload";
const ROT_IDS = [
  "sry3zw","b7j7zw","hkzy1n","qyoehw","kgwtjg","vr2qra","rx7uqx","ywo4n3",
  "lw3xlt","od6xr0","ocuchp","pne35o","yjpx7k","vn6peu","yaegv5","bdvff9",
  "jg2hxa","ryiyuh","wr6ncl","x6rdgd","dcvaw4","nbkvfo","q8qlyw","zzqk2s",
  "tnxc2i","rxrnsc","dnwlga","dwj3me","ilsg6l","op8nmd","w819pv","nygx5r",
  "t7dsbk","uh4mzt","qhrknd","huwwsf"
];
const ROT_N = ROT_IDS.length;
const rotUrl = (i: number, w: number) =>
  `${ROT_BASE}/f_webp,q_auto:good,c_scale,w_${w}/rot_${String(i).padStart(3, "0")}_${ROT_IDS[i]}.png`;

const CONFIG = {
  TURNS: 1,
  OFFSET: 0
};

export default function EnjoyRotator({ className, style, fallbackSrc, alt }: { className?: string, style?: React.CSSProperties, fallbackSrc: string, alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frames: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    const w = window.innerWidth;
    const loadWidth = w <= 480 ? 480 : w <= 720 ? 720 : w <= 900 ? 900 : 1200;

    async function loadFrame(i: number) {
      return new Promise<void>((res) => {
        const img = new Image();
        img.decoding = "async";
        img.crossOrigin = "anonymous";
        img.onload = () => {
          frames[i] = img;
          loadedCount++;
          if (loadedCount === 1) {
            resize();
          }
          res();
        };
        img.onerror = () => res();
        img.src = rotUrl(i, loadWidth);
      });
    }

    let startedLoading = false;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !startedLoading) {
        startedLoading = true;
        io.disconnect();
        startLoading();
      }
    }, { rootMargin: "100%" });
    io.observe(canvas);

    async function startLoading() {
      const order: number[] = [];
      if (isMobile) {
        for (let i = 0; i < ROT_N; i += 2) order.push(i);
      } else {
        for (let i = 0; i < ROT_N; i++) order.push(i);
      }
      
      const concurrency = 6;
      const queue = order.slice();
      const workers = Array.from({ length: concurrency }, async () => {
        while (queue.length) await loadFrame(queue.shift()!);
      });
      await Promise.all(workers);
      
      if (loadedCount < 4) {
        setUseFallback(true);
      }
    }

    let rAF: number;
    let smooth = CONFIG.OFFSET;
    let lastTime = performance.now();
    let lastDrawn = -1;

    function resize() {
      if (!canvas) return;
      const img = nearestLoaded(Math.round(smooth) % ROT_N);
      if (img) {
        canvas.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const cw = canvas.clientWidth || (canvas.clientHeight ? canvas.clientHeight * (img.naturalWidth / img.naturalHeight) : 300);
        const ch = canvas.clientHeight || (cw ? cw * (img.naturalHeight / img.naturalWidth) : 600);
        if (cw > 0 && ch > 0) {
          canvas.width = Math.round(cw * dpr);
          canvas.height = Math.round(ch * dpr);
          ctx!.imageSmoothingQuality = "high";
          lastDrawn = -1;
        }
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function nearestLoaded(i: number) {
      if (i < 0) i += ROT_N;
      if (frames[i]) return frames[i];
      for (let d = 1; d < ROT_N; d++) {
        const prev = (i - d + ROT_N) % ROT_N;
        if (frames[prev]) return frames[prev];
        const next = (i + d) % ROT_N;
        if (frames[next]) return frames[next];
      }
      return null;
    }

    function tick(now: number) {
      if (loadedCount < 4 && !useFallback) {
         rAF = requestAnimationFrame(tick);
         return;
      }

      const dt = Math.min(64, now - lastTime);
      lastTime = now;

      const sceneEl = canvas!.closest('.beer-scene') as HTMLElement;
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

      let target = ((p * CONFIG.TURNS * ROT_N) + CONFIG.OFFSET) % ROT_N;

      smooth = smooth % ROT_N;
      if (smooth < 0) smooth += ROT_N;

      let diff = target - smooth;
      if (diff > ROT_N / 2) smooth += ROT_N;
      else if (diff < -ROT_N / 2) smooth -= ROT_N;

      smooth += (target - smooth) * (1 - Math.pow(1 - 0.14, dt * 60 / 1000));
      
      let drawIdx = Math.round(smooth) % ROT_N;
      if (drawIdx < 0) drawIdx += ROT_N;
      
      if (drawIdx !== lastDrawn || canvas!.width === 0 || canvas!.height === 0) {
        const img = nearestLoaded(drawIdx);
        if (img) {
          if (!canvas!.style.aspectRatio || canvas!.width === 0 || canvas!.height === 0) {
            resize(); 
          }
          if (canvas!.width > 0 && canvas!.height > 0) {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            const cw = canvas!.width;
            const ch = canvas!.height;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.min(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            ctx!.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
            lastDrawn = drawIdx;
          }
        }
      }

      rAF = requestAnimationFrame(tick);
    }
    rAF = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(rAF);
    };
  }, [useFallback]);

  if (useFallback) {
    return <img src={fallbackSrc} alt={alt} crossOrigin="anonymous" decoding="async" className={className} style={{ ...style, background: 'none' }} />;
  }

  return <canvas ref={canvasRef} className={className} style={{ ...style, background: 'none' }} />;
}
