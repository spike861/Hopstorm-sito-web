export default function Faq() {
  const faqs = [
    {
      q: "Dove si trova il birrificio Hop Storm?",
      a: "Hop Storm è un birrificio artigianale indipendente con sede a Roma, in Via Chiana 38 (00198)."
    },
    {
      q: "Dove posso comprare le birre Hop Storm a Roma?",
      a: "Le birre artigianali Hop Storm possono essere acquistate tramite ordine diretto oppure gustate nei locali e pub partner a Roma e provincia."
    },
    {
      q: "Quali birre produce Hop Storm?",
      a: "Hop Storm produce attualmente tre birre artigianali: Fresh Wave (Helles, 5.0%), Red Moon (Red Ale, 5.6%) ed Enjoy (IPA, 7.2%). Tutte disponibili in bottiglia da 330 ml."
    },
    {
      q: "Fornite birra artigianale a locali e ristoranti?",
      a: "Sì, Hop Storm fornisce pub, ristoranti e locali con birra artigianale, sia in bottiglie da 330 ml che in fusti da 20 litri, senza vincoli di minimo d'ordine."
    },
    {
      q: "Le birre sono disponibili in bottiglia o alla spina?",
      a: "Le birre Hop Storm sono disponibili in bottiglie di vetro da 330 ml per i clienti privati, e sia in bottiglia che in fusti da 20 litri per le attività di ristorazione (alla spina)."
    },
    {
      q: "Si possono visitare il birrificio o organizzare degustazioni?",
      a: "Per informazioni su visite, eventi o degustazioni organizzate da Hop Storm a Roma, ti invitiamo a contattare direttamente il birrificio tramite il modulo contatti, telefono o email."
    }
  ];

  return (
    <section id="faq" className="bg-[#050505] py-24 md:py-32 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-12 uppercase text-center">
          Domande Frequenti
        </h2>
        <div className="grid gap-4 md:gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8 backdrop-blur-md">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {faq.q}
              </h3>
              <p className="text-white/70 leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
