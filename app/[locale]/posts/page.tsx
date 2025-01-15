import getPaginatedPosts from "@/utils/getPaginatedPosts";
import { Pagination } from "./pagination";
import NewsCard from "@/components/newsCard";
import splitTimestamp from "@/utils/splitTimestamp";
import HeroCard from "@/components/heroCard";
import SubHeader from "@/components/subHeader";
import { DeleteButton } from "./delButton";
import { FormDialog } from "./formDialog";
import { AddButton } from "./addButton";
import { EditPostButton } from "./editPostButton";

export default async function Posts({
  searchParams,
  params,
}: {
  searchParams: { page?: string; locale?: string };
}) {
  // Используем await для searchParams
  const pageParam = await searchParams.page;
  const page = pageParam ? Number.parseInt(pageParam) : 1;

  const { locale } = await params;

  const { posts, pagination } = await getPaginatedPosts({
    page,
    locale,
  });

  return (
    <>
      <HeroCard
        heading={posts[0][`title_${locale}`]}
        date={splitTimestamp(posts[0].created_at)}
        announcement={posts[0].intro_pl}
        imgSrc={posts[0].photo}
        buttonLabel="read on"
        linkScr={`posts/${posts[0].slug}`}
      />
      <SubHeader title="POST" sectionName="What's going on" />
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 px-4">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            <NewsCard
              key={post.id}
              date={splitTimestamp(post.created_at)}
              title={post[`title_${locale}`]}
              content={post[`intro_${locale}`]}
              imageUrl={post.photo}
              slug={post.slug}
            />
            <DeleteButton
              id={post.id}
              title={post[`title_${locale}`]}
              model="posts"
            />
            <AddButton model="posts" />
            <EditPostButton post={post} />
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
