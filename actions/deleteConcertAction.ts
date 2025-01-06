"use server";

import { prisma } from "@/utils/prisma";

export async function deleteConcertAction(id: string) {
  try {
    await prisma.concert.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete concert:", error);
    return { success: false, error: "Failed to delete concert" };
  }
}
