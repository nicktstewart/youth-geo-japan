import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { organizationInfo } from "@/lib/site-content";
import { createPageMetadata } from "@/lib/seo";
import { stagger } from "@/lib/motion";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { pages } = getDictionary(lang);
  return createPageMetadata({ locale: lang, pathname: "/organization", title: `${pages.organization.title} | Youth GEO Japan`, description: pages.organization.description });
}

export default async function OrganizationPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { pages, contactInfo } = getDictionary(lang);
  const content = pages.organization;
  const rows = [
    { label: content.labels.name, value: content.legalName },
    { label: content.labels.founded, value: <time dateTime={organizationInfo.foundingDate}>{content.foundingDate}</time> },
    { label: content.labels.address, value: <>{lang === "ja" ? "〒" : ""}{organizationInfo.postalCode}<br />{content.address}</> },
    { label: content.labels.representative, value: content.representative },
    { label: content.labels.business, value: <ul className="list-disc space-y-2 pl-5">{content.businesses.map((business) => <li key={business}>{business}</li>)}</ul> },
    { label: content.labels.contact, value: <a className="break-all hover:underline" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> },
  ];
  return (
    <>
      <section className="section-pad bg-[#F7F3ED]"><div className="page-shell">
        <SectionHeading eyebrow="ORGANIZATION" title={content.title} as="h1" />
      </div></section>
      <section className="section-pad bg-[#F7F3ED]"><div className="page-shell">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="CORPORATE PROFILE" title={content.profileTitle} />
          <dl className="mt-8 divide-y divide-[#6A5748]/15">
            {rows.map((row, index) => <div data-reveal="" style={stagger(index)} className="grid gap-2 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6" key={row.label}>
              <dt className="font-semibold">{row.label}</dt><dd className="text-base leading-8 text-[#3e3a39]/78">{row.value}</dd>
            </div>)}
          </dl>
        </div>
      </div></section>
      <section className="section-pad bg-white"><div className="page-shell">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="MESSAGE" title={content.messageTitle} />
          <h3 data-reveal="" className="mt-7 text-2xl font-semibold leading-9">{content.messageHeading}</h3>
          <div data-reveal="" className="mt-7 space-y-5 text-lg leading-9 text-[#3e3a39]/80">
            {content.messageParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="mt-8 text-right font-medium">{content.representative}</p>
        </div>
      </div></section>
    </>
  );
}
