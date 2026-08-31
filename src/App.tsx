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
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  const lastStepAt = useRef(0);
  const reduced = typeof window !== 'undefined' ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
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

  const isLegalPage = ['#/privacy', '#/cookie', '#/termini'].includes(currentHash);

  return (
    <IntroContext.Provider value={{ step, reduced }}>
      <div className="bg-black min-h-screen text-white font-sans selection:bg-[#D4A24E] selection:text-black">
        <JsonLd />
        <AgeGate />
        <CookieBanner />
        <Navbar />
        <main>
          {isLegalPage ? (
            <LegalPages currentHash={currentHash} />
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
