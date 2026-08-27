import { getDictionary, type Locale } from "@/lib/i18n";

export function MemberCards({ locale }: { locale: Locale }) {
  const { pdfSupplementContent } = getDictionary(locale);

  return (
    <section className="section-pad bg-white">
      <div className="page-shell">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#3e3a39]">
          {pdfSupplementContent.members.title}
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {pdfSupplementContent.members.items.map((item) => (
            <article key={item} className="rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED] p-5">
              <p className="text-base leading-8 text-[#3e3a39]/78">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
