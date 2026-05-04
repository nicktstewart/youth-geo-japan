import type { Metadata } from "next";
import { ApproachCards } from "@/components/ApproachCards";
import { HeroSection } from "@/components/HeroSection";
import { JoinUsSection } from "@/components/JoinUsSection";
import { MemberCards } from "@/components/MemberCards";
import { SectionHeading } from "@/components/SectionHeading";
import { StorySection } from "@/components/StorySection";
import { WhatWeDoCards } from "@/components/WhatWeDoCards";
import { homeContent, siteMeta } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `${siteMeta.name} | ${siteMeta.tagline}`,
  description: siteMeta.description,
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <article className="card-soft mx-auto max-w-4xl bg-[#F7F3ED]">
            <SectionHeading
              eyebrow={homeContent.vision.eyebrow}
              title={homeContent.vision.title}
            />
            <div className="mt-7 space-y-4 text-lg leading-9 text-[#34302F]/78">
              {homeContent.vision.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-pad bg-[#F7F3ED]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={homeContent.approach.eyebrow}
            title={homeContent.approach.title}
          />
          <div className="mt-8">
            <ApproachCards />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={homeContent.whatWeDo.eyebrow}
            title={homeContent.whatWeDo.title}
          />
          <div className="mt-8">
            <WhatWeDoCards />
          </div>
        </div>
      </section>

      <StorySection />
      <JoinUsSection />
      <MemberCards />
    </>
  );
}
