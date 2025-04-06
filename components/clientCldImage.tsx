"use client";

import { CldImage } from "next-cloudinary";

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export const ClientCldImage = ({
  src,
  width,
  height,
  alt,
  sizes = "100vw",
  className = "",
  priority = false,
}: Props) => {
  return (
    <CldImage
      src={src}
      width={width}
      height={height}
      alt={alt}
      sizes={sizes}
      className={className}
      priority={priority}
      format="webp"
      quality="auto"
      crop="fill"
      gravity="auto"
      dpr="auto"
      loading={priority ? "eager" : "lazy"}
    />
  );
};
