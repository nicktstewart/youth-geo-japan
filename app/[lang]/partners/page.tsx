import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PartnerOptionCard } from "@/components/PartnerOptionCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale, localePath } from "@/lib/i18n";

type PartnersPageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PartnersPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { partnerHeroCopy, siteMeta } = getDictionary(lang);
  return { title: `Partners | ${siteMeta.name}`, description: partnerHeroCopy };
}

export default async function PartnersPage({ params }: PartnersPageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { partnerAudiences, partnerHeroCopy, partnerOptions, ui } = getDictionary(lang);

  return (
    <>
      <section className="section-pad bg-[#F7F3ED]">
        <div className="page-shell grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Partners"
              as="h1"
              title={ui.partnersTitle}
              description={partnerHeroCopy}
            />
            <Link className="btn-primary mt-8" href={localePath(lang, "/contact")}>
              {ui.partnerContact}
            </Link>
          </div>
          <aside className="card-soft bg-white">
            <h2 className="text-xl font-semibold text-[#3e3a39]">{ui.audiences}</h2>
            <ul className="mt-5 space-y-4">
              {partnerAudiences.map((audience) => (
                <li key={audience} className="flex gap-3 text-base leading-7 text-[#3e3a39]/76">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#6bbc70]" />
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </aside>
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
