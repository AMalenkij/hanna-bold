"use server";

import { cloudinary } from "@/lib/cloudinary";

export async function deleteImageFromCloudinary(photo: string) {
  try {
    // Include the folder in the public_id
    const publicId = photo;

    const cloudinaryResponse = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
    if (cloudinaryResponse.result === "not found") {
      return {
        success: false,
        error: "Image not found in Cloudinary",
      };
    }

    if (cloudinaryResponse.result !== "ok") {
      return {
        success: false,
        error: `Cloudinary error: ${cloudinaryResponse.result}`,
      };
    }

    return { success: true };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Cloudinary deletion error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Cloudinary deletion failed",
    };
  }
}
