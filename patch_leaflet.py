import re

# 1. Update WhereToFindUs.tsx
with open('src/components/WhereToFindUs.tsx', 'r') as f:
    tsx_content = f.read()

old_tile = """<TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />"""
            
new_tile = """<TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />"""

tsx_content = tsx_content.replace(old_tile, new_tile)

with open('src/components/WhereToFindUs.tsx', 'w') as f:
    f.write(tsx_content)

# 2. Update index.css
with open('src/index.css', 'a') as f:
    f.write('''
.leaflet-tile-pane {
  filter: invert(1) hue-rotate(180deg) brightness(0.92) contrast(0.86) saturate(0.6);
}
.leaflet-control-attribution {
  background: rgba(0,0,0,0.6) !important;
  color: rgba(255,255,255,0.7) !important;
}
.leaflet-control-attribution a { color: #D4A24E !important; }
''')
