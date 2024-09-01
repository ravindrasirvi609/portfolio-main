import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { Analytics } from "@vercel/analytics/react";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ravindra Sirvi | Software Engineer",
  description:
    "Experienced software engineer specializing in web, mobile, and cloud technologies. Explore my portfolio and projects.",
  keywords:
    "Ravindra Sirvi, software engineer, web development, mobile development, cloud technologies, portfolio",
  authors: [{ name: "Ravindra Sirvi" }],
  creator: "Ravindra Sirvi",
  publisher: "Ravindra Sirvi",
  openGraph: {
    type: "website",
    url: "https://www.ravindrachoudhary.in",
    title: "Ravindra Sirvi | Software Engineer Portfolio",
    description:
      "Explore the work and projects of Ravindra Sirvi, a skilled software engineer specializing in cutting-edge technologies.",
    images: [{ url: "https://www.ravindrachoudhary.in/ravindra.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ravindra_sirvi",
    images: ["https://www.ravindrachoudhary.in/ravindra.jpg"],
  },
  alternates: {
    canonical: "https://www.ravindrachoudhary.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/ravindra.jpg" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ravindra Sirvi",
              url: "https://www.ravindrachoudhary.in/",
              jobTitle: "Software Engineer",
              description:
                "Software engineer specializing in web, mobile, and cloud technologies.",
              sameAs: [
                "https://www.linkedin.com/in/ravindra-sirvi",
                "https://github.com/ravindrasirvi609",
                "https://twitter.com/ravindra_sirvi",
              ],
              skills: [
                "Web Development",
                "Mobile Development",
                "Cloud Technologies",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance Software Engineer",
              },
              image: "https://www.ravindrachoudhary.in/ravindra.jpg",
            }),
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
