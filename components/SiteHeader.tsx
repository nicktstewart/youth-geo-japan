import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#6A5748]/10 bg-[#F7F3ED]/92 backdrop-blur">
      <div className="page-shell flex items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-[#3e3a39]"
          aria-label="Youth GEO Japan home"
        >
          <span className="relative size-11 overflow-hidden rounded-xl border border-[#6A5748]/15 bg-white shadow-sm">
            <Image
              src="/YGJ-logo-only.png"
              alt=""
              fill
              sizes="44px"
              className="object-contain p-1"
            />
          </span>
          <span>Youth GEO Japan</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#3e3a39]/78 transition hover:bg-white hover:text-[#3e3a39]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-full bg-[#6bbc70] px-5 py-2 text-sm font-semibold text-[#1f2d1f] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#7dcc82]"
          >
            Contact
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary
            className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-[#6A5748]/15 bg-white text-[#3e3a39] shadow-sm [&::-webkit-details-marker]:hidden"
            aria-label="Open navigation"
          >
            <span className="hamburger" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-[#6A5748]/10 bg-white p-2 shadow-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-[#3e3a39] hover:bg-[#F7F3ED]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-1 block rounded-xl bg-[#6bbc70] px-4 py-3 text-sm font-semibold text-[#1f2d1f]"
            >
              Contact
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
