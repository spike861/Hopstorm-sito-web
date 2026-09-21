export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Brewery",
        "@id": "https://www.hopstorm.it/#organization",
        "name": "Hop Storm",
        "description": "Birrificio artigianale indipendente a Roma. Produciamo Fresh Wave (Helles), Red Moon (Red Ale) ed Enjoy (IPA): birre di carattere in bottiglia da 330 ml, per privati e per locali. Scopri dove trovarci.",
        "url": "https://www.hopstorm.it/",
        "image": "https://res.cloudinary.com/dcbomk6i8/image/upload/c_fill,w_1200,h_630,g_auto,f_jpg,q_auto/hf_0073_sxijow.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Chiana 38",
          "addressLocality": "Roma",
          "postalCode": "00198",
          "addressRegion": "RM",
          "addressCountry": "IT"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 41.921350,
          "longitude": 12.503460
        },
        "telephone": "+393491973069",
        "email": "hopstorm.brewery@yahoo.com",
        "priceRange": "€€",
        "areaServed": {
          "@type": "City",
          "name": "Roma"
        },
        "sameAs": [
          "https://www.instagram.com/hopstorm.brewery"
        ]
      },
      {
        "@type": "Product",
        "@id": "https://www.hopstorm.it/#fresh-wave",
        "name": "Fresh Wave",
        "description": "Helles moderna: lager chiara, dorata e scorrevole. Profilo pulito, equilibrio delicato, grande bevibilità.",
        "brand": {
          "@type": "Brand",
          "name": "Hop Storm"
        },
        "category": "Birra artigianale",
        "image": "https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025652/Progetto_senza_titolo_157_e0kgio.png",
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "ABV", "value": "5.0%" },
          { "@type": "PropertyValue", "name": "IBU", "value": "18-22" },
          { "@type": "PropertyValue", "name": "Formato", "value": "330 ml" }
        ]
      },
      {
        "@type": "Product",
        "@id": "https://www.hopstorm.it/#red-moon",
        "name": "Red Moon",
        "description": "Birra rossa ad alta fermentazione, un equilibrio perfetto tra malto e luppolo. Morbida e avvolgente, con un profilo maltato elegante e una chiusura equilibrata.",
        "brand": {
          "@type": "Brand",
          "name": "Hop Storm"
        },
        "category": "Birra artigianale",
        "image": "https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025638/Progetto_senza_titolo_160_o8evpd.png",
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "ABV", "value": "5.6%" },
          { "@type": "PropertyValue", "name": "IBU", "value": "20-28" },
          { "@type": "PropertyValue", "name": "Formato", "value": "330 ml" }
        ]
      },
      {
        "@type": "Product",
        "@id": "https://www.hopstorm.it/#enjoy",
        "name": "Enjoy",
        "description": "Birra IPA ad alta fermentazione, colore dorato brillante. Un'esplosione di luppoli Citra e Mosaic che si chiude con un amaro pulito e persistente.",
        "brand": {
          "@type": "Brand",
          "name": "Hop Storm"
        },
        "category": "Birra artigianale",
        "image": "https://res.cloudinary.com/dcbomk6i8/image/upload/f_webp,q_auto:good/v1788025646/Progetto_senza_titolo_159_phajgt.png",
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "ABV", "value": "7.2%" },
          { "@type": "PropertyValue", "name": "IBU", "value": "45-60" },
          { "@type": "PropertyValue", "name": "Formato", "value": "330 ml" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.hopstorm.it/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Come si diventa rivenditore o partner Hop Storm?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hop Storm fornisce birra artigianale a bar, ristoranti e locali di Roma, Fiumicino e Ladispoli. Per diventare partner basta compilare il modulo dedicato nella sezione \"Per i locali\", indicando il locale, la zona e le birre di interesse: il birrificio risponde con disponibilità, formati e condizioni."
            }
          },
          {
            "@type": "Question",
            "name": "Che differenza c'è tra Fresh Wave, Red Moon ed Enjoy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hop Storm produce tre birre artigianali. Fresh Wave è una Helles chiara e scorrevole (5.0% vol), dal profilo pulito e delicato. Red Moon è una Red Ale ramata (5.6% vol), maltata e avvolgente. Enjoy è una IPA dorata (7.2% vol), luppolata con Citra e Mosaic, dal finale amaro e persistente. Tutte in bottiglia da 330 ml."
            }
          },
          
          {
            "@type": "Question",
            "name": "Dove posso comprare le birre Hop Storm a Roma?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le birre artigianali Hop Storm possono essere acquistate tramite ordine diretto oppure gustate nei locali e pub partner a Roma e provincia."
            }
          },
          {
            "@type": "Question",
            "name": "Quali birre produce Hop Storm?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hop Storm produce attualmente tre birre artigianali: Fresh Wave (Helles, 5.0%), Red Moon (Red Ale, 5.6%) ed Enjoy (IPA, 7.2%). Tutte disponibili in bottiglia da 330 ml."
            }
          },
          {
            "@type": "Question",
            "name": "Fornite birra artigianale a locali e ristoranti?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sì, Hop Storm fornisce pub, ristoranti e locali con birra artigianale, sia in bottiglie da 330 ml che in fusti da 20 litri, senza vincoli di minimo d'ordine."
            }
          },
          {
            "@type": "Question",
            "name": "Le birre sono disponibili in bottiglia o alla spina?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le birre Hop Storm sono disponibili in bottiglie di vetro da 330 ml per i clienti privati, e sia in bottiglia che in fusti da 20 litri per le attività di ristorazione (alla spina)."
            }
          }
        ]
      }
    ]
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
