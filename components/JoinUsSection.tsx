import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function JoinUsSection({ locale }: { locale: Locale }) {
  const { pdfSupplementContent, pages } = getDictionary(locale);

  return (
    <section className="section-pad bg-[#F7F3ED]">
      <div className="page-shell">
        <article className="card-soft overflow-hidden bg-white">
          <div className="max-w-4xl">
            <div>
              <SectionHeading
                eyebrow="JOIN US"
                title={pdfSupplementContent.join.title}
              />
              <h3 className="mt-5 text-xl font-semibold text-[#6A5748]">{pdfSupplementContent.join.subtitle}</h3>
              <p className="mt-7 text-base leading-8 text-[#3e3a39]/78">
                {pdfSupplementContent.join.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-primary" href={localePath(locale, "/join")}>
                  {pages.joinLabel}
                </Link>
              </div>
            </div>

          </div>
        </article>
      </div>
    </section>
  );
}
