"use client";

import { createConcertAction } from "@/actions/createConcertAction";
import { updateConcertAction } from "@/actions/updateConcertAction";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ConcertForm, concertFormSchema } from "./concertForm";
import type { Concert } from "@prisma/client";

type Props =
  | {
      mode: "create";
      currentConcert?: null;
    }
  | {
      mode: "edit";
      currentConcert: Concert;
    };

export function DialogConcert({ mode, currentConcert }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const dialogTitle: Record<"create" | "edit", string> = {
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
    <>
      <DialogHeader>
        <DialogTitle>{dialogTitle[mode]}</DialogTitle>
      </DialogHeader>
      <ConcertForm
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitButtonText={submitButtonText}
        submittingButtonText={submittingButtonText}
      />
    </>
  );
}
