import re

with open('src/components/HopStormHero.tsx', 'r') as f:
    content = f.read()

# 1. Update isMobile logic
content = re.sub(
    r"const \[isMobile, setIsMobile\] = React\.useState<boolean>\(\(\) => typeof window !== 'undefined' \? window\.matchMedia\(\"\(max-aspect-ratio: 1/1\)\"\)\.matches \|\| window\.matchMedia\(\"\(hover: none\) and \(pointer: coarse\)\"\)\.matches : false\);",
    r"const [isMobile, setIsMobile] = React.useState<boolean>(() => { if (typeof window === 'undefined') return false; const isIOS = /iP(hone|ad|od)/.test(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document); return window.matchMedia('(max-width: 768px)').matches || isIOS; });",
    content
)

content = re.sub(
    r"const mql = window\.matchMedia\(\"\(max-aspect-ratio: 1/1\)\"\);\s*const pointerMql = window\.matchMedia\(\"\(hover: none\) and \(pointer: coarse\)\"\);\s*const handler = \(\) => \{\s*setIsMobile\(mql\.matches \|\| pointerMql\.matches\);\s*\};\s*mql\.addEventListener\(\"change\", handler\);\s*pointerMql\.addEventListener\(\"change\", handler\);\s*return \(\) => \{\s*mql\.removeEventListener\(\"change\", handler\);\s*pointerMql\.removeEventListener\(\"change\", handler\);\s*\};",
    r"const mql = window.matchMedia('(max-width: 768px)');\n    const handler = () => { const isIOS = /iP(hone|ad|od)/.test(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document); setIsMobile(mql.matches || isIOS); };\n    mql.addEventListener('change', handler);\n    return () => mql.removeEventListener('change', handler);",
    content
)

with open('src/components/HopStormHero.tsx', 'w') as f:
    f.write(content)
