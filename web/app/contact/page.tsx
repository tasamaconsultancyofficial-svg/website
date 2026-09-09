import type { Metadata } from "next";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbSchema, abs, ORG_ID } from "@/lib/schema";
import { SITE } from "@/lib/site";

const PATH = "/contact";

export const metadata: Metadata = {
  title: "Contact Tasama",
  description:
    "Speak to a Tasama advisor about UAE Corporate Tax, VAT, Virtual CFO, feasibility, company formation or GCC expansion. Confidential initial discussion, Dubai Silicon Oasis.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Contact Tasama Management Consultancy",
    description: "Confidential initial discussion about your tax, finance and strategy needs.",
    url: abs(PATH),
  },
};

const channels = [
  { label: "Call us directly", value: SITE.phoneDisplay, href: `tel:${SITE.phone}` },
  { label: "WhatsApp", value: "Message Tasama", href: SITE.whatsapp },
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
];

export default function ContactPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Contact", path: PATH },
  ];

  return (
    <>
      <JsonLd
        json={graph(breadcrumbSchema(trail), {
          "@type": "ContactPage",
          "@id": `${abs(PATH)}#contact`,
          url: abs(PATH),
          about: { "@id": ORG_ID },
          mainEntity: {
            "@type": "Organization",
            "@id": ORG_ID,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: SITE.phone,
              email: SITE.email,
              contactType: "sales",
              areaServed: SITE.areaServed,
              availableLanguage: ["English"],
            },
          },
        })}
      />

      <section className="bg-navy-deep text-white">
        <div className="wrap section pb-0">
          <Breadcrumbs trail={trail} />
          <h1 className="reveal mt-8 max-w-[20ch] font-display text-[clamp(36px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.05em] text-balance">
            Ready to discuss a serious advisory mandate?
          </h1>
          <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.8] text-white/65">
            Tell us where your business is heading. We&rsquo;ll help identify the tax, finance,
            compliance and strategy support required to move with confidence — starting with a
            confidential initial discussion before any scope is agreed.
          </p>
        </div>

        <div className="wrap grid gap-0 pb-0 md:grid-cols-[0.9fr_1.1fr]">
          <div className="border-t border-white/12 py-12 md:pr-12">
            <Eyebrow tone="light">Direct channels</Eyebrow>
            <ul className="mt-8 space-y-4">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="block border border-gold/25 bg-white/[0.04] p-5 transition-colors hover:border-gold/55 hover:bg-white/[0.07]"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-gold-light/80">
                      {c.label}
                    </span>
                    <strong className="mt-2 block font-display text-[20px] font-semibold tracking-[-0.02em] text-white">
                      {c.value}
                    </strong>
                  </a>
                </li>
              ))}
              <li className="border border-white/12 bg-white/[0.02] p-5">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-gold-light/80">
                  Office
                </span>
                <p className="mt-2 text-[14px] leading-[1.6] text-white/70">
                  {SITE.address.street}
                  <br />
                  {SITE.address.locality}, United Arab Emirates
                </p>
              </li>
            </ul>
          </div>

          <div className="-mb-px bg-white p-8 text-ink md:mt-12 md:p-12">
            <Eyebrow>Request a discussion</Eyebrow>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
