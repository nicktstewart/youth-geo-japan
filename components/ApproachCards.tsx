import { getDictionary, type Locale } from "@/lib/i18n";

export function ApproachCards({ locale }: { locale: Locale }) {
  const { homeContent, pages, ui } = getDictionary(locale);

  return (
    <div className="approach-loop" role="group" aria-label={ui.approachCycleLabel}>
      {homeContent.whatWeDo.cards.map((card, index) => (
        <article key={card.title} className={`card-soft approach-node approach-node-${index + 1}`}>
          <h3 className="text-2xl font-semibold">{card.title}</h3>
          <p className="mt-2 font-medium text-[#6A5748]">{card.subtitle.replace(/^ー/, "")}</p>
          <p className="mt-5 text-base leading-8 text-[#3e3a39]/76">{index === 1 ? pages.about.thinkDescription : card.description}</p>
        </article>
      ))}
    </div>
  );
}
