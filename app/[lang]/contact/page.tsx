import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCards } from "@/components/ContactCards";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, hasLocale } from "@/lib/i18n";

type ContactPageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { siteMeta, ui } = getDictionary(lang);
  return { title: `Contact | ${siteMeta.name}`, description: ui.contactDescription };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { ui } = getDictionary(lang);

  return (
    <section className="section-pad bg-[#F7F3ED]">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Contact"
          as="h1"
          title={ui.contactTitle}
          description={ui.contactDescription}
        />
        <div className="mt-8">
          <ContactCards locale={lang} />
        </div>
      </div>
    </section>
  );
}
