"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

let hasHydrated = false;

// Reveals [data-reveal] elements as they scroll into view. Content is never hidden
// without JS. On first load, anything already on screen stays put (it was painted by the
// server, so animating it would flash); after client navigation it animates in too.
export function MotionObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const play = (el: Element) => el.classList.add("is-in", "reveal-play");
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const viewport = window.innerHeight;
    for (const el of pending) {
      if (el.getBoundingClientRect().top >= viewport * 0.92) continue;
      if (hasHydrated) play(el);
      else el.classList.add("is-in");
    }
    hasHydrated = true;
    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          play(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    for (const el of pending) if (!el.classList.contains("is-in")) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
