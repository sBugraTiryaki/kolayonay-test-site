import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KolayOnay Banner Test Sitesi",
  description: "KolayOnay Cookie Management Platform test sitesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* KolayOnay Banner Script - TOKEN'i KolayOnay'dan aldiginizda buraya ekleyin */}
        {/*
        <Script
          src="https://verify.kolayonay.com.tr/s/{TOKEN}"
          strategy="afterInteractive"
        />
        */}
      </body>
    </html>
  );
}
