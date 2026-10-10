import googleReviews from './google-reviews.json';

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
    "ratingValue": Number(googleReviews.ratingValue ?? 5).toFixed(1),
    "reviewCount": String(googleReviews.reviewCount ?? googleReviews.reviews.length),
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

export function offerCatalogJsonLd(items: any[]) {
  const detailItems = items.filter(i => i.detailPage && !i.detailPage.includes('#'));
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Vermietung Pakete & Einzelgeräte",
    "itemListElement": detailItems.map(item => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": item.title,
        "serviceType": "Veranstaltungstechnik-Vermietung",
        "areaServed": serviceArea
      },
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": item.priceValue,
        "priceCurrency": "EUR",
        "unitCode": "DAY"
      },
      "description": item.features.join(", ")
    }))
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://soundundlicht-stuttgart.de/#organization",
  "name": "Sound & Licht Stuttgart – Holger Kampffmeyer",
  "url": "https://soundundlicht-stuttgart.de",
  "logo": {
    "@type": "ImageObject",
    "url": "https://soundundlicht-stuttgart.de/img/djhulk_logo.webp"
  },
  "email": "holger.kampffmeyer+dj@gmail.com",
  "telephone": "+491711467491",
  "founder": { "@id": "https://soundundlicht-stuttgart.de/#person" },
  "sameAs": [
    "https://www.facebook.com/holgerkampffmeyerdj",
    "https://www.instagram.com/djhulk_de",
    "https://www.youtube.com/@djhulk_de",
    "https://www.mixcloud.com/holger-kampffmeyer/",
    "https://holger-kampffmeyer.de"
  ]
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://soundundlicht-stuttgart.de/#person",
  "name": "Holger Kampffmeyer",
  "jobTitle": "DJ & Verleih von Veranstaltungstechnik",
  "url": "https://soundundlicht-stuttgart.de",
  "worksFor": { "@id": "https://soundundlicht-stuttgart.de/#organization" },
  "sameAs": [
    "https://www.facebook.com/holgerkampffmeyerdj",
    "https://www.instagram.com/djhulk_de",
    "https://www.youtube.com/@djhulk_de",
    "https://www.mixcloud.com/holger-kampffmeyer/",
    "https://holger-kampffmeyer.de"
  ]
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://soundundlicht-stuttgart.de/#website",
  "url": "https://soundundlicht-stuttgart.de",
  "name": "Sound & Licht Stuttgart",
  "inLanguage": "de-DE",
  "publisher": { "@id": "https://soundundlicht-stuttgart.de/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://soundundlicht-stuttgart.de/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};
