"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormGallery } from "./formGallery";
import { universalCreateAction } from "@/actions/universalCreateAction";
import { uploadToCloudinaryStorage } from "@/actions/uploadToCloudinaryStorage";
import { galleryFormSchema, type galleryFormValues } from "./galleryFormSchema";
import type { PostPreview } from "@/actions/getGalleryAction";

export function CreateDialogGallery({ posts }: { posts: PostPreview[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Инициализация формы
  const form = useForm<galleryFormValues>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      name: "",
      photo: "",
      postId: null,
    },
  });

  const onSubmit = async (values: galleryFormValues) => {
    setIsSubmitting(true);

    try {
      if (!(values.photo instanceof File)) {
        throw new Error("Необходимо выбрать файл");
      }

      const publicId = values.name;
      const uploadedPhotoPublicId = await uploadToCloudinaryStorage({
        file: values.photo,
        name: publicId,
        folder: "gallery",
      });

      const result = await universalCreateAction({
        model: "gallery",
        data: {
          publicId: uploadedPhotoPublicId,
          post: values.postId ? { connect: { id: values.postId } } : undefined,
        },
      });

      if (result.success) {
        toast({
          title: "Фото добавлено",
          description: "Изображение успешно загружено в галерею.",
        });

        form.reset();
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error
            ? error.message
            : "Произошла ошибка при создании фото.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Добавить фото</DialogTitle>
      </DialogHeader>
      <FormGallery
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Добавить"
        submittingButtonText="Добавление..."
        posts={posts}
      />
    </>
  );
}
