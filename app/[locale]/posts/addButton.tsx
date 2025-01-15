"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModelFormStore } from "@/store/useModelFormStore";
interface AddButtonProps {
  model: ValidModels;
}
type ValidModels = "concerts" | "posts";

export function AddButton({ model }: AddButtonProps) {
  const openDialog = useModelFormStore((state) => state.openCreateDialog);
  const data = { model };
  return (
    <Button
      onClick={() => openDialog(data)}
      variant="link"
      className="ml-2 flex items-center gap-2"
    >
      <Plus />
      Add
    </Button>
  );
}
