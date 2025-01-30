"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPostAction(formData: FormData) {
  try {
    const post = await prisma.posts.create({
      data: {
        // Multilingual titles
        title_en: formData.get("title_en") as string,
        title_ua: formData.get("title_ua") as string,
        title_pl: formData.get("title_pl") as string,

        // Multilingual intros
        intro_en: formData.get("intro_en") as string,
        intro_ua: formData.get("intro_ua") as string,
        intro_pl: formData.get("intro_pl") as string,

        // Multilingual content
        content_en: formData.get("content_en") as string,
        content_ua: formData.get("content_ua") as string,
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
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
