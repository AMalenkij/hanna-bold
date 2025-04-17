"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { POSTS, HOME_ROUTE, GALLERY, CONCERTS } from "@/constants/routes";

// Маппинг действий удаления для каждой модели
const deleteActions = {
  posts: async (id: string) => {
    await prisma.posts.delete({ where: { id } });
  },
  concerts: async (id: string) => {
    await prisma.concert.delete({ where: { id } });
  },
  gallery: async (id: string) => {
    await prisma.gallery.delete({ where: { id } });
  },
  // Легко добавить новые модели по мере необходимости
};

// Типизированные ключи
type ModelKey = keyof typeof deleteActions;

// Конфигурация для моделей
type ModelConfig = {
  revalidatePaths: string[];
  modelDisplayName?: string;
};

// Конфигурация модели
const modelConfigs: Record<ModelKey, ModelConfig> = {
  posts: {
    revalidatePaths: [POSTS, HOME_ROUTE],
    modelDisplayName: "post",
  },
  concerts: {
    revalidatePaths: [CONCERTS, HOME_ROUTE],
    modelDisplayName: "concert",
  },
  gallery: {
    revalidatePaths: [GALLERY, HOME_ROUTE],
    modelDisplayName: "gallery item",
  },
};

/**
 * Универсальное действие удаления записи
 * @param model - Тип модели из конфигурации (posts, concerts, gallery, etc.)
 * @param id - ID записи для удаления
 */
export async function universalDeleteAction(model: ModelKey, id: string) {
  try {
    // 1. Получаем функцию удаления и конфигурацию
    const deleteAction = deleteActions[model];
    const config = modelConfigs[model];

    if (!deleteAction) throw new Error(`Unknown model: ${model}`);

    // 2. Выполняем удаление
    await deleteAction(id);

    // 3. Ревалидация путей
    config.revalidatePaths.forEach((path) => revalidatePath(path));

    return {
      success: true,
      modelDisplayName: config.modelDisplayName || model,
    };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(`Failed to delete ${model}:`, error);
    return {
      success: false,
      error: `Failed to delete ${model}`,
      modelDisplayName: modelConfigs[model]?.modelDisplayName || model,
    };
  }
}
