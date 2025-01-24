import HeroCard from "@/components/heroCard";
import NewsCard from "@/components/newsCard";
import SubHeader from "@/components/subHeader";
import getPaginatedPosts from "@/utils/getPaginatedPosts";
import splitTimestamp from "@/utils/splitTimestamp";
import { CreatePostButton } from "./createPostButton";
import { DeletePostButton } from "./deletePostButton";
import { EditPostButton } from "./editPostButton";
import { Pagination } from "./pagination";
import ProtectPage from "@/components/protectPage";

interface PostsProps {
  searchParams: { page?: string; locale: "en" | "uk" | "pl" };
  params: { locale: "en" | "uk" | "pl" };
}

export default async function Posts({ searchParams, params }: PostsProps) {
  const pageParam = searchParams.page;
  const page = pageParam ? Number.parseInt(pageParam) : 1;

  const { locale } = params;

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
            <ProtectPage>
              <DeletePostButton
                id={post.id}
                title={post[`title_${locale}`]}
                model="posts"
              />
              <CreatePostButton model="posts" />
              <EditPostButton model={post} />
            </ProtectPage>
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
