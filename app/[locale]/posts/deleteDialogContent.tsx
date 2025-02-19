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
import { deleteImageFromCloudinary } from "@/actions/deleteImageFromCloudinary";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type ValidModels = "concerts" | "posts";

interface DeleteDialogContentProps {
  id: string;
  slug: string;
  title?: string;
  model: ValidModels;
}

export function DeleteDialogContent({
  id,
  slug,
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
        // 1. Всегда удаляем изображение
        const deleteImageResult = await deleteImageFromCloudinary(slug);

        // 2. Если ошибка удаления изображения - прерываем
        if (!deleteImageResult.success) {
          throw new Error(deleteImageResult.error || "Failed to delete image");
        }

        // 3. Удаляем запись из базы данных
        const deleteResult = await deleteAction(id);
        if (!deleteResult.success) {
          throw new Error(deleteResult.error || "Failed to delete record");
        }

        // 4. Уведомление об успехе
        toast({
          title: `${model.charAt(0).toUpperCase() + model.slice(1)} deleted`,
          description: `The ${model} has been successfully deleted with its image.`,
        });

        router.refresh();
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
        <DialogTitle>Delete {model}</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <p className="mb-4">
          Are you sure you want to permanently delete
          {title ? (
            <span className="font-medium"> "{title}"</span>
          ) : (
            " this item"
          )}
          ? This will also delete the associated image.
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
            I understand this action cannot be undone
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
            {isPending ? "Deleting..." : "Delete Permanently"}
          </Button>
        </DialogFooter>
      </div>
    </>
  );
}
