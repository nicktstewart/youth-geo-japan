"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  compact?: boolean;
};

export function LanguageSwitcher({ locale, label, compact = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function switchLocale(nextLocale: Locale) {
    const response = await fetch("/api/locale", {
      body: JSON.stringify({ locale: nextLocale }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) return;

    const basePath = pathname.replace(/^\/(ja|en)(?=\/|$)/, "") || "/";
    const destination =
      nextLocale === "en"
        ? basePath === "/"
          ? "/en"
          : `/en${basePath}`
        : basePath;

    router.push(destination);
    router.refresh();
  }

  return (
    <div
      className={`inline-flex rounded-full border border-[#6A5748]/15 bg-white p-1 ${compact ? "w-full" : ""}`}
      aria-label={label}
      role="group"
    >
      {(["ja", "en"] as const).map((value) => (
        <button
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
            locale === value
              ? "bg-[#3e3a39] text-white"
              : "text-[#3e3a39]/65 hover:bg-[#F7F3ED] hover:text-[#3e3a39]"
          } ${compact ? "flex-1" : ""}`}
          key={value}
          onClick={() => void switchLocale(value)}
          type="button"
          aria-pressed={locale === value}
        >
          {value === "ja" ? "日本語" : "English"}
        </button>
      ))}
    </div>
  );
}
