"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Re-implements the original IntersectionObserver scroll-reveal.
 * Any element with the `reveal` class fades/rises in when it enters the
 * viewport. Re-scans on route change so client-navigated pages animate too.
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
