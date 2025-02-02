import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "@/components/logo";
import NavMenu from "@/components/navMenu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageToggle from "./languageToggle";
import ModeToggle from "./modeToggle";

export default function Header() {
  const tModeToggle = useTranslations("Header.ModeToggle");
  const tLanguageToggle = useTranslations("Header.LanguageToggle");
  const tMobileMenu = useTranslations("Header.MobileMenu");
  return (
    <div className="fixed top-0 right-0 left-0 z-50 px-4 mix-blend-difference text-white">
      <div className="flex w-full items-center justify-between">
        <Logo />
        <nav className="hidden items-center space-x-2 md:flex">
          <NavMenu variant="header" />
          <div className="flex items-center space-x-2 pl-4">
            <ModeToggle
              variant="dropdown"
              lightLabel={tModeToggle("lightLabel")}
              darkLabel={tModeToggle("darkLabel")}
              systemLabel={tModeToggle("systemLabel")}
              toggleTheme={tModeToggle("toggleTheme")}
            />
            <LanguageToggle
              variant="dropdown"
              englishLabel={tLanguageToggle("english")}
              polishLabel={tLanguageToggle("polski")}
              ukrainianLabel={tLanguageToggle("ukrainian")}
              changeLanguageLabel={tLanguageToggle("changeLanguage")}
            />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="flex md:hidden">
              <Menu className="h-10 w-10" />
            </Button>
          </SheetTrigger>
          <SheetContent className="translate-custom-translate-rotate transform transition duration-custom-long ease-custom-cubic">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription>
                {tMobileMenu("SheetDescription")}
              </SheetDescription>
            </SheetHeader>
            <NavMenu className="mb-16 flex flex-col items-start" />
            <LanguageToggle
              variant="accordion"
              englishLabel={tLanguageToggle("english")}
              polishLabel={tLanguageToggle("polski")}
              ukrainianLabel={tLanguageToggle("ukrainian")}
              changeLanguageLabel={tLanguageToggle("changeLanguage")}
            />
            <ModeToggle
              variant="accordion"
              lightLabel={tModeToggle("lightLabel")}
              darkLabel={tModeToggle("darkLabel")}
              systemLabel={tModeToggle("systemLabel")}
              toggleTheme={tModeToggle("toggleTheme")}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
