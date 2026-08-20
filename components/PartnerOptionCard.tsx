type PartnerOptionCardProps = {
  title: string;
  description: string;
};

export function PartnerOptionCard({ title, description }: PartnerOptionCardProps) {
  return (
    <article className="card-hover bg-white">
      <h2 className="text-xl font-semibold text-[#3e3a39]">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[#3e3a39]/76">{description}</p>
    </article>
  );
}
