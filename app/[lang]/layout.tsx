import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { organizationJsonLd, siteUrl } from "@/lib/seo";
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
    metadataBase: siteUrl,
    title: {
      default: `${siteMeta.name} | ${siteMeta.tagline}`,
      template: `%s | ${siteMeta.name}`,
    },
    description: siteMeta.description,
    applicationName: siteMeta.name,
    authors: [{ name: siteMeta.name, url: siteUrl }],
    creator: siteMeta.name,
    publisher: siteMeta.name,
    category: "education",
    referrer: "origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
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
  const { siteMeta } = getDictionary(lang);
  const jsonLd = organizationJsonLd(lang, siteMeta.description);

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader locale={lang} />
        <main>{children}</main>
        <SiteFooter locale={lang} />
      </body>
    </html>
  );
}
