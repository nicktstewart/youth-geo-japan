"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

export function LanguageSwitcher({
  locale,
  label,
  compact = false,
  onSelect,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  function selectLocale(nextLocale: Locale) {
    if (nextLocale !== locale) {
      // A client-side cookie write preserves the preference without delaying navigation
      // on a locale API request. The locale route itself remains a normal Next.js link.
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `ygj_locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    }
    onSelect?.();
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
          onClick={() => selectLocale(value)}
          replace
        >
          {value === "ja" ? "日本語" : "English"}
        </Link>
      ))}
    </nav>
  );
}
