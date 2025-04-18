"use server";

import { cloudinary } from "@/lib/cloudinary";

export async function uploadImageToCloudinary(file: File, name: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<string>((resolve, reject) => {
    // Теперь возвращаем только public_id
    cloudinary.uploader
      .upload_stream(
        {
          public_id: name, // Структурируем public_id
          // upload_preset: "hanna-bold",
          folder: "gallery",
          tags: ["gallery"],
          overwrite: true,
          allowed_formats: ["jpg", "png", "webp"],
          filename_override: `${name}.jpg`,
        },
        (error, result) => {
          if (error || !result) {
            // biome-ignore lint/suspicious/noConsole: <explanation>
            console.error("Cloudinary upload error:", error);
            reject(error?.message || "Upload failed");
            return;
          }
          resolve(result.public_id); // Возвращаем public_id
        },
      )
      .end(buffer);
  });
}
