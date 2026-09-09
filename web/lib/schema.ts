import { SITE } from "./site";

const base = SITE.url.replace(/\/$/, "");

export const ORG_ID = `${base}/#organization`;
export const WEBSITE_ID = `${base}/#website`;

export function abs(path = "/"): string {
  return new URL(path, base + "/").toString();
}

/** ProfessionalService node — the primary entity for the whole site. */
export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: base,
    logo: { "@type": "ImageObject", url: abs("/logo-light-bg.svg"), width: 1044, height: 828 },
    image: abs("/logo-light-bg.svg"),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: "$$$",
    foundingLocation: SITE.foundingLocation,
    areaServed: SITE.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    sameAs: SITE.sameAs,
    knowsAbout: [
      "UAE Corporate Tax",
      "Value Added Tax",
      "Transfer Pricing",
      "Virtual CFO services",
      "Financial reporting",
      "Market entry advisory",
      "UAE company formation",
      "GCC expansion",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: base,
    name: SITE.blogName,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  subServices?: { name: string; description: string }[];
}) {
  return {
    "@type": "Service",
    "@id": `${abs(opts.path)}#service`,
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    provider: { "@id": ORG_ID },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    ...(opts.subServices?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: opts.subServices.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.name, description: s.description },
            })),
          },
        }
      : {}),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Wrap a set of nodes into one @graph and JSON-string it with `<` escaped. */
export function graph(...nodes: Record<string, unknown>[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  }).replace(/</g, "\\u003c");
}
