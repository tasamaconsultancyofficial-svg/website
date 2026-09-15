import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BrandIntro } from "@/components/brand-intro";
import { RevealProvider } from "@/components/reveal-provider";
import { JsonLd } from "@/components/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | GCC Tax, Finance, Strategy & Compliance`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <GoogleTagManager gtmId="GTM-WF4W36Z7" />
        {/* @next/third-parties only injects the GTM <script>; the <noscript>
            fallback iframe isn't part of that package, so it's added here
            to match Google's official install snippet. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WF4W36Z7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd json={graph(organizationSchema(), websiteSchema())} />
        <BrandIntro />
        <RevealProvider />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
