import type { ReactNode } from "react";
import Link from "next/link";

/** The site's eyebrow label: a short gold rule + spaced uppercase text. */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const color = tone === "light" ? "text-gold-light" : "text-gold-eyebrow";
  return (
    <p
      className={`flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.22em] ${color} ${className}`}
    >
      <span aria-hidden className="h-px w-7 bg-current" />
      {children}
    </p>
  );
}

/** Underlined text link with a gold arrow, as used across the site. */
export function ArrowLink({
  children,
  href,
  className = "",
  external = false,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <span
      className={`inline-flex items-center gap-3 border-b border-[#a5b7b4] pb-1.5 text-[13px] font-bold text-ink transition-colors ${className}`}
    >
      {children}
      <span aria-hidden className="text-gold-eyebrow">
        &rarr;
      </span>
    </span>
  );
  if (!href) return inner;
  if (external)
    return (
      <a href={href} className="group inline-block">
        {inner}
      </a>
    );
  return (
    <Link href={href} className="group inline-block">
      {inner}
    </Link>
  );
}

/** Standard section heading block: eyebrow + display h2 + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const heading = tone === "light" ? "text-white" : "text-ink";
  const body = tone === "light" ? "text-white/65" : "text-muted";
  return (
    <div className={className}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-6 max-w-[20ch] font-display text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.05] tracking-[-0.045em] text-balance ${heading}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-5 max-w-[56ch] text-[16px] leading-[1.8] ${body}`}>{intro}</p>}
    </div>
  );
}

/** Dark call-to-action band reused at the foot of most pages. */
export function CTABand({
  title = "Ready to discuss a serious advisory mandate?",
  body = "Tell us where your business is heading. We will help identify the tax, finance, compliance and strategy support required to move with confidence.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-navy-deep">
      <div className="wrap section grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <Eyebrow tone="light">Let&rsquo;s talk</Eyebrow>
          <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(28px,3.8vw,44px)] font-semibold leading-[1.06] tracking-[-0.04em] text-white text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.8] text-white/60">{body}</p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link href="/contact" className="btn btn-gold">
            Request advisory discussion &rarr;
          </Link>
          <a href="https://wa.me/971505698473" className="btn btn-outline">
            WhatsApp Tasama
          </a>
        </div>
      </div>
    </section>
  );
}

/** Hairline-separated FAQ list, styled to match the article FAQ block. */
export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <dl className="mt-8">
      {faqs.map((f) => (
        <div key={f.question} className="border-t border-line py-6 first:border-t-0">
          <dt className="font-display text-[16px] font-semibold text-ink">{f.question}</dt>
          <dd className="mt-2 max-w-[68ch] text-[15px] leading-[1.75] text-ink-soft">{f.answer}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Breadcrumb trail (visual). Pair with breadcrumbSchema() for JSON-LD. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted"
    >
      {trail.map((t, i) => (
        <span key={t.path} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>/</span>}
          {i < trail.length - 1 ? (
            <Link href={t.path} className="text-gold-eyebrow hover:text-gold-deep">
              {t.name}
            </Link>
          ) : (
            <span aria-current="page">{t.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
