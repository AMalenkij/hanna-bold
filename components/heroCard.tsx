import { Button } from "./ui/button";
import { Link } from "@/i18n/routing";
import RedLayer from "./redLayer";
import { ClientCldImage } from "@/components/clientCldImage";

interface HeroCardProps {
  heading: string;
  date: {
    date: string;
    month: string;
    year: string;
    time: string;
  };
  announcement: string;
  buttonLabel: string;
  imgSrc: string;
  linkScr: string;
}

export default function HeroCard({
  heading,
  date,
  announcement,
  buttonLabel,
  imgSrc,
  linkScr,
}: HeroCardProps) {
  return (
    <div className="relative h-[75vh]">
      <div className="-z-20 absolute aspect-[16/9] h-[75vh] w-full overflow-hidden rounded-lg bg-cover">
        <ClientCldImage
          width={1920} // Базовый размер для десктопов
          height={960}
          src={`${imgSrc}-post`}
          alt="Description of my image"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>
      <RedLayer />
      <div className="container">
        {/* Content */}
        <h1 className="pt-16 font-semibold text-6xl text-stone-50 leading-none sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl">
          {heading}
        </h1>
        <div className="absolute bottom-0 z-10">
          <p className="mb-4 text-lg text-stone-50">{`/ ${date.date} ${date.month} ${date.year} ${date.time}`}</p>
          <p className="mb-6 border-stone-50 border-l-2 pl-2 text-stone-50 text-xl sm:w-[600px]">
            {announcement}
          </p>

          <Button
            asChild
            variant="link"
            className="mb-6 border-stone-50 text-2xl text-stone-50 uppercase md:text-3xl"
          >
            <Link href={linkScr}>{buttonLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
