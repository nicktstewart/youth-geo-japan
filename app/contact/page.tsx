import type { Metadata } from "next";
import { ContactCards } from "@/components/ContactCards";
import { SectionHeading } from "@/components/SectionHeading";
import { siteMeta } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Contact | ${siteMeta.name}`,
  description:
    "Youth GEO Japanへの参加・協力・問い合わせ先を掲載しています。",
};

export default function ContactPage() {
  return (
    <section className="section-pad bg-[#F7F3ED]">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Contact"
          as="h1"
          title="参加・協力・問い合わせ"
          description="メンバーとして参加してみたい方も、外部から協力・取材・共同企画を相談したい方も、まずはお気軽にご連絡ください。"
        />
        <div className="mt-8">
          <ContactCards />
        </div>
      </div>
    </section>
  );
}
