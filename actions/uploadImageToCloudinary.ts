"use server";

import { cloudinary } from "@/lib/cloudinary";

export async function uploadImageToCloudinary(file: File, slug: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<string>((resolve, reject) => {
    // Теперь возвращаем только public_id
    cloudinary.uploader
      .upload_stream(
        {
          public_id: slug, // Структурируем public_id
          upload_preset: "hanna-bold",
          tags: ["posts"],
          overwrite: true,
          allowed_formats: ["jpg", "png", "webp"],
          filename_override: slug,
        },
        (error, result) => {
          if (error || !result) {
            // biome-ignore lint/suspicious/noConsole: <explanation>
            console.error("Cloudinary upload error:", error);
            reject(error?.message || "Upload failed");
            return;
          }
          resolve(result.public_id); // Возвращаем только public_id
        },
      )
      .end(buffer);
  });
}
