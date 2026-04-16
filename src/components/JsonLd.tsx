export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Brewery",
        "@id": "https://hopstorm.it/#organization",
        "name": "Hop Storm Brewery",
        "url": "https://hopstorm.it",
        "logo": "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/luppoleto_mbz6xy.jpg",
        "image": "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/luppoleto_mbz6xy.jpg",
        "description": "Birrificio artigianale indipendente a Roma. Produciamo Fresh Wave e Red Moon, birre di carattere servite senza compromessi a privati e locali.",
        "telephone": "+393491973069",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Roma",
          "addressLocality": "Roma",
          "postalCode": "00100",
          "addressCountry": "IT"
        },
        "sameAs": [
          "https://instagram.com/hopstorm.brewery"
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://hopstorm.it/#products",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Product",
              "name": "Fresh Wave - Helles Lager",
              "image": "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557007/foto/freshwave_mare_cel_mjglil.jpg",
              "description": "Chiara, fresca e dissetante. Un equilibrio perfetto tra malto e luppolo per una bevuta pulita che non stanca mai. 4,5% VOL.",
              "brand": {
                "@type": "Brand",
                "name": "Hop Storm"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Product",
              "name": "Red Moon - Rossa Artigianale",
              "image": "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/redmoon_pub_cel_l7iv47.jpg",
              "description": "Dal carattere deciso e dalla struttura avvolgente. Una birra complessa, maltata, perfetta per accompagnare sapori intensi. 5,8% VOL.",
              "brand": {
                "@type": "Brand",
                "name": "Hop Storm"
              }
            }
          }
        ]
      },
      {
        "@type": "Event",
        "@id": "https://hopstorm.it/#event-palatorrino",
        "name": "Hop Storm @ Palatorrino Boxe Night",
        "startDate": "2026-05-15T18:00:00+02:00",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "Place",
          "name": "Palatorrino",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Via Fiume Giallo 47",
            "addressLocality": "Roma",
            "postalCode": "00144",
            "addressCountry": "IT"
          }
        },
        "image": [
          "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/redmoon_pub_cel_l7iv47.jpg"
        ],
        "description": "Hop Storm sale sul ring. Saremo presenti come partner ufficiale alla grande serata di boxe al Palatorrino. Birra artigianale, adrenalina e grande sport.",
        "organizer": {
          "@id": "https://hopstorm.it/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://hopstorm.it/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Spedite la birra a domicilio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sì, spediamo i nostri box da 6 e 12 bottiglie in tutta Italia. Contattaci su WhatsApp per i dettagli e i costi di spedizione."
            }
          },
          {
            "@type": "Question",
            "name": "Avete un listino per i locali (Horeca)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Assolutamente sì. Forniamo pub, ristoranti e burger bar con fusti da 20 litri e bottiglie da 33cl. Non abbiamo minimi d'ordine per iniziare."
            }
          },
          {
            "@type": "Question",
            "name": "Dove posso bere la vostra birra alla spina?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puoi trovare le nostre birre nei migliori locali partner di Roma e provincia. Consulta la sezione 'Dove Trovarci' sul nostro sito."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://hopstorm.it/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://hopstorm.it/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Le Nostre Birre",
            "item": "https://hopstorm.it/#le-nostre-birre"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Eventi",
            "item": "https://hopstorm.it/#eventi"
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
