import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHeading, CTABand } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbSchema, serviceSchema, abs } from "@/lib/schema";
import { SERVICES } from "@/lib/site";

const PATH = "/services";

export const metadata: Metadata = {
  title: "Advisory Services",
  description:
    "Tax & Compliance, Finance Advisory and Management Consulting for GCC businesses — Corporate Tax, VAT, transfer pricing, Virtual CFO, reporting, market entry, feasibility and company formation.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Tasama Advisory Services",
    description:
      "Tax, finance and strategy under one advisory roof for GCC businesses, investors and leadership teams.",
    url: abs(PATH),
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        json={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: PATH },
          ]),
          ...SERVICES.map((s) =>
            serviceSchema({
              name: s.name,
              description: s.summary,
              path: `/services/${s.slug}`,
              subServices: s.subServices,
            }),
          ),
        )}
      />

      <section className="bg-[#111111] text-white">
        <div className="wrap section">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: PATH },
            ]}
          />
          <h1 className="reveal mt-8 max-w-[16ch] font-display text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.02] tracking-[-0.05em] text-balance">
            Tax, finance and strategy under one advisory roof.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.8] text-white/65">
            Six focused services across Corporate Tax, VAT, transfer pricing, finance leadership,
            consulting and company formation. Engage one, or run them together as a single advisory
            relationship covering obligations, controls and growth.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading eyebrow="Practice areas" title="Where Tasama works." />
          <div className="reveal mt-14 grid gap-px border-t border-line">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group grid gap-6 border-b border-line py-10 transition-[padding,background] duration-200 hover:bg-cream/60 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10 md:hover:px-4"
              >
                <span className="marker pt-1">{s.index}</span>
                <div>
                  <h2 className="font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink transition-colors group-hover:text-gold-deep">
                    {s.name}
                  </h2>
                  <p className="mt-2 text-[15px] font-medium text-muted">{s.tagline}</p>
                  <p className="mt-3 max-w-[64ch] text-[14px] leading-[1.7] text-muted">
                    {s.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-muted">
                    {s.subServices.slice(0, 6).map((sub) => (
                      <li key={sub.name} className="before:mr-2 before:text-gold before:content-['—']">
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="hidden text-[13px] font-bold text-gold-eyebrow md:block md:pt-1">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
