import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Beer, Store } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

export default function WhereToFindUs() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const locationRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const locations = [
    {
      id: "al-vecchio-bar-13",
      name: "Al Vecchio Bar 13",
      type: "Bar",
      city: "Roma",
      address: "Via Aurelia, 1253, 00166 La Massimina-Casal Lumbroso RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Al+Vecchio+Bar+13+Massimina+Roma",
      lat: 41.8841262, 
      lng: 12.3762584
    },
    {
      id: "zio-severino",
      name: "Ristorante da Zio Severino",
      type: "Ristorante",
      city: "Aranova",
      address: "Via Michele Rosi, 1, 00054 Aranova RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Ristorante+da+Zio+Severino+Aranova",
      lat: 41.9280000, 
      lng: 12.2400000
    },
    {
      id: "bernys-burger",
      name: "Berny's Burger",
      type: "Burger Bar",
      city: "Aranova",
      address: "Via Michele Rosi, 82, 00054 Aranova RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Berny's+Burger+Aranova",
      lat: 41.9282000, 
      lng: 12.2402000
    },
    {
      id: "le-carni-di-fabio",
      name: "Le Carni di Fabio",
      type: "Macelleria",
      city: "Aranova",
      address: "Via Siapiccia, 1, 00054 Aranova RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Le+Carni+di+Fabio+Aranova",
      lat: 41.9219668, 
      lng: 12.2393051
    },
    {
      id: "pizzeria-i-massimi",
      name: "Pizzeria i Massimi",
      type: "Pizzeria",
      city: "Roma",
      address: "Via Portuense, 962, 00148 Roma RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Pizzeria+i+Massimi+Roma",
      lat: 41.8414290, 
      lng: 12.3940086
    },
    {
      id: "bernys-bar",
      name: "Berny's Bar",
      type: "Bar",
      city: "Aranova",
      address: "Via Michele Rosi, 82, 00054 Aranova RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Berny's+Bar+Aranova",
      lat: 41.9281478, 
      lng: 12.2401620
    },
    {
      id: "la-mangiatoia",
      name: "La Mangiatoia",
      type: "Ristorante",
      city: "Roma",
      address: "V. dei Due Ponti, 181, 00189 Roma RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=La+Mangiatoia+Roma",
      lat: 41.9661848, 
      lng: 12.4510162
    },
    {
      id: "stabilimento-white",
      name: "Stabilimento White",
      type: "Stabilimento Balneare",
      city: "Ladispoli",
      address: "Lungomare Regina Elena, 27, 00055 Ladispoli RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Stabilimento+White+Ladispoli",
      lat: 41.9462241, 
      lng: 12.0791973
    },
    {
      id: "cabullo-librari",
      name: "Cabullo (Largo dei Librari)",
      type: "Ristorante / Pub",
      city: "Roma",
      address: "Largo dei Librari, 89, 00186 Roma RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Cabullo+Largo+dei+Librari+Roma",
      lat: 41.8946184, 
      lng: 12.4735710
    },
    {
      id: "cabullo-lungaretta",
      name: "Cabullo (Via della Lungaretta)",
      type: "Ristorante / Pub",
      city: "Roma",
      address: "Via della Lungaretta, 149, 00153 Roma RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Cabullo+Via+della+Lungaretta+Roma",
      lat: 41.8894245, 
      lng: 12.4746908
    },
    {
      id: "creuza-de-ma",
      name: "Stabilimento Creuza de Mä",
      type: "Stabilimento Balneare",
      city: "Maccarese",
      address: "Via di Praia a Mare, 4, 00057 Maccarese RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Stabilimento+Creuza+de+Mä+Maccarese",
      lat: 41.8779325, 
      lng: 12.1874466
    },
    {
      id: "cielo-brasilia",
      name: "Stabilimento Cielo (ex Brasilia)",
      type: "Stabilimento Balneare",
      city: "Maccarese",
      address: "Via di Praia a Mare, 22 B, 00054 Fiumicino RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Stabilimento+Cielo+ex+Brasilia+Maccarese",
      lat: 41.8778325, 
      lng: 12.1875466
    }
  ];

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
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>

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

        {/* Interactive Map */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-[400px] md:h-[500px] mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-20"
        >
          <MapContainer center={mapCenter} zoom={10} scrollWheelZoom={false} className="w-full h-full bg-[#111111] z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
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
                <div className="flex items-center gap-2 text-white/50 text-sm font-mono uppercase tracking-wider mb-4">
                  <Store size={14} />
                  <span>{loc.type}</span>
                </div>
                <address className="flex items-start gap-2 text-white/70 not-italic">
                  <MapPin size={18} className="shrink-0 mt-0.5 text-[#D4A24E]" />
                  <span>{loc.address}</span>
                </address>
              </header>

              <div className="mb-8 flex-grow">
                <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-3">
                  <Beer size={14} />
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
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                  aria-label={`Apri ${loc.name} su Google Maps`}
                >
                  <Navigation size={16} /> Apri su Maps
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]"></div>
          <h4 className="text-3xl font-bold text-white mb-4">Hai un locale?</h4>
          <p className="text-white/70 text-lg mb-8 font-light">
            Unisciti ai partner che servono birra artigianale autentica. Contattaci per scoprire le condizioni riservate al settore Horeca.
          </p>
          <a 
            href="https://wa.me/393491973069?text=Ciao%2C%20gestisco%20un%20locale%20e%20vorrei%20ricevere%20il%20vostro%20listino%20Horeca%20per%20fusti%20e%20bottiglie." 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            Richiedi Listino Horeca
          </a>
        </motion.div>
      </div>
    </section>
  );
}
