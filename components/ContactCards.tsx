import { contactInfo } from "@/lib/site-content";

export function ContactCards() {
  return (
    <article className="card-soft max-w-4xl bg-white">
      <p className="badge w-fit">Email contact</p>
      <h2 className="mt-5 text-2xl font-black text-[#34302F]">
        参加・協力・問い合わせ
      </h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-[#34302F]/76">
        <p>
          Youth GEO Japanで一緒に活動してみたい方、地理やGISに関心がありコミュニティの様子を知りたい方は、メールでお気軽にご連絡ください。
        </p>
        <p>
          取材・協力・協賛・共同企画など、社会人・企業・団体・教育機関の方からのお問い合わせも同じメールアドレスで受け付けています。
        </p>
      </div>
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a className="btn-primary" href={`mailto:${contactInfo.email}`}>
          メールで問い合わせる
        </a>
        <p className="text-sm font-semibold text-[#6A5748]">{contactInfo.email}</p>
      </div>
    </article>
  );
}
