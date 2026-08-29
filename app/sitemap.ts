import type { MetadataRoute } from "next";
import { indexableRoutes, localizedUrl } from "@/lib/seo";

type IndexableRoute = (typeof indexableRoutes)[number];

// Update only the route whose visible content changed. See docs/seo-aio-guide.md.
const routeLastModified = {
  "/": "2026-08-29T00:00:00+09:00",
  "/activities": "2026-08-29T00:00:00+09:00",
  "/partners": "2026-08-29T00:00:00+09:00",
  "/contact": "2026-08-29T00:00:00+09:00",
} satisfies Record<IndexableRoute, string>;

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.flatMap((pathname) =>
    (["ja", "en"] as const).map((locale) => ({
      url: localizedUrl(locale, pathname),
      lastModified: new Date(routeLastModified[pathname]),
      changeFrequency: pathname === "/activities" ? ("monthly" as const) : ("yearly" as const),
      priority: pathname === "/" ? 1 : pathname === "/activities" ? 0.8 : 0.7,
      alternates: {
        languages: {
          ja: localizedUrl("ja", pathname),
          en: localizedUrl("en", pathname),
          "x-default": localizedUrl("ja", pathname),
        },
      },
    })),
  );
}
