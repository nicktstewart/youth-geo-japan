import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { siteMeta } = getDictionary(lang);
  return {
    title: `${siteMeta.name} | ${siteMeta.tagline}`,
    description: siteMeta.description,
    icons: {
      icon: "/YGJ-logo-only.png",
      shortcut: "/YGJ-logo-only.png",
      apple: "/YGJ-logo-only.png",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body>
        <SiteHeader locale={lang} />
        <main>{children}</main>
        <SiteFooter locale={lang} />
      </body>
    </html>
  );
}
