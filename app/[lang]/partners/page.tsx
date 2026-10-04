import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartnerOptionCard } from "@/components/PartnerOptionCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type PartnersPageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PartnersPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { pages } = getDictionary(lang);
  return createPageMetadata({
    locale: lang,
    pathname: "/partners",
    title:
      lang === "ja"
        ? "企業・教育機関との協力 | 地理・GISと若者をつなぐ"
        : "Partnerships | Connecting Youth, Geography, and GIS",
    description: pages.partners.paragraphs.join(" "),
  });
}

export default async function PartnersPage({ params }: PartnersPageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { pages, contactInfo, partnerOptions, ui } = getDictionary(lang);

  return (
    <>
      <section className="section-pad bg-[#F7F3ED]">
        <div className="page-shell">
          <div>
            <SectionHeading
              eyebrow="Partners"
              as="h1"
              title={pages.partners.title}
            />
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#3e3a39]/78">
              {pages.partners.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <a className="btn-primary mt-8" href={`mailto:${contactInfo.email}`}>
              {ui.partnerContact}
            </a>
            <p className="mt-4"><a className="break-all text-[#6A5748] hover:underline" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="page-shell">
          <SectionHeading eyebrow="Collaboration" title={ui.collaborationMenu} />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {partnerOptions.map((option) => (
              <PartnerOptionCard key={option.title} {...option} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
