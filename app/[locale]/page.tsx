import About from "@/components/about";
import Video from "@/components/videoGallery";
import LenisProvider from "@/providers/LenisProvider";
import SubHeader from "@/components/subHeader";
import { getTranslations } from "next-intl/server";
import NewsCard from "@/components/newsCard";
import splitTimestamp from "@/utils/splitTimestamp";
import Hero from "@/components/hero";
import type { Locale } from "@/types/common";
import { getVideosAndCount } from "@/actions/getVideosAction";
import { getPostsAction } from "@/actions/getPostsAction";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const { videos, count } = await getVideosAndCount();
const posts = await getPostsAction();

export default async function Home({ params }: Props) {
  const t = await getTranslations("Posts");
  const tVideo = await getTranslations("VideoGallery");
  const { locale } = await params;

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
              imageUrl={post.photo}
              slug={post.slug}
            />
          </div>
        ))}
      </div>
      {/* ABOUT */}
      <About />
      {/* VIDEO */}
      <Video
        videoData={videos}
        locale={locale}
        header={
          <SubHeader
            title={tVideo("title")}
            sectionName={tVideo("subHeader")}
            variant="withСounterNotIcon"
            counter={count}
          />
        }
      />
    </LenisProvider>
  );
}
