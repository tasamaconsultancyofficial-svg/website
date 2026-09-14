"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV, SITE } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gold/15 bg-[#050505]/90 backdrop-blur-lg transition-shadow ${
        scrolled ? "shadow-[0_18px_58px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      <div className="wrap flex h-[100px] items-center justify-between">
        <Link href="/" aria-label="Tasama home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt={SITE.name} className="h-10 w-auto md:h-12" />
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
          <span className="sr-only">Toggle navigation</span>
        </button>

        <nav
          id="primary-nav"
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-0 top-[100px] flex-col gap-1 bg-[#050505] p-6 md:static md:flex md:flex-row md:items-center md:gap-9 md:bg-transparent md:p-0`}
          aria-label="Primary navigation"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative py-3 text-[12px] tracking-[0.03em] transition-colors after:absolute after:bottom-0.5 after:left-0 after:h-px after:bg-gold after:transition-all hover:text-white hover:after:w-full ${
                isActive(item.href)
                  ? "text-white after:w-full"
                  : "text-white/75 after:w-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex min-w-[169px] items-center justify-center bg-gold px-5 py-[13px] text-center text-[12px] font-bold text-[#080808] transition-colors hover:bg-[#e0bd7c] md:mt-0"
          >
            Speak to an advisor
          </Link>
        </nav>
      </div>
    </header>
  );
}
