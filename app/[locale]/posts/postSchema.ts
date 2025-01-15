import * as z from "zod";

export const postFormSchema = z.object({
  // Multilingual titles
  title_en: z.string().min(1, "Title in English is required"),
  title_uk: z.string().min(1, "Title in Ukrainian is required"),
  title_pl: z.string().min(1, "Title in Polish is required"),

  // Multilingual intros
  intro_en: z.string().min(1, "Introduction in English is required"),
  intro_uk: z.string().min(1, "Introduction in Ukrainian is required"),
  intro_pl: z.string().min(1, "Introduction in Polish is required"),

  // Multilingual content
  content_en: z.string().min(1, "Content in English is required"),
  content_uk: z.string().min(1, "Content in Ukrainian is required"),
  content_pl: z.string().min(1, "Content in Polish is required"),

  // Slug
  slug: z.string().min(1, "Slug is required"),

  // Optional photo URL
  photo: z.string().optional(),

  // Published status
  is_published: z.boolean().default(false),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
