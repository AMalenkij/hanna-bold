import Link from "next/link";
import NavMenu from "@/components/navMenu";
import { SOCIAL_LINKS } from "@/constants/links";
import { CONTACT_EMAIL, DESIGN, LINK_DESIGN } from "@/constants/setting";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const t = useTranslations("Components.footer");

  return (
    <footer className="fixed bottom-0 w-full bg-red-500 px-6 pt-6 pb-2 md:pt-16 md:pb-4">
      <div className="container mx-auto text-stone-50">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          {/* Reach out */}
          <div className="space-y-2 md:space-y-4">
            <div className="text-sm opacity-80">{t("reachOut")}</div>
            <Link
              href="mailto:hannabandgd@gmail.com"
              className="ml-3 block transition-opacity hover:opacity-80"
            >
              {CONTACT_EMAIL}
            </Link>
          </div>

          {/* Find us */}
          <div className="space-y-2 md:space-y-4">
            <div className="text-sm opacity-80">{t("findUs")}</div>
            <address className="ml-3 not-italic">
              {t("address.line1")}
              <br />
              {t("address.line2")}
            </address>
          </div>

          {/* Social */}
          <div className="space-y-2 md:space-y-4">
            <div className="text-sm opacity-80">{t("social")}</div>
            <nav className="flex flex-col" aria-label="Social media">
              {SOCIAL_LINKS.map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="link" size="sm" className="border-stone-50">
                    {name}
                  </Button>
                </a>
              ))}
            </nav>
          </div>

          {/* Nav */}
          <div className="space-y-2 md:space-y-4">
            <div className="text-sm opacity-80">{t("nav")}</div>
            <NavMenu variant="footer" className="flex flex-col items-start" />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col items-end justify-between gap-y-3 border-white/20 border-t pt-8 text-sm md:mt-16 lg:flex-row">
          <p>{t("copyright")}</p>
          <a href={LINK_DESIGN}>{DESIGN}</a>
        </div>
      </div>
    </footer>
  );
}
