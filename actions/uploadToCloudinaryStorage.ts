"use server";

import { cloudinary } from "@/lib/cloudinary";
import type { UploadApiOptions } from "cloudinary";

type CloudinaryUploadOptions = {
  file: File;
  name: string;
  folder: string;
  tags?: string[];
  allowedFormats?: string[];
};

export async function uploadToCloudinaryStorage({
  file,
  name,
  folder,
  tags,
  allowedFormats = ["jpg", "png", "webp"],
}: CloudinaryUploadOptions) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<string>((resolve, reject) => {
    const uploadOptions: UploadApiOptions = {
      public_id: name,
      folder,
      tags,
      overwrite: true,
      allowed_formats: allowedFormats,
      filename_override: name,
    };

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error || !result) {
          // biome-ignore lint/suspicious/noConsole: <explanation>
          console.error("Cloudinary upload error:", error);
          reject(error?.message || "Upload failed");
          return;
        }
        resolve(result.public_id);
      })
      .end(buffer);
  });
}
