import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";

interface DeleteDialogProps {
  title: string;
  onDelete: () => Promise<void>;
  onCancel: () => void;
  isDeleting: boolean;
  setIsConfirmed: (value: boolean) => void;
  isConfirmed: boolean;
}

export function DeleteDialog({
  title,
  onDelete,
  onCancel,
  isDeleting,
  isConfirmed,
  setIsConfirmed,
}: DeleteDialogProps) {
  return (
    <div className="py-4">
      <p className="mb-4">
        Are you sure you want to delete
        {title ? (
          <span className="font-medium">"{title}"</span>
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
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </div>
  );
}
