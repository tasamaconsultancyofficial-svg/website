import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Breadcrumbs, Eyebrow, SectionHeading } from "@/components/ui";
import { RagFlow } from "@/components/rag-flow";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbSchema, abs, ORG_ID } from "@/lib/schema";

const PATH = "/ledgerlens";

export const metadata: Metadata = {
  title: { absolute: "LedgerLens UAE — Evidence-Backed Document AI for Accounting Firms" },
  description:
    "LedgerLens is a secure, evidence-backed document workspace for UAE accounting firms, bookkeepers, tax advisers, and auditors. Every AI answer cites the document, page, and excerpt behind it.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "LedgerLens UAE — Every Financial Answer, Backed by Evidence",
    description:
      "A secure, evidence-backed document workspace for UAE accounting firms. Ask a question, get a cited answer — never a guess.",
    url: abs(PATH),
    type: "website",
    images: [abs("/opengraph-image")],
  },
};

type IconKey = "lens" | "chat" | "checklist" | "docalert" | "mail" | "shieldcheck" | "payroll";

const ICON_PATHS: Record<IconKey, string[]> = {
  lens: ["M11 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z", "m20 20-4.35-4.35"],
  chat: ["M4 4h16v12H9l-5 4V4Z", "M8 9h8", "M8 12h5"],
  checklist: ["M5 4h14v16H5z", "m8.5 9 1.5 1.5L13 7", "M8 14h6", "M8 17h6"],
  docalert: ["M6 3h9l4 4v14H6z", "M15 3v4h4", "M12 10.5v4", "M12 17h.01"],
  mail: ["M4 6h16v12H4z", "m4 7 8 6 8-6"],
  shieldcheck: ["M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Z", "m9 12 2 2 4-4"],
  payroll: [
    "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M15 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1",
    "M16 6a3 3 0 0 1 0 6",
    "M21 19v-1a4 4 0 0 0-3-3.87",
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
      <path
        d="m5 13 4 4 10-11"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const LENS_STEPS = [
  {
    n: "01",
    icon: "docalert" as IconKey,
    title: "Upload and organise",
    body: "Drag in invoices, bank statements, contracts, and licences from WhatsApp, email, and shared drives. LedgerLens classifies each file and extracts the text automatically.",
  },
  {
    n: "02",
    icon: "chat" as IconKey,
    title: "Ask, with evidence",
    body: "Ask a question in plain English. LedgerLens answers from your client's own documents only, and shows the exact page and excerpt behind every answer.",
  },
  {
    n: "03",
    icon: "checklist" as IconKey,
    title: "Close the gaps",
    body: "Before a VAT review or month-end close, LedgerLens builds a missing-document checklist and drafts the client request email for your review.",
  },
];

const LENS_MODULES: { icon: IconKey; name: string; body: string }[] = [
  {
    icon: "lens",
    name: "Document search",
    body: "Search across an entire client file — or your whole firm — in seconds. No more digging through shared drives for one invoice.",
  },
  {
    icon: "chat",
    name: "Ask LedgerLens",
    body: "An evidence-backed assistant that cites the document, page, and excerpt behind every answer — and says so plainly when it finds nothing.",
  },
  {
    icon: "checklist",
    name: "VAT evidence review",
    body: "A period-by-period checklist across sales invoices, purchase invoices, credit notes, bank statements, and returns, with a completion score.",
  },
  {
    icon: "docalert",
    name: "Missing-document tracker",
    body: "Flags incomplete document packs automatically — a missing bank statement month, an expiring trade licence, a duplicate invoice.",
  },
  {
    icon: "payroll",
    name: "Client portal",
    body: "Clients see only their own requests and upload files directly — no more chasing attachments over WhatsApp and email.",
  },
  {
    icon: "mail",
    name: "Request drafting",
    body: "LedgerLens drafts the client email listing exactly what's missing and why. Nothing sends until an accountant reviews and approves it.",
  },
];

const LENS_PROMPTS = [
  "Which bank statements are missing for Q2?",
  "Find sales invoices issued in June.",
  "Show supporting evidence for this purchase entry.",
  "What is the VAT registration number in the uploaded documents?",
  "Which invoices are older than 60 days?",
  "Draft an email asking for missing bank statements.",
];

const LENS_ROLES = [
  {
    name: "Firm Owner / Partner",
    body: "Creates client workspaces, assigns the team, and reviews client-facing messages before they go out.",
  },
  {
    name: "Accountant / Bookkeeper",
    body: "Uploads documents, searches the file, runs VAT evidence checks, and drafts requests for missing evidence.",
  },
  {
    name: "Reviewer / Manager",
    body: "Reviews evidence, marks exceptions, and approves or rejects outgoing document requests.",
  },
  {
    name: "Client User",
    body: "Sees only their own company's requests, uploads what's asked for, and tracks status — nothing more.",
  },
];

const LENS_SECURITY = [
  "Strict tenant isolation — a firm never sees another firm's clients, and a client never sees another client's files.",
  "Every AI answer is scoped to documents the signed-in user is actually authorised to see.",
  "Signed, expiring links for document downloads — never a permanent public URL.",
  "Encryption in transit and at rest, with an audit log for every upload, view, download, and AI query.",
  "Client documents are never used to train a public AI model.",
];

const RAG_STAGES = [
  {
    title: "Documents",
    body: "Every uploaded invoice, statement, and contract is stored, then OCR'd and split into passages.",
  },
  {
    title: "Chunk & embed",
    body: "Each passage is converted into a vector — a numeric fingerprint of its meaning — and indexed.",
  },
  {
    title: "Scoped retrieval",
    body: "A question retrieves only the closest-matching passages, filtered to that firm and that client. Nothing else exists as far as the model is concerned.",
  },
  {
    title: "Grounded answer",
    body: "The model drafts an answer using only the retrieved text, with a citation back to the document and page it came from.",
  },
];

const VAT_EVIDENCE = [
  "Sales invoices, purchase invoices, tax invoices, credit notes",
  "Bank statements, import and export records",
  "VAT returns, general ledger, trial balance",
  "Supporting contracts and purchase orders",
];

const PROBLEMS = [
  "Searching for one invoice across five folders and a WhatsApp thread",
  "Checking whether every month's bank statement actually made it in",
  "Re-asking a client for a trade licence they sent eight months ago",
  "Answering “do we have this?” from a colleague, again",
];

export default function LedgerLensPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "LedgerLens", path: PATH },
  ];

  return (
    <>
      <JsonLd
        json={graph(breadcrumbSchema(trail), {
          "@type": "SoftwareApplication",
          "@id": `${abs(PATH)}#software`,
          name: "LedgerLens UAE",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: abs(PATH),
          description:
            "A secure, evidence-backed document workspace for UAE accounting firms, bookkeepers, tax advisers, and auditors, built on retrieval-augmented generation.",
          provider: { "@id": ORG_ID },
          areaServed: ["United Arab Emirates", "GCC"],
        })}
      />

      {/* 1 — HERO ---------------------------------------------------------- */}
      <section
        id="ledgerlens"
        className="relative isolate scroll-mt-24 overflow-hidden bg-navy-deep text-white"
      >
        <span aria-hidden className="orb-hero-glow" style={{ opacity: 0.5 }} />
        <div className="wrap section">
          <Breadcrumbs trail={trail} />
          <p className="reveal mt-8 font-mono text-[13px] font-bold uppercase tracking-[0.24em] text-gold">
            Built by the Ledger.ae team
          </p>
          <h1 className="reveal mt-5 max-w-[20ch] font-display text-[clamp(38px,5.4vw,64px)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
            LedgerLens UAE
          </h1>
          <p className="reveal mt-3 max-w-[42ch] text-[16px] font-medium text-gold-light">
            Every financial answer, backed by evidence.
          </p>
          <p className="reveal mt-6 max-w-[64ch] text-[16px] leading-[1.85] text-white/65">
            LedgerLens is a secure, evidence-backed document workspace for UAE accounting firms,
            bookkeepers, tax advisers, and auditors — built to turn scattered client documents into
            an organised, searchable file, so your team spends less time hunting for invoices and
            chasing clients for attachments.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-gold">
              Talk to us about LedgerLens &rarr;
            </Link>
            <a href="#lens-how-it-works" className="btn btn-outline">
              See how it works
            </a>
          </div>
          <p className="reveal mt-10 max-w-[60ch] border-l-2 border-gold pl-4 text-[13px] leading-[1.8] text-white/45">
            LedgerLens is document intelligence software. It does not provide tax, legal, audit, or
            compliance advice — every answer points back to your own uploaded documents for a
            qualified accountant to review.
          </p>
        </div>
      </section>

      {/* 2 — PROBLEM -------------------------------------------------------- */}
      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="LedgerLens &middot; The problem"
            title="Client documents are scattered everywhere except where you need them"
            intro="WhatsApp, email attachments, shared drives, Excel trackers, scanned PDFs. Before every VAT return, close, or audit, someone on the team re-does the same search from scratch."
          />
          <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((body, i) => (
              <article
                key={body}
                className="reveal flex min-h-[160px] flex-col justify-center border-b border-r border-line p-7"
                style={{ "--reveal-delay": `${i * 0.05}s` } as CSSProperties}
              >
                <p className="text-[14px] leading-[1.7] text-ink-soft">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — HOW IT WORKS ---------------------------------------------------- */}
      <section id="lens-how-it-works" className="scroll-mt-24 bg-white">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="LedgerLens &middot; How it works"
            title="Three steps from scattered files to an evidence-backed answer"
          />
          <div className="reveal mt-14 grid gap-8 border-l border-t border-line sm:grid-cols-3">
            {LENS_STEPS.map((s, i) => (
              <div
                key={s.n}
                className="reveal flex min-h-[220px] flex-col border-b border-r border-line p-7"
                style={{ "--reveal-delay": `${i * 0.08}s` } as CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-cream text-ink">
                    <Icon name={s.icon} />
                  </span>
                  <span className="marker">{s.n}</span>
                </div>
                <h3 className="mt-4 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — MODULES ---------------------------------------------------------- */}
      <section className="bg-cream">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="LedgerLens &middot; Modules"
            title="One workspace per client. Everything your team needs, nothing they don't."
          />
          <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {LENS_MODULES.map((m, i) => (
              <article
                key={m.name}
                className="reveal flex min-h-[190px] flex-col border-b border-r border-line bg-white p-7"
                style={{ "--reveal-delay": `${i * 0.05}s` } as CSSProperties}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center bg-cream text-ink">
                  <Icon name={m.icon} />
                </span>
                <h3 className="mt-4 font-display text-[16px] font-semibold tracking-[-0.02em] text-ink">
                  {m.name}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-muted">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — ASK LEDGERLENS ---------------------------------------------------- */}
      <section className="bg-white">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="LedgerLens &middot; Ask LedgerLens"
            title="Every answer shows its working"
            intro="Ask a question in plain English. LedgerLens answers only from documents your team is authorised to see, and never invents a figure, a date, or a conclusion."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <ul className="reveal space-y-3">
              {LENS_PROMPTS.map((p) => (
                <li key={p} className="flex items-start gap-3 border-t border-line pt-3">
                  <Icon name="lens" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span className="font-mono text-[13px] leading-[1.65] text-ink-soft">
                    &ldquo;{p}&rdquo;
                  </span>
                </li>
              ))}
            </ul>

            <div className="reveal border border-line bg-paper p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-eyebrow">
                Anatomy of an answer
              </p>
              <div className="mt-4 space-y-3 text-[13.5px] leading-[1.7] text-ink-soft">
                <p>
                  <span className="font-semibold text-ink">1. Short answer first</span> — stated
                  clearly, in one or two lines.
                </p>
                <p>
                  <span className="font-semibold text-ink">2. Evidence, immediately below</span> —
                  the document name, page number, and the exact excerpt it came from, one click
                  from the original file.
                </p>
                <p>
                  <span className="font-semibold text-ink">3. A safe next step</span> — request the
                  missing document, or ask a qualified accountant to review.
                </p>
              </div>
              <p className="mt-5 border-t border-line pt-4 text-[13px] italic leading-[1.7] text-muted">
                &ldquo;I could not find supporting evidence in the uploaded documents for this
                client.&rdquo; — what LedgerLens says when there isn&rsquo;t one, instead of
                guessing.
              </p>
            </div>
          </div>

          <p className="reveal mt-10 text-[12px] leading-[1.8] text-muted">
            Document-based assistance only — accountant review required. LedgerLens does not
            provide tax, legal, audit, or AML advice, and never decides whether a company is
            compliant.
          </p>
        </div>
      </section>

      {/* 6 — WHAT IS RAG ---------------------------------------------------- */}
      <section className="bg-paper">
        <div className="wrap section grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            className="reveal"
            eyebrow="LedgerLens &middot; The technology"
            title="Why this is not just a chatbot bolted onto your file server"
            intro="A generic AI chatbot answers from whatever it learned during training — it can sound confident and still be wrong about your client's numbers. LedgerLens uses a different approach, called retrieval-augmented generation, or RAG."
          />
          <div className="reveal grid gap-px border-l border-t border-line sm:grid-cols-2">
            {[
              {
                title: "A generic chatbot",
                body: "Answers from general training data. No idea what's in your client's actual documents. Will guess at a figure, a date, or a VAT number rather than say it doesn't know.",
              },
              {
                title: "LedgerLens (RAG)",
                body: "Answers only from the specific document passages retrieved for that question, scoped to the client the user is authorised to see. Shows the source. Says so when nothing matches.",
              },
            ].map((c) => (
              <article key={c.title} className="border-b border-r border-line bg-white p-7">
                <h3 className="font-display text-[16px] font-semibold tracking-[-0.02em] text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-muted">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — HOW THE RAG PIPELINE WORKS -------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        <span aria-hidden className="orb-hero-glow" style={{ opacity: 0.4 }} />
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            tone="light"
            eyebrow="LedgerLens &middot; How retrieval works"
            title="Four steps between a question and a cited answer"
            intro="Nothing here is guesswork. Every stage narrows the model down to exactly the text it's allowed to use — and nothing else."
          />
          <div className="reveal mt-14 overflow-x-auto">
            <RagFlow tone="dark" className="w-full min-w-[640px]" />
          </div>
          <div className="reveal mt-12 grid gap-8 border-t border-white/12 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {RAG_STAGES.map((s, i) => (
              <div key={s.title} className="border-l-2 border-gold pl-4">
                <span className="marker">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-[15px] font-semibold tracking-[-0.01em] text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-white/55">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — VAT EVIDENCE REVIEW ---------------------------------------------- */}
      <section className="bg-paper">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="LedgerLens &middot; VAT evidence review"
            title="Know what's missing before the review starts, not during it"
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <ul className="reveal space-y-3">
              {VAT_EVIDENCE.map((f) => (
                <li key={f} className="flex items-start gap-3 border-t border-line pt-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-[14px] leading-[1.65] text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>
            <div className="reveal border border-line bg-white p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-eyebrow">
                Per period, per client
              </p>
              <p className="mt-3 text-[14px] leading-[1.75] text-ink-soft">
                Select a client and a VAT period. LedgerLens builds a checklist across every
                evidence category, and each item is marked{" "}
                <span className="font-semibold text-ink">Available</span>,{" "}
                <span className="font-semibold text-ink">Missing</span>,{" "}
                <span className="font-semibold text-ink">Needs review</span>, or{" "}
                <span className="font-semibold text-ink">Not applicable</span>.
              </p>
              <p className="mt-3 text-[14px] leading-[1.75] text-ink-soft">
                It also flags document-quality issues — a duplicate invoice, an unreadable scan, a
                missing invoice number or VAT amount — so your reviewer catches them before the
                client does, or before a filing does.
              </p>
              <p className="mt-4 border-t border-line pt-4 text-[12px] text-muted">
                One click to create the client request for anything missing, or export the full
                evidence index as CSV or PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — ROLES ------------------------------------------------------------ */}
      <section className="bg-white">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="LedgerLens &middot; Built for the whole team"
            title="Every seat sees exactly what it should — no more, no less"
          />
          <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {LENS_ROLES.map((r, i) => (
              <article
                key={r.name}
                className="reveal flex min-h-[170px] flex-col border-b border-r border-line p-7"
                style={{ "--reveal-delay": `${i * 0.05}s` } as CSSProperties}
              >
                <h3 className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">
                  {r.name}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-muted">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — SECURITY --------------------------------------------------------- */}
      <section className="bg-cream">
        <div className="wrap section">
          <SectionHeading
            className="reveal"
            eyebrow="LedgerLens &middot; Security &amp; trust"
            title="Built for firms that handle other people's financial records"
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_auto]">
            <ul className="reveal space-y-3">
              {LENS_SECURITY.map((f) => (
                <li key={f} className="flex items-start gap-3 border-t border-line pt-3">
                  <Icon name="shieldcheck" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-[14px] leading-[1.65] text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>
            <div className="reveal flex items-center justify-center border border-line bg-white p-8 lg:w-[220px]">
              <div className="text-center">
                <Icon name="shieldcheck" className="mx-auto h-9 w-9 text-gold" />
                <p className="mt-3 font-display text-[14px] font-semibold text-ink">
                  Isolated by design
                </p>
                <p className="mt-1 text-[12px] leading-[1.6] text-muted">
                  One firm. One client. One workspace at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — CTA --------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <span aria-hidden className="orb-hero-glow" style={{ opacity: 0.45 }} />
        <div className="wrap section text-center">
          <Eyebrow tone="light" className="justify-center">
            LedgerLens UAE
          </Eyebrow>
          <h2 className="reveal mx-auto mt-6 max-w-[22ch] font-display text-[clamp(28px,4vw,46px)] font-semibold leading-[1.08] tracking-[-0.04em] text-white text-balance">
            See it running on your own client files
          </h2>
          <p className="reveal mx-auto mt-5 max-w-[52ch] text-[15px] leading-[1.8] text-white/60">
            Tell us about your practice and the clients you&rsquo;d want to start with, and
            we&rsquo;ll walk you through LedgerLens directly.
          </p>
          <div className="reveal mt-9 flex justify-center">
            <Link href="/contact" className="btn btn-gold">
              Talk to us about LedgerLens &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
