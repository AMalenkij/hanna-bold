import HeroComponent from '@/components/heroComponent'
import NewsCard from '@/components/newsCard'
import NewsHeader from '@/components/newsHeader'
import LenisProvider from '@/providers/LenisProvider'
import HeroImg from '@/public/img/Hero.jpg'
import NewsImg from '@/public/img/newsImg.jpg'
import Footer from './footer'
const content = {
  hero: {
    heading: 'Change in Band Lineup',
    date: '2024.02.26',
    announcement:
      'With deep sadness, we announce that our talented drummer, Kir, has left our band due to relocating to another country. This is a tough moment for us as Kir was not only a professional but also a good friend.',
    buttonLabel: 'Read On',
  },
  newsSection: {
    sectionName: "What's going on",
    title: "News",
    cards: [
      {
        date: "2024.02.26",
        title: "Change in Band Lineup",
        content: "With deep sadness, we announce that our talented drummer, Kir, has left our band due to relocating to another country. This is a tough moment for us as Kir was not only a professional but also a good friend.",
        imageUrl: HeroImg.src
      },
      {
        date: "2024.02.26",
        title: "Recording New Tracks in Warsaw!",
        content: "Hey! We recently visited a studio in Warsaw, crafting some fresh tunes. It takes a bit of time, but we're putting our hearts into it to bring you something special.",
        imageUrl: NewsImg.src
      }
    ]
  }
}

export default function Home() {

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
      <div className='flex px-4 gap-3'>
        {content.newsSection.cards.map((card) => (
          <NewsCard
            key={card.title}
            date={card.date}
            title={card.title}
            content={card.content}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>
      <span className='text-[24vw] font-black px-6'>HANNA</span>
      <div
        className='relative h-[500px]'
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <Footer />
      </div>
    </LenisProvider>
  )
}