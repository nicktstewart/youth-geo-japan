import { getDictionary, type Locale } from "@/lib/i18n";

export function ContactCards({ locale }: { locale: Locale }) {
  const { contactInfo, ui } = getDictionary(locale);
  const content = ui.contactCards;

  return (
    <div className="grid max-w-5xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="card-soft flex flex-col bg-white">
        <p className="badge w-fit">Email contact</p>
        <h2 className="mt-5 text-2xl font-semibold text-[#3e3a39]">
          {content.emailTitle}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-8 text-[#3e3a39]/76">
          {content.emailBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-4 pt-7 sm:flex-row sm:items-center">
          <a className="btn-primary" href={`mailto:${contactInfo.email}`}>
            {content.emailButton}
          </a>
          <p className="text-sm font-semibold text-[#6A5748]">
            {contactInfo.email}
          </p>
        </div>
      </article>

      <article className="card-soft flex flex-col bg-[#EAF7EC]">
        <p className="badge w-fit">LINE open chat</p>
        <h2 className="mt-5 text-2xl font-semibold text-[#3e3a39]">
          {content.lineTitle}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-8 text-[#3e3a39]/76">
          {content.lineBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-auto pt-7">
          <a
            className="btn-line"
            href={contactInfo.lineOpenChatUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span>{content.lineButton}</span>
          </a>
        </div>
      </article>
    </div>
  );
}
