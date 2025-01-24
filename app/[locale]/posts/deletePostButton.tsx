import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DeleteDialogContent } from "./deleteDialogContent";

type ValidModels = "concerts" | "posts";

interface DeleteButtonProps {
  id: string;
  title: string;
  model: ValidModels;
}

export function DeletePostButton({ id, title, model }: DeleteButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <X />
          Del
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DeleteDialogContent id={id} title={title} model={model} />
      </DialogContent>
    </Dialog>
  );
}
