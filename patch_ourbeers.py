import re

with open('src/components/OurBeers.tsx', 'r') as f:
    content = f.read()

# Replace alt={b.name}
content = content.replace('alt={b.name}', 'alt={`${b.name}, birra artigianale ${b.style} del birrificio Hop Storm di Roma, bottiglia 330 ml`}')

# Replace <h2>{b.name}</h2> with <h3>{b.name}</h3>
content = re.sub(
    r'(<h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-\[0\.9\] mb-1 lg:mb-2">)(\s*\{b\.name\}\s*)(</h2>)',
    r'<h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-[0.9] mb-1 lg:mb-2">\2</h3>',
    content
)

with open('src/components/OurBeers.tsx', 'w') as f:
    f.write(content)
