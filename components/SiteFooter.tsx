import Link from "next/link";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { contactInfo, navItems, siteMeta, ui } = getDictionary(locale);

  return (
    <footer className="border-t border-[#6A5748]/10 bg-[#3e3a39] text-white">
      <div className="page-shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="logo-link flex items-center gap-3" data-reveal="">
            <span className="relative grid size-12 place-items-center overflow-hidden rounded-xl bg-white/95">
              <AnimatedLogo className="size-full p-1" />
            </span>
            <p className="text-xl font-semibold">{siteMeta.name}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">
            {siteMeta.tagline}
          </p>
        </div>
        <nav className="grid gap-2 text-sm" aria-label={ui.footerNavLabel}>
          {navItems.filter((item) => ["/about", "/organization"].includes(item.href)).map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="flex min-h-11 items-center text-white/72 hover:text-white"
            >
              {item.href === "/organization" && locale === "ja" ? "Organization / 法人情報" : item.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm leading-7 text-white/72">
          <a className="inline-flex min-h-11 items-center hover:text-white" href={`mailto:${contactInfo.email}`}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
