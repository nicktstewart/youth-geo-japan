import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://youthgeojp.com";

export const siteUrl = new URL(configuredSiteUrl);
export const siteOrigin = siteUrl.origin;

export const indexableRoutes = ["/", "/activities", "/partners", "/contact"] as const;

export function localizedUrl(locale: Locale, pathname: string) {
  const path = pathname === "/" ? "" : pathname;
  return `${siteOrigin}${locale === "en" ? "/en" : ""}${path}`;
}

type PageMetadataOptions = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
};

export function createPageMetadata({
  locale,
  pathname,
  title,
  description,
}: PageMetadataOptions): Metadata {
  const canonical = localizedUrl(locale, pathname);
  const japaneseUrl = localizedUrl("ja", pathname);
  const englishUrl = localizedUrl("en", pathname);
  const socialImage = `${siteOrigin}/${locale}/opengraph-image`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        ja: japaneseUrl,
        en: englishUrl,
        "x-default": japaneseUrl,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Youth GEO Japan",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      alternateLocale: locale === "ja" ? ["en_US"] : ["ja_JP"],
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Youth GEO Japan — Geography and GIS youth community in Japan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function organizationJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteOrigin}/#organization`,
        name: "Youth GEO Japan",
        alternateName: ["Youth Geo Japan", "YGJ"],
        url: siteOrigin,
        logo: {
          "@type": "ImageObject",
          url: `${siteOrigin}/YGJ-logo-only.png`,
          width: 640,
          height: 640,
        },
        description,
        email: "contact@youthgeojp.com",
        areaServed: {
          "@type": "Country",
          name: locale === "ja" ? "日本" : "Japan",
        },
        audience: {
          "@type": "Audience",
          audienceType:
            locale === "ja"
              ? "地理・GIS・地理空間情報に関心のある若者、学生、教育者"
              : "Young people, students, and educators interested in geography, GIS, and geospatial information",
        },
        knowsAbout:
          locale === "ja"
            ? ["地理", "GIS", "地理空間情報", "地理教育", "若者の学習", "地域コミュニティ"]
            : [
                "Geography",
                "GIS",
                "Geospatial information",
                "Geography education",
                "Youth learning",
                "Community",
              ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteOrigin}/#website`,
        url: siteOrigin,
        name: "Youth GEO Japan",
        alternateName: "YGJ",
        inLanguage: ["ja", "en"],
        publisher: { "@id": `${siteOrigin}/#organization` },
      },
    ],
  };
}
