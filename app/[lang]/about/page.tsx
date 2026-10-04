import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApproachCards } from "@/components/ApproachCards";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { pages } = getDictionary(lang);
  return createPageMetadata({ locale: lang, pathname: "/about", title: `${pages.about.title} | Youth GEO Japan`, description: pages.about.description });
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { pages, homeContent } = getDictionary(lang);
  return (
    <>
      <section className="section-pad bg-[#F7F3ED]"><div className="page-shell">
        <SectionHeading eyebrow="ABOUT US" title={pages.about.title} as="h1" />
      </div></section>
      <section className="bg-[#F7F3ED] pb-10 sm:pb-12 lg:pb-14">
        <div className="page-shell grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-12">
          <div className="lg:border-r lg:border-[#6A5748]/15 lg:pr-10">
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-[#6A5748]">WHY YOUTH GEO JAPAN?</p>
            <h2 className="max-w-xl text-2xl font-semibold leading-[1.5] tracking-[-0.025em] text-[#3e3a39] sm:text-3xl lg:text-[2rem] lg:text-balance">{pages.why.title}</h2>
          </div>
          <div className="space-y-4 text-base leading-[1.85] text-[#3e3a39]/80 sm:text-[1.0625rem]">
            {pages.why.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 1 ? "border-l-3 border-[#6bbc70] py-1 pl-4 font-semibold text-[#3e3a39]" : undefined}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white"><div className="page-shell">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="OUR STORY" title={pages.about.storyTitle} />
          <div className="mt-8 space-y-5 text-lg leading-9 text-[#3e3a39]/80">
            {homeContent.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div></section>
      <section className="section-pad bg-[#F7F3ED]"><div className="page-shell">
        <SectionHeading eyebrow="OUR APPROACH" title={homeContent.approach.title} />
        <div className="mt-7 max-w-4xl space-y-4 text-lg leading-9 text-[#3e3a39]/80">
          {pages.about.approachParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="mt-10"><ApproachCards locale={lang} /></div>
      </div></section>
    </>
  );
}
