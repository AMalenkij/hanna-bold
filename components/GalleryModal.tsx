"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ClientCldImage } from "./clientCldImage";
import { useRouter } from "next/navigation";
import { ExternalLink, ImageDown } from "lucide-react";
import { Button } from "./ui/button";
import downloadPhoto from "@/utils/downloadPhoto";

export function GalleryModal({
  images,
  photoId,
}: {
  images: { photo: string }[];
  photoId?: string;
}) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [thumbsApi, setThumbsApi] = React.useState<CarouselApi>();

  // Инициализация индекса
  const initialIndex = React.useMemo(
    () => (photoId ? images.findIndex((img) => img.photo === photoId) : 0),
    [photoId, images], // Пересчёт только при изменении этих значений
  );

  // Обработчик клика по миниатюре
  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi],
  );

  // Инициализация индекса при монтировании
  React.useEffect(() => {
    if (mainApi) {
      mainApi.scrollTo(initialIndex);
      setSelectedIndex(initialIndex);
    }
  }, [mainApi, initialIndex]);
  // Синхронизация каруселей
  React.useEffect(() => {
    if (!mainApi || !thumbsApi) return;

    const updateIndex = () => {
      const newIndex = mainApi.selectedScrollSnap();
      setSelectedIndex(newIndex);
      thumbsApi.scrollTo(newIndex);
    };

    mainApi.on("select", updateIndex);

    // Явное указание типа возвращаемой функции очистки
    return () => {
      mainApi.off("select", updateIndex);
    };
  }, [mainApi, thumbsApi]);
  return (
    <Dialog
      open={!!photoId}
      onOpenChange={(open) => !open && router.push("/gallery")}
    >
      <DialogTitle className="sr-only">Photo</DialogTitle>
      <DialogContent className="fixed top-[50%] left-[50%] z-50 w-full max-w-7xl border-0 bg-black/0 p-2 [&_button_svg]:h-10 [&_button_svg]:w-10">
        {/* Основная карусель */}
        <Carousel setApi={setMainApi} opts={{ startIndex: initialIndex }}>
          <CarouselContent>
            {images.map(({ photo }) => (
              <CarouselItem key={photo}>
                <ClientCldImage
                  width={1280}
                  height={853}
                  src={photo}
                  alt="Gallery image"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-1/2 flex w-full items-center justify-between px-3">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <div className="absolute top-4 left-4 flex gap-x-4">
            <Button variant="outline">
              <a
                href={`https://res.cloudinary.com/djpoy5xco/image/upload/${images[selectedIndex].photo}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open full size in new tab"
              >
                <ExternalLink />
                <span className="sr-only">Open in new tab</span>
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                downloadPhoto(
                  `https://res.cloudinary.com/djpoy5xco/image/upload/${images[selectedIndex].photo}.jpg`,
                  `${images[selectedIndex].photo}.jpg`,
                );
              }}
            >
              <ImageDown />
              <span className="sr-only">Download image</span>
            </Button>
          </div>
        </Carousel>

        {/* Карусель миниатюр */}
        <Carousel
          setApi={setThumbsApi}
          opts={{
            containScroll: "keepSnaps",
            dragFree: true,
            startIndex: initialIndex,
            align: "center",
          }}
        >
          <CarouselContent className="absolute">
            {images.map(({ photo }, index) => (
              <CarouselItem key={photo} className="-pl-22 basis-1/6">
                <button
                  type="button" // Добавлен явный тип
                  onClick={() => onThumbClick(index)}
                  className={`mx-3 mt-12 overflow-hidden transition-all ${
                    selectedIndex === index
                      ? "scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <ClientCldImage
                    width={200}
                    height={133}
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    className=" object-cover"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
