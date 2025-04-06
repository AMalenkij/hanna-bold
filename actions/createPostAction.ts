"use server";

import { PrismaClient } from "@prisma/client";
import { uploadImageToCloudinary } from "./uploadImageToCloudinary";
import { revalidatePath } from "next/cache";
import { POSTS, HOME_ROUTE } from "@/constants/routes";

const prisma = new PrismaClient();

export async function createPostAction(formData: FormData) {
  try {
    const file = formData.get("photo") as File;
    const slug = formData.get("slug") as string;

    let photoPublicId = "";
    if (file.size > 0) {
      photoPublicId = await uploadImageToCloudinary(file, slug);
    }

    const post = await prisma.posts.create({
      data: {
        title_en: formData.get("title_en") as string,
        title_ua: formData.get("title_ua") as string,
        title_pl: formData.get("title_pl") as string,

        intro_en: formData.get("intro_en") as string,
        intro_ua: formData.get("intro_ua") as string,
        intro_pl: formData.get("intro_pl") as string,

        content_en: formData.get("content_en") as string,
        content_ua: formData.get("content_ua") as string,
        content_pl: formData.get("content_pl") as string,

        slug,
        photo: photoPublicId, // Сохраняем только public_id
        is_published: formData.get("is_published") === "true",
      },
    });

    revalidatePath(POSTS);
    revalidatePath(HOME_ROUTE);
    return { success: true, post };
  } catch (error) {
    console.error("Failed to create post:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create post",
    };
  }
}
