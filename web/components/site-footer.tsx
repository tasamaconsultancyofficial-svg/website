import Link from "next/link";
import { SERVICES, SITE } from "@/lib/site";

const exploreLinks = [
  { label: "About Tasama", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Ledger.ae", href: "/ledger-ae" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/blog" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="wrap grid gap-14 pt-20 pb-14 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-dark-bg.svg" alt={SITE.name} className="h-32 w-auto" />
          <p className="mt-6 max-w-[30ch] leading-relaxed text-white/45">
            GCC advisory across tax, finance, strategy and compliance.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-light">
              Explore
            </h4>
            {exploreLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block py-1.5 text-[12px] leading-relaxed text-white/55 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-light">
              Services
            </h4>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="block py-1.5 text-[12px] leading-relaxed text-white/55 transition-colors hover:text-white"
              >
                {s.name}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-light">
              Start a conversation
            </h4>
            <a
              href={`tel:${SITE.phone}`}
              className="block py-1.5 text-[12px] leading-relaxed text-white/55 transition-colors hover:text-white"
            >
              {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1.5 text-[12px] leading-relaxed text-white/55 transition-colors hover:text-white"
            >
              WhatsApp Tasama
            </a>
            <Link
              href="/contact"
              className="block py-1.5 text-[12px] leading-relaxed text-white/55 transition-colors hover:text-white"
            >
              Book a consultation
            </Link>
            <p className="py-1.5 text-[12px] leading-relaxed text-white/55">
              {SITE.address.street},
              <br />
              {SITE.address.locality}.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-white/10 py-7 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {SITE.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white/70">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white/70">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
