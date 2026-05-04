type PartnerOptionCardProps = {
  title: string;
  description: string;
};

export function PartnerOptionCard({ title, description }: PartnerOptionCardProps) {
  return (
    <article className="card-hover bg-white">
      <h2 className="text-xl font-black text-[#34302F]">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[#34302F]/76">{description}</p>
    </article>
  );
}
