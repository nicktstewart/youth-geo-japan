import { contactInfo } from "@/lib/site-content";

export function ContactCards() {
  return (
    <div className="grid max-w-5xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="card-soft flex flex-col bg-white">
        <p className="badge w-fit">Email contact</p>
        <h2 className="mt-5 text-2xl font-black text-[#3e3a39]">
          参加・協力・問い合わせ
        </h2>
        <div className="mt-4 space-y-4 text-base leading-8 text-[#3e3a39]/76">
          <p>
            Youth GEO
            Japanで一緒に活動してみたい方、地理やGISに関心がありコミュニティの様子を知りたい方は、メールでお気軽にご連絡ください。
          </p>
          <p>
            取材・協力・協賛・共同企画など、社会人・企業・団体・教育機関の方からのお問い合わせも同じメールアドレスで受け付けています。
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-4 pt-7 sm:flex-row sm:items-center">
          <a className="btn-primary" href={`mailto:${contactInfo.email}`}>
            メールで問い合わせる
          </a>
          <p className="text-sm font-semibold text-[#6A5748]">
            {contactInfo.email}
          </p>
        </div>
      </article>

      <article className="card-soft flex flex-col bg-[#EAF7EC]">
        <p className="badge w-fit">LINE open chat</p>
        <h2 className="mt-5 text-2xl font-black text-[#3e3a39]">
          活動情報を受け取る
        </h2>
        <div className="mt-4 space-y-4 text-base leading-8 text-[#3e3a39]/76">
          <p>
            メンバーとして参加してみたい方や、まずは活動の雰囲気を知りたい方は、LINEオープンチャットから情報を受け取れます。
          </p>
          <p>
            地理やGISに関連するイベントのお知らせなど、Youth GEO
            Japanの新しい動きを気軽にチェックできます。
          </p>
        </div>
        <div className="mt-auto pt-7">
          <a
            className="btn-line"
            href={contactInfo.lineOpenChatUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span>LINEオープンチャットに参加する</span>
          </a>
        </div>
      </article>
    </div>
  );
}
