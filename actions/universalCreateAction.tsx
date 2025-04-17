//universalCreateAction
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
  posts: Prisma.PostsCreateInput;
  concerts: Prisma.ConcertCreateInput;
  gallery: Prisma.GalleryCreateInput;
};

// Маппинг возвращаемых типов
type ModelReturnTypes = {
  posts: Posts;
  concerts: Concert;
  gallery: Gallery;
};

type ModelKey = keyof ModelsSchema;

// Определяем типы для функций создания
type CreateFunction<T extends ModelKey> = (
  data: ModelsSchema[T],
) => Promise<ModelReturnTypes[T]>;

// Маппинг создания для каждой модели с явной типизацией
const createActions: { [K in ModelKey]: CreateFunction<K> } = {
  posts: async (data) => {
    return await prisma.posts.create({ data });
  },
  concerts: async (data) => {
    return await prisma.concert.create({ data });
  },
  gallery: async (data) => {
    return await prisma.gallery.create({ data });
  },
};

// Конфигурация модели
const modelConfigs: Record<ModelKey, ModelConfig> = {
  posts: { revalidatePaths: [POSTS, HOME_ROUTE] },
  concerts: { revalidatePaths: [CONCERTS, HOME_ROUTE] },
  gallery: { revalidatePaths: [GALLERY, HOME_ROUTE] },
};

export async function universalCreateAction<T extends ModelKey>(params: {
  model: T;
  data: ModelsSchema[T];
}) {
  try {
    const createAction = createActions[params.model];
    const config = modelConfigs[params.model];

    if (!createAction) throw new Error(`Unknown model: ${params.model}`);

    // TypeScript теперь знает правильные типы благодаря mapped types
    const result = await createAction(params.data);

    // Инвалидируем пути
    config.revalidatePaths.forEach((path) => revalidatePath(path));

    return {
      success: true,
      message: `${params.model} successfully created`,
      data: result,
    };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(`Error creating ${params.model}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "creation failed",
    };
  }
}
