import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { ActionType } from "@/types/common";
import type { ReactNode } from "react";

interface BaseActionProps {
  actionType: ActionType;
  buttonLabel: string;
  icon: ReactNode;
  children: ReactNode;
}

export function ActionButton({
  actionType,
  buttonLabel,
  icon,
  children,
}: BaseActionProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          data-action-type={actionType}
          className="text-stone-950 dark:text-stone-50 mr-4 p-1"
        >
          {icon}
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
