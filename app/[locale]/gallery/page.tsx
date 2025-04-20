import { ActionButton } from "@/components/actionButton";
import { ClientCldImage } from "@/components/clientCldImage";
import { GalleryModal } from "@/components/GalleryModal";
import ProtectPage from "@/components/protectPage";
import SubHeader from "@/components/subHeader";
import { PencilLine, Plus, X } from "lucide-react";
import Link from "next/link";
import { CreateDialogGallery } from "./createDialogGallery";
import { DeleteDialogContent } from "./deleteDialogGallery";
import { EditDialogGallery } from "./editDialogGallery";
import { Badge } from "@/components/ui/badge";
import { getGalleryAction } from "@/actions/getGalleryAction";

const Gallery = async ({
  searchParams,
}: {
  searchParams: { photoId?: string };
}) => {
  const [images, posts, publishedCount] = await getGalleryAction();

  const { photoId } = await searchParams;

  return (
    <div className="container mt-14">
      <SubHeader
        title={"GALLERY"}
        sectionName={"Photos our gallery"}
        variant="withСounterNotIcon"
        counter={publishedCount}
      />
      <main className="mx-auto mt-20 max-w-[1960px]">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-3">
          {images.map(({ id, publicId, post }) => (
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
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                />
                {post?.title_en && (
                  <Badge
                    variant="outline"
                    className="absolute right-2 bottom-2 bg-black/60"
                  >
                    {post.title_en}
                  </Badge>
                )}
              </Link>
              <ProtectPage>
                <div className="absolute top-2 right-2 z-10 flex gap-2">
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
                  {/* <ActionButton
                  actionType="edit"
                  buttonLabel="edit"
                  icon={<PencilLine />}
                  key={`edit-${id}`}
                >
                  <EditDialogGallery model={{ id, publicId }} />
                </ActionButton> */}
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
