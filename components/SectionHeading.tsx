type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  // Page titles animate on load; section titles animate as they scroll into view.
  const motion = as === "h1" ? "heading-intro" : "heading-reveal";

  return (
    <div
      className={`${motion} ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
      data-reveal={as === "h1" ? undefined : ""}
    >
      {eyebrow ? (
        <p className="eyebrow mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6A5748]">
          <span className="eyebrow-bar" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl font-semibold leading-[1.35] tracking-[-0.02em] text-[#3e3a39] sm:text-4xl">
        <span className="mask-line">
          <span className="mask-word">{title}</span>
        </span>
      </Heading>
      {description ? (
        <p className="heading-desc mt-5 max-w-2xl text-base leading-8 text-[#3e3a39]/72">{description}</p>
      ) : null}
    </div>
  );
}
