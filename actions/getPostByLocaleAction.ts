"use server";

import { prisma } from "@/utils/prisma";
import type { Locale } from "@/types/common";

export type LocalizedField<T extends string> = {
  [key in `${T}_${Locale}`]: string;
};

export type PostWithLocale = {
  id: string;
  slug: string;
  photo: string;
  created_at: Date;
  is_published: boolean;
} & LocalizedField<"title"> &
  LocalizedField<"content"> &
  Partial<LocalizedField<"intro">>;

// Define a generic type for the locale-specific post fields
export const getPostByLocaleAction = async ({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) => {
  const post = await prisma.posts.findFirst({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      slug: true,
      photo: true,
      created_at: true,
      is_published: true,
      [`title_${locale}`]: true,
      [`intro_${locale}`]: true,
      [`content_${locale}`]: true,
    },
  });

  return { post: post as PostWithLocale | null };
};
