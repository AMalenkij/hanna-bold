"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModelFormStore } from "@/store/useModelFormStore";
import { DeleteDialog } from "./posts/deleteDialog";
import { deleteAction } from "@/actions/deleteAction";
import { createPostAction } from "@/actions/createPostAction";
import { editPostAction } from "@/actions/updatePostAction";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PostForm } from "./posts/postForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postFormSchema } from "./posts/postSchema";
import * as z from "zod";

export function BaseDialog() {
  const { isOpen, mode, current, closeDialog } = useModelFormStore();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title_en: "",
      intro_en: "",
      content_en: "",
      title_pl: "",
      intro_pl: "",
      content_pl: "",
      title_ua: "",
      intro_ua: "",
      content_ua: "",
      slug: "",
      photo: "",
      is_published: false,
    },
  });

  const dialogTitle: Record<string, string> = {
    del: "Delete",
    create: "Add",
    edit: "Edit",
  };

  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    if (!current?.id) return;

    setIsDeleting(true); // Включение состояния загрузки
    const result = await deleteAction(current.id, current.model);
    setIsDeleting(false); // Выключение состояния загрузки

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

  if (!current) return null;

  useEffect(() => {
    if (mode === "edit" && current) {
      form.reset({
        // Multilingual titles
        title_en: current.title_en || "",
        title_uk: current.title_uk || "",
        title_pl: current.title_pl || "",

        // Multilingual intros
        intro_en: current.intro_en || "",
        intro_uk: current.intro_uk || "",
        intro_pl: current.intro_pl || "",

        // Multilingual content
        content_en: current.content_en || "",
        content_uk: current.content_uk || "",
        content_pl: current.content_pl || "",

        // Other fields
        slug: current.slug || "",
        photo: current.photo || "",
        is_published: current.is_published || false,
      });
    } else if (mode === "create") {
      form.reset({
        // Multilingual titles
        title_en: "",
        title_uk: "",
        title_pl: "",

        // Multilingual intros
        intro_en: "",
        intro_uk: "",
        intro_pl: "",

        // Multilingual content
        content_en: "",
        content_uk: "",
        content_pl: "",

        // Other fields
        slug: "",
        photo: "",
        is_published: false,
      });
    }
  }, [current, form, mode]);

  const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Convert form values to FormData
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value?.toString() || "");
    }

    try {
      // Call appropriate action based on mode
      const result =
        mode === "create"
          ? await createPostAction(formData)
          : await editPostAction(current?.id ?? "", formData);

      setIsSubmitting(false);

      // Handle success or error
      if (result.success) {
        toast({
          variant: "default",
          className: "bg-green-500 text-white",
          title: `Post ${mode === "create" ? "created" : "updated"}`,
          description: `The post has been successfully ${mode === "create" ? "created" : "updated"}.`,
        });

        if (mode === "create") {
          form.reset(); // Reset the form after creation
        }
        closeDialog(); // Close the dialog
        router.refresh(); // Refresh the page to fetch new data
      } else {
        toast({
          title: "Error",
          description:
            result.error || "An error occurred while processing your request.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error while submitting form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle[mode]}</DialogTitle>
        </DialogHeader>
        {mode === "del" && (
          <DeleteDialog
            title={current.title}
            onDelete={handleDelete}
            onCancel={closeDialog}
            isDeleting={isDeleting} // Передаем состояние загрузки
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
          />
        )}
        {(mode === "create" || mode === "edit") && (
          <PostForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            submitButtonText={mode === "create" ? "Create Post" : "Update Post"}
            submittingButtonText={
              mode === "create" ? "Creating..." : "Updating..."
            }
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
