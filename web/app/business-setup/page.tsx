import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Breadcrumbs, Eyebrow, SectionHeading, FaqList, CTABand } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbSchema, serviceSchema, faqSchema, abs } from "@/lib/schema";

const PATH = "/business-setup";

export const metadata: Metadata = {
  title: "Business Setup in the UAE — Freezone & Mainland Company Formation",
  description:
    "End-to-end UAE business setup for Dubai freezone and mainland, plus Abu Dhabi, Sharjah and Ras Al Khaimah. We handle licensing, visas and Emirates ID — the full process, start to finish.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Business Setup in the UAE — Tasama",
    description:
      "Freezone and mainland company formation across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah, with visa packages and Emirates ID handled end to end.",
    url: abs(PATH),
    type: "website",
  },
};

const JURISDICTIONS = [
  {
    index: "01",
    name: "Dubai Mainland",
    description:
      "Unrestricted onshore trading, any business activity, and the ability to invoice UAE government and mainland entities directly.",
  },
  {
    index: "02",
    name: "Dubai Freezone",
    description:
      "100% foreign ownership, streamlined licensing and, for qualifying income, access to the 0% Corporate Tax regime.",
  },
  {
    index: "03",
    name: "Abu Dhabi",
    description:
      "Mainland and freezone options for businesses targeting the capital's government, energy and institutional sectors.",
  },
  {
    index: "04",
    name: "Sharjah",
    description:
      "Lower-cost licensing with strong access to Dubai, well suited to trading, industrial and SME activity.",
  },
  {
    index: "05",
    name: "Ras Al Khaimah",
    description:
      "The most cost-efficient jurisdiction we work with — a genuine option for founders optimising setup and renewal cost without giving up credibility.",
  },
];

const PROCESS_STEPS = [
  {
    index: "01",
    title: "Activity & jurisdiction review",
    body: "We confirm the right activity, licence type and jurisdiction — Dubai, Abu Dhabi, Sharjah or Ras Al Khaimah — against your business, customers and visa needs.",
  },
  {
    index: "02",
    title: "Application & documentation",
    body: "We prepare and submit the incorporation application, MOA and supporting documents on your behalf.",
  },
  {
    index: "03",
    title: "Licence issued",
    body: "Trade licence issuance typically takes around three days once documentation is complete.",
  },
  {
    index: "04",
    title: "Establishment card & visa filing",
    body: "We file the establishment card and visa applications for you and any partners, staff or dependents in your package.",
  },
  {
    index: "05",
    title: "Medical test & Emirates ID biometrics",
    body: "The in-UAE stage — medical typing, Emirates ID biometrics and visa stamping — usually needs around seven days on the ground.",
  },
  {
    index: "06",
    title: "Emirates ID issued",
    body: "Emirates ID is generally issued within about seven days of biometrics, completing the process end to end.",
  },
];

const PACKAGES = [
  {
    index: "00",
    name: "0-Visa Package",
    body: "A licence with no visa allocation. Rarely taken by first-time founders — mostly used by existing business owners adding a licence who don't need a new visa.",
  },
  {
    index: "01",
    name: "1-Visa Package",
    body: "Licence plus a single investor or employment visa — the standard starting point for a founder setting up alone.",
  },
  {
    index: "02",
    name: "2-Visa Package",
    body: "Licence plus two visas, for a founder bringing on a partner, spouse or first hire from day one.",
  },
];

const SETTLING_IN = [
  "Corporate bank account opening support",
  "Compliance orientation — Corporate Tax, VAT, ESR and UBO from day one",
  "Residential and relocation coordination",
  "Ongoing finance, tax and advisory support once you're operational",
];

const FAQS = [
  {
    question: "Freezone or mainland — which should I choose?",
    answer:
      "It depends on where your customers are, whether you need to invoice UAE government or mainland entities, your visa needs and your Corporate Tax position. We model both against your actual business before recommending one.",
  },
  {
    question: "Why would I set up in Ras Al Khaimah instead of Dubai?",
    answer:
      "Ras Al Khaimah is the most cost-efficient jurisdiction we work with, with lower setup and renewal costs than Dubai. It suits founders who don't need a Dubai-specific presence and are optimising for cost without compromising on credibility.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "Typically around 12 days end to end — roughly three days to licence issuance and a further stretch to Emirates ID, of which about seven days require your physical presence in the UAE for medical typing and biometrics.",
  },
  {
    question: "How many visas do I need?",
    answer:
      "Most first-time founders take a 1-visa or 2-visa package depending on partners or early hires. The 0-visa option is rarely taken by newcomers — it's mainly used by existing business owners adding a licence who already hold a visa.",
  },
  {
    question: "Do you only handle the licence, or the whole relocation?",
    answer:
      "We stay with you through the full process — formation, licensing, visas and Emirates ID — and can also support the practical steps of settling in the UAE, including bank account opening and compliance orientation.",
  },
];

export default function BusinessSetupPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Business Setup", path: PATH },
  ];

  return (
    <>
      <JsonLd
        json={graph(
          breadcrumbSchema(trail),
          serviceSchema({
            name: "Business Setup",
            description:
              "End-to-end UAE business setup — freezone and mainland company formation across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah, including visa packages and Emirates ID processing.",
            path: PATH,
            subServices: PACKAGES.map((p) => ({ name: p.name, description: p.body })),
          }),
          faqSchema(FAQS, PATH),
        )}
      />

      {/* Hero */}
      <section className="orb-hero text-white">
        <span aria-hidden className="orb-hero-glow" />
        <div className="wrap section">
          <Breadcrumbs trail={trail} />
          <p className="reveal mt-8 font-mono text-[13px] font-bold uppercase tracking-[0.24em] text-gold">
            Business Setup
          </p>
          <h1 className="reveal mt-5 max-w-[19ch] font-display text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.02] tracking-[-0.05em] text-balance">
            UAE company formation, from licence to Emirates ID.
          </h1>
          <p className="reveal mt-6 max-w-[62ch] text-[17px] leading-[1.8] text-white/65">
            End-to-end business setup for any activity, across Dubai freezone and mainland, Abu
            Dhabi, Sharjah and Ras Al Khaimah — the most cost-efficient jurisdiction we work with.
            We stay with you from incorporation through to your Emirates ID.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-gold">
              Start your business setup &rarr;
            </Link>
            <a href="#process" className="btn btn-outline">
              See the process
            </a>
          </div>
          <div className="reveal mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/12 pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            <span>Freezone & mainland</span>
            <span>Dubai &middot; Abu Dhabi &middot; Sharjah &middot; RAK</span>
            <span>Licence to Emirates ID</span>
          </div>
        </div>
      </section>

      {/* Jurisdictions */}
      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="Where we set up"
            title="Any emirate, any activity."
            intro="We form companies across the UAE and match the jurisdiction to your business, customers and budget — not the other way around."
          />
          <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {JURISDICTIONS.map((j) => (
              <article key={j.name} className="flex min-h-[220px] flex-col border-b border-r border-line p-8">
                <span className="marker">{j.index}</span>
                <h3 className="mt-6 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {j.name}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-muted">{j.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 bg-white">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="The process"
            title="Licence in ~3 days. Emirates ID in ~12."
            intro="A typical setup runs about 12 days start to finish — licence issued in roughly three, with the remaining stages, including around seven days inside the UAE, covering visa stamping, medicals and biometrics through to your Emirates ID."
          />
          <ol className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((s, i) => (
              <li
                key={s.index}
                className="reveal flex min-h-[210px] flex-col border-b border-r border-line p-7"
                style={{ "--reveal-delay": `${i * 0.05}s` } as CSSProperties}
              >
                <span className="marker">{s.index}</span>
                <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="reveal mt-10 border-l-2 border-gold pl-4 text-[15px] text-ink-soft">
            About 12 days overall &mdash;{" "}
            <span className="font-semibold text-ink">roughly 7 of them require your presence in the UAE.</span>
          </p>
        </div>
      </section>

      {/* Visa packages */}
      <section className="bg-cream">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="Visa packages"
            title="Priced and timed by how many visas you need."
            intro="Cost and processing time vary with the package. Most founders take a 1- or 2-visa package; the 0-visa option is rarely taken by newcomers."
          />
          <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-3">
            {PACKAGES.map((p) => (
              <article key={p.index} className="flex min-h-[220px] flex-col border-b border-r border-line bg-white p-8">
                <span className="marker">{p.index}</span>
                <h3 className="mt-6 font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {p.name}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-muted">{p.body}</p>
              </article>
            ))}
          </div>
          <p className="reveal mt-8 text-[13px] text-muted">
            Exact cost depends on jurisdiction, activity and visa count — we quote against your specific setup.
          </p>
        </div>
      </section>

      {/* Settling in */}
      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="Beyond the licence"
            title="We stay with you until you're operational."
            intro="Formation is the start, not the finish. We support the practical steps of getting your business — and you — settled in the UAE."
          />
          <ul className="reveal mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {SETTLING_IN.map((item) => (
              <li key={item} className="flex items-start gap-3 border-t border-line pt-4 text-[14.5px] leading-[1.65] text-ink-soft">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="wrap section">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.04em] text-ink">
            Business setup, answered
          </h2>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <CTABand
        title="Ready to set up your UAE business?"
        body="Tell us your activity, target jurisdiction and visa needs. We'll map the licence, timeline and cost, and carry the process through to your Emirates ID."
      />
    </>
  );
}
