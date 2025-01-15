import HeroComponent from "@/components/heroComponent";
import NewsCard from "@/components/newsCard";
import NewsHeader from "@/components/newsHeader";
import LenisProvider from "@/providers/LenisProvider";
import HeroImg from "@/public/img/Hero.jpg";
import NewsImg from "@/public/img/newsImg.jpg";
import { prisma } from "@/utils/prisma";

const content = {
  hero: {
    heading: "Change in Band Lineup",
    date: "2024.02.26",
    announcement:
      "With deep sadness, we announce that our talented drummer, Kir, has left our band due to relocating to another country. This is a tough moment for us as Kir was not only a professional but also a good friend.",
    buttonLabel: "Read On",
  },
  newsSection: {
    sectionName: "What's going on",
    title: "News",
    cards: [
      {
        date: "2024.02.26",
        title: "Change in Band Lineup",
        content:
          "With deep sadness, we announce that our talented drummer, Kir, has left our band due to relocating to another country. This is a tough moment for us as Kir was not only a professional but also a good friend.",
        imageUrl: HeroImg.src,
      },
      {
        date: "2024.02.26",
        title: "Recording New Tracks in Warsaw!",
        content:
          "Hey! We recently visited a studio in Warsaw, crafting some fresh tunes. It takes a bit of time, but we're putting our hearts into it to bring you something special.",
        imageUrl: NewsImg.src,
      },
    ],
  },
};

export default async function Home() {
  const posts = await prisma.posts.findMany({
    where: {
      is_published: true, // Условие на опубликованные посты
    },
    orderBy: {
      created_at: "desc", // Сортировка от нового к старому
    },
    take: 4, // Ограничение на 4 записи
  });

  return (
    <LenisProvider>
      <HeroComponent
        heading={content.hero.heading}
        date={content.hero.date}
        announcement={content.hero.announcement}
        buttonLabel={content.hero.buttonLabel}
      />
      <NewsHeader
        sectionName={content.newsSection.sectionName}
        title={content.newsSection.title}
      />
      <div className="grid grid-cols-2 gap-3 px-4">
        {posts.map((elm) => (
          <NewsCard
            key={elm.id}
            date={elm.created_at}
            title={elm.title_en}
            content={elm.intro_en}
            imageUrl={elm.photo}
          />
        ))}
      </div>
    </LenisProvider>
  );
}
