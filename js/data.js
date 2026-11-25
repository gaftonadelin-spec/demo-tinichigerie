/**
 * SITE_DATA — conținut editabil (servicii, tarife, portofoliu, recenzii).
 * Structura e gândită ca răspuns JSON de la un viitor CMS/API:
 *   GET /api/services  → SITE_DATA.services
 *   GET /api/pricing   → SITE_DATA.pricing
 *   GET /api/projects  → SITE_DATA.portfolio
 * Fiecare imagine are `img` (Unsplash) și `fallback` (SVG local din ./assets).
 */
const UNSPLASH = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

window.SITE_DATA = {
  services: [
    {
      id: "acoperisuri",
      title: "Acoperișuri din tablă",
      text: "Montaj nou sau înlocuire: tablă fălțuită, țiglă metalică și tablă cutată, cu folie anticondens și accesorii de etanșare.",
      specs: ["Tablă 0,5–0,6 mm", "Fălțuire dublă la fața locului"],
      img: UNSPLASH("1632759145351-1d592919f522"),
      fallback: "./assets/img/roof.svg"
    },
    {
      id: "pluviale",
      title: "Jgheaburi și burlane",
      text: "Sisteme pluviale semicirculare și rectangulare, dimensionate după suprafața acoperișului. Reparăm și scurgerile existente.",
      specs: ["Ø 100–150 mm", "Zinc-titan, oțel vopsit, cupru"],
      img: UNSPLASH("1600585154340-be6161a56a0c"),
      fallback: "./assets/img/gutter.svg"
    },
    {
      id: "confectii",
      title: "Confecții din tablă la comandă",
      text: "Glafuri, coame, dolii, șorțuri de atic și capace de calcan, îndoite pe abkant după măsurile luate de noi.",
      specs: ["Abkant 3 m", "Orice culoare RAL"],
      img: UNSPLASH("1504917595217-d4dc5ebe6122"),
      fallback: "./assets/img/bend.svg"
    },
    {
      id: "industrial",
      title: "Hale și clădiri industriale",
      text: "Învelitori și placări de fațadă cu panouri sandwich și tablă cutată, inclusiv luminatoare și străpungeri pentru ventilație.",
      specs: ["Lucru la înălțime autorizat", "Echipe de 4–8 oameni"],
      img: UNSPLASH("1541888946425-d81bb19240f5"),
      fallback: "./assets/img/hall.svg"
    },
    {
      id: "cosuri",
      title: "Coșuri și tubulatură",
      text: "Pălării de coș, tubulatură de ventilație și hote industriale din inox sau tablă zincată, cu prinderi și etanșări la acoperiș.",
      specs: ["Inox AISI 304", "Sudură TIG"],
      img: UNSPLASH("1565008447742-97f6f38c985c"),
      fallback: "./assets/img/chimney.svg"
    },
    {
      id: "reparatii",
      title: "Reparații și mentenanță",
      text: "Infiltrații, tablă smulsă de vânt, îmbinări desfăcute, jgheaburi înfundate. Constatare în 48 de ore în Timișoara.",
      specs: ["Intervenții după furtună", "Contract anual pentru firme"],
      img: UNSPLASH("1504307651254-35680f356dfd"),
      fallback: "./assets/img/repair.svg"
    }
  ],

  /** Tarife orientative (manoperă + material standard), RON fără TVA. */
  pricing: [
    { work: "Acoperiș țiglă metalică, montaj complet", unit: "m²", from: 95, to: 140, note: "Material inclus, fără dulgherie" },
    { work: "Acoperiș tablă fălțuită", unit: "m²", from: 160, to: 240, note: "Tablă 0,5 mm, culori RAL standard" },
    { work: "Jgheab semicircular Ø 125 cu accesorii", unit: "ml", from: 85, to: 120, note: "Oțel vopsit; zinc-titan la cerere" },
    { work: "Burlan Ø 100 cu brățări", unit: "ml", from: 70, to: 95, note: "Include coturi și racord la canalizare" },
    { work: "Glafuri și șorțuri îndoite pe abkant", unit: "ml", from: 45, to: 90, note: "Depinde de desfășurată" },
    { work: "Reparație infiltrație punctuală", unit: "lucrare", from: 350, to: 900, note: "Constatare gratuită în Timișoara" }
  ],

  /** Portofoliu. `category` trebuie să existe în `portfolioFilters`. */
  portfolioFilters: [
    { id: "toate", label: "Toate" },
    { id: "rezidential", label: "Case" },
    { id: "industrial", label: "Hale" },
    { id: "pluvial", label: "Sisteme pluviale" },
    { id: "confectii", label: "Confecții" }
  ],

  portfolio: [
    { title: "Casă P+M, tablă fălțuită gri grafit", place: "Dumbrăvița", area: "210 m²", category: "rezidential", img: "./assets/img/roof.svg", fallback: "./assets/img/roof.svg" },
    { title: "Hală logistică, învelitoare și luminatoare", place: "Ghiroda", area: "2.300 m²", category: "industrial", img: UNSPLASH("1586528116311-ad8dd3c8310d", 700), fallback: "./assets/img/hall.svg" },
    { title: "Jgheaburi zinc-titan, imobil interbelic", place: "Timișoara, Iosefin", area: "86 ml", category: "pluvial", img: UNSPLASH("1600585154340-be6161a56a0c", 700), fallback: "./assets/img/gutter.svg" },
    { title: "Șorțuri de atic RAL 7016", place: "Giroc", area: "140 ml", category: "confectii", img: UNSPLASH("1504917595217-d4dc5ebe6122", 700), fallback: "./assets/img/bend.svg" },
    { title: "Înlocuire acoperiș după grindină", place: "Lugoj", area: "165 m²", category: "rezidential", img: UNSPLASH("1632759145351-1d592919f522", 700), fallback: "./assets/img/repair.svg" },
    { title: "Hotă și tubulatură inox, bucătărie restaurant", place: "Arad", area: "38 ml", category: "confectii", img: UNSPLASH("1565008447742-97f6f38c985c", 700), fallback: "./assets/img/chimney.svg" },
    { title: "Placare fațadă cu panouri sandwich", place: "Sânandrei", area: "1.100 m²", category: "industrial", img: UNSPLASH("1541888946425-d81bb19240f5", 700), fallback: "./assets/img/hall.svg" },
    { title: "Sistem pluvial complet, vilă nouă", place: "Moșnița Nouă", area: "64 ml", category: "pluvial", img: UNSPLASH("1570129477492-45c003edd2be", 700), fallback: "./assets/img/gutter.svg" }
  ],

  process: [
    { title: "Constatare și măsurători", text: "Venim la fața locului, măsurăm acoperișul și fotografiem detaliile. În Timișoara, constatarea e gratuită." },
    { title: "Deviz scris în 48 de ore", text: "Primești devizul pe poziții: material, manoperă, termen. Fără costuri ascunse descoperite pe parcurs." },
    { title: "Execuție și predare", text: "Lucrăm la termenul din contract, curățăm șantierul și predăm cu certificat de garanție pe lucrare." }
  ],

  reviews: [
    { name: "Cristian M.", place: "Dumbrăvița", text: "Au schimbat tot acoperișul în 6 zile, cum era în contract. Au strâns zilnic resturile de tablă și șuruburile din curte.", rating: 5, work: "Acoperiș tablă fălțuită" },
    { name: "Ioana P.", place: "Timișoara", text: "Aveam infiltrație la coș de doi ani. Au venit a doua zi, au refăcut șorțul și de atunci nu a mai picurat nimic.", rating: 5, work: "Reparație infiltrație" },
    { name: "Logistic Vest SRL", place: "Ghiroda", text: "Colaborăm pe mentenanța halei de trei ani. Răspund repede după furtuni și trimit raport cu poze după fiecare intervenție.", rating: 5, work: "Contract mentenanță" }
  ]
};
