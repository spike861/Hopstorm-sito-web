import fs from 'fs';

const places = [
  { id: "la-mangiatoia", address: "Via dei Due Ponti, 181, 00189 Roma Italy" },
  { id: "creuza-de-ma", address: "Via di Praia a Mare, 4, 00054 Italy" },
  { id: "cielo-brasilia", address: "Via di Praia a Mare, 22, 00054 Fiumicino Italy" },
  { id: "bernys-bar", address: "Via Michele Rosi, 82, 00054 Aranova Italy" },
  { id: "bernys-burger", address: "Via Michele Rosi, 82, 00054 Aranova Italy" },
  { id: "le-carni-di-fabio", address: "Via Siapiccia, 1, 00054 Aranova Italy" },
  { id: "pizzeria-i-massimi", address: "Via Portuense, 962, 00148 Roma Italy" },
  { id: "zio-severino", address: "Via Michele Rosi, 1, 00054 Aranova Italy" },
  { id: "al-vecchio-bar-13", address: "Via Aurelia, 1253, 00166 Roma Italy" }
];

async function geocode() {
  for (const p of places) {
    const query = encodeURIComponent(p.address.replace("RM", "Italy"));
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'HopStormApp/1.0' } });
      const data = await res.json();
      if (data && data.length > 0) {
        console.log(`${p.id} FOUND -> lat: ${data[0].lat}, lng: ${data[0].lon}`);
      } else {
        console.log(`${p.id} NOT FOUND`);
      }
    } catch (e: any) {
      console.log(`Error: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}
geocode();
