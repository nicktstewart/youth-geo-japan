import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapConductorArticle } from "@/components/MapConductorArticle";
import { hasLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { mapConductorArticle } from "@/lib/activity-articles";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const article = mapConductorArticle[lang];
  return createPageMetadata({ locale: lang, pathname: mapConductorArticle.path, title: article.heading, description: article.description });
}
export default async function MapConductorPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <MapConductorArticle locale={lang} />;
}
