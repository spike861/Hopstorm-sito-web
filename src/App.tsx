import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HopStormHero from './components/HopStormHero';
import OurBeers from './components/OurBeers';
import About from './components/About';
import ForLocals from './components/ForLocals';
import ForPrivate from './components/ForPrivate';
import WhereToFindUs from './components/WhereToFindUs';
import Events from './components/Events';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import AgeGate from './components/AgeGate';
import LegalPages from './components/LegalPages';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isLegalPage = ['#/privacy', '#/cookie', '#/termini'].includes(currentHash);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#D4A24E] selection:text-black">
      <JsonLd />
      <AgeGate />
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
            <Events />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
