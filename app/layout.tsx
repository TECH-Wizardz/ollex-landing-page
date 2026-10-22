import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import localFont from "next/font/local";

import { PRODUCT_NAME } from "@/lib/brand";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// General Sans is not on Google Fonts, so it is self-hosted from app/fonts.
// Every heading on the page is the 600 weight, so that is the only file.
const generalSans = localFont({
  src: "./fonts/GeneralSans-Semibold.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} - Client portal`,
  description: `Send clients one link. ${PRODUCT_NAME} collects files, forms and answers, and reminds them about what's missing. No passwords. Free 14-day trial.`,
};

// Read on the server at build time (this layout is static), so it needs no
// NEXT_PUBLIC_ prefix. Unset means no analytics, which keeps local dev quiet.
const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

// No auth provider here: sign-in and sign-up live entirely in the provider app.
// suppressHydrationWarning: the theme script sets `data-theme` on <html>
// before React hydrates. It is a plain inline <script> rather than next/script
// because Next queues even `beforeInteractive` inline scripts behind its async
// runtime, which is too late to stop an explicit Light/Dark choice flashing the
// other theme on load.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${caveat.variable} ${generalSans.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
      {GOOGLE_ANALYTICS_ID ? <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} /> : null}
    </html>
  );
}
