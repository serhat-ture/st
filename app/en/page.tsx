import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { DICTIONARY } from "@/lib/i18n";

const enMeta = DICTIONARY.en.meta;

export const metadata: Metadata = {
  title: enMeta.title,
  description: enMeta.description,
  alternates: {
    canonical: "https://serhat-ture.github.io/st/en/",
    languages: {
      tr: "https://serhat-ture.github.io/st/",
      en: "https://serhat-ture.github.io/st/en/",
    },
  },
  openGraph: {
    title: enMeta.title,
    description: enMeta.description,
    url: "https://serhat-ture.github.io/st/en/",
    siteName: "NormTürk",
    locale: enMeta.ogLocale,
    type: "website",
    images: [
      {
        url: "https://serhat-ture.github.io/st/og-normturk.png",
        width: 1200,
        height: 630,
        alt: enMeta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: enMeta.title,
    description: enMeta.description,
    images: ["https://serhat-ture.github.io/st/og-normturk.png"],
  },
};

export default function EnglishHomePage() {
  return <LandingPage locale="en" />;
}

