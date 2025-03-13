import About from "@/components/about";
import Video from "@/components/videoGallery";
import LenisProvider from "@/providers/LenisProvider";
import SubHeader from "@/components/subHeader";
import { getTranslations } from "next-intl/server";
import { PrismaClient } from "@prisma/client";
import NewsCard from "@/components/newsCard";
import splitTimestamp from "@/utils/splitTimestamp";
import Hero from "@/components/hero";
import type { Locale } from "@/types/common";

interface Props {
  params: Promise<{ locale: Locale }>;
}
const prisma = new PrismaClient();

export default async function Home({ params }: Props) {
  const t = await getTranslations("Posts");
  const tVideo = await getTranslations("VideoGallery");
  const { locale } = await params;

  // Получаем посты
  const posts = await prisma.posts.findMany({
    where: {
      is_published: true,
    },
    orderBy: { created_at: "desc" },
    take: 4,
  });
  const getVideoAction = await prisma.video.findMany({});
  return (
    <LenisProvider>
      {/* HERO */}
      <Hero />
      {/* NEWS */}
      <SubHeader title={t("title")} sectionName={t("sectionName")} />
      <div className="mb-16 grid grid-cols-1 gap-x-3 gap-y-10 px-4 md:grid-cols-2">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            <NewsCard
              key={post.id}
              date={splitTimestamp(post.created_at)}
              title={post[`title_${locale}`]}
              content={post[`intro_${locale}`]}
              imageUrl={post.photo ?? ""}
              slug={post.slug}
            />
          </div>
        ))}
      </div>
      {/* ABPUT */}
      <About />
      {/* VIDEO */}
      <Video
        videoData={getVideoAction}
        locale={locale}
        header={
          <SubHeader
            title={tVideo("title")}
            sectionName={tVideo("subHeader")}
            variant="withСounterNotIcon"
            counter="04"
          />
        }
      />
    </LenisProvider>
  );
}
