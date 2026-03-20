import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { SocialLinks } from "@/components/common/social-links";
import { Header } from "@/components/core/1-Header";
import Footer from "@/components/core/9-Footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Toaster } from "sonner";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vinay - Portfolio",
  description: "Full-Stack · Agentic AI",
  keywords: ["Full Stack", "React", "Next.js", "AI", "Agentic AI", "Web Development", "Portfolio"],
  authors: [{ name: "Vinay Oppuri", url: "https://vinayweb.in" }],
  metadataBase: new URL("https://vinayweb.in"),
  openGraph: {
    title: "Vinay - Portfolio",
    description: "Full-Stack · Agentic AI Engineer exploring the future of web and AI.",
    url: "https://vinayweb.in",
    siteName: "Vinay Oppuri Portfolio",
    images: [
      {
        url: "/avatars/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinay - Portfolio",
    description: "Full-Stack · Agentic AI",
    images: ["/avatars/logo.png"],
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
        className={`${inter.variable} antialiased min-h-screen w-full overflow-x-hidden mx-auto flex flex-col items-center`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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