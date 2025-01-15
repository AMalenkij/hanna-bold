"use client";

import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { useModelFormStore } from "@/store/useModelFormStore";

export function EditPostButton({ post }) {
  const openDialog = useModelFormStore((state) => state.openEditDialog);

  return (
    <Button variant="link" onClick={() => openDialog(post)}>
      <PencilLine />
      Change
    </Button>
  );
}
