import type { Metadata } from "next";
import Link from "next/link";
import { MemberCards } from "@/components/MemberCards";
import { SectionHeading } from "@/components/SectionHeading";
import {
  contactInfo,
  homeContent,
  pdfSupplementContent,
  siteMeta,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Join Us!! | ${siteMeta.name}`,
  description:
    "Youth GEO Japanで一緒に活動してくれるメンバーを募集しています。",
};

export default function JoinUsPage() {
  return (
    <>
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
              <a className="btn-primary" href={`mailto:${contactInfo.email}`}>
                参加についてメールする
              </a>
              <Link className="btn-secondary" href="/activities">
                活動を見る
              </Link>
            </div>
          </div>

          <aside className="card-soft border-[#6bbc70]/35 bg-[#eaf7f0]">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#6A5748]">
              Member recruiting
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#34302F]">
              {pdfSupplementContent.join.title}
              <br />
              {pdfSupplementContent.join.subtitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-[#34302F]/76">
              {pdfSupplementContent.join.body}
            </p>
          </aside>
        </div>
      </section>

      <MemberCards />
    </>
  );
}
