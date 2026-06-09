export const serviceArea = [
  { "@type": "City" as const, "name": "Stuttgart" },
  { "@type": "City" as const, "name": "Leinfelden-Echterdingen" },
  { "@type": "City" as const, "name": "Esslingen am Neckar" },
  { "@type": "City" as const, "name": "Tübingen" },
  { "@type": "City" as const, "name": "Böblingen" },
  { "@type": "City" as const, "name": "Filderstadt" },
  { "@type": "City" as const, "name": "Kirchheim unter Teck" },
  { "@type": "City" as const, "name": "Kornwestheim" },
  { "@type": "City" as const, "name": "Leonberg" },
  { "@type": "City" as const, "name": "Ludwigsburg" },
  { "@type": "City" as const, "name": "Nürtingen" },
  { "@type": "City" as const, "name": "Ostfildern" },
  { "@type": "City" as const, "name": "Reutlingen" },
  { "@type": "City" as const, "name": "Sindelfingen" },
  { "@type": "City" as const, "name": "Waiblingen" }
];

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://soundundlicht-stuttgart.de/#business",
  "name": "Sound und Licht Stuttgart - Holger Kampffmeyer",
  "description": "Verleih von Musikanlagen, Partyboxen, Lichttechnik und Tontechnik im Großraum Stuttgart. Electronic Music DJ für Events, Feiern und Hochzeiten.",
  "url": "https://soundundlicht-stuttgart.de",
  "telephone": "+491711467491",
  "email": "holger.kampffmeyer+dj@gmail.com",
  "image": "https://soundundlicht-stuttgart.de/img/header.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Magellanstraße 4",
    "addressLocality": "Leinfelden-Echterdingen",
    "postalCode": "70771",
    "addressRegion": "Baden-Württemberg",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.6938",
    "longitude": "9.1539"
  },
  "openingHours": ["Mo 09:00-20:00", "Tu 09:00-20:00", "We 09:00-20:00", "Th 09:00-20:00", "Fr 09:00-20:00", "Sa 09:00-20:00", "Su 09:00-20:00"],
  "priceRange": "\u20ac\u20ac",
  "areaServed": serviceArea,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "15",
    "bestRating": "5",
    "worstRating": "1"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+491711467491",
    "contactType": "customer service",
    "email": "holger.kampffmeyer+dj@gmail.com",
    "availableLanguage": ["German", "English"]
  },
  "sameAs": [
    "https://www.facebook.com/holgerkampffmeyerdj",
    "https://www.instagram.com/djhulk_de",
    "https://www.youtube.com/@djhulk_de",
    "https://www.mixcloud.com/holger-kampffmeyer/",
    "https://holger-kampffmeyer.de"
  ]
};

export const siteNavigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Hauptnavigation",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Startseite",
      "url": "https://soundundlicht-stuttgart.de/"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Pakete",
      "url": "https://soundundlicht-stuttgart.de/#pakete"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Miettechnik",
      "url": "https://soundundlicht-stuttgart.de/#services"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "FAQ",
      "url": "https://soundundlicht-stuttgart.de/#faq"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "Bewertungen",
      "url": "https://soundundlicht-stuttgart.de/#bewertungen"
    }
  ]
};

export const offerCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Vermietung Pakete & Einzelgeräte",
  "itemListElement": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Partypaket"
      },
      "description": "2x JBL Partyboxen, KLS Laser Bar, Nebelmaschine, Mikrofon, 4x LED Par Lichter",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "160.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "DJ-Paket"
      },
      "description": "2x LD Maui 28 G3, LED BossFX-2 Pro, Moving Head, Stage Bar, Mikrofon, 4x LED Par Lichter",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "200.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Veranstaltungspaket"
      },
      "description": "2x LD Maui 28 G3, 6-Kanal Mischpult, KLS Laser Bar, Nebelmaschine, Mikrofon, 4x LED Par Lichter, 2x Moving Head",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "200.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Akku-Party-Paket – Outdoor"
      },
      "description": "2x JBL Partyboxen (Akkubetrieb), LED BossFX-2 Pro, 2x Akku LED PAR Lichter, EnginStar Powerstation 350W",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "170.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Karaoke-Paket"
      },
      "description": "2x JBL Partyboxen, 2x Mikrofone, Yamaha Mischpult, Bluetooth/Computer-Zuspielung – inkl. aller Kabel",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "130.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Säulensystem 2x LD Maui 28 G3"
      },
      "description": "Kompaktes Plug-and-Play-Säulensystem, 2x 2060W Peak, 127dB max. SPL, für bis zu 150 Personen",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "120.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "JBL Partyboxen (Paar)"
      },
      "description": "2x 240W Partylautsprecher mit dynamischen Lichteffekten, Bluetooth, AUX, Akkubetrieb bis 18h",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "80.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "LED BossFX-2 Pro und Nebelmaschine"
      },
      "description": "Lichtanlage mit 2 Derby, 2 Spots, 4x Strobe LEDs und AF-150 DMX Nebelmaschine",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "60.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Eurolite KLS Laser Bar"
      },
      "description": "LED Lichtanlage mit Derby-, Laser- und Strobe-Effekten – kein Laserschutzbeauftragter nötig",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "50.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "LED Moving Head 18 Prisma 10 Gobo"
      },
      "description": "LED Spot mit RGBW, 10 Gobos, 18 Prismen, Sound-zu-Licht Steuerung, DMX programmierbar",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "50.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    }
  ]
};
