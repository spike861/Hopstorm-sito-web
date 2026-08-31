import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("import Contact from './components/Contact';", "import Contact from './components/Contact';\nimport Faq from './components/Faq';")
content = content.replace("<Contact />\n            </>", "<Contact />\n              <Faq />\n            </>")

with open('src/App.tsx', 'w') as f:
    f.write(content)
