import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShare } from "@/components/ArticleShare";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale, localePath } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

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

  const announcement = lang === "ja" ? {
    title: "Podcast「GEO Meetup!」を公開しました！",
    lead: "Youth GEO Japanで、Podcast「GEO Meetup!」を始めました！地理が好きなメンバーの興味や経験を入り口に、いろいろな地理の話をお届けしていきます。第1回のテーマは「私たちはどうして地理が好きなのか」。地理に出会ったきっかけや、地理を学んだ先のキャリアについて語り合いました。",
    episode: "#01｜私たちはどうして地理が好きなのか",
    listen: "Podcastを聴く",
    read: "Podcastの話をnoteで読む",
    summary: "noteでは、Podcastで話したことを記事にまとめています。音声を聴く時間がない方も、話のポイントを文章で読めます。",
    noteLink: "noteで第1回の記事を読む",
    spotifyLink: "Spotifyで聴く", appleLink: "Apple Podcastsで聴く",
  } : {
    title: "Our GEO Meetup! podcast is now live!",
    lead: "We’ve started GEO Meetup!, Youth GEO Japan’s podcast! We’ll explore geography through our members’ interests and experiences. Episode 1 asks why we love geography, sharing how we discovered it and where studying it can lead in our careers.",
    episode: "#01 | Why do we love geography?",
    listen: "Listen to the podcast",
    read: "Read the conversation on note",
    summary: "We’ve written up the podcast conversation in a Japanese article on note. If you do not have time to listen, you can read the key points instead.",
    noteLink: "Read the episode 1 article on note (Japanese)",
    spotifyLink: "Listen on Spotify", appleLink: "Listen on Apple Podcasts",
  };

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
          <div className="rounded-[1.25rem] border border-[#6A5748]/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6A5748]">
              Activity archive
            </p>
            <h2 className="mt-2 text-lg font-semibold text-[#3e3a39]">{ui.articleList}</h2>
            <div className="mt-4 grid gap-2">
              <a href="#geo-meetup-launch" className="group flex items-center justify-between gap-4 rounded-xl bg-[#EAF7EC] px-4 py-3 transition hover:bg-[#ddf0df]">
                <span className="text-sm font-medium text-[#3e3a39]">{announcement.title}</span>
                <span aria-hidden="true" className="text-lg text-[#6A5748]">→</span>
              </a>
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

      <section id="geo-meetup-launch" className="section-pad scroll-mt-24 bg-white">
        <article className="page-shell">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6A5748]">Podcast &amp; note</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#3e3a39] sm:text-4xl">{announcement.title}</h2>
            <ArticleShare title={announcement.title} href={`${localePath(lang, "/activities")}#geo-meetup-launch`} locale={lang} />
            <p className="mt-6 text-base leading-8 text-[#3e3a39]/76">{announcement.lead}</p>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
            <section className="min-w-0" aria-labelledby="podcast-listen">
              <h3 id="podcast-listen" className="text-xl font-semibold text-[#3e3a39]">{announcement.listen}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6A5748]">{announcement.episode}</p>
              <iframe
                className="mt-5 w-full rounded-xl border-0"
                src="https://open.spotify.com/embed/episode/4POThApspZGp1tzryDtwWi"
                title={`GEO Meetup! — ${announcement.episode}`}
                height="232"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#6A5748]">
                <a className="underline underline-offset-4" href="https://open.spotify.com/episode/4POThApspZGp1tzryDtwWi">{announcement.spotifyLink} <span aria-hidden="true">↗</span></a>
                <a className="underline underline-offset-4" href="https://podcasts.apple.com/us/podcast/geo-meetup/id6819559320">{announcement.appleLink} <span aria-hidden="true">↗</span></a>
              </div>
            </section>
            <section className="border-t border-[#6A5748]/20 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0" aria-labelledby="podcast-summary">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6A5748]">note</p>
              <h3 id="podcast-summary" className="mt-3 text-xl font-semibold text-[#3e3a39]">{announcement.read}</h3>
              <p className="mt-4 text-base leading-8 text-[#3e3a39]/76">{announcement.summary}</p>
              <a className="mt-5 inline-block text-sm font-semibold leading-7 text-[#6A5748] underline underline-offset-4" href="https://note.com/youth_geo_japan/n/nec7677d1cb59">{announcement.noteLink} <span aria-hidden="true">↗</span></a>
            </section>
          </div>
        </article>
      </section>

      {newsletters.map((newsletter) => (
      <section className="section-pad mt-4 scroll-mt-24 border-t-8 border-[#e6ded2] bg-white sm:mt-6" id={`newsletter-${newsletter.issue.replace(".", "-")}`} key={newsletter.issue}>
        <div className="page-shell">
          <article className="mx-auto min-w-0 max-w-4xl">
            <header className="border-b border-[#6A5748]/12 pb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6A5748]">
                Newsletter · {newsletter.issue}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#3e3a39] sm:text-4xl">
                {newsletter.title}
              </h2>
              <ArticleShare title={newsletter.title} href={`${localePath(lang, "/activities")}#newsletter-${newsletter.issue.replace(".", "-")}`} locale={lang} />
              <div className="mt-6 space-y-3 text-base leading-8 text-[#3e3a39]/76">
                {newsletter.lead.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </header>

            <div className="divide-y divide-[#6A5748]/12">
              {newsletter.topics.map((topic, index) => (
                <section
                  className="grid scroll-mt-24 gap-5 py-9 sm:grid-cols-[3rem_minmax(0,1fr)]"
                  id={newsletter.issue === "2026.08" ? `topic-${index + 1}` : `topic-${newsletter.issue}-${index + 1}`}
                  key={topic.title}
                >
                  <span className="grid size-10 place-items-center rounded-full bg-[#F7F3ED] text-sm font-medium text-[#6A5748]">
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

            <section className="mt-2 rounded-[1.25rem] bg-[#EAF7EC] p-6 sm:p-8">
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
            ) : (
              <Link className="btn-primary mt-8" href={localePath(lang, "/join")}>{ui.joinActivities}</Link>
            )}
          </article>

        </div>
      </section>
      ))}
    </>
  );
}
