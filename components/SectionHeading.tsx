type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#6A5748]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold leading-tight text-[#34302F] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[#34302F]/72">{description}</p>
      ) : null}
    </div>
  );
}
