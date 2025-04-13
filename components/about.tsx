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
import LogoIcon from "@/public/svg/logoIcon";
import { ClientCldImage } from "@/components/clientCldImage";
import {
  getPublishedPostPhotos,
  getPublishedPostsCount,
} from "@/actions/getPublishedPostPhotos";

export default async function About() {
  const t = await getTranslations("About");
  const img = await getPublishedPostPhotos();
  const publishedCount = await getPublishedPostsCount();

  return (
    <div className="container">
      <SubHeader
        title={t("title")}
        sectionName={t("sectionName")}
        variant="withСounterNotIcon"
        counter={publishedCount}
      />
      <div className="flex gap-x-12 pb-10">
        <div className="flex w-full flex-col justify-start gap-y-8 md:text-lg lg:text-xl lg:w-1/2 lg:text-2xl">
          <p>{t("descriptionOne")}</p>
          <p>{t("descriptionSecond")}</p>
          <p>{t("descriptionThird")}</p>
        </div>
        <LogoIcon className="-mt-48 hidden h-full max-w-lg lg:block" />
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
                    src={item.photo}
                    alt="Description of my image"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="-z-20 relative aspect-square object-cover"
                  />
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
