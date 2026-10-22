import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { hasLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const content = {
  ja: {
    title: "特定商取引法に基づく表記",
    description: "Youth GEO Japanの事業者情報、イベント・サービスの販売価格、お支払い、提供時期、キャンセル・返金について。",
    rows: [
      ["事業者名", "一般社団法人Youth GEO Japan"],
      ["運営責任者", "代表理事 矢野由佳"],
      ["所在地", "〒150-0043 東京都渋谷区道玄坂1-16-6 二葉ビル8b"],
      ["お問い合わせ先", "contact@youthgeojp.com"],
      ["販売価格", "各イベント・サービスの申込ページに記載"],
      ["販売価格以外の必要料金", "決済方法により手数料が発生する場合があります。詳細は各申込ページをご確認ください。"],
      ["支払方法・時期", "各イベント・サービスの申込ページに記載"],
      ["サービス提供時期・申込期限", "各イベント・サービスの申込ページに記載"],
      ["キャンセル・返金", "各イベント・サービスの申込ページに記載の条件に従います。"],
    ],
  },
  en: {
    title: "Disclosure under the Act on Specified Commercial Transactions",
    description: "Youth GEO Japan’s business information, event and service prices, payment terms, service delivery, cancellations and refunds.",
    rows: [
      ["Business name", "General Incorporated Association Youth GEO Japan"],
      ["Responsible representative", "Representative Director Yuka Yano"],
      ["Address", "Futaba Building 8b, 1-16-6 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan"],
      ["Contact", "contact@youthgeojp.com"],
      ["Prices", "Listed on the registration page for each event or service."],
      ["Additional charges", "Fees may apply depending on the payment method. Please refer to the relevant registration page for details."],
      ["Payment methods and timing", "Listed on the registration page for each event or service."],
      ["Service delivery and registration deadlines", "Listed on the registration page for each event or service."],
      ["Cancellations and refunds", "Subject to the terms stated on the registration page for each event or service."],
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const copy = content[lang];
  return {
    ...createPageMetadata({ locale: lang, pathname: "/legal", title: `${copy.title} | Youth GEO Japan`, description: copy.description }),
  };
}

export default async function LegalPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const copy = content[lang];
  return (
    <section className="section-pad bg-[#F7F3ED]">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="LEGAL INFORMATION" title={copy.title} as="h1" />
          <dl className="mt-10 divide-y divide-[#6A5748]/15 border-y border-[#6A5748]/20 sm:mt-14">
            {copy.rows.map(([label, value]) => (
              <div key={label} className="grid gap-2 py-6 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8">
                <dt className="text-sm font-semibold leading-7">{label}</dt>
                <dd className="text-base leading-8 text-[#3e3a39]/80">
                  {value === "contact@youthgeojp.com" ? <a className="break-all underline decoration-[#6A5748]/40 underline-offset-4 hover:decoration-current" href={`mailto:${value}`}>{value}</a> : value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
