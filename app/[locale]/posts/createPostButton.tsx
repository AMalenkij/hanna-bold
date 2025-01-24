"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateDialogContent } from "./createDialogContent";
interface AddButtonProps {
  model: ValidModels;
}
type ValidModels = "concerts" | "posts";

export function CreatePostButton({ model }: AddButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <CreateDialogContent model={model} />
      </DialogContent>
    </Dialog>
  );
}
