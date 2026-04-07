export default function Footer() {
  return (
    <footer id="contatti" className="bg-black border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div className="flex flex-col items-start">
          <img src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557006/foto/hopstorm_logo_bianco_trasparente_l3ftm9.png" alt="Hop Storm" className="h-16 md:h-20 w-auto mb-6" />
          <p className="text-white/40">
            Birra artigianale. Tempesta di sapore.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold mb-2">Esplora</h4>
          <a href="#le-nostre-birre" className="text-white/60 hover:text-white transition-colors w-fit">Le nostre birre</a>
          <a href="#chi-siamo" className="text-white/60 hover:text-white transition-colors w-fit">Chi Siamo</a>
          <a href="#per-i-locali" className="text-white/60 hover:text-white transition-colors w-fit">Per i Locali</a>
          <a href="#per-i-privati" className="text-white/60 hover:text-white transition-colors w-fit">Per i Privati</a>
          <a href="#dove-trovarci" className="text-white/60 hover:text-white transition-colors w-fit">Dove Trovarci</a>
          <a href="#eventi" className="text-white/60 hover:text-white transition-colors w-fit">Eventi</a>
        </div>

        {/* Contacts */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold mb-2">Contatti & Sede</h4>
          <a href="mailto:info@hopstorm.it" className="text-white/60 hover:text-white transition-colors w-fit">info@hopstorm.it</a>
          <a href="https://instagram.com/hopstorm" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors w-fit">Instagram: @hopstorm</a>
          
          <div className="text-white/60 mt-2 space-y-1">
            <p className="font-bold">HOPSTORM S.R.L.</p>
            <p>Via Chiana 38</p>
            <p>Roma (RM)</p>
            <p>C.F. / P.IVA: 18407651001</p>
            <p>PEC: Hopstormsrl@legalmail.it</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center border-t border-white/5 pt-8 flex flex-col gap-4">
        <p className="text-white/40 text-sm">
          © 2026 HOPSTORM S.R.L. Tutti i diritti riservati. Bevi responsabilmente.
        </p>
        <p className="text-white/40 text-sm">
          Sito pensato e realizzato da <a href="https://www.instagram.com/gadamo_official/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">Graziano Adamo</a>
        </p>
      </div>
    </footer>
  );
}
