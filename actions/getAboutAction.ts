import { prisma } from "@/utils/prisma";

export async function getAboutAction() {
  const [images, publishedCount] = await Promise.all([
    prisma.gallery.findMany({
      select: {
        publicId: true,
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.gallery.count(),
  ]);

  return { images, publishedCount };
}
