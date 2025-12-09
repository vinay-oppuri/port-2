import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { SocialLinks } from "@/components/common/social-links";
import { Header } from "@/components/Home/1-Header";
import Footer from "@/components/Home/8-Footer";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vinay - Portfolio",
  description: "Full-Stack · Agentic AI",
  icons: {
    icon: "/avatar-light.png",
    shortcut: "/avatar-light.png",
    apple: "/avatar-light.png",
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
        className={`${inter.variable} antialiased min-h-screen flex flex-col px-0 md:px-85`}
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
        </ThemeProvider>
      </body>
    </html>
  );
}