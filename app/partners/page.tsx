import type { Metadata } from "next";
import Link from "next/link";
import { PartnerOptionCard } from "@/components/PartnerOptionCard";
import { SectionHeading } from "@/components/SectionHeading";
import { partnerAudiences, partnerHeroCopy, partnerOptions, siteMeta } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Partners | ${siteMeta.name}`,
  description: "Youth GEO Japanとの協力・協賛・共同企画に関するページです。",
};

export default function PartnersPage() {
  return (
    <>
      <section className="section-pad bg-[#F7F3ED]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Partners"
              title="地理への好奇心から、将来の道を描ける環境をともにつくる"
              description={partnerHeroCopy}
            />
            <Link className="btn-primary mt-8" href="/contact">
              協力について問い合わせる
            </Link>
          </div>
          <aside className="card-soft bg-white">
            <h2 className="text-xl font-black text-[#34302F]">対象者</h2>
            <ul className="mt-5 space-y-4">
              {partnerAudiences.map((audience) => (
                <li key={audience} className="flex gap-3 text-base leading-7 text-[#34302F]/76">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#6bbc70]" />
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Collaboration" title="協力メニュー" />
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
