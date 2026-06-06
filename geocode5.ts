import fs from 'fs';

const places = [
  { id: "creuza-de-ma", address: "Via di Praia a Mare, Maccarese Italy" },
  { id: "cielo-brasilia", address: "Via di Praia a Mare, Fiumicino Italy" },
  { id: "bernys", address: "Via Michele Rosi, Fiumicino Italy" },
  { id: "le-carni-di-fabio", address: "Via Siapiccia, Fiumicino Italy" },
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
