import { stagger } from "@/lib/motion";

type PartnerOptionCardProps = {
  index?: number;
  title: string;
  description: string;
};

export function PartnerOptionCard({ title, description, index = 0 }: PartnerOptionCardProps) {
  return (
    <article data-reveal="" style={stagger(index)} className="card-hover bg-white">
      <h2 className="text-xl font-semibold text-[#3e3a39]">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[#3e3a39]/76">{description}</p>
    </article>
  );
}
