import Navbar from './components/Navbar';
import HopStormHero from './components/HopStormHero';
import OurBeers from './components/OurBeers';
import About from './components/About';
import ForLocals from './components/ForLocals';
import ForPrivate from './components/ForPrivate';
import WhereToFindUs from './components/WhereToFindUs';
import Events from './components/Events';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#D4A24E] selection:text-black">
      <Navbar />
      <main>
        <HopStormHero />
        <OurBeers />
        <About />
        <ForLocals />
        <ForPrivate />
        <WhereToFindUs />
        <Events />
      </main>
      <Footer />
    </div>
  );
}
