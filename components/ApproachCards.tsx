import { homeContent } from "@/lib/site-content";

export function ApproachCards() {
  return (
    <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
      <div className="card-soft flex min-h-64 items-center justify-center">
        <div className="cycle" aria-label="知る、考える、形にする、繋がるの循環">
          {["知る", "考える", "形にする", "繋がる"].map((label, index) => (
            <span key={label} className={`cycle-step cycle-step-${index + 1}`}>
              {label}
            </span>
          ))}
          <span className="cycle-core">GEO</span>
        </div>
      </div>
      <div className="grid gap-5">
        {homeContent.approach.items.map((item, index) => (
          <article key={item} className="card-soft">
            <span className="mb-4 inline-grid size-10 place-items-center rounded-full bg-[#a9dbee] text-sm font-black text-[#3e3a39]">
              {index + 1}
            </span>
            <p className="text-lg leading-8 text-[#3e3a39]">{item}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
