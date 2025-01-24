"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function deleteAction(id: string) {
  try {
    await prisma.posts.delete({
      where: { id },
    });
    revalidatePath("/posts"); // Adjust path as needed
    return { success: true };
  } catch (error) {
    console.error("Failed to delete posts:", error);
    return { success: false, error: "Failed to delete posts" };
  }
}
