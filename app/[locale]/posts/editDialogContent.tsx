"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { postFormSchema } from "./postSchema";
import { PostForm } from "./postForm";
import type * as z from "zod";
import { EditPostAction } from "@/actions/editPostAction";

interface EditDialogContentProps {
  model: {
    id: string;
    title_en: string;
    title_pl: string;
    title_uk: string;
    intro_en: string;
    intro_pl: string;
    intro_uk: string;
    content_en: string;
    content_pl: string;
    content_uk: string;
    slug: string;
    photo: string;
    is_published: boolean;
  };
}

export function EditDialogContent({ model }: EditDialogContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title_en: "",
      intro_en: "",
      content_en: "",
      title_pl: "",
      intro_pl: "",
      content_pl: "",
      title_uk: "",
      intro_uk: "",
      content_uk: "",
      slug: "",
      photo: "",
      is_published: false,
    },
  });

  useEffect(() => {
    form.reset({
      // Multilingual titles
      title_en: model.title_en || "",
      title_uk: model.title_uk || "",
      title_pl: model.title_pl || "",
      // Multilingual intros
      intro_en: model.intro_en || "",
      intro_uk: model.intro_uk || "",
      intro_pl: model.intro_pl || "",
      // Multilingual content
      content_en: model.content_en || "",
      content_uk: model.content_uk || "",
      content_pl: model.content_pl || "",
      // Other fields
      slug: model.slug || "",
      photo: model.photo || "",
      is_published: model.is_published || false,
    });
  }, [model, form]);

  const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("id", model.id);
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value?.toString() || "");
    });

    try {
      const result = await EditPostAction(model.id, formData);
      if (result.success) {
        toast({
          title: `Post updated`,
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
