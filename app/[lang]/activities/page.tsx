import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale, localePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { stagger } from "@/lib/motion";

type ActivitiesPageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: ActivitiesPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { ui } = getDictionary(lang);
  return createPageMetadata({
    locale: lang,
    pathname: "/activities",
    title:
      lang === "ja"
        ? "活動・ニュースレター | 地理・GISの学びと交流"
        : "Activities & Newsletter | Geography and GIS Learning",
    description: ui.activitiesPageDescription,
  });
}

export default async function ActivitiesPage({ params }: ActivitiesPageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { activities, newsletters, ui } = getDictionary(lang);

  return (
    <>
      <section className="section-pad bg-[#F7F3ED]">
        <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <SectionHeading
            eyebrow="Activities"
            title={ui.activitiesPageTitle}
            description={ui.activitiesPageDescription}
            as="h1"
          />
          <div className="heading-intro-card rounded-[1.25rem] border border-[#6A5748]/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6A5748]">
              Newsletter archive
            </p>
            <h2 className="mt-2 text-lg font-semibold text-[#3e3a39]">{ui.articleList}</h2>
            <div className="mt-4 grid gap-2">
              {activities.map((activity) =>
                activity.link ? (
                  <a
                    className="group flex items-center justify-between gap-4 rounded-xl bg-[#F7F3ED] px-4 py-3 transition hover:bg-[#EAF7EC]"
                    href={activity.link}
                    key={activity.title}
                  >
                    <span>
                      <span className="block text-xs text-[#6A5748]">{activity.date}</span>
                      <span className="mt-1 block text-sm font-medium text-[#3e3a39]">
                        {activity.title}
                      </span>
                    </span>
                    <span
                      className="text-lg text-[#6A5748] transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>

      {newsletters.map((newsletter) => (
      <section className="section-pad scroll-mt-24 bg-white" id={`newsletter-${newsletter.issue.replace(".", "-")}`} key={newsletter.issue}>
        <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <article className="min-w-0">
            <header data-reveal="" className="border-b border-[#6A5748]/12 pb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6A5748]">
                Newsletter · {newsletter.issue}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#3e3a39] sm:text-4xl">
                {newsletter.title}
              </h2>
              <div className="mt-6 space-y-3 text-base leading-8 text-[#3e3a39]/76">
                {newsletter.lead.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </header>

            <div className="divide-y divide-[#6A5748]/12">
              {newsletter.topics.map((topic, index) => (
                <section
                  data-reveal=""
                  className="grid scroll-mt-24 gap-5 py-9 sm:grid-cols-[3rem_minmax(0,1fr)]"
                  id={newsletter.issue === "2026.08" ? `topic-${index + 1}` : `topic-${newsletter.issue}-${index + 1}`}
                  key={topic.title}
                >
                  <span className="topic-num grid size-10 place-items-center rounded-full bg-[#F7F3ED] text-sm font-medium text-[#6A5748]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold leading-8 text-[#3e3a39] sm:text-2xl">
                      {topic.title}
                    </h3>
                    <div className="mt-4 space-y-3 text-base leading-8 text-[#3e3a39]/76">
                      {topic.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {topic.link ? (
                      <Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#6A5748] underline underline-offset-4" href={localePath(lang, topic.link.href)}>
                        {topic.link.label} <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                    {topic.items ? (
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {topic.items.map((item) => (
                          <li
                            className="flex gap-3 rounded-xl bg-[#F7F3ED] px-4 py-3 text-sm leading-6 text-[#3e3a39]/76"
                            key={item}
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#6bbc70]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            <section data-reveal="" className="mt-2 rounded-[1.25rem] bg-[#EAF7EC] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6A5748]">
                Coming up
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#3e3a39]">
                {ui.upcoming}
              </h3>
              <ul className="mt-5 grid gap-3">
                {newsletter.upcoming.map((item) => (
                  <li className="flex items-center gap-3 text-base text-[#3e3a39]/78" key={item}>
                    <span className="size-2 shrink-0 rounded-full bg-[#6bbc70]" />
                    {item}
                  </li>
                ))}
              </ul>
              {newsletter.upcomingNote ? <p className="mt-5 text-base leading-8 text-[#3e3a39]/76">{newsletter.upcomingNote}</p> : null}
            </section>
            {newsletter.closing ? (
              <div className="mt-8 space-y-3 text-base leading-8 text-[#3e3a39]/76">
                {newsletter.closing.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <Link className="btn-secondary mt-3" href={localePath(lang, "/join")}>{ui.joinActivities}</Link>
              </div>
            ) : null}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal="" className="rounded-[1.25rem] border border-[#6A5748]/10 bg-[#F7F3ED] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6A5748]">
                In this issue
              </p>
              <nav className="mt-4 grid gap-1" aria-label={`${newsletter.issue} · ${ui.issueContents}`}>
                {newsletter.topics.map((topic, index) => (
                  <a
                    className="rounded-lg px-3 py-2 text-sm leading-6 text-[#3e3a39]/72 transition hover:bg-white hover:text-[#3e3a39]"
                    href={newsletter.issue === "2026.08" ? `#topic-${index + 1}` : `#topic-${newsletter.issue}-${index + 1}`}
                    key={topic.title}
                  >
                    {index + 1}. {topic.title}
                  </a>
                ))}
              </nav>
            </div>
            <Link data-reveal="" style={stagger(1)} className="btn-primary mt-5 w-full" href={localePath(lang, "/join")}>
              {ui.joinActivities}
            </Link>
          </aside>
        </div>
      </section>
      ))}
    </>
  );
}
