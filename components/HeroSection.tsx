import Link from "next/link";
import Image from "next/image";
import { AnimatedBlob } from "@/components/AnimatedBlob";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function HeroSection({ locale }: { locale: Locale }) {
  const { siteMeta, ui } = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-[#F7F3ED]">
      <AnimatedBlob />
      <div className="page-shell relative grid min-h-[calc(100svh-68px)] items-center gap-12 py-16 md:grid-cols-[1fr_0.92fr] md:py-20">
        <div className="fade-up max-w-2xl">
          <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6A5748] shadow-sm">
            Youth network for geography and GIS
          </p>
          <h1 className="whitespace-nowrap text-[clamp(2.15rem,5.5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#3e3a39]">
            {siteMeta.name}
          </h1>
          <p className="mt-6 text-2xl font-medium leading-relaxed text-[#3e3a39]/82 sm:text-3xl">
            {siteMeta.tagline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" href={localePath(locale, "/contact")}>
              Contact
            </Link>
            <Link className="btn-secondary" href={localePath(locale, "/activities")}>
              {ui.viewActivities}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[340px]">
          <div className="absolute inset-4">
            <Image
              src="/YGJ-logo-only.png"
              alt="Youth GEO Japan logo"
              fill
              sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) 44vw, 440px"
              className="object-contain drop-shadow-[0_18px_30px_rgb(106_87_72_/_0.12)]"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
