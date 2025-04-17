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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteFromCloudinaryStorage } from "@/actions/deleteFromCloudinaryStorage";
import { universalDeleteAction } from "@/actions/universalDeleteAction";

type DeleteDialogContentProps = {
  id: string;
  title: string;
  model: "concerts" | "posts" | "gallery";
  cloudinaryPublicId?: string;
  cloudinaryType?: "image" | "video";
};

export function DeleteDialogContent({
  id,
  title,
  model,
  cloudinaryPublicId,
  cloudinaryType,
}: DeleteDialogContentProps) {
  const [isPending, startTransition] = useTransition();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        if (cloudinaryPublicId && cloudinaryType) {
          const deleteResult = await deleteFromCloudinaryStorage(
            cloudinaryPublicId,
            cloudinaryType,
          );

          if (!deleteResult.success) {
            throw new Error(
              deleteResult.error ||
                `Failed to delete ${cloudinaryType} from storage`,
            );
          }
        }

        const deleteResult = await universalDeleteAction(model, id);
        if (!deleteResult.success) {
          throw new Error(deleteResult.error || "Failed to delete record");
        }

        const mediaTypeLabel = cloudinaryType === "video" ? "video" : "media";
        const successMessage = cloudinaryPublicId
          ? `Successfully deleted ${model} and associated ${mediaTypeLabel}`
          : `Successfully deleted ${model}`;

        toast({
          title: `${model.charAt(0).toUpperCase() + model.slice(1)} Deleted`,
          description: successMessage,
        });

        router.refresh();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Deletion process failed";

        toast({
          title: "Deletion Error",
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
          ?
          {cloudinaryPublicId &&
            ` This will also delete the associated ${cloudinaryType || "media"}`}
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
