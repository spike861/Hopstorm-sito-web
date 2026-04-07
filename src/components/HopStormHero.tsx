import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { frameUrls } from '../lib/frameUrls';

const NUM_FRAMES = 192;

function getFramePath(index: number) {
  return frameUrls[index] || `/foto/frame_${index.toString().padStart(3, '0')}_delay-0.041s.jpg`;
}

export default function HopStormHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload images
  useEffect(() => {
    let loaded = 0;
    let errors = 0;
    let aborted = false;
    const imgArray: HTMLImageElement[] = [];

    const checkFirstImage = new Image();
    checkFirstImage.src = getFramePath(0);
    
    checkFirstImage.onload = () => {
      // First image exists, proceed with loading the rest
      imgArray.push(checkFirstImage);
      loaded++;
      setLoadedCount(loaded + errors);
      
      for (let i = 1; i < NUM_FRAMES; i++) {
        if (aborted) break;
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded + errors);
          if (loaded + errors === NUM_FRAMES) setIsLoaded(true);
        };
        img.onerror = () => {
          errors++;
          setHasErrors(true);
          setLoadedCount(loaded + errors);
          if (loaded + errors === NUM_FRAMES) setIsLoaded(true);
        };
        imgArray.push(img);
      }
      setImages(imgArray);
    };

    checkFirstImage.onerror = () => {
      // First image failed, assume all are missing to avoid 192 network requests
      aborted = true;
      setHasErrors(true);
      setIsLoaded(true);
      setImages([]);
    };

    return () => {
      aborted = true;
    };
  }, []);

  // Draw canvas
  useEffect(() => {
    if (!isLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (progress: number) => {
      const frameIndex = Math.min(
        NUM_FRAMES - 1,
        Math.max(0, Math.floor(progress * (NUM_FRAMES - 1)))
      );
      
      const img = images[frameIndex];
      
      // Resize canvas to match window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (img && img.complete && img.naturalWidth > 0) {
        // Calculate ratio based on available height below navbar
        const isMobile = window.innerWidth < 768;
        const topOffset = isMobile ? 90 : 120; // Space for navbar
        const availableHeight = canvas.height - topOffset;
        
        const hRatio = canvas.width / img.width;
        const vRatio = availableHeight / img.height;
        
        // On mobile, use max to completely cover the available area and avoid seeing the image edges.
        const ratio = isMobile ? Math.max(hRatio, vRatio) : Math.min(hRatio, vRatio);
        
        const drawWidth = img.width * ratio;
        const drawHeight = img.height * ratio;
        
        const centerShift_x = (canvas.width - drawWidth) / 2;
        // On mobile, align to topOffset to start right under the menu if it's taller
        const centerShift_y = isMobile && drawHeight > availableHeight 
          ? topOffset 
          : topOffset + (availableHeight - drawHeight) / 2;
        
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, drawWidth, drawHeight);

        // Hide Veo watermark (bottom right corner of the drawn image)
        ctx.fillStyle = '#000000';
        ctx.fillRect(centerShift_x + drawWidth - 160 * ratio, centerShift_y + drawHeight - 60 * ratio, 160 * ratio, 60 * ratio);
      } else if (hasErrors) {
        // Fallback drawing if images are missing
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a generic bottle shape as placeholder
        ctx.strokeStyle = 'rgba(212, 162, 78, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(canvas.width/2 - 40, canvas.height/2 - 150, 80, 300, 10);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(212, 162, 78, 0.5)';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`Frame ${frameIndex}`, canvas.width / 2, canvas.height / 2);
      }
    };

    const unsubscribe = smoothProgress.on("change", render);
    
    // Initial render
    render(smoothProgress.get());

    const handleResize = () => render(smoothProgress.get());
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, images, smoothProgress, hasErrors]);

  // Opacity and Y transforms for the only text
  const opacityA = useTransform(smoothProgress, [0, 0.05, 0.25, 0.35], [0, 1, 1, 0]);
  const yA = useTransform(smoothProgress, [0, 0.05, 0.25, 0.35], [20, 0, 0, -20]);

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <>
      {/* Preloader */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/10 border-t-[#D4A24E] rounded-full animate-spin mb-8"></div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#D4A24E] transition-all duration-300"
              style={{ width: `${(loadedCount / NUM_FRAMES) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 text-[#D4A24E] font-mono text-sm">
            {Math.round((loadedCount / NUM_FRAMES) * 100)}%
          </div>
        </div>
      )}

      {/* Wrapper 400vh */}
      <section ref={containerRef} className="relative h-[400vh] bg-black">
        {/* Sticky Canvas Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
          
          {/* Bottom Gradient to hide watermark and blend */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

          {/* Overlays */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-4">
            
            {/* Main Text */}
            <motion.div style={{ opacity: opacityA, y: yA }} className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-7xl md:text-9xl tracking-tighter font-bold text-white/90 mb-6">
                NON È PER TUTTI.
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl">
                Artigianale. Autentica. Per chi sa cosa beve.
              </p>
            </motion.div>

          </div>

          {/* Scroll Indicator */}
          <motion.div 
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
          >
            <span className="text-sm tracking-widest uppercase mb-2">Scorri per esplorare</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
