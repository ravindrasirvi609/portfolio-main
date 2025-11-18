import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";
import {
  getSiteMetadata,
  getSchemaMarkup,
  getFAQSchemaMarkup,
} from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = getSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <link rel="icon" href="/ravindra.jpg" sizes="any" />
        <link rel="canonical" href="https://www.ravindrachoudhary.in" />
        <link
          rel="alternate"
          hrefLang="en-IN"
          href="https://www.ravindrachoudhary.in"
        />
        <link
          rel="alternate"
          hrefLang="hi-IN"
          href="https://www.ravindrachoudhary.in/hi"
        />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="hi_IN" />
        <meta
          name="google-site-verification"
          content="add-your-google-verification-code-here"
        />
        <meta
          name="facebook-domain-verification"
          content="add-your-facebook-verification-code-here"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSchemaMarkup()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getFAQSchemaMarkup()),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <ScrollProgress />
          <SmoothScroll>{children}</SmoothScroll>
          <Analytics />
        </ThemeProvider>
        <script
          async
          src="https://api.cronbot.ai/v1/widgets/app/app_afufv512myio"
        ></script>
      </body>
    </html>
  );
}
