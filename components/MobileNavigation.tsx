"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

type MobileNavigationProps = {
  closeLabel: string;
  contactHref: string;
  locale: Locale;
  languageLabel: string;
  navItems: { href: string; label: string }[];
  navLabel: string;
  openLabel: string;
};

export function MobileNavigation({
  closeLabel,
  contactHref,
  locale,
  languageLabel,
  navItems,
  navLabel,
  openLabel,
}: MobileNavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function isCurrentPage(href: string) {
    return pathname === href || (href === "/" && pathname === "/ja");
  }

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative md:hidden" ref={containerRef}>
      <button
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? closeLabel : openLabel}
        className="grid size-11 cursor-pointer place-items-center rounded-full border border-[#6A5748]/15 bg-white text-[#3e3a39] shadow-sm transition-colors hover:bg-[#F7F3ED]"
        onClick={() => setIsOpen((open) => !open)}
        ref={toggleRef}
        type="button"
      >
        <span className={`hamburger ${isOpen ? "hamburger-open" : ""}`} aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-x-4 top-[4.5rem] max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-2xl border border-[#6A5748]/10 bg-white p-2 shadow-[0_20px_50px_rgb(62_58_57_/_0.2)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-72"
          id="mobile-navigation-panel"
        >
          <nav aria-label={navLabel}>
            {navItems.map((item) => (
              <Link
                aria-current={isCurrentPage(item.href) ? "page" : undefined}
                className="flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-medium text-[#3e3a39] transition-colors hover:bg-[#F7F3ED] aria-[current=page]:bg-[#F7F3ED]"
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              aria-current={isCurrentPage(contactHref) ? "page" : undefined}
              className="mt-1 flex min-h-12 items-center rounded-xl bg-[#6bbc70] px-4 py-3 text-base font-semibold text-[#1f2d1f] transition-colors hover:bg-[#7dcc82]"
              href={contactHref}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>
          <div className="mt-2 border-t border-[#6A5748]/10 pt-2">
            <LanguageSwitcher compact label={languageLabel} locale={locale} onSelect={closeMenu} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
