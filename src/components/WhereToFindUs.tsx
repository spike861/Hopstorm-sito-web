import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Beer, Store, Plus, Minus, RotateCcw } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { locations } from '../data/locations';

// Dynamic icon creation based on active state
const createIcon = (isActive: boolean) => new L.DivIcon({
  className: 'bg-transparent transition-all duration-300',
  html: `<div class="transition-all duration-300 flex items-center justify-center rounded-full border-4 border-black ${
    isActive 
      ? 'w-10 h-10 bg-[#C0392B] shadow-[0_0_25px_rgba(192,57,43,0.9)] scale-110 z-50' 
      : 'w-8 h-8 bg-[#D4A24E] shadow-[0_0_15px_rgba(212,162,78,0.5)]'
  }"><div class="w-2 h-2 ${isActive ? 'bg-white' : 'bg-black'} rounded-full"></div></div>`,
  iconSize: isActive ? [40, 40] : [32, 32],
  iconAnchor: isActive ? [20, 20] : [16, 16],
  tooltipAnchor: [0, isActive ? -20 : -16]
});

// Custom cluster icon generator to match theme
const createClusterCustomIcon = function (cluster: any) {
  const count = cluster.getChildCount();
  return L.divIcon({
    html: `<div class="w-10 h-10 bg-black/80 backdrop-blur-sm border-2 border-[#D4A24E] text-[#D4A24E] rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(212,162,78,0.4)]">
      <span>${count}</span>
    </div>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(40, 40, true),
  });
};

// Accessible custom map controls with explicit Italian aria-labels
function CustomMapControls({ onReset }: { onReset: () => void }) {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2 pointer-events-auto">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        className="w-10 h-10 bg-black/90 hover:bg-[#D4A24E] hover:text-black text-white border border-white/20 rounded-xl flex items-center justify-center font-bold text-xl shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E]"
        aria-label="Ingrandisci la mappa"
        title="Ingrandisci la mappa"
      >
        <Plus size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        className="w-10 h-10 bg-black/90 hover:bg-[#D4A24E] hover:text-black text-white border border-white/20 rounded-xl flex items-center justify-center font-bold text-xl shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E]"
        aria-label="Riduci la mappa"
        title="Riduci la mappa"
      >
        <Minus size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => {
          map.setView([41.90, 12.35], 10);
          onReset();
        }}
        className="w-10 h-10 bg-black/90 hover:bg-[#D4A24E] hover:text-black text-white border border-white/20 rounded-xl flex items-center justify-center shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E]"
        aria-label="Reimposta la visualizzazione della mappa"
        title="Reimposta la visualizzazione della mappa"
      >
        <RotateCcw size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function WhereToFindUs() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const locationRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleMarkerClick = (id: string) => {
    setActiveLocationId(id);
    const element = locationRefs.current[id];
    if (element) {
      // Offset for sticky navbar if needed
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    // Clear active state after animation completes to allow re-triggering
    setTimeout(() => {
      setActiveLocationId(null);
    }, 2000);
  };

  // Center coordinates (Roma / Fiumicino area)
  const mapCenter: [number, number] = [41.90, 12.35];

  return (
    <section id="dove-trovarci" className="bg-[#050505] py-24 md:py-32 px-6 flex flex-col overflow-hidden border-t border-white/5 relative">
      {/* Subtle grid background for a technical/premium feel */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '64px 64px' }} aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <header className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 uppercase"
          >
            Bevi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A24E] to-[#C0392B]">Locale</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            I pub, burger bar e ristoranti che hanno scelto di non scendere a compromessi. Trova la spina o la bottiglia Hop Storm più vicina a te.
          </motion.p>
        </header>

        {/* Interactive Map with custom accessible controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-[400px] md:h-[500px] mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-20"
        >
          <MapContainer 
            center={mapCenter} 
            zoom={10} 
            scrollWheelZoom={false} 
            zoomControl={false}
            className="w-full h-full bg-[#111111] z-0"
          >
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <CustomMapControls onReset={() => setActiveLocationId(null)} />
            <MarkerClusterGroup 
              chunkedLoading 
              iconCreateFunction={createClusterCustomIcon}
              maxClusterRadius={40}
            >
              {locations.map((loc) => {
                const isActive = activeLocationId === loc.id;
                return (
                  <Marker 
                    key={loc.id} 
                    position={[loc.lat, loc.lng] as [number, number]} 
                    icon={createIcon(isActive)}
                    zIndexOffset={isActive ? 1000 : 0}
                    eventHandlers={{
                      click: () => handleMarkerClick(loc.id),
                      mouseover: () => setActiveLocationId(loc.id),
                      mouseout: () => setActiveLocationId(null),
                    }}
                  >
                    <Tooltip 
                      direction="top" 
                      offset={[0, -10]} 
                      opacity={1} 
                      className="dark-tooltip"
                    >
                      <div className="font-sans text-center px-1 py-0.5">
                        <strong className="text-[#D4A24E] block text-base mb-1">{loc.name}</strong>
                        <span className="text-gray-300 text-sm">{loc.address}</span>
                      </div>
                    </Tooltip>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          </MapContainer>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {locations.map((loc, i) => (
             <motion.article
              ref={(el) => (locationRefs.current[loc.id] = el)}
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActiveLocationId(loc.id)}
              onMouseLeave={() => setActiveLocationId(null)}
              onClick={() => setActiveLocationId(loc.id)}
              className={`bg-[#0a0a0a] rounded-2xl p-8 hover:border-white/30 transition-all duration-500 flex flex-col group cursor-pointer
                ${activeLocationId === loc.id 
                  ? 'border border-[#C0392B] ring-4 ring-[#C0392B]/20 scale-[1.02] shadow-[0_0_30px_rgba(192,57,43,0.3)] z-10 relative' 
                  : 'border border-white/10 scale-100 shadow-none'
                }`}
            >
              <header className="mb-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#D4A24E] transition-colors">{loc.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm font-mono uppercase tracking-wider mb-4">
                  <Store size={14} aria-hidden="true" />
                  <span>{loc.type}</span>
                </div>
                <address className="flex items-start gap-2 text-white/70 not-italic">
                  <MapPin size={18} className="shrink-0 mt-0.5 text-[#D4A24E]" aria-hidden="true" />
                  <span>{loc.address}</span>
                </address>
              </header>

              <div className="mb-8 flex-grow">
                <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest mb-3">
                  <Beer size={14} aria-hidden="true" />
                  <span>In mescita:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {loc.products.map((product, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/10 text-white/80 text-sm px-3 py-1 rounded-full font-medium">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <footer className="mt-auto">
                <a 
                  href={loc.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]"
                  aria-label={`Apri la posizione di ${loc.name} su Google Maps`}
                >
                  <Navigation size={16} aria-hidden="true" /> Apri su Maps
                </a>
              </footer>
            </motion.article>
          ))}
        </div>

        {/* B2B CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#110D05] to-[#0a0a0a] border border-[#D4A24E]/20 rounded-3xl p-10 text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]" aria-hidden="true"></div>
          <h3 className="text-3xl font-bold text-white mb-4">Hai un locale?</h3>
          <p className="text-white/70 text-lg mb-8 font-light">
            Unisciti ai partner che servono birra artigianale autentica. Contattaci per scoprire le condizioni riservate al settore Horeca.
          </p>
          <a 
            href="https://wa.me/393491973069?text=Ciao%2C%20gestisco%20un%20locale%20e%20vorrei%20ricevere%20il%20vostro%20listino%20Horeca%20per%20fusti%20e%20bottiglie." 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold items-center justify-center gap-2 text-sm uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]"
            aria-label="Richiedi il listino Horeca Hop Storm su WhatsApp"
          >
            Richiedi Listino Horeca
          </a>
        </motion.div>
      </div>
    </section>
  );
}
