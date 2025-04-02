"use server";

import { prisma } from "@/utils/prisma";

export const getPostsAction = async (limit = 4) => {
  return prisma.posts.findMany({
    where: {
      is_published: true,
    },
    orderBy: { created_at: "desc" },
    take: limit,
  });
};
