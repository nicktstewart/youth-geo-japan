import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { pdfSupplementContent } from "@/lib/site-content";

export function JoinUsSection() {
  return (
    <section className="section-pad bg-[#F7F3ED]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <article className="card-soft overflow-hidden bg-white">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Join Us!!"
                title={`${pdfSupplementContent.join.title} ${pdfSupplementContent.join.subtitle}`}
              />
              <p className="mt-7 text-base leading-8 text-[#3e3a39]/78">
                {pdfSupplementContent.join.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-primary" href="/contact">
                  Contact
                </Link>
                <Link className="btn-secondary" href="/activities">
                  活動を見る
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#6bbc70]/25 bg-[#eaf7f0] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#6A5748]">
                Activities
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {pdfSupplementContent.activityTags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
