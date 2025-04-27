import { getPostByLocaleAction } from "@/actions/getPostByLocaleAction";
import splitTimestamp from "@/utils/splitTimestamp";
import type { Locale } from "@/types/common";
import { notFound } from "next/navigation";
import { ClientCldImage } from "@/components/clientCldImage";
import { ProseContent } from "@/components/proseContent";
import { prisma } from "@/utils/prisma";

export async function generateStaticParams() {
  const posts = await prisma.posts.findMany({
    where: { is_published: true },
    select: { slug: true },
  });

  const locales: Locale[] = ["en", "ua", "pl"];

  return posts.flatMap((post) =>
    locales.map((locale) => ({
      slug: post.slug,
      locale,
    })),
  );
}

type PageProps = {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
};

export default async function Detail({ params }: PageProps) {
  const { slug, locale } = await params;
  const { post } = await getPostByLocaleAction({ slug, locale });

  if (!post) return notFound();

  const { created_at, photo } = post;
  const { date, month, year, time } = splitTimestamp(created_at);

  const title = post[`title_${locale}`] as string;
  const content = post[`content_${locale}`] as string;

  return (
    <article>
      <h1 className="container mt-20 mb-10 font-light text-6xl text-foreground leading-none sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-11xl">
        {title}
      </h1>
      <ClientCldImage
        width={1920}
        height={960}
        src={photo}
        alt={title}
        sizes="100vw"
        className="min-h-[40vh] w-full object-cover md:max-h-screen"
      />
      <div className="container flex flex-col items-center">
        <div className="mt-20 flex flex-col items-start md:mt-36 md:w-9/12 lg:w-3/5">
          <time className="mb-6 text-muted-foreground text-sm">{`/ ${date} ${month} ${year} ${time}`}</time>
          <ProseContent description={content} />
        </div>
      </div>
    </article>
  );
}
