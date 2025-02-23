"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

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

interface ModeToggleProps {
  variant: "dropdown" | "accordion";
  lightLabel: string;
  darkLabel: string;
  systemLabel: string;
  toggleTheme: string;
}

export default function ModeToggle({
  variant,
  lightLabel,
  darkLabel,
  systemLabel,
  toggleTheme,
}: ModeToggleProps) {
  const { setTheme } = useTheme();

  if (variant === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="dark:-rotate-90 h-5 w-5 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{toggleTheme}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            {lightLabel}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            {darkLabel}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            {systemLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === "accordion") {
    return (
      <Accordion type="single" collapsible className="mb-10 w-full">
        <AccordionItem value="theme">
          <AccordionTrigger>{toggleTheme}</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col items-start space-y-2">
              <Button variant="link">
                <li
                  onClick={() => setTheme("light")}
                  onKeyDown={() => setTheme("light")}
                >
                  {lightLabel}
                </li>
              </Button>
              <Button variant="link">
                <li
                  onClick={() => setTheme("dark")}
                  onKeyDown={() => setTheme("dark")}
                >
                  {darkLabel}
                </li>
              </Button>
              <Button variant="link">
                <li
                  onClick={() => setTheme("system")}
                  onKeyDown={() => setTheme("system")}
                >
                  {systemLabel}
                </li>
              </Button>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
}
