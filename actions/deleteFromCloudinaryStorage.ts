"use server";

import { cloudinary } from "@/lib/cloudinary";

// Типы ресурсов в Cloudinary
type CloudinaryResourceType = "image" | "video" | "raw" | "auto";

export async function deleteFromCloudinaryStorage(
  publicId: string,
  resourceType: CloudinaryResourceType,
) {
  try {
    const cloudinaryResponse = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
    if (cloudinaryResponse.result === "not found") {
      return {
        success: false,
        error: `Resource not found in Cloudinary: ${publicId}`,
        details: cloudinaryResponse,
      };
    }

    if (cloudinaryResponse.result !== "ok") {
      return {
        success: false,
        error: `Cloudinary error: ${cloudinaryResponse.result}`,
        details: cloudinaryResponse,
      };
    }

    return {
      success: true,
      details: cloudinaryResponse,
    };
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
