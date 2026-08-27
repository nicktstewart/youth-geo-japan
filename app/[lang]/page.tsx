import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApproachCards } from "@/components/ApproachCards";
import { HeroSection } from "@/components/HeroSection";
import { JoinUsSection } from "@/components/JoinUsSection";
import { MemberCards } from "@/components/MemberCards";
import { SectionHeading } from "@/components/SectionHeading";
import { StorySection } from "@/components/StorySection";
import { WhatWeDoCards } from "@/components/WhatWeDoCards";
import { getDictionary, hasLocale } from "@/lib/i18n";

type HomeProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { siteMeta } = getDictionary(lang);
  return { title: `${siteMeta.name} | ${siteMeta.tagline}`, description: siteMeta.description };
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { homeContent } = getDictionary(lang);

  return (
    <>
      <HeroSection locale={lang} />

      <section className="section-pad bg-white">
        <div className="page-shell">
          <article className="max-w-4xl">
            <SectionHeading
              eyebrow={homeContent.vision.eyebrow}
              title={homeContent.vision.title}
            />
            <div className="mt-7 space-y-4 border-l-2 border-[#6bbc70] pl-6 text-lg leading-9 text-[#3e3a39]/78 sm:pl-8">
              {homeContent.vision.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-pad bg-[#F7F3ED]">
        <div className="page-shell">
          <SectionHeading
            eyebrow={homeContent.approach.eyebrow}
            title={homeContent.approach.title}
          />
          <div className="mt-8">
            <ApproachCards locale={lang} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="page-shell">
          <SectionHeading
            eyebrow={homeContent.whatWeDo.eyebrow}
            title={homeContent.whatWeDo.title}
          />
          <div className="mt-8">
            <WhatWeDoCards locale={lang} />
          </div>
        </div>
      </section>

      <StorySection locale={lang} />
      <JoinUsSection locale={lang} />
      <MemberCards locale={lang} />
    </>
  );
}
