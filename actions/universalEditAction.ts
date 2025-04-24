"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { POSTS, HOME_ROUTE, GALLERY, CONCERTS } from "@/constants/routes";
import type { Prisma, Posts, Concert, Gallery } from "@prisma/client";

// Типы для конфигурации
type ModelConfig = {
  revalidatePaths: string[];
};

// Определяем маппинг типов данных для каждой модели
type ModelsSchema = {
  posts: Prisma.PostsUpdateInput; // Используем UpdateInput вместо CreateInput
  concerts: Prisma.ConcertUpdateInput;
  gallery: Prisma.GalleryUpdateInput;
};

// Маппинг возвращаемых типов
type ModelReturnTypes = {
  posts: Posts;
  concerts: Concert;
  gallery: Gallery;
};

type ModelKey = keyof ModelsSchema;

// Определяем типы для функций редактирования
type EditFunction<T extends ModelKey> = (
  data: ModelsSchema[T],
  id: string,
) => Promise<ModelReturnTypes[T]>;

// Маппинг редактирования для каждой модели с явной типизацией
const editOperations: { [K in ModelKey]: EditFunction<K> } = {
  posts: async (data, id) => {
    return await prisma.posts.update({
      where: { id },
      data,
    });
  },
  concerts: async (data, id) => {
    return await prisma.concert.update({
      where: { id },
      data,
    });
  },
  gallery: async (data, id) => {
    return await prisma.gallery.update({
      where: { id },
      data,
    });
  },
};

// Конфигурация модели
const modelConfigs: Record<ModelKey, ModelConfig> = {
  posts: { revalidatePaths: [POSTS, HOME_ROUTE] },
  concerts: { revalidatePaths: [CONCERTS, HOME_ROUTE] },
  gallery: { revalidatePaths: [GALLERY, HOME_ROUTE] },
};

export async function universalEditAction<T extends ModelKey>(params: {
  model: T;
  data: ModelsSchema[T];
  id: string;
}) {
  try {
    const editFunction = editOperations[params.model];
    const config = modelConfigs[params.model];

    if (!editFunction) throw new Error(`Unknown model: ${params.model}`);

    // TypeScript теперь знает правильные типы благодаря mapped types
    const result = await editFunction(params.data, params.id);

    // Инвалидируем пути
    config.revalidatePaths.forEach((path) => revalidatePath(path));

    return {
      success: true,
      message: `${params.model} successfully updated`,
      data: result,
    };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(`Error editing ${params.model}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "update failed",
    };
  }
}
