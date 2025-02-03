// postSchema.ts
import * as z from "zod";

export const postFormSchema = z.object({
  title_en: z.string().min(1, "Title in English is required"),
  title_ua: z.string().min(1, "Title in Ukrainian is required"),
  title_pl: z.string().min(1, "Title in Polish is required"),

  intro_en: z.string().min(1, "Introduction in English is required"),
  intro_ua: z.string().min(1, "Introduction in Ukrainian is required"),
  intro_pl: z.string().min(1, "Introduction in Polish is required"),

  content_en: z.string().min(1, "Content in English is required"),
  content_ua: z.string().min(1, "Content in Ukrainian is required"),
  content_pl: z.string().min(1, "Content in Polish is required"),

  slug: z.string().min(1, "Slug is required"),
  photo: z.string(),
  is_published: z.boolean().default(false),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
