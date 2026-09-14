import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading, Eyebrow, ArrowLink, CTABand } from "@/components/ui";
import { AutomationFlow } from "@/components/automation-flow";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { SERVICES, INDUSTRIES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} | GCC Tax, Finance, Strategy & Compliance`,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "GCC advisory for businesses built to scale",
    description: SITE.description,
    url: SITE.url,
    type: "website",
  },
};

const positioning = [
  { index: "01", title: "Not a filing desk", body: "We advise before we execute." },
  {
    index: "02",
    title: "Not volume compliance",
    body: "We focus on control, structure and readiness.",
  },
  {
    index: "03",
    title: "Not one-country thinking",
    body: "We consider UAE, GCC and India–UAE movement.",
  },
];

const model = [
  {
    index: "01",
    title: "Structure",
    body: "Tax, entity, reporting and compliance foundations designed for UAE and GCC operating environments.",
  },
  {
    index: "02",
    title: "Control",
    body: "Finance reporting, MIS, forecasting and governance that give management a reliable command view.",
  },
  {
    index: "03",
    title: "Expand",
    body: "Market entry, feasibility, transformation and cross-border advisory for sustainable regional growth.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd json={graph(breadcrumbSchema([{ name: "Home", path: "/" }]))} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#0b0b0b] text-white">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-skyline absolute inset-[-3%]">
            <Image
              src="/hero-dubai.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-60"
            />
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,5,5,0.94)_0%,rgba(20,22,24,0.78)_42%,rgba(20,22,24,0.3)_78%,rgba(5,5,5,0.5)_100%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-8 -left-[1.2vw] z-0 select-none whitespace-nowrap font-display text-[clamp(120px,21vw,335px)] font-extrabold leading-[0.7] tracking-[-0.085em] text-white/10"
        >
          TASAMA
        </span>
        <div className="relative z-10 wrap py-24 md:py-32">
          <Eyebrow tone="light">GCC / UAE &nbsp;&middot;&nbsp; Tax &middot; Finance &middot; Strategy &middot; Compliance</Eyebrow>
          <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,1fr)_360px] md:items-end">
            <h1 className="font-display text-[clamp(44px,6.4vw,88px)] font-semibold leading-[0.98] tracking-[-0.055em] text-balance">
              GCC advisory
              <br />
              for businesses
              <br />
              <span className="text-gold-light">built to scale.</span>
            </h1>
            <div>
              <p className="text-[15px] leading-[1.75] text-white/70">
                Tasama combines tax, finance, compliance, strategy, business setup and management
                consulting for founders, family businesses and enterprises expanding across the UAE
                and GCC.
              </p>
              <div className="relative mt-6 border border-gold/25 bg-white/[0.06] p-5 backdrop-blur">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-gold to-gold/10"
                />
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-light/80">
                  Integrated advisory model
                </span>
                <strong className="mt-2 block text-[15px] font-semibold leading-snug">
                  Tax structured. Finance controlled. Growth advised.
                </strong>
                <ul className="mt-4 grid gap-1.5 text-[11px] text-white/60">
                  <li>&mdash; UAE Corporate Tax, VAT and transfer pricing</li>
                  <li>&mdash; Virtual CFO, reporting and forecasting</li>
                  <li>&mdash; Market entry, transformation and expansion</li>
                </ul>
              </div>
              <Link href="/contact" className="btn btn-gold mt-2 w-full">
                Discuss advisory &nearr;
              </Link>
            </div>
          </div>

          <div className="reveal mt-16 grid grid-cols-1 gap-px border-t border-white/15 pt-6 sm:grid-cols-3">
            {[
              ["01", "GCC tax & compliance"],
              ["02", "Finance leadership"],
              ["03", "Strategy & expansion"],
            ].map(([n, label]) => (
              <div key={n} className="flex flex-col gap-2 py-2 sm:px-6 sm:first:pl-0">
                <span className="marker">{n}</span>
                <span className="text-[11px] text-white/55">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-[#111111] text-white">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            tone="light"
            eyebrow="Tasama advisory services"
            title={
              <>
                Beyond accounting.
                <br />
                Advisory for regional growth.
              </>
            }
            intro="Tasama is a premium GCC advisory firm for businesses that need more than filing support. We bring tax, finance, strategy, compliance and management consulting into one disciplined advisory relationship."
          />
          <div className="reveal mt-14 grid gap-px border-y border-gold/20 sm:grid-cols-3">
            {positioning.map((p) => (
              <div key={p.index} className="border-gold/20 py-8 sm:border-r sm:pr-8 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-8">
                <span className="marker">{p.index}</span>
                <strong className="mt-6 block text-[18px] font-semibold text-white">{p.title}</strong>
                <p className="mt-2 text-[13px] leading-[1.6] text-white/50">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory model */}
      <section className="bg-[radial-gradient(circle_at_8%_10%,rgba(184,146,84,0.14),transparent_28%),linear-gradient(135deg,#050505,#151515_62%,#0b0b0b)] text-white">
        <div className="wrap section grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <SectionHeading
            className="reveal"
            tone="light"
            eyebrow="The Tasama advisory model"
            title={
              <>
                From compliance pressure
                <br />
                to strategic control.
              </>
            }
            intro="We help leadership teams understand obligations, strengthen finance operations and make expansion decisions with the clarity expected from a serious advisory partner."
          />
          <div className="reveal grid border border-white/15 bg-white/[0.05] backdrop-blur sm:grid-cols-3">
            {model.map((m) => (
              <article
                key={m.index}
                className="flex min-h-[300px] flex-col justify-between border-white/15 p-7 sm:border-r sm:last:border-r-0"
              >
                <span className="marker">{m.index}</span>
                <div>
                  <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em] text-white">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-white/55">{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#f3f0e9]">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="Advisory services"
            title={
              <>
                Tax, finance and strategy
                <br />
                under one advisory roof.
              </>
            }
            intro="Focused support for GCC businesses, investors and leadership teams that need technical depth and commercial judgement."
          />
          <div className="reveal mt-16 grid border-l border-t border-[#c7cbc4] sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex min-h-[300px] flex-col justify-between border-b border-r border-[#c7cbc4] p-8 transition-colors hover:bg-[#111111] hover:text-white"
              >
                <span className="marker">{s.index}</span>
                <div>
                  <h3 className="font-display text-[23px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink group-hover:text-white">
                    {s.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.65] text-muted group-hover:text-white/65">
                    {s.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold text-ink group-hover:text-gold-light">
                    Explore {s.navLabel.toLowerCase()}
                    <span className="text-gold-eyebrow group-hover:text-gold-light">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Business Setup */}
      <section className="bg-[#111111] text-white">
        <div className="wrap section grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <SectionHeading
            className="reveal"
            tone="light"
            eyebrow="Business setup"
            title={
              <>
                Licence to Emirates ID.
                <br />
                One team, start to finish.
              </>
            }
            intro="End-to-end company formation across Dubai freezone and mainland, Abu Dhabi, Sharjah and Ras Al Khaimah — the most cost-efficient jurisdiction we work with. We stay with you through visas and on to your Emirates ID."
          />
          <div>
            <div className="reveal grid grid-cols-3 border border-white/15 bg-white/[0.05] backdrop-blur">
              {[
                ["~3 days", "to licence issuance"],
                ["~12 days", "full process, licence to Emirates ID"],
                ["0–2", "visa package options"],
              ].map(([stat, label]) => (
                <div key={stat} className="flex min-h-[140px] flex-col justify-between gap-4 border-white/15 p-4 sm:gap-6 sm:p-7 [&:not(:last-child)]:border-r">
                  <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-gold-light sm:text-[30px]">
                    {stat}
                  </span>
                  <span className="text-[11px] leading-[1.5] text-white/55 sm:text-[12px]">{label}</span>
                </div>
              ))}
            </div>
            <div className="reveal mt-8 flex flex-wrap gap-4">
              <Link href="/business-setup" className="btn btn-gold">
                Explore business setup &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ledger.ae */}
      <section className="bg-paper">
        <div className="wrap section grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading
            className="reveal"
            eyebrow="Ledger.ae &middot; by Tasama"
            title={
              <>
                Your ledger, run by
                <br />
                13 AI agents.
              </>
            }
            intro="Ledger.ae is our AI-native finance automation suite for UAE businesses. VAT, Corporate Tax, WPS payroll, GoAML and Peppol e-invoicing run in parallel and land as one board-ready CFO report in under two minutes."
          />
          <div className="reveal">
            <div className="border border-line bg-white p-6 sm:p-10">
              <AutomationFlow tone="light" className="w-full" />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/ledger-ae" className="btn btn-dark">
                Explore Ledger.ae &rarr;
              </Link>
              <span className="text-[12px] text-muted">13 agents &middot; one report &middot; under 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="Industry expertise"
            title="Advisory for the sectors driving GCC growth."
          />
          <div className="reveal mt-14 grid border-t border-[#b8c1bf] sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <article
                key={ind.name}
                className="min-h-[220px] border-b border-[#b8c1bf] p-8 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <span className="marker">{ind.index}</span>
                <h3 className="mt-8 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {ind.name}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-muted">{ind.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <ArrowLink href="/industries">See all industries</ArrowLink>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
