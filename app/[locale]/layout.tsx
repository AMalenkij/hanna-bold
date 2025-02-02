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
        <head />
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
              <span className="px-6 font-black text-[24vw]">HANNA</span>
              <div
                className="relative h-[500px]"
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
