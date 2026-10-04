import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { pages } = getDictionary(lang);
  return createPageMetadata({ locale: lang, pathname: "/join", title: pages.join.title, description: pages.join.description });
}

export default async function JoinPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { pages, contactInfo } = getDictionary(lang);
  const content = pages.join;
  return (
    <>
      <section className="section-pad bg-[#F7F3ED]"><div className="page-shell">
        <SectionHeading eyebrow="JOIN US" title={content.title} as="h1" />
        <div className="mt-6 space-y-2 text-lg leading-8 text-[#3e3a39]/78">
          {content.lead.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div></section>
      <section className="section-pad bg-white"><div className="page-shell grid gap-6 md:grid-cols-2">
        <article className="card-soft flex flex-col">
          <SectionHeading eyebrow="DISCORD" title={content.discordTitle} />
          <div className="mt-6 space-y-4 text-base leading-8 text-[#3e3a39]/76">
            {content.discordBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-7"><a className="btn-primary" href={contactInfo.discordInviteUrl} target="_blank" rel="noopener noreferrer">{content.discordButton}</a></div>
        </article>
        <article className="card-soft flex flex-col">
          <SectionHeading eyebrow="LINE OPENCHAT" title={content.lineTitle} />
          <div className="mt-6 space-y-4 text-base leading-8 text-[#3e3a39]/76">
            {content.lineBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-7"><a className="btn-primary" href={contactInfo.lineOpenChatUrl} target="_blank" rel="noopener noreferrer">{content.lineButton}</a></div>
          <Image className="mt-6 rounded-xl bg-white p-2" src={contactInfo.lineQrImage} width={180} height={180} unoptimized alt={content.qrAlt} />
        </article>
      </div></section>
    </>
  );
}
