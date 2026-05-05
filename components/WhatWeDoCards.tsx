import { homeContent } from "@/lib/site-content";

const icons = ["✦", "◎", "▣", "⌁"];
const colors = ["#a9dbee", "#f8d478", "#6bbc70", "#FFFFFF"];

export function WhatWeDoCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {homeContent.whatWeDo.cards.map((card, index) => (
        <article key={card.title} className="card-hover group">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-[#3e3a39]">{card.title}</h3>
              <p className="mt-2 font-semibold text-[#6A5748]">{card.subtitle}</p>
            </div>
            <span
              className="grid size-12 shrink-0 place-items-center rounded-full border border-[#6A5748]/10 text-xl"
              style={{ backgroundColor: colors[index] }}
              aria-hidden="true"
            >
              {icons[index]}
            </span>
          </div>
          <p className="mt-6 text-base leading-8 text-[#3e3a39]/76">{card.description}</p>
        </article>
      ))}
    </div>
  );
}
