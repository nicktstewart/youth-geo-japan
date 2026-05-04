import Link from "next/link";
import Image from "next/image";
import { AnimatedBlob } from "@/components/AnimatedBlob";
import { siteMeta } from "@/lib/site-content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F3ED]">
      <AnimatedBlob />
      <div className="relative mx-auto grid min-h-[calc(100svh-68px)] max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_0.92fr] lg:px-8">
        <div className="fade-up max-w-2xl">
          <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6A5748] shadow-sm">
            Youth network for geography and GIS
          </p>
          <h1 className="text-5xl font-black leading-[1.03] text-[#34302F] sm:text-6xl lg:text-7xl">
            {siteMeta.name}
          </h1>
          <p className="mt-6 text-2xl font-semibold leading-relaxed text-[#34302F]/82 sm:text-3xl">
            {siteMeta.tagline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" href="/contact">
              Contact
            </Link>
            <Link className="btn-secondary" href="/activities">
              活動を見る
            </Link>
          </div>
        </div>
        <div className="relative min-h-[340px]">
          <div className="absolute inset-x-4 top-8 rounded-[2rem] border border-[#6A5748]/12 bg-white p-5 shadow-2xl shadow-[#6A5748]/10">
            <div className="relative aspect-[908/600] overflow-hidden rounded-[1.5rem] bg-white">
              <Image
                src="/YGJ.jpg"
                alt="Youth GEO Japan logo"
                fill
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-[#34302F]/72">
              地図から社会を読み、好奇心から次の道を描く。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
