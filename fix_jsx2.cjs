const fs = require('fs');
let content = fs.readFileSync('src/components/OurBeers.tsx', 'utf8');

const oldStr = `            </div>
          </div>
          </div>
          </section>
        );
      })}`;

const newStr = `            </div>
          </div>
          </section>
        );
      })}`;

content = content.replace(oldStr, newStr);
fs.writeFileSync('src/components/OurBeers.tsx', content);
