import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent, pdfSupplementContent } from "@/lib/site-content";

export function JoinUsSection() {
  return (
    <section className="section-pad bg-[#F7F3ED]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="card-soft bg-white">
          <SectionHeading
            eyebrow={homeContent.community.eyebrow}
            title={homeContent.community.title}
          />
          <div className="mt-7 space-y-4 text-base leading-8 text-[#34302F]/78">
            {homeContent.community.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" href="/join-us">
              Join Us!!
            </Link>
            <Link className="btn-secondary" href="/activities">
              活動を見る
            </Link>
          </div>
        </div>
        <aside className="card-soft border-[#6bbc70]/35 bg-[#eaf7f0]">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#6A5748]">
            Member recruiting
          </p>
          <h3 className="mt-3 text-3xl font-black leading-tight text-[#34302F]">
            {pdfSupplementContent.join.title}
            <br />
            {pdfSupplementContent.join.subtitle}
          </h3>
          <p className="mt-5 text-base leading-8 text-[#34302F]/76">
            {pdfSupplementContent.join.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {pdfSupplementContent.activityTags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
