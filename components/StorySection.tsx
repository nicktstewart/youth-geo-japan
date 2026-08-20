import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/lib/site-content";

export function StorySection() {
  const finalParagraph = homeContent.story.paragraphs.at(-1);
  const paragraphs = homeContent.story.paragraphs.slice(0, -1);

  return (
    <section className="section-pad relative overflow-hidden bg-white">
      <div className="contour-pattern absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={homeContent.story.title} />
        <div className="mt-8 space-y-5 text-lg leading-9 text-[#3e3a39]/80">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {finalParagraph ? (
          <p className="mt-8 rounded-2xl border border-[#6A5748]/10 bg-[#F7F3ED] p-6 text-xl font-semibold leading-9 text-[#3e3a39] shadow-sm">
            {finalParagraph}
          </p>
        ) : null}
      </div>
    </section>
  );
}
