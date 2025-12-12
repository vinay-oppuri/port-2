import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { SocialLinks } from "@/components/common/social-links";
import { Header } from "@/components/Home/1-Header";
import Footer from "@/components/Home/8-Footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vinay - Portfolio",
  description: "Full-Stack · Agentic AI",
  openGraph: {
    title: "Vinay - Portfolio",
    description: "Full-Stack · Agentic AI",
    url: "https://vinay-oppuri2.vercel.app",
    siteName: "Vinay Portfolio",
    images: [
      {
        url: "/avatar-rounded.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/avatar-rounded.png",
    shortcut: "/avatar-rounded.png",
    apple: "/avatar-rounded.png",
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