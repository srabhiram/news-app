import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import Footer from "@/components/Footer";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Viewport } from "next";

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
  appleWebApp:{
    capable:true,
    statusBarStyle:"black-translucent",
    title:"SRS News",
  },
  applicationName:"SRS News"
};
export const viewport:Viewport ={
  maximumScale:1,
  userScalable:false
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_AD}`}
          crossOrigin="anonymous"
        />
        <GoogleAnalytics/>
        <ClientProvider>
          <Navbar />

          <main className="min-h-screen mt-4 ">
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
