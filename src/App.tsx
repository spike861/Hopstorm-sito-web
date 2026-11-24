import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HopStormHero from './components/HopStormHero';
import OurBeers from './components/OurBeers';
import About from './components/About';
import ForLocals from './components/ForLocals';
import ForPrivate from './components/ForPrivate';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import AgeGate from './components/AgeGate';
import LegalPages from './components/LegalPages';
import CookieBanner from './components/CookieBanner';
import MobileBottomBar from './components/MobileBottomBar';
import { IntroContext } from './introContext';
import { ShopProvider } from './context/ShopContext';
import CartDrawer from './components/shop/CartDrawer';
import ShopPage from './components/shop/ShopPage';
import ProductDetailPage from './components/shop/ProductDetailPage';
import CartPage from './components/shop/CartPage';
import OrderConfirmedPage from './components/shop/OrderConfirmedPage';
import ShopAgeGate from './components/shop/ShopAgeGate';
import GestioneShopPage from './components/shop/GestioneShopPage';
import CheckoutPage from './components/shop/CheckoutPage';

export default function App() {
  const isHomeDesktopInitial =
    typeof window !== 'undefined' &&
    window.location.pathname === '/' &&
    window.innerWidth > 768;

  const [step, setStep] = useState<number>(() =>
    isHomeDesktopInitial ? 0 : 3
  );
  const stepRef = useRef<number>(isHomeDesktopInitial ? 0 : 3);
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
      if (window.location.pathname !== '/' || window.innerWidth <= 768) {
        stepRef.current = 3;
        setStep(3);
        return;
      }
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
      if (window.location.pathname !== '/') return;
      if (stepRef.current < 3) return;
      if (Date.now() - revealTime < 900) return;

      maxScroll = Math.max(maxScroll, window.scrollY);
      if (maxScroll > 200 && window.scrollY <= 4) {
        if (!rearmTimer) {
          rearmTimer = setTimeout(() => {
            if (window.location.pathname === '/' && window.scrollY <= 4) {
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

  const [currentPath, setCurrentPath] = useState<string>(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname;
      setCurrentPath(nextPath);
      if (nextPath !== '/') {
        stepRef.current = 3;
        setStep(3);
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.overscrollBehavior = '';
      }
    };

    const handleLinkClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const target = (e.target as HTMLElement).closest('a');
      if (!target || target.target === '_blank') return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Support hash links when currently outside '/' (e.g. clicking #contatti from /shop)
      if (href.startsWith('/#') || (href.startsWith('#') && href.length > 1 && window.location.pathname !== '/')) {
        const hashId = href.startsWith('/#') ? href.slice(2) : href.slice(1);
        e.preventDefault();
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        stepRef.current = 3;
        setStep(3);
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.overscrollBehavior = '';
        setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return;
      }

      const isKnownInternalRoute =
        ['/privacy', '/cookie', '/termini', '/vendita', '/', '/shop', '/shop/', '/carrello', '/checkout', '/ordine-confermato'].includes(href) ||
        href.startsWith('/shop/');

      if (isKnownInternalRoute) {
        e.preventDefault();
        if (window.location.pathname !== href) {
          window.history.pushState({}, '', href);
          setCurrentPath(href);
        }
        if (href !== '/') {
          stepRef.current = 3;
          setStep(3);
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
          document.body.style.overscrollBehavior = '';
        }
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const normalizedPath = currentPath.length > 1 ? currentPath.replace(/\/+$/, '') : currentPath;
  const isLegalPage = ['/privacy', '/cookie', '/termini', '/vendita'].includes(normalizedPath);
  const isShopIndex = normalizedPath === '/shop';
  const isCartPage = normalizedPath === '/carrello';
  const isCheckoutPage = normalizedPath === '/checkout';
  const shopProductId = normalizedPath.startsWith('/shop/') ? normalizedPath.slice('/shop/'.length) : null;
  const isOrderConfirmed = normalizedPath === '/ordine-confermato';
  const isGestioneShop = normalizedPath === '/gestione-shop';
  const isShopArea = isShopIndex || isCartPage || isCheckoutPage || Boolean(shopProductId);
  const isNotFound = !isLegalPage && !isShopIndex && !isCartPage && !isCheckoutPage && !shopProductId && !isOrderConfirmed && !isGestioneShop && normalizedPath !== '/';

  useEffect(() => {
    let metaRobots = document.querySelector("meta[name='robots']");
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }

    if (isNotFound) {
      document.title = 'Pagina non trovata | Hop Storm';
      metaRobots.setAttribute('content', 'noindex');
    } else if (isGestioneShop) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else if (normalizedPath === '/') {
      document.title = 'Hop Storm | Birrificio Artigianale Indipendente a Roma';
      metaRobots.setAttribute('content', 'index, follow');
      const metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Birrificio artigianale indipendente a Roma. Fresh Wave, Red Moon ed Enjoy: birre non filtrate né pastorizzate, per locali e privati. Fusti e bottiglie 33cl.'
        );
      }
      const linkCan = document.querySelector("link[rel='canonical']");
      if (linkCan) {
        linkCan.setAttribute('href', 'https://www.hopstorm.it/');
      }
    } else if (!isOrderConfirmed && !isCartPage && !isCheckoutPage) {
      metaRobots.setAttribute('content', 'index, follow');
    }
  }, [normalizedPath, isNotFound, isOrderConfirmed, isCartPage, isCheckoutPage, isGestioneShop]);

  return (
    <IntroContext.Provider value={{ step, reduced }}>
      <ShopProvider>
        <div className="bg-black min-h-screen text-white font-sans selection:bg-[#D4A24E] selection:text-black">
          <JsonLd />
          {isGestioneShop ? null : isShopArea ? <ShopAgeGate /> : <AgeGate />}
          <CookieBanner />
          <CartDrawer />
          <Navbar />
          <main>
            {isNotFound ? (
              <div className="pt-40 pb-24 px-6 min-h-[70vh] flex flex-col items-center justify-center text-center">
                <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557006/foto/hopstorm_logo_bianco_trasparente_l3ftm9.png" alt="Hop Storm — birrificio artigianale a Roma" className="h-24 w-auto mb-8 opacity-50" />
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">404</h1>
                <p className="text-white/60 text-xl mb-8">La pagina che cerchi non esiste o è stata spostata.</p>
                <a href="/" className="bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]">
                  Torna alla Home
                </a>
              </div>
            ) : isLegalPage ? (
              <LegalPages currentHash={normalizedPath} />
            ) : isGestioneShop ? (
              <GestioneShopPage />
            ) : isOrderConfirmed ? (
              <OrderConfirmedPage />
            ) : isCheckoutPage ? (
              <CheckoutPage />
            ) : isCartPage ? (
              <CartPage />
            ) : shopProductId ? (
              <ProductDetailPage productId={shopProductId} />
            ) : isShopIndex ? (
              <ShopPage />
            ) : (
              <>
                <HopStormHero />
                <OurBeers />
                <About />
                <ForLocals />
                <ForPrivate />
                <Contact />
                <Faq />
                <MobileBottomBar />
              </>
            )}
          </main>
          <Footer />
        </div>
      </ShopProvider>
    </IntroContext.Provider>
  );
}
