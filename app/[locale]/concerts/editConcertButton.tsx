"use client";

import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { useConcertFormStore } from "./concertStore";
import type { Concert } from "./types";

interface EditConcertButtonProps {
  concert: Concert;
}

export function EditConcertButton({ concert }: EditConcertButtonProps) {
  const openDialog = useConcertFormStore((state) => state.openEditDialog);

  return (
    <Button variant="link" onClick={() => openDialog(concert)}>
      <PencilLine />
      Change
    </Button>
  );
}
