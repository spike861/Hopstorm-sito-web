import fs from 'fs';

const places = [
  { id: "al-vecchio-bar-13", address: "Via Ildebrando della Giovanna, 13, 00166 Roma RM" },
  { id: "zio-severino", address: "Via Michele Rosi, 101, 00050 Aranova RM" },
  { id: "bernys-burger", address: "Via Michele Rosi, 201, 00050 Aranova RM" },
  { id: "le-carni-di-fabio", address: "Via Michele Rosi, 51, 00050 Aranova RM" },
  { id: "pizzeria-i-massimi", address: "Via Portuense, 863, 00148 Roma RM" }, // I Massimi is often around Via dei Massimi / Portuense
  { id: "bernys-bar", address: "Via Michele Rosi, 60, 00050 Aranova RM" },
  { id: "la-mangiatoia", address: "Via dei Due Macelli, 97, 00187 Roma RM" },
  { id: "stabilimento-white", address: "Lungomare Regina Elena, 27, 00055 Ladispoli RM" },
  { id: "cabullo-librari", address: "Largo dei Librari, 89, 00186 Roma RM" },
  { id: "cabullo-lungaretta", address: "Via della Lungaretta, 149, 00153 Roma RM" },
  { id: "creuza-de-ma", address: "Via della Pineta di Fregene, 113, 00054 Maccarese RM" },
  { id: "cielo-brasilia", address: "Via di Praia a Mare, 29, 00054 Maccarese RM" }
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
