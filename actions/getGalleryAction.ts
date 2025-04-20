import { prisma } from "@/utils/prisma";
import type { Prisma } from "@prisma/client";

export async function getGalleryAction() {
  return Promise.all([
    prisma.gallery.findMany({
      select: {
        id: true,
        publicId: true,
        postId: true,
        post: {
          select: {
            id: true,
            photo: true,
            title_en: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.posts.findMany({
      select: {
        id: true,
        title_en: true,
        photo: true,
      },
    }),
    prisma.gallery.count(),
  ]);
}

export type GalleryWithPost = Prisma.GalleryGetPayload<{
  select: {
    id: true;
    publicId: true;
    postId: true;
    post: {
      select: {
        id: true;
        photo: true;
        title_en: true;
      };
    };
  };
}>;

export type PostPreview = Prisma.PostsGetPayload<{
  select: {
    id: true;
    title_en: true;
    photo: true;
  };
}>;
