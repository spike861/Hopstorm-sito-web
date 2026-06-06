import fs from 'fs';

const addresses = [
  "Via Ildebrando della Giovanna 13, 00166 Roma RM",
  "Via Michele Rosi 101, 00050 Aranova RM",
  "Via Michele Rosi, 00050 Aranova RM",
  "Via di Macchia Saponara, Roma",
  "Via dei Due Macelli, Roma",
  "Lungomare Regina Elena, Ladispoli",
  "Largo dei Librari 89, 00186 Roma RM",
  "Via della Lungaretta 149, 00153 Roma RM",
  "Via della Pineta di Fregene, Maccarese",
  "Via di Praia a Mare, Maccarese"
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
