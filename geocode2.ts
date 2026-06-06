import fs from 'fs';

const addresses = [
  "Via Michele Rosi, Fiumicino",
  "Via della Pineta di Fregene, Fiumicino",
  "Via di Praia a Mare, Fiumicino",
  "Via Casal Lombardo, Roma",
  "Via Ildebrando della Giovanna, Roma"
];

async function geocode() {
  for (const q of addresses) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'HopStormApp/1.0' } });
      const data = await res.json();
      if (data && data.length > 0) {
        console.log(`${q} -> ${data[0].lat}, ${data[0].lon}`);
      } else {
        console.log(`${q} -> NOT FOUND`);
      }
    } catch (e: any) {
      console.log(`Error: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}
geocode();
