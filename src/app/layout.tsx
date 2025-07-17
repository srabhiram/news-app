import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import ClientProvider from "@/components/providers/ClientProvider";
import Footer from "@/components/Footer";
import { Viewport } from "next";
import { getTokenData } from "@/helpers/getTokenData";
import Head from "next/head";

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
  // appleWebApp:{
  //   capable:true,
  //   title:"SRS News",
  // },
  applicationName: "SRS News",
};
export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getTokenData();

  return (
    <html lang="en">
      
        <Head>
  <link rel="preconnect" href="https://res.cloudinary.com" />
  <link rel="dns-prefetch" href="https://res.cloudinary.com" />
</Head>
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <Navbar userData={userData}/>

          <main className="min-h-screen mx-0.5 sm:mx-2 sm:mt-4 pt-2 ">
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
