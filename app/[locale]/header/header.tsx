import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "@/components/logo";
import NavMenu from "@/components/navMenu";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import LanguageToggle from "./languageToggle";
import ModeToggle from "./modeToggle";
import ClientSheet from "@/components/cleintSheet";

export default function Header() {
  const tModeToggle = useTranslations("Header.ModeToggle");
  const tLanguageToggle = useTranslations("Header.LanguageToggle");
  const tMobileMenu = useTranslations("Header.MobileMenu");
  return (
    <div className="container fixed top-0 right-0 left-0 z-20 text-stone-50 ">
      {/* Blurred overlay */}
      <div className="-z-10 absolute inset-0 bg-gradient-to-b from-black/70 to-stone-300/20 dark:invisible" />

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

        <ClientSheet>
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription>
              {tMobileMenu("SheetDescription")}
            </SheetDescription>
          </SheetHeader>
          <NavMenu className="mb-16 flex flex-col items-start " />
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
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ClientSheet>
      </div>
    </div>
  );
}
