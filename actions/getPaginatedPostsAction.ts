"use server";

import { PrismaClient } from "@prisma/client";
import type { Locale } from "@/types/common";

const prisma = new PrismaClient();

export default async function getPaginatedPostsAction(params: {
  page: number;
  locale: Locale;
  published?: boolean;
}) {
  const { page = 1, published = true } = params;

  const pageSize = 4;
  const skip = (page - 1) * pageSize;

  // Получаем посты
  const posts = await prisma.posts.findMany({
    where: {
      is_published: published,
    },
    orderBy: { created_at: "desc" },
    take: pageSize,
    skip: skip,
  });

  // Получаем общее количество постов
  const totalPosts = await prisma.posts.count({
    where: {
      is_published: published,
    },
  });

  return {
    posts,
    pagination: {
      currentPage: page,
      pageSize,
      totalPosts,
      totalPages: Math.ceil(totalPosts / pageSize),
    },
  };
}
