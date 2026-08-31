import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<p className="text-white/40">\n            Birra artigianale. Tempesta di sapore.\n          </p>',
    '<p className="text-white/40 text-sm leading-relaxed max-w-sm">\n            Hop Storm è un birrificio artigianale indipendente a Roma. Produciamo Fresh Wave (Helles), Red Moon (Red Ale) ed Enjoy (IPA) in bottiglia da 330 ml, per privati e per locali.\n          </p>'
)

content = content.replace(
    '<p>C.F. / P.IVA: 18407651001</p>',
    '<p>Telefono: +393491973069</p>\n            <p>Email: hopstorm.brewery@yahoo.com</p>\n            <p>C.F. / P.IVA: 18407651001</p>'
)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(content)

