import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, Eyebrow, FaqList, CTABand } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import {
  graph,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  abs,
} from "@/lib/schema";
import { SERVICES, getService } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Not found", robots: { index: false, follow: false } };

  const path = `/services/${service.slug}`;
  return {
    title: /gcc|uae/i.test(service.name) ? service.name : `${service.name} in the UAE & GCC`,
    description: service.summary.slice(0, 158),
    alternates: { canonical: path },
    openGraph: {
      title: `${service.name} — Tasama`,
      description: service.tagline,
      url: abs(path),
      type: "website",
    },
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];

  return (
    <>
      <JsonLd
        json={graph(
          breadcrumbSchema(trail),
          serviceSchema({
            name: service.name,
            description: service.summary,
            path,
            subServices: service.subServices,
          }),
          faqSchema(service.faqs, path),
        )}
      />

      {/* Header */}
      <section className="svc-hero text-white">
        <span aria-hidden className="svc-hero-numeral">
          {service.index}
        </span>
        <div className="wrap section relative">
          <div className="svc-in" style={{ "--svc-delay": "0s" } as React.CSSProperties}>
            <Breadcrumbs trail={trail} />
          </div>
          <p
            className="svc-in mt-8 font-display text-[12px] font-bold uppercase tracking-[0.2em] text-gold"
            style={{ "--svc-delay": "0.06s" } as React.CSSProperties}
          >
            {service.eyebrow}
          </p>
          <div className="svc-rule mt-3" />
          <h1
            className="svc-in mt-5 max-w-[18ch] font-display text-[clamp(36px,5vw,64px)] font-semibold leading-[1.03] tracking-[-0.05em] text-balance"
            style={{ "--svc-delay": "0.12s" } as React.CSSProperties}
          >
            {service.tagline}
          </h1>
          <p
            className="svc-in mt-6 max-w-[60ch] text-[16px] leading-[1.8] text-white/65"
            style={{ "--svc-delay": "0.2s" } as React.CSSProperties}
          >
            {service.summary}
          </p>
          <div
            className="svc-in mt-8 flex flex-wrap gap-4"
            style={{ "--svc-delay": "0.28s" } as React.CSSProperties}
          >
            <Link href="/contact" className="btn btn-gold">
              Discuss {service.navLabel.toLowerCase()} &rarr;
            </Link>
            <Link href="/services" className="btn btn-outline">
              All services
            </Link>
          </div>
        </div>
      </section>

      {/* Key takeaways — GEO extractable */}
      <section className="bg-cream">
        <div className="wrap section">
          <Eyebrow className="reveal">Key takeaways</Eyebrow>
          <ul className="reveal mt-8 grid gap-5 sm:grid-cols-2">
            {service.keyTakeaways.map((t, i) => (
              <li key={i} className="flex gap-4 border-t border-line pt-5 text-[15px] leading-[1.65] text-ink-soft">
                <span className="marker shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sub-services */}
      <section className="bg-paper">
        <div className="wrap section">
          <Eyebrow className="reveal">What we deliver</Eyebrow>
          <h2 className="reveal mt-6 max-w-[16ch] font-display text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink text-balance">
            {service.name} services
          </h2>
          <div className="mt-12 grid border-t border-line md:grid-cols-2">
            {service.subServices.map((sub, i) => (
              <article
                key={sub.name}
                className="reveal border-b border-line p-8 md:[&:nth-child(odd)]:border-r"
                style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}
              >
                <span className="marker">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {sub.name}
                </h3>
                <p className="mt-2 max-w-[48ch] text-[14px] leading-[1.7] text-muted">
                  {sub.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="wrap section">
          <Eyebrow className="reveal">Questions</Eyebrow>
          <h2 className="reveal mt-6 font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.04em] text-ink">
            {service.name}, answered
          </h2>
          <div className="reveal">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
