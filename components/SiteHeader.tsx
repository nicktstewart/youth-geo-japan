import Link from "next/link";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNavigation } from "@/components/MobileNavigation";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const { navItems, ui, pages } = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-[#6A5748]/10 bg-[#F7F3ED]/95 lg:bg-[#F7F3ED]/92 lg:backdrop-blur">
      <div className="page-shell flex min-h-[4.25rem] items-center justify-between py-2.5 sm:py-3">
        <Link
          href={localePath(locale, "/")}
          className="logo-link flex min-w-0 items-center gap-2.5 font-semibold text-[#3e3a39] sm:gap-3"
          aria-label="Youth GEO Japan home"
        >
          <span className="relative grid size-11 place-items-center overflow-hidden rounded-xl border border-[#6A5748]/15 bg-white shadow-sm">
            <AnimatedLogo className="size-full p-1" delay={0.1} />
          </span>
          <span className="truncate text-sm sm:text-base">Youth GEO Japan</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={ui.headerNavLabel}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="nav-link whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-[#3e3a39]/78 transition hover:bg-white hover:text-[#3e3a39]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={localePath(locale, "/join")}
            className="ml-2 rounded-full bg-[#6bbc70] px-5 py-2 text-sm font-semibold text-[#1f2d1f] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#7dcc82]"
          >
            {pages.joinLabel}
          </Link>
          <div className="ml-2">
            <LanguageSwitcher locale={locale} label={ui.languageLabel} />
          </div>
        </nav>

        <MobileNavigation
          closeLabel={locale === "ja" ? "ナビゲーションを閉じる" : "Close navigation"}
          joinHref={localePath(locale, "/join")}
          joinLabel={pages.joinLabel}
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
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
