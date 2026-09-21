import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HopStormHero from './components/HopStormHero';
import OurBeers from './components/OurBeers';
import About from './components/About';
import ForLocals from './components/ForLocals';
import ForPrivate from './components/ForPrivate';
import WhereToFindUs from './components/WhereToFindUs';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import AgeGate from './components/AgeGate';
import LegalPages from './components/LegalPages';
import CookieBanner from './components/CookieBanner';
import { IntroContext } from './introContext';

export default function App() {
  
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  const lastStepAt = useRef(0);
  const reduced = typeof window !== 'undefined' ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;

    let mounted = 0;
    let revealTime = 0;
    let maxScroll = 0;
    let rearmTimer: ReturnType<typeof setTimeout> | null = null;
    const opts = { passive: true } as AddEventListenerOptions;

    const arm = () => {
      mounted = Date.now();
      stepRef.current = 0;
      setStep(0);
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      window.addEventListener("wheel", onWheel, opts);
      window.addEventListener("touchmove", onTouch, opts);
      window.addEventListener("scroll", onScroll, opts);
      window.addEventListener("keydown", onKey);
    };

    const disarm = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.body.style.overscrollBehavior = prevOverscroll;
    };

    const unlock = () => {
      disarm();
    };

    const COOLDOWN = 700;
    const advance = () => {
      const now = Date.now();
      if (now - mounted < 400) return;
      if (now - lastStepAt.current < COOLDOWN) return;
      if (stepRef.current >= 3) return;
      lastStepAt.current = now;
      stepRef.current += 1;
      setStep(stepRef.current);
      if (stepRef.current === 3) {
        revealTime = Date.now();
        setTimeout(unlock, 900);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (stepRef.current >= 3) return;
      if (Math.abs(e.deltaY) < 2) return;
      advance();
    };
    const onTouch = () => { 
      if (stepRef.current >= 3) return;
      advance(); 
    };
    const onScroll = () => {
      if (stepRef.current >= 3) return;
      if (window.scrollY <= 0) return;
      advance();
    };
    const onKey = (e: KeyboardEvent) => {
      if (stepRef.current >= 3) return;
      if ([" ", "ArrowDown", "PageDown"].includes(e.key)) advance();
      if (e.key === "Tab") {
        lastStepAt.current = Date.now();
        stepRef.current = 3;
        setStep(3);
        revealTime = Date.now();
        setTimeout(unlock, 900);
      }
    };

    const monitorRearm = () => {
      if (stepRef.current < 3) return;
      if (Date.now() - revealTime < 900) return;

      maxScroll = Math.max(maxScroll, window.scrollY);
      if (maxScroll > 200 && window.scrollY <= 4) {
        if (!rearmTimer) {
          rearmTimer = setTimeout(() => {
            if (window.scrollY <= 4) {
              maxScroll = 0;
              arm();
            }
            rearmTimer = null;
          }, 400);
        }
      } else {
        if (rearmTimer) {
          clearTimeout(rearmTimer);
          rearmTimer = null;
        }
      }
    };

    arm();
    window.addEventListener("scroll", monitorRearm, opts);

    return () => {
      if (rearmTimer) clearTimeout(rearmTimer);
      window.removeEventListener("scroll", monitorRearm);
      disarm();
    };
  }, []);

  const currentPath = window.location.pathname;
  const isLegalPage = ['/privacy', '/cookie', '/termini'].includes(currentPath);
  const isNotFound = !isLegalPage && currentPath !== '/';

  return (
    <IntroContext.Provider value={{ step, reduced }}>
      <div className="bg-black min-h-screen text-white font-sans selection:bg-[#D4A24E] selection:text-black">
        <JsonLd />
        <AgeGate />
        <CookieBanner />
        <Navbar />
        <main>
          {isNotFound ? (
            <div className="pt-40 pb-24 px-6 min-h-[70vh] flex flex-col items-center justify-center text-center">
              <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557006/foto/hopstorm_logo_bianco_trasparente_l3ftm9.png" alt="Hop Storm" className="h-24 w-auto mb-8 opacity-50" />
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">404</h1>
              <p className="text-white/60 text-xl mb-8">La pagina che cerchi non esiste o è stata spostata.</p>
              <a href="/" className="bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]">
                Torna alla Home
              </a>
            </div>
          ) : isLegalPage ? (
            <LegalPages currentHash={currentPath} />
          ) : (
            <>
              <HopStormHero />
              <OurBeers />
              <About />
              <ForLocals />
              <ForPrivate />
              <WhereToFindUs />
              <Contact />
              <Faq />
            </>
          )}
        </main>
        <Footer />
      </div>
    </IntroContext.Provider>
  );
}
