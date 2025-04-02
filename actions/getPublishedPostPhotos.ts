"use server";

import { prisma } from "@/utils/prisma";

export async function getPublishedPostPhotos() {
  return prisma.posts.findMany({
    where: {
      is_published: true,
    },
    orderBy: { created_at: "desc" },
    select: {
      photo: true,
    },
  });
}

// Функция для получения количества опубликованных постов
export async function getPublishedPostsCount() {
  return prisma.posts.count({
    where: {
      is_published: true,
    },
  });
}
