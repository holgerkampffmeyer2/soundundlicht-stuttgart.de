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
  "name": "Vermietung Pakete",
  "itemListElement": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Partypaket"
      },
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
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "170.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    }
  ]
};
