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

export const businessRating = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://soundundlicht-stuttgart.de/#business",
  "name": "Sound und Licht Stuttgart - Holger Kampffmeyer",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "15",
    "bestRating": "5",
    "worstRating": "1"
  }
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
        "price": "180.00",
        "priceCurrency": "EUR",
        "priceComponentType": "https://schema.org/UnitPriceSpecification"
      }
    }
  ]
};
