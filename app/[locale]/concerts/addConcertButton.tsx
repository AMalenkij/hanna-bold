"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useConcertFormStore } from "./concertStore";

export function AddConcertButton() {
  const openCreateDialog = useConcertFormStore(
    (state) => state.openCreateDialog,
  );

  return (
    <Button
      onClick={openCreateDialog}
      variant="link"
      className="ml-2 flex items-center gap-2"
    >
      <Plus />
      Add Concert
    </Button>
  );
}
