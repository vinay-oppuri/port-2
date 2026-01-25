import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { SocialLinks } from "@/components/common/social-links";
import { Header } from "@/components/core/1-Header";
import Footer from "@/components/core/8-Footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";


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
  icons: {
    icon: "/avatars/avatar-rounded.png",
    shortcut: "/avatars/avatar-rounded.png",
    apple: "/avatars/avatar-rounded.png",
  },
  openGraph: {
    title: "Vinay - Portfolio",
    description: "Full-Stack · Agentic AI Engineer exploring the future of web and AI.",
    url: "https://vinayweb.in",
    siteName: "Vinay Oppuri Portfolio",
    images: [
      {
        url: "/avatars/avatar-rounded.png", // Ideally, use a dedicated OG image here
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
    images: ["/avatars/avatar-rounded.png"], // Ideally, use a dedicated OG image here
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
        className={`${inter.variable} antialiased min-h-screen mx-auto max-w-3xl flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SocialLinks />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}