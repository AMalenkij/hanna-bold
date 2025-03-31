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

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

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
  // Асинхронное получение параметров
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // Проверка локали после await
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale} suppressHydrationWarning>
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
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
                className="relative h-[800px] sm:h-[500px]"
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
