import type { Metadata } from "next";
import { ContactCards } from "@/components/ContactCards";
import { SectionHeading } from "@/components/SectionHeading";
import { siteMeta } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Contact | ${siteMeta.name}`,
  description: "Youth GEO Japanへの外部問い合わせ先を掲載しています。",
};

export default function ContactPage() {
  return (
    <section className="section-pad bg-[#F7F3ED]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="外部問い合わせ"
          description="取材・協力・協賛・共同企画など、外部の方からのお問い合わせはメールで受け付けています。"
        />
        <div className="mt-8">
          <ContactCards />
        </div>
      </div>
    </section>
  );
}
