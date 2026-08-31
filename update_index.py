import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace language
content = content.replace('<html lang="en">', '<html lang="it">')

# New head content
new_head = """  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Hop Storm — Birrificio Artigianale Indipendente a Roma</title>
    <meta name="description" content="Birrificio artigianale indipendente a Roma. Produciamo Fresh Wave (Helles), Red Moon (Red Ale) ed Enjoy (IPA): birre di carattere in bottiglia da 330 ml, per privati e per locali. Scopri dove trovarci." />
    <link rel="canonical" href="https://www.hopstorm.it/" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="geo.region" content="IT-RM" />
    <meta name="geo.placename" content="Roma" />
    
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Hop Storm" />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:url" content="https://www.hopstorm.it/" />
    <meta property="og:title" content="Hop Storm — Birrificio Artigianale Indipendente a Roma" />
    <meta property="og:description" content="Fresh Wave, Red Moon ed Enjoy: tre birre artigianali prodotte a Roma, senza compromessi. Per privati e per locali." />
    <meta property="og:image" content="https://res.cloudinary.com/dcbomk6i8/image/upload/c_fill,w_1200,h_630,g_auto,f_jpg,q_auto/hf_0073_sxijow.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Hop Storm — Birrificio Artigianale a Roma" />
    <meta name="twitter:description" content="Fresh Wave, Red Moon ed Enjoy: tre birre artigianali prodotte a Roma." />
    <meta name="twitter:image" content="https://res.cloudinary.com/dcbomk6i8/image/upload/c_fill,w_1200,h_630,g_auto,f_jpg,q_auto/hf_0073_sxijow.jpg" />
  </head>"""

# Replace old head
content = re.sub(r'<head>.*?</head>', new_head, content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(content)

