import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { Analytics } from "@vercel/analytics/react";
import CustomCursor from "@/components/CustomCursor";
import { getSiteMetadata, getSchemaMarkup } from "@/lib/seo";

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
        <link rel="icon" href="/ravindra.jpg" sizes="any" />
        <link rel="canonical" href="https://www.ravindrachoudhary.in" />
        <link
          rel="alternate"
          hrefLang="en-IN"
          href="https://www.ravindrachoudhary.in"
        />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta property="og:locale" content="en_IN" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSchemaMarkup()),
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
          {children}
          <Analytics />
        </ThemeProvider>
        <CustomCursor />
        <script
          async
          src="https://api.cronbot.ai/v1/widgets/app/app_afufv512myio"
        ></script>
      </body>
    </html>
  );
}
