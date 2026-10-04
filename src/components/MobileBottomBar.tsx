import { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const heroEl = document.getElementById('hero-root');
      const contactEl = document.getElementById('contatti');
      const footerEl = document.querySelector('footer');

      const viewportHeight = window.innerHeight;

      // Compare dopo aver superato l'hero
      const passedHero = heroEl
        ? heroEl.getBoundingClientRect().bottom <= 60
        : window.scrollY > viewportHeight * 0.85;

      // Sparisce quando è visibile il modulo contatti o il footer
      const isContactVisible = contactEl
        ? contactEl.getBoundingClientRect().top < viewportHeight &&
          contactEl.getBoundingClientRect().bottom > 0
        : false;

      const isFooterVisible = footerEl
        ? footerEl.getBoundingClientRect().top < viewportHeight &&
          footerEl.getBoundingClientRect().bottom > 0
        : false;

      setVisible(passedHero && !isContactVisible && !isFooterVisible);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <div
      role="region"
      aria-label="Azioni rapide mobile"
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-t border-white/10 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="h-[56px] px-4 flex items-center gap-3">
        {/* Verso #per-i-privati, e poi verso #shop quando ci sarà lo shop */}
        <a
          href="#per-i-privati"
          tabIndex={visible ? 0 : -1}
          onClick={() => trackEvent('click_order', { posizione: 'barra_mobile' })}
          className="flex-1 h-10 bg-[#D4A24E] text-black hover:bg-white transition-colors rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center text-center shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]"
        >
          ORDINA
        </a>
        <a
          href="#dove-trovarci"
          tabIndex={visible ? 0 : -1}
          className="flex-1 h-10 border border-white/25 bg-white/5 text-white hover:bg-white/15 transition-colors rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          TROVA UN LOCALE
        </a>
      </div>
    </div>
  );
}
