"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Gallery } from "@prisma/client";
import type { PostPreview } from "@/actions/getGalleryAction";
import { universalEditAction } from "@/actions/universalEditAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type GalleryWithoutTime = Omit<Gallery, "createdAt">;
type EditDialogContentProps = {
  model: GalleryWithoutTime;
  posts: PostPreview[];
};

export function EditDialogGallery({ model, posts }: EditDialogContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await universalEditAction({
        model: "gallery",
        id: model.id,
        data: {
          post: selectedPostId
            ? { connect: { id: selectedPostId } }
            : { disconnect: true },
        },
      });

      if (result.success) {
        toast({
          title: "Фото обновлено",
          description: "Изменения успешно сохранены",
        });
        router.refresh();
      }
    } catch {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при сохранении",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Сдесь вы можете связать фото с событием</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        <div className="space-y-2">
          <label htmlFor="post-select" className="font-medium text-sm">
            Привязать к посту
          </label>
          <Select onValueChange={(value) => setSelectedPostId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите пост" />
            </SelectTrigger>
            <SelectContent>
              {posts?.map(({ id, title_en }) => (
                <SelectItem
                  key={id}
                  value={id}
                  onFocus={(e) => e.stopPropagation()}
                >
                  {id === model.postId ? (
                    <span className="text-red-500">{title_en}</span>
                  ) : (
                    title_en
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Загрузка..." : "Сохранить"}
        </Button>
      </form>
    </>
  );
}
