"use server";

import { prisma } from "@/utils/prisma";

export const getVideosAndCount = async () => {
  const [videos, count] = await Promise.all([
    prisma.video.findMany({}),
    prisma.video.count({}),
  ]);

  return { videos, count };
};
