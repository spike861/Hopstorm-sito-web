import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.static('dist'));

const server = app.listen(4000, async () => {
    console.log("Server started on port 4000");
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    
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

    await browser.close();
    server.close();
    console.log("Prerendering complete.");
});
