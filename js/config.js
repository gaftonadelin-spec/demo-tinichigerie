/**
 * SITE_CONFIG — datele firmei, într-un singur loc.
 * Modifică aici numele, telefonul, adresa sau endpoint-ul API;
 * restul site-ului le preia automat (vezi js/app.js → applyConfig()).
 */
window.SITE_CONFIG = {
  brand: {
    name: "Ateliero Metal & Tinichigerie",
    shortName: "Ateliero",
    tagline: "Acoperișuri din tablă, sisteme pluviale și confecții metalice la comandă",
    foundedYear: 2009
  },

  contact: {
    phoneDisplay: "0722 123 456",
    phoneE164: "+40722123456",
    whatsapp: "40722123456", // fără + și fără spații, formatul cerut de wa.me
    email: "contact@ateliero-metal.ro",
    address: "Str. Industriilor nr. 14, Hala 3",
    city: "Timișoara",
    county: "Timiș",
    serviceArea: "Timiș, Arad și Caraș-Severin",
    mapsUrl: "https://maps.google.com/?q=Timisoara+Romania"
  },

  schedule: [
    { days: "Luni – Vineri", hours: "07:30 – 17:00" },
    { days: "Sâmbătă", hours: "08:00 – 13:00" },
    { days: "Duminică", hours: "Închis" }
  ],

  stats: {
    yearsLabel: "ani în atelier",
    projects: "1.400+",
    projectsLabel: "lucrări predate",
    warrantyYears: 10
  },

  api: {
    /** DEMO: true → formularul trimite pe WhatsApp. false → POST JSON la quoteEndpoint. */
    demoMode: true,
    baseUrl: "",
    quoteEndpoint: "/api/quote"
  },

  social: {
    facebook: "#",
    instagram: "#"
  }
};
