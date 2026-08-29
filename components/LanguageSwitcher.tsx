"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  compact?: boolean;
  onSelect?: () => void;
};

function localeDestination(pathname: string, locale: Locale) {
  const basePath = pathname.replace(/^\/(ja|en)(?=\/|$)/, "") || "/";

  if (locale === "ja") return basePath;
  return basePath === "/" ? "/en" : `/en${basePath}`;
}

function explicitLocaleDestination(pathname: string, locale: Locale) {
  const basePath = pathname.replace(/^\/(ja|en)(?=\/|$)/, "") || "/";
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function LanguageSwitcher({
  locale,
  label,
  compact = false,
  onSelect,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  async function selectLocale(event: MouseEvent<HTMLAnchorElement>, nextLocale: Locale) {
    onSelect?.();

    if (nextLocale === locale) return;

    event.preventDefault();
    const destination = localeDestination(pathname, nextLocale);

    try {
      const response = await fetch("/api/locale", {
        body: JSON.stringify({ locale: nextLocale }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to save locale preference");

      // A document navigation avoids reusing a route that Next.js prefetched with
      // the previous locale cookie. Japanese keeps its canonical, unprefixed URL.
      window.location.replace(destination);
    } catch {
      // The explicit locale route still shows the requested language if preference
      // persistence is temporarily unavailable.
      window.location.replace(explicitLocaleDestination(pathname, nextLocale));
    }
  }

  return (
    <nav
      className={`inline-flex rounded-full border border-[#6A5748]/15 bg-white p-1 ${compact ? "w-full" : ""}`}
      aria-label={label}
    >
      {(["ja", "en"] as const).map((value) => (
        <Link
          aria-current={locale === value ? "page" : undefined}
          className={`inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            locale === value
              ? "bg-[#3e3a39] text-white"
              : "text-[#3e3a39]/65 hover:bg-[#F7F3ED] hover:text-[#3e3a39]"
          } ${compact ? "min-h-11 flex-1" : "min-h-10"}`}
          href={value === locale ? pathname : localeDestination(pathname, value)}
          hrefLang={value}
          key={value}
          lang={value}
          onClick={(event) => void selectLocale(event, value)}
          prefetch={false}
          replace
        >
          {value === "ja" ? "日本語" : "English"}
        </Link>
      ))}
    </nav>
  );
}
