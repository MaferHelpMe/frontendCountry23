import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Where in the world? | Countries Explorer",
  description:
    "Explore countries around the world with detailed information about population, region, capital, and more. Built with Next.js 15.",
  keywords: [
    "countries",
    "geography",
    "population",
    "capitals",
    "flags",
    "world",
  ],
  authors: [{ name: "Countries Explorer Team" }],
  creator: "Countries Explorer",
  publisher: "Countries Explorer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://countries-explorer.vercel.app",
    title: "Where in the world? | Countries Explorer",
    description:
      "Explore countries around the world with detailed information about population, region, capital, and more.",
    siteName: "Countries Explorer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Where in the world? | Countries Explorer",
    description:
      "Explore countries around the world with detailed information.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
