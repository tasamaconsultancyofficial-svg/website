"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Cinematic logo reveal on first load — ported from the original script.js.
 * Auto-dismisses after 3.4s, or immediately on "Skip intro".
 * Fully suppressed under prefers-reduced-motion (CSS hides it too).
 */
export function BrandIntro() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("intro-active");
    let leaveTimer = 0;

    const finish = () => {
      setLeaving(true);
      document.body.classList.remove("intro-active");
      leaveTimer = window.setTimeout(() => setGone(true), 850);
    };
    finishRef.current = finish;

    const autoTimer = window.setTimeout(finish, 3400);

    return () => {
      window.clearTimeout(autoTimer);
      window.clearTimeout(leaveTimer);
      document.body.classList.remove("intro-active");
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`brand-intro${leaving ? " is-leaving" : ""}`} aria-hidden="true">
      <div className="intro-gridlines" />
      <div className="intro-aura" />
      <div className="intro-logo-wrap">
        <span className="intro-rule intro-rule-top" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-dark-bg.svg" alt={SITE.name} />
        <span className="intro-rule intro-rule-bottom" />
      </div>
      <p className="intro-message">Precision. Integrity. Prosperity.</p>
      <button
        className="intro-skip"
        type="button"
        onClick={() => finishRef.current()}
      >
        Skip intro
      </button>
    </div>
  );
}
