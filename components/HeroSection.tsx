import { Fragment } from "react";
import Link from "next/link";
import { AnimatedBlob } from "@/components/AnimatedBlob";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { stagger } from "@/lib/motion";

export function HeroSection({ locale }: { locale: Locale }) {
  const { siteMeta, pages } = getDictionary(locale);
  const words = siteMeta.name.split(" ");

  return (
    <section className="hero relative overflow-hidden bg-[#F7F3ED]">
      <AnimatedBlob />
      <div className="page-shell relative grid items-center gap-2 py-8 sm:gap-6 sm:py-12 md:grid-cols-[1fr_0.75fr] md:gap-12 md:py-20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-[clamp(2rem,10.5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#3e3a39] sm:whitespace-nowrap sm:text-[clamp(2.15rem,5.5vw,4.5rem)]">
            {words.map((word, index) => (
              <Fragment key={word}>
                <span className="mask-line">
                  <span className="mask-word" style={stagger(index)}>{word}</span>
                </span>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>
          <p className="hero-tagline mt-5 text-xl font-medium leading-relaxed text-[#3e3a39]/90 sm:mt-6 sm:text-3xl">
            <span className="marker">{siteMeta.tagline}</span>
          </p>
          <div className="hero-cta mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link className="btn-primary btn-arrow" href={localePath(locale, "/join")}>
              {pages.joinLabel}
              <span className="btn-arrow-icon" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="relative min-h-[180px] sm:min-h-[300px] md:min-h-[340px]">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-logo-wrap absolute inset-4">
            <AnimatedLogo
              variant="hero"
              delay={0.15}
              title="Youth GEO Japan logo"
              className="hero-logo absolute inset-0 size-full overflow-visible"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
