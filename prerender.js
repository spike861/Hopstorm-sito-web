import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.static('dist'));

const server = app.listen(4000, async () => {
    console.log("Server started on port 4000");
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:4000', { waitUntil: 'networkidle0' });
    const html = await page.content();
    fs.writeFileSync('dist/index.html', html);
    await browser.close();
    server.close();
    console.log("Prerendered index.html successfully.");
});
