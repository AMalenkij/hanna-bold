"use server";

import { PrismaClient } from "@prisma/client";
import { uploadImageToCloudinary } from "./uploadImageToCloudinary";

const prisma = new PrismaClient();

export async function createPostAction(formData: FormData) {
  try {
    const file = formData.get("photo") as File;
    const slug = formData.get("slug") as string;

    let photoUrl = "";
    if (file.size > 0) {
      photoUrl = await uploadImageToCloudinary(file, slug);
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
        photo: photoUrl,
        is_published: formData.get("is_published") === "true",
      },
    });

    return { success: true, post };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
