import {
  getPublishedPostPhotos,
  getPublishedPostsCount,
} from "@/actions/getPublishedPostPhotos";
import { ClientCldImage } from "@/components/clientCldImage";
import { GalleryModal } from "@/components/GalleryModal";
import SubHeader from "@/components/subHeader";
import Link from "next/link";

const Gallery = async ({
  searchParams,
}: {
  searchParams: { photoId?: string };
}) => {
  const images = await getPublishedPostPhotos();
  const { photoId } = await searchParams;
  const publishedCount = await getPublishedPostsCount();

  return (
    <div className="container mt-14">
      <SubHeader
        title={"GALLERY"}
        sectionName={"Photos our gallery"}
        variant="withСounterNotIcon"
        counter={publishedCount}
      />
      <main className="mx-auto mt-20 max-w-[1960px] p-4 ">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pt-64 pb-16 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                Bridge
              </span>
              <span className="absolute right-0 bottom-0 left-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black">
                Logo
              </span>
            </div>
            {/* <Logo /> */}
            <h1 className="mt-8 mb-4 font-bold text-base uppercase tracking-widest">
              2022 Event Photos
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              Our incredible Next.js community got together in San Francisco for
              our first ever in-person conference!
            </p>
            <a
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 font-semibold text-black text-sm transition hover:bg-white/10 hover:text-white md:mt-4"
              href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
              target="_blank"
              rel="noreferrer"
            >
              Clone and Deploy
            </a>
          </div>
          {images.map(({ photo }) => (
            <Link
              key={photo}
              href={`/gallery?photoId=${photo}`}
              scroll={false}
              className="group relative mb-5 block w-full cursor-zoom-in"
            >
              <ClientCldImage
                width={720}
                height={480}
                src={photo}
                alt="Gallery image"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              />
            </Link>
          ))}
        </div>
      </main>
      <GalleryModal images={images} photoId={photoId} />
    </div>
  );
};

export default Gallery;
