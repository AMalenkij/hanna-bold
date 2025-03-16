import { prisma } from "@/utils/prisma";
import SubHeader from "./subHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { getTranslations } from "next-intl/server";
import ZeroPadIndex from "@/utils/zeroPadIndex";
// import RedLayer from "./redLayer";
import LogoIcon from "@/public/svg/logoIcon";
import { ClientCldImage } from "@/components/clientCldImage";

export default async function About() {
  const t = await getTranslations("About");

  const img = await prisma.posts.findMany({
    where: {
      is_published: true,
    },
    orderBy: { created_at: "desc" },
    select: {
      photo: true, // Выбираем только поле `photo`
    },
  });

  const publishedCount = await prisma.posts.count({
    where: {
      is_published: true,
    },
  });

  return (
    <div className="container">
      <SubHeader
        title={t("title")}
        sectionName={t("sectionName")}
        variant="withСounterNotIcon"
        counter={publishedCount}
      />
      <div className="flex gap-x-12 py-10">
        <LogoIcon className="hidden max-w-96 lg:block" />
        <div className="flex w-full flex-col justify-start gap-y-8 text-xl lg:w-1/2 lg:text-2xl">
          <p>{t("descriptionOne")}</p>
          <p>{t("descriptionSecond")}</p>
          <p>{t("descriptionThird")}</p>
        </div>
      </div>
      <Carousel className="container w-full">
        <CarouselContent className="-ml-6">
          {img.map((item, index) => (
            <CarouselItem
              key={item.photo}
              className="pl-6 md:basis-1/3 lg:basis-1/4"
            >
              <div className="relative">
                <span className=" absolute bottom-4 left-6 z-0 font-semibold text-7xl text-white">
                  {ZeroPadIndex(index + 1)}
                </span>
                <div className="relative">
                  <ClientCldImage
                    width={475}
                    height={475}
                    src={`${item.photo}-post`}
                    alt="Description of my image"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="-z-20 relative aspect-square object-cover"
                  />
                  {/* Red layer over background - hidden on hover */}
                  {/* <div className="group-hover:hidden ">
                    <RedLayer />
                  </div> */}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
