const fs = require('fs');

let about = fs.readFileSync('src/components/About.tsx', 'utf8');
about = about.replace(/"start top"/g, '"start start"');
fs.writeFileSync('src/components/About.tsx', about);

let eb = fs.readFileSync('src/ErrorBoundary.tsx', 'utf8');
eb = eb.replace(/import React, \{ Component, ErrorInfo, ReactNode \} from 'react';/, "import React, { ErrorInfo, ReactNode } from 'react';");
eb = eb.replace(/export class ErrorBoundary extends Component<Props, State> \{/, "export class ErrorBoundary extends React.Component<Props, State> {");
fs.writeFileSync('src/ErrorBoundary.tsx', eb);

