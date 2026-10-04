import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { JoinUsSection } from "@/components/JoinUsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale, localePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type HomeProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { siteMeta } = getDictionary(lang);
  return createPageMetadata({
    locale: lang,
    pathname: "/",
    title:
      lang === "ja"
        ? "Youth GEO Japan | 好奇心を、まっすぐ未来へ。"
        : "Youth GEO Japan | Curiosity, straight into the future.",
    description: siteMeta.description,
  });
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { siteMeta, pages, activities } = getDictionary(lang);

  return (
    <>
      <HeroSection locale={lang} />

      <div className="bg-white py-10 sm:py-12">
        <div className="page-shell">
          <p className="mx-auto max-w-4xl text-lg leading-9 text-[#3e3a39]/80">{siteMeta.description}</p>
        </div>
      </div>

      <section className="section-pad bg-[#F7F3ED]">
        <div className="page-shell">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="WHY YOUTH GEO JAPAN?" title={pages.why.title} />
            <div className="mt-7 space-y-5 text-lg leading-9 text-[#3e3a39]/80">
              {pages.why.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="page-shell">
          <SectionHeading eyebrow="ACTIVITIES" title={pages.activityTitle} />
          <div className="mt-6 flex flex-wrap gap-2">
            {pages.activityTags.map((tag) => <span key={tag} className="rounded-full border border-[#6A5748]/10 bg-[#F7F3ED] px-3 py-1 text-base">{tag}</span>)}
          </div>
          <p className="mb-4 mt-9 text-xs font-semibold tracking-[0.16em] text-[#6A5748]">LATEST NEWS</p>
          <div className="grid gap-4">
            {activities.slice(0, 3).map((activity) => (
              <Link key={activity.title} className="card-hover flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8"
                href={localePath(lang, `/activities${activity.link?.startsWith("#") ? activity.link : ""}`)}>
                <span className="shrink-0 text-sm font-semibold text-[#6A5748]">{activity.date}</span>
                <div><h3 className="text-xl font-semibold">{activity.title} <span aria-hidden="true">→</span></h3>
                  <p className="mt-2 text-base leading-7 text-[#3e3a39]/76">{activity.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link className="btn-secondary mt-7" href={localePath(lang, "/activities")}>
            {pages.moreActivities} <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <JoinUsSection locale={lang} />
    </>
  );
}
