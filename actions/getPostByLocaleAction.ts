import { unstable_cache } from "next/cache";
import { prisma } from "@/utils/prisma";
import type { Locale } from "@/types/common";

export const getPostByLocaleAction = unstable_cache(
  async ({ slug, locale }: { slug: string; locale: Locale }) => {
    const post = await prisma.posts.findFirst({
      where: {
        slug: slug,
        [`title_${locale}`]: { not: undefined },
      },
      select: {
        id: true,
        slug: true,
        [`title_${locale}`]: true,
        [`intro_${locale}`]: true,
        [`content_${locale}`]: true,
        photo: true,
        created_at: true,
      },
    });
    return { post };
  },
);
