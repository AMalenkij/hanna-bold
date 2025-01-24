"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { deleteAction } from "@/actions/deleteAction";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type ValidModels = "concerts" | "posts";

interface DeleteDialogContentProps {
  id: string;
  title?: string;
  model: ValidModels;
}

export function DeleteDialogContent({
  id,
  title,
  model,
}: DeleteDialogContentProps) {
  const [isPending, startTransition] = useTransition();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteAction(id);
        if (result.success) {
          toast({
            title: `${model.charAt(0).toUpperCase() + model.slice(1)} deleted`,
            description: `The ${model} has been successfully deleted.`,
          });
          router.refresh();
        } else {
          throw new Error("Failed to delete");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Delete failed";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Delete</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <p className="mb-4">
          Are you sure you want to delete
          {title ? <span className="font-medium">"{title}"</span> : "this item"}
          ?
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="confirm-delete"
            checked={isConfirmed}
            onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
          />
          <Label
            htmlFor="confirm-delete"
            className="text-muted-foreground text-sm"
          >
            I understand that this action will permanently delete the {model}
            data
          </Label>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmed || isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </div>
    </>
  );
}
