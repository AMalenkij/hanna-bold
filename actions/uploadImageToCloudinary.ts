"use server";

import { cloudinary } from "@/lib/cloudinary";

export async function uploadImageToCloudinary(file: File, slug: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `${slug}-post`, // Используем подчеркивание вместо дефиса
          folder: "hanna",
          upload_preset: "hanna-bold",
          tags: ["posts"],
          overwrite: true,
          allowed_formats: ["jpg", "png", "webp"], // Явно указываем форматы
          filename_override: `${slug}-post`, // Принудительное переопределение имени
        },
        (error, result) => {
          if (error || !result) {
            // biome-ignore lint/suspicious/noConsole: <explanation>
            console.error("Cloudinary upload error:", error);
            reject(error || "Unknown error");
            return;
          }
          // biome-ignore lint/suspicious/noConsole: <explanation>
          console.log("Uploaded image details:", {
            public_id: result.public_id,
            url: result.secure_url,
          });
          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
}
