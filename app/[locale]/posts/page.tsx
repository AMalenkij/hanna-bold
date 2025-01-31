import HeroCard from "@/components/heroCard";
import NewsCard from "@/components/newsCard";
import SubHeader from "@/components/subHeader";
import getPaginatedPosts from "@/utils/getPaginatedPosts";
import splitTimestamp from "@/utils/splitTimestamp";
import { Pagination } from "./pagination";
import type { Locale } from "@/types/common";
import { X, Plus, PencilLine } from "lucide-react";
import { ActionButton } from "./actionButton";
import { EditDialogContent } from "./editDialogContent";
import { DeleteDialogContent } from "./deleteDialogContent";
import { CreateDialogContent } from "./createDialogContent";
import { getTranslations } from "next-intl/server";

interface PostsProps {
  searchParams: { page?: string; locale: Locale };
  params: { locale: Locale };
}

export default async function Posts({ searchParams, params }: PostsProps) {
  const t = await getTranslations("Posts");

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const pageParam = resolvedSearchParams.page;
  const page = pageParam ? Number.parseInt(pageParam) : 1;
  const { locale } = resolvedParams;

  const { posts, pagination } = await getPaginatedPosts({
    page,
    locale,
  });

  if (!posts.length) {
    return <div>{t("noPosts")}</div>;
  }

  return (
    <>
      <HeroCard
        heading={posts[0][`title_${locale}`]}
        date={splitTimestamp(posts[0].created_at)}
        announcement={posts[0][`intro_${locale}`]}
        imgSrc={posts[0].photo ?? ""}
        buttonLabel={t("readOn")}
        linkScr={`posts/${posts[0].slug}`}
      />
      <SubHeader title={t("title")} sectionName={t("sectionName")} />
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 px-4">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            <NewsCard
              key={post.id}
              date={splitTimestamp(post.created_at)}
              title={post[`title_${locale}`]}
              content={post[`intro_${locale}`]}
              imageUrl={post.photo ?? ""}
              slug={post.slug}
            />
            <ActionButton
              actionType="delete"
              buttonLabel={t("delete")}
              icon={<X />}
            >
              <DeleteDialogContent
                id={post.id}
                title={post[`title_${locale}`]}
                model="posts"
              />
            </ActionButton>
            <ActionButton
              actionType="edit"
              buttonLabel={t("edit")}
              icon={<PencilLine />}
            >
              <EditDialogContent model={post} />
            </ActionButton>
            <ActionButton
              actionType="create"
              buttonLabel={t("create")}
              icon={<Plus />}
            >
              <CreateDialogContent model="posts" />
            </ActionButton>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </>
  );
}
