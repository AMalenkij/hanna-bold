import { PrismaClient } from "@prisma/client";
import type { Locale } from "@/types/common";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

async function fetchPaginatedPosts(params: {
  page?: number;
  locale: Locale;
  published?: boolean;
}) {
  const { page = 1, published = true } = params;

  const pageSize = 4;
  const skip = (page - 1) * pageSize;

  const posts = await prisma.posts.findMany({
    where: {
      is_published: published,
    },
    orderBy: { created_at: "desc" },
    take: pageSize,
    skip: skip,
  });

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

export const getPaginatedPosts = unstable_cache(fetchPaginatedPosts);
