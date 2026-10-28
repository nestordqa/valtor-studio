// Datos estructurados (schema.org) para Google. Se generan desde site.ts, así que
// todos los planes quedan visibles para buscadores aunque la UI muestre una pestaña a la vez.
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_NUMBER,
  serviceBlocks,
} from "./site";

/** "USD 1.350 · pago único" → 1350 */
function parsePrice(investment: string) {
  const match = investment.match(/USD\s*([\d.]+)/);
  return match ? Number(match[1].replace(/\./g, "")) : undefined;
}

export function buildJsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        image: `${SITE_URL}/opengraph-image`,
        description: SITE_DESCRIPTION,
        email: CONTACT_EMAIL,
        ...(WHATSAPP_NUMBER && { telephone: `+${WHATSAPP_NUMBER}` }),
        address: { "@type": "PostalAddress", addressCountry: "VE" },
        areaServed: ["VE", "Worldwide"],
        priceRange: "USD 60 – USD 1.350",
        sameAs: [INSTAGRAM_URL],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de Valtor Studio",
          itemListElement: serviceBlocks.map((block) => ({
            "@type": "OfferCatalog",
            name: block.title,
            itemListElement: block.plans.map((plan) => {
              const price = parsePrice(plan.investment);
              return {
                "@type": "Offer",
                name: plan.name,
                description: plan.audience,
                ...(price && { price, priceCurrency: "USD" }),
                itemOffered: { "@type": "Service", name: plan.name, description: plan.includes.join(" ") },
              };
            }),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "es",
        publisher: { "@id": orgId },
      },
    ],
  };
}
