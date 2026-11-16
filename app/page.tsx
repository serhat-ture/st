import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { DICTIONARY } from "@/lib/i18n";

const trMeta = DICTIONARY.tr.meta;

export const metadata: Metadata = {
  title: trMeta.title,
  description: trMeta.description,
  alternates: {
    canonical: "https://serhat-ture.github.io/st/",
    languages: {
      tr: "https://serhat-ture.github.io/st/",
      en: "https://serhat-ture.github.io/st/en/",
    },
  },
  openGraph: {
    title: trMeta.title,
    description: trMeta.description,
    url: "https://serhat-ture.github.io/st/",
    siteName: "NormTürk",
    locale: trMeta.ogLocale,
    type: "website",
    images: [
      {
        url: "https://serhat-ture.github.io/st/og-normturk.png",
        width: 1200,
        height: 630,
        alt: trMeta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: trMeta.title,
    description: trMeta.description,
    images: ["https://serhat-ture.github.io/st/og-normturk.png"],
  },
};

export default function HomePage() {
  return <LandingPage locale="tr" />;
}
