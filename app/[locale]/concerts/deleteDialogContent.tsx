import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import type { Concert } from "./types";

interface DeleteDialogContentProps {
  concert: Concert | null;
  onDelete: () => Promise<void>;
  onCancel: () => void;
  isDeleting: boolean;
}

export function DeleteDialogContent({
  concert,
  onDelete,
  onCancel,
  isDeleting,
}: DeleteDialogContentProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div className="py-4">
      <p className="mb-4">
        Are you sure you want to delete{" "}
        {concert?.title ? (
          <span className="font-medium">"{concert.title}"</span>
        ) : (
          "this concert"
        )}
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
          I understand that this action will permanently delete the concert data
        </Label>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={!isConfirmed || isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Concert"}
        </Button>
      </DialogFooter>
    </div>
  );
}
