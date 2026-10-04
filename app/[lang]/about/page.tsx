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
