"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { POSTS } from "@/constants/routes";

const prisma = new PrismaClient();

export async function updateConcertAction(id: string, formData: FormData) {
  try {
    const updatedConcert = await prisma.concert.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        date: new Date(formData.get("date") as string),
        city: formData.get("city") as string,
        venueName: formData.get("venueName") as string,
        address: formData.get("address") as string,
        link: (formData.get("link") as string) || null,
      },
    });
    revalidatePath(POSTS); // Adjust path as needed
    return { success: true, concert: updatedConcert };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Failed to update concert:", error);
    return { success: false, error: "Failed to update concert" };
  }
}
