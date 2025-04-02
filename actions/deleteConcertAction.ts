"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { POSTS } from "@/constants/routes";

export async function deleteConcertAction(id: string) {
  try {
    await prisma.concert.delete({
      where: { id },
    });
    revalidatePath(POSTS); // Adjust path as needed
    return { success: true };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Failed to delete concert:", error);
    return { success: false, error: "Failed to delete concert" };
  }
}
