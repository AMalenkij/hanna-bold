"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useConcertFormStore } from "./concertStore";
import type { Concert } from "@prisma/client";

export function DeleteConcertButton({ concert }: { concert: Concert }) {
  const openDialog = useConcertFormStore((state) => state.openDelDialog);
  return (
    <Button variant="link" onClick={() => openDialog(concert)}>
      <X />
      Del
    </Button>
  );
}
