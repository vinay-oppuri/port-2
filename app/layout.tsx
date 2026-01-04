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
  icons: {
    icon: "/avatars/avatar-rounded.png",
    shortcut: "/avatars/avatar-rounded.png",
    apple: "/avatars/avatar-rounded.png",
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