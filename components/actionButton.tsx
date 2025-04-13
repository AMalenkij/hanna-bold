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
        <Button variant="link" data-action-type={actionType}>
          {icon}
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
