import re

with open('src/components/OurBeers.tsx', 'r') as f:
    content = f.read()

# 1. Replace pow()
content = content.replace(
    '--p-entry-eased: pow(var(--p-entry), 0.4);',
    '--p-entry-eased: calc(var(--p-entry) * (2 - var(--p-entry)));'
)

# 2. Remove crossOrigin="anonymous"
content = content.replace(' crossOrigin="anonymous"', '')

# 3. Add to mobile CSS block
# Let's find:
#       .s-center-col .s-single-glow {
#        display: none !important;
#      }
mobile_glow_orig = """.s-center-col .s-single-glow {
        display: none !important;
      }"""
      
mobile_glow_new = """.s-center-col .s-single-glow {
        display: block !important;
        opacity: 0.45 !important;
        filter: blur(60px) !important;
      }
      .s-single-bottle {
        filter: none !important;
        transform-style: flat !important;
        will-change: auto !important;
        opacity: 1 !important;
      }
      .s-bottle-outer,
      .s-bottle-inner {
        transform-style: flat !important;
      }
      .s-bottle-outer {
        opacity: var(--b-opacity);
      }
      .s-center-col {
        perspective: none !important;
      }"""

if mobile_glow_orig in content:
    content = content.replace(mobile_glow_orig, mobile_glow_new)
else:
    print("Could not find mobile glow orig block")

with open('src/components/OurBeers.tsx', 'w') as f:
    f.write(content)
