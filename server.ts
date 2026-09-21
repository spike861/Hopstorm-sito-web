import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Canonical redirect
app.use((req, res, next) => {
  if (req.hostname === 'hopstorm.it') {
    return res.redirect(301, `https://www.hopstorm.it${req.url}`);
  }
  next();
});

const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Serve prerendered HTML for legal pages
    app.get('/privacy', (req, res) => res.sendFile(path.join(distPath, 'privacy/index.html')));
    app.get('/cookie', (req, res) => res.sendFile(path.join(distPath, 'cookie/index.html')));
    app.get('/termini', (req, res) => res.sendFile(path.join(distPath, 'termini/index.html')));
    
    // Fallback to main index for other routes (e.g. 404 handled by client)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
