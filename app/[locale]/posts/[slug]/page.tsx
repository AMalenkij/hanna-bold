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

  const title = post[`title_${locale}`] as string;
  const content = post[`content_${locale}`] as string;

  const { date, month, year, time } = splitTimestamp(created_at);

  return (
    <div className="container">
      <h1 className="mt-20 mb-10 font-semibold text-6xl text-foreground md:text-12xl">
        {title}
      </h1>
      <ClientCldImage
        width={1920}
        height={960}
        src={photo}
        alt={title}
        sizes="100vw"
        className="max-h-screen w-full object-cover"
      />
      <div className="mt-36 flex w-full flex-col items-center justify-center">
        <p className="mb-6 w-full text-muted-foreground text-sm lg:w-[600px]">{`/ ${date} ${month} ${year} ${time}`}</p>
        <ProseContent description={content} className="w-full lg:w-[600px]" />
      </div>
    </div>
  );
}
