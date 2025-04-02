"use client";

import { createConcertAction } from "@/actions/createConcertAction";
import { deleteConcertAction } from "@/actions/deleteConcertAction";
import { updateConcertAction } from "@/actions/updateConcertAction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ConcertForm, concertFormSchema } from "./concertForm";
import { useConcertFormStore } from "./concertStore";
import { DeleteDialogContent } from "./deleteDialogContent";

export function ConcertFormDialog() {
  const { isOpen, mode, currentConcert, closeDialog } = useConcertFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    if (!currentConcert?.id) return;

    setIsDeleting(true);
    const result = await deleteConcertAction(currentConcert.id);
    setIsDeleting(false);

    if (result.success) {
      toast({
        title: "Concert deleted",
        description: "The concert has been successfully deleted.",
      });
      closeDialog();
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the concert. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    closeDialog();
  };

  const dialogTitle: Record<"del" | "create" | "edit", string> = {
    del: "Delete Concert",
    create: "Add Concert",
    edit: "Edit Concert",
  };

  const form = useForm<z.infer<typeof concertFormSchema>>({
    resolver: zodResolver(concertFormSchema),
    defaultValues: {
      title: "",
      date: "",
      city: "",
      venueName: "",
      address: "",
      link: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && currentConcert) {
      form.reset({
        title: currentConcert.title,
        date: currentConcert?.date
          ? new Date(currentConcert.date).toISOString().slice(0, 16)
          : "",
        city: currentConcert.city,
        venueName: currentConcert.venueName,
        address: currentConcert.address,
        link: currentConcert.link || "",
      });
    } else if (mode === "create") {
      form.reset({
        title: "",
        date: "",
        city: "",
        venueName: "",
        address: "",
        link: "",
      });
    }
  }, [currentConcert, form, mode]);

  async function onSubmit(values: z.infer<typeof concertFormSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value.toString());
    }

    try {
      const result =
        mode === "create"
          ? await createConcertAction(formData)
          : await updateConcertAction(currentConcert?.id ?? "", formData);

      setIsSubmitting(false);

      if (result.success) {
        toast({
          variant: "default",
          className: "bg-green-500 text-white",
          title: `Concert ${mode === "create" ? "created" : "updated"}`,
          description: `Your concert has been successfully ${mode === "create" ? "created" : "updated"}.`,
        });

        if (mode === "create") {
          form.reset();
        }
        closeDialog();
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (_error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  }

  const submitButtonText =
    mode === "create" ? "Create Concert" : "Update Concert";
  const submittingButtonText =
    mode === "create" ? "Creating..." : "Updating...";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle[mode]}</DialogTitle>
        </DialogHeader>
        {mode === "del" ? (
          <DeleteDialogContent
            concert={currentConcert}
            onDelete={handleDelete}
            onCancel={closeDialog}
            isDeleting={isDeleting}
          />
        ) : (
          <ConcertForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            submitButtonText={submitButtonText}
            submittingButtonText={submittingButtonText}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
