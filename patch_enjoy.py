import re

with open('src/components/EnjoyRotator.tsx', 'r') as f:
    content = f.read()

# 1. Add initialized and contextlost
content = content.replace(
    "let ro: ResizeObserver | null = null;",
    "let ro: ResizeObserver | null = null;\n    let initialized = false;"
)

contextlost_listener = """
    canvas.addEventListener("contextlost", (e) => {
        e.preventDefault();
        setupFallback();
    });
"""

# Find `if (!canvas) return;` inside useEffect
canvas_check = "let canvas: HTMLCanvasElement | null = canvasRef.current;\n    if (!canvas) return;"
if canvas_check in content:
    content = content.replace(
        canvas_check,
        canvas_check + contextlost_listener
    )

# 2. Update initCanvas to remove contextlost listener
old_init_canvas = """    function initCanvas() {
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
    }"""
new_init_canvas = """    function initCanvas() {
        if (!canvasRef.current) return false;
        canvas = canvasRef.current;
        try {
            ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("No ctx");
        } catch(e) {
            setupFallback();
            return false;
        }
        return true;
    }"""
content = content.replace(old_init_canvas, new_init_canvas)

# 3. Update resize()
old_resize = """    function resize() {
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
    }"""
new_resize = """    function resize() {
      if (isFallback || !canvas || !ctx) return;
      
      const img = nearestLoaded(Math.round(smooth) % N);
      let nWidth = 1755;
      let nHeight = 3120;
      if (img && img.complete && img.naturalWidth > 0) {
        nWidth = img.naturalWidth;
        nHeight = img.naturalHeight;
      }
      
      canvas.style.aspectRatio = `${nWidth} / ${nHeight}`;
      const dpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio || 1);
      const cw = canvas.clientWidth || (canvas.clientHeight ? canvas.clientHeight * (nWidth / nHeight) : 300);
      const ch = canvas.clientHeight || (cw ? cw * (nHeight / nWidth) : 600);
      
      if (cw > 0 && ch > 0) {
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(ch * dpr);
        ctx.imageSmoothingQuality = "high";
        lastDrawn = -1;
      }
    }"""
content = content.replace(old_resize, new_resize)

# 4. Remove crossOrigin="anonymous"
content = content.replace('img.crossOrigin = "anonymous";\n', '')
content = content.replace('crossOrigin="anonymous" ', '')

# 5. IntersectionObserver replacement
io_start = "    io = new IntersectionObserver((entries) => {"
io_end = "    }, { rootMargin: \"30%\" });"
start_idx = content.find(io_start)
end_idx = content.find(io_end, start_idx) + len(io_end)

new_io = """    io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (isFallback) return;
            if (!initialized) {
                if (!initCanvas()) return;
                initialized = true;
                setTimeout(() => {
                    if (lastDrawn === -1 && initialized) {
                        setupFallback();
                    }
                }, 2500);
            }
            lastDrawn = -1;
            resize();
            lastTime = performance.now();
            cancelAnimationFrame(rAF);
            rAF = requestAnimationFrame(tick);
            if (!isMobile) {
                for (let i = 0; i < N; i++) loadFrameAsync(i);
            } else {
                loadFrameAsync(0);
                loadFrameAsync(1);
                loadFrameAsync(N - 1);
            }
        } else {
            destroyCanvas();
            initialized = false;
        }
    }, { rootMargin: "30%" });"""

content = content[:start_idx] + new_io + content[end_idx:]

with open('src/components/EnjoyRotator.tsx', 'w') as f:
    f.write(content)

