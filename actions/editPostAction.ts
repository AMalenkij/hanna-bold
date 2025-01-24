"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function EditPostAction(id: string, formData: FormData) {
  try {
    const post = await prisma.posts.update({
      where: { id },
      data: {
        // Multilingual titles
        title_en: formData.get("title_en") as string,
        title_uk: formData.get("title_uk") as string,
        title_pl: formData.get("title_pl") as string,

        // Multilingual intros
        intro_en: formData.get("intro_en") as string,
        intro_uk: formData.get("intro_uk") as string,
        intro_pl: formData.get("intro_pl") as string,

        // Multilingual content
        content_en: formData.get("content_en") as string,
        content_uk: formData.get("content_uk") as string,
        content_pl: formData.get("content_pl") as string,

        // Slug
        slug: formData.get("slug") as string,

        // Optional fields
        photo: (formData.get("photo") as string) || null,
        is_published: formData.get("is_published") === "true",
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error("Failed to edit post:", error);
    return { success: false, error: "Failed to edit post" };
  }
}
