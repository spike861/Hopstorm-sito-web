import re

with open('src/components/JsonLd.tsx', 'r') as f:
    content = f.read()

new_schema = """const schema = {
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
      }
    ]
  };"""

content = re.sub(r'const schema = \{.*?\n  \};', new_schema, content, flags=re.DOTALL)

with open('src/components/JsonLd.tsx', 'w') as f:
    f.write(content)

