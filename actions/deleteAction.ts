"use server";
import { prisma } from "@/utils/prisma";

type ValidModels = "concerts" | "posts";

export async function deleteAction(id: string, model: ValidModels) {
  try {
    const prismaModel = prisma[model];

    await prismaModel.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete ${model}:`, error);
    return {
      success: false,
      error: `Failed to delete ${model}`,
    };
  }
}
