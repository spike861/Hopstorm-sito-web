export interface BeerHop {
  name: string;
  desc: string;
}

export interface Beer {
  slug: string;
  name: string;
  style: string;
  abv: number;
  ibu: string;
  servingTemp: string;
  appearance: string;
  aroma: string;
  taste: string;
  shortDescription: string;
  sensoryNotes: string[];
  formats: string[];
  image: string;
  img?: string;
  allergens: string[];        // allergeni presenti, da mostrare in evidenza
  allergenNote?: string;      // nota opzionale (es. tracce)
  ingredients?: string;       // lista ingredienti opzionale
  // UI and styling attributes
  color: string;
  tag: string;
  styleDescription: string;
  hops: BeerHop[];
  foodPairings: string[];
}

export function formatAbv(abv: number): string {
  return `${abv.toString().replace('.', ',')}%`;
}

export const beers: Beer[] = [
  {
    slug: 'fresh-wave',
    name: 'Fresh Wave',
    style: 'Helles Lager',
    abv: 4.5,
    ibu: '18-22',
    servingTemp: '5-8°C',
    appearance: 'Dorato brillante, limpido, schiuma bianca fine e persistente.',
    aroma: 'Note erbacee e floreali leggere, cereale e miele.',
    taste: 'Attacco morbido e maltato, finale pulito e rinfrescante.',
    shortDescription: "È la birra per chi cerca freschezza e leggerezza: agrumata, secca, dissetante. Perfetta d'estate, con il pesce, con la pizza, o da sola dopo una giornata calda.",
    sensoryNotes: ['Pane fresco', 'Cereale', 'Miele leggero', 'Erbaceo', 'Agrumi', 'Amaro gentile'],
    formats: ['fusto 20 litri', 'fusto 24 litri', 'bottiglia 33 cl'],
    image: 'https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025652/Progetto_senza_titolo_157_e0kgio.png',
    img: 'https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025652/Progetto_senza_titolo_157_e0kgio.png',
    allergens: ['Orzo'],
    ingredients: "Acqua, malto d'orzo, luppolo, lievito",
    color: '#D4A24E',
    tag: 'Fresca e pulita',
    styleDescription: 'Helles moderna: lager chiara, dorata e scorrevole. Profilo pulito, equilibrio delicato, grande bevibilità.',
    hops: [
      { name: 'MAGNUM', desc: 'amaro pulito e lineare, sfumature erbacee e speziate.' },
      { name: 'SAPHIR', desc: 'aroma elegante, note floreali, agrumate e speziate.' }
    ],
    foodPairings: ['Pizza', 'Fritti', 'Pesce leggero', 'Aperitivi']
  },
  {
    slug: 'red-moon',
    name: 'Red Moon',
    style: 'Red Ale',
    abv: 5.8,
    ibu: '20-28',
    servingTemp: '5-8°C',
    appearance: 'Rossa ramata intensa, limpida, schiuma beige fine e persistente.',
    aroma: 'Prevalenza di malto tostato, caramello e crosta di pane, con una lieve nota erbacea.',
    taste: 'Equilibrio perfetto tra malto e luppolo, ingresso morbido e avvolgente, finale pulito ma persistente.',
    shortDescription: 'È per chi vuole più profondità: maltata, avvolgente, con note di caramello e frutta secca. Ideale con la carne, con i formaggi stagionati, o a fine pasto con un cioccolato fondente.',
    sensoryNotes: ['Caramello leggero', 'Biscotto tostato', 'Crosta di pane', 'Malto tostato', 'Erbaceo delicato', 'Amaro equilibrato'],
    formats: ['fusto 20 litri', 'fusto 24 litri', 'bottiglia 33 cl'],
    image: 'https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025638/Progetto_senza_titolo_160_o8evpd.png',
    img: 'https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025638/Progetto_senza_titolo_160_o8evpd.png',
    allergens: ['Orzo'],
    ingredients: "Acqua, malto d'orzo, luppolo, lievito",
    color: '#C0392B',
    tag: 'Maltata e intensa',
    styleDescription: 'Birra rossa ad alta fermentazione, un equilibrio perfetto tra malto e luppolo. Morbida e avvolgente, con un profilo maltato elegante e una chiusura equilibrata.',
    hops: [
      { name: 'MAGNUM', desc: 'amaro pulito e intenso, utile a bilanciare la componente maltata.' },
      { name: 'MALTO TOSTATO', desc: 'regala il profilo aromatico della birra, con note di caramello, crosta di pane e lieve tostatura.' }
    ],
    foodPairings: ['Hamburger', 'Carne alla griglia', 'Salumi', 'Formaggi stagionati', 'Pizza saporita']
  },
  {
    slug: 'enjoy',
    name: 'Enjoy',
    style: 'IPA',
    abv: 7.2,
    ibu: '45-60',
    servingTemp: '5-8°C',
    appearance: 'Dorato brillante, leggermente velata, schiuma bianca persistente.',
    aroma: 'Intenso e fresco, dominato da agrumi e frutta tropicale.',
    taste: 'Ingresso morbido, forte componente luppolata, finale amaro pulito e persistente.',
    shortDescription: 'È per chi ama i luppoli e le emozioni forti: aromi esplosivi di agrumi e frutta tropicale con un finale amaro pulito e deciso. Perfetta con hamburger, carne alla griglia e cibi saporiti o speziati.',
    sensoryNotes: ['Agrumi (pompelmo, lime)', 'Frutta tropicale', 'Resinoso leggero', 'Erbaceo', 'Amaro deciso', 'Finale persistente'],
    formats: ['fusto 20 litri', 'fusto 24 litri', 'bottiglia 33 cl'],
    image: 'https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025646/Progetto_senza_titolo_159_phajgt.png',
    img: 'https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025646/Progetto_senza_titolo_159_phajgt.png',
    allergens: ['Orzo'],
    ingredients: "Acqua, malto d'orzo, luppolo (Citra, Mosaic), lievito",
    color: '#F08A24',
    tag: 'Luppolata e agrumata',
    styleDescription: "Birra IPA ad alta fermentazione, colore dorato brillante. Un'esplosione di luppoli Citra e Mosaic che si chiude con un amaro pulito e persistente.",
    hops: [
      { name: 'CITRA', desc: 'note intense di agrumi e frutta tropicale (pompelmo, lime, mango)' },
      { name: 'MOSAIC', desc: 'profilo complesso con sentori tropicali, resinosi e leggermente erbacei' }
    ],
    foodPairings: ['Hamburger', 'Carne alla griglia', 'Piatti speziati', 'Street food', 'Cucina etnica']
  }
];

export default beers;
