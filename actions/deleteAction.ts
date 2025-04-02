"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { POSTS, HOME_ROUTE } from "@/constants/routes";

export async function deleteAction(id: string) {
  try {
    await prisma.posts.delete({
      where: { id },
    });
    revalidatePath(POSTS);
    revalidatePath(HOME_ROUTE);
    return { success: true };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Failed to delete posts:", error);
    return { success: false, error: "Failed to delete posts" };
  }
}
