"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { CONCERTS } from "@/constants/routes";

const prisma = new PrismaClient();

export async function createConcertAction(formData: FormData) {
  try {
    const concert = await prisma.concert.create({
      data: {
        title: formData.get("title") as string,
        date: new Date(formData.get("date") as string),
        city: formData.get("city") as string,
        venueName: formData.get("venueName") as string,
        address: formData.get("address") as string,
        link: (formData.get("link") as string) || null,
      },
    });
    revalidatePath(CONCERTS);
    return { success: true, concert };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Failed to create concert:", error);
    return { success: false, error: "Failed to create concert" };
  }
}
