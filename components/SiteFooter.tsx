import Link from "next/link";
import Image from "next/image";
import { contactInfo, navItems, siteMeta } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#6A5748]/10 bg-[#3e3a39] text-white">
      <div className="page-shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative size-12 overflow-hidden rounded-xl bg-white/95">
              <Image
                src="/YGJ-logo-only.png"
                alt=""
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </span>
            <p className="text-xl font-semibold">{siteMeta.name}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">
            {siteMeta.tagline}
          </p>
        </div>
        <nav className="grid gap-2 text-sm" aria-label="Footer navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-white/72 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm leading-7 text-white/72">
          <p>Contact</p>
          <a className="hover:text-white" href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
