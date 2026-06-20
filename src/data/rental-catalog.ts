export interface RentalItem {
  slug: string;
  title: string;
  image: string;
  description: string;
  category: 'Paket' | 'Sound' | 'Licht';
  price: string;
  features: string[];
  detailPage?: string;
}

export const rentalItems: RentalItem[] = [
  // === PACKAGES ===
  {
    slug: 'partypaket-stuttgart',
    title: 'Partypaket',
    image: '/img/vermietung/partypaket.webp',
    description: 'Das Party-Starterpaket besteht aus Licht und Sound für kleinere Feiern bis ca. 50 Personen.',
    category: 'Paket',
    price: 'ab 160€',
    features: ['2x JBL Partyboxen', 'KLS Laser Bar', 'Nebelmaschine', 'Mikrofon', '4x LED Par Lichter'],
    detailPage: '/vermietung/partypaket-stuttgart'
  },
  {
    slug: 'djpaket-fildern',
    title: 'DJ-Paket',
    image: '/img/vermietung/djpaket.webp',
    description: 'Das DJ-Paket für DJ Gigs und mittlere Feiern bis ca. 150 Personen mit LD Maui, LED BossFX, Moving Head und Stage Bar.',
    category: 'Paket',
    price: 'ab 200€',
    features: ['2x LD Maui 28 G3', 'LED BossFX-2 Pro + Nebelmaschine', 'Moving Head', 'Stage Bar', 'Mikrofon', '4x LED Par Lichter'],
    detailPage: '/vermietung/djpaket-fildern'
  },
  {
    slug: 'veranstaltungspaket-stuttgart',
    title: 'Veranstaltungspaket',
    image: '/img/vermietung/veranstaltungspaket.webp',
    description: 'Das Veranstaltungspaket für mittlere Feiern bis ca. 150 Personen.',
    category: 'Paket',
    price: 'ab 200€',
    features: ['2x LD Maui 28 G3', '6-Kanal Mischpult', 'KLS Laser Bar', 'Nebelmaschine', 'Mikrofon', '4x LED Par Lichter', '2x Moving Head'],
    detailPage: '/vermietung/veranstaltungspaket-stuttgart'
  },
  {
    slug: 'akku-party-paket',
    title: 'Akku-Party-Paket – Outdoor',
    image: '/img/vermietung/Akku-powered-party-hero.webp',
    description: 'Das Outdoor-Komplettpaket für Partys ohne Stromanschluss. Akkubetrieben mit 2x JBL Partyboxen, LED BossFX Licht, Akku-PAR-Lichtern und Powerstation. 4-6h Laufzeit.',
    category: 'Paket',
    price: 'ab 170€',
    features: ['2x JBL Partyboxen (Akkubetrieb)', 'LED BossFX-2 Pro', '2x Akku LED PAR Lichter', 'EnginStar Powerstation 350W', '4-6h Akkulaufzeit'],
    detailPage: '/vermietung/akku-party-paket'
  },
  {
    slug: 'karaoke-paket',
    title: 'Karaoke-Paket',
    image: '/img/vermietung/karaoke-paket-hero.webp',
    description: 'Das Komplettpaket für Karaoke-Abende: 2x JBL Partyboxen, 2x Mikrofone, Yamaha Mischpult. Musik-Zuspielung via Computer oder Bluetooth.',
    category: 'Paket',
    price: 'ab 130€',
    features: ['2x JBL Partyboxen (240W)', '2x Mikrofone inkl. XLR-Kabel', 'Yamaha Mischpult MG6', 'Computer-/Bluetooth-Zuspielung', 'Alle Kabel inklusive'],
    detailPage: '/vermietung/karaoke-paket'
  },

  // === SOUND EQUIPMENT ===
  {
    slug: 'ld-maui-28g3',
    title: 'Säulensystem 2x LD Maui 28 G3 (Paar)',
    image: '/img/vermietung/IMG_7142.JPG',
    description: 'Kompaktes Plug und Play Säulen System mit top Klang für DJs, kleine Bands und Feiern. 2x 2060 W Peak-Leistung und 127 dB max. SPL. Für bis zu 150 Personen.',
    category: 'Sound',
    price: 'ab 120€',
    features: ['2x 12"-Subwoofer', 'Anschlüsse: 2x XLR', 'inkl. 2x 5m Lautsprecherkabel'],
    detailPage: '/vermietung/ld-maui-28g3'
  },
  {
    slug: 'jbl-partybox-300-320',
    title: 'JBL Partyboxen (Paar)',
    image: '/img/vermietung/jbl-set1.webp',
    description: 'Leistungsstarke Partylautsprecher in JBL-Soundqualität.',
    category: 'Sound',
    price: 'ab 80€',
    features: ['240W Ausgangsleistung', 'dynamische Lichteffekte', 'Bluetooth, AUX, Cinch, Mikrofon', 'Akkubetrieb bis 18 Stunden'],
    detailPage: '/vermietung/jbl-partybox-300-320'
  },
  {
    slug: 'yamaha-mischpult',
    title: 'Yamaha Mischpult 6 Kanäle',
    image: '/img/vermietung/yamaha_mg6_kl.webp',
    description: 'Mischpult für die Zuspielung von Musik.',
    category: 'Sound',
    price: 'ab 15€',
    features: ['2 Mikrofoneingänge', '2 Stereo Eingänge (Klinke)', '2 Stereo XLR Ausgänge'],
    detailPage: '/vermietung#item-yamaha-mischpult'
  },

  // === LICHT EQUIPMENT ===
  {
    slug: 'led-bossfx-nebelmaschine',
    title: 'Lichtanlage LED BossFX-2 Pro und AF-150 Fog Machine',
    image: '/img/vermietung/LED-BossFX2-Pro-Nebel-AI.webp',
    description: 'Komplettset bestehend aus der Lichtanlage Stairville LED BossFX-2 Pro und der Stairville AF-150 DMX Fog Machine.',
    category: 'Licht',
    price: 'ab 60€',
    features: ['2 Derby, 2 Spots mit je 6 LEDs', '4x Strobe LEDs weiß und UV', 'Nebelmaschine 110 m³/min'],
    detailPage: '/vermietung/led-bossfx-nebelmaschine'
  },
  {
    slug: 'kls-laser-bar',
    title: 'Eurolite KLS Laser Bar',
    image: '/img/vermietung/kls-laserbar-ai.webp',
    description: 'Komplette LED Lichtanlage für spektakuläre Licht- und Lasereffekte.',
    category: 'Licht',
    price: 'ab 50€',
    features: ['2x Derby: 3x 1W RGB', '4x Strobe LEDs 1W weiß', '2x 3W LED Spots', 'Kein Laserschutzbeauftragter notwendig'],
    detailPage: '/vermietung/kls-laser-bar'
  },
  {
    slug: 'max-party-bar',
    title: 'Max Party Bar',
    image: '/img/vermietung/MAX-Partybar10_kl.webp',
    description: 'Komplette LED Lichtanlage für spektakuläre Lichteffekte.',
    category: 'Licht',
    price: 'ab 30€',
    features: ['2 PAR 3x 3W 4-in-1-LEDs', '2 Jelly Moon 4x 3W', 'UV / Strobe 6x 2W', 'Sound-zu-Licht Steuerung'],
    detailPage: '/vermietung#item-max-party-bar'
  },
  {
    slug: 'partylicht-moving-head',
    title: '18 Prisma 10 Gobo LED Moving Head',
    image: '/img/vermietung/IMG_9114.webp',
    description: 'Leistungsstarker LED Spot mit 10 Gobos und 18 Prismen.',
    category: 'Licht',
    price: 'ab 15€',
    features: ['RGBW 4-in-1 Farbmischung', 'Sound-zu-Licht Steuerung', 'Per DMX programmierbar'],
    detailPage: '/vermietung/partylicht-moving-head'
  },
  {
    slug: 'beamz-mhl36',
    title: '2x BeamZ MHL36 Set',
    image: '/img/vermietung/beamz_kl.webp',
    description: 'Kleine mobile Wash Moving Heads.',
    category: 'Licht',
    price: 'ab 20€',
    features: ['4x 9W 4-in-1 LEDs', 'RGBW Farbmischung', '4 vorprogrammierte Shows', 'Sound-zu-Licht Steuerung'],
    detailPage: '/vermietung#item-beamz-mhl36'
  },
  {
    slug: 'showlight-stage-bar',
    title: 'Showlight LED Stage Bar 216x LEDs',
    image: '/img/vermietung/Showlite_stagebar_1.webp',
    description: 'LED Stage Bar mit vielseitigen Effekten.',
    category: 'Licht',
    price: 'ab 15€',
    features: ['216x LEDs', 'Sound-zu-Licht Steuerung', 'Automatikmodi', 'Strobe-Effekt & Auto Chaser'],
    detailPage: '/vermietung#item-showlight-stage-bar'
  },
  {
    slug: 'led-par-strahler',
    title: '2 helle 270W 18 LED PAR RGBW Strahler',
    image: '/img/vermietung/IMG_9129.webp',
    description: 'Helle LED PAR Strahler mit vielseitigen Funktionen.',
    category: 'Licht',
    price: 'ab 20€',
    features: ['270W LEDs 18 x 15 W', 'RGBW Farbmischung', 'Per DMX programmierbar', 'Robustes Aluminiumgehäuse'],
    detailPage: '/vermietung#item-led-par-strahler'
  },
  {
    slug: 'led-par-lichter',
    title: '4 Stück LED Par Lichter',
    image: '/img/vermietung/36-parlight.webp',
    description: '4X 36LED RGB PAR Can Licht DJ Bühnenbeleuchtung.',
    category: 'Licht',
    price: 'ab 20€',
    features: ['Sound-zu-Licht Steuerung', 'Automatikmodi', 'inkl. Fernbedienung'],
    detailPage: '/vermietung#item-led-par-lichter'
  },
  {
    slug: 'akku-led-par',
    title: '2 Stück Akku LED Par Lichter',
    image: '/img/vermietung/par-akku.webp',
    description: '2x RGBW LED Par Scheinwerfer mit Akku.',
    category: 'Licht',
    price: 'ab 15€',
    features: ['12 LEDs', 'Wiederaufladbar Akku', 'Lange Akkulaufzeit', 'inkl. Fernbedienung'],
    detailPage: '/vermietung#item-akku-led-par'
  },
  {
    slug: 'nebel-maschine',
    title: 'Nebel-Maschine 1200W',
    image: '/img/vermietung/uking_fogger-1200.webp',
    description: '1200W Nebelmaschine mit 9 RGB LEDs.',
    category: 'Licht',
    price: 'ab 20€',
    features: ['1 Tankfüllung Nebelfluid enthalten', 'inkl. Fernbedienung'],
    detailPage: '/vermietung#item-nebel-maschine'
  },
  {
    slug: 'mini-party-beamer',
    title: 'Mini Party Beamer',
    image: '/img/vermietung/beamer3.webp',
    description: 'Topvision LED Projektor T21 für Partys und Präsentationen.',
    category: 'Licht',
    price: 'ab 15€',
    features: ['7000 Lumen', 'HDMI, USB, VGA', 'EZCast App'],
    detailPage: '/vermietung#item-mini-party-beamer'
  },
  {
    slug: 'mikrofon',
    title: 'Mikrofon',
    image: '/img/vermietung/mikrofon.webp',
    description: 'Mikrofon für Gesangseinlagen, Moderation, Ansprachen etc.',
    category: 'Licht',
    price: 'ab 10€',
    features: ['Mikrofon + 10M XLR Kabel'],
    detailPage: '/vermietung#item-mikrofon'
  },
  {
    slug: 'powerstation',
    title: 'EnginStar R350 Powerstation – Tragbarer Akku',
    image: '/img/vermietung/enginestar-akku2.webp',
    description: 'Tragbare 350W Powerstation mit 296Wh Kapazität und Transporttasche. Ideal für Partys, Outdoor-Events oder Locations ohne Stromanschluss.',
    category: 'Licht',
    price: 'ab 30€',
    features: ['350W reine Sinuswelle', '296Wh Kapazität (80.000mAh)', '2x USB-A, USB-C, 2x 230V', 'LED-Leuchte (3 Modi)', 'inkl. Transporttasche'],
    detailPage: '/vermietung#item-powerstation'
  }
];
