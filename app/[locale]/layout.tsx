import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/themeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import Footer from "./footer";
import Header from "./header/header";
import type { Locale } from "@/types/common";
import LargeTitle from "@/components/largeTitle";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"], // Добавлен кириллический subset
  display: "swap",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const OGLogo = "https://hanna.gdn/img/OGLogo.jpg";
  const ogLocaleMap = {
    ua: "uk_UA",
    en: "en_US",
    pl: "pl_PL",
  };

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "Hanna Malenka", url: "https://hanna.gdn" }],
    category: "Music",
    metadataBase: new URL("https://hanna.gdn"),
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale],
      url: "https://hanna.gdn",
      siteName: "Hanna Rock Band",
      title: t("title"),
      description: t("description"),
      images: {
        url: OGLogo,
        width: 1200,
        height: 630,
        alt: "Hanna Rock Band",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: OGLogo,
    },
    alternates: {
      canonical: "https://hanna.gdn",
      languages: {
        en: "https://hanna.gdn/en",
        pl: "https://hanna.gdn/pl",
        uk: "https://hanna.gdn/ua", // Соответствие между uk и ua
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

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale} suppressHydrationWarning>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body
          className={`${montserrat.className} bg-background text-foreground antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <Header />
              {children}
              <Toaster />
              <LargeTitle />
              <div
                className="relative h-[740px] md:h-[500px]"
                style={{
                  clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
                }}
              >
                <Footer />
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
