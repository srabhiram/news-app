import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SRS News",
  description: "మీ చేతిలో వార్తల ప్రపంచం – నిత్యం తాజా, నిస్సందేహం!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_AD}`}
          crossOrigin="anonymous"
        />
        <ClientProvider>
          <Navbar />
          <main className="min-h-screen mt-4">
            {children}

            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
