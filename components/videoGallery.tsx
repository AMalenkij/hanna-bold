"use client";

import { useState } from "react";
import ZeroPadIndex from "@/utils/zeroPadIndex";
import type { Video } from "@prisma/client";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import type { Locale } from "@/types/common";
import type { ReactNode } from "react";
import { ProseContent } from "./proseContent";

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
          <ProseContent description={description} className="sticky top-20" />
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
              <div
                key={video.id}
                onClick={() => {
                  setCurrentVideo(video);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setCurrentVideo(video);
                  }
                }}
                className={`flex cursor-pointer items-center gap-x-3 py-3 pl-3 transition-colors ${
                  currentVideo.id === video.id
                    ? "cursor-auto bg-red-500 text-stone-50"
                    : "border-red-500 p-3 px-4 transition-transform duration-500 hover:border-l-4"
                }`}
              >
                {ZeroPadIndex(index + 1)}
                <div
                  className={`font-medium ${currentVideo.id === video.id ? "text-stone-50" : ""}`}
                >
                  {video.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
