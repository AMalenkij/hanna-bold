// postSchema.ts
import * as z from "zod";

export const galleryFormSchema = z.object({
  name: z.string().min(1, "Название обязателено"),
  photo: z.union([
    z.instanceof(File, { message: "Image is required" }),
    z.string(),
  ]),
  postId: z.string().optional().nullable(),
});

export type galleryFormValues = z.infer<typeof galleryFormSchema>;
