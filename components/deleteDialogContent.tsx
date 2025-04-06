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
import { deleteConcertAction } from "@/actions/deleteConcertAction";

type DeleteDialogContentProps = {
  id: string;
  photo?: string; // Optional since concerts don't have a slug
  title: string; // название того что удаляем
  model: "concerts" | "posts";
};

export function DeleteDialogContent({
  id,
  photo,
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
        // 1. Удаляем изображение только для постов
        if (model === "posts" && photo) {
          const deleteImageResult = await deleteImageFromCloudinary(photo);
          // Если ошибка удаления изображения - прерываем
          if (!deleteImageResult.success) {
            throw new Error(
              deleteImageResult.error || "Failed to delete image",
            );
          }
        }

        // 2. Удаляем запись из базы данных
        if (model === "posts") {
          const deleteResult = await deleteAction(id);
          if (!deleteResult.success) {
            throw new Error(deleteResult.error || "Failed to delete record");
          }
        } else {
          // For concerts
          const deleteResult = await deleteConcertAction(id);
          if (!deleteResult.success) {
            throw new Error(deleteResult.error || "Failed to delete record");
          }
        }

        // 3. Уведомление об успехе
        const modelName = model.charAt(0).toUpperCase() + model.slice(1);
        const imageMessage = model === "posts" ? " with its image" : "";

        toast({
          title: `${modelName} deleted`,
          description: `The ${model} has been successfully deleted${imageMessage}.`,
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
          ?{model === "posts" && " This will also delete the associated image."}
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
            <Button variant="link" className="px-2">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmed || isPending}
            className="px-2"
          >
            {isPending ? "Deleting..." : "Delete Permanently"}
          </Button>
        </DialogFooter>
      </div>
    </>
  );
}
