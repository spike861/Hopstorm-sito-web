import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.static('dist'));

function copyFallback() {
    const indexPath = path.join('dist', 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.warn('[prerender] dist/index.html non trovato.');
        return;
    }
    const routes = ['privacy', 'cookie', 'termini'];
    for (const route of routes) {
        const targetDir = path.join('dist', route);
        fs.mkdirSync(targetDir, { recursive: true });
        const targetFile = path.join(targetDir, 'index.html');
        fs.copyFileSync(indexPath, targetFile);
        console.log(`[prerender] Fallback: dist/index.html copiato in ${targetFile}`);
    }
}

const server = app.listen(4000, async () => {
    console.log("Server avviato sulla porta 4000 per il prerendering");
    let browser = null;

    try {
        browser = await puppeteer.launch({ 
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
    } catch (err) {
        console.warn("[prerender] puppeteer.launch fallito (Chrome non trovato o non avviabile):", err.message);
        console.log("[prerender] Esecuzione fallback: copia di dist/index.html in dist/privacy, dist/cookie e dist/termini");
        copyFallback();
        server.close(() => {
            console.log("[prerender] Server chiuso. Uscita con codice 0.");
            process.exit(0);
        });
        setTimeout(() => process.exit(0), 1000).unref();
        return;
    }

    try {
        const routes = [
            { path: '/', file: 'index.html' },
            { path: '/privacy', file: 'privacy/index.html' },
            { path: '/cookie', file: 'cookie/index.html' },
            { path: '/termini', file: 'termini/index.html' }
        ];

        for (const route of routes) {
            const page = await browser.newPage();
            await page.goto(`http://localhost:4000${route.path}`, { waitUntil: 'networkidle0' });
            const html = await page.content();
            
            const outPath = path.join('dist', route.file);
            fs.mkdirSync(path.dirname(outPath), { recursive: true });
            fs.writeFileSync(outPath, html);
            await page.close();
            console.log(`Prerendered ${route.path} to ${route.file}`);
        }

        console.log("Prerendering completato con successo.");
    } catch (err) {
        console.warn("[prerender] Errore durante il prerendering, esecuzione fallback:", err.message);
        copyFallback();
    } finally {
        if (browser) {
            try {
                await browser.close();
            } catch (e) {
                // ignore
            }
        }
        server.close(() => {
            process.exit(0);
        });
        setTimeout(() => process.exit(0), 1000).unref();
    }
});
