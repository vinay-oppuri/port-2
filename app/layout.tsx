import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { SocialLinks } from "@/components/common/social-links";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Toaster } from "sonner";


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Vinay - Portfolio",
    template: "%s | Vinay - Portfolio",
  },
  description: "Full-Stack & Agentic AI Engineer building scalable web apps and intelligent systems.",
  keywords: ["Full Stack", "React", "Next.js", "AI", "Agentic AI", "Web Development", "Portfolio", "Vinay Oppuri"],
  authors: [{ name: "Vinay Oppuri", url: "https://vinayweb.in" }],
  creator: "Vinay Oppuri",
  metadataBase: new URL("https://vinayweb.in"),
  alternates: {
    canonical: "https://vinayweb.in",
  },
  openGraph: {
    title: {
      default: "Vinay - Portfolio",
      template: "%s | Vinay - Portfolio",
    },
    description: "Full-Stack & Agentic AI Engineer exploring the future of web and AI.",
    url: "https://vinayweb.in",
    siteName: "Vinay Oppuri Portfolio",
    images: [
      {
        url: "/avatars/logo.png",
        width: 800,
        height: 600,
        alt: "Vinay Oppuri",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Vinay - Portfolio",
      template: "%s | Vinay - Portfolio",
    },
    description: "Full-Stack & Agentic AI Engineer building scalable web apps and intelligent systems.",
    images: ["/avatars/logo.png"],
    creator: "@vinayoppuri",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} antialiased min-h-screen w-full overflow-x-hidden mx-auto flex flex-col items-center`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Vinay Oppuri",
                url: "https://vinayweb.in",
                jobTitle: "Full Stack & AI Engineer",
                sameAs: [
                  "https://x.com/vinayoppuri",
                  "https://www.linkedin.com/in/vinay-oppuri/",
                  "https://github.com/vinay-oppuri"
                ]
              })
            }}
          />
          <SocialLinks />
          <Header />
          <div className="w-full px-2 md:px-0 max-w-3xl mx-auto">
            {children}
            <Footer />
          </div>
          <ScrollToTop />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}