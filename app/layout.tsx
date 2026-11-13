import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://serhat-ture.github.io/st/"),
  title: "NormTürk — Kurumlar İçin Yeni Nesil Dijital Standartlar",
  description:
    "Belediyeler, resmi kurumlar, eğitim kurumları ve spor kulüpleri için güvenli, KVKK uyumlu, yüksek performanslı kurumsal web mimarileri.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "NormTürk — Kurumlar İçin Yeni Nesil Dijital Standartlar",
    description:
      "Belediyeler, resmi kurumlar, eğitim kurumları ve spor kulüpleri için güvenli, KVKK uyumlu, yüksek performanslı kurumsal web mimarileri.",
    url: "https://serhat-ture.github.io/st/",
    siteName: "NormTürk",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://serhat-ture.github.io/st/og-normturk.png",
        width: 1200,
        height: 630,
        alt: "NormTürk — Kurumlar İçin Yeni Nesil Dijital Standartlar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NormTürk — Kurumlar İçin Yeni Nesil Dijital Standartlar",
    description:
      "Belediyeler, resmi kurumlar, eğitim kurumları ve spor kulüpleri için güvenli, KVKK uyumlu, yüksek performanslı kurumsal web mimarileri.",
    images: ["https://serhat-ture.github.io/st/og-normturk.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
