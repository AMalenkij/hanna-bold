"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface LanguageToggleProps {
  variant: "dropdown" | "accordion";
  englishLabel: string;
  polishLabel: string;
  ukrainianLabel: string;
  changeLanguageLabel: string;
}

export default function LanguageToggle({
  variant,
  englishLabel,
  polishLabel,
  ukrainianLabel,
  changeLanguageLabel,
}: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { locale } = useParams();

  const changeLanguage = (newLocale: string) => {
    startTransition(() => {
      const currentPathname = pathname || "/";
      const segments = currentPathname.split("/");
      segments[1] = newLocale; // Replace the language code
      const newPath = segments.join("/");
      router.replace(newPath);
    });
  };

  const renderLanguageButton = (locale: string, label: string) => (
    <Button
      variant="link"
      onClick={() => changeLanguage(locale)}
      disabled={isPending}
    >
      <li>{label}</li>
    </Button>
  );

  if (variant === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            disabled={isPending}
            className="text-stone-50"
          >
            <div className="h-5 w-5 uppercase">{locale}</div>
            <span className="sr-only">{changeLanguageLabel}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => changeLanguage("en")}
          >
            {englishLabel}
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => changeLanguage("pl")}
          >
            {polishLabel}
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => changeLanguage("ua")}
          >
            {ukrainianLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  if (variant === "accordion") {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="language">
          <AccordionTrigger disabled={isPending}>
            {changeLanguageLabel}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col items-start space-y-2">
              {renderLanguageButton("en", englishLabel)}
              {renderLanguageButton("pl", polishLabel)}
              {renderLanguageButton("ua", ukrainianLabel)}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
}
