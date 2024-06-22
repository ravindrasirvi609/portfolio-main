import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ravindra's Portfolio",
  description:
    "Discover the world of software engineering through Ravindra Sirvi's portfolio. As a skilled engineer, I've built a diverse range of projects spanning web, mobile, and cloud technologies. Dive in to explore my creations and let's chat about how we can innovate together!",
  icons: {
    icon: "/ravindra.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/ravindra.jpg" sizes="any" />
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
        <script
          async
          src="https://api.cronbot.ai/v1/widgets/app/app_afufv512myio"
        ></script>
      </body>
    </html>
  );
}
