import type { Metadata } from "next";
import type { Locale } from "@/types/common";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const OGLogo = "https://hanna.gdn/img/OGLogo.jpg";
  const ogLocaleMap = {
    ua: "uk_UA", // Украинский
    en: "en_US", // Английский (США)
    pl: "pl_PL", // Польский
  };

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    keywords: messages.metadata.keywords,
    authors: [{ name: "Hanna Malenka", url: "https://hanna.gdn" }],
    category: "Music",
    metadataBase: new URL("https://hanna.gdn"),

    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale],
      url: "https://hanna.gdn",
      siteName: "Hanna Rock Band",
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: {
        url: OGLogo,
        width: 1200,
        height: 630,
        alt: "Hanna Rock Band",
      },
    },

    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: OGLogo,
    },

    alternates: {
      canonical: "https://hanna.gdn",
      languages: {
        en: "https://hanna.gdn/en",
        pl: "https://hanna.gdn/pl",
        uk: "https://hanna.gdn/ua",
      },
      types: {
        "application/rss+xml": "https://hanna.gdn/rss.xml",
      },
    },

    other: {
      "msapplication-TileColor": "#ffffff",
      "theme-color": "#000000",
    },
  };
}
