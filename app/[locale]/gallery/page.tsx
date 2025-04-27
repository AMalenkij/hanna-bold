import { ActionButton } from "@/components/actionButton";
import { ClientCldImage } from "@/components/clientCldImage";
import { GalleryModal } from "@/components/GalleryModal";
import ProtectPage from "@/components/protectPage";
import SubHeader from "@/components/subHeader";
import { PencilLine, Plus, X, SquareAsterisk } from "lucide-react";
import Link from "next/link";
import { CreateDialogGallery } from "./createDialogGallery";
import { DeleteDialogContent } from "./deleteDialogGallery";
import { EditDialogGallery } from "./editDialogGallery";
import { Badge } from "@/components/ui/badge";
import { getGalleryAction } from "@/actions/getGalleryAction";
import { getTranslations } from "next-intl/server";

const Gallery = async ({
  searchParams,
}: {
  searchParams: Promise<{ photoId: string | undefined }>;
}) => {
  const [images, posts, publishedCount] = await getGalleryAction();

  const { photoId } = await searchParams;
  const t = await getTranslations("Gallery");

  return (
    <div className="container mt-14">
      <SubHeader
        title={t("title")}
        sectionName={t("subHeader")}
        variant="withСounterNotIcon"
        counter={publishedCount}
        icon={SquareAsterisk}
      />
      <main className="mt-20 w-full max-w-[1960px]">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-3">
          {images.map(({ id, publicId, postId, post }) => (
            <div key={publicId} className="group relative mb-5 w-full">
              <Link
                href={`/gallery?photoId=${publicId}`}
                scroll={false}
                className="block cursor-zoom-in"
              >
                <ClientCldImage
                  width={720}
                  height={480}
                  src={publicId}
                  alt="Gallery image"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  className="transform rounded-lg transition will-change-auto md:brightness-90 md:group-hover:brightness-110"
                />
                {post?.title_en && (
                  <Badge
                    variant="outline"
                    className="absolute right-3 bottom-4 bg-stone-900/60 text-stone-50"
                  >
                    {post.title_en}
                  </Badge>
                )}
              </Link>
              <ProtectPage>
                <div className="absolute top-0 z-30 flex bg-background/80 p-x-1">
                  <ActionButton
                    actionType="create"
                    buttonLabel="create"
                    icon={<Plus />}
                    key={`create-${id}`}
                  >
                    <CreateDialogGallery posts={posts} />
                  </ActionButton>

                  <ActionButton
                    actionType="delete"
                    buttonLabel="delete"
                    icon={<X />}
                    key={`delete-${id}`}
                  >
                    <DeleteDialogContent
                      id={id}
                      title={publicId}
                      model="gallery"
                      cloudinaryPublicId={publicId}
                      cloudinaryType="image"
                    />
                  </ActionButton>
                  <ActionButton
                    actionType="edit"
                    buttonLabel="edit"
                    icon={<PencilLine />}
                    key={`edit-${id}`}
                  >
                    <EditDialogGallery
                      model={{ id, publicId, postId }}
                      posts={posts}
                    />
                  </ActionButton>
                </div>
              </ProtectPage>
            </div>
          ))}
        </div>
      </main>
      {photoId && <GalleryModal images={images} photoId={photoId} />}
    </div>
  );
};

export default Gallery;
