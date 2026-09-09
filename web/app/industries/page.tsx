import type { Metadata } from "next";
import { Breadcrumbs, SectionHeading, CTABand } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbSchema, abs } from "@/lib/schema";
import { INDUSTRIES } from "@/lib/site";

const PATH = "/industries";

export const metadata: Metadata = {
  title: "Industry Expertise",
  description:
    "Advisory for the sectors driving GCC growth: real estate, trading, professional services, family businesses, startups and cross-border groups.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Industry expertise — Tasama",
    description: "Tax, finance and strategy advisory tailored to the sectors driving GCC growth.",
    url: abs(PATH),
  },
};

export default function IndustriesPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Industries", path: PATH },
  ];

  return (
    <>
      <JsonLd
        json={graph(
          breadcrumbSchema(trail),
          {
            "@type": "ItemList",
            "@id": `${abs(PATH)}#industries`,
            name: "Industries served by Tasama Management Consultancy",
            itemListElement: INDUSTRIES.map((ind, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: ind.name,
              description: ind.description,
            })),
          },
        )}
      />

      <section className="bg-[#111111] text-white">
        <div className="wrap section">
          <Breadcrumbs trail={trail} />
          <h1 className="reveal mt-8 max-w-[16ch] font-display text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.02] tracking-[-0.05em] text-balance">
            Advisory for the sectors driving GCC growth.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.8] text-white/65">
            The obligations, controls and growth questions differ by sector. Tasama brings pattern
            recognition from each of these industries into the advisory relationship.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading eyebrow="Industries" title="Where we bring pattern recognition." />
          <div className="reveal mt-14 grid border-t border-line sm:grid-cols-2">
            {INDUSTRIES.map((ind) => (
              <article
                key={ind.name}
                className="min-h-[240px] border-b border-line p-9 sm:border-r sm:[&:nth-child(2n)]:border-r-0"
              >
                <span className="marker">{ind.index}</span>
                <h2 className="mt-8 font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
                  {ind.name}
                </h2>
                <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.7] text-muted">
                  {ind.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
