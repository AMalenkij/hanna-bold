"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useModelFormStore } from "@/store/useModelFormStore";

type ValidModels = "concerts" | "posts";

interface DeleteButtonProps {
  id: string;
  title: string;
  model: ValidModels;
}

export function DeleteButton({ id, title, model }: DeleteButtonProps) {
  const openDialog = useModelFormStore((state) => state.openDelDialog);
  const data = { id, title, model };

  return (
    <Button variant="link" onClick={() => openDialog(data)}>
      <X />
      Del
    </Button>
  );
}
