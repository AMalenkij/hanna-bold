import LenisProvider from "@/providers/LenisProvider";
import { getTranslations } from "next-intl/server";
import splitTimestamp from "@/utils/splitTimestamp";
import Hero from "@/components/hero";
import { getVideosAndCount } from "@/actions/getVideosAction";
import { getPostsAction } from "@/actions/getPostsAction";
import { MoveDown } from "lucide-react";
import { lazy } from "react";

import type { Locale } from "@/types/common";

const NewsCard = lazy(() => import("@/components/newsCard"));
const Video = lazy(() => import("@/components/videoGallery"));
const About = lazy(() => import("@/components/about"));
const SubHeader = lazy(() => import("@/components/subHeader"));

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
      <div className="container">
        {/* NEWS */}
        <SubHeader
          title={t("title")}
          sectionName={t("sectionName")}
          icon={MoveDown}
        />
        <div className=" mb-8 grid grid-cols-1 gap-x-3 gap-y-16 md:grid-cols-2 lg:mb-24">
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
      </div>
    </LenisProvider>
  );
}
