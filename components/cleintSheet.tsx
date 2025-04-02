"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function ClientSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" className="flex md:hidden">
          <Menu className="h-10 w-10" />
        </Button>
      </SheetTrigger>
      <SheetContent className="translate-custom-translate-rotate transform transition duration-custom-long ease-custom-cubic text-stone-50">
        {children}
      </SheetContent>
    </Sheet>
  );
}
