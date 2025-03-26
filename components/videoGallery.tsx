"use client";

import { useState } from "react";
import ZeroPadIndex from "@/utils/zeroPadIndex";
import type { Video } from "@prisma/client";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import type { Locale } from "@/types/common";
import type { ReactNode } from "react";
import { ProseContent } from "./proseContent";
import { Button } from "./ui/button";

export default function VideoGallery({
  videoData,
  locale,
  header,
}: {
  videoData: Video[];
  locale: Locale;
  header: ReactNode;
}) {
  const [currentVideo, setCurrentVideo] = useState(videoData[0]);
  const description = currentVideo[`description_${locale}`];
  return (
    <div className="container mb-28">
      {header}
      <div className="flex flex-col-reverse md:flex md:flex-row ">
        {/* Блок з описом */}
        <div className="pr-4 md:w-1/4">
          <ProseContent
            description={description}
            className="mt-12 lg:sticky lg:top-20 lg:mt-0"
          />
        </div>

        <div className="md:w-3/4">
          {/* Відеоплеер з доданим ключем */}
          <CldVideoPlayer
            key={currentVideo.id}
            width="1920"
            height="1080"
            src={currentVideo.link}
            controls
          />

          {/* Список відео */}
          <div className="mt-4 space-y-2">
            {videoData.map((video, index) => (
              <Button
                key={video.id}
                onClick={() => {
                  setCurrentVideo(video);
                }}
                variant="link"
                className={`flex w-full justify-start gap-x-2 py-3 pl-3 ${
                  currentVideo.id === video.id
                    ? "cursor-auto bg-red-500 text-stone-50"
                    : "border-red-500 p-3 px-4"
                }`}
              >
                {ZeroPadIndex(index + 1)}
                <span
                  className={`font-medium ${currentVideo.id === video.id ? "text-stone-50" : ""}`}
                >
                  {video.title}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
