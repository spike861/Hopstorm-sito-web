import re

with open('src/components/JsonLd.tsx', 'r') as f:
    content = f.read()

new_faq_schema = """      {
        "@type": "FAQPage",
        "@id": "https://www.hopstorm.it/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Dove si trova il birrificio Hop Storm?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hop Storm è un birrificio artigianale indipendente con sede a Roma, in Via Chiana 38 (00198)."
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
          },
          {
            "@type": "Question",
            "name": "Si possono visitare il birrificio o organizzare degustazioni?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Per informazioni su visite, eventi o degustazioni organizzate da Hop Storm a Roma, ti invitiamo a contattare direttamente il birrificio tramite il modulo contatti, telefono o email."
            }
          }
        ]
      }"""

# Try to find and replace the old FAQPage schema.
content = re.sub(r'\{\s*"@type":\s*"FAQPage".*?\]\s*\}', new_faq_schema, content, flags=re.DOTALL)

with open('src/components/JsonLd.tsx', 'w') as f:
    f.write(content)
