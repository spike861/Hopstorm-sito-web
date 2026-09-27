export interface HopStormEvent {
  id: string;
  name: string;
  type?: string;
  description: string;
  startDate: string; // ISO 8601 string, e.g. "2026-05-15T18:00:00+02:00"
  endDate?: string;
  eventStatus?: string;
  eventAttendanceMode?: string;
  location: {
    name: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      postalCode?: string;
      addressRegion?: string;
      addressCountry: string;
    };
  };
  image?: string;
  featured?: boolean;
}

export const events: HopStormEvent[] = [
  {
    id: "palatorrino-boxe-night",
    name: "Hop Storm @ Palatorrino Boxe Night",
    type: "Evento Sportivo",
    description: "Hop Storm sale sul ring. Saremo presenti come partner ufficiale alla grande serata di boxe al Palatorrino. Birra artigianale, adrenalina e grande sport: un'accoppiata vincente. Vi aspettiamo a bordo ring con le nostre spine per goderci lo spettacolo insieme.",
    startDate: "2026-05-15T18:00:00+02:00",
    location: {
      name: "Palatorrino",
      address: {
        streetAddress: "Via Fiume Giallo 47",
        addressLocality: "Roma",
        postalCode: "00144",
        addressRegion: "RM",
        addressCountry: "IT"
      }
    },
    image: "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/f_auto,q_auto/foto/redmoon_pub_cel_l7iv47.jpg",
    featured: true
  }
];

/**
 * Returns only upcoming events by comparing startDate with current timestamp.
 * Filters out all events with past dates automatically.
 */
export function getUpcomingEvents(): HopStormEvent[] {
  const now = new Date();
  return events.filter(event => {
    const eventDate = new Date(event.startDate);
    return !isNaN(eventDate.getTime()) && eventDate.getTime() > now.getTime();
  });
}

export default events;
