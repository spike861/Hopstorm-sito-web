import { beers, formatAbv } from '../data/beers';
import { locations } from '../data/locations';
import { getUpcomingEvents } from '../data/events';

export default function JsonLd() {
  const upcomingEvents = getUpcomingEvents();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Brewery",
        "@id": "https://www.hopstorm.it/#brewery",
        "name": "Hop Storm",
        "description": "Birrificio artigianale indipendente a Roma. Produciamo Fresh Wave (Helles Lager), Red Moon (Red Ale) ed Enjoy (IPA): birre non filtrate né pastorizzate, per locali e privati.",
        "url": "https://www.hopstorm.it/",
        "image": "https://res.cloudinary.com/dcbomk6i8/image/upload/c_fill,w_1200,h_630,f_auto,q_auto:good/hf_0073_sxijow.jpg",
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
        "@type": "WebSite",
        "@id": "https://www.hopstorm.it/#website",
        "name": "Hop Storm",
        "url": "https://www.hopstorm.it/",
        "inLanguage": "it-IT",
        "publisher": {
          "@id": "https://www.hopstorm.it/#brewery"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.hopstorm.it/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.hopstorm.it/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Le Nostre Birre",
            "item": "https://www.hopstorm.it/#le-nostre-birre"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Chi Siamo",
            "item": "https://www.hopstorm.it/#chi-siamo"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Per i Locali",
            "item": "https://www.hopstorm.it/#per-i-locali"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Per i Privati",
            "item": "https://www.hopstorm.it/#per-i-privati"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Dove Trovarci",
            "item": "https://www.hopstorm.it/#dove-trovarci"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Contatti",
            "item": "https://www.hopstorm.it/#contatti"
          },
          {
            "@type": "ListItem",
            "position": 8,
            "name": "FAQ",
            "item": "https://www.hopstorm.it/#faq"
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://www.hopstorm.it/#beers",
        "name": "Le Nostre Birre Artigianali",
        "description": "Le birre artigianali di Hop Storm prodotte a Roma: Fresh Wave, Red Moon ed Enjoy.",
        "numberOfItems": beers.length,
        "itemListElement": beers.map((beer, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "@id": `https://www.hopstorm.it/#${beer.slug}`,
            "name": beer.name,
            "image": beer.image,
            "description": beer.styleDescription || beer.shortDescription,
            "brand": {
              "@type": "Brand",
              "name": "Hop Storm"
            },
            "category": "Birra artigianale",
            "additionalProperty": [
              { "@type": "PropertyValue", "name": "ABV", "value": formatAbv(beer.abv) },
              { "@type": "PropertyValue", "name": "IBU", "value": beer.ibu },
              { "@type": "PropertyValue", "name": "Stile", "value": beer.style },
              { "@type": "PropertyValue", "name": "Temperatura di servizio", "value": beer.servingTemp },
              { "@type": "PropertyValue", "name": "Allergeni", "value": "Orzo (glutine)" },
              ...beer.formats.map(f => ({ "@type": "PropertyValue", "name": "Formato", "value": f }))
            ]
          }
        }))
      },
      {
        "@type": "ItemList",
        "@id": "https://www.hopstorm.it/#dove-trovarci",
        "name": "Locali Partner Hop Storm - Dove Trovarci",
        "description": "Bar, pub, pizzerie e ristoranti partner a Roma e provincia dove trovare e gustare le birre artigianali Hop Storm.",
        "numberOfItems": locations.length,
        "itemListElement": locations.map((loc, index) => {
          const isRestaurant = loc.type.toLowerCase().includes('ristorante') || loc.type.toLowerCase().includes('pizzeria');
          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": isRestaurant ? "Restaurant" : "BarOrPub",
              "@id": `https://www.hopstorm.it/#location-${loc.id}`,
              "name": loc.name,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": loc.address,
                "addressLocality": loc.city,
                "addressRegion": "RM",
                "addressCountry": "IT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": loc.lat,
                "longitude": loc.lng
              },
              "hasMap": loc.mapsLink
            }
          };
        })
      },
      ...upcomingEvents.map(event => ({
        "@type": "Event",
        "@id": `https://www.hopstorm.it/#event-${event.id}`,
        "name": event.name,
        "description": event.description,
        "startDate": event.startDate,
        ...(event.endDate ? { "endDate": event.endDate } : {}),
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": event.location.name,
          "address": {
            "@type": "PostalAddress",
            ...event.location.address
          }
        },
        ...(event.image ? { "image": event.image } : {})
      })),
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
              "text": `Hop Storm produce tre birre artigianali: Fresh Wave è una Helles chiara e scorrevole (${formatAbv(beers[0].abv)}), dal profilo pulito e delicato; Red Moon è una Red Ale ramata (${formatAbv(beers[1].abv)}), maltata e avvolgente; Enjoy è una IPA dorata (${formatAbv(beers[2].abv)}), luppolata con Citra e Mosaic, dal finale amaro e persistente. Tutte disponibili in bottiglia da 33 cl e fusti da 20 e 24 litri.`
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
              "text": `Hop Storm produce attualmente tre birre artigianali: Fresh Wave (Helles Lager, ${formatAbv(beers[0].abv)}), Red Moon (Red Ale, ${formatAbv(beers[1].abv)}) ed Enjoy (IPA, ${formatAbv(beers[2].abv)}). Tutte disponibili in bottiglie da 33 cl e fusti da 20 e 24 litri.`
            }
          },
          {
            "@type": "Question",
            "name": "Fornite birra artigianale a locali e ristoranti?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sì, Hop Storm fornisce pub, ristoranti e locali con birra artigianale, sia in bottiglie da 33 cl che in fusti da 20 e 24 litri, senza vincoli di minimo d'ordine."
            }
          },
          {
            "@type": "Question",
            "name": "Le birre sono disponibili in bottiglia o alla spina?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le birre Hop Storm sono disponibili in bottiglie di vetro da 33 cl per i clienti privati, e sia in bottiglia che in fusti da 20 e 24 litri per le attività di ristorazione (alla spina)."
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
