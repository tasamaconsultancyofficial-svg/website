import type { Metadata } from "next";
import { Breadcrumbs, SectionHeading, Eyebrow, CTABand } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbSchema, abs } from "@/lib/schema";
import { SITE } from "@/lib/site";

const PATH = "/about";

export const metadata: Metadata = {
  title: "About Tasama Management Consultancy",
  description:
    "Tasama is a Dubai-based GCC advisory firm bringing tax, finance, compliance and strategy into one disciplined advisory relationship for founders, family businesses and enterprises.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "About Tasama Management Consultancy",
    description:
      "A Dubai-based GCC advisory firm combining tax, finance, compliance and strategy for businesses built to scale.",
    url: abs(PATH),
    type: "profile",
  },
};

const principles = [
  {
    index: "01",
    title: "Advice before execution",
    body: "We form a point of view on structure, exposure and readiness before any filing or setup work begins.",
  },
  {
    index: "02",
    title: "Control over volume",
    body: "The measure of good compliance is not how many returns are filed — it is how little risk is left behind.",
  },
  {
    index: "03",
    title: "One regional view",
    body: "UAE, wider GCC and India–UAE movement are considered together, not as separate country problems.",
  },
  {
    index: "04",
    title: "Finance that informs decisions",
    body: "Reporting exists to change what management does next quarter, not to describe last quarter.",
  },
];

const facts = [
  { label: "Head office", value: `${SITE.address.street}, ${SITE.address.locality}` },
  { label: "Markets served", value: "UAE · GCC · India–UAE corridor" },
  { label: "Practice areas", value: "Tax & Compliance · Finance Advisory · Management Consulting" },
  { label: "Engagement model", value: "Advisory retainer or defined-scope project" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        json={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: PATH },
          ]),
          {
            "@type": "AboutPage",
            "@id": `${abs(PATH)}#about`,
            name: "About Tasama Management Consultancy",
            url: abs(PATH),
            about: { "@id": `${SITE.url.replace(/\/$/, "")}/#organization` },
          },
        )}
      />

      <section className="bg-[#111111] text-white">
        <div className="wrap section">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "About", path: PATH },
            ]}
          />
          <h1 className="reveal mt-8 max-w-[18ch] font-display text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.02] tracking-[-0.05em] text-balance">
            A premium GCC advisory firm for businesses built to scale.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.8] text-white/65">
            Tasama Management Consultancy is a Dubai-based advisory firm. We combine tax, finance,
            compliance, strategy, business setup and management consulting into a single advisory
            relationship — so leadership teams get one coherent view of obligations, controls and
            growth options rather than a stack of disconnected services.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="What we believe"
            title="Four principles that shape every engagement."
          />
          <div className="reveal mt-14 grid border-t border-line sm:grid-cols-2">
            {principles.map((p) => (
              <article
                key={p.index}
                className="border-b border-line p-8 sm:border-r sm:[&:nth-child(2n)]:border-r-0"
              >
                <span className="marker">{p.index}</span>
                <h3 className="mt-6 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.7] text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap section">
          <Eyebrow>The firm at a glance</Eyebrow>
          <dl className="reveal mt-10 grid border-t border-line sm:grid-cols-2">
            {facts.map((f) => (
              <div
                key={f.label}
                className="border-b border-line py-7 sm:border-r sm:pr-8 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:pl-8"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-eyebrow">
                  {f.label}
                </dt>
                <dd className="mt-2 text-[15px] leading-[1.6] text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTABand
        title="Work with an advisory partner, not a filing desk."
        body="Start with a confidential discussion about where your business is heading and the tax, finance and strategy support that will get it there."
      />
    </>
  );
}
