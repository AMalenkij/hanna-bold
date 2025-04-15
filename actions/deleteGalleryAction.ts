"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { GALLERY, HOME_ROUTE } from "@/constants/routes";

export async function deleteGalleryAction(id: string) {
  try {
    await prisma.gallery.delete({
      where: { id },
    });
    revalidatePath(GALLERY); // Adjust path as needed
    revalidatePath(HOME_ROUTE);
    return { success: true };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Failed to delete :", error);
    return { success: false, error: "Failed to delete resource" };
  }
}
