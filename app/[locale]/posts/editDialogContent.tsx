"use client";
import { EditPostAction } from "@/actions/editPostAction";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PostForm } from "./postForm";
import { postFormSchema, type PostFormValues } from "./postSchema";
import type { Posts } from "@prisma/client";

interface EditDialogContentProps {
  model: Posts;
}

export function EditDialogContent({ model }: EditDialogContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title_en: "",
      title_ua: "",
      title_pl: "",
      intro_en: "",
      intro_ua: "",
      intro_pl: "",
      content_en: "",
      content_ua: "",
      content_pl: "",
      slug: "",
      photo: model.photo, // Передаем текущее фото
      is_published: false,
    },
  });

  useEffect(() => {
    form.reset({
      title_en: model.title_en,
      title_ua: model.title_ua,
      title_pl: model.title_pl,
      intro_en: model.intro_en,
      intro_ua: model.intro_ua,
      intro_pl: model.intro_pl,
      content_en: model.content_en,
      content_ua: model.content_ua,
      content_pl: model.content_pl,
      slug: model.slug,
      photo: model.photo,
      is_published: model.is_published,
    });
  }, [model, form]);

  const onSubmit = async (values: PostFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }

    try {
      const result = await EditPostAction(model.id, formData);
      if (result.success) {
        toast({
          title: "Post updated",
          description: "The post has been successfully updated.",
        });
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
        <DialogTitle>Edit Post</DialogTitle>
      </DialogHeader>
      <PostForm
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Update Post"
        submittingButtonText="Updating..."
      />
    </>
  );
}
