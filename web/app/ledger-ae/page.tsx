import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Breadcrumbs, Eyebrow, SectionHeading } from "@/components/ui";
import { AutomationFlow } from "@/components/automation-flow";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbSchema, abs, ORG_ID } from "@/lib/schema";

const PATH = "/ledger-ae";

export const metadata: Metadata = {
  title: { absolute: "Ledger.ae — AI Finance Suite for Dubai & UAE" },
  description:
    "Ledger.ae is an AI-native finance automation suite for UAE businesses. 13 AI agents run VAT, Corporate Tax 9%, Pillar 2, WPS payroll, GoAML AML, IFRS consolidation and Peppol e-invoicing — a board-ready CFO report in under two minutes.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Ledger.ae — The AI Finance Controller for Dubai Business",
    description:
      "13 AI agents. Zero manual reporting. Full UAE regulatory compliance — VAT, Corporate Tax, WPS, GoAML, Peppol e-invoice.",
    url: abs(PATH),
    type: "website",
  },
};

/* --------------------------------------------------------------------------
   Content — all hardcoded, no CMS
   -------------------------------------------------------------------------- */

const PAIN_POINTS = [
  {
    tag: "Penalty risk",
    title: "The VAT penalty surprise",
    body: "The FTA fines 2% of the unpaid VAT liability per month for late filing. One missed deadline compounds fast.",
  },
  {
    tag: "Time sink",
    title: "The 6-day close",
    body: "UAE finance teams average six working days to close the month. That is six days of stale numbers, every month.",
  },
  {
    tag: "Penalty risk",
    title: "The WPS fine",
    body: "Miss the Wage Protection System run and it is AED 1,000 per employee per month — plus a hold on new work permits.",
  },
  {
    tag: "Time sink",
    title: "Consolidation in Excel",
    body: "Five entities, eight currencies, intercompany eliminations — rebuilt by hand in a spreadsheet every quarter.",
  },
  {
    tag: "Blind spot",
    title: "The Corporate Tax blindspot",
    body: "Most SMEs cannot state their effective Corporate Tax rate once Pillar 2 top-up and free-zone rules are applied.",
  },
  {
    tag: "Time sink",
    title: "Arabic board reporting",
    body: "Government entities and family offices require statements in Arabic. Translation happens the night before the board meeting.",
  },
];

type IconKey =
  | "audit"
  | "revrec"
  | "tax"
  | "treasury"
  | "fpna"
  | "payroll"
  | "consol"
  | "ar"
  | "fraud"
  | "ocr"
  | "vendor"
  | "peppol"
  | "cfo";

const ICON_PATHS: Record<IconKey, string[]> = {
  audit: ["M11 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z", "m20 20-4.35-4.35", "M11 8v3l2 1"],
  revrec: ["M6 3h9l4 4v14H6z", "M15 3v4h4", "m9 14 2 2 4-4"],
  tax: ["M18 6 6 18", "M8 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z", "M20 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"],
  treasury: [
    "M3 7a2 2 0 0 1 2-2h12v3",
    "M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5",
    "M16 12.5h4v3h-4a1.5 1.5 0 0 1 0-3Z",
  ],
  fpna: ["M4 20V11", "M10 20V4", "M16 20v-7", "M3 20h18"],
  payroll: [
    "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M15 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1",
    "M16 6a3 3 0 0 1 0 6",
    "M21 19v-1a4 4 0 0 0-3-3.87",
  ],
  consol: ["m12 3 9 5-9 5-9-5 9-5Z", "m3 13 9 5 9-5", "m3 17 9 5 9-5"],
  ar: ["M3 6h18v12H3z", "m3 7 9 6 9-6"],
  fraud: ["M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Z", "M12 8v4", "M12 15h.01"],
  ocr: [
    "M4 7V5a1 1 0 0 1 1-1h2M20 7V5a1 1 0 0 0-1-1h-2M4 17v2a1 1 0 0 0 1 1h2M20 17v2a1 1 0 0 1-1 1h-2",
    "M7 9h10M7 12h10M7 15h6",
  ],
  vendor: ["M4 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7", "M8 7h3M8 11h3M8 15h3", "m13 18 2 2 5-5"],
  peppol: ["M6 3h9l4 4v14H6z", "M15 3v4h4", "m10 12-2 2 2 2", "M14 12l2 2-2 2"],
  cfo: [
    "M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    "M12 12v4",
    "M12 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
    "M6 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM6 9l4 1M18 9a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM18 9l-4 1",
  ],
};

function Icon({ name, className = "h-5 w-5" }: { name: IconKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function Check({ className = "h-4 w-4 text-gold" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 13 4 4 10-11" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross({ className = "h-4 w-4 text-muted" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

const AGENTS: { n: string; icon: IconKey; name: string; desc: string }[] = [
  { n: "01", icon: "audit", name: "GL & Audit Intelligence", desc: "Anomaly detection and Benford's Law analysis on every journal entry." },
  { n: "02", icon: "revrec", name: "Revenue Recognition — IFRS 15", desc: "Contract analysis, standalone selling price allocation, deferred revenue schedules." },
  { n: "03", icon: "tax", name: "UAE Tax — VAT + CT + Pillar 2", desc: "FTA return filing, 9% Corporate Tax, transfer pricing documentation." },
  { n: "04", icon: "treasury", name: "Treasury & 13-Week Cash Forecast", desc: "FX hedging signals, covenant tracking, liquidity runway." },
  { n: "05", icon: "fpna", name: "FP&A & Strategic Finance", desc: "Board variance analysis and driver-based scenario modelling." },
  { n: "06", icon: "payroll", name: "Payroll, WPS & Compliance", desc: "MoHRE SIF files, Emiratisation quota, GoAML screening." },
  { n: "07", icon: "consol", name: "IFRS 10 Consolidation", desc: "Five entities, eight currencies, bilingual AR/EN statements." },
  { n: "08", icon: "ar", name: "AR Collections AI", desc: "English and Arabic dunning sequences with promise-to-pay tracking." },
  { n: "09", icon: "fraud", name: "Fraud & Anomaly Monitor", desc: "Real-time pattern detection and GoAML STR draft generation." },
  { n: "10", icon: "ocr", name: "Invoice OCR + AP Automation", desc: "Line-item extraction, 3-way match, Peppol XML output." },
  { n: "11", icon: "vendor", name: "Vendor Due Diligence", desc: "DED / FTA / OFAC / UN sanctions screening on every supplier." },
  { n: "12", icon: "peppol", name: "FTA e-Invoice Peppol Generator", desc: "UBL 2.1 compliant XML — mandatory from July 2026." },
  { n: "13", icon: "cfo", name: "CFO Orchestrator", desc: "Synthesises all 12 agents into a board-ready health score, 0–100." },
];

const UAE_FEATURES = [
  "FTA VAT return — all 12 boxes auto-populated",
  "Corporate Tax 9% — Qualifying Free Zone Person check",
  "Pillar 2 QDMTT top-up calculation",
  "WPS payroll — SIF / MOE files for MoHRE",
  "Emiratisation tracking + NAFIS incentive calc",
  "GoAML AML + suspicious transaction reports",
  "FTA Peppol e-invoice (mandatory Jul 2026)",
  "Arabic bilingual financial statements",
  "DIFC / ADGM / Mainland compliance calendar",
  "ESR + UBO + CbCR regulatory tracking",
];

const COMPARISON: { feature: string; ledger: boolean; rillet: boolean }[] = [
  { feature: "UAE VAT filing", ledger: true, rillet: false },
  { feature: "UAE Corporate Tax", ledger: true, rillet: false },
  { feature: "WPS payroll", ledger: true, rillet: false },
  { feature: "GoAML AML", ledger: true, rillet: false },
  { feature: "Arabic reporting", ledger: true, rillet: false },
  { feature: "Peppol e-invoice", ledger: true, rillet: false },
  { feature: "IFRS 10 consolidation", ledger: true, rillet: true },
  { feature: "Multi-LLM AI agents", ledger: true, rillet: false },
  { feature: "Market focus", ledger: true, rillet: true },
];

const INTEGRATIONS = [
  { name: "Zoho Books", desc: "Native UAE VAT ledger sync — invoices, bills, journals." },
  { name: "Xero", desc: "Two-way sync of the chart of accounts and bank feeds." },
  { name: "QuickBooks", desc: "Online and Desktop exports mapped to your entity structure." },
  { name: "Google Sheets", desc: "Point it at a sheet and it reads your trial balance directly." },
];

const OUTPUTS: { icon: IconKey; label: string; body: string }[] = [
  { icon: "ar", label: "Gmail", body: "Full HTML dashboard delivered to your inbox at 6am Dubai time." },
  { icon: "payroll", label: "WhatsApp", body: "150-word CFO digest to WhatsApp Business. Critical alerts push immediately." },
  { icon: "fpna", label: "Google Sheets", body: "17 live KPIs written to your dashboard — health score, risks, actions, timestamp." },
];

const PRICING = [
  { name: "Starter", amount: 2500, line: "Single entity, GL + AR/AP + VAT return, 1 AI agent.", popular: false },
  { name: "Growth", amount: 6500, line: "All 13 agents, 3 entities, WPS + VAT + CT, close management.", popular: true },
  { name: "Enterprise", amount: 18000, line: "Unlimited entities, custom AI, AML / GoAML, board-pack generation.", popular: false },
  { name: "Accounting Firm", amount: 45000, line: "White-label, unlimited clients, revenue-share model.", popular: false },
];

const aed = (n: number) => `AED ${n.toLocaleString("en-US")}`;

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function LedgerAePage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Ledger.ae", path: PATH },
  ];

  return (
    <>
      <JsonLd
        json={graph(breadcrumbSchema(trail), {
          "@type": "SoftwareApplication",
          "@id": `${abs(PATH)}#software`,
          name: "Ledger.ae",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web — self-hosted on n8n",
          url: abs(PATH),
          description:
            "AI-native finance automation suite for UAE businesses. 13 AI agents cover VAT, Corporate Tax 9%, Pillar 2, WPS payroll, GoAML AML, IFRS consolidation and Peppol e-invoicing.",
          provider: { "@id": ORG_ID },
          areaServed: ["United Arab Emirates", "GCC"],
          offers: PRICING.map((t) => ({
            "@type": "Offer",
            name: t.name,
            price: t.amount,
            priceCurrency: "AED",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: t.amount,
              priceCurrency: "AED",
              unitText: "MONTH",
            },
          })),
        })}
      />

      {/* 1 — HERO ---------------------------------------------------------- */}
      <section className="orb-hero text-white">
        <span aria-hidden className="orb-hero-glow" />
        <div className="wrap section">
          <Breadcrumbs trail={trail} />

          <p className="reveal mt-8 font-mono text-[13px] font-bold uppercase tracking-[0.24em] text-gold">
            Tasama &middot; Ledger.ae
          </p>

          <h1 className="reveal mt-5 max-w-[18ch] font-display text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.02] tracking-[-0.05em] text-balance">
            The AI Finance Controller for Dubai Business
          </h1>

          <p className="reveal mt-6 max-w-[62ch] text-[17px] leading-[1.8] text-white/65">
            13 AI agents. Zero manual reporting. Full UAE regulatory compliance — VAT, Corporate
            Tax, WPS, GoAML, Peppol e-invoice.
          </p>

          <div className="reveal mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-gold">
              Request a Demo &rarr;
            </Link>
            <a href="#how-it-works" className="btn btn-outline">
              See how it works
            </a>
          </div>

          <div className="reveal mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/12 pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            <span>Built in n8n</span>
            <span>OpenRouter multi-LLM</span>
            <span>Self-hosted</span>
            <span>Dubai &middot; UAE &middot; GCC</span>
          </div>

          <div className="reveal mt-4 border-t border-white/12 pt-8">
            <AutomationFlow tone="dark" className="w-full" />
          </div>
        </div>
      </section>

      {/* 2 — PROBLEM ----------------------------------------------------- */}
      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="The problem"
            title="Why Dubai finance teams are drowning"
          />
          <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {PAIN_POINTS.map((p, i) => (
              <article
                key={p.title}
                className="reveal flex min-h-[220px] flex-col border-b border-r border-line p-8"
                style={{ "--reveal-delay": `${i * 0.05}s` } as CSSProperties}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-eyebrow">
                  {p.tag}
                </span>
                <h3 className="mt-4 font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — HOW IT WORKS ---------------------------------------------- */}
      <section id="how-it-works" className="scroll-mt-24 bg-white">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="How it works"
            title="13 AI agents. One workflow. Runs itself."
            intro="Your ledger flows in from the left. Each agent takes a pass, writes its findings back, and hands off to the next. The orchestrator reads all of them and produces one report."
          />

          <ol className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {AGENTS.map((a, i) => {
              const isOrchestrator = a.n === "13";
              return (
                <li
                  key={a.n}
                  className={`reveal group flex min-h-[190px] flex-col border-b border-r p-6 transition-colors ${
                    isOrchestrator
                      ? "border-gold bg-cream sm:col-span-2 lg:col-span-3 xl:col-span-1"
                      : "border-line hover:bg-cream/60"
                  }`}
                  style={{ "--reveal-delay": `${i * 0.04}s` } as CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center text-ink ${
                        isOrchestrator ? "bg-white" : "bg-cream"
                      }`}
                    >
                      <Icon name={a.icon} />
                    </span>
                    <span className="marker">{a.n}</span>
                  </div>
                  <h3 className="mt-4 font-display text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                    {a.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-muted">{a.desc}</p>
                </li>
              );
            })}
          </ol>

          <p className="reveal mt-10 border-l-2 border-gold pl-4 text-[15px] text-ink-soft">
            All 13 run in parallel.{" "}
            <span className="font-semibold text-ink">CFO report ready in under 2 minutes.</span>
          </p>
        </div>
      </section>

      {/* 4 — UAE-SPECIFIC -------------------------------------------- */}
      <section className="bg-cream">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="UAE-native"
            title="Built for UAE. Not adapted for it."
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <ul className="reveal space-y-3">
              {UAE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 border-t border-line pt-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-[14px] leading-[1.65] text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>

            <div className="reveal">
              <div className="overflow-x-auto border border-line bg-white">
                <table className="w-full min-w-[420px] text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-line bg-paper text-[11px] uppercase tracking-[0.12em] text-muted">
                      <th className="px-4 py-3 font-semibold">Feature</th>
                      <th className="px-4 py-3 text-center font-semibold text-gold-eyebrow">Ledger.ae</th>
                      <th className="px-4 py-3 text-center font-semibold">Rillet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.feature} className="border-b border-line/70 last:border-0">
                        <td className="px-4 py-3 text-ink-soft">{row.feature}</td>
                        <td className="px-4 py-3">
                          <span className="flex justify-center">
                            {row.ledger ? <Check /> : <Cross />}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex justify-center">
                            {row.rillet ? <Check className="h-4 w-4 text-muted" /> : <Cross />}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[12px] leading-[1.7] text-muted">
                Rillet is excellent — for US SaaS companies on GAAP. Ledger.ae is built for Dubai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — DATA SOURCES ------------------------------------------ */}
      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="Integrations"
            title="Connects to your accounting system"
          />
          <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRATIONS.map((it, i) => (
              <article
                key={it.name}
                className="reveal flex min-h-[180px] flex-col border-b border-r border-line p-7"
                style={{ "--reveal-delay": `${i * 0.05}s` } as CSSProperties}
              >
                <span className="inline-flex w-fit border border-line bg-white px-3 py-1.5 font-mono text-[12px] font-semibold text-ink">
                  {it.name}
                </span>
                <p className="mt-4 text-[14px] leading-[1.7] text-muted">{it.desc}</p>
              </article>
            ))}
          </div>
          <p className="reveal mt-8 text-[14px] text-muted">
            No accounting system yet?{" "}
            <span className="text-ink">Start with our mock data mode and migrate when ready.</span>
          </p>
        </div>
      </section>

      {/* 6 — OUTPUTS --------------------------------------------- */}
      <section className="bg-white">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="Outputs"
            title="What the CFO gets every morning"
          />
          <div className="reveal mt-14 grid border-l border-t border-line md:grid-cols-3">
            {OUTPUTS.map((o, i) => (
              <article
                key={o.label}
                className="reveal flex min-h-[210px] flex-col border-b border-r border-line p-8"
                style={{ "--reveal-delay": `${i * 0.06}s` } as CSSProperties}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center bg-cream text-ink">
                  <Icon name={o.icon} />
                </span>
                <h3 className="mt-4 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                  {o.label}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">{o.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — PRICING ------------------------------------------ */}
      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="Pricing"
            title="One flat fee. Every agent included from Growth up."
          />
          <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {PRICING.map((tier, i) => (
              <article
                key={tier.name}
                className={`reveal relative flex min-h-[280px] flex-col border-b border-r p-7 ${
                  tier.popular ? "border-gold bg-cream" : "border-line"
                }`}
                style={{ "--reveal-delay": `${i * 0.05}s` } as CSSProperties}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-7 bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
                    Most Popular
                  </span>
                )}
                <span className="marker">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
                  {tier.name}
                </h3>
                <p className="mt-3 font-display text-[24px] font-semibold tracking-[-0.02em] text-ink">
                  {aed(tier.amount)}
                  <span className="text-[13px] font-medium text-muted"> /mo</span>
                </p>
                <p className="mt-3 flex-1 text-[13px] leading-[1.6] text-muted">{tier.line}</p>
                <Link
                  href="/contact"
                  className={`mt-5 ${tier.popular ? "btn btn-gold" : "btn btn-dark"} w-full`}
                >
                  Request a Demo
                </Link>
              </article>
            ))}
          </div>
          <p className="reveal mt-8 text-[14px] text-muted">
            <span className="font-semibold text-gold-eyebrow">Zero OpenRouter API cost.</span> All
            agents run on free models.
          </p>
        </div>
      </section>

      {/* 8 — CTA FOOTER ----------------------------------- */}
      <section className="bg-navy-deep">
        <div className="wrap section text-center">
          <Eyebrow tone="light" className="justify-center">
            Ledger.ae
          </Eyebrow>
          <h2 className="reveal mx-auto mt-6 max-w-[20ch] font-display text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.05] tracking-[-0.045em] text-white text-balance">
            Ready to close in under a day?
          </h2>
          <p className="reveal mx-auto mt-5 max-w-[50ch] text-[15px] leading-[1.8] text-white/60">
            Built in n8n. Self-hosted. Your data never leaves your instance.
          </p>
          <div className="reveal mt-9 flex justify-center">
            <Link href="/contact" className="btn btn-gold">
              Book a Demo &rarr;
            </Link>
          </div>
          <p className="reveal mt-10 text-[11px] uppercase tracking-[0.18em] text-white/40">
            Ledger.ae &middot; Dubai, UAE &middot; Built for DIFC, DAFZA, and Mainland businesses
          </p>
        </div>
      </section>
    </>
  );
}
