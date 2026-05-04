import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteMeta } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteMeta.name} | ${siteMeta.tagline}`,
  description: siteMeta.description,
  icons: {
    icon: "/YGJ-logo-only.png",
    shortcut: "/YGJ-logo-only.png",
    apple: "/YGJ-logo-only.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
