"use client";

import {
  ABOUT_ROUTE,
  CONCERTS,
  CONTACTS_ROUTE,
  HOME_ROUTE,
} from "@/constants/routes";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import NavLink from "./navLink";

type RouteVariant = "header" | "footer" | "default";

interface NavMenuProps {
  variant?: RouteVariant;
  className?: string;
}

export default function NavMenu({ variant, className }: NavMenuProps) {
  const tNavMenu = useTranslations("Components.Nav");
  const pathname = usePathname();
  const { locale } = useParams();

  const isActive = (href: string) => {
    const localePrefix = `/${locale}`;
    const fullPath = localePrefix + href;

    if (href === HOME_ROUTE) {
      return pathname === localePrefix || pathname === `${localePrefix}/`;
    }
    return pathname?.startsWith(fullPath);
  };

  const routes = [
    {
      label: tNavMenu("home"),
      href: HOME_ROUTE,
      isActive: isActive(HOME_ROUTE),
    },
    {
      label: tNavMenu("concerts"),
      href: CONCERTS,
      isActive: isActive(CONCERTS),
    },
    {
      label: tNavMenu("about"),
      href: ABOUT_ROUTE,
      isActive: isActive(ABOUT_ROUTE),
    },
    {
      label: tNavMenu("contacts"),
      href: CONTACTS_ROUTE,
      isActive: isActive(CONTACTS_ROUTE),
    },
  ];

  return (
    <nav className={className}>
      {routes.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={item.isActive}
          className={variant === "footer" ? "px-0" : "px-1 lg:px-2"}
        />
      ))}
    </nav>
  );
}
