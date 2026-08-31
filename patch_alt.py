import re
import glob

for filename in glob.glob('src/components/*.tsx'):
    with open(filename, 'r') as f:
        content = f.read()
        
    new_content = content.replace('alt="Hop Storm"', 'alt="Hop Storm — birrificio artigianale a Roma"')
    new_content = new_content.replace('alt="Hop Storm Logo"', 'alt="Hop Storm — birrificio artigianale a Roma"')
    
    if new_content != content:
        with open(filename, 'w') as f:
            f.write(new_content)
