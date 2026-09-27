export interface PartnerLocation {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  products: string[];
  mapsLink: string;
  lat: number;
  lng: number;
}

export const locations: PartnerLocation[] = [
  {
    id: "al-vecchio-bar-13",
    name: "Al Vecchio Bar 13",
    type: "Bar",
    city: "Roma",
    address: "Via Aurelia, 1253, 00166 La Massimina-Casal Lumbroso RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Al+Vecchio+Bar+13+Massimina+Roma",
    lat: 41.8841262,
    lng: 12.3762584
  },
  {
    id: "zio-severino",
    name: "Ristorante da Zio Severino",
    type: "Ristorante",
    city: "Aranova",
    address: "Via Michele Rosi, 1, 00054 Aranova RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Ristorante+da+Zio+Severino+Aranova",
    lat: 41.9280000,
    lng: 12.2400000
  },
  {
    id: "bernys-burger",
    name: "Berny's Burger",
    type: "Burger Bar",
    city: "Aranova",
    address: "Via Michele Rosi, 82, 00054 Aranova RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Berny's+Burger+Aranova",
    lat: 41.9282000,
    lng: 12.2402000
  },
  {
    id: "le-carni-di-fabio",
    name: "Le Carni di Fabio",
    type: "Macelleria",
    city: "Aranova",
    address: "Via Siapiccia, 1, 00054 Aranova RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Le+Carni+di+Fabio+Aranova",
    lat: 41.9219668,
    lng: 12.2393051
  },
  {
    id: "pizzeria-i-massimi",
    name: "Pizzeria i Massimi",
    type: "Pizzeria",
    city: "Roma",
    address: "Via Portuense, 962, 00148 Roma RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Pizzeria+i+Massimi+Roma",
    lat: 41.8414290,
    lng: 12.3940086
  },
  {
    id: "bernys-bar",
    name: "Berny's Bar",
    type: "Bar",
    city: "Aranova",
    address: "Via Michele Rosi, 82, 00054 Aranova RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Berny's+Bar+Aranova",
    lat: 41.9281478,
    lng: 12.2401620
  },
  {
    id: "la-mangiatoia",
    name: "La Mangiatoia",
    type: "Ristorante",
    city: "Roma",
    address: "V. dei Due Ponti, 181, 00189 Roma RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=La+Mangiatoia+Roma",
    lat: 41.9661848,
    lng: 12.4510162
  },
  {
    id: "stabilimento-white",
    name: "Stabilimento White",
    type: "Stabilimento Balneare",
    city: "Ladispoli",
    address: "Lungomare Regina Elena, 27, 00055 Ladispoli RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Stabilimento+White+Ladispoli",
    lat: 41.9462241,
    lng: 12.0791973
  },
  {
    id: "cabullo-lungaretta",
    name: "Cabullo (Via della Lungaretta)",
    type: "Ristorante / Pub",
    city: "Roma",
    address: "Via della Lungaretta, 149, 00153 Roma RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Cabullo+Via+della+Lungaretta+Roma",
    lat: 41.8894245,
    lng: 12.4746908
  },
  {
    id: "creuza-de-ma",
    name: "Stabilimento Creuza de Mä",
    type: "Stabilimento Balneare",
    city: "Maccarese",
    address: "Via di Praia a Mare, 4, 00057 Maccarese RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Stabilimento+Creuza+de+Mä+Maccarese",
    lat: 41.8779325,
    lng: 12.1874466
  },
  {
    id: "cielo-brasilia",
    name: "Stabilimento Cielo (ex Brasilia)",
    type: "Stabilimento Balneare",
    city: "Maccarese",
    address: "Via di Praia a Mare, 22 B, 00054 Fiumicino RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Stabilimento+Cielo+ex+Brasilia+Maccarese",
    lat: 41.8778325,
    lng: 12.1875466
  },
  {
    id: "roma-beer-company",
    name: "Roma Beer Company",
    type: "Birreria / Pub",
    city: "Roma",
    address: "Piazzale di Ponte Milvio, 40-42, 00135 Roma RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://share.google/l0eC75Dr6j8cMUWx4",
    lat: 41.9373259,
    lng: 12.4667183
  },
  {
    id: "duecento-gradi",
    name: "200 Gradi",
    type: "Paninoteca / Bar",
    city: "Roma",
    address: "Piazza del Risorgimento, 3, 00192 Roma RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://share.google/JTkMRMUnjtqkDHN4U",
    lat: 41.9064522,
    lng: 12.4565357
  },
  {
    id: "tennis-club-kipling",
    name: "Tennis Club Kipling",
    type: "Circolo Sportivo / Bar",
    city: "Roma",
    address: "Via dei Cantelmo, 129, 00148 Roma RM",
    products: ["Fresh Wave", "Red Moon", "Enjoy"],
    mapsLink: "https://share.google/RTYA2IyK4gPt155xD",
    lat: 41.8602056,
    lng: 12.4126684
  }
];

export default locations;
