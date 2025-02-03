"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { postFormSchema } from "./postSchema";
import { PostForm } from "./postForm";
import { createPostAction } from "@/actions/createPostAction";
import type * as z from "zod";

export function CreateDialogContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title_en: "",
      title_pl: "",
      title_ua: "",
      intro_en: "",
      intro_pl: "",
      intro_ua: "",
      content_en: "",
      content_pl: "",
      content_ua: "",
      slug: "",
      photo: "",
      is_published: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
    setIsSubmitting(true);
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value?.toString() || "");
    }

    try {
      const result = await createPostAction(formData);

      if (result.success) {
        toast({
          title: "Post created",
          description: "The post has been successfully created.",
        });

        form.reset();
        router.refresh();
      } else {
        throw new Error(result.error || "An error occurred");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create</DialogTitle>
      </DialogHeader>
      <PostForm
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Create Post"
        submittingButtonText="Creating..."
      />
    </>
  );
}
