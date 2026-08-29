import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNavigation } from "@/components/MobileNavigation";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const { navItems, ui } = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-[#6A5748]/10 bg-[#F7F3ED]/92 backdrop-blur">
      <div className="page-shell flex min-h-[4.25rem] items-center justify-between py-2.5 sm:py-3">
        <Link
          href={localePath(locale, "/")}
          className="flex min-w-0 items-center gap-2.5 font-semibold text-[#3e3a39] sm:gap-3"
          aria-label="Youth GEO Japan home"
        >
          <span className="relative size-11 overflow-hidden rounded-xl border border-[#6A5748]/15 bg-white shadow-sm">
            <Image
              src="/YGJ-logo-only.png"
              alt=""
              fill
              sizes="44px"
              className="object-contain p-1"
              loading="eager"
            />
          </span>
          <span className="truncate text-sm sm:text-base">Youth GEO Japan</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={ui.headerNavLabel}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#3e3a39]/78 transition hover:bg-white hover:text-[#3e3a39]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={localePath(locale, "/contact")}
            className="ml-2 rounded-full bg-[#6bbc70] px-5 py-2 text-sm font-semibold text-[#1f2d1f] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#7dcc82]"
          >
            Contact
          </Link>
          <div className="ml-2">
            <LanguageSwitcher locale={locale} label={ui.languageLabel} />
          </div>
        </nav>

        <MobileNavigation
          closeLabel={locale === "ja" ? "ナビゲーションを閉じる" : "Close navigation"}
          contactHref={localePath(locale, "/contact")}
          locale={locale}
          languageLabel={ui.languageLabel}
          navItems={navItems.map((item) => ({
            ...item,
            href: localePath(locale, item.href),
          }))}
          navLabel={ui.headerNavLabel}
          openLabel={ui.openNavigation}
        />
      </div>
    </header>
  );
}
