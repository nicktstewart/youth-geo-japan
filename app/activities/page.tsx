import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { activities, siteMeta } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Activities | ${siteMeta.name}`,
  description: "Youth GEO Japanの活動実績・予定を掲載します。",
};

export default function ActivitiesPage() {
  return (
    <section className="section-pad bg-[#F7F3ED]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Activities"
          title="活動実績・予定"
          description="Youth GEO Japanの活動実績や予定を掲載します。"
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {activities.map((activity) => (
            <article key={activity.title} className="card-hover">
              <div className="map-placeholder mb-5 grid h-44 place-items-center rounded-2xl border border-[#6A5748]/10">
                <span className="rounded-full bg-white/82 px-4 py-2 text-sm font-bold text-[#6A5748]">
                  Youth GEO Japan
                </span>
              </div>
              {activity.date ? <span className="badge">{activity.date}</span> : null}
              <h2 className="mt-4 text-2xl font-black text-[#3e3a39]">{activity.title}</h2>
              <p className="mt-3 text-base leading-8 text-[#3e3a39]/76">
                {activity.description}
              </p>
              {activity.link ? (
                <a
                  className="mt-5 inline-flex font-bold text-[#6A5748] underline underline-offset-4"
                  href={activity.link}
                >
                  詳細を見る
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
