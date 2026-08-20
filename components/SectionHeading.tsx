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

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6A5748]">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl font-semibold leading-[1.35] tracking-[-0.02em] text-[#3e3a39] sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#3e3a39]/72">{description}</p>
      ) : null}
    </div>
  );
}
