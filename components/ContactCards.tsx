import { contactInfo } from "@/lib/site-content";

export function ContactCards() {
  return (
    <article className="card-soft max-w-3xl bg-white">
      <p className="badge w-fit">External contact</p>
      <h2 className="mt-5 text-2xl font-black text-[#34302F]">
        取材・協力・問い合わせ
      </h2>
      <p className="mt-4 text-base leading-8 text-[#34302F]/76">
        社会人・企業・団体・教育機関など、外部の方からのお問い合わせはメールで受け付けています。
      </p>
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a className="btn-primary" href={`mailto:${contactInfo.email}`}>
          メールで問い合わせる
        </a>
        <p className="text-sm font-semibold text-[#6A5748]">{contactInfo.email}</p>
      </div>
    </article>
  );
}
